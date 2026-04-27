-- ============================
-- ECOMMERCE APP (schema-based)
-- ============================
-- Uses schema `ecommerce_schema` with per-request `search_path` so learners can write:
--   SELECT * FROM orders;

CREATE SCHEMA IF NOT EXISTS ecommerce_schema;
SET search_path TO ecommerce_schema;

-- =========================
-- CUSTOMERS
-- =========================
CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  gender VARCHAR(20),
  date_of_birth DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- ADDRESSES
-- =========================
CREATE TABLE addresses (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  address_type VARCHAR(20) CHECK (address_type IN ('billing', 'shipping')),
  line1 TEXT NOT NULL,
  line2 TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- CATEGORIES
-- =========================
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  parent_category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  sku VARCHAR(100) UNIQUE NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  cost_price NUMERIC(10, 2),
  stock_quantity INTEGER DEFAULT 0,
  rating NUMERIC(2, 1),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(30) CHECK (
    status IN ('pending','confirmed','shipped','delivered','cancelled','returned')
  ),
  order_date TIMESTAMP NOT NULL,
  shipping_address_id BIGINT REFERENCES addresses(id) ON DELETE SET NULL,
  billing_address_id BIGINT REFERENCES addresses(id) ON DELETE SET NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  discount_amount NUMERIC(12, 2) DEFAULT 0,
  tax_amount NUMERIC(12, 2) DEFAULT 0,
  shipping_fee NUMERIC(12, 2) DEFAULT 0,
  total_amount NUMERIC(12, 2) NOT NULL
);

-- =========================
-- ORDER ITEMS
-- =========================
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0,
  total_price NUMERIC(12, 2) NOT NULL
);

-- =========================
-- PAYMENTS
-- =========================
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  payment_method VARCHAR(50) CHECK (
    payment_method IN ('card','upi','net_banking','wallet','cod')
  ),
  payment_status VARCHAR(50) CHECK (
    payment_status IN ('pending','completed','failed','refunded')
  ),
  paid_amount NUMERIC(12, 2) NOT NULL,
  paid_at TIMESTAMP,
  transaction_ref VARCHAR(100)
);

-- =========================
-- REVIEWS
-- =========================
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_id BIGINT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_title VARCHAR(255),
  review_text TEXT,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_addresses_customer_id ON addresses(customer_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_order_date ON orders(order_date DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
