# Solutions Evaluation Report (bank)

**Summary:**
- Total Approaches: 300
- Passed: 300
- Failed: 0

## Detailed Results
### ✅ PASS : BANK_001 - COUNT rows
```sql
SELECT COUNT(*) AS total_users FROM users;
```

### ✅ PASS : BANK_001 - COUNT ids
```sql
SELECT COUNT(id) AS total_users FROM users;
```

### ✅ PASS : BANK_001 - CTE count
```sql
WITH user_count AS (
  SELECT COUNT(*) AS total_users
  FROM users
)
SELECT total_users
FROM user_count;
```

### ✅ PASS : BANK_002 - Filter then count
```sql
SELECT COUNT(*) AS active_users FROM users WHERE is_active = true;
```

### ✅ PASS : BANK_002 - Boolean shorthand
```sql
SELECT COUNT(*) AS active_users FROM users WHERE is_active;
```

### ✅ PASS : BANK_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_users FROM users;
```

### ✅ PASS : BANK_003 - Verified count
```sql
SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = true;
```

### ✅ PASS : BANK_003 - Boolean filter
```sql
SELECT COUNT(*) AS verified_users FROM users WHERE is_verified;
```

### ✅ PASS : BANK_003 - SUM case
```sql
SELECT SUM(CASE WHEN is_verified = true THEN 1 ELSE 0 END) AS verified_users FROM users;
```

### ✅ PASS : BANK_004 - Filter active branches
```sql
SELECT branch_code, branch_name, city, country FROM branches WHERE is_active = true ORDER BY branch_code ASC;
```

### ✅ PASS : BANK_004 - Boolean shorthand
```sql
SELECT branch_code, branch_name, city, country FROM branches WHERE is_active ORDER BY branch_code ASC;
```

### ✅ PASS : BANK_004 - CTE active branches
```sql
WITH active_branches AS (
  SELECT branch_code, branch_name, city, country
  FROM branches
  WHERE is_active = true
)
SELECT branch_code, branch_name, city, country
FROM active_branches
ORDER BY branch_code ASC;
```

### ✅ PASS : BANK_005 - Filter savings
```sql
SELECT id, product_name, currency, minimum_balance, interest_rate FROM account_products WHERE product_type = 'savings' ORDER BY id ASC;
```

### ✅ PASS : BANK_005 - CTE savings
```sql
WITH savings_products AS (
  SELECT id, product_name, currency, minimum_balance, interest_rate
  FROM account_products
  WHERE product_type = 'savings'
)
SELECT id, product_name, currency, minimum_balance, interest_rate
FROM savings_products
ORDER BY id ASC;
```

### ✅ PASS : BANK_005 - CASE filter
```sql
SELECT id, product_name, currency, minimum_balance, interest_rate FROM account_products WHERE CASE WHEN product_type = 'savings' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : BANK_006 - Count active accounts
```sql
SELECT COUNT(*) AS active_accounts FROM accounts WHERE account_status = 'active';
```

### ✅ PASS : BANK_006 - COUNT ids
```sql
SELECT COUNT(id) AS active_accounts FROM accounts WHERE account_status = 'active';
```

### ✅ PASS : BANK_006 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE account_status = 'active') AS active_accounts FROM accounts;
```

### ✅ PASS : BANK_007 - Date filter
```sql
SELECT id, masked_card_number, card_type, network, expires_at FROM cards WHERE expires_at < DATE '2027-01-01' ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : BANK_007 - CTE expiring cards
```sql
WITH expiring_cards AS (
  SELECT id, masked_card_number, card_type, network, expires_at
  FROM cards
  WHERE expires_at < DATE '2027-01-01'
)
SELECT id, masked_card_number, card_type, network, expires_at
FROM expiring_cards
ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : BANK_007 - Interval compare
```sql
SELECT id, masked_card_number, card_type, network, expires_at FROM cards WHERE expires_at <= DATE '2026-12-31' ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : BANK_008 - Filter pending KYC
```sql
SELECT id, user_id, verification_level, submitted_at FROM kyc_records WHERE kyc_status = 'pending' ORDER BY id ASC;
```

### ✅ PASS : BANK_008 - CTE pending KYC
```sql
WITH pending_kyc AS (
  SELECT id, user_id, verification_level, submitted_at
  FROM kyc_records
  WHERE kyc_status = 'pending'
)
SELECT id, user_id, verification_level, submitted_at
FROM pending_kyc
ORDER BY id ASC;
```

### ✅ PASS : BANK_008 - CASE filter
```sql
SELECT id, user_id, verification_level, submitted_at FROM kyc_records WHERE CASE WHEN kyc_status = 'pending' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : BANK_009 - Filter failed
```sql
SELECT transaction_ref, account_id, amount, initiated_at FROM transactions WHERE transaction_status = 'failed' ORDER BY initiated_at DESC, transaction_ref ASC;
```

### ✅ PASS : BANK_009 - CTE failed txns
```sql
WITH failed_transactions AS (
  SELECT transaction_ref, account_id, amount, initiated_at
  FROM transactions
  WHERE transaction_status = 'failed'
)
SELECT transaction_ref, account_id, amount, initiated_at
FROM failed_transactions
ORDER BY initiated_at DESC, transaction_ref ASC;
```

### ✅ PASS : BANK_009 - Subquery filter
```sql
SELECT transaction_ref, account_id, amount, initiated_at FROM ( SELECT transaction_ref, account_id, amount, initiated_at FROM transactions WHERE transaction_status = 'failed' ) t ORDER BY initiated_at DESC, transaction_ref ASC;
```

### ✅ PASS : BANK_010 - Filter open alerts
```sql
SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM fraud_alerts WHERE alert_status = 'open' ORDER BY detected_at DESC, alert_ref ASC;
```

### ✅ PASS : BANK_010 - CTE open alerts
```sql
WITH open_alerts AS (
  SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at
  FROM fraud_alerts
  WHERE alert_status = 'open'
)
SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at
FROM open_alerts
ORDER BY detected_at DESC, alert_ref ASC;
```

### ✅ PASS : BANK_010 - Subquery alerts
```sql
SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM ( SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM fraud_alerts WHERE alert_status = 'open' ) f ORDER BY detected_at DESC, alert_ref ASC;
```

### ✅ PASS : BANK_011 - Filter inactive
```sql
SELECT id, full_name, email, phone, country, created_at FROM users WHERE is_active = false ORDER BY id ASC;
```

### ✅ PASS : BANK_011 - NOT boolean
```sql
SELECT id, full_name, email, phone, country, created_at FROM users WHERE NOT is_active ORDER BY id ASC;
```

### ✅ PASS : BANK_011 - CTE inactive
```sql
WITH inactive_users AS (
  SELECT id, full_name, email, phone, country, created_at
  FROM users
  WHERE is_active = false
)
SELECT id, full_name, email, phone, country, created_at
FROM inactive_users
ORDER BY id ASC;
```

### ✅ PASS : BANK_012 - Count blocked
```sql
SELECT COUNT(*) AS blocked_cards FROM cards WHERE card_status = 'blocked';
```

### ✅ PASS : BANK_012 - COUNT ids
```sql
SELECT COUNT(id) AS blocked_cards FROM cards WHERE card_status = 'blocked';
```

### ✅ PASS : BANK_012 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE card_status = 'blocked') AS blocked_cards FROM cards;
```

### ✅ PASS : BANK_013 - Filter active ATMs
```sql
SELECT atm_code, city, country, installed_at FROM atm_machines WHERE atm_status = 'active' ORDER BY atm_code ASC;
```

### ✅ PASS : BANK_013 - CTE ATMs
```sql
WITH active_atms AS (
  SELECT atm_code, city, country, installed_at
  FROM atm_machines
  WHERE atm_status = 'active'
)
SELECT atm_code, city, country, installed_at
FROM active_atms
ORDER BY atm_code ASC;
```

### ✅ PASS : BANK_013 - Subquery ATMs
```sql
SELECT atm_code, city, country, installed_at FROM ( SELECT atm_code, city, country, installed_at FROM atm_machines WHERE atm_status = 'active' ) a ORDER BY atm_code ASC;
```

### ✅ PASS : BANK_014 - Filter domestic
```sql
SELECT id, user_id, beneficiary_name, bank_name, account_number, country FROM beneficiaries WHERE beneficiary_type = 'domestic_external' ORDER BY id ASC;
```

### ✅ PASS : BANK_014 - CTE domestic
```sql
WITH domestic_beneficiaries AS (
  SELECT id, user_id, beneficiary_name, bank_name, account_number, country
  FROM beneficiaries
  WHERE beneficiary_type = 'domestic_external'
)
SELECT id, user_id, beneficiary_name, bank_name, account_number, country
FROM domestic_beneficiaries
ORDER BY id ASC;
```

