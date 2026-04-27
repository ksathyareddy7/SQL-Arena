import { Code2, HelpCircle, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

import SQLInput from "@/components/exercise-detail/SQLInput";
import ResultTable from "@/components/exercise-detail/ResultTable";
import HintsTab from "@/components/exercise-detail/HintsTab";
import SchemaExplorer from "@/components/schema/SchemaExplorer";
import { MOCK_INTERVIEW_STRINGS } from "@/strings/mockInterview";
import { formatDuration } from "@/utils/mockInterview";

import TopTabs from "@/components/mock-interview/session/TopTabs";
import Sidebar from "@/components/mock-interview/session/Sidebar";
import { renderInlineCode, StatusBadge } from "@/components/mock-interview/session/ui";
import { useMockInterviewSessionController } from "@/hooks/useMockInterviewSessionController";
import QueryRunSubmitButtons from "@/components/exercise/QueryRunSubmitButtons";

export default function MockInterviewSessionPage() {
  const c = useMockInterviewSessionController();

  const loading = c.loading;
  const exercise = c.exercise;
  const hints = c.hints;
  const hintsRevealedCount = Array.isArray(hints)
    ? hints.filter((h: any) => !!h?.revealed).length
    : 0;

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <div className="h-full flex">
        <Sidebar
          title={c.title}
          questions={c.sessionQuestions}
          activeIndex={c.index}
          onBack={c.onBackToTemplates}
          onSelect={(i) => c.goTo(i)}
          onPrev={c.onPrev}
          onNext={c.onNext}
          canPrev={c.canPrev}
          canNext={c.canNext}
          disabled={c.navigatePending}
        />

        {loading ? (
          <div className="text-sm text-[var(--arena-outline)]">
            Loading session…
          </div>
        ) : (
          <section className="flex-1 min-w-0 ml-80 overflow-y-auto bg-[var(--arena-surface)] p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-[auto_1fr_auto] items-center mb-12">
                <TopTabs
                  view={c.view}
                  onView={c.setView}
                  hintsRevealedCount={hintsRevealedCount}
                />

                <div className="justify-self-center text-[11px] font-black tracking-widest uppercase text-[var(--arena-outline)]">
                  Time left{" "}
                  <span className="text-[var(--arena-on-surface)]">
                    {formatDuration(c.remaining)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={c.onEnd}
                  className={cn(
                    "h-9 px-4 rounded-lg text-xs font-black uppercase tracking-wider",
                    "bg-[var(--arena-error)] text-white",
                    "hover:opacity-90 active:scale-[0.98] transition-all",
                  )}
                >
                  End interview
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {c.view === "question" ? (
                  <div className="bg-[var(--arena-surface-container-lowest)] rounded-xl border border-[color:rgb(194_198_214/0.25)] dark:border-[color:rgb(42_51_66/0.7)] p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[11px] font-black uppercase tracking-widest text-[var(--arena-primary)]">
                            {exercise?.code}
                          </span>
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-[var(--arena-on-surface)]">
                          {exercise?.title}
                        </h2>
                      </div>
                    </div>

                    <div className="max-w-none">
                      <p className="text-[var(--arena-outline)] leading-relaxed">
                        {renderInlineCode(String(exercise?.description || ""))}
                      </p>

                      {Array.isArray(exercise?.solution_columns) &&
                      exercise.solution_columns.length > 0 ? (
                        <div className="mt-6">
                          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--arena-outline)] opacity-70">
                            Expected result columns
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {exercise.solution_columns.map((col: string) => (
                              <span
                                key={col}
                                className={cn(
                                  "px-3 py-1 rounded-full",
                                  "text-[11px] font-mono font-bold tracking-tight",
                                  "bg-[var(--arena-surface-container)] text-[var(--arena-on-surface)]",
                                  "border border-[color:rgb(194_198_214/0.20)] dark:border-[color:rgb(42_51_66/0.7)]",
                                )}
                              >
                                {String(col)}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : c.view === "schema" ? (
                  <div className="bg-[var(--arena-surface-container-lowest)] rounded-xl border border-[color:rgb(194_198_214/0.25)] dark:border-[color:rgb(42_51_66/0.7)] overflow-hidden">
                    <div className="p-5 border-b arena-border-divider">
                      <div className="text-sm font-extrabold text-[var(--arena-on-surface)]">
                        Schema
                      </div>
                    </div>
                    <div className="p-4">
                      <SchemaExplorer
                        schemas={exercise?.schemas || []}
                        relationships={exercise?.relationships || []}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-[var(--arena-surface-container-lowest)] rounded-xl border border-[color:rgb(194_198_214/0.25)] dark:border-[color:rgb(42_51_66/0.7)] overflow-hidden">
                    <div className="p-5 border-b arena-border-divider">
                      <div className="text-sm font-extrabold text-[var(--arena-on-surface)]">
                        Hints
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {hints.length > 0 ? (
                        <div className="text-xs rounded-md border border-amber-300 bg-amber-50 text-amber-800 px-3 py-2 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300">
                          {MOCK_INTERVIEW_STRINGS.hintsPenaltyNote(c.penaltyPer)}
                        </div>
                      ) : null}
                      <HintsTab
                        hints={hints}
                        revealingHint={c.revealHintPending}
                        onRevealNextHint={c.onRevealNextHint}
                      />
                    </div>
                  </div>
                )}
              </div>

              {c.view === "question" ? (
                <div className="grid grid-cols-1 gap-6">
                  {/* SQL Editor */}
                  <div className="flex flex-col h-[500px]">
                    <div className="flex-grow bg-[var(--arena-surface-container-lowest)] rounded-sm border border-[color:rgb(194_198_214/0.25)] dark:border-[color:rgb(42_51_66/0.7)] overflow-hidden flex flex-col">
                      <div className="flex items-center justify-between px-5 py-3 bg-[var(--arena-surface-container-low)] border-b arena-border-divider">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-[var(--arena-primary)]" />
                          <span className="text-sm font-extrabold text-[var(--arena-on-surface)]">
                            SQL Editor
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[color:rgb(114_119_133/0.75)] dark:text-[var(--arena-placeholder)]">
                            Autocomplete disabled
                          </span>
                          <HelpCircle className="w-4 h-4 text-[color:rgb(114_119_133/0.5)] dark:text-[color:rgba(228,228,231,0.35)]" />
                        </div>
                      </div>

                      <div className="flex-grow flex bg-[var(--arena-surface-container-low)]">
                        <div className="w-full h-full bg-[var(--arena-surface-container-lowest)] flex overflow-hidden">
                          <SQLInput
                            value={c.query}
                            onChange={(v: string) => c.setQuery(v)}
                            schemas={exercise?.schemas || []}
                            relationships={exercise?.relationships || []}
                            disableAutocomplete
                            className="rounded-none"
                          />
                        </div>
                      </div>

                      <div className="px-5 py-4 flex items-center justify-between bg-[var(--arena-surface-container-lowest)] border-t arena-border-divider">
                        <button
                          type="button"
                          onClick={c.onFormat}
                          className={cn(
                            "h-9 px-4 rounded-lg text-xs font-black",
                            "inline-flex items-center justify-center gap-2",
                            "border border-[color:rgb(194_198_214/0.25)] dark:border-[color:rgb(42_51_66/0.7)]",
                            "text-[var(--arena-primary)] bg-[color-mix(in_srgb,var(--arena-primary)_10%,transparent)]",
                            "hover:bg-[color-mix(in_srgb,var(--arena-primary)_16%,transparent)]",
                            "active:scale-[0.99] transition-all",
                            "disabled:opacity-60 disabled:pointer-events-none",
                          )}
                          disabled={!c.query.trim()}
                        >
                          Format Query
                        </button>
                        <div className="flex gap-3">
                          <QueryRunSubmitButtons
                            onRun={c.onRun}
                            onSubmit={c.onSubmit}
                            runDisabled={c.sessionEnded || c.executePending || !c.query.trim()}
                            submitDisabled={c.sessionEnded || c.submitPending || !c.query.trim()}
                            runPending={c.executePending}
                            submitPending={c.submitPending}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="flex flex-col h-[500px]">
                    <div className="flex-grow bg-[var(--arena-surface-container-lowest)] rounded-xl border border-[color:rgb(194_198_214/0.25)] dark:border-[color:rgb(42_51_66/0.7)] overflow-hidden flex flex-col">
                      <div className="flex items-center justify-between gap-3 px-5 py-3 bg-[var(--arena-surface-container-low)] border-b arena-border-divider">
                        <div className="flex items-center gap-2">
                          <ListChecks className="w-5 h-5 text-[var(--arena-outline)]" />
                          <span className="text-sm font-extrabold text-[var(--arena-on-surface)]">
                            Results
                          </span>
                        </div>
                        {c.outcome ? (
                          <StatusBadge
                            ok={c.outcome.ok}
                            label={c.outcome.label}
                            title={
                              c.outcome.detail
                                ? `${c.outcome.kind.toUpperCase()}: ${c.outcome.detail}`
                                : c.outcome.kind.toUpperCase()
                            }
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-h-0 overflow-auto">
                        <ResultTable
                          rows={c.result.rows}
                          fields={c.result.fields}
                          error={c.result.error}
                          variant="v2"
                        />
                      </div>
                      <div className="px-5 py-4 bg-[var(--arena-surface-container-low)] border-t arena-border-divider">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[color:rgb(114_119_133/0.75)] dark:text-[var(--arena-placeholder)]">
                            Execution Time: --
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[color:rgb(114_119_133/0.75)] dark:text-[var(--arena-placeholder)]">
                            Rows:{" "}
                            {Array.isArray(c.result.rows) ? c.result.rows.length : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
