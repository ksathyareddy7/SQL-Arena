Reconciliation is the art of comparing two datasets and answering:

- Which rows exist in both?
- Which rows exist only on the left?
- Which rows exist only on the right?
- Where do the values disagree?

This comes up constantly in analytics and debugging:

- orders vs payments
- expected report vs actual table counts
- “active users” computed from two different event tables

---

## Why it matters

If you can reconcile datasets well, you can:

- catch missing data
- detect broken ETL / transformations
- explain why metrics don’t match
- validate new query logic before shipping it

---

## `FULL OUTER JOIN` in one sentence

`FULL OUTER JOIN` returns:

- all matching rows (like an inner join)
- plus rows only in the left
- plus rows only in the right

Missing side columns become `NULL`.

---

## Example 1: Users who liked vs users who commented

Question: which users only like, only comment, or do both?

```sql
WITH likers AS (
  SELECT DISTINCT user_id
  FROM social_likes
),
commenters AS (
  SELECT DISTINCT user_id
  FROM social_comments
)
SELECT
  COALESCE(l.user_id, c.user_id) AS user_id,
  (l.user_id IS NOT NULL) AS liked_anything,
  (c.user_id IS NOT NULL) AS commented_anything
FROM likers l
FULL OUTER JOIN commenters c ON c.user_id = l.user_id
ORDER BY user_id;
```

Example output:

| user_id | liked_anything | commented_anything |
|--------:|:--------------:|:------------------:|
| 1       | true           | true               |
| 2       | true           | false              |
| 3       | false          | true               |

This is a clean way to classify “only in A / only in B / both”.

---

## Example 2: Reconcile “orders” vs “payments”

In a healthy ecommerce system, each order might need a payment.

This query finds:

- orders with no payment
- payments with no order (should be impossible, but bugs happen)

```sql
WITH orders AS (
  SELECT id AS order_id
  FROM ecommerce_orders
),
payments AS (
  SELECT order_id
  FROM ecommerce_payments
)
SELECT
  COALESCE(o.order_id, p.order_id) AS order_id,
  (o.order_id IS NOT NULL) AS has_order,
  (p.order_id IS NOT NULL) AS has_payment
FROM orders o
FULL OUTER JOIN payments p ON p.order_id = o.order_id
WHERE o.order_id IS NULL OR p.order_id IS NULL
ORDER BY order_id;
```

You can remove the `WHERE` to see all rows; keeping it shows only mismatches.

---

## Example 3: Compare aggregated metrics (daily counts)

Often you reconcile *summaries*, not raw rows.

Example: compare daily post counts from two sources (imagine one is a report table, or a query you’re validating).

```sql
WITH a AS (
  SELECT DATE(created_at) AS day, COUNT(*) AS post_count
  FROM social_posts
  GROUP BY DATE(created_at)
),
b AS (
  SELECT DATE(created_at) AS day, COUNT(*) AS post_count
  FROM social_posts
  GROUP BY DATE(created_at)
)
SELECT
  COALESCE(a.day, b.day) AS day,
  a.post_count AS a_post_count,
  b.post_count AS b_post_count,
  (a.post_count IS DISTINCT FROM b.post_count) AS differs
FROM a
FULL OUTER JOIN b ON b.day = a.day
WHERE a.day IS NULL
   OR b.day IS NULL
   OR a.post_count IS DISTINCT FROM b.post_count
ORDER BY day;
```

This pattern is useful when “A” and “B” are different queries (or different tables).

Key idea:

- use `IS DISTINCT FROM` so `NULL` comparisons behave predictably

---

## Labeling mismatch types (very useful in debugging)

```sql
WITH likers AS (
  SELECT DISTINCT user_id FROM social_likes
),
commenters AS (
  SELECT DISTINCT user_id FROM social_comments
)
SELECT
  COALESCE(l.user_id, c.user_id) AS user_id,
  CASE
    WHEN l.user_id IS NOT NULL AND c.user_id IS NOT NULL THEN 'both'
    WHEN l.user_id IS NOT NULL THEN 'only_like'
    ELSE 'only_comment'
  END AS segment
FROM likers l
FULL OUTER JOIN commenters c ON c.user_id = l.user_id
ORDER BY user_id;
```

---

## Common mistakes

### Mistake 1: Forgetting `COALESCE` on the join key

For rows only on one side, the key on the other side is `NULL`.

Use:

```sql
COALESCE(left.key, right.key) AS key
```

### Mistake 2: Using `=` when `NULL` should be comparable

For reconciliation, `IS DISTINCT FROM` is often what you want.

### Mistake 3: Joining raw tables when you really needed aggregated grain

If your unit is “per day”, aggregate first, then reconcile.

---

## Check yourself (practice)

1. Reconcile:
   - users who posted (`social_posts.user_id`)
   - vs users who received likes on their posts
   to find “posted but never got liked”.
2. Reconcile daily order counts between:
   - `ecommerce_orders`
   - and a query filtered to paid payments (hint: join orders + payments first, then group).
3. Add a “mismatch_type” label column (`only_left`, `only_right`, `diff_value`).

---

## Summary

- `FULL OUTER JOIN` is the cleanest tool for “only in A / only in B / both”.
- Use `COALESCE` to display the key for one-sided rows.
- Use `IS DISTINCT FROM` for null-safe comparison of values.
- Reconcile at the correct grain (raw vs aggregated) to avoid confusion.