### ✅ PASS : BANK_014 - CASE filter
```sql
SELECT id, user_id, beneficiary_name, bank_name, account_number, country FROM beneficiaries WHERE CASE WHEN beneficiary_type = 'domestic_external' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : BANK_015 - Filter rejected
```sql
SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM loan_applications WHERE application_status = 'rejected' ORDER BY decision_at DESC, application_ref ASC;
```

### ✅ PASS : BANK_015 - CTE rejected
```sql
WITH rejected_applications AS (
  SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at
  FROM loan_applications
  WHERE application_status = 'rejected'
)
SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at
FROM rejected_applications
ORDER BY decision_at DESC, application_ref ASC;
```

### ✅ PASS : BANK_015 - Subquery rejected
```sql
SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM ( SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM loan_applications WHERE application_status = 'rejected' ) la ORDER BY decision_at DESC, application_ref ASC;
```

### ✅ PASS : BANK_016 - Count closed loans
```sql
SELECT COUNT(*) AS closed_loans FROM loans WHERE loan_status = 'closed';
```

### ✅ PASS : BANK_016 - COUNT ids
```sql
SELECT COUNT(id) AS closed_loans FROM loans WHERE loan_status = 'closed';
```

### ✅ PASS : BANK_016 - SUM case
```sql
SELECT SUM(CASE WHEN loan_status = 'closed' THEN 1 ELSE 0 END) AS closed_loans FROM loans;
```

### ✅ PASS : BANK_017 - Filter active billers
```sql
SELECT id, biller_name, biller_category, country FROM billers WHERE is_active = true ORDER BY biller_name ASC, id ASC;
```

### ✅ PASS : BANK_017 - Boolean shorthand
```sql
SELECT id, biller_name, biller_category, country FROM billers WHERE is_active ORDER BY biller_name ASC, id ASC;
```

### ✅ PASS : BANK_017 - CTE billers
```sql
WITH active_billers AS (
  SELECT id, biller_name, biller_category, country
  FROM billers
  WHERE is_active = true
)
SELECT id, biller_name, biller_category, country
FROM active_billers
ORDER BY biller_name ASC, id ASC;
```

### ✅ PASS : BANK_018 - IN severity
```sql
SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at FROM fraud_alerts WHERE severity IN ('high', 'critical') ORDER BY detected_at DESC, alert_ref ASC;
```

### ✅ PASS : BANK_018 - OR filter
```sql
SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at FROM fraud_alerts WHERE severity = 'high' OR severity = 'critical' ORDER BY detected_at DESC, alert_ref ASC;
```

### ✅ PASS : BANK_018 - CTE severity
```sql
WITH severe_alerts AS (
  SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at
  FROM fraud_alerts
  WHERE severity IN ('high', 'critical')
)
SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at
FROM severe_alerts
ORDER BY detected_at DESC, alert_ref ASC;
```

### ✅ PASS : BANK_019 - Country filter
```sql
SELECT id, full_name, email, phone, city FROM users WHERE country = 'India' ORDER BY id ASC;
```

### ✅ PASS : BANK_019 - CTE India
```sql
WITH india_users AS (
  SELECT id, full_name, email, phone, city
  FROM users
  WHERE country = 'India'
)
SELECT id, full_name, email, phone, city
FROM india_users
ORDER BY id ASC;
```

### ✅ PASS : BANK_019 - CASE filter
```sql
SELECT id, full_name, email, phone, city FROM users WHERE CASE WHEN country = 'India' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : BANK_020 - Filter open tickets
```sql
SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM support_tickets WHERE ticket_status = 'open' ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : BANK_020 - CTE tickets
```sql
WITH open_tickets AS (
  SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at
  FROM support_tickets
  WHERE ticket_status = 'open'
)
SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at
FROM open_tickets
ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : BANK_020 - Subquery tickets
```sql
SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM ( SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM support_tickets WHERE ticket_status = 'open' ) st ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : BANK_021 - Group and having
```sql
SELECT user_id, COUNT(*) AS account_count FROM accounts GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY account_count DESC, user_id ASC;
```

### ✅ PASS : BANK_021 - Count ids
```sql
SELECT user_id, COUNT(id) AS account_count FROM accounts GROUP BY user_id HAVING COUNT(id) > 1 ORDER BY account_count DESC, user_id ASC;
```

### ✅ PASS : BANK_021 - CTE accounts
```sql
WITH user_accounts AS (
  SELECT user_id, COUNT(*) AS account_count
  FROM accounts
  GROUP BY user_id
)
SELECT user_id, account_count
FROM user_accounts
WHERE account_count > 1
ORDER BY account_count DESC, user_id ASC;
```

### ✅ PASS : BANK_022 - Sum by user
```sql
SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ORDER BY total_balance DESC, user_id ASC;
```

### ✅ PASS : BANK_022 - CTE sum
```sql
WITH user_balances AS (
  SELECT user_id, SUM(current_balance) AS total_balance
  FROM accounts
  GROUP BY user_id
)
SELECT user_id, total_balance
FROM user_balances
ORDER BY total_balance DESC, user_id ASC;
```

### ✅ PASS : BANK_022 - Subquery sum
```sql
SELECT user_id, total_balance FROM ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) ub ORDER BY total_balance DESC, user_id ASC;
```

### ✅ PASS : BANK_023 - Group channels
```sql
SELECT channel, COUNT(*) AS transaction_count FROM transactions GROUP BY channel ORDER BY transaction_count DESC, channel ASC;
```

### ✅ PASS : BANK_023 - Count ids
```sql
SELECT channel, COUNT(id) AS transaction_count FROM transactions GROUP BY channel ORDER BY transaction_count DESC, channel ASC;
```

### ✅ PASS : BANK_023 - CTE channels
```sql
WITH channel_counts AS (
  SELECT channel, COUNT(*) AS transaction_count
  FROM transactions
  GROUP BY channel
)
SELECT channel, transaction_count
FROM channel_counts
ORDER BY transaction_count DESC, channel ASC;
```

### ✅ PASS : BANK_024 - AVG active
```sql
SELECT ROUND(AVG(current_balance), 2) AS avg_balance FROM accounts WHERE account_status = 'active';
```

### ✅ PASS : BANK_024 - CTE average
```sql
WITH active_accounts AS (
  SELECT current_balance
  FROM accounts
  WHERE account_status = 'active'
)
SELECT ROUND(AVG(current_balance), 2) AS avg_balance
FROM active_accounts;
```

### ✅ PASS : BANK_024 - Subquery avg
```sql
SELECT ROUND(AVG(current_balance), 2) AS avg_balance FROM ( SELECT current_balance FROM accounts WHERE account_status = 'active' ) a;
```

### ✅ PASS : BANK_025 - Group networks
```sql
SELECT network, COUNT(*) AS card_count FROM cards GROUP BY network ORDER BY card_count DESC, network ASC;
```

### ✅ PASS : BANK_025 - Count ids
```sql
SELECT network, COUNT(id) AS card_count FROM cards GROUP BY network ORDER BY card_count DESC, network ASC;
```

### ✅ PASS : BANK_025 - CTE networks
```sql
WITH network_counts AS (
  SELECT network, COUNT(*) AS card_count
  FROM cards
  GROUP BY network
)
SELECT network, card_count
FROM network_counts
ORDER BY card_count DESC, network ASC;
```

### ✅ PASS : BANK_026 - Group cities
```sql
SELECT city, COUNT(*) AS atm_count FROM atm_machines GROUP BY city ORDER BY atm_count DESC, city ASC;
```

### ✅ PASS : BANK_026 - Count ids
```sql
SELECT city, COUNT(id) AS atm_count FROM atm_machines GROUP BY city ORDER BY atm_count DESC, city ASC;
```

### ✅ PASS : BANK_026 - CTE cities
```sql
WITH city_atm_counts AS (
  SELECT city, COUNT(*) AS atm_count
  FROM atm_machines
  GROUP BY city
)
SELECT city, atm_count
FROM city_atm_counts
ORDER BY atm_count DESC, city ASC;
```

### ✅ PASS : BANK_027 - Sum fees
```sql
SELECT SUM(fee_amount) AS total_transfer_fees FROM transfers;
```

### ✅ PASS : BANK_027 - CTE fees
```sql
WITH fee_totals AS (
  SELECT SUM(fee_amount) AS total_transfer_fees
  FROM transfers
)
SELECT total_transfer_fees
FROM fee_totals;
```

### ✅ PASS : BANK_027 - Subquery fees
```sql
SELECT total_transfer_fees FROM ( SELECT SUM(fee_amount) AS total_transfer_fees FROM transfers ) t;
```

### ✅ PASS : BANK_028 - Count approved
```sql
SELECT COUNT(*) AS approved_applications FROM loan_applications WHERE application_status = 'approved';
```

### ✅ PASS : BANK_028 - COUNT ids
```sql
SELECT COUNT(id) AS approved_applications FROM loan_applications WHERE application_status = 'approved';
```

### ✅ PASS : BANK_028 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_applications FROM loan_applications;
```

### ✅ PASS : BANK_029 - Group status
```sql
SELECT fd_status, COUNT(*) AS fd_count FROM fixed_deposits GROUP BY fd_status ORDER BY fd_count DESC, fd_status ASC;
```

### ✅ PASS : BANK_029 - Count ids
```sql
SELECT fd_status, COUNT(id) AS fd_count FROM fixed_deposits GROUP BY fd_status ORDER BY fd_count DESC, fd_status ASC;
```

### ✅ PASS : BANK_029 - CTE status
```sql
WITH fd_status_counts AS (
  SELECT fd_status, COUNT(*) AS fd_count
  FROM fixed_deposits
  GROUP BY fd_status
)
SELECT fd_status, fd_count
FROM fd_status_counts
ORDER BY fd_count DESC, fd_status ASC;
```

### ✅ PASS : BANK_030 - Sum cashback
```sql
SELECT SUM(cashback_amount) AS total_cashback_redeemed FROM reward_redemptions;
```

### ✅ PASS : BANK_030 - CTE cashback
```sql
WITH cashback_totals AS (
  SELECT SUM(cashback_amount) AS total_cashback_redeemed
  FROM reward_redemptions
)
SELECT total_cashback_redeemed
FROM cashback_totals;
```

### ✅ PASS : BANK_030 - Subquery cashback
```sql
SELECT total_cashback_redeemed FROM ( SELECT SUM(cashback_amount) AS total_cashback_redeemed FROM reward_redemptions ) r;
```

### ✅ PASS : BANK_031 - Count open
```sql
SELECT COUNT(*) AS open_complaints FROM complaints WHERE complaint_status = 'open';
```

### ✅ PASS : BANK_031 - COUNT ids
```sql
SELECT COUNT(id) AS open_complaints FROM complaints WHERE complaint_status = 'open';
```

### ✅ PASS : BANK_031 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE complaint_status = 'open') AS open_complaints FROM complaints;
```

### ✅ PASS : BANK_032 - Group currency
```sql
SELECT currency, COUNT(*) AS account_count FROM accounts GROUP BY currency ORDER BY account_count DESC, currency ASC;
```

### ✅ PASS : BANK_032 - Count ids
```sql
SELECT currency, COUNT(id) AS account_count FROM accounts GROUP BY currency ORDER BY account_count DESC, currency ASC;
```

### ✅ PASS : BANK_032 - CTE currency
```sql
WITH currency_counts AS (
  SELECT currency, COUNT(*) AS account_count
  FROM accounts
  GROUP BY currency
)
SELECT currency, account_count
FROM currency_counts
ORDER BY account_count DESC, currency ASC;
```

### ✅ PASS : BANK_033 - AVG active loans
```sql
SELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount FROM loans WHERE loan_status = 'active';
```

### ✅ PASS : BANK_033 - CTE average
```sql
WITH active_loans AS (
  SELECT principal_amount
  FROM loans
  WHERE loan_status = 'active'
)
SELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount
FROM active_loans;
```

### ✅ PASS : BANK_033 - Subquery avg
```sql
SELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount FROM ( SELECT principal_amount FROM loans WHERE loan_status = 'active' ) l;
```

### ✅ PASS : BANK_034 - Group segment
```sql
SELECT customer_segment, COUNT(*) AS user_count FROM users GROUP BY customer_segment ORDER BY user_count DESC, customer_segment ASC;
```

### ✅ PASS : BANK_034 - Count ids
```sql
SELECT customer_segment, COUNT(id) AS user_count FROM users GROUP BY customer_segment ORDER BY user_count DESC, customer_segment ASC;
```

### ✅ PASS : BANK_034 - CTE segment
```sql
WITH segment_counts AS (
  SELECT customer_segment, COUNT(*) AS user_count
  FROM users
  GROUP BY customer_segment
)
SELECT customer_segment, user_count
FROM segment_counts
ORDER BY user_count DESC, customer_segment ASC;
```

### ✅ PASS : BANK_035 - Group card type
```sql
SELECT card_type, COUNT(*) AS card_count FROM cards GROUP BY card_type ORDER BY card_count DESC, card_type ASC;
```

### ✅ PASS : BANK_035 - Count ids
```sql
SELECT card_type, COUNT(id) AS card_count FROM cards GROUP BY card_type ORDER BY card_count DESC, card_type ASC;
```

### ✅ PASS : BANK_035 - CTE card type
```sql
WITH card_type_counts AS (
  SELECT card_type, COUNT(*) AS card_count
  FROM cards
  GROUP BY card_type
)
SELECT card_type, card_count
FROM card_type_counts
ORDER BY card_count DESC, card_type ASC;
```

### ✅ PASS : BANK_036 - Join verified KYC
```sql
SELECT u.id, u.full_name, k.verification_level, k.verified_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'verified' ORDER BY k.verified_at DESC, u.id ASC;
```

### ✅ PASS : BANK_036 - CTE verified KYC
```sql
WITH verified_kyc AS (
  SELECT user_id, verification_level, verified_at
  FROM kyc_records
  WHERE kyc_status = 'verified'
)
SELECT u.id, u.full_name, v.verification_level, v.verified_at
FROM users u
JOIN verified_kyc v ON u.id = v.user_id
ORDER BY v.verified_at DESC, u.id ASC;
```

### ✅ PASS : BANK_036 - Subquery verified
```sql
SELECT u.id, u.full_name, k.verification_level, k.verified_at FROM users u JOIN ( SELECT user_id, verification_level, verified_at FROM kyc_records WHERE kyc_status = 'verified' ) k ON u.id = k.user_id ORDER BY k.verified_at DESC, u.id ASC;
```

### ✅ PASS : BANK_037 - Join and sum
```sql
SELECT u.id, u.full_name, SUM(a.current_balance) AS total_balance FROM users u JOIN accounts a ON u.id = a.user_id GROUP BY u.id, u.full_name ORDER BY total_balance DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_037 - CTE balances
```sql
WITH user_balances AS (
  SELECT user_id, SUM(current_balance) AS total_balance
  FROM accounts
  GROUP BY user_id
)
SELECT u.id, u.full_name, ub.total_balance
FROM users u
JOIN user_balances ub ON u.id = ub.user_id
ORDER BY ub.total_balance DESC, u.id ASC
LIMIT 10;
```

