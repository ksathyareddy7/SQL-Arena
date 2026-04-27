# Solutions Evaluation Report (social)

**Summary:**
- Total Approaches: 220
- Passed: 220
- Failed: 0

## Detailed Results
### ✅ PASS : SOCIAL_001 - COUNT rows
```sql
SELECT COUNT(*) AS count FROM users;
```

### ✅ PASS : SOCIAL_001 - COUNT ids
```sql
SELECT COUNT(id) AS count FROM users;
```

### ✅ PASS : SOCIAL_001 - CTE count
```sql
WITH user_count AS (SELECT COUNT(*) AS count FROM users) SELECT count FROM user_count;
```

### ✅ PASS : SOCIAL_002 - Filter count
```sql
SELECT COUNT(*) AS count FROM users WHERE is_verified = true;
```

### ✅ PASS : SOCIAL_002 - Boolean short
```sql
SELECT COUNT(*) AS count FROM users WHERE is_verified;
```

### ✅ PASS : SOCIAL_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_verified = true) AS count FROM users;
```

### ✅ PASS : SOCIAL_003 - Filter active
```sql
SELECT id, username, email, full_name FROM users WHERE is_active = true ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_003 - Boolean short
```sql
SELECT id, username, email, full_name FROM users WHERE is_active ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_003 - CTE active
```sql
WITH active_users AS (SELECT id, username, email, full_name FROM users WHERE is_active = true) SELECT id, username, email, full_name FROM active_users ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_004 - Filter status
```sql
SELECT id, username, email, account_status, created_at FROM users WHERE account_status = 'suspended' ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : SOCIAL_004 - IN status
```sql
SELECT id, username, email, account_status, created_at FROM users WHERE account_status IN ('suspended') ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : SOCIAL_004 - CTE status
```sql
WITH suspended_users AS (SELECT id, username, email, account_status, created_at FROM users WHERE account_status = 'suspended') SELECT id, username, email, account_status, created_at FROM suspended_users ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : SOCIAL_005 - Filter private
```sql
SELECT id, username, full_name, is_private FROM users WHERE is_private = true ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_005 - Boolean short
```sql
SELECT id, username, full_name, is_private FROM users WHERE is_private ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_005 - CTE private
```sql
WITH private_users AS (SELECT id, username, full_name, is_private FROM users WHERE is_private = true) SELECT id, username, full_name, is_private FROM private_users ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_006 - Sort limit
```sql
SELECT id, user_id, content, media_type, created_at FROM posts ORDER BY created_at DESC, id DESC LIMIT 5;
```

