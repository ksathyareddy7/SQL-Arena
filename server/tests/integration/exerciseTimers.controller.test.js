import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { recreateTestDb, dropTestDb, TEST_DB_NAME } from "./_testDb.js";

let app;
let pool;
let userId;
let questionId;

before(async () => {
  // Force tests to use the dedicated DB.
  process.env.SQL_ARENA_DB_MODE = "local";
  process.env.DB_NAME = TEST_DB_NAME;

  await recreateTestDb();

  // Import after env vars so db pool connects to test DB.
  const mod = await import("../../app.js");
  app = mod.createApp();
  pool = (await import("../../database/db.js")).default;

  // Minimal fixtures.
  await pool.query(`INSERT INTO apps (app_id, name) VALUES (1, 'social')`);
  const userRes = await pool.query(
    `INSERT INTO users (username) VALUES ('test_user') RETURNING id`,
  );
  userId = userRes.rows[0].id;

  const qRes = await pool.query(
    `
    INSERT INTO questions (code, app_id, title, description, difficulty, expected_query, solution_columns, tables)
    VALUES ('TEST_001', 1, 'Test Q', 'Desc', 'easy', 'SELECT 1 AS count', '["count"]'::jsonb, '["users"]'::jsonb)
    RETURNING id
    `,
  );
  questionId = qRes.rows[0].id;
});

after(async () => {
  try {
    if (pool) await pool.end();
  } catch {
    // ignore
  }
  await dropTestDb();
});

test("GET timer returns default idle state", async () => {
  const res = await request(app)
    .get(`/api/exercises/${questionId}/timer`)
    .set("x-user-id", String(userId))
    .expect(200);

  assert.equal(res.body?.state?.status, "idle");
  assert.equal(res.body?.state?.accumulated_ms, 0);
  assert.ok(res.body?.serverNow);
});

test("start -> pause -> resume -> stop -> reset transitions", async () => {
  const startRes = await request(app)
    .post(`/api/exercises/${questionId}/timer/start`)
    .set("x-user-id", String(userId))
    .send({})
    .expect(200);
  assert.equal(startRes.body?.state?.status, "running");
  assert.ok(startRes.body?.state?.started_at);
  assert.ok(startRes.body?.state?.last_started_at);

  const pauseRes = await request(app)
    .post(`/api/exercises/${questionId}/timer/pause`)
    .set("x-user-id", String(userId))
    .send({ reason: "manual" })
    .expect(200);
  assert.equal(pauseRes.body?.state?.status, "paused");
  assert.equal(pauseRes.body?.state?.pause_reason, "manual");
  assert.equal(pauseRes.body?.state?.last_started_at, null);
  assert.ok(Number(pauseRes.body?.state?.accumulated_ms) >= 0);

  const resumeRes = await request(app)
    .post(`/api/exercises/${questionId}/timer/resume`)
    .set("x-user-id", String(userId))
    .send({})
    .expect(200);
  assert.equal(resumeRes.body?.state?.status, "running");
  assert.equal(resumeRes.body?.state?.pause_reason, null);
  assert.ok(resumeRes.body?.state?.last_started_at);

  const stopRes = await request(app)
    .post(`/api/exercises/${questionId}/timer/stop`)
    .set("x-user-id", String(userId))
    .send({ reason: "solved" })
    .expect(200);
  assert.equal(stopRes.body?.state?.status, "stopped");
  assert.equal(stopRes.body?.state?.stop_reason, "solved");
  assert.equal(stopRes.body?.state?.last_started_at, null);

  const resetRes = await request(app)
    .post(`/api/exercises/${questionId}/timer/reset`)
    .set("x-user-id", String(userId))
    .send({})
    .expect(200);
  assert.equal(resetRes.body?.state?.status, "idle");
  assert.equal(resetRes.body?.state?.accumulated_ms, 0);
});

test("reset-progress deletes exercise timer rows", async () => {
  await request(app)
    .post(`/api/exercises/${questionId}/timer/start`)
    .set("x-user-id", String(userId))
    .send({})
    .expect(200);

  await request(app)
    .post(`/api/dashboard/reset-progress`)
    .set("x-user-id", String(userId))
    .send({})
    .expect(200);

  const { rowCount } = await pool.query(
    `SELECT 1 FROM exercise_timers WHERE user_id = $1 AND question_id = $2`,
    [userId, questionId],
  );
  assert.equal(rowCount, 0);
});

