Pagination seems simple:

```sql
ORDER BY created_at DESC
LIMIT 20 OFFSET 40
```

But in real applications, pagination can produce:

- duplicated rows across pages
- missing rows
- slow queries as offsets grow

This lesson teaches the practical rules for **stable ordering** and introduces **keyset pagination** (also called “seek” pagination).

---

## Why it matters

If your UI shows a feed (posts, orders, comments), users expect:

- page 1 + page 2 contains all results exactly once
- ordering doesn’t “shuffle” between refreshes
- it stays fast even after many pages

Those require two things:

1) stable ordering (deterministic ties)  
2) the right pagination method for the job

---

## Rule 1: Always use a deterministic `ORDER BY`

If you sort by a non-unique column, ties are possible.

Bad (ties can reorder):

```sql
SELECT id, user_id, created_at
FROM social_posts
ORDER BY created_at DESC
LIMIT 20;
```

Better (stable tie-breaker with primary key):

```sql
SELECT id, user_id, created_at
FROM social_posts
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

If two posts share the same `created_at`, `id DESC` decides which comes first.

---

## `OFFSET` pagination (simple, but can get slow)

Example: page size 20, page 3:

```sql
SELECT id, user_id, created_at
FROM social_posts
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 40;
```

Pros:

- simplest to understand
- works fine for small datasets / small offsets

Cons:

- large offsets often get slower (database still walks past many rows)
- pages can shift when new rows are inserted (feeds change)

---

## A subtle correctness issue with `OFFSET` in feeds

Imagine you load page 1, then someone creates a new post.

When you load page 2 with `OFFSET`, results can shift:

- you may see a duplicate you already saw
- you may miss something

That’s not a SQL bug—it’s a product of using offset with a changing dataset.

If you want “feed pagination” correctness, you typically want keyset pagination.

---

## Keyset pagination (seek pagination)

Keyset pagination uses a “cursor” from the last row you saw.

Example feed ordering:

```sql
ORDER BY created_at DESC, id DESC
```

Cursor values:

- `last_created_at`
- `last_id`

### Page 1

```sql
SELECT id, user_id, created_at
FROM social_posts
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Suppose the last row on page 1 is:

- `created_at = '2026-03-30 12:00:00'`
- `id = 850`

### Page 2 (seek to “older than the cursor”)

```sql
SELECT id, user_id, created_at
FROM social_posts
WHERE (created_at, id) < (TIMESTAMP '2026-03-30 12:00:00', 850)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Why this works:

- it continues exactly where you left off
- it stays fast (uses the index ordering instead of skipping rows)

---

## Example: keyset pagination on orders

```sql
SELECT id, customer_id, created_at
FROM ecommerce_orders
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

Where `$1` and `$2` come from the last row of the previous page.

---

## When to use which

Use `OFFSET` when:

- dataset is small
- you need random page jumps (“go to page 17”)
- it’s okay if results shift a bit between loads

Use keyset pagination when:

- you’re building a feed / infinite scroll
- you need consistent “next page” behavior
- you want performance even after many pages

---

## Indexing tip (optional but practical)

If you paginate by:

```sql
ORDER BY created_at DESC, id DESC
```

Then an index like this helps:

```sql
CREATE INDEX ON social_posts (created_at DESC, id DESC);
```

In real apps, you often include additional filters too (e.g., `WHERE user_id = ?`), and the index should match that pattern.

---

## Common mistakes

### Mistake 1: Missing the tie-breaker

If your ordering isn’t deterministic, pagination can show duplicates or skip rows even without new inserts.

### Mistake 2: Using the wrong comparison direction

If you sort `DESC`, your “next page” cursor must use `<` (older items).

If you sort `ASC`, it typically uses `>` (newer items).

### Mistake 3: Keyset pagination + random jumps

Keyset is great for “next/previous”, not for “go to page N” unless you store checkpoints/cursors.

---

## Check yourself (practice)

1. Write a stable pagination query for `social_comments` sorted by newest first.
2. Convert it from `OFFSET` pagination to keyset pagination using `(created_at, id)`.
3. Add a filter (`WHERE post_id = ?`) and decide what index would help.

---

## Summary

- Pagination needs a deterministic `ORDER BY` (add a primary-key tie-breaker).
- `OFFSET` is simple but can be slow and unstable in changing feeds.
- Keyset pagination uses the last row as a cursor and stays fast and consistent.
