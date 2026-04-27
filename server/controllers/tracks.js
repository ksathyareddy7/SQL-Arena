import pool from "../database/db.js";

const computeContinueLessonSlug = (lessons) => {
  if (!Array.isArray(lessons) || lessons.length === 0) return null;
  const firstNotCompleted = lessons.find((l) => l.status !== "completed");
  return (firstNotCompleted || lessons[0])?.slug || null;
};

export const listTracks = async (req, res) => {
  try {
    const userId = req.userId;

    const { rows } = await pool.query(
      `
      SELECT
        t.id,
        t.slug,
        t.title,
        t.description,
        t.audience_label,
        t.badge,
        t.is_recommended,
        COUNT(tl.lesson_id)::int AS lesson_count,
        COALESCE(SUM(CASE WHEN ulp.status = 'completed' THEN 1 ELSE 0 END), 0)::int AS completed_count,
        COALESCE(SUM(CASE WHEN ulp.status = 'in progress' THEN 1 ELSE 0 END), 0)::int AS in_progress_count
      FROM tracks t
      JOIN track_lessons tl ON tl.track_id = t.id
      JOIN lessons l ON l.id = tl.lesson_id
      LEFT JOIN user_lesson_progress ulp
        ON ulp.lesson_id = l.id AND ulp.user_id = $1
      GROUP BY t.id
      ORDER BY t.is_recommended DESC, t.id ASC
      `,
      [userId],
    );

    res.json({
      data: rows.map((r) => ({
        ...r,
        percent_complete:
          r.lesson_count > 0
            ? Math.round((r.completed_count / r.lesson_count) * 100)
            : 0,
      })),
    });
  } catch (err) {
    console.error("listTracks error:", err);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
};

export const getTrack = async (req, res) => {
  try {
    const userId = req.userId;
    const { slug } = req.params;

    const { rows: trackRows } = await pool.query(
      `
      SELECT id, slug, title, description, audience_label, badge, is_recommended
      FROM tracks
      WHERE slug = $1
      LIMIT 1
      `,
      [slug],
    );

    if (trackRows.length === 0) {
      return res.status(404).json({ error: "Track not found" });
    }

    const track = trackRows[0];

    const { rows: lessonRows } = await pool.query(
      `
      SELECT
        l.id,
        l.slug,
        l.title,
        l.description,
        l.level,
        l.tags,
        l.estimated_minutes,
        tl.position,
        ts.section_order,
        ts.title AS section_title,
        ts.description AS section_description,
        COALESCE(ulp.status, 'not started') AS status,
        ulp.last_viewed_at,
        ulp.completed_at
      FROM track_lessons tl
      JOIN lessons l ON l.id = tl.lesson_id
      LEFT JOIN track_sections ts ON ts.id = tl.section_id
      LEFT JOIN user_lesson_progress ulp
        ON ulp.lesson_id = l.id AND ulp.user_id = $1
      WHERE tl.track_id = $2
      ORDER BY tl.position ASC
      `,
      [userId, track.id],
    );

    const sectionsByOrder = new Map();
    for (const row of lessonRows) {
      const key = row.section_order || 0;
      if (!sectionsByOrder.has(key)) {
        sectionsByOrder.set(key, {
          section_order: row.section_order || 0,
          title: row.section_title || "Lessons",
          description: row.section_description || null,
          lessons: [],
        });
      }
      sectionsByOrder.get(key).lessons.push({
        slug: row.slug,
        title: row.title,
        description: row.description,
        level: row.level,
        tags: row.tags,
        estimated_minutes: row.estimated_minutes,
        position: row.position,
        status: row.status,
        last_viewed_at: row.last_viewed_at,
        completed_at: row.completed_at,
      });
    }

    const sections = [...sectionsByOrder.values()].sort(
      (a, b) => a.section_order - b.section_order,
    );

    const lessonCount = lessonRows.length;
    const completedCount = lessonRows.filter((l) => l.status === "completed").length;
    const inProgressCount = lessonRows.filter((l) => l.status === "in progress").length;

    res.json({
      data: {
        track,
        stats: {
          lesson_count: lessonCount,
          completed_count: completedCount,
          in_progress_count: inProgressCount,
          percent_complete:
            lessonCount > 0
              ? Math.round((completedCount / lessonCount) * 100)
              : 0,
        },
        continue_lesson_slug: computeContinueLessonSlug(
          lessonRows.map((r) => ({ slug: r.slug, status: r.status })),
        ),
        sections,
      },
    });
  } catch (err) {
    console.error("getTrack error:", err);
    res.status(500).json({ error: "Failed to fetch track" });
  }
};

export const listTrackLessons = async (req, res) => {
  try {
    const userId = req.userId;
    const { slug } = req.params;

    const { rows: trackRows } = await pool.query(
      `SELECT id, slug, title FROM tracks WHERE slug = $1 LIMIT 1`,
      [slug],
    );

    if (trackRows.length === 0) {
      return res.status(404).json({ error: "Track not found" });
    }

    const track = trackRows[0];

    const { rows } = await pool.query(
      `
      SELECT
        l.slug,
        l.title,
        l.description,
        l.level,
        l.tags,
        l.estimated_minutes,
        tl.position,
        ts.section_order,
        ts.title AS section_title,
        COALESCE(ulp.status, 'not started') AS status
      FROM track_lessons tl
      JOIN lessons l ON l.id = tl.lesson_id
      LEFT JOIN track_sections ts ON ts.id = tl.section_id
      LEFT JOIN user_lesson_progress ulp
        ON ulp.lesson_id = l.id AND ulp.user_id = $1
      WHERE tl.track_id = $2
      ORDER BY tl.position ASC
      `,
      [userId, track.id],
    );

    res.json({ data: { track, lessons: rows } });
  } catch (err) {
    console.error("listTrackLessons error:", err);
    res.status(500).json({ error: "Failed to fetch track lessons" });
  }
};

export const getTrackLesson = async (req, res) => {
  try {
    const userId = req.userId;
    const { slug, lessonSlug } = req.params;

    const { rows: trackRows } = await pool.query(
      `SELECT id, slug, title, description, audience_label, badge, is_recommended FROM tracks WHERE slug = $1 LIMIT 1`,
      [slug],
    );

    if (trackRows.length === 0) {
      return res.status(404).json({ error: "Track not found" });
    }

    const track = trackRows[0];

    const { rows: lessonRows } = await pool.query(
      `
      SELECT
        l.id,
        l.slug,
        l.title,
        l.description,
        l.level,
        l.tags,
        l.estimated_minutes,
        l.content_md,
        tl.position,
        COALESCE(ulp.status, 'not started') AS status,
        ulp.last_viewed_at,
        ulp.completed_at
      FROM track_lessons tl
      JOIN lessons l ON l.id = tl.lesson_id
      LEFT JOIN user_lesson_progress ulp
        ON ulp.lesson_id = l.id AND ulp.user_id = $1
      WHERE tl.track_id = $2 AND l.slug = $3
      LIMIT 1
      `,
      [userId, track.id, lessonSlug],
    );

    if (lessonRows.length === 0) {
      return res.status(404).json({ error: "Lesson not found in this track" });
    }

    const lesson = lessonRows[0];

    const { rows: prevRows } = await pool.query(
      `
      SELECT l.slug, l.title
      FROM track_lessons tl
      JOIN lessons l ON l.id = tl.lesson_id
      WHERE tl.track_id = $1 AND tl.position = $2
      LIMIT 1
      `,
      [track.id, lesson.position - 1],
    );

    const { rows: nextRows } = await pool.query(
      `
      SELECT l.slug, l.title
      FROM track_lessons tl
      JOIN lessons l ON l.id = tl.lesson_id
      WHERE tl.track_id = $1 AND tl.position = $2
      LIMIT 1
      `,
      [track.id, lesson.position + 1],
    );

    res.json({
      data: {
        track,
        lesson,
        nav: {
          prev: prevRows[0] || null,
          next: nextRows[0] || null,
        },
      },
    });
  } catch (err) {
    console.error("getTrackLesson error:", err);
    res.status(500).json({ error: "Failed to fetch track lesson" });
  }
};
