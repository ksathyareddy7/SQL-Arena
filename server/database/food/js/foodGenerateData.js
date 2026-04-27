import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260405);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const CONFIG = {
  users: 30_000,
  addressesMinPerUser: 1,
  addressesMaxPerUser: 3,
  restaurants: 5_000,
  drivers: 4_000,
  coupons: 2_000,
  menuItemsMinPerRestaurant: 6,
  menuItemsMaxPerRestaurant: 12,
  orders: 200_000,
  minItemsPerOrder: 1,
  maxItemsPerOrder: 4,
  maxQtyPerItem: 4,
  reviewsTargetRatioFromDeliveredOrders: 0.4,
  supportTicketsRatioFromOrders: 0.01,
  menuAvailabilityLogRatioFromMenuItems: 0.15,
  driverShiftsPerDriver: 6,
  startDate: new Date("2024-01-01T00:00:00.000Z"),
  endDate: new Date("2026-03-31T23:59:59.999Z"),
  flushEvery: 25_000,
};

const iso = (date) => new Date(date).toISOString();
const isoDate = (date) => new Date(date).toISOString().slice(0, 10);
const isoTime = (date) => new Date(date).toISOString().slice(11, 19);
const randomDateBetween = (from, to) => faker.date.between({ from, to });
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const addMinutes = (date, minutes) =>
  new Date(new Date(date).getTime() + minutes * 60_000);
const randomSoon = (refDate, maxMinutes = 60) =>
  faker.date.between({ from: refDate, to: addMinutes(refDate, maxMinutes) });
const addDays = (date, days) =>
  new Date(new Date(date).getTime() + days * 24 * 60 * 60_000);

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};

const phone10 = () =>
  String(faker.number.int({ min: 6000000000, max: 9999999999 }));

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

const cuisines = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "American",
  "Japanese",
  "Mediterranean",
  "Korean",
  "Middle Eastern",
];

const menuCategories = [
  "Starters",
  "Mains",
  "Desserts",
  "Beverages",
  "Sides",
  "Combos",
];

const signupSources = ["app", "web", "referral", "ads"];
const addressLabels = ["Home", "Work", "Other"];

const vehicleTypes = ["bike", "scooter", "car"];

const orderStatuses = [
  { value: "placed", weight: 10 },
  { value: "preparing", weight: 10 },
  { value: "picked_up", weight: 10 },
  { value: "delivered", weight: 60 },
  { value: "canceled", weight: 10 },
];

const paymentMethods = ["upi", "card", "cash", "wallet"];
const paymentGateways = ["razorpay", "stripe", "paytm", "cash"];
const paymentStatuses = [
  { value: "succeeded", weight: 92 },
  { value: "failed", weight: 8 },
];

const weightedChoice = (choices) => {
  let total = 0;
  for (const c of choices) total += c.weight;
  let r = Math.random() * total;
  for (const c of choices) {
    r -= c.weight;
    if (r <= 0) return c.value;
  }
  return choices[choices.length - 1].value;
};