### ✅ PASS : BANK_037 - Subquery balances
```sql
SELECT u.id, u.full_name, b.total_balance FROM users u JOIN ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) b ON u.id = b.user_id ORDER BY b.total_balance DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_038 - Left join count
```sql
SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count FROM branches b LEFT JOIN employees e ON b.id = e.branch_id GROUP BY b.id, b.branch_name ORDER BY employee_count DESC, b.id ASC;
```

### ✅ PASS : BANK_038 - CTE counts
```sql
WITH branch_employee_counts AS (
  SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count
  FROM branches b
  LEFT JOIN employees e ON b.id = e.branch_id
  GROUP BY b.id, b.branch_name
)
SELECT id, branch_name, employee_count
FROM branch_employee_counts
ORDER BY employee_count DESC, id ASC;
```

### ✅ PASS : BANK_038 - Subquery counts
```sql
SELECT id, branch_name, employee_count FROM ( SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count FROM branches b LEFT JOIN employees e ON b.id = e.branch_id GROUP BY b.id, b.branch_name ) bec ORDER BY employee_count DESC, id ASC;
```

### ✅ PASS : BANK_039 - Distinct join
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN fraud_alerts f ON u.id = f.user_id WHERE f.alert_status = 'open' ORDER BY u.id ASC;
```

### ✅ PASS : BANK_039 - EXISTS check
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM fraud_alerts f WHERE f.user_id = u.id AND f.alert_status = 'open' ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_039 - CTE open users
```sql
WITH open_alert_users AS (
  SELECT DISTINCT user_id
  FROM fraud_alerts
  WHERE alert_status = 'open' AND user_id IS NOT NULL
)
SELECT u.id, u.full_name
FROM users u
JOIN open_alert_users oau ON u.id = oau.user_id
ORDER BY u.id ASC;
```

### ✅ PASS : BANK_040 - Join pending EMI
```sql
SELECT l.id AS loan_id, SUM(r.total_due - r.total_paid) AS pending_amount FROM loans l JOIN loan_repayments r ON l.id = r.loan_id WHERE l.loan_status = 'active' AND r.repayment_status IN ('pending', 'partial', 'late') GROUP BY l.id ORDER BY pending_amount DESC, loan_id ASC;
```

### ✅ PASS : BANK_040 - CTE pending EMI
```sql
WITH pending_repayments AS (
  SELECT loan_id, total_due - total_paid AS pending_part
  FROM loan_repayments
  WHERE repayment_status IN ('pending', 'partial', 'late')
)
SELECT l.id AS loan_id, SUM(pr.pending_part) AS pending_amount
FROM loans l
JOIN pending_repayments pr ON l.id = pr.loan_id
WHERE l.loan_status = 'active'
GROUP BY l.id
ORDER BY pending_amount DESC, loan_id ASC;
```

### ✅ PASS : BANK_040 - CASE sum
```sql
SELECT l.id AS loan_id, SUM(CASE WHEN r.repayment_status IN ('pending', 'partial', 'late') THEN r.total_due - r.total_paid ELSE 0 END) AS pending_amount FROM loans l JOIN loan_repayments r ON l.id = r.loan_id WHERE l.loan_status = 'active' GROUP BY l.id HAVING SUM(CASE WHEN r.repayment_status IN ('pending', 'partial', 'late') THEN r.total_due - r.total_paid ELSE 0 END) > 0 ORDER BY pending_amount DESC, loan_id ASC;
```

### ✅ PASS : BANK_041 - Join and sum
```sql
SELECT u.id, u.full_name, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status IN ('authorized', 'settled') GROUP BY u.id, u.full_name ORDER BY total_card_spend DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_041 - CTE spend
```sql
WITH user_card_spend AS (
  SELECT a.user_id, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend
  FROM accounts a
  JOIN cards c ON a.id = c.account_id
  JOIN card_transactions ct ON c.id = ct.card_id
  WHERE ct.transaction_status IN ('authorized', 'settled')
  GROUP BY a.user_id
)
SELECT u.id, u.full_name, ucs.total_card_spend
FROM users u
JOIN user_card_spend ucs ON u.id = ucs.user_id
ORDER BY ucs.total_card_spend DESC, u.id ASC
LIMIT 10;
```

### ✅ PASS : BANK_041 - Subquery spend
```sql
SELECT u.id, u.full_name, s.total_card_spend FROM users u JOIN ( SELECT a.user_id, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend FROM accounts a JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status IN ('authorized', 'settled') GROUP BY a.user_id ) s ON u.id = s.user_id ORDER BY s.total_card_spend DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_042 - Join and having
```sql
SELECT u.id, u.full_name, COUNT(b.id) AS beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id GROUP BY u.id, u.full_name HAVING COUNT(b.id) > 3 ORDER BY beneficiary_count DESC, u.id ASC;
```

### ✅ PASS : BANK_042 - CTE counts
```sql
WITH user_beneficiary_counts AS (
  SELECT user_id, COUNT(*) AS beneficiary_count
  FROM beneficiaries
  GROUP BY user_id
)
SELECT u.id, u.full_name, ubc.beneficiary_count
FROM users u
JOIN user_beneficiary_counts ubc ON u.id = ubc.user_id
WHERE ubc.beneficiary_count > 3
ORDER BY ubc.beneficiary_count DESC, u.id ASC;
```

### ✅ PASS : BANK_042 - Subquery count
```sql
SELECT u.id, u.full_name, bc.beneficiary_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS beneficiary_count FROM beneficiaries GROUP BY user_id ) bc ON u.id = bc.user_id WHERE bc.beneficiary_count > 3 ORDER BY bc.beneficiary_count DESC, u.id ASC;
```

### ✅ PASS : BANK_043 - Join and sum
```sql
SELECT a.city, ROUND(SUM(t.amount), 2) AS total_withdrawn FROM atm_machines a JOIN atm_transactions t ON a.id = t.atm_id WHERE t.atm_transaction_type = 'cash_withdrawal' AND t.transaction_status = 'success' GROUP BY a.city ORDER BY total_withdrawn DESC, a.city ASC;
```

### ✅ PASS : BANK_043 - CTE withdrawals
```sql
WITH successful_withdrawals AS (
  SELECT atm_id, amount
  FROM atm_transactions
  WHERE atm_transaction_type = 'cash_withdrawal'
    AND transaction_status = 'success'
)
SELECT a.city, ROUND(SUM(sw.amount), 2) AS total_withdrawn
FROM atm_machines a
JOIN successful_withdrawals sw ON a.id = sw.atm_id
GROUP BY a.city
ORDER BY total_withdrawn DESC, a.city ASC;
```

### ✅ PASS : BANK_043 - Case sum
```sql
SELECT a.city, ROUND(SUM(CASE WHEN t.atm_transaction_type = 'cash_withdrawal' AND t.transaction_status = 'success' THEN t.amount ELSE 0 END), 2) AS total_withdrawn FROM atm_machines a JOIN atm_transactions t ON a.id = t.atm_id GROUP BY a.city ORDER BY total_withdrawn DESC, a.city ASC;
```

### ✅ PASS : BANK_044 - Case ratio
```sql
SELECT lp.id, lp.product_name, ROUND(100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY approval_rate DESC, lp.id ASC;
```

### ✅ PASS : BANK_044 - CTE rates
```sql
WITH product_rates AS (
  SELECT loan_product_id, ROUND(100.0 * SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate
  FROM loan_applications
  GROUP BY loan_product_id
)
SELECT lp.id, lp.product_name, pr.approval_rate
FROM loan_products lp
JOIN product_rates pr ON lp.id = pr.loan_product_id
ORDER BY pr.approval_rate DESC, lp.id ASC;
```

### ✅ PASS : BANK_044 - Filter aggregate
```sql
SELECT lp.id, lp.product_name, ROUND(100.0 * COUNT(*) FILTER (WHERE la.application_status = 'approved') / COUNT(*), 2) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY approval_rate DESC, lp.id ASC;
```

### ✅ PASS : BANK_045 - Join active accounts
```sql
SELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count FROM branches b JOIN accounts a ON b.id = a.primary_branch_id WHERE a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_account_count DESC, b.id ASC;
```

### ✅ PASS : BANK_045 - CTE active counts
```sql
WITH branch_active_accounts AS (
  SELECT primary_branch_id, COUNT(*) AS active_account_count
  FROM accounts
  WHERE account_status = 'active'
  GROUP BY primary_branch_id
)
SELECT b.id, b.branch_name, baa.active_account_count
FROM branches b
JOIN branch_active_accounts baa ON b.id = baa.primary_branch_id
ORDER BY baa.active_account_count DESC, b.id ASC;
```

### ✅ PASS : BANK_045 - Left join filter
```sql
SELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count FROM branches b LEFT JOIN accounts a ON b.id = a.primary_branch_id AND a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_account_count DESC, b.id ASC;
```

### ✅ PASS : BANK_046 - Month group
```sql
SELECT DATE_TRUNC('month', completed_at) AS transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount FROM transfers WHERE transfer_status = 'completed' GROUP BY DATE_TRUNC('month', completed_at) ORDER BY transfer_month ASC;
```

### ✅ PASS : BANK_046 - CTE monthly
```sql
WITH monthly_transfers AS (
  SELECT DATE_TRUNC('month', completed_at) AS transfer_month, amount
  FROM transfers
  WHERE transfer_status = 'completed'
)
SELECT transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount
FROM monthly_transfers
GROUP BY transfer_month
ORDER BY transfer_month ASC;
```

### ✅ PASS : BANK_046 - Subquery month
```sql
SELECT transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount FROM ( SELECT DATE_TRUNC('month', completed_at) AS transfer_month, amount FROM transfers WHERE transfer_status = 'completed' ) t GROUP BY transfer_month ORDER BY transfer_month ASC;
```

