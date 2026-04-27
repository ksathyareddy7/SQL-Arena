# Solutions Evaluation Report (hospital)

**Summary:**
- Total Approaches: 299
- Passed: 299
- Failed: 0

## Detailed Results
### ✅ PASS : HOSPITAL_001 - COUNT patients
```sql
SELECT COUNT(*) AS total_patients FROM patients;
```

### ✅ PASS : HOSPITAL_001 - COUNT ids
```sql
SELECT COUNT(id) AS total_patients FROM patients;
```

### ✅ PASS : HOSPITAL_001 - CTE count
```sql
WITH patient_count AS (
  SELECT COUNT(*) AS total_patients
  FROM patients
)
SELECT total_patients
FROM patient_count;
```

### ✅ PASS : HOSPITAL_002 - Filter active
```sql
SELECT COUNT(*) AS active_doctors FROM doctors WHERE is_active = true;
```

### ✅ PASS : HOSPITAL_002 - Boolean filter
```sql
SELECT COUNT(*) AS active_doctors FROM doctors WHERE is_active;
```

### ✅ PASS : HOSPITAL_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_doctors FROM doctors;
```

### ✅ PASS : HOSPITAL_003 - Filter and sort
```sql
SELECT id, department_code, name, department_type, floor_number FROM departments WHERE is_active = true ORDER BY name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_003 - Boolean shorthand
```sql
SELECT id, department_code, name, department_type, floor_number FROM departments WHERE is_active ORDER BY name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_003 - CTE active departments
```sql
WITH active_departments AS (
  SELECT id, department_code, name, department_type, floor_number
  FROM departments
  WHERE is_active = true
)
SELECT id, department_code, name, department_type, floor_number
FROM active_departments
ORDER BY name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_004 - Date filter
```sql
SELECT id, patient_code, full_name, registered_at FROM patients WHERE DATE(registered_at) = CURRENT_DATE ORDER BY registered_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_004 - Range filter
```sql
SELECT id, patient_code, full_name, registered_at FROM patients WHERE registered_at >= CURRENT_DATE AND registered_at < CURRENT_DATE + INTERVAL '1 day' ORDER BY registered_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_004 - CTE today patients
```sql
WITH today_patients AS (
  SELECT id, patient_code, full_name, registered_at
  FROM patients
  WHERE DATE(registered_at) = CURRENT_DATE
)
SELECT id, patient_code, full_name, registered_at
FROM today_patients
ORDER BY registered_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_005 - Filter available beds
```sql
SELECT id, room_id, bed_number, bed_type, bed_status FROM beds WHERE bed_status = 'available' AND is_active = true ORDER BY room_id ASC, bed_number ASC;
```

### ✅ PASS : HOSPITAL_005 - Boolean shorthand
```sql
SELECT id, room_id, bed_number, bed_type, bed_status FROM beds WHERE bed_status = 'available' AND is_active ORDER BY room_id ASC, bed_number ASC;
```

### ✅ PASS : HOSPITAL_005 - CTE available beds
```sql
WITH available_beds AS (
  SELECT id, room_id, bed_number, bed_type, bed_status
  FROM beds
  WHERE bed_status = 'available'
    AND is_active = true
)
SELECT id, room_id, bed_number, bed_type, bed_status
FROM available_beds
ORDER BY room_id ASC, bed_number ASC;
```

### ✅ PASS : HOSPITAL_006 - Filter scheduled
```sql
SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at FROM appointments WHERE appointment_status = 'scheduled' ORDER BY scheduled_start_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_006 - IN filter
```sql
SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at FROM appointments WHERE appointment_status IN ('scheduled') ORDER BY scheduled_start_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_006 - CTE scheduled
```sql
WITH scheduled_appointments AS (
  SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at
  FROM appointments
  WHERE appointment_status = 'scheduled'
)
SELECT id, appointment_number, patient_id, doctor_id, scheduled_start_at, scheduled_end_at
FROM scheduled_appointments
ORDER BY scheduled_start_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_007 - LEFT JOIN dept
```sql
SELECT d.id, d.full_name, dp.name AS department_name FROM doctors d LEFT JOIN departments dp ON d.department_id = dp.id ORDER BY d.full_name ASC, d.id ASC;
```

### ✅ PASS : HOSPITAL_007 - CTE left join
```sql
WITH doctor_departments AS (
  SELECT d.id, d.full_name, dp.name AS department_name
  FROM doctors d
  LEFT JOIN departments dp ON d.department_id = dp.id
)
SELECT id, full_name, department_name
FROM doctor_departments
ORDER BY full_name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_007 - Correlated subquery
```sql
SELECT d.id, d.full_name, (SELECT dp.name FROM departments dp WHERE dp.id = d.department_id) AS department_name FROM doctors d ORDER BY d.full_name ASC, d.id ASC;
```

### ✅ PASS : HOSPITAL_008 - JOIN distinct patients
```sql
SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN insurance_policies ip ON p.id = ip.patient_id ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_008 - EXISTS patients
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM insurance_policies ip WHERE ip.patient_id = p.id) ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_008 - GROUP BY patients
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN insurance_policies ip ON p.id = ip.patient_id GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_009 - Filter completed orders
```sql
SELECT id, lab_order_number, patient_id, encounter_id, ordered_at FROM lab_orders WHERE order_status = 'completed' ORDER BY ordered_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_009 - IN completed
```sql
SELECT id, lab_order_number, patient_id, encounter_id, ordered_at FROM lab_orders WHERE order_status IN ('completed') ORDER BY ordered_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_009 - CTE completed labs
```sql
WITH completed_lab_orders AS (
  SELECT id, lab_order_number, patient_id, encounter_id, ordered_at
  FROM lab_orders
  WHERE order_status = 'completed'
)
SELECT id, lab_order_number, patient_id, encounter_id, ordered_at
FROM completed_lab_orders
ORDER BY ordered_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_010 - Filter paid invoices
```sql
SELECT id, invoice_number, patient_id, total_amount, issued_at FROM invoices WHERE invoice_status = 'paid' ORDER BY issued_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_010 - IN paid
```sql
SELECT id, invoice_number, patient_id, total_amount, issued_at FROM invoices WHERE invoice_status IN ('paid') ORDER BY issued_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_010 - CTE paid invoices
```sql
WITH paid_invoices AS (
  SELECT id, invoice_number, patient_id, total_amount, issued_at
  FROM invoices
  WHERE invoice_status = 'paid'
)
SELECT id, invoice_number, patient_id, total_amount, issued_at
FROM paid_invoices
ORDER BY issued_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_011 - Count by doctor
```sql
SELECT doctor_id, COUNT(*) AS total_appointments FROM appointments GROUP BY doctor_id ORDER BY total_appointments DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_011 - Count ids
```sql
SELECT doctor_id, COUNT(id) AS total_appointments FROM appointments GROUP BY doctor_id ORDER BY total_appointments DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_011 - CTE doctor count
```sql
WITH doctor_appointments AS (
  SELECT doctor_id, COUNT(*) AS total_appointments
  FROM appointments
  GROUP BY doctor_id
)
SELECT doctor_id, total_appointments
FROM doctor_appointments
ORDER BY total_appointments DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_012 - Join distinct
```sql
SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_012 - EXISTS patients
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM patient_allergies pa WHERE pa.patient_id = p.id) ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_012 - Group patients
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_013 - Join approved leaves
```sql
SELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date FROM doctor_leaves dl JOIN doctors d ON dl.doctor_id = d.id WHERE dl.approval_status = 'approved' ORDER BY dl.start_date ASC, dl.id ASC;
```

### ✅ PASS : HOSPITAL_013 - CTE approved leaves
```sql
WITH approved_leaves AS (
  SELECT id, doctor_id, leave_type, start_date, end_date
  FROM doctor_leaves
  WHERE approval_status = 'approved'
)
SELECT al.id, al.doctor_id, d.full_name, al.leave_type, al.start_date, al.end_date
FROM approved_leaves al
JOIN doctors d ON al.doctor_id = d.id
ORDER BY al.start_date ASC, al.id ASC;
```

### ✅ PASS : HOSPITAL_013 - IN approved doctors
```sql
SELECT dl.id, dl.doctor_id, d.full_name, dl.leave_type, dl.start_date, dl.end_date FROM doctor_leaves dl JOIN doctors d ON dl.doctor_id = d.id WHERE dl.doctor_id IN (SELECT doctor_id FROM doctor_leaves WHERE approval_status = 'approved') AND dl.approval_status = 'approved' ORDER BY dl.start_date ASC, dl.id ASC;
```

### ✅ PASS : HOSPITAL_014 - Filter active tests
```sql
SELECT id, test_code, test_name, test_category, standard_price FROM lab_test_catalog WHERE is_active = true ORDER BY test_name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_014 - Boolean active
```sql
SELECT id, test_code, test_name, test_category, standard_price FROM lab_test_catalog WHERE is_active ORDER BY test_name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_014 - CTE active tests
```sql
WITH active_tests AS (
  SELECT id, test_code, test_name, test_category, standard_price
  FROM lab_test_catalog
  WHERE is_active = true
)
SELECT id, test_code, test_name, test_category, standard_price
FROM active_tests
ORDER BY test_name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_015 - Filter primary
```sql
SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date FROM insurance_policies WHERE is_primary = true ORDER BY patient_id ASC, id ASC;
```

### ✅ PASS : HOSPITAL_015 - Boolean primary
```sql
SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date FROM insurance_policies WHERE is_primary ORDER BY patient_id ASC, id ASC;
```

### ✅ PASS : HOSPITAL_015 - CTE primary
```sql
WITH primary_policies AS (
  SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date
  FROM insurance_policies
  WHERE is_primary = true
)
SELECT id, patient_id, insurance_provider_id, policy_number, plan_name, coverage_start_date, coverage_end_date
FROM primary_policies
ORDER BY patient_id ASC, id ASC;
```

### ✅ PASS : HOSPITAL_016 - Filter admitted
```sql
SELECT id, admission_number, patient_id, department_id, admitted_at FROM admissions WHERE admission_status = 'admitted' ORDER BY admitted_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_016 - IN admitted
```sql
SELECT id, admission_number, patient_id, department_id, admitted_at FROM admissions WHERE admission_status IN ('admitted') ORDER BY admitted_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_016 - CTE admitted
```sql
WITH active_admissions AS (
  SELECT id, admission_number, patient_id, department_id, admitted_at
  FROM admissions
  WHERE admission_status = 'admitted'
)
SELECT id, admission_number, patient_id, department_id, admitted_at
FROM active_admissions
ORDER BY admitted_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_017 - LEFT JOIN spec
```sql
SELECT d.id, d.full_name, s.name AS specialization_name FROM doctors d LEFT JOIN specializations s ON d.primary_specialization_id = s.id ORDER BY d.full_name ASC, d.id ASC;
```

### ✅ PASS : HOSPITAL_017 - CTE left join
```sql
WITH doctor_specs AS (
  SELECT d.id, d.full_name, s.name AS specialization_name
  FROM doctors d
  LEFT JOIN specializations s ON d.primary_specialization_id = s.id
)
SELECT id, full_name, specialization_name
FROM doctor_specs
ORDER BY full_name ASC, id ASC;
```

