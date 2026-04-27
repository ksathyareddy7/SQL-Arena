You already know the basics: an index can speed up lookups.

This lesson goes one level deeper and covers three practical ideas that show up in real projects:

1) **Composite indexes** (multiple columns)
2) **Covering indexes** and **index-only scans**
3) Indexes that make `ORDER BY ... LIMIT` extremely fast

All examples assume PostgreSQL and use tables from SQL Arena.

---

## Why it matters

Most “slow query” problems in real apps are caused by one of these patterns:

- “show recent things for this user” (filter + sort + limit)
- “join many events to a parent table” (join keys)
- “compute a dashboard metric quickly” (hot aggregation paths)

Composite and order-aware indexes are exactly how you make these fast.

---

## Part 1: composite indexes (multi-column)

A composite index indexes more than one column in a specific order.

Example index shape:

```sql
CREATE INDEX ON user_submissions (user_id, created_at DESC);
```

This is designed for queries like:

```sql
SELECT id, question_id, status, created_at
FROM user_submissions
WHERE user_id = 1
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

Why it’s fast:

- `user_id = 1` narrows to a slice of the index
- the slice is already ordered by `created_at DESC`
- `LIMIT 50` means the database can stop early

---

## Column order matters (the most important composite index rule)

An index on `(user_id, created_at)` is great for:

- `WHERE user_id = ?`
- optionally plus `created_at` range filters
- ordering by `created_at`

It is not as helpful for:

- `WHERE created_at >= ...` without a `user_id` filter

If you frequently filter by time across all users, you likely also want an index that starts with `created_at`.

---

## A simple mental model: left-to-right matching

Think of composite indexes like a sorted list:

1) sorted by the first column
2) within that, sorted by the second column
3) and so on

That’s why “leading columns” are everything.

---

## Part 2: covering indexes and index-only scans

Sometimes PostgreSQL can answer a query using only the index, without reading the table rows.

That is called an **index-only scan**.

It can happen when:

- the index contains all columns the query needs
- PostgreSQL can confirm row visibility without visiting the heap (internal optimization)

### Example: “all solved progress rows”

Query:

```sql
SELECT user_id, question_id
FROM user_progress
WHERE status = 'solved';
```

Supporting index:

```sql
CREATE INDEX ON user_progress (status, user_id, question_id);
```

Now the index contains:

- the filter key (`status`)
- the returned columns (`user_id`, `question_id`)

So the table may not need to be read at all.

Practical note:

- index-only scans depend on write patterns and vacuum; they’re not guaranteed
- but the concept is still extremely useful

---

## Part 3: `ORDER BY ... LIMIT` (how indexes make “latest row” fast)

This pattern is everywhere:

```sql
SELECT created_at
FROM social_likes
ORDER BY created_at DESC
LIMIT 1;
```

If there’s an index on `created_at`, PostgreSQL can often:

- jump to the newest entry
- read one row
- stop

That’s much faster than:

- scanning all rows
- sorting them
- then taking the first

Supporting index shape (conceptual):

```sql
CREATE INDEX ON social_likes (created_at DESC);
```

---

## A realistic “recent per user” pattern (very common)

Most apps need “recent activity for a user”.

Example:

```sql
SELECT id, created_at, status
FROM user_submissions
WHERE user_id = 1
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY created_at DESC, id DESC
LIMIT 100;
```

Good index shape:

```sql
CREATE INDEX ON user_submissions (user_id, created_at DESC, id DESC);
```

Notes:

- Including `id` as a tie-breaker can make ordering stable.
- Whether you include it depends on how often ties matter and whether you need deterministic results.

---

## Indexes and joins (don’t forget foreign keys)

Even if PostgreSQL doesn’t always require it for correctness, indexing join keys is crucial for performance at scale.

Example join:

```sql
SELECT p.id, COUNT(*) AS like_count
FROM social_posts p
JOIN social_likes l ON l.post_id = p.id
GROUP BY p.id
ORDER BY like_count DESC, p.id ASC
LIMIT 10;
```

An index on `social_likes(post_id)` makes the join far cheaper as the likes table grows.

---

## Common mistakes (and fixes)

### Mistake 1: indexing a low-selectivity column by itself

Indexing a boolean alone (`is_verified`) may not help if most rows share the same value.

Better:

- use a partial index (see indexes advanced lesson)
- or combine with another selective column

### Mistake 2: “index everything”

Indexes cost:

- disk space
- write overhead

Add indexes for real query patterns, not guesses.

### Mistake 3: using non-sargable filters

Indexes on `created_at` help with range queries.

They help less when you do:

```sql
WHERE DATE(created_at) = CURRENT_DATE
```

Prefer range filters.

---

## Diagram: how the “fast path” works

```mermaid
flowchart LR
  A["WHERE on leading index columns"] --> B["Scan a small index range"]
  B --> C["Rows already ordered"]
  C --> D["LIMIT stops early"]
  D --> E["Fast result"]
```

---

## Practice: check yourself

1) For “likes today”, which index would help more:
   - `(created_at)`
   - `(DATE(created_at))`
   Why?
2) If you often query a user’s recent submissions, why is `(user_id, created_at DESC)` a good index shape?
3) For “latest like time”, explain in one sentence why `ORDER BY created_at DESC LIMIT 1` can be fast with the right index.
4) Write one query in this project that would benefit from an index on a foreign key (e.g., `post_id` or `customer_id`).

---

## Summary

- Composite indexes speed up “filter by X, sort by Y” queries when the column order matches the query.
- Column order matters: indexes work best left-to-right.
- Covering indexes can enable index-only scans.
- Indexes can make `ORDER BY ... LIMIT` queries extremely fast.
