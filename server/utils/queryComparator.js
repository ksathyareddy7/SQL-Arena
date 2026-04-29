/**
 * compareResults
 *
 * expectedColumns is the contract.
 * User queries may be creative, but must return these columns.
 *
 * Supported config:
 *   ignore_order        boolean   default true
 *   sort_by_columns     array     default []
 *   numeric_tolerance   number    default 0.0001
 *
 * sort_by_columns supports both:
 *   ["day", "-score"]
 *   [{ column: "day", direction: "asc" }, { column: "score", direction: "desc" }]
 */

const DEFAULT_TOLERANCE = 0.0001;
export const MAX_COMPARE_ROWS = 50_000;

// ─────────────────────────────────────────────────────────────────────────────
// Normalization
// ─────────────────────────────────────────────────────────────────────────────

const normalizeValue = (val) => {
  if (val === null || val === undefined) return null;

  if (val instanceof Date) {
    return val.toISOString();
  }

  if (typeof val === "bigint") {
    return val;
  }

  if (typeof val === "string") {
    const trimmed = val.trim();

    // Normalize numeric strings (node-postgres commonly returns int8/numeric as strings).
    // This is important for stable ordering checks (e.g. "10" vs "2").
    if (/^-?\d+\.0+$/.test(trimmed)) {
      try {
        return BigInt(trimmed.split(".")[0]);
      } catch {
        // ignore
      }
    }

    if (/^-?\d+$/.test(trimmed)) {
      try {
        return BigInt(trimmed);
      } catch {
        // Fall back to string if BigInt parsing fails for any reason.
      }
    }

    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      const asNumber = Number(trimmed);
      if (Number.isFinite(asNumber)) return asNumber;
    }

    if (trimmed !== "" && !isNaN(Date.parse(trimmed))) {
      return new Date(trimmed).toISOString();
    }
    return trimmed;
  }

  if (typeof val === "number") {
    // Keep integers as BigInt to avoid Number overflow and to match int8 parsing above.
    if (Number.isInteger(val)) return BigInt(val);
    return val;
  }

  return val;
};

const normalizeRow = (row) => {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = normalizeValue(v);
  }
  return out;
};

// ─────────────────────────────────────────────────────────────────────────────
// Projection
// ─────────────────────────────────────────────────────────────────────────────

const projectRows = (rows, expectedColumns) => {
  const projected = [];

  for (const row of rows) {
    const next = {};
    for (const col of expectedColumns) {
      if (!Object.prototype.hasOwnProperty.call(row, col)) {
        return {
          error: `Required column "${col}" is missing from query results`,
        };
      }
      next[col] = row[col];
    }
    projected.push(next);
  }

  return { rows: projected };
};

// ─────────────────────────────────────────────────────────────────────────────
// Sorting
// ─────────────────────────────────────────────────────────────────────────────

const normalizeSortSpec = (sortByColumns) => {
  if (!Array.isArray(sortByColumns)) return [];

  return sortByColumns
    .map((item) => {
      if (typeof item === "string") {
        if (item.startsWith("-")) {
          return { column: item.slice(1), direction: "desc" };
        }
        if (item.startsWith("+")) {
          return { column: item.slice(1), direction: "asc" };
        }
        return { column: item, direction: "asc" };
      }

      if (item && typeof item === "object" && typeof item.column === "string") {
        return {
          column: item.column,
          direction:
            String(item.direction || "asc").toLowerCase() === "desc"
              ? "desc"
              : "asc",
        };
      }

      return null;
    })
    .filter(Boolean);
};

const compareSortableValues = (a, b, direction) => {
  if (a === null && b === null) return 0;
  // Match PostgreSQL default NULL ordering:
  // - ASC  => NULLS LAST
  // - DESC => NULLS FIRST
  if (a === null) return direction === "desc" ? -1 : 1;
  if (b === null) return direction === "desc" ? 1 : -1;

  if (typeof a === "bigint" && typeof b === "number") {
    if (Number.isInteger(b)) {
      const bb = BigInt(b);
      if (a < bb) return direction === "desc" ? 1 : -1;
      if (a > bb) return direction === "desc" ? -1 : 1;
      return 0;
    }
    const aa = Number(a);
    if (aa < b) return direction === "desc" ? 1 : -1;
    if (aa > b) return direction === "desc" ? -1 : 1;
    return 0;
  }

  if (typeof a === "number" && typeof b === "bigint") {
    return compareSortableValues(b, a, direction) * -1;
  }

  if (a < b) return direction === "desc" ? 1 : -1;
  if (a > b) return direction === "desc" ? -1 : 1;
  return 0;
};