### ✅ PASS : HOSPITAL_017 - Correlated subquery
```sql
SELECT d.id, d.full_name, (SELECT s.name FROM specializations s WHERE s.id = d.primary_specialization_id) AS specialization_name FROM doctors d ORDER BY d.full_name ASC, d.id ASC;
```

### ✅ PASS : HOSPITAL_018 - Filter successful
```sql
SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at FROM payments WHERE payment_status = 'successful' ORDER BY paid_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_018 - IN successful
```sql
SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at FROM payments WHERE payment_status IN ('successful') ORDER BY paid_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_018 - CTE successful
```sql
WITH successful_payments AS (
  SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at
  FROM payments
  WHERE payment_status = 'successful'
)
SELECT id, payment_number, invoice_id, payment_method, amount_paid, paid_at
FROM successful_payments
ORDER BY paid_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_019 - Filter review claims
```sql
SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at FROM insurance_claims WHERE claim_status = 'under_review' ORDER BY submitted_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_019 - IN review
```sql
SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at FROM insurance_claims WHERE claim_status IN ('under_review') ORDER BY submitted_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_019 - CTE review claims
```sql
WITH review_claims AS (
  SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at
  FROM insurance_claims
  WHERE claim_status = 'under_review'
)
SELECT id, claim_number, invoice_id, insurance_policy_id, claimed_amount, submitted_at
FROM review_claims
ORDER BY submitted_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_020 - Select and sort
```sql
SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM patient_feedback ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_020 - CTE feedback
```sql
WITH feedback_rows AS (
  SELECT id, patient_id, doctor_id, rating, feedback_category, created_at
  FROM patient_feedback
)
SELECT id, patient_id, doctor_id, rating, feedback_category, created_at
FROM feedback_rows
ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_020 - Subquery sort
```sql
SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM (SELECT id, patient_id, doctor_id, rating, feedback_category, created_at FROM patient_feedback) pf ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_021 - AVG by dept
```sql
SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ORDER BY avg_consultation_fee DESC, d.department_id ASC;
```

### ✅ PASS : HOSPITAL_021 - CTE fee avg
```sql
WITH department_fee_avg AS ( SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ) SELECT department_id, department_name, avg_consultation_fee FROM department_fee_avg ORDER BY avg_consultation_fee DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_021 - Subquery avg
```sql
SELECT department_id, department_name, avg_consultation_fee FROM ( SELECT d.department_id, dp.name AS department_name, ROUND(AVG(d.consultation_fee), 2) AS avg_consultation_fee FROM doctors d JOIN departments dp ON d.department_id = dp.id WHERE d.is_active = true GROUP BY d.department_id, dp.name ) x ORDER BY avg_consultation_fee DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_022 - Count by status
```sql
SELECT appointment_status, COUNT(*) AS total_appointments FROM appointments GROUP BY appointment_status ORDER BY total_appointments DESC, appointment_status ASC;
```

### ✅ PASS : HOSPITAL_022 - Count ids
```sql
SELECT appointment_status, COUNT(id) AS total_appointments FROM appointments GROUP BY appointment_status ORDER BY total_appointments DESC, appointment_status ASC;
```

### ✅ PASS : HOSPITAL_022 - CTE status count
```sql
WITH status_counts AS ( SELECT appointment_status, COUNT(*) AS total_appointments FROM appointments GROUP BY appointment_status ) SELECT appointment_status, total_appointments FROM status_counts ORDER BY total_appointments DESC, appointment_status ASC;
```

### ✅ PASS : HOSPITAL_023 - Count occupied
```sql
SELECT COUNT(*) AS occupied_beds FROM beds WHERE bed_status = 'occupied';
```

### ✅ PASS : HOSPITAL_023 - Count ids
```sql
SELECT COUNT(id) AS occupied_beds FROM beds WHERE bed_status = 'occupied';
```

### ✅ PASS : HOSPITAL_023 - CTE count
```sql
WITH occupied_count AS ( SELECT COUNT(*) AS occupied_beds FROM beds WHERE bed_status = 'occupied' ) SELECT occupied_beds FROM occupied_count;
```

### ✅ PASS : HOSPITAL_024 - Count admissions
```sql
SELECT department_id, COUNT(*) AS total_admissions FROM admissions GROUP BY department_id ORDER BY total_admissions DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_024 - Count ids
```sql
SELECT department_id, COUNT(id) AS total_admissions FROM admissions GROUP BY department_id ORDER BY total_admissions DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_024 - CTE admission count
```sql
WITH admission_counts AS ( SELECT department_id, COUNT(*) AS total_admissions FROM admissions GROUP BY department_id ) SELECT department_id, total_admissions FROM admission_counts ORDER BY total_admissions DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_025 - SUM by patient
```sql
SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ORDER BY total_invoice_amount DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_025 - CTE invoice sum
```sql
WITH patient_invoice_totals AS ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ) SELECT patient_id, total_invoice_amount FROM patient_invoice_totals ORDER BY total_invoice_amount DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_025 - Subquery sum
```sql
SELECT patient_id, total_invoice_amount FROM ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_invoice_amount FROM invoices GROUP BY patient_id ) x ORDER BY total_invoice_amount DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_026 - Count lab orders
```sql
SELECT patient_id, COUNT(*) AS total_lab_orders FROM lab_orders GROUP BY patient_id ORDER BY total_lab_orders DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_026 - Count ids
```sql
SELECT patient_id, COUNT(id) AS total_lab_orders FROM lab_orders GROUP BY patient_id ORDER BY total_lab_orders DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_026 - CTE lab count
```sql
WITH patient_lab_counts AS ( SELECT patient_id, COUNT(*) AS total_lab_orders FROM lab_orders GROUP BY patient_id ) SELECT patient_id, total_lab_orders FROM patient_lab_counts ORDER BY total_lab_orders DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_027 - Count prescriptions
```sql
SELECT doctor_id, COUNT(*) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ORDER BY total_prescriptions DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_027 - Count ids
```sql
SELECT doctor_id, COUNT(id) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ORDER BY total_prescriptions DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_027 - CTE rx count
```sql
WITH doctor_prescription_counts AS ( SELECT doctor_id, COUNT(*) AS total_prescriptions FROM prescriptions GROUP BY doctor_id ) SELECT doctor_id, total_prescriptions FROM doctor_prescription_counts ORDER BY total_prescriptions DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_028 - Filter critical
```sql
SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation = 'critical' ORDER BY resulted_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_028 - IN critical
```sql
SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation IN ('critical') ORDER BY resulted_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_028 - CTE critical
```sql
WITH critical_results AS ( SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM lab_results WHERE interpretation = 'critical' ) SELECT id, lab_order_item_id, result_value, interpretation, resulted_at FROM critical_results ORDER BY resulted_at DESC, id ASC;
```

### ✅ PASS : HOSPITAL_029 - Sort by exp
```sql
SELECT id, full_name, years_of_experience FROM doctors ORDER BY years_of_experience DESC, id ASC;
```

### ✅ PASS : HOSPITAL_029 - CTE sorted
```sql
WITH doctor_experience AS ( SELECT id, full_name, years_of_experience FROM doctors ) SELECT id, full_name, years_of_experience FROM doctor_experience ORDER BY years_of_experience DESC, id ASC;
```

### ✅ PASS : HOSPITAL_029 - Subquery sorted
```sql
SELECT id, full_name, years_of_experience FROM ( SELECT id, full_name, years_of_experience FROM doctors ) x ORDER BY years_of_experience DESC, id ASC;
```

### ✅ PASS : HOSPITAL_030 - Join chronic
```sql
SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_conditions pc ON p.id = pc.patient_id WHERE pc.condition_status = 'chronic' ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_030 - EXISTS chronic
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM patient_conditions pc WHERE pc.patient_id = p.id AND pc.condition_status = 'chronic') ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_030 - Group chronic
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_conditions pc ON p.id = pc.patient_id WHERE pc.condition_status = 'chronic' GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_031 - AVG stay days
```sql
SELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400), 2) AS avg_length_of_stay_days FROM admissions WHERE admission_status = 'discharged' AND discharge_at IS NOT NULL;
```

### ✅ PASS : HOSPITAL_031 - CTE stay avg
```sql
WITH discharged_stays AS (
  SELECT EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400 AS stay_days
  FROM admissions
  WHERE admission_status = 'discharged'
    AND discharge_at IS NOT NULL
)
SELECT ROUND(AVG(stay_days), 2) AS avg_length_of_stay_days
FROM discharged_stays;
```

### ✅ PASS : HOSPITAL_031 - Cast before round
```sql
SELECT ROUND(AVG(EXTRACT(EPOCH FROM (discharge_at - admitted_at)) / 86400)::numeric, 2) AS avg_length_of_stay_days FROM admissions WHERE admission_status = 'discharged' AND discharge_at IS NOT NULL;
```

### ✅ PASS : HOSPITAL_032 - Count by date
```sql
SELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY DATE(registered_at) ORDER BY registration_date ASC;
```

### ✅ PASS : HOSPITAL_032 - Cast date
```sql
SELECT registered_at::date AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY registered_at::date ORDER BY registration_date ASC;
```

### ✅ PASS : HOSPITAL_032 - CTE daily regs
```sql
WITH daily_registrations AS ( SELECT DATE(registered_at) AS registration_date, COUNT(*) AS total_patients FROM patients GROUP BY DATE(registered_at) ) SELECT registration_date, total_patients FROM daily_registrations ORDER BY registration_date ASC;
```

### ✅ PASS : HOSPITAL_033 - SUM by method
```sql
SELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY total_revenue DESC, payment_method ASC;
```

### ✅ PASS : HOSPITAL_033 - FILTER sum
```sql
SELECT payment_method, ROUND(SUM(amount_paid) FILTER (WHERE payment_status = 'successful'), 2) AS total_revenue FROM payments GROUP BY payment_method ORDER BY total_revenue DESC, payment_method ASC;
```

### ✅ PASS : HOSPITAL_033 - CTE method sum
```sql
WITH method_revenue AS ( SELECT payment_method, ROUND(SUM(amount_paid), 2) AS total_revenue FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ) SELECT payment_method, total_revenue FROM method_revenue ORDER BY total_revenue DESC, payment_method ASC;
```

### ✅ PASS : HOSPITAL_034 - LEFT JOIN count
```sql
SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s LEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ORDER BY total_doctors DESC, s.id ASC;
```

### ✅ PASS : HOSPITAL_034 - INNER JOIN count
```sql
SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ORDER BY total_doctors DESC, s.id ASC;
```

### ✅ PASS : HOSPITAL_034 - CTE spec count
```sql
WITH specialization_counts AS ( SELECT s.id AS specialization_id, s.name AS specialization_name, COUNT(ds.doctor_id) AS total_doctors FROM specializations s LEFT JOIN doctor_specializations ds ON s.id = ds.specialization_id GROUP BY s.id, s.name ) SELECT specialization_id, specialization_name, total_doctors FROM specialization_counts ORDER BY total_doctors DESC, specialization_id ASC;
```

