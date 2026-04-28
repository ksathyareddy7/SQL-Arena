// ./social/generateData.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

faker.seed(20260332);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

// Scale
const TOTAL_USERS = 50_000;
const TOTAL_POSTS = 500_000;
const TOTAL_COMMENTS = 1_000_000;
const TOTAL_LIKES = 2_000_000;
const TOTAL_FOLLOWS = 500_000;
const TOTAL_HASHTAGS = 500;
const TOTAL_BOOKMARKS = 500_000;
const TOTAL_NOTIFICATIONS = 500_000;
const TOTAL_STORIES = 100_000;
const TOTAL_STORY_VIEWS = 600_000;
const TOTAL_POST_VIEWS = 1_000_000;
const TOTAL_POST_SHARES = 200_000;
const TOTAL_MESSAGES = 300_000;
const TOTAL_GROUPS = 5_000;
const TOTAL_GROUP_MEMBERS = 120_000;
const TOTAL_GROUP_POSTS = 50_000;
const TOTAL_REPORTS = 50_000;
const TOTAL_POST_MENTIONS = 80_000;
const TOTAL_COMMENT_MENTIONS = 40_000;
const TOTAL_USER_BLOCKS = 30_000;
const TOTAL_USER_DEVICES = TOTAL_USERS; // 1 per user
const TOTAL_LOGIN_HISTORY = 200_000;
const TOTAL_AD_CAMPAIGNS = 10_000;
const TOTAL_PROMOTED_POSTS = 50_000;

const START_DATE = new Date("2022-01-01T00:00:00.000Z");
const END_DATE = new Date("2026-03-26T23:59:59.999Z");

// -----------------------------
// Helpers
// -----------------------------
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const randomDateBetween = (from = START_DATE, to = END_DATE) =>
  faker.date.between({ from, to });

const toIso = (date) => new Date(date).toISOString();

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const writeRow = (stream, values) => {
  stream.write(values.map(csvEscape).join(",") + "\n");
};

const writeHeader = (stream, headers) => {
  stream.write(headers.join(",") + "\n");
};

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

const randomInt = (min, max) => faker.number.int({ min, max });

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const sampleUniqueInts = (count, min, max, exclude = null) => {
  const out = new Set();
  const span = max - min + 1;
  const target = Math.min(count, span - (exclude !== null ? 1 : 0));

  while (out.size < target) {
    const n = randomInt(min, max);
    if (exclude !== null && n === exclude) continue;
    out.add(n);
  }

  return [...out];
};

const buildCounts = (total, buckets, minPerBucket, maxPerBucket) => {
  const counts = new Array(buckets).fill(minPerBucket);
  let remaining = total - buckets * minPerBucket;

  if (remaining < 0) {
    throw new Error("Total is too small for requested minimum allocation.");
  }

  for (let i = 0; i < buckets && remaining > 0; i++) {
    const room = maxPerBucket - counts[i];
    if (room <= 0) continue;
    const add = Math.min(remaining, randomInt(0, room));
    counts[i] += add;
    remaining -= add;
  }

  while (remaining > 0) {
    const i = randomInt(0, buckets - 1);
    if (counts[i] < maxPerBucket) {
      counts[i]++;
      remaining--;
    }
  }

  return counts;
};

// -----------------------------
// Streams
// -----------------------------
ensureDir(OUTPUT_DIR);

