import { useMemo } from "react";
import type { LessonListItem } from "@/types/lessons";

export function useLessonSearch(list: LessonListItem[], query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((l) => {
      const hay =
        `${l.title} ${l.description || ""} ${(l.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [list, query]);
}
