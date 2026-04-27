# Solutions Evaluation Report (education)

**Summary:**
- Total Approaches: 299
- Passed: 299
- Failed: 0

## Detailed Results
### ✅ PASS : EDUCATION_001 - COUNT rows
```sql
SELECT COUNT(*) AS total_institutions FROM institutions;
```

### ✅ PASS : EDUCATION_001 - COUNT ids
```sql
SELECT COUNT(id) AS total_institutions FROM institutions;
```

### ✅ PASS : EDUCATION_001 - CTE count
```sql
WITH institution_count AS (
  SELECT COUNT(*) AS total_institutions
  FROM institutions
)
SELECT total_institutions
FROM institution_count;
```

### ✅ PASS : EDUCATION_002 - Filter then count
```sql
SELECT COUNT(*) AS active_campuses FROM campuses WHERE is_active = true;
```

### ✅ PASS : EDUCATION_002 - Boolean shorthand
```sql
SELECT COUNT(*) AS active_campuses FROM campuses WHERE is_active;
```

### ✅ PASS : EDUCATION_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_campuses FROM campuses;
```

### ✅ PASS : EDUCATION_003 - Filter and sort
```sql
SELECT term_name, academic_year FROM academic_terms WHERE status = 'active' ORDER BY academic_year ASC, term_name ASC;
```

### ✅ PASS : EDUCATION_003 - CTE active terms
```sql
WITH active_terms AS (
  SELECT term_name, academic_year
  FROM academic_terms
  WHERE status = 'active'
)
SELECT term_name, academic_year
FROM active_terms
ORDER BY academic_year ASC, term_name ASC;
```

### ✅ PASS : EDUCATION_003 - Subquery filter
```sql
SELECT term_name, academic_year FROM (SELECT term_name, academic_year FROM academic_terms WHERE status = 'active') t ORDER BY academic_year ASC, term_name ASC;
```

### ✅ PASS : EDUCATION_004 - Filter active students
```sql
SELECT user_id, admission_number, enrollment_status FROM student_profiles WHERE enrollment_status = 'active' ORDER BY user_id ASC;
```

### ✅ PASS : EDUCATION_004 - IN filter
```sql
SELECT user_id, admission_number, enrollment_status FROM student_profiles WHERE enrollment_status IN ('active') ORDER BY user_id ASC;
```

### ✅ PASS : EDUCATION_004 - CTE active students
```sql
WITH active_students AS (
  SELECT user_id, admission_number, enrollment_status
  FROM student_profiles
  WHERE enrollment_status = 'active'
)
SELECT user_id, admission_number, enrollment_status
FROM active_students
ORDER BY user_id ASC;
```

### ✅ PASS : EDUCATION_005 - Sort recent hires
```sql
SELECT user_id, employee_code, hire_date FROM teacher_profiles WHERE hire_date IS NOT NULL ORDER BY hire_date DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : EDUCATION_005 - CTE recent hires
```sql
WITH ranked_hires AS (
  SELECT user_id, employee_code, hire_date
  FROM teacher_profiles
  WHERE hire_date IS NOT NULL
)
SELECT user_id, employee_code, hire_date
FROM ranked_hires
ORDER BY hire_date DESC, user_id ASC
LIMIT 10;
```

### ✅ PASS : EDUCATION_005 - Window rank
```sql
SELECT user_id, employee_code, hire_date FROM (SELECT user_id, employee_code, hire_date, ROW_NUMBER() OVER (ORDER BY hire_date DESC, user_id ASC) AS rn FROM teacher_profiles WHERE hire_date IS NOT NULL) t WHERE rn <= 10 ORDER BY hire_date DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_006 - Filter mandatory
```sql
SELECT id, course_title, credit_value FROM courses WHERE is_mandatory = true AND is_active = true ORDER BY course_title ASC, id ASC;
```

### ✅ PASS : EDUCATION_006 - Boolean shorthand
```sql
SELECT id, course_title, credit_value FROM courses WHERE is_mandatory AND is_active ORDER BY course_title ASC, id ASC;
```

### ✅ PASS : EDUCATION_006 - CTE mandatory
```sql
WITH mandatory_courses AS (
  SELECT id, course_title, credit_value
  FROM courses
  WHERE is_mandatory = true AND is_active = true
)
SELECT id, course_title, credit_value
FROM mandatory_courses
ORDER BY course_title ASC, id ASC;
```

### ✅ PASS : EDUCATION_007 - Capacity filter
```sql
SELECT id, campus_id, room_name, seating_capacity FROM classrooms WHERE seating_capacity >= 100 ORDER BY seating_capacity DESC, id ASC;
```

### ✅ PASS : EDUCATION_007 - CTE large rooms
```sql
WITH large_classrooms AS (
  SELECT id, campus_id, room_name, seating_capacity
  FROM classrooms
  WHERE seating_capacity >= 100
)
SELECT id, campus_id, room_name, seating_capacity
FROM large_classrooms
ORDER BY seating_capacity DESC, id ASC;
```

### ✅ PASS : EDUCATION_007 - Subquery filter
```sql
SELECT id, campus_id, room_name, seating_capacity FROM (SELECT id, campus_id, room_name, seating_capacity FROM classrooms WHERE seating_capacity >= 100) c ORDER BY seating_capacity DESC, id ASC;
```

### ✅ PASS : EDUCATION_008 - Sort by due date
```sql
SELECT id, offering_id, assignment_title, due_at FROM assignments ORDER BY due_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_008 - CTE ordered base
```sql
WITH assignment_list AS (
  SELECT id, offering_id, assignment_title, due_at
  FROM assignments
)
SELECT id, offering_id, assignment_title, due_at
FROM assignment_list
ORDER BY due_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_008 - Row number sort
```sql
SELECT id, offering_id, assignment_title, due_at FROM (SELECT id, offering_id, assignment_title, due_at, ROW_NUMBER() OVER (ORDER BY due_at ASC, id ASC) AS rn FROM assignments) a ORDER BY rn ASC;
```

### ✅ PASS : EDUCATION_009 - Filter successful
```sql
SELECT id, invoice_id, paid_amount, paid_at FROM payments WHERE payment_status = 'successful' ORDER BY paid_at DESC, id ASC;
```

### ✅ PASS : EDUCATION_009 - IN status
```sql
SELECT id, invoice_id, paid_amount, paid_at FROM payments WHERE payment_status IN ('successful') ORDER BY paid_at DESC, id ASC;
```

### ✅ PASS : EDUCATION_009 - CTE successful
```sql
WITH successful_payments AS (
  SELECT id, invoice_id, paid_amount, paid_at
  FROM payments
  WHERE payment_status = 'successful'
)
SELECT id, invoice_id, paid_amount, paid_at
FROM successful_payments
ORDER BY paid_at DESC, id ASC;
```

### ✅ PASS : EDUCATION_010 - Filter open tickets
```sql
SELECT id, institution_id, user_id, issue_type, priority FROM support_tickets WHERE ticket_status = 'open' ORDER BY priority ASC, id ASC;
```

### ✅ PASS : EDUCATION_010 - CTE open tickets
```sql
WITH open_tickets AS (
  SELECT id, institution_id, user_id, issue_type, priority
  FROM support_tickets
  WHERE ticket_status = 'open'
)
SELECT id, institution_id, user_id, issue_type, priority
FROM open_tickets
ORDER BY priority ASC, id ASC;
```

### ✅ PASS : EDUCATION_010 - Subquery open
```sql
SELECT id, institution_id, user_id, issue_type, priority FROM (SELECT id, institution_id, user_id, issue_type, priority FROM support_tickets WHERE ticket_status = 'open') t ORDER BY priority ASC, id ASC;
```

### ✅ PASS : EDUCATION_011 - Group count
```sql
SELECT user_role, COUNT(*) AS total_users FROM users GROUP BY user_role ORDER BY total_users DESC, user_role ASC;
```

### ✅ PASS : EDUCATION_011 - Count ids
```sql
SELECT user_role, COUNT(id) AS total_users FROM users GROUP BY user_role ORDER BY total_users DESC, user_role ASC;
```

### ✅ PASS : EDUCATION_011 - CTE roles
```sql
WITH role_counts AS (
  SELECT user_role, COUNT(*) AS total_users
  FROM users
  GROUP BY user_role
)
SELECT user_role, total_users
FROM role_counts
ORDER BY total_users DESC, user_role ASC;
```

### ✅ PASS : EDUCATION_012 - Group programs
```sql
SELECT program_level, COUNT(*) AS total_programs FROM programs GROUP BY program_level ORDER BY total_programs DESC, program_level ASC;
```

### ✅ PASS : EDUCATION_012 - Count ids
```sql
SELECT program_level, COUNT(id) AS total_programs FROM programs GROUP BY program_level ORDER BY total_programs DESC, program_level ASC;
```

### ✅ PASS : EDUCATION_012 - CTE levels
```sql
WITH level_counts AS (
  SELECT program_level, COUNT(*) AS total_programs
  FROM programs
  GROUP BY program_level
)
SELECT program_level, total_programs
FROM level_counts
ORDER BY total_programs DESC, program_level ASC;
```

### ✅ PASS : EDUCATION_013 - AVG capacity
```sql
SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity FROM classrooms GROUP BY room_type ORDER BY avg_capacity DESC, room_type ASC;
```

### ✅ PASS : EDUCATION_013 - CTE average
```sql
WITH room_avg AS (
  SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity
  FROM classrooms
  GROUP BY room_type
)
SELECT room_type, avg_capacity
FROM room_avg
ORDER BY avg_capacity DESC, room_type ASC;
```

### ✅ PASS : EDUCATION_013 - Subquery avg
```sql
SELECT room_type, avg_capacity FROM (SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity FROM classrooms GROUP BY room_type) t ORDER BY avg_capacity DESC, room_type ASC;
```

### ✅ PASS : EDUCATION_014 - Group status
```sql
SELECT enrollment_status, COUNT(*) AS total_students FROM student_profiles GROUP BY enrollment_status ORDER BY total_students DESC, enrollment_status ASC;
```

### ✅ PASS : EDUCATION_014 - Count users
```sql
SELECT enrollment_status, COUNT(user_id) AS total_students FROM student_profiles GROUP BY enrollment_status ORDER BY total_students DESC, enrollment_status ASC;
```

### ✅ PASS : EDUCATION_014 - CTE status
```sql
WITH status_counts AS (
  SELECT enrollment_status, COUNT(*) AS total_students
  FROM student_profiles
  GROUP BY enrollment_status
)
SELECT enrollment_status, total_students
FROM status_counts
ORDER BY total_students DESC, enrollment_status ASC;
```

### ✅ PASS : EDUCATION_015 - Group types
```sql
SELECT assignment_type, COUNT(*) AS total_assignments FROM assignments GROUP BY assignment_type ORDER BY total_assignments DESC, assignment_type ASC;
```

### ✅ PASS : EDUCATION_015 - Count ids
```sql
SELECT assignment_type, COUNT(id) AS total_assignments FROM assignments GROUP BY assignment_type ORDER BY total_assignments DESC, assignment_type ASC;
```

### ✅ PASS : EDUCATION_015 - CTE types
```sql
WITH type_counts AS (
  SELECT assignment_type, COUNT(*) AS total_assignments
  FROM assignments
  GROUP BY assignment_type
)
SELECT assignment_type, total_assignments
FROM type_counts
ORDER BY total_assignments DESC, assignment_type ASC;
```

### ✅ PASS : EDUCATION_016 - AVG rating
```sql
SELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating FROM teacher_profiles WHERE rating_score IS NOT NULL GROUP BY employment_type ORDER BY avg_rating DESC, employment_type ASC;
```

### ✅ PASS : EDUCATION_016 - CASE avg
```sql
SELECT employment_type, ROUND(AVG(CASE WHEN rating_score IS NOT NULL THEN rating_score END), 2) AS avg_rating FROM teacher_profiles GROUP BY employment_type ORDER BY avg_rating DESC, employment_type ASC;
```

### ✅ PASS : EDUCATION_016 - CTE ratings
```sql
WITH teacher_ratings AS (
  SELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating
  FROM teacher_profiles
  WHERE rating_score IS NOT NULL
  GROUP BY employment_type
)
SELECT employment_type, avg_rating
FROM teacher_ratings
ORDER BY avg_rating DESC, employment_type ASC;
```

### ✅ PASS : EDUCATION_017 - Group fees
```sql
SELECT fee_category, COUNT(*) AS total_fee_plans FROM fee_plans GROUP BY fee_category ORDER BY total_fee_plans DESC, fee_category ASC;
```

### ✅ PASS : EDUCATION_017 - Count ids
```sql
SELECT fee_category, COUNT(id) AS total_fee_plans FROM fee_plans GROUP BY fee_category ORDER BY total_fee_plans DESC, fee_category ASC;
```

### ✅ PASS : EDUCATION_017 - CTE fees
```sql
WITH fee_counts AS (
  SELECT fee_category, COUNT(*) AS total_fee_plans
  FROM fee_plans
  GROUP BY fee_category
)
SELECT fee_category, total_fee_plans
FROM fee_counts
ORDER BY total_fee_plans DESC, fee_category ASC;
```

### ✅ PASS : EDUCATION_018 - Sum paid
```sql
SELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY total_paid_amount DESC, payment_method ASC;
```

### ✅ PASS : EDUCATION_018 - FILTER sum
```sql
SELECT payment_method, ROUND(SUM(paid_amount) FILTER (WHERE payment_status = 'successful'), 2) AS total_paid_amount FROM payments GROUP BY payment_method ORDER BY total_paid_amount DESC, payment_method ASC;
```

### ✅ PASS : EDUCATION_018 - CTE paid
```sql
WITH method_totals AS (
  SELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount
  FROM payments
  WHERE payment_status = 'successful'
  GROUP BY payment_method
)
SELECT payment_method, total_paid_amount
FROM method_totals
ORDER BY total_paid_amount DESC, payment_method ASC;
```

### ✅ PASS : EDUCATION_019 - Group priority
```sql
SELECT priority, COUNT(*) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC, priority ASC;
```

### ✅ PASS : EDUCATION_019 - Count ids
```sql
SELECT priority, COUNT(id) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC, priority ASC;
```

### ✅ PASS : EDUCATION_019 - CTE priority
```sql
WITH priority_counts AS (
  SELECT priority, COUNT(*) AS total_tickets
  FROM support_tickets
  GROUP BY priority
)
SELECT priority, total_tickets
FROM priority_counts
ORDER BY total_tickets DESC, priority ASC;
```

### ✅ PASS : EDUCATION_020 - AVG marks
```sql
SELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks FROM assignment_submissions WHERE obtained_marks IS NOT NULL;
```

### ✅ PASS : EDUCATION_020 - CASE avg
```sql
SELECT ROUND(AVG(CASE WHEN obtained_marks IS NOT NULL THEN obtained_marks END), 2) AS avg_obtained_marks FROM assignment_submissions;
```

### ✅ PASS : EDUCATION_020 - CTE average
```sql
WITH submission_avg AS (
  SELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks
  FROM assignment_submissions
  WHERE obtained_marks IS NOT NULL
)
SELECT avg_obtained_marks
FROM submission_avg;
```

### ✅ PASS : EDUCATION_021 - Avg subquery
```sql
SELECT user_id, admission_number, cgpa FROM student_profiles WHERE cgpa > (SELECT AVG(cgpa) FROM student_profiles WHERE cgpa IS NOT NULL) ORDER BY cgpa DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_021 - CTE avg
```sql
WITH avg_cgpa AS (SELECT AVG(cgpa) AS overall_avg_cgpa FROM student_profiles WHERE cgpa IS NOT NULL) SELECT sp.user_id, sp.admission_number, sp.cgpa FROM student_profiles sp CROSS JOIN avg_cgpa a WHERE sp.cgpa > a.overall_avg_cgpa ORDER BY sp.cgpa DESC, sp.user_id ASC;
```

