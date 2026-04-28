import test from "node:test";
import assert from "node:assert/strict";
import { baseScoreForDifficulty, computeQuestionScore } from "../../utils/mock_interviews/scoring.js";

test("baseScoreForDifficulty maps easy/medium/hard", () => {
  assert.equal(baseScoreForDifficulty("easy"), 50);
  assert.equal(baseScoreForDifficulty("medium"), 100);
  assert.equal(baseScoreForDifficulty("hard"), 150);
});

test("computeQuestionScore correct = base - penalty*hints (floored at 0)", () => {
  assert.equal(
    computeQuestionScore({
      baseScore: 100,
      hintsRevealedCount: 2,
      hintPenaltyPerReveal: 10,
      isCorrect: true,
    }),
    80,
  );

  assert.equal(
    computeQuestionScore({
      baseScore: 10,
      hintsRevealedCount: 2,
      hintPenaltyPerReveal: 10,
      isCorrect: true,
    }),
    0,
  );
});

test("computeQuestionScore incorrect = 0", () => {
  assert.equal(
    computeQuestionScore({
      baseScore: 150,
      hintsRevealedCount: 0,
      hintPenaltyPerReveal: 10,
      isCorrect: false,
    }),
    0,
  );
});

