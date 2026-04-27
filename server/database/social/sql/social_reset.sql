\set ON_ERROR_STOP on
\set app_id 1
\i ../base/sql/reset_app_metadata.sql

-- Drop schema-based tables (preferred)
DROP SCHEMA IF EXISTS social_schema CASCADE;

-- Backward-compat: drop old schema name if it still exists
DROP SCHEMA IF EXISTS social CASCADE;

-- Backward-compat: drop old prefixed tables if they still exist
DROP TABLE IF EXISTS social_users CASCADE;
DROP TABLE IF EXISTS social_posts CASCADE;
DROP TABLE IF EXISTS social_comments CASCADE;
DROP TABLE IF EXISTS social_likes CASCADE;
DROP TABLE IF EXISTS social_follows CASCADE;
DROP TABLE IF EXISTS social_hashtags CASCADE;
DROP TABLE IF EXISTS social_post_hashtags CASCADE;
DROP TABLE IF EXISTS social_bookmarks CASCADE;
DROP TABLE IF EXISTS social_notifications CASCADE;
