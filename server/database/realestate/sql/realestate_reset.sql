-- =========================
-- REALESTATE RESET
-- =========================
\set ON_ERROR_STOP on
\set app_id 7
\i ../base/sql/reset_app_metadata.sql

DROP SCHEMA IF EXISTS realestate_schema CASCADE;
DROP SCHEMA IF EXISTS realestate CASCADE;
