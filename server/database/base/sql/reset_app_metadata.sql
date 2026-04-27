-- Generic reset for app-owned exercise metadata stored in base tables.
--
-- Include from an app reset script (psql CWD should be `server/database/<app>`):
--   \set ON_ERROR_STOP on
--   \set app_id 1
--   \i ../base/sql/reset_app_metadata.sql
--
-- This intentionally deletes ONLY base-table metadata that is keyed by `app_id`.
-- App schemas/tables should be dropped in the per-app reset script.

\set ON_ERROR_STOP on

\i ../base/sql/reset_schema_metadata.sql
\i ../base/sql/reset_questions_metadata.sql
