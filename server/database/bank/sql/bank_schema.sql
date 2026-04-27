
-- ======================
-- BANK APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS bank_schema;
SET search_path TO bank_schema, public;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone VARCHAR(20) UNIQUE,
  date_of_birth DATE,
  country VARCHAR(80) NOT NULL,
  city VARCHAR(80),
  signup_channel VARCHAR(30),
  referral_code VARCHAR(30) UNIQUE,
  referred_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  preferred_language VARCHAR(20),
  customer_segment VARCHAR(30)
    CHECK (customer_segment IS NULL OR customer_segment IN ('retail', 'mass_affluent', 'hnwi', 'student', 'senior', 'business_owner')),
  risk_profile VARCHAR(20)
    CHECK (risk_profile IS NULL OR risk_profile IN ('low', 'medium', 'high')),
  marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  last_seen_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- USER ADDRESSES
CREATE TABLE IF NOT EXISTS user_addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  address_type VARCHAR(20) NOT NULL
    CHECK (address_type IN ('home', 'mailing', 'office', 'registered')),
  line1 TEXT NOT NULL,
  line2 TEXT,
  landmark TEXT,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80),
  postal_code VARCHAR(20),
  country VARCHAR(80) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- BRANCHES
CREATE TABLE IF NOT EXISTS branches (
  id BIGSERIAL PRIMARY KEY,
  branch_code VARCHAR(20) NOT NULL UNIQUE,
  branch_name VARCHAR(120) NOT NULL,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80),
  country VARCHAR(80) NOT NULL,
  region VARCHAR(80),
  opened_at DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- EMPLOYEES
