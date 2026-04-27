“Gaps and islands” is a classic SQL pattern.

It shows up whenever you need to find:

- consecutive-day streaks (activity streaks)
- missing dates (days with zero activity)
- continuous ranges of the same status (subscription active periods)

This lesson teaches a few practical patterns that work well in PostgreSQL.

---

## Step 0: get one row per entity per day

Most streak problems want “did something happen on that day?”, not “how many times”.

Start by deduplicating:

```sql
WITH user_days AS (
  SELECT DISTINCT
    user_id,
    DATE(created_at) AS day
  FROM social_posts
)
SELECT *
FROM user_days
ORDER BY user_id, day;
```

---

## Pattern 1: Islands of consecutive days using `ROW_NUMBER()`

If you assign `ROW_NUMBER()` to each user’s days, the difference between:

- the day value
- and the row number (as a day interval)

stays constant within a consecutive streak.

### Find streak ranges per user

```sql
WITH user_days AS (
  SELECT DISTINCT user_id, DATE(created_at) AS day
  FROM social_posts
),
numbered AS (
  SELECT
    user_id,
    day,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) AS rn
  FROM user_days
),
islands AS (
  SELECT
    user_id,
    day,
    (day - rn * INTERVAL '1 day') AS island_key
  FROM numbered
)
SELECT
  user_id,
  MIN(day) AS streak_start,
  MAX(day) AS streak_end,
  COUNT(*) AS days_in_streak
FROM islands
GROUP BY user_id, island_key
ORDER BY user_id, streak_start;
```

Output conceptually looks like:

| user_id | streak_start | streak_end   | days_in_streak |
|--------:|--------------|--------------|---------------:|
| 7       | 2026-03-01   | 2026-03-03   | 3              |
| 7       | 2026-03-06   | 2026-03-07   | 2              |

---

## Pattern 2: Longest streak per user

Once you have streak rows, pick the best per user:

```sql
WITH user_days AS (
  SELECT DISTINCT user_id, DATE(created_at) AS day
  FROM social_posts
),
numbered AS (
  SELECT
    user_id,
    day,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY day) AS rn
  FROM user_days
),
islands AS (
  SELECT
    user_id,
    day,
    (day - rn * INTERVAL '1 day') AS island_key
  FROM numbered
),
streaks AS (
  SELECT
    user_id,
    MIN(day) AS streak_start,
    MAX(day) AS streak_end,
    COUNT(*) AS days_in_streak
  FROM islands
  GROUP BY user_id, island_key
)
SELECT DISTINCT ON (user_id)
  user_id,
  streak_start,
  streak_end,
  days_in_streak
FROM streaks
ORDER BY user_id, days_in_streak DESC, streak_end DESC;
```

---

## Pattern 3: Missing days using `generate_series`

To find days with **zero** events, build a calendar.

Example: last 14 days post counts (including zero days):

```sql
WITH days AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '13 days',
    CURRENT_DATE,
    INTERVAL '1 day'
  )::date AS day
),
post_counts AS (
  SELECT DATE(created_at) AS day, COUNT(*) AS post_count
  FROM social_posts
  WHERE created_at >= CURRENT_DATE - INTERVAL '13 days'
  GROUP BY DATE(created_at)
)
SELECT
  d.day,
  COALESCE(pc.post_count, 0) AS post_count
FROM days d
LEFT JOIN post_counts pc ON pc.day = d.day
ORDER BY d.day;
```

To list only missing days:

```sql
... WHERE COALESCE(pc.post_count, 0) = 0
```

---

## Pattern 4: Islands of a status (not dates)

Gaps/islands also applies to “status changes”.

Example: consecutive runs of the same `status` per customer in `ecommerce_orders`.

```sql
WITH ordered AS (
  SELECT
    customer_id,
    id AS order_id,
    created_at,
    status,
    LAG(status) OVER (
      PARTITION BY customer_id
      ORDER BY created_at, id
    ) AS prev_status
  FROM ecommerce_orders
),
marked AS (
  SELECT
    *,
    CASE WHEN prev_status IS DISTINCT FROM status THEN 1 ELSE 0 END AS is_new_group
  FROM ordered
),
grouped AS (
  SELECT
    *,
    SUM(is_new_group) OVER (
      PARTITION BY customer_id
      ORDER BY created_at, order_id
    ) AS group_id
  FROM marked
)
SELECT
  customer_id,
  status,
  MIN(created_at) AS group_start,
  MAX(created_at) AS group_end,
  COUNT(*) AS orders_in_group
FROM grouped
GROUP BY customer_id, status, group_id
ORDER BY customer_id, group_start;
```

---

## Common mistakes

- Not deduplicating to one row per day before streak logic.
- Forgetting time zone rules for `DATE(created_at)`.
- Missing deterministic ordering (add `id` as a tie-breaker).

---

## Check yourself (practice)

1. Find each user’s longest posting streak in `social_posts`.
2. Find days in the last 30 days with zero likes in `social_likes`.
3. Find consecutive islands of the same order status per customer.

---

## Summary

- Use `ROW_NUMBER()` tricks to group consecutive dates into streaks.
- Use `generate_series` to build calendars and detect missing days.
- For status islands, use `LAG` + running sums of change markers.
