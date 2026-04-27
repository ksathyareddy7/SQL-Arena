import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as dashboardApi from "@/api/dashboard";
import { queryKeys } from "@/queries/keys";

export const useDashboardStatsQuery = (
  userId: number | undefined,
  params: { year?: number } = {},
  options: any = {},
) =>
  useQuery({
    queryKey: queryKeys.dashboard.stats(userId, params.year),
    queryFn: () => dashboardApi.getDashboardStats(userId, params),
    enabled: !!userId,
    ...options,
  });

export const useSolvedExercisesQuery = ({ page, limit }, userId) =>
  useQuery({
    queryKey: queryKeys.dashboard.solved(userId, page, limit),
    queryFn: () => dashboardApi.getSolvedExercises({ page, limit }, userId),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });

export const useResetProgressMutation = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => dashboardApi.resetProgress(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "stats", userId || "anon"],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "solved", userId || "anon"] });
      queryClient.invalidateQueries({ queryKey: ["exercises", "list", userId || "anon"] });
      queryClient.invalidateQueries({ queryKey: ["exercises", "detail", userId || "anon"] });
      queryClient.invalidateQueries({ queryKey: ["exercises", "hints", userId || "anon"] });
      queryClient.invalidateQueries({ queryKey: ["exercises", "solutions", userId || "anon"] });
    },
  });
};
