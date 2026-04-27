Sometimes you want **one row per group**, like:

- the latest post per user
- the most recent order per customer
- the highest‑rated product per category

You can solve these with window functions (`ROW_NUMBER()`), but PostgreSQL also provides a very handy feature:

> `DISTINCT ON (...)`

This lesson teaches how `DISTINCT ON` works, how to control *which row wins*, and common pitfalls.

---

## Why it matters

`DISTINCT ON` can make “top 1 per group” queries:

- shorter
- easier to read (for this specific problem)
- fast (when backed by a good index)

But it’s also easy to get wrong if you don’t understand how `ORDER BY` chooses the winning row.

---

## The core idea

`DISTINCT ON (group_cols...)` means:

1. Split rows into groups based on `group_cols`.
2. Within each group, keep **the first row** according to `ORDER BY`.

So the ordering is not optional—`ORDER BY` controls which row you keep.

---

## The most important rule

In PostgreSQL, when you use `DISTINCT ON`, the `ORDER BY` must start with the same expressions:

```sql
SELECT DISTINCT ON (user_id) ...
FROM ...
ORDER BY user_id, created_at DESC;
```

Good:

- `DISTINCT ON (user_id)`
- `ORDER BY user_id, ...`

Bad (error or incorrect intent):

- `DISTINCT ON (user_id)`
- `ORDER BY created_at DESC` (missing `user_id` first)

---

## Example 1: Latest post per user

Goal: for each user, return their most recent post.

```sql
SELECT DISTINCT ON (p.user_id)
  p.user_id,
  p.id AS post_id,
  p.created_at
FROM social_posts p
ORDER BY p.user_id, p.created_at DESC, p.id DESC;
```

Why the extra `p.id DESC`?

- If two posts have the same `created_at`, it gives a deterministic tie‑breaker.

Example output:

| user_id | post_id | created_at           |
|--------:|--------:|----------------------|
| 1       | 910     | 2026-03-30 18:05:00  |
| 2       | 144     | 2026-03-29 09:12:00  |

---

## Example 2: Latest order per customer

```sql
SELECT DISTINCT ON (o.customer_id)
  o.customer_id,
  o.id AS order_id,
  o.created_at
FROM ecommerce_orders o
ORDER BY o.customer_id, o.created_at DESC, o.id DESC;
```

This returns one row per customer: their “most recent order”.

---

## Example 3: Highest‑rated product per category

This example shows a common pattern:

1) compute a metric per entity  
2) choose the “top 1” per group using `DISTINCT ON`

```sql
WITH product_ratings AS (
  SELECT
    product_id,
    AVG(rating)::numeric(10,2) AS avg_rating,
    COUNT(*) AS review_count
  FROM ecommerce_reviews
  GROUP BY product_id
)
SELECT DISTINCT ON (p.category_id)
  p.category_id,
  p.id AS product_id,
  pr.avg_rating,
  pr.review_count
FROM ecommerce_products p
JOIN product_ratings pr ON pr.product_id = p.id
ORDER BY
  p.category_id,
  pr.avg_rating DESC,
  pr.review_count DESC,
  p.id ASC;
```

Notes:

- sort criteria after `category_id` decide which product “wins”
- tie-breakers make results stable

---

## `DISTINCT ON` vs window functions

You can also solve “top 1 per group” with:

```sql
ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)
```

When to prefer `DISTINCT ON`:

- you want **only 1 row per group**
- you’re on PostgreSQL
- you like the compact syntax

When to prefer window functions:

- you need top **N** per group (not just 1)
- you want to keep ranking columns (`rn`, `rank`)
- you want portability to other databases

---

## Indexing tip (optional but useful)

If you run “latest per customer” a lot, an index can help:

- `customer_id` first (because you group by it)
- then `created_at DESC` for the “latest” ordering

Example idea:

```sql
CREATE INDEX ON ecommerce_orders (customer_id, created_at DESC, id DESC);
```

You don’t need to add this in the playground, but this is how you’d optimize it in a real app.

---

## Common mistakes

### Mistake 1: Forgetting that `ORDER BY` chooses the winner

Without the right ordering, you might accidentally keep the oldest row, not the newest.

### Mistake 2: Missing tie-breakers

If many rows tie on the “sort key”, results can look random between runs.

Add a stable tiebreaker (often the primary key).

### Mistake 3: Thinking it’s standard SQL

`DISTINCT ON` is PostgreSQL‑specific. Use window functions if you need portability.

---

## Check yourself (practice)

1. Return the latest like per user from `social_likes` (`user_id`, `created_at`).
2. For each product, return its latest review (`product_id`, `created_at`, `rating`).
3. For each user, return the post with the most comments (hint: aggregate comment counts first).

---

## Summary

- `DISTINCT ON (group_cols)` keeps the **first row per group** by `ORDER BY`.
- Always start `ORDER BY` with the same expressions you list in `DISTINCT ON`.
- Add tie-breakers for deterministic results.
