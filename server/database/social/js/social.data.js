import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("social");

export const tableDescriptions = {
  ad_campaigns: "Stores advertising campaigns",
  bookmarks: "Stores bookmarked posts by users",
  comment_mentions: "Maps comment mentions to users",
  comments: "Stores comments and nested replies",
  follows: "Stores follow relationships and requests between users",
  group_members: "Stores group membership and roles",
  group_posts: "Maps posts to groups",
  groups: "Stores user-created groups",
  hashtags: "Stores hashtags",
  likes: "Stores reactions on posts",
  login_history: "Stores login attempts",
  messages: "Stores direct messages",
  notifications: "Stores notifications for users",
  post_hashtags: "Mapping between posts and hashtags",
  post_mentions: "Maps post mentions to users",
  post_shares: "Tracks post shares",
  post_views: "Tracks post views",
  posts: "Stores posts created by users with visibility and engagement fields",
  promoted_posts: "Stores performance of promoted posts",
  reports: "Stores user reports (users/posts/comments)",
  stories: "Stores ephemeral stories posted by users",
  story_views: "Tracks story views",
  user_blocks: "Stores user blocks",
  user_devices: "Stores user devices and activity",
  users: "Stores user profile, account, location, privacy, and summary counters",
};

export const questions = [
  {
    app_id: appId,
    code: "SOCIAL_001",
    title: "Total Users Count",
    description: "Find the total number of users on the platform.",
    difficulty: "easy",
    expected_query: "SELECT COUNT(*) AS count FROM users;",
    solution_columns: ["count"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "SOCIAL_002",
    title: "Total Verified Users",
    description: "Find the total number of users who have verified accounts.",
    difficulty: "easy",
    expected_query:
      "SELECT COUNT(*) AS count FROM users WHERE is_verified = true;",
    solution_columns: ["count"],
    tables: ["users"],
    comparison_config: {},
  },
  {
    app_id: appId,
    code: "SOCIAL_003",
    title: "Active Users",
    description:
      "Retrieve all active users. Results must be ordered by user id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, email, full_name FROM users WHERE is_active = true ORDER BY id ASC;",
    solution_columns: ["id", "username", "email", "full_name"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_004",
    title: "Suspended Users",
    description:
      "Retrieve users whose account status is suspended. Results must be ordered by created_at descending and id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, email, account_status, created_at FROM users WHERE account_status = 'suspended' ORDER BY created_at DESC, id ASC;",
    solution_columns: [
      "id",
      "username",
      "email",
      "account_status",
      "created_at",
    ],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_005",
    title: "Private Profiles",
    description:
      "Find users who have private profiles. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, full_name, is_private FROM users WHERE is_private = true ORDER BY id ASC;",
    solution_columns: ["id", "username", "full_name", "is_private"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_006",
    title: "Top 5 Latest Posts",
    description:
      "Retrieve the 5 most recent posts based on their creation timestamp. Results must be ordered from newest to oldest.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, content, media_type, created_at FROM posts ORDER BY created_at DESC, id DESC LIMIT 5;",
    solution_columns: ["id", "user_id", "content", "media_type", "created_at"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_007",
    title: "Published Posts",
    description:
      "Retrieve all published posts. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status = 'published' ORDER BY created_at DESC, id DESC;",
    solution_columns: [
      "id",
      "user_id",
      "content",
      "visibility",
      "status",
      "created_at",
    ],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_008",
    title: "Image Posts",
    description:
      "Find posts whose media type is image. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type = 'image' ORDER BY id ASC;",
    solution_columns: [
      "id",
      "user_id",
      "media_url",
      "media_type",
      "created_at",
    ],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_009",
    title: "Visible Comments",
    description:
      "Retrieve comments that are currently visible. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status = 'visible' ORDER BY created_at DESC, id DESC;",
    solution_columns: [
      "id",
      "post_id",
      "user_id",
      "comment_text",
      "created_at",
    ],
    tables: ["comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_010",
    title: "Unread Notifications",
    description:
      "Find unread notifications. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE is_read = false ORDER BY created_at DESC, id DESC;",
    solution_columns: [
      "id",
      "user_id",
      "actor_id",
      "notification_type",
      "created_at",
    ],
    tables: ["notifications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_011",
    title: "Users From India",
    description:
      "Find users whose country is India. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, country FROM users WHERE country = 'India' ORDER BY id ASC;",
    solution_columns: ["id", "username", "country"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_012",
    title: "Users With Bio",
    description:
      "Find users who have a bio. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, bio FROM users WHERE bio IS NOT NULL ORDER BY id ASC;",
    solution_columns: ["id", "username", "bio"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_013",
    title: "Draft Posts",
    description:
      "Retrieve posts that are in draft status. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, status, created_at FROM posts WHERE status = 'draft' ORDER BY created_at DESC, id DESC;",
    solution_columns: ["id", "user_id", "status", "created_at"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_014",
    title: "Posts With Comments Disabled",
    description:
      "Find posts where comments are not allowed. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, allow_comments FROM posts WHERE allow_comments = false ORDER BY id ASC;",
    solution_columns: ["id", "user_id", "allow_comments"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_015",
    title: "Users With No Posts",
    description:
      "Find users who have not created any posts. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, posts_count FROM users WHERE posts_count = 0 ORDER BY id ASC;",
    solution_columns: ["id", "username", "posts_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_016",
    title: "Users With Followers",
    description:
      "Find users who have at least one follower. Results must be ordered by followers_count descending and id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, followers_count FROM users WHERE followers_count > 0 ORDER BY followers_count DESC, id ASC;",
    solution_columns: ["id", "username", "followers_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "followers_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_017",
    title: "Stories Currently Active",
    description:
      "Find stories that have not expired yet. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, expires_at, created_at FROM stories WHERE expires_at > NOW() ORDER BY created_at DESC, id DESC;",
    solution_columns: ["id", "user_id", "expires_at", "created_at"],
    tables: ["stories"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_018",
    title: "Unread Messages",
    description:
      "Find messages that have not been read yet. Results must be ordered by sent_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, sender_id, receiver_id, sent_at FROM messages WHERE read_at IS NULL ORDER BY sent_at DESC, id DESC;",
    solution_columns: ["id", "sender_id", "receiver_id", "sent_at"],
    tables: ["messages"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "sent_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_019",
    title: "Failed Logins",
    description:
      "Find login attempts that were unsuccessful. Results must be ordered by login_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, login_at, success FROM login_history WHERE success = false ORDER BY login_at DESC, id DESC;",
    solution_columns: ["id", "user_id", "login_at", "success"],
    tables: ["login_history"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "login_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_020",
    title: "Public Groups",
    description:
      "Find groups that are public. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, name, privacy FROM groups WHERE privacy = 'public' ORDER BY id ASC;",
    solution_columns: ["id", "name", "privacy"],
    tables: ["groups"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_021",
    title: "Users With Profile Pictures",
    description:
      "Find users who have a profile picture. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, profile_picture_url FROM users WHERE profile_picture_url IS NOT NULL ORDER BY id ASC;",
    solution_columns: ["id", "username", "profile_picture_url"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_022",
    title: "Posts With Location",
    description:
      "Find posts that have a location specified. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, location FROM posts WHERE location IS NOT NULL ORDER BY id ASC;",
    solution_columns: ["id", "user_id", "location"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_023",
    title: "Archived Posts",
    description:
      "Retrieve posts that are archived. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, status, created_at FROM posts WHERE status = 'archived' ORDER BY created_at DESC, id DESC;",
    solution_columns: ["id", "user_id", "status", "created_at"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_024",
    title: "Deleted Comments",
    description:
      "Find comments that are marked as deleted. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, post_id, user_id, status, created_at FROM comments WHERE status = 'deleted' ORDER BY created_at DESC, id DESC;",
    solution_columns: ["id", "post_id", "user_id", "status", "created_at"],
    tables: ["comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_025",
    title: "Blocked Users",
    description:
      "Find all user block relationships. Results must be ordered by blocker_id ascending and blocked_id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT blocker_id, blocked_id FROM user_blocks ORDER BY blocker_id ASC, blocked_id ASC;",
    solution_columns: ["blocker_id", "blocked_id"],
    tables: ["user_blocks"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "blocker_id", direction: "asc" },
        { column: "blocked_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_026",
    title: "Users Who Signed Up Via Google",
    description:
      "Find users who signed up using Google. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, signup_source FROM users WHERE signup_source = 'google' ORDER BY id ASC;",
    solution_columns: ["id", "username", "signup_source"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_027",
    title: "Users With Last Login",
    description:
      "Find users who have logged in at least once. Results must be ordered by last_login_at descending and id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, username, last_login_at FROM users WHERE last_login_at IS NOT NULL ORDER BY last_login_at DESC, id ASC;",
    solution_columns: ["id", "username", "last_login_at"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "last_login_at", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_028",
    title: "Posts With Video",
    description:
      "Find posts that contain video media. Results must be ordered by id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, media_type FROM posts WHERE media_type = 'video' ORDER BY id ASC;",
    solution_columns: ["id", "user_id", "media_type"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_029",
    title: "Group Members",
    description:
      "List all group members. Results must be ordered by group_id ascending and user_id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT group_id, user_id, role FROM group_members ORDER BY group_id ASC, user_id ASC;",
    solution_columns: ["group_id", "user_id", "role"],
    tables: ["group_members"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "group_id", direction: "asc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_030",
    title: "Posts With Mentions",
    description:
      "Find posts that contain mentions. Results must be ordered by post_id ascending and mentioned_user_id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT post_id, mentioned_user_id FROM post_mentions ORDER BY post_id ASC, mentioned_user_id ASC;",
    solution_columns: ["post_id", "mentioned_user_id"],
    tables: ["post_mentions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "post_id", direction: "asc" },
        { column: "mentioned_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_031",
    title: "Comment Mentions",
    description:
      "Find comments that mention users. Results must be ordered by comment_id ascending and mentioned_user_id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT comment_id, mentioned_user_id FROM comment_mentions ORDER BY comment_id ASC, mentioned_user_id ASC;",
    solution_columns: ["comment_id", "mentioned_user_id"],
    tables: ["comment_mentions"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "comment_id", direction: "asc" },
        { column: "mentioned_user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_032",
    title: "Open Reports",
    description:
      "Find reports that are currently open. Results must be ordered by created_at descending and id descending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status = 'open' ORDER BY created_at DESC, id DESC;",
    solution_columns: [
      "id",
      "reporter_id",
      "reported_user_id",
      "post_id",
      "comment_id",
      "reason",
      "created_at",
    ],
    tables: ["reports"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "created_at", direction: "desc" },
        { column: "id", direction: "desc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_033",
    title: "Active Ad Campaigns",
    description:
      "Find ad campaigns that are currently active. Results must be ordered by start_date ascending and id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status = 'active' ORDER BY start_date ASC, id ASC;",
    solution_columns: [
      "id",
      "advertiser_user_id",
      "campaign_name",
      "budget",
      "start_date",
      "end_date",
    ],
    tables: ["ad_campaigns"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "start_date", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_034",
    title: "Promoted Posts With Spend",
    description:
      "Find promoted posts where spend is greater than zero. Results must be ordered by spend descending and id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, campaign_id, post_id, spend FROM promoted_posts WHERE spend > 0 ORDER BY spend DESC, id ASC;",
    solution_columns: ["id", "campaign_id", "post_id", "spend"],
    tables: ["promoted_posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "spend", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_035",
    title: "Top 10 Most Viewed Posts",
    description:
      "Retrieve the 10 posts with the highest view count. Results must be ordered by view_count descending and id ascending.",
    difficulty: "easy",
    expected_query:
      "SELECT id, user_id, view_count FROM posts ORDER BY view_count DESC, id ASC LIMIT 10;",
    solution_columns: ["id", "user_id", "view_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "view_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_036",
    title: "Post Count By Status",
    description:
      "Count how many posts exist for each post status. Results must be ordered by status ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT status, COUNT(*) AS post_count FROM posts GROUP BY status ORDER BY status ASC;",
    solution_columns: ["status", "post_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "status", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_037",
    title: "User Count By Country",
    description:
      "Count users by country, excluding users with no country. Results must be ordered by user_count descending and country ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT country, COUNT(*) AS user_count FROM users WHERE country IS NOT NULL GROUP BY country ORDER BY user_count DESC, country ASC;",
    solution_columns: ["country", "user_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "user_count", direction: "desc" },
        { column: "country", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_038",
    title: "Average Post Views By Media Type",
    description:
      "Find the average view count of posts for each media type. Results must be ordered by media_type ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT media_type, AVG(view_count) AS avg_view_count FROM posts GROUP BY media_type ORDER BY media_type ASC;",
    solution_columns: ["media_type", "avg_view_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "media_type", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_039",
    title: "Accepted Follow Count Per User",
    description:
      "Count accepted followers for each user. Results must be ordered by follower_count descending and followee_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id ORDER BY follower_count DESC, followee_id ASC;",
    solution_columns: ["followee_id", "follower_count"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "follower_count", direction: "desc" },
        { column: "followee_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_040",
    title: "Comment Count Per Post",
    description:
      "Count visible comments for each post. Results must be ordered by comment_count descending and post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id ORDER BY comment_count DESC, post_id ASC;",
    solution_columns: ["post_id", "comment_count"],
    tables: ["comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "comment_count", direction: "desc" },
        { column: "post_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_041",
    title: "Likes Per Post",
    description:
      "Count total likes for each post. Results must be ordered by like_count descending and post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id ORDER BY like_count DESC, post_id ASC;",
    solution_columns: ["post_id", "like_count"],
    tables: ["likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "like_count", direction: "desc" },
        { column: "post_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_042",
    title: "Distinct Likers Per Post",
    description:
      "Count distinct users who liked each post. Results must be ordered by distinct_likers descending and post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id, COUNT(DISTINCT user_id) AS distinct_likers FROM likes GROUP BY post_id ORDER BY distinct_likers DESC, post_id ASC;",
    solution_columns: ["post_id", "distinct_likers"],
    tables: ["likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "distinct_likers", direction: "desc" },
        { column: "post_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_043",
    title: "Posts Per User",
    description:
      "Count how many posts each user has created. Results must be ordered by post_count descending and user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id ORDER BY post_count DESC, user_id ASC;",
    solution_columns: ["user_id", "post_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "post_count", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_044",
    title: "Comments Per User",
    description:
      "Count how many comments each user has made. Results must be ordered by comment_count descending and user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, COUNT(*) AS comment_count FROM comments GROUP BY user_id ORDER BY comment_count DESC, user_id ASC;",
    solution_columns: ["user_id", "comment_count"],
    tables: ["comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "comment_count", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_045",
    title: "Posts With More Than 100 Likes",
    description:
      "Find posts that have more than 100 likes using likes table. Results must be ordered by like_count descending and post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id HAVING COUNT(*) > 100 ORDER BY like_count DESC, post_id ASC;",
    solution_columns: ["post_id", "like_count"],
    tables: ["likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "like_count", direction: "desc" },
        { column: "post_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_046",
    title: "Users With Multiple Devices",
    description:
      "Find users who have more than one device registered. Results must be ordered by device_count descending and user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, COUNT(*) AS device_count FROM user_devices GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY device_count DESC, user_id ASC;",
    solution_columns: ["user_id", "device_count"],
    tables: ["user_devices"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "device_count", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_047",
    title: "Bookmarks Per User",
    description:
      "Count how many posts each user has bookmarked. Results must be ordered by bookmark_count descending and user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, COUNT(*) AS bookmark_count FROM bookmarks GROUP BY user_id ORDER BY bookmark_count DESC, user_id ASC;",
    solution_columns: ["user_id", "bookmark_count"],
    tables: ["bookmarks"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "bookmark_count", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_048",
    title: "Shares Per Post",
    description:
      "Count how many times each post has been shared. Results must be ordered by share_count descending and post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id, COUNT(*) AS share_count FROM post_shares GROUP BY post_id ORDER BY share_count DESC, post_id ASC;",
    solution_columns: ["post_id", "share_count"],
    tables: ["post_shares"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "share_count", direction: "desc" },
        { column: "post_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_049",
    title: "Story Views Per Story",
    description:
      "Count how many users viewed each story. Results must be ordered by view_count descending and story_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT story_id, COUNT(*) AS view_count FROM story_views GROUP BY story_id ORDER BY view_count DESC, story_id ASC;",
    solution_columns: ["story_id", "view_count"],
    tables: ["story_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "view_count", direction: "desc" },
        { column: "story_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_050",
    title: "Messages Sent Per User",
    description:
      "Count how many messages each user has sent. Results must be ordered by message_count descending and sender_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT sender_id, COUNT(*) AS message_count FROM messages GROUP BY sender_id ORDER BY message_count DESC, sender_id ASC;",
    solution_columns: ["sender_id", "message_count"],
    tables: ["messages"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "message_count", direction: "desc" },
        { column: "sender_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_051",
    title: "Followers Per User (Accepted Only)",
    description:
      "Count accepted followers for each user. Results must be ordered by follower_count descending and followee_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id ORDER BY follower_count DESC, followee_id ASC;",
    solution_columns: ["followee_id", "follower_count"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "follower_count", direction: "desc" },
        { column: "followee_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_052",
    title: "Following Count Per User",
    description:
      "Count how many users each user follows (accepted only). Results must be ordered by following_count descending and follower_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT follower_id, COUNT(*) AS following_count FROM follows WHERE status = 'accepted' GROUP BY follower_id ORDER BY following_count DESC, follower_id ASC;",
    solution_columns: ["follower_id", "following_count"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "following_count", direction: "desc" },
        { column: "follower_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_053",
    title: "Average Comments Per Post",
    description:
      "Calculate average number of visible comments per post. Results must be ordered by avg_comments descending.",
    difficulty: "medium",
    expected_query:
      "SELECT AVG(comment_count) AS avg_comments FROM (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) sub;",
    solution_columns: ["avg_comments"],
    tables: ["comments"],
  },
  {
    app_id: appId,
    code: "SOCIAL_054",
    title: "Posts With More Comments Than Likes",
    description:
      "Find posts where visible comments exceed total likes. Results must be ordered by post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT p.id AS post_id FROM posts p LEFT JOIN (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) l ON p.id = l.post_id LEFT JOIN (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) c ON p.id = c.post_id WHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0) ORDER BY post_id ASC;",
    solution_columns: ["post_id"],
    tables: ["posts", "likes", "comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_055",
    title: "Users With More Followers Than Following",
    description:
      "Find users whose followers_count is greater than following_count. Results must be ordered by id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT id, followers_count, following_count FROM users WHERE followers_count > following_count ORDER BY id ASC;",
    solution_columns: ["id", "followers_count", "following_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_056",
    title: "Users With At Least 10 Posts",
    description:
      "Find users who have created at least 10 posts. Results must be ordered by post_count descending and user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id HAVING COUNT(*) >= 10 ORDER BY post_count DESC, user_id ASC;",
    solution_columns: ["user_id", "post_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "post_count", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_057",
    title: "Posts With No Comments",
    description:
      "Find posts that have no visible comments. Results must be ordered by post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT p.id AS post_id FROM posts p LEFT JOIN comments c ON p.id = c.post_id AND c.status = 'visible' WHERE c.id IS NULL ORDER BY post_id ASC;",
    solution_columns: ["post_id"],
    tables: ["posts", "comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_058",
    title: "Users Who Never Logged In Successfully",
    description:
      "Find users who never had a successful login. Results must be ordered by id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT u.id FROM users u LEFT JOIN login_history lh ON u.id = lh.user_id AND lh.success = true WHERE lh.id IS NULL ORDER BY u.id ASC;",
    solution_columns: ["id"],
    tables: ["users", "login_history"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_059",
    title: "Posts With At Least 3 Distinct Likers",
    description:
      "Find posts liked by at least 3 distinct users. Results must be ordered by post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id FROM likes GROUP BY post_id HAVING COUNT(DISTINCT user_id) >= 3 ORDER BY post_id ASC;",
    solution_columns: ["post_id"],
    tables: ["likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_060",
    title: "Users With Comments On Multiple Posts",
    description:
      "Find users who have commented on at least 2 different posts. Results must be ordered by user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id FROM comments GROUP BY user_id HAVING COUNT(DISTINCT post_id) >= 2 ORDER BY user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_061",
    title: "Posts With No Likes",
    description:
      "Find posts that have no likes. Results must be ordered by post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT p.id AS post_id FROM posts p LEFT JOIN likes l ON p.id = l.post_id WHERE l.post_id IS NULL ORDER BY post_id ASC;",
    solution_columns: ["post_id"],
    tables: ["posts", "likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_062",
    title: "Users With Pending Follow Requests",
    description:
      "Find users who have sent pending follow requests. Results must be ordered by follower_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT follower_id FROM follows WHERE status = 'pending' ORDER BY follower_id ASC;",
    solution_columns: ["follower_id"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "follower_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_063",
    title: "Users With Blocked Follow Relationships",
    description:
      "Find users who are blocked in follow relationships. Results must be ordered by followee_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT followee_id FROM follows WHERE status = 'blocked' ORDER BY followee_id ASC;",
    solution_columns: ["followee_id"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "followee_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_064",
    title: "Most Recent Login Per User",
    description:
      "Find the latest successful login timestamp for each user. Results must be ordered by last_successful_login descending and user_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT user_id, MAX(login_at) AS last_successful_login FROM login_history WHERE success = true GROUP BY user_id ORDER BY last_successful_login DESC, user_id ASC;",
    solution_columns: ["user_id", "last_successful_login"],
    tables: ["login_history"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "last_successful_login", direction: "desc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_065",
    title: "Daily Signups",
    description:
      "Count users who signed up on each date. Results must be ordered by signup_date ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT created_at::date AS signup_date, COUNT(*) AS user_count FROM users GROUP BY created_at::date ORDER BY signup_date ASC;",
    solution_columns: ["signup_date", "user_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "signup_date", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_066",
    title: "Daily Published Posts",
    description:
      "Count published posts created on each date. Results must be ordered by post_date ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT created_at::date AS post_date, COUNT(*) AS post_count FROM posts WHERE status = 'published' GROUP BY created_at::date ORDER BY post_date ASC;",
    solution_columns: ["post_date", "post_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_date", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_067",
    title: "Top Hashtags By Usage",
    description:
      "Count how many posts use each hashtag. Results must be ordered by usage_count descending and hashtag_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT hashtag_id, COUNT(*) AS usage_count FROM post_hashtags GROUP BY hashtag_id ORDER BY usage_count DESC, hashtag_id ASC;",
    solution_columns: ["hashtag_id", "usage_count"],
    tables: ["post_hashtags"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "usage_count", direction: "desc" },
        { column: "hashtag_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_068",
    title: "Posts Shared Externally",
    description:
      "Find posts that were shared externally at least once. Results must be ordered by post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT DISTINCT post_id FROM post_shares WHERE share_type = 'external' ORDER BY post_id ASC;",
    solution_columns: ["post_id"],
    tables: ["post_shares"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_069",
    title: "Users Who Sent Messages To Multiple Receivers",
    description:
      "Find users who sent messages to at least 2 different receivers. Results must be ordered by sender_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT sender_id FROM messages WHERE is_deleted = false GROUP BY sender_id HAVING COUNT(DISTINCT receiver_id) >= 2 ORDER BY sender_id ASC;",
    solution_columns: ["sender_id"],
    tables: ["messages"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "sender_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_070",
    title: "Reports Per Reason",
    description:
      "Count reports for each reason, excluding reports with no reason. Results must be ordered by report_count descending and reason ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT reason, COUNT(*) AS report_count FROM reports WHERE reason IS NOT NULL GROUP BY reason ORDER BY report_count DESC, reason ASC;",
    solution_columns: ["reason", "report_count"],
    tables: ["reports"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "report_count", direction: "desc" },
        { column: "reason", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_071",
    title: "Post Count By Media Type",
    description:
      "Count posts for each media type. Results must be ordered by media_type ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT media_type, COUNT(*) AS post_count FROM posts GROUP BY media_type ORDER BY media_type ASC;",
    solution_columns: ["media_type", "post_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "media_type", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_072",
    title: "Users By Signup Source",
    description:
      "Count users for each signup source, excluding users with no signup source. Results must be ordered by user_count descending and signup_source ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;",
    solution_columns: ["signup_source", "user_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "user_count", direction: "desc" },
        { column: "signup_source", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_073",
    title: "Notification Count By Type",
    description:
      "Count notifications for each notification type, excluding notifications with no type. Results must be ordered by notification_count descending and notification_type ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT notification_type, COUNT(*) AS notification_count FROM notifications WHERE notification_type IS NOT NULL GROUP BY notification_type ORDER BY notification_count DESC, notification_type ASC;",
    solution_columns: ["notification_type", "notification_count"],
    tables: ["notifications"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "notification_count", direction: "desc" },
        { column: "notification_type", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_074",
    title: "Average Watch Seconds Per Post",
    description:
      "Calculate the average watch seconds for each post, excluding views with no watch duration. Results must be ordered by avg_watch_seconds descending and post_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT post_id, AVG(watch_seconds) AS avg_watch_seconds FROM post_views WHERE watch_seconds IS NOT NULL GROUP BY post_id ORDER BY avg_watch_seconds DESC, post_id ASC;",
    solution_columns: ["post_id", "avg_watch_seconds"],
    tables: ["post_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "avg_watch_seconds", direction: "desc" },
        { column: "post_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_075",
    title: "Campaign Spend Summary",
    description:
      "For each campaign, calculate total spend across promoted posts. Results must be ordered by total_spend descending and campaign_id ascending.",
    difficulty: "medium",
    expected_query:
      "SELECT campaign_id, SUM(spend) AS total_spend FROM promoted_posts GROUP BY campaign_id ORDER BY total_spend DESC, campaign_id ASC;",
    solution_columns: ["campaign_id", "total_spend"],
    tables: ["promoted_posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "total_spend", direction: "desc" },
        { column: "campaign_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_076",
    title: "Campaign Click Through Rate",
    description:
      "For each promoted post, calculate click-through rate as clicks divided by impressions. Exclude rows with zero impressions. Results must be ordered by ctr descending and id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr FROM promoted_posts WHERE impressions > 0 ORDER BY ctr DESC, id ASC;",
    solution_columns: ["id", "campaign_id", "post_id", "ctr"],
    tables: ["promoted_posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "ctr", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_077",
    title: "Posts Above Average Views",
    description:
      "Find posts whose view count is greater than the overall average view count. Results must be ordered by view_count descending and id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT id, user_id, view_count FROM posts WHERE view_count > (SELECT AVG(view_count) FROM posts) ORDER BY view_count DESC, id ASC;",
    solution_columns: ["id", "user_id", "view_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "view_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_078",
    title: "Users Above Average Followers",
    description:
      "Find users whose followers_count is greater than the average followers_count of all users. Results must be ordered by followers_count descending and id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT id, username, followers_count FROM users WHERE followers_count > (SELECT AVG(followers_count) FROM users) ORDER BY followers_count DESC, id ASC;",
    solution_columns: ["id", "username", "followers_count"],
    tables: ["users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "followers_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_079",
    title: "Top Posts By Total Engagement",
    description:
      "Find posts ranked by total stored engagement, where engagement is like_count plus comment_count plus share_count. Results must be ordered by engagement_count descending and id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT id, user_id, like_count + comment_count + share_count AS engagement_count FROM posts ORDER BY engagement_count DESC, id ASC;",
    solution_columns: ["id", "user_id", "engagement_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "engagement_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_080",
    title: "Users With More Failed Than Successful Logins",
    description:
      "Find users who have more failed login attempts than successful login attempts. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT user_id, COUNT(*) FILTER (WHERE success = false) AS failed_logins, COUNT(*) FILTER (WHERE success = true) AS successful_logins FROM login_history GROUP BY user_id HAVING COUNT(*) FILTER (WHERE success = false) > COUNT(*) FILTER (WHERE success = true) ORDER BY user_id ASC;",
    solution_columns: ["user_id", "failed_logins", "successful_logins"],
    tables: ["login_history"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_081",
    title: "Top 3 Posts Per User",
    description:
      "For each user, find their top 3 posts by view count. Results must be ordered by user_id ascending, view_count descending, and id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT user_id, id, view_count FROM (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) t WHERE rn <= 3 ORDER BY user_id ASC, view_count DESC, id ASC;",
    solution_columns: ["user_id", "id", "view_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "user_id", direction: "asc" },
        { column: "view_count", direction: "desc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_082",
    title: "Users With Consecutive Login Days",
    description:
      "Find users who logged in on at least 3 consecutive days. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH daily_logins AS (SELECT DISTINCT user_id, login_at::date AS d FROM login_history WHERE success = true), seq AS (SELECT user_id, d, d - INTERVAL '1 day' * ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS grp FROM daily_logins) SELECT user_id FROM seq GROUP BY user_id, grp HAVING COUNT(*) >= 3 ORDER BY user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["login_history"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_083",
    title: "Posts With More Likes Than Average Of User",
    description:
      "Find posts whose like_count is greater than the average like_count of posts by the same user. Results must be ordered by user_id ascending and id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT id, user_id FROM posts p WHERE like_count > (SELECT AVG(p2.like_count) FROM posts p2 WHERE p2.user_id = p.user_id) ORDER BY user_id ASC, id ASC;",
    solution_columns: ["id", "user_id"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "user_id", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_084",
    title: "Users Who Follow Only Verified Users",
    description:
      "Find users who follow only verified users. Results must be ordered by follower_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT f.follower_id FROM follows f JOIN users u ON f.followee_id = u.id WHERE f.status = 'accepted' GROUP BY f.follower_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE u.is_verified = true) ORDER BY f.follower_id ASC;",
    solution_columns: ["follower_id"],
    tables: ["follows", "users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "follower_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_085",
    title: "Posts With Increasing Daily Views",
    description:
      "Find posts where daily view counts strictly increased over time (at least 3 days). Results must be ordered by post_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH daily_views AS (SELECT post_id, viewed_at::date AS d, COUNT(*) AS cnt FROM post_views GROUP BY post_id, viewed_at::date), flagged AS (SELECT post_id, d, cnt, CASE WHEN cnt > LAG(cnt) OVER (PARTITION BY post_id ORDER BY d) THEN 1 ELSE 0 END AS inc FROM daily_views), grp AS (SELECT post_id, d, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY d) - ROW_NUMBER() OVER (PARTITION BY post_id, inc ORDER BY d) AS g FROM flagged WHERE inc = 1) SELECT post_id FROM grp GROUP BY post_id, g HAVING COUNT(*) >= 3 ORDER BY post_id ASC;",
    solution_columns: ["post_id"],
    tables: ["post_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "post_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_086",
    title: "Users With Highest Engagement Per Country",
    description:
      "For each country, find the user with highest total engagement (likes + comments on their posts). Results must be ordered by country ascending and user_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH engagement AS (SELECT p.user_id, SUM(p.like_count + p.comment_count) AS total_engagement FROM posts p GROUP BY p.user_id), ranked AS (SELECT u.country, e.user_id, e.total_engagement, ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY e.total_engagement DESC, e.user_id ASC) AS rn FROM engagement e JOIN users u ON e.user_id = u.id) SELECT country, user_id, total_engagement FROM ranked WHERE rn = 1 ORDER BY country ASC, user_id ASC;",
    solution_columns: ["country", "user_id", "total_engagement"],
    tables: ["posts", "users"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "country", direction: "asc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_087",
    title: "Users Whose Followers Are Increasing",
    description:
      "Find users whose follower count increased month over month for at least 3 months. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH monthly AS (SELECT followee_id AS user_id, DATE_TRUNC('month', created_at) AS m, COUNT(*) AS cnt FROM follows WHERE status = 'accepted' GROUP BY followee_id, DATE_TRUNC('month', created_at)), flagged AS (SELECT user_id, m, cnt, CASE WHEN cnt > LAG(cnt) OVER (PARTITION BY user_id ORDER BY m) THEN 1 ELSE 0 END AS inc FROM monthly), grp AS (SELECT user_id, m, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY m) - ROW_NUMBER() OVER (PARTITION BY user_id, inc ORDER BY m) AS g FROM flagged WHERE inc = 1) SELECT user_id FROM grp GROUP BY user_id, g HAVING COUNT(*) >= 3 ORDER BY user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_088",
    title: "Top Commenters Per Post",
    description:
      "For each post, find the user who made the most comments. Results must be ordered by post_id ascending and user_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH counts AS (SELECT post_id, user_id, COUNT(*) AS cnt FROM comments GROUP BY post_id, user_id), ranked AS (SELECT post_id, user_id, cnt, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY cnt DESC, user_id ASC) AS rn FROM counts) SELECT post_id, user_id, cnt FROM ranked WHERE rn = 1 ORDER BY post_id ASC, user_id ASC;",
    solution_columns: ["post_id", "user_id", "cnt"],
    tables: ["comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "post_id", direction: "asc" },
        { column: "user_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_089",
    title: "Users Who Never Interacted",
    description:
      "Find users who never posted, commented, or liked anything. Results must be ordered by id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT u.id FROM users u LEFT JOIN posts p ON u.id = p.user_id LEFT JOIN comments c ON u.id = c.user_id LEFT JOIN likes l ON u.id = l.user_id WHERE p.id IS NULL AND c.id IS NULL AND l.user_id IS NULL ORDER BY u.id ASC;",
    solution_columns: ["id"],
    tables: ["users", "posts", "comments", "likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_090",
    title: "Users With Mutual Followers",
    description:
      "Find users who have at least one mutual follow (A follows B and B follows A). Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT DISTINCT f1.follower_id AS user_id FROM follows f1 JOIN follows f2 ON f1.follower_id = f2.followee_id AND f1.followee_id = f2.follower_id WHERE f1.status = 'accepted' AND f2.status = 'accepted' ORDER BY user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_091",
    title: "Posts With Above Average Engagement By Media Type",
    description:
      "Find posts whose stored engagement is greater than the average stored engagement of posts with the same media type. Engagement is like_count plus comment_count plus share_count. Results must be ordered by media_type ascending and id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH media_avg AS (SELECT media_type, AVG(like_count + comment_count + share_count) AS avg_engagement FROM posts GROUP BY media_type) SELECT p.id, p.media_type, p.like_count + p.comment_count + p.share_count AS engagement_count FROM posts p JOIN media_avg ma ON p.media_type = ma.media_type WHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement ORDER BY p.media_type ASC, p.id ASC;",
    solution_columns: ["id", "media_type", "engagement_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "media_type", direction: "asc" },
        { column: "id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_092",
    title: "Users With Posts In Multiple Languages",
    description:
      "Find users who have published posts in at least 2 different languages. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT user_id FROM posts WHERE status = 'published' AND language_code IS NOT NULL GROUP BY user_id HAVING COUNT(DISTINCT language_code) >= 2 ORDER BY user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_093",
    title: "Second Most Viewed Post Per User",
    description:
      "For each user, find their second most viewed post. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT user_id, id AS post_id, view_count FROM (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) ranked WHERE rn = 2 ORDER BY user_id ASC;",
    solution_columns: ["user_id", "post_id", "view_count"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_094",
    title: "Top Hashtag Per Media Type",
    description:
      "For each media type, find the hashtag used by the most posts. Results must be ordered by media_type ascending and hashtag_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH hashtag_usage AS (SELECT p.media_type, ph.hashtag_id, COUNT(*) AS usage_count FROM posts p JOIN post_hashtags ph ON p.id = ph.post_id GROUP BY p.media_type, ph.hashtag_id), ranked AS (SELECT media_type, hashtag_id, usage_count, ROW_NUMBER() OVER (PARTITION BY media_type ORDER BY usage_count DESC, hashtag_id ASC) AS rn FROM hashtag_usage) SELECT media_type, hashtag_id, usage_count FROM ranked WHERE rn = 1 ORDER BY media_type ASC, hashtag_id ASC;",
    solution_columns: ["media_type", "hashtag_id", "usage_count"],
    tables: ["posts", "post_hashtags"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "media_type", direction: "asc" },
        { column: "hashtag_id", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_095",
    title: "Users With More Likes Received Than Given",
    description:
      "Find users whose posts received more likes than the number of likes they gave. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH likes_received AS (SELECT p.user_id, COUNT(l.user_id) AS received_count FROM posts p LEFT JOIN likes l ON p.id = l.post_id GROUP BY p.user_id), likes_given AS (SELECT user_id, COUNT(*) AS given_count FROM likes GROUP BY user_id) SELECT lr.user_id FROM likes_received lr LEFT JOIN likes_given lg ON lr.user_id = lg.user_id WHERE lr.received_count > COALESCE(lg.given_count, 0) ORDER BY lr.user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["posts", "likes"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_096",
    title: "Users Whose Posts All Allow Comments",
    description:
      "Find users whose published posts all allow comments. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT user_id FROM posts WHERE status = 'published' GROUP BY user_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE allow_comments = true) ORDER BY user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["posts"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_097",
    title: "Post View Drop After Peak",
    description:
      "For each post, find days after its peak daily views where daily views dropped below half of the peak. Results must be ordered by post_id ascending and view_date ascending.",
    difficulty: "hard",
    expected_query:
      "WITH daily_views AS (SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views FROM post_views GROUP BY post_id, viewed_at::date), peak_views AS (SELECT post_id, MAX(daily_views) AS peak_daily_views FROM daily_views GROUP BY post_id), peak_dates AS (SELECT dv.post_id, MIN(dv.view_date) AS peak_date FROM daily_views dv JOIN peak_views pv ON dv.post_id = pv.post_id AND dv.daily_views = pv.peak_daily_views GROUP BY dv.post_id) SELECT dv.post_id, dv.view_date, dv.daily_views, pv.peak_daily_views FROM daily_views dv JOIN peak_views pv ON dv.post_id = pv.post_id JOIN peak_dates pd ON dv.post_id = pd.post_id WHERE dv.view_date > pd.peak_date AND dv.daily_views < pv.peak_daily_views / 2.0 ORDER BY dv.post_id ASC, dv.view_date ASC;",
    solution_columns: [
      "post_id",
      "view_date",
      "daily_views",
      "peak_daily_views",
    ],
    tables: ["post_views"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [
        { column: "post_id", direction: "asc" },
        { column: "view_date", direction: "asc" },
      ],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_098",
    title: "Users Who Commented On Their Own Posts",
    description:
      "Find users who commented on their own posts. Results must be ordered by user_id ascending.",
    difficulty: "hard",
    expected_query:
      "SELECT DISTINCT p.user_id FROM posts p JOIN comments c ON p.id = c.post_id AND p.user_id = c.user_id ORDER BY p.user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["posts", "comments"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_099",
    title: "Users With Cross-Day Message Streaks",
    description:
      "Find users who sent messages on at least 3 consecutive days. Results must be ordered by sender_id ascending.",
    difficulty: "hard",
    expected_query:
      "WITH daily_messages AS (SELECT DISTINCT sender_id, sent_at::date AS message_date FROM messages WHERE is_deleted = false), sequenced AS (SELECT sender_id, message_date, message_date - INTERVAL '1 day' * ROW_NUMBER() OVER (PARTITION BY sender_id ORDER BY message_date) AS grp FROM daily_messages), streaks AS (SELECT sender_id FROM sequenced GROUP BY sender_id, grp HAVING COUNT(*) >= 3) SELECT sender_id FROM streaks ORDER BY sender_id ASC;",
    solution_columns: ["sender_id"],
    tables: ["messages"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "sender_id", direction: "asc" }],
    },
  },
  {
    app_id: appId,
    code: "SOCIAL_100",
    title: "Users More Popular Than Their Followers",
    description:
      "Find users whose follower count is greater than the average follower count of the users who follow them.",
    difficulty: "hard",
    expected_query:
      "WITH follower_counts AS (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id), follower_avg AS (SELECT f.followee_id AS user_id, AVG(COALESCE(fc.follower_count, 0)) AS avg_follower_count FROM follows f LEFT JOIN follower_counts fc ON f.follower_id = fc.user_id WHERE f.status = 'accepted' GROUP BY f.followee_id) SELECT fc.user_id FROM follower_counts fc JOIN follower_avg fa ON fc.user_id = fa.user_id WHERE fc.follower_count > fa.avg_follower_count ORDER BY fc.user_id ASC;",
    solution_columns: ["user_id"],
    tables: ["follows"],
    comparison_config: {
      ignore_order: false,
      sort_by_columns: [{ column: "user_id", direction: "asc" }],
    },
  },
];


export const hints = [
  {
    code: "SOCIAL_001",
    hints: [
      { hint_order: 1, content: "Count all rows in the users table." },
      { hint_order: 2, content: "Use the COUNT aggregate function." },
      { hint_order: 3, content: "Use COUNT(*) from users." },
    ],
  },
  {
    code: "SOCIAL_002",
    hints: [
      { hint_order: 1, content: "Filter users by verification status." },
      { hint_order: 2, content: "Use the is_verified boolean column." },
      { hint_order: 3, content: "Use COUNT(*) with WHERE is_verified = true." },
    ],
  },
  {
    code: "SOCIAL_003",
    hints: [
      { hint_order: 1, content: "Filter users who are active." },
      {
        hint_order: 2,
        content: "Use the is_active column in the WHERE clause.",
      },
      { hint_order: 3, content: "Order the result by id ascending." },
    ],
  },
  {
    code: "SOCIAL_004",
    hints: [
      {
        hint_order: 1,
        content: "Look for users with a specific account status.",
      },
      { hint_order: 2, content: "Use account_status = 'suspended'." },
      { hint_order: 3, content: "Order by created_at DESC, then id ASC." },
    ],
  },
  {
    code: "SOCIAL_005",
    hints: [
      {
        hint_order: 1,
        content: "Private profiles are marked with a boolean column.",
      },
      { hint_order: 2, content: "Filter where is_private is true." },
      {
        hint_order: 3,
        content:
          "Return id, username, full_name, and is_private ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_006",
    hints: [
      {
        hint_order: 1,
        content: "Latest posts depend on the creation timestamp.",
      },
      { hint_order: 2, content: "Sort posts by created_at descending." },
      {
        hint_order: 3,
        content: "Use ORDER BY created_at DESC, id DESC LIMIT 5.",
      },
    ],
  },
  {
    code: "SOCIAL_007",
    hints: [
      { hint_order: 1, content: "Filter posts by their status." },
      { hint_order: 2, content: "Use status = 'published'." },
      { hint_order: 3, content: "Order by created_at DESC, then id DESC." },
    ],
  },
  {
    code: "SOCIAL_008",
    hints: [
      {
        hint_order: 1,
        content: "Media type identifies whether a post is an image.",
      },
      { hint_order: 2, content: "Filter posts where media_type = 'image'." },
      { hint_order: 3, content: "Order image posts by id ascending." },
    ],
  },
  {
    code: "SOCIAL_009",
    hints: [
      {
        hint_order: 1,
        content: "Visible comments are controlled by the status column.",
      },
      { hint_order: 2, content: "Use status = 'visible' in comments." },
      { hint_order: 3, content: "Order by created_at DESC, then id DESC." },
    ],
  },
  {
    code: "SOCIAL_010",
    hints: [
      {
        hint_order: 1,
        content: "Unread notifications are marked by a boolean column.",
      },
      { hint_order: 2, content: "Use is_read = false." },
      { hint_order: 3, content: "Order by created_at DESC, then id DESC." },
    ],
  },
  {
    code: "SOCIAL_011",
    hints: [
      { hint_order: 1, content: "Filter users by country." },
      { hint_order: 2, content: "Use country = 'India'." },
      {
        hint_order: 3,
        content: "Return id, username, and country ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_012",
    hints: [
      { hint_order: 1, content: "Find rows where the bio value exists." },
      { hint_order: 2, content: "Use IS NOT NULL for the bio column." },
      {
        hint_order: 3,
        content: "Filter with WHERE bio IS NOT NULL and order by id.",
      },
    ],
  },
  {
    code: "SOCIAL_013",
    hints: [
      { hint_order: 1, content: "Draft posts are identified by post status." },
      { hint_order: 2, content: "Use status = 'draft'." },
      {
        hint_order: 3,
        content: "Order draft posts by created_at DESC, id DESC.",
      },
    ],
  },
  {
    code: "SOCIAL_014",
    hints: [
      {
        hint_order: 1,
        content: "Check the comments permission column on posts.",
      },
      { hint_order: 2, content: "Use allow_comments = false." },
      {
        hint_order: 3,
        content: "Return id, user_id, and allow_comments ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_015",
    hints: [
      { hint_order: 1, content: "Use the stored post counter on users." },
      { hint_order: 2, content: "Users with no posts have posts_count = 0." },
      {
        hint_order: 3,
        content: "Filter users by posts_count = 0 and order by id.",
      },
    ],
  },
  {
    code: "SOCIAL_016",
    hints: [
      { hint_order: 1, content: "Use the stored follower counter on users." },
      {
        hint_order: 2,
        content: "Find users where followers_count is greater than zero.",
      },
      { hint_order: 3, content: "Order by followers_count DESC, then id ASC." },
    ],
  },
  {
    code: "SOCIAL_017",
    hints: [
      { hint_order: 1, content: "Stories have an active flag." },
      { hint_order: 2, content: "Use is_active = true." },
      {
        hint_order: 3,
        content: "Order active stories by created_at DESC, id DESC.",
      },
    ],
  },
  {
    code: "SOCIAL_018",
    hints: [
      { hint_order: 1, content: "Unread messages have no read timestamp." },
      { hint_order: 2, content: "Use read_at IS NULL." },
      { hint_order: 3, content: "Order by sent_at DESC, then id DESC." },
    ],
  },
  {
    code: "SOCIAL_019",
    hints: [
      {
        hint_order: 1,
        content: "Failed logins are marked by the success column.",
      },
      { hint_order: 2, content: "Use success = false." },
      {
        hint_order: 3,
        content: "Order failed logins by login_at DESC, id DESC.",
      },
    ],
  },
  {
    code: "SOCIAL_020",
    hints: [
      { hint_order: 1, content: "Groups have a privacy setting." },
      { hint_order: 2, content: "Use privacy = 'public'." },
      { hint_order: 3, content: "Return id, name, and privacy ordered by id." },
    ],
  },
  {
    code: "SOCIAL_021",
    hints: [
      {
        hint_order: 1,
        content: "Find users where a profile picture value exists.",
      },
      { hint_order: 2, content: "Use profile_picture_url IS NOT NULL." },
      {
        hint_order: 3,
        content: "Return id, username, and profile_picture_url ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_022",
    hints: [
      {
        hint_order: 1,
        content: "Posts with location have a non-null location value.",
      },
      { hint_order: 2, content: "Use location IS NOT NULL." },
      {
        hint_order: 3,
        content: "Return id, user_id, and location ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_023",
    hints: [
      { hint_order: 1, content: "Archived posts are identified by status." },
      { hint_order: 2, content: "Use status = 'archived'." },
      {
        hint_order: 3,
        content: "Order archived posts by created_at DESC, id DESC.",
      },
    ],
  },
  {
    code: "SOCIAL_024",
    hints: [
      { hint_order: 1, content: "Deleted comments are identified by status." },
      { hint_order: 2, content: "Use status = 'deleted'." },
      {
        hint_order: 3,
        content: "Order deleted comments by created_at DESC, id DESC.",
      },
    ],
  },
  {
    code: "SOCIAL_025",
    hints: [
      { hint_order: 1, content: "Use the user_blocks table." },
      {
        hint_order: 2,
        content: "Each row represents blocker_id blocking blocked_id.",
      },
      {
        hint_order: 3,
        content: "Order by blocker_id ASC, then blocked_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_026",
    hints: [
      { hint_order: 1, content: "Use the signup_source column on users." },
      {
        hint_order: 2,
        content: "Filter users where signup_source = 'google'.",
      },
      {
        hint_order: 3,
        content: "Return id, username, and signup_source ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_027",
    hints: [
      {
        hint_order: 1,
        content: "Users who logged in have a last_login_at value.",
      },
      { hint_order: 2, content: "Use last_login_at IS NOT NULL." },
      { hint_order: 3, content: "Order by last_login_at DESC, then id ASC." },
    ],
  },
  {
    code: "SOCIAL_028",
    hints: [
      { hint_order: 1, content: "Video posts are identified by media type." },
      { hint_order: 2, content: "Use media_type = 'video'." },
      {
        hint_order: 3,
        content: "Return id, user_id, and media_type ordered by id.",
      },
    ],
  },
  {
    code: "SOCIAL_029",
    hints: [
      { hint_order: 1, content: "Use the group_members table." },
      { hint_order: 2, content: "Each row links a user to a group." },
      { hint_order: 3, content: "Order by group_id ASC, then user_id ASC." },
    ],
  },
  {
    code: "SOCIAL_030",
    hints: [
      { hint_order: 1, content: "Use the post_mentions table." },
      { hint_order: 2, content: "Each row links a post to a mentioned user." },
      {
        hint_order: 3,
        content: "Order by post_id ASC, then mentioned_user_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_031",
    hints: [
      { hint_order: 1, content: "Use the comment_mentions table." },
      {
        hint_order: 2,
        content: "Each row links a comment to a mentioned user.",
      },
      {
        hint_order: 3,
        content: "Order by comment_id ASC, then mentioned_user_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_032",
    hints: [
      { hint_order: 1, content: "Reports have a status column." },
      { hint_order: 2, content: "Filter reports where status = 'open'." },
      { hint_order: 3, content: "Order by created_at DESC, then id DESC." },
    ],
  },
  {
    code: "SOCIAL_033",
    hints: [
      { hint_order: 1, content: "Campaigns have a status column." },
      { hint_order: 2, content: "Filter campaigns where status = 'active'." },
      { hint_order: 3, content: "Order by start_date ASC, then id ASC." },
    ],
  },
  {
    code: "SOCIAL_034",
    hints: [
      { hint_order: 1, content: "Use promoted_posts to check ad spend." },
      {
        hint_order: 2,
        content: "Find promoted posts where spend is greater than zero.",
      },
      { hint_order: 3, content: "Order by spend DESC, then id ASC." },
    ],
  },
  {
    code: "SOCIAL_035",
    hints: [
      { hint_order: 1, content: "Use the view_count column on posts." },
      { hint_order: 2, content: "Sort posts by view_count descending." },
      {
        hint_order: 3,
        content: "Use ORDER BY view_count DESC, id ASC LIMIT 10.",
      },
    ],
  },
  {
    code: "SOCIAL_036",
    hints: [
      { hint_order: 1, content: "Group posts by their status." },
      { hint_order: 2, content: "Use COUNT(*) with GROUP BY status." },
      { hint_order: 3, content: "Order grouped results by status ascending." },
    ],
  },
  {
    code: "SOCIAL_037",
    hints: [
      { hint_order: 1, content: "Group users by country." },
      { hint_order: 2, content: "Exclude rows where country is null." },
      { hint_order: 3, content: "Order by user_count DESC, then country ASC." },
    ],
  },
  {
    code: "SOCIAL_038",
    hints: [
      { hint_order: 1, content: "Group posts by media_type." },
      { hint_order: 2, content: "Use AVG(view_count)." },
      { hint_order: 3, content: "Order the result by media_type ascending." },
    ],
  },
  {
    code: "SOCIAL_039",
    hints: [
      { hint_order: 1, content: "Use the follows table to count followers." },
      {
        hint_order: 2,
        content: "Accepted followers have status = 'accepted'.",
      },
      { hint_order: 3, content: "Group by followee_id and count rows." },
    ],
  },
  {
    code: "SOCIAL_040",
    hints: [
      { hint_order: 1, content: "Use comments to count comments per post." },
      {
        hint_order: 2,
        content: "Only include comments where status = 'visible'.",
      },
      {
        hint_order: 3,
        content:
          "Group by post_id and order by comment_count DESC, post_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_041",
    hints: [
      { hint_order: 1, content: "Use the likes table." },
      {
        hint_order: 2,
        content: "Each row represents one user liking one post.",
      },
      { hint_order: 3, content: "Group by post_id and count rows." },
    ],
  },
  {
    code: "SOCIAL_042",
    hints: [
      { hint_order: 1, content: "Count unique users for each post." },
      { hint_order: 2, content: "Use COUNT(DISTINCT user_id)." },
      {
        hint_order: 3,
        content:
          "Group by post_id and order by distinct_likers DESC, post_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_043",
    hints: [
      { hint_order: 1, content: "Use posts to count posts per author." },
      { hint_order: 2, content: "Group rows by user_id." },
      { hint_order: 3, content: "Use COUNT(*) AS post_count." },
    ],
  },
  {
    code: "SOCIAL_044",
    hints: [
      { hint_order: 1, content: "Use comments to count comments per user." },
      { hint_order: 2, content: "Group rows by user_id." },
      {
        hint_order: 3,
        content: "Order by comment_count DESC, then user_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_045",
    hints: [
      { hint_order: 1, content: "This requires filtering after aggregation." },
      {
        hint_order: 2,
        content: "Use GROUP BY post_id with HAVING COUNT(*) > 100.",
      },
      { hint_order: 3, content: "Order by like_count DESC, then post_id ASC." },
    ],
  },
  {
    code: "SOCIAL_046",
    hints: [
      { hint_order: 1, content: "Count devices per user." },
      {
        hint_order: 2,
        content: "Use GROUP BY user_id and HAVING COUNT(*) > 1.",
      },
      {
        hint_order: 3,
        content: "Order by device_count DESC, then user_id ASC.",
      },
    ],
  },
  {
    code: "SOCIAL_047",
    hints: [
      {
        hint_order: 1,
        content: "Use bookmarks to count saved posts per user.",
      },
      { hint_order: 2, content: "Group by user_id." },
      { hint_order: 3, content: "Use COUNT(*) AS bookmark_count." },
    ],
  },
  {
    code: "SOCIAL_048",
    hints: [
      { hint_order: 1, content: "Use post_shares to count shares per post." },
      { hint_order: 2, content: "Group by post_id." },
      { hint_order: 3, content: "Order by share_count DESC, post_id ASC." },
    ],
  },
  {
    code: "SOCIAL_049",
    hints: [
      { hint_order: 1, content: "Use story_views to count views per story." },
      { hint_order: 2, content: "Group by story_id." },
      { hint_order: 3, content: "Order by view_count DESC, story_id ASC." },
    ],
  },
  {
    code: "SOCIAL_050",
    hints: [
      { hint_order: 1, content: "Use messages to count messages sent." },
      { hint_order: 2, content: "Group by sender_id." },
      { hint_order: 3, content: "Order by message_count DESC, sender_id ASC." },
    ],
  },
  {
    code: "SOCIAL_051",
    hints: [
      { hint_order: 1, content: "Use follows to count accepted followers." },
      { hint_order: 2, content: "Filter status = 'accepted'." },
      { hint_order: 3, content: "Group by followee_id and count rows." },
    ],
  },
  {
    code: "SOCIAL_052",
    hints: [
      {
        hint_order: 1,
        content: "Use follows to count accepted followees per user.",
      },
      { hint_order: 2, content: "Group by follower_id." },
      { hint_order: 3, content: "Filter status = 'accepted' before grouping." },
    ],
  },
  {
    code: "SOCIAL_053",
    hints: [
      { hint_order: 1, content: "First count comments per post." },
      { hint_order: 2, content: "Use a subquery grouped by post_id." },
      {
        hint_order: 3,
        content: "Apply AVG(comment_count) over the grouped result.",
      },
    ],
  },
  {
    code: "SOCIAL_054",
    hints: [
      {
        hint_order: 1,
        content: "You need both likes and visible comments per post.",
      },
      {
        hint_order: 2,
        content: "Pre-aggregate likes and comments separately by post_id.",
      },
      {
        hint_order: 3,
        content: "Use COALESCE so missing counts are treated as zero.",
      },
    ],
  },
  {
    code: "SOCIAL_055",
    hints: [
      { hint_order: 1, content: "Use stored counters on users." },
      {
        hint_order: 2,
        content: "Compare followers_count with following_count.",
      },
      {
        hint_order: 3,
        content: "Filter where followers_count > following_count.",
      },
    ],
  },
  {
    code: "SOCIAL_056",
    hints: [
      { hint_order: 1, content: "Count posts per user." },
      {
        hint_order: 2,
        content: "Use HAVING to keep users with at least 10 posts.",
      },
      { hint_order: 3, content: "HAVING COUNT(*) >= 10." },
    ],
  },
  {
    code: "SOCIAL_057",
    hints: [
      {
        hint_order: 1,
        content: "Find posts without matching visible comments.",
      },
      { hint_order: 2, content: "Use LEFT JOIN from posts to comments." },
      {
        hint_order: 3,
        content:
          "Put c.status = 'visible' in the JOIN condition, then filter c.id IS NULL.",
      },
    ],
  },
  {
    code: "SOCIAL_058",
    hints: [
      { hint_order: 1, content: "Find users without successful login rows." },
      {
        hint_order: 2,
        content: "Use LEFT JOIN from users to successful login_history rows.",
      },
      { hint_order: 3, content: "Filter where the joined login row is null." },
    ],
  },
  {
    code: "SOCIAL_059",
    hints: [
      { hint_order: 1, content: "Count unique likers per post." },
      { hint_order: 2, content: "Use COUNT(DISTINCT user_id)." },
      { hint_order: 3, content: "Use HAVING COUNT(DISTINCT user_id) >= 3." },
    ],
  },
  {
    code: "SOCIAL_060",
    hints: [
      {
        hint_order: 1,
        content: "Count how many different posts each user commented on.",
      },
      { hint_order: 2, content: "Use COUNT(DISTINCT post_id)." },
      {
        hint_order: 3,
        content:
          "Group by user_id and use HAVING COUNT(DISTINCT post_id) >= 2.",
      },
    ],
  },
  {
    code: "SOCIAL_061",
    hints: [
      { hint_order: 1, content: "Find posts without any matching likes." },
      { hint_order: 2, content: "Use LEFT JOIN between posts and likes." },
      { hint_order: 3, content: "Filter where likes.post_id IS NULL." },
    ],
  },
  {
    code: "SOCIAL_062",
    hints: [
      { hint_order: 1, content: "Pending follows are stored in follows." },
      { hint_order: 2, content: "Filter status = 'pending'." },
      { hint_order: 3, content: "Use DISTINCT follower_id." },
    ],
  },
  {
    code: "SOCIAL_063",
    hints: [
      { hint_order: 1, content: "Blocked relationships are in follows." },
      { hint_order: 2, content: "Filter status = 'blocked'." },
      { hint_order: 3, content: "Select DISTINCT followee_id." },
    ],
  },
  {
    code: "SOCIAL_064",
    hints: [
      { hint_order: 1, content: "Use login_history table." },
      { hint_order: 2, content: "Filter only successful logins." },
      { hint_order: 3, content: "Use MAX(login_at) grouped by user_id." },
    ],
  },
  {
    code: "SOCIAL_065",
    hints: [
      { hint_order: 1, content: "Group users by signup date." },
      { hint_order: 2, content: "Use created_at::date." },
      { hint_order: 3, content: "COUNT(*) grouped by date." },
    ],
  },
  {
    code: "SOCIAL_066",
    hints: [
      { hint_order: 1, content: "Filter posts by status = 'published'." },
      { hint_order: 2, content: "Group by created_at::date." },
      { hint_order: 3, content: "COUNT(*) per date." },
    ],
  },
  {
    code: "SOCIAL_067",
    hints: [
      { hint_order: 1, content: "Use post_hashtags table." },
      { hint_order: 2, content: "Group by hashtag_id." },
      { hint_order: 3, content: "COUNT(*) gives usage count." },
    ],
  },
  {
    code: "SOCIAL_068",
    hints: [
      { hint_order: 1, content: "Use post_shares table." },
      { hint_order: 2, content: "Filter share_type = 'external'." },
      { hint_order: 3, content: "Use DISTINCT post_id." },
    ],
  },
  {
    code: "SOCIAL_069",
    hints: [
      { hint_order: 1, content: "Count distinct receivers per sender." },
      { hint_order: 2, content: "Use COUNT(DISTINCT receiver_id)." },
      { hint_order: 3, content: "HAVING COUNT(DISTINCT receiver_id) >= 2." },
    ],
  },
  {
    code: "SOCIAL_070",
    hints: [
      { hint_order: 1, content: "Group reports by reason." },
      { hint_order: 2, content: "Exclude NULL reasons." },
      { hint_order: 3, content: "COUNT(*) as report_count." },
    ],
  },
  {
    code: "SOCIAL_071",
    hints: [
      { hint_order: 1, content: "Group posts by media_type." },
      { hint_order: 2, content: "COUNT(*) per media_type." },
      { hint_order: 3, content: "Order by media_type." },
    ],
  },
  {
    code: "SOCIAL_072",
    hints: [
      { hint_order: 1, content: "Group users by signup_source." },
      { hint_order: 2, content: "Exclude NULL signup_source." },
      { hint_order: 3, content: "COUNT(*) per source." },
    ],
  },
  {
    code: "SOCIAL_073",
    hints: [
      { hint_order: 1, content: "Group notifications by type." },
      { hint_order: 2, content: "Exclude NULL types." },
      { hint_order: 3, content: "COUNT(*) per type." },
    ],
  },
  {
    code: "SOCIAL_074",
    hints: [
      { hint_order: 1, content: "Use post_views table." },
      { hint_order: 2, content: "Exclude NULL watch_seconds." },
      { hint_order: 3, content: "AVG(watch_seconds) per post." },
    ],
  },
  {
    code: "SOCIAL_075",
    hints: [
      { hint_order: 1, content: "Use promoted_posts table." },
      { hint_order: 2, content: "Group by campaign_id." },
      { hint_order: 3, content: "SUM(spend) per campaign." },
    ],
  },
  {
    code: "SOCIAL_076",
    hints: [
      { hint_order: 1, content: "CTR = clicks / impressions." },
      { hint_order: 2, content: "Avoid division by zero." },
      { hint_order: 3, content: "Use clicks::numeric / impressions." },
    ],
  },
  {
    code: "SOCIAL_077",
    hints: [
      { hint_order: 1, content: "Find overall average view_count." },
      { hint_order: 2, content: "Use a subquery with AVG(view_count)." },
      { hint_order: 3, content: "Filter posts where view_count > average." },
    ],
  },
  {
    code: "SOCIAL_078",
    hints: [
      { hint_order: 1, content: "Find average followers_count." },
      { hint_order: 2, content: "Use AVG(followers_count)." },
      { hint_order: 3, content: "Filter users above average." },
    ],
  },
  {
    code: "SOCIAL_079",
    hints: [
      { hint_order: 1, content: "Engagement = likes + comments + shares." },
      { hint_order: 2, content: "Use columns from posts." },
      { hint_order: 3, content: "Sort by computed engagement DESC." },
    ],
  },
  {
    code: "SOCIAL_080",
    hints: [
      {
        hint_order: 1,
        content: "Count failed and successful logins separately.",
      },
      { hint_order: 2, content: "Use FILTER inside COUNT." },
      { hint_order: 3, content: "Compare failed > successful." },
    ],
  },
  {
    code: "SOCIAL_081",
    hints: [
      { hint_order: 1, content: "Use window functions." },
      { hint_order: 2, content: "Partition by user_id." },
      { hint_order: 3, content: "Use ROW_NUMBER() and filter <= 3." },
    ],
  },
  {
    code: "SOCIAL_082",
    hints: [
      { hint_order: 1, content: "Convert login_at to date." },
      { hint_order: 2, content: "Use ROW_NUMBER() to detect streaks." },
      {
        hint_order: 3,
        content: "Group consecutive days using difference trick.",
      },
    ],
  },
  {
    code: "SOCIAL_083",
    hints: [
      { hint_order: 1, content: "Compare each post with user's average." },
      { hint_order: 2, content: "Use a correlated subquery." },
      { hint_order: 3, content: "AVG(like_count) per user." },
    ],
  },
  {
    code: "SOCIAL_084",
    hints: [
      { hint_order: 1, content: "Join follows with users." },
      { hint_order: 2, content: "Check all followees are verified." },
      { hint_order: 3, content: "Use COUNT = COUNT FILTER." },
    ],
  },
  {
    code: "SOCIAL_085",
    hints: [
      { hint_order: 1, content: "Aggregate views per day." },
      { hint_order: 2, content: "Use LAG to compare previous day." },
      { hint_order: 3, content: "Find increasing streaks." },
    ],
  },
  {
    code: "SOCIAL_086",
    hints: [
      { hint_order: 1, content: "Compute engagement per user." },
      { hint_order: 2, content: "Join with users for country." },
      { hint_order: 3, content: "Use ROW_NUMBER partitioned by country." },
    ],
  },
  {
    code: "SOCIAL_087",
    hints: [
      { hint_order: 1, content: "Aggregate followers per month." },
      { hint_order: 2, content: "Use LAG to compare months." },
      { hint_order: 3, content: "Find consecutive growth streaks." },
    ],
  },
  {
    code: "SOCIAL_088",
    hints: [
      { hint_order: 1, content: "Count comments per user per post." },
      { hint_order: 2, content: "Use GROUP BY post_id, user_id." },
      { hint_order: 3, content: "Use ROW_NUMBER to pick top commenter." },
    ],
  },
  {
    code: "SOCIAL_089",
    hints: [
      { hint_order: 1, content: "Check users with no activity." },
      { hint_order: 2, content: "LEFT JOIN posts, comments, likes." },
      { hint_order: 3, content: "Filter where all joins are NULL." },
    ],
  },
  {
    code: "SOCIAL_090",
    hints: [
      { hint_order: 1, content: "Find reciprocal follows." },
      { hint_order: 2, content: "Self join follows table." },
      { hint_order: 3, content: "Match follower_id ↔ followee_id." },
    ],
  },
  {
    code: "SOCIAL_091",
    hints: [
      { hint_order: 1, content: "Compare engagement within media type." },
      { hint_order: 2, content: "Use correlated AVG." },
      { hint_order: 3, content: "Filter where engagement > avg." },
    ],
  },
  {
    code: "SOCIAL_092",
    hints: [
      { hint_order: 1, content: "Check distinct language_code per user." },
      { hint_order: 2, content: "Use COUNT(DISTINCT language_code)." },
      { hint_order: 3, content: "HAVING >= 2." },
    ],
  },
  {
    code: "SOCIAL_093",
    hints: [
      { hint_order: 1, content: "Rank posts per user." },
      { hint_order: 2, content: "Use ROW_NUMBER()." },
      { hint_order: 3, content: "Filter where rn = 2." },
    ],
  },
  {
    code: "SOCIAL_094",
    hints: [
      { hint_order: 1, content: "Join posts with post_hashtags." },
      { hint_order: 2, content: "Count usage per media_type and hashtag." },
      { hint_order: 3, content: "Pick top using ROW_NUMBER." },
    ],
  },
  {
    code: "SOCIAL_095",
    hints: [
      { hint_order: 1, content: "Count likes received via posts." },
      { hint_order: 2, content: "Count likes given from likes table." },
      { hint_order: 3, content: "Compare received > given." },
    ],
  },
  {
    code: "SOCIAL_096",
    hints: [
      { hint_order: 1, content: "Consider only published posts." },
      { hint_order: 2, content: "Check allow_comments column." },
      { hint_order: 3, content: "Ensure all posts allow comments." },
    ],
  },
  {
    code: "SOCIAL_097",
    hints: [
      { hint_order: 1, content: "Aggregate daily views per post." },
      { hint_order: 2, content: "Find peak daily views." },
      { hint_order: 3, content: "Compare later days against half peak." },
    ],
  },
  {
    code: "SOCIAL_098",
    hints: [
      { hint_order: 1, content: "Join posts with comments." },
      { hint_order: 2, content: "Match user_id in both tables." },
      { hint_order: 3, content: "Filter where author commented on own post." },
    ],
  },
  {
    code: "SOCIAL_099",
    hints: [
      { hint_order: 1, content: "Convert sent_at to date." },
      { hint_order: 2, content: "Use ROW_NUMBER to detect sequences." },
      { hint_order: 3, content: "Find streaks of at least 3 days." },
    ],
  },
  {
    code: "SOCIAL_100",
    hints: [
      { hint_order: 1, content: "Compute follower count per user." },
      { hint_order: 2, content: "Compute followers' follower counts." },
      { hint_order: 3, content: "Compare user count > average of followers." },
    ],
  }
];

export const conceptFilters = [
  { code: "SOCIAL_001", concepts: ["aggregation", "count"] },
  {
    code: "SOCIAL_002",
    concepts: ["filtering", "aggregation", "count", "comparison"],
  },
  { code: "SOCIAL_003", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_004", concepts: ["filtering", "sorting", "comparison"] },
  { code: "SOCIAL_005", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_006", concepts: ["sorting", "limit"] },
  { code: "SOCIAL_007", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_008", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_009", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_010", concepts: ["filtering", "sorting"] },

  { code: "SOCIAL_011", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_012", concepts: ["filtering", "null_handling", "sorting"] },
  { code: "SOCIAL_013", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_014", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_015", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_016", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_017", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_018", concepts: ["filtering", "null_handling", "sorting"] },
  { code: "SOCIAL_019", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_020", concepts: ["filtering", "comparison", "sorting"] },

  { code: "SOCIAL_021", concepts: ["filtering", "null_handling", "sorting"] },
  { code: "SOCIAL_022", concepts: ["filtering", "null_handling", "sorting"] },
  { code: "SOCIAL_023", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_024", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_025", concepts: ["sorting"] },
  { code: "SOCIAL_026", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_027", concepts: ["filtering", "null_handling", "sorting"] },
  { code: "SOCIAL_028", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_029", concepts: ["sorting"] },
  { code: "SOCIAL_030", concepts: ["sorting"] },

  { code: "SOCIAL_031", concepts: ["sorting"] },
  { code: "SOCIAL_032", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_033", concepts: ["filtering", "sorting"] },
  { code: "SOCIAL_034", concepts: ["filtering", "comparison", "sorting"] },
  { code: "SOCIAL_035", concepts: ["sorting", "limit"] },

  {
    code: "SOCIAL_036",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_037",
    concepts: ["group_by", "aggregation", "count", "filtering", "sorting"],
  },
  {
    code: "SOCIAL_038",
    concepts: ["group_by", "aggregation", "average", "sorting"],
  },
  {
    code: "SOCIAL_039",
    concepts: ["group_by", "aggregation", "count", "filtering", "sorting"],
  },
  {
    code: "SOCIAL_040",
    concepts: ["group_by", "aggregation", "count", "filtering", "sorting"],
  },

  {
    code: "SOCIAL_041",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_042",
    concepts: ["group_by", "aggregation", "count_distinct", "sorting"],
  },
  {
    code: "SOCIAL_043",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_044",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_045",
    concepts: ["group_by", "aggregation", "count", "having", "comparison"],
  },
  {
    code: "SOCIAL_046",
    concepts: ["group_by", "aggregation", "count", "having"],
  },
  {
    code: "SOCIAL_047",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_048",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_049",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },
  {
    code: "SOCIAL_050",
    concepts: ["group_by", "aggregation", "count", "sorting"],
  },

  {
    code: "SOCIAL_051",
    concepts: ["group_by", "aggregation", "count", "filtering"],
  },
  {
    code: "SOCIAL_052",
    concepts: ["group_by", "aggregation", "count", "filtering"],
  },
  {
    code: "SOCIAL_053",
    concepts: ["subquery", "aggregation", "average", "group_by"],
  },
  {
    code: "SOCIAL_054",
    concepts: [
      "joins",
      "aggregation",
      "group_by",
      "comparison",
      "null_handling",
    ],
  },
  { code: "SOCIAL_055", concepts: ["filtering", "comparison"] },
  {
    code: "SOCIAL_056",
    concepts: ["group_by", "aggregation", "count", "having"],
  },
  { code: "SOCIAL_057", concepts: ["left_join", "null_handling", "anti_join"] },
  { code: "SOCIAL_058", concepts: ["left_join", "null_handling", "anti_join"] },
  {
    code: "SOCIAL_059",
    concepts: ["group_by", "aggregation", "count_distinct", "having"],
  },
  {
    code: "SOCIAL_060",
    concepts: ["group_by", "aggregation", "count_distinct", "having"],
  },

  { code: "SOCIAL_061", concepts: ["left_join", "null_handling", "anti_join"] },
  { code: "SOCIAL_062", concepts: ["filtering", "distinct", "sorting"] },
  { code: "SOCIAL_063", concepts: ["filtering", "distinct", "sorting"] },
  { code: "SOCIAL_064", concepts: ["group_by", "aggregation", "max"] },
  {
    code: "SOCIAL_065",
    concepts: ["group_by", "aggregation", "count", "date_functions"],
  },
  {
    code: "SOCIAL_066",
    concepts: ["group_by", "aggregation", "count", "date_functions"],
  },
  { code: "SOCIAL_067", concepts: ["group_by", "aggregation", "count"] },
  { code: "SOCIAL_068", concepts: ["filtering", "distinct"] },
  {
    code: "SOCIAL_069",
    concepts: ["group_by", "aggregation", "count_distinct", "having"],
  },
  {
    code: "SOCIAL_070",
    concepts: ["group_by", "aggregation", "count", "filtering"],
  },

  { code: "SOCIAL_071", concepts: ["group_by", "aggregation", "count"] },
  {
    code: "SOCIAL_072",
    concepts: ["group_by", "aggregation", "count", "filtering"],
  },
  {
    code: "SOCIAL_073",
    concepts: ["group_by", "aggregation", "count", "filtering"],
  },
  {
    code: "SOCIAL_074",
    concepts: ["group_by", "aggregation", "average", "filtering"],
  },
  { code: "SOCIAL_075", concepts: ["group_by", "aggregation", "sum"] },
  { code: "SOCIAL_076", concepts: ["calculation", "filtering", "comparison"] },
  {
    code: "SOCIAL_077",
    concepts: ["subquery", "aggregation", "average", "comparison"],
  },
  {
    code: "SOCIAL_078",
    concepts: ["subquery", "aggregation", "average", "comparison"],
  },
  { code: "SOCIAL_079", concepts: ["calculation", "sorting"] },
  {
    code: "SOCIAL_080",
    concepts: ["group_by", "aggregation", "conditional_aggregation", "having"],
  },

  {
    code: "SOCIAL_081",
    concepts: ["window_functions", "row_number", "partition_by"],
  },
  {
    code: "SOCIAL_082",
    concepts: [
      "window_functions",
      "row_number",
      "trend_analysis",
      "date_functions",
    ],
  },
  {
    code: "SOCIAL_083",
    concepts: ["subquery", "aggregation", "average", "comparison"],
  },
  {
    code: "SOCIAL_084",
    concepts: ["joins", "aggregation", "conditional_aggregation"],
  },
  {
    code: "SOCIAL_085",
    concepts: ["window_functions", "lag", "trend_analysis"],
  },
  {
    code: "SOCIAL_086",
    concepts: ["joins", "aggregation", "window_functions", "row_number"],
  },
  {
    code: "SOCIAL_087",
    concepts: ["window_functions", "lag", "trend_analysis", "date_functions"],
  },
  {
    code: "SOCIAL_088",
    concepts: ["group_by", "aggregation", "window_functions", "row_number"],
  },
  { code: "SOCIAL_089", concepts: ["left_join", "anti_join", "null_handling"] },
  { code: "SOCIAL_090", concepts: ["self_join", "joins", "filtering"] },

  { code: "SOCIAL_091", concepts: ["subquery", "aggregation", "comparison"] },
  {
    code: "SOCIAL_092",
    concepts: ["group_by", "aggregation", "count_distinct", "having"],
  },
  {
    code: "SOCIAL_093",
    concepts: ["window_functions", "row_number", "partition_by"],
  },
  {
    code: "SOCIAL_094",
    concepts: [
      "joins",
      "group_by",
      "aggregation",
      "window_functions",
      "row_number",
    ],
  },
  { code: "SOCIAL_095", concepts: ["joins", "aggregation", "comparison"] },
  {
    code: "SOCIAL_096",
    concepts: ["group_by", "aggregation", "conditional_aggregation"],
  },
  {
    code: "SOCIAL_097",
    concepts: ["cte", "aggregation", "date_functions", "comparison"],
  },
  { code: "SOCIAL_098", concepts: ["joins", "filtering", "comparison"] },
  {
    code: "SOCIAL_099",
    concepts: [
      "window_functions",
      "row_number",
      "trend_analysis",
      "date_functions",
    ],
  },
  {
    code: "SOCIAL_100",
    concepts: ["joins", "aggregation", "average", "comparison"],
  },
];

export const solutions = [
  {
    code: "SOCIAL_001",
    approaches: [
      {
        approach_title: "COUNT rows",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT COUNT(*) AS count FROM users;",
        explanation:
          "## Approach\n\nCount all rows in `users`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one platform user.\n- `COUNT(*)` returns the total number of rows.\n- The alias `count` matches the expected output column.\n\n## Why this is optimal\n\nThis is the simplest and clearest way to count all users.",
      },
      {
        approach_title: "COUNT ids",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(id) AS count FROM users;",
        explanation:
          "## Approach\n\nCount user ids instead of all rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM users;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is the primary key, it is never NULL.\n- Therefore, this returns the same result as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for total row count.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH user_count AS (SELECT COUNT(*) AS count FROM users) SELECT count FROM user_count;",
        explanation:
          "## Approach\n\nCalculate the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH user_count AS (\n  SELECT COUNT(*) AS count\n  FROM users\n)\nSELECT count\nFROM user_count;\n```\n\n## Explanation\n\n- The CTE computes the total user count once.\n- The outer query returns that computed value.\n- The output column remains `count`.\n\n## Difference from the optimal approach\n\nMore verbose, but useful when the count needs to feed later query steps.",
      },
    ],
  },
  {
    code: "SOCIAL_002",
    approaches: [
      {
        approach_title: "Filter count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query: "SELECT COUNT(*) AS count FROM users WHERE is_verified = true;",
        explanation:
          "## Approach\n\nKeep only verified users, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM users\nWHERE is_verified = true;\n```\n\n## Explanation\n\n- `is_verified = true` filters to verified accounts only.\n- `COUNT(*)` counts the filtered rows.\n- The alias `count` matches the expected output column.\n\n## Why this is optimal\n\nIt is explicit, simple, and directly matches the question.",
      },
      {
        approach_title: "Boolean short",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query: "SELECT COUNT(*) AS count FROM users WHERE is_verified;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM users\nWHERE is_verified;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_verified` means the value must be true.\n- It filters to the same verified users as `is_verified = true`.\n- `COUNT(*)` then counts those rows.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for beginners.",
      },
      {
        approach_title: "FILTER count",
        approach_type: "aggregation",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT COUNT(*) FILTER (WHERE is_verified = true) AS count FROM users;",
        explanation:
          "## Approach\n\nApply the verified condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_verified = true) AS count\nFROM users;\n```\n\n## Explanation\n\n- `FILTER` makes `COUNT(*)` include only verified users.\n- This returns the same single count as filtering with `WHERE`.\n- This style is useful when calculating multiple conditional counts in one query.\n\n## Difference from the optimal approach\n\nValid, but less direct for one simple count.",
      },
    ],
  },
  {
    code: "SOCIAL_003",
    approaches: [
      {
        approach_title: "Filter active",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, email, full_name FROM users WHERE is_active = true ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter active users and order them by user id.\n\n## Query\n\n```sql\nSELECT id, username, email, full_name\nFROM users\nWHERE is_active = true\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `is_active = true` keeps only active users.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` guarantees deterministic output.\n\n## Why this is optimal\n\nIt directly applies the required filter and ordering.",
      },
      {
        approach_title: "Boolean short",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, username, email, full_name FROM users WHERE is_active ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse the boolean column directly in the `WHERE` clause.\n\n## Query\n\n```sql\nSELECT id, username, email, full_name\nFROM users\nWHERE is_active\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active` keeps rows where `is_active` is true.\n- It returns the same active users as `is_active = true`.\n- The selected columns and ordering remain unchanged.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for learners.",
      },
      {
        approach_title: "CTE active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_users AS (SELECT id, username, email, full_name FROM users WHERE is_active = true) SELECT id, username, email, full_name FROM active_users ORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore active users in a CTE, then return them in order.\n\n## Query\n\n```sql\nWITH active_users AS (\n  SELECT id, username, email, full_name\n  FROM users\n  WHERE is_active = true\n)\nSELECT id, username, email, full_name\nFROM active_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the active-user filter.\n- The outer query applies the required ordering.\n- The output columns remain exactly the same.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed for this simple filter.",
      },
    ],
  },
  {
    code: "SOCIAL_004",
    approaches: [
      {
        approach_title: "Filter status",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, email, account_status, created_at FROM users WHERE account_status = 'suspended' ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter suspended users and order newest suspended accounts first.\n\n## Query\n\n```sql\nSELECT id, username, email, account_status, created_at\nFROM users\nWHERE account_status = 'suspended'\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `account_status = 'suspended'` keeps only suspended accounts.\n- The selected columns match the expected output.\n- `created_at DESC` sorts newest rows first.\n- `id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nIt directly matches the filter and sort rules.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, username, email, account_status, created_at FROM users WHERE account_status IN ('suspended') ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with one allowed status value.\n\n## Query\n\n```sql\nSELECT id, username, email, account_status, created_at\nFROM users\nWHERE account_status IN ('suspended')\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- `IN ('suspended')` is equivalent to `account_status = 'suspended'` here.\n- It still returns only suspended users.\n- The ordering remains exactly the same.\n\n## Difference from the optimal approach\n\nCorrect, but equality is cleaner for one value.",
      },
      {
        approach_title: "CTE status",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH suspended_users AS (SELECT id, username, email, account_status, created_at FROM users WHERE account_status = 'suspended') SELECT id, username, email, account_status, created_at FROM suspended_users ORDER BY created_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter suspended users in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH suspended_users AS (\n  SELECT id, username, email, account_status, created_at\n  FROM users\n  WHERE account_status = 'suspended'\n)\nSELECT id, username, email, account_status, created_at\nFROM suspended_users\nORDER BY created_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE creates a named set of suspended users.\n- The outer query returns that set in the expected order.\n- The output remains identical to the direct filter query.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend later.",
      },
    ],
  },
  {
    code: "SOCIAL_005",
    approaches: [
      {
        approach_title: "Filter private",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, full_name, is_private FROM users WHERE is_private = true ORDER BY id ASC;",
        explanation:
          "## Approach\n\nKeep users whose profile privacy flag is true.\n\n## Query\n\n```sql\nSELECT id, username, full_name, is_private\nFROM users\nWHERE is_private = true\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `is_private = true` filters to private profiles.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` gives stable ordering.\n\n## Why this is optimal\n\nIt is direct, readable, and matches the expected query.",
      },
      {
        approach_title: "Boolean short",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, username, full_name, is_private FROM users WHERE is_private ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL boolean shorthand for private profiles.\n\n## Query\n\n```sql\nSELECT id, username, full_name, is_private\nFROM users\nWHERE is_private\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_private` keeps rows where `is_private` is true.\n- It returns the same rows as `is_private = true`.\n- The output columns and ordering remain unchanged.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for beginners.",
      },
      {
        approach_title: "CTE private",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH private_users AS (SELECT id, username, full_name, is_private FROM users WHERE is_private = true) SELECT id, username, full_name, is_private FROM private_users ORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore private users in a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH private_users AS (\n  SELECT id, username, full_name, is_private\n  FROM users\n  WHERE is_private = true\n)\nSELECT id, username, full_name, is_private\nFROM private_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the privacy filter.\n- The outer query applies the final ordering.\n- The result matches the expected rows and columns.\n\n## Difference from the optimal approach\n\nLonger, but useful if more logic is added later.",
      },
    ],
  },
  {
    code: "SOCIAL_006",
    approaches: [
      {
        approach_title: "Sort limit",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, content, media_type, created_at FROM posts ORDER BY created_at DESC, id DESC LIMIT 5;",
        explanation:
          "## Approach\n\nSort posts by creation time and keep the first 5 rows.\n\n## Query\n\n```sql\nSELECT id, user_id, content, media_type, created_at\nFROM posts\nORDER BY created_at DESC, id DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `created_at DESC` puts newest posts first.\n- `id DESC` is a deterministic tie-breaker.\n- `LIMIT 5` returns only the 5 most recent posts.\n- The selected columns match the expected output.\n\n## Why this is optimal\n\nThis is the standard top-N query pattern.",
      },
      {
        approach_title: "Subquery top",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, content, media_type, created_at FROM (SELECT id, user_id, content, media_type, created_at FROM posts ORDER BY created_at DESC, id DESC LIMIT 5) p ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFind the latest 5 posts in a subquery, then return them in the same order.\n\n## Query\n\n```sql\nSELECT id, user_id, content, media_type, created_at\nFROM (\n  SELECT id, user_id, content, media_type, created_at\n  FROM posts\n  ORDER BY created_at DESC, id DESC\n  LIMIT 5\n) p\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The inner query applies the same ordering and limit.\n- The outer query preserves the expected final order.\n- The result is the same as the direct top-N query.\n\n## Difference from the optimal approach\n\nCorrect, but adds an unnecessary layer.",
      },
      {
        approach_title: "Rank top",
        approach_type: "window",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, user_id, content, media_type, created_at FROM (SELECT id, user_id, content, media_type, created_at, ROW_NUMBER() OVER (ORDER BY created_at DESC, id DESC) AS rn FROM posts) ranked WHERE rn <= 5 ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nAssign row numbers by recency and keep rows ranked 1 through 5.\n\n## Query\n\n```sql\nSELECT id, user_id, content, media_type, created_at\nFROM (\n  SELECT id, user_id, content, media_type, created_at,\n         ROW_NUMBER() OVER (ORDER BY created_at DESC, id DESC) AS rn\n  FROM posts\n) ranked\nWHERE rn <= 5\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` ranks posts from newest to oldest.\n- `rn <= 5` keeps the first five ranked posts.\n- The final `ORDER BY` matches the expected output order.\n\n## Difference from the optimal approach\n\nUseful for advanced ranking logic, but unnecessary for a simple top 5.",
      },
    ],
  },
  {
    code: "SOCIAL_007",
    approaches: [
      {
        approach_title: "Filter publish",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status = 'published' ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter posts to published rows and sort newest first.\n\n## Query\n\n```sql\nSELECT id, user_id, content, visibility, status, created_at\nFROM posts\nWHERE status = 'published'\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `status = 'published'` keeps only published posts.\n- The selected columns match the expected output.\n- `created_at DESC` lists newest posts first.\n- `id DESC` gives deterministic ordering when timestamps tie.\n\n## Why this is optimal\n\nIt directly matches the business rule and expected ordering.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status IN ('published') ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse `IN` with a single status value.\n\n## Query\n\n```sql\nSELECT id, user_id, content, visibility, status, created_at\nFROM posts\nWHERE status IN ('published')\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `IN ('published')` returns the same rows as equality here.\n- It still filters to published posts only.\n- The required ordering is unchanged.\n\n## Difference from the optimal approach\n\nWorks the same, but equality is simpler for one value.",
      },
      {
        approach_title: "CTE publish",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH published_posts AS (SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status = 'published') SELECT id, user_id, content, visibility, status, created_at FROM published_posts ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nPut published posts into a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH published_posts AS (\n  SELECT id, user_id, content, visibility, status, created_at\n  FROM posts\n  WHERE status = 'published'\n)\nSELECT id, user_id, content, visibility, status, created_at\nFROM published_posts\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE isolates the published-post filter.\n- The outer query applies the final sorting.\n- This returns the same rows and columns as the expected query.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed.",
      },
    ],
  },
  {
    code: "SOCIAL_008",
    approaches: [
      {
        approach_title: "Filter image",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type = 'image' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter posts to image media type and order by id.\n\n## Query\n\n```sql\nSELECT id, user_id, media_url, media_type, created_at\nFROM posts\nWHERE media_type = 'image'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `media_type = 'image'` keeps image posts only.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` gives stable ordering.\n\n## Why this is optimal\n\nIt is the clearest way to filter one media type.",
      },
      {
        approach_title: "IN type",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type IN ('image') ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with one media type.\n\n## Query\n\n```sql\nSELECT id, user_id, media_url, media_type, created_at\nFROM posts\nWHERE media_type IN ('image')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('image')` is equivalent to `media_type = 'image'` here.\n- It returns the same image posts.\n- The final ordering remains by id ascending.\n\n## Difference from the optimal approach\n\nCorrect, but equality is more direct for one value.",
      },
      {
        approach_title: "CTE image",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH image_posts AS (SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type = 'image') SELECT id, user_id, media_url, media_type, created_at FROM image_posts ORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore image posts in a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH image_posts AS (\n  SELECT id, user_id, media_url, media_type, created_at\n  FROM posts\n  WHERE media_type = 'image'\n)\nSELECT id, user_id, media_url, media_type, created_at\nFROM image_posts\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the image-post filter.\n- The outer query handles the final ordering.\n- The output matches the expected result.\n\n## Difference from the optimal approach\n\nUseful for extension, but longer for a simple filter.",
      },
    ],
  },
  {
    code: "SOCIAL_009",
    approaches: [
      {
        approach_title: "Filter visible",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status = 'visible' ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter comments to visible rows and sort newest first.\n\n## Query\n\n```sql\nSELECT id, post_id, user_id, comment_text, created_at\nFROM comments\nWHERE status = 'visible'\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `status = 'visible'` keeps only visible comments.\n- The selected columns match the expected output.\n- `created_at DESC` puts newest visible comments first.\n- `id DESC` breaks timestamp ties consistently.\n\n## Why this is optimal\n\nIt directly applies the required moderation-status filter and sort order.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status IN ('visible') ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse `IN` with one comment status.\n\n## Query\n\n```sql\nSELECT id, post_id, user_id, comment_text, created_at\nFROM comments\nWHERE status IN ('visible')\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `IN ('visible')` gives the same result as `status = 'visible'`.\n- It still returns only visible comments.\n- The output order remains unchanged.\n\n## Difference from the optimal approach\n\nValid, but equality is clearer for one status.",
      },
      {
        approach_title: "CTE visible",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH visible_comments AS (SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status = 'visible') SELECT id, post_id, user_id, comment_text, created_at FROM visible_comments ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nStore visible comments in a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH visible_comments AS (\n  SELECT id, post_id, user_id, comment_text, created_at\n  FROM comments\n  WHERE status = 'visible'\n)\nSELECT id, post_id, user_id, comment_text, created_at\nFROM visible_comments\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE isolates visible comments.\n- The outer query applies the final ordering.\n- The result matches the expected query exactly.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend later.",
      },
    ],
  },
  {
    code: "SOCIAL_010",
    approaches: [
      {
        approach_title: "Filter unread",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE is_read = false ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter unread notifications and sort newest first.\n\n## Query\n\n```sql\nSELECT id, user_id, actor_id, notification_type, created_at\nFROM notifications\nWHERE is_read = false\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `is_read = false` keeps unread notifications only.\n- `notification_type` identifies the notification category.\n- `created_at DESC, id DESC` matches the required deterministic ordering.",
      },
      {
        approach_title: "NOT read",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE NOT is_read ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse boolean negation to find unread notifications.\n\n## Query\n\n```sql\nSELECT id, user_id, actor_id, notification_type, created_at\nFROM notifications\nWHERE NOT is_read\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `NOT is_read` is equivalent to `is_read = false` for boolean values.\n- The selected columns and ordering match the expected result.",
      },
      {
        approach_title: "CTE unread",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH unread_notifications AS (SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE is_read = false) SELECT id, user_id, actor_id, notification_type, created_at FROM unread_notifications ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nStore unread notifications in a CTE, then return them ordered by newest first.\n\n## Query\n\n```sql\nWITH unread_notifications AS (\n  SELECT id, user_id, actor_id, notification_type, created_at\n  FROM notifications\n  WHERE is_read = false\n)\nSELECT id, user_id, actor_id, notification_type, created_at\nFROM unread_notifications\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE isolates unread notification rows.\n- The outer query applies the expected ordering.\n- The output columns match the corrected question object.",
      },
    ],
  },
  {
    code: "SOCIAL_011",
    approaches: [
      {
        approach_title: "Filter country",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, country FROM users WHERE country = 'India' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users whose country is India.\n\n## Query\n\n```sql\nSELECT id, username, country\nFROM users\nWHERE country = 'India'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `country = 'India'` keeps only users from India.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` makes the result deterministic.\n\n## Why this is optimal\n\nIt directly matches the required filter and ordering.",
      },
      {
        approach_title: "IN country",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, username, country FROM users WHERE country IN ('India') ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with one country value.\n\n## Query\n\n```sql\nSELECT id, username, country\nFROM users\nWHERE country IN ('India')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('India')` returns the same rows as `country = 'India'`.\n- The output columns and ordering remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but equality is simpler for one value.",
      },
      {
        approach_title: "CTE country",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH india_users AS (SELECT id, username, country FROM users WHERE country = 'India') SELECT id, username, country FROM india_users ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut India users into a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH india_users AS (\n  SELECT id, username, country\n  FROM users\n  WHERE country = 'India'\n)\nSELECT id, username, country\nFROM india_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the country filter.\n- The outer query applies the required ordering.\n- The final output still matches the expected columns and rows.",
      },
    ],
  },
  {
    code: "SOCIAL_012",
    approaches: [
      {
        approach_title: "Bio exists",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, bio FROM users WHERE bio IS NOT NULL ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users whose `bio` value is not NULL.\n\n## Query\n\n```sql\nSELECT id, username, bio\nFROM users\nWHERE bio IS NOT NULL\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `bio IS NOT NULL` keeps users who have a bio value.\n- This does not add any extra condition beyond the question.\n- `ORDER BY id ASC` matches the expected deterministic order.\n\n## Why this is optimal\n\nIt exactly matches the expected query logic.",
      },
      {
        approach_title: "CTE bio",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH users_with_bio AS (SELECT id, username, bio FROM users WHERE bio IS NOT NULL) SELECT id, username, bio FROM users_with_bio ORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore users with non-null bios in a CTE, then order the result.\n\n## Query\n\n```sql\nWITH users_with_bio AS (\n  SELECT id, username, bio\n  FROM users\n  WHERE bio IS NOT NULL\n)\nSELECT id, username, bio\nFROM users_with_bio\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE uses the exact same `bio IS NOT NULL` filter.\n- The outer query returns the same columns.\n- The final ordering remains `id ASC`.",
      },
    ],
  },
  {
    code: "SOCIAL_013",
    approaches: [
      {
        approach_title: "Filter draft",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, status, created_at FROM posts WHERE status = 'draft' ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter posts whose status is draft.\n\n## Query\n\n```sql\nSELECT id, user_id, status, created_at\nFROM posts\nWHERE status = 'draft'\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `status = 'draft'` keeps only draft posts.\n- The selected columns match the expected output.\n- `created_at DESC, id DESC` matches the required order.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, status, created_at FROM posts WHERE status IN ('draft') ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse `IN` with the draft status.\n\n## Query\n\n```sql\nSELECT id, user_id, status, created_at\nFROM posts\nWHERE status IN ('draft')\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `IN ('draft')` returns the same rows as `status = 'draft'`.\n- The result columns and ordering are unchanged.\n\n## Difference from the optimal approach\n\nCorrect, but equality is clearer for one status.",
      },
      {
        approach_title: "CTE draft",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH draft_posts AS (SELECT id, user_id, status, created_at FROM posts WHERE status = 'draft') SELECT id, user_id, status, created_at FROM draft_posts ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse a CTE for draft posts, then return them in the expected order.\n\n## Query\n\n```sql\nWITH draft_posts AS (\n  SELECT id, user_id, status, created_at\n  FROM posts\n  WHERE status = 'draft'\n)\nSELECT id, user_id, status, created_at\nFROM draft_posts\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE applies the same draft filter.\n- The outer query preserves the exact required ordering.\n- The output matches the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_014",
    approaches: [
      {
        approach_title: "Comments off",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, allow_comments FROM posts WHERE allow_comments = false ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter posts where comments are disabled.\n\n## Query\n\n```sql\nSELECT id, user_id, allow_comments\nFROM posts\nWHERE allow_comments = false\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `allow_comments = false` returns posts where comments are not allowed.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` makes the result deterministic.",
      },
      {
        approach_title: "NOT flag",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, allow_comments FROM posts WHERE NOT allow_comments ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse boolean negation to find posts where comments are not allowed.\n\n## Query\n\n```sql\nSELECT id, user_id, allow_comments\nFROM posts\nWHERE NOT allow_comments\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `NOT allow_comments` is equivalent to `allow_comments = false` for boolean values.\n- The output columns and ordering remain the same.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer.",
      },
      {
        approach_title: "CTE disabled",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH disabled_posts AS (SELECT id, user_id, allow_comments FROM posts WHERE allow_comments = false) SELECT id, user_id, allow_comments FROM disabled_posts ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse a CTE to isolate posts with comments disabled.\n\n## Query\n\n```sql\nWITH disabled_posts AS (\n  SELECT id, user_id, allow_comments\n  FROM posts\n  WHERE allow_comments = false\n)\nSELECT id, user_id, allow_comments\nFROM disabled_posts\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE uses the same boolean filter.\n- The outer query applies the expected ordering.\n- The result matches the expected output.",
      },
    ],
  },
  {
    code: "SOCIAL_015",
    approaches: [
      {
        approach_title: "Zero posts",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, posts_count FROM users WHERE posts_count = 0 ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse the stored `posts_count` column to find users with no posts.\n\n## Query\n\n```sql\nSELECT id, username, posts_count\nFROM users\nWHERE posts_count = 0\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The question expects the stored counter from `users`.\n- `posts_count = 0` keeps users who have not created posts.\n- The selected columns and ordering match the expected query exactly.",
      },
      {
        approach_title: "CTE zero",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH no_post_users AS (SELECT id, username, posts_count FROM users WHERE posts_count = 0) SELECT id, username, posts_count FROM no_post_users ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut users with zero stored posts into a CTE, then return them by id.\n\n## Query\n\n```sql\nWITH no_post_users AS (\n  SELECT id, username, posts_count\n  FROM users\n  WHERE posts_count = 0\n)\nSELECT id, username, posts_count\nFROM no_post_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE uses the exact same `posts_count = 0` logic.\n- The outer query returns the same expected columns.\n- The final order is still `id ASC`.",
      },
    ],
  },
  {
    code: "SOCIAL_016",
    approaches: [
      {
        approach_title: "Has followers",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, followers_count FROM users WHERE followers_count > 0 ORDER BY followers_count DESC, id ASC;",
        explanation:
          "## Approach\n\nUse the stored `followers_count` column to find users with at least one follower.\n\n## Query\n\n```sql\nSELECT id, username, followers_count\nFROM users\nWHERE followers_count > 0\nORDER BY followers_count DESC, id ASC;\n```\n\n## Explanation\n\n- `followers_count > 0` keeps users with one or more followers.\n- `followers_count DESC` orders users with more followers first.\n- `id ASC` is the deterministic tie-breaker.",
      },
      {
        approach_title: "CTE followers",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH followed_users AS (SELECT id, username, followers_count FROM users WHERE followers_count > 0) SELECT id, username, followers_count FROM followed_users ORDER BY followers_count DESC, id ASC;",
        explanation:
          "## Approach\n\nStore users with followers in a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH followed_users AS (\n  SELECT id, username, followers_count\n  FROM users\n  WHERE followers_count > 0\n)\nSELECT id, username, followers_count\nFROM followed_users\nORDER BY followers_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE keeps the exact same filter.\n- The outer query applies the exact same ordering.\n- This produces the same grader-safe result.",
      },
    ],
  },
  {
    code: "SOCIAL_017",
    approaches: [
      {
        approach_title: "Not expired",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, expires_at, created_at FROM stories WHERE expires_at > NOW() ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nTreat currently active stories as stories whose expiry timestamp is still in the future.\n\n## Query\n\n```sql\nSELECT id, user_id, expires_at, created_at\nFROM stories\nWHERE expires_at > NOW()\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `expires_at > NOW()` keeps stories that have not expired yet.\n- `created_at DESC` returns newest active stories first.\n- `id DESC` gives deterministic ordering for timestamp ties.\n- The output columns match the corrected question object.",
      },
      {
        approach_title: "CTE active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH active_stories AS (SELECT id, user_id, expires_at, created_at FROM stories WHERE expires_at > NOW()) SELECT id, user_id, expires_at, created_at FROM active_stories ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nPut non-expired stories into a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH active_stories AS (\n  SELECT id, user_id, expires_at, created_at\n  FROM stories\n  WHERE expires_at > NOW()\n)\nSELECT id, user_id, expires_at, created_at\nFROM active_stories\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE applies the same active-story filter.\n- The outer query preserves the required ordering.\n- The result matches the corrected expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_018",
    approaches: [
      {
        approach_title: "Unread messages",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, sender_id, receiver_id, sent_at FROM messages WHERE read_at IS NULL ORDER BY sent_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFind messages where the read timestamp is missing.\n\n## Query\n\n```sql\nSELECT id, sender_id, receiver_id, sent_at\nFROM messages\nWHERE read_at IS NULL\nORDER BY sent_at DESC, id DESC;\n```\n\n## Explanation\n\n- `read_at IS NULL` means the message has not been read yet.\n- `sent_at DESC` shows newest unread messages first.\n- `id DESC` breaks ties for messages sent at the same time.",
      },
      {
        approach_title: "CTE unread",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH unread_messages AS (SELECT id, sender_id, receiver_id, sent_at FROM messages WHERE read_at IS NULL) SELECT id, sender_id, receiver_id, sent_at FROM unread_messages ORDER BY sent_at DESC, id DESC;",
        explanation:
          "## Approach\n\nStore unread messages in a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH unread_messages AS (\n  SELECT id, sender_id, receiver_id, sent_at\n  FROM messages\n  WHERE read_at IS NULL\n)\nSELECT id, sender_id, receiver_id, sent_at\nFROM unread_messages\nORDER BY sent_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE uses the exact same `read_at IS NULL` filter.\n- The outer query applies `sent_at DESC, id DESC`.\n- The result matches the expected output.",
      },
    ],
  },
  {
    code: "SOCIAL_019",
    approaches: [
      {
        approach_title: "Failed logins",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, login_at, success FROM login_history WHERE success = false ORDER BY login_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter login history to unsuccessful attempts.\n\n## Query\n\n```sql\nSELECT id, user_id, login_at, success\nFROM login_history\nWHERE success = false\nORDER BY login_at DESC, id DESC;\n```\n\n## Explanation\n\n- `success = false` keeps failed login attempts.\n- `login_at DESC` returns latest failed attempts first.\n- `id DESC` gives deterministic ordering when timestamps tie.",
      },
      {
        approach_title: "NOT success",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, login_at, success FROM login_history WHERE NOT success ORDER BY login_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse boolean negation to find failed login attempts.\n\n## Query\n\n```sql\nSELECT id, user_id, login_at, success\nFROM login_history\nWHERE NOT success\nORDER BY login_at DESC, id DESC;\n```\n\n## Explanation\n\n- `NOT success` is equivalent to `success = false` for boolean values.\n- The output rows, columns, and order match the expected result.\n\n## Difference from the optimal approach\n\nShorter, but explicit comparison is easier for learners.",
      },
      {
        approach_title: "CTE failed",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH failed_logins AS (SELECT id, user_id, login_at, success FROM login_history WHERE success = false) SELECT id, user_id, login_at, success FROM failed_logins ORDER BY login_at DESC, id DESC;",
        explanation:
          "## Approach\n\nStore failed login attempts in a CTE, then return them newest first.\n\n## Query\n\n```sql\nWITH failed_logins AS (\n  SELECT id, user_id, login_at, success\n  FROM login_history\n  WHERE success = false\n)\nSELECT id, user_id, login_at, success\nFROM failed_logins\nORDER BY login_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE keeps only unsuccessful login attempts.\n- The outer query applies the expected ordering.\n- The result is equivalent to the direct filter query.",
      },
    ],
  },
  {
    code: "SOCIAL_020",
    approaches: [
      {
        approach_title: "Public groups",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, name, privacy FROM groups WHERE privacy = 'public' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter groups whose privacy value is public.\n\n## Query\n\n```sql\nSELECT id, name, privacy\nFROM groups\nWHERE privacy = 'public'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `privacy = 'public'` keeps only public groups.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` gives deterministic output.",
      },
      {
        approach_title: "IN privacy",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, name, privacy FROM groups WHERE privacy IN ('public') ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with one privacy value.\n\n## Query\n\n```sql\nSELECT id, name, privacy\nFROM groups\nWHERE privacy IN ('public')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('public')` returns the same rows as `privacy = 'public'`.\n- The selected columns and ordering remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but equality is more direct for one value.",
      },
      {
        approach_title: "CTE public",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH public_groups AS (SELECT id, name, privacy FROM groups WHERE privacy = 'public') SELECT id, name, privacy FROM public_groups ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut public groups into a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH public_groups AS (\n  SELECT id, name, privacy\n  FROM groups\n  WHERE privacy = 'public'\n)\nSELECT id, name, privacy\nFROM public_groups\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE applies the exact same privacy filter.\n- The outer query returns the same columns in the same order.\n- This is grader-safe, but longer than the direct query.",
      },
    ],
  },
  {
    code: "SOCIAL_021",
    approaches: [
      {
        approach_title: "Picture exists",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, profile_picture_url FROM users WHERE profile_picture_url IS NOT NULL ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users whose profile picture URL is present.\n\n## Query\n\n```sql\nSELECT id, username, profile_picture_url\nFROM users\nWHERE profile_picture_url IS NOT NULL\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `profile_picture_url IS NOT NULL` keeps users who have a profile picture value.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` makes the result deterministic.",
      },
      {
        approach_title: "CTE picture",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH users_with_pictures AS (SELECT id, username, profile_picture_url FROM users WHERE profile_picture_url IS NOT NULL) SELECT id, username, profile_picture_url FROM users_with_pictures ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut users with profile pictures into a CTE, then order the result.\n\n## Query\n\n```sql\nWITH users_with_pictures AS (\n  SELECT id, username, profile_picture_url\n  FROM users\n  WHERE profile_picture_url IS NOT NULL\n)\nSELECT id, username, profile_picture_url\nFROM users_with_pictures\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same `IS NOT NULL` filter.\n- The outer query returns the expected columns.\n- The final ordering remains `id ASC`.",
      },
    ],
  },
  {
    code: "SOCIAL_022",
    approaches: [
      {
        approach_title: "Location exists",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, location FROM posts WHERE location IS NOT NULL ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter posts where the location value is present.\n\n## Query\n\n```sql\nSELECT id, user_id, location\nFROM posts\nWHERE location IS NOT NULL\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `location IS NOT NULL` keeps posts with a location specified.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` gives deterministic output.",
      },
      {
        approach_title: "CTE location",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH located_posts AS (SELECT id, user_id, location FROM posts WHERE location IS NOT NULL) SELECT id, user_id, location FROM located_posts ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut posts with a location into a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH located_posts AS (\n  SELECT id, user_id, location\n  FROM posts\n  WHERE location IS NOT NULL\n)\nSELECT id, user_id, location\nFROM located_posts\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE uses the exact same location filter.\n- The outer query applies the required ordering.\n- The output remains identical to the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_023",
    approaches: [
      {
        approach_title: "Filter archived",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, status, created_at FROM posts WHERE status = 'archived' ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter posts whose status is archived.\n\n## Query\n\n```sql\nSELECT id, user_id, status, created_at\nFROM posts\nWHERE status = 'archived'\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `status = 'archived'` keeps only archived posts.\n- The selected columns match the expected output.\n- `created_at DESC, id DESC` matches the required deterministic order.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, status, created_at FROM posts WHERE status IN ('archived') ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse `IN` with one status value.\n\n## Query\n\n```sql\nSELECT id, user_id, status, created_at\nFROM posts\nWHERE status IN ('archived')\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `IN ('archived')` returns the same rows as `status = 'archived'`.\n- The selected columns and ordering remain the same.\n- This is grader-safe, though equality is simpler.",
      },
      {
        approach_title: "CTE archived",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH archived_posts AS (SELECT id, user_id, status, created_at FROM posts WHERE status = 'archived') SELECT id, user_id, status, created_at FROM archived_posts ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nStore archived posts in a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH archived_posts AS (\n  SELECT id, user_id, status, created_at\n  FROM posts\n  WHERE status = 'archived'\n)\nSELECT id, user_id, status, created_at\nFROM archived_posts\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE applies the same archived-status filter.\n- The outer query applies the expected sorting.\n- The rows and columns match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_024",
    approaches: [
      {
        approach_title: "Filter deleted",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, post_id, user_id, status, created_at FROM comments WHERE status = 'deleted' ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter comments whose status is deleted.\n\n## Query\n\n```sql\nSELECT id, post_id, user_id, status, created_at\nFROM comments\nWHERE status = 'deleted'\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `status = 'deleted'` keeps only deleted comments.\n- The selected columns match the expected output exactly.\n- `created_at DESC, id DESC` returns the newest deleted comments first with a stable tie-breaker.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, post_id, user_id, status, created_at FROM comments WHERE status IN ('deleted') ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse `IN` with the deleted status.\n\n## Query\n\n```sql\nSELECT id, post_id, user_id, status, created_at\nFROM comments\nWHERE status IN ('deleted')\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `IN ('deleted')` is equivalent to `status = 'deleted'` here.\n- The output rows, columns, and ordering remain unchanged.",
      },
      {
        approach_title: "CTE deleted",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH deleted_comments AS (SELECT id, post_id, user_id, status, created_at FROM comments WHERE status = 'deleted') SELECT id, post_id, user_id, status, created_at FROM deleted_comments ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nPut deleted comments into a CTE, then order them newest first.\n\n## Query\n\n```sql\nWITH deleted_comments AS (\n  SELECT id, post_id, user_id, status, created_at\n  FROM comments\n  WHERE status = 'deleted'\n)\nSELECT id, post_id, user_id, status, created_at\nFROM deleted_comments\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE keeps only deleted comments.\n- The outer query preserves the exact expected order.\n- This returns the same result as the direct query.",
      },
    ],
  },
  {
    code: "SOCIAL_025",
    approaches: [
      {
        approach_title: "List blocks",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT blocker_id, blocked_id FROM user_blocks ORDER BY blocker_id ASC, blocked_id ASC;",
        explanation:
          "## Approach\n\nRead all block relationships and order them by blocker and blocked user.\n\n## Query\n\n```sql\nSELECT blocker_id, blocked_id\nFROM user_blocks\nORDER BY blocker_id ASC, blocked_id ASC;\n```\n\n## Explanation\n\n- `blocker_id` is the user who created the block.\n- `blocked_id` is the user being blocked.\n- The selected columns match the expected output.\n- Ordering by both columns makes the result deterministic.",
      },
      {
        approach_title: "CTE blocks",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH blocks AS (SELECT blocker_id, blocked_id FROM user_blocks) SELECT blocker_id, blocked_id FROM blocks ORDER BY blocker_id ASC, blocked_id ASC;",
        explanation:
          "## Approach\n\nPut block relationships into a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH blocks AS (\n  SELECT blocker_id, blocked_id\n  FROM user_blocks\n)\nSELECT blocker_id, blocked_id\nFROM blocks\nORDER BY blocker_id ASC, blocked_id ASC;\n```\n\n## Explanation\n\n- The CTE contains the same two columns from `user_blocks`.\n- The outer query applies the expected ordering.\n- The result is identical to selecting directly from the table.",
      },
    ],
  },
  {
    code: "SOCIAL_026",
    approaches: [
      {
        approach_title: "Filter source",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, signup_source FROM users WHERE signup_source = 'google' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter users whose signup source is Google.\n\n## Query\n\n```sql\nSELECT id, username, signup_source\nFROM users\nWHERE signup_source = 'google'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `signup_source = 'google'` keeps users who signed up via Google.\n- The selected columns match the expected output exactly.\n- `ORDER BY id ASC` gives deterministic output.",
      },
      {
        approach_title: "IN source",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, username, signup_source FROM users WHERE signup_source IN ('google') ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with one signup source.\n\n## Query\n\n```sql\nSELECT id, username, signup_source\nFROM users\nWHERE signup_source IN ('google')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('google')` returns the same rows as `signup_source = 'google'`.\n- The selected columns and ordering remain unchanged.",
      },
      {
        approach_title: "CTE source",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH google_users AS (SELECT id, username, signup_source FROM users WHERE signup_source = 'google') SELECT id, username, signup_source FROM google_users ORDER BY id ASC;",
        explanation:
          "## Approach\n\nStore Google signup users in a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH google_users AS (\n  SELECT id, username, signup_source\n  FROM users\n  WHERE signup_source = 'google'\n)\nSELECT id, username, signup_source\nFROM google_users\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE uses the same signup-source filter.\n- The outer query returns the same columns.\n- The final ordering remains `id ASC`.",
      },
    ],
  },
  {
    code: "SOCIAL_027",
    approaches: [
      {
        approach_title: "Login exists",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, last_login_at FROM users WHERE last_login_at IS NOT NULL ORDER BY last_login_at DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter users whose last login timestamp is present.\n\n## Query\n\n```sql\nSELECT id, username, last_login_at\nFROM users\nWHERE last_login_at IS NOT NULL\nORDER BY last_login_at DESC, id ASC;\n```\n\n## Explanation\n\n- `last_login_at IS NOT NULL` keeps users who have logged in at least once.\n- `last_login_at DESC` puts most recently logged-in users first.\n- `id ASC` provides deterministic ordering for ties.",
      },
      {
        approach_title: "CTE login",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH logged_in_users AS (SELECT id, username, last_login_at FROM users WHERE last_login_at IS NOT NULL) SELECT id, username, last_login_at FROM logged_in_users ORDER BY last_login_at DESC, id ASC;",
        explanation:
          "## Approach\n\nPut users with a last login into a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH logged_in_users AS (\n  SELECT id, username, last_login_at\n  FROM users\n  WHERE last_login_at IS NOT NULL\n)\nSELECT id, username, last_login_at\nFROM logged_in_users\nORDER BY last_login_at DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE applies the exact same `IS NOT NULL` filter.\n- The outer query applies the required sorting.\n- This matches the expected result exactly.",
      },
    ],
  },
  {
    code: "SOCIAL_028",
    approaches: [
      {
        approach_title: "Filter video",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, media_type FROM posts WHERE media_type = 'video' ORDER BY id ASC;",
        explanation:
          "## Approach\n\nFilter posts whose media type is video.\n\n## Query\n\n```sql\nSELECT id, user_id, media_type\nFROM posts\nWHERE media_type = 'video'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `media_type = 'video'` keeps video posts only.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` gives stable ordering.",
      },
      {
        approach_title: "IN type",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, media_type FROM posts WHERE media_type IN ('video') ORDER BY id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with one media type.\n\n## Query\n\n```sql\nSELECT id, user_id, media_type\nFROM posts\nWHERE media_type IN ('video')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('video')` returns the same rows as `media_type = 'video'`.\n- The final output remains ordered by `id ASC`.",
      },
      {
        approach_title: "CTE video",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH video_posts AS (SELECT id, user_id, media_type FROM posts WHERE media_type = 'video') SELECT id, user_id, media_type FROM video_posts ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPut video posts into a CTE, then return them ordered by id.\n\n## Query\n\n```sql\nWITH video_posts AS (\n  SELECT id, user_id, media_type\n  FROM posts\n  WHERE media_type = 'video'\n)\nSELECT id, user_id, media_type\nFROM video_posts\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same video-media filter.\n- The outer query returns the expected columns.\n- The result is identical to the direct filter query.",
      },
    ],
  },
  {
    code: "SOCIAL_029",
    approaches: [
      {
        approach_title: "List members",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT group_id, user_id, role FROM group_members ORDER BY group_id ASC, user_id ASC;",
        explanation:
          "## Approach\n\nList all group member rows in the required order.\n\n## Query\n\n```sql\nSELECT group_id, user_id, role\nFROM group_members\nORDER BY group_id ASC, user_id ASC;\n```\n\n## Explanation\n\n- `group_id` identifies the group.\n- `user_id` identifies the member.\n- `role` shows the member's role in the group.\n- Ordering by `group_id ASC, user_id ASC` matches the expected output.",
      },
      {
        approach_title: "CTE members",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH members AS (SELECT group_id, user_id, role FROM group_members) SELECT group_id, user_id, role FROM members ORDER BY group_id ASC, user_id ASC;",
        explanation:
          "## Approach\n\nPut group member rows into a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH members AS (\n  SELECT group_id, user_id, role\n  FROM group_members\n)\nSELECT group_id, user_id, role\nFROM members\nORDER BY group_id ASC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE selects the same rows and columns from `group_members`.\n- The outer query applies the exact required ordering.\n- This is grader-safe but more verbose.",
      },
    ],
  },
  {
    code: "SOCIAL_030",
    approaches: [
      {
        approach_title: "List mentions",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, mentioned_user_id FROM post_mentions ORDER BY post_id ASC, mentioned_user_id ASC;",
        explanation:
          "## Approach\n\nList all post mention rows in the required order.\n\n## Query\n\n```sql\nSELECT post_id, mentioned_user_id\nFROM post_mentions\nORDER BY post_id ASC, mentioned_user_id ASC;\n```\n\n## Explanation\n\n- `post_id` identifies the post containing the mention.\n- `mentioned_user_id` identifies the user mentioned in that post.\n- The selected columns match the expected output exactly.\n- The two-column ordering makes the result deterministic.",
      },
      {
        approach_title: "CTE mentions",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH mentions AS (SELECT post_id, mentioned_user_id FROM post_mentions) SELECT post_id, mentioned_user_id FROM mentions ORDER BY post_id ASC, mentioned_user_id ASC;",
        explanation:
          "## Approach\n\nPut post mention rows into a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH mentions AS (\n  SELECT post_id, mentioned_user_id\n  FROM post_mentions\n)\nSELECT post_id, mentioned_user_id\nFROM mentions\nORDER BY post_id ASC, mentioned_user_id ASC;\n```\n\n## Explanation\n\n- The CTE selects the same rows from `post_mentions`.\n- The outer query applies the same expected ordering.\n- The output is identical to the direct query.",
      },
    ],
  },
  {
    code: "SOCIAL_031",
    approaches: [
      {
        approach_title: "List mentions",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT comment_id, mentioned_user_id FROM comment_mentions ORDER BY comment_id ASC, mentioned_user_id ASC;",
        explanation:
          "## Approach\n\nList all comment mention rows in the required order.\n\n## Query\n\n```sql\nSELECT comment_id, mentioned_user_id\nFROM comment_mentions\nORDER BY comment_id ASC, mentioned_user_id ASC;\n```\n\n## Explanation\n\n- `comment_id` identifies the comment containing the mention.\n- `mentioned_user_id` identifies the user mentioned in that comment.\n- The selected columns match the expected output exactly.\n- The two-column ordering makes the result deterministic.",
      },
      {
        approach_title: "CTE mentions",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH mentions AS (SELECT comment_id, mentioned_user_id FROM comment_mentions) SELECT comment_id, mentioned_user_id FROM mentions ORDER BY comment_id ASC, mentioned_user_id ASC;",
        explanation:
          "## Approach\n\nPut comment mention rows into a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH mentions AS (\n  SELECT comment_id, mentioned_user_id\n  FROM comment_mentions\n)\nSELECT comment_id, mentioned_user_id\nFROM mentions\nORDER BY comment_id ASC, mentioned_user_id ASC;\n```\n\n## Explanation\n\n- The CTE selects the same rows and columns from `comment_mentions`.\n- The outer query applies the expected ordering.\n- The result is identical to the direct query.",
      },
    ],
  },
  {
    code: "SOCIAL_032",
    approaches: [
      {
        approach_title: "Filter open",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status = 'open' ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nFilter reports whose status is open, then sort newest first.\n\n## Query\n\n```sql\nSELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at\nFROM reports\nWHERE status = 'open'\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `status = 'open'` keeps only currently open reports.\n- The selected columns match the expected output exactly.\n- `created_at DESC` returns newest open reports first.\n- `id DESC` is the deterministic tie-breaker.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status IN ('open') ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nUse `IN` with one report status.\n\n## Query\n\n```sql\nSELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at\nFROM reports\nWHERE status IN ('open')\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- `IN ('open')` returns the same rows as `status = 'open'`.\n- The output columns and ordering remain unchanged.\n- This is grader-safe, though equality is simpler for one value.",
      },
      {
        approach_title: "CTE open",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH open_reports AS (SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status = 'open') SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM open_reports ORDER BY created_at DESC, id DESC;",
        explanation:
          "## Approach\n\nStore open reports in a CTE, then return them newest first.\n\n## Query\n\n```sql\nWITH open_reports AS (\n  SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at\n  FROM reports\n  WHERE status = 'open'\n)\nSELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at\nFROM open_reports\nORDER BY created_at DESC, id DESC;\n```\n\n## Explanation\n\n- The CTE applies the same open-status filter.\n- The outer query preserves the exact expected order.\n- The result matches the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_033",
    approaches: [
      {
        approach_title: "Filter active",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status = 'active' ORDER BY start_date ASC, id ASC;",
        explanation:
          "## Approach\n\nFilter ad campaigns whose status is active.\n\n## Query\n\n```sql\nSELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date\nFROM ad_campaigns\nWHERE status = 'active'\nORDER BY start_date ASC, id ASC;\n```\n\n## Explanation\n\n- `status = 'active'` keeps only active campaigns.\n- The selected columns match the expected output.\n- `start_date ASC` orders campaigns by earliest start date first.\n- `id ASC` breaks ties deterministically.",
      },
      {
        approach_title: "IN status",
        approach_type: "filtering",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status IN ('active') ORDER BY start_date ASC, id ASC;",
        explanation:
          "## Approach\n\nUse `IN` with the active campaign status.\n\n## Query\n\n```sql\nSELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date\nFROM ad_campaigns\nWHERE status IN ('active')\nORDER BY start_date ASC, id ASC;\n```\n\n## Explanation\n\n- `IN ('active')` is equivalent to `status = 'active'` here.\n- It returns the same active campaigns.\n- The selected columns and ordering remain unchanged.",
      },
      {
        approach_title: "CTE active",
        approach_type: "cte",
        is_optimal: false,
        display_order: 3,
        query:
          "WITH active_campaigns AS (SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status = 'active') SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM active_campaigns ORDER BY start_date ASC, id ASC;",
        explanation:
          "## Approach\n\nPut active campaigns into a CTE, then return them in the expected order.\n\n## Query\n\n```sql\nWITH active_campaigns AS (\n  SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date\n  FROM ad_campaigns\n  WHERE status = 'active'\n)\nSELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date\nFROM active_campaigns\nORDER BY start_date ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE uses the same active-status filter.\n- The outer query applies the exact expected ordering.\n- The output is identical to the direct filter query.",
      },
    ],
  },
  {
    code: "SOCIAL_034",
    approaches: [
      {
        approach_title: "Filter spend",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, campaign_id, post_id, spend FROM promoted_posts WHERE spend > 0 ORDER BY spend DESC, id ASC;",
        explanation:
          "## Approach\n\nFilter promoted posts where spend is greater than zero.\n\n## Query\n\n```sql\nSELECT id, campaign_id, post_id, spend\nFROM promoted_posts\nWHERE spend > 0\nORDER BY spend DESC, id ASC;\n```\n\n## Explanation\n\n- `spend > 0` keeps promoted posts with actual spend.\n- The selected columns match the expected output.\n- `spend DESC` sorts highest spend first.\n- `id ASC` gives deterministic ordering for equal spend values.",
      },
      {
        approach_title: "CTE spend",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH spent_posts AS (SELECT id, campaign_id, post_id, spend FROM promoted_posts WHERE spend > 0) SELECT id, campaign_id, post_id, spend FROM spent_posts ORDER BY spend DESC, id ASC;",
        explanation:
          "## Approach\n\nPut promoted posts with spend into a CTE, then sort them.\n\n## Query\n\n```sql\nWITH spent_posts AS (\n  SELECT id, campaign_id, post_id, spend\n  FROM promoted_posts\n  WHERE spend > 0\n)\nSELECT id, campaign_id, post_id, spend\nFROM spent_posts\nORDER BY spend DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE applies the exact same `spend > 0` filter.\n- The outer query applies the expected ordering.\n- This returns the same rows, columns, and order.",
      },
    ],
  },
  {
    code: "SOCIAL_035",
    approaches: [
      {
        approach_title: "Sort limit",
        approach_type: "sorting",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, view_count FROM posts ORDER BY view_count DESC, id ASC LIMIT 10;",
        explanation:
          "## Approach\n\nSort posts by view count and keep the top 10 rows.\n\n## Query\n\n```sql\nSELECT id, user_id, view_count\nFROM posts\nORDER BY view_count DESC, id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `view_count DESC` puts the most viewed posts first.\n- `id ASC` breaks ties when posts have the same view count.\n- `LIMIT 10` returns only the top 10 rows.\n- The selected columns match the expected output.",
      },
      {
        approach_title: "Rank top",
        approach_type: "window",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id, view_count FROM (SELECT id, user_id, view_count, ROW_NUMBER() OVER (ORDER BY view_count DESC, id ASC) AS rn FROM posts) ranked WHERE rn <= 10 ORDER BY view_count DESC, id ASC;",
        explanation:
          "## Approach\n\nRank posts by view count, then keep rows ranked 1 through 10.\n\n## Query\n\n```sql\nSELECT id, user_id, view_count\nFROM (\n  SELECT id, user_id, view_count,\n         ROW_NUMBER() OVER (ORDER BY view_count DESC, id ASC) AS rn\n  FROM posts\n) ranked\nWHERE rn <= 10\nORDER BY view_count DESC, id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` assigns a rank after sorting by views.\n- `rn <= 10` keeps the same top 10 rows.\n- The final ordering matches the expected query.\n- This is useful for learning ranking, but `LIMIT` is simpler here.",
      },
      {
        approach_title: "Subquery top",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 3,
        query:
          "SELECT id, user_id, view_count FROM (SELECT id, user_id, view_count FROM posts ORDER BY view_count DESC, id ASC LIMIT 10) p ORDER BY view_count DESC, id ASC;",
        explanation:
          "## Approach\n\nSelect the top 10 posts in a subquery, then preserve the same order outside.\n\n## Query\n\n```sql\nSELECT id, user_id, view_count\nFROM (\n  SELECT id, user_id, view_count\n  FROM posts\n  ORDER BY view_count DESC, id ASC\n  LIMIT 10\n) p\nORDER BY view_count DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query applies the expected sorting and limit.\n- The outer query keeps the same final order.\n- The result matches the direct `ORDER BY + LIMIT` query.",
      },
    ],
  },
  {
    code: "SOCIAL_036",
    approaches: [
      {
        approach_title: "Group status",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT status, COUNT(*) AS post_count FROM posts GROUP BY status ORDER BY status ASC;",
        explanation:
          "## Approach\n\nGroup posts by status and count rows in each group.\n\n## Query\n\n```sql\nSELECT status, COUNT(*) AS post_count\nFROM posts\nGROUP BY status\nORDER BY status ASC;\n```\n\n## Explanation\n\n- `GROUP BY status` creates one group per post status.\n- `COUNT(*)` counts posts in each status group.\n- The alias `post_count` matches the expected output column.\n- `ORDER BY status ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH status_counts AS (SELECT status, COUNT(*) AS post_count FROM posts GROUP BY status) SELECT status, post_count FROM status_counts ORDER BY status ASC;",
        explanation:
          "## Approach\n\nCompute post counts by status in a CTE, then order the result.\n\n## Query\n\n```sql\nWITH status_counts AS (\n  SELECT status, COUNT(*) AS post_count\n  FROM posts\n  GROUP BY status\n)\nSELECT status, post_count\nFROM status_counts\nORDER BY status ASC;\n```\n\n## Explanation\n\n- The CTE creates the same grouped result as the direct query.\n- The outer query applies the expected ordering.\n- This is grader-safe, but longer than needed.",
      },
    ],
  },
  {
    code: "SOCIAL_037",
    approaches: [
      {
        approach_title: "Group country",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT country, COUNT(*) AS user_count FROM users WHERE country IS NOT NULL GROUP BY country ORDER BY user_count DESC, country ASC;",
        explanation:
          "## Approach\n\nExclude missing countries, then count users per country.\n\n## Query\n\n```sql\nSELECT country, COUNT(*) AS user_count\nFROM users\nWHERE country IS NOT NULL\nGROUP BY country\nORDER BY user_count DESC, country ASC;\n```\n\n## Explanation\n\n- `country IS NOT NULL` excludes users with no country value.\n- `GROUP BY country` creates one row per country.\n- `COUNT(*) AS user_count` counts users in each country.\n- `user_count DESC, country ASC` matches the expected deterministic ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH country_counts AS (SELECT country, COUNT(*) AS user_count FROM users WHERE country IS NOT NULL GROUP BY country) SELECT country, user_count FROM country_counts ORDER BY user_count DESC, country ASC;",
        explanation:
          "## Approach\n\nCompute country counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH country_counts AS (\n  SELECT country, COUNT(*) AS user_count\n  FROM users\n  WHERE country IS NOT NULL\n  GROUP BY country\n)\nSELECT country, user_count\nFROM country_counts\nORDER BY user_count DESC, country ASC;\n```\n\n## Explanation\n\n- The CTE uses the same filter and grouping.\n- The outer query applies the same expected ordering.\n- The result is identical to the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_038",
    approaches: [
      {
        approach_title: "Average views",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT media_type, AVG(view_count) AS avg_view_count FROM posts GROUP BY media_type ORDER BY media_type ASC;",
        explanation:
          "## Approach\n\nGroup posts by media type and calculate average view count.\n\n## Query\n\n```sql\nSELECT media_type, AVG(view_count) AS avg_view_count\nFROM posts\nGROUP BY media_type\nORDER BY media_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY media_type` creates one group per media type.\n- `AVG(view_count)` calculates the average views in each group.\n- The alias `avg_view_count` matches the expected output.\n- `ORDER BY media_type ASC` matches the expected order.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH media_averages AS (SELECT media_type, AVG(view_count) AS avg_view_count FROM posts GROUP BY media_type) SELECT media_type, avg_view_count FROM media_averages ORDER BY media_type ASC;",
        explanation:
          "## Approach\n\nCalculate media-type averages in a CTE, then order them.\n\n## Query\n\n```sql\nWITH media_averages AS (\n  SELECT media_type, AVG(view_count) AS avg_view_count\n  FROM posts\n  GROUP BY media_type\n)\nSELECT media_type, avg_view_count\nFROM media_averages\nORDER BY media_type ASC;\n```\n\n## Explanation\n\n- The CTE produces the same grouped average result.\n- The outer query preserves the expected output columns and order.\n- This is useful when the average result needs to be reused.",
      },
    ],
  },
  {
    code: "SOCIAL_039",
    approaches: [
      {
        approach_title: "Count followers",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id ORDER BY follower_count DESC, followee_id ASC;",
        explanation:
          "## Approach\n\nCount accepted follow rows for each followed user.\n\n## Query\n\n```sql\nSELECT followee_id, COUNT(*) AS follower_count\nFROM follows\nWHERE status = 'accepted'\nGROUP BY followee_id\nORDER BY follower_count DESC, followee_id ASC;\n```\n\n## Explanation\n\n- `status = 'accepted'` keeps only accepted follow relationships.\n- `followee_id` is the user being followed.\n- `GROUP BY followee_id` creates one row per followed user.\n- `COUNT(*) AS follower_count` counts accepted followers.\n- The ordering matches the expected result.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH follower_counts AS (SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) SELECT followee_id, follower_count FROM follower_counts ORDER BY follower_count DESC, followee_id ASC;",
        explanation:
          "## Approach\n\nCompute accepted follower counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH follower_counts AS (\n  SELECT followee_id, COUNT(*) AS follower_count\n  FROM follows\n  WHERE status = 'accepted'\n  GROUP BY followee_id\n)\nSELECT followee_id, follower_count\nFROM follower_counts\nORDER BY follower_count DESC, followee_id ASC;\n```\n\n## Explanation\n\n- The CTE uses the same accepted-status filter and grouping.\n- The outer query applies the expected ordering.\n- The result matches the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_040",
    approaches: [
      {
        approach_title: "Count comments",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id ORDER BY comment_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCount visible comments for each post.\n\n## Query\n\n```sql\nSELECT post_id, COUNT(*) AS comment_count\nFROM comments\nWHERE status = 'visible'\nGROUP BY post_id\nORDER BY comment_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- `status = 'visible'` keeps only visible comments.\n- `GROUP BY post_id` creates one row per post.\n- `COUNT(*) AS comment_count` counts visible comments per post.\n- `comment_count DESC, post_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH comment_counts AS (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) SELECT post_id, comment_count FROM comment_counts ORDER BY comment_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCompute visible comment counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH comment_counts AS (\n  SELECT post_id, COUNT(*) AS comment_count\n  FROM comments\n  WHERE status = 'visible'\n  GROUP BY post_id\n)\nSELECT post_id, comment_count\nFROM comment_counts\nORDER BY comment_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same filter and aggregation.\n- The outer query applies the exact expected ordering.\n- The output matches the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_041",
    approaches: [
      {
        approach_title: "Count likes",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id ORDER BY like_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCount like rows for each post.\n\n## Query\n\n```sql\nSELECT post_id, COUNT(*) AS like_count\nFROM likes\nGROUP BY post_id\nORDER BY like_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY post_id` creates one group per liked post.\n- `COUNT(*) AS like_count` counts total likes in each group.\n- `like_count DESC` shows most-liked posts first.\n- `post_id ASC` gives deterministic ordering for ties.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH like_counts AS (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) SELECT post_id, like_count FROM like_counts ORDER BY like_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCompute likes per post in a CTE, then return the ordered result.\n\n## Query\n\n```sql\nWITH like_counts AS (\n  SELECT post_id, COUNT(*) AS like_count\n  FROM likes\n  GROUP BY post_id\n)\nSELECT post_id, like_count\nFROM like_counts\nORDER BY like_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- The CTE creates the same grouped result as the direct query.\n- The outer query applies the expected ordering.\n- This is grader-safe, but longer than needed.",
      },
    ],
  },
  {
    code: "SOCIAL_042",
    approaches: [
      {
        approach_title: "Count distinct",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, COUNT(DISTINCT user_id) AS distinct_likers FROM likes GROUP BY post_id ORDER BY distinct_likers DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCount unique users who liked each post.\n\n## Query\n\n```sql\nSELECT post_id, COUNT(DISTINCT user_id) AS distinct_likers\nFROM likes\nGROUP BY post_id\nORDER BY distinct_likers DESC, post_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY post_id` creates one row per post.\n- `COUNT(DISTINCT user_id)` counts each liker once per post.\n- The alias `distinct_likers` matches the expected output column.\n- The ordering matches the expected sort rules.",
      },
      {
        approach_title: "Pre-dedupe",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT post_id, COUNT(*) AS distinct_likers FROM (SELECT DISTINCT post_id, user_id FROM likes) deduped GROUP BY post_id ORDER BY distinct_likers DESC, post_id ASC;",
        explanation:
          "## Approach\n\nDeduplicate post-user like pairs first, then count the deduped rows.\n\n## Query\n\n```sql\nSELECT post_id, COUNT(*) AS distinct_likers\nFROM (\n  SELECT DISTINCT post_id, user_id\n  FROM likes\n) deduped\nGROUP BY post_id\nORDER BY distinct_likers DESC, post_id ASC;\n```\n\n## Explanation\n\n- The subquery keeps each `(post_id, user_id)` pair once.\n- The outer query counts those unique pairs per post.\n- This returns the same result as `COUNT(DISTINCT user_id)`.\n- It is useful for teaching deduplication before aggregation.",
      },
    ],
  },
  {
    code: "SOCIAL_043",
    approaches: [
      {
        approach_title: "Count posts",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id ORDER BY post_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount how many posts each user created.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS post_count\nFROM posts\nGROUP BY user_id\nORDER BY post_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `user_id` identifies the post author.\n- `GROUP BY user_id` creates one row per author.\n- `COUNT(*) AS post_count` counts posts for each user.\n- The result is ordered by highest post count first, then user id.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH post_counts AS (SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id) SELECT user_id, post_count FROM post_counts ORDER BY post_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute post counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH post_counts AS (\n  SELECT user_id, COUNT(*) AS post_count\n  FROM posts\n  GROUP BY user_id\n)\nSELECT user_id, post_count\nFROM post_counts\nORDER BY post_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE gives a name to the grouped post counts.\n- The outer query applies the same required ordering.\n- The output is identical to the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_044",
    approaches: [
      {
        approach_title: "Count comments",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) AS comment_count FROM comments GROUP BY user_id ORDER BY comment_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount how many comments each user made.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS comment_count\nFROM comments\nGROUP BY user_id\nORDER BY comment_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `user_id` identifies the comment author.\n- `GROUP BY user_id` creates one row per commenter.\n- `COUNT(*) AS comment_count` counts all comments for each user.\n- `comment_count DESC, user_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH comment_counts AS (SELECT user_id, COUNT(*) AS comment_count FROM comments GROUP BY user_id) SELECT user_id, comment_count FROM comment_counts ORDER BY comment_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute comment counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH comment_counts AS (\n  SELECT user_id, COUNT(*) AS comment_count\n  FROM comments\n  GROUP BY user_id\n)\nSELECT user_id, comment_count\nFROM comment_counts\nORDER BY comment_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE uses the same grouping and count.\n- The outer query applies the expected ordering.\n- This returns the same rows and columns as the direct query.",
      },
    ],
  },
  {
    code: "SOCIAL_045",
    approaches: [
      {
        approach_title: "Having likes",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id HAVING COUNT(*) > 100 ORDER BY like_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCount likes per post, then keep posts with more than 100 likes.\n\n## Query\n\n```sql\nSELECT post_id, COUNT(*) AS like_count\nFROM likes\nGROUP BY post_id\nHAVING COUNT(*) > 100\nORDER BY like_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY post_id` creates one row per post.\n- `COUNT(*) AS like_count` counts likes per post.\n- `HAVING COUNT(*) > 100` filters after aggregation.\n- The final order matches the expected result.",
      },
      {
        approach_title: "CTE filter",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH like_counts AS (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) SELECT post_id, like_count FROM like_counts WHERE like_count > 100 ORDER BY like_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCompute like counts first, then filter the computed count.\n\n## Query\n\n```sql\nWITH like_counts AS (\n  SELECT post_id, COUNT(*) AS like_count\n  FROM likes\n  GROUP BY post_id\n)\nSELECT post_id, like_count\nFROM like_counts\nWHERE like_count > 100\nORDER BY like_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per post with `like_count`.\n- The outer `WHERE` can safely filter `like_count` because it is already computed.\n- This returns the same result as the `HAVING` solution.",
      },
    ],
  },
  {
    code: "SOCIAL_046",
    approaches: [
      {
        approach_title: "Having devices",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) AS device_count FROM user_devices GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY device_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount registered devices per user and keep users with multiple devices.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS device_count\nFROM user_devices\nGROUP BY user_id\nHAVING COUNT(*) > 1\nORDER BY device_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per user.\n- `COUNT(*) AS device_count` counts registered devices.\n- `HAVING COUNT(*) > 1` keeps users with more than one device.\n- The output order matches the expected sort.",
      },
      {
        approach_title: "CTE filter",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH device_counts AS (SELECT user_id, COUNT(*) AS device_count FROM user_devices GROUP BY user_id) SELECT user_id, device_count FROM device_counts WHERE device_count > 1 ORDER BY device_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute device counts in a CTE, then filter users with multiple devices.\n\n## Query\n\n```sql\nWITH device_counts AS (\n  SELECT user_id, COUNT(*) AS device_count\n  FROM user_devices\n  GROUP BY user_id\n)\nSELECT user_id, device_count\nFROM device_counts\nWHERE device_count > 1\nORDER BY device_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE computes `device_count` per user.\n- The outer query filters to counts greater than 1.\n- The rows, columns, and ordering match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_047",
    approaches: [
      {
        approach_title: "Count bookmarks",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) AS bookmark_count FROM bookmarks GROUP BY user_id ORDER BY bookmark_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount bookmarked posts per user.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS bookmark_count\nFROM bookmarks\nGROUP BY user_id\nORDER BY bookmark_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per user.\n- `COUNT(*) AS bookmark_count` counts bookmark rows for each user.\n- The result is sorted by most bookmarks first, then user id.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH bookmark_counts AS (SELECT user_id, COUNT(*) AS bookmark_count FROM bookmarks GROUP BY user_id) SELECT user_id, bookmark_count FROM bookmark_counts ORDER BY bookmark_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute bookmark counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH bookmark_counts AS (\n  SELECT user_id, COUNT(*) AS bookmark_count\n  FROM bookmarks\n  GROUP BY user_id\n)\nSELECT user_id, bookmark_count\nFROM bookmark_counts\nORDER BY bookmark_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE contains the same grouped bookmark counts.\n- The outer query applies the expected ordering.\n- The result matches the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_048",
    approaches: [
      {
        approach_title: "Count shares",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, COUNT(*) AS share_count FROM post_shares GROUP BY post_id ORDER BY share_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCount share rows for each post.\n\n## Query\n\n```sql\nSELECT post_id, COUNT(*) AS share_count\nFROM post_shares\nGROUP BY post_id\nORDER BY share_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY post_id` creates one row per shared post.\n- `COUNT(*) AS share_count` counts share events per post.\n- `share_count DESC, post_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH share_counts AS (SELECT post_id, COUNT(*) AS share_count FROM post_shares GROUP BY post_id) SELECT post_id, share_count FROM share_counts ORDER BY share_count DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCompute share counts per post in a CTE, then order them.\n\n## Query\n\n```sql\nWITH share_counts AS (\n  SELECT post_id, COUNT(*) AS share_count\n  FROM post_shares\n  GROUP BY post_id\n)\nSELECT post_id, share_count\nFROM share_counts\nORDER BY share_count DESC, post_id ASC;\n```\n\n## Explanation\n\n- The CTE creates the same per-post share counts.\n- The outer query applies the exact expected ordering.\n- The result is identical to the direct aggregation.",
      },
    ],
  },
  {
    code: "SOCIAL_049",
    approaches: [
      {
        approach_title: "Count views",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT story_id, COUNT(*) AS view_count FROM story_views GROUP BY story_id ORDER BY view_count DESC, story_id ASC;",
        explanation:
          "## Approach\n\nCount story view rows for each story.\n\n## Query\n\n```sql\nSELECT story_id, COUNT(*) AS view_count\nFROM story_views\nGROUP BY story_id\nORDER BY view_count DESC, story_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY story_id` creates one row per story.\n- `COUNT(*) AS view_count` counts how many users viewed each story.\n- The final ordering matches the expected output.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH story_view_counts AS (SELECT story_id, COUNT(*) AS view_count FROM story_views GROUP BY story_id) SELECT story_id, view_count FROM story_view_counts ORDER BY view_count DESC, story_id ASC;",
        explanation:
          "## Approach\n\nCompute story view counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH story_view_counts AS (\n  SELECT story_id, COUNT(*) AS view_count\n  FROM story_views\n  GROUP BY story_id\n)\nSELECT story_id, view_count\nFROM story_view_counts\nORDER BY view_count DESC, story_id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same grouping and count.\n- The outer query applies the expected ordering.\n- This is equivalent to the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_050",
    approaches: [
      {
        approach_title: "Count messages",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT sender_id, COUNT(*) AS message_count FROM messages GROUP BY sender_id ORDER BY message_count DESC, sender_id ASC;",
        explanation:
          "## Approach\n\nCount messages sent by each user.\n\n## Query\n\n```sql\nSELECT sender_id, COUNT(*) AS message_count\nFROM messages\nGROUP BY sender_id\nORDER BY message_count DESC, sender_id ASC;\n```\n\n## Explanation\n\n- `sender_id` identifies the user who sent the message.\n- `GROUP BY sender_id` creates one row per sender.\n- `COUNT(*) AS message_count` counts sent messages.\n- The ordering matches the expected result.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH message_counts AS (SELECT sender_id, COUNT(*) AS message_count FROM messages GROUP BY sender_id) SELECT sender_id, message_count FROM message_counts ORDER BY message_count DESC, sender_id ASC;",
        explanation:
          "## Approach\n\nCompute sent-message counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH message_counts AS (\n  SELECT sender_id, COUNT(*) AS message_count\n  FROM messages\n  GROUP BY sender_id\n)\nSELECT sender_id, message_count\nFROM message_counts\nORDER BY message_count DESC, sender_id ASC;\n```\n\n## Explanation\n\n- The CTE creates the same count per sender.\n- The outer query applies the expected sorting.\n- The output matches the direct aggregation.",
      },
    ],
  },
  {
    code: "SOCIAL_051",
    approaches: [
      {
        approach_title: "Count followers",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id ORDER BY follower_count DESC, followee_id ASC;",
        explanation:
          "## Approach\n\nCount accepted follower rows for each followed user.\n\n## Query\n\n```sql\nSELECT followee_id, COUNT(*) AS follower_count\nFROM follows\nWHERE status = 'accepted'\nGROUP BY followee_id\nORDER BY follower_count DESC, followee_id ASC;\n```\n\n## Explanation\n\n- `status = 'accepted'` keeps only confirmed follow relationships.\n- `followee_id` is the user being followed.\n- `COUNT(*) AS follower_count` counts accepted followers per user.\n- The result is ordered by highest follower count first, then `followee_id`.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH follower_counts AS (SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) SELECT followee_id, follower_count FROM follower_counts ORDER BY follower_count DESC, followee_id ASC;",
        explanation:
          "## Approach\n\nCompute accepted follower counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH follower_counts AS (\n  SELECT followee_id, COUNT(*) AS follower_count\n  FROM follows\n  WHERE status = 'accepted'\n  GROUP BY followee_id\n)\nSELECT followee_id, follower_count\nFROM follower_counts\nORDER BY follower_count DESC, followee_id ASC;\n```\n\n## Explanation\n\n- The CTE uses the same filter and grouping as the expected query.\n- The outer query applies the same expected ordering.\n- The rows, columns, and ordering match the direct aggregation.",
      },
    ],
  },
  {
    code: "SOCIAL_052",
    approaches: [
      {
        approach_title: "Count following",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT follower_id, COUNT(*) AS following_count FROM follows WHERE status = 'accepted' GROUP BY follower_id ORDER BY following_count DESC, follower_id ASC;",
        explanation:
          "## Approach\n\nCount accepted follow relationships created by each user.\n\n## Query\n\n```sql\nSELECT follower_id, COUNT(*) AS following_count\nFROM follows\nWHERE status = 'accepted'\nGROUP BY follower_id\nORDER BY following_count DESC, follower_id ASC;\n```\n\n## Explanation\n\n- `status = 'accepted'` keeps only confirmed follow relationships.\n- `follower_id` is the user who follows others.\n- `COUNT(*) AS following_count` counts how many users each user follows.\n- The result is ordered by highest following count first, then `follower_id`.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH following_counts AS (SELECT follower_id, COUNT(*) AS following_count FROM follows WHERE status = 'accepted' GROUP BY follower_id) SELECT follower_id, following_count FROM following_counts ORDER BY following_count DESC, follower_id ASC;",
        explanation:
          "## Approach\n\nCompute accepted following counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH following_counts AS (\n  SELECT follower_id, COUNT(*) AS following_count\n  FROM follows\n  WHERE status = 'accepted'\n  GROUP BY follower_id\n)\nSELECT follower_id, following_count\nFROM following_counts\nORDER BY following_count DESC, follower_id ASC;\n```\n\n## Explanation\n\n- The CTE produces the same grouped result as the expected query.\n- The outer query returns the same columns.\n- The ordering remains `following_count DESC, follower_id ASC`.",
      },
    ],
  },
  {
    code: "SOCIAL_053",
    approaches: [
      {
        approach_title: "Average comments",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT AVG(comment_count) AS avg_comments FROM (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) sub;",
        explanation:
          "## Approach\n\nFirst count visible comments per post, then average those per-post counts.\n\n## Query\n\n```sql\nSELECT AVG(comment_count) AS avg_comments\nFROM (\n  SELECT post_id, COUNT(*) AS comment_count\n  FROM comments\n  WHERE status = 'visible'\n  GROUP BY post_id\n) sub;\n```\n\n## Explanation\n\n- The inner query groups visible comments by `post_id`.\n- `COUNT(*) AS comment_count` gives visible comment count per post.\n- The outer query averages those per-post counts.\n- The final output column is `avg_comments`, matching the expected result.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH comment_counts AS (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) SELECT AVG(comment_count) AS avg_comments FROM comment_counts;",
        explanation:
          "## Approach\n\nUse a CTE to calculate visible comment counts per post, then average them.\n\n## Query\n\n```sql\nWITH comment_counts AS (\n  SELECT post_id, COUNT(*) AS comment_count\n  FROM comments\n  WHERE status = 'visible'\n  GROUP BY post_id\n)\nSELECT AVG(comment_count) AS avg_comments\nFROM comment_counts;\n```\n\n## Explanation\n\n- `comment_counts` contains the same per-post counts as the expected subquery.\n- The outer query calculates `AVG(comment_count)`.\n- This returns the same single `avg_comments` value.",
      },
    ],
  },
  {
    code: "SOCIAL_054",
    approaches: [
      {
        approach_title: "Pre-aggregate",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.id AS post_id FROM posts p LEFT JOIN (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) l ON p.id = l.post_id LEFT JOIN (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) c ON p.id = c.post_id WHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0) ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nPre-aggregate likes and visible comments per post, then compare the two counts.\n\n## Query\n\n```sql\nSELECT p.id AS post_id\nFROM posts p\nLEFT JOIN (\n  SELECT post_id, COUNT(*) AS like_count\n  FROM likes\n  GROUP BY post_id\n) l ON p.id = l.post_id\nLEFT JOIN (\n  SELECT post_id, COUNT(*) AS comment_count\n  FROM comments\n  WHERE status = 'visible'\n  GROUP BY post_id\n) c ON p.id = c.post_id\nWHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0)\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- The likes subquery creates one like count per post.\n- The comments subquery creates one visible comment count per post.\n- `LEFT JOIN` keeps posts even when they have no likes or no visible comments.\n- `COALESCE(..., 0)` treats missing counts as zero.\n- The final filter keeps posts where visible comments are greater than likes.",
      },
      {
        approach_title: "CTE compare",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH like_counts AS (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id), comment_counts AS (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) SELECT p.id AS post_id FROM posts p LEFT JOIN like_counts l ON p.id = l.post_id LEFT JOIN comment_counts c ON p.id = c.post_id WHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0) ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nCompute likes and visible comments in separate CTEs, then compare them per post.\n\n## Query\n\n```sql\nWITH like_counts AS (\n  SELECT post_id, COUNT(*) AS like_count\n  FROM likes\n  GROUP BY post_id\n),\ncomment_counts AS (\n  SELECT post_id, COUNT(*) AS comment_count\n  FROM comments\n  WHERE status = 'visible'\n  GROUP BY post_id\n)\nSELECT p.id AS post_id\nFROM posts p\nLEFT JOIN like_counts l ON p.id = l.post_id\nLEFT JOIN comment_counts c ON p.id = c.post_id\nWHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0)\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- `like_counts` and `comment_counts` each produce one row per post.\n- The final query joins both aggregates back to `posts`.\n- The `COALESCE` logic and comparison are the same as the expected query.\n- This version is easier to read because each aggregate has a name.",
      },
    ],
  },
  {
    code: "SOCIAL_055",
    approaches: [
      {
        approach_title: "Compare counts",
        approach_type: "filtering",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, followers_count, following_count FROM users WHERE followers_count > following_count ORDER BY id ASC;",
        explanation:
          "## Approach\n\nCompare the stored follower and following counters on each user row.\n\n## Query\n\n```sql\nSELECT id, followers_count, following_count\nFROM users\nWHERE followers_count > following_count\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `followers_count` is the number of users following this user.\n- `following_count` is the number of users this user follows.\n- The filter keeps users with more followers than following.\n- `ORDER BY id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE compare",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH user_counts AS (SELECT id, followers_count, following_count FROM users) SELECT id, followers_count, following_count FROM user_counts WHERE followers_count > following_count ORDER BY id ASC;",
        explanation:
          "## Approach\n\nPlace the stored counters into a CTE, then compare them.\n\n## Query\n\n```sql\nWITH user_counts AS (\n  SELECT id, followers_count, following_count\n  FROM users\n)\nSELECT id, followers_count, following_count\nFROM user_counts\nWHERE followers_count > following_count\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE keeps the same columns from `users`.\n- The outer query applies the same comparison.\n- The result matches the expected query exactly.",
      },
    ],
  },
  {
    code: "SOCIAL_056",
    approaches: [
      {
        approach_title: "Having posts",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id HAVING COUNT(*) >= 10 ORDER BY post_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCount posts per user and keep users with at least 10 posts.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS post_count\nFROM posts\nGROUP BY user_id\nHAVING COUNT(*) >= 10\nORDER BY post_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per post author.\n- `COUNT(*) AS post_count` counts posts for each user.\n- `HAVING COUNT(*) >= 10` filters after aggregation.\n- The final ordering matches the expected sort.",
      },
      {
        approach_title: "CTE filter",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH post_counts AS (SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id) SELECT user_id, post_count FROM post_counts WHERE post_count >= 10 ORDER BY post_count DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute post counts first, then filter the computed count.\n\n## Query\n\n```sql\nWITH post_counts AS (\n  SELECT user_id, COUNT(*) AS post_count\n  FROM posts\n  GROUP BY user_id\n)\nSELECT user_id, post_count\nFROM post_counts\nWHERE post_count >= 10\nORDER BY post_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per user with `post_count`.\n- The outer query can use `WHERE post_count >= 10` because the count already exists.\n- This returns the same rows and order as the `HAVING` solution.",
      },
    ],
  },
  {
    code: "SOCIAL_057",
    approaches: [
      {
        approach_title: "Anti join",
        approach_type: "anti_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.id AS post_id FROM posts p LEFT JOIN comments c ON p.id = c.post_id AND c.status = 'visible' WHERE c.id IS NULL ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nUse a left anti join to find posts with no visible comments.\n\n## Query\n\n```sql\nSELECT p.id AS post_id\nFROM posts p\nLEFT JOIN comments c\n  ON p.id = c.post_id\n AND c.status = 'visible'\nWHERE c.id IS NULL\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- Start from `posts` so every post is considered.\n- The join only matches visible comments because `c.status = 'visible'` is inside the `ON` clause.\n- Posts with no visible comment have `c.id IS NULL` after the left join.\n- The output column and ordering match the expected query.",
      },
      {
        approach_title: "NOT EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id AS post_id FROM posts p WHERE NOT EXISTS (SELECT 1 FROM comments c WHERE c.post_id = p.id AND c.status = 'visible') ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nReturn posts where no matching visible comment exists.\n\n## Query\n\n```sql\nSELECT p.id AS post_id\nFROM posts p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM comments c\n  WHERE c.post_id = p.id\n    AND c.status = 'visible'\n)\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- The subquery searches for a visible comment for the current post.\n- `NOT EXISTS` keeps only posts where that search finds nothing.\n- This returns the same `post_id` values as the anti-join approach.",
      },
    ],
  },
  {
    code: "SOCIAL_058",
    approaches: [
      {
        approach_title: "Anti join",
        approach_type: "anti_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id FROM users u LEFT JOIN login_history lh ON u.id = lh.user_id AND lh.success = true WHERE lh.id IS NULL ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse a left anti join to find users with no successful login rows.\n\n## Query\n\n```sql\nSELECT u.id\nFROM users u\nLEFT JOIN login_history lh\n  ON u.id = lh.user_id\n AND lh.success = true\nWHERE lh.id IS NULL\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Start from `users` so every user is considered.\n- The join only matches successful login rows.\n- Users with no successful login have `lh.id IS NULL` after the left join.\n- The output column is `id`, and ordering matches the expected query.",
      },
      {
        approach_title: "NOT EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id FROM users u WHERE NOT EXISTS (SELECT 1 FROM login_history lh WHERE lh.user_id = u.id AND lh.success = true) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nReturn users where no successful login exists.\n\n## Query\n\n```sql\nSELECT u.id\nFROM users u\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM login_history lh\n  WHERE lh.user_id = u.id\n    AND lh.success = true\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery checks for a successful login for the current user.\n- `NOT EXISTS` keeps only users with no matching successful login.\n- This returns the same result as the left anti join.",
      },
    ],
  },
  {
    code: "SOCIAL_059",
    approaches: [
      {
        approach_title: "Distinct having",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id FROM likes GROUP BY post_id HAVING COUNT(DISTINCT user_id) >= 3 ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nCount distinct likers per post and keep posts with at least 3 distinct users.\n\n## Query\n\n```sql\nSELECT post_id\nFROM likes\nGROUP BY post_id\nHAVING COUNT(DISTINCT user_id) >= 3\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY post_id` creates one row per post.\n- `COUNT(DISTINCT user_id)` counts unique users who liked each post.\n- `HAVING COUNT(DISTINCT user_id) >= 3` filters after aggregation.\n- The output is ordered by `post_id ASC`.",
      },
      {
        approach_title: "Pre-dedupe",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT post_id FROM (SELECT DISTINCT post_id, user_id FROM likes) deduped GROUP BY post_id HAVING COUNT(*) >= 3 ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nDeduplicate post-user like pairs first, then count those pairs per post.\n\n## Query\n\n```sql\nSELECT post_id\nFROM (\n  SELECT DISTINCT post_id, user_id\n  FROM likes\n) deduped\nGROUP BY post_id\nHAVING COUNT(*) >= 3\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- The subquery keeps each `(post_id, user_id)` pair once.\n- The outer query counts unique likers per post.\n- This matches `COUNT(DISTINCT user_id)` and returns the same post IDs.",
      },
    ],
  },
  {
    code: "SOCIAL_060",
    approaches: [
      {
        approach_title: "Distinct posts",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id FROM comments GROUP BY user_id HAVING COUNT(DISTINCT post_id) >= 2 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nCount how many different posts each user commented on.\n\n## Query\n\n```sql\nSELECT user_id\nFROM comments\nGROUP BY user_id\nHAVING COUNT(DISTINCT post_id) >= 2\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per commenter.\n- `COUNT(DISTINCT post_id)` counts different posts commented on by that user.\n- `HAVING COUNT(DISTINCT post_id) >= 2` keeps users who commented on at least 2 posts.\n- The result is ordered by `user_id ASC`.",
      },
      {
        approach_title: "Pre-dedupe",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id FROM (SELECT DISTINCT user_id, post_id FROM comments) deduped GROUP BY user_id HAVING COUNT(*) >= 2 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nDeduplicate user-post comment pairs first, then count them per user.\n\n## Query\n\n```sql\nSELECT user_id\nFROM (\n  SELECT DISTINCT user_id, post_id\n  FROM comments\n) deduped\nGROUP BY user_id\nHAVING COUNT(*) >= 2\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The subquery keeps each `(user_id, post_id)` pair once.\n- The outer query counts how many distinct posts each user commented on.\n- This returns the same users as `COUNT(DISTINCT post_id)`.",
      },
    ],
  },
  {
    code: "SOCIAL_061",
    approaches: [
      {
        approach_title: "Anti join",
        approach_type: "anti_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT p.id AS post_id FROM posts p LEFT JOIN likes l ON p.id = l.post_id WHERE l.post_id IS NULL ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nUse a left anti join to find posts with no likes.\n\n## Query\n\n```sql\nSELECT p.id AS post_id\nFROM posts p\nLEFT JOIN likes l ON p.id = l.post_id\nWHERE l.post_id IS NULL\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- Start from `posts` so every post is considered.\n- `LEFT JOIN likes` tries to find matching likes for each post.\n- Posts with no matching like rows have `l.post_id IS NULL`.\n- The output column is `post_id`, matching the expected result.\n- `ORDER BY post_id ASC` keeps the result deterministic.",
      },
      {
        approach_title: "NOT EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id AS post_id FROM posts p WHERE NOT EXISTS (SELECT 1 FROM likes l WHERE l.post_id = p.id) ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nReturn posts where no matching like row exists.\n\n## Query\n\n```sql\nSELECT p.id AS post_id\nFROM posts p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM likes l\n  WHERE l.post_id = p.id\n)\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the current post has at least one like.\n- `NOT EXISTS` keeps only posts where no like exists.\n- This returns the same post IDs as the left anti join.\n- The final ordering matches the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_062",
    approaches: [
      {
        approach_title: "Distinct users",
        approach_type: "distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT follower_id FROM follows WHERE status = 'pending' ORDER BY follower_id ASC;",
        explanation:
          "## Approach\n\nFilter pending follow requests and return each sender once.\n\n## Query\n\n```sql\nSELECT DISTINCT follower_id\nFROM follows\nWHERE status = 'pending'\nORDER BY follower_id ASC;\n```\n\n## Explanation\n\n- `status = 'pending'` keeps only pending follow requests.\n- `follower_id` is the user who sent the follow request.\n- `DISTINCT` removes duplicates if the same user sent multiple pending requests.\n- `ORDER BY follower_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "Group users",
        approach_type: "group_by",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT follower_id FROM follows WHERE status = 'pending' GROUP BY follower_id ORDER BY follower_id ASC;",
        explanation:
          "## Approach\n\nUse grouping to return each pending-request sender once.\n\n## Query\n\n```sql\nSELECT follower_id\nFROM follows\nWHERE status = 'pending'\nGROUP BY follower_id\nORDER BY follower_id ASC;\n```\n\n## Explanation\n\n- The `WHERE` clause keeps pending follow rows.\n- `GROUP BY follower_id` collapses duplicate sender IDs into one row each.\n- This returns the same result as `SELECT DISTINCT follower_id`.\n- `DISTINCT` is simpler when no aggregate is needed.",
      },
    ],
  },
  {
    code: "SOCIAL_063",
    approaches: [
      {
        approach_title: "Distinct users",
        approach_type: "distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT followee_id FROM follows WHERE status = 'blocked' ORDER BY followee_id ASC;",
        explanation:
          "## Approach\n\nFilter blocked follow relationships and return each blocked followee once.\n\n## Query\n\n```sql\nSELECT DISTINCT followee_id\nFROM follows\nWHERE status = 'blocked'\nORDER BY followee_id ASC;\n```\n\n## Explanation\n\n- `status = 'blocked'` keeps blocked follow relationships.\n- `followee_id` is the user blocked in that follow relationship.\n- `DISTINCT` removes duplicate blocked user IDs.\n- `ORDER BY followee_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "Group users",
        approach_type: "group_by",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT followee_id FROM follows WHERE status = 'blocked' GROUP BY followee_id ORDER BY followee_id ASC;",
        explanation:
          "## Approach\n\nUse grouping to return each blocked followee once.\n\n## Query\n\n```sql\nSELECT followee_id\nFROM follows\nWHERE status = 'blocked'\nGROUP BY followee_id\nORDER BY followee_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only blocked follow rows.\n- `GROUP BY followee_id` returns one row per blocked followee.\n- This matches the `DISTINCT` result exactly.\n- `DISTINCT` is usually clearer for this type of de-duplication.",
      },
    ],
  },
  {
    code: "SOCIAL_064",
    approaches: [
      {
        approach_title: "Max login",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, MAX(login_at) AS last_successful_login FROM login_history WHERE success = true GROUP BY user_id ORDER BY last_successful_login DESC, user_id ASC;",
        explanation:
          "## Approach\n\nFilter successful logins, then find the latest login timestamp per user.\n\n## Query\n\n```sql\nSELECT user_id, MAX(login_at) AS last_successful_login\nFROM login_history\nWHERE success = true\nGROUP BY user_id\nORDER BY last_successful_login DESC, user_id ASC;\n```\n\n## Explanation\n\n- `success = true` keeps only successful login attempts.\n- `GROUP BY user_id` creates one group per user.\n- `MAX(login_at)` returns the latest successful login timestamp for each user.\n- The alias `last_successful_login` matches the expected output column.\n- The ordering matches the expected query.",
      },
      {
        approach_title: "CTE max",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH successful_logins AS (SELECT user_id, MAX(login_at) AS last_successful_login FROM login_history WHERE success = true GROUP BY user_id) SELECT user_id, last_successful_login FROM successful_logins ORDER BY last_successful_login DESC, user_id ASC;",
        explanation:
          "## Approach\n\nCompute latest successful login per user in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH successful_logins AS (\n  SELECT user_id, MAX(login_at) AS last_successful_login\n  FROM login_history\n  WHERE success = true\n  GROUP BY user_id\n)\nSELECT user_id, last_successful_login\nFROM successful_logins\nORDER BY last_successful_login DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same success filter and `MAX(login_at)` aggregation.\n- The outer query returns the same expected columns.\n- The final ordering is identical to the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_065",
    approaches: [
      {
        approach_title: "Daily count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT created_at::date AS signup_date, COUNT(*) AS user_count FROM users GROUP BY created_at::date ORDER BY signup_date ASC;",
        explanation:
          "## Approach\n\nConvert signup timestamps to dates, then count users per date.\n\n## Query\n\n```sql\nSELECT created_at::date AS signup_date, COUNT(*) AS user_count\nFROM users\nGROUP BY created_at::date\nORDER BY signup_date ASC;\n```\n\n## Explanation\n\n- `created_at::date` extracts the calendar date from the signup timestamp.\n- `GROUP BY created_at::date` groups users who signed up on the same date.\n- `COUNT(*) AS user_count` counts signups per date.\n- The alias `signup_date` matches the expected output.\n- `ORDER BY signup_date ASC` shows dates chronologically.",
      },
      {
        approach_title: "DATE count",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DATE(created_at) AS signup_date, COUNT(*) AS user_count FROM users GROUP BY DATE(created_at) ORDER BY signup_date ASC;",
        explanation:
          "## Approach\n\nUse `DATE(created_at)` instead of cast syntax to group signups by day.\n\n## Query\n\n```sql\nSELECT DATE(created_at) AS signup_date, COUNT(*) AS user_count\nFROM users\nGROUP BY DATE(created_at)\nORDER BY signup_date ASC;\n```\n\n## Explanation\n\n- `DATE(created_at)` extracts the date portion from the timestamp.\n- It groups signups by the same calendar date as `created_at::date`.\n- The output column names and ordering match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_066",
    approaches: [
      {
        approach_title: "Daily count",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT created_at::date AS post_date, COUNT(*) AS post_count FROM posts WHERE status = 'published' GROUP BY created_at::date ORDER BY post_date ASC;",
        explanation:
          "## Approach\n\nFilter published posts, group them by date, and count posts per date.\n\n## Query\n\n```sql\nSELECT created_at::date AS post_date, COUNT(*) AS post_count\nFROM posts\nWHERE status = 'published'\nGROUP BY created_at::date\nORDER BY post_date ASC;\n```\n\n## Explanation\n\n- `status = 'published'` keeps only published posts.\n- `created_at::date` extracts the post creation date.\n- `GROUP BY created_at::date` groups published posts by date.\n- `COUNT(*) AS post_count` counts published posts on each date.\n- `ORDER BY post_date ASC` matches the expected chronological order.",
      },
      {
        approach_title: "DATE count",
        approach_type: "date_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DATE(created_at) AS post_date, COUNT(*) AS post_count FROM posts WHERE status = 'published' GROUP BY DATE(created_at) ORDER BY post_date ASC;",
        explanation:
          "## Approach\n\nUse `DATE(created_at)` to extract each published post's calendar date.\n\n## Query\n\n```sql\nSELECT DATE(created_at) AS post_date, COUNT(*) AS post_count\nFROM posts\nWHERE status = 'published'\nGROUP BY DATE(created_at)\nORDER BY post_date ASC;\n```\n\n## Explanation\n\n- `DATE(created_at)` extracts the date portion of the timestamp.\n- The `WHERE` clause still keeps only published posts.\n- The grouped counts and ordering match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_067",
    approaches: [
      {
        approach_title: "Count usage",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT hashtag_id, COUNT(*) AS usage_count FROM post_hashtags GROUP BY hashtag_id ORDER BY usage_count DESC, hashtag_id ASC;",
        explanation:
          "## Approach\n\nCount how many post-hashtag rows exist for each hashtag.\n\n## Query\n\n```sql\nSELECT hashtag_id, COUNT(*) AS usage_count\nFROM post_hashtags\nGROUP BY hashtag_id\nORDER BY usage_count DESC, hashtag_id ASC;\n```\n\n## Explanation\n\n- `post_hashtags` links posts to hashtags.\n- `GROUP BY hashtag_id` creates one row per hashtag.\n- `COUNT(*) AS usage_count` counts how many times each hashtag appears on posts.\n- `usage_count DESC, hashtag_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH hashtag_usage AS (SELECT hashtag_id, COUNT(*) AS usage_count FROM post_hashtags GROUP BY hashtag_id) SELECT hashtag_id, usage_count FROM hashtag_usage ORDER BY usage_count DESC, hashtag_id ASC;",
        explanation:
          "## Approach\n\nCompute hashtag usage counts in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH hashtag_usage AS (\n  SELECT hashtag_id, COUNT(*) AS usage_count\n  FROM post_hashtags\n  GROUP BY hashtag_id\n)\nSELECT hashtag_id, usage_count\nFROM hashtag_usage\nORDER BY usage_count DESC, hashtag_id ASC;\n```\n\n## Explanation\n\n- The CTE produces the same grouped usage counts.\n- The outer query applies the exact expected ordering.\n- The output matches the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_068",
    approaches: [
      {
        approach_title: "Distinct posts",
        approach_type: "distinct",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT post_id FROM post_shares WHERE share_type = 'external' ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nFilter external shares and return each shared post once.\n\n## Query\n\n```sql\nSELECT DISTINCT post_id\nFROM post_shares\nWHERE share_type = 'external'\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- `share_type = 'external'` keeps only external share events.\n- A post may have multiple external share rows.\n- `DISTINCT post_id` returns each qualifying post only once.\n- `ORDER BY post_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "Group posts",
        approach_type: "group_by",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT post_id FROM post_shares WHERE share_type = 'external' GROUP BY post_id ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nUse grouping to return each externally shared post once.\n\n## Query\n\n```sql\nSELECT post_id\nFROM post_shares\nWHERE share_type = 'external'\nGROUP BY post_id\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only external share rows.\n- `GROUP BY post_id` collapses duplicate post IDs.\n- This returns the same rows as `DISTINCT post_id`.\n- `DISTINCT` is clearer when no aggregate is needed.",
      },
    ],
  },
  {
    code: "SOCIAL_069",
    approaches: [
      {
        approach_title: "Distinct receivers",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT sender_id FROM messages WHERE is_deleted = false GROUP BY sender_id HAVING COUNT(DISTINCT receiver_id) >= 2 ORDER BY sender_id ASC;",
        explanation:
          "## Approach\n\nCount distinct receivers for each sender, using only non-deleted messages.\n\n## Query\n\n```sql\nSELECT sender_id\nFROM messages\nWHERE is_deleted = false\nGROUP BY sender_id\nHAVING COUNT(DISTINCT receiver_id) >= 2\nORDER BY sender_id ASC;\n```\n\n## Explanation\n\n- `is_deleted = false` keeps valid non-deleted messages.\n- `GROUP BY sender_id` creates one group per message sender.\n- `COUNT(DISTINCT receiver_id)` counts different receivers per sender.\n- `HAVING COUNT(DISTINCT receiver_id) >= 2` keeps senders with at least two different receivers.\n- The output is ordered by `sender_id ASC`.",
      },
      {
        approach_title: "Pre-dedupe",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT sender_id FROM (SELECT DISTINCT sender_id, receiver_id FROM messages WHERE is_deleted = false) deduped GROUP BY sender_id HAVING COUNT(*) >= 2 ORDER BY sender_id ASC;",
        explanation:
          "## Approach\n\nDeduplicate sender-receiver pairs first, then count receivers per sender.\n\n## Query\n\n```sql\nSELECT sender_id\nFROM (\n  SELECT DISTINCT sender_id, receiver_id\n  FROM messages\n  WHERE is_deleted = false\n) deduped\nGROUP BY sender_id\nHAVING COUNT(*) >= 2\nORDER BY sender_id ASC;\n```\n\n## Explanation\n\n- The subquery keeps each `(sender_id, receiver_id)` pair once.\n- The outer query counts unique receivers per sender.\n- This matches `COUNT(DISTINCT receiver_id)` and returns the same senders.",
      },
    ],
  },
  {
    code: "SOCIAL_070",
    approaches: [
      {
        approach_title: "Count reasons",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT reason, COUNT(*) AS report_count FROM reports WHERE reason IS NOT NULL GROUP BY reason ORDER BY report_count DESC, reason ASC;",
        explanation:
          "## Approach\n\nExclude missing reasons, then count reports per reason.\n\n## Query\n\n```sql\nSELECT reason, COUNT(*) AS report_count\nFROM reports\nWHERE reason IS NOT NULL\nGROUP BY reason\nORDER BY report_count DESC, reason ASC;\n```\n\n## Explanation\n\n- `reason IS NOT NULL` excludes reports without a reason.\n- `GROUP BY reason` creates one row per report reason.\n- `COUNT(*) AS report_count` counts reports for each reason.\n- `report_count DESC, reason ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH reason_counts AS (SELECT reason, COUNT(*) AS report_count FROM reports WHERE reason IS NOT NULL GROUP BY reason) SELECT reason, report_count FROM reason_counts ORDER BY report_count DESC, reason ASC;",
        explanation:
          "## Approach\n\nCompute report counts by reason in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH reason_counts AS (\n  SELECT reason, COUNT(*) AS report_count\n  FROM reports\n  WHERE reason IS NOT NULL\n  GROUP BY reason\n)\nSELECT reason, report_count\nFROM reason_counts\nORDER BY report_count DESC, reason ASC;\n```\n\n## Explanation\n\n- The CTE applies the same filter and grouping.\n- The outer query applies the exact expected ordering.\n- The result matches the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_071",
    approaches: [
      {
        approach_title: "Count media",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT media_type, COUNT(*) AS post_count FROM posts GROUP BY media_type ORDER BY media_type ASC;",
        explanation:
          "## Approach\n\nGroup posts by media type and count posts in each group.\n\n## Query\n\n```sql\nSELECT media_type, COUNT(*) AS post_count\nFROM posts\nGROUP BY media_type\nORDER BY media_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY media_type` creates one row per media type.\n- `COUNT(*) AS post_count` counts posts for each media type.\n- The selected columns match the expected output.\n- `ORDER BY media_type ASC` gives deterministic ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH media_counts AS (SELECT media_type, COUNT(*) AS post_count FROM posts GROUP BY media_type) SELECT media_type, post_count FROM media_counts ORDER BY media_type ASC;",
        explanation:
          "## Approach\n\nCompute post counts by media type in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH media_counts AS (\n  SELECT media_type, COUNT(*) AS post_count\n  FROM posts\n  GROUP BY media_type\n)\nSELECT media_type, post_count\nFROM media_counts\nORDER BY media_type ASC;\n```\n\n## Explanation\n\n- The CTE produces the same grouped counts.\n- The outer query applies the expected ordering.\n- The result matches the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_072",
    approaches: [
      {
        approach_title: "Count source",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;",
        explanation:
          "## Approach\n\nExclude missing signup sources, then count users per source.\n\n## Query\n\n```sql\nSELECT signup_source, COUNT(*) AS user_count\nFROM users\nWHERE signup_source IS NOT NULL\nGROUP BY signup_source\nORDER BY user_count DESC, signup_source ASC;\n```\n\n## Explanation\n\n- `signup_source IS NOT NULL` removes users with no signup source.\n- `GROUP BY signup_source` creates one row per signup source.\n- `COUNT(*) AS user_count` counts users in each source group.\n- `user_count DESC, signup_source ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH source_counts AS (SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source) SELECT signup_source, user_count FROM source_counts ORDER BY user_count DESC, signup_source ASC;",
        explanation:
          "## Approach\n\nCompute signup-source counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH source_counts AS (\n  SELECT signup_source, COUNT(*) AS user_count\n  FROM users\n  WHERE signup_source IS NOT NULL\n  GROUP BY signup_source\n)\nSELECT signup_source, user_count\nFROM source_counts\nORDER BY user_count DESC, signup_source ASC;\n```\n\n## Explanation\n\n- The CTE applies the same null filter and grouping.\n- The outer query applies the expected ordering.\n- The output is identical to the direct aggregation.",
      },
    ],
  },
  {
    code: "SOCIAL_073",
    approaches: [
      {
        approach_title: "Count type",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT notification_type, COUNT(*) AS notification_count FROM notifications WHERE notification_type IS NOT NULL GROUP BY notification_type ORDER BY notification_count DESC, notification_type ASC;",
        explanation:
          "## Approach\n\nExclude notifications with no notification type, then count notifications per type.\n\n## Query\n\n```sql\nSELECT notification_type, COUNT(*) AS notification_count\nFROM notifications\nWHERE notification_type IS NOT NULL\nGROUP BY notification_type\nORDER BY notification_count DESC, notification_type ASC;\n```\n\n## Explanation\n\n- `notification_type IS NOT NULL` removes notifications with missing type values.\n- `GROUP BY notification_type` creates one row per notification type.\n- `COUNT(*) AS notification_count` counts notifications in each group.\n- The output columns match the corrected question object.",
      },
      {
        approach_title: "CTE count",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH type_counts AS (SELECT notification_type, COUNT(*) AS notification_count FROM notifications WHERE notification_type IS NOT NULL GROUP BY notification_type) SELECT notification_type, notification_count FROM type_counts ORDER BY notification_count DESC, notification_type ASC;",
        explanation:
          "## Approach\n\nCompute notification counts by type in a CTE, then return them ordered.\n\n## Query\n\n```sql\nWITH type_counts AS (\n  SELECT notification_type, COUNT(*) AS notification_count\n  FROM notifications\n  WHERE notification_type IS NOT NULL\n  GROUP BY notification_type\n)\nSELECT notification_type, notification_count\nFROM type_counts\nORDER BY notification_count DESC, notification_type ASC;\n```\n\n## Explanation\n\n- The CTE uses the same filter and grouping.\n- The outer query applies the exact expected ordering.\n- This returns the same rows and columns as the corrected expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_074",
    approaches: [
      {
        approach_title: "Average watch",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT post_id, AVG(watch_seconds) AS avg_watch_seconds FROM post_views WHERE watch_seconds IS NOT NULL GROUP BY post_id ORDER BY avg_watch_seconds DESC, post_id ASC;",
        explanation:
          "## Approach\n\nExclude views without watch duration, then average watch seconds per post.\n\n## Query\n\n```sql\nSELECT post_id, AVG(watch_seconds) AS avg_watch_seconds\nFROM post_views\nWHERE watch_seconds IS NOT NULL\nGROUP BY post_id\nORDER BY avg_watch_seconds DESC, post_id ASC;\n```\n\n## Explanation\n\n- `watch_seconds IS NOT NULL` keeps only rows with a recorded watch duration.\n- `GROUP BY post_id` creates one row per post.\n- `AVG(watch_seconds) AS avg_watch_seconds` calculates average watch duration for each post.\n- The ordering matches the expected sort rules.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH watch_averages AS (SELECT post_id, AVG(watch_seconds) AS avg_watch_seconds FROM post_views WHERE watch_seconds IS NOT NULL GROUP BY post_id) SELECT post_id, avg_watch_seconds FROM watch_averages ORDER BY avg_watch_seconds DESC, post_id ASC;",
        explanation:
          "## Approach\n\nCompute average watch seconds per post in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH watch_averages AS (\n  SELECT post_id, AVG(watch_seconds) AS avg_watch_seconds\n  FROM post_views\n  WHERE watch_seconds IS NOT NULL\n  GROUP BY post_id\n)\nSELECT post_id, avg_watch_seconds\nFROM watch_averages\nORDER BY avg_watch_seconds DESC, post_id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same null filter and average calculation.\n- The outer query applies the expected ordering.\n- The result matches the direct grouped query.",
      },
    ],
  },
  {
    code: "SOCIAL_075",
    approaches: [
      {
        approach_title: "Sum spend",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT campaign_id, SUM(spend) AS total_spend FROM promoted_posts GROUP BY campaign_id ORDER BY total_spend DESC, campaign_id ASC;",
        explanation:
          "## Approach\n\nGroup promoted posts by campaign and sum spend per campaign.\n\n## Query\n\n```sql\nSELECT campaign_id, SUM(spend) AS total_spend\nFROM promoted_posts\nGROUP BY campaign_id\nORDER BY total_spend DESC, campaign_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY campaign_id` creates one row per campaign.\n- `SUM(spend) AS total_spend` calculates total promoted-post spend per campaign.\n- `total_spend DESC` shows highest-spend campaigns first.\n- `campaign_id ASC` breaks ties deterministically.",
      },
      {
        approach_title: "CTE sum",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH campaign_spend AS (SELECT campaign_id, SUM(spend) AS total_spend FROM promoted_posts GROUP BY campaign_id) SELECT campaign_id, total_spend FROM campaign_spend ORDER BY total_spend DESC, campaign_id ASC;",
        explanation:
          "## Approach\n\nCompute total campaign spend in a CTE, then return it ordered.\n\n## Query\n\n```sql\nWITH campaign_spend AS (\n  SELECT campaign_id, SUM(spend) AS total_spend\n  FROM promoted_posts\n  GROUP BY campaign_id\n)\nSELECT campaign_id, total_spend\nFROM campaign_spend\nORDER BY total_spend DESC, campaign_id ASC;\n```\n\n## Explanation\n\n- The CTE produces the same campaign spend totals.\n- The outer query applies the same expected order.\n- The result is identical to the direct aggregation.",
      },
    ],
  },
  {
    code: "SOCIAL_076",
    approaches: [
      {
        approach_title: "CTR calc",
        approach_type: "calculation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr FROM promoted_posts WHERE impressions > 0 ORDER BY ctr DESC, id ASC;",
        explanation:
          "## Approach\n\nCalculate click-through rate as clicks divided by impressions.\n\n## Query\n\n```sql\nSELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr\nFROM promoted_posts\nWHERE impressions > 0\nORDER BY ctr DESC, id ASC;\n```\n\n## Explanation\n\n- `impressions > 0` prevents division by zero.\n- `clicks::numeric` forces decimal division instead of integer division.\n- `clicks::numeric / impressions AS ctr` calculates click-through rate.\n- `ctr DESC, id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE CTR",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ctr_rows AS (SELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr FROM promoted_posts WHERE impressions > 0) SELECT id, campaign_id, post_id, ctr FROM ctr_rows ORDER BY ctr DESC, id ASC;",
        explanation:
          "## Approach\n\nCalculate CTR in a CTE, then sort the computed rows.\n\n## Query\n\n```sql\nWITH ctr_rows AS (\n  SELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr\n  FROM promoted_posts\n  WHERE impressions > 0\n)\nSELECT id, campaign_id, post_id, ctr\nFROM ctr_rows\nORDER BY ctr DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE applies the same `impressions > 0` filter.\n- It computes the same `ctr` expression.\n- The outer query applies the expected ordering.\n- The result matches the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_077",
    approaches: [
      {
        approach_title: "Above average",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, view_count FROM posts WHERE view_count > (SELECT AVG(view_count) FROM posts) ORDER BY view_count DESC, id ASC;",
        explanation:
          "## Approach\n\nCompare each post's view count against the overall average view count.\n\n## Query\n\n```sql\nSELECT id, user_id, view_count\nFROM posts\nWHERE view_count > (\n  SELECT AVG(view_count)\n  FROM posts\n)\nORDER BY view_count DESC, id ASC;\n```\n\n## Explanation\n\n- The subquery calculates the average `view_count` across all posts.\n- The outer query keeps posts whose `view_count` is greater than that average.\n- The selected columns match the expected output.\n- `view_count DESC, id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH avg_views AS (SELECT AVG(view_count) AS avg_view_count FROM posts) SELECT p.id, p.user_id, p.view_count FROM posts p CROSS JOIN avg_views a WHERE p.view_count > a.avg_view_count ORDER BY p.view_count DESC, p.id ASC;",
        explanation:
          "## Approach\n\nCompute the overall average once in a CTE, then compare each post to it.\n\n## Query\n\n```sql\nWITH avg_views AS (\n  SELECT AVG(view_count) AS avg_view_count\n  FROM posts\n)\nSELECT p.id, p.user_id, p.view_count\nFROM posts p\nCROSS JOIN avg_views a\nWHERE p.view_count > a.avg_view_count\nORDER BY p.view_count DESC, p.id ASC;\n```\n\n## Explanation\n\n- `avg_views` returns one row with the overall average.\n- `CROSS JOIN` makes that value available to every post row.\n- The filter matches the expected `view_count > average` logic.\n- The final ordering matches the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_078",
    approaches: [
      {
        approach_title: "Above average",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, username, followers_count FROM users WHERE followers_count > (SELECT AVG(followers_count) FROM users) ORDER BY followers_count DESC, id ASC;",
        explanation:
          "## Approach\n\nCompare each user's follower count against the overall average follower count.\n\n## Query\n\n```sql\nSELECT id, username, followers_count\nFROM users\nWHERE followers_count > (\n  SELECT AVG(followers_count)\n  FROM users\n)\nORDER BY followers_count DESC, id ASC;\n```\n\n## Explanation\n\n- The subquery calculates average `followers_count` across all users.\n- The outer query keeps users above that average.\n- The selected columns match the expected output.\n- `followers_count DESC, id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CTE average",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH avg_followers AS (SELECT AVG(followers_count) AS avg_followers_count FROM users) SELECT u.id, u.username, u.followers_count FROM users u CROSS JOIN avg_followers a WHERE u.followers_count > a.avg_followers_count ORDER BY u.followers_count DESC, u.id ASC;",
        explanation:
          "## Approach\n\nCompute the overall average follower count in a CTE, then compare users against it.\n\n## Query\n\n```sql\nWITH avg_followers AS (\n  SELECT AVG(followers_count) AS avg_followers_count\n  FROM users\n)\nSELECT u.id, u.username, u.followers_count\nFROM users u\nCROSS JOIN avg_followers a\nWHERE u.followers_count > a.avg_followers_count\nORDER BY u.followers_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE returns one row containing the average follower count.\n- `CROSS JOIN` attaches that average to every user row.\n- The filter keeps users above average.\n- The output and ordering match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_079",
    approaches: [
      {
        approach_title: "Engagement calc",
        approach_type: "calculation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id, like_count + comment_count + share_count AS engagement_count FROM posts ORDER BY engagement_count DESC, id ASC;",
        explanation:
          "## Approach\n\nCalculate stored engagement from post counter columns.\n\n## Query\n\n```sql\nSELECT id, user_id, like_count + comment_count + share_count AS engagement_count\nFROM posts\nORDER BY engagement_count DESC, id ASC;\n```\n\n## Explanation\n\n- Engagement is defined as `like_count + comment_count + share_count`.\n- The expression is aliased as `engagement_count`, matching the expected output.\n- `engagement_count DESC` ranks highest-engagement posts first.\n- `id ASC` breaks ties deterministically.",
      },
      {
        approach_title: "CTE calc",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH post_engagement AS (SELECT id, user_id, like_count + comment_count + share_count AS engagement_count FROM posts) SELECT id, user_id, engagement_count FROM post_engagement ORDER BY engagement_count DESC, id ASC;",
        explanation:
          "## Approach\n\nCompute engagement in a CTE, then return posts ordered by that value.\n\n## Query\n\n```sql\nWITH post_engagement AS (\n  SELECT id, user_id, like_count + comment_count + share_count AS engagement_count\n  FROM posts\n)\nSELECT id, user_id, engagement_count\nFROM post_engagement\nORDER BY engagement_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE computes the same `engagement_count` expression.\n- The outer query applies the expected ordering.\n- This returns the same rows and columns as the direct query.",
      },
    ],
  },
  {
    code: "SOCIAL_080",
    approaches: [
      {
        approach_title: "FILTER counts",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, COUNT(*) FILTER (WHERE success = false) AS failed_logins, COUNT(*) FILTER (WHERE success = true) AS successful_logins FROM login_history GROUP BY user_id HAVING COUNT(*) FILTER (WHERE success = false) > COUNT(*) FILTER (WHERE success = true) ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nCount failed and successful login attempts separately, then compare them per user.\n\n## Query\n\n```sql\nSELECT user_id,\n       COUNT(*) FILTER (WHERE success = false) AS failed_logins,\n       COUNT(*) FILTER (WHERE success = true) AS successful_logins\nFROM login_history\nGROUP BY user_id\nHAVING COUNT(*) FILTER (WHERE success = false) >\n       COUNT(*) FILTER (WHERE success = true)\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per user.\n- `COUNT(*) FILTER (WHERE success = false)` counts failed login attempts.\n- `COUNT(*) FILTER (WHERE success = true)` counts successful login attempts.\n- `HAVING` keeps users whose failed count is greater than successful count.\n- `ORDER BY user_id ASC` matches the expected ordering.",
      },
      {
        approach_title: "CASE counts",
        approach_type: "conditional_aggregation",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id, SUM(CASE WHEN success = false THEN 1 ELSE 0 END) AS failed_logins, SUM(CASE WHEN success = true THEN 1 ELSE 0 END) AS successful_logins FROM login_history GROUP BY user_id HAVING SUM(CASE WHEN success = false THEN 1 ELSE 0 END) > SUM(CASE WHEN success = true THEN 1 ELSE 0 END) ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nUse `CASE` expressions to count failed and successful login attempts separately.\n\n## Query\n\n```sql\nSELECT user_id,\n       SUM(CASE WHEN success = false THEN 1 ELSE 0 END) AS failed_logins,\n       SUM(CASE WHEN success = true THEN 1 ELSE 0 END) AS successful_logins\nFROM login_history\nGROUP BY user_id\nHAVING SUM(CASE WHEN success = false THEN 1 ELSE 0 END) >\n       SUM(CASE WHEN success = true THEN 1 ELSE 0 END)\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- Failed rows contribute `1` to `failed_logins`; other rows contribute `0`.\n- Successful rows contribute `1` to `successful_logins`; other rows contribute `0`.\n- The `HAVING` clause compares the two totals.\n- The output columns and ordering match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_081",
    approaches: [
      {
        approach_title: "Rank posts",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, id, view_count FROM (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) t WHERE rn <= 3 ORDER BY user_id ASC, view_count DESC, id ASC;",
        explanation:
          "## Approach\n\nRank each user's posts by view count, then keep the top 3.\n\n## Query\n\n```sql\nSELECT user_id, id, view_count\nFROM (\n  SELECT user_id,\n         id,\n         view_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY view_count DESC, id ASC\n         ) AS rn\n  FROM posts\n) t\nWHERE rn <= 3\nORDER BY user_id ASC, view_count DESC, id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY user_id` ranks posts separately for each user.\n- `view_count DESC` puts each user's most viewed posts first.\n- `id ASC` breaks ties consistently.\n- `rn <= 3` keeps only the top 3 posts per user.\n- The final ordering matches the expected result.",
      },
      {
        approach_title: "CTE rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_posts AS (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) SELECT user_id, id, view_count FROM ranked_posts WHERE rn <= 3 ORDER BY user_id ASC, view_count DESC, id ASC;",
        explanation:
          "## Approach\n\nPut ranked posts into a CTE, then filter to the top 3 per user.\n\n## Query\n\n```sql\nWITH ranked_posts AS (\n  SELECT user_id,\n         id,\n         view_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY view_count DESC, id ASC\n         ) AS rn\n  FROM posts\n)\nSELECT user_id, id, view_count\nFROM ranked_posts\nWHERE rn <= 3\nORDER BY user_id ASC, view_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE calculates the same row number per user.\n- The outer query applies the same `rn <= 3` filter.\n- The selected columns and final ordering match the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_082",
    approaches: [
      {
        approach_title: "Streak group",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH daily_logins AS (SELECT DISTINCT user_id, login_at::date AS d FROM login_history WHERE success = true), seq AS (SELECT user_id, d, d - INTERVAL '1 day' * ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS grp FROM daily_logins) SELECT user_id FROM seq GROUP BY user_id, grp HAVING COUNT(*) >= 3 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nConvert successful logins into unique login dates, then detect 3-day consecutive streaks.\n\n## Query\n\n```sql\nWITH daily_logins AS (\n  SELECT DISTINCT user_id, login_at::date AS d\n  FROM login_history\n  WHERE success = true\n),\nseq AS (\n  SELECT user_id,\n         d,\n         d - INTERVAL '1 day' * ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY d\n         ) AS grp\n  FROM daily_logins\n)\nSELECT user_id\nFROM seq\nGROUP BY user_id, grp\nHAVING COUNT(*) >= 3\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `daily_logins` keeps one successful login date per user per day.\n- `ROW_NUMBER()` numbers each user's login dates in chronological order.\n- For consecutive dates, `d - row_number * interval '1 day'` stays the same.\n- Grouping by that calculated value creates streak groups.\n- `HAVING COUNT(*) >= 3` keeps users with at least 3 consecutive login days.",
      },
      {
        approach_title: "CTE stages",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH daily_logins AS (SELECT DISTINCT user_id, login_at::date AS d FROM login_history WHERE success = true), numbered AS (SELECT user_id, d, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS rn FROM daily_logins), streaks AS (SELECT user_id, d, d - INTERVAL '1 day' * rn AS grp FROM numbered) SELECT user_id FROM streaks GROUP BY user_id, grp HAVING COUNT(*) >= 3 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nBreak the streak logic into clearer CTE stages.\n\n## Query\n\n```sql\nWITH daily_logins AS (\n  SELECT DISTINCT user_id, login_at::date AS d\n  FROM login_history\n  WHERE success = true\n),\nnumbered AS (\n  SELECT user_id,\n         d,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS rn\n  FROM daily_logins\n),\nstreaks AS (\n  SELECT user_id,\n         d,\n         d - INTERVAL '1 day' * rn AS grp\n  FROM numbered\n)\nSELECT user_id\nFROM streaks\nGROUP BY user_id, grp\nHAVING COUNT(*) >= 3\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- This keeps the same logic as the expected query.\n- `numbered` calculates the row number separately.\n- `streaks` calculates the grouping key.\n- The final grouped query returns the same users in the same order.",
      },
    ],
  },
  {
    code: "SOCIAL_083",
    approaches: [
      {
        approach_title: "User average",
        approach_type: "subquery",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT id, user_id FROM posts p WHERE like_count > (SELECT AVG(p2.like_count) FROM posts p2 WHERE p2.user_id = p.user_id) ORDER BY user_id ASC, id ASC;",
        explanation:
          "## Approach\n\nCompare each post's likes to the average likes of posts by the same user.\n\n## Query\n\n```sql\nSELECT id, user_id\nFROM posts p\nWHERE like_count > (\n  SELECT AVG(p2.like_count)\n  FROM posts p2\n  WHERE p2.user_id = p.user_id\n)\nORDER BY user_id ASC, id ASC;\n```\n\n## Explanation\n\n- The outer query checks each post.\n- The correlated subquery calculates the average `like_count` for that same post author.\n- `p2.user_id = p.user_id` connects the average to the current row's user.\n- The query keeps posts whose `like_count` is greater than their user's average.\n- The output columns and ordering match the expected result.",
      },
      {
        approach_title: "Window average",
        approach_type: "window_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT id, user_id FROM (SELECT id, user_id, like_count, AVG(like_count) OVER (PARTITION BY user_id) AS avg_like_count FROM posts) p WHERE like_count > avg_like_count ORDER BY user_id ASC, id ASC;",
        explanation:
          "## Approach\n\nUse a window function to attach each user's average like count to every post row.\n\n## Query\n\n```sql\nSELECT id, user_id\nFROM (\n  SELECT id,\n         user_id,\n         like_count,\n         AVG(like_count) OVER (PARTITION BY user_id) AS avg_like_count\n  FROM posts\n) p\nWHERE like_count > avg_like_count\nORDER BY user_id ASC, id ASC;\n```\n\n## Explanation\n\n- `AVG(like_count) OVER (PARTITION BY user_id)` computes the same per-user average.\n- The window function keeps individual post rows available for filtering.\n- The outer query keeps posts above that user average.\n- The returned columns and ordering match the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_084",
    approaches: [
      {
        approach_title: "All verified",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT f.follower_id FROM follows f JOIN users u ON f.followee_id = u.id WHERE f.status = 'accepted' GROUP BY f.follower_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE u.is_verified = true) ORDER BY f.follower_id ASC;",
        explanation:
          "## Approach\n\nFor each follower, compare total accepted followees with verified accepted followees.\n\n## Query\n\n```sql\nSELECT f.follower_id\nFROM follows f\nJOIN users u ON f.followee_id = u.id\nWHERE f.status = 'accepted'\nGROUP BY f.follower_id\nHAVING COUNT(*) = COUNT(*) FILTER (WHERE u.is_verified = true)\nORDER BY f.follower_id ASC;\n```\n\n## Explanation\n\n- `follows` provides accepted follow relationships.\n- `users` provides whether each followed user is verified.\n- `COUNT(*)` counts all accepted followees per follower.\n- `COUNT(*) FILTER (WHERE u.is_verified = true)` counts verified followees only.\n- If both counts are equal, every accepted followee is verified.",
      },
      {
        approach_title: "Bool and",
        approach_type: "postgres_specific",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT f.follower_id FROM follows f JOIN users u ON f.followee_id = u.id WHERE f.status = 'accepted' GROUP BY f.follower_id HAVING BOOL_AND(u.is_verified = true) ORDER BY f.follower_id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `BOOL_AND` to verify every followed user is verified.\n\n## Query\n\n```sql\nSELECT f.follower_id\nFROM follows f\nJOIN users u ON f.followee_id = u.id\nWHERE f.status = 'accepted'\nGROUP BY f.follower_id\nHAVING BOOL_AND(u.is_verified = true)\nORDER BY f.follower_id ASC;\n```\n\n## Explanation\n\n- The same accepted follow rows are grouped by `follower_id`.\n- `BOOL_AND(u.is_verified = true)` returns true only if all followed users in the group are verified.\n- This matches the same business logic as the expected query.\n- It is PostgreSQL-specific, while the `COUNT FILTER` version is more explicit.",
      },
    ],
  },
  {
    code: "SOCIAL_085",
    approaches: [
      {
        approach_title: "Increasing views",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH daily_views AS (SELECT post_id, viewed_at::date AS d, COUNT(*) AS cnt FROM post_views GROUP BY post_id, viewed_at::date), flagged AS (SELECT post_id, d, cnt, CASE WHEN cnt > LAG(cnt) OVER (PARTITION BY post_id ORDER BY d) THEN 1 ELSE 0 END AS inc FROM daily_views), grp AS (SELECT post_id, d, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY d) - ROW_NUMBER() OVER (PARTITION BY post_id, inc ORDER BY d) AS g FROM flagged WHERE inc = 1) SELECT post_id FROM grp GROUP BY post_id, g HAVING COUNT(*) >= 3 ORDER BY post_id ASC;",
        explanation:
          "## Approach\n\nCount daily views, mark increasing days, then find streaks of at least 3 increasing days.\n\n## Query\n\n```sql\nWITH daily_views AS (\n  SELECT post_id, viewed_at::date AS d, COUNT(*) AS cnt\n  FROM post_views\n  GROUP BY post_id, viewed_at::date\n),\nflagged AS (\n  SELECT post_id,\n         d,\n         cnt,\n         CASE\n           WHEN cnt > LAG(cnt) OVER (PARTITION BY post_id ORDER BY d)\n           THEN 1 ELSE 0\n         END AS inc\n  FROM daily_views\n),\ngrp AS (\n  SELECT post_id,\n         d,\n         ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY d) -\n         ROW_NUMBER() OVER (PARTITION BY post_id, inc ORDER BY d) AS g\n  FROM flagged\n  WHERE inc = 1\n)\nSELECT post_id\nFROM grp\nGROUP BY post_id, g\nHAVING COUNT(*) >= 3\nORDER BY post_id ASC;\n```\n\n## Explanation\n\n- `daily_views` creates one daily count per post.\n- `LAG(cnt)` compares each day with the previous available day for that post.\n- `inc = 1` marks days where views increased.\n- The row-number difference groups consecutive increasing rows.\n- `HAVING COUNT(*) >= 3` keeps posts with at least 3 increasing rows in a streak.",
      },
    ],
  },
  {
    code: "SOCIAL_086",
    approaches: [
      {
        approach_title: "Rank country",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH engagement AS (SELECT p.user_id, SUM(p.like_count + p.comment_count) AS total_engagement FROM posts p GROUP BY p.user_id), ranked AS (SELECT u.country, e.user_id, e.total_engagement, ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY e.total_engagement DESC, e.user_id ASC) AS rn FROM engagement e JOIN users u ON e.user_id = u.id) SELECT country, user_id, total_engagement FROM ranked WHERE rn = 1 ORDER BY country ASC, user_id ASC;",
        explanation:
          "## Approach\n\nCalculate total engagement per user, then rank users within each country.\n\n## Query\n\n```sql\nWITH engagement AS (\n  SELECT p.user_id,\n         SUM(p.like_count + p.comment_count) AS total_engagement\n  FROM posts p\n  GROUP BY p.user_id\n),\nranked AS (\n  SELECT u.country,\n         e.user_id,\n         e.total_engagement,\n         ROW_NUMBER() OVER (\n           PARTITION BY u.country\n           ORDER BY e.total_engagement DESC, e.user_id ASC\n         ) AS rn\n  FROM engagement e\n  JOIN users u ON e.user_id = u.id\n)\nSELECT country, user_id, total_engagement\nFROM ranked\nWHERE rn = 1\nORDER BY country ASC, user_id ASC;\n```\n\n## Explanation\n\n- `engagement` sums likes and comments from each user's posts.\n- Joining to `users` provides the user's country.\n- `ROW_NUMBER()` ranks users within each country by engagement.\n- `rn = 1` keeps the highest-engagement user per country.\n- `e.user_id ASC` is the tie-breaker inside each country.",
      },
      {
        approach_title: "Distinct on",
        approach_type: "postgres_specific",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH engagement AS (SELECT p.user_id, SUM(p.like_count + p.comment_count) AS total_engagement FROM posts p GROUP BY p.user_id) SELECT country, user_id, total_engagement FROM (SELECT DISTINCT ON (u.country) u.country, e.user_id, e.total_engagement FROM engagement e JOIN users u ON e.user_id = u.id ORDER BY u.country ASC, e.total_engagement DESC, e.user_id ASC) t ORDER BY country ASC, user_id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `DISTINCT ON` to pick the top user per country after sorting.\n\n## Query\n\n```sql\nWITH engagement AS (\n  SELECT p.user_id,\n         SUM(p.like_count + p.comment_count) AS total_engagement\n  FROM posts p\n  GROUP BY p.user_id\n)\nSELECT country, user_id, total_engagement\nFROM (\n  SELECT DISTINCT ON (u.country)\n         u.country,\n         e.user_id,\n         e.total_engagement\n  FROM engagement e\n  JOIN users u ON e.user_id = u.id\n  ORDER BY u.country ASC, e.total_engagement DESC, e.user_id ASC\n) t\nORDER BY country ASC, user_id ASC;\n```\n\n## Explanation\n\n- `DISTINCT ON (u.country)` keeps the first row per country.\n- The inner `ORDER BY` ensures that row is the highest-engagement user, with `user_id` as tie-breaker.\n- The outer query applies the final expected ordering.",
      },
    ],
  },
  {
    code: "SOCIAL_087",
    approaches: [
      {
        approach_title: "Monthly growth",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH monthly AS (SELECT followee_id AS user_id, DATE_TRUNC('month', created_at) AS m, COUNT(*) AS cnt FROM follows WHERE status = 'accepted' GROUP BY followee_id, DATE_TRUNC('month', created_at)), flagged AS (SELECT user_id, m, cnt, CASE WHEN cnt > LAG(cnt) OVER (PARTITION BY user_id ORDER BY m) THEN 1 ELSE 0 END AS inc FROM monthly), grp AS (SELECT user_id, m, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY m) - ROW_NUMBER() OVER (PARTITION BY user_id, inc ORDER BY m) AS g FROM flagged WHERE inc = 1) SELECT user_id FROM grp GROUP BY user_id, g HAVING COUNT(*) >= 3 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nCount accepted followers per month, mark months that increased, then find growth streaks.\n\n## Query\n\n```sql\nWITH monthly AS (\n  SELECT followee_id AS user_id,\n         DATE_TRUNC('month', created_at) AS m,\n         COUNT(*) AS cnt\n  FROM follows\n  WHERE status = 'accepted'\n  GROUP BY followee_id, DATE_TRUNC('month', created_at)\n),\nflagged AS (\n  SELECT user_id,\n         m,\n         cnt,\n         CASE\n           WHEN cnt > LAG(cnt) OVER (PARTITION BY user_id ORDER BY m)\n           THEN 1 ELSE 0\n         END AS inc\n  FROM monthly\n),\ngrp AS (\n  SELECT user_id,\n         m,\n         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY m) -\n         ROW_NUMBER() OVER (PARTITION BY user_id, inc ORDER BY m) AS g\n  FROM flagged\n  WHERE inc = 1\n)\nSELECT user_id\nFROM grp\nGROUP BY user_id, g\nHAVING COUNT(*) >= 3\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `monthly` counts accepted follower events per user per month.\n- `LAG(cnt)` compares each month to the previous month.\n- `inc = 1` marks months where follower count increased.\n- The row-number grouping pattern detects consecutive increase rows.\n- `HAVING COUNT(*) >= 3` keeps users with at least 3 increasing months in a row.",
      },
    ],
  },
  {
    code: "SOCIAL_088",
    approaches: [
      {
        approach_title: "Top commenter",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH counts AS (SELECT post_id, user_id, COUNT(*) AS cnt FROM comments GROUP BY post_id, user_id), ranked AS (SELECT post_id, user_id, cnt, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY cnt DESC, user_id ASC) AS rn FROM counts) SELECT post_id, user_id, cnt FROM ranked WHERE rn = 1 ORDER BY post_id ASC, user_id ASC;",
        explanation:
          "## Approach\n\nCount comments per user per post, then pick the top commenter for each post.\n\n## Query\n\n```sql\nWITH counts AS (\n  SELECT post_id, user_id, COUNT(*) AS cnt\n  FROM comments\n  GROUP BY post_id, user_id\n),\nranked AS (\n  SELECT post_id,\n         user_id,\n         cnt,\n         ROW_NUMBER() OVER (\n           PARTITION BY post_id\n           ORDER BY cnt DESC, user_id ASC\n         ) AS rn\n  FROM counts\n)\nSELECT post_id, user_id, cnt\nFROM ranked\nWHERE rn = 1\nORDER BY post_id ASC, user_id ASC;\n```\n\n## Explanation\n\n- `counts` calculates comment count per `(post_id, user_id)` pair.\n- `ROW_NUMBER()` ranks commenters inside each post.\n- `cnt DESC` picks the highest comment count.\n- `user_id ASC` breaks ties consistently.\n- `rn = 1` keeps one top commenter per post.",
      },
      {
        approach_title: "Distinct on",
        approach_type: "postgres_specific",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH counts AS (SELECT post_id, user_id, COUNT(*) AS cnt FROM comments GROUP BY post_id, user_id) SELECT post_id, user_id, cnt FROM (SELECT DISTINCT ON (post_id) post_id, user_id, cnt FROM counts ORDER BY post_id ASC, cnt DESC, user_id ASC) t ORDER BY post_id ASC, user_id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `DISTINCT ON` to keep the top commenter row per post.\n\n## Query\n\n```sql\nWITH counts AS (\n  SELECT post_id, user_id, COUNT(*) AS cnt\n  FROM comments\n  GROUP BY post_id, user_id\n)\nSELECT post_id, user_id, cnt\nFROM (\n  SELECT DISTINCT ON (post_id) post_id, user_id, cnt\n  FROM counts\n  ORDER BY post_id ASC, cnt DESC, user_id ASC\n) t\nORDER BY post_id ASC, user_id ASC;\n```\n\n## Explanation\n\n- `counts` creates one row per commenter per post.\n- `DISTINCT ON (post_id)` keeps the first row for each post.\n- The inner ordering makes that first row the highest commenter, using `user_id` as tie-breaker.\n- The outer query preserves the expected final order.",
      },
    ],
  },
  {
    code: "SOCIAL_089",
    approaches: [
      {
        approach_title: "Anti joins",
        approach_type: "anti_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT u.id FROM users u LEFT JOIN posts p ON u.id = p.user_id LEFT JOIN comments c ON u.id = c.user_id LEFT JOIN likes l ON u.id = l.user_id WHERE p.id IS NULL AND c.id IS NULL AND l.user_id IS NULL ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse left joins to find users with no posts, comments, or likes.\n\n## Query\n\n```sql\nSELECT u.id\nFROM users u\nLEFT JOIN posts p ON u.id = p.user_id\nLEFT JOIN comments c ON u.id = c.user_id\nLEFT JOIN likes l ON u.id = l.user_id\nWHERE p.id IS NULL\n  AND c.id IS NULL\n  AND l.user_id IS NULL\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Start from `users` so every user is considered.\n- `LEFT JOIN posts` checks whether the user posted.\n- `LEFT JOIN comments` checks whether the user commented.\n- `LEFT JOIN likes` checks whether the user liked anything.\n- Users with no matching activity have null values from all joined activity tables.\n- The final `WHERE` keeps only those inactive users.",
      },
      {
        approach_title: "NOT EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT u.id FROM users u WHERE NOT EXISTS (SELECT 1 FROM posts p WHERE p.user_id = u.id) AND NOT EXISTS (SELECT 1 FROM comments c WHERE c.user_id = u.id) AND NOT EXISTS (SELECT 1 FROM likes l WHERE l.user_id = u.id) ORDER BY u.id ASC;",
        explanation:
          "## Approach\n\nUse separate `NOT EXISTS` checks for each interaction table.\n\n## Query\n\n```sql\nSELECT u.id\nFROM users u\nWHERE NOT EXISTS (\n  SELECT 1 FROM posts p WHERE p.user_id = u.id\n)\nAND NOT EXISTS (\n  SELECT 1 FROM comments c WHERE c.user_id = u.id\n)\nAND NOT EXISTS (\n  SELECT 1 FROM likes l WHERE l.user_id = u.id\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Each `NOT EXISTS` checks one interaction type.\n- A user is returned only if they have no posts, no comments, and no likes.\n- This matches the same logic as the left anti-join query.",
      },
    ],
  },
  {
    code: "SOCIAL_090",
    approaches: [
      {
        approach_title: "Self join",
        approach_type: "self_join",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT f1.follower_id AS user_id FROM follows f1 JOIN follows f2 ON f1.follower_id = f2.followee_id AND f1.followee_id = f2.follower_id WHERE f1.status = 'accepted' AND f2.status = 'accepted' ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nSelf join accepted follow rows to find reciprocal relationships.\n\n## Query\n\n```sql\nSELECT DISTINCT f1.follower_id AS user_id\nFROM follows f1\nJOIN follows f2\n  ON f1.follower_id = f2.followee_id\n AND f1.followee_id = f2.follower_id\nWHERE f1.status = 'accepted'\n  AND f2.status = 'accepted'\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `f1` represents one accepted follow direction.\n- `f2` represents the reverse accepted follow direction.\n- The join condition checks A follows B and B follows A.\n- `DISTINCT` returns each qualifying user only once.\n- `ORDER BY user_id ASC` matches the expected result.",
      },
      {
        approach_title: "EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT f.follower_id AS user_id FROM follows f WHERE f.status = 'accepted' AND EXISTS (SELECT 1 FROM follows r WHERE r.follower_id = f.followee_id AND r.followee_id = f.follower_id AND r.status = 'accepted') ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nFor each accepted follow, check whether the reverse accepted follow exists.\n\n## Query\n\n```sql\nSELECT DISTINCT f.follower_id AS user_id\nFROM follows f\nWHERE f.status = 'accepted'\n  AND EXISTS (\n    SELECT 1\n    FROM follows r\n    WHERE r.follower_id = f.followee_id\n      AND r.followee_id = f.follower_id\n      AND r.status = 'accepted'\n  )\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The outer query reads accepted follow rows.\n- The `EXISTS` subquery checks for the reverse accepted relationship.\n- `DISTINCT` prevents duplicate users when a user has multiple mutual follows.\n- The result matches the expected self-join logic.",
      },
    ],
  },
  {
    code: "SOCIAL_091",
    approaches: [
      {
        approach_title: "Pre-agg avg",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH media_avg AS (SELECT media_type, AVG(like_count + comment_count + share_count) AS avg_engagement FROM posts GROUP BY media_type) SELECT p.id, p.media_type, p.like_count + p.comment_count + p.share_count AS engagement_count FROM posts p JOIN media_avg ma ON p.media_type = ma.media_type WHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement ORDER BY p.media_type ASC, p.id ASC;",
        explanation:
          "## Approach\n\nCompute the average engagement once per media type, then join those averages back to posts.\n\n## Query\n\n```sql\nWITH media_avg AS (\n  SELECT media_type,\n         AVG(like_count + comment_count + share_count) AS avg_engagement\n  FROM posts\n  GROUP BY media_type\n)\nSELECT p.id,\n       p.media_type,\n       p.like_count + p.comment_count + p.share_count AS engagement_count\nFROM posts p\nJOIN media_avg ma ON p.media_type = ma.media_type\nWHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement\nORDER BY p.media_type ASC, p.id ASC;\n```\n\n## Explanation\n\n- `media_avg` calculates one average engagement value per media type.\n- The main query joins each post to its media type average.\n- The `WHERE` clause keeps posts above that average.\n- This avoids recalculating the average once per post, so it is much faster than the correlated subquery.",
      },
      {
        approach_title: "Derived avg",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT p.id, p.media_type, p.like_count + p.comment_count + p.share_count AS engagement_count FROM posts p JOIN (SELECT media_type, AVG(like_count + comment_count + share_count) AS avg_engagement FROM posts GROUP BY media_type) ma ON p.media_type = ma.media_type WHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement ORDER BY p.media_type ASC, p.id ASC;",
        explanation:
          "## Approach\n\nUse a derived table instead of a CTE to compute average engagement per media type.\n\n## Query\n\n```sql\nSELECT p.id,\n       p.media_type,\n       p.like_count + p.comment_count + p.share_count AS engagement_count\nFROM posts p\nJOIN (\n  SELECT media_type,\n         AVG(like_count + comment_count + share_count) AS avg_engagement\n  FROM posts\n  GROUP BY media_type\n) ma ON p.media_type = ma.media_type\nWHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement\nORDER BY p.media_type ASC, p.id ASC;\n```\n\n## Explanation\n\n- The derived table computes one average per media type.\n- The join compares each post against its matching media type average.\n- It returns the same rows, columns, and ordering as the CTE solution.",
      },
    ],
  },
  {
    code: "SOCIAL_092",
    approaches: [
      {
        approach_title: "Distinct languages",
        approach_type: "aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id FROM posts WHERE status = 'published' AND language_code IS NOT NULL GROUP BY user_id HAVING COUNT(DISTINCT language_code) >= 2 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nCount distinct languages used by each user in published posts.\n\n## Query\n\n```sql\nSELECT user_id\nFROM posts\nWHERE status = 'published'\n  AND language_code IS NOT NULL\nGROUP BY user_id\nHAVING COUNT(DISTINCT language_code) >= 2\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `status = 'published'` limits the check to published posts.\n- `language_code IS NOT NULL` excludes posts with missing language values.\n- `COUNT(DISTINCT language_code)` counts unique languages per user.\n- `HAVING >= 2` keeps users with posts in at least two languages.",
      },
      {
        approach_title: "Pre-dedupe",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id FROM (SELECT DISTINCT user_id, language_code FROM posts WHERE status = 'published' AND language_code IS NOT NULL) deduped GROUP BY user_id HAVING COUNT(*) >= 2 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nDeduplicate user-language pairs first, then count them per user.\n\n## Query\n\n```sql\nSELECT user_id\nFROM (\n  SELECT DISTINCT user_id, language_code\n  FROM posts\n  WHERE status = 'published'\n    AND language_code IS NOT NULL\n) deduped\nGROUP BY user_id\nHAVING COUNT(*) >= 2\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The subquery keeps each `(user_id, language_code)` pair once.\n- The outer query counts how many unique languages each user used.\n- This returns the same users as `COUNT(DISTINCT language_code)`.",
      },
    ],
  },
  {
    code: "SOCIAL_093",
    approaches: [
      {
        approach_title: "Second post",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id, id AS post_id, view_count FROM (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) ranked WHERE rn = 2 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nRank each user's posts by view count and return the second-ranked post.\n\n## Query\n\n```sql\nSELECT user_id, id AS post_id, view_count\nFROM (\n  SELECT user_id,\n         id,\n         view_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY view_count DESC, id ASC\n         ) AS rn\n  FROM posts\n) ranked\nWHERE rn = 2\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY user_id` ranks posts separately for each user.\n- `view_count DESC` puts the most viewed post first.\n- `id ASC` breaks ties consistently.\n- `rn = 2` keeps the second most viewed post per user.",
      },
      {
        approach_title: "CTE rank",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH ranked_posts AS (SELECT user_id, id AS post_id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) SELECT user_id, post_id, view_count FROM ranked_posts WHERE rn = 2 ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nPut ranked posts into a CTE, then filter to rank 2.\n\n## Query\n\n```sql\nWITH ranked_posts AS (\n  SELECT user_id,\n         id AS post_id,\n         view_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY view_count DESC, id ASC\n         ) AS rn\n  FROM posts\n)\nSELECT user_id, post_id, view_count\nFROM ranked_posts\nWHERE rn = 2\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates the same row number per user.\n- The outer query keeps only the second-ranked post.\n- The selected columns and ordering match the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_094",
    approaches: [
      {
        approach_title: "Top hashtag",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH hashtag_usage AS (SELECT p.media_type, ph.hashtag_id, COUNT(*) AS usage_count FROM posts p JOIN post_hashtags ph ON p.id = ph.post_id GROUP BY p.media_type, ph.hashtag_id), ranked AS (SELECT media_type, hashtag_id, usage_count, ROW_NUMBER() OVER (PARTITION BY media_type ORDER BY usage_count DESC, hashtag_id ASC) AS rn FROM hashtag_usage) SELECT media_type, hashtag_id, usage_count FROM ranked WHERE rn = 1 ORDER BY media_type ASC, hashtag_id ASC;",
        explanation:
          "## Approach\n\nCount hashtag usage per media type, then rank hashtags inside each media type.\n\n## Query\n\n```sql\nWITH hashtag_usage AS (\n  SELECT p.media_type,\n         ph.hashtag_id,\n         COUNT(*) AS usage_count\n  FROM posts p\n  JOIN post_hashtags ph ON p.id = ph.post_id\n  GROUP BY p.media_type, ph.hashtag_id\n),\nranked AS (\n  SELECT media_type,\n         hashtag_id,\n         usage_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY media_type\n           ORDER BY usage_count DESC, hashtag_id ASC\n         ) AS rn\n  FROM hashtag_usage\n)\nSELECT media_type, hashtag_id, usage_count\nFROM ranked\nWHERE rn = 1\nORDER BY media_type ASC, hashtag_id ASC;\n```\n\n## Explanation\n\n- `hashtag_usage` counts each hashtag within each media type.\n- `ROW_NUMBER()` ranks hashtags per media type by usage count.\n- `hashtag_id ASC` is the tie-breaker.\n- `rn = 1` returns one top hashtag per media type.",
      },
      {
        approach_title: "Distinct on",
        approach_type: "postgres_specific",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH hashtag_usage AS (SELECT p.media_type, ph.hashtag_id, COUNT(*) AS usage_count FROM posts p JOIN post_hashtags ph ON p.id = ph.post_id GROUP BY p.media_type, ph.hashtag_id) SELECT media_type, hashtag_id, usage_count FROM (SELECT DISTINCT ON (media_type) media_type, hashtag_id, usage_count FROM hashtag_usage ORDER BY media_type ASC, usage_count DESC, hashtag_id ASC) t ORDER BY media_type ASC, hashtag_id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `DISTINCT ON` to keep the top hashtag row per media type.\n\n## Query\n\n```sql\nWITH hashtag_usage AS (\n  SELECT p.media_type,\n         ph.hashtag_id,\n         COUNT(*) AS usage_count\n  FROM posts p\n  JOIN post_hashtags ph ON p.id = ph.post_id\n  GROUP BY p.media_type, ph.hashtag_id\n)\nSELECT media_type, hashtag_id, usage_count\nFROM (\n  SELECT DISTINCT ON (media_type)\n         media_type, hashtag_id, usage_count\n  FROM hashtag_usage\n  ORDER BY media_type ASC, usage_count DESC, hashtag_id ASC\n) t\nORDER BY media_type ASC, hashtag_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates usage per media type and hashtag.\n- `DISTINCT ON (media_type)` keeps the first row per media type.\n- The inner ordering ensures the kept row is the highest usage count.\n- The outer ordering matches the expected result.",
      },
    ],
  },
  {
    code: "SOCIAL_095",
    approaches: [
      {
        approach_title: "Compare likes",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH likes_received AS (SELECT p.user_id, COUNT(l.user_id) AS received_count FROM posts p LEFT JOIN likes l ON p.id = l.post_id GROUP BY p.user_id), likes_given AS (SELECT user_id, COUNT(*) AS given_count FROM likes GROUP BY user_id) SELECT lr.user_id FROM likes_received lr LEFT JOIN likes_given lg ON lr.user_id = lg.user_id WHERE lr.received_count > COALESCE(lg.given_count, 0) ORDER BY lr.user_id ASC;",
        explanation:
          "## Approach\n\nCalculate likes received by each user's posts and compare them with likes given by that user.\n\n## Query\n\n```sql\nWITH likes_received AS (\n  SELECT p.user_id,\n         COUNT(l.user_id) AS received_count\n  FROM posts p\n  LEFT JOIN likes l ON p.id = l.post_id\n  GROUP BY p.user_id\n),\nlikes_given AS (\n  SELECT user_id,\n         COUNT(*) AS given_count\n  FROM likes\n  GROUP BY user_id\n)\nSELECT lr.user_id\nFROM likes_received lr\nLEFT JOIN likes_given lg ON lr.user_id = lg.user_id\nWHERE lr.received_count > COALESCE(lg.given_count, 0)\nORDER BY lr.user_id ASC;\n```\n\n## Explanation\n\n- `likes_received` counts likes on posts owned by each user.\n- `likes_given` counts likes each user gave.\n- `LEFT JOIN` keeps users even if they gave no likes.\n- `COALESCE(lg.given_count, 0)` treats missing given-like counts as zero.\n- The final filter keeps users who received more likes than they gave.",
      },
      {
        approach_title: "Derived compare",
        approach_type: "subquery",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT lr.user_id FROM (SELECT p.user_id, COUNT(l.user_id) AS received_count FROM posts p LEFT JOIN likes l ON p.id = l.post_id GROUP BY p.user_id) lr LEFT JOIN (SELECT user_id, COUNT(*) AS given_count FROM likes GROUP BY user_id) lg ON lr.user_id = lg.user_id WHERE lr.received_count > COALESCE(lg.given_count, 0) ORDER BY lr.user_id ASC;",
        explanation:
          "## Approach\n\nUse derived tables instead of CTEs to compute received and given like counts.\n\n## Query\n\n```sql\nSELECT lr.user_id\nFROM (\n  SELECT p.user_id,\n         COUNT(l.user_id) AS received_count\n  FROM posts p\n  LEFT JOIN likes l ON p.id = l.post_id\n  GROUP BY p.user_id\n) lr\nLEFT JOIN (\n  SELECT user_id,\n         COUNT(*) AS given_count\n  FROM likes\n  GROUP BY user_id\n) lg ON lr.user_id = lg.user_id\nWHERE lr.received_count > COALESCE(lg.given_count, 0)\nORDER BY lr.user_id ASC;\n```\n\n## Explanation\n\n- The first derived table calculates received likes.\n- The second derived table calculates given likes.\n- The same comparison and ordering are applied.\n- This returns the same result as the CTE solution.",
      },
    ],
  },
  {
    code: "SOCIAL_096",
    approaches: [
      {
        approach_title: "All allow",
        approach_type: "conditional_aggregation",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT user_id FROM posts WHERE status = 'published' GROUP BY user_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE allow_comments = true) ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nFor each user, compare all published posts with published posts that allow comments.\n\n## Query\n\n```sql\nSELECT user_id\nFROM posts\nWHERE status = 'published'\nGROUP BY user_id\nHAVING COUNT(*) = COUNT(*) FILTER (WHERE allow_comments = true)\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `status = 'published'` limits the check to published posts.\n- `COUNT(*)` counts all published posts per user.\n- `COUNT(*) FILTER (WHERE allow_comments = true)` counts only published posts that allow comments.\n- If both counts are equal, all published posts for that user allow comments.",
      },
      {
        approach_title: "Bool and",
        approach_type: "postgres_specific",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT user_id FROM posts WHERE status = 'published' GROUP BY user_id HAVING BOOL_AND(allow_comments = true) ORDER BY user_id ASC;",
        explanation:
          "## Approach\n\nUse PostgreSQL `BOOL_AND` to check that all published posts allow comments.\n\n## Query\n\n```sql\nSELECT user_id\nFROM posts\nWHERE status = 'published'\nGROUP BY user_id\nHAVING BOOL_AND(allow_comments = true)\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The `WHERE` clause uses the same published-post filter.\n- `BOOL_AND(allow_comments = true)` is true only when every row in the group allows comments.\n- The result matches the conditional aggregate version.",
      },
    ],
  },
  {
    code: "SOCIAL_097",
    approaches: [
      {
        approach_title: "Peak drop",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH daily_views AS (SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views FROM post_views GROUP BY post_id, viewed_at::date), peak_views AS (SELECT post_id, MAX(daily_views) AS peak_daily_views FROM daily_views GROUP BY post_id), peak_dates AS (SELECT dv.post_id, MIN(dv.view_date) AS peak_date FROM daily_views dv JOIN peak_views pv ON dv.post_id = pv.post_id AND dv.daily_views = pv.peak_daily_views GROUP BY dv.post_id) SELECT dv.post_id, dv.view_date, dv.daily_views, pv.peak_daily_views FROM daily_views dv JOIN peak_views pv ON dv.post_id = pv.post_id JOIN peak_dates pd ON dv.post_id = pd.post_id WHERE dv.view_date > pd.peak_date AND dv.daily_views < pv.peak_daily_views / 2.0 ORDER BY dv.post_id ASC, dv.view_date ASC;",
        explanation:
          "## Approach\n\nCompute daily views, find each post's peak, then return later days below half of that peak.\n\n## Query\n\n```sql\nWITH daily_views AS (\n  SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views\n  FROM post_views\n  GROUP BY post_id, viewed_at::date\n),\npeak_views AS (\n  SELECT post_id, MAX(daily_views) AS peak_daily_views\n  FROM daily_views\n  GROUP BY post_id\n),\npeak_dates AS (\n  SELECT dv.post_id, MIN(dv.view_date) AS peak_date\n  FROM daily_views dv\n  JOIN peak_views pv\n    ON dv.post_id = pv.post_id\n   AND dv.daily_views = pv.peak_daily_views\n  GROUP BY dv.post_id\n)\nSELECT dv.post_id, dv.view_date, dv.daily_views, pv.peak_daily_views\nFROM daily_views dv\nJOIN peak_views pv ON dv.post_id = pv.post_id\nJOIN peak_dates pd ON dv.post_id = pd.post_id\nWHERE dv.view_date > pd.peak_date\n  AND dv.daily_views < pv.peak_daily_views / 2.0\nORDER BY dv.post_id ASC, dv.view_date ASC;\n```\n\n## Explanation\n\n- `daily_views` aggregates raw views by post and date.\n- `peak_views` finds the maximum daily view count per post.\n- `peak_dates` finds the first date when that peak happened.\n- The final query keeps only days after the peak date.\n- The comparison checks for daily views below half the peak.",
      },
      {
        approach_title: "Window peak",
        approach_type: "window_functions",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH daily_views AS (SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views FROM post_views GROUP BY post_id, viewed_at::date), with_peak AS (SELECT post_id, view_date, daily_views, MAX(daily_views) OVER (PARTITION BY post_id) AS peak_daily_views FROM daily_views), peak_dates AS (SELECT post_id, MIN(view_date) AS peak_date FROM with_peak WHERE daily_views = peak_daily_views GROUP BY post_id) SELECT wp.post_id, wp.view_date, wp.daily_views, wp.peak_daily_views FROM with_peak wp JOIN peak_dates pd ON wp.post_id = pd.post_id WHERE wp.view_date > pd.peak_date AND wp.daily_views < wp.peak_daily_views / 2.0 ORDER BY wp.post_id ASC, wp.view_date ASC;",
        explanation:
          "## Approach\n\nUse a window max to attach each post's peak daily views to every daily row.\n\n## Query\n\n```sql\nWITH daily_views AS (\n  SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views\n  FROM post_views\n  GROUP BY post_id, viewed_at::date\n),\nwith_peak AS (\n  SELECT post_id,\n         view_date,\n         daily_views,\n         MAX(daily_views) OVER (PARTITION BY post_id) AS peak_daily_views\n  FROM daily_views\n),\npeak_dates AS (\n  SELECT post_id, MIN(view_date) AS peak_date\n  FROM with_peak\n  WHERE daily_views = peak_daily_views\n  GROUP BY post_id\n)\nSELECT wp.post_id, wp.view_date, wp.daily_views, wp.peak_daily_views\nFROM with_peak wp\nJOIN peak_dates pd ON wp.post_id = pd.post_id\nWHERE wp.view_date > pd.peak_date\n  AND wp.daily_views < wp.peak_daily_views / 2.0\nORDER BY wp.post_id ASC, wp.view_date ASC;\n```\n\n## Explanation\n\n- `with_peak` preserves daily rows while adding the peak value per post.\n- `peak_dates` finds the first date that hit the peak.\n- The final filter and ordering match the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_098",
    approaches: [
      {
        approach_title: "Self comment",
        approach_type: "joins",
        is_optimal: true,
        display_order: 1,
        query:
          "SELECT DISTINCT p.user_id FROM posts p JOIN comments c ON p.id = c.post_id AND p.user_id = c.user_id ORDER BY p.user_id ASC;",
        explanation:
          "## Approach\n\nJoin posts to comments and keep cases where the post author wrote the comment.\n\n## Query\n\n```sql\nSELECT DISTINCT p.user_id\nFROM posts p\nJOIN comments c\n  ON p.id = c.post_id\n AND p.user_id = c.user_id\nORDER BY p.user_id ASC;\n```\n\n## Explanation\n\n- `posts.user_id` is the post author.\n- `comments.user_id` is the comment author.\n- `p.id = c.post_id` connects comments to their posts.\n- `p.user_id = c.user_id` means the author commented on their own post.\n- `DISTINCT` returns each user only once.",
      },
      {
        approach_title: "EXISTS",
        approach_type: "exists",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT DISTINCT p.user_id FROM posts p WHERE EXISTS (SELECT 1 FROM comments c WHERE c.post_id = p.id AND c.user_id = p.user_id) ORDER BY p.user_id ASC;",
        explanation:
          "## Approach\n\nFor each post, check whether a matching self-comment exists.\n\n## Query\n\n```sql\nSELECT DISTINCT p.user_id\nFROM posts p\nWHERE EXISTS (\n  SELECT 1\n  FROM comments c\n  WHERE c.post_id = p.id\n    AND c.user_id = p.user_id\n)\nORDER BY p.user_id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the post author commented on that same post.\n- `EXISTS` keeps posts where such a comment exists.\n- `DISTINCT` returns each qualifying user once.\n- The final ordering matches the expected query.",
      },
    ],
  },
  {
    code: "SOCIAL_099",
    approaches: [
      {
        approach_title: "Message streak",
        approach_type: "window_functions",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH daily_messages AS (SELECT DISTINCT sender_id, sent_at::date AS message_date FROM messages WHERE is_deleted = false), sequenced AS (SELECT sender_id, message_date, message_date - INTERVAL '1 day' * ROW_NUMBER() OVER (PARTITION BY sender_id ORDER BY message_date) AS grp FROM daily_messages), streaks AS (SELECT sender_id FROM sequenced GROUP BY sender_id, grp HAVING COUNT(*) >= 3) SELECT sender_id FROM streaks ORDER BY sender_id ASC;",
        explanation:
          "## Approach\n\nConvert non-deleted messages into active message dates, then detect 3-day streaks.\n\n## Query\n\n```sql\nWITH daily_messages AS (\n  SELECT DISTINCT sender_id, sent_at::date AS message_date\n  FROM messages\n  WHERE is_deleted = false\n),\nsequenced AS (\n  SELECT sender_id,\n         message_date,\n         message_date - INTERVAL '1 day' * ROW_NUMBER() OVER (\n           PARTITION BY sender_id\n           ORDER BY message_date\n         ) AS grp\n  FROM daily_messages\n),\nstreaks AS (\n  SELECT sender_id\n  FROM sequenced\n  GROUP BY sender_id, grp\n  HAVING COUNT(*) >= 3\n)\nSELECT sender_id\nFROM streaks\nORDER BY sender_id ASC;\n```\n\n## Explanation\n\n- `daily_messages` keeps one row per sender per message date.\n- Multiple messages on the same day count as one active day.\n- The row-number date subtraction creates a stable group key for consecutive dates.\n- `HAVING COUNT(*) >= 3` finds streaks of at least 3 days.",
      },
      {
        approach_title: "CTE stages",
        approach_type: "cte",
        is_optimal: false,
        display_order: 2,
        query:
          "WITH daily_messages AS (SELECT DISTINCT sender_id, sent_at::date AS message_date FROM messages WHERE is_deleted = false), numbered AS (SELECT sender_id, message_date, ROW_NUMBER() OVER (PARTITION BY sender_id ORDER BY message_date) AS rn FROM daily_messages), sequenced AS (SELECT sender_id, message_date, message_date - INTERVAL '1 day' * rn AS grp FROM numbered) SELECT sender_id FROM sequenced GROUP BY sender_id, grp HAVING COUNT(*) >= 3 ORDER BY sender_id ASC;",
        explanation:
          "## Approach\n\nBreak the message streak logic into clearer CTE stages.\n\n## Query\n\n```sql\nWITH daily_messages AS (\n  SELECT DISTINCT sender_id, sent_at::date AS message_date\n  FROM messages\n  WHERE is_deleted = false\n),\nnumbered AS (\n  SELECT sender_id,\n         message_date,\n         ROW_NUMBER() OVER (PARTITION BY sender_id ORDER BY message_date) AS rn\n  FROM daily_messages\n),\nsequenced AS (\n  SELECT sender_id,\n         message_date,\n         message_date - INTERVAL '1 day' * rn AS grp\n  FROM numbered\n)\nSELECT sender_id\nFROM sequenced\nGROUP BY sender_id, grp\nHAVING COUNT(*) >= 3\nORDER BY sender_id ASC;\n```\n\n## Explanation\n\n- This uses the same distinct sender-date rows.\n- `numbered` computes the row number separately.\n- `sequenced` computes the consecutive-date group key.\n- The final grouping returns the same senders.",
      },
    ],
  },
  {
    code: "SOCIAL_100",
    approaches: [
      {
        approach_title: "Compare followers",
        approach_type: "cte",
        is_optimal: true,
        display_order: 1,
        query:
          "WITH follower_counts AS (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id), follower_avg AS (SELECT f.followee_id AS user_id, AVG(COALESCE(fc.follower_count, 0)) AS avg_follower_count FROM follows f LEFT JOIN follower_counts fc ON f.follower_id = fc.user_id WHERE f.status = 'accepted' GROUP BY f.followee_id) SELECT fc.user_id FROM follower_counts fc JOIN follower_avg fa ON fc.user_id = fa.user_id WHERE fc.follower_count > fa.avg_follower_count ORDER BY fc.user_id ASC;",
        explanation:
          "## Approach\n\nCompute each user's follower count and compare it to the average follower count of the users who follow them.\n\n## Query\n\n```sql\nWITH follower_counts AS (\n  SELECT followee_id AS user_id,\n         COUNT(*) AS follower_count\n  FROM follows\n  WHERE status = 'accepted'\n  GROUP BY followee_id\n),\nfollower_avg AS (\n  SELECT f.followee_id AS user_id,\n         AVG(COALESCE(fc.follower_count, 0)) AS avg_follower_count\n  FROM follows f\n  LEFT JOIN follower_counts fc ON f.follower_id = fc.user_id\n  WHERE f.status = 'accepted'\n  GROUP BY f.followee_id\n)\nSELECT fc.user_id\nFROM follower_counts fc\nJOIN follower_avg fa ON fc.user_id = fa.user_id\nWHERE fc.follower_count > fa.avg_follower_count\nORDER BY fc.user_id ASC;\n```\n\n## Explanation\n\n- `follower_counts` counts accepted followers for each user.\n- `follower_avg` looks at the users who follow each target user.\n- It averages those followers' own follower counts.\n- `COALESCE(..., 0)` includes followers who have zero followers themselves.\n- The final comparison keeps users more popular than their followers on average.",
      },
      {
        approach_title: "Derived compare",
        approach_type: "joins",
        is_optimal: false,
        display_order: 2,
        query:
          "SELECT fc.user_id FROM (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) fc JOIN (SELECT f.followee_id AS user_id, AVG(COALESCE(fc2.follower_count, 0)) AS avg_follower_count FROM follows f LEFT JOIN (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) fc2 ON f.follower_id = fc2.user_id WHERE f.status = 'accepted' GROUP BY f.followee_id) fa ON fc.user_id = fa.user_id WHERE fc.follower_count > fa.avg_follower_count ORDER BY fc.user_id ASC;",
        explanation:
          "## Approach\n\nUse derived aggregate tables instead of CTEs to compute the same comparison.\n\n## Query\n\n```sql\nSELECT fc.user_id\nFROM (\n  SELECT followee_id AS user_id,\n         COUNT(*) AS follower_count\n  FROM follows\n  WHERE status = 'accepted'\n  GROUP BY followee_id\n) fc\nJOIN (\n  SELECT f.followee_id AS user_id,\n         AVG(COALESCE(fc2.follower_count, 0)) AS avg_follower_count\n  FROM follows f\n  LEFT JOIN (\n    SELECT followee_id AS user_id,\n           COUNT(*) AS follower_count\n    FROM follows\n    WHERE status = 'accepted'\n    GROUP BY followee_id\n  ) fc2 ON f.follower_id = fc2.user_id\n  WHERE f.status = 'accepted'\n  GROUP BY f.followee_id\n) fa ON fc.user_id = fa.user_id\nWHERE fc.follower_count > fa.avg_follower_count\nORDER BY fc.user_id ASC;\n```\n\n## Explanation\n\n- The first derived table computes follower counts.\n- The second derived table computes the average follower count of each user's followers.\n- The final comparison and ordering match the expected query.\n- This is equivalent to the CTE approach, but harder to read.",
      },
    ],
  },
];
