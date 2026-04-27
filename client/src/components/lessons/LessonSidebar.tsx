import { useMemo } from "react";
import { CheckCircle2, Circle, Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LessonListItem } from "@/types/lessons";

function StatusIcon({ status }: { status?: string | null }) {
  if (status === "completed") {
    return (
      <span className="h-7 w-7 rounded-xl flex items-center justify-center bg-[var(--arena-status-solved-bg)] text-[var(--arena-status-solved-dot)]">
        <CheckCircle2 className="h-4.5 w-4.5" />
      </span>
    );
  }

  if (status === "in progress") {
    return (
      <span className="h-7 w-7 rounded-xl flex items-center justify-center bg-[var(--arena-status-attempted-bg)] text-[var(--arena-status-attempted-dot)]">
        <Circle className="h-4.5 w-4.5" />
      </span>
    );
  }

  return (
    <span className="h-7 w-7 rounded-xl flex items-center justify-center bg-[var(--arena-status-locked-bg)] text-[var(--arena-status-locked-icon)]">
      <Dot className="h-6 w-6" />
    </span>
  );
}

export default function LessonSidebar({
  trackTitle,
  query,
  setQuery,
  list,
  filtered,
  activeSlug,
  onSelect,
  className,
}: {
  trackTitle: string;
  query: string;
  setQuery: (v: string) => void;
  list: LessonListItem[];
  filtered: LessonListItem[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  className?: string;
}) {
  const countLabel = useMemo(() => `${list.length} lessons`, [list.length]);

  return (
    <aside className={cn("w-[400px] h-full shrink-0", className)}>
      <div className="h-full bg-[var(--arena-surface-container-low)] p-6 flex flex-col">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest arena-text-outline">
            Track
          </div>
          <div className="mt-1 font-black text-[15px] arena-text-on-surface">
            {trackTitle}
          </div>
          <div className="mt-1 text-[11px] font-bold arena-text-outline">
            {countLabel}
          </div>
        </div>

        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons..."
            className={cn(
              "w-full rounded-xl px-4 py-2.5 text-sm font-semibold",
              "bg-[var(--arena-surface-container-lowest)] arena-text-on-surface",
              "placeholder:text-[var(--arena-placeholder)]",
              "ring-1 ring-[color:rgb(194_198_214/0.15)] dark:ring-[color:rgb(42_51_66/0.6)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--arena-primary)]",
            )}
          />
        </div>

        <div className="mt-4 flex-1 min-h-0 overflow-auto p-1">
          {filtered.map((l) => {
            const active = l.slug === activeSlug;
            return (
              <button
                key={l.slug}
                onClick={() => onSelect(l.slug)}
                className={cn(
                  "w-full text-left rounded-xl px-3 py-3 mb-3 transition-colors",
                  "hover:bg-[var(--arena-surface-container-lowest)] dark:hover:bg-[var(--arena-surface-container-high)]",
                  active &&
                    "bg-[var(--arena-surface-container-lowest)] dark:bg-[var(--arena-surface-container-high)] ring-1 ring-[color:rgb(0_88_190/0.25)]",
                )}
              >
                <div className="flex items-start gap-3">
                  <StatusIcon status={l.status} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-black arena-text-on-surface truncate">
                      {l.title}
                    </div>
                    {l.description ? (
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest arena-text-outline truncate">
                        {l.description}
                      </div>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
