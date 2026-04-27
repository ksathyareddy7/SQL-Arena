import { apiClient, unwrapData, withUser } from "./client";

export const getMetadata = (userId) =>
  apiClient
    .get("/api/exercises/meta/categories", withUser(userId))
    .then(unwrapData);

export const listExercises = (params, userId) =>
  apiClient
    .get("/api/exercises", { ...withUser(userId), params })
    .then(unwrapData);

export const getExercise = (id, userId) =>
  apiClient.get(`/api/exercises/${id}`, withUser(userId)).then(unwrapData);

export const getHints = (id, userId) =>
  apiClient
    .get(`/api/exercises/${id}/hints`, withUser(userId))
    .then(unwrapData);

export const revealHint = (id, hintId, userId) =>
  apiClient
    .post(`/api/exercises/${id}/hints/${hintId}/reveal`, {}, withUser(userId))
    .then(unwrapData);

export const unlockSolutions = (id, userId) =>
  apiClient
    .post(`/api/exercises/${id}/solutions/unlock`, {}, withUser(userId))
    .then(unwrapData);

export const getSolutions = (id, userId) =>
  apiClient
    .get(`/api/exercises/${id}/solutions`, withUser(userId))
    .then(unwrapData);