### ✅ PASS : SOCIAL_006 - Subquery top
```sql
SELECT id, user_id, content, media_type, created_at FROM (SELECT id, user_id, content, media_type, created_at FROM posts ORDER BY created_at DESC, id DESC LIMIT 5) p ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_006 - Rank top
```sql
SELECT id, user_id, content, media_type, created_at FROM (SELECT id, user_id, content, media_type, created_at, ROW_NUMBER() OVER (ORDER BY created_at DESC, id DESC) AS rn FROM posts) ranked WHERE rn <= 5 ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_007 - Filter publish
```sql
SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status = 'published' ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_007 - IN status
```sql
SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status IN ('published') ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_007 - CTE publish
```sql
WITH published_posts AS (SELECT id, user_id, content, visibility, status, created_at FROM posts WHERE status = 'published') SELECT id, user_id, content, visibility, status, created_at FROM published_posts ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_008 - Filter image
```sql
SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type = 'image' ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_008 - IN type
```sql
SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type IN ('image') ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_008 - CTE image
```sql
WITH image_posts AS (SELECT id, user_id, media_url, media_type, created_at FROM posts WHERE media_type = 'image') SELECT id, user_id, media_url, media_type, created_at FROM image_posts ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_009 - Filter visible
```sql
SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status = 'visible' ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_009 - IN status
```sql
SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status IN ('visible') ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_009 - CTE visible
```sql
WITH visible_comments AS (SELECT id, post_id, user_id, comment_text, created_at FROM comments WHERE status = 'visible') SELECT id, post_id, user_id, comment_text, created_at FROM visible_comments ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_010 - Filter unread
```sql
SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE is_read = false ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_010 - NOT read
```sql
SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE NOT is_read ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_010 - CTE unread
```sql
WITH unread_notifications AS (SELECT id, user_id, actor_id, notification_type, created_at FROM notifications WHERE is_read = false) SELECT id, user_id, actor_id, notification_type, created_at FROM unread_notifications ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_011 - Filter country
```sql
SELECT id, username, country FROM users WHERE country = 'India' ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_011 - IN country
```sql
SELECT id, username, country FROM users WHERE country IN ('India') ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_011 - CTE country
```sql
WITH india_users AS (SELECT id, username, country FROM users WHERE country = 'India') SELECT id, username, country FROM india_users ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_012 - Bio exists
```sql
SELECT id, username, bio FROM users WHERE bio IS NOT NULL ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_012 - CTE bio
```sql
WITH users_with_bio AS (SELECT id, username, bio FROM users WHERE bio IS NOT NULL) SELECT id, username, bio FROM users_with_bio ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_013 - Filter draft
```sql
SELECT id, user_id, status, created_at FROM posts WHERE status = 'draft' ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_013 - IN status
```sql
SELECT id, user_id, status, created_at FROM posts WHERE status IN ('draft') ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_013 - CTE draft
```sql
WITH draft_posts AS (SELECT id, user_id, status, created_at FROM posts WHERE status = 'draft') SELECT id, user_id, status, created_at FROM draft_posts ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_014 - Comments off
```sql
SELECT id, user_id, allow_comments FROM posts WHERE allow_comments = false ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_014 - NOT flag
```sql
SELECT id, user_id, allow_comments FROM posts WHERE NOT allow_comments ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_014 - CTE disabled
```sql
WITH disabled_posts AS (SELECT id, user_id, allow_comments FROM posts WHERE allow_comments = false) SELECT id, user_id, allow_comments FROM disabled_posts ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_015 - Zero posts
```sql
SELECT id, username, posts_count FROM users WHERE posts_count = 0 ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_015 - CTE zero
```sql
WITH no_post_users AS (SELECT id, username, posts_count FROM users WHERE posts_count = 0) SELECT id, username, posts_count FROM no_post_users ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_016 - Has followers
```sql
SELECT id, username, followers_count FROM users WHERE followers_count > 0 ORDER BY followers_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_016 - CTE followers
```sql
WITH followed_users AS (SELECT id, username, followers_count FROM users WHERE followers_count > 0) SELECT id, username, followers_count FROM followed_users ORDER BY followers_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_017 - Not expired
```sql
SELECT id, user_id, expires_at, created_at FROM stories WHERE expires_at > NOW() ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_017 - CTE active
```sql
WITH active_stories AS (SELECT id, user_id, expires_at, created_at FROM stories WHERE expires_at > NOW()) SELECT id, user_id, expires_at, created_at FROM active_stories ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_018 - Unread messages
```sql
SELECT id, sender_id, receiver_id, sent_at FROM messages WHERE read_at IS NULL ORDER BY sent_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_018 - CTE unread
```sql
WITH unread_messages AS (SELECT id, sender_id, receiver_id, sent_at FROM messages WHERE read_at IS NULL) SELECT id, sender_id, receiver_id, sent_at FROM unread_messages ORDER BY sent_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_019 - Failed logins
```sql
SELECT id, user_id, login_at, success FROM login_history WHERE success = false ORDER BY login_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_019 - NOT success
```sql
SELECT id, user_id, login_at, success FROM login_history WHERE NOT success ORDER BY login_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_019 - CTE failed
```sql
WITH failed_logins AS (SELECT id, user_id, login_at, success FROM login_history WHERE success = false) SELECT id, user_id, login_at, success FROM failed_logins ORDER BY login_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_020 - Public groups
```sql
SELECT id, name, privacy FROM groups WHERE privacy = 'public' ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_020 - IN privacy
```sql
SELECT id, name, privacy FROM groups WHERE privacy IN ('public') ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_020 - CTE public
```sql
WITH public_groups AS (SELECT id, name, privacy FROM groups WHERE privacy = 'public') SELECT id, name, privacy FROM public_groups ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_021 - Picture exists
```sql
SELECT id, username, profile_picture_url FROM users WHERE profile_picture_url IS NOT NULL ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_021 - CTE picture
```sql
WITH users_with_pictures AS (SELECT id, username, profile_picture_url FROM users WHERE profile_picture_url IS NOT NULL) SELECT id, username, profile_picture_url FROM users_with_pictures ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_022 - Location exists
```sql
SELECT id, user_id, location FROM posts WHERE location IS NOT NULL ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_022 - CTE location
```sql
WITH located_posts AS (SELECT id, user_id, location FROM posts WHERE location IS NOT NULL) SELECT id, user_id, location FROM located_posts ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_023 - Filter archived
```sql
SELECT id, user_id, status, created_at FROM posts WHERE status = 'archived' ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_023 - IN status
```sql
SELECT id, user_id, status, created_at FROM posts WHERE status IN ('archived') ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_023 - CTE archived
```sql
WITH archived_posts AS (SELECT id, user_id, status, created_at FROM posts WHERE status = 'archived') SELECT id, user_id, status, created_at FROM archived_posts ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_024 - Filter deleted
```sql
SELECT id, post_id, user_id, status, created_at FROM comments WHERE status = 'deleted' ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_024 - IN status
```sql
SELECT id, post_id, user_id, status, created_at FROM comments WHERE status IN ('deleted') ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_024 - CTE deleted
```sql
WITH deleted_comments AS (SELECT id, post_id, user_id, status, created_at FROM comments WHERE status = 'deleted') SELECT id, post_id, user_id, status, created_at FROM deleted_comments ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_025 - List blocks
```sql
SELECT blocker_id, blocked_id FROM user_blocks ORDER BY blocker_id ASC, blocked_id ASC;
```

### ✅ PASS : SOCIAL_025 - CTE blocks
```sql
WITH blocks AS (SELECT blocker_id, blocked_id FROM user_blocks) SELECT blocker_id, blocked_id FROM blocks ORDER BY blocker_id ASC, blocked_id ASC;
```

### ✅ PASS : SOCIAL_026 - Filter source
```sql
SELECT id, username, signup_source FROM users WHERE signup_source = 'google' ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_026 - IN source
```sql
SELECT id, username, signup_source FROM users WHERE signup_source IN ('google') ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_026 - CTE source
```sql
WITH google_users AS (SELECT id, username, signup_source FROM users WHERE signup_source = 'google') SELECT id, username, signup_source FROM google_users ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_027 - Login exists
```sql
SELECT id, username, last_login_at FROM users WHERE last_login_at IS NOT NULL ORDER BY last_login_at DESC, id ASC;
```

### ✅ PASS : SOCIAL_027 - CTE login
```sql
WITH logged_in_users AS (SELECT id, username, last_login_at FROM users WHERE last_login_at IS NOT NULL) SELECT id, username, last_login_at FROM logged_in_users ORDER BY last_login_at DESC, id ASC;
```

