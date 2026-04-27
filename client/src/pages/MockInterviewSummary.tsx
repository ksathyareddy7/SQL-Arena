import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMockInterviewSummaryQuery } from "@/queries/mockInterviews";
import { useUnlockedBadgesDialog } from "@/contexts/BadgesUnlockedDialogContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

function StatusPill({
  tone,
  children,
}: {
  tone: "neutral" | "danger";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em]",
        tone === "danger"
          ? "bg-[var(--arena-error-container)] text-[var(--arena-error)]"
          : "bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)]",
      )}
    >
      {children}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  valueTone = "default",
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  valueTone?: "default" | "success" | "danger";
}) {
  return (
    <div className="p-8 bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem] flex flex-col justify-between min-h-[160px]">
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--arena-outline)] opacity-50">
        {label}
      </span>
      <div className="flex flex-col">
        <span
          className={cn(
            "text-4xl font-black tracking-tighter leading-none",
            valueTone === "success"
              ? "text-[var(--arena-tertiary-container)]"
              : valueTone === "danger"
                ? "text-[var(--arena-error)]"
                : "text-[var(--arena-on-surface)]",
          )}
        >
          {value}
        </span>
        {sub ? <div className="mt-2">{sub}</div> : null}
      </div>
    </div>
  );
}

function DifficultyPill({ difficulty }: { difficulty: string }) {
  const d = String(difficulty || "").toLowerCase();
  if (d === "easy") {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary)] dark:bg-[color:rgb(2_106_72/0.35)] dark:text-[color:rgb(159_244_200/0.95)]">
        easy
      </span>
    );
  }
  if (d === "medium") {
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--arena-secondary-fixed)] text-[var(--arena-on-secondary-fixed-variant)] dark:bg-[color:rgb(117_181_255/0.22)] dark:text-[color:rgb(216_226_255/0.95)]">
        medium
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--arena-error-container)] text-[var(--arena-error)] dark:bg-[color:rgb(186_26_26/0.35)] dark:text-[color:rgb(255_218_214/0.95)]">
      hard
    </span>
  );
}

function statusLabel(s: string) {
  return String(s || "")
    .replaceAll("_", " ")
    .toUpperCase();
}

function statusIconChar(s: string) {
  const v = String(s || "");
  if (v === "correct") return "✓";
  if (v === "incorrect") return "✕";
  if (v === "not_started") return "○";
  return "•";
}

function StatusStateText({ status }: { status: string }) {
  const s = String(status || "").toLowerCase();
  const label = statusLabel(status);

  const tone =
    s === "correct"
      ? "correct"
      : s === "incorrect"
        ? "incorrect"
        : s === "in_progress"
          ? "in_progress"
          : "neutral";

  const cls = cn(
    "inline-flex items-center gap-2",
    "text-xs font-bold uppercase tracking-widest",
    tone === "correct"
      ? "text-[var(--arena-tertiary-container)] dark:text-[color:rgb(159_244_200/0.95)]"
      : tone === "incorrect"
        ? "text-[var(--arena-error)] dark:text-[color:rgb(255_218_214/0.95)]"
        : tone === "in_progress"
          ? "text-[var(--arena-primary)] dark:text-[color:rgb(216_226_255/0.95)]"
          : "text-[var(--arena-outline)] dark:text-[color:rgba(248,250,252,0.85)]",
  );

  return (
    <span className={cls}>
      <span className="text-[11px] leading-none">{statusIconChar(status)}</span>
      <span className="leading-none">{label}</span>
    </span>
  );
}

