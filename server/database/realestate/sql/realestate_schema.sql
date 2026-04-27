-- ===========================
-- REAL ESTATE APP SETUP
-- ===========================

CREATE SCHEMA IF NOT EXISTS realestate_schema;
SET search_path TO realestate_schema, public;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  user_type VARCHAR(20) NOT NULL DEFAULT 'seeker'
    CHECK (user_type IN ('seeker', 'owner', 'tenant', 'executive', 'admin')),
  city VARCHAR(80),
  signup_source VARCHAR(30),
  signup_channel VARCHAR(30),
  referral_code VARCHAR(30) UNIQUE,
  referred_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  is_phone_verified BOOLEAN NOT NULL DEFAULT false,
  is_email_verified BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_active_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- OWNER PROFILES
CREATE TABLE IF NOT EXISTS owner_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  owner_type VARCHAR(20) NOT NULL DEFAULT 'individual'
    CHECK (owner_type IN ('individual', 'company', 'broker')),
  company_name TEXT,
  gst_number VARCHAR(30),
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending', 'partially_verified', 'verified', 'rejected')),
  verified_at TIMESTAMP NULL,
  verification_notes TEXT,
  onboarding_source VARCHAR(30),
  onboarding_completed_at TIMESTAMP NULL,
  total_properties_count INTEGER NOT NULL DEFAULT 0 CHECK (total_properties_count >= 0),
  active_listings_count INTEGER NOT NULL DEFAULT 0 CHECK (active_listings_count >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SEEKER PROFILES
CREATE TABLE IF NOT EXISTS seeker_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  preferred_city VARCHAR(80),
  preferred_locality VARCHAR(120),
  budget_min NUMERIC(12, 2) CHECK (budget_min IS NULL OR budget_min >= 0),
  budget_max NUMERIC(12, 2) CHECK (budget_max IS NULL OR budget_max >= 0),
  move_in_date DATE NULL,
  preferred_property_type VARCHAR(30),
  furnishing_preference VARCHAR(20)
    CHECK (furnishing_preference IS NULL OR furnishing_preference IN ('unfurnished', 'semi_furnished', 'fully_furnished')),
  tenant_verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (tenant_verification_status IN ('pending', 'verified', 'rejected', 'expired')),
  verified_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (budget_max IS NULL OR budget_min IS NULL OR budget_max >= budget_min)
);

-- EXECUTIVE PROFILES
CREATE TABLE IF NOT EXISTS executive_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_code VARCHAR(30) NOT NULL UNIQUE,
  team_name VARCHAR(50),
  manager_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- USER DOCUMENTS
