`SELECT` is the starting point of almost every SQL query.

In this lesson you’ll learn how to:

- choose columns
- read from a table
- rename output columns (aliases)
- limit rows while exploring data

We’ll use tables from SQL Arena’s schemas (`social_*`, `ecommerce_*`) so the examples feel real.

## What `SELECT` does (simple mental model)

Think of a table like a spreadsheet:

- rows = records
- columns = fields

A `SELECT` query:

1. chooses a table (`FROM`)
2. chooses which columns to show (`SELECT`)
3. optionally shapes the result (`AS`, expressions)
4. optionally limits/sorts rows (`LIMIT`, `ORDER BY`)

### 1) Selecting columns from a table

Start with a simple “show me columns” query:

```sql
SELECT id, username, created_at
FROM social_users;
```

Output shape:

|  id | username | created_at          |
| --: | -------- | ------------------- |
|   1 | alice    | 2026-03-20 10:11:12 |
|   2 | bob      | 2026-03-21 09:01:03 |

#### Selecting a single column

```sql
SELECT username
FROM social_users;
```

### 2) `SELECT *` (when it’s okay, when it isn’t)

`SELECT *` means “all columns”.

```sql
SELECT *
FROM social_posts
LIMIT 10;
```

Use it for quick exploration.

Avoid it for:

- production queries
- dashboards
- API responses

Why:

- you might return unnecessary data
- columns can change over time, breaking consumers
- it can be slower than selecting only what you need

### 3) `LIMIT` for exploration

When you’re learning a schema, always add a limit.

```sql
SELECT id, title, created_at
FROM social_posts
LIMIT 10;
```

This makes your queries safer and faster while exploring.

### 4) Column aliases (`AS`) for readable output

Aliases rename output columns.

```sql
SELECT COUNT(*) AS user_count
FROM social_users;
```

Output shape:

| user_count |
| ---------: |
|      50000 |

Aliases are especially important when:

- you compute expressions
- you return aggregates (`COUNT`, `SUM`, `AVG`)
- you want UI-friendly column names

### 5) Expressions in `SELECT` (computed columns)

You can compute values directly in `SELECT`.

#### Example: line totals (order items)

```sql
SELECT
  order_id,
  product_id,
  quantity,
  unit_price,
  (quantity * unit_price) AS line_total
FROM ecommerce_order_items
ORDER BY line_total DESC
LIMIT 10;
```

#### Example: a derived “day” column

```sql
SELECT
  id,
  created_at,
  DATE(created_at) AS created_day
FROM social_posts
ORDER BY created_day DESC, id DESC
LIMIT 10;
```

Practical note:

- using `DATE(created_at)` is great for display/grouping
- for filtering “today”, prefer a range filter (covered in the dates lesson)

### 6) Table aliases (short names)

Table aliases make queries shorter and reduce ambiguity in joins.

```sql
SELECT u.id, u.username
FROM social_users u
ORDER BY u.id ASC
LIMIT 5;
```

Once you start joining, table aliases become the norm.

### 7) Getting “a feel” for a table (a practical checklist)

When you see a new table, try these:

#### A) Preview a few rows

```sql
SELECT *
FROM ecommerce_products
LIMIT 10;
```

#### B) Count rows

```sql
SELECT COUNT(*) AS row_count
FROM ecommerce_products;
```

#### C) List distinct values of a column (categories, media types)

```sql
SELECT DISTINCT media_type
FROM social_posts
ORDER BY media_type ASC;
```

### Common mistakes (and how to avoid them)

#### Mistake 1: forgetting `FROM`

`SELECT` needs a source table:

```sql
-- wrong
SELECT id, username;
```

#### Mistake 2: unclear column names in outputs

If you return `COUNT(*)` without an alias, many UIs show it as `count` or `?column?`.

Always alias aggregates:

```sql
SELECT COUNT(*) AS total_posts
FROM social_posts;
```

#### Mistake 3: not limiting exploratory queries

When in doubt, add `LIMIT 10` while learning.

### Practice: check yourself

1. Select `id`, `username`, and `created_at` from `social_users` and show only 10 rows.
2. Return the total number of posts as `post_count`.
3. Select the top 10 most expensive products:
   - return `id`, `name`, `price`
   - order by price descending (tie-break by `id` ascending)
4. Return `order_id` and `line_total` (`quantity * unit_price`) for the 10 largest line totals.

### Summary

- `SELECT` chooses columns; `FROM` chooses the table.
- Use `LIMIT` while exploring.
- Use `AS` to create readable output column names.
- Expressions in `SELECT` let you compute derived columns.
