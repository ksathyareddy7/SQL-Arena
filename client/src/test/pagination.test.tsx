import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "@/components/common/Pagination";

describe("<Pagination />", () => {
  it("renders page buttons and calls onPage", async () => {
    const user = userEvent.setup();
    const calls: number[] = [];
    render(<Pagination page={3} totalPages={10} onPage={(p) => calls.push(p)} />);

    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(screen.getByRole("button", { name: "4" }));
    expect(calls).toEqual([4]);
  });

  it("disables prev on first page and next on last page", () => {
    const noop = () => {};
    const { rerender } = render(
      <Pagination page={1} totalPages={3} onPage={noop} />,
    );
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();

    rerender(<Pagination page={3} totalPages={3} onPage={noop} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });
});

