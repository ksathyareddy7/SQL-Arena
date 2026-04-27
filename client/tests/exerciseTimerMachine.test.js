import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultTimerState,
  hydrateTimerState,
  PAUSE_REASON,
  STOP_REASON,
  TIMER_STATUS,
  timerReducer,
} from "../src/utils/exerciseTimerMachine";

test("idle -> running on ACTIVITY (auto-start)", () => {
  const s0 = defaultTimerState(90_000);
  const at = 1_000;
  const s1 = timerReducer(s0, { type: "ACTIVITY", at });
  assert.equal(s1.status, TIMER_STATUS.RUNNING);
  assert.equal(s1.startedAt, at);
  assert.equal(s1.lastResumedAt, at);
  assert.equal(s1.lastActivityAt, at);
});

test("running -> paused on manual PAUSE adds elapsed", () => {
  const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
  const s1 = timerReducer(s0, { type: "PAUSE", at: 4_500, reason: PAUSE_REASON.MANUAL });
  assert.equal(s1.status, TIMER_STATUS.PAUSED);
  assert.equal(s1.totalElapsedMs, 3_500);
  assert.equal(s1.lastResumedAt, null);
  assert.equal(s1.pausedAt, 4_500);
});

test("paused -> running on RESUME preserves total elapsed", () => {
  const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
  const s1 = timerReducer(s0, { type: "PAUSE", at: 4_000, reason: PAUSE_REASON.MANUAL });
  const s2 = timerReducer(s1, { type: "RESUME", at: 10_000 });
  assert.equal(s2.status, TIMER_STATUS.RUNNING);
  assert.equal(s2.totalElapsedMs, 3_000);
  assert.equal(s2.lastResumedAt, 10_000);
});

test("running -> stopped on STOP adds running segment and is terminal", () => {
  const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
  const s1 = timerReducer(s0, { type: "STOP", at: 3_500, reason: STOP_REASON.SOLVED });
  assert.equal(s1.status, TIMER_STATUS.STOPPED);
  assert.equal(s1.totalElapsedMs, 2_500);
  const s2 = timerReducer(s1, { type: "ACTIVITY", at: 5_000 });
  assert.equal(s2.status, TIMER_STATUS.STOPPED);
  assert.equal(s2.totalElapsedMs, 2_500);
});

test("stopped -> reset -> idle, then activity can start again", () => {
  const s0 = timerReducer(defaultTimerState(), { type: "START", at: 1_000 });
  const s1 = timerReducer(s0, { type: "STOP", at: 2_000, reason: STOP_REASON.MANUAL });
  const s2 = timerReducer(s1, { type: "RESET", at: 3_000 });
  assert.equal(s2.status, TIMER_STATUS.IDLE);
  assert.equal(s2.totalElapsedMs, 0);
  const s3 = timerReducer(s2, { type: "ACTIVITY", at: 4_000 });
  assert.equal(s3.status, TIMER_STATUS.RUNNING);
  assert.equal(s3.startedAt, 4_000);
});

test("hydrate running with exceeded inactivity becomes paused at boundary", () => {
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

  assert.equal(hydrated.status, TIMER_STATUS.PAUSED);
  assert.equal(hydrated.pauseReason, PAUSE_REASON.INACTIVITY);
  assert.equal(hydrated.pausedAt, lastActivityAt + inactivityMs);
  assert.equal(hydrated.totalElapsedMs, (lastActivityAt + inactivityMs) - lastResumedAt);
});
