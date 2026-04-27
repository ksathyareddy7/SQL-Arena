-- ======================
-- CHAT APP SETUP
-- ======================

CREATE SCHEMA IF NOT EXISTS chat_schema;
SET search_path TO chat_schema, public;

-- WORKSPACES
CREATE TABLE IF NOT EXISTS workspaces (
  id BIGSERIAL PRIMARY KEY,
  workspace_name TEXT NOT NULL,
  workspace_slug VARCHAR(80) NOT NULL UNIQUE,
  workspace_type VARCHAR(20) NOT NULL
    CHECK (workspace_type IN ('company', 'community', 'support', 'gaming', 'education', 'internal')),
  owner_user_id BIGINT NULL,
  primary_domain VARCHAR(120),
  plan_type VARCHAR(20) NOT NULL DEFAULT 'free'
    CHECK (plan_type IN ('free', 'pro', 'business', 'enterprise')),
  member_limit INTEGER CHECK (member_limit IS NULL OR member_limit > 0),
  storage_limit_gb NUMERIC(8,2) CHECK (storage_limit_gb IS NULL OR storage_limit_gb >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone VARCHAR(20),
  country VARCHAR(80),
  timezone VARCHAR(50),
  job_title VARCHAR(100),
  status_message VARCHAR(160),
  is_bot BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  last_seen_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- USER DEVICES
CREATE TABLE IF NOT EXISTS user_devices (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_type VARCHAR(20) NOT NULL
    CHECK (device_type IN ('web', 'desktop', 'mobile', 'tablet')),
  device_os VARCHAR(30),
  app_version VARCHAR(30),
  push_enabled BOOLEAN NOT NULL DEFAULT true,
  last_active_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- WORKSPACE MEMBERS
CREATE TABLE IF NOT EXISTS workspace_members (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_type VARCHAR(20) NOT NULL DEFAULT 'member'
    CHECK (member_type IN ('owner', 'admin', 'member', 'guest', 'bot')),
  display_name VARCHAR(100),
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  invited_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  membership_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (membership_status IN ('invited', 'active', 'suspended', 'left', 'removed')),
  is_guest BOOLEAN NOT NULL DEFAULT false,
  is_deactivated BOOLEAN NOT NULL DEFAULT false,
  last_read_all_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

-- ROLES
CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  role_name VARCHAR(60) NOT NULL,
  role_scope VARCHAR(20) NOT NULL DEFAULT 'workspace'
    CHECK (role_scope IN ('workspace', 'channel', 'moderation')),
  is_system_role BOOLEAN NOT NULL DEFAULT false,
  priority_rank INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, role_name)
);

-- ROLE PERMISSIONS
CREATE TABLE IF NOT EXISTS role_permissions (
  id BIGSERIAL PRIMARY KEY,
  role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_code VARCHAR(80) NOT NULL,
  permission_group VARCHAR(30),
  is_allowed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(role_id, permission_code)
);

-- MEMBER ROLES
CREATE TABLE IF NOT EXISTS member_roles (
  id BIGSERIAL PRIMARY KEY,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_member_id, role_id)
);

-- CHANNELS
CREATE TABLE IF NOT EXISTS channels (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  created_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  channel_name VARCHAR(120) NOT NULL,
  channel_slug VARCHAR(120),
  channel_type VARCHAR(20) NOT NULL DEFAULT 'standard'
    CHECK (channel_type IN ('standard', 'announcement', 'support', 'forum', 'voice', 'category')),
  visibility VARCHAR(20) NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'private', 'restricted')),
  topic TEXT,
  purpose TEXT,
  parent_channel_id BIGINT REFERENCES channels(id) ON DELETE SET NULL,
  slow_mode_seconds INTEGER NOT NULL DEFAULT 0 CHECK (slow_mode_seconds >= 0),
  is_archived BOOLEAN NOT NULL DEFAULT false,
  archived_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(workspace_id, channel_name)
);

