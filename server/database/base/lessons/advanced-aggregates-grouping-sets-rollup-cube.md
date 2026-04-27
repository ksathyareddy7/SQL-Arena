Sometimes you need **multiple levels of totals** in one result:

- totals by day
- totals by month
- totals by customer
- grand total

You can write separate queries and combine them with `UNION ALL`, but PostgreSQL also supports “multi-level grouping”:

- `GROUPING SETS`
- `ROLLUP`
- `CUBE`

These are most useful for reporting and dashboards.

---

## Start with the baseline: one grouping level

Daily order totals:

```sql
SELECT
  DATE(created_at) AS day,
  COUNT(*) AS orders
FROM ecommerce_orders
GROUP BY DATE(created_at)
ORDER BY day;
```

This returns exactly one level: “by day”.

---

## `GROUPING SETS`: pick the exact groupings you want

Example: “orders by day” plus a grand total in the same output.

```sql
SELECT
  DATE(created_at) AS day,
  COUNT(*) AS orders
FROM ecommerce_orders
GROUP BY GROUPING SETS (
  (DATE(created_at)),
  ()
)
ORDER BY day NULLS LAST;
```

How to read this:

- `(DATE(created_at))` → group by day
- `()` → no grouping columns → grand total

Example output:

| day        | orders |
|------------|-------:|
| 2026-03-01 | 1200   |
| 2026-03-02 | 1105   |
| (null)     | 34000  |

---

## `ROLLUP`: totals “up the hierarchy”

`ROLLUP(a, b)` is shorthand for:

- `(a, b)` (full detail)
- `(a)` (subtotal by `a`)
- `()` (grand total)

Example: count posts by user and media type, plus subtotals and total.

```sql
SELECT
  user_id,
  media_type,
  COUNT(*) AS post_count
FROM social_posts
GROUP BY ROLLUP (user_id, media_type)
ORDER BY user_id NULLS LAST, media_type NULLS LAST;
```

Typical output shape:

- rows for each `(user_id, media_type)`
- a subtotal row for each `user_id` (with `media_type` null)
- a grand total row (both null)

---

## `CUBE`: all combinations of the columns

`CUBE(a, b)` includes:

- `(a, b)`
- `(a)`
- `(b)`
- `()`

Example: count posts by `media_type` and whether they have a location, including all subtotals.

```sql
SELECT
  media_type,
  (location IS NOT NULL) AS has_location,
  COUNT(*) AS post_count
FROM social_posts
GROUP BY CUBE (media_type, (location IS NOT NULL))
ORDER BY media_type NULLS LAST, has_location NULLS LAST;
```

This can produce a lot of rows when you add more dimensions, so use it carefully.

---

## Distinguishing real `NULL` vs “subtotal NULL”

When you use `ROLLUP`/`CUBE`, `NULL` values can mean:

- a real `NULL` from your data
- a subtotal row where that column is “rolled up”

Use `GROUPING(...)` to detect subtotal rows:

```sql
SELECT
  user_id,
  media_type,
  GROUPING(user_id) AS is_user_total,
  GROUPING(media_type) AS is_media_total,
  COUNT(*) AS post_count
FROM social_posts
GROUP BY ROLLUP (user_id, media_type)
ORDER BY user_id NULLS LAST, media_type NULLS LAST;
```

In PostgreSQL:

- `GROUPING(col) = 1` means the column was rolled up (subtotal/total row)
- `GROUPING(col) = 0` means it’s a normal grouped value

You can use this to label rows:

```sql
SELECT
  CASE
    WHEN GROUPING(user_id) = 1 THEN 'ALL_USERS'
    ELSE user_id::text
  END AS user_bucket,
  CASE
    WHEN GROUPING(media_type) = 1 THEN 'ALL_MEDIA'
    ELSE COALESCE(media_type, 'NULL_MEDIA')
  END AS media_bucket,
  COUNT(*) AS post_count
FROM social_posts
GROUP BY ROLLUP (user_id, media_type)
ORDER BY user_bucket, media_bucket;
```

---

## When to use these features (and when not to)

Use `GROUPING SETS` / `ROLLUP` / `CUBE` when:

- you’re building a report table with totals + subtotals
- you want one query that returns multiple aggregation levels

Avoid them when:

- the output is consumed by an API that expects one consistent grouping level
- you need very custom output formatting (sometimes multiple queries are clearer)

---

## Check yourself (practice)

1. Using `GROUPING SETS`, return:
   - orders by day
   - orders by customer
   - grand total
2. Using `ROLLUP`, return post counts by `(user_id, media_type)` plus subtotals.
3. Add `GROUPING(...)` columns and label subtotal rows clearly.

---

## Summary

- `GROUPING SETS` lets you choose exact grouping combinations.
- `ROLLUP` gives hierarchical subtotals.
- `CUBE` gives all combinations (powerful, but can explode row counts).
- Use `GROUPING(col)` to distinguish subtotal rows from real `NULL`s.
