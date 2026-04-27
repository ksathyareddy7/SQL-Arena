import pool from "../database/db.js";
import { badgeSatisfied, normalizeConceptKey } from "./badgesRules.js";

const getDb = (client) => client || pool;

const listBadgesForEvent = async (db, event) => {
  const { rows } = await db.query(
    `
    SELECT id, slug, title, description, category, sort_order, icon_key, criteria
    FROM badges
    WHERE criteria->>'event' = $1
    ORDER BY category ASC, sort_order ASC, id ASC
    `,
    [event],
  );
  return rows;
};

const listAllBadges = async (db) => {
  const { rows } = await db.query(
    `
    SELECT id, slug, title, description, category, sort_order, icon_key, criteria
    FROM badges
    ORDER BY category ASC, sort_order ASC, id ASC
    `,
  );
  return rows;
};

const getSolvedTotals = async (db, userId) => {
  const { rows } = await db.query(
    `
    SELECT
      COUNT(*) FILTER (WHERE up.status = 'solved')::int AS solved_total,
      COUNT(*) FILTER (WHERE up.status = 'solved' AND q.difficulty = 'easy')::int AS solved_easy,
      COUNT(*) FILTER (WHERE up.status = 'solved' AND q.difficulty = 'medium')::int AS solved_medium,
      COUNT(*) FILTER (WHERE up.status = 'solved' AND q.difficulty = 'hard')::int AS solved_hard
    FROM questions q
    LEFT JOIN user_progress up
      ON up.question_id = q.id AND up.user_id = $1
    `,
    [userId],
  );
  return rows?.[0] || {};
};

const getAppTotals = async (db, userId) => {
  const { rows } = await db.query(
    `
    SELECT
      a.name AS app,
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE up.status = 'solved')::int AS solved
    FROM apps a
    JOIN questions q ON q.app_id = a.app_id
    LEFT JOIN user_progress up
      ON up.question_id = q.id AND up.user_id = $1
    GROUP BY a.name
    `,
    [userId],
  );

  const totalByApp = {};
  const solvedByApp = {};
  for (const r of rows) {
    totalByApp[String(r.app || "").toLowerCase()] = Number(r.total || 0);
    solvedByApp[String(r.app || "").toLowerCase()] = Number(r.solved || 0);
  }
  return { totalByApp, solvedByApp };
};

const getConceptSolvedCounts = async (db, userId) => {
  const { rows } = await db.query(
    `
    SELECT
      c.name AS concept,
      COUNT(DISTINCT q.id)::int AS solved_count
    FROM user_progress up
    JOIN questions q ON q.id = up.question_id
    JOIN question_concepts qc ON qc.question_id = q.id
    JOIN concepts c ON c.id = qc.concept_id
    WHERE up.user_id = $1 AND up.status = 'solved'
    GROUP BY c.name
    `,
    [userId],
  );

  const solvedByConcept = {};
  for (const r of rows) {
    solvedByConcept[normalizeConceptKey(r.concept)] = Number(r.solved_count || 0);
  }
  return { solvedByConcept };
};

const getConceptSetSolvedCount = async (db, userId, concepts) => {
  const set = Array.isArray(concepts) ? concepts : [];
  const norm = set.map(normalizeConceptKey).filter(Boolean);
  if (!norm.length) return { key: "", count: 0 };
  const key = [...new Set(norm)].sort().join(",");

  const { rows } = await db.query(
    `
    SELECT COUNT(DISTINCT q.id)::int AS solved_count
    FROM user_progress up
    JOIN questions q ON q.id = up.question_id
    JOIN question_concepts qc ON qc.question_id = q.id
    JOIN concepts c ON c.id = qc.concept_id
    WHERE up.user_id = $1 AND up.status = 'solved'
      AND c.name = ANY($2::text[])
    `,
    [userId, [...new Set(norm)]],
  );
  return { key, count: Number(rows?.[0]?.solved_count || 0) };
};

const getLessonCompletedCount = async (db, userId) => {
  const { rows } = await db.query(
    `SELECT COUNT(*)::int AS completed FROM user_lesson_progress WHERE user_id = $1 AND status = 'completed'`,
    [userId],
  );
  return Number(rows?.[0]?.completed || 0);
};

