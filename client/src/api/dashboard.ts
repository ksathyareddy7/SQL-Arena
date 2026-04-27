import { apiClient, unwrapData, withUser } from "./client";

export const getDashboardStats = (userId, params?: { year?: number }) =>
  apiClient
    .get("/api/dashboard/stats", { ...withUser(userId), params })
    .then(unwrapData);

export const getSolvedExercises = ({ page, limit }, userId) =>
  apiClient
    .get("/api/dashboard/solved", {
      ...withUser(userId),
      params: { page, limit },
    })
    .then(unwrapData);

export const resetProgress = (userId) =>
  apiClient
    .post("/api/dashboard/reset-progress", {}, withUser(userId))
    .then(unwrapData);
