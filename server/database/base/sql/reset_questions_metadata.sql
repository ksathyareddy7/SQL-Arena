-- Generic reset for app-owned exercise metadata stored in base tables.
-- Deletes questions for the app_id; cascades delete hints/solutions/progress/etc.
--
-- Usage from psql:
--   \set ON_ERROR_STOP on
--   \set app_id 1
--   \i ../base/sql/reset_questions_metadata.sql

\set ON_ERROR_STOP on

-- Deleting questions cascades to:
-- - hints (question_code FK)
-- - solutions (question_id FK)
-- - question_concepts, user progress/submissions, unlocks, etc
-- - mock interview session questions (question_id FK)
DELETE FROM questions WHERE app_id = :app_id;

