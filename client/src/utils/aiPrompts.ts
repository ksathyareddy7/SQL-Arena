const toColumns = (columns) => {
  if (!columns) return [];
  if (typeof columns === "string") {
    try {
      return toColumns(JSON.parse(columns));
    } catch {
      return [];
    }
  }
  if (!Array.isArray(columns)) return [];
  return columns
    .map((c) => {
      if (typeof c === "string") return { name: c };
      if (c && typeof c === "object") {
        return {
          name: c.name ?? c.column ?? "",
          type: c.type ?? "",
        };
      }
      return null;
    })
    .filter((c) => c && typeof c.name === "string" && c.name.length > 0);
};

const normalizeSchemas = (schemas) => {
  if (!Array.isArray(schemas)) return [];
  return schemas
    .map((t) => ({
      table: String(t?.table_name || t?.table || ""),
      columns: toColumns(t?.columns),
      description: typeof t?.description === "string" ? t.description : "",
    }))
    .filter((t) => t.table);
};

const normalizeRelationships = (relationships) => {
  if (!Array.isArray(relationships)) return [];
  return relationships
    .map((r) => ({
      from: `${r?.from_table || ""}.${r?.from_column || ""}`.replace(/\.$/, ""),
      to: `${r?.to_table || ""}.${r?.to_column || ""}`.replace(/\.$/, ""),
    }))
    .filter((r) => r.from.includes(".") && r.to.includes("."));
};

const truncate = (s, max = 12000) => {
  const str = String(s ?? "");
  if (str.length <= max) return str;
  return `${str.slice(0, max)}\n\n...[truncated]`;
};

const schemaText = (schemas) => {
  const s = normalizeSchemas(schemas);
  if (s.length === 0) return "No schema metadata provided.";
  return s
    .map((t) => {
      const cols =
        t.columns.length > 0
          ? t.columns
              .map((c) => `- ${c.name}${c.type ? ` (${c.type})` : ""}`)
              .join("\n")
          : "- (no columns listed)";
      const desc = t.description ? `\nDescription: ${t.description}` : "";
      return `Table: ${t.table}${desc}\nColumns:\n${cols}`;
    })
    .join("\n\n");
};

const relationshipsText = (relationships) => {
  const rels = normalizeRelationships(relationships);
  if (rels.length === 0) return "No relationship metadata provided.";
  return rels.map((r) => `- ${r.from} -> ${r.to}`).join("\n");
};

const safeJson = (value) => {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value ?? "");
  }
};

export const AI_PROMPT_TYPES = {
  SOLVE: "solve",
  DEBUG_ERROR: "debug_error",
  WRONG_RESULT: "wrong_result",
  EXPLAIN_SOLUTION: "explain_solution",
  UNDERSTAND_EXPLAIN: "understand_explain",
  UNDERSTAND_ANALYZE: "understand_analyze",
  OPTIMIZE: "optimize",
  HINTS_ONLY: "hints_only",
};

const buildHeader = ({ code, title, difficulty }) =>
  [
    "You are an expert SQL tutor and PostgreSQL query reviewer.",
    "Your job is to help solve, debug, explain, and optimize SQL practice exercises accurately.",
    "Prefer teaching and reasoning over jumping straight to the answer, unless the user explicitly asks for only the answer.",
    "Assume PostgreSQL.",
    "Do not reference system catalogs (pg_*), and do not modify session settings.",
    "",
    `Question: ${code ? `${code} — ` : ""}${title}`,
    difficulty ? `Difficulty: ${difficulty}` : null,
    "",
    "Core rules:",
    "- Use ONLY the provided tables, columns, and relationships.",
    "- Use unqualified table names (search_path is set).",
    "- Do not invent tables, columns, joins, aliases, or assumptions beyond the provided schema.",
    "- If required information is missing, say so explicitly instead of guessing.",
    "- First reason from the schema and relationships before writing SQL.",
    "- Explain in clear teaching-oriented language.",
  ]
    .filter(Boolean)
    .join("\n");

const buildBaseContext = ({
  code,
  title,
  difficulty,
  description,
  expectedColumns,
  schemaBlock,
  relBlock,
}) =>
  [
    buildHeader({ code, title, difficulty }),
    "",
    "Question description:",
    description || "(no description)",
    "",
    expectedColumns.length > 0
      ? `Expected output columns (exact): ${expectedColumns.join(", ")}`
      : "Expected output columns: (not provided)",
    "",
    "Tables available in this question:",
    schemaBlock,
    "",
    "Known relationships:",
    relBlock,
  ].join("\n");