const writers = {
  users: new CsvWriter("users.csv", [
    "full_name",
    "email",
    "phone",
    "gender",
    "date_of_birth",
    "default_city",
    "signup_source",
    "loyalty_points",
    "is_active",
    "created_at",
  ]),
  user_addresses: new CsvWriter("user_addresses.csv", [
    "user_id",
    "label",
    "address_line1",
    "address_line2",
    "area",
    "city",
    "state",
    "postal_code",
    "latitude",
    "longitude",
    "is_default",
    "created_at",
  ]),
  restaurants: new CsvWriter("restaurants.csv", [
    "owner_user_id",
    "name",
    "legal_name",
    "city",
    "area",
    "cuisine",
    "cost_for_two",
    "opening_time",
    "closing_time",
    "avg_prep_time_minutes",
    "min_order_amount",
    "commission_rate",
    "packaging_charge_default",
    "rating_avg",
    "total_ratings",
    "is_veg_only",
    "is_active",
    "created_at",
  ]),
  restaurant_operating_hours: new CsvWriter(
    "restaurant_operating_hours.csv",
    ["restaurant_id", "day_of_week", "open_time", "close_time", "is_closed"],
  ),
  menu_items: new CsvWriter("menu_items.csv", [
    "restaurant_id",
    "name",
    "category",
    "description",
    "is_veg",
    "spice_level",
    "calories",
    "price",
    "cost_price",
    "inventory_count",
    "reorder_level",
    "is_available",
    "created_at",
  ]),
  menu_item_availability_logs: new CsvWriter(
    "menu_item_availability_logs.csv",
    ["menu_item_id", "was_available", "changed_reason", "changed_at"],
  ),
  coupons: new CsvWriter("coupons.csv", [
    "code",
    "description",
    "discount_type",
    "discount_value",
    "min_order_total",
    "max_discount_amount",
    "starts_at",
    "ends_at",
    "max_uses",
    "max_uses_per_user",
    "uses_count",
    "coupon_scope",
    "restaurant_id",
    "is_active",
  ]),
  orders: new CsvWriter("orders.csv", [
    "user_id",
    "restaurant_id",
    "user_address_id",
    "order_status",
    "order_source",
    "scheduled_for",
    "accepted_at",
    "preparing_at",
    "ready_at",
    "picked_up_at",
    "estimated_delivery_at",
    "subtotal",
    "tax_amount",
    "delivery_fee",
    "packaging_fee",
    "service_fee",
    "surge_fee",
    "tip_amount",
    "discount_amount",
    "total_amount",
    "coupon_id",
    "created_at",
    "delivered_at",
    "cancellation_reason",
    "cancelled_by",
    "distance_km",
    "customer_instructions",
  ]),
  order_status_history: new CsvWriter("order_status_history.csv", [
    "order_id",
    "old_status",
    "new_status",
    "changed_by",
    "changed_at",
  ]),
  order_items: new CsvWriter("order_items.csv", [
    "order_id",
    "menu_item_id",
    "quantity",
    "unit_price",
    "discount_amount",
    "line_total",
  ]),
  drivers: new CsvWriter("drivers.csv", [
    "full_name",
    "phone",
    "vehicle_type",
    "join_date",
    "rating_avg",
    "total_deliveries",
    "is_active",
    "created_at",
  ]),
  driver_shifts: new CsvWriter("driver_shifts.csv", [
    "driver_id",
    "shift_date",
    "shift_start",
    "shift_end",
    "city",
    "status",
  ]),
  driver_assignments: new CsvWriter("driver_assignments.csv", [
    "order_id",
    "driver_id",
    "status",
    "assigned_at",
    "accepted_at",
    "arrived_at_restaurant_at",
    "picked_up_at",
    "delivered_at",
    "failed_at",
    "trip_distance_km",
    "wait_time_minutes",
    "delivery_earnings",
    "tip_earnings",
    "failure_reason",
  ]),
  payments: new CsvWriter("payments.csv", [
    "order_id",
    "payment_method",
    "payment_gateway",
    "payment_status",
    "paid_amount",
    "refunded_amount",
    "paid_at",
    "refunded_at",
    "transaction_ref",
    "gateway_fee",
  ]),
  reviews: new CsvWriter("reviews.csv", [
    "order_id",
    "user_id",
    "restaurant_id",
    "rating",
    "food_rating",
    "delivery_rating",
    "packaging_rating",
    "review_text",
    "created_at",
  ]),
  support_tickets: new CsvWriter("support_tickets.csv", [
    "order_id",
    "user_id",
    "issue_type",
    "channel",
    "priority",
    "status",
    "refund_amount",
    "resolution_time_minutes",
    "created_at",
    "resolved_at",
  ]),
  coupon_usage_logs: new CsvWriter("coupon_usage_logs.csv", [
    "coupon_id",
    "user_id",
    "order_id",
    "discount_amount",
    "used_at",
  ]),
};

const uniqueEmail = (() => {
  const used = new Set();
  return (name) => {
    let email;
    do {
      const suffix = faker.number.int({ min: 10, max: 999999 });
      const base = String(name)
        .toLowerCase()
        .replace(/\s+/g, ".")
        .replace(/[^a-z0-9.]/g, "");
      email = `${base}.${suffix}@${faker.helpers.arrayElement([
        "gmail.com",
        "outlook.com",
        "yahoo.com",
        "example.com",
      ])}`;
    } while (used.has(email));
    used.add(email);
    return email;
  };
})();

