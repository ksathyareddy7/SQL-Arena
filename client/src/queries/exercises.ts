import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as exercisesApi from "@/api/exercises";
import { queryKeys } from "@/queries/keys";

export const useExercisesMetaQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.exercises.meta(userId),
    queryFn: () => exercisesApi.getMetadata(userId),
    // Safe to fetch without auth; server allows `/api/exercises/meta/*` unauthenticated.
    enabled: true,
  });

export const useExercisesListQuery = (
  params: Record<string, any>,
  userId: number | undefined,
) =>
  useQuery({
    queryKey: queryKeys.exercises.list(userId, params),
    queryFn: () => exercisesApi.listExercises(params, userId),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });

export const useExerciseQuery = (id: string | number | undefined, userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.exercises.detail(userId, id),
    queryFn: () => exercisesApi.getExercise(id, userId),
    enabled: !!userId && !!id,
  });

export const useHintsQuery = (id: string | number | undefined, userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.exercises.hints(userId, id),
    queryFn: () => exercisesApi.getHints(id, userId),
    enabled: !!userId && !!id,
  });

export const useRevealHintMutation = (
  exerciseId: string | number,
  userId: number | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hintId: number) =>
      exercisesApi.revealHint(exerciseId, hintId, userId),
    onSuccess: (revealed) => {
      queryClient.setQueryData(
        queryKeys.exercises.hints(userId, exerciseId),
        (prev: any) =>
          Array.isArray(prev)
            ? prev.map((h) =>
                h.id === revealed.id ? { ...h, revealed: true } : h,
              )
            : prev,
      );
    },
  });
};

export const useUnlockSolutionsMutation = (
  exerciseId: string | number,
  userId: number | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => exercisesApi.unlockSolutions(exerciseId, userId),
    onSuccess: () => {
      queryClient.setQueryData(
        queryKeys.exercises.detail(userId, exerciseId),
        (prev: any) => (prev ? { ...prev, solutions_unlocked: true } : prev),
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.exercises.solutions(userId, exerciseId),
      });
    },
  });
};

export const useSolutionsQuery = (
  exerciseId: string | number,
  userId: number | undefined,
  enabled: boolean,
) =>
  useQuery({
    queryKey: queryKeys.exercises.solutions(userId, exerciseId),
    queryFn: () => exercisesApi.getSolutions(exerciseId, userId),
    enabled: !!userId && !!exerciseId && !!enabled,
    placeholderData: (prev) => prev,
  });
