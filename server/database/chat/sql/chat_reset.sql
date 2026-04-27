-- ======================
-- CHAT APP RESET
-- ======================
\set ON_ERROR_STOP on
\set app_id 10
\i ../base/sql/reset_app_metadata.sql

-- Drop chat schema data.
DROP SCHEMA IF EXISTS chat_schema CASCADE;
DROP SCHEMA IF EXISTS chat CASCADE;
