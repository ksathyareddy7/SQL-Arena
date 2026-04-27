import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { faker } from "@faker-js/faker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faker.seed(20260414);

const OUTPUT_DIR = path.join(__dirname, "..", "seedData");

const CONFIG = {
  users: 5_000,
  workspaces: 120,
  userDevices: 6_500,
  workspaceMembers: 25_000,

  rolesPerWorkspace: 5,
  rolePermissionsMin: 8,
  rolePermissionsMax: 12,

  channels: 1_000,
  channelMembers: 40_000,

  conversations: 2_500,
  conversationMembers: 10_000,

  messages: 200_000,
  messageAttachments: 10_000,
  messageReactions: 60_000,
  messageMentions: 15_000,
  messageReads: 120_000,
  messagePins: 2_000,
  savedMessages: 10_000,

  userPresenceLogs: 40_000,

  calls: 3_500,
  callParticipants: 12_000,

  invites: 6_000,
  notificationPreferences: 20_000,
  notifications: 40_000,
  moderationActions: 2_500,
  appEvents: 80_000,
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

function pad(n, width) {
  return String(n).padStart(width, "0");
}

function iso(ts) {
  if (!ts) return "";
  // Postgres-friendly UTC timestamp string: `YYYY-MM-DD HH:MM:SS`
  return new Date(ts)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "")
    .replace(/\.\d{3}$/, "");
}

function randomDateTimeBetween(start, end) {
  return faker.date.between({ from: start ?? DATE_RANGE.start, to: end ?? DATE_RANGE.end });
}

function pickUniqueFrom(arr, count) {
  if (count <= 0) return [];
  const shuffled = faker.helpers.shuffle(arr.slice());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function safeSlug(s) {
  return s
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "")
    .slice(0, 120);
}

