-- ======================
-- EDUCATION APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS education_schema;
SET search_path TO education_schema, public;

-- INSTITUTIONS
CREATE TABLE IF NOT EXISTS institutions (
  id BIGSERIAL PRIMARY KEY,
  institution_name TEXT NOT NULL UNIQUE,
  institution_type VARCHAR(30) NOT NULL
    CHECK (institution_type IN ('school', 'college', 'university', 'coaching_center', 'training_institute', 'edtech')),
  board_or_university VARCHAR(120),
  country VARCHAR(80) NOT NULL,
  state VARCHAR(80),
  city VARCHAR(80),
  timezone VARCHAR(50),
  established_year INTEGER CHECK (established_year IS NULL OR established_year >= 1800),
  website_url TEXT,
  support_email TEXT,
  support_phone VARCHAR(20),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CAMPUSES
CREATE TABLE IF NOT EXISTS campuses (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  campus_name VARCHAR(120) NOT NULL,
  campus_code VARCHAR(30),
  address_line1 TEXT,
  address_line2 TEXT,
  city VARCHAR(80),
  state VARCHAR(80),
  country VARCHAR(80),
  postal_code VARCHAR(20),
  capacity INTEGER CHECK (capacity IS NULL OR capacity >= 0),
  is_main_campus BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, campus_name)
);

-- ACADEMIC TERMS
CREATE TABLE IF NOT EXISTS academic_terms (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  term_name VARCHAR(100) NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  term_type VARCHAR(20) NOT NULL
    CHECK (term_type IN ('year', 'semester', 'trimester', 'quarter', 'session', 'batch')),
  starts_on DATE NOT NULL,
  ends_on DATE NOT NULL,
  enrollment_open_at TIMESTAMP NULL,
  enrollment_close_at TIMESTAMP NULL,
  result_published_at TIMESTAMP NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_on >= starts_on),
  CHECK (enrollment_close_at IS NULL OR enrollment_open_at IS NULL OR enrollment_close_at >= enrollment_open_at),
  UNIQUE(institution_id, term_name, academic_year)
);

-- DEPARTMENTS
CREATE TABLE IF NOT EXISTS departments (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  campus_id BIGINT REFERENCES campuses(id) ON DELETE SET NULL,
  department_name VARCHAR(120) NOT NULL,
  department_code VARCHAR(30),
  department_type VARCHAR(20) NOT NULL DEFAULT 'academic'
    CHECK (department_type IN ('academic', 'administrative', 'support')),
  head_user_id BIGINT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, department_name)
);

-- PROGRAMS
CREATE TABLE IF NOT EXISTS programs (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  program_name VARCHAR(150) NOT NULL,
  program_code VARCHAR(30),
  program_level VARCHAR(20) NOT NULL
    CHECK (program_level IN ('primary', 'secondary', 'higher_secondary', 'diploma', 'undergraduate', 'postgraduate', 'doctorate', 'certificate', 'bootcamp')),
  duration_months INTEGER CHECK (duration_months IS NULL OR duration_months > 0),
  total_credits NUMERIC(8,2) CHECK (total_credits IS NULL OR total_credits >= 0),
  delivery_mode VARCHAR(20) NOT NULL DEFAULT 'offline'
    CHECK (delivery_mode IN ('offline', 'online', 'hybrid')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, program_name)
);

-- SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  subject_name VARCHAR(150) NOT NULL,
  subject_code VARCHAR(30),
  subject_area VARCHAR(80),
  difficulty_level VARCHAR(20)
    CHECK (difficulty_level IS NULL OR difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, subject_name)
);

-- COURSES
CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  subject_id BIGINT REFERENCES subjects(id) ON DELETE SET NULL,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  course_title VARCHAR(200) NOT NULL,
  course_code VARCHAR(40),
  course_type VARCHAR(20) NOT NULL
    CHECK (course_type IN ('core', 'elective', 'lab', 'project', 'seminar', 'workshop')),
  credit_value NUMERIC(6,2) NOT NULL DEFAULT 0 CHECK (credit_value >= 0),
  max_marks NUMERIC(8,2) CHECK (max_marks IS NULL OR max_marks >= 0),
  passing_marks NUMERIC(8,2) CHECK (passing_marks IS NULL OR passing_marks >= 0),
  language_of_instruction VARCHAR(30),
  is_mandatory BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, course_title, course_code)
);

-- COURSE PREREQUISITES
CREATE TABLE IF NOT EXISTS course_prerequisites (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  prerequisite_course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  prerequisite_type VARCHAR(20) NOT NULL DEFAULT 'required'
    CHECK (prerequisite_type IN ('required', 'recommended', 'co_requisite')),
  minimum_grade_letter VARCHAR(5),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (course_id <> prerequisite_course_id),
  UNIQUE(course_id, prerequisite_course_id)
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  campus_id BIGINT REFERENCES campuses(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone VARCHAR(20),
  user_role VARCHAR(20) NOT NULL
    CHECK (user_role IN ('student', 'teacher', 'admin', 'guardian', 'staff')),
  gender VARCHAR(20),
  date_of_birth DATE,
  country VARCHAR(80),
  preferred_language VARCHAR(20),
  joined_at DATE,
  login_provider VARCHAR(30),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  last_seen_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, email)
);

