import { useMemo } from "react";
import { useExercisesMetaQuery } from "@/queries/exercises";
import { getAppsFromMeta } from "@/constants/apps";

// Central source of truth for app names on the client:
// - Prefer DB-driven list from `/api/exercises/meta/categories`.
// - Fallback to a stable list if meta is missing/unavailable.
export function useAppOptions(userId: number | undefined) {
  const metaQuery = useExercisesMetaQuery(userId);

  const rawMeta: any = (metaQuery.data as any)?.data ?? metaQuery.data;

  const apps = useMemo(() => getAppsFromMeta(rawMeta), [rawMeta]);

  return { apps, metaQuery };
}

