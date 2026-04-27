PostgreSQL supports a powerful syntax for conditional aggregation:

```sql
COUNT(*) FILTER (WHERE condition)
SUM(amount) FILTER (WHERE condition)
AVG(value) FILTER (WHERE condition)
```

You can do the same thing with `CASE` expressions, but `FILTER` is often:

- shorter
- easier to read
- less error-prone (fewer parentheses)

This lesson shows practical patterns for dashboards and analytics.

---

## `FILTER` vs `CASE` (same idea)

### `FILTER`

```sql
SELECT
  COUNT(*) AS total_users,
  COUNT(*) FILTER (WHERE is_verified) AS verified_users
FROM social_users;
```

### `CASE` inside aggregates (portable SQL)

```sql
SELECT
  COUNT(*) AS total_users,
  SUM(CASE WHEN is_verified THEN 1 ELSE 0 END) AS verified_users
FROM social_users;
```

Both are correct. `FILTER` is PostgreSQL-specific.

---

## Example 1: One-row “dashboard” metrics

```sql
SELECT
  COUNT(*) AS total_posts,
  COUNT(*) FILTER (WHERE media_type = 'video') AS video_posts,
  COUNT(*) FILTER (WHERE location IS NOT NULL) AS posts_with_location,
  COUNT(*) FILTER (WHERE content IS NULL OR content = '') AS empty_content_posts
FROM social_posts;
```

This returns a single row with multiple metrics.

---

## Example 2: Multiple time windows in one pass

```sql
SELECT
  COUNT(*) AS total_likes,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) AS likes_today,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS likes_last_7d
FROM social_likes;
```

This is a common KPI pattern.

---

## Example 3: Conditional sums (revenue metrics)

```sql
SELECT
  SUM(amount) AS total_amount,
  SUM(amount) FILTER (WHERE status = 'paid') AS paid_amount,
  SUM(amount) FILTER (WHERE status = 'refunded') AS refunded_amount
FROM ecommerce_payments;
```

---

## Example 4: Conditional averages

Average order total for paid vs non-paid orders:

```sql
SELECT
  AVG(total_amount) FILTER (WHERE status = 'paid') AS avg_paid_order_total,
  AVG(total_amount) FILTER (WHERE status <> 'paid') AS avg_non_paid_order_total
FROM ecommerce_orders;
```

Be careful with `NULL` totals; you might want `COALESCE(total_amount, 0)` depending on meaning.

---

## Combine `FILTER` with `GROUP BY`

Per day metrics:

```sql
SELECT
  DATE(created_at) AS day,
  COUNT(*) AS total_posts,
  COUNT(*) FILTER (WHERE media_type = 'video') AS video_posts,
  COUNT(*) FILTER (WHERE location IS NOT NULL) AS posts_with_location
FROM social_posts
GROUP BY DATE(created_at)
ORDER BY day;
```

---

## Common mistakes

### Mistake 1: Using `WHERE` instead of `FILTER` for multi-metric queries

If you do:

```sql
WHERE media_type = 'video'
```

you filtered the whole dataset and can’t compute other metrics from the full table in the same query.

### Mistake 2: Forgetting row multiplication from joins

If you join a detail table, your counts can multiply.

Pre-aggregate child tables or count distinct keys where appropriate.

---

## Check yourself (practice)

1. Return one row with:
   - total users
   - verified users
   - users with empty bio
2. Return per-day post counts for the last 14 days, with video vs non-video split.
3. For ecommerce, return one row with:
   - total orders last 7 days
   - paid orders last 7 days
   - average order total for paid orders last 7 days

---

## Summary

- `FILTER` is PostgreSQL’s clean conditional aggregation syntax.
- It’s ideal for dashboards and multi-metric queries.
- Use it with time windows and groupings to build KPI tables.
