\set ON_ERROR_STOP on
\set app_id 2
\i ../base/sql/reset_app_metadata.sql

-- =========================
-- DROP TABLES
-- =========================
-- Drop schema-based tables (preferred)
DROP SCHEMA IF EXISTS ecommerce_schema CASCADE;

-- Backward-compat: drop old schema name if it still exists
DROP SCHEMA IF EXISTS ecommerce CASCADE;

-- Backward-compat: drop old prefixed tables if they still exist
DROP TABLE IF EXISTS ecommerce_customers CASCADE;
DROP TABLE IF EXISTS ecommerce_addresses CASCADE;
DROP TABLE IF EXISTS ecommerce_categories CASCADE;
DROP TABLE IF EXISTS ecommerce_products CASCADE;
DROP TABLE IF EXISTS ecommerce_orders CASCADE;
DROP TABLE IF EXISTS ecommerce_order_items CASCADE;
DROP TABLE IF EXISTS ecommerce_payments CASCADE;
DROP TABLE IF EXISTS ecommerce_reviews CASCADE;