export type AiPromptArgs = {
  type: string;
  exercise: any;
  userQuery?: string;
  lastRunQuery?: string;
  result?: any;
  submitMessage?: any;
  columnWarning?: string | null;
  explainPlan?: any;
  activeSolution?: any;
};

export const buildAiPrompt = (args: AiPromptArgs) => {
  const {
    type,
    exercise,
    userQuery,
    lastRunQuery,
    result,
    submitMessage,
    columnWarning,
    explainPlan,
    activeSolution,
  } = args;
  const title = exercise?.title ? String(exercise.title) : "";
  const code = exercise?.code ? String(exercise.code) : "";
  const difficulty = exercise?.difficulty ? String(exercise.difficulty) : "";
  const description = exercise?.description ? String(exercise.description) : "";

  const expectedColumns = Array.isArray(exercise?.solution_columns)
    ? exercise.solution_columns
    : [];

  const schemaBlock = schemaText(exercise?.schemas);
  const relBlock = relationshipsText(exercise?.relationships);

  const queryText = userQuery ? String(userQuery) : "";
  const ranText = lastRunQuery ? String(lastRunQuery) : "";
  const fields = Array.isArray(result?.fields) ? result.fields : [];
  const error = result?.error ? String(result.error) : "";

  const baseContext = buildBaseContext({
    code,
    title,
    difficulty,
    description,
    expectedColumns,
    schemaBlock,
    relBlock,
  });

  if (type === AI_PROMPT_TYPES.SOLVE) {
    return truncate(
      [
        baseContext,
        "",
        "My current attempt (if any):",
        queryText || "(empty)",
        "",
        "What I want:",
        "Respond in this exact structure:",
        "1. Reasoning path",
        "   - required tables",
        "   - joins needed",
        "   - filters",
        "   - expected result shape",
        "2. Final SQL query",
        "3. Step-by-step explanation",
        "4. Common mistakes",
        "5. Edge cases",
        "",
        "Important:",
        "- Reason from schema -> joins -> filters -> result shape before writing SQL.",
        "- Ensure the final query returns the exact expected output columns when provided.",
      ].join("\n"),
    );
  }

  if (type === AI_PROMPT_TYPES.DEBUG_ERROR) {
    return truncate(
      [
        baseContext,
        "",
        "My query:",
        queryText || "(empty)",
        "",
        "The error message:",
        error || "(no error provided)",
        "",
        "What I want:",
        "Respond in this exact structure:",
        "1. Error classification",
        "   - syntax / semantic / schema mismatch / alias issue / aggregation misuse / PostgreSQL-specific issue",
        "2. Root cause",
        "3. Corrected SQL query",
        "4. Explanation of what was wrong",
        "5. How to avoid this kind of error",
        "",
        "Important:",
        "- Base the diagnosis strictly on the provided schema and error message.",
        "- If the query is partially correct, preserve the intended logic where possible.",
      ].join("\n"),
    );
  }

  if (type === AI_PROMPT_TYPES.WRONG_RESULT) {
    return truncate(
      [
        baseContext,
        "",
        "My last successful run query:",
        ranText || queryText || "(empty)",
        "",
        fields.length > 0 ? `My output columns: ${fields.join(", ")}` : null,
        columnWarning ? `Column mismatch note: ${columnWarning}` : null,
        submitMessage?.text ? `Result status: ${submitMessage.text}` : null,
        "",
        "What I want:",
        "Respond in this exact structure:",
        "1. Likely mistake category",
        "   - wrong JOIN",
        "   - missing filter",
        "   - incorrect GROUP BY",
        "   - aggregation error",
        "   - duplicate rows",
        "   - missing DISTINCT",
        "   - incorrect ordering",
        "   - wrong output shape",
        "2. Why the current query is logically wrong",
        "3. Corrected SQL query",
        "4. Step-by-step explanation of the corrected query",
        "5. How to verify the fix",
        "",
        "Important:",
        "- Focus on logic errors, not syntax errors.",
        "- Compare the current query shape against the expected output columns if available.",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  if (type === AI_PROMPT_TYPES.EXPLAIN_SOLUTION) {
    if (!activeSolution) {
      throw new Error("No solution selected.");
    }
    const solTitle = activeSolution?.approach_title
      ? String(activeSolution.approach_title)
      : "Solution";
    const solQuery = activeSolution?.query ? String(activeSolution.query) : "";
    const solExplanation = activeSolution?.explanation
      ? String(activeSolution.explanation)
      : "";

    return truncate(
      [
        baseContext,
        "",
        `Solution approach to explain: ${solTitle}`,
        "",
        "SQL:",
        solQuery || "(no solution query provided)",
        "",
        "Existing explanation text (if any):",
        solExplanation || "(none)",
        "",
        "What I want:",
        "Respond in this exact structure:",
        "1. High-level goal of the query",
        "2. Step-by-step walkthrough",
        "3. Why each JOIN / filter / aggregate is needed",
        "4. Result shape explanation",
        "5. Alternative approaches",
        "",
        "For alternative approaches, prefer concrete SQL patterns such as:",
        "- subquery",
        "- CTE",
        "- window function",
        "- aggregation-first strategy",
        "",
        "Keep the explanation teaching-oriented and easy to follow.",
      ].join("\n"),
    );
  }

  if (
    type === AI_PROMPT_TYPES.UNDERSTAND_EXPLAIN ||
    type === AI_PROMPT_TYPES.UNDERSTAND_ANALYZE
  ) {
    const planText =
      explainPlan !== undefined && explainPlan !== null
        ? safeJson(explainPlan)
        : "";
    const isAnalyze = type === AI_PROMPT_TYPES.UNDERSTAND_ANALYZE;

    return truncate(
      [
        baseContext,
        "",
        "My query:",
        queryText || ranText || "(empty)",
        "",
        planText
          ? `${isAnalyze ? "EXPLAIN ANALYZE" : "EXPLAIN"} output:`
          : `${isAnalyze ? "EXPLAIN ANALYZE" : "EXPLAIN"} output: (not provided)`,
        planText || "",
        "",
        "What I want:",
        "Explain the plan in a beginner-friendly way and tell me what to do next.",
        "",
        "Respond in this exact structure:",
        "1. One-sentence summary of what PostgreSQL is doing",
        "2. Step-by-step plan walkthrough (top to bottom)",
        "   - explain each node type in simple words",
        "   - explain why that node appears",
        "3. The biggest costs / bottlenecks",
        isAnalyze
          ? "4. Estimated vs actual (where the planner was wrong, and why)"
          : "4. What EXPLAIN cannot tell without ANALYZE",
        "5. Concrete next improvements (max 5)",
        "   - query rewrite suggestions",
        "   - indexes (only if justified by the plan)",
        "6. Quick sanity checks to validate improvements",
        "",
        "Important:",
        "- Do not invent tables/columns/indexes; only use the provided schema.",
        "- If the plan is missing, ask me to run EXPLAIN and paste it.",
        "- Keep advice actionable and tied to evidence from the plan.",
      ]
        .filter(Boolean)
        .join("\n"),
      20000,
    );
  }

  if (type === AI_PROMPT_TYPES.OPTIMIZE) {
    const planText =
      explainPlan !== undefined && explainPlan !== null
        ? safeJson(explainPlan)
        : "";

    return truncate(
      [
        baseContext,
        "",
        "My query:",
        queryText || "(empty)",
        "",
        planText ? "EXPLAIN (FORMAT JSON) output:" : null,
        planText || null,
        "",
        "What I want:",
        "Respond in this exact structure:",
        "1. Current performance risks",
        "2. Query-level optimizations",
        "3. Index recommendations",
        "4. Tradeoffs",
        "5. What not to optimize prematurely",
        "",
        "Evaluate these areas where relevant:",
        "- filter selectivity",
        "- join strategy",
        "- join cardinality",
        "- sequential scans",
        "- sort cost",
        "- aggregation cost",
        "- redundant DISTINCT",
        "- unnecessary ORDER BY",
        "- sargability",
        "",
        "For index suggestions, explain why each index would help.",
      ]
        .filter(Boolean)
        .join("\n"),
      16000,
    );
  }

  if (type === AI_PROMPT_TYPES.HINTS_ONLY) {
    return truncate(
      [
        baseContext,
        "",
        "My current attempt (optional):",
        queryText || "(empty)",
        "",
        "What I want:",
        "Give exactly 3 progressive hints in this structure:",
        "Hint 1: conceptual direction",
        "Hint 2: table / join guidance",
        "Hint 3: near-query structure guidance",
        "",
        "Important constraints:",
        "- Do NOT provide the full final SQL query.",
        "- Do NOT provide a complete solution.",
        "- Do NOT fully spell out every clause.",
        "- Keep hints progressive: broad -> medium -> specific.",
      ].join("\n"),
    );
  }

  return truncate(baseContext);
};
