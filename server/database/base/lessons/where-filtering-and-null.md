`WHERE` is how you filter rows.

It answers questions like:

- “only video posts”
- “likes created today”
- “users without an avatar”
- “orders with status delivered”

This lesson covers:

- basic comparisons
- combining conditions with `AND` / `OR`
- working safely with `NULL`
- common beginner mistakes

---

## What `WHERE` does (simple mental model)

`WHERE` keeps only rows where the condition is true.

```sql
SELECT id, media_type
FROM social_posts
WHERE media_type = 'video';
```

If a row doesn’t match the condition, it’s excluded.

---

## 1) Basic comparisons

### Equality

```sql
SELECT id, username
FROM social_users
WHERE username = 'alice';
```

### Inequality

```sql
SELECT id, price
FROM ecommerce_products
WHERE price <> 0;
```

### Greater-than / less-than

```sql
SELECT id, price
FROM ecommerce_products
WHERE price > 100
ORDER BY price DESC, id ASC
LIMIT 10;
```

---

## 2) Combine conditions with `AND` / `OR`

### `AND`: both must be true

```sql
SELECT id, price, is_active
FROM ecommerce_products
WHERE is_active = true
  AND price >= 100
ORDER BY price DESC, id ASC
LIMIT 10;
```

### `OR`: either can be true

```sql
SELECT id, media_type
FROM social_posts
WHERE media_type = 'video'
   OR media_type = 'image'
LIMIT 20;
```

### Parentheses matter

If you mix `AND` and `OR`, use parentheses for clarity.

```sql
SELECT id, media_type, location
FROM social_posts
WHERE (media_type = 'video' OR media_type = 'image')
  AND location IS NOT NULL;
```

---

## 3) `IN` and `BETWEEN` (readability helpers)

### `IN`

```sql
SELECT id, media_type
FROM social_posts
WHERE media_type IN ('video', 'image')
LIMIT 20;
```

### `BETWEEN` (inclusive)

```sql
SELECT id, price
FROM ecommerce_products
WHERE price BETWEEN 50 AND 100
ORDER BY price ASC, id ASC
LIMIT 20;
```

---

## 4) Filtering timestamps (range filters)

For “today” or “last N days”, prefer range predicates.

Likes created today:

```sql
SELECT COUNT(*) AS likes_today
FROM social_likes
WHERE created_at >= CURRENT_DATE
  AND created_at < CURRENT_DATE + INTERVAL '1 day';
```

Posts created in the last 24 hours (rolling window):

```sql
SELECT COUNT(*) AS recent_posts
FROM social_posts
WHERE created_at >= NOW() - INTERVAL '24 hours';
```

---

## 5) `NULL` (the most important `WHERE` topic)

`NULL` means “missing/unknown”.

It is not:

- `0`
- `''` (empty string)
- `false`

### You cannot compare with `= NULL`

This is always wrong:

```sql
-- wrong
SELECT *
FROM social_users
WHERE profile_image_url = NULL;
```

Use `IS NULL` / `IS NOT NULL`:

```sql
SELECT COUNT(*) AS users_without_avatar
FROM social_users
WHERE profile_image_url IS NULL;
```

---

## 6) “NULL or empty string” (very common data-cleanup pattern)

Some datasets store “missing” as `NULL`, others as `''`, sometimes both.

Users with empty bio (either missing or empty string):

```sql
SELECT COUNT(*) AS empty_bio_users
FROM social_users
WHERE bio IS NULL OR bio = '';
```

A neat normalization trick is `NULLIF`:

```sql
SELECT COUNT(*) AS empty_bio_users
FROM social_users
WHERE NULLIF(bio, '') IS NULL;
```

This turns `''` into `NULL`, so one check handles both cases.

---

## 7) Three-valued logic (why `NULL` is tricky)

In SQL, conditions can evaluate to:

- `TRUE`
- `FALSE`
- `NULL` (unknown)

In a `WHERE` clause:

- only `TRUE` rows are kept
- `FALSE` and `NULL` rows are dropped

That’s why `col = NULL` behaves strangely: it evaluates to unknown, not true.

---

## Common mistakes (and fixes)

### Mistake 1: forgetting parentheses with `AND`/`OR`

Be explicit:

```sql
WHERE (a OR b) AND c
```

### Mistake 2: using `= NULL`

Always use `IS NULL`.

### Mistake 3: filtering on `DATE(created_at)` for “today”

Prefer a range filter for correctness and performance:

```sql
WHERE created_at >= CURRENT_DATE
  AND created_at < CURRENT_DATE + INTERVAL '1 day'
```

---

## Practice: check yourself

1) Count video posts in `social_posts` as `video_posts`.
2) Count users without profile image as `users_without_avatar`.
3) Count likes created today as `likes_today` (use a range filter).
4) Count users with empty bio (both `NULL` and `''`) as `empty_bio_users`.

---

## Summary

- `WHERE` filters rows.
- Use `AND` / `OR` to combine conditions (use parentheses for clarity).
- Treat `NULL` carefully: use `IS NULL` / `IS NOT NULL`.
- Prefer time range filters for timestamps.
