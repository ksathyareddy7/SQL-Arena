import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as mockApi from "@/api/mockInterviews";
import { queryKeys } from "@/queries/keys";

export const useMockInterviewTemplatesQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.templates(userId),
    queryFn: () => mockApi.listTemplates(userId as number),
    enabled: !!userId,
    staleTime: 60_000,
  });

export const useMockInterviewSessionsQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.sessions(userId),
    queryFn: () => mockApi.listSessions(userId as number),
    enabled: !!userId,
    staleTime: 10_000,
  });

export const useActiveMockInterviewQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.active(userId),
    queryFn: () => mockApi.getActiveSession(userId as number),
    enabled: !!userId,
    staleTime: 5_000,
    // Keep this lightweight; it is used mostly on the templates page.
    refetchInterval: 15_000,
  });

export const useStartMockInterviewMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (templateId: string) => mockApi.startSession(templateId, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.active(userId) });
    },
  });
};

export const useStartCustomMockInterviewMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (template: mockApi.CustomMockInterviewTemplateInput) =>
      mockApi.startCustomSession(template, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.active(userId) });
    },
  });
};

export const useMockInterviewSessionQuery = (
  sessionId: string | number | undefined,
  userId: number | undefined,
) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.session(userId, sessionId),
    queryFn: () => mockApi.getSession(sessionId as any, userId as number),
    enabled: !!userId && !!sessionId,
    // Avoid background polling loops. Session expiry is derived from `ends_at` on the client,
    // and we explicitly refetch after actions (submit/end/navigate).
    refetchOnWindowFocus: false,
  });

export const useNavigateMockInterviewMutation = (
  sessionId: string | number,
  userId: number | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (index: number) =>
      mockApi.navigateSession(sessionId, index, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.session(userId, sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.question(userId, sessionId, undefined) });
    },
  });
};

export const useMockInterviewQuestionQuery = (
  sessionId: string | number | undefined,
  index: number | undefined,
  userId: number | undefined,
) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.question(userId, sessionId, index),
    queryFn: () => mockApi.getSessionQuestion(sessionId as any, index as number, userId as number),
    enabled: !!userId && !!sessionId && typeof index === "number" && index >= 0,
    refetchOnWindowFocus: false,
  });

export const useRevealMockInterviewHintMutation = (
  sessionId: string | number,
  index: number,
  userId: number | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hintId: number) => mockApi.revealHint(sessionId, index, hintId, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.question(userId, sessionId, index) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.session(userId, sessionId) });
    },
  });
};

export const useExecuteMockInterviewQueryMutation = (
  sessionId: string | number,
  index: number,
  userId: number | undefined,
) =>
  useMutation({
    mutationFn: (query: string) => mockApi.executeQuery(sessionId, index, query, userId as number),
  });

export const useSubmitMockInterviewAnswerMutation = (
  sessionId: string | number,
  index: number,
  userId: number | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (query: string) => mockApi.submitAnswer(sessionId, index, query, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.question(userId, sessionId, index) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.session(userId, sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.summary(userId, sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.active(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.list(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.summary(userId) });
    },
  });
};

export const useEndMockInterviewMutation = (
  sessionId: string | number,
  userId: number | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reason: "completed" | "abandoned") =>
      mockApi.endSession(sessionId, reason, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.active(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.session(userId, sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.mockInterviews.summary(userId, sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.list(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.badges.summary(userId) });
    },
  });
};

export const useMockInterviewSummaryQuery = (
  sessionId: string | number | undefined,
  userId: number | undefined,
) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.summary(userId, sessionId),
    queryFn: () => mockApi.getSummary(sessionId as any, userId as number),
    enabled: !!userId && !!sessionId,
    refetchOnWindowFocus: false,
  });

export const useMockInterviewSolutionsQuery = (
  sessionId: string | number | undefined,
  index: number | undefined,
  userId: number | undefined,
  enabled: boolean,
) =>
  useQuery({
    queryKey: queryKeys.mockInterviews.solutions(userId, sessionId, index),
    queryFn: () => mockApi.getReviewSolutions(sessionId as any, index as number, userId as number),
    enabled: !!userId && !!sessionId && typeof index === "number" && enabled,
    placeholderData: (prev) => prev,
  });
