// ./ecommerce/generateData.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260331);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// =====================================================
// CONFIG
// =====================================================
const CONFIG = {
  customers: 50_000,
  categories: 25,
  products: 10_000,
  orders: 500_000,

  minAddressesPerCustomer: 1,
  maxAddressesPerCustomer: 3,

  minItemsPerOrder: 1,
  maxItemsPerOrder: 4,
  maxQtyPerItem: 4,

  reviewsTargetRatioFromDeliveredItems: 0.22,

  startDate: new Date("2024-01-01T00:00:00.000Z"),
  endDate: new Date("2026-03-31T23:59:59.999Z"),

  flushEvery: 10_000,
};

// =====================================================
// HELPERS
// =====================================================
const round2 = (n) => Number(n.toFixed(2));
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const iso = (date) => new Date(date).toISOString();
const isoDate = (date) => new Date(date).toISOString().slice(0, 10);

const randomDateBetween = (from, to) => faker.date.between({ from, to });
const chance = (probability) => Math.random() < probability;
const pickOne = (arr) => arr[faker.number.int({ min: 0, max: arr.length - 1 })];

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

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};

const slugifySku = (str) =>
  String(str)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 18);

const uniqueEmail = (() => {
  const used = new Set();
  return (firstName, lastName) => {
    let email;
    do {
      const suffix = faker.number.int({ min: 10, max: 999999 });
      email = `${firstName}.${lastName}.${suffix}@${pickOne([
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "example.com",
      ])}`
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9@._-]/g, "");
    } while (used.has(email));
    used.add(email);
    return email;
  };
})();

// =====================================================
// CSV WRITER
// =====================================================
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

// =====================================================
// LOOKUP DATA
// =====================================================
const countries = ["India"];
const genders = ["male", "female", "other"];

const categoryPool = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Beauty",
  "Sports",
  "Toys",
  "Footwear",
  "Groceries",
  "Health",
  "Office Supplies",
  "Pet Supplies",
  "Jewelry",
  "Automotive",
  "Garden",
  "Bags",
  "Furniture",
  "Watches",
  "Mobile Accessories",
  "Kitchen Appliances",
  "Travel",
  "Baby Products",
  "Music",
  "Gaming",
  "Stationery",
];

const reviewSentences = [
  "Good value for money.",
  "Quality was better than expected.",
  "Packaging was decent and delivery was smooth.",
  "Would buy this again.",
  "Not bad for the price.",
  "Product matched the description.",
  "Customer experience was satisfactory.",
  "Could be improved, but overall okay.",
  "Works as expected.",
  "Highly recommended.",
];

const reviewTitles = [
  "Worth buying",
  "Good product",
  "Satisfied",
  "Okay overall",
  "Very useful",
  "Could be better",
  "Great quality",
  "Nice purchase",
  "Met expectations",
  "Loved it",
];

// =====================================================
// WRITERS
// =====================================================
const customersWriter = new CsvWriter("customers.csv", [
  "first_name",
  "last_name",
  "email",
  "phone",
  "gender",
  "date_of_birth",
  "is_active",
  "created_at",
]);

const addressesWriter = new CsvWriter("addresses.csv", [
  "customer_id",
  "address_type",
  "line1",
  "line2",
  "city",
  "state",
  "country",
  "postal_code",
  "created_at",
]);

const categoriesWriter = new CsvWriter("categories.csv", [
  "name",
  "parent_category_id",
  "created_at",
]);

const productsWriter = new CsvWriter("products.csv", [
  "category_id",
  "name",
  "brand",
  "sku",
  "price",
  "cost_price",
  "stock_quantity",
  "rating",
  "is_active",
  "created_at",
]);

const ordersWriter = new CsvWriter("orders.csv", [
  "customer_id",
  "order_number",
  "status",
  "order_date",
  "shipping_address_id",
  "billing_address_id",
  "subtotal",
  "discount_amount",
  "tax_amount",
  "shipping_fee",
  "total_amount",
]);

const orderItemsWriter = new CsvWriter("order_items.csv", [
  "order_id",
  "product_id",
  "quantity",
  "unit_price",
  "discount_amount",
  "total_price",
]);

const paymentsWriter = new CsvWriter("payments.csv", [
  "order_id",
  "payment_method",
  "payment_status",
  "paid_amount",
  "paid_at",
  "transaction_ref",
]);

const reviewsWriter = new CsvWriter("reviews.csv", [
  "product_id",
  "customer_id",
  "rating",
  "review_title",
  "review_text",
  "created_at",
]);

// =====================================================
// IN-MEMORY LOOKUPS ONLY
// =====================================================

// customer metadata
const customerCreatedAt = new Array(CONFIG.customers + 1);
const customerAddressRanges = new Array(CONFIG.customers + 1);