export default function MockInterviewSummary() {
  const { sessionId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showUnlockedBadges } = useUnlockedBadgesDialog();

  const summaryQuery = useMockInterviewSummaryQuery(sessionId, user?.id);
  const data = summaryQuery.data;
  const session = data?.session;
  const template = session?.template_snapshot || {};
  const shownBadges = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (session?.status === "in_progress") {
      navigate(`/mock-interviews/sessions/${sessionId}`, { replace: true });
    }
  }, [session?.status, sessionId, navigate]);

  useEffect(() => {
    const list: any[] = Array.isArray((data as any)?.newBadges)
      ? (data as any).newBadges
      : [];
    if (!list.length) return;
    const unseen: any[] = [];
    for (const b of list) {
      const slug = String(b?.slug || "");
      if (!slug) continue;
      if (shownBadges.current.has(slug)) continue;
      shownBadges.current.add(slug);
      unseen.push(b);
    }
    if (unseen.length) showUnlockedBadges(unseen as any);
  }, [data]);

  const attemptedAt = useMemo(() => {
    const started = session?.started_at ? new Date(session.started_at) : null;
    if (!started || Number.isNaN(started.getTime())) return "";
    return format(started, "MMM d, yyyy");
  }, [session?.started_at]);

  const headerSubtitle = `${template?.title || "Mock Interview"} • Attempted ${attemptedAt || "—"}`;

  const solved = data?.solved_count ?? 0;
  const total = session?.question_count ?? 0;
  const hintsUsed = data?.hints_used ?? 0;
  const penalty = data?.total_hint_penalty ?? 0;
  const score = data?.total_score ?? 0;
  const maxScore = session?.max_score ?? 0;

  return (
    <div className="max-w-[1440px] mx-auto px-8 pt-12 pb-20">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-5">
            <StatusPill tone="neutral">{session?.status || "ended"}</StatusPill>
            {session?.status === "expired" ? (
              <StatusPill tone="danger">time ended</StatusPill>
            ) : null}
          </div>

          <h1 className="text-[56px] leading-[1.05] font-black tracking-tight text-[var(--arena-on-surface)]">
            Interview Summary
          </h1>
          <p className="mt-3 text-[16px] text-[var(--arena-outline)]">
            {headerSubtitle}
          </p>
        </div>
      </div>

      {summaryQuery.isLoading ? (
        <div className="mt-10 text-sm text-[var(--arena-outline)]">
          Loading summary…
        </div>
      ) : !data ? (
        <div className="mt-10 text-sm text-[var(--arena-outline)]">
          Summary not available.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14">
            <SummaryCard
              label="Score"
              value={
                <>
                  {score}/{maxScore}
                </>
              }
            />
            <SummaryCard
              label="Solved"
              value={
                <>
                  {solved}/{total}
                </>
              }
              sub={
                <p className="text-xs font-bold text-[var(--arena-outline)] opacity-50 mt-2">
                  {solved > 0
                    ? "Successful submissions"
                    : "No successful submissions"}
                </p>
              }
            />
            <SummaryCard
              label="Hints used"
              value={hintsUsed}
              valueTone="success"
              sub={
                <p className="text-xs font-bold text-[var(--arena-tertiary-container)] mt-2">
                  {hintsUsed === 0
                    ? "Perfect resource retention"
                    : "Hints used"}
                </p>
              }
            />
            <SummaryCard
              label="Penalty"
              value={penalty > 0 ? `-${penalty}` : 0}
              valueTone="danger"
              sub={
                <p className="text-xs font-bold text-[color:rgb(186_26_26/0.8)] mt-2">
                  Points deducted
                </p>
              }
            />
          </div>

          <section className="mt-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight text-[var(--arena-on-surface)]">
                Questions
              </h2>
            </div>

            <div className="bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--arena-surface-container-low)]">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                      #
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                      Code
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                      Title
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                      Difficulty
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60 text-center">
                      Score
                    </th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.questions.map((q: any, idx: number) => (
                    <tr
                      key={q.display_order}
                      className="group hover:bg-[var(--arena-surface-container-low)] transition-colors"
                    >
                      <td className="px-8 py-6 text-sm font-bold text-[var(--arena-outline)]/40">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-6 font-mono text-[12px] font-bold tracking-tight text-[var(--arena-primary)]">
                        {q.code}
                      </td>
                      <td className="px-6 py-6 text-sm font-black tracking-tight text-[var(--arena-on-surface)]">
                        {q.title}
                      </td>
                      <td className="px-6 py-6">
                        <DifficultyPill difficulty={q.difficulty} />
                      </td>
                      <td className="px-6 py-6">
                        <StatusStateText status={q.status} />
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-sm font-black text-[var(--arena-on-surface)]">
                          {q.score} / {q.base_score}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/mock-interviews/sessions/${sessionId}/review/${q.display_order}`,
                            )
                          }
                          className="px-4 py-1.5 bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[var(--arena-primary)] hover:text-white transition-all active:scale-95"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
