In SQL, `NULL` means “missing / unknown”.

It is **not** the same as:

- `0`
- `''` (empty string)
- `false`

This lesson covers three essential tools:

- `COALESCE` (pick the first non-null value)
- `NULLIF` (turn a specific value into `NULL`)
- NULL-safe comparison patterns (so you don’t miss rows)

---

## `COALESCE`: “first non-null wins”

`COALESCE(a, b, c)` returns the first argument that is not `NULL`.

### Example 1: Display a fallback when a value is missing

```sql
SELECT
  id AS user_id,
  username,
  COALESCE(city, 'Unknown') AS city_display
FROM social_users
ORDER BY user_id;
```

### Example 2: Treat missing counts as `0`

Likes per post (include posts with zero likes):

```sql
WITH post_like_counts AS (
  SELECT post_id, COUNT(*) AS like_count
  FROM social_likes
  GROUP BY post_id
)
SELECT
  p.id AS post_id,
  COALESCE(plc.like_count, 0) AS like_count
FROM social_posts p
LEFT JOIN post_like_counts plc ON plc.post_id = p.id
ORDER BY p.id;
```

Why `COALESCE` matters here:

- left join produces `NULL` for posts with no matching likes
- `COALESCE(..., 0)` converts that to a useful number

---

## `NULLIF`: “turn this value into NULL”

`NULLIF(a, b)` returns:

- `NULL` if `a = b`
- otherwise returns `a`

### Example 3: Convert empty strings to `NULL`

If you want to treat `''` as missing:

```sql
SELECT
  id AS user_id,
  NULLIF(bio, '') AS bio_normalized
FROM social_users
ORDER BY user_id;
```

This is great for cleaning “empty but not null” fields.

---

## Safe division (avoid divide-by-zero)

A common analytics bug is dividing by 0.

Use `NULLIF` to turn `0` into `NULL`, which makes the division result `NULL` instead of crashing.

### Example 4: Verified users percentage

```sql
SELECT
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE is_verified) / NULLIF(COUNT(*), 0),
    2
  ) AS verified_percentage
FROM social_users;
```

If there are zero users, the denominator becomes `NULL`, and the whole expression becomes `NULL` (not an error).

---

## NULL-safe comparisons

### Problem: `=` doesn’t behave like you expect with `NULL`

`NULL = NULL` is not `true`. It is `NULL` (unknown).

So this returns zero rows:

```sql
SELECT *
FROM social_users
WHERE city = NULL;
```

Correct way:

```sql
WHERE city IS NULL
```

---

## Pattern 1: Compare values where `NULL` should be treated as equal

PostgreSQL supports `IS NOT DISTINCT FROM` which treats `NULL` as a real comparable value:

```sql
SELECT *
FROM social_users
WHERE city IS NOT DISTINCT FROM 'San Francisco';
```

This behaves like `=` for non-null values, but is also safe around `NULL`.

For comparing two columns:

```sql
SELECT *
FROM social_users
WHERE city IS NOT DISTINCT FROM username;
```

This is useful in “change detection” queries where you want:

- `NULL` vs `NULL` → equal
- `NULL` vs value → different

---

## Pattern 2: Use `COALESCE` only when it matches your business meaning

Sometimes you’ll see:

```sql
WHERE COALESCE(city, '') = COALESCE(other_city, '')
```

This treats `NULL` as empty string.

That might be correct, but only if your app truly treats “missing city” the same as “empty city”.

Prefer `IS NOT DISTINCT FROM` when your goal is “null-safe equality”.

---

## Common mistakes

### Mistake 1: Using `= NULL`

Always use `IS NULL` / `IS NOT NULL`.

### Mistake 2: Using `COALESCE` to fix everything

`COALESCE` is great, but it can hide bugs if the fallback value changes meaning.

Example: `COALESCE(price, 0)` might incorrectly treat “unknown price” as “free”.

### Mistake 3: Forgetting `NULLIF` for safe division

If a denominator can be zero, protect it.

---

## Check yourself (practice)

1. Show `social_users` with a `bio_display` column that shows `'(no bio)'` when `bio` is missing or empty.
2. Compute average likes per liked post per user, and ensure you don’t divide by zero.
3. Write a query that finds users whose `city` changed between two snapshots using `IS DISTINCT FROM` / `IS NOT DISTINCT FROM` logic.

---

## Summary

- `COALESCE` picks the first non-null value.
- `NULLIF` turns a specific value into `NULL` (great for cleaning `''` and safe division).
- Use `IS [NOT] DISTINCT FROM` for true NULL-safe equality in PostgreSQL.