const usersStream = fs.createWriteStream(path.join(OUTPUT_DIR, "users.csv"));
const postsStream = fs.createWriteStream(path.join(OUTPUT_DIR, "posts.csv"));
const commentsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "comments.csv"),
);
const likesStream = fs.createWriteStream(path.join(OUTPUT_DIR, "likes.csv"));
const followsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "follows.csv"),
);
const hashtagsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "hashtags.csv"),
);
const postHashtagsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "post_hashtags.csv"),
);
const bookmarksStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "bookmarks.csv"),
);
const notificationsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "notifications.csv"),
);
const storiesStream = fs.createWriteStream(path.join(OUTPUT_DIR, "stories.csv"));
const storyViewsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "story_views.csv"),
);
const postViewsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "post_views.csv"),
);
const postSharesStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "post_shares.csv"),
);
const messagesStream = fs.createWriteStream(path.join(OUTPUT_DIR, "messages.csv"));
const groupsStream = fs.createWriteStream(path.join(OUTPUT_DIR, "groups.csv"));
const groupMembersStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "group_members.csv"),
);
const groupPostsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "group_posts.csv"),
);
const reportsStream = fs.createWriteStream(path.join(OUTPUT_DIR, "reports.csv"));
const postMentionsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "post_mentions.csv"),
);
const commentMentionsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "comment_mentions.csv"),
);
const userBlocksStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "user_blocks.csv"),
);
const userDevicesStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "user_devices.csv"),
);
const loginHistoryStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "login_history.csv"),
);
const adCampaignsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "ad_campaigns.csv"),
);
const promotedPostsStream = fs.createWriteStream(
  path.join(OUTPUT_DIR, "promoted_posts.csv"),
);

writeHeader(usersStream, [
  "username",
  "email",
  "password_hash",
  "full_name",
  "bio",
  "profile_picture_url",
  "is_verified",
  "created_at",
]);

writeHeader(postsStream, [
  "user_id",
  "content",
  "media_url",
  "media_type",
  "location",
  "created_at",
  "updated_at",
]);

writeHeader(commentsStream, [
  "post_id",
  "user_id",
  "parent_comment_id",
  "comment_text",
  "created_at",
]);

writeHeader(likesStream, ["user_id", "post_id", "created_at"]);
writeHeader(followsStream, ["follower_id", "followee_id", "created_at"]);
writeHeader(hashtagsStream, ["tag_name", "created_at"]);
writeHeader(postHashtagsStream, ["post_id", "hashtag_id"]);
writeHeader(bookmarksStream, ["user_id", "post_id", "created_at"]);
writeHeader(notificationsStream, [
  "user_id",
  "actor_id",
  "notification_type",
  "entity_id",
  "is_read",
  "created_at",
]);
writeHeader(storiesStream, [
  "user_id",
  "media_url",
  "media_type",
  "created_at",
  "expires_at",
]);
writeHeader(storyViewsStream, ["story_id", "viewer_id", "viewed_at"]);
writeHeader(postViewsStream, [
  "post_id",
  "user_id",
  "viewed_at",
  "watch_seconds",
  "device_type",
]);
writeHeader(postSharesStream, ["post_id", "user_id", "share_type", "created_at"]);
writeHeader(messagesStream, [
  "sender_id",
  "receiver_id",
  "message_text",
  "message_type",
  "sent_at",
  "read_at",
]);
writeHeader(groupsStream, ["name", "creator_id", "privacy", "created_at"]);
writeHeader(groupMembersStream, ["group_id", "user_id", "role", "joined_at"]);
writeHeader(groupPostsStream, ["group_id", "post_id", "added_at"]);
writeHeader(reportsStream, [
  "reporter_id",
  "reported_user_id",
  "post_id",
  "comment_id",
  "reason",
  "status",
  "created_at",
  "resolved_at",
]);
writeHeader(postMentionsStream, ["post_id", "mentioned_user_id"]);
writeHeader(commentMentionsStream, ["comment_id", "mentioned_user_id"]);
writeHeader(userBlocksStream, ["blocker_id", "blocked_id", "created_at"]);
writeHeader(userDevicesStream, [
  "user_id",
  "device_type",
  "os_name",
  "app_version",
  "last_active_at",
]);
writeHeader(loginHistoryStream, [
  "user_id",
  "login_at",
  "ip_address",
  "device_type",
  "success",
]);
writeHeader(adCampaignsStream, [
  "advertiser_user_id",
  "campaign_name",
  "budget",
  "start_date",
  "end_date",
  "status",
]);
writeHeader(promotedPostsStream, [
  "campaign_id",
  "post_id",
  "spend",
  "impressions",
  "clicks",
  "conversions",
]);

