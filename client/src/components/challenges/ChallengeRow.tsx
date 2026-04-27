import { Link } from "react-router-dom";
import { Check, ChevronRight, Clock3, Circle } from "lucide-react";

function StatusIcon({ status }: { status: string }) {
  if (status === "solved") {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-[var(--arena-status-solved-bg)] rounded-xl">
        <div className="w-7 h-7 rounded-full bg-[var(--arena-status-solved-dot)] flex items-center justify-center">
          <Check className="w-4 h-4 text-[var(--arena-status-solved-icon)]" />
        </div>
      </div>
    );
  }

  if (status === "attempted") {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-[var(--arena-status-attempted-bg)] rounded-xl">
        <div className="w-7 h-7 rounded-full bg-[var(--arena-status-attempted-dot)] flex items-center justify-center">
          <Clock3 className="w-4 h-4 text-[var(--arena-status-attempted-icon)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-12 h-12 flex items-center justify-center bg-[var(--arena-status-locked-bg)] rounded-xl text-[var(--arena-status-locked-icon)]">
      <Circle className="w-7 h-7" />
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  if (difficulty === "easy") return <span className="arena-badge arena-badge-easy">Easy</span>;
  if (difficulty === "medium")
    return <span className="arena-badge arena-badge-medium">Medium</span>;
  return <span className="arena-badge arena-badge-hard">Hard</span>;
}

type ChallengeRowProps = {
  exercise: any;
  search: string;
};

export default function ChallengeRow({
  exercise,
  search,
}: ChallengeRowProps) {
  const status: string =
    exercise.status === "not started" ? "not_started" : exercise.status;

  const cta =
    status === "solved"
      ? "Solved"
      : status === "attempted"
        ? "Resume"
        : "Start Challenge";

  const appType = exercise.app_type
    ? String(exercise.app_type).charAt(0).toUpperCase() +
      String(exercise.app_type).slice(1)
    : "";

  return (
    <Link
      to={`/exercises/${exercise.id}`}
      state={{ search }}
      className="group flex items-center justify-between p-5 arena-bg-lowest rounded-xl ring-1 ring-[color:rgb(194_198_214/0.10)] dark:ring-[color:rgb(42_51_66/0.55)] hover:ring-[color:rgb(0_88_190/0.30)] transition-all"
    >
      <div className="flex items-center gap-6 min-w-0">
        <StatusIcon status={status} />
        <div className="min-w-0">
          <h3 className="text-lg font-black tracking-tight arena-text-on-surface truncate">
            #{exercise.id} {exercise.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="arena-badge arena-badge-app">{appType}</span>
            <DifficultyBadge difficulty={exercise.difficulty} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 arena-text-outline group-hover:text-[var(--arena-primary)] transition-colors shrink-0">
        <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          {cta}
        </span>
        <ChevronRight className="w-5 h-5" />
      </div>
    </Link>
  );
}
