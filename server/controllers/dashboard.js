import pool from "../database/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.userId;
    const { year } = req.query;

    const now = new Date();
    const yearRaw = Array.isArray(year) ? year[0] : year;
    const yearStr = typeof yearRaw === "string" ? yearRaw.trim() : "";
    const selectedYear =
      yearStr && /^\d{4}$/.test(yearStr) ? Number.parseInt(yearStr, 10) : null;
    const useYearWindow =
      Number.isInteger(selectedYear) && selectedYear > 1970 && selectedYear < 3000;

    const startDate = useYearWindow
      ? new Date(Date.UTC(selectedYear, 0, 1))
      : null;
    const endDate = useYearWindow
      ? new Date(Date.UTC(selectedYear + 1, 0, 1))
      : null;
    const hasValidYearWindow =
      !!useYearWindow &&
      !!startDate &&
      !!endDate &&
      Number.isFinite(startDate.getTime()) &&
      Number.isFinite(endDate.getTime());
    const startDateKey = hasValidYearWindow
      ? startDate.toISOString().slice(0, 10)
      : null;
    const endDateKey = hasValidYearWindow ? endDate.toISOString().slice(0, 10) : null;

    const statsQuery = `
      SELECT 
        q.difficulty,
        COUNT(q.id) as total,
        COUNT(up.id) FILTER (WHERE up.status = 'solved') as solved
      FROM questions q
      LEFT JOIN user_progress up ON q.id = up.question_id AND up.user_id = $1
      GROUP BY q.difficulty
    `;

    const { rows } = await pool.query(statsQuery, [userId]);

    const heatmapQuery = hasValidYearWindow
      ? `
        SELECT 
          created_at::date as date, 
          COUNT(*) as count
        FROM user_submissions
        WHERE user_id = $1
          AND created_at >= $2::date
          AND created_at < $3::date
        GROUP BY date
        ORDER BY date ASC
      `
      : `
        SELECT 
          created_at::date as date, 
          COUNT(*) as count
        FROM user_submissions
        WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '1 year'
        GROUP BY date
        ORDER BY date ASC
      `;

    const heatmapRes = hasValidYearWindow
      ? await pool.query(heatmapQuery, [userId, startDateKey, endDateKey])
      : await pool.query(heatmapQuery, [userId]);

    // Get total overall solved and attempted for the big donut
    const overallQuery = `
      SELECT 
        COUNT(id) FILTER (WHERE status = 'solved') as total_solved,
        COUNT(id) FILTER (WHERE status = 'attempted') as total_attempting
      FROM user_progress
      WHERE user_id = $1
    `;
    const overallRes = await pool.query(overallQuery, [userId]);

    // Attempts + success rate from submissions stream.
    const submissionsQuery = `
      SELECT
        COUNT(*) FILTER (WHERE status IN ('attempted', 'solved')) AS total_attempts,
        COUNT(*) FILTER (WHERE status = 'solved') AS solved_attempts
      FROM user_submissions
      WHERE user_id = $1
    `;
    const submissionsRes = await pool.query(submissionsQuery, [userId]);

    const totalQuestionsRes = await pool.query("SELECT COUNT(*) as count FROM questions");

    const attempts = parseInt(submissionsRes.rows[0]?.total_attempts || 0);
    const solvedAttempts = parseInt(submissionsRes.rows[0]?.solved_attempts || 0);
    const successRate = attempts > 0 ? (100 * solvedAttempts) / attempts : 0;

    // Streaks from the returned heatmap days (count > 0).
    const activeDays = new Set(
      heatmapRes.rows
        .filter((r) => Number(r.count) > 0)
        .map((r) => String(r.date)),
    );

    const dayKey = (d) => {
      if (!(d instanceof Date)) return null;
      const t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      if (!Number.isFinite(t)) return null;
      return new Date(t).toISOString().slice(0, 10);
    };

    const addDays = (d, n) => {
      if (!(d instanceof Date)) return null;
      const t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n);
      if (!Number.isFinite(t)) return null;
      return new Date(t);
    };

    // For the current year, "current streak" should be computed up to today.
    // For a past year view, compute the streak up to the last day of that year.
    const todayUtc = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const yearEndUtc = hasValidYearWindow
      ? new Date(Date.UTC(selectedYear, 11, 31))
      : todayUtc;
    const streakEnd =
      hasValidYearWindow && selectedYear === now.getUTCFullYear()
        ? todayUtc
        : yearEndUtc;

    let currentStreak = 0;
    for (let i = 0; i < 366; i++) {
      const dt = addDays(streakEnd, -i);
      const k = dt ? dayKey(dt) : null;
      if (!k) break;
      if (activeDays.has(k)) currentStreak++;
      else break;
    }

    // Best streak across the window (based on sorted active day keys).
    const keys = Array.from(activeDays).sort();
    let bestStreak = 0;
    let run = 0;
    let prevKey = null;
    for (const k of keys) {
      if (!prevKey) {
        run = 1;
      } else {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(prevKey)) {
          run = 1;
        } else {
          const prevDate = new Date(prevKey + "T00:00:00Z");
          const nextDate = addDays(prevDate, 1);
          const expected = nextDate ? dayKey(nextDate) : null;
          run = expected && k === expected ? run + 1 : 1;
        }
      }
      prevKey = k;
      if (run > bestStreak) bestStreak = run;
    }

    res.json({
      difficultyStats: rows,
      heatmap: heatmapRes.rows,
      overall: {
        solved: parseInt(overallRes.rows[0]?.total_solved || 0),
        attempting: parseInt(overallRes.rows[0]?.total_attempting || 0),
        total: parseInt(totalQuestionsRes.rows[0]?.count || 0)
      },
      attempts,
      successRate,
      streaks: { current: currentStreak, best: bestStreak },
      window: hasValidYearWindow
        ? { type: "year", year: selectedYear }
        : { type: "last_year" },
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
};
export const getSolvedExercises = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        q.id,
        q.code,
        q.title,
        q.difficulty,
        up.solved_at
      FROM user_progress up
      JOIN questions q ON up.question_id = q.id
      WHERE up.user_id = $1 AND up.status = 'solved'
      ORDER BY up.solved_at DESC
      LIMIT $2 OFFSET $3
    `;

    const { rows } = await pool.query(query, [userId, limit, offset]);

    const countQuery = `
      SELECT COUNT(*)
      FROM user_progress 
      WHERE user_id = $1 AND status = 'solved'
    `;
    const countRes = await pool.query(countQuery, [userId]);
    const total = parseInt(countRes.rows[0].count);

    res.json({
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching solved exercises:", error);
    res.status(500).json({ error: "Failed to fetch solved exercises list" });
  }
};

export const resetUserProgress = async (req, res) => {
  const userId = req.userId;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`DELETE FROM user_submissions WHERE user_id = $1`, [
      userId,
    ]);
    await client.query(`DELETE FROM user_progress WHERE user_id = $1`, [userId]);
    await client.query(`DELETE FROM user_hint_usage WHERE user_id = $1`, [userId]);
    await client.query(`DELETE FROM user_solution_unlocks WHERE user_id = $1`, [
      userId,
    ]);
    await client.query(`DELETE FROM user_badges WHERE user_id = $1`, [userId]);

    await client.query("COMMIT");
    return res.json({ ok: true });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error resetting user progress:", error);
    return res.status(500).json({ error: "Failed to reset progress" });
  } finally {
    client.release();
  }
};
