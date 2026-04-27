-- =========================
-- RIDE RESET
-- =========================
\set ON_ERROR_STOP on
\set app_id 4
\i ../base/sql/reset_app_metadata.sql

DROP SCHEMA IF EXISTS ride_schema CASCADE;
DROP SCHEMA IF EXISTS ride CASCADE;
