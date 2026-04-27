---
name: sql-arena-ui-patterns
description: Project-specific UI patterns for SQL Arena (shadcn + Tailwind). Use when building or refactoring pages/components to keep UX consistent.
metadata:
  author: sql-arena
  version: "1.0.0"
  scope: client
  argument-hint: <page-or-component-path>
---

# SQL Arena UI Patterns

Use this skill when implementing UI changes in `client/` so the app stays consistent, clean, and maintainable.

## Design system baseline

- Use existing shadcn components in `client/src/components/ui/` whenever possible.
- Prefer semantic colors (`bg-background`, `text-muted-foreground`, `border-border`) over hardcoded Tailwind colors.
- Prefer `gap-*` over `space-x-*` / `space-y-*`.
- Prefer `cn()` for conditional classes.

## Page layout conventions

- Pages live under `client/src/pages/`.
- Use a centered container (typically `max-w-6xl mx-auto` or `max-w-7xl mx-auto`) unless the feature needs full width.
- Use `Card` for major surfaces; keep headers predictable:
  - Title + short description
  - Right side actions (primary action on the right)

## Loading / empty / error states

- Always show one of: loading, error, empty, or data.
- Use concise copy.
- Prefer inline loading text over spinners unless the UI already has a consistent spinner component.

## Toasts & feedback

- Use `sonner` toasts (already installed) for:
  - success / info / error on user actions
  - disabled-action explanations (e.g., “Run first”)
- Avoid rendering custom toast components.

## Navigation patterns

- Use React Router routes and `Link` for navigation.
- Make cards or rows clickable only if the click target is clear; preserve accessibility:
  - `role="link"`, `tabIndex={0}`, handle `Enter` and `Space`
  - stop propagation from nested buttons when needed

## Lesson rendering

- Lessons are Markdown rendered by `client/src/components/common/MarkdownRenderer`.
- Avoid “linear-only” language like “Next lesson …” inside lesson content (tracks can reorder).

## File references (common)

- Routes: `client/src/App.jsx`
- Track pages: `client/src/pages/Tracks.jsx`, `client/src/pages/TrackDetail.jsx`, `client/src/pages/TrackLesson.jsx`
- API client: `client/src/api/client.js`
- React Query keys: `client/src/queries/keys.js`