### ✅ PASS : BANK_047 - Distinct join
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN fixed_deposits fd ON u.id = fd.user_id WHERE fd.fd_status = 'active' ORDER BY u.id ASC;
```

### ✅ PASS : BANK_047 - Exists FD
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM fixed_deposits fd WHERE fd.user_id = u.id AND fd.fd_status = 'active' ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_047 - CTE active FD
```sql
WITH active_fd_users AS (
  SELECT DISTINCT user_id
  FROM fixed_deposits
  WHERE fd_status = 'active'
)
SELECT u.id, u.full_name
FROM users u
JOIN active_fd_users afu ON u.id = afu.user_id
ORDER BY u.id ASC;
```

### ✅ PASS : BANK_048 - Group merchants
```sql
SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend FROM card_transactions WHERE transaction_status = 'settled' GROUP BY merchant_name ORDER BY total_spend DESC, merchant_name ASC LIMIT 10;
```

### ✅ PASS : BANK_048 - CTE merchant sum
```sql
WITH merchant_spend AS (
  SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend
  FROM card_transactions
  WHERE transaction_status = 'settled'
  GROUP BY merchant_name
)
SELECT merchant_name, total_spend
FROM merchant_spend
ORDER BY total_spend DESC, merchant_name ASC
LIMIT 10;
```

### ✅ PASS : BANK_048 - Subquery merchant
```sql
SELECT merchant_name, total_spend FROM ( SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend FROM card_transactions WHERE transaction_status = 'settled' GROUP BY merchant_name ) ms ORDER BY total_spend DESC, merchant_name ASC LIMIT 10;
```

### ✅ PASS : BANK_049 - Pre-aggregate both
```sql
WITH earned AS ( SELECT user_id, SUM(points_earned) AS total_earned FROM reward_earnings GROUP BY user_id ), redeemed AS ( SELECT user_id, SUM(points_redeemed) AS total_redeemed FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance FROM users u LEFT JOIN earned e ON u.id = e.user_id LEFT JOIN redeemed r ON u.id = r.user_id ORDER BY reward_points_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_049 - Subquery totals
```sql
SELECT u.id, u.full_name, COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance FROM users u LEFT JOIN ( SELECT user_id, SUM(points_earned) AS total_earned FROM reward_earnings GROUP BY user_id ) e ON u.id = e.user_id LEFT JOIN ( SELECT user_id, SUM(points_redeemed) AS total_redeemed FROM reward_redemptions GROUP BY user_id ) r ON u.id = r.user_id ORDER BY reward_points_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_049 - Union summary
```sql
WITH reward_movements AS ( SELECT user_id, SUM(points_earned) AS earned_points, 0 AS redeemed_points FROM reward_earnings GROUP BY user_id UNION ALL SELECT user_id, 0 AS earned_points, SUM(points_redeemed) AS redeemed_points FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, COALESCE(SUM(rm.earned_points), 0) - COALESCE(SUM(rm.redeemed_points), 0) AS reward_points_balance FROM users u LEFT JOIN reward_movements rm ON u.id = rm.user_id GROUP BY u.id, u.full_name ORDER BY reward_points_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_050 - Distinct late join
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id WHERE lr.repayment_status = 'late' ORDER BY u.id ASC;
```

### ✅ PASS : BANK_050 - Exists late
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM loans l JOIN loan_repayments lr ON l.id = lr.loan_id WHERE l.borrower_user_id = u.id AND lr.repayment_status = 'late' ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_050 - CTE late users
```sql
WITH late_users AS ( SELECT DISTINCT l.borrower_user_id AS user_id FROM loans l JOIN loan_repayments lr ON l.id = lr.loan_id WHERE lr.repayment_status = 'late' ) SELECT u.id, u.full_name FROM users u JOIN late_users lu ON u.id = lu.user_id ORDER BY u.id ASC;
```

### ✅ PASS : BANK_051 - Join and avg
```sql
SELECT ap.id, ap.product_name, ROUND(AVG(a.current_balance), 2) AS avg_current_balance FROM account_products ap JOIN accounts a ON ap.id = a.product_id GROUP BY ap.id, ap.product_name ORDER BY avg_current_balance DESC, ap.id ASC;
```

### ✅ PASS : BANK_051 - CTE product avg
```sql
WITH product_balances AS (
  SELECT product_id, ROUND(AVG(current_balance), 2) AS avg_current_balance
  FROM accounts
  GROUP BY product_id
)
SELECT ap.id, ap.product_name, pb.avg_current_balance
FROM account_products ap
JOIN product_balances pb ON ap.id = pb.product_id
ORDER BY pb.avg_current_balance DESC, ap.id ASC;
```

### ✅ PASS : BANK_051 - Subquery avg
```sql
SELECT ap.id, ap.product_name, pb.avg_current_balance FROM account_products ap JOIN ( SELECT product_id, ROUND(AVG(current_balance), 2) AS avg_current_balance FROM accounts GROUP BY product_id ) pb ON ap.id = pb.product_id ORDER BY pb.avg_current_balance DESC, ap.id ASC;
```

### ✅ PASS : BANK_052 - Join and count
```sql
SELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications FROM employees e JOIN loan_applications la ON e.id = la.assigned_employee_id GROUP BY e.id, e.full_name ORDER BY assigned_applications DESC, e.id ASC;
```

### ✅ PASS : BANK_052 - CTE assignments
```sql
WITH employee_app_counts AS (
  SELECT assigned_employee_id, COUNT(*) AS assigned_applications
  FROM loan_applications
  GROUP BY assigned_employee_id
)
SELECT e.id, e.full_name, eac.assigned_applications
FROM employees e
JOIN employee_app_counts eac ON e.id = eac.assigned_employee_id
ORDER BY eac.assigned_applications DESC, e.id ASC;
```

### ✅ PASS : BANK_052 - Left join count
```sql
SELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications FROM employees e LEFT JOIN loan_applications la ON e.id = la.assigned_employee_id GROUP BY e.id, e.full_name HAVING COUNT(la.id) > 0 ORDER BY assigned_applications DESC, e.id ASC;
```

### ✅ PASS : BANK_053 - Group and avg
```sql
SELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins FROM complaints WHERE resolution_time_mins IS NOT NULL GROUP BY complaint_type ORDER BY avg_resolution_time_mins DESC, complaint_type ASC;
```

### ✅ PASS : BANK_053 - CTE resolved
```sql
WITH resolved_complaints AS (
  SELECT complaint_type, resolution_time_mins
  FROM complaints
  WHERE resolution_time_mins IS NOT NULL
)
SELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins
FROM resolved_complaints
GROUP BY complaint_type
ORDER BY avg_resolution_time_mins DESC, complaint_type ASC;
```

### ✅ PASS : BANK_053 - Case avg
```sql
SELECT complaint_type, ROUND(AVG(CASE WHEN resolution_time_mins IS NOT NULL THEN resolution_time_mins END), 2) AS avg_resolution_time_mins FROM complaints GROUP BY complaint_type ORDER BY avg_resolution_time_mins DESC, complaint_type ASC;
```

### ✅ PASS : BANK_054 - Distinct joins
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN loans l ON u.id = l.borrower_user_id ORDER BY u.id ASC;
```

### ✅ PASS : BANK_054 - Exists both
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM accounts a JOIN cards c ON a.id = c.account_id WHERE a.user_id = u.id ) AND EXISTS ( SELECT 1 FROM loans l WHERE l.borrower_user_id = u.id ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_054 - CTE both sets
```sql
WITH card_users AS (
  SELECT DISTINCT a.user_id
  FROM accounts a
  JOIN cards c ON a.id = c.account_id
), loan_users AS (
  SELECT DISTINCT borrower_user_id AS user_id
  FROM loans
)
SELECT u.id, u.full_name
FROM users u
JOIN card_users cu ON u.id = cu.user_id
JOIN loan_users lu ON u.id = lu.user_id
ORDER BY u.id ASC;
```

### ✅ PASS : BANK_055 - Month count
```sql
SELECT DATE_TRUNC('month', opened_at) AS opened_month, COUNT(*) AS accounts_opened FROM accounts GROUP BY DATE_TRUNC('month', opened_at) ORDER BY opened_month ASC;
```

### ✅ PASS : BANK_055 - CTE month
```sql
WITH monthly_accounts AS (
  SELECT DATE_TRUNC('month', opened_at) AS opened_month
  FROM accounts
)
SELECT opened_month, COUNT(*) AS accounts_opened
FROM monthly_accounts
GROUP BY opened_month
ORDER BY opened_month ASC;
```

### ✅ PASS : BANK_055 - Subquery month
```sql
SELECT opened_month, COUNT(*) AS accounts_opened FROM ( SELECT DATE_TRUNC('month', opened_at) AS opened_month FROM accounts ) a GROUP BY opened_month ORDER BY opened_month ASC;
```

### ✅ PASS : BANK_056 - Join credit sum
```sql
SELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_credited_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_type = 'credit' AND t.transaction_status = 'posted' GROUP BY u.id, u.full_name ORDER BY total_credited_amount DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_056 - CTE credits
```sql
WITH user_credits AS (
  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_credited_amount
  FROM accounts a
  JOIN transactions t ON a.id = t.account_id
  WHERE t.transaction_type = 'credit'
    AND t.transaction_status = 'posted'
  GROUP BY a.user_id
)
SELECT u.id, u.full_name, uc.total_credited_amount
FROM users u
JOIN user_credits uc ON u.id = uc.user_id
ORDER BY uc.total_credited_amount DESC, u.id ASC
LIMIT 10;
```

### ✅ PASS : BANK_056 - Case sum
```sql
SELECT u.id, u.full_name, ROUND(SUM(CASE WHEN t.transaction_type = 'credit' AND t.transaction_status = 'posted' THEN t.amount ELSE 0 END), 2) AS total_credited_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'credit' AND t.transaction_status = 'posted' THEN t.amount ELSE 0 END) > 0 ORDER BY total_credited_amount DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_057 - Join verified count
```sql
SELECT u.id, u.full_name, COUNT(b.id) AS verified_beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id WHERE b.is_verified = true GROUP BY u.id, u.full_name ORDER BY verified_beneficiary_count DESC, u.id ASC;
```

### ✅ PASS : BANK_057 - CTE verified ben
```sql
WITH verified_beneficiaries AS (
  SELECT user_id, COUNT(*) AS verified_beneficiary_count
  FROM beneficiaries
  WHERE is_verified = true
  GROUP BY user_id
)
SELECT u.id, u.full_name, vb.verified_beneficiary_count
FROM users u
JOIN verified_beneficiaries vb ON u.id = vb.user_id
ORDER BY vb.verified_beneficiary_count DESC, u.id ASC;
```

### ✅ PASS : BANK_057 - Filter count
```sql
SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE b.is_verified = true) AS verified_beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE b.is_verified = true) > 0 ORDER BY verified_beneficiary_count DESC, u.id ASC;
```

### ✅ PASS : BANK_058 - Group severity
```sql
SELECT severity, COUNT(*) AS alert_count FROM fraud_alerts GROUP BY severity ORDER BY alert_count DESC, severity ASC;
```

### ✅ PASS : BANK_058 - Count ids
```sql
SELECT severity, COUNT(id) AS alert_count FROM fraud_alerts GROUP BY severity ORDER BY alert_count DESC, severity ASC;
```

### ✅ PASS : BANK_058 - CTE severity
```sql
WITH severity_counts AS (
  SELECT severity, COUNT(*) AS alert_count
  FROM fraud_alerts
  GROUP BY severity
)
SELECT severity, alert_count
FROM severity_counts
ORDER BY alert_count DESC, severity ASC;
```

### ✅ PASS : BANK_059 - Join and sum
```sql
SELECT b.biller_category, ROUND(SUM(bp.amount), 2) AS total_paid_amount FROM bill_payments bp JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' GROUP BY b.biller_category ORDER BY total_paid_amount DESC, b.biller_category ASC;
```

### ✅ PASS : BANK_059 - CTE paid bills
```sql
WITH paid_bill_payments AS (
  SELECT biller_id, amount
  FROM bill_payments
  WHERE payment_status = 'paid'
)
SELECT b.biller_category, ROUND(SUM(pbp.amount), 2) AS total_paid_amount
FROM paid_bill_payments pbp
JOIN billers b ON pbp.biller_id = b.id
GROUP BY b.biller_category
ORDER BY total_paid_amount DESC, b.biller_category ASC;
```

### ✅ PASS : BANK_059 - Case sum
```sql
SELECT b.biller_category, ROUND(SUM(CASE WHEN bp.payment_status = 'paid' THEN bp.amount ELSE 0 END), 2) AS total_paid_amount FROM bill_payments bp JOIN billers b ON bp.biller_id = b.id GROUP BY b.biller_category ORDER BY total_paid_amount DESC, b.biller_category ASC;
```

### ✅ PASS : BANK_060 - Distinct users
```sql
SELECT b.id, b.branch_name, COUNT(DISTINCT a.user_id) AS active_customer_count FROM branches b JOIN accounts a ON b.id = a.primary_branch_id WHERE a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_customer_count DESC, b.id ASC;
```

### ✅ PASS : BANK_060 - CTE active users
```sql
WITH branch_active_users AS (
  SELECT primary_branch_id, user_id
  FROM accounts
  WHERE account_status = 'active'
  GROUP BY primary_branch_id, user_id
)
SELECT b.id, b.branch_name, COUNT(*) AS active_customer_count
FROM branches b
JOIN branch_active_users bau ON b.id = bau.primary_branch_id
GROUP BY b.id, b.branch_name
ORDER BY active_customer_count DESC, b.id ASC;
```

### ✅ PASS : BANK_060 - Subquery distinct
```sql
SELECT b.id, b.branch_name, COUNT(*) AS active_customer_count FROM branches b JOIN ( SELECT DISTINCT primary_branch_id, user_id FROM accounts WHERE account_status = 'active' ) a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY active_customer_count DESC, b.id ASC;
```

### ✅ PASS : BANK_061 - Group active cards
```sql
SELECT u.id, u.full_name, COUNT(c.id) AS active_card_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id WHERE c.card_status = 'active' GROUP BY u.id, u.full_name HAVING COUNT(c.id) > 1 ORDER BY active_card_count DESC, u.id ASC;
```

### ✅ PASS : BANK_061 - CTE active counts
```sql
WITH user_active_cards AS (
  SELECT a.user_id, COUNT(c.id) AS active_card_count
  FROM accounts a
  JOIN cards c ON a.id = c.account_id
  WHERE c.card_status = 'active'
  GROUP BY a.user_id
)
SELECT u.id, u.full_name, uac.active_card_count
FROM users u
JOIN user_active_cards uac ON u.id = uac.user_id
WHERE uac.active_card_count > 1
ORDER BY uac.active_card_count DESC, u.id ASC;
```

### ✅ PASS : BANK_061 - Subquery counts
```sql
SELECT u.id, u.full_name, ac.active_card_count FROM users u JOIN ( SELECT a.user_id, COUNT(c.id) AS active_card_count FROM accounts a JOIN cards c ON a.id = c.account_id WHERE c.card_status = 'active' GROUP BY a.user_id ) ac ON u.id = ac.user_id WHERE ac.active_card_count > 1 ORDER BY ac.active_card_count DESC, u.id ASC;
```

### ✅ PASS : BANK_062 - Group channel avg
```sql
SELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount FROM transactions WHERE transaction_status = 'posted' GROUP BY channel ORDER BY avg_transaction_amount DESC, channel ASC;
```

### ✅ PASS : BANK_062 - CTE posted
```sql
WITH posted_transactions AS (
  SELECT channel, amount
  FROM transactions
  WHERE transaction_status = 'posted'
)
SELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount
FROM posted_transactions
GROUP BY channel
ORDER BY avg_transaction_amount DESC, channel ASC;
```

### ✅ PASS : BANK_062 - Case avg
```sql
SELECT channel, ROUND(AVG(CASE WHEN transaction_status = 'posted' THEN amount END), 2) AS avg_transaction_amount FROM transactions GROUP BY channel ORDER BY avg_transaction_amount DESC, channel ASC;
```

### ✅ PASS : BANK_063 - Join and sum
```sql
SELECT b.id, b.branch_name, ROUND(SUM(a.current_balance), 2) AS total_deposits FROM branches b JOIN accounts a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY total_deposits DESC, b.id ASC LIMIT 10;
```

### ✅ PASS : BANK_063 - CTE branch sums
```sql
WITH branch_deposits AS (
  SELECT primary_branch_id, ROUND(SUM(current_balance), 2) AS total_deposits
  FROM accounts
  GROUP BY primary_branch_id
)
SELECT b.id, b.branch_name, bd.total_deposits
FROM branches b
JOIN branch_deposits bd ON b.id = bd.primary_branch_id
ORDER BY bd.total_deposits DESC, b.id ASC
LIMIT 10;
```

### ✅ PASS : BANK_063 - Subquery sums
```sql
SELECT b.id, b.branch_name, d.total_deposits FROM branches b JOIN ( SELECT primary_branch_id, ROUND(SUM(current_balance), 2) AS total_deposits FROM accounts GROUP BY primary_branch_id ) d ON b.id = d.primary_branch_id ORDER BY d.total_deposits DESC, b.id ASC LIMIT 10;
```

### ✅ PASS : BANK_064 - Wrapped sort
```sql
SELECT id, full_name, expires_at FROM ( SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'expired' ) expired_users ORDER BY expires_at DESC, id ASC;
```

### ✅ PASS : BANK_064 - CTE sort
```sql
WITH expired_users AS ( SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'expired' ) SELECT id, full_name, expires_at FROM expired_users ORDER BY expires_at DESC, id ASC;
```

### ✅ PASS : BANK_064 - KYC subquery
```sql
SELECT id, full_name, expires_at FROM ( SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN ( SELECT user_id, expires_at FROM kyc_records WHERE kyc_status = 'expired' ) k ON u.id = k.user_id ) expired_users ORDER BY expires_at DESC, id ASC;
```

### ✅ PASS : BANK_065 - Join and avg
```sql
SELECT lp.id, lp.product_name, ROUND(AVG(la.credit_score), 2) AS avg_credit_score FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id WHERE la.credit_score IS NOT NULL GROUP BY lp.id, lp.product_name ORDER BY avg_credit_score DESC, lp.id ASC;
```

### ✅ PASS : BANK_065 - CTE product scores
```sql
WITH product_scores AS (
  SELECT loan_product_id, ROUND(AVG(credit_score), 2) AS avg_credit_score
  FROM loan_applications
  WHERE credit_score IS NOT NULL
  GROUP BY loan_product_id
)
SELECT lp.id, lp.product_name, ps.avg_credit_score
FROM loan_products lp
JOIN product_scores ps ON lp.id = ps.loan_product_id
ORDER BY ps.avg_credit_score DESC, lp.id ASC;
```

### ✅ PASS : BANK_065 - Case avg
```sql
SELECT lp.id, lp.product_name, ROUND(AVG(CASE WHEN la.credit_score IS NOT NULL THEN la.credit_score END), 2) AS avg_credit_score FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY avg_credit_score DESC, lp.id ASC;
```

### ✅ PASS : BANK_066 - Join month sum
```sql
SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ROUND(SUM(ct.billing_amount), 2) AS total_spend FROM cards c JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' GROUP BY c.network, DATE_TRUNC('month', ct.transaction_at) ORDER BY spend_month ASC, c.network ASC;
```

### ✅ PASS : BANK_066 - CTE settled spend
```sql
WITH settled_card_spend AS (
  SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ct.billing_amount
  FROM cards c
  JOIN card_transactions ct ON c.id = ct.card_id
  WHERE ct.transaction_status = 'settled'
)
SELECT network, spend_month, ROUND(SUM(billing_amount), 2) AS total_spend
FROM settled_card_spend
GROUP BY network, spend_month
ORDER BY spend_month ASC, network ASC;
```

### ✅ PASS : BANK_066 - Subquery month
```sql
SELECT network, spend_month, ROUND(SUM(billing_amount), 2) AS total_spend FROM ( SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ct.billing_amount FROM cards c JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' ) s GROUP BY network, spend_month ORDER BY spend_month ASC, network ASC;
```

### ✅ PASS : BANK_067 - Distinct joins
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN fixed_deposits fd ON u.id = fd.user_id JOIN recurring_deposits rd ON u.id = rd.user_id ORDER BY u.id ASC;
```

### ✅ PASS : BANK_067 - Exists both
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM fixed_deposits fd WHERE fd.user_id = u.id ) AND EXISTS ( SELECT 1 FROM recurring_deposits rd WHERE rd.user_id = u.id ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_067 - CTE both sets
```sql
WITH fd_users AS (
  SELECT DISTINCT user_id
  FROM fixed_deposits
), rd_users AS (
  SELECT DISTINCT user_id
  FROM recurring_deposits
)
SELECT u.id, u.full_name
FROM users u
JOIN fd_users f ON u.id = f.user_id
JOIN rd_users r ON u.id = r.user_id
ORDER BY u.id ASC;
```

### ✅ PASS : BANK_068 - Join and sum
```sql
SELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transfers t ON a.id = t.from_account_id WHERE t.transfer_status = 'completed' GROUP BY u.id, u.full_name ORDER BY total_outgoing_transfer_amount DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_068 - CTE outflow
```sql
WITH user_transfer_outflow AS (
  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount
  FROM accounts a
  JOIN transfers t ON a.id = t.from_account_id
  WHERE t.transfer_status = 'completed'
  GROUP BY a.user_id
)
SELECT u.id, u.full_name, uto.total_outgoing_transfer_amount
FROM users u
JOIN user_transfer_outflow uto ON u.id = uto.user_id
ORDER BY uto.total_outgoing_transfer_amount DESC, u.id ASC
LIMIT 10;
```

### ✅ PASS : BANK_068 - Subquery outflow
```sql
SELECT u.id, u.full_name, o.total_outgoing_transfer_amount FROM users u JOIN ( SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount FROM accounts a JOIN transfers t ON a.id = t.from_account_id WHERE t.transfer_status = 'completed' GROUP BY a.user_id ) o ON u.id = o.user_id ORDER BY o.total_outgoing_transfer_amount DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_069 - Group open tickets
```sql
SELECT issue_type, COUNT(*) AS open_ticket_count FROM support_tickets WHERE ticket_status = 'open' GROUP BY issue_type ORDER BY open_ticket_count DESC, issue_type ASC;
```

### ✅ PASS : BANK_069 - CTE open tickets
```sql
WITH open_tickets AS (
  SELECT issue_type
  FROM support_tickets
  WHERE ticket_status = 'open'
)
SELECT issue_type, COUNT(*) AS open_ticket_count
FROM open_tickets
GROUP BY issue_type
ORDER BY open_ticket_count DESC, issue_type ASC;
```

### ✅ PASS : BANK_069 - Filter count
```sql
SELECT issue_type, COUNT(*) FILTER (WHERE ticket_status = 'open') AS open_ticket_count FROM support_tickets GROUP BY issue_type HAVING COUNT(*) FILTER (WHERE ticket_status = 'open') > 0 ORDER BY open_ticket_count DESC, issue_type ASC;
```

### ✅ PASS : BANK_070 - Distinct overdraft
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN account_products ap ON a.product_id = ap.id WHERE ap.overdraft_allowed = true ORDER BY u.id ASC;
```

### ✅ PASS : BANK_070 - Exists overdraft
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM accounts a JOIN account_products ap ON a.product_id = ap.id WHERE a.user_id = u.id AND ap.overdraft_allowed = true ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_070 - CTE overdraft users
```sql
WITH overdraft_users AS (
  SELECT DISTINCT a.user_id
  FROM accounts a
  JOIN account_products ap ON a.product_id = ap.id
  WHERE ap.overdraft_allowed = true
)
SELECT u.id, u.full_name
FROM users u
JOIN overdraft_users ou ON u.id = ou.user_id
ORDER BY u.id ASC;
```

### ✅ PASS : BANK_071 - CTE compare avg
```sql
WITH user_balances AS ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) SELECT u.id, u.full_name, ub.total_balance FROM users u JOIN user_balances ub ON u.id = ub.user_id WHERE ub.total_balance > (SELECT AVG(total_balance) FROM user_balances) ORDER BY ub.total_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_071 - Subquery compare
```sql
SELECT u.id, u.full_name, ub.total_balance FROM users u JOIN ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) ub ON u.id = ub.user_id WHERE ub.total_balance > ( SELECT AVG(total_balance) FROM ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) x ) ORDER BY ub.total_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_071 - Window average
```sql
WITH user_balances AS ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ), ranked AS ( SELECT user_id, total_balance, AVG(total_balance) OVER () AS avg_total_balance FROM user_balances ) SELECT u.id, u.full_name, r.total_balance FROM users u JOIN ranked r ON u.id = r.user_id WHERE r.total_balance > r.avg_total_balance ORDER BY r.total_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_072 - Join disbursed loans
```sql
SELECT b.id, b.branch_name, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM branches b JOIN accounts a ON b.id = a.primary_branch_id JOIN loans l ON a.id = l.disbursement_account_id GROUP BY b.id, b.branch_name ORDER BY total_disbursed_amount DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_072 - CTE branch loans
```sql
WITH branch_loan_totals AS ( SELECT a.primary_branch_id AS branch_id, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM accounts a JOIN loans l ON a.id = l.disbursement_account_id GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, blt.total_disbursed_amount FROM branches b JOIN branch_loan_totals blt ON b.id = blt.branch_id ORDER BY blt.total_disbursed_amount DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_072 - Subquery totals
```sql
SELECT b.id, b.branch_name, x.total_disbursed_amount FROM branches b JOIN ( SELECT a.primary_branch_id AS branch_id, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM accounts a JOIN loans l ON a.id = l.disbursement_account_id GROUP BY a.primary_branch_id ) x ON b.id = x.branch_id ORDER BY x.total_disbursed_amount DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_073 - Join failed count
```sql
SELECT u.id, u.full_name, COUNT(t.id) AS failed_transaction_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'failed' GROUP BY u.id, u.full_name ORDER BY failed_transaction_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_073 - CTE failed users
```sql
WITH failed_counts AS ( SELECT a.user_id, COUNT(t.id) AS failed_transaction_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'failed' GROUP BY a.user_id ) SELECT u.id, u.full_name, fc.failed_transaction_count FROM users u JOIN failed_counts fc ON u.id = fc.user_id ORDER BY fc.failed_transaction_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_073 - Case count
```sql
SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_transaction_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) > 0 ORDER BY failed_transaction_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_074 - Case debit credit
```sql
SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) > SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) ORDER BY total_debit DESC, u.id ASC;
```

### ✅ PASS : BANK_074 - CTE cashflow
```sql
WITH user_cashflow AS ( SELECT a.user_id, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY a.user_id ) SELECT u.id, u.full_name, uc.total_debit, uc.total_credit FROM users u JOIN user_cashflow uc ON u.id = uc.user_id WHERE uc.total_debit > uc.total_credit ORDER BY uc.total_debit DESC, u.id ASC;
```

### ✅ PASS : BANK_074 - Net flow filter
```sql
SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount WHEN t.transaction_type = 'credit' THEN -t.amount ELSE 0 END) > 0 ORDER BY total_debit DESC, u.id ASC;
```

### ✅ PASS : BANK_075 - Join alert count
```sql
SELECT u.id, u.full_name, COUNT(f.id) AS fraud_alert_count FROM users u JOIN fraud_alerts f ON u.id = f.user_id GROUP BY u.id, u.full_name ORDER BY fraud_alert_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_075 - CTE alert totals
```sql
WITH user_alert_counts AS ( SELECT user_id, COUNT(*) AS fraud_alert_count FROM fraud_alerts GROUP BY user_id ) SELECT u.id, u.full_name, uac.fraud_alert_count FROM users u JOIN user_alert_counts uac ON u.id = uac.user_id ORDER BY uac.fraud_alert_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_075 - Subquery totals
```sql
SELECT u.id, u.full_name, a.fraud_alert_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS fraud_alert_count FROM fraud_alerts GROUP BY user_id ) a ON u.id = a.user_id ORDER BY a.fraud_alert_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_076 - Late ratio
```sql
SELECT u.id, u.full_name, ROUND(100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*), 2) AS late_payment_ratio FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY u.id, u.full_name HAVING 100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*) > 50 ORDER BY late_payment_ratio DESC, u.id ASC;
```