### ✅ PASS : HOSPITAL_035 - Count completed
```sql
SELECT COUNT(*) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed';
```

### ✅ PASS : HOSPITAL_035 - Count ids
```sql
SELECT COUNT(id) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed';
```

### ✅ PASS : HOSPITAL_035 - CTE proc count
```sql
WITH completed_proc_count AS ( SELECT COUNT(*) AS completed_procedures FROM procedure_orders WHERE procedure_status = 'completed' ) SELECT completed_procedures FROM completed_proc_count;
```

### ✅ PASS : HOSPITAL_036 - Count by day
```sql
SELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY DATE(scheduled_start_at) ORDER BY appointment_date ASC;
```

### ✅ PASS : HOSPITAL_036 - Cast day
```sql
SELECT scheduled_start_at::date AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY scheduled_start_at::date ORDER BY appointment_date ASC;
```

### ✅ PASS : HOSPITAL_036 - CTE daily appts
```sql
WITH daily_appointments AS ( SELECT DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS total_appointments FROM appointments GROUP BY DATE(scheduled_start_at) ) SELECT appointment_date, total_appointments FROM daily_appointments ORDER BY appointment_date ASC;
```

### ✅ PASS : HOSPITAL_037 - Top completed
```sql
SELECT doctor_id, COUNT(*) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;
```

### ✅ PASS : HOSPITAL_037 - CTE top docs
```sql
WITH doctor_completed_counts AS ( SELECT doctor_id, COUNT(*) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) SELECT doctor_id, completed_appointments FROM doctor_completed_counts ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;
```

### ✅ PASS : HOSPITAL_037 - Count ids top
```sql
SELECT doctor_id, COUNT(id) AS completed_appointments FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ORDER BY completed_appointments DESC, doctor_id ASC LIMIT 5;
```

### ✅ PASS : HOSPITAL_038 - Join revenue
```sql
SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ORDER BY total_revenue DESC, e.department_id ASC;
```

### ✅ PASS : HOSPITAL_038 - CTE dept revenue
```sql
WITH department_revenue AS ( SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ) SELECT department_id, total_revenue FROM department_revenue ORDER BY total_revenue DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_038 - Subquery revenue
```sql
SELECT department_id, total_revenue FROM ( SELECT e.department_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id GROUP BY e.department_id ) x ORDER BY total_revenue DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_039 - HAVING count
```sql
SELECT patient_id, COUNT(*) AS admission_count FROM admissions GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY admission_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_039 - CTE multi admit
```sql
WITH patient_admission_counts AS ( SELECT patient_id, COUNT(*) AS admission_count FROM admissions GROUP BY patient_id ) SELECT patient_id, admission_count FROM patient_admission_counts WHERE admission_count > 1 ORDER BY admission_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_039 - Count ids
```sql
SELECT patient_id, COUNT(id) AS admission_count FROM admissions GROUP BY patient_id HAVING COUNT(id) > 1 ORDER BY admission_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_040 - AVG wait mins
```sql
SELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60), 2) AS avg_wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL GROUP BY doctor_id ORDER BY avg_wait_time_mins DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_040 - CTE wait avg
```sql
WITH doctor_waits AS (
  SELECT doctor_id, EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60 AS wait_mins
  FROM appointments
  WHERE consultation_started_at IS NOT NULL
)
SELECT doctor_id, ROUND(AVG(wait_mins), 2) AS avg_wait_time_mins
FROM doctor_waits
GROUP BY doctor_id
ORDER BY avg_wait_time_mins DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_040 - Cast before round
```sql
SELECT doctor_id, ROUND(AVG(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60)::numeric, 2) AS avg_wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL GROUP BY doctor_id ORDER BY avg_wait_time_mins DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_041 - CASE rate
```sql
SELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ORDER BY no_show_rate_pct DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_041 - FILTER rate
```sql
SELECT doctor_id, ROUND(100.0 * COUNT(*) FILTER (WHERE appointment_status = 'no_show') / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ORDER BY no_show_rate_pct DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_041 - CTE rate
```sql
WITH doctor_rates AS ( SELECT doctor_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'no_show' THEN 1 ELSE 0 END) / COUNT(*), 2) AS no_show_rate_pct FROM appointments GROUP BY doctor_id ) SELECT doctor_id, no_show_rate_pct FROM doctor_rates ORDER BY no_show_rate_pct DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_042 - LEFT JOIN beds
```sql
SELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied' GROUP BY r.id, r.room_number ORDER BY occupied_beds DESC, r.id ASC;
```

### ✅ PASS : HOSPITAL_042 - CASE count
```sql
SELECT r.id AS room_id, r.room_number, SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY occupied_beds DESC, r.id ASC;
```

### ✅ PASS : HOSPITAL_042 - CTE room beds
```sql
WITH room_bed_counts AS ( SELECT r.id AS room_id, r.room_number, COUNT(b.id) AS occupied_beds FROM rooms r LEFT JOIN beds b ON r.id = b.room_id AND b.bed_status = 'occupied' GROUP BY r.id, r.room_number ) SELECT room_id, room_number, occupied_beds FROM room_bed_counts ORDER BY occupied_beds DESC, room_id ASC;
```

### ✅ PASS : HOSPITAL_043 - HAVING allergies
```sql
SELECT patient_id, COUNT(*) AS allergy_count FROM patient_allergies GROUP BY patient_id HAVING COUNT(*) > 1 ORDER BY allergy_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_043 - Count ids
```sql
SELECT patient_id, COUNT(id) AS allergy_count FROM patient_allergies GROUP BY patient_id HAVING COUNT(id) > 1 ORDER BY allergy_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_043 - CTE allergies
```sql
WITH allergy_totals AS ( SELECT patient_id, COUNT(*) AS allergy_count FROM patient_allergies GROUP BY patient_id ) SELECT patient_id, allergy_count FROM allergy_totals WHERE allergy_count > 1 ORDER BY allergy_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_044 - CASE approval
```sql
SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY approval_rate_pct DESC, ipr.id ASC;
```

### ✅ PASS : HOSPITAL_044 - FILTER approval
```sql
SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * COUNT(*) FILTER (WHERE ic.claim_status IN ('approved', 'partially_approved', 'settled')) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY approval_rate_pct DESC, ipr.id ASC;
```

### ✅ PASS : HOSPITAL_044 - CTE approval
```sql
WITH provider_approval_rates AS ( SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status IN ('approved', 'partially_approved', 'settled') THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS approval_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ) SELECT insurance_provider_id, provider_name, approval_rate_pct FROM provider_approval_rates ORDER BY approval_rate_pct DESC, insurance_provider_id ASC;
```

### ✅ PASS : HOSPITAL_045 - AVG turnaround
```sql
SELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600), 2) AS avg_turnaround_hours FROM lab_order_items loi JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE loi.sample_collected_at IS NOT NULL AND loi.completed_at IS NOT NULL GROUP BY ltc.id, ltc.test_name ORDER BY avg_turnaround_hours DESC, ltc.id ASC;
```

### ✅ PASS : HOSPITAL_045 - CTE turnaround
```sql
WITH item_turnaround AS (
  SELECT loi.test_id, EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600 AS turnaround_hours
  FROM lab_order_items loi
  WHERE loi.sample_collected_at IS NOT NULL
    AND loi.completed_at IS NOT NULL
)
SELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(it.turnaround_hours), 2) AS avg_turnaround_hours
FROM item_turnaround it
JOIN lab_test_catalog ltc ON it.test_id = ltc.id
GROUP BY ltc.id, ltc.test_name
ORDER BY avg_turnaround_hours DESC, ltc.id ASC;
```

### ✅ PASS : HOSPITAL_045 - Cast before round
```sql
SELECT ltc.id AS test_id, ltc.test_name, ROUND(AVG(EXTRACT(EPOCH FROM (loi.completed_at - loi.sample_collected_at)) / 3600)::numeric, 2) AS avg_turnaround_hours FROM lab_order_items loi JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE loi.sample_collected_at IS NOT NULL AND loi.completed_at IS NOT NULL GROUP BY ltc.id, ltc.test_name ORDER BY avg_turnaround_hours DESC, ltc.id ASC;
```

### ✅ PASS : HOSPITAL_046 - HAVING specs
```sql
SELECT doctor_id, COUNT(*) AS specialization_count FROM doctor_specializations GROUP BY doctor_id HAVING COUNT(*) > 1 ORDER BY specialization_count DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_046 - Count ids
```sql
SELECT doctor_id, COUNT(id) AS specialization_count FROM doctor_specializations GROUP BY doctor_id HAVING COUNT(id) > 1 ORDER BY specialization_count DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_046 - CTE specs
```sql
WITH doctor_spec_counts AS ( SELECT doctor_id, COUNT(*) AS specialization_count FROM doctor_specializations GROUP BY doctor_id ) SELECT doctor_id, specialization_count FROM doctor_spec_counts WHERE specialization_count > 1 ORDER BY specialization_count DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_047 - LEFT JOIN paid
```sql
SELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS outstanding_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY outstanding_amount DESC, i.id ASC;
```

### ✅ PASS : HOSPITAL_047 - FILTER paid
```sql
SELECT i.id, i.invoice_number, ROUND(i.total_amount - COALESCE(SUM(p.amount_paid) FILTER (WHERE p.payment_status = 'successful'), 0), 2) AS outstanding_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY outstanding_amount DESC, i.id ASC;
```

### ✅ PASS : HOSPITAL_047 - CTE outstanding
```sql
WITH invoice_paid_totals AS ( SELECT i.id, i.invoice_number, i.total_amount, COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0) AS paid_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ) SELECT id, invoice_number, ROUND(total_amount - paid_amount, 2) AS outstanding_amount FROM invoice_paid_totals ORDER BY outstanding_amount DESC, id ASC;
```

### ✅ PASS : HOSPITAL_048 - Month count
```sql
SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ORDER BY registration_month ASC;
```

### ✅ PASS : HOSPITAL_048 - CTE month count
```sql
WITH monthly_registrations AS ( SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ) SELECT registration_month, total_patients FROM monthly_registrations ORDER BY registration_month ASC;
```

### ✅ PASS : HOSPITAL_048 - Subquery month
```sql
SELECT registration_month, total_patients FROM ( SELECT DATE_TRUNC('month', registered_at) AS registration_month, COUNT(*) AS total_patients FROM patients GROUP BY DATE_TRUNC('month', registered_at) ) x ORDER BY registration_month ASC;
```

### ✅ PASS : HOSPITAL_049 - AVG admit days
```sql
SELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400), 2) AS avg_admission_days FROM admissions GROUP BY department_id ORDER BY avg_admission_days DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_049 - CTE admit avg
```sql
WITH admission_lengths AS (
  SELECT department_id, EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400 AS admission_days
  FROM admissions
)
SELECT department_id, ROUND(AVG(admission_days), 2) AS avg_admission_days
FROM admission_lengths
GROUP BY department_id
ORDER BY avg_admission_days DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_049 - Cast before round
```sql
SELECT department_id, ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(discharge_at, NOW()) - admitted_at)) / 86400)::numeric, 2) AS avg_admission_days FROM admissions GROUP BY department_id ORDER BY avg_admission_days DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_050 - Top billed
```sql
SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_050 - CTE top billed
```sql
WITH patient_billing AS ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ) SELECT patient_id, total_billed_amount FROM patient_billing ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_050 - Subquery top
```sql
SELECT patient_id, total_billed_amount FROM ( SELECT patient_id, ROUND(SUM(total_amount), 2) AS total_billed_amount FROM invoices GROUP BY patient_id ) x ORDER BY total_billed_amount DESC, patient_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_051 - EXISTS both
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM appointments a WHERE a.patient_id = p.id) AND EXISTS (SELECT 1 FROM admissions ad WHERE ad.patient_id = p.id) ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_051 - Join distinct
```sql
SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN appointments a ON a.patient_id = p.id JOIN admissions ad ON ad.patient_id = p.id ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_051 - CTE both ids
```sql
WITH appointment_patients AS ( SELECT DISTINCT patient_id FROM appointments ), admission_patients AS ( SELECT DISTINCT patient_id FROM admissions ) SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN appointment_patients ap ON ap.patient_id = p.id JOIN admission_patients adp ON adp.patient_id = p.id ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_052 - AVG ratings
```sql
SELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating FROM patient_feedback WHERE doctor_id IS NOT NULL GROUP BY doctor_id ORDER BY avg_rating DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_052 - CTE avg
```sql
WITH doctor_feedback_avg AS ( SELECT doctor_id, ROUND(AVG(rating), 2) AS avg_rating FROM patient_feedback WHERE doctor_id IS NOT NULL GROUP BY doctor_id ) SELECT doctor_id, avg_rating FROM doctor_feedback_avg ORDER BY avg_rating DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_052 - Join doctor names
```sql
SELECT pf.doctor_id, ROUND(AVG(pf.rating), 2) AS avg_rating FROM patient_feedback pf JOIN doctors d ON d.id = pf.doctor_id GROUP BY pf.doctor_id ORDER BY avg_rating DESC, pf.doctor_id ASC;
```

### ✅ PASS : HOSPITAL_053 - Count meds
```sql
SELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ORDER BY prescription_count DESC, m.id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_053 - Count ids
```sql
SELECT m.id AS medication_id, m.generic_name, COUNT(pi.id) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ORDER BY prescription_count DESC, m.id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_053 - CTE top meds
```sql
WITH medication_counts AS ( SELECT m.id AS medication_id, m.generic_name, COUNT(*) AS prescription_count FROM prescription_items pi JOIN medications m ON pi.medication_id = m.id GROUP BY m.id, m.generic_name ) SELECT medication_id, generic_name, prescription_count FROM medication_counts ORDER BY prescription_count DESC, medication_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_054 - Join feedback
```sql
SELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating FROM appointments a JOIN patient_feedback pf ON a.id = pf.appointment_id WHERE a.appointment_status = 'completed' ORDER BY a.id ASC, pf.id ASC;
```

