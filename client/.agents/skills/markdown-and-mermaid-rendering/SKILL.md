---
name: markdown-and-mermaid-rendering
description: Rules for writing/rendering lesson markdown in SQL Arena (code blocks, inline code, Mermaid diagrams, and typography).
metadata:
  author: sql-arena
  version: "1.0.0"
  scope: client+content
  argument-hint: <lesson-slug-or-file>
---

# Markdown & Mermaid Rendering (SQL Arena)

Use this skill when:

- authoring/updating lesson markdown in `server/database/base/lessons/*.md`
- changing the markdown renderer
- debugging Mermaid rendering/layout issues

## Markdown authoring rules

- Lessons are standalone: avoid linear “Next:” transitions (tracks can reorder).
- Keep SQL examples fenced as:
  - ```sql
- Prefer inline code for SQL keywords, column names, and operators (e.g., `WHERE`, `COUNT(*)`, `=`, `<>`).
- Keep headings short and scannable.

## Mermaid rules

- Use Mermaid only when it improves learning (simple conceptual diagrams).
- Ensure Mermaid blocks are visually centered and not clipped by containers.
- Prefer wrapping Mermaid blocks in a container that:
  - doesn’t inherit prose styles
  - allows horizontal scroll when needed

## Renderer expectations

- Code blocks should have readable contrast in light and dark theme.
- Inline code inside headings should not break typography.
- Avoid styling that makes operators (like `=` or `<>`) render as plain text with backticks visible.

## Where things live

- Lesson markdown files: `server/database/base/lessons/`
- Lesson seed list: `server/database/base/lessons.json`
- Markdown renderer: `client/src/components/common/MarkdownRenderer`

