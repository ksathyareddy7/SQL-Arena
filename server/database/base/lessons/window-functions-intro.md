Window functions let you calculate values **across related rows** while still returning **every original row**.

That’s the key difference from `GROUP BY`:

- `GROUP BY` **collapses** rows into one row per group.
- Window functions **keep** rows and add extra computed columns.

This lesson teaches the window-function basics you’ll use constantly: `OVER`, `PARTITION BY`, `ORDER BY`, ranks, and running totals.

---

## Why it matters

Window functions are perfect when you want things like:

- “Show each order, plus the customer’s total orders”
- “Rank products by sales in their category”
- “Compute a running total by day”
- “Compare this row to the previous row (`LAG`)”

If you try to do these with only `GROUP BY`, you usually end up with extra joins or subqueries.

---

## The core syntax: `OVER (...)`

Window functions look like normal functions, but they include an `OVER` clause:

```sql
<window_function>(...) OVER (
  PARTITION BY ...
  ORDER BY ...
)
```

Think of the `OVER` clause as answering:

- **Which rows belong together?** (`PARTITION BY`)
- **In what order should we look at them?** (`ORDER BY`)

Both are optional, but most real queries use at least one.

---

## Example 1: “Per-row + per-customer total”

Goal: show each order and the customer’s total order count.

```sql
SELECT
  id AS order_id,
  customer_id,
  created_at,
  COUNT(*) OVER (PARTITION BY customer_id) AS customer_order_count
FROM ecommerce_orders
ORDER BY customer_id, created_at;
```

What happens:

- `PARTITION BY customer_id` groups rows by customer (without collapsing them)
- `COUNT(*) OVER (...)` counts rows in each partition
- each order row still appears, now with a helpful “context” column

Example output:

| order_id | customer_id | created_at           | customer_order_count |
|---------:|------------:|----------------------|---------------------:|
| 101      | 7           | 2026-03-01 10:00:00  | 3                    |
| 122      | 7           | 2026-03-10 13:10:00  | 3                    |
| 155      | 7           | 2026-03-20 08:42:00  | 3                    |

---

## Example 2: Ranking within a group (`ROW_NUMBER`, `RANK`, `DENSE_RANK`)

Goal: rank posts by “likes received”, within each user.

First, create a per-post like count, then rank.

```sql
WITH post_like_counts AS (
  SELECT post_id, COUNT(*) AS like_count
  FROM social_likes
  GROUP BY post_id
)
SELECT
  p.user_id,
  p.id AS post_id,
  COALESCE(plc.like_count, 0) AS like_count,
  ROW_NUMBER() OVER (
    PARTITION BY p.user_id
    ORDER BY COALESCE(plc.like_count, 0) DESC, p.id ASC
  ) AS rn,
  RANK() OVER (
    PARTITION BY p.user_id
    ORDER BY COALESCE(plc.like_count, 0) DESC, p.id ASC
  ) AS rnk
FROM social_posts p
LEFT JOIN post_like_counts plc ON plc.post_id = p.id
ORDER BY p.user_id, rn;
```

Which rank function should you use?

- `ROW_NUMBER()` → always 1,2,3… (ties still get different numbers)
- `RANK()` → ties share a rank and **skip** numbers (1,1,3…)
- `DENSE_RANK()` → ties share a rank and **don’t skip** (1,1,2…)

---

## Example 3: “Top N per group” using `ROW_NUMBER()`

Goal: top 3 posts per user by like count.

```sql
WITH post_like_counts AS (
  SELECT post_id, COUNT(*) AS like_count
  FROM social_likes
  GROUP BY post_id
),
ranked AS (
  SELECT
    p.user_id,
    p.id AS post_id,
    COALESCE(plc.like_count, 0) AS like_count,
    ROW_NUMBER() OVER (
      PARTITION BY p.user_id
      ORDER BY COALESCE(plc.like_count, 0) DESC, p.id ASC
    ) AS rn
  FROM social_posts p
  LEFT JOIN post_like_counts plc ON plc.post_id = p.id
)
SELECT user_id, post_id, like_count
FROM ranked
WHERE rn <= 3
ORDER BY user_id, rn;
```

This pattern is one of the most important uses of window functions.

---

## Example 4: Running totals (`SUM` over an ordered window)

Goal: compute cumulative orders over time.

```sql
WITH daily_orders AS (
  SELECT DATE(created_at) AS day, COUNT(*) AS orders
  FROM ecommerce_orders
  GROUP BY DATE(created_at)
)
SELECT
  day,
  orders,
  SUM(orders) OVER (ORDER BY day ASC) AS running_orders
FROM daily_orders
ORDER BY day ASC;
```

Notes:

- we aggregate first (`daily_orders`) because running totals over raw events can be huge
- the `ORDER BY` inside `OVER` makes it a running calculation

---

## Looking at neighbors: `LAG` / `LEAD`

`LAG(x)` lets you read the previous row’s value (in the same partition/order).

Goal: show each day’s orders and the change vs yesterday.

```sql
WITH daily_orders AS (
  SELECT DATE(created_at) AS day, COUNT(*) AS orders
  FROM ecommerce_orders
  GROUP BY DATE(created_at)
)
SELECT
  day,
  orders,
  LAG(orders) OVER (ORDER BY day ASC) AS prev_day_orders,
  orders - COALESCE(LAG(orders) OVER (ORDER BY day ASC), 0) AS delta_vs_prev_day
FROM daily_orders
ORDER BY day ASC;
```

---

## Common mistakes (and fixes)

### Mistake 1: Using `GROUP BY` when you need row-level output

If you need *each row plus context*, use a window function.

### Mistake 2: Forgetting a deterministic tie-breaker

If you rank with `ORDER BY like_count DESC` and many rows tie, the order can be unstable.

Add a tie-breaker:

```sql
ORDER BY like_count DESC, post_id ASC
```

### Mistake 3: Filtering window results in the same SELECT level

You can’t usually do:

```sql
SELECT ..., ROW_NUMBER() OVER (...) AS rn
FROM ...
WHERE rn <= 3;
```

Because `WHERE` runs before `SELECT`.

Fix: wrap in a subquery/CTE (as shown in “Top N per group”).

---

## Check yourself (practice)

Try these using the project tables:

1. For each `social_posts` row, show `post_id`, `user_id`, and that user’s total post count.
2. Rank `ecommerce_products` by average review rating within each category (hint: pre-aggregate reviews per product).
3. For each day, show `post_count` and a running total of posts (aggregate by day first).

---

## Summary

- Window functions add “across-row” calculations **without collapsing rows**.
- Use `PARTITION BY` to define groups and `ORDER BY` to define sequence.
- Learn these first: `COUNT(*) OVER`, `ROW_NUMBER`, `RANK` / `DENSE_RANK`, `SUM(...) OVER`, `LAG` / `LEAD`.