### ✅ PASS : EDUCATION_021 - Window avg
```sql
SELECT user_id, admission_number, cgpa FROM (SELECT user_id, admission_number, cgpa, AVG(cgpa) OVER () AS overall_avg_cgpa FROM student_profiles WHERE cgpa IS NOT NULL) t WHERE cgpa > overall_avg_cgpa ORDER BY cgpa DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_022 - Credit filter
```sql
SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4 ORDER BY credit_value DESC, id ASC;
```

### ✅ PASS : EDUCATION_022 - CTE credits
```sql
WITH high_credit_courses AS (SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4) SELECT id, course_title, credit_value FROM high_credit_courses ORDER BY credit_value DESC, id ASC;
```

### ✅ PASS : EDUCATION_022 - Subquery filter
```sql
SELECT id, course_title, credit_value FROM (SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4) c ORDER BY credit_value DESC, id ASC;
```

### ✅ PASS : EDUCATION_023 - Flag filter
```sql
SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission = true ORDER BY due_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_023 - Boolean filter
```sql
SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission ORDER BY due_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_023 - CTE late
```sql
WITH late_allowed AS (SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission = true) SELECT id, assignment_title, due_at, max_late_days FROM late_allowed ORDER BY due_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_024 - Date filter
```sql
SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date > CURRENT_DATE ORDER BY exam_date ASC, id ASC;
```

### ✅ PASS : EDUCATION_024 - CTE upcoming
```sql
WITH upcoming_exams AS (SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date > CURRENT_DATE) SELECT id, exam_name, exam_date, exam_type FROM upcoming_exams ORDER BY exam_date ASC, id ASC;
```

### ✅ PASS : EDUCATION_024 - Interval compare
```sql
SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date >= CURRENT_DATE + INTERVAL '1 day' ORDER BY exam_date ASC, id ASC;
```

### ✅ PASS : EDUCATION_025 - Count published
```sql
SELECT COUNT(*) AS published_results FROM exam_results WHERE result_status = 'published';
```

### ✅ PASS : EDUCATION_025 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE result_status = 'published') AS published_results FROM exam_results;
```

### ✅ PASS : EDUCATION_025 - CTE count
```sql
WITH published_count AS (SELECT COUNT(*) AS published_results FROM exam_results WHERE result_status = 'published') SELECT published_results FROM published_count;
```

### ✅ PASS : EDUCATION_026 - Completed filter
```sql
SELECT material_id, user_id, progress_percent FROM material_views WHERE completed = true ORDER BY progress_percent DESC, material_id ASC;
```

### ✅ PASS : EDUCATION_026 - Boolean shorthand
```sql
SELECT material_id, user_id, progress_percent FROM material_views WHERE completed ORDER BY progress_percent DESC, material_id ASC;
```

### ✅ PASS : EDUCATION_026 - Exclude incomplete
```sql
SELECT material_id, user_id, progress_percent FROM material_views WHERE completed IS TRUE ORDER BY progress_percent DESC, material_id ASC;
```

### ✅ PASS : EDUCATION_027 - Pinned filter
```sql
SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned = true ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : EDUCATION_027 - Boolean filter
```sql
SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : EDUCATION_027 - CTE pinned
```sql
WITH pinned_threads AS (SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned = true) SELECT id, offering_id, thread_title, created_at FROM pinned_threads ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : EDUCATION_028 - Active filter
```sql
SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active = true ORDER BY amount_value DESC, id ASC;
```

### ✅ PASS : EDUCATION_028 - Boolean active
```sql
SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active ORDER BY amount_value DESC, id ASC;
```

### ✅ PASS : EDUCATION_028 - CTE active
```sql
WITH active_scholarships AS (SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active = true) SELECT id, scholarship_name, scholarship_type, amount_value FROM active_scholarships ORDER BY amount_value DESC, id ASC;
```

### ✅ PASS : EDUCATION_029 - Status filter
```sql
SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status = 'overdue' ORDER BY due_date ASC, id ASC;
```

### ✅ PASS : EDUCATION_029 - IN overdue
```sql
SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status IN ('overdue') ORDER BY due_date ASC, id ASC;
```

### ✅ PASS : EDUCATION_029 - CTE overdue
```sql
WITH overdue_invoices AS (SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status = 'overdue') SELECT id, student_user_id, invoice_number, total_amount, due_date FROM overdue_invoices ORDER BY due_date ASC, id ASC;
```

### ✅ PASS : EDUCATION_030 - Recent limit
```sql
SELECT id, user_id, event_name, event_category, event_time FROM app_events ORDER BY event_time DESC, id ASC LIMIT 20;
```

### ✅ PASS : EDUCATION_030 - CTE recent
```sql
WITH recent_events AS (SELECT id, user_id, event_name, event_category, event_time FROM app_events) SELECT id, user_id, event_name, event_category, event_time FROM recent_events ORDER BY event_time DESC, id ASC LIMIT 20;
```

### ✅ PASS : EDUCATION_030 - Window rank
```sql
SELECT id, user_id, event_name, event_category, event_time FROM (SELECT id, user_id, event_name, event_category, event_time, ROW_NUMBER() OVER (ORDER BY event_time DESC, id ASC) AS rn FROM app_events) e WHERE rn <= 20 ORDER BY event_time DESC, id ASC;
```