### ✅ PASS : BANK_076 - CTE repayment ratio
```sql
WITH user_repayment_stats AS ( SELECT l.borrower_user_id AS user_id, SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) AS late_count, COUNT(*) AS total_count FROM loans l JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY l.borrower_user_id ) SELECT u.id, u.full_name, ROUND(100.0 * urs.late_count / urs.total_count, 2) AS late_payment_ratio FROM users u JOIN user_repayment_stats urs ON u.id = urs.user_id WHERE 100.0 * urs.late_count / urs.total_count > 50 ORDER BY late_payment_ratio DESC, u.id ASC;
```

### ✅ PASS : BANK_076 - Filter ratio
```sql
SELECT u.id, u.full_name, ROUND(100.0 * COUNT(*) FILTER (WHERE lr.repayment_status = 'late') / COUNT(*), 2) AS late_payment_ratio FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY u.id, u.full_name HAVING 100.0 * COUNT(*) FILTER (WHERE lr.repayment_status = 'late') / COUNT(*) > 50 ORDER BY late_payment_ratio DESC, u.id ASC;
```

### ✅ PASS : BANK_077 - Distinct users merchant
```sql
SELECT ct.merchant_name, COUNT(DISTINCT a.user_id) AS unique_user_count FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY ct.merchant_name ORDER BY unique_user_count DESC, ct.merchant_name ASC LIMIT 5;
```

