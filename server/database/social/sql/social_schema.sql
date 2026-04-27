-- =========================
-- SOCIAL APP (schema only)
-- =========================
--
-- This file creates ONLY the app schema and tables.
-- Base-table metadata (table_schemas + table_relationships) lives in:
--   - loaded via JS introspection: `server/scripts/loadAppSchemaMetadata.js`
--   - optional table descriptions: `server/database/social/js/social.data.js` (export `tableDescriptions`)

-- Recreate app schema cleanly
DROP SCHEMA IF EXISTS social_schema CASCADE;
CREATE SCHEMA social_schema;

-- Put app tables into the social schema
SET search_path TO social_schema;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name TEXT,
  bio TEXT,
  profile_picture_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  account_status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deactivated')),
  gender VARCHAR(20),
  date_of_birth DATE,
  country VARCHAR(80),
  city VARCHAR(80),
  preferred_language VARCHAR(30),
  signup_source VARCHAR(30),
  is_private BOOLEAN NOT NULL DEFAULT FALSE,
  followers_count INT NOT NULL DEFAULT 0,
  following_count INT NOT NULL DEFAULT 0,
  posts_count INT NOT NULL DEFAULT 0,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- POSTS
-- =========================
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  media_url TEXT,
  media_type VARCHAR(20) NOT NULL DEFAULT 'none' CHECK (media_type IN ('image', 'video', 'none')),
  location VARCHAR(100),
  visibility VARCHAR(20) NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'followers', 'private')),
  status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived', 'deleted')),
  like_count INT NOT NULL DEFAULT 0,
  comment_count INT NOT NULL DEFAULT 0,
  share_count INT NOT NULL DEFAULT 0,
  view_count INT NOT NULL DEFAULT 0,
  bookmark_count INT NOT NULL DEFAULT 0,
  is_edited BOOLEAN NOT NULL DEFAULT FALSE,
  edited_at TIMESTAMP,
  device_type VARCHAR(20),
  language_code VARCHAR(10),
  content_length INT,
  posted_via VARCHAR(30),
  allow_comments BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
);

-- =========================
-- COMMENTS
-- =========================
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  is_edited BOOLEAN NOT NULL DEFAULT FALSE,
  edited_at TIMESTAMP,
  like_count INT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden', 'deleted', 'flagged')),
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- LIKES
-- =========================
CREATE TABLE likes (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  reaction_type VARCHAR(20) NOT NULL DEFAULT 'like' CHECK (reaction_type IN ('like', 'love', 'haha', 'wow', 'sad')),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, post_id)
);

-- =========================
-- FOLLOWS
-- =========================
CREATE TABLE follows (
  follower_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followee_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted', 'blocked')),
  accepted_at TIMESTAMP,
  is_close_friend BOOLEAN NOT NULL DEFAULT FALSE,
  source VARCHAR(30),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (follower_id, followee_id),
  CHECK (follower_id <> followee_id)
);

-- =========================
-- HASHTAGS
-- =========================
CREATE TABLE hashtags (
  id BIGSERIAL PRIMARY KEY,
  tag_name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- POST_HASHTAGS
-- =========================
CREATE TABLE post_hashtags (
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  hashtag_id BIGINT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, hashtag_id)
);

-- =========================
-- BOOKMARKS
-- =========================
CREATE TABLE bookmarks (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  collection_name VARCHAR(100),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, post_id)
);

-- =========================
-- NOTIFICATIONS
-- =========================
CREATE TABLE notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  actor_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  notification_type VARCHAR(50) NOT NULL,
  entity_id BIGINT,
  message TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- STORIES
-- =========================
CREATE TABLE stories (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')),
  caption TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- STORY_VIEWS
-- =========================
CREATE TABLE story_views (
  story_id BIGINT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  viewer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP NOT NULL,
  PRIMARY KEY (story_id, viewer_id)
);

-- =========================
-- POST_VIEWS
-- =========================
CREATE TABLE post_views (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP NOT NULL,
  watch_seconds INT,
  device_type VARCHAR(20),
  CHECK (watch_seconds IS NULL OR watch_seconds >= 0)
);

-- =========================
-- POST_SHARES
-- =========================
CREATE TABLE post_shares (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  share_type VARCHAR(30) NOT NULL CHECK (share_type IN ('repost', 'dm', 'external')),
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- MESSAGES
-- =========================
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  sender_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_text TEXT,
  message_type VARCHAR(20) NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'audio')),
  sent_at TIMESTAMP NOT NULL,
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMP,
  CHECK (read_at IS NULL OR read_at >= sent_at)
);