### ✅ PASS : SOCIAL_028 - Filter video
```sql
SELECT id, user_id, media_type FROM posts WHERE media_type = 'video' ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_028 - IN type
```sql
SELECT id, user_id, media_type FROM posts WHERE media_type IN ('video') ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_028 - CTE video
```sql
WITH video_posts AS (SELECT id, user_id, media_type FROM posts WHERE media_type = 'video') SELECT id, user_id, media_type FROM video_posts ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_029 - List members
```sql
SELECT group_id, user_id, role FROM group_members ORDER BY group_id ASC, user_id ASC;
```

### ✅ PASS : SOCIAL_029 - CTE members
```sql
WITH members AS (SELECT group_id, user_id, role FROM group_members) SELECT group_id, user_id, role FROM members ORDER BY group_id ASC, user_id ASC;
```

### ✅ PASS : SOCIAL_030 - List mentions
```sql
SELECT post_id, mentioned_user_id FROM post_mentions ORDER BY post_id ASC, mentioned_user_id ASC;
```

### ✅ PASS : SOCIAL_030 - CTE mentions
```sql
WITH mentions AS (SELECT post_id, mentioned_user_id FROM post_mentions) SELECT post_id, mentioned_user_id FROM mentions ORDER BY post_id ASC, mentioned_user_id ASC;
```

### ✅ PASS : SOCIAL_031 - List mentions
```sql
SELECT comment_id, mentioned_user_id FROM comment_mentions ORDER BY comment_id ASC, mentioned_user_id ASC;
```

### ✅ PASS : SOCIAL_031 - CTE mentions
```sql
WITH mentions AS (SELECT comment_id, mentioned_user_id FROM comment_mentions) SELECT comment_id, mentioned_user_id FROM mentions ORDER BY comment_id ASC, mentioned_user_id ASC;
```

### ✅ PASS : SOCIAL_032 - Filter open
```sql
SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status = 'open' ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_032 - IN status
```sql
SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status IN ('open') ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_032 - CTE open
```sql
WITH open_reports AS (SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM reports WHERE status = 'open') SELECT id, reporter_id, reported_user_id, post_id, comment_id, reason, created_at FROM open_reports ORDER BY created_at DESC, id DESC;
```

### ✅ PASS : SOCIAL_033 - Filter active
```sql
SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status = 'active' ORDER BY start_date ASC, id ASC;
```

### ✅ PASS : SOCIAL_033 - IN status
```sql
SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status IN ('active') ORDER BY start_date ASC, id ASC;
```

### ✅ PASS : SOCIAL_033 - CTE active
```sql
WITH active_campaigns AS (SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM ad_campaigns WHERE status = 'active') SELECT id, advertiser_user_id, campaign_name, budget, start_date, end_date FROM active_campaigns ORDER BY start_date ASC, id ASC;
```

### ✅ PASS : SOCIAL_034 - Filter spend
```sql
SELECT id, campaign_id, post_id, spend FROM promoted_posts WHERE spend > 0 ORDER BY spend DESC, id ASC;
```

### ✅ PASS : SOCIAL_034 - CTE spend
```sql
WITH spent_posts AS (SELECT id, campaign_id, post_id, spend FROM promoted_posts WHERE spend > 0) SELECT id, campaign_id, post_id, spend FROM spent_posts ORDER BY spend DESC, id ASC;
```

### ✅ PASS : SOCIAL_035 - Sort limit
```sql
SELECT id, user_id, view_count FROM posts ORDER BY view_count DESC, id ASC LIMIT 10;
```

### ✅ PASS : SOCIAL_035 - Rank top
```sql
SELECT id, user_id, view_count FROM (SELECT id, user_id, view_count, ROW_NUMBER() OVER (ORDER BY view_count DESC, id ASC) AS rn FROM posts) ranked WHERE rn <= 10 ORDER BY view_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_035 - Subquery top
```sql
SELECT id, user_id, view_count FROM (SELECT id, user_id, view_count FROM posts ORDER BY view_count DESC, id ASC LIMIT 10) p ORDER BY view_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_036 - Group status
```sql
SELECT status, COUNT(*) AS post_count FROM posts GROUP BY status ORDER BY status ASC;
```

### ✅ PASS : SOCIAL_036 - CTE count
```sql
WITH status_counts AS (SELECT status, COUNT(*) AS post_count FROM posts GROUP BY status) SELECT status, post_count FROM status_counts ORDER BY status ASC;
```

### ✅ PASS : SOCIAL_037 - Group country
```sql
SELECT country, COUNT(*) AS user_count FROM users WHERE country IS NOT NULL GROUP BY country ORDER BY user_count DESC, country ASC;
```

### ✅ PASS : SOCIAL_037 - CTE count
```sql
WITH country_counts AS (SELECT country, COUNT(*) AS user_count FROM users WHERE country IS NOT NULL GROUP BY country) SELECT country, user_count FROM country_counts ORDER BY user_count DESC, country ASC;
```

### ✅ PASS : SOCIAL_038 - Average views
```sql
SELECT media_type, AVG(view_count) AS avg_view_count FROM posts GROUP BY media_type ORDER BY media_type ASC;
```

### ✅ PASS : SOCIAL_038 - CTE average
```sql
WITH media_averages AS (SELECT media_type, AVG(view_count) AS avg_view_count FROM posts GROUP BY media_type) SELECT media_type, avg_view_count FROM media_averages ORDER BY media_type ASC;
```

### ✅ PASS : SOCIAL_039 - Count followers
```sql
SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id ORDER BY follower_count DESC, followee_id ASC;
```

### ✅ PASS : SOCIAL_039 - CTE count
```sql
WITH follower_counts AS (SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) SELECT followee_id, follower_count FROM follower_counts ORDER BY follower_count DESC, followee_id ASC;
```

### ✅ PASS : SOCIAL_040 - Count comments
```sql
SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id ORDER BY comment_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_040 - CTE count
```sql
WITH comment_counts AS (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) SELECT post_id, comment_count FROM comment_counts ORDER BY comment_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_041 - Count likes
```sql
SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id ORDER BY like_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_041 - CTE count
```sql
WITH like_counts AS (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) SELECT post_id, like_count FROM like_counts ORDER BY like_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_042 - Count distinct
```sql
SELECT post_id, COUNT(DISTINCT user_id) AS distinct_likers FROM likes GROUP BY post_id ORDER BY distinct_likers DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_042 - Pre-dedupe
```sql
SELECT post_id, COUNT(*) AS distinct_likers FROM (SELECT DISTINCT post_id, user_id FROM likes) deduped GROUP BY post_id ORDER BY distinct_likers DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_043 - Count posts
```sql
SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id ORDER BY post_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_043 - CTE count
```sql
WITH post_counts AS (SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id) SELECT user_id, post_count FROM post_counts ORDER BY post_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_044 - Count comments
```sql
SELECT user_id, COUNT(*) AS comment_count FROM comments GROUP BY user_id ORDER BY comment_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_044 - CTE count
```sql
WITH comment_counts AS (SELECT user_id, COUNT(*) AS comment_count FROM comments GROUP BY user_id) SELECT user_id, comment_count FROM comment_counts ORDER BY comment_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_045 - Having likes
```sql
SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id HAVING COUNT(*) > 100 ORDER BY like_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_045 - CTE filter
```sql
WITH like_counts AS (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) SELECT post_id, like_count FROM like_counts WHERE like_count > 100 ORDER BY like_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_046 - Having devices
```sql
SELECT user_id, COUNT(*) AS device_count FROM user_devices GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY device_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_046 - CTE filter
```sql
WITH device_counts AS (SELECT user_id, COUNT(*) AS device_count FROM user_devices GROUP BY user_id) SELECT user_id, device_count FROM device_counts WHERE device_count > 1 ORDER BY device_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_047 - Count bookmarks
```sql
SELECT user_id, COUNT(*) AS bookmark_count FROM bookmarks GROUP BY user_id ORDER BY bookmark_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_047 - CTE count
```sql
WITH bookmark_counts AS (SELECT user_id, COUNT(*) AS bookmark_count FROM bookmarks GROUP BY user_id) SELECT user_id, bookmark_count FROM bookmark_counts ORDER BY bookmark_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_048 - Count shares
```sql
SELECT post_id, COUNT(*) AS share_count FROM post_shares GROUP BY post_id ORDER BY share_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_048 - CTE count
```sql
WITH share_counts AS (SELECT post_id, COUNT(*) AS share_count FROM post_shares GROUP BY post_id) SELECT post_id, share_count FROM share_counts ORDER BY share_count DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_049 - Count views
```sql
SELECT story_id, COUNT(*) AS view_count FROM story_views GROUP BY story_id ORDER BY view_count DESC, story_id ASC;
```

### ✅ PASS : SOCIAL_049 - CTE count
```sql
WITH story_view_counts AS (SELECT story_id, COUNT(*) AS view_count FROM story_views GROUP BY story_id) SELECT story_id, view_count FROM story_view_counts ORDER BY view_count DESC, story_id ASC;
```

### ✅ PASS : SOCIAL_050 - Count messages
```sql
SELECT sender_id, COUNT(*) AS message_count FROM messages GROUP BY sender_id ORDER BY message_count DESC, sender_id ASC;
```

### ✅ PASS : SOCIAL_050 - CTE count
```sql
WITH message_counts AS (SELECT sender_id, COUNT(*) AS message_count FROM messages GROUP BY sender_id) SELECT sender_id, message_count FROM message_counts ORDER BY message_count DESC, sender_id ASC;
```

### ✅ PASS : SOCIAL_051 - Count followers
```sql
SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id ORDER BY follower_count DESC, followee_id ASC;
```

### ✅ PASS : SOCIAL_051 - CTE count
```sql
WITH follower_counts AS (SELECT followee_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) SELECT followee_id, follower_count FROM follower_counts ORDER BY follower_count DESC, followee_id ASC;
```

### ✅ PASS : SOCIAL_052 - Count following
```sql
SELECT follower_id, COUNT(*) AS following_count FROM follows WHERE status = 'accepted' GROUP BY follower_id ORDER BY following_count DESC, follower_id ASC;
```

### ✅ PASS : SOCIAL_052 - CTE count
```sql
WITH following_counts AS (SELECT follower_id, COUNT(*) AS following_count FROM follows WHERE status = 'accepted' GROUP BY follower_id) SELECT follower_id, following_count FROM following_counts ORDER BY following_count DESC, follower_id ASC;
```

### ✅ PASS : SOCIAL_053 - Average comments
```sql
SELECT AVG(comment_count) AS avg_comments FROM (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) sub;
```

### ✅ PASS : SOCIAL_053 - CTE average
```sql
WITH comment_counts AS (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) SELECT AVG(comment_count) AS avg_comments FROM comment_counts;
```

### ✅ PASS : SOCIAL_054 - Pre-aggregate
```sql
SELECT p.id AS post_id FROM posts p LEFT JOIN (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id) l ON p.id = l.post_id LEFT JOIN (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) c ON p.id = c.post_id WHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0) ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_054 - CTE compare
```sql
WITH like_counts AS (SELECT post_id, COUNT(*) AS like_count FROM likes GROUP BY post_id), comment_counts AS (SELECT post_id, COUNT(*) AS comment_count FROM comments WHERE status = 'visible' GROUP BY post_id) SELECT p.id AS post_id FROM posts p LEFT JOIN like_counts l ON p.id = l.post_id LEFT JOIN comment_counts c ON p.id = c.post_id WHERE COALESCE(c.comment_count, 0) > COALESCE(l.like_count, 0) ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_055 - Compare counts
```sql
SELECT id, followers_count, following_count FROM users WHERE followers_count > following_count ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_055 - CTE compare
```sql
WITH user_counts AS (SELECT id, followers_count, following_count FROM users) SELECT id, followers_count, following_count FROM user_counts WHERE followers_count > following_count ORDER BY id ASC;
```