CREATE TABLE IF NOT EXISTS employees (
  id BIGSERIAL PRIMARY KEY,
  employee_code VARCHAR(30) NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone VARCHAR(20) UNIQUE,
  role_name VARCHAR(40) NOT NULL
    CHECK (role_name IN ('teller', 'relationship_manager', 'branch_manager', 'ops_analyst', 'support_agent', 'collections_officer', 'fraud_analyst', 'compliance_officer')),
  branch_id BIGINT REFERENCES branches(id) ON DELETE SET NULL,
  manager_employee_id BIGINT REFERENCES employees(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  hired_at DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- KYC RECORDS
CREATE TABLE IF NOT EXISTS kyc_records (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kyc_status VARCHAR(20) NOT NULL
    CHECK (kyc_status IN ('pending', 'in_review', 'verified', 'rejected', 'expired')),
  verification_level VARCHAR(20) NOT NULL
    CHECK (verification_level IN ('minimum', 'full', 'enhanced')),
  document_type VARCHAR(30)
    CHECK (document_type IS NULL OR document_type IN ('passport', 'national_id', 'driver_license', 'tax_id', 'utility_bill')),
  document_number VARCHAR(80),
  verified_by_employee_id BIGINT REFERENCES employees(id) ON DELETE SET NULL,
  submitted_at TIMESTAMP,
  verified_at TIMESTAMP,
  expires_at TIMESTAMP,
  rejection_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (verified_at IS NULL OR submitted_at IS NULL OR verified_at >= submitted_at),
  CHECK (expires_at IS NULL OR submitted_at IS NULL OR expires_at >= submitted_at)
);

-- BENEFICIARIES
CREATE TABLE IF NOT EXISTS beneficiaries (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  beneficiary_name TEXT NOT NULL,
  bank_name VARCHAR(120) NOT NULL,
  account_number VARCHAR(40) NOT NULL,
  routing_code VARCHAR(30),
  country VARCHAR(80) NOT NULL,
  beneficiary_type VARCHAR(20) NOT NULL
    CHECK (beneficiary_type IN ('internal', 'domestic_external', 'international')),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  added_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Expression uniqueness (COALESCE is not allowed inside a table UNIQUE constraint).
CREATE UNIQUE INDEX IF NOT EXISTS idx_bank_beneficiaries_unique_account
  ON beneficiaries(user_id, account_number, COALESCE(routing_code, ''));

-- ACCOUNT PRODUCTS
CREATE TABLE IF NOT EXISTS account_products (
  id BIGSERIAL PRIMARY KEY,
  product_name VARCHAR(80) NOT NULL UNIQUE,
  product_type VARCHAR(30) NOT NULL
    CHECK (product_type IN ('savings', 'checking', 'salary', 'fixed_deposit', 'recurring_deposit', 'wallet')),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  minimum_balance NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (minimum_balance >= 0),
  overdraft_allowed BOOLEAN NOT NULL DEFAULT false,
  overdraft_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (overdraft_limit >= 0),
  interest_rate NUMERIC(8, 4) NOT NULL DEFAULT 0 CHECK (interest_rate >= 0),
  monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (monthly_fee >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ACCOUNTS
CREATE TABLE IF NOT EXISTS accounts (
  id BIGSERIAL PRIMARY KEY,
  account_number VARCHAR(40) NOT NULL UNIQUE,
  iban VARCHAR(50) UNIQUE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES account_products(id) ON DELETE RESTRICT,
  primary_branch_id BIGINT REFERENCES branches(id) ON DELETE SET NULL,
  account_status VARCHAR(20) NOT NULL
    CHECK (account_status IN ('pending', 'active', 'frozen', 'dormant', 'closed', 'blocked')),
  opened_at TIMESTAMP NOT NULL,
  closed_at TIMESTAMP NULL,
  available_balance NUMERIC(16, 2) NOT NULL DEFAULT 0,
  current_balance NUMERIC(16, 2) NOT NULL DEFAULT 0,
  hold_balance NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (hold_balance >= 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  is_joint_account BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (closed_at IS NULL OR closed_at >= opened_at)
);

-- ACCOUNT HOLDERS
CREATE TABLE IF NOT EXISTS account_holders (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  holder_role VARCHAR(20) NOT NULL
    CHECK (holder_role IN ('primary', 'joint', 'guardian', 'authorized_signer')),
  ownership_percent NUMERIC(5, 2) CHECK (ownership_percent IS NULL OR (ownership_percent >= 0 AND ownership_percent <= 100)),
  added_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(account_id, user_id)
);

-- ACCOUNT LIMITS
CREATE TABLE IF NOT EXISTS account_limits (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  daily_withdrawal_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (daily_withdrawal_limit >= 0),
  daily_transfer_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (daily_transfer_limit >= 0),
  monthly_transfer_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (monthly_transfer_limit >= 0),
  atm_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (atm_limit >= 0),
  pos_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (pos_limit >= 0),
  online_purchase_limit NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (online_purchase_limit >= 0),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(account_id)
);

-- TRANSACTION CATEGORIES
CREATE TABLE IF NOT EXISTS transaction_categories (
  id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR(60) NOT NULL UNIQUE,
  category_group VARCHAR(30) NOT NULL
    CHECK (category_group IN ('income', 'transfer', 'bill', 'card', 'cash', 'loan', 'fee', 'investment', 'merchant', 'other')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  transaction_ref VARCHAR(60) NOT NULL UNIQUE,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES transaction_categories(id) ON DELETE SET NULL,
  initiated_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  channel VARCHAR(20) NOT NULL
    CHECK (channel IN ('branch', 'atm', 'online', 'mobile', 'api', 'card_network', 'auto_debit', 'internal_batch')),
  transaction_type VARCHAR(20) NOT NULL
    CHECK (transaction_type IN ('credit', 'debit')),
  transaction_status VARCHAR(20) NOT NULL
    CHECK (transaction_status IN ('pending', 'posted', 'failed', 'reversed', 'cancelled')),
  amount NUMERIC(16, 2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  description TEXT,
  merchant_name VARCHAR(120),
  counterparty_name VARCHAR(120),
  counterparty_account VARCHAR(40),
  running_balance NUMERIC(16, 2),
  initiated_at TIMESTAMP NOT NULL,
  posted_at TIMESTAMP NULL,
  value_date DATE,
  external_reference VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (posted_at IS NULL OR posted_at >= initiated_at)
);

-- TRANSFERS
CREATE TABLE IF NOT EXISTS transfers (
  id BIGSERIAL PRIMARY KEY,
  transfer_ref VARCHAR(60) NOT NULL UNIQUE,
  from_account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  to_account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  beneficiary_id BIGINT REFERENCES beneficiaries(id) ON DELETE SET NULL,
  debit_transaction_id BIGINT UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
  credit_transaction_id BIGINT UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
  transfer_type VARCHAR(20) NOT NULL
    CHECK (transfer_type IN ('internal', 'domestic_external', 'international', 'scheduled')),
  transfer_status VARCHAR(20) NOT NULL
    CHECK (transfer_status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'reversed')),
  amount NUMERIC(16, 2) NOT NULL CHECK (amount > 0),
  fee_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (fee_amount >= 0),
  fx_rate NUMERIC(18, 8) CHECK (fx_rate IS NULL OR fx_rate > 0),
  source_currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  destination_currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  scheduled_for TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (completed_at IS NULL OR completed_at >= created_at)
);

-- CARDS
CREATE TABLE IF NOT EXISTS cards (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  card_type VARCHAR(20) NOT NULL
    CHECK (card_type IN ('debit', 'credit', 'prepaid', 'virtual')),
  network VARCHAR(20) NOT NULL
    CHECK (network IN ('visa', 'mastercard', 'rupay', 'amex', 'discover')),
  masked_card_number VARCHAR(30) NOT NULL UNIQUE,
  cardholder_name VARCHAR(120) NOT NULL,
  issued_at DATE NOT NULL,
  expires_at DATE NOT NULL,
  card_status VARCHAR(20) NOT NULL
    CHECK (card_status IN ('active', 'blocked', 'expired', 'closed', 'hotlisted', 'pending_activation')),
  is_contactless_enabled BOOLEAN NOT NULL DEFAULT true,
  is_international_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (expires_at >= issued_at)
);

-- CARD TRANSACTIONS
CREATE TABLE IF NOT EXISTS card_transactions (
  id BIGSERIAL PRIMARY KEY,
  card_id BIGINT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_id BIGINT UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
  merchant_name VARCHAR(120),
  merchant_category_code VARCHAR(10),
  merchant_country VARCHAR(80),
  entry_mode VARCHAR(20)
    CHECK (entry_mode IS NULL OR entry_mode IN ('chip', 'swipe', 'tap', 'online', 'manual')),
  settlement_amount NUMERIC(16, 2) NOT NULL CHECK (settlement_amount >= 0),
  billing_amount NUMERIC(16, 2) NOT NULL CHECK (billing_amount >= 0),
  billing_currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  auth_code VARCHAR(20),
  transaction_status VARCHAR(20) NOT NULL
    CHECK (transaction_status IN ('authorized', 'settled', 'declined', 'reversed', 'chargeback')),
  transaction_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ATM MACHINES
CREATE TABLE IF NOT EXISTS atm_machines (
  id BIGSERIAL PRIMARY KEY,
  atm_code VARCHAR(30) NOT NULL UNIQUE,
  branch_id BIGINT REFERENCES branches(id) ON DELETE SET NULL,
  city VARCHAR(80) NOT NULL,
  country VARCHAR(80) NOT NULL,
  atm_status VARCHAR(20) NOT NULL
    CHECK (atm_status IN ('active', 'offline', 'maintenance', 'retired')),
  installed_at DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ATM TRANSACTIONS
CREATE TABLE IF NOT EXISTS atm_transactions (
  id BIGSERIAL PRIMARY KEY,
  atm_id BIGINT NOT NULL REFERENCES atm_machines(id) ON DELETE CASCADE,
  card_id BIGINT REFERENCES cards(id) ON DELETE SET NULL,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_id BIGINT UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
  atm_transaction_type VARCHAR(20) NOT NULL
    CHECK (atm_transaction_type IN ('cash_withdrawal', 'balance_inquiry', 'mini_statement', 'cash_deposit', 'pin_change')),
  amount NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (amount >= 0),
  atm_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (atm_fee >= 0),
  transaction_status VARCHAR(20) NOT NULL
    CHECK (transaction_status IN ('success', 'failed', 'reversed')),
  transaction_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MERCHANTS
CREATE TABLE IF NOT EXISTS merchants (
  id BIGSERIAL PRIMARY KEY,
  merchant_name VARCHAR(120) NOT NULL,
  merchant_category VARCHAR(60),
  merchant_country VARCHAR(80),
  onboarding_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (onboarding_status IN ('pending', 'active', 'suspended', 'terminated')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- BILLERS
CREATE TABLE IF NOT EXISTS billers (
  id BIGSERIAL PRIMARY KEY,
  biller_name VARCHAR(120) NOT NULL UNIQUE,
  biller_category VARCHAR(40) NOT NULL
    CHECK (biller_category IN ('electricity', 'water', 'gas', 'internet', 'mobile', 'insurance', 'education', 'government', 'other')),
  country VARCHAR(80) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- BILL PAYMENTS
CREATE TABLE IF NOT EXISTS bill_payments (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  biller_id BIGINT NOT NULL REFERENCES billers(id) ON DELETE RESTRICT,
  transaction_id BIGINT UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
  bill_reference VARCHAR(80) NOT NULL,
  amount NUMERIC(16, 2) NOT NULL CHECK (amount > 0),
  due_date DATE,
  payment_status VARCHAR(20) NOT NULL
    CHECK (payment_status IN ('scheduled', 'processing', 'paid', 'failed', 'cancelled')),
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LOAN PRODUCTS
CREATE TABLE IF NOT EXISTS loan_products (
  id BIGSERIAL PRIMARY KEY,
  product_name VARCHAR(80) NOT NULL UNIQUE,
  loan_type VARCHAR(30) NOT NULL
    CHECK (loan_type IN ('personal', 'home', 'auto', 'education', 'business', 'credit_line')),
  min_principal NUMERIC(16, 2) NOT NULL CHECK (min_principal >= 0),
  max_principal NUMERIC(16, 2) NOT NULL CHECK (max_principal >= min_principal),
  min_interest_rate NUMERIC(8, 4) NOT NULL CHECK (min_interest_rate >= 0),
  max_interest_rate NUMERIC(8, 4) NOT NULL CHECK (max_interest_rate >= min_interest_rate),
  max_term_months INTEGER NOT NULL CHECK (max_term_months > 0),
  requires_collateral BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LOAN APPLICATIONS
CREATE TABLE IF NOT EXISTS loan_applications (
  id BIGSERIAL PRIMARY KEY,
  application_ref VARCHAR(60) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  loan_product_id BIGINT NOT NULL REFERENCES loan_products(id) ON DELETE RESTRICT,
  assigned_employee_id BIGINT REFERENCES employees(id) ON DELETE SET NULL,
  requested_amount NUMERIC(16, 2) NOT NULL CHECK (requested_amount > 0),
  requested_term_months INTEGER NOT NULL CHECK (requested_term_months > 0),
  annual_income NUMERIC(16, 2) CHECK (annual_income IS NULL OR annual_income >= 0),
  credit_score INTEGER CHECK (credit_score IS NULL OR (credit_score >= 300 AND credit_score <= 900)),
  application_status VARCHAR(20) NOT NULL
    CHECK (application_status IN ('submitted', 'under_review', 'approved', 'rejected', 'cancelled', 'disbursed')),
  applied_at TIMESTAMP NOT NULL,
  decision_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (decision_at IS NULL OR decision_at >= applied_at)
);

-- LOANS
CREATE TABLE IF NOT EXISTS loans (
  id BIGSERIAL PRIMARY KEY,
  loan_account_number VARCHAR(40) NOT NULL UNIQUE,
  application_id BIGINT UNIQUE REFERENCES loan_applications(id) ON DELETE SET NULL,
  borrower_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  loan_product_id BIGINT NOT NULL REFERENCES loan_products(id) ON DELETE RESTRICT,
  disbursement_account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  principal_amount NUMERIC(16, 2) NOT NULL CHECK (principal_amount > 0),
  outstanding_principal NUMERIC(16, 2) NOT NULL CHECK (outstanding_principal >= 0),
  annual_interest_rate NUMERIC(8, 4) NOT NULL CHECK (annual_interest_rate >= 0),
  term_months INTEGER NOT NULL CHECK (term_months > 0),
  emi_amount NUMERIC(16, 2) NOT NULL CHECK (emi_amount >= 0),
  loan_status VARCHAR(20) NOT NULL
    CHECK (loan_status IN ('active', 'closed', 'defaulted', 'written_off', 'settled')),
  disbursed_at TIMESTAMP NOT NULL,
  maturity_date DATE NOT NULL,
  closed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (closed_at IS NULL OR closed_at >= disbursed_at)
);

-- LOAN REPAYMENTS
CREATE TABLE IF NOT EXISTS loan_repayments (
  id BIGSERIAL PRIMARY KEY,
  loan_id BIGINT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
  debit_account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  transaction_id BIGINT UNIQUE REFERENCES transactions(id) ON DELETE SET NULL,
  installment_number INTEGER NOT NULL CHECK (installment_number > 0),
  due_date DATE NOT NULL,
  paid_date DATE,
  principal_component NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (principal_component >= 0),
  interest_component NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (interest_component >= 0),
  penalty_component NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (penalty_component >= 0),
  total_due NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (total_due >= 0),
  total_paid NUMERIC(16, 2) NOT NULL DEFAULT 0 CHECK (total_paid >= 0),
  repayment_status VARCHAR(20) NOT NULL
    CHECK (repayment_status IN ('pending', 'paid', 'partial', 'late', 'waived')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(loan_id, installment_number)
);

-- FIXED DEPOSITS
CREATE TABLE IF NOT EXISTS fixed_deposits (
  id BIGSERIAL PRIMARY KEY,
  fd_number VARCHAR(40) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  funding_account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  principal_amount NUMERIC(16, 2) NOT NULL CHECK (principal_amount > 0),
  annual_interest_rate NUMERIC(8, 4) NOT NULL CHECK (annual_interest_rate >= 0),
  tenure_months INTEGER NOT NULL CHECK (tenure_months > 0),
  start_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  maturity_amount NUMERIC(16, 2) CHECK (maturity_amount IS NULL OR maturity_amount >= principal_amount),
  payout_type VARCHAR(20) NOT NULL
    CHECK (payout_type IN ('cumulative', 'monthly', 'quarterly', 'at_maturity')),
  fd_status VARCHAR(20) NOT NULL
    CHECK (fd_status IN ('active', 'matured', 'premature_closed')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (maturity_date >= start_date)
);

-- RECURRING DEPOSITS
CREATE TABLE IF NOT EXISTS recurring_deposits (
  id BIGSERIAL PRIMARY KEY,
  rd_number VARCHAR(40) NOT NULL UNIQUE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  debit_account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  monthly_amount NUMERIC(16, 2) NOT NULL CHECK (monthly_amount > 0),
  annual_interest_rate NUMERIC(8, 4) NOT NULL CHECK (annual_interest_rate >= 0),
  tenure_months INTEGER NOT NULL CHECK (tenure_months > 0),
  start_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  rd_status VARCHAR(20) NOT NULL
    CHECK (rd_status IN ('active', 'matured', 'defaulted', 'closed')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (maturity_date >= start_date)
);

-- REWARD PROGRAMS
CREATE TABLE IF NOT EXISTS reward_programs (
  id BIGSERIAL PRIMARY KEY,
  program_name VARCHAR(80) NOT NULL UNIQUE,
  program_type VARCHAR(20) NOT NULL
    CHECK (program_type IN ('card_rewards', 'cashback', 'loyalty', 'referral')),
  point_expiry_months INTEGER CHECK (point_expiry_months IS NULL OR point_expiry_months > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- REWARD EARNINGS
CREATE TABLE IF NOT EXISTS reward_earnings (
  id BIGSERIAL PRIMARY KEY,
  program_id BIGINT NOT NULL REFERENCES reward_programs(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_transaction_id BIGINT REFERENCES card_transactions(id) ON DELETE SET NULL,
  points_earned NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (points_earned >= 0),
  cashback_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (cashback_amount >= 0),
  earned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- REWARD REDEMPTIONS
CREATE TABLE IF NOT EXISTS reward_redemptions (
  id BIGSERIAL PRIMARY KEY,
  program_id BIGINT NOT NULL REFERENCES reward_programs(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  redemption_type VARCHAR(20) NOT NULL
    CHECK (redemption_type IN ('cashback', 'voucher', 'statement_credit', 'gift')),
  points_redeemed NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (points_redeemed >= 0),
  cashback_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (cashback_amount >= 0),
  redeemed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- COMPLAINTS
CREATE TABLE IF NOT EXISTS complaints (
  id BIGSERIAL PRIMARY KEY,
  complaint_ref VARCHAR(60) NOT NULL UNIQUE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  card_id BIGINT REFERENCES cards(id) ON DELETE SET NULL,
  assigned_employee_id BIGINT REFERENCES employees(id) ON DELETE SET NULL,
  complaint_type VARCHAR(30) NOT NULL
    CHECK (complaint_type IN ('transaction', 'card', 'loan', 'account', 'atm', 'service', 'fraud', 'other')),
  complaint_status VARCHAR(20) NOT NULL
    CHECK (complaint_status IN ('open', 'in_progress', 'resolved', 'closed', 'rejected')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  resolution_time_mins INTEGER CHECK (resolution_time_mins IS NULL OR resolution_time_mins >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

-- FRAUD ALERTS
CREATE TABLE IF NOT EXISTS fraud_alerts (
  id BIGSERIAL PRIMARY KEY,
  alert_ref VARCHAR(60) NOT NULL UNIQUE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  card_id BIGINT REFERENCES cards(id) ON DELETE SET NULL,
  transaction_id BIGINT REFERENCES transactions(id) ON DELETE SET NULL,
  card_transaction_id BIGINT REFERENCES card_transactions(id) ON DELETE SET NULL,
  alert_type VARCHAR(30) NOT NULL
    CHECK (alert_type IN ('velocity', 'geo_mismatch', 'high_value', 'merchant_risk', 'atm_risk', 'identity_risk', 'loan_fraud', 'other')),
  severity VARCHAR(20) NOT NULL
    CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  alert_status VARCHAR(20) NOT NULL
    CHECK (alert_status IN ('open', 'under_review', 'confirmed_fraud', 'false_positive', 'closed')),
  detected_at TIMESTAMP NOT NULL,
  resolved_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (resolved_at IS NULL OR resolved_at >= detected_at)
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  card_id BIGINT REFERENCES cards(id) ON DELETE SET NULL,
  loan_id BIGINT REFERENCES loans(id) ON DELETE SET NULL,
  assigned_employee_id BIGINT REFERENCES employees(id) ON DELETE SET NULL,
  issue_type VARCHAR(30) NOT NULL
    CHECK (issue_type IN ('account', 'payment', 'transfer', 'card', 'atm', 'loan', 'kyc', 'fraud', 'other')),
  ticket_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (ticket_status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  resolution_time_mins INTEGER CHECK (resolution_time_mins IS NULL OR resolution_time_mins >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
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
  account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  loan_id BIGINT REFERENCES loans(id) ON DELETE SET NULL,
  delivery_status VARCHAR(20) NOT NULL
    CHECK (delivery_status IN ('queued', 'sent', 'delivered', 'opened', 'clicked', 'failed', 'unsubscribed')),
  delivered_at TIMESTAMP NULL,
  opened_at TIMESTAMP NULL,
  clicked_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_type VARCHAR(20) NOT NULL
    CHECK (actor_type IN ('user', 'employee', 'system')),
  actor_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  actor_employee_id BIGINT REFERENCES employees(id) ON DELETE SET NULL,
  entity_name VARCHAR(50) NOT NULL,
  entity_id BIGINT,
  action_name VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- APP EVENTS
CREATE TABLE IF NOT EXISTS app_events (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  account_id BIGINT REFERENCES accounts(id) ON DELETE SET NULL,
  device_type VARCHAR(30),
  event_name VARCHAR(50) NOT NULL,
  screen_name VARCHAR(50),
  source_channel VARCHAR(30),
  country VARCHAR(80),
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_bank_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_bank_users_city ON users(city);
CREATE INDEX IF NOT EXISTS idx_bank_users_segment ON users(customer_segment);
CREATE INDEX IF NOT EXISTS idx_bank_users_risk_profile ON users(risk_profile);
CREATE INDEX IF NOT EXISTS idx_bank_users_referrer ON users(referred_by_user_id);
CREATE INDEX IF NOT EXISTS idx_bank_users_last_seen_at ON users(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_bank_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_bank_user_addresses_user ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_user_addresses_type ON user_addresses(address_type);
CREATE INDEX IF NOT EXISTS idx_bank_user_addresses_primary ON user_addresses(is_primary);

CREATE INDEX IF NOT EXISTS idx_bank_branches_city ON branches(city);
CREATE INDEX IF NOT EXISTS idx_bank_branches_region ON branches(region);
CREATE INDEX IF NOT EXISTS idx_bank_branches_active ON branches(is_active);

CREATE INDEX IF NOT EXISTS idx_bank_employees_branch ON employees(branch_id);
CREATE INDEX IF NOT EXISTS idx_bank_employees_role ON employees(role_name);
CREATE INDEX IF NOT EXISTS idx_bank_employees_manager ON employees(manager_employee_id);
CREATE INDEX IF NOT EXISTS idx_bank_employees_active ON employees(is_active);

CREATE INDEX IF NOT EXISTS idx_bank_kyc_user ON kyc_records(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_kyc_status ON kyc_records(kyc_status);
CREATE INDEX IF NOT EXISTS idx_bank_kyc_level ON kyc_records(verification_level);
CREATE INDEX IF NOT EXISTS idx_bank_kyc_verified_by ON kyc_records(verified_by_employee_id);
CREATE INDEX IF NOT EXISTS idx_bank_kyc_verified_at ON kyc_records(verified_at);

CREATE INDEX IF NOT EXISTS idx_bank_beneficiaries_user ON beneficiaries(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_beneficiaries_type ON beneficiaries(beneficiary_type);
CREATE INDEX IF NOT EXISTS idx_bank_beneficiaries_verified ON beneficiaries(is_verified);

CREATE INDEX IF NOT EXISTS idx_bank_account_products_type ON account_products(product_type);
CREATE INDEX IF NOT EXISTS idx_bank_account_products_currency ON account_products(currency);
CREATE INDEX IF NOT EXISTS idx_bank_account_products_active ON account_products(is_active);

CREATE INDEX IF NOT EXISTS idx_bank_accounts_user ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_product ON accounts(product_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_branch ON accounts(primary_branch_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_status ON accounts(account_status);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_currency ON accounts(currency);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_opened_at ON accounts(opened_at);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_closed_at ON accounts(closed_at);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_joint ON accounts(is_joint_account);

CREATE INDEX IF NOT EXISTS idx_bank_account_holders_account ON account_holders(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_account_holders_user ON account_holders(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_account_holders_role ON account_holders(holder_role);

CREATE INDEX IF NOT EXISTS idx_bank_account_limits_account ON account_limits(account_id);

CREATE INDEX IF NOT EXISTS idx_bank_transaction_categories_group ON transaction_categories(category_group);

CREATE INDEX IF NOT EXISTS idx_bank_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_category ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_user ON transactions(initiated_by_user_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_channel ON transactions(channel);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_status ON transactions(transaction_status);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_initiated_at ON transactions(initiated_at);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_posted_at ON transactions(posted_at);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_value_date ON transactions(value_date);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_merchant_name ON transactions(merchant_name);

CREATE INDEX IF NOT EXISTS idx_bank_transfers_from_account ON transfers(from_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_to_account ON transfers(to_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_beneficiary ON transfers(beneficiary_id);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_type ON transfers(transfer_type);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_status ON transfers(transfer_status);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_scheduled_for ON transfers(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_completed_at ON transfers(completed_at);
CREATE INDEX IF NOT EXISTS idx_bank_transfers_created_at ON transfers(created_at);

CREATE INDEX IF NOT EXISTS idx_bank_cards_account ON cards(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_cards_type ON cards(card_type);
CREATE INDEX IF NOT EXISTS idx_bank_cards_network ON cards(network);
CREATE INDEX IF NOT EXISTS idx_bank_cards_status ON cards(card_status);
CREATE INDEX IF NOT EXISTS idx_bank_cards_issued_at ON cards(issued_at);
CREATE INDEX IF NOT EXISTS idx_bank_cards_expires_at ON cards(expires_at);

CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_card ON card_transactions(card_id);
CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_account ON card_transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_txn ON card_transactions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_status ON card_transactions(transaction_status);
CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_country ON card_transactions(merchant_country);
CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_at ON card_transactions(transaction_at);
CREATE INDEX IF NOT EXISTS idx_bank_card_transactions_merchant ON card_transactions(merchant_name);

CREATE INDEX IF NOT EXISTS idx_bank_atm_machines_branch ON atm_machines(branch_id);
CREATE INDEX IF NOT EXISTS idx_bank_atm_machines_city ON atm_machines(city);
CREATE INDEX IF NOT EXISTS idx_bank_atm_machines_country ON atm_machines(country);
CREATE INDEX IF NOT EXISTS idx_bank_atm_machines_status ON atm_machines(atm_status);

CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_atm ON atm_transactions(atm_id);
CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_card ON atm_transactions(card_id);
CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_account ON atm_transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_txn ON atm_transactions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_type ON atm_transactions(atm_transaction_type);
CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_status ON atm_transactions(transaction_status);
CREATE INDEX IF NOT EXISTS idx_bank_atm_transactions_at ON atm_transactions(transaction_at);

CREATE INDEX IF NOT EXISTS idx_bank_merchants_country ON merchants(merchant_country);
CREATE INDEX IF NOT EXISTS idx_bank_merchants_category ON merchants(merchant_category);
CREATE INDEX IF NOT EXISTS idx_bank_merchants_status ON merchants(onboarding_status);

CREATE INDEX IF NOT EXISTS idx_bank_billers_category ON billers(biller_category);
CREATE INDEX IF NOT EXISTS idx_bank_billers_country ON billers(country);
CREATE INDEX IF NOT EXISTS idx_bank_billers_active ON billers(is_active);

CREATE INDEX IF NOT EXISTS idx_bank_bill_payments_account ON bill_payments(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_bill_payments_biller ON bill_payments(biller_id);
CREATE INDEX IF NOT EXISTS idx_bank_bill_payments_txn ON bill_payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_bill_payments_status ON bill_payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_bank_bill_payments_due_date ON bill_payments(due_date);
CREATE INDEX IF NOT EXISTS idx_bank_bill_payments_paid_at ON bill_payments(paid_at);

CREATE INDEX IF NOT EXISTS idx_bank_loan_products_type ON loan_products(loan_type);
CREATE INDEX IF NOT EXISTS idx_bank_loan_products_active ON loan_products(is_active);
CREATE INDEX IF NOT EXISTS idx_bank_loan_products_collateral ON loan_products(requires_collateral);

CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_user ON loan_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_product ON loan_applications(loan_product_id);
CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_employee ON loan_applications(assigned_employee_id);
CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_status ON loan_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_credit_score ON loan_applications(credit_score);
CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_applied_at ON loan_applications(applied_at);
CREATE INDEX IF NOT EXISTS idx_bank_loan_applications_decision_at ON loan_applications(decision_at);

CREATE INDEX IF NOT EXISTS idx_bank_loans_borrower ON loans(borrower_user_id);
CREATE INDEX IF NOT EXISTS idx_bank_loans_product ON loans(loan_product_id);
CREATE INDEX IF NOT EXISTS idx_bank_loans_disbursement_account ON loans(disbursement_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_loans_status ON loans(loan_status);
CREATE INDEX IF NOT EXISTS idx_bank_loans_disbursed_at ON loans(disbursed_at);
CREATE INDEX IF NOT EXISTS idx_bank_loans_maturity_date ON loans(maturity_date);
CREATE INDEX IF NOT EXISTS idx_bank_loans_closed_at ON loans(closed_at);

CREATE INDEX IF NOT EXISTS idx_bank_loan_repayments_loan ON loan_repayments(loan_id);
CREATE INDEX IF NOT EXISTS idx_bank_loan_repayments_account ON loan_repayments(debit_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_loan_repayments_txn ON loan_repayments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_loan_repayments_due_date ON loan_repayments(due_date);
CREATE INDEX IF NOT EXISTS idx_bank_loan_repayments_paid_date ON loan_repayments(paid_date);
CREATE INDEX IF NOT EXISTS idx_bank_loan_repayments_status ON loan_repayments(repayment_status);

CREATE INDEX IF NOT EXISTS idx_bank_fixed_deposits_user ON fixed_deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_fixed_deposits_account ON fixed_deposits(funding_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_fixed_deposits_status ON fixed_deposits(fd_status);
CREATE INDEX IF NOT EXISTS idx_bank_fixed_deposits_start_date ON fixed_deposits(start_date);
CREATE INDEX IF NOT EXISTS idx_bank_fixed_deposits_maturity_date ON fixed_deposits(maturity_date);

CREATE INDEX IF NOT EXISTS idx_bank_recurring_deposits_user ON recurring_deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_recurring_deposits_account ON recurring_deposits(debit_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_recurring_deposits_status ON recurring_deposits(rd_status);
CREATE INDEX IF NOT EXISTS idx_bank_recurring_deposits_start_date ON recurring_deposits(start_date);
CREATE INDEX IF NOT EXISTS idx_bank_recurring_deposits_maturity_date ON recurring_deposits(maturity_date);

CREATE INDEX IF NOT EXISTS idx_bank_reward_programs_type ON reward_programs(program_type);
CREATE INDEX IF NOT EXISTS idx_bank_reward_programs_active ON reward_programs(is_active);

CREATE INDEX IF NOT EXISTS idx_bank_reward_earnings_program ON reward_earnings(program_id);
CREATE INDEX IF NOT EXISTS idx_bank_reward_earnings_user ON reward_earnings(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_reward_earnings_card_txn ON reward_earnings(card_transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_reward_earnings_earned_at ON reward_earnings(earned_at);
CREATE INDEX IF NOT EXISTS idx_bank_reward_earnings_expires_at ON reward_earnings(expires_at);

CREATE INDEX IF NOT EXISTS idx_bank_reward_redemptions_program ON reward_redemptions(program_id);
CREATE INDEX IF NOT EXISTS idx_bank_reward_redemptions_user ON reward_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_reward_redemptions_type ON reward_redemptions(redemption_type);
CREATE INDEX IF NOT EXISTS idx_bank_reward_redemptions_redeemed_at ON reward_redemptions(redeemed_at);

CREATE INDEX IF NOT EXISTS idx_bank_complaints_user ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_account ON complaints(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_card ON complaints(card_id);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_employee ON complaints(assigned_employee_id);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_type ON complaints(complaint_type);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_status ON complaints(complaint_status);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_priority ON complaints(priority);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_bank_complaints_resolved_at ON complaints(resolved_at);

CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_user ON fraud_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_account ON fraud_alerts(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_card ON fraud_alerts(card_id);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_txn ON fraud_alerts(transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_card_txn ON fraud_alerts(card_transaction_id);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_type ON fraud_alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_severity ON fraud_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_status ON fraud_alerts(alert_status);
CREATE INDEX IF NOT EXISTS idx_bank_fraud_alerts_detected_at ON fraud_alerts(detected_at);

CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_account ON support_tickets(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_card ON support_tickets(card_id);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_loan ON support_tickets(loan_id);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_employee ON support_tickets(assigned_employee_id);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_issue_type ON support_tickets(issue_type);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_status ON support_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_bank_support_tickets_created_at ON support_tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_bank_notification_campaigns_type ON notification_campaigns(campaign_type);
CREATE INDEX IF NOT EXISTS idx_bank_notification_campaigns_status ON notification_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_bank_notification_campaigns_scheduled_at ON notification_campaigns(scheduled_at);

CREATE INDEX IF NOT EXISTS idx_bank_notification_deliveries_campaign ON notification_deliveries(campaign_id);
CREATE INDEX IF NOT EXISTS idx_bank_notification_deliveries_user ON notification_deliveries(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_notification_deliveries_account ON notification_deliveries(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_notification_deliveries_loan ON notification_deliveries(loan_id);
CREATE INDEX IF NOT EXISTS idx_bank_notification_deliveries_status ON notification_deliveries(delivery_status);
CREATE INDEX IF NOT EXISTS idx_bank_notification_deliveries_created_at ON notification_deliveries(created_at);

CREATE INDEX IF NOT EXISTS idx_bank_audit_logs_actor_user ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_bank_audit_logs_actor_employee ON audit_logs(actor_employee_id);
CREATE INDEX IF NOT EXISTS idx_bank_audit_logs_entity_name ON audit_logs(entity_name);
CREATE INDEX IF NOT EXISTS idx_bank_audit_logs_action_name ON audit_logs(action_name);
CREATE INDEX IF NOT EXISTS idx_bank_audit_logs_event_time ON audit_logs(event_time);

CREATE INDEX IF NOT EXISTS idx_bank_app_events_user ON app_events(user_id);
CREATE INDEX IF NOT EXISTS idx_bank_app_events_account ON app_events(account_id);
CREATE INDEX IF NOT EXISTS idx_bank_app_events_name ON app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_bank_app_events_screen ON app_events(screen_name);
CREATE INDEX IF NOT EXISTS idx_bank_app_events_time ON app_events(event_time);
