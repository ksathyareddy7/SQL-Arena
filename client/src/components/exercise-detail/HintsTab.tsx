import { Lightbulb, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

export default function HintsTab({
  hints,
  revealingHint,
  onRevealNextHint,
}) {
  return (
    <CardContent className="pt-5 pb-5 flex flex-col gap-4">
      {hints.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No hints available for this question.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {hints.map((hint, i) =>
              hint.revealed ? (
                <div
                  key={hint.id}
                  className="flex gap-3 items-start bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 dark:bg-amber-600 text-white text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
                    {hint.content}
                  </p>
                </div>
              ) : (
                <div
                  key={hint.id}
                  className="flex gap-3 items-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 opacity-50"
                >
                  <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Hint {i + 1} — locked
                  </p>
                </div>
              ),
            )}
          </div>

          {hints.some((h) => !h.revealed) && (
            <Button
              variant="outline"
              onClick={onRevealNextHint}
              disabled={revealingHint}
              className="self-start bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 hover:text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/40 dark:hover:text-amber-300 transition-colors"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {revealingHint ? "Revealing…" : "Reveal Next Hint"}
            </Button>
          )}

          {hints.every((h) => h.revealed) && (
            <p className="text-xs text-muted-foreground text-center">
              All {hints.length} hints revealed.
            </p>
          )}
        </>
      )}
    </CardContent>
  );
}

