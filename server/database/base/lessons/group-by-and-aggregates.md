Aggregates answer “summary” questions:

- “How many users signed up this month?”
- “How many likes were created today?”
- “How many comments per post?”
- “What’s the average rating per product?”

`GROUP BY` is how you compute those summaries **per category**:

- per user
- per day
- per post
- per product

This lesson covers the core patterns with practical examples.

---

## 1) Aggregates without `GROUP BY` (one result row)

If you use an aggregate with no `GROUP BY`, you get one row:

```sql
SELECT COUNT(*) AS total_posts
FROM social_posts;
```

```sql
SELECT MAX(created_at) AS latest_signup
FROM social_users;
```

---

## 2) `GROUP BY` creates “one row per group”

Example: comments per user:

```sql
SELECT user_id, COUNT(*) AS comment_count
FROM social_comments
GROUP BY user_id
ORDER BY comment_count DESC, user_id ASC
LIMIT 10;
```

Output shape:

| user_id | comment_count |
|---:|---:|
| 7 | 128 |
| 2 | 121 |

---

## 3) Common aggregates

### `COUNT(*)`

Counts rows:

```sql
SELECT COUNT(*) AS likes_today
FROM social_likes
WHERE created_at >= CURRENT_DATE
  AND created_at < CURRENT_DATE + INTERVAL '1 day';
```

### `SUM(...)`

Adds numeric values:

```sql
SELECT
  order_id,
  ROUND(SUM(quantity * unit_price), 2) AS order_total
FROM ecommerce_order_items
GROUP BY order_id
ORDER BY order_total DESC, order_id ASC
LIMIT 10;
```

### `AVG(...)`

Computes average:

```sql
SELECT
  category_id,
  ROUND(AVG(price), 2) AS avg_price
FROM ecommerce_products
GROUP BY category_id
ORDER BY avg_price DESC, category_id ASC
LIMIT 10;
```

---

## 4) Grouping by dates (daily metrics)

Daily posts:

```sql
SELECT DATE(created_at) AS day, COUNT(*) AS post_count
FROM social_posts
GROUP BY DATE(created_at)
ORDER BY post_count DESC, day ASC
LIMIT 10;
```

Beginner tip:

- `DATE(created_at)` is great for grouping
- for “today” filtering, use timestamp ranges (covered in the dates lesson)

---

## 5) `COUNT(DISTINCT ...)` (unique counts)

How many unique users have commented?

```sql
SELECT COUNT(DISTINCT user_id) AS unique_commenters
FROM social_comments;
```

How many distinct media types exist?

```sql
SELECT COUNT(DISTINCT media_type) AS media_types_count
FROM social_posts;
```

---

## 6) Conditional aggregates (PostgreSQL `FILTER`)

Sometimes you want multiple metrics in one query.

Example: video posts vs total posts:

```sql
SELECT
  COUNT(*) AS total_posts,
  COUNT(*) FILTER (WHERE media_type = 'video') AS video_posts
FROM social_posts;
```

If you prefer a portable style, you can do the same with `SUM(CASE ...)` (covered in the `CASE` lesson).

---

## Common mistakes (and fixes)

### Mistake 1: selecting non-grouped, non-aggregated columns

This is invalid:

```sql
SELECT user_id, created_at, COUNT(*)
FROM social_comments
GROUP BY user_id;
```

Fix:

- either group by `created_at`
- or remove it
- or aggregate it (`MAX(created_at)`), depending on what you want

### Mistake 2: confusing `WHERE` and `HAVING`

- `WHERE` filters rows before grouping
- `HAVING` filters groups after grouping

`HAVING` is covered in the next lesson.

### Mistake 3: forgetting tie-breakers in ordered results

If the question requires ordering, always include deterministic tie-breakers:

```sql
ORDER BY comment_count DESC, user_id ASC
```

---

## Practice: check yourself

1) Return the number of posts per `media_type` from `social_posts`.
2) Return the top 5 users by comments made:
   - `user_id`, `comment_count`
   - ordered by `comment_count DESC, user_id ASC`
3) Return average likes per liked post per user (hint: pre-aggregate likes per post, then group by user).
4) Return daily signup counts for the last 30 days from `social_users` (filter + group by day).

---

## Summary

- Aggregates summarize many rows into one value.
- `GROUP BY` produces one output row per group.
- `COUNT(DISTINCT ...)` counts unique values.
- PostgreSQL `FILTER` is a clean way to compute conditional aggregates.