### ✅ PASS : SOCIAL_056 - Having posts
```sql
SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id HAVING COUNT(*) >= 10 ORDER BY post_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_056 - CTE filter
```sql
WITH post_counts AS (SELECT user_id, COUNT(*) AS post_count FROM posts GROUP BY user_id) SELECT user_id, post_count FROM post_counts WHERE post_count >= 10 ORDER BY post_count DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_057 - Anti join
```sql
SELECT p.id AS post_id FROM posts p LEFT JOIN comments c ON p.id = c.post_id AND c.status = 'visible' WHERE c.id IS NULL ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_057 - NOT EXISTS
```sql
SELECT p.id AS post_id FROM posts p WHERE NOT EXISTS (SELECT 1 FROM comments c WHERE c.post_id = p.id AND c.status = 'visible') ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_058 - Anti join
```sql
SELECT u.id FROM users u LEFT JOIN login_history lh ON u.id = lh.user_id AND lh.success = true WHERE lh.id IS NULL ORDER BY u.id ASC;
```

### ✅ PASS : SOCIAL_058 - NOT EXISTS
```sql
SELECT u.id FROM users u WHERE NOT EXISTS (SELECT 1 FROM login_history lh WHERE lh.user_id = u.id AND lh.success = true) ORDER BY u.id ASC;
```

### ✅ PASS : SOCIAL_059 - Distinct having
```sql
SELECT post_id FROM likes GROUP BY post_id HAVING COUNT(DISTINCT user_id) >= 3 ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_059 - Pre-dedupe
```sql
SELECT post_id FROM (SELECT DISTINCT post_id, user_id FROM likes) deduped GROUP BY post_id HAVING COUNT(*) >= 3 ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_060 - Distinct posts
```sql
SELECT user_id FROM comments GROUP BY user_id HAVING COUNT(DISTINCT post_id) >= 2 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_060 - Pre-dedupe
```sql
SELECT user_id FROM (SELECT DISTINCT user_id, post_id FROM comments) deduped GROUP BY user_id HAVING COUNT(*) >= 2 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_061 - Anti join
```sql
SELECT p.id AS post_id FROM posts p LEFT JOIN likes l ON p.id = l.post_id WHERE l.post_id IS NULL ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_061 - NOT EXISTS
```sql
SELECT p.id AS post_id FROM posts p WHERE NOT EXISTS (SELECT 1 FROM likes l WHERE l.post_id = p.id) ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_062 - Distinct users
```sql
SELECT DISTINCT follower_id FROM follows WHERE status = 'pending' ORDER BY follower_id ASC;
```

### ✅ PASS : SOCIAL_062 - Group users
```sql
SELECT follower_id FROM follows WHERE status = 'pending' GROUP BY follower_id ORDER BY follower_id ASC;
```

### ✅ PASS : SOCIAL_063 - Distinct users
```sql
SELECT DISTINCT followee_id FROM follows WHERE status = 'blocked' ORDER BY followee_id ASC;
```

