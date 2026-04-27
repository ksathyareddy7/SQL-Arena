import pool from "../database/db.js";
import { reconcileBadgesForUser } from "../services/badges.js";

export const listBadges = async (req, res) => {
  try {
    const userId = req.userId;
    // If badges were introduced after the user already made progress,
    // reconcile awards so earned badges appear without needing another solve.
    try {
      await reconcileBadgesForUser(userId, null);
    } catch (e) {
      console.warn("Failed to reconcile badges:", e?.message || e);
    }
    const { rows: badges } = await pool.query(
      `
      SELECT id, slug, title, description, category, sort_order, icon_key
      FROM badges
      ORDER BY category ASC, sort_order ASC, id ASC
      `,
    );

    const { rows: earned } = await pool.query(
      `
      SELECT b.slug, ub.earned_at
      FROM user_badges ub
      JOIN badges b ON b.id = ub.badge_id
      WHERE ub.user_id = $1
      ORDER BY ub.earned_at ASC
      `,
      [userId],
    );

    const earnedBySlug = {};
    for (const r of earned) {
      earnedBySlug[r.slug] = { earned_at: r.earned_at };
    }

    res.json({ data: { badges, earnedBySlug } });
  } catch (err) {
    console.error("listBadges error:", err);
    res.status(500).json({ error: "Failed to fetch badges" });
  }
};

export const badgesSummary = async (req, res) => {
  try {
    const userId = req.userId;

    const [{ rows: totalRows }, { rows: earnedRows }] = await Promise.all([
      pool.query(`SELECT COUNT(*)::int AS total FROM badges`),
      pool.query(
        `SELECT COUNT(*)::int AS earned FROM user_badges WHERE user_id = $1`,
        [userId],
      ),
    ]);

    res.json({
      data: {
        total: Number(totalRows?.[0]?.total || 0),
        earned: Number(earnedRows?.[0]?.earned || 0),
      },
    });
  } catch (err) {
    console.error("badgesSummary error:", err);
    res.status(500).json({ error: "Failed to fetch badge summary" });
  }
};
