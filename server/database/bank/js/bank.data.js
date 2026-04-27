import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("bank");

export const tableDescriptions = {
  account_holders:
    "Relationship table for joint accounts and authorized signers",
  account_limits:
    "Per-account limits for withdrawals, transfers, ATM, POS, and online spend",
  account_products:
    "Bank account products such as savings, salary, checking, and wallet accounts",
  accounts:
    "Customer deposit and wallet accounts with balances and lifecycle status",
  app_events:
    "Product analytics events from customer banking journeys in app or web",
  atm_machines: "ATM machine inventory and operational status",
  atm_transactions:
    "ATM operations such as withdrawals, deposits, inquiries, and reversals",
  audit_logs:
    "Security and operational audit log of important entity changes and actions",
  beneficiaries:
    "Saved transfer beneficiaries for internal, domestic, and international transfers",
  bill_payments: "Bill payment transactions initiated by customers",
  billers: "Billers for utility, telecom, insurance, and government payments",
  branches: "Physical bank branches where accounts and services are managed",
  card_transactions: "Card authorization and settlement activity at merchants",
  cards:
    "Debit, credit, prepaid, and virtual cards linked to customer accounts",
  complaints: "Formal complaints raised by customers across banking services",
  employees:
    "Internal bank employees such as tellers, managers, compliance, and fraud teams",
  fixed_deposits: "Fixed deposit investments made by bank customers",
  fraud_alerts: "Fraud monitoring alerts triggered on suspicious behavior",
  kyc_records: "Know-your-customer verification lifecycle for bank customers",
  loan_applications:
    "Loan requests submitted by customers and processed by underwriting teams",
  loan_products:
    "Loan offerings such as personal, home, education, and business loans",
  loan_repayments: "Installment schedules and payments for active loans",
  loans: "Booked loans and their repayment lifecycle",
  merchants:
    "Merchant directory for spend analysis and merchant-related risk patterns",
  notification_campaigns: "Customer communication campaigns across channels",
  notification_deliveries:
    "Per-user notification delivery and engagement records",
  recurring_deposits:
    "Recurring deposit savings products funded periodically from accounts",
  reward_earnings: "Reward points or cashback earned from customer activity",
  reward_programs: "Bank loyalty, cashback, referral, and rewards programs",
  reward_redemptions:
    "Customer redemptions of points into cashback, vouchers, or credits",
  support_tickets:
    "Customer support tickets related to accounts, cards, loans, and fraud",
  transaction_categories:
    "Classifications for account transactions such as bills, fees, transfers, and merchant spend",
  transactions:
    "Posted and pending debits and credits recorded against customer accounts",
  transfers:
    "Money transfers between own accounts, internal accounts, or external beneficiaries",
  user_addresses: "User address records for home, mailing, and office purposes",
  users: "Retail banking users and customers using the bank application",
};

export const questions = [
  {
    app_id: appId,
    code: "BANK_001",
    title: "Total Customers Count",
    description: "Find the total number of users in the bank app.",
    difficulty: "easy",
    expected_query: "SELECT COUNT(*) AS total_users FROM users;",
    solution_columns: ["total_users"],
    tables: ["users"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_002",
    title: "Active Customers Count",
    description: "Find the total number of active users.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS active_users FROM users WHERE is_active = true;",
    solution_columns: ["active_users"],
    tables: ["users"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_003",
    title: "Verified Customers Count",
    description: "Find the total number of verified users.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = true;",
    solution_columns: ["verified_users"],
    tables: ["users"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_004",
    title: "All Active Branches",
    description:
      "List all active branches with their branch code, branch name, city, and country.",
    difficulty: "easy",
    expected_query:
      "SELECT branch_code, branch_name, city, country FROM branches WHERE is_active = true ORDER BY branch_code ASC;",
    solution_columns: ["branch_code", "branch_name", "city", "country"],
    tables: ["branches"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "branch_code", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_005",
    title: "Savings Products List",
    description: "Show all account products that are of type savings.",
    difficulty: "easy",
    expected_query:
      "SELECT id, product_name, currency, minimum_balance, interest_rate FROM account_products WHERE product_type = 'savings' ORDER BY id ASC;",
    solution_columns: [
      "id",
      "product_name",
      "currency",
      "minimum_balance",
      "interest_rate",
    ],
    tables: ["account_products"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_006",
    title: "Active Accounts Count",
    description: "Find the total number of accounts that are currently active.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS active_accounts FROM accounts WHERE account_status = 'active';",
    solution_columns: ["active_accounts"],
    tables: ["accounts"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_007",
    title: "Cards Expiring Soon",
    description: "List all cards that expire before January 1, 2027.",
    difficulty: "easy",
    expected_query:
      "SELECT id, masked_card_number, card_type, network, expires_at FROM cards WHERE expires_at < DATE '2027-01-01' ORDER BY expires_at ASC, id ASC;",
    solution_columns: [
      "id",
      "masked_card_number",
      "card_type",
      "network",
      "expires_at",
    ],
    tables: ["cards"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "expires_at", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_008",
    title: "Pending KYC Records",
    description: "Show all KYC records that are currently pending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, verification_level, submitted_at FROM kyc_records WHERE kyc_status = 'pending' ORDER BY id ASC;",
    solution_columns: ["id", "user_id", "verification_level", "submitted_at"],
    tables: ["kyc_records"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_009",
    title: "Failed Transactions",
    description:
      "List all failed transactions with their reference, account, amount, and initiated time.",
    difficulty: "easy",
    expected_query:
      "SELECT transaction_ref, account_id, amount, initiated_at FROM transactions WHERE transaction_status = 'failed' ORDER BY initiated_at DESC, transaction_ref ASC;",
    solution_columns: [
      "transaction_ref",
      "account_id",
      "amount",
      "initiated_at",
    ],
    tables: ["transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "initiated_at", direction: "desc" },
        { column: "transaction_ref", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_010",
    title: "Open Fraud Alerts",
    description: "Show all fraud alerts that are currently open.",
    difficulty: "easy",
    expected_query:
      "SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM fraud_alerts WHERE alert_status = 'open' ORDER BY detected_at DESC, alert_ref ASC;",
    solution_columns: [
      "alert_ref",
      "user_id",
      "account_id",
      "card_id",
      "alert_type",
      "severity",
      "detected_at",
    ],
    tables: ["fraud_alerts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "detected_at", direction: "desc" },
        { column: "alert_ref", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_011",
    title: "Inactive Users List",
    description: "List all users who are currently inactive.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, email, phone, country, created_at FROM users WHERE is_active = false ORDER BY id ASC;",
    solution_columns: [
      "id",
      "full_name",
      "email",
      "phone",
      "country",
      "created_at",
    ],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_012",
    title: "Blocked Cards Count",
    description: "Find the total number of cards that are currently blocked.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS blocked_cards FROM cards WHERE card_status = 'blocked';",
    solution_columns: ["blocked_cards"],
    tables: ["cards"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_013",
    title: "Active ATMs",
    description: "Show all ATM machines that are currently active.",
    difficulty: "easy",
    expected_query:
      "SELECT atm_code, city, country, installed_at FROM atm_machines WHERE atm_status = 'active' ORDER BY atm_code ASC;",
    solution_columns: ["atm_code", "city", "country", "installed_at"],
    tables: ["atm_machines"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "atm_code", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_014",
    title: "Domestic Beneficiaries",
    description: "List all beneficiaries of type domestic_external.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, beneficiary_name, bank_name, account_number, country FROM beneficiaries WHERE beneficiary_type = 'domestic_external' ORDER BY id ASC;",
    solution_columns: [
      "id",
      "user_id",
      "beneficiary_name",
      "bank_name",
      "account_number",
      "country",
    ],
    tables: ["beneficiaries"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_015",
    title: "Rejected Loan Applications",
    description: "Show all loan applications that were rejected.",
    difficulty: "easy",
    expected_query:
      "SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM loan_applications WHERE application_status = 'rejected' ORDER BY decision_at DESC, application_ref ASC;",
    solution_columns: [
      "application_ref",
      "user_id",
      "loan_product_id",
      "requested_amount",
      "requested_term_months",
      "decision_at",
    ],
    tables: ["loan_applications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "decision_at", direction: "desc" },
        { column: "application_ref", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_016",
    title: "Closed Loans Count",
    description: "Find the total number of loans that are closed.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS closed_loans FROM loans WHERE loan_status = 'closed';",
    solution_columns: ["closed_loans"],
    tables: ["loans"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_017",
    title: "Active Billers",
    description: "List all billers that are active.",
    difficulty: "easy",
    expected_query:
      "SELECT id, biller_name, biller_category, country FROM billers WHERE is_active = true ORDER BY biller_name ASC, id ASC;",
    solution_columns: ["id", "biller_name", "biller_category", "country"],
    tables: ["billers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "biller_name", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_018",
    title: "High Severity Fraud Alerts",
    description: "Show all fraud alerts with severity high or critical.",
    difficulty: "easy",
    expected_query:
      "SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at FROM fraud_alerts WHERE severity IN ('high', 'critical') ORDER BY detected_at DESC, alert_ref ASC;",
    solution_columns: [
      "alert_ref",
      "user_id",
      "account_id",
      "alert_type",
      "severity",
      "alert_status",
      "detected_at",
    ],
    tables: ["fraud_alerts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "detected_at", direction: "desc" },
        { column: "alert_ref", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_019",
    title: "Users In India",
    description: "List all users whose country is India.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, email, phone, city FROM users WHERE country = 'India' ORDER BY id ASC;",
    solution_columns: ["id", "full_name", "email", "phone", "city"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_020",
    title: "Pending Support Tickets",
    description: "Show all support tickets that are currently open.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM support_tickets WHERE ticket_status = 'open' ORDER BY created_at DESC, id ASC;",
    solution_columns: [
      "id",
      "user_id",
      "account_id",
      "card_id",
      "loan_id",
      "issue_type",
      "priority",
      "created_at",
    ],
    tables: ["support_tickets"],
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
    code: "BANK_021",
    title: "Users With Multiple Accounts",
    description: "Find users who have more than one account.",
    difficulty: "easy",
    expected_query:
      "SELECT user_id, COUNT(*) AS account_count FROM accounts GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY account_count DESC, user_id ASC;",
    solution_columns: ["user_id", "account_count"],
    tables: ["accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "account_count", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_022",
    title: "Total Balance By User",
    description:
      "Find the total current balance across all accounts for each user.",
    difficulty: "easy",
    expected_query:
      "SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ORDER BY total_balance DESC, user_id ASC;",
    solution_columns: ["user_id", "total_balance"],
    tables: ["accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_balance", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_023",
    title: "Transactions Per Channel",
    description: "Count the number of transactions for each channel.",
    difficulty: "easy",
    expected_query:
      "SELECT channel, COUNT(*) AS transaction_count FROM transactions GROUP BY channel ORDER BY transaction_count DESC, channel ASC;",
    solution_columns: ["channel", "transaction_count"],
    tables: ["transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "transaction_count", direction: "desc" },
        { column: "channel", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_024",
    title: "Average Account Balance",
    description: "Find the average current balance of active accounts.",
    difficulty: "easy",
    expected_query:
      "SELECT ROUND(AVG(current_balance), 2) AS avg_balance FROM accounts WHERE account_status = 'active';",
    solution_columns: ["avg_balance"],
    tables: ["accounts"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_025",
    title: "Card Count By Network",
    description: "Find the total number of cards for each network.",
    difficulty: "easy",
    expected_query:
      "SELECT network, COUNT(*) AS card_count FROM cards GROUP BY network ORDER BY card_count DESC, network ASC;",
    solution_columns: ["network", "card_count"],
    tables: ["cards"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "card_count", direction: "desc" },
        { column: "network", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_026",
    title: "ATM Count By City",
    description: "Find the total number of ATM machines in each city.",
    difficulty: "easy",
    expected_query:
      "SELECT city, COUNT(*) AS atm_count FROM atm_machines GROUP BY city ORDER BY atm_count DESC, city ASC;",
    solution_columns: ["city", "atm_count"],
    tables: ["atm_machines"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "atm_count", direction: "desc" },
        { column: "city", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_027",
    title: "Total Transfer Fees",
    description: "Find the total transfer fees collected.",
    difficulty: "easy",
    expected_query:
      "SELECT SUM(fee_amount) AS total_transfer_fees FROM transfers;",
    solution_columns: ["total_transfer_fees"],
    tables: ["transfers"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_028",
    title: "Approved Loan Applications",
    description: "Count the number of approved loan applications.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS approved_applications FROM loan_applications WHERE application_status = 'approved';",
    solution_columns: ["approved_applications"],
    tables: ["loan_applications"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_029",
    title: "FD Count By Status",
    description: "Find the total number of fixed deposits by status.",
    difficulty: "easy",
    expected_query:
      "SELECT fd_status, COUNT(*) AS fd_count FROM fixed_deposits GROUP BY fd_status ORDER BY fd_count DESC, fd_status ASC;",
    solution_columns: ["fd_status", "fd_count"],
    tables: ["fixed_deposits"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "fd_count", direction: "desc" },
        { column: "fd_status", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_030",
    title: "Total Cashback Redeemed",
    description: "Find the total cashback amount redeemed by users.",
    difficulty: "easy",
    expected_query:
      "SELECT SUM(cashback_amount) AS total_cashback_redeemed FROM reward_redemptions;",
    solution_columns: ["total_cashback_redeemed"],
    tables: ["reward_redemptions"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_031",
    title: "Open Complaints Count",
    description: "Find the total number of complaints that are currently open.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS open_complaints FROM complaints WHERE complaint_status = 'open';",
    solution_columns: ["open_complaints"],
    tables: ["complaints"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_032",
    title: "Accounts By Currency",
    description: "Find the total number of accounts for each currency.",
    difficulty: "easy",
    expected_query:
      "SELECT currency, COUNT(*) AS account_count FROM accounts GROUP BY currency ORDER BY account_count DESC, currency ASC;",
    solution_columns: ["currency", "account_count"],
    tables: ["accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "account_count", direction: "desc" },
        { column: "currency", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_033",
    title: "Average Loan Amount",
    description: "Find the average principal amount of all active loans.",
    difficulty: "easy",
    expected_query:
      "SELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount FROM loans WHERE loan_status = 'active';",
    solution_columns: ["avg_loan_amount"],
    tables: ["loans"],
    comparison_config: { ignore_order: true },
  },
  {
    app_id: appId,
    code: "BANK_034",
    title: "Customers Per Segment",
    description: "Find the number of users in each customer segment.",
    difficulty: "easy",
    expected_query:
      "SELECT customer_segment, COUNT(*) AS user_count FROM users GROUP BY customer_segment ORDER BY user_count DESC, customer_segment ASC;",
    solution_columns: ["customer_segment", "user_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "user_count", direction: "desc" },
        { column: "customer_segment", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_035",
    title: "Cards By Type",
    description: "Find the number of cards issued for each card type.",
    difficulty: "easy",
    expected_query:
      "SELECT card_type, COUNT(*) AS card_count FROM cards GROUP BY card_type ORDER BY card_count DESC, card_type ASC;",
    solution_columns: ["card_type", "card_count"],
    tables: ["cards"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "card_count", direction: "desc" },
        { column: "card_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_036",
    title: "Users With Verified KYC",
    description: "Find all users whose KYC status is verified.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, k.verification_level, k.verified_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'verified' ORDER BY k.verified_at DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "verification_level", "verified_at"],
    tables: ["users", "kyc_records"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "verified_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_037",
    title: "Top 10 Users By Total Balance",
    description:
      "Find the top 10 users with the highest total current balance across all their accounts.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, SUM(a.current_balance) AS total_balance FROM users u JOIN accounts a ON u.id = a.user_id GROUP BY u.id, u.full_name ORDER BY total_balance DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "total_balance"],
    tables: ["users", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_balance", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_038",
    title: "Branch Employee Count",
    description: "Find the number of employees working in each branch.",
    difficulty: "medium",
    expected_query:
      "SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count FROM branches b LEFT JOIN employees e ON b.id = e.branch_id GROUP BY b.id, b.branch_name ORDER BY employee_count DESC, b.id ASC;",
    solution_columns: ["id", "branch_name", "employee_count"],
    tables: ["branches", "employees"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "employee_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_039",
    title: "Users With Open Fraud Alerts",
    description:
      "Find all users who currently have at least one open fraud alert.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN fraud_alerts f ON u.id = f.user_id WHERE f.alert_status = 'open' ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "fraud_alerts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_040",
    title: "Loan Repayment Pending Amount",
    description:
      "Find the total pending repayment amount for each active loan.",
    difficulty: "medium",
    expected_query:
      "SELECT l.id AS loan_id, SUM(r.total_due - r.total_paid) AS pending_amount FROM loans l JOIN loan_repayments r ON l.id = r.loan_id WHERE l.loan_status = 'active' AND r.repayment_status IN ('pending', 'partial', 'late') GROUP BY l.id ORDER BY pending_amount DESC, loan_id ASC;",
    solution_columns: ["loan_id", "pending_amount"],
    tables: ["loans", "loan_repayments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "pending_amount", direction: "desc" },
        { column: "loan_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_041",
    title: "Top Spending Users By Card",
    description: "Find the top 10 users with the highest total card spending.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status IN ('authorized', 'settled') GROUP BY u.id, u.full_name ORDER BY total_card_spend DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "total_card_spend"],
    tables: ["users", "accounts", "cards", "card_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_card_spend", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_042",
    title: "Users With Multiple Beneficiaries",
    description: "Find users who have added more than 3 beneficiaries.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(b.id) AS beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id GROUP BY u.id, u.full_name HAVING COUNT(b.id) > 3 ORDER BY beneficiary_count DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "beneficiary_count"],
    tables: ["users", "beneficiaries"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "beneficiary_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_043",
    title: "ATM Withdrawals By City",
    description: "Find the total cash withdrawn from ATMs by city.",
    difficulty: "medium",
    expected_query:
      "SELECT a.city, ROUND(SUM(t.amount), 2) AS total_withdrawn FROM atm_machines a JOIN atm_transactions t ON a.id = t.atm_id WHERE t.atm_transaction_type = 'cash_withdrawal' AND t.transaction_status = 'success' GROUP BY a.city ORDER BY total_withdrawn DESC, a.city ASC;",
    solution_columns: ["city", "total_withdrawn"],
    tables: ["atm_machines", "atm_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_withdrawn", direction: "desc" },
        { column: "city", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_044",
    title: "Loan Approval Rate By Product",
    description: "Find the approval rate for each loan product.",
    difficulty: "medium",
    expected_query:
      "SELECT lp.id, lp.product_name, ROUND(100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY approval_rate DESC, lp.id ASC;",
    solution_columns: ["id", "product_name", "approval_rate"],
    tables: ["loan_products", "loan_applications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "approval_rate", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_045",
    title: "Branches With Most Active Accounts",
    description: "Find branches having the highest number of active accounts.",
    difficulty: "medium",
    expected_query:
      "SELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count FROM branches b JOIN accounts a ON b.id = a.primary_branch_id WHERE a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_account_count DESC, b.id ASC;",
    solution_columns: ["id", "branch_name", "active_account_count"],
    tables: ["branches", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "active_account_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_046",
    title: "Monthly Transfer Volume",
    description: "Find the total completed transfer amount for each month.",
    difficulty: "medium",
    expected_query:
      "SELECT DATE_TRUNC('month', completed_at) AS transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount FROM transfers WHERE transfer_status = 'completed' GROUP BY DATE_TRUNC('month', completed_at) ORDER BY transfer_month ASC;",
    solution_columns: ["transfer_month", "total_transfer_amount"],
    tables: ["transfers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "transfer_month", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_047",
    title: "Users With Active Fixed Deposits",
    description: "Find users who currently have active fixed deposits.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN fixed_deposits fd ON u.id = fd.user_id WHERE fd.fd_status = 'active' ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "fixed_deposits"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_048",
    title: "Top Merchants By Spend",
    description: "Find the top 10 merchants by total billing amount.",
    difficulty: "medium",
    expected_query:
      "SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend FROM card_transactions WHERE transaction_status = 'settled' GROUP BY merchant_name ORDER BY total_spend DESC, merchant_name ASC LIMIT 10;",
    solution_columns: ["merchant_name", "total_spend"],
    tables: ["card_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_spend", direction: "desc" },
        { column: "merchant_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_049",
    title: "Customer Reward Points Balance",
    description: "Find total reward points earned and redeemed by each user.",
    difficulty: "medium",
    expected_query:
      "WITH earned AS ( SELECT user_id, SUM(points_earned) AS total_earned FROM reward_earnings GROUP BY user_id ), redeemed AS ( SELECT user_id, SUM(points_redeemed) AS total_redeemed FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance FROM users u LEFT JOIN earned e ON u.id = e.user_id LEFT JOIN redeemed r ON u.id = r.user_id ORDER BY reward_points_balance DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "reward_points_balance"],
    tables: ["users", "reward_earnings", "reward_redemptions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "reward_points_balance", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_050",
    title: "Users With Late Loan Payments",
    description: "Find users who have at least one late loan repayment.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id WHERE lr.repayment_status = 'late' ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "loans", "loan_repayments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_051",
    title: "Average Balance By Product",
    description: "Find the average current balance for each account product.",
    difficulty: "medium",
    expected_query:
      "SELECT ap.id, ap.product_name, ROUND(AVG(a.current_balance), 2) AS avg_current_balance FROM account_products ap JOIN accounts a ON ap.id = a.product_id GROUP BY ap.id, ap.product_name ORDER BY avg_current_balance DESC, ap.id ASC;",
    solution_columns: ["id", "product_name", "avg_current_balance"],
    tables: ["account_products", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_current_balance", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_052",
    title: "Employees Handling Loan Applications",
    description:
      "Find employees and the number of loan applications assigned to each of them.",
    difficulty: "medium",
    expected_query:
      "SELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications FROM employees e JOIN loan_applications la ON e.id = la.assigned_employee_id GROUP BY e.id, e.full_name ORDER BY assigned_applications DESC, e.id ASC;",
    solution_columns: ["id", "full_name", "assigned_applications"],
    tables: ["employees", "loan_applications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "assigned_applications", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_053",
    title: "Complaint Resolution Time By Type",
    description:
      "Find the average resolution time in minutes for each complaint type.",
    difficulty: "medium",
    expected_query:
      "SELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins FROM complaints WHERE resolution_time_mins IS NOT NULL GROUP BY complaint_type ORDER BY avg_resolution_time_mins DESC, complaint_type ASC;",
    solution_columns: ["complaint_type", "avg_resolution_time_mins"],
    tables: ["complaints"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_resolution_time_mins", direction: "desc" },
        { column: "complaint_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_054",
    title: "Users With Both Cards And Loans",
    description: "Find users who have at least one card and at least one loan.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN loans l ON u.id = l.borrower_user_id ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "accounts", "cards", "loans"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_055",
    title: "Monthly New Accounts",
    description: "Find the number of accounts opened each month.",
    difficulty: "medium",
    expected_query:
      "SELECT DATE_TRUNC('month', opened_at) AS opened_month, COUNT(*) AS accounts_opened FROM accounts GROUP BY DATE_TRUNC('month', opened_at) ORDER BY opened_month ASC;",
    solution_columns: ["opened_month", "accounts_opened"],
    tables: ["accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "opened_month", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_056",
    title: "Top Users By Incoming Credits",
    description:
      "Find the top 10 users who received the highest total credited amount in posted transactions.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_credited_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_type = 'credit' AND t.transaction_status = 'posted' GROUP BY u.id, u.full_name ORDER BY total_credited_amount DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "total_credited_amount"],
    tables: ["users", "accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_credited_amount", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_057",
    title: "Verified Beneficiaries Per User",
    description:
      "Find the number of verified beneficiaries saved by each user.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(b.id) AS verified_beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id WHERE b.is_verified = true GROUP BY u.id, u.full_name ORDER BY verified_beneficiary_count DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "verified_beneficiary_count"],
    tables: ["users", "beneficiaries"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "verified_beneficiary_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_058",
    title: "Fraud Alerts By Severity",
    description:
      "Find the total number of fraud alerts for each severity level.",
    difficulty: "medium",
    expected_query:
      "SELECT severity, COUNT(*) AS alert_count FROM fraud_alerts GROUP BY severity ORDER BY alert_count DESC, severity ASC;",
    solution_columns: ["severity", "alert_count"],
    tables: ["fraud_alerts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "alert_count", direction: "desc" },
        { column: "severity", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_059",
    title: "Top Biller Categories By Payment Amount",
    description: "Find the total paid amount for each biller category.",
    difficulty: "medium",
    expected_query:
      "SELECT b.biller_category, ROUND(SUM(bp.amount), 2) AS total_paid_amount FROM bill_payments bp JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' GROUP BY b.biller_category ORDER BY total_paid_amount DESC, b.biller_category ASC;",
    solution_columns: ["biller_category", "total_paid_amount"],
    tables: ["bill_payments", "billers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_paid_amount", direction: "desc" },
        { column: "biller_category", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_060",
    title: "Branch Wise Active Customer Count",
    description:
      "Find the number of distinct users with active accounts in each branch.",
    difficulty: "medium",
    expected_query:
      "SELECT b.id, b.branch_name, COUNT(DISTINCT a.user_id) AS active_customer_count FROM branches b JOIN accounts a ON b.id = a.primary_branch_id WHERE a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_customer_count DESC, b.id ASC;",
    solution_columns: ["id", "branch_name", "active_customer_count"],
    tables: ["branches", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "active_customer_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_061",
    title: "Users With Multiple Active Cards",
    description: "Find users who have more than one active card.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(c.id) AS active_card_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id WHERE c.card_status = 'active' GROUP BY u.id, u.full_name HAVING COUNT(c.id) > 1 ORDER BY active_card_count DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "active_card_count"],
    tables: ["users", "accounts", "cards"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "active_card_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_062",
    title: "Average Transaction Amount By Channel",
    description:
      "Find the average posted transaction amount for each transaction channel.",
    difficulty: "medium",
    expected_query:
      "SELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount FROM transactions WHERE transaction_status = 'posted' GROUP BY channel ORDER BY avg_transaction_amount DESC, channel ASC;",
    solution_columns: ["channel", "avg_transaction_amount"],
    tables: ["transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_transaction_amount", direction: "desc" },
        { column: "channel", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_063",
    title: "Top Branches By Total Deposits",
    description:
      "Find the top 10 branches by total current balance across their accounts.",
    difficulty: "medium",
    expected_query:
      "SELECT b.id, b.branch_name, ROUND(SUM(a.current_balance), 2) AS total_deposits FROM branches b JOIN accounts a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY total_deposits DESC, b.id ASC LIMIT 10;",
    solution_columns: ["id", "branch_name", "total_deposits"],
    tables: ["branches", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_deposits", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_064",
    title: "Users With Expired KYC",
    description: "Find users whose KYC records have expired.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'expired' ORDER BY expires_at DESC, id ASC;",
    solution_columns: ["id", "full_name", "expires_at"],
    tables: ["users", "kyc_records"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "expires_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_065",
    title: "Average Credit Score By Loan Product",
    description:
      "Find the average credit score of applicants for each loan product.",
    difficulty: "medium",
    expected_query:
      "SELECT lp.id, lp.product_name, ROUND(AVG(la.credit_score), 2) AS avg_credit_score FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id WHERE la.credit_score IS NOT NULL GROUP BY lp.id, lp.product_name ORDER BY avg_credit_score DESC, lp.id ASC;",
    solution_columns: ["id", "product_name", "avg_credit_score"],
    tables: ["loan_products", "loan_applications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_credit_score", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_066",
    title: "Monthly Card Spend By Network",
    description:
      "Find the total settled billing amount for each card network by month.",
    difficulty: "medium",
    expected_query:
      "SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ROUND(SUM(ct.billing_amount), 2) AS total_spend FROM cards c JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' GROUP BY c.network, DATE_TRUNC('month', ct.transaction_at) ORDER BY spend_month ASC, c.network ASC;",
    solution_columns: ["network", "spend_month", "total_spend"],
    tables: ["cards", "card_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "spend_month", direction: "asc" },
        { column: "network", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_067",
    title: "Users With Both Fixed And Recurring Deposits",
    description:
      "Find users who have at least one fixed deposit and at least one recurring deposit.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN fixed_deposits fd ON u.id = fd.user_id JOIN recurring_deposits rd ON u.id = rd.user_id ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "fixed_deposits", "recurring_deposits"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_068",
    title: "Top Users By Transfer Outflow",
    description:
      "Find the top 10 users by total completed outgoing transfer amount.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transfers t ON a.id = t.from_account_id WHERE t.transfer_status = 'completed' GROUP BY u.id, u.full_name ORDER BY total_outgoing_transfer_amount DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "total_outgoing_transfer_amount"],
    tables: ["users", "accounts", "transfers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_outgoing_transfer_amount", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_069",
    title: "Open Support Tickets By Issue Type",
    description:
      "Find the number of currently open support tickets for each issue type.",
    difficulty: "medium",
    expected_query:
      "SELECT issue_type, COUNT(*) AS open_ticket_count FROM support_tickets WHERE ticket_status = 'open' GROUP BY issue_type ORDER BY open_ticket_count DESC, issue_type ASC;",
    solution_columns: ["issue_type", "open_ticket_count"],
    tables: ["support_tickets"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "open_ticket_count", direction: "desc" },
        { column: "issue_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_070",
    title: "Users With Overdraft Enabled Products",
    description:
      "Find users who have accounts under products that allow overdraft.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN account_products ap ON a.product_id = ap.id WHERE ap.overdraft_allowed = true ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "accounts", "account_products"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_071",
    title: "Users Above Average Balance",
    description:
      "Find users whose total account balance is greater than the average total balance of all users.",
    difficulty: "hard",
    expected_query:
      "WITH user_balances AS ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) SELECT u.id, u.full_name, ub.total_balance FROM users u JOIN user_balances ub ON u.id = ub.user_id WHERE ub.total_balance > (SELECT AVG(total_balance) FROM user_balances) ORDER BY ub.total_balance DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "total_balance"],
    tables: ["users", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_balance", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_072",
    title: "Top 5 Branches By Loan Disbursement",
    description:
      "Find the top 5 branches with the highest total disbursed loan amount.",
    difficulty: "hard",
    expected_query:
      "SELECT b.id, b.branch_name, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM branches b JOIN accounts a ON b.id = a.primary_branch_id JOIN loans l ON a.id = l.disbursement_account_id GROUP BY b.id, b.branch_name ORDER BY total_disbursed_amount DESC, b.id ASC LIMIT 5;",
    solution_columns: ["id", "branch_name", "total_disbursed_amount"],
    tables: ["branches", "accounts", "loans"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_disbursed_amount", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_073",
    title: "Users With Highest Failed Transactions",
    description:
      "Find the top 10 users with the highest number of failed transactions.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(t.id) AS failed_transaction_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'failed' GROUP BY u.id, u.full_name ORDER BY failed_transaction_count DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "failed_transaction_count"],
    tables: ["users", "accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "failed_transaction_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_074",
    title: "Users More Spend Than Income",
    description:
      "Find users whose total debit transaction amount exceeds their total credit transaction amount.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) > SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) ORDER BY total_debit DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "total_debit", "total_credit"],
    tables: ["users", "accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_debit", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_075",
    title: "Highest Risk Users By Fraud Alerts",
    description:
      "Find the top 10 users with the highest number of fraud alerts.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(f.id) AS fraud_alert_count FROM users u JOIN fraud_alerts f ON u.id = f.user_id GROUP BY u.id, u.full_name ORDER BY fraud_alert_count DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "fraud_alert_count"],
    tables: ["users", "fraud_alerts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "fraud_alert_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_076",
    title: "Users With Late EMI Ratio Above 50",
    description:
      "Find users whose more than 50 percent of loan repayments are late.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, ROUND(100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*), 2) AS late_payment_ratio FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY u.id, u.full_name HAVING 100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*) > 50 ORDER BY late_payment_ratio DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "late_payment_ratio"],
    tables: ["users", "loans", "loan_repayments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "late_payment_ratio", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_077",
    title: "Top 5 Merchants By Unique Users",
    description:
      "Find the top 5 merchants used by the highest number of distinct users.",
    difficulty: "hard",
    expected_query:
      "SELECT ct.merchant_name, COUNT(DISTINCT a.user_id) AS unique_user_count FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY ct.merchant_name ORDER BY unique_user_count DESC, ct.merchant_name ASC LIMIT 5;",
    solution_columns: ["merchant_name", "unique_user_count"],
    tables: ["card_transactions", "cards", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "unique_user_count", direction: "desc" },
        { column: "merchant_name", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_078",
    title: "Dormant Accounts Over 6 Months",
    description:
      "Find accounts with no posted transaction in the last 6 months.",
    difficulty: "hard",
    expected_query:
      "SELECT a.id, a.account_number, a.user_id FROM accounts a LEFT JOIN transactions t ON a.id = t.account_id AND t.transaction_status = 'posted' AND t.posted_at >= NOW() - INTERVAL '6 months' GROUP BY a.id, a.account_number, a.user_id HAVING COUNT(t.id) = 0 ORDER BY a.id ASC;",
    solution_columns: ["id", "account_number", "user_id"],
    tables: ["accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_079",
    title: "Users With Multiple Product Types",
    description:
      "Find users who own accounts across more than one product type.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM users u JOIN accounts a ON u.id = a.user_id JOIN account_products ap ON a.product_id = ap.id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT ap.product_type) > 1 ORDER BY distinct_product_types DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "distinct_product_types"],
    tables: ["users", "accounts", "account_products"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_product_types", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_080",
    title: "Top 10 Users By Net Worth",
    description:
      "Find the top 10 users by total deposits plus fixed deposits minus outstanding loans.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COALESCE(SUM(DISTINCT a.current_balance),0) + COALESCE(SUM(DISTINCT fd.principal_amount),0) - COALESCE(SUM(DISTINCT l.outstanding_principal),0) AS estimated_net_worth FROM users u LEFT JOIN accounts a ON u.id = a.user_id LEFT JOIN fixed_deposits fd ON u.id = fd.user_id LEFT JOIN loans l ON u.id = l.borrower_user_id GROUP BY u.id, u.full_name ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "estimated_net_worth"],
    tables: ["users", "accounts", "fixed_deposits", "loans"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "estimated_net_worth", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_081",
    title: "Top 5 Branches By Average Account Balance",
    description:
      "Find the top 5 branches with the highest average current balance across their accounts.",
    difficulty: "hard",
    expected_query:
      "SELECT b.id, b.branch_name, ROUND(AVG(a.current_balance), 2) AS avg_account_balance FROM branches b JOIN accounts a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY avg_account_balance DESC, b.id ASC LIMIT 5;",
    solution_columns: ["id", "branch_name", "avg_account_balance"],
    tables: ["branches", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_account_balance", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_082",
    title: "Users With More Failed Than Posted Transactions",
    description:
      "Find users whose failed transaction count is greater than their posted transaction count.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count, SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) > SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) ORDER BY failed_txn_count DESC, u.id ASC;",
    solution_columns: [
      "id",
      "full_name",
      "failed_txn_count",
      "posted_txn_count",
    ],
    tables: ["users", "accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "failed_txn_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_083",
    title: "Loan Products With Above Average Approval Rate",
    description:
      "Find loan products whose approval rate is above the average approval rate across all loan products.",
    difficulty: "hard",
    expected_query:
      "WITH product_approval_rates AS ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ) SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM product_approval_rates WHERE approval_rate > (SELECT AVG(approval_rate) FROM product_approval_rates) ORDER BY approval_rate DESC, id ASC;",
    solution_columns: ["id", "product_name", "approval_rate"],
    tables: ["loan_products", "loan_applications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "approval_rate", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_084",
    title: "Users With Highest Card Merchant Diversity",
    description:
      "Find the top 10 users who spent at the highest number of distinct merchants.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(DISTINCT ct.merchant_name) AS distinct_merchant_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "distinct_merchant_count"],
    tables: ["users", "accounts", "cards", "card_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_merchant_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_085",
    title: "Accounts With Transfer Outflow Greater Than Inflow",
    description:
      "Find accounts whose total completed outgoing transfer amount is greater than total completed incoming transfer amount.",
    difficulty: "hard",
    expected_query:
      "WITH outgoing_transfers AS ( SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id ), incoming_transfers AS ( SELECT to_account_id AS account_id, SUM(amount) AS total_incoming FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) SELECT a.id, a.account_number, COALESCE(o.total_outgoing, 0) AS total_outgoing, COALESCE(i.total_incoming, 0) AS total_incoming FROM accounts a LEFT JOIN outgoing_transfers o ON a.id = o.account_id LEFT JOIN incoming_transfers i ON a.id = i.account_id WHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0) ORDER BY total_outgoing DESC, a.id ASC;",
    solution_columns: [
      "id",
      "account_number",
      "total_outgoing",
      "total_incoming",
    ],
    tables: ["accounts", "transfers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_outgoing", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_086",
    title: "Top 5 Users By Bill Payment Variety",
    description:
      "Find the top 5 users who paid bills across the highest number of distinct biller categories.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(DISTINCT b.biller_category) AS distinct_biller_categories FROM users u JOIN accounts a ON u.id = a.user_id JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;",
    solution_columns: ["id", "full_name", "distinct_biller_categories"],
    tables: ["users", "accounts", "bill_payments", "billers"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_biller_categories", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_087",
    title: "Users With Consecutive Late Repayments",
    description:
      "Find users who have at least two consecutive late loan repayments on the same loan.",
    difficulty: "hard",
    expected_query:
      "WITH repayment_flags AS ( SELECT l.borrower_user_id AS user_id, lr.loan_id, lr.installment_number, lr.repayment_status, LAG(lr.repayment_status) OVER (PARTITION BY lr.loan_id ORDER BY lr.installment_number) AS prev_status FROM loan_repayments lr JOIN loans l ON lr.loan_id = l.id ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN repayment_flags rf ON u.id = rf.user_id WHERE rf.repayment_status = 'late' AND rf.prev_status = 'late' ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: ["users", "loans", "loan_repayments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_088",
    title: "Top 10 Users By Reward Redemption Rate",
    description:
      "Find the top 10 users with the highest ratio of redeemed points to earned points.",
    difficulty: "hard",
    expected_query:
      "WITH earned AS ( SELECT user_id, SUM(points_earned) AS total_points_earned FROM reward_earnings GROUP BY user_id ), redeemed AS ( SELECT user_id, SUM(points_redeemed) AS total_points_redeemed FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN earned e ON u.id = e.user_id LEFT JOIN redeemed r ON u.id = r.user_id WHERE e.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "redemption_rate"],
    tables: ["users", "reward_earnings", "reward_redemptions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "redemption_rate", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_089",
    title: "Branches With Above Average ATM Failures",
    description:
      "Find branches whose ATM transactions have a failed rate above the overall branch average.",
    difficulty: "hard",
    expected_query:
      "WITH branch_failure_rates AS ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ) SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM branch_failure_rates WHERE failure_rate > (SELECT AVG(failure_rate) FROM branch_failure_rates) ORDER BY failure_rate DESC, id ASC;",
    solution_columns: ["id", "branch_name", "failure_rate"],
    tables: ["branches", "atm_machines", "atm_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "failure_rate", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_090",
    title: "Users Whose Deposits Exceed Branch Average",
    description:
      "Find users whose total account balance is greater than the average total balance of users in their primary branch.",
    difficulty: "hard",
    expected_query:
      "WITH user_branch_balances AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), branch_avg_balances AS ( SELECT branch_id, AVG(total_balance) AS avg_branch_balance FROM user_branch_balances GROUP BY branch_id ) SELECT u.id, u.full_name, ub.branch_id, ub.total_balance FROM users u JOIN user_branch_balances ub ON u.id = ub.user_id JOIN branch_avg_balances bb ON ub.branch_id = bb.branch_id WHERE ub.total_balance > bb.avg_branch_balance ORDER BY ub.total_balance DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "branch_id", "total_balance"],
    tables: ["users", "accounts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_balance", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_091",
    title: "Top 5 Users By Monthly Net Cashflow",
    description:
      "Find the top 5 users with the highest net cashflow (credits minus debits) for each month.",
    difficulty: "hard",
    expected_query:
      "WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, DENSE_RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk FROM monthly_user_cashflow ) ranked WHERE rnk <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;",
    solution_columns: ["user_id", "txn_month", "net_cashflow"],
    tables: ["accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "txn_month", direction: "asc" },
        { column: "net_cashflow", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_092",
    title: "Users More Fraud Than Support Tickets",
    description:
      "Find users whose fraud alert count is greater than their support ticket count.",
    difficulty: "hard",
    expected_query:
      "WITH fraud_counts AS ( SELECT user_id, COUNT(*) AS fraud_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id ), ticket_counts AS ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ) SELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count FROM users u JOIN fraud_counts f ON u.id = f.user_id LEFT JOIN ticket_counts t ON u.id = t.user_id WHERE f.fraud_count > COALESCE(t.ticket_count, 0) ORDER BY f.fraud_count DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "fraud_count", "ticket_count"],
    tables: ["users", "fraud_alerts", "support_tickets"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "fraud_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_093",
    title: "Top 10 Users By Loan Exposure Ratio",
    description:
      "Find the top 10 users by loan exposure ratio (outstanding principal divided by deposits).",
    difficulty: "hard",
    expected_query:
      "WITH deposits AS ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ), exposure AS ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN exposure e ON u.id = e.user_id JOIN deposits d ON u.id = d.user_id WHERE d.total_deposits > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "exposure_ratio"],
    tables: ["users", "accounts", "loans"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "exposure_ratio", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_094",
    title: "Users With Cross Product Portfolio",
    description:
      "Find users who have accounts, loans, and at least one deposit product.",
    difficulty: "hard",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN loans l ON u.id = l.borrower_user_id LEFT JOIN fixed_deposits fd ON u.id = fd.user_id LEFT JOIN recurring_deposits rd ON u.id = rd.user_id WHERE fd.id IS NOT NULL OR rd.id IS NOT NULL ORDER BY u.id ASC;",
    solution_columns: ["id", "full_name"],
    tables: [
      "users",
      "accounts",
      "loans",
      "fixed_deposits",
      "recurring_deposits",
    ],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "BANK_095",
    title: "Top 5 Branches By Customer Product Diversity",
    description:
      "Find the top 5 branches whose customers use the highest number of distinct account product types.",
    difficulty: "hard",
    expected_query:
      "SELECT b.id, b.branch_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM branches b JOIN accounts a ON b.id = a.primary_branch_id JOIN account_products ap ON a.product_id = ap.id GROUP BY b.id, b.branch_name ORDER BY distinct_product_types DESC, b.id ASC LIMIT 5;",
    solution_columns: ["id", "branch_name", "distinct_product_types"],
    tables: ["branches", "accounts", "account_products"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_product_types", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_096",
    title: "Users With High Merchant Concentration",
    description:
      "Find users whose top merchant accounts for more than 50 percent of their total settled card spend.",
    difficulty: "hard",
    expected_query:
      "WITH merchant_spend AS ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ), ranked_spend AS ( SELECT user_id, merchant_name, merchant_total, SUM(merchant_total) OVER (PARTITION BY user_id) AS total_spend, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn FROM merchant_spend ) SELECT u.id, u.full_name, rs.merchant_name, ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct FROM users u JOIN ranked_spend rs ON u.id = rs.user_id WHERE rs.rn = 1 AND 100.0 * rs.merchant_total / rs.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "merchant_name", "concentration_pct"],
    tables: ["users", "accounts", "cards", "card_transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "concentration_pct", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_097",
    title: "Top 10 Users By Account Activity Diversity",
    description:
      "Find the top 10 users by number of distinct transaction channels used.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id, u.full_name, COUNT(DISTINCT t.channel) AS distinct_channels_used FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;",
    solution_columns: ["id", "full_name", "distinct_channels_used"],
    tables: ["users", "accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_channels_used", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_098",
    title: "Users More Complaints Than Average",
    description:
      "Find users whose complaint count is above the average complaint count among users who raised complaints.",
    difficulty: "hard",
    expected_query:
      "WITH complaint_counts AS ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) SELECT u.id, u.full_name, cc.complaint_count FROM users u JOIN complaint_counts cc ON u.id = cc.user_id WHERE cc.complaint_count > (SELECT AVG(complaint_count) FROM complaint_counts) ORDER BY cc.complaint_count DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "complaint_count"],
    tables: ["users", "complaints"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "complaint_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_099",
    title: "Branches With Highest Fraud Rate",
    description:
      "Find the top 5 branches with the highest fraud alert rate per 100 customers.",
    difficulty: "hard",
    expected_query:
      "WITH branch_customers AS ( SELECT primary_branch_id AS branch_id, COUNT(DISTINCT user_id) AS customer_count FROM accounts WHERE primary_branch_id IS NOT NULL GROUP BY primary_branch_id ), branch_fraud AS ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN branch_customers bc ON b.id = bc.branch_id LEFT JOIN branch_fraud bf ON b.id = bf.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;",
    solution_columns: ["id", "branch_name", "fraud_rate_per_100_customers"],
    tables: ["branches", "accounts", "fraud_alerts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "fraud_rate_per_100_customers", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "BANK_100",
    title: "Users More Active Than Their Branch Average",
    description:
      "Find users whose transaction count is greater than the average transaction count of users in their branch.",
    difficulty: "hard",
    expected_query:
      "WITH user_txn_counts AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), branch_avg_txn AS ( SELECT branch_id, AVG(txn_count) AS avg_txn_count FROM user_txn_counts GROUP BY branch_id ) SELECT u.id, u.full_name, utc.branch_id, utc.txn_count FROM users u JOIN user_txn_counts utc ON u.id = utc.user_id JOIN branch_avg_txn bat ON utc.branch_id = bat.branch_id WHERE utc.txn_count > bat.avg_txn_count ORDER BY utc.txn_count DESC, u.id ASC;",
    solution_columns: ["id", "full_name", "branch_id", "txn_count"],
    tables: ["users", "accounts", "transactions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "txn_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
];

export const hints = [
  {
    code: "BANK_001",
    hints: [
      {
        hint_order: 1,
        content: "Count all users from one table.",
      },
      {
        hint_order: 2,
        content: "Use an aggregate function.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) from users.",
      },
    ],
  },
  {
    code: "BANK_002",
    hints: [
      {
        hint_order: 1,
        content: "Filter active users first.",
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
    code: "BANK_003",
    hints: [
      {
        hint_order: 1,
        content: "Filter verified users first.",
      },
      {
        hint_order: 2,
        content: "Use the is_verified column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE is_verified = true.",
      },
    ],
  },
  {
    code: "BANK_004",
    hints: [
      {
        hint_order: 1,
        content: "Only active branches should be listed.",
      },
      {
        hint_order: 2,
        content: "Return branch code, name, city, and country.",
      },
      {
        hint_order: 3,
        content: "Filter by is_active and sort by branch_code.",
      },
    ],
  },
  {
    code: "BANK_005",
    hints: [
      {
        hint_order: 1,
        content: "Look at account products only.",
      },
      {
        hint_order: 2,
        content: "Filter rows where product_type is savings.",
      },
      {
        hint_order: 3,
        content: "Select requested columns and ORDER BY id.",
      },
    ],
  },
  {
    code: "BANK_006",
    hints: [
      {
        hint_order: 1,
        content: "Count only accounts with active status.",
      },
      {
        hint_order: 2,
        content: "Use account_status column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE account_status = 'active'.",
      },
    ],
  },
  {
    code: "BANK_007",
    hints: [
      {
        hint_order: 1,
        content: "This is a date filter question.",
      },
      {
        hint_order: 2,
        content: "Compare expires_at with a fixed date.",
      },
      {
        hint_order: 3,
        content: "Use WHERE expires_at < DATE '2027-01-01'.",
      },
    ],
  },
  {
    code: "BANK_008",
    hints: [
      {
        hint_order: 1,
        content: "Look in the kyc_records table.",
      },
      {
        hint_order: 2,
        content: "Keep only pending KYC rows.",
      },
      {
        hint_order: 3,
        content: "Filter by kyc_status and sort by id.",
      },
    ],
  },
  {
    code: "BANK_009",
    hints: [
      {
        hint_order: 1,
        content: "Only failed transactions are needed.",
      },
      {
        hint_order: 2,
        content: "Return reference, account, amount, and time.",
      },
      {
        hint_order: 3,
        content: "Filter by transaction_status and sort by initiated_at DESC.",
      },
    ],
  },
  {
    code: "BANK_010",
    hints: [
      {
        hint_order: 1,
        content: "Use the fraud_alerts table only.",
      },
      {
        hint_order: 2,
        content: "Keep only open alerts.",
      },
      {
        hint_order: 3,
        content: "Filter by alert_status and sort by detected_at DESC.",
      },
    ],
  },
  {
    code: "BANK_011",
    hints: [
      {
        hint_order: 1,
        content: "Find users who are not active.",
      },
      {
        hint_order: 2,
        content: "Use the is_active boolean column.",
      },
      {
        hint_order: 3,
        content: "WHERE is_active = false and ORDER BY id.",
      },
    ],
  },
  {
    code: "BANK_012",
    hints: [
      {
        hint_order: 1,
        content: "Count only blocked cards.",
      },
      {
        hint_order: 2,
        content: "Use the card_status column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE card_status = 'blocked'.",
      },
    ],
  },
  {
    code: "BANK_013",
    hints: [
      {
        hint_order: 1,
        content: "Use the atm_machines table.",
      },
      {
        hint_order: 2,
        content: "Keep rows where ATM status is active.",
      },
      {
        hint_order: 3,
        content: "Filter by atm_status and sort by atm_code.",
      },
    ],
  },
  {
    code: "BANK_014",
    hints: [
      {
        hint_order: 1,
        content: "Look at beneficiary type.",
      },
      {
        hint_order: 2,
        content: "Only domestic_external rows are needed.",
      },
      {
        hint_order: 3,
        content: "Use WHERE beneficiary_type = 'domestic_external'.",
      },
    ],
  },
  {
    code: "BANK_015",
    hints: [
      {
        hint_order: 1,
        content: "Find rejected loan applications only.",
      },
      {
        hint_order: 2,
        content: "Use the application_status column.",
      },
      {
        hint_order: 3,
        content: "Filter by rejected and sort by decision_at DESC.",
      },
    ],
  },
  {
    code: "BANK_016",
    hints: [
      {
        hint_order: 1,
        content: "Count only closed loans.",
      },
      {
        hint_order: 2,
        content: "Use loan_status for filtering.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE loan_status = 'closed'.",
      },
    ],
  },
  {
    code: "BANK_017",
    hints: [
      {
        hint_order: 1,
        content: "Use the billers table.",
      },
      {
        hint_order: 2,
        content: "Keep only active billers.",
      },
      {
        hint_order: 3,
        content: "Filter by is_active and sort by biller_name.",
      },
    ],
  },
  {
    code: "BANK_018",
    hints: [
      {
        hint_order: 1,
        content: "This needs two severity levels.",
      },
      {
        hint_order: 2,
        content: "Use high and critical values.",
      },
      {
        hint_order: 3,
        content: "WHERE severity IN ('high', 'critical').",
      },
    ],
  },
  {
    code: "BANK_019",
    hints: [
      {
        hint_order: 1,
        content: "Filter users by country.",
      },
      {
        hint_order: 2,
        content: "Only rows with country = India are needed.",
      },
      {
        hint_order: 3,
        content: "Use WHERE country = 'India' and ORDER BY id.",
      },
    ],
  },
  {
    code: "BANK_020",
    hints: [
      {
        hint_order: 1,
        content: "Look at support tickets with open status.",
      },
      {
        hint_order: 2,
        content: "Return ticket details and priority.",
      },
      {
        hint_order: 3,
        content:
          "Filter by ticket_status = 'open' and sort by created_at DESC.",
      },
    ],
  },
  {
    code: "BANK_021",
    hints: [
      {
        hint_order: 1,
        content: "Count accounts per user.",
      },
      {
        hint_order: 2,
        content: "Group by user_id.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_022",
    hints: [
      {
        hint_order: 1,
        content: "Add balances across accounts for each user.",
      },
      {
        hint_order: 2,
        content: "Use SUM(current_balance).",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id and ORDER BY total balance DESC.",
      },
    ],
  },
  {
    code: "BANK_023",
    hints: [
      {
        hint_order: 1,
        content: "Count transactions by channel.",
      },
      {
        hint_order: 2,
        content: "Group on the channel column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY channel.",
      },
    ],
  },
  {
    code: "BANK_024",
    hints: [
      {
        hint_order: 1,
        content: "Only active accounts should be included.",
      },
      {
        hint_order: 2,
        content: "Average the current_balance column.",
      },
      {
        hint_order: 3,
        content:
          "Use AVG(current_balance) with WHERE account_status = 'active'.",
      },
    ],
  },
  {
    code: "BANK_025",
    hints: [
      {
        hint_order: 1,
        content: "Count cards for each network.",
      },
      {
        hint_order: 2,
        content: "Group by network.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY network.",
      },
    ],
  },
  {
    code: "BANK_026",
    hints: [
      {
        hint_order: 1,
        content: "Count ATM machines city-wise.",
      },
      {
        hint_order: 2,
        content: "Use the city column for grouping.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY city.",
      },
    ],
  },
  {
    code: "BANK_027",
    hints: [
      {
        hint_order: 1,
        content: "This is a total of all transfer fees.",
      },
      {
        hint_order: 2,
        content: "Use the fee_amount column.",
      },
      {
        hint_order: 3,
        content: "SUM(fee_amount) from transfers.",
      },
    ],
  },
  {
    code: "BANK_028",
    hints: [
      {
        hint_order: 1,
        content: "Count only approved loan applications.",
      },
      {
        hint_order: 2,
        content: "Use application_status column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE application_status = 'approved'.",
      },
    ],
  },
  {
    code: "BANK_029",
    hints: [
      {
        hint_order: 1,
        content: "Count fixed deposits by status.",
      },
      {
        hint_order: 2,
        content: "Group by fd_status.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY fd_status.",
      },
    ],
  },
  {
    code: "BANK_030",
    hints: [
      {
        hint_order: 1,
        content: "Add all cashback redeemed values.",
      },
      {
        hint_order: 2,
        content: "Use the reward_redemptions table.",
      },
      {
        hint_order: 3,
        content: "SUM(cashback_amount).",
      },
    ],
  },
  {
    code: "BANK_031",
    hints: [
      {
        hint_order: 1,
        content: "Join users with accounts first.",
      },
      {
        hint_order: 2,
        content: "Count accounts per user.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user and use HAVING COUNT(*) > 2.",
      },
    ],
  },
  {
    code: "BANK_032",
    hints: [
      {
        hint_order: 1,
        content: "Find total balance branch-wise.",
      },
      {
        hint_order: 2,
        content: "Use SUM(current_balance).",
      },
      {
        hint_order: 3,
        content: "GROUP BY primary_branch_id and sort descending.",
      },
    ],
  },
  {
    code: "BANK_033",
    hints: [
      {
        hint_order: 1,
        content: "Count posted transactions per account.",
      },
      {
        hint_order: 2,
        content: "Filter by transaction_status = posted.",
      },
      {
        hint_order: 3,
        content: "GROUP BY account_id and ORDER BY count DESC.",
      },
    ],
  },
  {
    code: "BANK_034",
    hints: [
      {
        hint_order: 1,
        content: "Find total transfer amount by sender account.",
      },
      {
        hint_order: 2,
        content: "Use from_account_id for grouping.",
      },
      {
        hint_order: 3,
        content: "SUM(amount) with GROUP BY from_account_id.",
      },
    ],
  },
  {
    code: "BANK_035",
    hints: [
      {
        hint_order: 1,
        content: "Join accounts with cards.",
      },
      {
        hint_order: 2,
        content: "Count cards per account.",
      },
      {
        hint_order: 3,
        content: "GROUP BY account_id and use COUNT(*).",
      },
    ],
  },
  {
    code: "BANK_036",
    hints: [
      {
        hint_order: 1,
        content: "Use loan applications table only.",
      },
      {
        hint_order: 2,
        content: "Group by application_status.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY application_status.",
      },
    ],
  },
  {
    code: "BANK_037",
    hints: [
      {
        hint_order: 1,
        content: "Average approved loan amount by product.",
      },
      {
        hint_order: 2,
        content: "Filter only approved applications.",
      },
      {
        hint_order: 3,
        content: "AVG(requested_amount) grouped by loan_product_id.",
      },
    ],
  },
  {
    code: "BANK_038",
    hints: [
      {
        hint_order: 1,
        content: "Find repayment counts per loan.",
      },
      {
        hint_order: 2,
        content: "Use loan_repayments table.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY loan_id.",
      },
    ],
  },
  {
    code: "BANK_039",
    hints: [
      {
        hint_order: 1,
        content: "Count fraud alerts per severity.",
      },
      {
        hint_order: 2,
        content: "Group by severity column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY severity.",
      },
    ],
  },
  {
    code: "BANK_040",
    hints: [
      {
        hint_order: 1,
        content: "Sum fraud amounts by user.",
      },
      {
        hint_order: 2,
        content: "Use fraud_alerts table.",
      },
      {
        hint_order: 3,
        content: "SUM(suspected_amount) grouped by user_id.",
      },
    ],
  },
  {
    code: "BANK_041",
    hints: [
      {
        hint_order: 1,
        content: "Count bill payments per user.",
      },
      {
        hint_order: 2,
        content: "Join accounts to bill_payments.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id and COUNT(*).",
      },
    ],
  },
  {
    code: "BANK_042",
    hints: [
      {
        hint_order: 1,
        content: "Find total paid bill amount by biller.",
      },
      {
        hint_order: 2,
        content: "Filter only paid status.",
      },
      {
        hint_order: 3,
        content: "SUM(amount_paid) grouped by biller_id.",
      },
    ],
  },
  {
    code: "BANK_043",
    hints: [
      {
        hint_order: 1,
        content: "Count support tickets by priority.",
      },
      {
        hint_order: 2,
        content: "Group by priority column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY priority.",
      },
    ],
  },
  {
    code: "BANK_044",
    hints: [
      {
        hint_order: 1,
        content: "Count complaints per complaint type.",
      },
      {
        hint_order: 2,
        content: "Use complaints table.",
      },
      {
        hint_order: 3,
        content: "GROUP BY complaint_type.",
      },
    ],
  },
  {
    code: "BANK_045",
    hints: [
      {
        hint_order: 1,
        content: "Find total FD amount per user.",
      },
      {
        hint_order: 2,
        content: "Use SUM(principal_amount).",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id.",
      },
    ],
  },
  {
    code: "BANK_046",
    hints: [
      {
        hint_order: 1,
        content: "Find recurring deposit total per user.",
      },
      {
        hint_order: 2,
        content: "Sum installment_amount values.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id and sort descending.",
      },
    ],
  },
  {
    code: "BANK_047",
    hints: [
      {
        hint_order: 1,
        content: "Count reward earnings per user.",
      },
      {
        hint_order: 2,
        content: "Use reward_earnings table.",
      },
      {
        hint_order: 3,
        content: "SUM(points_earned) grouped by user_id.",
      },
    ],
  },
  {
    code: "BANK_048",
    hints: [
      {
        hint_order: 1,
        content: "Find cashback redeemed per user.",
      },
      {
        hint_order: 2,
        content: "Use reward_redemptions table.",
      },
      {
        hint_order: 3,
        content: "SUM(cashback_amount) with GROUP BY user_id.",
      },
    ],
  },
  {
    code: "BANK_049",
    hints: [
      {
        hint_order: 1,
        content: "Count ATM transactions per machine.",
      },
      {
        hint_order: 2,
        content: "Group by atm_id.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with GROUP BY atm_id.",
      },
    ],
  },
  {
    code: "BANK_050",
    hints: [
      {
        hint_order: 1,
        content: "Find failed ATM transactions only.",
      },
      {
        hint_order: 2,
        content: "Filter by transaction_status = failed.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) grouped by atm_id.",
      },
    ],
  },
  {
    code: "BANK_051",
    hints: [
      {
        hint_order: 1,
        content: "Join users with accounts and transactions.",
      },
      {
        hint_order: 2,
        content: "Count transactions per user.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id and use HAVING COUNT(*) > 10.",
      },
    ],
  },
  {
    code: "BANK_052",
    hints: [
      {
        hint_order: 1,
        content: "Find users with total balance above threshold.",
      },
      {
        hint_order: 2,
        content: "Use SUM(current_balance).",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id and HAVING SUM(...) > value.",
      },
    ],
  },
  {
    code: "BANK_053",
    hints: [
      {
        hint_order: 1,
        content: "Join cards with card transactions.",
      },
      {
        hint_order: 2,
        content: "Sum billing amount by card.",
      },
      {
        hint_order: 3,
        content: "GROUP BY card_id and ORDER BY total DESC.",
      },
    ],
  },
  {
    code: "BANK_054",
    hints: [
      {
        hint_order: 1,
        content: "Count beneficiaries per user.",
      },
      {
        hint_order: 2,
        content: "Use beneficiaries table.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id.",
      },
    ],
  },
  {
    code: "BANK_055",
    hints: [
      {
        hint_order: 1,
        content: "Find users with multiple beneficiaries.",
      },
      {
        hint_order: 2,
        content: "Count beneficiaries per user.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_056",
    hints: [
      {
        hint_order: 1,
        content: "Find branches with multiple ATMs.",
      },
      {
        hint_order: 2,
        content: "Count ATMs branch-wise.",
      },
      {
        hint_order: 3,
        content: "GROUP BY branch_id and HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_057",
    hints: [
      {
        hint_order: 1,
        content: "Count active loans per user.",
      },
      {
        hint_order: 2,
        content: "Filter by loan_status = active.",
      },
      {
        hint_order: 3,
        content: "GROUP BY borrower_user_id.",
      },
    ],
  },
  {
    code: "BANK_058",
    hints: [
      {
        hint_order: 1,
        content: "Find total outstanding loan amount by user.",
      },
      {
        hint_order: 2,
        content: "Use SUM(outstanding_principal).",
      },
      {
        hint_order: 3,
        content: "GROUP BY borrower_user_id.",
      },
    ],
  },
  {
    code: "BANK_059",
    hints: [
      {
        hint_order: 1,
        content: "Find users with multiple loan applications.",
      },
      {
        hint_order: 2,
        content: "Count applications per user.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_060",
    hints: [
      {
        hint_order: 1,
        content: "Count fraud alerts per account.",
      },
      {
        hint_order: 2,
        content: "Use fraud_alerts table.",
      },
      {
        hint_order: 3,
        content: "GROUP BY account_id and ORDER BY count DESC.",
      },
    ],
  },
  {
    code: "BANK_061",
    hints: [
      {
        hint_order: 1,
        content: "Join users with accounts and transactions.",
      },
      {
        hint_order: 2,
        content: "Find the latest transaction per user.",
      },
      {
        hint_order: 3,
        content: "Use MAX(posted_at) with GROUP BY user_id.",
      },
    ],
  },
  {
    code: "BANK_062",
    hints: [
      {
        hint_order: 1,
        content: "Find users with transactions in multiple channels.",
      },
      {
        hint_order: 2,
        content: "Count distinct channel values.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(DISTINCT channel) > 1.",
      },
    ],
  },
  {
    code: "BANK_063",
    hints: [
      {
        hint_order: 1,
        content: "Compare debit and credit totals per account.",
      },
      {
        hint_order: 2,
        content: "Use conditional SUM with CASE.",
      },
      {
        hint_order: 3,
        content: "Aggregate debits and credits separately.",
      },
    ],
  },
  {
    code: "BANK_064",
    hints: [
      {
        hint_order: 1,
        content: "Find top users by total transaction amount.",
      },
      {
        hint_order: 2,
        content: "Join accounts and transactions.",
      },
      {
        hint_order: 3,
        content: "SUM(amount) grouped by user_id.",
      },
    ],
  },
  {
    code: "BANK_065",
    hints: [
      {
        hint_order: 1,
        content: "Use transfer table only.",
      },
      {
        hint_order: 2,
        content: "Find accounts sending to multiple receivers.",
      },
      {
        hint_order: 3,
        content: "COUNT(DISTINCT to_account_id).",
      },
    ],
  },
  {
    code: "BANK_066",
    hints: [
      {
        hint_order: 1,
        content: "Find users with multiple card types.",
      },
      {
        hint_order: 2,
        content: "Count distinct card_type values.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(DISTINCT card_type) > 1.",
      },
    ],
  },
  {
    code: "BANK_067",
    hints: [
      {
        hint_order: 1,
        content: "Find users with both debit and credit cards.",
      },
      {
        hint_order: 2,
        content: "Use COUNT DISTINCT on card_type.",
      },
      {
        hint_order: 3,
        content: "Look for at least 2 unique types.",
      },
    ],
  },
  {
    code: "BANK_068",
    hints: [
      {
        hint_order: 1,
        content: "Find loans with late repayments.",
      },
      {
        hint_order: 2,
        content: "Filter repayment_status = late.",
      },
      {
        hint_order: 3,
        content: "GROUP BY loan_id and COUNT(*).",
      },
    ],
  },
  {
    code: "BANK_069",
    hints: [
      {
        hint_order: 1,
        content: "Find users with multiple active loans.",
      },
      {
        hint_order: 2,
        content: "Filter active loans first.",
      },
      {
        hint_order: 3,
        content: "GROUP BY borrower_user_id and HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_070",
    hints: [
      {
        hint_order: 1,
        content: "Compare approved vs rejected applications.",
      },
      {
        hint_order: 2,
        content: "Use CASE inside COUNT or SUM.",
      },
      {
        hint_order: 3,
        content: "Aggregate both statuses together.",
      },
    ],
  },
  {
    code: "BANK_071",
    hints: [
      {
        hint_order: 1,
        content: "Find users with multiple biller categories.",
      },
      {
        hint_order: 2,
        content: "Join accounts, bill payments, and billers.",
      },
      {
        hint_order: 3,
        content: "COUNT(DISTINCT biller_category).",
      },
    ],
  },
  {
    code: "BANK_072",
    hints: [
      {
        hint_order: 1,
        content: "Find users paying bills from multiple accounts.",
      },
      {
        hint_order: 2,
        content: "Count distinct account_id values.",
      },
      {
        hint_order: 3,
        content: "GROUP BY user_id with HAVING.",
      },
    ],
  },
  {
    code: "BANK_073",
    hints: [
      {
        hint_order: 1,
        content: "Find users with repeated complaints.",
      },
      {
        hint_order: 2,
        content: "Count complaints per user.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_074",
    hints: [
      {
        hint_order: 1,
        content: "Find users with both complaint and support tickets.",
      },
      {
        hint_order: 2,
        content: "Join aggregated complaint and ticket sets.",
      },
      {
        hint_order: 3,
        content: "Use INNER JOIN on user_id.",
      },
    ],
  },
  {
    code: "BANK_075",
    hints: [
      {
        hint_order: 1,
        content: "Compare reward earned and redeemed points.",
      },
      {
        hint_order: 2,
        content: "Aggregate each separately.",
      },
      {
        hint_order: 3,
        content: "Join on user_id and compare totals.",
      },
    ],
  },
  {
    code: "BANK_076",
    hints: [
      {
        hint_order: 1,
        content: "Find users with multiple FD accounts.",
      },
      {
        hint_order: 2,
        content: "Count fixed deposits per user.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_077",
    hints: [
      {
        hint_order: 1,
        content: "Find users with both FD and RD products.",
      },
      {
        hint_order: 2,
        content: "Join fixed and recurring deposit users.",
      },
      {
        hint_order: 3,
        content: "Use INNER JOIN on user_id.",
      },
    ],
  },
  {
    code: "BANK_078",
    hints: [
      {
        hint_order: 1,
        content: "Find branches with high ATM failure count.",
      },
      {
        hint_order: 2,
        content: "Join ATMs and ATM transactions.",
      },
      {
        hint_order: 3,
        content: "Filter failed status and GROUP BY branch.",
      },
    ],
  },
  {
    code: "BANK_079",
    hints: [
      {
        hint_order: 1,
        content: "Find accounts with multiple fraud alerts.",
      },
      {
        hint_order: 2,
        content: "Count alerts per account.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(*) > 1.",
      },
    ],
  },
  {
    code: "BANK_080",
    hints: [
      {
        hint_order: 1,
        content: "Find users linked to multiple branches.",
      },
      {
        hint_order: 2,
        content: "Count distinct primary_branch_id.",
      },
      {
        hint_order: 3,
        content: "HAVING COUNT(DISTINCT ...) > 1.",
      },
    ],
  },
  {
    code: "BANK_081",
    hints: [
      {
        hint_order: 1,
        content: "Find average balance branch-wise.",
      },
      {
        hint_order: 2,
        content: "Join branches and accounts.",
      },
      {
        hint_order: 3,
        content: "AVG(current_balance) with GROUP BY branch.",
      },
    ],
  },
  {
    code: "BANK_082",
    hints: [
      {
        hint_order: 1,
        content: "Compare failed vs successful transactions per user.",
      },
      {
        hint_order: 2,
        content: "Use conditional COUNT with CASE or FILTER.",
      },
      {
        hint_order: 3,
        content: "HAVING failed_count > success_count.",
      },
    ],
  },
  {
    code: "BANK_083",
    hints: [
      {
        hint_order: 1,
        content: "Calculate approval rate per loan product.",
      },
      {
        hint_order: 2,
        content: "Use approved / total applications.",
      },
      {
        hint_order: 3,
        content: "Compare with average approval rate.",
      },
    ],
  },
  {
    code: "BANK_084",
    hints: [
      {
        hint_order: 1,
        content: "Find users spending across many merchants.",
      },
      {
        hint_order: 2,
        content: "Count distinct merchant_name values.",
      },
      {
        hint_order: 3,
        content: "Join cards → transactions → accounts.",
      },
    ],
  },
  {
    code: "BANK_085",
    hints: [
      {
        hint_order: 1,
        content: "Compare transfer inflow vs outflow per account.",
      },
      {
        hint_order: 2,
        content: "Aggregate sent and received amounts separately.",
      },
      {
        hint_order: 3,
        content: "Use from_account_id and to_account_id.",
      },
    ],
  },
  {
    code: "BANK_086",
    hints: [
      {
        hint_order: 1,
        content: "Find users paying across multiple biller categories.",
      },
      {
        hint_order: 2,
        content: "Join billers table.",
      },
      {
        hint_order: 3,
        content: "COUNT(DISTINCT biller_category).",
      },
    ],
  },
  {
    code: "BANK_087",
    hints: [
      {
        hint_order: 1,
        content: "Find consecutive late repayments.",
      },
      {
        hint_order: 2,
        content: "Use window function like LAG.",
      },
      {
        hint_order: 3,
        content: "Compare current row with previous repayment.",
      },
    ],
  },
  {
    code: "BANK_088",
    hints: [
      {
        hint_order: 1,
        content: "Compare earned vs redeemed rewards.",
      },
      {
        hint_order: 2,
        content: "Aggregate both tables by user.",
      },
      {
        hint_order: 3,
        content: "Compute redemption percentage.",
      },
    ],
  },
  {
    code: "BANK_089",
    hints: [
      {
        hint_order: 1,
        content: "Find branches with high ATM fraud or failure rate.",
      },
      {
        hint_order: 2,
        content: "Join branch → ATM → transactions.",
      },
      {
        hint_order: 3,
        content: "Compare against branch average.",
      },
    ],
  },
  {
    code: "BANK_090",
    hints: [
      {
        hint_order: 1,
        content: "Find users above branch average balance.",
      },
      {
        hint_order: 2,
        content: "Use AVG per branch.",
      },
      {
        hint_order: 3,
        content: "Compare user total with branch average.",
      },
    ],
  },
  {
    code: "BANK_091",
    hints: [
      {
        hint_order: 1,
        content: "Find top users by monthly cashflow.",
      },
      {
        hint_order: 2,
        content: "Aggregate by month and user.",
      },
      {
        hint_order: 3,
        content: "Use DENSE_RANK or ROW_NUMBER.",
      },
    ],
  },
  {
    code: "BANK_092",
    hints: [
      {
        hint_order: 1,
        content: "Compare fraud alerts and support tickets.",
      },
      {
        hint_order: 2,
        content: "Count both metrics per user.",
      },
      {
        hint_order: 3,
        content: "HAVING fraud_count > ticket_count.",
      },
    ],
  },
  {
    code: "BANK_093",
    hints: [
      {
        hint_order: 1,
        content: "Compare deposits vs loan exposure.",
      },
      {
        hint_order: 2,
        content: "Aggregate deposits and loans separately.",
      },
      {
        hint_order: 3,
        content: "Compute loan-to-deposit ratio.",
      },
    ],
  },
  {
    code: "BANK_094",
    hints: [
      {
        hint_order: 1,
        content: "Find users owning multiple financial products.",
      },
      {
        hint_order: 2,
        content: "Check accounts, loans, and deposits.",
      },
      {
        hint_order: 3,
        content: "Use EXISTS or joins across product tables.",
      },
    ],
  },
  {
    code: "BANK_095",
    hints: [
      {
        hint_order: 1,
        content: "Find branches with product diversity.",
      },
      {
        hint_order: 2,
        content: "Count distinct product types.",
      },
      {
        hint_order: 3,
        content: "GROUP BY branch and sort descending.",
      },
    ],
  },
  {
    code: "BANK_096",
    hints: [
      {
        hint_order: 1,
        content: "Find merchant concentration per user.",
      },
      {
        hint_order: 2,
        content: "Compute merchant spend share.",
      },
      {
        hint_order: 3,
        content: "Use window functions for total spend.",
      },
    ],
  },
  {
    code: "BANK_097",
    hints: [
      {
        hint_order: 1,
        content: "Find users using many transaction channels.",
      },
      {
        hint_order: 2,
        content: "Count DISTINCT channel values.",
      },
      {
        hint_order: 3,
        content: "Join through accounts table.",
      },
    ],
  },
  {
    code: "BANK_098",
    hints: [
      {
        hint_order: 1,
        content: "Find users above average complaint count.",
      },
      {
        hint_order: 2,
        content: "Aggregate complaints per user first.",
      },
      {
        hint_order: 3,
        content: "Compare with AVG complaint count.",
      },
    ],
  },
  {
    code: "BANK_099",
    hints: [
      {
        hint_order: 1,
        content: "Find branches with high fraud rate.",
      },
      {
        hint_order: 2,
        content: "Compute fraud alerts per customer.",
      },
      {
        hint_order: 3,
        content: "Sort by fraud ratio descending.",
      },
    ],
  },
  {
    code: "BANK_100",
    hints: [
      {
        hint_order: 1,
        content: "Find users above branch average transaction volume.",
      },
      {
        hint_order: 2,
        content: "Aggregate transaction count per user and branch.",
      },
      {
        hint_order: 3,
        content: "Compare with AVG count using CTE or window.",
      },
    ],
  },
];

export const conceptFilters = [
  {
    code: "BANK_001",
    concepts: ["aggregation", "count"],
  },
  {
    code: "BANK_002",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_003",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_004",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_005",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_006",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_007",
    concepts: ["filtering", "date_functions", "sorting", "comparison"],
  },
  {
    code: "BANK_008",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_009",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_010",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_011",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_012",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_013",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_014",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_015",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_016",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_017",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_018",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_019",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_020",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_021",
    concepts: [
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_022",
    concepts: ["aggregation", "sum", "group_by", "sorting"],
  },
  {
    code: "BANK_023",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_024",
    concepts: [
      "aggregation",
      "average",
      "filtering",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_025",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_026",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_027",
    concepts: ["aggregation", "sum"],
  },
  {
    code: "BANK_028",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_029",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_030",
    concepts: ["aggregation", "sum"],
  },
  {
    code: "BANK_031",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "BANK_032",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_033",
    concepts: [
      "aggregation",
      "average",
      "filtering",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_034",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_035",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_036",
    concepts: ["joins", "filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_037",
    concepts: ["joins", "aggregation", "sum", "group_by", "sorting", "limit"],
  },
  {
    code: "BANK_038",
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
    code: "BANK_039",
    concepts: ["joins", "filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "BANK_040",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "calculation",
      "arithmetic",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_041",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "calculation",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_042",
    concepts: [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_043",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "calculation",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_044",
    concepts: [
      "joins",
      "aggregation",
      "sum",
      "count",
      "group_by",
      "case_when",
      "conditional_aggregation",
      "arithmetic",
      "calculation",
      "sorting",
    ],
  },
  {
    code: "BANK_045",
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
    code: "BANK_046",
    concepts: [
      "aggregation",
      "sum",
      "group_by",
      "date_functions",
      "trend_analysis",
      "filtering",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_047",
    concepts: ["joins", "filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "BANK_048",
    concepts: [
      "aggregation",
      "sum",
      "group_by",
      "filtering",
      "sorting",
      "limit",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_049",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "sorting",
    ],
  },
  {
    code: "BANK_050",
    concepts: ["joins", "filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "BANK_051",
    concepts: [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
    ],
  },
  {
    code: "BANK_052",
    concepts: ["joins", "aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_053",
    concepts: [
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_054",
    concepts: ["joins", "distinct", "sorting"],
  },
  {
    code: "BANK_055",
    concepts: [
      "aggregation",
      "count",
      "group_by",
      "date_functions",
      "trend_analysis",
      "sorting",
    ],
  },
  {
    code: "BANK_056",
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
    code: "BANK_057",
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
    code: "BANK_058",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "BANK_059",
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
    code: "BANK_060",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_061",
    concepts: [
      "joins",
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
    code: "BANK_062",
    concepts: [
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_063",
    concepts: [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "calculation",
    ],
  },
  {
    code: "BANK_064",
    concepts: ["joins", "filtering", "sorting", "comparison"],
  },
  {
    code: "BANK_065",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_066",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "date_functions",
      "trend_analysis",
      "sorting",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_067",
    concepts: ["joins", "distinct", "sorting"],
  },
  {
    code: "BANK_068",
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
    code: "BANK_069",
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
    code: "BANK_070",
    concepts: ["joins", "filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "BANK_071",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "average",
      "group_by",
      "subquery",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "BANK_072",
    concepts: [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "calculation",
    ],
  },
  {
    code: "BANK_073",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_074",
    concepts: [
      "joins",
      "filtering",
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
    code: "BANK_075",
    concepts: ["joins", "aggregation", "count", "group_by", "sorting", "limit"],
  },
  {
    code: "BANK_076",
    concepts: [
      "joins",
      "aggregation",
      "sum",
      "count",
      "group_by",
      "having",
      "case_when",
      "conditional_aggregation",
      "arithmetic",
      "calculation",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_077",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_078",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "having",
      "date_functions",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_079",
    concepts: [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_080",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "sorting",
      "limit",
    ],
  },
  {
    code: "BANK_081",
    concepts: [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation",
    ],
  },
  {
    code: "BANK_082",
    concepts: [
      "joins",
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
    code: "BANK_083",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "count",
      "average",
      "group_by",
      "case_when",
      "conditional_aggregation",
      "subquery",
      "filtering",
      "sorting",
      "arithmetic",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_084",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_085",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "group_by",
      "null_handling",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "BANK_086",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_087",
    concepts: [
      "cte",
      "joins",
      "filtering",
      "distinct",
      "lag",
      "lag_lead",
      "window_functions",
      "partition_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_088",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "filtering",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_089",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "count",
      "average",
      "group_by",
      "case_when",
      "conditional_aggregation",
      "subquery",
      "filtering",
      "sorting",
      "arithmetic",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_090",
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
      "calculation",
    ],
  },
  {
    code: "BANK_091",
    concepts: [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "case_when",
      "conditional_aggregation",
      "date_functions",
      "trend_analysis",
      "window_functions",
      "ranking",
      "partition_by",
      "sorting",
      "subquery",
      "arithmetic",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_092",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "BANK_093",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "filtering",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_094",
    concepts: [
      "joins",
      "left_join",
      "filtering",
      "distinct",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "BANK_095",
    concepts: [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
    ],
  },
  {
    code: "BANK_096",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "filtering",
      "sorting",
      "arithmetic",
      "calculation",
      "comparison",
    ],
  },
  {
    code: "BANK_097",
    concepts: [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
    ],
  },
  {
    code: "BANK_098",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "average",
      "group_by",
      "subquery",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "BANK_099",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "count_distinct",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "filtering",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "BANK_100",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
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
    code: "BANK_001",
    approaches: [
      {
        approach_title: "COUNT rows",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT COUNT(*) AS total_users FROM users;",
        explanation:
          "## Approach\n\nCount all rows in `users`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one bank user.\n- `COUNT(*)` returns the total number of rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the shortest and clearest way to count all users.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(id) AS total_users FROM users;",
        explanation:
          "## Approach\n\nCount the primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result as counting all rows.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for total row counting.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;",
        explanation:
          "## Approach\n\nCompute the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;\n```\n\n## Explanation\n\n- The CTE calculates the total number of users.\n- The outer query selects that calculated value.\n- This pattern is useful when you want to build a larger query later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "BANK_002",
    approaches: [
      {
        approach_title: "Filter then count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS active_users FROM users WHERE is_active = true;",
        explanation:
          "## Approach\n\nFilter active users first, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_users\nFROM users\nWHERE is_active = true;\n```\n\n## Explanation\n\n- `WHERE is_active = true` keeps only active users.\n- `COUNT(*)` counts the filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is explicit, simple, and easy for learners to understand.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(*) AS active_users FROM users WHERE is_active;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_users\nFROM users\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- Only active users are counted.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for practice.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_users FROM users;",
        explanation:
          "## Approach\n\nPut the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_users\nFROM users;\n```\n\n## Explanation\n\n- `FILTER` tells `COUNT(*)` to include only active rows.\n- This is especially useful when calculating multiple conditional counts in one query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single count.",
      },
    ],
  },
  {
    code: "BANK_003",
    approaches: [
      {
        approach_title: "Verified count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = true;",
        explanation:
          "## Approach\n\nFilter verified users, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_users\nFROM users\nWHERE is_verified = true;\n```\n\n## Explanation\n\n- `WHERE is_verified = true` keeps only verified users.\n- `COUNT(*)` returns how many such users exist.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is the clearest way to answer the question.",
      },
      {
        approach_title: "Boolean filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) AS verified_users FROM users WHERE is_verified;",
        explanation:
          "## Approach\n\nUse the boolean column directly in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_users\nFROM users\nWHERE is_verified;\n```\n\n## Explanation\n\n- PostgreSQL allows boolean columns directly in `WHERE`.\n- Only rows with `is_verified = true` are counted.\n\n## Difference from the optimal approach\n\nIt works, but is a bit less explicit for beginners.",
      },
      {
        approach_title: "SUM case",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT SUM(CASE WHEN is_verified = true THEN 1 ELSE 0 END) AS verified_users FROM users;",
        explanation:
          "## Approach\n\nTurn verified rows into 1 and everything else into 0, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN is_verified = true THEN 1 ELSE 0 END) AS verified_users\nFROM users;\n```\n\n## Explanation\n\n- Verified rows contribute `1`.\n- Unverified rows contribute `0`.\n- Summing gives the total number of verified users.\n\n## Difference from the optimal approach\n\nUseful to learn conditional aggregation, but longer than a simple filtered count.",
      },
    ],
  },
  {
    code: "BANK_004",
    approaches: [
      {
        approach_title: "Filter active branches",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT branch_code, branch_name, city, country FROM branches WHERE is_active = true ORDER BY branch_code ASC;",
        explanation:
          "## Approach\n\nKeep active branches and return the required columns.\n\n## Query\n\n```sql\nSELECT branch_code, branch_name, city, country\nFROM branches\nWHERE is_active = true\nORDER BY branch_code ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = true` filters to active branches only.\n- The `SELECT` clause keeps just the requested fields.\n- `ORDER BY branch_code ASC` gives a stable output order.\n\n## Why this is optimal\n\nIt directly matches the business requirement and expected ordering.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT branch_code, branch_name, city, country FROM branches WHERE is_active ORDER BY branch_code ASC;",
        explanation:
          "## Approach\n\nUse the boolean column directly in the filter.\n\n## Query\n\n```sql\nSELECT branch_code, branch_name, city, country\nFROM branches\nWHERE is_active\nORDER BY branch_code ASC;\n```\n\n## Explanation\n\n- `WHERE is_active` means the same as `WHERE is_active = true`.\n- The rows are still sorted by branch code.\n\n## Difference from the optimal approach\n\nShorter, but slightly less explicit.",
      },
      {
        approach_title: "CTE active branches",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_branches AS (\n  SELECT branch_code, branch_name, city, country\n  FROM branches\n  WHERE is_active = true\n)\nSELECT branch_code, branch_name, city, country\nFROM active_branches\nORDER BY branch_code ASC;",
        explanation:
          "## Approach\n\nSeparate filtering from final output using a CTE.\n\n## Query\n\n```sql\nWITH active_branches AS (\n  SELECT branch_code, branch_name, city, country\n  FROM branches\n  WHERE is_active = true\n)\nSELECT branch_code, branch_name, city, country\nFROM active_branches\nORDER BY branch_code ASC;\n```\n\n## Explanation\n\n- The CTE isolates active branches first.\n- The outer query handles the final ordered output.\n- This pattern is helpful when later adding joins or more logic.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "BANK_005",
    approaches: [
      {
        approach_title: "Filter savings",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, product_name, currency, minimum_balance, interest_rate FROM account_products WHERE product_type = 'savings' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter account products to only savings products.\n\n## Query\n\n```sql\nSELECT id, product_name, currency, minimum_balance, interest_rate\nFROM account_products\nWHERE product_type = 'savings'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE product_type = 'savings'` keeps only savings products.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` ensures a stable order.\n\n## Why this is optimal\n\nIt is the most direct way to fetch only savings product rows.",
      },
      {
        approach_title: "CTE savings",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH savings_products AS (\n  SELECT id, product_name, currency, minimum_balance, interest_rate\n  FROM account_products\n  WHERE product_type = 'savings'\n)\nSELECT id, product_name, currency, minimum_balance, interest_rate\nFROM savings_products\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter the product type in a CTE, then return the results.\n\n## Query\n\n```sql\nWITH savings_products AS (\n  SELECT id, product_name, currency, minimum_balance, interest_rate\n  FROM account_products\n  WHERE product_type = 'savings'\n)\nSELECT id, product_name, currency, minimum_balance, interest_rate\nFROM savings_products\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates savings products first.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nUseful for readability in larger queries, but unnecessary here.",
      },
      {
        approach_title: "CASE filter",
        approach_type: "conditional_logic",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, product_name, currency, minimum_balance, interest_rate FROM account_products WHERE CASE WHEN product_type = 'savings' THEN true ELSE false END ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse a `CASE` expression inside the filter.\n\n## Query\n\n```sql\nSELECT id, product_name, currency, minimum_balance, interest_rate\nFROM account_products\nWHERE CASE WHEN product_type = 'savings' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` returns `true` only for savings products.\n- Those rows are then included in the result.\n\n## Difference from the optimal approach\n\nThis works, but is much more verbose than a normal filter.",
      },
    ],
  },
  {
    code: "BANK_006",
    approaches: [
      {
        approach_title: "Count active accounts",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS active_accounts FROM accounts WHERE account_status = 'active';",
        explanation:
          "## Approach\n\nFilter to active accounts, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_accounts\nFROM accounts\nWHERE account_status = 'active';\n```\n\n## Explanation\n\n- `WHERE account_status = 'active'` keeps only active accounts.\n- `COUNT(*)` returns the number of matching rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt directly answers the question with minimal SQL.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS active_accounts FROM accounts WHERE account_status = 'active';",
        explanation:
          "## Approach\n\nCount the account ids after filtering active rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS active_accounts\nFROM accounts\nWHERE account_status = 'active';\n```\n\n## Explanation\n\n- The filter keeps only active accounts.\n- `id` is the primary key, so it is always non-NULL.\n- That makes this equivalent to `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE account_status = 'active') AS active_accounts FROM accounts;",
        explanation:
          "## Approach\n\nApply the condition inside the aggregate function.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE account_status = 'active') AS active_accounts\nFROM accounts;\n```\n\n## Explanation\n\n- `FILTER` limits the count to rows where the status is `active`.\n- This pattern is helpful when computing several conditional counts at once.\n\n## Difference from the optimal approach\n\nMore flexible, but less straightforward for one metric.",
      },
    ],
  },
  {
    code: "BANK_007",
    approaches: [
      {
        approach_title: "Date filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, masked_card_number, card_type, network, expires_at FROM cards WHERE expires_at < DATE '2027-01-01' ORDER BY expires_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter cards by expiry date, then sort them.\n\n## Query\n\n```sql\nSELECT id, masked_card_number, card_type, network, expires_at\nFROM cards\nWHERE expires_at < DATE '2027-01-01'\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE expires_at < DATE '2027-01-01'` keeps only cards expiring before that date.\n- The selected columns match the expected output.\n- Sorting by expiry date first shows the soonest-expiring cards first.\n\n## Why this is optimal\n\nIt is clear, accurate, and matches the required ordering.",
      },
      {
        approach_title: "CTE expiring cards",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH expiring_cards AS (\n  SELECT id, masked_card_number, card_type, network, expires_at\n  FROM cards\n  WHERE expires_at < DATE '2027-01-01'\n)\nSELECT id, masked_card_number, card_type, network, expires_at\nFROM expiring_cards\nORDER BY expires_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFirst isolate matching cards in a CTE.\n\n## Query\n\n```sql\nWITH expiring_cards AS (\n  SELECT id, masked_card_number, card_type, network, expires_at\n  FROM cards\n  WHERE expires_at < DATE '2027-01-01'\n)\nSELECT id, masked_card_number, card_type, network, expires_at\nFROM expiring_cards\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores cards that expire before the target date.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but can help when building on the result later.",
      },
      {
        approach_title: "Interval compare",
        approach_type: "date_handling",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, masked_card_number, card_type, network, expires_at FROM cards WHERE expires_at <= DATE '2026-12-31' ORDER BY expires_at ASC, id ASC;",
        explanation:
          "## Approach\n\nUse an equivalent cutoff date comparison.\n\n## Query\n\n```sql\nSELECT id, masked_card_number, card_type, network, expires_at\nFROM cards\nWHERE expires_at <= DATE '2026-12-31'\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- Any date before `2027-01-01` is also less than or equal to `2026-12-31`.\n- So this produces the same result.\n\n## Difference from the optimal approach\n\nEquivalent, but the original condition matches the question wording more naturally.",
      },
    ],
  },
  {
    code: "BANK_008",
    approaches: [
      {
        approach_title: "Filter pending KYC",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, verification_level, submitted_at FROM kyc_records WHERE kyc_status = 'pending' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter KYC records by pending status.\n\n## Query\n\n```sql\nSELECT id, user_id, verification_level, submitted_at\nFROM kyc_records\nWHERE kyc_status = 'pending'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE kyc_status = 'pending'` keeps only pending records.\n- The selected columns are exactly the requested output.\n- `ORDER BY id ASC` gives consistent ordering.\n\n## Why this is optimal\n\nIt is the most direct and readable solution.",
      },
      {
        approach_title: "CTE pending KYC",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH pending_kyc AS (\n  SELECT id, user_id, verification_level, submitted_at\n  FROM kyc_records\n  WHERE kyc_status = 'pending'\n)\nSELECT id, user_id, verification_level, submitted_at\nFROM pending_kyc\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore pending KYC rows in a CTE and then return them.\n\n## Query\n\n```sql\nWITH pending_kyc AS (\n  SELECT id, user_id, verification_level, submitted_at\n  FROM kyc_records\n  WHERE kyc_status = 'pending'\n)\nSELECT id, user_id, verification_level, submitted_at\nFROM pending_kyc\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE captures only pending KYC records.\n- The outer query simply returns them in order.\n\n## Difference from the optimal approach\n\nGood for step-by-step readability, but longer than needed.",
      },
      {
        approach_title: "CASE filter",
        approach_type: "conditional_logic",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, user_id, verification_level, submitted_at FROM kyc_records WHERE CASE WHEN kyc_status = 'pending' THEN true ELSE false END ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse a `CASE` expression to keep pending records.\n\n## Query\n\n```sql\nSELECT id, user_id, verification_level, submitted_at\nFROM kyc_records\nWHERE CASE WHEN kyc_status = 'pending' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` returns `true` only for pending KYC rows.\n- Those rows are included in the result.\n\n## Difference from the optimal approach\n\nWorks, but much less clean than a direct equality check.",
      },
    ],
  },
  {
    code: "BANK_009",
    approaches: [
      {
        approach_title: "Filter failed",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT transaction_ref, account_id, amount, initiated_at FROM transactions WHERE transaction_status = 'failed' ORDER BY initiated_at DESC, transaction_ref ASC;",
        explanation:
          "## Approach\n\nKeep failed transactions and sort them by latest first.\n\n## Query\n\n```sql\nSELECT transaction_ref, account_id, amount, initiated_at\nFROM transactions\nWHERE transaction_status = 'failed'\nORDER BY initiated_at DESC, transaction_ref ASC;\n```\n\n## Explanation\n\n- `WHERE transaction_status = 'failed'` filters to failed transactions only.\n- The query returns the required reference, account, amount, and time columns.\n- `ORDER BY initiated_at DESC` shows the newest failed transactions first.\n- `transaction_ref ASC` is used as a tie-breaker.\n\n## Why this is optimal\n\nIt directly matches the requirement and expected ordering.",
      },
      {
        approach_title: "CTE failed txns",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH failed_transactions AS (\n  SELECT transaction_ref, account_id, amount, initiated_at\n  FROM transactions\n  WHERE transaction_status = 'failed'\n)\nSELECT transaction_ref, account_id, amount, initiated_at\nFROM failed_transactions\nORDER BY initiated_at DESC, transaction_ref ASC;",
        explanation:
          "## Approach\n\nSeparate the filtering step into a CTE.\n\n## Query\n\n```sql\nWITH failed_transactions AS (\n  SELECT transaction_ref, account_id, amount, initiated_at\n  FROM transactions\n  WHERE transaction_status = 'failed'\n)\nSELECT transaction_ref, account_id, amount, initiated_at\nFROM failed_transactions\nORDER BY initiated_at DESC, transaction_ref ASC;\n```\n\n## Explanation\n\n- The CTE collects only failed transactions.\n- The outer query handles the final ordering.\n- This style is useful when the failed subset is reused later.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed for one output.",
      },
      {
        approach_title: "Subquery filter",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT transaction_ref, account_id, amount, initiated_at FROM ( SELECT transaction_ref, account_id, amount, initiated_at FROM transactions WHERE transaction_status = 'failed' ) t ORDER BY initiated_at DESC, transaction_ref ASC;",
        explanation:
          "## Approach\n\nUse a derived table to first isolate failed transactions.\n\n## Query\n\n```sql\nSELECT transaction_ref, account_id, amount, initiated_at\nFROM (\n  SELECT transaction_ref, account_id, amount, initiated_at\n  FROM transactions\n  WHERE transaction_status = 'failed'\n) t\nORDER BY initiated_at DESC, transaction_ref ASC;\n```\n\n## Explanation\n\n- The inner query selects only failed transactions.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nValid, but unnecessary for a simple filter-and-sort query.",
      },
    ],
  },
  {
    code: "BANK_010",
    approaches: [
      {
        approach_title: "Filter open alerts",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM fraud_alerts WHERE alert_status = 'open' ORDER BY detected_at DESC, alert_ref ASC;",
        explanation:
          "## Approach\n\nFilter fraud alerts to only open ones and sort by latest detection time.\n\n## Query\n\n```sql\nSELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\nFROM fraud_alerts\nWHERE alert_status = 'open'\nORDER BY detected_at DESC, alert_ref ASC;\n```\n\n## Explanation\n\n- `WHERE alert_status = 'open'` keeps only currently open alerts.\n- The selected columns match the expected output.\n- `ORDER BY detected_at DESC` shows the most recent alerts first.\n- `alert_ref ASC` is used as a tie-breaker.\n\n## Why this is optimal\n\nIt cleanly answers the question with the exact requested fields and ordering.",
      },
      {
        approach_title: "CTE open alerts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH open_alerts AS (\n  SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\n  FROM fraud_alerts\n  WHERE alert_status = 'open'\n)\nSELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\nFROM open_alerts\nORDER BY detected_at DESC, alert_ref ASC;",
        explanation:
          "## Approach\n\nFirst isolate open alerts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH open_alerts AS (\n  SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\n  FROM fraud_alerts\n  WHERE alert_status = 'open'\n)\nSELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\nFROM open_alerts\nORDER BY detected_at DESC, alert_ref ASC;\n```\n\n## Explanation\n\n- The CTE creates a reusable set of open alerts.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nHelpful in larger workflows, but more verbose here.",
      },
      {
        approach_title: "Subquery alerts",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM ( SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at FROM fraud_alerts WHERE alert_status = 'open' ) f ORDER BY detected_at DESC, alert_ref ASC;",
        explanation:
          "## Approach\n\nUse a subquery to isolate open fraud alerts before sorting.\n\n## Query\n\n```sql\nSELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\nFROM (\n  SELECT alert_ref, user_id, account_id, card_id, alert_type, severity, detected_at\n  FROM fraud_alerts\n  WHERE alert_status = 'open'\n) f\nORDER BY detected_at DESC, alert_ref ASC;\n```\n\n## Explanation\n\n- The inner query filters the open alerts.\n- The outer query sorts the result.\n\n## Difference from the optimal approach\n\nThis works, but adds an unnecessary layer for a simple query.",
      },
    ],
  },
  {
    code: "BANK_011",
    approaches: [
      {
        approach_title: "Filter inactive",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, email, phone, country, created_at FROM users WHERE is_active = false ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users to only inactive ones.\n\n## Query\n\n```sql\nSELECT id, full_name, email, phone, country, created_at\nFROM users\nWHERE is_active = false\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = false` keeps only inactive users.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` gives a stable result order.\n\n## Why this is optimal\n\nIt is the most direct and readable way to return inactive users.",
      },
      {
        approach_title: "NOT boolean",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, full_name, email, phone, country, created_at FROM users WHERE NOT is_active ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse boolean negation to keep inactive rows.\n\n## Query\n\n```sql\nSELECT id, full_name, email, phone, country, created_at\nFROM users\nWHERE NOT is_active\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `NOT is_active` means the same as `is_active = false`.\n- The query still returns only inactive users.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for learners.",
      },
      {
        approach_title: "CTE inactive",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH inactive_users AS (\n  SELECT id, full_name, email, phone, country, created_at\n  FROM users\n  WHERE is_active = false\n)\nSELECT id, full_name, email, phone, country, created_at\nFROM inactive_users\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nFirst isolate inactive users in a CTE.\n\n## Query\n\n```sql\nWITH inactive_users AS (\n  SELECT id, full_name, email, phone, country, created_at\n  FROM users\n  WHERE is_active = false\n)\nSELECT id, full_name, email, phone, country, created_at\nFROM inactive_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE stores only inactive users.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when building a larger query.",
      },
    ],
  },
  {
    code: "BANK_012",
    approaches: [
      {
        approach_title: "Count blocked",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS blocked_cards FROM cards WHERE card_status = 'blocked';",
        explanation:
          "## Approach\n\nFilter blocked cards, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS blocked_cards\nFROM cards\nWHERE card_status = 'blocked';\n```\n\n## Explanation\n\n- `WHERE card_status = 'blocked'` keeps only blocked cards.\n- `COUNT(*)` returns the number of those rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nThis is the clearest way to count blocked cards.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS blocked_cards FROM cards WHERE card_status = 'blocked';",
        explanation:
          "## Approach\n\nCount primary key values after filtering.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS blocked_cards\nFROM cards\nWHERE card_status = 'blocked';\n```\n\n## Explanation\n\n- The filter keeps only blocked cards.\n- `id` is never NULL, so `COUNT(id)` matches row count.\n\n## Difference from the optimal approach\n\nWorks the same, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE card_status = 'blocked') AS blocked_cards FROM cards;",
        explanation:
          "## Approach\n\nPut the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE card_status = 'blocked') AS blocked_cards\nFROM cards;\n```\n\n## Explanation\n\n- `FILTER` limits the count to blocked cards.\n- This style is useful when computing several conditional counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one count.",
      },
    ],
  },
  {
    code: "BANK_013",
    approaches: [
      {
        approach_title: "Filter active ATMs",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT atm_code, city, country, installed_at FROM atm_machines WHERE atm_status = 'active' ORDER BY atm_code ASC;",
        explanation:
          "## Approach\n\nKeep only active ATM machines.\n\n## Query\n\n```sql\nSELECT atm_code, city, country, installed_at\nFROM atm_machines\nWHERE atm_status = 'active'\nORDER BY atm_code ASC;\n```\n\n## Explanation\n\n- `WHERE atm_status = 'active'` filters the ATM table.\n- The selected columns match the required output.\n- `ORDER BY atm_code ASC` ensures stable ordering.\n\n## Why this is optimal\n\nIt directly matches the question with minimal SQL.",
      },
      {
        approach_title: "CTE ATMs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_atms AS (\n  SELECT atm_code, city, country, installed_at\n  FROM atm_machines\n  WHERE atm_status = 'active'\n)\nSELECT atm_code, city, country, installed_at\nFROM active_atms\nORDER BY atm_code ASC;",
        explanation:
          "## Approach\n\nStore active ATMs in a CTE first.\n\n## Query\n\n```sql\nWITH active_atms AS (\n  SELECT atm_code, city, country, installed_at\n  FROM atm_machines\n  WHERE atm_status = 'active'\n)\nSELECT atm_code, city, country, installed_at\nFROM active_atms\nORDER BY atm_code ASC;\n```\n\n## Explanation\n\n- The CTE isolates only active machines.\n- The outer query returns them in the expected order.\n\n## Difference from the optimal approach\n\nUseful for readability, but unnecessary here.",
      },
      {
        approach_title: "Subquery ATMs",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT atm_code, city, country, installed_at FROM ( SELECT atm_code, city, country, installed_at FROM atm_machines WHERE atm_status = 'active' ) a ORDER BY atm_code ASC;",
        explanation:
          "## Approach\n\nUse a derived table to isolate active ATMs.\n\n## Query\n\n```sql\nSELECT atm_code, city, country, installed_at\nFROM (\n  SELECT atm_code, city, country, installed_at\n  FROM atm_machines\n  WHERE atm_status = 'active'\n) a\nORDER BY atm_code ASC;\n```\n\n## Explanation\n\n- The inner query filters the rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nValid, but adds an extra layer without benefit.",
      },
    ],
  },
  {
    code: "BANK_014",
    approaches: [
      {
        approach_title: "Filter domestic",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, beneficiary_name, bank_name, account_number, country FROM beneficiaries WHERE beneficiary_type = 'domestic_external' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter beneficiaries to the domestic external type.\n\n## Query\n\n```sql\nSELECT id, user_id, beneficiary_name, bank_name, account_number, country\nFROM beneficiaries\nWHERE beneficiary_type = 'domestic_external'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE beneficiary_type = 'domestic_external'` keeps only those beneficiaries.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` gives a stable order.\n\n## Why this is optimal\n\nIt is the simplest and clearest solution.",
      },
      {
        approach_title: "CTE domestic",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH domestic_beneficiaries AS (\n  SELECT id, user_id, beneficiary_name, bank_name, account_number, country\n  FROM beneficiaries\n  WHERE beneficiary_type = 'domestic_external'\n)\nSELECT id, user_id, beneficiary_name, bank_name, account_number, country\nFROM domestic_beneficiaries\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nFirst isolate domestic external beneficiaries in a CTE.\n\n## Query\n\n```sql\nWITH domestic_beneficiaries AS (\n  SELECT id, user_id, beneficiary_name, bank_name, account_number, country\n  FROM beneficiaries\n  WHERE beneficiary_type = 'domestic_external'\n)\nSELECT id, user_id, beneficiary_name, bank_name, account_number, country\nFROM domestic_beneficiaries\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only matching beneficiary rows.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but can help in larger multi-step queries.",
      },
      {
        approach_title: "CASE filter",
        approach_type: "conditional_logic",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, user_id, beneficiary_name, bank_name, account_number, country FROM beneficiaries WHERE CASE WHEN beneficiary_type = 'domestic_external' THEN true ELSE false END ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse a `CASE` expression inside the filter.\n\n## Query\n\n```sql\nSELECT id, user_id, beneficiary_name, bank_name, account_number, country\nFROM beneficiaries\nWHERE CASE WHEN beneficiary_type = 'domestic_external' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` returns `true` only for domestic external beneficiaries.\n- Those rows are then returned.\n\n## Difference from the optimal approach\n\nWorks, but is unnecessarily long.",
      },
    ],
  },
  {
    code: "BANK_015",
    approaches: [
      {
        approach_title: "Filter rejected",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM loan_applications WHERE application_status = 'rejected' ORDER BY decision_at DESC, application_ref ASC;",
        explanation:
          "## Approach\n\nKeep only rejected loan applications, then sort them.\n\n## Query\n\n```sql\nSELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\nFROM loan_applications\nWHERE application_status = 'rejected'\nORDER BY decision_at DESC, application_ref ASC;\n```\n\n## Explanation\n\n- `WHERE application_status = 'rejected'` filters the table.\n- The selected columns match the expected output.\n- `ORDER BY decision_at DESC` shows the latest decisions first.\n- `application_ref ASC` breaks ties.\n\n## Why this is optimal\n\nIt directly answers the question and matches the required ordering.",
      },
      {
        approach_title: "CTE rejected",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH rejected_applications AS (\n  SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\n  FROM loan_applications\n  WHERE application_status = 'rejected'\n)\nSELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\nFROM rejected_applications\nORDER BY decision_at DESC, application_ref ASC;",
        explanation:
          "## Approach\n\nPut rejected applications into a CTE first.\n\n## Query\n\n```sql\nWITH rejected_applications AS (\n  SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\n  FROM loan_applications\n  WHERE application_status = 'rejected'\n)\nSELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\nFROM rejected_applications\nORDER BY decision_at DESC, application_ref ASC;\n```\n\n## Explanation\n\n- The CTE isolates rejected applications.\n- The outer query returns them in the final order.\n\n## Difference from the optimal approach\n\nGood structure, but longer than necessary.",
      },
      {
        approach_title: "Subquery rejected",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM ( SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at FROM loan_applications WHERE application_status = 'rejected' ) la ORDER BY decision_at DESC, application_ref ASC;",
        explanation:
          "## Approach\n\nUse a subquery to isolate rejected applications.\n\n## Query\n\n```sql\nSELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\nFROM (\n  SELECT application_ref, user_id, loan_product_id, requested_amount, requested_term_months, decision_at\n  FROM loan_applications\n  WHERE application_status = 'rejected'\n) la\nORDER BY decision_at DESC, application_ref ASC;\n```\n\n## Explanation\n\n- The inner query filters rejected applications.\n- The outer query applies the expected ordering.\n\n## Difference from the optimal approach\n\nValid, but adds unnecessary nesting.",
      },
    ],
  },
  {
    code: "BANK_016",
    approaches: [
      {
        approach_title: "Count closed loans",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS closed_loans FROM loans WHERE loan_status = 'closed';",
        explanation:
          "## Approach\n\nFilter closed loans, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS closed_loans\nFROM loans\nWHERE loan_status = 'closed';\n```\n\n## Explanation\n\n- `WHERE loan_status = 'closed'` keeps only closed loans.\n- `COUNT(*)` returns how many such rows exist.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to solve this.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS closed_loans FROM loans WHERE loan_status = 'closed';",
        explanation:
          "## Approach\n\nCount non-NULL primary keys after filtering.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS closed_loans\nFROM loans\nWHERE loan_status = 'closed';\n```\n\n## Explanation\n\n- The filter keeps only closed loans.\n- `id` is never NULL, so this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nEquivalent result, but less direct.",
      },
      {
        approach_title: "SUM case",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT SUM(CASE WHEN loan_status = 'closed' THEN 1 ELSE 0 END) AS closed_loans FROM loans;",
        explanation:
          "## Approach\n\nConvert closed loans into 1 and others into 0, then sum.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN loan_status = 'closed' THEN 1 ELSE 0 END) AS closed_loans\nFROM loans;\n```\n\n## Explanation\n\n- Closed loans contribute `1`.\n- All other loans contribute `0`.\n- Summing those values gives the total number of closed loans.\n\n## Difference from the optimal approach\n\nGood for learning conditional aggregation, but longer here.",
      },
    ],
  },
  {
    code: "BANK_017",
    approaches: [
      {
        approach_title: "Filter active billers",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, biller_name, biller_category, country FROM billers WHERE is_active = true ORDER BY biller_name ASC, id ASC;",
        explanation:
          "## Approach\n\nKeep only active billers and return the requested columns.\n\n## Query\n\n```sql\nSELECT id, biller_name, biller_category, country\nFROM billers\nWHERE is_active = true\nORDER BY biller_name ASC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = true` filters the table to active billers.\n- The selected columns match the expected output.\n- `ORDER BY biller_name ASC, id ASC` gives a stable sorted result.\n\n## Why this is optimal\n\nIt is direct, readable, and matches the requested ordering.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, biller_name, biller_category, country FROM billers WHERE is_active ORDER BY biller_name ASC, id ASC;",
        explanation:
          "## Approach\n\nUse the boolean column directly.\n\n## Query\n\n```sql\nSELECT id, biller_name, biller_category, country\nFROM billers\nWHERE is_active\nORDER BY biller_name ASC, id ASC;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means `WHERE is_active = true`.\n- The result still includes only active billers.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for learners.",
      },
      {
        approach_title: "CTE billers",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_billers AS (\n  SELECT id, biller_name, biller_category, country\n  FROM billers\n  WHERE is_active = true\n)\nSELECT id, biller_name, biller_category, country\nFROM active_billers\nORDER BY biller_name ASC, id ASC;",
        explanation:
          "## Approach\n\nFirst isolate active billers in a CTE.\n\n## Query\n\n```sql\nWITH active_billers AS (\n  SELECT id, biller_name, biller_category, country\n  FROM billers\n  WHERE is_active = true\n)\nSELECT id, biller_name, biller_category, country\nFROM active_billers\nORDER BY biller_name ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the filtered billers.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nUseful for multi-step queries, but unnecessary here.",
      },
    ],
  },
  {
    code: "BANK_018",
    approaches: [
      {
        approach_title: "IN severity",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at FROM fraud_alerts WHERE severity IN ('high', 'critical') ORDER BY detected_at DESC, alert_ref ASC;",
        explanation:
          "## Approach\n\nFilter fraud alerts to only high and critical severity.\n\n## Query\n\n```sql\nSELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at\nFROM fraud_alerts\nWHERE severity IN ('high', 'critical')\nORDER BY detected_at DESC, alert_ref ASC;\n```\n\n## Explanation\n\n- `IN ('high', 'critical')` keeps only those severity levels.\n- The selected columns match the expected output.\n- `ORDER BY detected_at DESC` shows the most recent alerts first.\n- `alert_ref ASC` breaks ties.\n\n## Why this is optimal\n\n`IN` is clean and readable when matching a small set of values.",
      },
      {
        approach_title: "OR filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at FROM fraud_alerts WHERE severity = 'high' OR severity = 'critical' ORDER BY detected_at DESC, alert_ref ASC;",
        explanation:
          "## Approach\n\nUse two comparisons joined by `OR`.\n\n## Query\n\n```sql\nSELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at\nFROM fraud_alerts\nWHERE severity = 'high' OR severity = 'critical'\nORDER BY detected_at DESC, alert_ref ASC;\n```\n\n## Explanation\n\n- The query keeps alerts with either high or critical severity.\n- This returns the same rows as `IN`.\n\n## Difference from the optimal approach\n\nCorrect, but `IN` is shorter and cleaner.",
      },
      {
        approach_title: "CTE severity",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH severe_alerts AS (\n  SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at\n  FROM fraud_alerts\n  WHERE severity IN ('high', 'critical')\n)\nSELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at\nFROM severe_alerts\nORDER BY detected_at DESC, alert_ref ASC;",
        explanation:
          "## Approach\n\nFirst isolate severe alerts in a CTE.\n\n## Query\n\n```sql\nWITH severe_alerts AS (\n  SELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at\n  FROM fraud_alerts\n  WHERE severity IN ('high', 'critical')\n)\nSELECT alert_ref, user_id, account_id, alert_type, severity, alert_status, detected_at\nFROM severe_alerts\nORDER BY detected_at DESC, alert_ref ASC;\n```\n\n## Explanation\n\n- The CTE captures only severe alerts.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to expand later.",
      },
    ],
  },
  {
    code: "BANK_019",
    approaches: [
      {
        approach_title: "Country filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, email, phone, city FROM users WHERE country = 'India' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users by country.\n\n## Query\n\n```sql\nSELECT id, full_name, email, phone, city\nFROM users\nWHERE country = 'India'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE country = 'India'` keeps only users from India.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` gives consistent ordering.\n\n## Why this is optimal\n\nIt directly answers the question in the clearest way.",
      },
      {
        approach_title: "CTE India",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH india_users AS (\n  SELECT id, full_name, email, phone, city\n  FROM users\n  WHERE country = 'India'\n)\nSELECT id, full_name, email, phone, city\nFROM india_users\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore Indian users in a CTE first.\n\n## Query\n\n```sql\nWITH india_users AS (\n  SELECT id, full_name, email, phone, city\n  FROM users\n  WHERE country = 'India'\n)\nSELECT id, full_name, email, phone, city\nFROM india_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates matching users.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nGood structure, but longer than needed.",
      },
      {
        approach_title: "CASE filter",
        approach_type: "conditional_logic",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, full_name, email, phone, city FROM users WHERE CASE WHEN country = 'India' THEN true ELSE false END ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse a `CASE` expression in the filter.\n\n## Query\n\n```sql\nSELECT id, full_name, email, phone, city\nFROM users\nWHERE CASE WHEN country = 'India' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` returns `true` only for rows where country is India.\n- Those rows are returned.\n\n## Difference from the optimal approach\n\nThis works, but is much more verbose than a normal filter.",
      },
    ],
  },
  {
    code: "BANK_020",
    approaches: [
      {
        approach_title: "Filter open tickets",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM support_tickets WHERE ticket_status = 'open' ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only open support tickets and sort by newest first.\n\n## Query\n\n```sql\nSELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\nFROM support_tickets\nWHERE ticket_status = 'open'\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE ticket_status = 'open'` filters the table to open tickets only.\n- The selected columns match the expected output.\n- `ORDER BY created_at DESC` shows the latest tickets first.\n- `id ASC` breaks ties.\n\n## Why this is optimal\n\nIt directly matches both the filtering and ordering requirements.",
      },
      {
        approach_title: "CTE tickets",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH open_tickets AS (\n  SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n)\nSELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\nFROM open_tickets\nORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFirst isolate open tickets in a CTE.\n\n## Query\n\n```sql\nWITH open_tickets AS (\n  SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n)\nSELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\nFROM open_tickets\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores only open support tickets.\n- The outer query returns them with the required sort.\n\n## Difference from the optimal approach\n\nMore verbose, but can help in multi-step queries.",
      },
      {
        approach_title: "Subquery tickets",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM ( SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at FROM support_tickets WHERE ticket_status = 'open' ) st ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a derived table to isolate open support tickets.\n\n## Query\n\n```sql\nSELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\nFROM (\n  SELECT id, user_id, account_id, card_id, loan_id, issue_type, priority, created_at\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n) st\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query filters open tickets.\n- The outer query applies the final sorting.\n\n## Difference from the optimal approach\n\nValid, but adds unnecessary nesting for a simple query.",
      },
    ],
  },
  {
    code: "BANK_021",
    approaches: [
      {
        approach_title: "Group and having",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) AS account_count FROM accounts GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY account_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nGroup accounts by user and keep only users with more than one account.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS account_count\nFROM accounts\nGROUP BY user_id\nHAVING COUNT(*) > 1\nORDER BY account_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one group per user.\n- `COUNT(*)` counts how many accounts each user has.\n- `HAVING COUNT(*) > 1` keeps only users with multiple accounts.\n- The final ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the standard and most direct way to filter grouped counts.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id, COUNT(id) AS account_count FROM accounts GROUP BY user_id HAVING COUNT(id) > 1 ORDER BY account_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount account ids per user.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(id) AS account_count\nFROM accounts\nGROUP BY user_id\nHAVING COUNT(id) > 1\nORDER BY account_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL account ids.\n- Since `id` is a primary key, it is never NULL.\n- So this gives the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct for row counting.",
      },
      {
        approach_title: "CTE accounts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_accounts AS (\n  SELECT user_id, COUNT(*) AS account_count\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT user_id, account_count\nFROM user_accounts\nWHERE account_count > 1\nORDER BY account_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount accounts in a CTE, then filter in the outer query.\n\n## Query\n\n```sql\nWITH user_accounts AS (\n  SELECT user_id, COUNT(*) AS account_count\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT user_id, account_count\nFROM user_accounts\nWHERE account_count > 1\nORDER BY account_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates account count per user.\n- The outer query keeps only users with more than one account.\n- This structure is useful when you want to reuse the grouped result.\n\n## Difference from the optimal approach\n\nLonger, but easier to extend.",
      },
    ],
  },
  {
    code: "BANK_022",
    approaches: [
      {
        approach_title: "Sum by user",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ORDER BY total_balance DESC, user_id ASC;",
        explanation:
          "## Approach\n\nGroup accounts by user and sum their balances.\n\n## Query\n\n```sql\nSELECT user_id, SUM(current_balance) AS total_balance\nFROM accounts\nGROUP BY user_id\nORDER BY total_balance DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per user.\n- `SUM(current_balance)` adds balances across that user's accounts.\n- The output is sorted by highest total balance first.\n\n## Why this is optimal\n\nIt directly calculates the total balance per user with the fewest steps.",
      },
      {
        approach_title: "CTE sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_balances AS (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT user_id, total_balance\nFROM user_balances\nORDER BY total_balance DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCalculate user balances in a CTE first.\n\n## Query\n\n```sql\nWITH user_balances AS (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT user_id, total_balance\nFROM user_balances\nORDER BY total_balance DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE computes the balance total for each user.\n- The outer query simply returns the sorted result.\n\n## Difference from the optimal approach\n\nUseful for readability, but unnecessary for a single aggregation.",
      },
      {
        approach_title: "Subquery sum",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT user_id, total_balance FROM ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) ub ORDER BY total_balance DESC, user_id ASC;",
        explanation:
          "## Approach\n\nAggregate in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT user_id, total_balance\nFROM (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n) ub\nORDER BY total_balance DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner query calculates total balance per user.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nValid, but adds an extra layer without much value here.",
      },
    ],
  },
  {
    code: "BANK_023",
    approaches: [
      {
        approach_title: "Group channels",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel, COUNT(*) AS transaction_count FROM transactions GROUP BY channel ORDER BY transaction_count DESC, channel ASC;",
        explanation:
          "## Approach\n\nGroup transactions by channel and count rows in each group.\n\n## Query\n\n```sql\nSELECT channel, COUNT(*) AS transaction_count\nFROM transactions\nGROUP BY channel\nORDER BY transaction_count DESC, channel ASC;\n```\n\n## Explanation\n\n- `GROUP BY channel` creates one group per transaction channel.\n- `COUNT(*)` counts transactions in each group.\n- The sort shows busiest channels first.\n\n## Why this is optimal\n\nIt is the cleanest way to produce counts per category.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT channel, COUNT(id) AS transaction_count FROM transactions GROUP BY channel ORDER BY transaction_count DESC, channel ASC;",
        explanation:
          "## Approach\n\nCount transaction ids per channel.\n\n## Query\n\n```sql\nSELECT channel, COUNT(id) AS transaction_count\nFROM transactions\nGROUP BY channel\nORDER BY transaction_count DESC, channel ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since transaction ids are never NULL, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nWorks the same, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE channels",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_counts AS (\n  SELECT channel, COUNT(*) AS transaction_count\n  FROM transactions\n  GROUP BY channel\n)\nSELECT channel, transaction_count\nFROM channel_counts\nORDER BY transaction_count DESC, channel ASC;",
        explanation:
          "## Approach\n\nCompute channel counts in a CTE and return them.\n\n## Query\n\n```sql\nWITH channel_counts AS (\n  SELECT channel, COUNT(*) AS transaction_count\n  FROM transactions\n  GROUP BY channel\n)\nSELECT channel, transaction_count\nFROM channel_counts\nORDER BY transaction_count DESC, channel ASC;\n```\n\n## Explanation\n\n- The CTE creates the grouped summary first.\n- The outer query handles only the ordering.\n\n## Difference from the optimal approach\n\nSlightly more verbose, but helpful when combining with other summaries.",
      },
    ],
  },
  {
    code: "BANK_024",
    approaches: [
      {
        approach_title: "AVG active",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ROUND(AVG(current_balance), 2) AS avg_balance FROM accounts WHERE account_status = 'active';",
        explanation:
          "## Approach\n\nFilter active accounts, then average their balances.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(current_balance), 2) AS avg_balance\nFROM accounts\nWHERE account_status = 'active';\n```\n\n## Explanation\n\n- `WHERE account_status = 'active'` keeps only active accounts.\n- `AVG(current_balance)` calculates the average balance.\n- `ROUND(..., 2)` formats the result to two decimal places.\n\n## Why this is optimal\n\nIt directly expresses the exact metric requested.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_accounts AS (\n  SELECT current_balance\n  FROM accounts\n  WHERE account_status = 'active'\n)\nSELECT ROUND(AVG(current_balance), 2) AS avg_balance\nFROM active_accounts;",
        explanation:
          "## Approach\n\nPut active account balances in a CTE first.\n\n## Query\n\n```sql\nWITH active_accounts AS (\n  SELECT current_balance\n  FROM accounts\n  WHERE account_status = 'active'\n)\nSELECT ROUND(AVG(current_balance), 2) AS avg_balance\nFROM active_accounts;\n```\n\n## Explanation\n\n- The CTE isolates balances from active accounts.\n- The outer query calculates the rounded average.\n\n## Difference from the optimal approach\n\nGood for stepwise readability, but longer than needed.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ROUND(AVG(current_balance), 2) AS avg_balance FROM ( SELECT current_balance FROM accounts WHERE account_status = 'active' ) a;",
        explanation:
          "## Approach\n\nFilter balances in a subquery, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(current_balance), 2) AS avg_balance\nFROM (\n  SELECT current_balance\n  FROM accounts\n  WHERE account_status = 'active'\n) a;\n```\n\n## Explanation\n\n- The inner query returns balances for active accounts only.\n- The outer query calculates the rounded average.\n\n## Difference from the optimal approach\n\nValid, but unnecessary for a simple filter plus aggregate.",
      },
    ],
  },
  {
    code: "BANK_025",
    approaches: [
      {
        approach_title: "Group networks",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT network, COUNT(*) AS card_count FROM cards GROUP BY network ORDER BY card_count DESC, network ASC;",
        explanation:
          "## Approach\n\nGroup cards by network and count them.\n\n## Query\n\n```sql\nSELECT network, COUNT(*) AS card_count\nFROM cards\nGROUP BY network\nORDER BY card_count DESC, network ASC;\n```\n\n## Explanation\n\n- `GROUP BY network` creates one group per card network.\n- `COUNT(*)` counts cards in each network.\n- The output is sorted by count descending.\n\n## Why this is optimal\n\nIt is the standard and clearest solution for counts by category.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT network, COUNT(id) AS card_count FROM cards GROUP BY network ORDER BY card_count DESC, network ASC;",
        explanation:
          "## Approach\n\nCount card ids inside each network group.\n\n## Query\n\n```sql\nSELECT network, COUNT(id) AS card_count\nFROM cards\nGROUP BY network\nORDER BY card_count DESC, network ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` works because `id` is never NULL.\n- So the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "CTE networks",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH network_counts AS (\n  SELECT network, COUNT(*) AS card_count\n  FROM cards\n  GROUP BY network\n)\nSELECT network, card_count\nFROM network_counts\nORDER BY card_count DESC, network ASC;",
        explanation:
          "## Approach\n\nBuild the grouped result in a CTE first.\n\n## Query\n\n```sql\nWITH network_counts AS (\n  SELECT network, COUNT(*) AS card_count\n  FROM cards\n  GROUP BY network\n)\nSELECT network, card_count\nFROM network_counts\nORDER BY card_count DESC, network ASC;\n```\n\n## Explanation\n\n- The CTE computes card count per network.\n- The outer query returns the sorted summary.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if this grouped result is reused.",
      },
    ],
  },
  {
    code: "BANK_026",
    approaches: [
      {
        approach_title: "Group cities",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT city, COUNT(*) AS atm_count FROM atm_machines GROUP BY city ORDER BY atm_count DESC, city ASC;",
        explanation:
          "## Approach\n\nGroup ATM machines by city and count them.\n\n## Query\n\n```sql\nSELECT city, COUNT(*) AS atm_count\nFROM atm_machines\nGROUP BY city\nORDER BY atm_count DESC, city ASC;\n```\n\n## Explanation\n\n- `GROUP BY city` creates one group for each city.\n- `COUNT(*)` counts ATM machines in each city.\n- Sorting shows cities with the most ATMs first.\n\n## Why this is optimal\n\nIt is the simplest and most readable grouped count.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT city, COUNT(id) AS atm_count FROM atm_machines GROUP BY city ORDER BY atm_count DESC, city ASC;",
        explanation:
          "## Approach\n\nCount ATM ids per city.\n\n## Query\n\n```sql\nSELECT city, COUNT(id) AS atm_count\nFROM atm_machines\nGROUP BY city\nORDER BY atm_count DESC, city ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since ATM ids are never NULL, it matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nSame result, but `COUNT(*)` is cleaner.",
      },
      {
        approach_title: "CTE cities",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH city_atm_counts AS (\n  SELECT city, COUNT(*) AS atm_count\n  FROM atm_machines\n  GROUP BY city\n)\nSELECT city, atm_count\nFROM city_atm_counts\nORDER BY atm_count DESC, city ASC;",
        explanation:
          "## Approach\n\nCalculate ATM counts by city in a CTE.\n\n## Query\n\n```sql\nWITH city_atm_counts AS (\n  SELECT city, COUNT(*) AS atm_count\n  FROM atm_machines\n  GROUP BY city\n)\nSELECT city, atm_count\nFROM city_atm_counts\nORDER BY atm_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE computes the grouped counts.\n- The outer query only handles display order.\n\n## Difference from the optimal approach\n\nLonger, but useful in more complex reporting.",
      },
    ],
  },
  {
    code: "BANK_027",
    approaches: [
      {
        approach_title: "Sum fees",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT SUM(fee_amount) AS total_transfer_fees FROM transfers;",
        explanation:
          "## Approach\n\nAdd up all transfer fees.\n\n## Query\n\n```sql\nSELECT SUM(fee_amount) AS total_transfer_fees\nFROM transfers;\n```\n\n## Explanation\n\n- `SUM(fee_amount)` adds all fee values in the table.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to total all transfer fees.",
      },
      {
        approach_title: "CTE fees",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH fee_totals AS (\n  SELECT SUM(fee_amount) AS total_transfer_fees\n  FROM transfers\n)\nSELECT total_transfer_fees\nFROM fee_totals;",
        explanation:
          "## Approach\n\nCompute the fee total in a CTE, then return it.\n\n## Query\n\n```sql\nWITH fee_totals AS (\n  SELECT SUM(fee_amount) AS total_transfer_fees\n  FROM transfers\n)\nSELECT total_transfer_fees\nFROM fee_totals;\n```\n\n## Explanation\n\n- The CTE calculates the total fee amount once.\n- The outer query returns that value.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the total is reused later.",
      },
      {
        approach_title: "Subquery fees",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT total_transfer_fees FROM ( SELECT SUM(fee_amount) AS total_transfer_fees FROM transfers ) t;",
        explanation:
          "## Approach\n\nUse a subquery to calculate the total first.\n\n## Query\n\n```sql\nSELECT total_transfer_fees\nFROM (\n  SELECT SUM(fee_amount) AS total_transfer_fees\n  FROM transfers\n) t;\n```\n\n## Explanation\n\n- The inner query calculates the sum.\n- The outer query returns the result.\n\n## Difference from the optimal approach\n\nValid, but unnecessary for a single aggregate.",
      },
    ],
  },
  {
    code: "BANK_028",
    approaches: [
      {
        approach_title: "Count approved",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS approved_applications FROM loan_applications WHERE application_status = 'approved';",
        explanation:
          "## Approach\n\nFilter approved loan applications, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS approved_applications\nFROM loan_applications\nWHERE application_status = 'approved';\n```\n\n## Explanation\n\n- `WHERE application_status = 'approved'` keeps only approved applications.\n- `COUNT(*)` returns how many such rows exist.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt directly answers the question with the fewest steps.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS approved_applications FROM loan_applications WHERE application_status = 'approved';",
        explanation:
          "## Approach\n\nCount application ids after filtering.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS approved_applications\nFROM loan_applications\nWHERE application_status = 'approved';\n```\n\n## Explanation\n\n- `id` is never NULL, so `COUNT(id)` equals the row count.\n- This produces the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_applications FROM loan_applications;",
        explanation:
          "## Approach\n\nPlace the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_applications\nFROM loan_applications;\n```\n\n## Explanation\n\n- `FILTER` makes the count include only approved applications.\n- This style is helpful when computing many conditional counts in one query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single count.",
      },
    ],
  },
  {
    code: "BANK_029",
    approaches: [
      {
        approach_title: "Group status",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT fd_status, COUNT(*) AS fd_count FROM fixed_deposits GROUP BY fd_status ORDER BY fd_count DESC, fd_status ASC;",
        explanation:
          "## Approach\n\nGroup fixed deposits by status and count them.\n\n## Query\n\n```sql\nSELECT fd_status, COUNT(*) AS fd_count\nFROM fixed_deposits\nGROUP BY fd_status\nORDER BY fd_count DESC, fd_status ASC;\n```\n\n## Explanation\n\n- `GROUP BY fd_status` creates one group per status.\n- `COUNT(*)` counts deposits in each group.\n- The sort shows the most common statuses first.\n\n## Why this is optimal\n\nIt is the cleanest grouped count for this requirement.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT fd_status, COUNT(id) AS fd_count FROM fixed_deposits GROUP BY fd_status ORDER BY fd_count DESC, fd_status ASC;",
        explanation:
          "## Approach\n\nCount fixed deposit ids per status.\n\n## Query\n\n```sql\nSELECT fd_status, COUNT(id) AS fd_count\nFROM fixed_deposits\nGROUP BY fd_status\nORDER BY fd_count DESC, fd_status ASC;\n```\n\n## Explanation\n\n- Since `id` is never NULL, `COUNT(id)` matches the row count.\n- So this returns the same grouped totals.\n\n## Difference from the optimal approach\n\nWorks, but `COUNT(*)` is more natural.",
      },
      {
        approach_title: "CTE status",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH fd_status_counts AS (\n  SELECT fd_status, COUNT(*) AS fd_count\n  FROM fixed_deposits\n  GROUP BY fd_status\n)\nSELECT fd_status, fd_count\nFROM fd_status_counts\nORDER BY fd_count DESC, fd_status ASC;",
        explanation:
          "## Approach\n\nCreate the grouped summary in a CTE.\n\n## Query\n\n```sql\nWITH fd_status_counts AS (\n  SELECT fd_status, COUNT(*) AS fd_count\n  FROM fixed_deposits\n  GROUP BY fd_status\n)\nSELECT fd_status, fd_count\nFROM fd_status_counts\nORDER BY fd_count DESC, fd_status ASC;\n```\n\n## Explanation\n\n- The CTE calculates count per status.\n- The outer query formats the final output order.\n\n## Difference from the optimal approach\n\nLonger, but helpful if the grouped result is reused.",
      },
    ],
  },
  {
    code: "BANK_030",
    approaches: [
      {
        approach_title: "Sum cashback",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT SUM(cashback_amount) AS total_cashback_redeemed FROM reward_redemptions;",
        explanation:
          "## Approach\n\nAdd up all cashback redemption amounts.\n\n## Query\n\n```sql\nSELECT SUM(cashback_amount) AS total_cashback_redeemed\nFROM reward_redemptions;\n```\n\n## Explanation\n\n- `SUM(cashback_amount)` totals all cashback amounts in the table.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to calculate the total redeemed cashback.",
      },
      {
        approach_title: "CTE cashback",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH cashback_totals AS (\n  SELECT SUM(cashback_amount) AS total_cashback_redeemed\n  FROM reward_redemptions\n)\nSELECT total_cashback_redeemed\nFROM cashback_totals;",
        explanation:
          "## Approach\n\nCalculate the cashback total in a CTE first.\n\n## Query\n\n```sql\nWITH cashback_totals AS (\n  SELECT SUM(cashback_amount) AS total_cashback_redeemed\n  FROM reward_redemptions\n)\nSELECT total_cashback_redeemed\nFROM cashback_totals;\n```\n\n## Explanation\n\n- The CTE computes the sum once.\n- The outer query returns that single value.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the total is referenced again.",
      },
      {
        approach_title: "Subquery cashback",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT total_cashback_redeemed FROM ( SELECT SUM(cashback_amount) AS total_cashback_redeemed FROM reward_redemptions ) r;",
        explanation:
          "## Approach\n\nUse a subquery to compute the total first.\n\n## Query\n\n```sql\nSELECT total_cashback_redeemed\nFROM (\n  SELECT SUM(cashback_amount) AS total_cashback_redeemed\n  FROM reward_redemptions\n) r;\n```\n\n## Explanation\n\n- The inner query calculates the cashback sum.\n- The outer query returns it.\n\n## Difference from the optimal approach\n\nValid, but unnecessary for one aggregate result.",
      },
    ],
  },
  {
    code: "BANK_031",
    approaches: [
      {
        approach_title: "Count open",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS open_complaints FROM complaints WHERE complaint_status = 'open';",
        explanation:
          "## Approach\n\nFilter complaints to open ones, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS open_complaints\nFROM complaints\nWHERE complaint_status = 'open';\n```\n\n## Explanation\n\n- `WHERE complaint_status = 'open'` keeps only open complaints.\n- `COUNT(*)` counts the remaining rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is the most direct way to count open complaints.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(id) AS open_complaints FROM complaints WHERE complaint_status = 'open';",
        explanation:
          "## Approach\n\nCount complaint ids after filtering.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS open_complaints\nFROM complaints\nWHERE complaint_status = 'open';\n```\n\n## Explanation\n\n- `id` is the primary key, so it is never NULL.\n- After filtering open complaints, `COUNT(id)` gives the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is cleaner for row counting.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE complaint_status = 'open') AS open_complaints FROM complaints;",
        explanation:
          "## Approach\n\nUse an aggregate filter to count only open complaints.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE complaint_status = 'open') AS open_complaints\nFROM complaints;\n```\n\n## Explanation\n\n- `FILTER` restricts the count to rows where the status is open.\n- This pattern is useful when calculating multiple conditional counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one count.",
      },
    ],
  },
  {
    code: "BANK_032",
    approaches: [
      {
        approach_title: "Group currency",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT currency, COUNT(*) AS account_count FROM accounts GROUP BY currency ORDER BY account_count DESC, currency ASC;",
        explanation:
          "## Approach\n\nGroup accounts by currency and count rows in each group.\n\n## Query\n\n```sql\nSELECT currency, COUNT(*) AS account_count\nFROM accounts\nGROUP BY currency\nORDER BY account_count DESC, currency ASC;\n```\n\n## Explanation\n\n- `GROUP BY currency` creates one group per currency.\n- `COUNT(*)` counts accounts in each currency.\n- The sort shows the largest groups first.\n\n## Why this is optimal\n\nIt is the standard way to get grouped counts by category.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT currency, COUNT(id) AS account_count FROM accounts GROUP BY currency ORDER BY account_count DESC, currency ASC;",
        explanation:
          "## Approach\n\nCount account ids per currency.\n\n## Query\n\n```sql\nSELECT currency, COUNT(id) AS account_count\nFROM accounts\nGROUP BY currency\nORDER BY account_count DESC, currency ASC;\n```\n\n## Explanation\n\n- Since `id` is never NULL, `COUNT(id)` matches the row count.\n- The grouped result is the same as using `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "CTE currency",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH currency_counts AS (\n  SELECT currency, COUNT(*) AS account_count\n  FROM accounts\n  GROUP BY currency\n)\nSELECT currency, account_count\nFROM currency_counts\nORDER BY account_count DESC, currency ASC;",
        explanation:
          "## Approach\n\nBuild the grouped summary in a CTE, then return it.\n\n## Query\n\n```sql\nWITH currency_counts AS (\n  SELECT currency, COUNT(*) AS account_count\n  FROM accounts\n  GROUP BY currency\n)\nSELECT currency, account_count\nFROM currency_counts\nORDER BY account_count DESC, currency ASC;\n```\n\n## Explanation\n\n- The CTE computes account count per currency.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend later.",
      },
    ],
  },
  {
    code: "BANK_033",
    approaches: [
      {
        approach_title: "AVG active loans",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount FROM loans WHERE loan_status = 'active';",
        explanation:
          "## Approach\n\nFilter to active loans, then calculate the average principal.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount\nFROM loans\nWHERE loan_status = 'active';\n```\n\n## Explanation\n\n- `WHERE loan_status = 'active'` keeps only active loans.\n- `AVG(principal_amount)` calculates the average principal value.\n- `ROUND(..., 2)` formats the result to two decimals.\n\n## Why this is optimal\n\nIt directly expresses the requested metric.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_loans AS (\n  SELECT principal_amount\n  FROM loans\n  WHERE loan_status = 'active'\n)\nSELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount\nFROM active_loans;",
        explanation:
          "## Approach\n\nIsolate active loan amounts in a CTE first.\n\n## Query\n\n```sql\nWITH active_loans AS (\n  SELECT principal_amount\n  FROM loans\n  WHERE loan_status = 'active'\n)\nSELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount\nFROM active_loans;\n```\n\n## Explanation\n\n- The CTE stores only principal amounts from active loans.\n- The outer query calculates the rounded average.\n\n## Difference from the optimal approach\n\nUseful for readability, but longer than necessary.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount FROM ( SELECT principal_amount FROM loans WHERE loan_status = 'active' ) l;",
        explanation:
          "## Approach\n\nFilter in a subquery, then average outside.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(principal_amount), 2) AS avg_loan_amount\nFROM (\n  SELECT principal_amount\n  FROM loans\n  WHERE loan_status = 'active'\n) l;\n```\n\n## Explanation\n\n- The inner query returns principal amounts for active loans only.\n- The outer query computes the average.\n\n## Difference from the optimal approach\n\nValid, but adds unnecessary nesting.",
      },
    ],
  },
  {
    code: "BANK_034",
    approaches: [
      {
        approach_title: "Group segment",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT customer_segment, COUNT(*) AS user_count FROM users GROUP BY customer_segment ORDER BY user_count DESC, customer_segment ASC;",
        explanation:
          "## Approach\n\nGroup users by customer segment and count each group.\n\n## Query\n\n```sql\nSELECT customer_segment, COUNT(*) AS user_count\nFROM users\nGROUP BY customer_segment\nORDER BY user_count DESC, customer_segment ASC;\n```\n\n## Explanation\n\n- `GROUP BY customer_segment` makes one group per segment.\n- `COUNT(*)` counts users in each segment.\n- Sorting shows the largest segments first.\n\n## Why this is optimal\n\nIt is the clearest grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT customer_segment, COUNT(id) AS user_count FROM users GROUP BY customer_segment ORDER BY user_count DESC, customer_segment ASC;",
        explanation:
          "## Approach\n\nCount user ids per segment.\n\n## Query\n\n```sql\nSELECT customer_segment, COUNT(id) AS user_count\nFROM users\nGROUP BY customer_segment\nORDER BY user_count DESC, customer_segment ASC;\n```\n\n## Explanation\n\n- User ids are never NULL, so `COUNT(id)` equals `COUNT(*)`.\n- The grouped totals remain the same.\n\n## Difference from the optimal approach\n\nWorks the same, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE segment",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH segment_counts AS (\n  SELECT customer_segment, COUNT(*) AS user_count\n  FROM users\n  GROUP BY customer_segment\n)\nSELECT customer_segment, user_count\nFROM segment_counts\nORDER BY user_count DESC, customer_segment ASC;",
        explanation:
          "## Approach\n\nCompute counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH segment_counts AS (\n  SELECT customer_segment, COUNT(*) AS user_count\n  FROM users\n  GROUP BY customer_segment\n)\nSELECT customer_segment, user_count\nFROM segment_counts\nORDER BY user_count DESC, customer_segment ASC;\n```\n\n## Explanation\n\n- The CTE calculates count per segment.\n- The outer query returns the ordered summary.\n\n## Difference from the optimal approach\n\nLonger, but can be easier to build on.",
      },
    ],
  },
  {
    code: "BANK_035",
    approaches: [
      {
        approach_title: "Group card type",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT card_type, COUNT(*) AS card_count FROM cards GROUP BY card_type ORDER BY card_count DESC, card_type ASC;",
        explanation:
          "## Approach\n\nGroup cards by type and count them.\n\n## Query\n\n```sql\nSELECT card_type, COUNT(*) AS card_count\nFROM cards\nGROUP BY card_type\nORDER BY card_count DESC, card_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY card_type` creates one group per card type.\n- `COUNT(*)` counts cards in each group.\n- Sorting shows the most common types first.\n\n## Why this is optimal\n\nIt is the simplest and most standard grouped count.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT card_type, COUNT(id) AS card_count FROM cards GROUP BY card_type ORDER BY card_count DESC, card_type ASC;",
        explanation:
          "## Approach\n\nCount card ids per type.\n\n## Query\n\n```sql\nSELECT card_type, COUNT(id) AS card_count\nFROM cards\nGROUP BY card_type\nORDER BY card_count DESC, card_type ASC;\n```\n\n## Explanation\n\n- Card ids are never NULL.\n- So `COUNT(id)` produces the same count as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct.",
      },
      {
        approach_title: "CTE card type",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH card_type_counts AS (\n  SELECT card_type, COUNT(*) AS card_count\n  FROM cards\n  GROUP BY card_type\n)\nSELECT card_type, card_count\nFROM card_type_counts\nORDER BY card_count DESC, card_type ASC;",
        explanation:
          "## Approach\n\nBuild the grouped result in a CTE first.\n\n## Query\n\n```sql\nWITH card_type_counts AS (\n  SELECT card_type, COUNT(*) AS card_count\n  FROM cards\n  GROUP BY card_type\n)\nSELECT card_type, card_count\nFROM card_type_counts\nORDER BY card_count DESC, card_type ASC;\n```\n\n## Explanation\n\n- The CTE calculates card count per type.\n- The outer query returns the final ordered result.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if reused later.",
      },
    ],
  },
  {
    code: "BANK_036",
    approaches: [
      {
        approach_title: "Join verified KYC",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, k.verification_level, k.verified_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'verified' ORDER BY k.verified_at DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users with KYC records, then keep only verified KYC rows.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, k.verification_level, k.verified_at\nFROM users u\nJOIN kyc_records k ON u.id = k.user_id\nWHERE k.kyc_status = 'verified'\nORDER BY k.verified_at DESC, u.id ASC;\n```\n\n## Explanation\n\n- The join links each user to their KYC record.\n- `WHERE k.kyc_status = 'verified'` filters to verified KYC rows.\n- The selected columns come from both tables.\n- The sort matches the expected order.\n\n## Why this is optimal\n\nIt directly joins the needed tables and applies the filter clearly.",
      },
      {
        approach_title: "CTE verified KYC",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH verified_kyc AS (\n  SELECT user_id, verification_level, verified_at\n  FROM kyc_records\n  WHERE kyc_status = 'verified'\n)\nSELECT u.id, u.full_name, v.verification_level, v.verified_at\nFROM users u\nJOIN verified_kyc v ON u.id = v.user_id\nORDER BY v.verified_at DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFilter verified KYC records first, then join to users.\n\n## Query\n\n```sql\nWITH verified_kyc AS (\n  SELECT user_id, verification_level, verified_at\n  FROM kyc_records\n  WHERE kyc_status = 'verified'\n)\nSELECT u.id, u.full_name, v.verification_level, v.verified_at\nFROM users u\nJOIN verified_kyc v ON u.id = v.user_id\nORDER BY v.verified_at DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE isolates only verified KYC rows.\n- The outer query joins them to users.\n- This keeps the filtering step separate and readable.\n\n## Difference from the optimal approach\n\nUseful for structure, but longer than necessary.",
      },
      {
        approach_title: "Subquery verified",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, k.verification_level, k.verified_at FROM users u JOIN ( SELECT user_id, verification_level, verified_at FROM kyc_records WHERE kyc_status = 'verified' ) k ON u.id = k.user_id ORDER BY k.verified_at DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to a filtered KYC subquery.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, k.verification_level, k.verified_at\nFROM users u\nJOIN (\n  SELECT user_id, verification_level, verified_at\n  FROM kyc_records\n  WHERE kyc_status = 'verified'\n) k ON u.id = k.user_id\nORDER BY k.verified_at DESC, u.id ASC;\n```\n\n## Explanation\n\n- The subquery keeps only verified KYC records.\n- The outer query joins them to users and sorts the result.\n\n## Difference from the optimal approach\n\nValid, but adds extra nesting.",
      },
    ],
  },
  {
    code: "BANK_037",
    approaches: [
      {
        approach_title: "Join and sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, SUM(a.current_balance) AS total_balance FROM users u JOIN accounts a ON u.id = a.user_id GROUP BY u.id, u.full_name ORDER BY total_balance DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to accounts, then sum balances per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, SUM(a.current_balance) AS total_balance\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nGROUP BY u.id, u.full_name\nORDER BY total_balance DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The join connects each user to their accounts.\n- `SUM(a.current_balance)` adds all balances for each user.\n- `GROUP BY` creates one result row per user.\n- `LIMIT 10` keeps only the top 10.\n\n## Why this is optimal\n\nIt is the clearest direct solution using the joined tables.",
      },
      {
        approach_title: "CTE balances",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_balances AS (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ub.total_balance\nFROM users u\nJOIN user_balances ub ON u.id = ub.user_id\nORDER BY ub.total_balance DESC, u.id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute total balance per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_balances AS (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ub.total_balance\nFROM users u\nJOIN user_balances ub ON u.id = ub.user_id\nORDER BY ub.total_balance DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one balance total per user.\n- The outer query joins that summary to user names.\n- Then it sorts and limits the result.\n\n## Difference from the optimal approach\n\nMore modular, but slightly longer.",
      },
      {
        approach_title: "Subquery balances",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, b.total_balance FROM users u JOIN ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) b ON u.id = b.user_id ORDER BY b.total_balance DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate account balances in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, b.total_balance\nFROM users u\nJOIN (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n) b ON u.id = b.user_id\nORDER BY b.total_balance DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query calculates total balance per user.\n- The outer query adds user details and sorts the top 10.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less readable than the direct grouped join.",
      },
    ],
  },
  {
    code: "BANK_038",
    approaches: [
      {
        approach_title: "Left join count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count FROM branches b LEFT JOIN employees e ON b.id = e.branch_id GROUP BY b.id, b.branch_name ORDER BY employee_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nJoin branches to employees and count employees per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(e.id) AS employee_count\nFROM branches b\nLEFT JOIN employees e ON b.id = e.branch_id\nGROUP BY b.id, b.branch_name\nORDER BY employee_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps branches even if they have no employees.\n- `COUNT(e.id)` counts only matched employees.\n- `GROUP BY` creates one row per branch.\n- The result is sorted by employee count.\n\n## Why this is optimal\n\nIt preserves all branches and gives accurate counts.",
      },
      {
        approach_title: "CTE counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_employee_counts AS (\n  SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count\n  FROM branches b\n  LEFT JOIN employees e ON b.id = e.branch_id\n  GROUP BY b.id, b.branch_name\n)\nSELECT id, branch_name, employee_count\nFROM branch_employee_counts\nORDER BY employee_count DESC, id ASC;",
        explanation:
          "## Approach\n\nBuild the branch employee summary in a CTE first.\n\n## Query\n\n```sql\nWITH branch_employee_counts AS (\n  SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count\n  FROM branches b\n  LEFT JOIN employees e ON b.id = e.branch_id\n  GROUP BY b.id, b.branch_name\n)\nSELECT id, branch_name, employee_count\nFROM branch_employee_counts\nORDER BY employee_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE computes employee count per branch.\n- The outer query returns the ordered results.\n\n## Difference from the optimal approach\n\nLonger, but can help if more branch metrics are added later.",
      },
      {
        approach_title: "Subquery counts",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, branch_name, employee_count FROM ( SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count FROM branches b LEFT JOIN employees e ON b.id = e.branch_id GROUP BY b.id, b.branch_name ) bec ORDER BY employee_count DESC, id ASC;",
        explanation:
          "## Approach\n\nCompute branch counts in a derived table, then sort.\n\n## Query\n\n```sql\nSELECT id, branch_name, employee_count\nFROM (\n  SELECT b.id, b.branch_name, COUNT(e.id) AS employee_count\n  FROM branches b\n  LEFT JOIN employees e ON b.id = e.branch_id\n  GROUP BY b.id, b.branch_name\n) bec\nORDER BY employee_count DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query groups by branch and counts employees.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nValid, but adds an extra layer without much benefit.",
      },
    ],
  },
  {
    code: "BANK_039",
    approaches: [
      {
        approach_title: "Distinct join",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN fraud_alerts f ON u.id = f.user_id WHERE f.alert_status = 'open' ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to open fraud alerts and remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN fraud_alerts f ON u.id = f.user_id\nWHERE f.alert_status = 'open'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The join links each user to their fraud alerts.\n- `WHERE f.alert_status = 'open'` keeps only open alerts.\n- `DISTINCT` removes duplicate users when a user has multiple open alerts.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to return unique matching users.",
      },
      {
        approach_title: "EXISTS check",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM fraud_alerts f WHERE f.user_id = u.id AND f.alert_status = 'open' ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nCheck whether each user has at least one open fraud alert.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM fraud_alerts f\n  WHERE f.user_id = u.id\n    AND f.alert_status = 'open'\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` returns true if at least one matching open alert is found.\n- This naturally avoids duplicates without using `DISTINCT`.\n\n## Difference from the optimal approach\n\nVery good alternative, but a direct join is simpler for learners here.",
      },
      {
        approach_title: "CTE open users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH open_alert_users AS (\n  SELECT DISTINCT user_id\n  FROM fraud_alerts\n  WHERE alert_status = 'open' AND user_id IS NOT NULL\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN open_alert_users oau ON u.id = oau.user_id\nORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nFirst collect user ids with open alerts, then join to users.\n\n## Query\n\n```sql\nWITH open_alert_users AS (\n  SELECT DISTINCT user_id\n  FROM fraud_alerts\n  WHERE alert_status = 'open' AND user_id IS NOT NULL\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN open_alert_users oau ON u.id = oau.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE reduces fraud alerts down to unique user ids.\n- The outer query joins those ids to user names.\n\n## Difference from the optimal approach\n\nClear in two steps, but longer than needed.",
      },
    ],
  },
  {
    code: "BANK_040",
    approaches: [
      {
        approach_title: "Join pending EMI",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT l.id AS loan_id, SUM(r.total_due - r.total_paid) AS pending_amount FROM loans l JOIN loan_repayments r ON l.id = r.loan_id WHERE l.loan_status = 'active' AND r.repayment_status IN ('pending', 'partial', 'late') GROUP BY l.id ORDER BY pending_amount DESC, loan_id ASC;",
        explanation:
          "## Approach\n\nJoin loans to repayments and sum unpaid amounts for active loans.\n\n## Query\n\n```sql\nSELECT l.id AS loan_id, SUM(r.total_due - r.total_paid) AS pending_amount\nFROM loans l\nJOIN loan_repayments r ON l.id = r.loan_id\nWHERE l.loan_status = 'active'\n  AND r.repayment_status IN ('pending', 'partial', 'late')\nGROUP BY l.id\nORDER BY pending_amount DESC, loan_id ASC;\n```\n\n## Explanation\n\n- The join connects each loan with its repayment schedule.\n- Only active loans are included.\n- Only pending, partial, and late repayments contribute to pending amount.\n- `SUM(r.total_due - r.total_paid)` gives the outstanding repayment amount per loan.\n\n## Why this is optimal\n\nIt directly computes the pending amount using the relevant repayment rows.",
      },
      {
        approach_title: "CTE pending EMI",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH pending_repayments AS (\n  SELECT loan_id, total_due - total_paid AS pending_part\n  FROM loan_repayments\n  WHERE repayment_status IN ('pending', 'partial', 'late')\n)\nSELECT l.id AS loan_id, SUM(pr.pending_part) AS pending_amount\nFROM loans l\nJOIN pending_repayments pr ON l.id = pr.loan_id\nWHERE l.loan_status = 'active'\nGROUP BY l.id\nORDER BY pending_amount DESC, loan_id ASC;",
        explanation:
          "## Approach\n\nCompute pending repayment pieces first, then join to active loans.\n\n## Query\n\n```sql\nWITH pending_repayments AS (\n  SELECT loan_id, total_due - total_paid AS pending_part\n  FROM loan_repayments\n  WHERE repayment_status IN ('pending', 'partial', 'late')\n)\nSELECT l.id AS loan_id, SUM(pr.pending_part) AS pending_amount\nFROM loans l\nJOIN pending_repayments pr ON l.id = pr.loan_id\nWHERE l.loan_status = 'active'\nGROUP BY l.id\nORDER BY pending_amount DESC, loan_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates the unpaid portion of each relevant repayment row.\n- The outer query sums those pieces per active loan.\n\n## Difference from the optimal approach\n\nGood step-by-step structure, but longer.",
      },
      {
        approach_title: "CASE sum",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT l.id AS loan_id, SUM(CASE WHEN r.repayment_status IN ('pending', 'partial', 'late') THEN r.total_due - r.total_paid ELSE 0 END) AS pending_amount FROM loans l JOIN loan_repayments r ON l.id = r.loan_id WHERE l.loan_status = 'active' GROUP BY l.id HAVING SUM(CASE WHEN r.repayment_status IN ('pending', 'partial', 'late') THEN r.total_due - r.total_paid ELSE 0 END) > 0 ORDER BY pending_amount DESC, loan_id ASC;",
        explanation:
          "## Approach\n\nJoin all repayments for active loans and conditionally sum only the relevant ones.\n\n## Query\n\n```sql\nSELECT l.id AS loan_id,\n       SUM(CASE\n             WHEN r.repayment_status IN ('pending', 'partial', 'late')\n             THEN r.total_due - r.total_paid\n             ELSE 0\n           END) AS pending_amount\nFROM loans l\nJOIN loan_repayments r ON l.id = r.loan_id\nWHERE l.loan_status = 'active'\nGROUP BY l.id\nHAVING SUM(CASE\n             WHEN r.repayment_status IN ('pending', 'partial', 'late')\n             THEN r.total_due - r.total_paid\n             ELSE 0\n           END) > 0\nORDER BY pending_amount DESC, loan_id ASC;\n```\n\n## Explanation\n\n- All repayments are joined for active loans.\n- The `CASE` includes only pending, partial, and late rows in the total.\n- `HAVING` removes loans with zero pending amount.\n\n## Difference from the optimal approach\n\nMore flexible, but more verbose than filtering rows directly.",
      },
    ],
  },
  {
    code: "BANK_041",
    approaches: [
      {
        approach_title: "Join and sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status IN ('authorized', 'settled') GROUP BY u.id, u.full_name ORDER BY total_card_spend DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to their accounts, cards, and card transactions, then sum spend.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN cards c ON a.id = c.account_id\nJOIN card_transactions ct ON c.id = ct.card_id\nWHERE ct.transaction_status IN ('authorized', 'settled')\nGROUP BY u.id, u.full_name\nORDER BY total_card_spend DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The joins connect each user to their card transactions.\n- The filter keeps only spending transactions with allowed statuses.\n- `SUM(ct.billing_amount)` calculates total card spend per user.\n- `ROUND(..., 2)` formats the amount.\n- `LIMIT 10` returns only the top 10 users.\n\n## Why this is optimal\n\nIt directly uses the needed tables and computes the ranking in one query.",
      },
      {
        approach_title: "CTE spend",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_card_spend AS (\n  SELECT a.user_id, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status IN ('authorized', 'settled')\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, ucs.total_card_spend\nFROM users u\nJOIN user_card_spend ucs ON u.id = ucs.user_id\nORDER BY ucs.total_card_spend DESC, u.id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCalculate card spend per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_card_spend AS (\n  SELECT a.user_id, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status IN ('authorized', 'settled')\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, ucs.total_card_spend\nFROM users u\nJOIN user_card_spend ucs ON u.id = ucs.user_id\nORDER BY ucs.total_card_spend DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one spend total per user.\n- The outer query adds user details.\n- The final sort and limit return the top 10.\n\n## Difference from the optimal approach\n\nMore modular, but longer than the direct grouped join.",
      },
      {
        approach_title: "Subquery spend",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, s.total_card_spend FROM users u JOIN ( SELECT a.user_id, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend FROM accounts a JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status IN ('authorized', 'settled') GROUP BY a.user_id ) s ON u.id = s.user_id ORDER BY s.total_card_spend DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate spend in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, s.total_card_spend\nFROM users u\nJOIN (\n  SELECT a.user_id, ROUND(SUM(ct.billing_amount), 2) AS total_card_spend\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status IN ('authorized', 'settled')\n  GROUP BY a.user_id\n) s ON u.id = s.user_id\nORDER BY s.total_card_spend DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes spend totals.\n- The outer query adds names and ranks users.\n\n## Difference from the optimal approach\n\nCorrect, but less clean than the direct grouped join.",
      },
    ],
  },
  {
    code: "BANK_042",
    approaches: [
      {
        approach_title: "Join and having",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(b.id) AS beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id GROUP BY u.id, u.full_name HAVING COUNT(b.id) > 3 ORDER BY beneficiary_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to beneficiaries, count beneficiaries per user, then keep only counts above 3.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(b.id) AS beneficiary_count\nFROM users u\nJOIN beneficiaries b ON u.id = b.user_id\nGROUP BY u.id, u.full_name\nHAVING COUNT(b.id) > 3\nORDER BY beneficiary_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The join links each user to their beneficiaries.\n- `COUNT(b.id)` counts beneficiaries per user.\n- `HAVING COUNT(b.id) > 3` keeps only users with more than 3.\n- The result is sorted by count descending.\n\n## Why this is optimal\n\nIt directly expresses the grouping and filtering requirement.",
      },
      {
        approach_title: "CTE counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_beneficiary_counts AS (\n  SELECT user_id, COUNT(*) AS beneficiary_count\n  FROM beneficiaries\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ubc.beneficiary_count\nFROM users u\nJOIN user_beneficiary_counts ubc ON u.id = ubc.user_id\nWHERE ubc.beneficiary_count > 3\nORDER BY ubc.beneficiary_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCount beneficiaries in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_beneficiary_counts AS (\n  SELECT user_id, COUNT(*) AS beneficiary_count\n  FROM beneficiaries\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ubc.beneficiary_count\nFROM users u\nJOIN user_beneficiary_counts ubc ON u.id = ubc.user_id\nWHERE ubc.beneficiary_count > 3\nORDER BY ubc.beneficiary_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one count per user.\n- The outer query joins user details and filters the count.\n\n## Difference from the optimal approach\n\nGood for reuse, but more verbose.",
      },
      {
        approach_title: "Subquery count",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, bc.beneficiary_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS beneficiary_count FROM beneficiaries GROUP BY user_id ) bc ON u.id = bc.user_id WHERE bc.beneficiary_count > 3 ORDER BY bc.beneficiary_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nAggregate counts in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, bc.beneficiary_count\nFROM users u\nJOIN (\n  SELECT user_id, COUNT(*) AS beneficiary_count\n  FROM beneficiaries\n  GROUP BY user_id\n) bc ON u.id = bc.user_id\nWHERE bc.beneficiary_count > 3\nORDER BY bc.beneficiary_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The inner query calculates the number of beneficiaries per user.\n- The outer query filters and adds names.\n\n## Difference from the optimal approach\n\nWorks well, but the grouped join is simpler.",
      },
    ],
  },
  {
    code: "BANK_043",
    approaches: [
      {
        approach_title: "Join and sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.city, ROUND(SUM(t.amount), 2) AS total_withdrawn FROM atm_machines a JOIN atm_transactions t ON a.id = t.atm_id WHERE t.atm_transaction_type = 'cash_withdrawal' AND t.transaction_status = 'success' GROUP BY a.city ORDER BY total_withdrawn DESC, a.city ASC;",
        explanation:
          "## Approach\n\nJoin ATM machines to ATM transactions, then sum successful cash withdrawals by city.\n\n## Query\n\n```sql\nSELECT a.city, ROUND(SUM(t.amount), 2) AS total_withdrawn\nFROM atm_machines a\nJOIN atm_transactions t ON a.id = t.atm_id\nWHERE t.atm_transaction_type = 'cash_withdrawal'\n  AND t.transaction_status = 'success'\nGROUP BY a.city\nORDER BY total_withdrawn DESC, a.city ASC;\n```\n\n## Explanation\n\n- The join connects each transaction to the ATM city.\n- The filter keeps only successful cash withdrawals.\n- `SUM(t.amount)` totals withdrawn cash per city.\n- `ROUND(..., 2)` formats the value.\n\n## Why this is optimal\n\nIt directly groups the correct filtered transactions by city.",
      },
      {
        approach_title: "CTE withdrawals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH successful_withdrawals AS (\n  SELECT atm_id, amount\n  FROM atm_transactions\n  WHERE atm_transaction_type = 'cash_withdrawal'\n    AND transaction_status = 'success'\n)\nSELECT a.city, ROUND(SUM(sw.amount), 2) AS total_withdrawn\nFROM atm_machines a\nJOIN successful_withdrawals sw ON a.id = sw.atm_id\nGROUP BY a.city\nORDER BY total_withdrawn DESC, a.city ASC;",
        explanation:
          "## Approach\n\nFilter the ATM transactions in a CTE, then join to ATMs.\n\n## Query\n\n```sql\nWITH successful_withdrawals AS (\n  SELECT atm_id, amount\n  FROM atm_transactions\n  WHERE atm_transaction_type = 'cash_withdrawal'\n    AND transaction_status = 'success'\n)\nSELECT a.city, ROUND(SUM(sw.amount), 2) AS total_withdrawn\nFROM atm_machines a\nJOIN successful_withdrawals sw ON a.id = sw.atm_id\nGROUP BY a.city\nORDER BY total_withdrawn DESC, a.city ASC;\n```\n\n## Explanation\n\n- The CTE isolates only the relevant withdrawal rows.\n- The outer query groups them by ATM city.\n\n## Difference from the optimal approach\n\nCleaner in stages, but longer.",
      },
      {
        approach_title: "Case sum",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT a.city, ROUND(SUM(CASE WHEN t.atm_transaction_type = 'cash_withdrawal' AND t.transaction_status = 'success' THEN t.amount ELSE 0 END), 2) AS total_withdrawn FROM atm_machines a JOIN atm_transactions t ON a.id = t.atm_id GROUP BY a.city ORDER BY total_withdrawn DESC, a.city ASC;",
        explanation:
          "## Approach\n\nJoin all ATM transactions and conditionally sum only successful withdrawals.\n\n## Query\n\n```sql\nSELECT a.city,\n       ROUND(SUM(CASE\n         WHEN t.atm_transaction_type = 'cash_withdrawal'\n          AND t.transaction_status = 'success'\n         THEN t.amount ELSE 0 END), 2) AS total_withdrawn\nFROM atm_machines a\nJOIN atm_transactions t ON a.id = t.atm_id\nGROUP BY a.city\nORDER BY total_withdrawn DESC, a.city ASC;\n```\n\n## Explanation\n\n- All ATM transactions are joined first.\n- The `CASE` includes only successful cash withdrawals in the total.\n- This is useful when multiple conditional totals are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but direct filtering is simpler here.",
      },
    ],
  },
  {
    code: "BANK_044",
    approaches: [
      {
        approach_title: "Case ratio",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT lp.id, lp.product_name, ROUND(100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY approval_rate DESC, lp.id ASC;",
        explanation:
          "## Approach\n\nJoin loan products to applications and compute approval percentage using conditional aggregation.\n\n## Query\n\n```sql\nSELECT lp.id, lp.product_name,\n       ROUND(100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate\nFROM loan_products lp\nJOIN loan_applications la ON lp.id = la.loan_product_id\nGROUP BY lp.id, lp.product_name\nORDER BY approval_rate DESC, lp.id ASC;\n```\n\n## Explanation\n\n- The join connects each application to its product.\n- Approved applications contribute `1`; others contribute `0`.\n- Dividing by total applications gives the approval rate.\n- `100.0` ensures percentage calculation.\n\n## Why this is optimal\n\nIt calculates the rate directly in one grouped query.",
      },
      {
        approach_title: "CTE rates",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH product_rates AS (\n  SELECT loan_product_id, ROUND(100.0 * SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate\n  FROM loan_applications\n  GROUP BY loan_product_id\n)\nSELECT lp.id, lp.product_name, pr.approval_rate\nFROM loan_products lp\nJOIN product_rates pr ON lp.id = pr.loan_product_id\nORDER BY pr.approval_rate DESC, lp.id ASC;",
        explanation:
          "## Approach\n\nCompute product approval rates in a CTE, then join to loan products.\n\n## Query\n\n```sql\nWITH product_rates AS (\n  SELECT loan_product_id,\n         ROUND(100.0 * SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) AS approval_rate\n  FROM loan_applications\n  GROUP BY loan_product_id\n)\nSELECT lp.id, lp.product_name, pr.approval_rate\nFROM loan_products lp\nJOIN product_rates pr ON lp.id = pr.loan_product_id\nORDER BY pr.approval_rate DESC, lp.id ASC;\n```\n\n## Explanation\n\n- The CTE builds one approval rate per product id.\n- The outer query adds product names.\n\n## Difference from the optimal approach\n\nA bit more modular, but longer.",
      },
      {
        approach_title: "Filter aggregate",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT lp.id, lp.product_name, ROUND(100.0 * COUNT(*) FILTER (WHERE la.application_status = 'approved') / COUNT(*), 2) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY approval_rate DESC, lp.id ASC;",
        explanation:
          "## Approach\n\nUse `FILTER` inside the count to compute approved applications.\n\n## Query\n\n```sql\nSELECT lp.id, lp.product_name,\n       ROUND(100.0 * COUNT(*) FILTER (WHERE la.application_status = 'approved') / COUNT(*), 2) AS approval_rate\nFROM loan_products lp\nJOIN loan_applications la ON lp.id = la.loan_product_id\nGROUP BY lp.id, lp.product_name\nORDER BY approval_rate DESC, lp.id ASC;\n```\n\n## Explanation\n\n- `COUNT(*) FILTER (...)` counts only approved rows.\n- Dividing by all application rows gives the approval rate.\n- This is compact and expressive in PostgreSQL.\n\n## Difference from the optimal approach\n\nVery good alternative, but `CASE` is often easier for learners to generalize.",
      },
    ],
  },
  {
    code: "BANK_045",
    approaches: [
      {
        approach_title: "Join active accounts",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count FROM branches b JOIN accounts a ON b.id = a.primary_branch_id WHERE a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_account_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nJoin branches to accounts, filter active accounts, then count them per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count\nFROM branches b\nJOIN accounts a ON b.id = a.primary_branch_id\nWHERE a.account_status = 'active'\nGROUP BY b.id, b.branch_name\nORDER BY active_account_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- The join connects each account to its branch.\n- The filter keeps only active accounts.\n- `COUNT(a.id)` counts active accounts per branch.\n- The result is sorted by highest count first.\n\n## Why this is optimal\n\nIt directly counts the needed account rows per branch.",
      },
      {
        approach_title: "CTE active counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_active_accounts AS (\n  SELECT primary_branch_id, COUNT(*) AS active_account_count\n  FROM accounts\n  WHERE account_status = 'active'\n  GROUP BY primary_branch_id\n)\nSELECT b.id, b.branch_name, baa.active_account_count\nFROM branches b\nJOIN branch_active_accounts baa ON b.id = baa.primary_branch_id\nORDER BY baa.active_account_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nCount active accounts by branch in a CTE, then join to branches.\n\n## Query\n\n```sql\nWITH branch_active_accounts AS (\n  SELECT primary_branch_id, COUNT(*) AS active_account_count\n  FROM accounts\n  WHERE account_status = 'active'\n  GROUP BY primary_branch_id\n)\nSELECT b.id, b.branch_name, baa.active_account_count\nFROM branches b\nJOIN branch_active_accounts baa ON b.id = baa.primary_branch_id\nORDER BY baa.active_account_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one active account count per branch id.\n- The outer query attaches branch names.\n\n## Difference from the optimal approach\n\nMore modular, but a bit longer.",
      },
      {
        approach_title: "Left join filter",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count FROM branches b LEFT JOIN accounts a ON b.id = a.primary_branch_id AND a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_account_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nUse a left join with the status filter inside the join condition.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(a.id) AS active_account_count\nFROM branches b\nLEFT JOIN accounts a\n  ON b.id = a.primary_branch_id\n AND a.account_status = 'active'\nGROUP BY b.id, b.branch_name\nORDER BY active_account_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- The join keeps all branches and matches only active accounts.\n- `COUNT(a.id)` counts active matches per branch.\n- Branches with zero active accounts are also included.\n\n## Difference from the optimal approach\n\nUseful when zero-count branches should appear, but the original inner join is simpler.",
      },
    ],
  },
  {
    code: "BANK_046",
    approaches: [
      {
        approach_title: "Month group",
        approach_type: "time_series",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE_TRUNC('month', completed_at) AS transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount FROM transfers WHERE transfer_status = 'completed' GROUP BY DATE_TRUNC('month', completed_at) ORDER BY transfer_month ASC;",
        explanation:
          "## Approach\n\nFilter completed transfers, bucket them by month, then sum the amount.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', completed_at) AS transfer_month,\n       ROUND(SUM(amount), 2) AS total_transfer_amount\nFROM transfers\nWHERE transfer_status = 'completed'\nGROUP BY DATE_TRUNC('month', completed_at)\nORDER BY transfer_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', completed_at)` converts timestamps into month buckets.\n- The filter keeps only completed transfers.\n- `SUM(amount)` totals the transfer value for each month.\n- Sorting by month ascending gives a timeline view.\n\n## Why this is optimal\n\nIt is the standard way to build monthly aggregates.",
      },
      {
        approach_title: "CTE monthly",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_transfers AS (\n  SELECT DATE_TRUNC('month', completed_at) AS transfer_month, amount\n  FROM transfers\n  WHERE transfer_status = 'completed'\n)\nSELECT transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount\nFROM monthly_transfers\nGROUP BY transfer_month\nORDER BY transfer_month ASC;",
        explanation:
          "## Approach\n\nCreate the month bucket first in a CTE, then aggregate.\n\n## Query\n\n```sql\nWITH monthly_transfers AS (\n  SELECT DATE_TRUNC('month', completed_at) AS transfer_month, amount\n  FROM transfers\n  WHERE transfer_status = 'completed'\n)\nSELECT transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount\nFROM monthly_transfers\nGROUP BY transfer_month\nORDER BY transfer_month ASC;\n```\n\n## Explanation\n\n- The CTE prepares transfer rows with month buckets.\n- The outer query sums those rows per month.\n\n## Difference from the optimal approach\n\nMore stepwise, but slightly longer.",
      },
      {
        approach_title: "Subquery month",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount FROM ( SELECT DATE_TRUNC('month', completed_at) AS transfer_month, amount FROM transfers WHERE transfer_status = 'completed' ) t GROUP BY transfer_month ORDER BY transfer_month ASC;",
        explanation:
          "## Approach\n\nGenerate month buckets in a subquery, then sum outside.\n\n## Query\n\n```sql\nSELECT transfer_month, ROUND(SUM(amount), 2) AS total_transfer_amount\nFROM (\n  SELECT DATE_TRUNC('month', completed_at) AS transfer_month, amount\n  FROM transfers\n  WHERE transfer_status = 'completed'\n) t\nGROUP BY transfer_month\nORDER BY transfer_month ASC;\n```\n\n## Explanation\n\n- The inner query assigns each transfer to a month.\n- The outer query aggregates the total amount per month.\n\n## Difference from the optimal approach\n\nValid, but less direct than grouping inline.",
      },
    ],
  },
  {
    code: "BANK_047",
    approaches: [
      {
        approach_title: "Distinct join",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN fixed_deposits fd ON u.id = fd.user_id WHERE fd.fd_status = 'active' ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to fixed deposits and keep only active deposits.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN fixed_deposits fd ON u.id = fd.user_id\nWHERE fd.fd_status = 'active'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The join connects users to their fixed deposits.\n- The filter keeps only active deposits.\n- `DISTINCT` removes duplicates when a user has multiple active FDs.\n\n## Why this is optimal\n\nIt is short, direct, and returns unique users cleanly.",
      },
      {
        approach_title: "Exists FD",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM fixed_deposits fd WHERE fd.user_id = u.id AND fd.fd_status = 'active' ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nCheck whether each user has at least one active fixed deposit.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM fixed_deposits fd\n  WHERE fd.user_id = u.id\n    AND fd.fd_status = 'active'\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` returns true when at least one matching active FD exists.\n- This naturally avoids duplicates.\n\n## Difference from the optimal approach\n\nVery strong alternative, but the direct join is simpler for learners.",
      },
      {
        approach_title: "CTE active FD",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_fd_users AS (\n  SELECT DISTINCT user_id\n  FROM fixed_deposits\n  WHERE fd_status = 'active'\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN active_fd_users afu ON u.id = afu.user_id\nORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nCollect user ids with active fixed deposits in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH active_fd_users AS (\n  SELECT DISTINCT user_id\n  FROM fixed_deposits\n  WHERE fd_status = 'active'\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN active_fd_users afu ON u.id = afu.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE reduces fixed deposit rows to unique user ids.\n- The outer query returns user details.\n\n## Difference from the optimal approach\n\nClear in two steps, but longer.",
      },
    ],
  },
  {
    code: "BANK_048",
    approaches: [
      {
        approach_title: "Group merchants",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend FROM card_transactions WHERE transaction_status = 'settled' GROUP BY merchant_name ORDER BY total_spend DESC, merchant_name ASC LIMIT 10;",
        explanation:
          "## Approach\n\nFilter settled card transactions, then group by merchant and sum spend.\n\n## Query\n\n```sql\nSELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend\nFROM card_transactions\nWHERE transaction_status = 'settled'\nGROUP BY merchant_name\nORDER BY total_spend DESC, merchant_name ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The filter keeps only settled transactions.\n- `GROUP BY merchant_name` creates one row per merchant.\n- `SUM(billing_amount)` calculates total spend per merchant.\n- `LIMIT 10` keeps the top 10 merchants.\n\n## Why this is optimal\n\nIt directly computes merchant ranking from the needed table.",
      },
      {
        approach_title: "CTE merchant sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH merchant_spend AS (\n  SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend\n  FROM card_transactions\n  WHERE transaction_status = 'settled'\n  GROUP BY merchant_name\n)\nSELECT merchant_name, total_spend\nFROM merchant_spend\nORDER BY total_spend DESC, merchant_name ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nBuild merchant totals in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH merchant_spend AS (\n  SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend\n  FROM card_transactions\n  WHERE transaction_status = 'settled'\n  GROUP BY merchant_name\n)\nSELECT merchant_name, total_spend\nFROM merchant_spend\nORDER BY total_spend DESC, merchant_name ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE computes total spend for each merchant.\n- The outer query sorts and limits the result.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Subquery merchant",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT merchant_name, total_spend FROM ( SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend FROM card_transactions WHERE transaction_status = 'settled' GROUP BY merchant_name ) ms ORDER BY total_spend DESC, merchant_name ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate merchant spend in a subquery, then rank it outside.\n\n## Query\n\n```sql\nSELECT merchant_name, total_spend\nFROM (\n  SELECT merchant_name, ROUND(SUM(billing_amount), 2) AS total_spend\n  FROM card_transactions\n  WHERE transaction_status = 'settled'\n  GROUP BY merchant_name\n) ms\nORDER BY total_spend DESC, merchant_name ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query produces merchant totals.\n- The outer query applies ordering and limit.\n\n## Difference from the optimal approach\n\nCorrect, but the inline grouped query is simpler.",
      },
    ],
  },
  {
    code: "BANK_049",
    approaches: [
      {
        approach_title: "Pre-aggregate both",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH earned AS ( SELECT user_id, SUM(points_earned) AS total_earned FROM reward_earnings GROUP BY user_id ), redeemed AS ( SELECT user_id, SUM(points_redeemed) AS total_redeemed FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance FROM users u LEFT JOIN earned e ON u.id = e.user_id LEFT JOIN redeemed r ON u.id = r.user_id ORDER BY reward_points_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nAggregate earned and redeemed points separately first, then join both summaries to users.\n\n## Query\n\n```sql\nWITH earned AS (\n  SELECT user_id, SUM(points_earned) AS total_earned\n  FROM reward_earnings\n  GROUP BY user_id\n),\nredeemed AS (\n  SELECT user_id, SUM(points_redeemed) AS total_redeemed\n  FROM reward_redemptions\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name,\n       COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance\nFROM users u\nLEFT JOIN earned e ON u.id = e.user_id\nLEFT JOIN redeemed r ON u.id = r.user_id\nORDER BY reward_points_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- `earned` creates one total earned row per user.\n- `redeemed` creates one total redeemed row per user.\n- `LEFT JOIN` keeps all users, even if they have no reward activity.\n- `COALESCE` converts missing totals to zero.\n- Subtracting redeemed from earned gives the reward points balance.\n\n## Why this is optimal\n\nIt avoids row multiplication and gives the correct balance for each user.",
      },
      {
        approach_title: "Subquery totals",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance FROM users u LEFT JOIN ( SELECT user_id, SUM(points_earned) AS total_earned FROM reward_earnings GROUP BY user_id ) e ON u.id = e.user_id LEFT JOIN ( SELECT user_id, SUM(points_redeemed) AS total_redeemed FROM reward_redemptions GROUP BY user_id ) r ON u.id = r.user_id ORDER BY reward_points_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse grouped subqueries for earned and redeemed totals, then join them to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       COALESCE(e.total_earned, 0) - COALESCE(r.total_redeemed, 0) AS reward_points_balance\nFROM users u\nLEFT JOIN (\n  SELECT user_id, SUM(points_earned) AS total_earned\n  FROM reward_earnings\n  GROUP BY user_id\n) e ON u.id = e.user_id\nLEFT JOIN (\n  SELECT user_id, SUM(points_redeemed) AS total_redeemed\n  FROM reward_redemptions\n  GROUP BY user_id\n) r ON u.id = r.user_id\nORDER BY reward_points_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first subquery produces one earned total per user.\n- The second subquery produces one redeemed total per user.\n- The outer query joins both totals to users.\n- `COALESCE` handles users with missing activity in either table.\n\n## Difference from the optimal approach\n\nIt is correct and efficient, but CTEs are a little easier to read.",
      },
      {
        approach_title: "Union summary",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH reward_movements AS ( SELECT user_id, SUM(points_earned) AS earned_points, 0 AS redeemed_points FROM reward_earnings GROUP BY user_id UNION ALL SELECT user_id, 0 AS earned_points, SUM(points_redeemed) AS redeemed_points FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, COALESCE(SUM(rm.earned_points), 0) - COALESCE(SUM(rm.redeemed_points), 0) AS reward_points_balance FROM users u LEFT JOIN reward_movements rm ON u.id = rm.user_id GROUP BY u.id, u.full_name ORDER BY reward_points_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nConvert earnings and redemptions into one combined summary stream, then net them out per user.\n\n## Query\n\n```sql\nWITH reward_movements AS (\n  SELECT user_id, SUM(points_earned) AS earned_points, 0 AS redeemed_points\n  FROM reward_earnings\n  GROUP BY user_id\n\n  UNION ALL\n\n  SELECT user_id, 0 AS earned_points, SUM(points_redeemed) AS redeemed_points\n  FROM reward_redemptions\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name,\n       COALESCE(SUM(rm.earned_points), 0) - COALESCE(SUM(rm.redeemed_points), 0) AS reward_points_balance\nFROM users u\nLEFT JOIN reward_movements rm ON u.id = rm.user_id\nGROUP BY u.id, u.full_name\nORDER BY reward_points_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- Earnings and redemptions are reshaped into one combined dataset.\n- The outer query sums both columns per user.\n- The final subtraction gives the balance.\n- This avoids raw-table join multiplication.\n\n## Difference from the optimal approach\n\nFlexible and correct, but a bit less straightforward than separate earned and redeemed CTEs.",
      },
    ],
  },
  {
    code: "BANK_050",
    approaches: [
      {
        approach_title: "Distinct late join",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id WHERE lr.repayment_status = 'late' ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to loans and repayments, then keep users with at least one late repayment.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN loans l ON u.id = l.borrower_user_id\nJOIN loan_repayments lr ON l.id = lr.loan_id\nWHERE lr.repayment_status = 'late'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The joins connect users to their repayment records.\n- The filter keeps only late repayments.\n- `DISTINCT` removes duplicate users when they have multiple late payments.\n\n## Why this is optimal\n\nIt directly checks the linked loan repayment history and returns unique users.",
      },
      {
        approach_title: "Exists late",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM loans l JOIN loan_repayments lr ON l.id = lr.loan_id WHERE l.borrower_user_id = u.id AND lr.repayment_status = 'late' ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nCheck whether a user has at least one late repayment using `EXISTS`.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM loans l\n  JOIN loan_repayments lr ON l.id = lr.loan_id\n  WHERE l.borrower_user_id = u.id\n    AND lr.repayment_status = 'late'\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery looks for at least one matching late repayment for each user.\n- `EXISTS` returns true as soon as it finds one.\n- This avoids duplicates naturally.\n\n## Difference from the optimal approach\n\nVery good alternative, but slightly more advanced for learners.",
      },
      {
        approach_title: "CTE late users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH late_users AS ( SELECT DISTINCT l.borrower_user_id AS user_id FROM loans l JOIN loan_repayments lr ON l.id = lr.loan_id WHERE lr.repayment_status = 'late' ) SELECT u.id, u.full_name FROM users u JOIN late_users lu ON u.id = lu.user_id ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nFirst collect user ids with late repayments, then join to users.\n\n## Query\n\n```sql\nWITH late_users AS (\n  SELECT DISTINCT l.borrower_user_id AS user_id\n  FROM loans l\n  JOIN loan_repayments lr ON l.id = lr.loan_id\n  WHERE lr.repayment_status = 'late'\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN late_users lu ON u.id = lu.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE reduces the repayment data to unique user ids.\n- The outer query returns user details.\n\n## Difference from the optimal approach\n\nClear in two steps, but longer than the direct join.",
      },
    ],
  },
  {
    code: "BANK_051",
    approaches: [
      {
        approach_title: "Join and avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ap.id, ap.product_name, ROUND(AVG(a.current_balance), 2) AS avg_current_balance FROM account_products ap JOIN accounts a ON ap.id = a.product_id GROUP BY ap.id, ap.product_name ORDER BY avg_current_balance DESC, ap.id ASC;",
        explanation:
          "## Approach\n\nJoin account products to accounts, then average balances per product.\n\n## Query\n\n```sql\nSELECT ap.id, ap.product_name, ROUND(AVG(a.current_balance), 2) AS avg_current_balance\nFROM account_products ap\nJOIN accounts a ON ap.id = a.product_id\nGROUP BY ap.id, ap.product_name\nORDER BY avg_current_balance DESC, ap.id ASC;\n```\n\n## Explanation\n\n- The join connects each account to its product.\n- `AVG(a.current_balance)` calculates the average balance for accounts under the same product.\n- `ROUND(..., 2)` formats the value to two decimals.\n- `GROUP BY` creates one row per product.\n\n## Why this is optimal\n\nIt directly calculates the required metric using the two relevant tables.",
      },
      {
        approach_title: "CTE product avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH product_balances AS (\n  SELECT product_id, ROUND(AVG(current_balance), 2) AS avg_current_balance\n  FROM accounts\n  GROUP BY product_id\n)\nSELECT ap.id, ap.product_name, pb.avg_current_balance\nFROM account_products ap\nJOIN product_balances pb ON ap.id = pb.product_id\nORDER BY pb.avg_current_balance DESC, ap.id ASC;",
        explanation:
          "## Approach\n\nCompute average balance per product in a CTE, then join to product details.\n\n## Query\n\n```sql\nWITH product_balances AS (\n  SELECT product_id, ROUND(AVG(current_balance), 2) AS avg_current_balance\n  FROM accounts\n  GROUP BY product_id\n)\nSELECT ap.id, ap.product_name, pb.avg_current_balance\nFROM account_products ap\nJOIN product_balances pb ON ap.id = pb.product_id\nORDER BY pb.avg_current_balance DESC, ap.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one average balance row per product id.\n- The outer query joins that summary to product names.\n- This keeps aggregation separate from presentation.\n\n## Difference from the optimal approach\n\nUseful for readability, but longer than the direct grouped join.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT ap.id, ap.product_name, pb.avg_current_balance FROM account_products ap JOIN ( SELECT product_id, ROUND(AVG(current_balance), 2) AS avg_current_balance FROM accounts GROUP BY product_id ) pb ON ap.id = pb.product_id ORDER BY pb.avg_current_balance DESC, ap.id ASC;",
        explanation:
          "## Approach\n\nAggregate average balances in a subquery, then join to products.\n\n## Query\n\n```sql\nSELECT ap.id, ap.product_name, pb.avg_current_balance\nFROM account_products ap\nJOIN (\n  SELECT product_id, ROUND(AVG(current_balance), 2) AS avg_current_balance\n  FROM accounts\n  GROUP BY product_id\n) pb ON ap.id = pb.product_id\nORDER BY pb.avg_current_balance DESC, ap.id ASC;\n```\n\n## Explanation\n\n- The inner query computes average current balance per product.\n- The outer query adds product metadata and sorts the result.\n\n## Difference from the optimal approach\n\nWorks well, but the direct join is simpler.",
      },
    ],
  },
  {
    code: "BANK_052",
    approaches: [
      {
        approach_title: "Join and count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications FROM employees e JOIN loan_applications la ON e.id = la.assigned_employee_id GROUP BY e.id, e.full_name ORDER BY assigned_applications DESC, e.id ASC;",
        explanation:
          "## Approach\n\nJoin employees to loan applications and count assigned applications per employee.\n\n## Query\n\n```sql\nSELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications\nFROM employees e\nJOIN loan_applications la ON e.id = la.assigned_employee_id\nGROUP BY e.id, e.full_name\nORDER BY assigned_applications DESC, e.id ASC;\n```\n\n## Explanation\n\n- The join links each employee to applications assigned to them.\n- `COUNT(la.id)` counts applications per employee.\n- `GROUP BY` creates one row per employee.\n- Sorting shows the busiest employees first.\n\n## Why this is optimal\n\nIt directly expresses the join and grouped count requirement.",
      },
      {
        approach_title: "CTE assignments",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH employee_app_counts AS (\n  SELECT assigned_employee_id, COUNT(*) AS assigned_applications\n  FROM loan_applications\n  GROUP BY assigned_employee_id\n)\nSELECT e.id, e.full_name, eac.assigned_applications\nFROM employees e\nJOIN employee_app_counts eac ON e.id = eac.assigned_employee_id\nORDER BY eac.assigned_applications DESC, e.id ASC;",
        explanation:
          "## Approach\n\nCount assigned applications in a CTE, then join to employees.\n\n## Query\n\n```sql\nWITH employee_app_counts AS (\n  SELECT assigned_employee_id, COUNT(*) AS assigned_applications\n  FROM loan_applications\n  GROUP BY assigned_employee_id\n)\nSELECT e.id, e.full_name, eac.assigned_applications\nFROM employees e\nJOIN employee_app_counts eac ON e.id = eac.assigned_employee_id\nORDER BY eac.assigned_applications DESC, e.id ASC;\n```\n\n## Explanation\n\n- The CTE builds one count per assigned employee id.\n- The outer query adds employee details.\n- This structure is helpful if more employee metrics are needed later.\n\n## Difference from the optimal approach\n\nMore modular, but slightly longer.",
      },
      {
        approach_title: "Left join count",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications FROM employees e LEFT JOIN loan_applications la ON e.id = la.assigned_employee_id GROUP BY e.id, e.full_name HAVING COUNT(la.id) > 0 ORDER BY assigned_applications DESC, e.id ASC;",
        explanation:
          "## Approach\n\nUse a left join so employees without assignments can also be considered, then remove zero counts.\n\n## Query\n\n```sql\nSELECT e.id, e.full_name, COUNT(la.id) AS assigned_applications\nFROM employees e\nLEFT JOIN loan_applications la ON e.id = la.assigned_employee_id\nGROUP BY e.id, e.full_name\nHAVING COUNT(la.id) > 0\nORDER BY assigned_applications DESC, e.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all employees.\n- `COUNT(la.id)` counts assigned applications.\n- `HAVING COUNT(la.id) > 0` removes employees without assignments.\n\n## Difference from the optimal approach\n\nUseful if you later want zero-count employees too, but less direct here.",
      },
    ],
  },
  {
    code: "BANK_053",
    approaches: [
      {
        approach_title: "Group and avg",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins FROM complaints WHERE resolution_time_mins IS NOT NULL GROUP BY complaint_type ORDER BY avg_resolution_time_mins DESC, complaint_type ASC;",
        explanation:
          "## Approach\n\nFilter rows with known resolution time, then average by complaint type.\n\n## Query\n\n```sql\nSELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins\nFROM complaints\nWHERE resolution_time_mins IS NOT NULL\nGROUP BY complaint_type\nORDER BY avg_resolution_time_mins DESC, complaint_type ASC;\n```\n\n## Explanation\n\n- `WHERE resolution_time_mins IS NOT NULL` removes unresolved or missing values from the average.\n- `GROUP BY complaint_type` creates one group per complaint type.\n- `AVG(resolution_time_mins)` computes the average for each group.\n- `ROUND(..., 2)` formats the result.\n\n## Why this is optimal\n\nIt directly computes the average only from valid resolution times.",
      },
      {
        approach_title: "CTE resolved",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH resolved_complaints AS (\n  SELECT complaint_type, resolution_time_mins\n  FROM complaints\n  WHERE resolution_time_mins IS NOT NULL\n)\nSELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins\nFROM resolved_complaints\nGROUP BY complaint_type\nORDER BY avg_resolution_time_mins DESC, complaint_type ASC;",
        explanation:
          "## Approach\n\nFirst isolate complaints with a known resolution time in a CTE.\n\n## Query\n\n```sql\nWITH resolved_complaints AS (\n  SELECT complaint_type, resolution_time_mins\n  FROM complaints\n  WHERE resolution_time_mins IS NOT NULL\n)\nSELECT complaint_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_time_mins\nFROM resolved_complaints\nGROUP BY complaint_type\nORDER BY avg_resolution_time_mins DESC, complaint_type ASC;\n```\n\n## Explanation\n\n- The CTE keeps only rows suitable for averaging.\n- The outer query computes the grouped average.\n\n## Difference from the optimal approach\n\nMore stepwise, but longer.",
      },
      {
        approach_title: "Case avg",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT complaint_type, ROUND(AVG(CASE WHEN resolution_time_mins IS NOT NULL THEN resolution_time_mins END), 2) AS avg_resolution_time_mins FROM complaints GROUP BY complaint_type ORDER BY avg_resolution_time_mins DESC, complaint_type ASC;",
        explanation:
          "## Approach\n\nKeep valid resolution times inside the aggregate using `CASE`.\n\n## Query\n\n```sql\nSELECT complaint_type,\n       ROUND(AVG(CASE WHEN resolution_time_mins IS NOT NULL THEN resolution_time_mins END), 2) AS avg_resolution_time_mins\nFROM complaints\nGROUP BY complaint_type\nORDER BY avg_resolution_time_mins DESC, complaint_type ASC;\n```\n\n## Explanation\n\n- The `CASE` returns the resolution time only when it exists.\n- `AVG` ignores NULL values, so missing times are excluded.\n- This gives the same result as filtering first.\n\n## Difference from the optimal approach\n\nFlexible, but filtering rows upfront is clearer.",
      },
    ],
  },
  {
    code: "BANK_054",
    approaches: [
      {
        approach_title: "Distinct joins",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN loans l ON u.id = l.borrower_user_id ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to accounts, cards, and loans, then return unique users.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN cards c ON a.id = c.account_id\nJOIN loans l ON u.id = l.borrower_user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The joins ensure the user has at least one account, one card linked to an account, and at least one loan.\n- `DISTINCT` removes duplicates when users have multiple cards or loans.\n- The result returns only users satisfying both conditions.\n\n## Why this is optimal\n\nIt directly checks both requirements using joins.",
      },
      {
        approach_title: "Exists both",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM accounts a JOIN cards c ON a.id = c.account_id WHERE a.user_id = u.id ) AND EXISTS ( SELECT 1 FROM loans l WHERE l.borrower_user_id = u.id ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse two `EXISTS` checks: one for cards and one for loans.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  WHERE a.user_id = u.id\n)\nAND EXISTS (\n  SELECT 1\n  FROM loans l\n  WHERE l.borrower_user_id = u.id\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` checks whether the user has at least one card.\n- The second checks whether the user has at least one loan.\n- No `DISTINCT` is needed because each user is checked once.\n\n## Difference from the optimal approach\n\nVery strong alternative, but a little more advanced for learners.",
      },
      {
        approach_title: "CTE both sets",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH card_users AS (\n  SELECT DISTINCT a.user_id\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n), loan_users AS (\n  SELECT DISTINCT borrower_user_id AS user_id\n  FROM loans\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN card_users cu ON u.id = cu.user_id\nJOIN loan_users lu ON u.id = lu.user_id\nORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nBuild one user set for card holders and another for loan holders, then intersect them by joining.\n\n## Query\n\n```sql\nWITH card_users AS (\n  SELECT DISTINCT a.user_id\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n),\nloan_users AS (\n  SELECT DISTINCT borrower_user_id AS user_id\n  FROM loans\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN card_users cu ON u.id = cu.user_id\nJOIN loan_users lu ON u.id = lu.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `card_users` captures users who have cards.\n- `loan_users` captures users who have loans.\n- Joining both sets gives users who satisfy both conditions.\n\n## Difference from the optimal approach\n\nClear set-based logic, but longer than the direct join.",
      },
    ],
  },
  {
    code: "BANK_055",
    approaches: [
      {
        approach_title: "Month count",
        approach_type: "time_series",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE_TRUNC('month', opened_at) AS opened_month, COUNT(*) AS accounts_opened FROM accounts GROUP BY DATE_TRUNC('month', opened_at) ORDER BY opened_month ASC;",
        explanation:
          "## Approach\n\nBucket account opening timestamps by month, then count accounts in each bucket.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', opened_at) AS opened_month, COUNT(*) AS accounts_opened\nFROM accounts\nGROUP BY DATE_TRUNC('month', opened_at)\nORDER BY opened_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', opened_at)` converts each timestamp into a month bucket.\n- `COUNT(*)` counts accounts opened in each month.\n- Sorting by month ascending gives a timeline.\n\n## Why this is optimal\n\nIt is the standard and most direct monthly grouping pattern.",
      },
      {
        approach_title: "CTE month",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_accounts AS (\n  SELECT DATE_TRUNC('month', opened_at) AS opened_month\n  FROM accounts\n)\nSELECT opened_month, COUNT(*) AS accounts_opened\nFROM monthly_accounts\nGROUP BY opened_month\nORDER BY opened_month ASC;",
        explanation:
          "## Approach\n\nCreate month buckets in a CTE first, then count them.\n\n## Query\n\n```sql\nWITH monthly_accounts AS (\n  SELECT DATE_TRUNC('month', opened_at) AS opened_month\n  FROM accounts\n)\nSELECT opened_month, COUNT(*) AS accounts_opened\nFROM monthly_accounts\nGROUP BY opened_month\nORDER BY opened_month ASC;\n```\n\n## Explanation\n\n- The CTE extracts one month value for each account row.\n- The outer query counts how many rows fall into each month.\n\n## Difference from the optimal approach\n\nMore step-by-step, but slightly longer.",
      },
      {
        approach_title: "Subquery month",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT opened_month, COUNT(*) AS accounts_opened FROM ( SELECT DATE_TRUNC('month', opened_at) AS opened_month FROM accounts ) a GROUP BY opened_month ORDER BY opened_month ASC;",
        explanation:
          "## Approach\n\nGenerate month buckets in a subquery, then group outside.\n\n## Query\n\n```sql\nSELECT opened_month, COUNT(*) AS accounts_opened\nFROM (\n  SELECT DATE_TRUNC('month', opened_at) AS opened_month\n  FROM accounts\n) a\nGROUP BY opened_month\nORDER BY opened_month ASC;\n```\n\n## Explanation\n\n- The inner query transforms timestamps into month values.\n- The outer query counts rows per month.\n\n## Difference from the optimal approach\n\nValid, but more nested than necessary.",
      },
    ],
  },
  {
    code: "BANK_056",
    approaches: [
      {
        approach_title: "Join credit sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_credited_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_type = 'credit' AND t.transaction_status = 'posted' GROUP BY u.id, u.full_name ORDER BY total_credited_amount DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to accounts and posted credit transactions, then sum credited amounts.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_credited_amount\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nWHERE t.transaction_type = 'credit'\n  AND t.transaction_status = 'posted'\nGROUP BY u.id, u.full_name\nORDER BY total_credited_amount DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The joins connect users to their account transactions.\n- The filter keeps only posted credit transactions.\n- `SUM(t.amount)` totals credited money per user.\n- `LIMIT 10` returns only the top users.\n\n## Why this is optimal\n\nIt directly computes the requested ranking in one grouped query.",
      },
      {
        approach_title: "CTE credits",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_credits AS (\n  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_credited_amount\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_type = 'credit'\n    AND t.transaction_status = 'posted'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uc.total_credited_amount\nFROM users u\nJOIN user_credits uc ON u.id = uc.user_id\nORDER BY uc.total_credited_amount DESC, u.id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nAggregate credited amounts per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_credits AS (\n  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_credited_amount\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_type = 'credit'\n    AND t.transaction_status = 'posted'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uc.total_credited_amount\nFROM users u\nJOIN user_credits uc ON u.id = uc.user_id\nORDER BY uc.total_credited_amount DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE produces one credited total per user.\n- The outer query adds names and ranks users.\n\n## Difference from the optimal approach\n\nGood modular structure, but longer.",
      },
      {
        approach_title: "Case sum",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, ROUND(SUM(CASE WHEN t.transaction_type = 'credit' AND t.transaction_status = 'posted' THEN t.amount ELSE 0 END), 2) AS total_credited_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'credit' AND t.transaction_status = 'posted' THEN t.amount ELSE 0 END) > 0 ORDER BY total_credited_amount DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin all user transactions, then conditionally sum only posted credits.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       ROUND(SUM(CASE\n         WHEN t.transaction_type = 'credit' AND t.transaction_status = 'posted'\n         THEN t.amount ELSE 0 END), 2) AS total_credited_amount\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nGROUP BY u.id, u.full_name\nHAVING SUM(CASE\n         WHEN t.transaction_type = 'credit' AND t.transaction_status = 'posted'\n         THEN t.amount ELSE 0 END) > 0\nORDER BY total_credited_amount DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- All transactions are joined first.\n- The `CASE` includes only posted credit rows in the total.\n- `HAVING` removes users with zero credited amount.\n\n## Difference from the optimal approach\n\nFlexible, but direct filtering is clearer.",
      },
    ],
  },
  {
    code: "BANK_057",
    approaches: [
      {
        approach_title: "Join verified count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(b.id) AS verified_beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id WHERE b.is_verified = true GROUP BY u.id, u.full_name ORDER BY verified_beneficiary_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to beneficiaries, filter verified ones, then count per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(b.id) AS verified_beneficiary_count\nFROM users u\nJOIN beneficiaries b ON u.id = b.user_id\nWHERE b.is_verified = true\nGROUP BY u.id, u.full_name\nORDER BY verified_beneficiary_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The join links users to their beneficiaries.\n- `WHERE b.is_verified = true` keeps only verified beneficiaries.\n- `COUNT(b.id)` counts verified beneficiaries per user.\n\n## Why this is optimal\n\nIt directly applies the needed filter before aggregation.",
      },
      {
        approach_title: "CTE verified ben",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH verified_beneficiaries AS (\n  SELECT user_id, COUNT(*) AS verified_beneficiary_count\n  FROM beneficiaries\n  WHERE is_verified = true\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, vb.verified_beneficiary_count\nFROM users u\nJOIN verified_beneficiaries vb ON u.id = vb.user_id\nORDER BY vb.verified_beneficiary_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCount verified beneficiaries per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH verified_beneficiaries AS (\n  SELECT user_id, COUNT(*) AS verified_beneficiary_count\n  FROM beneficiaries\n  WHERE is_verified = true\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, vb.verified_beneficiary_count\nFROM users u\nJOIN verified_beneficiaries vb ON u.id = vb.user_id\nORDER BY vb.verified_beneficiary_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE builds one verified-beneficiary count per user.\n- The outer query adds user details.\n\n## Difference from the optimal approach\n\nMore modular, but slightly longer.",
      },
      {
        approach_title: "Filter count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE b.is_verified = true) AS verified_beneficiary_count FROM users u JOIN beneficiaries b ON u.id = b.user_id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE b.is_verified = true) > 0 ORDER BY verified_beneficiary_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin all beneficiaries, then use `FILTER` to count only verified ones.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       COUNT(*) FILTER (WHERE b.is_verified = true) AS verified_beneficiary_count\nFROM users u\nJOIN beneficiaries b ON u.id = b.user_id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) FILTER (WHERE b.is_verified = true) > 0\nORDER BY verified_beneficiary_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- All beneficiary rows are joined first.\n- `FILTER` counts only verified rows inside the aggregate.\n- `HAVING` removes users with zero verified beneficiaries.\n\n## Difference from the optimal approach\n\nUseful for multiple conditional counts, but direct filtering is simpler here.",
      },
    ],
  },
  {
    code: "BANK_058",
    approaches: [
      {
        approach_title: "Group severity",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT severity, COUNT(*) AS alert_count FROM fraud_alerts GROUP BY severity ORDER BY alert_count DESC, severity ASC;",
        explanation:
          "## Approach\n\nGroup fraud alerts by severity and count them.\n\n## Query\n\n```sql\nSELECT severity, COUNT(*) AS alert_count\nFROM fraud_alerts\nGROUP BY severity\nORDER BY alert_count DESC, severity ASC;\n```\n\n## Explanation\n\n- `GROUP BY severity` creates one group per severity level.\n- `COUNT(*)` counts alerts in each group.\n- Sorting shows the most common severity first.\n\n## Why this is optimal\n\nIt is the cleanest grouped count solution.",
      },
      {
        approach_title: "Count ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT severity, COUNT(id) AS alert_count FROM fraud_alerts GROUP BY severity ORDER BY alert_count DESC, severity ASC;",
        explanation:
          "## Approach\n\nCount fraud alert ids by severity.\n\n## Query\n\n```sql\nSELECT severity, COUNT(id) AS alert_count\nFROM fraud_alerts\nGROUP BY severity\nORDER BY alert_count DESC, severity ASC;\n```\n\n## Explanation\n\n- `id` is never NULL, so `COUNT(id)` matches the row count.\n- The result is the same as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nWorks the same, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE severity",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH severity_counts AS (\n  SELECT severity, COUNT(*) AS alert_count\n  FROM fraud_alerts\n  GROUP BY severity\n)\nSELECT severity, alert_count\nFROM severity_counts\nORDER BY alert_count DESC, severity ASC;",
        explanation:
          "## Approach\n\nBuild the grouped severity summary in a CTE.\n\n## Query\n\n```sql\nWITH severity_counts AS (\n  SELECT severity, COUNT(*) AS alert_count\n  FROM fraud_alerts\n  GROUP BY severity\n)\nSELECT severity, alert_count\nFROM severity_counts\nORDER BY alert_count DESC, severity ASC;\n```\n\n## Explanation\n\n- The CTE calculates one count per severity level.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if reused later.",
      },
    ],
  },
  {
    code: "BANK_059",
    approaches: [
      {
        approach_title: "Join and sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.biller_category, ROUND(SUM(bp.amount), 2) AS total_paid_amount FROM bill_payments bp JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' GROUP BY b.biller_category ORDER BY total_paid_amount DESC, b.biller_category ASC;",
        explanation:
          "## Approach\n\nJoin bill payments to billers, keep paid rows, then sum by biller category.\n\n## Query\n\n```sql\nSELECT b.biller_category, ROUND(SUM(bp.amount), 2) AS total_paid_amount\nFROM bill_payments bp\nJOIN billers b ON bp.biller_id = b.id\nWHERE bp.payment_status = 'paid'\nGROUP BY b.biller_category\nORDER BY total_paid_amount DESC, b.biller_category ASC;\n```\n\n## Explanation\n\n- The join gives access to each payment's biller category.\n- `WHERE bp.payment_status = 'paid'` keeps successful bill payments only.\n- `SUM(bp.amount)` totals the paid amount per category.\n- `ROUND(..., 2)` formats the result.\n\n## Why this is optimal\n\nIt directly combines the right tables and groups on the required category.",
      },
      {
        approach_title: "CTE paid bills",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH paid_bill_payments AS (\n  SELECT biller_id, amount\n  FROM bill_payments\n  WHERE payment_status = 'paid'\n)\nSELECT b.biller_category, ROUND(SUM(pbp.amount), 2) AS total_paid_amount\nFROM paid_bill_payments pbp\nJOIN billers b ON pbp.biller_id = b.id\nGROUP BY b.biller_category\nORDER BY total_paid_amount DESC, b.biller_category ASC;",
        explanation:
          "## Approach\n\nFilter paid bill payments in a CTE first, then join to billers.\n\n## Query\n\n```sql\nWITH paid_bill_payments AS (\n  SELECT biller_id, amount\n  FROM bill_payments\n  WHERE payment_status = 'paid'\n)\nSELECT b.biller_category, ROUND(SUM(pbp.amount), 2) AS total_paid_amount\nFROM paid_bill_payments pbp\nJOIN billers b ON pbp.biller_id = b.id\nGROUP BY b.biller_category\nORDER BY total_paid_amount DESC, b.biller_category ASC;\n```\n\n## Explanation\n\n- The CTE isolates only paid bill payment rows.\n- The outer query joins them to biller categories and sums by category.\n\n## Difference from the optimal approach\n\nMore stepwise, but longer.",
      },
      {
        approach_title: "Case sum",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.biller_category, ROUND(SUM(CASE WHEN bp.payment_status = 'paid' THEN bp.amount ELSE 0 END), 2) AS total_paid_amount FROM bill_payments bp JOIN billers b ON bp.biller_id = b.id GROUP BY b.biller_category ORDER BY total_paid_amount DESC, b.biller_category ASC;",
        explanation:
          "## Approach\n\nJoin all bill payments to billers and use `CASE` to sum only paid ones.\n\n## Query\n\n```sql\nSELECT b.biller_category,\n       ROUND(SUM(CASE WHEN bp.payment_status = 'paid' THEN bp.amount ELSE 0 END), 2) AS total_paid_amount\nFROM bill_payments bp\nJOIN billers b ON bp.biller_id = b.id\nGROUP BY b.biller_category\nORDER BY total_paid_amount DESC, b.biller_category ASC;\n```\n\n## Explanation\n\n- All bill payment rows are joined first.\n- The `CASE` includes only paid rows in the sum.\n- This works well when multiple status-based metrics are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but filtering first is clearer here.",
      },
    ],
  },
  {
    code: "BANK_060",
    approaches: [
      {
        approach_title: "Distinct users",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, COUNT(DISTINCT a.user_id) AS active_customer_count FROM branches b JOIN accounts a ON b.id = a.primary_branch_id WHERE a.account_status = 'active' GROUP BY b.id, b.branch_name ORDER BY active_customer_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nJoin branches to active accounts and count distinct users per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(DISTINCT a.user_id) AS active_customer_count\nFROM branches b\nJOIN accounts a ON b.id = a.primary_branch_id\nWHERE a.account_status = 'active'\nGROUP BY b.id, b.branch_name\nORDER BY active_customer_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- The join connects each account to its branch.\n- The filter keeps only active accounts.\n- `COUNT(DISTINCT a.user_id)` counts each user only once per branch even if they have multiple active accounts.\n\n## Why this is optimal\n\nThe distinct count is essential here because the question asks for customers, not accounts.",
      },
      {
        approach_title: "CTE active users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_active_users AS (\n  SELECT primary_branch_id, user_id\n  FROM accounts\n  WHERE account_status = 'active'\n  GROUP BY primary_branch_id, user_id\n)\nSELECT b.id, b.branch_name, COUNT(*) AS active_customer_count\nFROM branches b\nJOIN branch_active_users bau ON b.id = bau.primary_branch_id\nGROUP BY b.id, b.branch_name\nORDER BY active_customer_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nFirst reduce active accounts to unique branch-user pairs, then count them.\n\n## Query\n\n```sql\nWITH branch_active_users AS (\n  SELECT primary_branch_id, user_id\n  FROM accounts\n  WHERE account_status = 'active'\n  GROUP BY primary_branch_id, user_id\n)\nSELECT b.id, b.branch_name, COUNT(*) AS active_customer_count\nFROM branches b\nJOIN branch_active_users bau ON b.id = bau.primary_branch_id\nGROUP BY b.id, b.branch_name\nORDER BY active_customer_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- The CTE removes duplicate accounts for the same user in the same branch.\n- The outer query then counts those unique users per branch.\n\n## Difference from the optimal approach\n\nMore explicit about de-duplication, but longer.",
      },
      {
        approach_title: "Subquery distinct",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.id, b.branch_name, COUNT(*) AS active_customer_count FROM branches b JOIN ( SELECT DISTINCT primary_branch_id, user_id FROM accounts WHERE account_status = 'active' ) a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY active_customer_count DESC, b.id ASC;",
        explanation:
          "## Approach\n\nUse a subquery to get distinct active branch-user pairs, then count them.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(*) AS active_customer_count\nFROM branches b\nJOIN (\n  SELECT DISTINCT primary_branch_id, user_id\n  FROM accounts\n  WHERE account_status = 'active'\n) a ON b.id = a.primary_branch_id\nGROUP BY b.id, b.branch_name\nORDER BY active_customer_count DESC, b.id ASC;\n```\n\n## Explanation\n\n- The inner query removes duplicate active accounts for the same user and branch.\n- The outer query counts unique active customers per branch.\n\n## Difference from the optimal approach\n\nGood alternative, but `COUNT(DISTINCT ...)` is shorter and more direct.",
      },
    ],
  },
  {
    code: "BANK_061",
    approaches: [
      {
        approach_title: "Group active cards",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(c.id) AS active_card_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id WHERE c.card_status = 'active' GROUP BY u.id, u.full_name HAVING COUNT(c.id) > 1 ORDER BY active_card_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to their cards, keep only active cards, then count cards per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(c.id) AS active_card_count\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN cards c ON a.id = c.account_id\nWHERE c.card_status = 'active'\nGROUP BY u.id, u.full_name\nHAVING COUNT(c.id) > 1\nORDER BY active_card_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The joins connect each user to their accounts and cards.\n- `WHERE c.card_status = 'active'` keeps only active cards.\n- `COUNT(c.id)` counts active cards for each user.\n- `HAVING COUNT(c.id) > 1` keeps users with more than one active card.\n\n## Why this is optimal\n\nIt directly expresses the join, filter, aggregation, and grouped filter in one query.",
      },
      {
        approach_title: "CTE active counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_active_cards AS (\n  SELECT a.user_id, COUNT(c.id) AS active_card_count\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  WHERE c.card_status = 'active'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uac.active_card_count\nFROM users u\nJOIN user_active_cards uac ON u.id = uac.user_id\nWHERE uac.active_card_count > 1\nORDER BY uac.active_card_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst count active cards per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_active_cards AS (\n  SELECT a.user_id, COUNT(c.id) AS active_card_count\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  WHERE c.card_status = 'active'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uac.active_card_count\nFROM users u\nJOIN user_active_cards uac ON u.id = uac.user_id\nWHERE uac.active_card_count > 1\nORDER BY uac.active_card_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE builds one active-card count per user.\n- The outer query adds user details and filters the count.\n\n## Difference from the optimal approach\n\nMore modular, but longer than the direct grouped join.",
      },
      {
        approach_title: "Subquery counts",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, ac.active_card_count FROM users u JOIN ( SELECT a.user_id, COUNT(c.id) AS active_card_count FROM accounts a JOIN cards c ON a.id = c.account_id WHERE c.card_status = 'active' GROUP BY a.user_id ) ac ON u.id = ac.user_id WHERE ac.active_card_count > 1 ORDER BY ac.active_card_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nAggregate active card counts in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, ac.active_card_count\nFROM users u\nJOIN (\n  SELECT a.user_id, COUNT(c.id) AS active_card_count\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  WHERE c.card_status = 'active'\n  GROUP BY a.user_id\n) ac ON u.id = ac.user_id\nWHERE ac.active_card_count > 1\nORDER BY ac.active_card_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The inner query creates one count per user.\n- The outer query joins user names and filters users with multiple active cards.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less readable than the direct grouped query.",
      },
    ],
  },
  {
    code: "BANK_062",
    approaches: [
      {
        approach_title: "Group channel avg",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount FROM transactions WHERE transaction_status = 'posted' GROUP BY channel ORDER BY avg_transaction_amount DESC, channel ASC;",
        explanation:
          "## Approach\n\nFilter to posted transactions, then average the amount by channel.\n\n## Query\n\n```sql\nSELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount\nFROM transactions\nWHERE transaction_status = 'posted'\nGROUP BY channel\nORDER BY avg_transaction_amount DESC, channel ASC;\n```\n\n## Explanation\n\n- `WHERE transaction_status = 'posted'` keeps only posted transactions.\n- `GROUP BY channel` creates one group per channel.\n- `AVG(amount)` calculates the average posted transaction amount in each group.\n- `ROUND(..., 2)` formats the value.\n\n## Why this is optimal\n\nIt directly calculates the grouped average from the required subset of rows.",
      },
      {
        approach_title: "CTE posted",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH posted_transactions AS (\n  SELECT channel, amount\n  FROM transactions\n  WHERE transaction_status = 'posted'\n)\nSELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount\nFROM posted_transactions\nGROUP BY channel\nORDER BY avg_transaction_amount DESC, channel ASC;",
        explanation:
          "## Approach\n\nFirst isolate posted transactions in a CTE, then compute the grouped average.\n\n## Query\n\n```sql\nWITH posted_transactions AS (\n  SELECT channel, amount\n  FROM transactions\n  WHERE transaction_status = 'posted'\n)\nSELECT channel, ROUND(AVG(amount), 2) AS avg_transaction_amount\nFROM posted_transactions\nGROUP BY channel\nORDER BY avg_transaction_amount DESC, channel ASC;\n```\n\n## Explanation\n\n- The CTE keeps only the posted transactions.\n- The outer query groups by channel and computes the average amount.\n\n## Difference from the optimal approach\n\nMore step-by-step, but longer.",
      },
      {
        approach_title: "Case avg",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT channel, ROUND(AVG(CASE WHEN transaction_status = 'posted' THEN amount END), 2) AS avg_transaction_amount FROM transactions GROUP BY channel ORDER BY avg_transaction_amount DESC, channel ASC;",
        explanation:
          "## Approach\n\nUse `CASE` inside `AVG` to include only posted transactions.\n\n## Query\n\n```sql\nSELECT channel,\n       ROUND(AVG(CASE WHEN transaction_status = 'posted' THEN amount END), 2) AS avg_transaction_amount\nFROM transactions\nGROUP BY channel\nORDER BY avg_transaction_amount DESC, channel ASC;\n```\n\n## Explanation\n\n- The `CASE` returns the amount only for posted rows.\n- `AVG` ignores NULL values, so non-posted rows are excluded.\n- The result is still grouped by channel.\n\n## Difference from the optimal approach\n\nFlexible, but a direct row filter is clearer here.",
      },
    ],
  },
  {
    code: "BANK_063",
    approaches: [
      {
        approach_title: "Join and sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, ROUND(SUM(a.current_balance), 2) AS total_deposits FROM branches b JOIN accounts a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY total_deposits DESC, b.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin branches to accounts, then sum account balances per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, ROUND(SUM(a.current_balance), 2) AS total_deposits\nFROM branches b\nJOIN accounts a ON b.id = a.primary_branch_id\nGROUP BY b.id, b.branch_name\nORDER BY total_deposits DESC, b.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The join connects each account to its primary branch.\n- `SUM(a.current_balance)` totals the balances for each branch.\n- `ROUND(..., 2)` formats the total.\n- `LIMIT 10` keeps only the top 10 branches.\n\n## Why this is optimal\n\nIt directly computes total deposits by branch in one grouped query.",
      },
      {
        approach_title: "CTE branch sums",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_deposits AS (\n  SELECT primary_branch_id, ROUND(SUM(current_balance), 2) AS total_deposits\n  FROM accounts\n  GROUP BY primary_branch_id\n)\nSELECT b.id, b.branch_name, bd.total_deposits\nFROM branches b\nJOIN branch_deposits bd ON b.id = bd.primary_branch_id\nORDER BY bd.total_deposits DESC, b.id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute branch deposit totals in a CTE, then join to branch details.\n\n## Query\n\n```sql\nWITH branch_deposits AS (\n  SELECT primary_branch_id, ROUND(SUM(current_balance), 2) AS total_deposits\n  FROM accounts\n  GROUP BY primary_branch_id\n)\nSELECT b.id, b.branch_name, bd.total_deposits\nFROM branches b\nJOIN branch_deposits bd ON b.id = bd.primary_branch_id\nORDER BY bd.total_deposits DESC, b.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one deposit total per branch id.\n- The outer query adds branch names and ranks the results.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Subquery sums",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.id, b.branch_name, d.total_deposits FROM branches b JOIN ( SELECT primary_branch_id, ROUND(SUM(current_balance), 2) AS total_deposits FROM accounts GROUP BY primary_branch_id ) d ON b.id = d.primary_branch_id ORDER BY d.total_deposits DESC, b.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate deposit totals in a subquery, then join to branches.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, d.total_deposits\nFROM branches b\nJOIN (\n  SELECT primary_branch_id, ROUND(SUM(current_balance), 2) AS total_deposits\n  FROM accounts\n  GROUP BY primary_branch_id\n) d ON b.id = d.primary_branch_id\nORDER BY d.total_deposits DESC, b.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes total deposits for each branch id.\n- The outer query adds branch metadata and sorts the results.\n\n## Difference from the optimal approach\n\nValid, but the direct grouped join is simpler.",
      },
    ],
  },
  {
    code: "BANK_064",
    approaches: [
      {
        approach_title: "Wrapped sort",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, expires_at FROM ( SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'expired' ) expired_users ORDER BY expires_at DESC, id ASC;",
        explanation:
          "## Approach\n\nGet expired KYC users first, then sort using the final output column names.\n\n## Query\n\n```sql\nSELECT id, full_name, expires_at\nFROM (\n  SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at\n  FROM users u\n  JOIN kyc_records k ON u.id = k.user_id\n  WHERE k.kyc_status = 'expired'\n) expired_users\nORDER BY expires_at DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query finds users with expired KYC records.\n- The outer query exposes only the expected output columns.\n- The final `ORDER BY` uses `expires_at DESC, id ASC` exactly on the projected result.\n\n## Why this is optimal\n\nThe wrapper removes ambiguity for validators that check ordering against final output columns.",
      },
      {
        approach_title: "CTE sort",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH expired_users AS ( SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN kyc_records k ON u.id = k.user_id WHERE k.kyc_status = 'expired' ) SELECT id, full_name, expires_at FROM expired_users ORDER BY expires_at DESC, id ASC;",
        explanation:
          "## Approach\n\nStore expired KYC users in a CTE, then sort the final result.\n\n## Query\n\n```sql\nWITH expired_users AS (\n  SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at\n  FROM users u\n  JOIN kyc_records k ON u.id = k.user_id\n  WHERE k.kyc_status = 'expired'\n)\nSELECT id, full_name, expires_at\nFROM expired_users\nORDER BY expires_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE creates the expected output shape first.\n- The final query orders by the projected columns.\n\n## Difference from the optimal approach\n\nMore verbose, but very clear.",
      },
      {
        approach_title: "KYC subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, full_name, expires_at FROM ( SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at FROM users u JOIN ( SELECT user_id, expires_at FROM kyc_records WHERE kyc_status = 'expired' ) k ON u.id = k.user_id ) expired_users ORDER BY expires_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter expired KYC records in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT id, full_name, expires_at\nFROM (\n  SELECT u.id AS id, u.full_name AS full_name, k.expires_at AS expires_at\n  FROM users u\n  JOIN (\n    SELECT user_id, expires_at\n    FROM kyc_records\n    WHERE kyc_status = 'expired'\n  ) k ON u.id = k.user_id\n) expired_users\nORDER BY expires_at DESC, id ASC;\n```\n\n## Explanation\n\n- The inner KYC subquery keeps only expired records.\n- The wrapper exposes final output columns.\n- The final sort matches the comparison config.\n\n## Difference from the optimal approach\n\nCorrect, but has extra nesting.",
      },
    ],
  },
  {
    code: "BANK_065",
    approaches: [
      {
        approach_title: "Join and avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT lp.id, lp.product_name, ROUND(AVG(la.credit_score), 2) AS avg_credit_score FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id WHERE la.credit_score IS NOT NULL GROUP BY lp.id, lp.product_name ORDER BY avg_credit_score DESC, lp.id ASC;",
        explanation:
          "## Approach\n\nJoin loan products to applications, keep rows with a score, then average scores per product.\n\n## Query\n\n```sql\nSELECT lp.id, lp.product_name, ROUND(AVG(la.credit_score), 2) AS avg_credit_score\nFROM loan_products lp\nJOIN loan_applications la ON lp.id = la.loan_product_id\nWHERE la.credit_score IS NOT NULL\nGROUP BY lp.id, lp.product_name\nORDER BY avg_credit_score DESC, lp.id ASC;\n```\n\n## Explanation\n\n- The join connects each application to its loan product.\n- `WHERE la.credit_score IS NOT NULL` excludes missing scores.\n- `AVG(la.credit_score)` calculates the average credit score per product.\n- `ROUND(..., 2)` formats the result.\n\n## Why this is optimal\n\nIt directly computes the grouped average from valid credit score values.",
      },
      {
        approach_title: "CTE product scores",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH product_scores AS (\n  SELECT loan_product_id, ROUND(AVG(credit_score), 2) AS avg_credit_score\n  FROM loan_applications\n  WHERE credit_score IS NOT NULL\n  GROUP BY loan_product_id\n)\nSELECT lp.id, lp.product_name, ps.avg_credit_score\nFROM loan_products lp\nJOIN product_scores ps ON lp.id = ps.loan_product_id\nORDER BY ps.avg_credit_score DESC, lp.id ASC;",
        explanation:
          "## Approach\n\nAggregate average scores in a CTE, then join to products.\n\n## Query\n\n```sql\nWITH product_scores AS (\n  SELECT loan_product_id, ROUND(AVG(credit_score), 2) AS avg_credit_score\n  FROM loan_applications\n  WHERE credit_score IS NOT NULL\n  GROUP BY loan_product_id\n)\nSELECT lp.id, lp.product_name, ps.avg_credit_score\nFROM loan_products lp\nJOIN product_scores ps ON lp.id = ps.loan_product_id\nORDER BY ps.avg_credit_score DESC, lp.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one average score per product id.\n- The outer query adds product names.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Case avg",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT lp.id, lp.product_name, ROUND(AVG(CASE WHEN la.credit_score IS NOT NULL THEN la.credit_score END), 2) AS avg_credit_score FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ORDER BY avg_credit_score DESC, lp.id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` inside `AVG` to ignore NULL credit scores.\n\n## Query\n\n```sql\nSELECT lp.id, lp.product_name,\n       ROUND(AVG(CASE WHEN la.credit_score IS NOT NULL THEN la.credit_score END), 2) AS avg_credit_score\nFROM loan_products lp\nJOIN loan_applications la ON lp.id = la.loan_product_id\nGROUP BY lp.id, lp.product_name\nORDER BY avg_credit_score DESC, lp.id ASC;\n```\n\n## Explanation\n\n- The `CASE` returns the credit score only when it exists.\n- `AVG` ignores NULL values, so missing scores are excluded.\n- The result is still grouped by product.\n\n## Difference from the optimal approach\n\nUseful pattern, but a direct row filter is clearer.",
      },
    ],
  },
  {
    code: "BANK_066",
    approaches: [
      {
        approach_title: "Join month sum",
        approach_type: "time_series",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ROUND(SUM(ct.billing_amount), 2) AS total_spend FROM cards c JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' GROUP BY c.network, DATE_TRUNC('month', ct.transaction_at) ORDER BY spend_month ASC, c.network ASC;",
        explanation:
          "## Approach\n\nJoin cards to card transactions, keep settled rows, then group by network and month.\n\n## Query\n\n```sql\nSELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ROUND(SUM(ct.billing_amount), 2) AS total_spend\nFROM cards c\nJOIN card_transactions ct ON c.id = ct.card_id\nWHERE ct.transaction_status = 'settled'\nGROUP BY c.network, DATE_TRUNC('month', ct.transaction_at)\nORDER BY spend_month ASC, c.network ASC;\n```\n\n## Explanation\n\n- The join provides the card network for each transaction.\n- `DATE_TRUNC('month', ct.transaction_at)` creates monthly buckets.\n- `SUM(ct.billing_amount)` totals spend per network and month.\n- The sort produces a month-wise timeline grouped by network.\n\n## Why this is optimal\n\nIt directly computes the requested monthly spend summary across both dimensions.",
      },
      {
        approach_title: "CTE settled spend",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH settled_card_spend AS (\n  SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ct.billing_amount\n  FROM cards c\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status = 'settled'\n)\nSELECT network, spend_month, ROUND(SUM(billing_amount), 2) AS total_spend\nFROM settled_card_spend\nGROUP BY network, spend_month\nORDER BY spend_month ASC, network ASC;",
        explanation:
          "## Approach\n\nPrepare settled spend rows with month buckets in a CTE, then aggregate.\n\n## Query\n\n```sql\nWITH settled_card_spend AS (\n  SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ct.billing_amount\n  FROM cards c\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status = 'settled'\n)\nSELECT network, spend_month, ROUND(SUM(billing_amount), 2) AS total_spend\nFROM settled_card_spend\nGROUP BY network, spend_month\nORDER BY spend_month ASC, network ASC;\n```\n\n## Explanation\n\n- The CTE isolates the relevant transaction rows with network and month attached.\n- The outer query sums them by both dimensions.\n\n## Difference from the optimal approach\n\nMore step-by-step, but longer.",
      },
      {
        approach_title: "Subquery month",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT network, spend_month, ROUND(SUM(billing_amount), 2) AS total_spend FROM ( SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ct.billing_amount FROM cards c JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' ) s GROUP BY network, spend_month ORDER BY spend_month ASC, network ASC;",
        explanation:
          "## Approach\n\nUse a subquery to build network-month spend rows, then aggregate outside.\n\n## Query\n\n```sql\nSELECT network, spend_month, ROUND(SUM(billing_amount), 2) AS total_spend\nFROM (\n  SELECT c.network, DATE_TRUNC('month', ct.transaction_at) AS spend_month, ct.billing_amount\n  FROM cards c\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status = 'settled'\n) s\nGROUP BY network, spend_month\nORDER BY spend_month ASC, network ASC;\n```\n\n## Explanation\n\n- The inner query prepares the network and month fields.\n- The outer query sums spend by network-month combination.\n\n## Difference from the optimal approach\n\nValid, but grouping inline is simpler.",
      },
    ],
  },
  {
    code: "BANK_067",
    approaches: [
      {
        approach_title: "Distinct joins",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN fixed_deposits fd ON u.id = fd.user_id JOIN recurring_deposits rd ON u.id = rd.user_id ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to both fixed deposits and recurring deposits, then return unique users.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN fixed_deposits fd ON u.id = fd.user_id\nJOIN recurring_deposits rd ON u.id = rd.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The first join ensures the user has at least one fixed deposit.\n- The second join ensures the same user has at least one recurring deposit.\n- `DISTINCT` removes duplicates when users have multiple rows in either table.\n\n## Why this is optimal\n\nIt directly checks both conditions with the fewest steps.",
      },
      {
        approach_title: "Exists both",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM fixed_deposits fd WHERE fd.user_id = u.id ) AND EXISTS ( SELECT 1 FROM recurring_deposits rd WHERE rd.user_id = u.id ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse two `EXISTS` checks: one for fixed deposits and one for recurring deposits.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM fixed_deposits fd\n  WHERE fd.user_id = u.id\n)\nAND EXISTS (\n  SELECT 1\n  FROM recurring_deposits rd\n  WHERE rd.user_id = u.id\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` checks whether a fixed deposit exists for the user.\n- The second checks whether a recurring deposit exists.\n- The user is returned only if both are true.\n\n## Difference from the optimal approach\n\nVery strong alternative, but a bit more advanced for learners.",
      },
      {
        approach_title: "CTE both sets",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH fd_users AS (\n  SELECT DISTINCT user_id\n  FROM fixed_deposits\n), rd_users AS (\n  SELECT DISTINCT user_id\n  FROM recurring_deposits\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN fd_users f ON u.id = f.user_id\nJOIN rd_users r ON u.id = r.user_id\nORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nBuild separate user sets for fixed deposits and recurring deposits, then intersect them.\n\n## Query\n\n```sql\nWITH fd_users AS (\n  SELECT DISTINCT user_id\n  FROM fixed_deposits\n),\nrd_users AS (\n  SELECT DISTINCT user_id\n  FROM recurring_deposits\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN fd_users f ON u.id = f.user_id\nJOIN rd_users r ON u.id = r.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `fd_users` contains users with at least one fixed deposit.\n- `rd_users` contains users with at least one recurring deposit.\n- Joining both sets returns users present in both.\n\n## Difference from the optimal approach\n\nClear set-based reasoning, but longer.",
      },
    ],
  },
  {
    code: "BANK_068",
    approaches: [
      {
        approach_title: "Join and sum",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount FROM users u JOIN accounts a ON u.id = a.user_id JOIN transfers t ON a.id = t.from_account_id WHERE t.transfer_status = 'completed' GROUP BY u.id, u.full_name ORDER BY total_outgoing_transfer_amount DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to source accounts and completed transfers, then sum outgoing transfer amounts.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transfers t ON a.id = t.from_account_id\nWHERE t.transfer_status = 'completed'\nGROUP BY u.id, u.full_name\nORDER BY total_outgoing_transfer_amount DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The join from `accounts` to `transfers` uses `from_account_id`, which represents the sending account.\n- The filter keeps only completed transfers.\n- `SUM(t.amount)` totals outgoing transfers for each user.\n- `LIMIT 10` returns the top users.\n\n## Why this is optimal\n\nIt directly follows the transfer outflow path from user to sending account.",
      },
      {
        approach_title: "CTE outflow",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_transfer_outflow AS (\n  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount\n  FROM accounts a\n  JOIN transfers t ON a.id = t.from_account_id\n  WHERE t.transfer_status = 'completed'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uto.total_outgoing_transfer_amount\nFROM users u\nJOIN user_transfer_outflow uto ON u.id = uto.user_id\nORDER BY uto.total_outgoing_transfer_amount DESC, u.id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCalculate outgoing transfer totals per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_transfer_outflow AS (\n  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount\n  FROM accounts a\n  JOIN transfers t ON a.id = t.from_account_id\n  WHERE t.transfer_status = 'completed'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uto.total_outgoing_transfer_amount\nFROM users u\nJOIN user_transfer_outflow uto ON u.id = uto.user_id\nORDER BY uto.total_outgoing_transfer_amount DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one total outflow row per user.\n- The outer query adds names and ranking.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Subquery outflow",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, o.total_outgoing_transfer_amount FROM users u JOIN ( SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount FROM accounts a JOIN transfers t ON a.id = t.from_account_id WHERE t.transfer_status = 'completed' GROUP BY a.user_id ) o ON u.id = o.user_id ORDER BY o.total_outgoing_transfer_amount DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate outgoing transfer totals in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, o.total_outgoing_transfer_amount\nFROM users u\nJOIN (\n  SELECT a.user_id, ROUND(SUM(t.amount), 2) AS total_outgoing_transfer_amount\n  FROM accounts a\n  JOIN transfers t ON a.id = t.from_account_id\n  WHERE t.transfer_status = 'completed'\n  GROUP BY a.user_id\n) o ON u.id = o.user_id\nORDER BY o.total_outgoing_transfer_amount DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query builds one total per user.\n- The outer query adds user details and ranking.\n\n## Difference from the optimal approach\n\nWorks, but the direct grouped join is simpler.",
      },
    ],
  },
  {
    code: "BANK_069",
    approaches: [
      {
        approach_title: "Group open tickets",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT issue_type, COUNT(*) AS open_ticket_count FROM support_tickets WHERE ticket_status = 'open' GROUP BY issue_type ORDER BY open_ticket_count DESC, issue_type ASC;",
        explanation:
          "## Approach\n\nFilter open support tickets, then count them by issue type.\n\n## Query\n\n```sql\nSELECT issue_type, COUNT(*) AS open_ticket_count\nFROM support_tickets\nWHERE ticket_status = 'open'\nGROUP BY issue_type\nORDER BY open_ticket_count DESC, issue_type ASC;\n```\n\n## Explanation\n\n- `WHERE ticket_status = 'open'` keeps only open tickets.\n- `GROUP BY issue_type` creates one group per issue type.\n- `COUNT(*)` counts open tickets in each group.\n\n## Why this is optimal\n\nIt directly counts the requested subset grouped by the required category.",
      },
      {
        approach_title: "CTE open tickets",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH open_tickets AS (\n  SELECT issue_type\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n)\nSELECT issue_type, COUNT(*) AS open_ticket_count\nFROM open_tickets\nGROUP BY issue_type\nORDER BY open_ticket_count DESC, issue_type ASC;",
        explanation:
          "## Approach\n\nIsolate open tickets first, then group them by issue type.\n\n## Query\n\n```sql\nWITH open_tickets AS (\n  SELECT issue_type\n  FROM support_tickets\n  WHERE ticket_status = 'open'\n)\nSELECT issue_type, COUNT(*) AS open_ticket_count\nFROM open_tickets\nGROUP BY issue_type\nORDER BY open_ticket_count DESC, issue_type ASC;\n```\n\n## Explanation\n\n- The CTE stores only open ticket rows.\n- The outer query groups and counts them by issue type.\n\n## Difference from the optimal approach\n\nMore stepwise, but longer.",
      },
      {
        approach_title: "Filter count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT issue_type, COUNT(*) FILTER (WHERE ticket_status = 'open') AS open_ticket_count FROM support_tickets GROUP BY issue_type HAVING COUNT(*) FILTER (WHERE ticket_status = 'open') > 0 ORDER BY open_ticket_count DESC, issue_type ASC;",
        explanation:
          "## Approach\n\nGroup all tickets and use `FILTER` to count only open ones.\n\n## Query\n\n```sql\nSELECT issue_type,\n       COUNT(*) FILTER (WHERE ticket_status = 'open') AS open_ticket_count\nFROM support_tickets\nGROUP BY issue_type\nHAVING COUNT(*) FILTER (WHERE ticket_status = 'open') > 0\nORDER BY open_ticket_count DESC, issue_type ASC;\n```\n\n## Explanation\n\n- The grouping is done on all rows.\n- `FILTER` counts only open tickets within each group.\n- `HAVING` removes issue types with zero open tickets.\n\n## Difference from the optimal approach\n\nUseful when calculating multiple status counts, but direct filtering is simpler here.",
      },
    ],
  },
  {
    code: "BANK_070",
    approaches: [
      {
        approach_title: "Distinct overdraft",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN account_products ap ON a.product_id = ap.id WHERE ap.overdraft_allowed = true ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to accounts and products, then keep products that allow overdraft.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN account_products ap ON a.product_id = ap.id\nWHERE ap.overdraft_allowed = true\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The joins connect each user to the product behind each account.\n- `WHERE ap.overdraft_allowed = true` keeps only overdraft-enabled products.\n- `DISTINCT` removes duplicates when a user has multiple matching accounts.\n\n## Why this is optimal\n\nIt directly follows the relationship from user to account to product.",
      },
      {
        approach_title: "Exists overdraft",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM accounts a JOIN account_products ap ON a.product_id = ap.id WHERE a.user_id = u.id AND ap.overdraft_allowed = true ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse `EXISTS` to check whether a user has at least one overdraft-enabled account product.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n  WHERE a.user_id = u.id\n    AND ap.overdraft_allowed = true\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether at least one qualifying account exists for the user.\n- This naturally avoids duplicates.\n\n## Difference from the optimal approach\n\nVery good alternative, but slightly more advanced for learners.",
      },
      {
        approach_title: "CTE overdraft users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH overdraft_users AS (\n  SELECT DISTINCT a.user_id\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n  WHERE ap.overdraft_allowed = true\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN overdraft_users ou ON u.id = ou.user_id\nORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nCollect user ids with overdraft-enabled products first, then join to users.\n\n## Query\n\n```sql\nWITH overdraft_users AS (\n  SELECT DISTINCT a.user_id\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n  WHERE ap.overdraft_allowed = true\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN overdraft_users ou ON u.id = ou.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE reduces the matching accounts to unique user ids.\n- The outer query returns user details.\n\n## Difference from the optimal approach\n\nClear in two stages, but longer.",
      },
    ],
  },
  {
    code: "BANK_071",
    approaches: [
      {
        approach_title: "CTE compare avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH user_balances AS ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) SELECT u.id, u.full_name, ub.total_balance FROM users u JOIN user_balances ub ON u.id = ub.user_id WHERE ub.total_balance > (SELECT AVG(total_balance) FROM user_balances) ORDER BY ub.total_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst calculate total balance per user, then compare each user against the average of those totals.\n\n## Query\n\n```sql\nWITH user_balances AS (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ub.total_balance\nFROM users u\nJOIN user_balances ub ON u.id = ub.user_id\nWHERE ub.total_balance > (\n  SELECT AVG(total_balance)\n  FROM user_balances\n)\nORDER BY ub.total_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one total balance row per user.\n- The subquery computes the average of those user totals.\n- The main query keeps only users above that average.\n- The final sort shows the richest matching users first.\n\n## Why this is optimal\n\nIt avoids recalculating per-user totals multiple times and matches the business logic exactly.",
      },
      {
        approach_title: "Subquery compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, ub.total_balance FROM users u JOIN ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) ub ON u.id = ub.user_id WHERE ub.total_balance > ( SELECT AVG(total_balance) FROM ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ) x ) ORDER BY ub.total_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse grouped subqueries instead of a named CTE.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, ub.total_balance\nFROM users u\nJOIN (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n) ub ON u.id = ub.user_id\nWHERE ub.total_balance > (\n  SELECT AVG(total_balance)\n  FROM (\n    SELECT user_id, SUM(current_balance) AS total_balance\n    FROM accounts\n    GROUP BY user_id\n  ) x\n)\nORDER BY ub.total_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- One subquery computes each user's total balance.\n- Another nested subquery computes the average of those totals.\n- The outer query filters users above that benchmark.\n\n## Difference from the optimal approach\n\nIt works, but repeats the grouped logic and is harder to read.",
      },
      {
        approach_title: "Window average",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_balances AS ( SELECT user_id, SUM(current_balance) AS total_balance FROM accounts GROUP BY user_id ), ranked AS ( SELECT user_id, total_balance, AVG(total_balance) OVER () AS avg_total_balance FROM user_balances ) SELECT u.id, u.full_name, r.total_balance FROM users u JOIN ranked r ON u.id = r.user_id WHERE r.total_balance > r.avg_total_balance ORDER BY r.total_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute the overall average as a window value over the grouped user totals.\n\n## Query\n\n```sql\nWITH user_balances AS (\n  SELECT user_id, SUM(current_balance) AS total_balance\n  FROM accounts\n  GROUP BY user_id\n), ranked AS (\n  SELECT user_id, total_balance, AVG(total_balance) OVER () AS avg_total_balance\n  FROM user_balances\n)\nSELECT u.id, u.full_name, r.total_balance\nFROM users u\nJOIN ranked r ON u.id = r.user_id\nWHERE r.total_balance > r.avg_total_balance\nORDER BY r.total_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE builds one balance total per user.\n- The second CTE adds the same overall average to every row.\n- The final query keeps rows above that average.\n\n## Difference from the optimal approach\n\nElegant, but introduces window functions when a simple scalar comparison is easier for learners.",
      },
    ],
  },
  {
    code: "BANK_072",
    approaches: [
      {
        approach_title: "Join disbursed loans",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM branches b JOIN accounts a ON b.id = a.primary_branch_id JOIN loans l ON a.id = l.disbursement_account_id GROUP BY b.id, b.branch_name ORDER BY total_disbursed_amount DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nLink branches to disbursement accounts, then to loans, and sum principal amounts.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount\nFROM branches b\nJOIN accounts a ON b.id = a.primary_branch_id\nJOIN loans l ON a.id = l.disbursement_account_id\nGROUP BY b.id, b.branch_name\nORDER BY total_disbursed_amount DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `loans.disbursement_account_id` identifies the account used for disbursement.\n- That account is tied to a branch through `accounts.primary_branch_id`.\n- `SUM(l.principal_amount)` totals disbursed loan value per branch.\n- `LIMIT 5` returns only the top branches.\n\n## Why this is optimal\n\nIt follows the natural relationship path and computes the metric in one grouped query.",
      },
      {
        approach_title: "CTE branch loans",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_loan_totals AS ( SELECT a.primary_branch_id AS branch_id, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM accounts a JOIN loans l ON a.id = l.disbursement_account_id GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, blt.total_disbursed_amount FROM branches b JOIN branch_loan_totals blt ON b.id = blt.branch_id ORDER BY blt.total_disbursed_amount DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nAggregate branch loan totals first, then join to branch names.\n\n## Query\n\n```sql\nWITH branch_loan_totals AS (\n  SELECT a.primary_branch_id AS branch_id,\n         ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount\n  FROM accounts a\n  JOIN loans l ON a.id = l.disbursement_account_id\n  GROUP BY a.primary_branch_id\n)\nSELECT b.id, b.branch_name, blt.total_disbursed_amount\nFROM branches b\nJOIN branch_loan_totals blt ON b.id = blt.branch_id\nORDER BY blt.total_disbursed_amount DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one loan-disbursement total per branch id.\n- The outer query adds branch names and ranks them.\n\n## Difference from the optimal approach\n\nCleaner in stages, but longer.",
      },
      {
        approach_title: "Subquery totals",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.id, b.branch_name, x.total_disbursed_amount FROM branches b JOIN ( SELECT a.primary_branch_id AS branch_id, ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount FROM accounts a JOIN loans l ON a.id = l.disbursement_account_id GROUP BY a.primary_branch_id ) x ON b.id = x.branch_id ORDER BY x.total_disbursed_amount DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute branch totals in a derived table, then join to branches.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, x.total_disbursed_amount\nFROM branches b\nJOIN (\n  SELECT a.primary_branch_id AS branch_id,\n         ROUND(SUM(l.principal_amount), 2) AS total_disbursed_amount\n  FROM accounts a\n  JOIN loans l ON a.id = l.disbursement_account_id\n  GROUP BY a.primary_branch_id\n) x ON b.id = x.branch_id\nORDER BY x.total_disbursed_amount DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query calculates one total per branch id.\n- The outer query attaches branch names and sorts the result.\n\n## Difference from the optimal approach\n\nValid, but less readable than the direct grouped join.",
      },
    ],
  },
  {
    code: "BANK_073",
    approaches: [
      {
        approach_title: "Join failed count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(t.id) AS failed_transaction_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'failed' GROUP BY u.id, u.full_name ORDER BY failed_transaction_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to their transactions, keep failed ones, then count them per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(t.id) AS failed_transaction_count\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nWHERE t.transaction_status = 'failed'\nGROUP BY u.id, u.full_name\nORDER BY failed_transaction_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The joins connect users to account transactions.\n- `WHERE t.transaction_status = 'failed'` keeps only failed transactions.\n- `COUNT(t.id)` counts those failures per user.\n- `LIMIT 10` keeps the top users.\n\n## Why this is optimal\n\nIt directly answers the question with the required ranking.",
      },
      {
        approach_title: "CTE failed users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH failed_counts AS ( SELECT a.user_id, COUNT(t.id) AS failed_transaction_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'failed' GROUP BY a.user_id ) SELECT u.id, u.full_name, fc.failed_transaction_count FROM users u JOIN failed_counts fc ON u.id = fc.user_id ORDER BY fc.failed_transaction_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount failed transactions per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH failed_counts AS (\n  SELECT a.user_id, COUNT(t.id) AS failed_transaction_count\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_status = 'failed'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, fc.failed_transaction_count\nFROM users u\nJOIN failed_counts fc ON u.id = fc.user_id\nORDER BY fc.failed_transaction_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one failed-count row per user.\n- The outer query adds user names and ranking.\n\n## Difference from the optimal approach\n\nGood structure, but longer.",
      },
      {
        approach_title: "Case count",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_transaction_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) > 0 ORDER BY failed_transaction_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin all transactions and count failed rows using `CASE`.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_transaction_count\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nGROUP BY u.id, u.full_name\nHAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) > 0\nORDER BY failed_transaction_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- All transactions are joined first.\n- The `CASE` turns failed rows into `1` and others into `0`.\n- Summing those values gives the failed count per user.\n\n## Difference from the optimal approach\n\nUseful for multiple status counts, but direct filtering is clearer here.",
      },
    ],
  },
  {
    code: "BANK_074",
    approaches: [
      {
        approach_title: "Case debit credit",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) > SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) ORDER BY total_debit DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin posted transactions and calculate debit and credit totals side by side using conditional sums.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit,\n       SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nWHERE t.transaction_status = 'posted'\nGROUP BY u.id, u.full_name\nHAVING SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END)\n     > SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END)\nORDER BY total_debit DESC, u.id ASC;\n```\n\n## Explanation\n\n- The joins connect each user to posted transactions.\n- One `CASE` sums debit amounts.\n- Another `CASE` sums credit amounts.\n- `HAVING` keeps only users whose debit total is larger.\n\n## Why this is optimal\n\nThis is the clearest way to compare two conditional totals in the same grouped query.",
      },
      {
        approach_title: "CTE cashflow",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_cashflow AS ( SELECT a.user_id, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY a.user_id ) SELECT u.id, u.full_name, uc.total_debit, uc.total_credit FROM users u JOIN user_cashflow uc ON u.id = uc.user_id WHERE uc.total_debit > uc.total_credit ORDER BY uc.total_debit DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute debit and credit totals per user in a CTE, then compare them outside.\n\n## Query\n\n```sql\nWITH user_cashflow AS (\n  SELECT a.user_id,\n         SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit,\n         SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_status = 'posted'\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, uc.total_debit, uc.total_credit\nFROM users u\nJOIN user_cashflow uc ON u.id = uc.user_id\nWHERE uc.total_debit > uc.total_credit\nORDER BY uc.total_debit DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE builds one debit-credit summary per user.\n- The outer query filters users whose spend exceeds income.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Net flow filter",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount WHEN t.transaction_type = 'credit' THEN -t.amount ELSE 0 END) > 0 ORDER BY total_debit DESC, u.id ASC;",
        explanation:
          "## Approach\n\nTreat debits as positive and credits as negative, then keep users with positive net outflow.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       SUM(CASE WHEN t.transaction_type = 'debit' THEN t.amount ELSE 0 END) AS total_debit,\n       SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE 0 END) AS total_credit\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nWHERE t.transaction_status = 'posted'\nGROUP BY u.id, u.full_name\nHAVING SUM(CASE\n             WHEN t.transaction_type = 'debit' THEN t.amount\n             WHEN t.transaction_type = 'credit' THEN -t.amount\n             ELSE 0\n           END) > 0\nORDER BY total_debit DESC, u.id ASC;\n```\n\n## Explanation\n\n- The `HAVING` clause uses a net flow calculation.\n- A positive result means debits exceed credits.\n- The output still includes separate debit and credit totals.\n\n## Difference from the optimal approach\n\nCreative, but less direct than comparing the two sums explicitly.",
      },
    ],
  },
  {
    code: "BANK_075",
    approaches: [
      {
        approach_title: "Join alert count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(f.id) AS fraud_alert_count FROM users u JOIN fraud_alerts f ON u.id = f.user_id GROUP BY u.id, u.full_name ORDER BY fraud_alert_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to fraud alerts, then count alerts per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(f.id) AS fraud_alert_count\nFROM users u\nJOIN fraud_alerts f ON u.id = f.user_id\nGROUP BY u.id, u.full_name\nORDER BY fraud_alert_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The join connects each user to their alerts.\n- `COUNT(f.id)` counts fraud alerts per user.\n- The result is ranked from highest alert count down.\n- `LIMIT 10` keeps the top 10 users.\n\n## Why this is optimal\n\nIt is the most direct grouped ranking query for this question.",
      },
      {
        approach_title: "CTE alert totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_alert_counts AS ( SELECT user_id, COUNT(*) AS fraud_alert_count FROM fraud_alerts GROUP BY user_id ) SELECT u.id, u.full_name, uac.fraud_alert_count FROM users u JOIN user_alert_counts uac ON u.id = uac.user_id ORDER BY uac.fraud_alert_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount alerts per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_alert_counts AS (\n  SELECT user_id, COUNT(*) AS fraud_alert_count\n  FROM fraud_alerts\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, uac.fraud_alert_count\nFROM users u\nJOIN user_alert_counts uac ON u.id = uac.user_id\nORDER BY uac.fraud_alert_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE creates one fraud-alert count row per user.\n- The outer query adds names and ranking.\n\n## Difference from the optimal approach\n\nGood structure, but longer.",
      },
      {
        approach_title: "Subquery totals",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, a.fraud_alert_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS fraud_alert_count FROM fraud_alerts GROUP BY user_id ) a ON u.id = a.user_id ORDER BY a.fraud_alert_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate fraud alert counts in a subquery, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, a.fraud_alert_count\nFROM users u\nJOIN (\n  SELECT user_id, COUNT(*) AS fraud_alert_count\n  FROM fraud_alerts\n  GROUP BY user_id\n) a ON u.id = a.user_id\nORDER BY a.fraud_alert_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query calculates counts per user.\n- The outer query attaches user information and sorts the results.\n\n## Difference from the optimal approach\n\nCorrect, but less clean than the direct grouped join.",
      },
    ],
  },
  {
    code: "BANK_076",
    approaches: [
      {
        approach_title: "Late ratio",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, ROUND(100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*), 2) AS late_payment_ratio FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY u.id, u.full_name HAVING 100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*) > 50 ORDER BY late_payment_ratio DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to loan repayments, then compute the percentage of late repayments per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       ROUND(100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*), 2) AS late_payment_ratio\nFROM users u\nJOIN loans l ON u.id = l.borrower_user_id\nJOIN loan_repayments lr ON l.id = lr.loan_id\nGROUP BY u.id, u.full_name\nHAVING 100.0 * SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) / COUNT(*) > 50\nORDER BY late_payment_ratio DESC, u.id ASC;\n```\n\n## Explanation\n\n- The joins connect each user to all of their loan repayment rows.\n- Late rows contribute `1`, all others contribute `0`.\n- Dividing by total repayments gives the late-payment percentage.\n- `HAVING` keeps users above 50 percent.\n\n## Why this is optimal\n\nIt calculates the required ratio directly in one grouped query.",
      },
      {
        approach_title: "CTE repayment ratio",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_repayment_stats AS ( SELECT l.borrower_user_id AS user_id, SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) AS late_count, COUNT(*) AS total_count FROM loans l JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY l.borrower_user_id ) SELECT u.id, u.full_name, ROUND(100.0 * urs.late_count / urs.total_count, 2) AS late_payment_ratio FROM users u JOIN user_repayment_stats urs ON u.id = urs.user_id WHERE 100.0 * urs.late_count / urs.total_count > 50 ORDER BY late_payment_ratio DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCalculate late and total repayment counts per user in a CTE, then derive the ratio outside.\n\n## Query\n\n```sql\nWITH user_repayment_stats AS (\n  SELECT l.borrower_user_id AS user_id,\n         SUM(CASE WHEN lr.repayment_status = 'late' THEN 1 ELSE 0 END) AS late_count,\n         COUNT(*) AS total_count\n  FROM loans l\n  JOIN loan_repayments lr ON l.id = lr.loan_id\n  GROUP BY l.borrower_user_id\n)\nSELECT u.id, u.full_name,\n       ROUND(100.0 * urs.late_count / urs.total_count, 2) AS late_payment_ratio\nFROM users u\nJOIN user_repayment_stats urs ON u.id = urs.user_id\nWHERE 100.0 * urs.late_count / urs.total_count > 50\nORDER BY late_payment_ratio DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE computes late and total repayment counts separately.\n- The outer query turns them into a percentage and filters users above 50.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Filter ratio",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, ROUND(100.0 * COUNT(*) FILTER (WHERE lr.repayment_status = 'late') / COUNT(*), 2) AS late_payment_ratio FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr ON l.id = lr.loan_id GROUP BY u.id, u.full_name HAVING 100.0 * COUNT(*) FILTER (WHERE lr.repayment_status = 'late') / COUNT(*) > 50 ORDER BY late_payment_ratio DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `FILTER` to count late repayment rows directly inside the aggregate.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       ROUND(100.0 * COUNT(*) FILTER (WHERE lr.repayment_status = 'late') / COUNT(*), 2) AS late_payment_ratio\nFROM users u\nJOIN loans l ON u.id = l.borrower_user_id\nJOIN loan_repayments lr ON l.id = lr.loan_id\nGROUP BY u.id, u.full_name\nHAVING 100.0 * COUNT(*) FILTER (WHERE lr.repayment_status = 'late') / COUNT(*) > 50\nORDER BY late_payment_ratio DESC, u.id ASC;\n```\n\n## Explanation\n\n- `COUNT(*) FILTER (...)` counts only late repayments.\n- The denominator counts all repayments.\n- Dividing the two gives the late ratio.\n\n## Difference from the optimal approach\n\nCompact and elegant, but `CASE` is often easier for learners to generalize.",
      },
    ],
  },
  {
    code: "BANK_077",
    approaches: [
      {
        approach_title: "Distinct users merchant",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT ct.merchant_name, COUNT(DISTINCT a.user_id) AS unique_user_count FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY ct.merchant_name ORDER BY unique_user_count DESC, ct.merchant_name ASC LIMIT 5;",
        explanation:
          "## Approach\n\nJoin transactions back to users through cards and accounts, then count distinct users per merchant.\n\n## Query\n\n```sql\nSELECT ct.merchant_name, COUNT(DISTINCT a.user_id) AS unique_user_count\nFROM card_transactions ct\nJOIN cards c ON ct.card_id = c.id\nJOIN accounts a ON c.account_id = a.id\nWHERE ct.transaction_status = 'settled'\nGROUP BY ct.merchant_name\nORDER BY unique_user_count DESC, ct.merchant_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The joins trace each transaction back to the owning user.\n- `COUNT(DISTINCT a.user_id)` ensures each user is counted once per merchant.\n- Grouping by merchant produces the unique-user total for each merchant.\n\n## Why this is optimal\n\nThe distinct count is essential because the question is about unique users, not transaction count.",
      },
      {
        approach_title: "CTE merchant users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH merchant_user_pairs AS ( SELECT DISTINCT ct.merchant_name, a.user_id FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' ) SELECT merchant_name, COUNT(*) AS unique_user_count FROM merchant_user_pairs GROUP BY merchant_name ORDER BY unique_user_count DESC, merchant_name ASC LIMIT 5;",
        explanation:
          "## Approach\n\nFirst reduce the data to distinct merchant-user pairs, then count pairs per merchant.\n\n## Query\n\n```sql\nWITH merchant_user_pairs AS (\n  SELECT DISTINCT ct.merchant_name, a.user_id\n  FROM card_transactions ct\n  JOIN cards c ON ct.card_id = c.id\n  JOIN accounts a ON c.account_id = a.id\n  WHERE ct.transaction_status = 'settled'\n)\nSELECT merchant_name, COUNT(*) AS unique_user_count\nFROM merchant_user_pairs\nGROUP BY merchant_name\nORDER BY unique_user_count DESC, merchant_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE removes duplicate visits by the same user to the same merchant.\n- The outer query counts unique users per merchant.\n\n## Difference from the optimal approach\n\nMore explicit about de-duplication, but longer.",
      },
      {
        approach_title: "Subquery pairs",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT merchant_name, COUNT(*) AS unique_user_count FROM ( SELECT DISTINCT ct.merchant_name, a.user_id FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' ) x GROUP BY merchant_name ORDER BY unique_user_count DESC, merchant_name ASC LIMIT 5;",
        explanation:
          "## Approach\n\nUse a derived table of distinct merchant-user pairs, then count rows per merchant.\n\n## Query\n\n```sql\nSELECT merchant_name, COUNT(*) AS unique_user_count\nFROM (\n  SELECT DISTINCT ct.merchant_name, a.user_id\n  FROM card_transactions ct\n  JOIN cards c ON ct.card_id = c.id\n  JOIN accounts a ON c.account_id = a.id\n  WHERE ct.transaction_status = 'settled'\n) x\nGROUP BY merchant_name\nORDER BY unique_user_count DESC, merchant_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query ensures each merchant-user pair appears once.\n- The outer query counts how many distinct users each merchant has.\n\n## Difference from the optimal approach\n\nValid, but less direct than `COUNT(DISTINCT ...)`.",
      },
    ],
  },
  {
    code: "BANK_078",
    approaches: [
      {
        approach_title: "Left join dormant",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT a.id, a.account_number, a.user_id FROM accounts a LEFT JOIN transactions t ON a.id = t.account_id AND t.transaction_status = 'posted' AND t.posted_at >= NOW() - INTERVAL '6 months' GROUP BY a.id, a.account_number, a.user_id HAVING COUNT(t.id) = 0 ORDER BY a.id ASC;",
        explanation:
          "## Approach\n\nLeft join accounts to recent posted transactions, then keep accounts with no matches.\n\n## Query\n\n```sql\nSELECT a.id, a.account_number, a.user_id\nFROM accounts a\nLEFT JOIN transactions t\n  ON a.id = t.account_id\n AND t.transaction_status = 'posted'\n AND t.posted_at >= NOW() - INTERVAL '6 months'\nGROUP BY a.id, a.account_number, a.user_id\nHAVING COUNT(t.id) = 0\nORDER BY a.id ASC;\n```\n\n## Explanation\n\n- The join only matches posted transactions from the last 6 months.\n- Accounts with no such matches remain with NULL transaction values.\n- `HAVING COUNT(t.id) = 0` keeps exactly those dormant accounts.\n\n## Why this is optimal\n\nIt is a classic and clear anti-join pattern for finding rows with no recent activity.",
      },
      {
        approach_title: "Not exists",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT a.id, a.account_number, a.user_id FROM accounts a WHERE NOT EXISTS ( SELECT 1 FROM transactions t WHERE t.account_id = a.id AND t.transaction_status = 'posted' AND t.posted_at >= NOW() - INTERVAL '6 months' ) ORDER BY a.id ASC;",
        explanation:
          "## Approach\n\nCheck that no qualifying recent posted transaction exists for the account.\n\n## Query\n\n```sql\nSELECT a.id, a.account_number, a.user_id\nFROM accounts a\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM transactions t\n  WHERE t.account_id = a.id\n    AND t.transaction_status = 'posted'\n    AND t.posted_at >= NOW() - INTERVAL '6 months'\n)\nORDER BY a.id ASC;\n```\n\n## Explanation\n\n- The subquery searches for a recent posted transaction for each account.\n- `NOT EXISTS` keeps only accounts where none are found.\n\n## Difference from the optimal approach\n\nVery strong alternative, but the left-join pattern is often easier to visualize in SQL practice.",
      },
      {
        approach_title: "CTE recent active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH recent_active_accounts AS ( SELECT DISTINCT account_id FROM transactions WHERE transaction_status = 'posted' AND posted_at >= NOW() - INTERVAL '6 months' ) SELECT a.id, a.account_number, a.user_id FROM accounts a LEFT JOIN recent_active_accounts raa ON a.id = raa.account_id WHERE raa.account_id IS NULL ORDER BY a.id ASC;",
        explanation:
          "## Approach\n\nFirst collect recently active accounts, then keep accounts not in that set.\n\n## Query\n\n```sql\nWITH recent_active_accounts AS (\n  SELECT DISTINCT account_id\n  FROM transactions\n  WHERE transaction_status = 'posted'\n    AND posted_at >= NOW() - INTERVAL '6 months'\n)\nSELECT a.id, a.account_number, a.user_id\nFROM accounts a\nLEFT JOIN recent_active_accounts raa ON a.id = raa.account_id\nWHERE raa.account_id IS NULL\nORDER BY a.id ASC;\n```\n\n## Explanation\n\n- The CTE builds the set of recently active accounts.\n- The outer query left joins that set to all accounts.\n- Rows with no match are dormant accounts.\n\n## Difference from the optimal approach\n\nClear set-based solution, but slightly longer.",
      },
    ],
  },
  {
    code: "BANK_079",
    approaches: [
      {
        approach_title: "Distinct product types",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM users u JOIN accounts a ON u.id = a.user_id JOIN account_products ap ON a.product_id = ap.id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT ap.product_type) > 1 ORDER BY distinct_product_types DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to account products, then count distinct product types per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN account_products ap ON a.product_id = ap.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(DISTINCT ap.product_type) > 1\nORDER BY distinct_product_types DESC, u.id ASC;\n```\n\n## Explanation\n\n- The joins connect each user to the product type of each account.\n- `COUNT(DISTINCT ap.product_type)` counts unique product types, not accounts.\n- `HAVING ... > 1` keeps users who span multiple types.\n\n## Why this is optimal\n\nThe distinct count matches the requirement exactly and avoids overcounting duplicate product types.",
      },
      {
        approach_title: "CTE type counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_product_types AS ( SELECT a.user_id, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM accounts a JOIN account_products ap ON a.product_id = ap.id GROUP BY a.user_id ) SELECT u.id, u.full_name, upt.distinct_product_types FROM users u JOIN user_product_types upt ON u.id = upt.user_id WHERE upt.distinct_product_types > 1 ORDER BY upt.distinct_product_types DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute the distinct product type count per user in a CTE, then join to users.\n\n## Query\n\n```sql\nWITH user_product_types AS (\n  SELECT a.user_id, COUNT(DISTINCT ap.product_type) AS distinct_product_types\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, upt.distinct_product_types\nFROM users u\nJOIN user_product_types upt ON u.id = upt.user_id\nWHERE upt.distinct_product_types > 1\nORDER BY upt.distinct_product_types DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one product-type count per user.\n- The outer query filters users with more than one type and adds names.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Distinct pairs",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, COUNT(*) AS distinct_product_types FROM users u JOIN ( SELECT DISTINCT a.user_id, ap.product_type FROM accounts a JOIN account_products ap ON a.product_id = ap.id ) x ON u.id = x.user_id GROUP BY u.id, u.full_name HAVING COUNT(*) > 1 ORDER BY distinct_product_types DESC, u.id ASC;",
        explanation:
          "## Approach\n\nReduce the data to unique user-product_type pairs, then count those pairs.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(*) AS distinct_product_types\nFROM users u\nJOIN (\n  SELECT DISTINCT a.user_id, ap.product_type\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n) x ON u.id = x.user_id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) > 1\nORDER BY distinct_product_types DESC, u.id ASC;\n```\n\n## Explanation\n\n- The inner query removes duplicate occurrences of the same product type for a user.\n- The outer query counts the remaining unique types.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(DISTINCT ...)` is shorter and clearer.",
      },
    ],
  },
  {
    code: "BANK_080",
    approaches: [
      {
        approach_title: "Pre-aggregate worth",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH account_totals AS ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ), fd_totals AS ( SELECT user_id, SUM(principal_amount) AS total_fd_amount FROM fixed_deposits GROUP BY user_id ), loan_totals AS ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding_loans FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, COALESCE(a.total_deposits, 0) + COALESCE(fd.total_fd_amount, 0) - COALESCE(l.total_outstanding_loans, 0) AS estimated_net_worth FROM users u LEFT JOIN account_totals a ON u.id = a.user_id LEFT JOIN fd_totals fd ON u.id = fd.user_id LEFT JOIN loan_totals l ON u.id = l.user_id ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nPre-aggregate deposits, fixed deposits, and outstanding loans separately, then combine them.\n\n## Query\n\n```sql\nWITH account_totals AS (\n  SELECT user_id, SUM(current_balance) AS total_deposits\n  FROM accounts\n  GROUP BY user_id\n),\nfd_totals AS (\n  SELECT user_id, SUM(principal_amount) AS total_fd_amount\n  FROM fixed_deposits\n  GROUP BY user_id\n),\nloan_totals AS (\n  SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding_loans\n  FROM loans\n  GROUP BY borrower_user_id\n)\nSELECT u.id, u.full_name,\n       COALESCE(a.total_deposits, 0)\n     + COALESCE(fd.total_fd_amount, 0)\n     - COALESCE(l.total_outstanding_loans, 0) AS estimated_net_worth\nFROM users u\nLEFT JOIN account_totals a ON u.id = a.user_id\nLEFT JOIN fd_totals fd ON u.id = fd.user_id\nLEFT JOIN loan_totals l ON u.id = l.user_id\nORDER BY estimated_net_worth DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each asset or liability source is aggregated separately first.\n- `LEFT JOIN` keeps users even when one component is missing.\n- `COALESCE` treats missing totals as zero.\n- Net worth is deposits plus fixed deposits minus outstanding loans.\n\n## Why this is optimal\n\nIt avoids double counting caused by joining raw account, deposit, and loan rows together.",
      },
      {
        approach_title: "Subquery totals",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, COALESCE(a.total_deposits, 0) + COALESCE(fd.total_fd_amount, 0) - COALESCE(l.total_outstanding_loans, 0) AS estimated_net_worth FROM users u LEFT JOIN ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ) a ON u.id = a.user_id LEFT JOIN ( SELECT user_id, SUM(principal_amount) AS total_fd_amount FROM fixed_deposits GROUP BY user_id ) fd ON u.id = fd.user_id LEFT JOIN ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding_loans FROM loans GROUP BY borrower_user_id ) l ON u.id = l.user_id ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse grouped subqueries instead of named CTEs for each component total.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       COALESCE(a.total_deposits, 0)\n     + COALESCE(fd.total_fd_amount, 0)\n     - COALESCE(l.total_outstanding_loans, 0) AS estimated_net_worth\nFROM users u\nLEFT JOIN (\n  SELECT user_id, SUM(current_balance) AS total_deposits\n  FROM accounts\n  GROUP BY user_id\n) a ON u.id = a.user_id\nLEFT JOIN (\n  SELECT user_id, SUM(principal_amount) AS total_fd_amount\n  FROM fixed_deposits\n  GROUP BY user_id\n) fd ON u.id = fd.user_id\nLEFT JOIN (\n  SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding_loans\n  FROM loans\n  GROUP BY borrower_user_id\n) l ON u.id = l.user_id\nORDER BY estimated_net_worth DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each derived table creates one total per user.\n- The outer query combines those totals into estimated net worth.\n\n## Difference from the optimal approach\n\nSame logic, but CTEs are easier to read and maintain.",
      },
      {
        approach_title: "Union movements",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH worth_components AS ( SELECT user_id, SUM(current_balance) AS net_component FROM accounts GROUP BY user_id UNION ALL SELECT user_id, SUM(principal_amount) AS net_component FROM fixed_deposits GROUP BY user_id UNION ALL SELECT borrower_user_id AS user_id, -SUM(outstanding_principal) AS net_component FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, COALESCE(SUM(wc.net_component), 0) AS estimated_net_worth FROM users u LEFT JOIN worth_components wc ON u.id = wc.user_id GROUP BY u.id, u.full_name ORDER BY estimated_net_worth DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nTurn assets and liabilities into one net-worth movement table, then sum those components per user.\n\n## Query\n\n```sql\nWITH worth_components AS (\n  SELECT user_id, SUM(current_balance) AS net_component\n  FROM accounts\n  GROUP BY user_id\n\n  UNION ALL\n\n  SELECT user_id, SUM(principal_amount) AS net_component\n  FROM fixed_deposits\n  GROUP BY user_id\n\n  UNION ALL\n\n  SELECT borrower_user_id AS user_id, -SUM(outstanding_principal) AS net_component\n  FROM loans\n  GROUP BY borrower_user_id\n)\nSELECT u.id, u.full_name, COALESCE(SUM(wc.net_component), 0) AS estimated_net_worth\nFROM users u\nLEFT JOIN worth_components wc ON u.id = wc.user_id\nGROUP BY u.id, u.full_name\nORDER BY estimated_net_worth DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Deposits and fixed deposits are added as positive components.\n- Outstanding loans are added as negative components.\n- Summing all components gives net worth.\n\n## Difference from the optimal approach\n\nFlexible and elegant, but less straightforward than separate labeled aggregates.",
      },
    ],
  },
  {
    code: "BANK_081",
    approaches: [
      {
        approach_title: "Join and avg",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, ROUND(AVG(a.current_balance), 2) AS avg_account_balance FROM branches b JOIN accounts a ON b.id = a.primary_branch_id GROUP BY b.id, b.branch_name ORDER BY avg_account_balance DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nJoin branches to accounts, then average account balances per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, ROUND(AVG(a.current_balance), 2) AS avg_account_balance\nFROM branches b\nJOIN accounts a ON b.id = a.primary_branch_id\nGROUP BY b.id, b.branch_name\nORDER BY avg_account_balance DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The join connects each account to its branch.\n- `AVG(a.current_balance)` calculates the average balance for accounts in each branch.\n- `ROUND(..., 2)` formats the value.\n- `LIMIT 5` keeps only the top 5 branches.\n\n## Why this is optimal\n\nIt directly computes the branch-level average and ranks the result in one query.",
      },
      {
        approach_title: "CTE branch avg",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_avg_balances AS ( SELECT primary_branch_id AS branch_id, ROUND(AVG(current_balance), 2) AS avg_account_balance FROM accounts GROUP BY primary_branch_id ) SELECT b.id, b.branch_name, bab.avg_account_balance FROM branches b JOIN branch_avg_balances bab ON b.id = bab.branch_id ORDER BY bab.avg_account_balance DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute average balance per branch in a CTE, then join to branch details.\n\n## Query\n\n```sql\nWITH branch_avg_balances AS (\n  SELECT primary_branch_id AS branch_id,\n         ROUND(AVG(current_balance), 2) AS avg_account_balance\n  FROM accounts\n  GROUP BY primary_branch_id\n)\nSELECT b.id, b.branch_name, bab.avg_account_balance\nFROM branches b\nJOIN branch_avg_balances bab ON b.id = bab.branch_id\nORDER BY bab.avg_account_balance DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one average-balance row per branch id.\n- The outer query adds branch names and ranking.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.id, b.branch_name, x.avg_account_balance FROM branches b JOIN ( SELECT primary_branch_id AS branch_id, ROUND(AVG(current_balance), 2) AS avg_account_balance FROM accounts GROUP BY primary_branch_id ) x ON b.id = x.branch_id ORDER BY x.avg_account_balance DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nAggregate average balances in a subquery, then join to branches.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, x.avg_account_balance\nFROM branches b\nJOIN (\n  SELECT primary_branch_id AS branch_id,\n         ROUND(AVG(current_balance), 2) AS avg_account_balance\n  FROM accounts\n  GROUP BY primary_branch_id\n) x ON b.id = x.branch_id\nORDER BY x.avg_account_balance DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query computes one average per branch id.\n- The outer query attaches branch names and sorts the result.\n\n## Difference from the optimal approach\n\nValid, but the direct grouped join is simpler.",
      },
    ],
  },
  {
    code: "BANK_082",
    approaches: [
      {
        approach_title: "Case counts",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count, SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) > SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) ORDER BY failed_txn_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to transactions and compute failed and posted counts side by side.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count,\n       SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nGROUP BY u.id, u.full_name\nHAVING SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END)\n     > SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END)\nORDER BY failed_txn_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The joins connect users to all account transactions.\n- One `CASE` counts failed transactions.\n- Another `CASE` counts posted transactions.\n- `HAVING` keeps only users whose failed count is larger.\n\n## Why this is optimal\n\nIt directly compares two conditional counts in one grouped query.",
      },
      {
        approach_title: "CTE status counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_status_counts AS ( SELECT a.user_id, SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count, SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id GROUP BY a.user_id ) SELECT u.id, u.full_name, usc.failed_txn_count, usc.posted_txn_count FROM users u JOIN user_status_counts usc ON u.id = usc.user_id WHERE usc.failed_txn_count > usc.posted_txn_count ORDER BY usc.failed_txn_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nPrecompute failed and posted counts per user in a CTE, then compare them outside.\n\n## Query\n\n```sql\nWITH user_status_counts AS (\n  SELECT a.user_id,\n         SUM(CASE WHEN t.transaction_status = 'failed' THEN 1 ELSE 0 END) AS failed_txn_count,\n         SUM(CASE WHEN t.transaction_status = 'posted' THEN 1 ELSE 0 END) AS posted_txn_count\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  GROUP BY a.user_id\n)\nSELECT u.id, u.full_name, usc.failed_txn_count, usc.posted_txn_count\nFROM users u\nJOIN user_status_counts usc ON u.id = usc.user_id\nWHERE usc.failed_txn_count > usc.posted_txn_count\nORDER BY usc.failed_txn_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one status-summary row per user.\n- The outer query filters users where failed count is higher.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Filter counts",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE t.transaction_status = 'failed') AS failed_txn_count, COUNT(*) FILTER (WHERE t.transaction_status = 'posted') AS posted_txn_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE t.transaction_status = 'failed') > COUNT(*) FILTER (WHERE t.transaction_status = 'posted') ORDER BY failed_txn_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `FILTER` to count failed and posted rows separately.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       COUNT(*) FILTER (WHERE t.transaction_status = 'failed') AS failed_txn_count,\n       COUNT(*) FILTER (WHERE t.transaction_status = 'posted') AS posted_txn_count\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) FILTER (WHERE t.transaction_status = 'failed')\n     > COUNT(*) FILTER (WHERE t.transaction_status = 'posted')\nORDER BY failed_txn_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- `FILTER` counts rows for each status directly inside the aggregate.\n- The grouped comparison is still done in `HAVING`.\n\n## Difference from the optimal approach\n\nCompact and elegant, but `CASE` is often easier for learners to generalize.",
      },
    ],
  },
  {
    code: "BANK_083",
    approaches: [
      {
        approach_title: "CTE compare rates",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH product_approval_rates AS ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ) SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM product_approval_rates WHERE approval_rate > (SELECT AVG(approval_rate) FROM product_approval_rates) ORDER BY approval_rate DESC, id ASC;",
        explanation:
          "## Approach\n\nFirst compute approval rate for each loan product, then compare each one against the average of all product approval rates.\n\n## Query\n\n```sql\nWITH product_approval_rates AS (\n  SELECT lp.id, lp.product_name,\n         100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate\n  FROM loan_products lp\n  JOIN loan_applications la ON lp.id = la.loan_product_id\n  GROUP BY lp.id, lp.product_name\n)\nSELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate\nFROM product_approval_rates\nWHERE approval_rate > (\n  SELECT AVG(approval_rate)\n  FROM product_approval_rates\n)\nORDER BY approval_rate DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE creates one approval rate per product.\n- The subquery computes the average of those product-level rates.\n- The outer query keeps only products above that average.\n\n## Why this is optimal\n\nIt avoids repeating the approval-rate calculation and mirrors the question logic exactly.",
      },
      {
        approach_title: "Subquery compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ) par WHERE approval_rate > ( SELECT AVG(approval_rate) FROM ( SELECT lp.id, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id ) x ) ORDER BY approval_rate DESC, id ASC;",
        explanation:
          "## Approach\n\nUse nested subqueries instead of a named CTE.\n\n## Query\n\n```sql\nSELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate\nFROM (\n  SELECT lp.id, lp.product_name,\n         100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate\n  FROM loan_products lp\n  JOIN loan_applications la ON lp.id = la.loan_product_id\n  GROUP BY lp.id, lp.product_name\n) par\nWHERE approval_rate > (\n  SELECT AVG(approval_rate)\n  FROM (\n    SELECT lp.id,\n           100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate\n    FROM loan_products lp\n    JOIN loan_applications la ON lp.id = la.loan_product_id\n    GROUP BY lp.id\n  ) x\n)\nORDER BY approval_rate DESC, id ASC;\n```\n\n## Explanation\n\n- One nested query computes the product approval rates.\n- Another nested query computes the average of those rates.\n- The outer query filters to products above the average.\n\n## Difference from the optimal approach\n\nIt works, but repeats logic and is harder to read.",
      },
      {
        approach_title: "Window average",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH product_approval_rates AS ( SELECT lp.id, lp.product_name, 100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate FROM loan_products lp JOIN loan_applications la ON lp.id = la.loan_product_id GROUP BY lp.id, lp.product_name ), rated AS ( SELECT id, product_name, approval_rate, AVG(approval_rate) OVER () AS avg_approval_rate FROM product_approval_rates ) SELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate FROM rated WHERE approval_rate > avg_approval_rate ORDER BY approval_rate DESC, id ASC;",
        explanation:
          "## Approach\n\nCompute each product's approval rate, then attach the overall average using a window function.\n\n## Query\n\n```sql\nWITH product_approval_rates AS (\n  SELECT lp.id, lp.product_name,\n         100.0 * SUM(CASE WHEN la.application_status = 'approved' THEN 1 ELSE 0 END) / COUNT(*) AS approval_rate\n  FROM loan_products lp\n  JOIN loan_applications la ON lp.id = la.loan_product_id\n  GROUP BY lp.id, lp.product_name\n),\nrated AS (\n  SELECT id, product_name, approval_rate,\n         AVG(approval_rate) OVER () AS avg_approval_rate\n  FROM product_approval_rates\n)\nSELECT id, product_name, ROUND(approval_rate, 2) AS approval_rate\nFROM rated\nWHERE approval_rate > avg_approval_rate\nORDER BY approval_rate DESC, id ASC;\n```\n\n## Explanation\n\n- The first CTE computes approval rates per product.\n- The second CTE adds the same overall average to every row.\n- The final query keeps only products above that benchmark.\n\n## Difference from the optimal approach\n\nElegant, but introduces window functions when a scalar comparison is simpler.",
      },
    ],
  },
  {
    code: "BANK_084",
    approaches: [
      {
        approach_title: "Distinct merchants",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(DISTINCT ct.merchant_name) AS distinct_merchant_count FROM users u JOIN accounts a ON u.id = a.user_id JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to settled card transactions and count distinct merchant names per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(DISTINCT ct.merchant_name) AS distinct_merchant_count\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN cards c ON a.id = c.account_id\nJOIN card_transactions ct ON c.id = ct.card_id\nWHERE ct.transaction_status = 'settled'\n  AND ct.merchant_name IS NOT NULL\nGROUP BY u.id, u.full_name\nORDER BY distinct_merchant_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The joins trace card transactions back to the owning user.\n- The filter keeps only settled transactions and non-NULL merchants.\n- `COUNT(DISTINCT ct.merchant_name)` measures merchant diversity per user.\n\n## Why this is optimal\n\nThe distinct count matches the question exactly and avoids duplicate merchants.",
      },
      {
        approach_title: "CTE merchant pairs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_merchants AS ( SELECT DISTINCT a.user_id, ct.merchant_name FROM accounts a JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL ) SELECT u.id, u.full_name, COUNT(*) AS distinct_merchant_count FROM users u JOIN user_merchants um ON u.id = um.user_id GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nReduce the data to unique user-merchant pairs first, then count those pairs per user.\n\n## Query\n\n```sql\nWITH user_merchants AS (\n  SELECT DISTINCT a.user_id, ct.merchant_name\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status = 'settled'\n    AND ct.merchant_name IS NOT NULL\n)\nSELECT u.id, u.full_name, COUNT(*) AS distinct_merchant_count\nFROM users u\nJOIN user_merchants um ON u.id = um.user_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_merchant_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE removes duplicate visits to the same merchant by the same user.\n- The outer query counts unique merchants per user.\n\n## Difference from the optimal approach\n\nMore explicit about de-duplication, but longer.",
      },
      {
        approach_title: "Subquery merchants",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, COUNT(*) AS distinct_merchant_count FROM users u JOIN ( SELECT DISTINCT a.user_id, ct.merchant_name FROM accounts a JOIN cards c ON a.id = c.account_id JOIN card_transactions ct ON c.id = ct.card_id WHERE ct.transaction_status = 'settled' AND ct.merchant_name IS NOT NULL ) m ON u.id = m.user_id GROUP BY u.id, u.full_name ORDER BY distinct_merchant_count DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table of distinct user-merchant pairs, then count them by user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(*) AS distinct_merchant_count\nFROM users u\nJOIN (\n  SELECT DISTINCT a.user_id, ct.merchant_name\n  FROM accounts a\n  JOIN cards c ON a.id = c.account_id\n  JOIN card_transactions ct ON c.id = ct.card_id\n  WHERE ct.transaction_status = 'settled'\n    AND ct.merchant_name IS NOT NULL\n) m ON u.id = m.user_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_merchant_count DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query keeps each user-merchant combination once.\n- The outer query counts how many distinct merchants each user has.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(DISTINCT ...)` is shorter.",
      },
    ],
  },
  {
    code: "BANK_085",
    approaches: [
      {
        approach_title: "CTE inflow outflow",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH outgoing_transfers AS ( SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id ), incoming_transfers AS ( SELECT to_account_id AS account_id, SUM(amount) AS total_incoming FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) SELECT a.id, a.account_number, COALESCE(o.total_outgoing, 0) AS total_outgoing, COALESCE(i.total_incoming, 0) AS total_incoming FROM accounts a LEFT JOIN outgoing_transfers o ON a.id = o.account_id LEFT JOIN incoming_transfers i ON a.id = i.account_id WHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0) ORDER BY total_outgoing DESC, a.id ASC;",
        explanation:
          "## Approach\n\nAggregate completed outgoing and incoming transfers separately, then compare both totals per account.\n\n## Query\n\n```sql\nWITH outgoing_transfers AS (\n  SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing\n  FROM transfers\n  WHERE transfer_status = 'completed'\n  GROUP BY from_account_id\n),\nincoming_transfers AS (\n  SELECT to_account_id AS account_id, SUM(amount) AS total_incoming\n  FROM transfers\n  WHERE transfer_status = 'completed'\n    AND to_account_id IS NOT NULL\n  GROUP BY to_account_id\n)\nSELECT a.id, a.account_number,\n       COALESCE(o.total_outgoing, 0) AS total_outgoing,\n       COALESCE(i.total_incoming, 0) AS total_incoming\nFROM accounts a\nLEFT JOIN outgoing_transfers o ON a.id = o.account_id\nLEFT JOIN incoming_transfers i ON a.id = i.account_id\nWHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0)\nORDER BY total_outgoing DESC, a.id ASC;\n```\n\n## Explanation\n\n- One CTE computes outgoing totals using `from_account_id`.\n- Another computes incoming totals using `to_account_id`.\n- `COALESCE` treats missing totals as zero.\n- The final comparison keeps accounts where outflow exceeds inflow.\n\n## Why this is optimal\n\nIt avoids row multiplication and makes the two-sided comparison clear.",
      },
      {
        approach_title: "Subquery totals",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT a.id, a.account_number, COALESCE(o.total_outgoing, 0) AS total_outgoing, COALESCE(i.total_incoming, 0) AS total_incoming FROM accounts a LEFT JOIN ( SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id ) o ON a.id = o.account_id LEFT JOIN ( SELECT to_account_id AS account_id, SUM(amount) AS total_incoming FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) i ON a.id = i.account_id WHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0) ORDER BY total_outgoing DESC, a.id ASC;",
        explanation:
          "## Approach\n\nUse grouped subqueries for outgoing and incoming totals instead of named CTEs.\n\n## Query\n\n```sql\nSELECT a.id, a.account_number,\n       COALESCE(o.total_outgoing, 0) AS total_outgoing,\n       COALESCE(i.total_incoming, 0) AS total_incoming\nFROM accounts a\nLEFT JOIN (\n  SELECT from_account_id AS account_id, SUM(amount) AS total_outgoing\n  FROM transfers\n  WHERE transfer_status = 'completed'\n  GROUP BY from_account_id\n) o ON a.id = o.account_id\nLEFT JOIN (\n  SELECT to_account_id AS account_id, SUM(amount) AS total_incoming\n  FROM transfers\n  WHERE transfer_status = 'completed'\n    AND to_account_id IS NOT NULL\n  GROUP BY to_account_id\n) i ON a.id = i.account_id\nWHERE COALESCE(o.total_outgoing, 0) > COALESCE(i.total_incoming, 0)\nORDER BY total_outgoing DESC, a.id ASC;\n```\n\n## Explanation\n\n- Each subquery builds one total per account side.\n- The outer query joins them to accounts and compares the totals.\n\n## Difference from the optimal approach\n\nSame logic, but CTEs are easier to read.",
      },
      {
        approach_title: "Union net flow",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH transfer_flows AS ( SELECT from_account_id AS account_id, SUM(amount) AS out_amt, 0::numeric AS in_amt FROM transfers WHERE transfer_status = 'completed' GROUP BY from_account_id UNION ALL SELECT to_account_id AS account_id, 0::numeric AS out_amt, SUM(amount) AS in_amt FROM transfers WHERE transfer_status = 'completed' AND to_account_id IS NOT NULL GROUP BY to_account_id ) SELECT a.id, a.account_number, SUM(tf.out_amt) AS total_outgoing, SUM(tf.in_amt) AS total_incoming FROM accounts a JOIN transfer_flows tf ON a.id = tf.account_id GROUP BY a.id, a.account_number HAVING SUM(tf.out_amt) > SUM(tf.in_amt) ORDER BY total_outgoing DESC, a.id ASC;",
        explanation:
          "## Approach\n\nTurn outgoing and incoming totals into one combined flow dataset, then summarize it per account.\n\n## Query\n\n```sql\nWITH transfer_flows AS (\n  SELECT from_account_id AS account_id, SUM(amount) AS out_amt, 0::numeric AS in_amt\n  FROM transfers\n  WHERE transfer_status = 'completed'\n  GROUP BY from_account_id\n\n  UNION ALL\n\n  SELECT to_account_id AS account_id, 0::numeric AS out_amt, SUM(amount) AS in_amt\n  FROM transfers\n  WHERE transfer_status = 'completed'\n    AND to_account_id IS NOT NULL\n  GROUP BY to_account_id\n)\nSELECT a.id, a.account_number,\n       SUM(tf.out_amt) AS total_outgoing,\n       SUM(tf.in_amt) AS total_incoming\nFROM accounts a\nJOIN transfer_flows tf ON a.id = tf.account_id\nGROUP BY a.id, a.account_number\nHAVING SUM(tf.out_amt) > SUM(tf.in_amt)\nORDER BY total_outgoing DESC, a.id ASC;\n```\n\n## Explanation\n\n- Outgoing and incoming totals are reshaped into one unioned dataset.\n- The outer query sums both measures per account.\n- `HAVING` keeps only accounts whose outgoing total is larger.\n\n## Difference from the optimal approach\n\nFlexible, but less straightforward than separate aggregates.",
      },
    ],
  },
  {
    code: "BANK_086",
    approaches: [
      {
        approach_title: "Distinct biller cats",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(DISTINCT b.biller_category) AS distinct_biller_categories FROM users u JOIN accounts a ON u.id = a.user_id JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nJoin users to paid bill payments and count distinct biller categories per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(DISTINCT b.biller_category) AS distinct_biller_categories\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN bill_payments bp ON a.id = bp.account_id\nJOIN billers b ON bp.biller_id = b.id\nWHERE bp.payment_status = 'paid'\nGROUP BY u.id, u.full_name\nORDER BY distinct_biller_categories DESC, u.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The joins connect users to the categories of billers they paid.\n- The filter keeps only paid bill payments.\n- `COUNT(DISTINCT b.biller_category)` measures category variety per user.\n\n## Why this is optimal\n\nThe distinct count matches the question exactly and avoids duplicate categories.",
      },
      {
        approach_title: "CTE category pairs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_biller_categories AS ( SELECT DISTINCT a.user_id, b.biller_category FROM accounts a JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' ) SELECT u.id, u.full_name, COUNT(*) AS distinct_biller_categories FROM users u JOIN user_biller_categories ubc ON u.id = ubc.user_id GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nReduce the data to unique user-category pairs, then count them per user.\n\n## Query\n\n```sql\nWITH user_biller_categories AS (\n  SELECT DISTINCT a.user_id, b.biller_category\n  FROM accounts a\n  JOIN bill_payments bp ON a.id = bp.account_id\n  JOIN billers b ON bp.biller_id = b.id\n  WHERE bp.payment_status = 'paid'\n)\nSELECT u.id, u.full_name, COUNT(*) AS distinct_biller_categories\nFROM users u\nJOIN user_biller_categories ubc ON u.id = ubc.user_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_biller_categories DESC, u.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE removes duplicate category usage by the same user.\n- The outer query counts the remaining unique categories.\n\n## Difference from the optimal approach\n\nMore explicit about de-duplication, but longer.",
      },
      {
        approach_title: "Subquery categories",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, COUNT(*) AS distinct_biller_categories FROM users u JOIN ( SELECT DISTINCT a.user_id, b.biller_category FROM accounts a JOIN bill_payments bp ON a.id = bp.account_id JOIN billers b ON bp.biller_id = b.id WHERE bp.payment_status = 'paid' ) x ON u.id = x.user_id GROUP BY u.id, u.full_name ORDER BY distinct_biller_categories DESC, u.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nUse a derived table of distinct user-category pairs, then count them.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(*) AS distinct_biller_categories\nFROM users u\nJOIN (\n  SELECT DISTINCT a.user_id, b.biller_category\n  FROM accounts a\n  JOIN bill_payments bp ON a.id = bp.account_id\n  JOIN billers b ON bp.biller_id = b.id\n  WHERE bp.payment_status = 'paid'\n) x ON u.id = x.user_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_biller_categories DESC, u.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query keeps each user-category combination once.\n- The outer query counts how many categories each user has paid across.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(DISTINCT ...)` is shorter and clearer.",
      },
    ],
  },
  {
    code: "BANK_087",
    approaches: [
      {
        approach_title: "Lag consecutive",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH repayment_flags AS ( SELECT l.borrower_user_id AS user_id, lr.loan_id, lr.installment_number, lr.repayment_status, LAG(lr.repayment_status) OVER (PARTITION BY lr.loan_id ORDER BY lr.installment_number) AS prev_status FROM loan_repayments lr JOIN loans l ON lr.loan_id = l.id ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN repayment_flags rf ON u.id = rf.user_id WHERE rf.repayment_status = 'late' AND rf.prev_status = 'late' ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse `LAG` to compare each repayment with the previous repayment on the same loan.\n\n## Query\n\n```sql\nWITH repayment_flags AS (\n  SELECT l.borrower_user_id AS user_id,\n         lr.loan_id,\n         lr.installment_number,\n         lr.repayment_status,\n         LAG(lr.repayment_status) OVER (\n           PARTITION BY lr.loan_id\n           ORDER BY lr.installment_number\n         ) AS prev_status\n  FROM loan_repayments lr\n  JOIN loans l ON lr.loan_id = l.id\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN repayment_flags rf ON u.id = rf.user_id\nWHERE rf.repayment_status = 'late'\n  AND rf.prev_status = 'late'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `LAG` looks at the repayment status of the previous installment in the same loan.\n- A row qualifies when both current and previous statuses are `late`.\n- `DISTINCT` ensures each user appears once.\n\n## Why this is optimal\n\nIt directly models the idea of consecutive late repayments in ordered installment data.",
      },
      {
        approach_title: "Self join repayments",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN loans l ON u.id = l.borrower_user_id JOIN loan_repayments lr1 ON l.id = lr1.loan_id JOIN loan_repayments lr2 ON l.id = lr2.loan_id AND lr2.installment_number = lr1.installment_number - 1 WHERE lr1.repayment_status = 'late' AND lr2.repayment_status = 'late' ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nSelf join the repayment table to compare each installment with the immediately previous one.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN loans l ON u.id = l.borrower_user_id\nJOIN loan_repayments lr1 ON l.id = lr1.loan_id\nJOIN loan_repayments lr2\n  ON l.id = lr2.loan_id\n AND lr2.installment_number = lr1.installment_number - 1\nWHERE lr1.repayment_status = 'late'\n  AND lr2.repayment_status = 'late'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `lr1` represents a repayment row.\n- `lr2` is the immediately previous installment on the same loan.\n- If both are late, the user qualifies.\n\n## Difference from the optimal approach\n\nWorks well, but window functions express the sequence logic more cleanly.",
      },
      {
        approach_title: "CTE late pairs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH late_repayments AS ( SELECT l.borrower_user_id AS user_id, lr.loan_id, lr.installment_number FROM loan_repayments lr JOIN loans l ON lr.loan_id = l.id WHERE lr.repayment_status = 'late' ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN late_repayments r1 ON u.id = r1.user_id JOIN late_repayments r2 ON r1.loan_id = r2.loan_id AND r2.installment_number = r1.installment_number - 1 ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nFilter to late repayments first, then self join only those rows to find consecutive installments.\n\n## Query\n\n```sql\nWITH late_repayments AS (\n  SELECT l.borrower_user_id AS user_id, lr.loan_id, lr.installment_number\n  FROM loan_repayments lr\n  JOIN loans l ON lr.loan_id = l.id\n  WHERE lr.repayment_status = 'late'\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN late_repayments r1 ON u.id = r1.user_id\nJOIN late_repayments r2\n  ON r1.loan_id = r2.loan_id\n AND r2.installment_number = r1.installment_number - 1\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE reduces the dataset to only late repayment rows.\n- The self join then checks whether the previous installment is also late.\n\n## Difference from the optimal approach\n\nClear two-step logic, but more verbose than `LAG`.",
      },
    ],
  },
  {
    code: "BANK_088",
    approaches: [
      {
        approach_title: "CTE redemption rate",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH earned AS ( SELECT user_id, SUM(points_earned) AS total_points_earned FROM reward_earnings GROUP BY user_id ), redeemed AS ( SELECT user_id, SUM(points_redeemed) AS total_points_redeemed FROM reward_redemptions GROUP BY user_id ) SELECT u.id, u.full_name, ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN earned e ON u.id = e.user_id LEFT JOIN redeemed r ON u.id = r.user_id WHERE e.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate earned and redeemed points separately, then compute redemption rate per user.\n\n## Query\n\n```sql\nWITH earned AS (\n  SELECT user_id, SUM(points_earned) AS total_points_earned\n  FROM reward_earnings\n  GROUP BY user_id\n),\nredeemed AS (\n  SELECT user_id, SUM(points_redeemed) AS total_points_redeemed\n  FROM reward_redemptions\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name,\n       ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate\nFROM users u\nJOIN earned e ON u.id = e.user_id\nLEFT JOIN redeemed r ON u.id = r.user_id\nWHERE e.total_points_earned > 0\nORDER BY redemption_rate DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- One CTE computes earned points per user.\n- Another computes redeemed points per user.\n- `NULLIF` prevents division by zero.\n- `COALESCE` treats missing redemptions as zero.\n\n## Why this is optimal\n\nIt avoids double counting from raw joins and cleanly computes the ratio.",
      },
      {
        approach_title: "Subquery rate",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN ( SELECT user_id, SUM(points_earned) AS total_points_earned FROM reward_earnings GROUP BY user_id ) e ON u.id = e.user_id LEFT JOIN ( SELECT user_id, SUM(points_redeemed) AS total_points_redeemed FROM reward_redemptions GROUP BY user_id ) r ON u.id = r.user_id WHERE e.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse grouped subqueries for earned and redeemed totals instead of CTEs.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       ROUND(100.0 * COALESCE(r.total_points_redeemed, 0) / NULLIF(e.total_points_earned, 0), 2) AS redemption_rate\nFROM users u\nJOIN (\n  SELECT user_id, SUM(points_earned) AS total_points_earned\n  FROM reward_earnings\n  GROUP BY user_id\n) e ON u.id = e.user_id\nLEFT JOIN (\n  SELECT user_id, SUM(points_redeemed) AS total_points_redeemed\n  FROM reward_redemptions\n  GROUP BY user_id\n) r ON u.id = r.user_id\nWHERE e.total_points_earned > 0\nORDER BY redemption_rate DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each subquery creates one total per user.\n- The outer query calculates the ratio and ranks users.\n\n## Difference from the optimal approach\n\nSame logic, but CTEs are easier to read.",
      },
      {
        approach_title: "Union points",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH point_flows AS ( SELECT user_id, SUM(points_earned) AS earned_points, 0::numeric AS redeemed_points FROM reward_earnings GROUP BY user_id UNION ALL SELECT user_id, 0::numeric AS earned_points, SUM(points_redeemed) AS redeemed_points FROM reward_redemptions GROUP BY user_id ), user_point_totals AS ( SELECT user_id, SUM(earned_points) AS total_points_earned, SUM(redeemed_points) AS total_points_redeemed FROM point_flows GROUP BY user_id ) SELECT u.id, u.full_name, ROUND(100.0 * total_points_redeemed / NULLIF(total_points_earned, 0), 2) AS redemption_rate FROM users u JOIN user_point_totals upt ON u.id = upt.user_id WHERE upt.total_points_earned > 0 ORDER BY redemption_rate DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nConvert earning and redemption events into one combined point-flow dataset, then summarize it.\n\n## Query\n\n```sql\nWITH point_flows AS (\n  SELECT user_id, SUM(points_earned) AS earned_points, 0::numeric AS redeemed_points\n  FROM reward_earnings\n  GROUP BY user_id\n\n  UNION ALL\n\n  SELECT user_id, 0::numeric AS earned_points, SUM(points_redeemed) AS redeemed_points\n  FROM reward_redemptions\n  GROUP BY user_id\n),\nuser_point_totals AS (\n  SELECT user_id,\n         SUM(earned_points) AS total_points_earned,\n         SUM(redeemed_points) AS total_points_redeemed\n  FROM point_flows\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name,\n       ROUND(100.0 * total_points_redeemed / NULLIF(total_points_earned, 0), 2) AS redemption_rate\nFROM users u\nJOIN user_point_totals upt ON u.id = upt.user_id\nWHERE upt.total_points_earned > 0\nORDER BY redemption_rate DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Earned and redeemed points are reshaped into one movement table.\n- The second CTE summarizes both totals per user.\n- The outer query computes the redemption percentage.\n\n## Difference from the optimal approach\n\nFlexible, but less straightforward than separate aggregates.",
      },
    ],
  },
  {
    code: "BANK_089",
    approaches: [
      {
        approach_title: "CTE branch rate",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH branch_failure_rates AS ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ) SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM branch_failure_rates WHERE failure_rate > (SELECT AVG(failure_rate) FROM branch_failure_rates) ORDER BY failure_rate DESC, id ASC;",
        explanation:
          "## Approach\n\nCompute ATM failure rate per branch first, then compare each branch against the average branch failure rate.\n\n## Query\n\n```sql\nWITH branch_failure_rates AS (\n  SELECT b.id, b.branch_name,\n         100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate\n  FROM branches b\n  JOIN atm_machines am ON b.id = am.branch_id\n  JOIN atm_transactions at ON am.id = at.atm_id\n  GROUP BY b.id, b.branch_name\n)\nSELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate\nFROM branch_failure_rates\nWHERE failure_rate > (\n  SELECT AVG(failure_rate)\n  FROM branch_failure_rates\n)\nORDER BY failure_rate DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE creates one ATM failure rate per branch.\n- Failed ATM transactions contribute `1`; all ATM transactions contribute to the denominator.\n- The outer query keeps only branches above the average branch failure rate.\n\n## Why this is optimal\n\nIt avoids recalculating the rate and makes the benchmark comparison very clear.",
      },
      {
        approach_title: "Subquery rates",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ) r WHERE failure_rate > ( SELECT AVG(failure_rate) FROM ( SELECT b.id, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id ) x ) ORDER BY failure_rate DESC, id ASC;",
        explanation:
          "## Approach\n\nUse nested subqueries instead of a named CTE for branch failure rates.\n\n## Query\n\n```sql\nSELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate\nFROM (\n  SELECT b.id, b.branch_name,\n         100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate\n  FROM branches b\n  JOIN atm_machines am ON b.id = am.branch_id\n  JOIN atm_transactions at ON am.id = at.atm_id\n  GROUP BY b.id, b.branch_name\n) r\nWHERE failure_rate > (\n  SELECT AVG(failure_rate)\n  FROM (\n    SELECT b.id,\n           100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate\n    FROM branches b\n    JOIN atm_machines am ON b.id = am.branch_id\n    JOIN atm_transactions at ON am.id = at.atm_id\n    GROUP BY b.id\n  ) x\n)\nORDER BY failure_rate DESC, id ASC;\n```\n\n## Explanation\n\n- One derived table computes branch failure rates.\n- Another derived table computes the average of those rates.\n- The outer query filters branches above that average.\n\n## Difference from the optimal approach\n\nWorks, but repeats logic and is harder to read.",
      },
      {
        approach_title: "Window average",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH branch_failure_rates AS ( SELECT b.id, b.branch_name, 100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate FROM branches b JOIN atm_machines am ON b.id = am.branch_id JOIN atm_transactions at ON am.id = at.atm_id GROUP BY b.id, b.branch_name ), rated AS ( SELECT id, branch_name, failure_rate, AVG(failure_rate) OVER () AS avg_failure_rate FROM branch_failure_rates ) SELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate FROM rated WHERE failure_rate > avg_failure_rate ORDER BY failure_rate DESC, id ASC;",
        explanation:
          "## Approach\n\nAttach the overall average branch failure rate to every branch using a window function.\n\n## Query\n\n```sql\nWITH branch_failure_rates AS (\n  SELECT b.id, b.branch_name,\n         100.0 * SUM(CASE WHEN at.transaction_status = 'failed' THEN 1 ELSE 0 END) / COUNT(*) AS failure_rate\n  FROM branches b\n  JOIN atm_machines am ON b.id = am.branch_id\n  JOIN atm_transactions at ON am.id = at.atm_id\n  GROUP BY b.id, b.branch_name\n),\nrated AS (\n  SELECT id, branch_name, failure_rate,\n         AVG(failure_rate) OVER () AS avg_failure_rate\n  FROM branch_failure_rates\n)\nSELECT id, branch_name, ROUND(failure_rate, 2) AS failure_rate\nFROM rated\nWHERE failure_rate > avg_failure_rate\nORDER BY failure_rate DESC, id ASC;\n```\n\n## Explanation\n\n- The first CTE computes one failure rate per branch.\n- The second CTE adds the overall average to each row.\n- The final query keeps branches above that average.\n\n## Difference from the optimal approach\n\nElegant, but more advanced than needed for this comparison.",
      },
    ],
  },
  {
    code: "BANK_090",
    approaches: [
      {
        approach_title: "CTE branch compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH user_branch_balances AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), branch_avg_balances AS ( SELECT branch_id, AVG(total_balance) AS avg_branch_balance FROM user_branch_balances GROUP BY branch_id ) SELECT u.id, u.full_name, ub.branch_id, ub.total_balance FROM users u JOIN user_branch_balances ub ON u.id = ub.user_id JOIN branch_avg_balances bb ON ub.branch_id = bb.branch_id WHERE ub.total_balance > bb.avg_branch_balance ORDER BY ub.total_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst compute each user's total balance within a branch, then compare it against the average user balance in that branch.\n\n## Query\n\n```sql\nWITH user_branch_balances AS (\n  SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance\n  FROM accounts a\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id, a.user_id\n),\nbranch_avg_balances AS (\n  SELECT branch_id, AVG(total_balance) AS avg_branch_balance\n  FROM user_branch_balances\n  GROUP BY branch_id\n)\nSELECT u.id, u.full_name, ub.branch_id, ub.total_balance\nFROM users u\nJOIN user_branch_balances ub ON u.id = ub.user_id\nJOIN branch_avg_balances bb ON ub.branch_id = bb.branch_id\nWHERE ub.total_balance > bb.avg_branch_balance\nORDER BY ub.total_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE builds one total balance per user within each branch.\n- The second CTE computes the average of those user totals for each branch.\n- The outer query keeps users whose balance exceeds their branch average.\n\n## Why this is optimal\n\nIt correctly compares each user to the branch-level benchmark without double counting.",
      },
      {
        approach_title: "Subquery branch avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, ub.branch_id, ub.total_balance FROM users u JOIN ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) ub ON u.id = ub.user_id JOIN ( SELECT branch_id, AVG(total_balance) AS avg_branch_balance FROM ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) x GROUP BY branch_id ) bb ON ub.branch_id = bb.branch_id WHERE ub.total_balance > bb.avg_branch_balance ORDER BY ub.total_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse nested subqueries instead of named CTEs.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, ub.branch_id, ub.total_balance\nFROM users u\nJOIN (\n  SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance\n  FROM accounts a\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id, a.user_id\n) ub ON u.id = ub.user_id\nJOIN (\n  SELECT branch_id, AVG(total_balance) AS avg_branch_balance\n  FROM (\n    SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance\n    FROM accounts a\n    WHERE a.primary_branch_id IS NOT NULL\n    GROUP BY a.primary_branch_id, a.user_id\n  ) x\n  GROUP BY branch_id\n) bb ON ub.branch_id = bb.branch_id\nWHERE ub.total_balance > bb.avg_branch_balance\nORDER BY ub.total_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- One subquery computes user totals per branch.\n- Another computes branch averages from those totals.\n- The outer query compares the two.\n\n## Difference from the optimal approach\n\nIt works, but repeats grouped logic and is harder to read.",
      },
      {
        approach_title: "Window branch avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_branch_balances AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance FROM accounts a WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), rated AS ( SELECT branch_id, user_id, total_balance, AVG(total_balance) OVER (PARTITION BY branch_id) AS avg_branch_balance FROM user_branch_balances ) SELECT u.id, u.full_name, r.branch_id, r.total_balance FROM users u JOIN rated r ON u.id = r.user_id WHERE r.total_balance > r.avg_branch_balance ORDER BY r.total_balance DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute user totals per branch, then use a window function to attach the average balance of that branch to every user row.\n\n## Query\n\n```sql\nWITH user_branch_balances AS (\n  SELECT a.primary_branch_id AS branch_id, a.user_id, SUM(a.current_balance) AS total_balance\n  FROM accounts a\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id, a.user_id\n),\nrated AS (\n  SELECT branch_id, user_id, total_balance,\n         AVG(total_balance) OVER (PARTITION BY branch_id) AS avg_branch_balance\n  FROM user_branch_balances\n)\nSELECT u.id, u.full_name, r.branch_id, r.total_balance\nFROM users u\nJOIN rated r ON u.id = r.user_id\nWHERE r.total_balance > r.avg_branch_balance\nORDER BY r.total_balance DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE creates one total balance per user per branch.\n- The window function computes the branch average for each row.\n- The final query filters users above their branch average.\n\n## Difference from the optimal approach\n\nElegant, but slightly more advanced than needed for this problem.",
      },
    ],
  },
  {
    code: "BANK_091",
    approaches: [
      {
        approach_title: "Month rank",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, DENSE_RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk FROM monthly_user_cashflow ) ranked WHERE rnk <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;",
        explanation:
          "## Approach\n\nFirst calculate each user's monthly net cashflow, then rank users within each month.\n\n## Query\n\n```sql\nWITH monthly_user_cashflow AS (\n  SELECT a.user_id,\n         DATE_TRUNC('month', t.posted_at) AS txn_month,\n         SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_status = 'posted'\n    AND t.posted_at IS NOT NULL\n  GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at)\n)\nSELECT user_id, txn_month, net_cashflow\nFROM (\n  SELECT user_id, txn_month, net_cashflow,\n         DENSE_RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk\n  FROM monthly_user_cashflow\n) ranked\nWHERE rnk <= 5\nORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE builds one monthly net cashflow row per user.\n- Credits are added and debits are subtracted.\n- `DENSE_RANK()` ranks users inside each month.\n- Keeping `rnk <= 5` returns the top 5 monthly cashflow users.\n\n## Why this is optimal\n\nThis is the clearest way to solve a per-month top-N problem without losing ties.",
      },
      {
        approach_title: "Row number rank",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, ROW_NUMBER() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC, user_id ASC) AS rn FROM monthly_user_cashflow ) ranked WHERE rn <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute monthly net cashflow, then assign a strict row number within each month.\n\n## Query\n\n```sql\nWITH monthly_user_cashflow AS (\n  SELECT a.user_id,\n         DATE_TRUNC('month', t.posted_at) AS txn_month,\n         SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_status = 'posted'\n    AND t.posted_at IS NOT NULL\n  GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at)\n)\nSELECT user_id, txn_month, net_cashflow\nFROM (\n  SELECT user_id, txn_month, net_cashflow,\n         ROW_NUMBER() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC, user_id ASC) AS rn\n  FROM monthly_user_cashflow\n) ranked\nWHERE rn <= 5\nORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` gives exactly 5 rows per month.\n- Ties are broken with `user_id ASC`.\n- This is useful when you want a strict top 5 instead of tie-preserving results.\n\n## Difference from the optimal approach\n\nIt may exclude tied users, while `DENSE_RANK()` preserves ties better.",
      },
      {
        approach_title: "Rank function",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH monthly_user_cashflow AS ( SELECT a.user_id, DATE_TRUNC('month', t.posted_at) AS txn_month, SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE t.transaction_status = 'posted' AND t.posted_at IS NOT NULL GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at) ) SELECT user_id, txn_month, net_cashflow FROM ( SELECT user_id, txn_month, net_cashflow, RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk FROM monthly_user_cashflow ) ranked WHERE rnk <= 5 ORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;",
        explanation:
          "## Approach\n\nUse `RANK()` instead of `DENSE_RANK()` for monthly ranking.\n\n## Query\n\n```sql\nWITH monthly_user_cashflow AS (\n  SELECT a.user_id,\n         DATE_TRUNC('month', t.posted_at) AS txn_month,\n         SUM(CASE WHEN t.transaction_type = 'credit' THEN t.amount ELSE -t.amount END) AS net_cashflow\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE t.transaction_status = 'posted'\n    AND t.posted_at IS NOT NULL\n  GROUP BY a.user_id, DATE_TRUNC('month', t.posted_at)\n)\nSELECT user_id, txn_month, net_cashflow\nFROM (\n  SELECT user_id, txn_month, net_cashflow,\n         RANK() OVER (PARTITION BY txn_month ORDER BY net_cashflow DESC) AS rnk\n  FROM monthly_user_cashflow\n) ranked\nWHERE rnk <= 5\nORDER BY txn_month ASC, net_cashflow DESC, user_id ASC;\n```\n\n## Explanation\n\n- `RANK()` gives equal values the same rank.\n- But it also skips rank numbers after ties.\n- That can change how many rows appear when filtering to rank 5.\n\n## Difference from the optimal approach\n\nValid, but `DENSE_RANK()` is usually easier to reason about for top-N with ties.",
      },
    ],
  },
  {
    code: "BANK_092",
    approaches: [
      {
        approach_title: "CTE compare counts",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH fraud_counts AS ( SELECT user_id, COUNT(*) AS fraud_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id ), ticket_counts AS ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ) SELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count FROM users u JOIN fraud_counts f ON u.id = f.user_id LEFT JOIN ticket_counts t ON u.id = t.user_id WHERE f.fraud_count > COALESCE(t.ticket_count, 0) ORDER BY f.fraud_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCount fraud alerts and support tickets separately, then compare the two totals per user.\n\n## Query\n\n```sql\nWITH fraud_counts AS (\n  SELECT user_id, COUNT(*) AS fraud_count\n  FROM fraud_alerts\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n),\nticket_counts AS (\n  SELECT user_id, COUNT(*) AS ticket_count\n  FROM support_tickets\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count\nFROM users u\nJOIN fraud_counts f ON u.id = f.user_id\nLEFT JOIN ticket_counts t ON u.id = t.user_id\nWHERE f.fraud_count > COALESCE(t.ticket_count, 0)\nORDER BY f.fraud_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- One CTE counts fraud alerts per user.\n- Another counts support tickets per user.\n- `LEFT JOIN` keeps users who have fraud alerts but no tickets.\n- `COALESCE` treats missing ticket counts as zero.\n\n## Why this is optimal\n\nIt avoids row multiplication and makes the comparison clean and accurate.",
      },
      {
        approach_title: "Subquery compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS fraud_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id ) f ON u.id = f.user_id LEFT JOIN ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ) t ON u.id = t.user_id WHERE f.fraud_count > COALESCE(t.ticket_count, 0) ORDER BY f.fraud_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse grouped subqueries for fraud and ticket counts, then compare them.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, f.fraud_count, COALESCE(t.ticket_count, 0) AS ticket_count\nFROM users u\nJOIN (\n  SELECT user_id, COUNT(*) AS fraud_count\n  FROM fraud_alerts\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n) f ON u.id = f.user_id\nLEFT JOIN (\n  SELECT user_id, COUNT(*) AS ticket_count\n  FROM support_tickets\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n) t ON u.id = t.user_id\nWHERE f.fraud_count > COALESCE(t.ticket_count, 0)\nORDER BY f.fraud_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- Each subquery produces one count per user.\n- The outer query joins the summaries and compares them.\n\n## Difference from the optimal approach\n\nCorrect, but CTEs are easier to read and reuse.",
      },
      {
        approach_title: "Union movement counts",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH incident_counts AS ( SELECT user_id, COUNT(*) AS fraud_count, 0 AS ticket_count FROM fraud_alerts WHERE user_id IS NOT NULL GROUP BY user_id UNION ALL SELECT user_id, 0 AS fraud_count, COUNT(*) AS ticket_count FROM support_tickets WHERE user_id IS NOT NULL GROUP BY user_id ), user_totals AS ( SELECT user_id, SUM(fraud_count) AS fraud_count, SUM(ticket_count) AS ticket_count FROM incident_counts GROUP BY user_id ) SELECT u.id, u.full_name, ut.fraud_count, ut.ticket_count FROM users u JOIN user_totals ut ON u.id = ut.user_id WHERE ut.fraud_count > ut.ticket_count ORDER BY ut.fraud_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nTurn fraud and ticket counts into one combined dataset, then summarize it by user.\n\n## Query\n\n```sql\nWITH incident_counts AS (\n  SELECT user_id, COUNT(*) AS fraud_count, 0 AS ticket_count\n  FROM fraud_alerts\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n\n  UNION ALL\n\n  SELECT user_id, 0 AS fraud_count, COUNT(*) AS ticket_count\n  FROM support_tickets\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n),\nuser_totals AS (\n  SELECT user_id,\n         SUM(fraud_count) AS fraud_count,\n         SUM(ticket_count) AS ticket_count\n  FROM incident_counts\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ut.fraud_count, ut.ticket_count\nFROM users u\nJOIN user_totals ut ON u.id = ut.user_id\nWHERE ut.fraud_count > ut.ticket_count\nORDER BY ut.fraud_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- Fraud and ticket counts are reshaped into one combined table.\n- The second CTE summarizes both measures per user.\n- The final query compares the two counts.\n\n## Difference from the optimal approach\n\nFlexible, but less straightforward than separate count CTEs.",
      },
    ],
  },
  {
    code: "BANK_093",
    approaches: [
      {
        approach_title: "CTE exposure ratio",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH deposits AS ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ), exposure AS ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) SELECT u.id, u.full_name, ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN exposure e ON u.id = e.user_id JOIN deposits d ON u.id = d.user_id WHERE d.total_deposits > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nAggregate deposits and outstanding loans separately, then divide loan exposure by deposits.\n\n## Query\n\n```sql\nWITH deposits AS (\n  SELECT user_id, SUM(current_balance) AS total_deposits\n  FROM accounts\n  GROUP BY user_id\n),\nexposure AS (\n  SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding\n  FROM loans\n  GROUP BY borrower_user_id\n)\nSELECT u.id, u.full_name,\n       ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio\nFROM users u\nJOIN exposure e ON u.id = e.user_id\nJOIN deposits d ON u.id = d.user_id\nWHERE d.total_deposits > 0\nORDER BY exposure_ratio DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `deposits` calculates each user's total account balance.\n- `exposure` calculates each user's total outstanding principal.\n- `NULLIF` protects against division by zero.\n- Multiplying by `100.0` expresses the ratio as a percentage.\n\n## Why this is optimal\n\nIt avoids double counting and cleanly computes the ratio from separate aggregates.",
      },
      {
        approach_title: "Subquery ratio",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) e ON u.id = e.user_id JOIN ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ) d ON u.id = d.user_id WHERE d.total_deposits > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse grouped subqueries for deposits and loan exposure instead of named CTEs.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       ROUND(100.0 * e.total_outstanding / NULLIF(d.total_deposits, 0), 2) AS exposure_ratio\nFROM users u\nJOIN (\n  SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding\n  FROM loans\n  GROUP BY borrower_user_id\n) e ON u.id = e.user_id\nJOIN (\n  SELECT user_id, SUM(current_balance) AS total_deposits\n  FROM accounts\n  GROUP BY user_id\n) d ON u.id = d.user_id\nWHERE d.total_deposits > 0\nORDER BY exposure_ratio DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each subquery produces one total per user.\n- The outer query joins the totals and computes the ratio.\n\n## Difference from the optimal approach\n\nSame logic, but less readable than the CTE version.",
      },
      {
        approach_title: "Pre-aggregate with left joins",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_totals AS ( SELECT u.id AS user_id, COALESCE(a.total_deposits, 0) AS total_deposits, COALESCE(l.total_outstanding, 0) AS total_outstanding FROM users u LEFT JOIN ( SELECT user_id, SUM(current_balance) AS total_deposits FROM accounts GROUP BY user_id ) a ON u.id = a.user_id LEFT JOIN ( SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding FROM loans GROUP BY borrower_user_id ) l ON u.id = l.user_id ) SELECT u.id, u.full_name, ROUND(100.0 * ut.total_outstanding / NULLIF(ut.total_deposits, 0), 2) AS exposure_ratio FROM users u JOIN user_totals ut ON u.id = ut.user_id WHERE ut.total_deposits > 0 AND ut.total_outstanding > 0 ORDER BY exposure_ratio DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nBuild a user-level totals table first, then calculate the ratio from it.\n\n## Query\n\n```sql\nWITH user_totals AS (\n  SELECT u.id AS user_id,\n         COALESCE(a.total_deposits, 0) AS total_deposits,\n         COALESCE(l.total_outstanding, 0) AS total_outstanding\n  FROM users u\n  LEFT JOIN (\n    SELECT user_id, SUM(current_balance) AS total_deposits\n    FROM accounts\n    GROUP BY user_id\n  ) a ON u.id = a.user_id\n  LEFT JOIN (\n    SELECT borrower_user_id AS user_id, SUM(outstanding_principal) AS total_outstanding\n    FROM loans\n    GROUP BY borrower_user_id\n  ) l ON u.id = l.user_id\n)\nSELECT u.id, u.full_name,\n       ROUND(100.0 * ut.total_outstanding / NULLIF(ut.total_deposits, 0), 2) AS exposure_ratio\nFROM users u\nJOIN user_totals ut ON u.id = ut.user_id\nWHERE ut.total_deposits > 0\n  AND ut.total_outstanding > 0\nORDER BY exposure_ratio DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE builds a reusable user summary with both totals.\n- The final query computes the ratio and filters to users with nonzero deposits and loans.\n\n## Difference from the optimal approach\n\nUseful if more user-level metrics are needed, but more verbose here.",
      },
    ],
  },
  {
    code: "BANK_094",
    approaches: [
      {
        approach_title: "Exists portfolio",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM accounts a WHERE a.user_id = u.id ) AND EXISTS ( SELECT 1 FROM loans l WHERE l.borrower_user_id = u.id ) AND ( EXISTS ( SELECT 1 FROM fixed_deposits fd WHERE fd.user_id = u.id ) OR EXISTS ( SELECT 1 FROM recurring_deposits rd WHERE rd.user_id = u.id ) ) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nCheck three independent conditions with `EXISTS`: account ownership, loan ownership, and at least one deposit product.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM accounts a\n  WHERE a.user_id = u.id\n)\nAND EXISTS (\n  SELECT 1\n  FROM loans l\n  WHERE l.borrower_user_id = u.id\n)\nAND (\n  EXISTS (\n    SELECT 1\n    FROM fixed_deposits fd\n    WHERE fd.user_id = u.id\n  )\n  OR EXISTS (\n    SELECT 1\n    FROM recurring_deposits rd\n    WHERE rd.user_id = u.id\n  )\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` ensures the user has at least one account.\n- The second ensures the user has at least one loan.\n- The third block ensures the user has either a fixed or recurring deposit.\n- Because `EXISTS` checks are independent, no duplicate rows are created.\n\n## Why this is optimal\n\nIt avoids join multiplication and matches the business condition very clearly.",
      },
      {
        approach_title: "Distinct joins",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT u.id, u.full_name FROM users u JOIN accounts a ON u.id = a.user_id JOIN loans l ON u.id = l.borrower_user_id LEFT JOIN fixed_deposits fd ON u.id = fd.user_id LEFT JOIN recurring_deposits rd ON u.id = rd.user_id WHERE fd.id IS NOT NULL OR rd.id IS NOT NULL ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nJoin users to accounts and loans, then left join both deposit product tables.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN loans l ON u.id = l.borrower_user_id\nLEFT JOIN fixed_deposits fd ON u.id = fd.user_id\nLEFT JOIN recurring_deposits rd ON u.id = rd.user_id\nWHERE fd.id IS NOT NULL OR rd.id IS NOT NULL\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Inner joins require at least one account and one loan.\n- Left joins bring in both deposit product types.\n- The `WHERE` clause keeps users who have at least one of those deposit products.\n- `DISTINCT` removes duplicates caused by multiple rows.\n\n## Difference from the optimal approach\n\nWorks, but can create many duplicate join combinations before de-duplication.",
      },
      {
        approach_title: "CTE product sets",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH account_users AS ( SELECT DISTINCT user_id FROM accounts ), loan_users AS ( SELECT DISTINCT borrower_user_id AS user_id FROM loans ), deposit_users AS ( SELECT DISTINCT user_id FROM fixed_deposits UNION SELECT DISTINCT user_id FROM recurring_deposits ) SELECT u.id, u.full_name FROM users u JOIN account_users au ON u.id = au.user_id JOIN loan_users lu ON u.id = lu.user_id JOIN deposit_users du ON u.id = du.user_id ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nBuild three user sets and intersect them by joining.\n\n## Query\n\n```sql\nWITH account_users AS (\n  SELECT DISTINCT user_id\n  FROM accounts\n),\nloan_users AS (\n  SELECT DISTINCT borrower_user_id AS user_id\n  FROM loans\n),\ndeposit_users AS (\n  SELECT DISTINCT user_id\n  FROM fixed_deposits\n  UNION\n  SELECT DISTINCT user_id\n  FROM recurring_deposits\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN account_users au ON u.id = au.user_id\nJOIN loan_users lu ON u.id = lu.user_id\nJOIN deposit_users du ON u.id = du.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Each CTE creates a set of users satisfying one part of the requirement.\n- Joining those sets gives users who satisfy all parts.\n\n## Difference from the optimal approach\n\nVery clear set-based logic, but longer than the `EXISTS` approach.",
      },
    ],
  },
  {
    code: "BANK_095",
    approaches: [
      {
        approach_title: "Distinct types branch",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT b.id, b.branch_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM branches b JOIN accounts a ON b.id = a.primary_branch_id JOIN account_products ap ON a.product_id = ap.id GROUP BY b.id, b.branch_name ORDER BY distinct_product_types DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nJoin branches to account products through accounts, then count distinct product types per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(DISTINCT ap.product_type) AS distinct_product_types\nFROM branches b\nJOIN accounts a ON b.id = a.primary_branch_id\nJOIN account_products ap ON a.product_id = ap.id\nGROUP BY b.id, b.branch_name\nORDER BY distinct_product_types DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The joins connect each branch to the product type of each account under it.\n- `COUNT(DISTINCT ap.product_type)` measures product diversity, not account count.\n- `LIMIT 5` returns the top branches.\n\n## Why this is optimal\n\nThe distinct count directly matches the diversity requirement.",
      },
      {
        approach_title: "CTE branch types",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH branch_product_types AS ( SELECT a.primary_branch_id AS branch_id, COUNT(DISTINCT ap.product_type) AS distinct_product_types FROM accounts a JOIN account_products ap ON a.product_id = ap.id GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, bpt.distinct_product_types FROM branches b JOIN branch_product_types bpt ON b.id = bpt.branch_id ORDER BY bpt.distinct_product_types DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nPrecompute distinct product-type counts per branch, then join to branch names.\n\n## Query\n\n```sql\nWITH branch_product_types AS (\n  SELECT a.primary_branch_id AS branch_id,\n         COUNT(DISTINCT ap.product_type) AS distinct_product_types\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n  GROUP BY a.primary_branch_id\n)\nSELECT b.id, b.branch_name, bpt.distinct_product_types\nFROM branches b\nJOIN branch_product_types bpt ON b.id = bpt.branch_id\nORDER BY bpt.distinct_product_types DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one diversity count per branch id.\n- The outer query attaches branch names and ranks the branches.\n\n## Difference from the optimal approach\n\nMore modular, but longer.",
      },
      {
        approach_title: "Distinct pairs count",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT b.id, b.branch_name, COUNT(*) AS distinct_product_types FROM branches b JOIN ( SELECT DISTINCT a.primary_branch_id AS branch_id, ap.product_type FROM accounts a JOIN account_products ap ON a.product_id = ap.id ) x ON b.id = x.branch_id GROUP BY b.id, b.branch_name ORDER BY distinct_product_types DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nReduce the data to unique branch-product_type pairs, then count those pairs per branch.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name, COUNT(*) AS distinct_product_types\nFROM branches b\nJOIN (\n  SELECT DISTINCT a.primary_branch_id AS branch_id, ap.product_type\n  FROM accounts a\n  JOIN account_products ap ON a.product_id = ap.id\n) x ON b.id = x.branch_id\nGROUP BY b.id, b.branch_name\nORDER BY distinct_product_types DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query removes duplicate occurrences of the same product type in a branch.\n- The outer query counts those unique pairs.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(DISTINCT ...)` is shorter and clearer.",
      },
    ],
  },
  {
    code: "BANK_096",
    approaches: [
      {
        approach_title: "CTE top merchant share",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH merchant_spend AS ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ), ranked_spend AS ( SELECT user_id, merchant_name, merchant_total, SUM(merchant_total) OVER (PARTITION BY user_id) AS total_spend, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn FROM merchant_spend ) SELECT u.id, u.full_name, rs.merchant_name, ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct FROM users u JOIN ranked_spend rs ON u.id = rs.user_id WHERE rs.rn = 1 AND 100.0 * rs.merchant_total / rs.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst calculate spend per user-merchant pair, then identify the top merchant and its share of total spend for each user.\n\n## Query\n\n```sql\nWITH merchant_spend AS (\n  SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total\n  FROM card_transactions ct\n  JOIN cards c ON ct.card_id = c.id\n  JOIN accounts a ON c.account_id = a.id\n  WHERE ct.transaction_status = 'settled'\n  GROUP BY a.user_id, ct.merchant_name\n),\nranked_spend AS (\n  SELECT user_id, merchant_name, merchant_total,\n         SUM(merchant_total) OVER (PARTITION BY user_id) AS total_spend,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn\n  FROM merchant_spend\n)\nSELECT u.id, u.full_name, rs.merchant_name,\n       ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct\nFROM users u\nJOIN ranked_spend rs ON u.id = rs.user_id\nWHERE rs.rn = 1\n  AND 100.0 * rs.merchant_total / rs.total_spend > 50\nORDER BY concentration_pct DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE computes spend per user and merchant.\n- The second CTE adds total spend per user and ranks merchants by spend.\n- `rn = 1` keeps the top merchant for each user.\n- The percentage compares top-merchant spend to total spend.\n\n## Why this is optimal\n\nIt cleanly handles ranking and percentage calculation without duplicate logic.",
      },
      {
        approach_title: "CTE max join",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH merchant_spend AS ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ), user_totals AS ( SELECT user_id, SUM(merchant_total) AS total_spend, MAX(merchant_total) AS top_merchant_total FROM merchant_spend GROUP BY user_id ) SELECT u.id, u.full_name, ms.merchant_name, ROUND(100.0 * ut.top_merchant_total / ut.total_spend, 2) AS concentration_pct FROM users u JOIN user_totals ut ON u.id = ut.user_id JOIN merchant_spend ms ON ut.user_id = ms.user_id AND ut.top_merchant_total = ms.merchant_total WHERE 100.0 * ut.top_merchant_total / ut.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute total and max merchant spend per user, then join back to find the merchant name.\n\n## Query\n\n```sql\nWITH merchant_spend AS (\n  SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total\n  FROM card_transactions ct\n  JOIN cards c ON ct.card_id = c.id\n  JOIN accounts a ON c.account_id = a.id\n  WHERE ct.transaction_status = 'settled'\n  GROUP BY a.user_id, ct.merchant_name\n),\nuser_totals AS (\n  SELECT user_id,\n         SUM(merchant_total) AS total_spend,\n         MAX(merchant_total) AS top_merchant_total\n  FROM merchant_spend\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ms.merchant_name,\n       ROUND(100.0 * ut.top_merchant_total / ut.total_spend, 2) AS concentration_pct\nFROM users u\nJOIN user_totals ut ON u.id = ut.user_id\nJOIN merchant_spend ms\n  ON ut.user_id = ms.user_id\n AND ut.top_merchant_total = ms.merchant_total\nWHERE 100.0 * ut.top_merchant_total / ut.total_spend > 50\nORDER BY concentration_pct DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE calculates merchant spend per user.\n- The second CTE calculates each user's total spend and largest merchant spend.\n- Joining back to `merchant_spend` recovers the merchant name.\n\n## Difference from the optimal approach\n\nWorks, but ties can return multiple merchants and the logic is less direct than ranking.",
      },
      {
        approach_title: "Subquery ranked",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, rs.merchant_name, ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct FROM users u JOIN ( SELECT user_id, merchant_name, merchant_total, total_spend, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn FROM ( SELECT a.user_id, ct.merchant_name, SUM(ct.billing_amount) AS merchant_total, SUM(SUM(ct.billing_amount)) OVER (PARTITION BY a.user_id) AS total_spend FROM card_transactions ct JOIN cards c ON ct.card_id = c.id JOIN accounts a ON c.account_id = a.id WHERE ct.transaction_status = 'settled' GROUP BY a.user_id, ct.merchant_name ) x ) rs ON u.id = rs.user_id WHERE rs.rn = 1 AND 100.0 * rs.merchant_total / rs.total_spend > 50 ORDER BY concentration_pct DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse nested subqueries with window functions instead of named CTEs.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, rs.merchant_name,\n       ROUND(100.0 * rs.merchant_total / rs.total_spend, 2) AS concentration_pct\nFROM users u\nJOIN (\n  SELECT user_id, merchant_name, merchant_total, total_spend,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY merchant_total DESC) AS rn\n  FROM (\n    SELECT a.user_id, ct.merchant_name,\n           SUM(ct.billing_amount) AS merchant_total,\n           SUM(SUM(ct.billing_amount)) OVER (PARTITION BY a.user_id) AS total_spend\n    FROM card_transactions ct\n    JOIN cards c ON ct.card_id = c.id\n    JOIN accounts a ON c.account_id = a.id\n    WHERE ct.transaction_status = 'settled'\n    GROUP BY a.user_id, ct.merchant_name\n  ) x\n) rs ON u.id = rs.user_id\nWHERE rs.rn = 1\n  AND 100.0 * rs.merchant_total / rs.total_spend > 50\nORDER BY concentration_pct DESC, u.id ASC;\n```\n\n## Explanation\n\n- The inner subquery computes merchant spend and total user spend.\n- The next level ranks merchants per user.\n- The outer query keeps the top merchant with concentration above 50 percent.\n\n## Difference from the optimal approach\n\nValid, but much harder to read than the CTE version.",
      },
    ],
  },
  {
    code: "BANK_097",
    approaches: [
      {
        approach_title: "Distinct channels",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, COUNT(DISTINCT t.channel) AS distinct_channels_used FROM users u JOIN accounts a ON u.id = a.user_id JOIN transactions t ON a.id = t.account_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin users to transactions and count distinct channels per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(DISTINCT t.channel) AS distinct_channels_used\nFROM users u\nJOIN accounts a ON u.id = a.user_id\nJOIN transactions t ON a.id = t.account_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_channels_used DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The joins connect users to all account transactions.\n- `COUNT(DISTINCT t.channel)` counts each channel once per user.\n- The result ranks users by channel diversity.\n\n## Why this is optimal\n\nThe distinct count directly matches the requirement.",
      },
      {
        approach_title: "CTE channel pairs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_channels AS ( SELECT DISTINCT a.user_id, t.channel FROM accounts a JOIN transactions t ON a.id = t.account_id ) SELECT u.id, u.full_name, COUNT(*) AS distinct_channels_used FROM users u JOIN user_channels uc ON u.id = uc.user_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nReduce the data to unique user-channel pairs, then count them per user.\n\n## Query\n\n```sql\nWITH user_channels AS (\n  SELECT DISTINCT a.user_id, t.channel\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n)\nSELECT u.id, u.full_name, COUNT(*) AS distinct_channels_used\nFROM users u\nJOIN user_channels uc ON u.id = uc.user_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_channels_used DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE removes duplicate use of the same channel by the same user.\n- The outer query counts the remaining unique channels.\n\n## Difference from the optimal approach\n\nMore explicit, but longer than `COUNT(DISTINCT ...)`.",
      },
      {
        approach_title: "Subquery channels",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, COUNT(*) AS distinct_channels_used FROM users u JOIN ( SELECT DISTINCT a.user_id, t.channel FROM accounts a JOIN transactions t ON a.id = t.account_id ) x ON u.id = x.user_id GROUP BY u.id, u.full_name ORDER BY distinct_channels_used DESC, u.id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table of distinct user-channel pairs, then count them.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(*) AS distinct_channels_used\nFROM users u\nJOIN (\n  SELECT DISTINCT a.user_id, t.channel\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n) x ON u.id = x.user_id\nGROUP BY u.id, u.full_name\nORDER BY distinct_channels_used DESC, u.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query keeps each user-channel pair only once.\n- The outer query counts those pairs for each user.\n\n## Difference from the optimal approach\n\nValid, but less concise than the direct distinct count.",
      },
    ],
  },
  {
    code: "BANK_098",
    approaches: [
      {
        approach_title: "CTE compare avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH complaint_counts AS ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) SELECT u.id, u.full_name, cc.complaint_count FROM users u JOIN complaint_counts cc ON u.id = cc.user_id WHERE cc.complaint_count > (SELECT AVG(complaint_count) FROM complaint_counts) ORDER BY cc.complaint_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst count complaints per user, then compare each count with the average complaint count of complaint-raising users.\n\n## Query\n\n```sql\nWITH complaint_counts AS (\n  SELECT user_id, COUNT(*) AS complaint_count\n  FROM complaints\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, cc.complaint_count\nFROM users u\nJOIN complaint_counts cc ON u.id = cc.user_id\nWHERE cc.complaint_count > (\n  SELECT AVG(complaint_count)\n  FROM complaint_counts\n)\nORDER BY cc.complaint_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one complaint total per user.\n- The subquery computes the average of those user totals.\n- The outer query keeps only users above that average.\n\n## Why this is optimal\n\nIt clearly separates per-user counting from the average benchmark comparison.",
      },
      {
        approach_title: "Subquery compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, cc.complaint_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) cc ON u.id = cc.user_id WHERE cc.complaint_count > ( SELECT AVG(complaint_count) FROM ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ) x ) ORDER BY cc.complaint_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse nested grouped subqueries instead of a named CTE.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, cc.complaint_count\nFROM users u\nJOIN (\n  SELECT user_id, COUNT(*) AS complaint_count\n  FROM complaints\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n) cc ON u.id = cc.user_id\nWHERE cc.complaint_count > (\n  SELECT AVG(complaint_count)\n  FROM (\n    SELECT user_id, COUNT(*) AS complaint_count\n    FROM complaints\n    WHERE user_id IS NOT NULL\n    GROUP BY user_id\n  ) x\n)\nORDER BY cc.complaint_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- One subquery calculates complaint totals per user.\n- Another computes the average of those totals.\n- The outer query compares them.\n\n## Difference from the optimal approach\n\nIt works, but repeats logic and is harder to follow.",
      },
      {
        approach_title: "Window average",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH complaint_counts AS ( SELECT user_id, COUNT(*) AS complaint_count FROM complaints WHERE user_id IS NOT NULL GROUP BY user_id ), rated AS ( SELECT user_id, complaint_count, AVG(complaint_count) OVER () AS avg_complaint_count FROM complaint_counts ) SELECT u.id, u.full_name, r.complaint_count FROM users u JOIN rated r ON u.id = r.user_id WHERE r.complaint_count > r.avg_complaint_count ORDER BY r.complaint_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nAttach the overall average complaint count to every user summary row using a window function.\n\n## Query\n\n```sql\nWITH complaint_counts AS (\n  SELECT user_id, COUNT(*) AS complaint_count\n  FROM complaints\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id\n),\nrated AS (\n  SELECT user_id, complaint_count,\n         AVG(complaint_count) OVER () AS avg_complaint_count\n  FROM complaint_counts\n)\nSELECT u.id, u.full_name, r.complaint_count\nFROM users u\nJOIN rated r ON u.id = r.user_id\nWHERE r.complaint_count > r.avg_complaint_count\nORDER BY r.complaint_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE computes one complaint count per user.\n- The second CTE adds the same overall average to each row.\n- The final query keeps rows above that average.\n\n## Difference from the optimal approach\n\nElegant, but a simple scalar comparison is easier for learners.",
      },
    ],
  },
  {
    code: "BANK_099",
    approaches: [
      {
        approach_title: "CTE fraud rate",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH branch_customers AS ( SELECT primary_branch_id AS branch_id, COUNT(DISTINCT user_id) AS customer_count FROM accounts WHERE primary_branch_id IS NOT NULL GROUP BY primary_branch_id ), branch_fraud AS ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN branch_customers bc ON b.id = bc.branch_id LEFT JOIN branch_fraud bf ON b.id = bf.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCompute customer counts and fraud alert counts separately per branch, then divide fraud alerts by customers.\n\n## Query\n\n```sql\nWITH branch_customers AS (\n  SELECT primary_branch_id AS branch_id,\n         COUNT(DISTINCT user_id) AS customer_count\n  FROM accounts\n  WHERE primary_branch_id IS NOT NULL\n  GROUP BY primary_branch_id\n),\nbranch_fraud AS (\n  SELECT a.primary_branch_id AS branch_id,\n         COUNT(f.id) AS fraud_count\n  FROM fraud_alerts f\n  JOIN accounts a ON f.account_id = a.id\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id\n)\nSELECT b.id, b.branch_name,\n       ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers\nFROM branches b\nJOIN branch_customers bc ON b.id = bc.branch_id\nLEFT JOIN branch_fraud bf ON b.id = bf.branch_id\nORDER BY fraud_rate_per_100_customers DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `branch_customers` counts distinct customers per branch.\n- `branch_fraud` counts fraud alerts tied to accounts in that branch.\n- `COALESCE` treats missing fraud counts as zero.\n- `NULLIF` protects against division by zero.\n- Multiplying by `100.0` gives a per-100-customers rate.\n\n## Why this is optimal\n\nIt avoids double counting and clearly separates numerator and denominator.",
      },
      {
        approach_title: "Subquery fraud rate",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN ( SELECT primary_branch_id AS branch_id, COUNT(DISTINCT user_id) AS customer_count FROM accounts WHERE primary_branch_id IS NOT NULL GROUP BY primary_branch_id ) bc ON b.id = bc.branch_id LEFT JOIN ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) bf ON b.id = bf.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nUse grouped subqueries for customer counts and fraud counts, then combine them.\n\n## Query\n\n```sql\nSELECT b.id, b.branch_name,\n       ROUND(100.0 * COALESCE(bf.fraud_count, 0) / NULLIF(bc.customer_count, 0), 2) AS fraud_rate_per_100_customers\nFROM branches b\nJOIN (\n  SELECT primary_branch_id AS branch_id,\n         COUNT(DISTINCT user_id) AS customer_count\n  FROM accounts\n  WHERE primary_branch_id IS NOT NULL\n  GROUP BY primary_branch_id\n) bc ON b.id = bc.branch_id\nLEFT JOIN (\n  SELECT a.primary_branch_id AS branch_id,\n         COUNT(f.id) AS fraud_count\n  FROM fraud_alerts f\n  JOIN accounts a ON f.account_id = a.id\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id\n) bf ON b.id = bf.branch_id\nORDER BY fraud_rate_per_100_customers DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Each subquery creates one branch-level measure.\n- The outer query combines them into a fraud rate.\n\n## Difference from the optimal approach\n\nCorrect, but less readable than the CTE version.",
      },
      {
        approach_title: "Branch summary CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH branch_customer_pairs AS ( SELECT DISTINCT primary_branch_id AS branch_id, user_id FROM accounts WHERE primary_branch_id IS NOT NULL ), branch_customer_totals AS ( SELECT branch_id, COUNT(*) AS customer_count FROM branch_customer_pairs GROUP BY branch_id ), branch_fraud_totals AS ( SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count FROM fraud_alerts f JOIN accounts a ON f.account_id = a.id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id ) SELECT b.id, b.branch_name, ROUND(100.0 * COALESCE(bft.fraud_count, 0) / NULLIF(bct.customer_count, 0), 2) AS fraud_rate_per_100_customers FROM branches b JOIN branch_customer_totals bct ON b.id = bct.branch_id LEFT JOIN branch_fraud_totals bft ON b.id = bft.branch_id ORDER BY fraud_rate_per_100_customers DESC, b.id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nMake distinct branch-customer pairs explicit, then count them before combining with fraud totals.\n\n## Query\n\n```sql\nWITH branch_customer_pairs AS (\n  SELECT DISTINCT primary_branch_id AS branch_id, user_id\n  FROM accounts\n  WHERE primary_branch_id IS NOT NULL\n),\nbranch_customer_totals AS (\n  SELECT branch_id, COUNT(*) AS customer_count\n  FROM branch_customer_pairs\n  GROUP BY branch_id\n),\nbranch_fraud_totals AS (\n  SELECT a.primary_branch_id AS branch_id, COUNT(f.id) AS fraud_count\n  FROM fraud_alerts f\n  JOIN accounts a ON f.account_id = a.id\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id\n)\nSELECT b.id, b.branch_name,\n       ROUND(100.0 * COALESCE(bft.fraud_count, 0) / NULLIF(bct.customer_count, 0), 2) AS fraud_rate_per_100_customers\nFROM branches b\nJOIN branch_customer_totals bct ON b.id = bct.branch_id\nLEFT JOIN branch_fraud_totals bft ON b.id = bft.branch_id\nORDER BY fraud_rate_per_100_customers DESC, b.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The first CTE makes the unique customer set explicit.\n- The second counts those customers per branch.\n- The third counts fraud alerts per branch.\n- The final query computes the rate.\n\n## Difference from the optimal approach\n\nVery explicit, but more verbose than needed.",
      },
    ],
  },
  {
    code: "BANK_100",
    approaches: [
      {
        approach_title: "CTE branch avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH user_txn_counts AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), branch_avg_txn AS ( SELECT branch_id, AVG(txn_count) AS avg_txn_count FROM user_txn_counts GROUP BY branch_id ) SELECT u.id, u.full_name, utc.branch_id, utc.txn_count FROM users u JOIN user_txn_counts utc ON u.id = utc.user_id JOIN branch_avg_txn bat ON utc.branch_id = bat.branch_id WHERE utc.txn_count > bat.avg_txn_count ORDER BY utc.txn_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nFirst count transactions per user within each branch, then compare each user against the average transaction count of that branch.\n\n## Query\n\n```sql\nWITH user_txn_counts AS (\n  SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id, a.user_id\n),\nbranch_avg_txn AS (\n  SELECT branch_id, AVG(txn_count) AS avg_txn_count\n  FROM user_txn_counts\n  GROUP BY branch_id\n)\nSELECT u.id, u.full_name, utc.branch_id, utc.txn_count\nFROM users u\nJOIN user_txn_counts utc ON u.id = utc.user_id\nJOIN branch_avg_txn bat ON utc.branch_id = bat.branch_id\nWHERE utc.txn_count > bat.avg_txn_count\nORDER BY utc.txn_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE creates one transaction count per user and branch.\n- The second CTE computes the average of those user counts for each branch.\n- The outer query keeps users above their branch average.\n\n## Why this is optimal\n\nIt correctly compares user-level activity against a branch-level benchmark without double counting.",
      },
      {
        approach_title: "Subquery compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id, u.full_name, utc.branch_id, utc.txn_count FROM users u JOIN ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) utc ON u.id = utc.user_id JOIN ( SELECT branch_id, AVG(txn_count) AS avg_txn_count FROM ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ) x GROUP BY branch_id ) bat ON utc.branch_id = bat.branch_id WHERE utc.txn_count > bat.avg_txn_count ORDER BY utc.txn_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nUse nested subqueries to compute user transaction counts and branch averages.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, utc.branch_id, utc.txn_count\nFROM users u\nJOIN (\n  SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id, a.user_id\n) utc ON u.id = utc.user_id\nJOIN (\n  SELECT branch_id, AVG(txn_count) AS avg_txn_count\n  FROM (\n    SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count\n    FROM accounts a\n    JOIN transactions t ON a.id = t.account_id\n    WHERE a.primary_branch_id IS NOT NULL\n    GROUP BY a.primary_branch_id, a.user_id\n  ) x\n  GROUP BY branch_id\n) bat ON utc.branch_id = bat.branch_id\nWHERE utc.txn_count > bat.avg_txn_count\nORDER BY utc.txn_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- One subquery computes per-user transaction counts by branch.\n- Another computes the average of those counts by branch.\n- The outer query compares the two.\n\n## Difference from the optimal approach\n\nIt works, but repeats the grouped logic and is harder to maintain.",
      },
      {
        approach_title: "Window branch avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_txn_counts AS ( SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count FROM accounts a JOIN transactions t ON a.id = t.account_id WHERE a.primary_branch_id IS NOT NULL GROUP BY a.primary_branch_id, a.user_id ), rated AS ( SELECT branch_id, user_id, txn_count, AVG(txn_count) OVER (PARTITION BY branch_id) AS avg_txn_count FROM user_txn_counts ) SELECT u.id, u.full_name, r.branch_id, r.txn_count FROM users u JOIN rated r ON u.id = r.user_id WHERE r.txn_count > r.avg_txn_count ORDER BY r.txn_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute user transaction counts per branch, then use a window function to attach each branch's average to every row.\n\n## Query\n\n```sql\nWITH user_txn_counts AS (\n  SELECT a.primary_branch_id AS branch_id, a.user_id, COUNT(t.id) AS txn_count\n  FROM accounts a\n  JOIN transactions t ON a.id = t.account_id\n  WHERE a.primary_branch_id IS NOT NULL\n  GROUP BY a.primary_branch_id, a.user_id\n),\nrated AS (\n  SELECT branch_id, user_id, txn_count,\n         AVG(txn_count) OVER (PARTITION BY branch_id) AS avg_txn_count\n  FROM user_txn_counts\n)\nSELECT u.id, u.full_name, r.branch_id, r.txn_count\nFROM users u\nJOIN rated r ON u.id = r.user_id\nWHERE r.txn_count > r.avg_txn_count\nORDER BY r.txn_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The first CTE computes user transaction counts per branch.\n- The second CTE adds the branch average to every user row.\n- The final query keeps users above that average.\n\n## Difference from the optimal approach\n\nElegant, but slightly more advanced than needed for this comparison.",
      },
    ],
  },
];
