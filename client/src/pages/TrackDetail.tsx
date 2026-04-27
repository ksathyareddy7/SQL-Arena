import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackQuery } from "@/queries/tracks";
import { cn } from "@/lib/utils";
import TrackSectionCard from "@/components/tracks/TrackSectionCard";
import { TRACKS_STRINGS } from "@/strings/tracks";
import type { TrackDetailData } from "@/types/tracks";

export default function TrackDetail() {
  const { trackSlug } = useParams();
  const { user } = useAuth();
  const userId = user?.id;

  const trackQuery = useTrackQuery(trackSlug, userId);
  const data: TrackDetailData | null = trackQuery.data?.data || null;
  const track = data?.track || null;
  const stats = data?.stats || null;
  const sections = data?.sections || [];
  const continueSlug = data?.continue_lesson_slug || null;

  const percent = Number(stats?.percent_complete) || 0;
  const badge = track?.badge ? String(track.badge) : "";

  const [openSections, setOpenSections] = useState<Set<number>>(
    () => new Set(),
  );

  useEffect(() => {
    setOpenSections((prev) => {
      if (prev.size > 0) return prev;
      if (!sections.length) return prev;
      return new Set([sections[0].section_order]);
    });
  }, [sections]);

  const toggleSection = (order: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(order)) next.delete(order);
      else next.add(order);
      return next;
    });
  };

  if (trackQuery.isLoading) {
    return (
      <div className="text-sm text-muted-foreground">
        {TRACKS_STRINGS.loadingTrack}
      </div>
    );
  }

  if (trackQuery.isError || !track) {
    return (
      <div className="text-sm text-red-600 dark:text-red-400">
        {TRACKS_STRINGS.failedTrack}
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
      <header className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            {track.is_recommended ? (
              <span className="inline-flex px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary)] dark:text-[var(--arena-badge-easy-fg)]">
                Recommended
              </span>
            ) : badge ? (
              <span className="inline-flex px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)] dark:bg-[var(--arena-surface-container-high)] dark:text-[var(--arena-label)]">
                {badge}
              </span>
            ) : null}

            <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tighter arena-text-on-surface">
              {track.title}
            </h1>

            {track.description ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:rgb(66_71_84/0.75)] dark:text-[var(--arena-placeholder)]">
                {track.description}
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[var(--arena-surface-container-lowest)] rounded-2xl p-8 shadow-[0_12px_40px_rgba(0,88,190,0.04)]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[12px] font-black uppercase tracking-widest arena-text-outline">
                    Course Progress
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[color:rgb(66_71_84/0.75)] dark:text-[var(--arena-placeholder)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--arena-primary)]" />
                    {stats
                      ? `${stats.completed_count} completed`
                      : "0 completed"}
                  </div>
                </div>

                <div className="text-sm font-extrabold text-[var(--arena-primary)]">
                  {percent}%
                </div>
              </div>

              <div className="mt-5 h-1.5 rounded-full bg-[var(--arena-surface-container)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--arena-primary)]"
                  style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-[color:rgb(66_71_84/0.6)] dark:text-[var(--arena-placeholder)]">
                <span>{stats ? `${stats.lesson_count} lessons` : ""}</span>
                <span />
              </div>

              {continueSlug ? (
                <Link
                  to={`/tracks/${track.slug}/lessons/${continueSlug}`}
                  className={cn(
                    "mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm tracking-wide text-white",
                    "bg-gradient-to-b from-[var(--arena-primary)] to-[var(--arena-primary-solid)]",
                    "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
                  )}
                >
                  {percent !== 100 ? TRACKS_STRINGS.continueCta : "View"}
                  {percent !== 100 ? <PlayCircle className="w-5 h-5" /> : null}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="mt-6 space-y-12">
        {sections.map((s, idx) => (
          <TrackSectionCard
            key={s.section_order}
            section={s}
            trackSlug={track.slug}
            moduleIndex={idx + 1}
            open={openSections.has(s.section_order)}
            onToggle={() => toggleSection(s.section_order)}
          />
        ))}
      </div>
    </div>
  );
}
