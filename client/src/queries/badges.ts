import { useQuery } from "@tanstack/react-query";
import * as badgesApi from "@/api/badges";
import { queryKeys } from "@/queries/keys";

export const useBadgesQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.badges.list(userId),
    queryFn: () => badgesApi.listBadges(userId),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });

export const useBadgesSummaryQuery = (userId: number | undefined) =>
  useQuery({
    queryKey: queryKeys.badges.summary(userId),
    queryFn: () => badgesApi.badgesSummary(userId),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });

