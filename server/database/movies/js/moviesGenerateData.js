import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260410);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

const CONFIG = {
  users: 30_000,
  profilesPerUserMin: 1,
  profilesPerUserMax: 3,
  devicesPerUserMin: 1,
  devicesPerUserMax: 2,

  subscriptionPlans: 5,
  subscriptionsAdoptionRate: 0.7,
  promotions: 30,
  invoicesPerSubscriptionMin: 1,
  invoicesPerSubscriptionMax: 4,

  contentCategories: 60,
  titles: 8_000,
  seriesShare: 0.35,
  people: 12_000,

  seasonsPerSeriesMin: 1,
  seasonsPerSeriesMax: 5,
  episodesPerSeasonMin: 6,
  episodesPerSeasonMax: 12,

  watchlistAvgPerProfile: 3,
  continueWatchingRate: 0.3,

  viewingSessions: 250_000,
  playbackEventsPerSessionMin: 1,
  playbackEventsPerSessionMax: 2,

  downloads: 40_000,
  ratings: 120_000,
  appEvents: 300_000,
  searchQueries: 150_000,

  recommendationRows: 30,
  recommendationImpressions: 300_000,
  recommendationClicksRate: 0.33,

  experiments: 20,
  variantsPerExperimentMin: 2,
  variantsPerExperimentMax: 4,
  experimentAssignmentsTotal: 50_000,

  notificationCampaigns: 40,
  notificationDeliveries: 200_000,
  supportTickets: 10_000,

  startDate: new Date("2024-01-01T00:00:00.000Z"),
  endDate: new Date("2026-03-31T23:59:59.999Z"),
  logEvery: 25_000,
};

