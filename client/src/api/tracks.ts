import { apiClient, unwrapData, withUser } from "@/api/client";

export const listTracks = (userId) =>
  apiClient.get("/api/tracks", withUser(userId)).then(unwrapData);

export const getTrack = (slug, userId) =>
  apiClient.get(`/api/tracks/${slug}`, withUser(userId)).then(unwrapData);

export const listTrackLessons = (slug, userId) =>
  apiClient
    .get(`/api/tracks/${slug}/lessons`, withUser(userId))
    .then(unwrapData);

export const getTrackLesson = ({ trackSlug, lessonSlug }, userId) =>
  apiClient
    .get(`/api/tracks/${trackSlug}/lessons/${lessonSlug}`, withUser(userId))
    .then(unwrapData);

