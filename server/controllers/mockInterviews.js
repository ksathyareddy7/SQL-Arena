import pool from "../database/db.js";
import { awardBadgesForEvent } from "../services/badges.js";
import {
  MOCK_INTERVIEW_TEMPLATES,
  getTemplateById,
  normalizeCustomTemplate,
} from "../utils/mock_interviews/templates.js";
import { generateMockInterviewSession } from "../utils/mock_interviews/generateSession.js";
import { computeQuestionScore } from "../utils/mock_interviews/scoring.js";
import {
  compareResults,
  MAX_COMPARE_ROWS,
} from "../utils/queryComparator.js";

const quoteIdent = (s) => `"${String(s).replace(/"/g, '""')}"`;
const isSafeSchemaName = (s) => /^[a-z_][a-z0-9_]*$/i.test(String(s || ""));

const stripTrailingSemicolon = (q = "") => q.trim().replace(/;+\s*$/, "");

const stripSqlLiteralsAndComments = (sql = "") => {
  let s = String(sql);
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ");
  s = s.replace(/--[^\n]*$/gm, " ");
  s = s.replace(/(\$[a-zA-Z0-9_]*\$)[\s\S]*?\1/g, " ");
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
  const cleaned = stripSqlLiteralsAndComments(query).trim().replace(/^\(+\s*/, "");
  if (!/^(with|select)\b/i.test(cleaned)) {
    throw new Error("Only SELECT queries are allowed.");
  }
};

const assertSingleStatement = (query) => {
  const trimmed = String(query || "").trim();
  const withoutTrailing = trimmed.replace(/;+\s*$/, "");
  const cleaned = stripSqlLiteralsAndComments(withoutTrailing);
  if (cleaned.includes(";")) throw new Error("Only a single SELECT statement is allowed.");
};

const assertNoCrossSchemaRefs = async (client, query, appSchema) => {
  const cleaned = stripFunctionCalls(stripSqlLiteralsAndComments(query), [
    "extract",
    "trim",
    "overlay",
  ]);
  const schemaRef =
    /\b(from|join)\s+(?:lateral\s+)?(?:only\s+)?((?:"[^"]+"|[a-z_][a-z0-9_]*))\s*\.\s*((?:"[^"]+"|[a-z_][a-z0-9_]*))/gi;

  const unquoteIdent = (ident) => {
    const s = String(ident || "");
    if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1).replace(/""/g, '"');
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
      throw new Error("Access to system/public schemas is not allowed. Use the app tables only.");
    }
    if (schema !== allowedSchema) {
      throw new Error(
        `Cross-schema access is not allowed. Use unqualified table names (recommended) or only '${appSchema}'.<table>.`,
      );
    }
    if (!(await schemaExists(schema))) {
      throw new Error(`Schema '${schema}' does not exist.`);
    }
  }

  const forbiddenSchemaAny =
    /(?:^|[^a-z0-9_])(?:"(?:public|information_schema|pg_catalog)"|(?:public|information_schema|pg_catalog))\s*\./i;
  if (forbiddenSchemaAny.test(cleaned)) {
    throw new Error("Access to system/public schemas is not allowed. Use the app tables only.");
  }

  const setSearchPath = /\bset\s+(local\s+)?search_path\b/i;
  if (setSearchPath.test(cleaned)) throw new Error("Modifying search_path is not allowed.");

  const setConfigFn = /\bset_config\s*\(/i;
  if (setConfigFn.test(cleaned)) throw new Error("Modifying session settings is not allowed.");

  const sysCatalogRel =
    /\b(from|join)\s+(?:lateral\s+)?(?:only\s+)?(?:"?pg_[a-z0-9_]+"?)(?!\s*\.)/gi;
  if (sysCatalogRel.test(cleaned)) {
    throw new Error("Access to system catalog tables/views is not allowed. Use the app tables only.");
  }
};

const setLocalSearchPath = async (client, schema) => {
  await client.query(`SET LOCAL search_path TO ${quoteIdent(schema)}, pg_catalog`);
  return schema;
};

const getRowCount = async (client, query) => {
  const safe = stripTrailingSemicolon(query);
  const { rows } = await client.query(`SELECT COUNT(*)::bigint AS c FROM (${safe}) t`);
  return Number(rows?.[0]?.c || 0);
};

const buildProjectedSelect = (query, expectedColumns) => {
  const cols = expectedColumns.map((c) => `t.${quoteIdent(c)}`).join(", ");
  return `SELECT ${cols} FROM (${query}) t`;
};