### ✅ PASS : EDUCATION_031 - Group enrolled
```sql
SELECT offering_id, COUNT(*) AS enrolled_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ORDER BY enrolled_students DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_031 - Count students
```sql
SELECT offering_id, COUNT(student_user_id) AS enrolled_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ORDER BY enrolled_students DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_031 - CTE enrollments
```sql
WITH enrolled_counts AS (
  SELECT offering_id, COUNT(*) AS enrolled_students
  FROM enrollments
  WHERE enrollment_status = 'enrolled'
  GROUP BY offering_id
)
SELECT offering_id, enrolled_students
FROM enrolled_counts
ORDER BY enrolled_students DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_032 - AVG attendance
```sql
SELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance FROM enrollments WHERE attendance_percentage IS NOT NULL GROUP BY offering_id ORDER BY avg_attendance DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_032 - CASE avg
```sql
SELECT offering_id, ROUND(AVG(CASE WHEN attendance_percentage IS NOT NULL THEN attendance_percentage END), 2) AS avg_attendance FROM enrollments GROUP BY offering_id ORDER BY avg_attendance DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_032 - CTE attendance
```sql
WITH offering_attendance AS (
  SELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance
  FROM enrollments
  WHERE attendance_percentage IS NOT NULL
  GROUP BY offering_id
)
SELECT offering_id, avg_attendance
FROM offering_attendance
ORDER BY avg_attendance DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_033 - Group exams
```sql
SELECT exam_type, COUNT(*) AS total_exams FROM exams GROUP BY exam_type ORDER BY total_exams DESC, exam_type ASC;
```

### ✅ PASS : EDUCATION_033 - Count ids
```sql
SELECT exam_type, COUNT(id) AS total_exams FROM exams GROUP BY exam_type ORDER BY total_exams DESC, exam_type ASC;
```

### ✅ PASS : EDUCATION_033 - CTE exams
```sql
WITH exam_counts AS (
  SELECT exam_type, COUNT(*) AS total_exams
  FROM exams
  GROUP BY exam_type
)
SELECT exam_type, total_exams
FROM exam_counts
ORDER BY total_exams DESC, exam_type ASC;
```

### ✅ PASS : EDUCATION_034 - AVG scores
```sql
SELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY exam_id ORDER BY avg_score DESC, exam_id ASC;
```

### ✅ PASS : EDUCATION_034 - CASE avg
```sql
SELECT exam_id, ROUND(AVG(CASE WHEN obtained_marks IS NOT NULL THEN obtained_marks END), 2) AS avg_score FROM exam_results GROUP BY exam_id ORDER BY avg_score DESC, exam_id ASC;
```

### ✅ PASS : EDUCATION_034 - CTE scores
```sql
WITH exam_scores AS (
  SELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score
  FROM exam_results
  WHERE obtained_marks IS NOT NULL
  GROUP BY exam_id
)
SELECT exam_id, avg_score
FROM exam_scores
ORDER BY avg_score DESC, exam_id ASC;
```

### ✅ PASS : EDUCATION_035 - Group issues
```sql
SELECT issue_type, COUNT(*) AS total_tickets FROM support_tickets GROUP BY issue_type ORDER BY total_tickets DESC, issue_type ASC;
```

### ✅ PASS : EDUCATION_035 - Count ids
```sql
SELECT issue_type, COUNT(id) AS total_tickets FROM support_tickets GROUP BY issue_type ORDER BY total_tickets DESC, issue_type ASC;
```

### ✅ PASS : EDUCATION_035 - CTE issues
```sql
WITH issue_counts AS (
  SELECT issue_type, COUNT(*) AS total_tickets
  FROM support_tickets
  GROUP BY issue_type
)
SELECT issue_type, total_tickets
FROM issue_counts
ORDER BY total_tickets DESC, issue_type ASC;
```

### ✅ PASS : EDUCATION_036 - AVG paid
```sql
SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful';
```

### ✅ PASS : EDUCATION_036 - FILTER avg
```sql
SELECT ROUND(AVG(paid_amount) FILTER (WHERE payment_status = 'successful'), 2) AS avg_paid_amount FROM payments;
```

### ✅ PASS : EDUCATION_036 - CTE paid avg
```sql
WITH payment_avg AS (
  SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount
  FROM payments
  WHERE payment_status = 'successful'
)
SELECT avg_paid_amount
FROM payment_avg;
```

### ✅ PASS : EDUCATION_037 - Group status
```sql
SELECT course_status, COUNT(*) AS total_offerings FROM course_offerings GROUP BY course_status ORDER BY total_offerings DESC, course_status ASC;
```

### ✅ PASS : EDUCATION_037 - Count ids
```sql
SELECT course_status, COUNT(id) AS total_offerings FROM course_offerings GROUP BY course_status ORDER BY total_offerings DESC, course_status ASC;
```

### ✅ PASS : EDUCATION_037 - CTE status
```sql
WITH offering_counts AS (
  SELECT course_status, COUNT(*) AS total_offerings
  FROM course_offerings
  GROUP BY course_status
)
SELECT course_status, total_offerings
FROM offering_counts
ORDER BY total_offerings DESC, course_status ASC;
```

### ✅ PASS : EDUCATION_038 - Group teachers
```sql
SELECT department_id, COUNT(*) AS total_teachers FROM teacher_profiles WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_teachers DESC, department_id ASC;
```

### ✅ PASS : EDUCATION_038 - Count users
```sql
SELECT department_id, COUNT(user_id) AS total_teachers FROM teacher_profiles WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_teachers DESC, department_id ASC;
```

### ✅ PASS : EDUCATION_038 - CTE teachers
```sql
WITH dept_teachers AS (
  SELECT department_id, COUNT(*) AS total_teachers
  FROM teacher_profiles
  WHERE department_id IS NOT NULL
  GROUP BY department_id
)
SELECT department_id, total_teachers
FROM dept_teachers
ORDER BY total_teachers DESC, department_id ASC;
```

### ✅ PASS : EDUCATION_039 - Group materials
```sql
SELECT material_type, COUNT(*) AS total_materials FROM learning_materials GROUP BY material_type ORDER BY total_materials DESC, material_type ASC;
```

### ✅ PASS : EDUCATION_039 - Count ids
```sql
SELECT material_type, COUNT(id) AS total_materials FROM learning_materials GROUP BY material_type ORDER BY total_materials DESC, material_type ASC;
```

### ✅ PASS : EDUCATION_039 - CTE materials
```sql
WITH material_counts AS (
  SELECT material_type, COUNT(*) AS total_materials
  FROM learning_materials
  GROUP BY material_type
)
SELECT material_type, total_materials
FROM material_counts
ORDER BY total_materials DESC, material_type ASC;
```

### ✅ PASS : EDUCATION_040 - AVG feedback
```sql
SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating FROM student_feedback GROUP BY feedback_category ORDER BY avg_rating DESC, feedback_category ASC;
```

### ✅ PASS : EDUCATION_040 - CTE feedback
```sql
WITH feedback_avg AS (
  SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating
  FROM student_feedback
  GROUP BY feedback_category
)
SELECT feedback_category, avg_rating
FROM feedback_avg
ORDER BY avg_rating DESC, feedback_category ASC;
```

### ✅ PASS : EDUCATION_040 - Subquery avg
```sql
SELECT feedback_category, avg_rating FROM (SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating FROM student_feedback GROUP BY feedback_category) f ORDER BY avg_rating DESC, feedback_category ASC;
```

### ✅ PASS : EDUCATION_041 - Join program
```sql
SELECT u.id AS user_id, u.full_name, p.program_name FROM student_profiles sp JOIN users u ON sp.user_id = u.id LEFT JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' ORDER BY u.id ASC;
```

### ✅ PASS : EDUCATION_041 - CTE active
```sql
WITH active_students AS (SELECT user_id, program_id FROM student_profiles WHERE enrollment_status = 'active') SELECT u.id AS user_id, u.full_name, p.program_name FROM active_students a JOIN users u ON a.user_id = u.id LEFT JOIN programs p ON a.program_id = p.id ORDER BY u.id ASC;
```

### ✅ PASS : EDUCATION_041 - Subquery join
```sql
SELECT u.id AS user_id, u.full_name, p.program_name FROM (SELECT user_id, program_id FROM student_profiles WHERE enrollment_status = 'active') sp JOIN users u ON sp.user_id = u.id LEFT JOIN programs p ON sp.program_id = p.id ORDER BY u.id ASC;
```

### ✅ PASS : EDUCATION_042 - Join dept
```sql
SELECT tp.user_id, u.full_name, d.department_name FROM teacher_profiles tp JOIN users u ON tp.user_id = u.id LEFT JOIN departments d ON tp.department_id = d.id ORDER BY tp.user_id ASC;
```

### ✅ PASS : EDUCATION_042 - CTE teachers
```sql
WITH teacher_base AS (SELECT user_id, department_id FROM teacher_profiles) SELECT tb.user_id, u.full_name, d.department_name FROM teacher_base tb JOIN users u ON tb.user_id = u.id LEFT JOIN departments d ON tb.department_id = d.id ORDER BY tb.user_id ASC;
```

### ✅ PASS : EDUCATION_042 - Inner dept
```sql
SELECT tp.user_id, u.full_name, d.department_name FROM teacher_profiles tp JOIN users u ON tp.user_id = u.id JOIN departments d ON tp.department_id = d.id ORDER BY tp.user_id ASC;
```

### ✅ PASS : EDUCATION_043 - Join teacher
```sql
SELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM course_offerings co JOIN courses c ON co.course_id = c.id LEFT JOIN users u ON co.primary_teacher_id = u.id ORDER BY co.id ASC;
```

### ✅ PASS : EDUCATION_043 - CTE offerings
```sql
WITH offering_base AS (SELECT id, course_id, primary_teacher_id FROM course_offerings) SELECT ob.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM offering_base ob JOIN courses c ON ob.course_id = c.id LEFT JOIN users u ON ob.primary_teacher_id = u.id ORDER BY ob.id ASC;
```

### ✅ PASS : EDUCATION_043 - Inner teacher
```sql
SELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM course_offerings co JOIN courses c ON co.course_id = c.id JOIN users u ON co.primary_teacher_id = u.id ORDER BY co.id ASC;
```

### ✅ PASS : EDUCATION_044 - Join group
```sql
SELECT p.program_name, COUNT(*) AS total_students FROM student_profiles sp JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' GROUP BY p.program_name ORDER BY total_students DESC, p.program_name ASC;
```

### ✅ PASS : EDUCATION_044 - Group by id
```sql
SELECT p.program_name, COUNT(*) AS total_students FROM student_profiles sp JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' GROUP BY p.id, p.program_name ORDER BY total_students DESC, p.program_name ASC;
```

### ✅ PASS : EDUCATION_044 - CTE active
```sql
WITH active_students AS (SELECT program_id FROM student_profiles WHERE enrollment_status = 'active') SELECT p.program_name, COUNT(*) AS total_students FROM active_students a JOIN programs p ON a.program_id = p.id GROUP BY p.program_name ORDER BY total_students DESC, p.program_name ASC;
```

