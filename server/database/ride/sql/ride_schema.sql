-- ======================
-- RIDE SHARING APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS ride_schema;
SET search_path TO ride_schema, public;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  city VARCHAR(80) NOT NULL,
  signup_source VARCHAR(30),
  signup_channel VARCHAR(30),
  referral_code VARCHAR(30) UNIQUE,
  referred_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  default_payment_method VARCHAR(20),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  last_trip_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DRIVERS
CREATE TABLE IF NOT EXISTS drivers (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  city VARCHAR(80) NOT NULL,
  license_number VARCHAR(50) NOT NULL UNIQUE,
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  onboarding_completed_at TIMESTAMP NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_suspended BOOLEAN NOT NULL DEFAULT false,
  suspension_reason TEXT,
  driver_tier VARCHAR(20) NOT NULL DEFAULT 'standard' CHECK (driver_tier IN ('standard', 'gold', 'platinum')),
  rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0,
  completed_trip_count INTEGER NOT NULL DEFAULT 0,
  cancelled_trip_count INTEGER NOT NULL DEFAULT 0,
  last_trip_completed_at TIMESTAMP NULL
);

-- DRIVER DOCUMENTS
CREATE TABLE IF NOT EXISTS driver_documents (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  document_type VARCHAR(30) NOT NULL CHECK (document_type IN ('license', 'insurance', 'registration', 'permit', 'background_check')),
  document_number VARCHAR(80),
  issued_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
  verified_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- VEHICLES
CREATE TABLE IF NOT EXISTS vehicles (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  vehicle_type VARCHAR(30) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  color VARCHAR(30),
  plate_number VARCHAR(20) NOT NULL UNIQUE,
  manufacture_year INTEGER,
  fuel_type VARCHAR(20) CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'cng', 'hybrid')),
  seating_capacity INTEGER CHECK (seating_capacity IS NULL OR seating_capacity > 0),
  registration_city VARCHAR(80),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LOCATIONS
CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,
  city VARCHAR(80) NOT NULL,
  area_name VARCHAR(120) NOT NULL,
  zone_name VARCHAR(120),
  latitude NUMERIC(9, 6) NOT NULL,
  longitude NUMERIC(9, 6) NOT NULL,
  location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('pickup', 'dropoff', 'hub', 'airport', 'station', 'hotspot', 'residential', 'commercial')),
  is_surge_zone BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DRIVER SHIFTS
CREATE TABLE IF NOT EXISTS driver_shifts (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  shift_start TIMESTAMP NOT NULL,
  shift_end TIMESTAMP NULL,
  start_location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
  end_location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
  shift_status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (shift_status IN ('open', 'closed', 'cancelled')),
  total_online_minutes INTEGER CHECK (total_online_minutes IS NULL OR total_online_minutes >= 0),
  total_trip_minutes INTEGER CHECK (total_trip_minutes IS NULL OR total_trip_minutes >= 0),
  total_idle_minutes INTEGER CHECK (total_idle_minutes IS NULL OR total_idle_minutes >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (shift_end IS NULL OR shift_end >= shift_start)
);

-- RIDER SAVED PLACES
CREATE TABLE IF NOT EXISTS rider_saved_places (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(40) NOT NULL,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, label)
);

-- PROMOS
CREATE TABLE IF NOT EXISTS promos (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  description TEXT,
  discount_type VARCHAR(10) NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value >= 0),
  min_fare NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (min_fare >= 0),
  max_discount_amount NUMERIC(10, 2) CHECK (max_discount_amount IS NULL OR max_discount_amount >= 0),
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  max_uses INTEGER NOT NULL DEFAULT 0 CHECK (max_uses >= 0),
  uses_count INTEGER NOT NULL DEFAULT 0 CHECK (uses_count >= 0),
  per_user_limit INTEGER NOT NULL DEFAULT 1 CHECK (per_user_limit >= 0),
  applicable_ride_type VARCHAR(20),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_at >= starts_at)
);

-- SURGE PRICING
CREATE TABLE IF NOT EXISTS surge_pricing (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  ride_type VARCHAR(20) NOT NULL CHECK (ride_type IN ('bike', 'auto', 'cab', 'premium', 'pool')),
  surge_multiplier NUMERIC(4, 2) NOT NULL CHECK (surge_multiplier > 0),
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  reason VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_at >= starts_at)
);

