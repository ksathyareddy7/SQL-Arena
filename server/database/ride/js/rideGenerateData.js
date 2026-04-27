import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260410);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const CONFIG = {
  users: 20_000,
  drivers: 6_000,
  locations: 4_000,
  promos: 300,
  surgeRows: 2_000,
  shiftsPerDriver: 6,
  trips: 50_000,
  driverLocationLogs: 200_000,
  riderAppEvents: 120_000,
  tripMatchesPerTripMax: 3,
  incentives: 8_000,
  driverSessions: 20_000,
  riderSubscriptions: 6_000,
  safetyIncidents: 900,
  supportTickets: 3_000,
  ratingsTargetRatioFromCompletedTrips: 0.45,
  startDate: new Date("2024-01-01T00:00:00.000Z"),
  endDate: new Date("2026-03-31T23:59:59.999Z"),
  flushEvery: 25_000,
};

const CITIES = [
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Kochi",
];

const RIDE_TYPES = ["bike", "auto", "cab", "premium", "pool"];
const DRIVER_TIERS = ["standard", "gold", "platinum"];
const PAYMENT_METHODS = ["cash", "card", "upi", "wallet"];

const iso = (date) => new Date(date).toISOString();
const randomDateBetween = (from, to) => faker.date.between({ from, to });
const addMinutes = (date, minutes) =>
  new Date(new Date(date).getTime() + minutes * 60_000);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};

class CsvWriter {
  constructor(filename, headers) {
    this.filepath = path.join(OUTPUT_DIR, filename);
    this.headers = headers;
    this.stream = fs.createWriteStream(this.filepath, { encoding: "utf8" });
    this.stream.write(`${headers.join(",")}\n`);
    this.count = 0;
  }

  writeRow(row) {
    const line = this.headers.map((h) => csvEscape(row[h])).join(",") + "\n";
    this.stream.write(line);
    this.count++;
  }

  close() {
    return new Promise((resolve, reject) => {
      this.stream.end(() => resolve());
      this.stream.on("error", reject);
    });
  }
}

const phone10 = () =>
  String(faker.number.int({ min: 6000000000, max: 9999999999 }));

const pick = (arr) => arr[faker.number.int({ min: 0, max: arr.length - 1 })];

const randBool = (pTrue = 0.5) => faker.number.float() < pTrue;

const slugUpper = (s) =>
  String(s)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const boundedFloat = (min, max, decimals = 2) =>
  Number(faker.number.float({ min, max, fractionDigits: decimals }).toFixed(decimals));

const boundedInt = (min, max) => faker.number.int({ min, max });

const buildLicenseNumber = (i) => `DL-${String(i).padStart(8, "0")}`;
const buildReferral = (i) => `RIDE-${String(i).padStart(8, "0")}`;
const buildPlate = (i) => `KA${String(10 + (i % 90)).padStart(2, "0")}${String(i).padStart(6, "0")}`;
const buildTxnRef = (i) => `TXN-${String(i).padStart(12, "0")}`;