const isSortedBy = (rows, sortByColumns) => {
  const specs = normalizeSortSpec(sortByColumns);
  if (specs.length === 0) return true;

  for (let i = 1; i < rows.length; i++) {
    const prev = rows[i - 1];
    const curr = rows[i];

    for (const spec of specs) {
      const cmp = compareSortableValues(
        prev[spec.column],
        curr[spec.column],
        spec.direction,
      );

      if (cmp < 0) break; // ok, prev < curr for this spec
      if (cmp > 0) return false; // out of order
      // cmp === 0 => compare next spec
    }
  }

  return true;
};

const formatSortSpec = (sortByColumns) => {
  const specs = normalizeSortSpec(sortByColumns);
  if (specs.length === 0) return "";

  return specs
    .map((s) => `${s.column} ${s.direction.toUpperCase()}`)
    .join(", ");
};

const sortRowsWithTieBreaker = (rows, sortByColumns, expectedColumns, tolerance) => {
  const specs = normalizeSortSpec(sortByColumns);
  if (specs.length === 0) return rows;

  return [...rows].sort((a, b) => {
    for (const spec of specs) {
      const cmp = compareSortableValues(
        a[spec.column],
        b[spec.column],
        spec.direction,
      );
      if (cmp !== 0) return cmp;
    }

    const aKey = serializeRow(a, expectedColumns, tolerance);
    const bKey = serializeRow(b, expectedColumns, tolerance);
    if (aKey < bKey) return -1;
    if (aKey > bKey) return 1;
    return 0;
  });
};

