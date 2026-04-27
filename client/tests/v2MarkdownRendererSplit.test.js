import test from "node:test";
import assert from "node:assert/strict";
import { splitMarkdownIntoSections } from "../src/pages/v2/components/V2MarkdownRenderer";

test("splitMarkdownIntoSections splits on --- outside fenced blocks", () => {
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
  assert.equal(sections.length, 2);
  assert.ok(sections[0].includes("Intro text."));
  assert.ok(sections[1].includes("## Next"));
});

test("splitMarkdownIntoSections does not split on --- inside fenced blocks", () => {
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
  assert.equal(sections.length, 2);
  assert.ok(sections[0].includes("```sql"));
  assert.ok(sections[0].includes("---"));
  assert.ok(sections[1].includes("Tail."));
});