### ✅ PASS : EDUCATION_045 - Join low attendance
```sql
SELECT u.id AS user_id, u.full_name, sp.attendance_percentage FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE sp.attendance_percentage < 75 ORDER BY sp.attendance_percentage ASC, u.id ASC;
```

### ✅ PASS : EDUCATION_045 - CTE low
```sql
WITH low_attendance AS (SELECT user_id, attendance_percentage FROM student_profiles WHERE attendance_percentage < 75) SELECT u.id AS user_id, u.full_name, l.attendance_percentage FROM low_attendance l JOIN users u ON l.user_id = u.id ORDER BY l.attendance_percentage ASC, u.id ASC;
```

### ✅ PASS : EDUCATION_045 - Between filter
```sql
SELECT u.id AS user_id, u.full_name, sp.attendance_percentage FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE sp.attendance_percentage BETWEEN 0 AND 74.999999 ORDER BY sp.attendance_percentage ASC, u.id ASC;
```

### ✅ PASS : EDUCATION_046 - Join avg
```sql
SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.obtained_marks IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_046 - Left join avg
```sql
SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.obtained_marks IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_046 - CTE scores
```sql
WITH scored_submissions AS (SELECT assignment_id, obtained_marks FROM assignment_submissions WHERE obtained_marks IS NOT NULL) SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a JOIN scored_submissions s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_047 - Join pass count
```sql
SELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students FROM exams e JOIN exam_results er ON e.id = er.exam_id WHERE er.grade_letter IS NOT NULL AND er.grade_letter <> 'F' GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;
```

### ✅ PASS : EDUCATION_047 - FILTER count
```sql
SELECT e.id AS exam_id, e.exam_name, COUNT(*) FILTER (WHERE er.grade_letter IS NOT NULL AND er.grade_letter <> 'F') AS passed_students FROM exams e JOIN exam_results er ON e.id = er.exam_id GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;
```

### ✅ PASS : EDUCATION_047 - CTE passed
```sql
WITH passed_results AS (SELECT exam_id FROM exam_results WHERE grade_letter IS NOT NULL AND grade_letter <> 'F') SELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students FROM exams e JOIN passed_results pr ON e.id = pr.exam_id GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;
```

### ✅ PASS : EDUCATION_048 - Join revenue
```sql
SELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected FROM payments pay JOIN fee_invoices fi ON pay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id WHERE pay.payment_status = 'successful' GROUP BY p.program_name ORDER BY total_collected DESC, p.program_name ASC;
```

### ✅ PASS : EDUCATION_048 - CTE paid
```sql
WITH successful_payments AS (SELECT invoice_id, paid_amount FROM payments WHERE payment_status = 'successful') SELECT p.program_name, ROUND(SUM(spay.paid_amount), 2) AS total_collected FROM successful_payments spay JOIN fee_invoices fi ON spay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id GROUP BY p.program_name ORDER BY total_collected DESC, p.program_name ASC;
```

### ✅ PASS : EDUCATION_048 - Group by id
```sql
SELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected FROM payments pay JOIN fee_invoices fi ON pay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id WHERE pay.payment_status = 'successful' GROUP BY p.id, p.program_name ORDER BY total_collected DESC, p.program_name ASC;
```

### ✅ PASS : EDUCATION_049 - Capacity filter
```sql
SELECT id AS offering_id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count >= seat_limit * 0.9 ORDER BY enrolled_count DESC, id ASC;
```

### ✅ PASS : EDUCATION_049 - Percent ratio
```sql
SELECT id AS offering_id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count::numeric / seat_limit >= 0.9 ORDER BY enrolled_count DESC, id ASC;
```

### ✅ PASS : EDUCATION_049 - CTE near cap
```sql
WITH near_capacity AS (SELECT id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count >= seat_limit * 0.9) SELECT id AS offering_id, seat_limit, enrolled_count FROM near_capacity ORDER BY enrolled_count DESC, id ASC;
```

### ✅ PASS : EDUCATION_050 - Left join count
```sql
SELECT dt.id AS thread_id, dt.thread_title, COUNT(dp.id) AS total_posts FROM discussion_threads dt LEFT JOIN discussion_posts dp ON dt.id = dp.thread_id GROUP BY dt.id, dt.thread_title ORDER BY total_posts DESC, dt.id ASC;
```

### ✅ PASS : EDUCATION_050 - Subquery count
```sql
SELECT dt.id AS thread_id, dt.thread_title, (SELECT COUNT(*) FROM discussion_posts dp WHERE dp.thread_id = dt.id) AS total_posts FROM discussion_threads dt ORDER BY total_posts DESC, dt.id ASC;
```

### ✅ PASS : EDUCATION_050 - CTE post counts
```sql
WITH post_counts AS (SELECT thread_id, COUNT(*) AS total_posts FROM discussion_posts GROUP BY thread_id) SELECT dt.id AS thread_id, dt.thread_title, COALESCE(pc.total_posts, 0) AS total_posts FROM discussion_threads dt LEFT JOIN post_counts pc ON dt.id = pc.thread_id ORDER BY total_posts DESC, dt.id ASC;
```

### ✅ PASS : EDUCATION_051 - Join guardian
```sql
SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM guardian_relationships gr JOIN users su ON gr.student_user_id = su.id JOIN users gu ON gr.guardian_user_id = gu.id WHERE gr.is_primary = true ORDER BY su.id ASC;
```

### ✅ PASS : EDUCATION_051 - Boolean primary
```sql
SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM guardian_relationships gr JOIN users su ON gr.student_user_id = su.id JOIN users gu ON gr.guardian_user_id = gu.id WHERE gr.is_primary ORDER BY su.id ASC;
```

### ✅ PASS : EDUCATION_051 - CTE primary
```sql
WITH primary_guardians AS (SELECT student_user_id, guardian_user_id FROM guardian_relationships WHERE is_primary = true) SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM primary_guardians pg JOIN users su ON pg.student_user_id = su.id JOIN users gu ON pg.guardian_user_id = gu.id ORDER BY su.id ASC;
```

### ✅ PASS : EDUCATION_052 - Group sessions
```sql
SELECT offering_id, COUNT(*) AS total_sessions FROM attendance_sessions GROUP BY offering_id ORDER BY total_sessions DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_052 - Count ids
```sql
SELECT offering_id, COUNT(id) AS total_sessions FROM attendance_sessions GROUP BY offering_id ORDER BY total_sessions DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_052 - CTE sessions
```sql
WITH session_counts AS (SELECT offering_id, COUNT(*) AS total_sessions FROM attendance_sessions GROUP BY offering_id) SELECT offering_id, total_sessions FROM session_counts ORDER BY total_sessions DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_053 - Filter present
```sql
SELECT ar.student_user_id, COUNT(*) AS present_count FROM attendance_records ar WHERE ar.attendance_status = 'present' GROUP BY ar.student_user_id ORDER BY present_count DESC, ar.student_user_id ASC;
```

### ✅ PASS : EDUCATION_053 - CTE present
```sql
WITH present_records AS (SELECT student_user_id FROM attendance_records WHERE attendance_status = 'present') SELECT student_user_id, COUNT(*) AS present_count FROM present_records GROUP BY student_user_id ORDER BY present_count DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_053 - Filter with HAVING
```sql
SELECT ar.student_user_id, COUNT(*) FILTER (WHERE ar.attendance_status = 'present') AS present_count FROM attendance_records ar GROUP BY ar.student_user_id HAVING COUNT(*) FILTER (WHERE ar.attendance_status = 'present') > 0 ORDER BY present_count DESC, ar.student_user_id ASC;
```

### ✅ PASS : EDUCATION_054 - Left join late
```sql
SELECT a.id AS assignment_id, a.assignment_title, COUNT(s.id) AS late_submissions FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.submission_status = 'late_submitted' GROUP BY a.id, a.assignment_title ORDER BY late_submissions DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_054 - CTE late counts
```sql
WITH late_counts AS (SELECT assignment_id, COUNT(*) AS late_submissions FROM assignment_submissions WHERE submission_status = 'late_submitted' GROUP BY assignment_id) SELECT a.id AS assignment_id, a.assignment_title, COALESCE(lc.late_submissions, 0) AS late_submissions FROM assignments a LEFT JOIN late_counts lc ON a.id = lc.assignment_id ORDER BY late_submissions DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_054 - FILTER late
```sql
SELECT a.id AS assignment_id, a.assignment_title, COUNT(s.id) FILTER (WHERE s.submission_status = 'late_submitted') AS late_submissions FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title ORDER BY late_submissions DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_055 - Join avg plagiarism
```sql
SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.plagiarism_score IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_plagiarism_score DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_055 - CTE scores
```sql
WITH scored_plagiarism AS (SELECT assignment_id, plagiarism_score FROM assignment_submissions WHERE plagiarism_score IS NOT NULL) SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score FROM assignments a JOIN scored_plagiarism s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title ORDER BY avg_plagiarism_score DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_055 - CASE with HAVING
```sql
SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(CASE WHEN s.plagiarism_score IS NOT NULL THEN s.plagiarism_score END), 2) AS avg_plagiarism_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title HAVING COUNT(s.plagiarism_score) > 0 ORDER BY avg_plagiarism_score DESC, a.id ASC;
```

### ✅ PASS : EDUCATION_056 - Join results
```sql
SELECT e.exam_name, u.full_name, er.obtained_marks FROM exam_results er JOIN exams e ON er.exam_id = e.id JOIN users u ON er.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;
```

### ✅ PASS : EDUCATION_056 - CTE results
```sql
WITH result_base AS (SELECT exam_id, student_user_id, obtained_marks FROM exam_results) SELECT e.exam_name, u.full_name, rb.obtained_marks FROM result_base rb JOIN exams e ON rb.exam_id = e.id JOIN users u ON rb.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;
```

### ✅ PASS : EDUCATION_056 - Subquery base
```sql
SELECT e.exam_name, u.full_name, r.obtained_marks FROM (SELECT exam_id, student_user_id, obtained_marks FROM exam_results) r JOIN exams e ON r.exam_id = e.id JOIN users u ON r.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;
```

### ✅ PASS : EDUCATION_057 - Group views
```sql
SELECT mv.user_id, COUNT(*) AS total_materials_viewed FROM material_views mv GROUP BY mv.user_id ORDER BY total_materials_viewed DESC, mv.user_id ASC;
```

### ✅ PASS : EDUCATION_057 - Count material ids
```sql
SELECT mv.user_id, COUNT(mv.material_id) AS total_materials_viewed FROM material_views mv GROUP BY mv.user_id ORDER BY total_materials_viewed DESC, mv.user_id ASC;
```

