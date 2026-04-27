const stableParamsKey = (params) => {
  if (!params) return "";
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([k, v]) => `${k}=${String(v)}`).join("&");
};

export const queryKeys = {
  tracks: {
    list: (userId) => ["tracks", "list", userId || "anon"],
    detail: (userId, trackSlug) => [
      "tracks",
      "detail",
      userId || "anon",
      trackSlug,
    ],
    lessons: (userId, trackSlug) => [
      "tracks",
      "lessons",
      userId || "anon",
      trackSlug,
    ],
    lesson: (userId, trackSlug, lessonSlug) => [
      "tracks",
      "lesson",
      userId || "anon",
      trackSlug,
      lessonSlug,
    ],
  },
  lessons: {
    list: (userId) => ["lessons", "list", userId || "anon"],
    detail: (userId, slug) => ["lessons", "detail", userId || "anon", slug],
  },
  exercises: {
    meta: (userId) => ["exercises", "meta", userId || "anon"],
    list: (userId, params) => [
      "exercises",
      "list",
      userId || "anon",
      stableParamsKey(params),
    ],
    detail: (userId, id) => ["exercises", "detail", userId || "anon", String(id)],
    hints: (userId, id) => ["exercises", "hints", userId || "anon", String(id)],
    solutions: (userId, id) => [
      "exercises",
      "solutions",
      userId || "anon",
      String(id),
    ],
  },
  dashboard: {
    stats: (userId, year?: number | null) => [
      "dashboard",
      "stats",
      userId || "anon",
      year ? Number(year) : "default",
    ],
    solved: (userId, page, limit) => [
      "dashboard",
      "solved",
      userId || "anon",
      Number(page) || 1,
      Number(limit) || 5,
    ],
  },
  mockInterviews: {
    templates: (userId: number | undefined) => ["mockInterviews", "templates", userId || "anon"],
    active: (userId: number | undefined) => ["mockInterviews", "active", userId || "anon"],
    sessions: (userId: number | undefined) => ["mockInterviews", "sessions", userId || "anon"],
    session: (userId: number | undefined, sessionId: string | number | undefined) => [
      "mockInterviews",
      "session",
      userId || "anon",
      sessionId || "unknown",
    ],
    question: (
      userId: number | undefined,
      sessionId: string | number | undefined,
      index: number | undefined,
    ) => ["mockInterviews", "question", userId || "anon", sessionId || "unknown", index ?? -1],
    summary: (userId: number | undefined, sessionId: string | number | undefined) => [
      "mockInterviews",
      "summary",
      userId || "anon",
      sessionId || "unknown",
    ],
    solutions: (
      userId: number | undefined,
      sessionId: string | number | undefined,
      index: number | undefined,
    ) => ["mockInterviews", "solutions", userId || "anon", sessionId || "unknown", index ?? -1],
  },
  badges: {
    list: (userId: number | undefined) => ["badges", "list", userId || "anon"],
    summary: (userId: number | undefined) => [
      "badges",
      "summary",
      userId || "anon",
    ],
  },
};

export { stableParamsKey };