-- TRIPS
CREATE TABLE IF NOT EXISTS trips (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  driver_id BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
  vehicle_id BIGINT REFERENCES vehicles(id) ON DELETE SET NULL,
  pickup_location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  dropoff_location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  promo_id BIGINT REFERENCES promos(id) ON DELETE SET NULL,
  shift_id BIGINT REFERENCES driver_shifts(id) ON DELETE SET NULL,

  trip_status VARCHAR(20) NOT NULL CHECK (trip_status IN ('requested', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled', 'expired')),
  ride_type VARCHAR(20) NOT NULL CHECK (ride_type IN ('bike', 'auto', 'cab', 'premium', 'pool')),

  requested_at TIMESTAMP NOT NULL DEFAULT NOW(),
  accepted_at TIMESTAMP NULL,
  arrived_at TIMESTAMP NULL,
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,

  cancelled_by VARCHAR(20) CHECK (cancelled_by IN ('rider', 'driver', 'system')),
  cancellation_reason TEXT,

  estimated_distance_km NUMERIC(8, 2) NOT NULL DEFAULT 0 CHECK (estimated_distance_km >= 0),
  actual_distance_km NUMERIC(8, 2) CHECK (actual_distance_km IS NULL OR actual_distance_km >= 0),
  estimated_duration_mins INTEGER CHECK (estimated_duration_mins IS NULL OR estimated_duration_mins >= 0),
  actual_duration_mins INTEGER CHECK (actual_duration_mins IS NULL OR actual_duration_mins >= 0),
  estimated_pickup_eta_mins INTEGER CHECK (estimated_pickup_eta_mins IS NULL OR estimated_pickup_eta_mins >= 0),
  actual_pickup_eta_mins INTEGER CHECK (actual_pickup_eta_mins IS NULL OR actual_pickup_eta_mins >= 0),

  rider_wait_time_mins INTEGER CHECK (rider_wait_time_mins IS NULL OR rider_wait_time_mins >= 0),
  driver_arrival_delay_mins INTEGER CHECK (driver_arrival_delay_mins IS NULL OR driver_arrival_delay_mins >= 0),

  base_fare NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (base_fare >= 0),
  distance_fare NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (distance_fare >= 0),
  time_fare NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (time_fare >= 0),
  waiting_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (waiting_fee >= 0),
  toll_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (toll_fee >= 0),
  airport_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (airport_fee >= 0),
  platform_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (platform_fee >= 0),

  surge_multiplier NUMERIC(4, 2) NOT NULL DEFAULT 1.00 CHECK (surge_multiplier > 0),
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  total_fare NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total_fare >= 0),

  rider_device_type VARCHAR(20),
  booking_channel VARCHAR(20) CHECK (booking_channel IN ('app', 'web', 'phone')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),

  CHECK (accepted_at IS NULL OR accepted_at >= requested_at),
  CHECK (arrived_at IS NULL OR arrived_at >= requested_at),
  CHECK (started_at IS NULL OR started_at >= requested_at),
  CHECK (completed_at IS NULL OR completed_at >= requested_at),
  CHECK (cancelled_at IS NULL OR cancelled_at >= requested_at)
);

-- FARE COMPONENTS
CREATE TABLE IF NOT EXISTS fare_components (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  component_name VARCHAR(30) NOT NULL CHECK (component_name IN ('base_fare', 'distance_fare', 'time_fare', 'waiting_fee', 'toll_fee', 'airport_fee', 'platform_fee', 'discount', 'surge')),
  amount NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TRIP EVENTS
CREATE TABLE IF NOT EXISTS trip_events (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  event_type VARCHAR(30) NOT NULL CHECK (event_type IN ('requested', 'driver_assigned', 'driver_arriving', 'trip_started', 'trip_completed', 'trip_cancelled', 'payment_success', 'payment_failed', 'support_raised')),
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- TRIP STATUS HISTORY
CREATE TABLE IF NOT EXISTS trip_status_history (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  changed_by VARCHAR(20) CHECK (changed_by IN ('rider', 'driver', 'system', 'admin')),
  notes TEXT
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT NOT NULL UNIQUE REFERENCES trips(id) ON DELETE CASCADE,
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('cash', 'card', 'upi', 'wallet')),
  payment_provider VARCHAR(30),
  payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('pending', 'successful', 'failed', 'refunded', 'partial_refund')),
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
  refund_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (refund_amount >= 0),
  paid_at TIMESTAMP NULL,
  refunded_at TIMESTAMP NULL,
  transaction_ref VARCHAR(80) UNIQUE,
  failure_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (refunded_at IS NULL OR paid_at IS NULL OR refunded_at >= paid_at)
);

-- DRIVER PAYOUTS
CREATE TABLE IF NOT EXISTS driver_payouts (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  trip_id BIGINT UNIQUE REFERENCES trips(id) ON DELETE CASCADE,
  gross_fare NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (gross_fare >= 0),
  platform_commission NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (platform_commission >= 0),
  incentive_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (incentive_amount >= 0),
  penalty_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (penalty_amount >= 0),
  net_payout NUMERIC(10, 2) NOT NULL DEFAULT 0,
  payout_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payout_status IN ('pending', 'processed', 'failed')),
  processed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DRIVER LOCATION LOGS
CREATE TABLE IF NOT EXISTS driver_location_logs (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  latitude NUMERIC(9, 6) NOT NULL,
  longitude NUMERIC(9, 6) NOT NULL,
  speed_kmph NUMERIC(6, 2),
  heading_degree NUMERIC(6, 2),
  accuracy_meters NUMERIC(8, 2),
  is_online BOOLEAN NOT NULL DEFAULT true,
  availability_status VARCHAR(20) NOT NULL DEFAULT 'available'
    CHECK (availability_status IN ('available', 'on_trip', 'offline', 'break')),
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TRIP DRIVER MATCHES
CREATE TABLE IF NOT EXISTS trip_driver_matches (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  offered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  responded_at TIMESTAMP NULL,
  response_status VARCHAR(20) NOT NULL
    CHECK (response_status IN ('accepted', 'rejected', 'timeout', 'ignored', 'cancelled')),
  estimated_pickup_eta_mins INTEGER CHECK (estimated_pickup_eta_mins IS NULL OR estimated_pickup_eta_mins >= 0),
  distance_to_rider_km NUMERIC(8, 2) CHECK (distance_to_rider_km IS NULL OR distance_to_rider_km >= 0),
  offer_round INTEGER NOT NULL DEFAULT 1 CHECK (offer_round > 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(trip_id, driver_id, offer_round),
  CHECK (responded_at IS NULL OR responded_at >= offered_at)
);

-- RIDER APP EVENTS
CREATE TABLE IF NOT EXISTS rider_app_events (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  trip_id BIGINT REFERENCES trips(id) ON DELETE SET NULL,
  session_id VARCHAR(80),
  event_name VARCHAR(50) NOT NULL,
  screen_name VARCHAR(50),
  device_type VARCHAR(20),
  app_version VARCHAR(20),
  city VARCHAR(80),
  source_channel VARCHAR(30),
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- DRIVER INCENTIVES
CREATE TABLE IF NOT EXISTS driver_incentives (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  incentive_type VARCHAR(30) NOT NULL
    CHECK (incentive_type IN ('trip_target', 'peak_hour_bonus', 'acceptance_bonus', 'guaranteed_earnings', 'referral_bonus')),
  incentive_name VARCHAR(100) NOT NULL,
  target_trip_count INTEGER CHECK (target_trip_count IS NULL OR target_trip_count >= 0),
  achieved_trip_count INTEGER NOT NULL DEFAULT 0 CHECK (achieved_trip_count >= 0),
  target_amount NUMERIC(10, 2) CHECK (target_amount IS NULL OR target_amount >= 0),
  incentive_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (incentive_amount >= 0),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'achieved', 'expired', 'paid', 'cancelled')),
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (period_end >= period_start)
);

-- DRIVER SESSIONS
CREATE TABLE IF NOT EXISTS driver_sessions (
  id BIGSERIAL PRIMARY KEY,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  login_at TIMESTAMP NOT NULL,
  logout_at TIMESTAMP NULL,
  session_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (session_status IN ('active', 'closed', 'force_closed')),
  app_version VARCHAR(20),
  device_type VARCHAR(20),
  city VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (logout_at IS NULL OR logout_at >= login_at)
);

-- RIDER SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS rider_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_name VARCHAR(40) NOT NULL,
  plan_type VARCHAR(20) NOT NULL
    CHECK (plan_type IN ('monthly', 'quarterly', 'yearly', 'trial')),
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  benefits_summary TEXT,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  auto_renew BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_at >= starts_at)
);