### ✅ PASS : EDUCATION_057 - CTE view counts
```sql
WITH view_counts AS (SELECT user_id, COUNT(*) AS total_materials_viewed FROM material_views GROUP BY user_id) SELECT user_id, total_materials_viewed FROM view_counts ORDER BY total_materials_viewed DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_058 - Join avg progress
```sql
SELECT lm.offering_id, ROUND(AVG(mv.progress_percent), 2) AS avg_progress_percent FROM learning_materials lm JOIN material_views mv ON lm.id = mv.material_id WHERE mv.progress_percent IS NOT NULL GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;
```

### ✅ PASS : EDUCATION_058 - CTE progress
```sql
WITH valid_views AS (SELECT material_id, progress_percent FROM material_views WHERE progress_percent IS NOT NULL) SELECT lm.offering_id, ROUND(AVG(v.progress_percent), 2) AS avg_progress_percent FROM learning_materials lm JOIN valid_views v ON lm.id = v.material_id GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;
```

### ✅ PASS : EDUCATION_058 - CASE avg
```sql
SELECT lm.offering_id, ROUND(AVG(CASE WHEN mv.progress_percent IS NOT NULL THEN mv.progress_percent END), 2) AS avg_progress_percent FROM learning_materials lm JOIN material_views mv ON lm.id = mv.material_id GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;
```

### ✅ PASS : EDUCATION_059 - Group teacher avg
```sql
SELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating FROM student_feedback sf WHERE sf.teacher_user_id IS NOT NULL GROUP BY sf.teacher_user_id ORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_059 - CTE teacher avg
```sql
WITH teacher_feedback AS (SELECT teacher_user_id, rating_value FROM student_feedback WHERE teacher_user_id IS NOT NULL) SELECT teacher_user_id, ROUND(AVG(rating_value), 2) AS avg_feedback_rating FROM teacher_feedback GROUP BY teacher_user_id ORDER BY avg_feedback_rating DESC, teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_059 - Join teachers
```sql
SELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY sf.teacher_user_id ORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_060 - Sum open invoices
```sql
SELECT fi.student_user_id, ROUND(SUM(fi.total_amount), 2) AS outstanding_amount FROM fee_invoices fi WHERE fi.invoice_status IN ('open', 'overdue', 'partial') GROUP BY fi.student_user_id ORDER BY outstanding_amount DESC, fi.student_user_id ASC;
```

