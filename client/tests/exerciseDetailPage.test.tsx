import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ExerciseDetailPage from "@/pages/ExerciseDetail";
import { TIMER_STATUS, STOP_REASON } from "@/utils/exerciseTimerMachine";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock("@/utils/confetti", () => ({
  fireSuccessConfetti: vi.fn(),
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ user: { id: 1, username: "test" } }),
}));

vi.mock("@/contexts/BadgesUnlockedDialogContext", () => ({
  useUnlockedBadgesDialog: () => ({ showUnlockedBadges: vi.fn() }),
}));

// Keep page logic, but mock the data hooks/mutations it depends on.
const mockExercise = {
  id: 123,
  code: "SOCIAL_001",
  title: "Total Number of Users",
  description: "Desc",
  difficulty: "easy",
  solution_columns: ["count"],
  tables: ["users"],
  schemas: [],
  relationships: [],
  status: "in_progress",
  last_query: "",
  solutions_unlocked: false,
};

const mockHints = [{ id: 1, hint_order: 1, content: "Hint", revealed: false }];

const executeMutateAsync = vi.fn();
const submitMutateAsync = vi.fn();
const explainMutateAsync = vi.fn();

vi.mock("@/queries/exercises", () => ({
  useExerciseQuery: () => ({ data: mockExercise }),
  useHintsQuery: () => ({ data: mockHints }),
  useRevealHintMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
  useSolutionsQuery: () => ({ data: [], isLoading: false }),
  useUnlockSolutionsMutation: () => ({ isPending: false, mutateAsync: vi.fn() }),
}));

vi.mock("@/queries/query", () => ({
  useExecuteQueryMutation: () => ({ isPending: false, mutateAsync: executeMutateAsync }),
  useSubmitAnswerMutation: () => ({ isPending: false, mutateAsync: submitMutateAsync }),
  useExplainQueryMutation: () => ({ isPending: false, mutateAsync: explainMutateAsync }),
}));

const timerStart = vi.fn();
const timerRecordActivity = vi.fn();
const timerStop = vi.fn();

vi.mock("@/hooks/useExerciseTimerServer", () => ({
  useExerciseTimerServer: () => ({
    status: TIMER_STATUS.IDLE,
    formatted: "00:00",
    actions: {
      start: timerStart,
      stop: timerStop,
      recordActivity: timerRecordActivity,
    },
  }),
}));

// Mock heavy UI components (Monaco, large subviews).
vi.mock("@/components/exercise-detail/SQLInput", () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <textarea
      aria-label="SQL editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock("@/components/exercise/ExerciseSubTabs", () => ({
  default: () => <div data-testid="subtabs" />,
}));

vi.mock("@/components/exercise/ExerciseTimerControls", () => ({
  default: () => <div data-testid="timer-controls" />,
}));

vi.mock("@/components/exercise/OutputCard", () => ({
  default: () => <div data-testid="output-card" />,
}));

vi.mock("@/components/exercise/QueryRunSubmitButtons", () => ({
  default: ({
    onRun,
    onSubmit,
    runDisabled,
    submitDisabled,
  }: any) => (
    <div>
      <button type="button" onClick={onRun} disabled={runDisabled}>
        Run Query
      </button>
      <button type="button" onClick={onSubmit} disabled={submitDisabled}>
        Submit
      </button>
    </div>
  ),
}));

describe("<ExerciseDetailPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts timer on first edit and calls recordActivity on edits", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/exercises/123"]}>
        <Routes>
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("SQL editor"), "select 1;");
    expect(timerStart).toHaveBeenCalled();
    expect(timerRecordActivity).toHaveBeenCalled();
  });

  it("stops timer when submit is correct", async () => {
    const user = userEvent.setup();
    executeMutateAsync.mockResolvedValueOnce({
      rows: [{ count: "1" }],
      fields: ["count"],
      isCorrect: true,
    });
    submitMutateAsync.mockResolvedValueOnce({ isCorrect: true, newBadges: [] });

    render(
      <MemoryRouter initialEntries={["/exercises/123"]}>
        <Routes>
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("SQL editor"), "SELECT 1 AS count;");

    await user.click(screen.getByRole("button", { name: "Run Query" }));
    expect(executeMutateAsync).toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(submitMutateAsync).toHaveBeenCalled();
    expect(timerStop).toHaveBeenCalledWith(STOP_REASON.SOLVED);
  });
});

