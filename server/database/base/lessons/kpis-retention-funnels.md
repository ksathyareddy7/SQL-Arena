Once you know SQL fundamentals, the next step is learning to answer business questions reliably:

- How many users did we acquire this week?
- What percent converted?
- Are users retained after day 1 / day 7?
- Where does the funnel drop off?

This lesson teaches practical SQL patterns for KPI queries using the project’s schemas.

Important note:

- KPI SQL is mostly about **good definitions** and **good time windows**
- the SQL mechanics are usually `GROUP BY`, date bucketing, conditional aggregation, and sometimes window functions

---

## 1) KPI building blocks

Most KPI queries use these ingredients:

- a clean event table (posts, likes, orders, payments)
- a time bucket (`DATE(created_at)`, `DATE_TRUNC('week', ...)`, etc.)
- a clear denominator (what you divide by)
- null-safe math (`NULLIF` for divide-by-zero)

---

## 2) Funnel basics (counts at each step)

Example funnel (social app):

1) user signed up  
2) user created a post  
3) user received at least 1 like  

We’ll compute counts per step for users created in the last 30 days.

```sql
WITH cohort AS (
  SELECT id AS user_id
  FROM social_users
  WHERE created_at >= NOW() - INTERVAL '30 days'
),
posted AS (
  SELECT DISTINCT p.user_id
  FROM social_posts p
  JOIN cohort c ON c.user_id = p.user_id
),
received_like AS (
  SELECT DISTINCT p.user_id
  FROM social_posts p
  JOIN social_likes l ON l.post_id = p.id
  JOIN cohort c ON c.user_id = p.user_id
)
SELECT
  (SELECT COUNT(*) FROM cohort) AS signed_up,
  (SELECT COUNT(*) FROM posted) AS posted,
  (SELECT COUNT(*) FROM received_like) AS received_like;
```

This is a clean, modular funnel query.

---

## 3) Funnel conversion rates (percentages)

We can compute conversion rates by dividing step counts:

```sql
WITH cohort AS (
  SELECT id AS user_id
  FROM social_users
  WHERE created_at >= NOW() - INTERVAL '30 days'
),
posted AS (
  SELECT DISTINCT p.user_id
  FROM social_posts p
  JOIN cohort c ON c.user_id = p.user_id
),
received_like AS (
  SELECT DISTINCT p.user_id
  FROM social_posts p
  JOIN social_likes l ON l.post_id = p.id
  JOIN cohort c ON c.user_id = p.user_id
),
counts AS (
  SELECT
    (SELECT COUNT(*) FROM cohort) AS signed_up,
    (SELECT COUNT(*) FROM posted) AS posted,
    (SELECT COUNT(*) FROM received_like) AS received_like
)
SELECT
  signed_up,
  posted,
  received_like,
  ROUND(100.0 * posted / NULLIF(signed_up, 0), 2) AS signup_to_post_pct,
  ROUND(100.0 * received_like / NULLIF(posted, 0), 2) AS post_to_like_pct
FROM counts;
```

`NULLIF` prevents divide-by-zero errors.

---

## 4) Retention basics (day N retention)

Day N retention asks:

> of users who signed up on day 0, how many were active again on day N?

We need:

- each user’s signup day
- activity days (pick a consistent activity event; here we’ll use `social_posts`)

### Day-1 retention (users who posted the day after signup)

```sql
WITH signups AS (
  SELECT
    id AS user_id,
    DATE(created_at) AS signup_day
  FROM social_users
  WHERE created_at >= NOW() - INTERVAL '30 days'
),
activity AS (
  SELECT DISTINCT
    user_id,
    DATE(created_at) AS activity_day
  FROM social_posts
)
SELECT
  s.signup_day,
  COUNT(*) AS signed_up,
  COUNT(*) FILTER (
    WHERE EXISTS (
      SELECT 1
      FROM activity a
      WHERE a.user_id = s.user_id
        AND a.activity_day = s.signup_day + INTERVAL '1 day'
    )
  ) AS retained_day_1
FROM signups s
GROUP BY s.signup_day
ORDER BY s.signup_day;
```

This uses a correlated `EXISTS` to check if the user was active on day 1.

In practice, you might rewrite this to avoid correlated checks if the dataset is huge, but it’s a great starting point for correctness.

---

## 5) Cohorts (weekly cohorts with retention)

A cohort groups users by their signup week (or month).

Example: weekly signup cohorts and “posted within 7 days” retention.

```sql
WITH signups AS (
  SELECT
    id AS user_id,
    DATE_TRUNC('week', created_at)::date AS signup_week,
    created_at AS signup_ts
  FROM social_users
  WHERE created_at >= NOW() - INTERVAL '90 days'
),
posts AS (
  SELECT user_id, created_at
  FROM social_posts
)
SELECT
  s.signup_week,
  COUNT(*) AS users_in_cohort,
  COUNT(*) FILTER (
    WHERE EXISTS (
      SELECT 1
      FROM posts p
      WHERE p.user_id = s.user_id
        AND p.created_at >= s.signup_ts
        AND p.created_at <  s.signup_ts + INTERVAL '7 days'
    )
  ) AS posted_within_7d,
  ROUND(
    100.0 * COUNT(*) FILTER (
      WHERE EXISTS (
        SELECT 1
        FROM posts p
        WHERE p.user_id = s.user_id
          AND p.created_at >= s.signup_ts
          AND p.created_at <  s.signup_ts + INTERVAL '7 days'
      )
    ) / NULLIF(COUNT(*), 0),
    2
  ) AS posted_within_7d_pct
FROM signups s
GROUP BY s.signup_week
ORDER BY s.signup_week;
```

---

## 6) Practical advice: definitions first

KPI SQL is only as good as your definitions. Clarify:

- “active” means what event? posts? likes? logins? purchases?
- is the window calendar-based or rolling?
- how do you handle time zones?
- do you count users, events, or sessions?

Write definitions in the dashboard doc before writing SQL.

---

## Common mistakes

- Mixing calendar and rolling windows (see the date filtering lesson).
- Counting events when you mean users (dedupe with `DISTINCT user_id`).
- Double counting due to joins (pre-aggregate child tables).
- Not protecting percentages from divide-by-zero (`NULLIF`).

---

## Check yourself (practice)

1. Build a funnel for ecommerce:
   - customers who placed an order
   - customers who paid
   - customers who reviewed
2. Create weekly cohorts and compute “ordered within 14 days” retention.
3. Add a KPI query that returns a single row with:
   - orders today
   - orders last 7 days
   - paid revenue last 7 days

---

## Summary

- Funnels = modular steps + clean denominators.
- Retention/cohorts = consistent time definitions + user-level deduping.
- KPI correctness depends on definitions, time windows, and avoiding row multiplication.
