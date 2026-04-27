-- ======================
-- BANK APP RESET
-- ======================
\set ON_ERROR_STOP on
\set app_id 6
\i ../base/sql/reset_app_metadata.sql

-- Drop bank schema data.
DROP SCHEMA IF EXISTS bank_schema CASCADE;
DROP SCHEMA IF EXISTS bank CASCADE;
