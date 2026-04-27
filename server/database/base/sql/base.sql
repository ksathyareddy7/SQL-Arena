-- ===================
-- APPS (central entity)
-- ===================
CREATE TABLE apps (
  -- Stable, app-defined numeric identifier.
  app_id INTEGER PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);
-- ===================
-- USERS
-- ===================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
-- ===================
-- LESSONS (Learn / LMS)
-- ===================
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(20) NOT NULL DEFAULT 'beginner',
  lesson_order INTEGER NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}'::text[],
  estimated_minutes INTEGER,
  content_md TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT chk_lessons_level CHECK (level IN ('beginner', 'intermediate', 'advanced'))
);

CREATE INDEX idx_lessons_order ON lessons(lesson_order);
CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_lessons_tags ON lessons USING GIN(tags);

-- ===================
-- USER LESSON PROGRESS
-- ===================
CREATE TABLE user_lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'not started',
  last_viewed_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  UNIQUE (user_id, lesson_id),
  CONSTRAINT chk_user_lesson_progress_status CHECK (
    status IN ('not started', 'in progress', 'completed')
  )
);

CREATE INDEX idx_user_lesson_progress_user ON user_lesson_progress(user_id);
CREATE INDEX idx_user_lesson_progress_lesson ON user_lesson_progress(lesson_id);

-- ===================
-- TRACKS (multi-track learning)
-- ===================
CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  audience_label VARCHAR(120),
  badge VARCHAR(60),
  is_recommended BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tracks_recommended ON tracks(is_recommended);

-- ===================
-- TRACK SECTIONS
-- ===================
CREATE TABLE track_sections (
  id SERIAL PRIMARY KEY,
  track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  section_order INTEGER NOT NULL,
  UNIQUE (track_id, section_order)
);

CREATE INDEX idx_track_sections_track_order ON track_sections(track_id, section_order);

-- ===================
-- TRACK LESSONS (ordered per track)
-- ===================
CREATE TABLE track_lessons (
  track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  section_id INTEGER REFERENCES track_sections(id) ON DELETE SET NULL,
  PRIMARY KEY (track_id, lesson_id),
  UNIQUE (track_id, position)
);

CREATE INDEX idx_track_lessons_track_pos ON track_lessons(track_id, position);
CREATE INDEX idx_track_lessons_lesson ON track_lessons(lesson_id);
-- ===================
-- QUESTIONS
-- ===================
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  code VARCHAR(30) UNIQUE NOT NULL,
  app_id INTEGER NOT NULL REFERENCES apps(app_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  expected_query TEXT NOT NULL,
  -- Expected solution columns
  solution_columns JSONB,
  -- e.g. ["count"], ["id","name","age"]
  tables JSONB,
  comparison_config JSONB DEFAULT '{}'::jsonb,
  -- Mock interview metadata (optional)
  interview_suitable BOOLEAN NOT NULL DEFAULT true,
  estimated_solve_minutes INTEGER,
  interview_tags TEXT[] NOT NULL DEFAULT '{}'::text[],
  interview_weight INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT chk_questions_difficulty CHECK (difficulty IN ('easy', 'medium', 'hard'))
);
-- Indexes
CREATE INDEX idx_questions_app_id ON questions(app_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_comparison_config ON questions USING GIN (comparison_config);
CREATE INDEX idx_questions_interview_suitable ON questions(interview_suitable);
CREATE INDEX idx_questions_interview_tags ON questions USING GIN (interview_tags);
-- ===================
-- HINTS
-- ===================
CREATE TABLE hints (
  id SERIAL PRIMARY KEY,
  question_code VARCHAR(30) NOT NULL REFERENCES questions(code) ON DELETE CASCADE,
  hint_order INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (question_code, hint_order)
);
CREATE INDEX idx_hints_question_code ON hints(question_code);
CREATE INDEX idx_hints_order ON hints(question_code, hint_order);
-- ===================
-- HINT USAGE
-- ===================
CREATE TABLE user_hint_usage (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_code VARCHAR(30) NOT NULL REFERENCES questions(code) ON DELETE CASCADE,
  hint_id INTEGER REFERENCES hints(id) ON DELETE CASCADE,
  used_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, hint_id)
);
CREATE INDEX idx_hint_usage_question ON user_hint_usage(question_code);
CREATE INDEX idx_hint_usage_user_question ON user_hint_usage(user_id, question_code);
-- ===================
-- SOLUTIONS UNLOCKS (per user)
-- ===================
CREATE TABLE user_solution_unlocks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, question_id)
);
CREATE INDEX idx_user_solution_unlocks_user_question ON user_solution_unlocks(user_id, question_id);
-- ===================
-- SOLUTIONS
-- ===================
CREATE TABLE solutions (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  approach_title VARCHAR(255),
  approach_type VARCHAR(50),
  explanation TEXT,
  query TEXT NOT NULL,
  is_optimal BOOLEAN DEFAULT false,
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (question_id, display_order)
);
-- ===================
-- USER PROGRESS
-- ===================
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'not started',
  attempts_count INTEGER DEFAULT 0,
  last_query TEXT,
  solved_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, question_id),
  CONSTRAINT chk_user_progress_status CHECK (status IN ('not started', 'attempted', 'solved'))
);
CREATE INDEX idx_user_progress_question_id ON user_progress(question_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
-- ===================
-- USER SUBMISSIONS
-- ===================
CREATE TABLE user_submissions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'not started',
  query TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT chk_user_submissions_status CHECK (status IN ('not started', 'attempted', 'solved'))
);
CREATE INDEX idx_user_submissions_user_id ON user_submissions(user_id);
CREATE INDEX idx_user_submissions_question_id ON user_submissions(question_id);
CREATE INDEX idx_user_submissions_user_created_at ON user_submissions (user_id, created_at);

