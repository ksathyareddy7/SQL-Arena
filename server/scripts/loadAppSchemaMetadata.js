import pool from "../database/db.js";
import { getAppIdByName } from "../database/base/scripts/base.data.js";

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizeTableName(name) {
  return String(name ?? "").trim();
}

function formatColumnType(row) {
  const dataType = String(row?.data_type || "").toLowerCase();
  const udtName = String(row?.udt_name || "").toLowerCase();
  const columnDefault = row?.column_default ? String(row.column_default) : "";

  // Best-effort "display types" aligned with our existing UI expectations.
  // We keep this intentionally simple and stable.
  if (dataType === "character varying") return "VARCHAR";
  if (dataType === "character") return "CHAR";
  if (dataType === "text") return "TEXT";
  if (dataType === "boolean") return "BOOLEAN";
  if (dataType === "integer") return "INT";
  if (dataType === "bigint") {
    const isSerial =
      columnDefault.toLowerCase().includes("nextval(") &&
      (udtName === "int8" || udtName === "bigint");
    return isSerial ? "BIGSERIAL" : "BIGINT";
  }
  if (dataType === "numeric") return "NUMERIC";
  if (dataType === "double precision") return "DOUBLE";
  if (dataType === "real") return "REAL";
  if (dataType === "timestamp without time zone") return "TIMESTAMP";
  if (dataType === "timestamp with time zone") return "TIMESTAMPTZ";
  if (dataType === "date") return "DATE";
  if (dataType === "jsonb") return "JSONB";
  if (dataType === "uuid") return "UUID";

  // Fallback: keep something readable for uncommon types.
  return String(row?.data_type || "").toUpperCase() || "UNKNOWN";
}

async function introspectTablesAndColumns(client, schemaName) {
  const colsRes = await client.query(
    `
      SELECT
        table_name,
        column_name,
        data_type,
        udt_name,
        column_default,
        ordinal_position
      FROM information_schema.columns
      WHERE table_schema = $1
      ORDER BY table_name, ordinal_position
    `,
    [schemaName],
  );

  const byTable = new Map();
  for (const r of colsRes.rows) {
    const tableName = normalizeTableName(r.table_name);
    if (!tableName) continue;
    if (!byTable.has(tableName)) byTable.set(tableName, []);
    byTable.get(tableName).push({
      name: String(r.column_name),
      type: formatColumnType(r),
    });
  }

  return byTable;
}

async function introspectRelationships(client, schemaName) {
  const res = await client.query(
    `
      SELECT
        tc.table_name AS from_table,
        kcu.column_name AS from_column,
        ccu.table_name AS to_table,
        ccu.column_name AS to_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
       AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
       AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = $1
      ORDER BY
        tc.table_name,
        kcu.column_name,
        ccu.table_name,
        ccu.column_name
    `,
    [schemaName],
  );

  // De-dupe defensively.
  const seen = new Set();
  const out = [];
  for (const r of res.rows) {
    const key = `${r.from_table}.${r.from_column}->${r.to_table}.${r.to_column}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      from_table: String(r.from_table),
      from_column: String(r.from_column),
      to_table: String(r.to_table),
      to_column: String(r.to_column),
    });
  }
  return out;
}

/**
 * Load schema metadata for an app into `public.table_schemas` and `public.table_relationships`.
 *
 * Source of truth:
 * - Columns and relationships are introspected from the app schema (FK constraints + column types).
 *
 * This intentionally removes "metadata inserts" from SQL and keeps schema metadata aligned
 * with the actual DDL.
 *
 * @param {object} args
 * @param {string} args.appName
 * @param {Record<string,string>=} args.tableDescriptions table_name -> description
 * @param {import("pg").PoolClient=} args.client
 * @returns {Promise<{tables:number,relationships:number}>}
 */
export async function loadAppSchemaMetadata({
  appName,
  tableDescriptions,
  client: providedClient,
}) {
  invariant(isNonEmptyString(appName), "appName is required");

  const appId = getAppIdByName(appName);
  invariant(appId, `Missing app_id mapping for '${appName}'`);

  const schemaName = `${appName}_schema`;
  const descriptions = tableDescriptions && typeof tableDescriptions === "object"
    ? tableDescriptions
    : {};

  const run = async (client) => {
    const columnsByTable = await introspectTablesAndColumns(client, schemaName);
    const relationships = await introspectRelationships(client, schemaName);

    await client.query(`DELETE FROM public.table_relationships WHERE app_id = $1`, [
      appId,
    ]);
    await client.query(`DELETE FROM public.table_schemas WHERE app_id = $1`, [appId]);

    for (const [tableName, columns] of columnsByTable.entries()) {
      await client.query(
        `
          INSERT INTO public.table_schemas (app_id, table_name, columns, description)
          VALUES ($1, $2, $3::jsonb, $4)
          ON CONFLICT (app_id, table_name)
          DO UPDATE SET
            columns = EXCLUDED.columns,
            description = EXCLUDED.description
        `,
        [
          appId,
          tableName,
          JSON.stringify(columns),
          descriptions[tableName] ?? null,
        ],
      );
    }

    for (const rel of relationships) {
      await client.query(
        `
          INSERT INTO public.table_relationships (
            app_id,
            from_table,
            from_column,
            to_table,
            to_column
          )
          VALUES ($1,$2,$3,$4,$5)
          ON CONFLICT DO NOTHING
        `,
        [
          appId,
          rel.from_table,
          rel.from_column,
          rel.to_table,
          rel.to_column,
        ],
      );
    }

    return { tables: columnsByTable.size, relationships: relationships.length };
  };

  if (providedClient) return run(providedClient);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const summary = await run(client);
    await client.query("COMMIT");
    return summary;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

