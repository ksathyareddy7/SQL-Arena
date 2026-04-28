import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "@/components/filters/SearchInput";

describe("<SearchInput />", () => {
  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const calls: string[] = [];

    function Harness() {
      const [value, setValue] = React.useState("");
      return (
        <SearchInput
          value={value}
          onChange={(v) => {
            calls.push(v);
            setValue(v);
          }}
          onClear={() => setValue("")}
        />
      );
    }

    render(<Harness />);

    const input = screen.getByPlaceholderText("Search by name, code or #ID...");
    await user.type(input, "abc");
    expect(calls.at(-1)).toBe("abc");
  });

  it("shows clear button when value is present and calls onClear", async () => {
    const user = userEvent.setup();
    let cleared = 0;
    render(
      <SearchInput value="x" onChange={() => {}} onClear={() => (cleared += 1)} />,
    );

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(cleared).toBe(1);
  });
});

