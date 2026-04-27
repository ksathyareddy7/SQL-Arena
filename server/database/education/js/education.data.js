import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("education");

export const tableDescriptions = {
  academic_terms:
    "Academic periods such as semesters, quarters, years, and batches",
  app_events:
    "Product analytics events across learning, attendance, exams, billing, and communication",
  assignment_submissions:
    "Student submissions, grading, plagiarism, and feedback details",
  assignments:
    "Assessments such as homework, projects, quizzes, labs, and essays",
  attendance_records: "Per-student attendance status for each session",
  attendance_sessions: "Individual teaching sessions for attendance tracking",
  campuses: "Physical or logical campuses belonging to institutions",
  classrooms: "Rooms, labs, halls, and other physical learning spaces",
  course_offerings:
    "Term-specific course sections with capacity, teacher assignment, and lifecycle state",
  course_prerequisites:
    "Prerequisite and co-requisite dependencies between courses",
  course_teachers: "Additional teaching staff mapped to course offerings",
  courses:
    "Course master data for core subjects, electives, labs, projects, and workshops",
  departments: "Academic and administrative departments within institutions",
  discussion_posts: "Replies and nested discussion messages inside threads",
  discussion_threads:
    "Course discussion forums, doubt threads, and announcements",
  enrollments:
    "Student registration status and final outcomes for each course offering",
  exam_results: "Student marks, ranks, grades, and result publication states",
  exams:
    "Exam schedule and configuration data for internal and external assessments",
  fee_invoices: "Invoices raised against student fee assignments",
  fee_plans:
    "Standard fee templates for tuition, hostel, transport, exams, and other charges",
  guardian_relationships: "Links students to guardians and emergency contacts",
  institutions:
    "Top-level educational organizations such as schools, colleges, universities, and edtech institutes",
  learning_materials:
    "Course resources such as PDFs, videos, notes, links, and datasets",
  material_views: "Learner engagement metrics for study materials",
  payments:
    "Payment transactions for education invoices including refunds and failures",
  programs: "Programs such as BTech, MBA, Grade 10, certificates, or bootcamps",
  scholarships:
    "Scholarship programs for merit, need-based, sports, and special categories",
  student_fee_assignments:
    "Actual fee amounts assigned to students, including discounts and scholarships",
  student_feedback:
    "Student evaluations of teaching, content, support, and infrastructure",
  student_profiles: "Student-specific academic and admission attributes",
  subjects: "Subject catalog used to group courses by discipline",
  support_tickets:
    "Operational support tickets for enrollment, exam, content, login, and payment issues",
  teacher_profiles:
    "Teacher employment, department, experience, and quality-related data",
  timetable_slots: "Recurring class, lab, and office-hour schedule slots",
  users:
    "Platform users including students, teachers, guardians, admins, and staff",
};

export const questions = [
  {
    app_id: appId,
    code: "EDUCATION_001",
    title: "Total Institutions Count",
    description: "Find the total number of institutions in the platform.",
    difficulty: "easy",
    expected_query: "SELECT COUNT(*) AS total_institutions FROM institutions;",
    solution_columns: ["total_institutions"],
    tables: ["institutions"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "EDUCATION_002",
    title: "Active Campuses Count",
    description: "Find the total number of active campuses.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS active_campuses FROM campuses WHERE is_active = true;",
    solution_columns: ["active_campuses"],
    tables: ["campuses"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "EDUCATION_003",
    title: "List Active Academic Terms",
    description:
      "List all active academic terms with their term name and academic year.",
    difficulty: "easy",
    expected_query:
      "SELECT term_name, academic_year FROM academic_terms WHERE status = 'active' ORDER BY academic_year ASC, term_name ASC;",
    solution_columns: ["term_name", "academic_year"],
    tables: ["academic_terms"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "academic_year", direction: "asc" },
        { column: "term_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_004",
    title: "Students With Active Enrollment Status",
    description: "Find all students whose enrollment status is active.",
    difficulty: "easy",
    expected_query:
      "SELECT user_id, admission_number, enrollment_status FROM student_profiles WHERE enrollment_status = 'active' ORDER BY user_id ASC;",
    solution_columns: ["user_id", "admission_number", "enrollment_status"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_005",
    title: "Teachers Hired Most Recently",
    description: "Find the 10 most recently hired teachers.",
    difficulty: "easy",
    expected_query:
      "SELECT user_id, employee_code, hire_date FROM teacher_profiles WHERE hire_date IS NOT NULL ORDER BY hire_date DESC, user_id ASC LIMIT 10;",
    solution_columns: ["user_id", "employee_code", "hire_date"],
    tables: ["teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "hire_date", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_006",
    title: "Courses With Mandatory Flag",
    description:
      "List all mandatory active courses with their title and credit value.",
    difficulty: "easy",
    expected_query:
      "SELECT id, course_title, credit_value FROM courses WHERE is_mandatory = true AND is_active = true ORDER BY course_title ASC, id ASC;",
    solution_columns: ["id", "course_title", "credit_value"],
    tables: ["courses"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "course_title", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_007",
    title: "Large Classrooms",
    description: "Find classrooms that can seat at least 100 students.",
    difficulty: "easy",
    expected_query:
      "SELECT id, campus_id, room_name, seating_capacity FROM classrooms WHERE seating_capacity >= 100 ORDER BY seating_capacity DESC, id ASC;",
    solution_columns: ["id", "campus_id", "room_name", "seating_capacity"],
    tables: ["classrooms"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "seating_capacity", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_008",
    title: "Upcoming Assignments",
    description: "List assignments ordered by earliest due date.",
    difficulty: "easy",
    expected_query:
      "SELECT id, offering_id, assignment_title, due_at FROM assignments ORDER BY due_at ASC, id ASC;",
    solution_columns: ["id", "offering_id", "assignment_title", "due_at"],
    tables: ["assignments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "due_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_009",
    title: "Successful Payments",
    description:
      "Find all successful payments with invoice id and paid amount.",
    difficulty: "easy",
    expected_query:
      "SELECT id, invoice_id, paid_amount, paid_at FROM payments WHERE payment_status = 'successful' ORDER BY paid_at DESC, id ASC;",
    solution_columns: ["id", "invoice_id", "paid_amount", "paid_at"],
    tables: ["payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "paid_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_010",
    title: "Open Support Tickets",
    description: "Find all support tickets that are currently open.",
    difficulty: "easy",
    expected_query:
      "SELECT id, institution_id, user_id, issue_type, priority FROM support_tickets WHERE ticket_status = 'open' ORDER BY priority ASC, id ASC;",
    solution_columns: [
      "id",
      "institution_id",
      "user_id",
      "issue_type",
      "priority",
    ],
    tables: ["support_tickets"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "priority", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_011",
    title: "Total Users By Role",
    description: "Find the total number of users for each user role.",
    difficulty: "easy",
    expected_query:
      "SELECT user_role, COUNT(*) AS total_users FROM users GROUP BY user_role ORDER BY total_users DESC, user_role ASC;",
    solution_columns: ["user_role", "total_users"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_users", direction: "desc" },
        { column: "user_role", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_012",
    title: "Programs By Level",
    description: "Count how many programs exist for each program level.",
    difficulty: "easy",
    expected_query:
      "SELECT program_level, COUNT(*) AS total_programs FROM programs GROUP BY program_level ORDER BY total_programs DESC, program_level ASC;",
    solution_columns: ["program_level", "total_programs"],
    tables: ["programs"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_programs", direction: "desc" },
        { column: "program_level", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_013",
    title: "Average Classroom Capacity By Type",
    description: "Find the average seating capacity for each classroom type.",
    difficulty: "easy",
    expected_query:
      "SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity FROM classrooms GROUP BY room_type ORDER BY avg_capacity DESC, room_type ASC;",
    solution_columns: ["room_type", "avg_capacity"],
    tables: ["classrooms"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_capacity", direction: "desc" },
        { column: "room_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_014",
    title: "Students Per Enrollment Status",
    description: "Count students by enrollment status.",
    difficulty: "easy",
    expected_query:
      "SELECT enrollment_status, COUNT(*) AS total_students FROM student_profiles GROUP BY enrollment_status ORDER BY total_students DESC, enrollment_status ASC;",
    solution_columns: ["enrollment_status", "total_students"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_students", direction: "desc" },
        { column: "enrollment_status", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_015",
    title: "Assignments By Type",
    description: "Count how many assignments exist for each assignment type.",
    difficulty: "easy",
    expected_query:
      "SELECT assignment_type, COUNT(*) AS total_assignments FROM assignments GROUP BY assignment_type ORDER BY total_assignments DESC, assignment_type ASC;",
    solution_columns: ["assignment_type", "total_assignments"],
    tables: ["assignments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_assignments", direction: "desc" },
        { column: "assignment_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_016",
    title: "Average Teacher Rating By Employment Type",
    description: "Find the average teacher rating for each employment type.",
    difficulty: "easy",
    expected_query:
      "SELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating FROM teacher_profiles WHERE rating_score IS NOT NULL GROUP BY employment_type ORDER BY avg_rating DESC, employment_type ASC;",
    solution_columns: ["employment_type", "avg_rating"],
    tables: ["teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_rating", direction: "desc" },
        { column: "employment_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_017",
    title: "Fee Plans By Category",
    description: "Count the number of fee plans in each fee category.",
    difficulty: "easy",
    expected_query:
      "SELECT fee_category, COUNT(*) AS total_fee_plans FROM fee_plans GROUP BY fee_category ORDER BY total_fee_plans DESC, fee_category ASC;",
    solution_columns: ["fee_category", "total_fee_plans"],
    tables: ["fee_plans"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_fee_plans", direction: "desc" },
        { column: "fee_category", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_018",
    title: "Total Paid Amount By Payment Method",
    description:
      "Find the total successful paid amount for each payment method.",
    difficulty: "easy",
    expected_query:
      "SELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY total_paid_amount DESC, payment_method ASC;",
    solution_columns: ["payment_method", "total_paid_amount"],
    tables: ["payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_paid_amount", direction: "desc" },
        { column: "payment_method", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_019",
    title: "Support Tickets By Priority",
    description: "Count support tickets by priority.",
    difficulty: "easy",
    expected_query:
      "SELECT priority, COUNT(*) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC, priority ASC;",
    solution_columns: ["priority", "total_tickets"],
    tables: ["support_tickets"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_tickets", direction: "desc" },
        { column: "priority", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_020",
    title: "Average Assignment Score",
    description:
      "Find the average obtained marks across graded assignment submissions.",
    difficulty: "easy",
    expected_query:
      "SELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks FROM assignment_submissions WHERE obtained_marks IS NOT NULL;",
    solution_columns: ["avg_obtained_marks"],
    tables: ["assignment_submissions"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "EDUCATION_021",
    title: "Students With Above Average CGPA",
    description:
      "Find students whose CGPA is above the average CGPA of all students.",
    difficulty: "easy",
    expected_query:
      "SELECT user_id, admission_number, cgpa FROM student_profiles WHERE cgpa > (SELECT AVG(cgpa) FROM student_profiles WHERE cgpa IS NOT NULL) ORDER BY cgpa DESC, user_id ASC;",
    solution_columns: ["user_id", "admission_number", "cgpa"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "cgpa", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_022",
    title: "Courses With High Credits",
    description: "Find all courses having credit value greater than 4.",
    difficulty: "easy",
    expected_query:
      "SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4 ORDER BY credit_value DESC, id ASC;",
    solution_columns: ["id", "course_title", "credit_value"],
    tables: ["courses"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "credit_value", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_023",
    title: "Assignments Allowing Late Submission",
    description: "Find all assignments where late submissions are allowed.",
    difficulty: "easy",
    expected_query:
      "SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission = true ORDER BY due_at ASC, id ASC;",
    solution_columns: ["id", "assignment_title", "due_at", "max_late_days"],
    tables: ["assignments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "due_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_024",
    title: "Upcoming Exams",
    description: "Find all exams scheduled for future dates.",
    difficulty: "easy",
    expected_query:
      "SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date > CURRENT_DATE ORDER BY exam_date ASC, id ASC;",
    solution_columns: ["id", "exam_name", "exam_date", "exam_type"],
    tables: ["exams"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "exam_date", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_025",
    title: "Published Results Count",
    description: "Count the number of published exam results.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS published_results FROM exam_results WHERE result_status = 'published';",
    solution_columns: ["published_results"],
    tables: ["exam_results"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "EDUCATION_026",
    title: "Completed Learning Materials",
    description: "Find all material view records that are fully completed.",
    difficulty: "easy",
    expected_query:
      "SELECT material_id, user_id, progress_percent FROM material_views WHERE completed = true ORDER BY progress_percent DESC, material_id ASC;",
    solution_columns: ["material_id", "user_id", "progress_percent"],
    tables: ["material_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "progress_percent", direction: "desc" },
        { column: "material_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_027",
    title: "Pinned Discussion Threads",
    description: "Find all pinned discussion threads.",
    difficulty: "easy",
    expected_query:
      "SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned = true ORDER BY created_at DESC, id ASC;",
    solution_columns: ["id", "offering_id", "thread_title", "created_at"],
    tables: ["discussion_threads"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_028",
    title: "Active Scholarships",
    description: "Find all currently active scholarships.",
    difficulty: "easy",
    expected_query:
      "SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active = true ORDER BY amount_value DESC, id ASC;",
    solution_columns: [
      "id",
      "scholarship_name",
      "scholarship_type",
      "amount_value",
    ],
    tables: ["scholarships"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "amount_value", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_029",
    title: "Overdue Fee Invoices",
    description: "Find all unpaid overdue invoices.",
    difficulty: "easy",
    expected_query:
      "SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status = 'overdue' ORDER BY due_date ASC, id ASC;",
    solution_columns: [
      "id",
      "student_user_id",
      "invoice_number",
      "total_amount",
      "due_date",
    ],
    tables: ["fee_invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "due_date", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_030",
    title: "Recent App Events",
    description: "Find the 20 most recent app events.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, event_name, event_category, event_time FROM app_events ORDER BY event_time DESC, id ASC LIMIT 20;",
    solution_columns: [
      "id",
      "user_id",
      "event_name",
      "event_category",
      "event_time",
    ],
    tables: ["app_events"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "event_time", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_031",
    title: "Course Enrollment Count",
    description:
      "Find the total number of enrolled students for each course offering.",
    difficulty: "easy",
    expected_query:
      "SELECT offering_id, COUNT(*) AS enrolled_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ORDER BY enrolled_students DESC, offering_id ASC;",
    solution_columns: ["offering_id", "enrolled_students"],
    tables: ["enrollments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "enrolled_students", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_032",
    title: "Average Attendance By Course",
    description:
      "Find the average attendance percentage for each course offering.",
    difficulty: "easy",
    expected_query:
      "SELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance FROM enrollments WHERE attendance_percentage IS NOT NULL GROUP BY offering_id ORDER BY avg_attendance DESC, offering_id ASC;",
    solution_columns: ["offering_id", "avg_attendance"],
    tables: ["enrollments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_attendance", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_033",
    title: "Exam Count By Type",
    description: "Count the number of exams for each exam type.",
    difficulty: "easy",
    expected_query:
      "SELECT exam_type, COUNT(*) AS total_exams FROM exams GROUP BY exam_type ORDER BY total_exams DESC, exam_type ASC;",
    solution_columns: ["exam_type", "total_exams"],
    tables: ["exams"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_exams", direction: "desc" },
        { column: "exam_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_034",
    title: "Average Exam Score By Exam",
    description: "Find the average obtained marks for each exam.",
    difficulty: "easy",
    expected_query:
      "SELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY exam_id ORDER BY avg_score DESC, exam_id ASC;",
    solution_columns: ["exam_id", "avg_score"],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_score", direction: "desc" },
        { column: "exam_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_035",
    title: "Support Tickets By Issue Type",
    description: "Count the number of support tickets for each issue type.",
    difficulty: "easy",
    expected_query:
      "SELECT issue_type, COUNT(*) AS total_tickets FROM support_tickets GROUP BY issue_type ORDER BY total_tickets DESC, issue_type ASC;",
    solution_columns: ["issue_type", "total_tickets"],
    tables: ["support_tickets"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_tickets", direction: "desc" },
        { column: "issue_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_036",
    title: "Average Payment Amount",
    description: "Find the average paid amount of successful payments.",
    difficulty: "easy",
    expected_query:
      "SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful';",
    solution_columns: ["avg_paid_amount"],
    tables: ["payments"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "EDUCATION_037",
    title: "Course Offerings By Status",
    description: "Count course offerings by their current status.",
    difficulty: "easy",
    expected_query:
      "SELECT course_status, COUNT(*) AS total_offerings FROM course_offerings GROUP BY course_status ORDER BY total_offerings DESC, course_status ASC;",
    solution_columns: ["course_status", "total_offerings"],
    tables: ["course_offerings"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_offerings", direction: "desc" },
        { column: "course_status", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_038",
    title: "Teacher Count By Department",
    description: "Find the number of teachers in each department.",
    difficulty: "easy",
    expected_query:
      "SELECT department_id, COUNT(*) AS total_teachers FROM teacher_profiles WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_teachers DESC, department_id ASC;",
    solution_columns: ["department_id", "total_teachers"],
    tables: ["teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_teachers", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_039",
    title: "Material Count By Type",
    description: "Count learning materials by material type.",
    difficulty: "easy",
    expected_query:
      "SELECT material_type, COUNT(*) AS total_materials FROM learning_materials GROUP BY material_type ORDER BY total_materials DESC, material_type ASC;",
    solution_columns: ["material_type", "total_materials"],
    tables: ["learning_materials"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_materials", direction: "desc" },
        { column: "material_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_040",
    title: "Average Feedback Rating By Category",
    description:
      "Find the average student feedback rating for each feedback category.",
    difficulty: "easy",
    expected_query:
      "SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating FROM student_feedback GROUP BY feedback_category ORDER BY avg_rating DESC, feedback_category ASC;",
    solution_columns: ["feedback_category", "avg_rating"],
    tables: ["student_feedback"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_rating", direction: "desc" },
        { column: "feedback_category", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_041",
    title: "Student Names With Program",
    description:
      "Find all active students along with their enrolled program name.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id AS user_id, u.full_name, p.program_name FROM student_profiles sp JOIN users u ON sp.user_id = u.id LEFT JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' ORDER BY u.id ASC;",
    solution_columns: ["user_id", "full_name", "program_name"],
    tables: ["student_profiles", "users", "programs"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_042",
    title: "Teachers And Their Departments",
    description: "Find all teachers with their department names.",
    difficulty: "medium",
    expected_query:
      "SELECT tp.user_id, u.full_name, d.department_name FROM teacher_profiles tp JOIN users u ON tp.user_id = u.id LEFT JOIN departments d ON tp.department_id = d.id ORDER BY tp.user_id ASC;",
    solution_columns: ["user_id", "full_name", "department_name"],
    tables: ["teacher_profiles", "users", "departments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_043",
    title: "Course Offerings With Teacher",
    description:
      "Find all course offerings with course title and primary teacher name.",
    difficulty: "medium",
    expected_query:
      "SELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM course_offerings co JOIN courses c ON co.course_id = c.id LEFT JOIN users u ON co.primary_teacher_id = u.id ORDER BY co.id ASC;",
    solution_columns: ["offering_id", "course_title", "teacher_name"],
    tables: ["course_offerings", "courses", "users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "offering_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_044",
    title: "Students Per Program",
    description: "Find the number of active students in each program.",
    difficulty: "medium",
    expected_query:
      "SELECT p.program_name, COUNT(*) AS total_students FROM student_profiles sp JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' GROUP BY p.program_name ORDER BY total_students DESC, p.program_name ASC;",
    solution_columns: ["program_name", "total_students"],
    tables: ["student_profiles", "programs"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_students", direction: "desc" },
        { column: "program_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_045",
    title: "Students With Low Attendance",
    description: "Find students whose attendance percentage is below 75.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id AS user_id, u.full_name, sp.attendance_percentage FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE sp.attendance_percentage < 75 ORDER BY sp.attendance_percentage ASC, u.id ASC;",
    solution_columns: ["user_id", "full_name", "attendance_percentage"],
    tables: ["student_profiles", "users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "attendance_percentage", direction: "asc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_046",
    title: "Average Score By Assignment",
    description: "Find the average submission score for each assignment.",
    difficulty: "medium",
    expected_query:
      "SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.obtained_marks IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;",
    solution_columns: ["assignment_id", "assignment_title", "avg_score"],
    tables: ["assignments", "assignment_submissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_score", direction: "desc" },
        { column: "assignment_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_047",
    title: "Pass Count By Exam",
    description: "Find how many students passed each exam.",
    difficulty: "medium",
    expected_query:
      "SELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students FROM exams e JOIN exam_results er ON e.id = er.exam_id WHERE er.grade_letter IS NOT NULL AND er.grade_letter <> 'F' GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;",
    solution_columns: ["exam_id", "exam_name", "passed_students"],
    tables: ["exams", "exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "passed_students", direction: "desc" },
        { column: "exam_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_048",
    title: "Fee Collected By Program",
    description: "Find total successful fee payments collected per program.",
    difficulty: "medium",
    expected_query:
      "SELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected FROM payments pay JOIN fee_invoices fi ON pay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id WHERE pay.payment_status = 'successful' GROUP BY p.program_name ORDER BY total_collected DESC, p.program_name ASC;",
    solution_columns: ["program_name", "total_collected"],
    tables: ["payments", "fee_invoices", "student_profiles", "programs"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_collected", direction: "desc" },
        { column: "program_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_049",
    title: "Course Offerings Near Capacity",
    description:
      "Find course offerings where enrolled students have reached at least 90 percent of seat limit.",
    difficulty: "medium",
    expected_query:
      "SELECT id AS offering_id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count >= seat_limit * 0.9 ORDER BY enrolled_count DESC, id ASC;",
    solution_columns: ["offering_id", "seat_limit", "enrolled_count"],
    tables: ["course_offerings"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "enrolled_count", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_050",
    title: "Discussion Posts Per Thread",
    description: "Find total number of posts in each discussion thread.",
    difficulty: "medium",
    expected_query:
      "SELECT dt.id AS thread_id, dt.thread_title, COUNT(dp.id) AS total_posts FROM discussion_threads dt LEFT JOIN discussion_posts dp ON dt.id = dp.thread_id GROUP BY dt.id, dt.thread_title ORDER BY total_posts DESC, dt.id ASC;",
    solution_columns: ["thread_id", "thread_title", "total_posts"],
    tables: ["discussion_threads", "discussion_posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_posts", direction: "desc" },
        { column: "thread_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_051",
    title: "Students With Primary Guardian",
    description:
      "Find all students along with the name of their primary guardian.",
    difficulty: "medium",
    expected_query:
      "SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM guardian_relationships gr JOIN users su ON gr.student_user_id = su.id JOIN users gu ON gr.guardian_user_id = gu.id WHERE gr.is_primary = true ORDER BY su.id ASC;",
    solution_columns: ["student_user_id", "student_name", "guardian_name"],
    tables: ["guardian_relationships", "users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_052",
    title: "Attendance Sessions Per Offering",
    description:
      "Find the total number of attendance sessions held for each course offering.",
    difficulty: "medium",
    expected_query:
      "SELECT offering_id, COUNT(*) AS total_sessions FROM attendance_sessions GROUP BY offering_id ORDER BY total_sessions DESC, offering_id ASC;",
    solution_columns: ["offering_id", "total_sessions"],
    tables: ["attendance_sessions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_sessions", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_053",
    title: "Present Count Per Student",
    description: "Find how many times each student was marked present.",
    difficulty: "medium",
    expected_query:
      "SELECT ar.student_user_id, COUNT(*) AS present_count FROM attendance_records ar WHERE ar.attendance_status = 'present' GROUP BY ar.student_user_id ORDER BY present_count DESC, ar.student_user_id ASC;",
    solution_columns: ["student_user_id", "present_count"],
    tables: ["attendance_records"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "present_count", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_054",
    title: "Late Submission Count Per Assignment",
    description:
      "Find the number of late submitted records for each assignment.",
    difficulty: "medium",
    expected_query:
      "SELECT a.id AS assignment_id, a.assignment_title, COUNT(s.id) AS late_submissions FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.submission_status = 'late_submitted' GROUP BY a.id, a.assignment_title ORDER BY late_submissions DESC, a.id ASC;",
    solution_columns: ["assignment_id", "assignment_title", "late_submissions"],
    tables: ["assignments", "assignment_submissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "late_submissions", direction: "desc" },
        { column: "assignment_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_055",
    title: "Average Plagiarism By Assignment",
    description: "Find the average plagiarism score for each assignment.",
    difficulty: "medium",
    expected_query:
      "SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.plagiarism_score IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_plagiarism_score DESC, a.id ASC;",
    solution_columns: [
      "assignment_id",
      "assignment_title",
      "avg_plagiarism_score",
    ],
    tables: ["assignments", "assignment_submissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_plagiarism_score", direction: "desc" },
        { column: "assignment_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_056",
    title: "Exam Results With Student Names",
    description:
      "List exam results with exam name, student name, and obtained marks.",
    difficulty: "medium",
    expected_query:
      "SELECT e.exam_name, u.full_name, er.obtained_marks FROM exam_results er JOIN exams e ON er.exam_id = e.id JOIN users u ON er.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;",
    solution_columns: ["exam_name", "full_name", "obtained_marks"],
    tables: ["exam_results", "exams", "users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "exam_name", direction: "asc" },
        { column: "full_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_057",
    title: "Material Views Per User",
    description:
      "Find the total number of learning materials viewed by each user.",
    difficulty: "medium",
    expected_query:
      "SELECT mv.user_id, COUNT(*) AS total_materials_viewed FROM material_views mv GROUP BY mv.user_id ORDER BY total_materials_viewed DESC, mv.user_id ASC;",
    solution_columns: ["user_id", "total_materials_viewed"],
    tables: ["material_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_materials_viewed", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_058",
    title: "Average Material Progress By Offering",
    description:
      "Find the average material completion progress for each course offering.",
    difficulty: "medium",
    expected_query:
      "SELECT lm.offering_id, ROUND(AVG(mv.progress_percent), 2) AS avg_progress_percent FROM learning_materials lm JOIN material_views mv ON lm.id = mv.material_id WHERE mv.progress_percent IS NOT NULL GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;",
    solution_columns: ["offering_id", "avg_progress_percent"],
    tables: ["learning_materials", "material_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_progress_percent", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_059",
    title: "Average Feedback Per Teacher",
    description: "Find the average feedback rating received by each teacher.",
    difficulty: "medium",
    expected_query:
      "SELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating FROM student_feedback sf WHERE sf.teacher_user_id IS NOT NULL GROUP BY sf.teacher_user_id ORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;",
    solution_columns: ["teacher_user_id", "avg_feedback_rating"],
    tables: ["student_feedback"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_feedback_rating", direction: "desc" },
        { column: "teacher_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_060",
    title: "Open Invoice Amount Per Student",
    description:
      "Find the total outstanding amount in open or overdue invoices for each student.",
    difficulty: "medium",
    expected_query:
      "SELECT fi.student_user_id, ROUND(SUM(fi.total_amount), 2) AS outstanding_amount FROM fee_invoices fi WHERE fi.invoice_status IN ('open', 'overdue', 'partial') GROUP BY fi.student_user_id ORDER BY outstanding_amount DESC, fi.student_user_id ASC;",
    solution_columns: ["student_user_id", "outstanding_amount"],
    tables: ["fee_invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "outstanding_amount", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_061",
    title: "Top Students By CGPA Rank",
    description: "Find the top 10 students ranked by CGPA using row numbers.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL ORDER BY cgpa_rank ASC LIMIT 10;",
    solution_columns: ["user_id", "admission_number", "cgpa", "cgpa_rank"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "cgpa_rank", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_062",
    title: "Top Exam Rankers",
    description: "Find the top 5 students with highest marks in each exam.",
    difficulty: "medium",
    expected_query:
      "SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5 ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;",
    solution_columns: [
      "exam_id",
      "student_user_id",
      "obtained_marks",
      "rank_in_exam",
    ],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "exam_id", direction: "asc" },
        { column: "rank_in_exam", direction: "asc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_063",
    title: "Running Fee Collection",
    description:
      "Find the running total of successful payments ordered by payment date.",
    difficulty: "medium",
    expected_query:
      "SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM payments WHERE payment_status = 'successful' ORDER BY paid_at ASC, id ASC;",
    solution_columns: [
      "id",
      "paid_at",
      "paid_amount",
      "running_total_collection",
    ],
    tables: ["payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "paid_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_064",
    title: "Previous Exam Score",
    description:
      "For each student, show current exam score along with previous exam score.",
    difficulty: "medium",
    expected_query:
      "SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score FROM exam_results ORDER BY student_user_id ASC, exam_id ASC;",
    solution_columns: [
      "student_user_id",
      "exam_id",
      "obtained_marks",
      "previous_score",
    ],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "student_user_id", direction: "asc" },
        { column: "exam_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_065",
    title: "Next Assignment Due",
    description:
      "For each assignment, show the next assignment due date within the same offering.",
    difficulty: "medium",
    expected_query:
      "SELECT offering_id, id AS assignment_id, due_at, LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at FROM assignments ORDER BY offering_id ASC, due_at ASC, id ASC;",
    solution_columns: ["offering_id", "assignment_id", "due_at", "next_due_at"],
    tables: ["assignments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "offering_id", direction: "asc" },
        { column: "due_at", direction: "asc" },
        { column: "assignment_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_066",
    title: "Top Courses By Enrollment Rank",
    description: "Rank course offerings by enrolled count within each term.",
    difficulty: "medium",
    expected_query:
      "SELECT term_id, id AS offering_id, enrolled_count, RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;",
    solution_columns: [
      "term_id",
      "offering_id",
      "enrolled_count",
      "enrollment_rank",
    ],
    tables: ["course_offerings"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "term_id", direction: "asc" },
        { column: "enrollment_rank", direction: "asc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_067",
    title: "Moving Average Assignment Score",
    description:
      "Find the moving average of assignment scores for each student over submission attempts.",
    difficulty: "medium",
    expected_query:
      "SELECT student_user_id, assignment_id, obtained_marks, ROUND(AVG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL ORDER BY student_user_id ASC, submitted_at ASC;",
    solution_columns: [
      "student_user_id",
      "assignment_id",
      "obtained_marks",
      "moving_avg_score",
    ],
    tables: ["assignment_submissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_068",
    title: "Department Wise Teacher Salary Rank",
    description: "Rank teachers by monthly salary within each department.",
    difficulty: "medium",
    expected_query:
      "SELECT department_id, user_id, salary_monthly, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL ORDER BY department_id ASC, salary_rank ASC, user_id ASC;",
    solution_columns: [
      "department_id",
      "user_id",
      "salary_monthly",
      "salary_rank",
    ],
    tables: ["teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "department_id", direction: "asc" },
        { column: "salary_rank", direction: "asc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_069",
    title: "Percentile Students By CGPA",
    description: "Calculate percentile rank of students based on CGPA.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL ORDER BY cgpa_percentile DESC, user_id ASC;",
    solution_columns: ["user_id", "cgpa", "cgpa_percentile"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "cgpa_percentile", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_070",
    title: "Cumulative Attendance Sessions",
    description: "Find cumulative attendance sessions conducted per offering.",
    difficulty: "medium",
    expected_query:
      "SELECT offering_id, session_date, COUNT(*) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions ORDER BY offering_id ASC, session_date ASC;",
    solution_columns: ["offering_id", "session_date", "cumulative_sessions"],
    tables: ["attendance_sessions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "offering_id", direction: "asc" },
        { column: "session_date", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_071",
    title: "Students Missing Assignments",
    description:
      "Find students who have at least one assignment marked as missing.",
    difficulty: "hard",
    expected_query:
      "SELECT DISTINCT s.student_user_id FROM assignment_submissions s WHERE s.submission_status = 'missing' ORDER BY s.student_user_id ASC;",
    solution_columns: ["student_user_id"],
    tables: ["assignment_submissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_072",
    title: "Students Scoring Above Course Average",
    description:
      "Find students whose final score is above the average score of their course offering.",
    difficulty: "hard",
    expected_query:
      "SELECT e.student_user_id, e.offering_id, e.final_score FROM enrollments e JOIN (SELECT offering_id, AVG(final_score) AS avg_score FROM enrollments WHERE final_score IS NOT NULL GROUP BY offering_id) avg_scores ON e.offering_id = avg_scores.offering_id WHERE e.final_score > avg_scores.avg_score ORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;",
    solution_columns: ["student_user_id", "offering_id", "final_score"],
    tables: ["enrollments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "offering_id", direction: "asc" },
        { column: "final_score", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_073",
    title: "Teachers Handling Multiple Departments",
    description:
      "Find teachers assigned to course offerings across more than one department.",
    difficulty: "hard",
    expected_query:
      "SELECT co.primary_teacher_id AS teacher_user_id, COUNT(DISTINCT c.department_id) AS department_count FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL GROUP BY co.primary_teacher_id HAVING COUNT(DISTINCT c.department_id) > 1 ORDER BY department_count DESC, teacher_user_id ASC;",
    solution_columns: ["teacher_user_id", "department_count"],
    tables: ["course_offerings", "courses"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "department_count", direction: "desc" },
        { column: "teacher_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_074",
    title: "Students Who Improved In Every Exam",
    description: "Find students whose score improved in every successive exam.",
    difficulty: "hard",
    expected_query:
      "WITH score_changes AS ( SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results ) SELECT student_user_id FROM score_changes GROUP BY student_user_id HAVING BOOL_AND(prev_score IS NULL OR obtained_marks > prev_score) ORDER BY student_user_id ASC;",
    solution_columns: ["student_user_id"],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_075",
    title: "Most Consistent Attendance Students",
    description: "Find students with no absent attendance records.",
    difficulty: "hard",
    expected_query:
      "SELECT ar.student_user_id FROM attendance_records ar GROUP BY ar.student_user_id HAVING SUM(CASE WHEN ar.attendance_status = 'absent' THEN 1 ELSE 0 END) = 0 ORDER BY ar.student_user_id ASC;",
    solution_columns: ["student_user_id"],
    tables: ["attendance_records"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_076",
    title: "Students Paying More Than Program Average",
    description:
      "Find students whose total successful payments exceed the average payment total of their program.",
    difficulty: "hard",
    expected_query:
      "WITH student_totals AS ( SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id ), program_avg AS ( SELECT program_id, AVG(total_paid) AS avg_paid FROM student_totals GROUP BY program_id ) SELECT st.student_user_id, st.program_id, st.total_paid FROM student_totals st JOIN program_avg pa ON st.program_id = pa.program_id WHERE st.total_paid > pa.avg_paid ORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;",
    solution_columns: ["student_user_id", "program_id", "total_paid"],
    tables: ["payments", "fee_invoices", "student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "program_id", direction: "asc" },
        { column: "total_paid", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_077",
    title: "Top Feedback Teachers Per Department",
    description: "Find the highest rated teacher in each department.",
    difficulty: "hard",
    expected_query:
      "WITH teacher_ratings AS ( SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id ), ranked_teachers AS ( SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rn FROM teacher_ratings ) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM ranked_teachers WHERE rn = 1 ORDER BY department_id ASC;",
    solution_columns: ["department_id", "teacher_user_id", "avg_rating"],
    tables: ["student_feedback", "teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "department_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_078",
    title: "Course Offerings With Waitlist Pressure",
    description:
      "Find course offerings where waitlist count exceeds 20 percent of enrolled count.",
    difficulty: "hard",
    expected_query:
      "SELECT id AS offering_id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count > enrolled_count * 0.2 ORDER BY waitlist_count DESC, offering_id ASC;",
    solution_columns: ["offering_id", "enrolled_count", "waitlist_count"],
    tables: ["course_offerings"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "waitlist_count", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_079",
    title: "Students With All Assignments Submitted",
    description:
      "Find students who submitted all assignments for their enrolled offerings.",
    difficulty: "hard",
    expected_query:
      "WITH offering_assignment_counts AS ( SELECT offering_id, COUNT(*) AS total_assignments FROM assignments GROUP BY offering_id ), student_submission_counts AS ( SELECT e.student_user_id, a.offering_id, COUNT(DISTINCT s.assignment_id) AS submitted_count FROM enrollments e JOIN assignments a ON e.offering_id = a.offering_id LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY e.student_user_id, a.offering_id ) SELECT ssc.student_user_id, ssc.offering_id FROM student_submission_counts ssc JOIN offering_assignment_counts oac ON ssc.offering_id = oac.offering_id WHERE ssc.submitted_count = oac.total_assignments ORDER BY ssc.offering_id ASC, ssc.student_user_id ASC;",
    solution_columns: ["student_user_id", "offering_id"],
    tables: ["enrollments", "assignments", "assignment_submissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "offering_id", direction: "asc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_080",
    title: "Departments With Highest Revenue",
    description: "Find the top 5 departments generating highest fee revenue.",
    difficulty: "hard",
    expected_query:
      "SELECT c.department_id, ROUND(SUM(p.paid_amount), 2) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id ORDER BY total_revenue DESC, c.department_id ASC LIMIT 5;",
    solution_columns: ["department_id", "total_revenue"],
    tables: [
      "payments",
      "fee_invoices",
      "student_profiles",
      "enrollments",
      "course_offerings",
      "courses",
    ],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_revenue", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_081",
    title: "Students Above Program CGPA Average",
    description:
      "Find students whose CGPA is above the average CGPA of their own program.",
    difficulty: "hard",
    expected_query:
      "WITH program_avg_cgpa AS ( SELECT program_id, AVG(cgpa) AS avg_cgpa FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL GROUP BY program_id ) SELECT sp.user_id, sp.program_id, sp.cgpa FROM student_profiles sp JOIN program_avg_cgpa pag ON sp.program_id = pag.program_id WHERE sp.cgpa IS NOT NULL AND sp.cgpa > pag.avg_cgpa ORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;",
    solution_columns: ["user_id", "program_id", "cgpa"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "program_id", direction: "asc" },
        { column: "cgpa", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_082",
    title: "Students Failing More Than One Exam",
    description: "Find students who failed more than one exam.",
    difficulty: "hard",
    expected_query:
      "SELECT student_user_id, COUNT(*) AS failed_exam_count FROM exam_results WHERE grade_letter = 'F' GROUP BY student_user_id HAVING COUNT(*) > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;",
    solution_columns: ["student_user_id", "failed_exam_count"],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "failed_exam_count", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_083",
    title: "Teachers With Above Department Average Rating",
    description:
      "Find teachers whose average feedback rating is above their department average teacher rating.",
    difficulty: "hard",
    expected_query:
      "WITH teacher_avg AS ( SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id ), department_avg AS ( SELECT department_id, AVG(avg_rating) AS dept_avg_rating FROM teacher_avg GROUP BY department_id ) SELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating FROM teacher_avg ta JOIN department_avg da ON ta.department_id = da.department_id WHERE ta.avg_rating > da.dept_avg_rating ORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;",
    solution_columns: ["department_id", "teacher_user_id", "avg_rating"],
    tables: ["student_feedback", "teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "department_id", direction: "asc" },
        { column: "avg_rating", direction: "desc" },
        { column: "teacher_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_084",
    title: "Offerings With Perfect Submission Rate",
    description:
      "Find course offerings where every enrolled student submitted every assignment.",
    difficulty: "hard",
    expected_query:
      "WITH offering_assignments AS ( SELECT offering_id, COUNT(*) AS total_assignments FROM assignments GROUP BY offering_id ), enrolled_students AS ( SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ), required_submissions AS ( SELECT oa.offering_id, oa.total_assignments * es.total_students AS expected_submissions FROM offering_assignments oa JOIN enrolled_students es ON oa.offering_id = es.offering_id ), actual_submissions AS ( SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id ) SELECT rs.offering_id FROM required_submissions rs JOIN actual_submissions ac ON rs.offering_id = ac.offering_id WHERE rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;",
    solution_columns: ["offering_id"],
    tables: ["assignments", "assignment_submissions", "enrollments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "offering_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_085",
    title: "Students With No Successful Payments",
    description:
      "Find students who have invoices but no successful payment records.",
    difficulty: "hard",
    expected_query:
      "SELECT DISTINCT fi.student_user_id FROM fee_invoices fi LEFT JOIN payments p ON fi.id = p.invoice_id AND p.payment_status = 'successful' WHERE p.id IS NULL ORDER BY fi.student_user_id ASC;",
    solution_columns: ["student_user_id"],
    tables: ["fee_invoices", "payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_086",
    title: "Classroom Schedule Conflicts",
    description:
      "Find classroom timetable pairs that overlap on the same weekday in the same classroom.",
    difficulty: "hard",
    expected_query:
      "SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id AND t1.start_time < t2.end_time AND t2.start_time < t1.end_time WHERE t1.classroom_id IS NOT NULL ORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
    solution_columns: ["classroom_id", "weekday_no", "slot_id_1", "slot_id_2"],
    tables: ["timetable_slots"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "classroom_id", direction: "asc" },
        { column: "weekday_no", direction: "asc" },
        { column: "slot_id_1", direction: "asc" },
        { column: "slot_id_2", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_087",
    title: "Teacher Schedule Conflicts",
    description:
      "Find teachers assigned to overlapping timetable slots on the same weekday.",
    difficulty: "hard",
    expected_query:
      "WITH teacher_slots AS ( SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id ) SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id AND ts1.start_time < ts2.end_time AND ts2.start_time < ts1.end_time ORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
    solution_columns: [
      "teacher_user_id",
      "weekday_no",
      "slot_id_1",
      "slot_id_2",
    ],
    tables: ["course_teachers", "timetable_slots"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "teacher_user_id", direction: "asc" },
        { column: "weekday_no", direction: "asc" },
        { column: "slot_id_1", direction: "asc" },
        { column: "slot_id_2", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_088",
    title: "Most Improved Students By Average Score",
    description:
      "Find students whose average exam score in later exams is greater than their average score in earlier exams.",
    difficulty: "hard",
    expected_query:
      "WITH scored_exams AS ( SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL ), split_scores AS ( SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM scored_exams GROUP BY student_user_id ) SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM split_scores WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;",
    solution_columns: ["student_user_id", "first_half_avg", "second_half_avg"],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "second_half_avg", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_089",
    title: "Programs With 100 Percent Active Students",
    description:
      "Find programs where all mapped students are currently active.",
    difficulty: "hard",
    expected_query:
      "SELECT program_id FROM student_profiles WHERE program_id IS NOT NULL GROUP BY program_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE enrollment_status = 'active') ORDER BY program_id ASC;",
    solution_columns: ["program_id"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "program_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_090",
    title: "Students With Higher Assignment Average Than Exam Average",
    description:
      "Find students whose average assignment score is higher than their average exam score.",
    difficulty: "hard",
    expected_query:
      "WITH assignment_avg AS ( SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL GROUP BY student_user_id ), exam_avg AS ( SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY student_user_id ) SELECT aa.student_user_id, ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score, ROUND(ea.avg_exam_score, 2) AS avg_exam_score FROM assignment_avg aa JOIN exam_avg ea ON aa.student_user_id = ea.student_user_id WHERE aa.avg_assignment_score > ea.avg_exam_score ORDER BY avg_assignment_score DESC, aa.student_user_id ASC;",
    solution_columns: [
      "student_user_id",
      "avg_assignment_score",
      "avg_exam_score",
    ],
    tables: ["assignment_submissions", "exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_assignment_score", direction: "desc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_091",
    title: "Top 3 Students Per Program By CGPA",
    description: "Find the top 3 students in each program based on CGPA.",
    difficulty: "hard",
    expected_query:
      "WITH ranked_students AS ( SELECT user_id, program_id, cgpa, ROW_NUMBER() OVER (PARTITION BY program_id ORDER BY cgpa DESC, user_id ASC) AS rn FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL ) SELECT user_id, program_id, cgpa FROM ranked_students WHERE rn <= 3 ORDER BY program_id ASC, cgpa DESC, user_id ASC;",
    solution_columns: ["user_id", "program_id", "cgpa"],
    tables: ["student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "program_id", direction: "asc" },
        { column: "cgpa", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_092",
    title: "Monthly Fee Collection Trend",
    description: "Find total successful fee collection for each month.",
    difficulty: "hard",
    expected_query:
      "SELECT DATE_TRUNC('month', paid_at) AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ORDER BY collection_month ASC;",
    solution_columns: ["collection_month", "total_collection"],
    tables: ["payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "collection_month", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_093",
    title: "Top 5 Courses By Pass Rate",
    description:
      "Find the top 5 course offerings with highest pass percentage.",
    difficulty: "hard",
    expected_query:
      "SELECT e.offering_id, ROUND(100.0 * COUNT(*) FILTER (WHERE e.final_grade_letter IS NOT NULL AND e.final_grade_letter <> 'F') / COUNT(*), 2) AS pass_rate FROM enrollments e WHERE e.enrollment_status = 'completed' GROUP BY e.offering_id HAVING COUNT(*) > 0 ORDER BY pass_rate DESC, e.offering_id ASC LIMIT 5;",
    solution_columns: ["offering_id", "pass_rate"],
    tables: ["enrollments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "pass_rate", direction: "desc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_094",
    title: "Students With Attendance Drop",
    description:
      "Find students whose latest attendance percentage is lower than their previous completed course.",
    difficulty: "hard",
    expected_query:
      "WITH attendance_history AS ( SELECT student_user_id, offering_id, attendance_percentage, completion_date, LAG(attendance_percentage) OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS previous_attendance FROM enrollments WHERE attendance_percentage IS NOT NULL ) SELECT student_user_id, offering_id, attendance_percentage, previous_attendance FROM attendance_history WHERE previous_attendance IS NOT NULL AND attendance_percentage < previous_attendance ORDER BY student_user_id ASC, offering_id ASC;",
    solution_columns: [
      "student_user_id",
      "offering_id",
      "attendance_percentage",
      "previous_attendance",
    ],
    tables: ["enrollments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "student_user_id", direction: "asc" },
        { column: "offering_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_095",
    title: "Teachers With Highest Workload",
    description:
      "Find top 5 teachers handling the highest number of distinct course offerings.",
    difficulty: "hard",
    expected_query:
      "SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id ORDER BY total_offerings DESC, teacher_user_id ASC LIMIT 5;",
    solution_columns: ["teacher_user_id", "total_offerings"],
    tables: ["course_teachers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_offerings", direction: "desc" },
        { column: "teacher_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_096",
    title: "Students With Consecutive Failures",
    description: "Find students who failed two or more consecutive exams.",
    difficulty: "hard",
    expected_query:
      "WITH exam_failures AS ( SELECT student_user_id, exam_id, grade_letter, LAG(grade_letter) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_grade FROM exam_results ) SELECT DISTINCT student_user_id FROM exam_failures WHERE grade_letter = 'F' AND previous_grade = 'F' ORDER BY student_user_id ASC;",
    solution_columns: ["student_user_id"],
    tables: ["exam_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "student_user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_097",
    title: "Programs With Highest Revenue Per Student",
    description:
      "Find the top 5 programs by average successful payment collected per student.",
    difficulty: "hard",
    expected_query:
      "WITH program_revenue AS ( SELECT sp.program_id, SUM(p.paid_amount) AS total_revenue, COUNT(DISTINCT sp.user_id) AS total_students FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY sp.program_id ) SELECT program_id, ROUND(total_revenue / NULLIF(total_students, 0), 2) AS revenue_per_student FROM program_revenue ORDER BY revenue_per_student DESC, program_id ASC LIMIT 5;",
    solution_columns: ["program_id", "revenue_per_student"],
    tables: ["payments", "fee_invoices", "student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "revenue_per_student", direction: "desc" },
        { column: "program_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_098",
    title: "Most Engaged Students",
    description: "Find top 10 students with highest total material view time.",
    difficulty: "hard",
    expected_query:
      "SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id ORDER BY total_view_time DESC, user_id ASC LIMIT 10;",
    solution_columns: ["user_id", "total_view_time"],
    tables: ["material_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_view_time", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_099",
    title: "Department With Best Feedback Score",
    description:
      "Find the department with the highest average teacher feedback score.",
    difficulty: "hard",
    expected_query:
      "SELECT tp.department_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_score FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id ORDER BY avg_feedback_score DESC, tp.department_id ASC LIMIT 1;",
    solution_columns: ["department_id", "avg_feedback_score"],
    tables: ["student_feedback", "teacher_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_feedback_score", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "EDUCATION_100",
    title: "Students More Consistent Than Program Average",
    description:
      "Find students whose attendance percentage variance across enrollments is lower than their program average variance.",
    difficulty: "hard",
    expected_query:
      "WITH student_variance AS ( SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id ), program_avg_variance AS ( SELECT program_id, AVG(attendance_variance) AS avg_variance FROM student_variance GROUP BY program_id ) SELECT sv.student_user_id, sv.program_id, ROUND(sv.attendance_variance, 2) AS attendance_variance FROM student_variance sv JOIN program_avg_variance pav ON sv.program_id = pav.program_id WHERE sv.attendance_variance < pav.avg_variance ORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;",
    solution_columns: ["student_user_id", "program_id", "attendance_variance"],
    tables: ["enrollments", "student_profiles"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "program_id", direction: "asc" },
        { column: "attendance_variance", direction: "asc" },
        { column: "student_user_id", direction: "asc" },
      ],
    },
  },
];

export const hints = [
  {
    code: "EDUCATION_001",
    hints: [
      {
        hint_order: 1,
        content: "Count all institutions in one table.",
      },
      {
        hint_order: 2,
        content: "Use an aggregate function.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) from institutions.",
      },
    ],
  },
  {
    code: "EDUCATION_002",
    hints: [
      {
        hint_order: 1,
        content: "Filter only active campuses first.",
      },
      {
        hint_order: 2,
        content: "Use the is_active column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE is_active = true.",
      },
    ],
  },
  {
    code: "EDUCATION_003",
    hints: [
      {
        hint_order: 1,
        content: "Only active academic terms should be listed.",
      },
      {
        hint_order: 2,
        content: "Use the status column for filtering.",
      },
      {
        hint_order: 3,
        content:
          "Select term_name and academic_year, then ORDER BY year and name.",
      },
    ],
  },
  {
    code: "EDUCATION_004",
    hints: [
      {
        hint_order: 1,
        content: "Look in student_profiles only.",
      },
      {
        hint_order: 2,
        content: "Filter rows where enrollment_status is active.",
      },
      {
        hint_order: 3,
        content: "Return user_id, admission_number, and enrollment_status.",
      },
    ],
  },
  {
    code: "EDUCATION_005",
    hints: [
      {
        hint_order: 1,
        content: "Use teacher_profiles for hiring data.",
      },
      {
        hint_order: 2,
        content: "Ignore NULL hire dates.",
      },
      {
        hint_order: 3,
        content: "ORDER BY hire_date DESC and LIMIT 10.",
      },
    ],
  },
  {
    code: "EDUCATION_006",
    hints: [
      {
        hint_order: 1,
        content: "Find courses that are both mandatory and active.",
      },
      {
        hint_order: 2,
        content: "Use is_mandatory and is_active together.",
      },
      {
        hint_order: 3,
        content: "Select id, course_title, credit_value and sort by title.",
      },
    ],
  },
  {
    code: "EDUCATION_007",
    hints: [
      {
        hint_order: 1,
        content: "Look in classrooms for seating capacity.",
      },
      {
        hint_order: 2,
        content: "Filter capacity at least 100.",
      },
      {
        hint_order: 3,
        content: "Return room details and ORDER BY seating_capacity DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_008",
    hints: [
      {
        hint_order: 1,
        content: "Use assignments table only.",
      },
      {
        hint_order: 2,
        content: "Sort by the due date.",
      },
      {
        hint_order: 3,
        content: "ORDER BY due_at ASC.",
      },
    ],
  },
  {
    code: "EDUCATION_009",
    hints: [
      {
        hint_order: 1,
        content: "Look in payments table.",
      },
      {
        hint_order: 2,
        content: "Keep only successful payments.",
      },
      {
        hint_order: 3,
        content:
          "Select invoice_id and paid_amount, then sort by paid_at DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_010",
    hints: [
      {
        hint_order: 1,
        content: "Use support_tickets table only.",
      },
      {
        hint_order: 2,
        content: "Filter rows where ticket_status is open.",
      },
      {
        hint_order: 3,
        content: "Return issue_type and priority for open tickets.",
      },
    ],
  },
  {
    code: "EDUCATION_011",
    hints: [
      {
        hint_order: 1,
        content: "Group users by their role.",
      },
      {
        hint_order: 2,
        content: "Count rows inside each role group.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_role with COUNT(*).",
      },
    ],
  },
  {
    code: "EDUCATION_012",
    hints: [
      {
        hint_order: 1,
        content: "Use programs table and group by level.",
      },
      {
        hint_order: 2,
        content: "Count programs in each program_level.",
      },
      {
        hint_order: 3,
        content: "GROUP BY program_level.",
      },
    ],
  },
  {
    code: "EDUCATION_013",
    hints: [
      {
        hint_order: 1,
        content: "Use classrooms and group by room_type.",
      },
      {
        hint_order: 2,
        content: "Calculate average seating capacity.",
      },
      {
        hint_order: 3,
        content: "AVG(seating_capacity) with GROUP BY room_type.",
      },
    ],
  },
  {
    code: "EDUCATION_014",
    hints: [
      {
        hint_order: 1,
        content: "Use student_profiles only.",
      },
      {
        hint_order: 2,
        content: "Group by enrollment_status.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each status.",
      },
    ],
  },
  {
    code: "EDUCATION_015",
    hints: [
      {
        hint_order: 1,
        content: "Look in assignments table.",
      },
      {
        hint_order: 2,
        content: "Group rows by assignment_type.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY assignment_type.",
      },
    ],
  },
  {
    code: "EDUCATION_016",
    hints: [
      {
        hint_order: 1,
        content: "Use teacher_profiles and ignore NULL ratings.",
      },
      {
        hint_order: 2,
        content: "Group by employment_type.",
      },
      {
        hint_order: 3,
        content: "AVG(rating_score) for each employment type.",
      },
    ],
  },
  {
    code: "EDUCATION_017",
    hints: [
      {
        hint_order: 1,
        content: "Use fee_plans table.",
      },
      {
        hint_order: 2,
        content: "Group rows by fee_category.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) in each fee category.",
      },
    ],
  },
  {
    code: "EDUCATION_018",
    hints: [
      {
        hint_order: 1,
        content: "Only successful payments should be included.",
      },
      {
        hint_order: 2,
        content: "Group totals by payment_method.",
      },
      {
        hint_order: 3,
        content: "SUM(paid_amount) with GROUP BY payment_method.",
      },
    ],
  },
  {
    code: "EDUCATION_019",
    hints: [
      {
        hint_order: 1,
        content: "Use support_tickets table.",
      },
      {
        hint_order: 2,
        content: "Group rows by priority.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each priority.",
      },
    ],
  },
  {
    code: "EDUCATION_020",
    hints: [
      {
        hint_order: 1,
        content: "Use assignment_submissions.",
      },
      {
        hint_order: 2,
        content: "Only graded rows have obtained_marks.",
      },
      {
        hint_order: 3,
        content: "AVG(obtained_marks) where obtained_marks IS NOT NULL.",
      },
    ],
  },
  {
    code: "EDUCATION_021",
    hints: [
      {
        hint_order: 1,
        content: "Compare each student CGPA against the overall average.",
      },
      {
        hint_order: 2,
        content: "Compute the average from student_profiles.",
      },
      {
        hint_order: 3,
        content: "Use a subquery with AVG(cgpa) in the WHERE clause.",
      },
    ],
  },
  {
    code: "EDUCATION_022",
    hints: [
      {
        hint_order: 1,
        content: "Use courses table only.",
      },
      {
        hint_order: 2,
        content: "Filter rows where credit_value is greater than 4.",
      },
      {
        hint_order: 3,
        content: "Select course columns and ORDER BY credit_value DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_023",
    hints: [
      {
        hint_order: 1,
        content: "Look for assignments allowing late work.",
      },
      {
        hint_order: 2,
        content: "Use the allow_late_submission flag.",
      },
      {
        hint_order: 3,
        content: "Filter true rows and sort by due_at.",
      },
    ],
  },
  {
    code: "EDUCATION_024",
    hints: [
      {
        hint_order: 1,
        content: "Upcoming means exam_date after today.",
      },
      {
        hint_order: 2,
        content: "Use CURRENT_DATE in the filter.",
      },
      {
        hint_order: 3,
        content: "WHERE exam_date > CURRENT_DATE.",
      },
    ],
  },
  {
    code: "EDUCATION_025",
    hints: [
      {
        hint_order: 1,
        content: "Count only published exam results.",
      },
      {
        hint_order: 2,
        content: "Use result_status for filtering.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) where result_status = 'published'.",
      },
    ],
  },
  {
    code: "EDUCATION_026",
    hints: [
      {
        hint_order: 1,
        content: "Use material_views table.",
      },
      {
        hint_order: 2,
        content: "Fully completed rows have completed = true.",
      },
      {
        hint_order: 3,
        content:
          "Filter by completed and return material_id, user_id, progress_percent.",
      },
    ],
  },
  {
    code: "EDUCATION_027",
    hints: [
      {
        hint_order: 1,
        content: "Look in discussion_threads.",
      },
      {
        hint_order: 2,
        content: "Pinned threads use the is_pinned flag.",
      },
      {
        hint_order: 3,
        content: "Filter true rows and ORDER BY created_at DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_028",
    hints: [
      {
        hint_order: 1,
        content: "Use scholarships table only.",
      },
      {
        hint_order: 2,
        content: "Filter active scholarships with is_active.",
      },
      {
        hint_order: 3,
        content: "Return scholarship fields and sort by amount_value DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_029",
    hints: [
      {
        hint_order: 1,
        content: "Use fee_invoices for overdue bills.",
      },
      {
        hint_order: 2,
        content: "Filter rows where invoice_status is overdue.",
      },
      {
        hint_order: 3,
        content: "Select invoice details and ORDER BY due_date ASC.",
      },
    ],
  },
  {
    code: "EDUCATION_030",
    hints: [
      {
        hint_order: 1,
        content: "Use app_events table.",
      },
      {
        hint_order: 2,
        content: "Most recent means latest event_time first.",
      },
      {
        hint_order: 3,
        content: "ORDER BY event_time DESC and LIMIT 20.",
      },
    ],
  },
  {
    code: "EDUCATION_031",
    hints: [
      {
        hint_order: 1,
        content: "Use enrollments table only.",
      },
      {
        hint_order: 2,
        content: "Count only rows with enrollment_status as enrolled.",
      },
      {
        hint_order: 3,
        content: "GROUP BY offering_id with COUNT(*).",
      },
    ],
  },
  {
    code: "EDUCATION_032",
    hints: [
      {
        hint_order: 1,
        content: "Use attendance_percentage from enrollments.",
      },
      {
        hint_order: 2,
        content: "Ignore NULL attendance values.",
      },
      {
        hint_order: 3,
        content: "AVG(attendance_percentage) grouped by offering_id.",
      },
    ],
  },
  {
    code: "EDUCATION_033",
    hints: [
      {
        hint_order: 1,
        content: "Use exams table only.",
      },
      {
        hint_order: 2,
        content: "Group rows by exam_type.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each exam type.",
      },
    ],
  },
  {
    code: "EDUCATION_034",
    hints: [
      {
        hint_order: 1,
        content: "Use exam_results table.",
      },
      {
        hint_order: 2,
        content: "Only average non-NULL obtained marks.",
      },
      {
        hint_order: 3,
        content: "GROUP BY exam_id with AVG(obtained_marks).",
      },
    ],
  },
  {
    code: "EDUCATION_035",
    hints: [
      {
        hint_order: 1,
        content: "Look in support_tickets.",
      },
      {
        hint_order: 2,
        content: "Group by issue_type.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each issue category.",
      },
    ],
  },
  {
    code: "EDUCATION_036",
    hints: [
      {
        hint_order: 1,
        content: "Use payments table.",
      },
      {
        hint_order: 2,
        content: "Only successful payments should be included.",
      },
      {
        hint_order: 3,
        content: "AVG(paid_amount) where payment_status = 'successful'.",
      },
    ],
  },
  {
    code: "EDUCATION_037",
    hints: [
      {
        hint_order: 1,
        content: "Use course_offerings table.",
      },
      {
        hint_order: 2,
        content: "Group offerings by course_status.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each offering status.",
      },
    ],
  },
  {
    code: "EDUCATION_038",
    hints: [
      {
        hint_order: 1,
        content: "Use teacher_profiles only.",
      },
      {
        hint_order: 2,
        content: "Ignore NULL department_id values.",
      },
      {
        hint_order: 3,
        content: "GROUP BY department_id with COUNT(*).",
      },
    ],
  },
  {
    code: "EDUCATION_039",
    hints: [
      {
        hint_order: 1,
        content: "Use learning_materials table.",
      },
      {
        hint_order: 2,
        content: "Group rows by material_type.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each material type.",
      },
    ],
  },
  {
    code: "EDUCATION_040",
    hints: [
      {
        hint_order: 1,
        content: "Use student_feedback table.",
      },
      {
        hint_order: 2,
        content: "Group by feedback_category.",
      },
      {
        hint_order: 3,
        content: "AVG(rating_value) for each category.",
      },
    ],
  },
  {
    code: "EDUCATION_041",
    hints: [
      {
        hint_order: 1,
        content: "Start from student_profiles and users.",
      },
      {
        hint_order: 2,
        content: "Only active students should be returned.",
      },
      {
        hint_order: 3,
        content: "Join programs to get program_name.",
      },
    ],
  },
  {
    code: "EDUCATION_042",
    hints: [
      {
        hint_order: 1,
        content: "Use teacher_profiles as the base table.",
      },
      {
        hint_order: 2,
        content: "Join users for teacher names.",
      },
      {
        hint_order: 3,
        content: "Join departments to get department_name.",
      },
    ],
  },
  {
    code: "EDUCATION_043",
    hints: [
      {
        hint_order: 1,
        content: "Course offerings link courses and teachers.",
      },
      {
        hint_order: 2,
        content: "Join courses for the course title.",
      },
      {
        hint_order: 3,
        content: "Join users using primary_teacher_id.",
      },
    ],
  },
  {
    code: "EDUCATION_044",
    hints: [
      {
        hint_order: 1,
        content: "Count only active students.",
      },
      {
        hint_order: 2,
        content: "Join programs using program_id.",
      },
      {
        hint_order: 3,
        content: "GROUP BY program_name.",
      },
    ],
  },
  {
    code: "EDUCATION_045",
    hints: [
      {
        hint_order: 1,
        content: "Use student_profiles and users.",
      },
      {
        hint_order: 2,
        content: "Low attendance means below 75.",
      },
      {
        hint_order: 3,
        content: "Join users for names and filter attendance_percentage < 75.",
      },
    ],
  },
  {
    code: "EDUCATION_046",
    hints: [
      {
        hint_order: 1,
        content: "Assignments and assignment_submissions are both needed.",
      },
      {
        hint_order: 2,
        content: "Only non-NULL obtained marks should be averaged.",
      },
      {
        hint_order: 3,
        content: "GROUP BY assignment id and title.",
      },
    ],
  },
  {
    code: "EDUCATION_047",
    hints: [
      {
        hint_order: 1,
        content: "Join exams with exam_results.",
      },
      {
        hint_order: 2,
        content: "Treat non-F grades as passes.",
      },
      {
        hint_order: 3,
        content: "COUNT passed students grouped by exam.",
      },
    ],
  },
  {
    code: "EDUCATION_048",
    hints: [
      {
        hint_order: 1,
        content:
          "Payments flow through invoices to students and then programs.",
      },
      {
        hint_order: 2,
        content: "Only successful payments should count.",
      },
      {
        hint_order: 3,
        content: "SUM paid_amount grouped by program_name.",
      },
    ],
  },
  {
    code: "EDUCATION_049",
    hints: [
      {
        hint_order: 1,
        content: "Use course_offerings only.",
      },
      {
        hint_order: 2,
        content: "Compare enrolled_count with 90 percent of seat_limit.",
      },
      {
        hint_order: 3,
        content: "Filter offerings where enrolled_count >= seat_limit * 0.9.",
      },
    ],
  },
  {
    code: "EDUCATION_050",
    hints: [
      {
        hint_order: 1,
        content: "Use discussion_threads and discussion_posts.",
      },
      {
        hint_order: 2,
        content: "A LEFT JOIN helps keep threads with zero posts.",
      },
      {
        hint_order: 3,
        content: "COUNT posts grouped by thread.",
      },
    ],
  },
  {
    code: "EDUCATION_051",
    hints: [
      {
        hint_order: 1,
        content: "guardian_relationships connects students and guardians.",
      },
      {
        hint_order: 2,
        content: "Join users twice to read both names.",
      },
      {
        hint_order: 3,
        content: "Filter only rows where is_primary = true.",
      },
    ],
  },
  {
    code: "EDUCATION_052",
    hints: [
      {
        hint_order: 1,
        content: "Use attendance_sessions table.",
      },
      {
        hint_order: 2,
        content: "Count sessions per offering.",
      },
      {
        hint_order: 3,
        content: "GROUP BY offering_id.",
      },
    ],
  },
  {
    code: "EDUCATION_053",
    hints: [
      {
        hint_order: 1,
        content: "Use attendance_records.",
      },
      {
        hint_order: 2,
        content: "Keep only attendance_status = 'present' rows.",
      },
      {
        hint_order: 3,
        content: "COUNT present rows grouped by student_user_id.",
      },
    ],
  },
  {
    code: "EDUCATION_054",
    hints: [
      {
        hint_order: 1,
        content:
          "Assignments should still appear even with zero late submissions.",
      },
      {
        hint_order: 2,
        content:
          "Join submissions using submission_status = 'late_submitted' condition.",
      },
      {
        hint_order: 3,
        content: "Use LEFT JOIN and COUNT(submission id).",
      },
    ],
  },
  {
    code: "EDUCATION_055",
    hints: [
      {
        hint_order: 1,
        content: "Join assignments with assignment_submissions.",
      },
      {
        hint_order: 2,
        content: "Only non-NULL plagiarism scores should be averaged.",
      },
      {
        hint_order: 3,
        content: "GROUP BY assignment id and title.",
      },
    ],
  },
  {
    code: "EDUCATION_056",
    hints: [
      {
        hint_order: 1,
        content: "Use exam_results as the base table.",
      },
      {
        hint_order: 2,
        content: "Join exams for exam_name.",
      },
      {
        hint_order: 3,
        content: "Join users for student full_name.",
      },
    ],
  },
  {
    code: "EDUCATION_057",
    hints: [
      {
        hint_order: 1,
        content: "Use material_views only.",
      },
      {
        hint_order: 2,
        content: "Each row represents a viewed material per user.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) grouped by user_id.",
      },
    ],
  },
  {
    code: "EDUCATION_058",
    hints: [
      {
        hint_order: 1,
        content: "Materials belong to offerings through learning_materials.",
      },
      {
        hint_order: 2,
        content: "Join material_views to learning_materials.",
      },
      {
        hint_order: 3,
        content: "AVG(progress_percent) grouped by offering_id.",
      },
    ],
  },
  {
    code: "EDUCATION_059",
    hints: [
      {
        hint_order: 1,
        content: "Use student_feedback table.",
      },
      {
        hint_order: 2,
        content: "Ignore rows where teacher_user_id is NULL.",
      },
      {
        hint_order: 3,
        content: "AVG(rating_value) grouped by teacher_user_id.",
      },
    ],
  },
  {
    code: "EDUCATION_060",
    hints: [
      {
        hint_order: 1,
        content: "Outstanding invoices are open, overdue, or partial.",
      },
      {
        hint_order: 2,
        content: "Use fee_invoices only.",
      },
      {
        hint_order: 3,
        content: "SUM(total_amount) grouped by student_user_id.",
      },
    ],
  },
  {
    code: "EDUCATION_061",
    hints: [
      {
        hint_order: 1,
        content: "Compare each student attendance with the overall average.",
      },
      {
        hint_order: 2,
        content: "Use AVG(attendance_percentage) from enrollments.",
      },
      {
        hint_order: 3,
        content: "A subquery in WHERE will help compare against the average.",
      },
    ],
  },
  {
    code: "EDUCATION_062",
    hints: [
      {
        hint_order: 1,
        content: "Use teacher_profiles for rating comparison.",
      },
      {
        hint_order: 2,
        content: "Compare rating_score with the average rating.",
      },
      {
        hint_order: 3,
        content: "Use a subquery with AVG(rating_score).",
      },
    ],
  },
  {
    code: "EDUCATION_063",
    hints: [
      {
        hint_order: 1,
        content: "Look for students with more than one active scholarship.",
      },
      {
        hint_order: 2,
        content: "Group by student_user_id.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "EDUCATION_064",
    hints: [
      {
        hint_order: 1,
        content: "Use support_tickets table only.",
      },
      {
        hint_order: 2,
        content: "Find users who created multiple tickets.",
      },
      {
        hint_order: 3,
        content: "GROUP BY created_by_user_id with HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "EDUCATION_065",
    hints: [
      {
        hint_order: 1,
        content: "Use material_views table.",
      },
      {
        hint_order: 2,
        content:
          "Check if the same user viewed the same material multiple times.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id, material_id and HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "EDUCATION_066",
    hints: [
      {
        hint_order: 1,
        content: "Use app_events for user activity.",
      },
      {
        hint_order: 2,
        content: "Group by event_type.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) for each event type and sort descending.",
      },
    ],
  },
  {
    code: "EDUCATION_067",
    hints: [
      {
        hint_order: 1,
        content: "Find courses without any active offering.",
      },
      {
        hint_order: 2,
        content: "Use a LEFT JOIN from courses to course_offerings.",
      },
      {
        hint_order: 3,
        content: "Keep rows where offering id is NULL.",
      },
    ],
  },
  {
    code: "EDUCATION_068",
    hints: [
      {
        hint_order: 1,
        content: "Find teachers who are not assigned to any offering.",
      },
      {
        hint_order: 2,
        content: "LEFT JOIN teacher_profiles with course_teachers.",
      },
      {
        hint_order: 3,
        content: "Filter rows where offering_id is NULL.",
      },
    ],
  },
  {
    code: "EDUCATION_069",
    hints: [
      {
        hint_order: 1,
        content: "Find students without guardians.",
      },
      {
        hint_order: 2,
        content: "LEFT JOIN student_profiles with guardian_relationships.",
      },
      {
        hint_order: 3,
        content: "Keep rows where guardian row is missing.",
      },
    ],
  },
  {
    code: "EDUCATION_070",
    hints: [
      {
        hint_order: 1,
        content: "Find assignments without submissions.",
      },
      {
        hint_order: 2,
        content: "LEFT JOIN submissions to assignments.",
      },
      {
        hint_order: 3,
        content: "WHERE submission id IS NULL.",
      },
    ],
  },
  {
    code: "EDUCATION_071",
    hints: [
      {
        hint_order: 1,
        content: "Find the highest score in each exam.",
      },
      {
        hint_order: 2,
        content: "Use exam_results table.",
      },
      {
        hint_order: 3,
        content: "MAX(obtained_marks) grouped by exam_id.",
      },
    ],
  },
  {
    code: "EDUCATION_072",
    hints: [
      {
        hint_order: 1,
        content: "Find the lowest attendance per offering.",
      },
      {
        hint_order: 2,
        content: "Use enrollments table.",
      },
      {
        hint_order: 3,
        content: "MIN(attendance_percentage) grouped by offering_id.",
      },
    ],
  },
  {
    code: "EDUCATION_073",
    hints: [
      {
        hint_order: 1,
        content: "Find the latest assignment per offering.",
      },
      {
        hint_order: 2,
        content: "Sort assignments by due_at descending inside each offering.",
      },
      {
        hint_order: 3,
        content: "Use ROW_NUMBER() partitioned by offering_id.",
      },
    ],
  },
  {
    code: "EDUCATION_074",
    hints: [
      {
        hint_order: 1,
        content: "Find the latest payment per student.",
      },
      {
        hint_order: 2,
        content: "Use successful payments only.",
      },
      {
        hint_order: 3,
        content: "Use ROW_NUMBER() over paid_at DESC per student.",
      },
    ],
  },
  {
    code: "EDUCATION_075",
    hints: [
      {
        hint_order: 1,
        content: "Find top scorer per exam.",
      },
      {
        hint_order: 2,
        content: "Rank scores within each exam.",
      },
      {
        hint_order: 3,
        content:
          "Use ROW_NUMBER() partitioned by exam_id ordered by marks DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_076",
    hints: [
      {
        hint_order: 1,
        content: "Find top viewed materials.",
      },
      {
        hint_order: 2,
        content: "Group by material_id.",
      },
      {
        hint_order: 3,
        content: "SUM(total_view_seconds) and sort descending.",
      },
    ],
  },
  {
    code: "EDUCATION_077",
    hints: [
      {
        hint_order: 1,
        content: "Find most active discussion users.",
      },
      {
        hint_order: 2,
        content: "Count posts per created_by_user_id.",
      },
      {
        hint_order: 3,
        content: "ORDER BY COUNT(*) DESC LIMIT 10.",
      },
    ],
  },
  {
    code: "EDUCATION_078",
    hints: [
      {
        hint_order: 1,
        content: "Find students with the highest CGPA in each program.",
      },
      {
        hint_order: 2,
        content: "Partition rows by program_id.",
      },
      {
        hint_order: 3,
        content: "Use DENSE_RANK() or ROW_NUMBER() ordered by cgpa DESC.",
      },
    ],
  },
  {
    code: "EDUCATION_079",
    hints: [
      {
        hint_order: 1,
        content: "Find programs with above-average fees.",
      },
      {
        hint_order: 2,
        content: "Compare fee amounts with overall average fee.",
      },
      {
        hint_order: 3,
        content: "Use AVG(total_fee_amount) in a subquery.",
      },
    ],
  },
  {
    code: "EDUCATION_080",
    hints: [
      {
        hint_order: 1,
        content: "Find teachers with above-average feedback.",
      },
      {
        hint_order: 2,
        content: "Group feedback by teacher first.",
      },
      {
        hint_order: 3,
        content: "Compare teacher average against overall teacher average.",
      },
    ],
  },
  {
    code: "EDUCATION_081",
    hints: [
      {
        hint_order: 1,
        content: "Compare student CGPA with program average CGPA.",
      },
      {
        hint_order: 2,
        content: "Compute average CGPA per program.",
      },
      {
        hint_order: 3,
        content: "Join the program average back to student_profiles.",
      },
    ],
  },
  {
    code: "EDUCATION_082",
    hints: [
      {
        hint_order: 1,
        content: "Find students who failed multiple exams.",
      },
      {
        hint_order: 2,
        content: "Filter grade_letter = 'F' first.",
      },
      {
        hint_order: 3,
        content: "GROUP BY student_user_id with HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "EDUCATION_083",
    hints: [
      {
        hint_order: 1,
        content: "Compare each teacher rating with department average.",
      },
      {
        hint_order: 2,
        content: "First compute teacher averages.",
      },
      {
        hint_order: 3,
        content:
          "Then compare against department-level average of those ratings.",
      },
    ],
  },
  {
    code: "EDUCATION_084",
    hints: [
      {
        hint_order: 1,
        content: "Check if every enrolled student submitted every assignment.",
      },
      {
        hint_order: 2,
        content: "Compare expected submission count with actual count.",
      },
      {
        hint_order: 3,
        content:
          "Assignments count × enrolled students count = expected submissions.",
      },
    ],
  },
  {
    code: "EDUCATION_085",
    hints: [
      {
        hint_order: 1,
        content: "Find students with invoices but no successful payments.",
      },
      {
        hint_order: 2,
        content: "LEFT JOIN payments on invoices.",
      },
      {
        hint_order: 3,
        content: "Keep rows where successful payment is missing.",
      },
    ],
  },
  {
    code: "EDUCATION_086",
    hints: [
      {
        hint_order: 1,
        content: "Find classroom schedule overlaps.",
      },
      {
        hint_order: 2,
        content: "Compare timetable_slots with itself.",
      },
      {
        hint_order: 3,
        content: "Use self join with time overlap conditions.",
      },
    ],
  },
  {
    code: "EDUCATION_087",
    hints: [
      {
        hint_order: 1,
        content: "Find teacher timetable conflicts.",
      },
      {
        hint_order: 2,
        content: "Join teacher assignments with timetable slots.",
      },
      {
        hint_order: 3,
        content: "Self join teacher slots and compare overlapping times.",
      },
    ],
  },
  {
    code: "EDUCATION_088",
    hints: [
      {
        hint_order: 1,
        content: "Compare earlier exams vs later exams for each student.",
      },
      {
        hint_order: 2,
        content: "Split exams into two halves using window functions.",
      },
      {
        hint_order: 3,
        content: "Compare average marks of second half vs first half.",
      },
    ],
  },
  {
    code: "EDUCATION_089",
    hints: [
      {
        hint_order: 1,
        content: "Find programs where all students are active.",
      },
      {
        hint_order: 2,
        content: "Compare total students with active students.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) = COUNT(*) FILTER (...).",
      },
    ],
  },
  {
    code: "EDUCATION_090",
    hints: [
      {
        hint_order: 1,
        content: "Compare assignment average score with exam average score.",
      },
      {
        hint_order: 2,
        content: "Compute averages separately per student.",
      },
      {
        hint_order: 3,
        content: "Join both averages and compare them.",
      },
    ],
  },
  {
    code: "EDUCATION_091",
    hints: [
      {
        hint_order: 1,
        content: "Find top 3 students per program by CGPA.",
      },
      {
        hint_order: 2,
        content: "Use window ranking partitioned by program_id.",
      },
      {
        hint_order: 3,
        content: "Keep rows where rank <= 3.",
      },
    ],
  },
  {
    code: "EDUCATION_092",
    hints: [
      {
        hint_order: 1,
        content: "Group successful payments by month.",
      },
      {
        hint_order: 2,
        content: "Use DATE_TRUNC('month', paid_at).",
      },
      {
        hint_order: 3,
        content: "SUM(paid_amount) for each month.",
      },
    ],
  },
  {
    code: "EDUCATION_093",
    hints: [
      {
        hint_order: 1,
        content: "Calculate pass percentage per offering.",
      },
      {
        hint_order: 2,
        content:
          "Count passed students and divide by total completed students.",
      },
      {
        hint_order: 3,
        content: "Use conditional COUNT with FILTER or CASE.",
      },
    ],
  },
  {
    code: "EDUCATION_094",
    hints: [
      {
        hint_order: 1,
        content:
          "Compare current attendance with previous attendance per student.",
      },
      {
        hint_order: 2,
        content: "Use LAG(attendance_percentage).",
      },
      {
        hint_order: 3,
        content: "Keep rows where current attendance is lower.",
      },
    ],
  },
  {
    code: "EDUCATION_095",
    hints: [
      {
        hint_order: 1,
        content: "Find teachers handling the most offerings.",
      },
      {
        hint_order: 2,
        content: "Count distinct offering_id per teacher.",
      },
      {
        hint_order: 3,
        content: "Sort descending and LIMIT 5.",
      },
    ],
  },
  {
    code: "EDUCATION_096",
    hints: [
      {
        hint_order: 1,
        content: "Find students with consecutive exam failures.",
      },
      {
        hint_order: 2,
        content: "Use LAG(grade_letter).",
      },
      {
        hint_order: 3,
        content: "Check where both current and previous grades are F.",
      },
    ],
  },
  {
    code: "EDUCATION_097",
    hints: [
      {
        hint_order: 1,
        content: "Compute revenue per student by program.",
      },
      {
        hint_order: 2,
        content: "Total successful payments divided by distinct students.",
      },
      {
        hint_order: 3,
        content: "GROUP BY program_id and calculate ratio.",
      },
    ],
  },
  {
    code: "EDUCATION_098",
    hints: [
      {
        hint_order: 1,
        content: "Find most engaged users by total watch time.",
      },
      {
        hint_order: 2,
        content: "SUM total_view_seconds per user.",
      },
      {
        hint_order: 3,
        content: "Sort descending and LIMIT 10.",
      },
    ],
  },
  {
    code: "EDUCATION_099",
    hints: [
      {
        hint_order: 1,
        content: "Find department with best average feedback.",
      },
      {
        hint_order: 2,
        content: "Join feedback with teacher departments.",
      },
      {
        hint_order: 3,
        content: "AVG(rating_value) grouped by department and take top 1.",
      },
    ],
  },
  {
    code: "EDUCATION_100",
    hints: [
      {
        hint_order: 1,
        content:
          "Compare student attendance variance with program average variance.",
      },
      {
        hint_order: 2,
        content: "Use VARIANCE(attendance_percentage) per student.",
      },
      {
        hint_order: 3,
        content: "Compare against average variance per program.",
      },
    ],
  },
];

export const conceptFilters = [
  {
    code: "EDUCATION_001",
    concepts: ["aggregation", "count"],
  },
  {
    code: "EDUCATION_002",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "EDUCATION_003",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_004",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_005",
    concepts: ["filtering", "null_handling", "sorting", "limit"],
  },
  {
    code: "EDUCATION_006",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_007",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_008",
    concepts: ["sorting"],
  },
  {
    code: "EDUCATION_009",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_010",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_011",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_012",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_013",
    concepts: ["aggregation", "average", "group_by", "sorting", "calculation"],
  },
  {
    code: "EDUCATION_014",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_015",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_016",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_017",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_018",
    concepts: [
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_019",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_020",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_021",
    concepts: [
      "filtering",
      "aggregation",
      "average",
      "subquery",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_022",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_023",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_024",
    concepts: ["filtering", "date_functions", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_025",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "EDUCATION_026",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_027",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_028",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_029",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_030",
    concepts: ["sorting", "limit"],
  },
  {
    code: "EDUCATION_031",
    concepts: [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_032",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_033",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_034",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_035",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_036",
    concepts: [
      "filtering",
      "aggregation",
      "average",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_037",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_038",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
    ],
  },
  {
    code: "EDUCATION_039",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_040",
    concepts: ["aggregation", "average", "group_by", "sorting", "calculation"],
  },
  {
    code: "EDUCATION_041",
    concepts: ["joins", "left_join", "filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_042",
    concepts: ["joins", "left_join", "sorting"],
  },
  {
    code: "EDUCATION_043",
    concepts: ["joins", "left_join", "sorting"],
  },
  {
    code: "EDUCATION_044",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_045",
    concepts: ["joins", "filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_046",
    concepts: [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_047",
    concepts: [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_048",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_049",
    concepts: [
      "filtering",
      "null_handling",
      "arithmetic",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_050",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "sorting",
    ],
  },
  {
    code: "EDUCATION_051",
    concepts: ["self_join", "joins", "filtering", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_052",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_053",
    concepts: [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_054",
    concepts: [
      "joins",
      "left_join",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_055",
    concepts: [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_056",
    concepts: ["joins", "sorting"],
  },
  {
    code: "EDUCATION_057",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "EDUCATION_058",
    concepts: [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_059",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_060",
    concepts: [
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_061",
    concepts: [
      "filtering",
      "null_handling",
      "window_functions",
      "row_number",
      "sorting",
      "limit",
    ],
  },
  {
    code: "EDUCATION_062",
    concepts: ["filtering", "sorting", "limit", "comparison"],
  },
  {
    code: "EDUCATION_063",
    concepts: [
      "filtering",
      "window_functions",
      "sum",
      "running_total",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_064",
    concepts: [
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "EDUCATION_065",
    concepts: [
      "window_functions",
      "lead",
      "lag_lead",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "EDUCATION_066",
    concepts: ["window_functions", "ranking", "partition_by", "sorting"],
  },
  {
    code: "EDUCATION_067",
    concepts: [
      "filtering",
      "null_handling",
      "window_functions",
      "moving_average",
      "average",
      "partition_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_068",
    concepts: [
      "filtering",
      "null_handling",
      "window_functions",
      "ranking",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "EDUCATION_069",
    concepts: [
      "filtering",
      "null_handling",
      "window_functions",
      "ranking",
      "sorting",
    ],
  },
  {
    code: "EDUCATION_070",
    concepts: ["window_functions", "count", "partition_by", "sorting"],
  },
  {
    code: "EDUCATION_071",
    concepts: ["filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_072",
    concepts: [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_073",
    concepts: [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_074",
    concepts: [
      "cte",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_075",
    concepts: [
      "aggregation",
      "sum",
      "group_by",
      "having",
      "case_when",
      "conditional_aggregation",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_076",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_077",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "average",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_078",
    concepts: [
      "filtering",
      "arithmetic",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_079",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "count_distinct",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_080",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_081",
    concepts: [
      "cte",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "joins",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_082",
    concepts: [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_083",
    concepts: [
      "cte",
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_084",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
      "arithmetic",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_085",
    concepts: [
      "left_join",
      "joins",
      "filtering",
      "distinct",
      "null_handling",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_086",
    concepts: [
      "self_join",
      "joins",
      "filtering",
      "null_handling",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_087",
    concepts: ["cte", "self_join", "joins", "sorting", "comparison"],
  },
  {
    code: "EDUCATION_088",
    concepts: [
      "cte",
      "window_functions",
      "row_number",
      "count",
      "partition_by",
      "aggregation",
      "average",
      "group_by",
      "case_when",
      "sorting",
      "comparison",
      "arithmetic",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_089",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_090",
    concepts: [
      "cte",
      "aggregation",
      "average",
      "group_by",
      "joins",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_091",
    concepts: [
      "cte",
      "filtering",
      "null_handling",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_092",
    concepts: [
      "filtering",
      "null_handling",
      "date_functions",
      "aggregation",
      "sum",
      "group_by",
      "trend_analysis",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_093",
    concepts: [
      "filtering",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "limit",
      "comparison",
      "arithmetic",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_094",
    concepts: [
      "cte",
      "filtering",
      "null_handling",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_095",
    concepts: ["aggregation", "count_distinct", "group_by", "sorting", "limit"],
  },
  {
    code: "EDUCATION_096",
    concepts: [
      "cte",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "filtering",
      "distinct",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "EDUCATION_097",
    concepts: [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
      "comparison",
      "arithmetic",
      "calculation",
      "null_handling",
    ],
  },
  {
    code: "EDUCATION_098",
    concepts: ["aggregation", "sum", "group_by", "sorting", "limit"],
  },
  {
    code: "EDUCATION_099",
    concepts: [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation",
    ],
  },
  {
    code: "EDUCATION_100",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
];

export const solutions = [
  {
    code: "EDUCATION_001",
    approaches: [
      {
        approach_title: "COUNT rows",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT COUNT(*) AS total_institutions FROM institutions;",
        explanation:
          "## Approach\n\nCount all rows in `institutions`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_institutions\nFROM institutions;\n```\n\n## Explanation\n\n- Each row in `institutions` represents one institution.\n- `COUNT(*)` returns the total number of rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the shortest and clearest way to count all institutions.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(id) AS total_institutions FROM institutions;",
        explanation:
          "## Approach\n\nCount the primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_institutions\nFROM institutions;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So it returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counting.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH institution_count AS (\n  SELECT COUNT(*) AS total_institutions\n  FROM institutions\n)\nSELECT total_institutions\nFROM institution_count;",
        explanation:
          "## Approach\n\nCalculate the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH institution_count AS (\n  SELECT COUNT(*) AS total_institutions\n  FROM institutions\n)\nSELECT total_institutions\nFROM institution_count;\n```\n\n## Explanation\n\n- The CTE computes the institution count once.\n- The outer query selects that value.\n- This pattern is useful when the query may be extended later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on.",
      },
    ],
  },
  {
    code: "EDUCATION_002",
    approaches: [
      {
        approach_title: "Filter then count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS active_campuses FROM campuses WHERE is_active = true;",
        explanation:
          "## Approach\n\nKeep only active campuses, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_campuses\nFROM campuses\nWHERE is_active = true;\n```\n\n## Explanation\n\n- `WHERE is_active = true` filters to active campuses only.\n- `COUNT(*)` counts the filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is explicit and easy for learners to read.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) AS active_campuses FROM campuses WHERE is_active;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_campuses\nFROM campuses\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- Only active campuses are counted.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for practice questions.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_campuses FROM campuses;",
        explanation:
          "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_campuses\nFROM campuses;\n```\n\n## Explanation\n\n- `FILTER` makes `COUNT(*)` include only active rows.\n- This style is useful when calculating multiple conditional counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
    ],
  },
  {
    code: "EDUCATION_003",
    approaches: [
      {
        approach_title: "Filter and sort",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT term_name, academic_year FROM academic_terms WHERE status = 'active' ORDER BY academic_year ASC, term_name ASC;",
        explanation:
          "## Approach\n\nFilter active terms, then sort the result.\n\n## Query\n\n```sql\nSELECT term_name, academic_year\nFROM academic_terms\nWHERE status = 'active'\nORDER BY academic_year ASC, term_name ASC;\n```\n\n## Explanation\n\n- `WHERE status = 'active'` keeps only active academic terms.\n- Only the required columns are selected.\n- Results are sorted by academic year, then term name.\n\n## Why this is optimal\n\nIt directly matches the requirement with the least complexity.",
      },
      {
        approach_title: "CTE active terms",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_terms AS (\n  SELECT term_name, academic_year\n  FROM academic_terms\n  WHERE status = 'active'\n)\nSELECT term_name, academic_year\nFROM active_terms\nORDER BY academic_year ASC, term_name ASC;",
        explanation:
          "## Approach\n\nFirst isolate active terms in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH active_terms AS (\n  SELECT term_name, academic_year\n  FROM academic_terms\n  WHERE status = 'active'\n)\nSELECT term_name, academic_year\nFROM active_terms\nORDER BY academic_year ASC, term_name ASC;\n```\n\n## Explanation\n\n- The CTE stores only active terms.\n- The outer query returns them in the required order.\n- This can help when more logic needs to be added later.\n\n## Difference from the optimal approach\n\nMore verbose, but useful for building larger queries.",
      },
      {
        approach_title: "Subquery filter",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT term_name, academic_year FROM (SELECT term_name, academic_year FROM academic_terms WHERE status = 'active') t ORDER BY academic_year ASC, term_name ASC;",
        explanation:
          "## Approach\n\nUse a derived table to filter active rows before sorting.\n\n## Query\n\n```sql\nSELECT term_name, academic_year\nFROM (\n  SELECT term_name, academic_year\n  FROM academic_terms\n  WHERE status = 'active'\n) t\nORDER BY academic_year ASC, term_name ASC;\n```\n\n## Explanation\n\n- The inner query filters active terms.\n- The outer query applies the required ordering.\n- It produces the same result as the simpler version.\n\n## Difference from the optimal approach\n\nWorks correctly, but adds an unnecessary layer here.",
      },
    ],
  },
  {
    code: "EDUCATION_004",
    approaches: [
      {
        approach_title: "Filter active students",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, admission_number, enrollment_status FROM student_profiles WHERE enrollment_status = 'active' ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nFilter student profiles to active enrollment status.\n\n## Query\n\n```sql\nSELECT user_id, admission_number, enrollment_status\nFROM student_profiles\nWHERE enrollment_status = 'active'\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `WHERE enrollment_status = 'active'` keeps only active students.\n- The selected columns match the expected output.\n- `ORDER BY user_id ASC` gives stable output.\n\n## Why this is optimal\n\nIt is the most direct way to retrieve active student records.",
      },
      {
        approach_title: "IN filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id, admission_number, enrollment_status FROM student_profiles WHERE enrollment_status IN ('active') ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nUse `IN` even though there is only one target status.\n\n## Query\n\n```sql\nSELECT user_id, admission_number, enrollment_status\nFROM student_profiles\nWHERE enrollment_status IN ('active')\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `IN ('active')` behaves the same as `= 'active'` here.\n- This style becomes useful when filtering multiple statuses.\n\n## Difference from the optimal approach\n\nIt works, but `=` is simpler for a single value.",
      },
      {
        approach_title: "CTE active students",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_students AS (\n  SELECT user_id, admission_number, enrollment_status\n  FROM student_profiles\n  WHERE enrollment_status = 'active'\n)\nSELECT user_id, admission_number, enrollment_status\nFROM active_students\nORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nCreate a CTE for active students, then return it.\n\n## Query\n\n```sql\nWITH active_students AS (\n  SELECT user_id, admission_number, enrollment_status\n  FROM student_profiles\n  WHERE enrollment_status = 'active'\n)\nSELECT user_id, admission_number, enrollment_status\nFROM active_students\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates active student records.\n- The outer query handles ordering.\n- This format is useful if more joins are needed later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_005",
    approaches: [
      {
        approach_title: "Sort recent hires",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, employee_code, hire_date FROM teacher_profiles WHERE hire_date IS NOT NULL ORDER BY hire_date DESC, user_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nRemove NULL hire dates, sort newest first, and keep the top 10.\n\n## Query\n\n```sql\nSELECT user_id, employee_code, hire_date\nFROM teacher_profiles\nWHERE hire_date IS NOT NULL\nORDER BY hire_date DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `WHERE hire_date IS NOT NULL` avoids unknown hiring dates.\n- `ORDER BY hire_date DESC` brings most recent hires first.\n- `LIMIT 10` keeps only the top 10 rows.\n\n## Why this is optimal\n\nIt directly answers the question with clear sorting and limiting.",
      },
      {
        approach_title: "CTE recent hires",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_hires AS (\n  SELECT user_id, employee_code, hire_date\n  FROM teacher_profiles\n  WHERE hire_date IS NOT NULL\n)\nSELECT user_id, employee_code, hire_date\nFROM ranked_hires\nORDER BY hire_date DESC, user_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nPut the filtered teacher rows in a CTE, then sort and limit them.\n\n## Query\n\n```sql\nWITH ranked_hires AS (\n  SELECT user_id, employee_code, hire_date\n  FROM teacher_profiles\n  WHERE hire_date IS NOT NULL\n)\nSELECT user_id, employee_code, hire_date\nFROM ranked_hires\nORDER BY hire_date DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE keeps only teachers with known hire dates.\n- The outer query applies ranking by recency.\n- This style is easier to extend later.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose.",
      },
      {
        approach_title: "Window rank",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT user_id, employee_code, hire_date FROM (SELECT user_id, employee_code, hire_date, ROW_NUMBER() OVER (ORDER BY hire_date DESC, user_id ASC) AS rn FROM teacher_profiles WHERE hire_date IS NOT NULL) t WHERE rn <= 10 ORDER BY hire_date DESC, user_id ASC;",
        explanation:
          "## Approach\n\nAssign row numbers by latest hire date, then keep the first 10.\n\n## Query\n\n```sql\nSELECT user_id, employee_code, hire_date\nFROM (\n  SELECT user_id, employee_code, hire_date,\n         ROW_NUMBER() OVER (ORDER BY hire_date DESC, user_id ASC) AS rn\n  FROM teacher_profiles\n  WHERE hire_date IS NOT NULL\n) t\nWHERE rn <= 10\nORDER BY hire_date DESC, user_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` ranks teachers from most recent to oldest.\n- The outer query keeps rows 1 through 10.\n- This pattern is useful when ranking logic gets more complex.\n\n## Difference from the optimal approach\n\nMore advanced than needed for a simple top 10.",
      },
    ],
  },
  {
    code: "EDUCATION_006",
    approaches: [
      {
        approach_title: "Filter mandatory",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, course_title, credit_value FROM courses WHERE is_mandatory = true AND is_active = true ORDER BY course_title ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter to mandatory and active courses, then sort them.\n\n## Query\n\n```sql\nSELECT id, course_title, credit_value\nFROM courses\nWHERE is_mandatory = true\n  AND is_active = true\nORDER BY course_title ASC, id ASC;\n```\n\n## Explanation\n\n- `is_mandatory = true` keeps required courses.\n- `is_active = true` excludes inactive courses.\n- Results are sorted alphabetically by title.\n\n## Why this is optimal\n\nIt is clear, direct, and matches the requirement exactly.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, course_title, credit_value FROM courses WHERE is_mandatory AND is_active ORDER BY course_title ASC, id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand for both conditions.\n\n## Query\n\n```sql\nSELECT id, course_title, credit_value\nFROM courses\nWHERE is_mandatory\n  AND is_active\nORDER BY course_title ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_mandatory AND is_active` means both flags must be true.\n- The result is the same as the explicit comparison.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for beginners.",
      },
      {
        approach_title: "CTE mandatory",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH mandatory_courses AS (\n  SELECT id, course_title, credit_value\n  FROM courses\n  WHERE is_mandatory = true AND is_active = true\n)\nSELECT id, course_title, credit_value\nFROM mandatory_courses\nORDER BY course_title ASC, id ASC;",
        explanation:
          "## Approach\n\nStore the filtered courses in a CTE, then sort the final output.\n\n## Query\n\n```sql\nWITH mandatory_courses AS (\n  SELECT id, course_title, credit_value\n  FROM courses\n  WHERE is_mandatory = true AND is_active = true\n)\nSELECT id, course_title, credit_value\nFROM mandatory_courses\nORDER BY course_title ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the mandatory active courses.\n- The outer query only handles presentation order.\n\n## Difference from the optimal approach\n\nUseful for extension, but longer than necessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_007",
    approaches: [
      {
        approach_title: "Capacity filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, campus_id, room_name, seating_capacity FROM classrooms WHERE seating_capacity >= 100 ORDER BY seating_capacity DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter classrooms by seating capacity threshold.\n\n## Query\n\n```sql\nSELECT id, campus_id, room_name, seating_capacity\nFROM classrooms\nWHERE seating_capacity >= 100\nORDER BY seating_capacity DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE seating_capacity >= 100` keeps only large classrooms.\n- Sorting by capacity descending shows the biggest rooms first.\n- `id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nIt is a simple filter-and-sort query that directly matches the question.",
      },
      {
        approach_title: "CTE large rooms",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH large_classrooms AS (\n  SELECT id, campus_id, room_name, seating_capacity\n  FROM classrooms\n  WHERE seating_capacity >= 100\n)\nSELECT id, campus_id, room_name, seating_capacity\nFROM large_classrooms\nORDER BY seating_capacity DESC, id ASC;",
        explanation:
          "## Approach\n\nMove the capacity filter into a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH large_classrooms AS (\n  SELECT id, campus_id, room_name, seating_capacity\n  FROM classrooms\n  WHERE seating_capacity >= 100\n)\nSELECT id, campus_id, room_name, seating_capacity\nFROM large_classrooms\nORDER BY seating_capacity DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only classrooms meeting the threshold.\n- The outer query returns them in the expected order.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
      {
        approach_title: "Subquery filter",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, campus_id, room_name, seating_capacity FROM (SELECT id, campus_id, room_name, seating_capacity FROM classrooms WHERE seating_capacity >= 100) c ORDER BY seating_capacity DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a subquery to first select large classrooms.\n\n## Query\n\n```sql\nSELECT id, campus_id, room_name, seating_capacity\nFROM (\n  SELECT id, campus_id, room_name, seating_capacity\n  FROM classrooms\n  WHERE seating_capacity >= 100\n) c\nORDER BY seating_capacity DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query filters to large rooms.\n- The outer query sorts them.\n\n## Difference from the optimal approach\n\nCorrect, but the extra layer is unnecessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_008",
    approaches: [
      {
        approach_title: "Sort by due date",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, offering_id, assignment_title, due_at FROM assignments ORDER BY due_at ASC, id ASC;",
        explanation:
          "## Approach\n\nSort assignments by the earliest due date first.\n\n## Query\n\n```sql\nSELECT id, offering_id, assignment_title, due_at\nFROM assignments\nORDER BY due_at ASC, id ASC;\n```\n\n## Explanation\n\n- `ORDER BY due_at ASC` brings the nearest deadlines first.\n- `id ASC` provides a stable tie-breaker.\n- The selected columns match the required output.\n\n## Why this is optimal\n\nThis is the clearest way to list assignments by earliest due date.",
      },
      {
        approach_title: "CTE ordered base",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH assignment_list AS (\n  SELECT id, offering_id, assignment_title, due_at\n  FROM assignments\n)\nSELECT id, offering_id, assignment_title, due_at\nFROM assignment_list\nORDER BY due_at ASC, id ASC;",
        explanation:
          "## Approach\n\nSelect the required assignment columns in a CTE, then order them.\n\n## Query\n\n```sql\nWITH assignment_list AS (\n  SELECT id, offering_id, assignment_title, due_at\n  FROM assignments\n)\nSELECT id, offering_id, assignment_title, due_at\nFROM assignment_list\nORDER BY due_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE defines the base assignment dataset.\n- The outer query applies the final sort order.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend later.",
      },
      {
        approach_title: "Row number sort",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, offering_id, assignment_title, due_at FROM (SELECT id, offering_id, assignment_title, due_at, ROW_NUMBER() OVER (ORDER BY due_at ASC, id ASC) AS rn FROM assignments) a ORDER BY rn ASC;",
        explanation:
          "## Approach\n\nAssign row numbers in due-date order and return rows by that ranking.\n\n## Query\n\n```sql\nSELECT id, offering_id, assignment_title, due_at\nFROM (\n  SELECT id, offering_id, assignment_title, due_at,\n         ROW_NUMBER() OVER (ORDER BY due_at ASC, id ASC) AS rn\n  FROM assignments\n) a\nORDER BY rn ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` gives each assignment a position based on due date.\n- Ordering by that row number reproduces the same result.\n\n## Difference from the optimal approach\n\nWorks, but uses a window function where simple sorting is enough.",
      },
    ],
  },
  {
    code: "EDUCATION_009",
    approaches: [
      {
        approach_title: "Filter successful",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, invoice_id, paid_amount, paid_at FROM payments WHERE payment_status = 'successful' ORDER BY paid_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only successful payments, then sort by latest payment time.\n\n## Query\n\n```sql\nSELECT id, invoice_id, paid_amount, paid_at\nFROM payments\nWHERE payment_status = 'successful'\nORDER BY paid_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE payment_status = 'successful'` filters to completed payments only.\n- `ORDER BY paid_at DESC` shows the latest successful payments first.\n- `id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nIt directly matches the requested filter and ordering.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, invoice_id, paid_amount, paid_at FROM payments WHERE payment_status IN ('successful') ORDER BY paid_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` for the payment status filter.\n\n## Query\n\n```sql\nSELECT id, invoice_id, paid_amount, paid_at\nFROM payments\nWHERE payment_status IN ('successful')\nORDER BY paid_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('successful')` behaves the same as `= 'successful'` here.\n- It is useful when multiple allowed statuses exist.\n\n## Difference from the optimal approach\n\nCorrect, but less direct for a single status.",
      },
      {
        approach_title: "CTE successful",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH successful_payments AS (\n  SELECT id, invoice_id, paid_amount, paid_at\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, invoice_id, paid_amount, paid_at\nFROM successful_payments\nORDER BY paid_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFirst collect successful payments in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH successful_payments AS (\n  SELECT id, invoice_id, paid_amount, paid_at\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, invoice_id, paid_amount, paid_at\nFROM successful_payments\nORDER BY paid_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the relevant payment records.\n- The outer query handles presentation order.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if extra logic is added later.",
      },
    ],
  },
  {
    code: "EDUCATION_010",
    approaches: [
      {
        approach_title: "Filter open tickets",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, institution_id, user_id, issue_type, priority FROM support_tickets WHERE ticket_status = 'open' ORDER BY priority ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter support tickets to only open ones, then sort them.\n\n## Query\n\n```sql\nSELECT id, institution_id, user_id, issue_type, priority\nFROM support_tickets\nWHERE ticket_status = 'open'\nORDER BY priority ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE ticket_status = 'open'` keeps only open tickets.\n- The selected columns match the expected output.\n- The result is sorted by priority, then ticket id.\n\n## Why this is optimal\n\nIt directly expresses the required filter and output order.",
      },
      {
        approach_title: "CTE open tickets",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH open_tickets AS (\n  SELECT id, institution_id, user_id, issue_type, priority\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n)\nSELECT id, institution_id, user_id, issue_type, priority\nFROM open_tickets\nORDER BY priority ASC, id ASC;",
        explanation:
          "## Approach\n\nCreate a CTE for open tickets and return it in the required order.\n\n## Query\n\n```sql\nWITH open_tickets AS (\n  SELECT id, institution_id, user_id, issue_type, priority\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n)\nSELECT id, institution_id, user_id, issue_type, priority\nFROM open_tickets\nORDER BY priority ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores just the open support tickets.\n- The outer query sorts them for output.\n\n## Difference from the optimal approach\n\nCorrect, but longer than necessary.",
      },
      {
        approach_title: "Subquery open",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, institution_id, user_id, issue_type, priority FROM (SELECT id, institution_id, user_id, issue_type, priority FROM support_tickets WHERE ticket_status = 'open') t ORDER BY priority ASC, id ASC;",
        explanation:
          "## Approach\n\nUse a derived table to isolate open support tickets before sorting.\n\n## Query\n\n```sql\nSELECT id, institution_id, user_id, issue_type, priority\nFROM (\n  SELECT id, institution_id, user_id, issue_type, priority\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n) t\nORDER BY priority ASC, id ASC;\n```\n\n## Explanation\n\n- The inner query filters to open tickets.\n- The outer query returns them in the expected order.\n\n## Difference from the optimal approach\n\nWorks fine, but adds an unnecessary extra step.",
      },
    ],
  },
  {
    code: "EDUCATION_011",
    approaches: [
      {
        approach_title: "Group count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_role, COUNT(*) AS total_users FROM users GROUP BY user_role ORDER BY total_users DESC, user_role ASC;",
        explanation:
          "## Approach\n\nGroup users by role and count rows in each group.\n\n## Query\n\n```sql\nSELECT user_role, COUNT(*) AS total_users\nFROM users\nGROUP BY user_role\nORDER BY total_users DESC, user_role ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_role` creates one group per role.\n- `COUNT(*)` returns how many users are in each role.\n- The result is sorted by count descending, then role name.\n\n## Why this is optimal\n\nIt is the simplest and clearest grouped count query.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_role, COUNT(id) AS total_users FROM users GROUP BY user_role ORDER BY total_users DESC, user_role ASC;",
        explanation:
          "## Approach\n\nCount primary key values inside each role group.\n\n## Query\n\n```sql\nSELECT user_role, COUNT(id) AS total_users\nFROM users\nGROUP BY user_role\nORDER BY total_users DESC, user_role ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids within each role.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counting.",
      },
      {
        approach_title: "CTE roles",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH role_counts AS (\n  SELECT user_role, COUNT(*) AS total_users\n  FROM users\n  GROUP BY user_role\n)\nSELECT user_role, total_users\nFROM role_counts\nORDER BY total_users DESC, user_role ASC;",
        explanation:
          "## Approach\n\nCompute role counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH role_counts AS (\n  SELECT user_role, COUNT(*) AS total_users\n  FROM users\n  GROUP BY user_role\n)\nSELECT user_role, total_users\nFROM role_counts\nORDER BY total_users DESC, user_role ASC;\n```\n\n## Explanation\n\n- The CTE calculates the grouped counts first.\n- The outer query returns them in the required order.\n- This is useful if more processing needs to be added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_012",
    approaches: [
      {
        approach_title: "Group programs",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT program_level, COUNT(*) AS total_programs FROM programs GROUP BY program_level ORDER BY total_programs DESC, program_level ASC;",
        explanation:
          "## Approach\n\nGroup programs by level and count them.\n\n## Query\n\n```sql\nSELECT program_level, COUNT(*) AS total_programs\nFROM programs\nGROUP BY program_level\nORDER BY total_programs DESC, program_level ASC;\n```\n\n## Explanation\n\n- `GROUP BY program_level` creates one group per level.\n- `COUNT(*)` counts how many programs are in each group.\n- Results are sorted by count descending.\n\n## Why this is optimal\n\nIt directly answers the question with one grouped aggregation.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT program_level, COUNT(id) AS total_programs FROM programs GROUP BY program_level ORDER BY total_programs DESC, program_level ASC;",
        explanation:
          "## Approach\n\nCount program ids within each level.\n\n## Query\n\n```sql\nSELECT program_level, COUNT(id) AS total_programs\nFROM programs\nGROUP BY program_level\nORDER BY total_programs DESC, program_level ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids per program level.\n- Since `id` is never NULL, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "CTE levels",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH level_counts AS (\n  SELECT program_level, COUNT(*) AS total_programs\n  FROM programs\n  GROUP BY program_level\n)\nSELECT program_level, total_programs\nFROM level_counts\nORDER BY total_programs DESC, program_level ASC;",
        explanation:
          "## Approach\n\nBuild the grouped result in a CTE first.\n\n## Query\n\n```sql\nWITH level_counts AS (\n  SELECT program_level, COUNT(*) AS total_programs\n  FROM programs\n  GROUP BY program_level\n)\nSELECT program_level, total_programs\nFROM level_counts\nORDER BY total_programs DESC, program_level ASC;\n```\n\n## Explanation\n\n- The CTE computes counts per level.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nUseful for extension, but longer than needed here.",
      },
    ],
  },
  {
    code: "EDUCATION_013",
    approaches: [
      {
        approach_title: "AVG capacity",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity FROM classrooms GROUP BY room_type ORDER BY avg_capacity DESC, room_type ASC;",
        explanation:
          "## Approach\n\nGroup classrooms by type and calculate average seating capacity.\n\n## Query\n\n```sql\nSELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity\nFROM classrooms\nGROUP BY room_type\nORDER BY avg_capacity DESC, room_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY room_type` creates one group per classroom type.\n- `AVG(seating_capacity)` calculates the mean capacity in each group.\n- `ROUND(..., 2)` keeps the result tidy to 2 decimals.\n\n## Why this is optimal\n\nIt is the most direct grouped average query.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH room_avg AS (\n  SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity\n  FROM classrooms\n  GROUP BY room_type\n)\nSELECT room_type, avg_capacity\nFROM room_avg\nORDER BY avg_capacity DESC, room_type ASC;",
        explanation:
          "## Approach\n\nCompute average capacity per room type in a CTE.\n\n## Query\n\n```sql\nWITH room_avg AS (\n  SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity\n  FROM classrooms\n  GROUP BY room_type\n)\nSELECT room_type, avg_capacity\nFROM room_avg\nORDER BY avg_capacity DESC, room_type ASC;\n```\n\n## Explanation\n\n- The CTE stores the grouped averages.\n- The outer query only handles sorting.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT room_type, avg_capacity FROM (SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity FROM classrooms GROUP BY room_type) t ORDER BY avg_capacity DESC, room_type ASC;",
        explanation:
          "## Approach\n\nCalculate grouped averages in a subquery, then sort them.\n\n## Query\n\n```sql\nSELECT room_type, avg_capacity\nFROM (\n  SELECT room_type, ROUND(AVG(seating_capacity), 2) AS avg_capacity\n  FROM classrooms\n  GROUP BY room_type\n) t\nORDER BY avg_capacity DESC, room_type ASC;\n```\n\n## Explanation\n\n- The inner query computes one average per room type.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nCorrect, but the extra layer is unnecessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_014",
    approaches: [
      {
        approach_title: "Group status",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT enrollment_status, COUNT(*) AS total_students FROM student_profiles GROUP BY enrollment_status ORDER BY total_students DESC, enrollment_status ASC;",
        explanation:
          "## Approach\n\nGroup student profiles by enrollment status and count them.\n\n## Query\n\n```sql\nSELECT enrollment_status, COUNT(*) AS total_students\nFROM student_profiles\nGROUP BY enrollment_status\nORDER BY total_students DESC, enrollment_status ASC;\n```\n\n## Explanation\n\n- `GROUP BY enrollment_status` creates one group per status.\n- `COUNT(*)` counts students in each group.\n- The output is sorted by count descending.\n\n## Why this is optimal\n\nIt is the shortest grouped count solution.",
      },
      {
        approach_title: "Count users",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT enrollment_status, COUNT(user_id) AS total_students FROM student_profiles GROUP BY enrollment_status ORDER BY total_students DESC, enrollment_status ASC;",
        explanation:
          "## Approach\n\nCount `user_id` values for each enrollment status.\n\n## Query\n\n```sql\nSELECT enrollment_status, COUNT(user_id) AS total_students\nFROM student_profiles\nGROUP BY enrollment_status\nORDER BY total_students DESC, enrollment_status ASC;\n```\n\n## Explanation\n\n- `COUNT(user_id)` counts non-NULL user ids within each status.\n- Since `user_id` is defined for each student profile, this returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE status",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH status_counts AS (\n  SELECT enrollment_status, COUNT(*) AS total_students\n  FROM student_profiles\n  GROUP BY enrollment_status\n)\nSELECT enrollment_status, total_students\nFROM status_counts\nORDER BY total_students DESC, enrollment_status ASC;",
        explanation:
          "## Approach\n\nFirst compute grouped counts in a CTE.\n\n## Query\n\n```sql\nWITH status_counts AS (\n  SELECT enrollment_status, COUNT(*) AS total_students\n  FROM student_profiles\n  GROUP BY enrollment_status\n)\nSELECT enrollment_status, total_students\nFROM status_counts\nORDER BY total_students DESC, enrollment_status ASC;\n```\n\n## Explanation\n\n- The CTE stores counts by status.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
    ],
  },
  {
    code: "EDUCATION_015",
    approaches: [
      {
        approach_title: "Group types",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT assignment_type, COUNT(*) AS total_assignments FROM assignments GROUP BY assignment_type ORDER BY total_assignments DESC, assignment_type ASC;",
        explanation:
          "## Approach\n\nGroup assignments by type and count them.\n\n## Query\n\n```sql\nSELECT assignment_type, COUNT(*) AS total_assignments\nFROM assignments\nGROUP BY assignment_type\nORDER BY total_assignments DESC, assignment_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY assignment_type` creates one group per assignment type.\n- `COUNT(*)` counts the assignments in each group.\n- Sorting shows the most common types first.\n\n## Why this is optimal\n\nThis is the simplest grouped count for the requirement.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT assignment_type, COUNT(id) AS total_assignments FROM assignments GROUP BY assignment_type ORDER BY total_assignments DESC, assignment_type ASC;",
        explanation:
          "## Approach\n\nCount assignment ids inside each type.\n\n## Query\n\n```sql\nSELECT assignment_type, COUNT(id) AS total_assignments\nFROM assignments\nGROUP BY assignment_type\nORDER BY total_assignments DESC, assignment_type ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids per assignment type.\n- Since `id` is a primary key, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but a little less direct.",
      },
      {
        approach_title: "CTE types",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH type_counts AS (\n  SELECT assignment_type, COUNT(*) AS total_assignments\n  FROM assignments\n  GROUP BY assignment_type\n)\nSELECT assignment_type, total_assignments\nFROM type_counts\nORDER BY total_assignments DESC, assignment_type ASC;",
        explanation:
          "## Approach\n\nStore the grouped result in a CTE first.\n\n## Query\n\n```sql\nWITH type_counts AS (\n  SELECT assignment_type, COUNT(*) AS total_assignments\n  FROM assignments\n  GROUP BY assignment_type\n)\nSELECT assignment_type, total_assignments\nFROM type_counts\nORDER BY total_assignments DESC, assignment_type ASC;\n```\n\n## Explanation\n\n- The CTE calculates total assignments per type.\n- The outer query sorts them.\n\n## Difference from the optimal approach\n\nHelpful for extension, but longer than needed.",
      },
    ],
  },
  {
    code: "EDUCATION_016",
    approaches: [
      {
        approach_title: "AVG rating",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating FROM teacher_profiles WHERE rating_score IS NOT NULL GROUP BY employment_type ORDER BY avg_rating DESC, employment_type ASC;",
        explanation:
          "## Approach\n\nIgnore NULL ratings, then average by employment type.\n\n## Query\n\n```sql\nSELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating\nFROM teacher_profiles\nWHERE rating_score IS NOT NULL\nGROUP BY employment_type\nORDER BY avg_rating DESC, employment_type ASC;\n```\n\n## Explanation\n\n- `WHERE rating_score IS NOT NULL` keeps only rated teachers.\n- `AVG(rating_score)` calculates the average rating per employment type.\n- `ROUND(..., 2)` formats the output cleanly.\n\n## Why this is optimal\n\nIt is explicit and avoids unnecessary averaging over NULL values.",
      },
      {
        approach_title: "CASE avg",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT employment_type, ROUND(AVG(CASE WHEN rating_score IS NOT NULL THEN rating_score END), 2) AS avg_rating FROM teacher_profiles GROUP BY employment_type ORDER BY avg_rating DESC, employment_type ASC;",
        explanation:
          "## Approach\n\nUse `CASE` inside `AVG` to include only non-NULL ratings.\n\n## Query\n\n```sql\nSELECT employment_type,\n       ROUND(AVG(CASE WHEN rating_score IS NOT NULL THEN rating_score END), 2) AS avg_rating\nFROM teacher_profiles\nGROUP BY employment_type\nORDER BY avg_rating DESC, employment_type ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns the rating only when it is not NULL.\n- `AVG` ignores NULL results automatically.\n- So this produces the same average.\n\n## Difference from the optimal approach\n\nWorks, but the `WHERE` clause is cleaner.",
      },
      {
        approach_title: "CTE ratings",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH teacher_ratings AS (\n  SELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating\n  FROM teacher_profiles\n  WHERE rating_score IS NOT NULL\n  GROUP BY employment_type\n)\nSELECT employment_type, avg_rating\nFROM teacher_ratings\nORDER BY avg_rating DESC, employment_type ASC;",
        explanation:
          "## Approach\n\nCalculate the grouped averages in a CTE first.\n\n## Query\n\n```sql\nWITH teacher_ratings AS (\n  SELECT employment_type, ROUND(AVG(rating_score), 2) AS avg_rating\n  FROM teacher_profiles\n  WHERE rating_score IS NOT NULL\n  GROUP BY employment_type\n)\nSELECT employment_type, avg_rating\nFROM teacher_ratings\nORDER BY avg_rating DESC, employment_type ASC;\n```\n\n## Explanation\n\n- The CTE computes average rating per employment type.\n- The outer query applies the final order.\n\n## Difference from the optimal approach\n\nLonger, but easier to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_017",
    approaches: [
      {
        approach_title: "Group fees",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT fee_category, COUNT(*) AS total_fee_plans FROM fee_plans GROUP BY fee_category ORDER BY total_fee_plans DESC, fee_category ASC;",
        explanation:
          "## Approach\n\nGroup fee plans by category and count them.\n\n## Query\n\n```sql\nSELECT fee_category, COUNT(*) AS total_fee_plans\nFROM fee_plans\nGROUP BY fee_category\nORDER BY total_fee_plans DESC, fee_category ASC;\n```\n\n## Explanation\n\n- `GROUP BY fee_category` creates one group per fee type.\n- `COUNT(*)` returns how many plans are in each category.\n- Sorting shows the largest categories first.\n\n## Why this is optimal\n\nIt is the most direct grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT fee_category, COUNT(id) AS total_fee_plans FROM fee_plans GROUP BY fee_category ORDER BY total_fee_plans DESC, fee_category ASC;",
        explanation:
          "## Approach\n\nCount fee plan ids per category.\n\n## Query\n\n```sql\nSELECT fee_category, COUNT(id) AS total_fee_plans\nFROM fee_plans\nGROUP BY fee_category\nORDER BY total_fee_plans DESC, fee_category ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids in each category.\n- Since `id` is never NULL, it matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than counting rows.",
      },
      {
        approach_title: "CTE fees",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH fee_counts AS (\n  SELECT fee_category, COUNT(*) AS total_fee_plans\n  FROM fee_plans\n  GROUP BY fee_category\n)\nSELECT fee_category, total_fee_plans\nFROM fee_counts\nORDER BY total_fee_plans DESC, fee_category ASC;",
        explanation:
          "## Approach\n\nBuild grouped counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH fee_counts AS (\n  SELECT fee_category, COUNT(*) AS total_fee_plans\n  FROM fee_plans\n  GROUP BY fee_category\n)\nSELECT fee_category, total_fee_plans\nFROM fee_counts\nORDER BY total_fee_plans DESC, fee_category ASC;\n```\n\n## Explanation\n\n- The CTE computes total plans per category.\n- The outer query returns them in the requested order.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_018",
    approaches: [
      {
        approach_title: "Sum paid",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY total_paid_amount DESC, payment_method ASC;",
        explanation:
          "## Approach\n\nFilter to successful payments, then sum by payment method.\n\n## Query\n\n```sql\nSELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount\nFROM payments\nWHERE payment_status = 'successful'\nGROUP BY payment_method\nORDER BY total_paid_amount DESC, payment_method ASC;\n```\n\n## Explanation\n\n- `WHERE payment_status = 'successful'` keeps only completed payments.\n- `SUM(paid_amount)` adds up amounts per payment method.\n- `ROUND(..., 2)` formats the total neatly.\n\n## Why this is optimal\n\nIt is explicit and easy to understand.",
      },
      {
        approach_title: "FILTER sum",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT payment_method, ROUND(SUM(paid_amount) FILTER (WHERE payment_status = 'successful'), 2) AS total_paid_amount FROM payments GROUP BY payment_method ORDER BY total_paid_amount DESC, payment_method ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` inside the aggregate to include only successful payments.\n\n## Query\n\n```sql\nSELECT payment_method,\n       ROUND(SUM(paid_amount) FILTER (WHERE payment_status = 'successful'), 2) AS total_paid_amount\nFROM payments\nGROUP BY payment_method\nORDER BY total_paid_amount DESC, payment_method ASC;\n```\n\n## Explanation\n\n- `FILTER` limits the sum to successful rows.\n- Grouping still happens by payment method.\n- This style is useful when multiple conditional sums are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
      {
        approach_title: "CTE paid",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH method_totals AS (\n  SELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, total_paid_amount\nFROM method_totals\nORDER BY total_paid_amount DESC, payment_method ASC;",
        explanation:
          "## Approach\n\nCompute successful payment totals per method in a CTE.\n\n## Query\n\n```sql\nWITH method_totals AS (\n  SELECT payment_method, ROUND(SUM(paid_amount), 2) AS total_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, total_paid_amount\nFROM method_totals\nORDER BY total_paid_amount DESC, payment_method ASC;\n```\n\n## Explanation\n\n- The CTE calculates grouped sums first.\n- The outer query handles sorting.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose.",
      },
    ],
  },
  {
    code: "EDUCATION_019",
    approaches: [
      {
        approach_title: "Group priority",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT priority, COUNT(*) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC, priority ASC;",
        explanation:
          "## Approach\n\nGroup support tickets by priority and count them.\n\n## Query\n\n```sql\nSELECT priority, COUNT(*) AS total_tickets\nFROM support_tickets\nGROUP BY priority\nORDER BY total_tickets DESC, priority ASC;\n```\n\n## Explanation\n\n- `GROUP BY priority` creates one group per ticket priority.\n- `COUNT(*)` counts tickets in each group.\n- Sorting shows the most common priorities first.\n\n## Why this is optimal\n\nIt is the cleanest grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT priority, COUNT(id) AS total_tickets FROM support_tickets GROUP BY priority ORDER BY total_tickets DESC, priority ASC;",
        explanation:
          "## Approach\n\nCount ticket ids within each priority group.\n\n## Query\n\n```sql\nSELECT priority, COUNT(id) AS total_tickets\nFROM support_tickets\nGROUP BY priority\nORDER BY total_tickets DESC, priority ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids per priority.\n- Since `id` is always present, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nWorks correctly, but row counting is clearer with `COUNT(*)`.",
      },
      {
        approach_title: "CTE priority",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH priority_counts AS (\n  SELECT priority, COUNT(*) AS total_tickets\n  FROM support_tickets\n  GROUP BY priority\n)\nSELECT priority, total_tickets\nFROM priority_counts\nORDER BY total_tickets DESC, priority ASC;",
        explanation:
          "## Approach\n\nCalculate counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH priority_counts AS (\n  SELECT priority, COUNT(*) AS total_tickets\n  FROM support_tickets\n  GROUP BY priority\n)\nSELECT priority, total_tickets\nFROM priority_counts\nORDER BY total_tickets DESC, priority ASC;\n```\n\n## Explanation\n\n- The CTE stores ticket counts by priority.\n- The outer query applies the final order.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_020",
    approaches: [
      {
        approach_title: "AVG marks",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks FROM assignment_submissions WHERE obtained_marks IS NOT NULL;",
        explanation:
          "## Approach\n\nIgnore NULL marks and average the remaining scores.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks\nFROM assignment_submissions\nWHERE obtained_marks IS NOT NULL;\n```\n\n## Explanation\n\n- `WHERE obtained_marks IS NOT NULL` keeps only graded submissions.\n- `AVG(obtained_marks)` returns the mean score.\n- `ROUND(..., 2)` formats the result to 2 decimals.\n\n## Why this is optimal\n\nIt is explicit and easy for learners to understand.",
      },
      {
        approach_title: "CASE avg",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ROUND(AVG(CASE WHEN obtained_marks IS NOT NULL THEN obtained_marks END), 2) AS avg_obtained_marks FROM assignment_submissions;",
        explanation:
          "## Approach\n\nUse a `CASE` expression inside `AVG` to exclude NULL marks.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(CASE WHEN obtained_marks IS NOT NULL THEN obtained_marks END), 2) AS avg_obtained_marks\nFROM assignment_submissions;\n```\n\n## Explanation\n\n- The `CASE` expression returns marks only when they are present.\n- `AVG` ignores NULL results, so this matches the filtered average.\n\n## Difference from the optimal approach\n\nCorrect, but the `WHERE` clause is simpler.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH submission_avg AS (\n  SELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n)\nSELECT avg_obtained_marks\nFROM submission_avg;",
        explanation:
          "## Approach\n\nCompute the average in a CTE, then return it.\n\n## Query\n\n```sql\nWITH submission_avg AS (\n  SELECT ROUND(AVG(obtained_marks), 2) AS avg_obtained_marks\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n)\nSELECT avg_obtained_marks\nFROM submission_avg;\n```\n\n## Explanation\n\n- The CTE calculates the average once.\n- The outer query selects that value.\n- This structure is useful if more metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_021",
    approaches: [
      {
        approach_title: "Avg subquery",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, admission_number, cgpa FROM student_profiles WHERE cgpa > (SELECT AVG(cgpa) FROM student_profiles WHERE cgpa IS NOT NULL) ORDER BY cgpa DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute the overall average CGPA in a subquery, then keep students above it.\n\n## Query\n\n```sql\nSELECT user_id, admission_number, cgpa\nFROM student_profiles\nWHERE cgpa > (\n  SELECT AVG(cgpa)\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n)\nORDER BY cgpa DESC, user_id ASC;\n```\n\n## Explanation\n\n- The subquery calculates the average CGPA across all students with non-NULL CGPA.\n- The outer query filters students whose `cgpa` is greater than that average.\n- Results are sorted by higher CGPA first, then by user id.\n\n## Why this is optimal\n\nIt directly matches the question and keeps the logic easy to read.",
      },
      {
        approach_title: "CTE avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH avg_cgpa AS (SELECT AVG(cgpa) AS overall_avg_cgpa FROM student_profiles WHERE cgpa IS NOT NULL) SELECT sp.user_id, sp.admission_number, sp.cgpa FROM student_profiles sp CROSS JOIN avg_cgpa a WHERE sp.cgpa > a.overall_avg_cgpa ORDER BY sp.cgpa DESC, sp.user_id ASC;",
        explanation:
          "## Approach\n\nCalculate the average CGPA in a CTE, then compare each student against it.\n\n## Query\n\n```sql\nWITH avg_cgpa AS (\n  SELECT AVG(cgpa) AS overall_avg_cgpa\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n)\nSELECT sp.user_id, sp.admission_number, sp.cgpa\nFROM student_profiles sp\nCROSS JOIN avg_cgpa a\nWHERE sp.cgpa > a.overall_avg_cgpa\nORDER BY sp.cgpa DESC, sp.user_id ASC;\n```\n\n## Explanation\n\n- The CTE computes the overall average once.\n- `CROSS JOIN` makes that single value available to every student row.\n- The outer query filters to students above the average.\n\n## Difference from the optimal approach\n\nThis is useful when the average needs to be reused, but it is more verbose here.",
      },
      {
        approach_title: "Window avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT user_id, admission_number, cgpa FROM (SELECT user_id, admission_number, cgpa, AVG(cgpa) OVER () AS overall_avg_cgpa FROM student_profiles WHERE cgpa IS NOT NULL) t WHERE cgpa > overall_avg_cgpa ORDER BY cgpa DESC, user_id ASC;",
        explanation:
          "## Approach\n\nAttach the overall average CGPA to each row using a window function, then filter.\n\n## Query\n\n```sql\nSELECT user_id, admission_number, cgpa\nFROM (\n  SELECT user_id, admission_number, cgpa,\n         AVG(cgpa) OVER () AS overall_avg_cgpa\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n) t\nWHERE cgpa > overall_avg_cgpa\nORDER BY cgpa DESC, user_id ASC;\n```\n\n## Explanation\n\n- `AVG(cgpa) OVER ()` calculates the same overall average on every row.\n- The outer query keeps students above that value.\n- It produces the same result as the subquery approach.\n\n## Difference from the optimal approach\n\nWorks well, but a window function is more advanced than needed for this question.",
      },
    ],
  },
  {
    code: "EDUCATION_022",
    approaches: [
      {
        approach_title: "Credit filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4 ORDER BY credit_value DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter courses by credit value and sort them.\n\n## Query\n\n```sql\nSELECT id, course_title, credit_value\nFROM courses\nWHERE credit_value > 4\nORDER BY credit_value DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE credit_value > 4` keeps only high-credit courses.\n- The selected columns match the expected output.\n- Results are sorted by highest credit first, then by id.\n\n## Why this is optimal\n\nIt is the simplest filter-and-sort solution.",
      },
      {
        approach_title: "CTE credits",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH high_credit_courses AS (SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4) SELECT id, course_title, credit_value FROM high_credit_courses ORDER BY credit_value DESC, id ASC;",
        explanation:
          "## Approach\n\nPut the filtered course rows in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH high_credit_courses AS (\n  SELECT id, course_title, credit_value\n  FROM courses\n  WHERE credit_value > 4\n)\nSELECT id, course_title, credit_value\nFROM high_credit_courses\nORDER BY credit_value DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates courses above 4 credits.\n- The outer query applies the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if more logic is added later.",
      },
      {
        approach_title: "Subquery filter",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, course_title, credit_value FROM (SELECT id, course_title, credit_value FROM courses WHERE credit_value > 4) c ORDER BY credit_value DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a derived table for the credit filter before sorting.\n\n## Query\n\n```sql\nSELECT id, course_title, credit_value\nFROM (\n  SELECT id, course_title, credit_value\n  FROM courses\n  WHERE credit_value > 4\n) c\nORDER BY credit_value DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query filters high-credit courses.\n- The outer query sorts them.\n- It returns the same rows as the direct filter.\n\n## Difference from the optimal approach\n\nCorrect, but adds an unnecessary extra layer here.",
      },
    ],
  },
  {
    code: "EDUCATION_023",
    approaches: [
      {
        approach_title: "Flag filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission = true ORDER BY due_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter assignments where late submission is allowed, then sort by due date.\n\n## Query\n\n```sql\nSELECT id, assignment_title, due_at, max_late_days\nFROM assignments\nWHERE allow_late_submission = true\nORDER BY due_at ASC, id ASC;\n```\n\n## Explanation\n\n- `allow_late_submission = true` keeps only assignments that permit late work.\n- `ORDER BY due_at ASC` shows the earliest deadlines first.\n- `id ASC` provides consistent ordering for ties.\n\n## Why this is optimal\n\nIt directly expresses the requirement with the clearest syntax.",
      },
      {
        approach_title: "Boolean filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission ORDER BY due_at ASC, id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand in the `WHERE` clause.\n\n## Query\n\n```sql\nSELECT id, assignment_title, due_at, max_late_days\nFROM assignments\nWHERE allow_late_submission\nORDER BY due_at ASC, id ASC;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE allow_late_submission` means the same as `= true`.\n- It filters to assignments that allow late submissions.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for learners.",
      },
      {
        approach_title: "CTE late",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH late_allowed AS (SELECT id, assignment_title, due_at, max_late_days FROM assignments WHERE allow_late_submission = true) SELECT id, assignment_title, due_at, max_late_days FROM late_allowed ORDER BY due_at ASC, id ASC;",
        explanation:
          "## Approach\n\nStore late-allowed assignments in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH late_allowed AS (\n  SELECT id, assignment_title, due_at, max_late_days\n  FROM assignments\n  WHERE allow_late_submission = true\n)\nSELECT id, assignment_title, due_at, max_late_days\nFROM late_allowed\nORDER BY due_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only assignments that allow late submission.\n- The outer query handles the required ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend later.",
      },
    ],
  },
  {
    code: "EDUCATION_024",
    approaches: [
      {
        approach_title: "Date filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date > CURRENT_DATE ORDER BY exam_date ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter exams to future dates and sort them earliest first.\n\n## Query\n\n```sql\nSELECT id, exam_name, exam_date, exam_type\nFROM exams\nWHERE exam_date > CURRENT_DATE\nORDER BY exam_date ASC, id ASC;\n```\n\n## Explanation\n\n- `exam_date > CURRENT_DATE` keeps only future exams.\n- The selected columns match the required output.\n- Sorting by date ascending lists the next exams first.\n\n## Why this is optimal\n\nIt directly matches the meaning of upcoming exams.",
      },
      {
        approach_title: "CTE upcoming",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH upcoming_exams AS (SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date > CURRENT_DATE) SELECT id, exam_name, exam_date, exam_type FROM upcoming_exams ORDER BY exam_date ASC, id ASC;",
        explanation:
          "## Approach\n\nPut future exams into a CTE, then order them.\n\n## Query\n\n```sql\nWITH upcoming_exams AS (\n  SELECT id, exam_name, exam_date, exam_type\n  FROM exams\n  WHERE exam_date > CURRENT_DATE\n)\nSELECT id, exam_name, exam_date, exam_type\nFROM upcoming_exams\nORDER BY exam_date ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates future-dated exams.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nCorrect, but longer than needed.",
      },
      {
        approach_title: "Interval compare",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, exam_name, exam_date, exam_type FROM exams WHERE exam_date >= CURRENT_DATE + INTERVAL '1 day' ORDER BY exam_date ASC, id ASC;",
        explanation:
          "## Approach\n\nCompare exam dates against tomorrow using an interval.\n\n## Query\n\n```sql\nSELECT id, exam_name, exam_date, exam_type\nFROM exams\nWHERE exam_date >= CURRENT_DATE + INTERVAL '1 day'\nORDER BY exam_date ASC, id ASC;\n```\n\n## Explanation\n\n- `CURRENT_DATE + INTERVAL '1 day'` represents tomorrow.\n- This also excludes exams happening today.\n- The final ordering is the same.\n\n## Difference from the optimal approach\n\nWorks, but `exam_date > CURRENT_DATE` is simpler and easier to read.",
      },
    ],
  },
  {
    code: "EDUCATION_025",
    approaches: [
      {
        approach_title: "Count published",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS published_results FROM exam_results WHERE result_status = 'published';",
        explanation:
          "## Approach\n\nFilter to published results and count rows.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS published_results\nFROM exam_results\nWHERE result_status = 'published';\n```\n\n## Explanation\n\n- `WHERE result_status = 'published'` keeps only published results.\n- `COUNT(*)` returns how many such rows exist.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nThis is the clearest way to count published results.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) FILTER (WHERE result_status = 'published') AS published_results FROM exam_results;",
        explanation:
          "## Approach\n\nApply the status condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE result_status = 'published') AS published_results\nFROM exam_results;\n```\n\n## Explanation\n\n- `FILTER` makes the count include only published rows.\n- This style is useful when calculating multiple conditional counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single count.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH published_count AS (SELECT COUNT(*) AS published_results FROM exam_results WHERE result_status = 'published') SELECT published_results FROM published_count;",
        explanation:
          "## Approach\n\nCalculate the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH published_count AS (\n  SELECT COUNT(*) AS published_results\n  FROM exam_results\n  WHERE result_status = 'published'\n)\nSELECT published_results\nFROM published_count;\n```\n\n## Explanation\n\n- The CTE computes the count once.\n- The outer query selects that value.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose.",
      },
    ],
  },
  {
    code: "EDUCATION_026",
    approaches: [
      {
        approach_title: "Completed filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT material_id, user_id, progress_percent FROM material_views WHERE completed = true ORDER BY progress_percent DESC, material_id ASC;",
        explanation:
          "## Approach\n\nFilter rows where the material is marked as completed.\n\n## Query\n\n```sql\nSELECT material_id, user_id, progress_percent\nFROM material_views\nWHERE completed = true\nORDER BY progress_percent DESC, material_id ASC;\n```\n\n## Explanation\n\n- `completed = true` directly identifies fully completed materials.\n- This is the most reliable indicator instead of assuming progress = 100.\n- Results are sorted by progress and material id for deterministic output.\n\n## Why this is optimal\n\nUses the explicit completion flag, which is more accurate than derived assumptions.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT material_id, user_id, progress_percent FROM material_views WHERE completed ORDER BY progress_percent DESC, material_id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand for filtering completed rows.\n\n## Query\n\n```sql\nSELECT material_id, user_id, progress_percent\nFROM material_views\nWHERE completed\nORDER BY progress_percent DESC, material_id ASC;\n```\n\n## Explanation\n\n- `WHERE completed` is equivalent to `completed = true`.\n- Returns only completed materials.\n\n## Difference from the optimal approach\n\nShorter syntax, but explicit comparison is clearer for learners.",
      },
      {
        approach_title: "Exclude incomplete",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT material_id, user_id, progress_percent FROM material_views WHERE completed IS TRUE ORDER BY progress_percent DESC, material_id ASC;",
        explanation:
          "## Approach\n\nExplicitly include only TRUE values using `IS TRUE`.\n\n## Query\n\n```sql\nSELECT material_id, user_id, progress_percent\nFROM material_views\nWHERE completed IS TRUE\nORDER BY progress_percent DESC, material_id ASC;\n```\n\n## Explanation\n\n- `IS TRUE` ensures NULL values are excluded.\n- Behaves similarly to `= true` but is more explicit in NULL handling.\n\n## Difference from the optimal approach\n\nSlightly more verbose, but safer when NULLs are possible.",
      },
    ],
  },
  {
    code: "EDUCATION_027",
    approaches: [
      {
        approach_title: "Pinned filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned = true ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter to pinned discussion threads and sort newest first.\n\n## Query\n\n```sql\nSELECT id, offering_id, thread_title, created_at\nFROM discussion_threads\nWHERE is_pinned = true\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `is_pinned = true` keeps only pinned threads.\n- `created_at DESC` shows the most recently created pinned threads first.\n- `id ASC` makes tie handling stable.\n\n## Why this is optimal\n\nIt is the simplest and clearest way to get pinned threads.",
      },
      {
        approach_title: "Boolean filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand to filter pinned rows.\n\n## Query\n\n```sql\nSELECT id, offering_id, thread_title, created_at\nFROM discussion_threads\nWHERE is_pinned\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_pinned` means the same as `WHERE is_pinned = true`.\n- It returns the same pinned discussion threads.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for learning purposes.",
      },
      {
        approach_title: "CTE pinned",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH pinned_threads AS (SELECT id, offering_id, thread_title, created_at FROM discussion_threads WHERE is_pinned = true) SELECT id, offering_id, thread_title, created_at FROM pinned_threads ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nStore pinned discussion threads in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH pinned_threads AS (\n  SELECT id, offering_id, thread_title, created_at\n  FROM discussion_threads\n  WHERE is_pinned = true\n)\nSELECT id, offering_id, thread_title, created_at\nFROM pinned_threads\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates pinned thread rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose.",
      },
    ],
  },
  {
    code: "EDUCATION_028",
    approaches: [
      {
        approach_title: "Active filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active = true ORDER BY amount_value DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter to active scholarships and sort by amount value.\n\n## Query\n\n```sql\nSELECT id, scholarship_name, scholarship_type, amount_value\nFROM scholarships\nWHERE is_active = true\nORDER BY amount_value DESC, id ASC;\n```\n\n## Explanation\n\n- `is_active = true` keeps only active scholarships.\n- The selected columns match the expected output.\n- Sorting by amount value descending shows the highest-value scholarships first.\n\n## Why this is optimal\n\nIt directly matches the requirement in the clearest way.",
      },
      {
        approach_title: "Boolean active",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active ORDER BY amount_value DESC, id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand for the active flag.\n\n## Query\n\n```sql\nSELECT id, scholarship_name, scholarship_type, amount_value\nFROM scholarships\nWHERE is_active\nORDER BY amount_value DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active` behaves the same as `WHERE is_active = true`.\n- It returns active scholarship rows only.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer.",
      },
      {
        approach_title: "CTE active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_scholarships AS (SELECT id, scholarship_name, scholarship_type, amount_value FROM scholarships WHERE is_active = true) SELECT id, scholarship_name, scholarship_type, amount_value FROM active_scholarships ORDER BY amount_value DESC, id ASC;",
        explanation:
          "## Approach\n\nMove the active scholarship filter into a CTE.\n\n## Query\n\n```sql\nWITH active_scholarships AS (\n  SELECT id, scholarship_name, scholarship_type, amount_value\n  FROM scholarships\n  WHERE is_active = true\n)\nSELECT id, scholarship_name, scholarship_type, amount_value\nFROM active_scholarships\nORDER BY amount_value DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores active scholarship rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but fine if additional logic is added later.",
      },
    ],
  },
  {
    code: "EDUCATION_029",
    approaches: [
      {
        approach_title: "Status filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status = 'overdue' ORDER BY due_date ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter fee invoices to overdue ones and sort by due date.\n\n## Query\n\n```sql\nSELECT id, student_user_id, invoice_number, total_amount, due_date\nFROM fee_invoices\nWHERE invoice_status = 'overdue'\nORDER BY due_date ASC, id ASC;\n```\n\n## Explanation\n\n- `invoice_status = 'overdue'` keeps only overdue unpaid invoices.\n- `due_date ASC` shows the oldest overdue invoices first.\n- `id ASC` provides stable ordering for ties.\n\n## Why this is optimal\n\nIt directly follows the wording of the question.",
      },
      {
        approach_title: "IN overdue",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status IN ('overdue') ORDER BY due_date ASC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` for the overdue status filter.\n\n## Query\n\n```sql\nSELECT id, student_user_id, invoice_number, total_amount, due_date\nFROM fee_invoices\nWHERE invoice_status IN ('overdue')\nORDER BY due_date ASC, id ASC;\n```\n\n## Explanation\n\n- `IN ('overdue')` behaves the same as `= 'overdue'` in this case.\n- It returns the same overdue invoice rows.\n\n## Difference from the optimal approach\n\nCorrect, but less direct for a single value.",
      },
      {
        approach_title: "CTE overdue",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH overdue_invoices AS (SELECT id, student_user_id, invoice_number, total_amount, due_date FROM fee_invoices WHERE invoice_status = 'overdue') SELECT id, student_user_id, invoice_number, total_amount, due_date FROM overdue_invoices ORDER BY due_date ASC, id ASC;",
        explanation:
          "## Approach\n\nStore overdue invoices in a CTE, then return them.\n\n## Query\n\n```sql\nWITH overdue_invoices AS (\n  SELECT id, student_user_id, invoice_number, total_amount, due_date\n  FROM fee_invoices\n  WHERE invoice_status = 'overdue'\n)\nSELECT id, student_user_id, invoice_number, total_amount, due_date\nFROM overdue_invoices\nORDER BY due_date ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates overdue invoice rows.\n- The outer query sorts them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_030",
    approaches: [
      {
        approach_title: "Recent limit",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, event_name, event_category, event_time FROM app_events ORDER BY event_time DESC, id ASC LIMIT 20;",
        explanation:
          "## Approach\n\nSort app events from newest to oldest and keep the first 20.\n\n## Query\n\n```sql\nSELECT id, user_id, event_name, event_category, event_time\nFROM app_events\nORDER BY event_time DESC, id ASC\nLIMIT 20;\n```\n\n## Explanation\n\n- `ORDER BY event_time DESC` puts the latest events first.\n- `id ASC` breaks ties consistently.\n- `LIMIT 20` keeps only the 20 most recent rows.\n\n## Why this is optimal\n\nIt is the clearest and shortest way to get the most recent events.",
      },
      {
        approach_title: "CTE recent",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH recent_events AS (SELECT id, user_id, event_name, event_category, event_time FROM app_events) SELECT id, user_id, event_name, event_category, event_time FROM recent_events ORDER BY event_time DESC, id ASC LIMIT 20;",
        explanation:
          "## Approach\n\nSelect the needed event columns in a CTE, then sort and limit them.\n\n## Query\n\n```sql\nWITH recent_events AS (\n  SELECT id, user_id, event_name, event_category, event_time\n  FROM app_events\n)\nSELECT id, user_id, event_name, event_category, event_time\nFROM recent_events\nORDER BY event_time DESC, id ASC\nLIMIT 20;\n```\n\n## Explanation\n\n- The CTE defines the base event dataset.\n- The outer query handles sorting and limiting.\n\n## Difference from the optimal approach\n\nCorrect, but adds extra verbosity without extra value here.",
      },
      {
        approach_title: "Window rank",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, user_id, event_name, event_category, event_time FROM (SELECT id, user_id, event_name, event_category, event_time, ROW_NUMBER() OVER (ORDER BY event_time DESC, id ASC) AS rn FROM app_events) e WHERE rn <= 20 ORDER BY event_time DESC, id ASC;",
        explanation:
          "## Approach\n\nRank events by recency, then keep the top 20 rows.\n\n## Query\n\n```sql\nSELECT id, user_id, event_name, event_category, event_time\nFROM (\n  SELECT id, user_id, event_name, event_category, event_time,\n         ROW_NUMBER() OVER (ORDER BY event_time DESC, id ASC) AS rn\n  FROM app_events\n) e\nWHERE rn <= 20\nORDER BY event_time DESC, id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` assigns a recency rank to each event.\n- The outer query keeps rows 1 through 20.\n- This pattern is useful when more ranking logic is needed.\n\n## Difference from the optimal approach\n\nWorks well, but a window function is more advanced than needed for a simple top 20 query.",
      },
    ],
  },
  {
    code: "EDUCATION_031",
    approaches: [
      {
        approach_title: "Group enrolled",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT offering_id, COUNT(*) AS enrolled_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ORDER BY enrolled_students DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nFilter to enrolled rows, then count students per offering.\n\n## Query\n\n```sql\nSELECT offering_id, COUNT(*) AS enrolled_students\nFROM enrollments\nWHERE enrollment_status = 'enrolled'\nGROUP BY offering_id\nORDER BY enrolled_students DESC, offering_id ASC;\n```\n\n## Explanation\n\n- `WHERE enrollment_status = 'enrolled'` keeps only active enrollments.\n- `GROUP BY offering_id` creates one group per course offering.\n- `COUNT(*)` counts students in each offering.\n- Results are sorted by count descending, then offering id.\n\n## Why this is optimal\n\nIt directly matches the requirement with the fewest steps.",
      },
      {
        approach_title: "Count students",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT offering_id, COUNT(student_user_id) AS enrolled_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ORDER BY enrolled_students DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nCount student ids after filtering enrolled rows.\n\n## Query\n\n```sql\nSELECT offering_id, COUNT(student_user_id) AS enrolled_students\nFROM enrollments\nWHERE enrollment_status = 'enrolled'\nGROUP BY offering_id\nORDER BY enrolled_students DESC, offering_id ASC;\n```\n\n## Explanation\n\n- `COUNT(student_user_id)` counts non-NULL student ids in each offering.\n- Since `student_user_id` should exist for enrollment rows, it returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counting.",
      },
      {
        approach_title: "CTE enrollments",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH enrolled_counts AS (\n  SELECT offering_id, COUNT(*) AS enrolled_students\n  FROM enrollments\n  WHERE enrollment_status = 'enrolled'\n  GROUP BY offering_id\n)\nSELECT offering_id, enrolled_students\nFROM enrolled_counts\nORDER BY enrolled_students DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nCompute enrolled counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH enrolled_counts AS (\n  SELECT offering_id, COUNT(*) AS enrolled_students\n  FROM enrollments\n  WHERE enrollment_status = 'enrolled'\n  GROUP BY offering_id\n)\nSELECT offering_id, enrolled_students\nFROM enrolled_counts\nORDER BY enrolled_students DESC, offering_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates counts per offering first.\n- The outer query only handles presentation order.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when more logic will be added later.",
      },
    ],
  },
  {
    code: "EDUCATION_032",
    approaches: [
      {
        approach_title: "AVG attendance",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance FROM enrollments WHERE attendance_percentage IS NOT NULL GROUP BY offering_id ORDER BY avg_attendance DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nIgnore NULL attendance values, then average by offering.\n\n## Query\n\n```sql\nSELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance\nFROM enrollments\nWHERE attendance_percentage IS NOT NULL\nGROUP BY offering_id\nORDER BY avg_attendance DESC, offering_id ASC;\n```\n\n## Explanation\n\n- `WHERE attendance_percentage IS NOT NULL` keeps only rows with attendance data.\n- `AVG(attendance_percentage)` calculates the mean attendance for each offering.\n- `ROUND(..., 2)` formats the result to 2 decimals.\n\n## Why this is optimal\n\nIt is the clearest grouped average query for this requirement.",
      },
      {
        approach_title: "CASE avg",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT offering_id, ROUND(AVG(CASE WHEN attendance_percentage IS NOT NULL THEN attendance_percentage END), 2) AS avg_attendance FROM enrollments GROUP BY offering_id ORDER BY avg_attendance DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` inside `AVG` to exclude NULL attendance values.\n\n## Query\n\n```sql\nSELECT offering_id,\n       ROUND(AVG(CASE WHEN attendance_percentage IS NOT NULL THEN attendance_percentage END), 2) AS avg_attendance\nFROM enrollments\nGROUP BY offering_id\nORDER BY avg_attendance DESC, offering_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression passes attendance only when it exists.\n- `AVG` ignores NULL results, so this matches the filtered average.\n\n## Difference from the optimal approach\n\nCorrect, but the `WHERE` clause is simpler.",
      },
      {
        approach_title: "CTE attendance",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH offering_attendance AS (\n  SELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance\n  FROM enrollments\n  WHERE attendance_percentage IS NOT NULL\n  GROUP BY offering_id\n)\nSELECT offering_id, avg_attendance\nFROM offering_attendance\nORDER BY avg_attendance DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nCalculate average attendance in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH offering_attendance AS (\n  SELECT offering_id, ROUND(AVG(attendance_percentage), 2) AS avg_attendance\n  FROM enrollments\n  WHERE attendance_percentage IS NOT NULL\n  GROUP BY offering_id\n)\nSELECT offering_id, avg_attendance\nFROM offering_attendance\nORDER BY avg_attendance DESC, offering_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one average per offering.\n- The outer query returns it in the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_033",
    approaches: [
      {
        approach_title: "Group exams",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT exam_type, COUNT(*) AS total_exams FROM exams GROUP BY exam_type ORDER BY total_exams DESC, exam_type ASC;",
        explanation:
          "## Approach\n\nGroup exams by type and count them.\n\n## Query\n\n```sql\nSELECT exam_type, COUNT(*) AS total_exams\nFROM exams\nGROUP BY exam_type\nORDER BY total_exams DESC, exam_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY exam_type` creates one group per exam type.\n- `COUNT(*)` counts how many exams are in each group.\n- Results are sorted by count descending.\n\n## Why this is optimal\n\nIt is the shortest and clearest grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT exam_type, COUNT(id) AS total_exams FROM exams GROUP BY exam_type ORDER BY total_exams DESC, exam_type ASC;",
        explanation:
          "## Approach\n\nCount exam ids inside each exam type.\n\n## Query\n\n```sql\nSELECT exam_type, COUNT(id) AS total_exams\nFROM exams\nGROUP BY exam_type\nORDER BY total_exams DESC, exam_type ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL exam ids per type.\n- Since `id` is a primary key, it is never NULL.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE exams",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH exam_counts AS (\n  SELECT exam_type, COUNT(*) AS total_exams\n  FROM exams\n  GROUP BY exam_type\n)\nSELECT exam_type, total_exams\nFROM exam_counts\nORDER BY total_exams DESC, exam_type ASC;",
        explanation:
          "## Approach\n\nCalculate counts by exam type in a CTE.\n\n## Query\n\n```sql\nWITH exam_counts AS (\n  SELECT exam_type, COUNT(*) AS total_exams\n  FROM exams\n  GROUP BY exam_type\n)\nSELECT exam_type, total_exams\nFROM exam_counts\nORDER BY total_exams DESC, exam_type ASC;\n```\n\n## Explanation\n\n- The CTE stores grouped counts.\n- The outer query sorts them.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_034",
    approaches: [
      {
        approach_title: "AVG scores",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY exam_id ORDER BY avg_score DESC, exam_id ASC;",
        explanation:
          "## Approach\n\nIgnore NULL marks, then average the scores for each exam.\n\n## Query\n\n```sql\nSELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score\nFROM exam_results\nWHERE obtained_marks IS NOT NULL\nGROUP BY exam_id\nORDER BY avg_score DESC, exam_id ASC;\n```\n\n## Explanation\n\n- `WHERE obtained_marks IS NOT NULL` keeps only scored results.\n- `AVG(obtained_marks)` calculates the average score per exam.\n- `ROUND(..., 2)` formats the value neatly.\n\n## Why this is optimal\n\nIt directly answers the question with a simple grouped average.",
      },
      {
        approach_title: "CASE avg",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT exam_id, ROUND(AVG(CASE WHEN obtained_marks IS NOT NULL THEN obtained_marks END), 2) AS avg_score FROM exam_results GROUP BY exam_id ORDER BY avg_score DESC, exam_id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` inside `AVG` to exclude NULL marks.\n\n## Query\n\n```sql\nSELECT exam_id,\n       ROUND(AVG(CASE WHEN obtained_marks IS NOT NULL THEN obtained_marks END), 2) AS avg_score\nFROM exam_results\nGROUP BY exam_id\nORDER BY avg_score DESC, exam_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns marks only when present.\n- `AVG` ignores NULL values, so the result matches the filtered average.\n\n## Difference from the optimal approach\n\nCorrect, but the `WHERE` clause is clearer.",
      },
      {
        approach_title: "CTE scores",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH exam_scores AS (\n  SELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n  GROUP BY exam_id\n)\nSELECT exam_id, avg_score\nFROM exam_scores\nORDER BY avg_score DESC, exam_id ASC;",
        explanation:
          "## Approach\n\nCompute average score per exam in a CTE first.\n\n## Query\n\n```sql\nWITH exam_scores AS (\n  SELECT exam_id, ROUND(AVG(obtained_marks), 2) AS avg_score\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n  GROUP BY exam_id\n)\nSELECT exam_id, avg_score\nFROM exam_scores\nORDER BY avg_score DESC, exam_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one average per exam.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_035",
    approaches: [
      {
        approach_title: "Group issues",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT issue_type, COUNT(*) AS total_tickets FROM support_tickets GROUP BY issue_type ORDER BY total_tickets DESC, issue_type ASC;",
        explanation:
          "## Approach\n\nGroup support tickets by issue type and count them.\n\n## Query\n\n```sql\nSELECT issue_type, COUNT(*) AS total_tickets\nFROM support_tickets\nGROUP BY issue_type\nORDER BY total_tickets DESC, issue_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY issue_type` creates one group per issue category.\n- `COUNT(*)` counts tickets in each group.\n- Results are sorted by count descending.\n\n## Why this is optimal\n\nIt is the simplest grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT issue_type, COUNT(id) AS total_tickets FROM support_tickets GROUP BY issue_type ORDER BY total_tickets DESC, issue_type ASC;",
        explanation:
          "## Approach\n\nCount ticket ids for each issue type.\n\n## Query\n\n```sql\nSELECT issue_type, COUNT(id) AS total_tickets\nFROM support_tickets\nGROUP BY issue_type\nORDER BY total_tickets DESC, issue_type ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ticket ids in each group.\n- Since `id` is always present, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but row counting is clearer with `COUNT(*)`.",
      },
      {
        approach_title: "CTE issues",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH issue_counts AS (\n  SELECT issue_type, COUNT(*) AS total_tickets\n  FROM support_tickets\n  GROUP BY issue_type\n)\nSELECT issue_type, total_tickets\nFROM issue_counts\nORDER BY total_tickets DESC, issue_type ASC;",
        explanation:
          "## Approach\n\nBuild the grouped result in a CTE, then return it.\n\n## Query\n\n```sql\nWITH issue_counts AS (\n  SELECT issue_type, COUNT(*) AS total_tickets\n  FROM support_tickets\n  GROUP BY issue_type\n)\nSELECT issue_type, total_tickets\nFROM issue_counts\nORDER BY total_tickets DESC, issue_type ASC;\n```\n\n## Explanation\n\n- The CTE computes total tickets per issue type.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_036",
    approaches: [
      {
        approach_title: "AVG paid",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful';",
        explanation:
          "## Approach\n\nFilter to successful payments, then average their amounts.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount\nFROM payments\nWHERE payment_status = 'successful';\n```\n\n## Explanation\n\n- `WHERE payment_status = 'successful'` keeps only completed payments.\n- `AVG(paid_amount)` returns the average successful payment amount.\n- `ROUND(..., 2)` formats the result to 2 decimals.\n\n## Why this is optimal\n\nIt is the clearest and most direct way to answer the question.",
      },
      {
        approach_title: "FILTER avg",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ROUND(AVG(paid_amount) FILTER (WHERE payment_status = 'successful'), 2) AS avg_paid_amount FROM payments;",
        explanation:
          "## Approach\n\nUse `FILTER` inside the average aggregate.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(paid_amount) FILTER (WHERE payment_status = 'successful'), 2) AS avg_paid_amount\nFROM payments;\n```\n\n## Explanation\n\n- `FILTER` makes `AVG` include only successful payment rows.\n- This is useful when multiple conditional averages are needed in one query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
      {
        approach_title: "CTE paid avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH payment_avg AS (\n  SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT avg_paid_amount\nFROM payment_avg;",
        explanation:
          "## Approach\n\nCalculate the average in a CTE, then select it.\n\n## Query\n\n```sql\nWITH payment_avg AS (\n  SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT avg_paid_amount\nFROM payment_avg;\n```\n\n## Explanation\n\n- The CTE computes the average successful payment amount once.\n- The outer query returns that value.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_037",
    approaches: [
      {
        approach_title: "Group status",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT course_status, COUNT(*) AS total_offerings FROM course_offerings GROUP BY course_status ORDER BY total_offerings DESC, course_status ASC;",
        explanation:
          "## Approach\n\nGroup course offerings by status and count them.\n\n## Query\n\n```sql\nSELECT course_status, COUNT(*) AS total_offerings\nFROM course_offerings\nGROUP BY course_status\nORDER BY total_offerings DESC, course_status ASC;\n```\n\n## Explanation\n\n- `GROUP BY course_status` creates one group per offering status.\n- `COUNT(*)` counts rows in each group.\n- Results are sorted by count descending.\n\n## Why this is optimal\n\nIt is the most direct grouped count for this requirement.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT course_status, COUNT(id) AS total_offerings FROM course_offerings GROUP BY course_status ORDER BY total_offerings DESC, course_status ASC;",
        explanation:
          "## Approach\n\nCount offering ids inside each status group.\n\n## Query\n\n```sql\nSELECT course_status, COUNT(id) AS total_offerings\nFROM course_offerings\nGROUP BY course_status\nORDER BY total_offerings DESC, course_status ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids in each group.\n- Since `id` is a primary key, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "CTE status",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH offering_counts AS (\n  SELECT course_status, COUNT(*) AS total_offerings\n  FROM course_offerings\n  GROUP BY course_status\n)\nSELECT course_status, total_offerings\nFROM offering_counts\nORDER BY total_offerings DESC, course_status ASC;",
        explanation:
          "## Approach\n\nCompute counts by status in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH offering_counts AS (\n  SELECT course_status, COUNT(*) AS total_offerings\n  FROM course_offerings\n  GROUP BY course_status\n)\nSELECT course_status, total_offerings\nFROM offering_counts\nORDER BY total_offerings DESC, course_status ASC;\n```\n\n## Explanation\n\n- The CTE stores grouped totals.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
    ],
  },
  {
    code: "EDUCATION_038",
    approaches: [
      {
        approach_title: "Group teachers",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, COUNT(*) AS total_teachers FROM teacher_profiles WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_teachers DESC, department_id ASC;",
        explanation:
          "## Approach\n\nIgnore teachers without a department, then count teachers per department.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(*) AS total_teachers\nFROM teacher_profiles\nWHERE department_id IS NOT NULL\nGROUP BY department_id\nORDER BY total_teachers DESC, department_id ASC;\n```\n\n## Explanation\n\n- `WHERE department_id IS NOT NULL` removes unassigned teachers.\n- `GROUP BY department_id` creates one group per department.\n- `COUNT(*)` returns the number of teachers in each department.\n\n## Why this is optimal\n\nIt clearly matches the question and avoids counting NULL departments.",
      },
      {
        approach_title: "Count users",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT department_id, COUNT(user_id) AS total_teachers FROM teacher_profiles WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_teachers DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCount teacher user ids for each department.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(user_id) AS total_teachers\nFROM teacher_profiles\nWHERE department_id IS NOT NULL\nGROUP BY department_id\nORDER BY total_teachers DESC, department_id ASC;\n```\n\n## Explanation\n\n- `COUNT(user_id)` counts non-NULL teacher ids per department.\n- Since `user_id` should exist for teacher profiles, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but counting rows is more direct.",
      },
      {
        approach_title: "CTE teachers",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH dept_teachers AS (\n  SELECT department_id, COUNT(*) AS total_teachers\n  FROM teacher_profiles\n  WHERE department_id IS NOT NULL\n  GROUP BY department_id\n)\nSELECT department_id, total_teachers\nFROM dept_teachers\nORDER BY total_teachers DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute teacher counts per department in a CTE first.\n\n## Query\n\n```sql\nWITH dept_teachers AS (\n  SELECT department_id, COUNT(*) AS total_teachers\n  FROM teacher_profiles\n  WHERE department_id IS NOT NULL\n  GROUP BY department_id\n)\nSELECT department_id, total_teachers\nFROM dept_teachers\nORDER BY total_teachers DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates totals per department.\n- The outer query handles final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_039",
    approaches: [
      {
        approach_title: "Group materials",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT material_type, COUNT(*) AS total_materials FROM learning_materials GROUP BY material_type ORDER BY total_materials DESC, material_type ASC;",
        explanation:
          "## Approach\n\nGroup learning materials by type and count them.\n\n## Query\n\n```sql\nSELECT material_type, COUNT(*) AS total_materials\nFROM learning_materials\nGROUP BY material_type\nORDER BY total_materials DESC, material_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY material_type` creates one group per material type.\n- `COUNT(*)` counts materials in each group.\n- Results are sorted by total descending.\n\n## Why this is optimal\n\nIt is the shortest and clearest grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT material_type, COUNT(id) AS total_materials FROM learning_materials GROUP BY material_type ORDER BY total_materials DESC, material_type ASC;",
        explanation:
          "## Approach\n\nCount material ids within each type.\n\n## Query\n\n```sql\nSELECT material_type, COUNT(id) AS total_materials\nFROM learning_materials\nGROUP BY material_type\nORDER BY total_materials DESC, material_type ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL material ids in each group.\n- Since `id` is never NULL, it returns the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but less direct.",
      },
      {
        approach_title: "CTE materials",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH material_counts AS (\n  SELECT material_type, COUNT(*) AS total_materials\n  FROM learning_materials\n  GROUP BY material_type\n)\nSELECT material_type, total_materials\nFROM material_counts\nORDER BY total_materials DESC, material_type ASC;",
        explanation:
          "## Approach\n\nBuild the grouped counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH material_counts AS (\n  SELECT material_type, COUNT(*) AS total_materials\n  FROM learning_materials\n  GROUP BY material_type\n)\nSELECT material_type, total_materials\nFROM material_counts\nORDER BY total_materials DESC, material_type ASC;\n```\n\n## Explanation\n\n- The CTE computes one total per material type.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_040",
    approaches: [
      {
        approach_title: "AVG feedback",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating FROM student_feedback GROUP BY feedback_category ORDER BY avg_rating DESC, feedback_category ASC;",
        explanation:
          "## Approach\n\nGroup feedback by category and average the rating values.\n\n## Query\n\n```sql\nSELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating\nFROM student_feedback\nGROUP BY feedback_category\nORDER BY avg_rating DESC, feedback_category ASC;\n```\n\n## Explanation\n\n- `GROUP BY feedback_category` creates one group per feedback type.\n- `AVG(rating_value)` calculates the average score in each group.\n- `ROUND(..., 2)` formats the result to 2 decimals.\n\n## Why this is optimal\n\nIt directly answers the question with one grouped aggregate query.",
      },
      {
        approach_title: "CTE feedback",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH feedback_avg AS (\n  SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating\n  FROM student_feedback\n  GROUP BY feedback_category\n)\nSELECT feedback_category, avg_rating\nFROM feedback_avg\nORDER BY avg_rating DESC, feedback_category ASC;",
        explanation:
          "## Approach\n\nCompute average feedback per category in a CTE.\n\n## Query\n\n```sql\nWITH feedback_avg AS (\n  SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating\n  FROM student_feedback\n  GROUP BY feedback_category\n)\nSELECT feedback_category, avg_rating\nFROM feedback_avg\nORDER BY avg_rating DESC, feedback_category ASC;\n```\n\n## Explanation\n\n- The CTE stores the grouped averages.\n- The outer query returns them in the expected order.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT feedback_category, avg_rating FROM (SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating FROM student_feedback GROUP BY feedback_category) f ORDER BY avg_rating DESC, feedback_category ASC;",
        explanation:
          "## Approach\n\nCalculate the grouped averages in a subquery, then sort them.\n\n## Query\n\n```sql\nSELECT feedback_category, avg_rating\nFROM (\n  SELECT feedback_category, ROUND(AVG(rating_value), 2) AS avg_rating\n  FROM student_feedback\n  GROUP BY feedback_category\n) f\nORDER BY avg_rating DESC, feedback_category ASC;\n```\n\n## Explanation\n\n- The inner query computes one average per feedback category.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nCorrect, but the extra layer is unnecessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_041",
    approaches: [
      {
        approach_title: "Join program",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id AS user_id, u.full_name, p.program_name FROM student_profiles sp JOIN users u ON sp.user_id = u.id LEFT JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin active student profiles to users and programs.\n\n## Query\n\n```sql\nSELECT u.id AS user_id, u.full_name, p.program_name\nFROM student_profiles sp\nJOIN users u ON sp.user_id = u.id\nLEFT JOIN programs p ON sp.program_id = p.id\nWHERE sp.enrollment_status = 'active'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `student_profiles` tells us which users are active students.\n- `JOIN users` gets the student name.\n- `LEFT JOIN programs` keeps students even if `program_id` is NULL.\n- Results are sorted by user id.\n\n## Why this is optimal\n\nIt is the clearest way to combine the three required pieces of data while preserving active students without a mapped program.",
      },
      {
        approach_title: "CTE active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_students AS (SELECT user_id, program_id FROM student_profiles WHERE enrollment_status = 'active') SELECT u.id AS user_id, u.full_name, p.program_name FROM active_students a JOIN users u ON a.user_id = u.id LEFT JOIN programs p ON a.program_id = p.id ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nFirst isolate active students in a CTE, then join to users and programs.\n\n## Query\n\n```sql\nWITH active_students AS (\n  SELECT user_id, program_id\n  FROM student_profiles\n  WHERE enrollment_status = 'active'\n)\nSELECT u.id AS user_id, u.full_name, p.program_name\nFROM active_students a\nJOIN users u ON a.user_id = u.id\nLEFT JOIN programs p ON a.program_id = p.id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE stores only active student records.\n- The outer query enriches them with user and program data.\n- `LEFT JOIN` still keeps students without a program.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if more student filters are added later.",
      },
      {
        approach_title: "Subquery join",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id AS user_id, u.full_name, p.program_name FROM (SELECT user_id, program_id FROM student_profiles WHERE enrollment_status = 'active') sp JOIN users u ON sp.user_id = u.id LEFT JOIN programs p ON sp.program_id = p.id ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse a derived table for active student rows, then join the related tables.\n\n## Query\n\n```sql\nSELECT u.id AS user_id, u.full_name, p.program_name\nFROM (\n  SELECT user_id, program_id\n  FROM student_profiles\n  WHERE enrollment_status = 'active'\n) sp\nJOIN users u ON sp.user_id = u.id\nLEFT JOIN programs p ON sp.program_id = p.id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The inner query filters student profiles to active students.\n- The outer query joins names and program titles.\n- It returns the same result as the direct join approach.\n\n## Difference from the optimal approach\n\nCorrect, but the extra layer is unnecessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_042",
    approaches: [
      {
        approach_title: "Join dept",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT tp.user_id, u.full_name, d.department_name FROM teacher_profiles tp JOIN users u ON tp.user_id = u.id LEFT JOIN departments d ON tp.department_id = d.id ORDER BY tp.user_id ASC;",
        explanation:
          "## Approach\n\nJoin teacher profiles to users and departments.\n\n## Query\n\n```sql\nSELECT tp.user_id, u.full_name, d.department_name\nFROM teacher_profiles tp\nJOIN users u ON tp.user_id = u.id\nLEFT JOIN departments d ON tp.department_id = d.id\nORDER BY tp.user_id ASC;\n```\n\n## Explanation\n\n- `teacher_profiles` identifies teacher users.\n- `JOIN users` gives each teacher's name.\n- `LEFT JOIN departments` keeps teachers even if no department is assigned.\n\n## Why this is optimal\n\nIt directly returns the required teacher and department information with the safest join choice.",
      },
      {
        approach_title: "CTE teachers",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_base AS (SELECT user_id, department_id FROM teacher_profiles) SELECT tb.user_id, u.full_name, d.department_name FROM teacher_base tb JOIN users u ON tb.user_id = u.id LEFT JOIN departments d ON tb.department_id = d.id ORDER BY tb.user_id ASC;",
        explanation:
          "## Approach\n\nCreate a base teacher set in a CTE, then join the related tables.\n\n## Query\n\n```sql\nWITH teacher_base AS (\n  SELECT user_id, department_id\n  FROM teacher_profiles\n)\nSELECT tb.user_id, u.full_name, d.department_name\nFROM teacher_base tb\nJOIN users u ON tb.user_id = u.id\nLEFT JOIN departments d ON tb.department_id = d.id\nORDER BY tb.user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates teacher profile keys.\n- The outer query adds names and department labels.\n\n## Difference from the optimal approach\n\nMore verbose, but it can help when layering more teacher-specific logic.",
      },
      {
        approach_title: "Inner dept",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT tp.user_id, u.full_name, d.department_name FROM teacher_profiles tp JOIN users u ON tp.user_id = u.id JOIN departments d ON tp.department_id = d.id ORDER BY tp.user_id ASC;",
        explanation:
          "## Approach\n\nUse only inner joins to return teachers that have a mapped department.\n\n## Query\n\n```sql\nSELECT tp.user_id, u.full_name, d.department_name\nFROM teacher_profiles tp\nJOIN users u ON tp.user_id = u.id\nJOIN departments d ON tp.department_id = d.id\nORDER BY tp.user_id ASC;\n```\n\n## Explanation\n\n- This returns only teachers with a non-NULL matching department.\n- It may exclude teachers who do not yet belong to a department.\n\n## Difference from the optimal approach\n\nThis can miss valid teacher rows, so `LEFT JOIN` is safer.",
      },
    ],
  },
  {
    code: "EDUCATION_043",
    approaches: [
      {
        approach_title: "Join teacher",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM course_offerings co JOIN courses c ON co.course_id = c.id LEFT JOIN users u ON co.primary_teacher_id = u.id ORDER BY co.id ASC;",
        explanation:
          "## Approach\n\nJoin offerings to courses and optionally to the primary teacher.\n\n## Query\n\n```sql\nSELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name\nFROM course_offerings co\nJOIN courses c ON co.course_id = c.id\nLEFT JOIN users u ON co.primary_teacher_id = u.id\nORDER BY co.id ASC;\n```\n\n## Explanation\n\n- `JOIN courses` gets the course title for each offering.\n- `LEFT JOIN users` keeps offerings even if no primary teacher is assigned.\n- Output is sorted by offering id.\n\n## Why this is optimal\n\nIt clearly returns all offerings with course titles and teacher names where available.",
      },
      {
        approach_title: "CTE offerings",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH offering_base AS (SELECT id, course_id, primary_teacher_id FROM course_offerings) SELECT ob.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM offering_base ob JOIN courses c ON ob.course_id = c.id LEFT JOIN users u ON ob.primary_teacher_id = u.id ORDER BY ob.id ASC;",
        explanation:
          "## Approach\n\nStore offering keys in a CTE, then join to courses and teachers.\n\n## Query\n\n```sql\nWITH offering_base AS (\n  SELECT id, course_id, primary_teacher_id\n  FROM course_offerings\n)\nSELECT ob.id AS offering_id, c.course_title, u.full_name AS teacher_name\nFROM offering_base ob\nJOIN courses c ON ob.course_id = c.id\nLEFT JOIN users u ON ob.primary_teacher_id = u.id\nORDER BY ob.id ASC;\n```\n\n## Explanation\n\n- The CTE defines the base offering rows.\n- The outer query enriches them with course and teacher data.\n\n## Difference from the optimal approach\n\nCorrect, but longer than needed.",
      },
      {
        approach_title: "Inner teacher",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name FROM course_offerings co JOIN courses c ON co.course_id = c.id JOIN users u ON co.primary_teacher_id = u.id ORDER BY co.id ASC;",
        explanation:
          "## Approach\n\nUse inner joins for both related tables.\n\n## Query\n\n```sql\nSELECT co.id AS offering_id, c.course_title, u.full_name AS teacher_name\nFROM course_offerings co\nJOIN courses c ON co.course_id = c.id\nJOIN users u ON co.primary_teacher_id = u.id\nORDER BY co.id ASC;\n```\n\n## Explanation\n\n- This returns only offerings that have a primary teacher assigned.\n- Any offering with NULL `primary_teacher_id` will be dropped.\n\n## Difference from the optimal approach\n\nLess safe because it may exclude valid course offerings.",
      },
    ],
  },
  {
    code: "EDUCATION_044",
    approaches: [
      {
        approach_title: "Join group",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.program_name, COUNT(*) AS total_students FROM student_profiles sp JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' GROUP BY p.program_name ORDER BY total_students DESC, p.program_name ASC;",
        explanation:
          "## Approach\n\nJoin active student profiles to programs, then group by program.\n\n## Query\n\n```sql\nSELECT p.program_name, COUNT(*) AS total_students\nFROM student_profiles sp\nJOIN programs p ON sp.program_id = p.id\nWHERE sp.enrollment_status = 'active'\nGROUP BY p.program_name\nORDER BY total_students DESC, p.program_name ASC;\n```\n\n## Explanation\n\n- `WHERE sp.enrollment_status = 'active'` keeps only active students.\n- `JOIN programs` gives the program name.\n- `GROUP BY p.program_name` counts students per program.\n\n## Why this is optimal\n\nIt matches the question directly and keeps the grouping simple.",
      },
      {
        approach_title: "Group by id",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.program_name, COUNT(*) AS total_students FROM student_profiles sp JOIN programs p ON sp.program_id = p.id WHERE sp.enrollment_status = 'active' GROUP BY p.id, p.program_name ORDER BY total_students DESC, p.program_name ASC;",
        explanation:
          "## Approach\n\nGroup by both program id and program name.\n\n## Query\n\n```sql\nSELECT p.program_name, COUNT(*) AS total_students\nFROM student_profiles sp\nJOIN programs p ON sp.program_id = p.id\nWHERE sp.enrollment_status = 'active'\nGROUP BY p.id, p.program_name\nORDER BY total_students DESC, p.program_name ASC;\n```\n\n## Explanation\n\n- Grouping by `p.id` and `p.program_name` is fully explicit.\n- It returns the same result because each id maps to one program name.\n\n## Difference from the optimal approach\n\nCorrect, but grouping only by the selected label is simpler here.",
      },
      {
        approach_title: "CTE active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_students AS (SELECT program_id FROM student_profiles WHERE enrollment_status = 'active') SELECT p.program_name, COUNT(*) AS total_students FROM active_students a JOIN programs p ON a.program_id = p.id GROUP BY p.program_name ORDER BY total_students DESC, p.program_name ASC;",
        explanation:
          "## Approach\n\nFirst isolate active students, then join to programs and count.\n\n## Query\n\n```sql\nWITH active_students AS (\n  SELECT program_id\n  FROM student_profiles\n  WHERE enrollment_status = 'active'\n)\nSELECT p.program_name, COUNT(*) AS total_students\nFROM active_students a\nJOIN programs p ON a.program_id = p.id\nGROUP BY p.program_name\nORDER BY total_students DESC, p.program_name ASC;\n```\n\n## Explanation\n\n- The CTE filters student rows first.\n- The outer query groups active students by program name.\n\n## Difference from the optimal approach\n\nMore verbose, but fine if more filters need to be added.",
      },
    ],
  },
  {
    code: "EDUCATION_045",
    approaches: [
      {
        approach_title: "Join low attendance",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id AS user_id, u.full_name, sp.attendance_percentage FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE sp.attendance_percentage < 75 ORDER BY sp.attendance_percentage ASC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin student profiles to users, then filter low attendance.\n\n## Query\n\n```sql\nSELECT u.id AS user_id, u.full_name, sp.attendance_percentage\nFROM student_profiles sp\nJOIN users u ON sp.user_id = u.id\nWHERE sp.attendance_percentage < 75\nORDER BY sp.attendance_percentage ASC, u.id ASC;\n```\n\n## Explanation\n\n- `JOIN users` gets the student name.\n- `WHERE sp.attendance_percentage < 75` keeps students below the threshold.\n- Lower attendance appears first in the result.\n\n## Why this is optimal\n\nIt directly combines the needed student identity and attendance filter.",
      },
      {
        approach_title: "CTE low",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH low_attendance AS (SELECT user_id, attendance_percentage FROM student_profiles WHERE attendance_percentage < 75) SELECT u.id AS user_id, u.full_name, l.attendance_percentage FROM low_attendance l JOIN users u ON l.user_id = u.id ORDER BY l.attendance_percentage ASC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst isolate low-attendance students in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH low_attendance AS (\n  SELECT user_id, attendance_percentage\n  FROM student_profiles\n  WHERE attendance_percentage < 75\n)\nSELECT u.id AS user_id, u.full_name, l.attendance_percentage\nFROM low_attendance l\nJOIN users u ON l.user_id = u.id\nORDER BY l.attendance_percentage ASC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE stores only students below 75 percent attendance.\n- The outer query adds names and orders the result.\n\n## Difference from the optimal approach\n\nLonger, but useful if more low-attendance analysis is needed.",
      },
      {
        approach_title: "Between filter",
        approach_type: "comparison",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id AS user_id, u.full_name, sp.attendance_percentage FROM student_profiles sp JOIN users u ON sp.user_id = u.id WHERE sp.attendance_percentage BETWEEN 0 AND 74.999999 ORDER BY sp.attendance_percentage ASC, u.id ASC;",
        explanation:
          "## Approach\n\nUse a numeric range instead of a simple less-than comparison.\n\n## Query\n\n```sql\nSELECT u.id AS user_id, u.full_name, sp.attendance_percentage\nFROM student_profiles sp\nJOIN users u ON sp.user_id = u.id\nWHERE sp.attendance_percentage BETWEEN 0 AND 74.999999\nORDER BY sp.attendance_percentage ASC, u.id ASC;\n```\n\n## Explanation\n\n- This range also captures values below 75.\n- It assumes attendance percentages are non-negative.\n\n## Difference from the optimal approach\n\nIt works, but `attendance_percentage < 75` is much clearer.",
      },
    ],
  },
  {
    code: "EDUCATION_046",
    approaches: [
      {
        approach_title: "Join avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.obtained_marks IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;",
        explanation:
          "## Approach\n\nJoin assignments to submissions, then average non-NULL scores.\n\n## Query\n\n```sql\nSELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score\nFROM assignments a\nJOIN assignment_submissions s ON a.id = s.assignment_id\nWHERE s.obtained_marks IS NOT NULL\nGROUP BY a.id, a.assignment_title\nORDER BY avg_score DESC, a.id ASC;\n```\n\n## Explanation\n\n- `JOIN assignment_submissions` links each assignment to its submissions.\n- `WHERE s.obtained_marks IS NOT NULL` keeps only graded submissions.\n- `AVG` calculates the average score for each assignment.\n\n## Why this is optimal\n\nIt is the clearest grouped average across related tables.",
      },
      {
        approach_title: "Left join avg",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.obtained_marks IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;",
        explanation:
          "## Approach\n\nUse a left join, but still filter to scored submissions.\n\n## Query\n\n```sql\nSELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score\nFROM assignments a\nLEFT JOIN assignment_submissions s ON a.id = s.assignment_id\nWHERE s.obtained_marks IS NOT NULL\nGROUP BY a.id, a.assignment_title\nORDER BY avg_score DESC, a.id ASC;\n```\n\n## Explanation\n\n- Because the `WHERE` clause requires non-NULL marks, the result behaves like an inner join.\n- It returns the same scored assignments.\n\n## Difference from the optimal approach\n\nCorrect, but `JOIN` is clearer because unscored rows are excluded anyway.",
      },
      {
        approach_title: "CTE scores",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH scored_submissions AS (SELECT assignment_id, obtained_marks FROM assignment_submissions WHERE obtained_marks IS NOT NULL) SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score FROM assignments a JOIN scored_submissions s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title ORDER BY avg_score DESC, a.id ASC;",
        explanation:
          "## Approach\n\nFilter scored submissions in a CTE first, then join to assignments.\n\n## Query\n\n```sql\nWITH scored_submissions AS (\n  SELECT assignment_id, obtained_marks\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n)\nSELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.obtained_marks), 2) AS avg_score\nFROM assignments a\nJOIN scored_submissions s ON a.id = s.assignment_id\nGROUP BY a.id, a.assignment_title\nORDER BY avg_score DESC, a.id ASC;\n```\n\n## Explanation\n\n- The CTE removes ungraded submissions first.\n- The outer query averages only valid scores per assignment.\n\n## Difference from the optimal approach\n\nMore verbose, but it can make larger queries easier to read.",
      },
    ],
  },
  {
    code: "EDUCATION_047",
    approaches: [
      {
        approach_title: "Join pass count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students FROM exams e JOIN exam_results er ON e.id = er.exam_id WHERE er.grade_letter IS NOT NULL AND er.grade_letter <> 'F' GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;",
        explanation:
          "## Approach\n\nJoin exams to results, then count non-failing grades.\n\n## Query\n\n```sql\nSELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students\nFROM exams e\nJOIN exam_results er ON e.id = er.exam_id\nWHERE er.grade_letter IS NOT NULL\n  AND er.grade_letter <> 'F'\nGROUP BY e.id, e.exam_name\nORDER BY passed_students DESC, e.id ASC;\n```\n\n## Explanation\n\n- `JOIN exam_results` links each exam to student outcomes.\n- `grade_letter <> 'F'` treats non-F grades as passes.\n- `COUNT(*)` counts how many students passed each exam.\n\n## Why this is optimal\n\nIt directly expresses the pass condition and grouped counting logic.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT e.id AS exam_id, e.exam_name, COUNT(*) FILTER (WHERE er.grade_letter IS NOT NULL AND er.grade_letter <> 'F') AS passed_students FROM exams e JOIN exam_results er ON e.id = er.exam_id GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;",
        explanation:
          "## Approach\n\nCount passed students using `FILTER` inside the aggregate.\n\n## Query\n\n```sql\nSELECT e.id AS exam_id, e.exam_name,\n       COUNT(*) FILTER (WHERE er.grade_letter IS NOT NULL AND er.grade_letter <> 'F') AS passed_students\nFROM exams e\nJOIN exam_results er ON e.id = er.exam_id\nGROUP BY e.id, e.exam_name\nORDER BY passed_students DESC, e.id ASC;\n```\n\n## Explanation\n\n- `FILTER` applies the pass condition only inside the count.\n- This is useful when pass and fail counts are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
      {
        approach_title: "CTE passed",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH passed_results AS (SELECT exam_id FROM exam_results WHERE grade_letter IS NOT NULL AND grade_letter <> 'F') SELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students FROM exams e JOIN passed_results pr ON e.id = pr.exam_id GROUP BY e.id, e.exam_name ORDER BY passed_students DESC, e.id ASC;",
        explanation:
          "## Approach\n\nFilter passing results in a CTE, then join to exams.\n\n## Query\n\n```sql\nWITH passed_results AS (\n  SELECT exam_id\n  FROM exam_results\n  WHERE grade_letter IS NOT NULL\n    AND grade_letter <> 'F'\n)\nSELECT e.id AS exam_id, e.exam_name, COUNT(*) AS passed_students\nFROM exams e\nJOIN passed_results pr ON e.id = pr.exam_id\nGROUP BY e.id, e.exam_name\nORDER BY passed_students DESC, e.id ASC;\n```\n\n## Explanation\n\n- The CTE stores only passing exam results.\n- The outer query counts them per exam.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the pass set is reused.",
      },
    ],
  },
  {
    code: "EDUCATION_048",
    approaches: [
      {
        approach_title: "Join revenue",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected FROM payments pay JOIN fee_invoices fi ON pay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id WHERE pay.payment_status = 'successful' GROUP BY p.program_name ORDER BY total_collected DESC, p.program_name ASC;",
        explanation:
          "## Approach\n\nJoin successful payments through invoices and students to programs, then sum amounts.\n\n## Query\n\n```sql\nSELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected\nFROM payments pay\nJOIN fee_invoices fi ON pay.invoice_id = fi.id\nJOIN student_profiles sp ON fi.student_user_id = sp.user_id\nJOIN programs p ON sp.program_id = p.id\nWHERE pay.payment_status = 'successful'\nGROUP BY p.program_name\nORDER BY total_collected DESC, p.program_name ASC;\n```\n\n## Explanation\n\n- `payments` contains the actual money collected.\n- `fee_invoices` links payments to students.\n- `student_profiles` maps students to programs.\n- Grouping by program name gives total collected per program.\n\n## Why this is optimal\n\nIt follows the business path of the data in the most direct way.",
      },
      {
        approach_title: "CTE paid",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH successful_payments AS (SELECT invoice_id, paid_amount FROM payments WHERE payment_status = 'successful') SELECT p.program_name, ROUND(SUM(spay.paid_amount), 2) AS total_collected FROM successful_payments spay JOIN fee_invoices fi ON spay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id GROUP BY p.program_name ORDER BY total_collected DESC, p.program_name ASC;",
        explanation:
          "## Approach\n\nFilter successful payments first in a CTE, then join through to programs.\n\n## Query\n\n```sql\nWITH successful_payments AS (\n  SELECT invoice_id, paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT p.program_name, ROUND(SUM(spay.paid_amount), 2) AS total_collected\nFROM successful_payments spay\nJOIN fee_invoices fi ON spay.invoice_id = fi.id\nJOIN student_profiles sp ON fi.student_user_id = sp.user_id\nJOIN programs p ON sp.program_id = p.id\nGROUP BY p.program_name\nORDER BY total_collected DESC, p.program_name ASC;\n```\n\n## Explanation\n\n- The CTE narrows the payment table to successful transactions only.\n- The outer query performs the same joins and aggregation.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when successful payments are reused.",
      },
      {
        approach_title: "Group by id",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected FROM payments pay JOIN fee_invoices fi ON pay.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN programs p ON sp.program_id = p.id WHERE pay.payment_status = 'successful' GROUP BY p.id, p.program_name ORDER BY total_collected DESC, p.program_name ASC;",
        explanation:
          "## Approach\n\nGroup by both program id and program name.\n\n## Query\n\n```sql\nSELECT p.program_name, ROUND(SUM(pay.paid_amount), 2) AS total_collected\nFROM payments pay\nJOIN fee_invoices fi ON pay.invoice_id = fi.id\nJOIN student_profiles sp ON fi.student_user_id = sp.user_id\nJOIN programs p ON sp.program_id = p.id\nWHERE pay.payment_status = 'successful'\nGROUP BY p.id, p.program_name\nORDER BY total_collected DESC, p.program_name ASC;\n```\n\n## Explanation\n\n- Grouping by the id and label is fully explicit.\n- It returns the same totals because each id has one program name.\n\n## Difference from the optimal approach\n\nCorrect, but grouping only by the selected label is simpler here.",
      },
    ],
  },
  {
    code: "EDUCATION_049",
    approaches: [
      {
        approach_title: "Capacity filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id AS offering_id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count >= seat_limit * 0.9 ORDER BY enrolled_count DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter offerings whose enrolled count is at least 90 percent of capacity.\n\n## Query\n\n```sql\nSELECT id AS offering_id, seat_limit, enrolled_count\nFROM course_offerings\nWHERE seat_limit IS NOT NULL\n  AND seat_limit > 0\n  AND enrolled_count >= seat_limit * 0.9\nORDER BY enrolled_count DESC, id ASC;\n```\n\n## Explanation\n\n- `seat_limit > 0` avoids division-style edge cases and meaningless zero-capacity rows.\n- `enrolled_count >= seat_limit * 0.9` checks the 90 percent threshold.\n- Results are ordered by enrolled count descending.\n\n## Why this is optimal\n\nIt is a direct and readable threshold check without unnecessary calculations.",
      },
      {
        approach_title: "Percent ratio",
        approach_type: "arithmetic",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id AS offering_id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count::numeric / seat_limit >= 0.9 ORDER BY enrolled_count DESC, id ASC;",
        explanation:
          "## Approach\n\nConvert the comparison into a ratio of enrolled seats to total seats.\n\n## Query\n\n```sql\nSELECT id AS offering_id, seat_limit, enrolled_count\nFROM course_offerings\nWHERE seat_limit IS NOT NULL\n  AND seat_limit > 0\n  AND enrolled_count::numeric / seat_limit >= 0.9\nORDER BY enrolled_count DESC, id ASC;\n```\n\n## Explanation\n\n- `enrolled_count::numeric / seat_limit` computes the fill ratio.\n- Comparing it to `0.9` captures offerings near capacity.\n\n## Difference from the optimal approach\n\nCorrect, but multiplication is simpler and avoids explicit casting.",
      },
      {
        approach_title: "CTE near cap",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH near_capacity AS (SELECT id, seat_limit, enrolled_count FROM course_offerings WHERE seat_limit IS NOT NULL AND seat_limit > 0 AND enrolled_count >= seat_limit * 0.9) SELECT id AS offering_id, seat_limit, enrolled_count FROM near_capacity ORDER BY enrolled_count DESC, id ASC;",
        explanation:
          "## Approach\n\nStore near-capacity offerings in a CTE, then return them.\n\n## Query\n\n```sql\nWITH near_capacity AS (\n  SELECT id, seat_limit, enrolled_count\n  FROM course_offerings\n  WHERE seat_limit IS NOT NULL\n    AND seat_limit > 0\n    AND enrolled_count >= seat_limit * 0.9\n)\nSELECT id AS offering_id, seat_limit, enrolled_count\nFROM near_capacity\nORDER BY enrolled_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the offerings that meet the threshold.\n- The outer query formats and sorts the result.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if additional capacity logic is needed later.",
      },
    ],
  },
  {
    code: "EDUCATION_050",
    approaches: [
      {
        approach_title: "Left join count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT dt.id AS thread_id, dt.thread_title, COUNT(dp.id) AS total_posts FROM discussion_threads dt LEFT JOIN discussion_posts dp ON dt.id = dp.thread_id GROUP BY dt.id, dt.thread_title ORDER BY total_posts DESC, dt.id ASC;",
        explanation:
          "## Approach\n\nLeft join posts to threads so threads with zero posts are still included.\n\n## Query\n\n```sql\nSELECT dt.id AS thread_id, dt.thread_title, COUNT(dp.id) AS total_posts\nFROM discussion_threads dt\nLEFT JOIN discussion_posts dp ON dt.id = dp.thread_id\nGROUP BY dt.id, dt.thread_title\nORDER BY total_posts DESC, dt.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps every discussion thread.\n- `COUNT(dp.id)` counts only matching post rows, so empty threads get 0.\n- Grouping by thread id and title returns one row per thread.\n\n## Why this is optimal\n\nIt correctly includes threads with no posts, which is important for a complete count.",
      },
      {
        approach_title: "Subquery count",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT dt.id AS thread_id, dt.thread_title, (SELECT COUNT(*) FROM discussion_posts dp WHERE dp.thread_id = dt.id) AS total_posts FROM discussion_threads dt ORDER BY total_posts DESC, dt.id ASC;",
        explanation:
          "## Approach\n\nUse a correlated subquery to count posts for each thread.\n\n## Query\n\n```sql\nSELECT dt.id AS thread_id, dt.thread_title,\n       (SELECT COUNT(*)\n        FROM discussion_posts dp\n        WHERE dp.thread_id = dt.id) AS total_posts\nFROM discussion_threads dt\nORDER BY total_posts DESC, dt.id ASC;\n```\n\n## Explanation\n\n- The subquery runs once per thread.\n- It counts how many posts belong to that thread.\n- Threads with no posts naturally get 0.\n\n## Difference from the optimal approach\n\nCorrect, but usually less efficient than a grouped join.",
      },
      {
        approach_title: "CTE post counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH post_counts AS (SELECT thread_id, COUNT(*) AS total_posts FROM discussion_posts GROUP BY thread_id) SELECT dt.id AS thread_id, dt.thread_title, COALESCE(pc.total_posts, 0) AS total_posts FROM discussion_threads dt LEFT JOIN post_counts pc ON dt.id = pc.thread_id ORDER BY total_posts DESC, dt.id ASC;",
        explanation:
          "## Approach\n\nCount posts per thread in a CTE, then left join to all threads.\n\n## Query\n\n```sql\nWITH post_counts AS (\n  SELECT thread_id, COUNT(*) AS total_posts\n  FROM discussion_posts\n  GROUP BY thread_id\n)\nSELECT dt.id AS thread_id, dt.thread_title, COALESCE(pc.total_posts, 0) AS total_posts\nFROM discussion_threads dt\nLEFT JOIN post_counts pc ON dt.id = pc.thread_id\nORDER BY total_posts DESC, dt.id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one post total per thread that has posts.\n- `LEFT JOIN` brings those totals onto all threads.\n- `COALESCE` converts missing counts to 0.\n\n## Difference from the optimal approach\n\nA bit longer, but very readable for learners.",
      },
    ],
  },
  {
    code: "EDUCATION_051",
    approaches: [
      {
        approach_title: "Join guardian",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM guardian_relationships gr JOIN users su ON gr.student_user_id = su.id JOIN users gu ON gr.guardian_user_id = gu.id WHERE gr.is_primary = true ORDER BY su.id ASC;",
        explanation:
          "## Approach\n\nJoin the guardian relationship table to `users` twice.\n\n## Query\n\n```sql\nSELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name\nFROM guardian_relationships gr\nJOIN users su ON gr.student_user_id = su.id\nJOIN users gu ON gr.guardian_user_id = gu.id\nWHERE gr.is_primary = true\nORDER BY su.id ASC;\n```\n\n## Explanation\n\n- `guardian_relationships` links a student to a guardian.\n- The first join gets the student name.\n- The second join gets the guardian name.\n- `WHERE gr.is_primary = true` keeps only the primary guardian.\n\n## Why this is optimal\n\nIt is the clearest way to read both names from the same `users` table.",
      },
      {
        approach_title: "Boolean primary",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM guardian_relationships gr JOIN users su ON gr.student_user_id = su.id JOIN users gu ON gr.guardian_user_id = gu.id WHERE gr.is_primary ORDER BY su.id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand for the primary guardian flag.\n\n## Query\n\n```sql\nSELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name\nFROM guardian_relationships gr\nJOIN users su ON gr.student_user_id = su.id\nJOIN users gu ON gr.guardian_user_id = gu.id\nWHERE gr.is_primary\nORDER BY su.id ASC;\n```\n\n## Explanation\n\n- `WHERE gr.is_primary` means the same as `WHERE gr.is_primary = true`.\n- The joins still return the student and guardian names.\n\n## Difference from the optimal approach\n\nIt works, but the explicit comparison is clearer for learners.",
      },
      {
        approach_title: "CTE primary",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH primary_guardians AS (SELECT student_user_id, guardian_user_id FROM guardian_relationships WHERE is_primary = true) SELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name FROM primary_guardians pg JOIN users su ON pg.student_user_id = su.id JOIN users gu ON pg.guardian_user_id = gu.id ORDER BY su.id ASC;",
        explanation:
          "## Approach\n\nFilter primary guardian rows first, then join to users.\n\n## Query\n\n```sql\nWITH primary_guardians AS (\n  SELECT student_user_id, guardian_user_id\n  FROM guardian_relationships\n  WHERE is_primary = true\n)\nSELECT su.id AS student_user_id, su.full_name AS student_name, gu.full_name AS guardian_name\nFROM primary_guardians pg\nJOIN users su ON pg.student_user_id = su.id\nJOIN users gu ON pg.guardian_user_id = gu.id\nORDER BY su.id ASC;\n```\n\n## Explanation\n\n- The CTE stores only primary guardian relationships.\n- The outer query adds student and guardian names.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "EDUCATION_052",
    approaches: [
      {
        approach_title: "Group sessions",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT offering_id, COUNT(*) AS total_sessions FROM attendance_sessions GROUP BY offering_id ORDER BY total_sessions DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nGroup attendance sessions by offering and count them.\n\n## Query\n\n```sql\nSELECT offering_id, COUNT(*) AS total_sessions\nFROM attendance_sessions\nGROUP BY offering_id\nORDER BY total_sessions DESC, offering_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY offering_id` creates one group per course offering.\n- `COUNT(*)` returns how many attendance sessions belong to each offering.\n- Sorting puts the largest counts first.\n\n## Why this is optimal\n\nIt directly answers the question with one grouped count.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT offering_id, COUNT(id) AS total_sessions FROM attendance_sessions GROUP BY offering_id ORDER BY total_sessions DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nCount session ids inside each offering group.\n\n## Query\n\n```sql\nSELECT offering_id, COUNT(id) AS total_sessions\nFROM attendance_sessions\nGROUP BY offering_id\nORDER BY total_sessions DESC, offering_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL session ids.\n- Since `id` is the primary key, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but counting rows is more direct.",
      },
      {
        approach_title: "CTE sessions",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH session_counts AS (SELECT offering_id, COUNT(*) AS total_sessions FROM attendance_sessions GROUP BY offering_id) SELECT offering_id, total_sessions FROM session_counts ORDER BY total_sessions DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nCompute attendance session counts in a CTE first.\n\n## Query\n\n```sql\nWITH session_counts AS (\n  SELECT offering_id, COUNT(*) AS total_sessions\n  FROM attendance_sessions\n  GROUP BY offering_id\n)\nSELECT offering_id, total_sessions\nFROM session_counts\nORDER BY total_sessions DESC, offering_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one session count per offering.\n- The outer query applies the final order.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_053",
    approaches: [
      {
        approach_title: "Filter present",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ar.student_user_id, COUNT(*) AS present_count FROM attendance_records ar WHERE ar.attendance_status = 'present' GROUP BY ar.student_user_id ORDER BY present_count DESC, ar.student_user_id ASC;",
        explanation:
          "## Approach\n\nFilter to present attendance rows before counting.\n\n## Query\n\n```sql\nSELECT ar.student_user_id, COUNT(*) AS present_count\nFROM attendance_records ar\nWHERE ar.attendance_status = 'present'\nGROUP BY ar.student_user_id\nORDER BY present_count DESC, ar.student_user_id ASC;\n```\n\n## Explanation\n\n- `WHERE attendance_status = 'present'` keeps only present records.\n- `GROUP BY student_user_id` creates one row per student.\n- `COUNT(*)` counts present records only.\n\n## Why this is optimal\n\nIt avoids returning students who have attendance records but no present records.",
      },
      {
        approach_title: "CTE present",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH present_records AS (SELECT student_user_id FROM attendance_records WHERE attendance_status = 'present') SELECT student_user_id, COUNT(*) AS present_count FROM present_records GROUP BY student_user_id ORDER BY present_count DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nStore present records in a CTE, then count them.\n\n## Query\n\n```sql\nWITH present_records AS (\n  SELECT student_user_id\n  FROM attendance_records\n  WHERE attendance_status = 'present'\n)\nSELECT student_user_id, COUNT(*) AS present_count\nFROM present_records\nGROUP BY student_user_id\nORDER BY present_count DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates present attendance rows.\n- The outer query counts those rows per student.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the filtered dataset is reused.",
      },
      {
        approach_title: "Filter with HAVING",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ar.student_user_id, COUNT(*) FILTER (WHERE ar.attendance_status = 'present') AS present_count FROM attendance_records ar GROUP BY ar.student_user_id HAVING COUNT(*) FILTER (WHERE ar.attendance_status = 'present') > 0 ORDER BY present_count DESC, ar.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` for the present count, then remove students with zero present records.\n\n## Query\n\n```sql\nSELECT ar.student_user_id,\n       COUNT(*) FILTER (WHERE ar.attendance_status = 'present') AS present_count\nFROM attendance_records ar\nGROUP BY ar.student_user_id\nHAVING COUNT(*) FILTER (WHERE ar.attendance_status = 'present') > 0\nORDER BY present_count DESC, ar.student_user_id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts only present rows.\n- Without `HAVING`, students with zero present rows would still appear.\n- `HAVING ... > 0` makes the row set match the filtered approach.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than filtering present rows before grouping.",
      },
    ],
  },
  {
    code: "EDUCATION_054",
    approaches: [
      {
        approach_title: "Left join late",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id AS assignment_id, a.assignment_title, COUNT(s.id) AS late_submissions FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.submission_status = 'late_submitted' GROUP BY a.id, a.assignment_title ORDER BY late_submissions DESC, a.id ASC;",
        explanation:
          "## Approach\n\nLeft join only late submissions so assignments with zero late submissions still appear.\n\n## Query\n\n```sql\nSELECT a.id AS assignment_id, a.assignment_title, COUNT(s.id) AS late_submissions\nFROM assignments a\nLEFT JOIN assignment_submissions s\n  ON a.id = s.assignment_id\n AND s.submission_status = 'late_submitted'\nGROUP BY a.id, a.assignment_title\nORDER BY late_submissions DESC, a.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps every assignment.\n- The late-submission condition is placed in the join.\n- `COUNT(s.id)` counts only matching late submissions.\n- Assignments without late submissions get 0.\n\n## Why this is optimal\n\nIt correctly includes assignments with no late submissions, which a plain `WHERE` filter would miss.",
      },
      {
        approach_title: "CTE late counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH late_counts AS (SELECT assignment_id, COUNT(*) AS late_submissions FROM assignment_submissions WHERE submission_status = 'late_submitted' GROUP BY assignment_id) SELECT a.id AS assignment_id, a.assignment_title, COALESCE(lc.late_submissions, 0) AS late_submissions FROM assignments a LEFT JOIN late_counts lc ON a.id = lc.assignment_id ORDER BY late_submissions DESC, a.id ASC;",
        explanation:
          "## Approach\n\nCount late submissions first, then left join them to all assignments.\n\n## Query\n\n```sql\nWITH late_counts AS (\n  SELECT assignment_id, COUNT(*) AS late_submissions\n  FROM assignment_submissions\n  WHERE submission_status = 'late_submitted'\n  GROUP BY assignment_id\n)\nSELECT a.id AS assignment_id, a.assignment_title, COALESCE(lc.late_submissions, 0) AS late_submissions\nFROM assignments a\nLEFT JOIN late_counts lc ON a.id = lc.assignment_id\nORDER BY late_submissions DESC, a.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one late-submission count per assignment.\n- `LEFT JOIN` keeps assignments that have no late submissions.\n- `COALESCE` converts NULL counts to 0.\n\n## Difference from the optimal approach\n\nA bit longer, but very readable.",
      },
      {
        approach_title: "FILTER late",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT a.id AS assignment_id, a.assignment_title, COUNT(s.id) FILTER (WHERE s.submission_status = 'late_submitted') AS late_submissions FROM assignments a LEFT JOIN assignment_submissions s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title ORDER BY late_submissions DESC, a.id ASC;",
        explanation:
          "## Approach\n\nJoin all submissions, then count late ones with `FILTER`.\n\n## Query\n\n```sql\nSELECT a.id AS assignment_id, a.assignment_title,\n       COUNT(s.id) FILTER (WHERE s.submission_status = 'late_submitted') AS late_submissions\nFROM assignments a\nLEFT JOIN assignment_submissions s ON a.id = s.assignment_id\nGROUP BY a.id, a.assignment_title\nORDER BY late_submissions DESC, a.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all assignments.\n- `FILTER` limits the count to late-submitted rows only.\n- This returns the same result as the optimal query.\n\n## Difference from the optimal approach\n\nFlexible, but slightly less direct.",
      },
    ],
  },
  {
    code: "EDUCATION_055",
    approaches: [
      {
        approach_title: "Join avg plagiarism",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.plagiarism_score IS NOT NULL GROUP BY a.id, a.assignment_title ORDER BY avg_plagiarism_score DESC, a.id ASC;",
        explanation:
          "## Approach\n\nJoin assignments to submissions, then average only valid plagiarism scores.\n\n## Query\n\n```sql\nSELECT a.id AS assignment_id, a.assignment_title,\n       ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score\nFROM assignments a\nJOIN assignment_submissions s ON a.id = s.assignment_id\nWHERE s.plagiarism_score IS NOT NULL\nGROUP BY a.id, a.assignment_title\nORDER BY avg_plagiarism_score DESC, a.id ASC;\n```\n\n## Explanation\n\n- `JOIN assignment_submissions` connects each assignment with its submissions.\n- `WHERE s.plagiarism_score IS NOT NULL` removes submissions without plagiarism data.\n- `AVG(s.plagiarism_score)` calculates the average plagiarism score per assignment.\n- `ROUND(..., 2)` formats the average to 2 decimals.\n- Results are ordered by highest average plagiarism score first.\n\n## Why this is optimal\n\nIt filters invalid rows before aggregation, so only assignments with real plagiarism scores are returned.",
      },
      {
        approach_title: "CTE scores",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH scored_plagiarism AS (SELECT assignment_id, plagiarism_score FROM assignment_submissions WHERE plagiarism_score IS NOT NULL) SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score FROM assignments a JOIN scored_plagiarism s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title ORDER BY avg_plagiarism_score DESC, a.id ASC;",
        explanation:
          "## Approach\n\nFirst isolate submissions that have plagiarism scores, then join them to assignments.\n\n## Query\n\n```sql\nWITH scored_plagiarism AS (\n  SELECT assignment_id, plagiarism_score\n  FROM assignment_submissions\n  WHERE plagiarism_score IS NOT NULL\n)\nSELECT a.id AS assignment_id, a.assignment_title,\n       ROUND(AVG(s.plagiarism_score), 2) AS avg_plagiarism_score\nFROM assignments a\nJOIN scored_plagiarism s ON a.id = s.assignment_id\nGROUP BY a.id, a.assignment_title\nORDER BY avg_plagiarism_score DESC, a.id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only submissions with non-NULL plagiarism scores.\n- The main query joins those scored submissions to assignments.\n- The grouped `AVG` returns one average score per assignment.\n- Sorting places assignments with higher average plagiarism first.\n\n## Difference from the optimal approach\n\nIt returns the same result, but uses an extra CTE step for readability.",
      },
      {
        approach_title: "CASE with HAVING",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT a.id AS assignment_id, a.assignment_title, ROUND(AVG(CASE WHEN s.plagiarism_score IS NOT NULL THEN s.plagiarism_score END), 2) AS avg_plagiarism_score FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id GROUP BY a.id, a.assignment_title HAVING COUNT(s.plagiarism_score) > 0 ORDER BY avg_plagiarism_score DESC, a.id ASC;",
        explanation:
          "## Approach\n\nUse conditional averaging, then remove assignments that have no plagiarism scores.\n\n## Query\n\n```sql\nSELECT a.id AS assignment_id, a.assignment_title,\n       ROUND(AVG(CASE WHEN s.plagiarism_score IS NOT NULL THEN s.plagiarism_score END), 2) AS avg_plagiarism_score\nFROM assignments a\nJOIN assignment_submissions s ON a.id = s.assignment_id\nGROUP BY a.id, a.assignment_title\nHAVING COUNT(s.plagiarism_score) > 0\nORDER BY avg_plagiarism_score DESC, a.id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression passes plagiarism scores only when they are not NULL.\n- `AVG` ignores NULL values automatically.\n- `HAVING COUNT(s.plagiarism_score) > 0` removes assignments where every plagiarism score is NULL.\n- This avoids returning extra assignments with NULL averages.\n\n## Difference from the optimal approach\n\nIt works, but filtering non-NULL plagiarism scores before grouping is simpler and clearer.",
      },
    ],
  },
  {
    code: "EDUCATION_056",
    approaches: [
      {
        approach_title: "Join results",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.exam_name, u.full_name, er.obtained_marks FROM exam_results er JOIN exams e ON er.exam_id = e.id JOIN users u ON er.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;",
        explanation:
          "## Approach\n\nJoin exam results to exams and users.\n\n## Query\n\n```sql\nSELECT e.exam_name, u.full_name, er.obtained_marks\nFROM exam_results er\nJOIN exams e ON er.exam_id = e.id\nJOIN users u ON er.student_user_id = u.id\nORDER BY e.exam_name ASC, u.full_name ASC;\n```\n\n## Explanation\n\n- `exam_results` contains the marks.\n- `JOIN exams` gets the exam name.\n- `JOIN users` gets the student name.\n- Results are ordered by exam name, then student name.\n\n## Why this is optimal\n\nIt directly connects the result row to the two descriptive tables.",
      },
      {
        approach_title: "CTE results",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH result_base AS (SELECT exam_id, student_user_id, obtained_marks FROM exam_results) SELECT e.exam_name, u.full_name, rb.obtained_marks FROM result_base rb JOIN exams e ON rb.exam_id = e.id JOIN users u ON rb.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;",
        explanation:
          "## Approach\n\nStore the base result rows in a CTE, then join to lookup tables.\n\n## Query\n\n```sql\nWITH result_base AS (\n  SELECT exam_id, student_user_id, obtained_marks\n  FROM exam_results\n)\nSELECT e.exam_name, u.full_name, rb.obtained_marks\nFROM result_base rb\nJOIN exams e ON rb.exam_id = e.id\nJOIN users u ON rb.student_user_id = u.id\nORDER BY e.exam_name ASC, u.full_name ASC;\n```\n\n## Explanation\n\n- The CTE isolates the result facts.\n- The outer query adds exam and student labels.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
      {
        approach_title: "Subquery base",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT e.exam_name, u.full_name, r.obtained_marks FROM (SELECT exam_id, student_user_id, obtained_marks FROM exam_results) r JOIN exams e ON r.exam_id = e.id JOIN users u ON r.student_user_id = u.id ORDER BY e.exam_name ASC, u.full_name ASC;",
        explanation:
          "## Approach\n\nUse a derived table for the base result rows.\n\n## Query\n\n```sql\nSELECT e.exam_name, u.full_name, r.obtained_marks\nFROM (\n  SELECT exam_id, student_user_id, obtained_marks\n  FROM exam_results\n) r\nJOIN exams e ON r.exam_id = e.id\nJOIN users u ON r.student_user_id = u.id\nORDER BY e.exam_name ASC, u.full_name ASC;\n```\n\n## Explanation\n\n- The inner query selects the result facts.\n- The outer query joins names and sorts the output.\n\n## Difference from the optimal approach\n\nCorrect, but the extra layer is unnecessary.",
      },
    ],
  },
  {
    code: "EDUCATION_057",
    approaches: [
      {
        approach_title: "Group views",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT mv.user_id, COUNT(*) AS total_materials_viewed FROM material_views mv GROUP BY mv.user_id ORDER BY total_materials_viewed DESC, mv.user_id ASC;",
        explanation:
          "## Approach\n\nGroup material view rows by user and count them.\n\n## Query\n\n```sql\nSELECT mv.user_id, COUNT(*) AS total_materials_viewed\nFROM material_views mv\nGROUP BY mv.user_id\nORDER BY total_materials_viewed DESC, mv.user_id ASC;\n```\n\n## Explanation\n\n- Each row in `material_views` represents one user-material pair.\n- `GROUP BY user_id` creates one group per user.\n- `COUNT(*)` returns how many materials each user viewed.\n\n## Why this is optimal\n\nIt is the most direct grouped count query.",
      },
      {
        approach_title: "Count material ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT mv.user_id, COUNT(mv.material_id) AS total_materials_viewed FROM material_views mv GROUP BY mv.user_id ORDER BY total_materials_viewed DESC, mv.user_id ASC;",
        explanation:
          "## Approach\n\nCount material ids per user.\n\n## Query\n\n```sql\nSELECT mv.user_id, COUNT(mv.material_id) AS total_materials_viewed\nFROM material_views mv\nGROUP BY mv.user_id\nORDER BY total_materials_viewed DESC, mv.user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(material_id)` counts non-NULL material references per user.\n- Since `material_id` should exist for each row, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but row counting is simpler.",
      },
      {
        approach_title: "CTE view counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH view_counts AS (SELECT user_id, COUNT(*) AS total_materials_viewed FROM material_views GROUP BY user_id) SELECT user_id, total_materials_viewed FROM view_counts ORDER BY total_materials_viewed DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute counts per user in a CTE first.\n\n## Query\n\n```sql\nWITH view_counts AS (\n  SELECT user_id, COUNT(*) AS total_materials_viewed\n  FROM material_views\n  GROUP BY user_id\n)\nSELECT user_id, total_materials_viewed\nFROM view_counts\nORDER BY total_materials_viewed DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one count per user.\n- The outer query applies the ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but can help in larger queries.",
      },
    ],
  },
  {
    code: "EDUCATION_058",
    approaches: [
      {
        approach_title: "Join avg progress",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT lm.offering_id, ROUND(AVG(mv.progress_percent), 2) AS avg_progress_percent FROM learning_materials lm JOIN material_views mv ON lm.id = mv.material_id WHERE mv.progress_percent IS NOT NULL GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;",
        explanation:
          "## Approach\n\nJoin materials to views, then average progress by offering.\n\n## Query\n\n```sql\nSELECT lm.offering_id, ROUND(AVG(mv.progress_percent), 2) AS avg_progress_percent\nFROM learning_materials lm\nJOIN material_views mv ON lm.id = mv.material_id\nWHERE mv.progress_percent IS NOT NULL\nGROUP BY lm.offering_id\nORDER BY avg_progress_percent DESC, lm.offering_id ASC;\n```\n\n## Explanation\n\n- `learning_materials` tells us which offering a material belongs to.\n- `material_views` gives user progress on that material.\n- `AVG(progress_percent)` calculates average progress per offering.\n\n## Why this is optimal\n\nIt follows the relationship path directly and keeps only valid progress values.",
      },
      {
        approach_title: "CTE progress",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH valid_views AS (SELECT material_id, progress_percent FROM material_views WHERE progress_percent IS NOT NULL) SELECT lm.offering_id, ROUND(AVG(v.progress_percent), 2) AS avg_progress_percent FROM learning_materials lm JOIN valid_views v ON lm.id = v.material_id GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;",
        explanation:
          "## Approach\n\nFilter valid progress rows first, then join them to materials.\n\n## Query\n\n```sql\nWITH valid_views AS (\n  SELECT material_id, progress_percent\n  FROM material_views\n  WHERE progress_percent IS NOT NULL\n)\nSELECT lm.offering_id, ROUND(AVG(v.progress_percent), 2) AS avg_progress_percent\nFROM learning_materials lm\nJOIN valid_views v ON lm.id = v.material_id\nGROUP BY lm.offering_id\nORDER BY avg_progress_percent DESC, lm.offering_id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only rows with progress data.\n- The outer query averages them per offering.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
      {
        approach_title: "CASE avg",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT lm.offering_id, ROUND(AVG(CASE WHEN mv.progress_percent IS NOT NULL THEN mv.progress_percent END), 2) AS avg_progress_percent FROM learning_materials lm JOIN material_views mv ON lm.id = mv.material_id GROUP BY lm.offering_id ORDER BY avg_progress_percent DESC, lm.offering_id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` inside `AVG` to ignore NULL progress values.\n\n## Query\n\n```sql\nSELECT lm.offering_id,\n       ROUND(AVG(CASE WHEN mv.progress_percent IS NOT NULL THEN mv.progress_percent END), 2) AS avg_progress_percent\nFROM learning_materials lm\nJOIN material_views mv ON lm.id = mv.material_id\nGROUP BY lm.offering_id\nORDER BY avg_progress_percent DESC, lm.offering_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression includes only non-NULL progress values.\n- `AVG` ignores NULL values, so this matches the filtered average.\n\n## Difference from the optimal approach\n\nCorrect, but the `WHERE` clause is cleaner.",
      },
    ],
  },
  {
    code: "EDUCATION_059",
    approaches: [
      {
        approach_title: "Group teacher avg",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating FROM student_feedback sf WHERE sf.teacher_user_id IS NOT NULL GROUP BY sf.teacher_user_id ORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;",
        explanation:
          "## Approach\n\nKeep feedback rows that point to a teacher, then average ratings per teacher.\n\n## Query\n\n```sql\nSELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating\nFROM student_feedback sf\nWHERE sf.teacher_user_id IS NOT NULL\nGROUP BY sf.teacher_user_id\nORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;\n```\n\n## Explanation\n\n- `WHERE teacher_user_id IS NOT NULL` removes feedback without a teacher target.\n- `GROUP BY teacher_user_id` creates one group per teacher.\n- `AVG(rating_value)` gives the average feedback score.\n\n## Why this is optimal\n\nIt directly answers the question without any unnecessary joins.",
      },
      {
        approach_title: "CTE teacher avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_feedback AS (SELECT teacher_user_id, rating_value FROM student_feedback WHERE teacher_user_id IS NOT NULL) SELECT teacher_user_id, ROUND(AVG(rating_value), 2) AS avg_feedback_rating FROM teacher_feedback GROUP BY teacher_user_id ORDER BY avg_feedback_rating DESC, teacher_user_id ASC;",
        explanation:
          "## Approach\n\nStore teacher-linked feedback in a CTE, then average it.\n\n## Query\n\n```sql\nWITH teacher_feedback AS (\n  SELECT teacher_user_id, rating_value\n  FROM student_feedback\n  WHERE teacher_user_id IS NOT NULL\n)\nSELECT teacher_user_id, ROUND(AVG(rating_value), 2) AS avg_feedback_rating\nFROM teacher_feedback\nGROUP BY teacher_user_id\nORDER BY avg_feedback_rating DESC, teacher_user_id ASC;\n```\n\n## Explanation\n\n- The CTE filters to teacher feedback rows first.\n- The outer query computes the average rating per teacher.\n\n## Difference from the optimal approach\n\nMore verbose, but readable.",
      },
      {
        approach_title: "Join teachers",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY sf.teacher_user_id ORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;",
        explanation:
          "## Approach\n\nJoin feedback to teacher profiles before averaging.\n\n## Query\n\n```sql\nSELECT sf.teacher_user_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_rating\nFROM student_feedback sf\nJOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\nGROUP BY sf.teacher_user_id\nORDER BY avg_feedback_rating DESC, sf.teacher_user_id ASC;\n```\n\n## Explanation\n\n- The join ensures the teacher exists in `teacher_profiles`.\n- The grouped average is then calculated per teacher.\n\n## Difference from the optimal approach\n\nCorrect, but the join is unnecessary because the question only needs teacher ids and averages.",
      },
    ],
  },
  {
    code: "EDUCATION_060",
    approaches: [
      {
        approach_title: "Sum open invoices",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT fi.student_user_id, ROUND(SUM(fi.total_amount), 2) AS outstanding_amount FROM fee_invoices fi WHERE fi.invoice_status IN ('open', 'overdue', 'partial') GROUP BY fi.student_user_id ORDER BY outstanding_amount DESC, fi.student_user_id ASC;",
        explanation:
          "## Approach\n\nFilter invoices to outstanding statuses, then sum them per student.\n\n## Query\n\n```sql\nSELECT fi.student_user_id, ROUND(SUM(fi.total_amount), 2) AS outstanding_amount\nFROM fee_invoices fi\nWHERE fi.invoice_status IN ('open', 'overdue', 'partial')\nGROUP BY fi.student_user_id\nORDER BY outstanding_amount DESC, fi.student_user_id ASC;\n```\n\n## Explanation\n\n- `open`, `overdue`, and `partial` invoices still have outstanding dues.\n- `SUM(fi.total_amount)` calculates the outstanding amount per student.\n- `ROUND(..., 2)` formats the amount.\n- Results are ordered by highest outstanding amount first.\n\n## Why this is optimal\n\nIt filters only relevant invoice rows before aggregation, so students with no outstanding invoices are not included.",
      },
      {
        approach_title: "CTE outstanding",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH outstanding_invoices AS (SELECT student_user_id, total_amount FROM fee_invoices WHERE invoice_status IN ('open', 'overdue', 'partial')) SELECT student_user_id, ROUND(SUM(total_amount), 2) AS outstanding_amount FROM outstanding_invoices GROUP BY student_user_id ORDER BY outstanding_amount DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nCreate a CTE containing only outstanding invoices, then aggregate it.\n\n## Query\n\n```sql\nWITH outstanding_invoices AS (\n  SELECT student_user_id, total_amount\n  FROM fee_invoices\n  WHERE invoice_status IN ('open', 'overdue', 'partial')\n)\nSELECT student_user_id, ROUND(SUM(total_amount), 2) AS outstanding_amount\nFROM outstanding_invoices\nGROUP BY student_user_id\nORDER BY outstanding_amount DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates invoices that are still unpaid or partially paid.\n- The outer query sums those invoice totals per student.\n- Sorting shows students with the highest dues first.\n\n## Difference from the optimal approach\n\nIt returns the same result, but uses an extra named step for readability.",
      },
      {
        approach_title: "CASE with HAVING",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT fi.student_user_id, ROUND(SUM(CASE WHEN fi.invoice_status IN ('open', 'overdue', 'partial') THEN fi.total_amount ELSE 0 END), 2) AS outstanding_amount FROM fee_invoices fi GROUP BY fi.student_user_id HAVING SUM(CASE WHEN fi.invoice_status IN ('open', 'overdue', 'partial') THEN fi.total_amount ELSE 0 END) > 0 ORDER BY outstanding_amount DESC, fi.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse conditional summing, then remove students whose outstanding total is zero.\n\n## Query\n\n```sql\nSELECT fi.student_user_id,\n       ROUND(SUM(CASE WHEN fi.invoice_status IN ('open', 'overdue', 'partial') THEN fi.total_amount ELSE 0 END), 2) AS outstanding_amount\nFROM fee_invoices fi\nGROUP BY fi.student_user_id\nHAVING SUM(CASE WHEN fi.invoice_status IN ('open', 'overdue', 'partial') THEN fi.total_amount ELSE 0 END) > 0\nORDER BY outstanding_amount DESC, fi.student_user_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression adds invoice amount only for outstanding statuses.\n- Other invoice statuses contribute `0`.\n- `HAVING ... > 0` removes students who have no outstanding amount.\n- This makes the row set match the filtered approach.\n\n## Difference from the optimal approach\n\nIt works, but filtering outstanding invoices before grouping is simpler and clearer.",
      },
    ],
  },
  {
    code: "EDUCATION_061",
    approaches: [
      {
        approach_title: "Row number",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL ORDER BY cgpa_rank ASC LIMIT 10;",
        explanation:
          "## Approach\n\nRank students by CGPA using `ROW_NUMBER()`, then keep the top 10.\n\n## Query\n\n```sql\nSELECT user_id, admission_number, cgpa,\n       ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank\nFROM student_profiles\nWHERE cgpa IS NOT NULL\nORDER BY cgpa_rank ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` assigns a unique rank from highest CGPA to lowest.\n- `user_id ASC` breaks ties consistently.\n- `WHERE cgpa IS NOT NULL` excludes rows without a CGPA.\n- `LIMIT 10` returns only the top 10 ranked students.\n\n## Why this is optimal\n\nThe question explicitly asks for ranking using row numbers, so this matches the requirement directly.",
      },
      {
        approach_title: "CTE rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_students AS (SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL) SELECT user_id, admission_number, cgpa, cgpa_rank FROM ranked_students ORDER BY cgpa_rank ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute the row numbers in a CTE, then return the top 10 rows.\n\n## Query\n\n```sql\nWITH ranked_students AS (\n  SELECT user_id, admission_number, cgpa,\n         ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n)\nSELECT user_id, admission_number, cgpa, cgpa_rank\nFROM ranked_students\nORDER BY cgpa_rank ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores each student's CGPA rank.\n- The outer query selects the top 10 ranked rows.\n- This is useful when the ranked result needs more filtering later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but adds an extra layer.",
      },
      {
        approach_title: "Subquery rank",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT user_id, admission_number, cgpa, cgpa_rank FROM (SELECT user_id, admission_number, cgpa, ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank FROM student_profiles WHERE cgpa IS NOT NULL) s ORDER BY cgpa_rank ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table to assign row numbers, then return the first 10 ranks.\n\n## Query\n\n```sql\nSELECT user_id, admission_number, cgpa, cgpa_rank\nFROM (\n  SELECT user_id, admission_number, cgpa,\n         ROW_NUMBER() OVER (ORDER BY cgpa DESC, user_id ASC) AS cgpa_rank\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n) s\nORDER BY cgpa_rank ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes the row numbers.\n- The outer query sorts by rank and limits to 10 rows.\n- It behaves the same as the direct window query.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose.",
      },
    ],
  },
  {
    code: "EDUCATION_062",
    approaches: [
      {
        approach_title: "Rank filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5 ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUse the stored exam rank and filter to the top 5.\n\n## Query\n\n```sql\nSELECT exam_id, student_user_id, obtained_marks, rank_in_exam\nFROM exam_results\nWHERE rank_in_exam <= 5\nORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;\n```\n\n## Explanation\n\n- `rank_in_exam` already stores each student's rank inside an exam.\n- `WHERE rank_in_exam <= 5` keeps only top rankers.\n- Ordering by exam, rank, and student id gives deterministic output.\n\n## Why this is optimal\n\nIt uses the available rank column directly instead of recalculating ranks.",
      },
      {
        approach_title: "CTE top ranks",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH top_rankers AS (SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5) SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM top_rankers ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;",
        explanation:
          "## Approach\n\nStore top rankers in a CTE, then return them.\n\n## Query\n\n```sql\nWITH top_rankers AS (\n  SELECT exam_id, student_user_id, obtained_marks, rank_in_exam\n  FROM exam_results\n  WHERE rank_in_exam <= 5\n)\nSELECT exam_id, student_user_id, obtained_marks, rank_in_exam\nFROM top_rankers\nORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates rows where rank is 5 or better.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nIt returns the same result, but adds an extra named step.",
      },
      {
        approach_title: "Subquery ranks",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM (SELECT exam_id, student_user_id, obtained_marks, rank_in_exam FROM exam_results WHERE rank_in_exam <= 5) r ORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUse a derived table to filter top rankers before sorting.\n\n## Query\n\n```sql\nSELECT exam_id, student_user_id, obtained_marks, rank_in_exam\nFROM (\n  SELECT exam_id, student_user_id, obtained_marks, rank_in_exam\n  FROM exam_results\n  WHERE rank_in_exam <= 5\n) r\nORDER BY exam_id ASC, rank_in_exam ASC, student_user_id ASC;\n```\n\n## Explanation\n\n- The inner query keeps only top 5 ranks per exam.\n- The outer query returns those rows in the expected order.\n\n## Difference from the optimal approach\n\nCorrect, but the subquery layer is unnecessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_063",
    approaches: [
      {
        approach_title: "Running sum",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM payments WHERE payment_status = 'successful' ORDER BY paid_at ASC, id ASC;",
        explanation:
          "## Approach\n\nUse a windowed sum to calculate the running payment collection.\n\n## Query\n\n```sql\nSELECT id, paid_at, paid_amount,\n       SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection\nFROM payments\nWHERE payment_status = 'successful'\nORDER BY paid_at ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE payment_status = 'successful'` keeps only successful payments.\n- `SUM(paid_amount) OVER (...)` calculates a cumulative total row by row.\n- `ORDER BY paid_at ASC, id ASC` defines the running order.\n\n## Why this is optimal\n\nRunning totals are best solved with window functions.",
      },
      {
        approach_title: "CTE running",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH successful_payments AS (SELECT id, paid_at, paid_amount FROM payments WHERE payment_status = 'successful') SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM successful_payments ORDER BY paid_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter successful payments in a CTE, then calculate the running sum.\n\n## Query\n\n```sql\nWITH successful_payments AS (\n  SELECT id, paid_at, paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, paid_at, paid_amount,\n       SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection\nFROM successful_payments\nORDER BY paid_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE creates a clean dataset of successful payments.\n- The outer query applies the running total window function.\n\n## Difference from the optimal approach\n\nSame result, but with an extra step for readability.",
      },
      {
        approach_title: "Window in subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, paid_at, paid_amount, running_total_collection FROM (SELECT id, paid_at, paid_amount, SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection FROM payments WHERE payment_status = 'successful') p ORDER BY paid_at ASC, id ASC;",
        explanation:
          "## Approach\n\nCalculate the running total inside a derived table, then select from it.\n\n## Query\n\n```sql\nSELECT id, paid_at, paid_amount, running_total_collection\nFROM (\n  SELECT id, paid_at, paid_amount,\n         SUM(paid_amount) OVER (ORDER BY paid_at ASC, id ASC) AS running_total_collection\n  FROM payments\n  WHERE payment_status = 'successful'\n) p\nORDER BY paid_at ASC, id ASC;\n```\n\n## Explanation\n\n- The inner query filters successful payments and calculates the running total.\n- The outer query returns the same columns in the required order.\n- This avoids correlated-subquery edge cases around NULL ordering and window-frame behavior.\n\n## Difference from the optimal approach\n\nIt returns the same result, but the extra derived table is unnecessary unless more filtering is added later.",
      },
    ],
  },
  {
    code: "EDUCATION_064",
    approaches: [
      {
        approach_title: "LAG score",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score FROM exam_results ORDER BY student_user_id ASC, exam_id ASC;",
        explanation:
          "## Approach\n\nUse `LAG()` to pull the previous exam score for each student.\n\n## Query\n\n```sql\nSELECT student_user_id, exam_id, obtained_marks,\n       LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score\nFROM exam_results\nORDER BY student_user_id ASC, exam_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY student_user_id` resets the comparison for each student.\n- `ORDER BY exam_id ASC` defines exam order within each student.\n- `LAG(obtained_marks)` returns the previous score in that sequence.\n\n## Why this is optimal\n\n`LAG()` is the standard and clearest way to access the previous row in sequence.",
      },
      {
        approach_title: "CTE lag",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH scored_exams AS (SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score FROM exam_results) SELECT student_user_id, exam_id, obtained_marks, previous_score FROM scored_exams ORDER BY student_user_id ASC, exam_id ASC;",
        explanation:
          "## Approach\n\nCalculate the lagged score in a CTE, then return it.\n\n## Query\n\n```sql\nWITH scored_exams AS (\n  SELECT student_user_id, exam_id, obtained_marks,\n         LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_score\n  FROM exam_results\n)\nSELECT student_user_id, exam_id, obtained_marks, previous_score\nFROM scored_exams\nORDER BY student_user_id ASC, exam_id ASC;\n```\n\n## Explanation\n\n- The CTE stores each exam row with its prior score.\n- The outer query formats the final output.\n\n## Difference from the optimal approach\n\nMore verbose, but useful for adding more derived columns later.",
      },
      {
        approach_title: "Self join prev",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT er1.student_user_id, er1.exam_id, er1.obtained_marks, er2.obtained_marks AS previous_score FROM exam_results er1 LEFT JOIN exam_results er2 ON er1.student_user_id = er2.student_user_id AND er2.exam_id = (SELECT MAX(er3.exam_id) FROM exam_results er3 WHERE er3.student_user_id = er1.student_user_id AND er3.exam_id < er1.exam_id) ORDER BY er1.student_user_id ASC, er1.exam_id ASC;",
        explanation:
          "## Approach\n\nFind the previous exam row by joining each result to the nearest earlier exam for the same student.\n\n## Query\n\n```sql\nSELECT er1.student_user_id, er1.exam_id, er1.obtained_marks,\n       er2.obtained_marks AS previous_score\nFROM exam_results er1\nLEFT JOIN exam_results er2\n  ON er1.student_user_id = er2.student_user_id\n AND er2.exam_id = (\n   SELECT MAX(er3.exam_id)\n   FROM exam_results er3\n   WHERE er3.student_user_id = er1.student_user_id\n     AND er3.exam_id < er1.exam_id\n )\nORDER BY er1.student_user_id ASC, er1.exam_id ASC;\n```\n\n## Explanation\n\n- The subquery finds the closest earlier exam for the same student.\n- The self join pulls that prior score into the current row.\n\n## Difference from the optimal approach\n\nIt works, but is more complex and less efficient than `LAG()`.",
      },
    ],
  },
  {
    code: "EDUCATION_065",
    approaches: [
      {
        approach_title: "LEAD due",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT offering_id, id AS assignment_id, due_at, LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at FROM assignments ORDER BY offering_id ASC, due_at ASC, id ASC;",
        explanation:
          "## Approach\n\nUse `LEAD()` to show the next due date inside each offering.\n\n## Query\n\n```sql\nSELECT offering_id, id AS assignment_id, due_at,\n       LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at\nFROM assignments\nORDER BY offering_id ASC, due_at ASC, id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY offering_id` keeps each offering separate.\n- `ORDER BY due_at ASC, id ASC` defines the sequence of assignments.\n- `LEAD(due_at)` returns the due date of the next assignment in that sequence.\n\n## Why this is optimal\n\n`LEAD()` is the most natural function for looking ahead to the next row.",
      },
      {
        approach_title: "CTE next due",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH assignment_order AS (SELECT offering_id, id AS assignment_id, due_at, LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at FROM assignments) SELECT offering_id, assignment_id, due_at, next_due_at FROM assignment_order ORDER BY offering_id ASC, due_at ASC, assignment_id ASC;",
        explanation:
          "## Approach\n\nCompute the next due date in a CTE, then return the result.\n\n## Query\n\n```sql\nWITH assignment_order AS (\n  SELECT offering_id, id AS assignment_id, due_at,\n         LEAD(due_at) OVER (PARTITION BY offering_id ORDER BY due_at ASC, id ASC) AS next_due_at\n  FROM assignments\n)\nSELECT offering_id, assignment_id, due_at, next_due_at\nFROM assignment_order\nORDER BY offering_id ASC, due_at ASC, assignment_id ASC;\n```\n\n## Explanation\n\n- The CTE stores the current and next due dates together.\n- The outer query handles ordering only.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
      {
        approach_title: "Self join next",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT a1.offering_id, a1.id AS assignment_id, a1.due_at, a2.due_at AS next_due_at FROM assignments a1 LEFT JOIN assignments a2 ON a2.id = (SELECT a3.id FROM assignments a3 WHERE a3.offering_id = a1.offering_id AND (a3.due_at > a1.due_at OR (a3.due_at = a1.due_at AND a3.id > a1.id)) ORDER BY a3.due_at ASC, a3.id ASC LIMIT 1) ORDER BY a1.offering_id ASC, a1.due_at ASC, a1.id ASC;",
        explanation:
          "## Approach\n\nFor each assignment, find the next assignment in the same offering using a correlated subquery.\n\n## Query\n\n```sql\nSELECT a1.offering_id, a1.id AS assignment_id, a1.due_at,\n       a2.due_at AS next_due_at\nFROM assignments a1\nLEFT JOIN assignments a2\n  ON a2.id = (\n    SELECT a3.id\n    FROM assignments a3\n    WHERE a3.offering_id = a1.offering_id\n      AND (\n        a3.due_at > a1.due_at\n        OR (a3.due_at = a1.due_at AND a3.id > a1.id)\n      )\n    ORDER BY a3.due_at ASC, a3.id ASC\n    LIMIT 1\n  )\nORDER BY a1.offering_id ASC, a1.due_at ASC, a1.id ASC;\n```\n\n## Explanation\n\n- The subquery searches for the next assignment in the same offering.\n- The self join attaches that next row's due date.\n\n## Difference from the optimal approach\n\nIt works, but is much more complex than using `LEAD()`.",
      },
    ],
  },
  {
    code: "EDUCATION_066",
    approaches: [
      {
        approach_title: "Rank enrollments",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT term_id, id AS offering_id, enrolled_count, RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;",
        explanation:
          "## Approach\n\nUse `RANK()` to rank offerings by enrolled count within each term.\n\n## Query\n\n```sql\nSELECT term_id, id AS offering_id, enrolled_count,\n       RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank\nFROM course_offerings\nORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY term_id` restarts the rank for each term.\n- `ORDER BY enrolled_count DESC` puts the highest enrollment first.\n- `id ASC` gives deterministic ordering for ties.\n\n## Why this is optimal\n\nThe question is about ranking within each term, which is exactly what partitioned window ranking is for.",
      },
      {
        approach_title: "Dense rank",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT term_id, id AS offering_id, enrolled_count, DENSE_RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` instead of `RANK()` to rank offerings within each term.\n\n## Query\n\n```sql\nSELECT term_id, id AS offering_id, enrolled_count,\n       DENSE_RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank\nFROM course_offerings\nORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;\n```\n\n## Explanation\n\n- `DENSE_RANK()` also ranks rows by enrollment within each term.\n- It differs from `RANK()` only when ties exist.\n\n## Difference from the optimal approach\n\nIt may return different tie numbering, so `RANK()` better matches the stated query.",
      },
      {
        approach_title: "CTE rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH ranked_offerings AS (SELECT term_id, id AS offering_id, enrolled_count, RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank FROM course_offerings) SELECT term_id, offering_id, enrolled_count, enrollment_rank FROM ranked_offerings ORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;",
        explanation:
          "## Approach\n\nCalculate the rank in a CTE, then return the ranked rows.\n\n## Query\n\n```sql\nWITH ranked_offerings AS (\n  SELECT term_id, id AS offering_id, enrolled_count,\n         RANK() OVER (PARTITION BY term_id ORDER BY enrolled_count DESC, id ASC) AS enrollment_rank\n  FROM course_offerings\n)\nSELECT term_id, offering_id, enrolled_count, enrollment_rank\nFROM ranked_offerings\nORDER BY term_id ASC, enrollment_rank ASC, offering_id ASC;\n```\n\n## Explanation\n\n- The CTE stores the computed rank for each offering.\n- The outer query formats the result.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if later filters need the rank.",
      },
    ],
  },
  {
    code: "EDUCATION_067",
    approaches: [
      {
        approach_title: "Moving avg",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT student_user_id, assignment_id, obtained_marks, ROUND(AVG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL ORDER BY student_user_id ASC, submitted_at ASC;",
        explanation:
          "## Approach\n\nUse a window frame to compute a 3-row moving average per student.\n\n## Query\n\n```sql\nSELECT student_user_id, assignment_id, obtained_marks,\n       ROUND(\n         AVG(obtained_marks) OVER (\n           PARTITION BY student_user_id\n           ORDER BY submitted_at ASC\n           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n         ),\n         2\n       ) AS moving_avg_score\nFROM assignment_submissions\nWHERE obtained_marks IS NOT NULL\nORDER BY student_user_id ASC, submitted_at ASC;\n```\n\n## Explanation\n\n- `PARTITION BY student_user_id` keeps each student's history separate.\n- `ORDER BY submitted_at ASC` defines submission order.\n- `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` creates a moving window of up to 3 submissions.\n- `AVG(obtained_marks)` computes the moving average in that window.\n\n## Why this is optimal\n\nMoving averages are best expressed with a window frame.",
      },
      {
        approach_title: "CTE moving",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH scored_submissions AS (SELECT student_user_id, assignment_id, obtained_marks, submitted_at FROM assignment_submissions WHERE obtained_marks IS NOT NULL) SELECT student_user_id, assignment_id, obtained_marks, ROUND(AVG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_score FROM scored_submissions ORDER BY student_user_id ASC, submitted_at ASC;",
        explanation:
          "## Approach\n\nFilter scored submissions in a CTE, then calculate the moving average.\n\n## Query\n\n```sql\nWITH scored_submissions AS (\n  SELECT student_user_id, assignment_id, obtained_marks, submitted_at\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n)\nSELECT student_user_id, assignment_id, obtained_marks,\n       ROUND(\n         AVG(obtained_marks) OVER (\n           PARTITION BY student_user_id\n           ORDER BY submitted_at ASC\n           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n         ),\n         2\n       ) AS moving_avg_score\nFROM scored_submissions\nORDER BY student_user_id ASC, submitted_at ASC;\n```\n\n## Explanation\n\n- The CTE isolates the usable submission rows first.\n- The outer query applies the moving-average window.\n\n## Difference from the optimal approach\n\nMore verbose, but can help readability in bigger queries.",
      },
      {
        approach_title: "Self avg",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH numbered AS (SELECT student_user_id, assignment_id, obtained_marks, submitted_at, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC, assignment_id ASC) AS rn FROM assignment_submissions WHERE obtained_marks IS NOT NULL) SELECT n1.student_user_id, n1.assignment_id, n1.obtained_marks, ROUND(AVG(n2.obtained_marks), 2) AS moving_avg_score FROM numbered n1 JOIN numbered n2 ON n1.student_user_id = n2.student_user_id AND n2.rn BETWEEN n1.rn - 2 AND n1.rn GROUP BY n1.student_user_id, n1.assignment_id, n1.obtained_marks, n1.submitted_at, n1.rn ORDER BY n1.student_user_id ASC, n1.submitted_at ASC;",
        explanation:
          "## Approach\n\nNumber each student's submissions, then self join to the current and previous two rows.\n\n## Query\n\n```sql\nWITH numbered AS (\n  SELECT student_user_id, assignment_id, obtained_marks, submitted_at,\n         ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY submitted_at ASC, assignment_id ASC) AS rn\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n)\nSELECT n1.student_user_id, n1.assignment_id, n1.obtained_marks,\n       ROUND(AVG(n2.obtained_marks), 2) AS moving_avg_score\nFROM numbered n1\nJOIN numbered n2\n  ON n1.student_user_id = n2.student_user_id\n AND n2.rn BETWEEN n1.rn - 2 AND n1.rn\nGROUP BY n1.student_user_id, n1.assignment_id, n1.obtained_marks, n1.submitted_at, n1.rn\nORDER BY n1.student_user_id ASC, n1.submitted_at ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` gives each submission a sequence number.\n- The self join matches the current row to the previous two rows.\n- `AVG` over those matched rows produces the moving average.\n\n## Difference from the optimal approach\n\nIt works, but is much more complex than using a window frame.",
      },
    ],
  },
  {
    code: "EDUCATION_068",
    approaches: [
      {
        approach_title: "Dense salary rank",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, user_id, salary_monthly, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL ORDER BY department_id ASC, salary_rank ASC, user_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` to rank teachers by salary inside each department.\n\n## Query\n\n```sql\nSELECT department_id, user_id, salary_monthly,\n       DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank\nFROM teacher_profiles\nWHERE salary_monthly IS NOT NULL\nORDER BY department_id ASC, salary_rank ASC, user_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY department_id` restarts ranking inside each department.\n- `ORDER BY salary_monthly DESC` puts the highest salary first.\n- `DENSE_RANK()` avoids gaps in rank numbers when ties happen.\n- `user_id ASC` makes tie handling deterministic.\n\n## Why this is optimal\n\nThe question asks for department-wise ranking, and `DENSE_RANK()` matches the intended query exactly.",
      },
      {
        approach_title: "Rank salary",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT department_id, user_id, salary_monthly, RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL ORDER BY department_id ASC, salary_rank ASC, user_id ASC;",
        explanation:
          "## Approach\n\nUse `RANK()` instead of `DENSE_RANK()`.\n\n## Query\n\n```sql\nSELECT department_id, user_id, salary_monthly,\n       RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank\nFROM teacher_profiles\nWHERE salary_monthly IS NOT NULL\nORDER BY department_id ASC, salary_rank ASC, user_id ASC;\n```\n\n## Explanation\n\n- `RANK()` also ranks teachers within each department.\n- It differs from `DENSE_RANK()` only when tied salaries exist.\n\n## Difference from the optimal approach\n\nIt may skip rank numbers after ties, so it is not as close to the intended output.",
      },
      {
        approach_title: "CTE salary rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH ranked_teachers AS (SELECT department_id, user_id, salary_monthly, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank FROM teacher_profiles WHERE salary_monthly IS NOT NULL) SELECT department_id, user_id, salary_monthly, salary_rank FROM ranked_teachers ORDER BY department_id ASC, salary_rank ASC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute the dense rank in a CTE, then return the result.\n\n## Query\n\n```sql\nWITH ranked_teachers AS (\n  SELECT department_id, user_id, salary_monthly,\n         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary_monthly DESC, user_id ASC) AS salary_rank\n  FROM teacher_profiles\n  WHERE salary_monthly IS NOT NULL\n)\nSELECT department_id, user_id, salary_monthly, salary_rank\nFROM ranked_teachers\nORDER BY department_id ASC, salary_rank ASC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores each teacher row with its salary rank.\n- The outer query formats the final order.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if more filters on rank are needed later.",
      },
    ],
  },
  {
    code: "EDUCATION_069",
    approaches: [
      {
        approach_title: "Percent rank",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL ORDER BY cgpa_percentile DESC, user_id ASC;",
        explanation:
          "## Approach\n\nUse `PERCENT_RANK()` to calculate each student's relative CGPA position.\n\n## Query\n\n```sql\nSELECT user_id, cgpa,\n       PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile\nFROM student_profiles\nWHERE cgpa IS NOT NULL\nORDER BY cgpa_percentile DESC, user_id ASC;\n```\n\n## Explanation\n\n- `WHERE cgpa IS NOT NULL` excludes students without CGPA data.\n- `PERCENT_RANK()` returns each student's relative rank between 0 and 1.\n- `ORDER BY cgpa ASC` makes higher CGPAs receive higher percentile values.\n- `user_id ASC` makes tie handling deterministic.\n\n## Why this is optimal\n\nIt directly uses PostgreSQL's percentile ranking function for this type of relative ranking.",
      },
      {
        approach_title: "CTE percentile",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_students AS (SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL) SELECT user_id, cgpa, cgpa_percentile FROM ranked_students ORDER BY cgpa_percentile DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCalculate percentile ranks in a CTE, then return the ranked rows.\n\n## Query\n\n```sql\nWITH ranked_students AS (\n  SELECT user_id, cgpa,\n         PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n)\nSELECT user_id, cgpa, cgpa_percentile\nFROM ranked_students\nORDER BY cgpa_percentile DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores each student with their computed percentile rank.\n- The outer query returns those rows in the expected order.\n- This structure is useful if you later want to filter by percentile range.\n\n## Difference from the optimal approach\n\nIt returns the same result, but adds an extra named step.",
      },
      {
        approach_title: "Subquery percentile",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT user_id, cgpa, cgpa_percentile FROM (SELECT user_id, cgpa, PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile FROM student_profiles WHERE cgpa IS NOT NULL) r ORDER BY cgpa_percentile DESC, user_id ASC;",
        explanation:
          "## Approach\n\nUse a derived table to compute percentile ranks, then sort the result.\n\n## Query\n\n```sql\nSELECT user_id, cgpa, cgpa_percentile\nFROM (\n  SELECT user_id, cgpa,\n         PERCENT_RANK() OVER (ORDER BY cgpa ASC, user_id ASC) AS cgpa_percentile\n  FROM student_profiles\n  WHERE cgpa IS NOT NULL\n) r\nORDER BY cgpa_percentile DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner query calculates the percentile rank for each student.\n- The outer query orders by that computed percentile.\n- This produces the same output as the direct window function query.\n\n## Difference from the optimal approach\n\nCorrect, but the derived table is unnecessary unless more filtering is added.",
      },
    ],
  },
  {
    code: "EDUCATION_070",
    approaches: [
      {
        approach_title: "Cumulative count",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT offering_id, session_date, COUNT(*) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions ORDER BY offering_id ASC, session_date ASC;",
        explanation:
          "## Approach\n\nUse a windowed count to build the cumulative number of sessions per offering.\n\n## Query\n\n```sql\nSELECT offering_id, session_date,\n       COUNT(*) OVER (\n         PARTITION BY offering_id\n         ORDER BY session_date ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_sessions\nFROM attendance_sessions\nORDER BY offering_id ASC, session_date ASC;\n```\n\n## Explanation\n\n- `PARTITION BY offering_id` keeps each offering separate.\n- `ORDER BY session_date ASC` processes sessions in date order.\n- The frame from the first row to the current row makes the count cumulative.\n\n## Why this is optimal\n\nCumulative counts are a natural fit for window functions.",
      },
      {
        approach_title: "Running count sum",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT offering_id, session_date, SUM(1) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions ORDER BY offering_id ASC, session_date ASC;",
        explanation:
          "## Approach\n\nUse a running sum of `1` instead of a running count.\n\n## Query\n\n```sql\nSELECT offering_id, session_date,\n       SUM(1) OVER (\n         PARTITION BY offering_id\n         ORDER BY session_date ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_sessions\nFROM attendance_sessions\nORDER BY offering_id ASC, session_date ASC;\n```\n\n## Explanation\n\n- Each row contributes `1` to the running total.\n- Summing those ones produces the same cumulative count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` expresses the intent more clearly.",
      },
      {
        approach_title: "CTE cumulative",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH session_running AS (SELECT offering_id, session_date, COUNT(*) OVER (PARTITION BY offering_id ORDER BY session_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sessions FROM attendance_sessions) SELECT offering_id, session_date, cumulative_sessions FROM session_running ORDER BY offering_id ASC, session_date ASC;",
        explanation:
          "## Approach\n\nCompute the cumulative count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH session_running AS (\n  SELECT offering_id, session_date,\n         COUNT(*) OVER (\n           PARTITION BY offering_id\n           ORDER BY session_date ASC\n           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n         ) AS cumulative_sessions\n  FROM attendance_sessions\n)\nSELECT offering_id, session_date, cumulative_sessions\nFROM session_running\nORDER BY offering_id ASC, session_date ASC;\n```\n\n## Explanation\n\n- The CTE stores the running count per offering.\n- The outer query formats the final output.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if further filtering is needed.",
      },
    ],
  },
  {
    code: "EDUCATION_071",
    approaches: [
      {
        approach_title: "Distinct missing",
        approach_type: "distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT s.student_user_id FROM assignment_submissions s WHERE s.submission_status = 'missing' ORDER BY s.student_user_id ASC;",
        explanation:
          "## Approach\n\nFilter missing submissions, then keep unique student ids.\n\n## Query\n\n```sql\nSELECT DISTINCT s.student_user_id\nFROM assignment_submissions s\nWHERE s.submission_status = 'missing'\nORDER BY s.student_user_id ASC;\n```\n\n## Explanation\n\n- `WHERE s.submission_status = 'missing'` keeps only missing assignment rows.\n- A student may have multiple missing submissions.\n- `DISTINCT` removes duplicates so each student appears once.\n- The final output is sorted by student id.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to return students with at least one missing assignment.",
      },
      {
        approach_title: "Group having",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT s.student_user_id FROM assignment_submissions s WHERE s.submission_status = 'missing' GROUP BY s.student_user_id HAVING COUNT(*) >= 1 ORDER BY s.student_user_id ASC;",
        explanation:
          "## Approach\n\nFilter missing rows, group by student, then keep groups with at least one row.\n\n## Query\n\n```sql\nSELECT s.student_user_id\nFROM assignment_submissions s\nWHERE s.submission_status = 'missing'\nGROUP BY s.student_user_id\nHAVING COUNT(*) >= 1\nORDER BY s.student_user_id ASC;\n```\n\n## Explanation\n\n- The `WHERE` clause keeps only missing submissions.\n- `GROUP BY` creates one group per student.\n- `HAVING COUNT(*) >= 1` means the student has at least one missing submission.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is simpler because only unique ids are needed.",
      },
      {
        approach_title: "CTE missing",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH missing_students AS (SELECT DISTINCT student_user_id FROM assignment_submissions WHERE submission_status = 'missing') SELECT student_user_id FROM missing_students ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nBuild the unique missing-student set in a CTE, then return it.\n\n## Query\n\n```sql\nWITH missing_students AS (\n  SELECT DISTINCT student_user_id\n  FROM assignment_submissions\n  WHERE submission_status = 'missing'\n)\nSELECT student_user_id\nFROM missing_students\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates students who have missing submissions.\n- The outer query only handles ordering.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "EDUCATION_072",
    approaches: [
      {
        approach_title: "Join avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.student_user_id, e.offering_id, e.final_score FROM enrollments e JOIN (SELECT offering_id, AVG(final_score) AS avg_score FROM enrollments WHERE final_score IS NOT NULL GROUP BY offering_id) avg_scores ON e.offering_id = avg_scores.offering_id WHERE e.final_score > avg_scores.avg_score ORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;",
        explanation:
          "## Approach\n\nCalculate average score per offering, then join it back to enrollment rows.\n\n## Query\n\n```sql\nSELECT e.student_user_id, e.offering_id, e.final_score\nFROM enrollments e\nJOIN (\n  SELECT offering_id, AVG(final_score) AS avg_score\n  FROM enrollments\n  WHERE final_score IS NOT NULL\n  GROUP BY offering_id\n) avg_scores ON e.offering_id = avg_scores.offering_id\nWHERE e.final_score > avg_scores.avg_score\nORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;\n```\n\n## Explanation\n\n- The subquery computes the average `final_score` for each offering.\n- Joining it back lets each student row compare against the offering average.\n- The outer `WHERE` keeps only students above that average.\n- Results are sorted by offering, then score descending.\n\n## Why this is optimal\n\nIt clearly separates average calculation from row-level comparison.",
      },
      {
        approach_title: "CTE avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH offering_avg AS (SELECT offering_id, AVG(final_score) AS avg_score FROM enrollments WHERE final_score IS NOT NULL GROUP BY offering_id) SELECT e.student_user_id, e.offering_id, e.final_score FROM enrollments e JOIN offering_avg oa ON e.offering_id = oa.offering_id WHERE e.final_score > oa.avg_score ORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;",
        explanation:
          "## Approach\n\nFirst store offering averages in a CTE, then compare each student's score against them.\n\n## Query\n\n```sql\nWITH offering_avg AS (\n  SELECT offering_id, AVG(final_score) AS avg_score\n  FROM enrollments\n  WHERE final_score IS NOT NULL\n  GROUP BY offering_id\n)\nSELECT e.student_user_id, e.offering_id, e.final_score\nFROM enrollments e\nJOIN offering_avg oa ON e.offering_id = oa.offering_id\nWHERE e.final_score > oa.avg_score\nORDER BY e.offering_id ASC, e.final_score DESC, e.student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one average per offering.\n- The outer query joins those averages to student scores.\n- Only above-average students are returned.\n\n## Difference from the optimal approach\n\nSame logic, but with an extra named step.",
      },
      {
        approach_title: "Window avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT student_user_id, offering_id, final_score FROM (SELECT student_user_id, offering_id, final_score, AVG(final_score) OVER (PARTITION BY offering_id) AS avg_score FROM enrollments WHERE final_score IS NOT NULL) e WHERE final_score > avg_score ORDER BY offering_id ASC, final_score DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUse a window average to attach the offering average to each row.\n\n## Query\n\n```sql\nSELECT student_user_id, offering_id, final_score\nFROM (\n  SELECT student_user_id, offering_id, final_score,\n         AVG(final_score) OVER (PARTITION BY offering_id) AS avg_score\n  FROM enrollments\n  WHERE final_score IS NOT NULL\n) e\nWHERE final_score > avg_score\nORDER BY offering_id ASC, final_score DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- `AVG(final_score) OVER (PARTITION BY offering_id)` gives each row its offering average.\n- The outer query keeps only rows above that average.\n\n## Difference from the optimal approach\n\nCompact and correct, but the join/subquery approach is often easier for learners to follow.",
      },
    ],
  },
  {
    code: "EDUCATION_073",
    approaches: [
      {
        approach_title: "Distinct depts",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT co.primary_teacher_id AS teacher_user_id, COUNT(DISTINCT c.department_id) AS department_count FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL GROUP BY co.primary_teacher_id HAVING COUNT(DISTINCT c.department_id) > 1 ORDER BY department_count DESC, teacher_user_id ASC;",
        explanation:
          "## Approach\n\nJoin offerings to courses, count distinct departments per teacher, then keep teachers above one department.\n\n## Query\n\n```sql\nSELECT co.primary_teacher_id AS teacher_user_id,\n       COUNT(DISTINCT c.department_id) AS department_count\nFROM course_offerings co\nJOIN courses c ON co.course_id = c.id\nWHERE co.primary_teacher_id IS NOT NULL\nGROUP BY co.primary_teacher_id\nHAVING COUNT(DISTINCT c.department_id) > 1\nORDER BY department_count DESC, teacher_user_id ASC;\n```\n\n## Explanation\n\n- `course_offerings` identifies the teacher assigned to each offering.\n- `courses` provides the department for that offering.\n- `COUNT(DISTINCT c.department_id)` counts how many departments each teacher spans.\n- `HAVING ... > 1` keeps teachers handling multiple departments.\n\n## Why this is optimal\n\nIt directly measures cross-department teaching using distinct department counts.",
      },
      {
        approach_title: "CTE dept count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_departments AS (SELECT co.primary_teacher_id AS teacher_user_id, COUNT(DISTINCT c.department_id) AS department_count FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL GROUP BY co.primary_teacher_id) SELECT teacher_user_id, department_count FROM teacher_departments WHERE department_count > 1 ORDER BY department_count DESC, teacher_user_id ASC;",
        explanation:
          "## Approach\n\nCompute department counts per teacher in a CTE, then filter the result.\n\n## Query\n\n```sql\nWITH teacher_departments AS (\n  SELECT co.primary_teacher_id AS teacher_user_id,\n         COUNT(DISTINCT c.department_id) AS department_count\n  FROM course_offerings co\n  JOIN courses c ON co.course_id = c.id\n  WHERE co.primary_teacher_id IS NOT NULL\n  GROUP BY co.primary_teacher_id\n)\nSELECT teacher_user_id, department_count\nFROM teacher_departments\nWHERE department_count > 1\nORDER BY department_count DESC, teacher_user_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per teacher with a department count.\n- The outer query filters to teachers spanning more than one department.\n\n## Difference from the optimal approach\n\nMore verbose, but the intermediate result is easy to inspect.",
      },
      {
        approach_title: "Teacher-course pairs",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT teacher_user_id, COUNT(DISTINCT department_id) AS department_count FROM (SELECT co.primary_teacher_id AS teacher_user_id, c.department_id FROM course_offerings co JOIN courses c ON co.course_id = c.id WHERE co.primary_teacher_id IS NOT NULL) t GROUP BY teacher_user_id HAVING COUNT(DISTINCT department_id) > 1 ORDER BY department_count DESC, teacher_user_id ASC;",
        explanation:
          "## Approach\n\nBuild teacher-department pairs first, then aggregate them.\n\n## Query\n\n```sql\nSELECT teacher_user_id, COUNT(DISTINCT department_id) AS department_count\nFROM (\n  SELECT co.primary_teacher_id AS teacher_user_id, c.department_id\n  FROM course_offerings co\n  JOIN courses c ON co.course_id = c.id\n  WHERE co.primary_teacher_id IS NOT NULL\n) t\nGROUP BY teacher_user_id\nHAVING COUNT(DISTINCT department_id) > 1\nORDER BY department_count DESC, teacher_user_id ASC;\n```\n\n## Explanation\n\n- The inner query creates teacher and department pairs.\n- The outer query counts distinct departments per teacher.\n\n## Difference from the optimal approach\n\nCorrect, but the extra layer is not necessary.",
      },
    ],
  },
  {
    code: "EDUCATION_074",
    approaches: [
      {
        approach_title: "Lag + bool_and",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH score_changes AS ( SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results ) SELECT student_user_id FROM score_changes GROUP BY student_user_id HAVING BOOL_AND(prev_score IS NULL OR obtained_marks > prev_score) ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nCompare each score to the previous one, then keep students whose every comparison shows improvement.\n\n## Query\n\n```sql\nWITH score_changes AS (\n  SELECT student_user_id, exam_id, obtained_marks,\n         LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score\n  FROM exam_results\n)\nSELECT student_user_id\nFROM score_changes\nGROUP BY student_user_id\nHAVING BOOL_AND(prev_score IS NULL OR obtained_marks > prev_score)\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- `LAG()` brings the previous exam score for each student.\n- For the first exam, `prev_score` is NULL, which is treated as valid.\n- `BOOL_AND(...)` ensures every exam after the first has a higher score than the previous one.\n\n## Why this is optimal\n\nIt expresses “improved in every successive exam” directly and cleanly.",
      },
      {
        approach_title: "CTE failures",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH score_changes AS (SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results), non_improvers AS (SELECT DISTINCT student_user_id FROM score_changes WHERE prev_score IS NOT NULL AND obtained_marks <= prev_score) SELECT DISTINCT student_user_id FROM score_changes WHERE student_user_id NOT IN (SELECT student_user_id FROM non_improvers) ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nIdentify students who ever failed to improve, then exclude them.\n\n## Query\n\n```sql\nWITH score_changes AS (\n  SELECT student_user_id, exam_id, obtained_marks,\n         LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score\n  FROM exam_results\n),\nnon_improvers AS (\n  SELECT DISTINCT student_user_id\n  FROM score_changes\n  WHERE prev_score IS NOT NULL\n    AND obtained_marks <= prev_score\n)\nSELECT DISTINCT student_user_id\nFROM score_changes\nWHERE student_user_id NOT IN (SELECT student_user_id FROM non_improvers)\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes prior scores.\n- The second CTE finds students with at least one non-improving exam.\n- The final query keeps only students not in that failing set.\n\n## Difference from the optimal approach\n\nCorrect, but more indirect than using `BOOL_AND`.",
      },
      {
        approach_title: "Group counts",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH score_changes AS (SELECT student_user_id, exam_id, obtained_marks, LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score FROM exam_results) SELECT student_user_id FROM score_changes GROUP BY student_user_id HAVING COUNT(*) FILTER (WHERE prev_score IS NOT NULL AND obtained_marks <= prev_score) = 0 ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nCount how many non-improving comparisons each student has, then keep those with zero.\n\n## Query\n\n```sql\nWITH score_changes AS (\n  SELECT student_user_id, exam_id, obtained_marks,\n         LAG(obtained_marks) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS prev_score\n  FROM exam_results\n)\nSELECT student_user_id\nFROM score_changes\nGROUP BY student_user_id\nHAVING COUNT(*) FILTER (\n  WHERE prev_score IS NOT NULL AND obtained_marks <= prev_score\n) = 0\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- The filtered count measures how many times a student failed to improve.\n- Keeping only groups with count 0 ensures every step is an improvement.\n\n## Difference from the optimal approach\n\nAlso good, but `BOOL_AND` states the intent more directly.",
      },
    ],
  },
  {
    code: "EDUCATION_075",
    approaches: [
      {
        approach_title: "Case sum",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ar.student_user_id FROM attendance_records ar GROUP BY ar.student_user_id HAVING SUM(CASE WHEN ar.attendance_status = 'absent' THEN 1 ELSE 0 END) = 0 ORDER BY ar.student_user_id ASC;",
        explanation:
          "## Approach\n\nGroup attendance by student and count absences using a conditional sum.\n\n## Query\n\n```sql\nSELECT ar.student_user_id\nFROM attendance_records ar\nGROUP BY ar.student_user_id\nHAVING SUM(CASE WHEN ar.attendance_status = 'absent' THEN 1 ELSE 0 END) = 0\nORDER BY ar.student_user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY student_user_id` creates one attendance summary per student.\n- The `CASE` expression adds 1 for absent rows and 0 otherwise.\n- A total of 0 means the student has no absences.\n\n## Why this is optimal\n\nIt is explicit, portable, and easy to understand.",
      },
      {
        approach_title: "Filter count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ar.student_user_id FROM attendance_records ar GROUP BY ar.student_user_id HAVING COUNT(*) FILTER (WHERE ar.attendance_status = 'absent') = 0 ORDER BY ar.student_user_id ASC;",
        explanation:
          "## Approach\n\nCount absent rows with `FILTER`, then keep students whose absent count is zero.\n\n## Query\n\n```sql\nSELECT ar.student_user_id\nFROM attendance_records ar\nGROUP BY ar.student_user_id\nHAVING COUNT(*) FILTER (WHERE ar.attendance_status = 'absent') = 0\nORDER BY ar.student_user_id ASC;\n```\n\n## Explanation\n\n- The filtered count only counts absent rows.\n- If that count is 0, the student was never marked absent.\n\n## Difference from the optimal approach\n\nCompact and correct, but `CASE` is often easier for beginners to read.",
      },
      {
        approach_title: "Except absent",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT DISTINCT student_user_id FROM attendance_records EXCEPT SELECT DISTINCT student_user_id FROM attendance_records WHERE attendance_status = 'absent' ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nTake all students with attendance records, then remove students who were ever absent.\n\n## Query\n\n```sql\nSELECT DISTINCT student_user_id\nFROM attendance_records\nEXCEPT\nSELECT DISTINCT student_user_id\nFROM attendance_records\nWHERE attendance_status = 'absent'\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- The first query gets all students who appear in attendance.\n- The second query gets students who have at least one absence.\n- `EXCEPT` removes those absent students.\n\n## Difference from the optimal approach\n\nCorrect, but less straightforward than grouped aggregation.",
      },
    ],
  },
  {
    code: "EDUCATION_076",
    approaches: [
      {
        approach_title: "CTE compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH student_totals AS ( SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id ), program_avg AS ( SELECT program_id, AVG(total_paid) AS avg_paid FROM student_totals GROUP BY program_id ) SELECT st.student_user_id, st.program_id, st.total_paid FROM student_totals st JOIN program_avg pa ON st.program_id = pa.program_id WHERE st.total_paid > pa.avg_paid ORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;",
        explanation:
          "## Approach\n\nCalculate each student's successful payment total, then compare it with the average total for their program.\n\n## Query\n\n```sql\nWITH student_totals AS (\n  SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  WHERE p.payment_status = 'successful'\n  GROUP BY fi.student_user_id, sp.program_id\n),\nprogram_avg AS (\n  SELECT program_id, AVG(total_paid) AS avg_paid\n  FROM student_totals\n  GROUP BY program_id\n)\nSELECT st.student_user_id, st.program_id, st.total_paid\nFROM student_totals st\nJOIN program_avg pa ON st.program_id = pa.program_id\nWHERE st.total_paid > pa.avg_paid\nORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;\n```\n\n## Explanation\n\n- `student_totals` calculates total successful payments for each student within a program.\n- `program_avg` calculates the average of those student totals per program.\n- The final query keeps students whose total paid amount is above their program average.\n\n## Why this is optimal\n\nIt separates student-level totals and program-level averages clearly.",
      },
      {
        approach_title: "Nested subqueries",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT st.student_user_id, st.program_id, st.total_paid FROM (SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id) st JOIN (SELECT program_id, AVG(total_paid) AS avg_paid FROM (SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id) x GROUP BY program_id) pa ON st.program_id = pa.program_id WHERE st.total_paid > pa.avg_paid ORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse derived tables instead of CTEs to calculate student totals and program averages.\n\n## Query\n\n```sql\nSELECT st.student_user_id, st.program_id, st.total_paid\nFROM (\n  SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  WHERE p.payment_status = 'successful'\n  GROUP BY fi.student_user_id, sp.program_id\n) st\nJOIN (\n  SELECT program_id, AVG(total_paid) AS avg_paid\n  FROM (\n    SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid\n    FROM payments p\n    JOIN fee_invoices fi ON p.invoice_id = fi.id\n    JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n    WHERE p.payment_status = 'successful'\n    GROUP BY fi.student_user_id, sp.program_id\n  ) x\n  GROUP BY program_id\n) pa ON st.program_id = pa.program_id\nWHERE st.total_paid > pa.avg_paid\nORDER BY st.program_id ASC, st.total_paid DESC, st.student_user_id ASC;\n```\n\n## Explanation\n\n- The first derived table calculates total successful payment per student and program.\n- The second derived table calculates the program average from those totals.\n- Joining them allows the final comparison.\n\n## Difference from the optimal approach\n\nIt returns the same result, but repeats the student total logic and is harder to read.",
      },
      {
        approach_title: "Window avg fixed",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH student_totals AS (SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY fi.student_user_id, sp.program_id) SELECT student_user_id, program_id, total_paid FROM (SELECT student_user_id, program_id, total_paid, AVG(total_paid) OVER (PARTITION BY program_id) AS avg_paid FROM student_totals WHERE program_id IS NOT NULL) t WHERE total_paid > avg_paid ORDER BY program_id ASC, total_paid DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nCompute student totals first, then use a window average to attach the program average to each row.\n\n## Query\n\n```sql\nWITH student_totals AS (\n  SELECT fi.student_user_id, sp.program_id, SUM(p.paid_amount) AS total_paid\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  WHERE p.payment_status = 'successful'\n  GROUP BY fi.student_user_id, sp.program_id\n)\nSELECT student_user_id, program_id, total_paid\nFROM (\n  SELECT student_user_id, program_id, total_paid,\n         AVG(total_paid) OVER (PARTITION BY program_id) AS avg_paid\n  FROM student_totals\n  WHERE program_id IS NOT NULL\n) t\nWHERE total_paid > avg_paid\nORDER BY program_id ASC, total_paid DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE computes total successful payments per student and program.\n- `AVG(total_paid) OVER (PARTITION BY program_id)` calculates the program average on each row.\n- `WHERE program_id IS NOT NULL` avoids NULL-program rows being grouped into a separate window bucket.\n- The outer query keeps students above their program average.\n\n## Difference from the optimal approach\n\nIt is compact and correct, but window averages may be harder for beginners than the two-CTE comparison.",
      },
    ],
  },
  {
    code: "EDUCATION_077",
    approaches: [
      {
        approach_title: "Row number top",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH teacher_ratings AS ( SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id ), ranked_teachers AS ( SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rn FROM teacher_ratings ) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM ranked_teachers WHERE rn = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nCalculate each teacher's average rating, rank teachers inside each department, then keep the top-ranked teacher.\n\n## Query\n\n```sql\nWITH teacher_ratings AS (\n  SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  GROUP BY tp.department_id, sf.teacher_user_id\n),\nranked_teachers AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rn\n  FROM teacher_ratings\n)\nSELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating\nFROM ranked_teachers\nWHERE rn = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- `teacher_ratings` calculates one average rating per teacher per department.\n- `ROW_NUMBER()` ranks teachers within each department.\n- `ORDER BY avg_rating DESC, teacher_user_id ASC` picks the highest-rated teacher and breaks ties by smaller teacher id.\n- `WHERE rn = 1` returns one top teacher per department.\n\n## Why this is optimal\n\nIt is the clearest top-one-per-group solution and handles ties deterministically.",
      },
      {
        approach_title: "Rank top",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_ratings AS (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id), ranked_teachers AS (SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rnk FROM teacher_ratings) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM ranked_teachers WHERE rnk = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nUse `RANK()` to rank teachers inside each department, then keep rank 1.\n\n## Query\n\n```sql\nWITH teacher_ratings AS (\n  SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  GROUP BY tp.department_id, sf.teacher_user_id\n),\nranked_teachers AS (\n  SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY avg_rating DESC, teacher_user_id ASC) AS rnk\n  FROM teacher_ratings\n)\nSELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating\nFROM ranked_teachers\nWHERE rnk = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- The first CTE calculates teacher average ratings.\n- `RANK()` assigns rank 1 to the best teacher in each department.\n- Because `teacher_user_id` is included in the ordering, ties are handled deterministically.\n\n## Difference from the optimal approach\n\nIt returns the same result here, but `ROW_NUMBER()` more directly communicates that only one teacher should be selected per department.",
      },
      {
        approach_title: "Max with tie-break",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH teacher_ratings AS (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id GROUP BY tp.department_id, sf.teacher_user_id), max_ratings AS (SELECT department_id, MAX(avg_rating) AS max_avg_rating FROM teacher_ratings GROUP BY department_id), top_teachers AS (SELECT tr.department_id, MIN(tr.teacher_user_id) AS teacher_user_id FROM teacher_ratings tr JOIN max_ratings mr ON tr.department_id = mr.department_id AND tr.avg_rating = mr.max_avg_rating GROUP BY tr.department_id) SELECT tr.department_id, tr.teacher_user_id, ROUND(tr.avg_rating, 2) AS avg_rating FROM teacher_ratings tr JOIN top_teachers tt ON tr.department_id = tt.department_id AND tr.teacher_user_id = tt.teacher_user_id ORDER BY tr.department_id ASC;",
        explanation:
          "## Approach\n\nFind the maximum average rating per department, then use the smallest teacher id as the tie-breaker.\n\n## Query\n\n```sql\nWITH teacher_ratings AS (\n  SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  GROUP BY tp.department_id, sf.teacher_user_id\n),\nmax_ratings AS (\n  SELECT department_id, MAX(avg_rating) AS max_avg_rating\n  FROM teacher_ratings\n  GROUP BY department_id\n),\ntop_teachers AS (\n  SELECT tr.department_id, MIN(tr.teacher_user_id) AS teacher_user_id\n  FROM teacher_ratings tr\n  JOIN max_ratings mr\n    ON tr.department_id = mr.department_id\n   AND tr.avg_rating = mr.max_avg_rating\n  GROUP BY tr.department_id\n)\nSELECT tr.department_id, tr.teacher_user_id, ROUND(tr.avg_rating, 2) AS avg_rating\nFROM teacher_ratings tr\nJOIN top_teachers tt\n  ON tr.department_id = tt.department_id\n AND tr.teacher_user_id = tt.teacher_user_id\nORDER BY tr.department_id ASC;\n```\n\n## Explanation\n\n- `teacher_ratings` calculates each teacher's average feedback score.\n- `max_ratings` finds the best average rating in each department.\n- `top_teachers` resolves ties by choosing the smallest teacher id.\n- The final query returns the selected teacher and rounded average rating.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose than using a window function.",
      },
    ],
  },
  {
    code: "EDUCATION_078",
    approaches: [
      {
        approach_title: "Ratio filter",
        approach_type: "arithmetic",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id AS offering_id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count > enrolled_count * 0.2 ORDER BY waitlist_count DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nFilter offerings where waitlist size exceeds 20 percent of enrolled count.\n\n## Query\n\n```sql\nSELECT id AS offering_id, enrolled_count, waitlist_count\nFROM course_offerings\nWHERE enrolled_count > 0\n  AND waitlist_count > enrolled_count * 0.2\nORDER BY waitlist_count DESC, offering_id ASC;\n```\n\n## Explanation\n\n- `enrolled_count > 0` avoids meaningless comparison against zero enrolled students.\n- `waitlist_count > enrolled_count * 0.2` checks the 20 percent threshold directly.\n- Sorting shows the heaviest waitlist pressure first.\n\n## Why this is optimal\n\nIt is direct, readable, and avoids unnecessary division.",
      },
      {
        approach_title: "Divide ratio",
        approach_type: "arithmetic",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id AS offering_id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count::numeric / enrolled_count > 0.2 ORDER BY waitlist_count DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nConvert the comparison into a numeric ratio.\n\n## Query\n\n```sql\nSELECT id AS offering_id, enrolled_count, waitlist_count\nFROM course_offerings\nWHERE enrolled_count > 0\n  AND waitlist_count::numeric / enrolled_count > 0.2\nORDER BY waitlist_count DESC, offering_id ASC;\n```\n\n## Explanation\n\n- Casting to numeric prevents integer division.\n- The ratio compares waitlist size to enrolled size.\n\n## Difference from the optimal approach\n\nCorrect, but multiplication is simpler and easier to read.",
      },
      {
        approach_title: "CTE pressure",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH pressured_offerings AS (SELECT id, enrolled_count, waitlist_count FROM course_offerings WHERE enrolled_count > 0 AND waitlist_count > enrolled_count * 0.2) SELECT id AS offering_id, enrolled_count, waitlist_count FROM pressured_offerings ORDER BY waitlist_count DESC, offering_id ASC;",
        explanation:
          "## Approach\n\nStore pressure-matching offerings in a CTE, then return them.\n\n## Query\n\n```sql\nWITH pressured_offerings AS (\n  SELECT id, enrolled_count, waitlist_count\n  FROM course_offerings\n  WHERE enrolled_count > 0\n    AND waitlist_count > enrolled_count * 0.2\n)\nSELECT id AS offering_id, enrolled_count, waitlist_count\nFROM pressured_offerings\nORDER BY waitlist_count DESC, offering_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates offerings under waitlist pressure.\n- The outer query only handles output formatting and ordering.\n\n## Difference from the optimal approach\n\nMore verbose for the same logic.",
      },
    ],
  },
  {
    code: "EDUCATION_079",
    approaches: [
      {
        approach_title: "Counts compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH offering_assignment_counts AS ( SELECT offering_id, COUNT(*) AS total_assignments FROM assignments GROUP BY offering_id ), student_submission_counts AS ( SELECT e.student_user_id, a.offering_id, COUNT(DISTINCT s.assignment_id) AS submitted_count FROM enrollments e JOIN assignments a ON e.offering_id = a.offering_id LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY e.student_user_id, a.offering_id ) SELECT ssc.student_user_id, ssc.offering_id FROM student_submission_counts ssc JOIN offering_assignment_counts oac ON ssc.offering_id = oac.offering_id WHERE ssc.submitted_count = oac.total_assignments ORDER BY ssc.offering_id ASC, ssc.student_user_id ASC;",
        explanation:
          "## Approach\n\nCompare the total number of assignments in each offering with each student's submitted assignment count.\n\n## Query\n\n```sql\nWITH offering_assignment_counts AS (\n  SELECT offering_id, COUNT(*) AS total_assignments\n  FROM assignments\n  GROUP BY offering_id\n),\nstudent_submission_counts AS (\n  SELECT e.student_user_id, a.offering_id,\n         COUNT(DISTINCT s.assignment_id) AS submitted_count\n  FROM enrollments e\n  JOIN assignments a ON e.offering_id = a.offering_id\n  LEFT JOIN assignment_submissions s\n    ON s.assignment_id = a.id\n   AND s.student_user_id = e.student_user_id\n   AND s.submission_status IN ('submitted', 'late_submitted', 'graded')\n  GROUP BY e.student_user_id, a.offering_id\n)\nSELECT ssc.student_user_id, ssc.offering_id\nFROM student_submission_counts ssc\nJOIN offering_assignment_counts oac ON ssc.offering_id = oac.offering_id\nWHERE ssc.submitted_count = oac.total_assignments\nORDER BY ssc.offering_id ASC, ssc.student_user_id ASC;\n```\n\n## Explanation\n\n- `offering_assignment_counts` counts how many assignments exist in each offering.\n- `student_submission_counts` counts how many distinct assignments each enrolled student submitted.\n- The final comparison keeps students whose submitted count equals the offering assignment count.\n\n## Why this is optimal\n\nIt breaks the problem into clear expected-versus-actual counts.",
      },
      {
        approach_title: "Group having",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT e.student_user_id, e.offering_id FROM enrollments e JOIN assignments a ON e.offering_id = a.offering_id LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY e.student_user_id, e.offering_id HAVING COUNT(DISTINCT a.id) = COUNT(DISTINCT s.assignment_id) ORDER BY e.offering_id ASC, e.student_user_id ASC;",
        explanation:
          "## Approach\n\nJoin each student to all assignments in their offering, then compare required assignments with submitted assignments.\n\n## Query\n\n```sql\nSELECT e.student_user_id, e.offering_id\nFROM enrollments e\nJOIN assignments a ON e.offering_id = a.offering_id\nLEFT JOIN assignment_submissions s\n  ON s.assignment_id = a.id\n AND s.student_user_id = e.student_user_id\n AND s.submission_status IN ('submitted', 'late_submitted', 'graded')\nGROUP BY e.student_user_id, e.offering_id\nHAVING COUNT(DISTINCT a.id) = COUNT(DISTINCT s.assignment_id)\nORDER BY e.offering_id ASC, e.student_user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(DISTINCT a.id)` is the number of assignments required for the offering.\n- `COUNT(DISTINCT s.assignment_id)` is the number of valid submitted assignments by the student.\n- If both counts match, the student submitted every assignment.\n\n## Difference from the optimal approach\n\nIt is more compact, but the CTE version makes the two counts easier to understand.",
      },
      {
        approach_title: "Exists with assignments",
        approach_type: "exists",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT e.student_user_id, e.offering_id FROM enrollments e WHERE EXISTS (SELECT 1 FROM assignments a WHERE a.offering_id = e.offering_id) AND NOT EXISTS ( SELECT 1 FROM assignments a WHERE a.offering_id = e.offering_id AND NOT EXISTS ( SELECT 1 FROM assignment_submissions s WHERE s.assignment_id = a.id AND s.student_user_id = e.student_user_id AND s.submission_status IN ('submitted', 'late_submitted', 'graded') ) ) ORDER BY e.offering_id ASC, e.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse `NOT EXISTS` to ensure there is no assignment without a valid submission for that student.\n\n## Query\n\n```sql\nSELECT e.student_user_id, e.offering_id\nFROM enrollments e\nWHERE EXISTS (\n  SELECT 1\n  FROM assignments a\n  WHERE a.offering_id = e.offering_id\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM assignments a\n  WHERE a.offering_id = e.offering_id\n    AND NOT EXISTS (\n      SELECT 1\n      FROM assignment_submissions s\n      WHERE s.assignment_id = a.id\n        AND s.student_user_id = e.student_user_id\n        AND s.submission_status IN ('submitted', 'late_submitted', 'graded')\n    )\n)\nORDER BY e.offering_id ASC, e.student_user_id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` ensures the offering has assignments.\n- The outer `NOT EXISTS` checks that no assignment is missing a valid submission.\n- The inner `NOT EXISTS` identifies a missing submission for a specific assignment.\n- If no such missing assignment exists, the student submitted all assignments.\n\n## Difference from the optimal approach\n\nIt is logically strong, but harder to read than count comparison.",
      },
    ],
  },
  {
    code: "EDUCATION_080",
    approaches: [
      {
        approach_title: "Join revenue",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT c.department_id, ROUND(SUM(p.paid_amount), 2) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id ORDER BY total_revenue DESC, c.department_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nTrace successful payments from students through enrollments to courses, then sum revenue by department.\n\n## Query\n\n```sql\nSELECT c.department_id, ROUND(SUM(p.paid_amount), 2) AS total_revenue\nFROM payments p\nJOIN fee_invoices fi ON p.invoice_id = fi.id\nJOIN student_profiles sp ON fi.student_user_id = sp.user_id\nJOIN enrollments e ON sp.user_id = e.student_user_id\nJOIN course_offerings co ON e.offering_id = co.id\nJOIN courses c ON co.course_id = c.id\nWHERE p.payment_status = 'successful'\nGROUP BY c.department_id\nORDER BY total_revenue DESC, c.department_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `payments` contains the money actually collected.\n- The joins connect each paying student to enrolled offerings and their course department.\n- `SUM(p.paid_amount)` calculates total revenue attributed to each department.\n- `LIMIT 5` keeps only the top 5 departments.\n\n## Why this is optimal\n\nIt follows the intended business path and directly produces the requested ranking.",
      },
      {
        approach_title: "CTE dept revenue",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH dept_revenue AS (SELECT c.department_id, SUM(p.paid_amount) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id) SELECT department_id, ROUND(total_revenue, 2) AS total_revenue FROM dept_revenue ORDER BY total_revenue DESC, department_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute department revenue in a CTE, then sort and limit the result.\n\n## Query\n\n```sql\nWITH dept_revenue AS (\n  SELECT c.department_id, SUM(p.paid_amount) AS total_revenue\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  JOIN enrollments e ON sp.user_id = e.student_user_id\n  JOIN course_offerings co ON e.offering_id = co.id\n  JOIN courses c ON co.course_id = c.id\n  WHERE p.payment_status = 'successful'\n  GROUP BY c.department_id\n)\nSELECT department_id, ROUND(total_revenue, 2) AS total_revenue\nFROM dept_revenue\nORDER BY total_revenue DESC, department_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one revenue total per department.\n- The outer query handles formatting, ranking, and limiting.\n\n## Difference from the optimal approach\n\nSame logic, but with an extra named step.",
      },
      {
        approach_title: "Subquery top 5",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT department_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT c.department_id, SUM(p.paid_amount) AS total_revenue FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id JOIN enrollments e ON sp.user_id = e.student_user_id JOIN course_offerings co ON e.offering_id = co.id JOIN courses c ON co.course_id = c.id WHERE p.payment_status = 'successful' GROUP BY c.department_id) d ORDER BY total_revenue DESC, department_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nAggregate department revenue in a derived table, then rank it.\n\n## Query\n\n```sql\nSELECT department_id, ROUND(total_revenue, 2) AS total_revenue\nFROM (\n  SELECT c.department_id, SUM(p.paid_amount) AS total_revenue\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  JOIN enrollments e ON sp.user_id = e.student_user_id\n  JOIN course_offerings co ON e.offering_id = co.id\n  JOIN courses c ON co.course_id = c.id\n  WHERE p.payment_status = 'successful'\n  GROUP BY c.department_id\n) d\nORDER BY total_revenue DESC, department_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query computes total revenue per department.\n- The outer query sorts and limits to the top 5.\n\n## Difference from the optimal approach\n\nCorrect, but the extra wrapper is unnecessary here.",
      },
    ],
  },
  {
    code: "EDUCATION_081",
    approaches: [
      {
        approach_title: "Join program avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH program_avg_cgpa AS (SELECT program_id, AVG(cgpa) AS avg_cgpa FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL GROUP BY program_id) SELECT sp.user_id, sp.program_id, sp.cgpa FROM student_profiles sp JOIN program_avg_cgpa pag ON sp.program_id = pag.program_id WHERE sp.cgpa IS NOT NULL AND sp.cgpa > pag.avg_cgpa ORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;",
        explanation:
          "## Approach\n\nCompute the average CGPA for each program, then compare each student against that program average.\n\n## Query\n\n```sql\nWITH program_avg_cgpa AS (\n  SELECT program_id, AVG(cgpa) AS avg_cgpa\n  FROM student_profiles\n  WHERE program_id IS NOT NULL\n    AND cgpa IS NOT NULL\n  GROUP BY program_id\n)\nSELECT sp.user_id, sp.program_id, sp.cgpa\nFROM student_profiles sp\nJOIN program_avg_cgpa pag ON sp.program_id = pag.program_id\nWHERE sp.cgpa IS NOT NULL\n  AND sp.cgpa > pag.avg_cgpa\nORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one average CGPA per program.\n- Joining it back lets each student compare against their own program average.\n- The outer filter keeps only students above that average.\n\n## Why this is optimal\n\nIt cleanly separates the group-level average from the row-level comparison.",
      },
      {
        approach_title: "Window avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id, program_id, cgpa FROM (SELECT user_id, program_id, cgpa, AVG(cgpa) OVER (PARTITION BY program_id) AS avg_cgpa FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL) s WHERE cgpa > avg_cgpa ORDER BY program_id ASC, cgpa DESC, user_id ASC;",
        explanation:
          "## Approach\n\nAttach each program's average CGPA to every student row with a window function.\n\n## Query\n\n```sql\nSELECT user_id, program_id, cgpa\nFROM (\n  SELECT user_id, program_id, cgpa,\n         AVG(cgpa) OVER (PARTITION BY program_id) AS avg_cgpa\n  FROM student_profiles\n  WHERE program_id IS NOT NULL\n    AND cgpa IS NOT NULL\n) s\nWHERE cgpa > avg_cgpa\nORDER BY program_id ASC, cgpa DESC, user_id ASC;\n```\n\n## Explanation\n\n- `AVG(cgpa) OVER (PARTITION BY program_id)` gives each student row the average for that program.\n- The outer query filters students above that value.\n\n## Difference from the optimal approach\n\nCompact and correct, but a join-based average is often easier for learners to reason about.",
      },
      {
        approach_title: "Correlated avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT sp.user_id, sp.program_id, sp.cgpa FROM student_profiles sp WHERE sp.program_id IS NOT NULL AND sp.cgpa IS NOT NULL AND sp.cgpa > (SELECT AVG(sp2.cgpa) FROM student_profiles sp2 WHERE sp2.program_id = sp.program_id AND sp2.cgpa IS NOT NULL) ORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;",
        explanation:
          "## Approach\n\nUse a correlated subquery to calculate the average CGPA for the current student's program.\n\n## Query\n\n```sql\nSELECT sp.user_id, sp.program_id, sp.cgpa\nFROM student_profiles sp\nWHERE sp.program_id IS NOT NULL\n  AND sp.cgpa IS NOT NULL\n  AND sp.cgpa > (\n    SELECT AVG(sp2.cgpa)\n    FROM student_profiles sp2\n    WHERE sp2.program_id = sp.program_id\n      AND sp2.cgpa IS NOT NULL\n  )\nORDER BY sp.program_id ASC, sp.cgpa DESC, sp.user_id ASC;\n```\n\n## Explanation\n\n- For each student row, the subquery computes the average CGPA of that same program.\n- The outer query keeps only rows above that average.\n\n## Difference from the optimal approach\n\nIt works, but usually performs worse and is less readable than precomputing averages.",
      },
    ],
  },
  {
    code: "EDUCATION_082",
    approaches: [
      {
        approach_title: "Group failed",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT student_user_id, COUNT(*) AS failed_exam_count FROM exam_results WHERE grade_letter = 'F' GROUP BY student_user_id HAVING COUNT(*) > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nFilter failed exams, group by student, and keep students with more than one failure.\n\n## Query\n\n```sql\nSELECT student_user_id, COUNT(*) AS failed_exam_count\nFROM exam_results\nWHERE grade_letter = 'F'\nGROUP BY student_user_id\nHAVING COUNT(*) > 1\nORDER BY failed_exam_count DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- `WHERE grade_letter = 'F'` keeps only failed exam rows.\n- `GROUP BY student_user_id` creates one row per student.\n- `HAVING COUNT(*) > 1` keeps students with more than one failure.\n\n## Why this is optimal\n\nIt is the most direct way to count failed exams per student.",
      },
      {
        approach_title: "CTE fails",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH failed_exams AS (SELECT student_user_id FROM exam_results WHERE grade_letter = 'F') SELECT student_user_id, COUNT(*) AS failed_exam_count FROM failed_exams GROUP BY student_user_id HAVING COUNT(*) > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nFirst isolate failed exam rows in a CTE, then count them per student.\n\n## Query\n\n```sql\nWITH failed_exams AS (\n  SELECT student_user_id\n  FROM exam_results\n  WHERE grade_letter = 'F'\n)\nSELECT student_user_id, COUNT(*) AS failed_exam_count\nFROM failed_exams\nGROUP BY student_user_id\nHAVING COUNT(*) > 1\nORDER BY failed_exam_count DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores only failures.\n- The outer query counts failures per student and filters to counts above 1.\n\n## Difference from the optimal approach\n\nMore verbose, but can help readability in larger queries.",
      },
      {
        approach_title: "Case count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT student_user_id, COUNT(*) FILTER (WHERE grade_letter = 'F') AS failed_exam_count FROM exam_results GROUP BY student_user_id HAVING COUNT(*) FILTER (WHERE grade_letter = 'F') > 1 ORDER BY failed_exam_count DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUse a filtered count instead of filtering rows first.\n\n## Query\n\n```sql\nSELECT student_user_id,\n       COUNT(*) FILTER (WHERE grade_letter = 'F') AS failed_exam_count\nFROM exam_results\nGROUP BY student_user_id\nHAVING COUNT(*) FILTER (WHERE grade_letter = 'F') > 1\nORDER BY failed_exam_count DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts only failed rows inside the aggregate.\n- The `HAVING` clause uses the same filtered count threshold.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single-condition count.",
      },
    ],
  },
  {
    code: "EDUCATION_083",
    approaches: [
      {
        approach_title: "Compare dept avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH teacher_avg AS ( SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id ), department_avg AS ( SELECT department_id, AVG(avg_rating) AS dept_avg_rating FROM teacher_avg GROUP BY department_id ) SELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating FROM teacher_avg ta JOIN department_avg da ON ta.department_id = da.department_id WHERE ta.avg_rating > da.dept_avg_rating ORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;",
        explanation:
          "## Approach\n\nFirst compute each teacher's average rating, then compute the department average of those teacher averages, and compare them.\n\n## Query\n\n```sql\nWITH teacher_avg AS (\n  SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  WHERE tp.department_id IS NOT NULL\n  GROUP BY tp.department_id, sf.teacher_user_id\n),\ndepartment_avg AS (\n  SELECT department_id, AVG(avg_rating) AS dept_avg_rating\n  FROM teacher_avg\n  GROUP BY department_id\n)\nSELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating\nFROM teacher_avg ta\nJOIN department_avg da ON ta.department_id = da.department_id\nWHERE ta.avg_rating > da.dept_avg_rating\nORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;\n```\n\n## Explanation\n\n- `teacher_avg` creates one average rating per teacher within a department.\n- `department_avg` computes the average of those teacher averages.\n- The final query keeps teachers above their department average.\n\n## Why this is optimal\n\nIt models the two comparison levels clearly and correctly.",
      },
      {
        approach_title: "Window compare",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_avg AS (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id) SELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating FROM (SELECT department_id, teacher_user_id, avg_rating, AVG(avg_rating) OVER (PARTITION BY department_id) AS dept_avg_rating FROM teacher_avg) t WHERE avg_rating > dept_avg_rating ORDER BY department_id ASC, avg_rating DESC, teacher_user_id ASC;",
        explanation:
          "## Approach\n\nCompute teacher averages first, then attach the department average using a window function.\n\n## Query\n\n```sql\nWITH teacher_avg AS (\n  SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  WHERE tp.department_id IS NOT NULL\n  GROUP BY tp.department_id, sf.teacher_user_id\n)\nSELECT department_id, teacher_user_id, ROUND(avg_rating, 2) AS avg_rating\nFROM (\n  SELECT department_id, teacher_user_id, avg_rating,\n         AVG(avg_rating) OVER (PARTITION BY department_id) AS dept_avg_rating\n  FROM teacher_avg\n) t\nWHERE avg_rating > dept_avg_rating\nORDER BY department_id ASC, avg_rating DESC, teacher_user_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one average per teacher.\n- The window function gives each row the average teacher rating for that department.\n- The outer query filters teachers above it.\n\n## Difference from the optimal approach\n\nCompact and correct, but a two-CTE comparison is often easier to follow.",
      },
      {
        approach_title: "Nested subqueries",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating FROM (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id) ta JOIN (SELECT department_id, AVG(avg_rating) AS dept_avg_rating FROM (SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id, sf.teacher_user_id) x GROUP BY department_id) da ON ta.department_id = da.department_id WHERE ta.avg_rating > da.dept_avg_rating ORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;",
        explanation:
          "## Approach\n\nUse derived tables instead of named CTEs for teacher and department averages.\n\n## Query\n\n```sql\nSELECT ta.department_id, ta.teacher_user_id, ROUND(ta.avg_rating, 2) AS avg_rating\nFROM (\n  SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  WHERE tp.department_id IS NOT NULL\n  GROUP BY tp.department_id, sf.teacher_user_id\n) ta\nJOIN (\n  SELECT department_id, AVG(avg_rating) AS dept_avg_rating\n  FROM (\n    SELECT tp.department_id, sf.teacher_user_id, AVG(sf.rating_value) AS avg_rating\n    FROM student_feedback sf\n    JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n    WHERE tp.department_id IS NOT NULL\n    GROUP BY tp.department_id, sf.teacher_user_id\n  ) x\n  GROUP BY department_id\n) da ON ta.department_id = da.department_id\nWHERE ta.avg_rating > da.dept_avg_rating\nORDER BY ta.department_id ASC, ta.avg_rating DESC, ta.teacher_user_id ASC;\n```\n\n## Explanation\n\n- The logic is the same as the optimal approach.\n- The only difference is that averages are built using derived tables instead of named CTEs.\n\n## Difference from the optimal approach\n\nCorrect, but harder to read due to repeated subqueries.",
      },
    ],
  },
  {
    code: "EDUCATION_084",
    approaches: [
      {
        approach_title: "Expected vs actual",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH offering_assignments AS ( SELECT offering_id, COUNT(*) AS total_assignments FROM assignments GROUP BY offering_id ), enrolled_students AS ( SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id ), required_submissions AS ( SELECT oa.offering_id, oa.total_assignments * es.total_students AS expected_submissions FROM offering_assignments oa JOIN enrolled_students es ON oa.offering_id = es.offering_id ), actual_submissions AS ( SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id ) SELECT rs.offering_id FROM required_submissions rs JOIN actual_submissions ac ON rs.offering_id = ac.offering_id WHERE rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;",
        explanation:
          "## Approach\n\nCalculate expected submissions and actual submissions separately, then compare them.\n\n## Query\n\n```sql\nWITH offering_assignments AS (\n  SELECT offering_id, COUNT(*) AS total_assignments\n  FROM assignments\n  GROUP BY offering_id\n),\nenrolled_students AS (\n  SELECT offering_id, COUNT(*) AS total_students\n  FROM enrollments\n  WHERE enrollment_status = 'enrolled'\n  GROUP BY offering_id\n),\nrequired_submissions AS (\n  SELECT oa.offering_id,\n         oa.total_assignments * es.total_students AS expected_submissions\n  FROM offering_assignments oa\n  JOIN enrolled_students es ON oa.offering_id = es.offering_id\n),\nactual_submissions AS (\n  SELECT a.offering_id, COUNT(*) AS actual_submissions\n  FROM assignments a\n  JOIN assignment_submissions s ON a.id = s.assignment_id\n  WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded')\n  GROUP BY a.offering_id\n)\nSELECT rs.offering_id\nFROM required_submissions rs\nJOIN actual_submissions ac ON rs.offering_id = ac.offering_id\nWHERE rs.expected_submissions = ac.actual_submissions\nORDER BY rs.offering_id ASC;\n```\n\n## Explanation\n\n- `offering_assignments` counts assignments per offering.\n- `enrolled_students` counts enrolled students per offering.\n- `required_submissions` multiplies those counts to calculate the expected submission count.\n- `actual_submissions` counts valid submitted rows.\n- If expected and actual counts match, every enrolled student submitted every assignment.\n\n## Why this is optimal\n\nIt clearly models the business rule as expected-versus-actual validation.",
      },
      {
        approach_title: "Nested counts",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT rs.offering_id FROM (SELECT a.offering_id, COUNT(*) * es.total_students AS expected_submissions FROM assignments a JOIN (SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id) es ON a.offering_id = es.offering_id GROUP BY a.offering_id, es.total_students) rs JOIN (SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id) ac ON rs.offering_id = ac.offering_id WHERE rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;",
        explanation:
          "## Approach\n\nUse derived tables to calculate expected and actual submission counts, then compare them.\n\n## Query\n\n```sql\nSELECT rs.offering_id\nFROM (\n  SELECT a.offering_id, COUNT(*) * es.total_students AS expected_submissions\n  FROM assignments a\n  JOIN (\n    SELECT offering_id, COUNT(*) AS total_students\n    FROM enrollments\n    WHERE enrollment_status = 'enrolled'\n    GROUP BY offering_id\n  ) es ON a.offering_id = es.offering_id\n  GROUP BY a.offering_id, es.total_students\n) rs\nJOIN (\n  SELECT a.offering_id, COUNT(*) AS actual_submissions\n  FROM assignments a\n  JOIN assignment_submissions s ON a.id = s.assignment_id\n  WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded')\n  GROUP BY a.offering_id\n) ac ON rs.offering_id = ac.offering_id\nWHERE rs.expected_submissions = ac.actual_submissions\nORDER BY rs.offering_id ASC;\n```\n\n## Explanation\n\n- The first derived table calculates how many submissions should exist per offering.\n- The second derived table counts how many valid submissions actually exist.\n- The final query keeps only offerings where both counts match.\n\n## Difference from the optimal approach\n\nIt returns the same result, but CTEs make the steps easier to read.",
      },
      {
        approach_title: "HAVING counts",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT rs.offering_id FROM (SELECT a.offering_id, COUNT(*) * es.total_students AS expected_submissions FROM assignments a JOIN (SELECT offering_id, COUNT(*) AS total_students FROM enrollments WHERE enrollment_status = 'enrolled' GROUP BY offering_id) es ON a.offering_id = es.offering_id GROUP BY a.offering_id, es.total_students) rs JOIN (SELECT a.offering_id, COUNT(*) AS actual_submissions FROM assignments a JOIN assignment_submissions s ON a.id = s.assignment_id WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded') GROUP BY a.offering_id) ac ON rs.offering_id = ac.offering_id GROUP BY rs.offering_id, rs.expected_submissions, ac.actual_submissions HAVING rs.expected_submissions = ac.actual_submissions ORDER BY rs.offering_id ASC;",
        explanation:
          "## Approach\n\nUse grouped expected and actual counts, then compare them in `HAVING`.\n\n## Query\n\n```sql\nSELECT rs.offering_id\nFROM (\n  SELECT a.offering_id, COUNT(*) * es.total_students AS expected_submissions\n  FROM assignments a\n  JOIN (\n    SELECT offering_id, COUNT(*) AS total_students\n    FROM enrollments\n    WHERE enrollment_status = 'enrolled'\n    GROUP BY offering_id\n  ) es ON a.offering_id = es.offering_id\n  GROUP BY a.offering_id, es.total_students\n) rs\nJOIN (\n  SELECT a.offering_id, COUNT(*) AS actual_submissions\n  FROM assignments a\n  JOIN assignment_submissions s ON a.id = s.assignment_id\n  WHERE s.submission_status IN ('submitted', 'late_submitted', 'graded')\n  GROUP BY a.offering_id\n) ac ON rs.offering_id = ac.offering_id\nGROUP BY rs.offering_id, rs.expected_submissions, ac.actual_submissions\nHAVING rs.expected_submissions = ac.actual_submissions\nORDER BY rs.offering_id ASC;\n```\n\n## Explanation\n\n- The first subquery calculates expected submissions per offering.\n- The second subquery calculates actual valid submissions per offering.\n- `HAVING` compares both grouped values.\n- This avoids undercounting caused by joining submissions directly to assignments without multiplying by enrolled students correctly.\n\n## Difference from the optimal approach\n\nIt returns the same result, but it is less clean than the named CTE version.",
      },
    ],
  },
  {
    code: "EDUCATION_085",
    approaches: [
      {
        approach_title: "Left join none",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT fi.student_user_id FROM fee_invoices fi LEFT JOIN payments p ON fi.id = p.invoice_id AND p.payment_status = 'successful' WHERE p.id IS NULL ORDER BY fi.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse an anti-join to find invoices without successful payments.\n\n## Query\n\n```sql\nSELECT DISTINCT fi.student_user_id\nFROM fee_invoices fi\nLEFT JOIN payments p\n  ON fi.id = p.invoice_id\n AND p.payment_status = 'successful'\nWHERE p.id IS NULL\nORDER BY fi.student_user_id ASC;\n```\n\n## Explanation\n\n- `fee_invoices` gives students who have invoices.\n- The `LEFT JOIN` tries to match each invoice with a successful payment.\n- `WHERE p.id IS NULL` keeps invoices where no successful payment exists.\n- `DISTINCT` returns each student only once.\n\n## Why this is optimal\n\nIt is the clearest anti-join pattern for finding missing successful payments.",
      },
      {
        approach_title: "Not exists",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT fi.student_user_id FROM fee_invoices fi WHERE NOT EXISTS (SELECT 1 FROM payments p WHERE p.invoice_id = fi.id AND p.payment_status = 'successful') ORDER BY fi.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse `NOT EXISTS` to check that no successful payment exists for an invoice.\n\n## Query\n\n```sql\nSELECT DISTINCT fi.student_user_id\nFROM fee_invoices fi\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM payments p\n  WHERE p.invoice_id = fi.id\n    AND p.payment_status = 'successful'\n)\nORDER BY fi.student_user_id ASC;\n```\n\n## Explanation\n\n- The outer query starts from invoices.\n- The subquery searches for a successful payment for each invoice.\n- `NOT EXISTS` keeps only invoices where that successful payment is missing.\n- `DISTINCT` removes duplicate student ids.\n\n## Difference from the optimal approach\n\nIt is also correct and reliable, but the left-join anti-join pattern is easier for many learners to visualize.",
      },
      {
        approach_title: "Group payments",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT DISTINCT student_user_id FROM (SELECT fi.student_user_id, fi.id AS invoice_id, COUNT(*) FILTER (WHERE p.payment_status = 'successful') AS successful_payments FROM fee_invoices fi LEFT JOIN payments p ON fi.id = p.invoice_id GROUP BY fi.student_user_id, fi.id HAVING COUNT(*) FILTER (WHERE p.payment_status = 'successful') = 0) unpaid_invoices ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nGroup payments per invoice, then keep invoices with zero successful payments.\n\n## Query\n\n```sql\nSELECT DISTINCT student_user_id\nFROM (\n  SELECT fi.student_user_id, fi.id AS invoice_id,\n         COUNT(*) FILTER (WHERE p.payment_status = 'successful') AS successful_payments\n  FROM fee_invoices fi\n  LEFT JOIN payments p ON fi.id = p.invoice_id\n  GROUP BY fi.student_user_id, fi.id\n  HAVING COUNT(*) FILTER (WHERE p.payment_status = 'successful') = 0\n) unpaid_invoices\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- The inner query groups each invoice with its payment rows.\n- The filtered count checks how many successful payments exist for that invoice.\n- `HAVING ... = 0` keeps invoices with no successful payment.\n- The outer `DISTINCT` returns each matching student once.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose than using `LEFT JOIN ... IS NULL` directly.",
      },
    ],
  },
  {
    code: "EDUCATION_086",
    approaches: [
      {
        approach_title: "Overlap self join",
        approach_type: "self_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id AND t1.start_time < t2.end_time AND t2.start_time < t1.end_time WHERE t1.classroom_id IS NOT NULL ORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
        explanation:
          "## Approach\n\nSelf join timetable slots and keep pairs that overlap in the same classroom on the same weekday.\n\n## Query\n\n```sql\nSELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2\nFROM timetable_slots t1\nJOIN timetable_slots t2\n  ON t1.classroom_id = t2.classroom_id\n AND t1.weekday_no = t2.weekday_no\n AND t1.id < t2.id\n AND t1.start_time < t2.end_time\n AND t2.start_time < t1.end_time\nWHERE t1.classroom_id IS NOT NULL\nORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;\n```\n\n## Explanation\n\n- The self join compares each slot with other slots.\n- `t1.id < t2.id` avoids duplicate and self-pair comparisons.\n- The time conditions detect true overlaps.\n- Matching classroom and weekday ensures the conflict is real.\n\n## Why this is optimal\n\nSelf joining with interval-overlap logic is the standard solution for schedule conflicts.",
      },
      {
        approach_title: "CTE compare",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH slot_pairs AS (SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2, t1.start_time AS start_1, t1.end_time AS end_1, t2.start_time AS start_2, t2.end_time AS end_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id WHERE t1.classroom_id IS NOT NULL) SELECT classroom_id, weekday_no, slot_id_1, slot_id_2 FROM slot_pairs WHERE start_1 < end_2 AND start_2 < end_1 ORDER BY classroom_id ASC, weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
        explanation:
          "## Approach\n\nCreate possible slot pairs first, then filter to overlapping times.\n\n## Query\n\n```sql\nWITH slot_pairs AS (\n  SELECT t1.classroom_id, t1.weekday_no,\n         t1.id AS slot_id_1, t2.id AS slot_id_2,\n         t1.start_time AS start_1, t1.end_time AS end_1,\n         t2.start_time AS start_2, t2.end_time AS end_2\n  FROM timetable_slots t1\n  JOIN timetable_slots t2\n    ON t1.classroom_id = t2.classroom_id\n   AND t1.weekday_no = t2.weekday_no\n   AND t1.id < t2.id\n  WHERE t1.classroom_id IS NOT NULL\n)\nSELECT classroom_id, weekday_no, slot_id_1, slot_id_2\nFROM slot_pairs\nWHERE start_1 < end_2\n  AND start_2 < end_1\nORDER BY classroom_id ASC, weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;\n```\n\n## Explanation\n\n- The CTE builds valid classroom-day pairs.\n- The outer query applies the overlap condition.\n\n## Difference from the optimal approach\n\nMore verbose, but sometimes easier to debug.",
      },
      {
        approach_title: "Range compare",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2 FROM timetable_slots t1 JOIN timetable_slots t2 ON t1.classroom_id = t2.classroom_id AND t1.weekday_no = t2.weekday_no AND t1.id < t2.id WHERE t1.classroom_id IS NOT NULL AND NOT (t1.end_time <= t2.start_time OR t2.end_time <= t1.start_time) ORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
        explanation:
          "## Approach\n\nUse the opposite of the non-overlap rule to detect conflicts.\n\n## Query\n\n```sql\nSELECT t1.classroom_id, t1.weekday_no, t1.id AS slot_id_1, t2.id AS slot_id_2\nFROM timetable_slots t1\nJOIN timetable_slots t2\n  ON t1.classroom_id = t2.classroom_id\n AND t1.weekday_no = t2.weekday_no\n AND t1.id < t2.id\nWHERE t1.classroom_id IS NOT NULL\n  AND NOT (\n    t1.end_time <= t2.start_time\n    OR t2.end_time <= t1.start_time\n  )\nORDER BY t1.classroom_id ASC, t1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;\n```\n\n## Explanation\n\n- Two slots do not overlap only when one ends before the other starts.\n- Negating that condition detects overlap.\n\n## Difference from the optimal approach\n\nEquivalent and correct, but the positive overlap test is usually easier to read.",
      },
    ],
  },
  {
    code: "EDUCATION_087",
    approaches: [
      {
        approach_title: "Teacher overlap",
        approach_type: "self_join",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH teacher_slots AS ( SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id ) SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id AND ts1.start_time < ts2.end_time AND ts2.start_time < ts1.end_time ORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
        explanation:
          "## Approach\n\nFirst map teachers to timetable slots, then self join those teacher-slot rows to find overlaps.\n\n## Query\n\n```sql\nWITH teacher_slots AS (\n  SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time\n  FROM course_teachers ct\n  JOIN timetable_slots ts ON ct.offering_id = ts.offering_id\n)\nSELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2\nFROM teacher_slots ts1\nJOIN teacher_slots ts2\n  ON ts1.teacher_user_id = ts2.teacher_user_id\n AND ts1.weekday_no = ts2.weekday_no\n AND ts1.slot_id < ts2.slot_id\n AND ts1.start_time < ts2.end_time\n AND ts2.start_time < ts1.end_time\nORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;\n```\n\n## Explanation\n\n- The CTE builds a list of all slots for each teacher.\n- The self join compares a teacher's slots on the same weekday.\n- `slot_id < slot_id_2` avoids duplicate pairings.\n- The time conditions detect overlapping intervals.\n\n## Why this is optimal\n\nIt mirrors the classroom-conflict logic and clearly separates teacher-slot expansion from overlap detection.",
      },
      {
        approach_title: "CTE pairs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_slots AS (SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id), slot_pairs AS (SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2, ts1.start_time AS start_1, ts1.end_time AS end_1, ts2.start_time AS start_2, ts2.end_time AS end_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id) SELECT teacher_user_id, weekday_no, slot_id_1, slot_id_2 FROM slot_pairs WHERE start_1 < end_2 AND start_2 < end_1 ORDER BY teacher_user_id ASC, weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
        explanation:
          "## Approach\n\nBuild teacher-slot pairs in one step, then apply the overlap test in another.\n\n## Query\n\n```sql\nWITH teacher_slots AS (\n  SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time\n  FROM course_teachers ct\n  JOIN timetable_slots ts ON ct.offering_id = ts.offering_id\n),\nslot_pairs AS (\n  SELECT ts1.teacher_user_id, ts1.weekday_no,\n         ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2,\n         ts1.start_time AS start_1, ts1.end_time AS end_1,\n         ts2.start_time AS start_2, ts2.end_time AS end_2\n  FROM teacher_slots ts1\n  JOIN teacher_slots ts2\n    ON ts1.teacher_user_id = ts2.teacher_user_id\n   AND ts1.weekday_no = ts2.weekday_no\n   AND ts1.slot_id < ts2.slot_id\n)\nSELECT teacher_user_id, weekday_no, slot_id_1, slot_id_2\nFROM slot_pairs\nWHERE start_1 < end_2\n  AND start_2 < end_1\nORDER BY teacher_user_id ASC, weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;\n```\n\n## Explanation\n\n- The first CTE maps teachers to slots.\n- The second creates comparable slot pairs.\n- The final filter keeps only overlapping pairs.\n\n## Difference from the optimal approach\n\nCorrect, but slightly more verbose.",
      },
      {
        approach_title: "Non-overlap negation",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH teacher_slots AS (SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time FROM course_teachers ct JOIN timetable_slots ts ON ct.offering_id = ts.offering_id) SELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2 FROM teacher_slots ts1 JOIN teacher_slots ts2 ON ts1.teacher_user_id = ts2.teacher_user_id AND ts1.weekday_no = ts2.weekday_no AND ts1.slot_id < ts2.slot_id WHERE NOT (ts1.end_time <= ts2.start_time OR ts2.end_time <= ts1.start_time) ORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;",
        explanation:
          "## Approach\n\nDetect overlap by excluding non-overlapping time pairs.\n\n## Query\n\n```sql\nWITH teacher_slots AS (\n  SELECT ct.teacher_user_id, ts.weekday_no, ts.id AS slot_id, ts.start_time, ts.end_time\n  FROM course_teachers ct\n  JOIN timetable_slots ts ON ct.offering_id = ts.offering_id\n)\nSELECT ts1.teacher_user_id, ts1.weekday_no, ts1.slot_id AS slot_id_1, ts2.slot_id AS slot_id_2\nFROM teacher_slots ts1\nJOIN teacher_slots ts2\n  ON ts1.teacher_user_id = ts2.teacher_user_id\n AND ts1.weekday_no = ts2.weekday_no\n AND ts1.slot_id < ts2.slot_id\nWHERE NOT (\n  ts1.end_time <= ts2.start_time\n  OR ts2.end_time <= ts1.start_time\n)\nORDER BY ts1.teacher_user_id ASC, ts1.weekday_no ASC, slot_id_1 ASC, slot_id_2 ASC;\n```\n\n## Explanation\n\n- The condition says two slots overlap unless one ends before the other starts.\n- Negating non-overlap detects conflicts.\n\n## Difference from the optimal approach\n\nEquivalent, but the positive overlap condition is usually easier to interpret.",
      },
    ],
  },
  {
    code: "EDUCATION_088",
    approaches: [
      {
        approach_title: "Split averages",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH scored_exams AS ( SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL ), split_scores AS ( SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM scored_exams GROUP BY student_user_id ) SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM split_scores WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nNumber each student's exams, split them into earlier and later exams, then compare both averages.\n\n## Query\n\n```sql\nWITH scored_exams AS (\n  SELECT student_user_id, exam_id, obtained_marks,\n         ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn,\n         COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n),\nsplit_scores AS (\n  SELECT student_user_id,\n         AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg,\n         AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg\n  FROM scored_exams\n  GROUP BY student_user_id\n)\nSELECT student_user_id,\n       ROUND(first_half_avg, 2) AS first_half_avg,\n       ROUND(second_half_avg, 2) AS second_half_avg\nFROM split_scores\nWHERE second_half_avg > first_half_avg\nORDER BY second_half_avg DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` orders exams for each student.\n- `COUNT(*) OVER (...)` gives the total number of exams per student.\n- The `CASE` expressions split marks into earlier and later groups.\n- The final filter keeps students whose later average is greater than their earlier average.\n\n## Why this is optimal\n\nIt makes the split logic explicit and easy to reason about.",
      },
      {
        approach_title: "CTE split",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH scored_exams AS (SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL), half_avgs AS (SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM scored_exams GROUP BY student_user_id) SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM half_avgs WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUse the same explicit row-number split as the optimal query, but name the average step as `half_avgs`.\n\n## Query\n\n```sql\nWITH scored_exams AS (\n  SELECT student_user_id, exam_id, obtained_marks,\n         ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn,\n         COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n),\nhalf_avgs AS (\n  SELECT student_user_id,\n         AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg,\n         AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg\n  FROM scored_exams\n  GROUP BY student_user_id\n)\nSELECT student_user_id,\n       ROUND(first_half_avg, 2) AS first_half_avg,\n       ROUND(second_half_avg, 2) AS second_half_avg\nFROM half_avgs\nWHERE second_half_avg > first_half_avg\nORDER BY second_half_avg DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` gives each exam a sequence number per student.\n- `COUNT(*) OVER (...)` gives total exams per student.\n- The CASE expressions split scores using the exact same rule as the expected query.\n- This avoids `NTILE(2)`, which can bucket odd counts differently and change the result set.\n\n## Difference from the optimal approach\n\nIt returns the same result, but only renames the second CTE.",
      },
      {
        approach_title: "Nested split",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT student_user_id, ROUND(first_half_avg, 2) AS first_half_avg, ROUND(second_half_avg, 2) AS second_half_avg FROM (SELECT student_user_id, AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg, AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg FROM (SELECT student_user_id, exam_id, obtained_marks, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn, COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams FROM exam_results WHERE obtained_marks IS NOT NULL) s GROUP BY student_user_id) x WHERE second_half_avg > first_half_avg ORDER BY second_half_avg DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUse nested derived tables to calculate exam order, split averages, and filter improved students.\n\n## Query\n\n```sql\nSELECT student_user_id,\n       ROUND(first_half_avg, 2) AS first_half_avg,\n       ROUND(second_half_avg, 2) AS second_half_avg\nFROM (\n  SELECT student_user_id,\n         AVG(CASE WHEN rn <= total_exams / 2.0 THEN obtained_marks END) AS first_half_avg,\n         AVG(CASE WHEN rn > total_exams / 2.0 THEN obtained_marks END) AS second_half_avg\n  FROM (\n    SELECT student_user_id, exam_id, obtained_marks,\n           ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn,\n           COUNT(*) OVER (PARTITION BY student_user_id) AS total_exams\n    FROM exam_results\n    WHERE obtained_marks IS NOT NULL\n  ) s\n  GROUP BY student_user_id\n) x\nWHERE second_half_avg > first_half_avg\nORDER BY second_half_avg DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- The innermost query numbers each student's exams and counts total exams.\n- The middle query calculates first-half and second-half averages.\n- The outer query filters to improved students and orders the result.\n\n## Difference from the optimal approach\n\nCorrect, but CTEs are easier to read than nested subqueries for this problem.",
      },
    ],
  },
  {
    code: "EDUCATION_089",
    approaches: [
      {
        approach_title: "Filter count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT program_id FROM student_profiles WHERE program_id IS NOT NULL GROUP BY program_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE enrollment_status = 'active') ORDER BY program_id ASC;",
        explanation:
          "## Approach\n\nGroup students by program and compare total student count to active-student count.\n\n## Query\n\n```sql\nSELECT program_id\nFROM student_profiles\nWHERE program_id IS NOT NULL\nGROUP BY program_id\nHAVING COUNT(*) = COUNT(*) FILTER (WHERE enrollment_status = 'active')\nORDER BY program_id ASC;\n```\n\n## Explanation\n\n- `COUNT(*)` gives total students in the program.\n- The filtered count gives only active students.\n- Equality means every student in that program is active.\n\n## Why this is optimal\n\nIt is compact, correct, and directly expresses the 100 percent active condition.",
      },
      {
        approach_title: "Case count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT program_id FROM student_profiles WHERE program_id IS NOT NULL GROUP BY program_id HAVING COUNT(*) = SUM(CASE WHEN enrollment_status = 'active' THEN 1 ELSE 0 END) ORDER BY program_id ASC;",
        explanation:
          "## Approach\n\nCompare total students to a conditional sum of active students.\n\n## Query\n\n```sql\nSELECT program_id\nFROM student_profiles\nWHERE program_id IS NOT NULL\nGROUP BY program_id\nHAVING COUNT(*) = SUM(CASE WHEN enrollment_status = 'active' THEN 1 ELSE 0 END)\nORDER BY program_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression adds 1 only for active students.\n- If that sum equals the total count, every student is active.\n\n## Difference from the optimal approach\n\nAlso correct, but `FILTER` is cleaner and shorter in PostgreSQL.",
      },
      {
        approach_title: "Not exists nonactive",
        approach_type: "exists",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT DISTINCT sp1.program_id FROM student_profiles sp1 WHERE sp1.program_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM student_profiles sp2 WHERE sp2.program_id = sp1.program_id AND sp2.enrollment_status <> 'active') ORDER BY sp1.program_id ASC;",
        explanation:
          "## Approach\n\nReturn programs for which no non-active student exists.\n\n## Query\n\n```sql\nSELECT DISTINCT sp1.program_id\nFROM student_profiles sp1\nWHERE sp1.program_id IS NOT NULL\n  AND NOT EXISTS (\n    SELECT 1\n    FROM student_profiles sp2\n    WHERE sp2.program_id = sp1.program_id\n      AND sp2.enrollment_status <> 'active'\n  )\nORDER BY sp1.program_id ASC;\n```\n\n## Explanation\n\n- The outer query starts from programs present in student profiles.\n- `NOT EXISTS` removes any program that has a non-active student.\n- `DISTINCT` ensures one row per program.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than grouped counting.",
      },
    ],
  },
  {
    code: "EDUCATION_090",
    approaches: [
      {
        approach_title: "Join averages",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH assignment_avg AS ( SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL GROUP BY student_user_id ), exam_avg AS ( SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY student_user_id ) SELECT aa.student_user_id, ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score, ROUND(ea.avg_exam_score, 2) AS avg_exam_score FROM assignment_avg aa JOIN exam_avg ea ON aa.student_user_id = ea.student_user_id WHERE aa.avg_assignment_score > ea.avg_exam_score ORDER BY avg_assignment_score DESC, aa.student_user_id ASC;",
        explanation:
          "## Approach\n\nCompute assignment and exam averages separately, then join them student by student.\n\n## Query\n\n```sql\nWITH assignment_avg AS (\n  SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n  GROUP BY student_user_id\n),\nexam_avg AS (\n  SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n  GROUP BY student_user_id\n)\nSELECT aa.student_user_id,\n       ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score,\n       ROUND(ea.avg_exam_score, 2) AS avg_exam_score\nFROM assignment_avg aa\nJOIN exam_avg ea ON aa.student_user_id = ea.student_user_id\nWHERE aa.avg_assignment_score > ea.avg_exam_score\nORDER BY avg_assignment_score DESC, aa.student_user_id ASC;\n```\n\n## Explanation\n\n- `assignment_avg` builds one average assignment score per student.\n- `exam_avg` builds one average exam score per student.\n- Joining them allows a direct comparison for each student.\n- The filter keeps students whose assignment average is higher.\n\n## Why this is optimal\n\nIt clearly separates the two metrics before comparing them.",
      },
      {
        approach_title: "Nested averages",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT aa.student_user_id, ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score, ROUND(ea.avg_exam_score, 2) AS avg_exam_score FROM (SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score FROM assignment_submissions WHERE obtained_marks IS NOT NULL GROUP BY student_user_id) aa JOIN (SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score FROM exam_results WHERE obtained_marks IS NOT NULL GROUP BY student_user_id) ea ON aa.student_user_id = ea.student_user_id WHERE aa.avg_assignment_score > ea.avg_exam_score ORDER BY avg_assignment_score DESC, aa.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse derived tables instead of CTEs for the two averages.\n\n## Query\n\n```sql\nSELECT aa.student_user_id,\n       ROUND(aa.avg_assignment_score, 2) AS avg_assignment_score,\n       ROUND(ea.avg_exam_score, 2) AS avg_exam_score\nFROM (\n  SELECT student_user_id, AVG(obtained_marks) AS avg_assignment_score\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n  GROUP BY student_user_id\n) aa\nJOIN (\n  SELECT student_user_id, AVG(obtained_marks) AS avg_exam_score\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n  GROUP BY student_user_id\n) ea ON aa.student_user_id = ea.student_user_id\nWHERE aa.avg_assignment_score > ea.avg_exam_score\nORDER BY avg_assignment_score DESC, aa.student_user_id ASC;\n```\n\n## Explanation\n\n- The first subquery computes assignment averages.\n- The second computes exam averages.\n- The outer query joins and compares them.\n\n## Difference from the optimal approach\n\nCorrect, but named CTEs are easier to read.",
      },
      {
        approach_title: "Avg from unions",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH combined_scores AS (SELECT student_user_id, obtained_marks, 'assignment' AS score_type FROM assignment_submissions WHERE obtained_marks IS NOT NULL UNION ALL SELECT student_user_id, obtained_marks, 'exam' AS score_type FROM exam_results WHERE obtained_marks IS NOT NULL), scored AS (SELECT student_user_id, AVG(CASE WHEN score_type = 'assignment' THEN obtained_marks END) AS avg_assignment_score, AVG(CASE WHEN score_type = 'exam' THEN obtained_marks END) AS avg_exam_score FROM combined_scores GROUP BY student_user_id) SELECT student_user_id, ROUND(avg_assignment_score, 2) AS avg_assignment_score, ROUND(avg_exam_score, 2) AS avg_exam_score FROM scored WHERE avg_assignment_score > avg_exam_score ORDER BY avg_assignment_score DESC, student_user_id ASC;",
        explanation:
          "## Approach\n\nUnion assignment and exam scores into one stream, then compute both averages with conditional aggregation.\n\n## Query\n\n```sql\nWITH combined_scores AS (\n  SELECT student_user_id, obtained_marks, 'assignment' AS score_type\n  FROM assignment_submissions\n  WHERE obtained_marks IS NOT NULL\n\n  UNION ALL\n\n  SELECT student_user_id, obtained_marks, 'exam' AS score_type\n  FROM exam_results\n  WHERE obtained_marks IS NOT NULL\n),\nscored AS (\n  SELECT student_user_id,\n         AVG(CASE WHEN score_type = 'assignment' THEN obtained_marks END) AS avg_assignment_score,\n         AVG(CASE WHEN score_type = 'exam' THEN obtained_marks END) AS avg_exam_score\n  FROM combined_scores\n  GROUP BY student_user_id\n)\nSELECT student_user_id,\n       ROUND(avg_assignment_score, 2) AS avg_assignment_score,\n       ROUND(avg_exam_score, 2) AS avg_exam_score\nFROM scored\nWHERE avg_assignment_score > avg_exam_score\nORDER BY avg_assignment_score DESC, student_user_id ASC;\n```\n\n## Explanation\n\n- `UNION ALL` combines both score sources into one table-shaped stream.\n- Conditional averages separate assignment and exam metrics again.\n- The final query compares those two averages.\n\n## Difference from the optimal approach\n\nCreative and correct, but more complex than computing the two averages separately.",
      },
    ],
  },
  {
    code: "EDUCATION_091",
    approaches: [
      {
        approach_title: "Row number top 3",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH ranked_students AS ( SELECT user_id, program_id, cgpa, ROW_NUMBER() OVER (PARTITION BY program_id ORDER BY cgpa DESC, user_id ASC) AS rn FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL ) SELECT user_id, program_id, cgpa FROM ranked_students WHERE rn <= 3 ORDER BY program_id ASC, cgpa DESC, user_id ASC;",
        explanation:
          "## Approach\n\nRank students inside each program by CGPA, then keep the top 3 rows.\n\n## Query\n\n```sql\nWITH ranked_students AS (\n  SELECT user_id, program_id, cgpa,\n         ROW_NUMBER() OVER (\n           PARTITION BY program_id\n           ORDER BY cgpa DESC, user_id ASC\n         ) AS rn\n  FROM student_profiles\n  WHERE program_id IS NOT NULL\n    AND cgpa IS NOT NULL\n)\nSELECT user_id, program_id, cgpa\nFROM ranked_students\nWHERE rn <= 3\nORDER BY program_id ASC, cgpa DESC, user_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY program_id` restarts the ranking for each program.\n- `ORDER BY cgpa DESC` places the highest CGPA first.\n- `ROW_NUMBER()` guarantees exactly 3 rows per program when available.\n- The outer query keeps only ranks 1 to 3.\n\n## Why this is optimal\n\nIt matches the requirement exactly and gives a fixed top 3 per program.",
      },
      {
        approach_title: "Rank top 3",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_students AS ( SELECT user_id, program_id, cgpa, RANK() OVER (PARTITION BY program_id ORDER BY cgpa DESC, user_id ASC) AS rnk FROM student_profiles WHERE program_id IS NOT NULL AND cgpa IS NOT NULL ) SELECT user_id, program_id, cgpa FROM ranked_students WHERE rnk <= 3 ORDER BY program_id ASC, cgpa DESC, user_id ASC;",
        explanation:
          "## Approach\n\nUse `RANK()` instead of `ROW_NUMBER()` and keep rows ranked 3 or better.\n\n## Query\n\n```sql\nWITH ranked_students AS (\n  SELECT user_id, program_id, cgpa,\n         RANK() OVER (\n           PARTITION BY program_id\n           ORDER BY cgpa DESC, user_id ASC\n         ) AS rnk\n  FROM student_profiles\n  WHERE program_id IS NOT NULL\n    AND cgpa IS NOT NULL\n)\nSELECT user_id, program_id, cgpa\nFROM ranked_students\nWHERE rnk <= 3\nORDER BY program_id ASC, cgpa DESC, user_id ASC;\n```\n\n## Explanation\n\n- `RANK()` also ranks students inside each program.\n- Ties can cause gaps in ranks.\n- Because of that, some programs may return more than 3 rows.\n\n## Difference from the optimal approach\n\nUseful when ties should be preserved, but it does not guarantee exactly 3 rows.",
      },
      {
        approach_title: "Correlated top 3",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT sp1.user_id, sp1.program_id, sp1.cgpa FROM student_profiles sp1 WHERE sp1.program_id IS NOT NULL AND sp1.cgpa IS NOT NULL AND (SELECT COUNT(*) FROM student_profiles sp2 WHERE sp2.program_id = sp1.program_id AND sp2.cgpa IS NOT NULL AND (sp2.cgpa > sp1.cgpa OR (sp2.cgpa = sp1.cgpa AND sp2.user_id < sp1.user_id))) < 3 ORDER BY sp1.program_id ASC, sp1.cgpa DESC, sp1.user_id ASC;",
        explanation:
          "## Approach\n\nFor each student, count how many students in the same program rank ahead of them.\n\n## Query\n\n```sql\nSELECT sp1.user_id, sp1.program_id, sp1.cgpa\nFROM student_profiles sp1\nWHERE sp1.program_id IS NOT NULL\n  AND sp1.cgpa IS NOT NULL\n  AND (\n    SELECT COUNT(*)\n    FROM student_profiles sp2\n    WHERE sp2.program_id = sp1.program_id\n      AND sp2.cgpa IS NOT NULL\n      AND (\n        sp2.cgpa > sp1.cgpa\n        OR (sp2.cgpa = sp1.cgpa AND sp2.user_id < sp1.user_id)\n      )\n  ) < 3\nORDER BY sp1.program_id ASC, sp1.cgpa DESC, sp1.user_id ASC;\n```\n\n## Explanation\n\n- The subquery counts how many students are ahead of the current student in the same program.\n- If fewer than 3 students are ahead, the current student is in the top 3.\n- The tie-breaker uses `user_id`.\n\n## Difference from the optimal approach\n\nCorrect, but much harder to read and less efficient than a window function.",
      },
    ],
  },
  {
    code: "EDUCATION_092",
    approaches: [
      {
        approach_title: "Month sum",
        approach_type: "date_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE_TRUNC('month', paid_at) AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ORDER BY collection_month ASC;",
        explanation:
          "## Approach\n\nGroup successful payments by month and sum the collected amount.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', paid_at) AS collection_month,\n       ROUND(SUM(paid_amount), 2) AS total_collection\nFROM payments\nWHERE payment_status = 'successful'\n  AND paid_at IS NOT NULL\nGROUP BY DATE_TRUNC('month', paid_at)\nORDER BY collection_month ASC;\n```\n\n## Explanation\n\n- `payment_status = 'successful'` keeps only completed payments.\n- `paid_at IS NOT NULL` ensures every row belongs to a valid month.\n- `DATE_TRUNC('month', paid_at)` converts each payment timestamp into a month bucket.\n- `SUM(paid_amount)` calculates total collection per month.\n\n## Why this is optimal\n\n`DATE_TRUNC('month', ...)` is the clearest PostgreSQL way to build monthly aggregates.",
      },
      {
        approach_title: "CTE monthly",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_collection AS (SELECT DATE_TRUNC('month', paid_at) AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at)) SELECT collection_month, total_collection FROM monthly_collection ORDER BY collection_month ASC;",
        explanation:
          "## Approach\n\nCalculate monthly payment totals in a CTE, then return them in month order.\n\n## Query\n\n```sql\nWITH monthly_collection AS (\n  SELECT DATE_TRUNC('month', paid_at) AS collection_month,\n         ROUND(SUM(paid_amount), 2) AS total_collection\n  FROM payments\n  WHERE payment_status = 'successful'\n    AND paid_at IS NOT NULL\n  GROUP BY DATE_TRUNC('month', paid_at)\n)\nSELECT collection_month, total_collection\nFROM monthly_collection\nORDER BY collection_month ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per payment month.\n- The outer query selects the monthly totals.\n- Ordering by `collection_month` shows the trend chronologically.\n\n## Difference from the optimal approach\n\nIt returns the same result, but adds a named CTE step for readability.",
      },
      {
        approach_title: "Extract then make date",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT MAKE_DATE(EXTRACT(YEAR FROM paid_at)::int, EXTRACT(MONTH FROM paid_at)::int, 1)::timestamp AS collection_month, ROUND(SUM(paid_amount), 2) AS total_collection FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY EXTRACT(YEAR FROM paid_at), EXTRACT(MONTH FROM paid_at) ORDER BY collection_month ASC;",
        explanation:
          "## Approach\n\nExtract year and month from each payment date, then rebuild the first day of that month.\n\n## Query\n\n```sql\nSELECT MAKE_DATE(\n         EXTRACT(YEAR FROM paid_at)::int,\n         EXTRACT(MONTH FROM paid_at)::int,\n         1\n       )::timestamp AS collection_month,\n       ROUND(SUM(paid_amount), 2) AS total_collection\nFROM payments\nWHERE payment_status = 'successful'\n  AND paid_at IS NOT NULL\nGROUP BY EXTRACT(YEAR FROM paid_at), EXTRACT(MONTH FROM paid_at)\nORDER BY collection_month ASC;\n```\n\n## Explanation\n\n- `EXTRACT(YEAR FROM paid_at)` gets the payment year.\n- `EXTRACT(MONTH FROM paid_at)` gets the payment month.\n- `MAKE_DATE(..., ..., 1)` creates a month-start date.\n- Casting to timestamp keeps the output shape aligned with `DATE_TRUNC`.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose than using `DATE_TRUNC('month', paid_at)`.",
      },
    ],
  },
  {
    code: "EDUCATION_093",
    approaches: [
      {
        approach_title: "Filter pass rate",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.offering_id, ROUND(100.0 * COUNT(*) FILTER (WHERE e.final_grade_letter IS NOT NULL AND e.final_grade_letter <> 'F') / COUNT(*), 2) AS pass_rate FROM enrollments e WHERE e.enrollment_status = 'completed' GROUP BY e.offering_id HAVING COUNT(*) > 0 ORDER BY pass_rate DESC, e.offering_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nUse conditional counting to calculate pass percentage per completed offering.\n\n## Query\n\n```sql\nSELECT e.offering_id,\n       ROUND(\n         100.0 * COUNT(*) FILTER (\n           WHERE e.final_grade_letter IS NOT NULL\n             AND e.final_grade_letter <> 'F'\n         ) / COUNT(*),\n         2\n       ) AS pass_rate\nFROM enrollments e\nWHERE e.enrollment_status = 'completed'\nGROUP BY e.offering_id\nHAVING COUNT(*) > 0\nORDER BY pass_rate DESC, e.offering_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Only completed enrollments are considered.\n- The filtered count measures passes.\n- `COUNT(*)` is the total number of completed enrollments for the offering.\n- Dividing pass count by total count gives the pass percentage.\n- `LIMIT 5` keeps the top 5 offerings.\n\n## Why this is optimal\n\nIt computes the percentage directly in one grouped query.",
      },
      {
        approach_title: "Case pass rate",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT e.offering_id, ROUND(100.0 * SUM(CASE WHEN e.final_grade_letter IS NOT NULL AND e.final_grade_letter <> 'F' THEN 1 ELSE 0 END) / COUNT(*), 2) AS pass_rate FROM enrollments e WHERE e.enrollment_status = 'completed' GROUP BY e.offering_id HAVING COUNT(*) > 0 ORDER BY pass_rate DESC, e.offering_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nUse a conditional sum instead of `FILTER` to count passes.\n\n## Query\n\n```sql\nSELECT e.offering_id,\n       ROUND(\n         100.0 * SUM(\n           CASE\n             WHEN e.final_grade_letter IS NOT NULL\n              AND e.final_grade_letter <> 'F' THEN 1\n             ELSE 0\n           END\n         ) / COUNT(*),\n         2\n       ) AS pass_rate\nFROM enrollments e\nWHERE e.enrollment_status = 'completed'\nGROUP BY e.offering_id\nHAVING COUNT(*) > 0\nORDER BY pass_rate DESC, e.offering_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The `CASE` expression converts pass rows into 1 and non-pass rows into 0.\n- Summing those values gives the number of passes.\n\n## Difference from the optimal approach\n\nAlso correct, but `FILTER` is shorter and clearer in PostgreSQL.",
      },
      {
        approach_title: "CTE pass totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH offering_results AS (SELECT offering_id, COUNT(*) AS total_students, COUNT(*) FILTER (WHERE final_grade_letter IS NOT NULL AND final_grade_letter <> 'F') AS passed_students FROM enrollments WHERE enrollment_status = 'completed' GROUP BY offering_id) SELECT offering_id, ROUND(100.0 * passed_students / total_students, 2) AS pass_rate FROM offering_results WHERE total_students > 0 ORDER BY pass_rate DESC, offering_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute total and passed counts first, then turn them into a percentage.\n\n## Query\n\n```sql\nWITH offering_results AS (\n  SELECT offering_id,\n         COUNT(*) AS total_students,\n         COUNT(*) FILTER (\n           WHERE final_grade_letter IS NOT NULL\n             AND final_grade_letter <> 'F'\n         ) AS passed_students\n  FROM enrollments\n  WHERE enrollment_status = 'completed'\n  GROUP BY offering_id\n)\nSELECT offering_id,\n       ROUND(100.0 * passed_students / total_students, 2) AS pass_rate\nFROM offering_results\nWHERE total_students > 0\nORDER BY pass_rate DESC, offering_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores total students and passed students per offering.\n- The outer query converts those counts into a percentage.\n\n## Difference from the optimal approach\n\nMore verbose, but it makes the numerator and denominator easy to inspect.",
      },
    ],
  },
  {
    code: "EDUCATION_094",
    approaches: [
      {
        approach_title: "Lag attendance",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH attendance_history AS ( SELECT student_user_id, offering_id, attendance_percentage, completion_date, LAG(attendance_percentage) OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS previous_attendance FROM enrollments WHERE attendance_percentage IS NOT NULL ) SELECT student_user_id, offering_id, attendance_percentage, previous_attendance FROM attendance_history WHERE previous_attendance IS NOT NULL AND attendance_percentage < previous_attendance ORDER BY student_user_id ASC, offering_id ASC;",
        explanation:
          "## Approach\n\nUse `LAG()` to compare each attendance value with the student's previous enrollment attendance.\n\n## Query\n\n```sql\nWITH attendance_history AS (\n  SELECT student_user_id, offering_id, attendance_percentage, completion_date,\n         LAG(attendance_percentage) OVER (\n           PARTITION BY student_user_id\n           ORDER BY completion_date ASC NULLS LAST, offering_id ASC\n         ) AS previous_attendance\n  FROM enrollments\n  WHERE attendance_percentage IS NOT NULL\n)\nSELECT student_user_id, offering_id, attendance_percentage, previous_attendance\nFROM attendance_history\nWHERE previous_attendance IS NOT NULL\n  AND attendance_percentage < previous_attendance\nORDER BY student_user_id ASC, offering_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY student_user_id` compares enrollments separately for each student.\n- `ORDER BY completion_date ASC NULLS LAST, offering_id ASC` defines the enrollment sequence.\n- `LAG(attendance_percentage)` brings the previous attendance value into the current row.\n- The outer query keeps only rows where attendance dropped.\n\n## Why this is optimal\n\n`LAG()` is the clearest way to compare a row with the previous row in a sequence.",
      },
      {
        approach_title: "CTE previous row",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ordered_enrollments AS (SELECT student_user_id, offering_id, attendance_percentage, completion_date, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS rn FROM enrollments WHERE attendance_percentage IS NOT NULL) SELECT e1.student_user_id, e1.offering_id, e1.attendance_percentage, e2.attendance_percentage AS previous_attendance FROM ordered_enrollments e1 JOIN ordered_enrollments e2 ON e1.student_user_id = e2.student_user_id AND e1.rn = e2.rn + 1 WHERE e1.attendance_percentage < e2.attendance_percentage ORDER BY e1.student_user_id ASC, e1.offering_id ASC;",
        explanation:
          "## Approach\n\nNumber each student's enrollments, then self join each row to its previous numbered row.\n\n## Query\n\n```sql\nWITH ordered_enrollments AS (\n  SELECT student_user_id, offering_id, attendance_percentage, completion_date,\n         ROW_NUMBER() OVER (\n           PARTITION BY student_user_id\n           ORDER BY completion_date ASC NULLS LAST, offering_id ASC\n         ) AS rn\n  FROM enrollments\n  WHERE attendance_percentage IS NOT NULL\n)\nSELECT e1.student_user_id, e1.offering_id, e1.attendance_percentage,\n       e2.attendance_percentage AS previous_attendance\nFROM ordered_enrollments e1\nJOIN ordered_enrollments e2\n  ON e1.student_user_id = e2.student_user_id\n AND e1.rn = e2.rn + 1\nWHERE e1.attendance_percentage < e2.attendance_percentage\nORDER BY e1.student_user_id ASC, e1.offering_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` assigns sequence numbers to each student's enrollments.\n- The self join pairs each enrollment with the immediately previous enrollment.\n- The `WHERE` clause keeps only rows where current attendance is lower than previous attendance.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose than using `LAG()` directly.",
      },
      {
        approach_title: "Subquery previous",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH ordered_enrollments AS (SELECT student_user_id, offering_id, attendance_percentage, completion_date, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY completion_date ASC NULLS LAST, offering_id ASC) AS rn FROM enrollments WHERE attendance_percentage IS NOT NULL) SELECT e1.student_user_id, e1.offering_id, e1.attendance_percentage, (SELECT e2.attendance_percentage FROM ordered_enrollments e2 WHERE e2.student_user_id = e1.student_user_id AND e2.rn = e1.rn - 1) AS previous_attendance FROM ordered_enrollments e1 WHERE (SELECT e2.attendance_percentage FROM ordered_enrollments e2 WHERE e2.student_user_id = e1.student_user_id AND e2.rn = e1.rn - 1) IS NOT NULL AND e1.attendance_percentage < (SELECT e2.attendance_percentage FROM ordered_enrollments e2 WHERE e2.student_user_id = e1.student_user_id AND e2.rn = e1.rn - 1) ORDER BY e1.student_user_id ASC, e1.offering_id ASC;",
        explanation:
          "## Approach\n\nUse row numbers and correlated subqueries to fetch the previous attendance value.\n\n## Query\n\n```sql\nWITH ordered_enrollments AS (\n  SELECT student_user_id, offering_id, attendance_percentage, completion_date,\n         ROW_NUMBER() OVER (\n           PARTITION BY student_user_id\n           ORDER BY completion_date ASC NULLS LAST, offering_id ASC\n         ) AS rn\n  FROM enrollments\n  WHERE attendance_percentage IS NOT NULL\n)\nSELECT e1.student_user_id, e1.offering_id, e1.attendance_percentage,\n       (\n         SELECT e2.attendance_percentage\n         FROM ordered_enrollments e2\n         WHERE e2.student_user_id = e1.student_user_id\n           AND e2.rn = e1.rn - 1\n       ) AS previous_attendance\nFROM ordered_enrollments e1\nWHERE (\n        SELECT e2.attendance_percentage\n        FROM ordered_enrollments e2\n        WHERE e2.student_user_id = e1.student_user_id\n          AND e2.rn = e1.rn - 1\n      ) IS NOT NULL\n  AND e1.attendance_percentage < (\n        SELECT e2.attendance_percentage\n        FROM ordered_enrollments e2\n        WHERE e2.student_user_id = e1.student_user_id\n          AND e2.rn = e1.rn - 1\n      )\nORDER BY e1.student_user_id ASC, e1.offering_id ASC;\n```\n\n## Explanation\n\n- The CTE gives each enrollment a row number within the student sequence.\n- The correlated subquery looks for the row with `rn = current rn - 1`.\n- The filter keeps only rows where the previous attendance exists and the current value is lower.\n\n## Difference from the optimal approach\n\nCorrect, but repeated subqueries make it harder to read than `LAG()`.",
      },
    ],
  },
  {
    code: "EDUCATION_095",
    approaches: [
      {
        approach_title: "Count offerings",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id ORDER BY total_offerings DESC, teacher_user_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nGroup by teacher and count distinct offerings handled.\n\n## Query\n\n```sql\nSELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings\nFROM course_teachers\nGROUP BY teacher_user_id\nORDER BY total_offerings DESC, teacher_user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY teacher_user_id` creates one row per teacher.\n- `COUNT(DISTINCT offering_id)` measures workload as unique offerings handled.\n- Sorting descending returns the busiest teachers first.\n- `LIMIT 5` keeps only the top 5.\n\n## Why this is optimal\n\nIt directly measures workload with the right level of distinctness.",
      },
      {
        approach_title: "CTE workloads",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH teacher_workload AS (SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id) SELECT teacher_user_id, total_offerings FROM teacher_workload ORDER BY total_offerings DESC, teacher_user_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCalculate teacher workloads in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH teacher_workload AS (\n  SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings\n  FROM course_teachers\n  GROUP BY teacher_user_id\n)\nSELECT teacher_user_id, total_offerings\nFROM teacher_workload\nORDER BY total_offerings DESC, teacher_user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one workload value per teacher.\n- The outer query sorts and limits the result.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
      {
        approach_title: "Dense rank top",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH teacher_workload AS (SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings FROM course_teachers GROUP BY teacher_user_id) SELECT teacher_user_id, total_offerings FROM (SELECT teacher_user_id, total_offerings, DENSE_RANK() OVER (ORDER BY total_offerings DESC, teacher_user_id ASC) AS workload_rank FROM teacher_workload) t WHERE workload_rank <= 5 ORDER BY total_offerings DESC, teacher_user_id ASC;",
        explanation:
          "## Approach\n\nCompute workload counts, rank them, then keep the top 5 ranks.\n\n## Query\n\n```sql\nWITH teacher_workload AS (\n  SELECT teacher_user_id, COUNT(DISTINCT offering_id) AS total_offerings\n  FROM course_teachers\n  GROUP BY teacher_user_id\n)\nSELECT teacher_user_id, total_offerings\nFROM (\n  SELECT teacher_user_id, total_offerings,\n         DENSE_RANK() OVER (ORDER BY total_offerings DESC, teacher_user_id ASC) AS workload_rank\n  FROM teacher_workload\n) t\nWHERE workload_rank <= 5\nORDER BY total_offerings DESC, teacher_user_id ASC;\n```\n\n## Explanation\n\n- The workload is computed first.\n- `DENSE_RANK()` ranks teachers by offering count.\n- The outer query keeps the top 5 ranks.\n\n## Difference from the optimal approach\n\nThis can return more than 5 rows, while the question asks for top 5 teachers.",
      },
    ],
  },
  {
    code: "EDUCATION_096",
    approaches: [
      {
        approach_title: "Lag failures",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH exam_failures AS ( SELECT student_user_id, exam_id, grade_letter, LAG(grade_letter) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_grade FROM exam_results ) SELECT DISTINCT student_user_id FROM exam_failures WHERE grade_letter = 'F' AND previous_grade = 'F' ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nUse `LAG()` to compare each exam grade to the previous exam grade for the same student.\n\n## Query\n\n```sql\nWITH exam_failures AS (\n  SELECT student_user_id, exam_id, grade_letter,\n         LAG(grade_letter) OVER (\n           PARTITION BY student_user_id\n           ORDER BY exam_id ASC\n         ) AS previous_grade\n  FROM exam_results\n)\nSELECT DISTINCT student_user_id\nFROM exam_failures\nWHERE grade_letter = 'F'\n  AND previous_grade = 'F'\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- `LAG(grade_letter)` brings the previous exam result for each student.\n- If both current and previous grades are `F`, that student has consecutive failures.\n- `DISTINCT` ensures each student appears only once.\n\n## Why this is optimal\n\nIt directly checks for back-to-back failures using the previous row.",
      },
      {
        approach_title: "Row number self join",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ordered_results AS (SELECT student_user_id, exam_id, grade_letter, ROW_NUMBER() OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS rn FROM exam_results) SELECT DISTINCT r1.student_user_id FROM ordered_results r1 JOIN ordered_results r2 ON r1.student_user_id = r2.student_user_id AND r1.rn = r2.rn + 1 WHERE r1.grade_letter = 'F' AND r2.grade_letter = 'F' ORDER BY r1.student_user_id ASC;",
        explanation:
          "## Approach\n\nNumber exam results per student and self join adjacent rows.\n\n## Query\n\n```sql\nWITH ordered_results AS (\n  SELECT student_user_id, exam_id, grade_letter,\n         ROW_NUMBER() OVER (\n           PARTITION BY student_user_id\n           ORDER BY exam_id ASC\n         ) AS rn\n  FROM exam_results\n)\nSELECT DISTINCT r1.student_user_id\nFROM ordered_results r1\nJOIN ordered_results r2\n  ON r1.student_user_id = r2.student_user_id\n AND r1.rn = r2.rn + 1\nWHERE r1.grade_letter = 'F'\n  AND r2.grade_letter = 'F'\nORDER BY r1.student_user_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` builds the sequence of exams per student.\n- The self join matches each row to its immediate predecessor.\n- Two `F` grades in adjacent rows indicate consecutive failures.\n\n## Difference from the optimal approach\n\nCorrect, but more complex than using `LAG()`.",
      },
      {
        approach_title: "Grouped fail pairs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH exam_failures AS (SELECT student_user_id, exam_id, grade_letter, LAG(grade_letter) OVER (PARTITION BY student_user_id ORDER BY exam_id ASC) AS previous_grade FROM exam_results) SELECT student_user_id FROM exam_failures GROUP BY student_user_id HAVING COUNT(*) FILTER (WHERE grade_letter = 'F' AND previous_grade = 'F') > 0 ORDER BY student_user_id ASC;",
        explanation:
          "## Approach\n\nBuild previous-grade comparisons first, then keep students with at least one fail-fail pair.\n\n## Query\n\n```sql\nWITH exam_failures AS (\n  SELECT student_user_id, exam_id, grade_letter,\n         LAG(grade_letter) OVER (\n           PARTITION BY student_user_id\n           ORDER BY exam_id ASC\n         ) AS previous_grade\n  FROM exam_results\n)\nSELECT student_user_id\nFROM exam_failures\nGROUP BY student_user_id\nHAVING COUNT(*) FILTER (\n  WHERE grade_letter = 'F' AND previous_grade = 'F'\n) > 0\nORDER BY student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE adds the previous grade for each exam row.\n- The grouped filter counts consecutive fail pairs per student.\n- Any count above 0 means the student qualifies.\n\n## Difference from the optimal approach\n\nAlso correct, but `DISTINCT` with a direct row filter is shorter.",
      },
    ],
  },
  {
    code: "EDUCATION_097",
    approaches: [
      {
        approach_title: "Revenue per student",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH program_revenue AS ( SELECT sp.program_id, SUM(p.paid_amount) AS total_revenue, COUNT(DISTINCT sp.user_id) AS total_students FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY sp.program_id ) SELECT program_id, ROUND(total_revenue / NULLIF(total_students, 0), 2) AS revenue_per_student FROM program_revenue ORDER BY revenue_per_student DESC, program_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCalculate successful revenue and distinct paying students per program, then divide revenue by student count.\n\n## Query\n\n```sql\nWITH program_revenue AS (\n  SELECT sp.program_id,\n         SUM(p.paid_amount) AS total_revenue,\n         COUNT(DISTINCT sp.user_id) AS total_students\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  WHERE p.payment_status = 'successful'\n  GROUP BY sp.program_id\n)\nSELECT program_id,\n       ROUND(total_revenue / NULLIF(total_students, 0), 2) AS revenue_per_student\nFROM program_revenue\nORDER BY revenue_per_student DESC, program_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `payment_status = 'successful'` keeps only collected payments.\n- `SUM(p.paid_amount)` calculates total collected revenue per program.\n- `COUNT(DISTINCT sp.user_id)` counts unique students contributing to that revenue.\n- `NULLIF(total_students, 0)` prevents division by zero.\n- `LIMIT 5` returns the top 5 programs by revenue per student.\n\n## Why this is optimal\n\nIt makes the numerator and denominator explicit before calculating the final metric.",
      },
      {
        approach_title: "Direct ratio",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT sp.program_id, ROUND(SUM(p.paid_amount) / NULLIF(COUNT(DISTINCT sp.user_id), 0), 2) AS revenue_per_student FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful' GROUP BY sp.program_id ORDER BY revenue_per_student DESC, sp.program_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCalculate revenue per student directly inside one grouped query.\n\n## Query\n\n```sql\nSELECT sp.program_id,\n       ROUND(SUM(p.paid_amount) / NULLIF(COUNT(DISTINCT sp.user_id), 0), 2) AS revenue_per_student\nFROM payments p\nJOIN fee_invoices fi ON p.invoice_id = fi.id\nJOIN student_profiles sp ON fi.student_user_id = sp.user_id\nWHERE p.payment_status = 'successful'\nGROUP BY sp.program_id\nORDER BY revenue_per_student DESC, sp.program_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The joins connect successful payments to student programs.\n- `SUM(p.paid_amount)` gives total revenue per program.\n- `COUNT(DISTINCT sp.user_id)` gives paying student count per program.\n- Dividing them gives revenue per student.\n\n## Difference from the optimal approach\n\nIt is shorter, but less explicit than separating the metric parts in a CTE.",
      },
      {
        approach_title: "Split totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH paid_students AS (SELECT sp.program_id, sp.user_id, p.paid_amount FROM payments p JOIN fee_invoices fi ON p.invoice_id = fi.id JOIN student_profiles sp ON fi.student_user_id = sp.user_id WHERE p.payment_status = 'successful'), program_totals AS (SELECT program_id, SUM(paid_amount) AS total_revenue FROM paid_students GROUP BY program_id), program_students AS (SELECT program_id, COUNT(DISTINCT user_id) AS total_students FROM paid_students GROUP BY program_id) SELECT pt.program_id, ROUND(pt.total_revenue / NULLIF(ps.total_students, 0), 2) AS revenue_per_student FROM program_totals pt JOIN program_students ps ON pt.program_id = ps.program_id ORDER BY revenue_per_student DESC, pt.program_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCreate one paid-student dataset, then calculate revenue totals and student counts separately.\n\n## Query\n\n```sql\nWITH paid_students AS (\n  SELECT sp.program_id, sp.user_id, p.paid_amount\n  FROM payments p\n  JOIN fee_invoices fi ON p.invoice_id = fi.id\n  JOIN student_profiles sp ON fi.student_user_id = sp.user_id\n  WHERE p.payment_status = 'successful'\n),\nprogram_totals AS (\n  SELECT program_id, SUM(paid_amount) AS total_revenue\n  FROM paid_students\n  GROUP BY program_id\n),\nprogram_students AS (\n  SELECT program_id, COUNT(DISTINCT user_id) AS total_students\n  FROM paid_students\n  GROUP BY program_id\n)\nSELECT pt.program_id,\n       ROUND(pt.total_revenue / NULLIF(ps.total_students, 0), 2) AS revenue_per_student\nFROM program_totals pt\nJOIN program_students ps ON pt.program_id = ps.program_id\nORDER BY revenue_per_student DESC, pt.program_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `paid_students` keeps only successful payment rows with program and student ids.\n- `program_totals` calculates collected revenue per program.\n- `program_students` calculates distinct paying students per program.\n- The final query joins both metrics and calculates revenue per student.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose than calculating both values in one CTE.",
      },
    ],
  },
  {
    code: "EDUCATION_098",
    approaches: [
      {
        approach_title: "Sum view time",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id ORDER BY total_view_time DESC, user_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nGroup material views by user and sum their total viewing time.\n\n## Query\n\n```sql\nSELECT user_id, SUM(total_view_seconds) AS total_view_time\nFROM material_views\nGROUP BY user_id\nORDER BY total_view_time DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per student or user.\n- `SUM(total_view_seconds)` adds all view time across materials.\n- Sorting descending identifies the most engaged users.\n- `LIMIT 10` keeps the top 10.\n\n## Why this is optimal\n\nIt directly measures engagement using the stored time metric.",
      },
      {
        approach_title: "CTE engagement",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_engagement AS (SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id) SELECT user_id, total_view_time FROM user_engagement ORDER BY total_view_time DESC, user_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute total view time per user in a CTE, then rank it.\n\n## Query\n\n```sql\nWITH user_engagement AS (\n  SELECT user_id, SUM(total_view_seconds) AS total_view_time\n  FROM material_views\n  GROUP BY user_id\n)\nSELECT user_id, total_view_time\nFROM user_engagement\nORDER BY total_view_time DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one engagement total per user.\n- The outer query sorts and limits the result.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Rank view time",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_engagement AS (SELECT user_id, SUM(total_view_seconds) AS total_view_time FROM material_views GROUP BY user_id) SELECT user_id, total_view_time FROM (SELECT user_id, total_view_time, ROW_NUMBER() OVER (ORDER BY total_view_time DESC, user_id ASC) AS rn FROM user_engagement) t WHERE rn <= 10 ORDER BY total_view_time DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute view time totals first, then use row numbers to keep the top 10.\n\n## Query\n\n```sql\nWITH user_engagement AS (\n  SELECT user_id, SUM(total_view_seconds) AS total_view_time\n  FROM material_views\n  GROUP BY user_id\n)\nSELECT user_id, total_view_time\nFROM (\n  SELECT user_id, total_view_time,\n         ROW_NUMBER() OVER (ORDER BY total_view_time DESC, user_id ASC) AS rn\n  FROM user_engagement\n) t\nWHERE rn <= 10\nORDER BY total_view_time DESC, user_id ASC;\n```\n\n## Explanation\n\n- The first step computes total view time.\n- The second step ranks those totals.\n- The outer query keeps the first 10 ranks.\n\n## Difference from the optimal approach\n\nCorrect, but simple sorting with `LIMIT` is enough here.",
      },
    ],
  },
  {
    code: "EDUCATION_099",
    approaches: [
      {
        approach_title: "Top dept avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT tp.department_id, ROUND(AVG(sf.rating_value), 2) AS avg_feedback_score FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id ORDER BY avg_feedback_score DESC, tp.department_id ASC LIMIT 1;",
        explanation:
          "## Approach\n\nJoin teacher feedback to teacher departments, then return the department with the highest average rating.\n\n## Query\n\n```sql\nSELECT tp.department_id,\n       ROUND(AVG(sf.rating_value), 2) AS avg_feedback_score\nFROM student_feedback sf\nJOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\nWHERE tp.department_id IS NOT NULL\nGROUP BY tp.department_id\nORDER BY avg_feedback_score DESC, tp.department_id ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- `student_feedback` contains teacher rating values.\n- `teacher_profiles` maps teachers to departments.\n- `AVG(sf.rating_value)` calculates average feedback per department.\n- `ROUND(..., 2)` formats the score.\n- `LIMIT 1` returns the top department only.\n\n## Why this is optimal\n\nIt computes and ranks department feedback in one clear grouped query.",
      },
      {
        approach_title: "CTE dept scores",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH department_scores AS (SELECT tp.department_id, AVG(sf.rating_value) AS avg_feedback_score FROM student_feedback sf JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id WHERE tp.department_id IS NOT NULL GROUP BY tp.department_id) SELECT department_id, ROUND(avg_feedback_score, 2) AS avg_feedback_score FROM department_scores ORDER BY avg_feedback_score DESC, department_id ASC LIMIT 1;",
        explanation:
          "## Approach\n\nCalculate department feedback scores in a CTE, then select the top department.\n\n## Query\n\n```sql\nWITH department_scores AS (\n  SELECT tp.department_id, AVG(sf.rating_value) AS avg_feedback_score\n  FROM student_feedback sf\n  JOIN teacher_profiles tp ON sf.teacher_user_id = tp.user_id\n  WHERE tp.department_id IS NOT NULL\n  GROUP BY tp.department_id\n)\nSELECT department_id, ROUND(avg_feedback_score, 2) AS avg_feedback_score\nFROM department_scores\nORDER BY avg_feedback_score DESC, department_id ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- The CTE computes one average feedback score per department.\n- The outer query rounds the score and orders departments by score.\n- `LIMIT 1` keeps only the best department.\n\n## Difference from the optimal approach\n\nIt returns the same result, but uses an extra named step for readability.",
      },
    ],
  },
  {
    code: "EDUCATION_100",
    approaches: [
      {
        approach_title: "Variance compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH student_variance AS ( SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id ), program_avg_variance AS ( SELECT program_id, AVG(attendance_variance) AS avg_variance FROM student_variance GROUP BY program_id ) SELECT sv.student_user_id, sv.program_id, ROUND(sv.attendance_variance, 2) AS attendance_variance FROM student_variance sv JOIN program_avg_variance pav ON sv.program_id = pav.program_id WHERE sv.attendance_variance < pav.avg_variance ORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;",
        explanation:
          "## Approach\n\nCalculate attendance variance per student, then compare it with the average variance of their program.\n\n## Query\n\n```sql\nWITH student_variance AS (\n  SELECT sp.program_id, e.student_user_id,\n         VARIANCE(e.attendance_percentage) AS attendance_variance\n  FROM enrollments e\n  JOIN student_profiles sp ON e.student_user_id = sp.user_id\n  WHERE e.attendance_percentage IS NOT NULL\n  GROUP BY sp.program_id, e.student_user_id\n),\nprogram_avg_variance AS (\n  SELECT program_id, AVG(attendance_variance) AS avg_variance\n  FROM student_variance\n  GROUP BY program_id\n)\nSELECT sv.student_user_id, sv.program_id,\n       ROUND(sv.attendance_variance, 2) AS attendance_variance\nFROM student_variance sv\nJOIN program_avg_variance pav ON sv.program_id = pav.program_id\nWHERE sv.attendance_variance < pav.avg_variance\nORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;\n```\n\n## Explanation\n\n- `student_variance` calculates how much each student's attendance varies across enrollments.\n- `program_avg_variance` calculates the average variance within each program.\n- The final query keeps students whose variance is below their program average.\n- Ordering uses the rounded output value to match the displayed `attendance_variance` column.\n\n## Why this is optimal\n\nIt clearly separates student-level variance from program-level comparison.",
      },
      {
        approach_title: "Window avg variance",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH student_variance AS (SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id) SELECT student_user_id, program_id, ROUND(attendance_variance, 2) AS attendance_variance FROM (SELECT student_user_id, program_id, attendance_variance, AVG(attendance_variance) OVER (PARTITION BY program_id) AS avg_variance FROM student_variance WHERE program_id IS NOT NULL) t WHERE attendance_variance < avg_variance ORDER BY program_id ASC, ROUND(attendance_variance, 2) ASC, student_user_id ASC;",
        explanation:
          "## Approach\n\nCompute student attendance variance first, then attach the program average variance with a window function.\n\n## Query\n\n```sql\nWITH student_variance AS (\n  SELECT sp.program_id, e.student_user_id,\n         VARIANCE(e.attendance_percentage) AS attendance_variance\n  FROM enrollments e\n  JOIN student_profiles sp ON e.student_user_id = sp.user_id\n  WHERE e.attendance_percentage IS NOT NULL\n  GROUP BY sp.program_id, e.student_user_id\n)\nSELECT student_user_id, program_id, ROUND(attendance_variance, 2) AS attendance_variance\nFROM (\n  SELECT student_user_id, program_id, attendance_variance,\n         AVG(attendance_variance) OVER (PARTITION BY program_id) AS avg_variance\n  FROM student_variance\n  WHERE program_id IS NOT NULL\n) t\nWHERE attendance_variance < avg_variance\nORDER BY program_id ASC, ROUND(attendance_variance, 2) ASC, student_user_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one attendance variance per student and program.\n- `AVG(attendance_variance) OVER (PARTITION BY program_id)` gives each row its program average variance.\n- The outer filter keeps students below that program average.\n- `program_id IS NOT NULL` avoids comparing NULL-program students in a separate NULL bucket.\n\n## Difference from the optimal approach\n\nCorrect and compact, but slightly more advanced than the two-CTE comparison.",
      },
      {
        approach_title: "Nested compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT sv.student_user_id, sv.program_id, ROUND(sv.attendance_variance, 2) AS attendance_variance FROM (SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id) sv JOIN (SELECT program_id, AVG(attendance_variance) AS avg_variance FROM (SELECT sp.program_id, e.student_user_id, VARIANCE(e.attendance_percentage) AS attendance_variance FROM enrollments e JOIN student_profiles sp ON e.student_user_id = sp.user_id WHERE e.attendance_percentage IS NOT NULL GROUP BY sp.program_id, e.student_user_id) x GROUP BY program_id) pav ON sv.program_id = pav.program_id WHERE sv.attendance_variance < pav.avg_variance ORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;",
        explanation:
          "## Approach\n\nUse derived tables to calculate student variance and program average variance, then compare them.\n\n## Query\n\n```sql\nSELECT sv.student_user_id, sv.program_id,\n       ROUND(sv.attendance_variance, 2) AS attendance_variance\nFROM (\n  SELECT sp.program_id, e.student_user_id,\n         VARIANCE(e.attendance_percentage) AS attendance_variance\n  FROM enrollments e\n  JOIN student_profiles sp ON e.student_user_id = sp.user_id\n  WHERE e.attendance_percentage IS NOT NULL\n  GROUP BY sp.program_id, e.student_user_id\n) sv\nJOIN (\n  SELECT program_id, AVG(attendance_variance) AS avg_variance\n  FROM (\n    SELECT sp.program_id, e.student_user_id,\n           VARIANCE(e.attendance_percentage) AS attendance_variance\n    FROM enrollments e\n    JOIN student_profiles sp ON e.student_user_id = sp.user_id\n    WHERE e.attendance_percentage IS NOT NULL\n    GROUP BY sp.program_id, e.student_user_id\n  ) x\n  GROUP BY program_id\n) pav ON sv.program_id = pav.program_id\nWHERE sv.attendance_variance < pav.avg_variance\nORDER BY sv.program_id ASC, ROUND(sv.attendance_variance, 2) ASC, sv.student_user_id ASC;\n```\n\n## Explanation\n\n- The first derived table calculates variance per student.\n- The second derived table calculates the average variance per program.\n- The final query joins both and keeps students below the program average.\n\n## Difference from the optimal approach\n\nCorrect, but repeated derived tables make it harder to read than CTEs.",
      },
    ],
  },
];
