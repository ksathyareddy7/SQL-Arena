<p align="center">
  <img src="client/src/assets/sql-arena.svg" alt="SQL Arena" width="240" />
</p>

# SQL Arena

A full-stack SQL practice platform: challenges, lessons, tracks, mock interviews, and achievements — all running locally on PostgreSQL.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Monaco Editor, Lucide Icons.
- **Backend:** Node.js, Express, `pg` for PostgreSQL connection.
- **Database:** PostgreSQL.

---

## Quickstart

### Prerequisites
- Node.js (see `.nvmrc`)
- One of:
  - Docker Desktop (recommended), or
  - A local Postgres install

### 1) Set up the database + seed content

Pick one mode (recommended: Docker):

**Docker (recommended)**

```bash
node setup.js --mode docker
```

**Local Postgres**

```bash
node setup.js --mode local
```

If you omit `--mode`, setup defaults to **local** (safer when both Docker and local Postgres exist).

What setup does:
- creates (or recreates) the `sql_arena` database
- seeds base content (apps, lessons, tracks, badges)
- seeds each app schema + seed data + exercises

### 2) Servers

Start dev servers for local postgres:

```bash
cd server && npm run dev
cd client && npm run dev
```

If you use Docker Postgres (port `5433`), run the API server in Docker DB mode:

```bash
cd server && npm run dev:docker
```

---

## Docker vs Local Postgres

To avoid confusion when both Docker and local Postgres are installed:
- Docker Postgres uses **host port `5433`** by default (`DOCKER_DB_PORT`).
- Local Postgres uses **host port `5432`** by default (`DB_PORT`).

### Docker mode details
- Docker Postgres is started via `docker compose`.
- `node setup.js --mode docker` always resets the Docker volume to avoid credential/user mismatches from prior runs.
- When running the API against Docker Postgres, use `npm run dev:docker` (or set `SQL_ARENA_DB_MODE=docker`).

Start / stop only the Docker DB (optional):

```bash
docker compose --env-file server/.env up -d db
docker compose --env-file server/.env down
```

### Local mode details
If your local credentials are not the defaults, copy the env template:

```bash
cp server/.env.example server/.env
```

Then edit `server/.env` (or set `DATABASE_URL`).

---

## Common tasks

### Reset the database (drop + recreate only)

Drop + recreate the database only:

```bash
node setup.js --db-only
```

### Reseed base + all apps (no drop/recreate)

Seed base + all apps:

```bash
node setup.js --seed-only
```

If the database doesn’t exist yet, `--seed-only` will create it automatically.

### Seed a single app

```bash
cd server && node scripts/setup.js --mode local --seed-only --apps social
```

Seed a single app (Docker DB):

```bash
cd server && node scripts/setup.js --mode docker --seed-only --apps social
```

### Reload an app’s exercises (questions/hints/concepts/solutions)

If you only changed an app’s `*.data.js` (for example `server/database/chat/js/chat.data.js`) and you want to re-import the exercises without reseeding schema/seed data:

```bash
cd server
node scripts/loadAppData.js chat
```

This upserts by `code` (updates existing questions) but does **not** delete questions that were removed from the JS source.

### Run solution tests

Run solution tests for all apps:

```bash
cd server && node tests/testSolutions.js --apps social,ecommerce,food,ride,movies,bank,realestate,hospital,education,chat
```

Or run a subset:

```bash
cd server && node tests/testSolutions.js --apps social,ecommerce
```

---

## Add a new app

High-level steps:

1. Add the app to `appsMap` in `server/database/base/scripts/base.data.js`
2. Create:
   - `server/database/<app>/sql/<app>_schema.sql` (schema + tables only)
   - `server/database/<app>/sql/<app>_reset.sql`
   - `server/database/<app>/js/<app>GenerateData.js`
   - `server/database/<app>/js/<app>.data.js`
3. Add a seed manifest entry in `server/database/base/scripts/seedManifests.js`
4. Run: `cd server && node scripts/setup.js --seed-only --apps <app>`

---

## How schemas / `search_path` work

Each app has its own schema (e.g. `social_schema`, `ecommerce_schema`). Exercises are executed with a controlled `search_path` so users can write:

```sql
SELECT COUNT(*) FROM users;
```

…without needing schema-qualified names. The validator blocks cross-schema access to keep exercises isolated and safe.

---

## Architecture (high level)

This section explains how SQL Arena seeds data and how the platform is organized so contributors can extend it safely.

### Runtime architecture

- **Client** (`/client`): React + Vite app
- **Server** (`/server`): Express API that:
  - serves exercises
  - executes queries against PostgreSQL
  - compares results to expected outputs
  - tracks user progress, submissions, hints, lessons, mock interviews, and badges
- **Database** (`sql_arena`): PostgreSQL; each app lives in its own schema.

### Database conventions

#### Stable app IDs

`apps.app_id` is the stable numeric identifier used across the platform. It is preloaded from the base data loader and should not be auto-generated.

#### Schema-per-app

Each app uses its own schema (e.g. `social_schema`, `ecommerce_schema`) and the query validator restricts cross-schema access.

