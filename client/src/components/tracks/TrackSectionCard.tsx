import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Lock,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackSection } from "@/types/tracks";

export default function TrackSectionCard({
  section,
  trackSlug,
  moduleIndex,
  open,
  onToggle,
}: {
  section: TrackSection;
  trackSlug: string;
  moduleIndex: number;
  open: boolean;
  onToggle: () => void;
}) {
  const lessons = Array.isArray(section.lessons) ? section.lessons : [];
  const total = lessons.length;
  const completed = lessons.filter((l) => l.status === "completed").length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const moduleLabel = `Module ${String(moduleIndex).padStart(2, "0")}`;

  const progressBadge = open
    ? "text-[var(--arena-tertiary-container)] bg-[var(--arena-tertiary-fixed)] dark:text-[var(--arena-badge-easy-fg)]"
    : "text-[var(--arena-outline)] bg-[var(--arena-surface-container)] dark:text-[var(--arena-placeholder)]";

  return (
    <section
      className={cn(
        open
          ? "bg-[var(--arena-surface-container)] p-1 rounded-xl"
          : "bg-[var(--arena-surface-container-low)] rounded-xl overflow-hidden",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full text-left",
          open
            ? "bg-[var(--arena-surface-container-lowest)] rounded-lg p-10"
            : "p-10",
        )}
      >
        <div className="flex justify-between items-center gap-6">
          <div>
            <span
              className={cn(
                "text-[10px] uppercase tracking-widest font-black block mb-2",
                open ? "text-[var(--arena-primary)]" : "text-[var(--arena-outline)]",
              )}
            >
              {moduleLabel}
            </span>
            <h2
              className={cn(
                open
                  ? "text-4xl font-extrabold tracking-tight"
                  : "text-3xl font-extrabold tracking-tight",
                "arena-text-on-surface",
              )}
            >
              {section.title}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)] text-sm font-medium">
              {total} lessons
            </span>
            <span
              className={cn(
                "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest",
                progressBadge,
              )}
            >
              {percent}% completed
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-[var(--arena-outline)] transition-transform",
                open ? "rotate-180" : "",
              )}
            />
          </div>
        </div>
      </button>

      {open ? (
        <div className="bg-[var(--arena-surface-container-lowest)] rounded-b-lg px-10 pb-10">
          <div className="grid gap-2">
            {lessons.map((lesson) => {
              const status = String(lesson.status || "not started");
              const isCompleted = status === "completed";
              const isInProgress = status === "in progress";
              const iconWrap = isCompleted
                ? "bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary-container)] dark:text-[var(--arena-badge-easy-fg)]"
                : isInProgress
                  ? "bg-[var(--arena-primary-fixed)] text-[var(--arena-primary)] dark:text-[var(--arena-nav-active)]"
                  : "bg-[var(--arena-surface-container)] text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)]";

              const RightIcon = isInProgress ? ArrowRight : ChevronRight;
              const rightTone = isInProgress
                ? "text-[var(--arena-primary)] dark:text-[var(--arena-nav-active)]"
                : "text-[var(--arena-outline-variant)] group-hover:text-[var(--arena-primary)]";

              return (
                <Link
                  key={lesson.slug}
                  to={`/tracks/${trackSlug}/lessons/${lesson.slug}`}
                  className={cn(
                    "group flex items-center justify-between p-6 rounded-lg transition-all",
                    isInProgress
                      ? "bg-[var(--arena-surface-container-low)]"
                      : "hover:bg-[var(--arena-surface-container-low)]",
                  )}
                >
                  <div className="flex items-center gap-8 min-w-0">
                    <div
                      className={cn(
                        "w-12 h-12 shrink-0 flex items-center justify-center rounded-full",
                        iconWrap,
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isInProgress ? (
                        <PlayCircle className="w-6 h-6" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-lg truncate arena-text-on-surface">
                        {lesson.title}
                      </h3>
                      {lesson.description ? (
                        <p className="text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)] text-sm mt-1 line-clamp-2">
                          {lesson.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-12 shrink-0">
                    {lesson.estimated_minutes ? (
                      <span className="text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)] text-xs font-mono tracking-wider">
                        ~{lesson.estimated_minutes}m
                      </span>
                    ) : null}
                    <RightIcon className={cn("w-5 h-5 transition-colors", rightTone)} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
