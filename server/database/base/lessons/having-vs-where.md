Beginners often mix up `WHERE` and `HAVING`.

They both “filter”, but they filter at different times:

- `WHERE` filters **rows**
- `HAVING` filters **groups**

This lesson teaches the difference with practical examples from SQL Arena.

---

## The simple rule

Use:

- `WHERE` when you want to remove rows before grouping
- `HAVING` when you want to remove groups after grouping

---

## Why `HAVING` exists

You can’t use aggregate results in `WHERE` because aggregates are computed **after** the row filtering step.

So SQL gives you `HAVING` for conditions like:

- “users with at least 3 posts”
- “posts with more than 10 likes”

---

## Example 1: users with at least 3 posts (`HAVING`)

```sql
SELECT user_id
FROM social_posts
GROUP BY user_id
HAVING COUNT(*) >= 3
ORDER BY user_id ASC;
```

What happens:

1) group posts by user
2) count posts per user
3) keep only users where the count is at least 3

---

## Example 2: filter rows first (`WHERE`), then group

Question: “Top 3 most commented posts today”.

You must first filter rows to “today”, then group by `post_id`.

```sql
SELECT post_id, COUNT(*) AS comment_count
FROM social_comments
WHERE created_at >= CURRENT_DATE
  AND created_at < CURRENT_DATE + INTERVAL '1 day'
GROUP BY post_id
ORDER BY comment_count DESC, post_id ASC
LIMIT 3;
```

Here `WHERE` reduces work before grouping.

---

## Example 3: `WHERE` and `HAVING` together

Sometimes you need both:

- `WHERE` defines which rows are considered
- `HAVING` defines which groups qualify

Example: users who posted in the last 7 days and posted on all 7 days.

```sql
SELECT user_id
FROM social_posts
WHERE created_at >= CURRENT_DATE - INTERVAL '6 days'
  AND created_at < CURRENT_DATE + INTERVAL '1 day'
GROUP BY user_id
HAVING COUNT(DISTINCT DATE(created_at)) = 7
ORDER BY user_id ASC;
```

---

## Common mistakes (and fixes)

### Mistake 1: using `WHERE COUNT(*) >= ...`

This is invalid SQL:

```sql
SELECT user_id
FROM social_posts
WHERE COUNT(*) >= 3
GROUP BY user_id;
```

Fix: move the aggregate condition to `HAVING`:

```sql
HAVING COUNT(*) >= 3
```

### Mistake 2: using `HAVING` when you only need `WHERE`

If you’re not filtering based on an aggregate, `WHERE` is usually clearer and often faster.

---

## Diagram: execution order (simplified)

```mermaid
flowchart LR
  A["FROM"] --> B["WHERE (filter rows)"]
  B --> C["GROUP BY (make groups)"]
  C --> D["Aggregates (COUNT/SUM/AVG)"]
  D --> E["HAVING (filter groups)"]
  E --> F["ORDER BY / LIMIT"]
```

---

## Practice: check yourself

1) Find users who have given more than 100 likes (`social_likes`).
2) Find posts that have received exactly 10 likes (`social_likes`).
3) Find top 5 users by comments made, ordered by count desc and user_id asc.
4) Explain in one sentence the difference between `WHERE` and `HAVING`.

---

## Summary

- `WHERE` filters rows before grouping.
- `HAVING` filters groups after grouping.
- Use `WHERE` to reduce data early; use `HAVING` for aggregate conditions.
