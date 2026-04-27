import { getTemplateById } from "./templates.js";
import { baseScoreForDifficulty } from "./scoring.js";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const normalizeList = (v) =>
  Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [];

const scoreCandidate = ({
  candidate,
  remainingRequiredConcepts,
  preferredConcepts,
}) => {
  const tags = new Set(normalizeList(candidate.interview_tags).map((t) => t.toLowerCase()));
  let score = 0;

  for (const req of remainingRequiredConcepts) {
    if (tags.has(String(req).toLowerCase())) score += 50;
  }
  for (const pref of preferredConcepts) {
    if (tags.has(String(pref).toLowerCase())) score += 10;
  }

  score += Math.max(0, Number(candidate.interview_weight || 1));
  score += Math.random(); // small tiebreak randomness
  return score;
};

export const generateMockInterviewSession = async ({
  client,
  userId,
  templateId,
  template: templateOverride,
}) => {
  const template = templateOverride || getTemplateById(templateId);
  if (!template) {
    const err = new Error("Unknown interview template.");
    err.statusCode = 400;
    throw err;
  }

  const difficultyFlow = Array.isArray(template.difficulty_flow)
    ? template.difficulty_flow
    : [];
  const questionCount = Number(template.question_count || difficultyFlow.length || 0);
  const flow =
    difficultyFlow.length === questionCount
      ? difficultyFlow
      : Array.from({ length: questionCount }, (_, i) => difficultyFlow[i] || "medium");

  const allowedApps = normalizeList(template.allowed_apps).map((a) => a.toLowerCase());

  // Candidate pool:
  // - interview_suitable
  // - app in allowedApps
  // - exclude already solved for this user
  const { rows: poolRows } = await client.query(
    `
    SELECT
      q.id,
      q.difficulty,
      a.name AS app_name,
      q.interview_tags,
      q.interview_weight
    FROM questions q
    JOIN apps a ON a.app_id = q.app_id
    LEFT JOIN user_progress up
      ON up.question_id = q.id AND up.user_id = $1 AND up.status = 'solved'
    WHERE q.interview_suitable = true
      AND ($2::text[] IS NULL OR a.name = ANY($2::text[]))
      AND up.id IS NULL
    `,
    [userId, allowedApps.length > 0 ? allowedApps : null],
  );

  const byDifficulty = new Map();
  for (const r of poolRows) {
    const d = String(r.difficulty || "").toLowerCase();
    if (!byDifficulty.has(d)) byDifficulty.set(d, []);
    byDifficulty.get(d).push(r);
  }

  const requiredConcepts = normalizeList(template.required_concepts);
  const preferredConcepts = normalizeList(template.preferred_concepts);
  const uniqueApps = !!template.unique_apps;

  const selected = [];
  const usedQuestionIds = new Set();
  const usedApps = new Set();
  let remainingRequired = new Set(requiredConcepts.map((c) => c.toLowerCase()));

  for (const slotDifficulty of flow) {
    const d = String(slotDifficulty || "").toLowerCase();
    const candidates = (byDifficulty.get(d) || []).filter((c) => !usedQuestionIds.has(c.id));

    const viable = uniqueApps
      ? candidates.filter((c) => !usedApps.has(String(c.app_name || "").toLowerCase()))
      : candidates;

    const ranked = shuffle(viable.length > 0 ? viable : candidates)
      .map((c) => ({
        c,
        s: scoreCandidate({
          candidate: c,
          remainingRequiredConcepts: remainingRequired,
          preferredConcepts,
        }),
      }))
      .sort((a, b) => b.s - a.s);

    const pick = ranked[0]?.c || null;
    if (!pick) {
      const err = new Error(
        `Not enough eligible questions to generate template '${String(templateId || template?.id || "custom")}'. Missing difficulty slot: ${slotDifficulty}.`,
      );
      err.statusCode = 409;
      throw err;
    }

    selected.push(pick);
    usedQuestionIds.add(pick.id);
    if (uniqueApps) usedApps.add(String(pick.app_name || "").toLowerCase());

    const tags = normalizeList(pick.interview_tags).map((t) => t.toLowerCase());
    for (const t of tags) remainingRequired.delete(t);
  }

  const now = new Date();
  const maxScore = selected.reduce(
    (sum, q) => sum + baseScoreForDifficulty(q.difficulty),
    0,
  );

  // Persist session + questions in a single transaction at the controller layer.
  return {
    template,
    selectedQuestions: selected.map((q, idx) => ({
      questionId: q.id,
      displayOrder: idx,
      baseScore: baseScoreForDifficulty(q.difficulty),
    })),
    maxScore,
    questionCount: selected.length,
    durationMinutes: Number(template.duration_minutes || 0),
  };
};
