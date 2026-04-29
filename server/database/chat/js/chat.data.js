import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("chat");

export const tableDescriptions = {
  app_events:
    "Product analytics and audit-style events across messaging, membership, notifications, and calls",
  call_participants: "Participation details for calls",
  calls: "Voice or video calls launched from channels or conversations",
  channel_members: "Membership and read-state data for channel participants",
  channels:
    "Public, private, announcement, forum, or category-style channels inside a workspace",
  conversation_members:
    "Participants and read state for direct or group conversations",
  conversations: "Direct-message and group-message conversation containers",
  invites: "Invitation records for workspace and channel onboarding",
  member_roles: "Role assignments for workspace members",
  message_attachments:
    "Files, images, and link-preview style attachments on messages",
  message_mentions:
    "Explicit mentions triggered by messages, including user, role, and channel mentions",
  message_pins: "Pinned messages in channels or conversations",
  message_reactions: "Emoji reactions on messages",
  message_reads: "Per-message read receipts for detailed read analytics",
  messages:
    "Messages posted in channels or conversations, including threaded replies and edit/delete state",
  moderation_actions:
    "Moderation operations such as warning, mute, remove message, suspend, and ban",
  notification_preferences:
    "Notification rules configured by members at workspace, channel, or conversation scope",
  notifications:
    "Generated notifications for mentions, replies, reactions, invites, and system activity",
  role_permissions: "Granular permissions attached to roles",
  roles: "Workspace-defined roles used for permissions and administration",
  saved_messages: "Messages saved or bookmarked by users",
  user_devices:
    "User devices used for chat access and push notification analysis",
  user_presence_logs:
    "Online, idle, do-not-disturb, and offline presence history",
  users: "Global users across all workspaces including humans and bots",
  workspace_members:
    "Membership records linking users to workspaces with invite and lifecycle details",
  workspaces:
    "Top-level chat workspaces or organizations similar to Slack workspaces or Discord servers",
};

export const questions = [
  {
    app_id: appId,
    code: "CHAT_001",
    title: "Total Users Count",
    description: "Find the total number of users in the chat platform.",
    difficulty: "easy",
    expected_query: "SELECT COUNT(*) AS total_users FROM users;",
    solution_columns: ["total_users"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_002",
    title: "Active Workspaces Count",
    description: "Find the total number of active workspaces.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS active_workspaces FROM workspaces WHERE is_active = true;",
    solution_columns: ["active_workspaces"],
    tables: ["workspaces"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_003",
    title: "Verified Users",
    description: "List all verified users.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, email FROM users WHERE is_verified = true;",
    solution_columns: ["id", "full_name", "email"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_004",
    title: "Public Channels",
    description: "Find all public channels in the platform.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, channel_name FROM channels WHERE visibility = 'public';",
    solution_columns: ["id", "workspace_id", "channel_name"],
    tables: ["channels"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_005",
    title: "Bot Users",
    description: "List all users that are bots.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, username FROM users WHERE is_bot = true;",
    solution_columns: ["id", "full_name", "username"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_006",
    title: "Workspace Members Count",
    description:
      "For each workspace, find the total number of members with active membership status.",
    difficulty: "easy",
    expected_query:
      "SELECT workspace_id, COUNT(*) AS active_member_count FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id;",
    solution_columns: ["workspace_id", "active_member_count"],
    tables: ["workspace_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_007",
    title: "Channels Per Workspace",
    description: "For each workspace, count how many channels it has.",
    difficulty: "easy",
    expected_query:
      "SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id;",
    solution_columns: ["workspace_id", "total_channels"],
    tables: ["channels"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_008",
    title: "Archived Channels",
    description: "List all archived channels.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, channel_name, archived_at FROM channels WHERE is_archived = true;",
    solution_columns: ["id", "workspace_id", "channel_name", "archived_at"],
    tables: ["channels"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_009",
    title: "Messages With Links",
    description: "Find all messages that contain links and are not deleted.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, sender_member_id, sent_at FROM messages WHERE contains_link = true AND is_deleted = false;",
    solution_columns: ["id", "workspace_id", "sender_member_id", "sent_at"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_010",
    title: "Direct Conversations Count",
    description: "Find the total number of direct conversations.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS direct_conversations_count FROM conversations WHERE conversation_type = 'direct';",
    solution_columns: ["direct_conversations_count"],
    tables: ["conversations"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_011",
    title: "Pinned Messages",
    description: "List all pinned messages across all channels.",
    difficulty: "easy",
    expected_query:
      "SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM message_pins;",
    solution_columns: [
      "message_id",
      "channel_id",
      "pinned_by_member_id",
      "pinned_at",
    ],
    tables: ["message_pins"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_012",
    title: "Unread Notifications",
    description: "Find all unread notifications for workspace members.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE is_read = false;",
    solution_columns: [
      "id",
      "workspace_member_id",
      "notification_type",
      "created_at",
    ],
    tables: ["notifications"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_013",
    title: "Online Users",
    description:
      "List all users who currently have an active online presence session.",
    difficulty: "easy",
    expected_query:
      "SELECT DISTINCT u.id, u.full_name, u.username, u.last_seen_at FROM users u JOIN workspace_members wm ON u.id = wm.user_id JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'online' AND upl.ended_at IS NULL;",
    solution_columns: ["id", "full_name", "username", "last_seen_at"],
    tables: ["users", "workspace_members", "user_presence_logs"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_014",
    title: "Messages Sent Today",
    description: "Find the total number of messages sent today.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS messages_sent_today FROM messages WHERE DATE(sent_at) = CURRENT_DATE;",
    solution_columns: ["messages_sent_today"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_015",
    title: "Reactions Per Emoji",
    description: "Count how many times each emoji reaction was used.",
    difficulty: "easy",
    expected_query:
      "SELECT emoji_code, COUNT(*) AS reaction_count FROM message_reactions GROUP BY emoji_code;",
    solution_columns: ["emoji_code", "reaction_count"],
    tables: ["message_reactions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_016",
    title: "Members Joined This Month",
    description: "List workspace members who joined in the current month.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, user_id, joined_at FROM workspace_members WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE);",
    solution_columns: ["id", "workspace_id", "user_id", "joined_at"],
    tables: ["workspace_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_017",
    title: "Private Channels Count",
    description: "Find the number of private channels in each workspace.",
    difficulty: "easy",
    expected_query:
      "SELECT workspace_id, COUNT(*) AS private_channels_count FROM channels WHERE visibility = 'private' GROUP BY workspace_id;",
    solution_columns: ["workspace_id", "private_channels_count"],
    tables: ["channels"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_018",
    title: "Deleted Messages",
    description: "List all deleted messages.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, sender_member_id, deleted_at FROM messages WHERE is_deleted = true;",
    solution_columns: ["id", "workspace_id", "sender_member_id", "deleted_at"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_019",
    title: "Users In DND Mode",
    description:
      "Find users who currently have an active do-not-disturb presence session.",
    difficulty: "easy",
    expected_query:
      "SELECT DISTINCT u.id AS user_id, upl.started_at AS dnd_started_at FROM users u JOIN workspace_members wm ON u.id = wm.user_id JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'dnd' AND upl.ended_at IS NULL;",
    solution_columns: ["user_id", "dnd_started_at"],
    tables: ["users", "workspace_members", "user_presence_logs"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_020",
    title: "Users Without Phone Number",
    description: "List users who do not have a phone number set.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, email FROM users WHERE phone IS NULL;",
    solution_columns: ["id", "full_name", "email"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_021",
    title: "Messages Per Channel",
    description:
      "For each channel, find the total number of non-deleted messages.",
    difficulty: "easy",
    expected_query:
      "SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id;",
    solution_columns: ["channel_id", "total_messages"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_022",
    title: "Thread Replies Count",
    description: "For each parent message, count how many replies it has.",
    difficulty: "easy",
    expected_query:
      "SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id;",
    solution_columns: ["parent_message_id", "reply_count"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_023",
    title: "Users Created Recently",
    description: "List users created in the last 30 days.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, username, created_at FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';",
    solution_columns: ["id", "full_name", "username", "created_at"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_024",
    title: "Channel Members",
    description: "List all channel memberships.",
    difficulty: "easy",
    expected_query:
      "SELECT id, channel_id, workspace_member_id, joined_at FROM channel_members;",
    solution_columns: ["id", "channel_id", "workspace_member_id", "joined_at"],
    tables: ["channel_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_025",
    title: "Attachments Per Type",
    description:
      "Count how many message attachments exist for each attachment type.",
    difficulty: "easy",
    expected_query:
      "SELECT attachment_type, COUNT(*) AS attachment_count FROM message_attachments GROUP BY attachment_type;",
    solution_columns: ["attachment_type", "attachment_count"],
    tables: ["message_attachments"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_026",
    title: "Workspaces Created This Year",
    description: "List all workspaces created in the current year.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_name, created_at FROM workspaces WHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE);",
    solution_columns: ["id", "workspace_name", "created_at"],
    tables: ["workspaces"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_027",
    title: "Muted Notification Preferences",
    description: "List all notification preferences that are currently muted.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_member_id, channel_id, mute_until FROM notification_preferences WHERE mute_until IS NOT NULL;",
    solution_columns: ["id", "workspace_member_id", "channel_id", "mute_until"],
    tables: ["notification_preferences"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_028",
    title: "Pending Invites",
    description: "List all invites that are still pending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status = 'pending';",
    solution_columns: ["id", "workspace_id", "invited_email", "created_at"],
    tables: ["invites"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_029",
    title: "Applied Moderation Actions",
    description: "Find all moderation actions that are currently applied.",
    difficulty: "easy",
    expected_query:
      "SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status = 'applied';",
    solution_columns: [
      "id",
      "workspace_id",
      "target_member_id",
      "target_message_id",
      "created_at",
    ],
    tables: ["moderation_actions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_030",
    title: "Voice Calls Count",
    description: "Find the total number of voice calls.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS voice_calls_count FROM calls WHERE call_type = 'voice';",
    solution_columns: ["voice_calls_count"],
    tables: ["calls"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_031",
    title: "Top Active Channels",
    description:
      "Find the top 5 channels with the highest number of non-deleted messages.",
    difficulty: "easy",
    expected_query:
      "SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC LIMIT 5;",
    solution_columns: ["channel_id", "total_messages"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "total_messages", direction: "desc" },
        { column: "channel_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_032",
    title: "Members With Saved Messages",
    description: "List workspace members who have saved at least one message.",
    difficulty: "easy",
    expected_query: "SELECT DISTINCT workspace_member_id FROM saved_messages;",
    solution_columns: ["workspace_member_id"],
    tables: ["saved_messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_033",
    title: "Messages With Attachments",
    description: "Find all messages that have at least one attachment.",
    difficulty: "easy",
    expected_query:
      "SELECT DISTINCT ma.message_id FROM message_attachments ma;",
    solution_columns: ["message_id"],
    tables: ["message_attachments"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_034",
    title: "Inactive Users",
    description: "List users who have been inactive for more than 30 days.",
    difficulty: "easy",
    expected_query:
      "SELECT id, full_name, last_seen_at FROM users WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days';",
    solution_columns: ["id", "full_name", "last_seen_at"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_035",
    title: "Calls With More Than Two Participants",
    description: "Find calls that had more than 2 participants.",
    difficulty: "easy",
    expected_query:
      "SELECT call_id, COUNT(*) AS participant_count FROM call_participants GROUP BY call_id HAVING COUNT(*) > 2;",
    solution_columns: ["call_id", "participant_count"],
    tables: ["call_participants"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_036",
    title: "Users In Multiple Workspaces",
    description: "Find users who are members of more than one workspace.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count FROM workspace_members WHERE membership_status = 'active' GROUP BY user_id HAVING COUNT(DISTINCT workspace_id) > 1;",
    solution_columns: ["user_id", "workspace_count"],
    tables: ["workspace_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_037",
    title: "Most Reacted Messages",
    description: "Find the top 10 messages with the highest reaction count.",
    difficulty: "medium",
    expected_query:
      "SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ORDER BY reaction_count DESC, message_id ASC LIMIT 10;",
    solution_columns: ["message_id", "reaction_count"],
    tables: ["message_reactions"],
    comparison_config: {
      sort_by_columns: [
        { column: "reaction_count", direction: "desc" },
        { column: "message_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_038",
    title: "Unread Notifications Per Member",
    description: "For each workspace member, count unread notifications.",
    difficulty: "medium",
    expected_query:
      "SELECT workspace_member_id, COUNT(*) AS unread_count FROM notifications WHERE is_read = false GROUP BY workspace_member_id;",
    solution_columns: ["workspace_member_id", "unread_count"],
    tables: ["notifications"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_039",
    title: "Most Mentioned Members",
    description:
      "Find workspace members who were mentioned the most in messages.",
    difficulty: "medium",
    expected_query:
      "SELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY mentioned_member_id;",
    solution_columns: ["workspace_member_id", "mention_count"],
    tables: ["message_mentions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_040",
    title: "Average Replies Per Thread",
    description:
      "Find the average number of replies per parent message thread.",
    difficulty: "medium",
    expected_query:
      "WITH thread_replies AS ( SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread FROM thread_replies;",
    solution_columns: ["avg_replies_per_thread"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_041",
    title: "Top Message Senders",
    description:
      "Find the top 10 workspace members who sent the highest number of non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "SELECT sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ORDER BY message_count DESC, sender_member_id ASC LIMIT 10;",
    solution_columns: ["sender_member_id", "message_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "message_count", direction: "desc" },
        { column: "sender_member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_042",
    title: "Channels With No Messages",
    description: "Find channels that do not have any messages.",
    difficulty: "medium",
    expected_query:
      "SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN messages m ON c.id = m.channel_id GROUP BY c.id, c.workspace_id, c.channel_name HAVING COUNT(m.id) = 0;",
    solution_columns: ["id", "workspace_id", "channel_name"],
    tables: ["channels", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_043",
    title: "Users Who Never Sent Messages",
    description:
      "Find users who are active workspace members but have never sent any message.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT wm.user_id FROM workspace_members wm LEFT JOIN messages m ON wm.id = m.sender_member_id WHERE wm.membership_status = 'active' GROUP BY wm.user_id HAVING COUNT(m.id) = 0;",
    solution_columns: ["user_id"],
    tables: ["workspace_members", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_044",
    title: "Average Messages Per Channel",
    description: "Find the average number of non-deleted messages per channel.",
    difficulty: "medium",
    expected_query:
      "WITH channel_message_counts AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel FROM channel_message_counts;",
    solution_columns: ["avg_messages_per_channel"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_045",
    title: "Channels With More Than 100 Messages",
    description: "Find channels that have more than 100 non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id HAVING COUNT(*) > 100;",
    solution_columns: ["channel_id", "total_messages"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_046",
    title: "Members With Both Messages And Reactions",
    description:
      "Find workspace members who have sent at least one message and also added at least one reaction.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT m.sender_member_id AS workspace_member_id FROM messages m JOIN message_reactions r ON m.sender_member_id = r.workspace_member_id;",
    solution_columns: ["workspace_member_id"],
    tables: ["messages", "message_reactions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_047",
    title: "Most Active Workspaces By Messages",
    description:
      "Find the top 10 workspaces with the highest number of non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ORDER BY total_messages DESC, workspace_id ASC LIMIT 10;",
    solution_columns: ["workspace_id", "total_messages"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "total_messages", direction: "desc" },
        { column: "workspace_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_048",
    title: "Average Reaction Count Per Message",
    description: "Find the average number of reactions per reacted message.",
    difficulty: "medium",
    expected_query:
      "WITH reaction_counts AS ( SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ) SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count FROM reaction_counts;",
    solution_columns: ["avg_reaction_count"],
    tables: ["message_reactions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_049",
    title: "Members In Private Channels",
    description: "Find the number of members in each private channel.",
    difficulty: "medium",
    expected_query:
      "SELECT cm.channel_id, COUNT(*) AS member_count FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'private' GROUP BY cm.channel_id;",
    solution_columns: ["channel_id", "member_count"],
    tables: ["channel_members", "channels"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_050",
    title: "Workspace Owners Count",
    description: "Find how many active workspace owners each workspace has.",
    difficulty: "medium",
    expected_query:
      "SELECT workspace_id, COUNT(*) AS owner_count FROM workspace_members WHERE membership_status = 'active' AND member_type = 'owner' GROUP BY workspace_id;",
    solution_columns: ["workspace_id", "owner_count"],
    tables: ["workspace_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_051",
    title: "Top Channels By Unique Senders",
    description:
      "Find the top 10 channels with the highest number of distinct members who sent non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY unique_senders DESC, channel_id ASC LIMIT 10;",
    solution_columns: ["channel_id", "unique_senders"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "unique_senders", direction: "desc" },
        { column: "channel_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_052",
    title: "Members In Multiple Channels",
    description: "Find workspace members who belong to more than 3 channels.",
    difficulty: "medium",
    expected_query:
      "SELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id HAVING COUNT(DISTINCT channel_id) > 3;",
    solution_columns: ["workspace_member_id", "channel_count"],
    tables: ["channel_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_053",
    title: "Channels With No Members",
    description: "Find channels that do not have any channel members.",
    difficulty: "medium",
    expected_query:
      "SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN channel_members cm ON c.id = cm.channel_id GROUP BY c.id, c.workspace_id, c.channel_name HAVING COUNT(cm.id) = 0;",
    solution_columns: ["id", "workspace_id", "channel_name"],
    tables: ["channels", "channel_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_054",
    title: "Average Messages Per Active Member",
    description:
      "For each workspace, find the average number of non-deleted messages sent per active workspace member.",
    difficulty: "medium",
    expected_query:
      "WITH workspace_message_counts AS ( SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ), workspace_active_members AS ( SELECT workspace_id, COUNT(*) AS active_members FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ) SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member FROM workspace_active_members wam LEFT JOIN workspace_message_counts wmc ON wam.workspace_id = wmc.workspace_id;",
    solution_columns: ["workspace_id", "avg_messages_per_active_member"],
    tables: ["messages", "workspace_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_055",
    title: "Most Mentioned Messages",
    description:
      "Find the top 10 messages with the highest number of user mentions.",
    difficulty: "medium",
    expected_query:
      "SELECT message_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY message_id ORDER BY mention_count DESC, message_id ASC LIMIT 10;",
    solution_columns: ["message_id", "mention_count"],
    tables: ["message_mentions"],
    comparison_config: {
      sort_by_columns: [
        { column: "mention_count", direction: "desc" },
        { column: "message_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_056",
    title: "Members Mentioned In Multiple Workspaces",
    description:
      "Find workspace members who were mentioned in more than one workspace.",
    difficulty: "medium",
    expected_query:
      "SELECT mm.mentioned_member_id AS workspace_member_id, COUNT(DISTINCT m.workspace_id) AS workspace_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id HAVING COUNT(DISTINCT m.workspace_id) > 1;",
    solution_columns: ["workspace_member_id", "workspace_count"],
    tables: ["message_mentions", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_057",
    title: "Channels With Attachment Heavy Usage",
    description: "Find channels where more than 20 messages have attachments.",
    difficulty: "medium",
    expected_query:
      "SELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count FROM message_attachments ma JOIN messages m ON ma.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id HAVING COUNT(DISTINCT ma.message_id) > 20;",
    solution_columns: ["channel_id", "attachment_message_count"],
    tables: ["message_attachments", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_058",
    title: "Top Direct Conversations By Messages",
    description:
      "Find the top 10 direct conversations with the highest number of non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "SELECT conversation_id, COUNT(*) AS total_messages FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id ORDER BY total_messages DESC, conversation_id ASC LIMIT 10;",
    solution_columns: ["conversation_id", "total_messages"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "total_messages", direction: "desc" },
        { column: "conversation_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_059",
    title: "Members With Muted Preferences",
    description: "Find workspace members who have muted more than 2 channels.",
    difficulty: "medium",
    expected_query:
      "SELECT workspace_member_id, COUNT(*) AS muted_channel_count FROM notification_preferences WHERE mute_until IS NOT NULL GROUP BY workspace_member_id HAVING COUNT(*) > 2;",
    solution_columns: ["workspace_member_id", "muted_channel_count"],
    tables: ["notification_preferences"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_060",
    title: "Workspace Invite Counts",
    description: "For each workspace, count accepted and pending invites.",
    difficulty: "medium",
    expected_query:
      "SELECT workspace_id, COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites, COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites FROM invites GROUP BY workspace_id;",
    solution_columns: ["workspace_id", "accepted_invites", "pending_invites"],
    tables: ["invites"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_061",
    title: "Most Active Users Per Workspace",
    description:
      "For each workspace, find the member who sent the highest number of non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn = 1;",
    solution_columns: ["workspace_id", "sender_member_id", "message_count"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_062",
    title: "Most Reacted Message Per Channel",
    description:
      "For each channel, find the message with the highest number of reactions.",
    difficulty: "medium",
    expected_query:
      "WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), ranked_messages AS ( SELECT channel_id, message_id, reaction_count, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY reaction_count DESC, message_id ASC) AS rn FROM reaction_counts ) SELECT channel_id, message_id, reaction_count FROM ranked_messages WHERE rn = 1;",
    solution_columns: ["channel_id", "message_id", "reaction_count"],
    tables: ["message_reactions", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_063",
    title: "Users More Active Than Workspace Average",
    description:
      "Find members whose message count is greater than the average message count of members in their workspace.",
    difficulty: "medium",
    expected_query:
      "WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_count FROM member_counts GROUP BY workspace_id ) SELECT mc.workspace_id, mc.sender_member_id, mc.message_count FROM member_counts mc JOIN workspace_avg wa ON mc.workspace_id = wa.workspace_id WHERE mc.message_count > wa.avg_count;",
    solution_columns: ["workspace_id", "sender_member_id", "message_count"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_064",
    title: "Fastest First Reply Threads",
    description:
      "Find the top 10 parent messages with the fastest first reply time in minutes.",
    difficulty: "medium",
    expected_query:
      "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;",
    solution_columns: ["parent_message_id", "first_reply_minutes"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "first_reply_minutes", direction: "asc" },
        { column: "parent_message_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_065",
    title: "Most Saved Messages",
    description:
      "Find the top 10 messages saved by the highest number of users.",
    difficulty: "medium",
    expected_query:
      "SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ORDER BY saved_count DESC, message_id ASC LIMIT 10;",
    solution_columns: ["message_id", "saved_count"],
    tables: ["saved_messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "saved_count", direction: "desc" },
        { column: "message_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_066",
    title: "Channels With High Reply Ratio",
    description:
      "Find channels where reply messages are more than 30 percent of total messages.",
    difficulty: "medium",
    expected_query:
      "SELECT channel_id, COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id HAVING COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL)::numeric / COUNT(*) > 0.30;",
    solution_columns: ["channel_id", "reply_count", "total_messages"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_067",
    title: "Members With Reactions But No Messages",
    description:
      "Find workspace members who reacted to messages but never sent a message.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT mr.workspace_member_id FROM message_reactions mr LEFT JOIN messages m ON mr.workspace_member_id = m.sender_member_id GROUP BY mr.workspace_member_id HAVING COUNT(m.id) = 0;",
    solution_columns: ["workspace_member_id"],
    tables: ["message_reactions", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_068",
    title: "Daily Message Volume",
    description: "Find daily non-deleted message counts for the last 30 days.",
    difficulty: "medium",
    expected_query:
      "SELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE(sent_at);",
    solution_columns: ["message_date", "total_messages"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_069",
    title: "Channels With Above Average Members",
    description:
      "Find channels whose member count is above the average across all channels.",
    difficulty: "medium",
    expected_query:
      "WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ), avg_count AS ( SELECT AVG(member_count) AS avg_members FROM channel_counts ) SELECT cc.channel_id, cc.member_count FROM channel_counts cc CROSS JOIN avg_count ac WHERE cc.member_count > ac.avg_members;",
    solution_columns: ["channel_id", "member_count"],
    tables: ["channel_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_070",
    title: "Most Active Hour Of Day",
    description:
      "Find the hour of the day with the highest number of non-deleted messages.",
    difficulty: "medium",
    expected_query:
      "SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ORDER BY total_messages DESC, message_hour ASC LIMIT 1;",
    solution_columns: ["message_hour", "total_messages"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "total_messages", direction: "desc" },
        { column: "message_hour", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_071",
    title: "Users Active On Consecutive Days",
    description:
      "Find members who sent non-deleted messages on at least 3 different consecutive dates.",
    difficulty: "medium",
    expected_query:
      "WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), grouped_days AS ( SELECT sender_member_id, message_date, message_date - (ROW_NUMBER() OVER (PARTITION BY sender_member_id ORDER BY message_date))::int AS grp FROM member_days ) SELECT sender_member_id, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp HAVING COUNT(*) >= 3;",
    solution_columns: ["sender_member_id", "consecutive_days_count"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_072",
    title: "Users With Faster Than Avg Reply",
    description:
      "Find parent messages whose first reply time is faster than the overall average first reply time.",
    difficulty: "medium",
    expected_query:
      "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ), avg_reply AS ( SELECT AVG(first_reply_minutes) AS avg_first_reply_minutes FROM reply_times ) SELECT rt.parent_message_id, ROUND(rt.first_reply_minutes, 2) AS first_reply_minutes FROM reply_times rt CROSS JOIN avg_reply ar WHERE rt.first_reply_minutes < ar.avg_first_reply_minutes ORDER BY first_reply_minutes ASC, parent_message_id ASC;",
    solution_columns: ["parent_message_id", "first_reply_minutes"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "first_reply_minutes", direction: "asc" },
        { column: "parent_message_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_073",
    title: "Members Above Channel Avg",
    description:
      "Find member-channel pairs where the member sent more messages in a channel than their average messages per channel in that workspace.",
    difficulty: "medium",
    expected_query:
      "WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ), member_workspace_avg AS ( SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count FROM member_channel_counts GROUP BY workspace_id, sender_member_id ) SELECT mcc.workspace_id, mcc.channel_id, mcc.sender_member_id, mcc.message_count FROM member_channel_counts mcc JOIN member_workspace_avg mwa ON mcc.workspace_id = mwa.workspace_id AND mcc.sender_member_id = mwa.sender_member_id WHERE mcc.message_count > mwa.avg_channel_message_count;",
    solution_columns: [
      "workspace_id",
      "channel_id",
      "sender_member_id",
      "message_count",
    ],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_074",
    title: "Most Replied Users",
    description:
      "Find the top 10 members whose messages received the highest number of direct replies.",
    difficulty: "medium",
    expected_query:
      "SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ORDER BY reply_count DESC, p.sender_member_id ASC LIMIT 10;",
    solution_columns: ["sender_member_id", "reply_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "reply_count", direction: "desc" },
        { column: "sender_member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_075",
    title: "Members Above Reaction Avg",
    description:
      "Find workspace members whose total reactions given are above the average reactions given in their workspace.",
    difficulty: "medium",
    expected_query:
      "WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(reaction_count) AS avg_reaction_count FROM member_reaction_counts GROUP BY workspace_id ) SELECT mrc.workspace_id, mrc.workspace_member_id, mrc.reaction_count FROM member_reaction_counts mrc JOIN workspace_avg wa ON mrc.workspace_id = wa.workspace_id WHERE mrc.reaction_count > wa.avg_reaction_count;",
    solution_columns: ["workspace_id", "workspace_member_id", "reaction_count"],
    tables: ["message_reactions", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_076",
    title: "Top 3 Members Per Workspace",
    description:
      "For each workspace, find the top 3 members who sent the most non-deleted messages.",
    difficulty: "hard",
    expected_query:
      "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn <= 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;",
    solution_columns: ["workspace_id", "sender_member_id", "message_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "workspace_id", direction: "asc" },
        { column: "message_count", direction: "desc" },
        { column: "sender_member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_077",
    title: "Deepest Reply Threads",
    description:
      "Find the top 10 root messages that have the deepest reply chain.",
    difficulty: "hard",
    expected_query:
      "WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ) SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ORDER BY max_reply_depth DESC, root_message_id ASC LIMIT 10;",
    solution_columns: ["root_message_id", "max_reply_depth"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "max_reply_depth", direction: "desc" },
        { column: "root_message_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_078",
    title: "Members More Popular Than Repliers",
    description:
      "Find members whose received replies exceed average of their repliers.",
    difficulty: "hard",
    expected_query:
      "WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_received_replies AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_avg AS ( SELECT rrr.member_id, AVG(COALESCE(rr.received_reply_count, 0)) AS avg_replier_received_reply_count FROM replier_received_replies rrr LEFT JOIN received_replies rr ON rrr.replier_member_id = rr.member_id GROUP BY rrr.member_id ) SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN replier_avg ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count;",
    solution_columns: ["member_id", "received_reply_count"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_079",
    title: "Rolling 7 Day Leaders",
    description:
      "For each date, find the member with highest rolling 7-day messages.",
    difficulty: "hard",
    expected_query:
      "WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), daily_leaders AS ( SELECT DISTINCT ON (message_date) message_date::date AS message_date, sender_member_id, rolling_7d_count FROM rolling_counts ORDER BY message_date, rolling_7d_count DESC, sender_member_id ASC ) SELECT message_date, sender_member_id, rolling_7d_count FROM daily_leaders ORDER BY message_date ASC;",
    solution_columns: ["message_date", "sender_member_id", "rolling_7d_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [{ column: "message_date", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "CHAT_080",
    title: "Channels With Consistent Weekly Growth",
    description:
      "Find channels whose non-deleted message count increased week over week for at least 3 consecutive weeks.",
    difficulty: "hard",
    expected_query:
      "WITH weekly_channel_messages AS ( SELECT channel_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, DATE_TRUNC('week', sent_at)::date ), weekly_growth AS ( SELECT channel_id, week_start, weekly_count, LAG(weekly_count) OVER (PARTITION BY channel_id ORDER BY week_start) AS prev_week_count FROM weekly_channel_messages ), growth_flags AS ( SELECT channel_id, week_start, CASE WHEN prev_week_count IS NOT NULL AND weekly_count > prev_week_count THEN 1 ELSE 0 END AS is_growth_week FROM weekly_growth ), grouped_flags AS ( SELECT channel_id, week_start, is_growth_week, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY channel_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags ), grouped_growth AS ( SELECT channel_id, week_start, grp FROM grouped_flags WHERE is_growth_week = 1 ) SELECT channel_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY channel_id, grp HAVING COUNT(*) >= 3;",
    solution_columns: ["channel_id", "consecutive_growth_weeks"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_081",
    title: "Fastest Median First Reply Channels",
    description:
      "Find the top 10 channels with the lowest median first reply time.",
    difficulty: "hard",
    expected_query:
      "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), parent_reply_times AS ( SELECT p.channel_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id WHERE p.channel_id IS NOT NULL ) SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM parent_reply_times GROUP BY channel_id ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;",
    solution_columns: ["channel_id", "median_first_reply_minutes"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "median_first_reply_minutes", direction: "asc" },
        { column: "channel_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_082",
    title: "Members In Every Public Channel",
    description: "Find workspace members who belong to every public channel.",
    difficulty: "hard",
    expected_query:
      "WITH public_channels AS ( SELECT workspace_id, COUNT(*) AS public_channel_count FROM channels WHERE visibility = 'public' GROUP BY workspace_id ), public_memberships AS ( SELECT c.workspace_id, cm.workspace_member_id, COUNT(DISTINCT cm.channel_id) AS joined_public_channels FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'public' GROUP BY c.workspace_id, cm.workspace_member_id ) SELECT pm.workspace_id, pm.workspace_member_id FROM public_memberships pm JOIN public_channels pc ON pm.workspace_id = pc.workspace_id WHERE pm.joined_public_channels = pc.public_channel_count;",
    solution_columns: ["workspace_id", "workspace_member_id"],
    tables: ["channels", "channel_members"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_083",
    title: "Members Reaction vs Message Dominance",
    description:
      "Find members where channels with more reactions exceed channels with more messages.",
    difficulty: "hard",
    expected_query:
      "WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ) SELECT workspace_id, workspace_member_id FROM combined GROUP BY workspace_id, workspace_member_id HAVING COUNT(*) FILTER (WHERE reaction_count > message_count) > COUNT(*) FILTER (WHERE message_count > reaction_count);",
    solution_columns: ["workspace_id", "workspace_member_id"],
    tables: ["messages", "message_reactions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_084",
    title: "Top Root Message Per Workspace",
    description: "Find root message with most replies per workspace.",
    difficulty: "hard",
    expected_query:
      "WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), ranked_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY total_descendant_replies DESC, root_message_id ASC) AS rn FROM reply_totals ) SELECT workspace_id, root_message_id, total_descendant_replies FROM ranked_roots WHERE rn = 1;",
    solution_columns: [
      "workspace_id",
      "root_message_id",
      "total_descendant_replies",
    ],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_085",
    title: "Power Users Multi Metrics",
    description:
      "Find members above workspace averages in messages, reactions and mentions.",
    difficulty: "hard",
    expected_query:
      "WITH message_counts AS ( SELECT workspace_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), mention_counts AS ( SELECT m.workspace_id, m.sender_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY m.workspace_id, m.sender_member_id ), member_metrics AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id, mic.workspace_id) AS workspace_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id, mic.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count, COALESCE(mic.mention_count, 0) AS mention_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.workspace_member_id = rc.workspace_member_id FULL OUTER JOIN mention_counts mic ON COALESCE(mc.workspace_id, rc.workspace_id) = mic.workspace_id AND COALESCE(mc.workspace_member_id, rc.workspace_member_id) = mic.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_message_count, AVG(reaction_count) AS avg_reaction_count, AVG(mention_count) AS avg_mention_count FROM member_metrics GROUP BY workspace_id ) SELECT mm.workspace_id, mm.workspace_member_id, mm.message_count, mm.reaction_count, mm.mention_count FROM member_metrics mm JOIN workspace_avg wa ON mm.workspace_id = wa.workspace_id WHERE mm.message_count > wa.avg_message_count AND mm.reaction_count > wa.avg_reaction_count AND mm.mention_count > wa.avg_mention_count;",
    solution_columns: [
      "workspace_id",
      "workspace_member_id",
      "message_count",
      "reaction_count",
      "mention_count",
    ],
    tables: ["messages", "message_reactions", "message_mentions"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_086",
    title: "Dormant But Unread Heavy Members",
    description: "Find members inactive 30 days but with >20 unread messages.",
    difficulty: "hard",
    expected_query:
      "WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), unread_counts AS ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ) SELECT uc.workspace_member_id, uc.unread_message_count FROM unread_counts uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE (ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days') AND uc.unread_message_count > 20 ORDER BY uc.unread_message_count DESC, uc.workspace_member_id ASC;",
    solution_columns: ["workspace_member_id", "unread_message_count"],
    tables: ["channel_members", "messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "unread_message_count", direction: "desc" },
        { column: "workspace_member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_087",
    title: "Mutual Reply Pairs",
    description:
      "Find pairs where both members replied to each other >=3 times.",
    difficulty: "hard",
    expected_query:
      "WITH direct_replies AS ( SELECT LEAST(p.sender_member_id, r.sender_member_id) AS member_1, GREATEST(p.sender_member_id, r.sender_member_id) AS member_2, p.sender_member_id AS original_sender, r.sender_member_id AS replier_sender, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id WHERE p.conversation_id IS NOT NULL AND r.conversation_id = p.conversation_id GROUP BY LEAST(p.sender_member_id, r.sender_member_id), GREATEST(p.sender_member_id, r.sender_member_id), p.sender_member_id, r.sender_member_id ), pair_summary AS ( SELECT member_1, member_2, COUNT(*) FILTER (WHERE original_sender = member_1 AND replier_sender = member_2 AND reply_count >= 3) AS c1, COUNT(*) FILTER (WHERE original_sender = member_2 AND replier_sender = member_1 AND reply_count >= 3) AS c2 FROM direct_replies GROUP BY member_1, member_2 ) SELECT member_1, member_2 FROM pair_summary WHERE c1 > 0 AND c2 > 0;",
    solution_columns: ["member_1", "member_2"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_088",
    title: "Channels Dominated By One User",
    description: "Find channels where one user contributed >50% messages.",
    difficulty: "hard",
    expected_query:
      "WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), channel_totals AS ( SELECT channel_id, SUM(message_count) AS total_messages, MAX(message_count) AS top_member_messages FROM channel_member_counts GROUP BY channel_id ) SELECT channel_id, top_member_messages, total_messages FROM channel_totals WHERE top_member_messages::numeric / total_messages > 0.50 ORDER BY top_member_messages DESC, channel_id ASC;",
    solution_columns: ["channel_id", "top_member_messages", "total_messages"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "top_member_messages", direction: "desc" },
        { column: "channel_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_089",
    title: "Workspaces With 4 Week Growth",
    description: "Find workspaces with 4 consecutive weekly growth.",
    difficulty: "hard",
    expected_query:
      "WITH weekly_workspace_messages AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN weekly_count > LAG(weekly_count) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_workspace_messages ), grouped_growth AS ( SELECT workspace_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp HAVING COUNT(*) >= 4;",
    solution_columns: ["workspace_id", "consecutive_growth_weeks"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_090",
    title: "Members Faster Than Workspace Median",
    description: "Find members with median reply time below workspace median.",
    difficulty: "hard",
    expected_query:
      "WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ), workspace_reply_times AS ( SELECT workspace_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS workspace_median_reply_minutes FROM member_reply_times GROUP BY workspace_id ) SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm JOIN workspace_reply_times wrt ON mm.workspace_id = wrt.workspace_id WHERE mm.member_median_reply_minutes < wrt.workspace_median_reply_minutes ORDER BY mm.workspace_id ASC, member_median_reply_minutes ASC, mm.workspace_member_id ASC;",
    solution_columns: [
      "workspace_id",
      "workspace_member_id",
      "member_median_reply_minutes",
    ],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "workspace_id", direction: "asc" },
        { column: "member_median_reply_minutes", direction: "asc" },
        { column: "workspace_member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_091",
    title: "Members Highest 30 Day Growth",
    description:
      "Find the top 10 members whose message growth in last 30 days vs previous 30 days is highest.",
    difficulty: "hard",
    expected_query:
      "WITH current_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), previous_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM current_30d c FULL OUTER JOIN previous_30d p ON c.member_id = p.member_id ORDER BY growth_count DESC, member_id ASC LIMIT 10;",
    solution_columns: ["member_id", "growth_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "growth_count", direction: "desc" },
        { column: "member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_092",
    title: "Channels Deep And Wide Threads",
    description: "Find channels where a thread has depth > 5 and replies > 20.",
    difficulty: "hard",
    expected_query:
      "WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ), thread_stats AS ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ) SELECT DISTINCT channel_id FROM thread_stats WHERE max_depth > 5 AND total_replies > 20;",
    solution_columns: ["channel_id"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_093",
    title: "Most Engaging Channels",
    description: "Find top 10 channels ranked by interaction score.",
    difficulty: "hard",
    expected_query:
      "WITH channel_messages AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ), channel_reactions AS ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ), channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ) SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM channel_messages cm FULL OUTER JOIN channel_reactions cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN channel_replies cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;",
    solution_columns: ["channel_id", "interaction_score"],
    tables: ["messages", "message_reactions"],
    comparison_config: {
      sort_by_columns: [
        { column: "interaction_score", direction: "desc" },
        { column: "channel_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_094",
    title: "Power Members Every Channel",
    description: "Find members active in every channel of their workspace.",
    difficulty: "hard",
    expected_query:
      "WITH workspace_channels AS ( SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ), member_channel_activity AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(DISTINCT channel_id) AS active_channels FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, sender_member_id ) SELECT mca.workspace_id, mca.member_id FROM member_channel_activity mca JOIN workspace_channels wc ON mca.workspace_id = wc.workspace_id WHERE mca.active_channels = wc.total_channels;",
    solution_columns: ["workspace_id", "member_id"],
    tables: ["messages", "channels"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_095",
    title: "Channels Reply Velocity",
    description:
      "Find top 10 channels with highest replies per hour (last 7 days).",
    difficulty: "hard",
    expected_query:
      "WITH channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ) SELECT channel_id, ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour FROM channel_replies ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;",
    solution_columns: ["channel_id", "replies_per_hour"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "replies_per_hour", direction: "desc" },
        { column: "channel_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_096",
    title: "Members Weekly Mention Growth",
    description: "Find members with 3 consecutive weeks of mention growth.",
    difficulty: "hard",
    expected_query:
      "WITH weekly_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, DATE_TRUNC('week', m.sent_at)::date AS week_start, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id, DATE_TRUNC('week', m.sent_at)::date ), growth_flags AS ( SELECT workspace_member_id, week_start, CASE WHEN mention_count > LAG(mention_count) OVER (PARTITION BY workspace_member_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_mentions ), grouped_growth AS ( SELECT workspace_member_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_member_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_member_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_member_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_member_id, grp HAVING COUNT(*) >= 3;",
    solution_columns: ["workspace_member_id", "consecutive_growth_weeks"],
    tables: ["message_mentions", "messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_097",
    title: "Conversations Highest Reciprocity",
    description:
      "Find top 10 conversations with most balanced sender distribution.",
    difficulty: "hard",
    expected_query:
      "WITH sender_counts AS ( SELECT conversation_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id, sender_member_id ), conversation_balance AS ( SELECT conversation_id, MIN(message_count) AS min_sender_messages, MAX(message_count) AS max_sender_messages, SUM(message_count) AS total_messages, COUNT(*) AS sender_count FROM sender_counts GROUP BY conversation_id HAVING COUNT(*) > 1 ) SELECT conversation_id, sender_count, total_messages FROM conversation_balance ORDER BY (max_sender_messages - min_sender_messages) ASC, total_messages DESC, conversation_id ASC LIMIT 10;",
    solution_columns: ["conversation_id", "sender_count", "total_messages"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "total_messages", direction: "desc" },
        { column: "conversation_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_098",
    title: "Workspaces Rising Engagement",
    description: "Find workspaces with 4 consecutive weeks of growth.",
    difficulty: "hard",
    expected_query:
      "WITH weekly_scores AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS message_score FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN message_score > LAG(message_score) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_scores ), grouped_growth AS ( SELECT workspace_id, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp HAVING COUNT(*) >= 4;",
    solution_columns: ["workspace_id", "consecutive_growth_weeks"],
    tables: ["messages"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "CHAT_099",
    title: "Members Above 90th Percentile",
    description: "Find members above 90th percentile message count.",
    difficulty: "hard",
    expected_query:
      "WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), percentile_value AS ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) AS p90 FROM member_counts ) SELECT mc.member_id, mc.message_count FROM member_counts mc CROSS JOIN percentile_value pv WHERE mc.message_count > pv.p90 ORDER BY mc.message_count DESC, mc.member_id ASC;",
    solution_columns: ["member_id", "message_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "message_count", direction: "desc" },
        { column: "member_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "CHAT_100",
    title: "Top Cross Workspace Users",
    description:
      "Find top 10 users active in most workspaces (>=50 messages each).",
    difficulty: "hard",
    expected_query:
      "WITH workspace_user_counts AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ) SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM workspace_user_counts GROUP BY member_id ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;",
    solution_columns: ["member_id", "active_workspace_count"],
    tables: ["messages"],
    comparison_config: {
      sort_by_columns: [
        { column: "active_workspace_count", direction: "desc" },
        { column: "member_id", direction: "asc" },
      ],
    },
  },
];

export const hints = [
  {
    code: "CHAT_001",
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
    code: "CHAT_002",
    hints: [
      {
        hint_order: 1,
        content: "Only active workspaces should be counted.",
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
    code: "CHAT_003",
    hints: [
      {
        hint_order: 1,
        content: "Return only verified users.",
      },
      {
        hint_order: 2,
        content: "Filter using is_verified.",
      },
      {
        hint_order: 3,
        content: "Select id, full_name, email and sort by id.",
      },
    ],
  },
  {
    code: "CHAT_004",
    hints: [
      {
        hint_order: 1,
        content: "Only public channels are needed.",
      },
      {
        hint_order: 2,
        content: "Filter on the visibility column.",
      },
      {
        hint_order: 3,
        content:
          "Select channel columns and ORDER BY workspace_id, channel_name, id.",
      },
    ],
  },
  {
    code: "CHAT_005",
    hints: [
      {
        hint_order: 1,
        content: "Find users marked as bots.",
      },
      {
        hint_order: 2,
        content: "Use the is_bot column.",
      },
      {
        hint_order: 3,
        content: "Select id, full_name, username with WHERE is_bot = true.",
      },
    ],
  },
  {
    code: "CHAT_006",
    hints: [
      {
        hint_order: 1,
        content: "Count active members in each workspace.",
      },
      {
        hint_order: 2,
        content: "Filter membership_status before grouping.",
      },
      {
        hint_order: 3,
        content: "GROUP BY workspace_id and COUNT(*).",
      },
    ],
  },
  {
    code: "CHAT_007",
    hints: [
      {
        hint_order: 1,
        content: "Count channels per workspace.",
      },
      {
        hint_order: 2,
        content: "Group rows by workspace_id.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) from channels grouped by workspace_id.",
      },
    ],
  },
  {
    code: "CHAT_008",
    hints: [
      {
        hint_order: 1,
        content: "Only archived channels are needed.",
      },
      {
        hint_order: 2,
        content: "Use the is_archived flag.",
      },
      {
        hint_order: 3,
        content:
          "Select archived channels and ORDER BY archived_at DESC, id ASC.",
      },
    ],
  },
  {
    code: "CHAT_009",
    hints: [
      {
        hint_order: 1,
        content: "Look for messages that contain links.",
      },
      {
        hint_order: 2,
        content: "Exclude deleted messages too.",
      },
      {
        hint_order: 3,
        content: "Filter with contains_link = true and is_deleted = false.",
      },
    ],
  },
  {
    code: "CHAT_010",
    hints: [
      {
        hint_order: 1,
        content: "Count direct conversations only.",
      },
      {
        hint_order: 2,
        content: "Use the conversation_type column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE conversation_type = 'direct'.",
      },
    ],
  },
  {
    code: "CHAT_011",
    hints: [
      {
        hint_order: 1,
        content: "Only active pins should be listed.",
      },
      {
        hint_order: 2,
        content: "Use the is_active column from pinned_messages.",
      },
      {
        hint_order: 3,
        content:
          "Select pinned fields and ORDER BY pinned_at DESC, message_id ASC.",
      },
    ],
  },
  {
    code: "CHAT_012",
    hints: [
      {
        hint_order: 1,
        content: "Unread notifications have not been read yet.",
      },
      {
        hint_order: 2,
        content: "Filter on is_read.",
      },
      {
        hint_order: 3,
        content: "Use WHERE is_read = false and sort by created_at DESC.",
      },
    ],
  },
  {
    code: "CHAT_013",
    hints: [
      {
        hint_order: 1,
        content: "Find users currently online.",
      },
      {
        hint_order: 2,
        content: "Use the presence_status column.",
      },
      {
        hint_order: 3,
        content: "Filter WHERE presence_status = 'online'.",
      },
    ],
  },
  {
    code: "CHAT_014",
    hints: [
      {
        hint_order: 1,
        content: "Count only messages sent today.",
      },
      {
        hint_order: 2,
        content: "Compare sent_at to the current date.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE DATE(sent_at) = CURRENT_DATE.",
      },
    ],
  },
  {
    code: "CHAT_015",
    hints: [
      {
        hint_order: 1,
        content: "Count reactions by emoji.",
      },
      {
        hint_order: 2,
        content: "Group by emoji_code.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) from message_reactions grouped by emoji_code.",
      },
    ],
  },
  {
    code: "CHAT_016",
    hints: [
      {
        hint_order: 1,
        content: "Keep members who joined in the current month.",
      },
      {
        hint_order: 2,
        content: "Compare joined_at month to the current month.",
      },
      {
        hint_order: 3,
        content:
          "Use DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE).",
      },
    ],
  },
  {
    code: "CHAT_017",
    hints: [
      {
        hint_order: 1,
        content: "Count private channels in each workspace.",
      },
      {
        hint_order: 2,
        content: "Filter visibility first.",
      },
      {
        hint_order: 3,
        content: "WHERE visibility = 'private' then GROUP BY workspace_id.",
      },
    ],
  },
  {
    code: "CHAT_018",
    hints: [
      {
        hint_order: 1,
        content: "Only deleted messages should be listed.",
      },
      {
        hint_order: 2,
        content: "Use the is_deleted column.",
      },
      {
        hint_order: 3,
        content: "Select message fields with WHERE is_deleted = true.",
      },
    ],
  },
  {
    code: "CHAT_019",
    hints: [
      {
        hint_order: 1,
        content: "Find users with do-not-disturb enabled.",
      },
      {
        hint_order: 2,
        content: "Use the is_dnd_enabled column.",
      },
      {
        hint_order: 3,
        content:
          "Select user_id, snooze_until with WHERE is_dnd_enabled = true.",
      },
    ],
  },
  {
    code: "CHAT_020",
    hints: [
      {
        hint_order: 1,
        content: "Find users missing a profile image.",
      },
      {
        hint_order: 2,
        content: "Check for NULL values.",
      },
      {
        hint_order: 3,
        content: "Use WHERE profile_image_url IS NULL.",
      },
    ],
  },
  {
    code: "CHAT_021",
    hints: [
      {
        hint_order: 1,
        content: "Count non-deleted messages in each channel.",
      },
      {
        hint_order: 2,
        content: "Ignore rows without a channel_id.",
      },
      {
        hint_order: 3,
        content:
          "WHERE channel_id IS NOT NULL AND is_deleted = false, then GROUP BY channel_id.",
      },
    ],
  },
  {
    code: "CHAT_022",
    hints: [
      {
        hint_order: 1,
        content: "Replies have a parent message.",
      },
      {
        hint_order: 2,
        content: "Group by parent_message_id.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) where parent_message_id IS NOT NULL.",
      },
    ],
  },
  {
    code: "CHAT_023",
    hints: [
      {
        hint_order: 1,
        content: "Keep users created in the last 30 days.",
      },
      {
        hint_order: 2,
        content: "Compare created_at to a 30 day interval.",
      },
      {
        hint_order: 3,
        content: "Use WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'.",
      },
    ],
  },
  {
    code: "CHAT_024",
    hints: [
      {
        hint_order: 1,
        content: "Only active channel memberships are needed.",
      },
      {
        hint_order: 2,
        content: "Filter using membership_status.",
      },
      {
        hint_order: 3,
        content: "Select rows where membership_status = 'active'.",
      },
    ],
  },
  {
    code: "CHAT_025",
    hints: [
      {
        hint_order: 1,
        content: "Count attachments by type.",
      },
      {
        hint_order: 2,
        content: "Group by attachment_type.",
      },
      {
        hint_order: 3,
        content:
          "COUNT(*) from message_attachments grouped by attachment_type.",
      },
    ],
  },
  {
    code: "CHAT_026",
    hints: [
      {
        hint_order: 1,
        content: "Keep workspaces created this year.",
      },
      {
        hint_order: 2,
        content: "Compare the year part of created_at to the current year.",
      },
      {
        hint_order: 3,
        content:
          "Use DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE).",
      },
    ],
  },
  {
    code: "CHAT_027",
    hints: [
      {
        hint_order: 1,
        content: "Muted channel preferences are needed.",
      },
      {
        hint_order: 2,
        content: "Use the is_muted flag.",
      },
      {
        hint_order: 3,
        content:
          "Select rows from channel_notification_preferences where is_muted = true.",
      },
    ],
  },
  {
    code: "CHAT_028",
    hints: [
      {
        hint_order: 1,
        content: "Only pending invites should be returned.",
      },
      {
        hint_order: 2,
        content: "Filter on invite_status.",
      },
      {
        hint_order: 3,
        content: "Use WHERE invite_status = 'pending'.",
      },
    ],
  },
  {
    code: "CHAT_029",
    hints: [
      {
        hint_order: 1,
        content: "Look for moderation cases that are still open.",
      },
      {
        hint_order: 2,
        content: "Use the case_status column.",
      },
      {
        hint_order: 3,
        content:
          "Filter WHERE case_status = 'open' and sort by created_at DESC.",
      },
    ],
  },
  {
    code: "CHAT_030",
    hints: [
      {
        hint_order: 1,
        content: "Count only voice calls.",
      },
      {
        hint_order: 2,
        content: "Use the call_type column.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) with WHERE call_type = 'voice'.",
      },
    ],
  },
  {
    code: "CHAT_031",
    hints: [
      {
        hint_order: 1,
        content: "Find the most active channels by message count.",
      },
      {
        hint_order: 2,
        content: "Count non-deleted messages per channel.",
      },
      {
        hint_order: 3,
        content: "GROUP BY channel_id, ORDER BY count DESC, then LIMIT 5.",
      },
    ],
  },
  {
    code: "CHAT_032",
    hints: [
      {
        hint_order: 1,
        content: "A user may save many messages.",
      },
      {
        hint_order: 2,
        content: "Return each user only once.",
      },
      {
        hint_order: 3,
        content: "Use DISTINCT user_id from saved_messages.",
      },
    ],
  },
  {
    code: "CHAT_033",
    hints: [
      {
        hint_order: 1,
        content: "A message can have multiple attachments.",
      },
      {
        hint_order: 2,
        content: "Return each attached message only once.",
      },
      {
        hint_order: 3,
        content: "Use DISTINCT message_id from message_attachments.",
      },
    ],
  },
  {
    code: "CHAT_034",
    hints: [
      {
        hint_order: 1,
        content: "Find users inactive for more than 30 days.",
      },
      {
        hint_order: 2,
        content: "Compare last_seen_at to a 30 day cutoff.",
      },
      {
        hint_order: 3,
        content: "Use WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days'.",
      },
    ],
  },
  {
    code: "CHAT_035",
    hints: [
      {
        hint_order: 1,
        content: "Count participants in each call.",
      },
      {
        hint_order: 2,
        content: "Keep only calls with more than 2 participants.",
      },
      {
        hint_order: 3,
        content: "GROUP BY call_id and use HAVING COUNT(*) > 2.",
      },
    ],
  },
  {
    code: "CHAT_036",
    hints: [
      {
        hint_order: 1,
        content: "Count how many active workspaces each user belongs to.",
      },
      {
        hint_order: 2,
        content:
          "A user can appear multiple times, so count unique workspaces.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(DISTINCT workspace_id) with GROUP BY user_id.",
      },
    ],
  },
  {
    code: "CHAT_037",
    hints: [
      {
        hint_order: 1,
        content: "Count reactions for each message.",
      },
      {
        hint_order: 2,
        content: "Sort from highest reaction count to lowest.",
      },
      {
        hint_order: 3,
        content: "GROUP BY message_id, ORDER BY count DESC, LIMIT 10.",
      },
    ],
  },
  {
    code: "CHAT_038",
    hints: [
      {
        hint_order: 1,
        content: "Only unread notifications should be counted.",
      },
      {
        hint_order: 2,
        content: "Group those unread rows by user_id.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(*) with WHERE is_read = false.",
      },
    ],
  },
  {
    code: "CHAT_039",
    hints: [
      {
        hint_order: 1,
        content: "Count how many times each user was mentioned.",
      },
      {
        hint_order: 2,
        content: "The mentioned user id is the grouping key.",
      },
      {
        hint_order: 3,
        content: "GROUP BY mentioned_user_id and COUNT(*).",
      },
    ],
  },
  {
    code: "CHAT_040",
    hints: [
      {
        hint_order: 1,
        content: "First count replies for each parent message.",
      },
      {
        hint_order: 2,
        content: "Then average those reply counts.",
      },
      {
        hint_order: 3,
        content: "Use a CTE or subquery, then AVG(reply_count).",
      },
    ],
  },
  {
    code: "CHAT_041",
    hints: [
      {
        hint_order: 1,
        content: "Count non-deleted messages per sender.",
      },
      {
        hint_order: 2,
        content: "Sort by highest message count first.",
      },
      {
        hint_order: 3,
        content: "GROUP BY sender_member_id and LIMIT 10.",
      },
    ],
  },
  {
    code: "CHAT_042",
    hints: [
      {
        hint_order: 1,
        content: "Find channels with no matching messages.",
      },
      {
        hint_order: 2,
        content: "Start from channels and keep rows with zero joined messages.",
      },
      {
        hint_order: 3,
        content: "Use LEFT JOIN messages and HAVING COUNT(m.id) = 0.",
      },
    ],
  },
  {
    code: "CHAT_043",
    hints: [
      {
        hint_order: 1,
        content: "Start from active workspace members.",
      },
      {
        hint_order: 2,
        content: "Check which of them never sent a message.",
      },
      {
        hint_order: 3,
        content:
          "LEFT JOIN messages on sender_member_id and keep COUNT(m.id) = 0.",
      },
    ],
  },
  {
    code: "CHAT_044",
    hints: [
      {
        hint_order: 1,
        content: "First count messages in each channel.",
      },
      {
        hint_order: 2,
        content: "Then average those channel-level counts.",
      },
      {
        hint_order: 3,
        content: "Use a CTE or subquery with AVG(message_count).",
      },
    ],
  },
  {
    code: "CHAT_045",
    hints: [
      {
        hint_order: 1,
        content: "Count non-deleted messages per channel.",
      },
      {
        hint_order: 2,
        content: "Only keep channels above a threshold of 100.",
      },
      {
        hint_order: 3,
        content: "Use GROUP BY channel_id and HAVING COUNT(*) > 100.",
      },
    ],
  },
  {
    code: "CHAT_046",
    hints: [
      {
        hint_order: 1,
        content: "Find members who appear in both messages and reactions.",
      },
      {
        hint_order: 2,
        content: "You need the overlap between senders and reactors.",
      },
      {
        hint_order: 3,
        content: "JOIN on member id and use DISTINCT.",
      },
    ],
  },
  {
    code: "CHAT_047",
    hints: [
      {
        hint_order: 1,
        content: "Count non-deleted messages per workspace.",
      },
      {
        hint_order: 2,
        content: "Sort by total messages descending.",
      },
      {
        hint_order: 3,
        content: "GROUP BY workspace_id and LIMIT 10.",
      },
    ],
  },
  {
    code: "CHAT_048",
    hints: [
      {
        hint_order: 1,
        content: "First count reactions for each reacted message.",
      },
      {
        hint_order: 2,
        content: "Then average those counts.",
      },
      {
        hint_order: 3,
        content: "Use a CTE or subquery, then AVG(reaction_count).",
      },
    ],
  },
  {
    code: "CHAT_049",
    hints: [
      {
        hint_order: 1,
        content: "You need only private channels.",
      },
      {
        hint_order: 2,
        content:
          "Join channel memberships with channels, then filter active memberships.",
      },
      {
        hint_order: 3,
        content:
          "GROUP BY channel_id after filtering c.visibility = 'private' and membership_status = 'active'.",
      },
    ],
  },
  {
    code: "CHAT_050",
    hints: [
      {
        hint_order: 1,
        content: "Count active owners in each workspace.",
      },
      {
        hint_order: 2,
        content: "Filter both membership_status and workspace_role.",
      },
      {
        hint_order: 3,
        content:
          "Use WHERE membership_status = 'active' AND workspace_role = 'owner'.",
      },
    ],
  },
  {
    code: "CHAT_051",
    hints: [
      {
        hint_order: 1,
        content: "Count unique senders in each channel.",
      },
      {
        hint_order: 2,
        content: "A sender may post many times, so use DISTINCT.",
      },
      {
        hint_order: 3,
        content: "COUNT(DISTINCT sender_member_id) grouped by channel_id.",
      },
    ],
  },
  {
    code: "CHAT_052",
    hints: [
      {
        hint_order: 1,
        content: "Count how many active channels each member belongs to.",
      },
      {
        hint_order: 2,
        content: "Use unique channel ids per member.",
      },
      {
        hint_order: 3,
        content:
          "GROUP BY member_id and HAVING COUNT(DISTINCT channel_id) > 3.",
      },
    ],
  },
  {
    code: "CHAT_053",
    hints: [
      {
        hint_order: 1,
        content: "Find channels with no active memberships.",
      },
      {
        hint_order: 2,
        content: "Join only active channel_members rows.",
      },
      {
        hint_order: 3,
        content:
          "Use LEFT JOIN with membership_status = 'active' in the join condition, then HAVING COUNT(cm.id) = 0.",
      },
    ],
  },
  {
    code: "CHAT_054",
    hints: [
      {
        hint_order: 1,
        content: "Build two workspace-level metrics first.",
      },
      {
        hint_order: 2,
        content:
          "One is total non-deleted messages, the other is active member count.",
      },
      {
        hint_order: 3,
        content: "Join those counts and divide messages by active members.",
      },
    ],
  },
  {
    code: "CHAT_055",
    hints: [
      {
        hint_order: 1,
        content: "Count mentions per message.",
      },
      {
        hint_order: 2,
        content: "Sort by the highest mention count.",
      },
      {
        hint_order: 3,
        content: "GROUP BY message_id and LIMIT 10.",
      },
    ],
  },
  {
    code: "CHAT_056",
    hints: [
      {
        hint_order: 1,
        content:
          "A mention belongs to a message, and the message belongs to a workspace.",
      },
      {
        hint_order: 2,
        content: "Count distinct workspaces per mentioned user.",
      },
      {
        hint_order: 3,
        content:
          "JOIN message_mentions to messages, then COUNT(DISTINCT workspace_id).",
      },
    ],
  },
  {
    code: "CHAT_057",
    hints: [
      {
        hint_order: 1,
        content: "You need channels where many messages have attachments.",
      },
      {
        hint_order: 2,
        content: "Join attachments to messages to get the channel.",
      },
      {
        hint_order: 3,
        content:
          "COUNT(DISTINCT message_id) per channel and keep counts above 20.",
      },
    ],
  },
  {
    code: "CHAT_058",
    hints: [
      {
        hint_order: 1,
        content: "Count non-deleted messages per conversation.",
      },
      {
        hint_order: 2,
        content:
          "Only direct conversations are represented by non-NULL conversation_id here.",
      },
      {
        hint_order: 3,
        content: "GROUP BY conversation_id and LIMIT 10.",
      },
    ],
  },
  {
    code: "CHAT_059",
    hints: [
      {
        hint_order: 1,
        content: "Count muted channels per member.",
      },
      {
        hint_order: 2,
        content: "Only muted preferences should be counted.",
      },
      {
        hint_order: 3,
        content:
          "Use WHERE is_muted = true, GROUP BY member_id, HAVING COUNT(*) > 2.",
      },
    ],
  },
  {
    code: "CHAT_060",
    hints: [
      {
        hint_order: 1,
        content: "Count invite statuses per workspace in one query.",
      },
      {
        hint_order: 2,
        content: "You need separate counts for accepted and pending.",
      },
      {
        hint_order: 3,
        content:
          "Use COUNT(*) FILTER (WHERE invite_status = ...) grouped by workspace_id.",
      },
    ],
  },
  {
    code: "CHAT_061",
    hints: [
      {
        hint_order: 1,
        content: "Count messages per member for each day.",
      },
      {
        hint_order: 2,
        content: "Use DATE(sent_at) along with sender_member_id.",
      },
      {
        hint_order: 3,
        content:
          "GROUP BY sender_member_id and DATE(sent_at), then rank each member’s days.",
      },
    ],
  },
  {
    code: "CHAT_062",
    hints: [
      {
        hint_order: 1,
        content: "Find each member’s first message date in every workspace.",
      },
      {
        hint_order: 2,
        content: "Compare all message dates to the earliest one.",
      },
      {
        hint_order: 3,
        content:
          "Use MIN(sent_at) grouped by workspace_id and sender_member_id.",
      },
    ],
  },
  {
    code: "CHAT_063",
    hints: [
      {
        hint_order: 1,
        content:
          "You need the time gap between consecutive messages in a channel.",
      },
      {
        hint_order: 2,
        content: "Window functions help compare current and previous rows.",
      },
      {
        hint_order: 3,
        content:
          "Use LAG(sent_at) OVER (PARTITION BY channel_id ORDER BY sent_at).",
      },
    ],
  },
  {
    code: "CHAT_064",
    hints: [
      {
        hint_order: 1,
        content: "Find the first message sent by each member in a channel.",
      },
      {
        hint_order: 2,
        content: "Rank messages inside each channel-member group.",
      },
      {
        hint_order: 3,
        content:
          "Use ROW_NUMBER() OVER (PARTITION BY channel_id, sender_member_id ORDER BY sent_at).",
      },
    ],
  },
  {
    code: "CHAT_065",
    hints: [
      {
        hint_order: 1,
        content: "You need a running total of messages over time.",
      },
      {
        hint_order: 2,
        content: "Partition by channel and order by sent_at.",
      },
      {
        hint_order: 3,
        content:
          "Use COUNT(*) OVER (PARTITION BY channel_id ORDER BY sent_at).",
      },
    ],
  },
  {
    code: "CHAT_066",
    hints: [
      {
        hint_order: 1,
        content:
          "Compare each channel’s message count to the workspace average.",
      },
      {
        hint_order: 2,
        content: "First calculate channel-level counts.",
      },
      {
        hint_order: 3,
        content: "Use AVG(message_count) OVER (PARTITION BY workspace_id).",
      },
    ],
  },
  {
    code: "CHAT_067",
    hints: [
      {
        hint_order: 1,
        content: "Rank members by messages sent inside each workspace.",
      },
      {
        hint_order: 2,
        content: "Count messages per member first.",
      },
      {
        hint_order: 3,
        content:
          "Use DENSE_RANK() partitioned by workspace_id ordered by count DESC.",
      },
    ],
  },
  {
    code: "CHAT_068",
    hints: [
      {
        hint_order: 1,
        content: "You need the most recent message in each channel.",
      },
      {
        hint_order: 2,
        content: "Rank messages by sent_at descending.",
      },
      {
        hint_order: 3,
        content:
          "Use ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY sent_at DESC).",
      },
    ],
  },
  {
    code: "CHAT_069",
    hints: [
      {
        hint_order: 1,
        content: "Find channels where daily activity keeps increasing.",
      },
      {
        hint_order: 2,
        content: "Compare each day’s count to the previous day.",
      },
      {
        hint_order: 3,
        content: "Use LAG(daily_count) after grouping by channel and date.",
      },
    ],
  },
  {
    code: "CHAT_070",
    hints: [
      {
        hint_order: 1,
        content: "Track member message streaks across consecutive days.",
      },
      {
        hint_order: 2,
        content: "First build daily activity rows.",
      },
      {
        hint_order: 3,
        content:
          "Use ROW_NUMBER() with date difference logic for streak grouping.",
      },
    ],
  },
  {
    code: "CHAT_071",
    hints: [
      {
        hint_order: 1,
        content: "Find channels with the longest reply chains.",
      },
      {
        hint_order: 2,
        content: "Parent-child message relationships form a hierarchy.",
      },
      {
        hint_order: 3,
        content: "Use a recursive CTE starting from parent_message_id IS NULL.",
      },
    ],
  },
  {
    code: "CHAT_072",
    hints: [
      {
        hint_order: 1,
        content: "You need workspace-level daily message growth.",
      },
      {
        hint_order: 2,
        content: "Compare each day to the previous day in the same workspace.",
      },
      {
        hint_order: 3,
        content: "Use LAG() after grouping by workspace_id and date.",
      },
    ],
  },
  {
    code: "CHAT_073",
    hints: [
      {
        hint_order: 1,
        content: "Find top reaction-generating messages per channel.",
      },
      {
        hint_order: 2,
        content: "Count reactions for each message first.",
      },
      {
        hint_order: 3,
        content: "Use DENSE_RANK() partitioned by channel_id.",
      },
    ],
  },
  {
    code: "CHAT_074",
    hints: [
      {
        hint_order: 1,
        content: "You need cumulative active members by date.",
      },
      {
        hint_order: 2,
        content: "First derive first active date per member.",
      },
      {
        hint_order: 3,
        content:
          "Use COUNT(*) OVER (PARTITION BY workspace_id ORDER BY activity_date).",
      },
    ],
  },
  {
    code: "CHAT_075",
    hints: [
      {
        hint_order: 1,
        content: "Compare message count percentile inside each workspace.",
      },
      {
        hint_order: 2,
        content: "Use an ordered-set aggregate.",
      },
      {
        hint_order: 3,
        content:
          "Try PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count).",
      },
    ],
  },
  {
    code: "CHAT_076",
    hints: [
      {
        hint_order: 1,
        content: "Find the longest inactive gap for each member.",
      },
      {
        hint_order: 2,
        content: "Compare each message time to the previous one.",
      },
      {
        hint_order: 3,
        content: "Use LAG(sent_at) partitioned by sender_member_id.",
      },
    ],
  },
  {
    code: "CHAT_077",
    hints: [
      {
        hint_order: 1,
        content: "Find the busiest hour for each channel.",
      },
      {
        hint_order: 2,
        content: "Extract the hour from sent_at.",
      },
      {
        hint_order: 3,
        content:
          "GROUP BY channel_id and EXTRACT(HOUR FROM sent_at), then rank.",
      },
    ],
  },
  {
    code: "CHAT_078",
    hints: [
      {
        hint_order: 1,
        content: "Measure reaction growth week over week.",
      },
      {
        hint_order: 2,
        content: "Aggregate reactions by week first.",
      },
      {
        hint_order: 3,
        content: "Use DATE_TRUNC('week', created_at) and LAG().",
      },
    ],
  },
  {
    code: "CHAT_079",
    hints: [
      {
        hint_order: 1,
        content: "Find members whose activity increased 3 days in a row.",
      },
      {
        hint_order: 2,
        content: "Daily counts need previous-day comparison.",
      },
      {
        hint_order: 3,
        content: "Use LAG() and streak grouping logic.",
      },
    ],
  },
  {
    code: "CHAT_080",
    hints: [
      {
        hint_order: 1,
        content: "Find top channels by rolling 7-day average activity.",
      },
      {
        hint_order: 2,
        content: "Window frames are useful here.",
      },
      {
        hint_order: 3,
        content:
          "Use AVG(daily_count) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
      },
    ],
  },
  {
    code: "CHAT_081",
    hints: [
      {
        hint_order: 1,
        content: "Compare reply count vs top-level messages per channel.",
      },
      {
        hint_order: 2,
        content: "Use conditional counting.",
      },
      {
        hint_order: 3,
        content: "COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL).",
      },
    ],
  },
  {
    code: "CHAT_082",
    hints: [
      {
        hint_order: 1,
        content: "Find members active across the most channels.",
      },
      {
        hint_order: 2,
        content: "A member can post multiple times in one channel.",
      },
      {
        hint_order: 3,
        content: "COUNT(DISTINCT channel_id) grouped by sender_member_id.",
      },
    ],
  },
  {
    code: "CHAT_083",
    hints: [
      {
        hint_order: 1,
        content: "Find channels where weekend traffic exceeds weekday traffic.",
      },
      {
        hint_order: 2,
        content: "Separate weekend vs weekday counts.",
      },
      {
        hint_order: 3,
        content: "Use FILTER with EXTRACT(ISODOW FROM sent_at).",
      },
    ],
  },
  {
    code: "CHAT_084",
    hints: [
      {
        hint_order: 1,
        content: "Compare direct messages sent vs received.",
      },
      {
        hint_order: 2,
        content: "Group by user from both sender and recipient sides.",
      },
      {
        hint_order: 3,
        content: "Use UNION ALL or separate CTEs, then compare totals.",
      },
    ],
  },
  {
    code: "CHAT_085",
    hints: [
      {
        hint_order: 1,
        content:
          "Find workspaces with the highest retention after invite acceptance.",
      },
      {
        hint_order: 2,
        content: "Accepted invites should be compared with active members.",
      },
      {
        hint_order: 3,
        content: "Join invites and workspace_members, then calculate a ratio.",
      },
    ],
  },
  {
    code: "CHAT_086",
    hints: [
      {
        hint_order: 1,
        content: "Find members with above-average reply activity.",
      },
      {
        hint_order: 2,
        content: "Count replies per member first.",
      },
      {
        hint_order: 3,
        content: "Compare to AVG(reply_count) over all members.",
      },
    ],
  },
  {
    code: "CHAT_087",
    hints: [
      {
        hint_order: 1,
        content: "Find channels where reactions exceed messages.",
      },
      {
        hint_order: 2,
        content: "Build two counts per channel.",
      },
      {
        hint_order: 3,
        content: "Join message count and reaction count CTEs, then compare.",
      },
    ],
  },
  {
    code: "CHAT_088",
    hints: [
      {
        hint_order: 1,
        content: "Find users active in every workspace channel.",
      },
      {
        hint_order: 2,
        content: "Compare member’s distinct channel count to workspace total.",
      },
      {
        hint_order: 3,
        content:
          "Use COUNT(DISTINCT channel_id) and compare with total channels.",
      },
    ],
  },
  {
    code: "CHAT_089",
    hints: [
      {
        hint_order: 1,
        content: "Find members whose activity rank improved week over week.",
      },
      {
        hint_order: 2,
        content: "Rank each week separately first.",
      },
      {
        hint_order: 3,
        content: "Use DENSE_RANK() by week, then compare with LAG(rank).",
      },
    ],
  },
  {
    code: "CHAT_090",
    hints: [
      {
        hint_order: 1,
        content: "Find workspaces with strong growth momentum.",
      },
      {
        hint_order: 2,
        content: "Use consecutive weekly growth streaks.",
      },
      {
        hint_order: 3,
        content: "Combine LAG() with streak grouping logic.",
      },
    ],
  },
  {
    code: "CHAT_091",
    hints: [
      {
        hint_order: 1,
        content: "Compare message counts between two 30-day windows.",
      },
      {
        hint_order: 2,
        content: "Build current and previous period counts separately.",
      },
      {
        hint_order: 3,
        content: "Use two CTEs and subtract previous_count from current_count.",
      },
    ],
  },
  {
    code: "CHAT_092",
    hints: [
      {
        hint_order: 1,
        content: "You need thread depth and total replies.",
      },
      {
        hint_order: 2,
        content: "Message replies form a recursive hierarchy.",
      },
      {
        hint_order: 3,
        content: "Use a recursive CTE and compute MAX(depth) with COUNT(*).",
      },
    ],
  },
  {
    code: "CHAT_093",
    hints: [
      {
        hint_order: 1,
        content: "Interaction score combines multiple metrics.",
      },
      {
        hint_order: 2,
        content: "Count messages, reactions, and replies separately.",
      },
      {
        hint_order: 3,
        content: "Join the three channel-level aggregates and add them.",
      },
    ],
  },
  {
    code: "CHAT_094",
    hints: [
      {
        hint_order: 1,
        content: "Find members active in every workspace channel.",
      },
      {
        hint_order: 2,
        content:
          "Compare each member’s distinct channels to workspace total channels.",
      },
      {
        hint_order: 3,
        content: "Use COUNT(DISTINCT channel_id) = total_channels.",
      },
    ],
  },
  {
    code: "CHAT_095",
    hints: [
      {
        hint_order: 1,
        content: "Measure reply velocity over the last 7 days.",
      },
      {
        hint_order: 2,
        content: "Convert total replies into an hourly rate.",
      },
      {
        hint_order: 3,
        content: "Divide reply_count by 168 (7 * 24).",
      },
    ],
  },
  {
    code: "CHAT_096",
    hints: [
      {
        hint_order: 1,
        content: "Track mention counts week by week.",
      },
      {
        hint_order: 2,
        content: "Use LAG() to compare with the previous week.",
      },
      {
        hint_order: 3,
        content: "Detect streaks of increasing weekly mention counts.",
      },
    ],
  },
  {
    code: "CHAT_097",
    hints: [
      {
        hint_order: 1,
        content: "Compare both sides of each direct conversation pair.",
      },
      {
        hint_order: 2,
        content: "Normalize the pair using LEAST and GREATEST.",
      },
      {
        hint_order: 3,
        content: "Compare sender-side counts using ABS(MAX - MIN).",
      },
    ],
  },
  {
    code: "CHAT_098",
    hints: [
      {
        hint_order: 1,
        content: "Track workspace weekly message growth.",
      },
      {
        hint_order: 2,
        content: "Use week-over-week comparisons.",
      },
      {
        hint_order: 3,
        content:
          "Use LAG() and streak grouping for 4+ consecutive growth weeks.",
      },
    ],
  },
  {
    code: "CHAT_099",
    hints: [
      {
        hint_order: 1,
        content: "Find members above the 90th percentile.",
      },
      {
        hint_order: 2,
        content: "First calculate message counts per member.",
      },
      {
        hint_order: 3,
        content: "Use PERCENTILE_CONT(0.9) WITHIN GROUP.",
      },
    ],
  },
  {
    code: "CHAT_100",
    hints: [
      {
        hint_order: 1,
        content: "Find members active across multiple workspaces.",
      },
      {
        hint_order: 2,
        content: "Only count workspaces where they sent at least 50 messages.",
      },
      {
        hint_order: 3,
        content: "Use HAVING COUNT(*) >= 50, then count distinct workspaces.",
      },
    ],
  },
];

export const conceptFilters = [
  {
    code: "CHAT_001",
    concepts: ["aggregation", "count"],
  },
  {
    code: "CHAT_002",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "CHAT_003",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_004",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_005",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_006",
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
    code: "CHAT_007",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "CHAT_008",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_009",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_010",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "CHAT_011",
    concepts: ["sorting"],
  },
  {
    code: "CHAT_012",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_013",
    concepts: ["joins", "filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "CHAT_014",
    concepts: [
      "aggregation",
      "count",
      "filtering",
      "date_functions",
      "comparison",
    ],
  },
  {
    code: "CHAT_015",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "CHAT_016",
    concepts: ["filtering", "date_functions", "sorting", "comparison"],
  },
  {
    code: "CHAT_017",
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
    code: "CHAT_018",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_019",
    concepts: ["joins", "filtering", "distinct", "sorting", "comparison"],
  },
  {
    code: "CHAT_020",
    concepts: ["filtering", "null_handling", "sorting"],
  },
  {
    code: "CHAT_021",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_022",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_023",
    concepts: ["filtering", "date_functions", "sorting", "comparison"],
  },
  {
    code: "CHAT_024",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_025",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "CHAT_026",
    concepts: ["filtering", "date_functions", "sorting", "comparison"],
  },
  {
    code: "CHAT_027",
    concepts: ["filtering", "null_handling", "sorting"],
  },
  {
    code: "CHAT_028",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_029",
    concepts: ["filtering", "sorting", "comparison"],
  },
  {
    code: "CHAT_030",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  {
    code: "CHAT_031",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "CHAT_032",
    concepts: ["distinct", "sorting"],
  },
  {
    code: "CHAT_033",
    concepts: ["distinct", "sorting"],
  },
  {
    code: "CHAT_034",
    concepts: ["filtering", "date_functions", "sorting", "comparison"],
  },
  {
    code: "CHAT_035",
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
    code: "CHAT_036",
    concepts: [
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_037",
    concepts: ["aggregation", "count", "group_by", "sorting", "limit"],
  },
  {
    code: "CHAT_038",
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
    code: "CHAT_039",
    concepts: ["aggregation", "count", "group_by", "sorting"],
  },
  {
    code: "CHAT_040",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "average",
      "group_by",
      "filtering",
      "calculation",
    ],
  },
  {
    code: "CHAT_041",
    concepts: [
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
    code: "CHAT_042",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_043",
    concepts: [
      "joins",
      "left_join",
      "filtering",
      "distinct",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_044",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "average",
      "group_by",
      "filtering",
      "null_handling",
      "calculation",
    ],
  },
  {
    code: "CHAT_045",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_046",
    concepts: ["joins", "distinct", "sorting"],
  },
  {
    code: "CHAT_047",
    concepts: [
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
    code: "CHAT_048",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "average",
      "group_by",
      "calculation",
    ],
  },
  {
    code: "CHAT_049",
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
    code: "CHAT_050",
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
    code: "CHAT_051",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "CHAT_052",
    concepts: [
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_053",
    concepts: [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_054",
    concepts: [
      "cte",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_055",
    concepts: ["aggregation", "count", "group_by", "sorting", "limit"],
  },
  {
    code: "CHAT_056",
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
    code: "CHAT_057",
    concepts: [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_058",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
      "comparison",
    ],
  },
  {
    code: "CHAT_059",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_060",
    concepts: [
      "aggregation",
      "count",
      "group_by",
      "conditional_aggregation",
      "sorting",
    ],
  },
  {
    code: "CHAT_061",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "filtering",
      "comparison",
    ],
  },
  {
    code: "CHAT_062",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "filtering",
      "comparison",
    ],
  },
  {
    code: "CHAT_063",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "average",
      "group_by",
      "joins",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "CHAT_064",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "min",
      "date_difference",
      "date_functions",
      "arithmetic",
      "calculation",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_065",
    concepts: ["aggregation", "count", "group_by", "sorting", "limit"],
  },
  {
    code: "CHAT_066",
    concepts: [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "having",
      "conditional_aggregation",
      "arithmetic",
      "calculation",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_067",
    concepts: [
      "joins",
      "left_join",
      "distinct",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_068",
    concepts: [
      "filtering",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "trend_analysis",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_069",
    concepts: [
      "cte",
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
  {
    code: "CHAT_070",
    concepts: [
      "filtering",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_071",
    concepts: [
      "cte",
      "filtering",
      "distinct",
      "date_functions",
      "window_functions",
      "row_number",
      "partition_by",
      "aggregation",
      "count",
      "group_by",
      "having",
      "pattern_detection",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_072",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "min",
      "average",
      "date_difference",
      "date_functions",
      "arithmetic",
      "calculation",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_073",
    concepts: [
      "cte",
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "average",
      "group_by",
      "joins",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "CHAT_074",
    concepts: [
      "self_join",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_075",
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
  {
    code: "CHAT_076",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_077",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "max",
      "group_by",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_078",
    concepts: [
      "cte",
      "self_join",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "average",
      "group_by",
      "null_handling",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "CHAT_079",
    concepts: [
      "cte",
      "date_functions",
      "aggregation",
      "count",
      "sum",
      "group_by",
      "window_functions",
      "partition_by",
      "moving_average",
      "sorting",
    ],
  },
  {
    code: "CHAT_080",
    concepts: [
      "cte",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "lag",
      "lag_lead",
      "window_functions",
      "partition_by",
      "case_when",
      "row_number",
      "having",
      "pattern_detection",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_081",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "min",
      "ordered_set_aggregate",
      "percentile",
      "group_by",
      "date_difference",
      "date_functions",
      "arithmetic",
      "calculation",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_082",
    concepts: [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "count",
      "count_distinct",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_083",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "conditional_aggregation",
      "having",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_084",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "row_number",
      "window_functions",
      "partition_by",
      "group_by",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_085",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "average",
      "group_by",
      "null_handling",
      "filtering",
      "sorting",
      "comparison",
      "calculation",
    ],
  },
  {
    code: "CHAT_086",
    concepts: [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "max",
      "group_by",
      "null_handling",
      "filtering",
      "date_functions",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_087",
    concepts: [
      "cte",
      "self_join",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "conditional_aggregation",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_088",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "sum",
      "max",
      "group_by",
      "arithmetic",
      "calculation",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_089",
    concepts: [
      "cte",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "lag",
      "lag_lead",
      "window_functions",
      "partition_by",
      "row_number",
      "having",
      "pattern_detection",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_090",
    concepts: [
      "cte",
      "self_join",
      "joins",
      "ordered_set_aggregate",
      "percentile",
      "group_by",
      "date_difference",
      "date_functions",
      "arithmetic",
      "calculation",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_091",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "date_functions",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_092",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "max",
      "count",
      "distinct",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_093",
    concepts: [
      "cte",
      "joins",
      "aggregation",
      "count",
      "null_handling",
      "arithmetic",
      "calculation",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_094",
    concepts: [
      "cte",
      "aggregation",
      "count_distinct",
      "count",
      "group_by",
      "joins",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_095",
    concepts: [
      "cte",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "arithmetic",
      "calculation",
      "date_functions",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_096",
    concepts: [
      "cte",
      "joins",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "lag",
      "lag_lead",
      "window_functions",
      "partition_by",
      "case_when",
      "row_number",
      "having",
      "pattern_detection",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_097",
    concepts: [
      "cte",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "arithmetic",
      "calculation",
      "sorting",
      "limit",
    ],
  },
  {
    code: "CHAT_098",
    concepts: [
      "cte",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "lag",
      "lag_lead",
      "window_functions",
      "partition_by",
      "case_when",
      "row_number",
      "having",
      "pattern_detection",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_099",
    concepts: [
      "cte",
      "aggregation",
      "count",
      "ordered_set_aggregate",
      "percentile",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
    ],
  },
  {
    code: "CHAT_100",
    concepts: [
      "cte",
      "filtering",
      "aggregation",
      "count",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "limit",
      "comparison",
    ],
  },
];

export const solutions = [
  {
    code: "CHAT_001",
    approaches: [
      {
        approach_title: "COUNT rows",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT COUNT(*) AS total_users FROM users;",
        explanation:
          "## Approach\n\nCount all rows in `users`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one platform user.\n- `COUNT(*)` returns the total number of rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the shortest and clearest way to count all users.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(id) AS total_users FROM users;",
        explanation:
          "## Approach\n\nCount the primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So this produces the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for total row counting.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;",
        explanation:
          "## Approach\n\nCalculate the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;\n```\n\n## Explanation\n\n- The CTE computes the total user count.\n- The outer query selects that value.\n- This shape is useful if the query needs more logic later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "CHAT_002",
    approaches: [
      {
        approach_title: "Filter then count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS active_workspaces FROM workspaces WHERE is_active = true;",
        explanation:
          "## Approach\n\nKeep only active workspaces, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_workspaces\nFROM workspaces\nWHERE is_active = true;\n```\n\n## Explanation\n\n- `WHERE is_active = true` filters to active workspaces only.\n- `COUNT(*)` counts those filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is explicit and easy to read.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) AS active_workspaces FROM workspaces WHERE is_active;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_workspaces\nFROM workspaces\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- Only active workspaces are counted.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for learners.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_workspaces FROM workspaces;",
        explanation:
          "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_workspaces\nFROM workspaces;\n```\n\n## Explanation\n\n- `FILTER` tells `COUNT(*)` to include only active rows.\n- This pattern is useful when computing multiple conditional counts in one query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
    ],
  },
  {
    code: "CHAT_003",
    approaches: [
      {
        approach_title: "Simple filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, email FROM users WHERE is_verified = true ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter verified users and sort by id.\n\n## Query\n\n```sql\nSELECT id, full_name, email\nFROM users\nWHERE is_verified = true\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_verified = true` keeps only verified users.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` matches the required ordering.\n\n## Why this is optimal\n\nIt is the clearest way to express the filter and ordering.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, full_name, email FROM users WHERE is_verified ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand to filter verified users.\n\n## Query\n\n```sql\nSELECT id, full_name, email\nFROM users\nWHERE is_verified\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_verified` means only rows where the boolean is true.\n- The result is the same as an explicit comparison.\n\n## Difference from the optimal approach\n\nIt is shorter, but less explicit.",
      },
      {
        approach_title: "CTE verified",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH verified_users AS (\n  SELECT id, full_name, email\n  FROM users\n  WHERE is_verified = true\n)\nSELECT id, full_name, email\nFROM verified_users\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nSeparate the filter step into a CTE.\n\n## Query\n\n```sql\nWITH verified_users AS (\n  SELECT id, full_name, email\n  FROM users\n  WHERE is_verified = true\n)\nSELECT id, full_name, email\nFROM verified_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates verified users first.\n- The outer query applies the final ordering.\n- This is useful if more transformations are added later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on.",
      },
    ],
  },
  {
    code: "CHAT_004",
    approaches: [
      {
        approach_title: "Filter public",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, channel_name FROM channels WHERE visibility = 'public' ORDER BY workspace_id ASC, channel_name ASC, id ASC;",
        explanation:
          "## Approach\n\nKeep only public channels, then sort them.\n\n## Query\n\n```sql\nSELECT id, workspace_id, channel_name\nFROM channels\nWHERE visibility = 'public'\nORDER BY workspace_id ASC, channel_name ASC, id ASC;\n```\n\n## Explanation\n\n- `visibility = 'public'` filters to public channels.\n- The query returns the required columns only.\n- The ordering matches the expected sort order exactly.\n\n## Why this is optimal\n\nIt is direct, readable, and matches the requirement exactly.",
      },
      {
        approach_title: "IN filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, channel_name FROM channels WHERE visibility IN ('public') ORDER BY workspace_id ASC, channel_name ASC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` even though there is only one value.\n\n## Query\n\n```sql\nSELECT id, workspace_id, channel_name\nFROM channels\nWHERE visibility IN ('public')\nORDER BY workspace_id ASC, channel_name ASC, id ASC;\n```\n\n## Explanation\n\n- `IN ('public')` behaves the same as `= 'public'` here.\n- The final rows and ordering remain unchanged.\n\n## Difference from the optimal approach\n\nIt works, but `=` is simpler for a single value.",
      },
      {
        approach_title: "CTE public",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH public_channels AS (\n  SELECT id, workspace_id, channel_name\n  FROM channels\n  WHERE visibility = 'public'\n)\nSELECT id, workspace_id, channel_name\nFROM public_channels\nORDER BY workspace_id ASC, channel_name ASC, id ASC;",
        explanation:
          "## Approach\n\nFirst isolate public channels in a CTE.\n\n## Query\n\n```sql\nWITH public_channels AS (\n  SELECT id, workspace_id, channel_name\n  FROM channels\n  WHERE visibility = 'public'\n)\nSELECT id, workspace_id, channel_name\nFROM public_channels\nORDER BY workspace_id ASC, channel_name ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE captures the filtered rows first.\n- The outer query handles the output ordering.\n- This pattern is useful when later joins or calculations are needed.\n\n## Difference from the optimal approach\n\nMore verbose, but more expandable.",
      },
    ],
  },
  {
    code: "CHAT_005",
    approaches: [
      {
        approach_title: "Filter bots",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, username FROM users WHERE is_bot = true ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter bot users and sort by id.\n\n## Query\n\n```sql\nSELECT id, full_name, username\nFROM users\nWHERE is_bot = true\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_bot = true` keeps only bot accounts.\n- The selected columns match the required output.\n- `ORDER BY id ASC` ensures the correct ordering.\n\n## Why this is optimal\n\nIt is explicit and easy for learners to understand.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, full_name, username FROM users WHERE is_bot ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand to filter bot users.\n\n## Query\n\n```sql\nSELECT id, full_name, username\nFROM users\nWHERE is_bot\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_bot` keeps rows where the boolean is true.\n- This returns the same set of bot users.\n\n## Difference from the optimal approach\n\nShorter, but less explicit.",
      },
      {
        approach_title: "CTE bots",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH bot_users AS (\n  SELECT id, full_name, username\n  FROM users\n  WHERE is_bot = true\n)\nSELECT id, full_name, username\nFROM bot_users\nORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut the filtered bot rows into a CTE first.\n\n## Query\n\n```sql\nWITH bot_users AS (\n  SELECT id, full_name, username\n  FROM users\n  WHERE is_bot = true\n)\nSELECT id, full_name, username\nFROM bot_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates bot users.\n- The outer query returns them in sorted order.\n- This shape becomes helpful if later logic depends on bot users.\n\n## Difference from the optimal approach\n\nMore verbose, but structured for extension.",
      },
    ],
  },
  {
    code: "CHAT_006",
    approaches: [
      {
        approach_title: "Group active members",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_id, COUNT(*) AS active_member_count FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ORDER BY active_member_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nFilter to active memberships, then count rows per workspace.\n\n## Query\n\n```sql\nSELECT workspace_id, COUNT(*) AS active_member_count\nFROM workspace_members\nWHERE membership_status = 'active'\nGROUP BY workspace_id\nORDER BY active_member_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- `WHERE membership_status = 'active'` keeps only active memberships.\n- `GROUP BY workspace_id` creates one group per workspace.\n- `COUNT(*)` returns the active member count for each workspace.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nFiltering before grouping makes the intent very clear.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT workspace_id, COUNT(*) FILTER (WHERE membership_status = 'active') AS active_member_count FROM workspace_members GROUP BY workspace_id HAVING COUNT(*) FILTER (WHERE membership_status = 'active') > 0 ORDER BY active_member_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nGroup memberships by workspace, count only active memberships, and remove workspaces with zero active members.\n\n## Query\n\n```sql\nSELECT workspace_id,\n       COUNT(*) FILTER (WHERE membership_status = 'active') AS active_member_count\nFROM workspace_members\nGROUP BY workspace_id\nHAVING COUNT(*) FILTER (WHERE membership_status = 'active') > 0\nORDER BY active_member_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The query groups memberships by workspace.\n- `FILTER` counts only rows where `membership_status = 'active'`.\n- `HAVING` removes workspaces that have no active members.\n- The ordering matches the required result.\n\n## Difference from the optimal approach\n\nThis is useful when combining multiple conditional counts, but for one metric, filtering in `WHERE` is simpler.",
      },
      {
        approach_title: "CTE active counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_active_counts AS (\n  SELECT workspace_id, COUNT(*) AS active_member_count\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY workspace_id\n)\nSELECT workspace_id, active_member_count\nFROM workspace_active_counts\nORDER BY active_member_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCompute active membership counts in a CTE.\n\n## Query\n\n```sql\nWITH workspace_active_counts AS (\n  SELECT workspace_id, COUNT(*) AS active_member_count\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY workspace_id\n)\nSELECT workspace_id, active_member_count\nFROM workspace_active_counts\nORDER BY active_member_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates counts per workspace.\n- The outer query applies the required sort order.\n- This pattern is useful if the counts are reused later.\n\n## Difference from the optimal approach\n\nMore verbose, but modular.",
      },
    ],
  },
  {
    code: "CHAT_007",
    approaches: [
      {
        approach_title: "Group channels",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ORDER BY total_channels DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nGroup channels by workspace and count them.\n\n## Query\n\n```sql\nSELECT workspace_id, COUNT(*) AS total_channels\nFROM channels\nGROUP BY workspace_id\nORDER BY total_channels DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY workspace_id` forms one group per workspace.\n- `COUNT(*)` counts all channels in each workspace.\n- The alias matches the required output.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt is the simplest way to count channels per workspace.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT workspace_id, COUNT(id) AS total_channels FROM channels GROUP BY workspace_id ORDER BY total_channels DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCount channel ids instead of all rows.\n\n## Query\n\n```sql\nSELECT workspace_id, COUNT(id) AS total_channels\nFROM channels\nGROUP BY workspace_id\nORDER BY total_channels DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- `id` is a non-NULL primary key.\n- So `COUNT(id)` returns the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_channel_totals AS (\n  SELECT workspace_id, COUNT(*) AS total_channels\n  FROM channels\n  GROUP BY workspace_id\n)\nSELECT workspace_id, total_channels\nFROM workspace_channel_totals\nORDER BY total_channels DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCalculate channel totals first in a CTE.\n\n## Query\n\n```sql\nWITH workspace_channel_totals AS (\n  SELECT workspace_id, COUNT(*) AS total_channels\n  FROM channels\n  GROUP BY workspace_id\n)\nSELECT workspace_id, total_channels\nFROM workspace_channel_totals\nORDER BY total_channels DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The CTE computes counts per workspace.\n- The outer query returns them in the required order.\n- This is useful when the totals need to be joined later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "CHAT_008",
    approaches: [
      {
        approach_title: "Filter archived",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, channel_name, archived_at FROM channels WHERE is_archived = true ORDER BY archived_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only archived channels and sort by archive time.\n\n## Query\n\n```sql\nSELECT id, workspace_id, channel_name, archived_at\nFROM channels\nWHERE is_archived = true\nORDER BY archived_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_archived = true` filters to archived channels.\n- The selected columns match the expected output.\n- `ORDER BY archived_at DESC, id ASC` matches the required ordering.\n\n## Why this is optimal\n\nIt directly expresses the condition and the sort order.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, channel_name, archived_at FROM channels WHERE is_archived ORDER BY archived_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand to filter archived channels.\n\n## Query\n\n```sql\nSELECT id, workspace_id, channel_name, archived_at\nFROM channels\nWHERE is_archived\nORDER BY archived_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_archived` keeps only rows where the boolean is true.\n- The result is the same as the explicit comparison.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for learners.",
      },
      {
        approach_title: "CTE archived",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH archived_channels AS (\n  SELECT id, workspace_id, channel_name, archived_at\n  FROM channels\n  WHERE is_archived = true\n)\nSELECT id, workspace_id, channel_name, archived_at\nFROM archived_channels\nORDER BY archived_at DESC, id ASC;",
        explanation:
          "## Approach\n\nPlace archived channels in a CTE first.\n\n## Query\n\n```sql\nWITH archived_channels AS (\n  SELECT id, workspace_id, channel_name, archived_at\n  FROM channels\n  WHERE is_archived = true\n)\nSELECT id, workspace_id, channel_name, archived_at\nFROM archived_channels\nORDER BY archived_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates archived channels.\n- The outer query applies the final ordering.\n- This becomes useful if later logic needs only archived channels.\n\n## Difference from the optimal approach\n\nMore verbose, but nicely structured.",
      },
    ],
  },
  {
    code: "CHAT_009",
    approaches: [
      {
        approach_title: "Filter links",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, sender_member_id, sent_at FROM messages WHERE contains_link = true AND is_deleted = false ORDER BY sent_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only non-deleted messages that contain links.\n\n## Query\n\n```sql\nSELECT id, workspace_id, sender_member_id, sent_at\nFROM messages\nWHERE contains_link = true\n  AND is_deleted = false\nORDER BY sent_at DESC, id ASC;\n```\n\n## Explanation\n\n- `contains_link = true` keeps messages containing links.\n- `is_deleted = false` removes deleted messages.\n- The query returns the expected columns.\n- The ordering matches the requirement exactly.\n\n## Why this is optimal\n\nIt is the clearest expression of both conditions.",
      },
      {
        approach_title: "Boolean shorthand",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, sender_member_id, sent_at FROM messages WHERE contains_link AND NOT is_deleted ORDER BY sent_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand for both conditions.\n\n## Query\n\n```sql\nSELECT id, workspace_id, sender_member_id, sent_at\nFROM messages\nWHERE contains_link\n  AND NOT is_deleted\nORDER BY sent_at DESC, id ASC;\n```\n\n## Explanation\n\n- `contains_link` means only rows where the flag is true.\n- `NOT is_deleted` means only rows where the deletion flag is false.\n- The result is the same.\n\n## Difference from the optimal approach\n\nCompact, but less explicit for practice.",
      },
      {
        approach_title: "CTE link messages",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH link_messages AS (\n  SELECT id, workspace_id, sender_member_id, sent_at\n  FROM messages\n  WHERE contains_link = true\n    AND is_deleted = false\n)\nSELECT id, workspace_id, sender_member_id, sent_at\nFROM link_messages\nORDER BY sent_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter the relevant messages in a CTE first.\n\n## Query\n\n```sql\nWITH link_messages AS (\n  SELECT id, workspace_id, sender_member_id, sent_at\n  FROM messages\n  WHERE contains_link = true\n    AND is_deleted = false\n)\nSELECT id, workspace_id, sender_member_id, sent_at\nFROM link_messages\nORDER BY sent_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates non-deleted link messages.\n- The outer query applies the final ordering.\n- This is helpful if later joins need only these messages.\n\n## Difference from the optimal approach\n\nMore verbose, but more modular.",
      },
    ],
  },
  {
    code: "CHAT_010",
    approaches: [
      {
        approach_title: "Count direct",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS direct_conversations_count FROM conversations WHERE conversation_type = 'direct';",
        explanation:
          "## Approach\n\nFilter to direct conversations, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS direct_conversations_count\nFROM conversations\nWHERE conversation_type = 'direct';\n```\n\n## Explanation\n\n- `conversation_type = 'direct'` keeps only direct conversations.\n- `COUNT(*)` counts those rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is the shortest and clearest solution.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) FILTER (WHERE conversation_type = 'direct') AS direct_conversations_count FROM conversations;",
        explanation:
          "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE conversation_type = 'direct') AS direct_conversations_count\nFROM conversations;\n```\n\n## Explanation\n\n- `FILTER` makes the count include only direct conversations.\n- This style is useful if you also want other conversation counts in the same query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one metric.",
      },
      {
        approach_title: "CTE direct count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH direct_conversations AS (\n  SELECT COUNT(*) AS direct_conversations_count\n  FROM conversations\n  WHERE conversation_type = 'direct'\n)\nSELECT direct_conversations_count\nFROM direct_conversations;",
        explanation:
          "## Approach\n\nCompute the direct conversation count in a CTE.\n\n## Query\n\n```sql\nWITH direct_conversations AS (\n  SELECT COUNT(*) AS direct_conversations_count\n  FROM conversations\n  WHERE conversation_type = 'direct'\n)\nSELECT direct_conversations_count\nFROM direct_conversations;\n```\n\n## Explanation\n\n- The CTE computes the total first.\n- The outer query returns the result.\n- This can be useful when the value is reused in a larger query.\n\n## Difference from the optimal approach\n\nMore verbose, but extensible.",
      },
    ],
  },
  {
    code: "CHAT_011",
    approaches: [
      {
        approach_title: "Direct pins",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM message_pins ORDER BY pinned_at DESC, message_id ASC;",
        explanation:
          "## Approach\n\nRead pinned rows directly from `message_pins` and sort them.\n\n## Query\n\n```sql\nSELECT message_id, channel_id, pinned_by_member_id, pinned_at\nFROM message_pins\nORDER BY pinned_at DESC, message_id ASC;\n```\n\n## Explanation\n\n- The schema stores pinned messages in `message_pins`.\n- There is no `is_active` column, so each row represents a currently pinned message.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt uses the correct table and returns exactly the required columns.",
      },
      {
        approach_title: "CTE pins",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH pinned_rows AS ( SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM message_pins ) SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM pinned_rows ORDER BY pinned_at DESC, message_id ASC;",
        explanation:
          "## Approach\n\nPut pinned rows in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH pinned_rows AS (\n  SELECT message_id, channel_id, pinned_by_member_id, pinned_at\n  FROM message_pins\n)\nSELECT message_id, channel_id, pinned_by_member_id, pinned_at\nFROM pinned_rows\nORDER BY pinned_at DESC, message_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the pinned message rows first.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nIt works, but adds an unnecessary layer.",
      },
      {
        approach_title: "Ordered select",
        approach_type: "sorting",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT mp.message_id, mp.channel_id, mp.pinned_by_member_id, mp.pinned_at FROM message_pins mp ORDER BY mp.pinned_at DESC, mp.message_id ASC;",
        explanation:
          "## Approach\n\nUse a table alias and sort the pinned rows.\n\n## Query\n\n```sql\nSELECT mp.message_id, mp.channel_id, mp.pinned_by_member_id, mp.pinned_at\nFROM message_pins mp\nORDER BY mp.pinned_at DESC, mp.message_id ASC;\n```\n\n## Explanation\n\n- This is the same logic as the main solution.\n- The alias just makes the query slightly more explicit.\n\n## Difference from the optimal approach\n\nEquivalent, but not simpler.",
      },
    ],
  },
  {
    code: "CHAT_012",
    approaches: [
      {
        approach_title: "Filter unread",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE is_read = false ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only unread notification rows and sort them.\n\n## Query\n\n```sql\nSELECT id, workspace_member_id, notification_type, created_at\nFROM notifications\nWHERE is_read = false\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The schema uses `workspace_member_id`, not `user_id`.\n- `is_read = false` filters to unread notifications.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt uses the correct column names and the clearest filter.",
      },
      {
        approach_title: "Not read",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE NOT is_read ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse boolean negation to keep unread rows.\n\n## Query\n\n```sql\nSELECT id, workspace_member_id, notification_type, created_at\nFROM notifications\nWHERE NOT is_read\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `NOT is_read` is equivalent to `is_read = false`.\n- The result and ordering remain the same.\n\n## Difference from the optimal approach\n\nIt works, but the explicit comparison is clearer.",
      },
      {
        approach_title: "CTE unread",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH unread_notifications AS ( SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE is_read = false ) SELECT id, workspace_member_id, notification_type, created_at FROM unread_notifications ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter unread notifications in a CTE first.\n\n## Query\n\n```sql\nWITH unread_notifications AS (\n  SELECT id, workspace_member_id, notification_type, created_at\n  FROM notifications\n  WHERE is_read = false\n)\nSELECT id, workspace_member_id, notification_type, created_at\nFROM unread_notifications\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates unread rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_013",
    approaches: [
      {
        approach_title: "Active online users",
        approach_type: "exists",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id, u.full_name, u.username, u.last_seen_at FROM users u WHERE EXISTS ( SELECT 1 FROM workspace_members wm JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE wm.user_id = u.id AND upl.presence_status = 'online' AND upl.ended_at IS NULL ) ORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;",
        explanation:
          "## Approach\n\nReturn users only when they have an active online presence row.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, u.username, u.last_seen_at\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM workspace_members wm\n  JOIN user_presence_logs upl\n    ON wm.id = upl.workspace_member_id\n  WHERE wm.user_id = u.id\n    AND upl.presence_status = 'online'\n    AND upl.ended_at IS NULL\n)\nORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;\n```\n\n## Explanation\n\n- Online status is stored in `user_presence_logs`.\n- `presence_status = 'online'` keeps online sessions.\n- `ended_at IS NULL` keeps only active sessions.\n- `EXISTS` avoids duplicate users naturally.\n- The output is ordered by latest activity first, then user id.\n\n## Why this is optimal\n\nIt returns one row per user without needing `DISTINCT`, making the result deterministic.",
      },
      {
        approach_title: "CTE online users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH online_users AS ( SELECT DISTINCT wm.user_id FROM workspace_members wm JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'online' AND upl.ended_at IS NULL ) SELECT u.id, u.full_name, u.username, u.last_seen_at FROM users u JOIN online_users ou ON u.id = ou.user_id ORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;",
        explanation:
          "## Approach\n\nFirst collect unique online user ids in a CTE, then join back to `users`.\n\n## Query\n\n```sql\nWITH online_users AS (\n  SELECT DISTINCT wm.user_id\n  FROM workspace_members wm\n  JOIN user_presence_logs upl\n    ON wm.id = upl.workspace_member_id\n  WHERE upl.presence_status = 'online'\n    AND upl.ended_at IS NULL\n)\nSELECT u.id, u.full_name, u.username, u.last_seen_at\nFROM users u\nJOIN online_users ou\n  ON u.id = ou.user_id\nORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;\n```\n\n## Explanation\n\n- The CTE finds each user who currently has an active online presence.\n- `DISTINCT wm.user_id` prevents duplicate user ids.\n- The outer query fetches user details.\n- The final `ORDER BY` matches the required ordering.\n\n## Difference from the optimal approach\n\nIt is valid and readable, but `EXISTS` avoids the extra CTE.",
      },
      {
        approach_title: "Grouped online users",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT u.id, u.full_name, u.username, u.last_seen_at FROM users u JOIN workspace_members wm ON u.id = wm.user_id JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'online' AND upl.ended_at IS NULL GROUP BY u.id, u.full_name, u.username, u.last_seen_at ORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;",
        explanation:
          "## Approach\n\nJoin through active online presence rows, then group by user columns to remove duplicates.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, u.username, u.last_seen_at\nFROM users u\nJOIN workspace_members wm\n  ON u.id = wm.user_id\nJOIN user_presence_logs upl\n  ON wm.id = upl.workspace_member_id\nWHERE upl.presence_status = 'online'\n  AND upl.ended_at IS NULL\nGROUP BY u.id, u.full_name, u.username, u.last_seen_at\nORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;\n```\n\n## Explanation\n\n- The joins find users with active online presence rows.\n- `GROUP BY` collapses duplicate user rows caused by multiple workspace memberships or presence logs.\n- The final ordering is deterministic.\n\n## Difference from the optimal approach\n\nIt works, but grouping is heavier than using `EXISTS` for this type of presence check.",
      },
    ],
  },
  {
    code: "CHAT_014",
    approaches: [
      {
        approach_title: "Date count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS messages_sent_today FROM messages WHERE DATE(sent_at) = CURRENT_DATE;",
        explanation:
          "## Approach\n\nConvert the timestamp to a date and compare it to today.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS messages_sent_today\nFROM messages\nWHERE DATE(sent_at) = CURRENT_DATE;\n```\n\n## Explanation\n\n- `DATE(sent_at)` extracts the calendar date from the timestamp.\n- `CURRENT_DATE` represents today.\n- `COUNT(*)` counts all messages sent on that date.\n\n## Why this is optimal\n\nIt is simple and easy for learners to understand.",
      },
      {
        approach_title: "Range filter",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) AS messages_sent_today FROM messages WHERE sent_at >= CURRENT_DATE AND sent_at < CURRENT_DATE + INTERVAL '1 day';",
        explanation:
          "## Approach\n\nFilter using an inclusive-exclusive timestamp range.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS messages_sent_today\nFROM messages\nWHERE sent_at >= CURRENT_DATE\n  AND sent_at < CURRENT_DATE + INTERVAL '1 day';\n```\n\n## Explanation\n\n- The query keeps timestamps from the start of today.\n- It excludes timestamps from tomorrow onward.\n- This is a standard way to filter one date range.\n\n## Difference from the optimal approach\n\nVery solid, but slightly more verbose for a basic question.",
      },
      {
        approach_title: "CTE today count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH today_messages AS (\n  SELECT COUNT(*) AS messages_sent_today\n  FROM messages\n  WHERE DATE(sent_at) = CURRENT_DATE\n)\nSELECT messages_sent_today\nFROM today_messages;",
        explanation:
          "## Approach\n\nCompute the daily count in a CTE first.\n\n## Query\n\n```sql\nWITH today_messages AS (\n  SELECT COUNT(*) AS messages_sent_today\n  FROM messages\n  WHERE DATE(sent_at) = CURRENT_DATE\n)\nSELECT messages_sent_today\nFROM today_messages;\n```\n\n## Explanation\n\n- The CTE calculates the count for today.\n- The outer query returns that single value.\n- This structure helps if later daily metrics are added.\n\n## Difference from the optimal approach\n\nMore verbose, but extensible.",
      },
    ],
  },
  {
    code: "CHAT_015",
    approaches: [
      {
        approach_title: "Group emoji",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT emoji_code, COUNT(*) AS reaction_count FROM message_reactions GROUP BY emoji_code ORDER BY reaction_count DESC, emoji_code ASC;",
        explanation:
          "## Approach\n\nGroup reactions by emoji and count each group.\n\n## Query\n\n```sql\nSELECT emoji_code, COUNT(*) AS reaction_count\nFROM message_reactions\nGROUP BY emoji_code\nORDER BY reaction_count DESC, emoji_code ASC;\n```\n\n## Explanation\n\n- `GROUP BY emoji_code` creates one group per emoji.\n- `COUNT(*)` returns how many times each emoji was used.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt is the most direct way to count usage per emoji.",
      },
      {
        approach_title: "COUNT emoji",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT emoji_code, COUNT(emoji_code) AS reaction_count FROM message_reactions GROUP BY emoji_code ORDER BY reaction_count DESC, emoji_code ASC;",
        explanation:
          "## Approach\n\nCount the grouped emoji values explicitly.\n\n## Query\n\n```sql\nSELECT emoji_code, COUNT(emoji_code) AS reaction_count\nFROM message_reactions\nGROUP BY emoji_code\nORDER BY reaction_count DESC, emoji_code ASC;\n```\n\n## Explanation\n\n- Within each emoji group, `COUNT(emoji_code)` counts non-NULL emoji values.\n- If `emoji_code` is always present, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for grouped row counts.",
      },
      {
        approach_title: "CTE reaction counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH emoji_reaction_counts AS (\n  SELECT emoji_code, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY emoji_code\n)\nSELECT emoji_code, reaction_count\nFROM emoji_reaction_counts\nORDER BY reaction_count DESC, emoji_code ASC;",
        explanation:
          "## Approach\n\nCompute emoji counts in a CTE.\n\n## Query\n\n```sql\nWITH emoji_reaction_counts AS (\n  SELECT emoji_code, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY emoji_code\n)\nSELECT emoji_code, reaction_count\nFROM emoji_reaction_counts\nORDER BY reaction_count DESC, emoji_code ASC;\n```\n\n## Explanation\n\n- The CTE calculates the count per emoji.\n- The outer query applies the output ordering.\n- This is useful if these counts are reused later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on.",
      },
    ],
  },
  {
    code: "CHAT_016",
    approaches: [
      {
        approach_title: "Month filter",
        approach_type: "date_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, user_id, joined_at FROM workspace_members WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE) ORDER BY joined_at DESC, id ASC;",
        explanation:
          "## Approach\n\nCompare the membership join month to the current month.\n\n## Query\n\n```sql\nSELECT id, workspace_id, user_id, joined_at\nFROM workspace_members\nWHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE)\nORDER BY joined_at DESC, id ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', joined_at)` normalizes each timestamp to its month.\n- `DATE_TRUNC('month', CURRENT_DATE)` gives the current month.\n- Matching both values keeps rows from the current month.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt is readable and clearly shows month-based filtering.",
      },
      {
        approach_title: "Month range",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, user_id, joined_at FROM workspace_members WHERE joined_at >= DATE_TRUNC('month', CURRENT_DATE) AND joined_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' ORDER BY joined_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a start-of-month to next-month range.\n\n## Query\n\n```sql\nSELECT id, workspace_id, user_id, joined_at\nFROM workspace_members\nWHERE joined_at >= DATE_TRUNC('month', CURRENT_DATE)\n  AND joined_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'\nORDER BY joined_at DESC, id ASC;\n```\n\n## Explanation\n\n- The first boundary is the start of the current month.\n- The second boundary is the start of next month.\n- This keeps only rows from the current month.\n\n## Difference from the optimal approach\n\nVery robust, but a little more verbose.",
      },
      {
        approach_title: "CTE joined month",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH current_month_members AS (\n  SELECT id, workspace_id, user_id, joined_at\n  FROM workspace_members\n  WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE)\n)\nSELECT id, workspace_id, user_id, joined_at\nFROM current_month_members\nORDER BY joined_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter current-month memberships in a CTE first.\n\n## Query\n\n```sql\nWITH current_month_members AS (\n  SELECT id, workspace_id, user_id, joined_at\n  FROM workspace_members\n  WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE)\n)\nSELECT id, workspace_id, user_id, joined_at\nFROM current_month_members\nORDER BY joined_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates memberships joined this month.\n- The outer query applies the required ordering.\n- This shape is useful if more joins are added later.\n\n## Difference from the optimal approach\n\nMore verbose, but modular.",
      },
    ],
  },
  {
    code: "CHAT_017",
    approaches: [
      {
        approach_title: "Filter private count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_id, COUNT(*) AS private_channels_count FROM channels WHERE visibility = 'private' GROUP BY workspace_id ORDER BY private_channels_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nFilter to private channels first, then count them per workspace.\n\n## Query\n\n```sql\nSELECT workspace_id, COUNT(*) AS private_channels_count\nFROM channels\nWHERE visibility = 'private'\nGROUP BY workspace_id\nORDER BY private_channels_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- `WHERE visibility = 'private'` removes non-private channels before grouping.\n- `GROUP BY workspace_id` returns only workspaces that have at least one private channel.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt avoids returning workspaces with zero private channels.",
      },
      {
        approach_title: "CTE private totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH private_channel_totals AS ( SELECT workspace_id, COUNT(*) AS private_channels_count FROM channels WHERE visibility = 'private' GROUP BY workspace_id ) SELECT workspace_id, private_channels_count FROM private_channel_totals ORDER BY private_channels_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCompute private channel totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH private_channel_totals AS (\n  SELECT workspace_id, COUNT(*) AS private_channels_count\n  FROM channels\n  WHERE visibility = 'private'\n  GROUP BY workspace_id\n)\nSELECT workspace_id, private_channels_count\nFROM private_channel_totals\nORDER BY private_channels_count DESC, workspace_id ASC;\n```\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_018",
    approaches: [
      {
        approach_title: "Filter deleted",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, sender_member_id, deleted_at FROM messages WHERE is_deleted = true ORDER BY deleted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only deleted messages and sort them by deletion time.\n\n## Query\n\n```sql\nSELECT id, workspace_id, sender_member_id, deleted_at\nFROM messages\nWHERE is_deleted = true\nORDER BY deleted_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_deleted = true` filters to deleted messages only.\n- The selected columns match the expected output.\n- The ordering matches the required sort order.\n\n## Why this is optimal\n\nIt is the simplest and clearest solution.",
      },
      {
        approach_title: "Boolean deleted",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, sender_member_id, deleted_at FROM messages WHERE is_deleted ORDER BY deleted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse boolean shorthand for deleted rows.\n\n## Query\n\n```sql\nSELECT id, workspace_id, sender_member_id, deleted_at\nFROM messages\nWHERE is_deleted\nORDER BY deleted_at DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_deleted` keeps rows where the deletion flag is true.\n- The result is the same as the explicit comparison.\n\n## Difference from the optimal approach\n\nShorter, but slightly less explicit.",
      },
      {
        approach_title: "CTE deleted",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH deleted_messages AS (\n  SELECT id, workspace_id, sender_member_id, deleted_at\n  FROM messages\n  WHERE is_deleted = true\n)\nSELECT id, workspace_id, sender_member_id, deleted_at\nFROM deleted_messages\nORDER BY deleted_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter deleted messages into a CTE first.\n\n## Query\n\n```sql\nWITH deleted_messages AS (\n  SELECT id, workspace_id, sender_member_id, deleted_at\n  FROM messages\n  WHERE is_deleted = true\n)\nSELECT id, workspace_id, sender_member_id, deleted_at\nFROM deleted_messages\nORDER BY deleted_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates deleted messages.\n- The outer query applies the final ordering.\n- This is helpful if later logic uses only deleted messages.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
    ],
  },
  {
    code: "CHAT_019",
    approaches: [
      {
        approach_title: "Active DND join",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT u.id AS user_id, upl.started_at AS dnd_started_at FROM users u JOIN workspace_members wm ON u.id = wm.user_id JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'dnd' AND upl.ended_at IS NULL ORDER BY dnd_started_at DESC, user_id ASC;",
        explanation:
          "## Approach\n\nJoin users to workspace memberships and active DND presence logs.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id AS user_id, upl.started_at AS dnd_started_at\nFROM users u\nJOIN workspace_members wm\n  ON u.id = wm.user_id\nJOIN user_presence_logs upl\n  ON wm.id = upl.workspace_member_id\nWHERE upl.presence_status = 'dnd'\n  AND upl.ended_at IS NULL\nORDER BY dnd_started_at DESC, user_id ASC;\n```\n\n## Explanation\n\n- DND state is stored in `user_presence_logs`.\n- `presence_status = 'dnd'` keeps DND sessions.\n- `ended_at IS NULL` keeps currently active sessions.\n- `DISTINCT` keeps unique user/session-start rows.\n\n## Why this is optimal\n\nIt matches the expected row grain: one row per distinct user and active DND start time.",
      },
      {
        approach_title: "CTE DND users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH dnd_users AS ( SELECT DISTINCT wm.user_id, upl.started_at AS dnd_started_at FROM workspace_members wm JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'dnd' AND upl.ended_at IS NULL ) SELECT user_id, dnd_started_at FROM dnd_users ORDER BY dnd_started_at DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCollect distinct active DND user/session-start rows in a CTE, then return them.\n\n## Query\n\n```sql\nWITH dnd_users AS (\n  SELECT DISTINCT wm.user_id, upl.started_at AS dnd_started_at\n  FROM workspace_members wm\n  JOIN user_presence_logs upl\n    ON wm.id = upl.workspace_member_id\n  WHERE upl.presence_status = 'dnd'\n    AND upl.ended_at IS NULL\n)\nSELECT user_id, dnd_started_at\nFROM dnd_users\nORDER BY dnd_started_at DESC, user_id ASC;\n```\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_020",
    approaches: [
      {
        approach_title: "Phone is null",
        approach_type: "null_handling",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, email FROM users WHERE phone IS NULL ORDER BY id ASC;",
        explanation:
          "## Approach\n\nKeep only users whose phone number is missing.\n\n## Query\n\n```sql\nSELECT id, full_name, email\nFROM users\nWHERE phone IS NULL\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The schema does not have `profile_image_url`, but `phone` is a nullable user field.\n- `IS NULL` is the correct SQL check for missing values.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt uses a real nullable column from the schema and keeps the query simple.",
      },
      {
        approach_title: "CASE phone",
        approach_type: "null_handling",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, full_name, email FROM users WHERE CASE WHEN phone IS NULL THEN true ELSE false END ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse a `CASE` expression to keep rows with missing phone numbers.\n\n## Query\n\n```sql\nSELECT id, full_name, email\nFROM users\nWHERE CASE WHEN phone IS NULL THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only when `phone` is NULL.\n- That keeps users without phone numbers.\n\n## Difference from the optimal approach\n\nIt works, but is unnecessarily verbose.",
      },
      {
        approach_title: "CTE null phones",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH users_without_phone AS ( SELECT id, full_name, email FROM users WHERE phone IS NULL ) SELECT id, full_name, email FROM users_without_phone ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users without phone numbers in a CTE first.\n\n## Query\n\n```sql\nWITH users_without_phone AS (\n  SELECT id, full_name, email\n  FROM users\n  WHERE phone IS NULL\n)\nSELECT id, full_name, email\nFROM users_without_phone\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates users missing phone numbers.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_021",
    approaches: [
      {
        approach_title: "Group messages",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nKeep only non-deleted channel messages, then count them per channel.\n\n## Query\n\n```sql\nSELECT channel_id, COUNT(*) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\n  AND is_deleted = false\nGROUP BY channel_id\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- `channel_id IS NOT NULL` keeps only channel messages.\n- `is_deleted = false` excludes deleted messages.\n- `GROUP BY channel_id` creates one group per channel.\n- `COUNT(*)` returns the message count for each channel.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the most direct way to count valid messages per channel.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT channel_id, COUNT(*) FILTER (WHERE is_deleted = false) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nGroup channel messages first, then count only non-deleted ones inside the aggregate.\n\n## Query\n\n```sql\nSELECT channel_id,\n       COUNT(*) FILTER (WHERE is_deleted = false) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\nGROUP BY channel_id\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- `WHERE channel_id IS NOT NULL` keeps only channel messages.\n- `FILTER` tells `COUNT(*)` to include only non-deleted rows.\n- This pattern is useful when calculating multiple conditional message counts together.\n\n## Difference from the optimal approach\n\nIt works well, but filtering before grouping is simpler for a single metric.",
      },
      {
        approach_title: "CTE channel totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, total_messages\nFROM channel_message_totals\nORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute channel totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, total_messages\nFROM channel_message_totals\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates non-deleted message counts per channel.\n- The outer query applies the required ordering.\n- This is useful if the counts need to be joined later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on.",
      },
    ],
  },
  {
    code: "CHAT_022",
    approaches: [
      {
        approach_title: "Group replies",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ORDER BY reply_count DESC, parent_message_id ASC;",
        explanation:
          "## Approach\n\nKeep only reply messages, then count them by parent message.\n\n## Query\n\n```sql\nSELECT parent_message_id, COUNT(*) AS reply_count\nFROM messages\nWHERE parent_message_id IS NOT NULL\nGROUP BY parent_message_id\nORDER BY reply_count DESC, parent_message_id ASC;\n```\n\n## Explanation\n\n- `parent_message_id IS NOT NULL` keeps only reply rows.\n- `GROUP BY parent_message_id` creates one group per parent message.\n- `COUNT(*)` returns the number of replies for each parent.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly answers the question with the fewest steps.",
      },
      {
        approach_title: "COUNT parent ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT parent_message_id, COUNT(parent_message_id) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ORDER BY reply_count DESC, parent_message_id ASC;",
        explanation:
          "## Approach\n\nCount the non-NULL parent ids inside each group.\n\n## Query\n\n```sql\nSELECT parent_message_id, COUNT(parent_message_id) AS reply_count\nFROM messages\nWHERE parent_message_id IS NOT NULL\nGROUP BY parent_message_id\nORDER BY reply_count DESC, parent_message_id ASC;\n```\n\n## Explanation\n\n- Since `parent_message_id` is filtered to non-NULL values, `COUNT(parent_message_id)` matches `COUNT(*)` here.\n- The final grouped result stays the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE reply totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH reply_totals AS (\n  SELECT parent_message_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n)\nSELECT parent_message_id, reply_count\nFROM reply_totals\nORDER BY reply_count DESC, parent_message_id ASC;",
        explanation:
          "## Approach\n\nCalculate reply counts in a CTE first.\n\n## Query\n\n```sql\nWITH reply_totals AS (\n  SELECT parent_message_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n)\nSELECT parent_message_id, reply_count\nFROM reply_totals\nORDER BY reply_count DESC, parent_message_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one reply count per parent message.\n- The outer query returns the sorted result.\n- This form is useful if reply totals need extra joins later.\n\n## Difference from the optimal approach\n\nMore verbose, but modular.",
      },
    ],
  },
  {
    code: "CHAT_023",
    approaches: [
      {
        approach_title: "Last 30 days",
        approach_type: "date_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, username, created_at FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter users created from the start of the date-based 30-day window.\n\n## Query\n\n```sql\nSELECT id, full_name, username, created_at\nFROM users\nWHERE created_at >= CURRENT_DATE - INTERVAL '30 days'\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `CURRENT_DATE` starts from midnight today.\n- This matches the expected date-window behavior.\n- `NOW()` is timestamp-based and can exclude rows earlier on the boundary date.\n\n## Why this is optimal\n\nIt matches the expected row count and deterministic ordering.",
      },
      {
        approach_title: "CTE recent users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH recent_users AS ( SELECT id, full_name, username, created_at FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' ) SELECT id, full_name, username, created_at FROM recent_users ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter recent users in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH recent_users AS (\n  SELECT id, full_name, username, created_at\n  FROM users\n  WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'\n)\nSELECT id, full_name, username, created_at\nFROM recent_users\nORDER BY created_at DESC, id ASC;\n```\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_024",
    approaches: [
      {
        approach_title: "Order members",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, channel_id, workspace_member_id, joined_at FROM channel_members ORDER BY joined_at DESC, id ASC;",
        explanation:
          "## Approach\n\nReturn channel memberships directly and sort them by join time.\n\n## Query\n\n```sql\nSELECT id, channel_id, workspace_member_id, joined_at\nFROM channel_members\nORDER BY joined_at DESC, id ASC;\n```\n\n## Explanation\n\n- `channel_members` does not have `membership_status`.\n- Each row represents a channel membership.\n- Sort newest joins first, then use `id` as the tie-breaker.\n\n## Why this is optimal\n\nIt matches the actual schema and avoids filtering on a missing column.",
      },
      {
        approach_title: "CTE members",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_member_rows AS ( SELECT id, channel_id, workspace_member_id, joined_at FROM channel_members ) SELECT id, channel_id, workspace_member_id, joined_at FROM channel_member_rows ORDER BY joined_at DESC, id ASC;",
        explanation:
          "## Approach\n\nPlace channel memberships in a CTE, then sort them.\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_025",
    approaches: [
      {
        approach_title: "Group types",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT attachment_type, COUNT(*) AS attachment_count FROM message_attachments GROUP BY attachment_type ORDER BY attachment_count DESC, attachment_type ASC;",
        explanation:
          "## Approach\n\nGroup attachments by type and count each group.\n\n## Query\n\n```sql\nSELECT attachment_type, COUNT(*) AS attachment_count\nFROM message_attachments\nGROUP BY attachment_type\nORDER BY attachment_count DESC, attachment_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY attachment_type` creates one group per attachment type.\n- `COUNT(*)` returns how many attachments belong to each type.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the simplest grouped count solution.",
      },
      {
        approach_title: "COUNT type",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT attachment_type, COUNT(attachment_type) AS attachment_count FROM message_attachments GROUP BY attachment_type ORDER BY attachment_count DESC, attachment_type ASC;",
        explanation:
          "## Approach\n\nCount the grouped attachment type values explicitly.\n\n## Query\n\n```sql\nSELECT attachment_type, COUNT(attachment_type) AS attachment_count\nFROM message_attachments\nGROUP BY attachment_type\nORDER BY attachment_count DESC, attachment_type ASC;\n```\n\n## Explanation\n\n- Within each group, `COUNT(attachment_type)` counts non-NULL type values.\n- If `attachment_type` is always present, it matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
      {
        approach_title: "CTE type totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH attachment_type_totals AS (\n  SELECT attachment_type, COUNT(*) AS attachment_count\n  FROM message_attachments\n  GROUP BY attachment_type\n)\nSELECT attachment_type, attachment_count\nFROM attachment_type_totals\nORDER BY attachment_count DESC, attachment_type ASC;",
        explanation:
          "## Approach\n\nCompute attachment counts in a CTE first.\n\n## Query\n\n```sql\nWITH attachment_type_totals AS (\n  SELECT attachment_type, COUNT(*) AS attachment_count\n  FROM message_attachments\n  GROUP BY attachment_type\n)\nSELECT attachment_type, attachment_count\nFROM attachment_type_totals\nORDER BY attachment_count DESC, attachment_type ASC;\n```\n\n## Explanation\n\n- The CTE calculates one count per attachment type.\n- The outer query returns the sorted result.\n- This is useful if the totals need later joins.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
    ],
  },
  {
    code: "CHAT_026",
    approaches: [
      {
        approach_title: "Year filter",
        approach_type: "date_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_name, created_at FROM workspaces WHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE) ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nCompare each workspace creation year to the current year.\n\n## Query\n\n```sql\nSELECT id, workspace_name, created_at\nFROM workspaces\nWHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE)\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('year', created_at)` normalizes each timestamp to the start of its year.\n- Matching it with the current year keeps only workspaces created this year.\n- The output ordering matches the requirement.\n\n## Why this is optimal\n\nIt is readable and clearly shows year-based filtering.",
      },
      {
        approach_title: "Year range",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_name, created_at FROM workspaces WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE) AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year' ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse a start-of-year to next-year range.\n\n## Query\n\n```sql\nSELECT id, workspace_name, created_at\nFROM workspaces\nWHERE created_at >= DATE_TRUNC('year', CURRENT_DATE)\n  AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The first boundary is the start of the current year.\n- The second boundary is the start of next year.\n- This keeps only rows from the current year.\n\n## Difference from the optimal approach\n\nVery solid, but slightly more verbose.",
      },
      {
        approach_title: "CTE year workspaces",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH current_year_workspaces AS (\n  SELECT id, workspace_name, created_at\n  FROM workspaces\n  WHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE)\n)\nSELECT id, workspace_name, created_at\nFROM current_year_workspaces\nORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter current-year workspaces in a CTE.\n\n## Query\n\n```sql\nWITH current_year_workspaces AS (\n  SELECT id, workspace_name, created_at\n  FROM workspaces\n  WHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE)\n)\nSELECT id, workspace_name, created_at\nFROM current_year_workspaces\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates workspaces created this year.\n- The outer query applies the required ordering.\n- This is useful if later logic needs only current-year workspaces.\n\n## Difference from the optimal approach\n\nMore verbose, but modular.",
      },
    ],
  },
  {
    code: "CHAT_027",
    approaches: [
      {
        approach_title: "Mute until set",
        approach_type: "null_handling",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_member_id, channel_id, mute_until FROM notification_preferences WHERE mute_until IS NOT NULL ORDER BY mute_until DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only notification preference rows where a mute expiry is set.\n\n## Query\n\n```sql\nSELECT id, workspace_member_id, channel_id, mute_until\nFROM notification_preferences\nWHERE mute_until IS NOT NULL\nORDER BY mute_until DESC, id ASC;\n```\n\n## Explanation\n\n- The actual table is `notification_preferences`.\n- The schema does not use `is_muted`; muting is represented by `mute_until` having a value.\n- The selected columns match the corrected expected output.\n- The ordering matches the required sort.\n\n## Why this is optimal\n\nIt uses the real table and the correct mute-state logic from the schema.",
      },
      {
        approach_title: "CTE muted prefs",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH muted_preferences AS ( SELECT id, workspace_member_id, channel_id, mute_until FROM notification_preferences WHERE mute_until IS NOT NULL ) SELECT id, workspace_member_id, channel_id, mute_until FROM muted_preferences ORDER BY mute_until DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter muted preference rows in a CTE first.\n\n## Query\n\n```sql\nWITH muted_preferences AS (\n  SELECT id, workspace_member_id, channel_id, mute_until\n  FROM notification_preferences\n  WHERE mute_until IS NOT NULL\n)\nSELECT id, workspace_member_id, channel_id, mute_until\nFROM muted_preferences\nORDER BY mute_until DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates muted preference rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt works, but adds an unnecessary layer.",
      },
      {
        approach_title: "Alias muted",
        approach_type: "sorting",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT np.id, np.workspace_member_id, np.channel_id, np.mute_until FROM notification_preferences np WHERE np.mute_until IS NOT NULL ORDER BY np.mute_until DESC, np.id ASC;",
        explanation:
          "## Approach\n\nUse a table alias and sort muted notification preference rows.\n\n## Query\n\n```sql\nSELECT np.id, np.workspace_member_id, np.channel_id, np.mute_until\nFROM notification_preferences np\nWHERE np.mute_until IS NOT NULL\nORDER BY np.mute_until DESC, np.id ASC;\n```\n\n## Explanation\n\n- This is the same logic as the optimal solution.\n- The alias only makes the table reference explicit.\n\n## Difference from the optimal approach\n\nEquivalent, but not simpler.",
      },
    ],
  },
  {
    code: "CHAT_028",
    approaches: [
      {
        approach_title: "Filter pending",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status = 'pending' ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only pending invite rows and sort them.\n\n## Query\n\n```sql\nSELECT id, workspace_id, invited_email, created_at\nFROM invites\nWHERE invite_status = 'pending'\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The actual table is `invites`, not `workspace_invites`.\n- The schema uses `invited_email`, not `email`, and `created_at`, not `invited_at`.\n- `invite_status = 'pending'` keeps only pending invites.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt uses the correct table and real column names from the schema.",
      },
      {
        approach_title: "IN pending",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status IN ('pending') ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with a single invite status.\n\n## Query\n\n```sql\nSELECT id, workspace_id, invited_email, created_at\nFROM invites\nWHERE invite_status IN ('pending')\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('pending')` behaves the same as `= 'pending'` here.\n- The same rows are returned in the same order.\n\n## Difference from the optimal approach\n\nIt works, but `=` is simpler for one value.",
      },
      {
        approach_title: "CTE invites",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH pending_invites AS ( SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status = 'pending' ) SELECT id, workspace_id, invited_email, created_at FROM pending_invites ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter pending invites in a CTE first.\n\n## Query\n\n```sql\nWITH pending_invites AS (\n  SELECT id, workspace_id, invited_email, created_at\n  FROM invites\n  WHERE invite_status = 'pending'\n)\nSELECT id, workspace_id, invited_email, created_at\nFROM pending_invites\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates pending invite rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_029",
    approaches: [
      {
        approach_title: "Filter applied",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status = 'applied' ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nKeep only moderation actions that are currently applied.\n\n## Query\n\n```sql\nSELECT id, workspace_id, target_member_id, target_message_id, created_at\nFROM moderation_actions\nWHERE action_status = 'applied'\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The actual table is `moderation_actions`, not `moderation_cases`.\n- The schema uses `action_status`, not `case_status`.\n- The available target columns are `target_member_id` and `target_message_id`.\n- The ordering matches the required output.\n\n## Why this is optimal\n\nIt uses the correct moderation table and real status column from the schema.",
      },
      {
        approach_title: "IN applied",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status IN ('applied') ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with a single moderation status.\n\n## Query\n\n```sql\nSELECT id, workspace_id, target_member_id, target_message_id, created_at\nFROM moderation_actions\nWHERE action_status IN ('applied')\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('applied')` behaves the same as `= 'applied'` here.\n- The same moderation rows are returned.\n\n## Difference from the optimal approach\n\nIt works, but the equality check is simpler.",
      },
      {
        approach_title: "CTE actions",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH applied_actions AS ( SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status = 'applied' ) SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM applied_actions ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter applied moderation actions in a CTE first.\n\n## Query\n\n```sql\nWITH applied_actions AS (\n  SELECT id, workspace_id, target_member_id, target_message_id, created_at\n  FROM moderation_actions\n  WHERE action_status = 'applied'\n)\nSELECT id, workspace_id, target_member_id, target_message_id, created_at\nFROM applied_actions\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates currently applied moderation actions.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_030",
    approaches: [
      {
        approach_title: "Count voice",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT COUNT(*) AS voice_calls_count FROM calls WHERE call_type = 'voice';",
        explanation:
          "## Approach\n\nKeep only voice calls, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS voice_calls_count\nFROM calls\nWHERE call_type = 'voice';\n```\n\n## Explanation\n\n- `call_type = 'voice'` filters to voice calls only.\n- `COUNT(*)` returns how many such rows exist.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is the shortest and clearest solution.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COUNT(*) FILTER (WHERE call_type = 'voice') AS voice_calls_count FROM calls;",
        explanation:
          "## Approach\n\nApply the voice condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE call_type = 'voice') AS voice_calls_count\nFROM calls;\n```\n\n## Explanation\n\n- `FILTER` makes `COUNT(*)` include only voice call rows.\n- This is helpful when multiple conditional call counts are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one metric.",
      },
      {
        approach_title: "CTE voice count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH voice_call_totals AS (\n  SELECT COUNT(*) AS voice_calls_count\n  FROM calls\n  WHERE call_type = 'voice'\n)\nSELECT voice_calls_count\nFROM voice_call_totals;",
        explanation:
          "## Approach\n\nCompute the voice call count in a CTE first.\n\n## Query\n\n```sql\nWITH voice_call_totals AS (\n  SELECT COUNT(*) AS voice_calls_count\n  FROM calls\n  WHERE call_type = 'voice'\n)\nSELECT voice_calls_count\nFROM voice_call_totals;\n```\n\n## Explanation\n\n- The CTE calculates the total number of voice calls.\n- The outer query returns that value.\n- This can be useful if the count is reused later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
    ],
  },
  {
    code: "CHAT_031",
    approaches: [
      {
        approach_title: "Count and limit",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC LIMIT 5;",
        explanation:
          "## Approach\n\nCount non-deleted channel messages, sort by the count, then keep the top 5.\n\n## Query\n\n```sql\nSELECT channel_id, COUNT(*) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\n  AND is_deleted = false\nGROUP BY channel_id\nORDER BY total_messages DESC, channel_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `channel_id IS NOT NULL` keeps only channel messages.\n- `is_deleted = false` excludes deleted rows.\n- `GROUP BY channel_id` creates one group per channel.\n- `COUNT(*)` returns the message total for each channel.\n- `ORDER BY ... LIMIT 5` gives the top 5 most active channels.\n\n## Why this is optimal\n\nIt is the most direct way to get the top channels by message count.",
      },
      {
        approach_title: "CTE top channels",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, total_messages\nFROM channel_message_totals\nORDER BY total_messages DESC, channel_id ASC\nLIMIT 5;",
        explanation:
          "## Approach\n\nCompute channel totals first, then sort and limit.\n\n## Query\n\n```sql\nWITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, total_messages\nFROM channel_message_totals\nORDER BY total_messages DESC, channel_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE calculates the count per channel.\n- The outer query applies the ranking order and keeps only 5 rows.\n- This structure is useful if the totals are reused later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend.",
      },
      {
        approach_title: "Rank rows",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), ranked_channels AS (\n  SELECT channel_id, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, channel_id ASC) AS rn\n  FROM channel_message_totals\n)\nSELECT channel_id, total_messages\nFROM ranked_channels\nWHERE rn <= 5\nORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount first, then assign row numbers based on the ranking order.\n\n## Query\n\n```sql\nWITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), ranked_channels AS (\n  SELECT channel_id, total_messages,\n         ROW_NUMBER() OVER (ORDER BY total_messages DESC, channel_id ASC) AS rn\n  FROM channel_message_totals\n)\nSELECT channel_id, total_messages\nFROM ranked_channels\nWHERE rn <= 5\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes message totals.\n- `ROW_NUMBER()` ranks channels from most active to least active.\n- The outer query keeps the first 5 ranked channels.\n\n## Difference from the optimal approach\n\nUseful for top-N logic, but more complex than necessary here.",
      },
    ],
  },
  {
    code: "CHAT_032",
    approaches: [
      {
        approach_title: "Distinct members",
        approach_type: "distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT workspace_member_id FROM saved_messages ORDER BY workspace_member_id ASC;",
        explanation:
          "## Approach\n\nReturn each workspace member only once from `saved_messages`.\n\n## Query\n\n```sql\nSELECT DISTINCT workspace_member_id\nFROM saved_messages\nORDER BY workspace_member_id ASC;\n```\n\n## Explanation\n\n- A workspace member can save many messages.\n- `DISTINCT workspace_member_id` removes duplicates.\n- The schema uses `workspace_member_id`, not `user_id`.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to list members who saved at least one message.",
      },
      {
        approach_title: "Group members",
        approach_type: "group_by",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT workspace_member_id FROM saved_messages GROUP BY workspace_member_id ORDER BY workspace_member_id ASC;",
        explanation:
          "## Approach\n\nGroup by workspace member so each one appears once.\n\n## Query\n\n```sql\nSELECT workspace_member_id\nFROM saved_messages\nGROUP BY workspace_member_id\nORDER BY workspace_member_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY workspace_member_id` collapses multiple saved rows for the same member into one group.\n- The result has one row per workspace member.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is more direct.",
      },
      {
        approach_title: "CTE saved members",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH saved_members AS ( SELECT DISTINCT workspace_member_id FROM saved_messages ) SELECT workspace_member_id FROM saved_members ORDER BY workspace_member_id ASC;",
        explanation:
          "## Approach\n\nFind distinct workspace members in a CTE, then return them.\n\n## Query\n\n```sql\nWITH saved_members AS (\n  SELECT DISTINCT workspace_member_id\n  FROM saved_messages\n)\nSELECT workspace_member_id\nFROM saved_members\nORDER BY workspace_member_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates members who saved at least one message.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable in larger queries.",
      },
    ],
  },
  {
    code: "CHAT_033",
    approaches: [
      {
        approach_title: "Distinct messages",
        approach_type: "distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT ma.message_id FROM message_attachments ma ORDER BY ma.message_id ASC;",
        explanation:
          "## Approach\n\nReturn each attached message only once.\n\n## Query\n\n```sql\nSELECT DISTINCT ma.message_id\nFROM message_attachments ma\nORDER BY ma.message_id ASC;\n```\n\n## Explanation\n\n- A message can have multiple attachments.\n- `DISTINCT` removes duplicate `message_id` values.\n- The result lists all messages that have at least one attachment.\n\n## Why this is optimal\n\nIt is the clearest way to return unique message ids from the attachment table.",
      },
      {
        approach_title: "Group messages",
        approach_type: "group_by",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ma.message_id FROM message_attachments ma GROUP BY ma.message_id ORDER BY ma.message_id ASC;",
        explanation:
          "## Approach\n\nGroup by message id so each message appears once.\n\n## Query\n\n```sql\nSELECT ma.message_id\nFROM message_attachments ma\nGROUP BY ma.message_id\nORDER BY ma.message_id ASC;\n```\n\n## Explanation\n\n- Grouping collapses multiple attachment rows for the same message.\n- The final result has one row per attached message.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is more direct.",
      },
      {
        approach_title: "EXISTS messages",
        approach_type: "exists",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT m.id AS message_id FROM messages m WHERE EXISTS (SELECT 1 FROM message_attachments ma WHERE ma.message_id = m.id) ORDER BY m.id ASC;",
        explanation:
          "## Approach\n\nReturn message ids from `messages` only when an attachment row exists.\n\n## Query\n\n```sql\nSELECT m.id AS message_id\nFROM messages m\nWHERE EXISTS (\n  SELECT 1\n  FROM message_attachments ma\n  WHERE ma.message_id = m.id\n)\nORDER BY m.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` checks whether a message has at least one attachment.\n- Each qualifying message is returned once.\n\n## Difference from the optimal approach\n\nUseful when starting from the parent table, but longer than selecting distinct ids directly.",
      },
    ],
  },
  {
    code: "CHAT_034",
    approaches: [
      {
        approach_title: "Inactive filter",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, full_name, last_seen_at FROM users WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days' ORDER BY last_seen_at ASC, id ASC;",
        explanation:
          "## Approach\n\nKeep users whose last seen time is older than 30 days.\n\n## Query\n\n```sql\nSELECT id, full_name, last_seen_at\nFROM users\nWHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days'\nORDER BY last_seen_at ASC, id ASC;\n```\n\n## Explanation\n\n- `CURRENT_DATE - INTERVAL '30 days'` gives the inactivity cutoff.\n- Users with `last_seen_at` before that are inactive for more than 30 days.\n- Sorting oldest activity first matches the expected order.\n\n## Why this is optimal\n\nIt is direct and easy to understand.",
      },
      {
        approach_title: "Date diff",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, full_name, last_seen_at FROM users WHERE CURRENT_DATE - DATE(last_seen_at) > 30 ORDER BY last_seen_at ASC, id ASC;",
        explanation:
          "## Approach\n\nCompare the number of days since the user's last seen date.\n\n## Query\n\n```sql\nSELECT id, full_name, last_seen_at\nFROM users\nWHERE CURRENT_DATE - DATE(last_seen_at) > 30\nORDER BY last_seen_at ASC, id ASC;\n```\n\n## Explanation\n\n- `DATE(last_seen_at)` extracts the calendar date.\n- Subtracting it from `CURRENT_DATE` gives the number of days since last activity.\n- Rows above 30 days are returned.\n\n## Difference from the optimal approach\n\nWorks, but the interval comparison is usually clearer.",
      },
      {
        approach_title: "CTE inactive users",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH inactive_users AS (\n  SELECT id, full_name, last_seen_at\n  FROM users\n  WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days'\n)\nSELECT id, full_name, last_seen_at\nFROM inactive_users\nORDER BY last_seen_at ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter inactive users in a CTE first.\n\n## Query\n\n```sql\nWITH inactive_users AS (\n  SELECT id, full_name, last_seen_at\n  FROM users\n  WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days'\n)\nSELECT id, full_name, last_seen_at\nFROM inactive_users\nORDER BY last_seen_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates inactive users.\n- The outer query applies the output ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the filtered set is reused.",
      },
    ],
  },
  {
    code: "CHAT_035",
    approaches: [
      {
        approach_title: "Group participants",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT call_id, COUNT(*) AS participant_count FROM call_participants GROUP BY call_id HAVING COUNT(*) > 2 ORDER BY participant_count DESC, call_id ASC;",
        explanation:
          "## Approach\n\nCount participants per call, then keep only calls with more than 2 participants.\n\n## Query\n\n```sql\nSELECT call_id, COUNT(*) AS participant_count\nFROM call_participants\nGROUP BY call_id\nHAVING COUNT(*) > 2\nORDER BY participant_count DESC, call_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY call_id` creates one group per call.\n- `COUNT(*)` returns how many participants each call had.\n- `HAVING COUNT(*) > 2` keeps only calls with more than 2 participants.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt is the standard pattern for grouped filtering.",
      },
      {
        approach_title: "CTE participant counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH call_counts AS (\n  SELECT call_id, COUNT(*) AS participant_count\n  FROM call_participants\n  GROUP BY call_id\n)\nSELECT call_id, participant_count\nFROM call_counts\nWHERE participant_count > 2\nORDER BY participant_count DESC, call_id ASC;",
        explanation:
          "## Approach\n\nCompute participant counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH call_counts AS (\n  SELECT call_id, COUNT(*) AS participant_count\n  FROM call_participants\n  GROUP BY call_id\n)\nSELECT call_id, participant_count\nFROM call_counts\nWHERE participant_count > 2\nORDER BY participant_count DESC, call_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates participant counts per call.\n- The outer query keeps only calls above the threshold.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the counts are reused.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT call_id, COUNT(call_id) AS participant_count FROM call_participants GROUP BY call_id HAVING COUNT(call_id) > 2 ORDER BY participant_count DESC, call_id ASC;",
        explanation:
          "## Approach\n\nCount non-NULL `call_id` values inside each group.\n\n## Query\n\n```sql\nSELECT call_id, COUNT(call_id) AS participant_count\nFROM call_participants\nGROUP BY call_id\nHAVING COUNT(call_id) > 2\nORDER BY participant_count DESC, call_id ASC;\n```\n\n## Explanation\n\n- Since `call_id` should be present for participant rows, `COUNT(call_id)` matches `COUNT(*)`.\n- The grouped result stays the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
    ],
  },
  {
    code: "CHAT_036",
    approaches: [
      {
        approach_title: "Distinct workspaces",
        approach_type: "count_distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count FROM workspace_members WHERE membership_status = 'active' GROUP BY user_id HAVING COUNT(DISTINCT workspace_id) > 1 ORDER BY workspace_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount distinct active workspaces per user, then keep users in more than one workspace.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count\nFROM workspace_members\nWHERE membership_status = 'active'\nGROUP BY user_id\nHAVING COUNT(DISTINCT workspace_id) > 1\nORDER BY workspace_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `membership_status = 'active'` keeps only active memberships.\n- `COUNT(DISTINCT workspace_id)` counts unique workspaces per user.\n- `HAVING ... > 1` filters to users in multiple workspaces.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt correctly handles duplicate membership rows by counting distinct workspaces.",
      },
      {
        approach_title: "CTE workspace counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_workspace_counts AS (\n  SELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY user_id\n)\nSELECT user_id, workspace_count\nFROM user_workspace_counts\nWHERE workspace_count > 1\nORDER BY workspace_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute the distinct workspace count in a CTE first.\n\n## Query\n\n```sql\nWITH user_workspace_counts AS (\n  SELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY user_id\n)\nSELECT user_id, workspace_count\nFROM user_workspace_counts\nWHERE workspace_count > 1\nORDER BY workspace_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one workspace count per user.\n- The outer query filters and sorts the result.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to reuse later.",
      },
      {
        approach_title: "Self join distinct",
        approach_type: "self_join",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT wm1.user_id, COUNT(DISTINCT wm1.workspace_id) AS workspace_count FROM workspace_members wm1 JOIN workspace_members wm2 ON wm1.user_id = wm2.user_id AND wm1.workspace_id <> wm2.workspace_id WHERE wm1.membership_status = 'active' AND wm2.membership_status = 'active' GROUP BY wm1.user_id ORDER BY workspace_count DESC, wm1.user_id ASC;",
        explanation:
          "## Approach\n\nJoin membership rows for the same user across different workspaces.\n\n## Query\n\n```sql\nSELECT wm1.user_id, COUNT(DISTINCT wm1.workspace_id) AS workspace_count\nFROM workspace_members wm1\nJOIN workspace_members wm2\n  ON wm1.user_id = wm2.user_id\n AND wm1.workspace_id <> wm2.workspace_id\nWHERE wm1.membership_status = 'active'\n  AND wm2.membership_status = 'active'\nGROUP BY wm1.user_id\nORDER BY workspace_count DESC, wm1.user_id ASC;\n```\n\n## Explanation\n\n- The self join finds users with at least two different active workspaces.\n- `COUNT(DISTINCT wm1.workspace_id)` returns how many workspaces those users belong to.\n\n## Difference from the optimal approach\n\nIt works, but it is more complex than a grouped distinct count.",
      },
    ],
  },
  {
    code: "CHAT_037",
    approaches: [
      {
        approach_title: "Group reactions",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ORDER BY reaction_count DESC, message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount reactions per message, sort by the count, then keep the top 10.\n\n## Query\n\n```sql\nSELECT message_id, COUNT(*) AS reaction_count\nFROM message_reactions\nGROUP BY message_id\nORDER BY reaction_count DESC, message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `GROUP BY message_id` creates one group per message.\n- `COUNT(*)` returns how many reactions each message received.\n- `ORDER BY ... LIMIT 10` gives the 10 most reacted messages.\n\n## Why this is optimal\n\nIt is the most direct top-N aggregate query.",
      },
      {
        approach_title: "CTE top reactions",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH message_reaction_totals AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n)\nSELECT message_id, reaction_count\nFROM message_reaction_totals\nORDER BY reaction_count DESC, message_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute reaction totals first, then sort and limit.\n\n## Query\n\n```sql\nWITH message_reaction_totals AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n)\nSELECT message_id, reaction_count\nFROM message_reaction_totals\nORDER BY reaction_count DESC, message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE computes the reaction count per message.\n- The outer query applies ranking and returns the top 10.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
      {
        approach_title: "Rank messages",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH message_reaction_totals AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n), ranked_messages AS (\n  SELECT message_id, reaction_count, ROW_NUMBER() OVER (ORDER BY reaction_count DESC, message_id ASC) AS rn\n  FROM message_reaction_totals\n)\nSELECT message_id, reaction_count\nFROM ranked_messages\nWHERE rn <= 10\nORDER BY reaction_count DESC, message_id ASC;",
        explanation:
          "## Approach\n\nCount reactions first, then assign a ranking.\n\n## Query\n\n```sql\nWITH message_reaction_totals AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n), ranked_messages AS (\n  SELECT message_id, reaction_count,\n         ROW_NUMBER() OVER (ORDER BY reaction_count DESC, message_id ASC) AS rn\n  FROM message_reaction_totals\n)\nSELECT message_id, reaction_count\nFROM ranked_messages\nWHERE rn <= 10\nORDER BY reaction_count DESC, message_id ASC;\n```\n\n## Explanation\n\n- The first step computes totals.\n- `ROW_NUMBER()` ranks messages by reaction count.\n- The outer query keeps the top 10 ranked rows.\n\n## Difference from the optimal approach\n\nGood for ranking logic, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_038",
    approaches: [
      {
        approach_title: "Group unread",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_member_id, COUNT(*) AS unread_count FROM notifications WHERE is_read = false GROUP BY workspace_member_id ORDER BY unread_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nFilter unread notifications first, then count them per workspace member.\n\n## Query\n\n```sql\nSELECT workspace_member_id, COUNT(*) AS unread_count\nFROM notifications\nWHERE is_read = false\nGROUP BY workspace_member_id\nORDER BY unread_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- `WHERE is_read = false` removes read notifications before grouping.\n- This returns only members with at least one unread notification.\n- `GROUP BY workspace_member_id` creates one row per member.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt avoids returning members with zero unread notifications.",
      },
      {
        approach_title: "CTE unread counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH unread_notification_counts AS ( SELECT workspace_member_id, COUNT(*) AS unread_count FROM notifications WHERE is_read = false GROUP BY workspace_member_id ) SELECT workspace_member_id, unread_count FROM unread_notification_counts ORDER BY unread_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute unread counts in a CTE first, then sort them.\n\n## Query\n\n```sql\nWITH unread_notification_counts AS (\n  SELECT workspace_member_id, COUNT(*) AS unread_count\n  FROM notifications\n  WHERE is_read = false\n  GROUP BY workspace_member_id\n)\nSELECT workspace_member_id, unread_count\nFROM unread_notification_counts\nORDER BY unread_count DESC, workspace_member_id ASC;\n```\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_039",
    approaches: [
      {
        approach_title: "Group mentions",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY mentioned_member_id ORDER BY mention_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCount mention rows per mentioned workspace member.\n\n## Query\n\n```sql\nSELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count\nFROM message_mentions\nGROUP BY mentioned_member_id\nORDER BY mention_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- Each row in `message_mentions` represents one mention event.\n- `COUNT(*)` counts every mention row, including rows where `mentioned_member_id` may be NULL.\n- `GROUP BY mentioned_member_id` creates one group per mentioned member value.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt matches the expected row grain and count behavior exactly.",
      },
      {
        approach_title: "CTE mention totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH mention_totals AS ( SELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY mentioned_member_id ) SELECT workspace_member_id, mention_count FROM mention_totals ORDER BY mention_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute mention counts in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH mention_totals AS (\n  SELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count\n  FROM message_mentions\n  GROUP BY mentioned_member_id\n)\nSELECT workspace_member_id, mention_count\nFROM mention_totals\nORDER BY mention_count DESC, workspace_member_id ASC;\n```\n\n## Difference from the optimal approach\n\nMore verbose, but valid.",
      },
    ],
  },
  {
    code: "CHAT_040",
    approaches: [
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH thread_replies AS ( SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread FROM thread_replies;",
        explanation:
          "## Approach\n\nFirst count replies per parent message, then average those counts.\n\n## Query\n\n```sql\nWITH thread_replies AS (\n  SELECT parent_message_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n)\nSELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread\nFROM thread_replies;\n```\n\n## Explanation\n\n- The CTE calculates the reply count for each thread root that has replies.\n- `AVG(reply_count)` computes the average replies per thread.\n- `ROUND(..., 2)` matches the expected output format.\n\n## Why this is optimal\n\nYou must aggregate twice here: once per thread, then across threads. The CTE makes that logic clear.",
      },
      {
        approach_title: "Subquery average",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread FROM ( SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) AS thread_replies;",
        explanation:
          "## Approach\n\nUse a derived table instead of a CTE.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread\nFROM (\n  SELECT parent_message_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n) AS thread_replies;\n```\n\n## Explanation\n\n- The inner query computes one reply count per parent message.\n- The outer query averages those counts.\n- This is logically the same as the CTE solution.\n\n## Difference from the optimal approach\n\nStill good, but the CTE is often easier for learners to read.",
      },
      {
        approach_title: "Nested CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH reply_counts AS (\n  SELECT parent_message_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), avg_reply_count AS (\n  SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread\n  FROM reply_counts\n)\nSELECT avg_replies_per_thread\nFROM avg_reply_count;",
        explanation:
          "## Approach\n\nBreak the two aggregation steps into separate CTEs.\n\n## Query\n\n```sql\nWITH reply_counts AS (\n  SELECT parent_message_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), avg_reply_count AS (\n  SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread\n  FROM reply_counts\n)\nSELECT avg_replies_per_thread\nFROM avg_reply_count;\n```\n\n## Explanation\n\n- The first CTE computes replies per thread.\n- The second CTE computes the average of those counts.\n- The final query returns the result.\n\n## Difference from the optimal approach\n\nClear, but more verbose than necessary.",
      },
    ],
  },
  {
    code: "CHAT_041",
    approaches: [
      {
        approach_title: "Group senders",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ORDER BY message_count DESC, sender_member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount non-deleted messages per sender, then keep the top 10.\n\n## Query\n\n```sql\nSELECT sender_member_id, COUNT(*) AS message_count\nFROM messages\nWHERE is_deleted = false\nGROUP BY sender_member_id\nORDER BY message_count DESC, sender_member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `is_deleted = false` keeps only valid messages.\n- `GROUP BY sender_member_id` creates one group per sender.\n- `COUNT(*)` returns how many messages each sender posted.\n- `ORDER BY ... LIMIT 10` returns the top 10 senders.\n\n## Why this is optimal\n\nIt is the most direct top-N aggregation for this question.",
      },
      {
        approach_title: "CTE sender totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH sender_message_totals AS (\n  SELECT sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY sender_member_id\n)\nSELECT sender_member_id, message_count\nFROM sender_message_totals\nORDER BY message_count DESC, sender_member_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute message totals per sender in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH sender_message_totals AS (\n  SELECT sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY sender_member_id\n)\nSELECT sender_member_id, message_count\nFROM sender_message_totals\nORDER BY message_count DESC, sender_member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one total per sender.\n- The outer query ranks and limits the result.\n- This shape is useful if the totals are reused later.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend.",
      },
      {
        approach_title: "Rank senders",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH sender_message_totals AS (\n  SELECT sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY sender_member_id\n), ranked_senders AS (\n  SELECT sender_member_id, message_count, ROW_NUMBER() OVER (ORDER BY message_count DESC, sender_member_id ASC) AS rn\n  FROM sender_message_totals\n)\nSELECT sender_member_id, message_count\nFROM ranked_senders\nWHERE rn <= 10\nORDER BY message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nCount messages first, then rank senders with a window function.\n\n## Query\n\n```sql\nWITH sender_message_totals AS (\n  SELECT sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY sender_member_id\n), ranked_senders AS (\n  SELECT sender_member_id, message_count,\n         ROW_NUMBER() OVER (ORDER BY message_count DESC, sender_member_id ASC) AS rn\n  FROM sender_message_totals\n)\nSELECT sender_member_id, message_count\nFROM ranked_senders\nWHERE rn <= 10\nORDER BY message_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The first step computes totals per sender.\n- `ROW_NUMBER()` ranks senders from highest to lowest count.\n- The outer query keeps the top 10 ranked rows.\n\n## Difference from the optimal approach\n\nUseful for ranking logic, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_042",
    approaches: [
      {
        approach_title: "Left join count",
        approach_type: "left_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN messages m ON c.id = m.channel_id GROUP BY c.id, c.workspace_id, c.channel_name HAVING COUNT(m.id) = 0 ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;",
        explanation:
          "## Approach\n\nLeft join channels to messages, then keep channels with no matching messages.\n\n## Query\n\n```sql\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nLEFT JOIN messages m\n  ON c.id = m.channel_id\nGROUP BY c.id, c.workspace_id, c.channel_name\nHAVING COUNT(m.id) = 0\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all channels, even when no message exists.\n- `COUNT(m.id) = 0` identifies channels without messages.\n- The grouping is needed because the join can create multiple rows per channel.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt clearly shows the parent-child relationship and handles empty matches correctly.",
      },
      {
        approach_title: "NOT EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT c.id, c.workspace_id, c.channel_name FROM channels c WHERE NOT EXISTS (SELECT 1 FROM messages m WHERE m.channel_id = c.id) ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;",
        explanation:
          "## Approach\n\nReturn channels only when no related message row exists.\n\n## Query\n\n```sql\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM messages m\n  WHERE m.channel_id = c.id\n)\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;\n```\n\n## Explanation\n\n- `NOT EXISTS` checks whether a channel has zero messages.\n- Each qualifying channel is returned once.\n- The ordering matches the expected result.\n\n## Difference from the optimal approach\n\nAlso very good, but the original solution stays closer to the structure of the expected query.",
      },
      {
        approach_title: "CTE message channels",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH used_channels AS (\n  SELECT DISTINCT channel_id\n  FROM messages\n  WHERE channel_id IS NOT NULL\n)\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nLEFT JOIN used_channels uc\n  ON c.id = uc.channel_id\nWHERE uc.channel_id IS NULL\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;",
        explanation:
          "## Approach\n\nFirst find channels that have messages, then keep the channels not in that set.\n\n## Query\n\n```sql\nWITH used_channels AS (\n  SELECT DISTINCT channel_id\n  FROM messages\n  WHERE channel_id IS NOT NULL\n)\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nLEFT JOIN used_channels uc\n  ON c.id = uc.channel_id\nWHERE uc.channel_id IS NULL\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;\n```\n\n## Explanation\n\n- The CTE lists all channels that have at least one message.\n- The `LEFT JOIN ... IS NULL` pattern keeps only unused channels.\n\n## Difference from the optimal approach\n\nMore steps, but useful when the child set needs separate processing.",
      },
    ],
  },
  {
    code: "CHAT_043",
    approaches: [
      {
        approach_title: "User-level NOT EXISTS",
        approach_type: "exists",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT wm.user_id FROM workspace_members wm WHERE wm.membership_status = 'active' AND NOT EXISTS ( SELECT 1 FROM workspace_members wm2 JOIN messages m ON wm2.id = m.sender_member_id WHERE wm2.user_id = wm.user_id AND wm2.membership_status = 'active' );",
        explanation:
          "## 🧠 Approach\n\nFind users who have at least one active workspace membership, but have never sent a message from any of their active memberships.\n\n## 🔍 Explanation\n\n- `workspace_members` is membership-level, not user-level.\n- A single user can have multiple active memberships.\n- The wrong version checked whether each individual membership had no messages, which incorrectly included users who had one silent membership but another membership with messages.\n- This fixed query checks at the user level.\n- The outer query finds active users through `workspace_members wm`.\n- The `NOT EXISTS` subquery checks whether the same user has any active membership that appears as a message sender.\n- If no such message exists, the user truly never sent messages from any active membership.\n- No final `ORDER BY` is used because the question does not require ordered output and `comparison_config` is empty.\n\n## ✅ Why this is correct\n\nIt matches the expected query semantics: group all active memberships by `user_id`, then keep only users where the total message count is zero.",
      },
      {
        approach_title: "CTE active users anti-join",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_users AS ( SELECT DISTINCT user_id FROM workspace_members WHERE membership_status = 'active' ), users_with_messages AS ( SELECT DISTINCT wm.user_id FROM workspace_members wm JOIN messages m ON wm.id = m.sender_member_id WHERE wm.membership_status = 'active' ) SELECT au.user_id FROM active_users au LEFT JOIN users_with_messages uwm ON au.user_id = uwm.user_id WHERE uwm.user_id IS NULL;",
        explanation:
          "## 🧠 Approach\n\nSeparate users into two sets: active users and active users who have sent messages. Then return active users missing from the second set.\n\n## 🔍 Explanation\n\n- `active_users` returns every user with at least one active membership.\n- `users_with_messages` returns users who sent at least one message from an active membership.\n- The final `LEFT JOIN ... IS NULL` is an anti-join.\n- It keeps only active users who do not appear in the message-sender set.\n- This avoids the membership-level bug from the previous solution.\n- No final `ORDER BY` is needed because output order is ignored for this question.\n\n## ⚖️ Difference from optimal approach\n\nThis is very readable because it makes both sets explicit, but the `NOT EXISTS` version is more direct.",
      },
      {
        approach_title: "Grouped user message count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT wm.user_id FROM workspace_members wm LEFT JOIN messages m ON wm.id = m.sender_member_id WHERE wm.membership_status = 'active' GROUP BY wm.user_id HAVING COUNT(m.id) = 0;",
        explanation:
          "## 🧠 Approach\n\nGroup active memberships by user and count how many messages were sent from those memberships.\n\n## 🔍 Explanation\n\n- The join connects each active membership to messages sent from that membership.\n- Grouping by `wm.user_id` combines all active memberships belonging to the same user.\n- `HAVING COUNT(m.id) = 0` keeps only users with zero messages across all active memberships.\n- This directly matches the expected query logic.\n- No final ordering is included because the question does not require sorted output.\n\n## ⚖️ Difference from optimal approach\n\nThis is closest to the expected query and easy to verify, while the `NOT EXISTS` version is usually a cleaner anti-join pattern.",
      },
    ],
  },
  {
    code: "CHAT_044",
    approaches: [
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH channel_message_counts AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel FROM channel_message_counts;",
        explanation:
          "## Approach\n\nFirst count messages per channel, then average those counts.\n\n## Query\n\n```sql\nWITH channel_message_counts AS (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel\nFROM channel_message_counts;\n```\n\n## Explanation\n\n- The CTE calculates one message count per channel.\n- `AVG(message_count)` computes the average across channels.\n- `ROUND(..., 2)` matches the expected output format.\n\n## Why this is optimal\n\nThis is a two-step aggregation, and the CTE makes that logic clear.",
      },
      {
        approach_title: "Subquery average",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel FROM ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) AS channel_message_counts;",
        explanation:
          "## Approach\n\nUse a derived table instead of a CTE.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel\nFROM (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n) AS channel_message_counts;\n```\n\n## Explanation\n\n- The inner query computes message totals per channel.\n- The outer query averages those totals.\n\n## Difference from the optimal approach\n\nStill good, but the CTE is often easier to read.",
      },
      {
        approach_title: "Nested CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_message_counts AS (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), avg_channel_messages AS (\n  SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel\n  FROM channel_message_counts\n)\nSELECT avg_messages_per_channel\nFROM avg_channel_messages;",
        explanation:
          "## Approach\n\nBreak the grouped count and average into separate CTEs.\n\n## Query\n\n```sql\nWITH channel_message_counts AS (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), avg_channel_messages AS (\n  SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel\n  FROM channel_message_counts\n)\nSELECT avg_messages_per_channel\nFROM avg_channel_messages;\n```\n\n## Explanation\n\n- The first CTE computes per-channel totals.\n- The second CTE computes the average.\n- The final query returns the single result.\n\n## Difference from the optimal approach\n\nClear, but more verbose than necessary.",
      },
    ],
  },
  {
    code: "CHAT_045",
    approaches: [
      {
        approach_title: "Having over 100",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id HAVING COUNT(*) > 100 ORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount non-deleted channel messages, then keep only channels above 100.\n\n## Query\n\n```sql\nSELECT channel_id, COUNT(*) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\n  AND is_deleted = false\nGROUP BY channel_id\nHAVING COUNT(*) > 100\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY channel_id` creates one group per channel.\n- `COUNT(*)` returns the message count per channel.\n- `HAVING COUNT(*) > 100` filters grouped results after aggregation.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nThis is the standard grouped-count-plus-threshold pattern.",
      },
      {
        approach_title: "CTE threshold",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, total_messages\nFROM channel_message_totals\nWHERE total_messages > 100\nORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute totals first, then apply the threshold outside.\n\n## Query\n\n```sql\nWITH channel_message_totals AS (\n  SELECT channel_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, total_messages\nFROM channel_message_totals\nWHERE total_messages > 100\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The CTE computes message totals per channel.\n- The outer query filters to channels above 100 and sorts them.\n\n## Difference from the optimal approach\n\nMore verbose, but handy when the totals are reused later.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT channel_id, COUNT(channel_id) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id HAVING COUNT(channel_id) > 100 ORDER BY total_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount non-NULL `channel_id` values inside each grouped channel.\n\n## Query\n\n```sql\nSELECT channel_id, COUNT(channel_id) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\n  AND is_deleted = false\nGROUP BY channel_id\nHAVING COUNT(channel_id) > 100\nORDER BY total_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- Because `channel_id` is filtered to non-NULL values, `COUNT(channel_id)` matches `COUNT(*)` here.\n- The grouped result is the same.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
    ],
  },
  {
    code: "CHAT_046",
    approaches: [
      {
        approach_title: "Join distinct",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT m.sender_member_id AS workspace_member_id FROM messages m JOIN message_reactions r ON m.sender_member_id = r.workspace_member_id ORDER BY workspace_member_id ASC;",
        explanation:
          "## Approach\n\nJoin message senders to reaction givers on the same workspace member id, then keep unique members.\n\n## Query\n\n```sql\nSELECT DISTINCT m.sender_member_id AS workspace_member_id\nFROM messages m\nJOIN message_reactions r\n  ON m.sender_member_id = r.workspace_member_id\nORDER BY workspace_member_id ASC;\n```\n\n## Explanation\n\n- `messages.sender_member_id` identifies the member who sent a message.\n- `message_reactions.workspace_member_id` identifies the member who added a reaction.\n- The join keeps members who appear in both tables.\n- `DISTINCT` removes duplicate rows caused by multiple messages or reactions.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to find the overlap between message senders and reactors.",
      },
      {
        approach_title: "Exists both",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT m.sender_member_id AS workspace_member_id FROM messages m WHERE EXISTS (SELECT 1 FROM message_reactions r WHERE r.workspace_member_id = m.sender_member_id) ORDER BY workspace_member_id ASC;",
        explanation:
          "## Approach\n\nStart from message senders and keep only those for whom a reaction row exists.\n\n## Query\n\n```sql\nSELECT DISTINCT m.sender_member_id AS workspace_member_id\nFROM messages m\nWHERE EXISTS (\n  SELECT 1\n  FROM message_reactions r\n  WHERE r.workspace_member_id = m.sender_member_id\n)\nORDER BY workspace_member_id ASC;\n```\n\n## Explanation\n\n- The outer query lists workspace members who sent messages.\n- `EXISTS` checks whether the same member also appears in `message_reactions`.\n- `DISTINCT` ensures each member appears once.\n\n## Difference from the optimal approach\n\nAlso valid, but the join expresses the overlap more directly.",
      },
      {
        approach_title: "Intersect sets",
        approach_type: "set_operations",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT sender_member_id AS workspace_member_id FROM messages INTERSECT SELECT workspace_member_id FROM message_reactions ORDER BY workspace_member_id ASC;",
        explanation:
          "## Approach\n\nBuild two member sets and keep only their intersection.\n\n## Query\n\n```sql\nSELECT sender_member_id AS workspace_member_id\nFROM messages\nINTERSECT\nSELECT workspace_member_id\nFROM message_reactions\nORDER BY workspace_member_id ASC;\n```\n\n## Explanation\n\n- The first query returns members who sent messages.\n- The second query returns members who reacted.\n- `INTERSECT` keeps only members present in both sets.\n- The final result is automatically distinct.\n\n## Difference from the optimal approach\n\nElegant, but joins are more commonly taught for this kind of overlap query.",
      },
    ],
  },
  {
    code: "CHAT_047",
    approaches: [
      {
        approach_title: "Group workspaces",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ORDER BY total_messages DESC, workspace_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount non-deleted messages per workspace, then keep the top 10.\n\n## Query\n\n```sql\nSELECT workspace_id, COUNT(*) AS total_messages\nFROM messages\nWHERE is_deleted = false\nGROUP BY workspace_id\nORDER BY total_messages DESC, workspace_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `is_deleted = false` excludes deleted messages.\n- `GROUP BY workspace_id` creates one group per workspace.\n- `COUNT(*)` returns the total messages in each workspace.\n- `LIMIT 10` keeps the top 10 workspaces.\n\n## Why this is optimal\n\nIt is the most direct workspace-level top-N count query.",
      },
      {
        approach_title: "CTE workspace totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH workspace_message_totals AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n)\nSELECT workspace_id, total_messages\nFROM workspace_message_totals\nORDER BY total_messages DESC, workspace_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute workspace totals first, then sort and limit.\n\n## Query\n\n```sql\nWITH workspace_message_totals AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n)\nSELECT workspace_id, total_messages\nFROM workspace_message_totals\nORDER BY total_messages DESC, workspace_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one total per workspace.\n- The outer query ranks them and keeps the top 10.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
      {
        approach_title: "Rank workspaces",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_message_totals AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n), ranked_workspaces AS (\n  SELECT workspace_id, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, workspace_id ASC) AS rn\n  FROM workspace_message_totals\n)\nSELECT workspace_id, total_messages\nFROM ranked_workspaces\nWHERE rn <= 10\nORDER BY total_messages DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCount messages per workspace first, then rank the workspaces.\n\n## Query\n\n```sql\nWITH workspace_message_totals AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n), ranked_workspaces AS (\n  SELECT workspace_id, total_messages,\n         ROW_NUMBER() OVER (ORDER BY total_messages DESC, workspace_id ASC) AS rn\n  FROM workspace_message_totals\n)\nSELECT workspace_id, total_messages\nFROM ranked_workspaces\nWHERE rn <= 10\nORDER BY total_messages DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The first step computes totals per workspace.\n- `ROW_NUMBER()` ranks workspaces by activity.\n- The outer query keeps the top 10.\n\n## Difference from the optimal approach\n\nGood for ranking workflows, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_048",
    approaches: [
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH reaction_counts AS ( SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ) SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count FROM reaction_counts;",
        explanation:
          "## Approach\n\nFirst count reactions per message, then average those counts.\n\n## Query\n\n```sql\nWITH reaction_counts AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n)\nSELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count\nFROM reaction_counts;\n```\n\n## Explanation\n\n- The CTE calculates one reaction count per reacted message.\n- `AVG(reaction_count)` computes the average across those messages.\n- `ROUND(..., 2)` matches the expected output.\n\n## Why this is optimal\n\nThis is a two-step aggregation, and the CTE keeps it clear.",
      },
      {
        approach_title: "Subquery average",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count FROM ( SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ) AS reaction_counts;",
        explanation:
          "## Approach\n\nUse a derived table to hold the per-message counts.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count\nFROM (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n) AS reaction_counts;\n```\n\n## Explanation\n\n- The inner query computes counts per message.\n- The outer query averages those counts.\n\n## Difference from the optimal approach\n\nStill good, but the CTE is usually easier to read.",
      },
      {
        approach_title: "Nested CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH reaction_counts AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n), avg_reactions AS (\n  SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count\n  FROM reaction_counts\n)\nSELECT avg_reaction_count\nFROM avg_reactions;",
        explanation:
          "## Approach\n\nSplit the grouped count and average into two CTE steps.\n\n## Query\n\n```sql\nWITH reaction_counts AS (\n  SELECT message_id, COUNT(*) AS reaction_count\n  FROM message_reactions\n  GROUP BY message_id\n), avg_reactions AS (\n  SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count\n  FROM reaction_counts\n)\nSELECT avg_reaction_count\nFROM avg_reactions;\n```\n\n## Explanation\n\n- The first CTE computes reaction counts per message.\n- The second CTE computes their average.\n- The final query returns the single value.\n\n## Difference from the optimal approach\n\nClear, but more verbose than needed.",
      },
    ],
  },
  {
    code: "CHAT_049",
    approaches: [
      {
        approach_title: "Join private count",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT cm.channel_id, COUNT(*) AS member_count FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'private' GROUP BY cm.channel_id ORDER BY member_count DESC, cm.channel_id ASC;",
        explanation:
          "## Approach\n\nJoin channel memberships to channels, keep only private channels, then count members per channel.\n\n## Query\n\n```sql\nSELECT cm.channel_id, COUNT(*) AS member_count\nFROM channel_members cm\nJOIN channels c\n  ON cm.channel_id = c.id\nWHERE c.visibility = 'private'\nGROUP BY cm.channel_id\nORDER BY member_count DESC, cm.channel_id ASC;\n```\n\n## Explanation\n\n- `channel_members` does not have a `membership_status` column.\n- Each row already represents one member in one channel.\n- Joining `channels` lets us filter to `visibility = 'private'`.\n- `COUNT(*)` returns the number of members in each private channel.\n\n## Why this is optimal\n\nIt uses the actual schema and is the simplest valid grouped-count query.",
      },
      {
        approach_title: "CTE private channels",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH private_channels AS ( SELECT id FROM channels WHERE visibility = 'private' ) SELECT cm.channel_id, COUNT(*) AS member_count FROM channel_members cm JOIN private_channels pc ON cm.channel_id = pc.id GROUP BY cm.channel_id ORDER BY member_count DESC, cm.channel_id ASC;",
        explanation:
          "## Approach\n\nFirst isolate private channels in a CTE, then count their members.\n\n## Query\n\n```sql\nWITH private_channels AS (\n  SELECT id\n  FROM channels\n  WHERE visibility = 'private'\n)\nSELECT cm.channel_id, COUNT(*) AS member_count\nFROM channel_members cm\nJOIN private_channels pc\n  ON cm.channel_id = pc.id\nGROUP BY cm.channel_id\nORDER BY member_count DESC, cm.channel_id ASC;\n```\n\n## Explanation\n\n- The CTE builds the set of private channel ids.\n- The outer query counts membership rows for those channels.\n\n## Difference from the optimal approach\n\nIt works, but adds an extra step.",
      },
      {
        approach_title: "Alias count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT cm.channel_id, COUNT(cm.workspace_member_id) AS member_count FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'private' GROUP BY cm.channel_id ORDER BY member_count DESC, cm.channel_id ASC;",
        explanation:
          "## Approach\n\nCount membership foreign keys instead of all rows.\n\n## Query\n\n```sql\nSELECT cm.channel_id, COUNT(cm.workspace_member_id) AS member_count\nFROM channel_members cm\nJOIN channels c\n  ON cm.channel_id = c.id\nWHERE c.visibility = 'private'\nGROUP BY cm.channel_id\nORDER BY member_count DESC, cm.channel_id ASC;\n```\n\n## Explanation\n\n- `workspace_member_id` is non-NULL for valid membership rows.\n- So `COUNT(workspace_member_id)` matches `COUNT(*)` here.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct.",
      },
    ],
  },
  {
    code: "CHAT_050",
    approaches: [
      {
        approach_title: "Filter owners",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_id, COUNT(*) AS owner_count FROM workspace_members WHERE membership_status = 'active' AND member_type = 'owner' GROUP BY workspace_id ORDER BY owner_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nKeep only active owner memberships, then count them per workspace.\n\n## Query\n\n```sql\nSELECT workspace_id, COUNT(*) AS owner_count\nFROM workspace_members\nWHERE membership_status = 'active'\n  AND member_type = 'owner'\nGROUP BY workspace_id\nORDER BY owner_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- `workspace_members` uses `member_type` for roles such as `owner`, `admin`, and `member`.\n- `membership_status = 'active'` keeps currently active members only.\n- `GROUP BY workspace_id` creates one row per workspace.\n- `COUNT(*)` returns the active owner total.\n\n## Why this is optimal\n\nIt uses the correct role column from the real schema and expresses the requirement directly.",
      },
      {
        approach_title: "FILTER owners",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT workspace_id, COUNT(*) FILTER (WHERE membership_status = 'active' AND member_type = 'owner') AS owner_count FROM workspace_members GROUP BY workspace_id ORDER BY owner_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nGroup all workspace memberships, then count only active owners inside the aggregate.\n\n## Query\n\n```sql\nSELECT workspace_id,\n       COUNT(*) FILTER (WHERE membership_status = 'active' AND member_type = 'owner') AS owner_count\nFROM workspace_members\nGROUP BY workspace_id\nORDER BY owner_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The query groups all workspace member rows by workspace.\n- `FILTER` counts only rows that are both active and owners.\n- This is helpful when multiple role counts are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one metric.",
      },
      {
        approach_title: "CTE owner totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_owner_totals AS ( SELECT workspace_id, COUNT(*) AS owner_count FROM workspace_members WHERE membership_status = 'active' AND member_type = 'owner' GROUP BY workspace_id ) SELECT workspace_id, owner_count FROM workspace_owner_totals ORDER BY owner_count DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCompute owner totals per workspace in a CTE first.\n\n## Query\n\n```sql\nWITH workspace_owner_totals AS (\n  SELECT workspace_id, COUNT(*) AS owner_count\n  FROM workspace_members\n  WHERE membership_status = 'active'\n    AND member_type = 'owner'\n  GROUP BY workspace_id\n)\nSELECT workspace_id, owner_count\nFROM workspace_owner_totals\nORDER BY owner_count DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates the active owner count for each workspace.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
    ],
  },
  {
    code: "CHAT_051",
    approaches: [
      {
        approach_title: "Distinct senders",
        approach_type: "count_distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY unique_senders DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount distinct non-deleted senders per channel, then keep the top 10 channels.\n\n## Query\n\n```sql\nSELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders\nFROM messages\nWHERE channel_id IS NOT NULL\n  AND is_deleted = false\nGROUP BY channel_id\nORDER BY unique_senders DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `channel_id IS NOT NULL` keeps only channel messages.\n- `is_deleted = false` removes deleted messages.\n- `COUNT(DISTINCT sender_member_id)` counts unique members who posted in each channel.\n- The ordering returns the top 10 channels by sender variety.\n\n## Why this is optimal\n\nIt directly measures unique participation per channel and matches the requirement exactly.",
      },
      {
        approach_title: "CTE sender counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_sender_counts AS (\n  SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, unique_senders\nFROM channel_sender_counts\nORDER BY unique_senders DESC, channel_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute distinct sender counts per channel in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH channel_sender_counts AS (\n  SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n)\nSELECT channel_id, unique_senders\nFROM channel_sender_counts\nORDER BY unique_senders DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one sender count per channel.\n- The outer query applies ranking and limits the result.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the counts are reused later.",
      },
      {
        approach_title: "Rank channels",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_sender_counts AS (\n  SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), ranked_channels AS (\n  SELECT channel_id, unique_senders, ROW_NUMBER() OVER (ORDER BY unique_senders DESC, channel_id ASC) AS rn\n  FROM channel_sender_counts\n)\nSELECT channel_id, unique_senders\nFROM ranked_channels\nWHERE rn <= 10\nORDER BY unique_senders DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount distinct senders first, then rank the channels with a window function.\n\n## Query\n\n```sql\nWITH channel_sender_counts AS (\n  SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), ranked_channels AS (\n  SELECT channel_id, unique_senders,\n         ROW_NUMBER() OVER (ORDER BY unique_senders DESC, channel_id ASC) AS rn\n  FROM channel_sender_counts\n)\nSELECT channel_id, unique_senders\nFROM ranked_channels\nWHERE rn <= 10\nORDER BY unique_senders DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The first step computes unique sender counts per channel.\n- `ROW_NUMBER()` ranks channels from highest to lowest sender count.\n- The outer query keeps the top 10 channels.\n\n## Difference from the optimal approach\n\nUseful for ranking workflows, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_052",
    approaches: [
      {
        approach_title: "Distinct channels",
        approach_type: "count_distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id HAVING COUNT(DISTINCT channel_id) > 3 ORDER BY channel_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCount distinct channels for each workspace member, then keep members who belong to more than 3 channels.\n\n## Query\n\n```sql\nSELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count\nFROM channel_members\nGROUP BY workspace_member_id\nHAVING COUNT(DISTINCT channel_id) > 3\nORDER BY channel_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- The correct member column is `workspace_member_id`.\n- `channel_members` does not have `membership_status`, so no active filter should be used.\n- `COUNT(DISTINCT channel_id)` counts how many unique channels each member belongs to.\n- `HAVING` keeps only members above the threshold.\n\n## Why this is optimal\n\nIt matches the real schema and directly answers the question.",
      },
      {
        approach_title: "CTE channel counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_channel_counts AS ( SELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id ) SELECT workspace_member_id, channel_count FROM member_channel_counts WHERE channel_count > 3 ORDER BY channel_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute distinct channel counts in a CTE first.\n\n## Query\n\n```sql\nWITH member_channel_counts AS (\n  SELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count\n  FROM channel_members\n  GROUP BY workspace_member_id\n)\nSELECT workspace_member_id, channel_count\nFROM member_channel_counts\nWHERE channel_count > 3\nORDER BY channel_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one channel count per workspace member.\n- The outer query applies the threshold and final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
      {
        approach_title: "Group channels",
        approach_type: "group_by",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT workspace_member_id, COUNT(channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id HAVING COUNT(channel_id) > 3 ORDER BY channel_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCount channel membership rows per workspace member.\n\n## Query\n\n```sql\nSELECT workspace_member_id, COUNT(channel_id) AS channel_count\nFROM channel_members\nGROUP BY workspace_member_id\nHAVING COUNT(channel_id) > 3\nORDER BY channel_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- This counts membership rows per workspace member.\n- It works correctly if each member-channel pair appears only once.\n- `COUNT(DISTINCT channel_id)` is safer if duplicates are possible.\n\n## Difference from the optimal approach\n\nShorter, but less robust than using `DISTINCT`.",
      },
    ],
  },
  {
    code: "CHAT_053",
    approaches: [
      {
        approach_title: "Left join zero",
        approach_type: "left_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN channel_members cm ON c.id = cm.channel_id GROUP BY c.id, c.workspace_id, c.channel_name HAVING COUNT(cm.id) = 0 ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;",
        explanation:
          "## Approach\n\nLeft join channels to channel memberships, then keep channels with no matching member rows.\n\n## Query\n\n```sql\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nLEFT JOIN channel_members cm\n  ON c.id = cm.channel_id\nGROUP BY c.id, c.workspace_id, c.channel_name\nHAVING COUNT(cm.id) = 0\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;\n```\n\n## Explanation\n\n- `channel_members` does not have `membership_status`, so there is no active filter.\n- `LEFT JOIN` keeps all channels, including those with no members.\n- `COUNT(cm.id) = 0` identifies channels without any membership rows.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt uses the actual schema and clearly handles empty matches.",
      },
      {
        approach_title: "Not exists",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT c.id, c.workspace_id, c.channel_name FROM channels c WHERE NOT EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = c.id) ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;",
        explanation:
          "## Approach\n\nReturn channels only when no related channel member row exists.\n\n## Query\n\n```sql\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM channel_members cm\n  WHERE cm.channel_id = c.id\n)\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;\n```\n\n## Explanation\n\n- `NOT EXISTS` checks whether a channel has zero members.\n- Each qualifying channel is returned once.\n\n## Difference from the optimal approach\n\nAlso valid, but the left join version stays closer to the expected query pattern.",
      },
      {
        approach_title: "CTE member channels",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_channels AS ( SELECT DISTINCT channel_id FROM channel_members ) SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN member_channels mc ON c.id = mc.channel_id WHERE mc.channel_id IS NULL ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;",
        explanation:
          "## Approach\n\nFirst collect channels that have members, then keep channels outside that set.\n\n## Query\n\n```sql\nWITH member_channels AS (\n  SELECT DISTINCT channel_id\n  FROM channel_members\n)\nSELECT c.id, c.workspace_id, c.channel_name\nFROM channels c\nLEFT JOIN member_channels mc\n  ON c.id = mc.channel_id\nWHERE mc.channel_id IS NULL\nORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;\n```\n\n## Explanation\n\n- The CTE lists channels that already have at least one member.\n- The outer query keeps only channels not found in that set.\n\n## Difference from the optimal approach\n\nMore steps, but still valid.",
      },
    ],
  },
  {
    code: "CHAT_054",
    approaches: [
      {
        approach_title: "Two CTEs",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH workspace_message_counts AS ( SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ), workspace_active_members AS ( SELECT workspace_id, COUNT(*) AS active_members FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ) SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member FROM workspace_active_members wam LEFT JOIN workspace_message_counts wmc ON wam.workspace_id = wmc.workspace_id ORDER BY avg_messages_per_active_member DESC, wam.workspace_id ASC;",
        explanation:
          "## Approach\n\nCompute total non-deleted messages per workspace and active member counts per workspace, then divide them.\n\n## Query\n\n```sql\nWITH workspace_message_counts AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n), workspace_active_members AS (\n  SELECT workspace_id, COUNT(*) AS active_members\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY workspace_id\n)\nSELECT wam.workspace_id,\n       ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member\nFROM workspace_active_members wam\nLEFT JOIN workspace_message_counts wmc\n  ON wam.workspace_id = wmc.workspace_id\nORDER BY avg_messages_per_active_member DESC, wam.workspace_id ASC;\n```\n\n## Explanation\n\n- The first CTE counts valid messages per workspace.\n- The second CTE counts active members per workspace.\n- `LEFT JOIN` keeps workspaces that have active members even if they have no messages.\n- `COALESCE(..., 0)` treats missing message counts as zero.\n- `NULLIF(active_members, 0)` prevents division by zero.\n- `ROUND(..., 2)` formats the average correctly.\n\n## Why this is optimal\n\nThis is the clearest way to build the numerator and denominator separately before dividing.",
      },
      {
        approach_title: "Subquery join",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member FROM ( SELECT workspace_id, COUNT(*) AS active_members FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ) wam LEFT JOIN ( SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ) wmc ON wam.workspace_id = wmc.workspace_id ORDER BY avg_messages_per_active_member DESC, wam.workspace_id ASC;",
        explanation:
          "## Approach\n\nUse two derived tables instead of CTEs and join them.\n\n## Query\n\n```sql\nSELECT wam.workspace_id,\n       ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member\nFROM (\n  SELECT workspace_id, COUNT(*) AS active_members\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY workspace_id\n) wam\nLEFT JOIN (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n) wmc\n  ON wam.workspace_id = wmc.workspace_id\nORDER BY avg_messages_per_active_member DESC, wam.workspace_id ASC;\n```\n\n## Explanation\n\n- Each subquery computes one metric per workspace.\n- The outer query joins them and calculates the average.\n\n## Difference from the optimal approach\n\nEquivalent logic, but CTEs are usually easier to read.",
      },
      {
        approach_title: "Nested CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_message_counts AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n), workspace_active_members AS (\n  SELECT workspace_id, COUNT(*) AS active_members\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY workspace_id\n), workspace_averages AS (\n  SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member\n  FROM workspace_active_members wam\n  LEFT JOIN workspace_message_counts wmc\n    ON wam.workspace_id = wmc.workspace_id\n)\nSELECT workspace_id, avg_messages_per_active_member\nFROM workspace_averages\nORDER BY avg_messages_per_active_member DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nBreak the metric-building and final output into an extra CTE step.\n\n## Query\n\n```sql\nWITH workspace_message_counts AS (\n  SELECT workspace_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id\n), workspace_active_members AS (\n  SELECT workspace_id, COUNT(*) AS active_members\n  FROM workspace_members\n  WHERE membership_status = 'active'\n  GROUP BY workspace_id\n), workspace_averages AS (\n  SELECT wam.workspace_id,\n         ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member\n  FROM workspace_active_members wam\n  LEFT JOIN workspace_message_counts wmc\n    ON wam.workspace_id = wmc.workspace_id\n)\nSELECT workspace_id, avg_messages_per_active_member\nFROM workspace_averages\nORDER BY avg_messages_per_active_member DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The first two CTEs compute base metrics.\n- The third CTE computes the final average.\n- The last query just returns the sorted result.\n\n## Difference from the optimal approach\n\nClear, but more verbose than necessary.",
      },
    ],
  },
  {
    code: "CHAT_055",
    approaches: [
      {
        approach_title: "Group mentions",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT message_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY message_id ORDER BY mention_count DESC, message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount mentions per message, then keep the top 10 messages.\n\n## Query\n\n```sql\nSELECT message_id, COUNT(*) AS mention_count\nFROM message_mentions\nGROUP BY message_id\nORDER BY mention_count DESC, message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each row in `message_mentions` represents one mention inside a message.\n- `GROUP BY message_id` creates one group per message.\n- `COUNT(*)` returns how many mentions each message contains.\n- `LIMIT 10` keeps the top 10 most-mentioned messages.\n\n## Why this is optimal\n\nIt is the most direct top-N aggregate query for mention counts.",
      },
      {
        approach_title: "CTE mention counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH message_mention_counts AS (\n  SELECT message_id, COUNT(*) AS mention_count\n  FROM message_mentions\n  GROUP BY message_id\n)\nSELECT message_id, mention_count\nFROM message_mention_counts\nORDER BY mention_count DESC, message_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute mention totals per message in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH message_mention_counts AS (\n  SELECT message_id, COUNT(*) AS mention_count\n  FROM message_mentions\n  GROUP BY message_id\n)\nSELECT message_id, mention_count\nFROM message_mention_counts\nORDER BY mention_count DESC, message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one mention count per message.\n- The outer query applies the final ranking and limit.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable if the counts need later joins.",
      },
      {
        approach_title: "Rank mentions",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH message_mention_counts AS (\n  SELECT message_id, COUNT(*) AS mention_count\n  FROM message_mentions\n  GROUP BY message_id\n), ranked_messages AS (\n  SELECT message_id, mention_count, ROW_NUMBER() OVER (ORDER BY mention_count DESC, message_id ASC) AS rn\n  FROM message_mention_counts\n)\nSELECT message_id, mention_count\nFROM ranked_messages\nWHERE rn <= 10\nORDER BY mention_count DESC, message_id ASC;",
        explanation:
          "## Approach\n\nCount mentions first, then rank messages with a window function.\n\n## Query\n\n```sql\nWITH message_mention_counts AS (\n  SELECT message_id, COUNT(*) AS mention_count\n  FROM message_mentions\n  GROUP BY message_id\n), ranked_messages AS (\n  SELECT message_id, mention_count,\n         ROW_NUMBER() OVER (ORDER BY mention_count DESC, message_id ASC) AS rn\n  FROM message_mention_counts\n)\nSELECT message_id, mention_count\nFROM ranked_messages\nWHERE rn <= 10\nORDER BY mention_count DESC, message_id ASC;\n```\n\n## Explanation\n\n- The first step computes mention totals.\n- `ROW_NUMBER()` ranks messages from most mentions to least.\n- The outer query keeps the first 10 ranked rows.\n\n## Difference from the optimal approach\n\nUseful for ranking workflows, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_056",
    approaches: [
      {
        approach_title: "Join distinct workspaces",
        approach_type: "count_distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT mm.mentioned_member_id AS workspace_member_id, COUNT(DISTINCT m.workspace_id) AS workspace_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id HAVING COUNT(DISTINCT m.workspace_id) > 1 ORDER BY workspace_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nJoin mentions to messages, count distinct workspaces per mentioned workspace member, then keep members mentioned in more than one workspace.\n\n## Query\n\n```sql\nSELECT mm.mentioned_member_id AS workspace_member_id,\n       COUNT(DISTINCT m.workspace_id) AS workspace_count\nFROM message_mentions mm\nJOIN messages m\n  ON mm.message_id = m.id\nGROUP BY mm.mentioned_member_id\nHAVING COUNT(DISTINCT m.workspace_id) > 1\nORDER BY workspace_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- `message_mentions` stores the mentioned member in `mentioned_member_id`.\n- Joining `messages` gives the workspace for each mention.\n- `COUNT(DISTINCT m.workspace_id)` counts unique workspaces per mentioned member.\n- `HAVING ... > 1` keeps members mentioned across multiple workspaces.\n\n## Why this is optimal\n\nIt uses the correct schema column and avoids double-counting repeated mentions in the same workspace.",
      },
      {
        approach_title: "CTE workspace counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_workspace_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, COUNT(DISTINCT m.workspace_id) AS workspace_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id ) SELECT workspace_member_id, workspace_count FROM member_workspace_mentions WHERE workspace_count > 1 ORDER BY workspace_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute distinct workspace counts in a CTE first.\n\n## Query\n\n```sql\nWITH member_workspace_mentions AS (\n  SELECT mm.mentioned_member_id AS workspace_member_id,\n         COUNT(DISTINCT m.workspace_id) AS workspace_count\n  FROM message_mentions mm\n  JOIN messages m\n    ON mm.message_id = m.id\n  GROUP BY mm.mentioned_member_id\n)\nSELECT workspace_member_id, workspace_count\nFROM member_workspace_mentions\nWHERE workspace_count > 1\nORDER BY workspace_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one workspace count per mentioned member.\n- The outer query applies the threshold and sorting.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
    ],
  },
  {
    code: "CHAT_057",
    approaches: [
      {
        approach_title: "Join attachment messages",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count FROM message_attachments ma JOIN messages m ON ma.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id HAVING COUNT(DISTINCT ma.message_id) > 20 ORDER BY attachment_message_count DESC, m.channel_id ASC;",
        explanation:
          "## Approach\n\nJoin attachments to messages, count distinct attached messages per channel, then keep channels above the threshold.\n\n## Query\n\n```sql\nSELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count\nFROM message_attachments ma\nJOIN messages m\n  ON ma.message_id = m.id\nWHERE m.channel_id IS NOT NULL\nGROUP BY m.channel_id\nHAVING COUNT(DISTINCT ma.message_id) > 20\nORDER BY attachment_message_count DESC, m.channel_id ASC;\n```\n\n## Explanation\n\n- Joining `messages` gives the channel for each attachment row.\n- `COUNT(DISTINCT ma.message_id)` counts how many unique messages in a channel have attachments.\n- `HAVING ... > 20` keeps only attachment-heavy channels.\n\n## Why this is optimal\n\nIt avoids overcounting when a message has multiple attachments.",
      },
      {
        approach_title: "CTE attachment counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_attachment_messages AS (\n  SELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count\n  FROM message_attachments ma\n  JOIN messages m\n    ON ma.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id\n)\nSELECT channel_id, attachment_message_count\nFROM channel_attachment_messages\nWHERE attachment_message_count > 20\nORDER BY attachment_message_count DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute distinct attached-message counts per channel in a CTE first.\n\n## Query\n\n```sql\nWITH channel_attachment_messages AS (\n  SELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count\n  FROM message_attachments ma\n  JOIN messages m\n    ON ma.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id\n)\nSELECT channel_id, attachment_message_count\nFROM channel_attachment_messages\nWHERE attachment_message_count > 20\nORDER BY attachment_message_count DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one attachment-message count per channel.\n- The outer query applies the threshold and sorting.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the counts are reused.",
      },
      {
        approach_title: "Count rows",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT m.channel_id, COUNT(*) AS attachment_message_count FROM message_attachments ma JOIN messages m ON ma.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id HAVING COUNT(*) > 20 ORDER BY attachment_message_count DESC, m.channel_id ASC;",
        explanation:
          "## Approach\n\nCount joined attachment rows per channel.\n\n## Query\n\n```sql\nSELECT m.channel_id, COUNT(*) AS attachment_message_count\nFROM message_attachments ma\nJOIN messages m\n  ON ma.message_id = m.id\nWHERE m.channel_id IS NOT NULL\nGROUP BY m.channel_id\nHAVING COUNT(*) > 20\nORDER BY attachment_message_count DESC, m.channel_id ASC;\n```\n\n## Explanation\n\n- This counts attachment rows, not distinct attached messages.\n- If one message has multiple attachments, it gets counted multiple times.\n\n## Difference from the optimal approach\n\nThis may overcount. `COUNT(DISTINCT ma.message_id)` is needed for the correct metric.",
      },
    ],
  },
  {
    code: "CHAT_058",
    approaches: [
      {
        approach_title: "Group conversations",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT conversation_id, COUNT(*) AS total_messages FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id ORDER BY total_messages DESC, conversation_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount non-deleted direct conversation messages, then keep the top 10 conversations.\n\n## Query\n\n```sql\nSELECT conversation_id, COUNT(*) AS total_messages\nFROM messages\nWHERE conversation_id IS NOT NULL\n  AND is_deleted = false\nGROUP BY conversation_id\nORDER BY total_messages DESC, conversation_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `conversation_id IS NOT NULL` keeps only conversation-based messages.\n- `is_deleted = false` excludes deleted messages.\n- `GROUP BY conversation_id` creates one group per conversation.\n- `LIMIT 10` keeps the most active conversations.\n\n## Why this is optimal\n\nIt is the most direct top-N grouped count for conversation activity.",
      },
      {
        approach_title: "CTE conversation totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH conversation_message_totals AS (\n  SELECT conversation_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE conversation_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY conversation_id\n)\nSELECT conversation_id, total_messages\nFROM conversation_message_totals\nORDER BY total_messages DESC, conversation_id ASC\nLIMIT 10;",
        explanation:
          "## Approach\n\nCompute conversation totals in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH conversation_message_totals AS (\n  SELECT conversation_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE conversation_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY conversation_id\n)\nSELECT conversation_id, total_messages\nFROM conversation_message_totals\nORDER BY total_messages DESC, conversation_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one total per conversation.\n- The outer query ranks and limits the result.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable in larger queries.",
      },
      {
        approach_title: "Rank conversations",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH conversation_message_totals AS (\n  SELECT conversation_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE conversation_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY conversation_id\n), ranked_conversations AS (\n  SELECT conversation_id, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, conversation_id ASC) AS rn\n  FROM conversation_message_totals\n)\nSELECT conversation_id, total_messages\nFROM ranked_conversations\nWHERE rn <= 10\nORDER BY total_messages DESC, conversation_id ASC;",
        explanation:
          "## Approach\n\nCount conversation messages first, then rank the conversations.\n\n## Query\n\n```sql\nWITH conversation_message_totals AS (\n  SELECT conversation_id, COUNT(*) AS total_messages\n  FROM messages\n  WHERE conversation_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY conversation_id\n), ranked_conversations AS (\n  SELECT conversation_id, total_messages,\n         ROW_NUMBER() OVER (ORDER BY total_messages DESC, conversation_id ASC) AS rn\n  FROM conversation_message_totals\n)\nSELECT conversation_id, total_messages\nFROM ranked_conversations\nWHERE rn <= 10\nORDER BY total_messages DESC, conversation_id ASC;\n```\n\n## Explanation\n\n- The first step computes totals per conversation.\n- `ROW_NUMBER()` ranks conversations by message volume.\n- The outer query keeps the top 10 ranked rows.\n\n## Difference from the optimal approach\n\nUseful for ranking workflows, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_059",
    approaches: [
      {
        approach_title: "Group muted",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_member_id, COUNT(*) AS muted_channel_count FROM notification_preferences WHERE mute_until IS NOT NULL GROUP BY workspace_member_id HAVING COUNT(*) > 2 ORDER BY muted_channel_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCount muted notification preferences per workspace member, then keep members with more than 2 muted channels.\n\n## Query\n\n```sql\nSELECT workspace_member_id, COUNT(*) AS muted_channel_count\nFROM notification_preferences\nWHERE mute_until IS NOT NULL\nGROUP BY workspace_member_id\nHAVING COUNT(*) > 2\nORDER BY muted_channel_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- The actual table is `notification_preferences`, not `channel_notification_preferences`.\n- The schema uses `workspace_member_id`, not `member_id`.\n- A muted channel is represented by `mute_until IS NOT NULL`.\n- `GROUP BY workspace_member_id` creates one group per member.\n- `HAVING COUNT(*) > 2` keeps only members above the threshold.\n\n## Why this is optimal\n\nIt uses the real schema and expresses the grouped threshold directly.",
      },
      {
        approach_title: "CTE muted counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_muted_counts AS ( SELECT workspace_member_id, COUNT(*) AS muted_channel_count FROM notification_preferences WHERE mute_until IS NOT NULL GROUP BY workspace_member_id ) SELECT workspace_member_id, muted_channel_count FROM member_muted_counts WHERE muted_channel_count > 2 ORDER BY muted_channel_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute muted channel counts per workspace member in a CTE first.\n\n## Query\n\n```sql\nWITH member_muted_counts AS (\n  SELECT workspace_member_id, COUNT(*) AS muted_channel_count\n  FROM notification_preferences\n  WHERE mute_until IS NOT NULL\n  GROUP BY workspace_member_id\n)\nSELECT workspace_member_id, muted_channel_count\nFROM member_muted_counts\nWHERE muted_channel_count > 2\nORDER BY muted_channel_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one muted count per member.\n- The outer query applies the threshold and sorting.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
      {
        approach_title: "Filter aggregate",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT workspace_member_id, COUNT(*) FILTER (WHERE mute_until IS NOT NULL) AS muted_channel_count FROM notification_preferences GROUP BY workspace_member_id HAVING COUNT(*) FILTER (WHERE mute_until IS NOT NULL) > 2 ORDER BY muted_channel_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nGroup all notification preference rows, then count muted ones inside the aggregate.\n\n## Query\n\n```sql\nSELECT workspace_member_id,\n       COUNT(*) FILTER (WHERE mute_until IS NOT NULL) AS muted_channel_count\nFROM notification_preferences\nGROUP BY workspace_member_id\nHAVING COUNT(*) FILTER (WHERE mute_until IS NOT NULL) > 2\nORDER BY muted_channel_count DESC, workspace_member_id ASC;\n```\n\n## Explanation\n\n- The query groups all preference rows by workspace member.\n- `FILTER` counts only muted rows inside each group.\n- The `HAVING` clause uses the same filtered count for the threshold.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric.",
      },
    ],
  },
  {
    code: "CHAT_060",
    approaches: [
      {
        approach_title: "Filter counts",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT workspace_id, COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites, COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites FROM invites GROUP BY workspace_id ORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nGroup invites by workspace and use conditional counts for accepted and pending invites.\n\n## Query\n\n```sql\nSELECT workspace_id,\n       COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites,\n       COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites\nFROM invites\nGROUP BY workspace_id\nORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The actual table is `invites`, not `workspace_invites`.\n- `GROUP BY workspace_id` creates one row per workspace.\n- The first `FILTER` counts only accepted invites.\n- The second `FILTER` counts only pending invites.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\n`FILTER` is the clearest way to calculate multiple conditional counts in one grouped query.",
      },
      {
        approach_title: "Case sums",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT workspace_id, SUM(CASE WHEN invite_status = 'accepted' THEN 1 ELSE 0 END) AS accepted_invites, SUM(CASE WHEN invite_status = 'pending' THEN 1 ELSE 0 END) AS pending_invites FROM invites GROUP BY workspace_id ORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` expressions inside `SUM` to count accepted and pending invites.\n\n## Query\n\n```sql\nSELECT workspace_id,\n       SUM(CASE WHEN invite_status = 'accepted' THEN 1 ELSE 0 END) AS accepted_invites,\n       SUM(CASE WHEN invite_status = 'pending' THEN 1 ELSE 0 END) AS pending_invites\nFROM invites\nGROUP BY workspace_id\nORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- Each `CASE` returns 1 for matching rows and 0 otherwise.\n- Summing those values produces the count for each status.\n- The result matches the filtered count version.\n\n## Difference from the optimal approach\n\nVery common and correct, but `FILTER` is cleaner in PostgreSQL.",
      },
      {
        approach_title: "CTE invite counts",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_invite_counts AS ( SELECT workspace_id, COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites, COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites FROM invites GROUP BY workspace_id ) SELECT workspace_id, accepted_invites, pending_invites FROM workspace_invite_counts ORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;",
        explanation:
          "## Approach\n\nCompute both invite counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH workspace_invite_counts AS (\n  SELECT workspace_id,\n         COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites,\n         COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites\n  FROM invites\n  GROUP BY workspace_id\n)\nSELECT workspace_id, accepted_invites, pending_invites\nFROM workspace_invite_counts\nORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;\n```\n\n## Explanation\n\n- The CTE builds both metrics per workspace.\n- The outer query applies the final ordering.\n- This is useful if the invite counts are reused later.\n\n## Difference from the optimal approach\n\nMore verbose, but modular.",
      },
    ],
  },
  {
    code: "CHAT_061",
    approaches: [
      {
        approach_title: "Row number winner",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn = 1 ORDER BY workspace_id ASC;",
        explanation:
          "## Approach\n\nCount messages per member inside each workspace, rank them, then keep rank 1.\n\n## Query\n\n```sql\nWITH member_message_counts AS (\n  SELECT workspace_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n), ranked_members AS (\n  SELECT workspace_id, sender_member_id, message_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY workspace_id\n           ORDER BY message_count DESC, sender_member_id ASC\n         ) AS rn\n  FROM member_message_counts\n)\nSELECT workspace_id, sender_member_id, message_count\nFROM ranked_members\nWHERE rn = 1\nORDER BY workspace_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes non-deleted message counts per member per workspace.\n- `ROW_NUMBER()` ranks members within each workspace.\n- `rn = 1` keeps the most active member in each workspace.\n- The tie-breaker uses smaller `sender_member_id` first.\n\n## Why this is optimal\n\nThis is the clearest and most reliable way to pick one top member per workspace.",
      },
      {
        approach_title: "Dense rank winner",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, DENSE_RANK() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rnk FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rnk = 1 ORDER BY workspace_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` instead of `ROW_NUMBER()` to rank members in each workspace.\n\n## Query\n\n```sql\nWITH member_message_counts AS (\n  SELECT workspace_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n), ranked_members AS (\n  SELECT workspace_id, sender_member_id, message_count,\n         DENSE_RANK() OVER (\n           PARTITION BY workspace_id\n           ORDER BY message_count DESC, sender_member_id ASC\n         ) AS rnk\n  FROM member_message_counts\n)\nSELECT workspace_id, sender_member_id, message_count\nFROM ranked_members\nWHERE rnk = 1\nORDER BY workspace_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are the same as the optimal approach.\n- `DENSE_RANK()` assigns rank values within each workspace.\n- Because the ordering includes `sender_member_id`, only one row gets rank 1 here.\n\n## Difference from the optimal approach\n\nIt works, but `ROW_NUMBER()` is more direct when you want exactly one winner.",
      },
      {
        approach_title: "Join max count",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_max AS ( SELECT workspace_id, MAX(message_count) AS max_message_count FROM member_message_counts GROUP BY workspace_id ) SELECT mmc.workspace_id, MIN(mmc.sender_member_id) AS sender_member_id, wm.max_message_count AS message_count FROM member_message_counts mmc JOIN workspace_max wm ON mmc.workspace_id = wm.workspace_id AND mmc.message_count = wm.max_message_count GROUP BY mmc.workspace_id, wm.max_message_count ORDER BY mmc.workspace_id ASC;",
        explanation:
          "## Approach\n\nCompute per-member counts, find the maximum per workspace, then join back and break ties with `MIN(sender_member_id)`.\n\n## Query\n\n```sql\nWITH member_message_counts AS (\n  SELECT workspace_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n), workspace_max AS (\n  SELECT workspace_id, MAX(message_count) AS max_message_count\n  FROM member_message_counts\n  GROUP BY workspace_id\n)\nSELECT mmc.workspace_id,\n       MIN(mmc.sender_member_id) AS sender_member_id,\n       wm.max_message_count AS message_count\nFROM member_message_counts mmc\nJOIN workspace_max wm\n  ON mmc.workspace_id = wm.workspace_id\n AND mmc.message_count = wm.max_message_count\nGROUP BY mmc.workspace_id, wm.max_message_count\nORDER BY mmc.workspace_id ASC;\n```\n\n## Explanation\n\n- The first CTE gets message counts per member.\n- The second CTE gets the maximum count per workspace.\n- The join keeps only top-scoring members.\n- `MIN(sender_member_id)` handles ties the same way as the expected query.\n\n## Difference from the optimal approach\n\nCorrect, but more steps than the window-function solution.",
      },
    ],
  },
  {
    code: "CHAT_062",
    approaches: [
      {
        approach_title: "Row number per channel",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), ranked_messages AS ( SELECT channel_id, message_id, reaction_count, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY reaction_count DESC, message_id ASC) AS rn FROM reaction_counts ) SELECT channel_id, message_id, reaction_count FROM ranked_messages WHERE rn = 1 ORDER BY channel_id ASC;",
        explanation:
          "## Approach\n\nCount reactions per message within each channel, rank them, then keep rank 1.\n\n## Query\n\n```sql\nWITH reaction_counts AS (\n  SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count\n  FROM message_reactions mr\n  JOIN messages m\n    ON mr.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id, mr.message_id\n), ranked_messages AS (\n  SELECT channel_id, message_id, reaction_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY channel_id\n           ORDER BY reaction_count DESC, message_id ASC\n         ) AS rn\n  FROM reaction_counts\n)\nSELECT channel_id, message_id, reaction_count\nFROM ranked_messages\nWHERE rn = 1\nORDER BY channel_id ASC;\n```\n\n## Explanation\n\n- The join gives the channel for each reacted message.\n- The first CTE counts reactions per message within each channel.\n- `ROW_NUMBER()` ranks messages within each channel.\n- `rn = 1` keeps the most reacted message per channel.\n\n## Why this is optimal\n\nIt is the cleanest way to choose one top message per channel.",
      },
      {
        approach_title: "Dense rank per channel",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), ranked_messages AS ( SELECT channel_id, message_id, reaction_count, DENSE_RANK() OVER (PARTITION BY channel_id ORDER BY reaction_count DESC, message_id ASC) AS rnk FROM reaction_counts ) SELECT channel_id, message_id, reaction_count FROM ranked_messages WHERE rnk = 1 ORDER BY channel_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` to rank reacted messages inside each channel.\n\n## Query\n\n```sql\nWITH reaction_counts AS (\n  SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count\n  FROM message_reactions mr\n  JOIN messages m\n    ON mr.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id, mr.message_id\n), ranked_messages AS (\n  SELECT channel_id, message_id, reaction_count,\n         DENSE_RANK() OVER (\n           PARTITION BY channel_id\n           ORDER BY reaction_count DESC, message_id ASC\n         ) AS rnk\n  FROM reaction_counts\n)\nSELECT channel_id, message_id, reaction_count\nFROM ranked_messages\nWHERE rnk = 1\nORDER BY channel_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are the same as the optimal approach.\n- The window function ranks messages per channel.\n- Because `message_id` is included in the ordering, only one message gets rank 1.\n\n## Difference from the optimal approach\n\nIt works, but `ROW_NUMBER()` is more direct when you want a single row.",
      },
      {
        approach_title: "Join max reactions",
        approach_type: "joins",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), channel_max AS ( SELECT channel_id, MAX(reaction_count) AS max_reaction_count FROM reaction_counts GROUP BY channel_id ) SELECT rc.channel_id, MIN(rc.message_id) AS message_id, cm.max_reaction_count AS reaction_count FROM reaction_counts rc JOIN channel_max cm ON rc.channel_id = cm.channel_id AND rc.reaction_count = cm.max_reaction_count GROUP BY rc.channel_id, cm.max_reaction_count ORDER BY rc.channel_id ASC;",
        explanation:
          "## Approach\n\nCount reactions per message, find the maximum per channel, then join back and break ties with `MIN(message_id)`.\n\n## Query\n\n```sql\nWITH reaction_counts AS (\n  SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count\n  FROM message_reactions mr\n  JOIN messages m\n    ON mr.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id, mr.message_id\n), channel_max AS (\n  SELECT channel_id, MAX(reaction_count) AS max_reaction_count\n  FROM reaction_counts\n  GROUP BY channel_id\n)\nSELECT rc.channel_id,\n       MIN(rc.message_id) AS message_id,\n       cm.max_reaction_count AS reaction_count\nFROM reaction_counts rc\nJOIN channel_max cm\n  ON rc.channel_id = cm.channel_id\n AND rc.reaction_count = cm.max_reaction_count\nGROUP BY rc.channel_id, cm.max_reaction_count\nORDER BY rc.channel_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes reaction counts per message.\n- The second CTE finds the maximum count in each channel.\n- The join keeps only top-scoring messages.\n- `MIN(message_id)` resolves ties like the expected query.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose than the window-function solution.",
      },
    ],
  },
  {
    code: "CHAT_063",
    approaches: [
      {
        approach_title: "Compare to workspace avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_count FROM member_counts GROUP BY workspace_id ) SELECT mc.workspace_id, mc.sender_member_id, mc.message_count FROM member_counts mc JOIN workspace_avg wa ON mc.workspace_id = wa.workspace_id WHERE mc.message_count > wa.avg_count ORDER BY mc.workspace_id ASC, mc.message_count DESC, mc.sender_member_id ASC;",
        explanation:
          "## Approach\n\nCount messages per member in each workspace, compute the workspace average, then compare them.\n\n## Query\n\n```sql\nWITH member_counts AS (\n  SELECT workspace_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n), workspace_avg AS (\n  SELECT workspace_id, AVG(message_count) AS avg_count\n  FROM member_counts\n  GROUP BY workspace_id\n)\nSELECT mc.workspace_id, mc.sender_member_id, mc.message_count\nFROM member_counts mc\nJOIN workspace_avg wa\n  ON mc.workspace_id = wa.workspace_id\nWHERE mc.message_count > wa.avg_count\nORDER BY mc.workspace_id ASC, mc.message_count DESC, mc.sender_member_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes message counts per member per workspace.\n- The second CTE computes the average of those counts per workspace.\n- The final query keeps only members above their workspace average.\n\n## Why this is optimal\n\nIt cleanly separates the member-level metric from the workspace-level comparison.",
      },
      {
        approach_title: "Window avg compare",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ) SELECT workspace_id, sender_member_id, message_count FROM ( SELECT workspace_id, sender_member_id, message_count, AVG(message_count) OVER (PARTITION BY workspace_id) AS avg_count FROM member_counts ) ranked_members WHERE message_count > avg_count ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nCompute member counts first, then use a window function to attach the workspace average to each row.\n\n## Query\n\n```sql\nWITH member_counts AS (\n  SELECT workspace_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n)\nSELECT workspace_id, sender_member_id, message_count\nFROM (\n  SELECT workspace_id, sender_member_id, message_count,\n         AVG(message_count) OVER (PARTITION BY workspace_id) AS avg_count\n  FROM member_counts\n) ranked_members\nWHERE message_count > avg_count\nORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are computed first.\n- `AVG(...) OVER (PARTITION BY workspace_id)` adds the workspace average to each member row.\n- The outer query filters members above that value.\n\n## Difference from the optimal approach\n\nElegant, but slightly less explicit than separate CTEs.",
      },
      {
        approach_title: "Nested CTE compare",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_count FROM member_counts GROUP BY workspace_id ), above_avg_members AS ( SELECT mc.workspace_id, mc.sender_member_id, mc.message_count FROM member_counts mc JOIN workspace_avg wa ON mc.workspace_id = wa.workspace_id WHERE mc.message_count > wa.avg_count ) SELECT workspace_id, sender_member_id, message_count FROM above_avg_members ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nBreak the final filtered result into an extra CTE.\n\n## Query\n\n```sql\nWITH member_counts AS (\n  SELECT workspace_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n), workspace_avg AS (\n  SELECT workspace_id, AVG(message_count) AS avg_count\n  FROM member_counts\n  GROUP BY workspace_id\n), above_avg_members AS (\n  SELECT mc.workspace_id, mc.sender_member_id, mc.message_count\n  FROM member_counts mc\n  JOIN workspace_avg wa\n    ON mc.workspace_id = wa.workspace_id\n  WHERE mc.message_count > wa.avg_count\n)\nSELECT workspace_id, sender_member_id, message_count\nFROM above_avg_members\nORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The first two CTEs build the grouped metrics.\n- The third CTE keeps only above-average members.\n- The final query just sorts the output.\n\n## Difference from the optimal approach\n\nVery clear, but more verbose than necessary.",
      },
    ],
  },
  {
    code: "CHAT_064",
    approaches: [
      {
        approach_title: "First reply min",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nFind the earliest reply for each parent message, then compute the time difference in minutes.\n\n## Query\n\n```sql\nWITH first_replies AS (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n)\nSELECT p.id AS parent_message_id,\n       ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes\nFROM messages p\nJOIN first_replies fr\n  ON p.id = fr.parent_message_id\nORDER BY first_reply_minutes ASC, parent_message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE finds the first reply timestamp per parent message.\n- Joining back to parent messages gives the original send time.\n- `EXTRACT(EPOCH FROM interval) / 60.0` converts the difference to minutes.\n- The fastest replies appear first.\n\n## Why this is optimal\n\nIt is the clearest way to isolate the first reply before computing the latency.",
      },
      {
        approach_title: "Subquery first reply",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) fr ON p.id = fr.parent_message_id ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table instead of a CTE to hold the first reply time.\n\n## Query\n\n```sql\nSELECT p.id AS parent_message_id,\n       ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes\nFROM messages p\nJOIN (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n) fr\n  ON p.id = fr.parent_message_id\nORDER BY first_reply_minutes ASC, parent_message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query finds the first reply timestamp per parent.\n- The outer query computes the elapsed minutes.\n- The result is then sorted and limited.\n\n## Difference from the optimal approach\n\nEquivalent logic, but the CTE is easier to read.",
      },
      {
        approach_title: "Window first reply",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH replies AS ( SELECT parent_message_id, sent_at, ROW_NUMBER() OVER (PARTITION BY parent_message_id ORDER BY sent_at ASC) AS rn FROM messages WHERE parent_message_id IS NOT NULL ) SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN replies r ON p.id = r.parent_message_id WHERE r.rn = 1 ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nRank replies by time within each parent message, then keep the first one.\n\n## Query\n\n```sql\nWITH replies AS (\n  SELECT parent_message_id, sent_at,\n         ROW_NUMBER() OVER (\n           PARTITION BY parent_message_id\n           ORDER BY sent_at ASC\n         ) AS rn\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n)\nSELECT p.id AS parent_message_id,\n       ROUND(EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes\nFROM messages p\nJOIN replies r\n  ON p.id = r.parent_message_id\nWHERE r.rn = 1\nORDER BY first_reply_minutes ASC, parent_message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The window function ranks replies from earliest to latest for each parent.\n- `rn = 1` keeps the earliest reply only.\n- The final query computes the reply delay in minutes.\n\n## Difference from the optimal approach\n\nUseful, but `MIN(sent_at)` is simpler for just the first timestamp.",
      },
    ],
  },
  {
    code: "CHAT_065",
    approaches: [
      {
        approach_title: "Group saves",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ORDER BY saved_count DESC, message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount saves per message, then keep the top 10.\n\n## Query\n\n```sql\nSELECT message_id, COUNT(*) AS saved_count\nFROM saved_messages\nGROUP BY message_id\nORDER BY saved_count DESC, message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each row in `saved_messages` represents one save action.\n- `GROUP BY message_id` creates one group per message.\n- `COUNT(*)` returns how many times each message was saved.\n- `LIMIT 10` keeps the most saved messages.\n\n## Why this is optimal\n\nIt is the simplest top-N aggregate query for saved messages.",
      },
      {
        approach_title: "CTE save totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH message_save_totals AS ( SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ) SELECT message_id, saved_count FROM message_save_totals ORDER BY saved_count DESC, message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute save totals per message in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH message_save_totals AS (\n  SELECT message_id, COUNT(*) AS saved_count\n  FROM saved_messages\n  GROUP BY message_id\n)\nSELECT message_id, saved_count\nFROM message_save_totals\nORDER BY saved_count DESC, message_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates one save count per message.\n- The outer query applies the final ranking.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable.",
      },
      {
        approach_title: "Rank saved messages",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH message_save_totals AS ( SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ), ranked_messages AS ( SELECT message_id, saved_count, ROW_NUMBER() OVER (ORDER BY saved_count DESC, message_id ASC) AS rn FROM message_save_totals ) SELECT message_id, saved_count FROM ranked_messages WHERE rn <= 10 ORDER BY saved_count DESC, message_id ASC;",
        explanation:
          "## Approach\n\nCount saves first, then rank messages using a window function.\n\n## Query\n\n```sql\nWITH message_save_totals AS (\n  SELECT message_id, COUNT(*) AS saved_count\n  FROM saved_messages\n  GROUP BY message_id\n), ranked_messages AS (\n  SELECT message_id, saved_count,\n         ROW_NUMBER() OVER (ORDER BY saved_count DESC, message_id ASC) AS rn\n  FROM message_save_totals\n)\nSELECT message_id, saved_count\nFROM ranked_messages\nWHERE rn <= 10\nORDER BY saved_count DESC, message_id ASC;\n```\n\n## Explanation\n\n- The grouped totals are computed first.\n- `ROW_NUMBER()` ranks messages from most saved to least saved.\n- The outer query keeps the first 10.\n\n## Difference from the optimal approach\n\nUseful for ranking workflows, but more complex than needed here.",
      },
    ],
  },
  {
    code: "CHAT_066",
    approaches: [
      {
        approach_title: "Filter ratio",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT channel_id, COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id HAVING COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL)::numeric / COUNT(*) > 0.30 ORDER BY reply_count DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount total messages and reply messages per channel, then compare their ratio.\n\n## Query\n\n```sql\nSELECT channel_id,\n       COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count,\n       COUNT(*) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\nGROUP BY channel_id\nHAVING COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL)::numeric / COUNT(*) > 0.30\nORDER BY reply_count DESC, channel_id ASC;\n```\n\n## Explanation\n\n- `COUNT(*)` gives total messages per channel.\n- The filtered count gives reply messages only.\n- Casting to `numeric` avoids integer division.\n- The `HAVING` clause keeps channels where replies are more than 30 percent of all messages.\n\n## Why this is optimal\n\n`FILTER` is the cleanest way to compute both numerator and denominator in one grouped query.",
      },
      {
        approach_title: "Case ratio",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT channel_id, SUM(CASE WHEN parent_message_id IS NOT NULL THEN 1 ELSE 0 END) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id HAVING SUM(CASE WHEN parent_message_id IS NOT NULL THEN 1 ELSE 0 END)::numeric / COUNT(*) > 0.30 ORDER BY reply_count DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` expressions to count reply messages inside each channel group.\n\n## Query\n\n```sql\nSELECT channel_id,\n       SUM(CASE WHEN parent_message_id IS NOT NULL THEN 1 ELSE 0 END) AS reply_count,\n       COUNT(*) AS total_messages\nFROM messages\nWHERE channel_id IS NOT NULL\nGROUP BY channel_id\nHAVING SUM(CASE WHEN parent_message_id IS NOT NULL THEN 1 ELSE 0 END)::numeric / COUNT(*) > 0.30\nORDER BY reply_count DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns 1 for replies and 0 otherwise.\n- Summing it gives the reply count.\n- Dividing by total messages gives the reply ratio.\n\n## Difference from the optimal approach\n\nCorrect, but `FILTER` is cleaner in PostgreSQL.",
      },
      {
        approach_title: "CTE ratios",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_message_ratios AS ( SELECT channel_id, COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id ) SELECT channel_id, reply_count, total_messages FROM channel_message_ratios WHERE reply_count::numeric / total_messages > 0.30 ORDER BY reply_count DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute reply and total counts first, then filter by the ratio in the outer query.\n\n## Query\n\n```sql\nWITH channel_message_ratios AS (\n  SELECT channel_id,\n         COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count,\n         COUNT(*) AS total_messages\n  FROM messages\n  WHERE channel_id IS NOT NULL\n  GROUP BY channel_id\n)\nSELECT channel_id, reply_count, total_messages\nFROM channel_message_ratios\nWHERE reply_count::numeric / total_messages > 0.30\nORDER BY reply_count DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The CTE builds both counts per channel.\n- The outer query checks the ratio and returns qualifying channels.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the ratio needs further reuse.",
      },
    ],
  },
  {
    code: "CHAT_067",
    approaches: [
      {
        approach_title: "No messages (exists)",
        approach_type: "exists",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT mr.workspace_member_id FROM message_reactions mr WHERE NOT EXISTS ( SELECT 1 FROM messages m WHERE m.sender_member_id = mr.workspace_member_id ) ORDER BY mr.workspace_member_id ASC;",
        explanation:
          "## 🧠 Approach\n\nWe need to find workspace members who have **reacted to messages** but have **never sent any message themselves**.\n\nInstead of joining and grouping (which can introduce unnecessary complexity), we use a `NOT EXISTS` anti-join to directly filter out members who have sent messages.\n\n---\n\n## 🧩 Query\n\n```sql\nSELECT DISTINCT mr.workspace_member_id\nFROM message_reactions mr\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM messages m\n  WHERE m.sender_member_id = mr.workspace_member_id\n)\nORDER BY mr.workspace_member_id ASC;\n```\n\n---\n\n## 🔍 Explanation\n\n- `message_reactions` contains members who have reacted to messages.\n- We start from this table because we only care about **reacting members**.\n- For each reacting member, we check:\n  - Does any message exist where they are the sender?\n- `NOT EXISTS` ensures:\n  - Only members with **zero sent messages** are kept.\n- `SELECT DISTINCT` is required because:\n  - A member may have reacted multiple times, leading to duplicate rows.\n- The result is ordered by `workspace_member_id` for deterministic output.\n\n---\n\n## ✅ Why this is optimal\n\n- Uses a clean anti-join pattern (`NOT EXISTS`) instead of aggregation.\n- Avoids unnecessary joins and grouping.\n- Ensures correctness even if a member has multiple reactions.\n- Efficient and easy to reason about.\n",
      },
      {
        approach_title: "Not exists sender",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT mr.workspace_member_id FROM message_reactions mr WHERE NOT EXISTS (SELECT 1 FROM messages m WHERE m.sender_member_id = mr.workspace_member_id) ORDER BY mr.workspace_member_id ASC;",
        explanation:
          "## Approach\n\nReturn reacting members only when no sent message exists for them.\n\n## Query\n\n```sql\nSELECT DISTINCT mr.workspace_member_id\nFROM message_reactions mr\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM messages m\n  WHERE m.sender_member_id = mr.workspace_member_id\n)\nORDER BY mr.workspace_member_id ASC;\n```\n\n## Explanation\n\n- The outer query lists members who reacted.\n- `NOT EXISTS` removes any member who has at least one sent message.\n- `DISTINCT` removes duplicates from multiple reactions.\n\n## Difference from the optimal approach\n\nAlso valid, but the join-plus-having version stays closer to the expected pattern.",
      },
      {
        approach_title: "CTE reacting members",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH reacting_members AS ( SELECT DISTINCT workspace_member_id FROM message_reactions ) SELECT rm.workspace_member_id FROM reacting_members rm LEFT JOIN messages m ON rm.workspace_member_id = m.sender_member_id GROUP BY rm.workspace_member_id HAVING COUNT(m.id) = 0 ORDER BY rm.workspace_member_id ASC;",
        explanation:
          "## Approach\n\nFirst isolate reacting members, then remove anyone who has sent a message.\n\n## Query\n\n```sql\nWITH reacting_members AS (\n  SELECT DISTINCT workspace_member_id\n  FROM message_reactions\n)\nSELECT rm.workspace_member_id\nFROM reacting_members rm\nLEFT JOIN messages m\n  ON rm.workspace_member_id = m.sender_member_id\nGROUP BY rm.workspace_member_id\nHAVING COUNT(m.id) = 0\nORDER BY rm.workspace_member_id ASC;\n```\n\n## Explanation\n\n- The CTE builds the unique set of members who reacted.\n- The outer query checks whether each of them has any sent messages.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the reacting-member set is reused.",
      },
    ],
  },
  {
    code: "CHAT_068",
    approaches: [
      {
        approach_title: "Group by date",
        approach_type: "date_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE(sent_at) ORDER BY message_date ASC;",
        explanation:
          "## Approach\n\nFilter to the last 30 days, convert timestamps to dates, then count messages per date.\n\n## Query\n\n```sql\nSELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages\nFROM messages\nWHERE is_deleted = false\n  AND sent_at >= CURRENT_DATE - INTERVAL '30 days'\nGROUP BY DATE(sent_at)\nORDER BY message_date ASC;\n```\n\n## Explanation\n\n- `sent_at >= CURRENT_DATE - INTERVAL '30 days'` keeps recent rows.\n- `DATE(sent_at)` removes the time part and groups messages by calendar day.\n- `COUNT(*)` returns the daily message total.\n\n## Why this is optimal\n\nIt is the clearest way to build daily counts over a recent time window.",
      },
      {
        approach_title: "Date trunc day",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DATE_TRUNC('day', sent_at)::date AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE_TRUNC('day', sent_at)::date ORDER BY message_date ASC;",
        explanation:
          "## Approach\n\nNormalize each timestamp to the start of its day before grouping.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('day', sent_at)::date AS message_date,\n       COUNT(*) AS total_messages\nFROM messages\nWHERE is_deleted = false\n  AND sent_at >= CURRENT_DATE - INTERVAL '30 days'\nGROUP BY DATE_TRUNC('day', sent_at)::date\nORDER BY message_date ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('day', sent_at)` snaps timestamps to day boundaries.\n- Casting to `date` gives a clean output column.\n- Grouping then produces daily counts.\n\n## Difference from the optimal approach\n\nEquivalent, but `DATE(sent_at)` is simpler here.",
      },
      {
        approach_title: "CTE daily totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH daily_messages AS ( SELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE(sent_at) ) SELECT message_date, total_messages FROM daily_messages ORDER BY message_date ASC;",
        explanation:
          "## Approach\n\nCompute daily totals in a CTE first, then return them.\n\n## Query\n\n```sql\nWITH daily_messages AS (\n  SELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY DATE(sent_at)\n)\nSELECT message_date, total_messages\nFROM daily_messages\nORDER BY message_date ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per date with a message count.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable if more daily metrics are added later.",
      },
    ],
  },
  {
    code: "CHAT_069",
    approaches: [
      {
        approach_title: "Avg compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ), avg_count AS ( SELECT AVG(member_count) AS avg_members FROM channel_counts ) SELECT cc.channel_id, cc.member_count FROM channel_counts cc CROSS JOIN avg_count ac WHERE cc.member_count > ac.avg_members ORDER BY cc.member_count DESC, cc.channel_id ASC;",
        explanation:
          "## Approach\n\nCount members per channel, compute the overall average, then keep channels above that average.\n\n## Query\n\n```sql\nWITH channel_counts AS (\n  SELECT channel_id, COUNT(*) AS member_count\n  FROM channel_members\n  GROUP BY channel_id\n), avg_count AS (\n  SELECT AVG(member_count) AS avg_members\n  FROM channel_counts\n)\nSELECT cc.channel_id, cc.member_count\nFROM channel_counts cc\nCROSS JOIN avg_count ac\nWHERE cc.member_count > ac.avg_members\nORDER BY cc.member_count DESC, cc.channel_id ASC;\n```\n\n## Explanation\n\n- `channel_members` has one row per channel membership.\n- `GROUP BY channel_id` gives the member count for each channel.\n- The second CTE computes the average member count across all channels.\n- The final query keeps only channels above that average.\n\n## Why this is optimal\n\nIt cleanly separates the per-channel metric from the global comparison value.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ) SELECT channel_id, member_count FROM channel_counts WHERE member_count > (SELECT AVG(member_count) FROM channel_counts) ORDER BY member_count DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute channel counts once, then compare each row against an average from the same CTE.\n\n## Query\n\n```sql\nWITH channel_counts AS (\n  SELECT channel_id, COUNT(*) AS member_count\n  FROM channel_members\n  GROUP BY channel_id\n)\nSELECT channel_id, member_count\nFROM channel_counts\nWHERE member_count > (\n  SELECT AVG(member_count)\n  FROM channel_counts\n)\nORDER BY member_count DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one count per channel.\n- The scalar subquery computes the average of those counts.\n- The outer query keeps rows above that value.\n\n## Difference from the optimal approach\n\nAlso valid, but the explicit average CTE is easier to follow.",
      },
      {
        approach_title: "Window avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ) SELECT channel_id, member_count FROM ( SELECT channel_id, member_count, AVG(member_count) OVER () AS avg_members FROM channel_counts ) cc WHERE member_count > avg_members ORDER BY member_count DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute channel counts first, then attach the overall average to every row using a window function.\n\n## Query\n\n```sql\nWITH channel_counts AS (\n  SELECT channel_id, COUNT(*) AS member_count\n  FROM channel_members\n  GROUP BY channel_id\n)\nSELECT channel_id, member_count\nFROM (\n  SELECT channel_id, member_count,\n         AVG(member_count) OVER () AS avg_members\n  FROM channel_counts\n) cc\nWHERE member_count > avg_members\nORDER BY member_count DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are computed once.\n- `AVG(member_count) OVER ()` gives the same overall average on every row.\n- The outer query keeps channels above that average.\n\n## Difference from the optimal approach\n\nElegant, but slightly less explicit than separate CTEs.",
      },
    ],
  },
  {
    code: "CHAT_070",
    approaches: [
      {
        approach_title: "Group hour top1",
        approach_type: "date_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ORDER BY total_messages DESC, message_hour ASC LIMIT 1;",
        explanation:
          "## Approach\n\nExtract the hour from each message timestamp, count messages per hour, then keep the busiest one.\n\n## Query\n\n```sql\nSELECT EXTRACT(HOUR FROM sent_at) AS message_hour,\n       COUNT(*) AS total_messages\nFROM messages\nWHERE is_deleted = false\nGROUP BY EXTRACT(HOUR FROM sent_at)\nORDER BY total_messages DESC, message_hour ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- `EXTRACT(HOUR FROM sent_at)` returns the hour number from 0 to 23.\n- `GROUP BY` creates one group per hour.\n- `COUNT(*)` returns how many non-deleted messages fall in each hour.\n- `LIMIT 1` keeps the busiest hour.\n\n## Why this is optimal\n\nIt is the most direct way to find the top hour by message volume.",
      },
      {
        approach_title: "CTE hour totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH hourly_counts AS ( SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ) SELECT message_hour, total_messages FROM hourly_counts ORDER BY total_messages DESC, message_hour ASC LIMIT 1;",
        explanation:
          "## Approach\n\nCompute hourly message totals in a CTE first, then sort and keep the top row.\n\n## Query\n\n```sql\nWITH hourly_counts AS (\n  SELECT EXTRACT(HOUR FROM sent_at) AS message_hour,\n         COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY EXTRACT(HOUR FROM sent_at)\n)\nSELECT message_hour, total_messages\nFROM hourly_counts\nORDER BY total_messages DESC, message_hour ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- The CTE creates one row per hour with a message count.\n- The outer query ranks them and returns the top hour.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable if more hourly analysis is needed.",
      },
      {
        approach_title: "Rank hours",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH hourly_counts AS ( SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ), ranked_hours AS ( SELECT message_hour, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, message_hour ASC) AS rn FROM hourly_counts ) SELECT message_hour, total_messages FROM ranked_hours WHERE rn = 1;",
        explanation:
          "## Approach\n\nCount messages per hour first, then rank the hours with a window function.\n\n## Query\n\n```sql\nWITH hourly_counts AS (\n  SELECT EXTRACT(HOUR FROM sent_at) AS message_hour,\n         COUNT(*) AS total_messages\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY EXTRACT(HOUR FROM sent_at)\n), ranked_hours AS (\n  SELECT message_hour, total_messages,\n         ROW_NUMBER() OVER (ORDER BY total_messages DESC, message_hour ASC) AS rn\n  FROM hourly_counts\n)\nSELECT message_hour, total_messages\nFROM ranked_hours\nWHERE rn = 1;\n```\n\n## Explanation\n\n- The first CTE computes counts per hour.\n- `ROW_NUMBER()` ranks hours from busiest to least busy.\n- The outer query keeps the first-ranked hour.\n\n## Difference from the optimal approach\n\nUseful for ranking logic, but more complex than needed for a single top row.",
      },
    ],
  },
  {
    code: "CHAT_071",
    approaches: [
      {
        approach_title: "Row number streak",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), grouped_days AS ( SELECT sender_member_id, message_date, message_date - (ROW_NUMBER() OVER (PARTITION BY sender_member_id ORDER BY message_date))::int AS grp FROM member_days ) SELECT sender_member_id, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp HAVING COUNT(*) >= 3 ORDER BY consecutive_days_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nKeep one row per member per date, build consecutive-date groups with `ROW_NUMBER()`, then keep streaks of at least 3 days.\n\n## Query\n\n```sql\nWITH member_days AS (\n  SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date\n  FROM messages\n  WHERE is_deleted = false\n), grouped_days AS (\n  SELECT sender_member_id,\n         message_date,\n         message_date - (ROW_NUMBER() OVER (\n           PARTITION BY sender_member_id\n           ORDER BY message_date\n         ))::int AS grp\n  FROM member_days\n)\nSELECT sender_member_id, COUNT(*) AS consecutive_days_count\nFROM grouped_days\nGROUP BY sender_member_id, grp\nHAVING COUNT(*) >= 3\nORDER BY consecutive_days_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- `DISTINCT` ensures each member-date pair appears once.\n- `ROW_NUMBER()` numbers the dates for each member.\n- Subtracting that row number from the date creates the same group key for consecutive dates.\n- Grouping by `sender_member_id, grp` gives each streak.\n- `HAVING COUNT(*) >= 3` keeps only streaks of at least 3 days.\n\n## Why this is optimal\n\nThis is the standard and cleanest SQL pattern for consecutive-date streak detection.",
      },
      {
        approach_title: "Lag flags streak",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), flagged_days AS ( SELECT sender_member_id, message_date, CASE WHEN message_date = LAG(message_date) OVER (PARTITION BY sender_member_id ORDER BY message_date) + 1 THEN 0 ELSE 1 END AS is_new_group FROM member_days ), grouped_days AS ( SELECT sender_member_id, message_date, SUM(is_new_group) OVER (PARTITION BY sender_member_id ORDER BY message_date ROWS UNBOUNDED PRECEDING) AS grp FROM flagged_days ) SELECT sender_member_id, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp HAVING COUNT(*) >= 3 ORDER BY consecutive_days_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nUse `LAG()` to see whether each date continues the previous one, then build streak groups from those flags.\n\n## Query\n\n```sql\nWITH member_days AS (\n  SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date\n  FROM messages\n  WHERE is_deleted = false\n), flagged_days AS (\n  SELECT sender_member_id,\n         message_date,\n         CASE\n           WHEN message_date = LAG(message_date) OVER (\n             PARTITION BY sender_member_id\n             ORDER BY message_date\n           ) + 1 THEN 0\n           ELSE 1\n         END AS is_new_group\n  FROM member_days\n), grouped_days AS (\n  SELECT sender_member_id,\n         message_date,\n         SUM(is_new_group) OVER (\n           PARTITION BY sender_member_id\n           ORDER BY message_date\n           ROWS UNBOUNDED PRECEDING\n         ) AS grp\n  FROM flagged_days\n)\nSELECT sender_member_id, COUNT(*) AS consecutive_days_count\nFROM grouped_days\nGROUP BY sender_member_id, grp\nHAVING COUNT(*) >= 3\nORDER BY consecutive_days_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- `LAG()` compares each day with the previous day for the same member.\n- A new group starts when the dates are not consecutive.\n- Running `SUM(is_new_group)` creates the streak id.\n- Grouping by that streak id gives the streak length.\n\n## Difference from the optimal approach\n\nCorrect, but the row-number grouping trick is shorter and easier to teach.",
      },
      {
        approach_title: "Nested streak CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), grouped_days AS ( SELECT sender_member_id, message_date, message_date - (ROW_NUMBER() OVER (PARTITION BY sender_member_id ORDER BY message_date))::int AS grp FROM member_days ), streaks AS ( SELECT sender_member_id, grp, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp ) SELECT sender_member_id, consecutive_days_count FROM streaks WHERE consecutive_days_count >= 3 ORDER BY consecutive_days_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nCompute grouped streaks first, then count each streak in a separate CTE.\n\n## Query\n\n```sql\nWITH member_days AS (\n  SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date\n  FROM messages\n  WHERE is_deleted = false\n), grouped_days AS (\n  SELECT sender_member_id,\n         message_date,\n         message_date - (ROW_NUMBER() OVER (\n           PARTITION BY sender_member_id\n           ORDER BY message_date\n         ))::int AS grp\n  FROM member_days\n), streaks AS (\n  SELECT sender_member_id, grp, COUNT(*) AS consecutive_days_count\n  FROM grouped_days\n  GROUP BY sender_member_id, grp\n)\nSELECT sender_member_id, consecutive_days_count\nFROM streaks\nWHERE consecutive_days_count >= 3\nORDER BY consecutive_days_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The first two CTEs identify consecutive-date groups.\n- The third CTE turns each group into a streak length.\n- The final query filters to streaks of at least 3 days.\n\n## Difference from the optimal approach\n\nVery clear, but a little more verbose.",
      },
    ],
  },
  {
    code: "CHAT_072",
    approaches: [
      {
        approach_title: "CTE avg compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ), avg_reply AS ( SELECT AVG(first_reply_minutes) AS avg_first_reply_minutes FROM reply_times ) SELECT rt.parent_message_id, ROUND(rt.first_reply_minutes, 2) AS first_reply_minutes FROM reply_times rt CROSS JOIN avg_reply ar WHERE rt.first_reply_minutes < ar.avg_first_reply_minutes ORDER BY first_reply_minutes ASC, parent_message_id ASC;",
        explanation:
          "## Approach\n\nCompute the first reply time for each parent message, compute the overall average, then keep parents faster than that average.\n\n## Query\n\n```sql\nWITH first_replies AS (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), reply_times AS (\n  SELECT p.id AS parent_message_id,\n         EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes\n  FROM messages p\n  JOIN first_replies fr\n    ON p.id = fr.parent_message_id\n), avg_reply AS (\n  SELECT AVG(first_reply_minutes) AS avg_first_reply_minutes\n  FROM reply_times\n)\nSELECT rt.parent_message_id,\n       ROUND(rt.first_reply_minutes, 2) AS first_reply_minutes\nFROM reply_times rt\nCROSS JOIN avg_reply ar\nWHERE rt.first_reply_minutes < ar.avg_first_reply_minutes\nORDER BY first_reply_minutes ASC, parent_message_id ASC;\n```\n\n## Explanation\n\n- The first CTE gets the earliest reply timestamp for each parent.\n- The second CTE converts that into a reply delay in minutes.\n- The third CTE computes the overall average first reply time.\n- The final query keeps only faster-than-average parents.\n\n## Why this is optimal\n\nIt clearly separates the metric, the benchmark, and the final comparison.",
      },
      {
        approach_title: "Subquery avg",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ) SELECT parent_message_id, ROUND(first_reply_minutes, 2) AS first_reply_minutes FROM reply_times WHERE first_reply_minutes < (SELECT AVG(first_reply_minutes) FROM reply_times) ORDER BY first_reply_minutes ASC, parent_message_id ASC;",
        explanation:
          "## Approach\n\nCompute reply times once, then compare each row against an average from the same CTE.\n\n## Query\n\n```sql\nWITH first_replies AS (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), reply_times AS (\n  SELECT p.id AS parent_message_id,\n         EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes\n  FROM messages p\n  JOIN first_replies fr\n    ON p.id = fr.parent_message_id\n)\nSELECT parent_message_id,\n       ROUND(first_reply_minutes, 2) AS first_reply_minutes\nFROM reply_times\nWHERE first_reply_minutes < (\n  SELECT AVG(first_reply_minutes)\n  FROM reply_times\n)\nORDER BY first_reply_minutes ASC, parent_message_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one reply time per parent.\n- The scalar subquery computes the overall average from that same set.\n- The outer query filters faster-than-average rows.\n\n## Difference from the optimal approach\n\nAlso good, but the explicit average CTE is easier to explain.",
      },
      {
        approach_title: "Window avg",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ) SELECT parent_message_id, ROUND(first_reply_minutes, 2) AS first_reply_minutes FROM ( SELECT parent_message_id, first_reply_minutes, AVG(first_reply_minutes) OVER () AS avg_first_reply_minutes FROM reply_times ) rt WHERE first_reply_minutes < avg_first_reply_minutes ORDER BY first_reply_minutes ASC, parent_message_id ASC;",
        explanation:
          "## Approach\n\nAttach the global average first reply time to every parent row using a window function.\n\n## Query\n\n```sql\nWITH first_replies AS (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), reply_times AS (\n  SELECT p.id AS parent_message_id,\n         EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes\n  FROM messages p\n  JOIN first_replies fr\n    ON p.id = fr.parent_message_id\n)\nSELECT parent_message_id,\n       ROUND(first_reply_minutes, 2) AS first_reply_minutes\nFROM (\n  SELECT parent_message_id,\n         first_reply_minutes,\n         AVG(first_reply_minutes) OVER () AS avg_first_reply_minutes\n  FROM reply_times\n) rt\nWHERE first_reply_minutes < avg_first_reply_minutes\nORDER BY first_reply_minutes ASC, parent_message_id ASC;\n```\n\n## Explanation\n\n- The first part computes reply minutes per parent.\n- `AVG(...) OVER ()` adds the same overall average to each row.\n- The outer query keeps rows below that value.\n\n## Difference from the optimal approach\n\nElegant, but slightly less explicit than separate CTEs.",
      },
    ],
  },
  {
    code: "CHAT_073",
    approaches: [
      {
        approach_title: "Channel vs avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ), member_workspace_avg AS ( SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count FROM member_channel_counts GROUP BY workspace_id, sender_member_id ) SELECT mcc.workspace_id, mcc.channel_id, mcc.sender_member_id, mcc.message_count FROM member_channel_counts mcc JOIN member_workspace_avg mwa ON mcc.workspace_id = mwa.workspace_id AND mcc.sender_member_id = mwa.sender_member_id WHERE mcc.message_count > mwa.avg_channel_message_count ORDER BY mcc.workspace_id ASC, mcc.channel_id ASC, mcc.message_count DESC, mcc.sender_member_id ASC;",
        explanation:
          "## Approach\n\nCount messages per member per channel, compute each member's average channel activity within the workspace, then keep channel rows above that average.\n\n## Query\n\n```sql\nWITH member_channel_counts AS (\n  SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n    AND channel_id IS NOT NULL\n  GROUP BY workspace_id, channel_id, sender_member_id\n), member_workspace_avg AS (\n  SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count\n  FROM member_channel_counts\n  GROUP BY workspace_id, sender_member_id\n)\nSELECT mcc.workspace_id,\n       mcc.channel_id,\n       mcc.sender_member_id,\n       mcc.message_count\nFROM member_channel_counts mcc\nJOIN member_workspace_avg mwa\n  ON mcc.workspace_id = mwa.workspace_id\n AND mcc.sender_member_id = mwa.sender_member_id\nWHERE mcc.message_count > mwa.avg_channel_message_count\nORDER BY mcc.workspace_id ASC, mcc.channel_id ASC, mcc.message_count DESC, mcc.sender_member_id ASC;\n```\n\n## Explanation\n\n- The first CTE builds the per-channel message count for each member.\n- The second CTE averages those channel counts per member within each workspace.\n- The final query keeps only member-channel rows above that personal workspace average.\n\n## Why this is optimal\n\nIt clearly models the two levels of aggregation: per-channel and per-member average.",
      },
      {
        approach_title: "Window avg compare",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ) SELECT workspace_id, channel_id, sender_member_id, message_count FROM ( SELECT workspace_id, channel_id, sender_member_id, message_count, AVG(message_count) OVER (PARTITION BY workspace_id, sender_member_id) AS avg_channel_message_count FROM member_channel_counts ) mcc WHERE message_count > avg_channel_message_count ORDER BY workspace_id ASC, channel_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nCompute channel-level counts first, then attach each member's workspace average using a window function.\n\n## Query\n\n```sql\nWITH member_channel_counts AS (\n  SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n    AND channel_id IS NOT NULL\n  GROUP BY workspace_id, channel_id, sender_member_id\n)\nSELECT workspace_id, channel_id, sender_member_id, message_count\nFROM (\n  SELECT workspace_id,\n         channel_id,\n         sender_member_id,\n         message_count,\n         AVG(message_count) OVER (\n           PARTITION BY workspace_id, sender_member_id\n         ) AS avg_channel_message_count\n  FROM member_channel_counts\n) mcc\nWHERE message_count > avg_channel_message_count\nORDER BY workspace_id ASC, channel_id ASC, message_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are computed once.\n- The window average gives each member-channel row that member's average channel count in the workspace.\n- The outer query filters rows above that value.\n\n## Difference from the optimal approach\n\nElegant, but slightly less explicit than separate CTEs.",
      },
      {
        approach_title: "Nested compare CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ), member_workspace_avg AS ( SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count FROM member_channel_counts GROUP BY workspace_id, sender_member_id ), above_avg_channels AS ( SELECT mcc.workspace_id, mcc.channel_id, mcc.sender_member_id, mcc.message_count FROM member_channel_counts mcc JOIN member_workspace_avg mwa ON mcc.workspace_id = mwa.workspace_id AND mcc.sender_member_id = mwa.sender_member_id WHERE mcc.message_count > mwa.avg_channel_message_count ) SELECT workspace_id, channel_id, sender_member_id, message_count FROM above_avg_channels ORDER BY workspace_id ASC, channel_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nBuild the channel counts and averages first, then isolate the above-average rows in a third CTE.\n\n## Query\n\n```sql\nWITH member_channel_counts AS (\n  SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n    AND channel_id IS NOT NULL\n  GROUP BY workspace_id, channel_id, sender_member_id\n), member_workspace_avg AS (\n  SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count\n  FROM member_channel_counts\n  GROUP BY workspace_id, sender_member_id\n), above_avg_channels AS (\n  SELECT mcc.workspace_id, mcc.channel_id, mcc.sender_member_id, mcc.message_count\n  FROM member_channel_counts mcc\n  JOIN member_workspace_avg mwa\n    ON mcc.workspace_id = mwa.workspace_id\n   AND mcc.sender_member_id = mwa.sender_member_id\n  WHERE mcc.message_count > mwa.avg_channel_message_count\n)\nSELECT workspace_id, channel_id, sender_member_id, message_count\nFROM above_avg_channels\nORDER BY workspace_id ASC, channel_id ASC, message_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The first two CTEs compute the needed metrics.\n- The third CTE isolates only qualifying rows.\n- The final query only sorts the result.\n\n## Difference from the optimal approach\n\nVery readable, but more verbose.",
      },
    ],
  },
  {
    code: "CHAT_074",
    approaches: [
      {
        approach_title: "Join replies",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ORDER BY reply_count DESC, p.sender_member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nJoin reply messages to their parent messages, then count how many replies each original sender received.\n\n## Query\n\n```sql\nSELECT p.sender_member_id, COUNT(*) AS reply_count\nFROM messages r\nJOIN messages p\n  ON r.parent_message_id = p.id\nGROUP BY p.sender_member_id\nORDER BY reply_count DESC, p.sender_member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `r` represents reply messages.\n- Joining on `r.parent_message_id = p.id` connects each reply to its parent message.\n- Grouping by `p.sender_member_id` counts replies received by each member.\n- `LIMIT 10` returns the most replied-to members.\n\n## Why this is optimal\n\nIt directly models reply relationships using a self join on `messages`.",
      },
      {
        approach_title: "CTE reply totals",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_reply_totals AS ( SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ) SELECT sender_member_id, reply_count FROM member_reply_totals ORDER BY reply_count DESC, sender_member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute received reply counts in a CTE first, then sort and limit.\n\n## Query\n\n```sql\nWITH member_reply_totals AS (\n  SELECT p.sender_member_id, COUNT(*) AS reply_count\n  FROM messages r\n  JOIN messages p\n    ON r.parent_message_id = p.id\n  GROUP BY p.sender_member_id\n)\nSELECT sender_member_id, reply_count\nFROM member_reply_totals\nORDER BY reply_count DESC, sender_member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE calculates how many replies each member received.\n- The outer query ranks and limits the result.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the reply totals need later joins.",
      },
      {
        approach_title: "Rank replied users",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_reply_totals AS ( SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), ranked_members AS ( SELECT sender_member_id, reply_count, ROW_NUMBER() OVER (ORDER BY reply_count DESC, sender_member_id ASC) AS rn FROM member_reply_totals ) SELECT sender_member_id, reply_count FROM ranked_members WHERE rn <= 10 ORDER BY reply_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nCount received replies first, then rank members with a window function.\n\n## Query\n\n```sql\nWITH member_reply_totals AS (\n  SELECT p.sender_member_id, COUNT(*) AS reply_count\n  FROM messages r\n  JOIN messages p\n    ON r.parent_message_id = p.id\n  GROUP BY p.sender_member_id\n), ranked_members AS (\n  SELECT sender_member_id,\n         reply_count,\n         ROW_NUMBER() OVER (ORDER BY reply_count DESC, sender_member_id ASC) AS rn\n  FROM member_reply_totals\n)\nSELECT sender_member_id, reply_count\nFROM ranked_members\nWHERE rn <= 10\nORDER BY reply_count DESC, sender_member_id ASC;\n```\n\n## Explanation\n\n- The first step computes reply totals per member.\n- `ROW_NUMBER()` ranks members by received replies.\n- The outer query keeps the top 10.\n\n## Difference from the optimal approach\n\nUseful for ranking workflows, but more complex than needed.",
      },
    ],
  },
  {
    code: "CHAT_075",
    approaches: [
      {
        approach_title: "Reaction vs avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(reaction_count) AS avg_reaction_count FROM member_reaction_counts GROUP BY workspace_id ) SELECT mrc.workspace_id, mrc.workspace_member_id, mrc.reaction_count FROM member_reaction_counts mrc JOIN workspace_avg wa ON mrc.workspace_id = wa.workspace_id WHERE mrc.reaction_count > wa.avg_reaction_count;",
        explanation:
          "## Approach\n\nCount reactions given by each workspace member inside each workspace, compute the workspace average, then keep members above that average.\n\n## Explanation\n\n- `message_reactions` stores the reacting member in `workspace_member_id`.\n- `workspace_id` is derived by joining `messages` through `message_id`.\n- `member_reaction_counts` calculates each member's reaction total per workspace.\n- `workspace_avg` calculates the average reaction count in each workspace.\n- The final query keeps only members whose reaction count is greater than their workspace average.\n- No final `ORDER BY` is needed because the fixed question config uses `comparison_config: {}`.",
      },
      {
        approach_title: "Window avg reactions",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ) SELECT workspace_id, workspace_member_id, reaction_count FROM ( SELECT workspace_id, workspace_member_id, reaction_count, AVG(reaction_count) OVER (PARTITION BY workspace_id) AS avg_reaction_count FROM member_reaction_counts ) mrc WHERE reaction_count > avg_reaction_count;",
        explanation:
          "## Approach\n\nCompute reaction counts first, then attach the workspace average using a window function.\n\n## Explanation\n\n- The CTE creates one row per workspace member with their total reactions.\n- `AVG(reaction_count) OVER (PARTITION BY workspace_id)` adds the workspace average to every member row.\n- The outer query filters members whose reaction count is above that average.\n- No output ordering is required for this question.",
      },
      {
        approach_title: "Nested reaction CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(reaction_count) AS avg_reaction_count FROM member_reaction_counts GROUP BY workspace_id ), above_avg_members AS ( SELECT mrc.workspace_id, mrc.workspace_member_id, mrc.reaction_count FROM member_reaction_counts mrc JOIN workspace_avg wa ON mrc.workspace_id = wa.workspace_id WHERE mrc.reaction_count > wa.avg_reaction_count ) SELECT workspace_id, workspace_member_id, reaction_count FROM above_avg_members;",
        explanation:
          "## Approach\n\nCompute counts and averages first, then isolate the qualifying rows in a third CTE.\n\n## Explanation\n\n- The first CTE computes member-level reaction totals.\n- The second CTE computes workspace-level averages.\n- The third CTE keeps only above-average members.\n- The final SELECT returns the required columns without unnecessary ordering.",
      },
    ],
  },

  {
    code: "CHAT_076",
    approaches: [
      {
        approach_title: "Top 3 row number",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn <= 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nCount messages per member in each workspace, rank members inside each workspace, then keep the top 3.\n\n## Explanation\n\n- `member_message_counts` calculates non-deleted message totals per member per workspace.\n- `ROW_NUMBER()` assigns a deterministic rank using `message_count DESC, sender_member_id ASC`.\n- `rn <= 3` keeps exactly 3 members per workspace.\n- Final `ORDER BY` is required because this is a Top N/ranking question and the config has `sort_by_columns`.",
      },
      {
        approach_title: "Top 3 dense rank",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, DENSE_RANK() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rnk FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rnk <= 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nUse `DENSE_RANK()` to rank members by message count within each workspace.\n\n## Explanation\n\n- The grouped counts are the same as the optimal solution.\n- `DENSE_RANK()` ranks rows using the required deterministic ordering.\n- Because `sender_member_id` is included in the ranking order, ties are resolved consistently.\n- `ROW_NUMBER()` is still more direct when the goal is exactly 3 rows per workspace.",
      },
      {
        approach_title: "Top 3 rank range",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn BETWEEN 1 AND 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;",
        explanation:
          "## Approach\n\nRank members per workspace and keep rows whose rank is between 1 and 3.\n\n## Explanation\n\n- This uses the same ranking logic as the optimal approach.\n- `rn BETWEEN 1 AND 3` is equivalent to `rn <= 3`.\n- Final ordering is required because the question explicitly asks for top 3 members.",
      },
    ],
  },

  {
    code: "CHAT_077",
    approaches: [
      {
        approach_title: "Recursive depth",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ) SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ORDER BY max_reply_depth DESC, root_message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nTraverse each reply tree recursively from every root message, then calculate the deepest reply level.\n\n## Explanation\n\n- The base query starts with root messages where `parent_message_id IS NULL`.\n- The recursive part walks from each message to its replies.\n- `depth + 1` tracks how far each reply is from the root.\n- `MAX(depth)` gives the deepest chain for each root message.\n- `ORDER BY ... LIMIT 10` is required because this is a top 10 question.",
      },
      {
        approach_title: "Recursive rank top",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ), root_depths AS ( SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ) SELECT root_message_id, max_reply_depth FROM root_depths ORDER BY max_reply_depth DESC, root_message_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nBuild the recursive tree first, then aggregate root depths in a separate CTE.\n\n## Explanation\n\n- `message_tree` creates the hierarchy of root messages and replies.\n- `root_depths` computes the deepest reply depth for each root.\n- The final query sorts deepest threads first and returns the top 10.\n- This is slightly more verbose than the optimal approach but easier to read.",
      },
      {
        approach_title: "Recursive row number",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ), root_depths AS ( SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ), ranked_roots AS ( SELECT root_message_id, max_reply_depth, ROW_NUMBER() OVER (ORDER BY max_reply_depth DESC, root_message_id ASC) AS rn FROM root_depths ) SELECT root_message_id, max_reply_depth FROM ranked_roots WHERE rn <= 10 ORDER BY max_reply_depth DESC, root_message_id ASC;",
        explanation:
          "## Approach\n\nCompute maximum depth per root, then rank roots with `ROW_NUMBER()`.\n\n## Explanation\n\n- The recursive CTE builds the full reply tree.\n- `root_depths` calculates the maximum reply depth per root message.\n- `ROW_NUMBER()` ranks roots by deepest thread first.\n- `rn <= 10` keeps the top 10 rows.\n- This is useful for ranking workflows, but `ORDER BY ... LIMIT 10` is simpler here.",
      },
    ],
  },

  {
    code: "CHAT_078",
    approaches: [
      {
        approach_title: "Compare to replier avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_received_replies AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_avg AS ( SELECT rrr.member_id, AVG(COALESCE(rr.received_reply_count, 0)) AS avg_replier_received_reply_count FROM replier_received_replies rrr LEFT JOIN received_replies rr ON rrr.replier_member_id = rr.member_id GROUP BY rrr.member_id ) SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN replier_avg ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count;",
        explanation:
          "## Approach\n\nCount replies received by each member, calculate the average popularity of their repliers, then compare.\n\n## Explanation\n\n- `received_replies` counts how many replies each original message sender received.\n- `replier_received_replies` maps each original sender to the members who replied to them.\n- `replier_avg` calculates the average received-reply count of those repliers.\n- The final query returns members whose own received reply count is greater than that replier average.\n- No final ordering is required because the question config is `{}`.",
      },
      {
        approach_title: "Nested compare CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_pairs AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_avg AS ( SELECT rp.member_id, AVG(COALESCE(rr2.received_reply_count, 0)) AS avg_replier_received_reply_count FROM replier_pairs rp LEFT JOIN received_replies rr2 ON rp.replier_member_id = rr2.member_id GROUP BY rp.member_id ), popular_members AS ( SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN replier_avg ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count ) SELECT member_id, received_reply_count FROM popular_members;",
        explanation:
          "## Approach\n\nUse an additional CTE to isolate the final qualifying members.\n\n## Explanation\n\n- The first CTE builds each member's received-reply count.\n- The second CTE builds original-sender to replier relationships.\n- The third CTE calculates the repliers' average popularity.\n- `popular_members` keeps only members above that benchmark.\n- The final SELECT returns the required result without unnecessary ordering.",
      },
      {
        approach_title: "Window on repliers",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_pairs AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_scores AS ( SELECT rp.member_id, COALESCE(rr2.received_reply_count, 0) AS replier_received_reply_count FROM replier_pairs rp LEFT JOIN received_replies rr2 ON rp.replier_member_id = rr2.member_id ) SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN ( SELECT DISTINCT member_id, AVG(replier_received_reply_count) OVER (PARTITION BY member_id) AS avg_replier_received_reply_count FROM replier_scores ) ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count;",
        explanation:
          "## Approach\n\nBuild replier scores, then use a window average to calculate the benchmark per member.\n\n## Explanation\n\n- `replier_scores` assigns each replier their own received-reply count.\n- The window average computes the average score of all repliers for each target member.\n- The final comparison keeps target members whose received replies exceed that average.\n- This is valid, but grouped averages are easier to reason about.",
      },
    ],
  },

  {
    code: "CHAT_079",
    approaches: [
      {
        approach_title: "Range window leader",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), daily_leaders AS ( SELECT DISTINCT ON (message_date) message_date::date AS message_date, sender_member_id, rolling_7d_count FROM rolling_counts ORDER BY message_date, rolling_7d_count DESC, sender_member_id ASC ) SELECT message_date, sender_member_id, rolling_7d_count FROM daily_leaders ORDER BY message_date ASC;",
        explanation:
          "## Approach\n\nAggregate messages per member per day, compute trailing 7-day totals, then choose the daily leader.\n\n## Explanation\n\n- `daily_member_messages` reduces raw messages into daily counts.\n- The window `RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW` calculates a rolling 7-day total.\n- `DISTINCT ON (message_date)` keeps one leader per date.\n- The internal `ORDER BY` is required to choose the correct leader and tie-break by `sender_member_id`.\n- Final ordering by `message_date ASC` is required by the fixed config.",
      },
      {
        approach_title: "Row number leader",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), ranked_members AS ( SELECT message_date::date AS message_date, sender_member_id, rolling_7d_count, ROW_NUMBER() OVER (PARTITION BY message_date ORDER BY rolling_7d_count DESC, sender_member_id ASC) AS rn FROM rolling_counts ) SELECT message_date, sender_member_id, rolling_7d_count FROM ranked_members WHERE rn = 1 ORDER BY message_date ASC;",
        explanation:
          "## Approach\n\nUse the same rolling calculation, then rank members within each date.\n\n## Explanation\n\n- `ROW_NUMBER()` ranks members by rolling 7-day count for each date.\n- `rn = 1` selects the daily leader.\n- The ranking order is necessary for correctness.\n- The final result order follows the question config.",
      },
      {
        approach_title: "Nested leader CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), daily_leaders AS ( SELECT DISTINCT ON (message_date) message_date::date AS message_date, sender_member_id, rolling_7d_count FROM rolling_counts ORDER BY message_date, rolling_7d_count DESC, sender_member_id ASC ) SELECT message_date, sender_member_id, rolling_7d_count FROM daily_leaders ORDER BY message_date ASC;",
        explanation:
          "## Approach\n\nSeparate daily aggregation, rolling totals, and daily leader selection into named CTEs.\n\n## Explanation\n\n- This is the same logic as the optimal version.\n- The final `daily_leaders` CTE isolates the top member per date.\n- Output ordering is kept because the question requires date order.",
      },
    ],
  },
  {
    code: "CHAT_080",
    approaches: [
      {
        approach_title: "Lag growth streak",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH weekly_channel_messages AS ( SELECT channel_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, DATE_TRUNC('week', sent_at)::date ), weekly_growth AS ( SELECT channel_id, week_start, weekly_count, LAG(weekly_count) OVER (PARTITION BY channel_id ORDER BY week_start) AS prev_week_count FROM weekly_channel_messages ), growth_flags AS ( SELECT channel_id, week_start, CASE WHEN prev_week_count IS NOT NULL AND weekly_count > prev_week_count THEN 1 ELSE 0 END AS is_growth_week FROM weekly_growth ), grouped_flags AS ( SELECT channel_id, week_start, is_growth_week, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY channel_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags ), grouped_growth AS ( SELECT channel_id, week_start, grp FROM grouped_flags WHERE is_growth_week = 1 ) SELECT channel_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY channel_id, grp HAVING COUNT(*) >= 3;",
        explanation:
          "## Approach\n\nCompute weekly message totals per channel, mark whether each week grew compared to the previous week, then group consecutive growth weeks into streaks.\n\n## Explanation\n\n- `weekly_channel_messages` calculates one message count per channel per week.\n- `LAG(weekly_count)` compares each week with the previous week for the same channel.\n- `growth_flags` marks true week-over-week growth as `1`.\n- `grouped_flags` assigns streak groups before filtering out non-growth weeks. This is important because non-growth weeks must break the streak.\n- `grouped_growth` then keeps only growth weeks.\n- The final query counts each growth streak and keeps streaks with at least 3 consecutive growth weeks.\n- The `ORDER BY` clauses inside window functions are required because they define chronological comparison.\n- No final `ORDER BY` is used because this question has `comparison_config: {}` and output order is not part of the requirement.\n\n## Why this is optimal\n\nIt correctly detects uninterrupted consecutive growth streaks by grouping all weeks first, then filtering only the growth weeks after streak groups are assigned.",
      },
      {
        approach_title: "Nested growth CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH weekly_channel_messages AS ( SELECT channel_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, DATE_TRUNC('week', sent_at)::date ), weekly_growth AS ( SELECT channel_id, week_start, weekly_count, LAG(weekly_count) OVER (PARTITION BY channel_id ORDER BY week_start) AS prev_week_count FROM weekly_channel_messages ), growth_flags AS ( SELECT channel_id, week_start, CASE WHEN prev_week_count IS NOT NULL AND weekly_count > prev_week_count THEN 1 ELSE 0 END AS is_growth_week FROM weekly_growth ), grouped_flags AS ( SELECT channel_id, week_start, is_growth_week, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY channel_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags ), streaks AS ( SELECT channel_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_flags WHERE is_growth_week = 1 GROUP BY channel_id, grp ) SELECT channel_id, consecutive_growth_weeks FROM streaks WHERE consecutive_growth_weeks >= 3;",
        explanation:
          "## Approach\n\nUse an extra `streaks` CTE to make the streak-counting step explicit.\n\n## Explanation\n\n- Weekly message counts are calculated first.\n- `LAG()` compares each channel's weekly count with the previous week.\n- `growth_flags` marks whether each week is a growth week.\n- `grouped_flags` creates the streak group before filtering. This ensures a non-growth week breaks the streak.\n- `streaks` counts only growth weeks within each streak group.\n- The final query keeps streaks with at least 3 consecutive growth weeks.\n- No final `ORDER BY` is included because ordering is not required for this question.\n\n## Difference from optimal approach\n\nThis version is slightly more verbose, but it makes the streak-counting phase easier to read.",
      },
    ],
  },
  {
    code: "CHAT_081",
    approaches: [
      {
        approach_title: "Median first reply",
        approach_type: "ordered_set_aggregate",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), parent_reply_times AS ( SELECT p.channel_id, p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id WHERE p.channel_id IS NOT NULL ) SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM parent_reply_times GROUP BY channel_id ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nFind the first reply time for each parent message, convert it to minutes, then compute the median per channel.\n\n## Query\n\n```sql\nWITH first_replies AS (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), parent_reply_times AS (\n  SELECT p.channel_id,\n         p.id AS parent_message_id,\n         EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes\n  FROM messages p\n  JOIN first_replies fr\n    ON p.id = fr.parent_message_id\n  WHERE p.channel_id IS NOT NULL\n)\nSELECT channel_id,\n       ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes\nFROM parent_reply_times\nGROUP BY channel_id\nORDER BY median_first_reply_minutes ASC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `PERCENTILE_CONT` returns a floating-point value here.\n- Casting to `numeric` before `ROUND(..., 2)` fixes the Postgres error.\n- Lower median means faster first replies.\n\n## Why this is optimal\n\nIt preserves the intended logic and fixes the type issue cleanly.",
      },
      {
        approach_title: "Subquery median",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM ( SELECT p.channel_id, EXTRACT(EPOCH FROM (MIN(r.sent_at) - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN messages r ON r.parent_message_id = p.id WHERE p.channel_id IS NOT NULL GROUP BY p.channel_id, p.id, p.sent_at ) parent_reply_times GROUP BY channel_id ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table to calculate first reply times, then compute the median per channel.\n\n## Query\n\n```sql\nSELECT channel_id,\n       ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes\nFROM (\n  SELECT p.channel_id,\n         EXTRACT(EPOCH FROM (MIN(r.sent_at) - p.sent_at)) / 60.0 AS first_reply_minutes\n  FROM messages p\n  JOIN messages r\n    ON r.parent_message_id = p.id\n  WHERE p.channel_id IS NOT NULL\n  GROUP BY p.channel_id, p.id, p.sent_at\n) parent_reply_times\nGROUP BY channel_id\nORDER BY median_first_reply_minutes ASC, channel_id ASC\nLIMIT 10;\n```\n\n## Difference from the optimal approach\n\nIt works, but the two-step CTE version is easier to read.",
      },
      {
        approach_title: "Nested median CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), parent_reply_times AS ( SELECT p.channel_id, p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id WHERE p.channel_id IS NOT NULL ), channel_medians AS ( SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM parent_reply_times GROUP BY channel_id ) SELECT channel_id, median_first_reply_minutes FROM channel_medians ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nBreak the median computation into an extra CTE after building parent reply times.\n\n## Query\n\n```sql\nWITH first_replies AS (\n  SELECT parent_message_id, MIN(sent_at) AS first_reply_at\n  FROM messages\n  WHERE parent_message_id IS NOT NULL\n  GROUP BY parent_message_id\n), parent_reply_times AS (\n  SELECT p.channel_id,\n         p.id AS parent_message_id,\n         EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes\n  FROM messages p\n  JOIN first_replies fr\n    ON p.id = fr.parent_message_id\n  WHERE p.channel_id IS NOT NULL\n), channel_medians AS (\n  SELECT channel_id,\n         ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes\n  FROM parent_reply_times\n  GROUP BY channel_id\n)\nSELECT channel_id, median_first_reply_minutes\nFROM channel_medians\nORDER BY median_first_reply_minutes ASC, channel_id ASC\nLIMIT 10;\n```\n\n## Difference from the optimal approach\n\nVery clear, but slightly more verbose.",
      },
    ],
  },
  {
    code: "CHAT_082",
    approaches: [
      {
        approach_title: "Match public count",
        approach_type: "count_distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH public_channels AS ( SELECT workspace_id, COUNT(*) AS public_channel_count FROM channels WHERE visibility = 'public' GROUP BY workspace_id ), public_memberships AS ( SELECT c.workspace_id, cm.workspace_member_id, COUNT(DISTINCT cm.channel_id) AS joined_public_channels FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'public' GROUP BY c.workspace_id, cm.workspace_member_id ) SELECT pm.workspace_id, pm.workspace_member_id FROM public_memberships pm JOIN public_channels pc ON pm.workspace_id = pc.workspace_id WHERE pm.joined_public_channels = pc.public_channel_count;",
        explanation:
          "## Approach\n\nCount public channels per workspace, count how many public channels each workspace member belongs to, then keep members whose count matches the workspace total.\n\n## Explanation\n\n- `public_channels` gives the number of public channels in each workspace.\n- `public_memberships` counts distinct public channels joined by each workspace member.\n- If both counts are equal, the member belongs to every public channel in that workspace.\n- `COUNT(DISTINCT cm.channel_id)` avoids duplicate membership rows affecting the result.\n- No final `ORDER BY` is needed because the question does not require ordered output.",
      },
      {
        approach_title: "Nested coverage CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH public_channels AS ( SELECT workspace_id, COUNT(*) AS public_channel_count FROM channels WHERE visibility = 'public' GROUP BY workspace_id ), public_memberships AS ( SELECT c.workspace_id, cm.workspace_member_id, COUNT(DISTINCT cm.channel_id) AS joined_public_channels FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'public' GROUP BY c.workspace_id, cm.workspace_member_id ), fully_covered_members AS ( SELECT pm.workspace_id, pm.workspace_member_id FROM public_memberships pm JOIN public_channels pc ON pm.workspace_id = pc.workspace_id WHERE pm.joined_public_channels = pc.public_channel_count ) SELECT workspace_id, workspace_member_id FROM fully_covered_members;",
        explanation:
          "## Approach\n\nSeparate the final qualifying members into their own CTE for readability.\n\n## Explanation\n\n- The first two CTEs calculate workspace public-channel totals and member public-channel coverage.\n- `fully_covered_members` keeps only members whose joined public-channel count equals the workspace public-channel count.\n- The final query returns those members.\n- Since ordering is not part of the requirement, the query does not include a final `ORDER BY`.",
      },
    ],
  },
  {
    code: "CHAT_083",
    approaches: [
      {
        approach_title: "Full join compare",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ) SELECT workspace_id, workspace_member_id FROM combined GROUP BY workspace_id, workspace_member_id HAVING COUNT(*) FILTER (WHERE reaction_count > message_count) > COUNT(*) FILTER (WHERE message_count > reaction_count);",
        explanation:
          "## Approach\n\nCompute message activity and reaction activity per workspace member per channel, merge both sides, then keep members whose reaction-heavy channels outnumber message-heavy channels.\n\n## Explanation\n\n- `message_counts` counts non-deleted messages sent by each member in each channel.\n- `reaction_counts` counts reactions given by each member in each channel. Since `message_reactions` does not directly store `workspace_id` or `channel_id`, it joins through `messages`.\n- The `FULL OUTER JOIN` is important because a member may have only messages, only reactions, or both in a channel.\n- `COALESCE(..., 0)` treats missing activity as zero, making the comparison fair.\n- The `HAVING` clause compares how many channels are reaction-heavy versus message-heavy for each member.\n- No final `ORDER BY` is used because the question does not require ordered output and the comparator should ignore row order by default.",
      },
      {
        approach_title: "Case compare",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ) SELECT workspace_id, workspace_member_id FROM combined GROUP BY workspace_id, workspace_member_id HAVING SUM(CASE WHEN reaction_count > message_count THEN 1 ELSE 0 END) > SUM(CASE WHEN message_count > reaction_count THEN 1 ELSE 0 END);",
        explanation:
          "## Approach\n\nUse `CASE` expressions instead of aggregate `FILTER` clauses to count reaction-heavy and message-heavy channels.\n\n## Explanation\n\n- The same per-channel message and reaction counts are built first.\n- `CASE WHEN reaction_count > message_count THEN 1 ELSE 0 END` marks reaction-heavy channels.\n- `CASE WHEN message_count > reaction_count THEN 1 ELSE 0 END` marks message-heavy channels.\n- The member qualifies only when the reaction-heavy channel count is greater.\n- This is logically correct, but the `FILTER` version is cleaner in PostgreSQL.\n- No final ordering is included because the fixed question config does not require sorting.",
      },
      {
        approach_title: "Nested combined CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ), member_channel_balance AS ( SELECT workspace_id, workspace_member_id, COUNT(*) FILTER (WHERE reaction_count > message_count) AS reaction_heavy_channels, COUNT(*) FILTER (WHERE message_count > reaction_count) AS message_heavy_channels FROM combined GROUP BY workspace_id, workspace_member_id ) SELECT workspace_id, workspace_member_id FROM member_channel_balance WHERE reaction_heavy_channels > message_heavy_channels;",
        explanation:
          "## Approach\n\nSeparate the final member-level channel balance into its own CTE.\n\n## Explanation\n\n- `member_channel_balance` makes the final comparison easier to read.\n- It stores both reaction-heavy and message-heavy channel counts per member.\n- The final query simply filters members whose reaction-heavy channel count is greater.\n- This version is more verbose than the optimal query, but easier to debug.\n- No final `ORDER BY` is needed because ordering is not part of the question requirement.",
      },
    ],
  },
  {
    code: "CHAT_084",
    approaches: [
      {
        approach_title: "Recursive top root",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), ranked_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY total_descendant_replies DESC, root_message_id ASC) AS rn FROM reply_totals ) SELECT workspace_id, root_message_id, total_descendant_replies FROM ranked_roots WHERE rn = 1;",
        explanation:
          "## Approach\n\nUse a recursive CTE to count all descendant replies for every root message, then rank roots inside each workspace.\n\n## Explanation\n\n- The recursive CTE starts from root messages where `parent_message_id IS NULL`.\n- Each recursive step walks from a message to its replies.\n- `COUNT(*) - 1` removes the root message itself, leaving only descendant replies.\n- `ROW_NUMBER()` selects exactly one root per workspace.\n- The window `ORDER BY total_descendant_replies DESC, root_message_id ASC` is required because it decides the winner inside each workspace.\n- No final `ORDER BY` is used because the output order itself is not part of the requirement.",
      },
      {
        approach_title: "Recursive join max",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), workspace_max AS ( SELECT workspace_id, MAX(total_descendant_replies) AS max_descendant_replies FROM reply_totals GROUP BY workspace_id ) SELECT rt.workspace_id, MIN(rt.root_message_id) AS root_message_id, wm.max_descendant_replies AS total_descendant_replies FROM reply_totals rt JOIN workspace_max wm ON rt.workspace_id = wm.workspace_id AND rt.total_descendant_replies = wm.max_descendant_replies GROUP BY rt.workspace_id, wm.max_descendant_replies;",
        explanation:
          "## Approach\n\nFind descendant totals, calculate the maximum total per workspace, then join back to pick the matching root.\n\n## Explanation\n\n- `reply_totals` calculates reply-tree size per root message.\n- `workspace_max` finds the highest descendant count in each workspace.\n- Joining back keeps only roots matching the workspace maximum.\n- `MIN(root_message_id)` handles ties in the same way as the window solution.\n- This is correct, but more verbose than using `ROW_NUMBER()`.\n- No final ordering is included because the comparator does not enforce order for this question.",
      },
      {
        approach_title: "Nested recursive rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), ranked_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY total_descendant_replies DESC, root_message_id ASC) AS rn FROM reply_totals ), top_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies FROM ranked_roots WHERE rn = 1 ) SELECT workspace_id, root_message_id, total_descendant_replies FROM top_roots;",
        explanation:
          "## Approach\n\nUse the same recursive ranking logic, but isolate the winning root rows in a final CTE.\n\n## Explanation\n\n- The recursive tree counts all descendants for each root.\n- The ranking step picks the root with the most replies per workspace.\n- The extra `top_roots` CTE makes the final selection explicit.\n- This improves readability but adds one more CTE than necessary.\n- Final output ordering is omitted because the question only asks for the top root per workspace, not a sorted result set.",
      },
    ],
  },
  {
    code: "CHAT_085",
    approaches: [
      {
        approach_title: "Three metrics compare",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH message_counts AS ( SELECT workspace_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), mention_counts AS ( SELECT m.workspace_id, m.sender_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY m.workspace_id, m.sender_member_id ), member_metrics AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id, mic.workspace_id) AS workspace_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id, mic.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count, COALESCE(mic.mention_count, 0) AS mention_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.workspace_member_id = rc.workspace_member_id FULL OUTER JOIN mention_counts mic ON COALESCE(mc.workspace_id, rc.workspace_id) = mic.workspace_id AND COALESCE(mc.workspace_member_id, rc.workspace_member_id) = mic.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_message_count, AVG(reaction_count) AS avg_reaction_count, AVG(mention_count) AS avg_mention_count FROM member_metrics GROUP BY workspace_id ) SELECT mm.workspace_id, mm.workspace_member_id, mm.message_count, mm.reaction_count, mm.mention_count FROM member_metrics mm JOIN workspace_avg wa ON mm.workspace_id = wa.workspace_id WHERE mm.message_count > wa.avg_message_count AND mm.reaction_count > wa.avg_reaction_count AND mm.mention_count > wa.avg_mention_count;",
        explanation:
          "## Approach\n\nBuild three member-level activity metrics per workspace: messages sent, reactions added, and mentions made. Then compare each member against the average values for their workspace.\n\n## Explanation\n\n- `message_counts` counts non-deleted messages sent by each workspace member.\n- `reaction_counts` joins `message_reactions` to `messages` because reactions need the message row to derive `workspace_id`.\n- `mention_counts` counts mentions made by each sender using `messages.sender_member_id`.\n- `FULL OUTER JOIN` keeps members who may appear in only one or two metric sources.\n- `COALESCE(..., 0)` converts missing metrics into zero before calculating averages.\n- `workspace_avg` calculates the average message, reaction, and mention counts per workspace.\n- The final `WHERE` clause keeps only members above their workspace average in all three metrics.\n- No final `ORDER BY` is used because the question does not require sorted output and the comparator ignores order by default.",
      },
      {
        approach_title: "Nested metrics CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH message_counts AS ( SELECT workspace_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), mention_counts AS ( SELECT m.workspace_id, m.sender_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY m.workspace_id, m.sender_member_id ), member_metrics AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id, mic.workspace_id) AS workspace_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id, mic.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count, COALESCE(mic.mention_count, 0) AS mention_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.workspace_member_id = rc.workspace_member_id FULL OUTER JOIN mention_counts mic ON COALESCE(mc.workspace_id, rc.workspace_id) = mic.workspace_id AND COALESCE(mc.workspace_member_id, rc.workspace_member_id) = mic.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_message_count, AVG(reaction_count) AS avg_reaction_count, AVG(mention_count) AS avg_mention_count FROM member_metrics GROUP BY workspace_id ), power_members AS ( SELECT mm.workspace_id, mm.workspace_member_id, mm.message_count, mm.reaction_count, mm.mention_count FROM member_metrics mm JOIN workspace_avg wa ON mm.workspace_id = wa.workspace_id WHERE mm.message_count > wa.avg_message_count AND mm.reaction_count > wa.avg_reaction_count AND mm.mention_count > wa.avg_mention_count ) SELECT workspace_id, workspace_member_id, message_count, reaction_count, mention_count FROM power_members;",
        explanation:
          "## Approach\n\nUse an extra `power_members` CTE to separate the filtering step from the final projection.\n\n## Explanation\n\n- The first CTEs build message, reaction, and mention counts.\n- `member_metrics` merges all metrics into one row per workspace member.\n- `workspace_avg` calculates workspace-level averages.\n- `power_members` keeps only members above all three averages.\n- The final query returns the required columns from that CTE.\n- No final ordering is required because the question only asks to find qualifying members.",
      },
    ],
  },
  {
    code: "CHAT_086",
    approaches: [
      {
        approach_title: "Unread dormant members",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), unread_counts AS ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ) SELECT uc.workspace_member_id, uc.unread_message_count FROM unread_counts uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE (ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days') AND uc.unread_message_count > 20 ORDER BY uc.unread_message_count DESC, uc.workspace_member_id ASC;",
        explanation:
          "## Approach\n\nFind each member's last sent message time, count unread channel messages using `channel_members.last_read_at`, then keep dormant members with large unread backlogs.\n\n## Query\n\n```sql\nWITH last_sent AS (\n  SELECT sender_member_id AS workspace_member_id,\n         MAX(sent_at) AS last_sent_at\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY sender_member_id\n), unread_counts AS (\n  SELECT cm.workspace_member_id,\n         COUNT(m.id) AS unread_message_count\n  FROM channel_members cm\n  JOIN messages m\n    ON m.channel_id = cm.channel_id\n   AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01')\n   AND m.is_deleted = false\n  GROUP BY cm.workspace_member_id\n)\nSELECT uc.workspace_member_id, uc.unread_message_count\nFROM unread_counts uc\nLEFT JOIN last_sent ls\n  ON uc.workspace_member_id = ls.workspace_member_id\nWHERE (ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days')\n  AND uc.unread_message_count > 20\nORDER BY uc.unread_message_count DESC, uc.workspace_member_id ASC;\n```\n\n## Explanation\n\n- The schema has no `channel_message_reads` table.\n- Per-channel read state is stored directly on `channel_members.last_read_at`.\n- `COALESCE(..., TIMESTAMP '1970-01-01')` treats never-read channels as fully unread.\n- The final filter keeps members dormant for 30 days with more than 20 unread channel messages.\n\n## Why this is optimal\n\nIt matches the actual schema and derives unread counts from the correct per-channel read timestamp.",
      },
      {
        approach_title: "Nested unread CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), unread_counts AS ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ), dormant_members AS ( SELECT uc.workspace_member_id, uc.unread_message_count FROM unread_counts uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days' ) SELECT workspace_member_id, unread_message_count FROM dormant_members WHERE unread_message_count > 20 ORDER BY unread_message_count DESC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nFirst identify dormant members with unread counts, then apply the unread threshold in the outer query.\n\n## Difference from the optimal approach\n\nMore verbose, but nicely layered.",
      },
      {
        approach_title: "Unread subquery",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ) SELECT uc.workspace_member_id, uc.unread_message_count FROM ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ) uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE (ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days') AND uc.unread_message_count > 20 ORDER BY uc.unread_message_count DESC, uc.workspace_member_id ASC;",
        explanation:
          "## Approach\n\nUse a derived table for unread counts and join it to the last-sent metric.\n\n## Difference from the optimal approach\n\nEquivalent, but the CTE version is easier to read.",
      },
    ],
  },
  {
    code: "CHAT_087",
    approaches: [
      {
        approach_title: "Mutual reply pairs",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH direct_replies AS ( SELECT LEAST(p.sender_member_id, r.sender_member_id) AS member_1, GREATEST(p.sender_member_id, r.sender_member_id) AS member_2, p.sender_member_id AS original_sender, r.sender_member_id AS replier_sender, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id WHERE p.conversation_id IS NOT NULL AND r.conversation_id = p.conversation_id GROUP BY LEAST(p.sender_member_id, r.sender_member_id), GREATEST(p.sender_member_id, r.sender_member_id), p.sender_member_id, r.sender_member_id ), pair_summary AS ( SELECT member_1, member_2, COUNT(*) FILTER (WHERE original_sender = member_1 AND replier_sender = member_2 AND reply_count >= 3) AS member_2_replies_to_member_1, COUNT(*) FILTER (WHERE original_sender = member_2 AND replier_sender = member_1 AND reply_count >= 3) AS member_1_replies_to_member_2 FROM direct_replies GROUP BY member_1, member_2 ) SELECT member_1, member_2 FROM pair_summary WHERE member_2_replies_to_member_1 > 0 AND member_1_replies_to_member_2 > 0;",
        explanation:
          "## Approach\n\nCount directional reply activity between each pair of members, then keep only pairs where both directions meet the minimum reply threshold.\n\n## Explanation\n\n- `messages r` represents replies.\n- `messages p` represents the parent/original messages.\n- `r.parent_message_id = p.id` connects each reply to the message it replied to.\n- `LEAST` and `GREATEST` normalize each pair so the same two members appear as one pair regardless of direction.\n- `original_sender` and `replier_sender` preserve direction so we can check both sides independently.\n- The final filter requires at least one qualifying direction from member 1 to member 2 and one qualifying direction from member 2 to member 1.\n- No final `ORDER BY` is used because the fixed question config does not require sorted output.",
      },
      {
        approach_title: "Case mutual counts",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH direct_replies AS ( SELECT LEAST(p.sender_member_id, r.sender_member_id) AS member_1, GREATEST(p.sender_member_id, r.sender_member_id) AS member_2, p.sender_member_id AS original_sender, r.sender_member_id AS replier_sender, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id WHERE p.conversation_id IS NOT NULL AND r.conversation_id = p.conversation_id GROUP BY LEAST(p.sender_member_id, r.sender_member_id), GREATEST(p.sender_member_id, r.sender_member_id), p.sender_member_id, r.sender_member_id ) SELECT member_1, member_2 FROM direct_replies GROUP BY member_1, member_2 HAVING SUM(CASE WHEN original_sender = member_1 AND replier_sender = member_2 AND reply_count >= 3 THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN original_sender = member_2 AND replier_sender = member_1 AND reply_count >= 3 THEN 1 ELSE 0 END) > 0;",
        explanation:
          "## Approach\n\nUse conditional `CASE` aggregation instead of `FILTER` to verify both reply directions.\n\n## Explanation\n\n- The `direct_replies` CTE still calculates directional reply counts per normalized pair.\n- The final `HAVING` clause uses two conditional sums.\n- The first conditional sum checks replies from member 2 to member 1.\n- The second conditional sum checks replies from member 1 to member 2.\n- Both must be greater than zero for the pair to qualify.\n- This is equivalent to the `FILTER` solution, but slightly more verbose.\n- No final ordering is needed because output order is not part of the requirement.",
      },
    ],
  },
  {
    code: "CHAT_088",
    approaches: [
      {
        approach_title: "Top sender share",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), channel_totals AS ( SELECT channel_id, SUM(message_count) AS total_messages, MAX(message_count) AS top_member_messages FROM channel_member_counts GROUP BY channel_id ) SELECT channel_id, top_member_messages, total_messages FROM channel_totals WHERE top_member_messages::numeric / total_messages > 0.50 ORDER BY top_member_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount messages per sender within each channel, derive the total channel volume and top sender volume, then compare the share.\n\n## Query\n\n```sql\nWITH channel_member_counts AS (\n  SELECT channel_id,\n         sender_member_id,\n         COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id, sender_member_id\n), channel_totals AS (\n  SELECT channel_id,\n         SUM(message_count) AS total_messages,\n         MAX(message_count) AS top_member_messages\n  FROM channel_member_counts\n  GROUP BY channel_id\n)\nSELECT channel_id, top_member_messages, total_messages\nFROM channel_totals\nWHERE top_member_messages::numeric / total_messages > 0.50\nORDER BY top_member_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The first CTE gets each member's message count per channel.\n- The second CTE summarizes each channel into total volume and top sender volume.\n- Casting to `numeric` avoids integer division.\n- The final filter keeps channels where the top sender exceeds 50 percent of all messages.\n\n## Why this is optimal\n\nIt clearly separates member-level counts from channel-level share calculation.",
      },
      {
        approach_title: "Rank share compare",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), ranked_members AS ( SELECT channel_id, sender_member_id, message_count, SUM(message_count) OVER (PARTITION BY channel_id) AS total_messages, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM channel_member_counts ) SELECT channel_id, message_count AS top_member_messages, total_messages FROM ranked_members WHERE rn = 1 AND message_count::numeric / total_messages > 0.50 ORDER BY top_member_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCount channel-member messages, then use window functions to get the channel total and the top sender.\n\n## Query\n\n```sql\nWITH channel_member_counts AS (\n  SELECT channel_id,\n         sender_member_id,\n         COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id, sender_member_id\n), ranked_members AS (\n  SELECT channel_id,\n         sender_member_id,\n         message_count,\n         SUM(message_count) OVER (PARTITION BY channel_id) AS total_messages,\n         ROW_NUMBER() OVER (\n           PARTITION BY channel_id\n           ORDER BY message_count DESC, sender_member_id ASC\n         ) AS rn\n  FROM channel_member_counts\n)\nSELECT channel_id,\n       message_count AS top_member_messages,\n       total_messages\nFROM ranked_members\nWHERE rn = 1\n  AND message_count::numeric / total_messages > 0.50\nORDER BY top_member_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The grouped counts are computed once.\n- `SUM(...) OVER` gives the channel total on every member row.\n- `ROW_NUMBER()` isolates the top sender per channel.\n- The final filter checks whether that sender's share exceeds 50 percent.\n\n## Difference from the optimal approach\n\nElegant, but slightly more advanced than the simpler two-CTE summary.",
      },
      {
        approach_title: "Nested share CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), channel_totals AS ( SELECT channel_id, SUM(message_count) AS total_messages, MAX(message_count) AS top_member_messages FROM channel_member_counts GROUP BY channel_id ), dominant_channels AS ( SELECT channel_id, top_member_messages, total_messages FROM channel_totals WHERE top_member_messages::numeric / total_messages > 0.50 ) SELECT channel_id, top_member_messages, total_messages FROM dominant_channels ORDER BY top_member_messages DESC, channel_id ASC;",
        explanation:
          "## Approach\n\nCompute the per-channel totals first, then isolate dominant-sender channels in a final CTE.\n\n## Query\n\n```sql\nWITH channel_member_counts AS (\n  SELECT channel_id,\n         sender_member_id,\n         COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id, sender_member_id\n), channel_totals AS (\n  SELECT channel_id,\n         SUM(message_count) AS total_messages,\n         MAX(message_count) AS top_member_messages\n  FROM channel_member_counts\n  GROUP BY channel_id\n), dominant_channels AS (\n  SELECT channel_id, top_member_messages, total_messages\n  FROM channel_totals\n  WHERE top_member_messages::numeric / total_messages > 0.50\n)\nSELECT channel_id, top_member_messages, total_messages\nFROM dominant_channels\nORDER BY top_member_messages DESC, channel_id ASC;\n```\n\n## Explanation\n\n- The first CTE builds member-level counts.\n- The second CTE summarizes each channel.\n- The third CTE filters to channels dominated by the top sender.\n- The final query only sorts the result.\n\n## Difference from the optimal approach\n\nVery clear, but more verbose.",
      },
    ],
  },
  {
    code: "CHAT_089",
    approaches: [
      {
        approach_title: "Lag growth streak",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH weekly_workspace_messages AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN weekly_count > LAG(weekly_count) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_workspace_messages ), grouped_growth AS ( SELECT workspace_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp HAVING COUNT(*) >= 4;",
        explanation:
          "## Approach\n\nCalculate weekly message counts per workspace, mark weeks where activity grew compared to the previous week, then group consecutive growth weeks into streaks.\n\n## Explanation\n\n- `weekly_workspace_messages` counts non-deleted messages per workspace per week.\n- `LAG(weekly_count)` compares each week with the previous week in the same workspace.\n- `is_growth_week = 1` means the workspace grew compared to the previous week.\n- The two `ROW_NUMBER()` expressions create a stable group id for consecutive growth weeks.\n- The final `GROUP BY workspace_id, grp` counts each consecutive growth streak.\n- `HAVING COUNT(*) >= 4` keeps only streaks of at least 4 consecutive growth weeks.\n- The `ORDER BY` inside window functions is required because it defines chronological comparison.\n- No final `ORDER BY` is used because the question does not require the result set itself to be sorted.",
      },
    ],
  },
  {
    code: "CHAT_090",
    approaches: [
      {
        approach_title: "Median vs workspace",
        approach_type: "ordered_set_aggregate",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ), workspace_reply_times AS ( SELECT workspace_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS workspace_median_reply_minutes FROM member_reply_times GROUP BY workspace_id ) SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm JOIN workspace_reply_times wrt ON mm.workspace_id = wrt.workspace_id WHERE mm.member_median_reply_minutes < wrt.workspace_median_reply_minutes ORDER BY mm.workspace_id ASC, member_median_reply_minutes ASC, mm.workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute each member's median reply time, compute the workspace median reply time, then return members whose median is below their workspace median.\n\n## Explanation\n\n- `member_reply_times` joins reply messages to their parent messages and converts the reply delay into minutes.\n- `member_medians` calculates each member's median reply time using `PERCENTILE_CONT(0.5)`.\n- `workspace_reply_times` calculates the overall median reply time per workspace.\n- The final `WHERE` clause keeps members whose median reply time is lower than the workspace median, meaning they reply faster than the workspace baseline.\n- `ROUND(...::numeric, 2)` is used because PostgreSQL requires a numeric value for rounding to a fixed number of decimal places.\n- Final ordering is required because the question has `sort_by_columns`: workspace ascending, member median reply time ascending, and workspace member id ascending.",
      },
      {
        approach_title: "Nested median CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ), workspace_reply_times AS ( SELECT workspace_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS workspace_median_reply_minutes FROM member_reply_times GROUP BY workspace_id ), faster_members AS ( SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm JOIN workspace_reply_times wrt ON mm.workspace_id = wrt.workspace_id WHERE mm.member_median_reply_minutes < wrt.workspace_median_reply_minutes ) SELECT workspace_id, workspace_member_id, member_median_reply_minutes FROM faster_members ORDER BY workspace_id ASC, member_median_reply_minutes ASC, workspace_member_id ASC;",
        explanation:
          "## Approach\n\nUse the same median-comparison logic as the optimal approach, but place the qualifying rows in a `faster_members` CTE before the final select.\n\n## Explanation\n\n- `member_reply_times` calculates reply delays in minutes.\n- `member_medians` computes median reply time per workspace member.\n- `workspace_reply_times` computes the median reply time per workspace.\n- `faster_members` keeps only members whose median reply time is below their workspace median.\n- The final query returns the required columns from the CTE.\n- Final ordering is required to match the question comparator: `workspace_id ASC`, `member_median_reply_minutes ASC`, and `workspace_member_id ASC`.",
      },
      {
        approach_title: "Subquery median compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ) SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm WHERE mm.member_median_reply_minutes < ( SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY mrt.reply_minutes) FROM member_reply_times mrt WHERE mrt.workspace_id = mm.workspace_id ) ORDER BY mm.workspace_id ASC, member_median_reply_minutes ASC, mm.workspace_member_id ASC;",
        explanation:
          "## Approach\n\nCompute member medians first, then compare each member against a correlated subquery that calculates the workspace median.\n\n## Explanation\n\n- `member_reply_times` calculates reply delay in minutes for every reply.\n- `member_medians` computes each member's median reply delay.\n- The correlated subquery computes the workspace median for the current member's workspace.\n- The outer query keeps members whose median reply time is below that workspace median.\n- This is correct, but usually less efficient than precomputing workspace medians once.\n- Final ordering is required because this question explicitly enforces sorting through `sort_by_columns`.",
      },
    ],
  },
  {
    code: "CHAT_091",
    approaches: [
      {
        approach_title: "30 day growth",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH current_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), previous_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM current_30d c FULL OUTER JOIN previous_30d p ON c.member_id = p.member_id ORDER BY growth_count DESC, member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount each member's messages in the last 30 days and in the previous 30 days, then subtract the two counts.\n\n## Query\n\n```sql\nWITH current_30d AS (\n  SELECT sender_member_id AS member_id, COUNT(*) AS current_count\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY sender_member_id\n), previous_30d AS (\n  SELECT sender_member_id AS member_id, COUNT(*) AS previous_count\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '60 days'\n    AND sent_at < CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY sender_member_id\n)\nSELECT COALESCE(c.member_id, p.member_id) AS member_id,\n       COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count\nFROM current_30d c\nFULL OUTER JOIN previous_30d p\n  ON c.member_id = p.member_id\nORDER BY growth_count DESC, member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first CTE counts recent messages per member.\n- The second CTE counts messages in the 30-day period before that.\n- `FULL OUTER JOIN` keeps members who appear in either period.\n- `COALESCE(..., 0)` treats missing counts as zero.\n- Subtracting gives growth over time.\n\n## Why this is optimal\n\nIt clearly separates the two time windows and handles members missing from one side correctly.",
      },
      {
        approach_title: "Subquery growth",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) c FULL OUTER JOIN ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) p ON c.member_id = p.member_id ORDER BY growth_count DESC, member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse two derived tables for the two 30-day windows, then join and subtract their counts.\n\n## Query\n\n```sql\nSELECT COALESCE(c.member_id, p.member_id) AS member_id,\n       COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count\nFROM (\n  SELECT sender_member_id AS member_id, COUNT(*) AS current_count\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY sender_member_id\n) c\nFULL OUTER JOIN (\n  SELECT sender_member_id AS member_id, COUNT(*) AS previous_count\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '60 days'\n    AND sent_at < CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY sender_member_id\n) p\n  ON c.member_id = p.member_id\nORDER BY growth_count DESC, member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each subquery computes one time-window count.\n- The outer join and subtraction logic are the same as the main solution.\n- This is logically equivalent to the CTE version.\n\n## Difference from the optimal approach\n\nIt works, but the CTE version is easier to read and explain.",
      },
      {
        approach_title: "Nested growth CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH current_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), previous_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), member_growth AS ( SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM current_30d c FULL OUTER JOIN previous_30d p ON c.member_id = p.member_id ) SELECT member_id, growth_count FROM member_growth ORDER BY growth_count DESC, member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute the two time-window counts first, then place the growth calculation in a final CTE.\n\n## Query\n\n```sql\nWITH current_30d AS (\n  SELECT sender_member_id AS member_id, COUNT(*) AS current_count\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY sender_member_id\n), previous_30d AS (\n  SELECT sender_member_id AS member_id, COUNT(*) AS previous_count\n  FROM messages\n  WHERE is_deleted = false\n    AND sent_at >= CURRENT_DATE - INTERVAL '60 days'\n    AND sent_at < CURRENT_DATE - INTERVAL '30 days'\n  GROUP BY sender_member_id\n), member_growth AS (\n  SELECT COALESCE(c.member_id, p.member_id) AS member_id,\n         COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count\n  FROM current_30d c\n  FULL OUTER JOIN previous_30d p\n    ON c.member_id = p.member_id\n)\nSELECT member_id, growth_count\nFROM member_growth\nORDER BY growth_count DESC, member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first two CTEs compute the window counts.\n- The third CTE computes the growth per member.\n- The final query ranks members by growth.\n\n## Difference from the optimal approach\n\nClear, but slightly more verbose.",
      },
    ],
  },
  {
    code: "CHAT_092",
    approaches: [
      {
        approach_title: "Recursive thread stats",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ), thread_stats AS ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ) SELECT DISTINCT channel_id FROM thread_stats WHERE max_depth > 5 AND total_replies > 20;",
        explanation:
          "## 🧠 Approach\n\nTraverse each message thread recursively and compute depth and reply count per root.\n\n---\n\n## 🔍 Explanation\n\n- The recursive CTE builds the full reply tree for each root message.\n- `depth` tracks how deep a thread goes.\n- `MAX(depth)` gives the deepest level in the thread.\n- `COUNT(*) - 1` counts total replies (excluding root).\n- The final filter keeps threads that are both:\n  - deep (`depth > 5`)\n  - large (`replies > 20`)\n\n---\n\n## 🚨 Ordering Rule\n\n- No `ORDER BY` is used\n\nBecause:\n\n> ❗ The question does NOT require ordered output\n\nComparator:\n\n```js\ncomparison_config: {}\n→ IGNORE ORDER\n```\n\n---\n\n## ✅ Why this is correct\n\n- Fully matches expected_query\n- Uses recursive traversal correctly\n- Avoids unnecessary ordering",
      },
      {
        approach_title: "Nested thread CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ), thread_stats AS ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ), qualifying_threads AS ( SELECT channel_id, root_message_id FROM thread_stats WHERE max_depth > 5 AND total_replies > 20 ) SELECT DISTINCT channel_id FROM qualifying_threads;",
        explanation:
          "## 🧠 Approach\n\nSame logic as optimal, but isolates qualifying threads in an extra CTE.\n\n---\n\n## Explanation\n\n- First build full thread tree\n- Then compute stats\n- Then filter qualifying threads separately\n\n---\n\n## Ordering Rule\n\n- No `ORDER BY`\n- Ordering is not required\n\n---\n\n## Tradeoff\n\n- Slightly more verbose\n- Same correctness",
      },
      {
        approach_title: "Recursive grouped stats",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ) SELECT DISTINCT channel_id FROM ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ) ts WHERE max_depth > 5 AND total_replies > 20;",
        explanation:
          "## 🧠 Approach\n\nUse a derived table instead of a named CTE for thread stats.\n\n---\n\n## Explanation\n\n- Recursive tree logic remains the same\n- Stats are computed inside subquery\n- Outer query filters results\n\n---\n\n## Ordering Rule\n\n- No `ORDER BY`\n- Because output ordering is irrelevant\n\n---\n\n## Verdict\n\nEquivalent logic, slightly less readable",
      },
    ],
  },
  {
    code: "CHAT_093",
    approaches: [
      {
        approach_title: "Interaction score",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH channel_messages AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ), channel_reactions AS ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ), channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ) SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM channel_messages cm FULL OUTER JOIN channel_reactions cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN channel_replies cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute message, reaction, and reply counts per channel separately, then combine them into one interaction score.\n\n## Query\n\n```sql\nWITH channel_messages AS (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), channel_reactions AS (\n  SELECT m.channel_id, COUNT(*) AS reaction_count\n  FROM message_reactions mr\n  JOIN messages m\n    ON mr.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id\n), channel_replies AS (\n  SELECT channel_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND parent_message_id IS NOT NULL\n  GROUP BY channel_id\n)\nSELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id,\n       COALESCE(cm.message_count, 0)\n     + COALESCE(cr.reaction_count, 0)\n     + COALESCE(cp.reply_count, 0) AS interaction_score\nFROM channel_messages cm\nFULL OUTER JOIN channel_reactions cr\n  ON cm.channel_id = cr.channel_id\nFULL OUTER JOIN channel_replies cp\n  ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id\nORDER BY interaction_score DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each CTE computes one component of engagement per channel.\n- `FULL OUTER JOIN` keeps channels present in any component.\n- `COALESCE` converts missing metrics to zero.\n- Adding the three components produces the final interaction score.\n\n## Why this is optimal\n\nIt keeps each metric definition separate and handles sparse channel activity correctly.",
      },
      {
        approach_title: "Nested score CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH channel_messages AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ), channel_reactions AS ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ), channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ), channel_scores AS ( SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM channel_messages cm FULL OUTER JOIN channel_reactions cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN channel_replies cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ) SELECT channel_id, interaction_score FROM channel_scores ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nBuild the three metrics first, then place the final score calculation in its own CTE.\n\n## Query\n\n```sql\nWITH channel_messages AS (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n), channel_reactions AS (\n  SELECT m.channel_id, COUNT(*) AS reaction_count\n  FROM message_reactions mr\n  JOIN messages m\n    ON mr.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id\n), channel_replies AS (\n  SELECT channel_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND parent_message_id IS NOT NULL\n  GROUP BY channel_id\n), channel_scores AS (\n  SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id,\n         COALESCE(cm.message_count, 0)\n       + COALESCE(cr.reaction_count, 0)\n       + COALESCE(cp.reply_count, 0) AS interaction_score\n  FROM channel_messages cm\n  FULL OUTER JOIN channel_reactions cr\n    ON cm.channel_id = cr.channel_id\n  FULL OUTER JOIN channel_replies cp\n    ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id\n)\nSELECT channel_id, interaction_score\nFROM channel_scores\nORDER BY interaction_score DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first three CTEs define the input metrics.\n- The fourth CTE computes the score once.\n- The final query only sorts and limits.\n\n## Difference from the optimal approach\n\nClear, but a little more verbose.",
      },
      {
        approach_title: "Join score subqueries",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) cm FULL OUTER JOIN ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ) cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ) cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse three derived tables for the component metrics, then join them into the final score.\n\n## Query\n\n```sql\nSELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id,\n       COALESCE(cm.message_count, 0)\n     + COALESCE(cr.reaction_count, 0)\n     + COALESCE(cp.reply_count, 0) AS interaction_score\nFROM (\n  SELECT channel_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY channel_id\n) cm\nFULL OUTER JOIN (\n  SELECT m.channel_id, COUNT(*) AS reaction_count\n  FROM message_reactions mr\n  JOIN messages m\n    ON mr.message_id = m.id\n  WHERE m.channel_id IS NOT NULL\n  GROUP BY m.channel_id\n) cr\n  ON cm.channel_id = cr.channel_id\nFULL OUTER JOIN (\n  SELECT channel_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND parent_message_id IS NOT NULL\n  GROUP BY channel_id\n) cp\n  ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id\nORDER BY interaction_score DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- Each derived table computes one channel-level metric.\n- The joins and score calculation match the CTE solution.\n- The final result gives the top 10 channels by combined engagement.\n\n## Difference from the optimal approach\n\nEquivalent, but harder to read than named CTEs.",
      },
    ],
  },
  {
    code: "CHAT_094",
    approaches: [
      {
        approach_title: "Every channel match",
        approach_type: "count_distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH workspace_channels AS ( SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ), member_channel_activity AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(DISTINCT channel_id) AS active_channels FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, sender_member_id ) SELECT mca.workspace_id, mca.member_id FROM member_channel_activity mca JOIN workspace_channels wc ON mca.workspace_id = wc.workspace_id WHERE mca.active_channels = wc.total_channels;",
        explanation:
          "## 🧠 Approach\n\nCompare how many channels a member posted in vs total channels in workspace.\n\n---\n\n## 🔍 Explanation\n\n- `workspace_channels` → total channels per workspace\n- `member_channel_activity` → distinct channels each member posted in\n- If both match → member is active in ALL channels\n\n---\n\n## ⚠️ Important Detail\n\n- Uses `COUNT(DISTINCT channel_id)` to avoid duplicate messages inflating counts\n\n---\n\n## 🚨 Ordering Rule\n\n- No `ORDER BY`\n\nBecause:\n\n> ❗ Question does NOT require ordering\n\n---\n\n## ✅ Why this is optimal\n\n- Direct comparison\n- Efficient\n- Clean logic",
      },
      {
        approach_title: "Not exists missing channel",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT wm.workspace_id, wm.id AS member_id FROM workspace_members wm WHERE NOT EXISTS ( SELECT 1 FROM channels c WHERE c.workspace_id = wm.workspace_id AND NOT EXISTS ( SELECT 1 FROM messages m WHERE m.workspace_id = wm.workspace_id AND m.channel_id = c.id AND m.sender_member_id = wm.id AND m.is_deleted = false ) );",
        explanation:
          '## 🧠 Approach\n\nEnsure there is NO channel where the member has NOT posted.\n\n---\n\n## 🔍 Explanation\n\n- Outer query → iterates members\n- Inner NOT EXISTS → checks missing channels\n- Double NOT EXISTS → ensures full coverage\n\n---\n\n## Key Insight\n\nThis is a classic:\n\n> "for all" condition using NOT EXISTS\n\n---\n\n## Ordering Rule\n\n- No `ORDER BY`\n- Ordering not required\n\n---\n\n## Tradeoff\n\n- Elegant\n- Harder to understand',
      },
      {
        approach_title: "Nested coverage CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH workspace_channels AS ( SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ), member_channel_activity AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(DISTINCT channel_id) AS active_channels FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, sender_member_id ), power_members AS ( SELECT mca.workspace_id, mca.member_id FROM member_channel_activity mca JOIN workspace_channels wc ON mca.workspace_id = wc.workspace_id WHERE mca.active_channels = wc.total_channels ) SELECT workspace_id, member_id FROM power_members;",
        explanation:
          "## 🧠 Approach\n\nBreak solution into stages using CTEs.\n\n---\n\n## Explanation\n\n- First compute totals\n- Then compute per-member coverage\n- Then isolate matching members\n\n---\n\n## Ordering Rule\n\n- No `ORDER BY`\n- Comparator ignores order\n\n---\n\n## Tradeoff\n\n- More readable\n- Slightly verbose",
      },
    ],
  },
  {
    code: "CHAT_095",
    approaches: [
      {
        approach_title: "Replies per hour",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ) SELECT channel_id, ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour FROM channel_replies ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount reply messages per channel in the last 7 days, then divide by the total hours in 7 days.\n\n## Query\n\n```sql\nWITH channel_replies AS (\n  SELECT channel_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND parent_message_id IS NOT NULL\n    AND sent_at >= CURRENT_DATE - INTERVAL '7 days'\n  GROUP BY channel_id\n)\nSELECT channel_id,\n       ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour\nFROM channel_replies\nORDER BY replies_per_hour DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE counts reply messages per channel for the last 7 days.\n- There are `7 * 24 = 168` hours in that window.\n- Casting to `numeric` avoids integer division.\n- The final query ranks channels by reply velocity.\n\n## Why this is optimal\n\nIt is the clearest way to turn a 7-day reply count into an hourly rate.",
      },
      {
        approach_title: "Direct rate query",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT channel_id, ROUND(COUNT(*)::numeric / (7 * 24), 2) AS replies_per_hour FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCalculate the reply count and divide by 168 hours in one grouped query.\n\n## Query\n\n```sql\nSELECT channel_id,\n       ROUND(COUNT(*)::numeric / (7 * 24), 2) AS replies_per_hour\nFROM messages\nWHERE channel_id IS NOT NULL\n  AND parent_message_id IS NOT NULL\n  AND sent_at >= CURRENT_DATE - INTERVAL '7 days'\nGROUP BY channel_id\nORDER BY replies_per_hour DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `COUNT(*)` gives reply count per channel for the time window.\n- Dividing by 168 gives replies per hour.\n- This is mathematically the same as the CTE version.\n\n## Difference from the optimal approach\n\nShorter, but the CTE version makes the metric-building step clearer.",
      },
      {
        approach_title: "Nested rate CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ), channel_velocity AS ( SELECT channel_id, ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour FROM channel_replies ) SELECT channel_id, replies_per_hour FROM channel_velocity ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute 7-day reply counts first, then convert them to hourly rates in a second CTE.\n\n## Query\n\n```sql\nWITH channel_replies AS (\n  SELECT channel_id, COUNT(*) AS reply_count\n  FROM messages\n  WHERE channel_id IS NOT NULL\n    AND parent_message_id IS NOT NULL\n    AND sent_at >= CURRENT_DATE - INTERVAL '7 days'\n  GROUP BY channel_id\n), channel_velocity AS (\n  SELECT channel_id,\n         ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour\n  FROM channel_replies\n)\nSELECT channel_id, replies_per_hour\nFROM channel_velocity\nORDER BY replies_per_hour DESC, channel_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first CTE gets reply totals per channel.\n- The second CTE converts those totals into hourly rates.\n- The final query ranks the channels.\n\n## Difference from the optimal approach\n\nMore verbose, but nicely structured.",
      },
    ],
  },
  {
    code: "CHAT_096",
    approaches: [
      {
        approach_title: "Mention growth streak",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH weekly_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, DATE_TRUNC('week', m.sent_at)::date AS week_start, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id, DATE_TRUNC('week', m.sent_at)::date ), growth_flags AS ( SELECT workspace_member_id, week_start, CASE WHEN mention_count > LAG(mention_count) OVER (PARTITION BY workspace_member_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_mentions ), grouped_growth AS ( SELECT workspace_member_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_member_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_member_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_member_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_member_id, grp HAVING COUNT(*) >= 3;",
        explanation:
          "## Approach\n\nCount weekly mentions received by each workspace member, mark weeks where mentions increased compared to the previous week, then detect consecutive growth streaks.\n\n## Explanation\n\n- `weekly_mentions` groups mentions by mentioned member and week.\n- `message_mentions.mentioned_member_id` is the member receiving the mention.\n- The join to `messages` is needed because the mention timestamp comes from `messages.sent_at`.\n- `LAG(mention_count)` compares each week with the previous week for the same member.\n- `ROW_NUMBER()` is used to group consecutive growth weeks into streaks.\n- `HAVING COUNT(*) >= 3` keeps only members with at least 3 consecutive growth weeks.\n- The `ORDER BY` inside window functions is required because it defines chronological comparison.\n- No final `ORDER BY` is used because the question does not require sorted output and `comparison_config` is empty.",
      },
      {
        approach_title: "Nested mention streaks",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH weekly_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, DATE_TRUNC('week', m.sent_at)::date AS week_start, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id, DATE_TRUNC('week', m.sent_at)::date ), growth_flags AS ( SELECT workspace_member_id, week_start, CASE WHEN mention_count > LAG(mention_count) OVER (PARTITION BY workspace_member_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_mentions ), grouped_growth AS ( SELECT workspace_member_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_member_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_member_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ), streaks AS ( SELECT workspace_member_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_member_id, grp ) SELECT workspace_member_id, consecutive_growth_weeks FROM streaks WHERE consecutive_growth_weeks >= 3;",
        explanation:
          "## Approach\n\nUse an extra `streaks` CTE to make the streak-counting step explicit.\n\n## Explanation\n\n- The first CTE builds weekly mention counts.\n- The second CTE flags weeks where mention count increased.\n- The third CTE groups consecutive growth weeks.\n- `streaks` counts each growth streak per member.\n- The final query keeps streaks of at least 3 weeks.\n- This is more verbose than the optimal version, but easier to read.\n- No final ordering is included because ordering is not required for this question.",
      },
    ],
  },
  {
    code: "CHAT_097",
    approaches: [
      {
        approach_title: "Sender balance",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH sender_counts AS ( SELECT conversation_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id, sender_member_id ), conversation_balance AS ( SELECT conversation_id, MIN(message_count) AS min_sender_messages, MAX(message_count) AS max_sender_messages, SUM(message_count) AS total_messages, COUNT(*) AS sender_count FROM sender_counts GROUP BY conversation_id HAVING COUNT(*) > 1 ) SELECT conversation_id, sender_count, total_messages FROM conversation_balance ORDER BY (max_sender_messages - min_sender_messages) ASC, total_messages DESC, conversation_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCount messages per sender inside each conversation, then measure how balanced each conversation is.\n\n## Query\n\n```sql\nWITH sender_counts AS (\n  SELECT conversation_id, sender_member_id, COUNT(*) AS message_count\n  FROM messages\n  WHERE conversation_id IS NOT NULL\n    AND is_deleted = false\n  GROUP BY conversation_id, sender_member_id\n), conversation_balance AS (\n  SELECT conversation_id,\n         MIN(message_count) AS min_sender_messages,\n         MAX(message_count) AS max_sender_messages,\n         SUM(message_count) AS total_messages,\n         COUNT(*) AS sender_count\n  FROM sender_counts\n  GROUP BY conversation_id\n  HAVING COUNT(*) > 1\n)\nSELECT conversation_id, sender_count, total_messages\nFROM conversation_balance\nORDER BY (max_sender_messages - min_sender_messages) ASC,\n         total_messages DESC,\n         conversation_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- There is no `recipient_member_id` column.\n- This version measures reciprocity using sender distribution inside each conversation.\n- A smaller gap between max and min sender message counts means the conversation is more balanced.\n- `HAVING COUNT(*) > 1` keeps only conversations with multiple senders.",
      },
      {
        approach_title: "Nested balance",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT conversation_id, sender_count, total_messages FROM ( SELECT conversation_id, MIN(message_count) AS min_sender_messages, MAX(message_count) AS max_sender_messages, SUM(message_count) AS total_messages, COUNT(*) AS sender_count FROM ( SELECT conversation_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id, sender_member_id ) sender_counts GROUP BY conversation_id HAVING COUNT(*) > 1 ) conversation_balance ORDER BY (max_sender_messages - min_sender_messages) ASC, total_messages DESC, conversation_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse nested subqueries instead of named CTEs to calculate the same sender-balance metric.\n\n## Difference from the optimal approach\n\nIt returns the same result, but the CTE version is easier to read.",
      },
    ],
  },
  {
    code: "CHAT_098",
    approaches: [
      {
        approach_title: "Weekly growth streak",
        approach_type: "window",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH weekly_scores AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS message_score FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN message_score > LAG(message_score) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_scores ), grouped_growth AS ( SELECT workspace_id, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp HAVING COUNT(*) >= 4;",
        explanation:
          "## Approach\n\nCalculate weekly message counts per workspace, flag growth weeks, then group consecutive growth weeks into streaks.\n\n## Explanation\n\n- `weekly_scores` counts non-deleted messages per workspace per week.\n- `LAG(message_score)` compares each workspace week with its previous week.\n- `is_growth_week = 1` means engagement increased from the previous week.\n- The `ROW_NUMBER()` difference pattern groups consecutive growth weeks into the same streak.\n- `HAVING COUNT(*) >= 4` keeps only workspaces with at least 4 consecutive growth weeks.\n- The window-function ordering is required for time-based comparison.\n- No final `ORDER BY` is used because the result set itself does not need enforced ordering.",
      },
      {
        approach_title: "Nested growth CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH weekly_scores AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS message_score FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN message_score > LAG(message_score) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_scores ), grouped_growth AS ( SELECT workspace_id, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ), workspace_streaks AS ( SELECT workspace_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp ) SELECT workspace_id, consecutive_growth_weeks FROM workspace_streaks WHERE consecutive_growth_weeks >= 4;",
        explanation:
          "## Approach\n\nBuild weekly scores and growth flags first, then count each workspace streak in a separate CTE.\n\n## Explanation\n\n- `weekly_scores` builds one row per workspace per week.\n- `growth_flags` decides whether each week grew compared with the previous week.\n- `grouped_growth` assigns streak groups.\n- `workspace_streaks` counts each streak length.\n- The final query returns only streaks with at least 4 consecutive growth weeks.\n- This approach is slightly more verbose but very readable.\n- No final sorting is used because the question does not require ordered output.",
      },
    ],
  },
  {
    code: "CHAT_099",
    approaches: [
      {
        approach_title: "P90 compare",
        approach_type: "ordered_set_aggregate",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), percentile_value AS ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) AS p90 FROM member_counts ) SELECT mc.member_id, mc.message_count FROM member_counts mc CROSS JOIN percentile_value pv WHERE mc.message_count > pv.p90 ORDER BY mc.message_count DESC, mc.member_id ASC;",
        explanation:
          "## Approach\n\nCount non-deleted messages per member, compute the 90th percentile of those message counts, then return members whose count is above that threshold.\n\n## Explanation\n\n- `member_counts` calculates each member's total non-deleted message count.\n- `PERCENTILE_CONT(0.9)` computes the 90th percentile threshold across all member message counts.\n- `CROSS JOIN` attaches the single percentile value to every member row.\n- The `WHERE` clause keeps only members with `message_count > p90`.\n- The `ORDER BY` inside `PERCENTILE_CONT` is required for percentile calculation.\n- The final `ORDER BY message_count DESC, member_id ASC` is also required because the question has `sort_by_columns` and the comparator enforces this output order.",
      },
      {
        approach_title: "Subquery p90",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ) SELECT member_id, message_count FROM member_counts WHERE message_count > ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) FROM member_counts ) ORDER BY message_count DESC, member_id ASC;",
        explanation:
          "## Approach\n\nCompute member message counts first, then compare each row against a percentile subquery.\n\n## Explanation\n\n- The CTE creates one message count per member.\n- The subquery calculates the p90 threshold from that same CTE.\n- The outer query returns only members whose message count is above p90.\n- This is correct, but the explicit `percentile_value` CTE is easier to explain and reuse.\n- Final ordering is required to match the question comparator: highest `message_count` first, then `member_id` ascending for ties.",
      },
      {
        approach_title: "Nested percentile CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), percentile_value AS ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) AS p90 FROM member_counts ), top_members AS ( SELECT mc.member_id, mc.message_count FROM member_counts mc CROSS JOIN percentile_value pv WHERE mc.message_count > pv.p90 ) SELECT member_id, message_count FROM top_members ORDER BY message_count DESC, member_id ASC;",
        explanation:
          "## Approach\n\nCompute member counts, compute the percentile threshold, then isolate qualifying members in a final CTE.\n\n## Explanation\n\n- `member_counts` builds the base per-member message count.\n- `percentile_value` computes the p90 threshold once.\n- `top_members` filters members above that threshold.\n- The final query returns those qualifying members.\n- This version is more verbose than the optimal approach, but very readable.\n- Final ordering is required because this question explicitly enforces `message_count DESC, member_id ASC`.",
      },
    ],
  },
  {
    code: "CHAT_100",
    approaches: [
      {
        approach_title: "50 plus workspaces",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH workspace_user_counts AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ) SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM workspace_user_counts GROUP BY member_id ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nFirst keep only workspace-member combinations with at least 50 messages, then count in how many workspaces each member meets that threshold.\n\n## Query\n\n```sql\nWITH workspace_user_counts AS (\n  SELECT workspace_id,\n         sender_member_id AS member_id,\n         COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n  HAVING COUNT(*) >= 50\n)\nSELECT member_id,\n       COUNT(DISTINCT workspace_id) AS active_workspace_count\nFROM workspace_user_counts\nGROUP BY member_id\nORDER BY active_workspace_count DESC, member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first CTE computes message count per member per workspace.\n- `HAVING COUNT(*) >= 50` keeps only strong activity within a workspace.\n- The outer query counts how many distinct workspaces each member qualifies in.\n- The final ordering returns the top cross-workspace power users.\n\n## Why this is optimal\n\nIt models the threshold condition at the workspace level first, then aggregates across workspaces.",
      },
      {
        approach_title: "Nested power CTE",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH workspace_user_counts AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ), power_users AS ( SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM workspace_user_counts GROUP BY member_id ) SELECT member_id, active_workspace_count FROM power_users ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nCompute qualifying workspace-level counts first, then calculate the final workspace coverage in a second CTE.\n\n## Query\n\n```sql\nWITH workspace_user_counts AS (\n  SELECT workspace_id,\n         sender_member_id AS member_id,\n         COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n  HAVING COUNT(*) >= 50\n), power_users AS (\n  SELECT member_id,\n         COUNT(DISTINCT workspace_id) AS active_workspace_count\n  FROM workspace_user_counts\n  GROUP BY member_id\n)\nSELECT member_id, active_workspace_count\nFROM power_users\nORDER BY active_workspace_count DESC, member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first CTE finds member-workspace pairs meeting the 50-message threshold.\n- The second CTE counts qualifying workspaces per member.\n- The final query ranks members by that coverage.\n\n## Difference from the optimal approach\n\nVery clear, but slightly more verbose.",
      },
      {
        approach_title: "Subquery workspaces",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ) workspace_user_counts GROUP BY member_id ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nUse a derived table for qualifying workspace-member counts, then count qualifying workspaces per member.\n\n## Query\n\n```sql\nSELECT member_id,\n       COUNT(DISTINCT workspace_id) AS active_workspace_count\nFROM (\n  SELECT workspace_id,\n         sender_member_id AS member_id,\n         COUNT(*) AS message_count\n  FROM messages\n  WHERE is_deleted = false\n  GROUP BY workspace_id, sender_member_id\n  HAVING COUNT(*) >= 50\n) workspace_user_counts\nGROUP BY member_id\nORDER BY active_workspace_count DESC, member_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query keeps only workspace-member pairs with at least 50 messages.\n- The outer query counts how many qualifying workspaces each member has.\n- The result is then sorted and limited.\n\n## Difference from the optimal approach\n\nEquivalent, but named CTEs are easier to read and extend.",
      },
    ],
  },
];
