import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  useMockInterviewQuestionQuery,
  useMockInterviewSessionQuery,
  useMockInterviewSolutionsQuery,
} from "@/queries/mockInterviews";
import { cn } from "@/lib/utils";
import SQLInput from "@/components/exercise-detail/SQLInput";
import SchemaExplorer from "@/components/schema/SchemaExplorer";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import TabsButtonGroup from "@/components/common/TabsButtonGroup";
import hljs from "highlight.js";
import { copyToClipboard } from "@/utils/clipboard";
import { toast } from "sonner";

type TabKey = "answer" | "schema" | "solutions";

function statusLabel(s: string) {
  return String(s || "").replaceAll("_", " ").toUpperCase();
}

function StatusPill({
  tone,
  children,
}: {
  tone: "neutral" | "danger" | "success";
  children: React.ReactNode;
}) {
  const cls = cn(
    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em]",
    tone === "danger"
      ? "bg-[var(--arena-error-container)] text-[var(--arena-on-error-container)]"
      : tone === "success"
        ? "bg-[var(--arena-tertiary-fixed)] text-[var(--arena-on-tertiary-fixed-variant)]"
        : "bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)]",
  );

  return <span className={cls}>{children}</span>;
}

function MetaBadge({
  tone,
  children,
}: {
  tone?: "neutral" | "success";
  children: React.ReactNode;
}) {
  const cls = cn(
    "px-3 py-1 rounded-full",
    "text-[10px] font-bold uppercase tracking-[0.18em]",
    tone === "success"
      ? "bg-[color:rgb(111_251_190/0.55)] text-[color:rgb(0_105_71/0.95)] dark:bg-[color:rgb(111_251_190/0.22)] dark:text-[color:rgb(111_251_190/0.95)]"
      : "bg-[color:rgb(226_228_236/0.95)] text-[color:rgb(66_71_84/0.80)] dark:bg-[color:rgb(42_51_66/0.55)] dark:text-white",
  );

  return <span className={cls}>{children}</span>;
}

function ApproachTab({
  active,
  children,
  onClick,
  title,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "px-5 py-2 rounded-full text-[14px] font-semibold transition-colors",
        active
          ? cn(
              "bg-[var(--arena-surface-container-lowest)] text-[var(--arena-primary)]",
              "ring-1 ring-[color:rgb(194_198_214/0.35)]",
            )
          : "bg-transparent text-[color:rgb(66_71_84/0.70)] dark:text-white hover:text-[var(--arena-on-surface)]",
      )}
    >
      {children}
    </button>
  );
}

