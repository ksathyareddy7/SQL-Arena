
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260410);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

const CONFIG = {
  users: 20_000,
  branches: 60,
  employees: 900,
  accountProducts: 8,
  accountsPerUserMin: 1,
  accountsPerUserMax: 3,
  beneficiariesUsersRate: 0.35,
  beneficiariesPerUserMin: 1,
  beneficiariesPerUserMax: 3,
  cardsPerAccountRate: 0.65,
  atms: 140,
  merchants: 1200,
  transactions: 140_000,
  transfers: 18_000,
  cardTransactions: 40_000,
  atmTransactions: 18_000,
  billers: 40,
  billPayments: 22_000,
  loanProducts: 8,
  loanApplications: 14_000,
  loansRateFromApplications: 0.55,
  repaymentsPerLoanMax: 18,
  fixedDeposits: 6_000,
  recurringDeposits: 5_000,
  rewardPrograms: 8,
  rewardEarnings: 35_000,
  rewardRedemptions: 9_000,
  complaints: 5_000,
  fraudAlerts: 3_000,
  supportTickets: 7_000,
  notificationCampaigns: 140,
  notificationDeliveries: 60_000,
  auditLogs: 80_000,
  appEvents: 140_000,
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

function randomDateTimeBetween(start, end) {
  return faker.date.between({ from: start, to: end });
}

function randomDateBetween(start, end) {
  const d = faker.date.between({ from: start, to: end });
  return d.toISOString().slice(0, 10);
}

function iso(ts) {
  if (!ts) return "";
  return new Date(ts).toISOString().replace("T", " ").replace("Z", "");
}

function json(obj) {
  return JSON.stringify(obj ?? {});
}

function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

function clampNumber(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function money(min, max) {
  return faker.number.float({ min, max, fractionDigits: 2 });
}

function buildUnique(prefix, n) {
  return `${prefix}_${n}`;
}

function safePhone(n) {
  // keep within VARCHAR(20)
  const base = String(1000000000 + (n % 9000000000));
  return `+1${base}`.slice(0, 20);
}

function buildMaskedCardNumber(n) {
  // Must be globally unique (cards.masked_card_number is UNIQUE). Keep it "masked-looking"
  // but use enough digits to avoid collisions at our data scale.
  const suffix = String(n).padStart(8, "0");
  return `XXXX-XXXX-${suffix}`;
}

function genIban(n, countryCode) {
  const digits = String(1000000000000000n + BigInt(n)).slice(0, 16);
  return `${countryCode}${String(10 + (n % 89)).padStart(2, "0")}BANK${digits}`;
}

function main() {
  rmDir(OUTPUT_DIR);
  ensureDir(OUTPUT_DIR);

  const countries = ["United States", "India", "United Kingdom", "Canada", "Germany"];
  const currenciesByCountry = {
    "United States": "USD",
    India: "INR",
    "United Kingdom": "GBP",
    Canada: "CAD",
    Germany: "EUR",
  };

  const signupChannels = ["web", "mobile", "branch", "partner", "api"];
  const languages = ["en", "hi", "de", "fr", "es"];
  const customerSegments = [
    "retail",
    "mass_affluent",
    "hnwi",
    "student",
    "senior",
    "business_owner",
  ];
  const riskProfiles = ["low", "medium", "high"];

  // =========================
  // 1) users
  // =========================
  const usersWriter = new CsvWriter(path.join(OUTPUT_DIR, "users.csv"), [
    "full_name",
    "email",
    "phone",
    "date_of_birth",
    "country",
    "city",
    "signup_channel",
    "referral_code",
    "referred_by_user_id",
    "preferred_language",
    "customer_segment",
    "risk_profile",
    "marketing_opt_in",
    "is_active",
    "is_verified",
    "last_seen_at",
    "created_at",
  ]);

  const userCountry = new Array(CONFIG.users + 1);
  const userCity = new Array(CONFIG.users + 1);
  const userCreatedAt = new Array(CONFIG.users + 1);

  for (let i = 1; i <= CONFIG.users; i++) {
    const fullName = faker.person.fullName();
    const email = `user${i}@example.com`;
    const phone = safePhone(i);
    const dateOfBirth = faker.date
      .birthdate({ min: 18, max: 75, mode: "age" })
      .toISOString()
      .slice(0, 10);
    const country = pick(countries);
    const city = faker.location.city();
    const signupChannel = pick(signupChannels);
    const referralCode = `REF${String(i).padStart(8, "0")}`;

    // keep self-reference backward to avoid FK forward refs
    const referredByUserId = chance(0.12) && i > 10 ? randInt(1, i - 1) : null;

    const preferredLanguage = pick(languages);
    const customerSegment = chance(0.9) ? pick(customerSegments) : null;
    const riskProfile = chance(0.9) ? pick(riskProfiles) : null;
    const marketingOptIn = chance(0.55);
    const isActive = chance(0.96);
    const isVerified = chance(0.78);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const lastSeenAt = isActive
      ? randomDateTimeBetween(createdAt, DATE_RANGE.end)
      : null;

    userCountry[i] = country;
    userCity[i] = city;
    userCreatedAt[i] = createdAt;

    usersWriter.writeRow([
      fullName,
      email,
      phone,
      dateOfBirth,
      country,
      city,
      signupChannel,
      referralCode,
      referredByUserId,
      preferredLanguage,
      customerSegment,
      riskProfile,
      marketingOptIn,
      isActive,
      isVerified,
      iso(lastSeenAt),
      iso(createdAt),
    ]);
  }

  // =========================
  // 2) user_addresses
  // =========================
  const addressWriter = new CsvWriter(path.join(OUTPUT_DIR, "user_addresses.csv"), [
    "user_id",
    "address_type",
    "line1",
    "line2",
    "landmark",
    "city",
    "state",
    "postal_code",
    "country",
    "is_primary",
    "created_at",
  ]);

  const addressTypes = ["home", "mailing", "office", "registered"];
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const n = randInt(1, 2);
    const primaryIndex = randInt(0, n - 1);
    for (let j = 0; j < n; j++) {
      const addressType = j === 0 ? "home" : pick(addressTypes);
      const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
      addressWriter.writeRow([
        userId,
        addressType,
        faker.location.streetAddress(),
        chance(0.35) ? faker.location.secondaryAddress() : null,
        chance(0.25) ? faker.location.street() : null,
        userCity[userId],
        faker.location.state(),
        faker.location.zipCode(),
        userCountry[userId],
        j === primaryIndex,
        iso(createdAt),
      ]);
    }
  }

  // =========================
  // 3) branches
  // =========================
  const branchesWriter = new CsvWriter(path.join(OUTPUT_DIR, "branches.csv"), [
    "branch_code",
    "branch_name",
    "city",
    "state",
    "country",
    "region",
    "opened_at",
    "is_active",
    "created_at",
  ]);

  const branchCity = new Array(CONFIG.branches + 1);
  const branchCountry = new Array(CONFIG.branches + 1);
  for (let i = 1; i <= CONFIG.branches; i++) {
    const country = pick(countries);
    const city = faker.location.city();
    branchCity[i] = city;
    branchCountry[i] = country;
    const openedAt = randomDateBetween("2005-01-01", "2025-12-31");
    branchesWriter.writeRow([
      `BR${String(i).padStart(4, "0")}`,
      `${city} Main Branch ${i}`,
      city,
      faker.location.state(),
      country,
      faker.location.county(),
      openedAt,
      chance(0.95),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 4) employees
  // =========================
  const employeesWriter = new CsvWriter(path.join(OUTPUT_DIR, "employees.csv"), [
    "employee_code",
    "full_name",
    "email",
    "phone",
    "role_name",
    "branch_id",
    "manager_employee_id",
    "is_active",
    "hired_at",
    "created_at",
  ]);

  const employeeRoles = [
    "teller",
    "relationship_manager",
    "branch_manager",
    "ops_analyst",
    "support_agent",
    "collections_officer",
    "fraud_analyst",
    "compliance_officer",
  ];

  for (let i = 1; i <= CONFIG.employees; i++) {
    const fullName = faker.person.fullName();
    const email = `employee${i}@bank.example.com`;
    const phone = safePhone(500000 + i);
    const roleName = pick(employeeRoles);
    const branchId = chance(0.98) ? randInt(1, CONFIG.branches) : null;

    // back-reference manager
    const managerEmployeeId = i > 20 && chance(0.7) ? randInt(1, i - 1) : null;

    const hiredAt = randomDateBetween("2010-01-01", "2026-03-31");
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);

    employeesWriter.writeRow([
      `EMP${String(i).padStart(6, "0")}`,
      fullName,
      email,
      phone,
      roleName,
      branchId,
      managerEmployeeId,
      chance(0.96),
      hiredAt,
      iso(createdAt),
    ]);
  }

  // =========================
  // 5) kyc_records
  // =========================
  const kycWriter = new CsvWriter(path.join(OUTPUT_DIR, "kyc_records.csv"), [
    "user_id",
    "kyc_status",
    "verification_level",
    "document_type",
    "document_number",
    "verified_by_employee_id",
    "submitted_at",
    "verified_at",
    "expires_at",
    "rejection_reason",
    "created_at",
  ]);

  const kycStatuses = ["pending", "in_review", "verified", "rejected", "expired"];
  const verificationLevels = ["minimum", "full", "enhanced"];
  const documentTypes = [
    "passport",
    "national_id",
    "driver_license",
    "tax_id",
    "utility_bill",
  ];

  for (let userId = 1; userId <= CONFIG.users; userId++) {
    if (!chance(0.86)) continue;
    const kycStatus = pick(kycStatuses);
    const verificationLevel = pick(verificationLevels);
    const documentType = chance(0.95) ? pick(documentTypes) : null;
    const documentNumber = documentType ? buildUnique("DOC", userId) : null;
    const submittedAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);

    const verifiedByEmployeeId =
      kycStatus === "verified" ? randInt(1, CONFIG.employees) : null;
    const verifiedAt =
      kycStatus === "verified"
        ? randomDateTimeBetween(submittedAt, DATE_RANGE.end)
        : null;
    const expiresAt = chance(0.6)
      ? randomDateTimeBetween(submittedAt, new Date("2027-12-31T00:00:00.000Z"))
      : null;
    const rejectionReason =
      kycStatus === "rejected" ? faker.lorem.sentence() : null;

    kycWriter.writeRow([
      userId,
      kycStatus,
      verificationLevel,
      documentType,
      documentNumber,
      verifiedByEmployeeId,
      iso(submittedAt),
      iso(verifiedAt),
      iso(expiresAt),
      rejectionReason,
      iso(submittedAt),
    ]);
  }

  // =========================
  // 6) beneficiaries
  // =========================
  const beneficiariesWriter = new CsvWriter(path.join(OUTPUT_DIR, "beneficiaries.csv"), [
    "user_id",
    "beneficiary_name",
    "bank_name",
    "account_number",
    "routing_code",
    "country",
    "beneficiary_type",
    "is_verified",
    "added_at",
  ]);

  const beneficiaryTypes = ["internal", "domestic_external", "international"];
  let beneficiaryCounter = 1;
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    if (!chance(CONFIG.beneficiariesUsersRate)) continue;
    const n = randInt(CONFIG.beneficiariesPerUserMin, CONFIG.beneficiariesPerUserMax);
    for (let j = 0; j < n; j++) {
      const beneficiaryType = pick(beneficiaryTypes);
      const routingCode =
        beneficiaryType === "internal" ? null : `RT${String(beneficiaryCounter).padStart(8, "0")}`;
      beneficiariesWriter.writeRow([
        userId,
        faker.person.fullName(),
        `${faker.company.name()} Bank`,
        `ACCT${String(beneficiaryCounter).padStart(10, "0")}`,
        routingCode,
        userCountry[userId],
        beneficiaryType,
        chance(0.7),
        iso(randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end)),
      ]);
      beneficiaryCounter++;
    }
  }

  // =========================
  // 7) account_products
  // =========================
  const productsWriter = new CsvWriter(path.join(OUTPUT_DIR, "account_products.csv"), [
    "product_name",
    "product_type",
    "currency",
    "minimum_balance",
    "overdraft_allowed",
    "overdraft_limit",
    "interest_rate",
    "monthly_fee",
    "is_active",
    "created_at",
  ]);

  const productTemplates = [
    { name: "Everyday Savings", type: "savings", overdraft: false, minBal: 0, ir: 1.25, fee: 0 },
    { name: "Premium Savings", type: "savings", overdraft: false, minBal: 500, ir: 2.35, fee: 5 },
    { name: "Basic Checking", type: "checking", overdraft: true, minBal: 0, ir: 0, fee: 0 },
    { name: "Salary Account", type: "salary", overdraft: true, minBal: 0, ir: 0.25, fee: 0 },
    { name: "Wallet Lite", type: "wallet", overdraft: false, minBal: 0, ir: 0, fee: 0 },
    { name: "Fixed Deposit", type: "fixed_deposit", overdraft: false, minBal: 1000, ir: 5.1, fee: 0 },
    { name: "Recurring Deposit", type: "recurring_deposit", overdraft: false, minBal: 100, ir: 4.2, fee: 0 },
    { name: "Student Checking", type: "checking", overdraft: false, minBal: 0, ir: 0, fee: 0 },
  ];

  const accountProducts = productTemplates.slice(0, CONFIG.accountProducts);
  for (let i = 0; i < accountProducts.length; i++) {
    const p = accountProducts[i];
    const currency = i % 5 === 0 ? "USD" : pick(["USD", "EUR", "INR", "GBP", "CAD"]);
    const overdraftLimit = p.overdraft ? money(50, 1200) : 0;
    productsWriter.writeRow([
      p.name,
      p.type,
      currency,
      Number(p.minBal).toFixed(2),
      p.overdraft,
      Number(overdraftLimit).toFixed(2),
      Number(p.ir).toFixed(4),
      Number(p.fee).toFixed(2),
      true,
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 8) accounts
  // =========================
  const accountsWriter = new CsvWriter(path.join(OUTPUT_DIR, "accounts.csv"), [
    "account_number",
    "iban",
    "user_id",
    "product_id",
    "primary_branch_id",
    "account_status",
    "opened_at",
    "closed_at",
    "available_balance",
    "current_balance",
    "hold_balance",
    "currency",
    "is_joint_account",
    "created_at",
  ]);

  const accountStatuses = ["pending", "active", "frozen", "dormant", "closed", "blocked"];

  let accountId = 0;
  const accountToUser = [null];
  const accountToCurrency = [null];
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const n = randInt(CONFIG.accountsPerUserMin, CONFIG.accountsPerUserMax);
    for (let j = 0; j < n; j++) {
      accountId++;
      const productId = randInt(1, accountProducts.length);
      const currency = currenciesByCountry[userCountry[userId]] || "USD";
      const openedAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
      const status = pick(accountStatuses);
      const isClosed = status === "closed";
      const closedAt = isClosed ? randomDateTimeBetween(openedAt, DATE_RANGE.end) : null;
      const currentBalance = money(0, 100_000);
      const holdBalance = money(0, Math.min(currentBalance, 10_000));
      const availableBalance = Math.max(0, currentBalance - holdBalance);

      const isJoint = chance(0.1);

      const iban = currency === "EUR" ? genIban(accountId, "DE") : null;

      accountToUser[accountId] = userId;
      accountToCurrency[accountId] = currency;

      accountsWriter.writeRow([
        `BA${String(accountId).padStart(12, "0")}`,
        iban,
        userId,
        productId,
        chance(0.9) ? randInt(1, CONFIG.branches) : null,
        status,
        iso(openedAt),
        iso(closedAt),
        Number(availableBalance).toFixed(2),
        Number(currentBalance).toFixed(2),
        Number(holdBalance).toFixed(2),
        currency,
        isJoint,
        iso(openedAt),
      ]);
    }
  }

  const accountsTotal = accountId;

  // =========================
  // 9) account_holders
  // =========================
  const holdersWriter = new CsvWriter(path.join(OUTPUT_DIR, "account_holders.csv"), [
    "account_id",
    "user_id",
    "holder_role",
    "ownership_percent",
    "added_at",
  ]);

  for (let accId = 1; accId <= accountsTotal; accId++) {
    const userId = accountToUser[accId];
    holdersWriter.writeRow([
      accId,
      userId,
      "primary",
      "100.00",
      iso(randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end)),
    ]);
    // joint holder occasionally
    if (chance(0.1)) {
      let jointUser = randInt(1, CONFIG.users);
      if (jointUser === userId) jointUser = clampNumber(jointUser + 1, 1, CONFIG.users);
      holdersWriter.writeRow([
        accId,
        jointUser,
        "joint",
        "50.00",
        iso(randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end)),
      ]);
    }
  }

  // =========================
  // 10) account_limits
  // =========================
  const limitsWriter = new CsvWriter(path.join(OUTPUT_DIR, "account_limits.csv"), [
    "account_id",
    "daily_withdrawal_limit",
    "daily_transfer_limit",
    "monthly_transfer_limit",
    "atm_limit",
    "pos_limit",
    "online_purchase_limit",
    "updated_at",
  ]);

  for (let accId = 1; accId <= accountsTotal; accId++) {
    limitsWriter.writeRow([
      accId,
      Number(money(100, 5000)).toFixed(2),
      Number(money(500, 20_000)).toFixed(2),
      Number(money(10_000, 250_000)).toFixed(2),
      Number(money(100, 3000)).toFixed(2),
      Number(money(500, 15_000)).toFixed(2),
      Number(money(500, 30_000)).toFixed(2),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 11) transaction_categories
  // =========================
  const categoryWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "transaction_categories.csv"),
    ["category_name", "category_group", "created_at"],
  );

  const categories = [
    ["Salary", "income"],
    ["Interest", "income"],
    ["Cash Withdrawal", "cash"],
    ["ATM Fee", "fee"],
    ["Card Purchase", "card"],
    ["Bill Payment", "bill"],
    ["Internal Transfer", "transfer"],
    ["External Transfer", "transfer"],
    ["Loan EMI", "loan"],
    ["Investment", "investment"],
    ["Merchant POS", "merchant"],
    ["Refund", "income"],
    ["Chargeback", "card"],
    ["Service Fee", "fee"],
    ["Other", "other"],
  ];

  for (let i = 0; i < categories.length; i++) {
    categoryWriter.writeRow([
      categories[i][0],
      categories[i][1],
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 12) merchants
  // =========================
  const merchantsWriter = new CsvWriter(path.join(OUTPUT_DIR, "merchants.csv"), [
    "merchant_name",
    "merchant_category",
    "merchant_country",
    "onboarding_status",
    "created_at",
  ]);

  const merchantStatuses = ["pending", "active", "suspended", "terminated"];
  const merchantCategories = ["grocery", "fuel", "travel", "dining", "ecommerce", "utilities", "other"];
  for (let i = 1; i <= CONFIG.merchants; i++) {
    merchantsWriter.writeRow([
      faker.company.name(),
      pick(merchantCategories),
      pick(countries),
      pick(merchantStatuses),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 13) transactions
  // =========================
  const transactionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "transactions.csv"), [
    "transaction_ref",
    "account_id",
    "category_id",
    "initiated_by_user_id",
    "channel",
    "transaction_type",
    "transaction_status",
    "amount",
    "currency",
    "description",
    "merchant_name",
    "counterparty_name",
    "counterparty_account",
    "running_balance",
    "initiated_at",
    "posted_at",
    "value_date",
    "external_reference",
    "created_at",
  ]);

  const txnChannels = [
    "branch",
    "atm",
    "online",
    "mobile",
    "api",
    "card_network",
    "auto_debit",
    "internal_batch",
  ];
  const txnTypes = ["credit", "debit"];
  const txnStatuses = ["pending", "posted", "failed", "reversed", "cancelled"];

  for (let i = 1; i <= CONFIG.transactions; i++) {
    const accId = randInt(1, accountsTotal);
    const userId = accountToUser[accId];
    const initiatedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(txnStatuses);
    const postedAt =
      status === "posted" || status === "reversed"
        ? randomDateTimeBetween(initiatedAt, DATE_RANGE.end)
        : null;

    const amount = money(1, 5000);
    const runningBalance = money(0, 150_000);
    const categoryId = randInt(1, categories.length);
    const currency = accountToCurrency[accId] || "USD";

    transactionsWriter.writeRow([
      `TXN${String(i).padStart(12, "0")}`,
      accId,
      chance(0.92) ? categoryId : null,
      chance(0.9) ? userId : null,
      pick(txnChannels),
      pick(txnTypes),
      status,
      Number(amount).toFixed(2),
      currency,
      chance(0.7) ? faker.lorem.sentence() : null,
      chance(0.45) ? faker.company.name() : null,
      chance(0.4) ? faker.person.fullName() : null,
      chance(0.35) ? `CP${String(randInt(1, 999999999)).padStart(9, "0")}` : null,
      Number(runningBalance).toFixed(2),
      iso(initiatedAt),
      iso(postedAt),
      initiatedAt.toISOString().slice(0, 10),
      chance(0.2) ? buildUnique("EXT", i) : null,
      iso(initiatedAt),
    ]);
  }

  // =========================
  // 14) transfers (txn links nullable)
  // =========================
  const transfersWriter = new CsvWriter(path.join(OUTPUT_DIR, "transfers.csv"), [
    "transfer_ref",
    "from_account_id",
    "to_account_id",
    "beneficiary_id",
    "debit_transaction_id",
    "credit_transaction_id",
    "transfer_type",
    "transfer_status",
    "amount",
    "fee_amount",
    "fx_rate",
    "source_currency",
    "destination_currency",
    "scheduled_for",
    "completed_at",
    "created_at",
  ]);

  const transferTypes = ["internal", "domestic_external", "international", "scheduled"];
  const transferStatuses = ["pending", "processing", "completed", "failed", "cancelled", "reversed"];

  // beneficiaries are inserted in order, so beneficiary IDs = 1..beneficiaryCounter-1
  const beneficiariesTotal = beneficiaryCounter - 1;

  for (let i = 1; i <= CONFIG.transfers; i++) {
    const fromAccountId = randInt(1, accountsTotal);
    const transferType = pick(transferTypes);
    const amount = money(5, 15_000);
    const fee = amount < 100 ? 0 : money(0, 25);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const scheduledFor = transferType === "scheduled" ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;
    const status = pick(transferStatuses);
    const completedAt =
      status === "completed" ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;

    let toAccountId = null;
    let beneficiaryId = null;
    if (transferType === "internal") {
      toAccountId = randInt(1, accountsTotal);
      if (toAccountId === fromAccountId) toAccountId = clampNumber(toAccountId + 1, 1, accountsTotal);
    } else if (beneficiariesTotal > 0) {
      beneficiaryId = randInt(1, beneficiariesTotal);
    }

    const sourceCurrency = accountToCurrency[fromAccountId] || "USD";
    const destinationCurrency =
      transferType === "international" ? pick(["USD", "EUR", "INR", "GBP", "CAD"]) : sourceCurrency;
    const fxRate = transferType === "international" && sourceCurrency !== destinationCurrency
      ? faker.number.float({ min: 0.7, max: 1.4, fractionDigits: 8 })
      : null;

    transfersWriter.writeRow([
      `TRF${String(i).padStart(12, "0")}`,
      fromAccountId,
      toAccountId,
      beneficiaryId,
      null,
      null,
      transferType,
      status,
      Number(amount).toFixed(2),
      Number(fee).toFixed(2),
      fxRate !== null ? String(fxRate) : null,
      sourceCurrency,
      destinationCurrency,
      scheduledFor,
      completedAt,
      iso(createdAt),
    ]);
  }

  // =========================
  // 15) cards
  // =========================
  const cardsWriter = new CsvWriter(path.join(OUTPUT_DIR, "cards.csv"), [
    "account_id",
    "card_type",
    "network",
    "masked_card_number",
    "cardholder_name",
    "issued_at",
    "expires_at",
    "card_status",
    "is_contactless_enabled",
    "is_international_enabled",
    "created_at",
  ]);

  const cardTypes = ["debit", "credit", "prepaid", "virtual"];
  const cardNetworks = ["visa", "mastercard", "rupay", "amex", "discover"];
  const cardStatuses = [
    "active",
    "blocked",
    "expired",
    "closed",
    "hotlisted",
    "pending_activation",
  ];

  let cardId = 0;
  const cardToAccount = [null];
  for (let accId = 1; accId <= accountsTotal; accId++) {
    if (!chance(CONFIG.cardsPerAccountRate)) continue;
    cardId++;
    cardToAccount[cardId] = accId;
    const issuedAt = faker.date.between({ from: "2018-01-01", to: "2026-03-31" });
    const expiresAt = new Date(issuedAt);
    expiresAt.setFullYear(expiresAt.getFullYear() + 4);

    cardsWriter.writeRow([
      accId,
      chance(0.75) ? "debit" : pick(cardTypes),
      pick(cardNetworks),
      buildMaskedCardNumber(cardId),
      faker.person.fullName(),
      issuedAt.toISOString().slice(0, 10),
      expiresAt.toISOString().slice(0, 10),
      pick(cardStatuses),
      chance(0.9),
      chance(0.35),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  const cardsTotal = cardId;

  // =========================
  // 16) card_transactions (transaction_id nullable)
  // =========================
  const cardTxnWriter = new CsvWriter(path.join(OUTPUT_DIR, "card_transactions.csv"), [
    "card_id",
    "account_id",
    "transaction_id",
    "merchant_name",
    "merchant_category_code",
    "merchant_country",
    "entry_mode",
    "settlement_amount",
    "billing_amount",
    "billing_currency",
    "auth_code",
    "transaction_status",
    "transaction_at",
    "created_at",
  ]);

  const entryModes = ["chip", "swipe", "tap", "online", "manual"];
  const cardTxnStatuses = ["authorized", "settled", "declined", "reversed", "chargeback"];

  for (let i = 1; i <= CONFIG.cardTransactions; i++) {
    const card = randInt(1, Math.max(1, cardsTotal));
    const accId = cardToAccount[card] || randInt(1, accountsTotal);
    const at = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const settlement = money(0, 2500);
    const billing = settlement * faker.number.float({ min: 0.9, max: 1.05, fractionDigits: 2 });

    cardTxnWriter.writeRow([
      card,
      accId,
      null,
      faker.company.name(),
      String(randInt(1000, 9999)),
      pick(countries),
      pick(entryModes),
      Number(settlement).toFixed(2),
      Number(billing).toFixed(2),
      accountToCurrency[accId] || "USD",
      `AU${String(i).padStart(6, "0")}`,
      pick(cardTxnStatuses),
      iso(at),
      iso(at),
    ]);
  }

  // =========================
  // 17) atm_machines
  // =========================
  const atmWriter = new CsvWriter(path.join(OUTPUT_DIR, "atm_machines.csv"), [
    "atm_code",
    "branch_id",
    "city",
    "country",
    "atm_status",
    "installed_at",
    "created_at",
  ]);

  const atmStatuses = ["active", "offline", "maintenance", "retired"];
  for (let i = 1; i <= CONFIG.atms; i++) {
    const branchId = chance(0.85) ? randInt(1, CONFIG.branches) : null;
    const country = branchId ? branchCountry[branchId] : pick(countries);
    const city = branchId ? branchCity[branchId] : faker.location.city();
    atmWriter.writeRow([
      `ATM${String(i).padStart(6, "0")}`,
      branchId,
      city,
      country,
      pick(atmStatuses),
      randomDateBetween("2010-01-01", "2026-03-31"),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 18) atm_transactions
  // =========================
  const atmTxnWriter = new CsvWriter(path.join(OUTPUT_DIR, "atm_transactions.csv"), [
    "atm_id",
    "card_id",
    "account_id",
    "transaction_id",
    "atm_transaction_type",
    "amount",
    "atm_fee",
    "transaction_status",
    "transaction_at",
    "created_at",
  ]);

  const atmTxnTypes = [
    "cash_withdrawal",
    "balance_inquiry",
    "mini_statement",
    "cash_deposit",
    "pin_change",
  ];
  const atmTxnStatuses = ["success", "failed", "reversed"];

  for (let i = 1; i <= CONFIG.atmTransactions; i++) {
    const accId = randInt(1, accountsTotal);
    const atmId = randInt(1, CONFIG.atms);
    const at = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const atmTxnType = pick(atmTxnTypes);
    const amount = atmTxnType === "cash_withdrawal" || atmTxnType === "cash_deposit" ? money(0, 1000) : 0;
    atmTxnWriter.writeRow([
      atmId,
      chance(0.7) && cardsTotal > 0 ? randInt(1, cardsTotal) : null,
      accId,
      null,
      atmTxnType,
      Number(amount).toFixed(2),
      Number(money(0, 4)).toFixed(2),
      pick(atmTxnStatuses),
      iso(at),
      iso(at),
    ]);
  }

  // =========================
  // 19) billers
  // =========================
  const billersWriter = new CsvWriter(path.join(OUTPUT_DIR, "billers.csv"), [
    "biller_name",
    "biller_category",
    "country",
    "is_active",
    "created_at",
  ]);

  const billerCategories = [
    "electricity",
    "water",
    "gas",
    "internet",
    "mobile",
    "insurance",
    "education",
    "government",
    "other",
  ];
  for (let i = 1; i <= CONFIG.billers; i++) {
    billersWriter.writeRow([
      `Biller ${i}`,
      pick(billerCategories),
      pick(countries),
      chance(0.92),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 20) bill_payments
  // =========================
  const billPayWriter = new CsvWriter(path.join(OUTPUT_DIR, "bill_payments.csv"), [
    "account_id",
    "biller_id",
    "transaction_id",
    "bill_reference",
    "amount",
    "due_date",
    "payment_status",
    "paid_at",
    "created_at",
  ]);

  const billPayStatuses = ["scheduled", "processing", "paid", "failed", "cancelled"];
  for (let i = 1; i <= CONFIG.billPayments; i++) {
    const accId = randInt(1, accountsTotal);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(billPayStatuses);
    const paidAt =
      status === "paid" ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;
    billPayWriter.writeRow([
      accId,
      randInt(1, CONFIG.billers),
      null,
      `BILL${String(i).padStart(10, "0")}`,
      Number(money(5, 500)).toFixed(2),
      randomDateBetween("2024-01-01", "2026-12-31"),
      status,
      paidAt,
      iso(createdAt),
    ]);
  }

  // =========================
  // 21) loan_products
  // =========================
  const loanProductsWriter = new CsvWriter(path.join(OUTPUT_DIR, "loan_products.csv"), [
    "product_name",
    "loan_type",
    "min_principal",
    "max_principal",
    "min_interest_rate",
    "max_interest_rate",
    "max_term_months",
    "requires_collateral",
    "is_active",
    "created_at",
  ]);

  const loanTypes = ["personal", "home", "auto", "education", "business", "credit_line"];
  for (let i = 1; i <= CONFIG.loanProducts; i++) {
    const loanType = pick(loanTypes);
    const minPrincipal = loanType === "home" ? 50_000 : 1_000;
    const maxPrincipal = loanType === "home" ? 900_000 : 80_000;
    const minRate = loanType === "home" ? 3.25 : 7.5;
    const maxRate = loanType === "home" ? 10.5 : 24.0;
    const maxTerm = loanType === "home" ? 360 : 84;
    loanProductsWriter.writeRow([
      `${loanType.toUpperCase()} Loan ${i}`,
      loanType,
      Number(minPrincipal).toFixed(2),
      Number(maxPrincipal).toFixed(2),
      Number(minRate).toFixed(4),
      Number(maxRate).toFixed(4),
      maxTerm,
      loanType === "home" || loanType === "auto",
      true,
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 22) loan_applications
  // =========================
  const loanAppsWriter = new CsvWriter(path.join(OUTPUT_DIR, "loan_applications.csv"), [
    "application_ref",
    "user_id",
    "loan_product_id",
    "assigned_employee_id",
    "requested_amount",
    "requested_term_months",
    "annual_income",
    "credit_score",
    "application_status",
    "applied_at",
    "decision_at",
    "rejection_reason",
    "created_at",
  ]);

  const loanAppStatuses = [
    "submitted",
    "under_review",
    "approved",
    "rejected",
    "cancelled",
    "disbursed",
  ];

  const loanAppStatusById = new Array(CONFIG.loanApplications + 1);
  const loanAppUserById = new Array(CONFIG.loanApplications + 1);
  const loanAppProductById = new Array(CONFIG.loanApplications + 1);
  const loanAppAmountById = new Array(CONFIG.loanApplications + 1);
  const loanAppTermById = new Array(CONFIG.loanApplications + 1);
  const loanAppAppliedAtById = new Array(CONFIG.loanApplications + 1);

  for (let i = 1; i <= CONFIG.loanApplications; i++) {
    const userId = randInt(1, CONFIG.users);
    const loanProductId = randInt(1, CONFIG.loanProducts);
    const appliedAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    const applicationStatus = pick(loanAppStatuses);
    const decisionAt =
      applicationStatus === "approved" ||
      applicationStatus === "rejected" ||
      applicationStatus === "disbursed"
        ? randomDateTimeBetween(appliedAt, DATE_RANGE.end)
        : null;
    const rejectionReason =
      applicationStatus === "rejected" ? faker.lorem.sentence() : null;

    const requestedAmount = money(1_000, 250_000);
    const requestedTermMonths = randInt(6, 120);

    loanAppStatusById[i] = applicationStatus;
    loanAppUserById[i] = userId;
    loanAppProductById[i] = loanProductId;
    loanAppAmountById[i] = requestedAmount;
    loanAppTermById[i] = requestedTermMonths;
    loanAppAppliedAtById[i] = appliedAt;

    loanAppsWriter.writeRow([
      `LAPP${String(i).padStart(10, "0")}`,
      userId,
      loanProductId,
      chance(0.7) ? randInt(1, CONFIG.employees) : null,
      Number(requestedAmount).toFixed(2),
      requestedTermMonths,
      chance(0.9) ? Number(money(18_000, 240_000)).toFixed(2) : null,
      chance(0.9) ? randInt(300, 900) : null,
      applicationStatus,
      iso(appliedAt),
      iso(decisionAt),
      rejectionReason,
      iso(appliedAt),
    ]);
  }

  // =========================
  // 23) loans
  // =========================
  const loansWriter = new CsvWriter(path.join(OUTPUT_DIR, "loans.csv"), [
    "loan_account_number",
    "application_id",
    "borrower_user_id",
    "loan_product_id",
    "disbursement_account_id",
    "principal_amount",
    "outstanding_principal",
    "annual_interest_rate",
    "term_months",
    "emi_amount",
    "loan_status",
    "disbursed_at",
    "maturity_date",
    "closed_at",
    "created_at",
  ]);

  let loanId = 0;
  const loanToBorrower = [null];
  const loanToDisbAccount = [null];

  for (let appId = 1; appId <= CONFIG.loanApplications; appId++) {
    const status = loanAppStatusById[appId];
    const shouldCreateLoan =
      (status === "approved" || status === "disbursed") && chance(CONFIG.loansRateFromApplications);
    if (!shouldCreateLoan) continue;

    loanId++;
    const borrowerUserId = loanAppUserById[appId];
    const loanProductId = loanAppProductById[appId];
    const principal = Number(loanAppAmountById[appId]);
    const outstanding = principal * faker.number.float({ min: 0.2, max: 1, fractionDigits: 2 });
    const annualInterestRate = faker.number.float({ min: 4.5, max: 22.0, fractionDigits: 4 });
    const termMonths = loanAppTermById[appId];
    const emiAmount = principal / termMonths + (principal * annualInterestRate) / 1200;
    const disbursedAt = randomDateTimeBetween(loanAppAppliedAtById[appId], DATE_RANGE.end);
    const maturityDate = new Date(disbursedAt);
    maturityDate.setMonth(maturityDate.getMonth() + termMonths);
    const loanStatus = chance(0.88) ? "active" : pick(["closed", "defaulted", "settled"]);
    const closedAt = loanStatus === "closed" ? iso(randomDateTimeBetween(disbursedAt, DATE_RANGE.end)) : null;
    const disbursementAccountId = chance(0.75) ? randInt(1, accountsTotal) : null;

    loanToBorrower[loanId] = borrowerUserId;
    loanToDisbAccount[loanId] = disbursementAccountId;

    loansWriter.writeRow([
      `LN${String(loanId).padStart(12, "0")}`,
      appId,
      borrowerUserId,
      loanProductId,
      disbursementAccountId,
      principal.toFixed(2),
      Number(outstanding).toFixed(2),
      String(annualInterestRate),
      termMonths,
      Number(emiAmount).toFixed(2),
      loanStatus,
      iso(disbursedAt),
      maturityDate.toISOString().slice(0, 10),
      closedAt,
      iso(disbursedAt),
    ]);
  }

  const loansTotal = loanId;

  // =========================
  // 24) loan_repayments
  // =========================
  const repaymentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "loan_repayments.csv"), [
    "loan_id",
    "debit_account_id",
    "transaction_id",
    "installment_number",
    "due_date",
    "paid_date",
    "principal_component",
    "interest_component",
    "penalty_component",
    "total_due",
    "total_paid",
    "repayment_status",
    "created_at",
  ]);

  const repaymentStatuses = ["pending", "paid", "partial", "late", "waived"];

  for (let lId = 1; lId <= loansTotal; lId++) {
    const borrower = loanToBorrower[lId];
    const debitAccountId = chance(0.7) ? randInt(1, accountsTotal) : null;

    const repaymentCount = randInt(6, CONFIG.repaymentsPerLoanMax);
    const start = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    for (let n = 1; n <= repaymentCount; n++) {
      const due = new Date(start);
      due.setMonth(due.getMonth() + n);
      const status = pick(repaymentStatuses);
      const paidDate =
        status === "paid" || status === "partial"
          ? new Date(due.getTime() + randInt(-2, 20) * 24 * 60 * 60 * 1000)
          : null;

      const principalComponent = money(50, 800);
      const interestComponent = money(10, 200);
      const penaltyComponent = status === "late" ? money(0, 25) : 0;
      const totalDue = principalComponent + interestComponent + penaltyComponent;
      const totalPaid =
        status === "paid"
          ? totalDue
          : status === "partial"
            ? money(0, totalDue)
            : 0;

      repaymentsWriter.writeRow([
        lId,
        debitAccountId,
        null,
        n,
        due.toISOString().slice(0, 10),
        paidDate ? paidDate.toISOString().slice(0, 10) : null,
        Number(principalComponent).toFixed(2),
        Number(interestComponent).toFixed(2),
        Number(penaltyComponent).toFixed(2),
        Number(totalDue).toFixed(2),
        Number(totalPaid).toFixed(2),
        status,
        iso(due),
      ]);
    }
  }

  // =========================
  // 25) fixed_deposits
  // =========================
  const fdWriter = new CsvWriter(path.join(OUTPUT_DIR, "fixed_deposits.csv"), [
    "fd_number",
    "user_id",
    "funding_account_id",
    "principal_amount",
    "annual_interest_rate",
    "tenure_months",
    "start_date",
    "maturity_date",
    "maturity_amount",
    "payout_type",
    "fd_status",
    "created_at",
  ]);

  const payoutTypes = ["cumulative", "monthly", "quarterly", "at_maturity"];
  const fdStatuses = ["active", "matured", "premature_closed"];

  for (let i = 1; i <= CONFIG.fixedDeposits; i++) {
    const userId = randInt(1, CONFIG.users);
    const startDate = faker.date.between({ from: "2024-01-01", to: "2026-03-01" });
    const tenure = randInt(3, 36);
    const maturityDate = new Date(startDate);
    maturityDate.setMonth(maturityDate.getMonth() + tenure);
    const principal = money(500, 200_000);
    const rate = faker.number.float({ min: 2.5, max: 8.5, fractionDigits: 4 });
    const maturityAmount = principal * (1 + (rate / 100) * (tenure / 12));

    fdWriter.writeRow([
      `FD${String(i).padStart(10, "0")}`,
      userId,
      chance(0.7) ? randInt(1, accountsTotal) : null,
      Number(principal).toFixed(2),
      String(rate),
      tenure,
      startDate.toISOString().slice(0, 10),
      maturityDate.toISOString().slice(0, 10),
      Number(maturityAmount).toFixed(2),
      pick(payoutTypes),
      pick(fdStatuses),
      iso(startDate),
    ]);
  }

  // =========================
  // 26) recurring_deposits
  // =========================
  const rdWriter = new CsvWriter(path.join(OUTPUT_DIR, "recurring_deposits.csv"), [
    "rd_number",
    "user_id",
    "debit_account_id",
    "monthly_amount",
    "annual_interest_rate",
    "tenure_months",
    "start_date",
    "maturity_date",
    "rd_status",
    "created_at",
  ]);

  const rdStatuses = ["active", "matured", "defaulted", "closed"];
  for (let i = 1; i <= CONFIG.recurringDeposits; i++) {
    const userId = randInt(1, CONFIG.users);
    const startDate = faker.date.between({ from: "2024-01-01", to: "2026-03-01" });
    const tenure = randInt(6, 60);
    const maturityDate = new Date(startDate);
    maturityDate.setMonth(maturityDate.getMonth() + tenure);
    const monthlyAmount = money(25, 2000);
    const rate = faker.number.float({ min: 2.0, max: 7.0, fractionDigits: 4 });

    rdWriter.writeRow([
      `RD${String(i).padStart(10, "0")}`,
      userId,
      chance(0.85) ? randInt(1, accountsTotal) : null,
      Number(monthlyAmount).toFixed(2),
      String(rate),
      tenure,
      startDate.toISOString().slice(0, 10),
      maturityDate.toISOString().slice(0, 10),
      pick(rdStatuses),
      iso(startDate),
    ]);
  }

  // =========================
  // 27) reward_programs
  // =========================
  const rewardsWriter = new CsvWriter(path.join(OUTPUT_DIR, "reward_programs.csv"), [
    "program_name",
    "program_type",
    "point_expiry_months",
    "is_active",
    "created_at",
  ]);

  const rewardTypes = ["card_rewards", "cashback", "loyalty", "referral"];
  for (let i = 1; i <= CONFIG.rewardPrograms; i++) {
    rewardsWriter.writeRow([
      `Rewards Program ${i}`,
      pick(rewardTypes),
      chance(0.7) ? randInt(6, 36) : null,
      chance(0.95),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
    ]);
  }

  // =========================
  // 28) reward_earnings
  // =========================
  const rewardEarningsWriter = new CsvWriter(path.join(OUTPUT_DIR, "reward_earnings.csv"), [
    "program_id",
    "user_id",
    "card_transaction_id",
    "points_earned",
    "cashback_amount",
    "earned_at",
    "expires_at",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.rewardEarnings; i++) {
    const earnedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const expiresAt = chance(0.7)
      ? iso(new Date(earnedAt.getTime() + randInt(30, 540) * 24 * 60 * 60 * 1000))
      : null;
    rewardEarningsWriter.writeRow([
      randInt(1, CONFIG.rewardPrograms),
      randInt(1, CONFIG.users),
      null,
      Number(money(0, 250)).toFixed(2),
      Number(money(0, 25)).toFixed(2),
      iso(earnedAt),
      expiresAt,
      iso(earnedAt),
    ]);
  }

  // =========================
  // 29) reward_redemptions
  // =========================
  const rewardRedemptionsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "reward_redemptions.csv"),
    [
      "program_id",
      "user_id",
      "redemption_type",
      "points_redeemed",
      "cashback_amount",
      "redeemed_at",
      "created_at",
    ],
  );

  const redemptionTypes = ["cashback", "voucher", "statement_credit", "gift"];
  for (let i = 1; i <= CONFIG.rewardRedemptions; i++) {
    const redeemedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    rewardRedemptionsWriter.writeRow([
      randInt(1, CONFIG.rewardPrograms),
      randInt(1, CONFIG.users),
      pick(redemptionTypes),
      Number(money(0, 500)).toFixed(2),
      Number(money(0, 35)).toFixed(2),
      iso(redeemedAt),
      iso(redeemedAt),
    ]);
  }

  // =========================
  // 30) complaints
  // =========================
  const complaintsWriter = new CsvWriter(path.join(OUTPUT_DIR, "complaints.csv"), [
    "complaint_ref",
    "user_id",
    "account_id",
    "card_id",
    "assigned_employee_id",
    "complaint_type",
    "complaint_status",
    "priority",
    "resolution_time_mins",
    "created_at",
    "resolved_at",
  ]);

  const complaintTypes = ["transaction", "card", "loan", "account", "atm", "service", "fraud", "other"];
  const complaintStatuses = ["open", "in_progress", "resolved", "closed", "rejected"];
  const priorities = ["low", "medium", "high", "critical"];

  for (let i = 1; i <= CONFIG.complaints; i++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(complaintStatuses);
    const resolvedAt =
      status === "resolved" || status === "closed"
        ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end))
        : null;
    const resolutionTime =
      resolvedAt !== null ? randInt(5, 60 * 24 * 14) : null;
    complaintsWriter.writeRow([
      `CMP${String(i).padStart(10, "0")}`,
      chance(0.9) ? randInt(1, CONFIG.users) : null,
      chance(0.55) ? randInt(1, accountsTotal) : null,
      chance(0.25) && cardsTotal > 0 ? randInt(1, cardsTotal) : null,
      chance(0.65) ? randInt(1, CONFIG.employees) : null,
      pick(complaintTypes),
      status,
      pick(priorities),
      resolutionTime,
      iso(createdAt),
      resolvedAt,
    ]);
  }

  // =========================
  // 31) fraud_alerts
  // =========================
  const fraudWriter = new CsvWriter(path.join(OUTPUT_DIR, "fraud_alerts.csv"), [
    "alert_ref",
    "user_id",
    "account_id",
    "card_id",
    "transaction_id",
    "card_transaction_id",
    "alert_type",
    "severity",
    "alert_status",
    "detected_at",
    "resolved_at",
    "created_at",
  ]);

  const alertTypes = [
    "velocity",
    "geo_mismatch",
    "high_value",
    "merchant_risk",
    "atm_risk",
    "identity_risk",
    "loan_fraud",
    "other",
  ];
  const severities = ["low", "medium", "high", "critical"];
  const alertStatuses = ["open", "under_review", "confirmed_fraud", "false_positive", "closed"];

  for (let i = 1; i <= CONFIG.fraudAlerts; i++) {
    const detectedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(alertStatuses);
    const resolvedAt =
      status === "closed" || status === "false_positive"
        ? iso(randomDateTimeBetween(detectedAt, DATE_RANGE.end))
        : null;
    fraudWriter.writeRow([
      `FRA${String(i).padStart(10, "0")}`,
      chance(0.92) ? randInt(1, CONFIG.users) : null,
      chance(0.6) ? randInt(1, accountsTotal) : null,
      chance(0.3) && cardsTotal > 0 ? randInt(1, cardsTotal) : null,
      null,
      null,
      pick(alertTypes),
      pick(severities),
      status,
      iso(detectedAt),
      resolvedAt,
      iso(detectedAt),
    ]);
  }

  // =========================
  // 32) support_tickets
  // =========================
  const ticketsWriter = new CsvWriter(path.join(OUTPUT_DIR, "support_tickets.csv"), [
    "user_id",
    "account_id",
    "card_id",
    "loan_id",
    "assigned_employee_id",
    "issue_type",
    "ticket_status",
    "priority",
    "resolution_time_mins",
    "created_at",
    "resolved_at",
  ]);

  const issueTypes = ["account", "payment", "transfer", "card", "atm", "loan", "kyc", "fraud", "other"];
  const ticketStatuses = ["open", "in_progress", "resolved", "closed"];

  for (let i = 1; i <= CONFIG.supportTickets; i++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(ticketStatuses);
    const resolvedAt =
      status === "resolved" || status === "closed"
        ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end))
        : null;
    const resolutionTime = resolvedAt ? randInt(10, 60 * 24 * 10) : null;
    ticketsWriter.writeRow([
      chance(0.9) ? randInt(1, CONFIG.users) : null,
      chance(0.45) ? randInt(1, accountsTotal) : null,
      chance(0.25) && cardsTotal > 0 ? randInt(1, cardsTotal) : null,
      chance(0.15) && loansTotal > 0 ? randInt(1, loansTotal) : null,
      chance(0.7) ? randInt(1, CONFIG.employees) : null,
      pick(issueTypes),
      status,
      pick(priorities),
      resolutionTime,
      iso(createdAt),
      resolvedAt,
    ]);
  }

  // =========================
  // 33) notification_campaigns
  // =========================
  const campaignsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "notification_campaigns.csv"),
    [
      "campaign_name",
      "campaign_type",
      "target_audience",
      "scheduled_at",
      "sent_at",
      "status",
      "created_at",
    ],
  );

  const campaignTypes = ["email", "push", "sms", "in_app"];
  const campaignStatuses = ["draft", "scheduled", "sent", "cancelled"];

  for (let i = 1; i <= CONFIG.notificationCampaigns; i++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(campaignStatuses);
    const scheduledAt = status === "scheduled" || status === "sent"
      ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end))
      : null;
    const sentAt = status === "sent" && scheduledAt
      ? iso(randomDateTimeBetween(new Date(scheduledAt), DATE_RANGE.end))
      : null;
    campaignsWriter.writeRow([
      `Campaign ${i}`,
      pick(campaignTypes),
      pick(["all_users", "active_users", "hnwi", "students", "dormant_accounts"]),
      scheduledAt,
      sentAt,
      status,
      iso(createdAt),
    ]);
  }

  // =========================
  // 34) notification_deliveries
  // =========================
  const deliveriesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "notification_deliveries.csv"),
    [
      "campaign_id",
      "user_id",
      "account_id",
      "loan_id",
      "delivery_status",
      "delivered_at",
      "opened_at",
      "clicked_at",
      "created_at",
    ],
  );

  const deliveryStatuses = [
    "queued",
    "sent",
    "delivered",
    "opened",
    "clicked",
    "failed",
    "unsubscribed",
  ];
  for (let i = 1; i <= CONFIG.notificationDeliveries; i++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const status = pick(deliveryStatuses);
    const deliveredAt =
      status === "delivered" || status === "opened" || status === "clicked"
        ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end))
        : null;
    const openedAt =
      status === "opened" || status === "clicked"
        ? iso(randomDateTimeBetween(new Date(deliveredAt || createdAt), DATE_RANGE.end))
        : null;
    const clickedAt =
      status === "clicked"
        ? iso(randomDateTimeBetween(new Date(openedAt || deliveredAt || createdAt), DATE_RANGE.end))
        : null;
    deliveriesWriter.writeRow([
      randInt(1, CONFIG.notificationCampaigns),
      randInt(1, CONFIG.users),
      chance(0.25) ? randInt(1, accountsTotal) : null,
      chance(0.06) && loansTotal > 0 ? randInt(1, loansTotal) : null,
      status,
      deliveredAt,
      openedAt,
      clickedAt,
      iso(createdAt),
    ]);
  }

  // =========================
  // 35) audit_logs
  // =========================
  const auditWriter = new CsvWriter(path.join(OUTPUT_DIR, "audit_logs.csv"), [
    "actor_type",
    "actor_user_id",
    "actor_employee_id",
    "entity_name",
    "entity_id",
    "action_name",
    "ip_address",
    "event_time",
    "metadata",
  ]);

  const actorTypes = ["user", "employee", "system"];
  const entityNames = ["account", "transaction", "transfer", "card", "loan", "kyc", "profile", "biller"];
  const actionNames = ["create", "update", "delete", "freeze", "unfreeze", "verify", "reject", "approve"];

  for (let i = 1; i <= CONFIG.auditLogs; i++) {
    const actorType = pick(actorTypes);
    auditWriter.writeRow([
      actorType,
      actorType === "user" ? randInt(1, CONFIG.users) : null,
      actorType === "employee" ? randInt(1, CONFIG.employees) : null,
      pick(entityNames),
      randInt(1, Math.max(1, accountsTotal)),
      pick(actionNames),
      faker.internet.ip(),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
      json({ trace: buildUnique("AUD", i), ok: chance(0.98) }),
    ]);
  }

  // =========================
  // 36) app_events
  // =========================
  const eventsWriter = new CsvWriter(path.join(OUTPUT_DIR, "app_events.csv"), [
    "user_id",
    "account_id",
    "device_type",
    "event_name",
    "screen_name",
    "source_channel",
    "country",
    "event_time",
    "metadata",
  ]);

  const deviceTypes = ["ios", "android", "web", "desktop"];
  const eventNames = [
    "app_open",
    "login_success",
    "login_failed",
    "view_balance",
    "initiate_transfer",
    "submit_kyc",
    "pay_bill",
    "card_freeze",
    "report_issue",
  ];
  const screenNames = ["home", "accounts", "cards", "transfers", "payments", "loans", "support", "settings"];
  const sourceChannels = ["mobile", "web", "branch", "api", "partner"];

  for (let i = 1; i <= CONFIG.appEvents; i++) {
    const userId = chance(0.92) ? randInt(1, CONFIG.users) : null;
    const accountId = chance(0.55) ? randInt(1, accountsTotal) : null;
    eventsWriter.writeRow([
      userId,
      accountId,
      pick(deviceTypes),
      pick(eventNames),
      pick(screenNames),
      pick(sourceChannels),
      userId ? userCountry[userId] : pick(countries),
      iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
      json({ session: buildUnique("SESS", i), latency_ms: randInt(5, 6000) }),
    ]);
  }

  return Promise.all([
    usersWriter.close(),
    addressWriter.close(),
    branchesWriter.close(),
    employeesWriter.close(),
    kycWriter.close(),
    beneficiariesWriter.close(),
    productsWriter.close(),
    accountsWriter.close(),
    holdersWriter.close(),
    limitsWriter.close(),
    categoryWriter.close(),
    merchantsWriter.close(),
    transactionsWriter.close(),
    transfersWriter.close(),
    cardsWriter.close(),
    cardTxnWriter.close(),
    atmWriter.close(),
    atmTxnWriter.close(),
    billersWriter.close(),
    billPayWriter.close(),
    loanProductsWriter.close(),
    loanAppsWriter.close(),
    loansWriter.close(),
    repaymentsWriter.close(),
    fdWriter.close(),
    rdWriter.close(),
    rewardsWriter.close(),
    rewardEarningsWriter.close(),
    rewardRedemptionsWriter.close(),
    complaintsWriter.close(),
    fraudWriter.close(),
    ticketsWriter.close(),
    campaignsWriter.close(),
    deliveriesWriter.close(),
    auditWriter.close(),
    eventsWriter.close(),
  ]).then(() => {
    console.log(`✅ Bank seed CSVs written to ${OUTPUT_DIR}`);
    console.log(`- users: ${CONFIG.users}`);
    console.log(`- branches: ${CONFIG.branches}`);
    console.log(`- employees: ${CONFIG.employees}`);
    console.log(`- accounts: ${accountsTotal}`);
    console.log(`- transactions: ${CONFIG.transactions}`);
  });
}

main().catch((err) => {
  console.error("❌ Failed generating bank seed data:", err);
  process.exitCode = 1;
});
