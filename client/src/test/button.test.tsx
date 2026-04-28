import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("<Button />", () => {
  it("renders children and handles click", async () => {
    const user = userEvent.setup();
    let clicks = 0;
    render(<Button onClick={() => (clicks += 1)}>Click me</Button>);

    await user.click(screen.getByRole("button", { name: "Click me" }));
    expect(clicks).toBe(1);
  });

  it("respects disabled", async () => {
    const user = userEvent.setup();
    let clicks = 0;
    render(
      <Button disabled onClick={() => (clicks += 1)}>
        Disabled
      </Button>,
    );

    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(clicks).toBe(0);
  });

  it("throws when asChild is used with non-element child", () => {
    expect(() =>
      render(
        // @ts-expect-error - intentionally invalid
        <Button asChild>{"text"}</Button>,
      ),
    ).toThrow(/asChild/i);
  });
});