### ✅ PASS : SOCIAL_063 - Group users
```sql
SELECT followee_id FROM follows WHERE status = 'blocked' GROUP BY followee_id ORDER BY followee_id ASC;
```

### ✅ PASS : SOCIAL_064 - Max login
```sql
SELECT user_id, MAX(login_at) AS last_successful_login FROM login_history WHERE success = true GROUP BY user_id ORDER BY last_successful_login DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_064 - CTE max
```sql
WITH successful_logins AS (SELECT user_id, MAX(login_at) AS last_successful_login FROM login_history WHERE success = true GROUP BY user_id) SELECT user_id, last_successful_login FROM successful_logins ORDER BY last_successful_login DESC, user_id ASC;
```

### ✅ PASS : SOCIAL_065 - Daily count
```sql
SELECT created_at::date AS signup_date, COUNT(*) AS user_count FROM users GROUP BY created_at::date ORDER BY signup_date ASC;
```

### ✅ PASS : SOCIAL_065 - DATE count
```sql
SELECT DATE(created_at) AS signup_date, COUNT(*) AS user_count FROM users GROUP BY DATE(created_at) ORDER BY signup_date ASC;
```

### ✅ PASS : SOCIAL_066 - Daily count
```sql
SELECT created_at::date AS post_date, COUNT(*) AS post_count FROM posts WHERE status = 'published' GROUP BY created_at::date ORDER BY post_date ASC;
```

### ✅ PASS : SOCIAL_066 - DATE count
```sql
SELECT DATE(created_at) AS post_date, COUNT(*) AS post_count FROM posts WHERE status = 'published' GROUP BY DATE(created_at) ORDER BY post_date ASC;
```

### ✅ PASS : SOCIAL_067 - Count usage
```sql
SELECT hashtag_id, COUNT(*) AS usage_count FROM post_hashtags GROUP BY hashtag_id ORDER BY usage_count DESC, hashtag_id ASC;
```

### ✅ PASS : SOCIAL_067 - CTE count
```sql
WITH hashtag_usage AS (SELECT hashtag_id, COUNT(*) AS usage_count FROM post_hashtags GROUP BY hashtag_id) SELECT hashtag_id, usage_count FROM hashtag_usage ORDER BY usage_count DESC, hashtag_id ASC;
```

### ✅ PASS : SOCIAL_068 - Distinct posts
```sql
SELECT DISTINCT post_id FROM post_shares WHERE share_type = 'external' ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_068 - Group posts
```sql
SELECT post_id FROM post_shares WHERE share_type = 'external' GROUP BY post_id ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_069 - Distinct receivers
```sql
SELECT sender_id FROM messages WHERE is_deleted = false GROUP BY sender_id HAVING COUNT(DISTINCT receiver_id) >= 2 ORDER BY sender_id ASC;
```

### ✅ PASS : SOCIAL_069 - Pre-dedupe
```sql
SELECT sender_id FROM (SELECT DISTINCT sender_id, receiver_id FROM messages WHERE is_deleted = false) deduped GROUP BY sender_id HAVING COUNT(*) >= 2 ORDER BY sender_id ASC;
```

### ✅ PASS : SOCIAL_070 - Count reasons
```sql
SELECT reason, COUNT(*) AS report_count FROM reports WHERE reason IS NOT NULL GROUP BY reason ORDER BY report_count DESC, reason ASC;
```

### ✅ PASS : SOCIAL_070 - CTE count
```sql
WITH reason_counts AS (SELECT reason, COUNT(*) AS report_count FROM reports WHERE reason IS NOT NULL GROUP BY reason) SELECT reason, report_count FROM reason_counts ORDER BY report_count DESC, reason ASC;
```

### ✅ PASS : SOCIAL_071 - Count media
```sql
SELECT media_type, COUNT(*) AS post_count FROM posts GROUP BY media_type ORDER BY media_type ASC;
```

### ✅ PASS : SOCIAL_071 - CTE count
```sql
WITH media_counts AS (SELECT media_type, COUNT(*) AS post_count FROM posts GROUP BY media_type) SELECT media_type, post_count FROM media_counts ORDER BY media_type ASC;
```

### ✅ PASS : SOCIAL_072 - Count source
```sql
SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;
```

### ✅ PASS : SOCIAL_072 - CTE count
```sql
WITH source_counts AS (SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source) SELECT signup_source, user_count FROM source_counts ORDER BY user_count DESC, signup_source ASC;
```

### ✅ PASS : SOCIAL_073 - Count type
```sql
SELECT notification_type, COUNT(*) AS notification_count FROM notifications WHERE notification_type IS NOT NULL GROUP BY notification_type ORDER BY notification_count DESC, notification_type ASC;
```

### ✅ PASS : SOCIAL_073 - CTE count
```sql
WITH type_counts AS (SELECT notification_type, COUNT(*) AS notification_count FROM notifications WHERE notification_type IS NOT NULL GROUP BY notification_type) SELECT notification_type, notification_count FROM type_counts ORDER BY notification_count DESC, notification_type ASC;
```

### ✅ PASS : SOCIAL_074 - Average watch
```sql
SELECT post_id, AVG(watch_seconds) AS avg_watch_seconds FROM post_views WHERE watch_seconds IS NOT NULL GROUP BY post_id ORDER BY avg_watch_seconds DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_074 - CTE average
```sql
WITH watch_averages AS (SELECT post_id, AVG(watch_seconds) AS avg_watch_seconds FROM post_views WHERE watch_seconds IS NOT NULL GROUP BY post_id) SELECT post_id, avg_watch_seconds FROM watch_averages ORDER BY avg_watch_seconds DESC, post_id ASC;
```

### ✅ PASS : SOCIAL_075 - Sum spend
```sql
SELECT campaign_id, SUM(spend) AS total_spend FROM promoted_posts GROUP BY campaign_id ORDER BY total_spend DESC, campaign_id ASC;
```

### ✅ PASS : SOCIAL_075 - CTE sum
```sql
WITH campaign_spend AS (SELECT campaign_id, SUM(spend) AS total_spend FROM promoted_posts GROUP BY campaign_id) SELECT campaign_id, total_spend FROM campaign_spend ORDER BY total_spend DESC, campaign_id ASC;
```

### ✅ PASS : SOCIAL_076 - CTR calc
```sql
SELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr FROM promoted_posts WHERE impressions > 0 ORDER BY ctr DESC, id ASC;
```

