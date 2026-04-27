import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackLessonQuery, useTrackLessonsQuery } from "@/queries/tracks";
import { useUpdateLessonProgressMutation } from "@/queries/lessons";
import { useLessonSearch } from "@/hooks/useLessonSearch";
import { LESSONS_STRINGS } from "@/strings/lessons";
import type { LessonListItem, TrackLessonPageData } from "@/types/lessons";
import LessonSidebar from "@/components/lessons/LessonSidebar";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import { useUnlockedBadgesDialog } from "@/contexts/BadgesUnlockedDialogContext";

export default function TrackLesson() {
  const { trackSlug, lessonSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;
  const { showUnlockedBadges } = useUnlockedBadgesDialog();

  const [query, setQuery] = useState("");

  const lessonsQuery = useTrackLessonsQuery(trackSlug, userId);
  const lessonQuery = useTrackLessonQuery(trackSlug, lessonSlug, userId);
  const updateProgress = useUpdateLessonProgressMutation(userId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [trackSlug, lessonSlug]);

  const track = lessonsQuery.data?.data?.track || lessonQuery.data?.data?.track;
  const list: LessonListItem[] = lessonsQuery.data?.data?.lessons || [];
  const detail: TrackLessonPageData | null = lessonQuery.data?.data || null;
  const lesson = detail?.lesson || null;

  const filtered = useLessonSearch(list, query);

  const prev = detail?.nav?.prev || null;
  const next = detail?.nav?.next || null;

  const currentStatus = useMemo(() => {
    const slug = String(lessonSlug || "");
    if (!slug) return null;
    return list.find((l) => l.slug === slug)?.status || null;
  }, [lessonSlug, list]);

  const setLesson = (slug: string) => {
    navigate(`/tracks/${trackSlug}/lessons/${slug}`);
  };

  const mark = async (status: "in progress" | "completed") => {
    if (!lesson?.slug) return;
    const res: any = await updateProgress.mutateAsync({
      slug: lesson.slug,
      status,
    });
    if (Array.isArray(res?.newBadges)) {
      showUnlockedBadges(res.newBadges);
    }
  };

  const crumbs = useMemo(() => {
    return `${track?.title || "Track"}  •  ${lesson?.title || "Lesson"}`;
  }, [track?.title, lesson?.title]);

  return (
    <div className="w-full flex gap-10">
      <div
        className="fixed top-[64px] z-10 h-[calc(100vh-64px)]"
        data-tour="lesson.sidebar"
      >
        <LessonSidebar
          trackTitle={track?.title || "SQL Foundations"}
          query={query}
          setQuery={setQuery}
          list={list}
          filtered={filtered}
          activeSlug={lessonSlug || null}
          onSelect={setLesson}
        />
      </div>

      <section className="flex-1 ml-[400px] min-w-0 py-10">
        <div className="px-10 lg:px-12">
          <header>
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase tracking-widest arena-text-outline truncate">
                  {crumbs}
                </div>
                <h1 className="mt-3 text-[44px] leading-[1.05] font-black tracking-tight arena-text-on-surface">
                  {lesson?.title || LESSONS_STRINGS.defaultLessonTitle}
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed arena-text-outline max-w-[760px]">
                  {lesson?.description ||
                    LESSONS_STRINGS.defaultLessonDescription}
                </p>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              {currentStatus !== "in progress" &&
              currentStatus !== "completed" ? (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!lesson || updateProgress.isPending}
                  data-tour="lesson.mark_in_progress"
                  onClick={() => mark("in progress")}
                  className={cn(
                    "h-9 px-5 rounded-lg text-sm font-semibold",
                    "border-0 text-white hover:text-white",
                    "bg-gradient-to-b from-[var(--arena-primary)] to-[var(--arena-primary-solid)]",
                    "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
                  )}
                >
                  Mark in progress
                </Button>
              ) : null}
              {currentStatus === "in progress" ? (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!lesson || updateProgress.isPending}
                  onClick={() => mark("completed")}
                  className={cn(
                    "h-9 px-5 rounded-lg text-sm font-semibold",
                    "border-0 text-white hover:text-white",
                    "bg-gradient-to-b from-[var(--arena-primary)] to-[var(--arena-primary-solid)]",
                    "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
                  )}
                >
                  Mark completed
                </Button>
              ) : null}
            </div>
          </header>

          <div className="mt-10" data-tour="lesson.content">
            {lessonQuery.isLoading ? (
              <div className="text-sm arena-text-outline">
                {LESSONS_STRINGS.loadingLesson}
              </div>
            ) : null}

            {lessonQuery.isError ? (
              <div className="text-sm text-rose-600 dark:text-rose-400">
                {LESSONS_STRINGS.failedLesson}
              </div>
            ) : null}

            {lesson?.content_md ? (
              <MarkdownRenderer variant="bare" content={lesson.content_md} />
            ) : null}
          </div>
          <div className="mt-12 flex justify-between items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              disabled={!prev}
              onClick={() => prev && setLesson(prev.slug)}
              className="h-8 p-5 rounded-md text-sm font-bold arena-text-outline hover:text-[var(--arena-primary)]"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={!next}
              onClick={() => next && setLesson(next.slug)}
              className="h-8 p-5 rounded-md text-sm font-bold arena-text-outline hover:text-[var(--arena-primary)]"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
