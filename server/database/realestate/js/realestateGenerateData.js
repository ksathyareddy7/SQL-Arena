import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Deterministic seed so tests/reports are reproducible.
faker.seed(20260411);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

// Keep this dataset “medium scale” so local seeding + tests stay fast.
const CONFIG = {
  users: 12_000,
  locations: 1_400,
  amenities: 42,
  properties: 5_000,
  listings: 4_500,
  propertyViews: 50_000,
  shortlists: 18_000,
  inquiries: 12_000,
  visits: 6_000,
  offers: 4_000,
  applications: 3_500,
  leases: 1_200,
  rentPayments: 10_000,
  maintenanceTickets: 3_500,
  referrals: 2_500,
  supportTickets: 2_000,
  appEvents: 40_000,
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

function randomDateTimeBetween(start, end) {
  return faker.date.between({ from: start, to: end });
}

function randomDateBetween(start, end) {
  const d = faker.date.between({ from: start, to: end });
  return d.toISOString().slice(0, 10);
}

function money(min, max) {
  return faker.number.float({ min, max, fractionDigits: 2 });
}

function safePhone(n) {
  // keep within VARCHAR(20)
  const base = String(1000000000 + (n % 9000000000));
  return `+1${base}`.slice(0, 20);
}

function json(obj) {
  return JSON.stringify(obj ?? {});
}

function pickManyUnique(source, count) {
  if (count <= 0) return [];
  const copy = source.slice();
  faker.helpers.shuffle(copy);
  return copy.slice(0, Math.min(count, copy.length));
}

function normalizeUserType(type) {
  // user_type check constraint includes: seeker, owner, tenant, executive, admin
  return type;
}

async function main() {
  rmDir(OUTPUT_DIR);
  ensureDir(OUTPUT_DIR);

  const cities = [
    "Bengaluru",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];
  const signupSources = [
    "google_ads",
    "organic",
    "referral",
    "partner",
    "facebook_ads",
    "app_store",
    "agent",
  ];
  const signupChannels = ["web", "android", "ios", "call_center", "partner_api"];
  const ownerTypes = ["individual", "company", "broker"];
  const verificationStatuses = [
    "pending",
    "partially_verified",
    "verified",
    "rejected",
  ];
  const tenantVerificationStatuses = ["pending", "verified", "rejected", "expired"];
  const locationTypes = [
    "residential",
    "commercial",
    "mixed_use",
    "landmark",
    "transit_hub",
    "gated_community",
  ];
  const propertyTypes = [
    "apartment",
    "independent_house",
    "villa",
    "plot",
    "studio",
    "pg",
    "office",
    "shop",
  ];
  const listingIntents = ["rent", "sale", "lease"];
  const furnishingStatuses = ["unfurnished", "semi_furnished", "fully_furnished"];
  const facingDirections = [
    "north",
    "south",
    "east",
    "west",
    "north_east",
    "north_west",
    "south_east",
    "south_west",
  ];
  const parkingTypes = ["none", "bike", "car", "both"];
  const possessionStatuses = ["ready", "under_construction", "occupied"];
  const listingTypes = ["owner", "broker", "builder"];
  const listingStatuses = [
    "draft",
    "pending_review",
    "live",
    "paused",
    "rented",
    "sold",
    "expired",
    "rejected",
    "archived",
  ];
  const availabilityStatuses = [
    "available",
    "blocked",
    "occupied",
    "under_negotiation",
  ];
  const preferredTenantTypes = ["family", "bachelor", "company", "student", "any"];
  const mediaTypes = ["image", "video", "floor_plan", "document"];
  const inquiryTypes = [
    "call_request",
    "visit_request",
    "chat",
    "callback",
    "owner_contact_reveal",
  ];
  const inquiryStatuses = ["open", "contacted", "scheduled", "closed", "spam", "converted"];
  const visitStatuses = [
    "scheduled",
    "confirmed",
    "completed",
    "cancelled",
    "rescheduled",
    "no_show",
  ];
  const offerStatuses = ["pending", "countered", "accepted", "rejected", "withdrawn", "expired"];
  const applicationStatuses = [
    "submitted",
    "under_review",
    "approved",
    "rejected",
    "withdrawn",
    "expired",
  ];
  const employmentTypes = [
    "salaried",
    "self_employed",
    "student",
    "retired",
    "other",
  ];
  const backgroundStatuses = ["pending", "clear", "flagged", "waived"];
  const rentCycles = ["monthly", "quarterly"];
  const leaseStatuses = ["active", "expired", "terminated", "renewed"];
  const paymentMethods = ["cash", "bank_transfer", "upi", "card", "cheque", "wallet"];
  const paymentStatuses = ["pending", "paid", "partial", "failed", "refunded", "overdue"];
  const maintenanceIssueTypes = [
    "plumbing",
    "electrical",
    "appliance",
    "painting",
    "cleaning",
    "security",
    "structural",
    "other",
  ];
  const maintenancePriorities = ["low", "medium", "high", "critical"];
  const maintenanceStatuses = ["open", "assigned", "in_progress", "resolved", "closed", "cancelled"];
  const referralTypes = ["owner", "seeker", "tenant"];
  const referralStatuses = ["pending", "signed_up", "verified", "converted", "rejected"];
  const supportTicketTypes = [
    "listing_issue",
    "verification_issue",
    "payment_issue",
    "visit_issue",
    "lease_issue",
    "maintenance_issue",
    "other",
  ];
  const supportTicketStatuses = ["open", "in_progress", "resolved", "closed"];
  const supportPriorities = ["low", "medium", "high", "critical"];
  const documentTypes = [
    "aadhaar",
    "pan",
    "passport",
    "driving_license",
    "rental_agreement",
    "salary_slip",
    "bank_statement",
    "company_id",
    "other",
  ];
  const docVerificationStatuses = ["pending", "verified", "rejected", "expired"];
  const ownerRequestStatuses = [
    "pending",
    "in_review",
    "approved",
    "rejected",
    "needs_resubmission",
  ];
  const ownershipDocTypes = ["sale_deed", "tax_receipt", "encumbrance_certificate", "khata", "other"];

  // =========================
  // 1) users
  // =========================
  const usersWriter = new CsvWriter(path.join(OUTPUT_DIR, "users.csv"), [
    "full_name",
    "email",
    "phone",
    "user_type",
    "city",
    "signup_source",
    "signup_channel",
    "referral_code",
    "referred_by_user_id",
    "is_phone_verified",
    "is_email_verified",
    "is_active",
    "last_active_at",
    "created_at",
  ]);

  const userType = new Array(CONFIG.users + 1);
  const userCity = new Array(CONFIG.users + 1);
  const userCreatedAt = new Array(CONFIG.users + 1);

  const ownerUserIds = [];
  const seekerUserIds = [];
  const tenantUserIds = [];
  const executiveUserIds = [];
  const adminUserIds = [];

  for (let i = 1; i <= CONFIG.users; i++) {
    const fullName = faker.person.fullName();
    const email = chance(0.94) ? `realestate_user${i}@example.com` : null;
    const phone = safePhone(i);

    const r = faker.number.float({ min: 0, max: 1 });
    let type = "seeker";
    if (r < 0.58) type = "seeker";
    else if (r < 0.80) type = "owner";
    else if (r < 0.90) type = "tenant";
    else if (r < 0.985) type = "executive";
    else type = "admin";

    type = normalizeUserType(type);

    const city = pick(cities);
    const signupSource = chance(0.92) ? pick(signupSources) : null;
    const signupChannel = chance(0.90) ? pick(signupChannels) : null;
    const referralCode = `RE${String(i).padStart(8, "0")}`;
    const referredByUserId = chance(0.16) && i > 10 ? randInt(1, i - 1) : null;
    const isPhoneVerified = chance(0.82);
    const isEmailVerified = chance(0.74);
    const isActive = chance(0.95);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const lastActiveAt = isActive ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

    userType[i] = type;
    userCity[i] = city;
    userCreatedAt[i] = createdAt;

    if (type === "owner") ownerUserIds.push(i);
    else if (type === "seeker") seekerUserIds.push(i);
    else if (type === "tenant") tenantUserIds.push(i);
    else if (type === "executive") executiveUserIds.push(i);
    else adminUserIds.push(i);

    usersWriter.writeRow([
      fullName,
      email,
      phone,
      type,
      city,
      signupSource,
      signupChannel,
      referralCode,
      referredByUserId,
      isPhoneVerified,
      isEmailVerified,
      isActive,
      lastActiveAt ? iso(lastActiveAt) : null,
      iso(createdAt),
    ]);
  }
  await usersWriter.close();

  // =========================
  // 2) owner_profiles
  // =========================
  const ownerProfilesWriter = new CsvWriter(path.join(OUTPUT_DIR, "owner_profiles.csv"), [
    "user_id",
    "owner_type",
    "company_name",
    "gst_number",
    "verification_status",
    "verified_at",
    "verification_notes",
    "onboarding_source",
    "onboarding_completed_at",
    "total_properties_count",
    "active_listings_count",
    "created_at",
  ]);

  const ownerProfileUserIdByOwnerProfileId = [null];
  const ownerProfileIdByUserId = new Map();

  for (let idx = 0; idx < ownerUserIds.length; idx++) {
    const userId = ownerUserIds[idx];
    const ownerProfileId = idx + 1;
    ownerProfileUserIdByOwnerProfileId[ownerProfileId] = userId;
    ownerProfileIdByUserId.set(userId, ownerProfileId);

    const ownerType = pick(ownerTypes);
    const companyName = ownerType === "company" ? `${faker.company.name()} Real Estate` : null;
    const gstNumber = ownerType === "company" ? `GST${String(ownerProfileId).padStart(10, "0")}` : null;
    const verificationStatus = pick(verificationStatuses);
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    const verifiedAt = verificationStatus === "verified" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const verificationNotes =
      verificationStatus === "rejected"
        ? pick(["Address mismatch", "Invalid document", "Fraud suspected"])
        : null;
    const onboardingSource = chance(0.8) ? pick(["self_signup", "agent", "partner"]) : null;
    const onboardingCompletedAt = chance(0.7)
      ? randomDateTimeBetween(createdAt, DATE_RANGE.end)
      : null;

    ownerProfilesWriter.writeRow([
      userId,
      ownerType,
      companyName,
      gstNumber,
      verificationStatus,
      verifiedAt ? iso(verifiedAt) : null,
      verificationNotes,
      onboardingSource,
      onboardingCompletedAt ? iso(onboardingCompletedAt) : null,
      0,
      0,
      iso(createdAt),
    ]);
  }
  await ownerProfilesWriter.close();

  // =========================
  // 3) seeker_profiles
  // =========================
  const seekerProfilesWriter = new CsvWriter(path.join(OUTPUT_DIR, "seeker_profiles.csv"), [
    "user_id",
    "preferred_city",
    "preferred_locality",
    "budget_min",
    "budget_max",
    "move_in_date",
    "preferred_property_type",
    "furnishing_preference",
    "tenant_verification_status",
    "verified_at",
    "created_at",
  ]);

  const seekerProfileIdByUserId = new Map();
  const seekerProfileUserIdBySeekerProfileId = [null];

  const seekerLikeUserIds = seekerUserIds.concat(tenantUserIds);
  for (let idx = 0; idx < seekerLikeUserIds.length; idx++) {
    const userId = seekerLikeUserIds[idx];
    const seekerProfileId = idx + 1;
    seekerProfileIdByUserId.set(userId, seekerProfileId);
    seekerProfileUserIdBySeekerProfileId[seekerProfileId] = userId;

    const preferredCity = chance(0.9) ? pick(cities) : null;
    const preferredLocality = chance(0.7) ? faker.location.street() : null;

    const min = chance(0.85) ? money(8_000, 80_000) : null;
    const max = min !== null && chance(0.92) ? money(min, min + 120_000) : null;
    const moveInDate = chance(0.45)
      ? randomDateBetween(new Date("2025-01-01T00:00:00Z"), new Date("2026-12-31T00:00:00Z"))
      : null;
    const preferredPropertyType = chance(0.8) ? pick(propertyTypes) : null;
    const furnishingPreference = chance(0.8) ? pick(furnishingStatuses) : null;
    const tenantVerificationStatus = pick(tenantVerificationStatuses);
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    const verifiedAt = tenantVerificationStatus === "verified" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

    seekerProfilesWriter.writeRow([
      userId,
      preferredCity,
      preferredLocality,
      min,
      max,
      moveInDate,
      preferredPropertyType,
      furnishingPreference,
      tenantVerificationStatus,
      verifiedAt ? iso(verifiedAt) : null,
      iso(createdAt),
    ]);
  }
  await seekerProfilesWriter.close();

  // =========================
  // 4) executive_profiles
  // =========================
  const executiveProfilesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "executive_profiles.csv"),
    [
      "user_id",
      "employee_code",
      "team_name",
      "manager_user_id",
      "is_active",
      "joined_at",
      "created_at",
    ],
  );

  const teamNames = ["Ops", "Verification", "Support", "Field", "Onboarding"];
  for (let idx = 0; idx < executiveUserIds.length; idx++) {
    const userId = executiveUserIds[idx];
    const employeeCode = `EMP${String(idx + 1).padStart(6, "0")}`;
    const teamName = chance(0.9) ? pick(teamNames) : null;
    const managerUserId =
      executiveUserIds.length > 5 && chance(0.45) && idx > 2
        ? pick(executiveUserIds.slice(0, idx))
        : null;
    const isActive = chance(0.94);
    const joinedAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);

    executiveProfilesWriter.writeRow([
      userId,
      employeeCode,
      teamName,
      managerUserId,
      isActive,
      iso(joinedAt),
      iso(createdAt),
    ]);
  }
  await executiveProfilesWriter.close();

  // =========================
  // 5) user_documents
  // =========================
  const userDocumentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "user_documents.csv"), [
    "user_id",
    "document_type",
    "document_number",
    "issued_at",
    "expires_at",
    "verification_status",
    "verified_by_user_id",
    "verified_at",
    "rejection_reason",
    "created_at",
  ]);

  const verifierPool = executiveUserIds.concat(adminUserIds);
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const docs = randInt(0, 2);
    for (let d = 0; d < docs; d++) {
      const docType = pick(documentTypes);
      const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
      const issuedAt = chance(0.7) ? randomDateTimeBetween(DATE_RANGE.start, createdAt) : null;
      const expiresAt = chance(0.18)
        ? randomDateTimeBetween(createdAt, new Date("2028-12-31T00:00:00Z"))
        : null;
      const status = pick(docVerificationStatuses);
      const verifiedByUserId =
        status === "verified" && verifierPool.length ? pick(verifierPool) : null;
      const verifiedAt =
        status === "verified" && verifiedByUserId
          ? randomDateTimeBetween(createdAt, DATE_RANGE.end)
          : null;
      const rejectionReason =
        status === "rejected"
          ? pick(["Document unreadable", "Mismatch with profile", "Expired document"])
          : null;

      userDocumentsWriter.writeRow([
        userId,
        docType,
        `${docType.toUpperCase()}-${String(userId).padStart(6, "0")}-${d + 1}`,
        issuedAt ? iso(issuedAt) : null,
        expiresAt ? iso(expiresAt) : null,
        status,
        verifiedByUserId,
        verifiedAt ? iso(verifiedAt) : null,
        rejectionReason,
        iso(createdAt),
      ]);
    }
  }
  await userDocumentsWriter.close();

  // =========================
  // 6) owner_verification_requests
  // =========================
  const ownerVerificationRequestsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "owner_verification_requests.csv"),
    [
      "owner_profile_id",
      "assigned_executive_user_id",
      "request_status",
      "ownership_doc_type",
      "ownership_doc_number",
      "reviewed_at",
      "rejection_reason",
      "created_at",
    ],
  );

  const ownerProfileCount = ownerUserIds.length;
  for (let ownerProfileId = 1; ownerProfileId <= ownerProfileCount; ownerProfileId++) {
    if (!chance(0.42)) continue;
    const userId = ownerProfileUserIdByOwnerProfileId[ownerProfileId];
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    const requestStatus = pick(ownerRequestStatuses);
    const ownershipDocType = chance(0.85) ? pick(ownershipDocTypes) : null;
    const ownershipDocNumber = ownershipDocType
      ? `${ownershipDocType.toUpperCase()}-${String(ownerProfileId).padStart(8, "0")}`
      : null;
    const assignedExec =
      executiveUserIds.length && chance(0.75) ? pick(executiveUserIds) : null;
    const reviewedAt =
      requestStatus !== "pending" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const rejectionReason =
      requestStatus === "rejected" ? pick(["Missing doc", "Invalid doc", "Fraud suspected"]) : null;

    ownerVerificationRequestsWriter.writeRow([
      ownerProfileId,
      assignedExec,
      requestStatus,
      ownershipDocType,
      ownershipDocNumber,
      reviewedAt ? iso(reviewedAt) : null,
      rejectionReason,
      iso(createdAt),
    ]);
  }
  await ownerVerificationRequestsWriter.close();

  // =========================
  // 7) locations
  // =========================
  const locationsWriter = new CsvWriter(path.join(OUTPUT_DIR, "locations.csv"), [
    "city",
    "locality",
    "sublocality",
    "pincode",
    "latitude",
    "longitude",
    "zone_name",
    "location_type",
    "created_at",
  ]);

  const locationCity = new Array(CONFIG.locations + 1);
  for (let i = 1; i <= CONFIG.locations; i++) {
    const city = pick(cities);
    const locality = `${faker.location.street()} ${randInt(1, 9)}`;
    const sublocality = chance(0.4) ? faker.location.street() : null;
    const pincode = String(randInt(100000, 999999));
    const lat = faker.number.float({ min: 8.0, max: 28.0, fractionDigits: 6 });
    const lng = faker.number.float({ min: 72.0, max: 88.0, fractionDigits: 6 });
    const zoneName = chance(0.5) ? `${city} Zone ${randInt(1, 8)}` : null;
    const locationType = pick(locationTypes);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);

    locationCity[i] = city;

    locationsWriter.writeRow([
      city,
      locality,
      sublocality,
      pincode,
      lat,
      lng,
      zoneName,
      locationType,
      iso(createdAt),
    ]);
  }
  await locationsWriter.close();

  // =========================
  // 8) properties
  // =========================
  const propertiesWriter = new CsvWriter(path.join(OUTPUT_DIR, "properties.csv"), [
    "owner_profile_id",
    "location_id",
    "property_title",
    "property_type",
    "listing_intent",
    "building_name",
    "address_line1",
    "address_line2",
    "bedrooms",
    "bathrooms",
    "balconies",
    "floor_number",
    "total_floors",
    "built_up_area_sqft",
    "carpet_area_sqft",
    "plot_area_sqft",
    "furnishing_status",
    "facing_direction",
    "parking_type",
    "property_age_years",
    "possession_status",
    "is_gated_community",
    "is_active",
    "created_at",
  ]);

  const propertyOwnerProfileId = new Array(CONFIG.properties + 1);
  const propertyLocationId = new Array(CONFIG.properties + 1);
  const propertyTypeById = new Array(CONFIG.properties + 1);
  const propertyCreatedAt = new Array(CONFIG.properties + 1);

  for (let propertyId = 1; propertyId <= CONFIG.properties; propertyId++) {
    const ownerProfileId = ownerProfileCount ? randInt(1, ownerProfileCount) : 1;
    const locationId = randInt(1, CONFIG.locations);
    const type = pick(propertyTypes);
    const intent = pick(listingIntents);

    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    propertyOwnerProfileId[propertyId] = ownerProfileId;
    propertyLocationId[propertyId] = locationId;
    propertyTypeById[propertyId] = type;
    propertyCreatedAt[propertyId] = createdAt;

    const buildingName =
      type === "apartment" || type === "office" || type === "shop"
        ? `${faker.company.name()} ${pick(["Heights", "Towers", "Plaza", "Residency"])}`
        : null;
    const addr1 = `${randInt(1, 199)} ${faker.location.street()}`;
    const addr2 = chance(0.35) ? faker.location.secondaryAddress() : null;

    const bedrooms = ["apartment", "independent_house", "villa", "studio", "pg"].includes(type)
      ? (type === "studio" ? 0 : randInt(1, 5))
      : null;
    const bathrooms = bedrooms !== null ? Math.max(1, randInt(1, Math.max(1, bedrooms + 1))) : null;
    const balconies = bedrooms !== null ? randInt(0, 3) : null;

    const totalFloors =
      type === "apartment" || type === "office" || type === "shop"
        ? randInt(3, 28)
        : null;
    const floorNumber = totalFloors ? randInt(0, totalFloors) : null;

    const builtUp =
      type === "plot" ? null : faker.number.float({ min: 250, max: 4200, fractionDigits: 2 });
    const carpet = builtUp && chance(0.85) ? faker.number.float({ min: builtUp * 0.55, max: builtUp * 0.9, fractionDigits: 2 }) : null;
    const plotArea =
      type === "plot" || type === "villa" || type === "independent_house"
        ? faker.number.float({ min: 600, max: 6000, fractionDigits: 2 })
        : null;

    const furnishing = chance(0.75) ? pick(furnishingStatuses) : null;
    const facing = chance(0.72) ? pick(facingDirections) : null;
    const parking = chance(0.8) ? pick(parkingTypes) : null;
    const ageYears = chance(0.8) ? randInt(0, 30) : null;
    const possession = pick(possessionStatuses);
    const gated = chance(0.22);
    const isActive = chance(0.96);

    propertiesWriter.writeRow([
      ownerProfileId,
      locationId,
      `${pick(["Spacious", "Modern", "Cozy", "Premium", "Bright"])} ${type.replaceAll("_", " ")}`,
      type,
      intent,
      buildingName,
      addr1,
      addr2,
      bedrooms,
      bathrooms,
      balconies,
      floorNumber,
      totalFloors,
      builtUp,
      carpet,
      plotArea,
      furnishing,
      facing,
      parking,
      ageYears,
      possession,
      gated,
      isActive,
      iso(createdAt),
    ]);
  }
  await propertiesWriter.close();

  // =========================
  // 9) property_ownership_history
  // =========================
  const ownershipWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "property_ownership_history.csv"),
    [
      "property_id",
      "owner_profile_id",
      "ownership_start_date",
      "ownership_end_date",
      "ownership_status",
      "notes",
      "created_at",
    ],
  );

  for (let propertyId = 1; propertyId <= CONFIG.properties; propertyId++) {
    const ownerProfileId = propertyOwnerProfileId[propertyId];
    const startDate = randomDateBetween(new Date("2018-01-01T00:00:00Z"), DATE_RANGE.end);
    const endDate = null;
    const status = "active";
    const notes = chance(0.15) ? "Initial ownership record" : null;
    const createdAt = randomDateTimeBetween(propertyCreatedAt[propertyId], DATE_RANGE.end);

    ownershipWriter.writeRow([propertyId, ownerProfileId, startDate, endDate, status, notes, iso(createdAt)]);
  }
  await ownershipWriter.close();

  // =========================
  // 10) amenities
  // =========================
  const amenitiesWriter = new CsvWriter(path.join(OUTPUT_DIR, "amenities.csv"), [
    "amenity_name",
    "amenity_category",
    "created_at",
  ]);

  const amenityCatalog = [
    ["CCTV", "safety"],
    ["Security Guard", "safety"],
    ["Fire Alarm", "safety"],
    ["Gym", "lifestyle"],
    ["Pool", "sports"],
    ["Jogging Track", "sports"],
    ["Power Backup", "utilities"],
    ["Lift", "accessibility"],
    ["Wheelchair Access", "accessibility"],
    ["Children's Play Area", "lifestyle"],
    ["Clubhouse", "lifestyle"],
    ["Reserved Parking", "parking"],
    ["Visitor Parking", "parking"],
    ["Rainwater Harvesting", "utilities"],
    ["24x7 Water", "utilities"],
    ["Near Metro", "nearby"],
    ["Near School", "nearby"],
    ["Near Hospital", "nearby"],
    ["Garden", "lifestyle"],
    ["Intercom", "safety"],
    ["Gas Pipeline", "utilities"],
    ["Wi-Fi", "utilities"],
    ["Cafeteria", "nearby"],
    ["Bank/ATM Nearby", "nearby"],
    ["Shopping Mall Nearby", "nearby"],
    ["Community Hall", "lifestyle"],
    ["Basketball Court", "sports"],
    ["Tennis Court", "sports"],
    ["EV Charging", "utilities"],
    ["Waste Management", "utilities"],
    ["Gated Entrance", "safety"],
    ["Pet Friendly", "lifestyle"],
    ["Maintenance Staff", "utilities"],
    ["Vastu Compliant", "lifestyle"],
    ["Corner Plot", "nearby"],
    ["Park Facing", "nearby"],
    ["Balcony", "lifestyle"],
    ["Modular Kitchen", "lifestyle"],
    ["Furnished", "lifestyle"],
    ["Air Conditioning", "utilities"],
    ["Solar Power", "utilities"],
    ["Rooftop Terrace", "lifestyle"],
  ];

  // Ensure we write exactly CONFIG.amenities unique rows.
  const chosenAmenities = pickManyUnique(
    amenityCatalog,
    Math.min(CONFIG.amenities, amenityCatalog.length),
  );
  for (let i = 0; i < chosenAmenities.length; i++) {
    const [name, category] = chosenAmenities[i];
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    amenitiesWriter.writeRow([name, category, iso(createdAt)]);
  }
  await amenitiesWriter.close();

  // =========================
  // 11) property_amenities
  // =========================
  const propertyAmenitiesWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "property_amenities.csv"),
    ["property_id", "amenity_id", "created_at"],
  );

  for (let propertyId = 1; propertyId <= CONFIG.properties; propertyId++) {
    const count = randInt(2, 7);
    const amenityIds = pickManyUnique(
      Array.from({ length: chosenAmenities.length }, (_, i) => i + 1),
      count,
    );
    for (const amenityId of amenityIds) {
      const createdAt = randomDateTimeBetween(propertyCreatedAt[propertyId], DATE_RANGE.end);
      propertyAmenitiesWriter.writeRow([propertyId, amenityId, iso(createdAt)]);
    }
  }
  await propertyAmenitiesWriter.close();

  // =========================
  // 12) listings
  // =========================
  const listingsWriter = new CsvWriter(path.join(OUTPUT_DIR, "listings.csv"), [
    "property_id",
    "owner_profile_id",
    "listing_type",
    "listing_status",
    "availability_status",
    "listed_for",
    "rent_amount",
    "sale_price",
    "security_deposit",
    "maintenance_amount",
    "brokerage_amount",
    "available_from",
    "lease_duration_months",
    "preferred_tenant_type",
    "pet_allowed",
    "is_price_negotiable",
    "furnishing_notes",
    "description",
    "posted_at",
    "live_at",
    "expired_at",
    "closed_at",
    "created_at",
  ]);

  const listingPropertyId = new Array(CONFIG.listings + 1);
  const listingOwnerProfileId = new Array(CONFIG.listings + 1);
  const listingStatusById = new Array(CONFIG.listings + 1);
  const listingCreatedAt = new Array(CONFIG.listings + 1);
  const listingListedFor = new Array(CONFIG.listings + 1);

  for (let listingId = 1; listingId <= CONFIG.listings; listingId++) {
    const propertyId = randInt(1, CONFIG.properties);
    const ownerProfileId = propertyOwnerProfileId[propertyId];
    const listingType = chance(0.78) ? "owner" : pick(listingTypes);

    // bias towards live listings so the “live listings” questions have enough rows.
    const listingStatus = chance(0.55) ? "live" : pick(listingStatuses);
    const listedFor = chance(0.8) ? pick(listingIntents) : "rent";

    const createdAt = randomDateTimeBetween(propertyCreatedAt[propertyId], DATE_RANGE.end);
    const postedAt = chance(0.85) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const liveAt = listingStatus === "live" && postedAt ? randomDateTimeBetween(postedAt, DATE_RANGE.end) : null;
    const expiredAt = listingStatus === "expired" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const closedAt =
      listingStatus === "rented" || listingStatus === "sold"
        ? randomDateTimeBetween(createdAt, DATE_RANGE.end)
        : null;

    let availabilityStatus = pick(availabilityStatuses);
    if (listingStatus === "live") availabilityStatus = chance(0.78) ? "available" : "under_negotiation";
    if (listingStatus === "rented" || listingStatus === "sold") availabilityStatus = "occupied";
    if (listingStatus === "paused") availabilityStatus = chance(0.6) ? "blocked" : availabilityStatus;

    const rentAmount = listedFor === "rent" ? money(9_000, 160_000) : null;
    const salePrice = listedFor === "sale" ? money(15_00_000, 5_00_00_000) : null;
    const securityDeposit = listedFor === "rent" && chance(0.9) ? money(0, 4 * (rentAmount ?? 20_000)) : null;
    const maintenance = chance(0.7) ? money(0, 12_000) : null;
    const brokerage = listingType !== "owner" && chance(0.8) ? money(0, 2 * (rentAmount ?? 20_000)) : null;
    const availableFrom = chance(0.55)
      ? randomDateBetween(new Date("2024-06-01T00:00:00Z"), new Date("2026-12-31T00:00:00Z"))
      : null;
    const leaseMonths = listedFor === "lease" ? randInt(6, 60) : chance(0.2) ? randInt(6, 24) : null;
    const preferredTenant = chance(0.7) ? pick(preferredTenantTypes) : null;
    const petAllowed = chance(0.25);
    const negotiable = chance(0.35);
    const furnishingNotes = chance(0.3) ? pick(["Includes wardrobes", "Modular kitchen", "ACs included"]) : null;
    const description = chance(0.75) ? faker.lorem.paragraph() : null;

    listingPropertyId[listingId] = propertyId;
    listingOwnerProfileId[listingId] = ownerProfileId;
    listingStatusById[listingId] = listingStatus;
    listingCreatedAt[listingId] = createdAt;
    listingListedFor[listingId] = listedFor;

    listingsWriter.writeRow([
      propertyId,
      ownerProfileId,
      listingType,
      listingStatus,
      availabilityStatus,
      listedFor,
      rentAmount,
      salePrice,
      securityDeposit,
      maintenance,
      brokerage,
      availableFrom,
      leaseMonths,
      preferredTenant,
      petAllowed,
      negotiable,
      furnishingNotes,
      description,
      postedAt ? iso(postedAt) : null,
      liveAt ? iso(liveAt) : null,
      expiredAt ? iso(expiredAt) : null,
      closedAt ? iso(closedAt) : null,
      iso(createdAt),
    ]);
  }
  await listingsWriter.close();

  // =========================
  // 13) listing_media
  // =========================
  const listingMediaWriter = new CsvWriter(path.join(OUTPUT_DIR, "listing_media.csv"), [
    "listing_id",
    "media_type",
    "media_url",
    "room_tag",
    "display_order",
    "is_cover",
    "created_at",
  ]);

  const roomTags = ["living_room", "bedroom", "kitchen", "bathroom", "balcony", "exterior"];
  for (let listingId = 1; listingId <= CONFIG.listings; listingId++) {
    const count = randInt(1, 5);
    const coverIdx = randInt(1, count);
    for (let j = 1; j <= count; j++) {
      const mediaType = chance(0.9) ? "image" : pick(mediaTypes);
      const url = `https://example.com/realestate/listing/${listingId}/${j}.${mediaType === "image" ? "jpg" : "mp4"}`;
      const roomTag = chance(0.7) ? pick(roomTags) : null;
      const createdAt = randomDateTimeBetween(listingCreatedAt[listingId], DATE_RANGE.end);
      listingMediaWriter.writeRow([listingId, mediaType, url, roomTag, j, j === coverIdx, iso(createdAt)]);
    }
  }
  await listingMediaWriter.close();

  // =========================
  // 14) listing_status_history
  // =========================
  const listingStatusHistoryWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "listing_status_history.csv"),
    ["listing_id", "old_status", "new_status", "changed_by_user_id", "changed_at", "notes"],
  );
  for (let listingId = 1; listingId <= CONFIG.listings; listingId++) {
    const entries = randInt(0, 2);
    let prev = null;
    for (let k = 0; k < entries; k++) {
      const next = pick(listingStatuses);
      const changedBy =
        chance(0.7) && executiveUserIds.length
          ? pick(executiveUserIds)
          : ownerProfileUserIdByOwnerProfileId[listingOwnerProfileId[listingId]];
      const changedAt = randomDateTimeBetween(listingCreatedAt[listingId], DATE_RANGE.end);
      listingStatusHistoryWriter.writeRow([
        listingId,
        prev,
        next,
        changedBy,
        iso(changedAt),
        chance(0.25) ? "Automated status update" : null,
      ]);
      prev = next;
    }
  }
  await listingStatusHistoryWriter.close();

  // =========================
  // 15) listing_price_history
  // =========================
  const listingPriceHistoryWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "listing_price_history.csv"),
    [
      "listing_id",
      "old_rent_amount",
      "new_rent_amount",
      "old_sale_price",
      "new_sale_price",
      "changed_at",
      "changed_by_user_id",
      "notes",
    ],
  );
  for (let listingId = 1; listingId <= CONFIG.listings; listingId++) {
    if (!chance(0.25)) continue;
    const changes = randInt(1, 2);
    let oldRent = listingListedFor[listingId] === "rent" ? money(9_000, 160_000) : null;
    let oldSale = listingListedFor[listingId] === "sale" ? money(15_00_000, 5_00_00_000) : null;
    for (let c = 0; c < changes; c++) {
      const newRent =
        oldRent !== null ? faker.number.float({ min: oldRent * 0.85, max: oldRent * 1.15, fractionDigits: 2 }) : null;
      const newSale =
        oldSale !== null ? faker.number.float({ min: oldSale * 0.9, max: oldSale * 1.12, fractionDigits: 2 }) : null;
      const changedBy =
        chance(0.35) && executiveUserIds.length
          ? pick(executiveUserIds)
          : ownerProfileUserIdByOwnerProfileId[listingOwnerProfileId[listingId]];
      const changedAt = randomDateTimeBetween(listingCreatedAt[listingId], DATE_RANGE.end);
      listingPriceHistoryWriter.writeRow([
        listingId,
        oldRent,
        newRent,
        oldSale,
        newSale,
        iso(changedAt),
        changedBy,
        "Price updated",
      ]);
      oldRent = newRent;
      oldSale = newSale;
    }
  }
  await listingPriceHistoryWriter.close();

  // =========================
  // 16) shortlists
  // =========================
  const shortlistsWriter = new CsvWriter(path.join(OUTPUT_DIR, "shortlists.csv"), [
    "user_id",
    "listing_id",
    "created_at",
  ]);

  const shortlistKeys = new Set();
  let shortlistWritten = 0;
  while (shortlistWritten < CONFIG.shortlists) {
    const userId = pick(seekerLikeUserIds);
    const listingId = randInt(1, CONFIG.listings);
    const key = `${userId}:${listingId}`;
    if (shortlistKeys.has(key)) continue;
    shortlistKeys.add(key);
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    shortlistsWriter.writeRow([userId, listingId, iso(createdAt)]);
    shortlistWritten++;
  }
  await shortlistsWriter.close();

  // =========================
  // 17) property_views
  // =========================
  const propertyViewsWriter = new CsvWriter(path.join(OUTPUT_DIR, "property_views.csv"), [
    "user_id",
    "listing_id",
    "session_id",
    "source_channel",
    "device_type",
    "view_time",
    "metadata",
  ]);
  const viewSourceChannels = ["search", "push", "direct", "recommendations", "social", "ads"];
  const deviceTypes = ["android", "ios", "web", "tablet"];

  for (let i = 1; i <= CONFIG.propertyViews; i++) {
    const listingId = randInt(1, CONFIG.listings);
    const userId = chance(0.18) ? null : pick(seekerLikeUserIds);
    const sessionId = `sess_${String(i).padStart(10, "0")}`;
    const source = chance(0.8) ? pick(viewSourceChannels) : null;
    const device = chance(0.85) ? pick(deviceTypes) : null;
    const viewTime = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const metadata = json({ ref: chance(0.3) ? "campaign" : "organic", ab: chance(0.1) ? "v2" : "v1" });

    propertyViewsWriter.writeRow([userId, listingId, sessionId, source, device, iso(viewTime), metadata]);
  }
  await propertyViewsWriter.close();

  // =========================
  // 18) inquiries
  // =========================
  const inquiriesWriter = new CsvWriter(path.join(OUTPUT_DIR, "inquiries.csv"), [
    "listing_id",
    "seeker_user_id",
    "inquiry_type",
    "inquiry_status",
    "message",
    "created_at",
    "closed_at",
  ]);

  for (let i = 1; i <= CONFIG.inquiries; i++) {
    const listingId = randInt(1, CONFIG.listings);
    const seekerUserId = pick(seekerLikeUserIds);
    const type = pick(inquiryTypes);
    const status = pick(inquiryStatuses);
    const createdAt = randomDateTimeBetween(userCreatedAt[seekerUserId], DATE_RANGE.end);
    const closedAt = status === "closed" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const message = chance(0.55) ? faker.lorem.sentence() : null;
    inquiriesWriter.writeRow([listingId, seekerUserId, type, status, message, iso(createdAt), closedAt ? iso(closedAt) : null]);
  }
  await inquiriesWriter.close();

  // =========================
  // 19) property_visits
  // =========================
  const visitsWriter = new CsvWriter(path.join(OUTPUT_DIR, "property_visits.csv"), [
    "listing_id",
    "seeker_user_id",
    "owner_profile_id",
    "executive_user_id",
    "scheduled_at",
    "visit_status",
    "feedback_rating",
    "feedback_text",
    "cancelled_by_user_id",
    "cancellation_reason",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.visits; i++) {
    const listingId = randInt(1, CONFIG.listings);
    const seekerUserId = pick(seekerLikeUserIds);
    const ownerProfileId = listingOwnerProfileId[listingId] ?? null;
    const executiveUserId = executiveUserIds.length && chance(0.35) ? pick(executiveUserIds) : null;
    const createdAt = randomDateTimeBetween(userCreatedAt[seekerUserId], DATE_RANGE.end);
    const scheduledAt = randomDateTimeBetween(createdAt, DATE_RANGE.end);
    const status = pick(visitStatuses);
    const feedbackRating = status === "completed" && chance(0.7) ? randInt(1, 5) : null;
    const feedbackText = feedbackRating ? faker.lorem.sentence() : null;
    const cancelledByUserId =
      status === "cancelled" && chance(0.7) ? seekerUserId : null;
    const cancellationReason =
      cancelledByUserId ? pick(["Not available", "Changed plans", "Booked another property"]) : null;

    visitsWriter.writeRow([
      listingId,
      seekerUserId,
      ownerProfileId,
      executiveUserId,
      iso(scheduledAt),
      status,
      feedbackRating,
      feedbackText,
      cancelledByUserId,
      cancellationReason,
      iso(createdAt),
    ]);
  }
  await visitsWriter.close();

  // =========================
  // 20) offers
  // =========================
  const offersWriter = new CsvWriter(path.join(OUTPUT_DIR, "offers.csv"), [
    "listing_id",
    "seeker_user_id",
    "offered_rent",
    "offered_deposit",
    "lease_duration_months",
    "move_in_date",
    "offer_status",
    "counter_rent",
    "counter_deposit",
    "responded_at",
    "expires_at",
    "created_at",
  ]);

  const offerListingId = new Array(CONFIG.offers + 1);
  const offerSeekerUserId = new Array(CONFIG.offers + 1);
  const offerStatusById = new Array(CONFIG.offers + 1);
  const offerCreatedAt = new Array(CONFIG.offers + 1);

  for (let offerId = 1; offerId <= CONFIG.offers; offerId++) {
    const listingId = randInt(1, CONFIG.listings);
    const seekerUserId = pick(seekerLikeUserIds);
    const createdAt = randomDateTimeBetween(userCreatedAt[seekerUserId], DATE_RANGE.end);
    const status = pick(offerStatuses);
    const offeredRent = chance(0.9) ? money(9_000, 160_000) : null;
    const offeredDeposit = chance(0.75) ? money(0, 4 * (offeredRent ?? 20_000)) : null;
    const leaseMonths = chance(0.3) ? randInt(6, 36) : null;
    const moveInDate = chance(0.5) ? randomDateBetween(new Date("2025-01-01T00:00:00Z"), new Date("2026-12-31T00:00:00Z")) : null;
    const counterRent = status === "countered" ? money(9_000, 160_000) : null;
    const counterDeposit = status === "countered" ? money(0, 4 * (counterRent ?? 20_000)) : null;
    const respondedAt = status !== "pending" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const expiresAt = chance(0.6) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

    offerListingId[offerId] = listingId;
    offerSeekerUserId[offerId] = seekerUserId;
    offerStatusById[offerId] = status;
    offerCreatedAt[offerId] = createdAt;

    offersWriter.writeRow([
      listingId,
      seekerUserId,
      offeredRent,
      offeredDeposit,
      leaseMonths,
      moveInDate,
      status,
      counterRent,
      counterDeposit,
      respondedAt ? iso(respondedAt) : null,
      expiresAt ? iso(expiresAt) : null,
      iso(createdAt),
    ]);
  }
  await offersWriter.close();

  // =========================
  // 21) rental_applications
  // =========================
  const applicationsWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "rental_applications.csv"),
    [
      "listing_id",
      "seeker_user_id",
      "offer_id",
      "application_status",
      "monthly_income",
      "employment_type",
      "employer_name",
      "occupants_count",
      "has_pets",
      "requires_parking",
      "background_check_status",
      "created_at",
      "reviewed_at",
    ],
  );

  const approvedApplicationIds = [];
  const applicationListingId = [null];
  const applicationSeekerId = [null];
  const applicationCreatedAt = [null];

  for (let appId = 1; appId <= CONFIG.applications; appId++) {
    // Link ~60% of applications to an offer.
    const offerId = chance(0.6) ? randInt(1, CONFIG.offers) : null;
    const listingId = offerId ? offerListingId[offerId] : randInt(1, CONFIG.listings);
    const seekerUserId = offerId ? offerSeekerUserId[offerId] : pick(seekerLikeUserIds);
    const createdAt = randomDateTimeBetween(userCreatedAt[seekerUserId], DATE_RANGE.end);
    const status = pick(applicationStatuses);
    const income = chance(0.9) ? money(25_000, 350_000) : null;
    const empType = chance(0.85) ? pick(employmentTypes) : null;
    const employer = empType && empType !== "retired" ? faker.company.name() : null;
    const occupants = chance(0.85) ? randInt(1, 6) : null;
    const hasPets = chance(0.22);
    const requiresParking = chance(0.55);
    const bgStatus = pick(backgroundStatuses);
    const reviewedAt = status !== "submitted" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

    applicationListingId[appId] = listingId;
    applicationSeekerId[appId] = seekerUserId;
    applicationCreatedAt[appId] = createdAt;

    if (status === "approved") approvedApplicationIds.push(appId);

    applicationsWriter.writeRow([
      listingId,
      seekerUserId,
      offerId,
      status,
      income,
      empType,
      employer,
      occupants,
      hasPets,
      requiresParking,
      bgStatus,
      iso(createdAt),
      reviewedAt ? iso(reviewedAt) : null,
    ]);
  }
  await applicationsWriter.close();

  // =========================
  // 22) leases
  // =========================
  const leasesWriter = new CsvWriter(path.join(OUTPUT_DIR, "leases.csv"), [
    "listing_id",
    "property_id",
    "owner_profile_id",
    "tenant_user_id",
    "application_id",
    "lease_start_date",
    "lease_end_date",
    "monthly_rent",
    "security_deposit",
    "maintenance_amount",
    "payment_due_day",
    "rent_cycle",
    "lease_status",
    "signed_at",
    "terminated_at",
    "termination_reason",
    "created_at",
  ]);

  const leaseTenantUserId = [null];
  const leaseIdByTenantUserId = new Map();
  const leaseCreatedAt = [null];

  const tenantPool = tenantUserIds.length ? tenantUserIds : seekerLikeUserIds;

  for (let leaseId = 1; leaseId <= CONFIG.leases; leaseId++) {
    const applicationId =
      approvedApplicationIds.length && chance(0.7)
        ? pick(approvedApplicationIds)
        : null;
    const listingId = applicationId ? applicationListingId[applicationId] : randInt(1, CONFIG.listings);
    const propertyId = listingPropertyId[listingId];
    const ownerProfileId = listingOwnerProfileId[listingId];
    const tenantUserId = applicationId ? applicationSeekerId[applicationId] : pick(tenantPool);

    const startDate = randomDateBetween(new Date("2024-01-01T00:00:00Z"), new Date("2026-03-01T00:00:00Z"));
    const months = randInt(6, 24);
    const startDt = new Date(`${startDate}T00:00:00Z`);
    const endDt = new Date(startDt);
    endDt.setUTCMonth(endDt.getUTCMonth() + months);
    const leaseStart = startDate;
    const leaseEnd = endDt.toISOString().slice(0, 10);

    const rent = money(9_000, 180_000);
    const deposit = money(0, 5 * rent);
    const maintenance = money(0, 12_000);
    const dueDay = randInt(1, 28);
    const cycle = pick(rentCycles);
    const status = pick(leaseStatuses);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const signedAt = chance(0.8) ? randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end) : null;
    const terminatedAt = status === "terminated" && signedAt ? randomDateTimeBetween(new Date(signedAt), DATE_RANGE.end) : null;
    const terminationReason = terminatedAt ? pick(["Non-payment", "Mutual agreement", "Moved out early"]) : null;

    leaseTenantUserId[leaseId] = tenantUserId;
    leaseCreatedAt[leaseId] = createdAt;
    if (!leaseIdByTenantUserId.has(tenantUserId)) leaseIdByTenantUserId.set(tenantUserId, leaseId);

    leasesWriter.writeRow([
      listingId,
      propertyId,
      ownerProfileId,
      tenantUserId,
      applicationId,
      leaseStart,
      leaseEnd,
      rent,
      deposit,
      maintenance,
      dueDay,
      cycle,
      status,
      signedAt ? iso(signedAt) : null,
      terminatedAt ? iso(terminatedAt) : null,
      terminationReason,
      iso(createdAt),
    ]);
  }
  await leasesWriter.close();

  // =========================
  // 23) rent_payments
  // =========================
  const rentPaymentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "rent_payments.csv"), [
    "lease_id",
    "tenant_user_id",
    "due_date",
    "paid_at",
    "amount_due",
    "amount_paid",
    "late_fee",
    "payment_method",
    "payment_status",
    "transaction_ref",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.rentPayments; i++) {
    const leaseId = randInt(1, CONFIG.leases);
    const tenantUserId = leaseTenantUserId[leaseId];
    const dueDate = randomDateBetween(new Date("2024-01-01T00:00:00Z"), DATE_RANGE.end);
    const amountDue = money(9_000, 180_000);
    const status = pick(paymentStatuses);
    const amountPaid =
      status === "paid" ? amountDue : status === "partial" ? money(0, amountDue) : 0;
    const lateFee = status === "overdue" ? money(0, 1500) : 0;
    const paidAt = status === "paid" || status === "partial" ? randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end) : null;
    const method = status === "paid" || status === "partial" ? pick(paymentMethods) : null;
    const transactionRef = `rent_txn_${String(i).padStart(12, "0")}`;
    const createdAt = randomDateTimeBetween(leaseCreatedAt[leaseId], DATE_RANGE.end);

    rentPaymentsWriter.writeRow([
      leaseId,
      tenantUserId,
      dueDate,
      paidAt ? iso(paidAt) : null,
      amountDue,
      amountPaid,
      lateFee,
      method,
      status,
      transactionRef,
      iso(createdAt),
    ]);
  }
  await rentPaymentsWriter.close();

  // =========================
  // 24) maintenance_tickets
  // =========================
  const maintenanceWriter = new CsvWriter(
    path.join(OUTPUT_DIR, "maintenance_tickets.csv"),
    [
      "lease_id",
      "property_id",
      "reported_by_user_id",
      "assigned_executive_user_id",
      "issue_type",
      "priority",
      "ticket_status",
      "resolution_cost",
      "opened_at",
      "resolved_at",
      "description",
    ],
  );

  for (let i = 1; i <= CONFIG.maintenanceTickets; i++) {
    const propertyId = randInt(1, CONFIG.properties);
    const leaseId = chance(0.45) ? randInt(1, CONFIG.leases) : null;
    const reportedBy = chance(0.6) ? pick(seekerLikeUserIds) : null;
    const assignedExec = executiveUserIds.length && chance(0.55) ? pick(executiveUserIds) : null;
    const issueType = pick(maintenanceIssueTypes);
    const priority = pick(maintenancePriorities);
    const status = pick(maintenanceStatuses);
    const openedAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const resolvedAt =
      status === "resolved" || status === "closed"
        ? randomDateTimeBetween(openedAt, DATE_RANGE.end)
        : null;
    const cost = resolvedAt && chance(0.8) ? money(0, 25_000) : null;
    const description = chance(0.85) ? faker.lorem.sentence() : null;

    maintenanceWriter.writeRow([
      leaseId,
      propertyId,
      reportedBy,
      assignedExec,
      issueType,
      priority,
      status,
      cost,
      iso(openedAt),
      resolvedAt ? iso(resolvedAt) : null,
      description,
    ]);
  }
  await maintenanceWriter.close();

  // =========================
  // 25) referrals
  // =========================
  const referralsWriter = new CsvWriter(path.join(OUTPUT_DIR, "referrals.csv"), [
    "referrer_user_id",
    "referred_user_id",
    "referral_type",
    "referral_status",
    "reward_amount",
    "converted_at",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.referrals; i++) {
    const referrerUserId = randInt(1, CONFIG.users);
    const referredUserId = chance(0.7) ? randInt(1, CONFIG.users) : null;
    const type = pick(referralTypes);
    const status = pick(referralStatuses);
    const reward = money(0, 5_000);
    const createdAt = randomDateTimeBetween(userCreatedAt[referrerUserId], DATE_RANGE.end);
    const convertedAt = status === "converted" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    referralsWriter.writeRow([
      referrerUserId,
      referredUserId,
      type,
      status,
      reward,
      convertedAt ? iso(convertedAt) : null,
      iso(createdAt),
    ]);
  }
  await referralsWriter.close();

  // =========================
  // 26) support_tickets
  // =========================
  const supportTicketsWriter = new CsvWriter(path.join(OUTPUT_DIR, "support_tickets.csv"), [
    "listing_id",
    "property_id",
    "user_id",
    "ticket_type",
    "ticket_status",
    "priority",
    "resolution_time_mins",
    "created_at",
    "resolved_at",
  ]);

  for (let i = 1; i <= CONFIG.supportTickets; i++) {
    const listingId = chance(0.55) ? randInt(1, CONFIG.listings) : null;
    const propertyId = listingId ? listingPropertyId[listingId] : chance(0.35) ? randInt(1, CONFIG.properties) : null;
    const userId = chance(0.85) ? randInt(1, CONFIG.users) : null;
    const type = pick(supportTicketTypes);
    const status = pick(supportTicketStatuses);
    const priority = pick(supportPriorities);
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const resolvedAt = status === "resolved" || status === "closed" ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    const resolutionMins = resolvedAt ? randInt(5, 7 * 24 * 60) : null;
    supportTicketsWriter.writeRow([
      listingId,
      propertyId,
      userId,
      type,
      status,
      priority,
      resolutionMins,
      iso(createdAt),
      resolvedAt ? iso(resolvedAt) : null,
    ]);
  }
  await supportTicketsWriter.close();

  // =========================
  // 27) app_events
  // =========================
  const appEventsWriter = new CsvWriter(path.join(OUTPUT_DIR, "app_events.csv"), [
    "user_id",
    "listing_id",
    "property_id",
    "session_id",
    "event_name",
    "screen_name",
    "device_type",
    "app_version",
    "city",
    "source_channel",
    "event_time",
    "metadata",
  ]);

  const eventNames = [
    "open_app",
    "view_listing",
    "apply_filters",
    "open_schema",
    "shortlist",
    "send_inquiry",
    "request_visit",
    "submit_offer",
  ];
  const screenNames = ["home", "search", "listing", "shortlist", "profile", "inbox"];
  for (let i = 1; i <= CONFIG.appEvents; i++) {
    const userId = chance(0.85) ? randInt(1, CONFIG.users) : null;
    const listingId = chance(0.6) ? randInt(1, CONFIG.listings) : null;
    const propertyId = listingId ? listingPropertyId[listingId] : chance(0.25) ? randInt(1, CONFIG.properties) : null;
    const sessionId = chance(0.8) ? `ae_${String(i).padStart(12, "0")}` : null;
    const eventName = pick(eventNames);
    const screenName = chance(0.8) ? pick(screenNames) : null;
    const device = chance(0.85) ? pick(deviceTypes) : null;
    const appVersion = chance(0.75) ? `v${randInt(1, 4)}.${randInt(0, 9)}.${randInt(0, 9)}` : null;
    const city = chance(0.8) ? pick(cities) : null;
    const source = chance(0.7) ? pick(viewSourceChannels) : null;
    const eventTime = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    const metadata = json({ ab: chance(0.15) ? "exp1" : null, q: chance(0.2) ? "search" : null });

    appEventsWriter.writeRow([
      userId,
      listingId,
      propertyId,
      sessionId,
      eventName,
      screenName,
      device,
      appVersion,
      city,
      source,
      iso(eventTime),
      metadata,
    ]);
  }
  await appEventsWriter.close();

  console.log("✅ Generated Real Estate seed CSVs");
  console.log(`- Output dir: ${OUTPUT_DIR}`);
  console.log(`- users: ${CONFIG.users}`);
  console.log(`- owner_profiles: ${ownerUserIds.length}`);
  console.log(`- seeker_profiles: ${seekerLikeUserIds.length}`);
  console.log(`- executive_profiles: ${executiveUserIds.length}`);
  console.log(`- properties: ${CONFIG.properties}`);
  console.log(`- listings: ${CONFIG.listings}`);
}

main().catch((err) => {
  console.error("realestateGenerateData error:", err);
  process.exit(1);
});
