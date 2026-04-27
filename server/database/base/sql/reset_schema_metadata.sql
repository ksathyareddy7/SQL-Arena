-- Generic reset for app-owned schema metadata stored in base tables.
--
-- Usage from psql:
--   \set ON_ERROR_STOP on
--   \set app_id 1
--   \i ../base/sql/reset_schema_metadata.sql

\set ON_ERROR_STOP on

DELETE FROM table_relationships WHERE app_id = :app_id;
DELETE FROM table_schemas WHERE app_id = :app_id;