// -----------------------------
// In-memory metadata
// -----------------------------
const userCreatedAt = new Array(TOTAL_USERS + 1);
const postOwner = new Array(TOTAL_POSTS + 1);
const postCreatedAt = new Array(TOTAL_POSTS + 1);
const storyOwner = new Array(TOTAL_STORIES + 1);
const storyCreatedAt = new Array(TOTAL_STORIES + 1);
const storyExpiresAt = new Array(TOTAL_STORIES + 1);
const groupCreator = new Array(TOTAL_GROUPS + 1);
const groupCreatedAt = new Array(TOTAL_GROUPS + 1);

// Keep only a few recent comment IDs per post so replies are valid and same-post
const recentCommentIdsByPost = new Map();

// -----------------------------
// USERS
// -----------------------------
console.log("Generating users...");
for (let i = 1; i <= TOTAL_USERS; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `user_${String(i).padStart(6, "0")}`;
  const email = `user_${String(i).padStart(6, "0")}@example.com`;
  const createdAt = randomDateBetween();

  userCreatedAt[i] = createdAt;

  writeRow(usersStream, [
    username,
    email,
    faker.string.alphanumeric(32),
    faker.person.fullName({ firstName, lastName }),
    faker.lorem.sentence(),
    faker.image.avatar(),
    faker.datatype.boolean({ probability: 0.1 }),
    toIso(createdAt),
  ]);
}

// -----------------------------
// POSTS
// -----------------------------
console.log("Generating posts...");
for (let postId = 1; postId <= TOTAL_POSTS; postId++) {
  const userId = randomInt(1, TOTAL_USERS);
  const mediaType = weightedChoice([
    { value: "none", weight: 55 },
    { value: "image", weight: 35 },
    { value: "video", weight: 10 },
  ]);

  const createdAt = randomDateBetween(userCreatedAt[userId], END_DATE);
  const updatedAt =
    Math.random() < 0.7 ? randomDateBetween(createdAt, END_DATE) : "";

  postOwner[postId] = userId;
  postCreatedAt[postId] = createdAt;

  writeRow(postsStream, [
    userId,
    faker.lorem.paragraph(),
    mediaType === "none" ? "" : faker.image.url(),
    mediaType,
    faker.location.city(),
    toIso(createdAt),
    updatedAt ? toIso(updatedAt) : "",
  ]);
}

// -----------------------------
// COMMENTS
// -----------------------------
console.log("Generating comments...");
let commentId = 1;

// Distribute comments across posts with small local counts to keep reply logic sane
const commentsPerPost = buildCounts(TOTAL_COMMENTS, TOTAL_POSTS, 0, 8);

for (let postId = 1; postId <= TOTAL_POSTS; postId++) {
  const count = commentsPerPost[postId - 1];
  if (count === 0) continue;

  const recent = [];

  for (let i = 0; i < count; i++) {
    const userId = randomInt(1, TOTAL_USERS);
    const isReply = recent.length > 0 && Math.random() < 0.28;
    const parentCommentId = isReply
      ? recent[randomInt(0, recent.length - 1)]
      : "";

    const createdAt = randomDateBetween(postCreatedAt[postId], END_DATE);

    writeRow(commentsStream, [
      postId,
      userId,
      parentCommentId,
      faker.lorem.sentence(),
      toIso(createdAt),
    ]);

    recent.push(commentId);
    if (recent.length > 8) recent.shift();

    commentId++;
  }

  recentCommentIdsByPost.set(postId, recent);
}

// -----------------------------
// LIKES
// -----------------------------
console.log("Generating likes...");
const likesPerPost = buildCounts(TOTAL_LIKES, TOTAL_POSTS, 0, 12);

for (let postId = 1; postId <= TOTAL_POSTS; postId++) {
  const count = likesPerPost[postId - 1];
  if (count === 0) continue;

  const users = sampleUniqueInts(count, 1, TOTAL_USERS);

  for (const userId of users) {
    const createdAt = randomDateBetween(postCreatedAt[postId], END_DATE);
    writeRow(likesStream, [userId, postId, toIso(createdAt)]);
  }
}

// -----------------------------
// FOLLOWS
// -----------------------------
console.log("Generating follows...");
const followsPerUser = buildCounts(TOTAL_FOLLOWS, TOTAL_USERS, 0, 30);

