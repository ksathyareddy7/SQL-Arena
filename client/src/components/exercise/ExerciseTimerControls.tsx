import { useMemo, useState } from "react";
import { Pause, Play, PlayCircle, Square, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIMER_STATUS, STOP_REASON } from "@/utils/exerciseTimerMachine";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const statusLabel = (status: string) => {
  if (status === TIMER_STATUS.IDLE) return "Idle";
  if (status === TIMER_STATUS.RUNNING) return "Running";
  if (status === TIMER_STATUS.PAUSED) return "Paused";
  if (status === TIMER_STATUS.STOPPED) return "Stopped";
  return "Idle";
};

export default function ExerciseTimerControls({ timer }: { timer: any }) {
  const status: string = timer?.status || TIMER_STATUS.IDLE;
  const formatted: string = timer?.formatted || "00:00";
  const { start, pause, resume, stop, reset } = timer?.actions || {};
  const [confirmStopOpen, setConfirmStopOpen] = useState(false);

  const showStart = status === TIMER_STATUS.IDLE;
  const showPause = status === TIMER_STATUS.RUNNING;
  const showResume = status === TIMER_STATUS.PAUSED;
  const showStop =
    status === TIMER_STATUS.RUNNING || status === TIMER_STATUS.PAUSED;
  const showReset = status === TIMER_STATUS.STOPPED;

  const dotClass = useMemo(() => {
    if (status === TIMER_STATUS.RUNNING) return "bg-emerald-500";
    if (status === TIMER_STATUS.PAUSED) return "bg-amber-500";
    if (status === TIMER_STATUS.STOPPED) return "bg-rose-500";
    return "bg-slate-400";
  }, [status]);

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-8 flex items-center gap-2 px-4 bg-[var(--arena-surface-container-lowest)] rounded-lg border",
          "border-[color:rgb(194_198_214/0.20)] dark:border-[color:rgb(42_51_66/0.7)]",
        )}
        title="Exercise timer"
      >
        <span className={cn("w-2.5 h-2.5 rounded-full", dotClass)} />
        <span className="text-[13px] font-mono font-bold text-[var(--arena-label)] tabular-nums">
          {formatted}
        </span>
        <span className="text-[13px] font-bold text-[var(--arena-placeholder)]">
          • {statusLabel(status)}
        </span>
      </div>

      {showStart ? (
        <Button
          size="sm"
          variant="outline"
          onClick={start}
          className={cn(
            "h-8 px-4 rounded-lg text-sm font-semibold",
            "gap-1.5 border-0 text-white hover:text-white",
            "bg-gradient-to-b from-[var(--arena-tertiary-container)] to-[var(--arena-tertiary-solid)]",
            "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
          )}
          title="Start timer"
        >
          <Play className="h-[18px] w-[18px]" />
          Start
        </Button>
      ) : null}

      {showPause ? (
        <Button
          size="sm"
          variant="outline"
          onClick={pause}
          className={cn(
            "h-8 px-4 rounded-lg text-sm font-semibold",
            "gap-1.5 border-0",
            "bg-[var(--arena-secondary-container)] text-[var(--arena-on-secondary-fixed-variant)]",
            "hover:bg-[var(--arena-secondary-fixed)] active:scale-95 transition-all",
          )}
          title="Pause timer"
        >
          <Pause className="h-[18px] w-[18px]" />
          Pause
        </Button>
      ) : null}

      {showResume ? (
        <Button
          size="sm"
          variant="outline"
          onClick={resume}
          className={cn(
            "h-8 px-4 rounded-lg text-sm font-semibold",
            "gap-1.5 border-0 text-white",
            "bg-gradient-to-b from-[var(--arena-primary)] to-[var(--arena-primary-solid)]",
            "arena-gloss-effect hover:opacity-90 active:scale-95 transition-all",
          )}
          title="Resume timer"
        >
          <PlayCircle className="h-[18px] w-[18px]" />
          Resume
        </Button>
      ) : null}

      {showStop ? (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setConfirmStopOpen(true)}
            className={cn(
              "h-8 px-4 rounded-lg text-sm font-semibold",
              "gap-1.5 border border-white/25 dark:border-white/10 text-white hover:text-white",
              "bg-[var(--arena-error)] hover:bg-[var(--arena-error-hover)] active:scale-95 transition-all",
            )}
            title="Stop timer"
          >
            <Square className="h-[18px] w-[18px]" />
            Stop
          </Button>

          <AlertDialog open={confirmStopOpen} onOpenChange={setConfirmStopOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Stop the timer?</AlertDialogTitle>
                <AlertDialogDescription>
                  Stopping is irreversible for this attempt. You won’t be able
                  to resume once it’s stopped.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
                  onClick={() => {
                    setConfirmStopOpen(false);
                    stop?.(STOP_REASON.MANUAL);
                  }}
                >
                  Stop timer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}

      {showReset ? (
        <Button
          size="sm"
          variant="outline"
          onClick={reset}
          className={cn(
            "h-8 px-4 rounded-lg text-sm font-semibold",
            "gap-1.5 bg-[var(--arena-surface-container-lowest)] text-[var(--arena-on-surface)]",
            "border border-[color:rgb(194_198_214/0.20)] dark:border-white/10",
            "hover:bg-[var(--arena-surface)] active:scale-95 transition-all",
          )}
          title="Reset timer (start a new attempt)"
        >
          <RotateCcw className="h-[18px] w-[18px]" />
          Reset
        </Button>
      ) : null}
    </div>
  );
}