### ✅ PASS : EDUCATION_060 - CTE outstanding
```sql
WITH outstanding_invoices AS (SELECT student_user_id, total_amount FROM fee_invoices WHERE invoice_status IN ('open', 'overdue', 'partial')) SELECT student_user_id, ROUND(SUM(total_amount), 2) AS outstanding_amount FROM outstanding_invoices GROUP BY student_user_id ORDER BY outstanding_amount DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_060 - CASE with HAVING
```sql
SELECT fi.student_user_id, ROUND(SUM(CASE WHEN fi.invoice_status IN ('open', 'overdue', 'partial') THEN fi.total_amount ELSE 0 END), 2) AS outstanding_amount FROM fee_invoices fi GROUP BY fi.student_user_id HAVING SUM(CASE WHEN fi.invoice_status IN ('open', 'overdue', 'partial') THEN fi.total_amount ELSE 0 END) > 0 ORDER BY outstanding_amount DESC, fi.student_user_id ASC;
```

### ✅ PASS : EDUCATION_061 - Row number
```sql
SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL ORDER BY cgpa_rank ASC LIMIT 10;
```

### ✅ PASS : EDUCATION_061 - CTE rank
```sql
WITH ranked_students AS (SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL) SELECT user_id, admission_number, cgpa, cgpa_rank FROM ranked_students ORDER BY cgpa_rank ASC LIMIT 10;
```

### ✅ PASS : EDUCATION_061 - Subquery rank
```sql
SELECT user_id, admission_number, cgpa, cgpa_rank FROM (SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL) s ORDER BY cgpa_rank ASC LIMIT 10;
```

### ✅ PASS : EDUCATION_062 - Rank filter
```sql
SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5 ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_062 - CTE top ranks
```sql
WITH top_rankers AS (SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5) SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM top_rankers ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_062 - Subquery ranks
```sql
SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM (SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5) r ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_063 - Running sum
```sql
SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM payments WHERE payment_status = 'successful' ORDER BY paid_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_063 - CTE running
```sql
WITH successful_payments AS (SELECT id, paid_at, paid_amount FROM payments WHERE payment_status = 'successful') SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM successful_payments ORDER BY paid_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_063 - Window in subquery
```sql
SELECT id, paid_at, paid_amount, running_total_collection FROM (SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM payments WHERE payment_status = 'successful') p ORDER BY paid_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_064 - LAG score
```sql
SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score FROM exam_results ORDER BY student_user_id ASC, exam_id ASC;
```

### ✅ PASS : EDUCATION_064 - CTE lag
```sql
WITH scored_exams AS (SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score FROM exam_results) SELECT student_user_id, exam_id, obtained_marks, previous_score FROM scored_exams ORDER BY student_user_id ASC, exam_id ASC;
```

### ✅ PASS : EDUCATION_064 - Self join prev
```sql
SELECT er1.student_user_id, er1.exam_id, er1.obtained_marks, er2.obtained_marks AS previous_score FROM exam_results er1 LEFT JOIN exam_results er2 ON er1.student_user_id = er2.student_user_id AND er2.exam_id = (SELECT MAX(er3.exam_id) FROM exam_results er3 WHERE er3.student_user_id = er1.student_user_id AND er3.exam_id < er1.exam_id) ORDER BY er1.student_user_id ASC, er1.exam_id ASC;
```

### ✅ PASS : EDUCATION_065 - LEAD due
```sql
SELECT offering_id, id AS assignment_id, due_at, LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at FROM assignments ORDER BY offering_id ASC, due_at ASC, id ASC;
```

### ✅ PASS : EDUCATION_065 - CTE next due
```sql
WITH assignment_order AS (SELECT offering_id, id AS assignment_id, due_at, LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at FROM assignments) SELECT offering_id, assignment_id, due_at, next_due_at FROM assignment_order ORDER BY offering_id ASC, due_at ASC, assignment_id ASC;
```

### ✅ PASS : EDUCATION_065 - Self join next
```sql
SELECT a1.offering_id, a1.id AS assignment_id, a1.due_at, a2.due_at AS next_due_at FROM assignments a1 LEFT JOIN assignments a2 ON a2.id = (SELECT a3.id FROM assignments a3 WHERE a3.offering_id = a1.offering_id AND (a3.due_at > a1.due_at OR (a3.due_at = a1.due_at AND a3.id > a1.id)) ORDER BY a3.due_at ASC, a3.id ASC LIMIT 1) ORDER BY a1.offering_id ASC, a1.due_at ASC, a1.id ASC;
```

### ✅ PASS : EDUCATION_066 - Rank enrollments
```sql
SELECT term_id, id AS offering_id, enrolled_count, RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;
```

### ✅ PASS : EDUCATION_066 - Dense rank
```sql
SELECT term_id, id AS offering_id, enrolled_count, DENSE_RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;
```

### ✅ PASS : EDUCATION_066 - CTE rank
```sql
WITH ranked_offerings AS (SELECT term_id, id AS offering_id, enrolled_count, RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings) SELECT term_id, offering_id, enrolled_count, enrollment_rank FROM ranked_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;
```

### ✅ PASS : EDUCATION_067 - Moving avg
```sql
SELECT student_user_id, assignment_id, obtained_marks, ROUND(AVG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL ORDER BY student_user_id ASC, submitted_at ASC;
```

### ✅ PASS : EDUCATION_067 - CTE moving
```sql
WITH scored_submissions AS (SELECT student_user_id, assignment_id, obtained_marks, submitted_at FROM assignment_submissions WHERE obtained_marks IS NOT NULL) SELECT student_user_id, assignment_id, obtained_marks, ROUND(AVG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_score FROM scored_submissions ORDER BY student_user_id ASC, submitted_at ASC;
```

### ✅ PASS : EDUCATION_067 - Self avg
```sql
WITH numbered AS (SELECT student_user_id, assignment_id, obtained_marks, submitted_at, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC, assignment_id ASC) AS rn FROM assignment_submissions WHERE obtained_marks IS NOT NULL) SELECT n1.student_user_id, n1.assignment_id, n1.obtained_marks, ROUND(AVG(n2.obtained_marks), 2) AS moving_avg_score FROM numbered n1 JOIN numbered n2 ON n1.student_user_id = n2.student_user_id AND n2.rn BETWEEN n1.rn - 2 AND n1.rn GROUP BY n1.student_user_id, n1.assignment_id, n1.obtained_marks, n1.submitted_at, n1.rn ORDER BY n1.student_user_id ASC, n1.submitted_at ASC;
```

### ✅ PASS : EDUCATION_068 - Dense salary rank
```sql
SELECT department_id, user_id, salary_monthly, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL ORDER BY department_id ASC, salary_rank ASC, user_id ASC;
```

### ✅ PASS : EDUCATION_068 - Rank salary
```sql
SELECT department_id, user_id, salary_monthly, RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL ORDER BY department_id ASC, salary_rank ASC, user_id ASC;
```

### ✅ PASS : EDUCATION_068 - CTE salary rank
```sql
WITH ranked_teachers AS (SELECT department_id, user_id, salary_monthly, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL) SELECT department_id, user_id, salary_monthly, salary_rank FROM ranked_teachers ORDER BY department_id ASC, salary_rank ASC, user_id ASC;
```

### ✅ PASS : EDUCATION_069 - Percent rank
```sql
SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL ORDER BY cgpa_percentile DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_069 - CTE percentile
```sql
WITH ranked_students AS (SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL) SELECT user_id, cgpa, cgpa_percentile FROM ranked_students ORDER BY cgpa_percentile DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_069 - Subquery percentile
```sql
SELECT user_id, cgpa, cgpa_percentile FROM (SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL) r ORDER BY cgpa_percentile DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_070 - Cumulative count
```sql
SELECT offering_id, session_date, COUNT(*) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions ORDER BY offering_id ASC, session_date ASC;
```

### ✅ PASS : EDUCATION_070 - Running count sum
```sql
SELECT offering_id, session_date, SUM(1) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions ORDER BY offering_id ASC, session_date ASC;
```

### ✅ PASS : EDUCATION_070 - CTE cumulative
```sql
WITH session_running AS (SELECT offering_id, session_date, COUNT(*) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions) SELECT offering_id, session_date, cumulative_sessions FROM session_running ORDER BY offering_id ASC, session_date ASC;
```

### ✅ PASS : EDUCATION_071 - Distinct missing
```sql
SELECT DISTINCT s.student_user_id FROM assignment_submissions s WHERE s.submission_status = 'missing' ORDER BY s.student_user_id ASC;
```

### ✅ PASS : EDUCATION_071 - Group having
```sql
SELECT s.student_user_id FROM assignment_submissions s WHERE s.submission_status = 'missing' GROUP BY s.student_user_id HAVING COUNT(*) >= 1 ORDER BY s.student_user_id ASC;
```

### ✅ PASS : EDUCATION_071 - CTE missing
```sql
WITH missing_students AS (SELECT DISTINCT student_user_id FROM assignment_submissions WHERE submission_status = 'missing') SELECT student_user_id FROM missing_students ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_072 - Join avg
```sql
SELECT e.student_user_id, e.offering_id, e.final_score FROM enrollments e JOIN (SELECT offering_id, AVG(final_score) AS avg_score FROM enrollments WHERE final_score IS NOT NULL GROUP BY offering_id) avg_scores ON e.offering_id = avg_scores.offering_id WHERE e.final_score > avg_scores.avg_score ORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;
```

### ✅ PASS : EDUCATION_072 - CTE avg
```sql
WITH offering_avg AS (SELECT offering_id, AVG(final_score) AS avg_score FROM enrollments WHERE final_score IS NOT NULL GROUP BY offering_id) SELECT e.student_user_id, e.offering_id, e.final_score FROM enrollments e JOIN offering_avg oa ON e.offering_id = oa.offering_id WHERE e.final_score > oa.avg_score ORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;
```

### ✅ PASS : EDUCATION_072 - Window avg
```sql
SELECT student_user_id, offering_id, final_score FROM (SELECT student_user_id, offering_id, final_score, AVG(final_score) OVER (PARTITION BY offering_id) AS avg_score FROM enrollments WHERE final_score IS NOT NULL) e WHERE final_score > avg_score ORDER BY offering_id ASC, final_score DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_073 - Distinct depts
```sql
SELECT co.primary_teacher_id AS teacher_user_id, COUNT(DISTINCT c.department_id) AS department_count FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL GROUP BY co.primary_teacher_id HAVING COUNT(DISTINCT c.department_id) > 1 ORDER BY department_count DESC, teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_073 - CTE dept count
```sql
WITH teacher_departments AS (SELECT co.primary_teacher_id AS teacher_user_id, COUNT(DISTINCT c.department_id) AS department_count FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL GROUP BY co.primary_teacher_id) SELECT teacher_user_id, department_count FROM teacher_departments WHERE department_count > 1 ORDER BY department_count DESC, teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_073 - Teacher-course pairs
```sql
SELECT teacher_user_id, COUNT(DISTINCT department_id) AS department_count FROM (SELECT co.primary_teacher_id AS teacher_user_id, c.department_id FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL) t GROUP BY teacher_user_id HAVING COUNT(DISTINCT department_id) > 1 ORDER BY department_count DESC, teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_074 - Lag + bool_and
```sql
WITH score_changes AS ( SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results ) SELECT student_user_id FROM score_changes GROUP BY student_user_id HAVING BOOL_AND(prev_score IS NULL OR obtained_marks > prev_score) ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_074 - CTE failures
```sql
WITH score_changes AS (SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results), non_improvers AS (SELECT DISTINCT student_user_id FROM score_changes WHERE prev_score IS NOT NULL AND obtained_marks <= prev_score) SELECT DISTINCT student_user_id FROM score_changes WHERE student_user_id NOT IN (SELECT student_user_id FROM non_improvers) ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_074 - Group counts
```sql
WITH score_changes AS (SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results) SELECT student_user_id FROM score_changes GROUP BY student_user_id HAVING COUNT(*) FILTER (WHERE prev_score IS NOT NULL AND obtained_marks <= prev_score) = 0 ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_075 - Case sum
```sql
SELECT ar.student_user_id FROM attendance_records ar GROUP BY ar.student_user_id HAVING SUM(CASE WHEN ar.attendance_status = 'absent' THEN 1 ELSE 0 END) = 0 ORDER BY ar.student_user_id ASC;
```

### ✅ PASS : EDUCATION_075 - Filter count
```sql
SELECT ar.student_user_id FROM attendance_records ar GROUP BY ar.student_user_id HAVING COUNT(*) FILTER (WHERE ar.attendance_status = 'absent') = 0 ORDER BY ar.student_user_id ASC;
```

### ✅ PASS : EDUCATION_075 - Except absent
```sql
SELECT DISTINCT student_user_id FROM attendance_records EXCEPT SELECT DISTINCT student_user_id FROM attendance_records WHERE attendance_status = 'absent' ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_076 - CTE compare
```sql
WITH student_totals AS ( SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id ), program_avg AS ( SELECT program_id, AVG(total_paid) AS avg_paid FROM student_totals GROUP BY program_id ) SELECT st.student_user_id, st.program_id, st.total_paid FROM student_totals st JOIN program_avg pa ON st.program_id = pa.program_id WHERE st.total_paid > pa.avg_paid ORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;
```

### ✅ PASS : EDUCATION_076 - Nested subqueries
```sql
SELECT st.student_user_id, st.program_id, st.total_paid FROM (SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id) st JOIN (SELECT program_id, AVG(total_paid) AS avg_paid FROM (SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id) x GROUP BY program_id) pa ON st.program_id = pa.program_id WHERE st.total_paid > pa.avg_paid ORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;
```

### ✅ PASS : EDUCATION_076 - Window avg fixed
```sql
WITH student_totals AS (SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id) SELECT student_user_id, program_id, total_paid FROM (SELECT student_user_id, program_id, total_paid, AVG(total_paid) OVER (PARTITION BY program_id) AS avg_paid FROM student_totals WHERE program_id IS NOT NULL) t WHERE total_paid > avg_paid ORDER BY program_id ASC, total_paid DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_077 - Row number top
```sql
WITH teacher_ratings AS ( SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id ), ranked_teachers AS ( SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rn FROM teacher_ratings ) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM ranked_teachers WHERE rn = 1 ORDER BY department_id ASC;
```

### ✅ PASS : EDUCATION_077 - Rank top
```sql
WITH teacher_ratings AS (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id), ranked_teachers AS (SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rnk FROM teacher_ratings) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM ranked_teachers WHERE rnk = 1 ORDER BY department_id ASC;
```

### ✅ PASS : EDUCATION_077 - Max with tie-break
```sql
WITH teacher_ratings AS (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id), max_ratings AS (SELECT department_id, MAX(avg_rating) AS max_avg_rating FROM teacher_ratings GROUP BY department_id), top_teachers AS (SELECT tr.department_id, MIN(tr.teacher_user_id) AS teacher_user_id FROM teacher_ratings tr JOIN max_ratings mr ON tr.department_id = mr.department_id AND tr.avg_rating = mr.max_avg_rating GROUP BY tr.department_id) SELECT tr.department_id, tr.teacher_user_id, ROUND(tr.avg_rating, 2) AS avg_rating FROM teacher_ratings tr JOIN top_teachers tt ON tr.department_id = tt.department_id AND tr.teacher_user_id = tt.teacher_user_id ORDER BY tr.department_id ASC;
```

### ✅ PASS : EDUCATION_078 - Ratio filter
```sql
SELECT id AS offering_id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count > enrolled_count * 0.2 ORDER BY waitlist_count DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_078 - Divide ratio
```sql
SELECT id AS offering_id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count::numeric / enrolled_count > 0.2 ORDER BY waitlist_count DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_078 - CTE pressure
```sql
WITH pressured_offerings AS (SELECT id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count > enrolled_count * 0.2) SELECT id AS offering_id, enrolled_count, waitlist_count FROM pressured_offerings ORDER BY waitlist_count DESC, offering_id ASC;
```

### ✅ PASS : EDUCATION_079 - Counts compare
```sql
WITH offering_assignment_counts AS ( SELECT offering_id, COUNT(*) AS total_assignments FROM assignments GROUP BY offering_id ), student_submission_counts AS ( SELECT e.student_user_id, a.offering_id, COUNT(DISTINCT s.assignment_id) AS submitted_count FROM enrollments e JOIN assignments a ON e.offering_id = a.offering_id LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY e.student_user_id, a.offering_id ) SELECT ssc.student_user_id, ssc.offering_id FROM student_submission_counts ssc JOIN offering_assignment_counts oac ON ssc.offering_id = oac.offering_id WHERE ssc.submitted_count = oac.total_assignments ORDER BY ssc.offering_id ASC, ssc.student_user_id ASC;
```

### ✅ PASS : EDUCATION_079 - Group having
```sql
SELECT e.student_user_id, e.offering_id FROM enrollments e JOIN assignments a ON e.offering_id = a.offering_id LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY e.student_user_id, e.offering_id HAVING COUNT(DISTINCT a.id) = COUNT(DISTINCT s.assignment_id) ORDER BY e.offering_id ASC, e.student_user_id ASC;
```

### ✅ PASS : EDUCATION_079 - Exists with assignments
```sql
SELECT e.student_user_id, e.offering_id FROM enrollments e WHERE EXISTS (SELECT 1 FROM assignments a WHERE a.offering_id = e.offering_id) AND NOT EXISTS ( SELECT 1 FROM assignments a WHERE a.offering_id = e.offering_id AND NOT EXISTS ( SELECT 1 FROM assignment_submissions s WHERE s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') ) ) ORDER BY e.offering_id ASC, e.student_user_id ASC;
```

### ✅ PASS : EDUCATION_080 - Join revenue
```sql
SELECT c.department_id, ROUND(SUM(p.paid_amount), 2) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id ORDER BY total_revenue DESC, c.department_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_080 - CTE dept revenue
```sql
WITH dept_revenue AS (SELECT c.department_id, SUM(p.paid_amount) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id) SELECT department_id, ROUND(total_revenue, 2) AS total_revenue FROM dept_revenue ORDER BY total_revenue DESC, department_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_080 - Subquery top 5
```sql
SELECT department_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT c.department_id, SUM(p.paid_amount) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id) d ORDER BY total_revenue DESC, department_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_081 - Join program avg
```sql
WITH program_avg_cgpa AS (SELECT program_id, AVG(cgpa) AS avg_cgpa FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL GROUP BY program_id) SELECT sp.user_id, sp.program_id, sp.cgpa FROM student_profiles sp JOIN program_avg_cgpa pag ON sp.program_id = pag.program_id WHERE sp.cgpa IS NOT NULL AND sp.cgpa > pag.avg_cgpa ORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;
```

### ✅ PASS : EDUCATION_081 - Window avg
```sql
SELECT user_id, program_id, cgpa FROM (SELECT user_id, program_id, cgpa, AVG(cgpa) OVER (PARTITION BY program_id) AS avg_cgpa FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL) s WHERE cgpa > avg_cgpa ORDER BY program_id ASC, cgpa DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_081 - Correlated avg
```sql
SELECT sp.user_id, sp.program_id, sp.cgpa FROM student_profiles sp WHERE sp.program_id IS NOT NULL AND sp.cgpa IS NOT NULL AND sp.cgpa > (SELECT AVG(sp2.cgpa) FROM student_profiles sp2 WHERE sp2.program_id = sp.program_id AND sp2.cgpa IS NOT NULL) ORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;
```

### ✅ PASS : EDUCATION_082 - Group failed
```sql
SELECT student_user_id, COUNT(*) AS failed_exam_count FROM exam_results WHERE grade_letter = 'F' GROUP BY student_user_id HAVING COUNT(*) > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_082 - CTE fails
```sql
WITH failed_exams AS (SELECT student_user_id FROM exam_results WHERE grade_letter = 'F') SELECT student_user_id, COUNT(*) AS failed_exam_count FROM failed_exams GROUP BY student_user_id HAVING COUNT(*) > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_082 - Case count
```sql
SELECT student_user_id, COUNT(*) FILTER (WHERE grade_letter = 'F') AS failed_exam_count FROM exam_results GROUP BY student_user_id HAVING COUNT(*) FILTER (WHERE grade_letter = 'F') > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_083 - Compare dept avg
```sql
WITH teacher_avg AS ( SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id ), department_avg AS ( SELECT department_id, AVG(avg_rating) AS dept_avg_rating FROM teacher_avg GROUP BY department_id ) SELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating FROM teacher_avg ta JOIN department_avg da ON ta.department_id = da.department_id WHERE ta.avg_rating > da.dept_avg_rating ORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_083 - Window compare
```sql
WITH teacher_avg AS (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM (SELECT department_id, teacher_user_id, avg_rating, AVG(avg_rating) OVER (PARTITION BY department_id) AS dept_avg_rating FROM teacher_avg) t WHERE avg_rating > dept_avg_rating ORDER BY department_id ASC, avg_rating DESC, teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_083 - Nested subqueries
```sql
SELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating FROM (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id) ta JOIN (SELECT department_id, AVG(avg_rating) AS dept_avg_rating FROM (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id) x GROUP BY department_id) da ON ta.department_id = da.department_id WHERE ta.avg_rating > da.dept_avg_rating ORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_084 - Expected vs actual
```sql
WITH offering_assignments AS ( SELECT offering_id, COUNT(*) AS total_assignments FROM assignments GROUP BY offering_id ), enrolled_students AS ( SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ), required_submissions AS ( SELECT oa.offering_id, oa.total_assignments * es.total_students AS expected_submissions FROM offering_assignments oa JOIN enrolled_students es ON oa.offering_id = es.offering_id ), actual_submissions AS ( SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id ) SELECT rs.offering_id FROM required_submissions rs JOIN actual_submissions ac ON rs.offering_id = ac.offering_id WHERE rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;
```

### ✅ PASS : EDUCATION_084 - Nested counts
```sql
SELECT rs.offering_id FROM (SELECT a.offering_id, COUNT(*) * es.total_students AS expected_submissions FROM assignments a JOIN (SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id) es ON a.offering_id = es.offering_id GROUP BY a.offering_id, es.total_students) rs JOIN (SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id) ac ON rs.offering_id = ac.offering_id WHERE rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;
```

### ✅ PASS : EDUCATION_084 - HAVING counts
```sql
SELECT rs.offering_id FROM (SELECT a.offering_id, COUNT(*) * es.total_students AS expected_submissions FROM assignments a JOIN (SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id) es ON a.offering_id = es.offering_id GROUP BY a.offering_id, es.total_students) rs JOIN (SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id) ac ON rs.offering_id = ac.offering_id GROUP BY rs.offering_id, rs.expected_submissions, ac.actual_submissions HAVING rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;
```

### ✅ PASS : EDUCATION_085 - Left join none
```sql
SELECT DISTINCT fi.student_user_id FROM fee_invoices fi LEFT JOIN payments p ON fi.id = p.invoice_id AND p.payment_status = 'successful' WHERE p.id IS NULL ORDER BY fi.student_user_id ASC;
```

### ✅ PASS : EDUCATION_085 - Not exists
```sql
SELECT DISTINCT fi.student_user_id FROM fee_invoices fi WHERE NOT EXISTS (SELECT 1 FROM payments p WHERE p.invoice_id = fi.id AND p.payment_status = 'successful') ORDER BY fi.student_user_id ASC;
```

### ✅ PASS : EDUCATION_085 - Group payments
```sql
SELECT DISTINCT student_user_id FROM (SELECT fi.student_user_id, fi.id AS invoice_id, COUNT(*) FILTER (WHERE p.payment_status = 'successful') AS successful_payments FROM fee_invoices fi LEFT JOIN payments p ON fi.id = p.invoice_id GROUP BY fi.student_user_id, fi.id HAVING COUNT(*) FILTER (WHERE p.payment_status = 'successful') = 0) unpaid_invoices ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_086 - Overlap self join
```sql
SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id AND t1.start_time < t2.end_time AND t2.start_time < t1.end_time WHERE t1.classroom_id IS NOT NULL ORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;
```

### ✅ PASS : EDUCATION_086 - CTE compare
```sql
WITH slot_pairs AS (SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2, t1.start_time AS start_1, t1.end_time AS end_1, t2.start_time AS start_2, t2.end_time AS end_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id WHERE t1.classroom_id IS NOT NULL) SELECT classroom_id, weekday_no, slot_id_1, slot_id_2 FROM slot_pairs WHERE start_1 < end_2 AND start_2 < end_1 ORDER BY classroom_id ASC, weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;
```

### ✅ PASS : EDUCATION_086 - Range compare
```sql
SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id WHERE t1.classroom_id IS NOT NULL AND NOT (t1.end_time <= t2.start_time OR t2.end_time <= t1.start_time) ORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;
```

### ✅ PASS : EDUCATION_087 - Teacher overlap
```sql
WITH teacher_slots AS ( SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id ) SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id AND ts1.start_time < ts2.end_time AND ts2.start_time < ts1.end_time ORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;
```

### ✅ PASS : EDUCATION_087 - CTE pairs
```sql
WITH teacher_slots AS (SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id), slot_pairs AS (SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2, ts1.start_time AS start_1, ts1.end_time AS end_1, ts2.start_time AS start_2, ts2.end_time AS end_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id) SELECT teacher_user_id, weekday_no, slot_id_1, slot_id_2 FROM slot_pairs WHERE start_1 < end_2 AND start_2 < end_1 ORDER BY teacher_user_id ASC, weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;
```

### ✅ PASS : EDUCATION_087 - Non-overlap negation
```sql
WITH teacher_slots AS (SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id) SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id WHERE NOT (ts1.end_time <= ts2.start_time OR ts2.end_time <= ts1.start_time) ORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;
```

### ✅ PASS : EDUCATION_088 - Split averages
```sql
WITH scored_exams AS ( SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL ), split_scores AS ( SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM scored_exams GROUP BY student_user_id ) SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM split_scores WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_088 - CTE split
```sql
WITH scored_exams AS (SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL), half_avgs AS (SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM scored_exams GROUP BY student_user_id) SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM half_avgs WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_088 - Nested split
```sql
SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM (SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM (SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL) s GROUP BY student_user_id) x WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_089 - Filter count
```sql
SELECT program_id FROM student_profiles WHERE program_id IS NOT NULL GROUP BY program_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE enrollment_status = 'active') ORDER BY program_id ASC;
```

### ✅ PASS : EDUCATION_089 - Case count
```sql
SELECT program_id FROM student_profiles WHERE program_id IS NOT NULL GROUP BY program_id HAVING COUNT(*) = SUM(CASE WHEN enrollment_status = 'active' THEN 1 ELSE 0 END) ORDER BY program_id ASC;
```

### ✅ PASS : EDUCATION_089 - Not exists nonactive
```sql
SELECT DISTINCT sp1.program_id FROM student_profiles sp1 WHERE sp1.program_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM student_profiles sp2 WHERE sp2.program_id = sp1.program_id AND sp2.enrollment_status <> 'active') ORDER BY sp1.program_id ASC;
```

### ✅ PASS : EDUCATION_090 - Join averages
```sql
WITH assignment_avg AS ( SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL GROUP BY student_user_id ), exam_avg AS ( SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY student_user_id ) SELECT aa.student_user_id, ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score, ROUND(ea.avg_exam_score, 2) AS avg_exam_score FROM assignment_avg aa JOIN exam_avg ea ON aa.student_user_id = ea.student_user_id WHERE aa.avg_assignment_score > ea.avg_exam_score ORDER BY avg_assignment_score DESC, aa.student_user_id ASC;
```

### ✅ PASS : EDUCATION_090 - Nested averages
```sql
SELECT aa.student_user_id, ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score, ROUND(ea.avg_exam_score, 2) AS avg_exam_score FROM (SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL GROUP BY student_user_id) aa JOIN (SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY student_user_id) ea ON aa.student_user_id = ea.student_user_id WHERE aa.avg_assignment_score > ea.avg_exam_score ORDER BY avg_assignment_score DESC, aa.student_user_id ASC;
```

### ✅ PASS : EDUCATION_090 - Avg from unions
```sql
WITH combined_scores AS (SELECT student_user_id, obtained_marks, 'assignment' AS score_type FROM assignment_submissions WHERE obtained_marks IS NOT NULL UNION ALL SELECT student_user_id, obtained_marks, 'exam' AS score_type FROM exam_results WHERE obtained_marks IS NOT NULL), scored AS (SELECT student_user_id, AVG(CASE WHEN score_type = 'assignment' THEN obtained_marks END) AS avg_assignment_score, AVG(CASE WHEN score_type = 'exam' THEN obtained_marks END) AS avg_exam_score FROM combined_scores GROUP BY student_user_id) SELECT student_user_id, ROUND(avg_assignment_score, 2) AS avg_assignment_score, ROUND(avg_exam_score, 2) AS avg_exam_score FROM scored WHERE avg_assignment_score > avg_exam_score ORDER BY avg_assignment_score DESC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_091 - Row number top 3
```sql
WITH ranked_students AS ( SELECT user_id, program_id, cgpa, ROW_NUMBER() OVER (PARTITION BY program_id ORDER BY cgpa DESC, user_id ASC) AS rn FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL ) SELECT user_id, program_id, cgpa FROM ranked_students WHERE rn <= 3 ORDER BY program_id ASC, cgpa DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_091 - Rank top 3
```sql
WITH ranked_students AS ( SELECT user_id, program_id, cgpa, RANK() OVER (PARTITION BY program_id ORDER BY cgpa DESC, user_id ASC) AS rnk FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL ) SELECT user_id, program_id, cgpa FROM ranked_students WHERE rnk <= 3 ORDER BY program_id ASC, cgpa DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_091 - Correlated top 3
```sql
SELECT sp1.user_id, sp1.program_id, sp1.cgpa FROM student_profiles sp1 WHERE sp1.program_id IS NOT NULL AND sp1.cgpa IS NOT NULL AND (SELECT COUNT(*) FROM student_profiles sp2 WHERE sp2.program_id = sp1.program_id AND sp2.cgpa IS NOT NULL AND (sp2.cgpa > sp1.cgpa OR (sp2.cgpa = sp1.cgpa AND sp2.user_id < sp1.user_id))) < 3 ORDER BY sp1.program_id ASC, sp1.cgpa DESC, sp1.user_id ASC;
```

### ✅ PASS : EDUCATION_092 - Month sum
```sql
SELECT DATE_TRUNC('month', paid_at) AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ORDER BY collection_month ASC;
```

### ✅ PASS : EDUCATION_092 - CTE monthly
```sql
WITH monthly_collection AS (SELECT DATE_TRUNC('month', paid_at) AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at)) SELECT collection_month, total_collection FROM monthly_collection ORDER BY collection_month ASC;
```

### ✅ PASS : EDUCATION_092 - Extract then make date
```sql
SELECT MAKE_DATE(EXTRACT(YEAR FROM paid_at)::int, EXTRACT(MONTH FROM paid_at)::int, 1)::timestamp AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY EXTRACT(YEAR FROM paid_at), EXTRACT(MONTH FROM paid_at) ORDER BY collection_month ASC;
```

### ✅ PASS : EDUCATION_093 - Filter pass rate
```sql
SELECT e.offering_id, ROUND(100.0 * COUNT(*) FILTER (WHERE e.final_grade_letter IS NOT NULL AND e.final_grade_letter <> 'F') / COUNT(*), 2) AS pass_rate FROM enrollments e WHERE e.enrollment_status = 'completed' GROUP BY e.offering_id HAVING COUNT(*) > 0 ORDER BY pass_rate DESC, e.offering_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_093 - Case pass rate
```sql
SELECT e.offering_id, ROUND(100.0 * SUM(CASE WHEN e.final_grade_letter IS NOT NULL AND e.final_grade_letter <> 'F' THEN 1 ELSE 0 END) / COUNT(*), 2) AS pass_rate FROM enrollments e WHERE e.enrollment_status = 'completed' GROUP BY e.offering_id HAVING COUNT(*) > 0 ORDER BY pass_rate DESC, e.offering_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_093 - CTE pass totals
```sql
WITH offering_results AS (SELECT offering_id, COUNT(*) AS total_students, COUNT(*) FILTER (WHERE final_grade_letter IS NOT NULL AND final_grade_letter <> 'F') AS passed_students FROM enrollments WHERE enrollment_status = 'completed' GROUP BY offering_id) SELECT offering_id, ROUND(100.0 * passed_students / total_students, 2) AS pass_rate FROM offering_results WHERE total_students > 0 ORDER BY pass_rate DESC, offering_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_094 - Lag attendance
```sql
WITH attendance_history AS ( SELECT student_user_id, offering_id, attendance_percentage, completion_date, LAG(attendance_percentage) OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS previous_attendance FROM enrollments WHERE attendance_percentage IS NOT NULL ) SELECT student_user_id, offering_id, attendance_percentage, previous_attendance FROM attendance_history WHERE previous_attendance IS NOT NULL AND attendance_percentage < previous_attendance ORDER BY student_user_id ASC, offering_id ASC;
```

