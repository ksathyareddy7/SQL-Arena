import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as lessonsApi from "@/api/lessons";
import { queryKeys } from "@/queries/keys";

export const useLessonsListQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.lessons.list(userId),
    queryFn: () => lessonsApi.listLessons(userId),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });

export const useLessonQuery = (slug: string | undefined, userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.lessons.detail(userId, slug || ""),
    queryFn: () => lessonsApi.getLesson(slug, userId),
    enabled: !!userId && !!slug,
    placeholderData: (prev) => prev,
  });

export const useUpdateLessonProgressMutation = (userId) => {
  const queryClient = useQueryClient();
  type Vars = { slug: string; status: string };
  return useMutation({
    mutationFn: (vars: Vars) =>
      lessonsApi.updateLessonProgress({ slug: vars.slug, status: vars.status }, userId),
    onSuccess: (_data: any, vars: Vars) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lessons.list(userId) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lessons.detail(userId, vars.slug),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.list(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.summary(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tracks.list(userId) });
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
    },
  });
};
