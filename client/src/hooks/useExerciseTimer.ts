import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  computeElapsedMs,
  defaultTimerState,
  hydrateTimerState,
  serializeTimerState,
  STOP_REASON,
  PAUSE_REASON,
  TIMER_STATUS,
  timerReducer,
} from "@/utils/exerciseTimerMachine";

const safeParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const formatElapsed = (ms) => {
  const total = Math.floor(Math.max(0, ms) / 1000);
  const s = total % 60;
  const m = Math.floor(total / 60) % 60;
  const h = Math.floor(total / 3600);

  const pad2 = (n) => String(n).padStart(2, "0");
  if (h > 0) return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  return `${pad2(m)}:${pad2(s)}`;
};

const readFromStorage = (storageKey, now, inactivityMs) => {
  if (!storageKey) return defaultTimerState(inactivityMs);
  const raw = safeParse(localStorage.getItem(storageKey));
  const hydrated = hydrateTimerState(raw, now);
  return hydrated || defaultTimerState(inactivityMs);
};

const writeToStorage = (storageKey, state) => {
  if (!storageKey) return;
  localStorage.setItem(storageKey, JSON.stringify(serializeTimerState(state)));
};

export const useExerciseTimer = ({
  storageKey,
  inactivityMs = 90_000,
}: {
  storageKey?: string;
  inactivityMs?: number;
} = {}) => {
  const [now, setNow] = useState(() => Date.now());

  const [state, dispatch] = useReducer(
    timerReducer,
    null,
    () => readFromStorage(storageKey, Date.now(), inactivityMs),
  );

  // Keep refs for synchronous stop/persist on leave events.
  const stateRef = useRef(state);
  const keyRef = useRef(storageKey);
  useEffect(() => {
    stateRef.current = state;
    keyRef.current = storageKey;
  }, [state, storageKey]);

  // Re-hydrate when storageKey changes (question/user change).
  useEffect(() => {
    const next = readFromStorage(storageKey, Date.now(), inactivityMs);
    dispatch({ type: "RESET_FROM_STORAGE", state: next, at: Date.now() });
  }, [storageKey, inactivityMs]);

  // Tick UI every second while running.
  useEffect(() => {
    if (state.status !== TIMER_STATUS.RUNNING) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [state.status]);

  // Persist on every meaningful state change.
  useEffect(() => {
    writeToStorage(storageKey, state);
  }, [storageKey, state]);

  // Inactivity auto-pause: schedule a timeout based on lastActivityAt.
  useEffect(() => {
    if (state.status !== TIMER_STATUS.RUNNING) return;
    if (!state.lastActivityAt) return;

    const deadline = state.lastActivityAt + state.inactivityMs;
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      dispatch({ type: "PAUSE", at: deadline, reason: PAUSE_REASON.INACTIVITY });
      return;
    }

    const id = window.setTimeout(() => {
      dispatch({
        type: "PAUSE",
        at: deadline,
        reason: PAUSE_REASON.INACTIVITY,
      });
    }, remaining);

    return () => window.clearTimeout(id);
  }, [state.status, state.lastActivityAt, state.inactivityMs]);

  const elapsedMs = useMemo(() => computeElapsedMs(state, now), [state, now]);
  const formatted = useMemo(() => formatElapsed(elapsedMs), [elapsedMs]);

  const dispatchNow = (action) => {
    const at = Date.now();
    // Update `now` immediately so the UI reflects the action without waiting
    // for the next 1s tick (fixes "timer feels behind" after pause/resume).
    setNow(at);
    dispatch({ ...action, at });
  };

  const start = () => dispatchNow({ type: "START" });
  const recordActivity = () => dispatchNow({ type: "ACTIVITY" });
  const pause = () => dispatchNow({ type: "PAUSE", reason: PAUSE_REASON.MANUAL });
  const resume = () => dispatchNow({ type: "RESUME" });
  const stop = (reason = STOP_REASON.MANUAL) => dispatchNow({ type: "STOP", reason });
  const reset = () => dispatchNow({ type: "RESET" });

  // Synchronous stop+persistence for "leave page" events.
  const stopAndPersistSync = (reason = STOP_REASON.LEAVE, at = Date.now()) => {
    const current = stateRef.current;
    const key = keyRef.current;
    if (!key) return;

    // If the timer never started, don't persist a terminal "stopped" attempt.
    // This avoids surprising UX (and React dev StrictMode mount/unmount cycles).
    if (
      current.status === TIMER_STATUS.IDLE &&
      !current.startedAt &&
      (!current.totalElapsedMs || current.totalElapsedMs === 0)
    ) {
      return;
    }

    // Terminal + idempotent.
    const next =
      current.status === TIMER_STATUS.STOPPED
        ? current
        : timerReducer(current, { type: "STOP", at, reason });

    writeToStorage(key, next);
  };

  // Auto-stop on actual page leave (refresh/tab close) + component unmount (route change).
  useEffect(() => {
    const onBeforeUnload = () => stopAndPersistSync(STOP_REASON.LEAVE);
    const onPageHide = () => stopAndPersistSync(STOP_REASON.LEAVE);

    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
      stopAndPersistSync(STOP_REASON.LEAVE);
    };
  }, []);

  return {
    status: state.status,
    pauseReason: state.pauseReason,
    stopReason: state.stopReason,
    elapsedMs,
    formatted,
    inactivityMs: state.inactivityMs,
    startedAt: state.startedAt,
    pausesCount: state.pausesCount,
    autoPausesCount: state.autoPausesCount,
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