### ✅ PASS : HOSPITAL_054 - CTE completed
```sql
WITH completed_appointments AS ( SELECT id, appointment_number, patient_id, doctor_id FROM appointments WHERE appointment_status = 'completed' ) SELECT ca.id, ca.appointment_number, ca.patient_id, ca.doctor_id, pf.id AS feedback_id, pf.rating FROM completed_appointments ca JOIN patient_feedback pf ON ca.id = pf.appointment_id ORDER BY ca.id ASC, pf.id ASC;
```

### ✅ PASS : HOSPITAL_054 - EXISTS feedback
```sql
SELECT a.id, a.appointment_number, a.patient_id, a.doctor_id, pf.id AS feedback_id, pf.rating FROM appointments a JOIN patient_feedback pf ON a.id = pf.appointment_id WHERE a.appointment_status = 'completed' AND EXISTS (SELECT 1 FROM patient_feedback pf2 WHERE pf2.appointment_id = a.id) ORDER BY a.id ASC, pf.id ASC;
```

### ✅ PASS : HOSPITAL_055 - SUM hours
```sql
SELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600), 2) AS scheduled_hours FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;
```

### ✅ PASS : HOSPITAL_055 - CTE hours
```sql
WITH schedule_hours AS (
  SELECT doctor_id, day_of_week, EXTRACT(EPOCH FROM (end_time - start_time)) / 3600 AS hours_block
  FROM doctor_schedules
  WHERE is_active = true
)
SELECT doctor_id, day_of_week, ROUND(SUM(hours_block), 2) AS scheduled_hours
FROM schedule_hours
GROUP BY doctor_id, day_of_week
ORDER BY doctor_id ASC, day_of_week ASC;
```

### ✅ PASS : HOSPITAL_055 - Cast before round
```sql
SELECT doctor_id, day_of_week, ROUND(SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600)::numeric, 2) AS scheduled_hours FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;
```

### ✅ PASS : HOSPITAL_056 - Join severe
```sql
SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id WHERE pa.severity IN ('severe', 'critical') ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_056 - EXISTS severe
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS (SELECT 1 FROM patient_allergies pa WHERE pa.patient_id = p.id AND pa.severity IN ('severe', 'critical')) ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_056 - Group severe
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN patient_allergies pa ON p.id = pa.patient_id WHERE pa.severity IN ('severe', 'critical') GROUP BY p.id, p.patient_code, p.full_name ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_057 - SUM by type
```sql
SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ORDER BY total_revenue DESC, invoice_type ASC;
```

### ✅ PASS : HOSPITAL_057 - CTE type sum
```sql
WITH invoice_type_revenue AS ( SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ) SELECT invoice_type, total_revenue FROM invoice_type_revenue ORDER BY total_revenue DESC, invoice_type ASC;
```

### ✅ PASS : HOSPITAL_057 - Subquery sum
```sql
SELECT invoice_type, total_revenue FROM ( SELECT invoice_type, ROUND(SUM(total_amount), 2) AS total_revenue FROM invoices GROUP BY invoice_type ) x ORDER BY total_revenue DESC, invoice_type ASC;
```

### ✅ PASS : HOSPITAL_058 - LEFT JOIN active
```sql
SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a LEFT JOIN bed_allocations ba ON a.id = ba.admission_id AND ba.allocation_status = 'active' WHERE a.admission_status = 'admitted' AND ba.id IS NULL ORDER BY a.admitted_at ASC, a.id ASC;
```

### ✅ PASS : HOSPITAL_058 - NOT EXISTS bed
```sql
SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a WHERE a.admission_status = 'admitted' AND NOT EXISTS (SELECT 1 FROM bed_allocations ba WHERE ba.admission_id = a.id AND ba.allocation_status = 'active') ORDER BY a.admitted_at ASC, a.id ASC;
```

### ✅ PASS : HOSPITAL_058 - CTE no bed
```sql
WITH active_bed_allocations AS ( SELECT DISTINCT admission_id FROM bed_allocations WHERE allocation_status = 'active' ) SELECT a.id, a.admission_number, a.patient_id, a.department_id, a.admitted_at FROM admissions a LEFT JOIN active_bed_allocations aba ON aba.admission_id = a.id WHERE a.admission_status = 'admitted' AND aba.admission_id IS NULL ORDER BY a.admitted_at ASC, a.id ASC;
```

### ✅ PASS : HOSPITAL_059 - LEFT JOIN gaps
```sql
SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a LEFT JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to) WHERE ds.id IS NULL ORDER BY a.scheduled_start_at ASC, a.id ASC;
```

### ✅ PASS : HOSPITAL_059 - NOT EXISTS sched
```sql
SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a WHERE NOT EXISTS (SELECT 1 FROM doctor_schedules ds WHERE ds.doctor_id = a.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to)) ORDER BY a.scheduled_start_at ASC, a.id ASC;
```

### ✅ PASS : HOSPITAL_059 - CTE valid sched
```sql
WITH matched_appointments AS ( SELECT DISTINCT a.id FROM appointments a JOIN doctor_schedules ds ON a.doctor_id = ds.doctor_id AND ds.is_active = true AND ds.day_of_week = EXTRACT(DOW FROM a.scheduled_start_at) AND DATE(a.scheduled_start_at) >= ds.effective_from AND (ds.effective_to IS NULL OR DATE(a.scheduled_start_at) <= ds.effective_to) ) SELECT a.id, a.appointment_number, a.doctor_id, a.scheduled_start_at FROM appointments a LEFT JOIN matched_appointments ma ON ma.id = a.id WHERE ma.id IS NULL ORDER BY a.scheduled_start_at ASC, a.id ASC;
```

### ✅ PASS : HOSPITAL_060 - AVG delay
```sql
SELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400), 2) AS avg_collection_delay_days FROM invoices i JOIN payments p ON i.id = p.invoice_id WHERE i.issued_at IS NOT NULL AND p.payment_status = 'successful' AND p.paid_at IS NOT NULL;
```

### ✅ PASS : HOSPITAL_060 - CTE delay
```sql
WITH payment_delays AS (
  SELECT EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400 AS delay_days
  FROM invoices i
  JOIN payments p ON i.id = p.invoice_id
  WHERE i.issued_at IS NOT NULL
    AND p.payment_status = 'successful'
    AND p.paid_at IS NOT NULL
)
SELECT ROUND(AVG(delay_days), 2) AS avg_collection_delay_days
FROM payment_delays;
```

### ✅ PASS : HOSPITAL_060 - Cast before round
```sql
SELECT ROUND(AVG(EXTRACT(EPOCH FROM (p.paid_at - i.issued_at)) / 86400)::numeric, 2) AS avg_collection_delay_days FROM invoices i JOIN payments p ON i.id = p.invoice_id WHERE i.issued_at IS NOT NULL AND p.payment_status = 'successful' AND p.paid_at IS NOT NULL;
```

### ✅ PASS : HOSPITAL_061 - Count diagnoses
```sql
SELECT diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_061 - Count ids
```sql
SELECT diagnosis_name, COUNT(id) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_061 - CTE top dx
```sql
WITH diagnosis_counts AS ( SELECT diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses GROUP BY diagnosis_name ) SELECT diagnosis_name, diagnosis_count FROM diagnosis_counts ORDER BY diagnosis_count DESC, diagnosis_name ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_062 - Join abnormal
```sql
SELECT DISTINCT p.id, p.patient_code, p.full_name FROM patients p JOIN lab_orders lo ON p.id = lo.patient_id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low', 'critical') ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_062 - EXISTS abnormal
```sql
SELECT p.id, p.patient_code, p.full_name FROM patients p WHERE EXISTS ( SELECT 1 FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lo.patient_id = p.id AND lr.interpretation IN ('high', 'low', 'critical') ) ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_062 - CTE abnormal
```sql
WITH abnormal_patients AS ( SELECT DISTINCT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low', 'critical') ) SELECT p.id, p.patient_code, p.full_name FROM patients p JOIN abnormal_patients ap ON ap.patient_id = p.id ORDER BY p.id ASC;
```

