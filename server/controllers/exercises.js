import pool from "../database/db.js";

export const getExercises = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      concepts, // comma-separated: "joins,aggregation"
      app, // "social"
      difficulty, // "easy"
      status, // "solved", "attempted", "not_started"
      q, // text search
      page = 1,
      limit = 20,
    } = req.query;

    const offset = (page - 1) * limit;

    let filters = [];
    let values = [userId]; // $1 is always userId
    let idx = 2;

    // BASE QUERY
    let query = `
      SELECT DISTINCT
        q.id,
        q.code,
        q.title,
        q.difficulty,
        a.name AS app_type,
        COALESCE(up.status, 'not started') AS status
      FROM questions q
      JOIN apps a ON q.app_id = a.app_id
      LEFT JOIN user_progress up ON q.id = up.question_id AND up.user_id = $1
    `;

    // CONCEPT FILTER (JOIN ONLY IF NEEDED)
    if (concepts) {
      const conceptList = concepts.split(",").map((c) => c.trim());

      query += `
        JOIN question_concepts qc ON q.id = qc.question_id
        JOIN concepts c ON qc.concept_id = c.id
      `;

      filters.push(`c.name = ANY($${idx})`);
      values.push(conceptList);
      idx++;
    }

    // APP FILTER (supports comma-separated list)
    if (app) {
      const appList = Array.isArray(app)
        ? app
        : String(app)
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean);

      if (appList.length === 1) {
        filters.push(`a.name = $${idx}`);
        values.push(appList[0]);
        idx++;
      } else if (appList.length > 1) {
        filters.push(`a.name = ANY($${idx})`);
        values.push(appList);
        idx++;
      }
    }

    // DIFFICULTY FILTER
    if (difficulty) {
      filters.push(`q.difficulty = $${idx}`);
      values.push(difficulty);
      idx++;
    }

    // STATUS FILTER
    if (status) {
      const dbStatus = status === "not_started" ? "not started" : status;
      filters.push(`COALESCE(up.status, 'not started') = $${idx}`);
      values.push(dbStatus);
      idx++;
    }

    // SEARCH FILTER
    if (q) {
      filters.push(
        `(q.title ILIKE $${idx} OR q.code ILIKE $${idx} OR q.id::text = $${idx})`,
      );
      values.push(`%${q}%`);
      idx++;
    }

    // APPLY WHERE
    if (filters.length > 0) {
      query += ` WHERE ` + filters.join(" AND ");
    }

    // ORDER + PAGINATION
    query += `
      ORDER BY q.id ASC
      LIMIT $${idx} OFFSET $${idx + 1}
    `;

    values.push(limit);
    values.push(offset);

    const { rows } = await pool.query(query, values);

    // TOTAL COUNT (for frontend pagination)
    let countQuery = `
      SELECT COUNT(DISTINCT q.id) as total
      FROM questions q
      JOIN apps a ON q.app_id = a.app_id
      LEFT JOIN user_progress up ON q.id = up.question_id AND up.user_id = $1
    `;

    if (concepts) {
      countQuery += `
        JOIN question_concepts qc ON q.id = qc.question_id
        JOIN concepts c ON qc.concept_id = c.id
      `;
    }

    if (filters.length > 0) {
      countQuery += ` WHERE ` + filters.join(" AND ");
    }

    // Pass values except the last two (limit/offset)
    const { rows: countRows } = await pool.query(countQuery, values.slice(0, idx - 1));

    res.json({
      data: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(countRows[0].total),
        totalPages: Math.ceil(countRows[0].total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
};

export const getMetadata = async (req, res) => {
  try {
    const appsRes = await pool.query(`SELECT name FROM apps ORDER BY name`);
    // Only return concepts that are actually used by at least one question.
    // (We still keep the full canonical catalog in `concepts` for validation/seed hygiene.)
    const conceptsRes = await pool.query(
      `
      SELECT DISTINCT c.name
      FROM concepts c
      JOIN question_concepts qc ON qc.concept_id = c.id
      JOIN questions q ON q.id = qc.question_id
      ORDER BY c.name
      `,
    );

    // This endpoint powers UI filter dropdowns and should always return fresh data,
    // especially after local DB resets/reseeds.
    res.set("Cache-Control", "no-store");

    res.json({
      apps: appsRes.rows.map((r) => r.name),
      concepts: conceptsRes.rows.map((r) => r.name),
      difficulties: ["easy", "medium", "hard"],
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Fetch question details along with progress
	    const query = `
	      SELECT 
	        q.id,
	        q.code,
	        q.title,
	        q.description,
	        q.difficulty,
	        q.solution_columns,
	        q.expected_preview_fields,
	        q.expected_preview_rows,
	        q.tables,
	        q.app_id,
	        COALESCE(up.status, 'not started') AS status,
	        COALESCE(up.attempts_count, 0) AS attempts_count,
	        up.last_query,
	        (su.id IS NOT NULL) AS solutions_unlocked
	      FROM questions q
	      LEFT JOIN user_progress up ON q.id = up.question_id AND up.user_id = $2
	      LEFT JOIN user_solution_unlocks su ON su.question_id = q.id AND su.user_id = $2
	      WHERE q.id = $1
	    `;

    const { rows } = await pool.query(query, [id, userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    const exercise = rows[0];
    const tableNames = exercise.tables || [];

    let schemas = [];
    let relationships = [];

    if (tableNames.length > 0) {
      // Fetch schemas for tables used in this question
      const schemaRes = await pool.query(
        `SELECT table_name, columns, description FROM table_schemas
         WHERE app_id = $1 AND table_name = ANY($2::text[])`,
        [exercise.app_id, tableNames],
      );
      schemas = schemaRes.rows;

      // Fetch relationships between these tables
      const relRes = await pool.query(
        `SELECT from_table, from_column, to_table, to_column FROM table_relationships
         WHERE app_id = $1 AND from_table = ANY($2::text[]) AND to_table = ANY($2::text[])`,
        [exercise.app_id, tableNames],
      );
      relationships = relRes.rows;
    }

    res.json({ ...exercise, schemas, relationships });
  } catch (error) {
    console.error("Error fetching exercise details:", error);
    res.status(500).json({ error: "Failed to fetch exercise details" });
  }
};
