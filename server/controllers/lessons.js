import pool from "../database/db.js";
import { awardBadgesForEvent } from "../services/badges.js";

export const listLessons = async (req, res) => {
  try {
    const userId = req.userId;

    const { rows } = await pool.query(
      `
      SELECT
        l.id,
        l.slug,
        l.title,
        l.description,
        l.level,
        l.lesson_order,
        l.tags,
        l.estimated_minutes,
        COALESCE(ulp.status, 'not started') AS status,
        ulp.last_viewed_at,
        ulp.completed_at
      FROM lessons l
      LEFT JOIN user_lesson_progress ulp
        ON ulp.lesson_id = l.id AND ulp.user_id = $1
      ORDER BY l.lesson_order ASC, l.id ASC
      `,
      [userId],
    );

    res.json({ data: rows });
  } catch (err) {
    console.error("listLessons error:", err);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
};

export const getLesson = async (req, res) => {
  try {
    const userId = req.userId;
    const { slug } = req.params;

    const { rows } = await pool.query(
      `
      SELECT
        l.id,
        l.slug,
        l.title,
        l.description,
        l.level,
        l.lesson_order,
        l.tags,
        l.estimated_minutes,
        l.content_md,
        COALESCE(ulp.status, 'not started') AS status,
        ulp.last_viewed_at,
        ulp.completed_at
      FROM lessons l
      LEFT JOIN user_lesson_progress ulp
        ON ulp.lesson_id = l.id AND ulp.user_id = $1
      WHERE l.slug = $2
      LIMIT 1
      `,
      [userId, slug],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json({ data: rows[0] });
  } catch (err) {
    console.error("getLesson error:", err);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
};

export const upsertLessonProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { slug } = req.params;
    const { status } = req.body || {};

    if (!status || !["not started", "in progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const { rows: lessonRows } = await pool.query(
      `SELECT id FROM lessons WHERE slug = $1 LIMIT 1`,
      [slug],
    );

    if (lessonRows.length === 0) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lessonId = lessonRows[0].id;
    const completedAt = status === "completed" ? "NOW()" : "NULL";

    const { rows } = await pool.query(
      `
      INSERT INTO user_lesson_progress (user_id, lesson_id, status, last_viewed_at, completed_at)
      VALUES ($1, $2, $3, NOW(), ${completedAt})
      ON CONFLICT (user_id, lesson_id)
      DO UPDATE SET
        status = EXCLUDED.status,
        last_viewed_at = NOW(),
        completed_at = ${completedAt}
      RETURNING user_id, lesson_id, status, last_viewed_at, completed_at
      `,
      [userId, lessonId, status],
    );

    let newBadges = [];
    if (status === "completed") {
      try {
        const awarded = await awardBadgesForEvent(
          { userId, event: "lesson_completed", context: { slug } },
          null,
        );
        newBadges = awarded?.newlyEarned || [];
      } catch (e) {
        console.warn("Failed to award badges:", e?.message || e);
      }
    }

    res.json({ data: rows[0], newBadges });
  } catch (err) {
    console.error("upsertLessonProgress error:", err);
    res.status(500).json({ error: "Failed to update lesson progress" });
  }
};
