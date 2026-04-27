-- ======================
-- MOVIES APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS movies_schema;
SET search_path TO movies_schema, public;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone VARCHAR(20) UNIQUE,
  country VARCHAR(80) NOT NULL,
  signup_source VARCHAR(30),
  signup_channel VARCHAR(30),
  referral_code VARCHAR(30) UNIQUE,
  referred_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  preferred_language VARCHAR(20),
  marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  last_seen_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_name VARCHAR(80) NOT NULL,
  profile_type VARCHAR(20) NOT NULL DEFAULT 'adult'
    CHECK (profile_type IN ('adult', 'kids')),
  maturity_rating_limit VARCHAR(20),
  language_preference VARCHAR(20),
  autoplay_enabled BOOLEAN NOT NULL DEFAULT true,
  subtitles_enabled BOOLEAN NOT NULL DEFAULT false,
  avatar_url TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, profile_name)
);

-- DEVICES
CREATE TABLE IF NOT EXISTS devices (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_type VARCHAR(30) NOT NULL
    CHECK (device_type IN ('mobile', 'tablet', 'web', 'tv', 'console', 'set_top_box')),
  os_name VARCHAR(40),
  app_version VARCHAR(30),
  device_brand VARCHAR(40),
  device_model VARCHAR(60),
  country VARCHAR(80),
  last_active_at TIMESTAMP NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SUBSCRIPTION PLANS
CREATE TABLE IF NOT EXISTS subscription_plans (
  id BIGSERIAL PRIMARY KEY,
  plan_name VARCHAR(40) NOT NULL UNIQUE,
  billing_cycle VARCHAR(20) NOT NULL
    CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly')),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  max_streams INTEGER NOT NULL CHECK (max_streams > 0),
  max_download_devices INTEGER NOT NULL DEFAULT 0 CHECK (max_download_devices >= 0),
  video_quality VARCHAR(20) NOT NULL
    CHECK (video_quality IN ('sd', 'hd', 'full_hd', 'uhd')),
  has_ads BOOLEAN NOT NULL DEFAULT false,
  allows_offline_download BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id BIGINT NOT NULL REFERENCES subscription_plans(id) ON DELETE RESTRICT,
  subscription_status VARCHAR(20) NOT NULL
    CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'cancelled', 'expired', 'paused')),
  started_at TIMESTAMP NOT NULL,
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  cancelled_at TIMESTAMP NULL,
  auto_renew BOOLEAN NOT NULL DEFAULT true,
  payment_provider VARCHAR(30),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (current_period_end >= current_period_start),
  CHECK (cancelled_at IS NULL OR cancelled_at >= started_at)
);

-- PROMOTIONS
CREATE TABLE IF NOT EXISTS promotions (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  description TEXT,
  discount_type VARCHAR(10) NOT NULL
    CHECK (discount_type IN ('percent', 'fixed')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value >= 0),
  max_discount_amount NUMERIC(10, 2) CHECK (max_discount_amount IS NULL OR max_discount_amount >= 0),
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  max_uses INTEGER NOT NULL DEFAULT 0 CHECK (max_uses >= 0),
  uses_count INTEGER NOT NULL DEFAULT 0 CHECK (uses_count >= 0),
  per_user_limit INTEGER NOT NULL DEFAULT 1 CHECK (per_user_limit >= 0),
  applicable_plan_id BIGINT REFERENCES subscription_plans(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_at >= starts_at)
);

-- BILLING INVOICES
CREATE TABLE IF NOT EXISTS billing_invoices (
  id BIGSERIAL PRIMARY KEY,
  subscription_id BIGINT NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  promotion_id BIGINT REFERENCES promotions(id) ON DELETE SET NULL,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  invoice_status VARCHAR(20) NOT NULL
    CHECK (invoice_status IN ('draft', 'open', 'paid', 'failed', 'void', 'refunded')),
  subtotal_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (subtotal_amount >= 0),
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  issued_at TIMESTAMP NOT NULL,
  due_at TIMESTAMP NULL,
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (paid_at IS NULL OR paid_at >= issued_at)
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  invoice_id BIGINT NOT NULL REFERENCES billing_invoices(id) ON DELETE CASCADE,
  payment_method VARCHAR(20) NOT NULL
    CHECK (payment_method IN ('card', 'upi', 'wallet', 'paypal', 'net_banking', 'app_store', 'play_store')),
  payment_provider VARCHAR(30),
  payment_status VARCHAR(20) NOT NULL
    CHECK (payment_status IN ('pending', 'successful', 'failed', 'refunded', 'partial_refund')),
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
  refund_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (refund_amount >= 0),
  paid_at TIMESTAMP NULL,
  refunded_at TIMESTAMP NULL,
  transaction_ref VARCHAR(80) UNIQUE,
  failure_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (refunded_at IS NULL OR paid_at IS NULL OR refunded_at >= paid_at)
);

