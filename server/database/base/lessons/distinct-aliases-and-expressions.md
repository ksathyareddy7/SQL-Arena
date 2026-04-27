You’ll often write SQL that’s “logically correct” but still not in the shape you want:

- you want unique rows (but you get duplicates)
- you want a column named nicely for the UI
- you want a computed value (discounted price, day bucket, full name)

This lesson is about **shaping the output** with:

- `DISTINCT` (deduplicate)
- aliases (naming)
- expressions (computed columns)

We’ll use examples from the project’s `social_*` and `ecommerce_*` tables.

---

## Why it matters

In real applications, SQL output is consumed by:

- dashboards
- tables in the UI
- APIs

Readable, stable output is important:

- clear column names reduce frontend logic
- deterministic ordering and consistent types prevent “flaky” behavior
- deduplication prevents inflated counts and confusing lists

---

## Part 1: `DISTINCT` (deduplicate rows)

### What `DISTINCT` actually does

`DISTINCT` removes duplicates from the **final result set**.

```sql
SELECT DISTINCT city
FROM social_users
ORDER BY city ASC;
```

If 10 users live in “Bengaluru”, the output contains “Bengaluru” once.

### `COUNT(DISTINCT ...)` (unique counts)

```sql
SELECT COUNT(DISTINCT city) AS city_count
FROM social_users;
```

Output shape:

| city_count |
|---:|
| 73 |

---

### `DISTINCT` across multiple columns

When you use multiple columns, uniqueness is based on the combination.

```sql
SELECT DISTINCT user_id, post_id
FROM social_comments
ORDER BY user_id ASC, post_id ASC
LIMIT 20;
```

Interpretation:

- “show the unique user↔post pairs where the user has commented on the post”

---

### Common confusion: `DISTINCT` vs `GROUP BY`

`DISTINCT` removes duplicates.

`GROUP BY` creates groups so you can compute aggregates (counts/sums/avg).

Example: “comments per user” is not a `DISTINCT` problem; it’s a grouping problem:

```sql
SELECT user_id, COUNT(*) AS comment_count
FROM social_comments
GROUP BY user_id
ORDER BY comment_count DESC, user_id ASC
LIMIT 10;
```

If you’re ever thinking “per user” or “per day”, you’re usually in `GROUP BY` territory.

---

## Part 2: aliases (naming columns and tables)

Aliases make SQL readable and make your output API-friendly.

### Table aliases (short names)

```sql
SELECT u.id, u.username
FROM social_users u
ORDER BY u.id ASC
LIMIT 5;
```

Why they matter:

- shorten long table names
- avoid ambiguity in joins (`id` appears in many tables)

---

### Column aliases (nice output names)

```sql
SELECT COUNT(*) AS likes_today
FROM social_likes
WHERE created_at >= CURRENT_DATE
  AND created_at < CURRENT_DATE + INTERVAL '1 day';
```

The UI can now render the column as `likes_today` without extra renaming.

---

### Aliases in `ORDER BY` (very useful)

In PostgreSQL, you can often order by a `SELECT` alias:

```sql
SELECT
  id,
  price * 0.9 AS discounted_price
FROM ecommerce_products
ORDER BY discounted_price DESC, id ASC
LIMIT 10;
```

This reads naturally and avoids repeating the expression.

---

### Aliases and reserved words

If you alias a column to a reserved word, you may need quotes:

```sql
SELECT created_at AS "date"
FROM social_posts
LIMIT 1;
```

In general, prefer safe snake_case names like `created_day`, `total_count`, `avg_price`.

---

## Part 3: expressions (computed columns)

Expressions are how you create useful derived data:

- totals: `quantity * unit_price`
- price with tax: `price * 1.18`
- buckets: `CASE WHEN ... END`
- extracting dates: `DATE(created_at)`

---

### Example 1: line totals in an order

