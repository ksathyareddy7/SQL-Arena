import pool from "../database/db.js";
import { getAppIdByName } from "../database/base/scripts/base.data.js";

/**
 * Tiny assertion helper used throughout the loader.
 *
 * Why:
 * - Makes validation failures fail fast with a clear, actionable message.
 * - Keeps the rest of the code readable (no deeply nested `if` / `throw`).
 *
 * @param {any} condition
 * @param {string} message
 */
function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

/**
 * True when a value is a non-empty string (after trim).
 *
 * @param {any} v
 * @returns {boolean}
 */
function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Normalize a question code for comparisons / lookups.
 * We only trim because codes are expected to already be canonical (e.g. SOCIAL_001).
 *
 * @param {any} code
 * @returns {string}
 */
function normalizeCode(code) {
  return String(code || "").trim();
}

/**
 * Validates that an input is an array and returns it (for nicer call sites).
 *
 * @template T
 * @param {any} value
 * @param {string} label
 * @returns {T[]}
 */
function toArray(value, label) {
  invariant(Array.isArray(value), `${label} must be an array`);
  return value;
}

/**
 * This set must match the base `concepts` insert list.
 *
 * Source of truth: base seed SQL inserts (kept intentionally explicit here so the
 * loader can fail fast and keep concept taxonomy consistent across apps).
 */
const CANONICAL_CONCEPTS = new Set([
  "advanced_sql",
  "aggregation",
  "anti_join",
  "arithmetic",
  "average",
  "calculation",
  "case_when",
  "comparison",
  "conditional_aggregation",
  "conversion_metrics",
  "count",
  "count_distinct",
  "cte",
  "date_difference",
  "date_functions",
  "distinct",
  "exists",
  "filtering",
  "group_by",
  "having",
  "joins",
  "lag",
  "lag_lead",
  "lead",
  "left_join",
  "limit",
  "max",
  "min",
  "moving_average",
  "null_handling",
  "ordered_set_aggregate",
  "partition_by",
  "pattern_detection",
  "percentile",
  "performance",
  "postgres_specific",
  "ranking",
  "row_number",
  "running_max",
  "running_total",
  "self_join",
  "set_operations",
  "sorting",
  "string_functions",
  "subquery",
  "sum",
  "trend_analysis",
  "union",
  "window_functions",
]);

/**
 * Normalize and canonicalize a single concept token.
 *
 * - Trims whitespace
 * - Lowercases (concept taxonomy is lowercase snake_case)
 * - Validates final token exists in CANONICAL_CONCEPTS
 *
 * @param {string} concept
 * @param {string} questionCode
 * @returns {string}
 */
function canonicalizeConcept(concept, questionCode) {
  invariant(
    isNonEmptyString(concept),
    `Invalid concept name for ${questionCode}`,
  );

  const raw = String(concept).trim().toLowerCase();

  invariant(
    CANONICAL_CONCEPTS.has(raw),
    `Unknown concept '${raw}' for ${questionCode}. Add it to base concepts or fix the app concept filters.`,
  );

  return raw;
}

/**
 * Canonicalize and de-duplicate the concept list for a question.
 * Preserves original relative order (first occurrence wins).
 *
 * @param {string[]} concepts
 * @param {string} questionCode
 * @returns {string[]}
 */
function canonicalizeConceptList(concepts, questionCode) {
  const out = [];
  const seen = new Set();
  for (const c of concepts) {
    const canon = canonicalizeConcept(c, questionCode);
    if (seen.has(canon)) continue;
    seen.add(canon);
    out.push(canon);
  }
  return out;
}

function safeIdent(name, label) {
  invariant(
    /^[a-z_][a-z0-9_]*$/.test(String(name || "")),
    `Invalid ${label}: ${name}`,
  );
  return String(name);
}

function stripTrailingSemicolon(sql) {
  const s = String(sql || "").trim();
  return s.endsWith(";") ? s.slice(0, -1).trim() : s;
}

