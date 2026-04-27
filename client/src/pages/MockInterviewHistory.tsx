import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMockInterviewSessionsQuery } from "@/queries/mockInterviews";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

function statusLabel(s: string) {
  return String(s || "").replaceAll("_", " ").toUpperCase();
}

function StatusText({ status }: { status: string }) {
  const v = String(status || "").toLowerCase();
  const cls = cn(
    "text-xs font-bold uppercase tracking-widest",
    v === "completed"
      ? "text-[var(--arena-tertiary-container)] dark:text-[color:rgb(159_244_200/0.95)]"
      : v === "expired"
        ? "text-[var(--arena-error)] dark:text-[color:rgb(255_218_214/0.95)]"
        : v === "abandoned"
          ? "text-[var(--arena-outline)] dark:text-[color:rgba(248,250,252,0.75)]"
          : "text-[var(--arena-primary)] dark:text-[color:rgb(216_226_255/0.95)]",
  );
  return <span className={cls}>{statusLabel(status)}</span>;
}

export default function MockInterviewHistory() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const sessionsQuery = useMockInterviewSessionsQuery(user?.id);
  const sessions = Array.isArray(sessionsQuery.data) ? sessionsQuery.data : [];

  const rows = useMemo(() => {
    return sessions.map((s: any) => {
      const started = s.started_at ? new Date(s.started_at) : null;
      const attemptedAt =
        started && !Number.isNaN(started.getTime())
          ? format(started, "MMM d, yyyy")
          : "—";
      const templateTitle = s?.template_snapshot?.title || s.template_id;
      return {
        id: s.id,
        templateTitle,
        templateId: s.template_id,
        attemptedAt,
        status: s.status,
        score: Number(s.total_score || 0),
        maxScore: Number(s.max_score || 0),
        solved: Number(s.solved_count || 0),
        total: Number(s.question_count || 0),
        hints: Number(s.hints_used || 0),
      };
    });
  }, [sessions]);

  return (
    <div className="max-w-[1440px] mx-auto px-8 pt-12 pb-20">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-[56px] leading-[1.05] font-black tracking-tight text-[var(--arena-on-surface)]">
            Interview History
          </h1>
          <p className="mt-3 text-[16px] text-[var(--arena-outline)]">
            Your past mock interviews and summaries.
          </p>
        </div>
      </div>

      {sessionsQuery.isLoading ? (
        <div className="mt-10 text-sm text-[var(--arena-outline)]">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="mt-10 text-sm text-[var(--arena-outline)]">
          No interviews yet.
        </div>
      ) : (
        <section className="mt-14">
          <div className="bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem] overflow-hidden border border-[color:rgb(194_198_214/0.22)] dark:border-[color:rgb(42_51_66/0.7)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--arena-surface-container-low)]">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                    Date
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                    Template
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60">
                    Status
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60 text-center">
                    Score
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60 text-center">
                    Solved
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60 text-center">
                    Hints
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]/60 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="group hover:bg-[var(--arena-surface-container-low)] transition-colors"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-[var(--arena-outline)]/70">
                      {r.attemptedAt}
                    </td>
                    <td className="px-6 py-6 text-sm font-black tracking-tight text-[var(--arena-on-surface)]">
                      {r.templateTitle}
                    </td>
                    <td className="px-6 py-6">
                      <StatusText status={r.status} />
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-sm font-black text-[var(--arena-on-surface)]">
                        {r.score} / {r.maxScore}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-sm font-black text-[var(--arena-on-surface)]">
                        {r.solved} / {r.total}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className="text-sm font-black text-[var(--arena-on-surface)]">
                        {r.hints}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/mock-interviews/sessions/${r.id}/summary`,
                          )
                        }
                        className="px-4 py-1.5 bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[var(--arena-primary)] hover:text-white transition-all active:scale-95"
                      >
                        View summary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
