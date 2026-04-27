-- ======================
-- FOOD APP RESET
-- ======================
\set ON_ERROR_STOP on
\set app_id 3
\i ../base/sql/reset_app_metadata.sql

DROP SCHEMA IF EXISTS food_schema CASCADE;

-- Backward-compat: drop old schema name if it still exists
DROP SCHEMA IF EXISTS food CASCADE;