-- STUDENT PROFILES
CREATE TABLE IF NOT EXISTS student_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  campus_id BIGINT REFERENCES campuses(id) ON DELETE SET NULL,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  admission_number VARCHAR(40) NOT NULL UNIQUE,
  admission_date DATE,
  current_year_no INTEGER CHECK (current_year_no IS NULL OR current_year_no > 0),
  current_semester_no INTEGER CHECK (current_semester_no IS NULL OR current_semester_no > 0),
  enrollment_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (enrollment_status IN ('applied', 'admitted', 'active', 'graduated', 'dropped', 'suspended', 'alumni')),
  scholarship_status VARCHAR(20)
    CHECK (scholarship_status IS NULL OR scholarship_status IN ('none', 'applied', 'approved', 'rejected')),
  hostel_required BOOLEAN NOT NULL DEFAULT false,
  transport_required BOOLEAN NOT NULL DEFAULT false,
  cgpa NUMERIC(4,2) CHECK (cgpa IS NULL OR (cgpa >= 0 AND cgpa <= 10)),
  attendance_percentage NUMERIC(5,2) CHECK (attendance_percentage IS NULL OR (attendance_percentage >= 0 AND attendance_percentage <= 100)),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- GUARDIAN RELATIONSHIPS
CREATE TABLE IF NOT EXISTS guardian_relationships (
  id BIGSERIAL PRIMARY KEY,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  guardian_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relationship_type VARCHAR(20) NOT NULL
    CHECK (relationship_type IN ('father', 'mother', 'brother', 'sister', 'uncle', 'aunt', 'guardian', 'other')),
  is_primary BOOLEAN NOT NULL DEFAULT false,
  emergency_contact BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (student_user_id <> guardian_user_id),
  UNIQUE(student_user_id, guardian_user_id)
);