// product metadata / inventory
const productMeta = new Array(CONFIG.products + 1);
const productInventory = new Array(CONFIG.products + 1);

// delivered review candidates are stored compactly, not as full objects
const deliveredCandidates = [];
const reviewedPairs = new Set();

// =====================================================
// STEP 1: CATEGORIES
// =====================================================
for (let i = 1; i <= CONFIG.categories; i++) {
  categoriesWriter.writeRow({
    name: categoryPool[i - 1] || faker.commerce.department(),
    parent_category_id: "",
    created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
  });
}

// =====================================================
// STEP 2: CUSTOMERS + ADDRESSES
// =====================================================
let addressId = 1;

for (let customerId = 1; customerId <= CONFIG.customers; customerId++) {
  const gender = pickOne(genders);
  const firstName = faker.person.firstName(
    gender === "other" ? undefined : gender,
  );
  const lastName = faker.person.lastName();
  const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);

  customerCreatedAt[customerId] = createdAt;

  customersWriter.writeRow({
    first_name: firstName,
    last_name: lastName,
    email: uniqueEmail(firstName, lastName),
    phone: `9${faker.number.int({ min: 100000000, max: 999999999 })}`,
    gender,
    date_of_birth: isoDate(
      faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
    ),
    is_active: chance(0.92),
    created_at: iso(createdAt),
  });

  const count = faker.number.int({
    min: CONFIG.minAddressesPerCustomer,
    max: CONFIG.maxAddressesPerCustomer,
  });

  const startId = addressId;

  for (let j = 0; j < count; j++) {
    addressesWriter.writeRow({
      customer_id: customerId,
      address_type: weightedChoice([
        { value: "shipping", weight: 60 },
        { value: "billing", weight: 40 },
      ]),
      line1: faker.location.streetAddress(),
      line2: chance(0.35) ? faker.location.secondaryAddress() : "",
      city: faker.location.city(),
      state: faker.location.state(),
      country: pickOne(countries),
      postal_code: faker.location.zipCode("######"),
      created_at: iso(randomDateBetween(createdAt, CONFIG.endDate)),
    });

    addressId++;
  }

  customerAddressRanges[customerId] = {
    start: startId,
    end: addressId - 1,
  };

  if (customerId % CONFIG.flushEvery === 0) {
    console.log(`Generated customers: ${customerId}`);
  }
}

// =====================================================
// STEP 3: PRODUCTS
// =====================================================
for (let productId = 1; productId <= CONFIG.products; productId++) {
  const price = round2(
    faker.number.float({ min: 199, max: 49999, fractionDigits: 2 }),
  );
  const costPrice = round2(
    price * faker.number.float({ min: 0.45, max: 0.78, fractionDigits: 2 }),
  );
  const initialStock = faker.number.int({ min: 200, max: 2000 });
  const name = faker.commerce.productName();
  const brand = faker.company.name();
  const sku = `${slugifySku(brand)}-${slugifySku(name)}-${faker.string.alphanumeric(
    {
      length: 6,
      casing: "upper",
    },
  )}`;
  const rating = round2(
    faker.number.float({ min: 2.8, max: 4.9, fractionDigits: 1 }),
  );
  const isActive = chance(0.96);
  const categoryId = faker.number.int({ min: 1, max: CONFIG.categories });
  const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);

  productMeta[productId] = {
    category_id: categoryId,
    name,
    brand,
    sku,
    price,
    cost_price: costPrice,
    rating,
    is_active: isActive,
    created_at: createdAt,
  };

  productInventory[productId] = {
    current: initialStock,
  };

  productsWriter.writeRow({
    category_id: categoryId,
    name,
    brand,
    sku,
    price,
    cost_price: costPrice,
    stock_quantity: initialStock,
    rating,
    is_active: isActive,
    created_at: iso(createdAt),
  });

  if (productId % CONFIG.flushEvery === 0) {
    console.log(`Generated products: ${productId}`);
  }
}

// =====================================================
// STEP 4: ORDERS + ORDER_ITEMS + PAYMENTS
// =====================================================
const paymentMethods = ["card", "upi", "net_banking", "wallet", "cod"];

let orderItemsCount = 0;

const getRandomAddressIdForCustomer = (customerId) => {
  const range = customerAddressRanges[customerId];
  if (!range) return null;
  if (range.start === range.end) return range.start;
  return faker.number.int({ min: range.start, max: range.end });
};

const getAvailableProductId = (allowZeroStock = false) => {
  for (let tries = 0; tries < 20; tries++) {
    const productId = faker.number.int({ min: 1, max: CONFIG.products });
    const meta = productMeta[productId];
    const inv = productInventory[productId];
    if (!meta?.is_active) continue;
    if (!allowZeroStock && inv.current <= 0) continue;
    return productId;
  }
  return faker.number.int({ min: 1, max: CONFIG.products });
};

