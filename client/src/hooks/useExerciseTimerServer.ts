import { useEffect, useMemo, useRef, useState } from "react";
import { apiClient, withUser } from "@/api/client";
import {
  PAUSE_REASON,
  STOP_REASON,
  TIMER_STATUS,
} from "@/utils/exerciseTimerMachine";

const clampNonNeg = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

const formatElapsed = (ms: number) => {
  const total = Math.floor(Math.max(0, ms) / 1000);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);

  const pad2 = (n: number) => String(n).padStart(2, "0");
  if (h > 0) return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  return `${pad2(m)}:${pad2(s)}`;
};

type ServerTimerState = {
  status: string;
  started_at: string | null;
  last_started_at: string | null;
  accumulated_ms: number;
  pause_reason: string | null;
  stop_reason: string | null;
  updated_at: string | null;
};

const defaultState = (): ServerTimerState => ({
  status: TIMER_STATUS.IDLE,
  started_at: null,
  last_started_at: null,
  accumulated_ms: 0,
  pause_reason: null,
  stop_reason: null,
  updated_at: null,
});

const parseMs = (iso: string | null) => {
  if (!iso) return null;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? null : ms;
};

const computeElapsedMs = (state: ServerTimerState, nowMs: number, serverOffsetMs: number) => {
  const base = clampNonNeg(Number(state.accumulated_ms || 0));
  if (state.status === TIMER_STATUS.RUNNING) {
    const last = parseMs(state.last_started_at);
    if (last != null) {
      const serverNow = nowMs + serverOffsetMs;
      return clampNonNeg(base + (serverNow - last));
    }
  }
  return base;
};

export const useExerciseTimerServer = ({
  userId,
  questionId,
  inactivityMs = 90_000,
}: {
  userId?: number;
  questionId?: string | number;
  inactivityMs?: number;
}) => {
  const [serverOffsetMs, setServerOffsetMs] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [state, setState] = useState<ServerTimerState>(() => defaultState());
  const [lastActivityAt, setLastActivityAt] = useState<number | null>(null);

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const canUse = !!userId && !!questionId;

  const fetchState = async () => {
    if (!canUse) return;
    const res = await apiClient.get(`/api/exercises/${questionId}/timer`, withUser(userId));
    const serverNowIso = res.data?.serverNow;
    const serverNowMs = Date.parse(serverNowIso);
    if (!Number.isNaN(serverNowMs)) {
      setServerOffsetMs(serverNowMs - Date.now());
    }
    setState(res.data?.state || defaultState());
  };

  useEffect(() => {
    setState(defaultState());
    setLastActivityAt(null);
    setServerOffsetMs(0);
    if (!canUse) return;
    fetchState().catch(() => {
      // ignore; timer is UX-only
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, questionId]);

  // Tick UI every second while running.
  useEffect(() => {
    if (state.status !== TIMER_STATUS.RUNNING) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [state.status]);

  // Inactivity pause scheduler (client-only tracking, server pause on fire).
  useEffect(() => {
    if (state.status !== TIMER_STATUS.RUNNING) return;
    if (!lastActivityAt) return;

    const deadline = lastActivityAt + inactivityMs;
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      pause(PAUSE_REASON.INACTIVITY);
      return;
    }

    const id = window.setTimeout(() => {
      pause(PAUSE_REASON.INACTIVITY);
    }, remaining);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, lastActivityAt, inactivityMs]);

  const elapsedMs = useMemo(
    () => computeElapsedMs(state, now, serverOffsetMs),
    [state, now, serverOffsetMs],
  );
  const formatted = useMemo(() => formatElapsed(elapsedMs), [elapsedMs]);

  const post = async (path: string, body?: any) => {
    if (!canUse) return null;
    const res = await apiClient.post(
      `/api/exercises/${questionId}/timer/${path}`,
      body || {},
      withUser(userId),
    );
    const next = res.data?.state;
    if (next) setState(next);
    const serverNowIso = res.data?.serverNow;
    const serverNowMs = Date.parse(serverNowIso);
    if (!Number.isNaN(serverNowMs)) {
      setServerOffsetMs(serverNowMs - Date.now());
    }
    return res.data;
  };

  const start = async () => {
    setNow(Date.now());
    setLastActivityAt(Date.now());
    try {
      await post("start");
    } catch {
      // ignore; UX-only
    }
  };

  const recordActivity = () => {
    if (stateRef.current.status === TIMER_STATUS.STOPPED) return;
    const at = Date.now();
    setNow(at);
    setLastActivityAt(at);
    // no POST (action-based sync)
  };

  const pause = async (reason = PAUSE_REASON.MANUAL) => {
    setNow(Date.now());
    try {
      await post("pause", { reason });
    } catch {
      // ignore; UX-only
    }
  };

  const resume = async () => {
    setNow(Date.now());
    setLastActivityAt(Date.now());
    try {
      await post("resume");
    } catch {
      // ignore; UX-only
    }
  };

  const stop = async (reason = STOP_REASON.MANUAL) => {
    setNow(Date.now());
    try {
      await post("stop", { reason });
    } catch {
      // ignore; UX-only
    }
  };

  const reset = async () => {
    setNow(Date.now());
    setLastActivityAt(null);
    try {
      await post("reset");
    } catch {
      // ignore; UX-only
    }
  };

  // Auto-pause on actual page leave (refresh/tab close) + component unmount (route change).
  useEffect(() => {
    if (!canUse) return;

    const keepalivePause = () => {
      const current = stateRef.current;
      if (current.status !== TIMER_STATUS.RUNNING) return;
      try {
        fetch(`${apiClient.defaults.baseURL}/api/exercises/${questionId}/timer/pause`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": String(userId),
          },
          body: JSON.stringify({ reason: "leave" }),
          keepalive: true,
        });
      } catch {
        // ignore
      }
    };

    const onBeforeUnload = () => keepalivePause();
    const onPageHide = () => keepalivePause();

    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
      keepalivePause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canUse, questionId, userId]);

  return {
    status: state.status,
    pauseReason: state.pause_reason,
    stopReason: state.stop_reason,
    elapsedMs,
    formatted,
    inactivityMs,
    startedAt: state.started_at,
    pausesCount: null,
    autoPausesCount: null,
    actions: {
      start,
      recordActivity,
      pause,
      resume,
      stop,
      reset,
    },
  };
};