for (let followerId = 1; followerId <= TOTAL_USERS; followerId++) {
  const count = followsPerUser[followerId - 1];
  if (count === 0) continue;

  const followees = sampleUniqueInts(count, 1, TOTAL_USERS, followerId);
  const minFrom = userCreatedAt[followerId];

  for (const followeeId of followees) {
    const createdAt = randomDateBetween(minFrom, END_DATE);
    writeRow(followsStream, [followerId, followeeId, toIso(createdAt)]);
  }
}

// -----------------------------
// HASHTAGS
// -----------------------------
console.log("Generating hashtags...");
for (let hashtagId = 1; hashtagId <= TOTAL_HASHTAGS; hashtagId++) {
  writeRow(hashtagsStream, [`tag${hashtagId}`, toIso(randomDateBetween())]);
}

// -----------------------------
// POST_HASHTAGS
// -----------------------------
console.log("Generating post_hashtags...");
for (let postId = 1; postId <= TOTAL_POSTS; postId++) {
  const count = randomInt(0, 5);
  if (count === 0) continue;

  const hashtagIds = sampleUniqueInts(count, 1, TOTAL_HASHTAGS);
  for (const hashtagId of hashtagIds) {
    writeRow(postHashtagsStream, [postId, hashtagId]);
  }
}

// -----------------------------
// BOOKMARKS
// -----------------------------
console.log("Generating bookmarks...");
const bookmarksPerUser = buildCounts(TOTAL_BOOKMARKS, TOTAL_USERS, 0, 25);

for (let userId = 1; userId <= TOTAL_USERS; userId++) {
  const count = bookmarksPerUser[userId - 1];
  if (count === 0) continue;

  const posts = sampleUniqueInts(count, 1, TOTAL_POSTS);
  const minFrom = userCreatedAt[userId];

  for (const postId of posts) {
    const createdAt = randomDateBetween(
      new Date(Math.max(minFrom.getTime(), postCreatedAt[postId].getTime())),
      END_DATE,
    );
    writeRow(bookmarksStream, [userId, postId, toIso(createdAt)]);
  }
}

// -----------------------------
// NOTIFICATIONS
// -----------------------------
console.log("Generating notifications...");
const notificationTypes = ["like", "comment", "follow"];

for (let i = 1; i <= TOTAL_NOTIFICATIONS; i++) {
  const notificationType = faker.helpers.arrayElement(notificationTypes);
  let userId;
  let actorId;
  let entityId;
  let createdAt;

  if (notificationType === "follow") {
    userId = randomInt(1, TOTAL_USERS);
    actorId = randomInt(1, TOTAL_USERS);
    while (actorId === userId) {
      actorId = randomInt(1, TOTAL_USERS);
    }
    entityId = actorId; // generic entity_id, semantically tied to actor for follow
    createdAt = randomDateBetween(userCreatedAt[userId], END_DATE);
  } else {
    const postId = randomInt(1, TOTAL_POSTS);
    userId = postOwner[postId];
    actorId = randomInt(1, TOTAL_USERS);
    while (actorId === userId) {
      actorId = randomInt(1, TOTAL_USERS);
    }
    entityId = postId;
    createdAt = randomDateBetween(postCreatedAt[postId], END_DATE);
  }

  writeRow(notificationsStream, [
    userId,
    actorId,
    notificationType,
    entityId,
    faker.datatype.boolean(),
    toIso(createdAt),
  ]);
}

// -----------------------------
// STORIES
// -----------------------------
console.log("Generating stories...");
for (let storyId = 1; storyId <= TOTAL_STORIES; storyId++) {
  const userId = randomInt(1, TOTAL_USERS);
  const createdAt = randomDateBetween(userCreatedAt[userId], END_DATE);
  const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
  const mediaType = weightedChoice([
    { value: "image", weight: 80 },
    { value: "video", weight: 20 },
  ]);

  storyOwner[storyId] = userId;
  storyCreatedAt[storyId] = createdAt;
  storyExpiresAt[storyId] = expiresAt;

  writeRow(storiesStream, [
    userId,
    faker.image.url(),
    mediaType,
    toIso(createdAt),
    toIso(expiresAt),
  ]);
}

