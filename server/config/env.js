import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Centralized env loading.
//
// We keep `server/.env` as the primary local dev env file. This module exists
// because ESM imports are evaluated before `server/index.js` runs, so any module
// that reads `process.env` at import-time (e.g. `database/db.js`) must ensure
// dotenv is loaded first.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Prefer `server/.env` (one level up from this file).
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Optional: allow an override `.env` in the current working directory
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