function SolutionQueryCard({ query }: { query: string }) {
  let highlighted = "";
  try {
    highlighted = hljs.highlight(query, { language: "sql" }).value;
  } catch {
    highlighted = "";
  }

  return (
    <div className="mt-5 bg-[var(--arena-surface-container-low)] rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4 px-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--arena-outline)]">
          PostgreSQL solution
        </span>

        <button
          type="button"
          className="p-2 rounded-lg hover:bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)] hover:text-[var(--arena-on-surface)] transition-colors"
          onClick={async () => {
            try {
              await copyToClipboard(query);
              toast.success("Copied", {
                description: "Solution query copied to clipboard.",
              });
            } catch (e: any) {
              toast.error("Copy failed", {
                description: e?.message || "Unable to copy query.",
              });
            }
          }}
          title="Copy query"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>

      <div className="markdown mt-4 bg-[var(--arena-surface-container-lowest)] rounded-xl border border-[color:rgb(194_198_214/0.14)] dark:border-[color:rgb(42_51_66/0.7)] p-6 overflow-x-auto">
        <pre className="m-0 font-mono text-sm leading-relaxed">
          <code
            className="hljs language-sql"
            {...(highlighted
              ? { dangerouslySetInnerHTML: { __html: highlighted } }
              : {})}
          >
            {!highlighted ? query : null}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function MockInterviewReviewQuestion() {
  const { sessionId, index } = useParams();
  const idx = Number(index);
  const { user } = useAuth();
  const navigate = useNavigate();

  const sessionQuery = useMockInterviewSessionQuery(sessionId, user?.id);
  const session = sessionQuery.data;

  const questionQuery = useMockInterviewQuestionQuery(sessionId, idx, user?.id);
  const data = questionQuery.data;
  const exercise = data?.exercise;
  const sessionQuestion = data?.session_question;

  const [tab, setTab] = useState<TabKey>("answer");
  const [activeSolutionId, setActiveSolutionId] = useState<number | null>(null);

  const canShowSolutions = session && session.status !== "in_progress";
  const solutionsQuery = useMockInterviewSolutionsQuery(
    sessionId,
    idx,
    user?.id,
    !!canShowSolutions && tab === "solutions",
  );
  const solutions = Array.isArray(solutionsQuery.data) ? solutionsQuery.data : [];

  useEffect(() => {
    if (session?.status === "in_progress") {
      navigate(`/mock-interviews/sessions/${sessionId}`, { replace: true });
    }
  }, [session?.status, sessionId, navigate]);

  useEffect(() => {
    if (tab !== "solutions") return;
    if (!activeSolutionId && solutions.length > 0) {
      setActiveSolutionId(solutions[0].id);
    }
  }, [tab, solutions, activeSolutionId]);

  const activeSolution = useMemo(() => {
    if (!activeSolutionId) return null;
    return solutions.find((s: any) => String(s.id) === String(activeSolutionId)) || null;
  }, [solutions, activeSolutionId]);

  if (Number.isNaN(idx) || idx < 0) {
    return <div className="text-sm text-[var(--arena-outline)]">Invalid question.</div>;
  }

  const correctnessTone = sessionQuestion?.is_correct ? "success" : "danger";
  const accentCls = sessionQuestion?.is_correct
    ? "bg-[var(--arena-tertiary-container)]"
    : "bg-[var(--arena-error)]";

  return (
    <div className="w-full">
      {/* Review context bar */}
      <div className="h-14 bg-[var(--arena-surface-bright)] flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() =>
              navigate(`/mock-interviews/sessions/${sessionId}/summary`)
            }
            className="flex items-center gap-2 text-[var(--arena-on-surface-variant)] hover:text-[var(--arena-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Summary</span>
          </button>
          <div className="h-4 w-px bg-[color:rgb(194_198_214/0.35)] dark:bg-[color:rgb(42_51_66/0.7)]" />
          <div className="text-sm font-black tracking-tight text-[var(--arena-on-surface)]">
            Review • Question {idx + 1}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusPill tone="neutral">{statusLabel(session?.status || "—")}</StatusPill>
          <StatusPill tone={correctnessTone}>
            {sessionQuestion?.is_correct ? "Correct" : "Incorrect"}
          </StatusPill>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-8 py-10 space-y-8">
        {/* Question details */}
        <section className="bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem] p-10 relative overflow-hidden">
          <div className={cn("absolute top-0 left-0 w-1 h-full", accentCls)} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--arena-primary)] bg-[var(--arena-primary-fixed)] px-2 py-0.5 rounded-md">
                {exercise?.code || "—"}
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tighter text-[var(--arena-on-surface)]">
              {exercise?.title || ""}
            </h2>
            <p className="text-lg text-[var(--arena-on-surface-variant)] max-w-3xl leading-relaxed whitespace-pre-line">
              {exercise?.description || ""}
            </p>
          </div>
        </section>

        {/* Workspace */}
          <div className="grid grid-cols-1 gap-8">
          {/* Note: let the page scroll instead of making the workspace internally scrollable. */}
          <div className="bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem]">
            <div className="bg-[var(--arena-surface-container)] px-8 pt-4 flex gap-8 rounded-t-[1.5rem]">
              <TabsButtonGroup
                value={tab}
                variant="underline"
                onChange={(next) => setTab(next)}
                className="gap-8"
                items={[
                  { value: "answer", label: "Your answer" },
                  { value: "schema", label: "Schema" },
                  {
                    value: "solutions",
                    label: "Solutions",
                    disabled: !canShowSolutions,
                  },
                ]}
              />
            </div>

            <div className="bg-[var(--arena-surface-container-low)] p-6 rounded-b-[1.5rem]">
              {tab === "answer" ? (
                <div className="bg-[var(--arena-surface-container-lowest)] rounded-xl overflow-hidden border border-[color:rgb(194_198_214/0.14)] dark:border-[color:rgb(42_51_66/0.7)]">
                  <SQLInput
                    value={
                      sessionQuestion?.final_query ||
                      sessionQuestion?.last_query ||
                      ""
                    }
                    onChange={() => {}}
                    schemas={exercise?.schemas || []}
                    relationships={exercise?.relationships || []}
                    readOnly
                    disableAutocomplete
                    className="h-[400px] min-h-[400px] rounded-none border-0 focus-within:ring-0"
                  />
                </div>
              ) : tab === "schema" ? (
                <div className="bg-[var(--arena-surface-container-lowest)] rounded-xl min-h-[520px] border border-[color:rgb(194_198_214/0.14)] dark:border-[color:rgb(42_51_66/0.7)] p-4">
                  <SchemaExplorer
                    schemas={exercise?.schemas || []}
                    relationships={exercise?.relationships || []}
                  />
                </div>
              ) : (
                <div className="bg-[var(--arena-surface-container-lowest)] rounded-xl border border-[color:rgb(194_198_214/0.14)] dark:border-[color:rgb(42_51_66/0.7)] p-8">
                  {solutionsQuery.isLoading ? (
                    <div className="text-sm text-[var(--arena-outline)]">
                      Loading solutions…
                    </div>
                  ) : solutions.length === 0 ? (
                    <div className="text-sm text-[var(--arena-outline)]">
                      No solutions available.
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-2 my-5">
                        {activeSolution?.approach_type ? (
                          <MetaBadge>
                            {String(activeSolution.approach_type).replace(
                              /_/g,
                              " ",
                            )}
                          </MetaBadge>
                        ) : null}
                        {activeSolution?.is_optimal ? (
                          <MetaBadge tone="success">Optimal solution</MetaBadge>
                        ) : null}
                      </div>

                      <div
                        className={cn(
                          "inline-flex w-fit items-center rounded-full p-1",
                          "bg-[color:rgb(226_228_236/0.95)] dark:bg-[color:rgb(42_51_66/0.55)]",
                        )}
                        role="tablist"
                        aria-label="Solution approaches"
                      >
                        {solutions.map((s: any) => (
                          <ApproachTab
                            key={s.id}
                            active={String(activeSolutionId) === String(s.id)}
                            onClick={() => setActiveSolutionId(s.id)}
                            title={s.is_optimal ? "Optimal approach" : undefined}
                          >
                            {s.approach_title}
                          </ApproachTab>
                        ))}
                      </div>

                      {activeSolution?.query ? (
                        <SolutionQueryCard query={activeSolution.query} />
                      ) : null}

                      <div className="mt-6">
                        <MarkdownRenderer
                          variant="bare"
                          content={activeSolution?.explanation || ""}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