```sql
SELECT
  order_id,
  product_id,
  quantity,
  unit_price,
  (quantity * unit_price) AS line_total
FROM ecommerce_order_items
ORDER BY line_total DESC
LIMIT 10;
```

Output shape:

| order_id | product_id | quantity | unit_price | line_total |
|---:|---:|---:|---:|---:|
| 991 | 42 | 5 | 199.99 | 999.95 |

---

### Example 2: full name (string concatenation)

PostgreSQL uses `||` for string concatenation:

```sql
SELECT
  id,
  first_name,
  last_name,
  (first_name || ' ' || last_name) AS full_name
FROM ecommerce_customers
ORDER BY id ASC
LIMIT 10;
```

If `first_name` or `last_name` can be `NULL`, use `COALESCE`:

```sql
SELECT
  id,
  (COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')) AS full_name
FROM ecommerce_customers;
```

---

### Example 3: “day” buckets from timestamps

```sql
SELECT
  id,
  created_at,
  DATE(created_at) AS created_day
FROM social_posts
ORDER BY created_day DESC, id DESC
LIMIT 10;
```

This is common in reports, but for filtering “today”, prefer a range predicate (more correct and index-friendly).

---

### Example 4: computed percentages (types matter)

If you want percentages, force numeric division:

```sql
SELECT ROUND(
  100.0 * COUNT(*) FILTER (WHERE is_verified = true) / COUNT(*),
  2
) AS verified_percentage
FROM social_users;
```

The `100.0` (not `100`) helps avoid integer division issues.

---

## Putting it together: real-world patterns

### Pattern A: build a clean “top N” metric table

```sql
SELECT
  user_id,
  COUNT(*) AS interactions
FROM (
  SELECT user_id FROM social_likes
  UNION ALL
  SELECT user_id FROM social_comments
) t
GROUP BY user_id
ORDER BY interactions DESC, user_id ASC
LIMIT 5;
```

- `UNION ALL` stacks events (don’t deduplicate)
- alias makes the metric readable
- deterministic tie-breaker (`user_id ASC`)

---

### Pattern B: report-friendly computed column

```sql
SELECT
  id,
  price,
  ROUND(price * 0.9, 2) AS discounted_price
FROM ecommerce_products
ORDER BY discounted_price DESC, id ASC
LIMIT 10;
```

---

## Common mistakes (and fixes)

### Mistake 1: using `DISTINCT` to “fix” an incorrect join

If a join multiplies rows, adding `DISTINCT` can hide the bug while still giving wrong counts.

Fix the join or pre-aggregate instead.

### Mistake 2: forgetting deterministic ordering

If your UI expects stable ordering, always include tie-breakers:

```sql
ORDER BY count DESC, id ASC
```

### Mistake 3: wrong type for division

If you divide integers, you can get truncated results. Use numeric casts or decimal literals.

---

## Diagram: where output shaping fits

```mermaid
flowchart LR
  A["FROM (tables)"] --> B["WHERE (row filter)"]
  B --> C["GROUP BY (groups)"]
  C --> D["HAVING (group filter)"]
  D --> E["SELECT (expressions + aliases)"]
  E --> F["DISTINCT (remove duplicates)"]
  F --> G["ORDER BY / LIMIT (final shape)"]
```

---

## Practice: check yourself

1) Return the number of distinct `media_type` values in `social_posts`.
2) Return the top 10 orders by total number of items:
   - group `ecommerce_order_items` by `order_id`
   - compute `COUNT(*) AS item_rows` (or sum `quantity` if available)
3) Return each product’s discounted price (`price * 0.9`) and sort by the discounted price descending, tie-breaking by `id ASC`.
4) Explain in one sentence: when should you use `GROUP BY` instead of `DISTINCT`?

---

## Summary

- `DISTINCT` removes duplicates from final output; `GROUP BY` creates groups for aggregates.
- Aliases improve readability and produce UI-friendly column names.
- Expressions let you compute useful output fields (totals, dates, percentages, labels).