### ✅ PASS : BANK_077 - CTE merchant users
```sql
WITH merchant_user_pairs AS ( SELECT DISTINCT ct.merchant_name, a.user_id FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' ) SELECT merchant_name, COUNT(*) AS unique_user_count FROM merchant_user_pairs GROUP BY merchant_name ORDER BY unique_user_count DESC, merchant_name ASC LIMIT 5;
```

### ✅ PASS : BANK_077 - Subquery pairs
```sql
SELECT merchant_name, COUNT(*) AS unique_user_count FROM ( SELECT DISTINCT ct.merchant_name, a.user_id FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' ) x GROUP BY merchant_name ORDER BY unique_user_count DESC, merchant_name ASC LIMIT 5;
```

### ✅ PASS : BANK_078 - Left join dormant
```sql
SELECT a.id, a.account_number, a.user_id FROM accounts a LEFT JOIN transactions t ON a.id = t.account_id AND t.transaction_status = 'posted' AND t.posted_at >= NOW() - INTERVAL '6 months' GROUP BY a.id, a.account_number, a.user_id HAVING COUNT(t.id) = 0 ORDER BY a.id ASC;
```

### ✅ PASS : BANK_078 - Not exists
```sql
SELECT a.id, a.account_number, a.user_id FROM accounts a WHERE NOT EXISTS ( SELECT 1 FROM transactions t WHERE t.account_id = a.id AND t.transaction_status = 'posted' AND t.posted_at >= NOW() - INTERVAL '6 months' ) ORDER BY a.id ASC;
```

### ✅ PASS : BANK_078 - CTE recent active
```sql
WITH recent_active_accounts AS ( SELECT DISTINCT account_id FROM transactions WHERE transaction_status = 'posted' AND posted_at >= NOW() - INTERVAL '6 months' ) SELECT a.id, a.account_number, a.user_id FROM accounts a LEFT JOIN recent_active_accounts raa ON a.id = raa.account_id WHERE raa.account_id IS NULL ORDER BY a.id ASC;
```

### ✅ PASS : BANK_079 - Distinct product types
```sql
SELECT u.id, u.full_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM users u JOIN accounts a ON u.id = a.user_id JOIN account_products ap ON a.product_id = ap.id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT ap.product_type) > 1 ORDER BY distinct_product_types DESC, u.id ASC;
```

### ✅ PASS : BANK_079 - CTE type counts
```sql
WITH user_product_types AS ( SELECT a.user_id, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM accounts a JOIN account_products ap ON a.product_id = ap.id GROUP BY a.user_id ) SELECT u.id, u.full_name, upt.distinct_product_types FROM users u JOIN user_product_types upt ON u.id = upt.user_id WHERE upt.distinct_product_types > 1 ORDER BY upt.distinct_product_types DESC, u.id ASC;
```

### ✅ PASS : BANK_079 - Distinct pairs
```sql
SELECT u.id, u.full_name, COUNT(*) AS distinct_product_types FROM users u JOIN ( SELECT DISTINCT a.user_id, ap.product_type FROM accounts a JOIN account_products ap ON a.product_id = ap.id ) x ON u.id = x.user_id GROUP BY u.id, u.full_name HAVING COUNT(*) > 1 ORDER BY distinct_product_types DESC, u.id ASC;
```

### ✅ PASS : BANK_080 - Pre-aggregate worth
```sql
WITH account_totals AS ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ), fd_totals AS ( SELECT user_id, SUM(principal_amount) AS total_fd_amount FROM fixed_deposits GROUP BY user_id ), loan_totals AS ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding_loans FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, COALESCE(a.total_deposits, 0) + COALESCE(fd.total_fd_amount, 0) - COALESCE(l.total_outstanding_loans, 0) AS estimated_net_worth FROM users u LEFT JOIN account_totals a ON u.id = a.user_id LEFT JOIN fd_totals fd ON u.id = fd.user_id LEFT JOIN loan_totals l ON u.id = l.user_id ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_080 - Subquery totals
```sql
SELECT u.id, u.full_name, COALESCE(a.total_deposits, 0) + COALESCE(fd.total_fd_amount, 0) - COALESCE(l.total_outstanding_loans, 0) AS estimated_net_worth FROM users u LEFT JOIN ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ) a ON u.id = a.user_id LEFT JOIN ( SELECT user_id, SUM(principal_amount) AS total_fd_amount FROM fixed_deposits GROUP BY user_id ) fd ON u.id = fd.user_id LEFT JOIN ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding_loans FROM loans GROUP BY borrower_user_id ) l ON u.id = l.user_id ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_080 - Union movements
```sql
WITH worth_components AS ( SELECT user_id, SUM(current_balance) AS net_component FROM accounts GROUP BY user_id UNION ALL SELECT user_id, SUM(principal_amount) AS net_component FROM fixed_deposits GROUP BY user_id UNION ALL SELECT borrower_user_id AS user_id, -SUM(outstanding_principal) AS net_component FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, COALESCE(SUM(wc.net_component), 0) AS estimated_net_worth FROM users u LEFT JOIN worth_components wc ON u.id = wc.user_id GROUP BY u.id, u.full_name ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_081 - Join and avg
```sql
SELECT b.id, b.branch_name, ROUND(AVG(a.current_balance), 2) AS avg_account_balance FROM branches b JOIN accounts a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY avg_account_balance DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_081 - CTE branch avg
```sql
WITH branch_avg_balances AS ( SELECT primary_branch_id AS branch_id, ROUND(AVG(current_balance), 2) AS avg_account_balance FROM accounts GROUP BY primary_branch_id ) SELECT b.id, b.branch_name, bab.avg_account_balance FROM branches b JOIN branch_avg_balances bab ON b.id = bab.branch_id ORDER BY bab.avg_account_balance DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_081 - Subquery avg
```sql
SELECT b.id, b.branch_name, x.avg_account_balance FROM branches b JOIN ( SELECT primary_branch_id AS branch_id, ROUND(AVG(current_balance), 2) AS avg_account_balance FROM accounts GROUP BY primary_branch_id ) x ON b.id = x.branch_id ORDER BY x.avg_account_balance DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_082 - Case counts
```sql
SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count, SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) > SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) ORDER BY failed_txn_count DESC, u.id ASC;
```

