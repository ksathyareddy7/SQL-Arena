import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260413);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

const CONFIG = {
  departments: 18,
  specializations: 28,
  doctors: 420,
  doctorSchedulesPerDoctorMin: 2,
  doctorSchedulesPerDoctorMax: 5,
  doctorLeaves: 900,
  patients: 9_000,
  patientAddressesPerPatientMin: 1,
  patientAddressesPerPatientMax: 2,
  patientAllergies: 7_000,
  patientConditions: 9_000,
  insuranceProviders: 14,
  insuredPatientsRate: 0.55,
  additionalPoliciesPerPatientMax: 2,
  rooms: 220,
  appointments: 26_000,
  appointmentStatusHistoryRows: 22_000,
  admissions: 1_900,
  bedAllocations: 2_100,
  encountersFromAppointmentsRate: 0.7,
  vitalSigns: 45_000,
  diagnoses: 30_000,
  prescriptions: 18_000,
  medications: 650,
  prescriptionItems: 55_000,
  labTests: 180,
  labOrders: 20_000,
  labOrderItems: 42_000,
  labResults: 36_000,
  procedures: 140,
  procedureOrders: 9_000,
  invoices: 28_000,
  invoiceItems: 72_000,
  payments: 25_000,
  insuranceClaims: 9_000,
  staffUsers: 260,
  patientFeedback: 8_000,
  auditLogs: 80_000,
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

function iso(ts) {
  if (!ts) return "";
  return new Date(ts).toISOString().replace("T", " ").replace("Z", "");
}

function dateOnly(d) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

function randomDateTimeBetween(start, end) {
  return faker.date.between({ from: start, to: end });
}

function randomDateBetween(start, end) {
  return dateOnly(faker.date.between({ from: start, to: end }));
}

function money(min, max) {
  return faker.number.float({ min, max, fractionDigits: 2 });
}

function safePhone(n) {
  const base = String(1000000000 + (n % 9000000000));
  return `+91${base}`.slice(0, 20);
}

function pad(n, width) {
  return String(n).padStart(width, "0");
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

  const departmentTypes = ["clinical", "surgical", "diagnostic", "support", "administrative"];
  const genderValues = ["male", "female", "other", "prefer_not_to_say"];
  const employmentTypes = ["full_time", "part_time", "visiting", "contract"];
  const leaveTypes = ["vacation", "sick", "conference", "emergency", "other"];
  const leaveStatuses = ["pending", "approved", "rejected", "cancelled"];
  const addressTypes = ["home", "work", "billing", "temporary"];
  const allergyTypes = ["drug", "food", "environmental", "latex", "other"];
  const allergySeverities = ["mild", "moderate", "severe", "critical"];
  const conditionStatuses = ["active", "resolved", "chronic", "inactive"];
  const payerTypes = ["private", "government", "employer", "tpa"];
  const claimSubmissionModes = ["portal", "email", "api", "paper"];
  const coverageTypes = ["self", "family", "corporate"];
  const relationshipToHolder = ["self", "spouse", "child", "parent", "other"];
  const verificationStatuses = ["pending", "verified", "rejected", "expired"];
  const roomTypes = ["general", "private", "semi_private", "icu", "ot", "lab", "recovery", "emergency"];
  const bedTypes = ["standard", "icu", "ventilator", "pediatric", "maternity", "recovery"];
  const bedStatuses = ["available", "occupied", "reserved", "maintenance", "blocked"];
  const appointmentTypes = ["consultation", "follow_up", "procedure_review", "diagnostic_review", "vaccination"];
  const consultationModes = ["in_person", "video", "phone"];
  const appointmentStatuses = ["scheduled", "checked_in", "in_consultation", "completed", "cancelled", "no_show", "rescheduled"];
  const statusChangedBy = ["patient", "doctor", "staff", "system", "admin"];
  const encounterTypes = ["outpatient", "inpatient", "emergency", "teleconsult", "daycare"];
  const encounterStatuses = ["open", "closed", "cancelled"];
  const admissionTypes = ["elective", "emergency", "transfer", "maternity", "surgery"];
  const admissionStatuses = ["admitted", "discharged", "cancelled", "transferred"];
  const dischargeDispositions = ["home", "expired", "transferred", "ama", "rehab", "other"];
  const allocationStatuses = ["active", "released", "transferred", "cancelled"];
  const diagnosisTypes = ["primary", "secondary", "differential", "discharge"];
  const severityValues = ["mild", "moderate", "severe", "critical"];
  const prescriptionStatuses = ["active", "completed", "cancelled", "expired"];
  const medicationForms = ["tablet", "capsule", "syrup", "injection", "ointment", "drops", "inhaler", "other"];
  const routes = ["oral", "iv", "im", "topical", "inhalation", "subcutaneous", "other"];
  const sampleTypes = ["blood", "urine", "stool", "saliva", "swab", "imaging", "other"];
  const labOrderStatuses = ["ordered", "sample_collected", "processing", "completed", "cancelled"];
  const labPriorities = ["routine", "urgent", "stat"];
  const labItemStatuses = ["ordered", "sample_collected", "processing", "completed", "cancelled"];
  const resultFlags = ["normal", "abnormal", "critical", "pending"];
  const interpretations = ["normal", "high", "low", "critical", "inconclusive"];
  const procedureStatuses = ["ordered", "scheduled", "completed", "cancelled"];
  const invoiceTypes = ["outpatient", "inpatient", "lab", "pharmacy", "procedure", "package"];
  const invoiceStatuses = ["draft", "issued", "partially_paid", "paid", "cancelled", "written_off"];
  const invoiceItemTypes = ["consultation", "room", "bed", "lab", "pharmacy", "procedure", "service", "other"];
  const paymentMethods = ["cash", "card", "upi", "bank_transfer", "insurance", "wallet"];
  const paymentStatuses = ["pending", "successful", "failed", "refunded", "partial_refund"];
  const claimStatuses = ["draft", "submitted", "under_review", "approved", "partially_approved", "rejected", "settled"];
  const staffRoles = ["receptionist", "nurse", "lab_technician", "pharmacist", "billing_exec", "admin"];
  const shiftTypes = ["day", "night", "rotational"];
  const feedbackCategories = ["consultation", "staff", "billing", "cleanliness", "wait_time", "overall"];
  const auditActorTypes = ["doctor", "staff", "patient", "system", "admin"];
  const auditEntityNames = [
    "appointment",
    "encounter",
    "admission",
    "invoice",
    "payment",
    "lab_order",
    "prescription",
    "patient",
    "doctor",
  ];
  const auditActionNames = ["create", "update", "delete", "status_change", "view", "approve", "cancel", "assign"];

  // =========================
  // 1) departments
  // =========================
  const departmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "departments.csv"), [
    "department_code",
    "name",
    "department_type",
    "parent_department_id",
    "floor_number",
    "phone_extension",
    "is_active",
    "created_at",
  ]);

  const departmentIdByIndex = new Array(CONFIG.departments + 1);
  const departmentFloor = new Array(CONFIG.departments + 1);
  const departmentCreatedAt = new Array(CONFIG.departments + 1);

  const departmentNamePool = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Radiology",
    "Pathology",
    "Emergency",
    "ICU",
    "Surgery",
    "ENT",
    "Ophthalmology",
    "Oncology",
    "Gastroenterology",
    "Administration",
    "Billing",
    "Pharmacy",
    "Nursing",
    "Physiotherapy",
    "Urology",
    "Nephrology",
  ];

  const chosenDeptNames = departmentNamePool.slice(0, CONFIG.departments);
  for (let i = 1; i <= CONFIG.departments; i++) {
    const name = chosenDeptNames[i - 1] ?? `Department ${i}`;
    const departmentCode = `DEPT_${pad(i, 3)}`;
    const type = name === "Administration" || name === "Billing" ? "administrative" : pick(departmentTypes);
    const parentDepartmentId = chance(0.15) && i > 3 ? randInt(1, i - 1) : null;
    const floor = chance(0.9) ? randInt(0, 8) : null;
    const ext = chance(0.6) ? String(randInt(100, 999)) : null;
    const isActive = chance(0.97);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);

    departmentIdByIndex[i] = i;
    departmentFloor[i] = floor;
    departmentCreatedAt[i] = createdAt;

    departmentsWriter.writeRow([
      departmentCode,
      name,
      type,
      parentDepartmentId,
      floor,
      ext,
      isActive,
      iso(createdAt),
    ]);
  }
  await departmentsWriter.close();

  // =========================
  // 2) specializations
  // =========================
  const specializationsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "specializations.csv"),
    ["specialization_code", "name", "category", "is_active", "created_at"],
  );

  const specializationNames = [
    "General Medicine",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Pediatrics",
    "Radiology",
    "Pathology",
    "Gastroenterology",
    "Oncology",
    "Endocrinology",
    "Pulmonology",
    "Nephrology",
    "Urology",
    "Ophthalmology",
    "ENT",
    "Psychiatry",
    "Rheumatology",
    "Hematology",
    "Anesthesiology",
    "Emergency Medicine",
    "Critical Care",
    "Obstetrics",
    "Gynecology",
    "Physiotherapy",
    "Nutrition",
    "Diabetology",
    "Pain Management",
  ];

  for (let i = 1; i <= CONFIG.specializations; i++) {
    const name = specializationNames[i - 1] ?? `Specialization ${i}`;
    const code = `SPEC_${pad(i, 3)}`;
    const category = chance(0.75) ? pick(["medical", "surgical", "diagnostic", "support"]) : null;
    const isActive = chance(0.98);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    specializationsWriter.writeRow([code, name, category, isActive, iso(createdAt)]);
  }
  await specializationsWriter.close();

  // =========================
  // 3) doctors
  // =========================
  const doctorsWriter = new CsvWriter(path.join(OUTPUT_DIR, "doctors.csv"), [
    "employee_code",
    "full_name",
    "gender",
    "date_of_birth",
    "email",
    "phone",
    "department_id",
    "primary_specialization_id",
    "license_number",
    "years_of_experience",
    "employment_type",
    "consultation_fee",
    "joined_at",
    "is_active",
    "is_available_for_appointments",
    "rating_avg",
    "created_at",
  ]);

  const doctorDepartmentId = new Array(CONFIG.doctors + 1);
  const doctorPrimarySpecId = new Array(CONFIG.doctors + 1);
  const doctorJoinedAt = new Array(CONFIG.doctors + 1);

  for (let i = 1; i <= CONFIG.doctors; i++) {
    const employeeCode = `DOC_${pad(i, 5)}`;
    const fullName = faker.person.fullName();
    const gender = chance(0.92) ? pick(genderValues) : null;
    const dob = chance(0.9)
      ? dateOnly(faker.date.birthdate({ min: 25, max: 70, mode: "age" }))
      : null;
    const email = `doctor${i}@example.com`;
    const phone = safePhone(200000 + i);
    const departmentId = chance(0.85) ? randInt(1, CONFIG.departments) : null;
    const primarySpecId = chance(0.92) ? randInt(1, CONFIG.specializations) : null;
    const licenseNumber = `LIC-${pad(i, 8)}`;
    const expYears = chance(0.9) ? randInt(0, 40) : null;
    const employmentType = pick(employmentTypes);
    const fee = money(0, 3500);
    const joinedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const isActive = chance(0.96);
    const isAvailable = isActive ? chance(0.9) : false;
    const ratingAvg = faker.number.float({ min: 0, max: 5, fractionDigits: 2 });
    const createdAt = randomDateTimeBetween(joinedAt, DATE_RANGE.end);

    doctorDepartmentId[i] = departmentId;
    doctorPrimarySpecId[i] = primarySpecId;
    doctorJoinedAt[i] = joinedAt;

    doctorsWriter.writeRow([
      employeeCode,
      fullName,
      gender,
      dob,
      email,
      phone,
      departmentId,
      primarySpecId,
      licenseNumber,
      expYears,
      employmentType,
      fee,
      iso(joinedAt),
      isActive,
      isAvailable,
      ratingAvg,
      iso(createdAt),
    ]);
  }
  await doctorsWriter.close();

  // =========================
  // 4) doctor_specializations
  // =========================
  const doctorSpecializationsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "doctor_specializations.csv"),
    ["doctor_id", "specialization_id", "is_primary", "created_at"],
  );
  for (let doctorId = 1; doctorId <= CONFIG.doctors; doctorId++) {
    const primary = doctorPrimarySpecId[doctorId] ?? randInt(1, CONFIG.specializations);
    const extraCount = randInt(0, 2);
    const extras = pickUniqueIds(CONFIG.specializations, extraCount).filter((id) => id !== primary);
    const allSpecs = [primary, ...extras];
    for (let i = 0; i < allSpecs.length; i++) {
      doctorSpecializationsWriter.writeRow([
        doctorId,
        allSpecs[i],
        i === 0,
        iso(randomDateTimeBetween(doctorJoinedAt[doctorId], DATE_RANGE.end)),
      ]);
    }
  }
  await doctorSpecializationsWriter.close();

  // =========================
  // 5) doctor_schedules
  // =========================
  const doctorSchedulesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "doctor_schedules.csv"),
    [
      "doctor_id",
      "department_id",
      "day_of_week",
      "start_time",
      "end_time",
      "slot_duration_mins",
      "max_patients_per_slot",
      "consultation_mode",
      "effective_from",
      "effective_to",
      "is_active",
      "created_at",
    ],
  );

  const scheduleWindows = [
    ["09:00:00", "13:00:00"],
    ["10:00:00", "14:00:00"],
    ["14:00:00", "18:00:00"],
    ["16:00:00", "20:00:00"],
  ];
  for (let doctorId = 1; doctorId <= CONFIG.doctors; doctorId++) {
    const rows = randInt(CONFIG.doctorSchedulesPerDoctorMin, CONFIG.doctorSchedulesPerDoctorMax);
    const dept = doctorDepartmentId[doctorId] ?? randInt(1, CONFIG.departments);
    const effectiveFrom = randomDateBetween(new Date("2024-01-01T00:00:00Z"), new Date("2025-06-30T00:00:00Z"));
    for (let r = 0; r < rows; r++) {
      const [startTime, endTime] = pick(scheduleWindows);
      const dow = randInt(0, 6);
      const slot = pick([10, 15, 20, 30]);
      const maxPatients = pick([1, 1, 2, 3]);
      const mode = pick(consultationModes);
      const isActive = chance(0.95);
      doctorSchedulesWriter.writeRow([
        doctorId,
        dept,
        dow,
        startTime,
        endTime,
        slot,
        maxPatients,
        mode,
        effectiveFrom,
        null,
        isActive,
        iso(randomDateTimeBetween(doctorJoinedAt[doctorId], DATE_RANGE.end)),
      ]);
    }
  }
  await doctorSchedulesWriter.close();

  // =========================
  // 6) doctor_leaves
  // =========================
  const doctorLeavesWriter = new CsvWriter(path.join(OUTPUT_DIR, "doctor_leaves.csv"), [
    "doctor_id",
    "leave_type",
    "start_date",
    "end_date",
    "is_full_day",
    "start_time",
    "end_time",
    "approval_status",
    "reason",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.doctorLeaves; i++) {
    const doctorId = randInt(1, CONFIG.doctors);
    const leaveType = pick(leaveTypes);
    const startDate = randomDateBetween(new Date("2024-01-01T00:00:00Z"), DATE_RANGE.end);
    const days = randInt(0, 5);
    const startDt = new Date(`${startDate}T00:00:00Z`);
    const endDt = new Date(startDt);
    endDt.setUTCDate(endDt.getUTCDate() + days);
    const endDate = endDt.toISOString().slice(0, 10);
    const isFullDay = chance(0.88);
    const approvalStatus = pick(leaveStatuses);
    const reason = chance(0.6) ? faker.lorem.words({ min: 3, max: 8 }) : null;
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const startTime = !isFullDay ? "10:00:00" : null;
    const endTime = !isFullDay ? "13:00:00" : null;

    doctorLeavesWriter.writeRow([
      doctorId,
      leaveType,
      startDate,
      endDate,
      isFullDay,
      startTime,
      endTime,
      approvalStatus,
      reason,
      iso(createdAt),
    ]);
  }
  await doctorLeavesWriter.close();

  // =========================
  // 7) patients
  // =========================
  const patientsWriter = new CsvWriter(path.join(OUTPUT_DIR, "patients.csv"), [
    "patient_code",
    "full_name",
    "gender",
    "date_of_birth",
    "blood_group",
    "phone",
    "email",
    "city",
    "state",
    "postal_code",
    "emergency_contact_name",
    "emergency_contact_phone",
    "marital_status",
    "registered_at",
    "is_active",
    "deceased_at",
    "created_at",
  ]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const maritalStatuses = ["single", "married", "divorced", "widowed", "other"];
  const cities = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata"];
  const states = ["Karnataka", "Maharashtra", "Delhi", "Telangana", "Tamil Nadu", "West Bengal"];

  const patientRegisteredAt = new Array(CONFIG.patients + 1);

  for (let i = 1; i <= CONFIG.patients; i++) {
    const patientCode = `PAT_${pad(i, 7)}`;
    const fullName = faker.person.fullName();
    const gender = chance(0.95) ? pick(genderValues) : null;
    const dob = chance(0.92)
      ? dateOnly(faker.date.birthdate({ min: 0, max: 90, mode: "age" }))
      : null;
    const blood = chance(0.85) ? pick(bloodGroups) : null;
    const phone = chance(0.9) ? safePhone(500000 + i) : null;
    const email = chance(0.75) ? `patient${i}@example.com` : null;
    const city = chance(0.85) ? pick(cities) : null;
    const state = city ? pick(states) : null;
    const postal = city ? String(randInt(100000, 999999)) : null;
    const emergencyName = chance(0.65) ? faker.person.fullName() : null;
    const emergencyPhone = emergencyName ? safePhone(800000 + i) : null;
    const maritalStatus = chance(0.8) ? pick(maritalStatuses) : null;
    const registeredAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const isActive = chance(0.97);
    const deceasedAt = !isActive && chance(0.04) ? randomDateTimeBetween(registeredAt, DATE_RANGE.end) : null;
    const createdAt = randomDateTimeBetween(registeredAt, DATE_RANGE.end);

    patientRegisteredAt[i] = registeredAt;

    patientsWriter.writeRow([
      patientCode,
      fullName,
      gender,
      dob,
      blood,
      phone,
      email,
      city,
      state,
      postal,
      emergencyName,
      emergencyPhone,
      maritalStatus,
      iso(registeredAt),
      isActive,
      deceasedAt ? iso(deceasedAt) : null,
      iso(createdAt),
    ]);
  }
  await patientsWriter.close();

  // =========================
  // 8) patient_addresses
  // =========================
  const patientAddressesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "patient_addresses.csv"),
    ["patient_id", "address_type", "line1", "line2", "city", "state", "postal_code", "country", "is_primary", "created_at"],
  );
  for (let patientId = 1; patientId <= CONFIG.patients; patientId++) {
    const rows = randInt(CONFIG.patientAddressesPerPatientMin, CONFIG.patientAddressesPerPatientMax);
    const types = faker.helpers.shuffle(addressTypes.slice()).slice(0, rows);
    for (let i = 0; i < rows; i++) {
      patientAddressesWriter.writeRow([
        patientId,
        types[i],
        `${randInt(1, 200)} ${faker.location.streetAddress()}`,
        chance(0.4) ? faker.location.secondaryAddress() : null,
        pick(cities),
        pick(states),
        String(randInt(100000, 999999)),
        "India",
        i === 0,
        iso(randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end)),
      ]);
    }
  }
  await patientAddressesWriter.close();

  // =========================
  // 9) patient_allergies
  // =========================
  const patientAllergiesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "patient_allergies.csv"),
    ["patient_id", "allergen_name", "allergy_type", "severity", "reaction_notes", "recorded_at"],
  );

  const allergenPool = [
    "Penicillin",
    "Aspirin",
    "Sulfa drugs",
    "Peanuts",
    "Milk",
    "Eggs",
    "Dust",
    "Pollen",
    "Latex",
    "Shellfish",
    "Bee stings",
    "Ibuprofen",
  ];
  for (let i = 1; i <= CONFIG.patientAllergies; i++) {
    const patientId = randInt(1, CONFIG.patients);
    patientAllergiesWriter.writeRow([
      patientId,
      pick(allergenPool),
      pick(allergyTypes),
      pick(allergySeverities),
      chance(0.5) ? faker.lorem.sentence() : null,
      iso(randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end)),
    ]);
  }
  await patientAllergiesWriter.close();

  // =========================
  // 10) patient_conditions
  // =========================
  const patientConditionsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "patient_conditions.csv"),
    ["patient_id", "condition_name", "icd_code", "diagnosis_date", "condition_status", "notes", "recorded_at"],
  );

  const conditionPool = [
    ["Hypertension", "I10"],
    ["Diabetes mellitus", "E11"],
    ["Asthma", "J45"],
    ["Migraine", "G43"],
    ["Arthritis", "M19"],
    ["Hypothyroidism", "E03"],
    ["Depression", "F32"],
    ["GERD", "K21"],
    ["Anemia", "D64"],
    ["Chronic kidney disease", "N18"],
  ];
  for (let i = 1; i <= CONFIG.patientConditions; i++) {
    const patientId = randInt(1, CONFIG.patients);
    const [name, icd] = pick(conditionPool);
    const recordedAt = randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end);
    const diagnosisDate = chance(0.75) ? dateOnly(randomDateTimeBetween(DATE_RANGE.start, recordedAt)) : null;
    patientConditionsWriter.writeRow([
      patientId,
      name,
      chance(0.85) ? icd : null,
      diagnosisDate,
      pick(conditionStatuses),
      chance(0.4) ? faker.lorem.sentence() : null,
      iso(recordedAt),
    ]);
  }
  await patientConditionsWriter.close();

  // =========================
  // 11) insurance_providers
  // =========================
  const insuranceProvidersWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "insurance_providers.csv"),
    ["provider_code", "provider_name", "payer_type", "phone", "email", "claim_submission_mode", "is_active", "created_at"],
  );

  for (let i = 1; i <= CONFIG.insuranceProviders; i++) {
    insuranceProvidersWriter.writeRow([
      `INS_${pad(i, 4)}`,
      `${faker.company.name()} Insurance`,
      pick(payerTypes),
      chance(0.75) ? safePhone(900000 + i) : null,
      chance(0.7) ? `ins_provider${i}@example.com` : null,
      chance(0.8) ? pick(claimSubmissionModes) : null,
      chance(0.97),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }
  await insuranceProvidersWriter.close();

  // =========================
  // 12) insurance_policies
  // =========================
  const insurancePoliciesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "insurance_policies.csv"),
    [
      "patient_id",
      "insurance_provider_id",
      "policy_number",
      "member_id",
      "group_number",
      "plan_name",
      "coverage_type",
      "relationship_to_holder",
      "coverage_start_date",
      "coverage_end_date",
      "copay_amount",
      "deductible_amount",
      "coverage_percent",
      "is_primary",
      "verification_status",
      "verified_at",
      "created_at",
    ],
  );

  const patientPrimaryPolicyId = new Array(CONFIG.patients + 1).fill(null);
  const policyPatientId = [null];
  let policyId = 0;

  for (let patientId = 1; patientId <= CONFIG.patients; patientId++) {
    if (!chance(CONFIG.insuredPatientsRate)) continue;

    const policyCount = 1 + randInt(0, CONFIG.additionalPoliciesPerPatientMax);
    for (let p = 0; p < policyCount; p++) {
      policyId++;
      const providerId = randInt(1, CONFIG.insuranceProviders);
      const policyNumber = `POL-${providerId}-${pad(policyId, 8)}`; // unique per provider via suffix uniqueness
      const startDate = randomDateBetween(new Date("2023-01-01T00:00:00Z"), DATE_RANGE.end);
      const startDt = new Date(`${startDate}T00:00:00Z`);
      const endDate =
        chance(0.55)
          ? (() => {
              const endDt = new Date(startDt);
              endDt.setUTCMonth(endDt.getUTCMonth() + randInt(6, 36));
              return endDt.toISOString().slice(0, 10);
            })()
          : null;

      const isPrimary = p === 0;
      const status = pick(verificationStatuses);
      const createdAt = randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end);
      const verifiedAt = status === "verified" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

      policyPatientId[policyId] = patientId;
      if (isPrimary) patientPrimaryPolicyId[patientId] = policyId;

      insurancePoliciesWriter.writeRow([
        patientId,
        providerId,
        policyNumber,
        chance(0.7) ? `MEM-${pad(policyId, 8)}` : null,
        chance(0.3) ? `GRP-${pad(providerId, 5)}` : null,
        chance(0.75) ? pick(["Silver", "Gold", "Platinum", "Corporate"]) : null,
        pick(coverageTypes),
        chance(0.9) ? pick(relationshipToHolder) : null,
        startDate,
        endDate,
        money(0, 1000),
        money(0, 5000),
        faker.number.float({ min: 40, max: 100, fractionDigits: 2 }),
        isPrimary,
        status,
        verifiedAt ? iso(verifiedAt) : null,
        iso(createdAt),
      ]);
    }
  }
  await insurancePoliciesWriter.close();

  // =========================
  // 13) rooms
  // =========================
  const roomsWriter = new CsvWriter(path.join(OUTPUT_DIR, "rooms.csv"), [
    "room_number",
    "department_id",
    "ward_name",
    "floor_number",
    "room_type",
    "bed_capacity",
    "is_active",
    "created_at",
  ]);

  const roomDepartmentId = [null];
  const roomBedCapacity = [null];
  const roomCreatedAt = [null];

  for (let roomId = 1; roomId <= CONFIG.rooms; roomId++) {
    const deptId = chance(0.85) ? randInt(1, CONFIG.departments) : null;
    const roomType = pick(roomTypes);
    const capacity = roomType === "icu" ? pick([1, 1, 2]) : pick([1, 2, 3, 4]);
    const floor = deptId ? departmentFloor[deptId] : randInt(0, 8);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);

    roomDepartmentId[roomId] = deptId;
    roomBedCapacity[roomId] = capacity;
    roomCreatedAt[roomId] = createdAt;

    roomsWriter.writeRow([
      `RM-${pad(roomId, 4)}`,
      deptId,
      chance(0.5) ? `Ward ${pick(["A", "B", "C", "D"])}${randInt(1, 6)}` : null,
      floor,
      roomType,
      capacity,
      chance(0.97),
      iso(createdAt),
    ]);
  }
  await roomsWriter.close();

  // =========================
  // 14) beds
  // =========================
  const bedsWriter = new CsvWriter(path.join(OUTPUT_DIR, "beds.csv"), [
    "room_id",
    "bed_number",
    "bed_type",
    "bed_status",
    "is_active",
    "created_at",
  ]);

  const bedRoomId = [null];
  const bedCreatedAt = [null];
  let bedId = 0;
  for (let roomId = 1; roomId <= CONFIG.rooms; roomId++) {
    const cap = roomBedCapacity[roomId];
    for (let b = 1; b <= cap; b++) {
      bedId++;
      bedRoomId[bedId] = roomId;
      const createdAt = randomDateTimeBetween(roomCreatedAt[roomId], DATE_RANGE.end);
      bedCreatedAt[bedId] = createdAt;
      bedsWriter.writeRow([
        roomId,
        `B-${b}`,
        pick(bedTypes),
        pick(bedStatuses),
        chance(0.98),
        iso(createdAt),
      ]);
    }
  }
  await bedsWriter.close();
  const totalBeds = bedId;

  // =========================
  // 15) staff_users
  // =========================
  const staffUsersWriter = new CsvWriter(path.join(OUTPUT_DIR, "staff_users.csv"), [
    "employee_code",
    "full_name",
    "email",
    "phone",
    "department_id",
    "role_name",
    "shift_type",
    "joined_at",
    "is_active",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.staffUsers; i++) {
    const joinedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    staffUsersWriter.writeRow([
      `STF_${pad(i, 5)}`,
      faker.person.fullName(),
      chance(0.9) ? `staff${i}@example.com` : null,
      chance(0.9) ? safePhone(300000 + i) : null,
      chance(0.85) ? randInt(1, CONFIG.departments) : null,
      pick(staffRoles),
      chance(0.75) ? pick(shiftTypes) : null,
      iso(joinedAt),
      chance(0.97),
      iso(randomDateTimeBetween(joinedAt, DATE_RANGE.end)),
    ]);
  }
  await staffUsersWriter.close();

  // =========================
  // 16) appointments
  // =========================
  const appointmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "appointments.csv"), [
    "appointment_number",
    "patient_id",
    "doctor_id",
    "department_id",
    "booked_by_patient",
    "appointment_type",
    "consultation_mode",
    "appointment_status",
    "scheduled_start_at",
    "scheduled_end_at",
    "check_in_at",
    "consultation_started_at",
    "consultation_ended_at",
    "cancellation_reason",
    "visit_reason",
    "queue_token",
    "created_at",
  ]);

  const appointmentPatientId = new Array(CONFIG.appointments + 1);
  const appointmentDoctorId = new Array(CONFIG.appointments + 1);
  const appointmentDepartmentId = new Array(CONFIG.appointments + 1);
  const appointmentStatus = new Array(CONFIG.appointments + 1);
  const appointmentStart = new Array(CONFIG.appointments + 1);
  const appointmentEnd = new Array(CONFIG.appointments + 1);
  const appointmentCreatedAt = new Array(CONFIG.appointments + 1);

  for (let apptId = 1; apptId <= CONFIG.appointments; apptId++) {
    const patientId = randInt(1, CONFIG.patients);
    const doctorId = randInt(1, CONFIG.doctors);
    const deptId = doctorDepartmentId[doctorId] ?? (chance(0.7) ? randInt(1, CONFIG.departments) : null);
    const bookedByPatient = chance(0.85);
    const type = pick(appointmentTypes);
    const mode = pick(consultationModes);
    const status = pick(appointmentStatuses);

    // Keep appointment timestamps consistent with patient lifecycle.
    // `created_at` and other timestamps should never be earlier than patient registration.
    const startAt = randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end);
    const durationMins = pick([15, 20, 30, 45, 60]);
    const endAt = new Date(startAt);
    endAt.setUTCMinutes(endAt.getUTCMinutes() + durationMins);

    const checkInAt = ["checked_in", "in_consultation", "completed"].includes(status) && chance(0.8)
      ? (() => {
          const d = new Date(startAt);
          d.setUTCMinutes(d.getUTCMinutes() - randInt(5, 90));
          return d;
        })()
      : null;

    const startedAt = status === "in_consultation" || status === "completed"
      ? (() => {
          const d = new Date(startAt);
          d.setUTCMinutes(d.getUTCMinutes() + randInt(0, 10));
          return d;
        })()
      : null;

    const endedAt = status === "completed" && startedAt
      ? (() => {
          const d = new Date(startedAt);
          d.setUTCMinutes(d.getUTCMinutes() + randInt(5, durationMins));
          return d;
        })()
      : null;

    const cancellationReason =
      status === "cancelled" ? pick(["Doctor unavailable", "Patient request", "Emergency", "No-show"]) : null;
    const visitReason = chance(0.7) ? faker.lorem.words({ min: 3, max: 9 }) : null;
    const queueToken = chance(0.5) ? `Q${pad(randInt(1, 9999), 4)}` : null;
    const createdAt = randomDateTimeBetween(patientRegisteredAt[patientId], startAt);

    appointmentPatientId[apptId] = patientId;
    appointmentDoctorId[apptId] = doctorId;
    appointmentDepartmentId[apptId] = deptId;
    appointmentStatus[apptId] = status;
    appointmentStart[apptId] = startAt;
    appointmentEnd[apptId] = endAt;
    appointmentCreatedAt[apptId] = createdAt;

    appointmentsWriter.writeRow([
      `APT-${pad(apptId, 8)}`,
      patientId,
      doctorId,
      deptId,
      bookedByPatient,
      type,
      mode,
      status,
      iso(startAt),
      iso(endAt),
      checkInAt ? iso(checkInAt) : null,
      startedAt ? iso(startedAt) : null,
      endedAt ? iso(endedAt) : null,
      cancellationReason,
      visitReason,
      queueToken,
      iso(createdAt),
    ]);
  }
  await appointmentsWriter.close();

  // =========================
  // 17) appointment_status_history
  // =========================
  const appointmentStatusHistoryWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "appointment_status_history.csv"),
    ["appointment_id", "old_status", "new_status", "changed_at", "changed_by", "notes"],
  );

  for (let i = 1; i <= CONFIG.appointmentStatusHistoryRows; i++) {
    const apptId = randInt(1, CONFIG.appointments);
    const oldStatus = chance(0.6) ? pick(appointmentStatuses) : null;
    const newStatus = pick(appointmentStatuses);
    const changedAt = randomDateTimeBetween(appointmentCreatedAt[apptId], DATE_RANGE.end);
    const changedBy = chance(0.9) ? pick(statusChangedBy) : null;
    appointmentStatusHistoryWriter.writeRow([
      apptId,
      oldStatus,
      newStatus,
      iso(changedAt),
      changedBy,
      chance(0.4) ? faker.lorem.sentence() : null,
    ]);
  }
  await appointmentStatusHistoryWriter.close();

  // =========================
  // 18) admissions
  // =========================
  const admissionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "admissions.csv"), [
    "admission_number",
    "patient_id",
    "admitting_doctor_id",
    "department_id",
    "admission_type",
    "admission_status",
    "admitted_at",
    "discharge_at",
    "expected_discharge_at",
    "primary_diagnosis",
    "discharge_disposition",
    "created_at",
  ]);

  const admissionPatientId = new Array(CONFIG.admissions + 1);
  const admissionAdmittedAt = new Array(CONFIG.admissions + 1);
  const admissionDischargedAt = new Array(CONFIG.admissions + 1);
  const admissionDoctorId = new Array(CONFIG.admissions + 1);
  const admissionDepartmentId = new Array(CONFIG.admissions + 1);

  for (let admId = 1; admId <= CONFIG.admissions; admId++) {
    const patientId = randInt(1, CONFIG.patients);
    const doctorId = chance(0.92) ? randInt(1, CONFIG.doctors) : null;
    const deptId = doctorId ? doctorDepartmentId[doctorId] : chance(0.7) ? randInt(1, CONFIG.departments) : null;
    const type = pick(admissionTypes);
    const status = pick(admissionStatuses);
    const admittedAt = randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end);
    const expectedDischargeAt = (() => {
      const d = new Date(admittedAt);
      d.setUTCDate(d.getUTCDate() + randInt(1, 10));
      return d;
    })();
    const dischargeAt =
      status === "discharged" && chance(0.9)
        ? (() => {
            const d = new Date(admittedAt);
            d.setUTCDate(d.getUTCDate() + randInt(1, 14));
            return d;
          })()
        : null;

    admissionPatientId[admId] = patientId;
    admissionAdmittedAt[admId] = admittedAt;
    admissionDischargedAt[admId] = dischargeAt;
    admissionDoctorId[admId] = doctorId;
    admissionDepartmentId[admId] = deptId;

    admissionsWriter.writeRow([
      `ADM-${pad(admId, 8)}`,
      patientId,
      doctorId,
      deptId,
      type,
      status,
      iso(admittedAt),
      dischargeAt ? iso(dischargeAt) : null,
      iso(expectedDischargeAt),
      chance(0.6) ? pick(conditionPool)[0] : null,
      dischargeAt ? pick(dischargeDispositions) : null,
      iso(randomDateTimeBetween(admittedAt, DATE_RANGE.end)),
    ]);
  }
  await admissionsWriter.close();

  // =========================
  // 19) encounters
  // =========================
  const encountersWriter = new CsvWriter(path.join(OUTPUT_DIR, "encounters.csv"), [
    "encounter_number",
    "patient_id",
    "appointment_id",
    "admission_id",
    "attending_doctor_id",
    "department_id",
    "encounter_type",
    "encounter_status",
    "started_at",
    "ended_at",
    "diagnosis_summary",
    "notes",
    "created_at",
  ]);

  const encounterPatientId = [null];
  const encounterDoctorId = [null];
  const encounterStartedAt = [null];
  const encounterEndedAt = [null];
  const encounterIdByAppointmentId = new Array(CONFIG.appointments + 1).fill(null);
  const encounterIdByAdmissionId = new Array(CONFIG.admissions + 1).fill(null);

  let encounterId = 0;

  // Outpatient encounters from (some) appointments.
  for (let apptId = 1; apptId <= CONFIG.appointments; apptId++) {
    if (!chance(CONFIG.encountersFromAppointmentsRate)) continue;
    encounterId++;
    const patientId = appointmentPatientId[apptId];
    const doctorId = appointmentDoctorId[apptId];
    const deptId = appointmentDepartmentId[apptId];
    const startedAt = appointmentStart[apptId];
    const endedAt = chance(0.8)
      ? (() => {
          const d = new Date(appointmentEnd[apptId]);
          d.setUTCMinutes(d.getUTCMinutes() + randInt(0, 30));
          return d;
        })()
      : null;
    const status = endedAt ? "closed" : pick(encounterStatuses);
    const type = chance(0.75) ? "outpatient" : pick(encounterTypes);
    const createdAt = randomDateTimeBetween(startedAt, DATE_RANGE.end);

    encounterPatientId[encounterId] = patientId;
    encounterDoctorId[encounterId] = doctorId;
    encounterStartedAt[encounterId] = startedAt;
    encounterEndedAt[encounterId] = endedAt;
    encounterIdByAppointmentId[apptId] = encounterId;

    encountersWriter.writeRow([
      `ENC-${pad(encounterId, 9)}`,
      patientId,
      apptId,
      null,
      doctorId,
      deptId,
      type,
      status,
      iso(startedAt),
      endedAt ? iso(endedAt) : null,
      chance(0.5) ? pick(conditionPool)[0] : null,
      chance(0.4) ? faker.lorem.sentence() : null,
      iso(createdAt),
    ]);
  }

  // Inpatient encounters from admissions (1:1).
  for (let admId = 1; admId <= CONFIG.admissions; admId++) {
    encounterId++;
    const patientId = admissionPatientId[admId];
    const doctorId = admissionDoctorId[admId];
    const deptId = admissionDepartmentId[admId];
    const startedAt = admissionAdmittedAt[admId];
    const endedAt = admissionDischargedAt[admId];
    const status = endedAt ? "closed" : "open";
    const type = chance(0.75) ? "inpatient" : pick(encounterTypes);
    const createdAt = randomDateTimeBetween(startedAt, DATE_RANGE.end);

    encounterPatientId[encounterId] = patientId;
    encounterDoctorId[encounterId] = doctorId;
    encounterStartedAt[encounterId] = startedAt;
    encounterEndedAt[encounterId] = endedAt;
    encounterIdByAdmissionId[admId] = encounterId;

    encountersWriter.writeRow([
      `ENC-${pad(encounterId, 9)}`,
      patientId,
      null,
      admId,
      doctorId,
      deptId,
      type,
      status,
      iso(startedAt),
      endedAt ? iso(endedAt) : null,
      chance(0.5) ? pick(conditionPool)[0] : null,
      chance(0.4) ? faker.lorem.sentence() : null,
      iso(createdAt),
    ]);
  }

  await encountersWriter.close();
  const totalEncounters = encounterId;

  // =========================
  // 20) bed_allocations
  // =========================
  const bedAllocationsWriter = new CsvWriter(path.join(OUTPUT_DIR, "bed_allocations.csv"), [
    "admission_id",
    "bed_id",
    "allocated_at",
    "released_at",
    "allocation_status",
    "notes",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.bedAllocations; i++) {
    const admissionId = randInt(1, CONFIG.admissions);
    const bedIdPick = randInt(1, totalBeds);
    const allocatedAt = randomDateTimeBetween(admissionAdmittedAt[admissionId], DATE_RANGE.end);
    const releasedAt = chance(0.6) ? randomDateTimeBetween(allocatedAt, DATE_RANGE.end) : null;
    const status = releasedAt ? pick(["released", "transferred"]) : "active";
    bedAllocationsWriter.writeRow([
      admissionId,
      bedIdPick,
      iso(allocatedAt),
      releasedAt ? iso(releasedAt) : null,
      status,
      chance(0.3) ? "Bed assigned" : null,
      iso(randomDateTimeBetween(allocatedAt, DATE_RANGE.end)),
    ]);
  }
  await bedAllocationsWriter.close();

  // =========================
  // 21) vital_signs
  // =========================
  const vitalSignsWriter = new CsvWriter(path.join(OUTPUT_DIR, "vital_signs.csv"), [
    "encounter_id",
    "patient_id",
    "recorded_by_doctor_id",
    "recorded_at",
    "temperature_c",
    "systolic_bp",
    "diastolic_bp",
    "pulse_rate",
    "respiratory_rate",
    "oxygen_saturation",
    "height_cm",
    "weight_kg",
    "bmi",
    "notes",
  ]);

  for (let i = 1; i <= CONFIG.vitalSigns; i++) {
    const encounterIdPick = randInt(1, totalEncounters);
    const patientId = encounterPatientId[encounterIdPick];
    const doctorId = encounterDoctorId[encounterIdPick] ?? (chance(0.8) ? randInt(1, CONFIG.doctors) : null);
    const recordedAt = randomDateTimeBetween(encounterStartedAt[encounterIdPick], DATE_RANGE.end);
    const height = faker.number.float({ min: 120, max: 195, fractionDigits: 2 });
    const weight = faker.number.float({ min: 35, max: 120, fractionDigits: 2 });
    const bmi = clamp(weight / ((height / 100) * (height / 100)), 10, 60);
    vitalSignsWriter.writeRow([
      encounterIdPick,
      patientId,
      doctorId,
      iso(recordedAt),
      faker.number.float({ min: 36.0, max: 39.5, fractionDigits: 1 }),
      randInt(90, 170),
      randInt(55, 110),
      randInt(55, 140),
      randInt(10, 35),
      faker.number.float({ min: 85, max: 100, fractionDigits: 2 }),
      height,
      weight,
      Number(bmi.toFixed(2)),
      chance(0.25) ? faker.lorem.sentence() : null,
    ]);
  }
  await vitalSignsWriter.close();

  // =========================
  // 22) diagnoses
  // =========================
  const diagnosesWriter = new CsvWriter(path.join(OUTPUT_DIR, "diagnoses.csv"), [
    "encounter_id",
    "patient_id",
    "doctor_id",
    "diagnosis_type",
    "diagnosis_name",
    "icd_code",
    "severity",
    "diagnosed_at",
    "notes",
  ]);

  for (let i = 1; i <= CONFIG.diagnoses; i++) {
    const encounterIdPick = randInt(1, totalEncounters);
    const patientId = encounterPatientId[encounterIdPick];
    const doctorId = encounterDoctorId[encounterIdPick] ?? (chance(0.8) ? randInt(1, CONFIG.doctors) : null);
    const [name, icd] = pick(conditionPool);
    const diagnosedAt = randomDateTimeBetween(encounterStartedAt[encounterIdPick], DATE_RANGE.end);
    diagnosesWriter.writeRow([
      encounterIdPick,
      patientId,
      doctorId,
      pick(diagnosisTypes),
      name,
      chance(0.85) ? icd : null,
      chance(0.8) ? pick(severityValues) : null,
      iso(diagnosedAt),
      chance(0.35) ? faker.lorem.sentence() : null,
    ]);
  }
  await diagnosesWriter.close();

  // =========================
  // 23) medications
  // =========================
  const medicationsWriter = new CsvWriter(path.join(OUTPUT_DIR, "medications.csv"), [
    "medication_code",
    "generic_name",
    "brand_name",
    "form",
    "strength",
    "manufacturer",
    "unit_price",
    "is_active",
    "created_at",
  ]);

  const genericNames = [
    "Paracetamol",
    "Ibuprofen",
    "Amoxicillin",
    "Azithromycin",
    "Metformin",
    "Amlodipine",
    "Atorvastatin",
    "Omeprazole",
    "Cetirizine",
    "Salbutamol",
    "Losartan",
    "Levothyroxine",
  ];

  for (let i = 1; i <= CONFIG.medications; i++) {
    const genericName = chance(0.75) ? pick(genericNames) : `${faker.commerce.productName()} Med`;
    const brandName = chance(0.7) ? `${genericName} ${pick(["Plus", "SR", "XR", "Forte"])}` : null;
    medicationsWriter.writeRow([
      `MED-${pad(i, 6)}`,
      genericName,
      brandName,
      pick(medicationForms),
      chance(0.75) ? `${randInt(5, 1000)}mg` : null,
      chance(0.75) ? faker.company.name() : null,
      money(0, 650),
      chance(0.98),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }
  await medicationsWriter.close();

  // =========================
  // 24) prescriptions
  // =========================
  const prescriptionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "prescriptions.csv"), [
    "prescription_number",
    "encounter_id",
    "patient_id",
    "doctor_id",
    "prescribed_at",
    "prescription_status",
    "notes",
    "created_at",
  ]);

  const prescriptionEncounterId = [null];
  const prescriptionPatientId = [null];
  const prescriptionDoctorId = [null];
  const prescriptionPrescribedAt = [null];

  for (let i = 1; i <= CONFIG.prescriptions; i++) {
    const encounterIdPick = randInt(1, totalEncounters);
    const patientId = encounterPatientId[encounterIdPick];
    const doctorId = encounterDoctorId[encounterIdPick] ?? (chance(0.8) ? randInt(1, CONFIG.doctors) : null);
    const prescribedAt = randomDateTimeBetween(encounterStartedAt[encounterIdPick], DATE_RANGE.end);
    const status = pick(prescriptionStatuses);
    const createdAt = randomDateTimeBetween(prescribedAt, DATE_RANGE.end);

    prescriptionEncounterId[i] = encounterIdPick;
    prescriptionPatientId[i] = patientId;
    prescriptionDoctorId[i] = doctorId;
    prescriptionPrescribedAt[i] = prescribedAt;

    prescriptionsWriter.writeRow([
      `RX-${pad(i, 9)}`,
      encounterIdPick,
      patientId,
      doctorId,
      iso(prescribedAt),
      status,
      chance(0.35) ? faker.lorem.sentence() : null,
      iso(createdAt),
    ]);
  }
  await prescriptionsWriter.close();

  // =========================
  // 25) prescription_items
  // =========================
  const prescriptionItemsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "prescription_items.csv"),
    [
      "prescription_id",
      "medication_id",
      "dosage",
      "frequency",
      "duration_days",
      "quantity",
      "route",
      "instructions",
      "created_at",
    ],
  );
  for (let i = 1; i <= CONFIG.prescriptionItems; i++) {
    const rxId = randInt(1, CONFIG.prescriptions);
    const durationDays = chance(0.85) ? randInt(1, 30) : null;
    const qty = durationDays ? durationDays * pick([1, 2, 3]) : randInt(1, 30);
    prescriptionItemsWriter.writeRow([
      rxId,
      randInt(1, CONFIG.medications),
      `${randInt(1, 2)} ${pick(["tab", "cap", "ml", "puff"])}`
      ,
      pick(["once daily", "twice daily", "thrice daily", "as needed"]),
      durationDays,
      qty,
      pick(routes),
      chance(0.45) ? "After food" : null,
      iso(randomDateTimeBetween(prescriptionPrescribedAt[rxId], DATE_RANGE.end)),
    ]);
  }
  await prescriptionItemsWriter.close();

  // =========================
  // 26) lab_test_catalog
  // =========================
  const labTestsWriter = new CsvWriter(path.join(OUTPUT_DIR, "lab_test_catalog.csv"), [
    "test_code",
    "test_name",
    "test_category",
    "department_id",
    "sample_type",
    "standard_price",
    "turnaround_hours",
    "is_active",
    "created_at",
  ]);

  const labTestNames = [
    "Complete Blood Count",
    "Blood Sugar (Fasting)",
    "Blood Sugar (PP)",
    "HbA1c",
    "Lipid Profile",
    "Liver Function Test",
    "Kidney Function Test",
    "Thyroid Profile",
    "Urine Routine",
    "Vitamin D",
    "Vitamin B12",
    "CRP",
    "D-Dimer",
    "Troponin I",
    "X-Ray Chest",
    "MRI Brain",
    "CT Abdomen",
    "Ultrasound Abdomen",
  ];

  for (let i = 1; i <= CONFIG.labTests; i++) {
    const name = labTestNames[(i - 1) % labTestNames.length] + (i > labTestNames.length ? ` ${i}` : "");
    const deptId = chance(0.8) ? randInt(1, CONFIG.departments) : null;
    labTestsWriter.writeRow([
      `TST-${pad(i, 5)}`,
      name,
      chance(0.7) ? pick(["hematology", "biochemistry", "imaging", "microbiology"]) : null,
      deptId,
      pick(sampleTypes),
      money(0, 9000),
      chance(0.85) ? randInt(0, 72) : null,
      chance(0.98),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }
  await labTestsWriter.close();

  // =========================
  // 27) lab_orders
  // =========================
  const labOrdersWriter = new CsvWriter(path.join(OUTPUT_DIR, "lab_orders.csv"), [
    "lab_order_number",
    "encounter_id",
    "patient_id",
    "ordered_by_doctor_id",
    "ordered_at",
    "order_status",
    "priority",
    "notes",
    "created_at",
  ]);

  const labOrderEncounterId = [null];
  const labOrderPatientId = [null];
  const labOrderOrderedAt = [null];
  const labOrderStatus = [null];

  for (let i = 1; i <= CONFIG.labOrders; i++) {
    const encounterIdPick = randInt(1, totalEncounters);
    const patientId = encounterPatientId[encounterIdPick];
    const doctorId = encounterDoctorId[encounterIdPick] ?? (chance(0.8) ? randInt(1, CONFIG.doctors) : null);
    const orderedAt = randomDateTimeBetween(encounterStartedAt[encounterIdPick], DATE_RANGE.end);
    const status = pick(labOrderStatuses);
    const priority = pick(labPriorities);
    const createdAt = randomDateTimeBetween(orderedAt, DATE_RANGE.end);

    labOrderEncounterId[i] = encounterIdPick;
    labOrderPatientId[i] = patientId;
    labOrderOrderedAt[i] = orderedAt;
    labOrderStatus[i] = status;

    labOrdersWriter.writeRow([
      `LAB-${pad(i, 9)}`,
      encounterIdPick,
      patientId,
      doctorId,
      iso(orderedAt),
      status,
      priority,
      chance(0.25) ? faker.lorem.sentence() : null,
      iso(createdAt),
    ]);
  }
  await labOrdersWriter.close();

  // =========================
  // 28) lab_order_items
  // =========================
  const labOrderItemsWriter = new CsvWriter(path.join(OUTPUT_DIR, "lab_order_items.csv"), [
    "lab_order_id",
    "test_id",
    "item_status",
    "sample_collected_at",
    "completed_at",
    "result_flag",
    "created_at",
  ]);

  const labOrderItemIdByIndex = [null];
  const labOrderItemCreatedAt = [null];
  let labOrderItemId = 0;
  const perOrderTestSet = new Map();

  for (let i = 1; i <= CONFIG.labOrderItems; i++) {
    const labOrderId = randInt(1, CONFIG.labOrders);
    const testId = randInt(1, CONFIG.labTests);
    const key = `${labOrderId}:${testId}`;
    if (perOrderTestSet.has(key)) continue;
    perOrderTestSet.set(key, true);

    labOrderItemId++;
    const status = pick(labItemStatuses);
    const createdAt = randomDateTimeBetween(labOrderOrderedAt[labOrderId], DATE_RANGE.end);
    const sampleCollectedAt =
      status !== "ordered" && status !== "cancelled" && chance(0.85)
        ? randomDateTimeBetween(createdAt, DATE_RANGE.end)
        : null;
    const completedAt =
      status === "completed" && sampleCollectedAt
        ? randomDateTimeBetween(sampleCollectedAt, DATE_RANGE.end)
        : null;
    const resultFlag = completedAt ? pick(["normal", "abnormal", "critical"]) : "pending";

    labOrderItemIdByIndex[labOrderItemId] = labOrderId;
    labOrderItemCreatedAt[labOrderItemId] = createdAt;

    labOrderItemsWriter.writeRow([
      labOrderId,
      testId,
      status,
      sampleCollectedAt ? iso(sampleCollectedAt) : null,
      completedAt ? iso(completedAt) : null,
      resultFlag,
      iso(createdAt),
    ]);
    if (labOrderItemId >= CONFIG.labOrderItems) break;
  }
  await labOrderItemsWriter.close();

  // =========================
  // 29) lab_results
  // =========================
  const labResultsWriter = new CsvWriter(path.join(OUTPUT_DIR, "lab_results.csv"), [
    "lab_order_item_id",
    "result_value",
    "result_unit",
    "reference_range",
    "interpretation",
    "approved_by_doctor_id",
    "resulted_at",
    "notes",
  ]);

  const maxLabOrderItemId = labOrderItemId;
  const resultItemIds = pickUniqueIds(maxLabOrderItemId, Math.min(CONFIG.labResults, maxLabOrderItemId));
  for (let i = 0; i < resultItemIds.length; i++) {
    const itemId = resultItemIds[i];
    const resultedAt = randomDateTimeBetween(labOrderItemCreatedAt[itemId], DATE_RANGE.end);
    labResultsWriter.writeRow([
      itemId,
      chance(0.8) ? String(faker.number.float({ min: 0.1, max: 999, fractionDigits: 2 })) : null,
      chance(0.7) ? pick(["mg/dL", "g/dL", "mmol/L", "IU/L", "%"]) : null,
      chance(0.6) ? "N/A" : null,
      chance(0.9) ? pick(interpretations) : null,
      chance(0.4) ? randInt(1, CONFIG.doctors) : null,
      iso(resultedAt),
      chance(0.25) ? faker.lorem.sentence() : null,
    ]);
  }
  await labResultsWriter.close();

  // =========================
  // 30) procedures
  // =========================
  const proceduresWriter = new CsvWriter(path.join(OUTPUT_DIR, "procedures.csv"), [
    "procedure_code",
    "procedure_name",
    "procedure_category",
    "standard_price",
    "is_surgical",
    "is_active",
    "created_at",
  ]);

  const procedureNames = [
    "ECG",
    "Echocardiogram",
    "Endoscopy",
    "Colonoscopy",
    "Appendectomy",
    "Cataract Surgery",
    "Knee Replacement",
    "CT Scan",
    "MRI Scan",
    "Ultrasound",
    "Dialysis Session",
    "Physiotherapy Session",
    "Vaccination",
    "Wound Dressing",
  ];

  for (let i = 1; i <= CONFIG.procedures; i++) {
    const name = procedureNames[(i - 1) % procedureNames.length] + (i > procedureNames.length ? ` ${i}` : "");
    proceduresWriter.writeRow([
      `PRC-${pad(i, 5)}`,
      name,
      chance(0.7) ? pick(["diagnostic", "surgical", "therapy", "preventive"]) : null,
      money(0, 120000),
      chance(0.35),
      chance(0.98),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }
  await proceduresWriter.close();

  // =========================
  // 31) procedure_orders
  // =========================
  const procedureOrdersWriter = new CsvWriter(path.join(OUTPUT_DIR, "procedure_orders.csv"), [
    "procedure_order_number",
    "encounter_id",
    "patient_id",
    "procedure_id",
    "ordered_by_doctor_id",
    "scheduled_at",
    "performed_at",
    "procedure_status",
    "notes",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.procedureOrders; i++) {
    const encounterIdPick = randInt(1, totalEncounters);
    const patientId = encounterPatientId[encounterIdPick];
    const doctorId = encounterDoctorId[encounterIdPick] ?? (chance(0.8) ? randInt(1, CONFIG.doctors) : null);
    const status = pick(procedureStatuses);
    const orderedAt = randomDateTimeBetween(encounterStartedAt[encounterIdPick], DATE_RANGE.end);
    const scheduledAt = status === "scheduled" || status === "completed"
      ? randomDateTimeBetween(orderedAt, DATE_RANGE.end)
      : null;
    const performedAt =
      status === "completed" && scheduledAt
        ? randomDateTimeBetween(scheduledAt, DATE_RANGE.end)
        : null;
    const createdAt = randomDateTimeBetween(orderedAt, DATE_RANGE.end);
    procedureOrdersWriter.writeRow([
      `PROC-${pad(i, 9)}`,
      encounterIdPick,
      patientId,
      randInt(1, CONFIG.procedures),
      doctorId,
      scheduledAt ? iso(scheduledAt) : null,
      performedAt ? iso(performedAt) : null,
      status,
      chance(0.25) ? faker.lorem.sentence() : null,
      iso(createdAt),
    ]);
  }
  await procedureOrdersWriter.close();

  // =========================
  // 32) invoices
  // =========================
  const invoicesWriter = new CsvWriter(path.join(OUTPUT_DIR, "invoices.csv"), [
    "invoice_number",
    "patient_id",
    "encounter_id",
    "admission_id",
    "insurance_policy_id",
    "invoice_type",
    "invoice_status",
    "issued_at",
    "due_at",
    "subtotal_amount",
    "discount_amount",
    "tax_amount",
    "insurance_covered_amount",
    "patient_payable_amount",
    "total_amount",
    "created_at",
  ]);

  const invoicePatientId = [null];
  const invoiceEncounterId = [null];
  const invoiceAdmissionId = [null];
  const invoiceInsurancePolicyId = [null];
  const invoiceStatus = [null];
  const invoiceIssuedAt = [null];
  const invoiceTotal = [null];
  const invoicePatientPayable = [null];

  for (let i = 1; i <= CONFIG.invoices; i++) {
    const patientId = randInt(1, CONFIG.patients);
    const policyId = chance(0.5) ? patientPrimaryPolicyId[patientId] : null;
    const invoiceType = pick(invoiceTypes);
    const status = pick(invoiceStatuses);
    const encounterIdPick = chance(0.65) ? randInt(1, totalEncounters) : null;
    const admissionIdPick = !encounterIdPick && chance(0.35) ? randInt(1, CONFIG.admissions) : null;
    const createdAt = randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end);
    const issuedAt = status !== "draft" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const dueAt = issuedAt && chance(0.6) ? randomDateTimeBetween(issuedAt, DATE_RANGE.end) : null;

    const subtotal = money(0, 250000);
    const discount = chance(0.55) ? money(0, Math.min(15000, subtotal)) : 0;
    const taxable = Math.max(0, subtotal - discount);
    const tax = chance(0.7) ? Number((taxable * 0.05).toFixed(2)) : 0;
    const total = Number((taxable + tax).toFixed(2));
    const insuranceCovered =
      policyId && chance(0.75) ? Number((total * faker.number.float({ min: 0.1, max: 0.9 })).toFixed(2)) : 0;
    const patientPayable = Number((total - insuranceCovered).toFixed(2));

    invoicePatientId[i] = patientId;
    invoiceEncounterId[i] = encounterIdPick;
    invoiceAdmissionId[i] = admissionIdPick;
    invoiceInsurancePolicyId[i] = policyId;
    invoiceStatus[i] = status;
    invoiceIssuedAt[i] = issuedAt;
    invoiceTotal[i] = total;
    invoicePatientPayable[i] = patientPayable;

    invoicesWriter.writeRow([
      `INV-${pad(i, 10)}`,
      patientId,
      encounterIdPick,
      admissionIdPick,
      policyId,
      invoiceType,
      status,
      issuedAt ? iso(issuedAt) : null,
      dueAt ? iso(dueAt) : null,
      subtotal,
      discount,
      tax,
      insuranceCovered,
      patientPayable,
      total,
      iso(createdAt),
    ]);
  }
  await invoicesWriter.close();

  // =========================
  // 33) invoice_items
  // =========================
  const invoiceItemsWriter = new CsvWriter(path.join(OUTPUT_DIR, "invoice_items.csv"), [
    "invoice_id",
    "item_type",
    "item_reference_id",
    "description",
    "quantity",
    "unit_price",
    "discount_amount",
    "tax_amount",
    "line_total",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.invoiceItems; i++) {
    const invoiceId = randInt(1, CONFIG.invoices);
    const qty = faker.number.float({ min: 1, max: 5, fractionDigits: 2 });
    const unit = money(0, 25000);
    const discount = chance(0.35) ? money(0, Math.min(5000, unit * qty)) : 0;
    const taxable = Math.max(0, unit * qty - discount);
    const tax = chance(0.7) ? Number((taxable * 0.05).toFixed(2)) : 0;
    const lineTotal = Number((taxable + tax).toFixed(2));
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    invoiceItemsWriter.writeRow([
      invoiceId,
      pick(invoiceItemTypes),
      chance(0.4) ? randInt(1, 50000) : null,
      faker.commerce.productName(),
      qty,
      unit,
      discount,
      tax,
      lineTotal,
      iso(createdAt),
    ]);
  }
  await invoiceItemsWriter.close();

  // =========================
  // 34) payments
  // =========================
  const paymentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "payments.csv"), [
    "payment_number",
    "invoice_id",
    "payment_method",
    "payment_status",
    "amount_paid",
    "transaction_ref",
    "paid_at",
    "refund_amount",
    "refunded_at",
    "failure_reason",
    "created_at",
  ]);

  let paymentId = 0;
  for (let i = 1; i <= CONFIG.payments; i++) {
    const invoiceId = randInt(1, CONFIG.invoices);
    const status = pick(paymentStatuses);
    const method = pick(paymentMethods);
    const paidAt = status === "successful" || status === "refunded" || status === "partial_refund"
      ? randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)
      : null;
    const amountPaid =
      status === "successful" || status === "refunded" || status === "partial_refund"
        ? (chance(0.25) ? money(0, invoicePatientPayable[invoiceId]) : invoicePatientPayable[invoiceId])
        : 0;
    const refundAmount =
      status === "refunded"
        ? amountPaid
        : status === "partial_refund"
          ? money(0, amountPaid)
          : 0;
    const refundedAt = refundAmount > 0 && paidAt ? randomDateTimeBetween(paidAt, DATE_RANGE.end) : null;
    const failureReason = status === "failed" ? pick(["Declined", "Timeout", "Insufficient funds"]) : null;
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    paymentId++;
    paymentsWriter.writeRow([
      `PAY-${pad(paymentId, 10)}`,
      invoiceId,
      method,
      status,
      amountPaid,
      `TXN-${pad(paymentId, 12)}`,
      paidAt ? iso(paidAt) : null,
      refundAmount,
      refundedAt ? iso(refundedAt) : null,
      failureReason,
      iso(createdAt),
    ]);
  }
  await paymentsWriter.close();

  // =========================
  // 35) insurance_claims
  // =========================
  const insuranceClaimsWriter = new CsvWriter(path.join(OUTPUT_DIR, "insurance_claims.csv"), [
    "claim_number",
    "invoice_id",
    "insurance_policy_id",
    "claim_status",
    "claimed_amount",
    "approved_amount",
    "submitted_at",
    "decision_at",
    "rejection_reason",
    "created_at",
  ]);

  let claimId = 0;
  for (let i = 0; i < CONFIG.insuranceClaims; i++) {
    const invoiceId = randInt(1, CONFIG.invoices);
    const policyId = invoiceInsurancePolicyId[invoiceId];
    if (!policyId) continue;
    claimId++;
    const status = pick(claimStatuses);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const submittedAt = status !== "draft" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const decisionAt =
      submittedAt && ["approved", "partially_approved", "rejected", "settled"].includes(status)
        ? randomDateTimeBetween(submittedAt, DATE_RANGE.end)
        : null;
    const claimed = money(0, invoiceTotal[invoiceId]);
    const approved = ["approved", "settled"].includes(status)
      ? claimed
      : status === "partially_approved"
        ? money(0, claimed)
        : 0;
    const rejectionReason = status === "rejected" ? pick(["Missing documents", "Not covered", "Policy expired"]) : null;
    insuranceClaimsWriter.writeRow([
      `CLM-${pad(claimId, 10)}`,
      invoiceId,
      policyId,
      status,
      claimed,
      approved,
      submittedAt ? iso(submittedAt) : null,
      decisionAt ? iso(decisionAt) : null,
      rejectionReason,
      iso(createdAt),
    ]);
  }
  await insuranceClaimsWriter.close();

  // =========================
  // 36) patient_feedback
  // =========================
  const patientFeedbackWriter = new CsvWriter(path.join(OUTPUT_DIR, "patient_feedback.csv"), [
    "patient_id",
    "doctor_id",
    "appointment_id",
    "encounter_id",
    "rating",
    "feedback_category",
    "comments",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.patientFeedback; i++) {
    const apptId = chance(0.6) ? randInt(1, CONFIG.appointments) : null;
    const encounterIdPick = apptId ? encounterIdByAppointmentId[apptId] : chance(0.4) ? randInt(1, totalEncounters) : null;
    const patientId = apptId ? appointmentPatientId[apptId] : encounterIdPick ? encounterPatientId[encounterIdPick] : randInt(1, CONFIG.patients);
    const doctorId = apptId ? appointmentDoctorId[apptId] : encounterIdPick ? encounterDoctorId[encounterIdPick] : null;
    const createdAt = randomDateTimeBetween(patientRegisteredAt[patientId], DATE_RANGE.end);
    patientFeedbackWriter.writeRow([
      patientId,
      doctorId,
      apptId,
      encounterIdPick,
      randInt(1, 5),
      pick(feedbackCategories),
      chance(0.6) ? faker.lorem.sentence() : null,
      iso(createdAt),
    ]);
  }
  await patientFeedbackWriter.close();

  // =========================
  // 37) audit_logs
  // =========================
  const auditLogsWriter = new CsvWriter(path.join(OUTPUT_DIR, "audit_logs.csv"), [
    "actor_type",
    "actor_id",
    "entity_name",
    "entity_id",
    "action_name",
    "action_time",
    "notes",
    "metadata",
  ]);

  for (let i = 1; i <= CONFIG.auditLogs; i++) {
    const actorType = pick(auditActorTypes);
    const actorId =
      actorType === "doctor"
        ? randInt(1, CONFIG.doctors)
        : actorType === "patient"
          ? randInt(1, CONFIG.patients)
          : actorType === "staff"
            ? randInt(1, CONFIG.staffUsers)
            : null;

    const entity = pick(auditEntityNames);
    const entityId =
      entity === "appointment"
        ? randInt(1, CONFIG.appointments)
        : entity === "encounter"
          ? randInt(1, totalEncounters)
          : entity === "admission"
            ? randInt(1, CONFIG.admissions)
            : entity === "invoice"
              ? randInt(1, CONFIG.invoices)
              : entity === "payment"
                ? randInt(1, CONFIG.payments)
                : entity === "lab_order"
                  ? randInt(1, CONFIG.labOrders)
                  : entity === "prescription"
                    ? randInt(1, CONFIG.prescriptions)
                    : entity === "doctor"
                      ? randInt(1, CONFIG.doctors)
                      : randInt(1, CONFIG.patients);

    auditLogsWriter.writeRow([
      actorType,
      actorId,
      entity,
      entityId,
      pick(auditActionNames),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
      chance(0.3) ? faker.lorem.sentence() : null,
      JSON.stringify({ ip: faker.internet.ip(), ua: faker.internet.userAgent() }),
    ]);
  }
  await auditLogsWriter.close();

  console.log("✅ Generated Hospital seed CSVs");
  console.log(`- Output dir: ${OUTPUT_DIR}`);
  console.log(`- departments: ${CONFIG.departments}`);
  console.log(`- specializations: ${CONFIG.specializations}`);
  console.log(`- doctors: ${CONFIG.doctors}`);
  console.log(`- patients: ${CONFIG.patients}`);
  console.log(`- rooms: ${CONFIG.rooms} (beds: ${totalBeds})`);
  console.log(`- appointments: ${CONFIG.appointments}`);
  console.log(`- admissions: ${CONFIG.admissions}`);
  console.log(`- encounters: ${totalEncounters}`);
  console.log(`- invoices: ${CONFIG.invoices}`);
}

main().catch((err) => {
  console.error("hospitalGenerateData error:", err);
  process.exit(1);
});
