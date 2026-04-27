import { apiClient } from "@/api/client";

export type MockInterviewTemplate = {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  question_count: number;
  difficulty_flow: string[];
  allowed_apps: string[];
  required_concepts: string[];
  preferred_concepts: string[];
  unique_apps: boolean;
  hints_allowed: boolean;
  hint_penalty_per_reveal: number;
  solutions_locked_until_end: boolean;
  hide_ai_prompts: boolean;
  disable_editor_autocomplete: boolean;
  reveal_results_immediately: boolean;
};

export type CustomMockInterviewTemplateInput = {
  title: string;
  description?: string;
  duration_minutes: number;
  question_count: number;
  difficulty_flow: ("easy" | "medium" | "hard")[];
  allowed_apps: string[];
  unique_apps?: boolean;
  hint_penalty_per_reveal: number;
};

export const listTemplates = async (userId: number) => {
  const res = await apiClient.get(`/api/mock-interviews/templates`, {
    headers: { "x-user-id": userId },
  });
  return res.data?.data as MockInterviewTemplate[];
};

export const getActiveSession = async (userId: number) => {
  const res = await apiClient.get(`/api/mock-interviews/sessions/active`, {
    headers: { "x-user-id": userId },
  });
  return res.data?.data ?? null;
};

export const listSessions = async (userId: number) => {
  const res = await apiClient.get(`/api/mock-interviews/sessions`, {
    headers: { "x-user-id": userId },
  });
  return (res.data?.data ?? []) as any[];
};

export const startSession = async (templateId: string, userId: number) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions`,
    { templateId },
    { headers: { "x-user-id": userId } },
  );
  return res.data?.data as { sessionId: number; reused?: boolean };
};

export const startCustomSession = async (
  template: CustomMockInterviewTemplateInput,
  userId: number,
) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions`,
    { template },
    { headers: { "x-user-id": userId } },
  );
  return res.data?.data as { sessionId: number; reused?: boolean };
};

export const getSession = async (sessionId: string | number, userId: number) => {
  const res = await apiClient.get(`/api/mock-interviews/sessions/${sessionId}`, {
    headers: { "x-user-id": userId },
  });
  return res.data?.data;
};

export const navigateSession = async (
  sessionId: string | number,
  index: number,
  userId: number,
) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions/${sessionId}/navigate`,
    { index },
    { headers: { "x-user-id": userId } },
  );
  return res.data?.data;
};

export const getSessionQuestion = async (
  sessionId: string | number,
  index: number,
  userId: number,
) => {
  const res = await apiClient.get(
    `/api/mock-interviews/sessions/${sessionId}/questions/${index}`,
    { headers: { "x-user-id": userId } },
  );
  return res.data?.data;
};

export const revealHint = async (
  sessionId: string | number,
  index: number,
  hintId: number,
  userId: number,
) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions/${sessionId}/questions/${index}/hints/${hintId}/reveal`,
    {},
    { headers: { "x-user-id": userId } },
  );
  return res.data?.data;
};

export const executeQuery = async (
  sessionId: string | number,
  index: number,
  query: string,
  userId: number,
) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions/${sessionId}/questions/${index}/execute`,
    { query },
    { headers: { "x-user-id": userId } },
  );
  return res.data;
};

export const submitAnswer = async (
  sessionId: string | number,
  index: number,
  query: string,
  userId: number,
) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions/${sessionId}/questions/${index}/submit`,
    { query },
    { headers: { "x-user-id": userId } },
  );
  return res.data;
};

export const endSession = async (
  sessionId: string | number,
  reason: "completed" | "abandoned",
  userId: number,
) => {
  const res = await apiClient.post(
    `/api/mock-interviews/sessions/${sessionId}/end`,
    { reason },
    { headers: { "x-user-id": userId } },
  );
  return { ...(res.data?.data || {}), newBadges: res.data?.newBadges || [] };
};

export const getSummary = async (sessionId: string | number, userId: number) => {
  const res = await apiClient.get(`/api/mock-interviews/sessions/${sessionId}/summary`, {
    headers: { "x-user-id": userId },
  });
  return { ...(res.data?.data || {}), newBadges: res.data?.newBadges || [] };
};

export const getReviewSolutions = async (
  sessionId: string | number,
  index: number,
  userId: number,
) => {
  const res = await apiClient.get(
    `/api/mock-interviews/sessions/${sessionId}/questions/${index}/solutions`,
    { headers: { "x-user-id": userId } },
  );
  return res.data?.data ?? [];
};
