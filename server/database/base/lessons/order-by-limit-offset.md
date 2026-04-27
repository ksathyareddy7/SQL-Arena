If you want a predictable order, you must specify it.

Databases are free to return rows in any order unless you use `ORDER BY`.

This lesson covers:

- sorting ascending/descending
- multi-column tie-breakers
- `LIMIT` for Top‑N
- `OFFSET` for pagination (and why it can get slow)

---

## 1) `ORDER BY` basics

Sort newest posts first:

```sql
SELECT id, created_at
FROM social_posts
ORDER BY created_at DESC
LIMIT 10;
```

If you omit `DESC`, the default is ascending:

```sql
SELECT id, price
FROM ecommerce_products
ORDER BY price
LIMIT 10;
```

---

## 2) Tie-breakers (very important)

If two rows share the same sort key, the database can return them in any order unless you add a second key.

Always add a deterministic tie-breaker when:

- you’re showing results to users
- you’re doing Top‑N
- a question requires ordering for correctness

Example:

```sql
SELECT id, created_at
FROM social_posts
ORDER BY created_at DESC, id DESC
LIMIT 10;
```

Here:

- `created_at DESC` sorts by time
- `id DESC` breaks ties

---

## 3) Sort by computed columns (aliases help)

You can sort by an expression:

```sql
SELECT
  id,
  price,
  (price * 0.9) AS discounted_price
FROM ecommerce_products
ORDER BY discounted_price DESC, id ASC
LIMIT 10;
```

In PostgreSQL, ordering by the alias (`discounted_price`) is allowed and keeps the query readable.

---

## 4) Top‑N with `LIMIT`

Find the 5 users with the most comments:

```sql
SELECT user_id, COUNT(*) AS comment_count
FROM social_comments
GROUP BY user_id
ORDER BY comment_count DESC, user_id ASC
LIMIT 5;
```

This pattern shows up constantly:

- aggregate
- order by the aggregate
- limit

---

## 5) `OFFSET` pagination (use carefully)

Basic pagination:

```sql
SELECT id, title, created_at
FROM social_posts
ORDER BY created_at DESC, id DESC
LIMIT 20
OFFSET 20;
```

Meaning:

- `LIMIT 20` returns 20 rows
- `OFFSET 20` skips the first 20 rows

### Why `OFFSET` can be slow

With large offsets, the database still has to “walk past” the skipped rows.

For deep pagination, keyset pagination is usually better (advanced topic).

---

## 6) `ORDER BY ... LIMIT 1` for “latest row”

Sometimes you want the latest timestamp:

```sql
SELECT created_at AS latest_like_time
FROM social_likes
ORDER BY created_at DESC
LIMIT 1;
```

Often `MAX(created_at)` is simpler:

```sql
SELECT MAX(created_at) AS latest_like_time
FROM social_likes;
```

Use `ORDER BY ... LIMIT 1` when you might later want additional columns from that latest row.

---

## Common mistakes (and fixes)

### Mistake 1: missing tie-breakers

Fix:

```sql
ORDER BY count DESC, id ASC
```

### Mistake 2: ordering before filtering

Always filter first (`WHERE`), then order and limit.

### Mistake 3: using `OFFSET` for infinite scroll at huge page numbers

Consider keyset pagination for large datasets (advanced).

---

## Practice: check yourself

1) Return the latest signup timestamp from `social_users` using `ORDER BY ... LIMIT 1`.
2) Return the top 5 most expensive products (`ORDER BY price DESC, id ASC LIMIT 5`).
3) Return the top 5 users by comments made, ordered by `comment_count DESC, user_id ASC`.
4) Explain in one sentence why tie-breakers matter.

---

## Summary

- `ORDER BY` gives predictable ordering; otherwise results are not guaranteed ordered.
- Use tie-breakers for stable and testable outputs.
- `LIMIT` is how you do Top‑N queries.
- `OFFSET` works but can get slow for deep pagination.