-- ===================
-- MOCK INTERVIEW SESSIONS
-- ===================
CREATE TABLE mock_interview_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  template_snapshot JSONB NOT NULL,
  status TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  current_question_index INTEGER NOT NULL DEFAULT 0,
  total_score INTEGER NOT NULL DEFAULT 0,
  max_score INTEGER NOT NULL,
  total_hint_penalty INTEGER NOT NULL DEFAULT 0,
  question_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_mock_interview_sessions_status CHECK (
    status IN ('in_progress', 'completed', 'expired', 'abandoned')
  )
);

CREATE INDEX idx_mock_interview_sessions_user_status
  ON mock_interview_sessions(user_id, status);

-- Ensure at most one active (in_progress) session per user
CREATE UNIQUE INDEX uq_mock_interview_sessions_user_active
  ON mock_interview_sessions(user_id)
  WHERE status = 'in_progress';

-- ===================
-- MOCK INTERVIEW SESSION QUESTIONS
-- ===================
CREATE TABLE mock_interview_session_questions (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES mock_interview_sessions(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started',
  attempts_count INTEGER NOT NULL DEFAULT 0,
  hints_revealed_count INTEGER NOT NULL DEFAULT 0,
  hint_penalty_total INTEGER NOT NULL DEFAULT 0,
  base_score INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  last_query TEXT,
  final_query TEXT,
  is_correct BOOLEAN,
  started_at TIMESTAMPTZ,
  answered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_mock_interview_session_questions_status CHECK (
    status IN ('not_started', 'in_progress', 'correct', 'incorrect')
  ),
  UNIQUE (session_id, display_order),
  UNIQUE (session_id, question_id)
);

CREATE INDEX idx_mock_interview_session_questions_session_order
  ON mock_interview_session_questions(session_id, display_order);
CREATE INDEX idx_mock_interview_session_questions_question
  ON mock_interview_session_questions(question_id);

-- ===================
-- MOCK INTERVIEW HINT USAGE (per session question)
-- ===================
CREATE TABLE mock_interview_hint_usage (
  id SERIAL PRIMARY KEY,
  session_question_id INTEGER NOT NULL REFERENCES mock_interview_session_questions(id) ON DELETE CASCADE,
  hint_id INTEGER NOT NULL REFERENCES hints(id) ON DELETE CASCADE,
  revealed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_question_id, hint_id)
);

CREATE INDEX idx_mock_interview_hint_usage_session_question
  ON mock_interview_hint_usage(session_question_id);

-- ===================
-- BADGES
-- ===================
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  icon_key TEXT,
  criteria JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_badges_category_sort ON badges(category, sort_order);

-- ===================
-- USER BADGES
-- ===================
CREATE TABLE user_badges (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id INT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);
-- ===================
-- CONCEPTS
-- ===================
CREATE TABLE concepts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);
-- ===================
-- QUESTION CONCEPTS
-- ===================
CREATE TABLE question_concepts (
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  concept_id INTEGER REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, concept_id)
);
CREATE INDEX idx_question_concepts_concept ON question_concepts(concept_id);
-- ===================
-- TABLE SCHEMAS
-- ===================
CREATE TABLE table_schemas (
  id SERIAL PRIMARY KEY,
  app_id INTEGER NOT NULL REFERENCES apps(app_id) ON DELETE CASCADE,
  table_name VARCHAR NOT NULL,
  columns JSONB NOT NULL,
  description TEXT,
  UNIQUE (app_id, table_name)
);
-- ===================
-- TABLE RELATIONSHIPS
-- ===================
CREATE TABLE table_relationships (
  id SERIAL PRIMARY KEY,
  app_id INTEGER NOT NULL REFERENCES apps(app_id) ON DELETE CASCADE,
  from_table VARCHAR NOT NULL,
  from_column VARCHAR NOT NULL,
  to_table VARCHAR NOT NULL,
  to_column VARCHAR NOT NULL,
  UNIQUE (
    app_id,
    from_table,
    from_column,
    to_table,
    to_column
  )
);
CREATE INDEX idx_table_relationships_app_id ON table_relationships(app_id);
CREATE INDEX idx_table_relationships_tables ON table_relationships(app_id, from_table, to_table);

-- ===================
-- INSERT CONCEPTS
-- ===================
INSERT INTO concepts (name)
VALUES ('advanced_sql'),
  ('aggregation'),
  ('anti_join'),
  ('arithmetic'),
  ('average'),
  ('calculation'),
  ('case_when'),
  ('comparison'),
  ('conditional_aggregation'),
  ('conversion_metrics'),
  ('count'),
  ('count_distinct'),
  ('cte'),
  ('date_difference'),
  ('date_functions'),
  ('distinct'),
  ('exists'),
  ('filtering'),
  ('group_by'),
  ('having'),
  ('joins'),
  ('lag'),
  ('lag_lead'),
  ('lead'),
  ('left_join'),
  ('limit'),
  ('max'),
  ('min'),
  ('moving_average'),
  ('null_handling'),
  ('ordered_set_aggregate'),
  ('partition_by'),
  ('pattern_detection'),
  ('percentile'),
  ('performance'),
  ('postgres_specific'),
  ('ranking'),
  ('row_number'),
  ('running_max'),
  ('running_total'),
  ('self_join'),
  ('set_operations'),
  ('sorting'),
  ('string_functions'),
  ('subquery'),
  ('sum'),
  ('trend_analysis'),
  ('union'),
  ('window_functions')
ON CONFLICT (name) DO NOTHING;
