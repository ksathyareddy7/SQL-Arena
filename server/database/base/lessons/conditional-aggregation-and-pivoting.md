Dashboards often need **many metrics in one result**:

- total posts
- video posts
- posts with location
- verified users
- orders in the last 7 days

Conditional aggregation is the technique that makes this possible in a single query.

---

## The two main tools

### 1) `FILTER` (PostgreSQL)

```sql
COUNT(*) FILTER (WHERE <condition>)
SUM(amount) FILTER (WHERE <condition>)
```

### 2) `CASE` inside aggregates (portable SQL)

```sql
SUM(CASE WHEN <condition> THEN 1 ELSE 0 END)
```

Use `FILTER` when you’re on PostgreSQL and want clean syntax. Use `CASE` when you want portability or more complex expressions.

---

## Example 1: Many post metrics in one row

```sql
SELECT
  COUNT(*) AS total_posts,
  COUNT(*) FILTER (WHERE media_type = 'video') AS video_posts,
  COUNT(*) FILTER (WHERE location IS NOT NULL) AS posts_with_location,
  COUNT(*) FILTER (WHERE content IS NULL OR content = '') AS empty_content_posts
FROM social_posts;
```

Example output:

| total_posts | video_posts | posts_with_location | empty_content_posts |
|-----------:|------------:|--------------------:|--------------------:|
| 12000      | 3200        | 1800                | 25                  |

---

## Example 2: Many user metrics in one row

```sql
SELECT
  COUNT(*) AS total_users,
  COUNT(*) FILTER (WHERE is_verified) AS verified_users,
  COUNT(*) FILTER (WHERE profile_image_url IS NULL) AS users_without_avatar,
  COUNT(*) FILTER (WHERE bio IS NULL OR bio = '') AS users_with_empty_bio
FROM social_users;
```

---

## Example 3: Pivoting by category (turn rows into columns)

Suppose you want order counts by status in columns.

```sql
SELECT
  COUNT(*) AS total_orders,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_orders,
  COUNT(*) FILTER (WHERE status = 'paid') AS paid_orders,
  COUNT(*) FILTER (WHERE status = 'shipped') AS shipped_orders,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_orders
FROM ecommerce_orders;
```

This is a simple “pivot”: one row, many columns, each column counts a category.

If your statuses change frequently, hard-coding columns can be annoying; in that case you might want a BI tool or dynamic SQL. But for a stable schema, this is great.

---

## Example 4: Conditional sums (revenue metrics)

```sql
SELECT
  SUM(amount) AS total_revenue,
  SUM(amount) FILTER (WHERE status = 'paid') AS paid_revenue,
  SUM(amount) FILTER (WHERE status = 'refunded') AS refunded_amount
FROM ecommerce_payments;
```

---

## Add a time window (very common)

“Last 7 days order metrics”:

```sql
SELECT
  COUNT(*) AS total_orders,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS orders_last_7d,
  COUNT(*) FILTER (
    WHERE created_at >= NOW() - INTERVAL '7 days'
      AND status = 'paid'
  ) AS paid_orders_last_7d
FROM ecommerce_orders;
```

This pattern works nicely with any time filter.

---

## `FILTER` vs `WHERE`

`WHERE` filters rows **before** aggregation.

`FILTER` filters rows **inside one aggregate**.

That means you can compute multiple metrics over different subsets in the same query.

---

## Common mistakes

### Mistake 1: Double counting due to joins

If you join `ecommerce_orders` to `ecommerce_order_items`, each order appears multiple times.

Then `COUNT(*)` becomes “number of items”, not “number of orders”.

Fix: aggregate at the correct grain first (CTE/subquery), or count distinct IDs carefully.

### Mistake 2: Mixing conditions and forgetting parentheses

Be explicit with grouping:

```sql
COUNT(*) FILTER (WHERE created_at >= ... AND status = 'paid')
```

### Mistake 3: Using `CASE` without an `ELSE 0`

This returns `NULL` when nothing matches:

```sql
SUM(CASE WHEN status = 'paid' THEN 1 END)
```

Prefer:

```sql
SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END)
```

---

## Check yourself (practice)

1. In one query, return:
   - total likes
   - likes today
   - likes in the last 7 days
   from `social_likes`.
2. Build a “user dashboard” row with:
   - total posts by that user
   - total likes received on their posts
   - total comments received on their posts
3. Pivot `social_posts` by `media_type` into columns (count each type).

---

## Summary

- Conditional aggregation gives you multiple metrics in one query.
- Prefer `FILTER` in PostgreSQL for readability; use `CASE` for portability.
- Watch out for join duplication; aggregate at the right grain.