CREATE TABLE IF NOT EXISTS user_documents (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(30) NOT NULL
    CHECK (document_type IN ('aadhaar', 'pan', 'passport', 'driving_license', 'rental_agreement', 'salary_slip', 'bank_statement', 'company_id', 'other')),
  document_number VARCHAR(80),
  issued_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
  verified_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  verified_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- OWNER VERIFICATION REQUESTS
CREATE TABLE IF NOT EXISTS owner_verification_requests (
  id BIGSERIAL PRIMARY KEY,
  owner_profile_id BIGINT NOT NULL REFERENCES owner_profiles(id) ON DELETE CASCADE,
  assigned_executive_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  request_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (request_status IN ('pending', 'in_review', 'approved', 'rejected', 'needs_resubmission')),
  ownership_doc_type VARCHAR(30)
    CHECK (ownership_doc_type IS NULL OR ownership_doc_type IN ('sale_deed', 'tax_receipt', 'encumbrance_certificate', 'khata', 'other')),
  ownership_doc_number VARCHAR(80),
  reviewed_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LOCATIONS
CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,
  city VARCHAR(80) NOT NULL,
  locality VARCHAR(120) NOT NULL,
  sublocality VARCHAR(120),
  pincode VARCHAR(15),
  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6),
  zone_name VARCHAR(120),
  location_type VARCHAR(20) NOT NULL DEFAULT 'residential'
    CHECK (location_type IN ('residential', 'commercial', 'mixed_use', 'landmark', 'transit_hub', 'gated_community')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PROPERTIES
CREATE TABLE IF NOT EXISTS properties (
  id BIGSERIAL PRIMARY KEY,
  owner_profile_id BIGINT NOT NULL REFERENCES owner_profiles(id) ON DELETE CASCADE,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  property_title TEXT NOT NULL,
  property_type VARCHAR(30) NOT NULL
    CHECK (property_type IN ('apartment', 'independent_house', 'villa', 'plot', 'studio', 'pg', 'office', 'shop')),
  listing_intent VARCHAR(20) NOT NULL DEFAULT 'rent'
    CHECK (listing_intent IN ('rent', 'sale', 'lease')),
  building_name VARCHAR(120),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  bedrooms INTEGER CHECK (bedrooms IS NULL OR bedrooms >= 0),
  bathrooms INTEGER CHECK (bathrooms IS NULL OR bathrooms >= 0),
  balconies INTEGER CHECK (balconies IS NULL OR balconies >= 0),
  floor_number INTEGER,
  total_floors INTEGER CHECK (total_floors IS NULL OR total_floors > 0),
  built_up_area_sqft NUMERIC(10, 2) CHECK (built_up_area_sqft IS NULL OR built_up_area_sqft >= 0),
  carpet_area_sqft NUMERIC(10, 2) CHECK (carpet_area_sqft IS NULL OR carpet_area_sqft >= 0),
  plot_area_sqft NUMERIC(10, 2) CHECK (plot_area_sqft IS NULL OR plot_area_sqft >= 0),
  furnishing_status VARCHAR(20)
    CHECK (furnishing_status IS NULL OR furnishing_status IN ('unfurnished', 'semi_furnished', 'fully_furnished')),
  facing_direction VARCHAR(20)
    CHECK (facing_direction IS NULL OR facing_direction IN ('north', 'south', 'east', 'west', 'north_east', 'north_west', 'south_east', 'south_west')),
  parking_type VARCHAR(20)
    CHECK (parking_type IS NULL OR parking_type IN ('none', 'bike', 'car', 'both')),
  property_age_years INTEGER CHECK (property_age_years IS NULL OR property_age_years >= 0),
  possession_status VARCHAR(20) NOT NULL DEFAULT 'ready'
    CHECK (possession_status IN ('ready', 'under_construction', 'occupied')),
  is_gated_community BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (total_floors IS NULL OR floor_number IS NULL OR total_floors >= floor_number)
);

-- PROPERTY OWNERSHIP HISTORY
CREATE TABLE IF NOT EXISTS property_ownership_history (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  owner_profile_id BIGINT NOT NULL REFERENCES owner_profiles(id) ON DELETE CASCADE,
  ownership_start_date DATE NOT NULL,
  ownership_end_date DATE NULL,
  ownership_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (ownership_status IN ('active', 'transferred', 'inactive')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ownership_end_date IS NULL OR ownership_end_date >= ownership_start_date)
);

-- AMENITIES
CREATE TABLE IF NOT EXISTS amenities (
  id BIGSERIAL PRIMARY KEY,
  amenity_name VARCHAR(80) NOT NULL UNIQUE,
  amenity_category VARCHAR(30) NOT NULL
    CHECK (amenity_category IN ('safety', 'sports', 'parking', 'utilities', 'lifestyle', 'accessibility', 'nearby')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PROPERTY AMENITIES
CREATE TABLE IF NOT EXISTS property_amenities (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id BIGINT NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(property_id, amenity_id)
);

-- LISTINGS
CREATE TABLE IF NOT EXISTS listings (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  owner_profile_id BIGINT NOT NULL REFERENCES owner_profiles(id) ON DELETE CASCADE,
  listing_type VARCHAR(20) NOT NULL DEFAULT 'owner'
    CHECK (listing_type IN ('owner', 'broker', 'builder')),
  listing_status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (listing_status IN ('draft', 'pending_review', 'live', 'paused', 'rented', 'sold', 'expired', 'rejected', 'archived')),
  availability_status VARCHAR(20) NOT NULL DEFAULT 'available'
    CHECK (availability_status IN ('available', 'blocked', 'occupied', 'under_negotiation')),
  listed_for VARCHAR(20) NOT NULL DEFAULT 'rent'
    CHECK (listed_for IN ('rent', 'sale', 'lease')),
  rent_amount NUMERIC(12, 2) CHECK (rent_amount IS NULL OR rent_amount >= 0),
  sale_price NUMERIC(14, 2) CHECK (sale_price IS NULL OR sale_price >= 0),
  security_deposit NUMERIC(12, 2) CHECK (security_deposit IS NULL OR security_deposit >= 0),
  maintenance_amount NUMERIC(12, 2) CHECK (maintenance_amount IS NULL OR maintenance_amount >= 0),
  brokerage_amount NUMERIC(12, 2) CHECK (brokerage_amount IS NULL OR brokerage_amount >= 0),
  available_from DATE NULL,
  lease_duration_months INTEGER CHECK (lease_duration_months IS NULL OR lease_duration_months > 0),
  preferred_tenant_type VARCHAR(20)
    CHECK (preferred_tenant_type IS NULL OR preferred_tenant_type IN ('family', 'bachelor', 'company', 'student', 'any')),
  pet_allowed BOOLEAN NOT NULL DEFAULT false,
  is_price_negotiable BOOLEAN NOT NULL DEFAULT false,
  furnishing_notes TEXT,
  description TEXT,
  posted_at TIMESTAMP NULL,
  live_at TIMESTAMP NULL,
  expired_at TIMESTAMP NULL,
  closed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LISTING MEDIA
CREATE TABLE IF NOT EXISTS listing_media (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  media_type VARCHAR(20) NOT NULL
    CHECK (media_type IN ('image', 'video', 'floor_plan', 'document')),
  media_url TEXT NOT NULL,
  room_tag VARCHAR(30),
  display_order INTEGER NOT NULL DEFAULT 1 CHECK (display_order > 0),
  is_cover BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LISTING STATUS HISTORY
CREATE TABLE IF NOT EXISTS listing_status_history (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- LISTING PRICE HISTORY
CREATE TABLE IF NOT EXISTS listing_price_history (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  old_rent_amount NUMERIC(12, 2),
  new_rent_amount NUMERIC(12, 2),
  old_sale_price NUMERIC(14, 2),
  new_sale_price NUMERIC(14, 2),
  changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  changed_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT
);

-- SHORTLISTS
CREATE TABLE IF NOT EXISTS shortlists (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- PROPERTY VIEWS
CREATE TABLE IF NOT EXISTS property_views (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  session_id VARCHAR(80),
  source_channel VARCHAR(30),
  device_type VARCHAR(20),
  view_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- INQUIRIES
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  seeker_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  inquiry_type VARCHAR(20) NOT NULL
    CHECK (inquiry_type IN ('call_request', 'visit_request', 'chat', 'callback', 'owner_contact_reveal')),
  inquiry_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (inquiry_status IN ('open', 'contacted', 'scheduled', 'closed', 'spam', 'converted')),
  message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMP NULL,
  CHECK (closed_at IS NULL OR closed_at >= created_at)
);

-- PROPERTY VISITS
CREATE TABLE IF NOT EXISTS property_visits (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  seeker_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  owner_profile_id BIGINT REFERENCES owner_profiles(id) ON DELETE SET NULL,
  executive_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMP NOT NULL,
  visit_status VARCHAR(20) NOT NULL DEFAULT 'scheduled'
    CHECK (visit_status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show')),
  feedback_rating INTEGER CHECK (feedback_rating IS NULL OR feedback_rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  cancelled_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  cancellation_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- OFFERS
CREATE TABLE IF NOT EXISTS offers (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  seeker_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  offered_rent NUMERIC(12, 2) CHECK (offered_rent IS NULL OR offered_rent >= 0),
  offered_deposit NUMERIC(12, 2) CHECK (offered_deposit IS NULL OR offered_deposit >= 0),
  lease_duration_months INTEGER CHECK (lease_duration_months IS NULL OR lease_duration_months > 0),
  move_in_date DATE NULL,
  offer_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (offer_status IN ('pending', 'countered', 'accepted', 'rejected', 'withdrawn', 'expired')),
  counter_rent NUMERIC(12, 2) CHECK (counter_rent IS NULL OR counter_rent >= 0),
  counter_deposit NUMERIC(12, 2) CHECK (counter_deposit IS NULL OR counter_deposit >= 0),
  responded_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (responded_at IS NULL OR responded_at >= created_at)
);

-- RENTAL APPLICATIONS
CREATE TABLE IF NOT EXISTS rental_applications (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  seeker_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  offer_id BIGINT REFERENCES offers(id) ON DELETE SET NULL,
  application_status VARCHAR(20) NOT NULL DEFAULT 'submitted'
    CHECK (application_status IN ('submitted', 'under_review', 'approved', 'rejected', 'withdrawn', 'expired')),
  monthly_income NUMERIC(12, 2) CHECK (monthly_income IS NULL OR monthly_income >= 0),
  employment_type VARCHAR(20)
    CHECK (employment_type IS NULL OR employment_type IN ('salaried', 'self_employed', 'student', 'retired', 'other')),
  employer_name TEXT,
  occupants_count INTEGER CHECK (occupants_count IS NULL OR occupants_count > 0),
  has_pets BOOLEAN NOT NULL DEFAULT false,
  requires_parking BOOLEAN NOT NULL DEFAULT false,
  background_check_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (background_check_status IN ('pending', 'clear', 'flagged', 'waived')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMP NULL,
  CHECK (reviewed_at IS NULL OR reviewed_at >= created_at)
);

-- LEASES
CREATE TABLE IF NOT EXISTS leases (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES listings(id) ON DELETE RESTRICT,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  owner_profile_id BIGINT NOT NULL REFERENCES owner_profiles(id) ON DELETE RESTRICT,
  tenant_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  application_id BIGINT REFERENCES rental_applications(id) ON DELETE SET NULL,
  lease_start_date DATE NOT NULL,
  lease_end_date DATE NOT NULL,
  monthly_rent NUMERIC(12, 2) NOT NULL CHECK (monthly_rent >= 0),
  security_deposit NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (security_deposit >= 0),
  maintenance_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (maintenance_amount >= 0),
  payment_due_day INTEGER NOT NULL CHECK (payment_due_day BETWEEN 1 AND 31),
  rent_cycle VARCHAR(20) NOT NULL DEFAULT 'monthly'
    CHECK (rent_cycle IN ('monthly', 'quarterly')),
  lease_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (lease_status IN ('active', 'expired', 'terminated', 'renewed')),
  signed_at TIMESTAMP NULL,
  terminated_at TIMESTAMP NULL,
  termination_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (lease_end_date >= lease_start_date),
  CHECK (terminated_at IS NULL OR signed_at IS NULL OR terminated_at >= signed_at)
);

-- RENT PAYMENTS
CREATE TABLE IF NOT EXISTS rent_payments (
  id BIGSERIAL PRIMARY KEY,
  lease_id BIGINT NOT NULL REFERENCES leases(id) ON DELETE CASCADE,
  tenant_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  due_date DATE NOT NULL,
  paid_at TIMESTAMP NULL,
  amount_due NUMERIC(12, 2) NOT NULL CHECK (amount_due >= 0),
  amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  late_fee NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (late_fee >= 0),
  payment_method VARCHAR(20)
    CHECK (payment_method IS NULL OR payment_method IN ('cash', 'bank_transfer', 'upi', 'card', 'cheque', 'wallet')),
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'partial', 'failed', 'refunded', 'overdue')),
  transaction_ref VARCHAR(80) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MAINTENANCE TICKETS
CREATE TABLE IF NOT EXISTS maintenance_tickets (
  id BIGSERIAL PRIMARY KEY,
  lease_id BIGINT REFERENCES leases(id) ON DELETE SET NULL,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  reported_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  assigned_executive_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  issue_type VARCHAR(30) NOT NULL
    CHECK (issue_type IN ('plumbing', 'electrical', 'appliance', 'painting', 'cleaning', 'security', 'structural', 'other')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  ticket_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (ticket_status IN ('open', 'assigned', 'in_progress', 'resolved', 'closed', 'cancelled')),
  resolution_cost NUMERIC(12, 2) CHECK (resolution_cost IS NULL OR resolution_cost >= 0),
  opened_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  description TEXT,
  CHECK (resolved_at IS NULL OR resolved_at >= opened_at)
);

-- REFERRALS
CREATE TABLE IF NOT EXISTS referrals (
  id BIGSERIAL PRIMARY KEY,
  referrer_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  referral_type VARCHAR(20) NOT NULL
    CHECK (referral_type IN ('owner', 'seeker', 'tenant')),
  referral_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (referral_status IN ('pending', 'signed_up', 'verified', 'converted', 'rejected')),
  reward_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (reward_amount >= 0),
  converted_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT REFERENCES listings(id) ON DELETE SET NULL,
  property_id BIGINT REFERENCES properties(id) ON DELETE SET NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  ticket_type VARCHAR(30) NOT NULL
    CHECK (ticket_type IN ('listing_issue', 'verification_issue', 'payment_issue', 'visit_issue', 'lease_issue', 'maintenance_issue', 'other')),
  ticket_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (ticket_status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  resolution_time_mins INTEGER CHECK (resolution_time_mins IS NULL OR resolution_time_mins >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

-- APP EVENTS
CREATE TABLE IF NOT EXISTS app_events (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  listing_id BIGINT REFERENCES listings(id) ON DELETE SET NULL,
  property_id BIGINT REFERENCES properties(id) ON DELETE SET NULL,
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

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_realestate_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_realestate_users_city ON users(city);
CREATE INDEX IF NOT EXISTS idx_realestate_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_realestate_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_realestate_users_last_active_at ON users(last_active_at);
CREATE INDEX IF NOT EXISTS idx_realestate_users_referrer ON users(referred_by_user_id);

CREATE INDEX IF NOT EXISTS idx_realestate_owner_profiles_verification_status ON owner_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_realestate_owner_profiles_created_at ON owner_profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_realestate_owner_profiles_owner_type ON owner_profiles(owner_type);

CREATE INDEX IF NOT EXISTS idx_realestate_seeker_profiles_preferred_city ON seeker_profiles(preferred_city);
CREATE INDEX IF NOT EXISTS idx_realestate_seeker_profiles_preferred_locality ON seeker_profiles(preferred_locality);
CREATE INDEX IF NOT EXISTS idx_realestate_seeker_profiles_move_in_date ON seeker_profiles(move_in_date);
CREATE INDEX IF NOT EXISTS idx_realestate_seeker_profiles_verification_status ON seeker_profiles(tenant_verification_status);

CREATE INDEX IF NOT EXISTS idx_realestate_executive_profiles_manager ON executive_profiles(manager_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_executive_profiles_team ON executive_profiles(team_name);
CREATE INDEX IF NOT EXISTS idx_realestate_executive_profiles_active ON executive_profiles(is_active);

CREATE INDEX IF NOT EXISTS idx_realestate_user_documents_user ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_user_documents_type ON user_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_realestate_user_documents_status ON user_documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_realestate_user_documents_expires_at ON user_documents(expires_at);
CREATE INDEX IF NOT EXISTS idx_realestate_user_documents_verified_by ON user_documents(verified_by_user_id);

CREATE INDEX IF NOT EXISTS idx_realestate_owner_verification_owner ON owner_verification_requests(owner_profile_id);
CREATE INDEX IF NOT EXISTS idx_realestate_owner_verification_exec ON owner_verification_requests(assigned_executive_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_owner_verification_status ON owner_verification_requests(request_status);
CREATE INDEX IF NOT EXISTS idx_realestate_owner_verification_created_at ON owner_verification_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_locations_city ON locations(city);
CREATE INDEX IF NOT EXISTS idx_realestate_locations_locality ON locations(locality);
CREATE INDEX IF NOT EXISTS idx_realestate_locations_sublocality ON locations(sublocality);
CREATE INDEX IF NOT EXISTS idx_realestate_locations_zone_name ON locations(zone_name);
CREATE INDEX IF NOT EXISTS idx_realestate_locations_pincode ON locations(pincode);

CREATE INDEX IF NOT EXISTS idx_realestate_properties_owner ON properties(owner_profile_id);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_location ON properties(location_id);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_intent ON properties(listing_intent);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_furnishing_status ON properties(furnishing_status);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_gated ON properties(is_gated_community);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_active ON properties(is_active);
CREATE INDEX IF NOT EXISTS idx_realestate_properties_created_at ON properties(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_property_ownership_property ON property_ownership_history(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_ownership_owner ON property_ownership_history(owner_profile_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_ownership_start ON property_ownership_history(ownership_start_date);
CREATE INDEX IF NOT EXISTS idx_realestate_property_ownership_status ON property_ownership_history(ownership_status);

CREATE INDEX IF NOT EXISTS idx_realestate_amenities_category ON amenities(amenity_category);

CREATE INDEX IF NOT EXISTS idx_realestate_property_amenities_property ON property_amenities(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_amenities_amenity ON property_amenities(amenity_id);

CREATE INDEX IF NOT EXISTS idx_realestate_listings_property ON listings(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_owner ON listings(owner_profile_id);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_status ON listings(listing_status);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_availability_status ON listings(availability_status);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_listed_for ON listings(listed_for);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_rent_amount ON listings(rent_amount);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_sale_price ON listings(sale_price);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_available_from ON listings(available_from);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_posted_at ON listings(posted_at);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_live_at ON listings(live_at);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_created_at ON listings(created_at);
CREATE INDEX IF NOT EXISTS idx_realestate_listings_preferred_tenant_type ON listings(preferred_tenant_type);

CREATE INDEX IF NOT EXISTS idx_realestate_listing_media_listing ON listing_media(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_media_type ON listing_media(media_type);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_media_cover ON listing_media(is_cover);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_media_display_order ON listing_media(display_order);

CREATE INDEX IF NOT EXISTS idx_realestate_listing_status_history_listing ON listing_status_history(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_status_history_new_status ON listing_status_history(new_status);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_status_history_changed_by ON listing_status_history(changed_by_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_status_history_changed_at ON listing_status_history(changed_at);

CREATE INDEX IF NOT EXISTS idx_realestate_listing_price_history_listing ON listing_price_history(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_price_history_changed_at ON listing_price_history(changed_at);
CREATE INDEX IF NOT EXISTS idx_realestate_listing_price_history_changed_by ON listing_price_history(changed_by_user_id);

CREATE INDEX IF NOT EXISTS idx_realestate_shortlists_user ON shortlists(user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_shortlists_listing ON shortlists(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_shortlists_created_at ON shortlists(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_property_views_user ON property_views(user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_views_listing ON property_views(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_views_source ON property_views(source_channel);
CREATE INDEX IF NOT EXISTS idx_realestate_property_views_device ON property_views(device_type);
CREATE INDEX IF NOT EXISTS idx_realestate_property_views_time ON property_views(view_time);

CREATE INDEX IF NOT EXISTS idx_realestate_inquiries_listing ON inquiries(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_inquiries_seeker ON inquiries(seeker_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_inquiries_type ON inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_realestate_inquiries_status ON inquiries(inquiry_status);
CREATE INDEX IF NOT EXISTS idx_realestate_inquiries_created_at ON inquiries(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_listing ON property_visits(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_seeker ON property_visits(seeker_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_owner ON property_visits(owner_profile_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_executive ON property_visits(executive_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_scheduled_at ON property_visits(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_status ON property_visits(visit_status);
CREATE INDEX IF NOT EXISTS idx_realestate_property_visits_cancelled_by ON property_visits(cancelled_by_user_id);

CREATE INDEX IF NOT EXISTS idx_realestate_offers_listing ON offers(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_offers_seeker ON offers(seeker_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_offers_status ON offers(offer_status);
CREATE INDEX IF NOT EXISTS idx_realestate_offers_created_at ON offers(created_at);
CREATE INDEX IF NOT EXISTS idx_realestate_offers_expires_at ON offers(expires_at);

CREATE INDEX IF NOT EXISTS idx_realestate_rental_applications_listing ON rental_applications(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_rental_applications_seeker ON rental_applications(seeker_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_rental_applications_offer ON rental_applications(offer_id);
CREATE INDEX IF NOT EXISTS idx_realestate_rental_applications_status ON rental_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_realestate_rental_applications_background_status ON rental_applications(background_check_status);
CREATE INDEX IF NOT EXISTS idx_realestate_rental_applications_created_at ON rental_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_leases_listing ON leases(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_property ON leases(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_owner ON leases(owner_profile_id);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_tenant ON leases(tenant_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_application ON leases(application_id);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_status ON leases(lease_status);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_start_date ON leases(lease_start_date);
CREATE INDEX IF NOT EXISTS idx_realestate_leases_end_date ON leases(lease_end_date);

CREATE INDEX IF NOT EXISTS idx_realestate_rent_payments_lease ON rent_payments(lease_id);
CREATE INDEX IF NOT EXISTS idx_realestate_rent_payments_tenant ON rent_payments(tenant_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_rent_payments_due_date ON rent_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_realestate_rent_payments_paid_at ON rent_payments(paid_at);
CREATE INDEX IF NOT EXISTS idx_realestate_rent_payments_status ON rent_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_realestate_rent_payments_method ON rent_payments(payment_method);

CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_lease ON maintenance_tickets(lease_id);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_property ON maintenance_tickets(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_reported_by ON maintenance_tickets(reported_by_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_assigned_exec ON maintenance_tickets(assigned_executive_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_issue_type ON maintenance_tickets(issue_type);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_priority ON maintenance_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_status ON maintenance_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_realestate_maintenance_tickets_opened_at ON maintenance_tickets(opened_at);

CREATE INDEX IF NOT EXISTS idx_realestate_referrals_referrer ON referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_referrals_referred_user ON referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_referrals_type ON referrals(referral_type);
CREATE INDEX IF NOT EXISTS idx_realestate_referrals_status ON referrals(referral_status);
CREATE INDEX IF NOT EXISTS idx_realestate_referrals_created_at ON referrals(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_listing ON support_tickets(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_property ON support_tickets(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_type ON support_tickets(ticket_type);
CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_status ON support_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_realestate_support_tickets_created_at ON support_tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_realestate_app_events_user ON app_events(user_id);
CREATE INDEX IF NOT EXISTS idx_realestate_app_events_listing ON app_events(listing_id);
CREATE INDEX IF NOT EXISTS idx_realestate_app_events_property ON app_events(property_id);
CREATE INDEX IF NOT EXISTS idx_realestate_app_events_event_name ON app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_realestate_app_events_screen_name ON app_events(screen_name);
CREATE INDEX IF NOT EXISTS idx_realestate_app_events_event_time ON app_events(event_time);
