import { loadAppExercises } from "./loadAppExercises.js";
import { loadAppSchemaMetadata } from "./loadAppSchemaMetadata.js";
import { fileURLToPath } from "node:url";

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

async function main() {
  const appName = toNonEmptyString(process.argv[2]);
  invariant(appName, usage());

  const dataModuleUrl = new URL(
    `../database/${appName}/js/${appName}.data.js`,
    import.meta.url,
  );

  let mod;
  try {
    mod = await import(dataModuleUrl.href);
  } catch (err) {
    throw new Error(
      `Unable to load app data module for '${appName}'. Expected file: ${fileURLToPath(
        dataModuleUrl,
      )}\n\nOriginal error: ${err?.message || String(err)}`,
    );
  }

  const { questions, hints, conceptFilters, solutions } = mod || {};
  invariant(
    Array.isArray(questions),
    `'${appName}' data must export 'questions' array`,
  );
  invariant(
    Array.isArray(hints),
    `'${appName}' data must export 'hints' array`,
  );
  invariant(
    Array.isArray(conceptFilters),
    `'${appName}' data must export 'conceptFilters' array`,
  );
  invariant(
    Array.isArray(solutions),
    `'${appName}' data must export 'solutions' array`,
  );

  // Optional table descriptions for UI polish.
  // Columns + relationships are introspected from `${appName}_schema`.
  const tableDescriptions =
    mod?.tableDescriptions && typeof mod.tableDescriptions === "object"
      ? mod.tableDescriptions
      : {};

  const schemaSummary = await loadAppSchemaMetadata({
    appName,
    tableDescriptions,
  });

  const summary = await loadAppExercises({
    appName,
    questions,
    hints,
    conceptFilters,
    solutions,
  });

  console.log(`[${appName}] Loaded schema metadata`, schemaSummary);
  console.log(`[${appName}] Loaded exercises`, summary);
  console.log(`[${appName}] Loaded successfully`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("loadAppData error:", err);
    process.exitCode = 1;
  });
