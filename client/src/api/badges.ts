import { apiClient, unwrapData, withUser } from "@/api/client";

export const listBadges = (userId: number | undefined) =>
  apiClient.get("/api/badges", withUser(userId)).then(unwrapData);

export const badgesSummary = (userId: number | undefined) =>
  apiClient.get("/api/badges/summary", withUser(userId)).then(unwrapData);

