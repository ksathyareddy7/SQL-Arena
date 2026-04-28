import { describe, it, expect } from "vitest";
import { splitMarkdownIntoSections } from "../src/components/markdown/MarkdownRenderer";

describe("splitMarkdownIntoSections", () => {
  it("splits on --- outside fenced blocks", () => {
    const md = [
      "# Title",
      "",
      "Intro text.",
      "",
      "---",
      "",
      "## Next",
      "More.",
    ].join("\n");

    const sections = splitMarkdownIntoSections(md);
    expect(sections.length).toBe(2);
    expect(sections[0]).toContain("Intro text.");
    expect(sections[1]).toContain("## Next");
  });

  it("does not split on --- inside fenced blocks", () => {
    const md = [
      "# Title",
      "",
      "```sql",
      "SELECT 1;",
      "---",
      "SELECT 2;",
      "```",
      "",
      "---",
      "",
      "Tail.",
    ].join("\n");

    const sections = splitMarkdownIntoSections(md);
    expect(sections.length).toBe(2);
    expect(sections[0]).toContain("```sql");
    expect(sections[0]).toContain("---");
    expect(sections[1]).toContain("Tail.");
  });
});