-- CHANNEL MEMBERS
CREATE TABLE IF NOT EXISTS channel_members (
  id BIGSERIAL PRIMARY KEY,
  channel_id BIGINT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  joined_via VARCHAR(20)
    CHECK (joined_via IS NULL OR joined_via IN ('self', 'invite', 'auto_join', 'admin', 'sync')),
  notification_level VARCHAR(20) NOT NULL DEFAULT 'all'
    CHECK (notification_level IN ('all', 'mentions_only', 'none')),
  last_read_message_id BIGINT NULL,
  last_read_at TIMESTAMP NULL,
  is_muted BOOLEAN NOT NULL DEFAULT false,
  is_pinned_channel BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(channel_id, workspace_member_id)
);

-- CONVERSATIONS
CREATE TABLE IF NOT EXISTS conversations (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  conversation_type VARCHAR(20) NOT NULL
    CHECK (conversation_type IN ('direct', 'group_dm')),
  created_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  conversation_title VARCHAR(150),
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CONVERSATION MEMBERS
CREATE TABLE IF NOT EXISTS conversation_members (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_read_message_id BIGINT NULL,
  last_read_at TIMESTAMP NULL,
  is_muted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(conversation_id, workspace_member_id)
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  sender_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  channel_id BIGINT REFERENCES channels(id) ON DELETE CASCADE,
  conversation_id BIGINT REFERENCES conversations(id) ON DELETE CASCADE,
  parent_message_id BIGINT REFERENCES messages(id) ON DELETE CASCADE,
  thread_root_message_id BIGINT REFERENCES messages(id) ON DELETE CASCADE,
  message_type VARCHAR(20) NOT NULL DEFAULT 'text'
    CHECK (message_type IN ('text', 'system', 'file', 'image', 'call_event', 'poll')),
  message_body TEXT,
  contains_link BOOLEAN NOT NULL DEFAULT false,
  contains_code_block BOOLEAN NOT NULL DEFAULT false,
  reply_count INTEGER NOT NULL DEFAULT 0 CHECK (reply_count >= 0),
  reaction_count INTEGER NOT NULL DEFAULT 0 CHECK (reaction_count >= 0),
  attachment_count INTEGER NOT NULL DEFAULT 0 CHECK (attachment_count >= 0),
  is_edited BOOLEAN NOT NULL DEFAULT false,
  edited_at TIMESTAMP NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  deleted_at TIMESTAMP NULL,
  sent_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (channel_id IS NOT NULL AND conversation_id IS NULL)
    OR
    (channel_id IS NULL AND conversation_id IS NOT NULL)
  )
);

