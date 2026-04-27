import { useQuery } from "@tanstack/react-query";
import * as tracksApi from "@/api/tracks";
import { queryKeys } from "@/queries/keys";

export const useTracksListQuery = (userId) =>
  useQuery({
    queryKey: queryKeys.tracks.list(userId),
    queryFn: () => tracksApi.listTracks(userId),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });

export const useTrackQuery = (trackSlug, userId) =>
  useQuery({
    queryKey: queryKeys.tracks.detail(userId, trackSlug || ""),
    queryFn: () => tracksApi.getTrack(trackSlug, userId),
    enabled: !!userId && !!trackSlug,
    placeholderData: (prev) => prev,
  });

export const useTrackLessonsQuery = (trackSlug, userId) =>
  useQuery({
    queryKey: queryKeys.tracks.lessons(userId, trackSlug || ""),
    queryFn: () => tracksApi.listTrackLessons(trackSlug, userId),
    enabled: !!userId && !!trackSlug,
    placeholderData: (prev) => prev,
  });

export const useTrackLessonQuery = (trackSlug, lessonSlug, userId) =>
  useQuery({
    queryKey: queryKeys.tracks.lesson(userId, trackSlug || "", lessonSlug || ""),
    queryFn: () => tracksApi.getTrackLesson({ trackSlug, lessonSlug }, userId),
    enabled: !!userId && !!trackSlug && !!lessonSlug,
    placeholderData: (prev) => prev,
  });