const COUNTRIES = ["India", "United States", "United Kingdom", "Canada", "Australia"];
const LANG_CODES = [
  ["en", "English"],
  ["hi", "Hindi"],
  ["es", "Spanish"],
  ["fr", "French"],
  ["de", "German"],
  ["it", "Italian"],
  ["pt", "Portuguese"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["ta", "Tamil"],
  ["te", "Telugu"],
  ["ar", "Arabic"],
];

const MATURITY = ["G", "PG", "PG-13", "R", "NC-17", "TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"];
const TITLE_TYPES = ["movie", "series", "documentary", "special", "short"];
const CONTENT_STATUS = ["draft", "scheduled", "published", "archived", "removed"];
const DEVICE_TYPES = ["mobile", "tablet", "web", "tv", "console", "set_top_box"];
const STREAM_QUALITY = ["sd", "hd", "full_hd", "uhd"];
const PLAYBACK_SOURCE = ["home", "search", "watchlist", "recommendation", "continue_watching", "direct_link"];
const SUBSCRIPTION_STATUS = ["trialing", "active", "past_due", "cancelled", "expired", "paused"];
const INVOICE_STATUS = ["draft", "open", "paid", "failed", "void", "refunded"];
const PAYMENT_METHOD = ["card", "upi", "wallet", "paypal", "net_banking", "app_store", "play_store"];
const PAYMENT_STATUS = ["pending", "successful", "failed", "refunded", "partial_refund"];
const PROFESSION = ["actor", "director", "writer", "producer", "composer", "host", "other"];
const ROLE_TYPE = ["actor", "director", "writer", "producer", "composer", "host"];
const SUBTITLE_TYPE = ["standard", "sdh", "forced"];
const LICENSE_TYPE = ["owned", "exclusive", "non_exclusive", "third_party"];
const SESSION_STATUS = ["started", "paused", "completed", "abandoned", "failed"];
const PLAYBACK_EVENT_TYPE = ["play", "pause", "seek", "resume", "buffer_start", "buffer_end", "quality_change", "completed", "error", "exit"];
const DOWNLOAD_STATUS = ["queued", "downloading", "completed", "expired", "deleted", "failed"];
const RATING_TYPE = ["star", "thumbs_up", "thumbs_down"];
const EXPERIMENT_TYPE = ["ui", "ranking", "pricing", "playback", "search", "notifications"];
const EXPERIMENT_STATUS = ["draft", "running", "paused", "completed", "cancelled"];
const CAMPAIGN_TYPE = ["email", "push", "sms", "in_app"];
const DELIVERY_STATUS = ["queued", "sent", "delivered", "opened", "clicked", "failed", "unsubscribed"];
const ISSUE_TYPE = ["billing", "playback", "account", "download", "content_missing", "recommendation", "other"];
const TICKET_STATUS = ["open", "in_progress", "resolved", "closed"];
const PRIORITY = ["low", "medium", "high", "critical"];
const ROW_TYPE = ["trending", "because_you_watched", "top_picks", "continue_watching", "new_releases", "genre", "editorial"];

const iso = (d) => new Date(d).toISOString();
const randomDateBetween = (from, to) => faker.date.between({ from, to });
const addMinutes = (d, minutes) => new Date(new Date(d).getTime() + minutes * 60_000);
const addDays = (d, days) => new Date(new Date(d).getTime() + days * 24 * 60_000 * 60);
const chance = (p) => faker.number.float({ min: 0, max: 1 }) < p;
const pick = (arr) => arr[faker.number.int({ min: 0, max: arr.length - 1 })];
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const round2 = (n) => Number(n.toFixed(2));

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

const ensureCleanOutputDir = () => {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
};

const pickUniqueFromRange = (count, minId, maxId) => {
  const want = Math.min(count, maxId - minId + 1);
  const set = new Set();
  while (set.size < want) {
    set.add(faker.number.int({ min: minId, max: maxId }));
  }
  return Array.from(set);
};

const buildEmail = (prefix, i) => `${prefix}.${i}@example.com`.toLowerCase();
const buildPhone = (i) => String(6000000000 + i);
const buildReferral = (i) => `MOV-${String(i).padStart(8, "0")}`;
const buildInvoiceNumber = (i) => `INV-${String(i).padStart(10, "0")}`;
const buildPromoCode = (i) => `PROMO${String(i).padStart(4, "0")}`;
const buildTxnRef = (i) => `TXN-${String(i).padStart(12, "0")}`;

const main = async () => {
  ensureCleanOutputDir();

  const writers = {
    users: new CsvWriter("users.csv", [
      "full_name",
      "email",
      "phone",
      "country",
      "signup_source",
      "signup_channel",
      "referral_code",
      "referred_by_user_id",
      "preferred_language",
      "marketing_opt_in",
      "is_active",
      "is_verified",
      "last_seen_at",
      "created_at",
    ]),
    profiles: new CsvWriter("profiles.csv", [
      "user_id",
      "profile_name",
      "profile_type",
      "maturity_rating_limit",
      "language_preference",
      "autoplay_enabled",
      "subtitles_enabled",
      "avatar_url",
      "is_primary",
      "is_active",
      "created_at",
    ]),
    devices: new CsvWriter("devices.csv", [
      "user_id",
      "device_type",
      "os_name",
      "app_version",
      "device_brand",
      "device_model",
      "country",
      "last_active_at",
      "is_active",
      "created_at",
    ]),
    subscription_plans: new CsvWriter("subscription_plans.csv", [
      "plan_name",
      "billing_cycle",
      "price",
      "currency",
      "max_streams",
      "max_download_devices",
      "video_quality",
      "has_ads",
      "allows_offline_download",
      "is_active",
      "created_at",
    ]),
    subscriptions: new CsvWriter("subscriptions.csv", [
      "user_id",
      "plan_id",
      "subscription_status",
      "started_at",
      "current_period_start",
      "current_period_end",
      "cancelled_at",
      "auto_renew",
      "payment_provider",
      "created_at",
    ]),
    promotions: new CsvWriter("promotions.csv", [
      "code",
      "description",
      "discount_type",
      "discount_value",
      "max_discount_amount",
      "starts_at",
      "ends_at",
      "max_uses",
      "uses_count",
      "per_user_limit",
      "applicable_plan_id",
      "is_active",
      "created_at",
    ]),
    billing_invoices: new CsvWriter("billing_invoices.csv", [
      "subscription_id",
      "promotion_id",
      "invoice_number",
      "invoice_status",
      "subtotal_amount",
      "discount_amount",
      "tax_amount",
      "total_amount",
      "currency",
      "issued_at",
      "due_at",
      "paid_at",
      "created_at",
    ]),
    payments: new CsvWriter("payments.csv", [
      "invoice_id",
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
    content_categories: new CsvWriter("content_categories.csv", [
      "category_name",
      "category_type",
      "created_at",
    ]),
    titles: new CsvWriter("titles.csv", [
      "title_name",
      "original_title",
      "title_type",
      "release_year",
      "runtime_minutes",
      "maturity_rating",
      "original_language",
      "country_of_origin",
      "synopsis",
      "content_status",
      "is_original",
      "has_ads",
      "imdb_like_score",
      "critic_score",
      "availability_start",
      "availability_end",
      "created_at",
    ]),
    title_categories: new CsvWriter("title_categories.csv", [
      "title_id",
      "category_id",
      "created_at",
    ]),
    title_localizations: new CsvWriter("title_localizations.csv", [
      "title_id",
      "language_code",
      "localized_title",
      "localized_synopsis",
      "created_at",
    ]),
    people: new CsvWriter("people.csv", [
      "full_name",
      "birth_country",
      "primary_profession",
      "is_active",
      "created_at",
    ]),
    title_credits: new CsvWriter("title_credits.csv", [
      "title_id",
      "person_id",
      "role_type",
      "character_name",
      "billing_order",
      "created_at",
    ]),
    seasons: new CsvWriter("seasons.csv", [
      "title_id",
      "season_number",
      "season_title",
      "release_date",
      "created_at",
    ]),
    episodes: new CsvWriter("episodes.csv", [
      "season_id",
      "episode_number",
      "episode_title",
      "runtime_minutes",
      "release_date",
      "synopsis",
      "created_at",
    ]),
    audio_languages: new CsvWriter("audio_languages.csv", [
      "language_code",
      "language_name",
      "created_at",
    ]),
    title_audio_tracks: new CsvWriter("title_audio_tracks.csv", [
      "title_id",
      "episode_id",
      "audio_language_id",
      "is_default",
      "created_at",
    ]),
    subtitle_languages: new CsvWriter("subtitle_languages.csv", [
      "language_code",
      "language_name",
      "created_at",
    ]),
    title_subtitles: new CsvWriter("title_subtitles.csv", [
      "title_id",
      "episode_id",
      "subtitle_language_id",
      "subtitle_type",
      "created_at",
    ]),
    content_licenses: new CsvWriter("content_licenses.csv", [
      "title_id",
      "licensed_region",
      "license_type",
      "license_start",
      "license_end",
      "is_download_allowed",
      "created_at",
    ]),
    content_availability: new CsvWriter("content_availability.csv", [
      "title_id",
      "country",
      "available_from",
      "available_to",
      "requires_plan_id",
      "is_available",
      "created_at",
    ]),
    watchlists: new CsvWriter("watchlists.csv", [
      "profile_id",
      "title_id",
      "added_at",
    ]),
    continue_watching: new CsvWriter("continue_watching.csv", [
      "profile_id",
      "title_id",
      "episode_id",
      "last_position_seconds",
      "completion_percent",
      "last_watched_at",
    ]),
    viewing_sessions: new CsvWriter("viewing_sessions.csv", [
      "profile_id",
      "device_id",
      "title_id",
      "episode_id",
      "session_status",
      "started_at",
      "ended_at",
      "watch_time_seconds",
      "max_position_seconds",
      "completion_percent",
      "stream_quality",
      "bitrate_kbps",
      "playback_source",
      "created_at",
    ]),
    playback_events: new CsvWriter("playback_events.csv", [
      "session_id",
      "event_type",
      "event_time",
      "position_seconds",
      "buffer_duration_ms",
      "error_code",
      "metadata",
    ]),
    downloads: new CsvWriter("downloads.csv", [
      "profile_id",
      "device_id",
      "title_id",
      "episode_id",
      "download_status",
      "file_size_mb",
      "downloaded_at",
      "expires_at",
      "created_at",
    ]),
    ratings: new CsvWriter("ratings.csv", [
      "profile_id",
      "title_id",
      "episode_id",
      "rating_value",
      "rating_type",
      "review_text",
      "created_at",
    ]),
    app_events: new CsvWriter("app_events.csv", [
      "profile_id",
      "device_id",
      "event_name",
      "screen_name",
      "title_id",
      "episode_id",
      "source_channel",
      "country",
      "event_time",
      "metadata",
    ]),
    search_queries: new CsvWriter("search_queries.csv", [
      "profile_id",
      "device_id",
      "query_text",
      "result_count",
      "clicked_title_id",
      "search_time",
    ]),
    recommendation_rows: new CsvWriter("recommendation_rows.csv", [
      "row_name",
      "row_type",
      "is_active",
      "created_at",
    ]),
    experiments: new CsvWriter("experiments.csv", [
      "experiment_name",
      "experiment_type",
      "status",
      "starts_at",
      "ends_at",
      "created_at",
    ]),
    experiment_variants: new CsvWriter("experiment_variants.csv", [
      "experiment_id",
      "variant_name",
      "traffic_percentage",
      "is_control",
      "created_at",
    ]),
    experiment_assignments: new CsvWriter("experiment_assignments.csv", [
      "experiment_id",
      "variant_id",
      "profile_id",
      "assigned_at",
    ]),
    recommendation_impressions: new CsvWriter("recommendation_impressions.csv", [
      "profile_id",
      "row_id",
      "title_id",
      "rank_position",
      "served_at",
      "algorithm_version",
      "experiment_assignment_id",
    ]),
    recommendation_clicks: new CsvWriter("recommendation_clicks.csv", [
      "impression_id",
      "clicked_at",
    ]),
    notification_campaigns: new CsvWriter("notification_campaigns.csv", [
      "campaign_name",
      "campaign_type",
      "target_audience",
      "scheduled_at",
      "sent_at",
      "status",
      "created_at",
    ]),
    notification_deliveries: new CsvWriter("notification_deliveries.csv", [
      "campaign_id",
      "user_id",
      "profile_id",
      "title_id",
      "delivery_status",
      "delivered_at",
      "opened_at",
      "clicked_at",
      "created_at",
    ]),
    support_tickets: new CsvWriter("support_tickets.csv", [
      "user_id",
      "profile_id",
      "device_id",
      "title_id",
      "issue_type",
      "ticket_status",
      "priority",
      "resolution_time_mins",
      "created_at",
      "resolved_at",
    ]),
  };

  // ---------------------------------------------------
  // USERS
  // ---------------------------------------------------
  const userCreatedAt = new Array(CONFIG.users + 1);
  const userPrimaryDeviceId = new Array(CONFIG.users + 1).fill(null);
  const userPrimaryProfileId = new Array(CONFIG.users + 1).fill(null);

  for (let i = 1; i <= CONFIG.users; i++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    userCreatedAt[i] = createdAt;

    const isActive = chance(0.93);
    const isVerified = chance(0.78);
    const lastSeenAt = chance(0.85) ? randomDateBetween(createdAt, CONFIG.endDate) : null;

    writers.users.writeRow({
      full_name: faker.person.fullName(),
      email: buildEmail("user", i),
      phone: chance(0.92) ? buildPhone(i) : null,
      country: pick(COUNTRIES),
      signup_source: pick(["organic", "referral", "ads", "partner", "unknown"]),
      signup_channel: pick(["web", "mobile", "tv", "console"]),
      referral_code: buildReferral(i),
      referred_by_user_id: i > 1 && chance(0.18) ? faker.number.int({ min: 1, max: i - 1 }) : null,
      preferred_language: pick(LANG_CODES)[0],
      marketing_opt_in: chance(0.55),
      is_active: isActive,
      is_verified: isVerified,
      last_seen_at: lastSeenAt ? iso(lastSeenAt) : null,
      created_at: iso(createdAt),
    });

    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated users: ${i.toLocaleString()} / ${CONFIG.users.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // PROFILES
  // ---------------------------------------------------
  let profileId = 0;
  const profileUserId = [];
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const count = faker.number.int({
      min: CONFIG.profilesPerUserMin,
      max: CONFIG.profilesPerUserMax,
    });
    const primaryIndex = faker.number.int({ min: 0, max: count - 1 });

    for (let j = 0; j < count; j++) {
      profileId++;
      profileUserId[profileId] = userId;
      if (userPrimaryProfileId[userId] === null) userPrimaryProfileId[userId] = profileId;

      const createdAt = randomDateBetween(userCreatedAt[userId], CONFIG.endDate);
      const isKids = chance(0.12);
      writers.profiles.writeRow({
        user_id: userId,
        profile_name: j === 0 ? "Main" : `Profile ${j + 1}`,
        profile_type: isKids ? "kids" : "adult",
        maturity_rating_limit: isKids ? pick(["G", "PG", "TV-Y", "TV-Y7"]) : pick(MATURITY),
        language_preference: pick(LANG_CODES)[0],
        autoplay_enabled: chance(0.82),
        subtitles_enabled: chance(0.45),
        avatar_url: chance(0.35) ? faker.image.avatar() : null,
        is_primary: j === primaryIndex,
        is_active: chance(0.96),
        created_at: iso(createdAt),
      });
    }

    if (userId % CONFIG.logEvery === 0) {
      console.log(`Generated profiles: user ${userId.toLocaleString()} / ${CONFIG.users.toLocaleString()}`);
    }
  }

  const profilesCount = profileId;

  // ---------------------------------------------------
  // DEVICES
  // ---------------------------------------------------
  let deviceId = 0;
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const count = faker.number.int({
      min: CONFIG.devicesPerUserMin,
      max: CONFIG.devicesPerUserMax,
    });
    for (let j = 0; j < count; j++) {
      deviceId++;
      if (userPrimaryDeviceId[userId] === null) userPrimaryDeviceId[userId] = deviceId;
      const createdAt = randomDateBetween(userCreatedAt[userId], CONFIG.endDate);
      const lastActive = chance(0.8) ? randomDateBetween(createdAt, CONFIG.endDate) : null;
      writers.devices.writeRow({
        user_id: userId,
        device_type: pick(DEVICE_TYPES),
        os_name: pick(["iOS", "Android", "Windows", "macOS", "Linux", "tvOS", "PlayStation OS"]),
        app_version: `${faker.number.int({ min: 1, max: 8 })}.${faker.number.int({ min: 0, max: 20 })}.${faker.number.int({ min: 0, max: 50 })}`,
        device_brand: pick(["Apple", "Samsung", "Google", "Xiaomi", "Sony", "LG", "OnePlus", "Dell"]),
        device_model: faker.commerce.productName().slice(0, 60),
        country: pick(COUNTRIES),
        last_active_at: lastActive ? iso(lastActive) : null,
        is_active: chance(0.9),
        created_at: iso(createdAt),
      });
    }
    if (userId % CONFIG.logEvery === 0) {
      console.log(`Generated devices: user ${userId.toLocaleString()} / ${CONFIG.users.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // SUBSCRIPTION PLANS
  // ---------------------------------------------------
  const planDefs = [
    { name: "Basic", cycle: "monthly", price: 5.99, streams: 1, dl: 1, quality: "hd", ads: true, offline: false },
    { name: "Standard", cycle: "monthly", price: 9.99, streams: 2, dl: 2, quality: "full_hd", ads: false, offline: true },
    { name: "Premium", cycle: "monthly", price: 14.99, streams: 4, dl: 6, quality: "uhd", ads: false, offline: true },
    { name: "Family", cycle: "yearly", price: 119.99, streams: 6, dl: 10, quality: "uhd", ads: false, offline: true },
    { name: "Mobile", cycle: "monthly", price: 3.99, streams: 1, dl: 1, quality: "hd", ads: true, offline: true },
  ].slice(0, CONFIG.subscriptionPlans);

  const planCreatedAt = randomDateBetween(CONFIG.startDate, CONFIG.startDate);
  for (let i = 0; i < planDefs.length; i++) {
    const p = planDefs[i];
    writers.subscription_plans.writeRow({
      plan_name: p.name,
      billing_cycle: p.cycle,
      price: round2(p.price),
      currency: "USD",
      max_streams: p.streams,
      max_download_devices: p.dl,
      video_quality: p.quality,
      has_ads: p.ads,
      allows_offline_download: p.offline,
      is_active: true,
      created_at: iso(planCreatedAt),
    });
  }
  const plansCount = planDefs.length;

  // ---------------------------------------------------
  // SUBSCRIPTIONS
  // ---------------------------------------------------
  let subscriptionId = 0;
  const subscriptions = [];
  for (let userId = 1; userId <= CONFIG.users; userId++) {
    if (!chance(CONFIG.subscriptionsAdoptionRate)) continue;
    subscriptionId++;

    const planId = faker.number.int({ min: 1, max: plansCount });
    const startedAt = randomDateBetween(userCreatedAt[userId], CONFIG.endDate);
    const periodStart = startedAt;
    const cycleDays = planDefs[planId - 1].cycle === "yearly" ? 365 : planDefs[planId - 1].cycle === "quarterly" ? 90 : 30;
    const periodEnd = addDays(periodStart, cycleDays);

    const status = chance(0.72) ? "active" : pick(SUBSCRIPTION_STATUS);
    const cancelledAt = status === "cancelled" ? addDays(periodStart, faker.number.int({ min: 1, max: 120 })) : null;

    writers.subscriptions.writeRow({
      user_id: userId,
      plan_id: planId,
      subscription_status: status,
      started_at: iso(startedAt),
      current_period_start: iso(periodStart),
      current_period_end: iso(periodEnd),
      cancelled_at: cancelledAt ? iso(cancelledAt) : null,
      auto_renew: status === "active" ? chance(0.88) : chance(0.5),
      payment_provider: pick(["stripe", "razorpay", "paypal", "app_store", "play_store", "adyen"]),
      created_at: iso(startedAt),
    });

    subscriptions.push({ subscriptionId, userId, planId, startedAt: periodStart });
  }

  // ---------------------------------------------------
  // PROMOTIONS
  // ---------------------------------------------------
  const promotionDefs = [];
  for (let i = 1; i <= CONFIG.promotions; i++) {
    const startsAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const endsAt = addDays(startsAt, faker.number.int({ min: 7, max: 180 }));
    const discountType = chance(0.7) ? "percent" : "fixed";
    const discountValue =
      discountType === "percent"
        ? faker.number.int({ min: 5, max: 40 })
        : faker.number.int({ min: 1, max: 10 });
    const maxDiscountAmount = discountType === "percent" ? faker.number.int({ min: 5, max: 25 }) : null;
    const planId = chance(0.25) ? faker.number.int({ min: 1, max: plansCount }) : null;
    writers.promotions.writeRow({
      code: buildPromoCode(i),
      description: faker.lorem.sentence(),
      discount_type: discountType,
      discount_value: round2(discountValue),
      max_discount_amount: maxDiscountAmount !== null ? round2(maxDiscountAmount) : null,
      starts_at: iso(startsAt),
      ends_at: iso(endsAt),
      max_uses: faker.number.int({ min: 500, max: 10000 }),
      uses_count: faker.number.int({ min: 0, max: 200 }),
      per_user_limit: 1,
      applicable_plan_id: planId,
      is_active: endsAt >= CONFIG.endDate ? true : chance(0.6),
      created_at: iso(startsAt),
    });
    promotionDefs.push({ promotionId: i });
  }
  const promotionsCount = CONFIG.promotions;

  // ---------------------------------------------------
  // BILLING INVOICES + PAYMENTS
  // ---------------------------------------------------
  let invoiceId = 0;
  let paymentId = 0;
  for (const s of subscriptions) {
    const invoiceCount = faker.number.int({
      min: CONFIG.invoicesPerSubscriptionMin,
      max: CONFIG.invoicesPerSubscriptionMax,
    });
    for (let k = 0; k < invoiceCount; k++) {
      invoiceId++;
      const issuedAt = addDays(s.startedAt, faker.number.int({ min: 0, max: 420 }));
      const dueAt = chance(0.35) ? addDays(issuedAt, faker.number.int({ min: 1, max: 14 })) : null;
      const promoId = chance(0.22) ? faker.number.int({ min: 1, max: promotionsCount }) : null;
      const subtotal = round2(planDefs[s.planId - 1].price);
      const discount = promoId ? round2(subtotal * faker.number.float({ min: 0.05, max: 0.35 })) : 0;
      const tax = round2((subtotal - discount) * 0.18);
      const total = round2(Math.max(0, subtotal - discount + tax));
      const status = chance(0.75) ? "paid" : pick(INVOICE_STATUS);
      const paidAt = status === "paid" ? addMinutes(issuedAt, faker.number.int({ min: 1, max: 6000 })) : null;

      writers.billing_invoices.writeRow({
        subscription_id: s.subscriptionId,
        promotion_id: promoId,
        invoice_number: buildInvoiceNumber(invoiceId),
        invoice_status: status,
        subtotal_amount: subtotal,
        discount_amount: discount,
        tax_amount: tax,
        total_amount: total,
        currency: "USD",
        issued_at: iso(issuedAt),
        due_at: dueAt ? iso(dueAt) : null,
        paid_at: paidAt ? iso(paidAt) : null,
        created_at: iso(issuedAt),
      });

      // one payment per invoice
      paymentId++;
      const pStatus =
        status === "paid"
          ? "successful"
          : chance(0.15)
            ? "failed"
            : pick(PAYMENT_STATUS);
      const pPaidAt = pStatus === "successful" ? paidAt || addMinutes(issuedAt, faker.number.int({ min: 1, max: 6000 })) : null;
      const refundedAt = pStatus.includes("refund") && pPaidAt ? addDays(pPaidAt, faker.number.int({ min: 1, max: 30 })) : null;
      writers.payments.writeRow({
        invoice_id: invoiceId,
        payment_method: pick(PAYMENT_METHOD),
        payment_provider: pick(["stripe", "razorpay", "paypal", "app_store", "play_store", "adyen"]),
        payment_status: pStatus,
        paid_amount: pStatus === "successful" ? total : round2(total * faker.number.float({ min: 0.2, max: 1 })),
        refund_amount: pStatus.includes("refund") ? round2(total * faker.number.float({ min: 0.1, max: 0.9 })) : 0,
        paid_at: pPaidAt ? iso(pPaidAt) : null,
        refunded_at: refundedAt ? iso(refundedAt) : null,
        transaction_ref: buildTxnRef(paymentId),
        failure_reason: pStatus === "failed" ? faker.lorem.sentence() : null,
        created_at: iso(issuedAt),
      });
    }
  }

  // ---------------------------------------------------
  // CONTENT CATEGORIES
  // ---------------------------------------------------
  const categoryTypes = ["genre", "mood", "theme", "audience", "format"];
  for (let i = 1; i <= CONFIG.contentCategories; i++) {
    writers.content_categories.writeRow({
      category_name: `${pick(["Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Romance", "Horror", "Family", "Crime", "Mystery", "Adventure", "Fantasy"])} ${i}`,
      category_type: pick(categoryTypes),
      created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
    });
  }

  // ---------------------------------------------------
  // TITLES
  // ---------------------------------------------------
  const titleTypeById = new Array(CONFIG.titles + 1);
  const titleLangById = new Array(CONFIG.titles + 1);
  const seriesTitleIds = [];
  const nonSeriesTitleIds = [];

  for (let i = 1; i <= CONFIG.titles; i++) {
    const isSeries = chance(CONFIG.seriesShare);
    const type = isSeries ? "series" : pick(TITLE_TYPES.filter((t) => t !== "series"));
    titleTypeById[i] = type;
    const lang = pick(LANG_CODES)[0];
    titleLangById[i] = lang;

    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const releaseYear = faker.number.int({ min: 1990, max: 2026 });
    const runtime = type === "movie" ? faker.number.int({ min: 80, max: 180 }) : type === "documentary" ? faker.number.int({ min: 40, max: 120 }) : faker.number.int({ min: 15, max: 90 });
    const status = chance(0.78) ? "published" : pick(CONTENT_STATUS);
    const isOriginal = chance(0.22);
    const hasAds = chance(0.3);
    const availabilityStart = chance(0.7) ? randomDateBetween(CONFIG.startDate, CONFIG.endDate) : null;
    const availabilityEnd = availabilityStart && chance(0.3) ? addDays(availabilityStart, faker.number.int({ min: 30, max: 365 })) : null;

    writers.titles.writeRow({
      title_name: faker.commerce.productName(),
      original_title: chance(0.35) ? faker.commerce.productName() : null,
      title_type: type,
      release_year: releaseYear,
      runtime_minutes: runtime,
      maturity_rating: pick(MATURITY),
      original_language: lang,
      country_of_origin: pick(COUNTRIES),
      synopsis: faker.lorem.paragraph(),
      content_status: status,
      is_original: isOriginal,
      has_ads: hasAds,
      imdb_like_score: round2(faker.number.float({ min: 0, max: 10, fractionDigits: 2 })),
      critic_score: round2(faker.number.float({ min: 0, max: 100, fractionDigits: 2 })),
      availability_start: availabilityStart ? iso(availabilityStart) : null,
      availability_end: availabilityEnd ? iso(availabilityEnd) : null,
      created_at: iso(createdAt),
    });

    if (type === "series") seriesTitleIds.push(i);
    else nonSeriesTitleIds.push(i);

    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated titles: ${i.toLocaleString()} / ${CONFIG.titles.toLocaleString()}`);
    }
  }

  // title_categories (2–5 categories each)
  for (let titleId = 1; titleId <= CONFIG.titles; titleId++) {
    const count = faker.number.int({ min: 2, max: 5 });
    const catIds = pickUniqueFromRange(count, 1, CONFIG.contentCategories);
    for (const catId of catIds) {
      writers.title_categories.writeRow({
        title_id: titleId,
        category_id: catId,
        created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
      });
    }
  }

  // title_localizations (1–3 per title)
  for (let titleId = 1; titleId <= CONFIG.titles; titleId++) {
    const count = faker.number.int({ min: 1, max: 3 });
    const langs = pickUniqueFromRange(count, 0, LANG_CODES.length - 1).map((i) => LANG_CODES[i][0]);
    for (const lang of langs) {
      writers.title_localizations.writeRow({
        title_id: titleId,
        language_code: lang,
        localized_title: faker.commerce.productName(),
        localized_synopsis: chance(0.7) ? faker.lorem.paragraph() : null,
        created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
      });
    }
  }

  // ---------------------------------------------------
  // PEOPLE
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.people; i++) {
    writers.people.writeRow({
      full_name: faker.person.fullName(),
      birth_country: chance(0.75) ? pick(COUNTRIES) : null,
      primary_profession: pick(PROFESSION),
      is_active: chance(0.92),
      created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
    });
    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated people: ${i.toLocaleString()} / ${CONFIG.people.toLocaleString()}`);
    }
  }

  // title_credits
  // Each title: 1 director, 1 writer, 3–8 actors, optional producer/composer
  for (let titleId = 1; titleId <= CONFIG.titles; titleId++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const director = faker.number.int({ min: 1, max: CONFIG.people });
    const writer = faker.number.int({ min: 1, max: CONFIG.people });
    const producer = chance(0.5) ? faker.number.int({ min: 1, max: CONFIG.people }) : null;
    const composer = chance(0.4) ? faker.number.int({ min: 1, max: CONFIG.people }) : null;

    writers.title_credits.writeRow({
      title_id: titleId,
      person_id: director,
      role_type: "director",
      character_name: null,
      billing_order: null,
      created_at: iso(createdAt),
    });
    if (writer !== director) {
      writers.title_credits.writeRow({
        title_id: titleId,
        person_id: writer,
        role_type: "writer",
        character_name: null,
        billing_order: null,
        created_at: iso(createdAt),
      });
    }
    if (producer && producer !== director && producer !== writer) {
      writers.title_credits.writeRow({
        title_id: titleId,
        person_id: producer,
        role_type: "producer",
        character_name: null,
        billing_order: null,
        created_at: iso(createdAt),
      });
    }
    if (composer && composer !== director && composer !== writer && composer !== producer) {
      writers.title_credits.writeRow({
        title_id: titleId,
        person_id: composer,
        role_type: "composer",
        character_name: null,
        billing_order: null,
        created_at: iso(createdAt),
      });
    }

    const actorCount = faker.number.int({ min: 3, max: 8 });
    const actors = pickUniqueFromRange(actorCount, 1, CONFIG.people);
    let billing = 1;
    for (const actor of actors) {
      if ([director, writer, producer, composer].includes(actor)) continue;
      writers.title_credits.writeRow({
        title_id: titleId,
        person_id: actor,
        role_type: "actor",
        character_name: chance(0.6) ? faker.person.firstName() : null,
        billing_order: billing++,
        created_at: iso(createdAt),
      });
    }
  }

  // ---------------------------------------------------
  // SEASONS + EPISODES (for series only)
  // ---------------------------------------------------
  let seasonId = 0;
  let episodeId = 0;
  const episodeTitleId = [];
  const episodeIds = [];

  for (const seriesTitleId of seriesTitleIds) {
    const seasonsCount = faker.number.int({
      min: CONFIG.seasonsPerSeriesMin,
      max: CONFIG.seasonsPerSeriesMax,
    });
    for (let sIdx = 1; sIdx <= seasonsCount; sIdx++) {
      seasonId++;
      const seasonRelease = faker.date.between({ from: "2010-01-01", to: "2026-03-31" });
      writers.seasons.writeRow({
        title_id: seriesTitleId,
        season_number: sIdx,
        season_title: chance(0.35) ? `Season ${sIdx}: ${faker.word.noun()}` : null,
        release_date: iso(seasonRelease).slice(0, 10),
        created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
      });

      const episodesCount = faker.number.int({
        min: CONFIG.episodesPerSeasonMin,
        max: CONFIG.episodesPerSeasonMax,
      });
      for (let eIdx = 1; eIdx <= episodesCount; eIdx++) {
        episodeId++;
        episodeTitleId[episodeId] = seriesTitleId;
        episodeIds.push(episodeId);
        writers.episodes.writeRow({
          season_id: seasonId,
          episode_number: eIdx,
          episode_title: `${faker.word.adjective()} ${faker.word.noun()}`.slice(0, 200),
          runtime_minutes: faker.number.int({ min: 18, max: 65 }),
          release_date: iso(addDays(seasonRelease, eIdx * 7)).slice(0, 10),
          synopsis: chance(0.7) ? faker.lorem.paragraph() : null,
          created_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
        });
      }
    }
  }

  // ---------------------------------------------------
  // AUDIO/SUBTITLE LANGUAGES + TRACKS
  // ---------------------------------------------------
  const langCodeToAudioId = new Map();
  const langCodeToSubtitleId = new Map();
  const createdLangAt = iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate));

  for (let i = 0; i < LANG_CODES.length; i++) {
    const [code, name] = LANG_CODES[i];
    const id = i + 1;
    langCodeToAudioId.set(code, id);
    langCodeToSubtitleId.set(code, id);
    writers.audio_languages.writeRow({ language_code: code, language_name: name, created_at: createdLangAt });
    writers.subtitle_languages.writeRow({ language_code: code, language_name: name, created_at: createdLangAt });
  }

  const audioLangCount = LANG_CODES.length;
  const subtitleLangCount = LANG_CODES.length;

  // For title-level tracks (non-series titles)
  for (const titleId of nonSeriesTitleIds) {
    const defaultLang = titleLangById[titleId];
    const defaultAudioId = langCodeToAudioId.get(defaultLang) || 1;
    const extraCount = faker.number.int({ min: 0, max: 2 });
    const extraLangIds = pickUniqueFromRange(extraCount, 1, audioLangCount).filter((id) => id !== defaultAudioId);
    const createdAt = iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate));

    writers.title_audio_tracks.writeRow({
      title_id: titleId,
      episode_id: null,
      audio_language_id: defaultAudioId,
      is_default: true,
      created_at: createdAt,
    });
    for (const id of extraLangIds) {
      writers.title_audio_tracks.writeRow({
        title_id: titleId,
        episode_id: null,
        audio_language_id: id,
        is_default: false,
        created_at: createdAt,
      });
    }

    const subDefaultId = langCodeToSubtitleId.get(defaultLang) || 1;
    const subExtraCount = faker.number.int({ min: 0, max: 3 });
    const subExtraIds = pickUniqueFromRange(subExtraCount, 1, subtitleLangCount).filter((id) => id !== subDefaultId);
    writers.title_subtitles.writeRow({
      title_id: titleId,
      episode_id: null,
      subtitle_language_id: subDefaultId,
      subtitle_type: "standard",
      created_at: createdAt,
    });
    for (const id of subExtraIds) {
      writers.title_subtitles.writeRow({
        title_id: titleId,
        episode_id: null,
        subtitle_language_id: id,
        subtitle_type: pick(SUBTITLE_TYPE),
        created_at: createdAt,
      });
    }
  }

  // Episode-level tracks (series episodes)
  for (const epId of episodeIds) {
    const titleId = episodeTitleId[epId];
    const defaultLang = titleLangById[titleId];
    const defaultAudioId = langCodeToAudioId.get(defaultLang) || 1;
    const extraCount = faker.number.int({ min: 0, max: 1 });
    const extraLangIds = pickUniqueFromRange(extraCount, 1, audioLangCount).filter((id) => id !== defaultAudioId);
    const createdAt = iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate));
    writers.title_audio_tracks.writeRow({
      title_id: null,
      episode_id: epId,
      audio_language_id: defaultAudioId,
      is_default: true,
      created_at: createdAt,
    });
    for (const id of extraLangIds) {
      writers.title_audio_tracks.writeRow({
        title_id: null,
        episode_id: epId,
        audio_language_id: id,
        is_default: false,
        created_at: createdAt,
      });
    }

    const subDefaultId = langCodeToSubtitleId.get(defaultLang) || 1;
    const subExtraCount = faker.number.int({ min: 0, max: 2 });
    const subExtraIds = pickUniqueFromRange(subExtraCount, 1, subtitleLangCount).filter((id) => id !== subDefaultId);
    writers.title_subtitles.writeRow({
      title_id: null,
      episode_id: epId,
      subtitle_language_id: subDefaultId,
      subtitle_type: "standard",
      created_at: createdAt,
    });
    for (const id of subExtraIds) {
      writers.title_subtitles.writeRow({
        title_id: null,
        episode_id: epId,
        subtitle_language_id: id,
        subtitle_type: pick(SUBTITLE_TYPE),
        created_at: createdAt,
      });
    }
  }

  // ---------------------------------------------------
  // LICENSES + AVAILABILITY
  // ---------------------------------------------------
  for (let titleId = 1; titleId <= CONFIG.titles; titleId++) {
    const start = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const end = addDays(start, faker.number.int({ min: 60, max: 720 }));
    writers.content_licenses.writeRow({
      title_id: titleId,
      licensed_region: pick(["IN", "US", "EU", "APAC", "LATAM"]),
      license_type: pick(LICENSE_TYPE),
      license_start: iso(start),
      license_end: iso(end),
      is_download_allowed: chance(0.7),
      created_at: iso(start),
    });

    const countriesCount = faker.number.int({ min: 1, max: 3 });
    const cs = pickUniqueFromRange(countriesCount, 0, COUNTRIES.length - 1).map((i) => COUNTRIES[i]);
    const availableFrom = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    for (const c of cs) {
      writers.content_availability.writeRow({
        title_id: titleId,
        country: c,
        available_from: iso(availableFrom),
        available_to: chance(0.2) ? iso(addDays(availableFrom, faker.number.int({ min: 30, max: 365 }))) : null,
        requires_plan_id: chance(0.55) ? faker.number.int({ min: 1, max: plansCount }) : null,
        is_available: chance(0.95),
        created_at: iso(availableFrom),
      });
    }
  }

  // ---------------------------------------------------
  // WATCHLISTS
  // ---------------------------------------------------
  for (let pId = 1; pId <= profilesCount; pId++) {
    const count = faker.number.int({ min: 0, max: 6 });
    const titleIds = pickUniqueFromRange(count, 1, CONFIG.titles);
    for (const tId of titleIds) {
      writers.watchlists.writeRow({
        profile_id: pId,
        title_id: tId,
        added_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
      });
    }
    if (pId % (CONFIG.logEvery * 2) === 0) {
      console.log(`Generated watchlists: profile ${pId.toLocaleString()} / ${profilesCount.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // CONTINUE WATCHING (per profile)
  // ---------------------------------------------------
  const episodeCount = episodeIds.length;
  for (let pId = 1; pId <= profilesCount; pId++) {
    if (!chance(CONFIG.continueWatchingRate)) continue;
    const entries = faker.number.int({ min: 1, max: 3 });
    const usedTitles = new Set();
    const usedEpisodes = new Set();
    for (let j = 0; j < entries; j++) {
      const wantEpisode = episodeCount > 0 && chance(0.55);
      if (wantEpisode) {
        const epId = episodeIds[faker.number.int({ min: 0, max: episodeCount - 1 })];
        if (usedEpisodes.has(epId)) continue;
        usedEpisodes.add(epId);
        writers.continue_watching.writeRow({
          profile_id: pId,
          title_id: null,
          episode_id: epId,
          last_position_seconds: faker.number.int({ min: 0, max: 3200 }),
          completion_percent: round2(faker.number.float({ min: 0, max: 99.9, fractionDigits: 2 })),
          last_watched_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
        });
      } else {
        const tId = nonSeriesTitleIds[faker.number.int({ min: 0, max: nonSeriesTitleIds.length - 1 })];
        if (usedTitles.has(tId)) continue;
        usedTitles.add(tId);
        writers.continue_watching.writeRow({
          profile_id: pId,
          title_id: tId,
          episode_id: null,
          last_position_seconds: faker.number.int({ min: 0, max: 7200 }),
          completion_percent: round2(faker.number.float({ min: 0, max: 99.9, fractionDigits: 2 })),
          last_watched_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
        });
      }
    }
  }

  // ---------------------------------------------------
  // VIEWING SESSIONS + PLAYBACK EVENTS
  // ---------------------------------------------------
  let sessionId = 0;
  for (let i = 1; i <= CONFIG.viewingSessions; i++) {
    sessionId++;
    const profileId = faker.number.int({ min: 1, max: profilesCount });
    const userId = profileUserId[profileId];
    const deviceId = userPrimaryDeviceId[userId] || null;

    const useEpisode = episodeCount > 0 && chance(0.45);
    const titleId = useEpisode
      ? null
      : nonSeriesTitleIds[faker.number.int({ min: 0, max: nonSeriesTitleIds.length - 1 })];
    const episodeIdForSession = useEpisode ? episodeIds[faker.number.int({ min: 0, max: episodeCount - 1 })] : null;

    const startedAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const watchTime = faker.number.int({ min: 30, max: 10_800 });
    const endedAt = chance(0.92) ? addMinutes(startedAt, Math.ceil(watchTime / 60)) : null;
    const maxPos = faker.number.int({ min: Math.min(10, watchTime), max: watchTime });
    const completion = round2(clamp((watchTime / (useEpisode ? 3600 : 7200)) * 100, 0, 100));
    const status = completion > 95 ? "completed" : chance(0.12) ? "abandoned" : pick(SESSION_STATUS);

    writers.viewing_sessions.writeRow({
      profile_id: profileId,
      device_id: deviceId,
      title_id: titleId,
      episode_id: episodeIdForSession,
      session_status: status,
      started_at: iso(startedAt),
      ended_at: endedAt ? iso(endedAt) : null,
      watch_time_seconds: watchTime,
      max_position_seconds: maxPos,
      completion_percent: completion,
      stream_quality: pick(STREAM_QUALITY),
      bitrate_kbps: faker.number.int({ min: 300, max: 12_000 }),
      playback_source: pick(PLAYBACK_SOURCE),
      created_at: iso(startedAt),
    });

    const eventsCount = faker.number.int({
      min: CONFIG.playbackEventsPerSessionMin,
      max: CONFIG.playbackEventsPerSessionMax,
    });
    for (let e = 0; e < eventsCount; e++) {
      const eventTime = addMinutes(startedAt, faker.number.int({ min: 0, max: Math.max(1, Math.floor(watchTime / 60)) }));
      const eventType = pick(PLAYBACK_EVENT_TYPE);
      writers.playback_events.writeRow({
        session_id: sessionId,
        event_type: eventType,
        event_time: iso(eventTime),
        position_seconds: faker.number.int({ min: 0, max: maxPos }),
        buffer_duration_ms: eventType.includes("buffer") ? faker.number.int({ min: 50, max: 8000 }) : null,
        error_code: eventType === "error" ? pick(["E_NETWORK", "E_DRM", "E_DECODE", "E_TIMEOUT"]) : null,
        metadata: JSON.stringify({ q: pick(STREAM_QUALITY), v: faker.number.int({ min: 1, max: 5 }) }),
      });
    }

    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated viewing_sessions: ${i.toLocaleString()} / ${CONFIG.viewingSessions.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // DOWNLOADS
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.downloads; i++) {
    const profileId = faker.number.int({ min: 1, max: profilesCount });
    const userId = profileUserId[profileId];
    const deviceId = userPrimaryDeviceId[userId] || faker.number.int({ min: 1, max: deviceId });

    const useEpisode = episodeCount > 0 && chance(0.35);
    const titleId = useEpisode ? null : nonSeriesTitleIds[faker.number.int({ min: 0, max: nonSeriesTitleIds.length - 1 })];
    const epId = useEpisode ? episodeIds[faker.number.int({ min: 0, max: episodeCount - 1 })] : null;

    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const downloadedAt = chance(0.85) ? addMinutes(createdAt, faker.number.int({ min: 1, max: 10_000 })) : null;
    const expiresAt = downloadedAt && chance(0.2) ? addDays(downloadedAt, faker.number.int({ min: 3, max: 60 })) : null;
    writers.downloads.writeRow({
      profile_id: profileId,
      device_id: deviceId,
      title_id: titleId,
      episode_id: epId,
      download_status: pick(DOWNLOAD_STATUS),
      file_size_mb: round2(faker.number.float({ min: 50, max: 5000, fractionDigits: 2 })),
      downloaded_at: downloadedAt ? iso(downloadedAt) : null,
      expires_at: expiresAt ? iso(expiresAt) : null,
      created_at: iso(createdAt),
    });
    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated downloads: ${i.toLocaleString()} / ${CONFIG.downloads.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // RATINGS
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.ratings; i++) {
    const profileId = faker.number.int({ min: 1, max: profilesCount });
    const useEpisode = episodeCount > 0 && chance(0.4);
    const titleId = useEpisode ? null : faker.number.int({ min: 1, max: CONFIG.titles });
    const epId = useEpisode ? episodeIds[faker.number.int({ min: 0, max: episodeCount - 1 })] : null;
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.ratings.writeRow({
      profile_id: profileId,
      title_id: titleId,
      episode_id: epId,
      rating_value: faker.number.int({ min: 1, max: 5 }),
      rating_type: pick(RATING_TYPE),
      review_text: chance(0.35) ? faker.lorem.sentences({ min: 1, max: 2 }) : null,
      created_at: iso(createdAt),
    });
    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated ratings: ${i.toLocaleString()} / ${CONFIG.ratings.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // APP EVENTS
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.appEvents; i++) {
    const profileId = faker.number.int({ min: 1, max: profilesCount });
    const userId = profileUserId[profileId];
    const dId = userPrimaryDeviceId[userId] || null;
    const useEpisode = episodeCount > 0 && chance(0.25);
    const titleId = useEpisode ? null : chance(0.35) ? faker.number.int({ min: 1, max: CONFIG.titles }) : null;
    const epId = useEpisode ? episodeIds[faker.number.int({ min: 0, max: episodeCount - 1 })] : null;
    const t = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.app_events.writeRow({
      profile_id: profileId,
      device_id: dId,
      event_name: pick(["open_app", "view_home", "browse", "open_title", "play", "pause", "search", "add_watchlist", "remove_watchlist"]),
      screen_name: pick(["home", "search", "title", "player", "settings", "downloads", "watchlist"]),
      title_id: titleId,
      episode_id: epId,
      source_channel: pick(["push", "email", "organic", "deeplink", "ads"]),
      country: pick(COUNTRIES),
      event_time: iso(t),
      metadata: JSON.stringify({ a: faker.number.int({ min: 1, max: 20 }) }),
    });
    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated app_events: ${i.toLocaleString()} / ${CONFIG.appEvents.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // SEARCH QUERIES
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.searchQueries; i++) {
    const profileId = faker.number.int({ min: 1, max: profilesCount });
    const userId = profileUserId[profileId];
    const dId = userPrimaryDeviceId[userId] || null;
    const clickedTitle = chance(0.45) ? faker.number.int({ min: 1, max: CONFIG.titles }) : null;
    const t = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.search_queries.writeRow({
      profile_id: profileId,
      device_id: dId,
      query_text: faker.lorem.words({ min: 1, max: 4 }).slice(0, 255),
      result_count: faker.number.int({ min: 0, max: 150 }),
      clicked_title_id: clickedTitle,
      search_time: iso(t),
    });
    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated search_queries: ${i.toLocaleString()} / ${CONFIG.searchQueries.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // RECOMMENDATION ROWS
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.recommendationRows; i++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    writers.recommendation_rows.writeRow({
      row_name: `Row ${i}: ${faker.word.adjective()} ${faker.word.noun()}`.slice(0, 100),
      row_type: pick(ROW_TYPE),
      is_active: chance(0.9),
      created_at: iso(createdAt),
    });
  }

  // ---------------------------------------------------
  // EXPERIMENTS + VARIANTS + ASSIGNMENTS
  // ---------------------------------------------------
  let experimentId = 0;
  let variantId = 0;
  let assignmentId = 0;
  const variantIdsByExperiment = new Map();

  for (let i = 1; i <= CONFIG.experiments; i++) {
    experimentId++;
    const startsAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const endsAt = chance(0.6) ? addDays(startsAt, faker.number.int({ min: 7, max: 120 })) : null;
    const status = chance(0.55) ? "running" : pick(EXPERIMENT_STATUS);
    writers.experiments.writeRow({
      experiment_name: `EXP_${String(experimentId).padStart(4, "0")}_${faker.word.noun()}`.slice(0, 100),
      experiment_type: pick(EXPERIMENT_TYPE),
      status,
      starts_at: iso(startsAt),
      ends_at: endsAt ? iso(endsAt) : null,
      created_at: iso(startsAt),
    });

    const vCount = faker.number.int({
      min: CONFIG.variantsPerExperimentMin,
      max: CONFIG.variantsPerExperimentMax,
    });
    const ids = [];
    for (let v = 0; v < vCount; v++) {
      variantId++;
      ids.push(variantId);
      writers.experiment_variants.writeRow({
        experiment_id: experimentId,
        variant_name: v === 0 ? "control" : `variant_${v}`,
        traffic_percentage: round2(v === 0 ? 50 : Math.max(5, 50 / (vCount - 1))),
        is_control: v === 0,
        created_at: iso(startsAt),
      });
    }
    variantIdsByExperiment.set(experimentId, ids);
  }

  // Assignments: distribute roughly evenly across experiments; enforce unique (experiment_id, profile_id)
  const perExperiment = Math.floor(CONFIG.experimentAssignmentsTotal / CONFIG.experiments);
  for (let expId = 1; expId <= CONFIG.experiments; expId++) {
    const want = expId === CONFIG.experiments
      ? CONFIG.experimentAssignmentsTotal - perExperiment * (CONFIG.experiments - 1)
      : perExperiment;
    const usedProfiles = new Set();
    const variantIds = variantIdsByExperiment.get(expId);
    while (usedProfiles.size < want) {
      const pId = faker.number.int({ min: 1, max: profilesCount });
      if (usedProfiles.has(pId)) continue;
      usedProfiles.add(pId);
      assignmentId++;
      writers.experiment_assignments.writeRow({
        experiment_id: expId,
        variant_id: pick(variantIds),
        profile_id: pId,
        assigned_at: iso(randomDateBetween(CONFIG.startDate, CONFIG.endDate)),
      });
    }
    console.log(`Generated experiment_assignments for experiment ${expId}: ${want.toLocaleString()}`);
  }

  // ---------------------------------------------------
  // RECOMMENDATION IMPRESSIONS + CLICKS
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.recommendationImpressions; i++) {
    const profileId = faker.number.int({ min: 1, max: profilesCount });
    const rowId = faker.number.int({ min: 1, max: CONFIG.recommendationRows });
    const titleId = faker.number.int({ min: 1, max: CONFIG.titles });
    const servedAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const expAssignmentId = chance(0.2) ? faker.number.int({ min: 1, max: assignmentId }) : null;
    writers.recommendation_impressions.writeRow({
      profile_id: profileId,
      row_id: rowId,
      title_id: titleId,
      rank_position: faker.number.int({ min: 1, max: 20 }),
      served_at: iso(servedAt),
      algorithm_version: `v${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 12 })}`,
      experiment_assignment_id: expAssignmentId,
    });

    if (chance(CONFIG.recommendationClicksRate)) {
      writers.recommendation_clicks.writeRow({
        impression_id: i,
        clicked_at: iso(addMinutes(servedAt, faker.number.int({ min: 0, max: 1200 }))),
      });
    }

    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated recommendation_impressions: ${i.toLocaleString()} / ${CONFIG.recommendationImpressions.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // NOTIFICATION CAMPAIGNS + DELIVERIES
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.notificationCampaigns; i++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const scheduledAt = chance(0.7) ? addMinutes(createdAt, faker.number.int({ min: 10, max: 200_000 })) : null;
    const sentAt = scheduledAt && chance(0.75) ? addMinutes(scheduledAt, faker.number.int({ min: 1, max: 5000 })) : null;
    const status = sentAt ? "sent" : scheduledAt ? "scheduled" : "draft";
    writers.notification_campaigns.writeRow({
      campaign_name: `Campaign ${i}: ${faker.word.adjective()} ${faker.word.noun()}`.slice(0, 100),
      campaign_type: pick(CAMPAIGN_TYPE),
      target_audience: pick(["all_users", "subscribers", "trial_users", "churn_risk", "new_users"]),
      scheduled_at: scheduledAt ? iso(scheduledAt) : null,
      sent_at: sentAt ? iso(sentAt) : null,
      status,
      created_at: iso(createdAt),
    });
  }

  for (let i = 1; i <= CONFIG.notificationDeliveries; i++) {
    const campaignId = faker.number.int({ min: 1, max: CONFIG.notificationCampaigns });
    const userId = faker.number.int({ min: 1, max: CONFIG.users });
    const profileId = chance(0.75) ? userPrimaryProfileId[userId] : null;
    const titleId = chance(0.25) ? faker.number.int({ min: 1, max: CONFIG.titles }) : null;
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const deliveredAt = chance(0.85) ? addMinutes(createdAt, faker.number.int({ min: 1, max: 1200 })) : null;
    const openedAt = deliveredAt && chance(0.35) ? addMinutes(deliveredAt, faker.number.int({ min: 1, max: 8000 })) : null;
    const clickedAt = openedAt && chance(0.2) ? addMinutes(openedAt, faker.number.int({ min: 1, max: 8000 })) : null;
    writers.notification_deliveries.writeRow({
      campaign_id: campaignId,
      user_id: userId,
      profile_id: profileId,
      title_id: titleId,
      delivery_status: clickedAt ? "clicked" : openedAt ? "opened" : deliveredAt ? "delivered" : pick(DELIVERY_STATUS),
      delivered_at: deliveredAt ? iso(deliveredAt) : null,
      opened_at: openedAt ? iso(openedAt) : null,
      clicked_at: clickedAt ? iso(clickedAt) : null,
      created_at: iso(createdAt),
    });
    if (i % CONFIG.logEvery === 0) {
      console.log(`Generated notification_deliveries: ${i.toLocaleString()} / ${CONFIG.notificationDeliveries.toLocaleString()}`);
    }
  }

  // ---------------------------------------------------
  // SUPPORT TICKETS
  // ---------------------------------------------------
  for (let i = 1; i <= CONFIG.supportTickets; i++) {
    const createdAt = randomDateBetween(CONFIG.startDate, CONFIG.endDate);
    const userId = chance(0.85) ? faker.number.int({ min: 1, max: CONFIG.users }) : null;
    const profileId = userId && chance(0.7) ? userPrimaryProfileId[userId] : null;
    const deviceId = userId && chance(0.6) ? userPrimaryDeviceId[userId] : null;
    const titleId = chance(0.35) ? faker.number.int({ min: 1, max: CONFIG.titles }) : null;
    const status = chance(0.6) ? "resolved" : pick(TICKET_STATUS);
    const resolvedAt = status === "resolved" ? addMinutes(createdAt, faker.number.int({ min: 5, max: 30_000 })) : null;
    writers.support_tickets.writeRow({
      user_id: userId,
      profile_id: profileId,
      device_id: deviceId,
      title_id: titleId,
      issue_type: pick(ISSUE_TYPE),
      ticket_status: status,
      priority: pick(PRIORITY),
      resolution_time_mins: resolvedAt ? faker.number.int({ min: 5, max: 30_000 }) : null,
      created_at: iso(createdAt),
      resolved_at: resolvedAt ? iso(resolvedAt) : null,
    });
  }

  await Promise.all(Object.values(writers).map((w) => w.close()));

  console.log(`✅ Movies seed CSVs written to ${OUTPUT_DIR}`);
  console.log(`- users: ${CONFIG.users.toLocaleString()}`);
  console.log(`- profiles: ${profilesCount.toLocaleString()}`);
  console.log(`- devices: ${deviceId.toLocaleString()}`);
  console.log(`- titles: ${CONFIG.titles.toLocaleString()} (series=${seriesTitleIds.length.toLocaleString()}, episodes=${episodeId.toLocaleString()})`);
  console.log(`- viewing_sessions: ${CONFIG.viewingSessions.toLocaleString()}`);
  console.log(`- recommendation_impressions: ${CONFIG.recommendationImpressions.toLocaleString()}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