-- =========================
-- GROUPS
-- =========================
CREATE TABLE groups (
  id BIGSERIAL PRIMARY KEY,
  creator_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  privacy VARCHAR(20) NOT NULL CHECK (privacy IN ('public', 'private')),
  description TEXT,
  created_at TIMESTAMP NOT NULL
);

-- =========================
-- GROUP_MEMBERS
-- =========================
CREATE TABLE group_members (
  group_id BIGINT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'moderator')),
  joined_at TIMESTAMP NOT NULL,
  PRIMARY KEY (group_id, user_id)
);

-- =========================
-- GROUP_POSTS
-- =========================
CREATE TABLE group_posts (
  group_id BIGINT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  added_at TIMESTAMP NOT NULL,
  PRIMARY KEY (group_id, post_id)
);

-- =========================
-- REPORTS
-- =========================
CREATE TABLE reports (
  id BIGSERIAL PRIMARY KEY,
  reporter_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  post_id BIGINT REFERENCES posts(id) ON DELETE SET NULL,
  comment_id BIGINT REFERENCES comments(id) ON DELETE SET NULL,
  reason VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMP NOT NULL,
  resolved_at TIMESTAMP
);

-- =========================
-- POST_MENTIONS
-- =========================
CREATE TABLE post_mentions (
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  mentioned_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, mentioned_user_id)
);

-- =========================
-- COMMENT_MENTIONS
-- =========================
CREATE TABLE comment_mentions (
  comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  mentioned_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (comment_id, mentioned_user_id)
);

-- =========================
-- USER_BLOCKS
-- =========================
CREATE TABLE user_blocks (
  blocker_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id)
);

-- =========================
-- USER_DEVICES
-- =========================
CREATE TABLE user_devices (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_type VARCHAR(20) NOT NULL,
  os_name VARCHAR(50),
  app_version VARCHAR(20),
  last_active_at TIMESTAMP NOT NULL
);

-- =========================
-- LOGIN_HISTORY
-- =========================
CREATE TABLE login_history (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  login_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(50),
  device_type VARCHAR(50),
  success BOOLEAN NOT NULL
);

-- =========================
-- AD_CAMPAIGNS
-- =========================
CREATE TABLE ad_campaigns (
  id BIGSERIAL PRIMARY KEY,
  advertiser_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  campaign_name VARCHAR(100) NOT NULL,
  budget NUMERIC(12,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =========================
-- PROMOTED_POSTS
-- =========================
CREATE TABLE promoted_posts (
  id BIGSERIAL PRIMARY KEY,
  campaign_id BIGINT NOT NULL REFERENCES ad_campaigns(id) ON DELETE CASCADE,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  spend NUMERIC(12,2) NOT NULL,
  impressions INT NOT NULL,
  clicks INT NOT NULL,
  conversions INT NOT NULL
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_visibility ON posts(visibility);
CREATE INDEX idx_posts_media_type ON posts(media_type);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comments_status ON comments(status);

CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_follows_followee_id ON follows(followee_id);
CREATE INDEX idx_follows_status ON follows(status);

CREATE INDEX idx_hashtags_tag_name ON hashtags(tag_name);

CREATE INDEX idx_bookmarks_post_id ON bookmarks(post_id);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_stories_expires_at ON stories(expires_at);

CREATE INDEX idx_post_views_viewed_at ON post_views(viewed_at DESC);
CREATE INDEX idx_post_shares_created_at ON post_shares(created_at DESC);

CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_sent_at ON messages(sent_at DESC);

CREATE INDEX idx_groups_creator_id ON groups(creator_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);

CREATE INDEX idx_post_mentions_user_id ON post_mentions(mentioned_user_id);
CREATE INDEX idx_comment_mentions_user_id ON comment_mentions(mentioned_user_id);

CREATE INDEX idx_user_blocks_blocked_id ON user_blocks(blocked_id);

CREATE INDEX idx_user_devices_user_id ON user_devices(user_id);
CREATE INDEX idx_user_devices_last_active_at ON user_devices(last_active_at DESC);

CREATE INDEX idx_login_history_user_id ON login_history(user_id);
CREATE INDEX idx_login_history_login_at ON login_history(login_at DESC);
CREATE INDEX idx_login_history_success ON login_history(success);

CREATE INDEX idx_ad_campaigns_advertiser_user_id ON ad_campaigns(advertiser_user_id);
CREATE INDEX idx_ad_campaigns_status ON ad_campaigns(status);

CREATE INDEX idx_promoted_posts_campaign_id ON promoted_posts(campaign_id);
CREATE INDEX idx_promoted_posts_post_id ON promoted_posts(post_id);
