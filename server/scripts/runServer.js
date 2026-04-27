import "../config/env.js";

function parseMode(argv) {
  const idx = argv.indexOf("--mode");
  if (idx === -1) return null;
  const v = String(argv[idx + 1] || "").trim();
  return v || null;
}

const mode = parseMode(process.argv.slice(2));
if (mode) {
  process.env.SQL_ARENA_DB_MODE = mode;
}

const effectiveMode = String(process.env.SQL_ARENA_DB_MODE || "local").toLowerCase();
if (effectiveMode !== "local" && effectiveMode !== "docker") {
  console.warn(
    `Unknown SQL_ARENA_DB_MODE="${process.env.SQL_ARENA_DB_MODE}". Expected "local" or "docker". Falling back to "local".`,
  );
  process.env.SQL_ARENA_DB_MODE = "local";
}

// Start the actual server (kept in index.js)
await import("../index.js");

