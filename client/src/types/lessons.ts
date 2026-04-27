export type LessonStatus = "completed" | "in progress" | "not started" | string;

export type LessonListItem = {
  slug: string;
  title: string;
  description?: string | null;
  level?: string | null;
  tags?: string[] | null;
  estimated_minutes?: number | null;
  status?: LessonStatus;
};

export type LessonDetail = {
  slug: string;
  title: string;
  description?: string | null;
  content_md?: string | null;
};

export type LessonNavItem = {
  slug: string;
  title?: string | null;
};

export type TrackLessonPageData = {
  track?: {
    slug: string;
    title: string;
  } | null;
  lesson?: LessonDetail | null;
  nav?: {
    prev?: LessonNavItem | null;
    next?: LessonNavItem | null;
  } | null;
};