### ✅ PASS : EDUCATION_094 - CTE previous row
```sql
WITH ordered_enrollments AS (SELECT student_user_id, offering_id, attendance_percentage, completion_date, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS rn FROM enrollments WHERE attendance_percentage IS NOT NULL) SELECT e1.student_user_id, e1.offering_id, e1.attendance_percentage, e2.attendance_percentage AS previous_attendance FROM ordered_enrollments e1 JOIN ordered_enrollments e2 ON e1.student_user_id = e2.student_user_id AND e1.rn = e2.rn + 1 WHERE e1.attendance_percentage < e2.attendance_percentage ORDER BY e1.student_user_id ASC, e1.offering_id ASC;
```

### ✅ PASS : EDUCATION_094 - Subquery previous
```sql
WITH ordered_enrollments AS (SELECT student_user_id, offering_id, attendance_percentage, completion_date, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS rn FROM enrollments WHERE attendance_percentage IS NOT NULL) SELECT e1.student_user_id, e1.offering_id, e1.attendance_percentage, (SELECT e2.attendance_percentage FROM ordered_enrollments e2 WHERE e2.student_user_id = e1.student_user_id AND e2.rn = e1.rn - 1) AS previous_attendance FROM ordered_enrollments e1 WHERE (SELECT e2.attendance_percentage FROM ordered_enrollments e2 WHERE e2.student_user_id = e1.student_user_id AND e2.rn = e1.rn - 1) IS NOT NULL AND e1.attendance_percentage < (SELECT e2.attendance_percentage FROM ordered_enrollments e2 WHERE e2.student_user_id = e1.student_user_id AND e2.rn = e1.rn - 1) ORDER BY e1.student_user_id ASC, e1.offering_id ASC;
```