const sortRows = (rows, sortByColumns) => {
  const specs = normalizeSortSpec(sortByColumns);
  if (specs.length === 0) return rows;

  return [...rows].sort((a, b) => {
    for (const spec of specs) {
      const cmp = compareSortableValues(
        a[spec.column],
        b[spec.column],
        spec.direction,
      );
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// Equality
// ─────────────────────────────────────────────────────────────────────────────

const rowsEqual = (r1, r2, columns, tolerance) => {
  for (const col of columns) {
    const v1 = r1[col];
    const v2 = r2[col];

    if (v1 === null && v2 === null) continue;
    if (v1 === null || v2 === null) return false;

    if (typeof v1 === "number" && typeof v2 === "number") {
      if (Math.abs(v1 - v2) > tolerance) return false;
      continue;
    }

    if (typeof v1 === "bigint" && typeof v2 === "number") {
      if (Number.isInteger(v2)) return v1 === BigInt(v2);
      return Math.abs(Number(v1) - v2) <= tolerance;
    }

    if (typeof v1 === "number" && typeof v2 === "bigint") {
      if (Number.isInteger(v1)) return BigInt(v1) === v2;
      return Math.abs(v1 - Number(v2)) <= tolerance;
    }

    if (v1 !== v2) return false;
  }

  return true;
};

const serializeRow = (row, columns, tolerance) => {
  const parts = columns.map((col) => {
    const v = row[col];

    if (v === null || v === undefined) return "NULL";

    if (typeof v === "number") {
      const factor = Math.round(1 / tolerance);
      return String(Math.round(v * factor) / factor);
    }

    return String(v);
  });

  return parts.join("|~|");
};

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

export const compareResults = ({
  expectedRows,
  actualRows,
  expectedColumns,
  config = {},
}) => {
  const sortByColumns = Array.isArray(config.sort_by_columns)
    ? config.sort_by_columns
    : [];

  // Default behavior:
  // - Ignore order unless the question explicitly requires it.
  // - Ordering is considered "required" when sort_by_columns is provided.
  //
  // Backward compatibility:
  // - If sort_by_columns is NOT provided, we still respect ignore_order if present.
  const ignoreOrder =
    sortByColumns.length > 0
      ? false
      : typeof config.ignore_order === "boolean"
        ? config.ignore_order
        : true;

  const tolerance =
    typeof config.numeric_tolerance === "number"
      ? config.numeric_tolerance
      : DEFAULT_TOLERANCE;

  if (
    expectedRows.length > MAX_COMPARE_ROWS ||
    actualRows.length > MAX_COMPARE_ROWS
  ) {
    return {
      isCorrect: false,
      reason: `Result too large to compare safely in memory (expected ${expectedRows.length}, got ${actualRows.length})`,
    };
  }

  if (!Array.isArray(expectedColumns) || expectedColumns.length === 0) {
    return {
      isCorrect: false,
      reason: "No expected columns defined for this question",
    };
  }

  const normalizedSortSpecs = normalizeSortSpec(sortByColumns);
  const missingOrderCols = normalizedSortSpecs.filter(
    (s) => !expectedColumns.includes(s.column),
  );
  if (missingOrderCols.length > 0) {
    return {
      isCorrect: false,
      reason: `Question setup error: sort_by_columns contains columns not in expected output (${missingOrderCols
        .map((s) => s.column)
        .join(", ")})`,
    };
  }

  if (expectedRows.length === 0 && actualRows.length === 0) {
    return { isCorrect: true };
  }

  if (expectedRows.length === 0 && actualRows.length > 0) {
    return {
      isCorrect: false,
      reason: "Expected empty result but got rows",
    };
  }

  if (expectedRows.length > 0 && actualRows.length === 0) {
    return {
      isCorrect: false,
      reason: "Expected rows but got empty result",
    };
  }

  if (expectedRows.length !== actualRows.length) {
    return {
      isCorrect: false,
      reason: `Row count mismatch: expected ${expectedRows.length}, got ${actualRows.length}`,
    };
  }

  const normalizedExpected = expectedRows.map(normalizeRow);
  const normalizedActual = actualRows.map(normalizeRow);

  const expProjection = projectRows(normalizedExpected, expectedColumns);
  if (expProjection.error) {
    return {
      isCorrect: false,
      reason: `Question setup error: ${expProjection.error}`,
    };
  }

  const actProjection = projectRows(normalizedActual, expectedColumns);
  if (actProjection.error) {
    return {
      isCorrect: false,
      reason: actProjection.error,
    };
  }

  let projectedExpected = expProjection.rows;
  let projectedActual = actProjection.rows;

  if (!ignoreOrder) {
    if (sortByColumns.length > 0) {
      if (!isSortedBy(projectedActual, sortByColumns)) {
        const spec = formatSortSpec(sortByColumns);
        return {
          isCorrect: false,
          reason: spec
            ? `Results must be ordered by ${spec}`
            : "Results must be ordered as specified",
        };
      }

      // Compare content, but allow any ordering within identical sort keys
      // (if strict ordering within ties is desired, include more columns).
      const canonExpected = sortRowsWithTieBreaker(
        projectedExpected,
        sortByColumns,
        expectedColumns,
        tolerance,
      );

      const canonActual = sortRowsWithTieBreaker(
        projectedActual,
        sortByColumns,
        expectedColumns,
        tolerance,
      );

      for (let i = 0; i < canonExpected.length; i++) {
        if (
          !rowsEqual(
            canonExpected[i],
            canonActual[i],
            expectedColumns,
            tolerance,
          )
        ) {
          return {
            isCorrect: false,
            reason: "Result set mismatch",
          };
        }
      }

      return { isCorrect: true };
    }

    for (let i = 0; i < projectedExpected.length; i++) {
      if (
        !rowsEqual(
          projectedExpected[i],
          projectedActual[i],
          expectedColumns,
          tolerance,
        )
      ) {
        return {
          isCorrect: false,
          reason: `Row mismatch at position ${i + 1}`,
        };
      }
    }

    return { isCorrect: true };
  }

  if (sortByColumns.length > 0) {
    projectedExpected = sortRows(projectedExpected, sortByColumns);
    projectedActual = sortRows(projectedActual, sortByColumns);
  }

  const actualMap = new Map();

  for (const row of projectedActual) {
    const key = serializeRow(row, expectedColumns, tolerance);
    actualMap.set(key, (actualMap.get(key) || 0) + 1);
  }

  for (const row of projectedExpected) {
    const key = serializeRow(row, expectedColumns, tolerance);

    if (!actualMap.has(key)) {
      return {
        isCorrect: false,
        reason: "Expected row not found in results",
      };
    }

    const count = actualMap.get(key);
    if (count === 1) {
      actualMap.delete(key);
    } else {
      actualMap.set(key, count - 1);
    }
  }

  if (actualMap.size > 0) {
    return {
      isCorrect: false,
      reason: "Query returned extra rows not in expected output",
    };
  }

  return { isCorrect: true };
};
