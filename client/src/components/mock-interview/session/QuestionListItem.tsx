import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { toDifficultyLabel } from "@/components/mock-interview/session/ui";

export default function QuestionListItem({
  active,
  code,
  title,
  difficulty,
  status,
  isCorrect,
  attempts,
  onClick,
}: {
  active: boolean;
  code: string;
  title: string;
  difficulty: string;
  status?: string;
  isCorrect?: boolean | null;
  attempts?: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const st = String(status || "");
  const tone =
    isCorrect === true
      ? "correct"
      : isCorrect === false
        ? "incorrect"
        : st === "in_progress"
          ? "in_progress"
          : "not_started";

  const accent =
    tone === "correct"
      ? "bg-[var(--arena-tertiary-container)]"
      : tone === "incorrect"
        ? "bg-[var(--arena-error)]"
        : tone === "in_progress"
          ? "bg-[var(--arena-primary)]"
          : "bg-[var(--arena-outline-variant)]";

  const statusText =
    tone === "correct"
      ? "Solved"
      : tone === "incorrect"
        ? "Incorrect"
        : st
          ? st.replaceAll("_", " ")
          : "not started";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 rounded-none transition-colors relative overflow-hidden",
        "mb-3",
        "border border-transparent",
        active
          ? "bg-[var(--arena-surface-container-lowest)] border-[color:rgb(0_88_190/0.18)]"
          : "hover:bg-[var(--arena-surface-container-high)]",
      )}
    >
      <div
        className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-full", accent)}
      />

      <div className="flex items-center justify-between gap-3 text-[11px] font-black tracking-wider uppercase text-[var(--arena-outline)] mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className={cn("w-2 h-2 rounded-full shrink-0", accent)} />
          <span className="text-[var(--arena-primary)] truncate">{code}</span>
        </div>
        <span className="text-[10px] font-black tracking-widest text-[var(--arena-outline)] opacity-70">
          {statusText}
        </span>
      </div>
      <div className="text-sm font-bold text-[var(--arena-on-surface)] line-clamp-2">
        {title}
      </div>
      <div className="mt-1 flex items-center gap-3 text-[12px] text-[var(--arena-outline)]">
        <span>Difficulty: {toDifficultyLabel(difficulty)}</span>
        {typeof attempts === "number" ? (
          <span className="opacity-70">Attempts: {attempts}</span>
        ) : null}
      </div>
    </button>
  );
}
