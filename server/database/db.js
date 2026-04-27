import { Pool } from "pg";
import "../config/env.js";

function getRuntimeConn() {
  // Explicitly separate docker vs local to avoid accidental overlap when both are installed.
  const mode = String(process.env.SQL_ARENA_DB_MODE || "local").toLowerCase();

  if (mode === "docker") {
    return {
      user: process.env.DOCKER_DB_USER || "postgres",
      host: process.env.DOCKER_DB_HOST || "127.0.0.1",
      database: process.env.DOCKER_DB_NAME || "sql_arena",
      password: process.env.DOCKER_DB_PASSWORD || "postgres",
      port: process.env.DOCKER_DB_PORT ? Number(process.env.DOCKER_DB_PORT) : 5433,
    };
  }

  return {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "sql_arena",
    password: process.env.DB_PASSWORD || "postgres",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  };
}

const DATABASE_URL = process.env.DATABASE_URL;

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
    })
  : new Pool(getRuntimeConn());

export default pool;
