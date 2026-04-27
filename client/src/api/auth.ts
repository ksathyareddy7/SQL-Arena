import { apiClient, unwrapData } from "./client";

export const login = (username) =>
  apiClient.post("/api/auth/login", { username }).then(unwrapData);

export const signup = (username) =>
  apiClient.post("/api/auth/signup", { username }).then(unwrapData);

export const listUsers = (limit = 100) =>
  apiClient
    .get("/api/auth/users", { params: { limit } })
    .then(unwrapData);