### ✅ PASS : SOCIAL_076 - CTE CTR
```sql
WITH ctr_rows AS (SELECT id, campaign_id, post_id, clicks::numeric / impressions AS ctr FROM promoted_posts WHERE impressions > 0) SELECT id, campaign_id, post_id, ctr FROM ctr_rows ORDER BY ctr DESC, id ASC;
```

### ✅ PASS : SOCIAL_077 - Above average
```sql
SELECT id, user_id, view_count FROM posts WHERE view_count > (SELECT AVG(view_count) FROM posts) ORDER BY view_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_077 - CTE average
```sql
WITH avg_views AS (SELECT AVG(view_count) AS avg_view_count FROM posts) SELECT p.id, p.user_id, p.view_count FROM posts p CROSS JOIN avg_views a WHERE p.view_count > a.avg_view_count ORDER BY p.view_count DESC, p.id ASC;
```

### ✅ PASS : SOCIAL_078 - Above average
```sql
SELECT id, username, followers_count FROM users WHERE followers_count > (SELECT AVG(followers_count) FROM users) ORDER BY followers_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_078 - CTE average
```sql
WITH avg_followers AS (SELECT AVG(followers_count) AS avg_followers_count FROM users) SELECT u.id, u.username, u.followers_count FROM users u CROSS JOIN avg_followers a WHERE u.followers_count > a.avg_followers_count ORDER BY u.followers_count DESC, u.id ASC;
```

### ✅ PASS : SOCIAL_079 - Engagement calc
```sql
SELECT id, user_id, like_count + comment_count + share_count AS engagement_count FROM posts ORDER BY engagement_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_079 - CTE calc
```sql
WITH post_engagement AS (SELECT id, user_id, like_count + comment_count + share_count AS engagement_count FROM posts) SELECT id, user_id, engagement_count FROM post_engagement ORDER BY engagement_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_080 - FILTER counts
```sql
SELECT user_id, COUNT(*) FILTER (WHERE success = false) AS failed_logins, COUNT(*) FILTER (WHERE success = true) AS successful_logins FROM login_history GROUP BY user_id HAVING COUNT(*) FILTER (WHERE success = false) > COUNT(*) FILTER (WHERE success = true) ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_080 - CASE counts
```sql
SELECT user_id, SUM(CASE WHEN success = false THEN 1 ELSE 0 END) AS failed_logins, SUM(CASE WHEN success = true THEN 1 ELSE 0 END) AS successful_logins FROM login_history GROUP BY user_id HAVING SUM(CASE WHEN success = false THEN 1 ELSE 0 END) > SUM(CASE WHEN success = true THEN 1 ELSE 0 END) ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_081 - Rank posts
```sql
SELECT user_id, id, view_count FROM (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) t WHERE rn <= 3 ORDER BY user_id ASC, view_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_081 - CTE rank
```sql
WITH ranked_posts AS (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) SELECT user_id, id, view_count FROM ranked_posts WHERE rn <= 3 ORDER BY user_id ASC, view_count DESC, id ASC;
```

### ✅ PASS : SOCIAL_082 - Streak group
```sql
WITH daily_logins AS (SELECT DISTINCT user_id, login_at::date AS d FROM login_history WHERE success = true), seq AS (SELECT user_id, d, d - INTERVAL '1 day' * ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS grp FROM daily_logins) SELECT user_id FROM seq GROUP BY user_id, grp HAVING COUNT(*) >= 3 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_082 - CTE stages
```sql
WITH daily_logins AS (SELECT DISTINCT user_id, login_at::date AS d FROM login_history WHERE success = true), numbered AS (SELECT user_id, d, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS rn FROM daily_logins), streaks AS (SELECT user_id, d, d - INTERVAL '1 day' * rn AS grp FROM numbered) SELECT user_id FROM streaks GROUP BY user_id, grp HAVING COUNT(*) >= 3 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_083 - User average
```sql
SELECT id, user_id FROM posts p WHERE like_count > (SELECT AVG(p2.like_count) FROM posts p2 WHERE p2.user_id = p.user_id) ORDER BY user_id ASC, id ASC;
```

### ✅ PASS : SOCIAL_083 - Window average
```sql
SELECT id, user_id FROM (SELECT id, user_id, like_count, AVG(like_count) OVER (PARTITION BY user_id) AS avg_like_count FROM posts) p WHERE like_count > avg_like_count ORDER BY user_id ASC, id ASC;
```

### ✅ PASS : SOCIAL_084 - All verified
```sql
SELECT f.follower_id FROM follows f JOIN users u ON f.followee_id = u.id WHERE f.status = 'accepted' GROUP BY f.follower_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE u.is_verified = true) ORDER BY f.follower_id ASC;
```

### ✅ PASS : SOCIAL_084 - Bool and
```sql
SELECT f.follower_id FROM follows f JOIN users u ON f.followee_id = u.id WHERE f.status = 'accepted' GROUP BY f.follower_id HAVING BOOL_AND(u.is_verified = true) ORDER BY f.follower_id ASC;
```

### ✅ PASS : SOCIAL_085 - Increasing views
```sql
WITH daily_views AS (SELECT post_id, viewed_at::date AS d, COUNT(*) AS cnt FROM post_views GROUP BY post_id, viewed_at::date), flagged AS (SELECT post_id, d, cnt, CASE WHEN cnt > LAG(cnt) OVER (PARTITION BY post_id ORDER BY d) THEN 1 ELSE 0 END AS inc FROM daily_views), grp AS (SELECT post_id, d, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY d) - ROW_NUMBER() OVER (PARTITION BY post_id, inc ORDER BY d) AS g FROM flagged WHERE inc = 1) SELECT post_id FROM grp GROUP BY post_id, g HAVING COUNT(*) >= 3 ORDER BY post_id ASC;
```

### ✅ PASS : SOCIAL_086 - Rank country
```sql
WITH engagement AS (SELECT p.user_id, SUM(p.like_count + p.comment_count) AS total_engagement FROM posts p GROUP BY p.user_id), ranked AS (SELECT u.country, e.user_id, e.total_engagement, ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY e.total_engagement DESC, e.user_id ASC) AS rn FROM engagement e JOIN users u ON e.user_id = u.id) SELECT country, user_id, total_engagement FROM ranked WHERE rn = 1 ORDER BY country ASC, user_id ASC;
```

### ✅ PASS : SOCIAL_086 - Distinct on
```sql
WITH engagement AS (SELECT p.user_id, SUM(p.like_count + p.comment_count) AS total_engagement FROM posts p GROUP BY p.user_id) SELECT country, user_id, total_engagement FROM (SELECT DISTINCT ON (u.country) u.country, e.user_id, e.total_engagement FROM engagement e JOIN users u ON e.user_id = u.id ORDER BY u.country ASC, e.total_engagement DESC, e.user_id ASC) t ORDER BY country ASC, user_id ASC;
```

### ✅ PASS : SOCIAL_087 - Monthly growth
```sql
WITH monthly AS (SELECT followee_id AS user_id, DATE_TRUNC('month', created_at) AS m, COUNT(*) AS cnt FROM follows WHERE status = 'accepted' GROUP BY followee_id, DATE_TRUNC('month', created_at)), flagged AS (SELECT user_id, m, cnt, CASE WHEN cnt > LAG(cnt) OVER (PARTITION BY user_id ORDER BY m) THEN 1 ELSE 0 END AS inc FROM monthly), grp AS (SELECT user_id, m, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY m) - ROW_NUMBER() OVER (PARTITION BY user_id, inc ORDER BY m) AS g FROM flagged WHERE inc = 1) SELECT user_id FROM grp GROUP BY user_id, g HAVING COUNT(*) >= 3 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_088 - Top commenter
```sql
WITH counts AS (SELECT post_id, user_id, COUNT(*) AS cnt FROM comments GROUP BY post_id, user_id), ranked AS (SELECT post_id, user_id, cnt, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY cnt DESC, user_id ASC) AS rn FROM counts) SELECT post_id, user_id, cnt FROM ranked WHERE rn = 1 ORDER BY post_id ASC, user_id ASC;
```

