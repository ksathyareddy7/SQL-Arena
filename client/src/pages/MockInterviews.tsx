import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HelpCircle, ListChecks, Timer } from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  useActiveMockInterviewQuery,
  useMockInterviewTemplatesQuery,
  useStartCustomMockInterviewMutation,
  useStartMockInterviewMutation,
} from "@/queries/mockInterviews";
import { useAppOptions } from "@/hooks/useAppOptions";
import { cn } from "@/lib/utils";
import { MOCK_INTERVIEW_STRINGS } from "@/strings/mockInterview";
import CustomMockInterviewDialog from "@/components/mock-interview/CustomMockInterviewDialog";

function TemplatePill({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="px-3 py-1.5 bg-[var(--arena-surface-container-high)] text-[var(--arena-outline)] text-[11px] font-extrabold tracking-wider uppercase rounded-full flex items-center gap-2">
      <span className="text-[var(--arena-outline)]">{icon}</span>
      {children}
    </div>
  );
}

export default function MockInterviews() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const templatesQuery = useMockInterviewTemplatesQuery(user?.id);
  const activeQuery = useActiveMockInterviewQuery(user?.id);
  const startMutation = useStartMockInterviewMutation(user?.id);
  const startCustomMutation = useStartCustomMockInterviewMutation(user?.id);
  const { apps: availableApps } = useAppOptions(user?.id);

  const templates = Array.isArray(templatesQuery.data)
    ? templatesQuery.data
    : [];
  const active = activeQuery.data;

  const recommended = useMemo(
    () =>
      templates.find((t) => t.id === "screening-20") || templates[0] || null,
    [templates],
  );

  const handleStart = async (templateId: string) => {
    try {
      const data = await startMutation.mutateAsync(templateId);
      navigate(`/mock-interviews/sessions/${data.sessionId}`);
    } catch (err: any) {
      toast.error("Failed to start interview", {
        description:
          err?.response?.data?.error || err?.message || "Unknown error",
      });
    }
  };

  const [customOpen, setCustomOpen] = useState(false);
  const handleStartCustom = async (template: any) => {
    try {
      const data = await startCustomMutation.mutateAsync(template);
      setCustomOpen(false);
      navigate(`/mock-interviews/sessions/${data.sessionId}`);
    } catch (err: any) {
      toast.error("Failed to start custom interview", {
        description:
          err?.response?.data?.error || err?.message || "Unknown error",
      });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 pt-12 pb-20">
      <div className="mb-14">
        <h1 className="text-[64px] leading-[1.05] font-black tracking-tight">
          {MOCK_INTERVIEW_STRINGS.title}
        </h1>

        <p className="max-w-[640px] text-[18px] leading-relaxed text-[var(--arena-outline)]">
          Strict sessions generated from the question bank. Solutions and AI
          prompts stay locked until the end.
        </p>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="mt-6" data-tour="mock.resume">
            {active ? (
              <button
                type="button"
                onClick={() =>
                  navigate(`/mock-interviews/sessions/${active.id}`)
                }
                className={cn(
                  "rounded-xl px-5 py-3.5",
                  "inline-flex items-center justify-center",
                  "text-white shadow-sm transition-transform active:scale-[0.98]",
                  "text-[13px] font-extrabold tracking-wide uppercase",
                  "bg-gradient-to-r from-[var(--arena-primary-solid)] to-[var(--arena-primary)]",
                )}
              >
                Resume active session
              </button>
            ) : null}
          </div>
          <button
            type="button"
            data-tour="mock.history"
            onClick={() => navigate("/mock-interviews/history")}
            className={cn(
              "inline-flex items-center justify-center rounded-xl px-5 py-3",
              "bg-[var(--arena-surface-container-lowest)] border arena-border-divider",
              "dark:bg-[var(--arena-surface-container-high)] dark:border-[color:rgb(255_255_255/0.12)]",
              "text-[13px] font-extrabold tracking-wide uppercase",
              "text-[var(--arena-primary-solid)] dark:text-[var(--arena-nav-active)]",
              "hover:bg-[var(--arena-surface-container-low)] dark:hover:bg-[var(--arena-surface-container-highest)] transition-colors",
            )}
          >
            View history
          </button>
        </div>
      </div>

      {templatesQuery.isLoading ? (
        <div className="text-sm text-[var(--arena-outline)]">
          Loading templates…
        </div>
      ) : templates.length === 0 ? (
        <div className="text-sm text-[var(--arena-outline)]">
          No templates available.
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          data-tour="mock.templates"
        >
          {templates.map((t) => {
            const isRecommended = recommended?.id === t.id;

            return (
              <div
                key={t.id}
                className={cn(
                  "bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem] p-8 flex flex-col h-full",
                  "transition-colors duration-300",
                )}
              >
                <div className="mb-4">
                  {isRecommended ? (
                    <span
                      className={cn(
                        "inline-flex items-center px-4 py-1 rounded-full",
                        "text-[11px] font-black tracking-widest uppercase mb-6",
                        "bg-[var(--arena-tertiary-fixed)] text-[var(--arena-tertiary)]",
                        "dark:bg-[color:rgb(46_229_159/0.18)] dark:text-[color:rgb(219_255_238/0.95)]",
                        "dark:border dark:border-[color:rgb(46_229_159/0.35)]",
                      )}
                    >
                      Recommended
                    </span>
                  ) : (
                    <div className="h-[28px] mb-6" />
                  )}

                  <h3 className="text-2xl font-extrabold tracking-tight text-[var(--arena-on-surface)] mb-4">
                    {t.title}
                  </h3>
                  <p className="text-[var(--arena-outline)] text-sm leading-relaxed mb-8">
                    {t.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2 mb-8">
                    <TemplatePill
                      icon={<Timer className="w-[14px] h-[14px]" />}
                    >
                      {t.duration_minutes} min
                    </TemplatePill>
                    <TemplatePill
                      icon={<ListChecks className="w-[14px] h-[14px]" />}
                    >
                      {t.question_count} questions
                    </TemplatePill>
                    <TemplatePill
                      icon={<HelpCircle className="w-[14px] h-[14px]" />}
                    >
                      Hints: -{t.hint_penalty_per_reveal} each
                    </TemplatePill>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStart(t.id)}
                    disabled={startMutation.isPending || !!active}
                    data-tour={isRecommended ? "mock.start" : undefined}
                    className={cn(
                      "w-full py-4 rounded-xl font-black text-sm tracking-wide uppercase",
                      "text-white shadow-sm transition-transform active:scale-[0.98]",
                      "bg-gradient-to-r from-[var(--arena-primary-solid)] to-[var(--arena-primary)]",
                      "disabled:opacity-70 disabled:active:scale-100 disabled:pointer-events-none",
                    )}
                  >
                    {MOCK_INTERVIEW_STRINGS.start}
                  </button>
                </div>
              </div>
            );
          })}

          <div
            className={cn(
              "bg-[var(--arena-surface-container-lowest)] rounded-[1.5rem] p-8 flex flex-col h-full",
              "border border-dashed arena-border-divider",
            )}
          >
            <div className="mb-4">
              <div className="h-[28px] mb-6" />
              <h3 className="text-2xl font-extrabold tracking-tight text-[var(--arena-on-surface)] mb-4">
                Custom interview
              </h3>
              <p className="text-[var(--arena-outline)] text-sm leading-relaxed mb-8">
                Choose question count, difficulty mix, time, and hint penalty.
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <button
                type="button"
                onClick={() => setCustomOpen(true)}
                disabled={!!active}
                className={cn(
                  "w-full py-4 rounded-xl font-black text-sm tracking-wide uppercase",
                  "text-white shadow-sm transition-transform active:scale-[0.98]",
                  "bg-gradient-to-r from-[var(--arena-primary-solid)] to-[var(--arena-primary)]",
                  "disabled:opacity-70 disabled:active:scale-100 disabled:pointer-events-none",
                )}
              >
                Create custom
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomMockInterviewDialog
        open={customOpen}
        onOpenChange={setCustomOpen}
        disabled={!!active}
        availableApps={availableApps}
        startPending={startCustomMutation.isPending}
        onStartTemplate={handleStartCustom}
      />
    </div>
  );
}
