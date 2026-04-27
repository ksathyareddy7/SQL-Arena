import type { ReactNode } from "react";
import { BarChart3 } from "lucide-react";
import type { DashboardStats } from "@/types/dashboard";
import { difficultyRow } from "@/components/dashboard/utils";

function DifficultyPill({
  bg,
  fg,
  children,
}: {
  bg: string;
  fg: string;
  children: ReactNode;
}) {
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full font-bold"
      style={{ background: bg, color: fg }}
    >
      {children}
    </span>
  );
}

export default function ProgressCard({ stats }: { stats: DashboardStats }) {
  const overallSolved = stats.overall?.solved || 0;
  const overallTotal = stats.overall?.total || 0;
  const pct = overallTotal > 0 ? overallSolved / overallTotal : 0;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct);

  const easy = difficultyRow(stats, "easy");
  const medium = difficultyRow(stats, "medium");
  const hard = difficultyRow(stats, "hard");

  const easyPct =
    easy.total > 0 ? Math.round((100 * easy.solved) / easy.total) : 0;
  const medPct =
    medium.total > 0 ? Math.round((100 * medium.solved) / medium.total) : 0;
  const hardPct =
    hard.total > 0 ? Math.round((100 * hard.solved) / hard.total) : 0;

  return (
    <div className="lg:col-span-1 arena-bg-lowest p-8 rounded-xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold tracking-tight">Progress</h2>
        <BarChart3 className="w-5 h-5 text-[var(--arena-outline)]" />
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r={radius}
              fill="transparent"
              stroke="var(--arena-surface-container)"
              strokeWidth="16"
            />
            <circle
              cx="96"
              cy="96"
              r={radius}
              fill="transparent"
              stroke="var(--arena-primary)"
              strokeWidth="16"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold">{overallSolved}</span>
            <span className="text-[12px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)]">
              Solved
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--arena-tertiary-container)]" />
            <span className="font-semibold">Easy</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--arena-outline)] text-sm">
              {easy.solved} / {easy.total}
            </span>
            <DifficultyPill
              bg="var(--arena-tertiary-fixed)"
              fg="var(--arena-tertiary)"
            >
              {easyPct}%
            </DifficultyPill>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--arena-primary)]" />
            <span className="font-semibold">Medium</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--arena-outline)] text-sm">
              {medium.solved} / {medium.total}
            </span>
            <DifficultyPill
              bg="var(--arena-primary-fixed)"
              fg="var(--arena-primary)"
            >
              {medPct}%
            </DifficultyPill>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--arena-error)]" />
            <span className="font-semibold">Hard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--arena-outline)] text-sm">
              {hard.solved} / {hard.total}
            </span>
            <DifficultyPill
              bg="var(--arena-error-container)"
              fg="var(--arena-error)"
            >
              {hardPct}%
            </DifficultyPill>
          </div>
        </div>
      </div>
    </div>
  );
}