-- CONTENT CATEGORIES
CREATE TABLE IF NOT EXISTS content_categories (
  id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL UNIQUE,
  category_type VARCHAR(20) NOT NULL
    CHECK (category_type IN ('genre', 'mood', 'theme', 'audience', 'format')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TITLES
CREATE TABLE IF NOT EXISTS titles (
  id BIGSERIAL PRIMARY KEY,
  title_name TEXT NOT NULL,
  original_title TEXT,
  title_type VARCHAR(20) NOT NULL
    CHECK (title_type IN ('movie', 'series', 'documentary', 'special', 'short')),
  release_year INTEGER,
  runtime_minutes INTEGER CHECK (runtime_minutes IS NULL OR runtime_minutes > 0),
  maturity_rating VARCHAR(20),
  original_language VARCHAR(20),
  country_of_origin VARCHAR(80),
  synopsis TEXT,
  content_status VARCHAR(20) NOT NULL DEFAULT 'published'
    CHECK (content_status IN ('draft', 'scheduled', 'published', 'archived', 'removed')),
  is_original BOOLEAN NOT NULL DEFAULT false,
  has_ads BOOLEAN NOT NULL DEFAULT false,
  imdb_like_score NUMERIC(4, 2) CHECK (imdb_like_score IS NULL OR (imdb_like_score >= 0 AND imdb_like_score <= 10)),
  critic_score NUMERIC(5, 2) CHECK (critic_score IS NULL OR (critic_score >= 0 AND critic_score <= 100)),
  availability_start TIMESTAMP NULL,
  availability_end TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (availability_end IS NULL OR availability_start IS NULL OR availability_end >= availability_start)
);

-- TITLE CATEGORIES (GENRES, MOODS, THEMES, ETC.)
CREATE TABLE IF NOT EXISTS title_categories (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  category_id BIGINT NOT NULL REFERENCES content_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(title_id, category_id)
);

-- TITLE LOCALIZATIONS
CREATE TABLE IF NOT EXISTS title_localizations (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  language_code VARCHAR(20) NOT NULL,
  localized_title TEXT NOT NULL,
  localized_synopsis TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(title_id, language_code)
);

-- PEOPLE
CREATE TABLE IF NOT EXISTS people (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  birth_country VARCHAR(80),
  primary_profession VARCHAR(30)
    CHECK (primary_profession IN ('actor', 'director', 'writer', 'producer', 'composer', 'host', 'other')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TITLE CREDITS
CREATE TABLE IF NOT EXISTS title_credits (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  person_id BIGINT NOT NULL REFERENCES people(id) ON DELETE CASCADE,
  role_type VARCHAR(20) NOT NULL
    CHECK (role_type IN ('actor', 'director', 'writer', 'producer', 'composer', 'host')),
  character_name VARCHAR(120),
  billing_order INTEGER CHECK (billing_order IS NULL OR billing_order > 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(title_id, person_id, role_type)
);

-- SEASONS
CREATE TABLE IF NOT EXISTS seasons (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  season_number INTEGER NOT NULL CHECK (season_number > 0),
  season_title VARCHAR(120),
  release_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(title_id, season_number)
);

-- EPISODES
CREATE TABLE IF NOT EXISTS episodes (
  id BIGSERIAL PRIMARY KEY,
  season_id BIGINT NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL CHECK (episode_number > 0),
  episode_title VARCHAR(200) NOT NULL,
  runtime_minutes INTEGER CHECK (runtime_minutes IS NULL OR runtime_minutes > 0),
  release_date DATE,
  synopsis TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(season_id, episode_number)
);

-- AUDIO LANGUAGES
CREATE TABLE IF NOT EXISTS audio_languages (
  id BIGSERIAL PRIMARY KEY,
  language_code VARCHAR(20) NOT NULL UNIQUE,
  language_name VARCHAR(60) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TITLE AUDIO TRACKS
CREATE TABLE IF NOT EXISTS title_audio_tracks (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT REFERENCES titles(id) ON DELETE CASCADE,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE CASCADE,
  audio_language_id BIGINT NOT NULL REFERENCES audio_languages(id) ON DELETE RESTRICT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (title_id IS NOT NULL AND episode_id IS NULL) OR
    (title_id IS NULL AND episode_id IS NOT NULL)
  )
);

-- SUBTITLE LANGUAGES
CREATE TABLE IF NOT EXISTS subtitle_languages (
  id BIGSERIAL PRIMARY KEY,
  language_code VARCHAR(20) NOT NULL UNIQUE,
  language_name VARCHAR(60) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TITLE SUBTITLES
CREATE TABLE IF NOT EXISTS title_subtitles (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT REFERENCES titles(id) ON DELETE CASCADE,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE CASCADE,
  subtitle_language_id BIGINT NOT NULL REFERENCES subtitle_languages(id) ON DELETE RESTRICT,
  subtitle_type VARCHAR(20) NOT NULL DEFAULT 'standard'
    CHECK (subtitle_type IN ('standard', 'sdh', 'forced')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (title_id IS NOT NULL AND episode_id IS NULL) OR
    (title_id IS NULL AND episode_id IS NOT NULL)
  )
);

-- CONTENT LICENSES
CREATE TABLE IF NOT EXISTS content_licenses (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  licensed_region VARCHAR(80) NOT NULL,
  license_type VARCHAR(20) NOT NULL
    CHECK (license_type IN ('owned', 'exclusive', 'non_exclusive', 'third_party')),
  license_start TIMESTAMP NOT NULL,
  license_end TIMESTAMP NOT NULL,
  is_download_allowed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (license_end >= license_start)
);

-- CONTENT AVAILABILITY
CREATE TABLE IF NOT EXISTS content_availability (
  id BIGSERIAL PRIMARY KEY,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  country VARCHAR(80) NOT NULL,
  available_from TIMESTAMP NOT NULL,
  available_to TIMESTAMP NULL,
  requires_plan_id BIGINT REFERENCES subscription_plans(id) ON DELETE SET NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(title_id, country, available_from),
  CHECK (available_to IS NULL OR available_to >= available_from)
);

-- WATCHLISTS
CREATE TABLE IF NOT EXISTS watchlists (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  added_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, title_id)
);

-- CONTINUE WATCHING
CREATE TABLE IF NOT EXISTS continue_watching (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title_id BIGINT REFERENCES titles(id) ON DELETE CASCADE,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE CASCADE,
  last_position_seconds INTEGER NOT NULL DEFAULT 0 CHECK (last_position_seconds >= 0),
  completion_percent NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (completion_percent >= 0 AND completion_percent <= 100),
  last_watched_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (title_id IS NOT NULL AND episode_id IS NULL) OR
    (title_id IS NULL AND episode_id IS NOT NULL)
  )
);

-- Uniqueness for continue_watching depends on whether the row references a title or an episode.
-- Postgres does not allow expressions like COALESCE(...) inside UNIQUE constraints, so we use
-- two partial unique indexes instead.
CREATE UNIQUE INDEX IF NOT EXISTS idx_movies_continue_watching_profile_title_unique
  ON continue_watching(profile_id, title_id)
  WHERE title_id IS NOT NULL AND episode_id IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_movies_continue_watching_profile_episode_unique
  ON continue_watching(profile_id, episode_id)
  WHERE episode_id IS NOT NULL AND title_id IS NULL;

-- VIEWING SESSIONS
CREATE TABLE IF NOT EXISTS viewing_sessions (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  device_id BIGINT REFERENCES devices(id) ON DELETE SET NULL,
  title_id BIGINT REFERENCES titles(id) ON DELETE SET NULL,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE SET NULL,
  session_status VARCHAR(20) NOT NULL DEFAULT 'started'
    CHECK (session_status IN ('started', 'paused', 'completed', 'abandoned', 'failed')),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  watch_time_seconds INTEGER NOT NULL DEFAULT 0 CHECK (watch_time_seconds >= 0),
  max_position_seconds INTEGER NOT NULL DEFAULT 0 CHECK (max_position_seconds >= 0),
  completion_percent NUMERIC(5, 2) NOT NULL DEFAULT 0 CHECK (completion_percent >= 0 AND completion_percent <= 100),
  stream_quality VARCHAR(20)
    CHECK (stream_quality IS NULL OR stream_quality IN ('sd', 'hd', 'full_hd', 'uhd')),
  bitrate_kbps INTEGER CHECK (bitrate_kbps IS NULL OR bitrate_kbps >= 0),
  playback_source VARCHAR(20)
    CHECK (playback_source IN ('home', 'search', 'watchlist', 'recommendation', 'continue_watching', 'direct_link')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ended_at IS NULL OR ended_at >= started_at),
  CHECK (
    (title_id IS NOT NULL AND episode_id IS NULL) OR
    (title_id IS NULL AND episode_id IS NOT NULL)
  )
);

-- PLAYBACK EVENTS
CREATE TABLE IF NOT EXISTS playback_events (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT NOT NULL REFERENCES viewing_sessions(id) ON DELETE CASCADE,
  event_type VARCHAR(30) NOT NULL
    CHECK (event_type IN ('play', 'pause', 'seek', 'resume', 'buffer_start', 'buffer_end', 'quality_change', 'completed', 'error', 'exit')),
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  position_seconds INTEGER CHECK (position_seconds IS NULL OR position_seconds >= 0),
  buffer_duration_ms INTEGER CHECK (buffer_duration_ms IS NULL OR buffer_duration_ms >= 0),
  error_code VARCHAR(40),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- DOWNLOADS
CREATE TABLE IF NOT EXISTS downloads (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  device_id BIGINT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  title_id BIGINT REFERENCES titles(id) ON DELETE CASCADE,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE CASCADE,
  download_status VARCHAR(20) NOT NULL
    CHECK (download_status IN ('queued', 'downloading', 'completed', 'expired', 'deleted', 'failed')),
  file_size_mb NUMERIC(10, 2) CHECK (file_size_mb IS NULL OR file_size_mb >= 0),
  downloaded_at TIMESTAMP NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (title_id IS NOT NULL AND episode_id IS NULL) OR
    (title_id IS NULL AND episode_id IS NOT NULL)
  ),
  CHECK (expires_at IS NULL OR downloaded_at IS NULL OR expires_at >= downloaded_at)
);

-- RATINGS
CREATE TABLE IF NOT EXISTS ratings (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title_id BIGINT REFERENCES titles(id) ON DELETE CASCADE,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE CASCADE,
  rating_value INTEGER NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
  rating_type VARCHAR(20) NOT NULL DEFAULT 'star'
    CHECK (rating_type IN ('star', 'thumbs_up', 'thumbs_down')),
  review_text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (title_id IS NOT NULL AND episode_id IS NULL) OR
    (title_id IS NULL AND episode_id IS NOT NULL)
  )
);

-- APP EVENTS
CREATE TABLE IF NOT EXISTS app_events (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT REFERENCES profiles(id) ON DELETE SET NULL,
  device_id BIGINT REFERENCES devices(id) ON DELETE SET NULL,
  event_name VARCHAR(50) NOT NULL,
  screen_name VARCHAR(50),
  title_id BIGINT REFERENCES titles(id) ON DELETE SET NULL,
  episode_id BIGINT REFERENCES episodes(id) ON DELETE SET NULL,
  source_channel VARCHAR(30),
  country VARCHAR(80),
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- SEARCH QUERIES
CREATE TABLE IF NOT EXISTS search_queries (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT REFERENCES profiles(id) ON DELETE SET NULL,
  device_id BIGINT REFERENCES devices(id) ON DELETE SET NULL,
  query_text VARCHAR(255) NOT NULL,
  result_count INTEGER NOT NULL DEFAULT 0 CHECK (result_count >= 0),
  clicked_title_id BIGINT REFERENCES titles(id) ON DELETE SET NULL,
  search_time TIMESTAMP NOT NULL DEFAULT NOW()
);

-- RECOMMENDATION ROWS
CREATE TABLE IF NOT EXISTS recommendation_rows (
  id BIGSERIAL PRIMARY KEY,
  row_name VARCHAR(100) NOT NULL,
  row_type VARCHAR(30) NOT NULL
    CHECK (row_type IN ('trending', 'because_you_watched', 'top_picks', 'continue_watching', 'new_releases', 'genre', 'editorial')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- RECOMMENDATION IMPRESSIONS
CREATE TABLE IF NOT EXISTS recommendation_impressions (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  row_id BIGINT NOT NULL REFERENCES recommendation_rows(id) ON DELETE CASCADE,
  title_id BIGINT NOT NULL REFERENCES titles(id) ON DELETE CASCADE,
  rank_position INTEGER NOT NULL CHECK (rank_position > 0),
  served_at TIMESTAMP NOT NULL DEFAULT NOW(),
  algorithm_version VARCHAR(30),
  experiment_assignment_id BIGINT NULL
);

-- RECOMMENDATION CLICKS
CREATE TABLE IF NOT EXISTS recommendation_clicks (
  id BIGSERIAL PRIMARY KEY,
  impression_id BIGINT NOT NULL UNIQUE REFERENCES recommendation_impressions(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EXPERIMENTS
CREATE TABLE IF NOT EXISTS experiments (
  id BIGSERIAL PRIMARY KEY,
  experiment_name VARCHAR(100) NOT NULL UNIQUE,
  experiment_type VARCHAR(30) NOT NULL
    CHECK (experiment_type IN ('ui', 'ranking', 'pricing', 'playback', 'search', 'notifications')),
  status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'running', 'paused', 'completed', 'cancelled')),
  starts_at TIMESTAMP NULL,
  ends_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at >= starts_at)
);

-- EXPERIMENT VARIANTS
CREATE TABLE IF NOT EXISTS experiment_variants (
  id BIGSERIAL PRIMARY KEY,
  experiment_id BIGINT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  variant_name VARCHAR(50) NOT NULL,
  traffic_percentage NUMERIC(5, 2) NOT NULL CHECK (traffic_percentage >= 0 AND traffic_percentage <= 100),
  is_control BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(experiment_id, variant_name)
);

-- EXPERIMENT ASSIGNMENTS
CREATE TABLE IF NOT EXISTS experiment_assignments (
  id BIGSERIAL PRIMARY KEY,
  experiment_id BIGINT NOT NULL REFERENCES experiments(id) ON DELETE CASCADE,
  variant_id BIGINT NOT NULL REFERENCES experiment_variants(id) ON DELETE CASCADE,
  profile_id BIGINT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(experiment_id, profile_id)
);

-- NOTIFICATION CAMPAIGNS
CREATE TABLE IF NOT EXISTS notification_campaigns (
  id BIGSERIAL PRIMARY KEY,
  campaign_name VARCHAR(100) NOT NULL,
  campaign_type VARCHAR(20) NOT NULL
    CHECK (campaign_type IN ('email', 'push', 'sms', 'in_app')),
  target_audience VARCHAR(100),
  scheduled_at TIMESTAMP NULL,
  sent_at TIMESTAMP NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'scheduled', 'sent', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- NOTIFICATION DELIVERIES
CREATE TABLE IF NOT EXISTS notification_deliveries (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT NOT NULL REFERENCES notification_campaigns(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id BIGINT REFERENCES profiles(id) ON DELETE SET NULL,
  title_id BIGINT REFERENCES titles(id) ON DELETE SET NULL,
  delivery_status VARCHAR(20) NOT NULL
    CHECK (delivery_status IN ('queued', 'sent', 'delivered', 'opened', 'clicked', 'failed', 'unsubscribed')),
  delivered_at TIMESTAMP NULL,
  opened_at TIMESTAMP NULL,
  clicked_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  profile_id BIGINT REFERENCES profiles(id) ON DELETE SET NULL,
  device_id BIGINT REFERENCES devices(id) ON DELETE SET NULL,
  title_id BIGINT REFERENCES titles(id) ON DELETE SET NULL,
  issue_type VARCHAR(30) NOT NULL
    CHECK (issue_type IN ('billing', 'playback', 'account', 'download', 'content_missing', 'recommendation', 'other')),
  ticket_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (ticket_status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  resolution_time_mins INTEGER CHECK (resolution_time_mins IS NULL OR resolution_time_mins >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_movies_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_movies_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_movies_users_referrer ON users(referred_by_user_id);
CREATE INDEX IF NOT EXISTS idx_movies_users_last_seen_at ON users(last_seen_at);

CREATE INDEX IF NOT EXISTS idx_movies_profiles_user ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_profiles_type ON profiles(profile_type);
CREATE INDEX IF NOT EXISTS idx_movies_profiles_primary ON profiles(is_primary);
CREATE INDEX IF NOT EXISTS idx_movies_profiles_created_at ON profiles(created_at);

CREATE INDEX IF NOT EXISTS idx_movies_devices_user ON devices(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_devices_type ON devices(device_type);
CREATE INDEX IF NOT EXISTS idx_movies_devices_country ON devices(country);
CREATE INDEX IF NOT EXISTS idx_movies_devices_last_active_at ON devices(last_active_at);

CREATE INDEX IF NOT EXISTS idx_movies_subscription_plans_active ON subscription_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_movies_subscription_plans_has_ads ON subscription_plans(has_ads);
CREATE INDEX IF NOT EXISTS idx_movies_subscription_plans_quality ON subscription_plans(video_quality);

CREATE INDEX IF NOT EXISTS idx_movies_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_subscriptions_plan ON subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_movies_subscriptions_status ON subscriptions(subscription_status);
CREATE INDEX IF NOT EXISTS idx_movies_subscriptions_period_start ON subscriptions(current_period_start);
CREATE INDEX IF NOT EXISTS idx_movies_subscriptions_period_end ON subscriptions(current_period_end);

CREATE INDEX IF NOT EXISTS idx_movies_promotions_active ON promotions(is_active);
CREATE INDEX IF NOT EXISTS idx_movies_promotions_plan ON promotions(applicable_plan_id);
CREATE INDEX IF NOT EXISTS idx_movies_promotions_ends_at ON promotions(ends_at);

CREATE INDEX IF NOT EXISTS idx_movies_invoices_subscription ON billing_invoices(subscription_id);
CREATE INDEX IF NOT EXISTS idx_movies_invoices_promotion ON billing_invoices(promotion_id);
CREATE INDEX IF NOT EXISTS idx_movies_invoices_status ON billing_invoices(invoice_status);
CREATE INDEX IF NOT EXISTS idx_movies_invoices_issued_at ON billing_invoices(issued_at);
CREATE INDEX IF NOT EXISTS idx_movies_invoices_paid_at ON billing_invoices(paid_at);

CREATE INDEX IF NOT EXISTS idx_movies_payments_invoice ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_movies_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_movies_payments_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_movies_payments_provider ON payments(payment_provider);
CREATE INDEX IF NOT EXISTS idx_movies_payments_paid_at ON payments(paid_at);

CREATE INDEX IF NOT EXISTS idx_movies_content_categories_type ON content_categories(category_type);

CREATE INDEX IF NOT EXISTS idx_movies_titles_type ON titles(title_type);
CREATE INDEX IF NOT EXISTS idx_movies_titles_release_year ON titles(release_year);
CREATE INDEX IF NOT EXISTS idx_movies_titles_language ON titles(original_language);
CREATE INDEX IF NOT EXISTS idx_movies_titles_country ON titles(country_of_origin);
CREATE INDEX IF NOT EXISTS idx_movies_titles_status ON titles(content_status);
CREATE INDEX IF NOT EXISTS idx_movies_titles_original ON titles(is_original);
CREATE INDEX IF NOT EXISTS idx_movies_titles_created_at ON titles(created_at);

CREATE INDEX IF NOT EXISTS idx_movies_title_categories_title ON title_categories(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_categories_category ON title_categories(category_id);

CREATE INDEX IF NOT EXISTS idx_movies_title_localizations_title ON title_localizations(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_localizations_language ON title_localizations(language_code);

CREATE INDEX IF NOT EXISTS idx_movies_people_profession ON people(primary_profession);
CREATE INDEX IF NOT EXISTS idx_movies_people_active ON people(is_active);

CREATE INDEX IF NOT EXISTS idx_movies_title_credits_title ON title_credits(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_credits_person ON title_credits(person_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_credits_role ON title_credits(role_type);

CREATE INDEX IF NOT EXISTS idx_movies_seasons_title ON seasons(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_seasons_release_date ON seasons(release_date);

CREATE INDEX IF NOT EXISTS idx_movies_episodes_season ON episodes(season_id);
CREATE INDEX IF NOT EXISTS idx_movies_episodes_release_date ON episodes(release_date);

CREATE INDEX IF NOT EXISTS idx_movies_title_audio_tracks_title ON title_audio_tracks(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_audio_tracks_episode ON title_audio_tracks(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_audio_tracks_language ON title_audio_tracks(audio_language_id);

CREATE INDEX IF NOT EXISTS idx_movies_title_subtitles_title ON title_subtitles(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_subtitles_episode ON title_subtitles(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_subtitles_language ON title_subtitles(subtitle_language_id);
CREATE INDEX IF NOT EXISTS idx_movies_title_subtitles_type ON title_subtitles(subtitle_type);

CREATE INDEX IF NOT EXISTS idx_movies_content_licenses_title ON content_licenses(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_content_licenses_region ON content_licenses(licensed_region);
CREATE INDEX IF NOT EXISTS idx_movies_content_licenses_start ON content_licenses(license_start);
CREATE INDEX IF NOT EXISTS idx_movies_content_licenses_end ON content_licenses(license_end);

CREATE INDEX IF NOT EXISTS idx_movies_content_availability_title ON content_availability(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_content_availability_country ON content_availability(country);
CREATE INDEX IF NOT EXISTS idx_movies_content_availability_plan ON content_availability(requires_plan_id);
CREATE INDEX IF NOT EXISTS idx_movies_content_availability_from ON content_availability(available_from);
CREATE INDEX IF NOT EXISTS idx_movies_content_availability_to ON content_availability(available_to);

CREATE INDEX IF NOT EXISTS idx_movies_watchlists_profile ON watchlists(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_watchlists_title ON watchlists(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_watchlists_added_at ON watchlists(added_at);

CREATE INDEX IF NOT EXISTS idx_movies_continue_watching_profile ON continue_watching(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_continue_watching_title ON continue_watching(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_continue_watching_episode ON continue_watching(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_continue_watching_last_watched_at ON continue_watching(last_watched_at);

CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_profile ON viewing_sessions(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_device ON viewing_sessions(device_id);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_title ON viewing_sessions(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_episode ON viewing_sessions(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_status ON viewing_sessions(session_status);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_started_at ON viewing_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_ended_at ON viewing_sessions(ended_at);
CREATE INDEX IF NOT EXISTS idx_movies_viewing_sessions_source ON viewing_sessions(playback_source);

CREATE INDEX IF NOT EXISTS idx_movies_playback_events_session ON playback_events(session_id);
CREATE INDEX IF NOT EXISTS idx_movies_playback_events_type ON playback_events(event_type);
CREATE INDEX IF NOT EXISTS idx_movies_playback_events_time ON playback_events(event_time);

CREATE INDEX IF NOT EXISTS idx_movies_downloads_profile ON downloads(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_downloads_device ON downloads(device_id);
CREATE INDEX IF NOT EXISTS idx_movies_downloads_title ON downloads(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_downloads_episode ON downloads(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_downloads_status ON downloads(download_status);
CREATE INDEX IF NOT EXISTS idx_movies_downloads_downloaded_at ON downloads(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_movies_downloads_expires_at ON downloads(expires_at);

CREATE INDEX IF NOT EXISTS idx_movies_ratings_profile ON ratings(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_ratings_title ON ratings(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_ratings_episode ON ratings(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_ratings_value ON ratings(rating_value);
CREATE INDEX IF NOT EXISTS idx_movies_ratings_created_at ON ratings(created_at);

CREATE INDEX IF NOT EXISTS idx_movies_app_events_profile ON app_events(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_app_events_device ON app_events(device_id);
CREATE INDEX IF NOT EXISTS idx_movies_app_events_name ON app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_movies_app_events_screen ON app_events(screen_name);
CREATE INDEX IF NOT EXISTS idx_movies_app_events_title ON app_events(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_app_events_episode ON app_events(episode_id);
CREATE INDEX IF NOT EXISTS idx_movies_app_events_time ON app_events(event_time);

CREATE INDEX IF NOT EXISTS idx_movies_search_queries_profile ON search_queries(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_search_queries_device ON search_queries(device_id);
CREATE INDEX IF NOT EXISTS idx_movies_search_queries_clicked_title ON search_queries(clicked_title_id);
CREATE INDEX IF NOT EXISTS idx_movies_search_queries_time ON search_queries(search_time);

CREATE INDEX IF NOT EXISTS idx_movies_recommendation_rows_type ON recommendation_rows(row_type);
CREATE INDEX IF NOT EXISTS idx_movies_recommendation_rows_active ON recommendation_rows(is_active);

CREATE INDEX IF NOT EXISTS idx_movies_recommendation_impressions_profile ON recommendation_impressions(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_recommendation_impressions_row ON recommendation_impressions(row_id);
CREATE INDEX IF NOT EXISTS idx_movies_recommendation_impressions_title ON recommendation_impressions(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_recommendation_impressions_served_at ON recommendation_impressions(served_at);
CREATE INDEX IF NOT EXISTS idx_movies_recommendation_impressions_experiment_assignment ON recommendation_impressions(experiment_assignment_id);

CREATE INDEX IF NOT EXISTS idx_movies_recommendation_clicks_impression ON recommendation_clicks(impression_id);
CREATE INDEX IF NOT EXISTS idx_movies_recommendation_clicks_clicked_at ON recommendation_clicks(clicked_at);

CREATE INDEX IF NOT EXISTS idx_movies_experiments_type ON experiments(experiment_type);
CREATE INDEX IF NOT EXISTS idx_movies_experiments_status ON experiments(status);
CREATE INDEX IF NOT EXISTS idx_movies_experiments_starts_at ON experiments(starts_at);
CREATE INDEX IF NOT EXISTS idx_movies_experiments_ends_at ON experiments(ends_at);

CREATE INDEX IF NOT EXISTS idx_movies_experiment_variants_experiment ON experiment_variants(experiment_id);
CREATE INDEX IF NOT EXISTS idx_movies_experiment_variants_control ON experiment_variants(is_control);

CREATE INDEX IF NOT EXISTS idx_movies_experiment_assignments_experiment ON experiment_assignments(experiment_id);
CREATE INDEX IF NOT EXISTS idx_movies_experiment_assignments_variant ON experiment_assignments(variant_id);
CREATE INDEX IF NOT EXISTS idx_movies_experiment_assignments_profile ON experiment_assignments(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_experiment_assignments_assigned_at ON experiment_assignments(assigned_at);

CREATE INDEX IF NOT EXISTS idx_movies_notification_campaigns_type ON notification_campaigns(campaign_type);
CREATE INDEX IF NOT EXISTS idx_movies_notification_campaigns_status ON notification_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_movies_notification_campaigns_scheduled_at ON notification_campaigns(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_movies_notification_deliveries_campaign ON notification_deliveries(campaign_id);
CREATE INDEX IF NOT EXISTS idx_movies_notification_deliveries_user ON notification_deliveries(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_notification_deliveries_profile ON notification_deliveries(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_notification_deliveries_title ON notification_deliveries(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_notification_deliveries_status ON notification_deliveries(delivery_status);
CREATE INDEX IF NOT EXISTS idx_movies_notification_deliveries_created_at ON notification_deliveries(created_at);

CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_profile ON support_tickets(profile_id);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_device ON support_tickets(device_id);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_title ON support_tickets(title_id);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_issue_type ON support_tickets(issue_type);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_status ON support_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_movies_support_tickets_created_at ON support_tickets(created_at);