### Seeding / orchestration

There are two layers: **base** (shared tables + content) and **apps** (schemas + data + exercises).

#### Base setup

Entry points:
- `/setup.js` (repo root one-command bootstrap)
- `/server/scripts/setup.js` (cross-platform orchestrator)
- `/server/database/base/scripts/baseLoadData.js`
- `/server/database/base/scripts/base.data.js`

Flow:
1. SQL schema: `server/database/base/sql/reset_base.sql` then `server/database/base/sql/base.sql`
2. JS loader upserts: apps, lessons, tracks, badges

#### App setup

Entry point:
- `cd server && node scripts/setup.js --seed-only --apps <appName>`

Flow:
1. Reset: `server/database/<app>/sql/<app>_reset.sql` (resets app metadata, then drops the app schema)
2. Schema: `server/database/<app>/sql/<app>_schema.sql` (creates the app schema + tables)
3. Schema metadata: loaded via JS (`/server/scripts/loadAppSchemaMetadata.js`)
   - Columns + FK relationships are introspected from `<app>_schema`
   - Optional table descriptions come from `tableDescriptions` exported by `<app>.data.js`
3. Seed CSV generation: `server/database/<app>/js/<app>GenerateData.js` **only when** `seedData/*.csv` is missing/empty
4. Seed load: `/server/scripts/loadAppSeedData.js <app>` (Node `COPY FROM STDIN`, driven by `seedManifests.js`)
5. Exercise load: `/server/scripts/loadAppData.js <app>` which calls `/server/scripts/loadAppExercises.js`

Notes:
- `server/scripts/setup.js` expects `<app>_schema.sql` to exist for every app.
- Base reset helpers:
  - `server/database/base/sql/reset_questions_metadata.sql` (delete `questions` for an app_id; cascades)
  - `server/database/base/sql/reset_schema_metadata.sql` (delete `table_schemas`/`table_relationships` for an app_id)
  - `server/database/base/sql/reset_app_metadata.sql` (includes both)

#### Seed manifests

`/server/database/base/scripts/seedManifests.js` is a per-app ordered list of CSV files and the target `<schema>.<table>`. This is the source of truth for the seed loader.

#### Exercise content (questions/hints/concepts/solutions)

Each app has a single JS source-of-truth:
- `/server/database/<app>/js/<app>.data.js`

It exports:
- `questions`
- `hints`
- `conceptFilters`
- `solutions`

The loader validates:
- required fields
- column alignment
- concept filter keys exist in `concepts`

### Query execution safety

SQL Arena executes user SQL, so the server enforces guardrails before executing:

- **Timeouts** for long-running queries
- **Cross-schema block**: exercises are meant to use unqualified table names within the current app schema
- **Non-destructive** enforcement (blocks DDL/DML depending on endpoint)

See `/server/controllers/query.js` and helper utilities for the exact rules.

---

## Security

### Reporting vulnerabilities

If you believe you’ve found a security issue, please open a GitHub issue with the label **security** and include:
- affected area (client/server)
- steps to reproduce
- expected vs actual behavior

### Database safety guardrails

SQL Arena executes user SQL, so the server includes protective checks:
- statement timeouts
- cross-schema restrictions (exercises should not access other schemas)
- blocking destructive statements as appropriate

---

## Troubleshooting

### “API calls work even after I stopped Docker DB”

You’re likely connected to **local Postgres** (commonly `localhost:5432`), not Docker.

- Check Docker container state:
  - `docker compose --env-file server/.env ps`
- Check which process is listening on 5432 (macOS/Linux):
  - `lsof -iTCP:5432 -sTCP:LISTEN`

### Docker setup fails with auth errors / missing role

If you see errors like:
- `password authentication failed`
- `Role "postgres" does not exist`

It usually means an old Docker volume was initialized with different credentials. `node setup.js --mode docker` resets the Docker volume automatically.

If you are running Docker manually, reset once:

```bash
docker compose --env-file server/.env down -v --remove-orphans
docker compose --env-file server/.env up -d db
```

### Docker setup times out waiting for Postgres

Common causes:
- Port `5433` already in use
- Docker Desktop not fully started

Try:
- `lsof -iTCP:5433 -sTCP:LISTEN`
- `docker compose --env-file server/.env logs --tail 200 db`

### “password authentication failed for user …” when running the API

You’re starting the server in one DB mode but your env points to another DB.

- For **local DB**:
  - `cd server && npm run dev`
  - Ensure `DB_*` in `server/.env` match your local Postgres credentials.
- For **docker DB**:
  - `cd server && npm run dev:docker`
  - Ensure `DOCKER_DB_*` in `server/.env` match the docker compose env.

### Port conflicts (5432 / 5433)

- Local Postgres typically uses `5432` (`DB_PORT`)
- Docker Postgres uses `5433` (`DOCKER_DB_PORT`)

If you change ports, update `server/.env` and restart the server.

### Node version issues

If installs or scripts behave oddly, ensure you’re using the repo’s Node version:
- See `.nvmrc`