const randomMoney = (min, max) =>
  Number(
    faker.number
      .float({ min, max, fractionDigits: 2 })
      .toFixed(2),
  );

const generateUsers = () => {
  const defaultCityByUserId = new Array(CONFIG.users + 1);
  for (let i = 0; i < CONFIG.users; i++) {
    const name = faker.person.fullName();
    const defaultCity = faker.location.city();
    defaultCityByUserId[i + 1] = defaultCity;
    writers.users.writeRow({
      full_name: name,
      email: uniqueEmail(name),
      phone: phone10(),
      gender: faker.helpers.arrayElement(["male", "female", "other"]),
      date_of_birth: isoDate(
        faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      ),
      default_city: defaultCity,
      signup_source: faker.helpers.arrayElement(signupSources),
      loyalty_points: faker.number.int({ min: 0, max: 5000 }),
      is_active: faker.datatype.boolean({ probability: 0.95 }),
      created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
    });
  }
  return { defaultCityByUserId };
};

const generateUserAddresses = ({ defaultCityByUserId }) => {
  let addressId = 0;
  const defaultAddressIdByUserId = new Array(CONFIG.users + 1);

  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const n = faker.number.int({
      min: CONFIG.addressesMinPerUser,
      max: CONFIG.addressesMaxPerUser,
    });
    const city = defaultCityByUserId[userId] ?? faker.location.city();
    const defaultIdx = faker.number.int({ min: 0, max: n - 1 });

    for (let i = 0; i < n; i++) {
      addressId++;
      const isDefault = i === defaultIdx;
      if (isDefault) defaultAddressIdByUserId[userId] = addressId;

      const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
      const state = faker.location.state();
      const postal = faker.location.zipCode();
      const lat = faker.location.latitude({ max: 90, min: -90, precision: 6 });
      const lng = faker.location.longitude({ max: 180, min: -180, precision: 6 });
      writers.user_addresses.writeRow({
        user_id: userId,
        label: faker.helpers.arrayElement(addressLabels),
        address_line1: faker.location.streetAddress(),
        address_line2: faker.datatype.boolean({ probability: 0.2 })
          ? faker.location.secondaryAddress()
          : "",
        area: faker.location.county(),
        city,
        state,
        postal_code: postal,
        latitude: Number(lat),
        longitude: Number(lng),
        is_default: isDefault,
        created_at: iso(createdAt),
      });
    }
  }

  return { defaultAddressIdByUserId };
};

