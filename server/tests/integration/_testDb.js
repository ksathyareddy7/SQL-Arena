import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import "../../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRuntimeConn = () => {
  const mode = String(process.env.SQL_ARENA_DB_MODE || "local").toLowerCase();
  if (mode === "docker") {
    return {
      user: process.env.DOCKER_DB_USER || "postgres",
      host: process.env.DOCKER_DB_HOST || "127.0.0.1",
      password: process.env.DOCKER_DB_PASSWORD || "postgres",
      port: process.env.DOCKER_DB_PORT ? Number(process.env.DOCKER_DB_PORT) : 5433,
    };
  }
  return {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD || "postgres",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  };
};

const baseSqlDir = path.resolve(__dirname, "../../database/base/sql");

const readSql = async (filename) => {
  const full = path.join(baseSqlDir, filename);
  return fs.readFile(full, "utf8");
};

export const TEST_DB_NAME = process.env.SQL_ARENA_TEST_DB || "sql_arena_test";

const connectAdmin = async () => {
  const conn = getRuntimeConn();
  const client = new Client({ ...conn, database: "postgres" });
  await client.connect();
  return client;
};

const connectDb = async (dbName) => {
  const conn = getRuntimeConn();
  const client = new Client({ ...conn, database: dbName });
  await client.connect();
  return client;
};

export const recreateTestDb = async () => {
  const admin = await connectAdmin();
  try {
    // Terminate any connections to the test DB so DROP works.
    await admin.query(
      `
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1 AND pid <> pg_backend_pid();
      `,
      [TEST_DB_NAME],
    );

    await admin.query(`DROP DATABASE IF EXISTS ${TEST_DB_NAME};`);
    await admin.query(`CREATE DATABASE ${TEST_DB_NAME};`);
  } finally {
    await admin.end();
  }

  // Initialize schema in the test DB.
  const db = await connectDb(TEST_DB_NAME);
  try {
    const resetSql = await readSql("reset_base.sql");
    const baseSql = await readSql("base.sql");
    await db.query(resetSql);
    await db.query(baseSql);
  } finally {
    await db.end();
  }
};

export const dropTestDb = async () => {
  const admin = await connectAdmin();
  try {
    await admin.query(
      `
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1 AND pid <> pg_backend_pid();
      `,
      [TEST_DB_NAME],
    );
    await admin.query(`DROP DATABASE IF EXISTS ${TEST_DB_NAME};`);
  } finally {
    await admin.end();
  }
};
