import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/utils/clipboard", () => ({
  copyToClipboard: vi.fn(async () => {}),
}));

vi.mock("@/components/common/Mermaid", () => ({
  default: ({ chart }: { chart: string }) => (
    <div data-testid="mermaid">{chart}</div>
  ),
}));

describe("<MarkdownRenderer />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders inline code with chip styling", () => {
    render(<MarkdownRenderer content={"Use `SELECT` to query."} variant="bare" />);
    const code = screen.getByText("SELECT");
    expect(code.tagName.toLowerCase()).toBe("code");
    // class includes the inline chip bg.
    expect(code.className).toContain("bg-[#EFF4FF]");
  });

  it("renders a SQL code well and copies snippet on click", async () => {
    const user = userEvent.setup();
    const { copyToClipboard } = await import("@/utils/clipboard");
    const { toast } = await import("sonner");

    render(
      <MarkdownRenderer
        variant="bare"
        content={[
          "```sql",
          "SELECT 1;",
          "```",
        ].join("\n")}
      />,
    );

    // Header label from CodeWell meta.
    expect(screen.getByText("QUERY.SQL")).toBeInTheDocument();
    expect(screen.getByText(/SQL Dialect:/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Copy Snippet/i }));
    expect(copyToClipboard).toHaveBeenCalledWith("SELECT 1;");
    expect(toast.success).toHaveBeenCalled();
  });

  it("renders mermaid fences via Mermaid component", () => {
    render(
      <MarkdownRenderer
        variant="bare"
        content={[
          "```mermaid",
          "flowchart LR",
          "  A --> B",
          "```",
        ].join("\n")}
      />,
    );

    expect(screen.getByTestId("mermaid")).toHaveTextContent("flowchart LR");
  });
});

