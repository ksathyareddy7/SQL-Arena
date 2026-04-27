Date/time filters are deceptively tricky:

- a query looks “right” but misses rows
- it’s correct but slow (not index-friendly)
- timezone edges make “today” behave differently than you expect

This lesson focuses on **safe, practical patterns** for filtering timestamps in PostgreSQL.

---

## Two kinds of “time windows”

### 1) Calendar windows (human time)

- today
- this week / month
- March 2026

These align to calendar boundaries (midnight, month start, etc.).

### 2) Rolling windows (duration)

- last 24 hours
- last 7 days
- last 30 minutes

These align to “now minus a duration”.

Mixing these up is a common bug.

---

## The biggest performance rule: avoid wrapping the column

This is readable but often less index-friendly:

```sql
SELECT COUNT(*) AS likes_today
FROM social_likes
WHERE DATE(created_at) = CURRENT_DATE;
```

Prefer a range filter when possible:

```sql
SELECT COUNT(*) AS likes_today
FROM social_likes
WHERE created_at >= CURRENT_DATE
  AND created_at <  CURRENT_DATE + INTERVAL '1 day';
```

Why this is better:

- `created_at` can be used directly by an index
- the range is precise (includes midnight-to-midnight)

---

## Pattern 1: “Today” (calendar day)

Count posts created today:

```sql
SELECT COUNT(*) AS posts_today
FROM social_posts
WHERE created_at >= CURRENT_DATE
  AND created_at <  CURRENT_DATE + INTERVAL '1 day';
```

If your app uses a specific business timezone, be careful: `CURRENT_DATE` depends on the session timezone.

---

## Pattern 2: “This month”

Count users who joined this month:

```sql
SELECT COUNT(*) AS user_count
FROM social_users
WHERE created_at >= DATE_TRUNC('month', NOW())
  AND created_at <  DATE_TRUNC('month', NOW()) + INTERVAL '1 month';
```

This is usually preferable to:

```sql
WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())
```

Because it avoids applying a function to the column.

---

## Pattern 3: Rolling windows (“last 24 hours”, “last 7 days”)

Posts created in the last 24 hours:

```sql
SELECT COUNT(*) AS recent_posts
FROM social_posts
WHERE created_at >= NOW() - INTERVAL '24 hours';
```

This includes “exactly 24 hours ago up to now”, not “since midnight”.

---

## Pattern 4: Filtering by a specific date range (inclusive/exclusive)

Suppose you want March 2026 (calendar month) in a report:

```sql
SELECT COUNT(*) AS posts_in_march
FROM social_posts
WHERE created_at >= TIMESTAMP '2026-03-01'
  AND created_at <  TIMESTAMP '2026-04-01';
```

Why `< 2026-04-01` instead of `<= 2026-03-31 23:59:59`?

- it avoids off-by-one errors
- it avoids issues with fractional seconds
- it’s a standard “half-open interval” pattern: `[start, end)`

---

## Pattern 5: Grouping by day (time-series)

Daily post volume for the last 30 days:

```sql
SELECT
  DATE(created_at) AS day,
  COUNT(*) AS post_count
FROM social_posts
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY day ASC;
```

If you need strict “calendar days” in a specific timezone, you may need explicit timezone conversion (see “Timezones” lesson).

Example output:

| day        | post_count |
|------------|-----------:|
| 2026-03-03 | 120        |
| 2026-03-04 | 98         |
| 2026-03-05 | 140        |

---

## `NOW()` vs `CURRENT_DATE` vs `CURRENT_TIMESTAMP`

- `NOW()` / `CURRENT_TIMESTAMP` → timestamp “right now”
- `CURRENT_DATE` → date “today” (midnight boundary)

Use:

- `CURRENT_DATE` for calendar-day ranges
- `NOW()` for rolling windows

---

## Common mistakes

### Mistake 1: Using `BETWEEN` for timestamps

`BETWEEN` is inclusive on both ends, which can surprise you.

Instead of:

```sql
WHERE created_at BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 day'
```

Prefer:

```sql
WHERE created_at >= CURRENT_DATE
  AND created_at <  CURRENT_DATE + INTERVAL '1 day'
```

### Mistake 2: Casting in the filter

`WHERE created_at::date = CURRENT_DATE` is readable, but you’re applying a function to the column.

### Mistake 3: Confusing “last 7 days” with “this week”

- “last 7 days” is rolling
- “this week” usually means “since the week boundary” (Monday/Sunday)

---

## Check yourself (practice)

Write queries for:

1. Likes created yesterday (calendar day).
2. Orders created in the last 7 days (rolling).
3. New users per day for the current month.
4. Posts created between two timestamps (use a half-open interval).

---

## Summary

- Decide first: **calendar window** vs **rolling window**.
- Prefer range filters (`>= start AND < end`) over casting the column.
- Use half-open intervals to avoid time precision bugs.
