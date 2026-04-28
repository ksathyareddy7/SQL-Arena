import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockInterviewSessionPage from "@/pages/MockInterviewSession";

const onEnd = vi.fn();

vi.mock("@/hooks/useMockInterviewSessionController", () => ({
  useMockInterviewSessionController: () => ({
    loading: false,
    title: "20 Min SQL Screening",
    sessionQuestions: [{ code: "X", title: "T", difficulty: "easy" }],
    index: 0,
    view: "question",
    setView: vi.fn(),
    hints: [{ revealed: true }, { revealed: false }],
    remaining: 60,
    exercise: {
      code: "SOCIAL_001",
      title: "Total Users",
      description: "D",
      schemas: [],
      relationships: [],
    },
    query: "",
    setQuery: vi.fn(),
    onBackToTemplates: vi.fn(),
    goTo: vi.fn(),
    onPrev: vi.fn(),
    onNext: vi.fn(),
    canPrev: false,
    canNext: true,
    disabled: false,
    navigatePending: false,
    onEnd,
    onFormat: vi.fn(),
    onRun: vi.fn(),
    onSubmit: vi.fn(),
    sessionEnded: false,
    executePending: false,
    submitPending: false,
    outcome: null,
    result: { rows: null, fields: null, error: null },
  }),
}));

vi.mock("@/components/mock-interview/session/Sidebar", () => ({
  default: () => <div data-testid="sidebar" />,
}));

vi.mock("@/components/mock-interview/session/TopTabs", () => ({
  default: ({ hintsRevealedCount }: { hintsRevealedCount: number }) => (
    <div data-testid="top-tabs">hints:{hintsRevealedCount}</div>
  ),
}));

vi.mock("@/components/exercise-detail/SQLInput", () => ({
  default: ({ value, onChange }: any) => (
    <textarea
      aria-label="SQL editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

vi.mock("@/components/exercise/QueryRunSubmitButtons", () => ({
  default: ({ onRun, onSubmit, runDisabled, submitDisabled }: any) => (
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

vi.mock("@/components/exercise-detail/ResultTable", () => ({
  default: () => <div data-testid="result-table" />,
}));

describe("<MockInterviewSessionPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows revealed hints count in tabs and disables run/submit when query is empty", () => {
    render(<MockInterviewSessionPage />);
    expect(screen.getByTestId("top-tabs")).toHaveTextContent("hints:1");

    expect(screen.getByRole("button", { name: "Run Query" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("calls end handler when clicking End interview", async () => {
    const user = userEvent.setup();
    render(<MockInterviewSessionPage />);
    await user.click(screen.getByRole("button", { name: /End interview/i }));
    expect(onEnd).toHaveBeenCalled();
  });
});

