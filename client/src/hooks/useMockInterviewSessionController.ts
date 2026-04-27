import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useUnlockedBadgesDialog } from "@/contexts/BadgesUnlockedDialogContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatSql } from "@/utils/sql";
import { fireSuccessConfetti } from "@/utils/confetti";
import {
  useEndMockInterviewMutation,
  useExecuteMockInterviewQueryMutation,
  useMockInterviewQuestionQuery,
  useMockInterviewSessionQuery,
  useMockInterviewSummaryQuery,
  useNavigateMockInterviewMutation,
  useRevealMockInterviewHintMutation,
  useSubmitMockInterviewAnswerMutation,
} from "@/queries/mockInterviews";

import type { ActionOutcome, View } from "@/types/mockInterview";

export function useMockInterviewSessionController() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showUnlockedBadges } = useUnlockedBadgesDialog();

  const sessionQuery = useMockInterviewSessionQuery(sessionId, user?.id);
  const session = sessionQuery.data;
  const index =
    typeof session?.current_question_index === "number"
      ? session.current_question_index
      : 0;

  const questionQuery = useMockInterviewQuestionQuery(
    sessionId,
    index,
    user?.id,
  );
  const questionData = questionQuery.data;
  const exercise = questionData?.exercise;
  const sessionQuestion = questionData?.session_question;
  const hints = Array.isArray(questionData?.hints) ? questionData.hints : [];

  const summaryQuery = useMockInterviewSummaryQuery(sessionId, user?.id);
  const summary = summaryQuery.data;
  const sessionQuestions = Array.isArray(summary?.questions)
    ? summary.questions
    : [];

  const navigateMutation = useNavigateMockInterviewMutation(
    sessionId as string,
    user?.id,
  );
  const revealHintMutation = useRevealMockInterviewHintMutation(
    sessionId as string,
    index,
    user?.id,
  );
  const executeMutation = useExecuteMockInterviewQueryMutation(
    sessionId as string,
    index,
    user?.id,
  );
  const submitMutation = useSubmitMockInterviewAnswerMutation(
    sessionId as string,
    index,
    user?.id,
  );
  const endMutation = useEndMockInterviewMutation(
    sessionId as string,
    user?.id,
  );

  const [view, setView] = useState<View>("question");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>({
    rows: null,
    fields: null,
    error: null,
  });
  const [now, setNow] = useState(() => Date.now());
  const [outcome, setOutcome] = useState<ActionOutcome>(null);

  const hasInitDraft = useRef(false);
  const lastNavRef = useRef<{ idx: number; ts: number } | null>(null);
  const timeEndHandledRef = useRef(false);
  const clockOffsetMsRef = useRef(0);
  const countdownDeadlineMsRef = useRef<number | null>(null);

  const template = session?.template_snapshot || {};
  const penaltyPer = Math.max(0, Number(template?.hint_penalty_per_reveal || 0));
  const qCount = Number(session?.question_count || 0);
  const canPrev = index > 0;
  const canNext = qCount > 0 ? index < qCount - 1 : false;
  const sessionEnded = session && session.status !== "in_progress";

  const endsAt = session?.ends_at ?? null;
  const serverNowStr = (session as any)?.server_now ?? null;

  useEffect(() => {
    if (!serverNowStr) return;
    const serverNowMs = Date.parse(String(serverNowStr));
    if (Number.isNaN(serverNowMs)) return;
    clockOffsetMsRef.current = serverNowMs - Date.now();
  }, [serverNowStr]);

  useEffect(() => {
    const rem = (session as any)?.remaining_seconds;
    if (typeof rem !== "number") return;
    countdownDeadlineMsRef.current = Date.now() + Math.max(0, rem) * 1000;
  }, [(session as any)?.remaining_seconds]);

  const remaining =
    typeof (session as any)?.remaining_seconds === "number"
      ? (() => {
          const deadlineMs = countdownDeadlineMsRef.current;
          if (typeof deadlineMs === "number") {
            return Math.max(0, Math.floor((deadlineMs - now) / 1000));
          }
          return Math.max(0, Math.floor((session as any).remaining_seconds));
        })()
      : (() => {
          if (!endsAt) return 0;
          const ms = Date.parse(endsAt);
          if (Number.isNaN(ms)) return 0;
          const effectiveNowMs = now + clockOffsetMsRef.current;
          return Math.max(0, Math.floor((ms - effectiveNowMs) / 1000));
        })();

  const shouldTick = session?.status === "in_progress";
  useEffect(() => {
    if (!shouldTick) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [shouldTick]);

  useEffect(() => {
    if (!session) return;
    if (session.status === "in_progress") return;
    navigate(`/mock-interviews/sessions/${session.id}/summary`, { replace: true });
  }, [session?.status, session?.id, navigate]);

  useEffect(() => {
    hasInitDraft.current = false;
    setQuery("");
    setResult({ rows: null, fields: null, error: null });
    setOutcome(null);
  }, [index, sessionId]);

  useEffect(() => {
    if (hasInitDraft.current) return;
    if (!sessionQuestion) return;
    if (typeof sessionQuestion.last_query !== "string") return;
    if (!sessionQuestion.last_query) return;
    setQuery(sessionQuestion.last_query);
    hasInitDraft.current = true;
  }, [sessionQuestion?.last_query, sessionQuestion]);

  useEffect(() => {
    if (!session || session.status !== "in_progress") return;
    if (remaining > 0) {
      timeEndHandledRef.current = false;
      return;
    }
    if (timeEndHandledRef.current) return;
    timeEndHandledRef.current = true;
    sessionQuery.refetch();
  }, [session?.id, session?.status, session?.ends_at, remaining, now, sessionQuery]);

  const title = template?.title ? String(template.title) : "Mock Interview";

  const goTo = (nextIndex: number) => {
    if (navigateMutation.isPending) return;
    if (nextIndex === index) return;
    if (sessionEnded) return;
    const nowMs = Date.now();
    const last = lastNavRef.current;
    if (last && last.idx === nextIndex && nowMs - last.ts < 800) return;
    lastNavRef.current = { idx: nextIndex, ts: nowMs };
    navigateMutation.mutate(nextIndex);
  };

  const onPrev = () => {
    if (!canPrev) return;
    goTo(index - 1);
  };
  const onNext = () => {
    if (!canNext) return;
    goTo(index + 1);
  };

  const onRun = async () => {
    if (sessionEnded) return;
    if (!query.trim()) return;
    try {
      const data = await executeMutation.mutateAsync(query);
      setResult({ rows: data.rows, fields: data.fields, error: null });
      setOutcome({
        kind: "run",
        ok: !!data?.isCorrect,
        label: data?.isCorrect ? "Success 🚀" : "Failed 💥",
        detail: data?.reason,
        ts: Date.now(),
      });
      if (data?.isCorrect) {
        toast.success("Correct!", { description: "Query executed successfully." });
      } else {
        toast.error("Incorrect", { description: "Try again." });
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || "Unknown error";
      setResult({ rows: null, fields: null, error: msg });
      setOutcome({
        kind: "run",
        ok: false,
        label: "Failed 💥",
        detail: msg,
        ts: Date.now(),
      });
      toast.error("Query failed", { description: msg });
    }
  };

  const onSubmit = async () => {
    if (sessionEnded) return;
    if (!query.trim()) return;
    try {
      const data = await submitMutation.mutateAsync(query);
      setResult({ rows: data.rows, fields: data.fields, error: null });
      setOutcome({
        kind: "submit",
        ok: !!data?.isCorrect,
        label: data?.isCorrect ? "Success 🚀" : "Failed 💥",
        detail: data?.reason,
        ts: Date.now(),
      });
      if (data?.isCorrect) {
        fireSuccessConfetti();
        toast.success("Correct!", { description: `Score: ${data.score}` });
        if (Array.isArray((data as any)?.newBadges)) {
          showUnlockedBadges((data as any).newBadges);
        }
      } else {
        toast.error("Incorrect", { description: "Try again." });
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || "Unknown error";
      setOutcome({
        kind: "submit",
        ok: false,
        label: "Failed 💥",
        detail: msg,
        ts: Date.now(),
      });
      toast.error("Submit failed", { description: msg });
    }
  };

  const onFormat = () => {
    if (!query.trim()) return;
    try {
      setQuery(formatSql(query));
    } catch (e: any) {
      console.warn("Failed to format SQL:", e?.message || e);
    }
  };

  const onRevealNextHint = async () => {
    if (sessionEnded) return;
    const next = hints.find((h: any) => !h.revealed);
    if (!next) return;
    try {
      await revealHintMutation.mutateAsync(Number(next.id));
    } catch (err: any) {
      toast.error("Failed to reveal hint", {
        description: err?.response?.data?.error || err?.message || "Unknown error",
      });
    }
  };

  const onEnd = async () => {
    try {
      const res: any = await endMutation.mutateAsync("completed");
      if (Array.isArray(res?.newBadges)) {
        showUnlockedBadges(res.newBadges);
      }
      navigate(`/mock-interviews/sessions/${sessionId}/summary`);
    } catch (err: any) {
      toast.error("Failed to end interview", {
        description: err?.response?.data?.error || err?.message || "Unknown error",
      });
    }
  };

  const loading = sessionQuery.isLoading || questionQuery.isLoading;

  return {
    sessionId,
    userId: user?.id,
    session,
    index,
    view,
    setView,
    query,
    setQuery,
    result,
    outcome,
    remaining,
    title,
    template,
    exercise,
    hints,
    penaltyPer,
    sessionQuestions,
    canPrev,
    canNext,
    sessionEnded,
    loading,
    navigatePending: navigateMutation.isPending,
    executePending: executeMutation.isPending,
    submitPending: submitMutation.isPending,
    revealHintPending: revealHintMutation.isPending,
    goTo,
    onPrev,
    onNext,
    onRun,
    onSubmit,
    onFormat,
    onRevealNextHint,
    onEnd,
    onBackToTemplates: () => navigate("/mock-interviews"),
  };
}
