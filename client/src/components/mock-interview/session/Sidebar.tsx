import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import QuestionListItem from "@/components/mock-interview/session/QuestionListItem";

export default function Sidebar({
  title,
  questions,
  activeIndex,
  onBack,
  onSelect,
  onPrev,
  onNext,
  canPrev,
  canNext,
  disabled,
}: {
  title: string;
  questions: any[];
  activeIndex: number;
  onBack: () => void;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  disabled: boolean;
}) {
  return (
    <aside className="w-[320px] fixed top-16 h-[calc(100vh-64px)] z-10 shrink-0 bg-[var(--arena-surface-container-low)] border-r arena-border-divider flex flex-col">
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-sm bg-white dark:bg-[var(--arena-surface-container-high)] hover:bg-[var(--arena-surface-container-high)] transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--arena-outline)]" />
          </button>
          <div>
            <div className="text-[14px] font-extrabold tracking-tight text-[var(--arena-on-surface)]">
              {title}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-2 pb-4">
        <div className="px-2 my-6 text-[14px] font-bold tracking-widest uppercase text-[var(--arena-outline)]">
          Questions list
        </div>

        {questions.map((q: any) => (
          <QuestionListItem
            key={q.display_order}
            active={q.display_order === activeIndex}
            code={q.code}
            title={q.title}
            difficulty={q.difficulty}
            status={q.status}
            isCorrect={q.is_correct}
            attempts={q.attempts_count}
            onClick={() => onSelect(q.display_order)}
          />
        ))}

        {!questions.length && (
          <div className="px-4 text-sm text-[var(--arena-outline)]">
            Loading questions…
          </div>
        )}
      </div>

      <div className="mt-auto p-4 border-t arena-border-divider flex gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev || disabled}
          className={cn(
            "flex-1 h-10 inline-flex items-center justify-center gap-2",
            "text-[11px] font-black uppercase tracking-wider",
            "rounded-lg border border-[color:rgb(194_198_214/0.35)] dark:border-white/10",
            "bg-[var(--arena-surface-container-high)] text-[var(--arena-on-surface)]",
            "hover:bg-[var(--arena-surface-container-highest)] active:scale-[0.98] transition-all",
            "disabled:opacity-40 disabled:pointer-events-none",
          )}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext || disabled}
          className={cn(
            "flex-1 h-10 inline-flex items-center justify-center gap-2",
            "text-[11px] font-black uppercase tracking-wider",
            "rounded-lg border border-[color:rgb(194_198_214/0.35)] dark:border-white/10",
            "bg-[var(--arena-surface-container-high)] text-[var(--arena-on-surface)]",
            "hover:bg-[var(--arena-surface-container-highest)] active:scale-[0.98] transition-all",
            "disabled:opacity-40 disabled:pointer-events-none",
          )}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