async function computeExpectedPreview(client, appName, question) {
  const schema = safeIdent(`${appName}_schema`, "schema");
  const expectedQuery = stripTrailingSemicolon(question.expected_query);

  if (!isNonEmptyString(expectedQuery)) {
    return { fields: null, rows: null };
  }

  // Keep previews light and robust — expected queries can be expensive.
  // If a query fails or times out, we just store NULL previews.
  //
  // IMPORTANT: In Postgres, any error inside a transaction aborts the entire
  // transaction until ROLLBACK. Since the loader runs inside a transaction,
  // we must isolate preview execution inside a SAVEPOINT and roll back to it
  // on failure, otherwise one bad expected query will abort the whole load.
  try {
    await client.query(`SAVEPOINT expected_preview`);
    await client.query(`SET LOCAL search_path TO ${schema}, public;`);
    await client.query(`SET LOCAL statement_timeout = '2000ms';`);

    const limit = 10;
    const res = await client.query(
      `SELECT * FROM (${expectedQuery}) AS expected_preview LIMIT ${limit}`,
    );

    const fields = Array.isArray(res.fields)
      ? res.fields.map((f) => f?.name).filter(Boolean)
      : [];

    const rows = Array.isArray(res.rows) ? res.rows : [];

    await client.query(`RELEASE SAVEPOINT expected_preview`);
    return { fields, rows };
  } catch {
    try {
      await client.query(`ROLLBACK TO SAVEPOINT expected_preview`);
      await client.query(`RELEASE SAVEPOINT expected_preview`);
    } catch {
      // ignore
    }
    return { fields: null, rows: null };
  }
}

/**
 * Validates question objects. This is intentionally strict because:
 * - We want failures at load time (not later during query execution/tests).
 * - Missing/invalid fields can cause confusing DB errors or silent data drift.
 *
 * Required fields:
 * - code, title, description, difficulty, expected_query, app_id
 * - solution_columns (array), tables (array)
 *
 * Additional checks:
 * - unique question code
 *
 * @param {Array<any>} questions
 */
function validateQuestions(questions) {
  const codes = new Set();
  for (const q of questions) {
    invariant(isNonEmptyString(q?.code), "Question missing code");
    invariant(isNonEmptyString(q?.title), `Missing title for ${q.code}`);
    invariant(
      isNonEmptyString(q?.description),
      `Missing description for ${q.code}`,
    );
    invariant(
      ["easy", "medium", "hard"].includes(q?.difficulty),
      `Invalid difficulty for ${q.code}`,
    );
    invariant(
      isNonEmptyString(q?.expected_query),
      `Missing expected_query for ${q.code}`,
    );
    invariant(
      Number.isInteger(q?.app_id) && q.app_id > 0,
      `Missing/invalid app_id for ${q.code}`,
    );
    invariant(
      Array.isArray(q?.solution_columns),
      `solution_columns must be an array for ${q.code}`,
    );
    invariant(Array.isArray(q?.tables), `tables must be an array for ${q.code}`);

    invariant(!codes.has(q.code), `Duplicate question code: ${q.code}`);
    codes.add(q.code);
  }
}

/**
 * Validates hints payload structure.
 *
 * Expected input shape:
 *   [{ code: "APP_001", hints: [{ hint_order: 1, content: "..." }, ...] }, ...]
 *
 * Checks:
 * - `code` exists
 * - `hints` is an array
 * - each hint has a positive integer `hint_order`
 * - each hint has non-empty `content`
 * - `hint_order` is unique per question code
 *
 * @param {Array<any>} hints
 */
function validateHints(hints) {
  for (const entry of hints) {
    invariant(isNonEmptyString(entry?.code), "Hint entry missing code");
    invariant(Array.isArray(entry?.hints), `Hints missing for ${entry.code}`);
    const orders = new Set();
    for (const h of entry.hints) {
      invariant(
        Number.isInteger(h?.hint_order) && h.hint_order > 0,
        `Invalid hint_order for ${entry.code}`,
      );
      invariant(
        isNonEmptyString(h?.content),
        `Hint content missing for ${entry.code} order ${h.hint_order}`,
      );
      invariant(
        !orders.has(h.hint_order),
        `Duplicate hint_order ${h.hint_order} for ${entry.code}`,
      );
      orders.add(h.hint_order);
    }
  }
}

/**
 * Validates concept filter payload structure.
 *
 * Expected input shape:
 *   [{ code: "APP_001", concepts: ["joins", "group_by"] }, ...]
 *
 * Notes:
 * - This loader also ensures concepts exist in `concepts` table at insert time.
 * - We do not attempt to canonicalize concept names here; keep the upstream data
 *   normalized (we have a separate validator script for that).
 *
 * @param {Array<any>} filters
 */
function validateConceptFilters(filters) {
  for (const entry of filters) {
    invariant(isNonEmptyString(entry?.code), "Concept filter entry missing code");
    invariant(
      Array.isArray(entry?.concepts),
      `Concepts missing for ${entry.code}`,
    );

    // Canonicalize in-place so downstream steps always see normalized concept names.
    entry.concepts = canonicalizeConceptList(entry.concepts, entry.code);
  }
}

