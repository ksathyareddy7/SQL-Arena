import type { DashboardHeatmapDay, DashboardStats } from "@/types/dashboard";

export function toCount(v: unknown) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) ? n : 0;
}

export function levelForCount(count: number) {
  if (!count || count <= 0) return 0;
  return Math.min(4, Math.ceil(count / 2));
}

export function formatPercent(n: number) {
  if (!Number.isFinite(n)) return "0%";
  return `${n.toFixed(1)}%`;
}

export function formatRelative(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  if (!Number.isFinite(diffMs) || diffMs < 0) return "";

  const minutes = Math.floor(diffMs / (60 * 1000));
  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function difficultyRow(
  stats: DashboardStats | null | undefined,
  difficulty: "easy" | "medium" | "hard",
) {
  const rows = stats?.difficultyStats || [];
  const row = rows.find((r) => r.difficulty === difficulty);
  return {
    solved: toCount(row?.solved),
    total: toCount(row?.total),
  };
}

export function buildHeatmapGrid({
  heatmap,
  year,
}: {
  heatmap: DashboardHeatmapDay[];
  year: number;
}) {
  const map = new Map<string, number>();
  for (const d of heatmap) {
    const dateKey =
      typeof d.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.date)
        ? d.date
        : new Date(String(d.date)).toISOString().slice(0, 10);
    map.set(dateKey, toCount(d.count));
  }

  const cellStridePx = 13; // 10px cell + 3px gap

  const months = Array.from({ length: 12 }, (_, monthIdx) => {
    const monthStart = new Date(Date.UTC(year, monthIdx, 1));
    const nextMonthStart = new Date(Date.UTC(year, monthIdx + 1, 1));
    const daysInMonth = Math.round(
      (nextMonthStart.getTime() - monthStart.getTime()) / (24 * 60 * 60 * 1000),
    );
    const firstDow = monthStart.getUTCDay(); // 0..6, Sunday-based

    const weekCount = Math.ceil((firstDow + daysInMonth) / 7);
    const weeks = Array.from(
      { length: weekCount },
      () => [] as { key: string; count: number; level: number }[],
    );

    for (let i = 0; i < daysInMonth; i++) {
      const dt = new Date(Date.UTC(year, monthIdx, 1 + i));
      const key = dt.toISOString().slice(0, 10);
      const count = map.get(key) || 0;
      const level = levelForCount(count);
      const weekIdx = Math.floor((firstDow + i) / 7);
      weeks[weekIdx]?.push({ key, count, level });
    }

    return {
      monthIdx,
      firstDow,
      weeks,
      firstWeekOffsetPx: firstDow * cellStridePx,
    };
  });

  const totalSubmissions = months.reduce(
    (acc, m) =>
      acc + m.weeks.reduce((a, w) => a + w.reduce((b, d) => b + d.count, 0), 0),
    0,
  );

  return { months, totalSubmissions, cellStridePx };
}

