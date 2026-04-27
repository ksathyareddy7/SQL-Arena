import pool from "../database/db.js";

// GET /api/exercises/:id/hints  — fetch all hints with usage state
export const getHints = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // id here is the question's integer PK — first resolve its code
    const { rows } = await pool.query(
      `SELECT h.id, h.hint_order, h.content,
              EXISTS (
                SELECT 1 FROM user_hint_usage u
                WHERE u.hint_id = h.id AND u.user_id = $2
              ) AS revealed
       FROM questions q
       JOIN hints h ON h.question_code = q.code
       WHERE q.id = $1
       ORDER BY h.hint_order ASC`,
      [id, userId],
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching hints:", error);
    res.status(500).json({ error: "Failed to fetch hints" });
  }
};

// POST /api/exercises/:id/hints/:hintId/reveal  — mark a hint as used
export const revealHint = async (req, res) => {
  try {
    const { id, hintId } = req.params;

    // Resolve question code from integer id, then insert idempotently
    const codeRes = await pool.query(
      `SELECT code FROM questions WHERE id = $1`,
      [id],
    );
    if (codeRes.rows.length === 0)
      return res.status(404).json({ error: "Question not found" });
    const questionCode = codeRes.rows[0].code;

    const userId = req.userId;
    await pool.query(
      `INSERT INTO user_hint_usage (user_id, question_code, hint_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, hint_id) DO NOTHING`,
      [userId, questionCode, hintId],
    );

    // Return the revealed hint content
    const { rows } = await pool.query(
      `SELECT id, hint_order, content FROM hints WHERE id = $1`,
      [hintId],
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Hint not found" });

    res.json({ ...rows[0], revealed: true });
  } catch (error) {
    console.error("Error revealing hint:", error);
    res.status(500).json({ error: "Failed to reveal hint" });
  }
};
