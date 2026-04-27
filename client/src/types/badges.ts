export type BadgeCategory = "onboarding" | "milestones" | "quality" | "concepts";

export type Badge = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: BadgeCategory | string;
  sort_order: number;
  icon_key: string | null;
};

export type BadgesResponse = {
  data: {
    badges: Badge[];
    earnedBySlug: Record<string, { earned_at: string }>;
  };
};

export type BadgeSummaryResponse = {
  data: { total: number; earned: number };
};

