import pool from "../database/db.js";
import { awardBadgesForEvent } from "../services/badges.js";
import { compareResults, MAX_COMPARE_ROWS } from "../utils/queryComparator.js";

const quoteIdent = (s) => `"${String(s).replace(/"/g, '""')}"`;
const isSafeSchemaName = (s) => /^[a-z_][a-z0-9_]*$/i.test(String(s || ""));

const stripTrailingSemicolon = (q = "") => {
  return q.trim().replace(/;+\s*$/, "");
};

const stripSqlLiteralsAndComments = (sql = "") => {
  let s = String(sql);

  // Remove block comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ");
  // Remove line comments
  s = s.replace(/--[^\n]*$/gm, " ");
  // Remove dollar-quoted strings ($tag$...$tag$)
  s = s.replace(/(\$[a-zA-Z0-9_]*\$)[\s\S]*?\1/g, " ");
  // Remove single-quoted strings (handles doubled '' escapes)
  s = s.replace(/'(?:[^']|'{2})*'/g, " ");

  return s;
};

const stripFunctionCalls = (sql = "", functionNames = []) => {
  const names = new Set(functionNames.map((n) => String(n).toLowerCase()));
  const s = String(sql);
  const lower = s.toLowerCase();

  const isIdentChar = (ch) => /[a-z0-9_]/i.test(ch);
  const isWordBoundary = (idx) => {
    if (idx <= 0) return true;
    return !isIdentChar(s[idx - 1]);
  };

  const scanToMatchingParen = (openIdx) => {
    let depth = 0;
    for (let i = openIdx; i < s.length; i++) {
      const ch = s[i];
      if (ch === "(") depth++;
      else if (ch === ")") {
        depth--;
        if (depth === 0) return i + 1;
      }
    }
    return s.length;
  };

  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (/[a-z_]/i.test(ch) && isWordBoundary(i)) {
      let j = i + 1;
      while (j < s.length && isIdentChar(s[j])) j++;
      const word = lower.slice(i, j);

      if (names.has(word)) {
        let k = j;
        while (k < s.length && /\s/.test(s[k])) k++;
        if (s[k] === "(") {
          const end = scanToMatchingParen(k);
          out += " ".repeat(end - i);
          i = end - 1;
          continue;
        }
      }
    }
    out += ch;
  }
  return out;
};

