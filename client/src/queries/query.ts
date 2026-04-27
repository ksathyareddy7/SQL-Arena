import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as queryApi from "@/api/query";
import { queryKeys } from "@/queries/keys";

type ExecuteVars = { questionId: string | number; query: string };
type ExplainVars = { questionId: string | number; query: string; analyze: boolean };
type SubmitVars = { questionId: string | number; query: string };

export const useExecuteQueryMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: ExecuteVars) =>
      queryApi.executeQuery(
        { questionId: variables.questionId, query: variables.query },
        userId,
      ),
    onSuccess: (_data: any, variables: ExecuteVars) => {
      // Persist the editor draft across navigation (server already updated last_query).
      queryClient.setQueryData(
        queryKeys.exercises.detail(userId, variables.questionId),
        (prev: any) => (prev ? { ...prev, last_query: variables.query } : prev),
      );
      queryClient.invalidateQueries({
        queryKey: ["exercises", "list", userId || "anon"],
      });
    },
  });
};

export const useExplainQueryMutation = (userId: number | undefined) =>
  useMutation({
    mutationFn: (variables: ExplainVars) =>
      queryApi.explainQuery(
        {
          questionId: variables.questionId,
          query: variables.query,
          analyze: variables.analyze,
        },
        userId,
      ),
  });

export const useSubmitAnswerMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: SubmitVars) =>
      queryApi.submitAnswer(
        { questionId: variables.questionId, query: variables.query },
        userId,
      ),
    onSuccess: (_data: any, variables: SubmitVars) => {
      // Server-side progress changes should reflect in lists + dashboard.
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats(userId) });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "solved", userId || "anon"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.list(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.summary(userId) });
      queryClient.invalidateQueries({
        queryKey: ["exercises", "list", userId || "anon"],
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.exercises.detail(userId, variables.questionId),
      });
    },
  });
};