/**
 * Validates solution approaches payload structure.
 *
 * Expected input shape:
 *   [{ code: "APP_001", approaches: [{ display_order: 1, query: "...", explanation: "...", ... }, ...] }, ...]
 *
 * Checks:
 * - `code` exists
 * - `approaches` is an array
 * - unique positive integer `display_order` per question
 * - max 1 `is_optimal` per question (optional field)
 * - non-empty `query` and `explanation`
 *
 * @param {Array<any>} solutions
 */
function validateSolutions(solutions) {
  for (const entry of solutions) {
    invariant(isNonEmptyString(entry?.code), "Solution entry missing code");
    invariant(
      Array.isArray(entry?.approaches),
      `Approaches missing for ${entry.code}`,
    );
    const orders = new Set();
    let optimalCount = 0;
    for (const a of entry.approaches) {
      invariant(
        Number.isInteger(a?.display_order) && a.display_order > 0,
        `Missing/invalid display_order in ${entry.code}`,
      );
      invariant(
        !orders.has(a.display_order),
        `Duplicate display_order ${a.display_order} in ${entry.code}`,
      );
      orders.add(a.display_order);
      if (a.is_optimal) optimalCount++;
      invariant(
        isNonEmptyString(a?.query),
        `Missing query in ${entry.code} (order ${a.display_order})`,
      );
      invariant(
        isNonEmptyString(a?.explanation),
        `Missing explanation in ${entry.code} (order ${a.display_order})`,
      );
    }
    invariant(optimalCount <= 1, `Multiple optimal solutions in ${entry.code}`);
  }
}

/**
 * Ensures a row exists in `apps` for the given app and that its ID matches the
 * fixed app mapping.
 *
 * Why:
 * - We want stable app identifiers across environments (no auto-increment drift).
 * - Questions reference `app_id`, so this must exist before upserting questions.
 *
 * Behavior:
 * - Looks up `mapped` appId via `getAppIdByName(appName)`.
 * - If `expectedAppId` is provided (from the questions payload), asserts it matches.
 * - Upserts row using `id = app_id = mapped`.
 *
 * @param {import("pg").PoolClient} client
 * @param {string} appName
 * @param {number|null|undefined} expectedAppId
 */
async function ensureAppRow(client, appName, expectedAppId) {
  const mapped = getAppIdByName(appName);
  invariant(mapped, `Missing app_id mapping for '${appName}'`);

  if (expectedAppId !== undefined && expectedAppId !== null) {
    invariant(
      mapped === expectedAppId,
      `App id mismatch for '${appName}': mapping=${mapped}, questions=${expectedAppId}`,
    );
  }

  await client.query(
    `
    INSERT INTO apps (app_id, name)
    VALUES ($1, $2)
    ON CONFLICT (app_id)
    DO UPDATE SET
      name = EXCLUDED.name
  `,
    [mapped, appName],
  );
}

/**
 * Fetches DB question IDs for the provided question codes.
 *
 * We do this after upserting questions so:
 * - later steps can reference `question_id` (concept filters + solutions)
 * - we can validate that upsert actually persisted rows we expect
 *
 * @param {import("pg").PoolClient} client
 * @param {string[]} codes
 * @returns {Promise<Map<string, number>>} code -> question_id
 */
async function getQuestionIdByCode(client, codes) {
  if (!codes.length) return new Map();
  const res = await client.query(
    `SELECT id, code FROM questions WHERE code = ANY($1)`,
    [codes],
  );
  const map = new Map();
  for (const r of res.rows) map.set(r.code, r.id);
  return map;
}

/**
 * Inserts any missing concepts into the `concepts` table.
 *
 * This keeps app loaders simpler: concept filters can assume a concept name
 * is valid without requiring base seeding to always be updated first.
 *
 * @param {import("pg").PoolClient} client
 * @param {string[]} names
 */
/**
 * Fetches concept IDs for the provided concept names.
 *
 * @param {import("pg").PoolClient} client
 * @param {string[]} names
 * @returns {Promise<Map<string, number>>} name -> concept_id
 */
async function getConceptIdByName(client, names) {
  if (!names.length) return new Map();
  const res = await client.query(
    `SELECT id, name FROM concepts WHERE name = ANY($1)`,
    [names],
  );
  const map = new Map();
  for (const r of res.rows) map.set(r.name, r.id);
  return map;
}

/**
 * Upserts all questions by unique `code`.
 *
 * Notes:
 * - Uses `solution_columns`, `tables`, `comparison_config` as JSONB in DB.
 * - If a question changes over time (title/expected_query/etc.), this keeps the DB in sync.
 *
 * @param {import("pg").PoolClient} client
 * @param {Array<any>} questions
 */
