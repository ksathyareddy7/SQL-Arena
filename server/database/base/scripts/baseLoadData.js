import pool from "../../db.js";
import { appsMap, lessons, tracks, badges } from "./base.data.js";

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

async function readLessonContent(baseDirUrl, contentPath) {
  const url = new URL(contentPath, baseDirUrl);
  const { default: fs } = await import("fs/promises");
  return fs.readFile(url, "utf8");
}

function sanitizeLessonMarkdown(markdown) {
  // Remove horizontal rules (`---`) from lesson content while preserving any
  // literal `---` that appears inside fenced code blocks.
  const lines = String(markdown || "").split(/\r?\n/);
  let inFence = false;
  const out = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (!inFence && trimmed === "---") continue;
    out.push(line);
  }

  return out.join("\n");
}

function validateApps() {
  invariant(Array.isArray(appsMap), "appsMap must be an array");
  for (const app of appsMap) {
    invariant(
      isNonEmptyString(app?.name),
      "App entry missing name",
    );
    invariant(
      Number.isInteger(app?.app_id) && app.app_id > 0,
      `Invalid app_id for ${app?.name || "unknown"}`,
    );
  }
}

function validateLesson(lesson) {
  const required = ["slug", "title", "level", "lesson_order", "content_path"];
  for (const key of required) {
    if (!lesson?.[key]) {
      throw new Error(
        `Lesson missing '${key}' (${lesson?.slug || "unknown"})`,
      );
    }
  }
  if (!["beginner", "intermediate", "advanced"].includes(lesson.level)) {
    throw new Error(`Invalid level '${lesson.level}' (${lesson.slug})`);
  }
  if (!Number.isInteger(lesson.lesson_order) || lesson.lesson_order < 1) {
    throw new Error(`Invalid lesson_order (${lesson.slug})`);
  }
  if (lesson.tags && !Array.isArray(lesson.tags)) {
    throw new Error(`tags must be an array (${lesson.slug})`);
  }
}

function validateTrack(track) {
  const required = ["slug", "title", "description", "sections"];
  for (const key of required) {
    if (!track?.[key]) {
      throw new Error(`Track missing '${key}' (${track?.slug || "unknown"})`);
    }
  }
  if (!Array.isArray(track.sections) || track.sections.length === 0) {
    throw new Error(`Track '${track.slug}' must have sections[]`);
  }

  const seen = new Set();
  for (const s of track.sections) {
    if (!s?.title || !Array.isArray(s.lessons) || s.lessons.length === 0) {
      throw new Error(`Track '${track.slug}' has an invalid section`);
    }
    for (const lessonSlug of s.lessons) {
      if (seen.has(lessonSlug)) {
        throw new Error(`Track '${track.slug}' repeats lesson '${lessonSlug}'`);
      }
      seen.add(lessonSlug);
    }
  }
}

function validateBadge(badge) {
  const required = ["slug", "title", "description", "category", "criteria"];
  for (const key of required) {
    if (!badge?.[key]) {
      throw new Error(`Badge missing '${key}' (${badge?.slug || "unknown"})`);
    }
  }
  if (!badge.criteria?.event || !badge.criteria?.type) {
    throw new Error(`Badge '${badge.slug}' criteria must include event + type`);
  }
}

async function loadApps(client) {
  validateApps();

  for (const app of appsMap) {
    await client.query(
      `
      INSERT INTO apps (app_id, name)
      VALUES ($1, $2)
      ON CONFLICT (app_id)
      DO UPDATE SET
        name = EXCLUDED.name
    `,
      [app.app_id, app.name.trim()],
    );
  }
}

