import type { Badge } from "@/types/badges";
import { ICONS } from "./badgeIcons";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

export function BadgeCard({
  badge,
  earnedAt,
}: {
  badge: Badge;
  earnedAt?: string | null;
}) {
  const isEarned = !!earnedAt;
  const icon = ICONS[badge.icon_key] || <BadgeCheck className="h-5 w-5 text-[var(--arena-primary)]" />;
  return (
    <div
      className={cn(
        "rounded-xl border p-5",
        "bg-[var(--arena-surface-container-lowest)] border-[var(--arena-surface-container)]",
        isEarned ? "border-[var(--arena-primary)] dark:border-white" : "",
        !isEarned ? "opacity-60" : "",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
              "bg-[color-mix(in_srgb,var(--arena-primary)_12%,transparent)]",
            )}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <div className="text-base font-extrabold truncate arena-text-on-surface">
              {badge.title}
            </div>
            <div className="mt-1 text-sm leading-5 arena-text-outline">
              {badge.description}
            </div>
          </div>
        </div>
        <div
          className={cn(
            "text-[11px] font-black uppercase tracking-widest whitespace-nowrap",
            isEarned
              ? "text-[var(--arena-on-surface)] dark:text-white/90"
              : "arena-text-outline",
          )}
        >
          {isEarned ? "Unlocked" : "Locked"}
        </div>
      </div>

      {isEarned ? (
        <div className="mt-3 text-[12px] arena-text-outline">
          Earned {formatDate(earnedAt!)}
        </div>
      ) : null}
    </div>
  );
}