const generateRestaurantsAndMenu = () => {
  let menuItemId = 0;
  const menuItemMetaById = [];
  const restaurantMenuRange = new Array(CONFIG.restaurants + 1);
  const cityByRestaurantId = new Array(CONFIG.restaurants + 1);
  const packagingChargeByRestaurantId = new Array(CONFIG.restaurants + 1);

  for (let i = 1; i <= CONFIG.restaurants; i++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const city = faker.location.city();
    cityByRestaurantId[i] = city;
    const cuisine = faker.helpers.arrayElement(cuisines);
    const name = `${faker.company.name()} ${faker.helpers.arrayElement([
      "Kitchen",
      "Cafe",
      "Bites",
      "Express",
      "Diner",
    ])}`;
    const opening = faker.date.between({
      from: new Date("2024-01-01T07:00:00.000Z"),
      to: new Date("2024-01-01T11:00:00.000Z"),
    });
    const closing = faker.date.between({
      from: new Date("2024-01-01T18:00:00.000Z"),
      to: new Date("2024-01-01T23:00:00.000Z"),
    });

    const ownerUserId = faker.number.int({ min: 1, max: CONFIG.users });
    const packagingCharge = randomMoney(0, 20);
    packagingChargeByRestaurantId[i] = packagingCharge;
    writers.restaurants.writeRow({
      owner_user_id: ownerUserId,
      name,
      legal_name: `${faker.company.name()} Pvt Ltd`,
      city,
      cuisine,
      area: faker.location.county(),
      cost_for_two: randomMoney(200, 1200),
      opening_time: isoTime(opening),
      closing_time: isoTime(closing),
      avg_prep_time_minutes: faker.number.int({ min: 10, max: 45 }),
      min_order_amount: randomMoney(0, 250),
      commission_rate: Number(
        faker.number.float({ min: 8, max: 25, fractionDigits: 2 }).toFixed(2),
      ),
      packaging_charge_default: packagingCharge,
      rating_avg: Number(
        clamp(faker.number.float({ min: 3.2, max: 4.9, fractionDigits: 2 }), 1, 5).toFixed(2),
      ),
      total_ratings: faker.number.int({ min: 0, max: 5000 }),
      is_veg_only: faker.datatype.boolean({ probability: 0.2 }),
      is_active: faker.datatype.boolean({ probability: 0.97 }),
      created_at: iso(createdAt),
    });

    // operating hours (1..7), with a small chance to be closed on a day
    for (let day = 1; day <= 7; day++) {
      const isClosed = faker.datatype.boolean({ probability: 0.04 });
      writers.restaurant_operating_hours.writeRow({
        restaurant_id: i,
        day_of_week: day,
        open_time: isoTime(opening),
        close_time: isoTime(closing),
        is_closed: isClosed,
      });
    }

    const nItems = faker.number.int({
      min: CONFIG.menuItemsMinPerRestaurant,
      max: CONFIG.menuItemsMaxPerRestaurant,
    });

    const startId = menuItemId + 1;
    for (let j = 0; j < nItems; j++) {
      menuItemId++;
      const category = faker.helpers.arrayElement(menuCategories);
      const itemName = `${faker.commerce.productAdjective()} ${faker.commerce.product()}`;
      const price = randomMoney(59, 499);
      const isVeg = faker.datatype.boolean({ probability: 0.45 });
      const costPrice = Number((price * faker.number.float({ min: 0.55, max: 0.85, fractionDigits: 2 })).toFixed(2));
      const inventory = faker.number.int({ min: 0, max: 200 });
      const reorderLevel = faker.number.int({ min: 10, max: 60 });
      menuItemMetaById[menuItemId] = { price, restaurantId: i };
      writers.menu_items.writeRow({
        restaurant_id: i,
        name: itemName,
        category,
        description: faker.lorem.sentence({ min: 6, max: 12 }),
        is_veg: isVeg,
        spice_level: faker.helpers.arrayElement(["mild", "medium", "hot"]),
        calories: faker.number.int({ min: 120, max: 1400 }),
        price,
        cost_price: costPrice,
        inventory_count: inventory,
        reorder_level: reorderLevel,
        is_available: faker.datatype.boolean({ probability: 0.95 }),
        created_at: iso(randomDateBetween(createdAt, CONFIG.endDate)),
      });
    }
    restaurantMenuRange[i] = { startId, endId: menuItemId };
  }

  // availability logs for a subset of menu items
  const totalMenuItems = menuItemId;
  const logTarget = Math.floor(totalMenuItems * CONFIG.menuAvailabilityLogRatioFromMenuItems);
  const ids = faker.helpers.arrayElements(
    Array.from({ length: totalMenuItems }, (_, idx) => idx + 1),
    clamp(logTarget, 0, totalMenuItems),
  );
  for (const id of ids) {
    writers.menu_item_availability_logs.writeRow({
      menu_item_id: id,
      was_available: faker.datatype.boolean(),
      changed_reason: faker.helpers.arrayElement(["out_of_stock", "manual_pause", "kitchen_closed", "relisted"]),
      changed_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
    });
  }

  return {
    menuItemMetaById,
    restaurantMenuRange,
    menuItemCount: menuItemId,
    cityByRestaurantId,
    packagingChargeByRestaurantId,
  };
};

