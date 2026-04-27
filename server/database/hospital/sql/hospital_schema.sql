-- ======================
-- HOSPITAL APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS hospital_schema;
SET search_path TO hospital_schema, public;

-- DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
  id BIGSERIAL PRIMARY KEY,
  department_code VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,
  department_type VARCHAR(30) NOT NULL
    CHECK (department_type IN ('clinical', 'surgical', 'diagnostic', 'support', 'administrative')),
  parent_department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  floor_number INTEGER,
  phone_extension VARCHAR(20),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- SPECIALIZATIONS
CREATE TABLE IF NOT EXISTS specializations (
  id BIGSERIAL PRIMARY KEY,
  specialization_code VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL UNIQUE,
  category VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DOCTORS
CREATE TABLE IF NOT EXISTS doctors (
  id BIGSERIAL PRIMARY KEY,
  employee_code VARCHAR(30) NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  gender VARCHAR(20)
    CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  date_of_birth DATE,
  email TEXT UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  primary_specialization_id BIGINT REFERENCES specializations(id) ON DELETE SET NULL,
  license_number VARCHAR(60) NOT NULL UNIQUE,
  years_of_experience INTEGER CHECK (years_of_experience IS NULL OR years_of_experience >= 0),
  employment_type VARCHAR(20) NOT NULL DEFAULT 'full_time'
    CHECK (employment_type IN ('full_time', 'part_time', 'visiting', 'contract')),
  consultation_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (consultation_fee >= 0),
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_available_for_appointments BOOLEAN NOT NULL DEFAULT true,
  rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DOCTOR SPECIALIZATIONS
CREATE TABLE IF NOT EXISTS doctor_specializations (
  id BIGSERIAL PRIMARY KEY,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  specialization_id BIGINT NOT NULL REFERENCES specializations(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(doctor_id, specialization_id)
);

-- DOCTOR SCHEDULES
CREATE TABLE IF NOT EXISTS doctor_schedules (
  id BIGSERIAL PRIMARY KEY,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_mins INTEGER NOT NULL DEFAULT 15 CHECK (slot_duration_mins > 0),
  max_patients_per_slot INTEGER NOT NULL DEFAULT 1 CHECK (max_patients_per_slot > 0),
  consultation_mode VARCHAR(20) NOT NULL DEFAULT 'in_person'
    CHECK (consultation_mode IN ('in_person', 'video', 'phone')),
  effective_from DATE NOT NULL,
  effective_to DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (end_time > start_time),
  CHECK (effective_to IS NULL OR effective_to >= effective_from)
);

-- DOCTOR LEAVES
CREATE TABLE IF NOT EXISTS doctor_leaves (
  id BIGSERIAL PRIMARY KEY,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  leave_type VARCHAR(20) NOT NULL
    CHECK (leave_type IN ('vacation', 'sick', 'conference', 'emergency', 'other')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_full_day BOOLEAN NOT NULL DEFAULT true,
  start_time TIME,
  end_time TIME,
  approval_status VARCHAR(20) NOT NULL DEFAULT 'approved'
    CHECK (approval_status IN ('pending', 'approved', 'rejected', 'cancelled')),
  reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (end_date >= start_date)
);

-- PATIENTS
CREATE TABLE IF NOT EXISTS patients (
  id BIGSERIAL PRIMARY KEY,
  patient_code VARCHAR(30) NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  gender VARCHAR(20)
    CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  date_of_birth DATE,
  blood_group VARCHAR(5),
  phone VARCHAR(20),
  email TEXT,
  city VARCHAR(80),
  state VARCHAR(80),
  postal_code VARCHAR(20),
  emergency_contact_name TEXT,
  emergency_contact_phone VARCHAR(20),
  marital_status VARCHAR(20)
    CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed', 'other')),
  registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  deceased_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PATIENT ADDRESSES
CREATE TABLE IF NOT EXISTS patient_addresses (
  id BIGSERIAL PRIMARY KEY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  address_type VARCHAR(20) NOT NULL
    CHECK (address_type IN ('home', 'work', 'billing', 'temporary')),
  line1 TEXT NOT NULL,
  line2 TEXT,
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80),
  postal_code VARCHAR(20),
  country VARCHAR(80) NOT NULL DEFAULT 'India',
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PATIENT ALLERGIES
CREATE TABLE IF NOT EXISTS patient_allergies (
  id BIGSERIAL PRIMARY KEY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  allergen_name VARCHAR(120) NOT NULL,
  allergy_type VARCHAR(30)
    CHECK (allergy_type IN ('drug', 'food', 'environmental', 'latex', 'other')),
  severity VARCHAR(20)
    CHECK (severity IN ('mild', 'moderate', 'severe', 'critical')),
  reaction_notes TEXT,
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PATIENT CONDITIONS
CREATE TABLE IF NOT EXISTS patient_conditions (
  id BIGSERIAL PRIMARY KEY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  condition_name VARCHAR(150) NOT NULL,
  icd_code VARCHAR(20),
  diagnosis_date DATE,
  condition_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (condition_status IN ('active', 'resolved', 'chronic', 'inactive')),
  notes TEXT,
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- INSURANCE PROVIDERS
CREATE TABLE IF NOT EXISTS insurance_providers (
  id BIGSERIAL PRIMARY KEY,
  provider_code VARCHAR(30) NOT NULL UNIQUE,
  provider_name VARCHAR(150) NOT NULL UNIQUE,
  payer_type VARCHAR(20) NOT NULL
    CHECK (payer_type IN ('private', 'government', 'employer', 'tpa')),
  phone VARCHAR(20),
  email TEXT,
  claim_submission_mode VARCHAR(20)
    CHECK (claim_submission_mode IN ('portal', 'email', 'api', 'paper')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- INSURANCE POLICIES
CREATE TABLE IF NOT EXISTS insurance_policies (
  id BIGSERIAL PRIMARY KEY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  insurance_provider_id BIGINT NOT NULL REFERENCES insurance_providers(id) ON DELETE RESTRICT,
  policy_number VARCHAR(80) NOT NULL,
  member_id VARCHAR(80),
  group_number VARCHAR(80),
  plan_name VARCHAR(100),
  coverage_type VARCHAR(20) NOT NULL
    CHECK (coverage_type IN ('self', 'family', 'corporate')),
  relationship_to_holder VARCHAR(20)
    CHECK (relationship_to_holder IN ('self', 'spouse', 'child', 'parent', 'other')),
  coverage_start_date DATE NOT NULL,
  coverage_end_date DATE,
  copay_amount NUMERIC(10, 2) DEFAULT 0 CHECK (copay_amount >= 0),
  deductible_amount NUMERIC(10, 2) DEFAULT 0 CHECK (deductible_amount >= 0),
  coverage_percent NUMERIC(5, 2) CHECK (coverage_percent IS NULL OR (coverage_percent >= 0 AND coverage_percent <= 100)),
  is_primary BOOLEAN NOT NULL DEFAULT true,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending', 'verified', 'rejected', 'expired')),
  verified_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(insurance_provider_id, policy_number),
  CHECK (coverage_end_date IS NULL OR coverage_end_date >= coverage_start_date)
);

-- ROOMS
CREATE TABLE IF NOT EXISTS rooms (
  id BIGSERIAL PRIMARY KEY,
  room_number VARCHAR(30) NOT NULL UNIQUE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  ward_name VARCHAR(80),
  floor_number INTEGER,
  room_type VARCHAR(20) NOT NULL
    CHECK (room_type IN ('general', 'private', 'semi_private', 'icu', 'ot', 'lab', 'recovery', 'emergency')),
  bed_capacity INTEGER NOT NULL DEFAULT 1 CHECK (bed_capacity > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- BEDS
CREATE TABLE IF NOT EXISTS beds (
  id BIGSERIAL PRIMARY KEY,
  room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  bed_number VARCHAR(30) NOT NULL,
  bed_type VARCHAR(20) NOT NULL
    CHECK (bed_type IN ('standard', 'icu', 'ventilator', 'pediatric', 'maternity', 'recovery')),
  bed_status VARCHAR(20) NOT NULL DEFAULT 'available'
    CHECK (bed_status IN ('available', 'occupied', 'reserved', 'maintenance', 'blocked')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(room_id, bed_number)
);

-- APPOINTMENTS
CREATE TABLE IF NOT EXISTS appointments (
  id BIGSERIAL PRIMARY KEY,
  appointment_number VARCHAR(40) NOT NULL UNIQUE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  booked_by_patient BOOLEAN NOT NULL DEFAULT true,
  appointment_type VARCHAR(20) NOT NULL
    CHECK (appointment_type IN ('consultation', 'follow_up', 'procedure_review', 'diagnostic_review', 'vaccination')),
  consultation_mode VARCHAR(20) NOT NULL DEFAULT 'in_person'
    CHECK (consultation_mode IN ('in_person', 'video', 'phone')),
  appointment_status VARCHAR(20) NOT NULL DEFAULT 'scheduled'
    CHECK (appointment_status IN ('scheduled', 'checked_in', 'in_consultation', 'completed', 'cancelled', 'no_show', 'rescheduled')),
  scheduled_start_at TIMESTAMP NOT NULL,
  scheduled_end_at TIMESTAMP NOT NULL,
  check_in_at TIMESTAMP NULL,
  consultation_started_at TIMESTAMP NULL,
  consultation_ended_at TIMESTAMP NULL,
  cancellation_reason TEXT,
  visit_reason TEXT,
  queue_token VARCHAR(30),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (scheduled_end_at > scheduled_start_at),
  CHECK (check_in_at IS NULL OR check_in_at >= scheduled_start_at - INTERVAL '1 day'),
  CHECK (consultation_started_at IS NULL OR consultation_started_at >= scheduled_start_at - INTERVAL '1 day'),
  CHECK (consultation_ended_at IS NULL OR consultation_started_at IS NULL OR consultation_ended_at >= consultation_started_at)
);

-- APPOINTMENT STATUS HISTORY
CREATE TABLE IF NOT EXISTS appointment_status_history (
  id BIGSERIAL PRIMARY KEY,
  appointment_id BIGINT NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  changed_by VARCHAR(20)
    CHECK (changed_by IN ('patient', 'doctor', 'staff', 'system', 'admin')),
  notes TEXT
);

-- ENCOUNTERS
CREATE TABLE IF NOT EXISTS encounters (
  id BIGSERIAL PRIMARY KEY,
  encounter_number VARCHAR(40) NOT NULL UNIQUE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id BIGINT UNIQUE REFERENCES appointments(id) ON DELETE SET NULL,
  admission_id BIGINT UNIQUE,
  attending_doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  encounter_type VARCHAR(20) NOT NULL
    CHECK (encounter_type IN ('outpatient', 'inpatient', 'emergency', 'teleconsult', 'daycare')),
  encounter_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (encounter_status IN ('open', 'closed', 'cancelled')),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  diagnosis_summary TEXT,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ended_at IS NULL OR ended_at >= started_at)
);

-- ADMISSIONS
CREATE TABLE IF NOT EXISTS admissions (
  id BIGSERIAL PRIMARY KEY,
  admission_number VARCHAR(40) NOT NULL UNIQUE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  admitting_doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  admission_type VARCHAR(20) NOT NULL
    CHECK (admission_type IN ('elective', 'emergency', 'transfer', 'maternity', 'surgery')),
  admission_status VARCHAR(20) NOT NULL DEFAULT 'admitted'
    CHECK (admission_status IN ('admitted', 'discharged', 'cancelled', 'transferred')),
  admitted_at TIMESTAMP NOT NULL,
  discharge_at TIMESTAMP NULL,
  expected_discharge_at TIMESTAMP NULL,
  primary_diagnosis VARCHAR(200),
  discharge_disposition VARCHAR(30)
    CHECK (discharge_disposition IN ('home', 'expired', 'transferred', 'ama', 'rehab', 'other')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (discharge_at IS NULL OR discharge_at >= admitted_at),
  CHECK (expected_discharge_at IS NULL OR expected_discharge_at >= admitted_at)
);

ALTER TABLE encounters
  ADD CONSTRAINT fk_encounters_admission
  FOREIGN KEY (admission_id) REFERENCES admissions(id) ON DELETE SET NULL;

-- BED ALLOCATIONS
CREATE TABLE IF NOT EXISTS bed_allocations (
  id BIGSERIAL PRIMARY KEY,
  admission_id BIGINT NOT NULL REFERENCES admissions(id) ON DELETE CASCADE,
  bed_id BIGINT NOT NULL REFERENCES beds(id) ON DELETE RESTRICT,
  allocated_at TIMESTAMP NOT NULL,
  released_at TIMESTAMP NULL,
  allocation_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (allocation_status IN ('active', 'released', 'transferred', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (released_at IS NULL OR released_at >= allocated_at)
);

-- VITAL SIGNS
CREATE TABLE IF NOT EXISTS vital_signs (
  id BIGSERIAL PRIMARY KEY,
  encounter_id BIGINT NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  recorded_by_doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  recorded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  temperature_c NUMERIC(4, 1),
  systolic_bp INTEGER,
  diastolic_bp INTEGER,
  pulse_rate INTEGER,
  respiratory_rate INTEGER,
  oxygen_saturation NUMERIC(5, 2),
  height_cm NUMERIC(6, 2),
  weight_kg NUMERIC(6, 2),
  bmi NUMERIC(5, 2),
  notes TEXT
);

-- DIAGNOSES
CREATE TABLE IF NOT EXISTS diagnoses (
  id BIGSERIAL PRIMARY KEY,
  encounter_id BIGINT NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  diagnosis_type VARCHAR(20) NOT NULL
    CHECK (diagnosis_type IN ('primary', 'secondary', 'differential', 'discharge')),
  diagnosis_name VARCHAR(200) NOT NULL,
  icd_code VARCHAR(20),
  severity VARCHAR(20)
    CHECK (severity IN ('mild', 'moderate', 'severe', 'critical')),
  diagnosed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- PRESCRIPTIONS
CREATE TABLE IF NOT EXISTS prescriptions (
  id BIGSERIAL PRIMARY KEY,
  prescription_number VARCHAR(40) NOT NULL UNIQUE,
  encounter_id BIGINT NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  prescribed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  prescription_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (prescription_status IN ('active', 'completed', 'cancelled', 'expired')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MEDICATIONS
CREATE TABLE IF NOT EXISTS medications (
  id BIGSERIAL PRIMARY KEY,
  medication_code VARCHAR(40) NOT NULL UNIQUE,
  generic_name VARCHAR(150) NOT NULL,
  brand_name VARCHAR(150),
  form VARCHAR(30)
    CHECK (form IN ('tablet', 'capsule', 'syrup', 'injection', 'ointment', 'drops', 'inhaler', 'other')),
  strength VARCHAR(50),
  manufacturer VARCHAR(100),
  unit_price NUMERIC(10, 2) DEFAULT 0 CHECK (unit_price >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PRESCRIPTION ITEMS
CREATE TABLE IF NOT EXISTS prescription_items (
  id BIGSERIAL PRIMARY KEY,
  prescription_id BIGINT NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
  medication_id BIGINT NOT NULL REFERENCES medications(id) ON DELETE RESTRICT,
  dosage VARCHAR(100) NOT NULL,
  frequency VARCHAR(100) NOT NULL,
  duration_days INTEGER CHECK (duration_days IS NULL OR duration_days > 0),
  quantity NUMERIC(10, 2) CHECK (quantity IS NULL OR quantity > 0),
  route VARCHAR(30)
    CHECK (route IN ('oral', 'iv', 'im', 'topical', 'inhalation', 'subcutaneous', 'other')),
  instructions TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LAB TEST CATALOG
CREATE TABLE IF NOT EXISTS lab_test_catalog (
  id BIGSERIAL PRIMARY KEY,
  test_code VARCHAR(40) NOT NULL UNIQUE,
  test_name VARCHAR(150) NOT NULL UNIQUE,
  test_category VARCHAR(50),
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  sample_type VARCHAR(30)
    CHECK (sample_type IN ('blood', 'urine', 'stool', 'saliva', 'swab', 'imaging', 'other')),
  standard_price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (standard_price >= 0),
  turnaround_hours INTEGER CHECK (turnaround_hours IS NULL OR turnaround_hours >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LAB ORDERS
CREATE TABLE IF NOT EXISTS lab_orders (
  id BIGSERIAL PRIMARY KEY,
  lab_order_number VARCHAR(40) NOT NULL UNIQUE,
  encounter_id BIGINT NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  ordered_by_doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  ordered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  order_status VARCHAR(20) NOT NULL DEFAULT 'ordered'
    CHECK (order_status IN ('ordered', 'sample_collected', 'processing', 'completed', 'cancelled')),
  priority VARCHAR(20) NOT NULL DEFAULT 'routine'
    CHECK (priority IN ('routine', 'urgent', 'stat')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- LAB ORDER ITEMS
CREATE TABLE IF NOT EXISTS lab_order_items (
  id BIGSERIAL PRIMARY KEY,
  lab_order_id BIGINT NOT NULL REFERENCES lab_orders(id) ON DELETE CASCADE,
  test_id BIGINT NOT NULL REFERENCES lab_test_catalog(id) ON DELETE RESTRICT,
  item_status VARCHAR(20) NOT NULL DEFAULT 'ordered'
    CHECK (item_status IN ('ordered', 'sample_collected', 'processing', 'completed', 'cancelled')),
  sample_collected_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  result_flag VARCHAR(20)
    CHECK (result_flag IN ('normal', 'abnormal', 'critical', 'pending')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(lab_order_id, test_id),
  CHECK (completed_at IS NULL OR sample_collected_at IS NULL OR completed_at >= sample_collected_at)
);

-- LAB RESULTS
CREATE TABLE IF NOT EXISTS lab_results (
  id BIGSERIAL PRIMARY KEY,
  lab_order_item_id BIGINT NOT NULL UNIQUE REFERENCES lab_order_items(id) ON DELETE CASCADE,
  result_value TEXT,
  result_unit VARCHAR(30),
  reference_range VARCHAR(100),
  interpretation VARCHAR(20)
    CHECK (interpretation IN ('normal', 'high', 'low', 'critical', 'inconclusive')),
  approved_by_doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  resulted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- PROCEDURES
CREATE TABLE IF NOT EXISTS procedures (
  id BIGSERIAL PRIMARY KEY,
  procedure_code VARCHAR(40) NOT NULL UNIQUE,
  procedure_name VARCHAR(150) NOT NULL UNIQUE,
  procedure_category VARCHAR(50),
  standard_price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (standard_price >= 0),
  is_surgical BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PROCEDURE ORDERS
CREATE TABLE IF NOT EXISTS procedure_orders (
  id BIGSERIAL PRIMARY KEY,
  procedure_order_number VARCHAR(40) NOT NULL UNIQUE,
  encounter_id BIGINT NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  procedure_id BIGINT NOT NULL REFERENCES procedures(id) ON DELETE RESTRICT,
  ordered_by_doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMP NULL,
  performed_at TIMESTAMP NULL,
  procedure_status VARCHAR(20) NOT NULL DEFAULT 'ordered'
    CHECK (procedure_status IN ('ordered', 'scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (performed_at IS NULL OR scheduled_at IS NULL OR performed_at >= scheduled_at)
);

-- INVOICES
CREATE TABLE IF NOT EXISTS invoices (
  id BIGSERIAL PRIMARY KEY,
  invoice_number VARCHAR(40) NOT NULL UNIQUE,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  encounter_id BIGINT REFERENCES encounters(id) ON DELETE SET NULL,
  admission_id BIGINT REFERENCES admissions(id) ON DELETE SET NULL,
  insurance_policy_id BIGINT REFERENCES insurance_policies(id) ON DELETE SET NULL,
  invoice_type VARCHAR(20) NOT NULL
    CHECK (invoice_type IN ('outpatient', 'inpatient', 'lab', 'pharmacy', 'procedure', 'package')),
  invoice_status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (invoice_status IN ('draft', 'issued', 'partially_paid', 'paid', 'cancelled', 'written_off')),
  issued_at TIMESTAMP NULL,
  due_at TIMESTAMP NULL,
  subtotal_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (subtotal_amount >= 0),
  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  insurance_covered_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (insurance_covered_amount >= 0),
  patient_payable_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (patient_payable_amount >= 0),
  total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (due_at IS NULL OR issued_at IS NULL OR due_at >= issued_at)
);

-- INVOICE ITEMS
CREATE TABLE IF NOT EXISTS invoice_items (
  id BIGSERIAL PRIMARY KEY,
  invoice_id BIGINT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  item_type VARCHAR(20) NOT NULL
    CHECK (item_type IN ('consultation', 'room', 'bed', 'lab', 'pharmacy', 'procedure', 'service', 'other')),
  item_reference_id BIGINT,
  description TEXT NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  line_total NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (line_total >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  payment_number VARCHAR(40) NOT NULL UNIQUE,
  invoice_id BIGINT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  payment_method VARCHAR(20) NOT NULL
    CHECK (payment_method IN ('cash', 'card', 'upi', 'bank_transfer', 'insurance', 'wallet')),
  payment_status VARCHAR(20) NOT NULL DEFAULT 'successful'
    CHECK (payment_status IN ('pending', 'successful', 'failed', 'refunded', 'partial_refund')),
  amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  transaction_ref VARCHAR(100) UNIQUE,
  paid_at TIMESTAMP NULL,
  refund_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (refund_amount >= 0),
  refunded_at TIMESTAMP NULL,
  failure_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (refunded_at IS NULL OR paid_at IS NULL OR refunded_at >= paid_at)
);

-- INSURANCE CLAIMS
CREATE TABLE IF NOT EXISTS insurance_claims (
  id BIGSERIAL PRIMARY KEY,
  claim_number VARCHAR(50) NOT NULL UNIQUE,
  invoice_id BIGINT NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  insurance_policy_id BIGINT NOT NULL REFERENCES insurance_policies(id) ON DELETE RESTRICT,
  claim_status VARCHAR(20) NOT NULL DEFAULT 'submitted'
    CHECK (claim_status IN ('draft', 'submitted', 'under_review', 'approved', 'partially_approved', 'rejected', 'settled')),
  claimed_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (claimed_amount >= 0),
  approved_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (approved_amount >= 0),
  submitted_at TIMESTAMP NULL,
  decision_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (decision_at IS NULL OR submitted_at IS NULL OR decision_at >= submitted_at)
);

-- STAFF USERS
CREATE TABLE IF NOT EXISTS staff_users (
  id BIGSERIAL PRIMARY KEY,
  employee_code VARCHAR(30) NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone VARCHAR(20) UNIQUE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  role_name VARCHAR(30) NOT NULL
    CHECK (role_name IN ('receptionist', 'nurse', 'lab_technician', 'pharmacist', 'billing_exec', 'admin')),
  shift_type VARCHAR(20)
    CHECK (shift_type IN ('day', 'night', 'rotational')),
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- PATIENT FEEDBACK
CREATE TABLE IF NOT EXISTS patient_feedback (
  id BIGSERIAL PRIMARY KEY,
  patient_id BIGINT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id BIGINT REFERENCES doctors(id) ON DELETE SET NULL,
  appointment_id BIGINT REFERENCES appointments(id) ON DELETE SET NULL,
  encounter_id BIGINT REFERENCES encounters(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback_category VARCHAR(30)
    CHECK (feedback_category IN ('consultation', 'staff', 'billing', 'cleanliness', 'wait_time', 'overall')),
  comments TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_type VARCHAR(20) NOT NULL
    CHECK (actor_type IN ('doctor', 'staff', 'patient', 'system', 'admin')),
  actor_id BIGINT,
  entity_name VARCHAR(50) NOT NULL,
  entity_id BIGINT NOT NULL,
  action_name VARCHAR(30) NOT NULL
    CHECK (action_name IN ('create', 'update', 'delete', 'status_change', 'view', 'approve', 'cancel', 'assign')),
  action_time TIMESTAMP NOT NULL DEFAULT NOW(),
  notes TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_hospital_departments_type ON departments(department_type);
CREATE INDEX IF NOT EXISTS idx_hospital_departments_parent ON departments(parent_department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_departments_active ON departments(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_specializations_active ON specializations(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_doctors_department ON doctors(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctors_specialization ON doctors(primary_specialization_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctors_active ON doctors(is_active);
CREATE INDEX IF NOT EXISTS idx_hospital_doctors_available ON doctors(is_available_for_appointments);
CREATE INDEX IF NOT EXISTS idx_hospital_doctors_joined_at ON doctors(joined_at);

CREATE INDEX IF NOT EXISTS idx_hospital_doctor_specializations_doctor ON doctor_specializations(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_specializations_specialization ON doctor_specializations(specialization_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_specializations_primary ON doctor_specializations(is_primary);

CREATE INDEX IF NOT EXISTS idx_hospital_doctor_schedules_doctor ON doctor_schedules(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_schedules_department ON doctor_schedules(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_schedules_day ON doctor_schedules(day_of_week);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_schedules_effective_from ON doctor_schedules(effective_from);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_schedules_effective_to ON doctor_schedules(effective_to);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_schedules_active ON doctor_schedules(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_doctor_leaves_doctor ON doctor_leaves(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_leaves_start_date ON doctor_leaves(start_date);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_leaves_end_date ON doctor_leaves(end_date);
CREATE INDEX IF NOT EXISTS idx_hospital_doctor_leaves_status ON doctor_leaves(approval_status);

CREATE INDEX IF NOT EXISTS idx_hospital_patients_registered_at ON patients(registered_at);
CREATE INDEX IF NOT EXISTS idx_hospital_patients_city ON patients(city);
CREATE INDEX IF NOT EXISTS idx_hospital_patients_active ON patients(is_active);
CREATE INDEX IF NOT EXISTS idx_hospital_patients_deceased_at ON patients(deceased_at);

CREATE INDEX IF NOT EXISTS idx_hospital_patient_addresses_patient ON patient_addresses(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_addresses_type ON patient_addresses(address_type);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_addresses_primary ON patient_addresses(is_primary);

CREATE INDEX IF NOT EXISTS idx_hospital_patient_allergies_patient ON patient_allergies(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_allergies_type ON patient_allergies(allergy_type);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_allergies_severity ON patient_allergies(severity);

CREATE INDEX IF NOT EXISTS idx_hospital_patient_conditions_patient ON patient_conditions(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_conditions_icd_code ON patient_conditions(icd_code);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_conditions_status ON patient_conditions(condition_status);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_conditions_diagnosis_date ON patient_conditions(diagnosis_date);

CREATE INDEX IF NOT EXISTS idx_hospital_insurance_providers_payer_type ON insurance_providers(payer_type);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_providers_active ON insurance_providers(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_insurance_policies_patient ON insurance_policies(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_policies_provider ON insurance_policies(insurance_provider_id);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_policies_primary ON insurance_policies(is_primary);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_policies_status ON insurance_policies(verification_status);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_policies_start_date ON insurance_policies(coverage_start_date);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_policies_end_date ON insurance_policies(coverage_end_date);

CREATE INDEX IF NOT EXISTS idx_hospital_rooms_department ON rooms(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_rooms_type ON rooms(room_type);
CREATE INDEX IF NOT EXISTS idx_hospital_rooms_floor ON rooms(floor_number);
CREATE INDEX IF NOT EXISTS idx_hospital_rooms_active ON rooms(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_beds_room ON beds(room_id);
CREATE INDEX IF NOT EXISTS idx_hospital_beds_type ON beds(bed_type);
CREATE INDEX IF NOT EXISTS idx_hospital_beds_status ON beds(bed_status);
CREATE INDEX IF NOT EXISTS idx_hospital_beds_active ON beds(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_department ON appointments(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_status ON appointments(appointment_status);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_type ON appointments(appointment_type);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_mode ON appointments(consultation_mode);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_start ON appointments(scheduled_start_at);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_end ON appointments(scheduled_end_at);
CREATE INDEX IF NOT EXISTS idx_hospital_appointments_check_in_at ON appointments(check_in_at);

CREATE INDEX IF NOT EXISTS idx_hospital_appointment_status_history_appointment ON appointment_status_history(appointment_id);
CREATE INDEX IF NOT EXISTS idx_hospital_appointment_status_history_status ON appointment_status_history(new_status);
CREATE INDEX IF NOT EXISTS idx_hospital_appointment_status_history_changed_at ON appointment_status_history(changed_at);

CREATE INDEX IF NOT EXISTS idx_hospital_encounters_patient ON encounters(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_appointment ON encounters(appointment_id);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_admission ON encounters(admission_id);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_doctor ON encounters(attending_doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_department ON encounters(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_type ON encounters(encounter_type);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_status ON encounters(encounter_status);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_started_at ON encounters(started_at);
CREATE INDEX IF NOT EXISTS idx_hospital_encounters_ended_at ON encounters(ended_at);

CREATE INDEX IF NOT EXISTS idx_hospital_admissions_patient ON admissions(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_admissions_doctor ON admissions(admitting_doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_admissions_department ON admissions(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_admissions_type ON admissions(admission_type);
CREATE INDEX IF NOT EXISTS idx_hospital_admissions_status ON admissions(admission_status);
CREATE INDEX IF NOT EXISTS idx_hospital_admissions_admitted_at ON admissions(admitted_at);
CREATE INDEX IF NOT EXISTS idx_hospital_admissions_discharge_at ON admissions(discharge_at);

CREATE INDEX IF NOT EXISTS idx_hospital_bed_allocations_admission ON bed_allocations(admission_id);
CREATE INDEX IF NOT EXISTS idx_hospital_bed_allocations_bed ON bed_allocations(bed_id);
CREATE INDEX IF NOT EXISTS idx_hospital_bed_allocations_status ON bed_allocations(allocation_status);
CREATE INDEX IF NOT EXISTS idx_hospital_bed_allocations_allocated_at ON bed_allocations(allocated_at);
CREATE INDEX IF NOT EXISTS idx_hospital_bed_allocations_released_at ON bed_allocations(released_at);

CREATE INDEX IF NOT EXISTS idx_hospital_vital_signs_encounter ON vital_signs(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_vital_signs_patient ON vital_signs(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_vital_signs_doctor ON vital_signs(recorded_by_doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_vital_signs_recorded_at ON vital_signs(recorded_at);

CREATE INDEX IF NOT EXISTS idx_hospital_diagnoses_encounter ON diagnoses(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_diagnoses_patient ON diagnoses(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_diagnoses_doctor ON diagnoses(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_diagnoses_type ON diagnoses(diagnosis_type);
CREATE INDEX IF NOT EXISTS idx_hospital_diagnoses_icd_code ON diagnoses(icd_code);
CREATE INDEX IF NOT EXISTS idx_hospital_diagnoses_diagnosed_at ON diagnoses(diagnosed_at);

CREATE INDEX IF NOT EXISTS idx_hospital_prescriptions_encounter ON prescriptions(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_prescriptions_doctor ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_prescriptions_status ON prescriptions(prescription_status);
CREATE INDEX IF NOT EXISTS idx_hospital_prescriptions_prescribed_at ON prescriptions(prescribed_at);

CREATE INDEX IF NOT EXISTS idx_hospital_medications_generic_name ON medications(generic_name);
CREATE INDEX IF NOT EXISTS idx_hospital_medications_brand_name ON medications(brand_name);
CREATE INDEX IF NOT EXISTS idx_hospital_medications_form ON medications(form);
CREATE INDEX IF NOT EXISTS idx_hospital_medications_active ON medications(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_prescription_items_prescription ON prescription_items(prescription_id);
CREATE INDEX IF NOT EXISTS idx_hospital_prescription_items_medication ON prescription_items(medication_id);
CREATE INDEX IF NOT EXISTS idx_hospital_prescription_items_route ON prescription_items(route);

CREATE INDEX IF NOT EXISTS idx_hospital_lab_test_catalog_department ON lab_test_catalog(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_test_catalog_category ON lab_test_catalog(test_category);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_test_catalog_sample_type ON lab_test_catalog(sample_type);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_test_catalog_active ON lab_test_catalog(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_lab_orders_encounter ON lab_orders(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_orders_patient ON lab_orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_orders_doctor ON lab_orders(ordered_by_doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_orders_status ON lab_orders(order_status);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_orders_priority ON lab_orders(priority);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_orders_ordered_at ON lab_orders(ordered_at);

CREATE INDEX IF NOT EXISTS idx_hospital_lab_order_items_order ON lab_order_items(lab_order_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_order_items_test ON lab_order_items(test_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_order_items_status ON lab_order_items(item_status);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_order_items_collected_at ON lab_order_items(sample_collected_at);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_order_items_completed_at ON lab_order_items(completed_at);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_order_items_flag ON lab_order_items(result_flag);

CREATE INDEX IF NOT EXISTS idx_hospital_lab_results_item ON lab_results(lab_order_item_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_results_doctor ON lab_results(approved_by_doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_results_interpretation ON lab_results(interpretation);
CREATE INDEX IF NOT EXISTS idx_hospital_lab_results_resulted_at ON lab_results(resulted_at);

CREATE INDEX IF NOT EXISTS idx_hospital_procedures_category ON procedures(procedure_category);
CREATE INDEX IF NOT EXISTS idx_hospital_procedures_surgical ON procedures(is_surgical);
CREATE INDEX IF NOT EXISTS idx_hospital_procedures_active ON procedures(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_encounter ON procedure_orders(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_patient ON procedure_orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_procedure ON procedure_orders(procedure_id);
CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_doctor ON procedure_orders(ordered_by_doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_status ON procedure_orders(procedure_status);
CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_scheduled_at ON procedure_orders(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_hospital_procedure_orders_performed_at ON procedure_orders(performed_at);

CREATE INDEX IF NOT EXISTS idx_hospital_invoices_patient ON invoices(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_encounter ON invoices(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_admission ON invoices(admission_id);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_policy ON invoices(insurance_policy_id);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_type ON invoices(invoice_type);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_status ON invoices(invoice_status);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_issued_at ON invoices(issued_at);
CREATE INDEX IF NOT EXISTS idx_hospital_invoices_due_at ON invoices(due_at);

CREATE INDEX IF NOT EXISTS idx_hospital_invoice_items_invoice ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_hospital_invoice_items_type ON invoice_items(item_type);
CREATE INDEX IF NOT EXISTS idx_hospital_invoice_items_reference ON invoice_items(item_reference_id);

CREATE INDEX IF NOT EXISTS idx_hospital_payments_invoice ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_hospital_payments_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_hospital_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_hospital_payments_paid_at ON payments(paid_at);

CREATE INDEX IF NOT EXISTS idx_hospital_insurance_claims_invoice ON insurance_claims(invoice_id);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_claims_policy ON insurance_claims(insurance_policy_id);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_claims_status ON insurance_claims(claim_status);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_claims_submitted_at ON insurance_claims(submitted_at);
CREATE INDEX IF NOT EXISTS idx_hospital_insurance_claims_decision_at ON insurance_claims(decision_at);

CREATE INDEX IF NOT EXISTS idx_hospital_staff_users_department ON staff_users(department_id);
CREATE INDEX IF NOT EXISTS idx_hospital_staff_users_role ON staff_users(role_name);
CREATE INDEX IF NOT EXISTS idx_hospital_staff_users_shift ON staff_users(shift_type);
CREATE INDEX IF NOT EXISTS idx_hospital_staff_users_active ON staff_users(is_active);

CREATE INDEX IF NOT EXISTS idx_hospital_patient_feedback_patient ON patient_feedback(patient_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_feedback_doctor ON patient_feedback(doctor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_feedback_appointment ON patient_feedback(appointment_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_feedback_encounter ON patient_feedback(encounter_id);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_feedback_category ON patient_feedback(feedback_category);
CREATE INDEX IF NOT EXISTS idx_hospital_patient_feedback_created_at ON patient_feedback(created_at);

CREATE INDEX IF NOT EXISTS idx_hospital_audit_logs_actor_type ON audit_logs(actor_type);
CREATE INDEX IF NOT EXISTS idx_hospital_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_hospital_audit_logs_entity_name ON audit_logs(entity_name);
CREATE INDEX IF NOT EXISTS idx_hospital_audit_logs_entity_id ON audit_logs(entity_id);
CREATE INDEX IF NOT EXISTS idx_hospital_audit_logs_action_name ON audit_logs(action_name);
CREATE INDEX IF NOT EXISTS idx_hospital_audit_logs_action_time ON audit_logs(action_time);