const getFinishedMockSessionCount = async (db, userId) => {
  const { rows } = await db.query(
    `
    SELECT COUNT(*)::int AS finished
    FROM mock_interview_sessions
    WHERE user_id = $1 AND status IN ('completed','expired','abandoned')
    `,
    [userId],
  );
  return Number(rows?.[0]?.finished || 0);
};

const getQuestionSpecificQualityFlags = async (db, userId, questionId) => {
  const { rows } = await db.query(
    `
    SELECT q.code, COALESCE(up.attempts_count, 0)::int AS attempts_count
    FROM questions q
    LEFT JOIN user_progress up
      ON up.question_id = q.id AND up.user_id = $2
    WHERE q.id = $1
    LIMIT 1
    `,
    [questionId, userId],
  );
  const code = rows?.[0]?.code;
  const attemptsCount = Number(rows?.[0]?.attempts_count || 0);

  const { rowCount: hintCount } = await db.query(
    `SELECT 1 FROM user_hint_usage WHERE user_id = $1 AND question_code = $2 LIMIT 1`,
    [userId, code],
  );
  const { rowCount: unlockCount } = await db.query(
    `SELECT 1 FROM user_solution_unlocks WHERE user_id = $1 AND question_id = $2 LIMIT 1`,
    [userId, questionId],
  );

  return {
    currentSolvedInOneAttempt: attemptsCount === 1,
    currentSolvedWithNoHints: hintCount === 0,
    currentSolvedWithNoSolutions: unlockCount === 0,
  };
};

const getAnyQualityFlags = async (db, userId) => {
  const { rowCount: anyFirstTry } = await db.query(
    `
    SELECT 1
    FROM user_progress up
    WHERE up.user_id = $1
      AND up.status = 'solved'
      AND up.attempts_count = 1
    LIMIT 1
    `,
    [userId],
  );

  const { rowCount: anyNoHints } = await db.query(
    `
    SELECT 1
    FROM user_progress up
    JOIN questions q ON q.id = up.question_id
    WHERE up.user_id = $1
      AND up.status = 'solved'
      AND NOT EXISTS (
        SELECT 1 FROM user_hint_usage uhu
        WHERE uhu.user_id = up.user_id AND uhu.question_code = q.code
        LIMIT 1
      )
    LIMIT 1
    `,
    [userId],
  );

  const { rowCount: anyNoSolutions } = await db.query(
    `
    SELECT 1
    FROM user_progress up
    WHERE up.user_id = $1
      AND up.status = 'solved'
      AND NOT EXISTS (
        SELECT 1 FROM user_solution_unlocks usu
        WHERE usu.user_id = up.user_id AND usu.question_id = up.question_id
        LIMIT 1
      )
    LIMIT 1
    `,
    [userId],
  );

  return {
    anySolvedInOneAttempt: anyFirstTry > 0,
    anySolvedWithNoHints: anyNoHints > 0,
    anySolvedWithNoSolutions: anyNoSolutions > 0,
  };
};

const insertNewUserBadges = async (db, userId, badgeIds) => {
  if (!badgeIds.length) return [];
  const { rows } = await db.query(
    `
    WITH inserted AS (
      INSERT INTO user_badges (user_id, badge_id)
      SELECT $1, b
      FROM UNNEST($2::int[]) b
      ON CONFLICT (user_id, badge_id) DO NOTHING
      RETURNING badge_id
    )
    SELECT b.id, b.slug, b.title, b.description, b.category, b.sort_order, b.icon_key
    FROM inserted i
    JOIN badges b ON b.id = i.badge_id
    ORDER BY b.category ASC, b.sort_order ASC, b.id ASC
    `,
    [userId, badgeIds],
  );
  return rows;
};