// -----------------------------
// STORY_VIEWS
// -----------------------------
console.log("Generating story_views...");
// `story_views` has a composite PK (story_id, viewer_id), so enforce uniqueness
// per story by sampling unique viewers.
const viewsPerStory = buildCounts(TOTAL_STORY_VIEWS, TOTAL_STORIES, 0, 20);
for (let storyId = 1; storyId <= TOTAL_STORIES; storyId++) {
  const count = viewsPerStory[storyId - 1];
  if (count === 0) continue;

  const ownerId = storyOwner[storyId];
  const viewers = sampleUniqueInts(count, 1, TOTAL_USERS, ownerId);
  for (const viewerId of viewers) {
    const viewedAt = randomDateBetween(
      storyCreatedAt[storyId],
      storyExpiresAt[storyId],
    );
    writeRow(storyViewsStream, [storyId, viewerId, toIso(viewedAt)]);
  }
}

// -----------------------------
// POST_VIEWS
// -----------------------------
console.log("Generating post_views...");
const deviceTypes = ["ios", "android", "web"];
for (let i = 0; i < TOTAL_POST_VIEWS; i++) {
  const postId = randomInt(1, TOTAL_POSTS);
  const maybeUserId = Math.random() < 0.92 ? String(randomInt(1, TOTAL_USERS)) : "";
  const viewedAt = randomDateBetween(postCreatedAt[postId], END_DATE);
  const watchSeconds = randomInt(1, 180);
  const deviceType = faker.helpers.arrayElement(deviceTypes);

  writeRow(postViewsStream, [
    postId,
    maybeUserId,
    toIso(viewedAt),
    watchSeconds,
    deviceType,
  ]);
}

// -----------------------------
// POST_SHARES
// -----------------------------
console.log("Generating post_shares...");
const shareTypes = ["repost", "dm", "external"];
for (let i = 0; i < TOTAL_POST_SHARES; i++) {
  const postId = randomInt(1, TOTAL_POSTS);
  const userId = randomInt(1, TOTAL_USERS);
  const shareType = faker.helpers.arrayElement(shareTypes);
  const createdAt = randomDateBetween(postCreatedAt[postId], END_DATE);
  writeRow(postSharesStream, [postId, userId, shareType, toIso(createdAt)]);
}

// -----------------------------
// MESSAGES
// -----------------------------
console.log("Generating messages...");
const messageTypes = ["text", "image", "video", "audio"];
for (let i = 0; i < TOTAL_MESSAGES; i++) {
  let senderId = randomInt(1, TOTAL_USERS);
  let receiverId = randomInt(1, TOTAL_USERS);
  while (receiverId === senderId) receiverId = randomInt(1, TOTAL_USERS);

  const sentAt = randomDateBetween(
    new Date(Math.max(userCreatedAt[senderId].getTime(), userCreatedAt[receiverId].getTime())),
    END_DATE,
  );
  const msgType = weightedChoice([
    { value: "text", weight: 85 },
    { value: "image", weight: 7 },
    { value: "video", weight: 5 },
    { value: "audio", weight: 3 },
  ]);

  const messageText = msgType === "text" ? faker.lorem.sentence() : "";
  const readAt =
    Math.random() < 0.65 ? randomDateBetween(sentAt, END_DATE) : "";

  writeRow(messagesStream, [
    senderId,
    receiverId,
    messageText,
    msgType,
    toIso(sentAt),
    readAt ? toIso(readAt) : "",
  ]);
}

// -----------------------------
// GROUPS
// -----------------------------
console.log("Generating groups...");
for (let groupId = 1; groupId <= TOTAL_GROUPS; groupId++) {
  const creatorId = randomInt(1, TOTAL_USERS);
  const createdAt = randomDateBetween(userCreatedAt[creatorId], END_DATE);
  const privacy = weightedChoice([
    { value: "public", weight: 85 },
    { value: "private", weight: 15 },
  ]);

  groupCreator[groupId] = creatorId;
  groupCreatedAt[groupId] = createdAt;

  writeRow(groupsStream, [
    `${faker.word.adjective()} ${faker.word.noun()} ${groupId}`.slice(0, 100),
    creatorId,
    privacy,
    toIso(createdAt),
  ]);
}

