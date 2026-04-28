import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SegmentedControl from "@/components/filters/SegmentedControl";

describe("<SegmentedControl />", () => {
  it("renders options and calls onChange with clicked option", async () => {
    const user = userEvent.setup();
    const calls: string[] = [];
    render(
      <SegmentedControl
        label="Status"
        options={["All", "Solved", "Attempted"]}
        value="All"
        onChange={(v) => calls.push(v)}
      />,
    );

    expect(screen.getByText("Status")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Solved" }));
    expect(calls).toEqual(["Solved"]);
  });
});