export const awardBadgesForEvent = async ({ userId, event, context }, client) => {
  const db = getDb(client);
  const badges = await listBadgesForEvent(db, event);
  if (!badges.length) return { newlyEarned: [] };

  const stats = {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    solvedByApp: {},
    totalByApp: {},
    solvedByConcept: {},
    solvedByConceptSet: {},
    completedLessons: 0,
    finishedMockSessions: 0,
    currentSolvedInOneAttempt: false,
    currentSolvedWithNoHints: false,
    currentSolvedWithNoSolutions: false,
  };

  if (event === "question_solved") {
    const totals = await getSolvedTotals(db, userId);
    stats.totalSolved = Number(totals.solved_total || 0);
    stats.easySolved = Number(totals.solved_easy || 0);
    stats.mediumSolved = Number(totals.solved_medium || 0);
    stats.hardSolved = Number(totals.solved_hard || 0);

    const appTotals = await getAppTotals(db, userId);
    stats.totalByApp = appTotals.totalByApp;
    stats.solvedByApp = appTotals.solvedByApp;

    const conceptCounts = await getConceptSolvedCounts(db, userId);
    stats.solvedByConcept = conceptCounts.solvedByConcept;

    // Provide concept-set counts only when needed (multi-concept badge).
    const multiConceptBadges = badges.filter(
      (b) =>
        b.criteria?.type === "solves_with_concepts" &&
        Array.isArray(b.criteria?.concepts) &&
        b.criteria.concepts.length > 1,
    );
    for (const b of multiConceptBadges) {
      const { key, count } = await getConceptSetSolvedCount(
        db,
        userId,
        b.criteria.concepts,
      );
      if (key) stats.solvedByConceptSet[key] = count;
    }

    const questionId = context?.questionId;
    if (questionId) {
      const quality = await getQuestionSpecificQualityFlags(
        db,
        userId,
        Number(questionId),
      );
      stats.currentSolvedInOneAttempt = quality.currentSolvedInOneAttempt;
      stats.currentSolvedWithNoHints = quality.currentSolvedWithNoHints;
      stats.currentSolvedWithNoSolutions = quality.currentSolvedWithNoSolutions;
    }
  } else if (event === "lesson_completed") {
    stats.completedLessons = await getLessonCompletedCount(db, userId);
  } else if (event === "mock_session_finished") {
    stats.finishedMockSessions = await getFinishedMockSessionCount(db, userId);
  }

  const earnable = badges.filter((b) => badgeSatisfied(b.criteria, stats));
  const newlyEarned = await insertNewUserBadges(
    db,
    userId,
    earnable.map((b) => b.id),
  );

  return { newlyEarned };
};

export const reconcileBadgesForUser = async (userId, client) => {
  const db = getDb(client);
  const badges = await listAllBadges(db);
  if (!badges.length) return { newlyEarned: [] };

  const totals = await getSolvedTotals(db, userId);
  const appTotals = await getAppTotals(db, userId);
  const conceptCounts = await getConceptSolvedCounts(db, userId);
  const completedLessons = await getLessonCompletedCount(db, userId);
  const finishedMockSessions = await getFinishedMockSessionCount(db, userId);
  const anyQuality = await getAnyQualityFlags(db, userId);

  const stats = {
    totalSolved: Number(totals.solved_total || 0),
    easySolved: Number(totals.solved_easy || 0),
    mediumSolved: Number(totals.solved_medium || 0),
    hardSolved: Number(totals.solved_hard || 0),
    totalByApp: appTotals.totalByApp,
    solvedByApp: appTotals.solvedByApp,
    solvedByConcept: conceptCounts.solvedByConcept,
    solvedByConceptSet: {},
    completedLessons,
    finishedMockSessions,
    // For reconciliation we interpret "any question satisfied" using existence checks.
    currentSolvedInOneAttempt: anyQuality.anySolvedInOneAttempt,
    currentSolvedWithNoHints: anyQuality.anySolvedWithNoHints,
    currentSolvedWithNoSolutions: anyQuality.anySolvedWithNoSolutions,
  };

  const multiConceptBadges = badges.filter(
    (b) =>
      b.criteria?.type === "solves_with_concepts" &&
      Array.isArray(b.criteria?.concepts) &&
      b.criteria.concepts.length > 1,
  );
  for (const b of multiConceptBadges) {
    const { key, count } = await getConceptSetSolvedCount(
      db,
      userId,
      b.criteria.concepts,
    );
    if (key) stats.solvedByConceptSet[key] = count;
  }

  const earnable = badges.filter((b) => badgeSatisfied(b.criteria, stats));
  const newlyEarned = await insertNewUserBadges(
    db,
    userId,
    earnable.map((b) => b.id),
  );
  return { newlyEarned };
};
