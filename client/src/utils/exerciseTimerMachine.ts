// Exercise timer finite state machine.
//
// States:
// - idle:    not started yet (default on page open)
// - running: counting elapsed time
// - paused:  not counting elapsed time
// - stopped: terminal for this attempt; cannot restart automatically
//
// Transitions (high-level):
// - idle -> running            on START / ACTIVITY (first meaningful action)
// - running -> paused          on PAUSE (manual) or PAUSE (inactivity)
// - paused -> running          on RESUME (manual)
// - running/paused/idle -> stopped  on STOP (manual/solved/leave)

export const TIMER_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
  STOPPED: "stopped",
};

export const STOP_REASON = {
  MANUAL: "manual",
  SOLVED: "solved",
  LEAVE: "leave",
};

export const PAUSE_REASON = {
  MANUAL: "manual",
  INACTIVITY: "inactivity",
};

export const defaultTimerState = (inactivityMs = 90_000) => ({
  status: TIMER_STATUS.IDLE,
  inactivityMs,

  startedAt: null,
  lastResumedAt: null,
  pausedAt: null,
  stoppedAt: null,

  totalElapsedMs: 0, // excludes the active running segment
  lastActivityAt: null,

  pauseReason: null,
  stopReason: null,

  pausesCount: 0,
  autoPausesCount: 0,
});

const clampNonNeg = (n) => (Number.isFinite(n) && n > 0 ? n : 0);

export const computeElapsedMs = (state, now) => {
  if (!state) return 0;
  if (state.status === TIMER_STATUS.RUNNING && state.lastResumedAt) {
    return clampNonNeg(state.totalElapsedMs + (now - state.lastResumedAt));
  }
  return clampNonNeg(state.totalElapsedMs);
};

const safeNumber = (v) => (Number.isFinite(Number(v)) ? Number(v) : null);

export const hydrateTimerState = (raw, now) => {
  if (!raw || typeof raw !== "object") return null;
  const inactivityMs =
    Number.isFinite(Number(raw.inactivityMs)) && Number(raw.inactivityMs) > 0
      ? Number(raw.inactivityMs)
      : 90_000;

  const s = {
    ...defaultTimerState(inactivityMs),
    status:
      raw.status && Object.values(TIMER_STATUS).includes(raw.status)
        ? raw.status
        : TIMER_STATUS.IDLE,
    startedAt: safeNumber(raw.startedAt),
    lastResumedAt: safeNumber(raw.lastResumedAt),
    pausedAt: safeNumber(raw.pausedAt),
    stoppedAt: safeNumber(raw.stoppedAt),
    totalElapsedMs: clampNonNeg(Number(raw.totalElapsedMs || 0)),
    lastActivityAt: safeNumber(raw.lastActivityAt),
    pauseReason: raw.pauseReason || null,
    stopReason: raw.stopReason || null,
    pausesCount: clampNonNeg(Number(raw.pausesCount || 0)),
    autoPausesCount: clampNonNeg(Number(raw.autoPausesCount || 0)),
  };

  // If it was "running" but we've been inactive past the threshold,
  // reconstruct as an automatic pause at (lastActivityAt + inactivityMs) so we
  // don't over-count inactive time after the auto-pause boundary.
  if (
    s.status === TIMER_STATUS.RUNNING &&
    s.lastResumedAt &&
    s.lastActivityAt &&
    now - s.lastActivityAt >= inactivityMs
  ) {
    const pausedAt = s.lastActivityAt + inactivityMs;
    const delta = clampNonNeg(pausedAt - s.lastResumedAt);
    return {
      ...s,
      status: TIMER_STATUS.PAUSED,
      pausedAt,
      lastResumedAt: null,
      totalElapsedMs: clampNonNeg(s.totalElapsedMs + delta),
      pauseReason: PAUSE_REASON.INACTIVITY,
      pausesCount: s.pausesCount + 1,
      autoPausesCount: s.autoPausesCount + 1,
    };
  }

  return s;
};

export const timerReducer = (state, action) => {
  const at = Number.isFinite(Number(action?.at)) ? Number(action.at) : Date.now();

  switch (action?.type) {
    case "RESET": {
      // Explicitly start a new attempt for this exercise.
      // After reset, the timer returns to idle and can be auto-started again by activity.
      return defaultTimerState(state?.inactivityMs || 90_000);
    }

    case "RESET_FROM_STORAGE": {
      return action.state || state;
    }

    case "START": {
      if (state.status !== TIMER_STATUS.IDLE) return state;
      return {
        ...state,
        status: TIMER_STATUS.RUNNING,
        startedAt: at,
        lastResumedAt: at,
        lastActivityAt: at,
        pausedAt: null,
        stoppedAt: null,
        pauseReason: null,
        stopReason: null,
      };
    }

    case "ACTIVITY": {
      if (state.status === TIMER_STATUS.STOPPED) return state;
      if (state.status === TIMER_STATUS.IDLE) {
        // First meaningful action: start automatically.
        return timerReducer(state, { type: "START", at });
      }
      if (state.status === TIMER_STATUS.RUNNING) {
        return { ...state, lastActivityAt: at };
      }
      // While paused, activity does not auto-resume. Manual RESUME is required.
      return state;
    }

    case "PAUSE": {
      if (state.status !== TIMER_STATUS.RUNNING) return state;
      const delta = clampNonNeg(at - (state.lastResumedAt || at));
      const reason = action.reason || PAUSE_REASON.MANUAL;
      return {
        ...state,
        status: TIMER_STATUS.PAUSED,
        totalElapsedMs: clampNonNeg(state.totalElapsedMs + delta),
        pausedAt: at,
        lastResumedAt: null,
        pauseReason: reason,
        pausesCount: state.pausesCount + 1,
        autoPausesCount:
          reason === PAUSE_REASON.INACTIVITY
            ? state.autoPausesCount + 1
            : state.autoPausesCount,
      };
    }

    case "RESUME": {
      if (state.status !== TIMER_STATUS.PAUSED) return state;
      return {
        ...state,
        status: TIMER_STATUS.RUNNING,
        lastResumedAt: at,
        pausedAt: null,
        pauseReason: null,
        lastActivityAt: at,
      };
    }

    case "STOP": {
      if (state.status === TIMER_STATUS.STOPPED) return state;
      const reason = action.reason || STOP_REASON.MANUAL;

      if (state.status === TIMER_STATUS.RUNNING) {
        const delta = clampNonNeg(at - (state.lastResumedAt || at));
        return {
          ...state,
          status: TIMER_STATUS.STOPPED,
          totalElapsedMs: clampNonNeg(state.totalElapsedMs + delta),
          lastResumedAt: null,
          pausedAt: null,
          stoppedAt: at,
          stopReason: reason,
          pauseReason: null,
        };
      }

      // paused or idle -> stopped (no further time added)
      return {
        ...state,
        status: TIMER_STATUS.STOPPED,
        lastResumedAt: null,
        pausedAt: null,
        stoppedAt: at,
        stopReason: reason,
        pauseReason: null,
      };
    }

    default:
      return state;
  }
};

export const serializeTimerState = (state) => ({
  status: state.status,
  inactivityMs: state.inactivityMs,
  startedAt: state.startedAt,
  lastResumedAt: state.lastResumedAt,
  pausedAt: state.pausedAt,
  stoppedAt: state.stoppedAt,
  totalElapsedMs: state.totalElapsedMs,
  lastActivityAt: state.lastActivityAt,
  pauseReason: state.pauseReason,
  stopReason: state.stopReason,
  pausesCount: state.pausesCount,
  autoPausesCount: state.autoPausesCount,
});
