import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TRACKS_STRINGS } from "@/strings/tracks";
import type { TrackListItem } from "@/types/tracks";
import { clampPercent } from "@/utils/tracks";

function levelTone(level: string) {
  const v = String(level || "").toLowerCase();
  if (v === "intermediate")
    return {
      bg: "bg-[var(--arena-tertiary-fixed)]",
      fg: "text-[color:rgb(0_82_54/0.95)] dark:text-[var(--arena-badge-easy-fg)]",
    };
  if (v === "advanced")
    return {
      bg: "bg-[var(--arena-secondary-container)]",
      fg: "text-[var(--arena-on-secondary-fixed-variant)] dark:text-[var(--arena-on-secondary-fixed-variant)]",
    };
  if (v === "expert")
    return {
      bg: "bg-[var(--arena-error-container)]",
      fg: "text-[color:rgb(147_0_10/0.95)] dark:text-[var(--arena-badge-hard-fg)]",
    };
  return {
    bg: "bg-[var(--arena-surface-container-high)]",
    fg: "text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)]",
  };
}

export default function TrackCard({ track }: { track: TrackListItem }) {
  const navigate = useNavigate();
  const percent = clampPercent(track.percent_complete);
  const go = useCallback(() => navigate(`/tracks/${track.slug}`), [navigate, track.slug]);

  const level = String(track.badge || track.audience_label || "").trim();
  const tone = levelTone(level);
  const lessonsCount = Number(track.lesson_count) || 0;
  const audience = track.audience_label ? String(track.audience_label) : "";
  const isRecommended = !!track.is_recommended;

  return (
    <div
      className={cn(
        "tonal-card bg-[var(--arena-surface-container-lowest)] p-8 rounded-[1.5rem] flex flex-col h-full w-full max-w-md",
        "transition-transform duration-200 ease-out hover:-translate-y-1",
        "shadow-[0_12px_40px_rgba(0,88,190,0.04)] hover:shadow-[0_12px_40px_rgba(0,88,190,0.06)]",
      )}
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") go();
      }}
    >
      <div className="flex justify-between items-start mb-6">
        {level ? (
          <span
            className={cn(
              "px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
              tone.bg,
              tone.fg,
            )}
          >
            {level}
          </span>
        ) : (
          <span />
        )}

        {isRecommended ? (
          <span
            className={cn(
              "px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
              "bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary)]",
              "dark:text-[var(--arena-badge-easy-fg)]",
            )}
          >
            Recommended
          </span>
        ) : null}
      </div>

      <h2 className="text-2xl font-bold mb-3 tracking-tight arena-text-on-surface">
        {track.title}
      </h2>

      {audience ? (
        <div className="mb-4">
          <span className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)] dark:bg-[var(--arena-surface-container-high)] dark:text-[var(--arena-label)]">
            {audience}
          </span>
        </div>
      ) : null}

      {track.description ? (
        <p className="text-sm leading-relaxed mb-8 flex-grow text-[color:rgb(66_71_84/0.75)] dark:text-[var(--arena-placeholder)]">
          {track.description}
        </p>
      ) : (
        <div className="mb-8 flex-grow" />
      )}

      <div className="mt-auto">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[var(--arena-primary)]">
            {TRACKS_STRINGS.lessonsLabel(lessonsCount)}
          </span>
          <span className="text-xs font-bold arena-text-on-surface">{percent}%</span>
        </div>

        <div className="w-full bg-[var(--arena-surface-container)] h-1.5 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-[var(--arena-primary)] h-full rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        <button
          type="button"
          className={cn(
            "w-full py-4 rounded-xl font-bold text-sm tracking-wide text-white",
            "bg-gradient-to-br from-[var(--arena-primary-solid)] to-[var(--arena-primary)]",
            "arena-gloss-effect active:scale-95 duration-100",
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            go();
          }}
        >
          {TRACKS_STRINGS.viewCta}
        </button>
      </div>
    </div>
  );
}