for (let orderId = 1; orderId <= CONFIG.orders; orderId++) {
  const customerId = faker.number.int({ min: 1, max: CONFIG.customers });
  const customerCreated = customerCreatedAt[customerId];
  const orderDate = randomDateBetween(customerCreated, CONFIG.endDate);

  const shippingAddressId = getRandomAddressIdForCustomer(customerId);
  const billingAddressId = chance(0.7)
    ? shippingAddressId
    : getRandomAddressIdForCustomer(customerId);

  const status = weightedChoice([
    { value: "pending", weight: 10 },
    { value: "confirmed", weight: 16 },
    { value: "shipped", weight: 18 },
    { value: "delivered", weight: 46 },
    { value: "cancelled", weight: 7 },
    { value: "returned", weight: 3 },
  ]);

  const itemCount = faker.number.int({
    min: CONFIG.minItemsPerOrder,
    max: CONFIG.maxItemsPerOrder,
  });

  const pickedProductIds = new Set();
  const lineItems = [];

  let subtotal = 0;
  let totalDiscount = 0;

  for (let i = 0; i < itemCount; i++) {
    let productId = getAvailableProductId(status === "cancelled");

    let safeGuard = 0;
    while (pickedProductIds.has(productId) && safeGuard < 20) {
      productId = getAvailableProductId(status === "cancelled");
      safeGuard++;
    }
    pickedProductIds.add(productId);

    const meta = productMeta[productId];
    const inv = productInventory[productId];

    let maxQtyAllowed = CONFIG.maxQtyPerItem;
    if (status !== "cancelled") {
      maxQtyAllowed = Math.max(1, Math.min(CONFIG.maxQtyPerItem, inv.current));
    }

    const quantity = faker.number.int({ min: 1, max: maxQtyAllowed });
    const unitPrice = meta.price;

    const lineBase = unitPrice * quantity;
    const lineDiscount = chance(0.25)
      ? round2(
          lineBase *
            faker.number.float({ min: 0.03, max: 0.2, fractionDigits: 2 }),
        )
      : 0;
    const totalPrice = round2(lineBase - lineDiscount);

    subtotal += lineBase;
    totalDiscount += lineDiscount;

    lineItems.push({
      product_id: productId,
      quantity,
      unit_price: round2(unitPrice),
      discount_amount: lineDiscount,
      total_price: totalPrice,
    });

    if (status !== "cancelled") {
      inv.current = Math.max(0, inv.current - quantity);
    }
  }

  subtotal = round2(subtotal);
  totalDiscount = round2(totalDiscount);

  const taxableAmount = round2(Math.max(0, subtotal - totalDiscount));
  const taxRate = faker.number.float({
    min: 0.05,
    max: 0.18,
    fractionDigits: 2,
  });
  const taxAmount = round2(taxableAmount * taxRate);
  const shippingFee =
    taxableAmount >= 999 || status === "cancelled"
      ? 0
      : round2(faker.number.float({ min: 39, max: 149, fractionDigits: 2 }));
  const totalAmount = round2(taxableAmount + taxAmount + shippingFee);

  ordersWriter.writeRow({
    customer_id: customerId,
    order_number: `ORD-${String(orderId).padStart(7, "0")}`,
    status,
    order_date: iso(orderDate),
    shipping_address_id: shippingAddressId,
    billing_address_id: billingAddressId,
    subtotal,
    discount_amount: totalDiscount,
    tax_amount: taxAmount,
    shipping_fee: shippingFee,
    total_amount: totalAmount,
  });

  for (const item of lineItems) {
    orderItemsWriter.writeRow({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount_amount: item.discount_amount,
      total_price: item.total_price,
    });

    orderItemsCount++;

    if (status === "delivered") {
      deliveredCandidates.push({
        customer_id: customerId,
        product_id: item.product_id,
        order_date_ms: orderDate.getTime(),
      });
    }
  }

  const paymentMethod =
    status === "delivered" && chance(0.18) ? "cod" : pickOne(paymentMethods);

  let paymentStatus;
  if (status === "cancelled") {
    paymentStatus = weightedChoice([
      { value: "failed", weight: 45 },
      { value: "refunded", weight: 35 },
      { value: "pending", weight: 20 },
    ]);
  } else if (status === "pending") {
    paymentStatus = weightedChoice([
      { value: "pending", weight: 65 },
      { value: "completed", weight: 25 },
      { value: "failed", weight: 10 },
    ]);
  } else if (status === "returned") {
    paymentStatus = weightedChoice([
      { value: "refunded", weight: 70 },
      { value: "completed", weight: 30 },
    ]);
  } else {
    paymentStatus = weightedChoice([
      { value: "completed", weight: 88 },
      { value: "pending", weight: 9 },
      { value: "failed", weight: 3 },
    ]);
  }

  const paidAmount = paymentStatus === "failed" ? 0 : totalAmount;
  const paidAt =
    paymentStatus === "pending"
      ? ""
      : iso(randomDateBetween(orderDate, CONFIG.endDate));

  paymentsWriter.writeRow({
    order_id: orderId,
    payment_method: paymentMethod,
    payment_status: paymentStatus,
    paid_amount: round2(paidAmount),
    paid_at: paidAt,
    transaction_ref:
      paymentStatus === "failed" && !chance(0.5)
        ? ""
        : `TXN-${faker.string.alphanumeric({ length: 12, casing: "upper" })}`,
  });

  if (orderId % CONFIG.flushEvery === 0) {
    console.log(
      `Generated orders: ${orderId}, order_items: ${orderItemsCount}, review_candidates: ${deliveredCandidates.length}`,
    );
  }
}

