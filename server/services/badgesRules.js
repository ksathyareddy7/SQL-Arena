export const normalizeConceptKey = (name) => String(name || "").trim().toLowerCase();

export const badgeSatisfied = (criteria, stats) => {
  const type = criteria?.type;
  if (!type) return false;

  switch (type) {
    case "solves_total": {
      const threshold = Number(criteria.threshold || 0);
      return (stats.totalSolved || 0) >= threshold;
    }
    case "solves_difficulty": {
      const diff = String(criteria.difficulty || "").toLowerCase();
      const threshold = Number(criteria.threshold || 0);
      if (diff === "hard") return (stats.hardSolved || 0) >= threshold;
      if (diff === "medium") return (stats.mediumSolved || 0) >= threshold;
      if (diff === "easy") return (stats.easySolved || 0) >= threshold;
      return false;
    }
    case "clean_sweep_app": {
      const app = String(criteria.app || "").toLowerCase();
      const total = stats.totalByApp?.[app] || 0;
      const solved = stats.solvedByApp?.[app] || 0;
      return total > 0 && solved >= total;
    }
    case "first_try_any": {
      return !!stats.currentSolvedInOneAttempt;
    }
    case "no_hints_any": {
      return !!stats.currentSolvedWithNoHints;
    }
    case "no_solutions_any": {
      return !!stats.currentSolvedWithNoSolutions;
    }
    case "lesson_completed_total": {
      const threshold = Number(criteria.threshold || 0);
      return (stats.completedLessons || 0) >= threshold;
    }
    case "mock_sessions_finished_total": {
      const threshold = Number(criteria.threshold || 0);
      return (stats.finishedMockSessions || 0) >= threshold;
    }
    case "solves_with_concepts": {
      const threshold = Number(criteria.threshold || 0);
      const required = Array.isArray(criteria.concepts) ? criteria.concepts : [];
      const set = new Set(required.map(normalizeConceptKey));
      if (!set.size) return false;
      const solvedCount = required
        .map((c) => stats.solvedByConcept?.[normalizeConceptKey(c)] || 0)
        // For a multi-concept badge (like aggregator), we want unique-question count.
        // Stats should provide `solvedByConceptSet` when available.
        .reduce((a, b) => Math.max(a, b), 0);
      const setKey = [...set].sort().join(",");
      const solvedUnique = stats.solvedByConceptSet?.[setKey];
      return Number.isFinite(solvedUnique)
        ? solvedUnique >= threshold
        : solvedCount >= threshold;
    }
    default:
      return false;
  }
};

