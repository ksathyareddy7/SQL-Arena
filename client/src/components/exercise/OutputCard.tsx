import ResultTable from "@/components/exercise-detail/ResultTable";
import ExplainPlan from "@/components/exercise-detail/ExplainPlan";
import { Bot } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import type {
  ExerciseOutputTab,
  ResultState,
  SubmitMessage,
} from "@/types/exercise";
import { cn } from "@/lib/utils";
import React from "react";
import { AI_PROMPT_TYPES, buildAiPrompt } from "@/utils/aiPrompts";
import { copyToClipboard } from "@/utils/clipboard";
import TabsButtonGroup from "@/components/common/TabsButtonGroup";

type Props = {
  outputTab: ExerciseOutputTab;
  setOutputTab: (tab: ExerciseOutputTab) => void;
  canExplain: boolean;
  onExplain: (analyze: boolean) => void;
  onRunFirst: () => void;
  exercise: any;
  userQuery: string;
  lastRunQuery: string | null;
  result: ResultState;
  submitMessage: SubmitMessage | null;
  explainPlan: any;
  analyzePlan: any;
  explaining: boolean;
};

export default function OutputCard({
  outputTab,
  setOutputTab,
  canExplain,
  onExplain,
  onRunFirst,
  exercise,
  userQuery,
  lastRunQuery,
  result,
  submitMessage,
  explainPlan,
  analyzePlan,
  explaining,
}: Props) {
  const showUnderstandButton =
    (outputTab === "explain" && !!explainPlan) ||
    (outputTab === "analyze" && !!analyzePlan);

  const understandLabel =
    outputTab === "analyze" ? "Understand Analyze" : "Understand Explain";

  const handleCopyUnderstandPrompt = async () => {
    try {
      if (!exercise) throw new Error("Missing exercise context.");

      const prompt = buildAiPrompt({
        type:
          outputTab === "analyze"
            ? AI_PROMPT_TYPES.UNDERSTAND_ANALYZE
            : AI_PROMPT_TYPES.UNDERSTAND_EXPLAIN,
        exercise,
        userQuery,
        lastRunQuery: lastRunQuery || undefined,
        explainPlan: outputTab === "analyze" ? analyzePlan : explainPlan,
      });

      await copyToClipboard(prompt);
      toast.success("AI prompt copied", {
        description: "Paste it into any AI chat app.",
      });
    } catch (e: any) {
      toast.error("Copy failed", {
        description: e?.message || "Unable to copy prompt to clipboard.",
      });
    }
  };

  const resultsBadge = (() => {
    if (outputTab !== "results") return null;

    // Prefer correctness status if we have it (from execute preview or submit).
    if (submitMessage?.isCorrect === true) {
      return { tone: "success" as const, text: "Success 🚀" };
    }
    if (submitMessage?.isCorrect === false) {
      return { tone: "fail" as const, text: "Failed 💥" };
    }

    // Otherwise, fall back to whether the latest execute succeeded/failed.
    if (result?.error) return { tone: "fail" as const, text: "Failed 💥" };
    const hasData =
      Array.isArray(result?.rows) ||
      (result?.rows && typeof result.rows === "object") ||
      Array.isArray(result?.fields);
    if (hasData) return { tone: "success" as const, text: "Success 🚀" };

    return null;
  })();

  return (
    <div className="bg-[var(--arena-surface-container-lowest)] rounded-2xl overflow-hidden">
      <div className="px-8 pt-4 bg-[var(--arena-surface-container-lowest)]">
        <div className="flex items-center justify-between gap-6">
          <TabsButtonGroup
            value={outputTab}
            variant="underline"
            items={[
              { value: "results", label: "Results" },
              {
                value: "explain",
                label: "Explain",
                disabled: !canExplain,
                onDisabledClick: onRunFirst,
              },
              {
                value: "analyze",
                label: "Explain Analyze",
                disabled: !canExplain,
                onDisabledClick: onRunFirst,
              },
            ]}
            onChange={(next) => {
              setOutputTab(next);
              if (next === "explain") onExplain(false);
              if (next === "analyze") onExplain(true);
            }}
          />

          {resultsBadge ? (
            <span
              className={cn(
                "inline-flex items-center h-8 px-3 rounded-full text-[11px] font-black tracking-wide",
                resultsBadge.tone === "success"
                  ? "bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary)] dark:text-[var(--arena-badge-easy-fg)]"
                  : "bg-[var(--arena-error-container)] text-[var(--arena-error)] dark:text-[var(--arena-badge-hard-fg)]",
              )}
            >
              {resultsBadge.text}
            </span>
          ) : showUnderstandButton ? (
            <button
              type="button"
              onClick={handleCopyUnderstandPrompt}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 hover:text-blue-800",
                "dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50 dark:hover:text-blue-200",
              )}
              title="Copy an AI prompt to understand the current EXPLAIN output"
            >
              <Bot className="w-4 h-4 mr-2" />
              {understandLabel}
            </button>
          ) : null}
        </div>
      </div>

      <div className="bg-[var(--arena-surface-container-low)]">
        {outputTab === "results" ? (
          <ResultTable
            rows={result.rows}
            fields={result.fields}
            error={result.error}
            variant="v2"
          />
        ) : (
          <div className="overflow-auto border border-[color:rgb(194_198_214/0.20)] dark:border-[color:rgb(42_51_66/0.7)] bg-[var(--arena-surface-container-lowest)] p-4 min-h-[220px]">
            {explaining ? (
              <div className="flex justify-center p-10">
                <div className="w-8 h-8 border-4 border-[var(--arena-primary)] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ExplainPlan
                plan={outputTab === "analyze" ? analyzePlan : explainPlan}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
