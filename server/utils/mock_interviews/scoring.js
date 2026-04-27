export const baseScoreForDifficulty = (difficulty) => {
  const d = String(difficulty || "").toLowerCase();
  if (d === "easy") return 50;
  if (d === "medium") return 100;
  if (d === "hard") return 150;
  return 100;
};

export const computeQuestionScore = ({
  baseScore,
  hintsRevealedCount,
  hintPenaltyPerReveal,
  isCorrect,
}) => {
  if (!isCorrect) return 0;
  const penalty = Math.max(0, Number(hintsRevealedCount || 0)) * Math.max(0, Number(hintPenaltyPerReveal || 0));
  return Math.max(0, Number(baseScore || 0) - penalty);
};
