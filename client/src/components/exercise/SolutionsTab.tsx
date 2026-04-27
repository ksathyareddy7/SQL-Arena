import { BookOpen, Lock, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AI_PROMPT_TYPES, buildAiPrompt } from "@/utils/aiPrompts";
import { copyToClipboard } from "@/utils/clipboard";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import hljs from "highlight.js";
import React from "react";

function Pill({
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
        // Segmented-tab item (not an independent pill button).
        "px-5 py-2 rounded-full text-[14px] font-semibold",
        "transition-colors",
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

function MetaBadge({
  tone,
  children,
}: {
  tone?: "neutral" | "success";
  children: React.ReactNode;
}) {
  const cls = cn(
    "px-4 py-1 rounded-full",
    "text-[10px] font-bold uppercase tracking-[0.20em]",
    tone === "success"
      ? "bg-[color:rgb(111_251_190/0.55)] text-[color:rgb(0_105_71/0.95)] dark:bg-[color:rgb(111_251_190/0.22)] dark:text-[color:rgb(111_251_190/0.95)]"
      : "bg-[color:rgb(226_228_236/0.95)] text-[color:rgb(66_71_84/0.80)] dark:bg-[color:rgb(42_51_66/0.55)] dark:text-white",
  );

  return <span className={cls}>{children}</span>;
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

export default function SolutionsTab({
  hints,
  unlocked,
  loading,
  solutions,
  activeSolutionId,
  setActiveSolutionId,
  onUnlock,
  exercise,
  activeSolution,
}: any) {
  const list = Array.isArray(solutions) ? solutions : [];

  const handleCopyExplainPrompt = async () => {
    try {
      const prompt = buildAiPrompt({
        type: AI_PROMPT_TYPES.EXPLAIN_SOLUTION,
        exercise,
        activeSolution,
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

  if (!unlocked) {
    const canUnlock = hints.length === 0 || hints.every((h: any) => h.revealed);

    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <div className="h-14 w-14 rounded-2xl bg-[var(--arena-surface-container-low)] flex items-center justify-center mb-4">
          <BookOpen className="w-7 h-7 text-[var(--arena-outline)]" />
        </div>
        <h3 className="text-lg font-black arena-text-on-surface mb-2">
          Unlock Solutions
        </h3>

        {canUnlock ? (
          <>
            <p className="text-sm font-semibold text-[var(--arena-outline)] max-w-sm mb-6">
              Are you sure you want to view the solutions? Try solving it
              yourself first for the best learning.
            </p>
            <Button
              variant="outline"
              onClick={onUnlock}
              disabled={loading}
              className={cn(
                "h-9 px-5 rounded-lg text-sm font-semibold",
                "border-0 text-white hover:text-white",
                "bg-gradient-to-b from-[var(--arena-tertiary-container)] to-[var(--arena-tertiary-solid)]",
                "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
              )}
            >
              {loading ? (
                <div className="w-4 h-4 mr-2 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
              ) : null}
              View Solutions
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-[var(--arena-outline)] max-w-sm mb-6">
              Reveal all hints before unlocking solutions.
            </p>
            <Button
              disabled
              variant="outline"
              className="h-9 px-5 rounded-lg opacity-60 cursor-not-allowed"
            >
              <Lock className="w-4 h-4 mr-2" /> View Solutions
            </Button>
          </>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-8 h-8 border-4 border-[var(--arena-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <p className="text-sm text-[var(--arena-outline)] text-center py-6">
        No solutions loaded yet.
      </p>
    );
  }

  const sol =
    activeSolution || list.find((s: any) => s.id === activeSolutionId);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-6 mt-5">
        <div className="flex flex-wrap items-center gap-2 my-8">
          {sol?.approach_type ? (
            <MetaBadge>
              {String(sol.approach_type).replace(/_/g, " ")}
            </MetaBadge>
          ) : null}
          {sol?.is_optimal ? (
            <MetaBadge tone="success">Optimal solution</MetaBadge>
          ) : null}
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleCopyExplainPrompt}
          className={cn(
            "h-12 px-8 rounded-lg text-sm font-bold self-start",
            "bg-[var(--arena-secondary-container)] text-[var(--arena-on-secondary-fixed-variant)]",
            "border border-[color:rgb(0_88_190/0.18)] dark:border-[color:rgb(117_181_255/0.25)]",
            "hover:bg-[var(--arena-secondary-fixed)]",
          )}
          title="Copy an AI prompt to explain this solution"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Explain with AI
        </Button>
      </div>

      <div
        className={cn(
          "inline-flex w-fit items-center rounded-full p-1",
          "bg-[color:rgb(226_228_236/0.95)] dark:bg-[color:rgb(42_51_66/0.55)]",
        )}
        role="tablist"
        aria-label="Solution approaches"
      >
        {list.map((s: any) => (
          <Pill
            key={s.id}
            active={String(activeSolutionId) === String(s.id)}
            onClick={() => setActiveSolutionId(s.id)}
            title={s.is_optimal ? "Optimal approach" : undefined}
          >
            {s.approach_title}
          </Pill>
        ))}
      </div>

      {sol?.query ? <SolutionQueryCard query={sol.query} /> : null}

      <div className="mt-2">
        <MarkdownRenderer variant="bare" content={sol?.explanation || ""} />
      </div>
    </div>
  );
}