async function main() {
  rmDir(OUTPUT_DIR);
  ensureDir(OUTPUT_DIR);

  const deviceTypes = ["web", "desktop", "mobile", "tablet"];
  const deviceOs = ["macOS", "Windows", "Linux", "iOS", "Android"];
  const workspaceTypes = ["company", "community", "support", "gaming", "education", "internal"];
  const planTypes = ["free", "pro", "business", "enterprise"];

  const memberTypes = ["owner", "admin", "member", "guest", "bot"];
  const membershipStatuses = ["invited", "active", "suspended", "left", "removed"];

  const roleNames = ["Owner", "Admin", "Member", "Guest", "Bot"];
  const roleScopeValues = ["workspace", "channel", "moderation"];
  const permissionCatalog = [
    "workspace.manage",
    "workspace.invite",
    "workspace.billing.view",
    "workspace.billing.manage",
    "channel.create",
    "channel.archive",
    "channel.manage",
    "message.delete",
    "message.edit",
    "message.pin",
    "message.react",
    "message.read",
    "moderation.warn",
    "moderation.mute",
    "moderation.ban",
    "calls.start",
    "calls.record",
    "admin.audit.view",
  ];

  const channelTypes = ["standard", "announcement", "support", "forum", "voice", "category"];
  const visibilityValues = ["public", "private", "restricted"];

  const joinedViaValues = ["self", "invite", "auto_join", "admin", "sync"];
  const notificationLevels = ["all", "mentions_only", "none"];

  const conversationTypes = ["direct", "group_dm"];

  const messageTypes = ["text", "system", "file", "image", "call_event", "poll"];
  const attachmentTypes = ["image", "video", "audio", "document", "archive", "link_preview", "other"];

  const presenceStatuses = ["online", "idle", "dnd", "offline"];

  const callTypes = ["voice", "video", "huddle", "screen_share"];

  const inviteTypes = ["workspace", "channel", "guest"];
  const inviteStatuses = ["pending", "accepted", "expired", "revoked", "declined"];

  const scopeTypes = ["workspace", "channel", "conversation"];

  const notifTypes = ["mention", "reply", "reaction", "invite", "system"];
  const deliveryChannels = ["in_app", "push", "email"];

  const modActionTypes = ["warn", "mute", "remove_message", "suspend", "ban"];
  const modActionStatuses = ["applied", "reverted", "expired"];

  const eventCategories = ["auth", "messaging", "membership", "notifications", "moderation", "calls", "search"];
  const eventNames = [
    "login",
    "logout",
    "message_sent",
    "message_edited",
    "message_deleted",
    "reaction_added",
    "channel_created",
    "member_invited",
    "call_started",
    "search",
  ];

  // ==================================================
  // 1) users
  // ==================================================
  const usersWriter = new CsvWriter(path.join(OUTPUT_DIR, "users.csv"), [
    "full_name",
    "username",
    "email",
    "phone",
    "country",
    "timezone",
    "job_title",
    "status_message",
    "is_bot",
    "is_active",
    "is_verified",
    "last_seen_at",
    "created_at",
  ]);

  const userCreatedAt = new Array(CONFIG.users + 1);
  const isBotUser = new Array(CONFIG.users + 1);
  const isActiveUser = new Array(CONFIG.users + 1);
  const timezones = ["Asia/Kolkata", "America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Australia/Sydney"];
  const countries = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany"];
  const jobTitles = ["Engineer", "Designer", "Manager", "Support", "Sales", "Founder", "Student", "Teacher"];

  for (let userId = 1; userId <= CONFIG.users; userId++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    userCreatedAt[userId] = createdAt;

    const isBot = chance(0.03);
    isBotUser[userId] = isBot;
    const isActive = chance(0.97);
    isActiveUser[userId] = isActive;

    const username = `u_${pad(userId, 6)}`;
    const email = `user${userId}@example.com`;
    const lastSeenAt = isActive && chance(0.75) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;

    usersWriter.writeRow([
      isBot ? `${faker.word.adjective()} Bot` : faker.person.fullName(),
      username,
      email,
      chance(0.6) ? `+1${randInt(2000000000, 9999999999)}`.slice(0, 20) : null,
      chance(0.75) ? pick(countries) : null,
      chance(0.85) ? pick(timezones) : null,
      isBot ? "Bot" : chance(0.7) ? pick(jobTitles) : null,
      chance(0.5) ? faker.lorem.sentence({ min: 2, max: 6 }) : null,
      isBot,
      isActive,
      isActive && chance(0.6),
      lastSeenAt ? iso(lastSeenAt) : null,
      iso(createdAt),
    ]);
  }
  await usersWriter.close();

  // ==================================================
  // 2) workspaces
  // ==================================================
  const workspacesWriter = new CsvWriter(path.join(OUTPUT_DIR, "workspaces.csv"), [
    "workspace_name",
    "workspace_slug",
    "workspace_type",
    "owner_user_id",
    "primary_domain",
    "plan_type",
    "member_limit",
    "storage_limit_gb",
    "is_active",
    "created_at",
  ]);

  const workspaceCreatedAt = new Array(CONFIG.workspaces + 1);
  const workspaceOwnerUserId = new Array(CONFIG.workspaces + 1);
  const workspaceIsActive = new Array(CONFIG.workspaces + 1);

  for (let workspaceId = 1; workspaceId <= CONFIG.workspaces; workspaceId++) {
    const createdAt = randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end);
    workspaceCreatedAt[workspaceId] = createdAt;
    const ownerUserId = randInt(1, CONFIG.users);
    workspaceOwnerUserId[workspaceId] = ownerUserId;
    const name = `${faker.company.name()} ${pick(["Workspace", "Community", "Support", "Team"])}`;
    const slug = `${safeSlug(name)}-${workspaceId}`;
    const plan = pick(planTypes);
    const isActive = chance(0.96);
    workspaceIsActive[workspaceId] = isActive;
    workspacesWriter.writeRow([
      name,
      slug.slice(0, 80),
      pick(workspaceTypes),
      ownerUserId,
      chance(0.5) ? `${slug}.example.com`.slice(0, 120) : null,
      plan,
      plan === "free" ? randInt(10, 200) : plan === "pro" ? randInt(100, 500) : randInt(300, 5000),
      plan === "free" ? randInt(5, 100) : plan === "pro" ? randInt(50, 500) : randInt(200, 5000),
      isActive,
      iso(createdAt),
    ]);
  }
  await workspacesWriter.close();

  // ==================================================
  // 3) user_devices
  // ==================================================
  const userDevicesWriter = new CsvWriter(path.join(OUTPUT_DIR, "user_devices.csv"), [
    "user_id",
    "device_type",
    "device_os",
    "app_version",
    "push_enabled",
    "last_active_at",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.userDevices; i++) {
    const userId = randInt(1, CONFIG.users);
    const createdAt = randomDateTimeBetween(userCreatedAt[userId], DATE_RANGE.end);
    const lastActiveAt = chance(0.8) ? randomDateTimeBetween(createdAt, DATE_RANGE.end) : null;
    userDevicesWriter.writeRow([
      userId,
      pick(deviceTypes),
      chance(0.85) ? pick(deviceOs) : null,
      chance(0.9) ? `v${randInt(1, 10)}.${randInt(0, 40)}.${randInt(0, 99)}` : null,
      chance(0.8),
      lastActiveAt ? iso(lastActiveAt) : null,
      iso(createdAt),
    ]);
  }
  await userDevicesWriter.close();

  // ==================================================
  // 4) workspace_members
  // ==================================================
  const workspaceMembersWriter = new CsvWriter(path.join(OUTPUT_DIR, "workspace_members.csv"), [
    "workspace_id",
    "user_id",
    "member_type",
    "display_name",
    "joined_at",
    "invited_by_user_id",
    "membership_status",
    "is_guest",
    "is_deactivated",
    "last_read_all_at",
    "created_at",
  ]);

  const workspaceMemberInfo = [null]; // index = workspace_member_id
  const workspaceMemberCreatedAt = [null];
  const membersByWorkspace = Array.from({ length: CONFIG.workspaces + 1 }, () => []);
  const workspaceUserToMemberId = new Map(); // `${workspaceId}:${userId}` -> memberId

  let workspaceMemberId = 0;

  // Ensure 1 owner membership per workspace that matches workspaces.owner_user_id.
  for (let workspaceId = 1; workspaceId <= CONFIG.workspaces; workspaceId++) {
    workspaceMemberId++;
    const userId = workspaceOwnerUserId[workspaceId];
    const joinedAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    workspaceMemberInfo[workspaceMemberId] = { workspaceId, userId };
    workspaceMemberCreatedAt[workspaceMemberId] = createdAt;
    membersByWorkspace[workspaceId].push(workspaceMemberId);
    workspaceUserToMemberId.set(`${workspaceId}:${userId}`, workspaceMemberId);
    workspaceMembersWriter.writeRow([
      workspaceId,
      userId,
      "owner",
      chance(0.5) ? `Owner ${workspaceId}` : null,
      iso(joinedAt),
      null,
      "active",
      false,
      false,
      chance(0.6) ? iso(randomDateTimeBetween(joinedAt, DATE_RANGE.end)) : null,
      iso(createdAt),
    ]);
  }

  // Fill remaining members with uniqueness (workspace_id,user_id).
  while (workspaceMemberId < CONFIG.workspaceMembers) {
    const workspaceId = randInt(1, CONFIG.workspaces);
    const userId = randInt(1, CONFIG.users);
    const key = `${workspaceId}:${userId}`;
    if (workspaceUserToMemberId.has(key)) continue;
    workspaceMemberId++;

    const type = isBotUser[userId] ? "bot" : chance(0.08) ? "guest" : chance(0.08) ? "admin" : "member";
    const status = chance(0.92) ? "active" : pick(membershipStatuses);
    const joinedAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const isGuest = type === "guest" || chance(0.03);
    const isDeactivated = status !== "active" && chance(0.2);

    workspaceMemberInfo[workspaceMemberId] = { workspaceId, userId };
    workspaceMemberCreatedAt[workspaceMemberId] = createdAt;
    membersByWorkspace[workspaceId].push(workspaceMemberId);
    workspaceUserToMemberId.set(key, workspaceMemberId);

    const invitedBy =
      chance(0.35) && membersByWorkspace[workspaceId].length > 1
        ? workspaceMemberInfo[pick(membersByWorkspace[workspaceId])].userId
        : null;

    const lastReadAllAt = status === "active" && chance(0.35) ? iso(randomDateTimeBetween(joinedAt, DATE_RANGE.end)) : null;

    workspaceMembersWriter.writeRow([
      workspaceId,
      userId,
      type,
      chance(0.65) ? faker.person.firstName() : null,
      iso(joinedAt),
      invitedBy,
      status,
      isGuest,
      isDeactivated,
      lastReadAllAt,
      iso(createdAt),
    ]);
  }
  await workspaceMembersWriter.close();

  // ==================================================
  // 5) roles
  // ==================================================
  const rolesWriter = new CsvWriter(path.join(OUTPUT_DIR, "roles.csv"), [
    "workspace_id",
    "role_name",
    "role_scope",
    "is_system_role",
    "priority_rank",
    "created_at",
  ]);

  const roleIdByWorkspaceAndName = new Map(); // `${workspaceId}:${roleName}` -> roleId
  let roleId = 0;
  for (let workspaceId = 1; workspaceId <= CONFIG.workspaces; workspaceId++) {
    for (let i = 0; i < CONFIG.rolesPerWorkspace; i++) {
      roleId++;
      const roleName = roleNames[i];
      roleIdByWorkspaceAndName.set(`${workspaceId}:${roleName}`, roleId);
      rolesWriter.writeRow([
        workspaceId,
        roleName,
        roleName === "Bot" ? "workspace" : pick(roleScopeValues),
        true,
        (CONFIG.rolesPerWorkspace - i) * 10,
        iso(randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end)),
      ]);
    }
  }
  await rolesWriter.close();

  // ==================================================
  // 6) role_permissions
  // ==================================================
  const rolePermissionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "role_permissions.csv"), [
    "role_id",
    "permission_code",
    "permission_group",
    "is_allowed",
    "created_at",
  ]);

  for (let r = 1; r <= roleId; r++) {
    const permsCount = randInt(CONFIG.rolePermissionsMin, CONFIG.rolePermissionsMax);
    const perms = pickUniqueFrom(permissionCatalog, permsCount);
    for (const p of perms) {
      rolePermissionsWriter.writeRow([
        r,
        p,
        p.split(".")[0],
        true,
        iso(randomDateTimeBetween(DATE_RANGE.start, DATE_RANGE.end)),
      ]);
    }
  }
  await rolePermissionsWriter.close();

  // ==================================================
  // 7) member_roles
  // ==================================================
  const memberRolesWriter = new CsvWriter(path.join(OUTPUT_DIR, "member_roles.csv"), [
    "workspace_member_id",
    "role_id",
    "assigned_by_user_id",
    "assigned_at",
  ]);

  const memberRolePairs = new Set();
  for (let memberId = 1; memberId <= workspaceMemberId; memberId++) {
    const { workspaceId } = workspaceMemberInfo[memberId];
    const memberType = (() => {
      // We didn't store member_type in memory. Derive from a small heuristic:
      // - workspace owner membership ids are 1..workspaces.
      if (memberId <= CONFIG.workspaces) return "owner";
      return "member";
    })();
    const roleName =
      memberId <= CONFIG.workspaces
        ? "Owner"
        : chance(0.03)
          ? "Admin"
          : chance(0.05)
            ? "Guest"
            : chance(0.03)
              ? "Bot"
              : "Member";
    const roleIdPick = roleIdByWorkspaceAndName.get(`${workspaceId}:${roleName}`) ?? roleIdByWorkspaceAndName.get(`${workspaceId}:Member`);
    const key = `${memberId}:${roleIdPick}`;
    if (!memberRolePairs.has(key)) {
      memberRolePairs.add(key);
      const assignedAt = randomDateTimeBetween(workspaceMemberCreatedAt[memberId], DATE_RANGE.end);
      memberRolesWriter.writeRow([
        memberId,
        roleIdPick,
        chance(0.5) ? workspaceOwnerUserId[workspaceId] : null,
        iso(assignedAt),
      ]);
    }
  }

  // Add some extra role assignments to simulate multi-role members.
  let extraAssigned = 0;
  while (extraAssigned < Math.floor(CONFIG.workspaceMembers * 0.05)) {
    const memberIdPick = randInt(1, workspaceMemberId);
    const { workspaceId } = workspaceMemberInfo[memberIdPick];
    const roleName = chance(0.5) ? "Admin" : "Member";
    const roleIdPick = roleIdByWorkspaceAndName.get(`${workspaceId}:${roleName}`);
    const key = `${memberIdPick}:${roleIdPick}`;
    if (memberRolePairs.has(key)) continue;
    memberRolePairs.add(key);
    extraAssigned++;
    memberRolesWriter.writeRow([
      memberIdPick,
      roleIdPick,
      workspaceOwnerUserId[workspaceId],
      iso(randomDateTimeBetween(workspaceMemberCreatedAt[memberIdPick], DATE_RANGE.end)),
    ]);
  }
  await memberRolesWriter.close();

  // ==================================================
  // 8) channels
  // ==================================================
  const channelsWriter = new CsvWriter(path.join(OUTPUT_DIR, "channels.csv"), [
    "workspace_id",
    "created_by_member_id",
    "channel_name",
    "channel_slug",
    "channel_type",
    "visibility",
    "topic",
    "purpose",
    "parent_channel_id",
    "slow_mode_seconds",
    "is_archived",
    "archived_at",
    "created_at",
  ]);

  const channelsByWorkspace = Array.from({ length: CONFIG.workspaces + 1 }, () => []);
  const channelWorkspaceId = new Array(CONFIG.channels + 1);
  const channelCreatedAt = new Array(CONFIG.channels + 1);
  const channelParentId = new Array(CONFIG.channels + 1);

  const usedChannelNamesByWorkspace = new Map(); // workspaceId -> Set(channel_name)

  let channelId = 0;

  // Create 1–2 category channels per workspace early so parent_channel_id can reference earlier rows.
  for (let workspaceId = 1; workspaceId <= CONFIG.workspaces; workspaceId++) {
    const count = chance(0.6) ? 2 : 1;
    for (let c = 0; c < count; c++) {
      if (channelId >= CONFIG.channels) break;
      channelId++;
      const name = `Category ${c + 1}`;
      if (!usedChannelNamesByWorkspace.has(workspaceId)) usedChannelNamesByWorkspace.set(workspaceId, new Set());
      usedChannelNamesByWorkspace.get(workspaceId).add(name);
      const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
      channelWorkspaceId[channelId] = workspaceId;
      channelCreatedAt[channelId] = createdAt;
      channelParentId[channelId] = null;
      channelsByWorkspace[workspaceId].push(channelId);
      channelsWriter.writeRow([
        workspaceId,
        pick(membersByWorkspace[workspaceId]),
        name,
        safeSlug(name).slice(0, 120),
        "category",
        "public",
        null,
        null,
        null,
        0,
        false,
        null,
        iso(createdAt),
      ]);
    }
  }

  const baseChannelNames = [
    "general",
    "random",
    "announcements",
    "support",
    "engineering",
    "design",
    "sales",
    "marketing",
    "product",
    "help",
    "gaming",
    "music",
    "memes",
    "ops",
    "infra",
    "security",
  ];

  while (channelId < CONFIG.channels) {
    const workspaceId = randInt(1, CONFIG.workspaces);
    if (!usedChannelNamesByWorkspace.has(workspaceId)) usedChannelNamesByWorkspace.set(workspaceId, new Set());
    const usedNames = usedChannelNamesByWorkspace.get(workspaceId);
    const candidateBase = pick(baseChannelNames);
    const name = usedNames.has(candidateBase) ? `${candidateBase}-${randInt(2, 999)}` : candidateBase;
    if (usedNames.has(name)) continue;
    usedNames.add(name);
    channelId++;
    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    channelWorkspaceId[channelId] = workspaceId;
    channelCreatedAt[channelId] = createdAt;
    const parentCandidates = channelsByWorkspace[workspaceId].filter((id) => id < channelId && channelParentId[id] === null);
    const parentIdPick = parentCandidates.length && chance(0.5) ? pick(parentCandidates) : null;
    channelParentId[channelId] = parentIdPick;
    channelsByWorkspace[workspaceId].push(channelId);

    const type = chance(0.1) ? "announcement" : chance(0.1) ? "support" : chance(0.08) ? "forum" : "standard";
    const visibility = chance(0.75) ? "public" : chance(0.6) ? "private" : "restricted";
    const slowMode = chance(0.12) ? pick([5, 10, 30, 60, 120]) : 0;
    const isArchived = chance(0.05);
    const archivedAt = isArchived ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;

    channelsWriter.writeRow([
      workspaceId,
      chance(0.9) ? pick(membersByWorkspace[workspaceId]) : null,
      name,
      safeSlug(name).slice(0, 120),
      type,
      visibility,
      chance(0.4) ? faker.lorem.sentence({ min: 3, max: 8 }) : null,
      chance(0.25) ? faker.lorem.sentence({ min: 3, max: 10 }) : null,
      parentIdPick,
      slowMode,
      isArchived,
      archivedAt,
      iso(createdAt),
    ]);
  }
  await channelsWriter.close();

  // ==================================================
  // 9) channel_members
  // ==================================================
  const channelMembersWriter = new CsvWriter(path.join(OUTPUT_DIR, "channel_members.csv"), [
    "channel_id",
    "workspace_member_id",
    "joined_at",
    "joined_via",
    "notification_level",
    "last_read_message_id",
    "last_read_at",
    "is_muted",
    "is_pinned_channel",
    "created_at",
  ]);

  const channelMemberPairs = new Set();
  const channelMembersByChannel = Array.from({ length: CONFIG.channels + 1 }, () => []);

  let writtenChannelMembers = 0;
  while (writtenChannelMembers < CONFIG.channelMembers) {
    const channelIdPick = randInt(1, CONFIG.channels);
    const workspaceId = channelWorkspaceId[channelIdPick];
    const memberCandidates = membersByWorkspace[workspaceId];
    if (!memberCandidates.length) continue;
    const memberIdPick = pick(memberCandidates);
    const key = `${channelIdPick}:${memberIdPick}`;
    if (channelMemberPairs.has(key)) continue;
    channelMemberPairs.add(key);
    writtenChannelMembers++;
    channelMembersByChannel[channelIdPick].push(memberIdPick);

    const joinedAt = randomDateTimeBetween(channelCreatedAt[channelIdPick], DATE_RANGE.end);
    channelMembersWriter.writeRow([
      channelIdPick,
      memberIdPick,
      iso(joinedAt),
      chance(0.7) ? pick(joinedViaValues) : null,
      pick(notificationLevels),
      null, // seeded before messages; keep NULL to avoid FK issues
      null,
      chance(0.08),
      chance(0.06),
      iso(randomDateTimeBetween(joinedAt, DATE_RANGE.end)),
    ]);
  }
  await channelMembersWriter.close();

  // ==================================================
  // 10) conversations
  // ==================================================
  const conversationsWriter = new CsvWriter(path.join(OUTPUT_DIR, "conversations.csv"), [
    "workspace_id",
    "conversation_type",
    "created_by_member_id",
    "conversation_title",
    "is_archived",
    "created_at",
  ]);

  const conversationWorkspaceId = new Array(CONFIG.conversations + 1);
  const conversationType = new Array(CONFIG.conversations + 1);
  const conversationCreatedAt = new Array(CONFIG.conversations + 1);
  const conversationsByWorkspace = Array.from({ length: CONFIG.workspaces + 1 }, () => []);

  for (let conversationId = 1; conversationId <= CONFIG.conversations; conversationId++) {
    const workspaceId = randInt(1, CONFIG.workspaces);
    conversationWorkspaceId[conversationId] = workspaceId;
    conversationsByWorkspace[workspaceId].push(conversationId);
    const type = chance(0.7) ? "direct" : "group_dm";
    conversationType[conversationId] = type;
    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    conversationCreatedAt[conversationId] = createdAt;
    conversationsWriter.writeRow([
      workspaceId,
      type,
      chance(0.9) ? pick(membersByWorkspace[workspaceId]) : null,
      type === "group_dm" && chance(0.7) ? faker.lorem.words({ min: 2, max: 5 }) : null,
      chance(0.05),
      iso(createdAt),
    ]);
  }
  await conversationsWriter.close();

  // ==================================================
  // 11) conversation_members
  // ==================================================
  const conversationMembersWriter = new CsvWriter(path.join(OUTPUT_DIR, "conversation_members.csv"), [
    "conversation_id",
    "workspace_member_id",
    "joined_at",
    "last_read_message_id",
    "last_read_at",
    "is_muted",
    "created_at",
  ]);

  const conversationMembersByConversation = Array.from({ length: CONFIG.conversations + 1 }, () => []);
  const conversationMemberPairs = new Set();

  let writtenConversationMembers = 0;

  // First, satisfy direct conversations (always 2 members).
  for (let conversationId = 1; conversationId <= CONFIG.conversations; conversationId++) {
    if (conversationType[conversationId] !== "direct") continue;
    const workspaceId = conversationWorkspaceId[conversationId];
    const memberCandidates = membersByWorkspace[workspaceId];
    if (memberCandidates.length < 2) continue;
    const pair = pickUniqueFrom(memberCandidates, 2);
    for (const memberIdPick of pair) {
      const key = `${conversationId}:${memberIdPick}`;
      if (conversationMemberPairs.has(key)) continue;
      conversationMemberPairs.add(key);
      writtenConversationMembers++;
      conversationMembersByConversation[conversationId].push(memberIdPick);
      const joinedAt = randomDateTimeBetween(conversationCreatedAt[conversationId], DATE_RANGE.end);
      conversationMembersWriter.writeRow([
        conversationId,
        memberIdPick,
        iso(joinedAt),
        null, // seeded before messages; keep NULL
        null,
        chance(0.08),
        iso(randomDateTimeBetween(joinedAt, DATE_RANGE.end)),
      ]);
    }
  }

  // Then fill up to target count with group DMs (3-8 members) and extra memberships.
  while (writtenConversationMembers < CONFIG.conversationMembers) {
    const conversationId = randInt(1, CONFIG.conversations);
    const workspaceId = conversationWorkspaceId[conversationId];
    const memberCandidates = membersByWorkspace[workspaceId];
    if (!memberCandidates.length) continue;

    const membersNeeded = conversationType[conversationId] === "group_dm" ? randInt(3, 8) : 2;
    const pickedMembers = pickUniqueFrom(memberCandidates, Math.min(membersNeeded, memberCandidates.length));
    for (const memberIdPick of pickedMembers) {
      if (writtenConversationMembers >= CONFIG.conversationMembers) break;
      const key = `${conversationId}:${memberIdPick}`;
      if (conversationMemberPairs.has(key)) continue;
      conversationMemberPairs.add(key);
      writtenConversationMembers++;
      conversationMembersByConversation[conversationId].push(memberIdPick);
      const joinedAt = randomDateTimeBetween(conversationCreatedAt[conversationId], DATE_RANGE.end);
      conversationMembersWriter.writeRow([
        conversationId,
        memberIdPick,
        iso(joinedAt),
        null,
        null,
        chance(0.08),
        iso(randomDateTimeBetween(joinedAt, DATE_RANGE.end)),
      ]);
    }
  }
  await conversationMembersWriter.close();

  // ==================================================
  // 12) messages
  // ==================================================
  const messagesWriter = new CsvWriter(path.join(OUTPUT_DIR, "messages.csv"), [
    "workspace_id",
    "sender_member_id",
    "channel_id",
    "conversation_id",
    "parent_message_id",
    "thread_root_message_id",
    "message_type",
    "message_body",
    "contains_link",
    "contains_code_block",
    "reply_count",
    "reaction_count",
    "attachment_count",
    "is_edited",
    "edited_at",
    "is_deleted",
    "deleted_at",
    "sent_at",
    "created_at",
  ]);

  const messageMeta = [null]; // index -> {workspaceId, channelId, conversationId, senderMemberId, sentAt, createdAt}
  const threadRootByMessageId = [null];

  const messagesInChannel = new Map(); // channelId -> last N message IDs
  const messagesInConversation = new Map(); // conversationId -> last N message IDs

  function pushRecent(map, key, messageId) {
    const arr = map.get(key) ?? [];
    arr.push(messageId);
    if (arr.length > 60) arr.shift();
    map.set(key, arr);
  }

  for (let messageId = 1; messageId <= CONFIG.messages; messageId++) {
    const useChannel = chance(0.7);

    let workspaceId;
    let channelIdVal = null;
    let conversationIdVal = null;
    let senderMemberId = null;

    if (useChannel) {
      channelIdVal = randInt(1, CONFIG.channels);
      workspaceId = channelWorkspaceId[channelIdVal];
      const memberCandidates = channelMembersByChannel[channelIdVal];
      senderMemberId = memberCandidates.length ? pick(memberCandidates) : pick(membersByWorkspace[workspaceId]);
    } else {
      conversationIdVal = randInt(1, CONFIG.conversations);
      workspaceId = conversationWorkspaceId[conversationIdVal];
      const memberCandidates = conversationMembersByConversation[conversationIdVal];
      senderMemberId = memberCandidates.length ? pick(memberCandidates) : pick(membersByWorkspace[workspaceId]);
    }

    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const sentAt = createdAt;

    // Replies / threading.
    let parentMessageId = null;
    let threadRootMessageId = null;
    const recentList = channelIdVal
      ? messagesInChannel.get(channelIdVal) ?? []
      : messagesInConversation.get(conversationIdVal) ?? [];
    const canReply = recentList.length > 0;
    if (canReply && chance(0.22)) {
      parentMessageId = pick(recentList);
      threadRootMessageId = threadRootByMessageId[parentMessageId] ?? parentMessageId;
    }

    const body = chance(0.08)
      ? `Check this: ${faker.internet.url()}`
      : chance(0.06)
        ? `\`\`\`\n${faker.lorem.lines({ min: 2, max: 6 })}\n\`\`\``
        : faker.lorem.sentence({ min: 3, max: 16 });

    const containsLink = body.includes("http://") || body.includes("https://");
    const containsCode = body.includes("```");

    const isDeleted = chance(0.04);
    const deletedAt = isDeleted ? iso(randomDateTimeBetween(sentAt, DATE_RANGE.end)) : null;
    const isEdited = !isDeleted && chance(0.08);
    const editedAt = isEdited ? iso(randomDateTimeBetween(sentAt, DATE_RANGE.end)) : null;

    messageMeta[messageId] = {
      workspaceId,
      channelId: channelIdVal,
      conversationId: conversationIdVal,
      senderMemberId,
      sentAt,
      createdAt,
    };
    threadRootByMessageId[messageId] = threadRootMessageId ?? messageId;

    messagesWriter.writeRow([
      workspaceId,
      senderMemberId,
      channelIdVal,
      conversationIdVal,
      parentMessageId,
      threadRootMessageId,
      pick(messageTypes),
      body,
      containsLink,
      containsCode,
      0,
      0,
      0,
      isEdited,
      editedAt,
      isDeleted,
      deletedAt,
      iso(sentAt),
      iso(createdAt),
    ]);

    if (channelIdVal) pushRecent(messagesInChannel, channelIdVal, messageId);
    else pushRecent(messagesInConversation, conversationIdVal, messageId);
  }
  await messagesWriter.close();

  // ==================================================
  // 13) message_attachments
  // ==================================================
  const messageAttachmentsWriter = new CsvWriter(path.join(OUTPUT_DIR, "message_attachments.csv"), [
    "message_id",
    "uploaded_by_member_id",
    "attachment_type",
    "file_name",
    "file_extension",
    "file_size_kb",
    "mime_type",
    "storage_provider",
    "is_inline",
    "created_at",
  ]);

  const extByType = {
    image: ["png", "jpg", "jpeg", "gif"],
    video: ["mp4", "mov", "mkv"],
    audio: ["mp3", "wav"],
    document: ["pdf", "docx", "pptx"],
    archive: ["zip", "tar"],
    link_preview: ["html"],
    other: ["bin"],
  };

  for (let i = 1; i <= CONFIG.messageAttachments; i++) {
    const messageId = randInt(1, CONFIG.messages);
    const meta = messageMeta[messageId];
    const type = pick(attachmentTypes);
    const ext = pick(extByType[type] ?? ["bin"]);
    const createdAt = randomDateTimeBetween(meta.createdAt, DATE_RANGE.end);
    messageAttachmentsWriter.writeRow([
      messageId,
      chance(0.9) ? meta.senderMemberId : null,
      type,
      `${faker.system.commonFileName(ext)}`.slice(0, 255),
      ext,
      randInt(1, 10_000_000),
      chance(0.8) ? faker.system.mimeType() : null,
      chance(0.8) ? pick(["s3", "gcs", "local", "azure"]) : null,
      chance(0.25),
      iso(createdAt),
    ]);
  }
  await messageAttachmentsWriter.close();

  // ==================================================
  // 14) message_reactions
  // ==================================================
  const messageReactionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "message_reactions.csv"), [
    "message_id",
    "workspace_member_id",
    "emoji_code",
    "reacted_at",
  ]);

  const emojis = ["👍", "❤️", "😂", "🎉", "😮", "👀", "🙏", "🔥", "✅", "❌"];
  const reactionKeys = new Set();
  let writtenReactions = 0;
  while (writtenReactions < CONFIG.messageReactions) {
    const messageId = randInt(1, CONFIG.messages);
    const meta = messageMeta[messageId];
    const memberCandidates = membersByWorkspace[meta.workspaceId];
    if (!memberCandidates.length) continue;
    const memberIdPick = pick(memberCandidates);
    const emoji = pick(emojis);
    const key = `${messageId}:${memberIdPick}:${emoji}`;
    if (reactionKeys.has(key)) continue;
    reactionKeys.add(key);
    writtenReactions++;
    messageReactionsWriter.writeRow([
      messageId,
      memberIdPick,
      emoji,
      iso(randomDateTimeBetween(meta.sentAt, DATE_RANGE.end)),
    ]);
  }
  await messageReactionsWriter.close();

  // ==================================================
  // 15) message_mentions
  // ==================================================
  const messageMentionsWriter = new CsvWriter(path.join(OUTPUT_DIR, "message_mentions.csv"), [
    "message_id",
    "mentioned_member_id",
    "mention_type",
    "created_at",
  ]);

  const mentionTypes = ["user", "role", "channel", "everyone"];
  for (let i = 1; i <= CONFIG.messageMentions; i++) {
    const messageId = randInt(1, CONFIG.messages);
    const meta = messageMeta[messageId];
    const mentionType = pick(mentionTypes);
    const mentionedMemberId =
      mentionType === "user" ? pick(membersByWorkspace[meta.workspaceId]) : null;
    messageMentionsWriter.writeRow([
      messageId,
      mentionedMemberId,
      mentionType,
      iso(randomDateTimeBetween(meta.sentAt, DATE_RANGE.end)),
    ]);
  }
  await messageMentionsWriter.close();

  // ==================================================
  // 16) message_reads
  // ==================================================
  const messageReadsWriter = new CsvWriter(path.join(OUTPUT_DIR, "message_reads.csv"), [
    "message_id",
    "workspace_member_id",
    "read_at",
    "read_source",
  ]);

  const readSources = ["channel_view", "notification", "search", "jump_link"];
  const readKeys = new Set();
  let writtenReads = 0;
  while (writtenReads < CONFIG.messageReads) {
    const messageId = randInt(1, CONFIG.messages);
    const meta = messageMeta[messageId];
    const memberCandidates = membersByWorkspace[meta.workspaceId];
    if (!memberCandidates.length) continue;
    const memberIdPick = pick(memberCandidates);
    const key = `${messageId}:${memberIdPick}`;
    if (readKeys.has(key)) continue;
    readKeys.add(key);
    writtenReads++;
    messageReadsWriter.writeRow([
      messageId,
      memberIdPick,
      iso(randomDateTimeBetween(meta.sentAt, DATE_RANGE.end)),
      chance(0.8) ? pick(readSources) : null,
    ]);
  }
  await messageReadsWriter.close();

  // ==================================================
  // 17) message_pins
  // ==================================================
  const messagePinsWriter = new CsvWriter(path.join(OUTPUT_DIR, "message_pins.csv"), [
    "message_id",
    "pinned_by_member_id",
    "channel_id",
    "conversation_id",
    "pinned_at",
  ]);

  const pinnedMessageIds = new Set();
  let writtenPins = 0;
  while (writtenPins < CONFIG.messagePins) {
    const messageId = randInt(1, CONFIG.messages);
    if (pinnedMessageIds.has(messageId)) continue;
    const meta = messageMeta[messageId];
    pinnedMessageIds.add(messageId);
    writtenPins++;
    messagePinsWriter.writeRow([
      messageId,
      chance(0.85) ? meta.senderMemberId : pick(membersByWorkspace[meta.workspaceId]),
      meta.channelId,
      meta.conversationId,
      iso(randomDateTimeBetween(meta.sentAt, DATE_RANGE.end)),
    ]);
  }
  await messagePinsWriter.close();

  // ==================================================
  // 18) saved_messages
  // ==================================================
  const savedMessagesWriter = new CsvWriter(path.join(OUTPUT_DIR, "saved_messages.csv"), [
    "message_id",
    "workspace_member_id",
    "saved_at",
  ]);

  const savedKeys = new Set();
  let writtenSaved = 0;
  while (writtenSaved < CONFIG.savedMessages) {
    const messageId = randInt(1, CONFIG.messages);
    const meta = messageMeta[messageId];
    const memberCandidates = membersByWorkspace[meta.workspaceId];
    if (!memberCandidates.length) continue;
    const memberIdPick = pick(memberCandidates);
    const key = `${messageId}:${memberIdPick}`;
    if (savedKeys.has(key)) continue;
    savedKeys.add(key);
    writtenSaved++;
    savedMessagesWriter.writeRow([
      messageId,
      memberIdPick,
      iso(randomDateTimeBetween(meta.sentAt, DATE_RANGE.end)),
    ]);
  }
  await savedMessagesWriter.close();

  // ==================================================
  // 19) user_presence_logs
  // ==================================================
  const presenceWriter = new CsvWriter(path.join(OUTPUT_DIR, "user_presence_logs.csv"), [
    "workspace_member_id",
    "presence_status",
    "started_at",
    "ended_at",
    "source",
  ]);

  const presenceSources = ["web", "desktop", "mobile", "system"];
  for (let i = 1; i <= CONFIG.userPresenceLogs; i++) {
    const memberIdPick = randInt(1, workspaceMemberId);
    const { workspaceId } = workspaceMemberInfo[memberIdPick];
    const startedAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const endedAt = chance(0.75) ? randomDateTimeBetween(startedAt, DATE_RANGE.end) : null;
    presenceWriter.writeRow([
      memberIdPick,
      pick(presenceStatuses),
      iso(startedAt),
      endedAt ? iso(endedAt) : null,
      chance(0.85) ? pick(presenceSources) : null,
    ]);
  }
  await presenceWriter.close();

  // ==================================================
  // 20) calls
  // ==================================================
  const callsWriter = new CsvWriter(path.join(OUTPUT_DIR, "calls.csv"), [
    "workspace_id",
    "channel_id",
    "conversation_id",
    "started_by_member_id",
    "call_type",
    "started_at",
    "ended_at",
    "peak_participants",
    "recording_enabled",
    "created_at",
  ]);

  const callWorkspaceId = new Array(CONFIG.calls + 1);
  const callChannelId = new Array(CONFIG.calls + 1);
  const callConversationId = new Array(CONFIG.calls + 1);
  const callStartedAt = new Array(CONFIG.calls + 1);
  const callEndedAt = new Array(CONFIG.calls + 1);

  for (let callId = 1; callId <= CONFIG.calls; callId++) {
    const useChannel = chance(0.65);
    let workspaceId;
    let channelIdVal = null;
    let conversationIdVal = null;

    if (useChannel) {
      channelIdVal = randInt(1, CONFIG.channels);
      workspaceId = channelWorkspaceId[channelIdVal];
    } else {
      conversationIdVal = randInt(1, CONFIG.conversations);
      workspaceId = conversationWorkspaceId[conversationIdVal];
    }

    const startedAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const endedAt = chance(0.75) ? randomDateTimeBetween(startedAt, DATE_RANGE.end) : null;

    callWorkspaceId[callId] = workspaceId;
    callChannelId[callId] = channelIdVal;
    callConversationId[callId] = conversationIdVal;
    callStartedAt[callId] = startedAt;
    callEndedAt[callId] = endedAt;

    const starterCandidates = useChannel ? channelMembersByChannel[channelIdVal] : conversationMembersByConversation[conversationIdVal];
    const startedBy = starterCandidates.length ? pick(starterCandidates) : pick(membersByWorkspace[workspaceId]);

    callsWriter.writeRow([
      workspaceId,
      channelIdVal,
      conversationIdVal,
      startedBy,
      pick(callTypes),
      iso(startedAt),
      endedAt ? iso(endedAt) : null,
      randInt(0, 80),
      chance(0.1),
      iso(randomDateTimeBetween(startedAt, DATE_RANGE.end)),
    ]);
  }
  await callsWriter.close();

  // ==================================================
  // 21) call_participants
  // ==================================================
  const callParticipantsWriter = new CsvWriter(path.join(OUTPUT_DIR, "call_participants.csv"), [
    "call_id",
    "workspace_member_id",
    "joined_at",
    "left_at",
    "duration_seconds",
    "was_host",
  ]);

  let writtenCallParts = 0;
  while (writtenCallParts < CONFIG.callParticipants) {
    const callId = randInt(1, CONFIG.calls);
    const workspaceId = callWorkspaceId[callId];
    const channelIdVal = callChannelId[callId];
    const conversationIdVal = callConversationId[callId];
    const candidates = channelIdVal
      ? channelMembersByChannel[channelIdVal]
      : conversationIdVal
        ? conversationMembersByConversation[conversationIdVal]
        : membersByWorkspace[workspaceId];
    if (!candidates.length) continue;
    const memberIdPick = pick(candidates);
    const joinedAt = randomDateTimeBetween(callStartedAt[callId], callEndedAt[callId] ?? DATE_RANGE.end);
    const leftAt = callEndedAt[callId] && chance(0.8) ? randomDateTimeBetween(joinedAt, callEndedAt[callId]) : null;
    const durationSeconds = leftAt ? Math.max(0, Math.floor((new Date(leftAt) - new Date(joinedAt)) / 1000)) : null;
    callParticipantsWriter.writeRow([
      callId,
      memberIdPick,
      iso(joinedAt),
      leftAt ? iso(leftAt) : null,
      durationSeconds,
      chance(0.05),
    ]);
    writtenCallParts++;
  }
  await callParticipantsWriter.close();

  // ==================================================
  // 22) invites
  // ==================================================
  const invitesWriter = new CsvWriter(path.join(OUTPUT_DIR, "invites.csv"), [
    "workspace_id",
    "channel_id",
    "invited_email",
    "invited_user_id",
    "invited_by_member_id",
    "invite_type",
    "invite_status",
    "expires_at",
    "accepted_at",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.invites; i++) {
    const workspaceId = randInt(1, CONFIG.workspaces);
    const inviteType = pick(inviteTypes);
    const channelIdVal = inviteType === "channel" && channelsByWorkspace[workspaceId].length ? pick(channelsByWorkspace[workspaceId]) : null;
    const invitedUserId = chance(0.5) ? randInt(1, CONFIG.users) : null;
    const invitedEmail = invitedUserId ? null : `invite_${pad(i, 6)}@example.com`;
    const inviterMemberId = membersByWorkspace[workspaceId].length ? pick(membersByWorkspace[workspaceId]) : null;
    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const expiresAt = chance(0.7) ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;
    const status = pick(inviteStatuses);
    const acceptedAt = status === "accepted" ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;
    invitesWriter.writeRow([
      workspaceId,
      channelIdVal,
      invitedEmail,
      invitedUserId,
      inviterMemberId,
      inviteType,
      status,
      expiresAt,
      acceptedAt,
      iso(createdAt),
    ]);
  }
  await invitesWriter.close();

  // ==================================================
  // 23) notification_preferences
  // ==================================================
  const notifPrefsWriter = new CsvWriter(path.join(OUTPUT_DIR, "notification_preferences.csv"), [
    "workspace_member_id",
    "scope_type",
    "channel_id",
    "conversation_id",
    "notify_all_messages",
    "notify_mentions_only",
    "mobile_push_enabled",
    "email_notifications_enabled",
    "mute_until",
    "created_at",
  ]);

  // Always create workspace-level prefs for first N members.
  for (let i = 1; i <= CONFIG.notificationPreferences; i++) {
    const memberIdPick = i <= workspaceMemberId ? i : randInt(1, workspaceMemberId);
    const { workspaceId } = workspaceMemberInfo[memberIdPick];
    const createdAt = randomDateTimeBetween(workspaceMemberCreatedAt[memberIdPick] ?? workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    notifPrefsWriter.writeRow([
      memberIdPick,
      "workspace",
      null,
      null,
      chance(0.7),
      chance(0.35),
      chance(0.8),
      chance(0.25),
      chance(0.08) ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null,
      iso(createdAt),
    ]);
  }
  await notifPrefsWriter.close();

  // ==================================================
  // 24) notifications
  // ==================================================
  const notificationsWriter = new CsvWriter(path.join(OUTPUT_DIR, "notifications.csv"), [
    "workspace_member_id",
    "message_id",
    "notification_type",
    "delivery_channel",
    "is_read",
    "read_at",
    "created_at",
  ]);

  for (let i = 1; i <= CONFIG.notifications; i++) {
    const memberIdPick = randInt(1, workspaceMemberId);
    const createdAt = randomDateTimeBetween(workspaceMemberCreatedAt[memberIdPick], DATE_RANGE.end);
    const messageId = chance(0.7) ? randInt(1, CONFIG.messages) : null;
    const isRead = chance(0.55);
    const readAt = isRead ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;
    notificationsWriter.writeRow([
      memberIdPick,
      messageId,
      pick(notifTypes),
      pick(deliveryChannels),
      isRead,
      readAt,
      iso(createdAt),
    ]);
  }
  await notificationsWriter.close();

  // ==================================================
  // 25) moderation_actions
  // ==================================================
  const moderationWriter = new CsvWriter(path.join(OUTPUT_DIR, "moderation_actions.csv"), [
    "workspace_id",
    "target_member_id",
    "target_message_id",
    "acted_by_member_id",
    "action_type",
    "reason_code",
    "action_status",
    "created_at",
    "resolved_at",
  ]);

  for (let i = 1; i <= CONFIG.moderationActions; i++) {
    const workspaceId = randInt(1, CONFIG.workspaces);
    const memberCandidates = membersByWorkspace[workspaceId];
    const actedBy = memberCandidates.length ? pick(memberCandidates) : null;
    const targetMember = memberCandidates.length && chance(0.5) ? pick(memberCandidates) : null;
    const targetMessage = chance(0.5) ? randInt(1, CONFIG.messages) : null;
    const createdAt = randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end);
    const resolvedAt = chance(0.5) ? iso(randomDateTimeBetween(createdAt, DATE_RANGE.end)) : null;
    moderationWriter.writeRow([
      workspaceId,
      targetMember,
      targetMessage,
      actedBy,
      pick(modActionTypes),
      chance(0.5) ? pick(["spam", "abuse", "policy", "other"]) : null,
      pick(modActionStatuses),
      iso(createdAt),
      resolvedAt,
    ]);
  }
  await moderationWriter.close();

  // ==================================================
  // 26) app_events
  // ==================================================
  const appEventsWriter = new CsvWriter(path.join(OUTPUT_DIR, "app_events.csv"), [
    "workspace_id",
    "member_id",
    "event_name",
    "event_category",
    "entity_type",
    "entity_id",
    "event_time",
    "metadata",
  ]);

  const entityTypes = ["workspace", "channel", "conversation", "message", "call", "member", "notification"];
  for (let i = 1; i <= CONFIG.appEvents; i++) {
    const workspaceId = randInt(1, CONFIG.workspaces);
    const memberCandidates = membersByWorkspace[workspaceId];
    const memberIdPick = memberCandidates.length && chance(0.85) ? pick(memberCandidates) : null;
    appEventsWriter.writeRow([
      workspaceId,
      memberIdPick,
      pick(eventNames),
      chance(0.85) ? pick(eventCategories) : null,
      chance(0.7) ? pick(entityTypes) : null,
      chance(0.7) ? randInt(1, 250_000) : null,
      iso(randomDateTimeBetween(workspaceCreatedAt[workspaceId], DATE_RANGE.end)),
      JSON.stringify({ ip: faker.internet.ip(), ua: faker.internet.userAgent() }),
    ]);
  }
  await appEventsWriter.close();

  console.log("✅ Generated Chat seed CSVs");
  console.log(`- Output dir: ${OUTPUT_DIR}`);
  console.log(`- users: ${CONFIG.users}`);
  console.log(`- workspaces: ${CONFIG.workspaces}`);
  console.log(`- workspace_members: ${CONFIG.workspaceMembers}`);
  console.log(`- channels: ${CONFIG.channels}`);
  console.log(`- conversations: ${CONFIG.conversations}`);
  console.log(`- messages: ${CONFIG.messages}`);
}

main().catch((err) => {
  console.error("chatGenerateData error:", err);
  process.exit(1);
});