// =====================================================
// STEP 5: REVIEWS
// =====================================================
let reviewsCount = 0;
const reviewsTarget = 200_000;
const effectiveReviewRatio = clamp(
  (reviewsTarget / Math.max(1, deliveredCandidates.length)) * 1.25,
  0,
  0.9,
);

for (let i = 0; i < deliveredCandidates.length; i++) {
  const candidate = deliveredCandidates[i];

  if (reviewsCount >= reviewsTarget) break;
  if (!chance(effectiveReviewRatio)) continue;

  const key = `${candidate.customer_id}-${candidate.product_id}`;
  if (reviewedPairs.has(key)) continue;

  const meta = productMeta[candidate.product_id];
  if (!meta) continue;

  const minReviewDate = new Date(candidate.order_date_ms);
  minReviewDate.setDate(
    minReviewDate.getDate() + faker.number.int({ min: 2, max: 14 }),
  );
  if (minReviewDate > CONFIG.endDate) continue;

  const base = Math.round(meta.rating);
  const rating = clamp(base + faker.number.int({ min: -1, max: 1 }), 1, 5);

  reviewsWriter.writeRow({
    product_id: candidate.product_id,
    customer_id: candidate.customer_id,
    rating,
    review_title: pickOne(reviewTitles),
    review_text: `${pickOne(reviewSentences)} ${
      chance(0.5) ? pickOne(reviewSentences) : ""
    }`.trim(),
    created_at: iso(randomDateBetween(minReviewDate, CONFIG.endDate)),
  });

  reviewedPairs.add(key);
  reviewsCount++;

  if ((i + 1) % CONFIG.flushEvery === 0) {
    console.log(
      `Processed review candidates: ${i + 1}, reviews: ${reviewsCount}`,
    );
  }
}

// =====================================================
// CLOSE FIRST-PASS WRITERS
// =====================================================
await Promise.all([
  customersWriter.close(),
  addressesWriter.close(),
  categoriesWriter.close(),
  productsWriter.close(),
  ordersWriter.close(),
  orderItemsWriter.close(),
  paymentsWriter.close(),
  reviewsWriter.close(),
]);

// =====================================================
// STEP 6: REWRITE PRODUCTS WITH FINAL STOCK
// =====================================================
// Because stock_quantity should reflect current remaining stock after orders
// We rewrite products.csv once with final stock values.
const finalProductsPath = path.join(OUTPUT_DIR, "products.csv");
const tempProductsPath = path.join(OUTPUT_DIR, "products_final.csv");

const finalProductsWriter = new CsvWriter("products_final.csv", [
  "category_id",
  "name",
  "brand",
  "sku",
  "price",
  "cost_price",
  "stock_quantity",
  "rating",
  "is_active",
  "created_at",
]);

for (let productId = 1; productId <= CONFIG.products; productId++) {
  const meta = productMeta[productId];
  finalProductsWriter.writeRow({
    category_id: meta.category_id,
    name: meta.name,
    brand: meta.brand,
    sku: meta.sku,
    price: meta.price,
    cost_price: meta.cost_price,
    stock_quantity: productInventory[productId].current,
    rating: meta.rating,
    is_active: meta.is_active,
    created_at: iso(meta.created_at),
  });
}

await finalProductsWriter.close();

// replace original products.csv with final stock version
fs.renameSync(tempProductsPath, finalProductsPath);

// =====================================================
// DONE
// =====================================================
console.log("\nDone.");
console.log(`customers.csv rows: ${CONFIG.customers}`);
console.log(`addresses.csv rows: ${addressId - 1}`);
console.log(`categories.csv rows: ${CONFIG.categories}`);
console.log(`products.csv rows: ${CONFIG.products}`);
console.log(`orders.csv rows: ${CONFIG.orders}`);
console.log(`order_items.csv rows: ${orderItemsCount}`);
console.log(`payments.csv rows: ${CONFIG.orders}`);
console.log(`reviews.csv rows: ${reviewsCount}`);