-- SAFETY INCIDENTS
CREATE TABLE IF NOT EXISTS safety_incidents (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT REFERENCES trips(id) ON DELETE SET NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  driver_id BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
  severity VARCHAR(20) NOT NULL
    CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  issue_type VARCHAR(30) NOT NULL
    CHECK (issue_type IN ('rash_driving', 'route_deviation', 'harassment', 'vehicle_issue', 'accident', 'unsafe_stop', 'other')),
  incident_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (incident_status IN ('open', 'investigating', 'resolved', 'closed')),
  reported_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  notes TEXT,
  CHECK (resolved_at IS NULL OR resolved_at >= reported_at)
);

-- RATINGS
CREATE TABLE IF NOT EXISTS ratings (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT NOT NULL UNIQUE REFERENCES trips(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  driver_id BIGINT NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  issue_tag VARCHAR(30) CHECK (issue_tag IN ('late_pickup', 'rude_behavior', 'unsafe_driving', 'cleanliness', 'great_service')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGSERIAL PRIMARY KEY,
  trip_id BIGINT REFERENCES trips(id) ON DELETE SET NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  driver_id BIGINT REFERENCES drivers(id) ON DELETE SET NULL,
  ticket_type VARCHAR(30) NOT NULL CHECK (ticket_type IN ('fare_issue', 'safety', 'payment_issue', 'driver_behavior', 'rider_behavior', 'other')),
  ticket_status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (ticket_status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  resolution_time_mins INTEGER CHECK (resolution_time_mins IS NULL OR resolution_time_mins >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_ride_users_city ON users(city);
CREATE INDEX IF NOT EXISTS idx_ride_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_ride_users_referrer ON users(referred_by_user_id);
CREATE INDEX IF NOT EXISTS idx_ride_users_last_trip_at ON users(last_trip_at);

CREATE INDEX IF NOT EXISTS idx_ride_drivers_city ON drivers(city);
CREATE INDEX IF NOT EXISTS idx_ride_drivers_active ON drivers(is_active);
CREATE INDEX IF NOT EXISTS idx_ride_drivers_verified ON drivers(is_verified);
CREATE INDEX IF NOT EXISTS idx_ride_drivers_last_trip_completed_at ON drivers(last_trip_completed_at);

CREATE INDEX IF NOT EXISTS idx_ride_driver_documents_driver ON driver_documents(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_driver_documents_type ON driver_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_ride_driver_documents_expires_at ON driver_documents(expires_at);
CREATE INDEX IF NOT EXISTS idx_ride_driver_documents_status ON driver_documents(verification_status);

CREATE INDEX IF NOT EXISTS idx_ride_vehicles_driver ON vehicles(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_vehicles_type ON vehicles(vehicle_type);
CREATE INDEX IF NOT EXISTS idx_ride_vehicles_active ON vehicles(is_active);

CREATE INDEX IF NOT EXISTS idx_ride_driver_shifts_driver ON driver_shifts(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_driver_shifts_start ON driver_shifts(shift_start);
CREATE INDEX IF NOT EXISTS idx_ride_driver_shifts_status ON driver_shifts(shift_status);

CREATE INDEX IF NOT EXISTS idx_ride_locations_city ON locations(city);
CREATE INDEX IF NOT EXISTS idx_ride_locations_area_name ON locations(area_name);
CREATE INDEX IF NOT EXISTS idx_ride_locations_zone_name ON locations(zone_name);
CREATE INDEX IF NOT EXISTS idx_ride_locations_surge_zone ON locations(is_surge_zone);

CREATE INDEX IF NOT EXISTS idx_ride_saved_places_user ON rider_saved_places(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_saved_places_location ON rider_saved_places(location_id);

CREATE INDEX IF NOT EXISTS idx_ride_promos_active ON promos(is_active);
CREATE INDEX IF NOT EXISTS idx_ride_promos_ends_at ON promos(ends_at);
CREATE INDEX IF NOT EXISTS idx_ride_promos_ride_type ON promos(applicable_ride_type);

CREATE INDEX IF NOT EXISTS idx_ride_surge_location ON surge_pricing(location_id);
CREATE INDEX IF NOT EXISTS idx_ride_surge_ride_type ON surge_pricing(ride_type);
CREATE INDEX IF NOT EXISTS idx_ride_surge_starts_at ON surge_pricing(starts_at);
CREATE INDEX IF NOT EXISTS idx_ride_surge_ends_at ON surge_pricing(ends_at);

CREATE INDEX IF NOT EXISTS idx_ride_trips_user ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_driver ON trips(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_vehicle ON trips(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_pickup_location ON trips(pickup_location_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_dropoff_location ON trips(dropoff_location_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_promo ON trips(promo_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_shift ON trips(shift_id);
CREATE INDEX IF NOT EXISTS idx_ride_trips_status ON trips(trip_status);
CREATE INDEX IF NOT EXISTS idx_ride_trips_requested_at ON trips(requested_at);
CREATE INDEX IF NOT EXISTS idx_ride_trips_completed_at ON trips(completed_at);
CREATE INDEX IF NOT EXISTS idx_ride_trips_ride_type ON trips(ride_type);
CREATE INDEX IF NOT EXISTS idx_ride_trips_cancelled_by ON trips(cancelled_by);
CREATE INDEX IF NOT EXISTS idx_ride_trips_booking_channel ON trips(booking_channel);

CREATE INDEX IF NOT EXISTS idx_ride_fare_components_trip ON fare_components(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_fare_components_name ON fare_components(component_name);

CREATE INDEX IF NOT EXISTS idx_ride_trip_events_trip ON trip_events(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_trip_events_type ON trip_events(event_type);
CREATE INDEX IF NOT EXISTS idx_ride_trip_events_time ON trip_events(event_time);

CREATE INDEX IF NOT EXISTS idx_ride_trip_status_history_trip ON trip_status_history(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_trip_status_history_new_status ON trip_status_history(new_status);
CREATE INDEX IF NOT EXISTS idx_ride_trip_status_history_changed_at ON trip_status_history(changed_at);

CREATE INDEX IF NOT EXISTS idx_ride_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_ride_payments_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_ride_payments_provider ON payments(payment_provider);
CREATE INDEX IF NOT EXISTS idx_ride_payments_paid_at ON payments(paid_at);

CREATE INDEX IF NOT EXISTS idx_ride_driver_payouts_driver ON driver_payouts(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_driver_payouts_status ON driver_payouts(payout_status);
CREATE INDEX IF NOT EXISTS idx_ride_driver_payouts_processed_at ON driver_payouts(processed_at);

CREATE INDEX IF NOT EXISTS idx_ride_driver_location_logs_driver ON driver_location_logs(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_driver_location_logs_recorded_at ON driver_location_logs(recorded_at);
CREATE INDEX IF NOT EXISTS idx_ride_driver_location_logs_online ON driver_location_logs(is_online);
CREATE INDEX IF NOT EXISTS idx_ride_driver_location_logs_status ON driver_location_logs(availability_status);

CREATE INDEX IF NOT EXISTS idx_ride_trip_driver_matches_trip ON trip_driver_matches(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_trip_driver_matches_driver ON trip_driver_matches(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_trip_driver_matches_status ON trip_driver_matches(response_status);
CREATE INDEX IF NOT EXISTS idx_ride_trip_driver_matches_offered_at ON trip_driver_matches(offered_at);

CREATE INDEX IF NOT EXISTS idx_ride_rider_app_events_user ON rider_app_events(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_rider_app_events_trip ON rider_app_events(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_rider_app_events_event_name ON rider_app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_ride_rider_app_events_screen_name ON rider_app_events(screen_name);
CREATE INDEX IF NOT EXISTS idx_ride_rider_app_events_event_time ON rider_app_events(event_time);

CREATE INDEX IF NOT EXISTS idx_ride_driver_incentives_driver ON driver_incentives(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_driver_incentives_type ON driver_incentives(incentive_type);
CREATE INDEX IF NOT EXISTS idx_ride_driver_incentives_status ON driver_incentives(status);
CREATE INDEX IF NOT EXISTS idx_ride_driver_incentives_period_start ON driver_incentives(period_start);
CREATE INDEX IF NOT EXISTS idx_ride_driver_incentives_period_end ON driver_incentives(period_end);

CREATE INDEX IF NOT EXISTS idx_ride_driver_sessions_driver ON driver_sessions(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_driver_sessions_login_at ON driver_sessions(login_at);
CREATE INDEX IF NOT EXISTS idx_ride_driver_sessions_logout_at ON driver_sessions(logout_at);
CREATE INDEX IF NOT EXISTS idx_ride_driver_sessions_status ON driver_sessions(session_status);

CREATE INDEX IF NOT EXISTS idx_ride_rider_subscriptions_user ON rider_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_rider_subscriptions_active ON rider_subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_ride_rider_subscriptions_starts_at ON rider_subscriptions(starts_at);
CREATE INDEX IF NOT EXISTS idx_ride_rider_subscriptions_ends_at ON rider_subscriptions(ends_at);

CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_trip ON safety_incidents(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_user ON safety_incidents(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_driver ON safety_incidents(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_severity ON safety_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_type ON safety_incidents(issue_type);
CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_status ON safety_incidents(incident_status);
CREATE INDEX IF NOT EXISTS idx_ride_safety_incidents_reported_at ON safety_incidents(reported_at);

CREATE INDEX IF NOT EXISTS idx_ride_ratings_driver ON ratings(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_ratings_user ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_ratings_created_at ON ratings(created_at);
CREATE INDEX IF NOT EXISTS idx_ride_ratings_issue_tag ON ratings(issue_tag);

CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_trip ON support_tickets(trip_id);
CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_driver ON support_tickets(driver_id);
CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_type ON support_tickets(ticket_type);
CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_status ON support_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_ride_support_tickets_created_at ON support_tickets(created_at);
