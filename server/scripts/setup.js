/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { Pool } from "pg";
import { appsMap } from "../database/base/scripts/base.data.js";
import "../config/env.js";

const REPO_ROOT = path.resolve(process.cwd(), "..");
const DB_NAME_DEFAULT = "sql_arena";

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (res.error) throw res.error;
  if (res.status !== 0) process.exit(res.status ?? 1);
}

function parseArgs(argv) {
  const out = {
    // Default to local to avoid surprising destructive actions (like resetting a Docker volume)
    // when both Docker and a local Postgres are installed.
    // Use `--mode docker` explicitly for Docker.
    mode: "local", // auto|docker|local
    dbOnly: false,
    seedOnly: false,
    forceGenerate: false,
    skipSeedData: false,
    apps: null, // null = all
  };

  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--mode") {
      out.mode = String(argv[i + 1] || "").trim() || "auto";
      i += 1;
      continue;
    }
    if (a === "--docker") {
      out.mode = "docker";
      continue;
    }
    if (a === "--local") {
      out.mode = "local";
      continue;
    }
    if (a === "--db-only") {
      out.dbOnly = true;
      continue;
    }
    if (a === "--seed-only") {
      out.seedOnly = true;
      continue;
    }
    if (a === "--force-generate") {
      out.forceGenerate = true;
      continue;
    }
    if (a === "--skip-seeddata") {
      out.skipSeedData = true;
      continue;
    }
    if (a === "--apps") {
      const raw = String(argv[i + 1] || "").trim();
      out.apps = raw
        ? raw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : null;
      i += 1;
      continue;
    }
    throw new Error(
      `Unknown arg: ${a}\n\nUsage:\n  node scripts/setup.js [--mode docker|local|auto] [--apps social,ecommerce] [--db-only|--seed-only] [--force-generate] [--skip-seeddata]`,
    );
  }

  invariant(["auto", "docker", "local"].includes(out.mode), `Invalid --mode: ${out.mode}`);
  invariant(!(out.dbOnly && out.seedOnly), "Use only one of --db-only or --seed-only.");
  return out;
}

function isWindows() {
  return process.platform === "win32";
}

function hasCmd(cmd) {
  const which = isWindows() ? "where" : "command";
  const args = isWindows() ? [cmd] : ["-v", cmd];
  const res = spawnSync(which, args, { stdio: "ignore" });
  return res.status === 0;
}

function resolveMode(requestedMode) {
  if (requestedMode === "docker" || requestedMode === "local") return requestedMode;
  const envMode = String(process.env.SQL_ARENA_DB_MODE || "").toLowerCase();
  if (envMode === "docker" || envMode === "local") return envMode;
  if (hasCmd("docker")) return "docker";
  return "local";
}

function getDbEnv() {
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || DB_NAME_DEFAULT,
  };
}

function getDockerDbEnv() {
  return {
    host: process.env.DOCKER_DB_HOST || "127.0.0.1",
    port: Number(process.env.DOCKER_DB_PORT || 5433),
    user: process.env.DOCKER_DB_USER || "postgres",
    password: process.env.DOCKER_DB_PASSWORD || "postgres",
    database: process.env.DOCKER_DB_NAME || DB_NAME_DEFAULT,
  };
}

