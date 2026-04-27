`CASE` lets you write **if / else logic inside SQL**.

You’ll use it for:

- turning raw values into labels (“easy/medium/hard”)
- bucketing numbers into ranges (“0–9”, “10–99”, “100+”)
- conditional metrics (“count only verified users”)
- simple scoring and reporting rules

---

## The two forms of `CASE`

### 1) Searched `CASE` (most common)

```sql
CASE
  WHEN <condition> THEN <value>
  WHEN <condition> THEN <value>
  ELSE <value>
END
```

### 2) Simple `CASE`

```sql
CASE <expression>
  WHEN <value> THEN <result>
  WHEN <value> THEN <result>
  ELSE <result>
END
```

Use the searched form unless you specifically want “match exact value”.

---

## Example 1: Label users as verified/unverified

```sql
SELECT
  id AS user_id,
  username,
  CASE
    WHEN is_verified THEN 'verified'
    ELSE 'unverified'
  END AS verification_label
FROM social_users
ORDER BY user_id;
```

Notes:

- `is_verified` is already boolean, so `WHEN is_verified THEN ...` is fine
- `ELSE` is important so the result is never null

---

## Example 2: Bucket posts by media type (handle `NULL`)

```sql
SELECT
  id AS post_id,
  CASE
    WHEN media_type = 'video' THEN 'video'
    WHEN media_type = 'image' THEN 'image'
    WHEN media_type IS NULL THEN 'no media'
    ELSE 'other'
  END AS media_bucket
FROM social_posts
ORDER BY post_id;
```

This is useful when you want a fixed set of categories for a chart.

---

## Example 3: Turn counts into “levels”

LeetCode-style activity levels often look like “0, 1–2, 3–5, 6+”.

Daily likes bucketed into levels:

```sql
WITH daily_likes AS (
  SELECT DATE(created_at) AS day, COUNT(*) AS likes
  FROM social_likes
  GROUP BY DATE(created_at)
)
SELECT
  day,
  likes,
  CASE
    WHEN likes = 0 THEN 0
    WHEN likes BETWEEN 1 AND 2 THEN 1
    WHEN likes BETWEEN 3 AND 5 THEN 2
    ELSE 3
  END AS level
FROM daily_likes
ORDER BY day;
```

---

## Example 4: Conditional totals with `CASE` (classic pattern)

Even though PostgreSQL supports `FILTER`, `CASE` is portable and widely understood.

```sql
SELECT
  COUNT(*) AS total_users,
  SUM(CASE WHEN is_verified THEN 1 ELSE 0 END) AS verified_users,
  SUM(CASE WHEN profile_image_url IS NULL THEN 1 ELSE 0 END) AS users_without_avatar
FROM social_users;
```

---

## Practical rules for writing good `CASE`

### Rule 1: Order matters

The first matching `WHEN` wins. Put more specific conditions first.

### Rule 2: Always think about `NULL`

Comparisons like `media_type = 'video'` return `NULL` when `media_type` is `NULL`.

If you need a “null bucket”, write it explicitly.

### Rule 3: Keep result types consistent

All branches should return compatible types. Don’t mix numbers and text.

Good:

```sql
CASE WHEN ... THEN 1 ELSE 0 END
```

Good:

```sql
CASE WHEN ... THEN 'yes' ELSE 'no' END
```

Risky:

```sql
CASE WHEN ... THEN 1 ELSE 'no' END
```

---

## Common mistakes

### Mistake 1: Forgetting `ELSE`

If no `WHEN` matches and there’s no `ELSE`, the result is `NULL`.

That may be fine, but often it’s accidental.

### Mistake 2: Using `CASE` in `WHERE` when simpler conditions work

Instead of:

```sql
WHERE CASE WHEN is_verified THEN true ELSE false END
```

Just do:

```sql
WHERE is_verified
```

Use `CASE` for computed labels/metrics, not for basic filtering.

---

## Check yourself (practice)

1. Bucket `ecommerce_orders` into:
   - “small” (total < 50)
   - “medium” (50–200)
   - “large” (200+)
2. Return one row with:
   - total posts
   - video posts
   - posts with location
   using `SUM(CASE ...)` expressions.
3. Label `social_users` by “bio present” vs “bio missing” (treat `NULL` and `''` as missing).

---

## Summary

- `CASE` is SQL’s if/else.
- Use it to label, bucket, and compute conditional metrics.
- Remember: order matters, handle `NULL`, and keep return types consistent.