const generateCoupons = () => {
  for (let i = 0; i < CONFIG.coupons; i++) {
    const startsAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const endsAt = randomDateBetween(addDays(startsAt, 1), addDays(startsAt, 90));
    const discountType = faker.datatype.boolean({ probability: 0.65 })
      ? "percent"
      : "fixed";
    const discountValue =
      discountType === "percent"
        ? faker.number.int({ min: 5, max: 40 })
        : randomMoney(20, 120);
    const couponScope = faker.datatype.boolean({ probability: 0.25 })
      ? "restaurant"
      : "platform";
    const restaurantId =
      couponScope === "restaurant"
        ? faker.number.int({ min: 1, max: CONFIG.restaurants })
        : "";
    writers.coupons.writeRow({
      code: `SAVE${String(i + 1).padStart(5, "0")}`,
      description: faker.lorem.sentence({ min: 4, max: 8 }),
      discount_type: discountType,
      discount_value: discountValue,
      min_order_total: randomMoney(99, 399),
      max_discount_amount:
        discountType === "percent" ? randomMoney(50, 200) : "",
      starts_at: iso(startsAt),
      ends_at: iso(endsAt),
      max_uses: faker.number.int({ min: 50, max: 5000 }),
      max_uses_per_user: faker.number.int({ min: 1, max: 10 }),
      uses_count: 0,
      coupon_scope: couponScope,
      restaurant_id: restaurantId,
      is_active: faker.datatype.boolean({ probability: 0.85 }),
    });
  }
};

const generateDrivers = () => {
  for (let i = 0; i < CONFIG.drivers; i++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.drivers.writeRow({
      full_name: faker.person.fullName(),
      phone: phone10(),
      vehicle_type: faker.helpers.arrayElement(vehicleTypes),
      join_date: isoDate(createdAt),
      rating_avg: Number(
        clamp(faker.number.float({ min: 3.0, max: 4.95, fractionDigits: 2 }), 1, 5).toFixed(2),
      ),
      total_deliveries: faker.number.int({ min: 0, max: 9000 }),
      is_active: faker.datatype.boolean({ probability: 0.96 }),
      created_at: iso(createdAt),
    });
  }
};

const generateDriverShifts = ({ cityByRestaurantId }) => {
  // Generate a lightweight shift history per driver (used by analytics-style questions)
  for (let driverId = 1; driverId <= CONFIG.drivers; driverId++) {
    const city =
      cityByRestaurantId[faker.number.int({ min: 1, max: CONFIG.restaurants })] ??
      faker.location.city();
    const base = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    for (let i = 0; i < CONFIG.driverShiftsPerDriver; i++) {
      const shiftStart = addDays(base, faker.number.int({ min: 0, max: 180 }));
      const shiftEnd = addMinutes(shiftStart, faker.number.int({ min: 240, max: 600 }));
      writers.driver_shifts.writeRow({
        driver_id: driverId,
        shift_date: isoDate(shiftStart),
        shift_start: iso(shiftStart),
        shift_end: iso(shiftEnd),
        city,
        status: faker.helpers.arrayElement(["scheduled", "completed", "canceled"]),
      });
    }
  }
};