### ✅ PASS : HOSPITAL_063 - Month revenue
```sql
SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ORDER BY payment_month ASC;
```

### ✅ PASS : HOSPITAL_063 - CTE month sum
```sql
WITH monthly_collection AS ( SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ) SELECT payment_month, total_collected_amount FROM monthly_collection ORDER BY payment_month ASC;
```

### ✅ PASS : HOSPITAL_063 - Subquery month
```sql
SELECT payment_month, total_collected_amount FROM ( SELECT DATE_TRUNC('month', paid_at) AS payment_month, ROUND(SUM(amount_paid), 2) AS total_collected_amount FROM payments WHERE payment_status = 'successful' AND paid_at IS NOT NULL GROUP BY DATE_TRUNC('month', paid_at) ) x ORDER BY payment_month ASC;
```

### ✅ PASS : HOSPITAL_064 - Join daily avg
```sql
SELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(slot_appointments.appointment_count), 2) AS avg_appointments_per_slot_day FROM doctor_schedules ds JOIN (SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at)) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week WHERE ds.is_active = true GROUP BY ds.doctor_id, ds.day_of_week ORDER BY ds.doctor_id ASC, ds.day_of_week ASC;
```

### ✅ PASS : HOSPITAL_064 - CTE daily avg
```sql
WITH slot_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at) ) SELECT ds.doctor_id, ds.day_of_week, ROUND(AVG(sa.appointment_count), 2) AS avg_appointments_per_slot_day FROM doctor_schedules ds JOIN slot_appointments sa ON ds.doctor_id = sa.doctor_id AND ds.day_of_week = sa.day_of_week WHERE ds.is_active = true GROUP BY ds.doctor_id, ds.day_of_week ORDER BY ds.doctor_id ASC, ds.day_of_week ASC;
```

### ✅ PASS : HOSPITAL_064 - Nested subquery
```sql
SELECT doctor_id, day_of_week, ROUND(AVG(appointment_count), 2) AS avg_appointments_per_slot_day FROM ( SELECT ds.doctor_id, ds.day_of_week, slot_appointments.appointment_count FROM doctor_schedules ds JOIN ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, DATE(scheduled_start_at) AS appointment_date, COUNT(*) AS appointment_count FROM appointments GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at), DATE(scheduled_start_at) ) slot_appointments ON ds.doctor_id = slot_appointments.doctor_id AND ds.day_of_week = slot_appointments.day_of_week WHERE ds.is_active = true ) x GROUP BY doctor_id, day_of_week ORDER BY doctor_id ASC, day_of_week ASC;
```