### ✅ PASS : BANK_082 - CTE status counts
```sql
WITH user_status_counts AS ( SELECT a.user_id, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count, SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id GROUP BY a.user_id ) SELECT u.id, u.full_name, usc.failed_txn_count, usc.posted_txn_count FROM users u JOIN user_status_counts usc ON u.id = usc.user_id WHERE usc.failed_txn_count > usc.posted_txn_count ORDER BY usc.failed_txn_count DESC, u.id ASC;
```

### ✅ PASS : BANK_082 - Filter counts
```sql
SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE t.transaction_status = 'failed') AS failed_txn_count, COUNT(*) FILTER (WHERE t.transaction_status = 'posted') AS posted_txn_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE t.transaction_status = 'failed') > COUNT(*) FILTER (WHERE t.transaction_status = 'posted') ORDER BY failed_txn_count DESC, u.id ASC;
```

### ✅ PASS : BANK_083 - CTE compare rates
```sql
WITH product_approval_rates AS ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ) SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM product_approval_rates WHERE approval_rate > (SELECT AVG(approval_rate) FROM product_approval_rates) ORDER BY approval_rate DESC, id ASC;
```

### ✅ PASS : BANK_083 - Subquery compare
```sql
SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ) par WHERE approval_rate > ( SELECT AVG(approval_rate) FROM ( SELECT lp.id, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id ) x ) ORDER BY approval_rate DESC, id ASC;
```

### ✅ PASS : BANK_083 - Window average
```sql
WITH product_approval_rates AS ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ), rated AS ( SELECT id, product_name, approval_rate, AVG(approval_rate) OVER () AS avg_approval_rate FROM product_approval_rates ) SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM rated WHERE approval_rate > avg_approval_rate ORDER BY approval_rate DESC, id ASC;
```

