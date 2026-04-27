import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pool from "../database/db.js";
import { from as copyFrom } from "pg-copy-streams";
import { getSeedManifest } from "../database/base/scripts/seedManifests.js";

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function usage() {
  const self = fileURLToPath(import.meta.url);
  return `Usage:\n  node ${self} <appName>\n\nExample:\n  node ${self} social`;
}

function toNonEmptyString(v) {
  const s = String(v ?? "").trim();
  return s.length ? s : null;
}

function parseCsvHeaderLine(line) {
  const out = [];
  let current = "";
  let i = 0;
  let inQuotes = false;
  while (i < line.length) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      current += ch;
      i += 1;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (ch === ",") {
      out.push(current.trim());
      current = "";
      i += 1;
      continue;
    }

    current += ch;
    i += 1;
  }
  out.push(current.trim());
  return out.filter(Boolean);
}

function readCsvHeaderColumns(filePath) {
  // Avoid reading large CSVs fully into memory; only read enough for the header line.
  const fd = fs.openSync(filePath, "r");
  try {
    const maxBytes = 128 * 1024;
    const buffer = Buffer.allocUnsafe(maxBytes);
    const bytesRead = fs.readSync(fd, buffer, 0, maxBytes, 0);
    const chunk = buffer.subarray(0, bytesRead).toString("utf8");
    const firstLine = (chunk.split(/\r?\n/)[0] ?? "").replace(/^\uFEFF/, "");
    const cols = parseCsvHeaderLine(firstLine);
    invariant(cols.length > 0, `Missing CSV header in ${filePath}`);
    return cols;
  } finally {
    fs.closeSync(fd);
  }
}

async function copyCsvIntoTable(client, { schema, table, file, nullEmpty, baseDir }) {
  const filePath = path.resolve(baseDir, file);
  invariant(fs.existsSync(filePath), `Seed CSV not found: ${filePath}`);

  const columns = readCsvHeaderColumns(filePath);
  const colsSql = columns.map((c) => `"${c}"`).join(", ");
  const copySql = `COPY ${schema}.${table} (${colsSql}) FROM STDIN WITH (FORMAT csv, HEADER true${
    nullEmpty ? ", NULL ''" : ""
  })`;

  const dbStream = client.query(copyFrom(copySql));
  const fileStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    fileStream.on("error", reject);
    dbStream.on("error", reject);
    dbStream.on("finish", resolve);
    fileStream.pipe(dbStream);
  });
}

async function main() {
  const appName = toNonEmptyString(process.argv[2]);
  invariant(appName, usage());

  const appDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "database",
    appName,
  );

  const copies = getSeedManifest(appName);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const c of copies) {
      // eslint-disable-next-line no-console
      console.log(
        `[seed:${appName}] ${c.schema}.${c.table} <= ${c.file}`,
      );
      await copyCsvIntoTable(client, { ...c, baseDir: appDir });
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("loadAppSeedData error:", err);
  process.exitCode = 1;
});
