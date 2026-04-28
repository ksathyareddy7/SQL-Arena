import pool from "../database/db.js";

const DEFAULT_STATE = {
  status: "idle",
  started_at: null,
  last_started_at: null,
  accumulated_ms: 0,
  pause_reason: null,
  stop_reason: null,
  updated_at: null,
};

const toIso = (v) => {
  if (!v) return null;
  try {
    return new Date(v).toISOString();
  } catch {
    return null;
  }
};

const mapRowToState = (row) => ({
  status: row?.status ?? "idle",
  started_at: toIso(row?.started_at),
  last_started_at: toIso(row?.last_started_at),
  accumulated_ms: Number(row?.accumulated_ms ?? 0) || 0,
  pause_reason: row?.pause_reason ?? null,
  stop_reason: row?.stop_reason ?? null,
  updated_at: toIso(row?.updated_at),
});

const fetchState = async (userId, questionId) => {
  const { rows } = await pool.query(
    `
    SELECT status, started_at, last_started_at, accumulated_ms, pause_reason, stop_reason, updated_at
    FROM exercise_timers
    WHERE user_id = $1 AND question_id = $2
    `,
    [userId, questionId],
  );
  if (!rows.length) return DEFAULT_STATE;
  return mapRowToState(rows[0]);
};

export const getExerciseTimer = async (req, res) => {
  try {
    const userId = req.userId;
    const questionId = Number(req.params.id);
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid exercise id" });
    }

    const state = await fetchState(userId, questionId);
    res.set("Cache-Control", "no-store");
    res.json({ state, serverNow: new Date().toISOString() });
  } catch (err) {
    console.error("getExerciseTimer error:", err);
    res.status(500).json({ error: "Failed to get timer" });
  }
};

export const startExerciseTimer = async (req, res) => {
  try {
    const userId = req.userId;
    const questionId = Number(req.params.id);
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid exercise id" });
    }

    await pool.query(
      `
      INSERT INTO exercise_timers (user_id, question_id, status, started_at, last_started_at, accumulated_ms, pause_reason, stop_reason, updated_at)
      VALUES ($1, $2, 'running', NOW(), NOW(), 0, NULL, NULL, NOW())
      ON CONFLICT (user_id, question_id) DO UPDATE SET
        status = 'running',
        started_at = COALESCE(exercise_timers.started_at, NOW()),
        last_started_at = NOW(),
        pause_reason = NULL,
        stop_reason = NULL,
        updated_at = NOW()
      `,
      [userId, questionId],
    );

    const state = await fetchState(userId, questionId);
    res.json({ state, serverNow: new Date().toISOString() });
  } catch (err) {
    console.error("startExerciseTimer error:", err);
    res.status(500).json({ error: "Failed to start timer" });
  }
};

export const pauseExerciseTimer = async (req, res) => {
  try {
    const userId = req.userId;
    const questionId = Number(req.params.id);
    const reason = String(req.body?.reason || "manual");
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid exercise id" });
    }

    await pool.query(
      `
      UPDATE exercise_timers
      SET
        accumulated_ms = accumulated_ms + GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (NOW() - last_started_at)) * 1000))::bigint,
        status = 'paused',
        last_started_at = NULL,
        pause_reason = $3,
        updated_at = NOW()
      WHERE user_id = $1 AND question_id = $2 AND status = 'running' AND last_started_at IS NOT NULL
      `,
      [userId, questionId, reason],
    );

    const state = await fetchState(userId, questionId);
    res.json({ state, serverNow: new Date().toISOString() });
  } catch (err) {
    console.error("pauseExerciseTimer error:", err);
    res.status(500).json({ error: "Failed to pause timer" });
  }
};

export const resumeExerciseTimer = async (req, res) => {
  try {
    const userId = req.userId;
    const questionId = Number(req.params.id);
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid exercise id" });
    }

    await pool.query(
      `
      UPDATE exercise_timers
      SET
        status = 'running',
        last_started_at = NOW(),
        pause_reason = NULL,
        stop_reason = NULL,
        updated_at = NOW()
      WHERE user_id = $1 AND question_id = $2 AND status = 'paused'
      `,
      [userId, questionId],
    );

    const state = await fetchState(userId, questionId);
    res.json({ state, serverNow: new Date().toISOString() });
  } catch (err) {
    console.error("resumeExerciseTimer error:", err);
    res.status(500).json({ error: "Failed to resume timer" });
  }
};

export const stopExerciseTimer = async (req, res) => {
  try {
    const userId = req.userId;
    const questionId = Number(req.params.id);
    const rawReason = req.body?.reason ? String(req.body.reason) : "manual";
    const reason =
      rawReason === "solved" ? "solved" : rawReason === "leave" ? "leave" : "manual";
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid exercise id" });
    }

    // Accumulate if running, then stop.
    await pool.query(
      `
      UPDATE exercise_timers
      SET
        accumulated_ms = accumulated_ms + CASE
          WHEN status = 'running' AND last_started_at IS NOT NULL
            THEN GREATEST(0, FLOOR(EXTRACT(EPOCH FROM (NOW() - last_started_at)) * 1000))::bigint
          ELSE 0
        END,
        status = 'stopped',
        last_started_at = NULL,
        pause_reason = NULL,
        stop_reason = $3,
        updated_at = NOW()
      WHERE user_id = $1 AND question_id = $2
      `,
      [userId, questionId, reason],
    );

    const state = await fetchState(userId, questionId);
    res.json({ state, serverNow: new Date().toISOString() });
  } catch (err) {
    console.error("stopExerciseTimer error:", err);
    res.status(500).json({ error: "Failed to stop timer" });
  }
};

export const resetExerciseTimer = async (req, res) => {
  try {
    const userId = req.userId;
    const questionId = Number(req.params.id);
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid exercise id" });
    }

    await pool.query(
      `
      INSERT INTO exercise_timers (user_id, question_id, status, started_at, last_started_at, accumulated_ms, pause_reason, stop_reason, updated_at)
      VALUES ($1, $2, 'idle', NULL, NULL, 0, NULL, NULL, NOW())
      ON CONFLICT (user_id, question_id) DO UPDATE SET
        status = 'idle',
        started_at = NULL,
        last_started_at = NULL,
        accumulated_ms = 0,
        pause_reason = NULL,
        stop_reason = NULL,
        updated_at = NOW()
      `,
      [userId, questionId],
    );

    const state = await fetchState(userId, questionId);
    res.json({ state, serverNow: new Date().toISOString() });
  } catch (err) {
    console.error("resetExerciseTimer error:", err);
    res.status(500).json({ error: "Failed to reset timer" });
  }
};
