-- ======================
-- FOOD DELIVERY APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS food_schema;
SET search_path TO food_schema;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone VARCHAR(20),
  gender VARCHAR(20),
  date_of_birth DATE,
  default_city VARCHAR(80),
  signup_source VARCHAR(30),
  loyalty_points INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- USER ADDRESSES
CREATE TABLE IF NOT EXISTS user_addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(30) NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  area VARCHAR(100),
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80),
  postal_code VARCHAR(20),
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- RESTAURANTS
CREATE TABLE IF NOT EXISTS restaurants (
  id BIGSERIAL PRIMARY KEY,
  owner_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  legal_name TEXT,
  city VARCHAR(80) NOT NULL,
  area VARCHAR(100),
  cuisine VARCHAR(50) NOT NULL,
  cost_for_two NUMERIC(10, 2),
  opening_time TIME,
  closing_time TIME,
  avg_prep_time_minutes INTEGER,
  min_order_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  commission_rate NUMERIC(5, 2),
  packaging_charge_default NUMERIC(10, 2) NOT NULL DEFAULT 0,
  rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0,
  total_ratings INTEGER NOT NULL DEFAULT 0,
  is_veg_only BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- RESTAURANT OPERATING HOURS
CREATE TABLE IF NOT EXISTS restaurant_operating_hours (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  open_time TIME NOT NULL,
  close_time TIME NOT NULL,
  is_closed BOOLEAN NOT NULL DEFAULT false
);

-- MENU ITEMS
CREATE TABLE IF NOT EXISTS menu_items (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category VARCHAR(40) NOT NULL,
  description TEXT,
  is_veg BOOLEAN,
  spice_level VARCHAR(20),
  calories INTEGER,
  price NUMERIC(10, 2) NOT NULL,
  cost_price NUMERIC(10, 2),
  inventory_count INTEGER,
  reorder_level INTEGER,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MENU ITEM AVAILABILITY LOGS
CREATE TABLE IF NOT EXISTS menu_item_availability_logs (
  id BIGSERIAL PRIMARY KEY,
  menu_item_id BIGINT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  was_available BOOLEAN NOT NULL,
  changed_reason VARCHAR(50),
  changed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- COUPONS
CREATE TABLE IF NOT EXISTS coupons (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  description TEXT,
  discount_type VARCHAR(10) NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value NUMERIC(10, 2) NOT NULL,
  min_order_total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  max_discount_amount NUMERIC(10, 2),
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  max_uses INTEGER NOT NULL DEFAULT 0,
  max_uses_per_user INTEGER NOT NULL DEFAULT 0,
  uses_count INTEGER NOT NULL DEFAULT 0,
  coupon_scope VARCHAR(20) NOT NULL DEFAULT 'platform' CHECK (coupon_scope IN ('platform', 'restaurant')),
  restaurant_id BIGINT REFERENCES restaurants(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  user_address_id BIGINT REFERENCES user_addresses(id) ON DELETE SET NULL,
  order_status VARCHAR(20) NOT NULL,
  order_source VARCHAR(20) NOT NULL DEFAULT 'app',
  scheduled_for TIMESTAMP NULL,
  accepted_at TIMESTAMP NULL,
  preparing_at TIMESTAMP NULL,
  ready_at TIMESTAMP NULL,
  picked_up_at TIMESTAMP NULL,
  estimated_delivery_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  delivered_at TIMESTAMP NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  packaging_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  service_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  surge_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tip_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL,
  coupon_id BIGINT REFERENCES coupons(id) ON DELETE SET NULL,
  cancellation_reason TEXT,
  cancelled_by VARCHAR(20),
  distance_km NUMERIC(6, 2),
  customer_instructions TEXT
);

-- ORDER STATUS HISTORY
CREATE TABLE IF NOT EXISTS order_status_history (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_by VARCHAR(20),
  changed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id BIGINT NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  line_total NUMERIC(10, 2) NOT NULL
);

-- DRIVERS
CREATE TABLE IF NOT EXISTS drivers (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone VARCHAR(20),
  vehicle_type VARCHAR(20) NOT NULL,
  join_date DATE,
  rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0,
  total_deliveries INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DRIVER SHIFTS
CREATE TABLE IF NOT EXISTS driver_shifts (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  shift_date DATE NOT NULL,
  shift_start TIMESTAMP NOT NULL,
  shift_end TIMESTAMP,
  city VARCHAR(80),
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled'
);

-- DRIVER ASSIGNMENTS
CREATE TABLE IF NOT EXISTS driver_assignments (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  assigned_at TIMESTAMP NOT NULL,
  accepted_at TIMESTAMP NULL,
  arrived_at_restaurant_at TIMESTAMP NULL,
  picked_up_at TIMESTAMP NULL,
  delivered_at TIMESTAMP NULL,
  failed_at TIMESTAMP NULL,
  trip_distance_km NUMERIC(6, 2),
  wait_time_minutes INTEGER,
  delivery_earnings NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tip_earnings NUMERIC(10, 2) NOT NULL DEFAULT 0,
  failure_reason TEXT
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  payment_method VARCHAR(20) NOT NULL,
  payment_gateway VARCHAR(30),
  payment_status VARCHAR(20) NOT NULL,
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  refunded_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  paid_at TIMESTAMP NULL,
  refunded_at TIMESTAMP NULL,
  transaction_ref VARCHAR(80),
  gateway_fee NUMERIC(10, 2) DEFAULT 0
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  food_rating INTEGER CHECK (food_rating BETWEEN 1 AND 5),
  delivery_rating INTEGER CHECK (delivery_rating BETWEEN 1 AND 5),
  packaging_rating INTEGER CHECK (packaging_rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  issue_type VARCHAR(50) NOT NULL,
  channel VARCHAR(20) NOT NULL DEFAULT 'app',
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  status VARCHAR(30) NOT NULL,
  refund_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  resolution_time_minutes INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL
);

-- COUPON USAGE LOGS
CREATE TABLE IF NOT EXISTS coupon_usage_logs (
  id BIGSERIAL PRIMARY KEY,
  coupon_id BIGINT NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  used_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_food_user_addresses_user ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_food_restaurants_city ON restaurants(city);
CREATE INDEX IF NOT EXISTS idx_food_restaurants_cuisine ON restaurants(cuisine);
CREATE INDEX IF NOT EXISTS idx_food_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_food_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_food_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_food_orders_restaurant ON orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_food_orders_coupon ON orders(coupon_id);
CREATE INDEX IF NOT EXISTS idx_food_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_food_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_food_order_history_order ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_food_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_food_order_items_menu_item ON order_items(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_food_driver_assignments_driver ON driver_assignments(driver_id);
CREATE INDEX IF NOT EXISTS idx_food_driver_assignments_status ON driver_assignments(status);
CREATE INDEX IF NOT EXISTS idx_food_driver_shifts_driver_date ON driver_shifts(driver_id, shift_date);
CREATE INDEX IF NOT EXISTS idx_food_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_food_reviews_restaurant ON reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_food_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_food_support_tickets_order ON support_tickets(order_id);
CREATE INDEX IF NOT EXISTS idx_food_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_food_coupon_usage_coupon ON coupon_usage_logs(coupon_id);
CREATE INDEX IF NOT EXISTS idx_food_coupon_usage_user ON coupon_usage_logs(user_id);