const generateOrders = ({
  restaurantMenuRange,
  menuItemMetaById,
  menuItemCount,
  defaultAddressIdByUserId,
  packagingChargeByRestaurantId,
}) => {
  let orderId = 0;
  let orderItemRows = 0;
  let assignmentRows = 0;
  let paymentRows = 0;
  let statusHistoryRows = 0;
  let supportTicketRows = 0;
  let couponUsageRows = 0;
  const deliveredOrderIds = [];
  const orderUserById = [];
  const orderRestaurantById = [];

  for (let i = 0; i < CONFIG.orders; i++) {
    orderId++;
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const userId = faker.number.int({ min: 1, max: CONFIG.users });
    const restaurantId = faker.number.int({ min: 1, max: CONFIG.restaurants });
    const status = weightedChoice(orderStatuses);
    const deliveryFee = randomMoney(0, 49);
    const packagingFee = packagingChargeByRestaurantId[restaurantId] ?? randomMoney(0, 20);
    const serviceFee = randomMoney(0, 15);
    const surgeFee = faker.datatype.boolean({ probability: 0.12 }) ? randomMoney(0, 25) : 0;
    const tipAmount = faker.datatype.boolean({ probability: 0.18 }) ? randomMoney(0, 80) : 0;

    const range = restaurantMenuRange[restaurantId];
    const itemsCount = faker.number.int({
      min: CONFIG.minItemsPerOrder,
      max: CONFIG.maxItemsPerOrder,
    });

    let subtotal = 0;
    for (let j = 0; j < itemsCount; j++) {
      const menuItemId =
        range && range.startId <= range.endId
          ? faker.number.int({ min: range.startId, max: range.endId })
          : faker.number.int({ min: 1, max: menuItemCount });
      const qty = faker.number.int({ min: 1, max: CONFIG.maxQtyPerItem });
      const unit = menuItemMetaById[menuItemId]?.price ?? randomMoney(59, 499);
      const lineTotal = Number((qty * Number(unit)).toFixed(2));
      subtotal += lineTotal;

      const itemDiscount =
        faker.datatype.boolean({ probability: 0.08 }) ? randomMoney(0, Math.min(40, lineTotal)) : 0;
      writers.order_items.writeRow({
        order_id: orderId,
        menu_item_id: menuItemId,
        quantity: qty,
        unit_price: unit,
        discount_amount: itemDiscount,
        line_total: Number((lineTotal - itemDiscount).toFixed(2)),
      });
      orderItemRows++;
    }

    subtotal = Number(subtotal.toFixed(2));

    const useCoupon = faker.datatype.boolean({ probability: 0.2 });
    const couponId = useCoupon ? faker.number.int({ min: 1, max: CONFIG.coupons }) : "";
    const discountAmount = useCoupon ? Number((subtotal * faker.number.float({ min: 0.05, max: 0.25, fractionDigits: 2 })).toFixed(2)) : 0;
    const taxAmount = Number((subtotal * 0.05).toFixed(2));
    const totalAmount = Number(
      (subtotal + taxAmount + deliveryFee + packagingFee + serviceFee + surgeFee + tipAmount - discountAmount).toFixed(2),
    );

    let deliveredAt = "";
    let acceptedAt = "";
    let preparingAt = "";
    let readyAt = "";
    let pickedUpAt = "";
    let estimatedDeliveryAt = "";
    let cancellationReason = "";
    let cancelledBy = "";

    // Basic timeline simulation
    acceptedAt = iso(randomSoon(createdAt, 10));
    preparingAt = iso(randomSoon(acceptedAt, 20));
    readyAt = iso(randomSoon(preparingAt, 30));
    pickedUpAt =
      status === "picked_up" || status === "delivered"
        ? iso(randomSoon(readyAt, 30))
        : "";
    estimatedDeliveryAt = iso(randomSoon(pickedUpAt || readyAt, 60));

    if (status === "delivered") {
      deliveredAt = iso(randomSoon(pickedUpAt || readyAt, 90));
      deliveredOrderIds.push(orderId);
    } else if (status === "canceled") {
      cancellationReason = faker.helpers.arrayElement([
        "Changed mind",
        "Restaurant too slow",
        "Driver unavailable",
        "Payment failed",
      ]);
      cancelledBy = faker.helpers.arrayElement(["user", "restaurant", "system"]);
      acceptedAt = "";
      preparingAt = "";
      readyAt = "";
      pickedUpAt = "";
      estimatedDeliveryAt = "";
    }

    writers.orders.writeRow({
      user_id: userId,
      restaurant_id: restaurantId,
      user_address_id: defaultAddressIdByUserId[userId] ?? "",
      order_status: status,
      order_source: faker.helpers.arrayElement(["app", "web"]),
      scheduled_for: faker.datatype.boolean({ probability: 0.03 })
        ? iso(addMinutes(createdAt, faker.number.int({ min: 30, max: 240 })))
        : "",
      accepted_at: acceptedAt,
      preparing_at: preparingAt,
      ready_at: readyAt,
      picked_up_at: pickedUpAt,
      estimated_delivery_at: estimatedDeliveryAt,
      subtotal,
      tax_amount: taxAmount,
      delivery_fee: deliveryFee,
      packaging_fee: packagingFee,
      service_fee: serviceFee,
      surge_fee: surgeFee,
      tip_amount: tipAmount,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      coupon_id: couponId,
      created_at: iso(createdAt),
      delivered_at: deliveredAt,
      cancellation_reason: cancellationReason,
      cancelled_by: cancelledBy,
      distance_km: Number(
        faker.number.float({ min: 0.5, max: 12, fractionDigits: 2 }).toFixed(2),
      ),
      customer_instructions: faker.datatype.boolean({ probability: 0.18 })
        ? faker.lorem.sentence({ min: 4, max: 10 })
        : "",
    });
    orderUserById[orderId] = userId;
    orderRestaurantById[orderId] = restaurantId;

    // driver assignment: create for most non-canceled orders
    if (status !== "canceled") {
      const assignedAt = randomSoon(createdAt, 30);
      const daAcceptedAt = iso(randomSoon(assignedAt, 10));
      const arrivedAt = iso(randomSoon(daAcceptedAt, 20));
      const daPickedUpAt =
        status === "picked_up" || status === "delivered"
          ? iso(randomSoon(arrivedAt, 20))
          : "";
      const daDeliveredAt = status === "delivered" ? deliveredAt : "";
      const failedAt = status !== "delivered" && faker.datatype.boolean({ probability: 0.02 })
        ? iso(randomSoon(assignedAt, 90))
        : "";
      writers.driver_assignments.writeRow({
        order_id: orderId,
        driver_id: faker.number.int({ min: 1, max: CONFIG.drivers }),
        status:
          status === "delivered"
            ? "delivered"
            : status === "picked_up"
              ? "picked_up"
              : failedAt
                ? "failed"
                : "assigned",
        assigned_at: iso(assignedAt),
        accepted_at: daAcceptedAt,
        arrived_at_restaurant_at: arrivedAt,
        picked_up_at: daPickedUpAt,
        delivered_at: daDeliveredAt,
        failed_at: failedAt,
        trip_distance_km: Number(
          faker.number.float({ min: 0.5, max: 15, fractionDigits: 2 }).toFixed(2),
        ),
        wait_time_minutes: faker.number.int({ min: 0, max: 25 }),
        delivery_earnings: Number(
          faker.number.float({ min: 15, max: 120, fractionDigits: 2 }).toFixed(2),
        ),
        tip_earnings: tipAmount,
        failure_reason: failedAt ? faker.helpers.arrayElement(["no_driver", "timeout", "customer_unreachable"]) : "",
      });
      assignmentRows++;
    }

    // payment: one per order
    const payStatus = weightedChoice(paymentStatuses);
    const gateway = faker.helpers.arrayElement(paymentGateways);
    const paidAt = payStatus === "succeeded" ? iso(randomSoon(createdAt, 15)) : "";
    const shouldRefund = payStatus === "succeeded" && status === "canceled" && faker.datatype.boolean({ probability: 0.5 });
    const refundedAmount = shouldRefund ? totalAmount : 0;
    const refundedAt = shouldRefund ? iso(randomSoon(createdAt, 120)) : "";
    writers.payments.writeRow({
      order_id: orderId,
      payment_method: faker.helpers.arrayElement(paymentMethods),
      payment_gateway: gateway,
      payment_status: payStatus,
      paid_amount: payStatus === "succeeded" ? totalAmount : 0,
      refunded_amount: refundedAmount,
      paid_at: paidAt,
      refunded_at: refundedAt,
      transaction_ref: payStatus === "succeeded" ? faker.string.uuid() : "",
      gateway_fee:
        gateway === "cash"
          ? 0
          : Number((totalAmount * 0.012).toFixed(2)),
    });
    paymentRows++;

    // coupon usage log (only when coupon used)
    if (useCoupon) {
      writers.coupon_usage_logs.writeRow({
        coupon_id: couponId,
        user_id: userId,
        order_id: orderId,
        discount_amount: discountAmount,
        used_at: iso(createdAt),
      });
      couponUsageRows++;
    }

    // status history (coarse, but consistent)
    const history = [];
    history.push({ old: "", next: "placed", at: createdAt, by: "system" });
    if (status === "canceled") {
      history.push({
        old: "placed",
        next: "canceled",
        at: randomSoon(createdAt, 15),
        by: cancelledBy || "user",
      });
    } else if (status === "delivered") {
      history.push({ old: "placed", next: "preparing", at: new Date(preparingAt), by: "restaurant" });
      history.push({ old: "preparing", next: "picked_up", at: new Date(pickedUpAt || readyAt), by: "driver" });
      history.push({ old: "picked_up", next: "delivered", at: new Date(deliveredAt), by: "driver" });
    } else if (status === "picked_up") {
      history.push({ old: "placed", next: "preparing", at: new Date(preparingAt), by: "restaurant" });
      history.push({ old: "preparing", next: "picked_up", at: new Date(pickedUpAt || readyAt), by: "driver" });
    } else if (status === "preparing") {
      history.push({ old: "placed", next: "preparing", at: new Date(preparingAt), by: "restaurant" });
    }
    for (const h of history) {
      writers.order_status_history.writeRow({
        order_id: orderId,
        old_status: h.old,
        new_status: h.next,
        changed_by: h.by,
        changed_at: iso(h.at),
      });
      statusHistoryRows++;
    }

    // support tickets: rare, tied to failed payments / cancellations / delivery issues
    if (faker.datatype.boolean({ probability: CONFIG.supportTicketsRatioFromOrders })) {
      const issueType =
        status === "canceled"
          ? "cancellation"
          : payStatus === "failed"
            ? "payment"
            : "delivery";
      const createdTicketAt = randomSoon(createdAt, 300);
      const resolved = faker.datatype.boolean({ probability: 0.7 });
      writers.support_tickets.writeRow({
        order_id: orderId,
        user_id: userId,
        issue_type: issueType,
        channel: faker.helpers.arrayElement(["app", "chat", "call"]),
        priority: faker.helpers.arrayElement(["low", "medium", "high"]),
        status: resolved ? "resolved" : "open",
        refund_amount: resolved && status === "canceled" ? Number((totalAmount * 0.6).toFixed(2)) : 0,
        resolution_time_minutes: resolved ? faker.number.int({ min: 5, max: 180 }) : "",
        created_at: iso(createdTicketAt),
        resolved_at: resolved ? iso(randomSoon(createdTicketAt, 180)) : "",
      });
      supportTicketRows++;
    }

    if (orderId % CONFIG.flushEvery === 0) {
      // light progress to stdout (useful during long gen)
      // eslint-disable-next-line no-console
      console.log(
        `Generated orders: ${orderId} / ${CONFIG.orders} (items=${orderItemRows}, history=${statusHistoryRows}, assignments=${assignmentRows}, payments=${paymentRows}, tickets=${supportTicketRows}, coupon_logs=${couponUsageRows})`,
      );
    }
  }

  return { deliveredOrderIds, orderUserById, orderRestaurantById };
};

