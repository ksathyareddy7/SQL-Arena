import { describe, it, expect } from "vitest";
import {
  defaultTimerState,
  hydrateTimerState,
  PAUSE_REASON,
  STOP_REASON,
  TIMER_STATUS,
  timerReducer,
} from "@/utils/exerciseTimerMachine";

describe("exerciseTimerMachine", () => {
  it("idle -> running on ACTIVITY (auto-start)", () => {
    const s0 = defaultTimerState(90_000);
    const at = 1_000;
    const s1 = timerReducer(s0, { type: "ACTIVITY", at });
    expect(s1.status).toBe(TIMER_STATUS.RUNNING);
    expect(s1.startedAt).toBe(at);
    expect(s1.lastResumedAt).toBe(at);
    expect(s1.lastActivityAt).toBe(at);
  });

  it("running -> paused on manual PAUSE adds elapsed", () => {
    const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
    const s1 = timerReducer(s0, {
      type: "PAUSE",
      at: 4_500,
      reason: PAUSE_REASON.MANUAL,
    });
    expect(s1.status).toBe(TIMER_STATUS.PAUSED);
    expect(s1.totalElapsedMs).toBe(3_500);
    expect(s1.lastResumedAt).toBe(null);
    expect(s1.pausedAt).toBe(4_500);
  });

  it("paused -> running on RESUME preserves total elapsed", () => {
    const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
    const s1 = timerReducer(s0, {
      type: "PAUSE",
      at: 4_000,
      reason: PAUSE_REASON.MANUAL,
    });
    const s2 = timerReducer(s1, { type: "RESUME", at: 10_000 });
    expect(s2.status).toBe(TIMER_STATUS.RUNNING);
    expect(s2.totalElapsedMs).toBe(3_000);
    expect(s2.lastResumedAt).toBe(10_000);
  });

  it("running -> stopped on STOP adds running segment and is terminal", () => {
    const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
    const s1 = timerReducer(s0, { type: "STOP", at: 3_500, reason: STOP_REASON.SOLVED });
    expect(s1.status).toBe(TIMER_STATUS.STOPPED);
    expect(s1.totalElapsedMs).toBe(2_500);
    const s2 = timerReducer(s1, { type: "ACTIVITY", at: 5_000 });
    expect(s2.status).toBe(TIMER_STATUS.STOPPED);
    expect(s2.totalElapsedMs).toBe(2_500);
  });

  it("stopped -> reset -> idle, then activity can start again", () => {
    const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
    const s1 = timerReducer(s0, { type: "STOP", at: 2_000, reason: STOP_REASON.MANUAL });
    const s2 = timerReducer(s1, { type: "RESET", at: 3_000 });
    expect(s2.status).toBe(TIMER_STATUS.IDLE);
    expect(s2.totalElapsedMs).toBe(0);
    const s3 = timerReducer(s2, { type: "ACTIVITY", at: 4_000 });
    expect(s3.status).toBe(TIMER_STATUS.RUNNING);
    expect(s3.startedAt).toBe(4_000);
  });

  it("hydrate running with exceeded inactivity becomes paused at boundary", () => {
    const inactivityMs = 90_000;
    const startedAt = 1_000;
    const lastResumedAt = 1_000;
    const lastActivityAt = 2_000;
    const now = lastActivityAt + inactivityMs + 10_000;

    const hydrated = hydrateTimerState(
      {
        status: TIMER_STATUS.RUNNING,
        inactivityMs,
        startedAt,
        lastResumedAt,
        totalElapsedMs: 0,
        lastActivityAt,
      },
      now,
    );

    expect(hydrated.status).toBe(TIMER_STATUS.PAUSED);
    expect(hydrated.pauseReason).toBe(PAUSE_REASON.INACTIVITY);
    expect(hydrated.pausedAt).toBe(lastActivityAt + inactivityMs);
    expect(hydrated.totalElapsedMs).toBe((lastActivityAt + inactivityMs) - lastResumedAt);
  });
});