async function waitForDb(conn, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  let lastErrMsg = "";
  while (Date.now() < deadline) {
    // Use the admin database for readiness checks so we don't fail if the target
    // DB hasn't been created yet (common on first run / clean setup).
    const pool = new Pool({ ...conn, database: "postgres", max: 1 });
    try {
      const client = await pool.connect();
      client.release();
      await pool.end();
      return;
    } catch (err) {
      lastErrMsg = String(err?.message || err || "");
      await pool.end().catch(() => {});
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  const connDesc = `${conn.user}@${conn.host}:${conn.port}/${conn.database}`;
  throw new Error(
    `Timed out waiting for Postgres to be ready (${connDesc}).` +
      (lastErrMsg ? ` Last error: ${lastErrMsg}` : ""),
  );
}

async function getDataDirectory(conn) {
  // Query against the admin DB to work even when the target DB doesn't exist yet.
  const pool = new Pool({ ...conn, database: "postgres", max: 1 });
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT current_setting('data_directory') AS data_directory`,
    );
    return String(rows?.[0]?.data_directory || "");
  } finally {
    client.release();
    await pool.end();
  }
}

function isDockerDataDir(dir) {
  // Official Postgres Docker images use this default.
  return dir.includes("/var/lib/postgresql/data");
}

async function assertDbMatchesMode(mode, conn) {
  const dir = await getDataDirectory(conn);

  if (mode === "docker" && !isDockerDataDir(dir)) {
    throw new Error(
      `Docker mode expected Docker Postgres on ${conn.host}:${conn.port}, but connected to a non-Docker instance (data_directory="${dir}").\n` +
        `This usually means the Docker port is already in use (or you're pointing to the wrong port).`,
    );
  }

  if (mode === "local" && isDockerDataDir(dir)) {
    throw new Error(
      `Local mode expected local Postgres on ${conn.host}:${conn.port}, but connected to Docker Postgres (data_directory="${dir}").\n` +
        `Check DB_PORT/DB_HOST in server/.env.`,
    );
  }
}

async function ensureDockerDb(conn) {
  invariant(hasCmd("docker"), "Docker not found. Install Docker Desktop or use --mode local.");
  console.log("Starting Postgres (docker compose)...");
  console.log("Resetting Docker Postgres volume to avoid credential mismatches...");

  // Always start from a clean docker volume in setup docker mode.
  // This avoids the common pitfall where the docker volume was initialized earlier
  // with a different POSTGRES_USER/POSTGRES_PASSWORD, which can lead to confusing
  // auth failures (the image only applies those env vars on first init).
  run(
    "docker",
    [
      "compose",
      "--env-file",
      path.join(REPO_ROOT, "server", ".env"),
      "down",
      "-v",
      "--remove-orphans",
    ],
    { cwd: REPO_ROOT },
  );

  run(
    "docker",
    [
      "compose",
      "--env-file",
      path.join(REPO_ROOT, "server", ".env"),
      "up",
      "-d",
      "db",
    ],
    { cwd: REPO_ROOT },
  );
  console.log("Waiting for Postgres to be ready...");
  try {
    await waitForDb(conn, 120_000);
  } catch (err) {
    console.error(String(err?.message || err));
    console.error("Docker Postgres did not become ready in time. Recent container logs:");
    run(
      "docker",
      [
        "compose",
        "--env-file",
        path.join(REPO_ROOT, "server", ".env"),
        "logs",
        "--tail",
        "200",
        "db",
      ],
      { cwd: REPO_ROOT },
    );
    throw err;
  }
  await assertDbMatchesMode("docker", conn);
}

function validateDbName(dbName) {
  invariant(/^[a-zA-Z0-9_]+$/.test(dbName), `Invalid DB_NAME: ${dbName}`);
}

async function resetDatabase(conn) {
  validateDbName(conn.database);
  const adminPool = new Pool({ ...conn, database: "postgres", max: 1 });
  const client = await adminPool.connect();
  try {
    console.log(`Dropping and recreating database: ${conn.database}`);
    await client.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid();`,
      [conn.database],
    );
    await client.query(`DROP DATABASE IF EXISTS ${conn.database};`);
    await client.query(`CREATE DATABASE ${conn.database};`);
  } finally {
    client.release();
    await adminPool.end();
  }
}

async function ensureDatabaseExists(conn) {
  validateDbName(conn.database);
  const adminPool = new Pool({ ...conn, database: "postgres", max: 1 });
  const client = await adminPool.connect();
  try {
    const { rows } = await client.query(
      "SELECT 1 AS ok FROM pg_database WHERE datname = $1",
      [conn.database],
    );
    if (rows.length) return;
    console.log(`Database "${conn.database}" does not exist; creating...`);
    await client.query(`CREATE DATABASE ${conn.database};`);
  } finally {
    client.release();
    await adminPool.end();
  }
}

async function execSqlFile(conn, absPath) {
  const sql = fs.readFileSync(absPath, "utf8");
  const pool = new Pool({ ...conn, max: 1 });
  const client = await pool.connect();
  try {
    await client.query(sql);
  } finally {
    client.release();
    await pool.end();
  }
}

function hasSeedData(appDir) {
  const seedDir = path.join(appDir, "seedData");
  if (!fs.existsSync(seedDir)) return false;
  const files = fs.readdirSync(seedDir).filter((f) => f.endsWith(".csv"));
  if (!files.length) return false;
  return files.some((f) => fs.statSync(path.join(seedDir, f)).size > 0);
}

async function seedBase(conn) {
  const baseDir = path.resolve(process.cwd(), "database", "base");
  await execSqlFile(conn, path.join(baseDir, "sql", "reset_base.sql"));
  await execSqlFile(conn, path.join(baseDir, "sql", "base.sql"));
  run("node", [path.join(baseDir, "scripts", "baseLoadData.js")], { cwd: baseDir });
}

async function seedApp(conn, appName, { forceGenerate, skipSeedData } = {}) {
  const appDir = path.resolve(process.cwd(), "database", appName);
  const schemaSql = path.join(appDir, "sql", `${appName}_schema.sql`);
  invariant(
    fs.existsSync(schemaSql),
    `Missing app schema SQL: ${schemaSql}\n\nExpected: every app defines sql/<app>_schema.sql (schema + tables only).`,
  );
  await execSqlFile(conn, schemaSql);

  const generator = path.join(appDir, "js", `${appName}GenerateData.js`);
  if (fs.existsSync(generator) && (forceGenerate || !hasSeedData(appDir))) {
    console.log(
      forceGenerate
        ? `Generating ${appName} seed data (--force-generate)...`
        : `Generating ${appName} seed data (seedData missing/empty)...`,
    );
    run("node", [generator], { cwd: appDir });
  }

  if (!skipSeedData && fs.existsSync(path.join(appDir, "seedData"))) {
    run("node", [path.resolve(process.cwd(), "scripts", "loadAppSeedData.js"), appName], {
      cwd: process.cwd(),
    });
  }

  run("node", [path.resolve(process.cwd(), "scripts", "loadAppData.js"), appName], {
    cwd: process.cwd(),
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const mode = resolveMode(args.mode);
  const conn = mode === "docker" ? getDockerDbEnv() : getDbEnv();

  // Ensure sub-processes (loaders/seeders) use the same DB connection mode.
  process.env.SQL_ARENA_DB_MODE = mode;

  console.log(`Setup mode: ${mode}`);

  if (mode === "docker") {
    await ensureDockerDb(conn);
  } else {
    // Fail fast if local mode is accidentally pointed at Docker Postgres.
    await waitForDb(conn).catch(() => {});
    await assertDbMatchesMode("local", conn);
  }

  if (!args.seedOnly) {
    await resetDatabase(conn);
  } else {
    await ensureDatabaseExists(conn);
  }

  if (args.dbOnly) {
    console.log("Done (db-only).");
    return;
  }

  console.log("Seeding base...");
  await seedBase(conn);

  const allApps = Array.isArray(appsMap)
    ? appsMap.map((a) => a?.name).filter(Boolean)
    : [];
  invariant(allApps.length > 0, "No apps found in base.data.js appsMap.");

  const apps = args.apps?.length ? args.apps : allApps;
  const allowed = new Set(allApps);
  for (const a of apps) {
    invariant(
      allowed.has(a),
      `Unknown app "${a}". Valid apps: ${allApps.join(", ")}`,
    );
  }

  console.log(`Seeding apps: ${apps.join(", ")}`);
  for (const app of apps) {
    await seedApp(conn, app, {
      forceGenerate: args.forceGenerate,
      skipSeedData: args.skipSeedData,
    });
  }

  console.log("Setup complete.");
}

main().catch((err) => {
  console.error("setup error:", err?.message || err);
  process.exitCode = 1;
});
