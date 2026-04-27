import { useAuth } from "@/contexts/AuthContext";
import { useTracksListQuery } from "@/queries/tracks";
import TrackCard from "@/components/tracks/TrackCard";
import { TRACKS_STRINGS } from "@/strings/tracks";
import type { TrackListItem } from "@/types/tracks";

export default function Tracks() {
  const { user } = useAuth();
  const userId = user?.id;

  const tracksQuery = useTracksListQuery(userId);
  const tracks: TrackListItem[] = tracksQuery.data?.data || [];

  return (
    <div className="pt-16 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <header className="mb-16 text-left">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
          {TRACKS_STRINGS.pageTitle}
        </h1>
        <p className="text-lg font-medium opacity-80 text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)]">
          {TRACKS_STRINGS.pageDescription}
        </p>
      </header>

      {tracksQuery.isLoading ? (
        <div className="mt-6 text-sm text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)]">
          {TRACKS_STRINGS.loadingTracks}
        </div>
      ) : null}

      {tracksQuery.isError ? (
        <div className="mt-6 text-sm text-red-600 dark:text-red-400">
          {TRACKS_STRINGS.failedTracks}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        {tracks.map((t) => (
          <TrackCard key={t.slug} track={t} />
        ))}
      </div>
    </div>
  );
}