async function loadLessons(client) {
  invariant(Array.isArray(lessons), "lessons must be an array");
  for (const l of lessons) validateLesson(l);

  const baseDir = new URL("../", import.meta.url);

  for (const lesson of lessons) {
    const raw = await readLessonContent(baseDir, lesson.content_path);
    const content = sanitizeLessonMarkdown(raw);

    await client.query(
      `
      INSERT INTO lessons (
        slug,
        title,
        description,
        level,
        lesson_order,
        tags,
        estimated_minutes,
        content_md,
        updated_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        level = EXCLUDED.level,
        lesson_order = EXCLUDED.lesson_order,
        tags = EXCLUDED.tags,
        estimated_minutes = EXCLUDED.estimated_minutes,
        content_md = EXCLUDED.content_md,
        updated_at = NOW()
      `,
      [
        lesson.slug,
        lesson.title,
        lesson.description || null,
        lesson.level,
        lesson.lesson_order,
        lesson.tags || [],
        lesson.estimated_minutes || null,
        content,
      ],
    );
  }

  const slugs = lessons.map((l) => l.slug);
  await client.query(`DELETE FROM lessons WHERE slug <> ALL($1::text[])`, [
    slugs,
  ]);
}

async function loadTracks(client) {
  invariant(Array.isArray(tracks), "tracks must be an array");
  for (const t of tracks) validateTrack(t);

  for (const track of tracks) {
    const {
      slug,
      title,
      description,
      audience_label,
      badge,
      is_recommended,
    } = track;

    const { rows: trackRows } = await client.query(
      `
      INSERT INTO tracks (slug, title, description, audience_label, badge, is_recommended, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,NOW())
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        audience_label = EXCLUDED.audience_label,
        badge = EXCLUDED.badge,
        is_recommended = EXCLUDED.is_recommended,
        updated_at = NOW()
      RETURNING id
      `,
      [
        slug,
        title,
        description,
        audience_label || null,
        badge || null,
        !!is_recommended,
      ],
    );

    const trackId = trackRows[0].id;

    await client.query(`DELETE FROM track_lessons WHERE track_id = $1`, [
      trackId,
    ]);
    await client.query(`DELETE FROM track_sections WHERE track_id = $1`, [
      trackId,
    ]);

    let position = 1;
    for (let i = 0; i < track.sections.length; i++) {
      const section = track.sections[i];

      const { rows: sectionRows } = await client.query(
        `
        INSERT INTO track_sections (track_id, title, description, section_order)
        VALUES ($1,$2,$3,$4)
        RETURNING id
        `,
        [trackId, section.title, section.description || null, i + 1],
      );

      const sectionId = sectionRows[0].id;

      for (const lessonSlug of section.lessons) {
        const { rows: lessonRows } = await client.query(
          `SELECT id FROM lessons WHERE slug = $1 LIMIT 1`,
          [lessonSlug],
        );

        if (lessonRows.length === 0) {
          throw new Error(
            `Track '${slug}' references missing lesson '${lessonSlug}'. Did you reseed lessons?`,
          );
        }

        const lessonId = lessonRows[0].id;

        await client.query(
          `
          INSERT INTO track_lessons (track_id, lesson_id, position, section_id)
          VALUES ($1,$2,$3,$4)
          `,
          [trackId, lessonId, position, sectionId],
        );

        position += 1;
      }
    }
  }

  const slugs = tracks.map((t) => t.slug);
  await client.query(`DELETE FROM tracks WHERE slug <> ALL($1::text[])`, [
    slugs,
  ]);
}

async function loadBadges(client) {
  invariant(Array.isArray(badges), "badges must be an array");
  for (const b of badges) validateBadge(b);

  for (const badge of badges) {
    const {
      slug,
      title,
      description,
      category,
      sort_order,
      icon_key,
      criteria,
    } = badge;

    await client.query(
      `
      INSERT INTO badges (slug, title, description, category, sort_order, icon_key, criteria, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
      ON CONFLICT (slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        sort_order = EXCLUDED.sort_order,
        icon_key = EXCLUDED.icon_key,
        criteria = EXCLUDED.criteria,
        updated_at = NOW()
      `,
      [
        slug,
        title,
        description,
        category,
        Number.isInteger(sort_order) ? sort_order : 0,
        icon_key || null,
        criteria,
      ],
    );
  }

  const slugs = badges.map((b) => b.slug);
  await client.query(`DELETE FROM badges WHERE slug <> ALL($1::text[])`, [
    slugs,
  ]);
}

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await loadApps(client);
    await loadLessons(client);
    await loadTracks(client);
    await loadBadges(client);

    await client.query("COMMIT");
    console.log("✅ Base data loaded successfully (apps + lessons + tracks + badges)");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error loading base data:", err?.message || err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
