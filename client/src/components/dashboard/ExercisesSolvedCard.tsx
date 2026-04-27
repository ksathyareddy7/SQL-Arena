import type { SolvedExercise } from "@/types/dashboard";
import DifficultyBadge from "@/components/dashboard/DifficultyBadge";
import { formatRelative } from "@/components/dashboard/utils";

export default function ExercisesSolvedCard({
  solved,
  onRowClick,
}: {
  solved: SolvedExercise[];
  onRowClick: (ex: SolvedExercise) => void;
}) {
  return (
    <div className="arena-bg-lowest rounded-xl overflow-hidden">
      <div className="px-8 py-6 flex justify-between items-center bg-[color-mix(in_srgb,var(--arena-surface-container-low)_50%,transparent)]">
        <h2 className="text-xl font-bold tracking-tight">Submissions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[color-mix(in_srgb,var(--arena-surface-container-low)_30%,transparent)] border-b arena-border-divider">
              <th className="px-8 py-4 text-[12px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)]">
                Exercise Title
              </th>
              <th className="px-8 py-4 text-[12px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)]">
                Difficulty
              </th>
              <th className="px-8 py-4 text-[12px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)] text-right">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y arena-border-divider">
            {solved.map((ex) => (
              <tr
                key={String(ex.id)}
                className="hover:bg-[var(--arena-surface-container-low)] transition-colors cursor-pointer"
                onClick={() => onRowClick(ex)}
              >
                <td className="px-8 py-5 font-bold">{ex.title}</td>
                <td className="px-8 py-5">
                  <DifficultyBadge difficulty={String(ex.difficulty || "easy")} />
                </td>
                <td className="px-8 py-5 text-right text-[var(--arena-outline)]">
                  {ex.solved_at ? formatRelative(ex.solved_at) : ""}
                </td>
              </tr>
            ))}
            {!solved.length ? (
              <tr>
                <td
                  className="px-8 py-8 text-[var(--arena-outline)]"
                  colSpan={3}
                >
                  No exercises solved yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