// -----------------------------
// GROUP_MEMBERS
// -----------------------------
console.log("Generating group_members...");
const membersPerGroup = buildCounts(
  TOTAL_GROUP_MEMBERS,
  TOTAL_GROUPS,
  5,
  30,
);

for (let groupId = 1; groupId <= TOTAL_GROUPS; groupId++) {
  const creatorId = groupCreator[groupId];
  const createdAt = groupCreatedAt[groupId];
  const count = membersPerGroup[groupId - 1];

  const users = sampleUniqueInts(count, 1, TOTAL_USERS);
  if (!users.includes(creatorId)) users[0] = creatorId;

  for (const userId of users) {
    const role =
      userId === creatorId
        ? "admin"
        : weightedChoice([
            { value: "member", weight: 95 },
            { value: "moderator", weight: 5 },
          ]);

    const joinedAt = randomDateBetween(
      new Date(Math.max(createdAt.getTime(), userCreatedAt[userId].getTime())),
      END_DATE,
    );
    writeRow(groupMembersStream, [groupId, userId, role, toIso(joinedAt)]);
  }
}

// -----------------------------
// GROUP_POSTS
// -----------------------------
console.log("Generating group_posts...");
const groupPostPairs = new Set();
while (groupPostPairs.size < TOTAL_GROUP_POSTS) {
  const groupId = randomInt(1, TOTAL_GROUPS);
  const postId = randomInt(1, TOTAL_POSTS);
  const key = `${groupId}:${postId}`;
  if (groupPostPairs.has(key)) continue;
  groupPostPairs.add(key);

  const from = new Date(
    Math.max(groupCreatedAt[groupId].getTime(), postCreatedAt[postId].getTime()),
  );
  const addedAt = randomDateBetween(from, END_DATE);
  writeRow(groupPostsStream, [groupId, postId, toIso(addedAt)]);
}

// -----------------------------
// USER_BLOCKS
// -----------------------------
console.log("Generating user_blocks...");
const blockPairs = new Set();
while (blockPairs.size < TOTAL_USER_BLOCKS) {
  const blockerId = randomInt(1, TOTAL_USERS);
  const blockedId = randomInt(1, TOTAL_USERS);
  if (blockerId === blockedId) continue;
  const key = `${blockerId}:${blockedId}`;
  if (blockPairs.has(key)) continue;
  blockPairs.add(key);

  const createdAt = randomDateBetween(
    new Date(Math.max(userCreatedAt[blockerId].getTime(), userCreatedAt[blockedId].getTime())),
    END_DATE,
  );
  writeRow(userBlocksStream, [blockerId, blockedId, toIso(createdAt)]);
}

// -----------------------------
// USER_DEVICES
// -----------------------------
console.log("Generating user_devices...");
const osNames = ["iOS", "Android", "macOS", "Windows", "Linux"];
for (let i = 1; i <= TOTAL_USER_DEVICES; i++) {
  const userId = i; // 1 per user
  const lastActiveAt = randomDateBetween(userCreatedAt[userId], END_DATE);
  writeRow(userDevicesStream, [
    userId,
    faker.helpers.arrayElement(deviceTypes),
    faker.helpers.arrayElement(osNames),
    `${randomInt(1, 5)}.${randomInt(0, 20)}.${randomInt(0, 10)}`,
    toIso(lastActiveAt),
  ]);
}

// -----------------------------
// LOGIN_HISTORY
// -----------------------------
console.log("Generating login_history...");
for (let i = 0; i < TOTAL_LOGIN_HISTORY; i++) {
  const userId = randomInt(1, TOTAL_USERS);
  const loginAt = randomDateBetween(userCreatedAt[userId], END_DATE);
  writeRow(loginHistoryStream, [
    userId,
    toIso(loginAt),
    faker.internet.ip(),
    faker.helpers.arrayElement(deviceTypes),
    faker.datatype.boolean({ probability: 0.9 }),
  ]);
}