const assertSelectOrWithOnly = (query) => {
  const cleaned = stripSqlLiteralsAndComments(query)
    .trim()
    // allow optional wrapping parentheses
    .replace(/^\(+\s*/, "");

  if (!/^(with|select)\b/i.test(cleaned)) {
    throw new Error("Only SELECT queries are allowed.");
  }
};

const assertSingleStatement = (query) => {
  const trimmed = String(query || "").trim();
  const withoutTrailing = trimmed.replace(/;+\s*$/, "");
  const cleaned = stripSqlLiteralsAndComments(withoutTrailing);
  if (cleaned.includes(";")) {
    throw new Error("Only a single SELECT statement is allowed.");
  }
};

const assertNoCrossSchemaRefs = async (client, query, appSchema) => {
  // Remove SQL literals/comments first, then remove function calls that use FROM in their syntax
  // (e.g. EXTRACT(... FROM ...), TRIM(... FROM ...), OVERLAY(... FROM ...)).
  // This prevents false positives where `FROM alias.column` is not a FROM-clause schema ref.
  const cleaned = stripFunctionCalls(stripSqlLiteralsAndComments(query), [
    "extract",
    "trim",
    "overlay",
  ]);
  const schemaRef =
    /\b(from|join)\s+(?:lateral\s+)?(?:only\s+)?((?:"[^"]+"|[a-z_][a-z0-9_]*))\s*\.\s*((?:"[^"]+"|[a-z_][a-z0-9_]*))/gi;

  const unquoteIdent = (ident) => {
    const s = String(ident || "");
    if (s.startsWith('"') && s.endsWith('"')) {
      return s.slice(1, -1).replace(/""/g, '"');
    }
    return s;
  };

  const forbidden = new Set(["public", "information_schema", "pg_catalog"]);
  const allowedSchema = String(appSchema || "").toLowerCase();

  const schemaExists = async (schemaName) => {
    const { rowCount } = await client.query(
      "SELECT 1 FROM pg_namespace WHERE nspname = $1",
      [schemaName],
    );
    return rowCount > 0;
  };

  if (!(await schemaExists(allowedSchema))) {
    throw new Error(`App schema '${appSchema}' does not exist.`);
  }

  let m;
  while ((m = schemaRef.exec(cleaned)) !== null) {
    const schema = unquoteIdent(m[2]).toLowerCase();
    if (forbidden.has(schema)) {
      throw new Error(
        "Access to system/public schemas is not allowed. Use the app tables only.",
      );
    }
    // If a schema-qualified ref is used, it must match the app schema exactly.
    // (Unqualified table names are recommended.)
    if (schema !== allowedSchema) {
      throw new Error(
        `Cross-schema access is not allowed. Use unqualified table names (recommended) or only '${appSchema}'.<table>.`,
      );
    }
    // Extra safety: if the schema isn't actually present, reject.
    if (!(await schemaExists(schema))) {
      throw new Error(`Schema '${schema}' does not exist.`);
    }
  }

  // Extra guard: catch quoted schema refs like "public".apps even if not preceded by FROM/JOIN.
  const forbiddenSchemaAny =
    /(?:^|[^a-z0-9_])(?:"(?:public|information_schema|pg_catalog)"|(?:public|information_schema|pg_catalog))\s*\./i;
  if (forbiddenSchemaAny.test(cleaned)) {
    throw new Error(
      "Access to system/public schemas is not allowed. Use the app tables only.",
    );
  }

  const setSearchPath = /\bset\s+(local\s+)?search_path\b/i;
  if (setSearchPath.test(cleaned)) {
    throw new Error("Modifying search_path is not allowed.");
  }

  // Prevent changing settings via SQL functions (can be used to alter search_path).
  const setConfigFn = /\bset_config\s*\(/i;
  if (setConfigFn.test(cleaned)) {
    throw new Error("Modifying session settings is not allowed.");
  }

  // Prevent unqualified access to system catalogs/views (pg_catalog is searched implicitly).
  const sysCatalogRel =
    /\b(from|join)\s+(?:lateral\s+)?(?:only\s+)?(?:"?pg_[a-z0-9_]+"?)(?!\s*\.)/gi;
  if (sysCatalogRel.test(cleaned)) {
    throw new Error(
      "Access to system catalog tables/views is not allowed. Use the app tables only.",
    );
  }
};

const getAppSchemaByQuestionId = async (client, questionId) => {
  const { rows } = await client.query(
    `
    SELECT a.name AS app_name
    FROM questions q
    JOIN apps a ON a.app_id = q.app_id
    WHERE q.id = $1
    LIMIT 1
    `,
    [questionId],
  );

  const appName = rows?.[0]?.app_name || null;
  if (!appName) throw new Error("Question app not found");
  const schema = `${appName}_schema`;
  if (!isSafeSchemaName(schema)) {
    throw new Error("Invalid app schema name");
  }
  return schema;
};

const setLocalSearchPath = async (client, schema) => {
  // Exclude public by default so unqualified queries can't accidentally hit platform tables.
  await client.query(`SET LOCAL search_path TO ${quoteIdent(schema)}, pg_catalog`);
  return schema;
};

const setLocalSearchPathForQuestion = async (client, questionId) => {
  const schema = await getAppSchemaByQuestionId(client, questionId);
  await setLocalSearchPath(client, schema);
  return schema;
};

const getRowCount = async (client, query) => {
  const safe = stripTrailingSemicolon(query);
  const { rows } = await client.query(
    `SELECT COUNT(*)::bigint AS c FROM (${safe}) t`,
  );
  return Number(rows?.[0]?.c || 0);
};

const buildProjectedSelect = (query, expectedColumns, sortByColumns = []) => {
  const cols = expectedColumns.map((c) => `t.${quoteIdent(c)}`).join(", ");
  const order =
    Array.isArray(sortByColumns) && sortByColumns.length > 0
      ? " ORDER BY " +
        sortByColumns
          .map((item) => {
            if (typeof item === "string") {
              if (item.startsWith("-"))
                return `${quoteIdent(item.slice(1))} DESC`;
              if (item.startsWith("+"))
                return `${quoteIdent(item.slice(1))} ASC`;
              return `${quoteIdent(item)} ASC`;
            }
            const dir =
              String(item.direction || "asc").toLowerCase() === "desc"
                ? "DESC"
                : "ASC";
            return `${quoteIdent(item.column)} ${dir}`;
          })
          .join(", ")
      : "";

  return `SELECT ${cols} FROM (${query}) t${order}`;
};

const compareResultsInDb = async ({
  client,
  expectedQuery,
  userQuery,
  expectedColumns,
  config = {},
}) => {
  const ignoreOrder =
    config.ignore_order !== undefined ? config.ignore_order : true;

  const sortByColumns = Array.isArray(config.sort_by_columns)
    ? config.sort_by_columns
    : [];

  if (!Array.isArray(expectedColumns) || expectedColumns.length === 0) {
    return {
      isCorrect: false,
      reason: "No expected columns defined for this question",
    };
  }

  if (!ignoreOrder && sortByColumns.length === 0) {
    return {
      isCorrect: false,
      reason:
        "Question setup error: ordered comparison requires sort_by_columns",
    };
  }

  const safeExpectedQuery = stripTrailingSemicolon(expectedQuery);
  const safeUserQuery = stripTrailingSemicolon(userQuery);

  const buildOrderClause = (columnsOrSpecs) => {
    if (!Array.isArray(columnsOrSpecs) || columnsOrSpecs.length === 0) {
      return "";
    }

    const parts = columnsOrSpecs.map((item) => {
      if (typeof item === "string") {
        if (item.startsWith("-")) {
          return `${quoteIdent(item.slice(1))} DESC`;
        }
        if (item.startsWith("+")) {
          return `${quoteIdent(item.slice(1))} ASC`;
        }
        return `${quoteIdent(item)} ASC`;
      }

      const dir =
        String(item.direction || "asc").toLowerCase() === "desc"
          ? "DESC"
          : "ASC";

      return `${quoteIdent(item.column)} ${dir}`;
    });

    return parts.join(", ");
  };

  const normalizeSortSpec = (columnsOrSpecs) => {
    if (!Array.isArray(columnsOrSpecs)) return [];

    return columnsOrSpecs
      .map((item) => {
        if (typeof item === "string") {
          if (item.startsWith("-")) {
            return { column: item.slice(1), direction: "desc" };
          }
          if (item.startsWith("+")) {
            return { column: item.slice(1), direction: "asc" };
          }
          return { column: item, direction: "asc" };
        }

        if (item && typeof item === "object" && typeof item.column === "string") {
          return {
            column: item.column,
            direction:
              String(item.direction || "asc").toLowerCase() === "desc"
                ? "desc"
                : "asc",
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const formatSortSpec = (columnsOrSpecs) => {
    const specs = normalizeSortSpec(columnsOrSpecs);
    if (specs.length === 0) return "";
    return specs
      .map((s) => `${s.column} ${s.direction.toUpperCase()}`)
      .join(", ");
  };

  const dedupeFingerprintSpec = (sortSpecs, cols) => {
    const seen = new Set();
    const out = [];

    for (const spec of sortSpecs) {
      if (!spec?.column) continue;
      const key = spec.column;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(spec);
    }

    for (const col of cols) {
      const key = col;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(col);
    }

    return out;
  };

  const buildNonDecreasingExpr = (sortSpecs) => {
    if (!Array.isArray(sortSpecs) || sortSpecs.length === 0) return "";

    const lessExprs = sortSpecs.map((spec, idx) => {
      const prev = quoteIdent(`__prev_${idx}`);
      const curr = quoteIdent(spec.column);
      const op = spec.direction === "desc" ? ">" : "<";

      // Match PostgreSQL default NULL ordering:
      // - ASC  => NULLS LAST
      // - DESC => NULLS FIRST
      if (spec.direction === "desc") {
        return `((${prev} IS NULL AND ${curr} IS NOT NULL) OR (${prev} IS NOT NULL AND ${curr} IS NOT NULL AND ${prev} ${op} ${curr}))`;
      }
      return `((${prev} IS NOT NULL AND ${curr} IS NULL) OR (${prev} IS NOT NULL AND ${curr} IS NOT NULL AND ${prev} ${op} ${curr}))`;
    });

    const eqExprs = sortSpecs.map((spec, idx) => {
      const prev = quoteIdent(`__prev_${idx}`);
      const curr = quoteIdent(spec.column);
      return `((${prev} IS NULL AND ${curr} IS NULL) OR (${prev} IS NOT NULL AND ${curr} IS NOT NULL AND ${prev} = ${curr}))`;
    });

    const disjuncts = [];

    for (let i = 0; i < sortSpecs.length; i++) {
      const prefix = eqExprs.slice(0, i).join(" AND ");
      if (prefix) {
        disjuncts.push(`((${prefix}) AND ${lessExprs[i]})`);
      } else {
        disjuncts.push(`${lessExprs[i]}`);
      }
    }

    disjuncts.push(`(${eqExprs.join(" AND ")})`);
    return disjuncts.join(" OR ");
  };

  const expectedProjected = buildProjectedSelect(
    safeExpectedQuery,
    expectedColumns,
    [],
  );

  const userProjected = buildProjectedSelect(
    safeUserQuery,
    expectedColumns,
    [],
  );

  const normalizedSortSpecs = normalizeSortSpec(sortByColumns);
  const missingOrderCols = normalizedSortSpecs.filter(
    (s) => !expectedColumns.includes(s.column),
  );
  if (missingOrderCols.length > 0) {
    return {
      isCorrect: false,
      reason: `Question setup error: sort_by_columns contains columns not in expected output (${missingOrderCols
        .map((s) => s.column)
        .join(", ")})`,
    };
  }

  // For ordered questions, preserve configured order.
  // For unordered questions, impose canonical order by all expected columns.
  const fingerprintOrder = ignoreOrder
    ? buildOrderClause(expectedColumns)
    : buildOrderClause(dedupeFingerprintSpec(normalizedSortSpecs, expectedColumns));

  const orderCheckExpr =
    !ignoreOrder && normalizedSortSpecs.length > 0
      ? buildNonDecreasingExpr(normalizedSortSpecs)
      : "";

  const actualOrderCheckCte =
    !ignoreOrder && normalizedSortSpecs.length > 0
      ? `
    actual_order_check AS (
      SELECT
        COALESCE(bool_and("__pos" = 1 OR (${orderCheckExpr})), true) AS is_ordered
      FROM actual_prev
    ),`
      : `
    actual_order_check AS (
      SELECT true AS is_ordered
    ),`;

  const sql = `
    WITH
    expected_rows AS (${expectedProjected}),
    actual_rows AS (${userProjected}),
    actual_seq AS (
      SELECT *, row_number() OVER () AS "__pos"
      FROM actual_rows
    ),
    actual_prev AS (
      SELECT
        a.*${
          normalizedSortSpecs.length > 0
            ? ", " +
              normalizedSortSpecs
                .map(
                  (spec, idx) =>
                    `lag(${quoteIdent(spec.column)}) OVER (ORDER BY "__pos") AS ${quoteIdent(
                      `__prev_${idx}`,
                    )}`,
                )
                .join(", ")
            : ""
        }
      FROM actual_seq a
    ),
    ${actualOrderCheckCte}
    expected_fingerprint AS (
      SELECT
        COUNT(*) AS row_count,
        md5(COALESCE(string_agg(row_to_json(x)::text, '||' ORDER BY ${fingerprintOrder}), '')) AS hash
      FROM expected_rows x
    ),
    actual_fingerprint AS (
      SELECT
        COUNT(*) AS row_count,
        md5(COALESCE(string_agg(row_to_json(x)::text, '||' ORDER BY ${fingerprintOrder}), '')) AS hash
      FROM actual_rows x
    )
    SELECT
      e.row_count AS expected_count,
      a.row_count AS actual_count,
      e.hash AS expected_hash,
      a.hash AS actual_hash,
      o.is_ordered AS actual_is_ordered
    FROM expected_fingerprint e
    CROSS JOIN actual_fingerprint a
    CROSS JOIN actual_order_check o
  `;

  const { rows } = await client.query(sql);
  const row = rows[0];

  if (!row) {
    return { isCorrect: true };
  }

  if (!ignoreOrder && normalizedSortSpecs.length > 0) {
    if (!row.actual_is_ordered) {
      const spec = formatSortSpec(normalizedSortSpecs);
      return {
        isCorrect: false,
        reason: spec
          ? `Results must be ordered by ${spec}`
          : "Results must be ordered as specified",
      };
    }
  }

  if (Number(row.expected_count) !== Number(row.actual_count)) {
    return {
      isCorrect: false,
      reason: `Row count mismatch: expected ${row.expected_count}, got ${row.actual_count}`,
    };
  }

  if (row.expected_hash !== row.actual_hash) {
    return {
      isCorrect: false,
      reason: "Result set mismatch",
    };
  }

  return { isCorrect: true };
};

const isQuerySafe = (query) => {
  const forbidden =
    /\b(INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|GRANT|REVOKE|CREATE|COMMENT|VACUUM|ANALYZE|COPY|\\copy)\b/i;
  return !forbidden.test(query);
};

// ===============================
// EXECUTE QUERY (Preview Mode)
// ===============================
export const executeQuery = async (req, res) => {
  const client = await pool.connect();

  try {
    const { questionId, query } = req.body;
    const userId = req.userId;

    if (!questionId) {
      return res
        .status(400)
        .json({ error: "Question ID is missing or invalid" });
    }

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is missing or invalid" });
    }

    if (!isQuerySafe(query)) {
      return res
        .status(403)
        .json({ error: "Only SELECT queries are allowed." });
    }

    assertSelectOrWithOnly(query);
    assertSingleStatement(query);

    let expectedQuery = null;
    let expectedColumns = null;
    let config = {};

    let isCorrect;
    let result = {};
    let previewRows = [];
    let fields = [];

    const qRes = await client.query(
      `SELECT expected_query, comparison_config, solution_columns
         FROM questions
         WHERE id = $1`,
      [questionId],
    );

    if (qRes.rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    expectedQuery = qRes.rows[0].expected_query;
    expectedColumns = qRes.rows[0].solution_columns;
    config = qRes.rows[0].comparison_config || {};

    const compareInDb = !!config.compare_in_db;
    const ignoreOrder =
      config.ignore_order !== undefined ? config.ignore_order : true;
    const previewRowLimit = 200;
    const timeoutMs =
      typeof config.statement_timeout_ms === "number"
        ? config.statement_timeout_ms
        : 60000;

    const queryWithoutSemicolon = stripTrailingSemicolon(query);

    await client.query("BEGIN");
    const appSchema = await getAppSchemaByQuestionId(client, questionId);
    await assertNoCrossSchemaRefs(client, query, appSchema);
    await setLocalSearchPath(client, appSchema);
    await client.query(`SET LOCAL statement_timeout = ${timeoutMs}`);

    const previewQuery = `SELECT * FROM (${queryWithoutSemicolon}) t LIMIT ${previewRowLimit}`;

    console.log("executing preview/user query....");
    const userPreviewResult = await client.query(previewQuery);
    console.log("executed preview/user query....");

    previewRows = userPreviewResult.rows;
    fields = userPreviewResult.fields?.map((f) => f.name) || [];

    try {
      const safeExpectedQuery = stripTrailingSemicolon(expectedQuery);
      const safeUserQuery = stripTrailingSemicolon(query);

      // For ordered comparisons, validate ordering in Postgres (collation-aware)
      // instead of JS-side sorting checks.
      const shouldCompareInDb = compareInDb || !ignoreOrder
        ? true
        : (await getRowCount(client, safeExpectedQuery)) > MAX_COMPARE_ROWS ||
          (await getRowCount(client, safeUserQuery)) > MAX_COMPARE_ROWS;

      if (shouldCompareInDb) {
        console.log("comparing results in DB....");
        result = await compareResultsInDb({
          client,
          expectedQuery,
          userQuery: query,
          expectedColumns,
          config,
        });
        console.log("db comparison done....");
        isCorrect = result.isCorrect;
      } else {
        console.log("executing full user query for comparison....");
        const userFullResult = await client.query(query);
        console.log("executed full user query for comparison....");

        console.log("executing expected query....");
        const expectedResult = await client.query(expectedQuery);
        console.log("executed expected query....");

        console.log("comparing results....");
        result = compareResults({
          expectedRows: expectedResult.rows,
          actualRows: userFullResult.rows,
          expectedColumns,
          config,
        });
        console.log("result -----", result);
        isCorrect = result.isCorrect;
      }
      await updateUserProgress(questionId, "attempted", query, userId, {
        countAttempt: false,
        logSubmission: false,
      });
    } catch (e) {
      console.warn("Expected query / comparison failed:", e.message);
      await updateUserProgress(questionId, "attempted", query, userId, {
        countAttempt: false,
        logSubmission: false,
      });
      result = {
        isCorrect: false,
        reason: e.message,
      };
      isCorrect = false;
    }

    await client.query("COMMIT");
    return res.json({
      rows: previewRows,
      fields,
      isCorrect,
      reason: result?.reason,
    });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (e) {
      // ignore
    }
    return res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
};

// ===============================
// EXPLAIN / EXPLAIN ANALYZE
// ===============================
export const explainQuery = async (req, res) => {
  const client = await pool.connect();

  try {
    const { questionId, query, analyze } = req.body;

    if (!questionId) {
      return res
        .status(400)
        .json({ error: "Question ID is missing or invalid" });
    }

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is missing or invalid" });
    }

    if (!isQuerySafe(query)) {
      return res
        .status(403)
        .json({ error: "Only SELECT queries are allowed." });
    }

    assertSelectOrWithOnly(query);
    assertSingleStatement(query);

    const queryWithoutSemicolon = stripTrailingSemicolon(query);
    const doAnalyze = analyze === true;

    await client.query("BEGIN");
    const appSchema = await getAppSchemaByQuestionId(client, questionId);
    await assertNoCrossSchemaRefs(client, query, appSchema);
    await setLocalSearchPath(client, appSchema);
    await client.query("SET LOCAL statement_timeout = 60000");

    const explainSql = `EXPLAIN (FORMAT JSON, COSTS true, VERBOSE false, BUFFERS true, ANALYZE ${
      doAnalyze ? "true" : "false"
    }) ${queryWithoutSemicolon}`;

    const { rows } = await client.query(explainSql);
    await client.query("COMMIT");

    const plan =
      rows?.[0]?.["QUERY PLAN"] ??
      rows?.[0]?.["QUERY_PLAN"] ??
      rows?.[0]?.query_plan ??
      null;

    return res.json({ plan });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (e) {
      console.warn("Failed to rollback explain transaction:", e.message);
    }
    return res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
};

// ===============================
// SUBMIT ANSWER (Final Evaluation)
// ===============================
export const submitAnswer = async (req, res) => {
  const client = await pool.connect();

  try {
    const { questionId, query } = req.body;
    const userId = req.userId;

    if (!questionId || !query) {
      return res.status(400).json({ error: "Missing questionId or query" });
    }

    if (!isQuerySafe(query)) {
      return res
        .status(403)
        .json({ error: "Only SELECT queries are allowed." });
    }

    assertSelectOrWithOnly(query);
    assertSingleStatement(query);

    // Fetch expected query + config + expected columns
    const qRes = await client.query(
      `SELECT expected_query, comparison_config, solution_columns
       FROM questions
       WHERE id = $1`,
      [questionId],
    );

    if (qRes.rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    const expectedQuery = qRes.rows[0].expected_query;
    const config = qRes.rows[0].comparison_config || {};
    const expectedColumns = qRes.rows[0].solution_columns;

    const compareInDb = !!config.compare_in_db;
    const ignoreOrder =
      config.ignore_order !== undefined ? config.ignore_order : true;
    const timeoutMs =
      typeof config.statement_timeout_ms === "number"
        ? config.statement_timeout_ms
        : 60000;

    await client.query("BEGIN");
    const appSchema = await getAppSchemaByQuestionId(client, questionId);
    await assertNoCrossSchemaRefs(client, query, appSchema);
    await setLocalSearchPath(client, appSchema);
    await client.query(`SET LOCAL statement_timeout = ${timeoutMs}`);

    const previewRowLimit = 200;
    const queryWithoutSemicolon = stripTrailingSemicolon(query);
    const previewQuery = `SELECT * FROM (${queryWithoutSemicolon}) t LIMIT ${previewRowLimit}`;

    // Always execute limited query for UI output/fields
    let userPreviewResult;
    try {
      userPreviewResult = await client.query(previewQuery);
    } catch (error) {
      await updateUserProgress(questionId, "attempted", query, userId);
      await client.query("ROLLBACK");
      return res.status(400).json({
        error: error.message,
        isCorrect: false,
      });
    }

    let result;

    try {
      const safeExpectedQuery = stripTrailingSemicolon(expectedQuery);
      const safeUserQuery = stripTrailingSemicolon(query);

      // For ordered comparisons, validate ordering in Postgres (collation-aware)
      // instead of JS-side sorting checks.
      const shouldCompareInDb = compareInDb || !ignoreOrder
        ? true
        : (await getRowCount(client, safeExpectedQuery)) > MAX_COMPARE_ROWS ||
          (await getRowCount(client, safeUserQuery)) > MAX_COMPARE_ROWS;

      if (shouldCompareInDb) {
        result = await compareResultsInDb({
          client,
          expectedQuery,
          userQuery: query,
          expectedColumns,
          config,
        });
      } else {
        // Execute full user query only when safe to compare in memory
        const userFullResult = await client.query(query);
        const expectedResult = await client.query(expectedQuery);

        result = compareResults({
          expectedRows: expectedResult.rows,
          actualRows: userFullResult.rows,
          expectedColumns,
          config,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Error during result comparison.",
        reason: error.message,
      });
    }

    const newStatus = result.isCorrect ? "solved" : "attempted";
    await updateUserProgress(questionId, newStatus, query, userId);

    await client.query("COMMIT");
    let newBadges = [];
    if (result.isCorrect) {
      try {
        const awarded = await awardBadgesForEvent(
          { userId, event: "question_solved", context: { questionId } },
          null,
        );
        newBadges = awarded?.newlyEarned || [];
      } catch (e) {
        console.warn("Failed to award badges:", e?.message || e);
      }
    }

    res.json({
      isCorrect: result.isCorrect,
      rows: userPreviewResult.rows,
      fields: userPreviewResult.fields?.map((f) => f.name) || [],
      reason: result?.reason,
      newBadges,
      message: result.isCorrect
        ? "Correct! Good job."
        : result?.reason || "Results did not match expected output.",
    });
  } catch (error) {
    console.error("Submit error:", error);
    try {
      await client.query("ROLLBACK");
    } catch (e) {
      // ignore
    }
    res.status(500).json({
      error: "Internal server error",
    });
  } finally {
    client.release();
  }
};

const updateUserProgress = async (
  questionId,
  status,
  query,
  userId,
  options = {},
) => {
  const { countAttempt = true, logSubmission = true } = options;

  // LOG SUBMISSION for heatmap/activity tracking (submit only; not "run query")
  if (logSubmission) {
    try {
      await pool.query(
        "INSERT INTO user_submissions (user_id, question_id, status, query) VALUES ($1, $2, $3, $4)",
        [userId, questionId, status, query],
      );
    } catch (err) {
      console.error("Failed to log submission activity:", err);
    }
  }

  // Check if progress exists
  const checkRes = await pool.query(
    "SELECT id, status FROM user_progress WHERE question_id = $1 AND user_id = $2",
    [questionId, userId],
  );

  if (checkRes.rows.length && checkRes.rows[0].status === "solved") {
    return;
  }

  if (checkRes.rows.length > 0) {
    if (status === "solved") {
      await pool.query(
        `UPDATE user_progress 
         SET status = $1, last_query = $2, attempts_count = attempts_count + $5, solved_at = NOW(), updated_at = NOW() 
         WHERE question_id = $3 AND user_id = $4`,
        [status, query, questionId, userId, countAttempt ? 1 : 0],
      );
    } else {
      await pool.query(
        `UPDATE user_progress 
         SET status = $1, last_query = $2, attempts_count = attempts_count + $5, updated_at = NOW() 
         WHERE question_id = $3 AND user_id = $4`,
        [status, query, questionId, userId, countAttempt ? 1 : 0],
      );
    }
  } else {
    if (status === "solved") {
      await pool.query(
        `INSERT INTO user_progress (user_id, question_id, status, last_query, attempts_count, solved_at) 
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [userId, questionId, status, query, countAttempt ? 1 : 0],
      );
    } else {
      await pool.query(
        `INSERT INTO user_progress (user_id, question_id, status, last_query, attempts_count) 
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, questionId, status, query, countAttempt ? 1 : 0],
      );
    }
  }
};
