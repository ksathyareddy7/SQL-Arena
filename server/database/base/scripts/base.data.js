// Single source of truth for base seed data (apps + lessons + tracks + badges).
// This file is generated from the previous base/jsons/* files.

export const appsMap = [
  {
    "name": "social",
    "app_id": 1
  },
  {
    "name": "ecommerce",
    "app_id": 2
  },
  {
    "name": "food",
    "app_id": 3
  },
  {
    "name": "ride",
    "app_id": 4
  },
  {
    "name": "movies",
    "app_id": 5
  },
  {
    "name": "bank",
    "app_id": 6
  },
  {
    "name": "realestate",
    "app_id": 7
  },
  {
    "name": "hospital",
    "app_id": 8
  },
  {
    "name": "education",
    "app_id": 9
  },
  {
    "name": "chat",
    "app_id": 10
  }
];

export function getAppIdByName(name) {
  const n = String(name || "").trim();
  const found = appsMap.find((a) => a.name === n);
  return found ? found.app_id : null;
}

export const lessons = [
  {
    "slug": "select-basics",
    "title": "SELECT Basics: Reading Data",
    "description": "Read columns, shape output, and limit rows.",
    "level": "beginner",
    "lesson_order": 1,
    "tags": [
      "select",
      "from",
      "alias",
      "limit"
    ],
    "estimated_minutes": 18,
    "content_path": "lessons/select-basics.md"
  },
  {
    "slug": "where-filtering-and-null",
    "title": "WHERE: Filtering Rows (and NULL)",
    "description": "Filter rows with comparisons, booleans, and handle NULL correctly.",
    "level": "beginner",
    "lesson_order": 2,
    "tags": [
      "where",
      "null",
      "boolean",
      "comparison"
    ],
    "estimated_minutes": 22,
    "content_path": "lessons/where-filtering-and-null.md"
  },
  {
    "slug": "order-by-limit-offset",
    "title": "ORDER BY + LIMIT: Sorting and Top-N",
    "description": "Stable sorting, tie-breakers, and pagination basics.",
    "level": "beginner",
    "lesson_order": 3,
    "tags": [
      "order_by",
      "limit",
      "offset",
      "sorting"
    ],
    "estimated_minutes": 18,
    "content_path": "lessons/order-by-limit-offset.md"
  },
  {
    "slug": "joins-101",
    "title": "JOINs 101: Connecting Tables",
    "description": "Relationships and combining rows across tables.",
    "level": "beginner",
    "lesson_order": 4,
    "tags": [
      "joins",
      "inner_join",
      "left_join",
      "relationships"
    ],
    "estimated_minutes": 28,
    "content_path": "lessons/joins-101.md"
  },
  {
    "slug": "group-by-and-aggregates",
    "title": "GROUP BY + Aggregates: COUNT, SUM, AVG",
    "description": "Summarize many rows into per-group metrics.",
    "level": "beginner",
    "lesson_order": 5,
    "tags": [
      "group_by",
      "count",
      "sum",
      "avg",
      "aggregation"
    ],
    "estimated_minutes": 26,
    "content_path": "lessons/group-by-and-aggregates.md"
  },
  {
    "slug": "having-vs-where",
    "title": "HAVING vs WHERE",
    "description": "Filter rows with WHERE, filter groups with HAVING.",
    "level": "beginner",
    "lesson_order": 6,
    "tags": [
      "having",
      "where",
      "group_by"
    ],
    "estimated_minutes": 18,
    "content_path": "lessons/having-vs-where.md"
  },
  {
    "slug": "subqueries-in-exists-not-in",
    "title": "Subqueries: IN, EXISTS, NOT EXISTS (and NOT IN pitfalls)",
    "description": "When to use IN vs EXISTS and why NOT IN can be dangerous with NULL.",
    "level": "intermediate",
    "lesson_order": 7,
    "tags": [
      "subquery",
      "exists",
      "in",
      "not_in"
    ],
    "estimated_minutes": 30,
    "content_path": "lessons/subqueries-in-exists-not-in.md"
  },
  {
    "slug": "window-functions-intro",
    "title": "Window Functions: ROW_NUMBER, RANK, LAG, Running Totals",
    "description": "Rankings and running metrics without collapsing rows.",
    "level": "intermediate",
    "lesson_order": 8,
    "tags": [
      "window_functions",
      "row_number",
      "rank",
      "lag"
    ],
    "estimated_minutes": 32,
    "content_path": "lessons/window-functions-intro.md"
  },
  {
    "slug": "dates-and-time-filtering",
    "title": "Dates & Time: DATE_TRUNC, INTERVAL, 'Today' filters",
    "description": "Write correct and index-friendly date filters.",
    "level": "intermediate",
    "lesson_order": 9,
    "tags": [
      "date_functions",
      "date_trunc",
      "interval",
      "sargable"
    ],
    "estimated_minutes": 28,
    "content_path": "lessons/dates-and-time-filtering.md"
  },
  {
    "slug": "distinct-aliases-and-expressions",
    "title": "DISTINCT, Aliases, and Expressions",
    "description": "De-duplicate results, name columns, and build computed output columns.",
    "level": "beginner",
    "lesson_order": 10,
    "tags": [
      "distinct",
      "alias",
      "expression",
      "select"
    ],
    "estimated_minutes": 24,
    "content_path": "lessons/distinct-aliases-and-expressions.md"
  },
  {
    "slug": "types-casting-and-safe-division",
    "title": "Types, Casting, and Safe Division",
    "description": "Avoid integer division surprises, cast deliberately, and handle divide-by-zero.",
    "level": "beginner",
    "lesson_order": 11,
    "tags": [
      "types",
      "cast",
      "numeric",
      "round"
    ],
    "estimated_minutes": 26,
    "content_path": "lessons/types-casting-and-safe-division.md"
  },
  {
    "slug": "case-when-and-bucketing",
    "title": "CASE WHEN: Bucketing and Conditional Logic",
    "description": "Create labels, buckets, and conditional metrics in a single query.",
    "level": "beginner",
    "lesson_order": 12,
    "tags": [
      "case_when",
      "conditional",
      "bucket"
    ],
    "estimated_minutes": 28,
    "content_path": "lessons/case-when-and-bucketing.md"
  },
  {
    "slug": "coalesce-nullif-and-null-safe-equality",
    "title": "COALESCE, NULLIF, and NULL-safe comparisons",
    "description": "Make NULL handling explicit for reporting and comparisons.",
    "level": "beginner",
    "lesson_order": 13,
    "tags": [
      "null",
      "coalesce",
      "nullif",
      "is_distinct_from"
    ],
    "estimated_minutes": 26,
    "content_path": "lessons/coalesce-nullif-and-null-safe-equality.md"
  },
  {
    "slug": "joins-patterns-self-many-to-many-anti",
    "title": "JOIN patterns: self-joins, many-to-many, and anti-joins",
    "description": "Common real-world join shapes and how to keep counts correct.",
    "level": "intermediate",
    "lesson_order": 14,
    "tags": [
      "joins",
      "self_join",
      "many_to_many",
      "anti_join"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/joins-patterns-self-many-to-many-anti.md"
  },
  {
    "slug": "ctes-with-and-query-shaping",
    "title": "WITH (CTEs): break complex queries into steps",
    "description": "Use CTEs for readability and safe staging of intermediate results.",
    "level": "intermediate",
    "lesson_order": 15,
    "tags": [
      "cte",
      "with",
      "readability"
    ],
    "estimated_minutes": 30,
    "content_path": "lessons/ctes-with-and-query-shaping.md"
  },
  {
    "slug": "set-operations-union-intersect-except",
    "title": "Set operations: UNION, UNION ALL, INTERSECT, EXCEPT",
    "description": "Combine result sets correctly and avoid accidental deduplication.",
    "level": "intermediate",
    "lesson_order": 16,
    "tags": [
      "union",
      "union_all",
      "intersect",
      "except"
    ],
    "estimated_minutes": 28,
    "content_path": "lessons/set-operations-union-intersect-except.md"
  },
  {
    "slug": "string-matching-like-ilike-and-search",
    "title": "String matching: LIKE, ILIKE, and search patterns",
    "description": "Find rows by text patterns and write predictable search filters.",
    "level": "intermediate",
    "lesson_order": 17,
    "tags": [
      "like",
      "ilike",
      "strings",
      "search"
    ],
    "estimated_minutes": 28,
    "content_path": "lessons/string-matching-like-ilike-and-search.md"
  },
  {
    "slug": "conditional-aggregation-and-pivoting",
    "title": "Conditional aggregation & pivoting",
    "description": "Build dashboards with multiple metrics in one pass over the table.",
    "level": "intermediate",
    "lesson_order": 18,
    "tags": [
      "aggregation",
      "filter",
      "case_when",
      "pivot"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/conditional-aggregation-and-pivoting.md"
  },
  {
    "slug": "top-n-per-group",
    "title": "Top‑N per group (the \"hard\" ORDER BY problem)",
    "description": "Use window functions to pick top rows per category reliably.",
    "level": "advanced",
    "lesson_order": 19,
    "tags": [
      "window_functions",
      "row_number",
      "partition_by",
      "top_n"
    ],
    "estimated_minutes": 36,
    "content_path": "lessons/top-n-per-group.md"
  },
  {
    "slug": "explain-and-indexes-basics",
    "title": "EXPLAIN / EXPLAIN ANALYZE + Index basics",
    "description": "Read query plans and understand what indexes can (and can’t) do.",
    "level": "advanced",
    "lesson_order": 20,
    "tags": [
      "explain",
      "explain_analyze",
      "indexes",
      "performance"
    ],
    "estimated_minutes": 40,
    "content_path": "lessons/explain-and-indexes-basics.md"
  },
  {
    "slug": "keys-constraints-and-data-integrity",
    "title": "Keys, constraints, and data integrity",
    "description": "Primary keys, foreign keys, CHECK constraints, and what they protect you from.",
    "level": "beginner",
    "lesson_order": 21,
    "tags": [
      "constraints",
      "primary_key",
      "foreign_key",
      "check"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/keys-constraints-and-data-integrity.md"
  },
  {
    "slug": "transactions-acid-and-locking",
    "title": "Transactions: BEGIN, COMMIT, ROLLBACK (ACID basics)",
    "description": "How transactions make multi-step changes safe, and what locking means.",
    "level": "intermediate",
    "lesson_order": 22,
    "tags": [
      "transactions",
      "acid",
      "locking",
      "isolation"
    ],
    "estimated_minutes": 36,
    "content_path": "lessons/transactions-acid-and-locking.md"
  },
  {
    "slug": "data-modeling-normalization-and-relationships",
    "title": "Data modeling: normalization & relationships",
    "description": "How to think in entities and relationships, and why mapping tables exist.",
    "level": "beginner",
    "lesson_order": 23,
    "tags": [
      "data_modeling",
      "normalization",
      "relationships",
      "erd"
    ],
    "estimated_minutes": 38,
    "content_path": "lessons/data-modeling-normalization-and-relationships.md"
  },
  {
    "slug": "indexes-composite-and-covering",
    "title": "Indexes deeper: composite, covering, and order-aware indexes",
    "description": "Composite indexes, index-only scans, and aligning indexes with ORDER BY.",
    "level": "advanced",
    "lesson_order": 24,
    "tags": [
      "indexes",
      "composite_index",
      "index_only_scan",
      "order_by"
    ],
    "estimated_minutes": 44,
    "content_path": "lessons/indexes-composite-and-covering.md"
  },
  {
    "slug": "performance-patterns-sargability-and-anti-patterns",
    "title": "Performance patterns: sargability & common anti-patterns",
    "description": "Write queries the optimizer can use indexes for; avoid row-multiplication traps.",
    "level": "advanced",
    "lesson_order": 25,
    "tags": [
      "performance",
      "sargable",
      "joins",
      "aggregation"
    ],
    "estimated_minutes": 42,
    "content_path": "lessons/performance-patterns-sargability-and-anti-patterns.md"
  },
  {
    "slug": "jsonb-in-postgres",
    "title": "JSONB in PostgreSQL (practical patterns)",
    "description": "Store semi-structured data, query it safely, and index JSONB when needed.",
    "level": "intermediate",
    "lesson_order": 26,
    "tags": [
      "jsonb",
      "postgres",
      "gin_index",
      "semi_structured"
    ],
    "estimated_minutes": 40,
    "content_path": "lessons/jsonb-in-postgres.md"
  },
  {
    "slug": "timezones-and-timestamp-pitfalls",
    "title": "Time zones & timestamp pitfalls",
    "description": "Understand timestamp vs timestamptz, and write predictable “today” logic.",
    "level": "intermediate",
    "lesson_order": 27,
    "tags": [
      "timezones",
      "timestamptz",
      "date_functions"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/timezones-and-timestamp-pitfalls.md"
  },
  {
    "slug": "recursive-ctes-hierarchies",
    "title": "Recursive CTEs: working with hierarchies",
    "description": "Traverse trees/graphs (e.g., referrals, categories) using WITH RECURSIVE.",
    "level": "advanced",
    "lesson_order": 28,
    "tags": [
      "recursive_cte",
      "with_recursive",
      "hierarchy"
    ],
    "estimated_minutes": 44,
    "content_path": "lessons/recursive-ctes-hierarchies.md"
  },
  {
    "slug": "lateral-joins-and-top-1-per-parent",
    "title": "LATERAL joins: per-row subqueries and “top 1 per parent”",
    "description": "Use LATERAL to run a subquery per row for clean per-entity lookups.",
    "level": "advanced",
    "lesson_order": 29,
    "tags": [
      "lateral",
      "joins",
      "top_n",
      "subquery"
    ],
    "estimated_minutes": 40,
    "content_path": "lessons/lateral-joins-and-top-1-per-parent.md"
  },
  {
    "slug": "search-full-text-and-trigrams",
    "title": "Search: full-text and trigram basics (PostgreSQL)",
    "description": "When LIKE isn’t enough: tsvector search and fast “contains” queries with trigrams.",
    "level": "advanced",
    "lesson_order": 30,
    "tags": [
      "search",
      "full_text_search",
      "pg_trgm",
      "performance"
    ],
    "estimated_minutes": 48,
    "content_path": "lessons/search-full-text-and-trigrams.md"
  },
  {
    "slug": "dml-insert-update-delete-returning",
    "title": "DML basics: INSERT, UPDATE, DELETE, RETURNING",
    "description": "Write data safely and fetch the rows you changed.",
    "level": "beginner",
    "lesson_order": 31,
    "tags": [
      "dml",
      "insert",
      "update",
      "delete",
      "returning"
    ],
    "estimated_minutes": 38,
    "content_path": "lessons/dml-insert-update-delete-returning.md"
  },
  {
    "slug": "upserts-on-conflict",
    "title": "Upserts: INSERT ... ON CONFLICT",
    "description": "Insert-or-update patterns for counters, settings, and progress tables.",
    "level": "intermediate",
    "lesson_order": 32,
    "tags": [
      "upsert",
      "on_conflict",
      "constraints",
      "idempotent"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/upserts-on-conflict.md"
  },
  {
    "slug": "views-and-materialized-views",
    "title": "Views & materialized views",
    "description": "Encapsulate query logic and speed up repeated analytics.",
    "level": "intermediate",
    "lesson_order": 33,
    "tags": [
      "views",
      "materialized_view",
      "readability",
      "performance"
    ],
    "estimated_minutes": 40,
    "content_path": "lessons/views-and-materialized-views.md"
  },
  {
    "slug": "advanced-aggregates-grouping-sets-rollup-cube",
    "title": "Advanced aggregates: GROUPING SETS, ROLLUP, CUBE",
    "description": "Produce multiple aggregation levels in one query (dashboards & reports).",
    "level": "advanced",
    "lesson_order": 34,
    "tags": [
      "aggregation",
      "grouping_sets",
      "rollup",
      "cube"
    ],
    "estimated_minutes": 46,
    "content_path": "lessons/advanced-aggregates-grouping-sets-rollup-cube.md"
  },
  {
    "slug": "joins-deeper-and-join-algorithms",
    "title": "JOINs deeper: join algorithms & reading join plans",
    "description": "Hash join vs merge join vs nested loop, and what EXPLAIN is telling you.",
    "level": "advanced",
    "lesson_order": 35,
    "tags": [
      "joins",
      "explain",
      "hash_join",
      "merge_join",
      "nested_loop"
    ],
    "estimated_minutes": 48,
    "content_path": "lessons/joins-deeper-and-join-algorithms.md"
  },
  {
    "slug": "indexes-advanced-partial-expression-gin-gist",
    "title": "Indexes advanced: partial, expression, GIN/GiST overview",
    "description": "Pick the right index type and shape for real query patterns.",
    "level": "advanced",
    "lesson_order": 36,
    "tags": [
      "indexes",
      "partial_index",
      "expression_index",
      "gin",
      "gist"
    ],
    "estimated_minutes": 52,
    "content_path": "lessons/indexes-advanced-partial-expression-gin-gist.md"
  },
  {
    "slug": "query-tuning-workflow-analyze-vacuum-stats",
    "title": "Query tuning workflow: stats, ANALYZE, VACUUM, and plan surprises",
    "description": "A practical loop for improving slow queries and fixing bad estimates.",
    "level": "advanced",
    "lesson_order": 37,
    "tags": [
      "performance",
      "analyze",
      "vacuum",
      "statistics",
      "explain_analyze"
    ],
    "estimated_minutes": 50,
    "content_path": "lessons/query-tuning-workflow-analyze-vacuum-stats.md"
  },
  {
    "slug": "security-roles-grants-and-least-privilege",
    "title": "Security basics: roles, grants, and least privilege",
    "description": "Control who can read/write what, and why it matters in SQL playgrounds.",
    "level": "intermediate",
    "lesson_order": 38,
    "tags": [
      "security",
      "roles",
      "grants",
      "permissions"
    ],
    "estimated_minutes": 44,
    "content_path": "lessons/security-roles-grants-and-least-privilege.md"
  },
  {
    "slug": "schema-evolution-and-migrations",
    "title": "Schema evolution: migrations and safe constraint changes",
    "description": "Change schemas safely as your app grows (and avoid downtime surprises).",
    "level": "intermediate",
    "lesson_order": 39,
    "tags": [
      "migrations",
      "ddl",
      "constraints",
      "schema"
    ],
    "estimated_minutes": 46,
    "content_path": "lessons/schema-evolution-and-migrations.md"
  },
  {
    "slug": "partitioning-basics-time-series",
    "title": "Partitioning basics (time-series tables)",
    "description": "When partitioning helps, how to design it, and how it changes query plans.",
    "level": "advanced",
    "lesson_order": 40,
    "tags": [
      "partitioning",
      "performance",
      "time_series",
      "indexes"
    ],
    "estimated_minutes": 52,
    "content_path": "lessons/partitioning-basics-time-series.md"
  },
  {
    "slug": "distinct-on-top-1-per-group",
    "title": "DISTINCT ON: top 1 per group (PostgreSQL)",
    "description": "A compact Postgres pattern for “latest row per group” queries.",
    "level": "intermediate",
    "lesson_order": 41,
    "tags": [
      "distinct_on",
      "postgres",
      "top_1",
      "order_by"
    ],
    "estimated_minutes": 32,
    "content_path": "lessons/distinct-on-top-1-per-group.md"
  },
  {
    "slug": "pagination-stable-ordering-and-keyset",
    "title": "Pagination: stable ORDER BY, OFFSET pitfalls, and keyset pagination",
    "description": "Write pagination queries that are deterministic, fast, and feed-friendly.",
    "level": "intermediate",
    "lesson_order": 42,
    "tags": [
      "pagination",
      "order_by",
      "limit",
      "offset",
      "keyset"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/pagination-stable-ordering-and-keyset.md"
  },
  {
    "slug": "reconciliation-full-outer-join",
    "title": "Reconciliation: FULL OUTER JOIN and mismatch detection",
    "description": "Find rows only-in-A/only-in-B and reconcile mismatched metrics safely.",
    "level": "intermediate",
    "lesson_order": 43,
    "tags": [
      "full_outer_join",
      "reconciliation",
      "coalesce",
      "is_distinct_from"
    ],
    "estimated_minutes": 34,
    "content_path": "lessons/reconciliation-full-outer-join.md"
  },
  {
    "slug": "correlated-subqueries",
    "title": "Correlated subqueries: EXISTS, per-row lookups, and rewrites",
    "description": "Learn correlated subqueries, when to use them, and how to rewrite for performance.",
    "level": "intermediate",
    "lesson_order": 44,
    "tags": [
      "subquery",
      "exists",
      "correlated",
      "performance"
    ],
    "estimated_minutes": 36,
    "content_path": "lessons/correlated-subqueries.md"
  },
  {
    "slug": "gaps-and-islands",
    "title": "Gaps and Islands: streaks, missing days, and consecutive ranges",
    "description": "Find streaks and missing dates with window functions and generate_series.",
    "level": "advanced",
    "lesson_order": 45,
    "tags": [
      "window_functions",
      "streaks",
      "generate_series",
      "date_functions"
    ],
    "estimated_minutes": 40,
    "content_path": "lessons/gaps-and-islands.md"
  },
  {
    "slug": "relational-division",
    "title": "Relational division: users who did every required thing",
    "description": "Solve “for all” problems by comparing distinct match counts to required set size.",
    "level": "advanced",
    "lesson_order": 46,
    "tags": [
      "group_by",
      "having",
      "generate_series",
      "set_logic"
    ],
    "estimated_minutes": 38,
    "content_path": "lessons/relational-division.md"
  },
  {
    "slug": "debugging-row-multiplication",
    "title": "Debugging row multiplication (and fixing double-counting)",
    "description": "Detect and fix over-counting from joins using grain, pre-aggregation, and deduping.",
    "level": "intermediate",
    "lesson_order": 47,
    "tags": [
      "joins",
      "aggregation",
      "debugging",
      "analytics"
    ],
    "estimated_minutes": 40,
    "content_path": "lessons/debugging-row-multiplication.md"
  },
  {
    "slug": "kpis-retention-funnels",
    "title": "KPI queries: funnels, retention, and cohorts (SQL-first mental models)",
    "description": "Build practical KPI queries with strong definitions, time windows, and safe math.",
    "level": "intermediate",
    "lesson_order": 48,
    "tags": [
      "kpi",
      "retention",
      "funnels",
      "cohorts",
      "analytics"
    ],
    "estimated_minutes": 44,
    "content_path": "lessons/kpis-retention-funnels.md"
  },
  {
    "slug": "postgres-filter-clause",
    "title": "PostgreSQL FILTER: cleaner conditional aggregates",
    "description": "Write multi-metric dashboard queries using FILTER instead of CASE.",
    "level": "intermediate",
    "lesson_order": 49,
    "tags": [
      "postgres",
      "filter",
      "aggregation",
      "pivot"
    ],
    "estimated_minutes": 30,
    "content_path": "lessons/postgres-filter-clause.md"
  }
];

export const tracks = [
  {
    "slug": "learn-sql",
    "title": "Learn SQL",
    "description": "A complete beginner-to-advanced path. Learn fundamentals first, then build real query skills and PostgreSQL fluency.",
    "audience_label": "Beginners → Advanced",
    "badge": "Mastery",
    "is_recommended": true,
    "sections": [
      {
        "title": "Foundations",
        "description": "Start here if you’re new to SQL. Learn to read data, filter correctly, and build confidence.",
        "lessons": [
          "select-basics",
          "where-filtering-and-null",
          "distinct-aliases-and-expressions",
          "types-casting-and-safe-division",
          "coalesce-nullif-and-null-safe-equality",
          "case-when-and-bucketing",
          "order-by-limit-offset"
        ]
      },
      {
        "title": "Core Querying",
        "description": "Summarize, join, and structure queries the way real applications and reports need them.",
        "lessons": [
          "group-by-and-aggregates",
          "having-vs-where",
          "joins-101",
          "joins-patterns-self-many-to-many-anti",
          "subqueries-in-exists-not-in",
          "correlated-subqueries",
          "ctes-with-and-query-shaping",
          "set-operations-union-intersect-except",
          "string-matching-like-ilike-and-search",
          "conditional-aggregation-and-pivoting"
        ]
      },
      {
        "title": "Analytics Patterns",
        "description": "The patterns that unlock real reporting, rankings, and time-series work.",
        "lessons": [
          "window-functions-intro",
          "top-n-per-group",
          "distinct-on-top-1-per-group",
          "gaps-and-islands",
          "relational-division",
          "dates-and-time-filtering",
          "timezones-and-timestamp-pitfalls",
          "pagination-stable-ordering-and-keyset",
          "reconciliation-full-outer-join",
          "kpis-retention-funnels"
        ]
      },
      {
        "title": "Write & Operate SQL",
        "description": "Learn how data changes, how to keep integrity, and how to ship SQL safely.",
        "lessons": [
          "dml-insert-update-delete-returning",
          "upserts-on-conflict",
          "transactions-acid-and-locking",
          "keys-constraints-and-data-integrity",
          "data-modeling-normalization-and-relationships",
          "views-and-materialized-views",
          "schema-evolution-and-migrations",
          "security-roles-grants-and-least-privilege"
        ]
      },
      {
        "title": "Performance & PostgreSQL",
        "description": "Get comfortable reading plans and designing indexes for real workloads.",
        "lessons": [
          "debugging-row-multiplication",
          "postgres-filter-clause",
          "explain-and-indexes-basics",
          "indexes-composite-and-covering",
          "indexes-advanced-partial-expression-gin-gist",
          "joins-deeper-and-join-algorithms",
          "performance-patterns-sargability-and-anti-patterns",
          "query-tuning-workflow-analyze-vacuum-stats",
          "jsonb-in-postgres",
          "lateral-joins-and-top-1-per-parent",
          "advanced-aggregates-grouping-sets-rollup-cube",
          "recursive-ctes-hierarchies",
          "search-full-text-and-trigrams",
          "partitioning-basics-time-series"
        ]
      }
    ]
  },
  {
    "slug": "sql-foundations-fast-track",
    "title": "SQL Foundations Fast Track",
    "description": "A shorter path to get productive quickly: filtering, grouping, joins, and the most common patterns.",
    "audience_label": "Beginner",
    "badge": "Fast track",
    "is_recommended": false,
    "sections": [
      {
        "title": "Get Productive Fast",
        "description": "The smallest set of lessons that unlocks most day-to-day SQL.",
        "lessons": [
          "select-basics",
          "where-filtering-and-null",
          "distinct-aliases-and-expressions",
          "order-by-limit-offset",
          "group-by-and-aggregates",
          "having-vs-where",
          "joins-101",
          "subqueries-in-exists-not-in",
          "dates-and-time-filtering",
          "conditional-aggregation-and-pivoting"
        ]
      }
    ]
  },
  {
    "slug": "interview-prep",
    "title": "LeetCode‑style Interview Prep",
    "description": "Practice the SQL patterns that show up in interviews: joins, tricky grouping, deduping, ranking, and edge cases.",
    "audience_label": "Intermediate",
    "badge": "Interview",
    "is_recommended": false,
    "sections": [
      {
        "title": "Core Patterns",
        "description": "The building blocks that appear in most SQL interview questions.",
        "lessons": [
          "where-filtering-and-null",
          "joins-101",
          "joins-patterns-self-many-to-many-anti",
          "group-by-and-aggregates",
          "having-vs-where",
          "subqueries-in-exists-not-in",
          "correlated-subqueries",
          "ctes-with-and-query-shaping",
          "set-operations-union-intersect-except"
        ]
      },
      {
        "title": "Ranking & Deduping",
        "description": "Top-N, per-group winners, and stable ordering under ties.",
        "lessons": [
          "window-functions-intro",
          "top-n-per-group",
          "distinct-on-top-1-per-group",
          "order-by-limit-offset"
        ]
      },
      {
        "title": "Time & Reporting Edge Cases",
        "description": "The most common pitfalls: dates, NULLs, and comparison logic.",
        "lessons": [
          "dates-and-time-filtering",
          "coalesce-nullif-and-null-safe-equality",
          "reconciliation-full-outer-join",
          "gaps-and-islands",
          "relational-division"
        ]
      }
    ]
  },
  {
    "slug": "practical-sql-analytics",
    "title": "Practical SQL for Devs / Analytics",
    "description": "Build KPI queries, dashboards, and reliable business reports. Learn the patterns to debug and trust your numbers.",
    "audience_label": "Beginner → Intermediate",
    "badge": "Practical",
    "is_recommended": false,
    "sections": [
      {
        "title": "Reporting Basics",
        "description": "The essentials for building trustworthy metrics.",
        "lessons": [
          "dates-and-time-filtering",
          "group-by-and-aggregates",
          "conditional-aggregation-and-pivoting",
          "case-when-and-bucketing",
          "coalesce-nullif-and-null-safe-equality",
          "reconciliation-full-outer-join",
          "debugging-row-multiplication"
        ]
      },
      {
        "title": "Analytics Patterns",
        "description": "Rankings, time-series, and advanced rollups.",
        "lessons": [
          "window-functions-intro",
          "top-n-per-group",
          "advanced-aggregates-grouping-sets-rollup-cube",
          "views-and-materialized-views",
          "kpis-retention-funnels"
        ]
      },
      {
        "title": "Debugging & Performance",
        "description": "Understand why results look wrong or queries get slow.",
        "lessons": [
          "joins-patterns-self-many-to-many-anti",
          "explain-and-indexes-basics",
          "performance-patterns-sargability-and-anti-patterns",
          "pagination-stable-ordering-and-keyset"
        ]
      }
    ]
  },
  {
    "slug": "postgres-power-user",
    "title": "Postgres Power User",
    "description": "PostgreSQL‑specific features and performance patterns: JSONB, DISTINCT ON, LATERAL, indexes, EXPLAIN, and more.",
    "audience_label": "Advanced (Postgres)",
    "badge": "Postgres",
    "is_recommended": false,
    "sections": [
      {
        "title": "Postgres Query Power",
        "description": "Tools that make Postgres uniquely productive.",
        "lessons": [
          "distinct-on-top-1-per-group",
          "conditional-aggregation-and-pivoting",
          "postgres-filter-clause",
          "jsonb-in-postgres",
          "lateral-joins-and-top-1-per-parent",
          "search-full-text-and-trigrams",
          "timezones-and-timestamp-pitfalls"
        ]
      },
      {
        "title": "Performance & Indexing",
        "description": "Read plans, design indexes, and tune real queries.",
        "lessons": [
          "explain-and-indexes-basics",
          "indexes-composite-and-covering",
          "indexes-advanced-partial-expression-gin-gist",
          "joins-deeper-and-join-algorithms",
          "query-tuning-workflow-analyze-vacuum-stats",
          "partitioning-basics-time-series"
        ]
      },
      {
        "title": "Advanced SQL Constructs",
        "description": "High-leverage features for complex reporting and data modeling.",
        "lessons": [
          "advanced-aggregates-grouping-sets-rollup-cube",
          "recursive-ctes-hierarchies",
          "views-and-materialized-views",
          "upserts-on-conflict"
        ]
      }
    ]
  },
  {
    "slug": "query-tuning-performance",
    "title": "Query Tuning / Performance",
    "description": "A focused track on making SQL fast: EXPLAIN, indexes, join strategies, and tuning workflow.",
    "audience_label": "Advanced",
    "badge": "Performance",
    "is_recommended": false,
    "sections": [
      {
        "title": "Read Plans",
        "description": "Start by learning how to read what the database is doing.",
        "lessons": [
          "explain-and-indexes-basics",
          "joins-deeper-and-join-algorithms",
          "performance-patterns-sargability-and-anti-patterns"
        ]
      },
      {
        "title": "Design Indexes",
        "description": "Pick the right index for the right query pattern.",
        "lessons": [
          "indexes-composite-and-covering",
          "indexes-advanced-partial-expression-gin-gist"
        ]
      },
      {
        "title": "Tune Systematically",
        "description": "Build a repeatable loop for improving slow queries.",
        "lessons": [
          "query-tuning-workflow-analyze-vacuum-stats",
          "partitioning-basics-time-series",
          "views-and-materialized-views"
        ]
      }
    ]
  },
  {
    "slug": "database-design-integrity",
    "title": "Database Design & Integrity",
    "description": "Keys, constraints, modeling, and safe schema changes — the foundation for reliable data systems.",
    "audience_label": "Beginner → Intermediate",
    "badge": "Design",
    "is_recommended": false,
    "sections": [
      {
        "title": "Model & Protect Data",
        "description": "Design tables and enforce rules so bugs don’t enter your database.",
        "lessons": [
          "data-modeling-normalization-and-relationships",
          "keys-constraints-and-data-integrity",
          "dml-insert-update-delete-returning",
          "transactions-acid-and-locking",
          "schema-evolution-and-migrations",
          "security-roles-grants-and-least-privilege"
        ]
      }
    ]
  },
  {
    "slug": "data-analyst-sql",
    "title": "Data Analyst SQL",
    "description": "A practical analytics curriculum: metrics, time-series, cohorts, and dashboards — using SQL that’s easy to trust.",
    "audience_label": "Beginner → Advanced",
    "badge": "Analytics",
    "is_recommended": false,
    "sections": [
      {
        "title": "Analytics Core",
        "description": "The query patterns that power dashboards and reporting.",
        "lessons": [
          "select-basics",
          "where-filtering-and-null",
          "group-by-and-aggregates",
          "having-vs-where",
          "joins-101",
          "dates-and-time-filtering",
          "conditional-aggregation-and-pivoting",
          "window-functions-intro",
          "top-n-per-group",
          "reconciliation-full-outer-join",
          "debugging-row-multiplication",
          "kpis-retention-funnels",
          "advanced-aggregates-grouping-sets-rollup-cube"
        ]
      }
    ]
  }
];

export const badges = [
  {
    "slug": "first_blood",
    "title": "First Blood",
    "description": "Solve your first challenge.",
    "category": "onboarding",
    "sort_order": 1,
    "icon_key": "spark",
    "criteria": {
      "event": "question_solved",
      "type": "solves_total",
      "threshold": 1
    }
  },
  {
    "slug": "getting_started",
    "title": "Getting Started",
    "description": "Complete your first lesson.",
    "category": "onboarding",
    "sort_order": 2,
    "icon_key": "book",
    "criteria": {
      "event": "lesson_completed",
      "type": "lesson_completed_total",
      "threshold": 1
    }
  },
  {
    "slug": "mock_rookie",
    "title": "Mock Rookie",
    "description": "Finish your first mock interview session.",
    "category": "onboarding",
    "sort_order": 3,
    "icon_key": "timer",
    "criteria": {
      "event": "mock_session_finished",
      "type": "mock_sessions_finished_total",
      "threshold": 1
    }
  },
  {
    "slug": "solves_10",
    "title": "10 Solves",
    "description": "Solve 10 challenges.",
    "category": "milestones",
    "sort_order": 10,
    "icon_key": "target",
    "criteria": {
      "event": "question_solved",
      "type": "solves_total",
      "threshold": 10
    }
  },
  {
    "slug": "solves_50",
    "title": "50 Solves",
    "description": "Solve 50 challenges.",
    "category": "milestones",
    "sort_order": 11,
    "icon_key": "target",
    "criteria": {
      "event": "question_solved",
      "type": "solves_total",
      "threshold": 50
    }
  },
  {
    "slug": "solves_100",
    "title": "100 Solves",
    "description": "Solve 100 challenges.",
    "category": "milestones",
    "sort_order": 12,
    "icon_key": "trophy",
    "criteria": {
      "event": "question_solved",
      "type": "solves_total",
      "threshold": 100
    }
  },
  {
    "slug": "hard_hitter",
    "title": "Hard Hitter",
    "description": "Solve 10 hard questions.",
    "category": "milestones",
    "sort_order": 13,
    "icon_key": "flame",
    "criteria": {
      "event": "question_solved",
      "type": "solves_difficulty",
      "difficulty": "hard",
      "threshold": 10
    }
  },
  {
    "slug": "clean_sweep_social",
    "title": "Clean Sweep (Social)",
    "description": "Solve all questions in the social app.",
    "category": "milestones",
    "sort_order": 14,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "social"
    }
  },
  {
    "slug": "clean_sweep_ecommerce",
    "title": "Clean Sweep (Ecommerce)",
    "description": "Solve all questions in the ecommerce app.",
    "category": "milestones",
    "sort_order": 15,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "ecommerce"
    }
  },
  {
    "slug": "clean_sweep_food",
    "title": "Clean Sweep (Food)",
    "description": "Solve all questions in the food app.",
    "category": "milestones",
    "sort_order": 16,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "food"
    }
  },
  {
    "slug": "clean_sweep_ride",
    "title": "Clean Sweep (Ride)",
    "description": "Solve all questions in the ride app.",
    "category": "milestones",
    "sort_order": 17,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "ride"
    }
  },
  {
    "slug": "clean_sweep_movies",
    "title": "Clean Sweep (Movies)",
    "description": "Solve all questions in the movies app.",
    "category": "milestones",
    "sort_order": 18,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "movies"
    }
  },
  {
    "slug": "clean_sweep_bank",
    "title": "Clean Sweep (Bank)",
    "description": "Solve all questions in the bank app.",
    "category": "milestones",
    "sort_order": 19,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "bank"
    }
  },
  {
    "slug": "clean_sweep_realestate",
    "title": "Clean Sweep (Realestate)",
    "description": "Solve all questions in the realestate app.",
    "category": "milestones",
    "sort_order": 20,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "realestate"
    }
  },
  {
    "slug": "clean_sweep_hospital",
    "title": "Clean Sweep (Hospital)",
    "description": "Solve all questions in the hospital app.",
    "category": "milestones",
    "sort_order": 21,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "hospital"
    }
  },
  {
    "slug": "clean_sweep_education",
    "title": "Clean Sweep (Education)",
    "description": "Solve all questions in the education app.",
    "category": "milestones",
    "sort_order": 22,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "education"
    }
  },
  {
    "slug": "clean_sweep_chat",
    "title": "Clean Sweep (Chat)",
    "description": "Solve all questions in the chat app.",
    "category": "milestones",
    "sort_order": 23,
    "icon_key": "check",
    "criteria": {
      "event": "question_solved",
      "type": "clean_sweep_app",
      "app": "chat"
    }
  },
  {
    "slug": "first_try",
    "title": "First Try",
    "description": "Solve a question in 1 attempt.",
    "category": "quality",
    "sort_order": 20,
    "icon_key": "bolt",
    "criteria": {
      "event": "question_solved",
      "type": "first_try_any"
    }
  },
  {
    "slug": "no_hints",
    "title": "No Hints",
    "description": "Solve a question without revealing hints.",
    "category": "quality",
    "sort_order": 21,
    "icon_key": "eye_off",
    "criteria": {
      "event": "question_solved",
      "type": "no_hints_any"
    }
  },
  {
    "slug": "no_solutions",
    "title": "No Solutions",
    "description": "Solve a question without unlocking solutions.",
    "category": "quality",
    "sort_order": 22,
    "icon_key": "lock",
    "criteria": {
      "event": "question_solved",
      "type": "no_solutions_any"
    }
  },
  {
    "slug": "joiner",
    "title": "Joiner",
    "description": "Solve 10 questions tagged joins.",
    "category": "concepts",
    "sort_order": 30,
    "icon_key": "link",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "joins"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "window_wizard",
    "title": "Window Wizard",
    "description": "Solve 10 questions tagged window functions.",
    "category": "concepts",
    "sort_order": 31,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "window_functions"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "aggregator",
    "title": "Aggregator",
    "description": "Solve 10 questions tagged aggregation / group by.",
    "category": "concepts",
    "sort_order": 32,
    "icon_key": "sigma",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "aggregation",
        "group_by"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "subquery_scout",
    "title": "Subquery Scout",
    "description": "Solve 10 questions tagged subquery.",
    "category": "concepts",
    "sort_order": 33,
    "icon_key": "search",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "subquery"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "sorter",
    "title": "Sorter",
    "description": "Solve 10 questions tagged sorting.",
    "category": "concepts",
    "sort_order": 34,
    "icon_key": "arrow_down_up",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "sorting"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "filter_master",
    "title": "Filter Master",
    "description": "Solve 10 questions tagged filtering.",
    "category": "concepts",
    "sort_order": 35,
    "icon_key": "funnel",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "filtering"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "distinct_detective",
    "title": "Distinct Detective",
    "description": "Solve 10 questions tagged distinct.",
    "category": "concepts",
    "sort_order": 36,
    "icon_key": "sparkles",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "distinct"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "date_ranger",
    "title": "Date Ranger",
    "description": "Solve 10 questions tagged date functions.",
    "category": "concepts",
    "sort_order": 37,
    "icon_key": "calendar",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "date_functions"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "case_crafter",
    "title": "CASE Crafter",
    "description": "Solve 10 questions tagged case when.",
    "category": "concepts",
    "sort_order": 38,
    "icon_key": "code",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "case_when"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "existentialist",
    "title": "Existentialist",
    "description": "Solve 10 questions tagged exists.",
    "category": "concepts",
    "sort_order": 39,
    "icon_key": "check_circle",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "exists"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "performance_tuner",
    "title": "Performance Tuner",
    "description": "Solve 10 questions tagged performance.",
    "category": "concepts",
    "sort_order": 40,
    "icon_key": "gauge",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "performance"
      ],
      "threshold": 10
    }
  },

  {
    "slug": "solves_250",
    "title": "250 Solves",
    "description": "Solve 250 challenges.",
    "category": "milestones",
    "sort_order": 24,
    "icon_key": "trophy",
    "criteria": {
      "event": "question_solved",
      "type": "solves_total",
      "threshold": 250
    }
  },
  {
    "slug": "solves_500",
    "title": "500 Solves",
    "description": "Solve 500 challenges.",
    "category": "milestones",
    "sort_order": 25,
    "icon_key": "trophy",
    "criteria": {
      "event": "question_solved",
      "type": "solves_total",
      "threshold": 500
    }
  },
  {
    "slug": "lessons_10",
    "title": "Getting Serious",
    "description": "Complete 10 lessons.",
    "category": "milestones",
    "sort_order": 26,
    "icon_key": "book",
    "criteria": {
      "event": "lesson_completed",
      "type": "lesson_completed_total",
      "threshold": 10
    }
  },
  {
    "slug": "lessons_25",
    "title": "Lesson Streak",
    "description": "Complete 25 lessons.",
    "category": "milestones",
    "sort_order": 27,
    "icon_key": "book",
    "criteria": {
      "event": "lesson_completed",
      "type": "lesson_completed_total",
      "threshold": 25
    }
  },
  {
    "slug": "mock_regular",
    "title": "Mock Regular",
    "description": "Finish 5 mock interview sessions.",
    "category": "milestones",
    "sort_order": 28,
    "icon_key": "timer",
    "criteria": {
      "event": "mock_session_finished",
      "type": "mock_sessions_finished_total",
      "threshold": 5
    }
  },
  {
    "slug": "mock_veteran",
    "title": "Mock Veteran",
    "description": "Finish 10 mock interview sessions.",
    "category": "milestones",
    "sort_order": 29,
    "icon_key": "timer",
    "criteria": {
      "event": "mock_session_finished",
      "type": "mock_sessions_finished_total",
      "threshold": 10
    }
  },

  {
    "slug": "cte_builder",
    "title": "CTE Builder",
    "description": "Solve 10 questions tagged CTE.",
    "category": "concepts",
    "sort_order": 41,
    "icon_key": "code",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "cte"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "having_hawk",
    "title": "HAVING Hawk",
    "description": "Solve 10 questions tagged having.",
    "category": "concepts",
    "sort_order": 42,
    "icon_key": "search",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "having"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "left_join_loyalist",
    "title": "Left Join Loyalist",
    "description": "Solve 10 questions tagged left join.",
    "category": "concepts",
    "sort_order": 43,
    "icon_key": "link",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "left_join"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "anti_join_ace",
    "title": "Anti-Join Ace",
    "description": "Solve 10 questions tagged anti join.",
    "category": "concepts",
    "sort_order": 44,
    "icon_key": "link",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "anti_join"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "self_join_sleuth",
    "title": "Self-Join Sleuth",
    "description": "Solve 10 questions tagged self join.",
    "category": "concepts",
    "sort_order": 45,
    "icon_key": "link",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "self_join"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "pivot_pundit",
    "title": "Pivot Pundit",
    "description": "Solve 10 questions tagged conditional aggregation.",
    "category": "concepts",
    "sort_order": 46,
    "icon_key": "sigma",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "conditional_aggregation"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "null_ninja",
    "title": "Null Ninja",
    "description": "Solve 10 questions tagged null handling.",
    "category": "concepts",
    "sort_order": 47,
    "icon_key": "eye_off",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "null_handling"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "string_smith",
    "title": "String Smith",
    "description": "Solve 10 questions tagged string functions.",
    "category": "concepts",
    "sort_order": 48,
    "icon_key": "code",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "string_functions"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "union_unionist",
    "title": "Union Unionist",
    "description": "Solve 10 questions tagged union.",
    "category": "concepts",
    "sort_order": 49,
    "icon_key": "sparkles",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "union"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "rank_ranger",
    "title": "Rank Ranger",
    "description": "Solve 10 questions tagged ranking.",
    "category": "concepts",
    "sort_order": 50,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "ranking"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "row_number_rover",
    "title": "Row Number Rover",
    "description": "Solve 10 questions tagged row number.",
    "category": "concepts",
    "sort_order": 51,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "row_number"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "lag_lead_liftoff",
    "title": "Lag/Lead Liftoff",
    "description": "Solve 10 questions tagged lag/lead.",
    "category": "concepts",
    "sort_order": 52,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "lag_lead"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "partition_pro",
    "title": "Partition Pro",
    "description": "Solve 10 questions tagged partition by.",
    "category": "concepts",
    "sort_order": 53,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "partition_by"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "running_total_runner",
    "title": "Running Total Runner",
    "description": "Solve 10 questions tagged running total.",
    "category": "concepts",
    "sort_order": 54,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "running_total"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "moving_average_monk",
    "title": "Moving Average Monk",
    "description": "Solve 10 questions tagged moving average.",
    "category": "concepts",
    "sort_order": 55,
    "icon_key": "wand",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "moving_average"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "ordered_set_oracle",
    "title": "Ordered-Set Oracle",
    "description": "Solve 10 questions tagged ordered-set aggregate.",
    "category": "concepts",
    "sort_order": 56,
    "icon_key": "sigma",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "ordered_set_aggregate"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "percentile_pilot",
    "title": "Percentile Pilot",
    "description": "Solve 10 questions tagged percentile.",
    "category": "concepts",
    "sort_order": 57,
    "icon_key": "sigma",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "percentile"
      ],
      "threshold": 10
    }
  },
  {
    "slug": "postgres_specialist",
    "title": "Postgres Specialist",
    "description": "Solve 10 questions tagged Postgres-specific.",
    "category": "concepts",
    "sort_order": 58,
    "icon_key": "sparkles",
    "criteria": {
      "event": "question_solved",
      "type": "solves_with_concepts",
      "concepts": [
        "postgres_specific"
      ],
      "threshold": 10
    }
  }
];
