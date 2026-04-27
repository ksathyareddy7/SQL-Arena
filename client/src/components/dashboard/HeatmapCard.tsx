import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import type { DashboardStats } from "@/types/dashboard";
import { buildHeatmapGrid } from "@/components/dashboard/utils";

export default function HeatmapCard({
  stats,
  year,
  onYear,
}: {
  stats: DashboardStats;
  year: number;
  onYear: (year: number) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { months, totalSubmissions } = useMemo(
    () => buildHeatmapGrid({ heatmap: stats.heatmap || [], year }),
    [stats.heatmap, year],
  );

  const streaks = stats.streaks || { current: 0, best: 0 };

  const colorForLevel = (lvl: number) => {
    if (!isDark) {
      if (lvl <= 0) return "var(--arena-surface-container)";
      if (lvl === 1)
        return "color-mix(in srgb, var(--arena-tertiary-fixed) 55%, var(--arena-surface-container))";
      if (lvl === 2) return "var(--arena-tertiary-fixed)";
      if (lvl === 3)
        return "color-mix(in srgb, var(--arena-tertiary) 35%, var(--arena-tertiary-fixed))";
      return "var(--arena-tertiary-container)";
    }

    // Dark mode: keep empty cells visible and make the green ramp more readable.
    if (lvl <= 0) return "rgba(228, 228, 231, 0.08)";
    if (lvl === 1) return "rgba(46, 229, 159, 0.12)";
    if (lvl === 2) return "rgba(46, 229, 159, 0.20)";
    if (lvl === 3) return "rgba(46, 229, 159, 0.32)";
    return "rgba(46, 229, 159, 0.52)";
  };

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];

  return (
    <div className="lg:col-span-2 arena-bg-lowest p-8 rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-1">
            Submission Activity
          </h2>
          <p className="text-sm text-[var(--arena-outline)]">
            {totalSubmissions} submissions in {year}
          </p>
        </div>
        <div className="flex gap-2">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => onYear(y)}
              className={cn(
                "text-[12px] tracking-[0.10em] font-bold uppercase px-3 py-1 rounded-md transition-colors",
                y === year
                  ? "bg-[var(--arena-surface-container)] text-[var(--arena-on-surface)]"
                  : "text-[var(--arena-outline)] hover:bg-[var(--arena-surface-container)]",
              )}
              aria-pressed={y === year}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow overflow-x-auto pb-4">
        <div className="min-w-[700px]">
          <div className="flex items-start gap-[3px]">
            {months.map((m, monthIdx) => (
              <div
                key={`month-${m.monthIdx}`}
                className="flex items-start gap-[3px]"
              >
                {monthIdx > 0 ? <div className="w-[10px] shrink-0" /> : null}
                <div className="flex items-start gap-[3px]">
                  {m.weeks.map((week, weekIdx) => (
                    <div
                      key={`m-${m.monthIdx}-w-${weekIdx}`}
                      className="flex flex-col gap-[3px]"
                      style={{
                        paddingTop: weekIdx === 0 ? m.firstWeekOffsetPx : 0,
                      }}
                    >
                      {week.map((d) => (
                        <div
                          key={d.key}
                          className="w-[10px] h-[10px] rounded-[2px]"
                          style={{ background: colorForLevel(d.level) }}
                          title={`${d.key}: ${d.count} submission${d.count === 1 ? "" : "s"}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[3px] mt-4">
            {months.map((m, monthIdx) => {
              const weeksCount = m.weeks.length;
              const monthWidth =
                weeksCount * 10 + Math.max(0, weeksCount - 1) * 3;
              const monthLabel =
                [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ][m.monthIdx] || "";

              return (
                <div
                  key={`label-${m.monthIdx}`}
                  className={cn(
                    "flex items-center justify-center",
                    monthIdx > 0 ? "ml-[10px]" : "",
                  )}
                  style={{ width: monthWidth }}
                >
                  <span className="text-[10px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)] text-center">
                    {monthLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-8 border-t arena-border-divider">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{streaks.current}</p>
            <p className="text-[10px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)] opacity-70">
              Current Streak
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{streaks.best}</p>
            <p className="text-[10px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)] opacity-70">
              Best Streak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--arena-outline)]">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div
              key={lvl}
              className="w-3 h-3 rounded-sm"
              style={{ background: colorForLevel(lvl) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