### ✅ PASS : SOCIAL_088 - Distinct on
```sql
WITH counts AS (SELECT post_id, user_id, COUNT(*) AS cnt FROM comments GROUP BY post_id, user_id) SELECT post_id, user_id, cnt FROM (SELECT DISTINCT ON (post_id) post_id, user_id, cnt FROM counts ORDER BY post_id ASC, cnt DESC, user_id ASC) t ORDER BY post_id ASC, user_id ASC;
```

### ✅ PASS : SOCIAL_089 - Anti joins
```sql
SELECT u.id FROM users u LEFT JOIN posts p ON u.id = p.user_id LEFT JOIN comments c ON u.id = c.user_id LEFT JOIN likes l ON u.id = l.user_id WHERE p.id IS NULL AND c.id IS NULL AND l.user_id IS NULL ORDER BY u.id ASC;
```

### ✅ PASS : SOCIAL_089 - NOT EXISTS
```sql
SELECT u.id FROM users u WHERE NOT EXISTS (SELECT 1 FROM posts p WHERE p.user_id = u.id) AND NOT EXISTS (SELECT 1 FROM comments c WHERE c.user_id = u.id) AND NOT EXISTS (SELECT 1 FROM likes l WHERE l.user_id = u.id) ORDER BY u.id ASC;
```

### ✅ PASS : SOCIAL_090 - Self join
```sql
SELECT DISTINCT f1.follower_id AS user_id FROM follows f1 JOIN follows f2 ON f1.follower_id = f2.followee_id AND f1.followee_id = f2.follower_id WHERE f1.status = 'accepted' AND f2.status = 'accepted' ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_090 - EXISTS
```sql
SELECT DISTINCT f.follower_id AS user_id FROM follows f WHERE f.status = 'accepted' AND EXISTS (SELECT 1 FROM follows r WHERE r.follower_id = f.followee_id AND r.followee_id = f.follower_id AND r.status = 'accepted') ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_091 - Pre-agg avg
```sql
WITH media_avg AS (SELECT media_type, AVG(like_count + comment_count + share_count) AS avg_engagement FROM posts GROUP BY media_type) SELECT p.id, p.media_type, p.like_count + p.comment_count + p.share_count AS engagement_count FROM posts p JOIN media_avg ma ON p.media_type = ma.media_type WHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement ORDER BY p.media_type ASC, p.id ASC;
```

### ✅ PASS : SOCIAL_091 - Derived avg
```sql
SELECT p.id, p.media_type, p.like_count + p.comment_count + p.share_count AS engagement_count FROM posts p JOIN (SELECT media_type, AVG(like_count + comment_count + share_count) AS avg_engagement FROM posts GROUP BY media_type) ma ON p.media_type = ma.media_type WHERE p.like_count + p.comment_count + p.share_count > ma.avg_engagement ORDER BY p.media_type ASC, p.id ASC;
```

### ✅ PASS : SOCIAL_092 - Distinct languages
```sql
SELECT user_id FROM posts WHERE status = 'published' AND language_code IS NOT NULL GROUP BY user_id HAVING COUNT(DISTINCT language_code) >= 2 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_092 - Pre-dedupe
```sql
SELECT user_id FROM (SELECT DISTINCT user_id, language_code FROM posts WHERE status = 'published' AND language_code IS NOT NULL) deduped GROUP BY user_id HAVING COUNT(*) >= 2 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_093 - Second post
```sql
SELECT user_id, id AS post_id, view_count FROM (SELECT user_id, id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) ranked WHERE rn = 2 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_093 - CTE rank
```sql
WITH ranked_posts AS (SELECT user_id, id AS post_id, view_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY view_count DESC, id ASC) AS rn FROM posts) SELECT user_id, post_id, view_count FROM ranked_posts WHERE rn = 2 ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_094 - Top hashtag
```sql
WITH hashtag_usage AS (SELECT p.media_type, ph.hashtag_id, COUNT(*) AS usage_count FROM posts p JOIN post_hashtags ph ON p.id = ph.post_id GROUP BY p.media_type, ph.hashtag_id), ranked AS (SELECT media_type, hashtag_id, usage_count, ROW_NUMBER() OVER (PARTITION BY media_type ORDER BY usage_count DESC, hashtag_id ASC) AS rn FROM hashtag_usage) SELECT media_type, hashtag_id, usage_count FROM ranked WHERE rn = 1 ORDER BY media_type ASC, hashtag_id ASC;
```

### ✅ PASS : SOCIAL_094 - Distinct on
```sql
WITH hashtag_usage AS (SELECT p.media_type, ph.hashtag_id, COUNT(*) AS usage_count FROM posts p JOIN post_hashtags ph ON p.id = ph.post_id GROUP BY p.media_type, ph.hashtag_id) SELECT media_type, hashtag_id, usage_count FROM (SELECT DISTINCT ON (media_type) media_type, hashtag_id, usage_count FROM hashtag_usage ORDER BY media_type ASC, usage_count DESC, hashtag_id ASC) t ORDER BY media_type ASC, hashtag_id ASC;
```

