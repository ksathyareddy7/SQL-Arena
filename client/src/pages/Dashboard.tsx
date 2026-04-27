import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Database,
  History,
  RotateCcw,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  useDashboardStatsQuery,
  useResetProgressMutation,
  useSolvedExercisesQuery,
} from "@/queries/dashboard";
import { useBadgesQuery } from "@/queries/badges";
import type { DashboardStats, SolvedExercise } from "@/types/dashboard";
import Pagination from "@/components/common/Pagination";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import StatCard from "@/components/dashboard/StatCard";
import ProgressCard from "@/components/dashboard/ProgressCard";
import HeatmapCard from "@/components/dashboard/HeatmapCard";
import BadgesCard from "@/components/dashboard/BadgesCard";
import ExercisesSolvedCard from "@/components/dashboard/ExercisesSolvedCard";
import { formatPercent } from "@/components/dashboard/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [year, setYear] = useState(() => new Date().getFullYear());
  const [page, setPage] = useState(1);

  const statsQuery = useDashboardStatsQuery(user?.id, { year });
  const solvedQuery = useSolvedExercisesQuery({ page, limit: 5 }, user?.id);
  const resetMutation = useResetProgressMutation(user?.id);
  const badgesQuery = useBadgesQuery(user?.id);

  const stats: DashboardStats | null = statsQuery.data || null;
  const solved: SolvedExercise[] = solvedQuery.data?.data || [];
  const totalPages = solvedQuery.data?.pagination?.totalPages || 1;

  const clearLocalProgressData = () => {
    if (!user?.id) return;
    const prefix = `exercise-timer:v2:user:${user.id}:`;
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.startsWith(prefix)) localStorage.removeItem(k);
        if (k.startsWith("solutions_unlocked_")) localStorage.removeItem(k);
      }
    } catch {
      // ignore
    }
  };

  const handleReset = async () => {
    await resetMutation.mutateAsync();
    clearLocalProgressData();
    setPage(1);
    statsQuery.refetch();
    badgesQuery.refetch();
  };

  const solvedCount = stats?.overall?.solved ?? 0;
  const attempts = stats?.attempts ?? 0;
  const successRate = stats?.successRate ?? 0;
  const totalQuestions = stats?.overall?.total ?? 0;

  const onRowClick = (ex: SolvedExercise) => {
    navigate(`/exercises/${ex.id}`, { state: { from: "/dashboard" } });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight">
            Arena Dashboard
          </h1>
          <p className="text-[var(--arena-outline)] mt-3 text-lg">
            Track your SQL mastery across complex relational schemas. Your
            precision is your primary instrument.
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              disabled={resetMutation.isPending}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
                "border border-[color:rgb(186_26_26/0.25)] text-[var(--arena-error)]",
                "hover:bg-[color-mix(in_srgb,var(--arena-error-container)_55%,transparent)] transition-colors",
                "disabled:opacity-60 disabled:hover:bg-transparent",
              )}
            >
              <RotateCcw className="w-4 h-4" />
              Reset Progress
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete your attempts, submissions heatmap, hint usage,
                unlocked solutions, and earned badges for this account. This
                action can’t be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={resetMutation.isPending}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleReset}
                disabled={resetMutation.isPending}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                {resetMutation.isPending ? "Resetting..." : "Yes, reset"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <StatCard label="Solved" value={solvedCount} Icon={CheckCircle2} />
        <StatCard label="Attempts" value={attempts} Icon={History} />
        <StatCard
          label="Success Rate"
          value={formatPercent(successRate)}
          Icon={TrendingUp}
          valueClassName="text-[var(--arena-tertiary-container)]"
        />
        <StatCard
          label="Total Questions"
          value={totalQuestions}
          Icon={Database}
        />
      </div>

      {badgesQuery.data?.data ? (
        <div className="mb-12">
          <BadgesCard
            badges={badgesQuery.data.data.badges}
            earnedBySlug={badgesQuery.data.data.earnedBySlug || {}}
          />
        </div>
      ) : null}

      {stats ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <ProgressCard stats={stats} />
          <HeatmapCard stats={stats} year={year} onYear={(y) => setYear(y)} />
        </div>
      ) : (
        <div className="arena-bg-lowest rounded-xl p-8 mb-12">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[var(--arena-primary)]" />
            <div className="text-[var(--arena-outline)]">
              {statsQuery.isLoading
                ? "Loading dashboard..."
                : "Failed to load dashboard."}
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <ExercisesSolvedCard solved={solved} onRowClick={onRowClick} />
        <Pagination
          page={page}
          totalPages={Math.max(1, totalPages)}
          onPage={setPage}
          className="pt-8"
        />
      </div>
    </div>
  );
}
