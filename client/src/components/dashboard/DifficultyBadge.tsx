import { cn } from "@/lib/utils";

export default function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const d = String(difficulty || "").toLowerCase();
  if (d === "easy") {
    return (
      <span
        className={cn(
          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
          "bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary)]",
          "dark:bg-[rgba(46,229,159,0.18)] dark:text-[#2ee59f] dark:border dark:border-[rgba(46,229,159,0.34)]",
        )}
      >
        Easy
      </span>
    );
  }
  if (d === "medium") {
    return (
      <span
        className={cn(
          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
          "bg-[var(--arena-primary-fixed)] text-[var(--arena-primary)]",
          "dark:bg-[rgba(117,181,255,0.18)] dark:text-[#9cc9ff] dark:border dark:border-[rgba(117,181,255,0.34)]",
        )}
      >
        Medium
      </span>
    );
  }
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        "bg-[var(--arena-error-container)] text-[var(--arena-error)]",
        "dark:bg-[rgba(255,180,171,0.14)] dark:text-[#ffb4ab] dark:border dark:border-[rgba(255,180,171,0.34)]",
      )}
    >
      Hard
    </span>
  );
}

