import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import type { CustomMockInterviewTemplateInput } from "@/api/mockInterviews";
import { DEFAULT_APPS, normalizeAppName } from "@/constants/apps";

export default function CustomMockInterviewDialog({
  open,
  onOpenChange,
  disabled,
  availableApps,
  startPending,
  onStartTemplate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  availableApps: string[];
  startPending: boolean;
  onStartTemplate: (template: CustomMockInterviewTemplateInput) => void;
}) {
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [questionCount, setQuestionCount] = useState(4);
  const [easyCount, setEasyCount] = useState(1);
  const [mediumCount, setMediumCount] = useState(3);
  const [hardCount, setHardCount] = useState(0);
  const [hintPenalty, setHintPenalty] = useState(10);
  const [uniqueApps, setUniqueApps] = useState(false);

  const normalizedAvailableApps = useMemo(
    () =>
      Array.isArray(availableApps)
        ? availableApps
            .map(normalizeAppName)
            .filter(Boolean)
        : [],
    [availableApps],
  );

  const [selectedApps, setSelectedApps] = useState<string[]>(
    normalizedAvailableApps.length ? normalizedAvailableApps : [...DEFAULT_APPS],
  );

  useEffect(() => {
    if (normalizedAvailableApps.length === 0) return;
    setSelectedApps((prev) => {
      const prevNorm = prev.map(normalizeAppName).filter(Boolean);
      if (prevNorm.length === 0) return normalizedAvailableApps;
      const prevSet = new Set(prevNorm);
      const intersection = normalizedAvailableApps.filter((a) => prevSet.has(a));
      return intersection.length > 0 ? intersection : normalizedAvailableApps;
    });
  }, [normalizedAvailableApps.join("|")]);

  const countsTotal = easyCount + mediumCount + hardCount;
  const appsTotal = selectedApps.length;
  const titleValid = title.trim().length > 0;
  const customValid =
    titleValid &&
    durationMinutes >= 5 &&
    durationMinutes <= 180 &&
    questionCount >= 1 &&
    questionCount <= 12 &&
    countsTotal === questionCount &&
    appsTotal > 0 &&
    hintPenalty >= 0 &&
    hintPenalty <= 50;

  const buildFlow = () => [
    ...Array.from({ length: easyCount }, () => "easy" as const),
    ...Array.from({ length: mediumCount }, () => "medium" as const),
    ...Array.from({ length: hardCount }, () => "hard" as const),
  ];

  const handleStart = () => {
    if (disabled || startPending || !customValid) return;
    const template: CustomMockInterviewTemplateInput = {
      title: title.trim(),
      duration_minutes: durationMinutes,
      question_count: questionCount,
      difficulty_flow: buildFlow(),
      allowed_apps: selectedApps,
      unique_apps: uniqueApps,
      hint_penalty_per_reveal: hintPenalty,
    };
    onStartTemplate(template);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Create custom interview</DialogTitle>
          <DialogDescription>
            Configure a strict session. Solutions and AI prompts stay locked
            until the end.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          <div>
            <div className="text-[11px] font-black tracking-widest uppercase arena-text-outline mb-2">
              Title
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Custom Interview"
            />
            {!titleValid ? (
              <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                Title is required.
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-[11px] font-black tracking-widest uppercase arena-text-outline mb-2">
                Duration (min)
              </div>
              <Input
                type="number"
                min={5}
                max={180}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="text-[11px] font-black tracking-widest uppercase arena-text-outline mb-2">
                Questions
              </div>
              <Input
                type="number"
                min={1}
                max={12}
                value={questionCount}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (!Number.isFinite(next)) return;
                  setQuestionCount(next);
                  setMediumCount(Math.max(0, next - easyCount - hardCount));
                }}
              />
            </div>
            <div>
              <div className="text-[11px] font-black tracking-widest uppercase arena-text-outline mb-2">
                Hint penalty
              </div>
              <Input
                type="number"
                min={0}
                max={50}
                value={hintPenalty}
                onChange={(e) => setHintPenalty(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <div className="text-[11px] font-black tracking-widest uppercase arena-text-outline mb-2">
              Difficulty mix (must sum to {questionCount})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <div className="text-[11px] font-extrabold arena-text-outline mb-1">
                  Easy
                </div>
                <Input
                  type="number"
                  min={0}
                  max={questionCount}
                  value={easyCount}
                  onChange={(e) => setEasyCount(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="text-[11px] font-extrabold arena-text-outline mb-1">
                  Medium
                </div>
                <Input
                  type="number"
                  min={0}
                  max={questionCount}
                  value={mediumCount}
                  onChange={(e) => setMediumCount(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="text-[11px] font-extrabold arena-text-outline mb-1">
                  Hard
                </div>
                <Input
                  type="number"
                  min={0}
                  max={questionCount}
                  value={hardCount}
                  onChange={(e) => setHardCount(Number(e.target.value))}
                />
              </div>
            </div>
            {countsTotal !== questionCount ? (
              <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                Easy + Medium + Hard must equal {questionCount}. Currently{" "}
                {countsTotal}.
              </div>
            ) : null}
          </div>

          <div>
            <div className="text-[11px] font-black tracking-widest uppercase arena-text-outline mb-2">
              Apps
            </div>
            <div className="flex flex-wrap gap-4">
                {availableApps.map((app) => {
                  const key = String(app || "");
                  const slug = key.toLowerCase();
                  const checked = selectedApps.includes(slug);
                  return (
                  <label
                    key={key}
                    className="flex items-center gap-2 text-sm arena-text-on-surface"
                  >
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const nextChecked = e.target.checked;
                          setSelectedApps((prev) => {
                            const prevNorm = prev
                              .map((a) => String(a || "").toLowerCase())
                              .filter(Boolean);
                            const set = new Set(prevNorm);
                            if (nextChecked) set.add(slug);
                            else set.delete(slug);
                            return Array.from(set);
                          });
                        }}
                      />
                      {key}
                    </label>
                  );
                })}
              </div>
            {appsTotal === 0 ? (
              <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                Select at least one app.
              </div>
            ) : null}
          </div>

          <label className="flex items-center gap-2 text-sm arena-text-on-surface">
            <input
              type="checkbox"
              checked={uniqueApps}
              onChange={(e) => setUniqueApps(e.target.checked)}
            />
            Spread questions across apps (best effort)
          </label>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-xl px-4 py-2 text-[13px] font-extrabold uppercase tracking-wide",
                "bg-[var(--arena-surface-container-lowest)] border arena-border-divider",
                "hover:bg-[var(--arena-surface-container-low)] transition-colors",
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStart}
              disabled={disabled || !customValid || startPending}
              className={cn(
                "rounded-xl px-5 py-2.5 text-[13px] font-black uppercase tracking-wide",
                "text-white shadow-sm transition-transform active:scale-[0.98]",
                "bg-gradient-to-r from-[var(--arena-primary-solid)] to-[var(--arena-primary)]",
                "disabled:opacity-60 disabled:active:scale-100 disabled:pointer-events-none",
              )}
            >
              Start interview
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
