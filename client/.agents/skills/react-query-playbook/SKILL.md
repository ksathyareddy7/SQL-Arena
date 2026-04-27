---
name: react-query-playbook
description: SQL Arena React Query conventions: query keys, invalidation, mutations, and error handling. Use when adding/rewiring API calls.
metadata:
  author: sql-arena
  version: "1.0.0"
  scope: client
  argument-hint: <feature-name>
---

# React Query Playbook (SQL Arena)

Use this skill whenever you introduce a new API call, refactor data fetching, or adjust caching behavior.

## Conventions

- Query keys must live in `client/src/queries/keys.js`.
- Keep keys stable and include `userId` where the response is user-specific.
- Prefer:
  - `useQuery` for reads
  - `useMutation` for writes
  - `invalidateQueries` for cache refresh after mutations

## API shape

- API wrappers live in `client/src/api/*`.
- API functions return `res.data` via `unwrapData` from `client/src/api/client.js`.
- Auth/session is passed via `withUser(userId)` (header `x-user-id`).

## Loading UX

- Prefer `placeholderData: (prev) => prev` for lists/details where it prevents UI flicker.
- Avoid duplicating loading states across components; keep them local to the page container.

## Mutation invalidation rules

After a mutation, invalidate:

- the list query
- the detail query (if applicable)
- any parent aggregates that depend on the changed resource

Example: lesson progress updates should invalidate:

- lessons list + detail
- tracks list + track detail (because track progress aggregates depend on lesson progress)

## Error handling

- The axios client interceptor logs out on `401` and clears stored user.
- UI should show a simple error message if a query fails.
- Use `sonner` toast for mutation errors when the action is user-triggered.