### ✅ PASS : HOSPITAL_065 - Count open
```sql
SELECT department_id, COUNT(*) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ORDER BY open_encounters DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_065 - Count ids
```sql
SELECT department_id, COUNT(id) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ORDER BY open_encounters DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_065 - CTE open
```sql
WITH open_counts AS ( SELECT department_id, COUNT(*) AS open_encounters FROM encounters WHERE encounter_status = 'open' GROUP BY department_id ) SELECT department_id, open_encounters FROM open_counts ORDER BY open_encounters DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_066 - Select split
```sql
SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ORDER BY total_amount DESC, id ASC;
```

### ✅ PASS : HOSPITAL_066 - CTE split
```sql
WITH invoice_split AS ( SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ) SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoice_split ORDER BY total_amount DESC, id ASC;
```

### ✅ PASS : HOSPITAL_066 - Subquery split
```sql
SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM ( SELECT id, invoice_number, total_amount, insurance_covered_amount, patient_payable_amount FROM invoices ) x ORDER BY total_amount DESC, id ASC;
```

### ✅ PASS : HOSPITAL_067 - Left join none
```sql
SELECT d.id, d.full_name, d.department_id FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id WHERE d.is_active = true GROUP BY d.id, d.full_name, d.department_id HAVING COUNT(a.id) = 0 ORDER BY d.id ASC;
```

### ✅ PASS : HOSPITAL_067 - NOT EXISTS docs
```sql
SELECT d.id, d.full_name, d.department_id FROM doctors d WHERE d.is_active = true AND NOT EXISTS (SELECT 1 FROM appointments a WHERE a.doctor_id = d.id) ORDER BY d.id ASC;
```

### ✅ PASS : HOSPITAL_067 - CTE no appts
```sql
WITH doctor_appointment_counts AS ( SELECT d.id, d.full_name, d.department_id, COUNT(a.id) AS appointment_count FROM doctors d LEFT JOIN appointments a ON d.id = a.doctor_id WHERE d.is_active = true GROUP BY d.id, d.full_name, d.department_id ) SELECT id, full_name, department_id FROM doctor_appointment_counts WHERE appointment_count = 0 ORDER BY id ASC;
```

### ✅ PASS : HOSPITAL_068 - CASE cancel rate
```sql
SELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ORDER BY cancellation_rate_pct DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_068 - FILTER cancel rate
```sql
SELECT department_id, ROUND(100.0 * COUNT(*) FILTER (WHERE appointment_status = 'cancelled') / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ORDER BY cancellation_rate_pct DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_068 - CTE cancel rate
```sql
WITH department_cancel_rates AS ( SELECT department_id, ROUND(100.0 * SUM(CASE WHEN appointment_status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS cancellation_rate_pct FROM appointments GROUP BY department_id ) SELECT department_id, cancellation_rate_pct FROM department_cancel_rates ORDER BY cancellation_rate_pct DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_069 - CASE completion
```sql
SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ORDER BY completion_rate_pct DESC, p.id ASC;
```

### ✅ PASS : HOSPITAL_069 - FILTER completion
```sql
SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * COUNT(*) FILTER (WHERE po.procedure_status = 'completed') / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ORDER BY completion_rate_pct DESC, p.id ASC;
```

### ✅ PASS : HOSPITAL_069 - CTE completion
```sql
WITH procedure_completion AS ( SELECT p.id AS procedure_id, p.procedure_name, ROUND(100.0 * SUM(CASE WHEN po.procedure_status = 'completed' THEN 1 ELSE 0 END) / COUNT(po.id), 2) AS completion_rate_pct FROM procedure_orders po JOIN procedures p ON po.procedure_id = p.id GROUP BY p.id, p.procedure_name ) SELECT procedure_id, procedure_name, completion_rate_pct FROM procedure_completion ORDER BY completion_rate_pct DESC, procedure_id ASC;
```

### ✅ PASS : HOSPITAL_070 - Count distinct types
```sql
SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id HAVING COUNT(DISTINCT encounter_type) > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_070 - CTE distinct types
```sql
WITH patient_type_counts AS ( SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id ) SELECT patient_id, distinct_encounter_types FROM patient_type_counts WHERE distinct_encounter_types > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_070 - Distinct subquery
```sql
SELECT patient_id, distinct_encounter_types FROM ( SELECT patient_id, COUNT(DISTINCT encounter_type) AS distinct_encounter_types FROM encounters GROUP BY patient_id ) x WHERE distinct_encounter_types > 1 ORDER BY distinct_encounter_types DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_071 - Top dept patients
```sql
SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ORDER BY total_patients DESC, department_id ASC LIMIT 5;
```

### ✅ PASS : HOSPITAL_071 - CTE top dept
```sql
WITH department_patient_counts AS ( SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ) SELECT department_id, total_patients FROM department_patient_counts ORDER BY total_patients DESC, department_id ASC LIMIT 5;
```

### ✅ PASS : HOSPITAL_071 - Subquery top dept
```sql
SELECT department_id, total_patients FROM ( SELECT department_id, COUNT(DISTINCT patient_id) AS total_patients FROM encounters WHERE department_id IS NOT NULL GROUP BY department_id ) x ORDER BY total_patients DESC, department_id ASC LIMIT 5;
```

### ✅ PASS : HOSPITAL_072 - CASE utilization
```sql
SELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY utilization_pct DESC, r.id ASC;
```

### ✅ PASS : HOSPITAL_072 - FILTER utilization
```sql
SELECT r.id AS room_id, r.room_number, ROUND(100.0 * COUNT(*) FILTER (WHERE b.bed_status = 'occupied') / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ORDER BY utilization_pct DESC, r.id ASC;
```

### ✅ PASS : HOSPITAL_072 - CTE utilization
```sql
WITH room_bed_utilization AS ( SELECT r.id AS room_id, r.room_number, ROUND(100.0 * SUM(CASE WHEN b.bed_status = 'occupied' THEN 1 ELSE 0 END) / COUNT(b.id), 2) AS utilization_pct FROM rooms r JOIN beds b ON r.id = b.room_id GROUP BY r.id, r.room_number ) SELECT room_id, room_number, utilization_pct FROM room_bed_utilization ORDER BY utilization_pct DESC, room_id ASC;
```

### ✅ PASS : HOSPITAL_073 - Top doctor revenue
```sql
SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_073 - CTE doctor rev
```sql
WITH doctor_revenue AS ( SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ) SELECT doctor_id, total_revenue FROM doctor_revenue ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_073 - Subquery doctor rev
```sql
SELECT doctor_id, total_revenue FROM ( SELECT e.attending_doctor_id AS doctor_id, ROUND(SUM(i.total_amount), 2) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.attending_doctor_id IS NOT NULL GROUP BY e.attending_doctor_id ) x ORDER BY total_revenue DESC, doctor_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_074 - HAVING no-shows
```sql
SELECT patient_id, COUNT(*) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id HAVING COUNT(*) > 2 ORDER BY no_show_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_074 - CTE no-shows
```sql
WITH patient_no_show_counts AS ( SELECT patient_id, COUNT(*) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id ) SELECT patient_id, no_show_count FROM patient_no_show_counts WHERE no_show_count > 2 ORDER BY no_show_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_074 - Count ids
```sql
SELECT patient_id, COUNT(id) AS no_show_count FROM appointments WHERE appointment_status = 'no_show' GROUP BY patient_id HAVING COUNT(id) > 2 ORDER BY no_show_count DESC, patient_id ASC;
```

### ✅ PASS : HOSPITAL_075 - CASE rejection
```sql
SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;
```

### ✅ PASS : HOSPITAL_075 - FILTER rejection
```sql
SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * COUNT(*) FILTER (WHERE ic.claim_status = 'rejected') / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;
```

### ✅ PASS : HOSPITAL_075 - CTE rejection
```sql
WITH provider_rejection_rates AS ( SELECT ipr.id AS insurance_provider_id, ipr.provider_name, ROUND(100.0 * SUM(CASE WHEN ic.claim_status = 'rejected' THEN 1 ELSE 0 END) / COUNT(ic.id), 2) AS rejection_rate_pct FROM insurance_claims ic JOIN insurance_policies ip ON ic.insurance_policy_id = ip.id JOIN insurance_providers ipr ON ip.insurance_provider_id = ipr.id GROUP BY ipr.id, ipr.provider_name ) SELECT insurance_provider_id, provider_name, rejection_rate_pct FROM provider_rejection_rates ORDER BY rejection_rate_pct DESC, insurance_provider_id ASC;
```

### ✅ PASS : HOSPITAL_076 - Row num top dx
```sql
WITH diagnosis_counts AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, d.diagnosis_name ASC) AS rn FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ) SELECT department_id, diagnosis_name, diagnosis_count FROM diagnosis_counts WHERE rn = 1 ORDER BY department_id ASC;
```

### ✅ PASS : HOSPITAL_076 - Dense rank top
```sql
WITH diagnosis_counts AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count, DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, d.diagnosis_name ASC) AS rk FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ) SELECT department_id, diagnosis_name, diagnosis_count FROM diagnosis_counts WHERE rk = 1 ORDER BY department_id ASC;
```

### ✅ PASS : HOSPITAL_076 - Two-step row num
```sql
WITH diagnosis_totals AS ( SELECT e.department_id, d.diagnosis_name, COUNT(*) AS diagnosis_count FROM diagnoses d JOIN encounters e ON d.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, d.diagnosis_name ), ranked_diagnoses AS ( SELECT department_id, diagnosis_name, diagnosis_count, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY diagnosis_count DESC, diagnosis_name ASC) AS rn FROM diagnosis_totals ) SELECT department_id, diagnosis_name, diagnosis_count FROM ranked_diagnoses WHERE rn = 1 ORDER BY department_id ASC;
```

### ✅ PASS : HOSPITAL_077 - Top current stay
```sql
SELECT id, patient_id, admitted_at, ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days FROM admissions WHERE admission_status = 'admitted' ORDER BY stay_days DESC, id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_077 - CTE current stay
```sql
WITH current_stays AS (
  SELECT id, patient_id, admitted_at,
         ROUND(EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400, 2) AS stay_days
  FROM admissions
  WHERE admission_status = 'admitted'
)
SELECT id, patient_id, admitted_at, stay_days
FROM current_stays
ORDER BY stay_days DESC, id ASC
LIMIT 10;
```

### ✅ PASS : HOSPITAL_077 - Cast before round
```sql
SELECT id, patient_id, admitted_at, ROUND((EXTRACT(EPOCH FROM (NOW() - admitted_at)) / 86400)::numeric, 2) AS stay_days FROM admissions WHERE admission_status = 'admitted' ORDER BY stay_days DESC, id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_078 - CTE utilization
```sql
WITH scheduled_slots AS ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ), completed_appts AS ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) SELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM scheduled_slots s LEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id ORDER BY utilization_ratio DESC, s.doctor_id ASC;
```

### ✅ PASS : HOSPITAL_078 - Subquery utilization
```sql
SELECT s.doctor_id, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ) s LEFT JOIN ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ) c ON s.doctor_id = c.doctor_id ORDER BY utilization_ratio DESC, s.doctor_id ASC;
```

### ✅ PASS : HOSPITAL_078 - CTE with columns
```sql
WITH scheduled_slots AS ( SELECT doctor_id, COUNT(*) * AVG(max_patients_per_slot) AS total_slots FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id ), completed_appts AS ( SELECT doctor_id, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id ), utilization AS ( SELECT s.doctor_id, COALESCE(c.completed_count, 0) AS completed_count, s.total_slots, ROUND(COALESCE(c.completed_count, 0)::numeric / NULLIF(s.total_slots, 0), 2) AS utilization_ratio FROM scheduled_slots s LEFT JOIN completed_appts c ON s.doctor_id = c.doctor_id ) SELECT doctor_id, utilization_ratio FROM utilization ORDER BY utilization_ratio DESC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_079 - Lead readmit
```sql
WITH ordered_admissions AS ( SELECT patient_id, admitted_at, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL ) SELECT patient_id, discharge_at, next_admission_at FROM ordered_admissions WHERE next_admission_at <= discharge_at + INTERVAL '30 days' ORDER BY patient_id ASC, discharge_at ASC;
```

### ✅ PASS : HOSPITAL_079 - CTE readmits
```sql
WITH ordered_admissions AS ( SELECT patient_id, admitted_at, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL ), readmissions AS ( SELECT patient_id, discharge_at, next_admission_at FROM ordered_admissions WHERE next_admission_at <= discharge_at + INTERVAL '30 days' ) SELECT patient_id, discharge_at, next_admission_at FROM readmissions ORDER BY patient_id ASC, discharge_at ASC;
```

### ✅ PASS : HOSPITAL_080 - Row number month
```sql
WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rn FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ) SELECT billing_month, patient_id, total_revenue FROM monthly_patient_revenue WHERE rn = 1 ORDER BY billing_month ASC;
```

### ✅ PASS : HOSPITAL_080 - Dense rank month
```sql
WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue, DENSE_RANK() OVER (PARTITION BY DATE_TRUNC('month', created_at) ORDER BY SUM(total_amount) DESC, patient_id ASC) AS rk FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ) SELECT billing_month, patient_id, total_revenue FROM monthly_patient_revenue WHERE rk = 1 ORDER BY billing_month ASC;
```

### ✅ PASS : HOSPITAL_080 - CTE max month
```sql
WITH monthly_patient_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS billing_month, patient_id, SUM(total_amount) AS total_revenue FROM invoices GROUP BY DATE_TRUNC('month', created_at), patient_id ), max_month_revenue AS ( SELECT billing_month, MAX(total_revenue) AS max_revenue FROM monthly_patient_revenue GROUP BY billing_month ) SELECT mpr.billing_month, mpr.patient_id, mpr.total_revenue FROM monthly_patient_revenue mpr JOIN max_month_revenue mmr ON mpr.billing_month = mmr.billing_month AND mpr.total_revenue = mmr.max_revenue ORDER BY mpr.billing_month ASC, mpr.patient_id ASC;
```

### ✅ PASS : HOSPITAL_081 - Top occupied dept
```sql
WITH department_bed_usage AS ( SELECT r.department_id, COUNT(*) AS occupied_beds, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, r.department_id ASC) AS rn FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ) SELECT department_id, occupied_beds FROM department_bed_usage WHERE rn = 1;
```

### ✅ PASS : HOSPITAL_081 - Limit top dept
```sql
SELECT r.department_id, COUNT(*) AS occupied_beds FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ORDER BY occupied_beds DESC, r.department_id ASC LIMIT 1;
```

### ✅ PASS : HOSPITAL_081 - CTE max dept
```sql
WITH department_bed_counts AS ( SELECT r.department_id, COUNT(*) AS occupied_beds FROM beds b JOIN rooms r ON b.room_id = r.id WHERE b.bed_status = 'occupied' AND r.department_id IS NOT NULL GROUP BY r.department_id ), max_beds AS ( SELECT MAX(occupied_beds) AS max_occupied_beds FROM department_bed_counts ) SELECT dbc.department_id, dbc.occupied_beds FROM department_bed_counts dbc JOIN max_beds mb ON dbc.occupied_beds = mb.max_occupied_beds ORDER BY dbc.department_id ASC LIMIT 1;
```

### ✅ PASS : HOSPITAL_082 - LAG critical
```sql
WITH patient_lab_results AS ( SELECT lo.patient_id, lr.resulted_at, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ) SELECT DISTINCT patient_id FROM patient_lab_results WHERE interpretation = 'critical' AND prev_interpretation = 'critical' ORDER BY patient_id ASC;
```

### ✅ PASS : HOSPITAL_082 - Row pair self join
```sql
WITH ordered_results AS ( SELECT lo.patient_id, lr.id, lr.resulted_at, lr.interpretation, ROW_NUMBER() OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS rn FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ) SELECT DISTINCT r1.patient_id FROM ordered_results r1 JOIN ordered_results r2 ON r1.patient_id = r2.patient_id AND r2.rn = r1.rn + 1 WHERE r1.interpretation = 'critical' AND r2.interpretation = 'critical' ORDER BY r1.patient_id ASC;
```

### ✅ PASS : HOSPITAL_082 - CTE previous flag
```sql
WITH patient_lab_results AS ( SELECT lo.patient_id, lr.resulted_at, lr.id, lr.interpretation, LAG(lr.interpretation) OVER (PARTITION BY lo.patient_id ORDER BY lr.resulted_at, lr.id) AS prev_interpretation FROM lab_results lr JOIN lab_order_items loi ON lr.lab_order_item_id = loi.id JOIN lab_orders lo ON loi.lab_order_id = lo.id ), critical_pairs AS ( SELECT patient_id FROM patient_lab_results WHERE interpretation = 'critical' AND prev_interpretation = 'critical' ) SELECT DISTINCT patient_id FROM critical_pairs ORDER BY patient_id ASC;
```

### ✅ PASS : HOSPITAL_083 - Rank dept revenue
```sql
WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_083 - Rank with rownum
```sql
WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_083 - CTE max join rank
```sql
WITH doctor_department_revenue AS ( SELECT e.department_id, e.attending_doctor_id AS doctor_id, SUM(i.total_amount) AS total_revenue FROM encounters e JOIN invoices i ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL AND e.attending_doctor_id IS NOT NULL GROUP BY e.department_id, e.attending_doctor_id ) SELECT department_id, doctor_id, total_revenue, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY total_revenue DESC, doctor_id ASC) AS revenue_rank FROM doctor_department_revenue ORDER BY department_id ASC, revenue_rank ASC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_084 - Top wait per doc
```sql
WITH doctor_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC) AS rn FROM appointments WHERE consultation_started_at IS NOT NULL ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM doctor_waits WHERE rn = 1 ORDER BY doctor_id ASC;
```

### ✅ PASS : HOSPITAL_084 - Dense rank wait
```sql
WITH doctor_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins, DENSE_RANK() OVER (PARTITION BY doctor_id ORDER BY EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) DESC, id ASC) AS rk FROM appointments WHERE consultation_started_at IS NOT NULL ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM doctor_waits WHERE rk = 1 ORDER BY doctor_id ASC, id ASC;
```

### ✅ PASS : HOSPITAL_084 - Two-step row num
```sql
WITH appointment_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, ROUND(EXTRACT(EPOCH FROM (consultation_started_at - scheduled_start_at)) / 60, 2) AS wait_time_mins FROM appointments WHERE consultation_started_at IS NOT NULL ), ranked_waits AS ( SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY wait_time_mins DESC, id ASC) AS rn FROM appointment_waits ) SELECT id, doctor_id, patient_id, scheduled_start_at, consultation_started_at, wait_time_mins FROM ranked_waits WHERE rn = 1 ORDER BY doctor_id ASC;
```

### ✅ PASS : HOSPITAL_085 - Join underpay
```sql
SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ORDER BY i.insurance_covered_amount DESC, ic.approved_amount ASC, ic.id ASC;
```

### ✅ PASS : HOSPITAL_085 - CTE underpay
```sql
WITH claim_shortfalls AS ( SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ) SELECT id, claim_number, invoice_id, insurance_covered_amount, approved_amount FROM claim_shortfalls ORDER BY insurance_covered_amount DESC, approved_amount ASC, id ASC;
```

