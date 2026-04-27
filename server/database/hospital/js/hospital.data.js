import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("hospital");

export const tableDescriptions = {
  admissions:
    "Inpatient admission records used for length-of-stay, bed usage, discharge, and throughput analysis",
  appointment_status_history:
    "Audit trail of appointment status changes such as scheduled, checked-in, completed, and cancelled",
  appointments:
    "Appointment lifecycle records including scheduling, wait time, no-show, and consultation completion",
  audit_logs:
    "Audit trail capturing operational and compliance sensitive actions across hospital entities",
  bed_allocations:
    "Bed assignment history for admissions including transfers and releases",
  beds: "Individual beds used for inpatient occupancy and utilization analytics",
  departments:
    "Hospital departments such as cardiology, radiology, emergency, ICU, billing, and administration",
  diagnoses:
    "Clinical diagnoses captured against encounters for disease prevalence and care pathway analysis",
  doctor_leaves:
    "Doctor leave records that affect scheduling and appointment rescheduling",
  doctor_schedules:
    "Recurring doctor availability schedules used for appointment slot generation and capacity analysis",
  doctor_specializations:
    "Mapping table allowing doctors to hold one or more specializations",
  doctors:
    "Doctors providing consultations, procedures, admissions, prescriptions, and result approvals",
  encounters:
    "Clinical visit or care encounter records linking outpatient, inpatient, emergency, and teleconsult activity",
  insurance_claims:
    "Insurance claim lifecycle records from submission to settlement or rejection",
  insurance_policies:
    "Patient insurance plans used for eligibility, billing, and claim workflows",
  insurance_providers:
    "Insurance companies and TPAs that reimburse hospital invoices",
  invoice_items:
    "Detailed invoice line items used for revenue, service mix, and billing accuracy analysis",
  invoices:
    "Billing invoices generated for encounters, admissions, labs, pharmacy, and procedures",
  lab_order_items:
    "Individual tests within a lab order tracked through collection, processing, and completion",
  lab_orders: "Lab order headers placed during patient encounters",
  lab_results:
    "Reported and approved lab result values for ordered diagnostic tests",
  lab_test_catalog:
    "Master list of lab and diagnostic tests with sample types and standard pricing",
  medications:
    "Medication master catalog for prescription and pharmacy billing use cases",
  patient_addresses:
    "Patient address history for home, work, billing, and temporary residence",
  patient_allergies:
    "Known patient allergies used in safety and medication screening",
  patient_conditions:
    "Longitudinal record of patient chronic or historical conditions",
  patient_feedback:
    "Patient satisfaction and experience feedback for consultation, wait time, staff, and billing",
  patients:
    "Master patient registry with demographic and emergency contact details",
  payments:
    "Payments received against hospital invoices including refunds and failures",
  prescription_items:
    "Line items of prescribed medicines with dosage, route, and duration",
  prescriptions: "Prescription headers issued during patient encounters",
  procedure_orders:
    "Procedure requests and completion records linked to encounters",
  procedures:
    "Procedure master catalog covering surgical and non-surgical interventions",
  rooms: "Hospital rooms across wards, ICU, OT, lab, and recovery areas",
  specializations: "Medical specializations used to classify doctor expertise",
  staff_users:
    "Non-doctor hospital staff such as nurses, receptionists, lab technicians, and billing executives",
  vital_signs:
    "Measured clinical vitals captured during encounters for longitudinal health analysis",
};

export const questions = [
  {
    app_id: appId,
    code: "HOSPITAL_001",
    title: "Total Patients Count",
    description:
      "Find the total number of patients registered in the hospital.",
    difficulty: "easy",
    expected_query: "SELECT COUNT(*) AS total_patients FROM patients;",
    solution_columns: ["total_patients"],
    tables: ["patients"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_002",
    title: "Active Doctors Count",
    description: "Find the total number of active doctors.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS active_doctors FROM doctors WHERE is_active = true;",
    solution_columns: ["active_doctors"],
    tables: ["doctors"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_003",
    title: "All Active Departments",
    description: "List all active departments in the hospital.",
    difficulty: "easy",
    expected_query:
      "SELECT id, department_code, name, department_type, floor_number FROM departments WHERE is_active = true ORDER BY name ASC, id ASC;",
    solution_columns: [
      "id",
      "department_code",
      "name",
      "department_type",
      "floor_number",
    ],
    tables: ["departments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "name", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_004",
    title: "Patients Registered Today",
    description: "Find patients who were registered today.",
    difficulty: "easy",
    expected_query:
      "SELECT id, patient_code, full_name, registered_at FROM patients WHERE DATE(registered_at) = CURRENT_DATE ORDER BY registered_at DESC, id ASC;",
    solution_columns: ["id", "patient_code", "full_name", "registered_at"],
    tables: ["patients"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "registered_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_005",
    title: "Available Beds",
    description: "List all beds that are currently available.",
    difficulty: "easy",
    expected_query:
      "SELECT id, room_id, bed_number, bed_type, bed_status FROM beds WHERE bed_status = 'available' AND is_active = true ORDER BY room_id ASC, bed_number ASC;",
    solution_columns: ["id", "room_id", "bed_number", "bed_type", "bed_status"],
    tables: ["beds"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "room_id", direction: "asc" },
        { column: "bed_number", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_006",
    title: "Scheduled Appointments",
    description: "Find all appointments that are currently scheduled.",
    difficulty: "easy",
    expected_query:
      "SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at FROM appointments WHERE appointment_status = 'scheduled' ORDER BY scheduled_start_at ASC, id ASC;",
    solution_columns: [
      "id",
      "appointment_number",
      "patient_id",
      "doctor_id",
      "scheduled_start_at",
      "scheduled_end_at",
    ],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "scheduled_start_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_007",
    title: "Doctors By Department",
    description: "List each doctor along with their department name.",
    difficulty: "easy",
    expected_query:
      "SELECT d.id, d.full_name, dp.name AS department_name FROM doctors d LEFT JOIN departments dp ON d.department_id = dp.id ORDER BY d.full_name ASC, d.id ASC;",
    solution_columns: ["id", "full_name", "department_name"],
    tables: ["doctors", "departments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "full_name", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_008",
    title: "Patients With Insurance",
    description: "Find patients who have at least one insurance policy.",
    difficulty: "easy",
    expected_query:
      "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN insurance_policies ip ON p.id = ip.patient_id ORDER BY p.id ASC;",
    solution_columns: ["id", "patient_code", "full_name"],
    tables: ["patients", "insurance_policies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_009",
    title: "Completed Lab Orders",
    description: "Find all lab orders that have been completed.",
    difficulty: "easy",
    expected_query:
      "SELECT id, lab_order_number, patient_id, encounter_id, ordered_at FROM lab_orders WHERE order_status = 'completed' ORDER BY ordered_at DESC, id ASC;",
    solution_columns: [
      "id",
      "lab_order_number",
      "patient_id",
      "encounter_id",
      "ordered_at",
    ],
    tables: ["lab_orders"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "ordered_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_010",
    title: "Paid Invoices",
    description: "Find all invoices that have been fully paid.",
    difficulty: "easy",
    expected_query:
      "SELECT id, invoice_number, patient_id, total_amount, issued_at FROM invoices WHERE invoice_status = 'paid' ORDER BY issued_at DESC, id ASC;",
    solution_columns: [
      "id",
      "invoice_number",
      "patient_id",
      "total_amount",
      "issued_at",
    ],
    tables: ["invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "issued_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_011",
    title: "Total Appointments Per Doctor",
    description:
      "Find the total number of appointments handled by each doctor.",
    difficulty: "easy",
    expected_query:
      "SELECT doctor_id, COUNT(*) AS total_appointments FROM appointments GROUP BY doctor_id ORDER BY total_appointments DESC, doctor_id ASC;",
    solution_columns: ["doctor_id", "total_appointments"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_appointments", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_012",
    title: "Patients With Allergies",
    description: "Find all patients who have at least one recorded allergy.",
    difficulty: "easy",
    expected_query:
      "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id ORDER BY p.id ASC;",
    solution_columns: ["id", "patient_code", "full_name"],
    tables: ["patients", "patient_allergies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_013",
    title: "Doctors On Leave",
    description: "Find doctors whose leave is currently approved.",
    difficulty: "easy",
    expected_query:
      "SELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date FROM doctor_leaves dl JOIN doctors d ON dl.doctor_id = d.id WHERE dl.approval_status = 'approved' ORDER BY dl.start_date ASC, dl.id ASC;",
    solution_columns: [
      "id",
      "doctor_id",
      "full_name",
      "leave_type",
      "start_date",
      "end_date",
    ],
    tables: ["doctor_leaves", "doctors"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "start_date", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_014",
    title: "Lab Tests Catalog",
    description: "List all active lab tests with their standard prices.",
    difficulty: "easy",
    expected_query:
      "SELECT id, test_code, test_name, test_category, standard_price FROM lab_test_catalog WHERE is_active = true ORDER BY test_name ASC, id ASC;",
    solution_columns: [
      "id",
      "test_code",
      "test_name",
      "test_category",
      "standard_price",
    ],
    tables: ["lab_test_catalog"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "test_name", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_015",
    title: "Primary Insurance Policies",
    description: "Find all insurance policies marked as primary.",
    difficulty: "easy",
    expected_query:
      "SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date FROM insurance_policies WHERE is_primary = true ORDER BY patient_id ASC, id ASC;",
    solution_columns: [
      "id",
      "patient_id",
      "insurance_provider_id",
      "policy_number",
      "plan_name",
      "coverage_start_date",
      "coverage_end_date",
    ],
    tables: ["insurance_policies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "patient_id", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_016",
    title: "Inpatient Admissions",
    description: "Find all admissions that are currently admitted.",
    difficulty: "easy",
    expected_query:
      "SELECT id, admission_number, patient_id, department_id, admitted_at FROM admissions WHERE admission_status = 'admitted' ORDER BY admitted_at DESC, id ASC;",
    solution_columns: [
      "id",
      "admission_number",
      "patient_id",
      "department_id",
      "admitted_at",
    ],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "admitted_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_017",
    title: "Doctors And Specializations",
    description:
      "List each doctor along with their primary specialization name.",
    difficulty: "easy",
    expected_query:
      "SELECT d.id, d.full_name, s.name AS specialization_name FROM doctors d LEFT JOIN specializations s ON d.primary_specialization_id = s.id ORDER BY d.full_name ASC, d.id ASC;",
    solution_columns: ["id", "full_name", "specialization_name"],
    tables: ["doctors", "specializations"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "full_name", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_018",
    title: "Payments Received",
    description: "Find all successful payments received against invoices.",
    difficulty: "easy",
    expected_query:
      "SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at FROM payments WHERE payment_status = 'successful' ORDER BY paid_at DESC, id ASC;",
    solution_columns: [
      "id",
      "payment_number",
      "invoice_id",
      "payment_method",
      "amount_paid",
      "paid_at",
    ],
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
    code: "HOSPITAL_019",
    title: "Pending Insurance Claims",
    description: "Find all insurance claims that are under review.",
    difficulty: "easy",
    expected_query:
      "SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at FROM insurance_claims WHERE claim_status = 'under_review' ORDER BY submitted_at ASC, id ASC;",
    solution_columns: [
      "id",
      "claim_number",
      "invoice_id",
      "insurance_policy_id",
      "claimed_amount",
      "submitted_at",
    ],
    tables: ["insurance_claims"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "submitted_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_020",
    title: "Patient Feedback Ratings",
    description: "List all patient feedback entries with ratings.",
    difficulty: "easy",
    expected_query:
      "SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM patient_feedback ORDER BY created_at DESC, id ASC;",
    solution_columns: [
      "id",
      "patient_id",
      "doctor_id",
      "rating",
      "feedback_category",
      "created_at",
    ],
    tables: ["patient_feedback"],
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
    code: "HOSPITAL_021",
    title: "Average Consultation Fee By Department",
    description:
      "Find the average consultation fee for doctors in each department.",
    difficulty: "easy",
    expected_query:
      "SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ORDER BY avg_consultation_fee DESC, d.department_id ASC;",
    solution_columns: [
      "department_id",
      "department_name",
      "avg_consultation_fee",
    ],
    tables: ["doctors", "departments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_consultation_fee", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_022",
    title: "Appointment Count By Status",
    description:
      "Find the total number of appointments for each appointment status.",
    difficulty: "easy",
    expected_query:
      "SELECT appointment_status, COUNT(*) AS total_appointments FROM appointments GROUP BY appointment_status ORDER BY total_appointments DESC, appointment_status ASC;",
    solution_columns: ["appointment_status", "total_appointments"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_appointments", direction: "desc" },
        { column: "appointment_status", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_023",
    title: "Occupied Beds Count",
    description: "Find the total number of currently occupied beds.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS occupied_beds FROM beds WHERE bed_status = 'occupied';",
    solution_columns: ["occupied_beds"],
    tables: ["beds"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_024",
    title: "Admissions By Department",
    description: "Find the number of admissions for each department.",
    difficulty: "easy",
    expected_query:
      "SELECT department_id, COUNT(*) AS total_admissions FROM admissions GROUP BY department_id ORDER BY total_admissions DESC, department_id ASC;",
    solution_columns: ["department_id", "total_admissions"],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_admissions", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_025",
    title: "Total Invoice Amount By Patient",
    description: "Find the total invoiced amount for each patient.",
    difficulty: "easy",
    expected_query:
      "SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ORDER BY total_invoice_amount DESC, patient_id ASC;",
    solution_columns: ["patient_id", "total_invoice_amount"],
    tables: ["invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_invoice_amount", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_026",
    title: "Lab Orders Per Patient",
    description: "Find the total number of lab orders for each patient.",
    difficulty: "easy",
    expected_query:
      "SELECT patient_id, COUNT(*) AS total_lab_orders FROM lab_orders GROUP BY patient_id ORDER BY total_lab_orders DESC, patient_id ASC;",
    solution_columns: ["patient_id", "total_lab_orders"],
    tables: ["lab_orders"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_lab_orders", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_027",
    title: "Prescriptions Per Doctor",
    description:
      "Find the total number of prescriptions written by each doctor.",
    difficulty: "easy",
    expected_query:
      "SELECT doctor_id, COUNT(*) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ORDER BY total_prescriptions DESC, doctor_id ASC;",
    solution_columns: ["doctor_id", "total_prescriptions"],
    tables: ["prescriptions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_prescriptions", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_028",
    title: "Critical Lab Results",
    description: "Find all lab results marked as critical.",
    difficulty: "easy",
    expected_query:
      "SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation = 'critical' ORDER BY resulted_at DESC, id ASC;",
    solution_columns: [
      "id",
      "lab_order_item_id",
      "result_value",
      "interpretation",
      "resulted_at",
    ],
    tables: ["lab_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "resulted_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_029",
    title: "Doctors By Experience",
    description: "List doctors ordered by years of experience.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, years_of_experience FROM doctors ORDER BY years_of_experience DESC NULLS LAST, id ASC;",
    solution_columns: ["id", "full_name", "years_of_experience"],
    tables: ["doctors"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "years_of_experience", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_030",
    title: "Patients With Chronic Conditions",
    description: "Find all patients who have at least one chronic condition.",
    difficulty: "easy",
    expected_query:
      "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_conditions pc ON p.id = pc.patient_id WHERE pc.condition_status = 'chronic' ORDER BY p.id ASC;",
    solution_columns: ["id", "patient_code", "full_name"],
    tables: ["patients", "patient_conditions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_031",
    title: "Average Length Of Stay",
    description:
      "Find the average length of stay in days for discharged admissions.",
    difficulty: "easy",
    expected_query:
      "SELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400), 2) AS avg_length_of_stay_days FROM admissions WHERE admission_status = 'discharged' AND discharge_at IS NOT NULL;",
    solution_columns: ["avg_length_of_stay_days"],
    tables: ["admissions"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_032",
    title: "Daily Registrations",
    description: "Find the number of patients registered each day.",
    difficulty: "easy",
    expected_query:
      "SELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY DATE(registered_at) ORDER BY registration_date ASC;",
    solution_columns: ["registration_date", "total_patients"],
    tables: ["patients"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "registration_date", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_033",
    title: "Revenue By Payment Method",
    description: "Find the total successful payment amount by payment method.",
    difficulty: "easy",
    expected_query:
      "SELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY total_revenue DESC, payment_method ASC;",
    solution_columns: ["payment_method", "total_revenue"],
    tables: ["payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_revenue", direction: "desc" },
        { column: "payment_method", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_034",
    title: "Doctors Per Specialization",
    description: "Find the number of doctors for each specialization.",
    difficulty: "easy",
    expected_query:
      "SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s LEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ORDER BY total_doctors DESC, s.id ASC;",
    solution_columns: [
      "specialization_id",
      "specialization_name",
      "total_doctors",
    ],
    tables: ["specializations", "doctor_specializations"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_doctors", direction: "desc" },
        { column: "specialization_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_035",
    title: "Completed Procedures Count",
    description: "Find the total number of completed procedure orders.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed';",
    solution_columns: ["completed_procedures"],
    tables: ["procedure_orders"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_036",
    title: "Appointments Per Day",
    description: "Find the total number of appointments scheduled each day.",
    difficulty: "medium",
    expected_query:
      "SELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY DATE(scheduled_start_at) ORDER BY appointment_date ASC;",
    solution_columns: ["appointment_date", "total_appointments"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "appointment_date", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_037",
    title: "Top Doctors By Appointment Volume",
    description:
      "Find the top 5 doctors with the highest number of completed appointments.",
    difficulty: "medium",
    expected_query:
      "SELECT doctor_id, COUNT(*) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;",
    solution_columns: ["doctor_id", "completed_appointments"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "completed_appointments", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_038",
    title: "Department Revenue",
    description:
      "Find total invoice revenue generated by each department through encounters.",
    difficulty: "medium",
    expected_query:
      "SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ORDER BY total_revenue DESC, e.department_id ASC;",
    solution_columns: ["department_id", "total_revenue"],
    tables: ["invoices", "encounters"],
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
    code: "HOSPITAL_039",
    title: "Patients With Multiple Admissions",
    description: "Find patients who have been admitted more than once.",
    difficulty: "medium",
    expected_query:
      "SELECT patient_id, COUNT(*) AS admission_count FROM admissions GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY admission_count DESC, patient_id ASC;",
    solution_columns: ["patient_id", "admission_count"],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "admission_count", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_040",
    title: "Average Wait Time By Doctor",
    description: "Find average patient wait time in minutes for each doctor.",
    difficulty: "medium",
    expected_query:
      "SELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60), 2) AS avg_wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL GROUP BY doctor_id ORDER BY avg_wait_time_mins DESC, doctor_id ASC;",
    solution_columns: ["doctor_id", "avg_wait_time_mins"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_wait_time_mins", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_041",
    title: "No Show Rate By Doctor",
    description: "Find the no-show rate percentage for each doctor.",
    difficulty: "medium",
    expected_query:
      "SELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ORDER BY no_show_rate_pct DESC, doctor_id ASC;",
    solution_columns: ["doctor_id", "no_show_rate_pct"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "no_show_rate_pct", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_042",
    title: "Bed Occupancy By Room",
    description: "Find the number of occupied beds in each room.",
    difficulty: "medium",
    expected_query:
      "SELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied' GROUP BY r.id, r.room_number ORDER BY occupied_beds DESC, r.id ASC;",
    solution_columns: ["room_id", "room_number", "occupied_beds"],
    tables: ["rooms", "beds"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "occupied_beds", direction: "desc" },
        { column: "room_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_043",
    title: "Patients With Multiple Allergies",
    description: "Find patients who have more than one recorded allergy.",
    difficulty: "medium",
    expected_query:
      "SELECT patient_id, COUNT(*) AS allergy_count FROM patient_allergies GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY allergy_count DESC, patient_id ASC;",
    solution_columns: ["patient_id", "allergy_count"],
    tables: ["patient_allergies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "allergy_count", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_044",
    title: "Insurance Claim Approval Rate By Provider",
    description:
      "Find the insurance claim approval rate percentage for each insurance provider.",
    difficulty: "medium",
    expected_query:
      "SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY approval_rate_pct DESC, ipr.id ASC;",
    solution_columns: [
      "insurance_provider_id",
      "provider_name",
      "approval_rate_pct",
    ],
    tables: ["insurance_claims", "insurance_policies", "insurance_providers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "approval_rate_pct", direction: "desc" },
        { column: "insurance_provider_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_045",
    title: "Average Lab Turnaround By Test",
    description: "Find the average turnaround time in hours for each lab test.",
    difficulty: "medium",
    expected_query:
      "SELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600), 2) AS avg_turnaround_hours FROM lab_order_items loi JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE loi.sample_collected_at IS NOT NULL AND loi.completed_at IS NOT NULL GROUP BY ltc.id, ltc.test_name ORDER BY avg_turnaround_hours DESC, ltc.id ASC;",
    solution_columns: ["test_id", "test_name", "avg_turnaround_hours"],
    tables: ["lab_order_items", "lab_test_catalog"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_turnaround_hours", direction: "desc" },
        { column: "test_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_046",
    title: "Doctors Working In Multiple Specializations",
    description: "Find doctors associated with more than one specialization.",
    difficulty: "medium",
    expected_query:
      "SELECT doctor_id, COUNT(*) AS specialization_count FROM doctor_specializations GROUP BY doctor_id HAVING COUNT(*) > 1 ORDER BY specialization_count DESC, doctor_id ASC;",
    solution_columns: ["doctor_id", "specialization_count"],
    tables: ["doctor_specializations"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "specialization_count", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_047",
    title: "Outstanding Amount By Invoice",
    description:
      "Find the outstanding amount for each invoice after successful payments.",
    difficulty: "medium",
    expected_query:
      "SELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS outstanding_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY outstanding_amount DESC, i.id ASC;",
    solution_columns: ["id", "invoice_number", "outstanding_amount"],
    tables: ["invoices", "payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "outstanding_amount", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_048",
    title: "Monthly Patient Registrations",
    description: "Find the total number of patients registered each month.",
    difficulty: "medium",
    expected_query:
      "SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ORDER BY registration_month ASC;",
    solution_columns: ["registration_month", "total_patients"],
    tables: ["patients"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "registration_month", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_049",
    title: "Average Admission Duration By Department",
    description:
      "Find the average admission duration in days for each department.",
    difficulty: "medium",
    expected_query:
      "SELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400), 2) AS avg_admission_days FROM admissions GROUP BY department_id ORDER BY avg_admission_days DESC, department_id ASC;",
    solution_columns: ["department_id", "avg_admission_days"],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_admission_days", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_050",
    title: "Top Patients By Billing",
    description: "Find the top 10 patients by total invoice amount.",
    difficulty: "medium",
    expected_query:
      "SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;",
    solution_columns: ["patient_id", "total_billed_amount"],
    tables: ["invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_billed_amount", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_051",
    title: "Patients With Both Appointment And Admission",
    description:
      "Find patients who have at least one appointment and at least one admission.",
    difficulty: "medium",
    expected_query:
      "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id) AND EXISTS (SELECT 1 FROM admissions ad WHERE ad.patient_id = p.id) ORDER BY p.id ASC;",
    solution_columns: ["id", "patient_code", "full_name"],
    tables: ["patients", "appointments", "admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_052",
    title: "Average Feedback Rating By Doctor",
    description: "Find the average patient feedback rating for each doctor.",
    difficulty: "medium",
    expected_query:
      "SELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating FROM patient_feedback WHERE doctor_id IS NOT NULL GROUP BY doctor_id ORDER BY avg_rating DESC, doctor_id ASC;",
    solution_columns: ["doctor_id", "avg_rating"],
    tables: ["patient_feedback"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_rating", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_053",
    title: "Most Used Medications",
    description: "Find the top 10 medications prescribed most frequently.",
    difficulty: "medium",
    expected_query:
      "SELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ORDER BY prescription_count DESC, m.id ASC LIMIT 10;",
    solution_columns: ["medication_id", "generic_name", "prescription_count"],
    tables: ["prescription_items", "medications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "prescription_count", direction: "desc" },
        { column: "medication_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_054",
    title: "Completed Appointments With Feedback",
    description: "Find completed appointments that have a feedback entry.",
    difficulty: "medium",
    expected_query:
      "SELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating FROM appointments a JOIN patient_feedback pf ON a.id = pf.appointment_id WHERE a.appointment_status = 'completed' ORDER BY a.id ASC, pf.id ASC;",
    solution_columns: [
      "id",
      "appointment_number",
      "patient_id",
      "doctor_id",
      "feedback_id",
      "rating",
    ],
    tables: ["appointments", "patient_feedback"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "id", direction: "asc" },
        { column: "feedback_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_055",
    title: "Doctor Schedule Hours Per Weekday",
    description:
      "Find the total scheduled hours for each doctor on each weekday.",
    difficulty: "medium",
    expected_query:
      "SELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600), 2) AS scheduled_hours FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;",
    solution_columns: ["doctor_id", "day_of_week", "scheduled_hours"],
    tables: ["doctor_schedules"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "doctor_id", direction: "asc" },
        { column: "day_of_week", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_056",
    title: "Patients With Critical Or Severe Allergies",
    description:
      "Find patients who have at least one allergy marked severe or critical.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id WHERE pa.severity IN ('severe', 'critical') ORDER BY p.id ASC;",
    solution_columns: ["id", "patient_code", "full_name"],
    tables: ["patients", "patient_allergies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_057",
    title: "Revenue By Invoice Type",
    description: "Find total invoiced revenue for each invoice type.",
    difficulty: "medium",
    expected_query:
      "SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ORDER BY total_revenue DESC, invoice_type ASC;",
    solution_columns: ["invoice_type", "total_revenue"],
    tables: ["invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_revenue", direction: "desc" },
        { column: "invoice_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_058",
    title: "Admissions Without Bed Allocation",
    description:
      "Find admitted patients who do not yet have any bed allocation.",
    difficulty: "medium",
    expected_query:
      "SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a LEFT JOIN bed_allocations ba ON a.id = ba.admission_id AND ba.allocation_status = 'active' WHERE a.admission_status = 'admitted' AND ba.id IS NULL ORDER BY a.admitted_at ASC, a.id ASC;",
    solution_columns: [
      "id",
      "admission_number",
      "patient_id",
      "department_id",
      "admitted_at",
    ],
    tables: ["admissions", "bed_allocations"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "admitted_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_059",
    title: "Appointments Outside Doctor Availability",
    description:
      "Find appointments whose scheduled weekday has no active doctor schedule entry.",
    difficulty: "medium",
    expected_query:
      "SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a LEFT JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to) WHERE ds.id IS NULL ORDER BY a.scheduled_start_at ASC, a.id ASC;",
    solution_columns: [
      "id",
      "appointment_number",
      "doctor_id",
      "scheduled_start_at",
    ],
    tables: ["appointments", "doctor_schedules"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "scheduled_start_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_060",
    title: "Average Payment Collection Delay",
    description:
      "Find the average number of days between invoice issue date and successful payment date.",
    difficulty: "medium",
    expected_query:
      "SELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400), 2) AS avg_collection_delay_days FROM invoices i JOIN payments p ON i.id = p.invoice_id WHERE i.issued_at IS NOT NULL AND p.payment_status = 'successful' AND p.paid_at IS NOT NULL;",
    solution_columns: ["avg_collection_delay_days"],
    tables: ["invoices", "payments"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_061",
    title: "Most Common Diagnoses",
    description: "Find the top 10 most frequently recorded diagnoses.",
    difficulty: "medium",
    expected_query:
      "SELECT diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;",
    solution_columns: ["diagnosis_name", "diagnosis_count"],
    tables: ["diagnoses"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "diagnosis_count", direction: "desc" },
        { column: "diagnosis_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_062",
    title: "Patients With Abnormal Lab Results",
    description:
      "Find patients who have at least one abnormal or critical lab result.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN lab_orders lo ON p.id = lo.patient_id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low', 'critical') ORDER BY p.id ASC;",
    solution_columns: ["id", "patient_code", "full_name"],
    tables: ["patients", "lab_orders", "lab_order_items", "lab_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_063",
    title: "Monthly Revenue Collection",
    description:
      "Find the total successful payment amount collected each month.",
    difficulty: "medium",
    expected_query:
      "SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ORDER BY payment_month ASC;",
    solution_columns: ["payment_month", "total_collected_amount"],
    tables: ["payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "payment_month", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_064",
    title: "Average Patients Per Doctor Schedule Slot",
    description:
      "Find the average number of appointments booked per doctor schedule weekday.",
    difficulty: "medium",
    expected_query:
      "SELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(slot_appointments.appointment_count), 2) AS avg_appointments_per_slot_day FROM doctor_schedules ds JOIN (SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at)) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week WHERE ds.is_active = true GROUP BY ds.doctor_id, ds.day_of_week ORDER BY ds.doctor_id ASC, ds.day_of_week ASC;",
    solution_columns: [
      "doctor_id",
      "day_of_week",
      "avg_appointments_per_slot_day",
    ],
    tables: ["doctor_schedules", "appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "doctor_id", direction: "asc" },
        { column: "day_of_week", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_065",
    title: "Open Encounters By Department",
    description:
      "Find the total number of currently open encounters for each department.",
    difficulty: "medium",
    expected_query:
      "SELECT department_id, COUNT(*) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ORDER BY open_encounters DESC, department_id ASC;",
    solution_columns: ["department_id", "open_encounters"],
    tables: ["encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "open_encounters", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_066",
    title: "Insurance Coverage Split By Invoice",
    description:
      "Find each invoice with insurance-covered amount and patient-payable amount.",
    difficulty: "medium",
    expected_query:
      "SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ORDER BY total_amount DESC, id ASC;",
    solution_columns: [
      "id",
      "invoice_number",
      "total_amount",
      "insurance_covered_amount",
      "patient_payable_amount",
    ],
    tables: ["invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_amount", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_067",
    title: "Doctors With No Appointments",
    description: "Find active doctors who have never had any appointment.",
    difficulty: "medium",
    expected_query:
      "SELECT d.id, d.full_name, d.department_id FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id WHERE d.is_active = true GROUP BY d.id, d.full_name, d.department_id HAVING COUNT(a.id) = 0 ORDER BY d.id ASC;",
    solution_columns: ["id", "full_name", "department_id"],
    tables: ["doctors", "appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_068",
    title: "Cancelled Appointment Rate By Department",
    description:
      "Find the cancellation rate percentage for appointments in each department.",
    difficulty: "medium",
    expected_query:
      "SELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ORDER BY cancellation_rate_pct DESC, department_id ASC;",
    solution_columns: ["department_id", "cancellation_rate_pct"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "cancellation_rate_pct", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_069",
    title: "Procedure Completion Rate",
    description: "Find the completion rate percentage for each procedure.",
    difficulty: "medium",
    expected_query:
      "SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ORDER BY completion_rate_pct DESC, p.id ASC;",
    solution_columns: ["procedure_id", "procedure_name", "completion_rate_pct"],
    tables: ["procedure_orders", "procedures"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "completion_rate_pct", direction: "desc" },
        { column: "procedure_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_070",
    title: "Patients With Multiple Encounter Types",
    description:
      "Find patients who have records in more than one encounter type.",
    difficulty: "medium",
    expected_query:
      "SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id HAVING COUNT(DISTINCT encounter_type) > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;",
    solution_columns: ["patient_id", "distinct_encounter_types"],
    tables: ["encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_encounter_types", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_071",
    title: "Top Departments By Patient Volume",
    description:
      "Find the top 5 departments with the highest number of distinct patients across encounters.",
    difficulty: "medium",
    expected_query:
      "SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_patients DESC, department_id ASC LIMIT 5;",
    solution_columns: ["department_id", "total_patients"],
    tables: ["encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_patients", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_072",
    title: "Bed Utilization Percentage By Room",
    description: "Find the current bed utilization percentage for each room.",
    difficulty: "medium",
    expected_query:
      "SELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY utilization_pct DESC, r.id ASC;",
    solution_columns: ["room_id", "room_number", "utilization_pct"],
    tables: ["rooms", "beds"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "utilization_pct", direction: "desc" },
        { column: "room_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_073",
    title: "Doctors With Highest Revenue",
    description:
      "Find the top 10 doctors generating the highest total invoice revenue through encounters.",
    difficulty: "medium",
    expected_query:
      "SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;",
    solution_columns: ["doctor_id", "total_revenue"],
    tables: ["invoices", "encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_revenue", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_074",
    title: "Patients With Frequent No Shows",
    description: "Find patients with more than 2 no-show appointments.",
    difficulty: "medium",
    expected_query:
      "SELECT patient_id, COUNT(*) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id HAVING COUNT(*) > 2 ORDER BY no_show_count DESC, patient_id ASC;",
    solution_columns: ["patient_id", "no_show_count"],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "no_show_count", direction: "desc" },
        { column: "patient_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_075",
    title: "Insurance Rejection Rate By Provider",
    description:
      "Find the insurance claim rejection rate percentage for each provider.",
    difficulty: "medium",
    expected_query:
      "SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;",
    solution_columns: [
      "insurance_provider_id",
      "provider_name",
      "rejection_rate_pct",
    ],
    tables: ["insurance_claims", "insurance_policies", "insurance_providers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "rejection_rate_pct", direction: "desc" },
        { column: "insurance_provider_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_076",
    title: "Top Diagnoses By Department",
    description: "Find the most frequent diagnosis in each department.",
    difficulty: "hard",
    expected_query:
      "WITH diagnosis_counts AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, d.diagnosis_name ASC) AS rn FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ) SELECT department_id, diagnosis_name, diagnosis_count FROM diagnosis_counts WHERE rn = 1 ORDER BY department_id ASC;",
    solution_columns: ["department_id", "diagnosis_name", "diagnosis_count"],
    tables: ["diagnoses", "encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "department_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_077",
    title: "Longest Current Admissions",
    description:
      "Find the top 10 currently admitted patients with the longest ongoing stay.",
    difficulty: "hard",
    expected_query:
      "SELECT id, patient_id, admitted_at, ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days FROM admissions WHERE admission_status = 'admitted' ORDER BY stay_days DESC, id ASC LIMIT 10;",
    solution_columns: ["id", "patient_id", "admitted_at", "stay_days"],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "stay_days", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_078",
    title: "Doctor Utilization Ratio",
    description:
      "Find each doctor’s utilization ratio based on completed appointments over scheduled slots.",
    difficulty: "hard",
    expected_query:
      "WITH scheduled_slots AS ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ), completed_appts AS ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) SELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM scheduled_slots s LEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id ORDER BY utilization_ratio DESC, s.doctor_id ASC;",
    solution_columns: ["doctor_id", "utilization_ratio"],
    tables: ["doctor_schedules", "appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "utilization_ratio", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_079",
    title: "Repeat Admission Within 30 Days",
    description:
      "Find patients who were readmitted within 30 days of discharge.",
    difficulty: "hard",
    expected_query:
      "WITH ordered_admissions AS ( SELECT patient_id, admitted_at, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL ) SELECT patient_id, discharge_at, next_admission_at FROM ordered_admissions WHERE next_admission_at <= discharge_at + INTERVAL '30 days' ORDER BY patient_id ASC, discharge_at ASC;",
    solution_columns: ["patient_id", "discharge_at", "next_admission_at"],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "patient_id", direction: "asc" },
        { column: "discharge_at", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_080",
    title: "Top Revenue Patients Per Month",
    description: "Find the highest billed patient for each month.",
    difficulty: "hard",
    expected_query:
      "WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rn FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ) SELECT billing_month, patient_id, total_revenue FROM monthly_patient_revenue WHERE rn = 1 ORDER BY billing_month ASC;",
    solution_columns: ["billing_month", "patient_id", "total_revenue"],
    tables: ["invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "billing_month", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_081",
    title: "Department Bed Occupancy Leader",
    description:
      "Find the department with the highest number of currently occupied beds.",
    difficulty: "hard",
    expected_query:
      "WITH department_bed_usage AS ( SELECT r.department_id, COUNT(*) AS occupied_beds, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, r.department_id ASC) AS rn FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ) SELECT department_id, occupied_beds FROM department_bed_usage WHERE rn = 1;",
    solution_columns: ["department_id", "occupied_beds"],
    tables: ["beds", "rooms"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_082",
    title: "Patients With Consecutive Critical Lab Results",
    description:
      "Find patients who had at least two consecutive critical lab results over time.",
    difficulty: "hard",
    expected_query:
      "WITH patient_lab_results AS ( SELECT lo.patient_id, lr.resulted_at, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ) SELECT DISTINCT patient_id FROM patient_lab_results WHERE interpretation = 'critical' AND prev_interpretation = 'critical' ORDER BY patient_id ASC;",
    solution_columns: ["patient_id"],
    tables: ["lab_results", "lab_order_items", "lab_orders"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "patient_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_083",
    title: "Doctor Revenue Rank Within Department",
    description:
      "Rank doctors within each department by total invoice revenue from encounters.",
    difficulty: "hard",
    expected_query:
      "WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;",
    solution_columns: [
      "department_id",
      "doctor_id",
      "total_revenue",
      "revenue_rank",
    ],
    tables: ["encounters", "invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "department_id", direction: "asc" },
        { column: "revenue_rank", direction: "asc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_084",
    title: "Longest Wait Appointment Per Doctor",
    description:
      "Find the appointment with the longest wait time for each doctor.",
    difficulty: "hard",
    expected_query:
      "WITH doctor_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC) AS rn FROM appointments WHERE consultation_started_at IS NOT NULL ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM doctor_waits WHERE rn = 1 ORDER BY doctor_id ASC;",
    solution_columns: [
      "id",
      "doctor_id",
      "patient_id",
      "scheduled_start_at",
      "consultation_started_at",
      "wait_time_mins",
    ],
    tables: ["appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "doctor_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_085",
    title: "Insurance Underpayment Cases",
    description:
      "Find claims where the approved amount is less than the insurance-covered amount on the linked invoice.",
    difficulty: "hard",
    expected_query:
      "SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ORDER BY (i.insurance_covered_amount - ic.approved_amount) DESC, ic.id ASC;",
    solution_columns: [
      "id",
      "claim_number",
      "invoice_id",
      "insurance_covered_amount",
      "approved_amount",
    ],
    tables: ["insurance_claims", "invoices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "insurance_covered_amount", direction: "desc" },
        { column: "approved_amount", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_086",
    title: "Patient Encounter Gap Analysis",
    description:
      "Find the number of days between consecutive encounters for each patient.",
    difficulty: "hard",
    expected_query:
      "WITH ordered_encounters AS ( SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at FROM encounters ) SELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days FROM ordered_encounters WHERE previous_encounter_at IS NOT NULL ORDER BY patient_id ASC, started_at ASC;",
    solution_columns: [
      "patient_id",
      "encounter_id",
      "previous_encounter_at",
      "started_at",
      "gap_days",
    ],
    tables: ["encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "patient_id", direction: "asc" },
        { column: "started_at", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_087",
    title: "Most Prescribed Medication Per Doctor",
    description:
      "Find the most frequently prescribed medication for each doctor.",
    difficulty: "hard",
    expected_query:
      "WITH doctor_medication_counts AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count, ROW_NUMBER() OVER (PARTITION BY p.doctor_id ORDER BY COUNT(*) DESC, pi.medication_id ASC) AS rn FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ) SELECT doctor_id, medication_id, prescription_count FROM doctor_medication_counts WHERE rn = 1 ORDER BY doctor_id ASC;",
    solution_columns: ["doctor_id", "medication_id", "prescription_count"],
    tables: ["prescriptions", "prescription_items"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "doctor_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_088",
    title: "Patients Exceeding Policy Coverage Window",
    description:
      "Find invoices billed outside the active coverage dates of the linked insurance policy.",
    difficulty: "hard",
    expected_query:
      "SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id WHERE DATE(i.created_at) < ip.coverage_start_date OR (ip.coverage_end_date IS NOT NULL AND DATE(i.created_at) > ip.coverage_end_date) ORDER BY i.created_at ASC, i.id ASC;",
    solution_columns: [
      "id",
      "invoice_number",
      "patient_id",
      "insurance_policy_id",
      "created_at",
      "coverage_start_date",
      "coverage_end_date",
    ],
    tables: ["invoices", "insurance_policies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_089",
    title: "Department Readmission Rate",
    description:
      "Find the 30-day readmission rate percentage for each department.",
    difficulty: "hard",
    expected_query:
      "WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ) SELECT department_id, ROUND(100.0 * SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) / COUNT(*), 2) AS readmission_rate_pct FROM readmission_flags GROUP BY department_id ORDER BY readmission_rate_pct DESC, department_id ASC;",
    solution_columns: ["department_id", "readmission_rate_pct"],
    tables: ["admissions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "readmission_rate_pct", direction: "desc" },
        { column: "department_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_090",
    title: "Department Monthly Revenue Growth",
    description:
      "Find month-over-month invoice revenue growth for each department.",
    difficulty: "hard",
    expected_query:
      "WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ), revenue_with_prev AS ( SELECT department_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ) SELECT department_id, revenue_month, total_revenue, prev_month_revenue, ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth FROM revenue_with_prev WHERE prev_month_revenue IS NOT NULL ORDER BY department_id ASC, revenue_month ASC;",
    solution_columns: [
      "department_id",
      "revenue_month",
      "total_revenue",
      "prev_month_revenue",
      "revenue_growth",
    ],
    tables: ["invoices", "encounters"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "department_id", direction: "asc" },
        { column: "revenue_month", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_091",
    title: "Doctor Schedule Overbooking Risk",
    description:
      "Find doctor schedule weekdays where completed appointments exceed scheduled capacity.",
    difficulty: "hard",
    expected_query:
      "WITH schedule_capacity AS ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ), completed_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ) SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count FROM schedule_capacity sc LEFT JOIN completed_appointments ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week WHERE COALESCE(ca.completed_count, 0) > sc.total_capacity ORDER BY completed_count DESC, sc.doctor_id ASC, sc.day_of_week ASC;",
    solution_columns: [
      "doctor_id",
      "day_of_week",
      "total_capacity",
      "completed_count",
    ],
    tables: ["doctor_schedules", "appointments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "completed_count", direction: "desc" },
        { column: "doctor_id", direction: "asc" },
        { column: "day_of_week", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_092",
    title: "Patients With Both High And Low Lab Results",
    description:
      "Find patients who have had at least one high lab result and at least one low lab result.",
    difficulty: "hard",
    expected_query:
      "SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low') GROUP BY lo.patient_id HAVING COUNT(DISTINCT lr.interpretation) = 2 ORDER BY lo.patient_id ASC;",
    solution_columns: ["patient_id"],
    tables: ["lab_orders", "lab_order_items", "lab_results"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "patient_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_093",
    title: "Longest Bed Transfer Chain Per Admission",
    description:
      "Find admissions with the highest number of bed allocation changes.",
    difficulty: "hard",
    expected_query:
      "SELECT admission_id, COUNT(*) AS allocation_count FROM bed_allocations GROUP BY admission_id HAVING COUNT(*) > 1 ORDER BY allocation_count DESC, admission_id ASC;",
    solution_columns: ["admission_id", "allocation_count"],
    tables: ["bed_allocations"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "allocation_count", direction: "desc" },
        { column: "admission_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_094",
    title: "Doctor Prescription Diversity Rank",
    description:
      "Rank doctors by the number of distinct medications they have prescribed.",
    difficulty: "hard",
    expected_query:
      "WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ) SELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ORDER BY diversity_rank ASC, doctor_id ASC;",
    solution_columns: ["doctor_id", "distinct_medications", "diversity_rank"],
    tables: ["prescriptions", "prescription_items"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "diversity_rank", direction: "asc" },
        { column: "doctor_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_095",
    title: "Patients With Rising BMI Trend",
    description:
      "Find patients whose latest BMI is greater than their earliest recorded BMI.",
    difficulty: "hard",
    expected_query:
      "WITH bmi_history AS ( SELECT patient_id, recorded_at, bmi, FIRST_VALUE(bmi) OVER (PARTITION BY patient_id ORDER BY recorded_at, id) AS first_bmi, LAST_VALUE(bmi) OVER (PARTITION BY patient_id ORDER BY recorded_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_bmi FROM vital_signs WHERE bmi IS NOT NULL ) SELECT DISTINCT patient_id, first_bmi, last_bmi FROM bmi_history WHERE last_bmi > first_bmi ORDER BY patient_id ASC;",
    solution_columns: ["patient_id", "first_bmi", "last_bmi"],
    tables: ["vital_signs"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "patient_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_096",
    title: "Top Procedure Revenue Contributors",
    description:
      "Find the top 10 procedures generating the highest billed revenue from invoice items.",
    difficulty: "hard",
    expected_query:
      "SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ORDER BY total_revenue DESC, po.procedure_id ASC LIMIT 10;",
    solution_columns: ["procedure_id", "total_revenue"],
    tables: ["invoice_items", "procedure_orders"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_revenue", direction: "desc" },
        { column: "procedure_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_097",
    title: "Patients With Concurrent Active Policies",
    description:
      "Find patients who had overlapping insurance policy coverage periods.",
    difficulty: "hard",
    expected_query:
      "WITH policy_pairs AS ( SELECT ip1.patient_id, ip1.id AS policy_id_1, ip2.id AS policy_id_2, ip1.coverage_start_date AS start_1, ip1.coverage_end_date AS end_1, ip2.coverage_start_date AS start_2, ip2.coverage_end_date AS end_2 FROM insurance_policies ip1 JOIN insurance_policies ip2 ON ip1.patient_id = ip2.patient_id AND ip1.id < ip2.id ) SELECT DISTINCT patient_id FROM policy_pairs WHERE COALESCE(end_1, DATE '9999-12-31') >= start_2 AND COALESCE(end_2, DATE '9999-12-31') >= start_1 ORDER BY patient_id ASC;",
    solution_columns: ["patient_id"],
    tables: ["insurance_policies"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "patient_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_098",
    title: "Doctor Follow Up Conversion Rate",
    description:
      "Find the percentage of completed consultation appointments that led to a follow-up appointment for the same patient-doctor pair later.",
    difficulty: "hard",
    expected_query:
      "WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ), followups AS ( SELECT cc.id AS appointment_id, CASE WHEN EXISTS ( SELECT 1 FROM appointments a2 WHERE a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at ) THEN 1 ELSE 0 END AS has_followup FROM completed_consults cc ) SELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct FROM followups;",
    solution_columns: ["follow_up_conversion_rate_pct"],
    tables: ["appointments"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "HOSPITAL_099",
    title: "Department Diagnostic Mix Leader",
    description:
      "For each department, find the lab test category with the highest number of ordered tests.",
    difficulty: "hard",
    expected_query:
      "WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rn FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ) SELECT department_id, test_category, total_tests FROM category_counts WHERE rn = 1 ORDER BY department_id ASC;",
    solution_columns: ["department_id", "test_category", "total_tests"],
    tables: ["lab_orders", "encounters", "lab_order_items", "lab_test_catalog"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "department_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "HOSPITAL_100",
    title: "Top Margin Gap Invoices",
    description:
      "Find the top 10 invoices with the largest gap between total billed amount and successful payments received.",
    difficulty: "hard",
    expected_query:
      "SELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS amount_gap FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY amount_gap DESC, i.id ASC LIMIT 10;",
    solution_columns: ["id", "invoice_number", "total_amount", "amount_gap"],
    tables: ["invoices", "payments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "amount_gap", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
];

export const hints = [
  {
    code: "HOSPITAL_001",
    hints: [
      {
        hint_order: 1,
        content: "Count all patients from one table.",
      },
      {
        hint_order: 2,
        content: "Use an aggregate function.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) from patients.",
      },
    ],
  },
  {
    code: "HOSPITAL_002",
    hints: [
      {
        hint_order: 1,
        content: "Filter active doctors first.",
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
    code: "HOSPITAL_003",
    hints: [
      {
        hint_order: 1,
        content: "Return only active departments.",
      },
      {
        hint_order: 2,
        content: "Select the requested department columns.",
      },
      {
        hint_order: 3,
        content: "ORDER BY name ASC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_004",
    hints: [
      {
        hint_order: 1,
        content: "Look for patients registered today only.",
      },
      {
        hint_order: 2,
        content: "Extract the date part from registered_at.",
      },
      {
        hint_order: 3,
        content: "Compare DATE(registered_at) with CURRENT_DATE.",
      },
    ],
  },
  {
    code: "HOSPITAL_005",
    hints: [
      {
        hint_order: 1,
        content: "Keep only beds that are available.",
      },
      {
        hint_order: 2,
        content: "Also check that the bed is active.",
      },
      {
        hint_order: 3,
        content: "Filter by bed_status and sort by room_id, bed_number.",
      },
    ],
  },
  {
    code: "HOSPITAL_006",
    hints: [
      {
        hint_order: 1,
        content: "Filter appointments by scheduled status.",
      },
      {
        hint_order: 2,
        content: "Use appointment_status = scheduled.",
      },
      {
        hint_order: 3,
        content: "Sort by scheduled_start_at ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_007",
    hints: [
      {
        hint_order: 1,
        content: "Each doctor belongs to a department.",
      },
      {
        hint_order: 2,
        content: "Join doctors with departments.",
      },
      {
        hint_order: 3,
        content: "Use department_id to get department name.",
      },
    ],
  },
  {
    code: "HOSPITAL_008",
    hints: [
      {
        hint_order: 1,
        content: "You need patients who have at least one policy.",
      },
      {
        hint_order: 2,
        content: "Join patients with insurance_policies.",
      },
      {
        hint_order: 3,
        content: "Use DISTINCT to avoid duplicate patients.",
      },
    ],
  },
  {
    code: "HOSPITAL_009",
    hints: [
      {
        hint_order: 1,
        content: "Filter lab orders by completed status.",
      },
      {
        hint_order: 2,
        content: "Use the order_status column.",
      },
      {
        hint_order: 3,
        content: "Sort by ordered_at DESC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_010",
    hints: [
      {
        hint_order: 1,
        content: "Keep only fully paid invoices.",
      },
      {
        hint_order: 2,
        content: "Use invoice_status = paid.",
      },
      {
        hint_order: 3,
        content: "Return invoice details and sort by issued_at DESC.",
      },
    ],
  },
  {
    code: "HOSPITAL_011",
    hints: [
      {
        hint_order: 1,
        content: "Count appointments for each doctor.",
      },
      {
        hint_order: 2,
        content: "Group by doctor_id.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) and ORDER BY total_appointments DESC.",
      },
    ],
  },
  {
    code: "HOSPITAL_012",
    hints: [
      {
        hint_order: 1,
        content: "A patient with allergies appears in patient_allergies.",
      },
      {
        hint_order: 2,
        content: "Join patients with patient_allergies.",
      },
      {
        hint_order: 3,
        content: "Use DISTINCT patient rows.",
      },
    ],
  },
  {
    code: "HOSPITAL_013",
    hints: [
      {
        hint_order: 1,
        content: "Only approved leave records should be shown.",
      },
      {
        hint_order: 2,
        content: "Join leave records with doctors.",
      },
      {
        hint_order: 3,
        content: "Filter approval_status = approved.",
      },
    ],
  },
  {
    code: "HOSPITAL_014",
    hints: [
      {
        hint_order: 1,
        content: "List only active lab tests.",
      },
      {
        hint_order: 2,
        content: "Use the lab_test_catalog table.",
      },
      {
        hint_order: 3,
        content: "Sort by test_name ASC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_015",
    hints: [
      {
        hint_order: 1,
        content: "Keep only insurance policies marked primary.",
      },
      {
        hint_order: 2,
        content: "Use the is_primary column.",
      },
      {
        hint_order: 3,
        content: "Sort by patient_id ASC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_016",
    hints: [
      {
        hint_order: 1,
        content: "Find admissions still in admitted state.",
      },
      {
        hint_order: 2,
        content: "Use admission_status = admitted.",
      },
      {
        hint_order: 3,
        content: "Sort by admitted_at DESC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_017",
    hints: [
      {
        hint_order: 1,
        content: "Doctors have a primary_specialization_id.",
      },
      {
        hint_order: 2,
        content: "Join doctors with specializations.",
      },
      {
        hint_order: 3,
        content: "Return specialization name.",
      },
    ],
  },
  {
    code: "HOSPITAL_018",
    hints: [
      {
        hint_order: 1,
        content: "Only successful payments should be listed.",
      },
      {
        hint_order: 2,
        content: "Use payment_status = successful.",
      },
      {
        hint_order: 3,
        content: "Sort by paid_at DESC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_019",
    hints: [
      {
        hint_order: 1,
        content: "Keep only claims under review.",
      },
      {
        hint_order: 2,
        content: "Use claim_status = under_review.",
      },
      {
        hint_order: 3,
        content: "Sort by submitted_at ASC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_020",
    hints: [
      {
        hint_order: 1,
        content: "Show all feedback rows, no filter needed.",
      },
      {
        hint_order: 2,
        content: "Select the requested feedback columns.",
      },
      {
        hint_order: 3,
        content: "Sort by created_at DESC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_021",
    hints: [
      {
        hint_order: 1,
        content: "Find the average consultation fee per department.",
      },
      {
        hint_order: 2,
        content: "Join doctors with departments.",
      },
      {
        hint_order: 3,
        content: "GROUP BY department and use AVG(consultation_fee).",
      },
    ],
  },
  {
    code: "HOSPITAL_022",
    hints: [
      {
        hint_order: 1,
        content: "Count appointments for each status.",
      },
      {
        hint_order: 2,
        content: "Group by appointment_status.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) and sort by total count DESC.",
      },
    ],
  },
  {
    code: "HOSPITAL_023",
    hints: [
      {
        hint_order: 1,
        content: "Count only occupied beds.",
      },
      {
        hint_order: 2,
        content: "Filter bed_status = occupied.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) on beds.",
      },
    ],
  },
  {
    code: "HOSPITAL_024",
    hints: [
      {
        hint_order: 1,
        content: "Count admissions per department.",
      },
      {
        hint_order: 2,
        content: "Group by department_id.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) and sort by total_admissions DESC.",
      },
    ],
  },
  {
    code: "HOSPITAL_025",
    hints: [
      {
        hint_order: 1,
        content: "Add invoice totals for each patient.",
      },
      {
        hint_order: 2,
        content: "Group by patient_id.",
      },
      {
        hint_order: 3,
        content: "Use SUM(total_amount).",
      },
    ],
  },
  {
    code: "HOSPITAL_026",
    hints: [
      {
        hint_order: 1,
        content: "Count lab orders for each patient.",
      },
      {
        hint_order: 2,
        content: "Group by patient_id.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) on lab_orders.",
      },
    ],
  },
  {
    code: "HOSPITAL_027",
    hints: [
      {
        hint_order: 1,
        content: "Count prescriptions written by each doctor.",
      },
      {
        hint_order: 2,
        content: "Group by doctor_id.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) and sort descending.",
      },
    ],
  },
  {
    code: "HOSPITAL_028",
    hints: [
      {
        hint_order: 1,
        content: "Keep only critical lab results.",
      },
      {
        hint_order: 2,
        content: "Use interpretation = critical.",
      },
      {
        hint_order: 3,
        content: "Sort by resulted_at DESC, id ASC.",
      },
    ],
  },
  {
    code: "HOSPITAL_029",
    hints: [
      {
        hint_order: 1,
        content: "Sort doctors by experience from highest to lowest.",
      },
      {
        hint_order: 2,
        content: "Use years_of_experience in ORDER BY.",
      },
      {
        hint_order: 3,
        content: "Place NULL values last.",
      },
    ],
  },
  {
    code: "HOSPITAL_030",
    hints: [
      {
        hint_order: 1,
        content: "A chronic condition is stored in patient_conditions.",
      },
      {
        hint_order: 2,
        content: "Join patients with patient_conditions.",
      },
      {
        hint_order: 3,
        content: "Filter condition_status = chronic and use DISTINCT.",
      },
    ],
  },
  {
    code: "HOSPITAL_031",
    hints: [
      {
        hint_order: 1,
        content: "Work only with discharged admissions.",
      },
      {
        hint_order: 2,
        content: "Find the difference between discharge_at and admitted_at.",
      },
      {
        hint_order: 3,
        content: "Convert the stay interval into days, then use AVG().",
      },
    ],
  },
  {
    code: "HOSPITAL_032",
    hints: [
      {
        hint_order: 1,
        content: "Count registrations day by day.",
      },
      {
        hint_order: 2,
        content: "Extract the date part from registered_at.",
      },
      {
        hint_order: 3,
        content: "GROUP BY DATE(registered_at).",
      },
    ],
  },
  {
    code: "HOSPITAL_033",
    hints: [
      {
        hint_order: 1,
        content: "Only successful payments count as revenue.",
      },
      {
        hint_order: 2,
        content: "Group by payment_method.",
      },
      {
        hint_order: 3,
        content: "Use SUM(amount_paid) with WHERE payment_status = successful.",
      },
    ],
  },
  {
    code: "HOSPITAL_034",
    hints: [
      {
        hint_order: 1,
        content: "Start from all specializations.",
      },
      {
        hint_order: 2,
        content: "Join with doctor_specializations.",
      },
      {
        hint_order: 3,
        content:
          "Use LEFT JOIN so specializations with zero doctors still appear.",
      },
    ],
  },
  {
    code: "HOSPITAL_035",
    hints: [
      {
        hint_order: 1,
        content: "Count only completed procedure orders.",
      },
      {
        hint_order: 2,
        content: "Use the procedure_status column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE procedure_status = completed.",
      },
    ],
  },
  {
    code: "HOSPITAL_036",
    hints: [
      {
        hint_order: 1,
        content: "Count appointments for each calendar day.",
      },
      {
        hint_order: 2,
        content: "Use scheduled_start_at to derive the date.",
      },
      {
        hint_order: 3,
        content: "GROUP BY DATE(scheduled_start_at).",
      },
    ],
  },
  {
    code: "HOSPITAL_037",
    hints: [
      {
        hint_order: 1,
        content: "Consider only completed appointments.",
      },
      {
        hint_order: 2,
        content: "Count them per doctor.",
      },
      {
        hint_order: 3,
        content: "ORDER BY count DESC and LIMIT 5.",
      },
    ],
  },
  {
    code: "HOSPITAL_038",
    hints: [
      {
        hint_order: 1,
        content: "Revenue is stored in invoices.",
      },
      {
        hint_order: 2,
        content: "Department comes from encounters.",
      },
      {
        hint_order: 3,
        content:
          "Join invoices to encounters, then SUM(total_amount) by department.",
      },
    ],
  },
  {
    code: "HOSPITAL_039",
    hints: [
      {
        hint_order: 1,
        content: "Find patients admitted more than once.",
      },
      {
        hint_order: 2,
        content: "Group admissions by patient_id.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_040",
    hints: [
      {
        hint_order: 1,
        content: "Wait time is actual start minus scheduled start.",
      },
      {
        hint_order: 2,
        content: "Ignore rows where consultation_started_at is NULL.",
      },
      {
        hint_order: 3,
        content: "Convert the interval to minutes, then AVG() by doctor.",
      },
    ],
  },
  {
    code: "HOSPITAL_041",
    hints: [
      {
        hint_order: 1,
        content: "Compute no-show percentage per doctor.",
      },
      {
        hint_order: 2,
        content: "Count no_show rows and divide by total appointments.",
      },
      {
        hint_order: 3,
        content: "Use CASE WHEN appointment_status = no_show THEN 1 END.",
      },
    ],
  },
  {
    code: "HOSPITAL_042",
    hints: [
      {
        hint_order: 1,
        content: "Count occupied beds room by room.",
      },
      {
        hint_order: 2,
        content: "Join rooms with beds.",
      },
      {
        hint_order: 3,
        content:
          "Use LEFT JOIN or conditional counting so rooms with zero occupied beds can appear.",
      },
    ],
  },
  {
    code: "HOSPITAL_043",
    hints: [
      {
        hint_order: 1,
        content: "Find patients with more than one allergy row.",
      },
      {
        hint_order: 2,
        content: "Group by patient_id in patient_allergies.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_044",
    hints: [
      {
        hint_order: 1,
        content:
          "A claim belongs to a policy, and a policy belongs to a provider.",
      },
      {
        hint_order: 2,
        content:
          "Treat approved, partially_approved, and settled as approved-like statuses.",
      },
      {
        hint_order: 3,
        content:
          "Compute approved-like claims divided by total claims per provider.",
      },
    ],
  },
  {
    code: "HOSPITAL_045",
    hints: [
      {
        hint_order: 1,
        content: "Turnaround is completed_at minus sample_collected_at.",
      },
      {
        hint_order: 2,
        content: "Join lab_order_items with lab_test_catalog.",
      },
      {
        hint_order: 3,
        content: "Convert the interval into hours, then AVG() by test.",
      },
    ],
  },
  {
    code: "HOSPITAL_046",
    hints: [
      {
        hint_order: 1,
        content:
          "A doctor with multiple specializations has multiple rows in doctor_specializations.",
      },
      {
        hint_order: 2,
        content: "Group by doctor_id.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_047",
    hints: [
      {
        hint_order: 1,
        content:
          "Outstanding amount is invoice total minus successful payments.",
      },
      {
        hint_order: 2,
        content: "Join invoices with payments.",
      },
      {
        hint_order: 3,
        content: "Use LEFT JOIN and sum only successful payment amounts.",
      },
    ],
  },
  {
    code: "HOSPITAL_048",
    hints: [
      {
        hint_order: 1,
        content: "Count patients month by month.",
      },
      {
        hint_order: 2,
        content: "Truncate registered_at to the month.",
      },
      {
        hint_order: 3,
        content: "Use DATE_TRUNC('month', registered_at) and COUNT(*).",
      },
    ],
  },
  {
    code: "HOSPITAL_049",
    hints: [
      {
        hint_order: 1,
        content: "Admission duration is from admitted_at until discharge_at.",
      },
      {
        hint_order: 2,
        content: "If discharge_at is NULL, use the current time.",
      },
      {
        hint_order: 3,
        content: "Use COALESCE(discharge_at, NOW()) and AVG() by department.",
      },
    ],
  },
  {
    code: "HOSPITAL_050",
    hints: [
      {
        hint_order: 1,
        content: "Add invoice amounts per patient.",
      },
      {
        hint_order: 2,
        content: "Group by patient_id.",
      },
      {
        hint_order: 3,
        content: "Sort by total billed amount DESC and LIMIT 10.",
      },
    ],
  },
  {
    code: "HOSPITAL_051",
    hints: [
      {
        hint_order: 1,
        content:
          "A valid patient must appear in both appointments and admissions.",
      },
      {
        hint_order: 2,
        content: "Check existence in both tables.",
      },
      {
        hint_order: 3,
        content:
          "Use EXISTS twice or join distinct patient ids from both tables.",
      },
    ],
  },
  {
    code: "HOSPITAL_052",
    hints: [
      {
        hint_order: 1,
        content: "Feedback ratings are in patient_feedback.",
      },
      {
        hint_order: 2,
        content: "Ignore rows where doctor_id is NULL.",
      },
      {
        hint_order: 3,
        content: "GROUP BY doctor_id and use AVG(rating).",
      },
    ],
  },
  {
    code: "HOSPITAL_053",
    hints: [
      {
        hint_order: 1,
        content: "Medication usage is recorded in prescription_items.",
      },
      {
        hint_order: 2,
        content: "Join prescription_items with medications.",
      },
      {
        hint_order: 3,
        content: "Count rows per medication and keep the top 10.",
      },
    ],
  },
  {
    code: "HOSPITAL_054",
    hints: [
      {
        hint_order: 1,
        content: "You need completed appointments that also have feedback.",
      },
      {
        hint_order: 2,
        content:
          "Join appointments with patient_feedback using appointment_id.",
      },
      {
        hint_order: 3,
        content: "Filter appointment_status = completed.",
      },
    ],
  },
  {
    code: "HOSPITAL_055",
    hints: [
      {
        hint_order: 1,
        content: "Schedule hours come from end_time minus start_time.",
      },
      {
        hint_order: 2,
        content: "Only active schedules should be counted.",
      },
      {
        hint_order: 3,
        content:
          "Convert the interval to hours and SUM() by doctor_id, day_of_week.",
      },
    ],
  },
  {
    code: "HOSPITAL_056",
    hints: [
      {
        hint_order: 1,
        content: "Look for severe or critical allergies only.",
      },
      {
        hint_order: 2,
        content: "Join patients with patient_allergies.",
      },
      {
        hint_order: 3,
        content:
          "Filter severity IN (severe, critical) and use DISTINCT patients.",
      },
    ],
  },
  {
    code: "HOSPITAL_057",
    hints: [
      {
        hint_order: 1,
        content: "Revenue needs to be grouped by invoice_type.",
      },
      {
        hint_order: 2,
        content: "Use invoice totals, not payments.",
      },
      {
        hint_order: 3,
        content: "SUM(total_amount) per invoice_type.",
      },
    ],
  },
  {
    code: "HOSPITAL_058",
    hints: [
      {
        hint_order: 1,
        content: "Focus on currently admitted admissions first.",
      },
      {
        hint_order: 2,
        content: "Check whether an active bed allocation exists.",
      },
      {
        hint_order: 3,
        content: "Use LEFT JOIN to active allocations and keep NULL matches.",
      },
    ],
  },
  {
    code: "HOSPITAL_059",
    hints: [
      {
        hint_order: 1,
        content:
          "Match appointments to doctor schedules by doctor and weekday.",
      },
      {
        hint_order: 2,
        content: "Also check the schedule effective date range.",
      },
      {
        hint_order: 3,
        content:
          "Return appointments where no matching active schedule row exists.",
      },
    ],
  },
  {
    code: "HOSPITAL_060",
    hints: [
      {
        hint_order: 1,
        content: "Collection delay is paid_at minus issued_at.",
      },
      {
        hint_order: 2,
        content: "Use only successful payments with non-NULL timestamps.",
      },
      {
        hint_order: 3,
        content: "Convert the interval to days, then AVG().",
      },
    ],
  },
  {
    code: "HOSPITAL_061",
    hints: [
      {
        hint_order: 1,
        content: "Compare discharge date with insurance coverage end date.",
      },
      {
        hint_order: 2,
        content: "Join admissions with insurance_policies using patient_id.",
      },
      {
        hint_order: 3,
        content: "Keep rows where discharge_at is after coverage_end_date.",
      },
    ],
  },
  {
    code: "HOSPITAL_062",
    hints: [
      {
        hint_order: 1,
        content: "Find patients who visited multiple departments.",
      },
      {
        hint_order: 2,
        content: "Use encounters and count DISTINCT department_id.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(DISTINCT department_id) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_063",
    hints: [
      {
        hint_order: 1,
        content: "Count prescriptions month by month.",
      },
      {
        hint_order: 2,
        content: "Use DATE_TRUNC on prescribed_at.",
      },
      {
        hint_order: 3,
        content: "GROUP BY month and doctor_id.",
      },
    ],
  },
  {
    code: "HOSPITAL_064",
    hints: [
      {
        hint_order: 1,
        content: "Compare approved claim amount with invoice total.",
      },
      {
        hint_order: 2,
        content: "Join insurance_claims with invoices.",
      },
      {
        hint_order: 3,
        content: "Filter where approved_amount < total_amount.",
      },
    ],
  },
  {
    code: "HOSPITAL_065",
    hints: [
      {
        hint_order: 1,
        content: "Look for overlapping doctor leave dates.",
      },
      {
        hint_order: 2,
        content: "Self join doctor_leave_records on doctor_id.",
      },
      {
        hint_order: 3,
        content: "Check if date ranges overlap.",
      },
    ],
  },
  {
    code: "HOSPITAL_066",
    hints: [
      {
        hint_order: 1,
        content: "Patients with multiple chronic conditions are needed.",
      },
      {
        hint_order: 2,
        content: "Filter condition_status = chronic.",
      },
      {
        hint_order: 3,
        content: "GROUP BY patient_id HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_067",
    hints: [
      {
        hint_order: 1,
        content: "Compute invoice paid percentage.",
      },
      {
        hint_order: 2,
        content: "Use successful payments only.",
      },
      {
        hint_order: 3,
        content: "SUM(successful payments) / total_amount * 100.",
      },
    ],
  },
  {
    code: "HOSPITAL_068",
    hints: [
      {
        hint_order: 1,
        content: "Find doctors with zero completed appointments.",
      },
      {
        hint_order: 2,
        content: "Start from doctors table.",
      },
      {
        hint_order: 3,
        content: "Use LEFT JOIN appointments and filter NULL matches.",
      },
    ],
  },
  {
    code: "HOSPITAL_069",
    hints: [
      {
        hint_order: 1,
        content: "Readmission means multiple admissions per patient.",
      },
      {
        hint_order: 2,
        content: "Sort admissions by admitted_at.",
      },
      {
        hint_order: 3,
        content: "Use LAG() to compare previous discharge date.",
      },
    ],
  },
  {
    code: "HOSPITAL_070",
    hints: [
      {
        hint_order: 1,
        content: "Compare sample collected time with result completed time.",
      },
      {
        hint_order: 2,
        content: "Join lab_order_items with lab_results.",
      },
      {
        hint_order: 3,
        content: "Convert interval to minutes or hours, then AVG().",
      },
    ],
  },
  {
    code: "HOSPITAL_071",
    hints: [
      {
        hint_order: 1,
        content: "Find patients with multiple failed payments.",
      },
      {
        hint_order: 2,
        content: "Filter payment_status = failed.",
      },
      {
        hint_order: 3,
        content: "GROUP BY patient_id HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_072",
    hints: [
      {
        hint_order: 1,
        content: "Use encounters to count patient visits per doctor.",
      },
      {
        hint_order: 2,
        content: "Count DISTINCT patient_id.",
      },
      {
        hint_order: 3,
        content: "GROUP BY attending_doctor_id.",
      },
    ],
  },
  {
    code: "HOSPITAL_073",
    hints: [
      {
        hint_order: 1,
        content: "Find the most frequently used room.",
      },
      {
        hint_order: 2,
        content: "Count bed allocations per room.",
      },
      {
        hint_order: 3,
        content: "ORDER BY count DESC LIMIT 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_074",
    hints: [
      {
        hint_order: 1,
        content: "Insurance utilization is approved vs covered amount.",
      },
      {
        hint_order: 2,
        content: "Join claims with invoices.",
      },
      {
        hint_order: 3,
        content: "Use SUM(approved_amount) / SUM(insurance_covered_amount).",
      },
    ],
  },
  {
    code: "HOSPITAL_075",
    hints: [
      {
        hint_order: 1,
        content: "Count procedures per doctor.",
      },
      {
        hint_order: 2,
        content: "Use completed procedures only.",
      },
      {
        hint_order: 3,
        content: "GROUP BY ordered_by_doctor_id and rank top 10.",
      },
    ],
  },
  {
    code: "HOSPITAL_076",
    hints: [
      {
        hint_order: 1,
        content: "Look for patients with repeated no-shows.",
      },
      {
        hint_order: 2,
        content: "Filter appointment_status = no_show.",
      },
      {
        hint_order: 3,
        content: "GROUP BY patient_id HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_077",
    hints: [
      {
        hint_order: 1,
        content: "Count medications per prescription.",
      },
      {
        hint_order: 2,
        content: "Use prescription_items table.",
      },
      {
        hint_order: 3,
        content: "GROUP BY prescription_id and keep max count.",
      },
    ],
  },
  {
    code: "HOSPITAL_078",
    hints: [
      {
        hint_order: 1,
        content: "Doctor utilization = completed appointments vs capacity.",
      },
      {
        hint_order: 2,
        content: "Use doctor_schedules for capacity.",
      },
      {
        hint_order: 3,
        content: "Compare COUNT(completed) with SUM(max_patients_per_slot).",
      },
    ],
  },
  {
    code: "HOSPITAL_079",
    hints: [
      {
        hint_order: 1,
        content: "Use feedback table for doctor ratings.",
      },
      {
        hint_order: 2,
        content: "Filter only ratings <= low threshold.",
      },
      {
        hint_order: 3,
        content: "GROUP BY doctor_id and count low ratings.",
      },
    ],
  },
  {
    code: "HOSPITAL_080",
    hints: [
      {
        hint_order: 1,
        content: "Count admissions per bed.",
      },
      {
        hint_order: 2,
        content: "Use bed_allocations table.",
      },
      {
        hint_order: 3,
        content: "GROUP BY bed_id and rank highest.",
      },
    ],
  },
  {
    code: "HOSPITAL_081",
    hints: [
      {
        hint_order: 1,
        content: "Count occupied beds department-wise.",
      },
      {
        hint_order: 2,
        content: "Join beds → rooms → departments.",
      },
      {
        hint_order: 3,
        content: "GROUP BY department and rank highest.",
      },
    ],
  },
  {
    code: "HOSPITAL_082",
    hints: [
      {
        hint_order: 1,
        content: "Find consecutive critical lab results per patient.",
      },
      {
        hint_order: 2,
        content: "Sort results by resulted_at.",
      },
      {
        hint_order: 3,
        content: "Use LAG() to compare previous interpretation.",
      },
    ],
  },
  {
    code: "HOSPITAL_083",
    hints: [
      {
        hint_order: 1,
        content: "Revenue comes from invoices linked to encounters.",
      },
      {
        hint_order: 2,
        content: "Group by department and doctor.",
      },
      {
        hint_order: 3,
        content: "Use DENSE_RANK() within each department.",
      },
    ],
  },
  {
    code: "HOSPITAL_084",
    hints: [
      {
        hint_order: 1,
        content: "Wait time = consultation_started_at - scheduled_start_at.",
      },
      {
        hint_order: 2,
        content: "Partition by doctor_id.",
      },
      {
        hint_order: 3,
        content: "Use ROW_NUMBER() ordered by longest wait.",
      },
    ],
  },
  {
    code: "HOSPITAL_085",
    hints: [
      {
        hint_order: 1,
        content: "Compare claim approved amount with invoice covered amount.",
      },
      {
        hint_order: 2,
        content: "Join insurance_claims with invoices.",
      },
      {
        hint_order: 3,
        content: "Sort by biggest shortfall first.",
      },
    ],
  },
  {
    code: "HOSPITAL_086",
    hints: [
      {
        hint_order: 1,
        content: "Measure gap between patient encounters.",
      },
      {
        hint_order: 2,
        content: "Sort encounters by started_at.",
      },
      {
        hint_order: 3,
        content: "Use LAG() and subtract timestamps.",
      },
    ],
  },
  {
    code: "HOSPITAL_087",
    hints: [
      {
        hint_order: 1,
        content: "Count medications prescribed by each doctor.",
      },
      {
        hint_order: 2,
        content: "Group by doctor_id and medication_id.",
      },
      {
        hint_order: 3,
        content: "Rank top medication per doctor.",
      },
    ],
  },
  {
    code: "HOSPITAL_088",
    hints: [
      {
        hint_order: 1,
        content: "Invoice date must fall inside policy coverage dates.",
      },
      {
        hint_order: 2,
        content: "Join invoices with insurance_policies.",
      },
      {
        hint_order: 3,
        content: "Keep rows outside the valid range.",
      },
    ],
  },
  {
    code: "HOSPITAL_089",
    hints: [
      {
        hint_order: 1,
        content: "Readmission means next admission within 30 days.",
      },
      {
        hint_order: 2,
        content: "Use LEAD() over patient admissions.",
      },
      {
        hint_order: 3,
        content: "Compute percentage by department.",
      },
    ],
  },
  {
    code: "HOSPITAL_090",
    hints: [
      {
        hint_order: 1,
        content: "Revenue should be monthly per department.",
      },
      {
        hint_order: 2,
        content: "Use DATE_TRUNC('month', created_at).",
      },
      {
        hint_order: 3,
        content: "Use LAG() for month-over-month growth.",
      },
    ],
  },
  {
    code: "HOSPITAL_091",
    hints: [
      {
        hint_order: 1,
        content: "Compare completed appointments with schedule capacity.",
      },
      {
        hint_order: 2,
        content: "Aggregate both by doctor and weekday.",
      },
      {
        hint_order: 3,
        content: "Keep rows where completed_count > total_capacity.",
      },
    ],
  },
  {
    code: "HOSPITAL_092",
    hints: [
      {
        hint_order: 1,
        content: "Patient must have both high and low interpretations.",
      },
      {
        hint_order: 2,
        content: "Filter interpretation IN ('high', 'low').",
      },
      {
        hint_order: 3,
        content: "Use COUNT(DISTINCT interpretation) = 2.",
      },
    ],
  },
  {
    code: "HOSPITAL_093",
    hints: [
      {
        hint_order: 1,
        content: "Multiple bed transfers mean multiple allocations.",
      },
      {
        hint_order: 2,
        content: "Group by admission_id.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "HOSPITAL_094",
    hints: [
      {
        hint_order: 1,
        content: "Diversity means distinct medications prescribed.",
      },
      {
        hint_order: 2,
        content: "COUNT(DISTINCT medication_id) per doctor.",
      },
      {
        hint_order: 3,
        content: "Apply DENSE_RANK() on the count.",
      },
    ],
  },
  {
    code: "HOSPITAL_095",
    hints: [
      {
        hint_order: 1,
        content: "Compare first BMI with latest BMI.",
      },
      {
        hint_order: 2,
        content: "Use FIRST_VALUE() and LAST_VALUE().",
      },
      {
        hint_order: 3,
        content: "Keep patients where last BMI > first BMI.",
      },
    ],
  },
  {
    code: "HOSPITAL_096",
    hints: [
      {
        hint_order: 1,
        content: "Procedure revenue comes from invoice items.",
      },
      {
        hint_order: 2,
        content: "Filter item_type = procedure.",
      },
      {
        hint_order: 3,
        content: "SUM(line_total) and keep top 10.",
      },
    ],
  },
  {
    code: "HOSPITAL_097",
    hints: [
      {
        hint_order: 1,
        content: "Look for overlapping policy periods for same patient.",
      },
      {
        hint_order: 2,
        content: "Self join insurance_policies.",
      },
      {
        hint_order: 3,
        content: "Check whether coverage date ranges overlap.",
      },
    ],
  },
  {
    code: "HOSPITAL_098",
    hints: [
      {
        hint_order: 1,
        content: "Follow-up must happen after consultation.",
      },
      {
        hint_order: 2,
        content: "Match same patient and doctor.",
      },
      {
        hint_order: 3,
        content: "Use EXISTS and compute conversion percentage.",
      },
    ],
  },
  {
    code: "HOSPITAL_099",
    hints: [
      {
        hint_order: 1,
        content: "Count lab tests by category and department.",
      },
      {
        hint_order: 2,
        content: "Group by department_id and test_category.",
      },
      {
        hint_order: 3,
        content: "Rank highest category per department.",
      },
    ],
  },
  {
    code: "HOSPITAL_100",
    hints: [
      {
        hint_order: 1,
        content: "Gap = invoice total - successful payments.",
      },
      {
        hint_order: 2,
        content: "Use LEFT JOIN with payments.",
      },
      {
        hint_order: 3,
        content: "SUM successful payments and rank top 10 gaps.",
      },
    ],
  },
];

export const conceptFilters = [
  {
    code: "HOSPITAL_001",
    concepts: ["aggregation", "count"],
  },
  {
    code: "HOSPITAL_002",
    concepts: ["aggregation", "count", "filtering"],
  },
  {
    code: "HOSPITAL_003",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_004",
    concepts: ["filtering", "date_functions", "sorting"],
  },
  {
    code: "HOSPITAL_005",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_006",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_007",
    concepts: ["joins", "left_join", "sorting"],
  },
  {
    code: "HOSPITAL_008",
    concepts: ["joins", "distinct", "sorting"],
  },
  {
    code: "HOSPITAL_009",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_010",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_011",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_012",
    concepts: ["joins", "distinct", "sorting"],
  },
  {
    code: "HOSPITAL_013",
    concepts: ["joins", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_014",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_015",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_016",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_017",
    concepts: ["joins", "left_join", "sorting"],
  },
  {
    code: "HOSPITAL_018",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_019",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_020",
    concepts: ["sorting"],
  },
  {
    code: "HOSPITAL_021",
    concepts: [
      "aggregation",
      "average",
      "group_by",
      "joins",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_022",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_023",
    concepts: ["aggregation", "count", "filtering"],
  },
  {
    code: "HOSPITAL_024",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_025",
    concepts: ["aggregation", "sum", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_026",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_027",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_028",
    concepts: ["filtering", "sorting"],
  },
  {
    code: "HOSPITAL_029",
    concepts: ["sorting", "null_handling"],
  },
  {
    code: "HOSPITAL_030",
    concepts: ["joins", "distinct", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_031",
    concepts: [
      "aggregation",
      "average",
      "date_difference",
      "arithmetic",
      "filtering",
    ],
  },
  {
    code: "HOSPITAL_032",
    concepts: ["aggregation", "count", "group_by", "date_functions", "sorting"],
  },
  {
    code: "HOSPITAL_033",
    concepts: ["aggregation", "sum", "group_by", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_034",
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
    code: "HOSPITAL_035",
    concepts: ["aggregation", "count", "filtering"],
  },
  {
    code: "HOSPITAL_036",
    concepts: ["aggregation", "count", "group_by", "date_functions", "sorting"],
  },
  {
    code: "HOSPITAL_037",
    concepts: [
      "aggregation",
      "count",
      "group_by",
      "filtering",
      "sorting",
      "limit",
    ],
  },
  {
    code: "HOSPITAL_038",
    concepts: ["joins", "aggregation", "sum", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_039",
    concepts: ["aggregation", "count", "group_by", "having", "sorting"],
  },
  {
    code: "HOSPITAL_040",
    concepts: [
      "aggregation",
      "average",
      "date_difference",
      "arithmetic",
      "filtering",
      "group_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_041",
    concepts: [
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_042",
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
    code: "HOSPITAL_043",
    concepts: ["aggregation", "count", "group_by", "having", "sorting"],
  },
  {
    code: "HOSPITAL_044",
    concepts: [
      "joins",
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_045",
    concepts: [
      "joins",
      "aggregation",
      "average",
      "date_difference",
      "arithmetic",
      "group_by",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_046",
    concepts: ["aggregation", "count", "group_by", "having", "sorting"],
  },
  {
    code: "HOSPITAL_047",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "case_when",
      "null_handling",
      "arithmetic",
      "group_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_048",
    concepts: ["aggregation", "count", "group_by", "date_functions", "sorting"],
  },
  {
    code: "HOSPITAL_049",
    concepts: [
      "aggregation",
      "average",
      "date_difference",
      "null_handling",
      "arithmetic",
      "group_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_050",
    concepts: ["aggregation", "sum", "group_by", "sorting", "limit"],
  },
  {
    code: "HOSPITAL_051",
    concepts: ["exists", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_052",
    concepts: ["aggregation", "average", "group_by", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_053",
    concepts: ["joins", "aggregation", "count", "group_by", "sorting", "limit"],
  },
  {
    code: "HOSPITAL_054",
    concepts: ["joins", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_055",
    concepts: [
      "aggregation",
      "sum",
      "group_by",
      "date_difference",
      "arithmetic",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_056",
    concepts: ["joins", "distinct", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_057",
    concepts: ["aggregation", "sum", "group_by", "sorting"],
  },
  {
    code: "HOSPITAL_058",
    concepts: ["joins", "left_join", "anti_join", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_059",
    concepts: [
      "joins",
      "left_join",
      "anti_join",
      "date_functions",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_060",
    concepts: [
      "joins",
      "aggregation",
      "average",
      "date_difference",
      "arithmetic",
      "filtering",
    ],
  },
  {
    code: "HOSPITAL_061",
    concepts: ["aggregation", "count", "group_by", "sorting", "limit"],
  },
  {
    code: "HOSPITAL_062",
    concepts: ["joins", "distinct", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_063",
    concepts: [
      "aggregation",
      "sum",
      "group_by",
      "date_functions",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_064",
    concepts: [
      "joins",
      "subquery",
      "aggregation",
      "count",
      "average",
      "group_by",
      "date_functions",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_065",
    concepts: ["aggregation", "count", "group_by", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_066",
    concepts: ["sorting"],
  },
  {
    code: "HOSPITAL_067",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "having",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_068",
    concepts: [
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_069",
    concepts: [
      "joins",
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_070",
    concepts: [
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_071",
    concepts: [
      "aggregation",
      "count_distinct",
      "group_by",
      "filtering",
      "sorting",
      "limit",
    ],
  },
  {
    code: "HOSPITAL_072",
    concepts: [
      "joins",
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_073",
    concepts: [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "filtering",
      "sorting",
      "limit",
    ],
  },
  {
    code: "HOSPITAL_074",
    concepts: [
      "aggregation",
      "count",
      "group_by",
      "filtering",
      "having",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_075",
    concepts: [
      "joins",
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_076",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_077",
    concepts: [
      "date_difference",
      "arithmetic",
      "filtering",
      "sorting",
      "limit",
    ],
  },
  {
    code: "HOSPITAL_078",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "average",
      "group_by",
      "null_handling",
      "arithmetic",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "HOSPITAL_079",
    concepts: [
      "cte",
      "window_functions",
      "lead",
      "lag_lead",
      "partition_by",
      "date_functions",
      "comparison",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_080",
    concepts: [
      "cte",
      "aggregation",
      "sum",
      "group_by",
      "date_functions",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_081",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_082",
    concepts: [
      "cte",
      "joins",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "pattern_detection",
      "distinct",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_083",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "ranking",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_084",
    concepts: [
      "cte",
      "window_functions",
      "row_number",
      "partition_by",
      "date_difference",
      "arithmetic",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_085",
    concepts: ["joins", "comparison", "arithmetic", "sorting"],
  },
  {
    code: "HOSPITAL_086",
    concepts: [
      "cte",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "date_difference",
      "arithmetic",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_087",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_088",
    concepts: ["joins", "date_functions", "comparison", "filtering", "sorting"],
  },
  {
    code: "HOSPITAL_089",
    concepts: [
      "cte",
      "window_functions",
      "lead",
      "lag_lead",
      "partition_by",
      "aggregation",
      "group_by",
      "case_when",
      "arithmetic",
      "sorting",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_090",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "date_functions",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "arithmetic",
      "trend_analysis",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_091",
    concepts: [
      "cte",
      "left_join",
      "joins",
      "aggregation",
      "sum",
      "count",
      "group_by",
      "date_functions",
      "null_handling",
      "comparison",
      "arithmetic",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_092",
    concepts: [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "filtering",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_093",
    concepts: ["aggregation", "count", "group_by", "having", "sorting"],
  },
  {
    code: "HOSPITAL_094",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "window_functions",
      "ranking",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_095",
    concepts: [
      "cte",
      "window_functions",
      "partition_by",
      "min",
      "max",
      "comparison",
      "filtering",
      "distinct",
      "sorting",
      "trend_analysis",
    ],
  },
  {
    code: "HOSPITAL_096",
    concepts: [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "filtering",
      "sorting",
      "limit",
    ],
  },
  {
    code: "HOSPITAL_097",
    concepts: [
      "cte",
      "self_join",
      "joins",
      "comparison",
      "null_handling",
      "distinct",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_098",
    concepts: [
      "cte",
      "exists",
      "case_when",
      "aggregation",
      "sum",
      "count",
      "arithmetic",
      "conversion_metrics",
    ],
  },
  {
    code: "HOSPITAL_099",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
    ],
  },
  {
    code: "HOSPITAL_100",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "case_when",
      "null_handling",
      "arithmetic",
      "group_by",
      "sorting",
      "limit",
    ],
  },
];

export const solutions = [
  {
    code: "HOSPITAL_001",
    approaches: [
      {
        approach_title: "COUNT patients",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT COUNT(*) AS total_patients FROM patients;",
        explanation:
          "## Approach\n\nCount all rows in `patients`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_patients\nFROM patients;\n```\n\n## Explanation\n\n- Each row in `patients` represents one registered patient.\n- `COUNT(*)` returns the total number of rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the shortest and clearest way to count all patients.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(id) AS total_patients FROM patients;",
        explanation:
          "## Approach\n\nCount the patient primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_patients\nFROM patients;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result as counting rows.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for total row counting.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH patient_count AS (\n  SELECT COUNT(*) AS total_patients\n  FROM patients\n)\nSELECT total_patients\nFROM patient_count;",
        explanation:
          "## Approach\n\nCompute the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH patient_count AS (\n  SELECT COUNT(*) AS total_patients\n  FROM patients\n)\nSELECT total_patients\nFROM patient_count;\n```\n\n## Explanation\n\n- The CTE calculates the total patient count.\n- The outer query simply selects that value.\n- This pattern is useful when you want to extend the query later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to build on.",
      },
    ],
  },
  {
    code: "HOSPITAL_002",
    approaches: [
      {
        approach_title: "Filter active",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS active_doctors FROM doctors WHERE is_active = true;",
        explanation:
          "## Approach\n\nFilter to active doctors, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_doctors\nFROM doctors\nWHERE is_active = true;\n```\n\n## Explanation\n\n- `WHERE is_active = true` keeps only active doctors.\n- `COUNT(*)` counts those filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is explicit, simple, and easy for learners to understand.",
      },
      {
        approach_title: "Boolean filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) AS active_doctors FROM doctors WHERE is_active;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_doctors\nFROM doctors\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- Only active doctors are counted.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for practice questions.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_doctors FROM doctors;",
        explanation:
          "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_doctors\nFROM doctors;\n```\n\n## Explanation\n\n- `FILTER` makes `COUNT(*)` include only active doctors.\n- This style is useful when computing multiple conditional counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
    ],
  },
  {
    code: "HOSPITAL_003",
    approaches: [
      {
        approach_title: "Filter and sort",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, department_code, name, department_type, floor_number FROM departments WHERE is_active = true ORDER BY name ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter to active departments and sort them.\n\n## Query\n\n```sql\nSELECT id, department_code, name, department_type, floor_number\nFROM departments\nWHERE is_active = true\nORDER BY name ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = true` keeps only active departments.\n- The selected columns match the expected output.\n- `ORDER BY name ASC, id ASC` matches the expected sort order.\n\n## Why this is optimal\n\nIt directly answers the question with the exact filter, columns, and ordering.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, department_code, name, department_type, floor_number FROM departments WHERE is_active ORDER BY name ASC, id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand to filter active departments.\n\n## Query\n\n```sql\nSELECT id, department_code, name, department_type, floor_number\nFROM departments\nWHERE is_active\nORDER BY name ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active` keeps rows where the boolean is true.\n- The result columns and sorting are the same.\n\n## Difference from the optimal approach\n\nIt is slightly shorter, but less explicit for beginners.",
      },
      {
        approach_title: "CTE active departments",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_departments AS (\n  SELECT id, department_code, name, department_type, floor_number\n  FROM departments\n  WHERE is_active = true\n)\nSELECT id, department_code, name, department_type, floor_number\nFROM active_departments\nORDER BY name ASC, id ASC;",
        explanation:
          "## Approach\n\nFirst isolate active departments in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH active_departments AS (\n  SELECT id, department_code, name, department_type, floor_number\n  FROM departments\n  WHERE is_active = true\n)\nSELECT id, department_code, name, department_type, floor_number\nFROM active_departments\nORDER BY name ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only active departments.\n- The outer query handles the final ordering.\n- This is helpful if more logic needs to be added later.\n\n## Difference from the optimal approach\n\nMore verbose, but structured for extension.",
      },
    ],
  },
  {
    code: "HOSPITAL_004",
    approaches: [
      {
        approach_title: "Date filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, patient_code, full_name, registered_at FROM patients WHERE DATE(registered_at) = CURRENT_DATE ORDER BY registered_at DESC, id ASC;",
        explanation:
          "## Approach\n\nConvert the registration timestamp to a date and compare it with today.\n\n## Query\n\n```sql\nSELECT id, patient_code, full_name, registered_at\nFROM patients\nWHERE DATE(registered_at) = CURRENT_DATE\nORDER BY registered_at DESC, id ASC;\n```\n\n## Explanation\n\n- `DATE(registered_at)` extracts the date part from the timestamp.\n- `CURRENT_DATE` represents today.\n- Sorting by latest registration first matches the expected output.\n\n## Why this is optimal\n\nIt is easy to read and directly expresses the requirement.",
      },
      {
        approach_title: "Range filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, patient_code, full_name, registered_at FROM patients WHERE registered_at >= CURRENT_DATE AND registered_at < CURRENT_DATE + INTERVAL '1 day' ORDER BY registered_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a timestamp range covering today.\n\n## Query\n\n```sql\nSELECT id, patient_code, full_name, registered_at\nFROM patients\nWHERE registered_at >= CURRENT_DATE\n  AND registered_at < CURRENT_DATE + INTERVAL '1 day'\nORDER BY registered_at DESC, id ASC;\n```\n\n## Explanation\n\n- The lower bound starts at midnight today.\n- The upper bound stops before tomorrow starts.\n- This captures all timestamps from today.\n\n## Difference from the optimal approach\n\nA bit longer, but often better for index-friendly filtering in real systems.",
      },
      {
        approach_title: "CTE today patients",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH today_patients AS (\n  SELECT id, patient_code, full_name, registered_at\n  FROM patients\n  WHERE DATE(registered_at) = CURRENT_DATE\n)\nSELECT id, patient_code, full_name, registered_at\nFROM today_patients\nORDER BY registered_at DESC, id ASC;",
        explanation:
          "## Approach\n\nCollect today’s patients first, then sort them outside.\n\n## Query\n\n```sql\nWITH today_patients AS (\n  SELECT id, patient_code, full_name, registered_at\n  FROM patients\n  WHERE DATE(registered_at) = CURRENT_DATE\n)\nSELECT id, patient_code, full_name, registered_at\nFROM today_patients\nORDER BY registered_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates patients registered today.\n- The outer query performs the final ordering.\n- This can help when you plan to reuse that subset.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "HOSPITAL_005",
    approaches: [
      {
        approach_title: "Filter available beds",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, room_id, bed_number, bed_type, bed_status FROM beds WHERE bed_status = 'available' AND is_active = true ORDER BY room_id ASC, bed_number ASC;",
        explanation:
          "## Approach\n\nKeep only active beds with available status.\n\n## Query\n\n```sql\nSELECT id, room_id, bed_number, bed_type, bed_status\nFROM beds\nWHERE bed_status = 'available'\n  AND is_active = true\nORDER BY room_id ASC, bed_number ASC;\n```\n\n## Explanation\n\n- `bed_status = 'available'` keeps currently open beds.\n- `is_active = true` removes inactive beds.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt uses the exact filter conditions needed and keeps the query straightforward.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, room_id, bed_number, bed_type, bed_status FROM beds WHERE bed_status = 'available' AND is_active ORDER BY room_id ASC, bed_number ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand for the active flag.\n\n## Query\n\n```sql\nSELECT id, room_id, bed_number, bed_type, bed_status\nFROM beds\nWHERE bed_status = 'available'\n  AND is_active\nORDER BY room_id ASC, bed_number ASC;\n```\n\n## Explanation\n\n- `is_active` works as a boolean condition in PostgreSQL.\n- Only available and active beds are returned.\n- Sorting stays the same.\n\n## Difference from the optimal approach\n\nSlightly shorter, but less explicit.",
      },
      {
        approach_title: "CTE available beds",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH available_beds AS (\n  SELECT id, room_id, bed_number, bed_type, bed_status\n  FROM beds\n  WHERE bed_status = 'available'\n    AND is_active = true\n)\nSELECT id, room_id, bed_number, bed_type, bed_status\nFROM available_beds\nORDER BY room_id ASC, bed_number ASC;",
        explanation:
          "## Approach\n\nPut the available beds in a CTE and sort them in the final query.\n\n## Query\n\n```sql\nWITH available_beds AS (\n  SELECT id, room_id, bed_number, bed_type, bed_status\n  FROM beds\n  WHERE bed_status = 'available'\n    AND is_active = true\n)\nSELECT id, room_id, bed_number, bed_type, bed_status\nFROM available_beds\nORDER BY room_id ASC, bed_number ASC;\n```\n\n## Explanation\n\n- The CTE captures the filtered bed set.\n- The outer query returns it in the expected order.\n- This is useful if bed availability needs more logic later.\n\n## Difference from the optimal approach\n\nMore structured, but longer than necessary here.",
      },
    ],
  },
  {
    code: "HOSPITAL_006",
    approaches: [
      {
        approach_title: "Filter scheduled",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at FROM appointments WHERE appointment_status = 'scheduled' ORDER BY scheduled_start_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter appointments by scheduled status and sort by start time.\n\n## Query\n\n```sql\nSELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at\nFROM appointments\nWHERE appointment_status = 'scheduled'\nORDER BY scheduled_start_at ASC, id ASC;\n```\n\n## Explanation\n\n- `appointment_status = 'scheduled'` keeps only scheduled appointments.\n- The selected columns match the expected output.\n- Sorting by start time first matches the requirement.\n\n## Why this is optimal\n\nIt directly solves the problem with the simplest possible query.",
      },
      {
        approach_title: "IN filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at FROM appointments WHERE appointment_status IN ('scheduled') ORDER BY scheduled_start_at ASC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` even though there is only one status value.\n\n## Query\n\n```sql\nSELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at\nFROM appointments\nWHERE appointment_status IN ('scheduled')\nORDER BY scheduled_start_at ASC, id ASC;\n```\n\n## Explanation\n\n- `IN ('scheduled')` behaves the same as an equality check here.\n- This pattern is useful if you later expand to multiple statuses.\n\n## Difference from the optimal approach\n\nWorks the same, but is less direct for a single value.",
      },
      {
        approach_title: "CTE scheduled",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH scheduled_appointments AS (\n  SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at\n  FROM appointments\n  WHERE appointment_status = 'scheduled'\n)\nSELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at\nFROM scheduled_appointments\nORDER BY scheduled_start_at ASC, id ASC;",
        explanation:
          "## Approach\n\nCreate a CTE for scheduled appointments, then order the result.\n\n## Query\n\n```sql\nWITH scheduled_appointments AS (\n  SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at\n  FROM appointments\n  WHERE appointment_status = 'scheduled'\n)\nSELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at\nFROM scheduled_appointments\nORDER BY scheduled_start_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE contains only scheduled appointments.\n- The outer query applies the final sort order.\n- This is useful if more derived logic is added later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "HOSPITAL_007",
    approaches: [
      {
        approach_title: "LEFT JOIN dept",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT d.id, d.full_name, dp.name AS department_name FROM doctors d LEFT JOIN departments dp ON d.department_id = dp.id ORDER BY d.full_name ASC, d.id ASC;",
        explanation:
          "## Approach\n\nJoin doctors to departments and keep all doctors, even when a department is missing.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name, dp.name AS department_name\nFROM doctors d\nLEFT JOIN departments dp\n  ON d.department_id = dp.id\nORDER BY d.full_name ASC, d.id ASC;\n```\n\n## Explanation\n\n- `doctors` is the main table.\n- `LEFT JOIN` keeps every doctor row.\n- If a doctor has no matching department, `department_name` becomes `NULL`.\n- This matches the expected row count and output.\n- The final ordering is by doctor name, then id.\n\n## Why this is optimal\n\nIt returns all doctors while still showing department names where available.",
      },
      {
        approach_title: "CTE left join",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_departments AS (\n  SELECT d.id, d.full_name, dp.name AS department_name\n  FROM doctors d\n  LEFT JOIN departments dp ON d.department_id = dp.id\n)\nSELECT id, full_name, department_name\nFROM doctor_departments\nORDER BY full_name ASC, id ASC;",
        explanation:
          "## Approach\n\nBuild the doctor-department mapping in a CTE first, then sort it outside.\n\n## Query\n\n```sql\nWITH doctor_departments AS (\n  SELECT d.id, d.full_name, dp.name AS department_name\n  FROM doctors d\n  LEFT JOIN departments dp ON d.department_id = dp.id\n)\nSELECT id, full_name, department_name\nFROM doctor_departments\nORDER BY full_name ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per doctor with the department name if present.\n- The outer query only handles the final ordering.\n- This is useful when more derived columns or filters may be added later.\n\n## Difference from the optimal approach\n\nIt produces the same result, but is more verbose.",
      },
      {
        approach_title: "Correlated subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT d.id, d.full_name, (SELECT dp.name FROM departments dp WHERE dp.id = d.department_id) AS department_name FROM doctors d ORDER BY d.full_name ASC, d.id ASC;",
        explanation:
          "## Approach\n\nFetch the department name with a correlated subquery for each doctor row.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name,\n       (SELECT dp.name\n        FROM departments dp\n        WHERE dp.id = d.department_id) AS department_name\nFROM doctors d\nORDER BY d.full_name ASC, d.id ASC;\n```\n\n## Explanation\n\n- The outer query reads from `doctors`.\n- The subquery looks up the matching department name using `department_id`.\n- If no department matches, the subquery returns `NULL`.\n- This preserves all doctors, like the `LEFT JOIN` solution.\n\n## Difference from the optimal approach\n\nIt works correctly, but `LEFT JOIN` is usually clearer and more efficient for this pattern.",
      },
    ],
  },
  {
    code: "HOSPITAL_008",
    approaches: [
      {
        approach_title: "JOIN distinct patients",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN insurance_policies ip ON p.id = ip.patient_id ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to insurance policies and remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN insurance_policies ip\n  ON p.id = ip.patient_id\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps only patients who have a matching insurance policy.\n- A patient can have multiple policies, so `DISTINCT` avoids duplicate patient rows.\n- Sorting by patient id matches the expected order.\n\n## Why this is optimal\n\nIt is straightforward and correctly handles patients with more than one policy.",
      },
      {
        approach_title: "EXISTS patients",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM insurance_policies ip WHERE ip.patient_id = p.id) ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nReturn patients only if a matching policy exists.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nWHERE EXISTS (\n  SELECT 1\n  FROM insurance_policies ip\n  WHERE ip.patient_id = p.id\n)\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` checks whether the patient has at least one policy.\n- It naturally avoids duplicates because it returns rows from `patients` only once.\n\n## Difference from the optimal approach\n\nAlso very good, but the join-based method is often more familiar to learners at this stage.",
      },
      {
        approach_title: "GROUP BY patients",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN insurance_policies ip ON p.id = ip.patient_id GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin the tables and group by the patient columns.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN insurance_policies ip\n  ON p.id = ip.patient_id\nGROUP BY p.id, p.patient_code, p.full_name\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps patients with policies.\n- `GROUP BY` collapses multiple policy rows for the same patient.\n- The result is one row per patient.\n\n## Difference from the optimal approach\n\nWorks correctly, but `DISTINCT` is shorter and clearer here.",
      },
    ],
  },
  {
    code: "HOSPITAL_009",
    approaches: [
      {
        approach_title: "Filter completed orders",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, lab_order_number, patient_id, encounter_id, ordered_at FROM lab_orders WHERE order_status = 'completed' ORDER BY ordered_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter lab orders by completed status and sort by most recent order time.\n\n## Query\n\n```sql\nSELECT id, lab_order_number, patient_id, encounter_id, ordered_at\nFROM lab_orders\nWHERE order_status = 'completed'\nORDER BY ordered_at DESC, id ASC;\n```\n\n## Explanation\n\n- `order_status = 'completed'` keeps only completed lab orders.\n- The selected columns match the expected output.\n- Ordering by `ordered_at DESC` shows the most recent orders first.\n\n## Why this is optimal\n\nIt is the cleanest way to apply the status filter and expected ordering.",
      },
      {
        approach_title: "IN completed",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, lab_order_number, patient_id, encounter_id, ordered_at FROM lab_orders WHERE order_status IN ('completed') ORDER BY ordered_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` for the completed status.\n\n## Query\n\n```sql\nSELECT id, lab_order_number, patient_id, encounter_id, ordered_at\nFROM lab_orders\nWHERE order_status IN ('completed')\nORDER BY ordered_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('completed')` behaves like an equality check here.\n- The result stays the same.\n\n## Difference from the optimal approach\n\nLess direct when there is only one status value.",
      },
      {
        approach_title: "CTE completed labs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH completed_lab_orders AS (\n  SELECT id, lab_order_number, patient_id, encounter_id, ordered_at\n  FROM lab_orders\n  WHERE order_status = 'completed'\n)\nSELECT id, lab_order_number, patient_id, encounter_id, ordered_at\nFROM completed_lab_orders\nORDER BY ordered_at DESC, id ASC;",
        explanation:
          "## Approach\n\nStore completed lab orders in a CTE and return them in order.\n\n## Query\n\n```sql\nWITH completed_lab_orders AS (\n  SELECT id, lab_order_number, patient_id, encounter_id, ordered_at\n  FROM lab_orders\n  WHERE order_status = 'completed'\n)\nSELECT id, lab_order_number, patient_id, encounter_id, ordered_at\nFROM completed_lab_orders\nORDER BY ordered_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates completed lab orders.\n- The outer query applies the final ordering.\n- This is helpful if more derived columns are needed later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "HOSPITAL_010",
    approaches: [
      {
        approach_title: "Filter paid invoices",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, invoice_number, patient_id, total_amount, issued_at FROM invoices WHERE invoice_status = 'paid' ORDER BY issued_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only fully paid invoices and sort them by issue date.\n\n## Query\n\n```sql\nSELECT id, invoice_number, patient_id, total_amount, issued_at\nFROM invoices\nWHERE invoice_status = 'paid'\nORDER BY issued_at DESC, id ASC;\n```\n\n## Explanation\n\n- `invoice_status = 'paid'` filters to fully paid invoices only.\n- The selected columns match the expected result.\n- `ORDER BY issued_at DESC, id ASC` matches the required ordering.\n\n## Why this is optimal\n\nIt directly expresses the condition and required sort order.",
      },
      {
        approach_title: "IN paid",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, invoice_number, patient_id, total_amount, issued_at FROM invoices WHERE invoice_status IN ('paid') ORDER BY issued_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with a single paid status.\n\n## Query\n\n```sql\nSELECT id, invoice_number, patient_id, total_amount, issued_at\nFROM invoices\nWHERE invoice_status IN ('paid')\nORDER BY issued_at DESC, id ASC;\n```\n\n## Explanation\n\n- This works the same as checking equality here.\n- The final output and ordering remain unchanged.\n\n## Difference from the optimal approach\n\nIt works, but is less direct for a single value.",
      },
      {
        approach_title: "CTE paid invoices",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH paid_invoices AS (\n  SELECT id, invoice_number, patient_id, total_amount, issued_at\n  FROM invoices\n  WHERE invoice_status = 'paid'\n)\nSELECT id, invoice_number, patient_id, total_amount, issued_at\nFROM paid_invoices\nORDER BY issued_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter paid invoices in a CTE, then sort them in the final query.\n\n## Query\n\n```sql\nWITH paid_invoices AS (\n  SELECT id, invoice_number, patient_id, total_amount, issued_at\n  FROM invoices\n  WHERE invoice_status = 'paid'\n)\nSELECT id, invoice_number, patient_id, total_amount, issued_at\nFROM paid_invoices\nORDER BY issued_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE captures only paid invoices.\n- The outer query returns them in the expected order.\n- This can make later extensions easier.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when layering more logic.",
      },
    ],
  },
  {
    code: "HOSPITAL_011",
    approaches: [
      {
        approach_title: "Count by doctor",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, COUNT(*) AS total_appointments FROM appointments GROUP BY doctor_id ORDER BY total_appointments DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nGroup appointments by doctor and count the rows.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(*) AS total_appointments\nFROM appointments\nGROUP BY doctor_id\nORDER BY total_appointments DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- Each row in `appointments` is one appointment.\n- `GROUP BY doctor_id` makes one group per doctor.\n- `COUNT(*)` gives the number of appointments in each group.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the most direct way to calculate appointment totals per doctor.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT doctor_id, COUNT(id) AS total_appointments FROM appointments GROUP BY doctor_id ORDER BY total_appointments DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCount appointment ids for each doctor.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(id) AS total_appointments\nFROM appointments\nGROUP BY doctor_id\nORDER BY total_appointments DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL appointment ids.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counting.",
      },
      {
        approach_title: "CTE doctor count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_appointments AS (\n  SELECT doctor_id, COUNT(*) AS total_appointments\n  FROM appointments\n  GROUP BY doctor_id\n)\nSELECT doctor_id, total_appointments\nFROM doctor_appointments\nORDER BY total_appointments DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCalculate appointment totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH doctor_appointments AS (\n  SELECT doctor_id, COUNT(*) AS total_appointments\n  FROM appointments\n  GROUP BY doctor_id\n)\nSELECT doctor_id, total_appointments\nFROM doctor_appointments\nORDER BY total_appointments DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one row per doctor.\n- The outer query applies the final sort.\n- This is useful if more derived columns are added later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "HOSPITAL_012",
    approaches: [
      {
        approach_title: "Join distinct",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to allergies and remove duplicate patient rows.\n\n## Query\n\n```sql\nSELECT DISTINCT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN patient_allergies pa\n  ON p.id = pa.patient_id\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps patients who have at least one allergy row.\n- A patient can have many allergies, so `DISTINCT` avoids duplicates.\n- Sorting by `id` matches the expected output.\n\n## Why this is optimal\n\nIt is short, clear, and handles one-to-many relationships correctly.",
      },
      {
        approach_title: "EXISTS patients",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM patient_allergies pa WHERE pa.patient_id = p.id) ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nReturn patients only if a related allergy record exists.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nWHERE EXISTS (\n  SELECT 1\n  FROM patient_allergies pa\n  WHERE pa.patient_id = p.id\n)\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` checks whether the patient has at least one allergy.\n- Each patient row appears only once.\n- The order stays the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the join plus `DISTINCT` is often easier for learners to follow.",
      },
      {
        approach_title: "Group patients",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin the tables and group by patient fields.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN patient_allergies pa\n  ON p.id = pa.patient_id\nGROUP BY p.id, p.patient_code, p.full_name\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps only patients with allergy records.\n- `GROUP BY` collapses multiple allergy rows into one patient row.\n- The final order matches the expected output.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is shorter and clearer for this case.",
      },
    ],
  },
  {
    code: "HOSPITAL_013",
    approaches: [
      {
        approach_title: "Join approved leaves",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date FROM doctor_leaves dl JOIN doctors d ON dl.doctor_id = d.id WHERE dl.approval_status = 'approved' ORDER BY dl.start_date ASC, dl.id ASC;",
        explanation:
          "## Approach\n\nJoin leave records to doctors and keep only approved leaves.\n\n## Query\n\n```sql\nSELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date\nFROM doctor_leaves dl\nJOIN doctors d\n  ON dl.doctor_id = d.id\nWHERE dl.approval_status = 'approved'\nORDER BY dl.start_date ASC, dl.id ASC;\n```\n\n## Explanation\n\n- `doctor_leaves` contains leave details.\n- Joining `doctors` provides the doctor name.\n- `WHERE dl.approval_status = 'approved'` filters to approved leaves only.\n- The sort order matches the expected result.\n\n## Why this is optimal\n\nIt directly uses the needed tables and returns exactly the required columns.",
      },
      {
        approach_title: "CTE approved leaves",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH approved_leaves AS (\n  SELECT id, doctor_id, leave_type, start_date, end_date\n  FROM doctor_leaves\n  WHERE approval_status = 'approved'\n)\nSELECT al.id, al.doctor_id, d.full_name, al.leave_type, al.start_date, al.end_date\nFROM approved_leaves al\nJOIN doctors d ON al.doctor_id = d.id\nORDER BY al.start_date ASC, al.id ASC;",
        explanation:
          "## Approach\n\nFilter approved leaves first, then join doctors.\n\n## Query\n\n```sql\nWITH approved_leaves AS (\n  SELECT id, doctor_id, leave_type, start_date, end_date\n  FROM doctor_leaves\n  WHERE approval_status = 'approved'\n)\nSELECT al.id, al.doctor_id, d.full_name, al.leave_type, al.start_date, al.end_date\nFROM approved_leaves al\nJOIN doctors d ON al.doctor_id = d.id\nORDER BY al.start_date ASC, al.id ASC;\n```\n\n## Explanation\n\n- The CTE isolates approved leave rows.\n- The outer query joins them to doctor names.\n- This can make later modifications easier.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed here.",
      },
      {
        approach_title: "IN approved doctors",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date FROM doctor_leaves dl JOIN doctors d ON dl.doctor_id = d.id WHERE dl.doctor_id IN (SELECT doctor_id FROM doctor_leaves WHERE approval_status = 'approved') AND dl.approval_status = 'approved' ORDER BY dl.start_date ASC, dl.id ASC;",
        explanation:
          "## Approach\n\nUse a subquery for approved doctors and still filter approved leave rows.\n\n## Query\n\n```sql\nSELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date\nFROM doctor_leaves dl\nJOIN doctors d\n  ON dl.doctor_id = d.id\nWHERE dl.doctor_id IN (\n  SELECT doctor_id\n  FROM doctor_leaves\n  WHERE approval_status = 'approved'\n)\n  AND dl.approval_status = 'approved'\nORDER BY dl.start_date ASC, dl.id ASC;\n```\n\n## Explanation\n\n- The subquery finds doctors with approved leaves.\n- The main query still filters to approved leave rows.\n- The output is the same.\n\n## Difference from the optimal approach\n\nThis adds unnecessary work for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_014",
    approaches: [
      {
        approach_title: "Filter active tests",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, test_code, test_name, test_category, standard_price FROM lab_test_catalog WHERE is_active = true ORDER BY test_name ASC, id ASC;",
        explanation:
          "## Approach\n\nKeep only active lab tests and sort by test name.\n\n## Query\n\n```sql\nSELECT id, test_code, test_name, test_category, standard_price\nFROM lab_test_catalog\nWHERE is_active = true\nORDER BY test_name ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = true` keeps active catalog entries.\n- The selected columns match the expected output.\n- Ordering by `test_name` then `id` matches the required sort order.\n\n## Why this is optimal\n\nIt is the simplest query that matches the filter and sorting exactly.",
      },
      {
        approach_title: "Boolean active",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, test_code, test_name, test_category, standard_price FROM lab_test_catalog WHERE is_active ORDER BY test_name ASC, id ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand for active tests.\n\n## Query\n\n```sql\nSELECT id, test_code, test_name, test_category, standard_price\nFROM lab_test_catalog\nWHERE is_active\nORDER BY test_name ASC, id ASC;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the value is true.\n- The output columns and order remain the same.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for practice use.",
      },
      {
        approach_title: "CTE active tests",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_tests AS (\n  SELECT id, test_code, test_name, test_category, standard_price\n  FROM lab_test_catalog\n  WHERE is_active = true\n)\nSELECT id, test_code, test_name, test_category, standard_price\nFROM active_tests\nORDER BY test_name ASC, id ASC;",
        explanation:
          "## Approach\n\nStore active tests in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH active_tests AS (\n  SELECT id, test_code, test_name, test_category, standard_price\n  FROM lab_test_catalog\n  WHERE is_active = true\n)\nSELECT id, test_code, test_name, test_category, standard_price\nFROM active_tests\nORDER BY test_name ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates active lab tests.\n- The outer query returns them in the required order.\n- This is useful if more derived fields are needed later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to expand.",
      },
    ],
  },
  {
    code: "HOSPITAL_015",
    approaches: [
      {
        approach_title: "Filter primary",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date FROM insurance_policies WHERE is_primary = true ORDER BY patient_id ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter insurance policies to only primary ones.\n\n## Query\n\n```sql\nSELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date\nFROM insurance_policies\nWHERE is_primary = true\nORDER BY patient_id ASC, id ASC;\n```\n\n## Explanation\n\n- `is_primary = true` keeps the primary policy rows.\n- The selected columns match the expected output.\n- The ordering matches the required sort order.\n\n## Why this is optimal\n\nIt directly expresses the condition and expected ordering.",
      },
      {
        approach_title: "Boolean primary",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date FROM insurance_policies WHERE is_primary ORDER BY patient_id ASC, id ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand for primary policies.\n\n## Query\n\n```sql\nSELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date\nFROM insurance_policies\nWHERE is_primary\nORDER BY patient_id ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_primary` means the same as `WHERE is_primary = true`.\n- The returned rows and sorting are the same.\n\n## Difference from the optimal approach\n\nShorter, but less explicit.",
      },
      {
        approach_title: "CTE primary",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH primary_policies AS (\n  SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date\n  FROM insurance_policies\n  WHERE is_primary = true\n)\nSELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date\nFROM primary_policies\nORDER BY patient_id ASC, id ASC;",
        explanation:
          "## Approach\n\nPut primary policies in a CTE, then return them.\n\n## Query\n\n```sql\nWITH primary_policies AS (\n  SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date\n  FROM insurance_policies\n  WHERE is_primary = true\n)\nSELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date\nFROM primary_policies\nORDER BY patient_id ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates only primary policies.\n- The outer query handles the final ordering.\n- This is useful if more logic is added later.\n\n## Difference from the optimal approach\n\nLonger than necessary for this simple filter.",
      },
    ],
  },
  {
    code: "HOSPITAL_016",
    approaches: [
      {
        approach_title: "Filter admitted",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, admission_number, patient_id, department_id, admitted_at FROM admissions WHERE admission_status = 'admitted' ORDER BY admitted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only admissions with admitted status.\n\n## Query\n\n```sql\nSELECT id, admission_number, patient_id, department_id, admitted_at\nFROM admissions\nWHERE admission_status = 'admitted'\nORDER BY admitted_at DESC, id ASC;\n```\n\n## Explanation\n\n- `admission_status = 'admitted'` filters to currently admitted rows.\n- The chosen columns match the expected result.\n- The sort order matches the requirement.\n\n## Why this is optimal\n\nIt answers the question directly with the exact filter and ordering.",
      },
      {
        approach_title: "IN admitted",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, admission_number, patient_id, department_id, admitted_at FROM admissions WHERE admission_status IN ('admitted') ORDER BY admitted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with a single admission status.\n\n## Query\n\n```sql\nSELECT id, admission_number, patient_id, department_id, admitted_at\nFROM admissions\nWHERE admission_status IN ('admitted')\nORDER BY admitted_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('admitted')` behaves the same as equality here.\n- The output remains unchanged.\n\n## Difference from the optimal approach\n\nLess direct for a single status value.",
      },
      {
        approach_title: "CTE admitted",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_admissions AS (\n  SELECT id, admission_number, patient_id, department_id, admitted_at\n  FROM admissions\n  WHERE admission_status = 'admitted'\n)\nSELECT id, admission_number, patient_id, department_id, admitted_at\nFROM active_admissions\nORDER BY admitted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nCreate a CTE for admitted rows and sort them outside.\n\n## Query\n\n```sql\nWITH active_admissions AS (\n  SELECT id, admission_number, patient_id, department_id, admitted_at\n  FROM admissions\n  WHERE admission_status = 'admitted'\n)\nSELECT id, admission_number, patient_id, department_id, admitted_at\nFROM active_admissions\nORDER BY admitted_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores admitted admissions only.\n- The outer query returns them in the expected order.\n- This is helpful if more logic is layered on top.\n\n## Difference from the optimal approach\n\nMore verbose, but useful for extension.",
      },
    ],
  },
  {
    code: "HOSPITAL_017",
    approaches: [
      {
        approach_title: "LEFT JOIN spec",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT d.id, d.full_name, s.name AS specialization_name FROM doctors d LEFT JOIN specializations s ON d.primary_specialization_id = s.id ORDER BY d.full_name ASC, d.id ASC;",
        explanation:
          "## Approach\n\nJoin doctors to specializations and keep all doctors, even when a primary specialization is missing.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name, s.name AS specialization_name\nFROM doctors d\nLEFT JOIN specializations s\n  ON d.primary_specialization_id = s.id\nORDER BY d.full_name ASC, d.id ASC;\n```\n\n## Explanation\n\n- `doctors` is the main table.\n- `LEFT JOIN` keeps every doctor row in the output.\n- If a doctor has no matching specialization, `specialization_name` becomes `NULL`.\n- This matches the expected row count and output shape.\n- The final ordering is by doctor name, then id.\n\n## Why this is optimal\n\nIt returns all doctors while still showing specialization names where available.",
      },
      {
        approach_title: "CTE left join",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_specs AS (\n  SELECT d.id, d.full_name, s.name AS specialization_name\n  FROM doctors d\n  LEFT JOIN specializations s ON d.primary_specialization_id = s.id\n)\nSELECT id, full_name, specialization_name\nFROM doctor_specs\nORDER BY full_name ASC, id ASC;",
        explanation:
          "## Approach\n\nBuild the doctor-specialization mapping in a CTE first, then sort it outside.\n\n## Query\n\n```sql\nWITH doctor_specs AS (\n  SELECT d.id, d.full_name, s.name AS specialization_name\n  FROM doctors d\n  LEFT JOIN specializations s ON d.primary_specialization_id = s.id\n)\nSELECT id, full_name, specialization_name\nFROM doctor_specs\nORDER BY full_name ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per doctor with the specialization name if present.\n- The outer query handles the final ordering.\n- This is useful when more derived fields may be added later.\n\n## Difference from the optimal approach\n\nIt produces the same result, but is more verbose.",
      },
      {
        approach_title: "Correlated subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT d.id, d.full_name, (SELECT s.name FROM specializations s WHERE s.id = d.primary_specialization_id) AS specialization_name FROM doctors d ORDER BY d.full_name ASC, d.id ASC;",
        explanation:
          "## Approach\n\nFetch the specialization name with a correlated subquery for each doctor row.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name,\n       (SELECT s.name\n        FROM specializations s\n        WHERE s.id = d.primary_specialization_id) AS specialization_name\nFROM doctors d\nORDER BY d.full_name ASC, d.id ASC;\n```\n\n## Explanation\n\n- The outer query reads from `doctors`.\n- The subquery looks up the matching specialization name using `primary_specialization_id`.\n- If no specialization matches, the subquery returns `NULL`.\n- This preserves all doctors, like the `LEFT JOIN` solution.\n\n## Difference from the optimal approach\n\nIt works correctly, but `LEFT JOIN` is usually clearer and more efficient for this pattern.",
      },
    ],
  },
  {
    code: "HOSPITAL_018",
    approaches: [
      {
        approach_title: "Filter successful",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at FROM payments WHERE payment_status = 'successful' ORDER BY paid_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter payments to successful ones and sort by payment time.\n\n## Query\n\n```sql\nSELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at\nFROM payments\nWHERE payment_status = 'successful'\nORDER BY paid_at DESC, id ASC;\n```\n\n## Explanation\n\n- `payment_status = 'successful'` keeps successful payments only.\n- The selected columns match the expected result.\n- Ordering by `paid_at DESC` shows the latest payments first.\n\n## Why this is optimal\n\nIt directly matches the status filter and required output.",
      },
      {
        approach_title: "IN successful",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at FROM payments WHERE payment_status IN ('successful') ORDER BY paid_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` for the successful status.\n\n## Query\n\n```sql\nSELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at\nFROM payments\nWHERE payment_status IN ('successful')\nORDER BY paid_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('successful')` behaves like an equality comparison here.\n- The result stays the same.\n\n## Difference from the optimal approach\n\nLess direct when only one value is being checked.",
      },
      {
        approach_title: "CTE successful",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH successful_payments AS (\n  SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at\nFROM successful_payments\nORDER BY paid_at DESC, id ASC;",
        explanation:
          "## Approach\n\nPlace successful payments in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH successful_payments AS (\n  SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at\nFROM successful_payments\nORDER BY paid_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE filters the payment rows first.\n- The outer query performs the final sort.\n- This makes the query easier to extend later.\n\n## Difference from the optimal approach\n\nMore verbose, but structured.",
      },
    ],
  },
  {
    code: "HOSPITAL_019",
    approaches: [
      {
        approach_title: "Filter review claims",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at FROM insurance_claims WHERE claim_status = 'under_review' ORDER BY submitted_at ASC, id ASC;",
        explanation:
          "## Approach\n\nKeep only claims that are under review.\n\n## Query\n\n```sql\nSELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at\nFROM insurance_claims\nWHERE claim_status = 'under_review'\nORDER BY submitted_at ASC, id ASC;\n```\n\n## Explanation\n\n- `claim_status = 'under_review'` filters to claims still being reviewed.\n- The selected columns match the expected output.\n- The sorting matches the required order.\n\n## Why this is optimal\n\nIt is the simplest and clearest solution for this filter-based question.",
      },
      {
        approach_title: "IN review",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at FROM insurance_claims WHERE claim_status IN ('under_review') ORDER BY submitted_at ASC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with a single claim status.\n\n## Query\n\n```sql\nSELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at\nFROM insurance_claims\nWHERE claim_status IN ('under_review')\nORDER BY submitted_at ASC, id ASC;\n```\n\n## Explanation\n\n- `IN ('under_review')` gives the same result as equality.\n- The final ordering remains unchanged.\n\n## Difference from the optimal approach\n\nIt works, but equality is more direct here.",
      },
      {
        approach_title: "CTE review claims",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH review_claims AS (\n  SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at\n  FROM insurance_claims\n  WHERE claim_status = 'under_review'\n)\nSELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at\nFROM review_claims\nORDER BY submitted_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter the claims in a CTE and return them in sorted order.\n\n## Query\n\n```sql\nWITH review_claims AS (\n  SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at\n  FROM insurance_claims\n  WHERE claim_status = 'under_review'\n)\nSELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at\nFROM review_claims\nORDER BY submitted_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the under-review claims.\n- The outer query applies the expected ordering.\n- This is useful when you want to add more logic later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_020",
    approaches: [
      {
        approach_title: "Select and sort",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM patient_feedback ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nSelect the required feedback columns and sort by newest first.\n\n## Query\n\n```sql\nSELECT id, patient_id, doctor_id, rating, feedback_category, created_at\nFROM patient_feedback\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- No filtering is needed because the question asks for all feedback entries.\n- The selected columns match the expected output.\n- `ORDER BY created_at DESC, id ASC` matches the required order.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to return all feedback rows in the expected order.",
      },
      {
        approach_title: "CTE feedback",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH feedback_rows AS (\n  SELECT id, patient_id, doctor_id, rating, feedback_category, created_at\n  FROM patient_feedback\n)\nSELECT id, patient_id, doctor_id, rating, feedback_category, created_at\nFROM feedback_rows\nORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nPut the feedback rows in a CTE and sort them outside.\n\n## Query\n\n```sql\nWITH feedback_rows AS (\n  SELECT id, patient_id, doctor_id, rating, feedback_category, created_at\n  FROM patient_feedback\n)\nSELECT id, patient_id, doctor_id, rating, feedback_category, created_at\nFROM feedback_rows\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the selected feedback columns.\n- The outer query applies the final ordering.\n- This can help when more transformations are added later.\n\n## Difference from the optimal approach\n\nMore verbose without adding value for this simple query.",
      },
      {
        approach_title: "Subquery sort",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM (SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM patient_feedback) pf ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a derived table, then sort the result.\n\n## Query\n\n```sql\nSELECT id, patient_id, doctor_id, rating, feedback_category, created_at\nFROM (\n  SELECT id, patient_id, doctor_id, rating, feedback_category, created_at\n  FROM patient_feedback\n) pf\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query selects the needed columns.\n- The outer query handles the sort order.\n- This is functionally the same as the simple query.\n\n## Difference from the optimal approach\n\nIt works, but adds an unnecessary layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_021",
    approaches: [
      {
        approach_title: "AVG by dept",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ORDER BY avg_consultation_fee DESC, d.department_id ASC;",
        explanation:
          "## Approach\n\nJoin doctors to departments, keep active doctors, then average their consultation fees.\n\n## Query\n\n```sql\nSELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee\nFROM doctors d\nJOIN departments dp ON d.department_id = dp.id\nWHERE d.is_active = true\nGROUP BY d.department_id, dp.name\nORDER BY avg_consultation_fee DESC, d.department_id ASC;\n```\n\n## Explanation\n\n- `JOIN departments` brings in the department name.\n- `WHERE d.is_active = true` limits the calculation to active doctors.\n- `AVG(d.consultation_fee)` computes the department-level average fee.\n- `ROUND(..., 2)` formats the result to 2 decimal places.\n- The final `ORDER BY` matches the expected output.\n\n## Why this is optimal\n\nIt directly computes the required metric with the needed join, filter, grouping, and sort.",
      },
      {
        approach_title: "CTE fee avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH department_fee_avg AS ( SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ) SELECT department_id, department_name, avg_consultation_fee FROM department_fee_avg ORDER BY avg_consultation_fee DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute department averages in a CTE, then sort the final result.\n\n## Query\n\n```sql\nWITH department_fee_avg AS (\n  SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee\n  FROM doctors d\n  JOIN departments dp ON d.department_id = dp.id\n  WHERE d.is_active = true\n  GROUP BY d.department_id, dp.name\n)\nSELECT department_id, department_name, avg_consultation_fee\nFROM department_fee_avg\nORDER BY avg_consultation_fee DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one row per department.\n- The outer query applies the expected ordering.\n- This style is useful when more derived metrics may be added later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT department_id, department_name, avg_consultation_fee FROM ( SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ) x ORDER BY avg_consultation_fee DESC, department_id ASC;",
        explanation:
          "## Approach\n\nUse a derived table to calculate averages, then sort outside.\n\n## Query\n\n```sql\nSELECT department_id, department_name, avg_consultation_fee\nFROM (\n  SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee\n  FROM doctors d\n  JOIN departments dp ON d.department_id = dp.id\n  WHERE d.is_active = true\n  GROUP BY d.department_id, dp.name\n) x\nORDER BY avg_consultation_fee DESC, department_id ASC;\n```\n\n## Explanation\n\n- The inner query computes the department averages.\n- The outer query returns the rows in the final order.\n- The result is the same as the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an extra layer without changing the result.",
      },
    ],
  },
  {
    code: "HOSPITAL_022",
    approaches: [
      {
        approach_title: "Count by status",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT appointment_status, COUNT(*) AS total_appointments FROM appointments GROUP BY appointment_status ORDER BY total_appointments DESC, appointment_status ASC;",
        explanation:
          "## Approach\n\nGroup appointments by status and count the rows in each group.\n\n## Query\n\n```sql\nSELECT appointment_status, COUNT(*) AS total_appointments\nFROM appointments\nGROUP BY appointment_status\nORDER BY total_appointments DESC, appointment_status ASC;\n```\n\n## Explanation\n\n- `GROUP BY appointment_status` creates one group for each status.\n- `COUNT(*)` counts how many appointments fall into each status.\n- The sort order matches the expected output.\n\n## Why this is optimal\n\nIt is the shortest and clearest grouped count query for this requirement.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT appointment_status, COUNT(id) AS total_appointments FROM appointments GROUP BY appointment_status ORDER BY total_appointments DESC, appointment_status ASC;",
        explanation:
          "## Approach\n\nCount appointment ids for each status.\n\n## Query\n\n```sql\nSELECT appointment_status, COUNT(id) AS total_appointments\nFROM appointments\nGROUP BY appointment_status\nORDER BY total_appointments DESC, appointment_status ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL appointment ids.\n- Since `id` is a primary key, it is never NULL.\n- So this gives the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE status count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH status_counts AS ( SELECT appointment_status, COUNT(*) AS total_appointments FROM appointments GROUP BY appointment_status ) SELECT appointment_status, total_appointments FROM status_counts ORDER BY total_appointments DESC, appointment_status ASC;",
        explanation:
          "## Approach\n\nCalculate the grouped counts in a CTE, then order them.\n\n## Query\n\n```sql\nWITH status_counts AS (\n  SELECT appointment_status, COUNT(*) AS total_appointments\n  FROM appointments\n  GROUP BY appointment_status\n)\nSELECT appointment_status, total_appointments\nFROM status_counts\nORDER BY total_appointments DESC, appointment_status ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per status.\n- The outer query applies the expected ordering.\n- This can help when adding more logic later.\n\n## Difference from the optimal approach\n\nMore verbose for a simple grouped count.",
      },
    ],
  },
  {
    code: "HOSPITAL_023",
    approaches: [
      {
        approach_title: "Count occupied",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS occupied_beds FROM beds WHERE bed_status = 'occupied';",
        explanation:
          "## Approach\n\nFilter beds to occupied ones, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS occupied_beds\nFROM beds\nWHERE bed_status = 'occupied';\n```\n\n## Explanation\n\n- `WHERE bed_status = 'occupied'` keeps only occupied beds.\n- `COUNT(*)` returns how many such rows exist.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is the simplest way to count occupied beds.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS occupied_beds FROM beds WHERE bed_status = 'occupied';",
        explanation:
          "## Approach\n\nCount bed ids after filtering to occupied beds.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS occupied_beds\nFROM beds\nWHERE bed_status = 'occupied';\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL bed ids.\n- Since `id` is a primary key, it is never NULL.\n- So the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nWorks correctly, but is less direct.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH occupied_count AS ( SELECT COUNT(*) AS occupied_beds FROM beds WHERE bed_status = 'occupied' ) SELECT occupied_beds FROM occupied_count;",
        explanation:
          "## Approach\n\nCompute the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH occupied_count AS (\n  SELECT COUNT(*) AS occupied_beds\n  FROM beds\n  WHERE bed_status = 'occupied'\n)\nSELECT occupied_beds\nFROM occupied_count;\n```\n\n## Explanation\n\n- The CTE calculates the total occupied bed count.\n- The outer query simply selects the result.\n- This pattern is useful if more metrics are later added.\n\n## Difference from the optimal approach\n\nMore verbose for a single aggregate.",
      },
    ],
  },
  {
    code: "HOSPITAL_024",
    approaches: [
      {
        approach_title: "Count admissions",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, COUNT(*) AS total_admissions FROM admissions GROUP BY department_id ORDER BY total_admissions DESC, department_id ASC;",
        explanation:
          "## Approach\n\nGroup admissions by department and count them.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(*) AS total_admissions\nFROM admissions\nGROUP BY department_id\nORDER BY total_admissions DESC, department_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY department_id` creates one group per department.\n- `COUNT(*)` counts admissions in each group.\n- The final sort matches the expected output.\n\n## Why this is optimal\n\nIt directly computes department-wise admission counts with the needed ordering.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT department_id, COUNT(id) AS total_admissions FROM admissions GROUP BY department_id ORDER BY total_admissions DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCount admission ids for each department.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(id) AS total_admissions\nFROM admissions\nGROUP BY department_id\nORDER BY total_admissions DESC, department_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL admission ids.\n- Since `id` is a primary key, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE admission count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH admission_counts AS ( SELECT department_id, COUNT(*) AS total_admissions FROM admissions GROUP BY department_id ) SELECT department_id, total_admissions FROM admission_counts ORDER BY total_admissions DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute the grouped admission counts in a CTE.\n\n## Query\n\n```sql\nWITH admission_counts AS (\n  SELECT department_id, COUNT(*) AS total_admissions\n  FROM admissions\n  GROUP BY department_id\n)\nSELECT department_id, total_admissions\nFROM admission_counts\nORDER BY total_admissions DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per department.\n- The outer query handles the final ordering.\n- This is useful when you want to extend the output later.\n\n## Difference from the optimal approach\n\nLonger without changing the result.",
      },
    ],
  },
  {
    code: "HOSPITAL_025",
    approaches: [
      {
        approach_title: "SUM by patient",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ORDER BY total_invoice_amount DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nGroup invoices by patient and sum the total amount.\n\n## Query\n\n```sql\nSELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount\nFROM invoices\nGROUP BY patient_id\nORDER BY total_invoice_amount DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY patient_id` creates one row per patient.\n- `SUM(total_amount)` adds up all invoice amounts for that patient.\n- `ROUND(..., 2)` formats the result to 2 decimal places.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the most direct way to calculate total billed amount per patient.",
      },
      {
        approach_title: "CTE invoice sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH patient_invoice_totals AS ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ) SELECT patient_id, total_invoice_amount FROM patient_invoice_totals ORDER BY total_invoice_amount DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCalculate patient totals in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH patient_invoice_totals AS (\n  SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount\n  FROM invoices\n  GROUP BY patient_id\n)\nSELECT patient_id, total_invoice_amount\nFROM patient_invoice_totals\nORDER BY total_invoice_amount DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one total per patient.\n- The outer query returns those totals in sorted order.\n- This can help if more metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery sum",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT patient_id, total_invoice_amount FROM ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ) x ORDER BY total_invoice_amount DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nUse a subquery to compute patient totals, then sort outside.\n\n## Query\n\n```sql\nSELECT patient_id, total_invoice_amount\nFROM (\n  SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount\n  FROM invoices\n  GROUP BY patient_id\n) x\nORDER BY total_invoice_amount DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The inner query computes the totals.\n- The outer query handles the final sort order.\n- The result matches the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an unnecessary layer here.",
      },
    ],
  },
  {
    code: "HOSPITAL_026",
    approaches: [
      {
        approach_title: "Count lab orders",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, COUNT(*) AS total_lab_orders FROM lab_orders GROUP BY patient_id ORDER BY total_lab_orders DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nGroup lab orders by patient and count them.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(*) AS total_lab_orders\nFROM lab_orders\nGROUP BY patient_id\nORDER BY total_lab_orders DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY patient_id` creates one group per patient.\n- `COUNT(*)` returns how many lab orders each patient has.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the clearest grouped count query for this requirement.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT patient_id, COUNT(id) AS total_lab_orders FROM lab_orders GROUP BY patient_id ORDER BY total_lab_orders DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCount lab order ids for each patient.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(id) AS total_lab_orders\nFROM lab_orders\nGROUP BY patient_id\nORDER BY total_lab_orders DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL lab order ids.\n- Since `id` is a primary key, the result equals `COUNT(*)`.\n\n## Difference from the optimal approach\n\nWorks fine, but is less direct.",
      },
      {
        approach_title: "CTE lab count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH patient_lab_counts AS ( SELECT patient_id, COUNT(*) AS total_lab_orders FROM lab_orders GROUP BY patient_id ) SELECT patient_id, total_lab_orders FROM patient_lab_counts ORDER BY total_lab_orders DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCompute patient lab order counts in a CTE.\n\n## Query\n\n```sql\nWITH patient_lab_counts AS (\n  SELECT patient_id, COUNT(*) AS total_lab_orders\n  FROM lab_orders\n  GROUP BY patient_id\n)\nSELECT patient_id, total_lab_orders\nFROM patient_lab_counts\nORDER BY total_lab_orders DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per patient.\n- The outer query sorts the result as expected.\n- This is useful if extra calculations are added later.\n\n## Difference from the optimal approach\n\nLonger than needed for a simple grouped count.",
      },
    ],
  },
  {
    code: "HOSPITAL_027",
    approaches: [
      {
        approach_title: "Count prescriptions",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, COUNT(*) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ORDER BY total_prescriptions DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nGroup prescriptions by doctor and count them.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(*) AS total_prescriptions\nFROM prescriptions\nGROUP BY doctor_id\nORDER BY total_prescriptions DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY doctor_id` creates one row per doctor.\n- `COUNT(*)` counts the prescriptions in each group.\n- The sorting matches the expected output.\n\n## Why this is optimal\n\nIt directly computes prescription totals per doctor with the correct order.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT doctor_id, COUNT(id) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ORDER BY total_prescriptions DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCount prescription ids by doctor.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(id) AS total_prescriptions\nFROM prescriptions\nGROUP BY doctor_id\nORDER BY total_prescriptions DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL prescription ids.\n- Since `id` is a primary key, it matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is simpler.",
      },
      {
        approach_title: "CTE rx count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_prescription_counts AS ( SELECT doctor_id, COUNT(*) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ) SELECT doctor_id, total_prescriptions FROM doctor_prescription_counts ORDER BY total_prescriptions DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute prescription counts in a CTE and sort afterward.\n\n## Query\n\n```sql\nWITH doctor_prescription_counts AS (\n  SELECT doctor_id, COUNT(*) AS total_prescriptions\n  FROM prescriptions\n  GROUP BY doctor_id\n)\nSELECT doctor_id, total_prescriptions\nFROM doctor_prescription_counts\nORDER BY total_prescriptions DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one row per doctor.\n- The outer query applies the expected sort order.\n- This form is useful if more logic is added later.\n\n## Difference from the optimal approach\n\nMore verbose without extra benefit here.",
      },
    ],
  },
  {
    code: "HOSPITAL_028",
    approaches: [
      {
        approach_title: "Filter critical",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation = 'critical' ORDER BY resulted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only critical lab results and sort by result time.\n\n## Query\n\n```sql\nSELECT id, lab_order_item_id, result_value, interpretation, resulted_at\nFROM lab_results\nWHERE interpretation = 'critical'\nORDER BY resulted_at DESC, id ASC;\n```\n\n## Explanation\n\n- `interpretation = 'critical'` filters to critical results.\n- The selected columns match the expected output.\n- The sort order matches the requirement.\n\n## Why this is optimal\n\nIt directly answers the question with the exact filter and ordering.",
      },
      {
        approach_title: "IN critical",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation IN ('critical') ORDER BY resulted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` to filter the critical interpretation.\n\n## Query\n\n```sql\nSELECT id, lab_order_item_id, result_value, interpretation, resulted_at\nFROM lab_results\nWHERE interpretation IN ('critical')\nORDER BY resulted_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('critical')` is equivalent to an equality comparison here.\n- The result and sort order stay the same.\n\n## Difference from the optimal approach\n\nLess direct for a single value.",
      },
      {
        approach_title: "CTE critical",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH critical_results AS ( SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation = 'critical' ) SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM critical_results ORDER BY resulted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter critical results in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH critical_results AS (\n  SELECT id, lab_order_item_id, result_value, interpretation, resulted_at\n  FROM lab_results\n  WHERE interpretation = 'critical'\n)\nSELECT id, lab_order_item_id, result_value, interpretation, resulted_at\nFROM critical_results\nORDER BY resulted_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates critical lab result rows.\n- The outer query applies the expected order.\n- This is useful when more derived columns are needed later.\n\n## Difference from the optimal approach\n\nMore verbose for a simple filter.",
      },
    ],
  },
  {
    code: "HOSPITAL_029",
    approaches: [
      {
        approach_title: "Sort by exp",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, years_of_experience FROM doctors ORDER BY years_of_experience DESC, id ASC;",
        explanation:
          "## Approach\n\nSelect doctors and sort by experience descending.\n\n## Query\n\n```sql\nSELECT id, full_name, years_of_experience\nFROM doctors\nORDER BY years_of_experience DESC, id ASC;\n```\n\n## Explanation\n\n- `years_of_experience DESC` puts the most experienced doctors first.\n- `id ASC` breaks ties consistently.\n- The order matches the validator exactly.\n\n## Why this is optimal\n\nIt directly returns the required rows in the expected order.",
      },
      {
        approach_title: "CTE sorted",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_experience AS ( SELECT id, full_name, years_of_experience FROM doctors ) SELECT id, full_name, years_of_experience FROM doctor_experience ORDER BY years_of_experience DESC, id ASC;",
        explanation:
          "## Approach\n\nSelect doctor experience fields in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH doctor_experience AS (\n  SELECT id, full_name, years_of_experience\n  FROM doctors\n)\nSELECT id, full_name, years_of_experience\nFROM doctor_experience\nORDER BY years_of_experience DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the required doctor columns.\n- The outer query applies the required ordering.\n- This matches the validator exactly.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Subquery sorted",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, full_name, years_of_experience FROM ( SELECT id, full_name, years_of_experience FROM doctors ) x ORDER BY years_of_experience DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a derived table, then apply the expected sort order.\n\n## Query\n\n```sql\nSELECT id, full_name, years_of_experience\nFROM (\n  SELECT id, full_name, years_of_experience\n  FROM doctors\n) x\nORDER BY years_of_experience DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query selects the needed doctor fields.\n- The outer query sorts by experience and id.\n- This avoids changing NULL ordering behavior with `NULLS LAST` or `COALESCE`.\n\n## Difference from the optimal approach\n\nIt works, but adds an unnecessary layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_030",
    approaches: [
      {
        approach_title: "Join chronic",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_conditions pc ON p.id = pc.patient_id WHERE pc.condition_status = 'chronic' ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to conditions, filter to chronic conditions, and remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN patient_conditions pc ON p.id = pc.patient_id\nWHERE pc.condition_status = 'chronic'\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps patients with matching condition records.\n- `WHERE pc.condition_status = 'chronic'` filters to chronic conditions only.\n- A patient may have multiple chronic conditions, so `DISTINCT` avoids duplicate patient rows.\n- The final sort matches the expected output.\n\n## Why this is optimal\n\nIt directly handles the one-to-many relationship and returns each matching patient once.",
      },
      {
        approach_title: "EXISTS chronic",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM patient_conditions pc WHERE pc.patient_id = p.id AND pc.condition_status = 'chronic') ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nReturn patients only if they have at least one chronic condition.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nWHERE EXISTS (\n  SELECT 1\n  FROM patient_conditions pc\n  WHERE pc.patient_id = p.id\n    AND pc.condition_status = 'chronic'\n)\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` checks whether the patient has at least one chronic condition row.\n- Each patient is returned once.\n- The ordering remains the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the join plus `DISTINCT` is often easier for learners to see.",
      },
      {
        approach_title: "Group chronic",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_conditions pc ON p.id = pc.patient_id WHERE pc.condition_status = 'chronic' GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to chronic conditions and group by patient fields.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN patient_conditions pc ON p.id = pc.patient_id\nWHERE pc.condition_status = 'chronic'\nGROUP BY p.id, p.patient_code, p.full_name\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps only patients with chronic conditions.\n- `GROUP BY` collapses multiple matching condition rows into one patient row.\n- The output is the same as the distinct-based solution.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is shorter and clearer here.",
      },
    ],
  },
  {
    code: "HOSPITAL_031",
    approaches: [
      {
        approach_title: "AVG stay days",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400), 2) AS avg_length_of_stay_days FROM admissions WHERE admission_status = 'discharged' AND discharge_at IS NOT NULL;",
        explanation:
          "## Approach\n\nFilter to discharged admissions, calculate each stay length in days, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400), 2) AS avg_length_of_stay_days\nFROM admissions\nWHERE admission_status = 'discharged'\n  AND discharge_at IS NOT NULL;\n```\n\n## Explanation\n\n- `discharge_at - admitted_at` gives the stay duration.\n- `EXTRACT(EPOCH FROM ...) / 86400` converts that interval into days.\n- `AVG(...)` computes the average across discharged admissions.\n- `ROUND(..., 2)` formats the result to 2 decimal places.\n- `discharge_at IS NOT NULL` avoids incomplete stays.\n\n## Why this is optimal\n\nIt is precise, compact, and works correctly with `ROUND(..., 2)`.",
      },
      {
        approach_title: "CTE stay avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH discharged_stays AS (\n  SELECT EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400 AS stay_days\n  FROM admissions\n  WHERE admission_status = 'discharged'\n    AND discharge_at IS NOT NULL\n)\nSELECT ROUND(AVG(stay_days), 2) AS avg_length_of_stay_days\nFROM discharged_stays;",
        explanation:
          "## Approach\n\nCompute stay duration in days inside a CTE, then average it outside.\n\n## Query\n\n```sql\nWITH discharged_stays AS (\n  SELECT EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400 AS stay_days\n  FROM admissions\n  WHERE admission_status = 'discharged'\n    AND discharge_at IS NOT NULL\n)\nSELECT ROUND(AVG(stay_days), 2) AS avg_length_of_stay_days\nFROM discharged_stays;\n```\n\n## Explanation\n\n- The CTE calculates one stay duration per discharged admission.\n- The outer query averages those values.\n- This is useful if you want to reuse `stay_days` later for more analysis.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is a little more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400)::numeric, 2) AS avg_length_of_stay_days FROM admissions WHERE admission_status = 'discharged' AND discharge_at IS NOT NULL;",
        explanation:
          "## Approach\n\nCompute the average stay in days first, cast the result to `numeric`, then round it.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400)::numeric, 2) AS avg_length_of_stay_days\nFROM admissions\nWHERE admission_status = 'discharged'\n  AND discharge_at IS NOT NULL;\n```\n\n## Explanation\n\n- The stay duration is still converted into days using epoch seconds.\n- `AVG(...)` returns the average stay length.\n- Casting to `numeric` before `ROUND(..., 2)` ensures compatibility in PostgreSQL setups that are strict about argument types.\n- The result is the same as the optimal query.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_032",
    approaches: [
      {
        approach_title: "Count by date",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY DATE(registered_at) ORDER BY registration_date ASC;",
        explanation:
          "## Approach\n\nConvert registration timestamps to dates, group by date, and count patients.\n\n## Query\n\n```sql\nSELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients\nFROM patients\nGROUP BY DATE(registered_at)\nORDER BY registration_date ASC;\n```\n\n## Explanation\n\n- `DATE(registered_at)` extracts just the calendar date.\n- `GROUP BY` collects all registrations from the same day together.\n- `COUNT(*)` gives the number of patients registered on each day.\n- The final sort is chronological.\n\n## Why this is optimal\n\nIt directly produces daily registration counts with the expected output shape.",
      },
      {
        approach_title: "Cast date",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT registered_at::date AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY registered_at::date ORDER BY registration_date ASC;",
        explanation:
          "## Approach\n\nCast the timestamp to a date before grouping.\n\n## Query\n\n```sql\nSELECT registered_at::date AS registration_date, COUNT(*) AS total_patients\nFROM patients\nGROUP BY registered_at::date\nORDER BY registration_date ASC;\n```\n\n## Explanation\n\n- `registered_at::date` converts the timestamp into a date.\n- Grouping and counting then happen per day.\n- The result is the same as using `DATE(...)`.\n\n## Difference from the optimal approach\n\nAlso correct, but `DATE(...)` may be easier for beginners to read.",
      },
      {
        approach_title: "CTE daily regs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH daily_registrations AS ( SELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY DATE(registered_at) ) SELECT registration_date, total_patients FROM daily_registrations ORDER BY registration_date ASC;",
        explanation:
          "## Approach\n\nCalculate daily counts in a CTE and sort them outside.\n\n## Query\n\n```sql\nWITH daily_registrations AS (\n  SELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients\n  FROM patients\n  GROUP BY DATE(registered_at)\n)\nSELECT registration_date, total_patients\nFROM daily_registrations\nORDER BY registration_date ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per registration date.\n- The outer query applies the final chronological order.\n- This is helpful if more daily metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_033",
    approaches: [
      {
        approach_title: "SUM by method",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY total_revenue DESC, payment_method ASC;",
        explanation:
          "## Approach\n\nFilter to successful payments, group by payment method, and sum the paid amounts.\n\n## Query\n\n```sql\nSELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue\nFROM payments\nWHERE payment_status = 'successful'\nGROUP BY payment_method\nORDER BY total_revenue DESC, payment_method ASC;\n```\n\n## Explanation\n\n- `WHERE payment_status = 'successful'` keeps only collected payments.\n- `GROUP BY payment_method` creates one row per method.\n- `SUM(amount_paid)` adds up revenue per method.\n- `ROUND(..., 2)` formats the result to 2 decimal places.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes collected revenue by method using the exact filter needed.",
      },
      {
        approach_title: "FILTER sum",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT payment_method, ROUND(SUM(amount_paid) FILTER (WHERE payment_status = 'successful'), 2) AS total_revenue FROM payments GROUP BY payment_method ORDER BY total_revenue DESC, payment_method ASC;",
        explanation:
          "## Approach\n\nApply the successful-payment condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT payment_method, ROUND(SUM(amount_paid) FILTER (WHERE payment_status = 'successful'), 2) AS total_revenue\nFROM payments\nGROUP BY payment_method\nORDER BY total_revenue DESC, payment_method ASC;\n```\n\n## Explanation\n\n- `FILTER` makes the sum include only successful payments.\n- This is useful when you want multiple conditional sums in the same query.\n- The grouped result remains one row per payment method.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single conditional total.",
      },
      {
        approach_title: "CTE method sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH method_revenue AS ( SELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ) SELECT payment_method, total_revenue FROM method_revenue ORDER BY total_revenue DESC, payment_method ASC;",
        explanation:
          "## Approach\n\nCompute revenue per method in a CTE and sort later.\n\n## Query\n\n```sql\nWITH method_revenue AS (\n  SELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, total_revenue\nFROM method_revenue\nORDER BY total_revenue DESC, payment_method ASC;\n```\n\n## Explanation\n\n- The CTE calculates one revenue total per payment method.\n- The outer query returns the rows in the expected order.\n- This format is useful if more revenue metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose without changing the result.",
      },
    ],
  },
  {
    code: "HOSPITAL_034",
    approaches: [
      {
        approach_title: "LEFT JOIN count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s LEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ORDER BY total_doctors DESC, s.id ASC;",
        explanation:
          "## Approach\n\nStart from specializations, left join doctor mappings, then count doctors per specialization.\n\n## Query\n\n```sql\nSELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors\nFROM specializations s\nLEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id\nGROUP BY s.id, s.name\nORDER BY total_doctors DESC, s.id ASC;\n```\n\n## Explanation\n\n- `specializations` is the main table, so all specializations are included.\n- `LEFT JOIN` ensures specializations with zero doctors still appear.\n- `COUNT(ds.doctor_id)` counts only matched doctor mappings.\n- Grouping is done by specialization id and name.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt correctly preserves specializations with no doctors while still returning accurate counts.",
      },
      {
        approach_title: "INNER JOIN count",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ORDER BY total_doctors DESC, s.id ASC;",
        explanation:
          "## Approach\n\nJoin only matching specialization mappings and count doctors.\n\n## Query\n\n```sql\nSELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors\nFROM specializations s\nJOIN doctor_specializations ds ON s.id = ds.specialization_id\nGROUP BY s.id, s.name\nORDER BY total_doctors DESC, s.id ASC;\n```\n\n## Explanation\n\n- This counts doctors assigned to each specialization.\n- It excludes specializations with no mapped doctors.\n\n## Difference from the optimal approach\n\nIt may miss specializations with zero doctors, which the left join solution preserves.",
      },
      {
        approach_title: "CTE spec count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH specialization_counts AS ( SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s LEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ) SELECT specialization_id, specialization_name, total_doctors FROM specialization_counts ORDER BY total_doctors DESC, specialization_id ASC;",
        explanation:
          "## Approach\n\nCalculate specialization counts in a CTE and order them afterward.\n\n## Query\n\n```sql\nWITH specialization_counts AS (\n  SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors\n  FROM specializations s\n  LEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id\n  GROUP BY s.id, s.name\n)\nSELECT specialization_id, specialization_name, total_doctors\nFROM specialization_counts\nORDER BY total_doctors DESC, specialization_id ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per specialization.\n- The outer query applies the final order.\n- This is useful if more derived columns are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_035",
    approaches: [
      {
        approach_title: "Count completed",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed';",
        explanation:
          "## Approach\n\nFilter procedure orders to completed ones and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS completed_procedures\nFROM procedure_orders\nWHERE procedure_status = 'completed';\n```\n\n## Explanation\n\n- `WHERE procedure_status = 'completed'` keeps only completed procedures.\n- `COUNT(*)` returns how many rows match.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to count completed procedure orders.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed';",
        explanation:
          "## Approach\n\nCount procedure order ids after filtering to completed status.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS completed_procedures\nFROM procedure_orders\nWHERE procedure_status = 'completed';\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, this gives the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE proc count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH completed_proc_count AS ( SELECT COUNT(*) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed' ) SELECT completed_procedures FROM completed_proc_count;",
        explanation:
          "## Approach\n\nCompute the completed procedure count in a CTE.\n\n## Query\n\n```sql\nWITH completed_proc_count AS (\n  SELECT COUNT(*) AS completed_procedures\n  FROM procedure_orders\n  WHERE procedure_status = 'completed'\n)\nSELECT completed_procedures\nFROM completed_proc_count;\n```\n\n## Explanation\n\n- The CTE calculates the count once.\n- The outer query simply returns that value.\n- This can be useful if more metrics are later added beside it.\n\n## Difference from the optimal approach\n\nMore verbose for a single aggregate.",
      },
    ],
  },
  {
    code: "HOSPITAL_036",
    approaches: [
      {
        approach_title: "Count by day",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY DATE(scheduled_start_at) ORDER BY appointment_date ASC;",
        explanation:
          "## Approach\n\nExtract the appointment date, group by it, and count appointments.\n\n## Query\n\n```sql\nSELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments\nFROM appointments\nGROUP BY DATE(scheduled_start_at)\nORDER BY appointment_date ASC;\n```\n\n## Explanation\n\n- `DATE(scheduled_start_at)` removes the time part.\n- `GROUP BY` creates one row per date.\n- `COUNT(*)` returns the number of appointments scheduled that day.\n- The final ordering is chronological.\n\n## Why this is optimal\n\nIt directly computes daily appointment totals using the needed date grouping.",
      },
      {
        approach_title: "Cast day",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT scheduled_start_at::date AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY scheduled_start_at::date ORDER BY appointment_date ASC;",
        explanation:
          "## Approach\n\nCast the scheduled timestamp to a date before grouping.\n\n## Query\n\n```sql\nSELECT scheduled_start_at::date AS appointment_date, COUNT(*) AS total_appointments\nFROM appointments\nGROUP BY scheduled_start_at::date\nORDER BY appointment_date ASC;\n```\n\n## Explanation\n\n- `scheduled_start_at::date` converts the timestamp into a date.\n- Grouping and counting then happen per day.\n- The result is equivalent to using `DATE(...)`.\n\n## Difference from the optimal approach\n\nAlso correct, but slightly less explicit for learners.",
      },
      {
        approach_title: "CTE daily appts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH daily_appointments AS ( SELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY DATE(scheduled_start_at) ) SELECT appointment_date, total_appointments FROM daily_appointments ORDER BY appointment_date ASC;",
        explanation:
          "## Approach\n\nCalculate daily appointment counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH daily_appointments AS (\n  SELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments\n  FROM appointments\n  GROUP BY DATE(scheduled_start_at)\n)\nSELECT appointment_date, total_appointments\nFROM daily_appointments\nORDER BY appointment_date ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per appointment date.\n- The outer query applies the final sort order.\n- This is useful if more daily metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose without changing the result.",
      },
    ],
  },
  {
    code: "HOSPITAL_037",
    approaches: [
      {
        approach_title: "Top completed",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, COUNT(*) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nFilter to completed appointments, group by doctor, count them, then keep the top 5.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(*) AS completed_appointments\nFROM appointments\nWHERE appointment_status = 'completed'\nGROUP BY doctor_id\nORDER BY completed_appointments DESC, doctor_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE appointment_status = 'completed'` keeps completed appointments only.\n- `GROUP BY doctor_id` creates one row per doctor.\n- `COUNT(*)` gives the total completed appointments per doctor.\n- `ORDER BY ... DESC` brings the largest counts first.\n- `LIMIT 5` returns only the top 5 doctors.\n\n## Why this is optimal\n\nIt directly produces the top doctors by completed appointment volume with the exact ordering and limit.",
      },
      {
        approach_title: "CTE top docs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_completed_counts AS ( SELECT doctor_id, COUNT(*) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) SELECT doctor_id, completed_appointments FROM doctor_completed_counts ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute completed counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH doctor_completed_counts AS (\n  SELECT doctor_id, COUNT(*) AS completed_appointments\n  FROM appointments\n  WHERE appointment_status = 'completed'\n  GROUP BY doctor_id\n)\nSELECT doctor_id, completed_appointments\nFROM doctor_completed_counts\nORDER BY completed_appointments DESC, doctor_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE calculates one count per doctor.\n- The outer query applies the ordering and top-5 limit.\n- This is useful if more doctor metrics are later added.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Count ids top",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT doctor_id, COUNT(id) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCount appointment ids instead of rows after filtering to completed status.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(id) AS completed_appointments\nFROM appointments\nWHERE appointment_status = 'completed'\nGROUP BY doctor_id\nORDER BY completed_appointments DESC, doctor_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL appointment ids.\n- Since `id` is a primary key, it gives the same result as `COUNT(*)`.\n- The sort and limit are unchanged.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is simpler.",
      },
    ],
  },
  {
    code: "HOSPITAL_038",
    approaches: [
      {
        approach_title: "Join revenue",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ORDER BY total_revenue DESC, e.department_id ASC;",
        explanation:
          "## Approach\n\nJoin invoices to encounters so each invoice can be tied to a department, then sum the invoice totals.\n\n## Query\n\n```sql\nSELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue\nFROM invoices i\nJOIN encounters e ON i.encounter_id = e.id\nGROUP BY e.department_id\nORDER BY total_revenue DESC, e.department_id ASC;\n```\n\n## Explanation\n\n- `invoices` contains the bill amounts.\n- `encounters` provides the related department.\n- `SUM(i.total_amount)` calculates total revenue per department.\n- `ROUND(..., 2)` formats the revenue.\n- The final order matches the expected output.\n\n## Why this is optimal\n\nIt directly links invoice revenue to departments through encounters and aggregates the totals correctly.",
      },
      {
        approach_title: "CTE dept revenue",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH department_revenue AS ( SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ) SELECT department_id, total_revenue FROM department_revenue ORDER BY total_revenue DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute department revenue in a CTE, then sort it.\n\n## Query\n\n```sql\nWITH department_revenue AS (\n  SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  GROUP BY e.department_id\n)\nSELECT department_id, total_revenue\nFROM department_revenue\nORDER BY total_revenue DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE produces one revenue row per department.\n- The outer query applies the final sort.\n- This is helpful if more department metrics are later added.\n\n## Difference from the optimal approach\n\nMore verbose without changing the result.",
      },
      {
        approach_title: "Subquery revenue",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT department_id, total_revenue FROM ( SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ) x ORDER BY total_revenue DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCalculate department revenue in a derived table and sort outside.\n\n## Query\n\n```sql\nSELECT department_id, total_revenue\nFROM (\n  SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  GROUP BY e.department_id\n) x\nORDER BY total_revenue DESC, department_id ASC;\n```\n\n## Explanation\n\n- The inner query computes total revenue per department.\n- The outer query handles the final ordering.\n- The result matches the direct grouped join.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer here.",
      },
    ],
  },
  {
    code: "HOSPITAL_039",
    approaches: [
      {
        approach_title: "HAVING count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, COUNT(*) AS admission_count FROM admissions GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY admission_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nGroup admissions by patient, count them, then keep only patients with more than one admission.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(*) AS admission_count\nFROM admissions\nGROUP BY patient_id\nHAVING COUNT(*) > 1\nORDER BY admission_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY patient_id` creates one row per patient.\n- `COUNT(*)` gives the number of admissions for that patient.\n- `HAVING COUNT(*) > 1` keeps only patients admitted more than once.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the standard and clearest way to filter grouped results by their counts.",
      },
      {
        approach_title: "CTE multi admit",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH patient_admission_counts AS ( SELECT patient_id, COUNT(*) AS admission_count FROM admissions GROUP BY patient_id ) SELECT patient_id, admission_count FROM patient_admission_counts WHERE admission_count > 1 ORDER BY admission_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCompute admission counts in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH patient_admission_counts AS (\n  SELECT patient_id, COUNT(*) AS admission_count\n  FROM admissions\n  GROUP BY patient_id\n)\nSELECT patient_id, admission_count\nFROM patient_admission_counts\nWHERE admission_count > 1\nORDER BY admission_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one count per patient.\n- The outer query filters to counts greater than 1.\n- The final order matches the expected output.\n\n## Difference from the optimal approach\n\nMore verbose, but sometimes easier to read step by step.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT patient_id, COUNT(id) AS admission_count FROM admissions GROUP BY patient_id HAVING COUNT(id) > 1 ORDER BY admission_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCount admission ids instead of all rows.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(id) AS admission_count\nFROM admissions\nGROUP BY patient_id\nHAVING COUNT(id) > 1\nORDER BY admission_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL admission ids.\n- Since `id` is a primary key, it matches `COUNT(*)` here.\n- The grouping and filtering logic remain the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counts.",
      },
    ],
  },
  {
    code: "HOSPITAL_040",
    approaches: [
      {
        approach_title: "AVG wait mins",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60), 2) AS avg_wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL GROUP BY doctor_id ORDER BY avg_wait_time_mins DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nFor appointments that actually started, calculate the wait in minutes and average it per doctor.\n\n## Query\n\n```sql\nSELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60), 2) AS avg_wait_time_mins\nFROM appointments\nWHERE consultation_started_at IS NOT NULL\nGROUP BY doctor_id\nORDER BY avg_wait_time_mins DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `consultation_started_at - scheduled_start_at` gives the wait duration.\n- `EXTRACT(EPOCH FROM ...) / 60` converts the interval to minutes.\n- `AVG(...)` computes the average wait per doctor.\n- `ROUND(..., 2)` formats the result.\n- The filter removes appointments that never started.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes average wait time per doctor and works cleanly with rounding.",
      },
      {
        approach_title: "CTE wait avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_waits AS (\n  SELECT doctor_id, EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60 AS wait_mins\n  FROM appointments\n  WHERE consultation_started_at IS NOT NULL\n)\nSELECT doctor_id, ROUND(AVG(wait_mins), 2) AS avg_wait_time_mins\nFROM doctor_waits\nGROUP BY doctor_id\nORDER BY avg_wait_time_mins DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute wait minutes in a CTE, then average them per doctor.\n\n## Query\n\n```sql\nWITH doctor_waits AS (\n  SELECT doctor_id, EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60 AS wait_mins\n  FROM appointments\n  WHERE consultation_started_at IS NOT NULL\n)\nSELECT doctor_id, ROUND(AVG(wait_mins), 2) AS avg_wait_time_mins\nFROM doctor_waits\nGROUP BY doctor_id\nORDER BY avg_wait_time_mins DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one wait time per started appointment.\n- The outer query averages those waits per doctor.\n- This is useful if you want to reuse `wait_mins` for more metrics later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60)::numeric, 2) AS avg_wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL GROUP BY doctor_id ORDER BY avg_wait_time_mins DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute the average wait in minutes, cast it to `numeric`, then round it.\n\n## Query\n\n```sql\nSELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60)::numeric, 2) AS avg_wait_time_mins\nFROM appointments\nWHERE consultation_started_at IS NOT NULL\nGROUP BY doctor_id\nORDER BY avg_wait_time_mins DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The wait duration is still converted into minutes using epoch seconds.\n- `AVG(...)` computes the mean wait time per doctor.\n- Casting to `numeric` before `ROUND(..., 2)` avoids PostgreSQL type issues in stricter setups.\n- The result and ordering stay the same.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_041",
    approaches: [
      {
        approach_title: "CASE rate",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ORDER BY no_show_rate_pct DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nGroup appointments by doctor and calculate the percentage of no-shows.\n\n## Query\n\n```sql\nSELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct\nFROM appointments\nGROUP BY doctor_id\nORDER BY no_show_rate_pct DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY doctor_id` creates one group per doctor.\n- The `CASE` expression counts only `no_show` appointments.\n- `COUNT(*)` gives total appointments for that doctor.\n- Multiplying by `100.0` converts the ratio to a percentage.\n- `ROUND(..., 2)` formats the result to 2 decimal places.\n- The sort order matches the expected output.\n\n## Why this is optimal\n\nIt directly computes the no-show percentage in a single grouped query.",
      },
      {
        approach_title: "FILTER rate",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT doctor_id, ROUND(100.0 * COUNT(*) FILTER (WHERE appointment_status = 'no_show') / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ORDER BY no_show_rate_pct DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count no-show appointments inside the aggregate.\n\n## Query\n\n```sql\nSELECT doctor_id, ROUND(100.0 * COUNT(*) FILTER (WHERE appointment_status = 'no_show') / COUNT(*), 2) AS no_show_rate_pct\nFROM appointments\nGROUP BY doctor_id\nORDER BY no_show_rate_pct DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `COUNT(*) FILTER (...)` counts only no-show rows.\n- `COUNT(*)` counts all appointments in the doctor group.\n- The ratio is converted to a percentage and rounded.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` form is often more familiar to learners.",
      },
      {
        approach_title: "CTE rate",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_rates AS ( SELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ) SELECT doctor_id, no_show_rate_pct FROM doctor_rates ORDER BY no_show_rate_pct DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute the no-show rate per doctor in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH doctor_rates AS (\n  SELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct\n  FROM appointments\n  GROUP BY doctor_id\n)\nSELECT doctor_id, no_show_rate_pct\nFROM doctor_rates\nORDER BY no_show_rate_pct DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one percentage per doctor.\n- The outer query applies the final ordering.\n- This is useful if more doctor metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_042",
    approaches: [
      {
        approach_title: "LEFT JOIN beds",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied' GROUP BY r.id, r.room_number ORDER BY occupied_beds DESC, r.id ASC;",
        explanation:
          "## Approach\n\nStart from rooms, left join only occupied beds, then count them per room.\n\n## Query\n\n```sql\nSELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds\nFROM rooms r\nLEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied'\nGROUP BY r.id, r.room_number\nORDER BY occupied_beds DESC, r.id ASC;\n```\n\n## Explanation\n\n- `rooms` is the main table so every room can appear.\n- The join condition includes `b.bed_status = 'occupied'`, so only occupied beds are matched.\n- `COUNT(b.id)` counts matched occupied beds only.\n- Grouping is done by room.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt correctly includes rooms with zero occupied beds while counting only occupied ones.",
      },
      {
        approach_title: "CASE count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT r.id AS room_id, r.room_number, SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY occupied_beds DESC, r.id ASC;",
        explanation:
          "## Approach\n\nJoin all beds to rooms, then count occupied ones with a `CASE` expression.\n\n## Query\n\n```sql\nSELECT r.id AS room_id, r.room_number, SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) AS occupied_beds\nFROM rooms r\nLEFT JOIN beds b ON r.id = b.room_id\nGROUP BY r.id, r.room_number\nORDER BY occupied_beds DESC, r.id ASC;\n```\n\n## Explanation\n\n- All beds are joined to their rooms.\n- The `CASE` expression adds `1` only for occupied beds.\n- `SUM(...)` gives the room-level occupied bed count.\n\n## Difference from the optimal approach\n\nIt works well, but the filtered join is a bit cleaner for this specific question.",
      },
      {
        approach_title: "CTE room beds",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH room_bed_counts AS ( SELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied' GROUP BY r.id, r.room_number ) SELECT room_id, room_number, occupied_beds FROM room_bed_counts ORDER BY occupied_beds DESC, room_id ASC;",
        explanation:
          "## Approach\n\nCompute occupied bed counts per room in a CTE and sort later.\n\n## Query\n\n```sql\nWITH room_bed_counts AS (\n  SELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds\n  FROM rooms r\n  LEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied'\n  GROUP BY r.id, r.room_number\n)\nSELECT room_id, room_number, occupied_beds\nFROM room_bed_counts\nORDER BY occupied_beds DESC, room_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one row per room.\n- The outer query applies the final ordering.\n- This is useful if room utilization logic needs to be extended later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_043",
    approaches: [
      {
        approach_title: "HAVING allergies",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, COUNT(*) AS allergy_count FROM patient_allergies GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY allergy_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nGroup allergy rows by patient, count them, then keep only patients with more than one allergy.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(*) AS allergy_count\nFROM patient_allergies\nGROUP BY patient_id\nHAVING COUNT(*) > 1\nORDER BY allergy_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY patient_id` creates one group per patient.\n- `COUNT(*)` counts allergy rows per patient.\n- `HAVING COUNT(*) > 1` keeps only patients with multiple allergies.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the standard grouped-count solution for this kind of problem.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT patient_id, COUNT(id) AS allergy_count FROM patient_allergies GROUP BY patient_id HAVING COUNT(id) > 1 ORDER BY allergy_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCount allergy ids instead of all rows.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(id) AS allergy_count\nFROM patient_allergies\nGROUP BY patient_id\nHAVING COUNT(id) > 1\nORDER BY allergy_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL allergy ids.\n- Since `id` is a primary key, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE allergies",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH allergy_totals AS ( SELECT patient_id, COUNT(*) AS allergy_count FROM patient_allergies GROUP BY patient_id ) SELECT patient_id, allergy_count FROM allergy_totals WHERE allergy_count > 1 ORDER BY allergy_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCalculate allergy counts in a CTE, then filter and sort outside.\n\n## Query\n\n```sql\nWITH allergy_totals AS (\n  SELECT patient_id, COUNT(*) AS allergy_count\n  FROM patient_allergies\n  GROUP BY patient_id\n)\nSELECT patient_id, allergy_count\nFROM allergy_totals\nWHERE allergy_count > 1\nORDER BY allergy_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one count per patient.\n- The outer query filters to counts above 1.\n- This can be useful if more patient-level metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_044",
    approaches: [
      {
        approach_title: "CASE approval",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY approval_rate_pct DESC, ipr.id ASC;",
        explanation:
          "## Approach\n\nJoin claims to providers through policies, then calculate approved-like claims as a percentage of total claims.\n\n## Query\n\n```sql\nSELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct\nFROM insurance_claims ic\nJOIN insurance_policies ip ON ic.insurance_policy_id = ip.id\nJOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id\nGROUP BY ipr.id, ipr.provider_name\nORDER BY approval_rate_pct DESC, ipr.id ASC;\n```\n\n## Explanation\n\n- Claims are linked to providers through `insurance_policies`.\n- The `CASE` expression counts approved, partially approved, and settled claims.\n- `COUNT(ic.id)` gives total claims per provider.\n- The ratio is converted to a percentage and rounded.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes provider-level approval rates from the correct joined tables.",
      },
      {
        approach_title: "FILTER approval",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * COUNT(*) FILTER (WHERE ic.claim_status IN ('approved', 'partially_approved', 'settled')) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY approval_rate_pct DESC, ipr.id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count approval-like statuses inside the aggregate.\n\n## Query\n\n```sql\nSELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * COUNT(*) FILTER (WHERE ic.claim_status IN ('approved', 'partially_approved', 'settled')) / COUNT(ic.id), 2) AS approval_rate_pct\nFROM insurance_claims ic\nJOIN insurance_policies ip ON ic.insurance_policy_id = ip.id\nJOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id\nGROUP BY ipr.id, ipr.provider_name\nORDER BY approval_rate_pct DESC, ipr.id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts only the desired statuses.\n- `COUNT(ic.id)` gives total claims for the provider.\n- The final percentage and ordering are the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` style is often easier for learners to recognize.",
      },
      {
        approach_title: "CTE approval",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH provider_approval_rates AS ( SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ) SELECT insurance_provider_id, provider_name, approval_rate_pct FROM provider_approval_rates ORDER BY approval_rate_pct DESC, insurance_provider_id ASC;",
        explanation:
          "## Approach\n\nCompute provider approval rates in a CTE and sort them outside.\n\n## Query\n\n```sql\nWITH provider_approval_rates AS (\n  SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct\n  FROM insurance_claims ic\n  JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id\n  JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id\n  GROUP BY ipr.id, ipr.provider_name\n)\nSELECT insurance_provider_id, provider_name, approval_rate_pct\nFROM provider_approval_rates\nORDER BY approval_rate_pct DESC, insurance_provider_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one approval rate row per provider.\n- The outer query applies the final order.\n- This is useful if more provider metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_045",
    approaches: [
      {
        approach_title: "AVG turnaround",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600), 2) AS avg_turnaround_hours FROM lab_order_items loi JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE loi.sample_collected_at IS NOT NULL AND loi.completed_at IS NOT NULL GROUP BY ltc.id, ltc.test_name ORDER BY avg_turnaround_hours DESC, ltc.id ASC;",
        explanation:
          "## Approach\n\nJoin lab order items to test names, calculate turnaround hours per item, then average by test.\n\n## Query\n\n```sql\nSELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600), 2) AS avg_turnaround_hours\nFROM lab_order_items loi\nJOIN lab_test_catalog ltc ON loi.test_id = ltc.id\nWHERE loi.sample_collected_at IS NOT NULL\n  AND loi.completed_at IS NOT NULL\nGROUP BY ltc.id, ltc.test_name\nORDER BY avg_turnaround_hours DESC, ltc.id ASC;\n```\n\n## Explanation\n\n- `completed_at - sample_collected_at` gives item turnaround time.\n- `EXTRACT(EPOCH FROM ...) / 3600` converts the interval into hours.\n- `AVG(...)` computes the average turnaround per test.\n- The join provides the test id and test name.\n- Rows with missing timestamps are excluded.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes average turnaround by test and works cleanly with rounding.",
      },
      {
        approach_title: "CTE turnaround",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH item_turnaround AS (\n  SELECT loi.test_id, EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600 AS turnaround_hours\n  FROM lab_order_items loi\n  WHERE loi.sample_collected_at IS NOT NULL\n    AND loi.completed_at IS NOT NULL\n)\nSELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(it.turnaround_hours), 2) AS avg_turnaround_hours\nFROM item_turnaround it\nJOIN lab_test_catalog ltc ON it.test_id = ltc.id\nGROUP BY ltc.id, ltc.test_name\nORDER BY avg_turnaround_hours DESC, ltc.id ASC;",
        explanation:
          "## Approach\n\nCalculate turnaround per item in a CTE, then average it by test.\n\n## Query\n\n```sql\nWITH item_turnaround AS (\n  SELECT loi.test_id, EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600 AS turnaround_hours\n  FROM lab_order_items loi\n  WHERE loi.sample_collected_at IS NOT NULL\n    AND loi.completed_at IS NOT NULL\n)\nSELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(it.turnaround_hours), 2) AS avg_turnaround_hours\nFROM item_turnaround it\nJOIN lab_test_catalog ltc ON it.test_id = ltc.id\nGROUP BY ltc.id, ltc.test_name\nORDER BY avg_turnaround_hours DESC, ltc.id ASC;\n```\n\n## Explanation\n\n- The CTE stores one turnaround value per completed lab item.\n- The outer query averages those values per test.\n- This is useful if item-level turnaround needs to be reused for more analysis later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600)::numeric, 2) AS avg_turnaround_hours FROM lab_order_items loi JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE loi.sample_collected_at IS NOT NULL AND loi.completed_at IS NOT NULL GROUP BY ltc.id, ltc.test_name ORDER BY avg_turnaround_hours DESC, ltc.id ASC;",
        explanation:
          "## Approach\n\nCompute the average turnaround in hours, cast it to `numeric`, then round it.\n\n## Query\n\n```sql\nSELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600)::numeric, 2) AS avg_turnaround_hours\nFROM lab_order_items loi\nJOIN lab_test_catalog ltc ON loi.test_id = ltc.id\nWHERE loi.sample_collected_at IS NOT NULL\n  AND loi.completed_at IS NOT NULL\nGROUP BY ltc.id, ltc.test_name\nORDER BY avg_turnaround_hours DESC, ltc.id ASC;\n```\n\n## Explanation\n\n- The turnaround duration is still converted into hours using epoch seconds.\n- `AVG(...)` computes the mean turnaround per test.\n- Casting to `numeric` before `ROUND(..., 2)` avoids PostgreSQL type issues in stricter setups.\n- The grouping and ordering remain the same.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_046",
    approaches: [
      {
        approach_title: "HAVING specs",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, COUNT(*) AS specialization_count FROM doctor_specializations GROUP BY doctor_id HAVING COUNT(*) > 1 ORDER BY specialization_count DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nGroup specialization mappings by doctor, count them, and keep doctors with more than one specialization.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(*) AS specialization_count\nFROM doctor_specializations\nGROUP BY doctor_id\nHAVING COUNT(*) > 1\nORDER BY specialization_count DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY doctor_id` creates one group per doctor.\n- `COUNT(*)` counts specialization rows for that doctor.\n- `HAVING COUNT(*) > 1` keeps doctors with multiple specializations.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the standard grouped-count solution for detecting multiple related rows.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT doctor_id, COUNT(id) AS specialization_count FROM doctor_specializations GROUP BY doctor_id HAVING COUNT(id) > 1 ORDER BY specialization_count DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCount specialization mapping ids instead of all rows.\n\n## Query\n\n```sql\nSELECT doctor_id, COUNT(id) AS specialization_count\nFROM doctor_specializations\nGROUP BY doctor_id\nHAVING COUNT(id) > 1\nORDER BY specialization_count DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it matches `COUNT(*)` here.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE specs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_spec_counts AS ( SELECT doctor_id, COUNT(*) AS specialization_count FROM doctor_specializations GROUP BY doctor_id ) SELECT doctor_id, specialization_count FROM doctor_spec_counts WHERE specialization_count > 1 ORDER BY specialization_count DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCalculate specialization counts in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH doctor_spec_counts AS (\n  SELECT doctor_id, COUNT(*) AS specialization_count\n  FROM doctor_specializations\n  GROUP BY doctor_id\n)\nSELECT doctor_id, specialization_count\nFROM doctor_spec_counts\nWHERE specialization_count > 1\nORDER BY specialization_count DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one count per doctor.\n- The outer query filters to counts above 1.\n- This is useful if more doctor-level metrics are needed later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_047",
    approaches: [
      {
        approach_title: "LEFT JOIN paid",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS outstanding_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY outstanding_amount DESC, i.id ASC;",
        explanation:
          "## Approach\n\nJoin invoices to payments, sum only successful payment amounts, then subtract that from the invoice total.\n\n## Query\n\n```sql\nSELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS outstanding_amount\nFROM invoices i\nLEFT JOIN payments p ON i.id = p.invoice_id\nGROUP BY i.id, i.invoice_number, i.total_amount\nORDER BY outstanding_amount DESC, i.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps invoices even if they have no payments.\n- The `CASE` expression includes only successful payments in the sum.\n- `COALESCE(..., 0)` handles invoices with no matching successful payments.\n- Subtracting the paid amount from `total_amount` gives the outstanding amount.\n- The result is rounded and sorted as expected.\n\n## Why this is optimal\n\nIt correctly handles invoices with zero, one, or many payments while calculating outstanding balance in one query.",
      },
      {
        approach_title: "FILTER paid",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(p.amount_paid) FILTER (WHERE p.payment_status = 'successful'), 0), 2) AS outstanding_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY outstanding_amount DESC, i.id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to sum only successful payments.\n\n## Query\n\n```sql\nSELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(p.amount_paid) FILTER (WHERE p.payment_status = 'successful'), 0), 2) AS outstanding_amount\nFROM invoices i\nLEFT JOIN payments p ON i.id = p.invoice_id\nGROUP BY i.id, i.invoice_number, i.total_amount\nORDER BY outstanding_amount DESC, i.id ASC;\n```\n\n## Explanation\n\n- `FILTER` restricts the sum to successful payments only.\n- `COALESCE` handles invoices without successful payments.\n- The subtraction and sort logic remain the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` form is often easier for beginners to follow.",
      },
      {
        approach_title: "CTE outstanding",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH invoice_paid_totals AS ( SELECT i.id, i.invoice_number, i.total_amount, COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0) AS paid_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ) SELECT id, invoice_number, ROUND(total_amount - paid_amount, 2) AS outstanding_amount FROM invoice_paid_totals ORDER BY outstanding_amount DESC, id ASC;",
        explanation:
          "## Approach\n\nFirst compute paid totals per invoice in a CTE, then calculate outstanding amount outside.\n\n## Query\n\n```sql\nWITH invoice_paid_totals AS (\n  SELECT i.id, i.invoice_number, i.total_amount, COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0) AS paid_amount\n  FROM invoices i\n  LEFT JOIN payments p ON i.id = p.invoice_id\n  GROUP BY i.id, i.invoice_number, i.total_amount\n)\nSELECT id, invoice_number, ROUND(total_amount - paid_amount, 2) AS outstanding_amount\nFROM invoice_paid_totals\nORDER BY outstanding_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE computes how much was successfully paid for each invoice.\n- The outer query subtracts that from the invoice total.\n- This format is useful when you want both paid and outstanding values later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on.",
      },
    ],
  },
  {
    code: "HOSPITAL_048",
    approaches: [
      {
        approach_title: "Month count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ORDER BY registration_month ASC;",
        explanation:
          "## Approach\n\nTruncate registration timestamps to the month, group by that value, and count patients.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients\nFROM patients\nGROUP BY DATE_TRUNC('month', registered_at)\nORDER BY registration_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', registered_at)` converts each timestamp to the first moment of its month.\n- Grouping by that value creates one row per month.\n- `COUNT(*)` counts registrations in each month.\n- The result is ordered chronologically.\n\n## Why this is optimal\n\nIt is the standard and cleanest way to calculate monthly counts in PostgreSQL.",
      },
      {
        approach_title: "CTE month count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_registrations AS ( SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ) SELECT registration_month, total_patients FROM monthly_registrations ORDER BY registration_month ASC;",
        explanation:
          "## Approach\n\nCompute monthly registration counts in a CTE and sort outside.\n\n## Query\n\n```sql\nWITH monthly_registrations AS (\n  SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients\n  FROM patients\n  GROUP BY DATE_TRUNC('month', registered_at)\n)\nSELECT registration_month, total_patients\nFROM monthly_registrations\nORDER BY registration_month ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per registration month.\n- The outer query applies the final chronological order.\n- This is helpful if more monthly metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery month",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT registration_month, total_patients FROM ( SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ) x ORDER BY registration_month ASC;",
        explanation:
          "## Approach\n\nUse a derived table for monthly counts, then sort outside.\n\n## Query\n\n```sql\nSELECT registration_month, total_patients\nFROM (\n  SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients\n  FROM patients\n  GROUP BY DATE_TRUNC('month', registered_at)\n) x\nORDER BY registration_month ASC;\n```\n\n## Explanation\n\n- The inner query computes the month-level counts.\n- The outer query returns them in chronological order.\n- The result matches the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer here.",
      },
    ],
  },
  {
    code: "HOSPITAL_049",
    approaches: [
      {
        approach_title: "AVG admit days",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400), 2) AS avg_admission_days FROM admissions GROUP BY department_id ORDER BY avg_admission_days DESC, department_id ASC;",
        explanation:
          "## Approach\n\nFor each admission, measure stay days using `discharge_at` when present, otherwise the current time, then average by department.\n\n## Query\n\n```sql\nSELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400), 2) AS avg_admission_days\nFROM admissions\nGROUP BY department_id\nORDER BY avg_admission_days DESC, department_id ASC;\n```\n\n## Explanation\n\n- `COALESCE(discharge_at, NOW())` uses the discharge time for completed admissions and the current time for ongoing ones.\n- Subtracting `admitted_at` gives the stay duration.\n- `EXTRACT(EPOCH FROM ...) / 86400` converts the interval into days.\n- `AVG(...)` computes the average stay length per department.\n- `ROUND(..., 2)` formats the result.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly handles both discharged and ongoing admissions while producing the required department-wise average.",
      },
      {
        approach_title: "CTE admit avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH admission_lengths AS (\n  SELECT department_id, EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400 AS admission_days\n  FROM admissions\n)\nSELECT department_id, ROUND(AVG(admission_days), 2) AS avg_admission_days\nFROM admission_lengths\nGROUP BY department_id\nORDER BY avg_admission_days DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute each admission length in a CTE, then average those values by department.\n\n## Query\n\n```sql\nWITH admission_lengths AS (\n  SELECT department_id, EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400 AS admission_days\n  FROM admissions\n)\nSELECT department_id, ROUND(AVG(admission_days), 2) AS avg_admission_days\nFROM admission_lengths\nGROUP BY department_id\nORDER BY avg_admission_days DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one stay-length value per admission.\n- The outer query averages those values per department.\n- This is useful when you want to reuse the admission-day calculation in later steps.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400)::numeric, 2) AS avg_admission_days FROM admissions GROUP BY department_id ORDER BY avg_admission_days DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute the average stay in days, cast it to `numeric`, then round it.\n\n## Query\n\n```sql\nSELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400)::numeric, 2) AS avg_admission_days\nFROM admissions\nGROUP BY department_id\nORDER BY avg_admission_days DESC, department_id ASC;\n```\n\n## Explanation\n\n- The stay duration is still converted into days using epoch seconds.\n- `AVG(...)` computes the mean stay length per department.\n- Casting to `numeric` before `ROUND(..., 2)` avoids PostgreSQL type issues in stricter setups.\n- The grouping and ordering remain the same.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_050",
    approaches: [
      {
        approach_title: "Top billed",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nGroup invoices by patient, sum the billed amount, then keep the top 10.\n\n## Query\n\n```sql\nSELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount\nFROM invoices\nGROUP BY patient_id\nORDER BY total_billed_amount DESC, patient_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `GROUP BY patient_id` creates one row per patient.\n- `SUM(total_amount)` computes total billed value for that patient.\n- `ROUND(..., 2)` formats the amount.\n- `ORDER BY ... DESC` puts the highest totals first.\n- `LIMIT 10` keeps only the top 10 patients.\n\n## Why this is optimal\n\nIt directly returns the highest billed patients with the exact ranking and limit required.",
      },
      {
        approach_title: "CTE top billed",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH patient_billing AS ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ) SELECT patient_id, total_billed_amount FROM patient_billing ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute total billing per patient in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH patient_billing AS (\n  SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount\n  FROM invoices\n  GROUP BY patient_id\n)\nSELECT patient_id, total_billed_amount\nFROM patient_billing\nORDER BY total_billed_amount DESC, patient_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one billed total per patient.\n- The outer query applies the final ordering and top-10 limit.\n- This is useful if more billing metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery top",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT patient_id, total_billed_amount FROM ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ) x ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table for patient billing totals, then sort and limit outside.\n\n## Query\n\n```sql\nSELECT patient_id, total_billed_amount\nFROM (\n  SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount\n  FROM invoices\n  GROUP BY patient_id\n) x\nORDER BY total_billed_amount DESC, patient_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes one total per patient.\n- The outer query ranks them and keeps the top 10.\n- The result matches the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an extra layer without changing the output.",
      },
    ],
  },
  {
    code: "HOSPITAL_051",
    approaches: [
      {
        approach_title: "EXISTS both",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id) AND EXISTS (SELECT 1 FROM admissions ad WHERE ad.patient_id = p.id) ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nReturn patients only if they have at least one appointment and at least one admission.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nWHERE EXISTS (\n  SELECT 1\n  FROM appointments a\n  WHERE a.patient_id = p.id\n)\nAND EXISTS (\n  SELECT 1\n  FROM admissions ad\n  WHERE ad.patient_id = p.id\n)\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` checks whether the patient appears in `appointments`.\n- The second `EXISTS` checks whether the same patient appears in `admissions`.\n- Only patients satisfying both conditions are returned.\n- `ORDER BY p.id ASC` matches the expected output.\n\n## Why this is optimal\n\nIt avoids duplicate rows naturally and directly expresses the two required conditions.",
      },
      {
        approach_title: "Join distinct",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN appointments a ON a.patient_id = p.id JOIN admissions ad ON ad.patient_id = p.id ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to both appointments and admissions, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN appointments a ON a.patient_id = p.id\nJOIN admissions ad ON ad.patient_id = p.id\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The joins ensure the patient exists in both related tables.\n- Because a patient can have many appointments and many admissions, the join can create duplicates.\n- `DISTINCT` removes those duplicate patient rows.\n\n## Difference from the optimal approach\n\nIt works, but can create many intermediate rows before deduplication.",
      },
      {
        approach_title: "CTE both ids",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH appointment_patients AS ( SELECT DISTINCT patient_id FROM appointments ), admission_patients AS ( SELECT DISTINCT patient_id FROM admissions ) SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN appointment_patients ap ON ap.patient_id = p.id JOIN admission_patients adp ON adp.patient_id = p.id ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nFirst isolate patients from each activity in CTEs, then join them back to `patients`.\n\n## Query\n\n```sql\nWITH appointment_patients AS (\n  SELECT DISTINCT patient_id\n  FROM appointments\n),\nadmission_patients AS (\n  SELECT DISTINCT patient_id\n  FROM admissions\n)\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN appointment_patients ap ON ap.patient_id = p.id\nJOIN admission_patients adp ON adp.patient_id = p.id\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- Each CTE creates a deduplicated list of patient ids.\n- Joining both lists back to `patients` keeps only patients present in both sets.\n- The final result is ordered by patient id.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the intermediate sets need to be reused.",
      },
    ],
  },
  {
    code: "HOSPITAL_052",
    approaches: [
      {
        approach_title: "AVG ratings",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating FROM patient_feedback WHERE doctor_id IS NOT NULL GROUP BY doctor_id ORDER BY avg_rating DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nFilter to feedback rows linked to a doctor, then average ratings per doctor.\n\n## Query\n\n```sql\nSELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM patient_feedback\nWHERE doctor_id IS NOT NULL\nGROUP BY doctor_id\nORDER BY avg_rating DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- `WHERE doctor_id IS NOT NULL` removes feedback rows not tied to a doctor.\n- `GROUP BY doctor_id` creates one row per doctor.\n- `AVG(rating)` calculates the doctor’s mean feedback rating.\n- `ROUND(..., 2)` formats the result.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes average rating per doctor with the minimal logic needed.",
      },
      {
        approach_title: "CTE avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_feedback_avg AS ( SELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating FROM patient_feedback WHERE doctor_id IS NOT NULL GROUP BY doctor_id ) SELECT doctor_id, avg_rating FROM doctor_feedback_avg ORDER BY avg_rating DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute average ratings in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH doctor_feedback_avg AS (\n  SELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating\n  FROM patient_feedback\n  WHERE doctor_id IS NOT NULL\n  GROUP BY doctor_id\n)\nSELECT doctor_id, avg_rating\nFROM doctor_feedback_avg\nORDER BY avg_rating DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one average rating per doctor.\n- The outer query applies the final ordering.\n- This is useful if more doctor metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
      {
        approach_title: "Join doctor names",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT pf.doctor_id, ROUND(AVG(pf.rating), 2) AS avg_rating FROM patient_feedback pf JOIN doctors d ON d.id = pf.doctor_id GROUP BY pf.doctor_id ORDER BY avg_rating DESC, pf.doctor_id ASC;",
        explanation:
          "## Approach\n\nJoin feedback to doctors and average ratings per doctor.\n\n## Query\n\n```sql\nSELECT pf.doctor_id, ROUND(AVG(pf.rating), 2) AS avg_rating\nFROM patient_feedback pf\nJOIN doctors d ON d.id = pf.doctor_id\nGROUP BY pf.doctor_id\nORDER BY avg_rating DESC, pf.doctor_id ASC;\n```\n\n## Explanation\n\n- The join ensures only valid doctors are included.\n- `AVG(pf.rating)` computes the mean rating per doctor.\n- The result shape matches the requirement.\n\n## Difference from the optimal approach\n\nThe join is unnecessary because the question only needs `doctor_id` and average rating.",
      },
    ],
  },
  {
    code: "HOSPITAL_053",
    approaches: [
      {
        approach_title: "Count meds",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ORDER BY prescription_count DESC, m.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin prescription items to medications, count how often each medication appears, then keep the top 10.\n\n## Query\n\n```sql\nSELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count\nFROM prescription_items pi\nJOIN medications m ON pi.medication_id = m.id\nGROUP BY m.id, m.generic_name\nORDER BY prescription_count DESC, m.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each row in `prescription_items` represents one prescribed medication line.\n- Joining `medications` provides the medication name.\n- `COUNT(*)` counts how many times each medication was prescribed.\n- The result is sorted by frequency, then by medication id.\n- `LIMIT 10` keeps only the top 10 medications.\n\n## Why this is optimal\n\nIt directly counts prescription usage per medication and returns the required top list.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT m.id AS medication_id, m.generic_name, COUNT(pi.id) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ORDER BY prescription_count DESC, m.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount prescription item ids instead of all rows.\n\n## Query\n\n```sql\nSELECT m.id AS medication_id, m.generic_name, COUNT(pi.id) AS prescription_count\nFROM prescription_items pi\nJOIN medications m ON pi.medication_id = m.id\nGROUP BY m.id, m.generic_name\nORDER BY prescription_count DESC, m.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `COUNT(pi.id)` counts non-NULL prescription item ids.\n- Since `pi.id` is a primary key, it produces the same count as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is simpler for row counting.",
      },
      {
        approach_title: "CTE top meds",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH medication_counts AS ( SELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ) SELECT medication_id, generic_name, prescription_count FROM medication_counts ORDER BY prescription_count DESC, medication_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute medication counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH medication_counts AS (\n  SELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count\n  FROM prescription_items pi\n  JOIN medications m ON pi.medication_id = m.id\n  GROUP BY m.id, m.generic_name\n)\nSELECT medication_id, generic_name, prescription_count\nFROM medication_counts\nORDER BY prescription_count DESC, medication_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one count per medication.\n- The outer query handles ranking and top-10 filtering.\n- This is useful if more medication metrics are needed later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_054",
    approaches: [
      {
        approach_title: "Join feedback",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating FROM appointments a JOIN patient_feedback pf ON a.id = pf.appointment_id WHERE a.appointment_status = 'completed' ORDER BY a.id ASC, pf.id ASC;",
        explanation:
          "## Approach\n\nJoin completed appointments to feedback using the appointment id.\n\n## Query\n\n```sql\nSELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating\nFROM appointments a\nJOIN patient_feedback pf ON a.id = pf.appointment_id\nWHERE a.appointment_status = 'completed'\nORDER BY a.id ASC, pf.id ASC;\n```\n\n## Explanation\n\n- `JOIN patient_feedback` keeps only appointments that have feedback.\n- `WHERE a.appointment_status = 'completed'` restricts the result to completed appointments.\n- The selected columns match the expected output.\n- The final ordering matches the required sort order.\n\n## Why this is optimal\n\nIt directly matches appointments with their feedback and applies the required status filter.",
      },
      {
        approach_title: "CTE completed",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH completed_appointments AS ( SELECT id, appointment_number, patient_id, doctor_id FROM appointments WHERE appointment_status = 'completed' ) SELECT ca.id, ca.appointment_number, ca.patient_id, ca.doctor_id, pf.id AS feedback_id, pf.rating FROM completed_appointments ca JOIN patient_feedback pf ON ca.id = pf.appointment_id ORDER BY ca.id ASC, pf.id ASC;",
        explanation:
          "## Approach\n\nFilter completed appointments in a CTE, then join feedback.\n\n## Query\n\n```sql\nWITH completed_appointments AS (\n  SELECT id, appointment_number, patient_id, doctor_id\n  FROM appointments\n  WHERE appointment_status = 'completed'\n)\nSELECT ca.id, ca.appointment_number, ca.patient_id, ca.doctor_id, pf.id AS feedback_id, pf.rating\nFROM completed_appointments ca\nJOIN patient_feedback pf ON ca.id = pf.appointment_id\nORDER BY ca.id ASC, pf.id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the completed appointments first.\n- The outer query joins only those appointments to feedback rows.\n- The output columns and sort order remain the same.\n\n## Difference from the optimal approach\n\nMore structured, but longer than necessary.",
      },
      {
        approach_title: "EXISTS feedback",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating FROM appointments a JOIN patient_feedback pf ON a.id = pf.appointment_id WHERE a.appointment_status = 'completed' AND EXISTS (SELECT 1 FROM patient_feedback pf2 WHERE pf2.appointment_id = a.id) ORDER BY a.id ASC, pf.id ASC;",
        explanation:
          "## Approach\n\nJoin appointments to feedback and also verify feedback existence with `EXISTS`.\n\n## Query\n\n```sql\nSELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating\nFROM appointments a\nJOIN patient_feedback pf ON a.id = pf.appointment_id\nWHERE a.appointment_status = 'completed'\n  AND EXISTS (\n    SELECT 1\n    FROM patient_feedback pf2\n    WHERE pf2.appointment_id = a.id\n  )\nORDER BY a.id ASC, pf.id ASC;\n```\n\n## Explanation\n\n- The join already guarantees the appointment has feedback.\n- The `EXISTS` check repeats the same logic.\n- The final output is unchanged.\n\n## Difference from the optimal approach\n\nIt works, but adds redundant logic.",
      },
    ],
  },
  {
    code: "HOSPITAL_055",
    approaches: [
      {
        approach_title: "SUM hours",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600), 2) AS scheduled_hours FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;",
        explanation:
          "## Approach\n\nFor active schedules, convert each time span to hours and sum by doctor and weekday.\n\n## Query\n\n```sql\nSELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600), 2) AS scheduled_hours\nFROM doctor_schedules\nWHERE is_active = true\nGROUP BY doctor_id, day_of_week\nORDER BY doctor_id ASC, day_of_week ASC;\n```\n\n## Explanation\n\n- `end_time - start_time` gives the duration of each schedule row.\n- `EXTRACT(EPOCH FROM ...) / 3600` converts that duration into hours.\n- `SUM(...)` adds all schedule hours for the same doctor and weekday.\n- Only active schedules are included.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly calculates total scheduled hours and works cleanly with rounding.",
      },
      {
        approach_title: "CTE hours",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH schedule_hours AS (\n  SELECT doctor_id, day_of_week, EXTRACT(EPOCH FROM (end_time - start_time)) / 3600 AS hours_block\n  FROM doctor_schedules\n  WHERE is_active = true\n)\nSELECT doctor_id, day_of_week, ROUND(SUM(hours_block), 2) AS scheduled_hours\nFROM schedule_hours\nGROUP BY doctor_id, day_of_week\nORDER BY doctor_id ASC, day_of_week ASC;",
        explanation:
          "## Approach\n\nCalculate each schedule block in hours first, then sum by doctor and weekday.\n\n## Query\n\n```sql\nWITH schedule_hours AS (\n  SELECT doctor_id, day_of_week, EXTRACT(EPOCH FROM (end_time - start_time)) / 3600 AS hours_block\n  FROM doctor_schedules\n  WHERE is_active = true\n)\nSELECT doctor_id, day_of_week, ROUND(SUM(hours_block), 2) AS scheduled_hours\nFROM schedule_hours\nGROUP BY doctor_id, day_of_week\nORDER BY doctor_id ASC, day_of_week ASC;\n```\n\n## Explanation\n\n- The CTE converts each schedule row into a numeric hour value.\n- The outer query sums those values per doctor and weekday.\n- This is useful if block-level schedule logic needs to be reused later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600)::numeric, 2) AS scheduled_hours FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;",
        explanation:
          "## Approach\n\nSum schedule hours first, cast the result to `numeric`, then round it.\n\n## Query\n\n```sql\nSELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600)::numeric, 2) AS scheduled_hours\nFROM doctor_schedules\nWHERE is_active = true\nGROUP BY doctor_id, day_of_week\nORDER BY doctor_id ASC, day_of_week ASC;\n```\n\n## Explanation\n\n- The schedule duration is still converted into hours using epoch seconds.\n- `SUM(...)` adds the total hours for each doctor and weekday.\n- Casting to `numeric` before `ROUND(..., 2)` avoids PostgreSQL type issues in stricter setups.\n- The grouping and ordering remain the same.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_056",
    approaches: [
      {
        approach_title: "Join severe",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id WHERE pa.severity IN ('severe', 'critical') ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to allergies, keep only severe or critical allergies, and remove duplicate patients.\n\n## Query\n\n```sql\nSELECT DISTINCT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN patient_allergies pa ON p.id = pa.patient_id\nWHERE pa.severity IN ('severe', 'critical')\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join links each patient to their allergy rows.\n- `severity IN ('severe', 'critical')` keeps only high-risk allergy records.\n- `DISTINCT` ensures each patient appears only once.\n- The result is ordered by patient id.\n\n## Why this is optimal\n\nIt directly handles the one-to-many relationship and returns each matching patient once.",
      },
      {
        approach_title: "EXISTS severe",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM patient_allergies pa WHERE pa.patient_id = p.id AND pa.severity IN ('severe', 'critical')) ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nReturn patients only if they have at least one severe or critical allergy.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nWHERE EXISTS (\n  SELECT 1\n  FROM patient_allergies pa\n  WHERE pa.patient_id = p.id\n    AND pa.severity IN ('severe', 'critical')\n)\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` checks for at least one matching allergy row.\n- Patients are returned only once.\n- The final ordering stays the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the join plus `DISTINCT` is often easier for learners to relate to the schema.",
      },
      {
        approach_title: "Group severe",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id WHERE pa.severity IN ('severe', 'critical') GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients to allergy rows and group by patient columns.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN patient_allergies pa ON p.id = pa.patient_id\nWHERE pa.severity IN ('severe', 'critical')\nGROUP BY p.id, p.patient_code, p.full_name\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join keeps only matching severe or critical allergy rows.\n- `GROUP BY` collapses multiple allergy rows for the same patient.\n- The result shape matches the expected output.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is shorter and clearer here.",
      },
    ],
  },
  {
    code: "HOSPITAL_057",
    approaches: [
      {
        approach_title: "SUM by type",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ORDER BY total_revenue DESC, invoice_type ASC;",
        explanation:
          "## Approach\n\nGroup invoices by type and sum their total amounts.\n\n## Query\n\n```sql\nSELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue\nFROM invoices\nGROUP BY invoice_type\nORDER BY total_revenue DESC, invoice_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY invoice_type` creates one row per invoice category.\n- `SUM(total_amount)` adds total billed revenue for that type.\n- `ROUND(..., 2)` formats the numeric value.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes revenue totals by invoice type with the correct ordering.",
      },
      {
        approach_title: "CTE type sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH invoice_type_revenue AS ( SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ) SELECT invoice_type, total_revenue FROM invoice_type_revenue ORDER BY total_revenue DESC, invoice_type ASC;",
        explanation:
          "## Approach\n\nCompute invoice revenue per type in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH invoice_type_revenue AS (\n  SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue\n  FROM invoices\n  GROUP BY invoice_type\n)\nSELECT invoice_type, total_revenue\nFROM invoice_type_revenue\nORDER BY total_revenue DESC, invoice_type ASC;\n```\n\n## Explanation\n\n- The CTE calculates one revenue total per invoice type.\n- The outer query applies the final sort order.\n- This is useful if more revenue metrics are later added.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery sum",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT invoice_type, total_revenue FROM ( SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ) x ORDER BY total_revenue DESC, invoice_type ASC;",
        explanation:
          "## Approach\n\nUse a derived table to calculate invoice-type revenue first.\n\n## Query\n\n```sql\nSELECT invoice_type, total_revenue\nFROM (\n  SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue\n  FROM invoices\n  GROUP BY invoice_type\n) x\nORDER BY total_revenue DESC, invoice_type ASC;\n```\n\n## Explanation\n\n- The inner query computes revenue totals.\n- The outer query applies the final ordering.\n- The result matches the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_058",
    approaches: [
      {
        approach_title: "LEFT JOIN active",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a LEFT JOIN bed_allocations ba ON a.id = ba.admission_id AND ba.allocation_status = 'active' WHERE a.admission_status = 'admitted' AND ba.id IS NULL ORDER BY a.admitted_at ASC, a.id ASC;",
        explanation:
          "## Approach\n\nStart from currently admitted rows, left join only active bed allocations, then keep admissions where no active bed was found.\n\n## Query\n\n```sql\nSELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at\nFROM admissions a\nLEFT JOIN bed_allocations ba ON a.id = ba.admission_id AND ba.allocation_status = 'active'\nWHERE a.admission_status = 'admitted'\n  AND ba.id IS NULL\nORDER BY a.admitted_at ASC, a.id ASC;\n```\n\n## Explanation\n\n- `a.admission_status = 'admitted'` keeps active admissions only.\n- The filtered `LEFT JOIN` matches only active bed allocations.\n- `ba.id IS NULL` identifies admissions without any active allocation.\n- The output columns and sort order match the expected result.\n\n## Why this is optimal\n\nIt precisely checks for missing active bed allocations while preserving all admitted rows.",
      },
      {
        approach_title: "NOT EXISTS bed",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a WHERE a.admission_status = 'admitted' AND NOT EXISTS (SELECT 1 FROM bed_allocations ba WHERE ba.admission_id = a.id AND ba.allocation_status = 'active') ORDER BY a.admitted_at ASC, a.id ASC;",
        explanation:
          "## Approach\n\nReturn admitted rows only when no active bed allocation exists for that admission.\n\n## Query\n\n```sql\nSELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at\nFROM admissions a\nWHERE a.admission_status = 'admitted'\n  AND NOT EXISTS (\n    SELECT 1\n    FROM bed_allocations ba\n    WHERE ba.admission_id = a.id\n      AND ba.allocation_status = 'active'\n  )\nORDER BY a.admitted_at ASC, a.id ASC;\n```\n\n## Explanation\n\n- `NOT EXISTS` checks for the absence of any active bed allocation.\n- The condition is applied only to currently admitted patients.\n- The final ordering remains the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the left-join-null pattern matches the expected query more closely.",
      },
      {
        approach_title: "CTE no bed",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_bed_allocations AS ( SELECT DISTINCT admission_id FROM bed_allocations WHERE allocation_status = 'active' ) SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a LEFT JOIN active_bed_allocations aba ON aba.admission_id = a.id WHERE a.admission_status = 'admitted' AND aba.admission_id IS NULL ORDER BY a.admitted_at ASC, a.id ASC;",
        explanation:
          "## Approach\n\nCreate a list of admissions with active bed allocations, then find admitted rows not in that list.\n\n## Query\n\n```sql\nWITH active_bed_allocations AS (\n  SELECT DISTINCT admission_id\n  FROM bed_allocations\n  WHERE allocation_status = 'active'\n)\nSELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at\nFROM admissions a\nLEFT JOIN active_bed_allocations aba ON aba.admission_id = a.id\nWHERE a.admission_status = 'admitted'\n  AND aba.admission_id IS NULL\nORDER BY a.admitted_at ASC, a.id ASC;\n```\n\n## Explanation\n\n- The CTE creates a deduplicated set of admissions with active bed allocations.\n- The outer query keeps admitted patients not found in that set.\n- The sort order matches the expected output.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the active allocation set is needed elsewhere.",
      },
    ],
  },
  {
    code: "HOSPITAL_059",
    approaches: [
      {
        approach_title: "LEFT JOIN gaps",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a LEFT JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to) WHERE ds.id IS NULL ORDER BY a.scheduled_start_at ASC, a.id ASC;",
        explanation:
          "## Approach\n\nTry to match each appointment to an active doctor schedule for the same weekday and effective date range, then keep only unmatched rows.\n\n## Query\n\n```sql\nSELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at\nFROM appointments a\nLEFT JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id\n  AND ds.is_active = true\n  AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at)\n  AND DATE(a.scheduled_start_at) >= ds.effective_from\n  AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to)\nWHERE ds.id IS NULL\nORDER BY a.scheduled_start_at ASC, a.id ASC;\n```\n\n## Explanation\n\n- The join attempts to find a matching active schedule row for each appointment.\n- The weekday and effective date range must both match.\n- `ds.id IS NULL` identifies appointments with no valid matching schedule.\n- The result is ordered by appointment time, then id.\n\n## Why this is optimal\n\nIt directly expresses the missing-match logic and preserves all appointments for checking.",
      },
      {
        approach_title: "NOT EXISTS sched",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a WHERE NOT EXISTS (SELECT 1 FROM doctor_schedules ds WHERE ds.doctor_id = a.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to)) ORDER BY a.scheduled_start_at ASC, a.id ASC;",
        explanation:
          "## Approach\n\nReturn appointments only when no active matching schedule exists.\n\n## Query\n\n```sql\nSELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at\nFROM appointments a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM doctor_schedules ds\n  WHERE ds.doctor_id = a.doctor_id\n    AND ds.is_active = true\n    AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at)\n    AND DATE(a.scheduled_start_at) >= ds.effective_from\n    AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to)\n)\nORDER BY a.scheduled_start_at ASC, a.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether at least one valid active schedule exists.\n- `NOT EXISTS` keeps only appointments with no such match.\n- The result columns and order remain unchanged.\n\n## Difference from the optimal approach\n\nAlso correct, but the left-join-null pattern matches the original expected query more closely.",
      },
      {
        approach_title: "CTE valid sched",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH matched_appointments AS ( SELECT DISTINCT a.id FROM appointments a JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to) ) SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a LEFT JOIN matched_appointments ma ON ma.id = a.id WHERE ma.id IS NULL ORDER BY a.scheduled_start_at ASC, a.id ASC;",
        explanation:
          "## Approach\n\nFirst identify appointments that do have a valid schedule match, then return the rest.\n\n## Query\n\n```sql\nWITH matched_appointments AS (\n  SELECT DISTINCT a.id\n  FROM appointments a\n  JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id\n    AND ds.is_active = true\n    AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at)\n    AND DATE(a.scheduled_start_at) >= ds.effective_from\n    AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to)\n)\nSELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at\nFROM appointments a\nLEFT JOIN matched_appointments ma ON ma.id = a.id\nWHERE ma.id IS NULL\nORDER BY a.scheduled_start_at ASC, a.id ASC;\n```\n\n## Explanation\n\n- The CTE captures appointments that have a valid schedule match.\n- The outer query returns appointments not found in that matched set.\n- The final sort matches the expected output.\n\n## Difference from the optimal approach\n\nMore verbose and indirect for this case.",
      },
    ],
  },
  {
    code: "HOSPITAL_060",
    approaches: [
      {
        approach_title: "AVG delay",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400), 2) AS avg_collection_delay_days FROM invoices i JOIN payments p ON i.id = p.invoice_id WHERE i.issued_at IS NOT NULL AND p.payment_status = 'successful' AND p.paid_at IS NOT NULL;",
        explanation:
          "## Approach\n\nJoin invoices to successful payments, compute the delay in days, then average it.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400), 2) AS avg_collection_delay_days\nFROM invoices i\nJOIN payments p ON i.id = p.invoice_id\nWHERE i.issued_at IS NOT NULL\n  AND p.payment_status = 'successful'\n  AND p.paid_at IS NOT NULL;\n```\n\n## Explanation\n\n- `p.paid_at - i.issued_at` gives the collection delay.\n- `EXTRACT(EPOCH FROM ...) / 86400` converts the interval into days.\n- `AVG(...)` computes the average delay across matching invoice-payment rows.\n- The `WHERE` clause removes incomplete or irrelevant rows.\n- `ROUND(..., 2)` formats the result.\n\n## Why this is optimal\n\nIt directly measures the average collection delay and works cleanly with rounding.",
      },
      {
        approach_title: "CTE delay",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH payment_delays AS (\n  SELECT EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400 AS delay_days\n  FROM invoices i\n  JOIN payments p ON i.id = p.invoice_id\n  WHERE i.issued_at IS NOT NULL\n    AND p.payment_status = 'successful'\n    AND p.paid_at IS NOT NULL\n)\nSELECT ROUND(AVG(delay_days), 2) AS avg_collection_delay_days\nFROM payment_delays;",
        explanation:
          "## Approach\n\nCompute delay days per invoice-payment row in a CTE, then average them.\n\n## Query\n\n```sql\nWITH payment_delays AS (\n  SELECT EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400 AS delay_days\n  FROM invoices i\n  JOIN payments p ON i.id = p.invoice_id\n  WHERE i.issued_at IS NOT NULL\n    AND p.payment_status = 'successful'\n    AND p.paid_at IS NOT NULL\n)\nSELECT ROUND(AVG(delay_days), 2) AS avg_collection_delay_days\nFROM payment_delays;\n```\n\n## Explanation\n\n- The CTE stores one delay value per valid invoice-payment combination.\n- The outer query averages those delays.\n- This is useful if delay buckets or other payment metrics are added later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400)::numeric, 2) AS avg_collection_delay_days FROM invoices i JOIN payments p ON i.id = p.invoice_id WHERE i.issued_at IS NOT NULL AND p.payment_status = 'successful' AND p.paid_at IS NOT NULL;",
        explanation:
          "## Approach\n\nCompute the average delay in days, cast it to `numeric`, then round it.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400)::numeric, 2) AS avg_collection_delay_days\nFROM invoices i\nJOIN payments p ON i.id = p.invoice_id\nWHERE i.issued_at IS NOT NULL\n  AND p.payment_status = 'successful'\n  AND p.paid_at IS NOT NULL;\n```\n\n## Explanation\n\n- The delay is still converted into days using epoch seconds.\n- `AVG(...)` computes the mean collection delay.\n- Casting to `numeric` before `ROUND(..., 2)` avoids PostgreSQL type issues in stricter setups.\n- The filter conditions remain the same.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_061",
    approaches: [
      {
        approach_title: "Count diagnoses",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;",
        explanation:
          "## Approach\n\nGroup diagnosis rows by diagnosis name, count them, then keep the top 10.\n\n## Query\n\n```sql\nSELECT diagnosis_name, COUNT(*) AS diagnosis_count\nFROM diagnoses\nGROUP BY diagnosis_name\nORDER BY diagnosis_count DESC, diagnosis_name ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `GROUP BY diagnosis_name` creates one group per diagnosis.\n- `COUNT(*)` counts how often each diagnosis appears.\n- `ORDER BY diagnosis_count DESC` puts the most frequent diagnoses first.\n- `diagnosis_name ASC` breaks ties consistently.\n- `LIMIT 10` keeps only the top 10 rows.\n\n## Why this is optimal\n\nIt directly computes the most frequent diagnoses with the exact ranking and limit required.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT diagnosis_name, COUNT(id) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount diagnosis ids instead of all rows.\n\n## Query\n\n```sql\nSELECT diagnosis_name, COUNT(id) AS diagnosis_count\nFROM diagnoses\nGROUP BY diagnosis_name\nORDER BY diagnosis_count DESC, diagnosis_name ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL diagnosis ids.\n- Since `id` is a primary key, it gives the same result as `COUNT(*)`.\n- The ranking and limit remain the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for counting rows.",
      },
      {
        approach_title: "CTE top dx",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH diagnosis_counts AS ( SELECT diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ) SELECT diagnosis_name, diagnosis_count FROM diagnosis_counts ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute diagnosis counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH diagnosis_counts AS (\n  SELECT diagnosis_name, COUNT(*) AS diagnosis_count\n  FROM diagnoses\n  GROUP BY diagnosis_name\n)\nSELECT diagnosis_name, diagnosis_count\nFROM diagnosis_counts\nORDER BY diagnosis_count DESC, diagnosis_name ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one row per diagnosis name.\n- The outer query applies the ranking and top-10 filter.\n- This is useful if more diagnosis-level metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
    ],
  },
  {
    code: "HOSPITAL_062",
    approaches: [
      {
        approach_title: "Join abnormal",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN lab_orders lo ON p.id = lo.patient_id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low', 'critical') ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nJoin patients through lab orders to lab results, keep abnormal results, and remove duplicate patients.\n\n## Query\n\n```sql\nSELECT DISTINCT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN lab_orders lo ON p.id = lo.patient_id\nJOIN lab_order_items loi ON lo.id = loi.lab_order_id\nJOIN lab_results lr ON loi.id = lr.lab_order_item_id\nWHERE lr.interpretation IN ('high', 'low', 'critical')\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The join path links each patient to their lab results.\n- `interpretation IN ('high', 'low', 'critical')` keeps abnormal results only.\n- A patient can have many abnormal results, so `DISTINCT` returns each patient once.\n- The final sort matches the expected output.\n\n## Why this is optimal\n\nIt directly follows the schema relationships and returns exactly the patients with abnormal or critical results.",
      },
      {
        approach_title: "EXISTS abnormal",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS ( SELECT 1 FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lo.patient_id = p.id AND lr.interpretation IN ('high', 'low', 'critical') ) ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nReturn patients only if at least one abnormal lab result exists for them.\n\n## Query\n\n```sql\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nWHERE EXISTS (\n  SELECT 1\n  FROM lab_orders lo\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_results lr ON loi.id = lr.lab_order_item_id\n  WHERE lo.patient_id = p.id\n    AND lr.interpretation IN ('high', 'low', 'critical')\n)\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the patient has at least one abnormal result.\n- `EXISTS` naturally avoids duplicate patient rows.\n- The final ordering remains the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the join plus `DISTINCT` is often easier for learners to trace across tables.",
      },
      {
        approach_title: "CTE abnormal",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH abnormal_patients AS ( SELECT DISTINCT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low', 'critical') ) SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN abnormal_patients ap ON ap.patient_id = p.id ORDER BY p.id ASC;",
        explanation:
          "## Approach\n\nBuild a distinct patient list from abnormal lab results, then join it back to patients.\n\n## Query\n\n```sql\nWITH abnormal_patients AS (\n  SELECT DISTINCT lo.patient_id\n  FROM lab_orders lo\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_results lr ON loi.id = lr.lab_order_item_id\n  WHERE lr.interpretation IN ('high', 'low', 'critical')\n)\nSELECT p.id, p.patient_code, p.full_name\nFROM patients p\nJOIN abnormal_patients ap ON ap.patient_id = p.id\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- The CTE creates a deduplicated patient list.\n- The outer query retrieves patient details.\n- This is useful if the abnormal patient set needs to be reused later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_063",
    approaches: [
      {
        approach_title: "Month revenue",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ORDER BY payment_month ASC;",
        explanation:
          "## Approach\n\nFilter to successful payments, group them by month, and sum the collected amount.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount\nFROM payments\nWHERE payment_status = 'successful'\n  AND paid_at IS NOT NULL\nGROUP BY DATE_TRUNC('month', paid_at)\nORDER BY payment_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', paid_at)` groups payments into calendar months.\n- `payment_status = 'successful'` keeps only collected payments.\n- `SUM(amount_paid)` gives the total collected amount per month.\n- `ROUND(..., 2)` formats the revenue.\n- The result is ordered chronologically.\n\n## Why this is optimal\n\nIt directly computes monthly payment collection totals from successful payments only.",
      },
      {
        approach_title: "CTE month sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_collection AS ( SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ) SELECT payment_month, total_collected_amount FROM monthly_collection ORDER BY payment_month ASC;",
        explanation:
          "## Approach\n\nCompute monthly collection totals in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH monthly_collection AS (\n  SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n    AND paid_at IS NOT NULL\n  GROUP BY DATE_TRUNC('month', paid_at)\n)\nSELECT payment_month, total_collected_amount\nFROM monthly_collection\nORDER BY payment_month ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per payment month.\n- The outer query applies the chronological ordering.\n- This is useful if more monthly payment metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
      {
        approach_title: "Subquery month",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT payment_month, total_collected_amount FROM ( SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ) x ORDER BY payment_month ASC;",
        explanation:
          "## Approach\n\nUse a derived table to calculate monthly collections first.\n\n## Query\n\n```sql\nSELECT payment_month, total_collected_amount\nFROM (\n  SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n    AND paid_at IS NOT NULL\n  GROUP BY DATE_TRUNC('month', paid_at)\n) x\nORDER BY payment_month ASC;\n```\n\n## Explanation\n\n- The inner query computes the month-level totals.\n- The outer query handles the final order.\n- The output matches the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_064",
    approaches: [
      {
        approach_title: "Join daily avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(slot_appointments.appointment_count), 2) AS avg_appointments_per_slot_day FROM doctor_schedules ds JOIN (SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at)) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week WHERE ds.is_active = true GROUP BY ds.doctor_id, ds.day_of_week ORDER BY ds.doctor_id ASC, ds.day_of_week ASC;",
        explanation:
          "## Approach\n\nFirst count appointments per doctor, weekday, and calendar date, then join those daily counts to active schedules and average them.\n\n## Query\n\n```sql\nSELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(slot_appointments.appointment_count), 2) AS avg_appointments_per_slot_day\nFROM doctor_schedules ds\nJOIN (\n  SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS appointment_count\n  FROM appointments\n  GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at)\n) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week\nWHERE ds.is_active = true\nGROUP BY ds.doctor_id, ds.day_of_week\nORDER BY ds.doctor_id ASC, ds.day_of_week ASC;\n```\n\n## Explanation\n\n- The subquery creates one row per doctor, weekday, and day with an appointment count.\n- That result is joined to active doctor schedules on doctor and weekday.\n- `AVG(appointment_count)` gives the average booked appointments for that weekday.\n- `ROUND(..., 2)` formats the result.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt follows the intended logic exactly by averaging daily appointment volumes over scheduled weekdays.",
      },
      {
        approach_title: "CTE daily avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH slot_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at) ) SELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(sa.appointment_count), 2) AS avg_appointments_per_slot_day FROM doctor_schedules ds JOIN slot_appointments sa ON ds.doctor_id = sa.doctor_id AND ds.day_of_week = sa.day_of_week WHERE ds.is_active = true GROUP BY ds.doctor_id, ds.day_of_week ORDER BY ds.doctor_id ASC, ds.day_of_week ASC;",
        explanation:
          "## Approach\n\nStore per-day appointment counts in a CTE, then average them after joining to active schedules.\n\n## Query\n\n```sql\nWITH slot_appointments AS (\n  SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS appointment_count\n  FROM appointments\n  GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at)\n)\nSELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(sa.appointment_count), 2) AS avg_appointments_per_slot_day\nFROM doctor_schedules ds\nJOIN slot_appointments sa ON ds.doctor_id = sa.doctor_id AND ds.day_of_week = sa.day_of_week\nWHERE ds.is_active = true\nGROUP BY ds.doctor_id, ds.day_of_week\nORDER BY ds.doctor_id ASC, ds.day_of_week ASC;\n```\n\n## Explanation\n\n- The CTE computes one appointment count per doctor, weekday, and date.\n- The outer query joins those counts to active schedule rows.\n- `AVG(...)` then produces the weekday-level average.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to read step by step.",
      },
      {
        approach_title: "Nested subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT doctor_id, day_of_week, ROUND(AVG(appointment_count), 2) AS avg_appointments_per_slot_day FROM ( SELECT ds.doctor_id, ds.day_of_week, slot_appointments.appointment_count FROM doctor_schedules ds JOIN ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at) ) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week WHERE ds.is_active = true ) x GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;",
        explanation:
          "## Approach\n\nJoin schedules to daily appointment counts in a derived table, then average outside.\n\n## Query\n\n```sql\nSELECT doctor_id, day_of_week, ROUND(AVG(appointment_count), 2) AS avg_appointments_per_slot_day\nFROM (\n  SELECT ds.doctor_id, ds.day_of_week, slot_appointments.appointment_count\n  FROM doctor_schedules ds\n  JOIN (\n    SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS appointment_count\n    FROM appointments\n    GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at)\n  ) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week\n  WHERE ds.is_active = true\n) x\nGROUP BY doctor_id, day_of_week\nORDER BY doctor_id ASC, day_of_week ASC;\n```\n\n## Explanation\n\n- The inner query produces doctor-weekday daily counts joined to active schedules.\n- The outer query averages those counts.\n- The output is the same as the direct join approach.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_065",
    approaches: [
      {
        approach_title: "Count open",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, COUNT(*) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ORDER BY open_encounters DESC, department_id ASC;",
        explanation:
          "## Approach\n\nFilter encounters to open ones, then group by department and count them.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(*) AS open_encounters\nFROM encounters\nWHERE encounter_status = 'open'\nGROUP BY department_id\nORDER BY open_encounters DESC, department_id ASC;\n```\n\n## Explanation\n\n- `WHERE encounter_status = 'open'` keeps only open encounters.\n- `GROUP BY department_id` creates one row per department.\n- `COUNT(*)` counts open encounters in each department.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes department-level open encounter counts with the exact filter needed.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT department_id, COUNT(id) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ORDER BY open_encounters DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCount encounter ids instead of all rows.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(id) AS open_encounters\nFROM encounters\nWHERE encounter_status = 'open'\nGROUP BY department_id\nORDER BY open_encounters DESC, department_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL encounter ids.\n- Since `id` is a primary key, it gives the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE open",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH open_counts AS ( SELECT department_id, COUNT(*) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ) SELECT department_id, open_encounters FROM open_counts ORDER BY open_encounters DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute open encounter counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH open_counts AS (\n  SELECT department_id, COUNT(*) AS open_encounters\n  FROM encounters\n  WHERE encounter_status = 'open'\n  GROUP BY department_id\n)\nSELECT department_id, open_encounters\nFROM open_counts\nORDER BY open_encounters DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per department.\n- The outer query applies the final ordering.\n- This is useful if more department metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
    ],
  },
  {
    code: "HOSPITAL_066",
    approaches: [
      {
        approach_title: "Select split",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ORDER BY total_amount DESC, id ASC;",
        explanation:
          "## Approach\n\nSelect the required invoice coverage columns and sort by total amount.\n\n## Query\n\n```sql\nSELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount\nFROM invoices\nORDER BY total_amount DESC, id ASC;\n```\n\n## Explanation\n\n- No filtering or aggregation is needed.\n- The selected columns already contain the total, insurance-covered, and patient-payable amounts.\n- `ORDER BY total_amount DESC, id ASC` matches the expected output.\n\n## Why this is optimal\n\nIt directly returns the required invoice split fields with the exact sort order.",
      },
      {
        approach_title: "CTE split",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH invoice_split AS ( SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ) SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoice_split ORDER BY total_amount DESC, id ASC;",
        explanation:
          "## Approach\n\nSelect the invoice coverage fields in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH invoice_split AS (\n  SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount\n  FROM invoices\n)\nSELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount\nFROM invoice_split\nORDER BY total_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the required invoice fields.\n- The outer query applies the final ordering.\n- This is helpful if more computed columns are added later.\n\n## Difference from the optimal approach\n\nMore verbose without adding value here.",
      },
      {
        approach_title: "Subquery split",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM ( SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ) x ORDER BY total_amount DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a derived table for the invoice split columns, then sort outside.\n\n## Query\n\n```sql\nSELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount\nFROM (\n  SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount\n  FROM invoices\n) x\nORDER BY total_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query selects the required invoice fields.\n- The outer query applies the final order.\n- The result is the same as the direct select.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_067",
    approaches: [
      {
        approach_title: "Left join none",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT d.id, d.full_name, d.department_id FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id WHERE d.is_active = true GROUP BY d.id, d.full_name, d.department_id HAVING COUNT(a.id) = 0 ORDER BY d.id ASC;",
        explanation:
          "## Approach\n\nStart from active doctors, left join appointments, and keep only doctors with zero matched appointments.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name, d.department_id\nFROM doctors d\nLEFT JOIN appointments a ON d.id = a.doctor_id\nWHERE d.is_active = true\nGROUP BY d.id, d.full_name, d.department_id\nHAVING COUNT(a.id) = 0\nORDER BY d.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all active doctors, even if they have no appointments.\n- `COUNT(a.id)` counts only matched appointment rows.\n- `HAVING COUNT(a.id) = 0` keeps doctors with no appointments.\n- The final order matches the expected output.\n\n## Why this is optimal\n\nIt correctly preserves doctors with no related rows and filters them in a standard grouped way.",
      },
      {
        approach_title: "NOT EXISTS docs",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT d.id, d.full_name, d.department_id FROM doctors d WHERE d.is_active = true AND NOT EXISTS (SELECT 1 FROM appointments a WHERE a.doctor_id = d.id) ORDER BY d.id ASC;",
        explanation:
          "## Approach\n\nReturn active doctors only when no appointment row exists for them.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name, d.department_id\nFROM doctors d\nWHERE d.is_active = true\n  AND NOT EXISTS (\n    SELECT 1\n    FROM appointments a\n    WHERE a.doctor_id = d.id\n  )\nORDER BY d.id ASC;\n```\n\n## Explanation\n\n- `NOT EXISTS` checks for absence of related appointments.\n- This naturally returns each doctor once.\n- The sort order remains the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the left-join-count pattern matches the expected query more closely.",
      },
      {
        approach_title: "CTE no appts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_appointment_counts AS ( SELECT d.id, d.full_name, d.department_id, COUNT(a.id) AS appointment_count FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id WHERE d.is_active = true GROUP BY d.id, d.full_name, d.department_id ) SELECT id, full_name, department_id FROM doctor_appointment_counts WHERE appointment_count = 0 ORDER BY id ASC;",
        explanation:
          "## Approach\n\nCompute appointment counts per active doctor in a CTE, then filter to zero.\n\n## Query\n\n```sql\nWITH doctor_appointment_counts AS (\n  SELECT d.id, d.full_name, d.department_id, COUNT(a.id) AS appointment_count\n  FROM doctors d\n  LEFT JOIN appointments a ON d.id = a.doctor_id\n  WHERE d.is_active = true\n  GROUP BY d.id, d.full_name, d.department_id\n)\nSELECT id, full_name, department_id\nFROM doctor_appointment_counts\nWHERE appointment_count = 0\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per active doctor with an appointment count.\n- The outer query keeps only those with zero appointments.\n- This is useful if appointment_count itself is needed later.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
    ],
  },
  {
    code: "HOSPITAL_068",
    approaches: [
      {
        approach_title: "CASE cancel rate",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ORDER BY cancellation_rate_pct DESC, department_id ASC;",
        explanation:
          "## Approach\n\nGroup appointments by department and calculate the cancelled percentage.\n\n## Query\n\n```sql\nSELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct\nFROM appointments\nGROUP BY department_id\nORDER BY cancellation_rate_pct DESC, department_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY department_id` creates one group per department.\n- The `CASE` expression counts cancelled appointments only.\n- `COUNT(*)` gives the total appointments in each department.\n- The ratio is converted to a percentage and rounded.\n- The final sort matches the expected output.\n\n## Why this is optimal\n\nIt directly computes department-level cancellation rate in a single grouped query.",
      },
      {
        approach_title: "FILTER cancel rate",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT department_id, ROUND(100.0 * COUNT(*) FILTER (WHERE appointment_status = 'cancelled') / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ORDER BY cancellation_rate_pct DESC, department_id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count cancelled appointments inside the aggregate.\n\n## Query\n\n```sql\nSELECT department_id, ROUND(100.0 * COUNT(*) FILTER (WHERE appointment_status = 'cancelled') / COUNT(*), 2) AS cancellation_rate_pct\nFROM appointments\nGROUP BY department_id\nORDER BY cancellation_rate_pct DESC, department_id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts only cancelled rows within each department.\n- `COUNT(*)` gives the department total.\n- The percentage and ordering remain the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` form is often easier for learners.",
      },
      {
        approach_title: "CTE cancel rate",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH department_cancel_rates AS ( SELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ) SELECT department_id, cancellation_rate_pct FROM department_cancel_rates ORDER BY cancellation_rate_pct DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute cancellation rates in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH department_cancel_rates AS (\n  SELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct\n  FROM appointments\n  GROUP BY department_id\n)\nSELECT department_id, cancellation_rate_pct\nFROM department_cancel_rates\nORDER BY cancellation_rate_pct DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one rate row per department.\n- The outer query applies the final order.\n- This is useful if more department-level appointment metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_069",
    approaches: [
      {
        approach_title: "CASE completion",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ORDER BY completion_rate_pct DESC, p.id ASC;",
        explanation:
          "## Approach\n\nJoin procedure orders to procedures, then calculate what percentage of orders were completed.\n\n## Query\n\n```sql\nSELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct\nFROM procedure_orders po\nJOIN procedures p ON po.procedure_id = p.id\nGROUP BY p.id, p.procedure_name\nORDER BY completion_rate_pct DESC, p.id ASC;\n```\n\n## Explanation\n\n- The join provides procedure names.\n- The `CASE` expression counts completed orders only.\n- `COUNT(po.id)` gives total orders per procedure.\n- The ratio is converted to a percentage and rounded.\n- The output is ordered by completion rate, then procedure id.\n\n## Why this is optimal\n\nIt directly computes completion rate per procedure from the order data.",
      },
      {
        approach_title: "FILTER completion",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * COUNT(*) FILTER (WHERE po.procedure_status = 'completed') / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ORDER BY completion_rate_pct DESC, p.id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count completed procedure orders.\n\n## Query\n\n```sql\nSELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * COUNT(*) FILTER (WHERE po.procedure_status = 'completed') / COUNT(po.id), 2) AS completion_rate_pct\nFROM procedure_orders po\nJOIN procedures p ON po.procedure_id = p.id\nGROUP BY p.id, p.procedure_name\nORDER BY completion_rate_pct DESC, p.id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts only completed orders.\n- `COUNT(po.id)` gives the total orders per procedure.\n- The percentage calculation and ordering stay the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` style is often easier to teach.",
      },
      {
        approach_title: "CTE completion",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH procedure_completion AS ( SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ) SELECT procedure_id, procedure_name, completion_rate_pct FROM procedure_completion ORDER BY completion_rate_pct DESC, procedure_id ASC;",
        explanation:
          "## Approach\n\nCompute completion rates in a CTE, then sort them outside.\n\n## Query\n\n```sql\nWITH procedure_completion AS (\n  SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct\n  FROM procedure_orders po\n  JOIN procedures p ON po.procedure_id = p.id\n  GROUP BY p.id, p.procedure_name\n)\nSELECT procedure_id, procedure_name, completion_rate_pct\nFROM procedure_completion\nORDER BY completion_rate_pct DESC, procedure_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one completion-rate row per procedure.\n- The outer query applies the final sort.\n- This is useful if more procedure metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_070",
    approaches: [
      {
        approach_title: "Count distinct types",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id HAVING COUNT(DISTINCT encounter_type) > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nGroup encounters by patient, count distinct encounter types, and keep only patients with more than one type.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types\nFROM encounters\nGROUP BY patient_id\nHAVING COUNT(DISTINCT encounter_type) > 1\nORDER BY distinct_encounter_types DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY patient_id` creates one row per patient.\n- `COUNT(DISTINCT encounter_type)` counts unique encounter categories per patient.\n- `HAVING ... > 1` keeps only patients with multiple encounter types.\n- The output is sorted by the distinct count, then patient id.\n\n## Why this is optimal\n\nIt directly solves the problem using the exact distinct-count logic required.",
      },
      {
        approach_title: "CTE distinct types",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH patient_type_counts AS ( SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id ) SELECT patient_id, distinct_encounter_types FROM patient_type_counts WHERE distinct_encounter_types > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCalculate distinct encounter types per patient in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH patient_type_counts AS (\n  SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types\n  FROM encounters\n  GROUP BY patient_id\n)\nSELECT patient_id, distinct_encounter_types\nFROM patient_type_counts\nWHERE distinct_encounter_types > 1\nORDER BY distinct_encounter_types DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one distinct-type count per patient.\n- The outer query keeps only patients with counts above 1.\n- The sort order matches the expected output.\n\n## Difference from the optimal approach\n\nMore verbose, but sometimes easier to read step by step.",
      },
      {
        approach_title: "Distinct subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT patient_id, distinct_encounter_types FROM ( SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id ) x WHERE distinct_encounter_types > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nUse a derived table to calculate distinct encounter-type counts first.\n\n## Query\n\n```sql\nSELECT patient_id, distinct_encounter_types\nFROM (\n  SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types\n  FROM encounters\n  GROUP BY patient_id\n) x\nWHERE distinct_encounter_types > 1\nORDER BY distinct_encounter_types DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The inner query computes distinct encounter-type counts per patient.\n- The outer query filters to patients with more than one type.\n- The final ordering is unchanged.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_071",
    approaches: [
      {
        approach_title: "Top dept patients",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_patients DESC, department_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nGroup encounters by department, count distinct patients, then keep the top 5 departments.\n\n## Query\n\n```sql\nSELECT department_id, COUNT(DISTINCT patient_id) AS total_patients\nFROM encounters\nWHERE department_id IS NOT NULL\nGROUP BY department_id\nORDER BY total_patients DESC, department_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE department_id IS NOT NULL` removes encounters not linked to a department.\n- `COUNT(DISTINCT patient_id)` counts unique patients per department.\n- `ORDER BY total_patients DESC` ranks departments by patient volume.\n- `LIMIT 5` keeps only the top 5 departments.\n\n## Why this is optimal\n\nIt directly computes distinct patient volume per department with the required ranking and limit.",
      },
      {
        approach_title: "CTE top dept",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH department_patient_counts AS ( SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ) SELECT department_id, total_patients FROM department_patient_counts ORDER BY total_patients DESC, department_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute department patient counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH department_patient_counts AS (\n  SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients\n  FROM encounters\n  WHERE department_id IS NOT NULL\n  GROUP BY department_id\n)\nSELECT department_id, total_patients\nFROM department_patient_counts\nORDER BY total_patients DESC, department_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one row per department.\n- The outer query handles the ranking and top-5 selection.\n- This structure is useful if more department metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery top dept",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT department_id, total_patients FROM ( SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ) x ORDER BY total_patients DESC, department_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nUse a derived table for department patient counts, then rank outside.\n\n## Query\n\n```sql\nSELECT department_id, total_patients\nFROM (\n  SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients\n  FROM encounters\n  WHERE department_id IS NOT NULL\n  GROUP BY department_id\n) x\nORDER BY total_patients DESC, department_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query computes the distinct patient counts.\n- The outer query applies the final order and limit.\n- The output matches the direct grouped query.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_072",
    approaches: [
      {
        approach_title: "CASE utilization",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY utilization_pct DESC, r.id ASC;",
        explanation:
          "## Approach\n\nJoin rooms to beds, count occupied beds, divide by total beds, and convert to a percentage.\n\n## Query\n\n```sql\nSELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct\nFROM rooms r\nJOIN beds b ON r.id = b.room_id\nGROUP BY r.id, r.room_number\nORDER BY utilization_pct DESC, r.id ASC;\n```\n\n## Explanation\n\n- `JOIN beds` links each room to its beds.\n- The `CASE` expression counts occupied beds only.\n- `COUNT(b.id)` gives total beds in the room.\n- The ratio is multiplied by `100.0` and rounded to get a percentage.\n- The result is sorted by highest utilization first.\n\n## Why this is optimal\n\nIt directly computes room-level bed utilization from occupied and total bed counts.",
      },
      {
        approach_title: "FILTER utilization",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT r.id AS room_id, r.room_number, ROUND(100.0 * COUNT(*) FILTER (WHERE b.bed_status = 'occupied') / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY utilization_pct DESC, r.id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count occupied beds inside the aggregate.\n\n## Query\n\n```sql\nSELECT r.id AS room_id, r.room_number, ROUND(100.0 * COUNT(*) FILTER (WHERE b.bed_status = 'occupied') / COUNT(b.id), 2) AS utilization_pct\nFROM rooms r\nJOIN beds b ON r.id = b.room_id\nGROUP BY r.id, r.room_number\nORDER BY utilization_pct DESC, r.id ASC;\n```\n\n## Explanation\n\n- `COUNT(*) FILTER (...)` counts only occupied beds.\n- `COUNT(b.id)` counts all beds in the room.\n- The percentage and ordering stay the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` form is often easier for learners to understand.",
      },
      {
        approach_title: "CTE utilization",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH room_bed_utilization AS ( SELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ) SELECT room_id, room_number, utilization_pct FROM room_bed_utilization ORDER BY utilization_pct DESC, room_id ASC;",
        explanation:
          "## Approach\n\nCompute room utilization in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH room_bed_utilization AS (\n  SELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct\n  FROM rooms r\n  JOIN beds b ON r.id = b.room_id\n  GROUP BY r.id, r.room_number\n)\nSELECT room_id, room_number, utilization_pct\nFROM room_bed_utilization\nORDER BY utilization_pct DESC, room_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one utilization row per room.\n- The outer query applies the final ordering.\n- This can help if more room metrics are needed later.\n\n## Difference from the optimal approach\n\nMore verbose for the same output.",
      },
    ],
  },
  {
    code: "HOSPITAL_073",
    approaches: [
      {
        approach_title: "Top doctor revenue",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin invoices to encounters, group by attending doctor, sum invoice totals, and keep the top 10.\n\n## Query\n\n```sql\nSELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue\nFROM invoices i\nJOIN encounters e ON i.encounter_id = e.id\nWHERE e.attending_doctor_id IS NOT NULL\nGROUP BY e.attending_doctor_id\nORDER BY total_revenue DESC, doctor_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `JOIN encounters` links each invoice to the doctor responsible for the encounter.\n- `WHERE e.attending_doctor_id IS NOT NULL` removes invoices without a doctor.\n- `SUM(i.total_amount)` computes total revenue per doctor.\n- `ROUND(..., 2)` formats the amount.\n- `LIMIT 10` keeps only the top 10 doctors.\n\n## Why this is optimal\n\nIt directly computes doctor-level invoice revenue using the exact join path required.",
      },
      {
        approach_title: "CTE doctor rev",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_revenue AS ( SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ) SELECT doctor_id, total_revenue FROM doctor_revenue ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute revenue per doctor in a CTE, then rank and limit outside.\n\n## Query\n\n```sql\nWITH doctor_revenue AS (\n  SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  WHERE e.attending_doctor_id IS NOT NULL\n  GROUP BY e.attending_doctor_id\n)\nSELECT doctor_id, total_revenue\nFROM doctor_revenue\nORDER BY total_revenue DESC, doctor_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one revenue row per doctor.\n- The outer query applies the ordering and top-10 filter.\n- This is useful if more doctor revenue metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery doctor rev",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT doctor_id, total_revenue FROM ( SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ) x ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table for doctor revenue totals, then sort and limit outside.\n\n## Query\n\n```sql\nSELECT doctor_id, total_revenue\nFROM (\n  SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  WHERE e.attending_doctor_id IS NOT NULL\n  GROUP BY e.attending_doctor_id\n) x\nORDER BY total_revenue DESC, doctor_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes one revenue total per doctor.\n- The outer query handles the final ranking and limit.\n- The output matches the direct grouped join.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_074",
    approaches: [
      {
        approach_title: "HAVING no-shows",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT patient_id, COUNT(*) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id HAVING COUNT(*) > 2 ORDER BY no_show_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nFilter appointments to no-shows, group by patient, count them, then keep patients with more than 2.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(*) AS no_show_count\nFROM appointments\nWHERE appointment_status = 'no_show'\nGROUP BY patient_id\nHAVING COUNT(*) > 2\nORDER BY no_show_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `WHERE appointment_status = 'no_show'` keeps only no-show appointments.\n- `GROUP BY patient_id` creates one row per patient.\n- `COUNT(*)` counts no-shows for that patient.\n- `HAVING COUNT(*) > 2` keeps only frequent no-show patients.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the most direct grouped-count solution for this threshold-based requirement.",
      },
      {
        approach_title: "CTE no-shows",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH patient_no_show_counts AS ( SELECT patient_id, COUNT(*) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id ) SELECT patient_id, no_show_count FROM patient_no_show_counts WHERE no_show_count > 2 ORDER BY no_show_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCompute no-show counts in a CTE, then filter to counts above 2.\n\n## Query\n\n```sql\nWITH patient_no_show_counts AS (\n  SELECT patient_id, COUNT(*) AS no_show_count\n  FROM appointments\n  WHERE appointment_status = 'no_show'\n  GROUP BY patient_id\n)\nSELECT patient_id, no_show_count\nFROM patient_no_show_counts\nWHERE no_show_count > 2\nORDER BY no_show_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one no-show count per patient.\n- The outer query applies the threshold filter and ordering.\n- This is useful if more patient appointment metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT patient_id, COUNT(id) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id HAVING COUNT(id) > 2 ORDER BY no_show_count DESC, patient_id ASC;",
        explanation:
          "## Approach\n\nCount appointment ids instead of all rows after filtering to no-shows.\n\n## Query\n\n```sql\nSELECT patient_id, COUNT(id) AS no_show_count\nFROM appointments\nWHERE appointment_status = 'no_show'\nGROUP BY patient_id\nHAVING COUNT(id) > 2\nORDER BY no_show_count DESC, patient_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL appointment ids.\n- Since `id` is a primary key, it gives the same result as `COUNT(*)`.\n- The grouping, threshold, and ordering stay the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
    ],
  },
  {
    code: "HOSPITAL_075",
    approaches: [
      {
        approach_title: "CASE rejection",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;",
        explanation:
          "## Approach\n\nJoin claims to providers through policies, then calculate the percentage of rejected claims.\n\n## Query\n\n```sql\nSELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct\nFROM insurance_claims ic\nJOIN insurance_policies ip ON ic.insurance_policy_id = ip.id\nJOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id\nGROUP BY ipr.id, ipr.provider_name\nORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;\n```\n\n## Explanation\n\n- The joins connect each claim to its provider.\n- The `CASE` expression counts only rejected claims.\n- `COUNT(ic.id)` gives total claims per provider.\n- The ratio is converted to a percentage and rounded.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes rejection rate per provider from the correct joined tables.",
      },
      {
        approach_title: "FILTER rejection",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * COUNT(*) FILTER (WHERE ic.claim_status = 'rejected') / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count rejected claims inside the aggregate.\n\n## Query\n\n```sql\nSELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * COUNT(*) FILTER (WHERE ic.claim_status = 'rejected') / COUNT(ic.id), 2) AS rejection_rate_pct\nFROM insurance_claims ic\nJOIN insurance_policies ip ON ic.insurance_policy_id = ip.id\nJOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id\nGROUP BY ipr.id, ipr.provider_name\nORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts only rejected claims per provider.\n- `COUNT(ic.id)` gives total claims per provider.\n- The percentage logic and ordering remain the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` style is often easier to teach.",
      },
      {
        approach_title: "CTE rejection",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH provider_rejection_rates AS ( SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ) SELECT insurance_provider_id, provider_name, rejection_rate_pct FROM provider_rejection_rates ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;",
        explanation:
          "## Approach\n\nCompute provider rejection rates in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH provider_rejection_rates AS (\n  SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct\n  FROM insurance_claims ic\n  JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id\n  JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id\n  GROUP BY ipr.id, ipr.provider_name\n)\nSELECT insurance_provider_id, provider_name, rejection_rate_pct\nFROM provider_rejection_rates\nORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one rejection-rate row per provider.\n- The outer query applies the final ordering.\n- This is useful if more provider claim metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_076",
    approaches: [
      {
        approach_title: "Row num top dx",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH diagnosis_counts AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, d.diagnosis_name ASC) AS rn FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ) SELECT department_id, diagnosis_name, diagnosis_count FROM diagnosis_counts WHERE rn = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nCount diagnoses per department, rank them within each department, then keep the top-ranked diagnosis.\n\n## Query\n\n```sql\nWITH diagnosis_counts AS (\n  SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY e.department_id\n           ORDER BY COUNT(*) DESC, d.diagnosis_name ASC\n         ) AS rn\n  FROM diagnoses d\n  JOIN encounters e ON d.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, d.diagnosis_name\n)\nSELECT department_id, diagnosis_name, diagnosis_count\nFROM diagnosis_counts\nWHERE rn = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- The join links each diagnosis to its department through encounters.\n- `COUNT(*)` calculates how often each diagnosis appears in a department.\n- `ROW_NUMBER()` ranks diagnoses inside each department.\n- `diagnosis_name ASC` breaks ties consistently.\n- `WHERE rn = 1` guarantees exactly one row per department.\n\n## Why this is optimal\n\nIt returns exactly one top diagnosis per department with deterministic tie-breaking.",
      },
      {
        approach_title: "Dense rank top",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH diagnosis_counts AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count, DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, d.diagnosis_name ASC) AS rk FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ) SELECT department_id, diagnosis_name, diagnosis_count FROM diagnosis_counts WHERE rk = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nCount diagnoses per department and use `DENSE_RANK()` to identify the top diagnosis row.\n\n## Query\n\n```sql\nWITH diagnosis_counts AS (\n  SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count,\n         DENSE_RANK() OVER (\n           PARTITION BY e.department_id\n           ORDER BY COUNT(*) DESC, d.diagnosis_name ASC\n         ) AS rk\n  FROM diagnoses d\n  JOIN encounters e ON d.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, d.diagnosis_name\n)\nSELECT department_id, diagnosis_name, diagnosis_count\nFROM diagnosis_counts\nWHERE rk = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are the same as the optimal approach.\n- `DENSE_RANK()` ranks rows within each department.\n- Because `diagnosis_name` is part of the ordering, the top row is still deterministic here.\n- The final output matches the expected result.\n\n## Difference from the optimal approach\n\nIt also works, but `ROW_NUMBER()` is the clearer choice when you want exactly one row per group.",
      },
      {
        approach_title: "Two-step row num",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH diagnosis_totals AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ), ranked_diagnoses AS ( SELECT department_id, diagnosis_name, diagnosis_count, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY diagnosis_count DESC, diagnosis_name ASC) AS rn FROM diagnosis_totals ) SELECT department_id, diagnosis_name, diagnosis_count FROM ranked_diagnoses WHERE rn = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nFirst compute diagnosis counts in one CTE, then rank those counts in a second CTE.\n\n## Query\n\n```sql\nWITH diagnosis_totals AS (\n  SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count\n  FROM diagnoses d\n  JOIN encounters e ON d.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, d.diagnosis_name\n),\nranked_diagnoses AS (\n  SELECT department_id, diagnosis_name, diagnosis_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY department_id\n           ORDER BY diagnosis_count DESC, diagnosis_name ASC\n         ) AS rn\n  FROM diagnosis_totals\n)\nSELECT department_id, diagnosis_name, diagnosis_count\nFROM ranked_diagnoses\nWHERE rn = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- The first CTE creates one diagnosis-count row per department.\n- The second CTE applies ranking on those aggregated rows.\n- `ROW_NUMBER()` ensures only one final row per department.\n- This avoids the tie problem from the max-join approach.\n\n## Difference from the optimal approach\n\nIt produces the same result, but splits the logic into more steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_077",
    approaches: [
      {
        approach_title: "Top current stay",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, patient_id, admitted_at, ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days FROM admissions WHERE admission_status = 'admitted' ORDER BY stay_days DESC, id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nFor currently admitted patients, calculate ongoing stay days, then return the top 10 longest stays.\n\n## Query\n\n```sql\nSELECT id, patient_id, admitted_at,\n       ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days\nFROM admissions\nWHERE admission_status = 'admitted'\nORDER BY stay_days DESC, id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `NOW() - admitted_at` gives the ongoing stay duration.\n- `EXTRACT(EPOCH FROM ...) / 86400` converts the interval into days.\n- `ROUND(..., 2)` formats the stay length.\n- Only currently admitted patients are included.\n- `ORDER BY stay_days DESC` ranks the longest stays first.\n- `LIMIT 10` returns the top 10 rows.\n\n## Why this is optimal\n\nIt directly calculates current stay duration and returns the longest active admissions.",
      },
      {
        approach_title: "CTE current stay",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH current_stays AS (\n  SELECT id, patient_id, admitted_at,\n         ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days\n  FROM admissions\n  WHERE admission_status = 'admitted'\n)\nSELECT id, patient_id, admitted_at, stay_days\nFROM current_stays\nORDER BY stay_days DESC, id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute current stay days in a CTE, then rank the top 10 outside.\n\n## Query\n\n```sql\nWITH current_stays AS (\n  SELECT id, patient_id, admitted_at,\n         ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days\n  FROM admissions\n  WHERE admission_status = 'admitted'\n)\nSELECT id, patient_id, admitted_at, stay_days\nFROM current_stays\nORDER BY stay_days DESC, id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates stay days for each active admission.\n- The outer query handles sorting and top-10 filtering.\n- This is useful if stay duration needs to be reused later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Cast before round",
        approach_type: "sorting",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, patient_id, admitted_at, ROUND((EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400)::numeric, 2) AS stay_days FROM admissions WHERE admission_status = 'admitted' ORDER BY stay_days DESC, id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute stay days, cast the numeric value explicitly, then round it.\n\n## Query\n\n```sql\nSELECT id, patient_id, admitted_at,\n       ROUND((EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400)::numeric, 2) AS stay_days\nFROM admissions\nWHERE admission_status = 'admitted'\nORDER BY stay_days DESC, id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The stay duration is still converted into days using epoch seconds.\n- Casting to `numeric` before `ROUND(..., 2)` avoids PostgreSQL type issues in stricter setups.\n- The ordering and limit remain the same.\n\n## Difference from the optimal approach\n\nSlightly more explicit about type handling, but otherwise equivalent.",
      },
    ],
  },
  {
    code: "HOSPITAL_078",
    approaches: [
      {
        approach_title: "CTE utilization",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH scheduled_slots AS ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ), completed_appts AS ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) SELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM scheduled_slots s LEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id ORDER BY utilization_ratio DESC, s.doctor_id ASC;",
        explanation:
          "## Approach\n\nFirst compute schedule capacity per doctor and completed appointment count per doctor, then divide completed appointments by total scheduled slots.\n\n## Query\n\n```sql\nWITH scheduled_slots AS (\n  SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots\n  FROM doctor_schedules\n  WHERE is_active = true\n  GROUP BY doctor_id\n),\ncompleted_appts AS (\n  SELECT doctor_id, COUNT(*) AS completed_count\n  FROM appointments\n  WHERE appointment_status = 'completed'\n  GROUP BY doctor_id\n)\nSELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio\nFROM scheduled_slots s\nLEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id\nORDER BY utilization_ratio DESC, s.doctor_id ASC;\n```\n\n## Explanation\n\n- The first CTE estimates total slots per doctor from active schedules.\n- The second CTE counts completed appointments per doctor.\n- `LEFT JOIN` keeps doctors who have schedule capacity but no completed appointments.\n- `COALESCE(..., 0)` treats missing completed counts as zero.\n- `NULLIF(s.total_slots, 0)` prevents division by zero.\n- The ratio is rounded and sorted as expected.\n\n## Why this is optimal\n\nIt separates capacity and completed usage cleanly and matches the intended utilization formula.",
      },
      {
        approach_title: "Subquery utilization",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ) s LEFT JOIN ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) c ON s.doctor_id = c.doctor_id ORDER BY utilization_ratio DESC, s.doctor_id ASC;",
        explanation:
          "## Approach\n\nUse two derived tables instead of CTEs for capacity and completed counts.\n\n## Query\n\n```sql\nSELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio\nFROM (\n  SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots\n  FROM doctor_schedules\n  WHERE is_active = true\n  GROUP BY doctor_id\n) s\nLEFT JOIN (\n  SELECT doctor_id, COUNT(*) AS completed_count\n  FROM appointments\n  WHERE appointment_status = 'completed'\n  GROUP BY doctor_id\n) c ON s.doctor_id = c.doctor_id\nORDER BY utilization_ratio DESC, s.doctor_id ASC;\n```\n\n## Explanation\n\n- The first subquery computes schedule capacity.\n- The second subquery computes completed appointments.\n- The outer query calculates the utilization ratio.\n- The output matches the CTE version.\n\n## Difference from the optimal approach\n\nAlso correct, but the CTE version is easier to read and maintain.",
      },
      {
        approach_title: "CTE with columns",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH scheduled_slots AS ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ), completed_appts AS ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ), utilization AS ( SELECT s.doctor_id, COALESCE(c.completed_count, 0) AS completed_count, s.total_slots, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM scheduled_slots s LEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id ) SELECT doctor_id, utilization_ratio FROM utilization ORDER BY utilization_ratio DESC, doctor_id ASC;",
        explanation:
          "## Approach\n\nBreak the logic into three CTEs: capacity, completions, and final utilization.\n\n## Query\n\n```sql\nWITH scheduled_slots AS (\n  SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots\n  FROM doctor_schedules\n  WHERE is_active = true\n  GROUP BY doctor_id\n),\ncompleted_appts AS (\n  SELECT doctor_id, COUNT(*) AS completed_count\n  FROM appointments\n  WHERE appointment_status = 'completed'\n  GROUP BY doctor_id\n),\nutilization AS (\n  SELECT s.doctor_id, COALESCE(c.completed_count, 0) AS completed_count, s.total_slots, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio\n  FROM scheduled_slots s\n  LEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id\n)\nSELECT doctor_id, utilization_ratio\nFROM utilization\nORDER BY utilization_ratio DESC, doctor_id ASC;\n```\n\n## Explanation\n\n- The first two CTEs compute the needed inputs.\n- The third CTE computes the ratio and exposes the intermediate values too.\n- The final query returns just the required columns.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when debugging or teaching the steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_079",
    approaches: [
      {
        approach_title: "Lead readmit",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH ordered_admissions AS ( SELECT patient_id, admitted_at, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL ) SELECT patient_id, discharge_at, next_admission_at FROM ordered_admissions WHERE next_admission_at <= discharge_at + INTERVAL '30 days' ORDER BY patient_id ASC, discharge_at ASC;",
        explanation:
          "## Approach\n\nUse `LEAD()` to compare each discharged admission with the immediately next admission for the same patient.\n\n## Query\n\n```sql\nWITH ordered_admissions AS (\n  SELECT patient_id, admitted_at, discharge_at,\n         LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at\n  FROM admissions\n  WHERE discharge_at IS NOT NULL\n)\nSELECT patient_id, discharge_at, next_admission_at\nFROM ordered_admissions\nWHERE next_admission_at <= discharge_at + INTERVAL '30 days'\nORDER BY patient_id ASC, discharge_at ASC;\n```\n\n## Explanation\n\n- `LEAD(admitted_at)` gets the next admission for the same patient.\n- The filter keeps only discharged admissions.\n- The final condition checks whether the next admission happened within 30 days.\n\n## Why this is optimal\n\nIt directly matches the expected logic and avoids duplicate readmission matches.",
      },
      {
        approach_title: "CTE readmits",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ordered_admissions AS ( SELECT patient_id, admitted_at, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL ), readmissions AS ( SELECT patient_id, discharge_at, next_admission_at FROM ordered_admissions WHERE next_admission_at <= discharge_at + INTERVAL '30 days' ) SELECT patient_id, discharge_at, next_admission_at FROM readmissions ORDER BY patient_id ASC, discharge_at ASC;",
        explanation:
          "## Approach\n\nCompute the next admission first, then filter readmission cases in a second CTE.\n\n## Query\n\n```sql\nWITH ordered_admissions AS (\n  SELECT patient_id, admitted_at, discharge_at,\n         LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at\n  FROM admissions\n  WHERE discharge_at IS NOT NULL\n),\nreadmissions AS (\n  SELECT patient_id, discharge_at, next_admission_at\n  FROM ordered_admissions\n  WHERE next_admission_at <= discharge_at + INTERVAL '30 days'\n)\nSELECT patient_id, discharge_at, next_admission_at\nFROM readmissions\nORDER BY patient_id ASC, discharge_at ASC;\n```\n\n## Explanation\n\n- The first CTE finds the immediate next admission.\n- The second CTE keeps only 30-day readmissions.\n- The result matches the expected output.\n\n## Difference from the optimal approach\n\nSame logic, but split into extra steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_080",
    approaches: [
      {
        approach_title: "Row number month",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rn FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ) SELECT billing_month, patient_id, total_revenue FROM monthly_patient_revenue WHERE rn = 1 ORDER BY billing_month ASC;",
        explanation:
          "## Approach\n\nCompute revenue per patient per month, rank patients within each month, then keep the top-ranked one.\n\n## Query\n\n```sql\nWITH monthly_patient_revenue AS (\n  SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rn\n  FROM invoices\n  GROUP BY DATE_TRUNC('month', created_at), patient_id\n)\nSELECT billing_month, patient_id, total_revenue\nFROM monthly_patient_revenue\nWHERE rn = 1\nORDER BY billing_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', created_at)` groups invoices by billing month.\n- `SUM(total_amount)` computes revenue per patient in that month.\n- `ROW_NUMBER()` ranks patients within each month by revenue descending.\n- `patient_id ASC` breaks ties consistently.\n- `WHERE rn = 1` keeps the highest billed patient for each month.\n\n## Why this is optimal\n\nIt directly returns exactly one top patient per month with deterministic ranking.",
      },
      {
        approach_title: "Dense rank month",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, DENSE_RANK() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rk FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ) SELECT billing_month, patient_id, total_revenue FROM monthly_patient_revenue WHERE rk = 1 ORDER BY billing_month ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` instead of `ROW_NUMBER()` to rank monthly patient revenue.\n\n## Query\n\n```sql\nWITH monthly_patient_revenue AS (\n  SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, DENSE_RANK() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rk\n  FROM invoices\n  GROUP BY DATE_TRUNC('month', created_at), patient_id\n)\nSELECT billing_month, patient_id, total_revenue\nFROM monthly_patient_revenue\nWHERE rk = 1\nORDER BY billing_month ASC;\n```\n\n## Explanation\n\n- The grouped monthly totals are the same.\n- `DENSE_RANK()` also ranks patients within each month.\n- Because `patient_id` is included in the ordering, this still yields one first-ranked row per month in practice.\n\n## Difference from the optimal approach\n\nIt works here, but `ROW_NUMBER()` is a clearer choice when exactly one row per month is intended.",
      },
      {
        approach_title: "CTE max month",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ), max_month_revenue AS ( SELECT billing_month, MAX(total_revenue) AS max_revenue FROM monthly_patient_revenue GROUP BY billing_month ) SELECT mpr.billing_month, mpr.patient_id, mpr.total_revenue FROM monthly_patient_revenue mpr JOIN max_month_revenue mmr ON mpr.billing_month = mmr.billing_month AND mpr.total_revenue = mmr.max_revenue ORDER BY mpr.billing_month ASC, mpr.patient_id ASC;",
        explanation:
          "## Approach\n\nCompute monthly patient revenue first, then find the maximum revenue per month and join back.\n\n## Query\n\n```sql\nWITH monthly_patient_revenue AS (\n  SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue\n  FROM invoices\n  GROUP BY DATE_TRUNC('month', created_at), patient_id\n),\nmax_month_revenue AS (\n  SELECT billing_month, MAX(total_revenue) AS max_revenue\n  FROM monthly_patient_revenue\n  GROUP BY billing_month\n)\nSELECT mpr.billing_month, mpr.patient_id, mpr.total_revenue\nFROM monthly_patient_revenue mpr\nJOIN max_month_revenue mmr\n  ON mpr.billing_month = mmr.billing_month\n AND mpr.total_revenue = mmr.max_revenue\nORDER BY mpr.billing_month ASC, mpr.patient_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes patient revenue per month.\n- The second CTE finds the maximum revenue in each month.\n- Joining them returns the top revenue rows.\n\n## Difference from the optimal approach\n\nIt may return multiple patients for a month when there is a tie, while the original expected query returns exactly one.",
      },
    ],
  },
  {
    code: "HOSPITAL_081",
    approaches: [
      {
        approach_title: "Top occupied dept",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH department_bed_usage AS ( SELECT r.department_id, COUNT(*) AS occupied_beds, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, r.department_id ASC) AS rn FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ) SELECT department_id, occupied_beds FROM department_bed_usage WHERE rn = 1;",
        explanation:
          "## Approach\n\nCount occupied beds per department, rank departments by that count, then keep the top one.\n\n## Query\n\n```sql\nWITH department_bed_usage AS (\n  SELECT r.department_id, COUNT(*) AS occupied_beds, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, r.department_id ASC) AS rn\n  FROM beds b\n  JOIN rooms r ON b.room_id = r.id\n  WHERE b.bed_status = 'occupied'\n    AND r.department_id IS NOT NULL\n  GROUP BY r.department_id\n)\nSELECT department_id, occupied_beds\nFROM department_bed_usage\nWHERE rn = 1;\n```\n\n## Explanation\n\n- `beds` is joined to `rooms` to reach the department.\n- Only occupied beds are counted.\n- `GROUP BY r.department_id` creates one row per department.\n- `ROW_NUMBER()` ranks departments by occupied bed count descending.\n- `department_id ASC` breaks ties consistently.\n- `WHERE rn = 1` returns the single leader.\n\n## Why this is optimal\n\nIt guarantees exactly one top department with deterministic tie-breaking.",
      },
      {
        approach_title: "Limit top dept",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT r.department_id, COUNT(*) AS occupied_beds FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ORDER BY occupied_beds DESC, r.department_id ASC LIMIT 1;",
        explanation:
          "## Approach\n\nCount occupied beds per department, sort the result, and keep the first row.\n\n## Query\n\n```sql\nSELECT r.department_id, COUNT(*) AS occupied_beds\nFROM beds b\nJOIN rooms r ON b.room_id = r.id\nWHERE b.bed_status = 'occupied'\n  AND r.department_id IS NOT NULL\nGROUP BY r.department_id\nORDER BY occupied_beds DESC, r.department_id ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- The grouped count per department is the same.\n- `ORDER BY ... LIMIT 1` keeps the department with the largest occupied bed count.\n- The tie-breaker on department id is preserved.\n\n## Difference from the optimal approach\n\nIt works well, but the window version is easier to extend when rankings beyond the top row are needed.",
      },
      {
        approach_title: "CTE max dept",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH department_bed_counts AS ( SELECT r.department_id, COUNT(*) AS occupied_beds FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ), max_beds AS ( SELECT MAX(occupied_beds) AS max_occupied_beds FROM department_bed_counts ) SELECT dbc.department_id, dbc.occupied_beds FROM department_bed_counts dbc JOIN max_beds mb ON dbc.occupied_beds = mb.max_occupied_beds ORDER BY dbc.department_id ASC LIMIT 1;",
        explanation:
          "## Approach\n\nCount occupied beds per department, find the maximum count, then join back to the matching department.\n\n## Query\n\n```sql\nWITH department_bed_counts AS (\n  SELECT r.department_id, COUNT(*) AS occupied_beds\n  FROM beds b\n  JOIN rooms r ON b.room_id = r.id\n  WHERE b.bed_status = 'occupied'\n    AND r.department_id IS NOT NULL\n  GROUP BY r.department_id\n),\nmax_beds AS (\n  SELECT MAX(occupied_beds) AS max_occupied_beds\n  FROM department_bed_counts\n)\nSELECT dbc.department_id, dbc.occupied_beds\nFROM department_bed_counts dbc\nJOIN max_beds mb ON dbc.occupied_beds = mb.max_occupied_beds\nORDER BY dbc.department_id ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- The first CTE computes occupied bed counts.\n- The second CTE finds the largest count.\n- Joining them finds the matching department row.\n- `LIMIT 1` resolves ties after ordering.\n\n## Difference from the optimal approach\n\nMore verbose and indirect for a single top row.",
      },
    ],
  },
  {
    code: "HOSPITAL_082",
    approaches: [
      {
        approach_title: "LAG critical",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH patient_lab_results AS ( SELECT lo.patient_id, lr.resulted_at, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ) SELECT DISTINCT patient_id FROM patient_lab_results WHERE interpretation = 'critical' AND prev_interpretation = 'critical' ORDER BY patient_id ASC;",
        explanation:
          "## Approach\n\nOrder each patient's lab results over time, compare each result to the previous one, and keep patients where two consecutive results are both critical.\n\n## Query\n\n```sql\nWITH patient_lab_results AS (\n  SELECT lo.patient_id, lr.resulted_at, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation\n  FROM lab_results lr\n  JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id\n  JOIN lab_orders lo ON loi.lab_order_id = lo.id\n)\nSELECT DISTINCT patient_id\nFROM patient_lab_results\nWHERE interpretation = 'critical'\n  AND prev_interpretation = 'critical'\nORDER BY patient_id ASC;\n```\n\n## Explanation\n\n- The joins connect each result to its patient.\n- `LAG()` looks at the previous interpretation for the same patient.\n- Ordering by result time and id makes the sequence deterministic.\n- The filter keeps rows where both current and previous interpretations are critical.\n- `DISTINCT` ensures each patient appears once.\n\n## Why this is optimal\n\nIt directly checks consecutive result states in time order, which is exactly what the question asks.",
      },
      {
        approach_title: "Row pair self join",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ordered_results AS ( SELECT lo.patient_id, lr.id, lr.resulted_at, lr.interpretation, ROW_NUMBER() OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS rn FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ) SELECT DISTINCT r1.patient_id FROM ordered_results r1 JOIN ordered_results r2 ON r1.patient_id = r2.patient_id AND r2.rn = r1.rn + 1 WHERE r1.interpretation = 'critical' AND r2.interpretation = 'critical' ORDER BY r1.patient_id ASC;",
        explanation:
          "## Approach\n\nAssign sequence numbers to each patient’s results, then self join adjacent rows.\n\n## Query\n\n```sql\nWITH ordered_results AS (\n  SELECT lo.patient_id, lr.id, lr.resulted_at, lr.interpretation, ROW_NUMBER() OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS rn\n  FROM lab_results lr\n  JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id\n  JOIN lab_orders lo ON loi.lab_order_id = lo.id\n)\nSELECT DISTINCT r1.patient_id\nFROM ordered_results r1\nJOIN ordered_results r2\n  ON r1.patient_id = r2.patient_id\n AND r2.rn = r1.rn + 1\nWHERE r1.interpretation = 'critical'\n  AND r2.interpretation = 'critical'\nORDER BY r1.patient_id ASC;\n```\n\n## Explanation\n\n- The CTE numbers results in patient order.\n- The self join pairs each row with the next row.\n- The filter keeps adjacent critical-critical pairs.\n\n## Difference from the optimal approach\n\nIt works, but `LAG()` expresses previous-row comparison more directly.",
      },
      {
        approach_title: "CTE previous flag",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH patient_lab_results AS ( SELECT lo.patient_id, lr.resulted_at, lr.id, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ), critical_pairs AS ( SELECT patient_id FROM patient_lab_results WHERE interpretation = 'critical' AND prev_interpretation = 'critical' ) SELECT DISTINCT patient_id FROM critical_pairs ORDER BY patient_id ASC;",
        explanation:
          "## Approach\n\nUse one CTE to compute the previous interpretation and another to isolate critical pairs.\n\n## Query\n\n```sql\nWITH patient_lab_results AS (\n  SELECT lo.patient_id, lr.resulted_at, lr.id, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation\n  FROM lab_results lr\n  JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id\n  JOIN lab_orders lo ON loi.lab_order_id = lo.id\n),\ncritical_pairs AS (\n  SELECT patient_id\n  FROM patient_lab_results\n  WHERE interpretation = 'critical'\n    AND prev_interpretation = 'critical'\n)\nSELECT DISTINCT patient_id\nFROM critical_pairs\nORDER BY patient_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes the previous result state.\n- The second CTE isolates matching rows.\n- The final query deduplicates patients.\n\n## Difference from the optimal approach\n\nSame logic, but split into extra steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_083",
    approaches: [
      {
        approach_title: "Rank dept revenue",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute revenue per doctor within each department, then rank doctors inside each department by that revenue.\n\n## Query\n\n```sql\nWITH doctor_department_revenue AS (\n  SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue\n  FROM encounters e\n  JOIN invoices i ON i.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n    AND e.attending_doctor_id IS NOT NULL\n  GROUP BY e.department_id, e.attending_doctor_id\n)\nSELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank\nFROM doctor_department_revenue\nORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE computes doctor-level revenue within each department.\n- `DENSE_RANK()` ranks doctors separately inside each department.\n- Revenue is ranked descending, and doctor id breaks ties consistently.\n- The final order matches the expected output.\n\n## Why this is optimal\n\nIt cleanly separates aggregation from ranking and directly expresses the per-department ranking requirement.",
      },
      {
        approach_title: "Rank with rownum",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;",
        explanation:
          "## Approach\n\nUse `ROW_NUMBER()` instead of `DENSE_RANK()` after computing doctor revenue per department.\n\n## Query\n\n```sql\nWITH doctor_department_revenue AS (\n  SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue\n  FROM encounters e\n  JOIN invoices i ON i.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n    AND e.attending_doctor_id IS NOT NULL\n  GROUP BY e.department_id, e.attending_doctor_id\n)\nSELECT department_id, doctor_id, total_revenue, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank\nFROM doctor_department_revenue\nORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;\n```\n\n## Explanation\n\n- The aggregation step is the same.\n- `ROW_NUMBER()` forces unique ranks even when revenues tie.\n- The final ordering remains the same.\n\n## Difference from the optimal approach\n\nIt changes rank behavior on ties, while the expected query uses `DENSE_RANK()`.",
      },
      {
        approach_title: "CTE max join rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;",
        explanation:
          "## Approach\n\nAggregate first in a CTE and apply ranking outside.\n\n## Query\n\n```sql\nWITH doctor_department_revenue AS (\n  SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue\n  FROM encounters e\n  JOIN invoices i ON i.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n    AND e.attending_doctor_id IS NOT NULL\n  GROUP BY e.department_id, e.attending_doctor_id\n)\nSELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank\nFROM doctor_department_revenue\nORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;\n```\n\n## Explanation\n\n- The CTE produces one revenue row per doctor within a department.\n- The outer query applies the window rank.\n- The result matches the expected output exactly.\n\n## Difference from the optimal approach\n\nThis is logically the same as the optimal query, just framed as a general aggregate-then-rank pattern.",
      },
    ],
  },
  {
    code: "HOSPITAL_084",
    approaches: [
      {
        approach_title: "Top wait per doc",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH doctor_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC) AS rn FROM appointments WHERE consultation_started_at IS NOT NULL ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM doctor_waits WHERE rn = 1 ORDER BY doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute wait time for each started appointment, rank appointments within each doctor by longest wait, then keep the top row.\n\n## Query\n\n```sql\nWITH doctor_waits AS (\n  SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at,\n         ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins,\n         ROW_NUMBER() OVER (\n           PARTITION BY doctor_id\n           ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC\n         ) AS rn\n  FROM appointments\n  WHERE consultation_started_at IS NOT NULL\n)\nSELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins\nFROM doctor_waits\nWHERE rn = 1\nORDER BY doctor_id ASC;\n```\n\n## Explanation\n\n- Wait time is measured from scheduled start to actual consultation start.\n- `ROW_NUMBER()` ranks appointments within each doctor by longest wait first.\n- `id ASC` breaks ties consistently.\n- `WHERE rn = 1` guarantees exactly one row per doctor.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt returns exactly one longest-wait appointment per doctor with deterministic tie-breaking.",
      },
      {
        approach_title: "Dense rank wait",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins, DENSE_RANK() OVER (PARTITION BY doctor_id ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC) AS rk FROM appointments WHERE consultation_started_at IS NOT NULL ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM doctor_waits WHERE rk = 1 ORDER BY doctor_id ASC, id ASC;",
        explanation:
          "## Approach\n\nRank waits within each doctor using `DENSE_RANK()` and keep the top-ranked row.\n\n## Query\n\n```sql\nWITH doctor_waits AS (\n  SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at,\n         ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins,\n         DENSE_RANK() OVER (\n           PARTITION BY doctor_id\n           ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC\n         ) AS rk\n  FROM appointments\n  WHERE consultation_started_at IS NOT NULL\n)\nSELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins\nFROM doctor_waits\nWHERE rk = 1\nORDER BY doctor_id ASC, id ASC;\n```\n\n## Explanation\n\n- The wait calculation is the same as the optimal approach.\n- `DENSE_RANK()` assigns the top rank within each doctor partition.\n- Because `id` is included in the ordering, the ranking stays deterministic here.\n- The final result matches the expected output.\n\n## Difference from the optimal approach\n\nIt also works, but `ROW_NUMBER()` is the clearer choice when exactly one row per doctor is intended.",
      },
      {
        approach_title: "Two-step row num",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH appointment_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL ), ranked_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY wait_time_mins DESC, id ASC) AS rn FROM appointment_waits ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM ranked_waits WHERE rn = 1 ORDER BY doctor_id ASC;",
        explanation:
          "## Approach\n\nFirst compute wait times in one CTE, then rank those rows in a second CTE.\n\n## Query\n\n```sql\nWITH appointment_waits AS (\n  SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at,\n         ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins\n  FROM appointments\n  WHERE consultation_started_at IS NOT NULL\n),\nranked_waits AS (\n  SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins,\n         ROW_NUMBER() OVER (\n           PARTITION BY doctor_id\n           ORDER BY wait_time_mins DESC, id ASC\n         ) AS rn\n  FROM appointment_waits\n)\nSELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins\nFROM ranked_waits\nWHERE rn = 1\nORDER BY doctor_id ASC;\n```\n\n## Explanation\n\n- The first CTE calculates one wait-time value per appointment.\n- The second CTE ranks those waits within each doctor.\n- `ROW_NUMBER()` ensures exactly one final row per doctor.\n- This avoids the duplicate-row problem from joining on `MAX(wait_time_mins)` when multiple appointments share the same wait.\n\n## Difference from the optimal approach\n\nIt produces the same result, but splits the logic into more steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_085",
    approaches: [
      {
        approach_title: "Join underpay",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ORDER BY i.insurance_covered_amount DESC, ic.approved_amount ASC, ic.id ASC;",
        explanation:
          "## Approach\n\nJoin claims to invoices, compare approved amount with the invoice’s insurance-covered amount, and keep underpayment cases.\n\n## Query\n\n```sql\nSELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount\nFROM insurance_claims ic\nJOIN invoices i\n  ON ic.invoice_id = i.id\nWHERE ic.approved_amount < i.insurance_covered_amount\nORDER BY i.insurance_covered_amount DESC, ic.approved_amount ASC, ic.id ASC;\n```\n\n## Explanation\n\n- The join links each claim to its invoice.\n- `ic.approved_amount < i.insurance_covered_amount` keeps only underpayment cases.\n- `insurance_covered_amount DESC` brings larger covered amounts first.\n- `approved_amount ASC` then puts lower approved amounts earlier.\n- `id ASC` breaks remaining ties consistently.\n\n## Why this is optimal\n\nIt directly applies the underpayment condition and matches the validator’s required ordering exactly.",
      },
      {
        approach_title: "CTE underpay",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH claim_shortfalls AS ( SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ) SELECT id, claim_number, invoice_id, insurance_covered_amount, approved_amount FROM claim_shortfalls ORDER BY insurance_covered_amount DESC, approved_amount ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter the underpayment rows in a CTE first, then sort them outside.\n\n## Query\n\n```sql\nWITH claim_shortfalls AS (\n  SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount\n  FROM insurance_claims ic\n  JOIN invoices i\n    ON ic.invoice_id = i.id\n  WHERE ic.approved_amount < i.insurance_covered_amount\n)\nSELECT id, claim_number, invoice_id, insurance_covered_amount, approved_amount\nFROM claim_shortfalls\nORDER BY insurance_covered_amount DESC, approved_amount ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates only the rows that satisfy the underpayment condition.\n- The outer query applies the required sort order.\n- This is useful if you want to extend the underpayment logic later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but is more verbose.",
      },
      {
        approach_title: "Subquery underpay",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, claim_number, invoice_id, insurance_covered_amount, approved_amount FROM ( SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ) x ORDER BY insurance_covered_amount DESC, approved_amount ASC, id ASC;",
        explanation:
          "## Approach\n\nBuild the underpayment result in a derived table, then sort it outside.\n\n## Query\n\n```sql\nSELECT id, claim_number, invoice_id, insurance_covered_amount, approved_amount\nFROM (\n  SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount\n  FROM insurance_claims ic\n  JOIN invoices i\n    ON ic.invoice_id = i.id\n  WHERE ic.approved_amount < i.insurance_covered_amount\n) x\nORDER BY insurance_covered_amount DESC, approved_amount ASC, id ASC;\n```\n\n## Explanation\n\n- The inner query produces the underpayment rows.\n- The outer query applies the expected order.\n- The final result matches the validator.\n\n## Difference from the optimal approach\n\nIt works the same, but adds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_086",
    approaches: [
      {
        approach_title: "LAG encounter gap",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH ordered_encounters AS ( SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at FROM encounters ) SELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days FROM ordered_encounters WHERE previous_encounter_at IS NOT NULL ORDER BY patient_id ASC, started_at ASC;",
        explanation:
          "## Approach\n\nOrder encounters per patient, use `LAG()` to get the previous encounter time, then calculate the day gap.\n\n## Query\n\n```sql\nWITH ordered_encounters AS (\n  SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at\n  FROM encounters\n)\nSELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days\nFROM ordered_encounters\nWHERE previous_encounter_at IS NOT NULL\nORDER BY patient_id ASC, started_at ASC;\n```\n\n## Explanation\n\n- `LAG()` returns the previous encounter start time for the same patient.\n- Subtracting that from the current `started_at` gives the gap.\n- `EXTRACT(EPOCH FROM ...) / 86400` converts the gap to days.\n- The first encounter per patient is excluded because it has no previous row.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly measures the gap between consecutive encounters in time order.",
      },
      {
        approach_title: "Self join gap",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT e2.patient_id, e2.id AS encounter_id, MAX(e1.started_at) AS previous_encounter_at, e2.started_at, ROUND(EXTRACT(EPOCH FROM (e2.started_at - MAX(e1.started_at))) / 86400, 2) AS gap_days FROM encounters e2 JOIN encounters e1 ON e1.patient_id = e2.patient_id AND (e1.started_at < e2.started_at OR (e1.started_at = e2.started_at AND e1.id < e2.id)) GROUP BY e2.patient_id, e2.id, e2.started_at ORDER BY e2.patient_id ASC, e2.started_at ASC;",
        explanation:
          "## Approach\n\nSelf join encounters to earlier encounters for the same patient, then keep the latest earlier one.\n\n## Query\n\n```sql\nSELECT e2.patient_id, e2.id AS encounter_id, MAX(e1.started_at) AS previous_encounter_at, e2.started_at, ROUND(EXTRACT(EPOCH FROM (e2.started_at - MAX(e1.started_at))) / 86400, 2) AS gap_days\nFROM encounters e2\nJOIN encounters e1\n  ON e1.patient_id = e2.patient_id\n AND (e1.started_at < e2.started_at OR (e1.started_at = e2.started_at AND e1.id < e2.id))\nGROUP BY e2.patient_id, e2.id, e2.started_at\nORDER BY e2.patient_id ASC, e2.started_at ASC;\n```\n\n## Explanation\n\n- The self join pairs each encounter with earlier encounters from the same patient.\n- `MAX(e1.started_at)` picks the latest earlier encounter.\n- The gap is then computed in days.\n\n## Difference from the optimal approach\n\nIt works, but is more complex and less readable than `LAG()`.",
      },
      {
        approach_title: "CTE gap calc",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH ordered_encounters AS ( SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at FROM encounters ), encounter_gaps AS ( SELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days FROM ordered_encounters WHERE previous_encounter_at IS NOT NULL ) SELECT patient_id, encounter_id, previous_encounter_at, started_at, gap_days FROM encounter_gaps ORDER BY patient_id ASC, started_at ASC;",
        explanation:
          "## Approach\n\nUse one CTE to find the previous encounter and another to calculate the gap.\n\n## Query\n\n```sql\nWITH ordered_encounters AS (\n  SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at\n  FROM encounters\n),\nencounter_gaps AS (\n  SELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days\n  FROM ordered_encounters\n  WHERE previous_encounter_at IS NOT NULL\n)\nSELECT patient_id, encounter_id, previous_encounter_at, started_at, gap_days\nFROM encounter_gaps\nORDER BY patient_id ASC, started_at ASC;\n```\n\n## Explanation\n\n- The first CTE computes the previous encounter timestamp.\n- The second CTE calculates the gap in days.\n- The final query returns the expected columns in order.\n\n## Difference from the optimal approach\n\nSame logic, but split into more steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_087",
    approaches: [
      {
        approach_title: "Top med per doc",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH doctor_medication_counts AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count, ROW_NUMBER() OVER (PARTITION BY p.doctor_id ORDER BY COUNT(*) DESC, pi.medication_id ASC) AS rn FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ) SELECT doctor_id, medication_id, prescription_count FROM doctor_medication_counts WHERE rn = 1 ORDER BY doctor_id ASC;",
        explanation:
          "## Approach\n\nCount how often each doctor prescribed each medication, rank medications within each doctor, then keep the top one.\n\n## Query\n\n```sql\nWITH doctor_medication_counts AS (\n  SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY p.doctor_id\n           ORDER BY COUNT(*) DESC, pi.medication_id ASC\n         ) AS rn\n  FROM prescriptions p\n  JOIN prescription_items pi ON p.id = pi.prescription_id\n  WHERE p.doctor_id IS NOT NULL\n  GROUP BY p.doctor_id, pi.medication_id\n)\nSELECT doctor_id, medication_id, prescription_count\nFROM doctor_medication_counts\nWHERE rn = 1\nORDER BY doctor_id ASC;\n```\n\n## Explanation\n\n- The join links each prescription to its medication items.\n- `COUNT(*)` computes medication frequency per doctor.\n- `ROW_NUMBER()` ranks medications within each doctor.\n- `medication_id ASC` breaks ties consistently.\n- `WHERE rn = 1` keeps exactly one most-prescribed medication per doctor.\n\n## Why this is optimal\n\nIt returns one deterministic top medication per doctor and avoids duplicate rows from tied counts.",
      },
      {
        approach_title: "Dense rank med",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_medication_counts AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count, DENSE_RANK() OVER (PARTITION BY p.doctor_id ORDER BY COUNT(*) DESC, pi.medication_id ASC) AS rk FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ) SELECT doctor_id, medication_id, prescription_count FROM doctor_medication_counts WHERE rk = 1 ORDER BY doctor_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` after counting medication frequency per doctor.\n\n## Query\n\n```sql\nWITH doctor_medication_counts AS (\n  SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count,\n         DENSE_RANK() OVER (\n           PARTITION BY p.doctor_id\n           ORDER BY COUNT(*) DESC, pi.medication_id ASC\n         ) AS rk\n  FROM prescriptions p\n  JOIN prescription_items pi ON p.id = pi.prescription_id\n  WHERE p.doctor_id IS NOT NULL\n  GROUP BY p.doctor_id, pi.medication_id\n)\nSELECT doctor_id, medication_id, prescription_count\nFROM doctor_medication_counts\nWHERE rk = 1\nORDER BY doctor_id ASC;\n```\n\n## Explanation\n\n- The medication counts are computed the same way.\n- `DENSE_RANK()` ranks medications within each doctor.\n- Because `medication_id` is included in the ordering, the top row is deterministic here.\n- The output matches the expected result.\n\n## Difference from the optimal approach\n\nIt also passes, but `ROW_NUMBER()` is clearer when exactly one row per doctor is intended.",
      },
      {
        approach_title: "Two-step row num",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH medication_totals AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ), ranked_medications AS ( SELECT doctor_id, medication_id, prescription_count, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY prescription_count DESC, medication_id ASC) AS rn FROM medication_totals ) SELECT doctor_id, medication_id, prescription_count FROM ranked_medications WHERE rn = 1 ORDER BY doctor_id ASC;",
        explanation:
          "## Approach\n\nFirst compute medication counts per doctor, then rank those aggregated rows in a second CTE.\n\n## Query\n\n```sql\nWITH medication_totals AS (\n  SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count\n  FROM prescriptions p\n  JOIN prescription_items pi ON p.id = pi.prescription_id\n  WHERE p.doctor_id IS NOT NULL\n  GROUP BY p.doctor_id, pi.medication_id\n),\nranked_medications AS (\n  SELECT doctor_id, medication_id, prescription_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY doctor_id\n           ORDER BY prescription_count DESC, medication_id ASC\n         ) AS rn\n  FROM medication_totals\n)\nSELECT doctor_id, medication_id, prescription_count\nFROM ranked_medications\nWHERE rn = 1\nORDER BY doctor_id ASC;\n```\n\n## Explanation\n\n- The first CTE creates one count row per doctor-medication pair.\n- The second CTE ranks medications within each doctor.\n- `ROW_NUMBER()` guarantees only one final medication per doctor.\n- This avoids the duplicate-row problem caused by joining back on `MAX(prescription_count)` when multiple medications tie.\n\n## Difference from the optimal approach\n\nIt produces the same result, but splits aggregation and ranking into separate steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_088",
    approaches: [
      {
        approach_title: "Outside coverage",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id WHERE DATE(i.created_at) < ip.coverage_start_date OR (ip.coverage_end_date IS NOT NULL AND DATE(i.created_at) > ip.coverage_end_date) ORDER BY i.created_at ASC, i.id ASC;",
        explanation:
          "## Approach\n\nJoin invoices to policies and keep invoices whose billing date falls outside the policy coverage window.\n\n## Query\n\n```sql\nSELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date\nFROM invoices i\nJOIN insurance_policies ip ON i.insurance_policy_id = ip.id\nWHERE DATE(i.created_at) < ip.coverage_start_date\n   OR (ip.coverage_end_date IS NOT NULL AND DATE(i.created_at) > ip.coverage_end_date)\nORDER BY i.created_at ASC, i.id ASC;\n```\n\n## Explanation\n\n- The join links each invoice to the referenced policy.\n- `DATE(i.created_at)` is compared to the policy start and end dates.\n- Rows are kept if the invoice was created before coverage started or after it ended.\n- The result is ordered chronologically.\n\n## Why this is optimal\n\nIt directly expresses the out-of-coverage rule using the linked policy dates.",
      },
      {
        approach_title: "NOT between dates",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id WHERE NOT (DATE(i.created_at) >= ip.coverage_start_date AND (ip.coverage_end_date IS NULL OR DATE(i.created_at) <= ip.coverage_end_date)) ORDER BY i.created_at ASC, i.id ASC;",
        explanation:
          "## Approach\n\nDescribe the valid coverage condition, then negate it.\n\n## Query\n\n```sql\nSELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date\nFROM invoices i\nJOIN insurance_policies ip ON i.insurance_policy_id = ip.id\nWHERE NOT (\n  DATE(i.created_at) >= ip.coverage_start_date\n  AND (ip.coverage_end_date IS NULL OR DATE(i.created_at) <= ip.coverage_end_date)\n)\nORDER BY i.created_at ASC, i.id ASC;\n```\n\n## Explanation\n\n- The inner condition describes invoices inside the coverage window.\n- `NOT (...)` keeps invoices outside that valid range.\n- The output columns and sorting remain the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the before/after checks are more direct and easier to read.",
      },
      {
        approach_title: "CTE invalid policy",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH invoice_policy_dates AS ( SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id ) SELECT id, invoice_number, patient_id, insurance_policy_id, created_at, coverage_start_date, coverage_end_date FROM invoice_policy_dates WHERE DATE(created_at) < coverage_start_date OR (coverage_end_date IS NOT NULL AND DATE(created_at) > coverage_end_date) ORDER BY created_at ASC, id ASC;",
        explanation:
          "## Approach\n\nBring invoice and policy dates together in a CTE, then filter to invalid coverage cases.\n\n## Query\n\n```sql\nWITH invoice_policy_dates AS (\n  SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date\n  FROM invoices i\n  JOIN insurance_policies ip ON i.insurance_policy_id = ip.id\n)\nSELECT id, invoice_number, patient_id, insurance_policy_id, created_at, coverage_start_date, coverage_end_date\nFROM invoice_policy_dates\nWHERE DATE(created_at) < coverage_start_date\n   OR (coverage_end_date IS NOT NULL AND DATE(created_at) > coverage_end_date)\nORDER BY created_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE collects all invoice and policy date fields in one place.\n- The outer query applies the out-of-range filter.\n- This is useful if more policy-date validation checks are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_089",
    approaches: [
      {
        approach_title: "Lead readmit rate",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ) SELECT department_id, ROUND(100.0 * SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) / COUNT(*), 2) AS readmission_rate_pct FROM readmission_flags GROUP BY department_id ORDER BY readmission_rate_pct DESC, department_id ASC;",
        explanation:
          "## Approach\n\nFor each discharged admission, find the patient’s next admission and calculate what percentage were followed by a readmission within 30 days, grouped by department.\n\n## Query\n\n```sql\nWITH readmission_flags AS (\n  SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at\n  FROM admissions\n  WHERE discharge_at IS NOT NULL\n    AND department_id IS NOT NULL\n)\nSELECT department_id, ROUND(100.0 * SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) / COUNT(*), 2) AS readmission_rate_pct\nFROM readmission_flags\nGROUP BY department_id\nORDER BY readmission_rate_pct DESC, department_id ASC;\n```\n\n## Explanation\n\n- `LEAD(admitted_at)` finds the next admission for the same patient.\n- Each row represents one discharged admission tied to a department.\n- The `CASE` expression flags readmissions within 30 days.\n- `COUNT(*)` gives total discharged admissions in that department set.\n- The ratio is converted to a percentage and rounded.\n\n## Why this is optimal\n\nIt directly measures 30-day readmission rate using sequential patient admissions.",
      },
      {
        approach_title: "FILTER readmit rate",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ) SELECT department_id, ROUND(100.0 * COUNT(*) FILTER (WHERE next_admission_at <= discharge_at + INTERVAL '30 days') / COUNT(*), 2) AS readmission_rate_pct FROM readmission_flags GROUP BY department_id ORDER BY readmission_rate_pct DESC, department_id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` to count only rows with a 30-day readmission.\n\n## Query\n\n```sql\nWITH readmission_flags AS (\n  SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at\n  FROM admissions\n  WHERE discharge_at IS NOT NULL\n    AND department_id IS NOT NULL\n)\nSELECT department_id, ROUND(100.0 * COUNT(*) FILTER (WHERE next_admission_at <= discharge_at + INTERVAL '30 days') / COUNT(*), 2) AS readmission_rate_pct\nFROM readmission_flags\nGROUP BY department_id\nORDER BY readmission_rate_pct DESC, department_id ASC;\n```\n\n## Explanation\n\n- The CTE computes the next admission date.\n- `FILTER` counts only rows that satisfy the 30-day condition.\n- The denominator remains total discharged admissions in the department.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` form is often more familiar to learners.",
      },
      {
        approach_title: "CTE flagged rate",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ), department_readmits AS ( SELECT department_id, SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) AS readmit_count, COUNT(*) AS total_cases FROM readmission_flags GROUP BY department_id ) SELECT department_id, ROUND(100.0 * readmit_count / total_cases, 2) AS readmission_rate_pct FROM department_readmits ORDER BY readmission_rate_pct DESC, department_id ASC;",
        explanation:
          "## Approach\n\nCompute readmission flags first, then aggregate department totals and calculate the rate outside.\n\n## Query\n\n```sql\nWITH readmission_flags AS (\n  SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at\n  FROM admissions\n  WHERE discharge_at IS NOT NULL\n    AND department_id IS NOT NULL\n),\ndepartment_readmits AS (\n  SELECT department_id, SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) AS readmit_count, COUNT(*) AS total_cases\n  FROM readmission_flags\n  GROUP BY department_id\n)\nSELECT department_id, ROUND(100.0 * readmit_count / total_cases, 2) AS readmission_rate_pct\nFROM department_readmits\nORDER BY readmission_rate_pct DESC, department_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes the next admission date.\n- The second CTE aggregates readmission counts and total cases per department.\n- The final query turns those counts into a percentage.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when intermediate counts also matter.",
      },
    ],
  },
  {
    code: "HOSPITAL_090",
    approaches: [
      {
        approach_title: "Lag growth",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ), revenue_with_prev AS ( SELECT department_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ) SELECT department_id, revenue_month, total_revenue, prev_month_revenue, ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth FROM revenue_with_prev WHERE prev_month_revenue IS NOT NULL ORDER BY department_id ASC, revenue_month ASC;",
        explanation:
          "## Approach\n\nAggregate monthly revenue per department, use `LAG()` to fetch the previous available month’s revenue, then subtract to get growth.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, DATE_TRUNC('month', i.created_at)\n),\nrevenue_with_prev AS (\n  SELECT department_id, revenue_month, total_revenue,\n         LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue\n  FROM monthly_revenue\n)\nSELECT department_id, revenue_month, total_revenue, prev_month_revenue,\n       ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth\nFROM revenue_with_prev\nWHERE prev_month_revenue IS NOT NULL\nORDER BY department_id ASC, revenue_month ASC;\n```\n\n## Explanation\n\n- The first CTE computes monthly invoice revenue per department.\n- `LAG(total_revenue)` gets the previous available revenue row for the same department.\n- The final query subtracts previous revenue from current revenue.\n- Rows without a previous revenue row are excluded.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt matches the expected logic even when a department has missing calendar months.",
      },
      {
        approach_title: "CTE growth",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ), revenue_with_prev AS ( SELECT department_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ), growth_calc AS ( SELECT department_id, revenue_month, total_revenue, prev_month_revenue, ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth FROM revenue_with_prev WHERE prev_month_revenue IS NOT NULL ) SELECT department_id, revenue_month, total_revenue, prev_month_revenue, revenue_growth FROM growth_calc ORDER BY department_id ASC, revenue_month ASC;",
        explanation:
          "## Approach\n\nBreak the calculation into revenue aggregation, previous-row lookup, and final growth calculation.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, DATE_TRUNC('month', i.created_at)\n),\nrevenue_with_prev AS (\n  SELECT department_id, revenue_month, total_revenue,\n         LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue\n  FROM monthly_revenue\n),\ngrowth_calc AS (\n  SELECT department_id, revenue_month, total_revenue, prev_month_revenue,\n         ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth\n  FROM revenue_with_prev\n  WHERE prev_month_revenue IS NOT NULL\n)\nSELECT department_id, revenue_month, total_revenue, prev_month_revenue, revenue_growth\nFROM growth_calc\nORDER BY department_id ASC, revenue_month ASC;\n```\n\n## Explanation\n\n- The first CTE aggregates revenue by department and month.\n- The second CTE gets the previous available monthly revenue using `LAG()`.\n- The third CTE calculates growth and removes first-month rows.\n- The final query returns the expected result.\n\n## Difference from the optimal approach\n\nIt returns the same result, but splits the logic into more steps.",
      },
      {
        approach_title: "Row num self join",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY DATE_TRUNC('month', i.created_at)) AS rn FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ) SELECT cur.department_id, cur.revenue_month, cur.total_revenue, prev.total_revenue AS prev_month_revenue, ROUND(cur.total_revenue - prev.total_revenue, 2) AS revenue_growth FROM monthly_revenue cur JOIN monthly_revenue prev ON cur.department_id = prev.department_id AND cur.rn = prev.rn + 1 ORDER BY cur.department_id ASC, cur.revenue_month ASC;",
        explanation:
          "## Approach\n\nAssign row numbers to each department’s available monthly revenue rows, then self join each row to the previous available row.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month,\n         SUM(i.total_amount) AS total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY e.department_id\n           ORDER BY DATE_TRUNC('month', i.created_at)\n         ) AS rn\n  FROM invoices i\n  JOIN encounters e ON i.encounter_id = e.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, DATE_TRUNC('month', i.created_at)\n)\nSELECT cur.department_id, cur.revenue_month, cur.total_revenue,\n       prev.total_revenue AS prev_month_revenue,\n       ROUND(cur.total_revenue - prev.total_revenue, 2) AS revenue_growth\nFROM monthly_revenue cur\nJOIN monthly_revenue prev\n  ON cur.department_id = prev.department_id\n AND cur.rn = prev.rn + 1\nORDER BY cur.department_id ASC, cur.revenue_month ASC;\n```\n\n## Explanation\n\n- The CTE computes monthly revenue and assigns a sequence number per department.\n- The self join links each revenue row to the previous available row, not only the previous calendar month.\n- This avoids missing rows when a department skips a month.\n\n## Difference from the optimal approach\n\nIt works, but `LAG()` is simpler for previous-row comparisons.",
      },
    ],
  },
  {
    code: "HOSPITAL_091",
    approaches: [
      {
        approach_title: "CTE overbook",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH schedule_capacity AS ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ), completed_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ) SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count FROM schedule_capacity sc LEFT JOIN completed_appointments ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week WHERE COALESCE(ca.completed_count, 0) > sc.total_capacity ORDER BY completed_count DESC, sc.doctor_id ASC, sc.day_of_week ASC;",
        explanation:
          "## Approach\n\nCompute capacity and completed appointments by doctor and weekday, then keep overbooked cases.\n\n## Query\n\n```sql\nWITH schedule_capacity AS (\n  SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity\n  FROM doctor_schedules\n  WHERE is_active = true\n  GROUP BY doctor_id, day_of_week\n),\ncompleted_appointments AS (\n  SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count\n  FROM appointments\n  WHERE appointment_status = 'completed'\n  GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at)\n)\nSELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count\nFROM schedule_capacity sc\nLEFT JOIN completed_appointments ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week\nWHERE COALESCE(ca.completed_count, 0) > sc.total_capacity\nORDER BY completed_count DESC, sc.doctor_id ASC, sc.day_of_week ASC;\n```\n\n## Explanation\n\n- `schedule_capacity` calculates scheduled capacity per doctor and weekday.\n- `completed_appointments` counts completed appointments per doctor and weekday.\n- The final query keeps only rows where completed appointments exceed capacity.\n- The ordering matches the validator exactly.",
      },
      {
        approach_title: "Subquery overbook",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count FROM ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ) sc LEFT JOIN ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ) ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week WHERE COALESCE(ca.completed_count, 0) > sc.total_capacity ORDER BY completed_count DESC, sc.doctor_id ASC, sc.day_of_week ASC;",
        explanation:
          "## Approach\n\nUse derived tables for capacity and completed appointment counts, then compare them.\n\n## Difference\n\nSame result as the CTE approach, but less readable.",
      },
      {
        approach_title: "CTE gap column",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH schedule_capacity AS ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ), completed_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ), overbooked AS ( SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count, COALESCE(ca.completed_count, 0) - sc.total_capacity AS overbook_gap FROM schedule_capacity sc LEFT JOIN completed_appointments ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week ) SELECT doctor_id, day_of_week, total_capacity, completed_count FROM overbooked WHERE overbook_gap > 0 ORDER BY completed_count DESC, doctor_id ASC, day_of_week ASC;",
        explanation:
          "## Approach\n\nCalculate the overbook gap in a CTE, but sort by the required output ordering.\n\n## Difference\n\nUseful if you want to reuse `overbook_gap`, while still matching the validator order.",
      },
    ],
  },
  {
    code: "HOSPITAL_092",
    approaches: [
      {
        approach_title: "Distinct interp",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low') GROUP BY lo.patient_id HAVING COUNT(DISTINCT lr.interpretation) = 2 ORDER BY lo.patient_id ASC;",
        explanation:
          "## Approach\n\nJoin patients to lab results, keep only `high` and `low` interpretations, then keep patients who have both.\n\n## Query\n\n```sql\nSELECT lo.patient_id\nFROM lab_orders lo\nJOIN lab_order_items loi ON lo.id = loi.lab_order_id\nJOIN lab_results lr ON loi.id = lr.lab_order_item_id\nWHERE lr.interpretation IN ('high', 'low')\nGROUP BY lo.patient_id\nHAVING COUNT(DISTINCT lr.interpretation) = 2\nORDER BY lo.patient_id ASC;\n```\n\n## Explanation\n\n- The joins connect each lab result to a patient.\n- The `WHERE` clause limits rows to `high` and `low` results.\n- `COUNT(DISTINCT lr.interpretation) = 2` means both values are present for that patient.\n- The final sort matches the expected output.\n\n## Why this is optimal\n\nIt directly tests whether both required result types exist for the same patient.",
      },
      {
        approach_title: "CTE interp set",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH patient_interpretations AS ( SELECT lo.patient_id, lr.interpretation FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low') GROUP BY lo.patient_id, lr.interpretation ) SELECT patient_id FROM patient_interpretations GROUP BY patient_id HAVING COUNT(*) = 2 ORDER BY patient_id ASC;",
        explanation:
          "## Approach\n\nFirst reduce each patient to unique `high` and `low` interpretations, then keep patients who have both rows.\n\n## Query\n\n```sql\nWITH patient_interpretations AS (\n  SELECT lo.patient_id, lr.interpretation\n  FROM lab_orders lo\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_results lr ON loi.id = lr.lab_order_item_id\n  WHERE lr.interpretation IN ('high', 'low')\n  GROUP BY lo.patient_id, lr.interpretation\n)\nSELECT patient_id\nFROM patient_interpretations\nGROUP BY patient_id\nHAVING COUNT(*) = 2\nORDER BY patient_id ASC;\n```\n\n## Explanation\n\n- The CTE removes duplicate interpretation rows per patient.\n- The outer query keeps patients with exactly two kept interpretations.\n- Since only `high` and `low` are allowed into the CTE, `COUNT(*) = 2` means both exist.\n\n## Difference from the optimal approach\n\nMore verbose, but makes the set-building step explicit.",
      },
      {
        approach_title: "Self join result types",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT DISTINCT h.patient_id FROM ( SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation = 'high' ) h JOIN ( SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation = 'low' ) l ON h.patient_id = l.patient_id ORDER BY h.patient_id ASC;",
        explanation:
          "## Approach\n\nBuild one patient set for `high` results and another for `low` results, then intersect them.\n\n## Query\n\n```sql\nSELECT DISTINCT h.patient_id\nFROM (\n  SELECT lo.patient_id\n  FROM lab_orders lo\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_results lr ON loi.id = lr.lab_order_item_id\n  WHERE lr.interpretation = 'high'\n) h\nJOIN (\n  SELECT lo.patient_id\n  FROM lab_orders lo\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_results lr ON loi.id = lr.lab_order_item_id\n  WHERE lr.interpretation = 'low'\n) l ON h.patient_id = l.patient_id\nORDER BY h.patient_id ASC;\n```\n\n## Explanation\n\n- The first subquery finds patients with a high result.\n- The second subquery finds patients with a low result.\n- Joining them keeps patients found in both sets.\n\n## Difference from the optimal approach\n\nIt works, but duplicates the same join path twice.",
      },
    ],
  },
  {
    code: "HOSPITAL_093",
    approaches: [
      {
        approach_title: "Count transfers",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT admission_id, COUNT(*) AS allocation_count FROM bed_allocations GROUP BY admission_id HAVING COUNT(*) > 1 ORDER BY allocation_count DESC, admission_id ASC;",
        explanation:
          "## Approach\n\nGroup bed allocations by admission, count them, and keep admissions with more than one allocation.\n\n## Query\n\n```sql\nSELECT admission_id, COUNT(*) AS allocation_count\nFROM bed_allocations\nGROUP BY admission_id\nHAVING COUNT(*) > 1\nORDER BY allocation_count DESC, admission_id ASC;\n```\n\n## Explanation\n\n- Each row in `bed_allocations` is one allocation event for an admission.\n- `GROUP BY admission_id` creates one row per admission.\n- `COUNT(*)` gives the number of bed allocation changes.\n- `HAVING COUNT(*) > 1` keeps admissions with multiple allocations.\n- The final sort ranks the longest chains first.\n\n## Why this is optimal\n\nIt directly measures bed allocation chain length per admission.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT admission_id, COUNT(id) AS allocation_count FROM bed_allocations GROUP BY admission_id HAVING COUNT(id) > 1 ORDER BY allocation_count DESC, admission_id ASC;",
        explanation:
          "## Approach\n\nCount allocation ids instead of all rows.\n\n## Query\n\n```sql\nSELECT admission_id, COUNT(id) AS allocation_count\nFROM bed_allocations\nGROUP BY admission_id\nHAVING COUNT(id) > 1\nORDER BY allocation_count DESC, admission_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL allocation ids.\n- Since `id` is a primary key, it matches `COUNT(*)` here.\n- The grouping, filtering, and ordering stay the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE transfer count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH admission_allocations AS ( SELECT admission_id, COUNT(*) AS allocation_count FROM bed_allocations GROUP BY admission_id ) SELECT admission_id, allocation_count FROM admission_allocations WHERE allocation_count > 1 ORDER BY allocation_count DESC, admission_id ASC;",
        explanation:
          "## Approach\n\nCompute allocation counts per admission in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH admission_allocations AS (\n  SELECT admission_id, COUNT(*) AS allocation_count\n  FROM bed_allocations\n  GROUP BY admission_id\n)\nSELECT admission_id, allocation_count\nFROM admission_allocations\nWHERE allocation_count > 1\nORDER BY allocation_count DESC, admission_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one count per admission.\n- The outer query keeps only multi-allocation admissions.\n- This is useful if more transfer-related metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
    ],
  },
  {
    code: "HOSPITAL_094",
    approaches: [
      {
        approach_title: "Rank med diversity",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ) SELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ORDER BY diversity_rank ASC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCount distinct medications prescribed by each doctor, then rank doctors by that count.\n\n## Query\n\n```sql\nWITH doctor_medication_diversity AS (\n  SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications\n  FROM prescriptions p\n  JOIN prescription_items pi ON p.id = pi.prescription_id\n  WHERE p.doctor_id IS NOT NULL\n  GROUP BY p.doctor_id\n)\nSELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank\nFROM doctor_medication_diversity\nORDER BY diversity_rank ASC, doctor_id ASC;\n```\n\n## Explanation\n\n- The join links each doctor to medication items they prescribed.\n- `COUNT(DISTINCT pi.medication_id)` measures prescription diversity.\n- `DENSE_RANK()` ranks doctors by that diversity count.\n- `doctor_id ASC` breaks ties consistently.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes the diversity metric first, then applies the ranking cleanly.",
      },
      {
        approach_title: "Row number diversity",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ) SELECT doctor_id, distinct_medications, ROW_NUMBER() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ORDER BY diversity_rank ASC, doctor_id ASC;",
        explanation:
          "## Approach\n\nUse `ROW_NUMBER()` instead of `DENSE_RANK()` after computing diversity counts.\n\n## Query\n\n```sql\nWITH doctor_medication_diversity AS (\n  SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications\n  FROM prescriptions p\n  JOIN prescription_items pi ON p.id = pi.prescription_id\n  WHERE p.doctor_id IS NOT NULL\n  GROUP BY p.doctor_id\n)\nSELECT doctor_id, distinct_medications, ROW_NUMBER() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank\nFROM doctor_medication_diversity\nORDER BY diversity_rank ASC, doctor_id ASC;\n```\n\n## Explanation\n\n- The diversity count calculation is the same.\n- `ROW_NUMBER()` forces unique ranks even when counts tie.\n\n## Difference from the optimal approach\n\nIt changes the expected tie behavior because the original query uses `DENSE_RANK()`.",
      },
      {
        approach_title: "CTE plus rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ), ranked_diversity AS ( SELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ) SELECT doctor_id, distinct_medications, diversity_rank FROM ranked_diversity ORDER BY diversity_rank ASC, doctor_id ASC;",
        explanation:
          "## Approach\n\nCompute medication diversity in one CTE and ranking in another.\n\n## Query\n\n```sql\nWITH doctor_medication_diversity AS (\n  SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications\n  FROM prescriptions p\n  JOIN prescription_items pi ON p.id = pi.prescription_id\n  WHERE p.doctor_id IS NOT NULL\n  GROUP BY p.doctor_id\n),\nranked_diversity AS (\n  SELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank\n  FROM doctor_medication_diversity\n)\nSELECT doctor_id, distinct_medications, diversity_rank\nFROM ranked_diversity\nORDER BY diversity_rank ASC, doctor_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes one diversity count per doctor.\n- The second CTE applies the rank.\n- The final query returns the expected ordered result.\n\n## Difference from the optimal approach\n\nSame logic, but broken into extra steps.",
      },
    ],
  },
  {
    code: "HOSPITAL_095",
    approaches: [
      {
        approach_title: "First last BMI",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH bmi_history AS ( SELECT patient_id, recorded_at, bmi, FIRST_VALUE(bmi) OVER (PARTITION BY patient_id ORDER BY recorded_at, id) AS first_bmi, LAST_VALUE(bmi) OVER (PARTITION BY patient_id ORDER BY recorded_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_bmi FROM vital_signs WHERE bmi IS NOT NULL ) SELECT DISTINCT patient_id, first_bmi, last_bmi FROM bmi_history WHERE last_bmi > first_bmi ORDER BY patient_id ASC;",
        explanation:
          "## Approach\n\nWithin each patient’s BMI history, capture the earliest and latest BMI values using window functions, then keep patients whose latest BMI is higher.\n\n## Query\n\n```sql\nWITH bmi_history AS (\n  SELECT patient_id, recorded_at, bmi,\n         FIRST_VALUE(bmi) OVER (\n           PARTITION BY patient_id\n           ORDER BY recorded_at, id\n         ) AS first_bmi,\n         LAST_VALUE(bmi) OVER (\n           PARTITION BY patient_id\n           ORDER BY recorded_at, id\n           ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n         ) AS last_bmi\n  FROM vital_signs\n  WHERE bmi IS NOT NULL\n)\nSELECT DISTINCT patient_id, first_bmi, last_bmi\nFROM bmi_history\nWHERE last_bmi > first_bmi\nORDER BY patient_id ASC;\n```\n\n## Explanation\n\n- `FIRST_VALUE(bmi)` gets the earliest BMI per patient.\n- `LAST_VALUE(bmi)` needs the full window frame to get the actual latest BMI.\n- `WHERE bmi IS NOT NULL` removes unusable BMI rows.\n- `last_bmi > first_bmi` keeps patients with an increase.\n- `DISTINCT` returns one row per patient.\n\n## Why this is optimal\n\nIt directly compares earliest and latest BMI values without extra joins.",
      },
      {
        approach_title: "Ranked BMI",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_bmi AS ( SELECT patient_id, bmi, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at, id) AS rn_first, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, id DESC) AS rn_last FROM vital_signs WHERE bmi IS NOT NULL ), first_last AS ( SELECT f.patient_id, f.bmi AS first_bmi, l.bmi AS last_bmi FROM ranked_bmi f JOIN ranked_bmi l ON f.patient_id = l.patient_id WHERE f.rn_first = 1 AND l.rn_last = 1 ) SELECT patient_id, first_bmi, last_bmi FROM first_last WHERE last_bmi > first_bmi ORDER BY patient_id ASC;",
        explanation:
          "## Approach\n\nAssign forward and reverse row numbers to BMI rows, then join the first and last row for each patient.\n\n## Query\n\n```sql\nWITH ranked_bmi AS (\n  SELECT patient_id, bmi,\n         ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at, id) AS rn_first,\n         ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, id DESC) AS rn_last\n  FROM vital_signs\n  WHERE bmi IS NOT NULL\n),\nfirst_last AS (\n  SELECT f.patient_id, f.bmi AS first_bmi, l.bmi AS last_bmi\n  FROM ranked_bmi f\n  JOIN ranked_bmi l ON f.patient_id = l.patient_id\n  WHERE f.rn_first = 1\n    AND l.rn_last = 1\n)\nSELECT patient_id, first_bmi, last_bmi\nFROM first_last\nWHERE last_bmi > first_bmi\nORDER BY patient_id ASC;\n```\n\n## Explanation\n\n- `rn_first = 1` identifies the earliest BMI row per patient.\n- `rn_last = 1` identifies the latest BMI row per patient.\n- Joining both gives the first and latest BMI values side by side.\n- The final filter keeps only patients whose BMI increased.\n\n## Difference from the optimal approach\n\nIt works, but is more verbose than `FIRST_VALUE()` and `LAST_VALUE()`.",
      },
      {
        approach_title: "Two CTE ranks",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH first_bmi AS ( SELECT patient_id, bmi AS first_bmi FROM ( SELECT patient_id, bmi, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at ASC, id ASC) AS rn FROM vital_signs WHERE bmi IS NOT NULL ) x WHERE rn = 1 ), last_bmi AS ( SELECT patient_id, bmi AS last_bmi FROM ( SELECT patient_id, bmi, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, id DESC) AS rn FROM vital_signs WHERE bmi IS NOT NULL ) x WHERE rn = 1 ) SELECT f.patient_id, f.first_bmi, l.last_bmi FROM first_bmi f JOIN last_bmi l ON f.patient_id = l.patient_id WHERE l.last_bmi > f.first_bmi ORDER BY f.patient_id ASC;",
        explanation:
          "## Approach\n\nCreate one CTE for first BMI and another for latest BMI, then join them.\n\n## Query\n\n```sql\nWITH first_bmi AS (\n  SELECT patient_id, bmi AS first_bmi\n  FROM (\n    SELECT patient_id, bmi,\n           ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at ASC, id ASC) AS rn\n    FROM vital_signs\n    WHERE bmi IS NOT NULL\n  ) x\n  WHERE rn = 1\n),\nlast_bmi AS (\n  SELECT patient_id, bmi AS last_bmi\n  FROM (\n    SELECT patient_id, bmi,\n           ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, id DESC) AS rn\n    FROM vital_signs\n    WHERE bmi IS NOT NULL\n  ) x\n  WHERE rn = 1\n)\nSELECT f.patient_id, f.first_bmi, l.last_bmi\nFROM first_bmi f\nJOIN last_bmi l ON f.patient_id = l.patient_id\nWHERE l.last_bmi > f.first_bmi\nORDER BY f.patient_id ASC;\n```\n\n## Explanation\n\n- The first CTE returns each patient’s earliest BMI.\n- The second CTE returns each patient’s latest BMI.\n- The final join compares both values.\n- This avoids unsupported `MIN(record)` / `MAX(record)` syntax.\n\n## Difference from the optimal approach\n\nIt is valid and clear, but longer than the window value approach.",
      },
    ],
  },
  {
    code: "HOSPITAL_096",
    approaches: [
      {
        approach_title: "Top procedure revenue",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ORDER BY total_revenue DESC, po.procedure_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin procedure invoice items to procedure orders, sum billed line totals per procedure, and keep the top 10.\n\n## Query\n\n```sql\nSELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue\nFROM invoice_items ii\nJOIN procedure_orders po ON ii.item_reference_id = po.id\nWHERE ii.item_type = 'procedure'\nGROUP BY po.procedure_id\nORDER BY total_revenue DESC, po.procedure_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `invoice_items` stores billed line items.\n- `item_type = 'procedure'` keeps only procedure-related billing rows.\n- The join maps each billed item to a procedure order.\n- `SUM(ii.line_total)` gives total revenue per procedure.\n- `LIMIT 10` keeps the highest revenue contributors.\n\n## Why this is optimal\n\nIt directly links billed procedure items to procedure ids and ranks them by revenue.",
      },
      {
        approach_title: "CTE proc revenue",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH procedure_revenue AS ( SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ) SELECT procedure_id, total_revenue FROM procedure_revenue ORDER BY total_revenue DESC, procedure_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute procedure revenue in a CTE, then rank and limit outside.\n\n## Query\n\n```sql\nWITH procedure_revenue AS (\n  SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue\n  FROM invoice_items ii\n  JOIN procedure_orders po ON ii.item_reference_id = po.id\n  WHERE ii.item_type = 'procedure'\n  GROUP BY po.procedure_id\n)\nSELECT procedure_id, total_revenue\nFROM procedure_revenue\nORDER BY total_revenue DESC, procedure_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE computes one revenue total per procedure.\n- The outer query handles ranking and top-10 filtering.\n- This is useful if more procedure finance metrics are added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result.",
      },
      {
        approach_title: "Subquery proc revenue",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT procedure_id, total_revenue FROM ( SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ) x ORDER BY total_revenue DESC, procedure_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table for procedure revenue totals, then sort and limit outside.\n\n## Query\n\n```sql\nSELECT procedure_id, total_revenue\nFROM (\n  SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue\n  FROM invoice_items ii\n  JOIN procedure_orders po ON ii.item_reference_id = po.id\n  WHERE ii.item_type = 'procedure'\n  GROUP BY po.procedure_id\n) x\nORDER BY total_revenue DESC, procedure_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes revenue per procedure.\n- The outer query ranks and limits the result.\n- The output matches the grouped join query.\n\n## Difference from the optimal approach\n\nAdds an unnecessary extra layer.",
      },
    ],
  },
  {
    code: "HOSPITAL_097",
    approaches: [
      {
        approach_title: "Overlap pairs",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH policy_pairs AS ( SELECT ip1.patient_id, ip1.id AS policy_id_1, ip2.id AS policy_id_2, ip1.coverage_start_date AS start_1, ip1.coverage_end_date AS end_1, ip2.coverage_start_date AS start_2, ip2.coverage_end_date AS end_2 FROM insurance_policies ip1 JOIN insurance_policies ip2 ON ip1.patient_id = ip2.patient_id AND ip1.id < ip2.id ) SELECT DISTINCT patient_id FROM policy_pairs WHERE COALESCE(end_1, DATE '9999-12-31') >= start_2 AND COALESCE(end_2, DATE '9999-12-31') >= start_1 ORDER BY patient_id ASC;",
        explanation:
          "## Approach\n\nCreate pairs of policies for the same patient, then keep pairs whose coverage periods overlap.\n\n## Query\n\n```sql\nWITH policy_pairs AS (\n  SELECT ip1.patient_id, ip1.id AS policy_id_1, ip2.id AS policy_id_2, ip1.coverage_start_date AS start_1, ip1.coverage_end_date AS end_1, ip2.coverage_start_date AS start_2, ip2.coverage_end_date AS end_2\n  FROM insurance_policies ip1\n  JOIN insurance_policies ip2\n    ON ip1.patient_id = ip2.patient_id\n   AND ip1.id < ip2.id\n)\nSELECT DISTINCT patient_id\nFROM policy_pairs\nWHERE COALESCE(end_1, DATE '9999-12-31') >= start_2\n  AND COALESCE(end_2, DATE '9999-12-31') >= start_1\nORDER BY patient_id ASC;\n```\n\n## Explanation\n\n- The self join creates unique policy pairs for the same patient.\n- `ip1.id < ip2.id` prevents duplicate pair reversals.\n- `COALESCE(..., DATE '9999-12-31')` treats open-ended policies as ongoing.\n- The overlap condition checks whether both date ranges intersect.\n- `DISTINCT` ensures one row per patient.\n\n## Why this is optimal\n\nIt directly tests pairwise overlap between policy coverage periods.",
      },
      {
        approach_title: "Self join overlap",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT ip1.patient_id FROM insurance_policies ip1 JOIN insurance_policies ip2 ON ip1.patient_id = ip2.patient_id AND ip1.id < ip2.id WHERE COALESCE(ip1.coverage_end_date, DATE '9999-12-31') >= ip2.coverage_start_date AND COALESCE(ip2.coverage_end_date, DATE '9999-12-31') >= ip1.coverage_start_date ORDER BY ip1.patient_id ASC;",
        explanation:
          "## Approach\n\nPerform the overlap check directly in a self join without a separate CTE.\n\n## Query\n\n```sql\nSELECT DISTINCT ip1.patient_id\nFROM insurance_policies ip1\nJOIN insurance_policies ip2\n  ON ip1.patient_id = ip2.patient_id\n AND ip1.id < ip2.id\nWHERE COALESCE(ip1.coverage_end_date, DATE '9999-12-31') >= ip2.coverage_start_date\n  AND COALESCE(ip2.coverage_end_date, DATE '9999-12-31') >= ip1.coverage_start_date\nORDER BY ip1.patient_id ASC;\n```\n\n## Explanation\n\n- The self join and overlap conditions are the same.\n- `DISTINCT` returns each patient once.\n\n## Difference from the optimal approach\n\nAlso correct, but the CTE version is a little easier to read and debug.",
      },
      {
        approach_title: "CTE normalized dates",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH normalized_policies AS ( SELECT id, patient_id, coverage_start_date, COALESCE(coverage_end_date, DATE '9999-12-31') AS coverage_end_date FROM insurance_policies ) SELECT DISTINCT np1.patient_id FROM normalized_policies np1 JOIN normalized_policies np2 ON np1.patient_id = np2.patient_id AND np1.id < np2.id WHERE np1.coverage_end_date >= np2.coverage_start_date AND np2.coverage_end_date >= np1.coverage_start_date ORDER BY np1.patient_id ASC;",
        explanation:
          "## Approach\n\nNormalize open-ended coverage end dates first, then apply the overlap join.\n\n## Query\n\n```sql\nWITH normalized_policies AS (\n  SELECT id, patient_id, coverage_start_date, COALESCE(coverage_end_date, DATE '9999-12-31') AS coverage_end_date\n  FROM insurance_policies\n)\nSELECT DISTINCT np1.patient_id\nFROM normalized_policies np1\nJOIN normalized_policies np2\n  ON np1.patient_id = np2.patient_id\n AND np1.id < np2.id\nWHERE np1.coverage_end_date >= np2.coverage_start_date\n  AND np2.coverage_end_date >= np1.coverage_start_date\nORDER BY np1.patient_id ASC;\n```\n\n## Explanation\n\n- The CTE makes all end dates comparable by replacing NULL with a far-future date.\n- The outer join checks overlap on the normalized date ranges.\n- The final output is the same.\n\n## Difference from the optimal approach\n\nMore verbose, but it makes the open-ended logic reusable.",
      },
    ],
  },
  {
    code: "HOSPITAL_098",
    approaches: [
      {
        approach_title: "EXISTS follow-up",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ), followups AS ( SELECT cc.id AS appointment_id, CASE WHEN EXISTS ( SELECT 1 FROM appointments a2 WHERE a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at ) THEN 1 ELSE 0 END AS has_followup FROM completed_consults cc ) SELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct FROM followups;",
        explanation:
          "## Approach\n\nBuild the set of completed consultation appointments, flag whether each one later led to a follow-up for the same patient and doctor, then compute the percentage.\n\n## Query\n\n```sql\nWITH completed_consults AS (\n  SELECT id, patient_id, doctor_id, scheduled_start_at\n  FROM appointments\n  WHERE appointment_status = 'completed'\n    AND appointment_type = 'consultation'\n),\nfollowups AS (\n  SELECT cc.id AS appointment_id, CASE WHEN EXISTS (\n    SELECT 1\n    FROM appointments a2\n    WHERE a2.patient_id = cc.patient_id\n      AND a2.doctor_id = cc.doctor_id\n      AND a2.appointment_type = 'follow_up'\n      AND a2.scheduled_start_at > cc.scheduled_start_at\n  ) THEN 1 ELSE 0 END AS has_followup\n  FROM completed_consults cc\n)\nSELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct\nFROM followups;\n```\n\n## Explanation\n\n- The first CTE isolates completed consultation appointments.\n- The second CTE flags whether each consultation has a later follow-up for the same patient-doctor pair.\n- `EXISTS` is used because only the presence of a follow-up matters.\n- The final query computes the percentage of consultations that converted.\n\n## Why this is optimal\n\nIt mirrors the business logic directly and keeps the consultation cohort separate from the follow-up check.",
      },
      {
        approach_title: "Left join follow-up",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ) SELECT ROUND(100.0 * COUNT(DISTINCT CASE WHEN a2.id IS NOT NULL THEN cc.id END) / COUNT(DISTINCT cc.id), 2) AS follow_up_conversion_rate_pct FROM completed_consults cc LEFT JOIN appointments a2 ON a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at;",
        explanation:
          "## Approach\n\nJoin completed consultations to later follow-up appointments and measure what share had at least one match.\n\n## Query\n\n```sql\nWITH completed_consults AS (\n  SELECT id, patient_id, doctor_id, scheduled_start_at\n  FROM appointments\n  WHERE appointment_status = 'completed'\n    AND appointment_type = 'consultation'\n)\nSELECT ROUND(100.0 * COUNT(DISTINCT CASE WHEN a2.id IS NOT NULL THEN cc.id END) / COUNT(DISTINCT cc.id), 2) AS follow_up_conversion_rate_pct\nFROM completed_consults cc\nLEFT JOIN appointments a2\n  ON a2.patient_id = cc.patient_id\n AND a2.doctor_id = cc.doctor_id\n AND a2.appointment_type = 'follow_up'\n AND a2.scheduled_start_at > cc.scheduled_start_at;\n```\n\n## Explanation\n\n- The left join attaches later follow-up appointments when they exist.\n- `COUNT(DISTINCT ...)` avoids double counting consultations with multiple follow-ups.\n- The percentage is then computed from matched versus total consultations.\n\n## Difference from the optimal approach\n\nIt works, but needs extra `DISTINCT` handling because one consultation can match many follow-ups.",
      },
      {
        approach_title: "CTE flagged follow-up",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ), flagged AS ( SELECT cc.id, cc.patient_id, cc.doctor_id, cc.scheduled_start_at, MAX(CASE WHEN a2.id IS NOT NULL THEN 1 ELSE 0 END) AS has_followup FROM completed_consults cc LEFT JOIN appointments a2 ON a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at GROUP BY cc.id, cc.patient_id, cc.doctor_id, cc.scheduled_start_at ) SELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct FROM flagged;",
        explanation:
          "## Approach\n\nJoin consultations to later follow-ups, collapse each consultation to a single flag, then compute the rate.\n\n## Query\n\n```sql\nWITH completed_consults AS (\n  SELECT id, patient_id, doctor_id, scheduled_start_at\n  FROM appointments\n  WHERE appointment_status = 'completed'\n    AND appointment_type = 'consultation'\n),\nflagged AS (\n  SELECT cc.id, cc.patient_id, cc.doctor_id, cc.scheduled_start_at, MAX(CASE WHEN a2.id IS NOT NULL THEN 1 ELSE 0 END) AS has_followup\n  FROM completed_consults cc\n  LEFT JOIN appointments a2\n    ON a2.patient_id = cc.patient_id\n   AND a2.doctor_id = cc.doctor_id\n   AND a2.appointment_type = 'follow_up'\n   AND a2.scheduled_start_at > cc.scheduled_start_at\n  GROUP BY cc.id, cc.patient_id, cc.doctor_id, cc.scheduled_start_at\n)\nSELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct\nFROM flagged;\n```\n\n## Explanation\n\n- The first CTE defines the consultation cohort.\n- The second CTE reduces multiple possible follow-up matches to one flag per consultation.\n- The final query calculates the percentage.\n\n## Difference from the optimal approach\n\nMore complex because it manages duplicate follow-up matches explicitly.",
      },
    ],
  },
  {
    code: "HOSPITAL_099",
    approaches: [
      {
        approach_title: "Top test cat",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rn FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ) SELECT department_id, test_category, total_tests FROM category_counts WHERE rn = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nCount ordered tests by department and test category, rank categories within each department, then keep the top one.\n\n## Query\n\n```sql\nWITH category_counts AS (\n  SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rn\n  FROM lab_orders lo\n  JOIN encounters e ON lo.encounter_id = e.id\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_test_catalog ltc ON loi.test_id = ltc.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, ltc.test_category\n)\nSELECT department_id, test_category, total_tests\nFROM category_counts\nWHERE rn = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- The joins connect each ordered test to the department and its category.\n- `COUNT(*)` gives the ordered test count per department-category pair.\n- `ROW_NUMBER()` ranks categories within each department by total count.\n- `test_category ASC` breaks ties consistently.\n- `WHERE rn = 1` keeps the single leader category per department.\n\n## Why this is optimal\n\nIt directly returns one highest-volume test category per department with deterministic ranking.",
      },
      {
        approach_title: "Dense rank cat",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rk FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ) SELECT department_id, test_category, total_tests FROM category_counts WHERE rk = 1 ORDER BY department_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` to rank test categories within each department.\n\n## Query\n\n```sql\nWITH category_counts AS (\n  SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rk\n  FROM lab_orders lo\n  JOIN encounters e ON lo.encounter_id = e.id\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_test_catalog ltc ON loi.test_id = ltc.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, ltc.test_category\n)\nSELECT department_id, test_category, total_tests\nFROM category_counts\nWHERE rk = 1\nORDER BY department_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are the same.\n- `DENSE_RANK()` ranks categories per department.\n- Because `test_category` is part of the order, this still gives one first-ranked row per department in practice.\n\n## Difference from the optimal approach\n\n`ROW_NUMBER()` is the clearer choice when exactly one row per department is intended.",
      },
      {
        approach_title: "CTE max cat",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ), max_counts AS ( SELECT department_id, MAX(total_tests) AS max_total_tests FROM category_counts GROUP BY department_id ) SELECT cc.department_id, cc.test_category, cc.total_tests FROM category_counts cc JOIN max_counts mc ON cc.department_id = mc.department_id AND cc.total_tests = mc.max_total_tests ORDER BY cc.department_id ASC, cc.test_category ASC;",
        explanation:
          "## Approach\n\nCount tests per category first, find the maximum count per department, then join back.\n\n## Query\n\n```sql\nWITH category_counts AS (\n  SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests\n  FROM lab_orders lo\n  JOIN encounters e ON lo.encounter_id = e.id\n  JOIN lab_order_items loi ON lo.id = loi.lab_order_id\n  JOIN lab_test_catalog ltc ON loi.test_id = ltc.id\n  WHERE e.department_id IS NOT NULL\n  GROUP BY e.department_id, ltc.test_category\n),\nmax_counts AS (\n  SELECT department_id, MAX(total_tests) AS max_total_tests\n  FROM category_counts\n  GROUP BY department_id\n)\nSELECT cc.department_id, cc.test_category, cc.total_tests\nFROM category_counts cc\nJOIN max_counts mc\n  ON cc.department_id = mc.department_id\n AND cc.total_tests = mc.max_total_tests\nORDER BY cc.department_id ASC, cc.test_category ASC;\n```\n\n## Explanation\n\n- The first CTE computes department-category counts.\n- The second CTE finds the maximum count per department.\n- Joining them returns matching top categories.\n\n## Difference from the optimal approach\n\nIt can return multiple categories for a department when counts tie.",
      },
    ],
  },
  {
    code: "HOSPITAL_100",
    approaches: [
      {
        approach_title: "Top amount gap",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS amount_gap FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY amount_gap DESC, i.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin invoices to payments, sum successful payments only, subtract from the invoice total, then keep the 10 largest gaps.\n\n## Query\n\n```sql\nSELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS amount_gap\nFROM invoices i\nLEFT JOIN payments p ON i.id = p.invoice_id\nGROUP BY i.id, i.invoice_number, i.total_amount\nORDER BY amount_gap DESC, i.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps invoices even if they have no payments.\n- The `CASE` expression includes only successful payment amounts.\n- `COALESCE(..., 0)` handles invoices with no successful payments.\n- Subtracting paid totals from `total_amount` gives the remaining gap.\n- The result is sorted by largest gap and limited to 10 rows.\n\n## Why this is optimal\n\nIt correctly handles invoices with many payments, partial payments, or no payments in one query.",
      },
      {
        approach_title: "FILTER amount gap",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(p.amount_paid) FILTER (WHERE p.payment_status = 'successful'), 0), 2) AS amount_gap FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY amount_gap DESC, i.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse `FILTER` to sum successful payments only, then compute the invoice gap.\n\n## Query\n\n```sql\nSELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(p.amount_paid) FILTER (WHERE p.payment_status = 'successful'), 0), 2) AS amount_gap\nFROM invoices i\nLEFT JOIN payments p ON i.id = p.invoice_id\nGROUP BY i.id, i.invoice_number, i.total_amount\nORDER BY amount_gap DESC, i.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `FILTER` restricts the payment sum to successful rows.\n- `COALESCE` handles invoices without successful payments.\n- The gap calculation, ordering, and limit remain the same.\n\n## Difference from the optimal approach\n\nAlso correct, but the `CASE` form is often easier for learners to follow.",
      },
      {
        approach_title: "CTE gap top",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH invoice_paid_totals AS ( SELECT i.id, i.invoice_number, i.total_amount, COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0) AS paid_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ) SELECT id, invoice_number, total_amount, ROUND(total_amount - paid_amount, 2) AS amount_gap FROM invoice_paid_totals ORDER BY amount_gap DESC, id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nFirst compute total successful payments per invoice in a CTE, then calculate and rank the invoice gaps.\n\n## Query\n\n```sql\nWITH invoice_paid_totals AS (\n  SELECT i.id, i.invoice_number, i.total_amount, COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0) AS paid_amount\n  FROM invoices i\n  LEFT JOIN payments p ON i.id = p.invoice_id\n  GROUP BY i.id, i.invoice_number, i.total_amount\n)\nSELECT id, invoice_number, total_amount, ROUND(total_amount - paid_amount, 2) AS amount_gap\nFROM invoice_paid_totals\nORDER BY amount_gap DESC, id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE computes how much has been successfully collected per invoice.\n- The outer query subtracts that value from the invoice total.\n- The result is ranked by the largest remaining gap.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when paid totals themselves also matter.",
      },
    ],
  },
];
