import confetti from "canvas-confetti";

const burst = (opts) => confetti({ origin: { y: 0.6 }, ...opts });

export const fireSuccessConfetti = () => {
  // Quick, punchy LeetCode-ish burst (less spammy than multiple long timeouts)
  burst({ particleCount: 120, spread: 70, startVelocity: 45 });
  setTimeout(() => burst({ particleCount: 60, spread: 90, startVelocity: 30 }), 180);
  setTimeout(
    () => burst({ particleCount: 40, spread: 110, startVelocity: 25 }),
    360,
  );
};

