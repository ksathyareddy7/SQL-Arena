import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OutputCard from "@/components/exercise/OutputCard";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/utils/clipboard", () => ({
  copyToClipboard: vi.fn(async () => {}),
}));

vi.mock("@/utils/aiPrompts", () => ({
  AI_PROMPT_TYPES: {
    UNDERSTAND_EXPLAIN: "UNDERSTAND_EXPLAIN",
    UNDERSTAND_ANALYZE: "UNDERSTAND_ANALYZE",
  },
  buildAiPrompt: vi.fn(() => "PROMPT"),
}));

describe("<OutputCard />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls onRunFirst when clicking disabled explain/analyze tabs", async () => {
    const user = userEvent.setup();
    const onRunFirst = vi.fn();
    const setOutputTab = vi.fn();
    const onExplain = vi.fn();

    render(
      <OutputCard
        outputTab="results"
        setOutputTab={setOutputTab}
        canExplain={false}
        onExplain={onExplain}
        onRunFirst={onRunFirst}
        exercise={{ id: 1 }}
        userQuery="SELECT 1"
        lastRunQuery={null}
        result={{ rows: [], fields: [], error: null }}
        submitMessage={null}
        explainPlan={null}
        analyzePlan={null}
        explaining={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: /^Explain$/i }));
    await user.click(screen.getByRole("button", { name: /^Explain Analyze$/i }));

    expect(onRunFirst).toHaveBeenCalledTimes(2);
    expect(setOutputTab).not.toHaveBeenCalled();
  });

  it("shows Understand Explain button when explain plan exists and copies prompt on click", async () => {
    const user = userEvent.setup();
    const setOutputTab = vi.fn();
    const onExplain = vi.fn();
    const onRunFirst = vi.fn();

    const { toast } = await import("sonner");
    const { copyToClipboard } = await import("@/utils/clipboard");

    render(
      <OutputCard
        outputTab="explain"
        setOutputTab={setOutputTab}
        canExplain={true}
        onExplain={onExplain}
        onRunFirst={onRunFirst}
        exercise={{ id: 1, code: "X" }}
        userQuery="SELECT 1"
        lastRunQuery="SELECT 1"
        result={{ rows: [], fields: [], error: null }}
        submitMessage={null}
        explainPlan={{ plan: [] }}
        analyzePlan={null}
        explaining={false}
      />,
    );

    const btn = screen.getByRole("button", { name: /Understand Explain/i });
    await user.click(btn);

    expect(copyToClipboard).toHaveBeenCalledWith("PROMPT");
    expect(toast.success).toHaveBeenCalled();
  });
});

