A **correlated subquery** is a subquery that **depends on the current row** of the outer query.

That means the subquery can run “once per row” (conceptually), which makes correlated subqueries:

- very expressive for certain problems
- potentially slow if used carelessly

This lesson shows:

- how correlated subqueries work
- common patterns (`EXISTS`, per-row counts, “top 1 per parent”)
- how to rewrite them using joins, `GROUP BY`, `LATERAL`, or window functions

Examples use the project tables like `social_posts`, `social_likes`, and `ecommerce_orders`.

---

## What “correlated” means

Compare these two queries:

### Not correlated (subquery stands alone)

```sql
SELECT *
FROM social_posts
WHERE user_id IN (SELECT id FROM social_users);
```

The inner query does not reference the outer query. It can be executed independently.

### Correlated (subquery references the outer row)

```sql
SELECT
  p.id AS post_id,
  p.user_id,
  (
    SELECT COUNT(*)
    FROM social_likes l
    WHERE l.post_id = p.id
  ) AS like_count
FROM social_posts p;
```

The subquery references `p.id` (from the outer query). That is correlation.

---

## Why it matters

Correlated subqueries shine when you want:

- a boolean “does a matching row exist?” check
- a per-row computed column
- a clean anti-join (`NOT EXISTS`)

But correlated aggregates can become slow when the outer query returns many rows.

---

## Pattern 1: “Per-row counts” (and the rewrite)

### Correlated approach

Goal: show each post and how many likes it has.

```sql
SELECT
  p.id AS post_id,
  p.user_id,
  (
    SELECT COUNT(*)
    FROM social_likes l
    WHERE l.post_id = p.id
  ) AS like_count
FROM social_posts p
ORDER BY like_count DESC, post_id ASC;
```

This is readable, but can be expensive for large `social_posts`.

### Rewrite with a pre-aggregation + join

```sql
WITH like_counts AS (
  SELECT post_id, COUNT(*) AS like_count
  FROM social_likes
  GROUP BY post_id
)
SELECT
  p.id AS post_id,
  p.user_id,
  COALESCE(lc.like_count, 0) AS like_count
FROM social_posts p
LEFT JOIN like_counts lc ON lc.post_id = p.id
ORDER BY like_count DESC, post_id ASC;
```

Why this can be faster:

- the `GROUP BY` runs once
- the join attaches results at the correct grain (one row per post)

---

## Pattern 2: `EXISTS` checks (a great fit for correlation)

Goal: find users who have ever posted.

```sql
SELECT u.id, u.username
FROM social_users u
WHERE EXISTS (
  SELECT 1
  FROM social_posts p
  WHERE p.user_id = u.id
);
```

This is often efficient because:

- the database can stop as soon as it finds one matching row per user

---

## Pattern 3: `NOT EXISTS` (safe anti-join)

Goal: users who liked at least one post but never commented.

```sql
SELECT DISTINCT l.user_id
FROM social_likes l
WHERE NOT EXISTS (
  SELECT 1
  FROM social_comments c
  WHERE c.user_id = l.user_id
);
```

Why `NOT EXISTS` is safer than `NOT IN`:

- `NOT IN` behaves unexpectedly if the subquery can return `NULL`
- `NOT EXISTS` does what you mean in almost all cases

---

## Pattern 4: “Top 1 per parent” (correlation vs `LATERAL`)

Goal: for each customer, find the latest order.

Correlated subquery:

```sql
SELECT
  c.id AS customer_id,
  (
    SELECT o.id
    FROM ecommerce_orders o
    WHERE o.customer_id = c.id
    ORDER BY o.created_at DESC, o.id DESC
    LIMIT 1
  ) AS latest_order_id
FROM ecommerce_customers c;
```

If you need multiple columns from the latest order, `LATERAL` is often cleaner in PostgreSQL:

```sql
SELECT
  c.id AS customer_id,
  lo.id AS latest_order_id,
  lo.created_at AS latest_order_created_at
FROM ecommerce_customers c
LEFT JOIN LATERAL (
  SELECT o.id, o.created_at
  FROM ecommerce_orders o
  WHERE o.customer_id = c.id
  ORDER BY o.created_at DESC, o.id DESC
  LIMIT 1
) lo ON true;
```

---

## When to rewrite correlated subqueries

Rewrite when:

- the outer query returns many rows
- the correlated subquery computes aggregates per row (`COUNT`, `SUM`, etc.)

Common rewrites:

- correlated aggregate → pre-aggregate with `GROUP BY` and join
- correlated “top 1” → `DISTINCT ON`, window functions, or `LATERAL`
- existence checks → keep `EXISTS` (often already optimal)

---

## Common mistakes

### Mistake 1: Unstable `LIMIT 1`

If you use `LIMIT 1`, always add a tie-breaker:

```sql
ORDER BY created_at DESC, id DESC
```

### Mistake 2: `NOT IN` with possible `NULL`

Prefer `NOT EXISTS` unless you can prove the subquery never returns `NULL`.

---

## Check yourself (practice)

1. For each `social_users` row, add a `has_posted` boolean using `EXISTS`.
2. For each `social_posts` row, compute `comment_count` using a correlated subquery, then rewrite it using a pre-aggregated join.
3. For each `ecommerce_customers` row, return the latest order’s `created_at` using `LATERAL`.

---

## Summary

- Correlated subqueries reference outer query columns.
- `EXISTS` / `NOT EXISTS` are high-value correlated patterns.
- Correlated aggregates can be slow—rewrite with pre-aggregation and joins.