const requiredColumnsMissingReason = (actualFields, expectedColumns) => {
  if (!Array.isArray(expectedColumns) || expectedColumns.length === 0) {
    return "No expected columns defined for this question";
  }
  const actual = new Set((actualFields || []).map((f) => String(f)));
  const missing = expectedColumns.filter((c) => !actual.has(String(c)));
  if (missing.length === 0) return null;
  return `Required column(s) missing: ${missing.map((m) => `"${m}"`).join(", ")}`;
};

const compareResultsInDb = async ({
  client,
  expectedQuery,
  userQuery,
  expectedColumns,
  config = {},
}) => {
  const ignoreOrder = config.ignore_order !== undefined ? config.ignore_order : true;
  const sortByColumns = Array.isArray(config.sort_by_columns) ? config.sort_by_columns : [];

  if (!Array.isArray(expectedColumns) || expectedColumns.length === 0) {
    return { isCorrect: false, reason: "No expected columns defined for this question" };
  }

  if (!ignoreOrder && sortByColumns.length === 0) {
    return {
      isCorrect: false,
      reason: "Question setup error: ordered comparison requires sort_by_columns",
    };
  }

  const safeExpectedQuery = stripTrailingSemicolon(expectedQuery);
  const safeUserQuery = stripTrailingSemicolon(userQuery);

  const expectedProjected = buildProjectedSelect(safeExpectedQuery, expectedColumns);
  const userProjected = buildProjectedSelect(safeUserQuery, expectedColumns);

  const normalizeSortSpec = (columnsOrSpecs) => {
    if (!Array.isArray(columnsOrSpecs)) return [];
    return columnsOrSpecs
      .map((item) => {
        if (typeof item === "string") {
          if (item.startsWith("-")) return { column: item.slice(1), direction: "desc" };
          if (item.startsWith("+")) return { column: item.slice(1), direction: "asc" };
          return { column: item, direction: "asc" };
        }
        if (item && typeof item === "object" && typeof item.column === "string") {
          return {
            column: item.column,
            direction:
              String(item.direction || "asc").toLowerCase() === "desc" ? "desc" : "asc",
          };
        }
        return null;
      })
      .filter(Boolean);
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

  const buildOrderClause = (columnsOrSpecs) => {
    if (!Array.isArray(columnsOrSpecs) || columnsOrSpecs.length === 0) return "";
    const parts = columnsOrSpecs.map((item) => {
      if (typeof item === "string") return `${quoteIdent(item)} ASC`;
      const dir = item.direction === "desc" ? "DESC" : "ASC";
      return `${quoteIdent(item.column)} ${dir}`;
    });
    return parts.join(", ");
  };

  const buildNonDecreasingExpr = (sortSpecs) => {
    if (!Array.isArray(sortSpecs) || sortSpecs.length === 0) return "";
    const lessExprs = sortSpecs.map((spec, idx) => {
      const prev = quoteIdent(`__prev_${idx}`);
      const curr = quoteIdent(spec.column);
      const op = spec.direction === "desc" ? ">" : "<";
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
      disjuncts.push(prefix ? `((${prefix}) AND ${lessExprs[i]})` : `${lessExprs[i]}`);
    }
    disjuncts.push(`(${eqExprs.join(" AND ")})`);
    return disjuncts.join(" OR ");
  };

  const normalizedSortSpecs = normalizeSortSpec(sortByColumns);
  const missingOrderCols = normalizedSortSpecs.filter((s) => !expectedColumns.includes(s.column));
  if (!ignoreOrder && missingOrderCols.length > 0) {
    return {
      isCorrect: false,
      reason: `Question setup error: sort_by_columns contains columns not in expected output (${missingOrderCols
        .map((s) => s.column)
        .join(", ")})`,
    };
  }

  const fingerprintOrder = ignoreOrder
    ? buildOrderClause(expectedColumns)
    : buildOrderClause(dedupeFingerprintSpec(normalizedSortSpecs, expectedColumns));

  const orderCheckExpr =
    !ignoreOrder && normalizedSortSpecs.length > 0 ? buildNonDecreasingExpr(normalizedSortSpecs) : "";

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
  const r = rows?.[0];
  if (!r) return { isCorrect: false, reason: "Comparison failed" };

  const expectedCount = Number(r.expected_count || 0);
  const actualCount = Number(r.actual_count || 0);
  if (expectedCount !== actualCount) {
    return {
      isCorrect: false,
      reason: `Row count mismatch (expected ${expectedCount}, got ${actualCount}).`,
    };
  }

  if (!ignoreOrder && r.actual_is_ordered === false) {
    return {
      isCorrect: false,
      reason: "Results are not ordered as required.",
    };
  }

  const isCorrect = String(r.expected_hash) === String(r.actual_hash);
  return { isCorrect, reason: isCorrect ? null : "Results did not match expected output." };
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
  if (!isSafeSchemaName(schema)) throw new Error("Invalid app schema name");
  return schema;
};

const maybeExpireSession = async (client, session) => {
  if (!session) return session;
  if (session.status !== "in_progress") return session;

  // Guard rail: if ends_at was stored with an incorrect timezone shift (TIMESTAMP without tz),
  // fix it based on started_at + template duration. This can happen if code inserted a JS Date
  // directly into a TIMESTAMP column.
  const startedAt = new Date(session.started_at);
  let endsAt = new Date(session.ends_at);
  if (!Number.isNaN(startedAt.getTime())) {
    const durationMinutes = Math.max(
      0,
      Number(session.template_snapshot?.duration_minutes || 0),
    );
    if (
      Number.isNaN(endsAt.getTime()) ||
      endsAt.getTime() <= startedAt.getTime()
    ) {
      endsAt = new Date(startedAt.getTime() + durationMinutes * 60_000);
      const { rows } = await client.query(
        `
        UPDATE public.mock_interview_sessions
        SET ends_at = $2, updated_at = NOW()
        WHERE id = $1 AND status = 'in_progress'
        RETURNING *
        `,
        [session.id, endsAt],
      );
      session = rows?.[0] || session;
    }
  }

  // Use DB time for expiry checks (more reliable than JS Date parsing, especially with
  // TIMESTAMP columns and time zone conversions).
  const { rows: expRows } = await client.query(
    `SELECT NOW() >= ends_at AS is_expired FROM public.mock_interview_sessions WHERE id = $1 LIMIT 1`,
    [session.id],
  );
  const isExpired = !!expRows?.[0]?.is_expired;
  if (!isExpired) return session;

  const { rows } = await client.query(
    `
    UPDATE public.mock_interview_sessions
    SET status = 'expired', completed_at = NOW(), updated_at = NOW()
    WHERE id = $1 AND status = 'in_progress'
    RETURNING *
    `,
    [session.id],
  );
  const next = rows?.[0] || { ...session, status: "expired" };
  try {
    await awardBadgesForEvent(
      { userId: next.user_id, event: "mock_session_finished", context: { sessionId: next.id } },
      client,
    );
  } catch (e) {
    console.warn("Failed to award badges on expire:", e?.message || e);
  }
  return next;
};

const requireSessionOwnership = async (client, sessionId, userId) => {
  const { rows } = await client.query(
    `SELECT * FROM public.mock_interview_sessions WHERE id = $1 AND user_id = $2 LIMIT 1`,
    [sessionId, userId],
  );
  if (rows.length === 0) {
    const err = new Error("Session not found");
    err.statusCode = 404;
    throw err;
  }
  const session = await maybeExpireSession(client, rows[0]);
  return session;
};

const requireInProgress = (session) => {
  if (session.status !== "in_progress") {
    const err = new Error("Session is not active.");
    err.statusCode = 409;
    throw err;
  }
};

const getSessionQuestionByIndex = async (client, sessionId, index) => {
  const idx = Number(index);
  if (!Number.isInteger(idx) || idx < 0) {
    const err = new Error("Invalid question index");
    err.statusCode = 400;
    throw err;
  }

  const { rows } = await client.query(
    `
    SELECT sq.*, q.code, q.title, q.description, q.difficulty, q.solution_columns, q.tables, q.app_id
    FROM public.mock_interview_session_questions sq
    JOIN questions q ON q.id = sq.question_id
    WHERE sq.session_id = $1 AND sq.display_order = $2
    LIMIT 1
    `,
    [sessionId, idx],
  );
  if (rows.length === 0) {
    const err = new Error("Session question not found");
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
};

const computeSessionAggregates = async (client, sessionId) => {
  const { rows } = await client.query(
    `
    SELECT
      COALESCE(SUM(score), 0)::int AS total_score,
      COALESCE(SUM(hint_penalty_total), 0)::int AS total_hint_penalty,
      COUNT(*)::int AS question_count,
      COALESCE(SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END), 0)::int AS solved_count,
      COALESCE(SUM(hints_revealed_count), 0)::int AS hints_used
    FROM public.mock_interview_session_questions
    WHERE session_id = $1
    `,
    [sessionId],
  );
  return rows?.[0] || {
    total_score: 0,
    total_hint_penalty: 0,
    question_count: 0,
    solved_count: 0,
    hints_used: 0,
  };
};

export const listTemplates = async (_req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT name FROM apps ORDER BY name`);
    const allApps = rows.map((r) => String(r.name || ""));

    const data = MOCK_INTERVIEW_TEMPLATES.map((t) => {
      const allowed =
        Array.isArray(t.allowed_apps) && t.allowed_apps.length > 0
          ? t.allowed_apps
          : allApps;
      return { ...t, allowed_apps: allowed };
    });

    res.json({ data });
  } catch (err) {
    console.error("listTemplates error:", err);
    res.status(500).json({ error: "Failed to fetch templates" });
  } finally {
    client.release();
  }
};

export const getActiveSession = async (req, res) => {
  const userId = req.userId;
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM public.mock_interview_sessions
      WHERE user_id = $1 AND status = 'in_progress'
      ORDER BY started_at DESC
      LIMIT 1
      `,
      [userId],
    );

    if (rows.length === 0) return res.json({ data: null });
    const session = await maybeExpireSession(client, rows[0]);
    if (session.status !== "in_progress") return res.json({ data: null });
    const { rows: nowRows } = await client.query(
      `
      SELECT
        NOW()::timestamptz AS server_now,
        GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (ends_at - NOW()))))::int AS remaining_seconds
      FROM public.mock_interview_sessions
      WHERE id = $1
      LIMIT 1
      `,
      [session.id],
    );
    const serverNow = nowRows?.[0]?.server_now || null;
    const remainingSeconds = Number(nowRows?.[0]?.remaining_seconds ?? 0);
    res.json({
      data: { ...session, server_now: serverNow, remaining_seconds: remainingSeconds },
    });
  } catch (err) {
    console.error("getActiveSession error:", err);
    res.status(500).json({ error: "Failed to fetch active session" });
  } finally {
    client.release();
  }
};

export const listSessions = async (req, res) => {
  const userId = req.userId;
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
      SELECT
        s.id,
        s.template_id,
        s.template_snapshot,
        s.status,
        s.started_at,
        s.ends_at,
        s.completed_at,
        s.total_score,
        s.max_score,
        s.total_hint_penalty,
        s.question_count,
        COALESCE(a.solved_count, 0)::int AS solved_count,
        COALESCE(a.hints_used, 0)::int AS hints_used
      FROM public.mock_interview_sessions s
      LEFT JOIN (
        SELECT
          session_id,
          SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END)::int AS solved_count,
          COALESCE(SUM(hints_revealed_count), 0)::int AS hints_used
        FROM public.mock_interview_session_questions
        GROUP BY session_id
      ) a ON a.session_id = s.id
      WHERE s.user_id = $1
      ORDER BY s.started_at DESC
      LIMIT 100
      `,
      [userId],
    );

    res.json({ data: rows });
  } catch (err) {
    console.error("listSessions error:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  } finally {
    client.release();
  }
};

export const startSession = async (req, res) => {
  const userId = req.userId;
  const { templateId, template: customTemplateInput } = req.body || {};

  const isCustom = !!customTemplateInput;
  const resolvedTemplateId = isCustom ? "custom" : templateId;
  const resolvedTemplate = isCustom
    ? normalizeCustomTemplate(customTemplateInput)
    : getTemplateById(templateId);

  if (!resolvedTemplate) return res.status(400).json({ error: "Unknown template" });

  const client = await pool.connect();
  try {
    if (isCustom) {
      const { rows } = await client.query(`SELECT name FROM apps ORDER BY name`);
      const allowed = new Set(rows.map((r) => String(r.name || "").toLowerCase()));
      const selected = Array.isArray(resolvedTemplate.allowed_apps)
        ? resolvedTemplate.allowed_apps.map((a) => String(a).toLowerCase()).filter((a) => allowed.has(a))
        : [];

      if (selected.length === 0) {
        return res.status(400).json({ error: "Select at least one valid app." });
      }

      resolvedTemplate.allowed_apps = selected;
    }

    const { rows: activeRows } = await client.query(
      `
      SELECT *
      FROM public.mock_interview_sessions
      WHERE user_id = $1 AND status = 'in_progress'
      ORDER BY started_at DESC
      LIMIT 1
      `,
      [userId],
    );
    if (activeRows.length > 0) {
      const session = await maybeExpireSession(client, activeRows[0]);
      if (session.status === "in_progress") {
        return res.json({ data: { sessionId: session.id, reused: true } });
      }
    }

    await client.query("BEGIN");
    const gen = await generateMockInterviewSession({
      client,
      userId,
      templateId: resolvedTemplateId,
      template: isCustom ? resolvedTemplate : undefined,
    });

    const { rows: inserted } = await client.query(
      `
      INSERT INTO public.mock_interview_sessions (
        user_id,
        template_id,
        template_snapshot,
        status,
        started_at,
        ends_at,
        current_question_index,
        max_score,
        question_count
      )
      VALUES (
        $1,
        $2,
        $3,
        'in_progress',
        NOW(),
        NOW() + ($4::int * INTERVAL '1 minute'),
        0,
        $5,
        $6
      )
      RETURNING id
      `,
      [
        userId,
        resolvedTemplateId,
        gen.template,
        gen.durationMinutes,
        gen.maxScore,
        gen.questionCount,
      ],
    );

    const sessionId = inserted[0].id;
    for (const q of gen.selectedQuestions) {
      await client.query(
        `
        INSERT INTO public.mock_interview_session_questions (
          session_id,
          question_id,
          display_order,
          status,
          base_score
        )
        VALUES ($1, $2, $3, 'not_started', $4)
        `,
        [sessionId, q.questionId, q.displayOrder, q.baseScore],
      );
    }

    await client.query("COMMIT");
    res.json({ data: { sessionId } });
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // ignore
    }
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to start session" });
  } finally {
    client.release();
  }
};

export const getSession = async (req, res) => {
  const userId = req.userId;
  const { sessionId } = req.params;
  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    const aggregates = await computeSessionAggregates(client, session.id);
    const { rows: remainingRows } = await client.query(
      `
      SELECT
        NOW()::timestamptz AS server_now,
        GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (ends_at - NOW()))))::int AS remaining_seconds
      FROM public.mock_interview_sessions
      WHERE id = $1
      LIMIT 1
      `,
      [session.id],
    );
    const serverNow = remainingRows?.[0]?.server_now || null;
    const remainingSeconds = Number(remainingRows?.[0]?.remaining_seconds ?? 0);
    res.json({
      data: {
        ...session,
        ...aggregates,
        server_now: serverNow,
        remaining_seconds: remainingSeconds,
      },
    });
  } catch (err) {
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to fetch session" });
  } finally {
    client.release();
  }
};

export const navigateSession = async (req, res) => {
  const userId = req.userId;
  const { sessionId } = req.params;
  const { index } = req.body || {};

  const idx = Number(index);
  if (!Number.isInteger(idx) || idx < 0) return res.status(400).json({ error: "Invalid index" });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const session = await requireSessionOwnership(client, sessionId, userId);
    requireInProgress(session);

    // Ensure index is in bounds
    const { rows: countRows } = await client.query(
      `SELECT COUNT(*)::int AS c FROM public.mock_interview_session_questions WHERE session_id = $1`,
      [session.id],
    );
    const count = countRows?.[0]?.c || 0;
    if (idx >= count) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Index out of bounds" });
    }

    await client.query(
      `
      UPDATE public.mock_interview_sessions
      SET current_question_index = $1, updated_at = NOW()
      WHERE id = $2 AND user_id = $3
      `,
      [idx, session.id, userId],
    );

    // Mark question started if first visit
    await client.query(
      `
      UPDATE public.mock_interview_session_questions
      SET
        status = CASE WHEN status = 'not_started' THEN 'in_progress' ELSE status END,
        started_at = COALESCE(started_at, NOW()),
        updated_at = NOW()
      WHERE session_id = $1 AND display_order = $2
      `,
      [session.id, idx],
    );

    await client.query("COMMIT");
    res.json({ data: { ok: true } });
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // ignore
    }
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to navigate session" });
  } finally {
    client.release();
  }
};

export const getSessionQuestion = async (req, res) => {
  const userId = req.userId;
  const { sessionId, index } = req.params;
  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    const sq = await getSessionQuestionByIndex(client, session.id, index);

    // Mark question started on first view (avoids requiring a separate navigate call on page load).
    // Safe because it is idempotent.
    if (session.status === "in_progress") {
      const idx = Number(index);
      if (Number.isInteger(idx) && idx >= 0) {
        await client.query(
          `
          UPDATE public.mock_interview_session_questions
          SET
            status = CASE WHEN status = 'not_started' THEN 'in_progress' ELSE status END,
            started_at = COALESCE(started_at, NOW()),
            updated_at = NOW()
          WHERE session_id = $1 AND display_order = $2
          `,
          [session.id, idx],
        );
      }
    }

    // Schemas/relationships for this question, matching exercise detail shape.
    const tableNames = Array.isArray(sq.tables) ? sq.tables : [];
    let schemas = [];
    let relationships = [];
    if (tableNames.length > 0) {
      const schemaRes = await client.query(
        `SELECT table_name, columns, description
         FROM table_schemas
         WHERE app_id = $1 AND table_name = ANY($2::text[])`,
        [sq.app_id, tableNames],
      );
      schemas = schemaRes.rows;
      const relRes = await client.query(
        `SELECT from_table, from_column, to_table, to_column
         FROM table_relationships
         WHERE app_id = $1
           AND from_table = ANY($2::text[])
           AND to_table = ANY($2::text[])`,
        [sq.app_id, tableNames],
      );
      relationships = relRes.rows;
    }

    const hintsRes = await client.query(
      `
      SELECT
        h.id,
        h.hint_order,
        h.content,
        EXISTS (
          SELECT 1
          FROM public.mock_interview_hint_usage miu
          WHERE miu.session_question_id = $1 AND miu.hint_id = h.id
        ) AS revealed
      FROM hints h
      WHERE h.question_code = $2
      ORDER BY h.hint_order ASC
      `,
      [sq.id, sq.code],
    );

    res.json({
      data: {
        session,
        session_question: {
          id: sq.id,
          status: sq.status,
          attempts_count: sq.attempts_count,
          hints_revealed_count: sq.hints_revealed_count,
          hint_penalty_total: sq.hint_penalty_total,
          base_score: sq.base_score,
          score: sq.score,
          last_query: sq.last_query,
          final_query: sq.final_query,
          is_correct: sq.is_correct,
          started_at: sq.started_at,
          answered_at: sq.answered_at,
        },
        exercise: {
          id: sq.question_id,
          code: sq.code,
          title: sq.title,
          description: sq.description,
          difficulty: sq.difficulty,
          solution_columns: sq.solution_columns,
          tables: sq.tables,
          app_id: sq.app_id,
          schemas,
          relationships,
        },
        hints: hintsRes.rows,
      },
    });
  } catch (err) {
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to fetch session question" });
  } finally {
    client.release();
  }
};

export const revealSessionHint = async (req, res) => {
  const userId = req.userId;
  const { sessionId, index, hintId } = req.params;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const session = await requireSessionOwnership(client, sessionId, userId);
    requireInProgress(session);

    const sq = await getSessionQuestionByIndex(client, session.id, index);

    const { rows: existsRows } = await client.query(
      `
      SELECT 1
      FROM public.mock_interview_hint_usage
      WHERE session_question_id = $1 AND hint_id = $2
      LIMIT 1
      `,
      [sq.id, hintId],
    );
    if (existsRows.length === 0) {
      await client.query(
        `
        INSERT INTO public.mock_interview_hint_usage (session_question_id, hint_id)
        VALUES ($1, $2)
        ON CONFLICT (session_question_id, hint_id) DO NOTHING
        `,
        [sq.id, hintId],
      );

      const template = session.template_snapshot;
      const penaltyPer = Math.max(0, Number(template?.hint_penalty_per_reveal || 0));

      await client.query(
        `
        UPDATE public.mock_interview_session_questions
        SET
          hints_revealed_count = hints_revealed_count + 1,
          hint_penalty_total = hint_penalty_total + $1,
          updated_at = NOW()
        WHERE id = $2
        `,
        [penaltyPer, sq.id],
      );
    }

    await client.query("COMMIT");
    res.json({ data: { ok: true } });
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // ignore
    }
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to reveal hint" });
  } finally {
    client.release();
  }
};

export const executeSessionQuery = async (req, res) => {
  const userId = req.userId;
  const { sessionId, index } = req.params;
  const { query } = req.body || {};

  if (!query || typeof query !== "string") return res.status(400).json({ error: "Query is missing or invalid" });

  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    requireInProgress(session);
    const sq = await getSessionQuestionByIndex(client, session.id, index);

    assertSelectOrWithOnly(query);
    assertSingleStatement(query);

    const qRes = await client.query(
      `SELECT expected_query, comparison_config, solution_columns FROM questions WHERE id = $1`,
      [sq.question_id],
    );
    if (qRes.rows.length === 0) return res.status(404).json({ error: "Question not found" });

    const expectedQuery = qRes.rows[0].expected_query;
    const expectedColumns = qRes.rows[0].solution_columns;
    const config = qRes.rows[0].comparison_config || {};
    const compareInDb = !!config.compare_in_db;
    const ignoreOrder = config.ignore_order !== undefined ? config.ignore_order : true;
    const timeoutMs =
      typeof config.statement_timeout_ms === "number" ? config.statement_timeout_ms : 60000;
    const previewRowLimit = 200;

    const queryWithoutSemicolon = stripTrailingSemicolon(query);

    await client.query("BEGIN");
    const appSchema = await getAppSchemaByQuestionId(client, sq.question_id);
    await assertNoCrossSchemaRefs(client, query, appSchema);
    await setLocalSearchPath(client, appSchema);
    await client.query(`SET LOCAL statement_timeout = ${timeoutMs}`);

    const previewQuery = `SELECT * FROM (${queryWithoutSemicolon}) t LIMIT ${previewRowLimit}`;
    let userPreviewResult;
    try {
      userPreviewResult = await client.query(previewQuery);
    } catch (error) {
      await client.query(
        `
        UPDATE public.mock_interview_session_questions
        SET last_query = $1, status = 'in_progress', updated_at = NOW()
        WHERE id = $2
        `,
        [query, sq.id],
      );
      await client.query("COMMIT");
      return res.status(400).json({ error: error.message, isCorrect: false });
    }

    const previewFields = userPreviewResult.fields?.map((f) => f.name) || [];
    const missingColsReason = requiredColumnsMissingReason(
      previewFields,
      expectedColumns,
    );
    if (missingColsReason) {
      await client.query(
        `
        UPDATE public.mock_interview_session_questions
        SET last_query = $1, status = 'in_progress', updated_at = NOW()
        WHERE id = $2
        `,
        [query, sq.id],
      );
      await client.query("COMMIT");
      return res.json({
        isCorrect: false,
        rows: userPreviewResult.rows,
        fields: previewFields,
        reason: missingColsReason,
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
        const userFullResult = await client.query(query);
        const expectedResult = await client.query(expectedQuery);
        result = compareResults({
          expectedRows: expectedResult.rows,
          actualRows: userFullResult.rows,
          expectedColumns,
          config,
        });
      }
    } catch (e) {
      result = { isCorrect: false, reason: e.message };
    }

    await client.query(
      `
      UPDATE public.mock_interview_session_questions
      SET last_query = $1, status = 'in_progress', updated_at = NOW()
      WHERE id = $2
      `,
      [query, sq.id],
    );

    await client.query("COMMIT");
    res.json({
      isCorrect: !!result.isCorrect,
      rows: userPreviewResult.rows,
      fields: previewFields,
      reason: result?.reason,
    });
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // ignore
    }
    const status = err?.statusCode || 400;
    res.status(status).json({ error: err?.message || "Failed to execute query" });
  } finally {
    client.release();
  }
};

export const submitSessionAnswer = async (req, res) => {
  const userId = req.userId;
  const { sessionId, index } = req.params;
  const { query } = req.body || {};

  if (!query || typeof query !== "string") return res.status(400).json({ error: "Query is missing or invalid" });

  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    requireInProgress(session);
    const sq = await getSessionQuestionByIndex(client, session.id, index);

    assertSelectOrWithOnly(query);
    assertSingleStatement(query);

    const qRes = await client.query(
      `SELECT expected_query, comparison_config, solution_columns, difficulty FROM questions WHERE id = $1`,
      [sq.question_id],
    );
    if (qRes.rows.length === 0) return res.status(404).json({ error: "Question not found" });

    const expectedQuery = qRes.rows[0].expected_query;
    const expectedColumns = qRes.rows[0].solution_columns;
    const config = qRes.rows[0].comparison_config || {};
    const compareInDb = !!config.compare_in_db;
    const ignoreOrder = config.ignore_order !== undefined ? config.ignore_order : true;
    const timeoutMs =
      typeof config.statement_timeout_ms === "number" ? config.statement_timeout_ms : 60000;

    await client.query("BEGIN");
    const appSchema = await getAppSchemaByQuestionId(client, sq.question_id);
    await assertNoCrossSchemaRefs(client, query, appSchema);
    await setLocalSearchPath(client, appSchema);
    await client.query(`SET LOCAL statement_timeout = ${timeoutMs}`);

    // Ensure user query executes (full query) before comparing.
    let userFullResult;
    try {
      userFullResult = await client.query(query);
    } catch (error) {
      await client.query(
        `
        UPDATE public.mock_interview_session_questions
        SET
          attempts_count = attempts_count + 1,
          last_query = $1,
          status = 'in_progress',
          updated_at = NOW()
        WHERE id = $2
        `,
        [query, sq.id],
      );
      await client.query("COMMIT");
      return res.status(400).json({ error: error.message, isCorrect: false });
    }

    const actualFields = userFullResult.fields?.map((f) => f.name) || [];
    const missingColsReason = requiredColumnsMissingReason(
      actualFields,
      expectedColumns,
    );

    let result;
    try {
      if (missingColsReason) {
        result = { isCorrect: false, reason: missingColsReason };
      } else {
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
        const expectedResult = await client.query(expectedQuery);
        result = compareResults({
          expectedRows: expectedResult.rows,
          actualRows: userFullResult.rows,
          expectedColumns,
          config,
        });
      }
      }
    } catch (e) {
      result = { isCorrect: false, reason: e.message };
    }

    const isCorrect = !!result.isCorrect;
    const template = session.template_snapshot || {};
    const hintPenaltyPer = Math.max(0, Number(template.hint_penalty_per_reveal || 0));
    const questionScore = computeQuestionScore({
      baseScore: sq.base_score,
      hintsRevealedCount: sq.hints_revealed_count,
      hintPenaltyPerReveal: hintPenaltyPer,
      isCorrect,
    });
    const status = isCorrect ? "correct" : "incorrect";

    await client.query(
      `
      UPDATE public.mock_interview_session_questions
      SET
        attempts_count = attempts_count + 1,
        last_query = $1,
        final_query = $1,
        is_correct = $2,
        status = $3,
        score = $4,
        answered_at = NOW(),
        updated_at = NOW()
      WHERE id = $5
      `,
      [query, isCorrect, status, questionScore, sq.id],
    );

    // Recompute session aggregates
    const aggregates = await computeSessionAggregates(client, session.id);
    await client.query(
      `
      UPDATE public.mock_interview_sessions
      SET
        total_score = $1,
        total_hint_penalty = $2,
        updated_at = NOW()
      WHERE id = $3
      `,
      [aggregates.total_score, aggregates.total_hint_penalty, session.id],
    );

    let newBadges = [];
    // If all questions correct, complete the session
    if (aggregates.solved_count === Number(session.question_count)) {
      await client.query(
        `
        UPDATE public.mock_interview_sessions
        SET status = 'completed', completed_at = NOW(), updated_at = NOW()
        WHERE id = $1 AND status = 'in_progress'
        `,
        [session.id],
      );

      try {
        const awarded = await awardBadgesForEvent(
          { userId, event: "mock_session_finished", context: { sessionId: session.id } },
          client,
        );
        newBadges = awarded?.newlyEarned || [];
      } catch (e) {
        console.warn("Failed to award badges on session complete:", e?.message || e);
      }
    }

    await client.query("COMMIT");
    res.json({
      isCorrect,
      rows: userFullResult.rows?.slice?.(0, 200) || [],
      fields: actualFields,
      reason: result?.reason,
      score: questionScore,
      newBadges,
    });
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // ignore
    }
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to submit answer" });
  } finally {
    client.release();
  }
};

export const endSession = async (req, res) => {
  const userId = req.userId;
  const { sessionId } = req.params;
  const { reason } = req.body || {};

  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    if (session.status !== "in_progress") return res.json({ data: { ok: true } });

    const nextStatus =
      String(reason || "").toLowerCase() === "abandoned" ? "abandoned" : "completed";

    await client.query(
      `
      UPDATE public.mock_interview_sessions
      SET status = $1, completed_at = NOW(), updated_at = NOW()
      WHERE id = $2 AND user_id = $3 AND status = 'in_progress'
      `,
      [nextStatus, session.id, userId],
    );

    let newBadges = [];
    try {
      const awarded = await awardBadgesForEvent(
        { userId, event: "mock_session_finished", context: { sessionId: session.id } },
        client,
      );
      newBadges = awarded?.newlyEarned || [];
    } catch (e) {
      console.warn("Failed to award badges on endSession:", e?.message || e);
    }

    res.json({ data: { ok: true }, newBadges });
  } catch (err) {
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to end session" });
  } finally {
    client.release();
  }
};

export const getSummary = async (req, res) => {
  const userId = req.userId;
  const { sessionId } = req.params;
  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    let newBadges = [];
    if (session.status !== "in_progress") {
      try {
        const awarded = await awardBadgesForEvent(
          { userId, event: "mock_session_finished", context: { sessionId: session.id } },
          client,
        );
        newBadges = awarded?.newlyEarned || [];
      } catch (e) {
        console.warn("Failed to award badges on summary:", e?.message || e);
      }
    }
    const aggregates = await computeSessionAggregates(client, session.id);
    const { rows: questions } = await client.query(
      `
      SELECT
        sq.display_order,
        sq.status,
        sq.attempts_count,
        sq.hints_revealed_count,
        sq.hint_penalty_total,
        sq.base_score,
        sq.score,
        sq.is_correct,
        q.code,
        q.title,
        q.difficulty
      FROM public.mock_interview_session_questions sq
      JOIN questions q ON q.id = sq.question_id
      WHERE sq.session_id = $1
      ORDER BY sq.display_order ASC
      `,
      [session.id],
    );

    res.json({ data: { session, ...aggregates, questions }, newBadges });
  } catch (err) {
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to fetch summary" });
  } finally {
    client.release();
  }
};

export const getReviewSolutions = async (req, res) => {
  const userId = req.userId;
  const { sessionId, index } = req.params;
  const client = await pool.connect();
  try {
    const session = await requireSessionOwnership(client, sessionId, userId);
    if (session.status === "in_progress") {
      return res.status(403).json({ error: "Solutions are locked during an active mock interview." });
    }

    const sq = await getSessionQuestionByIndex(client, session.id, index);
    const { rows } = await client.query(
      `
      SELECT id, approach_title, approach_type, explanation, query, is_optimal, display_order
      FROM solutions
      WHERE question_id = $1
      ORDER BY display_order ASC
      `,
      [sq.question_id],
    );
    res.json({ data: rows });
  } catch (err) {
    const status = err?.statusCode || 500;
    res.status(status).json({ error: err?.message || "Failed to fetch solutions" });
  } finally {
    client.release();
  }
};
