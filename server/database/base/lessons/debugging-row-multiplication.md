One of the most common “my numbers are wrong” bugs in SQL is **row multiplication**:

> you join tables, and counts or sums suddenly get too big

This happens when you accidentally change the **grain** (the meaning of a row) without noticing.

This lesson gives you a practical workflow to:

- spot row multiplication quickly
- fix it with pre-aggregation, distinct counting, or correct join paths
- write KPI queries you can trust

Examples use `ecommerce_orders`, `ecommerce_order_items`, `ecommerce_payments`, `social_posts`, and `social_comments`.

---

## The core idea: grain (row meaning)

Every table has a natural grain:

- `ecommerce_orders` → one row per order
- `ecommerce_order_items` → one row per item within an order
- `ecommerce_payments` → one row per payment (often one per order, but not always)
- `social_posts` → one row per post
- `social_comments` → one row per comment

When you join tables with different grains, you can multiply rows.

---

## Symptom checklist

If any of these happen, suspect row multiplication:

- `COUNT(*)` changes drastically after adding a join
- a sum looks 2×, 3×, 10× too large
- your “number of users” becomes bigger than total users
- your results differ depending on whether you include a detail table

---

## Example 1: Counting orders after joining items (classic bug)

Bad:

```sql
SELECT COUNT(*) AS order_count
FROM ecommerce_orders o
JOIN ecommerce_order_items oi ON oi.order_id = o.id;
```

This counts **order items**, not orders.

Fix 1: count distinct order IDs:

```sql
SELECT COUNT(DISTINCT o.id) AS order_count
FROM ecommerce_orders o
JOIN ecommerce_order_items oi ON oi.order_id = o.id;
```

Fix 2: avoid the join if you don’t need it:

```sql
SELECT COUNT(*) AS order_count
FROM ecommerce_orders;
```

---

## Example 2: Summing order totals after joining items

If `ecommerce_orders` has `total_amount`, this is wrong:

```sql
SELECT SUM(o.total_amount) AS revenue
FROM ecommerce_orders o
JOIN ecommerce_order_items oi ON oi.order_id = o.id;
```

Why it’s wrong:

- each order row repeats once per item
- you sum the same `total_amount` multiple times

Fix: keep the order grain:

```sql
SELECT SUM(o.total_amount) AS revenue
FROM ecommerce_orders o;
```

If you need to filter by item attributes (e.g., category), use a two-step approach:

```sql
WITH matching_orders AS (
  SELECT DISTINCT oi.order_id
  FROM ecommerce_order_items oi
  JOIN ecommerce_products p ON p.id = oi.product_id
  WHERE p.category_id = 3
)
SELECT SUM(o.total_amount) AS revenue
FROM ecommerce_orders o
JOIN matching_orders mo ON mo.order_id = o.id;
```

`matching_orders` is deduplicated, so it preserves the one-row-per-order grain.

---

## Example 3: Counting comments per post (right and wrong)

Goal: comment count per post.

Correct:

```sql
SELECT
  post_id,
  COUNT(*) AS comment_count
FROM social_comments
GROUP BY post_id
ORDER BY comment_count DESC, post_id ASC;
```

Row multiplication shows up when you join multiple “child tables” at once.

### Example: likes and comments per post (naive join)

Bad:

```sql
SELECT
  p.id AS post_id,
  COUNT(l.*) AS like_rows,
  COUNT(c.*) AS comment_rows
FROM social_posts p
LEFT JOIN social_likes l ON l.post_id = p.id
LEFT JOIN social_comments c ON c.post_id = p.id
GROUP BY p.id;
```

Why it’s wrong:

- likes × comments creates a grid per post
- if a post has 10 likes and 5 comments, the join produces 50 rows

### Fix: pre-aggregate each child table first

```sql
WITH like_counts AS (
  SELECT post_id, COUNT(*) AS like_count
  FROM social_likes
  GROUP BY post_id
),
comment_counts AS (
  SELECT post_id, COUNT(*) AS comment_count
  FROM social_comments
  GROUP BY post_id
)
SELECT
  p.id AS post_id,
  COALESCE(lc.like_count, 0) AS like_count,
  COALESCE(cc.comment_count, 0) AS comment_count
FROM social_posts p
LEFT JOIN like_counts lc ON lc.post_id = p.id
LEFT JOIN comment_counts cc ON cc.post_id = p.id
ORDER BY post_id;
```

This keeps the grain at “one row per post”.

---

## A practical debugging workflow

### Step 1: Measure row counts at each step

Start with the base table:

```sql
SELECT COUNT(*) FROM ecommerce_orders;
```

Then add joins one at a time and see what changes.

### Step 2: Identify the intended grain

Ask: “Do I want one row per order? per item? per customer?”

If you want one row per order, your final output should have a unique `order_id`.

### Step 3: Check uniqueness

If you think you’re at “one row per order”, verify:

```sql
SELECT
  COUNT(*) AS rows,
  COUNT(DISTINCT order_id) AS distinct_orders
FROM (...your query...) q;
```

If `rows > distinct_orders`, you multiplied.

### Step 4: Fix with pre-aggregation or deduping

Preferred fixes:

- pre-aggregate child tables in CTEs and join
- dedupe join keys with `SELECT DISTINCT` before joining
- count distinct IDs only when appropriate

---

## Common mistakes

### Mistake 1: “COUNT(*)” after a join without thinking

Always ask: “what am I counting now?”

### Mistake 2: Using `COUNT(DISTINCT ...)` as a band-aid

Sometimes it’s correct. Sometimes it hides a bug.

If sums are wrong, `COUNT(DISTINCT ...)` won’t fix them. You usually need a grain-preserving rewrite.

### Mistake 3: Joining multiple child tables at once

Joining two child tables often multiplies rows. Pre-aggregate each child first.

---

## Check yourself (practice)

1. Build a query that returns one row per `ecommerce_orders` row with:
   - number of items in the order
   - total payments for that order
   (Hint: pre-aggregate `order_items` and `payments` separately.)
2. For each `social_posts` row, return likes and comments without row multiplication.
3. Take a query that counts “customers with orders” and verify that it stays correct after joining order items.

---

## Summary

- Row multiplication happens when you join across different grains.
- Detect it by comparing `COUNT(*)` vs `COUNT(DISTINCT key)`.
- Fix it by pre-aggregating child tables or deduping join keys before joining.