async function upsertQuestions(client, questions) {
  for (const q of questions) {
    await client.query(
      `
      INSERT INTO questions (
        app_id,
        code,
        title,
        description,
        difficulty,
        expected_query,
        solution_columns,
        expected_preview_fields,
        expected_preview_rows,
        tables,
        comparison_config
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9::jsonb,$10::jsonb,$11::jsonb)
      ON CONFLICT (code)
      DO UPDATE SET
        app_id = EXCLUDED.app_id,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        difficulty = EXCLUDED.difficulty,
        expected_query = EXCLUDED.expected_query,
        solution_columns = EXCLUDED.solution_columns,
        expected_preview_fields = EXCLUDED.expected_preview_fields,
        expected_preview_rows = EXCLUDED.expected_preview_rows,
        tables = EXCLUDED.tables,
        comparison_config = EXCLUDED.comparison_config
    `,
      [
        q.app_id,
        q.code,
        q.title,
        q.description,
        q.difficulty,
        q.expected_query,
        JSON.stringify(q.solution_columns ?? []),
        JSON.stringify(q.expected_preview_fields ?? null),
        JSON.stringify(q.expected_preview_rows ?? null),
        JSON.stringify(q.tables ?? []),
        JSON.stringify(q.comparison_config ?? {}),
      ],
    );
  }
}

/**
 * Upserts hints for all questions. Hints are keyed by (question_code, hint_order).
 *
 * Notes:
 * - Uses `question_code` instead of question_id because:
 *   - It's stable and already used elsewhere in the codebase.
 *   - It keeps the hints table easy to reason about and avoids extra joins.
 *
 * @param {import("pg").PoolClient} client
 * @param {Array<any>} hints
 * @param {Set<string>} questionCodesSet
 */
async function upsertHints(client, hints, questionCodesSet) {
  for (const entry of hints) {
    const code = normalizeCode(entry.code);
    invariant(questionCodesSet.has(code), `Hints refer to unknown code: ${code}`);
    for (const h of entry.hints) {
      await client.query(
        `
        INSERT INTO hints (question_code, hint_order, content)
        VALUES ($1, $2, $3)
        ON CONFLICT (question_code, hint_order)
        DO UPDATE SET content = EXCLUDED.content
      `,
        [code, h.hint_order, h.content],
      );
    }
  }
}

/**
 * Replaces concept filters for the affected questions.
 *
 * This is intentionally "replace" (delete then insert), not a partial upsert:
 * - prevents stale associations when a question's concepts change
 * - easier to keep deterministic and aligned with the source-of-truth files
 *
 * Steps:
 * 1) Delete existing question_concepts for the relevant question IDs
 * 2) Ensure all concepts exist in `concepts`
 * 3) Insert question_concepts rows (deduped per question)
 *
 * @param {import("pg").PoolClient} client
 * @param {Array<any>} conceptFilters
 * @param {Map<string, number>} questionIdByCode
 */
async function replaceConceptFilters(client, conceptFilters, questionIdByCode) {
  if (!conceptFilters.length) return;

  const codes = conceptFilters.map((c) => normalizeCode(c.code)).filter(Boolean);
  const questionIds = codes
    .map((c) => questionIdByCode.get(c))
    .filter(Boolean);
  if (questionIds.length) {
    await client.query(
      `DELETE FROM question_concepts WHERE question_id = ANY($1::int[])`,
      [questionIds],
    );
  }

  const conceptNames = Array.from(
    new Set(
      conceptFilters
        .flatMap((f) => (Array.isArray(f.concepts) ? f.concepts : []))
        .map((c) => String(c).trim())
        .filter(Boolean),
    ),
  );
  const conceptIdByName = await getConceptIdByName(client, conceptNames);
  for (const name of conceptNames) {
    invariant(
      conceptIdByName.has(name),
      `Concept '${name}' is not present in the database. Did you run base setup (concepts seed)?`,
    );
  }

  for (const entry of conceptFilters) {
    const code = normalizeCode(entry.code);
    const questionId = questionIdByCode.get(code);
    invariant(questionId, `Concept filters refer to unknown code: ${code}`);

    const conceptList = canonicalizeConceptList(entry.concepts, code);

    for (const name of conceptList) {
      const conceptId = conceptIdByName.get(name);
      invariant(conceptId, `Unknown concept '${name}' for ${code}`);
      await client.query(
        `
        INSERT INTO question_concepts (question_id, concept_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `,
        [questionId, conceptId],
      );
    }
  }
}

