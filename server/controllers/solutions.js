import pool from "../database/db.js";

const isUnlockedForUser = async (questionId, userId) => {
  const { rows } = await pool.query(
    `SELECT 1 FROM user_solution_unlocks WHERE question_id = $1 AND user_id = $2`,
    [questionId, userId],
  );
  return rows.length > 0;
};

const isSolvedByUser = async (questionId, userId) => {
  const { rows } = await pool.query(
    `
    SELECT 1
    FROM user_progress
    WHERE user_id = $1
      AND question_id = $2
      AND status = 'solved'
    LIMIT 1
    `,
    [userId, questionId],
  );
  return rows.length > 0;
};

const isQuestionLockedByActiveMockInterview = async (questionId, userId) => {
  const { rows } = await pool.query(
    `
    SELECT 1
    FROM mock_interview_sessions s
    JOIN mock_interview_session_questions sq
      ON sq.session_id = s.id
    WHERE s.user_id = $1
      AND s.status = 'in_progress'
      AND sq.question_id = $2
    LIMIT 1
    `,
    [userId, questionId],
  );
  return rows.length > 0;
};

export const getSolutionsByQuestionId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const locked = await isQuestionLockedByActiveMockInterview(id, userId);
    if (locked) {
      return res.status(403).json({
        error: "Solutions are locked during an active mock interview session.",
      });
    }

    const [unlocked, solved] = await Promise.all([
      isUnlockedForUser(id, userId),
      isSolvedByUser(id, userId),
    ]);
    if (!unlocked && !solved) {
      return res.status(403).json({ error: "Solutions are locked." });
    }

    const query = `
      SELECT 
        id,
        approach_title,
        approach_type,
        explanation,
        query,
        is_optimal,
        display_order
      FROM solutions 
      WHERE question_id = $1
      ORDER BY display_order ASC
    `;
    const { rows } = await pool.query(query, [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ error: "Failed to fetch solutions" });
  }
};

export const unlockSolutionsForQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const locked = await isQuestionLockedByActiveMockInterview(id, userId);
    if (locked) {
      return res.status(403).json({
        error: "Solutions are locked during an active mock interview session.",
      });
    }

    const alreadyUnlocked = await isUnlockedForUser(id, userId);
    if (alreadyUnlocked) {
      return res.json({ unlocked: true });
    }

    // If the user has already solved the question, allow unlocking immediately.
    const solved = await isSolvedByUser(id, userId);
    if (solved) {
      await pool.query(
        `INSERT INTO user_solution_unlocks (user_id, question_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, question_id) DO NOTHING`,
        [userId, id],
      );
      return res.json({ unlocked: true });
    }

    const codeRes = await pool.query(`SELECT code FROM questions WHERE id = $1`, [
      id,
    ]);
    if (codeRes.rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    const questionCode = codeRes.rows[0].code;

    const hintsCountRes = await pool.query(
      `SELECT COUNT(*)::int AS count FROM hints WHERE question_code = $1`,
      [questionCode],
    );
    const totalHints = hintsCountRes.rows[0]?.count ?? 0;

    if (totalHints > 0) {
      const revealedRes = await pool.query(
        `SELECT COUNT(DISTINCT hint_id)::int AS count
         FROM user_hint_usage
         WHERE user_id = $1 AND question_code = $2`,
        [userId, questionCode],
      );
      const revealed = revealedRes.rows[0]?.count ?? 0;
      if (revealed < totalHints) {
        return res.status(403).json({
          error: "Reveal all hints before unlocking solutions.",
        });
      }
    }

    await pool.query(
      `INSERT INTO user_solution_unlocks (user_id, question_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, question_id) DO NOTHING`,
      [userId, id],
    );

    return res.json({ unlocked: true });
  } catch (error) {
    console.error("Error unlocking solutions:", error);
    res.status(500).json({ error: "Failed to unlock solutions" });
  }
};