### ✅ PASS : EDUCATION_095 - Count offerings
```sql
SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id ORDER BY total_offerings DESC, teacher_user_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_095 - CTE workloads
```sql
WITH teacher_workload AS (SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id) SELECT teacher_user_id, total_offerings FROM teacher_workload ORDER BY total_offerings DESC, teacher_user_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_095 - Dense rank top
```sql
WITH teacher_workload AS (SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id) SELECT teacher_user_id, total_offerings FROM (SELECT teacher_user_id, total_offerings, DENSE_RANK() OVER (ORDER BY total_offerings DESC, teacher_user_id ASC) AS workload_rank FROM teacher_workload) t WHERE workload_rank <= 5 ORDER BY total_offerings DESC, teacher_user_id ASC;
```

### ✅ PASS : EDUCATION_096 - Lag failures
```sql
WITH exam_failures AS ( SELECT student_user_id, exam_id, grade_letter, LAG(grade_letter) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_grade FROM exam_results ) SELECT DISTINCT student_user_id FROM exam_failures WHERE grade_letter = 'F' AND previous_grade = 'F' ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_096 - Row number self join
```sql
WITH ordered_results AS (SELECT student_user_id, exam_id, grade_letter, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn FROM exam_results) SELECT DISTINCT r1.student_user_id FROM ordered_results r1 JOIN ordered_results r2 ON r1.student_user_id = r2.student_user_id AND r1.rn = r2.rn + 1 WHERE r1.grade_letter = 'F' AND r2.grade_letter = 'F' ORDER BY r1.student_user_id ASC;
```

### ✅ PASS : EDUCATION_096 - Grouped fail pairs
```sql
WITH exam_failures AS (SELECT student_user_id, exam_id, grade_letter, LAG(grade_letter) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_grade FROM exam_results) SELECT student_user_id FROM exam_failures GROUP BY student_user_id HAVING COUNT(*) FILTER (WHERE grade_letter = 'F' AND previous_grade = 'F') > 0 ORDER BY student_user_id ASC;
```

### ✅ PASS : EDUCATION_097 - Revenue per student
```sql
WITH program_revenue AS ( SELECT sp.program_id, SUM(p.paid_amount) AS total_revenue, COUNT(DISTINCT sp.user_id) AS total_students FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY sp.program_id ) SELECT program_id, ROUND(total_revenue / NULLIF(total_students, 0), 2) AS revenue_per_student FROM program_revenue ORDER BY revenue_per_student DESC, program_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_097 - Direct ratio
```sql
SELECT sp.program_id, ROUND(SUM(p.paid_amount) / NULLIF(COUNT(DISTINCT sp.user_id), 0), 2) AS revenue_per_student FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY sp.program_id ORDER BY revenue_per_student DESC, sp.program_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_097 - Split totals
```sql
WITH paid_students AS (SELECT sp.program_id, sp.user_id, p.paid_amount FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful'), program_totals AS (SELECT program_id, SUM(paid_amount) AS total_revenue FROM paid_students GROUP BY program_id), program_students AS (SELECT program_id, COUNT(DISTINCT user_id) AS total_students FROM paid_students GROUP BY program_id) SELECT pt.program_id, ROUND(pt.total_revenue / NULLIF(ps.total_students, 0), 2) AS revenue_per_student FROM program_totals pt JOIN program_students ps ON pt.program_id = ps.program_id ORDER BY revenue_per_student DESC, pt.program_id ASC LIMIT 5;
```

### ✅ PASS : EDUCATION_098 - Sum view time
```sql
SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id ORDER BY total_view_time DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : EDUCATION_098 - CTE engagement
```sql
WITH user_engagement AS (SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id) SELECT user_id, total_view_time FROM user_engagement ORDER BY total_view_time DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : EDUCATION_098 - Rank view time
```sql
WITH user_engagement AS (SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id) SELECT user_id, total_view_time FROM (SELECT user_id, total_view_time, ROW_NUMBER() OVER (ORDER BY total_view_time DESC, user_id ASC) AS rn FROM user_engagement) t WHERE rn <= 10 ORDER BY total_view_time DESC, user_id ASC;
```

### ✅ PASS : EDUCATION_099 - Top dept avg
```sql
SELECT tp.department_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_score FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id ORDER BY avg_feedback_score DESC, tp.department_id ASC LIMIT 1;
```

### ✅ PASS : EDUCATION_099 - CTE dept scores
```sql
WITH department_scores AS (SELECT tp.department_id, AVG(sf.rating_value) AS avg_feedback_score FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id) SELECT department_id, ROUND(avg_feedback_score, 2) AS avg_feedback_score FROM department_scores ORDER BY avg_feedback_score DESC, department_id ASC LIMIT 1;
```

### ✅ PASS : EDUCATION_100 - Variance compare
```sql
WITH student_variance AS ( SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id ), program_avg_variance AS ( SELECT program_id, AVG(attendance_variance) AS avg_variance FROM student_variance GROUP BY program_id ) SELECT sv.student_user_id, sv.program_id, ROUND(sv.attendance_variance, 2) AS attendance_variance FROM student_variance sv JOIN program_avg_variance pav ON sv.program_id = pav.program_id WHERE sv.attendance_variance < pav.avg_variance ORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;
```

### ✅ PASS : EDUCATION_100 - Window avg variance
```sql
WITH student_variance AS (SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id) SELECT student_user_id, program_id, ROUND(attendance_variance, 2) AS attendance_variance FROM (SELECT student_user_id, program_id, attendance_variance, AVG(attendance_variance) OVER (PARTITION BY program_id) AS avg_variance FROM student_variance WHERE program_id IS NOT NULL) t WHERE attendance_variance < avg_variance ORDER BY program_id ASC, ROUND(attendance_variance, 2) ASC, student_user_id ASC;
```

### ✅ PASS : EDUCATION_100 - Nested compare
```sql
SELECT sv.student_user_id, sv.program_id, ROUND(sv.attendance_variance, 2) AS attendance_variance FROM (SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id) sv JOIN (SELECT program_id, AVG(attendance_variance) AS avg_variance FROM (SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id) x GROUP BY program_id) pav ON sv.program_id = pav.program_id WHERE sv.attendance_variance < pav.avg_variance ORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;
```

