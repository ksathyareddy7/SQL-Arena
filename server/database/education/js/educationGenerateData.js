import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260413);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

const CONFIG = {
  institutions: 6,
  campuses: 12,
  academicTerms: 24,
  departments: 48,
  programs: 60,
  subjects: 120,
  courses: 320,
  coursePrerequisites: 200,

  usersTotal: 20_000,
  usersStudents: 15_000,
  usersTeachers: 2_500,
  usersOther: 2_500, // admin/guardian/staff

  guardianRelationships: 6_000,

  classrooms: 200,
  courseOfferings: 900,
  courseTeachers: 1_400,
  timetableSlots: 1_800,
  enrollments: 40_000,

  attendanceSessions: 6_000,
  attendanceRecords: 80_000,

  assignments: 5_000,
  assignmentSubmissions: 20_000,

  exams: 1_200,
  examResults: 20_000,

  learningMaterials: 4_000,
  materialViews: 20_000,

  discussionThreads: 3_000,
  discussionPosts: 12_000,

  studentFeedback: 8_000,

  feePlans: 60,
  scholarships: 30,
  studentFeeAssignments: 12_000,
  feeInvoices: 12_000,
  payments: 10_000,

  appEvents: 40_000,
  supportTickets: 1_000,
};

const DATE_RANGE = {
  start: new Date("2024-01-01T00:00:00.000Z"),
  end: new Date("2026-03-31T23:59:59.000Z"),
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

class CsvWriter {
  constructor(filePath, headers) {
    this.stream = fs.createWriteStream(filePath, { encoding: "utf8" });
    this.stream.write(headers.map(csvEscape).join(",") + "\n");
  }

  writeRow(values) {
    this.stream.write(values.map(csvEscape).join(",") + "\n");
  }

  close() {
    return new Promise((resolve, reject) => {
      this.stream.end(() => resolve());
      this.stream.on("error", reject);
    });
  }
}

function randInt(min, max) {
  return faker.number.int({ min, max });
}

function chance(p) {
  return faker.number.float({ min: 0, max: 1 }) < p;
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function pad(n, width) {
  return String(n).padStart(width, "0");
}

function iso(ts) {
  if (!ts) return "";
  return new Date(ts).toISOString().replace("T", " ").replace("Z", "");
}

function dateOnly(d) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

function randomDateTimeBetween(start, end) {
  const from = start ?? DATE_RANGE.start;
  const to = end ?? DATE_RANGE.end;
  return faker.date.between({ from, to });
}

function randomDateBetween(start, end) {
  return dateOnly(randomDateTimeBetween(start, end));
}

function money(min, max) {
  return faker.number.float({ min, max, fractionDigits: 2 });
}

function pickUniqueIds(maxId, count) {
  if (count <= 0) return [];
  const arr = Array.from({ length: maxId }, (_, i) => i + 1);
  faker.helpers.shuffle(arr);
  return arr.slice(0, Math.min(count, arr.length));
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

async function main() {
  rmDir(OUTPUT_DIR);
  ensureDir(OUTPUT_DIR);

  const institutionTypes = ["school", "college", "university", "coaching_center", "training_institute", "edtech"];
  const termTypes = ["year", "semester", "trimester", "quarter", "session", "batch"];
  const termStatuses = ["planned", "active", "completed", "cancelled"];

  const departmentTypes = ["academic", "administrative", "support"];
  const programLevels = [
    "primary",
    "secondary",
    "higher_secondary",
    "diploma",
    "undergraduate",
    "postgraduate",
    "doctorate",
    "certificate",
    "bootcamp",
  ];
  const deliveryModes = ["offline", "online", "hybrid"];
  const courseTypes = ["core", "elective", "lab", "project", "seminar", "workshop"];
  const prereqTypes = ["required", "recommended", "co_requisite"];

  const userRoles = ["student", "teacher", "admin", "guardian", "staff"];
  const genders = ["male", "female", "other", "prefer_not_to_say"];
  const loginProviders = ["password", "google", "microsoft", "github", "sso"];

  const enrollmentStatuses = ["requested", "enrolled", "waitlisted", "dropped", "completed", "failed", "withdrawn"];
  const enrolledVia = ["self", "admin", "bulk_import", "advisor"];

  const slotTypes = ["lecture", "lab", "tutorial", "exam", "office_hour"];
  const sessionTypes = ["lecture", "lab", "tutorial", "exam_review", "extra_class"];
  const attendanceStatuses = ["present", "absent", "late", "excused"];

  const assignmentTypes = ["homework", "project", "quiz", "lab", "presentation", "essay"];
  const submissionStatuses = ["not_submitted", "submitted", "late_submitted", "graded", "missing"];

  const examTypes = ["unit_test", "midterm", "final", "practical", "oral", "entrance", "mock"];
  const examResultStatuses = ["draft", "published", "withheld", "recheck_requested", "updated"];

  const materialTypes = ["pdf", "video", "slide", "link", "note", "dataset", "code"];
  const visibilityScopes = ["public", "institution", "enrolled_students", "teachers_only"];

  const threadTypes = ["general", "question", "announcement", "doubt", "resource"];
  const feedbackCategories = ["teaching", "content", "difficulty", "infrastructure", "support"];

  const feeCategories = ["tuition", "exam", "lab", "hostel", "transport", "admission", "misc"];
  const billingCycles = ["one_time", "monthly", "quarterly", "semester", "yearly"];
  const invoiceStatuses = ["draft", "open", "paid", "partial", "overdue", "void", "refunded"];
  const paymentMethods = ["cash", "card", "upi", "bank_transfer", "wallet", "cheque"];
  const paymentStatuses = ["pending", "successful", "failed", "refunded", "partial_refund"];

  const eventCategories = ["auth", "learning", "attendance", "assignment", "exam", "billing", "communication"];
  const ticketTypes = ["login", "enrollment", "attendance", "assignment", "exam", "payment", "certificate", "content", "other"];
  const ticketPriorities = ["low", "medium", "high", "critical"];
  const ticketStatuses = ["open", "in_progress", "resolved", "closed"];

  // =========================
  // 1) institutions
  // =========================
  const institutionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "institutions.csv"), [
    "institution_name",
    "institution_type",
    "board_or_university",
    "country",
    "state",
    "city",
    "timezone",
    "established_year",
    "website_url",
    "support_email",
    "support_phone",
    "is_active",
    "created_at",
  ]);

  const institutionCountry = ["India", "United States", "United Kingdom", "Canada", "Australia"];
  const institutionStates = ["Karnataka", "Maharashtra", "Delhi", "Telangana", "Tamil Nadu", "California", "Texas", "Ontario"];
  const institutionCities = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", "San Francisco", "Austin", "Toronto", "London"];
  const institutionTimezones = ["Asia/Kolkata", "America/Los_Angeles", "America/New_York", "Europe/London", "Australia/Sydney"];

  const institutionCreatedAt = new Array(CONFIG.institutions + 1);

  for (let i = 1; i <= CONFIG.institutions; i++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    institutionCreatedAt[i] = createdAt;
    const country = pick(institutionCountry);
    const city = pick(institutionCities);
    const state = pick(institutionStates);
    institutionsWriter.writeRow([
      `${faker.company.name()} ${pick(["Academy", "Institute", "University", "College", "School"])}`,
      pick(institutionTypes),
      chance(0.6) ? pick(["CBSE", "ICSE", "State Board", "UGC", "AICTE", "IB", "Cambridge"]) : null,
      country,
      state,
      city,
      chance(0.75) ? pick(institutionTimezones) : null,
      randInt(1850, 2020),
      chance(0.7) ? faker.internet.url() : null,
      chance(0.7) ? `support${i}@example.com` : null,
      chance(0.65) ? `+1${randInt(2000000000, 9999999999)}`.slice(0, 20) : null,
      chance(0.96),
      iso(createdAt),
    ]);
  }
  await institutionsWriter.close();

  // =========================
  // 2) campuses
  // =========================
  const campusesWriter = new CsvWriter(path.join(OUTPUT_DIR, "campuses.csv"), [
    "institution_id",
    "campus_name",
    "campus_code",
    "address_line1",
    "address_line2",
    "city",
    "state",
    "country",
    "postal_code",
    "capacity",
    "is_main_campus",
    "is_active",
    "created_at",
  ]);

  const campusInstitutionId = new Array(CONFIG.campuses + 1);
  const campusCreatedAt = new Array(CONFIG.campuses + 1);

  for (let campusId = 1; campusId <= CONFIG.campuses; campusId++) {
    const institutionId = ((campusId - 1) % CONFIG.institutions) + 1;
    campusInstitutionId[campusId] = institutionId;
    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    campusCreatedAt[campusId] = createdAt;
    campusesWriter.writeRow([
      institutionId,
      `Campus ${campusId}`,
      `CAMP_${pad(campusId, 4)}`,
      `${randInt(1, 300)} ${faker.location.streetAddress()}`,
      chance(0.35) ? faker.location.secondaryAddress() : null,
      pick(institutionCities),
      pick(institutionStates),
      pick(institutionCountry),
      String(randInt(100000, 999999)),
      randInt(300, 5000),
      campusId <= CONFIG.institutions, // first campuses are main-ish
      chance(0.98),
      iso(createdAt),
    ]);
  }
  await campusesWriter.close();

  // =========================
  // 3) academic_terms
  // =========================
  const academicTermsWriter = new CsvWriter(path.join(OUTPUT_DIR, "academic_terms.csv"), [
    "institution_id",
    "term_name",
    "academic_year",
    "term_type",
    "starts_on",
    "ends_on",
    "enrollment_open_at",
    "enrollment_close_at",
    "result_published_at",
    "status",
    "created_at",
  ]);

  const termInstitutionId = new Array(CONFIG.academicTerms + 1);
  const termStartsOn = new Array(CONFIG.academicTerms + 1);
  const termEndsOn = new Array(CONFIG.academicTerms + 1);

  for (let termId = 1; termId <= CONFIG.academicTerms; termId++) {
    const institutionId = ((termId - 1) % CONFIG.institutions) + 1;
    termInstitutionId[termId] = institutionId;

    const startsOn = faker.date.between({ from: "2024-01-01", to: "2026-01-01" });
    const lengthDays = pick([60, 75, 90, 120, 150, 180]);
    const endsOn = new Date(startsOn);
    endsOn.setUTCDate(endsOn.getUTCDate() + lengthDays);

    termStartsOn[termId] = startsOn;
    termEndsOn[termId] = endsOn;

    const enrollmentOpenAt =
      chance(0.7) && institutionCreatedAt[institutionId] < startsOn
        ? randomDateTimeBetween(institutionCreatedAt[institutionId], startsOn)
        : null;
    const enrollmentCloseAt = enrollmentOpenAt && chance(0.85) ? randomDateTimeBetween(enrollmentOpenAt, startsOn) : null;
    const resultPublishedAt = chance(0.7) ? randomDateTimeBetween(endsOn, DATE_RANGE.end) : null;

    academicTermsWriter.writeRow([
      institutionId,
      `Term ${termId}`,
      `${randInt(2023, 2026)}-${randInt(2024, 2027)}`,
      pick(termTypes),
      dateOnly(startsOn),
      dateOnly(endsOn),
      enrollmentOpenAt ? iso(enrollmentOpenAt) : null,
      enrollmentCloseAt ? iso(enrollmentCloseAt) : null,
      resultPublishedAt ? iso(resultPublishedAt) : null,
      pick(termStatuses),
      iso(randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end)),
    ]);
  }
  await academicTermsWriter.close();

  // =========================
  // 4) departments
  // =========================
  const departmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "departments.csv"), [
    "institution_id",
    "campus_id",
    "department_name",
    "department_code",
    "department_type",
    "head_user_id",
    "is_active",
    "created_at",
  ]);

  const departmentInstitutionId = new Array(CONFIG.departments + 1);
  const departmentsByInstitution = new Map();

  for (let deptId = 1; deptId <= CONFIG.departments; deptId++) {
    const institutionId = ((deptId - 1) % CONFIG.institutions) + 1;
    departmentInstitutionId[deptId] = institutionId;
    if (!departmentsByInstitution.has(institutionId)) departmentsByInstitution.set(institutionId, []);
    departmentsByInstitution.get(institutionId).push(deptId);

    const campusId = chance(0.7) ? randInt(1, CONFIG.campuses) : null;
    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    departmentsWriter.writeRow([
      institutionId,
      campusId && campusInstitutionId[campusId] === institutionId ? campusId : null,
      `${pick(["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Commerce", "History", "Economics", "Accounts", "Sports", "Arts", "Administration", "IT", "HR", "Library"])} Dept ${deptId}`,
      `DEPT_${pad(deptId, 4)}`,
      pick(departmentTypes),
      null, // avoid FK ordering issues; can be set later if needed
      chance(0.98),
      iso(createdAt),
    ]);
  }
  await departmentsWriter.close();

  // =========================
  // 5) programs
  // =========================
  const programsWriter = new CsvWriter(path.join(OUTPUT_DIR, "programs.csv"), [
    "institution_id",
    "department_id",
    "program_name",
    "program_code",
    "program_level",
    "duration_months",
    "total_credits",
    "delivery_mode",
    "is_active",
    "created_at",
  ]);

  const programInstitutionId = new Array(CONFIG.programs + 1);
  const programsByInstitution = new Map();

  for (let programId = 1; programId <= CONFIG.programs; programId++) {
    const institutionId = ((programId - 1) % CONFIG.institutions) + 1;
    programInstitutionId[programId] = institutionId;
    if (!programsByInstitution.has(institutionId)) programsByInstitution.set(institutionId, []);
    programsByInstitution.get(institutionId).push(programId);
    const deptPool = departmentsByInstitution.get(institutionId) ?? [];
    const deptId = deptPool.length ? pick(deptPool) : null;

    programsWriter.writeRow([
      institutionId,
      deptId,
      `${pick(["BSc", "BA", "BCom", "BTech", "MSc", "MBA", "MTech", "PhD", "Diploma", "Certificate"])} Program ${programId}`,
      `PROG_${pad(programId, 4)}`,
      pick(programLevels),
      pick([6, 12, 18, 24, 36, 48, 60]),
      chance(0.8) ? faker.number.float({ min: 10, max: 240, fractionDigits: 2 }) : null,
      pick(deliveryModes),
      chance(0.98),
      iso(randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end)),
    ]);
  }
  await programsWriter.close();

  // =========================
  // 6) subjects
  // =========================
  const subjectsWriter = new CsvWriter(path.join(OUTPUT_DIR, "subjects.csv"), [
    "institution_id",
    "department_id",
    "subject_name",
    "subject_code",
    "subject_area",
    "difficulty_level",
    "created_at",
  ]);

  const subjectInstitutionId = new Array(CONFIG.subjects + 1);
  const subjectsByInstitution = new Map();
  const difficultyLevels = ["beginner", "intermediate", "advanced"];

  for (let subjectId = 1; subjectId <= CONFIG.subjects; subjectId++) {
    const institutionId = ((subjectId - 1) % CONFIG.institutions) + 1;
    subjectInstitutionId[subjectId] = institutionId;
    if (!subjectsByInstitution.has(institutionId)) subjectsByInstitution.set(institutionId, []);
    subjectsByInstitution.get(institutionId).push(subjectId);
    const deptPool = departmentsByInstitution.get(institutionId) ?? [];
    const deptId = deptPool.length ? pick(deptPool) : null;
    subjectsWriter.writeRow([
      institutionId,
      deptId,
      `${pick(["Algebra", "Calculus", "Data Structures", "Operating Systems", "Organic Chemistry", "Microeconomics", "Accounting", "English Literature", "World History", "Statistics", "AI Fundamentals", "Public Speaking"])} ${subjectId}`,
      `SUB_${pad(subjectId, 4)}`,
      chance(0.7) ? pick(["STEM", "Arts", "Commerce", "Language", "Sports"]) : null,
      chance(0.85) ? pick(difficultyLevels) : null,
      iso(randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end)),
    ]);
  }
  await subjectsWriter.close();

  // =========================
  // 7) courses
  // =========================
  const coursesWriter = new CsvWriter(path.join(OUTPUT_DIR, "courses.csv"), [
    "institution_id",
    "department_id",
    "subject_id",
    "program_id",
    "course_title",
    "course_code",
    "course_type",
    "credit_value",
    "max_marks",
    "passing_marks",
    "language_of_instruction",
    "is_mandatory",
    "is_active",
    "created_at",
  ]);

  const courseInstitutionId = new Array(CONFIG.courses + 1);
  const coursesByInstitution = new Map();

  for (let courseId = 1; courseId <= CONFIG.courses; courseId++) {
    const institutionId = ((courseId - 1) % CONFIG.institutions) + 1;
    courseInstitutionId[courseId] = institutionId;
    if (!coursesByInstitution.has(institutionId)) coursesByInstitution.set(institutionId, []);
    coursesByInstitution.get(institutionId).push(courseId);

    const deptPool = departmentsByInstitution.get(institutionId) ?? [];
    const subjPool = subjectsByInstitution.get(institutionId) ?? [];
    const progPool = programsByInstitution.get(institutionId) ?? [];
    const deptId = deptPool.length ? pick(deptPool) : null;
    const subjectId = subjPool.length ? pick(subjPool) : null;
    const programId = progPool.length ? pick(progPool) : null;

    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    const maxMarks = chance(0.9) ? pick([50, 75, 100, 150]) : null;
    const passingMarks = maxMarks ? money(0, maxMarks) : null;

    coursesWriter.writeRow([
      institutionId,
      deptId,
      subjectId,
      programId,
      `${pick(["Intro to", "Advanced", "Foundations of", "Practical", "Applied", "Seminar:"])} ${faker.word.words({ count: { min: 1, max: 3 } })}`.replaceAll(
        /(^\w|\s\w)/g,
        (m) => m.toUpperCase(),
      ),
      `CRS_${institutionId}_${pad(courseId, 5)}`,
      pick(courseTypes),
      faker.number.float({ min: 0, max: 6, fractionDigits: 2 }),
      maxMarks,
      passingMarks,
      chance(0.7) ? pick(["English", "Hindi", "Spanish", "French"]) : null,
      chance(0.55),
      chance(0.98),
      iso(createdAt),
    ]);
  }
  await coursesWriter.close();

  // =========================
  // 8) course_prerequisites
  // =========================
  const coursePrerequisitesWriter = new CsvWriter(path.join(OUTPUT_DIR, "course_prerequisites.csv"), [
    "course_id",
    "prerequisite_course_id",
    "prerequisite_type",
    "minimum_grade_letter",
    "created_at",
  ]);

  const prereqPairs = new Set();
  let prereqRows = 0;
  while (prereqRows < CONFIG.coursePrerequisites) {
    const courseId = randInt(1, CONFIG.courses);
    const prereqId = randInt(1, CONFIG.courses);
    if (courseId === prereqId) continue;
    const key = `${courseId}:${prereqId}`;
    if (prereqPairs.has(key)) continue;
    prereqPairs.add(key);
    prereqRows++;
    coursePrerequisitesWriter.writeRow([
      courseId,
      prereqId,
      pick(prereqTypes),
      chance(0.5) ? pick(["A", "B", "C", "D"]) : null,
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }
  await coursePrerequisitesWriter.close();

  // =========================
  // 9) users
  // =========================
  const usersWriter = new CsvWriter(path.join(OUTPUT_DIR, "users.csv"), [
    "institution_id",
    "campus_id",
    "full_name",
    "email",
    "phone",
    "user_role",
    "gender",
    "date_of_birth",
    "country",
    "preferred_language",
    "joined_at",
    "login_provider",
    "is_active",
    "is_verified",
    "last_seen_at",
    "created_at",
  ]);

  const userInstitutionId = new Array(CONFIG.usersTotal + 1);
  const userCampusId = new Array(CONFIG.usersTotal + 1);
  const userRole = new Array(CONFIG.usersTotal + 1);
  const userCreatedAt = new Array(CONFIG.usersTotal + 1);

  const studentUserIds = [];
  const teacherUserIds = [];
  const guardianUserIds = [];
  const staffUserIds = [];
  const adminUserIds = [];

  const preferredLanguages = ["en", "hi", "es", "fr"];

  for (let userId = 1; userId <= CONFIG.usersTotal; userId++) {
    const institutionId = ((userId - 1) % CONFIG.institutions) + 1;
    userInstitutionId[userId] = institutionId;

    const campusIdPick = chance(0.85) ? randInt(1, CONFIG.campuses) : null;
    const campusId = campusIdPick && campusInstitutionId[campusIdPick] === institutionId ? campusIdPick : null;
    userCampusId[userId] = campusId;

    let role;
    if (userId <= CONFIG.usersStudents) role = "student";
    else if (userId <= CONFIG.usersStudents + CONFIG.usersTeachers) role = "teacher";
    else role = pick(["admin", "guardian", "staff"]);

    userRole[userId] = role;

    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    userCreatedAt[userId] = createdAt;

    const joinedAt = dateOnly(randomDateTimeBetween(institutionCreatedAt[institutionId], createdAt));
    const lastSeenAt = chance(0.7) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

    const email = `u${institutionId}_${pad(userId, 6)}@example.com`; // unique per institution by construction
    const isActive = chance(0.97);

    if (role === "student") studentUserIds.push(userId);
    if (role === "teacher") teacherUserIds.push(userId);
    if (role === "guardian") guardianUserIds.push(userId);
    if (role === "staff") staffUserIds.push(userId);
    if (role === "admin") adminUserIds.push(userId);

    usersWriter.writeRow([
      institutionId,
      campusId,
      faker.person.fullName(),
      email,
      chance(0.85) ? `+1${randInt(2000000000, 9999999999)}`.slice(0, 20) : null,
      role,
      chance(0.9) ? pick(genders) : null,
      chance(0.75)
        ? dateOnly(faker.date.birthdate({ min: role === "student" ? 10 : 20, max: role === "student" ? 25 : 70, mode: "age" }))
        : null,
      chance(0.8) ? pick(institutionCountry) : null,
      chance(0.85) ? pick(preferredLanguages) : null,
      joinedAt,
      chance(0.75) ? pick(loginProviders) : null,
      isActive,
      isActive && chance(0.65),
      lastSeenAt ? iso(lastSeenAt) : null,
      iso(createdAt),
    ]);
  }
  await usersWriter.close();

  // =========================
  // 10) student_profiles
  // =========================
  const studentProfilesWriter = new CsvWriter(path.join(OUTPUT_DIR, "student_profiles.csv"), [
    "user_id",
    "institution_id",
    "campus_id",
    "program_id",
    "admission_number",
    "admission_date",
    "current_year_no",
    "current_semester_no",
    "enrollment_status",
    "scholarship_status",
    "hostel_required",
    "transport_required",
    "cgpa",
    "attendance_percentage",
    "created_at",
  ]);

  const enrollmentStatusValues = ["applied", "admitted", "active", "graduated", "dropped", "suspended", "alumni"];
  const scholarshipStatusValues = ["none", "applied", "approved", "rejected"];
  const studentProfileProgramId = new Map(); // user_id -> program_id

  for (let i = 0; i < studentUserIds.length; i++) {
    const userId = studentUserIds[i];
    const institutionId = userInstitutionId[userId];
    const progPool = programsByInstitution.get(institutionId) ?? [];
    const programId = progPool.length && chance(0.85) ? pick(progPool) : null;
    studentProfileProgramId.set(userId, programId);
    const admissionDate = chance(0.8) ? randomDateBetween("2023-01-01", DATE_RANGE.end) : null;
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    studentProfilesWriter.writeRow([
      userId,
      institutionId,
      userCampusId[userId],
      programId,
      `ADM-${pad(userId, 8)}`,
      admissionDate,
      chance(0.75) ? randInt(1, 4) : null,
      chance(0.7) ? randInt(1, 8) : null,
      pick(enrollmentStatusValues),
      chance(0.8) ? pick(scholarshipStatusValues) : null,
      chance(0.15),
      chance(0.25),
      chance(0.75) ? faker.number.float({ min: 0, max: 10, fractionDigits: 2 }) : null,
      chance(0.8) ? faker.number.float({ min: 0, max: 100, fractionDigits: 2 }) : null,
      iso(createdAt),
    ]);
  }
  await studentProfilesWriter.close();

  // =========================
  // 11) guardian_relationships
  // =========================
  const guardianRelationshipsWriter = new CsvWriter(path.join(OUTPUT_DIR, "guardian_relationships.csv"), [
    "student_user_id",
    "guardian_user_id",
    "relationship_type",
    "is_primary",
    "emergency_contact",
    "created_at",
  ]);

  const relationshipTypes = ["father", "mother", "brother", "sister", "uncle", "aunt", "guardian", "other"];
  const guardianPairs = new Set();
  let guardianRows = 0;
  while (guardianRows < CONFIG.guardianRelationships) {
    const studentId = pick(studentUserIds);
    const guardianId = guardianUserIds.length ? pick(guardianUserIds) : pick(staffUserIds.length ? staffUserIds : adminUserIds);
    if (studentId === guardianId) continue;
    const key = `${studentId}:${guardianId}`;
    if (guardianPairs.has(key)) continue;
    guardianPairs.add(key);
    guardianRows++;
    guardianRelationshipsWriter.writeRow([
      studentId,
      guardianId,
      pick(relationshipTypes),
      chance(0.3),
      chance(0.25),
      iso(randomDateTimeBetween(userCreatedAt[studentId], DATE_RANGE.end)),
    ]);
  }
  await guardianRelationshipsWriter.close();

  // =========================
  // 12) teacher_profiles
  // =========================
  const teacherProfilesWriter = new CsvWriter(path.join(OUTPUT_DIR, "teacher_profiles.csv"), [
    "user_id",
    "institution_id",
    "campus_id",
    "department_id",
    "employee_code",
    "designation",
    "employment_type",
    "hire_date",
    "salary_monthly",
    "highest_qualification",
    "experience_years",
    "rating_score",
    "is_active",
    "created_at",
  ]);

  const employmentTypes = ["full_time", "part_time", "visiting", "contract"];
  const designationPool = ["Professor", "Assistant Professor", "Lecturer", "Instructor", "Tutor", "Teaching Assistant"];

  const teacherDepartmentId = new Map(); // teacher_user_id -> dept_id

  for (let i = 0; i < teacherUserIds.length; i++) {
    const userId = teacherUserIds[i];
    const institutionId = userInstitutionId[userId];
    const deptPool = departmentsByInstitution.get(institutionId) ?? [];
    const deptId = deptPool.length ? pick(deptPool) : null;
    teacherDepartmentId.set(userId, deptId);
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    teacherProfilesWriter.writeRow([
      userId,
      institutionId,
      userCampusId[userId],
      deptId,
      `EMP-${pad(userId, 8)}`,
      chance(0.85) ? pick(designationPool) : null,
      pick(employmentTypes),
      chance(0.8) ? randomDateBetween("2000-01-01", DATE_RANGE.end) : null,
      chance(0.7) ? money(1000, 15000) : null,
      chance(0.7) ? pick(["B.Ed", "M.Ed", "PhD", "MSc", "MBA", "BTech"]) : null,
      chance(0.8) ? faker.number.float({ min: 0, max: 40, fractionDigits: 2 }) : null,
      chance(0.75) ? faker.number.float({ min: 0, max: 5, fractionDigits: 2 }) : null,
      chance(0.97),
      iso(createdAt),
    ]);
  }
  await teacherProfilesWriter.close();

  // =========================
  // 13) classrooms
  // =========================
  const classroomsWriter = new CsvWriter(path.join(OUTPUT_DIR, "classrooms.csv"), [
    "campus_id",
    "room_name",
    "building_name",
    "floor_no",
    "room_type",
    "seating_capacity",
    "has_projector",
    "has_lab_equipment",
    "is_active",
    "created_at",
  ]);

  const classroomCampusId = new Array(CONFIG.classrooms + 1);
  const classroomCreatedAt = new Array(CONFIG.classrooms + 1);
  const roomTypes = ["classroom", "lab", "seminar_hall", "exam_hall", "studio"];

  for (let roomId = 1; roomId <= CONFIG.classrooms; roomId++) {
    const campusId = randInt(1, CONFIG.campuses);
    classroomCampusId[roomId] = campusId;
    const createdAt = randomDateTimeBetween(campusCreatedAt[campusId], DATE_RANGE.end);
    classroomCreatedAt[roomId] = createdAt;
    classroomsWriter.writeRow([
      campusId,
      `R-${pad(roomId, 4)}`,
      chance(0.8) ? `Block ${pick(["A", "B", "C", "D", "E"])}` : null,
      chance(0.7) ? randInt(0, 12) : null,
      pick(roomTypes),
      randInt(10, 220),
      chance(0.55),
      chance(0.3),
      chance(0.98),
      iso(createdAt),
    ]);
  }
  await classroomsWriter.close();

  // =========================
  // 14) course_offerings
  // =========================
  const courseOfferingsWriter = new CsvWriter(path.join(OUTPUT_DIR, "course_offerings.csv"), [
    "course_id",
    "term_id",
    "campus_id",
    "primary_teacher_id",
    "section_name",
    "delivery_mode",
    "seat_limit",
    "enrolled_count",
    "waitlist_count",
    "starts_on",
    "ends_on",
    "course_status",
    "created_at",
  ]);

  const offeringCourseId = new Array(CONFIG.courseOfferings + 1);
  const offeringTermId = new Array(CONFIG.courseOfferings + 1);
  const offeringCampusId = new Array(CONFIG.courseOfferings + 1);
  const offeringInstitutionId = new Array(CONFIG.courseOfferings + 1);
  const offeringCreatedAt = new Array(CONFIG.courseOfferings + 1);

  const offeringKeySet = new Set();
  const sectionLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // Important: we must write exactly `CONFIG.courseOfferings` rows so downstream FK references
  // (which assume 1..N offering IDs exist) remain valid.
  let offeringId = 1;
  while (offeringId <= CONFIG.courseOfferings) {
    const termId = randInt(1, CONFIG.academicTerms);
    const institutionId = termInstitutionId[termId];
    const coursePool = coursesByInstitution.get(institutionId) ?? [];
    const courseId = coursePool.length ? pick(coursePool) : randInt(1, CONFIG.courses);

    let sectionName = null;
    const shuffledSections = faker.helpers.shuffle(sectionLetters.slice());
    for (const candidate of shuffledSections) {
      const key = `${courseId}:${termId}:${candidate}`;
      if (offeringKeySet.has(key)) continue;
      offeringKeySet.add(key);
      sectionName = candidate;
      break;
    }
    if (!sectionName) continue; // try a different course/term

    const campusCandidates = [];
    for (let c = 1; c <= CONFIG.campuses; c++) {
      if (campusInstitutionId[c] === institutionId) campusCandidates.push(c);
    }
    const campusId = campusCandidates.length ? pick(campusCandidates) : null;
    const teacherCandidates = teacherUserIds.filter((t) => userInstitutionId[t] === institutionId);
    const primaryTeacherId = teacherCandidates.length ? pick(teacherCandidates) : null;

    const termStart = termStartsOn[termId];
    const termEnd = termEndsOn[termId];
    const startsOn = chance(0.85) ? randomDateBetween(termStart, termEnd) : null;
    const endsOn = startsOn && chance(0.85) ? randomDateBetween(new Date(`${startsOn}T00:00:00Z`), termEnd) : null;

    const seatLimit = chance(0.9) ? randInt(10, 140) : null;
    const enrolledCount = seatLimit ? randInt(0, seatLimit) : randInt(0, 80);
    const waitlistCount = randInt(0, 25);
    const status = pick(["scheduled", "active", "completed", "cancelled"]);
    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    offeringCreatedAt[offeringId] = createdAt;

    offeringCourseId[offeringId] = courseId;
    offeringTermId[offeringId] = termId;
    offeringCampusId[offeringId] = campusId;
    offeringInstitutionId[offeringId] = institutionId;

    courseOfferingsWriter.writeRow([
      courseId,
      termId,
      campusId,
      primaryTeacherId,
      sectionName,
      pick(deliveryModes),
      seatLimit,
      enrolledCount,
      waitlistCount,
      startsOn,
      endsOn,
      status,
      iso(createdAt),
    ]);
    offeringId++;
  }
  await courseOfferingsWriter.close();

  // =========================
  // 15) course_teachers
  // =========================
  const courseTeachersWriter = new CsvWriter(path.join(OUTPUT_DIR, "course_teachers.csv"), [
    "offering_id",
    "teacher_user_id",
    "teacher_role",
    "assigned_at",
  ]);

  const teacherRoles = ["instructor", "assistant", "co_instructor", "grader"];
  const offeringTeacherPairs = new Set();
  let courseTeachersRows = 0;
  while (courseTeachersRows < CONFIG.courseTeachers) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    const institutionId = offeringInstitutionId[offeringId] ?? randInt(1, CONFIG.institutions);
    const teacherCandidates = teacherUserIds.filter((t) => userInstitutionId[t] === institutionId);
    if (!teacherCandidates.length) continue;
    const teacherId = pick(teacherCandidates);
    const key = `${offeringId}:${teacherId}`;
    if (offeringTeacherPairs.has(key)) continue;
    offeringTeacherPairs.add(key);
    courseTeachersRows++;
    const assignedAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);
    courseTeachersWriter.writeRow([offeringId, teacherId, pick(teacherRoles), iso(assignedAt)]);
  }
  await courseTeachersWriter.close();

  // =========================
  // 16) timetable_slots
  // =========================
  const timetableSlotsWriter = new CsvWriter(path.join(OUTPUT_DIR, "timetable_slots.csv"), [
    "offering_id",
    "classroom_id",
    "weekday_no",
    "start_time",
    "end_time",
    "slot_type",
    "recurrence_pattern",
    "created_at",
  ]);

  const timetableSlotOfferingId = new Array(CONFIG.timetableSlots + 1);

  const slotWindows = [
    ["09:00:00", "10:00:00"],
    ["10:00:00", "11:00:00"],
    ["11:30:00", "12:30:00"],
    ["14:00:00", "15:30:00"],
    ["16:00:00", "17:00:00"],
  ];

  for (let slotId = 1; slotId <= CONFIG.timetableSlots; slotId++) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    timetableSlotOfferingId[slotId] = offeringId;
    const campusId = offeringCampusId[offeringId];
    const classroomId = chance(0.75)
      ? (() => {
          // pick a classroom on the same campus if possible
          const ids = [];
          for (let i = 1; i <= CONFIG.classrooms; i++) {
            if (classroomCampusId[i] === campusId) ids.push(i);
          }
          return ids.length ? pick(ids) : randInt(1, CONFIG.classrooms);
        })()
      : null;
    const [startTime, endTime] = pick(slotWindows);
    timetableSlotsWriter.writeRow([
      offeringId,
      classroomId,
      randInt(1, 7),
      startTime,
      endTime,
      pick(slotTypes),
      "weekly",
      iso(randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }
  await timetableSlotsWriter.close();

  // =========================
  // 17) enrollments
  // =========================
  const enrollmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "enrollments.csv"), [
    "offering_id",
    "student_user_id",
    "enrolled_at",
    "enrollment_status",
    "enrolled_via",
    "final_grade_letter",
    "final_score",
    "attendance_percentage",
    "credits_earned",
    "completion_date",
    "created_at",
  ]);

  const enrollPairs = new Set();
  const enrolledStudentsByOffering = new Map();

  let enrollmentRows = 0;
  while (enrollmentRows < CONFIG.enrollments) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    const institutionId = offeringInstitutionId[offeringId] ?? randInt(1, CONFIG.institutions);
    const studentsInInstitution = studentUserIds.filter((s) => userInstitutionId[s] === institutionId);
    if (!studentsInInstitution.length) continue;
    const studentId = pick(studentsInInstitution);
    const key = `${offeringId}:${studentId}`;
    if (enrollPairs.has(key)) continue;
    enrollPairs.add(key);
    enrollmentRows++;

    const createdAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(enrollmentStatuses);
    const enrolledAt = createdAt;
    const finalScore = ["completed", "failed"].includes(status) && chance(0.8) ? money(0, 100) : null;
    const creditsEarned = status === "completed" && chance(0.8) ? money(0, 6) : null;
    const completionDate = ["completed", "failed", "withdrawn"].includes(status) && chance(0.5) ? randomDateBetween(createdAt, DATE_RANGE.end) : null;

    if (!enrolledStudentsByOffering.has(offeringId)) enrolledStudentsByOffering.set(offeringId, []);
    enrolledStudentsByOffering.get(offeringId).push(studentId);

    enrollmentsWriter.writeRow([
      offeringId,
      studentId,
      iso(enrolledAt),
      status,
      chance(0.7) ? pick(enrolledVia) : null,
      finalScore !== null && chance(0.6) ? pick(["A", "B", "C", "D", "E"]) : null,
      finalScore,
      chance(0.7) ? faker.number.float({ min: 0, max: 100, fractionDigits: 2 }) : null,
      creditsEarned,
      completionDate,
      iso(createdAt),
    ]);
  }
  await enrollmentsWriter.close();

  // =========================
  // 18) attendance_sessions
  // =========================
  const attendanceSessionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "attendance_sessions.csv"), [
    "offering_id",
    "timetable_slot_id",
    "session_date",
    "session_topic",
    "session_type",
    "marked_by_teacher_id",
    "created_at",
  ]);

  const attendanceSessionOfferingId = new Array(CONFIG.attendanceSessions + 1);
  const attendanceSessionIdToOffering = new Map();

  const sessionUniq = new Set();

  let attendanceSessionId = 0;
  while (attendanceSessionId < CONFIG.attendanceSessions) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    const termId = offeringTermId[offeringId];
    if (!termId) continue;
    const termStart = termStartsOn[termId];
    const termEnd = termEndsOn[termId];
    const slotId = chance(0.8) ? randInt(1, CONFIG.timetableSlots) : null;

    const sessionDate = randomDateBetween(termStart, termEnd);
    const uniqKey = `${offeringId}:${sessionDate}:${slotId ?? "null"}`;
    if (sessionUniq.has(uniqKey)) continue;
    sessionUniq.add(uniqKey);

    attendanceSessionId++;
    attendanceSessionOfferingId[attendanceSessionId] = offeringId;
    attendanceSessionIdToOffering.set(attendanceSessionId, offeringId);

    const institutionId = offeringInstitutionId[offeringId] ?? randInt(1, CONFIG.institutions);
    const teacherCandidates = teacherUserIds.filter((t) => userInstitutionId[t] === institutionId);
    const markedBy = teacherCandidates.length && chance(0.75) ? pick(teacherCandidates) : null;
    const createdAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);

    attendanceSessionsWriter.writeRow([
      offeringId,
      slotId && timetableSlotOfferingId[slotId] === offeringId ? slotId : null,
      sessionDate,
      chance(0.6) ? faker.lorem.words({ min: 2, max: 6 }) : null,
      pick(sessionTypes),
      markedBy,
      iso(createdAt),
    ]);
  }
  await attendanceSessionsWriter.close();

  // =========================
  // 19) attendance_records
  // =========================
  const attendanceRecordsWriter = new CsvWriter(path.join(OUTPUT_DIR, "attendance_records.csv"), [
    "attendance_session_id",
    "student_user_id",
    "attendance_status",
    "marked_at",
    "remarks",
  ]);

  const attendancePairs = new Set();
  let attendanceRows = 0;
  while (attendanceRows < CONFIG.attendanceRecords) {
    const sessionId = randInt(1, CONFIG.attendanceSessions);
    const offeringId = attendanceSessionIdToOffering.get(sessionId);
    if (!offeringId) continue;
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    if (!enrolled.length) continue;
    const studentId = pick(enrolled);
    const key = `${sessionId}:${studentId}`;
    if (attendancePairs.has(key)) continue;
    attendancePairs.add(key);
    attendanceRows++;
    const markedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    attendanceRecordsWriter.writeRow([
      sessionId,
      studentId,
      pick(attendanceStatuses),
      iso(markedAt),
      chance(0.2) ? faker.lorem.sentence() : null,
    ]);
  }
  await attendanceRecordsWriter.close();

  // =========================
  // 20) assignments
  // =========================
  const assignmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "assignments.csv"), [
    "offering_id",
    "created_by_teacher_id",
    "assignment_title",
    "assignment_type",
    "total_marks",
    "weightage_percent",
    "assigned_at",
    "due_at",
    "allow_late_submission",
    "max_late_days",
    "created_at",
  ]);

  const assignmentOfferingId = new Array(CONFIG.assignments + 1);
  const assignmentAssignedAt = new Array(CONFIG.assignments + 1);

  for (let assignmentId = 1; assignmentId <= CONFIG.assignments; assignmentId++) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    assignmentOfferingId[assignmentId] = offeringId;
    const institutionId = offeringInstitutionId[offeringId] ?? randInt(1, CONFIG.institutions);
    const teacherCandidates = teacherUserIds.filter((t) => userInstitutionId[t] === institutionId);
    const teacherId = teacherCandidates.length ? pick(teacherCandidates) : null;

    const assignedAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);
    assignmentAssignedAt[assignmentId] = assignedAt;
    const dueAt = randomDateTimeBetween(assignedAt, DATE_RANGE.end);
    const allowLate = chance(0.35);
    assignmentsWriter.writeRow([
      offeringId,
      teacherId,
      `${pick(["Assignment", "Project", "Quiz", "Lab", "Essay"])} ${assignmentId}`,
      pick(assignmentTypes),
      money(0, 100),
      chance(0.7) ? faker.number.float({ min: 0, max: 100, fractionDigits: 2 }) : null,
      iso(assignedAt),
      iso(dueAt),
      allowLate,
      allowLate ? randInt(0, 7) : null,
      iso(randomDateTimeBetween(assignedAt, DATE_RANGE.end)),
    ]);
  }
  await assignmentsWriter.close();

  // =========================
  // 21) assignment_submissions
  // =========================
  const assignmentSubmissionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "assignment_submissions.csv"), [
    "assignment_id",
    "student_user_id",
    "submitted_at",
    "submission_status",
    "obtained_marks",
    "plagiarism_score",
    "grader_teacher_id",
    "feedback_text",
    "attempt_number",
    "created_at",
  ]);

  const submissionUniq = new Set();
  let submissionRows = 0;
  while (submissionRows < CONFIG.assignmentSubmissions) {
    const assignmentId = randInt(1, CONFIG.assignments);
    const offeringId = assignmentOfferingId[assignmentId];
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    if (!enrolled.length) continue;
    const studentId = pick(enrolled);
    const attemptNo = chance(0.15) ? 2 : 1;
    const key = `${assignmentId}:${studentId}:${attemptNo}`;
    if (submissionUniq.has(key)) continue;
    submissionUniq.add(key);
    submissionRows++;
    const status = pick(submissionStatuses);
    const createdAt = randomDateTimeBetween(assignmentAssignedAt[assignmentId], DATE_RANGE.end);
    const submittedAt = status !== "not_submitted" ? randomDateTimeBetween(assignmentAssignedAt[assignmentId], DATE_RANGE.end) : null;
    const obtainedMarks = ["graded"].includes(status) && chance(0.85) ? money(0, 100) : null;
    const plagiarism = submittedAt && chance(0.3) ? faker.number.float({ min: 0, max: 100, fractionDigits: 2 }) : null;
    const grader = chance(0.5) ? pick(teacherUserIds) : null;
    assignmentSubmissionsWriter.writeRow([
      assignmentId,
      studentId,
      submittedAt ? iso(submittedAt) : null,
      status,
      obtainedMarks,
      plagiarism,
      grader,
      chance(0.4) ? faker.lorem.sentence() : null,
      attemptNo,
      iso(createdAt),
    ]);
  }
  await assignmentSubmissionsWriter.close();

  // =========================
  // 22) exams
  // =========================
  const examsWriter = new CsvWriter(path.join(OUTPUT_DIR, "exams.csv"), [
    "institution_id",
    "term_id",
    "offering_id",
    "exam_name",
    "exam_type",
    "exam_date",
    "start_time",
    "end_time",
    "total_marks",
    "passing_marks",
    "classroom_id",
    "invigilator_teacher_id",
    "created_at",
  ]);

  const examOfferingId = new Array(CONFIG.exams + 1);
  const examCreatedAt = new Array(CONFIG.exams + 1);

  const examWindows = [
    ["09:00:00", "11:00:00"],
    ["10:00:00", "12:00:00"],
    ["14:00:00", "16:00:00"],
    ["15:00:00", "17:00:00"],
  ];

  for (let examId = 1; examId <= CONFIG.exams; examId++) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    examOfferingId[examId] = offeringId;
    const termId = offeringTermId[offeringId] ?? randInt(1, CONFIG.academicTerms);
    const institutionId = offeringInstitutionId[offeringId] ?? termInstitutionId[termId] ?? randInt(1, CONFIG.institutions);
    const termStart = termStartsOn[termId];
    const termEnd = termEndsOn[termId];
    const examDate = randomDateBetween(termStart, termEnd);
    const [startTime, endTime] = chance(0.85) ? pick(examWindows) : [null, null];
    const total = money(0, 100);
    const passing = chance(0.85) ? money(0, total) : null;
    const classroomId = chance(0.7) ? randInt(1, CONFIG.classrooms) : null;
    const invigilator = chance(0.6) ? pick(teacherUserIds) : null;
    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    examCreatedAt[examId] = createdAt;
    examsWriter.writeRow([
      institutionId,
      termId,
      offeringId,
      `${pick(["Unit Test", "Midterm", "Final", "Practical", "Mock"])} ${examId}`,
      pick(examTypes),
      examDate,
      startTime,
      endTime,
      total,
      passing,
      classroomId,
      invigilator,
      iso(createdAt),
    ]);
  }
  await examsWriter.close();

  // =========================
  // 23) exam_results
  // =========================
  const examResultsWriter = new CsvWriter(path.join(OUTPUT_DIR, "exam_results.csv"), [
    "exam_id",
    "student_user_id",
    "obtained_marks",
    "grade_letter",
    "rank_in_exam",
    "result_status",
    "evaluated_by_teacher_id",
    "published_at",
    "created_at",
  ]);

  const examStudentPairs = new Set();
  let examResultRows = 0;
  while (examResultRows < CONFIG.examResults) {
    const examId = randInt(1, CONFIG.exams);
    const offeringId = examOfferingId[examId];
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    if (!enrolled.length) continue;
    const studentId = pick(enrolled);
    const key = `${examId}:${studentId}`;
    if (examStudentPairs.has(key)) continue;
    examStudentPairs.add(key);
    examResultRows++;
    const status = pick(examResultStatuses);
    const createdAt = randomDateTimeBetween(examCreatedAt[examId], DATE_RANGE.end);
    const publishedAt = status === "published" && chance(0.85) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const score = chance(0.9) ? money(0, 100) : null;
    examResultsWriter.writeRow([
      examId,
      studentId,
      score,
      score !== null && chance(0.7) ? pick(["A", "B", "C", "D", "E"]) : null,
      chance(0.35) ? randInt(1, 200) : null,
      status,
      chance(0.6) ? pick(teacherUserIds) : null,
      publishedAt ? iso(publishedAt) : null,
      iso(createdAt),
    ]);
  }
  await examResultsWriter.close();

  // =========================
  // 24) learning_materials
  // =========================
  const learningMaterialsWriter = new CsvWriter(path.join(OUTPUT_DIR, "learning_materials.csv"), [
    "offering_id",
    "uploaded_by_user_id",
    "material_title",
    "material_type",
    "file_url",
    "file_size_mb",
    "visibility_scope",
    "uploaded_at",
    "created_at",
  ]);

  const materialOfferingId = new Array(CONFIG.learningMaterials + 1);
  const materialCreatedAt = new Array(CONFIG.learningMaterials + 1);

  for (let materialId = 1; materialId <= CONFIG.learningMaterials; materialId++) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    materialOfferingId[materialId] = offeringId;
    const institutionId = offeringInstitutionId[offeringId] ?? randInt(1, CONFIG.institutions);
    const teacherCandidates = teacherUserIds.filter((t) => userInstitutionId[t] === institutionId);
    const uploader = teacherCandidates.length && chance(0.9) ? pick(teacherCandidates) : null;
    const createdAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);
    materialCreatedAt[materialId] = createdAt;
    learningMaterialsWriter.writeRow([
      offeringId,
      uploader,
      `${pick(["Lecture Notes", "Slides", "Reading", "Dataset", "Code Sample", "Video"])} ${materialId}`,
      pick(materialTypes),
      chance(0.85) ? faker.internet.url() : null,
      chance(0.7) ? faker.number.float({ min: 0, max: 2500, fractionDigits: 2 }) : null,
      pick(visibilityScopes),
      iso(createdAt),
      iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)),
    ]);
  }
  await learningMaterialsWriter.close();

  // =========================
  // 25) material_views
  // =========================
  const materialViewsWriter = new CsvWriter(path.join(OUTPUT_DIR, "material_views.csv"), [
    "material_id",
    "user_id",
    "first_viewed_at",
    "last_viewed_at",
    "total_view_seconds",
    "progress_percent",
    "completed",
  ]);

  const materialViewPairs = new Set();
  let viewRows = 0;
  while (viewRows < CONFIG.materialViews) {
    const materialId = randInt(1, CONFIG.learningMaterials);
    const offeringId = materialOfferingId[materialId];
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    const userId = enrolled.length ? pick(enrolled) : pick(studentUserIds);
    const key = `${materialId}:${userId}`;
    if (materialViewPairs.has(key)) continue;
    materialViewPairs.add(key);
    viewRows++;
    const firstViewedAt = randomDateTimeBetween(materialCreatedAt[materialId], DATE_RANGE.end);
    const lastViewedAt = randomDateTimeBetween(firstViewedAt, DATE_RANGE.end);
    const progress = faker.number.float({ min: 0, max: 100, fractionDigits: 2 });
    materialViewsWriter.writeRow([
      materialId,
      userId,
      iso(firstViewedAt),
      iso(lastViewedAt),
      randInt(0, 3600 * 8),
      progress,
      progress >= 95 && chance(0.75),
    ]);
  }
  await materialViewsWriter.close();

  // =========================
  // 26) discussion_threads
  // =========================
  const discussionThreadsWriter = new CsvWriter(path.join(OUTPUT_DIR, "discussion_threads.csv"), [
    "offering_id",
    "created_by_user_id",
    "thread_title",
    "thread_type",
    "is_pinned",
    "is_locked",
    "created_at",
  ]);

  const threadOfferingId = new Array(CONFIG.discussionThreads + 1);
  const threadCreatedAt = new Array(CONFIG.discussionThreads + 1);

  for (let threadId = 1; threadId <= CONFIG.discussionThreads; threadId++) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    threadOfferingId[threadId] = offeringId;
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    const authorId = enrolled.length ? pick(enrolled) : pick(studentUserIds);
    const createdAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);
    threadCreatedAt[threadId] = createdAt;
    discussionThreadsWriter.writeRow([
      offeringId,
      authorId,
      faker.lorem.sentence({ min: 3, max: 10 }),
      pick(threadTypes),
      chance(0.06),
      chance(0.04),
      iso(createdAt),
    ]);
  }
  await discussionThreadsWriter.close();

  // =========================
  // 27) discussion_posts
  // =========================
  const discussionPostsWriter = new CsvWriter(path.join(OUTPUT_DIR, "discussion_posts.csv"), [
    "thread_id",
    "user_id",
    "parent_post_id",
    "post_body",
    "is_answer",
    "upvote_count",
    "created_at",
  ]);

  const postThreadId = new Array(CONFIG.discussionPosts + 1);
  const postCreatedAt = new Array(CONFIG.discussionPosts + 1);

  for (let postId = 1; postId <= CONFIG.discussionPosts; postId++) {
    const threadId = randInt(1, CONFIG.discussionThreads);
    const offeringId = threadOfferingId[threadId];
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    const authorId = enrolled.length ? pick(enrolled) : pick(studentUserIds);
    const parentPostId = postId > 5 && chance(0.25) ? randInt(1, postId - 1) : null;
    const createdAt = randomDateTimeBetween(threadCreatedAt[threadId], DATE_RANGE.end);
    postThreadId[postId] = threadId;
    postCreatedAt[postId] = createdAt;
    discussionPostsWriter.writeRow([
      threadId,
      authorId,
      parentPostId && postThreadId[parentPostId] === threadId ? parentPostId : null,
      faker.lorem.paragraph({ min: 1, max: 2 }),
      chance(0.08),
      randInt(0, 200),
      iso(createdAt),
    ]);
  }
  await discussionPostsWriter.close();

  // =========================
  // 28) student_feedback
  // =========================
  const studentFeedbackWriter = new CsvWriter(path.join(OUTPUT_DIR, "student_feedback.csv"), [
    "offering_id",
    "student_user_id",
    "teacher_user_id",
    "feedback_category",
    "rating_value",
    "feedback_text",
    "is_anonymous",
    "submitted_at",
  ]);

  const feedbackUniq = new Set();
  let feedbackRows = 0;
  while (feedbackRows < CONFIG.studentFeedback) {
    const offeringId = randInt(1, CONFIG.courseOfferings);
    const enrolled = enrolledStudentsByOffering.get(offeringId) ?? [];
    if (!enrolled.length) continue;
    const studentId = pick(enrolled);
    const category = pick(feedbackCategories);
    const key = `${offeringId}:${studentId}:${category}`;
    if (feedbackUniq.has(key)) continue;
    feedbackUniq.add(key);
    feedbackRows++;
    const institutionId = offeringInstitutionId[offeringId] ?? randInt(1, CONFIG.institutions);
    const teacherCandidates = teacherUserIds.filter((t) => userInstitutionId[t] === institutionId);
    const teacherId = teacherCandidates.length && chance(0.75) ? pick(teacherCandidates) : null;
    const submittedAt = randomDateTimeBetween(offeringCreatedAt[offeringId] ?? DATE_RANGE.start, DATE_RANGE.end);
    studentFeedbackWriter.writeRow([
      offeringId,
      studentId,
      teacherId,
      category,
      randInt(1, 5),
      chance(0.7) ? faker.lorem.sentence() : null,
      chance(0.2),
      iso(submittedAt),
    ]);
  }
  await studentFeedbackWriter.close();

  // =========================
  // 29) fee_plans
  // =========================
  const feePlansWriter = new CsvWriter(path.join(OUTPUT_DIR, "fee_plans.csv"), [
    "institution_id",
    "program_id",
    "plan_name",
    "fee_category",
    "amount",
    "billing_cycle",
    "currency",
    "is_refundable",
    "is_active",
    "created_at",
  ]);

  const feePlanInstitutionId = new Array(CONFIG.feePlans + 1);
  const feePlanProgramId = new Array(CONFIG.feePlans + 1);

  for (let feePlanId = 1; feePlanId <= CONFIG.feePlans; feePlanId++) {
    const institutionId = ((feePlanId - 1) % CONFIG.institutions) + 1;
    feePlanInstitutionId[feePlanId] = institutionId;
    const progPool = programsByInstitution.get(institutionId) ?? [];
    const programId = progPool.length && chance(0.6) ? pick(progPool) : null;
    feePlanProgramId[feePlanId] = programId;
    const category = pick(feeCategories);
    feePlansWriter.writeRow([
      institutionId,
      programId,
      `${category.toUpperCase()} Plan ${feePlanId}`,
      category,
      money(0, 50_000),
      pick(billingCycles),
      pick(["USD", "INR", "GBP", "CAD", "AUD"]),
      chance(0.2),
      chance(0.95),
      iso(randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end)),
    ]);
  }
  await feePlansWriter.close();

  // =========================
  // 30) scholarships
  // =========================
  const scholarshipsWriter = new CsvWriter(path.join(OUTPUT_DIR, "scholarships.csv"), [
    "institution_id",
    "scholarship_name",
    "scholarship_type",
    "amount_type",
    "amount_value",
    "max_awards",
    "starts_on",
    "ends_on",
    "is_active",
    "created_at",
  ]);

  const scholarshipTypes = ["merit", "need_based", "sports", "minority", "staff_child", "other"];
  const amountTypes = ["fixed", "percent"];

  const scholarshipInstitutionId = new Array(CONFIG.scholarships + 1);

  for (let scholarshipId = 1; scholarshipId <= CONFIG.scholarships; scholarshipId++) {
    const institutionId = ((scholarshipId - 1) % CONFIG.institutions) + 1;
    scholarshipInstitutionId[scholarshipId] = institutionId;
    const startsOn = chance(0.75) ? randomDateBetween("2023-01-01", "2026-01-01") : null;
    const endsOn =
      startsOn && chance(0.6)
        ? (() => {
            const s = new Date(`${startsOn}T00:00:00Z`);
            s.setUTCMonth(s.getUTCMonth() + randInt(3, 18));
            return dateOnly(s);
          })()
        : null;
    scholarshipsWriter.writeRow([
      institutionId,
      `Scholarship ${scholarshipId}`,
      pick(scholarshipTypes),
      pick(amountTypes),
      money(0, 10_000),
      chance(0.5) ? randInt(0, 500) : null,
      startsOn,
      endsOn,
      chance(0.9),
      iso(randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end)),
    ]);
  }
  await scholarshipsWriter.close();

  // =========================
  // 31) student_fee_assignments
  // =========================
  const studentFeeAssignmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "student_fee_assignments.csv"), [
    "student_user_id",
    "fee_plan_id",
    "assigned_at",
    "effective_from",
    "effective_to",
    "assigned_amount",
    "discount_amount",
    "scholarship_id",
    "created_at",
  ]);

  const feeAssignmentStudentId = new Array(CONFIG.studentFeeAssignments + 1);
  const feeAssignmentFeePlanId = new Array(CONFIG.studentFeeAssignments + 1);

  const feeAssignmentUniq = new Set();
  let feeAssignmentId = 0;
  while (feeAssignmentId < CONFIG.studentFeeAssignments) {
    const feePlanId = randInt(1, CONFIG.feePlans);
    const institutionId = feePlanInstitutionId[feePlanId];
    const studentsInInstitution = studentUserIds.filter((s) => userInstitutionId[s] === institutionId);
    if (!studentsInInstitution.length) continue;
    const studentId = pick(studentsInInstitution);
    const effectiveFrom = randomDateBetween("2024-01-01", "2026-01-01");
    const key = `${studentId}:${feePlanId}:${effectiveFrom}`;
    if (feeAssignmentUniq.has(key)) continue;
    feeAssignmentUniq.add(key);
    feeAssignmentId++;

    feeAssignmentStudentId[feeAssignmentId] = studentId;
    feeAssignmentFeePlanId[feeAssignmentId] = feePlanId;

    const assignedAt = randomDateTimeBetween(userCreatedAt[studentId], DATE_RANGE.end);
    const effectiveTo =
      chance(0.35)
        ? (() => {
            const d = new Date(`${effectiveFrom}T00:00:00Z`);
            d.setUTCMonth(d.getUTCMonth() + randInt(1, 24));
            return dateOnly(d);
          })()
        : null;
    const assignedAmount = money(0, 50_000);
    const discount = chance(0.35) ? money(0, assignedAmount) : 0;

    const scholarshipCandidates = [];
    for (let sId = 1; sId <= CONFIG.scholarships; sId++) {
      if (scholarshipInstitutionId[sId] === institutionId) scholarshipCandidates.push(sId);
    }
    const scholarshipId = scholarshipCandidates.length && chance(0.25) ? pick(scholarshipCandidates) : null;

    studentFeeAssignmentsWriter.writeRow([
      studentId,
      feePlanId,
      iso(assignedAt),
      effectiveFrom,
      effectiveTo,
      assignedAmount,
      discount,
      scholarshipId,
      iso(randomDateTimeBetween(assignedAt, DATE_RANGE.end)),
    ]);
  }
  await studentFeeAssignmentsWriter.close();

  // =========================
  // 32) fee_invoices
  // =========================
  const feeInvoicesWriter = new CsvWriter(path.join(OUTPUT_DIR, "fee_invoices.csv"), [
    "student_user_id",
    "fee_assignment_id",
    "invoice_number",
    "invoice_status",
    "subtotal_amount",
    "discount_amount",
    "tax_amount",
    "total_amount",
    "due_date",
    "issued_at",
    "paid_at",
    "created_at",
  ]);

  const invoiceStudentId = new Array(CONFIG.feeInvoices + 1);
  const invoiceAssignmentId = new Array(CONFIG.feeInvoices + 1);
  const invoiceIssuedAt = new Array(CONFIG.feeInvoices + 1);
  const invoiceTotalAmount = new Array(CONFIG.feeInvoices + 1);

  for (let invoiceId = 1; invoiceId <= CONFIG.feeInvoices; invoiceId++) {
    const assignmentId = chance(0.85) ? randInt(1, CONFIG.studentFeeAssignments) : null;
    const studentId = assignmentId ? feeAssignmentStudentId[assignmentId] : pick(studentUserIds);
    invoiceStudentId[invoiceId] = studentId;
    invoiceAssignmentId[invoiceId] = assignmentId;
    const status = pick(invoiceStatuses);
    const issuedAt = randomDateTimeBetween(userCreatedAt[studentId], DATE_RANGE.end);
    invoiceIssuedAt[invoiceId] = issuedAt;
    const dueDate = chance(0.85)
      ? (() => {
          const d = new Date(issuedAt);
          d.setUTCDate(d.getUTCDate() + randInt(7, 45));
          return dateOnly(d);
        })()
      : null;
    const subtotal = money(0, 50_000);
    const discount = chance(0.3) ? money(0, subtotal) : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = chance(0.5) ? money(0, taxable * 0.2) : 0;
    const total = Math.max(0, taxable + tax);
    invoiceTotalAmount[invoiceId] = total;
    const paidAt = ["paid", "partial", "refunded"].includes(status) && chance(0.85) ? randomDateTimeBetween(issuedAt, DATE_RANGE.end) : null;
    feeInvoicesWriter.writeRow([
      studentId,
      assignmentId,
      `INV-${pad(invoiceId, 10)}`,
      status,
      subtotal,
      discount,
      tax,
      total,
      dueDate,
      iso(issuedAt),
      paidAt ? iso(paidAt) : null,
      iso(randomDateTimeBetween(issuedAt, DATE_RANGE.end)),
    ]);
  }
  await feeInvoicesWriter.close();

  // =========================
  // 33) payments
  // =========================
  const paymentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "payments.csv"), [
    "invoice_id",
    "payment_method",
    "payment_status",
    "transaction_ref",
    "paid_amount",
    "refund_amount",
    "paid_at",
    "failure_reason",
    "created_at",
  ]);

  for (let paymentId = 1; paymentId <= CONFIG.payments; paymentId++) {
    const invoiceId = randInt(1, CONFIG.feeInvoices);
    const status = pick(paymentStatuses);
    const createdAt = randomDateTimeBetween(invoiceIssuedAt[invoiceId], DATE_RANGE.end);
    const paidAt = status !== "pending" && chance(0.85) ? randomDateTimeBetween(invoiceIssuedAt[invoiceId], DATE_RANGE.end) : null;
    const maxPay = invoiceTotalAmount[invoiceId] ?? 0;
    const paidAmount = money(0, maxPay);
    const refundAmount = status.includes("refund") ? money(0, paidAmount) : 0;
    const failureReason = status === "failed" ? pick(["Declined", "Timeout", "Insufficient funds"]) : null;
    paymentsWriter.writeRow([
      invoiceId,
      pick(paymentMethods),
      status,
      `TXN-${pad(paymentId, 12)}`,
      paidAmount,
      refundAmount,
      paidAt ? iso(paidAt) : null,
      failureReason,
      iso(createdAt),
    ]);
  }
  await paymentsWriter.close();

  // =========================
  // 34) app_events
  // =========================
  const appEventsWriter = new CsvWriter(path.join(OUTPUT_DIR, "app_events.csv"), [
    "institution_id",
    "user_id",
    "event_name",
    "event_category",
    "entity_type",
    "entity_id",
    "event_time",
    "metadata",
  ]);

  const entityTypes = ["course", "offering", "assignment", "exam", "invoice", "material", "discussion"];
  const eventNames = ["login", "logout", "view_material", "submit_assignment", "mark_attendance", "pay_invoice", "create_thread"];

  for (let i = 1; i <= CONFIG.appEvents; i++) {
    const institutionId = randInt(1, CONFIG.institutions);
    const userCandidates = [];
    for (let u = 1; u <= CONFIG.usersTotal; u++) {
      if (userInstitutionId[u] === institutionId) userCandidates.push(u);
    }
    const userId = userCandidates.length && chance(0.85) ? pick(userCandidates) : null;
    appEventsWriter.writeRow([
      institutionId,
      userId,
      pick(eventNames),
      chance(0.85) ? pick(eventCategories) : null,
      chance(0.7) ? pick(entityTypes) : null,
      chance(0.7) ? randInt(1, 50_000) : null,
      iso(randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end)),
      JSON.stringify({ ip: faker.internet.ip(), ua: faker.internet.userAgent() }),
    ]);
  }
  await appEventsWriter.close();

  // =========================
  // 35) support_tickets
  // =========================
  const supportTicketsWriter = new CsvWriter(path.join(OUTPUT_DIR, "support_tickets.csv"), [
    "institution_id",
    "user_id",
    "offering_id",
    "issue_type",
    "priority",
    "ticket_status",
    "assigned_to_user_id",
    "resolution_time_mins",
    "created_at",
    "resolved_at",
  ]);

  for (let ticketId = 1; ticketId <= CONFIG.supportTickets; ticketId++) {
    const institutionId = randInt(1, CONFIG.institutions);
    const userCandidates = [];
    for (let u = 1; u <= CONFIG.usersTotal; u++) {
      if (userInstitutionId[u] === institutionId) userCandidates.push(u);
    }
    const userId = userCandidates.length ? pick(userCandidates) : null;
    const offeringCandidates = [];
    for (let o = 1; o <= CONFIG.courseOfferings; o++) {
      if (offeringInstitutionId[o] === institutionId) offeringCandidates.push(o);
    }
    const offeringId = offeringCandidates.length && chance(0.6) ? pick(offeringCandidates) : null;
    const createdAt = randomDateTimeBetween(institutionCreatedAt[institutionId], DATE_RANGE.end);
    const status = pick(ticketStatuses);
    const resolvedAt = ["resolved", "closed"].includes(status) && chance(0.75) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const assigneeCandidates = [...staffUserIds, ...adminUserIds].filter((u) => userInstitutionId[u] === institutionId);
    const assignedTo = assigneeCandidates.length && chance(0.7) ? pick(assigneeCandidates) : null;
    supportTicketsWriter.writeRow([
      institutionId,
      userId,
      offeringId,
      pick(ticketTypes),
      pick(ticketPriorities),
      status,
      assignedTo,
      resolvedAt ? randInt(5, 24 * 60) : null,
      iso(createdAt),
      resolvedAt ? iso(resolvedAt) : null,
    ]);
  }
  await supportTicketsWriter.close();

  console.log("✅ Generated Education seed CSVs");
  console.log(`- Output dir: ${OUTPUT_DIR}`);
  console.log(`- institutions: ${CONFIG.institutions}`);
  console.log(`- campuses: ${CONFIG.campuses}`);
  console.log(`- users: ${CONFIG.usersTotal} (students=${CONFIG.usersStudents}, teachers=${CONFIG.usersTeachers})`);
  console.log(`- courses: ${CONFIG.courses}, offerings: ${CONFIG.courseOfferings}, enrollments: ${CONFIG.enrollments}`);
  console.log(`- attendance_sessions: ${CONFIG.attendanceSessions}, attendance_records: ${CONFIG.attendanceRecords}`);
}

main().catch((err) => {
  console.error("educationGenerateData error:", err);
  process.exit(1);
});
