import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Badge } from "@/types/badges";
import { ICONS } from "@/components/badges/badgeIcons";

export default function BadgesCard({
  badges,
  earnedBySlug,
}: {
  badges: Badge[];
  earnedBySlug: Record<string, { earned_at: string }>;
}) {
  const earned = badges
    .filter((b) => !!earnedBySlug?.[b.slug]?.earned_at)
    .sort((a, b) => {
      const ad = earnedBySlug[a.slug]?.earned_at || "";
      const bd = earnedBySlug[b.slug]?.earned_at || "";
      return bd.localeCompare(ad);
    })
    .slice(0, 6);

  return (
    <div className="arena-bg-lowest rounded-xl border border-[var(--arena-surface-container)] p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0">
          <div className="text-sm font-black uppercase tracking-widest arena-text-outline">
            Badges
          </div>
          <div className="mt-1 text-[15px] arena-text-outline">
            {earned.length ? "Recently unlocked" : "No badges yet — start solving!"}
          </div>
        </div>
        <Link
          to="/dashboard/badges"
          className={cn(
            "h-9 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center",
            "border-0 text-white hover:text-white",
            "bg-gradient-to-b from-[var(--arena-primary)] to-[var(--arena-primary-solid)]",
            "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
          )}
        >
          View all
        </Link>
      </div>

      {earned.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {earned.map((b) => {
            const icon = ICONS[b.icon_key];
            return (
              <span
                key={b.slug}
                className={cn(
                  "px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-widest inline-flex items-center gap-1.5",
                  "bg-[var(--arena-surface-container-low)] arena-text-on-surface",
                )}
              >
                {icon}
                {b.title}
              </span>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