-- TEACHER PROFILES
CREATE TABLE IF NOT EXISTS teacher_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  campus_id BIGINT REFERENCES campuses(id) ON DELETE SET NULL,
  department_id BIGINT REFERENCES departments(id) ON DELETE SET NULL,
  employee_code VARCHAR(40) NOT NULL UNIQUE,
  designation VARCHAR(80),
  employment_type VARCHAR(20) NOT NULL DEFAULT 'full_time'
    CHECK (employment_type IN ('full_time', 'part_time', 'visiting', 'contract')),
  hire_date DATE,
  salary_monthly NUMERIC(12,2) CHECK (salary_monthly IS NULL OR salary_monthly >= 0),
  highest_qualification VARCHAR(100),
  experience_years NUMERIC(5,2) CHECK (experience_years IS NULL OR experience_years >= 0),
  rating_score NUMERIC(4,2) CHECK (rating_score IS NULL OR (rating_score >= 0 AND rating_score <= 5)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CLASSROOMS
CREATE TABLE IF NOT EXISTS classrooms (
  id BIGSERIAL PRIMARY KEY,
  campus_id BIGINT NOT NULL REFERENCES campuses(id) ON DELETE CASCADE,
  room_name VARCHAR(80) NOT NULL,
  building_name VARCHAR(80),
  floor_no INTEGER,
  room_type VARCHAR(20) NOT NULL
    CHECK (room_type IN ('classroom', 'lab', 'seminar_hall', 'exam_hall', 'studio')),
  seating_capacity INTEGER NOT NULL CHECK (seating_capacity > 0),
  has_projector BOOLEAN NOT NULL DEFAULT false,
  has_lab_equipment BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(campus_id, room_name)
);

-- COURSE OFFERINGS
CREATE TABLE IF NOT EXISTS course_offerings (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  term_id BIGINT NOT NULL REFERENCES academic_terms(id) ON DELETE CASCADE,
  campus_id BIGINT REFERENCES campuses(id) ON DELETE SET NULL,
  primary_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  section_name VARCHAR(30) NOT NULL,
  delivery_mode VARCHAR(20) NOT NULL DEFAULT 'offline'
    CHECK (delivery_mode IN ('offline', 'online', 'hybrid')),
  seat_limit INTEGER CHECK (seat_limit IS NULL OR seat_limit >= 0),
  enrolled_count INTEGER NOT NULL DEFAULT 0 CHECK (enrolled_count >= 0),
  waitlist_count INTEGER NOT NULL DEFAULT 0 CHECK (waitlist_count >= 0),
  starts_on DATE,
  ends_on DATE,
  course_status VARCHAR(20) NOT NULL DEFAULT 'scheduled'
    CHECK (course_status IN ('scheduled', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_on IS NULL OR starts_on IS NULL OR ends_on >= starts_on),
  UNIQUE(course_id, term_id, section_name)
);

-- COURSE TEACHERS
CREATE TABLE IF NOT EXISTS course_teachers (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  teacher_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_role VARCHAR(20) NOT NULL DEFAULT 'instructor'
    CHECK (teacher_role IN ('instructor', 'assistant', 'co_instructor', 'grader')),
  assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(offering_id, teacher_user_id)
);

-- TIMETABLE SLOTS
CREATE TABLE IF NOT EXISTS timetable_slots (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  classroom_id BIGINT REFERENCES classrooms(id) ON DELETE SET NULL,
  weekday_no INTEGER NOT NULL CHECK (weekday_no BETWEEN 1 AND 7),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_type VARCHAR(20) NOT NULL DEFAULT 'lecture'
    CHECK (slot_type IN ('lecture', 'lab', 'tutorial', 'exam', 'office_hour')),
  recurrence_pattern VARCHAR(30) DEFAULT 'weekly',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (end_time > start_time)
);

-- ENROLLMENTS
CREATE TABLE IF NOT EXISTS enrollments (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP NOT NULL DEFAULT NOW(),
  enrollment_status VARCHAR(20) NOT NULL DEFAULT 'enrolled'
    CHECK (enrollment_status IN ('requested', 'enrolled', 'waitlisted', 'dropped', 'completed', 'failed', 'withdrawn')),
  enrolled_via VARCHAR(20)
    CHECK (enrolled_via IS NULL OR enrolled_via IN ('self', 'admin', 'bulk_import', 'advisor')),
  final_grade_letter VARCHAR(5),
  final_score NUMERIC(8,2) CHECK (final_score IS NULL OR final_score >= 0),
  attendance_percentage NUMERIC(5,2) CHECK (attendance_percentage IS NULL OR (attendance_percentage >= 0 AND attendance_percentage <= 100)),
  credits_earned NUMERIC(6,2) CHECK (credits_earned IS NULL OR credits_earned >= 0),
  completion_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(offering_id, student_user_id)
);

-- ATTENDANCE SESSIONS
CREATE TABLE IF NOT EXISTS attendance_sessions (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  timetable_slot_id BIGINT REFERENCES timetable_slots(id) ON DELETE SET NULL,
  session_date DATE NOT NULL,
  session_topic VARCHAR(200),
  session_type VARCHAR(20) NOT NULL DEFAULT 'lecture'
    CHECK (session_type IN ('lecture', 'lab', 'tutorial', 'exam_review', 'extra_class')),
  marked_by_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(offering_id, session_date, timetable_slot_id)
);

-- ATTENDANCE RECORDS
CREATE TABLE IF NOT EXISTS attendance_records (
  id BIGSERIAL PRIMARY KEY,
  attendance_session_id BIGINT NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  attendance_status VARCHAR(20) NOT NULL
    CHECK (attendance_status IN ('present', 'absent', 'late', 'excused')),
  marked_at TIMESTAMP NOT NULL DEFAULT NOW(),
  remarks TEXT,
  UNIQUE(attendance_session_id, student_user_id)
);

-- ASSIGNMENTS
CREATE TABLE IF NOT EXISTS assignments (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  created_by_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  assignment_title VARCHAR(200) NOT NULL,
  assignment_type VARCHAR(20) NOT NULL
    CHECK (assignment_type IN ('homework', 'project', 'quiz', 'lab', 'presentation', 'essay')),
  total_marks NUMERIC(8,2) NOT NULL CHECK (total_marks >= 0),
  weightage_percent NUMERIC(5,2) CHECK (weightage_percent IS NULL OR (weightage_percent >= 0 AND weightage_percent <= 100)),
  assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  due_at TIMESTAMP NOT NULL,
  allow_late_submission BOOLEAN NOT NULL DEFAULT false,
  max_late_days INTEGER CHECK (max_late_days IS NULL OR max_late_days >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (due_at >= assigned_at)
);

-- ASSIGNMENT SUBMISSIONS
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id BIGSERIAL PRIMARY KEY,
  assignment_id BIGINT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submitted_at TIMESTAMP NULL,
  submission_status VARCHAR(20) NOT NULL DEFAULT 'not_submitted'
    CHECK (submission_status IN ('not_submitted', 'submitted', 'late_submitted', 'graded', 'missing')),
  obtained_marks NUMERIC(8,2) CHECK (obtained_marks IS NULL OR obtained_marks >= 0),
  plagiarism_score NUMERIC(5,2) CHECK (plagiarism_score IS NULL OR (plagiarism_score >= 0 AND plagiarism_score <= 100)),
  grader_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  feedback_text TEXT,
  attempt_number INTEGER NOT NULL DEFAULT 1 CHECK (attempt_number > 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(assignment_id, student_user_id, attempt_number)
);

-- EXAMS
CREATE TABLE IF NOT EXISTS exams (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  term_id BIGINT REFERENCES academic_terms(id) ON DELETE SET NULL,
  offering_id BIGINT REFERENCES course_offerings(id) ON DELETE CASCADE,
  exam_name VARCHAR(150) NOT NULL,
  exam_type VARCHAR(20) NOT NULL
    CHECK (exam_type IN ('unit_test', 'midterm', 'final', 'practical', 'oral', 'entrance', 'mock')),
  exam_date DATE NOT NULL,
  start_time TIME NULL,
  end_time TIME NULL,
  total_marks NUMERIC(8,2) NOT NULL CHECK (total_marks >= 0),
  passing_marks NUMERIC(8,2) CHECK (passing_marks IS NULL OR passing_marks >= 0),
  classroom_id BIGINT REFERENCES classrooms(id) ON DELETE SET NULL,
  invigilator_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (end_time IS NULL OR start_time IS NULL OR end_time > start_time)
);

-- EXAM RESULTS
CREATE TABLE IF NOT EXISTS exam_results (
  id BIGSERIAL PRIMARY KEY,
  exam_id BIGINT NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  obtained_marks NUMERIC(8,2) CHECK (obtained_marks IS NULL OR obtained_marks >= 0),
  grade_letter VARCHAR(5),
  rank_in_exam INTEGER CHECK (rank_in_exam IS NULL OR rank_in_exam > 0),
  result_status VARCHAR(20) NOT NULL DEFAULT 'published'
    CHECK (result_status IN ('draft', 'published', 'withheld', 'recheck_requested', 'updated')),
  evaluated_by_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(exam_id, student_user_id)
);

-- LEARNING MATERIALS
CREATE TABLE IF NOT EXISTS learning_materials (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  uploaded_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  material_title VARCHAR(200) NOT NULL,
  material_type VARCHAR(20) NOT NULL
    CHECK (material_type IN ('pdf', 'video', 'slide', 'link', 'note', 'dataset', 'code')),
  file_url TEXT,
  file_size_mb NUMERIC(10,2) CHECK (file_size_mb IS NULL OR file_size_mb >= 0),
  visibility_scope VARCHAR(20) NOT NULL DEFAULT 'enrolled_students'
    CHECK (visibility_scope IN ('public', 'institution', 'enrolled_students', 'teachers_only')),
  uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MATERIAL VIEWS
CREATE TABLE IF NOT EXISTS material_views (
  id BIGSERIAL PRIMARY KEY,
  material_id BIGINT NOT NULL REFERENCES learning_materials(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_viewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_viewed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  total_view_seconds INTEGER NOT NULL DEFAULT 0 CHECK (total_view_seconds >= 0),
  progress_percent NUMERIC(5,2) CHECK (progress_percent IS NULL OR (progress_percent >= 0 AND progress_percent <= 100)),
  completed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(material_id, user_id)
);

-- DISCUSSION THREADS
CREATE TABLE IF NOT EXISTS discussion_threads (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  created_by_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  thread_title VARCHAR(200) NOT NULL,
  thread_type VARCHAR(20) NOT NULL DEFAULT 'general'
    CHECK (thread_type IN ('general', 'question', 'announcement', 'doubt', 'resource')),
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- DISCUSSION POSTS
CREATE TABLE IF NOT EXISTS discussion_posts (
  id BIGSERIAL PRIMARY KEY,
  thread_id BIGINT NOT NULL REFERENCES discussion_threads(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_post_id BIGINT REFERENCES discussion_posts(id) ON DELETE CASCADE,
  post_body TEXT NOT NULL,
  is_answer BOOLEAN NOT NULL DEFAULT false,
  upvote_count INTEGER NOT NULL DEFAULT 0 CHECK (upvote_count >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- STUDENT FEEDBACK
CREATE TABLE IF NOT EXISTS student_feedback (
  id BIGSERIAL PRIMARY KEY,
  offering_id BIGINT NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  feedback_category VARCHAR(20) NOT NULL
    CHECK (feedback_category IN ('teaching', 'content', 'difficulty', 'infrastructure', 'support')),
  rating_value INTEGER NOT NULL CHECK (rating_value BETWEEN 1 AND 5),
  feedback_text TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(offering_id, student_user_id, feedback_category)
);

-- FEE PLANS
CREATE TABLE IF NOT EXISTS fee_plans (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  program_id BIGINT REFERENCES programs(id) ON DELETE SET NULL,
  plan_name VARCHAR(120) NOT NULL,
  fee_category VARCHAR(20) NOT NULL
    CHECK (fee_category IN ('tuition', 'exam', 'lab', 'hostel', 'transport', 'admission', 'misc')),
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  billing_cycle VARCHAR(20) NOT NULL
    CHECK (billing_cycle IN ('one_time', 'monthly', 'quarterly', 'semester', 'yearly')),
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  is_refundable BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(institution_id, plan_name, fee_category)
);

-- STUDENT FEE ASSIGNMENTS
CREATE TABLE IF NOT EXISTS student_fee_assignments (
  id BIGSERIAL PRIMARY KEY,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fee_plan_id BIGINT NOT NULL REFERENCES fee_plans(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  effective_from DATE,
  effective_to DATE,
  assigned_amount NUMERIC(12,2) NOT NULL CHECK (assigned_amount >= 0),
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  scholarship_id BIGINT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (effective_to IS NULL OR effective_from IS NULL OR effective_to >= effective_from),
  UNIQUE(student_user_id, fee_plan_id, effective_from)
);

-- SCHOLARSHIPS
CREATE TABLE IF NOT EXISTS scholarships (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  scholarship_name VARCHAR(150) NOT NULL,
  scholarship_type VARCHAR(20) NOT NULL
    CHECK (scholarship_type IN ('merit', 'need_based', 'sports', 'minority', 'staff_child', 'other')),
  amount_type VARCHAR(10) NOT NULL
    CHECK (amount_type IN ('fixed', 'percent')),
  amount_value NUMERIC(10,2) NOT NULL CHECK (amount_value >= 0),
  max_awards INTEGER CHECK (max_awards IS NULL OR max_awards >= 0),
  starts_on DATE,
  ends_on DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ends_on IS NULL OR starts_on IS NULL OR ends_on >= starts_on)
);

-- FEE INVOICES
CREATE TABLE IF NOT EXISTS fee_invoices (
  id BIGSERIAL PRIMARY KEY,
  student_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  fee_assignment_id BIGINT REFERENCES student_fee_assignments(id) ON DELETE SET NULL,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  invoice_status VARCHAR(20) NOT NULL
    CHECK (invoice_status IN ('draft', 'open', 'paid', 'partial', 'overdue', 'void', 'refunded')),
  subtotal_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (subtotal_amount >= 0),
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  due_date DATE,
  issued_at TIMESTAMP NOT NULL,
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (paid_at IS NULL OR paid_at >= issued_at)
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  invoice_id BIGINT NOT NULL REFERENCES fee_invoices(id) ON DELETE CASCADE,
  payment_method VARCHAR(20) NOT NULL
    CHECK (payment_method IN ('cash', 'card', 'upi', 'bank_transfer', 'wallet', 'cheque')),
  payment_status VARCHAR(20) NOT NULL
    CHECK (payment_status IN ('pending', 'successful', 'failed', 'refunded', 'partial_refund')),
  transaction_ref VARCHAR(80) UNIQUE,
  paid_amount NUMERIC(12,2) NOT NULL CHECK (paid_amount >= 0),
  refund_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (refund_amount >= 0),
  paid_at TIMESTAMP NULL,
  failure_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- APP EVENTS
CREATE TABLE IF NOT EXISTS app_events (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  event_name VARCHAR(60) NOT NULL,
  event_category VARCHAR(30)
    CHECK (event_category IS NULL OR event_category IN ('auth', 'learning', 'attendance', 'assignment', 'exam', 'billing', 'communication')),
  entity_type VARCHAR(30),
  entity_id BIGINT,
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGSERIAL PRIMARY KEY,
  institution_id BIGINT NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  offering_id BIGINT REFERENCES course_offerings(id) ON DELETE SET NULL,
  issue_type VARCHAR(30) NOT NULL
    CHECK (issue_type IN ('login', 'enrollment', 'attendance', 'assignment', 'exam', 'payment', 'certificate', 'content', 'other')),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  ticket_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (ticket_status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  resolution_time_mins INTEGER CHECK (resolution_time_mins IS NULL OR resolution_time_mins >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

-- ======================
-- FOREIGN KEY PATCHES
-- ======================

ALTER TABLE departments
  DROP CONSTRAINT IF EXISTS departments_head_user_id_fkey,
  ADD CONSTRAINT departments_head_user_id_fkey
  FOREIGN KEY (head_user_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE student_fee_assignments
  DROP CONSTRAINT IF EXISTS student_fee_assignments_scholarship_id_fkey,
  ADD CONSTRAINT student_fee_assignments_scholarship_id_fkey
  FOREIGN KEY (scholarship_id) REFERENCES scholarships(id) ON DELETE SET NULL;

-- ======================
-- INDEXES
-- ======================

CREATE INDEX IF NOT EXISTS idx_education_institutions_type ON institutions(institution_type);
CREATE INDEX IF NOT EXISTS idx_education_institutions_country ON institutions(country);
CREATE INDEX IF NOT EXISTS idx_education_institutions_city ON institutions(city);
CREATE INDEX IF NOT EXISTS idx_education_institutions_active ON institutions(is_active);
CREATE INDEX IF NOT EXISTS idx_education_institutions_created_at ON institutions(created_at);

CREATE INDEX IF NOT EXISTS idx_education_campuses_institution ON campuses(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_campuses_city ON campuses(city);
CREATE INDEX IF NOT EXISTS idx_education_campuses_main ON campuses(is_main_campus);
CREATE INDEX IF NOT EXISTS idx_education_campuses_active ON campuses(is_active);

CREATE INDEX IF NOT EXISTS idx_education_terms_institution ON academic_terms(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_terms_year ON academic_terms(academic_year);
CREATE INDEX IF NOT EXISTS idx_education_terms_type ON academic_terms(term_type);
CREATE INDEX IF NOT EXISTS idx_education_terms_status ON academic_terms(status);
CREATE INDEX IF NOT EXISTS idx_education_terms_starts_on ON academic_terms(starts_on);
CREATE INDEX IF NOT EXISTS idx_education_terms_ends_on ON academic_terms(ends_on);

CREATE INDEX IF NOT EXISTS idx_education_departments_institution ON departments(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_departments_campus ON departments(campus_id);
CREATE INDEX IF NOT EXISTS idx_education_departments_type ON departments(department_type);
CREATE INDEX IF NOT EXISTS idx_education_departments_head ON departments(head_user_id);
CREATE INDEX IF NOT EXISTS idx_education_departments_active ON departments(is_active);

CREATE INDEX IF NOT EXISTS idx_education_programs_institution ON programs(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_programs_department ON programs(department_id);
CREATE INDEX IF NOT EXISTS idx_education_programs_level ON programs(program_level);
CREATE INDEX IF NOT EXISTS idx_education_programs_mode ON programs(delivery_mode);
CREATE INDEX IF NOT EXISTS idx_education_programs_active ON programs(is_active);

CREATE INDEX IF NOT EXISTS idx_education_subjects_institution ON subjects(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_subjects_department ON subjects(department_id);
CREATE INDEX IF NOT EXISTS idx_education_subjects_area ON subjects(subject_area);
CREATE INDEX IF NOT EXISTS idx_education_subjects_difficulty ON subjects(difficulty_level);

CREATE INDEX IF NOT EXISTS idx_education_courses_institution ON courses(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_courses_department ON courses(department_id);
CREATE INDEX IF NOT EXISTS idx_education_courses_subject ON courses(subject_id);
CREATE INDEX IF NOT EXISTS idx_education_courses_program ON courses(program_id);
CREATE INDEX IF NOT EXISTS idx_education_courses_type ON courses(course_type);
CREATE INDEX IF NOT EXISTS idx_education_courses_mandatory ON courses(is_mandatory);
CREATE INDEX IF NOT EXISTS idx_education_courses_active ON courses(is_active);

CREATE INDEX IF NOT EXISTS idx_education_course_prereq_course ON course_prerequisites(course_id);
CREATE INDEX IF NOT EXISTS idx_education_course_prereq_required ON course_prerequisites(prerequisite_course_id);
CREATE INDEX IF NOT EXISTS idx_education_course_prereq_type ON course_prerequisites(prerequisite_type);

CREATE INDEX IF NOT EXISTS idx_education_users_institution ON users(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_users_campus ON users(campus_id);
CREATE INDEX IF NOT EXISTS idx_education_users_role ON users(user_role);
CREATE INDEX IF NOT EXISTS idx_education_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_education_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_education_users_verified ON users(is_verified);
CREATE INDEX IF NOT EXISTS idx_education_users_last_seen_at ON users(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_education_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_education_student_profiles_user ON student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_education_student_profiles_institution ON student_profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_student_profiles_campus ON student_profiles(campus_id);
CREATE INDEX IF NOT EXISTS idx_education_student_profiles_program ON student_profiles(program_id);
CREATE INDEX IF NOT EXISTS idx_education_student_profiles_status ON student_profiles(enrollment_status);
CREATE INDEX IF NOT EXISTS idx_education_student_profiles_admission_date ON student_profiles(admission_date);
CREATE INDEX IF NOT EXISTS idx_education_student_profiles_cgpa ON student_profiles(cgpa);

CREATE INDEX IF NOT EXISTS idx_education_guardian_student ON guardian_relationships(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_guardian_guardian ON guardian_relationships(guardian_user_id);
CREATE INDEX IF NOT EXISTS idx_education_guardian_primary ON guardian_relationships(is_primary);
CREATE INDEX IF NOT EXISTS idx_education_guardian_emergency ON guardian_relationships(emergency_contact);

CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_user ON teacher_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_institution ON teacher_profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_campus ON teacher_profiles(campus_id);
CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_department ON teacher_profiles(department_id);
CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_employment_type ON teacher_profiles(employment_type);
CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_hire_date ON teacher_profiles(hire_date);
CREATE INDEX IF NOT EXISTS idx_education_teacher_profiles_rating ON teacher_profiles(rating_score);

CREATE INDEX IF NOT EXISTS idx_education_classrooms_campus ON classrooms(campus_id);
CREATE INDEX IF NOT EXISTS idx_education_classrooms_type ON classrooms(room_type);
CREATE INDEX IF NOT EXISTS idx_education_classrooms_capacity ON classrooms(seating_capacity);
CREATE INDEX IF NOT EXISTS idx_education_classrooms_active ON classrooms(is_active);

CREATE INDEX IF NOT EXISTS idx_education_course_offerings_course ON course_offerings(course_id);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_term ON course_offerings(term_id);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_campus ON course_offerings(campus_id);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_teacher ON course_offerings(primary_teacher_id);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_mode ON course_offerings(delivery_mode);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_status ON course_offerings(course_status);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_starts_on ON course_offerings(starts_on);
CREATE INDEX IF NOT EXISTS idx_education_course_offerings_ends_on ON course_offerings(ends_on);

CREATE INDEX IF NOT EXISTS idx_education_course_teachers_offering ON course_teachers(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_course_teachers_teacher ON course_teachers(teacher_user_id);
CREATE INDEX IF NOT EXISTS idx_education_course_teachers_role ON course_teachers(teacher_role);

CREATE INDEX IF NOT EXISTS idx_education_timetable_offering ON timetable_slots(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_timetable_classroom ON timetable_slots(classroom_id);
CREATE INDEX IF NOT EXISTS idx_education_timetable_weekday ON timetable_slots(weekday_no);
CREATE INDEX IF NOT EXISTS idx_education_timetable_start_time ON timetable_slots(start_time);
CREATE INDEX IF NOT EXISTS idx_education_timetable_end_time ON timetable_slots(end_time);
CREATE INDEX IF NOT EXISTS idx_education_timetable_slot_type ON timetable_slots(slot_type);

CREATE INDEX IF NOT EXISTS idx_education_enrollments_offering ON enrollments(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_enrollments_student ON enrollments(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_enrollments_status ON enrollments(enrollment_status);
CREATE INDEX IF NOT EXISTS idx_education_enrollments_enrolled_at ON enrollments(enrolled_at);
CREATE INDEX IF NOT EXISTS idx_education_enrollments_final_score ON enrollments(final_score);
CREATE INDEX IF NOT EXISTS idx_education_enrollments_completion_date ON enrollments(completion_date);

CREATE INDEX IF NOT EXISTS idx_education_attendance_sessions_offering ON attendance_sessions(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_attendance_sessions_slot ON attendance_sessions(timetable_slot_id);
CREATE INDEX IF NOT EXISTS idx_education_attendance_sessions_date ON attendance_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_education_attendance_sessions_marked_by ON attendance_sessions(marked_by_teacher_id);

CREATE INDEX IF NOT EXISTS idx_education_attendance_records_session ON attendance_records(attendance_session_id);
CREATE INDEX IF NOT EXISTS idx_education_attendance_records_student ON attendance_records(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_attendance_records_status ON attendance_records(attendance_status);
CREATE INDEX IF NOT EXISTS idx_education_attendance_records_marked_at ON attendance_records(marked_at);

CREATE INDEX IF NOT EXISTS idx_education_assignments_offering ON assignments(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_assignments_teacher ON assignments(created_by_teacher_id);
CREATE INDEX IF NOT EXISTS idx_education_assignments_type ON assignments(assignment_type);
CREATE INDEX IF NOT EXISTS idx_education_assignments_due_at ON assignments(due_at);
CREATE INDEX IF NOT EXISTS idx_education_assignments_assigned_at ON assignments(assigned_at);

CREATE INDEX IF NOT EXISTS idx_education_assignment_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_education_assignment_submissions_student ON assignment_submissions(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_assignment_submissions_status ON assignment_submissions(submission_status);
CREATE INDEX IF NOT EXISTS idx_education_assignment_submissions_submitted_at ON assignment_submissions(submitted_at);
CREATE INDEX IF NOT EXISTS idx_education_assignment_submissions_grader ON assignment_submissions(grader_teacher_id);
CREATE INDEX IF NOT EXISTS idx_education_assignment_submissions_plagiarism ON assignment_submissions(plagiarism_score);

CREATE INDEX IF NOT EXISTS idx_education_exams_institution ON exams(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_exams_term ON exams(term_id);
CREATE INDEX IF NOT EXISTS idx_education_exams_offering ON exams(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_exams_type ON exams(exam_type);
CREATE INDEX IF NOT EXISTS idx_education_exams_date ON exams(exam_date);
CREATE INDEX IF NOT EXISTS idx_education_exams_classroom ON exams(classroom_id);
CREATE INDEX IF NOT EXISTS idx_education_exams_invigilator ON exams(invigilator_teacher_id);

CREATE INDEX IF NOT EXISTS idx_education_exam_results_exam ON exam_results(exam_id);
CREATE INDEX IF NOT EXISTS idx_education_exam_results_student ON exam_results(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_exam_results_rank ON exam_results(rank_in_exam);
CREATE INDEX IF NOT EXISTS idx_education_exam_results_status ON exam_results(result_status);
CREATE INDEX IF NOT EXISTS idx_education_exam_results_published_at ON exam_results(published_at);
CREATE INDEX IF NOT EXISTS idx_education_exam_results_evaluator ON exam_results(evaluated_by_teacher_id);

CREATE INDEX IF NOT EXISTS idx_education_learning_materials_offering ON learning_materials(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_learning_materials_uploaded_by ON learning_materials(uploaded_by_user_id);
CREATE INDEX IF NOT EXISTS idx_education_learning_materials_type ON learning_materials(material_type);
CREATE INDEX IF NOT EXISTS idx_education_learning_materials_visibility ON learning_materials(visibility_scope);
CREATE INDEX IF NOT EXISTS idx_education_learning_materials_uploaded_at ON learning_materials(uploaded_at);

CREATE INDEX IF NOT EXISTS idx_education_material_views_material ON material_views(material_id);
CREATE INDEX IF NOT EXISTS idx_education_material_views_user ON material_views(user_id);
CREATE INDEX IF NOT EXISTS idx_education_material_views_last_viewed ON material_views(last_viewed_at);
CREATE INDEX IF NOT EXISTS idx_education_material_views_completed ON material_views(completed);

CREATE INDEX IF NOT EXISTS idx_education_discussion_threads_offering ON discussion_threads(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_discussion_threads_creator ON discussion_threads(created_by_user_id);
CREATE INDEX IF NOT EXISTS idx_education_discussion_threads_type ON discussion_threads(thread_type);
CREATE INDEX IF NOT EXISTS idx_education_discussion_threads_pinned ON discussion_threads(is_pinned);
CREATE INDEX IF NOT EXISTS idx_education_discussion_threads_created_at ON discussion_threads(created_at);

CREATE INDEX IF NOT EXISTS idx_education_discussion_posts_thread ON discussion_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_education_discussion_posts_user ON discussion_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_education_discussion_posts_parent ON discussion_posts(parent_post_id);
CREATE INDEX IF NOT EXISTS idx_education_discussion_posts_answer ON discussion_posts(is_answer);
CREATE INDEX IF NOT EXISTS idx_education_discussion_posts_created_at ON discussion_posts(created_at);

CREATE INDEX IF NOT EXISTS idx_education_feedback_offering ON student_feedback(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_feedback_student ON student_feedback(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_feedback_teacher ON student_feedback(teacher_user_id);
CREATE INDEX IF NOT EXISTS idx_education_feedback_category ON student_feedback(feedback_category);
CREATE INDEX IF NOT EXISTS idx_education_feedback_rating ON student_feedback(rating_value);
CREATE INDEX IF NOT EXISTS idx_education_feedback_submitted_at ON student_feedback(submitted_at);

CREATE INDEX IF NOT EXISTS idx_education_fee_plans_institution ON fee_plans(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_plans_program ON fee_plans(program_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_plans_category ON fee_plans(fee_category);
CREATE INDEX IF NOT EXISTS idx_education_fee_plans_cycle ON fee_plans(billing_cycle);
CREATE INDEX IF NOT EXISTS idx_education_fee_plans_active ON fee_plans(is_active);

CREATE INDEX IF NOT EXISTS idx_education_fee_assignments_student ON student_fee_assignments(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_assignments_plan ON student_fee_assignments(fee_plan_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_assignments_scholarship ON student_fee_assignments(scholarship_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_assignments_assigned_at ON student_fee_assignments(assigned_at);
CREATE INDEX IF NOT EXISTS idx_education_fee_assignments_effective_from ON student_fee_assignments(effective_from);

CREATE INDEX IF NOT EXISTS idx_education_scholarships_institution ON scholarships(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_scholarships_type ON scholarships(scholarship_type);
CREATE INDEX IF NOT EXISTS idx_education_scholarships_active ON scholarships(is_active);
CREATE INDEX IF NOT EXISTS idx_education_scholarships_starts_on ON scholarships(starts_on);
CREATE INDEX IF NOT EXISTS idx_education_scholarships_ends_on ON scholarships(ends_on);

CREATE INDEX IF NOT EXISTS idx_education_fee_invoices_student ON fee_invoices(student_user_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_invoices_assignment ON fee_invoices(fee_assignment_id);
CREATE INDEX IF NOT EXISTS idx_education_fee_invoices_status ON fee_invoices(invoice_status);
CREATE INDEX IF NOT EXISTS idx_education_fee_invoices_due_date ON fee_invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_education_fee_invoices_issued_at ON fee_invoices(issued_at);
CREATE INDEX IF NOT EXISTS idx_education_fee_invoices_paid_at ON fee_invoices(paid_at);

CREATE INDEX IF NOT EXISTS idx_education_payments_invoice ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_education_payments_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_education_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_education_payments_paid_at ON payments(paid_at);

CREATE INDEX IF NOT EXISTS idx_education_app_events_institution ON app_events(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_app_events_user ON app_events(user_id);
CREATE INDEX IF NOT EXISTS idx_education_app_events_name ON app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_education_app_events_category ON app_events(event_category);
CREATE INDEX IF NOT EXISTS idx_education_app_events_entity_type ON app_events(entity_type);
CREATE INDEX IF NOT EXISTS idx_education_app_events_time ON app_events(event_time);

CREATE INDEX IF NOT EXISTS idx_education_support_tickets_institution ON support_tickets(institution_id);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_offering ON support_tickets(offering_id);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_issue_type ON support_tickets(issue_type);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_status ON support_tickets(ticket_status);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_assigned_to ON support_tickets(assigned_to_user_id);
CREATE INDEX IF NOT EXISTS idx_education_support_tickets_created_at ON support_tickets(created_at);
