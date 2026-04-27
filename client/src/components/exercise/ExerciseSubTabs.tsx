import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpenText, Network, Lightbulb, CheckCircle2 } from "lucide-react";
import React from "react";

type TabValue = "question" | "schema" | "hints" | "solutions";

type Tab = {
  value: TabValue;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
};

const tabs: Tab[] = [
  {
    value: "question",
    label: "Question",
    icon: <BookOpenText className="h-4 w-4" />,
  },
  { value: "schema", label: "Schema", icon: <Network className="h-4 w-4" /> },
  { value: "hints", label: "Hints", icon: <Lightbulb className="h-4 w-4" /> },
  {
    value: "solutions",
    label: "Solutions",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

export default function ExerciseSubTabs({
  exerciseId,
  active,
  hintsCount,
}: {
  exerciseId: string;
  active: TabValue;
  hintsCount?: number;
}) {
  const location = useLocation();
  const baseTo = `/exercises/${exerciseId}`;
  const currentParams = new URLSearchParams(location.search || "");
  const searchWithoutView = (() => {
    const next = new URLSearchParams(currentParams);
    next.delete("view");
    const s = next.toString();
    return s ? `?${s}` : "";
  })();

  return (
    <div className="arena-bg-lowest sticky z-10 top-16">
      <div className="mx-auto px-8">
        <nav className="flex items-center gap-2">
          {tabs.map((t) => {
            const isActive = t.value === active;
            const badge =
              t.value === "hints" &&
              typeof hintsCount === "number" &&
              hintsCount > 0 ? (
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-[var(--arena-primary)] px-2 py-0.5 text-[10px] font-black text-white">
                  {hintsCount}
                </span>
              ) : null;

            const to =
              t.value === "question"
                ? `${baseTo}${searchWithoutView}`
                : (() => {
                    const next = new URLSearchParams(currentParams);
                    next.set("view", t.value);
                    const s = next.toString();
                    return `${baseTo}${s ? `?${s}` : ""}`;
                  })();

            return (
              <Link
                key={t.value}
                to={to}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-5 text-[11px] font-semibold uppercase tracking-widest transition-colors",
                  isActive
                    ? "text-[var(--arena-nav-active)] font-black"
                    : "text-[var(--arena-label)] hover:text-[var(--arena-on-surface)]",
                )}
              >
                <span
                  className={cn(
                    isActive
                      ? "text-[var(--arena-nav-active)]"
                      : "text-[var(--arena-placeholder)]",
                  )}
                >
                  {t.icon}
                </span>
                <span>{t.label}</span>
                {badge}
                {isActive ? (
                  <span className="absolute left-4 right-4 bottom-0 h-[2px] bg-[var(--arena-nav-active)] rounded-full" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