### ✅ PASS : BANK_084 - Distinct merchants
```sql
SELECT u.id, u.full_name, COUNT(DISTINCT ct.merchant_name) AS distinct_merchant_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_084 - CTE merchant pairs
```sql
WITH user_merchants AS ( SELECT DISTINCT a.user_id, ct.merchant_name FROM accounts a JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL ) SELECT u.id, u.full_name, COUNT(*) AS distinct_merchant_count FROM users u JOIN user_merchants um ON u.id = um.user_id GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_084 - Subquery merchants
```sql
SELECT u.id, u.full_name, COUNT(*) AS distinct_merchant_count FROM users u JOIN ( SELECT DISTINCT a.user_id, ct.merchant_name FROM accounts a JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL ) m ON u.id = m.user_id GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_085 - CTE inflow outflow
```sql
WITH outgoing_transfers AS ( SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id ), incoming_transfers AS ( SELECT to_account_id AS account_id, SUM(amount) AS total_incoming FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) SELECT a.id, a.account_number, COALESCE(o.total_outgoing, 0) AS total_outgoing, COALESCE(i.total_incoming, 0) AS total_incoming FROM accounts a LEFT JOIN outgoing_transfers o ON a.id = o.account_id LEFT JOIN incoming_transfers i ON a.id = i.account_id WHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0) ORDER BY total_outgoing DESC, a.id ASC;
```

### ✅ PASS : BANK_085 - Subquery totals
```sql
SELECT a.id, a.account_number, COALESCE(o.total_outgoing, 0) AS total_outgoing, COALESCE(i.total_incoming, 0) AS total_incoming FROM accounts a LEFT JOIN ( SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id ) o ON a.id = o.account_id LEFT JOIN ( SELECT to_account_id AS account_id, SUM(amount) AS total_incoming FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) i ON a.id = i.account_id WHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0) ORDER BY total_outgoing DESC, a.id ASC;
```

### ✅ PASS : BANK_085 - Union net flow
```sql
WITH transfer_flows AS ( SELECT from_account_id AS account_id, SUM(amount) AS out_amt, 0::numeric AS in_amt FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id UNION ALL SELECT to_account_id AS account_id, 0::numeric AS out_amt, SUM(amount) AS in_amt FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) SELECT a.id, a.account_number, SUM(tf.out_amt) AS total_outgoing, SUM(tf.in_amt) AS total_incoming FROM accounts a JOIN transfer_flows tf ON a.id = tf.account_id GROUP BY a.id, a.account_number HAVING SUM(tf.out_amt) > SUM(tf.in_amt) ORDER BY total_outgoing DESC, a.id ASC;
```

### ✅ PASS : BANK_086 - Distinct biller cats
```sql
SELECT u.id, u.full_name, COUNT(DISTINCT b.biller_category) AS distinct_biller_categories FROM users u JOIN accounts a ON u.id = a.user_id JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;
```

### ✅ PASS : BANK_086 - CTE category pairs
```sql
WITH user_biller_categories AS ( SELECT DISTINCT a.user_id, b.biller_category FROM accounts a JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' ) SELECT u.id, u.full_name, COUNT(*) AS distinct_biller_categories FROM users u JOIN user_biller_categories ubc ON u.id = ubc.user_id GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;
```

### ✅ PASS : BANK_086 - Subquery categories
```sql
SELECT u.id, u.full_name, COUNT(*) AS distinct_biller_categories FROM users u JOIN ( SELECT DISTINCT a.user_id, b.biller_category FROM accounts a JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' ) x ON u.id = x.user_id GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;
```

### ✅ PASS : BANK_087 - Lag consecutive
```sql
WITH repayment_flags AS ( SELECT l.borrower_user_id AS user_id, lr.loan_id, lr.installment_number, lr.repayment_status, LAG(lr.repayment_status) OVER (PARTITION BY lr.loan_id ORDER BY lr.installment_number) AS prev_status FROM loan_repayments lr JOIN loans l ON lr.loan_id = l.id ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN repayment_flags rf ON u.id = rf.user_id WHERE rf.repayment_status = 'late' AND rf.prev_status = 'late' ORDER BY u.id ASC;
```

### ✅ PASS : BANK_087 - Self join repayments
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr1 ON l.id = lr1.loan_id JOIN loan_repayments lr2 ON l.id = lr2.loan_id AND lr2.installment_number = lr1.installment_number - 1 WHERE lr1.repayment_status = 'late' AND lr2.repayment_status = 'late' ORDER BY u.id ASC;
```

### ✅ PASS : BANK_087 - CTE late pairs
```sql
WITH late_repayments AS ( SELECT l.borrower_user_id AS user_id, lr.loan_id, lr.installment_number FROM loan_repayments lr JOIN loans l ON lr.loan_id = l.id WHERE lr.repayment_status = 'late' ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN late_repayments r1 ON u.id = r1.user_id JOIN late_repayments r2 ON r1.loan_id = r2.loan_id AND r2.installment_number = r1.installment_number - 1 ORDER BY u.id ASC;
```

### ✅ PASS : BANK_088 - CTE redemption rate
```sql
WITH earned AS ( SELECT user_id, SUM(points_earned) AS total_points_earned FROM reward_earnings GROUP BY user_id ), redeemed AS ( SELECT user_id, SUM(points_redeemed) AS total_points_redeemed FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN earned e ON u.id = e.user_id LEFT JOIN redeemed r ON u.id = r.user_id WHERE e.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_088 - Subquery rate
```sql
SELECT u.id, u.full_name, ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN ( SELECT user_id, SUM(points_earned) AS total_points_earned FROM reward_earnings GROUP BY user_id ) e ON u.id = e.user_id LEFT JOIN ( SELECT user_id, SUM(points_redeemed) AS total_points_redeemed FROM reward_redemptions GROUP BY user_id ) r ON u.id = r.user_id WHERE e.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_088 - Union points
```sql
WITH point_flows AS ( SELECT user_id, SUM(points_earned) AS earned_points, 0::numeric AS redeemed_points FROM reward_earnings GROUP BY user_id UNION ALL SELECT user_id, 0::numeric AS earned_points, SUM(points_redeemed) AS redeemed_points FROM reward_redemptions GROUP BY user_id ), user_point_totals AS ( SELECT user_id, SUM(earned_points) AS total_points_earned, SUM(redeemed_points) AS total_points_redeemed FROM point_flows GROUP BY user_id ) SELECT u.id, u.full_name, ROUND(100.0 * total_points_redeemed / NULLIF(total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN user_point_totals upt ON u.id = upt.user_id WHERE upt.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_089 - CTE branch rate
```sql
WITH branch_failure_rates AS ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ) SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM branch_failure_rates WHERE failure_rate > (SELECT AVG(failure_rate) FROM branch_failure_rates) ORDER BY failure_rate DESC, id ASC;
```

### ✅ PASS : BANK_089 - Subquery rates
```sql
SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ) r WHERE failure_rate > ( SELECT AVG(failure_rate) FROM ( SELECT b.id, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id ) x ) ORDER BY failure_rate DESC, id ASC;
```

### ✅ PASS : BANK_089 - Window average
```sql
WITH branch_failure_rates AS ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ), rated AS ( SELECT id, branch_name, failure_rate, AVG(failure_rate) OVER () AS avg_failure_rate FROM branch_failure_rates ) SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM rated WHERE failure_rate > avg_failure_rate ORDER BY failure_rate DESC, id ASC;
```

### ✅ PASS : BANK_090 - CTE branch compare
```sql
WITH user_branch_balances AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), branch_avg_balances AS ( SELECT branch_id, AVG(total_balance) AS avg_branch_balance FROM user_branch_balances GROUP BY branch_id ) SELECT u.id, u.full_name, ub.branch_id, ub.total_balance FROM users u JOIN user_branch_balances ub ON u.id = ub.user_id JOIN branch_avg_balances bb ON ub.branch_id = bb.branch_id WHERE ub.total_balance > bb.avg_branch_balance ORDER BY ub.total_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_090 - Subquery branch avg
```sql
SELECT u.id, u.full_name, ub.branch_id, ub.total_balance FROM users u JOIN ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) ub ON u.id = ub.user_id JOIN ( SELECT branch_id, AVG(total_balance) AS avg_branch_balance FROM ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) x GROUP BY branch_id ) bb ON ub.branch_id = bb.branch_id WHERE ub.total_balance > bb.avg_branch_balance ORDER BY ub.total_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_090 - Window branch avg
```sql
WITH user_branch_balances AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), rated AS ( SELECT branch_id, user_id, total_balance, AVG(total_balance) OVER (PARTITION BY branch_id) AS avg_branch_balance FROM user_branch_balances ) SELECT u.id, u.full_name, r.branch_id, r.total_balance FROM users u JOIN rated r ON u.id = r.user_id WHERE r.total_balance > r.avg_branch_balance ORDER BY r.total_balance DESC, u.id ASC;
```

### ✅ PASS : BANK_091 - Month rank
```sql
WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, DENSE_RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk FROM monthly_user_cashflow ) ranked WHERE rnk <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;
```

### ✅ PASS : BANK_091 - Row number rank
```sql
WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, ROW_NUMBER() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC, user_id ASC) AS rn FROM monthly_user_cashflow ) ranked WHERE rn <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;
```

### ✅ PASS : BANK_091 - Rank function
```sql
WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk FROM monthly_user_cashflow ) ranked WHERE rnk <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;
```

### ✅ PASS : BANK_092 - CTE compare counts
```sql
WITH fraud_counts AS ( SELECT user_id, COUNT(*) AS fraud_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id ), ticket_counts AS ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ) SELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count FROM users u JOIN fraud_counts f ON u.id = f.user_id LEFT JOIN ticket_counts t ON u.id = t.user_id WHERE f.fraud_count > COALESCE(t.ticket_count, 0) ORDER BY f.fraud_count DESC, u.id ASC;
```

### ✅ PASS : BANK_092 - Subquery compare
```sql
SELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS fraud_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id ) f ON u.id = f.user_id LEFT JOIN ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ) t ON u.id = t.user_id WHERE f.fraud_count > COALESCE(t.ticket_count, 0) ORDER BY f.fraud_count DESC, u.id ASC;
```

### ✅ PASS : BANK_092 - Union movement counts
```sql
WITH incident_counts AS ( SELECT user_id, COUNT(*) AS fraud_count, 0 AS ticket_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id UNION ALL SELECT user_id, 0 AS fraud_count, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ), user_totals AS ( SELECT user_id, SUM(fraud_count) AS fraud_count, SUM(ticket_count) AS ticket_count FROM incident_counts GROUP BY user_id ) SELECT u.id, u.full_name, ut.fraud_count, ut.ticket_count FROM users u JOIN user_totals ut ON u.id = ut.user_id WHERE ut.fraud_count > ut.ticket_count ORDER BY ut.fraud_count DESC, u.id ASC;
```

### ✅ PASS : BANK_093 - CTE exposure ratio
```sql
WITH deposits AS ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ), exposure AS ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN exposure e ON u.id = e.user_id JOIN deposits d ON u.id = d.user_id WHERE d.total_deposits > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_093 - Subquery ratio
```sql
SELECT u.id, u.full_name, ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) e ON u.id = e.user_id JOIN ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ) d ON u.id = d.user_id WHERE d.total_deposits > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_093 - Pre-aggregate with left joins
```sql
WITH user_totals AS ( SELECT u.id AS user_id, COALESCE(a.total_deposits, 0) AS total_deposits, COALESCE(l.total_outstanding, 0) AS total_outstanding FROM users u LEFT JOIN ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ) a ON u.id = a.user_id LEFT JOIN ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) l ON u.id = l.user_id ) SELECT u.id, u.full_name, ROUND(100.0 * ut.total_outstanding / NULLIF(ut.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN user_totals ut ON u.id = ut.user_id WHERE ut.total_deposits > 0 AND ut.total_outstanding > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_094 - Exists portfolio
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM accounts a WHERE a.user_id = u.id ) AND EXISTS ( SELECT 1 FROM loans l WHERE l.borrower_user_id = u.id ) AND ( EXISTS ( SELECT 1 FROM fixed_deposits fd WHERE fd.user_id = u.id ) OR EXISTS ( SELECT 1 FROM recurring_deposits rd WHERE rd.user_id = u.id ) ) ORDER BY u.id ASC;
```

### ✅ PASS : BANK_094 - Distinct joins
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN loans l ON u.id = l.borrower_user_id LEFT JOIN fixed_deposits fd ON u.id = fd.user_id LEFT JOIN recurring_deposits rd ON u.id = rd.user_id WHERE fd.id IS NOT NULL OR rd.id IS NOT NULL ORDER BY u.id ASC;
```

### ✅ PASS : BANK_094 - CTE product sets
```sql
WITH account_users AS ( SELECT DISTINCT user_id FROM accounts ), loan_users AS ( SELECT DISTINCT borrower_user_id AS user_id FROM loans ), deposit_users AS ( SELECT DISTINCT user_id FROM fixed_deposits UNION SELECT DISTINCT user_id FROM recurring_deposits ) SELECT u.id, u.full_name FROM users u JOIN account_users au ON u.id = au.user_id JOIN loan_users lu ON u.id = lu.user_id JOIN deposit_users du ON u.id = du.user_id ORDER BY u.id ASC;
```

### ✅ PASS : BANK_095 - Distinct types branch
```sql
SELECT b.id, b.branch_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM branches b JOIN accounts a ON b.id = a.primary_branch_id JOIN account_products ap ON a.product_id = ap.id GROUP BY b.id, b.branch_name ORDER BY distinct_product_types DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_095 - CTE branch types
```sql
WITH branch_product_types AS ( SELECT a.primary_branch_id AS branch_id, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM accounts a JOIN account_products ap ON a.product_id = ap.id GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, bpt.distinct_product_types FROM branches b JOIN branch_product_types bpt ON b.id = bpt.branch_id ORDER BY bpt.distinct_product_types DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_095 - Distinct pairs count
```sql
SELECT b.id, b.branch_name, COUNT(*) AS distinct_product_types FROM branches b JOIN ( SELECT DISTINCT a.primary_branch_id AS branch_id, ap.product_type FROM accounts a JOIN account_products ap ON a.product_id = ap.id ) x ON b.id = x.branch_id GROUP BY b.id, b.branch_name ORDER BY distinct_product_types DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_096 - CTE top merchant share
```sql
WITH merchant_spend AS ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ), ranked_spend AS ( SELECT user_id, merchant_name, merchant_total, SUM(merchant_total) OVER (PARTITION BY user_id) AS total_spend, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn FROM merchant_spend ) SELECT u.id, u.full_name, rs.merchant_name, ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct FROM users u JOIN ranked_spend rs ON u.id = rs.user_id WHERE rs.rn = 1 AND 100.0 * rs.merchant_total / rs.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;
```

### ✅ PASS : BANK_096 - CTE max join
```sql
WITH merchant_spend AS ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ), user_totals AS ( SELECT user_id, SUM(merchant_total) AS total_spend, MAX(merchant_total) AS top_merchant_total FROM merchant_spend GROUP BY user_id ) SELECT u.id, u.full_name, ms.merchant_name, ROUND(100.0 * ut.top_merchant_total / ut.total_spend, 2) AS concentration_pct FROM users u JOIN user_totals ut ON u.id = ut.user_id JOIN merchant_spend ms ON ut.user_id = ms.user_id AND ut.top_merchant_total = ms.merchant_total WHERE 100.0 * ut.top_merchant_total / ut.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;
```

### ✅ PASS : BANK_096 - Subquery ranked
```sql
SELECT u.id, u.full_name, rs.merchant_name, ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct FROM users u JOIN ( SELECT user_id, merchant_name, merchant_total, total_spend, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn FROM ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total, SUM(SUM(ct.billing_amount)) OVER (PARTITION BY a.user_id) AS total_spend FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ) x ) rs ON u.id = rs.user_id WHERE rs.rn = 1 AND 100.0 * rs.merchant_total / rs.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;
```

### ✅ PASS : BANK_097 - Distinct channels
```sql
SELECT u.id, u.full_name, COUNT(DISTINCT t.channel) AS distinct_channels_used FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_097 - CTE channel pairs
```sql
WITH user_channels AS ( SELECT DISTINCT a.user_id, t.channel FROM accounts a JOIN transactions t ON a.id = t.account_id ) SELECT u.id, u.full_name, COUNT(*) AS distinct_channels_used FROM users u JOIN user_channels uc ON u.id = uc.user_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_097 - Subquery channels
```sql
SELECT u.id, u.full_name, COUNT(*) AS distinct_channels_used FROM users u JOIN ( SELECT DISTINCT a.user_id, t.channel FROM accounts a JOIN transactions t ON a.id = t.account_id ) x ON u.id = x.user_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;
```

### ✅ PASS : BANK_098 - CTE compare avg
```sql
WITH complaint_counts AS ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) SELECT u.id, u.full_name, cc.complaint_count FROM users u JOIN complaint_counts cc ON u.id = cc.user_id WHERE cc.complaint_count > (SELECT AVG(complaint_count) FROM complaint_counts) ORDER BY cc.complaint_count DESC, u.id ASC;
```

### ✅ PASS : BANK_098 - Subquery compare
```sql
SELECT u.id, u.full_name, cc.complaint_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) cc ON u.id = cc.user_id WHERE cc.complaint_count > ( SELECT AVG(complaint_count) FROM ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) x ) ORDER BY cc.complaint_count DESC, u.id ASC;
```

### ✅ PASS : BANK_098 - Window average
```sql
WITH complaint_counts AS ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ), rated AS ( SELECT user_id, complaint_count, AVG(complaint_count) OVER () AS avg_complaint_count FROM complaint_counts ) SELECT u.id, u.full_name, r.complaint_count FROM users u JOIN rated r ON u.id = r.user_id WHERE r.complaint_count > r.avg_complaint_count ORDER BY r.complaint_count DESC, u.id ASC;
```

### ✅ PASS : BANK_099 - CTE fraud rate
```sql
WITH branch_customers AS ( SELECT primary_branch_id AS branch_id, COUNT(DISTINCT user_id) AS customer_count FROM accounts WHERE primary_branch_id IS NOT NULL GROUP BY primary_branch_id ), branch_fraud AS ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN branch_customers bc ON b.id = bc.branch_id LEFT JOIN branch_fraud bf ON b.id = bf.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_099 - Subquery fraud rate
```sql
SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN ( SELECT primary_branch_id AS branch_id, COUNT(DISTINCT user_id) AS customer_count FROM accounts WHERE primary_branch_id IS NOT NULL GROUP BY primary_branch_id ) bc ON b.id = bc.branch_id LEFT JOIN ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) bf ON b.id = bf.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_099 - Branch summary CTE
```sql
WITH branch_customer_pairs AS ( SELECT DISTINCT primary_branch_id AS branch_id, user_id FROM accounts WHERE primary_branch_id IS NOT NULL ), branch_customer_totals AS ( SELECT branch_id, COUNT(*) AS customer_count FROM branch_customer_pairs GROUP BY branch_id ), branch_fraud_totals AS ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bft.fraud_count, 0) / NULLIF(bct.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN branch_customer_totals bct ON b.id = bct.branch_id LEFT JOIN branch_fraud_totals bft ON b.id = bft.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;
```

### ✅ PASS : BANK_100 - CTE branch avg
```sql
WITH user_txn_counts AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), branch_avg_txn AS ( SELECT branch_id, AVG(txn_count) AS avg_txn_count FROM user_txn_counts GROUP BY branch_id ) SELECT u.id, u.full_name, utc.branch_id, utc.txn_count FROM users u JOIN user_txn_counts utc ON u.id = utc.user_id JOIN branch_avg_txn bat ON utc.branch_id = bat.branch_id WHERE utc.txn_count > bat.avg_txn_count ORDER BY utc.txn_count DESC, u.id ASC;
```

### ✅ PASS : BANK_100 - Subquery compare
```sql
SELECT u.id, u.full_name, utc.branch_id, utc.txn_count FROM users u JOIN ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) utc ON u.id = utc.user_id JOIN ( SELECT branch_id, AVG(txn_count) AS avg_txn_count FROM ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) x GROUP BY branch_id ) bat ON utc.branch_id = bat.branch_id WHERE utc.txn_count > bat.avg_txn_count ORDER BY utc.txn_count DESC, u.id ASC;
```

### ✅ PASS : BANK_100 - Window branch avg
```sql
WITH user_txn_counts AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), rated AS ( SELECT branch_id, user_id, txn_count, AVG(txn_count) OVER (PARTITION BY branch_id) AS avg_txn_count FROM user_txn_counts ) SELECT u.id, u.full_name, r.branch_id, r.txn_count FROM users u JOIN rated r ON u.id = r.user_id WHERE r.txn_count > r.avg_txn_count ORDER BY r.txn_count DESC, u.id ASC;
```