### ✅ PASS : SOCIAL_095 - Compare likes
```sql
WITH likes_received AS (SELECT p.user_id, COUNT(l.user_id) AS received_count FROM posts p LEFT JOIN likes l ON p.id = l.post_id GROUP BY p.user_id), likes_given AS (SELECT user_id, COUNT(*) AS given_count FROM likes GROUP BY user_id) SELECT lr.user_id FROM likes_received lr LEFT JOIN likes_given lg ON lr.user_id = lg.user_id WHERE lr.received_count > COALESCE(lg.given_count, 0) ORDER BY lr.user_id ASC;
```

### ✅ PASS : SOCIAL_095 - Derived compare
```sql
SELECT lr.user_id FROM (SELECT p.user_id, COUNT(l.user_id) AS received_count FROM posts p LEFT JOIN likes l ON p.id = l.post_id GROUP BY p.user_id) lr LEFT JOIN (SELECT user_id, COUNT(*) AS given_count FROM likes GROUP BY user_id) lg ON lr.user_id = lg.user_id WHERE lr.received_count > COALESCE(lg.given_count, 0) ORDER BY lr.user_id ASC;
```

### ✅ PASS : SOCIAL_096 - All allow
```sql
SELECT user_id FROM posts WHERE status = 'published' GROUP BY user_id HAVING COUNT(*) = COUNT(*) FILTER (WHERE allow_comments = true) ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_096 - Bool and
```sql
SELECT user_id FROM posts WHERE status = 'published' GROUP BY user_id HAVING BOOL_AND(allow_comments = true) ORDER BY user_id ASC;
```

### ✅ PASS : SOCIAL_097 - Peak drop
```sql
WITH daily_views AS (SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views FROM post_views GROUP BY post_id, viewed_at::date), peak_views AS (SELECT post_id, MAX(daily_views) AS peak_daily_views FROM daily_views GROUP BY post_id), peak_dates AS (SELECT dv.post_id, MIN(dv.view_date) AS peak_date FROM daily_views dv JOIN peak_views pv ON dv.post_id = pv.post_id AND dv.daily_views = pv.peak_daily_views GROUP BY dv.post_id) SELECT dv.post_id, dv.view_date, dv.daily_views, pv.peak_daily_views FROM daily_views dv JOIN peak_views pv ON dv.post_id = pv.post_id JOIN peak_dates pd ON dv.post_id = pd.post_id WHERE dv.view_date > pd.peak_date AND dv.daily_views < pv.peak_daily_views / 2.0 ORDER BY dv.post_id ASC, dv.view_date ASC;
```

### ✅ PASS : SOCIAL_097 - Window peak
```sql
WITH daily_views AS (SELECT post_id, viewed_at::date AS view_date, COUNT(*) AS daily_views FROM post_views GROUP BY post_id, viewed_at::date), with_peak AS (SELECT post_id, view_date, daily_views, MAX(daily_views) OVER (PARTITION BY post_id) AS peak_daily_views FROM daily_views), peak_dates AS (SELECT post_id, MIN(view_date) AS peak_date FROM with_peak WHERE daily_views = peak_daily_views GROUP BY post_id) SELECT wp.post_id, wp.view_date, wp.daily_views, wp.peak_daily_views FROM with_peak wp JOIN peak_dates pd ON wp.post_id = pd.post_id WHERE wp.view_date > pd.peak_date AND wp.daily_views < wp.peak_daily_views / 2.0 ORDER BY wp.post_id ASC, wp.view_date ASC;
```

### ✅ PASS : SOCIAL_098 - Self comment
```sql
SELECT DISTINCT p.user_id FROM posts p JOIN comments c ON p.id = c.post_id AND p.user_id = c.user_id ORDER BY p.user_id ASC;
```

### ✅ PASS : SOCIAL_098 - EXISTS
```sql
SELECT DISTINCT p.user_id FROM posts p WHERE EXISTS (SELECT 1 FROM comments c WHERE c.post_id = p.id AND c.user_id = p.user_id) ORDER BY p.user_id ASC;
```

### ✅ PASS : SOCIAL_099 - Message streak
```sql
WITH daily_messages AS (SELECT DISTINCT sender_id, sent_at::date AS message_date FROM messages WHERE is_deleted = false), sequenced AS (SELECT sender_id, message_date, message_date - INTERVAL '1 day' * ROW_NUMBER() OVER (PARTITION BY sender_id ORDER BY message_date) AS grp FROM daily_messages), streaks AS (SELECT sender_id FROM sequenced GROUP BY sender_id, grp HAVING COUNT(*) >= 3) SELECT sender_id FROM streaks ORDER BY sender_id ASC;
```

### ✅ PASS : SOCIAL_099 - CTE stages
```sql
WITH daily_messages AS (SELECT DISTINCT sender_id, sent_at::date AS message_date FROM messages WHERE is_deleted = false), numbered AS (SELECT sender_id, message_date, ROW_NUMBER() OVER (PARTITION BY sender_id ORDER BY message_date) AS rn FROM daily_messages), sequenced AS (SELECT sender_id, message_date, message_date - INTERVAL '1 day' * rn AS grp FROM numbered) SELECT sender_id FROM sequenced GROUP BY sender_id, grp HAVING COUNT(*) >= 3 ORDER BY sender_id ASC;
```

### ✅ PASS : SOCIAL_100 - Compare followers
```sql
WITH follower_counts AS (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id), follower_avg AS (SELECT f.followee_id AS user_id, AVG(COALESCE(fc.follower_count, 0)) AS avg_follower_count FROM follows f LEFT JOIN follower_counts fc ON f.follower_id = fc.user_id WHERE f.status = 'accepted' GROUP BY f.followee_id) SELECT fc.user_id FROM follower_counts fc JOIN follower_avg fa ON fc.user_id = fa.user_id WHERE fc.follower_count > fa.avg_follower_count ORDER BY fc.user_id ASC;
```

### ✅ PASS : SOCIAL_100 - Derived compare
```sql
SELECT fc.user_id FROM (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) fc JOIN (SELECT f.followee_id AS user_id, AVG(COALESCE(fc2.follower_count, 0)) AS avg_follower_count FROM follows f LEFT JOIN (SELECT followee_id AS user_id, COUNT(*) AS follower_count FROM follows WHERE status = 'accepted' GROUP BY followee_id) fc2 ON f.follower_id = fc2.user_id WHERE f.status = 'accepted' GROUP BY f.followee_id) fa ON fc.user_id = fa.user_id WHERE fc.follower_count > fa.avg_follower_count ORDER BY fc.user_id ASC;
```