### ✅ PASS : HOSPITAL_085 - Subquery underpay
```sql
SELECT id, claim_number, invoice_id, insurance_covered_amount, approved_amount FROM ( SELECT ic.id, ic.claim_number, ic.invoice_id, i.insurance_covered_amount, ic.approved_amount FROM insurance_claims ic JOIN invoices i ON ic.invoice_id = i.id WHERE ic.approved_amount < i.insurance_covered_amount ) x ORDER BY insurance_covered_amount DESC, approved_amount ASC, id ASC;
```

### ✅ PASS : HOSPITAL_086 - LAG encounter gap
```sql
WITH ordered_encounters AS ( SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at FROM encounters ) SELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days FROM ordered_encounters WHERE previous_encounter_at IS NOT NULL ORDER BY patient_id ASC, started_at ASC;
```

### ✅ PASS : HOSPITAL_086 - Self join gap
```sql
SELECT e2.patient_id, e2.id AS encounter_id, MAX(e1.started_at) AS previous_encounter_at, e2.started_at, ROUND(EXTRACT(EPOCH FROM (e2.started_at - MAX(e1.started_at))) / 86400, 2) AS gap_days FROM encounters e2 JOIN encounters e1 ON e1.patient_id = e2.patient_id AND (e1.started_at < e2.started_at OR (e1.started_at = e2.started_at AND e1.id < e2.id)) GROUP BY e2.patient_id, e2.id, e2.started_at ORDER BY e2.patient_id ASC, e2.started_at ASC;
```

### ✅ PASS : HOSPITAL_086 - CTE gap calc
```sql
WITH ordered_encounters AS ( SELECT patient_id, id AS encounter_id, started_at, LAG(started_at) OVER (PARTITION BY patient_id ORDER BY started_at, id) AS previous_encounter_at FROM encounters ), encounter_gaps AS ( SELECT patient_id, encounter_id, previous_encounter_at, started_at, ROUND(EXTRACT(EPOCH FROM (started_at - previous_encounter_at)) / 86400, 2) AS gap_days FROM ordered_encounters WHERE previous_encounter_at IS NOT NULL ) SELECT patient_id, encounter_id, previous_encounter_at, started_at, gap_days FROM encounter_gaps ORDER BY patient_id ASC, started_at ASC;
```

### ✅ PASS : HOSPITAL_087 - Top med per doc
```sql
WITH doctor_medication_counts AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count, ROW_NUMBER() OVER (PARTITION BY p.doctor_id ORDER BY COUNT(*) DESC, pi.medication_id ASC) AS rn FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ) SELECT doctor_id, medication_id, prescription_count FROM doctor_medication_counts WHERE rn = 1 ORDER BY doctor_id ASC;
```

### ✅ PASS : HOSPITAL_087 - Dense rank med
```sql
WITH doctor_medication_counts AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count, DENSE_RANK() OVER (PARTITION BY p.doctor_id ORDER BY COUNT(*) DESC, pi.medication_id ASC) AS rk FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ) SELECT doctor_id, medication_id, prescription_count FROM doctor_medication_counts WHERE rk = 1 ORDER BY doctor_id ASC;
```

### ✅ PASS : HOSPITAL_087 - Two-step row num
```sql
WITH medication_totals AS ( SELECT p.doctor_id, pi.medication_id, COUNT(*) AS prescription_count FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id, pi.medication_id ), ranked_medications AS ( SELECT doctor_id, medication_id, prescription_count, ROW_NUMBER() OVER (PARTITION BY doctor_id ORDER BY prescription_count DESC, medication_id ASC) AS rn FROM medication_totals ) SELECT doctor_id, medication_id, prescription_count FROM ranked_medications WHERE rn = 1 ORDER BY doctor_id ASC;
```

### ✅ PASS : HOSPITAL_088 - Outside coverage
```sql
SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id WHERE DATE(i.created_at) < ip.coverage_start_date OR (ip.coverage_end_date IS NOT NULL AND DATE(i.created_at) > ip.coverage_end_date) ORDER BY i.created_at ASC, i.id ASC;
```

### ✅ PASS : HOSPITAL_088 - NOT between dates
```sql
SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id WHERE NOT (DATE(i.created_at) >= ip.coverage_start_date AND (ip.coverage_end_date IS NULL OR DATE(i.created_at) <= ip.coverage_end_date)) ORDER BY i.created_at ASC, i.id ASC;
```

### ✅ PASS : HOSPITAL_088 - CTE invalid policy
```sql
WITH invoice_policy_dates AS ( SELECT i.id, i.invoice_number, i.patient_id, i.insurance_policy_id, i.created_at, ip.coverage_start_date, ip.coverage_end_date FROM invoices i JOIN insurance_policies ip ON i.insurance_policy_id = ip.id ) SELECT id, invoice_number, patient_id, insurance_policy_id, created_at, coverage_start_date, coverage_end_date FROM invoice_policy_dates WHERE DATE(created_at) < coverage_start_date OR (coverage_end_date IS NOT NULL AND DATE(created_at) > coverage_end_date) ORDER BY created_at ASC, id ASC;
```

### ✅ PASS : HOSPITAL_089 - Lead readmit rate
```sql
WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ) SELECT department_id, ROUND(100.0 * SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) / COUNT(*), 2) AS readmission_rate_pct FROM readmission_flags GROUP BY department_id ORDER BY readmission_rate_pct DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_089 - FILTER readmit rate
```sql
WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ) SELECT department_id, ROUND(100.0 * COUNT(*) FILTER (WHERE next_admission_at <= discharge_at + INTERVAL '30 days') / COUNT(*), 2) AS readmission_rate_pct FROM readmission_flags GROUP BY department_id ORDER BY readmission_rate_pct DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_089 - CTE flagged rate
```sql
WITH readmission_flags AS ( SELECT department_id, patient_id, discharge_at, LEAD(admitted_at) OVER (PARTITION BY patient_id ORDER BY admitted_at) AS next_admission_at FROM admissions WHERE discharge_at IS NOT NULL AND department_id IS NOT NULL ), department_readmits AS ( SELECT department_id, SUM(CASE WHEN next_admission_at <= discharge_at + INTERVAL '30 days' THEN 1 ELSE 0 END) AS readmit_count, COUNT(*) AS total_cases FROM readmission_flags GROUP BY department_id ) SELECT department_id, ROUND(100.0 * readmit_count / total_cases, 2) AS readmission_rate_pct FROM department_readmits ORDER BY readmission_rate_pct DESC, department_id ASC;
```

### ✅ PASS : HOSPITAL_090 - Lag growth
```sql
WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ), revenue_with_prev AS ( SELECT department_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ) SELECT department_id, revenue_month, total_revenue, prev_month_revenue, ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth FROM revenue_with_prev WHERE prev_month_revenue IS NOT NULL ORDER BY department_id ASC, revenue_month ASC;
```

### ✅ PASS : HOSPITAL_090 - CTE growth
```sql
WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ), revenue_with_prev AS ( SELECT department_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY department_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ), growth_calc AS ( SELECT department_id, revenue_month, total_revenue, prev_month_revenue, ROUND(total_revenue - prev_month_revenue, 2) AS revenue_growth FROM revenue_with_prev WHERE prev_month_revenue IS NOT NULL ) SELECT department_id, revenue_month, total_revenue, prev_month_revenue, revenue_growth FROM growth_calc ORDER BY department_id ASC, revenue_month ASC;
```

### ✅ PASS : HOSPITAL_090 - Row num self join
```sql
WITH monthly_revenue AS ( SELECT e.department_id, DATE_TRUNC('month', i.created_at) AS revenue_month, SUM(i.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY DATE_TRUNC('month', i.created_at)) AS rn FROM invoices i JOIN encounters e ON i.encounter_id = e.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, DATE_TRUNC('month', i.created_at) ) SELECT cur.department_id, cur.revenue_month, cur.total_revenue, prev.total_revenue AS prev_month_revenue, ROUND(cur.total_revenue - prev.total_revenue, 2) AS revenue_growth FROM monthly_revenue cur JOIN monthly_revenue prev ON cur.department_id = prev.department_id AND cur.rn = prev.rn + 1 ORDER BY cur.department_id ASC, cur.revenue_month ASC;
```

### ✅ PASS : HOSPITAL_091 - CTE overbook
```sql
WITH schedule_capacity AS ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ), completed_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ) SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count FROM schedule_capacity sc LEFT JOIN completed_appointments ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week WHERE COALESCE(ca.completed_count, 0) > sc.total_capacity ORDER BY completed_count DESC, sc.doctor_id ASC, sc.day_of_week ASC;
```

### ✅ PASS : HOSPITAL_091 - Subquery overbook
```sql
SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count FROM ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ) sc LEFT JOIN ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ) ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week WHERE COALESCE(ca.completed_count, 0) > sc.total_capacity ORDER BY completed_count DESC, sc.doctor_id ASC, sc.day_of_week ASC;
```

### ✅ PASS : HOSPITAL_091 - CTE gap column
```sql
WITH schedule_capacity AS ( SELECT doctor_id, day_of_week, SUM(max_patients_per_slot) AS total_capacity FROM doctor_schedules WHERE is_active = true GROUP BY doctor_id, day_of_week ), completed_appointments AS ( SELECT doctor_id, EXTRACT(DOW FROM scheduled_start_at) AS day_of_week, COUNT(*) AS completed_count FROM appointments WHERE appointment_status = 'completed' GROUP BY doctor_id, EXTRACT(DOW FROM scheduled_start_at) ), overbooked AS ( SELECT sc.doctor_id, sc.day_of_week, sc.total_capacity, COALESCE(ca.completed_count, 0) AS completed_count, COALESCE(ca.completed_count, 0) - sc.total_capacity AS overbook_gap FROM schedule_capacity sc LEFT JOIN completed_appointments ca ON sc.doctor_id = ca.doctor_id AND sc.day_of_week = ca.day_of_week ) SELECT doctor_id, day_of_week, total_capacity, completed_count FROM overbooked WHERE overbook_gap > 0 ORDER BY completed_count DESC, doctor_id ASC, day_of_week ASC;
```

### ✅ PASS : HOSPITAL_092 - Distinct interp
```sql
SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low') GROUP BY lo.patient_id HAVING COUNT(DISTINCT lr.interpretation) = 2 ORDER BY lo.patient_id ASC;
```

### ✅ PASS : HOSPITAL_092 - CTE interp set
```sql
WITH patient_interpretations AS ( SELECT lo.patient_id, lr.interpretation FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation IN ('high', 'low') GROUP BY lo.patient_id, lr.interpretation ) SELECT patient_id FROM patient_interpretations GROUP BY patient_id HAVING COUNT(*) = 2 ORDER BY patient_id ASC;
```

### ✅ PASS : HOSPITAL_092 - Self join result types
```sql
SELECT DISTINCT h.patient_id FROM ( SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation = 'high' ) h JOIN ( SELECT lo.patient_id FROM lab_orders lo JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_results lr ON loi.id = lr.lab_order_item_id WHERE lr.interpretation = 'low' ) l ON h.patient_id = l.patient_id ORDER BY h.patient_id ASC;
```

