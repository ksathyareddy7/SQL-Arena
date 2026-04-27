export const MOCK_INTERVIEW_TEMPLATES = [
  {
    id: "screening-20",
    title: "20 Min SQL Screening",
    description:
      "A short screening: fundamentals + one slightly trickier question.",
    duration_minutes: 20,
    question_count: 3,
    difficulty_flow: ["easy", "easy", "medium"],
    // Empty means "all apps" (resolved from DB at runtime).
    allowed_apps: [],
    required_concepts: [],
    preferred_concepts: ["filtering", "joins", "aggregation"],
    unique_apps: false,
    hints_allowed: true,
    hint_penalty_per_reveal: 10,
    solutions_locked_until_end: true,
    hide_ai_prompts: true,
    disable_editor_autocomplete: true,
    reveal_results_immediately: true,
  },
  {
    id: "fullstack-60",
    title: "60 Min Full-Stack SQL Round",
    description:
      "A longer round covering core query patterns: joins, grouping, windows, subqueries, and date filtering.",
    duration_minutes: 60,
    question_count: 6,
    difficulty_flow: ["easy", "medium", "medium", "hard", "medium", "hard"],
    allowed_apps: [],
    required_concepts: [],
    preferred_concepts: [
      "joins",
      "aggregation",
      "group_by",
      "subquery",
      "window_functions",
      "date_functions",
      "sorting",
      "filtering",
    ],
    unique_apps: false,
    hints_allowed: true,
    hint_penalty_per_reveal: 10,
    solutions_locked_until_end: true,
    hide_ai_prompts: true,
    disable_editor_autocomplete: true,
    reveal_results_immediately: true,
  },
  {
    id: "analyst-30",
    title: "30 Min Data Analyst Round",
    description:
      "Reporting-style SQL: grouping, date filtering, and clean result shapes.",
    duration_minutes: 30,
    question_count: 4,
    difficulty_flow: ["easy", "medium", "medium", "medium"],
    allowed_apps: [],
    required_concepts: [],
    preferred_concepts: ["aggregation", "group_by", "date_functions", "sorting"],
    unique_apps: false,
    hints_allowed: true,
    hint_penalty_per_reveal: 10,
    solutions_locked_until_end: true,
    hide_ai_prompts: true,
    disable_editor_autocomplete: true,
    reveal_results_immediately: true,
  },
  {
    id: "debugging-30",
    title: "30 Min SQL Debugging / Data Quality",
    description:
      "Spot common pitfalls: duplicates, missing rows, NULL handling, and safe anti-join patterns.",
    duration_minutes: 30,
    question_count: 4,
    difficulty_flow: ["medium", "medium", "medium", "hard"],
    allowed_apps: [],
    required_concepts: [],
    preferred_concepts: [
      "filtering",
      "distinct",
      "joins",
      "exists",
      "subquery",
      "aggregation",
      "group_by",
    ],
    unique_apps: false,
    hints_allowed: true,
    hint_penalty_per_reveal: 10,
    solutions_locked_until_end: true,
    hide_ai_prompts: true,
    disable_editor_autocomplete: true,
    reveal_results_immediately: true,
  },
  {
    id: "backend-45",
    title: "45 Min Backend SQL Round",
    description:
      "Backend-focused patterns: joins, anti-joins, subqueries, window functions.",
    duration_minutes: 45,
    question_count: 5,
    difficulty_flow: ["easy", "medium", "medium", "hard", "hard"],
    allowed_apps: [],
    required_concepts: [],
    preferred_concepts: ["joins", "subquery", "window_functions"],
    unique_apps: true,
    hints_allowed: true,
    hint_penalty_per_reveal: 10,
    solutions_locked_until_end: true,
    hide_ai_prompts: true,
    disable_editor_autocomplete: true,
    reveal_results_immediately: true,
  },
];

export const getTemplateById = (templateId) =>
  MOCK_INTERVIEW_TEMPLATES.find((t) => t.id === templateId) || null;

const normalizeList = (v) =>
  Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [];

const normalizeDifficulty = (d) => {
  const s = String(d || "").toLowerCase();
  if (s === "easy" || s === "medium" || s === "hard") return s;
  return null;
};

export const normalizeCustomTemplate = (input) => {
  const raw = input && typeof input === "object" ? input : {};

  const title = String(raw.title || "").trim();
  if (!title) {
    const err = new Error("Title is required.");
    err.statusCode = 400;
    throw err;
  }
  const description =
    String(raw.description || "").trim() ||
    "A custom interview session generated from the question bank.";

  const durationMinutes = Number(raw.duration_minutes);
  if (!Number.isInteger(durationMinutes) || durationMinutes < 5 || durationMinutes > 180) {
    const err = new Error("Invalid duration_minutes (must be 5–180).");
    err.statusCode = 400;
    throw err;
  }

  const questionCount = Number(raw.question_count);
  if (!Number.isInteger(questionCount) || questionCount < 1 || questionCount > 12) {
    const err = new Error("Invalid question_count (must be 1–12).");
    err.statusCode = 400;
    throw err;
  }

  const hintPenalty = Number(raw.hint_penalty_per_reveal);
  if (!Number.isInteger(hintPenalty) || hintPenalty < 0 || hintPenalty > 50) {
    const err = new Error("Invalid hint_penalty_per_reveal (must be 0–50).");
    err.statusCode = 400;
    throw err;
  }

  const allowedApps = normalizeList(raw.allowed_apps).map((a) => a.toLowerCase());
  const apps = allowedApps;

  const difficultyFlowRaw = Array.isArray(raw.difficulty_flow) ? raw.difficulty_flow : [];
  const flow = difficultyFlowRaw.map(normalizeDifficulty).filter(Boolean);
  if (flow.length !== questionCount) {
    const err = new Error("Invalid difficulty_flow (must match question_count).");
    err.statusCode = 400;
    throw err;
  }

  const uniqueApps = !!raw.unique_apps;

  return {
    id: "custom",
    title,
    description,
    duration_minutes: durationMinutes,
    question_count: questionCount,
    difficulty_flow: flow,
    allowed_apps: apps,
    required_concepts: [],
    preferred_concepts: [],
    unique_apps: uniqueApps,
    hints_allowed: true,
    hint_penalty_per_reveal: hintPenalty,
    solutions_locked_until_end: true,
    hide_ai_prompts: true,
    disable_editor_autocomplete: true,
    reveal_results_immediately: true,
  };
};