-- MESSAGE ATTACHMENTS
CREATE TABLE IF NOT EXISTS message_attachments (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  uploaded_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  attachment_type VARCHAR(20) NOT NULL
    CHECK (attachment_type IN ('image', 'video', 'audio', 'document', 'archive', 'link_preview', 'other')),
  file_name VARCHAR(255) NOT NULL,
  file_extension VARCHAR(20),
  file_size_kb INTEGER CHECK (file_size_kb IS NULL OR file_size_kb >= 0),
  mime_type VARCHAR(100),
  storage_provider VARCHAR(30),
  is_inline BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MESSAGE REACTIONS
CREATE TABLE IF NOT EXISTS message_reactions (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  emoji_code VARCHAR(40) NOT NULL,
  reacted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(message_id, workspace_member_id, emoji_code)
);

-- MESSAGE MENTIONS
CREATE TABLE IF NOT EXISTS message_mentions (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  mentioned_member_id BIGINT REFERENCES workspace_members(id) ON DELETE CASCADE,
  mention_type VARCHAR(20) NOT NULL
    CHECK (mention_type IN ('user', 'role', 'channel', 'everyone')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- MESSAGE READS
CREATE TABLE IF NOT EXISTS message_reads (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  read_at TIMESTAMP NOT NULL DEFAULT NOW(),
  read_source VARCHAR(20)
    CHECK (read_source IS NULL OR read_source IN ('channel_view', 'notification', 'search', 'jump_link')),
  UNIQUE(message_id, workspace_member_id)
);

-- MESSAGE PINS
CREATE TABLE IF NOT EXISTS message_pins (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  pinned_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  channel_id BIGINT REFERENCES channels(id) ON DELETE CASCADE,
  conversation_id BIGINT REFERENCES conversations(id) ON DELETE CASCADE,
  pinned_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (channel_id IS NOT NULL AND conversation_id IS NULL)
    OR
    (channel_id IS NULL AND conversation_id IS NOT NULL)
  ),
  UNIQUE(message_id)
);

-- SAVED MESSAGES
CREATE TABLE IF NOT EXISTS saved_messages (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  saved_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(message_id, workspace_member_id)
);

-- USER PRESENCE LOGS
CREATE TABLE IF NOT EXISTS user_presence_logs (
  id BIGSERIAL PRIMARY KEY,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  presence_status VARCHAR(20) NOT NULL
    CHECK (presence_status IN ('online', 'idle', 'dnd', 'offline')),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  source VARCHAR(20)
    CHECK (source IS NULL OR source IN ('web', 'desktop', 'mobile', 'system')),
  CHECK (ended_at IS NULL OR ended_at >= started_at)
);

-- CALLS
CREATE TABLE IF NOT EXISTS calls (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  channel_id BIGINT REFERENCES channels(id) ON DELETE CASCADE,
  conversation_id BIGINT REFERENCES conversations(id) ON DELETE CASCADE,
  started_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  call_type VARCHAR(20) NOT NULL
    CHECK (call_type IN ('voice', 'video', 'huddle', 'screen_share')),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  peak_participants INTEGER NOT NULL DEFAULT 0 CHECK (peak_participants >= 0),
  recording_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (ended_at IS NULL OR ended_at >= started_at),
  CHECK (
    (channel_id IS NOT NULL AND conversation_id IS NULL)
    OR
    (channel_id IS NULL AND conversation_id IS NOT NULL)
  )
);

-- CALL PARTICIPANTS
CREATE TABLE IF NOT EXISTS call_participants (
  id BIGSERIAL PRIMARY KEY,
  call_id BIGINT NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  joined_at TIMESTAMP NOT NULL,
  left_at TIMESTAMP NULL,
  duration_seconds INTEGER CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
  was_host BOOLEAN NOT NULL DEFAULT false,
  CHECK (left_at IS NULL OR left_at >= joined_at)
);

-- INVITES
CREATE TABLE IF NOT EXISTS invites (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  channel_id BIGINT REFERENCES channels(id) ON DELETE SET NULL,
  invited_email TEXT,
  invited_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  invited_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  invite_type VARCHAR(20) NOT NULL DEFAULT 'workspace'
    CHECK (invite_type IN ('workspace', 'channel', 'guest')),
  invite_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (invite_status IN ('pending', 'accepted', 'expired', 'revoked', 'declined')),
  expires_at TIMESTAMP NULL,
  accepted_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (accepted_at IS NULL OR accepted_at >= created_at)
);

-- NOTIFICATION PREFERENCES
CREATE TABLE IF NOT EXISTS notification_preferences (
  id BIGSERIAL PRIMARY KEY,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  scope_type VARCHAR(20) NOT NULL
    CHECK (scope_type IN ('workspace', 'channel', 'conversation')),
  channel_id BIGINT REFERENCES channels(id) ON DELETE CASCADE,
  conversation_id BIGINT REFERENCES conversations(id) ON DELETE CASCADE,
  notify_all_messages BOOLEAN NOT NULL DEFAULT true,
  notify_mentions_only BOOLEAN NOT NULL DEFAULT false,
  mobile_push_enabled BOOLEAN NOT NULL DEFAULT true,
  email_notifications_enabled BOOLEAN NOT NULL DEFAULT false,
  mute_until TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (
    (scope_type = 'workspace' AND channel_id IS NULL AND conversation_id IS NULL)
    OR
    (scope_type = 'channel' AND channel_id IS NOT NULL AND conversation_id IS NULL)
    OR
    (scope_type = 'conversation' AND channel_id IS NULL AND conversation_id IS NOT NULL)
  )
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  workspace_member_id BIGINT NOT NULL REFERENCES workspace_members(id) ON DELETE CASCADE,
  message_id BIGINT REFERENCES messages(id) ON DELETE CASCADE,
  notification_type VARCHAR(20) NOT NULL
    CHECK (notification_type IN ('mention', 'reply', 'reaction', 'invite', 'system')),
  delivery_channel VARCHAR(20) NOT NULL
    CHECK (delivery_channel IN ('in_app', 'push', 'email')),
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (read_at IS NULL OR read_at >= created_at)
);

-- MODERATION ACTIONS
CREATE TABLE IF NOT EXISTS moderation_actions (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  target_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  target_message_id BIGINT REFERENCES messages(id) ON DELETE SET NULL,
  acted_by_member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  action_type VARCHAR(20) NOT NULL
    CHECK (action_type IN ('warn', 'mute', 'remove_message', 'suspend', 'ban')),
  reason_code VARCHAR(40),
  action_status VARCHAR(20) NOT NULL DEFAULT 'applied'
    CHECK (action_status IN ('applied', 'reverted', 'expired')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMP NULL,
  CHECK (resolved_at IS NULL OR resolved_at >= created_at)
);

-- APP EVENTS
CREATE TABLE IF NOT EXISTS app_events (
  id BIGSERIAL PRIMARY KEY,
  workspace_id BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  member_id BIGINT REFERENCES workspace_members(id) ON DELETE SET NULL,
  event_name VARCHAR(60) NOT NULL,
  event_category VARCHAR(30)
    CHECK (event_category IS NULL OR event_category IN ('auth', 'messaging', 'membership', 'notifications', 'moderation', 'calls', 'search')),
  entity_type VARCHAR(30),
  entity_id BIGINT,
  event_time TIMESTAMP NOT NULL DEFAULT NOW(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- ======================
-- FOREIGN KEY PATCHES
-- ======================

ALTER TABLE workspaces
  DROP CONSTRAINT IF EXISTS workspaces_owner_user_id_fkey,
  ADD CONSTRAINT workspaces_owner_user_id_fkey
  FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE channel_members
  DROP CONSTRAINT IF EXISTS channel_members_last_read_message_id_fkey,
  ADD CONSTRAINT channel_members_last_read_message_id_fkey
  FOREIGN KEY (last_read_message_id) REFERENCES messages(id) ON DELETE SET NULL;

ALTER TABLE conversation_members
  DROP CONSTRAINT IF EXISTS conversation_members_last_read_message_id_fkey,
  ADD CONSTRAINT conversation_members_last_read_message_id_fkey
  FOREIGN KEY (last_read_message_id) REFERENCES messages(id) ON DELETE SET NULL;

-- ======================
-- INDEXES
-- ======================
CREATE INDEX IF NOT EXISTS idx_chat_workspaces_workspace_type ON workspaces(workspace_type);
CREATE INDEX IF NOT EXISTS idx_chat_workspaces_plan_type ON workspaces(plan_type);
CREATE INDEX IF NOT EXISTS idx_chat_workspaces_owner_user_id ON workspaces(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_chat_workspaces_is_active ON workspaces(is_active);
CREATE INDEX IF NOT EXISTS idx_chat_workspaces_created_at ON workspaces(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_users_country ON users(country);
CREATE INDEX IF NOT EXISTS idx_chat_users_timezone ON users(timezone);
CREATE INDEX IF NOT EXISTS idx_chat_users_is_bot ON users(is_bot);
CREATE INDEX IF NOT EXISTS idx_chat_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_chat_users_is_verified ON users(is_verified);
CREATE INDEX IF NOT EXISTS idx_chat_users_last_seen_at ON users(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_chat_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_user_devices_user_id ON user_devices(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_user_devices_device_type ON user_devices(device_type);
CREATE INDEX IF NOT EXISTS idx_chat_user_devices_push_enabled ON user_devices(push_enabled);
CREATE INDEX IF NOT EXISTS idx_chat_user_devices_last_active_at ON user_devices(last_active_at);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_workspace_id ON workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_user_id ON workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_member_type ON workspace_members(member_type);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_membership_status ON workspace_members(membership_status);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_is_guest ON workspace_members(is_guest);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_is_deactivated ON workspace_members(is_deactivated);
CREATE INDEX IF NOT EXISTS idx_chat_workspace_members_joined_at ON workspace_members(joined_at);
CREATE INDEX IF NOT EXISTS idx_chat_roles_workspace_id ON roles(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_roles_role_scope ON roles(role_scope);
CREATE INDEX IF NOT EXISTS idx_chat_roles_is_system_role ON roles(is_system_role);
CREATE INDEX IF NOT EXISTS idx_chat_roles_priority_rank ON roles(priority_rank);
CREATE INDEX IF NOT EXISTS idx_chat_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_chat_role_permissions_permission_code ON role_permissions(permission_code);
CREATE INDEX IF NOT EXISTS idx_chat_role_permissions_permission_group ON role_permissions(permission_group);
CREATE INDEX IF NOT EXISTS idx_chat_role_permissions_is_allowed ON role_permissions(is_allowed);
CREATE INDEX IF NOT EXISTS idx_chat_member_roles_workspace_member_id ON member_roles(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_member_roles_role_id ON member_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_chat_member_roles_assigned_by_user_id ON member_roles(assigned_by_user_id);
CREATE INDEX IF NOT EXISTS idx_chat_member_roles_assigned_at ON member_roles(assigned_at);
CREATE INDEX IF NOT EXISTS idx_chat_channels_workspace_id ON channels(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_channels_created_by_member_id ON channels(created_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_channels_channel_type ON channels(channel_type);
CREATE INDEX IF NOT EXISTS idx_chat_channels_visibility ON channels(visibility);
CREATE INDEX IF NOT EXISTS idx_chat_channels_parent_channel_id ON channels(parent_channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_channels_is_archived ON channels(is_archived);
CREATE INDEX IF NOT EXISTS idx_chat_channels_created_at ON channels(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_channel_members_channel_id ON channel_members(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_channel_members_workspace_member_id ON channel_members(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_channel_members_notification_level ON channel_members(notification_level);
CREATE INDEX IF NOT EXISTS idx_chat_channel_members_last_read_at ON channel_members(last_read_at);
CREATE INDEX IF NOT EXISTS idx_chat_channel_members_is_muted ON channel_members(is_muted);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_workspace_id ON conversations(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_conversation_type ON conversations(conversation_type);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_by_member_id ON conversations(created_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_is_archived ON conversations(is_archived);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_conversation_members_conversation_id ON conversation_members(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversation_members_workspace_member_id ON conversation_members(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversation_members_last_read_at ON conversation_members(last_read_at);
CREATE INDEX IF NOT EXISTS idx_chat_conversation_members_is_muted ON conversation_members(is_muted);
CREATE INDEX IF NOT EXISTS idx_chat_messages_workspace_id ON messages(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_member_id ON messages(sender_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_channel_id ON messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_parent_message_id ON messages(parent_message_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_thread_root_message_id ON messages(thread_root_message_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_message_type ON messages(message_type);
CREATE INDEX IF NOT EXISTS idx_chat_messages_contains_link ON messages(contains_link);
CREATE INDEX IF NOT EXISTS idx_chat_messages_contains_code_block ON messages(contains_code_block);
CREATE INDEX IF NOT EXISTS idx_chat_messages_is_edited ON messages(is_edited);
CREATE INDEX IF NOT EXISTS idx_chat_messages_is_deleted ON messages(is_deleted);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sent_at ON messages(sent_at);
CREATE INDEX IF NOT EXISTS idx_chat_message_attachments_message_id ON message_attachments(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_attachments_uploaded_by_member_id ON message_attachments(uploaded_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_attachments_attachment_type ON message_attachments(attachment_type);
CREATE INDEX IF NOT EXISTS idx_chat_message_attachments_file_extension ON message_attachments(file_extension);
CREATE INDEX IF NOT EXISTS idx_chat_message_attachments_created_at ON message_attachments(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_message_reactions_message_id ON message_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_reactions_workspace_member_id ON message_reactions(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_reactions_emoji_code ON message_reactions(emoji_code);
CREATE INDEX IF NOT EXISTS idx_chat_message_reactions_reacted_at ON message_reactions(reacted_at);
CREATE INDEX IF NOT EXISTS idx_chat_message_mentions_message_id ON message_mentions(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_mentions_mentioned_member_id ON message_mentions(mentioned_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_mentions_mention_type ON message_mentions(mention_type);
CREATE INDEX IF NOT EXISTS idx_chat_message_mentions_created_at ON message_mentions(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_message_reads_message_id ON message_reads(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_reads_workspace_member_id ON message_reads(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_reads_read_at ON message_reads(read_at);
CREATE INDEX IF NOT EXISTS idx_chat_message_reads_read_source ON message_reads(read_source);
CREATE INDEX IF NOT EXISTS idx_chat_message_pins_message_id ON message_pins(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_pins_pinned_by_member_id ON message_pins(pinned_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_pins_channel_id ON message_pins(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_pins_conversation_id ON message_pins(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_message_pins_pinned_at ON message_pins(pinned_at);
CREATE INDEX IF NOT EXISTS idx_chat_saved_messages_message_id ON saved_messages(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_saved_messages_workspace_member_id ON saved_messages(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_saved_messages_saved_at ON saved_messages(saved_at);
CREATE INDEX IF NOT EXISTS idx_chat_user_presence_logs_workspace_member_id ON user_presence_logs(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_user_presence_logs_presence_status ON user_presence_logs(presence_status);
CREATE INDEX IF NOT EXISTS idx_chat_user_presence_logs_started_at ON user_presence_logs(started_at);
CREATE INDEX IF NOT EXISTS idx_chat_user_presence_logs_ended_at ON user_presence_logs(ended_at);
CREATE INDEX IF NOT EXISTS idx_chat_calls_workspace_id ON calls(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_calls_channel_id ON calls(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_calls_conversation_id ON calls(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_calls_started_by_member_id ON calls(started_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_calls_call_type ON calls(call_type);
CREATE INDEX IF NOT EXISTS idx_chat_calls_started_at ON calls(started_at);
CREATE INDEX IF NOT EXISTS idx_chat_calls_ended_at ON calls(ended_at);
CREATE INDEX IF NOT EXISTS idx_chat_call_participants_call_id ON call_participants(call_id);
CREATE INDEX IF NOT EXISTS idx_chat_call_participants_workspace_member_id ON call_participants(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_call_participants_joined_at ON call_participants(joined_at);
CREATE INDEX IF NOT EXISTS idx_chat_call_participants_left_at ON call_participants(left_at);
CREATE INDEX IF NOT EXISTS idx_chat_call_participants_was_host ON call_participants(was_host);
CREATE INDEX IF NOT EXISTS idx_chat_invites_workspace_id ON invites(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_invites_channel_id ON invites(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_invites_invited_user_id ON invites(invited_user_id);
CREATE INDEX IF NOT EXISTS idx_chat_invites_invited_by_member_id ON invites(invited_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_invites_invite_type ON invites(invite_type);
CREATE INDEX IF NOT EXISTS idx_chat_invites_invite_status ON invites(invite_status);
CREATE INDEX IF NOT EXISTS idx_chat_invites_expires_at ON invites(expires_at);
CREATE INDEX IF NOT EXISTS idx_chat_invites_accepted_at ON invites(accepted_at);
CREATE INDEX IF NOT EXISTS idx_chat_notification_preferences_workspace_member_id ON notification_preferences(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_notification_preferences_scope_type ON notification_preferences(scope_type);
CREATE INDEX IF NOT EXISTS idx_chat_notification_preferences_channel_id ON notification_preferences(channel_id);
CREATE INDEX IF NOT EXISTS idx_chat_notification_preferences_conversation_id ON notification_preferences(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_notification_preferences_mute_until ON notification_preferences(mute_until);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_workspace_member_id ON notifications(workspace_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_message_id ON notifications(message_id);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_notification_type ON notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_delivery_channel ON notifications(delivery_channel);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_read_at ON notifications(read_at);
CREATE INDEX IF NOT EXISTS idx_chat_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_workspace_id ON moderation_actions(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_target_member_id ON moderation_actions(target_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_target_message_id ON moderation_actions(target_message_id);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_acted_by_member_id ON moderation_actions(acted_by_member_id);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_action_type ON moderation_actions(action_type);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_action_status ON moderation_actions(action_status);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_created_at ON moderation_actions(created_at);
CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_resolved_at ON moderation_actions(resolved_at);
CREATE INDEX IF NOT EXISTS idx_chat_app_events_workspace_id ON app_events(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chat_app_events_member_id ON app_events(member_id);
CREATE INDEX IF NOT EXISTS idx_chat_app_events_event_name ON app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_chat_app_events_event_category ON app_events(event_category);
CREATE INDEX IF NOT EXISTS idx_chat_app_events_entity_type ON app_events(entity_type);
CREATE INDEX IF NOT EXISTS idx_chat_app_events_event_time ON app_events(event_time);