### ✅ PASS : HOSPITAL_093 - Count transfers
```sql
SELECT admission_id, COUNT(*) AS allocation_count FROM bed_allocations GROUP BY admission_id HAVING COUNT(*) > 1 ORDER BY allocation_count DESC, admission_id ASC;
```

### ✅ PASS : HOSPITAL_093 - Count ids
```sql
SELECT admission_id, COUNT(id) AS allocation_count FROM bed_allocations GROUP BY admission_id HAVING COUNT(id) > 1 ORDER BY allocation_count DESC, admission_id ASC;
```

### ✅ PASS : HOSPITAL_093 - CTE transfer count
```sql
WITH admission_allocations AS ( SELECT admission_id, COUNT(*) AS allocation_count FROM bed_allocations GROUP BY admission_id ) SELECT admission_id, allocation_count FROM admission_allocations WHERE allocation_count > 1 ORDER BY allocation_count DESC, admission_id ASC;
```

### ✅ PASS : HOSPITAL_094 - Rank med diversity
```sql
WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ) SELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ORDER BY diversity_rank ASC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_094 - Row number diversity
```sql
WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ) SELECT doctor_id, distinct_medications, ROW_NUMBER() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ORDER BY diversity_rank ASC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_094 - CTE plus rank
```sql
WITH doctor_medication_diversity AS ( SELECT p.doctor_id, COUNT(DISTINCT pi.medication_id) AS distinct_medications FROM prescriptions p JOIN prescription_items pi ON p.id = pi.prescription_id WHERE p.doctor_id IS NOT NULL GROUP BY p.doctor_id ), ranked_diversity AS ( SELECT doctor_id, distinct_medications, DENSE_RANK() OVER (ORDER BY distinct_medications DESC, doctor_id ASC) AS diversity_rank FROM doctor_medication_diversity ) SELECT doctor_id, distinct_medications, diversity_rank FROM ranked_diversity ORDER BY diversity_rank ASC, doctor_id ASC;
```

### ✅ PASS : HOSPITAL_095 - First last BMI
```sql
WITH bmi_history AS ( SELECT patient_id, recorded_at, bmi, FIRST_VALUE(bmi) OVER (PARTITION BY patient_id ORDER BY recorded_at, id) AS first_bmi, LAST_VALUE(bmi) OVER (PARTITION BY patient_id ORDER BY recorded_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_bmi FROM vital_signs WHERE bmi IS NOT NULL ) SELECT DISTINCT patient_id, first_bmi, last_bmi FROM bmi_history WHERE last_bmi > first_bmi ORDER BY patient_id ASC;
```

### ✅ PASS : HOSPITAL_095 - Ranked BMI
```sql
WITH ranked_bmi AS ( SELECT patient_id, bmi, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at, id) AS rn_first, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, id DESC) AS rn_last FROM vital_signs WHERE bmi IS NOT NULL ), first_last AS ( SELECT f.patient_id, f.bmi AS first_bmi, l.bmi AS last_bmi FROM ranked_bmi f JOIN ranked_bmi l ON f.patient_id = l.patient_id WHERE f.rn_first = 1 AND l.rn_last = 1 ) SELECT patient_id, first_bmi, last_bmi FROM first_last WHERE last_bmi > first_bmi ORDER BY patient_id ASC;
```

### ✅ PASS : HOSPITAL_095 - Two CTE ranks
```sql
WITH first_bmi AS ( SELECT patient_id, bmi AS first_bmi FROM ( SELECT patient_id, bmi, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at ASC, id ASC) AS rn FROM vital_signs WHERE bmi IS NOT NULL ) x WHERE rn = 1 ), last_bmi AS ( SELECT patient_id, bmi AS last_bmi FROM ( SELECT patient_id, bmi, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY recorded_at DESC, id DESC) AS rn FROM vital_signs WHERE bmi IS NOT NULL ) x WHERE rn = 1 ) SELECT f.patient_id, f.first_bmi, l.last_bmi FROM first_bmi f JOIN last_bmi l ON f.patient_id = l.patient_id WHERE l.last_bmi > f.first_bmi ORDER BY f.patient_id ASC;
```

### ✅ PASS : HOSPITAL_096 - Top procedure revenue
```sql
SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ORDER BY total_revenue DESC, po.procedure_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_096 - CTE proc revenue
```sql
WITH procedure_revenue AS ( SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ) SELECT procedure_id, total_revenue FROM procedure_revenue ORDER BY total_revenue DESC, procedure_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_096 - Subquery proc revenue
```sql
SELECT procedure_id, total_revenue FROM ( SELECT po.procedure_id, ROUND(SUM(ii.line_total), 2) AS total_revenue FROM invoice_items ii JOIN procedure_orders po ON ii.item_reference_id = po.id WHERE ii.item_type = 'procedure' GROUP BY po.procedure_id ) x ORDER BY total_revenue DESC, procedure_id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_097 - Overlap pairs
```sql
WITH policy_pairs AS ( SELECT ip1.patient_id, ip1.id AS policy_id_1, ip2.id AS policy_id_2, ip1.coverage_start_date AS start_1, ip1.coverage_end_date AS end_1, ip2.coverage_start_date AS start_2, ip2.coverage_end_date AS end_2 FROM insurance_policies ip1 JOIN insurance_policies ip2 ON ip1.patient_id = ip2.patient_id AND ip1.id < ip2.id ) SELECT DISTINCT patient_id FROM policy_pairs WHERE COALESCE(end_1, DATE '9999-12-31') >= start_2 AND COALESCE(end_2, DATE '9999-12-31') >= start_1 ORDER BY patient_id ASC;
```

### ✅ PASS : HOSPITAL_097 - Self join overlap
```sql
SELECT DISTINCT ip1.patient_id FROM insurance_policies ip1 JOIN insurance_policies ip2 ON ip1.patient_id = ip2.patient_id AND ip1.id < ip2.id WHERE COALESCE(ip1.coverage_end_date, DATE '9999-12-31') >= ip2.coverage_start_date AND COALESCE(ip2.coverage_end_date, DATE '9999-12-31') >= ip1.coverage_start_date ORDER BY ip1.patient_id ASC;
```

### ✅ PASS : HOSPITAL_097 - CTE normalized dates
```sql
WITH normalized_policies AS ( SELECT id, patient_id, coverage_start_date, COALESCE(coverage_end_date, DATE '9999-12-31') AS coverage_end_date FROM insurance_policies ) SELECT DISTINCT np1.patient_id FROM normalized_policies np1 JOIN normalized_policies np2 ON np1.patient_id = np2.patient_id AND np1.id < np2.id WHERE np1.coverage_end_date >= np2.coverage_start_date AND np2.coverage_end_date >= np1.coverage_start_date ORDER BY np1.patient_id ASC;
```

### ✅ PASS : HOSPITAL_098 - EXISTS follow-up
```sql
WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ), followups AS ( SELECT cc.id AS appointment_id, CASE WHEN EXISTS ( SELECT 1 FROM appointments a2 WHERE a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at ) THEN 1 ELSE 0 END AS has_followup FROM completed_consults cc ) SELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct FROM followups;
```

### ✅ PASS : HOSPITAL_098 - Left join follow-up
```sql
WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ) SELECT ROUND(100.0 * COUNT(DISTINCT CASE WHEN a2.id IS NOT NULL THEN cc.id END) / COUNT(DISTINCT cc.id), 2) AS follow_up_conversion_rate_pct FROM completed_consults cc LEFT JOIN appointments a2 ON a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at;
```

### ✅ PASS : HOSPITAL_098 - CTE flagged follow-up
```sql
WITH completed_consults AS ( SELECT id, patient_id, doctor_id, scheduled_start_at FROM appointments WHERE appointment_status = 'completed' AND appointment_type = 'consultation' ), flagged AS ( SELECT cc.id, cc.patient_id, cc.doctor_id, cc.scheduled_start_at, MAX(CASE WHEN a2.id IS NOT NULL THEN 1 ELSE 0 END) AS has_followup FROM completed_consults cc LEFT JOIN appointments a2 ON a2.patient_id = cc.patient_id AND a2.doctor_id = cc.doctor_id AND a2.appointment_type = 'follow_up' AND a2.scheduled_start_at > cc.scheduled_start_at GROUP BY cc.id, cc.patient_id, cc.doctor_id, cc.scheduled_start_at ) SELECT ROUND(100.0 * SUM(has_followup) / COUNT(*), 2) AS follow_up_conversion_rate_pct FROM flagged;
```

### ✅ PASS : HOSPITAL_099 - Top test cat
```sql
WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, ROW_NUMBER() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rn FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ) SELECT department_id, test_category, total_tests FROM category_counts WHERE rn = 1 ORDER BY department_id ASC;
```

### ✅ PASS : HOSPITAL_099 - Dense rank cat
```sql
WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests, DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY COUNT(*) DESC, ltc.test_category ASC) AS rk FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ) SELECT department_id, test_category, total_tests FROM category_counts WHERE rk = 1 ORDER BY department_id ASC;
```

### ✅ PASS : HOSPITAL_099 - CTE max cat
```sql
WITH category_counts AS ( SELECT e.department_id, ltc.test_category, COUNT(*) AS total_tests FROM lab_orders lo JOIN encounters e ON lo.encounter_id = e.id JOIN lab_order_items loi ON lo.id = loi.lab_order_id JOIN lab_test_catalog ltc ON loi.test_id = ltc.id WHERE e.department_id IS NOT NULL GROUP BY e.department_id, ltc.test_category ), max_counts AS ( SELECT department_id, MAX(total_tests) AS max_total_tests FROM category_counts GROUP BY department_id ) SELECT cc.department_id, cc.test_category, cc.total_tests FROM category_counts cc JOIN max_counts mc ON cc.department_id = mc.department_id AND cc.total_tests = mc.max_total_tests ORDER BY cc.department_id ASC, cc.test_category ASC;
```

### ✅ PASS : HOSPITAL_100 - Top amount gap
```sql
SELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0), 2) AS amount_gap FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY amount_gap DESC, i.id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_100 - FILTER amount gap
```sql
SELECT i.id, i.invoice_number, i.total_amount, ROUND(i.total_amount - COALESCE(SUM(p.amount_paid) FILTER (WHERE p.payment_status = 'successful'), 0), 2) AS amount_gap FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ORDER BY amount_gap DESC, i.id ASC LIMIT 10;
```

### ✅ PASS : HOSPITAL_100 - CTE gap top
```sql
WITH invoice_paid_totals AS ( SELECT i.id, i.invoice_number, i.total_amount, COALESCE(SUM(CASE WHEN p.payment_status = 'successful' THEN p.amount_paid ELSE 0 END), 0) AS paid_amount FROM invoices i LEFT JOIN payments p ON i.id = p.invoice_id GROUP BY i.id, i.invoice_number, i.total_amount ) SELECT id, invoice_number, total_amount, ROUND(total_amount - paid_amount, 2) AS amount_gap FROM invoice_paid_totals ORDER BY amount_gap DESC, id ASC LIMIT 10;
```

