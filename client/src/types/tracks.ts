export type TrackListItem = {
  slug: string;
  title: string;
  description?: string | null;
  badge?: string | null;
  audience_label?: string | null;
  lesson_count?: number | null;
  completed_count?: number | null;
  percent_complete?: number | null;
  is_recommended?: boolean | null;
};

export type TrackLessonListItem = {
  slug: string;
  title: string;
  description?: string | null;
  status?: "completed" | "in progress" | "not started" | string;
  estimated_minutes?: number | null;
};

export type TrackSection = {
  section_order: number;
  title: string;
  description?: string | null;
  lessons: TrackLessonListItem[];
};

export type TrackDetailData = {
  track: {
    slug: string;
    title: string;
    description?: string | null;
    badge?: string | null;
    audience_label?: string | null;
    is_recommended?: boolean | null;
  };
  stats?: {
    lesson_count: number;
    completed_count: number;
    percent_complete: number;
  } | null;
  sections: TrackSection[];
  continue_lesson_slug?: string | null;
};
