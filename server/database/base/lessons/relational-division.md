Relational division is the SQL pattern behind questions like:

- users who posted on **every** day in the last 7 days
- customers who bought from **every** category
- people who completed **all** required steps

These problems are “for all” problems:

> find entities that match **every item** in a required set

---

## The core trick: compare distinct match count to required count

In most relational-division queries, you:

1) define the required set  
2) build distinct `(entity, required_item)` matches  
3) group by entity  
4) keep entities whose match count equals required set size

---

## Example 1: Users who posted every day in the last 7 calendar days

```sql
WITH required_days AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '6 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS day
),
user_days AS (
  SELECT DISTINCT
    user_id,
    DATE(created_at) AS day
  FROM social_posts
  WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
)
SELECT ud.user_id
FROM user_days ud
GROUP BY ud.user_id
HAVING COUNT(*) = (SELECT COUNT(*) FROM required_days)
ORDER BY ud.user_id;
```

Why it works:

- `user_days` has one row per user per day (deduplicated)
- “posted every day” means the user appears on all required days

---

## Example 2: Users active at least 5 out of 7 days

This is a common variation: “at least N distinct days”.

```sql
WITH user_days AS (
  SELECT DISTINCT user_id, DATE(created_at) AS day
  FROM social_posts
  WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
)
SELECT user_id
FROM user_days
GROUP BY user_id
HAVING COUNT(*) >= 5
ORDER BY user_id;
```

No explicit required set needed, because it’s a threshold.

---

## Example 3: Products that have *all* required ratings

We’ll define the required set using `VALUES`.

```sql
WITH required_ratings AS (
  SELECT * FROM (VALUES (1),(2),(3),(4),(5)) v(rating)
),
product_ratings AS (
  SELECT DISTINCT product_id, rating
  FROM ecommerce_reviews
)
SELECT product_id
FROM product_ratings
GROUP BY product_id
HAVING COUNT(*) = (SELECT COUNT(*) FROM required_ratings)
ORDER BY product_id;
```

---

## Example 4: “Every month this year” (use month buckets)

```sql
WITH required_months AS (
  SELECT generate_series(
    DATE_TRUNC('month', CURRENT_DATE),
    DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '11 months',
    INTERVAL '1 month'
  )::date AS month_start
),
customer_months AS (
  SELECT DISTINCT
    customer_id,
    DATE_TRUNC('month', created_at)::date AS month_start
  FROM ecommerce_orders
  WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)
    AND created_at <  DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
)
SELECT customer_id
FROM customer_months
GROUP BY customer_id
HAVING COUNT(*) = (SELECT COUNT(*) FROM required_months)
ORDER BY customer_id;
```

---

## Common mistakes

### Mistake 1: Forgetting `DISTINCT`

If a user posts multiple times per day, you must deduplicate to one row per day.

### Mistake 2: Not defining the required window precisely

Be clear about:

- calendar days vs rolling hours
- timezone boundaries

### Mistake 3: Confusing “every” with “at least”

- “every required item” → match count equals required set size
- “at least N items” → match count >= N

---

## Check yourself (practice)

1. Find users who liked at least one post on each of the last 7 calendar days.
2. Find customers who placed an order in every month of the current year.
3. Find products reviewed by every customer in a given list (required customer set + distinct pairs).

---

## Summary

- Relational division solves “for all” problems (“every required thing”).
- Deduplicate to one row per entity per required item.
- Compare match counts to the required set size.
