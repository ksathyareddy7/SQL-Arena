import test from "node:test";
import assert from "node:assert/strict";
import { badgeSatisfied } from "./badgesRules.js";

test("solves_total awards at threshold", () => {
  const criteria = { type: "solves_total", threshold: 10 };
  assert.equal(badgeSatisfied(criteria, { totalSolved: 9 }), false);
  assert.equal(badgeSatisfied(criteria, { totalSolved: 10 }), true);
});

test("solves_difficulty (hard) awards at threshold", () => {
  const criteria = { type: "solves_difficulty", difficulty: "hard", threshold: 10 };
  assert.equal(badgeSatisfied(criteria, { hardSolved: 9 }), false);
  assert.equal(badgeSatisfied(criteria, { hardSolved: 10 }), true);
});

test("clean_sweep_app awards only when solved equals total", () => {
  const criteria = { type: "clean_sweep_app", app: "social" };
  assert.equal(
    badgeSatisfied(criteria, { totalByApp: { social: 10 }, solvedByApp: { social: 9 } }),
    false,
  );
  assert.equal(
    badgeSatisfied(criteria, { totalByApp: { social: 10 }, solvedByApp: { social: 10 } }),
    true,
  );
});

test("quality flags require current question to satisfy", () => {
  assert.equal(badgeSatisfied({ type: "first_try_any" }, { currentSolvedInOneAttempt: false }), false);
  assert.equal(badgeSatisfied({ type: "first_try_any" }, { currentSolvedInOneAttempt: true }), true);
  assert.equal(badgeSatisfied({ type: "no_hints_any" }, { currentSolvedWithNoHints: true }), true);
  assert.equal(
    badgeSatisfied({ type: "no_solutions_any" }, { currentSolvedWithNoSolutions: true }),
    true,
  );
});

test("lesson_completed_total awards at threshold", () => {
  const criteria = { type: "lesson_completed_total", threshold: 1 };
  assert.equal(badgeSatisfied(criteria, { completedLessons: 0 }), false);
  assert.equal(badgeSatisfied(criteria, { completedLessons: 1 }), true);
});

test("mock_sessions_finished_total awards at threshold", () => {
  const criteria = { type: "mock_sessions_finished_total", threshold: 1 };
  assert.equal(badgeSatisfied(criteria, { finishedMockSessions: 0 }), false);
  assert.equal(badgeSatisfied(criteria, { finishedMockSessions: 1 }), true);
});

test("solves_with_concepts uses concept-set unique count when available", () => {
  const criteria = { type: "solves_with_concepts", concepts: ["aggregation", "group_by"], threshold: 10 };
  const setKey = ["aggregation", "group_by"].sort().join(",");
  assert.equal(
    badgeSatisfied(criteria, { solvedByConceptSet: { [setKey]: 9 }, solvedByConcept: { aggregation: 10, group_by: 10 } }),
    false,
  );
  assert.equal(
    badgeSatisfied(criteria, { solvedByConceptSet: { [setKey]: 10 }, solvedByConcept: { aggregation: 10, group_by: 10 } }),
    true,
  );
});