/**
 * Replaces ALL solutions for each question in the provided payload.
 *
 * This is intentionally "replace" (delete then insert) because solutions are
 * ordered, and updates often involve:
 * - changing display_order
 * - adding/removing approaches
 * - switching which approach is optimal
 *
 * A "replace" model avoids stale/duplicate approaches.
 *
 * @param {import("pg").PoolClient} client
 * @param {Array<any>} solutions
 * @param {Map<string, number>} questionIdByCode
 */
async function replaceSolutions(client, solutions, questionIdByCode) {
  for (const entry of solutions) {
    const code = normalizeCode(entry.code);
    const questionId = questionIdByCode.get(code);
    invariant(questionId, `Solutions refer to unknown code: ${code}`);

    await client.query(`DELETE FROM solutions WHERE question_id = $1`, [
      questionId,
    ]);

    for (const approach of entry.approaches) {
      await client.query(
        `
        INSERT INTO solutions (
          question_id,
          approach_title,
          approach_type,
          explanation,
          query,
          is_optimal,
          display_order
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
        [
          questionId,
          approach.approach_title || null,
          approach.approach_type || null,
          approach.explanation,
          approach.query,
          !!approach.is_optimal,
          approach.display_order,
        ],
      );
    }
  }
}

/**
 * Load (insert/update) all app exercise content into the database.
 *
 * This is the generic loader used by each app-specific "load data" script.
 * It expects fully materialized JS arrays (questions, hints, concept filters,
 * solutions) which act as the source of truth for the app's exercise content.
 *
 * Transaction behavior:
 * - If `client` is provided, the caller owns the transaction lifecycle.
 * - If no `client` is provided, we create a client and wrap everything in a transaction:
 *   BEGIN -> load -> COMMIT (or ROLLBACK on error).
 *
 * What it does:
 * 1) Validate payload structures (fail fast)
 * 2) Ensure the `apps` row exists (fixed app_id mapping)
 * 3) Upsert questions by code
 * 4) Upsert hints by (question_code, hint_order)
 * 5) Replace concept filters (question_concepts)
 * 6) Replace solutions (delete all per question then insert approaches)
 *
 * Return value is a small summary useful for logs.
 *
 * @param {object} args
 * @param {string} args.appName
 * @param {Array<any>} args.questions
 * @param {Array<any>} args.hints
 * @param {Array<any>} args.conceptFilters
 * @param {Array<any>} args.solutions
 * @param {import("pg").PoolClient=} args.client
 * @returns {Promise<{questions:number,hintGroups:number,conceptGroups:number,solutionGroups:number}>}
 */
export async function loadAppExercises({
  appName,
  questions,
  hints,
  conceptFilters,
  solutions,
  client: providedClient,
}) {
  invariant(isNonEmptyString(appName), "appName is required");

  const qs = toArray(questions, "questions");
  const hs = toArray(hints, "hints");
  const cs = toArray(conceptFilters, "conceptFilters");
  const ss = toArray(solutions, "solutions");

  validateQuestions(qs);
  validateHints(hs);
  validateConceptFilters(cs);
  validateSolutions(ss);

  const appIdFromQuestions = qs.length ? qs[0].app_id : null;
  invariant(appIdFromQuestions, "questions must include app_id");
  invariant(
    qs.every((q) => q.app_id === appIdFromQuestions),
    "All questions must have the same app_id",
  );

  const allQuestionCodes = qs.map((q) => normalizeCode(q.code));
  const questionCodesSet = new Set(allQuestionCodes);

  const run = async (client) => {
    await ensureAppRow(client, appName, appIdFromQuestions);

    // Compute previews before upsert so changes in expected_query update preview too.
    for (const q of qs) {
      const preview = await computeExpectedPreview(client, appName, q);
      q.expected_preview_fields = preview.fields;
      q.expected_preview_rows = preview.rows;
    }

    await upsertQuestions(client, qs);

    const questionIdByCode = await getQuestionIdByCode(client, allQuestionCodes);
    for (const code of allQuestionCodes) {
      invariant(
        questionIdByCode.has(code),
        `Question not found after upsert: ${code}`,
      );
    }

    await upsertHints(client, hs, questionCodesSet);
    await replaceConceptFilters(client, cs, questionIdByCode);
    await replaceSolutions(client, ss, questionIdByCode);

    return {
      questions: qs.length,
      hintGroups: hs.length,
      conceptGroups: cs.length,
      solutionGroups: ss.length,
    };
  };

  if (providedClient) {
    return run(providedClient);
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const summary = await run(client);
    await client.query("COMMIT");
    return summary;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