const main = async () => {
  const writers = {
    users: new CsvWriter("users.csv", [
      "full_name",
      "email",
      "phone",
      "city",
      "signup_source",
      "signup_channel",
      "referral_code",
      "referred_by_user_id",
      "default_payment_method",
      "is_active",
      "is_verified",
      "last_trip_at",
      "created_at",
    ]),
    drivers: new CsvWriter("drivers.csv", [
      "full_name",
      "email",
      "phone",
      "city",
      "license_number",
      "joined_at",
      "onboarding_completed_at",
      "is_active",
      "is_verified",
      "is_suspended",
      "suspension_reason",
      "driver_tier",
      "rating_avg",
      "completed_trip_count",
      "cancelled_trip_count",
      "last_trip_completed_at",
    ]),
    driver_documents: new CsvWriter("driver_documents.csv", [
      "driver_id",
      "document_type",
      "document_number",
      "issued_at",
      "expires_at",
      "verification_status",
      "verified_at",
      "rejection_reason",
      "created_at",
    ]),
    vehicles: new CsvWriter("vehicles.csv", [
      "driver_id",
      "vehicle_type",
      "brand",
      "model",
      "color",
      "plate_number",
      "manufacture_year",
      "fuel_type",
      "seating_capacity",
      "registration_city",
      "is_active",
      "is_verified",
      "created_at",
    ]),
    locations: new CsvWriter("locations.csv", [
      "city",
      "area_name",
      "zone_name",
      "latitude",
      "longitude",
      "location_type",
      "is_surge_zone",
      "created_at",
    ]),
    driver_shifts: new CsvWriter("driver_shifts.csv", [
      "driver_id",
      "shift_start",
      "shift_end",
      "start_location_id",
      "end_location_id",
      "shift_status",
      "total_online_minutes",
      "total_trip_minutes",
      "total_idle_minutes",
      "created_at",
    ]),
    rider_saved_places: new CsvWriter("rider_saved_places.csv", [
      "user_id",
      "label",
      "location_id",
      "created_at",
    ]),
    promos: new CsvWriter("promos.csv", [
      "code",
      "description",
      "discount_type",
      "discount_value",
      "min_fare",
      "max_discount_amount",
      "starts_at",
      "ends_at",
      "max_uses",
      "uses_count",
      "per_user_limit",
      "applicable_ride_type",
      "is_active",
      "created_at",
    ]),
    surge_pricing: new CsvWriter("surge_pricing.csv", [
      "location_id",
      "ride_type",
      "surge_multiplier",
      "starts_at",
      "ends_at",
      "reason",
      "created_at",
    ]),
    trips: new CsvWriter("trips.csv", [
      "user_id",
      "driver_id",
      "vehicle_id",
      "pickup_location_id",
      "dropoff_location_id",
      "promo_id",
      "shift_id",
      "trip_status",
      "ride_type",
      "requested_at",
      "accepted_at",
      "arrived_at",
      "started_at",
      "completed_at",
      "cancelled_at",
      "cancelled_by",
      "cancellation_reason",
      "estimated_distance_km",
      "actual_distance_km",
      "estimated_duration_mins",
      "actual_duration_mins",
      "estimated_pickup_eta_mins",
      "actual_pickup_eta_mins",
      "rider_wait_time_mins",
      "driver_arrival_delay_mins",
      "base_fare",
      "distance_fare",
      "time_fare",
      "waiting_fee",
      "toll_fee",
      "airport_fee",
      "platform_fee",
      "surge_multiplier",
      "discount_amount",
      "total_fare",
      "rider_device_type",
      "booking_channel",
      "created_at",
    ]),
    fare_components: new CsvWriter("fare_components.csv", [
      "trip_id",
      "component_name",
      "amount",
      "created_at",
    ]),
    trip_events: new CsvWriter("trip_events.csv", [
      "trip_id",
      "event_type",
      "event_time",
      "notes",
    ]),
    trip_status_history: new CsvWriter("trip_status_history.csv", [
      "trip_id",
      "old_status",
      "new_status",
      "changed_at",
      "changed_by",
      "notes",
    ]),
    payments: new CsvWriter("payments.csv", [
      "trip_id",
      "payment_method",
      "payment_provider",
      "payment_status",
      "paid_amount",
      "refund_amount",
      "paid_at",
      "refunded_at",
      "transaction_ref",
      "failure_reason",
      "created_at",
    ]),
    driver_payouts: new CsvWriter("driver_payouts.csv", [
      "driver_id",
      "trip_id",
      "gross_fare",
      "platform_commission",
      "incentive_amount",
      "penalty_amount",
      "net_payout",
      "payout_status",
      "processed_at",
      "created_at",
    ]),
    driver_location_logs: new CsvWriter("driver_location_logs.csv", [
      "driver_id",
      "latitude",
      "longitude",
      "speed_kmph",
      "heading_degree",
      "accuracy_meters",
      "is_online",
      "availability_status",
      "recorded_at",
    ]),
    trip_driver_matches: new CsvWriter("trip_driver_matches.csv", [
      "trip_id",
      "driver_id",
      "offered_at",
      "responded_at",
      "response_status",
      "estimated_pickup_eta_mins",
      "distance_to_rider_km",
      "offer_round",
      "created_at",
    ]),
    rider_app_events: new CsvWriter("rider_app_events.csv", [
      "user_id",
      "trip_id",
      "session_id",
      "event_name",
      "screen_name",
      "device_type",
      "app_version",
      "city",
      "source_channel",
      "event_time",
      "metadata",
    ]),
    driver_incentives: new CsvWriter("driver_incentives.csv", [
      "driver_id",
      "incentive_type",
      "incentive_name",
      "target_trip_count",
      "achieved_trip_count",
      "target_amount",
      "incentive_amount",
      "period_start",
      "period_end",
      "status",
      "paid_at",
      "created_at",
    ]),
    driver_sessions: new CsvWriter("driver_sessions.csv", [
      "driver_id",
      "login_at",
      "logout_at",
      "session_status",
      "app_version",
      "device_type",
      "city",
      "created_at",
    ]),
    rider_subscriptions: new CsvWriter("rider_subscriptions.csv", [
      "user_id",
      "plan_name",
      "plan_type",
      "amount",
      "benefits_summary",
      "starts_at",
      "ends_at",
      "is_active",
      "auto_renew",
      "created_at",
    ]),
    safety_incidents: new CsvWriter("safety_incidents.csv", [
      "trip_id",
      "user_id",
      "driver_id",
      "severity",
      "issue_type",
      "incident_status",
      "reported_at",
      "resolved_at",
      "notes",
    ]),
    ratings: new CsvWriter("ratings.csv", [
      "trip_id",
      "user_id",
      "driver_id",
      "rating",
      "review_text",
      "issue_tag",
      "created_at",
    ]),
    support_tickets: new CsvWriter("support_tickets.csv", [
      "trip_id",
      "user_id",
      "driver_id",
      "ticket_type",
      "ticket_status",
      "priority",
      "resolution_time_mins",
      "created_at",
      "resolved_at",
    ]),
  };

  const userCity = new Array(CONFIG.users + 1);
  const driverCity = new Array(CONFIG.drivers + 1);

  for (let i = 1; i <= CONFIG.users; i++) {
    const city = pick(CITIES);
    userCity[i] = city;
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const referredBy =
      i > 5 && randBool(0.12) ? boundedInt(1, i - 1) : null;

    writers.users.writeRow({
      full_name: faker.person.fullName(),
      email: `rider_${i}@ride.test`,
      phone: phone10(),
      city,
      signup_source: pick(["organic", "referral", "ads", "partnership"]),
      signup_channel: pick(["app", "web", "phone"]),
      referral_code: buildReferral(i),
      referred_by_user_id: referredBy,
      default_payment_method: pick(PAYMENT_METHODS),
      is_active: randBool(0.92),
      is_verified: randBool(0.65),
      last_trip_at: "",
      created_at: iso(createdAt),
    });
  }

  for (let i = 1; i <= CONFIG.drivers; i++) {
    const city = pick(CITIES);
    driverCity[i] = city;
    const joinedAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const onboarded =
      randBool(0.85) ? iso(addMinutes(joinedAt, boundedInt(120, 60 * 24 * 7))) : "";
    const isSuspended = randBool(0.02);
    writers.drivers.writeRow({
      full_name: faker.person.fullName(),
      email: `driver_${i}@ride.test`,
      phone: phone10(),
      city,
      license_number: buildLicenseNumber(i),
      joined_at: iso(joinedAt),
      onboarding_completed_at: onboarded,
      is_active: !isSuspended && randBool(0.9),
      is_verified: randBool(0.7),
      is_suspended: isSuspended,
      suspension_reason: isSuspended ? pick(["KYC pending", "Complaints", "Fraud risk"]) : "",
      driver_tier: pick(DRIVER_TIERS),
      rating_avg: boundedFloat(3.2, 5.0, 2),
      completed_trip_count: 0,
      cancelled_trip_count: 0,
      last_trip_completed_at: "",
    });
  }

  const docTypes = [
    "license",
    "insurance",
    "registration",
    "permit",
    "background_check",
  ];
  const docStatuses = ["pending", "verified", "rejected", "expired"];
  for (let driverId = 1; driverId <= CONFIG.drivers; driverId++) {
    const docCount = boundedInt(2, 4);
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const used = new Set();
    for (let j = 0; j < docCount; j++) {
      let type = pick(docTypes);
      while (used.has(type)) type = pick(docTypes);
      used.add(type);

      const issuedAt = randomDateBetween(CONFIG.startDate, createdAt);
      const expiresAt = addMinutes(issuedAt, boundedInt(60 * 24 * 365, 60 * 24 * 365 * 5));
      const status = pick(docStatuses);
      const verifiedAt = status === "verified" ? iso(addMinutes(issuedAt, boundedInt(60, 60 * 24 * 20))) : "";

      writers.driver_documents.writeRow({
        driver_id: driverId,
        document_type: type,
        document_number: `${slugUpper(type)}-${driverId}-${j + 1}`,
        issued_at: iso(issuedAt),
        expires_at: iso(expiresAt),
        verification_status: status,
        verified_at: verifiedAt,
        rejection_reason: status === "rejected" ? pick(["Blurry photo", "Mismatch", "Expired"]) : "",
        created_at: iso(createdAt),
      });
    }
  }

  const fuelTypes = ["petrol", "diesel", "electric", "cng", "hybrid"];
  const vehicleTypes = ["bike", "auto", "cab", "premium"];
  for (let driverId = 1; driverId <= CONFIG.drivers; driverId++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const vehicleType = pick(vehicleTypes);
    writers.vehicles.writeRow({
      driver_id: driverId,
      vehicle_type: vehicleType,
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      color: faker.color.human(),
      plate_number: buildPlate(driverId),
      manufacture_year: boundedInt(2012, 2026),
      fuel_type: pick(fuelTypes),
      seating_capacity: vehicleType === "bike" ? 2 : boundedInt(3, 6),
      registration_city: driverCity[driverId],
      is_active: randBool(0.95),
      is_verified: randBool(0.7),
      created_at: iso(createdAt),
    });
  }

  const locationTypes = [
    "pickup",
    "dropoff",
    "hub",
    "airport",
    "station",
    "hotspot",
    "residential",
    "commercial",
  ];
  for (let i = 1; i <= CONFIG.locations; i++) {
    const city = pick(CITIES);
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.locations.writeRow({
      city,
      area_name: faker.location.street(),
      zone_name: pick(["North", "South", "East", "West", "Central"]),
      latitude: boundedFloat(12.80, 13.20, 6),
      longitude: boundedFloat(77.45, 77.80, 6),
      location_type: pick(locationTypes),
      is_surge_zone: randBool(0.12),
      created_at: iso(createdAt),
    });
  }

  for (let i = 1; i <= CONFIG.promos; i++) {
    const startsAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const endsAt = addMinutes(startsAt, boundedInt(60 * 24 * 7, 60 * 24 * 120));
    const discountType = randBool(0.6) ? "percent" : "fixed";
    const discountValue =
      discountType === "percent" ? boundedFloat(5, 30, 2) : boundedFloat(10, 120, 2);
    writers.promos.writeRow({
      code: `RIDE${String(i).padStart(4, "0")}`,
      description: faker.lorem.sentence(),
      discount_type: discountType,
      discount_value: discountValue,
      min_fare: boundedFloat(0, 80, 2),
      max_discount_amount: discountType === "percent" ? boundedFloat(40, 250, 2) : "",
      starts_at: iso(startsAt),
      ends_at: iso(endsAt),
      max_uses: boundedInt(500, 50_000),
      uses_count: boundedInt(0, 200),
      per_user_limit: boundedInt(1, 5),
      applicable_ride_type: randBool(0.7) ? pick(RIDE_TYPES) : "",
      is_active: randBool(0.7),
      created_at: iso(startsAt),
    });
  }

  for (let i = 0; i < CONFIG.surgeRows; i++) {
    const startsAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const endsAt = addMinutes(startsAt, boundedInt(15, 180));
    writers.surge_pricing.writeRow({
      location_id: boundedInt(1, CONFIG.locations),
      ride_type: pick(RIDE_TYPES),
      surge_multiplier: boundedFloat(1.0, 2.8, 2),
      starts_at: iso(startsAt),
      ends_at: iso(endsAt),
      reason: pick(["rain", "peak", "event", "airport_rush", "high_demand"]),
      created_at: iso(startsAt),
    });
  }

  for (let driverId = 1; driverId <= CONFIG.drivers; driverId++) {
    for (let j = 0; j < CONFIG.shiftsPerDriver; j++) {
      const shiftStart = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
      const shiftDuration = boundedInt(60, 60 * 10);
      const shiftEnd = addMinutes(shiftStart, shiftDuration);
      const online = shiftDuration;
      const tripMinutes = boundedInt(0, online);
      const idle = online - tripMinutes;
      const status = randBool(0.93) ? "closed" : pick(["open", "cancelled"]);
      writers.driver_shifts.writeRow({
        driver_id: driverId,
        shift_start: iso(shiftStart),
        shift_end: status === "open" ? "" : iso(shiftEnd),
        start_location_id: boundedInt(1, CONFIG.locations),
        end_location_id: boundedInt(1, CONFIG.locations),
        shift_status: status,
        total_online_minutes: online,
        total_trip_minutes: tripMinutes,
        total_idle_minutes: idle,
        created_at: iso(shiftStart),
      });
    }
  }

  const savedPlaceLabels = ["Home", "Work", "Gym", "Airport"];
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    if (!randBool(0.3)) continue;
    const labels = faker.helpers.arrayElements(savedPlaceLabels, boundedInt(1, 2));
    for (const label of labels) {
      writers.rider_saved_places.writeRow({
        user_id: userId,
        label,
        location_id: boundedInt(1, CONFIG.locations),
        created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
      });
    }
  }

  const tripStatusWeights = [
    ["completed", 0.72],
    ["cancelled", 0.12],
    ["expired", 0.03],
    ["in_progress", 0.05],
    ["arriving", 0.03],
    ["accepted", 0.03],
    ["requested", 0.02],
  ];
  const pickTripStatus = () => {
    const r = faker.number.float();
    let acc = 0;
    for (const [status, w] of tripStatusWeights) {
      acc += w;
      if (r <= acc) return status;
    }
    return "completed";
  };

  let completedTrips = 0;
  const completedTripIds = [];
  const tripDriver = new Array(CONFIG.trips + 1).fill(null);
  const tripUser = new Array(CONFIG.trips + 1).fill(null);
  const tripTotalFare = new Array(CONFIG.trips + 1).fill(0);
  const tripCompletedAt = new Array(CONFIG.trips + 1).fill(null);

  const shiftsTotal = CONFIG.drivers * CONFIG.shiftsPerDriver;

  for (let tripId = 1; tripId <= CONFIG.trips; tripId++) {
    const tripStatus = pickTripStatus();
    const rideType = pick(RIDE_TYPES);

    const userId = boundedInt(1, CONFIG.users);
    const hasDriver = tripStatus !== "requested" && tripStatus !== "expired" ? randBool(0.95) : false;
    const driverId = hasDriver ? boundedInt(1, CONFIG.drivers) : "";
    const vehicleId = hasDriver ? Number(driverId) : "";
    const shiftId = hasDriver ? boundedInt(1, shiftsTotal) : "";
    const pickupLocationId = boundedInt(1, CONFIG.locations);
    let dropoffLocationId = boundedInt(1, CONFIG.locations);
    if (dropoffLocationId === pickupLocationId) dropoffLocationId = clamp(dropoffLocationId + 1, 1, CONFIG.locations);

    const requestedAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const estimatedPickupEta = boundedInt(2, 18);
    const acceptedAt =
      hasDriver && ["accepted", "arriving", "in_progress", "completed", "cancelled"].includes(tripStatus)
        ? iso(addMinutes(requestedAt, boundedInt(1, 4)))
        : "";
    const arrivedAt =
      hasDriver && ["arriving", "in_progress", "completed", "cancelled"].includes(tripStatus)
        ? iso(addMinutes(new Date(acceptedAt || requestedAt), boundedInt(estimatedPickupEta - 1, estimatedPickupEta + 6)))
        : "";
    const startedAt =
      hasDriver && ["in_progress", "completed", "cancelled"].includes(tripStatus)
        ? iso(addMinutes(new Date(arrivedAt || acceptedAt || requestedAt), boundedInt(0, 5)))
        : "";
    const estimatedDistanceKm = boundedFloat(1.0, 22.0, 2);
    const actualDistanceKm =
      tripStatus === "completed" ? boundedFloat(estimatedDistanceKm * 0.9, estimatedDistanceKm * 1.2, 2) : "";
    const estimatedDurationMins = boundedInt(6, 55);
    const actualDurationMins =
      tripStatus === "completed" ? boundedInt(Math.max(1, estimatedDurationMins - 6), estimatedDurationMins + 12) : "";

    const completedAt =
      tripStatus === "completed"
        ? iso(addMinutes(new Date(startedAt || acceptedAt || requestedAt), Number(actualDurationMins || estimatedDurationMins)))
        : "";
    const cancelledAt =
      tripStatus === "cancelled"
        ? iso(addMinutes(new Date(acceptedAt || requestedAt), boundedInt(1, 12)))
        : "";

    const cancelledBy =
      tripStatus === "cancelled" ? pick(["rider", "driver", "system"]) : "";
    const cancellationReason =
      tripStatus === "cancelled"
        ? pick(["driver_no_show", "rider_changed_mind", "payment_issue", "system_timeout"])
        : "";

    const actualPickupEta =
      hasDriver && acceptedAt
        ? clamp(
            Math.round((new Date(arrivedAt || acceptedAt).getTime() - new Date(acceptedAt).getTime()) / 60_000),
            0,
            60,
          )
        : "";

    const riderWait = arrivedAt && startedAt ? clamp(Math.round((new Date(startedAt).getTime() - new Date(arrivedAt).getTime()) / 60_000), 0, 30) : "";
    const driverArrivalDelay =
      acceptedAt && estimatedPickupEta
        ? clamp(Number(actualPickupEta || 0) - Number(estimatedPickupEta), 0, 45)
        : "";

    const baseFare = boundedFloat(25, 90, 2);
    const distanceFare = boundedFloat(estimatedDistanceKm * 6, estimatedDistanceKm * 11, 2);
    const timeFare = boundedFloat(estimatedDurationMins * 1.2, estimatedDurationMins * 2.4, 2);
    const waitingFee = riderWait ? boundedFloat(0, Number(riderWait) * 2.2, 2) : 0;
    const tollFee = randBool(0.05) ? boundedFloat(10, 220, 2) : 0;
    const airportFee = randBool(0.06) ? boundedFloat(20, 80, 2) : 0;
    const platformFee = boundedFloat(5, 20, 2);
    const surgeMultiplier = randBool(0.14) ? boundedFloat(1.1, 2.3, 2) : 1.0;

    const subTotal = baseFare + distanceFare + timeFare + waitingFee + tollFee + airportFee + platformFee;
    const surgedTotal = Number((subTotal * surgeMultiplier).toFixed(2));

    const promoId = randBool(0.18) ? boundedInt(1, CONFIG.promos) : "";
    let discountAmount = 0;
    if (promoId) {
      discountAmount = boundedFloat(5, Math.min(150, surgedTotal * 0.3), 2);
    }
    const totalFare = Math.max(0, Number((surgedTotal - discountAmount).toFixed(2)));

    const riderDeviceType = pick(["android", "ios", "web"]);
    const bookingChannel = pick(["app", "web", "phone"]);

    writers.trips.writeRow({
      user_id: userId,
      driver_id: driverId,
      vehicle_id: vehicleId,
      pickup_location_id: pickupLocationId,
      dropoff_location_id: dropoffLocationId,
      promo_id: promoId,
      shift_id: shiftId,
      trip_status: tripStatus,
      ride_type: rideType,
      requested_at: iso(requestedAt),
      accepted_at: acceptedAt,
      arrived_at: arrivedAt,
      started_at: startedAt,
      completed_at: completedAt,
      cancelled_at: cancelledAt,
      cancelled_by: cancelledBy,
      cancellation_reason: cancellationReason,
      estimated_distance_km: estimatedDistanceKm,
      actual_distance_km: actualDistanceKm,
      estimated_duration_mins: estimatedDurationMins,
      actual_duration_mins: actualDurationMins,
      estimated_pickup_eta_mins: estimatedPickupEta,
      actual_pickup_eta_mins: actualPickupEta,
      rider_wait_time_mins: riderWait,
      driver_arrival_delay_mins: driverArrivalDelay,
      base_fare: baseFare,
      distance_fare: distanceFare,
      time_fare: timeFare,
      waiting_fee: waitingFee,
      toll_fee: tollFee,
      airport_fee: airportFee,
      platform_fee: platformFee,
      surge_multiplier: surgeMultiplier,
      discount_amount: discountAmount,
      total_fare: totalFare,
      rider_device_type: riderDeviceType,
      booking_channel: bookingChannel,
      created_at: iso(requestedAt),
    });

    tripDriver[tripId] = driverId ? Number(driverId) : null;
    tripUser[tripId] = userId;
    tripTotalFare[tripId] = totalFare;
    if (tripStatus === "completed") {
      completedTrips++;
      completedTripIds.push(tripId);
      tripCompletedAt[tripId] = completedAt ? new Date(completedAt) : null;
    }

    if (tripId % CONFIG.flushEvery === 0) {
      console.log(`Generated trips: ${tripId} / ${CONFIG.trips} (completed=${completedTrips})`);
    }
  }

  for (let tripId = 1; tripId <= CONFIG.trips; tripId++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const base = tripTotalFare[tripId] || 0;
    const baseCreatedAt = tripCompletedAt[tripId] ? tripCompletedAt[tripId] : createdAt;
    const discountAmount = randBool(0.2) ? boundedFloat(0, Math.min(80, base * 0.25), 2) : 0;
    const hasPaid = randBool(0.92);
    const status = hasPaid ? "successful" : pick(["failed", "pending"]);
    const paidAt = status === "successful" ? iso(addMinutes(baseCreatedAt, boundedInt(0, 15))) : "";
    const refund = status === "successful" && randBool(0.03) ? boundedFloat(10, Math.min(200, base * 0.6), 2) : 0;
    const refundedAt = refund ? iso(addMinutes(new Date(paidAt || baseCreatedAt), boundedInt(60, 60 * 24 * 10))) : "";

    writers.payments.writeRow({
      trip_id: tripId,
      payment_method: pick(PAYMENT_METHODS),
      payment_provider: pick(["razorpay", "stripe", "paytm", "phonepe", "cash"]),
      payment_status: refund ? "refunded" : status,
      paid_amount: status === "successful" ? base : 0,
      refund_amount: refund,
      paid_at: paidAt,
      refunded_at: refundedAt,
      transaction_ref: buildTxnRef(tripId),
      failure_reason: status === "failed" ? pick(["insufficient_funds", "timeout", "upi_failed"]) : "",
      created_at: iso(baseCreatedAt),
    });
  }

  for (let tripId = 1; tripId <= CONFIG.trips; tripId++) {
    const driverId = tripDriver[tripId];
    if (!driverId) continue;
    const gross = tripTotalFare[tripId] || 0;
    const commission = Number((gross * boundedFloat(0.15, 0.28, 3)).toFixed(2));
    const incentive = randBool(0.12) ? boundedFloat(5, 80, 2) : 0;
    const penalty = randBool(0.03) ? boundedFloat(5, 60, 2) : 0;
    const net = Number((gross - commission + incentive - penalty).toFixed(2));
    const createdAt = tripCompletedAt[tripId] ? tripCompletedAt[tripId] : randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const status = randBool(0.9) ? "processed" : pick(["pending", "failed"]);
    const processedAt = status === "processed" ? iso(addMinutes(createdAt, boundedInt(60, 60 * 72))) : "";

    writers.driver_payouts.writeRow({
      driver_id: driverId,
      trip_id: tripId,
      gross_fare: gross,
      platform_commission: commission,
      incentive_amount: incentive,
      penalty_amount: penalty,
      net_payout: net,
      payout_status: status,
      processed_at: processedAt,
      created_at: iso(createdAt),
    });
  }

  const fareComponentNames = [
    "base_fare",
    "distance_fare",
    "time_fare",
    "waiting_fee",
    "toll_fee",
    "airport_fee",
    "platform_fee",
  ];
  for (let tripId = 1; tripId <= CONFIG.trips; tripId++) {
    const createdAt = tripCompletedAt[tripId] ? tripCompletedAt[tripId] : randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const compCount = boundedInt(4, 7);
    for (let j = 0; j < compCount; j++) {
      const name = fareComponentNames[j % fareComponentNames.length];
      writers.fare_components.writeRow({
        trip_id: tripId,
        component_name: name,
        amount: boundedFloat(1, Math.max(3, tripTotalFare[tripId] / 6), 2),
        created_at: iso(createdAt),
      });
    }
    if (randBool(0.35)) {
      writers.fare_components.writeRow({
        trip_id: tripId,
        component_name: "discount",
        amount: boundedFloat(0, Math.min(60, tripTotalFare[tripId] * 0.2), 2),
        created_at: iso(createdAt),
      });
    }
    if (randBool(0.18)) {
      writers.fare_components.writeRow({
        trip_id: tripId,
        component_name: "surge",
        amount: boundedFloat(0, Math.min(140, tripTotalFare[tripId] * 0.35), 2),
        created_at: iso(createdAt),
      });
    }
  }

  const statusFlow = [
    "requested",
    "accepted",
    "arriving",
    "in_progress",
    "completed",
  ];
  for (let tripId = 1; tripId <= CONFIG.trips; tripId++) {
    const t = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const driverId = tripDriver[tripId];
    const hasDriver = Boolean(driverId);

    writers.trip_events.writeRow({
      trip_id: tripId,
      event_type: "requested",
      event_time: iso(t),
      notes: "",
    });
    let old = "";
    let current = "requested";
    const steps = hasDriver ? boundedInt(2, 5) : 1;
    for (let i = 1; i < steps; i++) {
      old = current;
      current = statusFlow[i] || "completed";
      const changedAt = iso(addMinutes(t, boundedInt(1, 25) * i));
      writers.trip_status_history.writeRow({
        trip_id: tripId,
        old_status: old,
        new_status: current,
        changed_at: changedAt,
        changed_by: pick(["system", "driver", "rider"]),
        notes: "",
      });
      writers.trip_events.writeRow({
        trip_id: tripId,
        event_type:
          current === "accepted"
            ? "driver_assigned"
            : current === "arriving"
              ? "driver_arriving"
              : current === "in_progress"
                ? "trip_started"
                : current === "completed"
                  ? "trip_completed"
                  : "requested",
        event_time: changedAt,
        notes: "",
      });
    }
  }

  for (let i = 0; i < CONFIG.driverLocationLogs; i++) {
    const driverId = boundedInt(1, CONFIG.drivers);
    const recordedAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.driver_location_logs.writeRow({
      driver_id: driverId,
      latitude: boundedFloat(12.80, 13.20, 6),
      longitude: boundedFloat(77.45, 77.80, 6),
      speed_kmph: boundedFloat(0, 70, 2),
      heading_degree: boundedFloat(0, 359.99, 2),
      accuracy_meters: boundedFloat(3, 30, 2),
      is_online: randBool(0.7),
      availability_status: pick(["available", "on_trip", "offline", "break"]),
      recorded_at: iso(recordedAt),
    });
  }

  for (let tripId = 1; tripId <= CONFIG.trips; tripId++) {
    const offeredAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const rounds = boundedInt(1, CONFIG.tripMatchesPerTripMax);
    const usedDrivers = new Set();
    for (let r = 1; r <= rounds; r++) {
      let driverId = boundedInt(1, CONFIG.drivers);
      while (usedDrivers.has(driverId)) driverId = boundedInt(1, CONFIG.drivers);
      usedDrivers.add(driverId);
      const status = r === rounds ? pick(["accepted", "timeout"]) : pick(["rejected", "timeout", "ignored"]);
      const respondedAt = status === "timeout" ? "" : iso(addMinutes(offeredAt, boundedInt(1, 3) * r));
      writers.trip_driver_matches.writeRow({
        trip_id: tripId,
        driver_id: driverId,
        offered_at: iso(offeredAt),
        responded_at: respondedAt,
        response_status: status,
        estimated_pickup_eta_mins: boundedInt(2, 18),
        distance_to_rider_km: boundedFloat(0.2, 6.0, 2),
        offer_round: r,
        created_at: iso(offeredAt),
      });
    }
  }

  for (let i = 0; i < CONFIG.riderAppEvents; i++) {
    const userId = boundedInt(1, CONFIG.users);
    const tripId = randBool(0.5) ? boundedInt(1, CONFIG.trips) : "";
    const eventTime = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.rider_app_events.writeRow({
      user_id: userId,
      trip_id: tripId,
      session_id: faker.string.uuid(),
      event_name: pick(["open_app", "view_estimate", "request_ride", "cancel_ride", "rate_trip", "add_payment"]),
      screen_name: pick(["home", "estimate", "checkout", "trip", "receipt", "profile"]),
      device_type: pick(["android", "ios"]),
      app_version: `v${boundedInt(1, 4)}.${boundedInt(0, 20)}.${boundedInt(0, 50)}`,
      city: userCity[userId],
      source_channel: pick(["organic", "referral", "ads"]),
      event_time: iso(eventTime),
      metadata: "{}",
    });
  }

  for (let i = 0; i < CONFIG.incentives; i++) {
    const driverId = boundedInt(1, CONFIG.drivers);
    const periodStart = faker.date.between({
      from: CONFIG.startDate,
      to: CONFIG.endDate,
    });
    const periodEnd = addMinutes(periodStart, 60 * 24 * boundedInt(7, 60));
    const type = pick([
      "trip_target",
      "peak_hour_bonus",
      "acceptance_bonus",
      "guaranteed_earnings",
      "referral_bonus",
    ]);
    const targetTrips = type === "trip_target" ? boundedInt(20, 120) : "";
    const achieved = targetTrips ? boundedInt(0, Number(targetTrips)) : 0;
    const amount = boundedFloat(50, 800, 2);
    const status = achieved && targetTrips && achieved >= targetTrips ? "achieved" : pick(["active", "expired", "paid"]);
    const paidAt = status === "paid" ? iso(addMinutes(periodEnd, boundedInt(60, 60 * 72))) : "";
    writers.driver_incentives.writeRow({
      driver_id: driverId,
      incentive_type: type,
      incentive_name: `${type.replace(/_/g, " ")} ${boundedInt(1, 999)}`,
      target_trip_count: targetTrips,
      achieved_trip_count: achieved,
      target_amount: "",
      incentive_amount: amount,
      period_start: iso(periodStart).slice(0, 10),
      period_end: iso(periodEnd).slice(0, 10),
      status,
      paid_at: paidAt,
      created_at: iso(periodStart),
    });
  }

  for (let i = 0; i < CONFIG.driverSessions; i++) {
    const driverId = boundedInt(1, CONFIG.drivers);
    const loginAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const duration = boundedInt(5, 60 * 10);
    const logoutAt = randBool(0.85) ? iso(addMinutes(loginAt, duration)) : "";
    const status = logoutAt ? pick(["closed", "force_closed"]) : "active";
    writers.driver_sessions.writeRow({
      driver_id: driverId,
      login_at: iso(loginAt),
      logout_at: logoutAt,
      session_status: status,
      app_version: `v${boundedInt(1, 4)}.${boundedInt(0, 20)}.${boundedInt(0, 50)}`,
      device_type: pick(["android", "ios"]),
      city: driverCity[driverId],
      created_at: iso(loginAt),
    });
  }

  for (let i = 0; i < CONFIG.riderSubscriptions; i++) {
    const userId = boundedInt(1, CONFIG.users);
    const startsAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const planType = pick(["monthly", "quarterly", "yearly", "trial"]);
    const durationDays =
      planType === "monthly"
        ? 30
        : planType === "quarterly"
          ? 90
          : planType === "yearly"
            ? 365
            : 14;
    const endsAt = addMinutes(startsAt, 60 * 24 * durationDays);
    const isActive = randBool(0.6);
    writers.rider_subscriptions.writeRow({
      user_id: userId,
      plan_name: pick(["Saver", "Plus", "Elite", "Trial"]),
      plan_type: planType,
      amount: planType === "trial" ? 0 : boundedFloat(49, 999, 2),
      benefits_summary: pick([
        "Reduced platform fees",
        "Priority matching",
        "Free cancellations",
        "Support priority",
      ]),
      starts_at: iso(startsAt),
      ends_at: iso(endsAt),
      is_active: isActive,
      auto_renew: randBool(0.3),
      created_at: iso(startsAt),
    });
  }

  for (let i = 0; i < CONFIG.safetyIncidents; i++) {
    const tripId = randBool(0.85) ? boundedInt(1, CONFIG.trips) : "";
    const userId = randBool(0.85) ? boundedInt(1, CONFIG.users) : "";
    const driverId = randBool(0.75) ? boundedInt(1, CONFIG.drivers) : "";
    const reportedAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const status = pick(["open", "investigating", "resolved", "closed"]);
    const resolvedAt = status === "resolved" || status === "closed" ? iso(addMinutes(reportedAt, boundedInt(60, 60 * 24 * 14))) : "";
    writers.safety_incidents.writeRow({
      trip_id: tripId,
      user_id: userId,
      driver_id: driverId,
      severity: pick(["low", "medium", "high", "critical"]),
      issue_type: pick([
        "rash_driving",
        "route_deviation",
        "harassment",
        "vehicle_issue",
        "accident",
        "unsafe_stop",
        "other",
      ]),
      incident_status: status,
      reported_at: iso(reportedAt),
      resolved_at: resolvedAt,
      notes: faker.lorem.sentence(),
    });
  }

  const ratingIssueTags = [
    "late_pickup",
    "rude_behavior",
    "unsafe_driving",
    "cleanliness",
    "great_service",
  ];
  const ratingsTarget = Math.floor(
    completedTripIds.length * CONFIG.ratingsTargetRatioFromCompletedTrips,
  );
  const ratedTripSet = new Set();
  while (ratedTripSet.size < ratingsTarget) {
    ratedTripSet.add(pick(completedTripIds));
  }
  for (const tripId of ratedTripSet) {
    const userId = tripUser[tripId];
    const driverId = tripDriver[tripId];
    if (!driverId) continue;
    writers.ratings.writeRow({
      trip_id: tripId,
      user_id: userId,
      driver_id: driverId,
      rating: boundedInt(1, 5),
      review_text: randBool(0.7) ? faker.lorem.sentences({ min: 1, max: 2 }) : "",
      issue_tag: randBool(0.5) ? pick(ratingIssueTags) : "",
      created_at: iso(addMinutes(tripCompletedAt[tripId] || CONFIG.endDate, boundedInt(2, 120))),
    });
  }

  for (let i = 0; i < CONFIG.supportTickets; i++) {
    const tripId = randBool(0.75) ? boundedInt(1, CONFIG.trips) : "";
    const userId = randBool(0.85) ? boundedInt(1, CONFIG.users) : "";
    const driverId = randBool(0.55) ? boundedInt(1, CONFIG.drivers) : "";
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const status = pick(["open", "in_progress", "resolved", "closed"]);
    const resolvedAt =
      status === "resolved" || status === "closed"
        ? iso(addMinutes(createdAt, boundedInt(30, 60 * 24 * 10)))
        : "";
    writers.support_tickets.writeRow({
      trip_id: tripId,
      user_id: userId,
      driver_id: driverId,
      ticket_type: pick([
        "fare_issue",
        "safety",
        "payment_issue",
        "driver_behavior",
        "rider_behavior",
        "other",
      ]),
      ticket_status: status,
      priority: pick(["low", "medium", "high", "critical"]),
      resolution_time_mins: resolvedAt
        ? Math.max(0, Math.round((new Date(resolvedAt).getTime() - new Date(createdAt).getTime()) / 60_000))
        : "",
      created_at: iso(createdAt),
      resolved_at: resolvedAt,
    });
  }

  await Promise.all(Object.values(writers).map((w) => w.close()));

  console.log("✅ Ride seed CSVs written to", OUTPUT_DIR);
  for (const [key, writer] of Object.entries(writers)) {
    console.log(`- ${key}: ${writer.count.toLocaleString()}`);
  }
};

main().catch((err) => {
  console.error("❌ Ride seed generation failed:", err);
  process.exitCode = 1;
});
