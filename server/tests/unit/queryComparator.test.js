import test from "node:test";
import assert from "node:assert/strict";
import { compareResults } from "../../utils/queryComparator.js";

test("compareResults: enforces required columns", () => {
  const out = compareResults({
    expectedRows: [{ a: 1 }],
    actualRows: [{ b: 1 }],
    expectedColumns: ["a"],
    config: {},
  });
  assert.equal(out.isCorrect, false);
  assert.match(out.reason, /Required column "a" is missing/);
});

test("compareResults: ignore_order=true compares as multiset (order-agnostic)", () => {
  const out = compareResults({
    expectedRows: [{ x: 1n }, { x: 2n }],
    actualRows: [{ x: 2n }, { x: 1n }],
    expectedColumns: ["x"],
    config: { ignore_order: true },
  });
  assert.deepEqual(out, { isCorrect: true });
});

test("compareResults: sort_by_columns enforces order by default", () => {
  const out = compareResults({
    expectedRows: [{ v: 2n }, { v: 1n }],
    actualRows: [{ v: 1n }, { v: 2n }],
    expectedColumns: ["v"],
    config: { sort_by_columns: [{ column: "v", direction: "desc" }] },
  });
  assert.equal(out.isCorrect, false);
  assert.match(out.reason, /Results must be ordered by v DESC/);
});

test("compareResults: ignore_order=false + sort_by_columns enforces ordering w/ Postgres NULL rules", () => {
  // DESC => NULLS FIRST
  const outDesc = compareResults({
    expectedRows: [{ v: null }, { v: 2n }, { v: 1n }],
    actualRows: [{ v: 2n }, { v: null }, { v: 1n }], // null is not first => should fail
    expectedColumns: ["v"],
    config: { ignore_order: false, sort_by_columns: [{ column: "v", direction: "desc" }] },
  });
  assert.equal(outDesc.isCorrect, false);
  assert.match(outDesc.reason, /Results must be ordered by v DESC/);

  const outDescOk = compareResults({
    expectedRows: [{ v: null }, { v: 2n }, { v: 1n }],
    actualRows: [{ v: null }, { v: 2n }, { v: 1n }],
    expectedColumns: ["v"],
    config: { ignore_order: false, sort_by_columns: [{ column: "v", direction: "desc" }] },
  });
  assert.deepEqual(outDescOk, { isCorrect: true });

  // ASC => NULLS LAST
  const outAsc = compareResults({
    expectedRows: [{ v: 1n }, { v: 2n }, { v: null }],
    actualRows: [{ v: null }, { v: 1n }, { v: 2n }], // null is not last => should fail
    expectedColumns: ["v"],
    config: { ignore_order: false, sort_by_columns: [{ column: "v", direction: "asc" }] },
  });
  assert.equal(outAsc.isCorrect, false);
  assert.match(outAsc.reason, /Results must be ordered by v ASC/);
});

test("compareResults: numeric tolerance", () => {
  const out = compareResults({
    expectedRows: [{ v: 1.0001 }],
    actualRows: [{ v: 1.00010005 }],
    expectedColumns: ["v"],
    config: { numeric_tolerance: 0.001 },
  });
  assert.deepEqual(out, { isCorrect: true });
});
