import { apiClient, unwrapData, withUser } from "./client";

export const executeQuery = ({ questionId, query }, userId) =>
  apiClient
    .post("/api/execute", { questionId, query }, withUser(userId))
    .then(unwrapData);

export const submitAnswer = ({ questionId, query }, userId) =>
  apiClient
    .post("/api/submit", { questionId, query }, withUser(userId))
    .then(unwrapData);

export const explainQuery = ({ questionId, query, analyze }, userId) =>
  apiClient
    .post("/api/explain", { questionId, query, analyze: !!analyze }, withUser(userId))
    .then(unwrapData);