const generateReviews = ({ deliveredOrderIds, orderUserById, orderRestaurantById }) => {
  const target = Math.floor(deliveredOrderIds.length * CONFIG.reviewsTargetRatioFromDeliveredOrders);
  const picked = faker.helpers.arrayElements(deliveredOrderIds, clamp(target, 0, deliveredOrderIds.length));

  for (const orderId of picked) {
    const userId = orderUserById[orderId] ?? faker.number.int({ min: 1, max: CONFIG.users });
    const restaurantId =
      orderRestaurantById[orderId] ??
      faker.number.int({ min: 1, max: CONFIG.restaurants });
    const rating = faker.number.int({ min: 1, max: 5 });
    writers.reviews.writeRow({
      order_id: orderId,
      user_id: userId,
      restaurant_id: restaurantId,
      rating,
      food_rating: rating,
      delivery_rating: faker.number.int({ min: 1, max: 5 }),
      packaging_rating: faker.number.int({ min: 1, max: 5 }),
      review_text: faker.lorem.sentences({ min: 1, max: 3 }),
      created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
    });
  }
};

async function main() {
  console.log("Generating food seed data...");

  const userState = generateUsers();
  const addressState = generateUserAddresses(userState);
  generateCoupons();
  generateDrivers();
  const menuState = generateRestaurantsAndMenu();
  generateDriverShifts(menuState);
  const orderState = generateOrders({ ...menuState, ...addressState });
  generateReviews(orderState);

  await Promise.all(Object.values(writers).map((w) => w.close()));
  console.log("✅ Food seed CSVs written to", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("❌ Failed generating food data:", err);
  process.exitCode = 1;
});
