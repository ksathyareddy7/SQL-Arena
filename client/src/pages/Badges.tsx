import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBadgesQuery } from "@/queries/badges";
import { BadgeCard } from "@/components/badges/BadgeCard";
import type { Badge } from "@/types/badges";

const CATEGORY_LABELS: Record<string, string> = {
  onboarding: "Onboarding",
  milestones: "Milestones",
  quality: "Quality",
  concepts: "Concepts",
};

export default function Badges() {
  const { user } = useAuth();
  const userId = user?.id;
  const query = useBadgesQuery(userId);

  const data = query.data?.data || null;

  const grouped = useMemo(() => {
    const byCategory: Record<string, Badge[]> = {};
    for (const b of data?.badges || []) {
      const cat = String(b.category || "other");
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(b);
    }
    return byCategory;
  }, [data?.badges]);

  const categories = useMemo(() => {
    const keys = Object.keys(grouped);
    const order = ["onboarding", "milestones", "quality", "concepts"];
    keys.sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      if (ai !== -1 || bi !== -1)
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      return a.localeCompare(b);
    });
    return keys;
  }, [grouped]);

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12">
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight arena-text-on-surface">
          Badges
        </h1>
        <p className="mt-3 text-lg arena-text-outline">
          Earn badges by learning, solving challenges, and completing mock
          interviews.
        </p>
      </div>

      {query.isLoading ? (
        <div className="arena-text-outline">Loading badges...</div>
      ) : null}
      {query.isError ? (
        <div className="text-rose-600 dark:text-rose-400">
          Failed to load badges.
        </div>
      ) : null}

      {data ? (
        <div className="space-y-12">
          {categories.map((cat) => (
            <section key={cat}>
              <div className="mb-4 text-sm font-black uppercase tracking-widest arena-text-outline">
                {CATEGORY_LABELS[cat] || cat}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {(grouped[cat] || []).map((b) => (
                  <BadgeCard
                    key={b.slug}
                    badge={b}
                    earnedAt={data.earnedBySlug?.[b.slug]?.earned_at || null}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