// -----------------------------
// REPORTS
// -----------------------------
console.log("Generating reports...");
const reportStatuses = [
  { value: "open", weight: 70 },
  { value: "reviewed", weight: 10 },
  { value: "resolved", weight: 15 },
  { value: "dismissed", weight: 5 },
];
for (let i = 0; i < TOTAL_REPORTS; i++) {
  const reporterId = randomInt(1, TOTAL_USERS);
  let reportedUserId = "";
  let postId = "";
  let commentIdForReport = "";

  const target = weightedChoice([
    { value: "user", weight: 35 },
    { value: "post", weight: 45 },
    { value: "comment", weight: 20 },
  ]);

  if (target === "user") {
    const u = randomInt(1, TOTAL_USERS);
    reportedUserId = u === reporterId ? "" : String(u);
  } else if (target === "post") {
    postId = String(randomInt(1, TOTAL_POSTS));
  } else {
    commentIdForReport = String(randomInt(1, TOTAL_COMMENTS));
  }

  // Ensure at least one target
  if (!reportedUserId && !postId && !commentIdForReport) {
    postId = String(randomInt(1, TOTAL_POSTS));
  }

  const createdAt = randomDateBetween(userCreatedAt[reporterId], END_DATE);
  const status = weightedChoice(reportStatuses);
  const resolvedAt =
    status === "resolved" || status === "dismissed"
      ? randomDateBetween(createdAt, END_DATE)
      : "";

  writeRow(reportsStream, [
    reporterId,
    reportedUserId,
    postId,
    commentIdForReport,
    faker.helpers.arrayElement(["spam", "harassment", "scam", "hate", "other"]),
    status,
    toIso(createdAt),
    resolvedAt ? toIso(resolvedAt) : "",
  ]);
}

// -----------------------------
// POST_MENTIONS
// -----------------------------
console.log("Generating post_mentions...");
const postMentionPairs = new Set();
while (postMentionPairs.size < TOTAL_POST_MENTIONS) {
  const postId = randomInt(1, TOTAL_POSTS);
  const mentionedUserId = randomInt(1, TOTAL_USERS);
  if (mentionedUserId === postOwner[postId]) continue;
  const key = `${postId}:${mentionedUserId}`;
  if (postMentionPairs.has(key)) continue;
  postMentionPairs.add(key);
  writeRow(postMentionsStream, [postId, mentionedUserId]);
}

// -----------------------------
// COMMENT_MENTIONS
// -----------------------------
console.log("Generating comment_mentions...");
const commentMentionPairs = new Set();
while (commentMentionPairs.size < TOTAL_COMMENT_MENTIONS) {
  const commentIdForMention = randomInt(1, TOTAL_COMMENTS);
  const mentionedUserId = randomInt(1, TOTAL_USERS);
  const key = `${commentIdForMention}:${mentionedUserId}`;
  if (commentMentionPairs.has(key)) continue;
  commentMentionPairs.add(key);
  writeRow(commentMentionsStream, [commentIdForMention, mentionedUserId]);
}

// -----------------------------
// AD_CAMPAIGNS
// -----------------------------
console.log("Generating ad_campaigns...");
const CAMPAIGN_START_FROM = new Date("2023-01-01T00:00:00.000Z");
const CAMPAIGN_START_TO = new Date("2026-03-01T00:00:00.000Z");
const campaignStatus = [
  { value: "draft", weight: 20 },
  { value: "active", weight: 45 },
  { value: "paused", weight: 15 },
  { value: "completed", weight: 20 },
];

for (let campaignId = 1; campaignId <= TOTAL_AD_CAMPAIGNS; campaignId++) {
  const advertiserId = randomInt(1, TOTAL_USERS);
  const start = faker.date.between({ from: CAMPAIGN_START_FROM, to: CAMPAIGN_START_TO });
  const end = new Date(start.getTime() + randomInt(7, 60) * 24 * 60 * 60 * 1000);
  writeRow(adCampaignsStream, [
    advertiserId,
    `${faker.company.buzzAdjective()} ${faker.company.buzzNoun()} ${campaignId}`.slice(0, 100),
    faker.finance.amount({ min: 50, max: 25000, dec: 2 }),
    start.toISOString().slice(0, 10),
    end.toISOString().slice(0, 10),
    weightedChoice(campaignStatus),
  ]);
}

