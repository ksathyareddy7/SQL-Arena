import type { View } from "@/types/mockInterview";
import TabsButtonGroup from "@/components/common/TabsButtonGroup";

export default function TopTabs({
  view,
  onView,
  hintsRevealedCount,
}: {
  view: View;
  onView: (v: View) => void;
  hintsRevealedCount?: number;
}) {
  const hintsBadge =
    typeof hintsRevealedCount === "number" && hintsRevealedCount > 0 ? (
      <span className="inline-flex items-center justify-center rounded-full bg-[var(--arena-primary)] px-2 py-0.5 text-[10px] font-black text-white">
        {hintsRevealedCount}
      </span>
    ) : null;

  return (
    <TabsButtonGroup
      value={view}
      variant="segmented"
      size="sm"
      onChange={onView}
      items={[
        { value: "question", label: "Question" },
        { value: "schema", label: "Schema" },
        { value: "hints", label: "Hints", badge: hintsBadge },
      ]}
      className="bg-[var(--arena-surface-container)] rounded-lg"
    />
  );
}
