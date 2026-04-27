export type DashboardHeatmapDay = {
  date: string | Date;
  count: number | string;
};

export type DashboardStats = {
  overall?: {
    solved: number;
    total: number;
    attempting?: number;
  };
  difficultyStats?: { difficulty: "easy" | "medium" | "hard" | string; solved: number; total: number }[];
  heatmap?: DashboardHeatmapDay[];
  attempts?: number;
  successRate?: number;
  streaks?: { current: number; best: number };
  window?: { type: "year"; year: number } | { type: "last_year" };
};

export type SolvedExercise = {
  id: number | string;
  code?: string;
  title: string;
  difficulty?: "easy" | "medium" | "hard" | string;
  solved_at: string;
};