// -----------------------------
// PROMOTED_POSTS
// -----------------------------
console.log("Generating promoted_posts...");
const promotedPairs = new Set();
while (promotedPairs.size < TOTAL_PROMOTED_POSTS) {
  const campaignId = randomInt(1, TOTAL_AD_CAMPAIGNS);
  const postId = randomInt(1, TOTAL_POSTS);
  const key = `${campaignId}:${postId}`;
  if (promotedPairs.has(key)) continue;
  promotedPairs.add(key);

  const impressions = randomInt(100, 50000);
  const clicks = randomInt(0, Math.min(impressions, 5000));
  const conversions = randomInt(0, Math.min(clicks, 500));
  writeRow(promotedPostsStream, [
    campaignId,
    postId,
    faker.finance.amount({ min: 0, max: 5000, dec: 2 }),
    impressions,
    clicks,
    conversions,
  ]);
}

// -----------------------------
// Close streams
// -----------------------------
await Promise.all([
  new Promise((resolve) => usersStream.end(resolve)),
  new Promise((resolve) => postsStream.end(resolve)),
  new Promise((resolve) => commentsStream.end(resolve)),
  new Promise((resolve) => likesStream.end(resolve)),
  new Promise((resolve) => followsStream.end(resolve)),
  new Promise((resolve) => hashtagsStream.end(resolve)),
  new Promise((resolve) => postHashtagsStream.end(resolve)),
  new Promise((resolve) => bookmarksStream.end(resolve)),
  new Promise((resolve) => notificationsStream.end(resolve)),
  new Promise((resolve) => storiesStream.end(resolve)),
  new Promise((resolve) => storyViewsStream.end(resolve)),
  new Promise((resolve) => postViewsStream.end(resolve)),
  new Promise((resolve) => postSharesStream.end(resolve)),
  new Promise((resolve) => messagesStream.end(resolve)),
  new Promise((resolve) => groupsStream.end(resolve)),
  new Promise((resolve) => groupMembersStream.end(resolve)),
  new Promise((resolve) => groupPostsStream.end(resolve)),
  new Promise((resolve) => reportsStream.end(resolve)),
  new Promise((resolve) => postMentionsStream.end(resolve)),
  new Promise((resolve) => commentMentionsStream.end(resolve)),
  new Promise((resolve) => userBlocksStream.end(resolve)),
  new Promise((resolve) => userDevicesStream.end(resolve)),
  new Promise((resolve) => loginHistoryStream.end(resolve)),
  new Promise((resolve) => adCampaignsStream.end(resolve)),
  new Promise((resolve) => promotedPostsStream.end(resolve)),
]);

console.log("✅ All clean CSV files generated in ./seedData");
console.log(`
users: ${TOTAL_USERS}
posts: ${TOTAL_POSTS}
comments: ${TOTAL_COMMENTS}
likes: ${TOTAL_LIKES}
follows: ${TOTAL_FOLLOWS}
hashtags: ${TOTAL_HASHTAGS}
bookmarks: ${TOTAL_BOOKMARKS}
notifications: ${TOTAL_NOTIFICATIONS}
stories: ${TOTAL_STORIES}
story_views: ${TOTAL_STORY_VIEWS} (approx; may be less due to owner skip)
post_views: ${TOTAL_POST_VIEWS}
post_shares: ${TOTAL_POST_SHARES}
messages: ${TOTAL_MESSAGES}
groups: ${TOTAL_GROUPS}
group_members: ${TOTAL_GROUP_MEMBERS}
group_posts: ${TOTAL_GROUP_POSTS}
reports: ${TOTAL_REPORTS}
post_mentions: ${TOTAL_POST_MENTIONS}
comment_mentions: ${TOTAL_COMMENT_MENTIONS}
user_blocks: ${TOTAL_USER_BLOCKS}
user_devices: ${TOTAL_USER_DEVICES}
login_history: ${TOTAL_LOGIN_HISTORY}
ad_campaigns: ${TOTAL_AD_CAMPAIGNS}
promoted_posts: ${TOTAL_PROMOTED_POSTS}
`);
