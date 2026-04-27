import { Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QueryRunSubmitButtons({
  onRun,
  onSubmit,
  runDisabled,
  submitDisabled,
  runPending,
  submitPending,
  dataTourRun,
  dataTourSubmit,
  className,
}: {
  onRun: () => void;
  onSubmit: () => void;
  runDisabled: boolean;
  submitDisabled: boolean;
  runPending: boolean;
  submitPending: boolean;
  dataTourRun?: string;
  dataTourSubmit?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-3", className)}>
      <button
        type="button"
        onClick={onRun}
        disabled={runDisabled}
        {...(dataTourRun ? { "data-tour": dataTourRun } : {})}
        className={cn(
          "h-10 px-5 rounded-sm text-sm font-semibold",
          "inline-flex items-center justify-center gap-2",
          "border border-black/5 dark:border-white/10",
          "bg-[#2563EB] text-white",
          "hover:bg-[#1D4ED8] active:scale-95 transition-all",
          "disabled:opacity-50 disabled:pointer-events-none",
        )}
      >
        <Play className="h-[18px] w-[18px]" />
        {runPending ? "Running…" : "Run Query"}
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled}
        {...(dataTourSubmit ? { "data-tour": dataTourSubmit } : {})}
        className={cn(
          "h-10 px-5 rounded-sm text-sm font-semibold",
          "inline-flex items-center justify-center gap-2",
          "border border-white/25 dark:border-white/10",
          "text-white",
          "bg-gradient-to-b from-[var(--arena-tertiary-container)] to-[var(--arena-tertiary-solid)]",
          "shadow shadow-[color:rgb(2_106_72/0.20)] dark:shadow-none",
          "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
          "disabled:opacity-50 disabled:pointer-events-none",
        )}
      >
        <CheckCircle2 className="h-[18px] w-[18px]" />
        {submitPending ? "Submitting…" : "Submit"}
      </button>
    </div>
  );
}

