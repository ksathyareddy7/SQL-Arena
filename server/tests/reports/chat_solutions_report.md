# Solutions Evaluation Report (chat)

**Summary:**
- Total Approaches: 286
- Passed: 286
- Failed: 0

## Detailed Results
### ✅ PASS : CHAT_001 - COUNT rows
```sql
SELECT COUNT(*) AS total_users FROM users;
```

### ✅ PASS : CHAT_001 - COUNT ids
```sql
SELECT COUNT(id) AS total_users FROM users;
```

### ✅ PASS : CHAT_001 - CTE count
```sql
WITH user_count AS (
  SELECT COUNT(*) AS total_users
  FROM users
)
SELECT total_users
FROM user_count;
```

### ✅ PASS : CHAT_002 - Filter then count
```sql
SELECT COUNT(*) AS active_workspaces FROM workspaces WHERE is_active = true;
```

### ✅ PASS : CHAT_002 - Boolean shorthand
```sql
SELECT COUNT(*) AS active_workspaces FROM workspaces WHERE is_active;
```

### ✅ PASS : CHAT_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_workspaces FROM workspaces;
```

### ✅ PASS : CHAT_003 - Simple filter
```sql
SELECT id, full_name, email FROM users WHERE is_verified = true ORDER BY id ASC;
```

### ✅ PASS : CHAT_003 - Boolean shorthand
```sql
SELECT id, full_name, email FROM users WHERE is_verified ORDER BY id ASC;
```

### ✅ PASS : CHAT_003 - CTE verified
```sql
WITH verified_users AS (
  SELECT id, full_name, email
  FROM users
  WHERE is_verified = true
)
SELECT id, full_name, email
FROM verified_users
ORDER BY id ASC;
```

### ✅ PASS : CHAT_004 - Filter public
```sql
SELECT id, workspace_id, channel_name FROM channels WHERE visibility = 'public' ORDER BY workspace_id ASC, channel_name ASC, id ASC;
```

### ✅ PASS : CHAT_004 - IN filter
```sql
SELECT id, workspace_id, channel_name FROM channels WHERE visibility IN ('public') ORDER BY workspace_id ASC, channel_name ASC, id ASC;
```

### ✅ PASS : CHAT_004 - CTE public
```sql
WITH public_channels AS (
  SELECT id, workspace_id, channel_name
  FROM channels
  WHERE visibility = 'public'
)
SELECT id, workspace_id, channel_name
FROM public_channels
ORDER BY workspace_id ASC, channel_name ASC, id ASC;
```

### ✅ PASS : CHAT_005 - Filter bots
```sql
SELECT id, full_name, username FROM users WHERE is_bot = true ORDER BY id ASC;
```

### ✅ PASS : CHAT_005 - Boolean shorthand
```sql
SELECT id, full_name, username FROM users WHERE is_bot ORDER BY id ASC;
```

### ✅ PASS : CHAT_005 - CTE bots
```sql
WITH bot_users AS (
  SELECT id, full_name, username
  FROM users
  WHERE is_bot = true
)
SELECT id, full_name, username
FROM bot_users
ORDER BY id ASC;
```

### ✅ PASS : CHAT_006 - Group active members
```sql
SELECT workspace_id, COUNT(*) AS active_member_count FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ORDER BY active_member_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_006 - FILTER count
```sql
SELECT workspace_id, COUNT(*) FILTER (WHERE membership_status = 'active') AS active_member_count FROM workspace_members GROUP BY workspace_id ORDER BY active_member_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_006 - CTE active counts
```sql
WITH workspace_active_counts AS (
  SELECT workspace_id, COUNT(*) AS active_member_count
  FROM workspace_members
  WHERE membership_status = 'active'
  GROUP BY workspace_id
)
SELECT workspace_id, active_member_count
FROM workspace_active_counts
ORDER BY active_member_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_007 - Group channels
```sql
SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ORDER BY total_channels DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_007 - COUNT ids
```sql
SELECT workspace_id, COUNT(id) AS total_channels FROM channels GROUP BY workspace_id ORDER BY total_channels DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_007 - CTE totals
```sql
WITH workspace_channel_totals AS (
  SELECT workspace_id, COUNT(*) AS total_channels
  FROM channels
  GROUP BY workspace_id
)
SELECT workspace_id, total_channels
FROM workspace_channel_totals
ORDER BY total_channels DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_008 - Filter archived
```sql
SELECT id, workspace_id, channel_name, archived_at FROM channels WHERE is_archived = true ORDER BY archived_at DESC, id ASC;
```

### ✅ PASS : CHAT_008 - Boolean shorthand
```sql
SELECT id, workspace_id, channel_name, archived_at FROM channels WHERE is_archived ORDER BY archived_at DESC, id ASC;
```

### ✅ PASS : CHAT_008 - CTE archived
```sql
WITH archived_channels AS (
  SELECT id, workspace_id, channel_name, archived_at
  FROM channels
  WHERE is_archived = true
)
SELECT id, workspace_id, channel_name, archived_at
FROM archived_channels
ORDER BY archived_at DESC, id ASC;
```

### ✅ PASS : CHAT_009 - Filter links
```sql
SELECT id, workspace_id, sender_member_id, sent_at FROM messages WHERE contains_link = true AND is_deleted = false ORDER BY sent_at DESC, id ASC;
```

### ✅ PASS : CHAT_009 - Boolean shorthand
```sql
SELECT id, workspace_id, sender_member_id, sent_at FROM messages WHERE contains_link AND NOT is_deleted ORDER BY sent_at DESC, id ASC;
```

### ✅ PASS : CHAT_009 - CTE link messages
```sql
WITH link_messages AS (
  SELECT id, workspace_id, sender_member_id, sent_at
  FROM messages
  WHERE contains_link = true
    AND is_deleted = false
)
SELECT id, workspace_id, sender_member_id, sent_at
FROM link_messages
ORDER BY sent_at DESC, id ASC;
```

### ✅ PASS : CHAT_010 - Count direct
```sql
SELECT COUNT(*) AS direct_conversations_count FROM conversations WHERE conversation_type = 'direct';
```

### ✅ PASS : CHAT_010 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE conversation_type = 'direct') AS direct_conversations_count FROM conversations;
```

### ✅ PASS : CHAT_010 - CTE direct count
```sql
WITH direct_conversations AS (
  SELECT COUNT(*) AS direct_conversations_count
  FROM conversations
  WHERE conversation_type = 'direct'
)
SELECT direct_conversations_count
FROM direct_conversations;
```

### ✅ PASS : CHAT_011 - Direct pins
```sql
SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM message_pins ORDER BY pinned_at DESC, message_id ASC;
```

### ✅ PASS : CHAT_011 - CTE pins
```sql
WITH pinned_rows AS ( SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM message_pins ) SELECT message_id, channel_id, pinned_by_member_id, pinned_at FROM pinned_rows ORDER BY pinned_at DESC, message_id ASC;
```

### ✅ PASS : CHAT_011 - Ordered select
```sql
SELECT mp.message_id, mp.channel_id, mp.pinned_by_member_id, mp.pinned_at FROM message_pins mp ORDER BY mp.pinned_at DESC, mp.message_id ASC;
```

### ✅ PASS : CHAT_012 - Filter unread
```sql
SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE is_read = false ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_012 - Not read
```sql
SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE NOT is_read ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_012 - CTE unread
```sql
WITH unread_notifications AS ( SELECT id, workspace_member_id, notification_type, created_at FROM notifications WHERE is_read = false ) SELECT id, workspace_member_id, notification_type, created_at FROM unread_notifications ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_013 - Active online join
```sql
SELECT DISTINCT u.id, u.full_name, u.username, u.last_seen_at FROM users u JOIN workspace_members wm ON u.id = wm.user_id JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'online' AND upl.ended_at IS NULL ORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;
```

### ✅ PASS : CHAT_013 - CTE online users
```sql
WITH online_members AS ( SELECT DISTINCT wm.user_id FROM workspace_members wm JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'online' AND upl.ended_at IS NULL ) SELECT u.id, u.full_name, u.username, u.last_seen_at FROM users u JOIN online_members om ON u.id = om.user_id ORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;
```

### ✅ PASS : CHAT_013 - Exists online
```sql
SELECT u.id, u.full_name, u.username, u.last_seen_at FROM users u WHERE EXISTS ( SELECT 1 FROM workspace_members wm JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE wm.user_id = u.id AND upl.presence_status = 'online' AND upl.ended_at IS NULL ) ORDER BY u.last_seen_at DESC NULLS LAST, u.id ASC;
```

### ✅ PASS : CHAT_014 - Date count
```sql
SELECT COUNT(*) AS messages_sent_today FROM messages WHERE DATE(sent_at) = CURRENT_DATE;
```

### ✅ PASS : CHAT_014 - Range filter
```sql
SELECT COUNT(*) AS messages_sent_today FROM messages WHERE sent_at >= CURRENT_DATE AND sent_at < CURRENT_DATE + INTERVAL '1 day';
```

### ✅ PASS : CHAT_014 - CTE today count
```sql
WITH today_messages AS (
  SELECT COUNT(*) AS messages_sent_today
  FROM messages
  WHERE DATE(sent_at) = CURRENT_DATE
)
SELECT messages_sent_today
FROM today_messages;
```

### ✅ PASS : CHAT_015 - Group emoji
```sql
SELECT emoji_code, COUNT(*) AS reaction_count FROM message_reactions GROUP BY emoji_code ORDER BY reaction_count DESC, emoji_code ASC;
```

### ✅ PASS : CHAT_015 - COUNT emoji
```sql
SELECT emoji_code, COUNT(emoji_code) AS reaction_count FROM message_reactions GROUP BY emoji_code ORDER BY reaction_count DESC, emoji_code ASC;
```

### ✅ PASS : CHAT_015 - CTE reaction counts
```sql
WITH emoji_reaction_counts AS (
  SELECT emoji_code, COUNT(*) AS reaction_count
  FROM message_reactions
  GROUP BY emoji_code
)
SELECT emoji_code, reaction_count
FROM emoji_reaction_counts
ORDER BY reaction_count DESC, emoji_code ASC;
```

### ✅ PASS : CHAT_016 - Month filter
```sql
SELECT id, workspace_id, user_id, joined_at FROM workspace_members WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE) ORDER BY joined_at DESC, id ASC;
```

### ✅ PASS : CHAT_016 - Month range
```sql
SELECT id, workspace_id, user_id, joined_at FROM workspace_members WHERE joined_at >= DATE_TRUNC('month', CURRENT_DATE) AND joined_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' ORDER BY joined_at DESC, id ASC;
```

### ✅ PASS : CHAT_016 - CTE joined month
```sql
WITH current_month_members AS (
  SELECT id, workspace_id, user_id, joined_at
  FROM workspace_members
  WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE)
)
SELECT id, workspace_id, user_id, joined_at
FROM current_month_members
ORDER BY joined_at DESC, id ASC;
```

### ✅ PASS : CHAT_017 - Filter private count
```sql
SELECT workspace_id, COUNT(*) AS private_channels_count FROM channels WHERE visibility = 'private' GROUP BY workspace_id ORDER BY private_channels_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_017 - CTE private totals
```sql
WITH private_channel_totals AS ( SELECT workspace_id, COUNT(*) AS private_channels_count FROM channels WHERE visibility = 'private' GROUP BY workspace_id ) SELECT workspace_id, private_channels_count FROM private_channel_totals ORDER BY private_channels_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_018 - Filter deleted
```sql
SELECT id, workspace_id, sender_member_id, deleted_at FROM messages WHERE is_deleted = true ORDER BY deleted_at DESC, id ASC;
```

### ✅ PASS : CHAT_018 - Boolean deleted
```sql
SELECT id, workspace_id, sender_member_id, deleted_at FROM messages WHERE is_deleted ORDER BY deleted_at DESC, id ASC;
```

### ✅ PASS : CHAT_018 - CTE deleted
```sql
WITH deleted_messages AS (
  SELECT id, workspace_id, sender_member_id, deleted_at
  FROM messages
  WHERE is_deleted = true
)
SELECT id, workspace_id, sender_member_id, deleted_at
FROM deleted_messages
ORDER BY deleted_at DESC, id ASC;
```

### ✅ PASS : CHAT_019 - Active DND join
```sql
SELECT DISTINCT u.id AS user_id, upl.started_at AS dnd_started_at FROM users u JOIN workspace_members wm ON u.id = wm.user_id JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'dnd' AND upl.ended_at IS NULL ORDER BY dnd_started_at DESC, user_id ASC;
```

### ✅ PASS : CHAT_019 - CTE DND users
```sql
WITH dnd_users AS ( SELECT DISTINCT wm.user_id, upl.started_at AS dnd_started_at FROM workspace_members wm JOIN user_presence_logs upl ON wm.id = upl.workspace_member_id WHERE upl.presence_status = 'dnd' AND upl.ended_at IS NULL ) SELECT user_id, dnd_started_at FROM dnd_users ORDER BY dnd_started_at DESC, user_id ASC;
```

### ✅ PASS : CHAT_020 - Phone is null
```sql
SELECT id, full_name, email FROM users WHERE phone IS NULL ORDER BY id ASC;
```

### ✅ PASS : CHAT_020 - CASE phone
```sql
SELECT id, full_name, email FROM users WHERE CASE WHEN phone IS NULL THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : CHAT_020 - CTE null phones
```sql
WITH users_without_phone AS ( SELECT id, full_name, email FROM users WHERE phone IS NULL ) SELECT id, full_name, email FROM users_without_phone ORDER BY id ASC;
```

### ✅ PASS : CHAT_021 - Group messages
```sql
SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_021 - FILTER count
```sql
SELECT channel_id, COUNT(*) FILTER (WHERE is_deleted = false) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_021 - CTE channel totals
```sql
WITH channel_message_totals AS (
  SELECT channel_id, COUNT(*) AS total_messages
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
)
SELECT channel_id, total_messages
FROM channel_message_totals
ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_022 - Group replies
```sql
SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ORDER BY reply_count DESC, parent_message_id ASC;
```

### ✅ PASS : CHAT_022 - COUNT parent ids
```sql
SELECT parent_message_id, COUNT(parent_message_id) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ORDER BY reply_count DESC, parent_message_id ASC;
```

### ✅ PASS : CHAT_022 - CTE reply totals
```sql
WITH reply_totals AS (
  SELECT parent_message_id, COUNT(*) AS reply_count
  FROM messages
  WHERE parent_message_id IS NOT NULL
  GROUP BY parent_message_id
)
SELECT parent_message_id, reply_count
FROM reply_totals
ORDER BY reply_count DESC, parent_message_id ASC;
```

### ✅ PASS : CHAT_023 - Last 30 days
```sql
SELECT id, full_name, username, created_at FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_023 - CTE recent users
```sql
WITH recent_users AS ( SELECT id, full_name, username, created_at FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' ) SELECT id, full_name, username, created_at FROM recent_users ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_024 - Order members
```sql
SELECT id, channel_id, workspace_member_id, joined_at FROM channel_members ORDER BY joined_at DESC, id ASC;
```

### ✅ PASS : CHAT_024 - CTE members
```sql
WITH channel_member_rows AS ( SELECT id, channel_id, workspace_member_id, joined_at FROM channel_members ) SELECT id, channel_id, workspace_member_id, joined_at FROM channel_member_rows ORDER BY joined_at DESC, id ASC;
```

### ✅ PASS : CHAT_025 - Group types
```sql
SELECT attachment_type, COUNT(*) AS attachment_count FROM message_attachments GROUP BY attachment_type ORDER BY attachment_count DESC, attachment_type ASC;
```

### ✅ PASS : CHAT_025 - COUNT type
```sql
SELECT attachment_type, COUNT(attachment_type) AS attachment_count FROM message_attachments GROUP BY attachment_type ORDER BY attachment_count DESC, attachment_type ASC;
```

### ✅ PASS : CHAT_025 - CTE type totals
```sql
WITH attachment_type_totals AS (
  SELECT attachment_type, COUNT(*) AS attachment_count
  FROM message_attachments
  GROUP BY attachment_type
)
SELECT attachment_type, attachment_count
FROM attachment_type_totals
ORDER BY attachment_count DESC, attachment_type ASC;
```

### ✅ PASS : CHAT_026 - Year filter
```sql
SELECT id, workspace_name, created_at FROM workspaces WHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE) ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_026 - Year range
```sql
SELECT id, workspace_name, created_at FROM workspaces WHERE created_at >= DATE_TRUNC('year', CURRENT_DATE) AND created_at < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year' ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_026 - CTE year workspaces
```sql
WITH current_year_workspaces AS (
  SELECT id, workspace_name, created_at
  FROM workspaces
  WHERE DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE)
)
SELECT id, workspace_name, created_at
FROM current_year_workspaces
ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_027 - Mute until set
```sql
SELECT id, workspace_member_id, channel_id, mute_until FROM notification_preferences WHERE mute_until IS NOT NULL ORDER BY mute_until DESC, id ASC;
```

### ✅ PASS : CHAT_027 - CTE muted prefs
```sql
WITH muted_preferences AS ( SELECT id, workspace_member_id, channel_id, mute_until FROM notification_preferences WHERE mute_until IS NOT NULL ) SELECT id, workspace_member_id, channel_id, mute_until FROM muted_preferences ORDER BY mute_until DESC, id ASC;
```

### ✅ PASS : CHAT_027 - Alias muted
```sql
SELECT np.id, np.workspace_member_id, np.channel_id, np.mute_until FROM notification_preferences np WHERE np.mute_until IS NOT NULL ORDER BY np.mute_until DESC, np.id ASC;
```

### ✅ PASS : CHAT_028 - Filter pending
```sql
SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status = 'pending' ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_028 - IN pending
```sql
SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status IN ('pending') ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_028 - CTE invites
```sql
WITH pending_invites AS ( SELECT id, workspace_id, invited_email, created_at FROM invites WHERE invite_status = 'pending' ) SELECT id, workspace_id, invited_email, created_at FROM pending_invites ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_029 - Filter applied
```sql
SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status = 'applied' ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_029 - IN applied
```sql
SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status IN ('applied') ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_029 - CTE actions
```sql
WITH applied_actions AS ( SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM moderation_actions WHERE action_status = 'applied' ) SELECT id, workspace_id, target_member_id, target_message_id, created_at FROM applied_actions ORDER BY created_at DESC, id ASC;
```

### ✅ PASS : CHAT_030 - Count voice
```sql
SELECT COUNT(*) AS voice_calls_count FROM calls WHERE call_type = 'voice';
```

### ✅ PASS : CHAT_030 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE call_type = 'voice') AS voice_calls_count FROM calls;
```

### ✅ PASS : CHAT_030 - CTE voice count
```sql
WITH voice_call_totals AS (
  SELECT COUNT(*) AS voice_calls_count
  FROM calls
  WHERE call_type = 'voice'
)
SELECT voice_calls_count
FROM voice_call_totals;
```

### ✅ PASS : CHAT_031 - Count and limit
```sql
SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY total_messages DESC, channel_id ASC LIMIT 5;
```

### ✅ PASS : CHAT_031 - CTE top channels
```sql
WITH channel_message_totals AS (
  SELECT channel_id, COUNT(*) AS total_messages
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
)
SELECT channel_id, total_messages
FROM channel_message_totals
ORDER BY total_messages DESC, channel_id ASC
LIMIT 5;
```

### ✅ PASS : CHAT_031 - Rank rows
```sql
WITH channel_message_totals AS (
  SELECT channel_id, COUNT(*) AS total_messages
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
), ranked_channels AS (
  SELECT channel_id, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, channel_id ASC) AS rn
  FROM channel_message_totals
)
SELECT channel_id, total_messages
FROM ranked_channels
WHERE rn <= 5
ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_032 - Distinct members
```sql
SELECT DISTINCT workspace_member_id FROM saved_messages ORDER BY workspace_member_id ASC;
```

### ✅ PASS : CHAT_032 - Group members
```sql
SELECT workspace_member_id FROM saved_messages GROUP BY workspace_member_id ORDER BY workspace_member_id ASC;
```

### ✅ PASS : CHAT_032 - CTE saved members
```sql
WITH saved_members AS ( SELECT DISTINCT workspace_member_id FROM saved_messages ) SELECT workspace_member_id FROM saved_members ORDER BY workspace_member_id ASC;
```

### ✅ PASS : CHAT_033 - Distinct messages
```sql
SELECT DISTINCT ma.message_id FROM message_attachments ma ORDER BY ma.message_id ASC;
```

### ✅ PASS : CHAT_033 - Group messages
```sql
SELECT ma.message_id FROM message_attachments ma GROUP BY ma.message_id ORDER BY ma.message_id ASC;
```

### ✅ PASS : CHAT_033 - EXISTS messages
```sql
SELECT m.id AS message_id FROM messages m WHERE EXISTS (SELECT 1 FROM message_attachments ma WHERE ma.message_id = m.id) ORDER BY m.id ASC;
```

### ✅ PASS : CHAT_034 - Inactive filter
```sql
SELECT id, full_name, last_seen_at FROM users WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days' ORDER BY last_seen_at ASC, id ASC;
```

### ✅ PASS : CHAT_034 - Date diff
```sql
SELECT id, full_name, last_seen_at FROM users WHERE CURRENT_DATE - DATE(last_seen_at) > 30 ORDER BY last_seen_at ASC, id ASC;
```

### ✅ PASS : CHAT_034 - CTE inactive users
```sql
WITH inactive_users AS (
  SELECT id, full_name, last_seen_at
  FROM users
  WHERE last_seen_at < CURRENT_DATE - INTERVAL '30 days'
)
SELECT id, full_name, last_seen_at
FROM inactive_users
ORDER BY last_seen_at ASC, id ASC;
```

### ✅ PASS : CHAT_035 - Group participants
```sql
SELECT call_id, COUNT(*) AS participant_count FROM call_participants GROUP BY call_id HAVING COUNT(*) > 2 ORDER BY participant_count DESC, call_id ASC;
```

### ✅ PASS : CHAT_035 - CTE participant counts
```sql
WITH call_counts AS (
  SELECT call_id, COUNT(*) AS participant_count
  FROM call_participants
  GROUP BY call_id
)
SELECT call_id, participant_count
FROM call_counts
WHERE participant_count > 2
ORDER BY participant_count DESC, call_id ASC;
```

### ✅ PASS : CHAT_035 - COUNT ids
```sql
SELECT call_id, COUNT(call_id) AS participant_count FROM call_participants GROUP BY call_id HAVING COUNT(call_id) > 2 ORDER BY participant_count DESC, call_id ASC;
```

### ✅ PASS : CHAT_036 - Distinct workspaces
```sql
SELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count FROM workspace_members WHERE membership_status = 'active' GROUP BY user_id HAVING COUNT(DISTINCT workspace_id) > 1 ORDER BY workspace_count DESC, user_id ASC;
```

### ✅ PASS : CHAT_036 - CTE workspace counts
```sql
WITH user_workspace_counts AS (
  SELECT user_id, COUNT(DISTINCT workspace_id) AS workspace_count
  FROM workspace_members
  WHERE membership_status = 'active'
  GROUP BY user_id
)
SELECT user_id, workspace_count
FROM user_workspace_counts
WHERE workspace_count > 1
ORDER BY workspace_count DESC, user_id ASC;
```

### ✅ PASS : CHAT_036 - Self join distinct
```sql
SELECT wm1.user_id, COUNT(DISTINCT wm1.workspace_id) AS workspace_count FROM workspace_members wm1 JOIN workspace_members wm2 ON wm1.user_id = wm2.user_id AND wm1.workspace_id <> wm2.workspace_id WHERE wm1.membership_status = 'active' AND wm2.membership_status = 'active' GROUP BY wm1.user_id ORDER BY workspace_count DESC, wm1.user_id ASC;
```

### ✅ PASS : CHAT_037 - Group reactions
```sql
SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ORDER BY reaction_count DESC, message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_037 - CTE top reactions
```sql
WITH message_reaction_totals AS (
  SELECT message_id, COUNT(*) AS reaction_count
  FROM message_reactions
  GROUP BY message_id
)
SELECT message_id, reaction_count
FROM message_reaction_totals
ORDER BY reaction_count DESC, message_id ASC
LIMIT 10;
```

### ✅ PASS : CHAT_037 - Rank messages
```sql
WITH message_reaction_totals AS (
  SELECT message_id, COUNT(*) AS reaction_count
  FROM message_reactions
  GROUP BY message_id
), ranked_messages AS (
  SELECT message_id, reaction_count, ROW_NUMBER() OVER (ORDER BY reaction_count DESC, message_id ASC) AS rn
  FROM message_reaction_totals
)
SELECT message_id, reaction_count
FROM ranked_messages
WHERE rn <= 10
ORDER BY reaction_count DESC, message_id ASC;
```

### ✅ PASS : CHAT_038 - Group unread
```sql
SELECT workspace_member_id, COUNT(*) AS unread_count FROM notifications WHERE is_read = false GROUP BY workspace_member_id ORDER BY unread_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_038 - CTE unread counts
```sql
WITH unread_notification_counts AS ( SELECT workspace_member_id, COUNT(*) AS unread_count FROM notifications WHERE is_read = false GROUP BY workspace_member_id ) SELECT workspace_member_id, unread_count FROM unread_notification_counts ORDER BY unread_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_039 - Group mentions
```sql
SELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY mentioned_member_id ORDER BY mention_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_039 - CTE mention totals
```sql
WITH mention_totals AS ( SELECT mentioned_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY mentioned_member_id ) SELECT workspace_member_id, mention_count FROM mention_totals ORDER BY mention_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_040 - CTE average
```sql
WITH thread_replies AS ( SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread FROM thread_replies;
```

### ✅ PASS : CHAT_040 - Subquery average
```sql
SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread FROM ( SELECT parent_message_id, COUNT(*) AS reply_count FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) AS thread_replies;
```

### ✅ PASS : CHAT_040 - Nested CTE
```sql
WITH reply_counts AS (
  SELECT parent_message_id, COUNT(*) AS reply_count
  FROM messages
  WHERE parent_message_id IS NOT NULL
  GROUP BY parent_message_id
), avg_reply_count AS (
  SELECT ROUND(AVG(reply_count), 2) AS avg_replies_per_thread
  FROM reply_counts
)
SELECT avg_replies_per_thread
FROM avg_reply_count;
```

### ✅ PASS : CHAT_041 - Group senders
```sql
SELECT sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ORDER BY message_count DESC, sender_member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_041 - CTE sender totals
```sql
WITH sender_message_totals AS (
  SELECT sender_member_id, COUNT(*) AS message_count
  FROM messages
  WHERE is_deleted = false
  GROUP BY sender_member_id
)
SELECT sender_member_id, message_count
FROM sender_message_totals
ORDER BY message_count DESC, sender_member_id ASC
LIMIT 10;
```

### ✅ PASS : CHAT_041 - Rank senders
```sql
WITH sender_message_totals AS (
  SELECT sender_member_id, COUNT(*) AS message_count
  FROM messages
  WHERE is_deleted = false
  GROUP BY sender_member_id
), ranked_senders AS (
  SELECT sender_member_id, message_count, ROW_NUMBER() OVER (ORDER BY message_count DESC, sender_member_id ASC) AS rn
  FROM sender_message_totals
)
SELECT sender_member_id, message_count
FROM ranked_senders
WHERE rn <= 10
ORDER BY message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_042 - Left join count
```sql
SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN messages m ON c.id = m.channel_id GROUP BY c.id, c.workspace_id, c.channel_name HAVING COUNT(m.id) = 0 ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;
```

### ✅ PASS : CHAT_042 - NOT EXISTS
```sql
SELECT c.id, c.workspace_id, c.channel_name FROM channels c WHERE NOT EXISTS (SELECT 1 FROM messages m WHERE m.channel_id = c.id) ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;
```

### ✅ PASS : CHAT_042 - CTE message channels
```sql
WITH used_channels AS (
  SELECT DISTINCT channel_id
  FROM messages
  WHERE channel_id IS NOT NULL
)
SELECT c.id, c.workspace_id, c.channel_name
FROM channels c
LEFT JOIN used_channels uc
  ON c.id = uc.channel_id
WHERE uc.channel_id IS NULL
ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;
```

### ✅ PASS : CHAT_043 - Left join zero
```sql
SELECT DISTINCT wm.user_id FROM workspace_members wm LEFT JOIN messages m ON wm.id = m.sender_member_id WHERE wm.membership_status = 'active' GROUP BY wm.user_id HAVING COUNT(m.id) = 0 ORDER BY wm.user_id ASC;
```

### ✅ PASS : CHAT_043 - CTE active members
```sql
WITH active_members AS (
  SELECT id, user_id
  FROM workspace_members
  WHERE membership_status = 'active'
)
SELECT DISTINCT am.user_id
FROM active_members am
LEFT JOIN messages m
  ON am.id = m.sender_member_id
GROUP BY am.user_id
HAVING COUNT(m.id) = 0
ORDER BY am.user_id ASC;
```

### ✅ PASS : CHAT_044 - CTE average
```sql
WITH channel_message_counts AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel FROM channel_message_counts;
```

### ✅ PASS : CHAT_044 - Subquery average
```sql
SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel FROM ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) AS channel_message_counts;
```

### ✅ PASS : CHAT_044 - Nested CTE
```sql
WITH channel_message_counts AS (
  SELECT channel_id, COUNT(*) AS message_count
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
), avg_channel_messages AS (
  SELECT ROUND(AVG(message_count), 2) AS avg_messages_per_channel
  FROM channel_message_counts
)
SELECT avg_messages_per_channel
FROM avg_channel_messages;
```

### ✅ PASS : CHAT_045 - Having over 100
```sql
SELECT channel_id, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id HAVING COUNT(*) > 100 ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_045 - CTE threshold
```sql
WITH channel_message_totals AS (
  SELECT channel_id, COUNT(*) AS total_messages
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
)
SELECT channel_id, total_messages
FROM channel_message_totals
WHERE total_messages > 100
ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_045 - COUNT ids
```sql
SELECT channel_id, COUNT(channel_id) AS total_messages FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id HAVING COUNT(channel_id) > 100 ORDER BY total_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_046 - Join distinct
```sql
SELECT DISTINCT m.sender_member_id AS workspace_member_id FROM messages m JOIN message_reactions r ON m.sender_member_id = r.workspace_member_id ORDER BY workspace_member_id ASC;
```

### ✅ PASS : CHAT_046 - Exists both
```sql
SELECT DISTINCT m.sender_member_id AS workspace_member_id FROM messages m WHERE EXISTS (SELECT 1 FROM message_reactions r WHERE r.workspace_member_id = m.sender_member_id) ORDER BY workspace_member_id ASC;
```

### ✅ PASS : CHAT_046 - Intersect sets
```sql
SELECT sender_member_id AS workspace_member_id FROM messages INTERSECT SELECT workspace_member_id FROM message_reactions ORDER BY workspace_member_id ASC;
```

### ✅ PASS : CHAT_047 - Group workspaces
```sql
SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ORDER BY total_messages DESC, workspace_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_047 - CTE workspace totals
```sql
WITH workspace_message_totals AS (
  SELECT workspace_id, COUNT(*) AS total_messages
  FROM messages
  WHERE is_deleted = false
  GROUP BY workspace_id
)
SELECT workspace_id, total_messages
FROM workspace_message_totals
ORDER BY total_messages DESC, workspace_id ASC
LIMIT 10;
```

### ✅ PASS : CHAT_047 - Rank workspaces
```sql
WITH workspace_message_totals AS (
  SELECT workspace_id, COUNT(*) AS total_messages
  FROM messages
  WHERE is_deleted = false
  GROUP BY workspace_id
), ranked_workspaces AS (
  SELECT workspace_id, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, workspace_id ASC) AS rn
  FROM workspace_message_totals
)
SELECT workspace_id, total_messages
FROM ranked_workspaces
WHERE rn <= 10
ORDER BY total_messages DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_048 - CTE average
```sql
WITH reaction_counts AS ( SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ) SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count FROM reaction_counts;
```

### ✅ PASS : CHAT_048 - Subquery average
```sql
SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count FROM ( SELECT message_id, COUNT(*) AS reaction_count FROM message_reactions GROUP BY message_id ) AS reaction_counts;
```

### ✅ PASS : CHAT_048 - Nested CTE
```sql
WITH reaction_counts AS (
  SELECT message_id, COUNT(*) AS reaction_count
  FROM message_reactions
  GROUP BY message_id
), avg_reactions AS (
  SELECT ROUND(AVG(reaction_count), 2) AS avg_reaction_count
  FROM reaction_counts
)
SELECT avg_reaction_count
FROM avg_reactions;
```

### ✅ PASS : CHAT_049 - Join private count
```sql
SELECT cm.channel_id, COUNT(*) AS member_count FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'private' GROUP BY cm.channel_id ORDER BY member_count DESC, cm.channel_id ASC;
```

### ✅ PASS : CHAT_049 - CTE private channels
```sql
WITH private_channels AS ( SELECT id FROM channels WHERE visibility = 'private' ) SELECT cm.channel_id, COUNT(*) AS member_count FROM channel_members cm JOIN private_channels pc ON cm.channel_id = pc.id GROUP BY cm.channel_id ORDER BY member_count DESC, cm.channel_id ASC;
```

### ✅ PASS : CHAT_049 - Alias count
```sql
SELECT cm.channel_id, COUNT(cm.workspace_member_id) AS member_count FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'private' GROUP BY cm.channel_id ORDER BY member_count DESC, cm.channel_id ASC;
```

### ✅ PASS : CHAT_050 - Filter owners
```sql
SELECT workspace_id, COUNT(*) AS owner_count FROM workspace_members WHERE membership_status = 'active' AND member_type = 'owner' GROUP BY workspace_id ORDER BY owner_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_050 - FILTER owners
```sql
SELECT workspace_id, COUNT(*) FILTER (WHERE membership_status = 'active' AND member_type = 'owner') AS owner_count FROM workspace_members GROUP BY workspace_id ORDER BY owner_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_050 - CTE owner totals
```sql
WITH workspace_owner_totals AS ( SELECT workspace_id, COUNT(*) AS owner_count FROM workspace_members WHERE membership_status = 'active' AND member_type = 'owner' GROUP BY workspace_id ) SELECT workspace_id, owner_count FROM workspace_owner_totals ORDER BY owner_count DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_051 - Distinct senders
```sql
SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ORDER BY unique_senders DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_051 - CTE sender counts
```sql
WITH channel_sender_counts AS (
  SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
)
SELECT channel_id, unique_senders
FROM channel_sender_counts
ORDER BY unique_senders DESC, channel_id ASC
LIMIT 10;
```

### ✅ PASS : CHAT_051 - Rank channels
```sql
WITH channel_sender_counts AS (
  SELECT channel_id, COUNT(DISTINCT sender_member_id) AS unique_senders
  FROM messages
  WHERE channel_id IS NOT NULL
    AND is_deleted = false
  GROUP BY channel_id
), ranked_channels AS (
  SELECT channel_id, unique_senders, ROW_NUMBER() OVER (ORDER BY unique_senders DESC, channel_id ASC) AS rn
  FROM channel_sender_counts
)
SELECT channel_id, unique_senders
FROM ranked_channels
WHERE rn <= 10
ORDER BY unique_senders DESC, channel_id ASC;
```

### ✅ PASS : CHAT_052 - Distinct channels
```sql
SELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id HAVING COUNT(DISTINCT channel_id) > 3 ORDER BY channel_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_052 - CTE channel counts
```sql
WITH member_channel_counts AS ( SELECT workspace_member_id, COUNT(DISTINCT channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id ) SELECT workspace_member_id, channel_count FROM member_channel_counts WHERE channel_count > 3 ORDER BY channel_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_052 - Group channels
```sql
SELECT workspace_member_id, COUNT(channel_id) AS channel_count FROM channel_members GROUP BY workspace_member_id HAVING COUNT(channel_id) > 3 ORDER BY channel_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_053 - Left join zero
```sql
SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN channel_members cm ON c.id = cm.channel_id GROUP BY c.id, c.workspace_id, c.channel_name HAVING COUNT(cm.id) = 0 ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;
```

### ✅ PASS : CHAT_053 - Not exists
```sql
SELECT c.id, c.workspace_id, c.channel_name FROM channels c WHERE NOT EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = c.id) ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;
```

### ✅ PASS : CHAT_053 - CTE member channels
```sql
WITH member_channels AS ( SELECT DISTINCT channel_id FROM channel_members ) SELECT c.id, c.workspace_id, c.channel_name FROM channels c LEFT JOIN member_channels mc ON c.id = mc.channel_id WHERE mc.channel_id IS NULL ORDER BY c.workspace_id ASC, c.channel_name ASC, c.id ASC;
```

### ✅ PASS : CHAT_054 - Two CTEs
```sql
WITH workspace_message_counts AS ( SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ), workspace_active_members AS ( SELECT workspace_id, COUNT(*) AS active_members FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ) SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member FROM workspace_active_members wam LEFT JOIN workspace_message_counts wmc ON wam.workspace_id = wmc.workspace_id ORDER BY avg_messages_per_active_member DESC, wam.workspace_id ASC;
```

### ✅ PASS : CHAT_054 - Subquery join
```sql
SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member FROM ( SELECT workspace_id, COUNT(*) AS active_members FROM workspace_members WHERE membership_status = 'active' GROUP BY workspace_id ) wam LEFT JOIN ( SELECT workspace_id, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY workspace_id ) wmc ON wam.workspace_id = wmc.workspace_id ORDER BY avg_messages_per_active_member DESC, wam.workspace_id ASC;
```

### ✅ PASS : CHAT_054 - Nested CTE
```sql
WITH workspace_message_counts AS (
  SELECT workspace_id, COUNT(*) AS total_messages
  FROM messages
  WHERE is_deleted = false
  GROUP BY workspace_id
), workspace_active_members AS (
  SELECT workspace_id, COUNT(*) AS active_members
  FROM workspace_members
  WHERE membership_status = 'active'
  GROUP BY workspace_id
), workspace_averages AS (
  SELECT wam.workspace_id, ROUND(COALESCE(wmc.total_messages, 0)::numeric / NULLIF(wam.active_members, 0), 2) AS avg_messages_per_active_member
  FROM workspace_active_members wam
  LEFT JOIN workspace_message_counts wmc
    ON wam.workspace_id = wmc.workspace_id
)
SELECT workspace_id, avg_messages_per_active_member
FROM workspace_averages
ORDER BY avg_messages_per_active_member DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_055 - Group mentions
```sql
SELECT message_id, COUNT(*) AS mention_count FROM message_mentions GROUP BY message_id ORDER BY mention_count DESC, message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_055 - CTE mention counts
```sql
WITH message_mention_counts AS (
  SELECT message_id, COUNT(*) AS mention_count
  FROM message_mentions
  GROUP BY message_id
)
SELECT message_id, mention_count
FROM message_mention_counts
ORDER BY mention_count DESC, message_id ASC
LIMIT 10;
```

### ✅ PASS : CHAT_055 - Rank mentions
```sql
WITH message_mention_counts AS (
  SELECT message_id, COUNT(*) AS mention_count
  FROM message_mentions
  GROUP BY message_id
), ranked_messages AS (
  SELECT message_id, mention_count, ROW_NUMBER() OVER (ORDER BY mention_count DESC, message_id ASC) AS rn
  FROM message_mention_counts
)
SELECT message_id, mention_count
FROM ranked_messages
WHERE rn <= 10
ORDER BY mention_count DESC, message_id ASC;
```

### ✅ PASS : CHAT_056 - Join distinct workspaces
```sql
SELECT mm.mentioned_member_id AS workspace_member_id, COUNT(DISTINCT m.workspace_id) AS workspace_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id HAVING COUNT(DISTINCT m.workspace_id) > 1 ORDER BY workspace_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_056 - CTE workspace counts
```sql
WITH member_workspace_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, COUNT(DISTINCT m.workspace_id) AS workspace_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id ) SELECT workspace_member_id, workspace_count FROM member_workspace_mentions WHERE workspace_count > 1 ORDER BY workspace_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_057 - Join attachment messages
```sql
SELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count FROM message_attachments ma JOIN messages m ON ma.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id HAVING COUNT(DISTINCT ma.message_id) > 20 ORDER BY attachment_message_count DESC, m.channel_id ASC;
```

### ✅ PASS : CHAT_057 - CTE attachment counts
```sql
WITH channel_attachment_messages AS (
  SELECT m.channel_id, COUNT(DISTINCT ma.message_id) AS attachment_message_count
  FROM message_attachments ma
  JOIN messages m
    ON ma.message_id = m.id
  WHERE m.channel_id IS NOT NULL
  GROUP BY m.channel_id
)
SELECT channel_id, attachment_message_count
FROM channel_attachment_messages
WHERE attachment_message_count > 20
ORDER BY attachment_message_count DESC, channel_id ASC;
```

### ✅ PASS : CHAT_057 - Count rows
```sql
SELECT m.channel_id, COUNT(*) AS attachment_message_count FROM message_attachments ma JOIN messages m ON ma.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id HAVING COUNT(*) > 20 ORDER BY attachment_message_count DESC, m.channel_id ASC;
```

### ✅ PASS : CHAT_058 - Group conversations
```sql
SELECT conversation_id, COUNT(*) AS total_messages FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id ORDER BY total_messages DESC, conversation_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_058 - CTE conversation totals
```sql
WITH conversation_message_totals AS (
  SELECT conversation_id, COUNT(*) AS total_messages
  FROM messages
  WHERE conversation_id IS NOT NULL
    AND is_deleted = false
  GROUP BY conversation_id
)
SELECT conversation_id, total_messages
FROM conversation_message_totals
ORDER BY total_messages DESC, conversation_id ASC
LIMIT 10;
```

### ✅ PASS : CHAT_058 - Rank conversations
```sql
WITH conversation_message_totals AS (
  SELECT conversation_id, COUNT(*) AS total_messages
  FROM messages
  WHERE conversation_id IS NOT NULL
    AND is_deleted = false
  GROUP BY conversation_id
), ranked_conversations AS (
  SELECT conversation_id, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, conversation_id ASC) AS rn
  FROM conversation_message_totals
)
SELECT conversation_id, total_messages
FROM ranked_conversations
WHERE rn <= 10
ORDER BY total_messages DESC, conversation_id ASC;
```

### ✅ PASS : CHAT_059 - Group muted
```sql
SELECT workspace_member_id, COUNT(*) AS muted_channel_count FROM notification_preferences WHERE mute_until IS NOT NULL GROUP BY workspace_member_id HAVING COUNT(*) > 2 ORDER BY muted_channel_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_059 - CTE muted counts
```sql
WITH member_muted_counts AS ( SELECT workspace_member_id, COUNT(*) AS muted_channel_count FROM notification_preferences WHERE mute_until IS NOT NULL GROUP BY workspace_member_id ) SELECT workspace_member_id, muted_channel_count FROM member_muted_counts WHERE muted_channel_count > 2 ORDER BY muted_channel_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_059 - Filter aggregate
```sql
SELECT workspace_member_id, COUNT(*) FILTER (WHERE mute_until IS NOT NULL) AS muted_channel_count FROM notification_preferences GROUP BY workspace_member_id HAVING COUNT(*) FILTER (WHERE mute_until IS NOT NULL) > 2 ORDER BY muted_channel_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_060 - Filter counts
```sql
SELECT workspace_id, COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites, COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites FROM invites GROUP BY workspace_id ORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_060 - Case sums
```sql
SELECT workspace_id, SUM(CASE WHEN invite_status = 'accepted' THEN 1 ELSE 0 END) AS accepted_invites, SUM(CASE WHEN invite_status = 'pending' THEN 1 ELSE 0 END) AS pending_invites FROM invites GROUP BY workspace_id ORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_060 - CTE invite counts
```sql
WITH workspace_invite_counts AS ( SELECT workspace_id, COUNT(*) FILTER (WHERE invite_status = 'accepted') AS accepted_invites, COUNT(*) FILTER (WHERE invite_status = 'pending') AS pending_invites FROM invites GROUP BY workspace_id ) SELECT workspace_id, accepted_invites, pending_invites FROM workspace_invite_counts ORDER BY accepted_invites DESC, pending_invites DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_061 - Row number winner
```sql
WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn = 1 ORDER BY workspace_id ASC;
```

### ✅ PASS : CHAT_061 - Dense rank winner
```sql
WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, DENSE_RANK() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rnk FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rnk = 1 ORDER BY workspace_id ASC;
```

### ✅ PASS : CHAT_061 - Join max count
```sql
WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_max AS ( SELECT workspace_id, MAX(message_count) AS max_message_count FROM member_message_counts GROUP BY workspace_id ) SELECT mmc.workspace_id, MIN(mmc.sender_member_id) AS sender_member_id, wm.max_message_count AS message_count FROM member_message_counts mmc JOIN workspace_max wm ON mmc.workspace_id = wm.workspace_id AND mmc.message_count = wm.max_message_count GROUP BY mmc.workspace_id, wm.max_message_count ORDER BY mmc.workspace_id ASC;
```

### ✅ PASS : CHAT_062 - Row number per channel
```sql
WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), ranked_messages AS ( SELECT channel_id, message_id, reaction_count, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY reaction_count DESC, message_id ASC) AS rn FROM reaction_counts ) SELECT channel_id, message_id, reaction_count FROM ranked_messages WHERE rn = 1 ORDER BY channel_id ASC;
```

### ✅ PASS : CHAT_062 - Dense rank per channel
```sql
WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), ranked_messages AS ( SELECT channel_id, message_id, reaction_count, DENSE_RANK() OVER (PARTITION BY channel_id ORDER BY reaction_count DESC, message_id ASC) AS rnk FROM reaction_counts ) SELECT channel_id, message_id, reaction_count FROM ranked_messages WHERE rnk = 1 ORDER BY channel_id ASC;
```

### ✅ PASS : CHAT_062 - Join max reactions
```sql
WITH reaction_counts AS ( SELECT m.channel_id, mr.message_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id, mr.message_id ), channel_max AS ( SELECT channel_id, MAX(reaction_count) AS max_reaction_count FROM reaction_counts GROUP BY channel_id ) SELECT rc.channel_id, MIN(rc.message_id) AS message_id, cm.max_reaction_count AS reaction_count FROM reaction_counts rc JOIN channel_max cm ON rc.channel_id = cm.channel_id AND rc.reaction_count = cm.max_reaction_count GROUP BY rc.channel_id, cm.max_reaction_count ORDER BY rc.channel_id ASC;
```

### ✅ PASS : CHAT_063 - Compare to workspace avg
```sql
WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_count FROM member_counts GROUP BY workspace_id ) SELECT mc.workspace_id, mc.sender_member_id, mc.message_count FROM member_counts mc JOIN workspace_avg wa ON mc.workspace_id = wa.workspace_id WHERE mc.message_count > wa.avg_count ORDER BY mc.workspace_id ASC, mc.message_count DESC, mc.sender_member_id ASC;
```

### ✅ PASS : CHAT_063 - Window avg compare
```sql
WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ) SELECT workspace_id, sender_member_id, message_count FROM ( SELECT workspace_id, sender_member_id, message_count, AVG(message_count) OVER (PARTITION BY workspace_id) AS avg_count FROM member_counts ) ranked_members WHERE message_count > avg_count ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_063 - Nested CTE compare
```sql
WITH member_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_count FROM member_counts GROUP BY workspace_id ), above_avg_members AS ( SELECT mc.workspace_id, mc.sender_member_id, mc.message_count FROM member_counts mc JOIN workspace_avg wa ON mc.workspace_id = wa.workspace_id WHERE mc.message_count > wa.avg_count ) SELECT workspace_id, sender_member_id, message_count FROM above_avg_members ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_064 - First reply min
```sql
WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_064 - Subquery first reply
```sql
SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ) fr ON p.id = fr.parent_message_id ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_064 - Window first reply
```sql
WITH replies AS ( SELECT parent_message_id, sent_at, ROW_NUMBER() OVER (PARTITION BY parent_message_id ORDER BY sent_at ASC) AS rn FROM messages WHERE parent_message_id IS NOT NULL ) SELECT p.id AS parent_message_id, ROUND(EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0, 2) AS first_reply_minutes FROM messages p JOIN replies r ON p.id = r.parent_message_id WHERE r.rn = 1 ORDER BY first_reply_minutes ASC, parent_message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_065 - Group saves
```sql
SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ORDER BY saved_count DESC, message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_065 - CTE save totals
```sql
WITH message_save_totals AS ( SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ) SELECT message_id, saved_count FROM message_save_totals ORDER BY saved_count DESC, message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_065 - Rank saved messages
```sql
WITH message_save_totals AS ( SELECT message_id, COUNT(*) AS saved_count FROM saved_messages GROUP BY message_id ), ranked_messages AS ( SELECT message_id, saved_count, ROW_NUMBER() OVER (ORDER BY saved_count DESC, message_id ASC) AS rn FROM message_save_totals ) SELECT message_id, saved_count FROM ranked_messages WHERE rn <= 10 ORDER BY saved_count DESC, message_id ASC;
```

### ✅ PASS : CHAT_066 - Filter ratio
```sql
SELECT channel_id, COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id HAVING COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL)::numeric / COUNT(*) > 0.30 ORDER BY reply_count DESC, channel_id ASC;
```

### ✅ PASS : CHAT_066 - Case ratio
```sql
SELECT channel_id, SUM(CASE WHEN parent_message_id IS NOT NULL THEN 1 ELSE 0 END) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id HAVING SUM(CASE WHEN parent_message_id IS NOT NULL THEN 1 ELSE 0 END)::numeric / COUNT(*) > 0.30 ORDER BY reply_count DESC, channel_id ASC;
```

### ✅ PASS : CHAT_066 - CTE ratios
```sql
WITH channel_message_ratios AS ( SELECT channel_id, COUNT(*) FILTER (WHERE parent_message_id IS NOT NULL) AS reply_count, COUNT(*) AS total_messages FROM messages WHERE channel_id IS NOT NULL GROUP BY channel_id ) SELECT channel_id, reply_count, total_messages FROM channel_message_ratios WHERE reply_count::numeric / total_messages > 0.30 ORDER BY reply_count DESC, channel_id ASC;
```

### ✅ PASS : CHAT_067 - Left join zero
```sql
SELECT DISTINCT mr.workspace_member_id FROM message_reactions mr LEFT JOIN messages m ON mr.workspace_member_id = m.sender_member_id GROUP BY mr.workspace_member_id HAVING COUNT(m.id) = 0 ORDER BY mr.workspace_member_id ASC;
```

### ✅ PASS : CHAT_067 - Not exists sender
```sql
SELECT DISTINCT mr.workspace_member_id FROM message_reactions mr WHERE NOT EXISTS (SELECT 1 FROM messages m WHERE m.sender_member_id = mr.workspace_member_id) ORDER BY mr.workspace_member_id ASC;
```

### ✅ PASS : CHAT_067 - CTE reacting members
```sql
WITH reacting_members AS ( SELECT DISTINCT workspace_member_id FROM message_reactions ) SELECT rm.workspace_member_id FROM reacting_members rm LEFT JOIN messages m ON rm.workspace_member_id = m.sender_member_id GROUP BY rm.workspace_member_id HAVING COUNT(m.id) = 0 ORDER BY rm.workspace_member_id ASC;
```

### ✅ PASS : CHAT_068 - Group by date
```sql
SELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE(sent_at) ORDER BY message_date ASC;
```

### ✅ PASS : CHAT_068 - Date trunc day
```sql
SELECT DATE_TRUNC('day', sent_at)::date AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE_TRUNC('day', sent_at)::date ORDER BY message_date ASC;
```

### ✅ PASS : CHAT_068 - CTE daily totals
```sql
WITH daily_messages AS ( SELECT DATE(sent_at) AS message_date, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY DATE(sent_at) ) SELECT message_date, total_messages FROM daily_messages ORDER BY message_date ASC;
```

### ✅ PASS : CHAT_069 - Avg compare
```sql
WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ), avg_count AS ( SELECT AVG(member_count) AS avg_members FROM channel_counts ) SELECT cc.channel_id, cc.member_count FROM channel_counts cc CROSS JOIN avg_count ac WHERE cc.member_count > ac.avg_members ORDER BY cc.member_count DESC, cc.channel_id ASC;
```

### ✅ PASS : CHAT_069 - Subquery avg
```sql
WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ) SELECT channel_id, member_count FROM channel_counts WHERE member_count > (SELECT AVG(member_count) FROM channel_counts) ORDER BY member_count DESC, channel_id ASC;
```

### ✅ PASS : CHAT_069 - Window avg
```sql
WITH channel_counts AS ( SELECT channel_id, COUNT(*) AS member_count FROM channel_members GROUP BY channel_id ) SELECT channel_id, member_count FROM ( SELECT channel_id, member_count, AVG(member_count) OVER () AS avg_members FROM channel_counts ) cc WHERE member_count > avg_members ORDER BY member_count DESC, channel_id ASC;
```

### ✅ PASS : CHAT_070 - Group hour top1
```sql
SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ORDER BY total_messages DESC, message_hour ASC LIMIT 1;
```

### ✅ PASS : CHAT_070 - CTE hour totals
```sql
WITH hourly_counts AS ( SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ) SELECT message_hour, total_messages FROM hourly_counts ORDER BY total_messages DESC, message_hour ASC LIMIT 1;
```

### ✅ PASS : CHAT_070 - Rank hours
```sql
WITH hourly_counts AS ( SELECT EXTRACT(HOUR FROM sent_at) AS message_hour, COUNT(*) AS total_messages FROM messages WHERE is_deleted = false GROUP BY EXTRACT(HOUR FROM sent_at) ), ranked_hours AS ( SELECT message_hour, total_messages, ROW_NUMBER() OVER (ORDER BY total_messages DESC, message_hour ASC) AS rn FROM hourly_counts ) SELECT message_hour, total_messages FROM ranked_hours WHERE rn = 1;
```

### ✅ PASS : CHAT_071 - Row number streak
```sql
WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), grouped_days AS ( SELECT sender_member_id, message_date, message_date - (ROW_NUMBER() OVER (PARTITION BY sender_member_id ORDER BY message_date))::int AS grp FROM member_days ) SELECT sender_member_id, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp HAVING COUNT(*) >= 3 ORDER BY consecutive_days_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_071 - Lag flags streak
```sql
WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), flagged_days AS ( SELECT sender_member_id, message_date, CASE WHEN message_date = LAG(message_date) OVER (PARTITION BY sender_member_id ORDER BY message_date) + 1 THEN 0 ELSE 1 END AS is_new_group FROM member_days ), grouped_days AS ( SELECT sender_member_id, message_date, SUM(is_new_group) OVER (PARTITION BY sender_member_id ORDER BY message_date ROWS UNBOUNDED PRECEDING) AS grp FROM flagged_days ) SELECT sender_member_id, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp HAVING COUNT(*) >= 3 ORDER BY consecutive_days_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_071 - Nested streak CTE
```sql
WITH member_days AS ( SELECT DISTINCT sender_member_id, DATE(sent_at) AS message_date FROM messages WHERE is_deleted = false ), grouped_days AS ( SELECT sender_member_id, message_date, message_date - (ROW_NUMBER() OVER (PARTITION BY sender_member_id ORDER BY message_date))::int AS grp FROM member_days ), streaks AS ( SELECT sender_member_id, grp, COUNT(*) AS consecutive_days_count FROM grouped_days GROUP BY sender_member_id, grp ) SELECT sender_member_id, consecutive_days_count FROM streaks WHERE consecutive_days_count >= 3 ORDER BY consecutive_days_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_072 - CTE avg compare
```sql
WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ), avg_reply AS ( SELECT AVG(first_reply_minutes) AS avg_first_reply_minutes FROM reply_times ) SELECT rt.parent_message_id, ROUND(rt.first_reply_minutes, 2) AS first_reply_minutes FROM reply_times rt CROSS JOIN avg_reply ar WHERE rt.first_reply_minutes < ar.avg_first_reply_minutes ORDER BY first_reply_minutes ASC, parent_message_id ASC;
```

### ✅ PASS : CHAT_072 - Subquery avg
```sql
WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ) SELECT parent_message_id, ROUND(first_reply_minutes, 2) AS first_reply_minutes FROM reply_times WHERE first_reply_minutes < (SELECT AVG(first_reply_minutes) FROM reply_times) ORDER BY first_reply_minutes ASC, parent_message_id ASC;
```

### ✅ PASS : CHAT_072 - Window avg
```sql
WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), reply_times AS ( SELECT p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id ) SELECT parent_message_id, ROUND(first_reply_minutes, 2) AS first_reply_minutes FROM ( SELECT parent_message_id, first_reply_minutes, AVG(first_reply_minutes) OVER () AS avg_first_reply_minutes FROM reply_times ) rt WHERE first_reply_minutes < avg_first_reply_minutes ORDER BY first_reply_minutes ASC, parent_message_id ASC;
```

### ✅ PASS : CHAT_073 - Channel vs avg
```sql
WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ), member_workspace_avg AS ( SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count FROM member_channel_counts GROUP BY workspace_id, sender_member_id ) SELECT mcc.workspace_id, mcc.channel_id, mcc.sender_member_id, mcc.message_count FROM member_channel_counts mcc JOIN member_workspace_avg mwa ON mcc.workspace_id = mwa.workspace_id AND mcc.sender_member_id = mwa.sender_member_id WHERE mcc.message_count > mwa.avg_channel_message_count ORDER BY mcc.workspace_id ASC, mcc.channel_id ASC, mcc.message_count DESC, mcc.sender_member_id ASC;
```

### ✅ PASS : CHAT_073 - Window avg compare
```sql
WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ) SELECT workspace_id, channel_id, sender_member_id, message_count FROM ( SELECT workspace_id, channel_id, sender_member_id, message_count, AVG(message_count) OVER (PARTITION BY workspace_id, sender_member_id) AS avg_channel_message_count FROM member_channel_counts ) mcc WHERE message_count > avg_channel_message_count ORDER BY workspace_id ASC, channel_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_073 - Nested compare CTE
```sql
WITH member_channel_counts AS ( SELECT workspace_id, channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false AND channel_id IS NOT NULL GROUP BY workspace_id, channel_id, sender_member_id ), member_workspace_avg AS ( SELECT workspace_id, sender_member_id, AVG(message_count) AS avg_channel_message_count FROM member_channel_counts GROUP BY workspace_id, sender_member_id ), above_avg_channels AS ( SELECT mcc.workspace_id, mcc.channel_id, mcc.sender_member_id, mcc.message_count FROM member_channel_counts mcc JOIN member_workspace_avg mwa ON mcc.workspace_id = mwa.workspace_id AND mcc.sender_member_id = mwa.sender_member_id WHERE mcc.message_count > mwa.avg_channel_message_count ) SELECT workspace_id, channel_id, sender_member_id, message_count FROM above_avg_channels ORDER BY workspace_id ASC, channel_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_074 - Join replies
```sql
SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ORDER BY reply_count DESC, p.sender_member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_074 - CTE reply totals
```sql
WITH member_reply_totals AS ( SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ) SELECT sender_member_id, reply_count FROM member_reply_totals ORDER BY reply_count DESC, sender_member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_074 - Rank replied users
```sql
WITH member_reply_totals AS ( SELECT p.sender_member_id, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), ranked_members AS ( SELECT sender_member_id, reply_count, ROW_NUMBER() OVER (ORDER BY reply_count DESC, sender_member_id ASC) AS rn FROM member_reply_totals ) SELECT sender_member_id, reply_count FROM ranked_members WHERE rn <= 10 ORDER BY reply_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_075 - Reaction vs avg
```sql
WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(reaction_count) AS avg_reaction_count FROM member_reaction_counts GROUP BY workspace_id ) SELECT mrc.workspace_id, mrc.workspace_member_id, mrc.reaction_count FROM member_reaction_counts mrc JOIN workspace_avg wa ON mrc.workspace_id = wa.workspace_id WHERE mrc.reaction_count > wa.avg_reaction_count ORDER BY mrc.workspace_id ASC, mrc.reaction_count DESC, mrc.workspace_member_id ASC;
```

### ✅ PASS : CHAT_075 - Window avg reactions
```sql
WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ) SELECT workspace_id, workspace_member_id, reaction_count FROM ( SELECT workspace_id, workspace_member_id, reaction_count, AVG(reaction_count) OVER (PARTITION BY workspace_id) AS avg_reaction_count FROM member_reaction_counts ) mrc WHERE reaction_count > avg_reaction_count ORDER BY workspace_id ASC, reaction_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_075 - Nested reaction CTE
```sql
WITH member_reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(reaction_count) AS avg_reaction_count FROM member_reaction_counts GROUP BY workspace_id ), above_avg_members AS ( SELECT mrc.workspace_id, mrc.workspace_member_id, mrc.reaction_count FROM member_reaction_counts mrc JOIN workspace_avg wa ON mrc.workspace_id = wa.workspace_id WHERE mrc.reaction_count > wa.avg_reaction_count ) SELECT workspace_id, workspace_member_id, reaction_count FROM above_avg_members ORDER BY workspace_id ASC, reaction_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_076 - Top 3 row number
```sql
WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn <= 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_076 - Top 3 dense rank
```sql
WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, DENSE_RANK() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rnk FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rnk <= 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_076 - Join max ranks
```sql
WITH member_message_counts AS ( SELECT workspace_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), ranked_members AS ( SELECT workspace_id, sender_member_id, message_count, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM member_message_counts ) SELECT workspace_id, sender_member_id, message_count FROM ranked_members WHERE rn BETWEEN 1 AND 3 ORDER BY workspace_id ASC, message_count DESC, sender_member_id ASC;
```

### ✅ PASS : CHAT_077 - Recursive depth
```sql
WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ) SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ORDER BY max_reply_depth DESC, root_message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_077 - Recursive rank top
```sql
WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ), root_depths AS ( SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ) SELECT root_message_id, max_reply_depth FROM root_depths ORDER BY max_reply_depth DESC, root_message_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_077 - Recursive row number
```sql
WITH RECURSIVE message_tree AS ( SELECT id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL UNION ALL SELECT mt.root_message_id, m.id, m.parent_message_id, mt.depth + 1 FROM messages m JOIN message_tree mt ON m.parent_message_id = mt.id ), root_depths AS ( SELECT root_message_id, MAX(depth) AS max_reply_depth FROM message_tree GROUP BY root_message_id ), ranked_roots AS ( SELECT root_message_id, max_reply_depth, ROW_NUMBER() OVER (ORDER BY max_reply_depth DESC, root_message_id ASC) AS rn FROM root_depths ) SELECT root_message_id, max_reply_depth FROM ranked_roots WHERE rn <= 10 ORDER BY max_reply_depth DESC, root_message_id ASC;
```

### ✅ PASS : CHAT_078 - Compare to replier avg
```sql
WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_received_replies AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_avg AS ( SELECT rrr.member_id, AVG(COALESCE(rr.received_reply_count, 0)) AS avg_replier_received_reply_count FROM replier_received_replies rrr LEFT JOIN received_replies rr ON rrr.replier_member_id = rr.member_id GROUP BY rrr.member_id ) SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN replier_avg ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count ORDER BY rr.received_reply_count DESC, rr.member_id ASC;
```

### ✅ PASS : CHAT_078 - Nested compare CTE
```sql
WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_pairs AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_avg AS ( SELECT rp.member_id, AVG(COALESCE(rr2.received_reply_count, 0)) AS avg_replier_received_reply_count FROM replier_pairs rp LEFT JOIN received_replies rr2 ON rp.replier_member_id = rr2.member_id GROUP BY rp.member_id ), popular_members AS ( SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN replier_avg ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count ) SELECT member_id, received_reply_count FROM popular_members ORDER BY received_reply_count DESC, member_id ASC;
```

### ✅ PASS : CHAT_078 - Window on repliers
```sql
WITH received_replies AS ( SELECT p.sender_member_id AS member_id, COUNT(*) AS received_reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id GROUP BY p.sender_member_id ), replier_pairs AS ( SELECT p.sender_member_id AS member_id, r.sender_member_id AS replier_member_id FROM messages r JOIN messages p ON r.parent_message_id = p.id ), replier_scores AS ( SELECT rp.member_id, COALESCE(rr2.received_reply_count, 0) AS replier_received_reply_count FROM replier_pairs rp LEFT JOIN received_replies rr2 ON rp.replier_member_id = rr2.member_id ) SELECT rr.member_id, rr.received_reply_count FROM received_replies rr JOIN ( SELECT DISTINCT member_id, AVG(replier_received_reply_count) OVER (PARTITION BY member_id) AS avg_replier_received_reply_count FROM replier_scores ) ra ON rr.member_id = ra.member_id WHERE rr.received_reply_count > ra.avg_replier_received_reply_count ORDER BY rr.received_reply_count DESC, rr.member_id ASC;
```

### ✅ PASS : CHAT_079 - Range window leader
```sql
WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), daily_leaders AS ( SELECT DISTINCT ON (message_date) message_date::date AS message_date, sender_member_id, rolling_7d_count FROM rolling_counts ORDER BY message_date, rolling_7d_count DESC, sender_member_id ASC ) SELECT message_date, sender_member_id, rolling_7d_count FROM daily_leaders ORDER BY message_date ASC;
```

### ✅ PASS : CHAT_079 - Row number leader
```sql
WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), ranked_members AS ( SELECT message_date::date AS message_date, sender_member_id, rolling_7d_count, ROW_NUMBER() OVER (PARTITION BY message_date ORDER BY rolling_7d_count DESC, sender_member_id ASC) AS rn FROM rolling_counts ) SELECT message_date, sender_member_id, rolling_7d_count FROM ranked_members WHERE rn = 1 ORDER BY message_date ASC;
```

### ✅ PASS : CHAT_079 - Nested leader CTE
```sql
WITH daily_member_messages AS ( SELECT DATE_TRUNC('day', sent_at) AS message_date, sender_member_id, COUNT(*) AS daily_count FROM messages WHERE is_deleted = false GROUP BY DATE_TRUNC('day', sent_at), sender_member_id ), rolling_counts AS ( SELECT message_date, sender_member_id, SUM(daily_count) OVER ( PARTITION BY sender_member_id ORDER BY message_date RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW ) AS rolling_7d_count FROM daily_member_messages ), daily_leaders AS ( SELECT DISTINCT ON (message_date) message_date::date AS message_date, sender_member_id, rolling_7d_count FROM rolling_counts ORDER BY message_date, rolling_7d_count DESC, sender_member_id ASC ) SELECT message_date, sender_member_id, rolling_7d_count FROM daily_leaders ORDER BY message_date ASC;
```

### ✅ PASS : CHAT_080 - Lag growth streak
```sql
WITH weekly_channel_messages AS ( SELECT channel_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, DATE_TRUNC('week', sent_at)::date ), weekly_growth AS ( SELECT channel_id, week_start, weekly_count, LAG(weekly_count) OVER (PARTITION BY channel_id ORDER BY week_start) AS prev_week_count FROM weekly_channel_messages ), growth_flags AS ( SELECT channel_id, week_start, CASE WHEN prev_week_count IS NOT NULL AND weekly_count > prev_week_count THEN 1 ELSE 0 END AS is_growth_week FROM weekly_growth ), grouped_growth AS ( SELECT channel_id, week_start, is_growth_week, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY channel_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT channel_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY channel_id, grp HAVING COUNT(*) >= 3 ORDER BY consecutive_growth_weeks DESC, channel_id ASC;
```

### ✅ PASS : CHAT_080 - Nested growth CTE
```sql
WITH weekly_channel_messages AS ( SELECT channel_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, DATE_TRUNC('week', sent_at)::date ), weekly_growth AS ( SELECT channel_id, week_start, weekly_count, LAG(weekly_count) OVER (PARTITION BY channel_id ORDER BY week_start) AS prev_week_count FROM weekly_channel_messages ), growth_flags AS ( SELECT channel_id, week_start, CASE WHEN prev_week_count IS NOT NULL AND weekly_count > prev_week_count THEN 1 ELSE 0 END AS is_growth_week FROM weekly_growth ), grouped_growth AS ( SELECT channel_id, week_start, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY channel_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ), streaks AS ( SELECT channel_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY channel_id, grp ) SELECT channel_id, consecutive_growth_weeks FROM streaks WHERE consecutive_growth_weeks >= 3 ORDER BY consecutive_growth_weeks DESC, channel_id ASC;
```

### ✅ PASS : CHAT_081 - Median first reply
```sql
WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), parent_reply_times AS ( SELECT p.channel_id, p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id WHERE p.channel_id IS NOT NULL ) SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM parent_reply_times GROUP BY channel_id ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_081 - Subquery median
```sql
SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM ( SELECT p.channel_id, EXTRACT(EPOCH FROM (MIN(r.sent_at) - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN messages r ON r.parent_message_id = p.id WHERE p.channel_id IS NOT NULL GROUP BY p.channel_id, p.id, p.sent_at ) parent_reply_times GROUP BY channel_id ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_081 - Nested median CTE
```sql
WITH first_replies AS ( SELECT parent_message_id, MIN(sent_at) AS first_reply_at FROM messages WHERE parent_message_id IS NOT NULL GROUP BY parent_message_id ), parent_reply_times AS ( SELECT p.channel_id, p.id AS parent_message_id, EXTRACT(EPOCH FROM (fr.first_reply_at - p.sent_at)) / 60.0 AS first_reply_minutes FROM messages p JOIN first_replies fr ON p.id = fr.parent_message_id WHERE p.channel_id IS NOT NULL ), channel_medians AS ( SELECT channel_id, ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY first_reply_minutes))::numeric, 2) AS median_first_reply_minutes FROM parent_reply_times GROUP BY channel_id ) SELECT channel_id, median_first_reply_minutes FROM channel_medians ORDER BY median_first_reply_minutes ASC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_082 - Match public count
```sql
WITH public_channels AS ( SELECT workspace_id, COUNT(*) AS public_channel_count FROM channels WHERE visibility = 'public' GROUP BY workspace_id ), public_memberships AS ( SELECT c.workspace_id, cm.workspace_member_id, COUNT(DISTINCT cm.channel_id) AS joined_public_channels FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'public' GROUP BY c.workspace_id, cm.workspace_member_id ) SELECT pm.workspace_id, pm.workspace_member_id FROM public_memberships pm JOIN public_channels pc ON pm.workspace_id = pc.workspace_id WHERE pm.joined_public_channels = pc.public_channel_count ORDER BY pm.workspace_id ASC, pm.workspace_member_id ASC;
```

### ✅ PASS : CHAT_082 - Nested coverage CTE
```sql
WITH public_channels AS ( SELECT workspace_id, COUNT(*) AS public_channel_count FROM channels WHERE visibility = 'public' GROUP BY workspace_id ), public_memberships AS ( SELECT c.workspace_id, cm.workspace_member_id, COUNT(DISTINCT cm.channel_id) AS joined_public_channels FROM channel_members cm JOIN channels c ON cm.channel_id = c.id WHERE c.visibility = 'public' GROUP BY c.workspace_id, cm.workspace_member_id ), fully_covered_members AS ( SELECT pm.workspace_id, pm.workspace_member_id FROM public_memberships pm JOIN public_channels pc ON pm.workspace_id = pc.workspace_id WHERE pm.joined_public_channels = pc.public_channel_count ) SELECT workspace_id, workspace_member_id FROM fully_covered_members ORDER BY workspace_id ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_083 - Full join compare
```sql
WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ) SELECT workspace_id, workspace_member_id FROM combined GROUP BY workspace_id, workspace_member_id HAVING COUNT(*) FILTER (WHERE reaction_count > message_count) > COUNT(*) FILTER (WHERE message_count > reaction_count) ORDER BY workspace_id ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_083 - Case compare
```sql
WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ) SELECT workspace_id, workspace_member_id FROM combined GROUP BY workspace_id, workspace_member_id HAVING SUM(CASE WHEN reaction_count > message_count THEN 1 ELSE 0 END) > SUM(CASE WHEN message_count > reaction_count THEN 1 ELSE 0 END) ORDER BY workspace_id ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_083 - Nested combined CTE
```sql
WITH message_counts AS ( SELECT workspace_id, channel_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, channel_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, m.channel_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.workspace_id, m.channel_id, mr.workspace_member_id ), combined AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id) AS workspace_id, COALESCE(mc.channel_id, rc.channel_id) AS channel_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.channel_id = rc.channel_id AND mc.workspace_member_id = rc.workspace_member_id ), member_channel_balance AS ( SELECT workspace_id, workspace_member_id, COUNT(*) FILTER (WHERE reaction_count > message_count) AS reaction_heavy_channels, COUNT(*) FILTER (WHERE message_count > reaction_count) AS message_heavy_channels FROM combined GROUP BY workspace_id, workspace_member_id ) SELECT workspace_id, workspace_member_id FROM member_channel_balance WHERE reaction_heavy_channels > message_heavy_channels ORDER BY workspace_id ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_084 - Recursive top root
```sql
WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), ranked_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY total_descendant_replies DESC, root_message_id ASC) AS rn FROM reply_totals ) SELECT workspace_id, root_message_id, total_descendant_replies FROM ranked_roots WHERE rn = 1 ORDER BY workspace_id ASC;
```

### ✅ PASS : CHAT_084 - Recursive join max
```sql
WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), workspace_max AS ( SELECT workspace_id, MAX(total_descendant_replies) AS max_descendant_replies FROM reply_totals GROUP BY workspace_id ) SELECT rt.workspace_id, MIN(rt.root_message_id) AS root_message_id, wm.max_descendant_replies AS total_descendant_replies FROM reply_totals rt JOIN workspace_max wm ON rt.workspace_id = wm.workspace_id AND rt.total_descendant_replies = wm.max_descendant_replies GROUP BY rt.workspace_id, wm.max_descendant_replies ORDER BY rt.workspace_id ASC;
```

### ✅ PASS : CHAT_084 - Nested recursive rank
```sql
WITH RECURSIVE reply_tree AS ( SELECT m.workspace_id, m.id AS root_message_id, m.id, m.parent_message_id FROM messages m WHERE m.parent_message_id IS NULL UNION ALL SELECT rt.workspace_id, rt.root_message_id, m.id, m.parent_message_id FROM messages m JOIN reply_tree rt ON m.parent_message_id = rt.id ), reply_totals AS ( SELECT workspace_id, root_message_id, COUNT(*) - 1 AS total_descendant_replies FROM reply_tree GROUP BY workspace_id, root_message_id ), ranked_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY total_descendant_replies DESC, root_message_id ASC) AS rn FROM reply_totals ), top_roots AS ( SELECT workspace_id, root_message_id, total_descendant_replies FROM ranked_roots WHERE rn = 1 ) SELECT workspace_id, root_message_id, total_descendant_replies FROM top_roots ORDER BY workspace_id ASC;
```

### ✅ PASS : CHAT_085 - Three metrics compare
```sql
WITH message_counts AS ( SELECT workspace_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), mention_counts AS ( SELECT m.workspace_id, m.sender_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY m.workspace_id, m.sender_member_id ), member_metrics AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id, mic.workspace_id) AS workspace_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id, mic.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count, COALESCE(mic.mention_count, 0) AS mention_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.workspace_member_id = rc.workspace_member_id FULL OUTER JOIN mention_counts mic ON COALESCE(mc.workspace_id, rc.workspace_id) = mic.workspace_id AND COALESCE(mc.workspace_member_id, rc.workspace_member_id) = mic.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_message_count, AVG(reaction_count) AS avg_reaction_count, AVG(mention_count) AS avg_mention_count FROM member_metrics GROUP BY workspace_id ) SELECT mm.workspace_id, mm.workspace_member_id, mm.message_count, mm.reaction_count, mm.mention_count FROM member_metrics mm JOIN workspace_avg wa ON mm.workspace_id = wa.workspace_id WHERE mm.message_count > wa.avg_message_count AND mm.reaction_count > wa.avg_reaction_count AND mm.mention_count > wa.avg_mention_count ORDER BY mm.workspace_id ASC, mm.workspace_member_id ASC;
```

### ✅ PASS : CHAT_085 - Nested metrics CTE
```sql
WITH message_counts AS ( SELECT workspace_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), mention_counts AS ( SELECT m.workspace_id, m.sender_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY m.workspace_id, m.sender_member_id ), member_metrics AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id, mic.workspace_id) AS workspace_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id, mic.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count, COALESCE(mic.mention_count, 0) AS mention_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.workspace_member_id = rc.workspace_member_id FULL OUTER JOIN mention_counts mic ON COALESCE(mc.workspace_id, rc.workspace_id) = mic.workspace_id AND COALESCE(mc.workspace_member_id, rc.workspace_member_id) = mic.workspace_member_id ), workspace_avg AS ( SELECT workspace_id, AVG(message_count) AS avg_message_count, AVG(reaction_count) AS avg_reaction_count, AVG(mention_count) AS avg_mention_count FROM member_metrics GROUP BY workspace_id ), power_members AS ( SELECT mm.workspace_id, mm.workspace_member_id, mm.message_count, mm.reaction_count, mm.mention_count FROM member_metrics mm JOIN workspace_avg wa ON mm.workspace_id = wa.workspace_id WHERE mm.message_count > wa.avg_message_count AND mm.reaction_count > wa.avg_reaction_count AND mm.mention_count > wa.avg_mention_count ) SELECT workspace_id, workspace_member_id, message_count, reaction_count, mention_count FROM power_members ORDER BY workspace_id ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_085 - Window avg metrics
```sql
WITH message_counts AS ( SELECT workspace_id, sender_member_id AS workspace_member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id ), reaction_counts AS ( SELECT m.workspace_id, mr.workspace_member_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id GROUP BY m.workspace_id, mr.workspace_member_id ), mention_counts AS ( SELECT m.workspace_id, m.sender_member_id AS workspace_member_id, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY m.workspace_id, m.sender_member_id ), member_metrics AS ( SELECT COALESCE(mc.workspace_id, rc.workspace_id, mic.workspace_id) AS workspace_id, COALESCE(mc.workspace_member_id, rc.workspace_member_id, mic.workspace_member_id) AS workspace_member_id, COALESCE(mc.message_count, 0) AS message_count, COALESCE(rc.reaction_count, 0) AS reaction_count, COALESCE(mic.mention_count, 0) AS mention_count FROM message_counts mc FULL OUTER JOIN reaction_counts rc ON mc.workspace_id = rc.workspace_id AND mc.workspace_member_id = rc.workspace_member_id FULL OUTER JOIN mention_counts mic ON COALESCE(mc.workspace_id, rc.workspace_id) = mic.workspace_id AND COALESCE(mc.workspace_member_id, rc.workspace_member_id) = mic.workspace_member_id ) SELECT workspace_id, workspace_member_id, message_count, reaction_count, mention_count FROM ( SELECT workspace_id, workspace_member_id, message_count, reaction_count, mention_count, AVG(message_count) OVER (PARTITION BY workspace_id) AS avg_message_count, AVG(reaction_count) OVER (PARTITION BY workspace_id) AS avg_reaction_count, AVG(mention_count) OVER (PARTITION BY workspace_id) AS avg_mention_count FROM member_metrics ) mm WHERE message_count > avg_message_count AND reaction_count > avg_reaction_count AND mention_count > avg_mention_count ORDER BY workspace_id ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_086 - Unread dormant members
```sql
WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), unread_counts AS ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ) SELECT uc.workspace_member_id, uc.unread_message_count FROM unread_counts uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE (ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days') AND uc.unread_message_count > 20 ORDER BY uc.unread_message_count DESC, uc.workspace_member_id ASC;
```

### ✅ PASS : CHAT_086 - Nested unread CTE
```sql
WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), unread_counts AS ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ), dormant_members AS ( SELECT uc.workspace_member_id, uc.unread_message_count FROM unread_counts uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days' ) SELECT workspace_member_id, unread_message_count FROM dormant_members WHERE unread_message_count > 20 ORDER BY unread_message_count DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_086 - Unread subquery
```sql
WITH last_sent AS ( SELECT sender_member_id AS workspace_member_id, MAX(sent_at) AS last_sent_at FROM messages WHERE is_deleted = false GROUP BY sender_member_id ) SELECT uc.workspace_member_id, uc.unread_message_count FROM ( SELECT cm.workspace_member_id, COUNT(m.id) AS unread_message_count FROM channel_members cm JOIN messages m ON m.channel_id = cm.channel_id AND m.sent_at > COALESCE(cm.last_read_at, TIMESTAMP '1970-01-01') AND m.is_deleted = false GROUP BY cm.workspace_member_id ) uc LEFT JOIN last_sent ls ON uc.workspace_member_id = ls.workspace_member_id WHERE (ls.last_sent_at IS NULL OR ls.last_sent_at < CURRENT_DATE - INTERVAL '30 days') AND uc.unread_message_count > 20 ORDER BY uc.unread_message_count DESC, uc.workspace_member_id ASC;
```

### ✅ PASS : CHAT_087 - Mutual reply pairs
```sql
WITH direct_replies AS ( SELECT LEAST(p.sender_member_id, r.sender_member_id) AS member_1, GREATEST(p.sender_member_id, r.sender_member_id) AS member_2, p.sender_member_id AS original_sender, r.sender_member_id AS replier_sender, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id WHERE p.conversation_id IS NOT NULL AND r.conversation_id = p.conversation_id GROUP BY LEAST(p.sender_member_id, r.sender_member_id), GREATEST(p.sender_member_id, r.sender_member_id), p.sender_member_id, r.sender_member_id ), pair_summary AS ( SELECT member_1, member_2, COUNT(*) FILTER (WHERE original_sender = member_1 AND replier_sender = member_2 AND reply_count >= 3) AS member_2_replies_to_member_1, COUNT(*) FILTER (WHERE original_sender = member_2 AND replier_sender = member_1 AND reply_count >= 3) AS member_1_replies_to_member_2 FROM direct_replies GROUP BY member_1, member_2 ) SELECT member_1, member_2 FROM pair_summary WHERE member_2_replies_to_member_1 > 0 AND member_1_replies_to_member_2 > 0 ORDER BY member_1 ASC, member_2 ASC;
```

### ✅ PASS : CHAT_087 - Case mutual counts
```sql
WITH direct_replies AS ( SELECT LEAST(p.sender_member_id, r.sender_member_id) AS member_1, GREATEST(p.sender_member_id, r.sender_member_id) AS member_2, p.sender_member_id AS original_sender, r.sender_member_id AS replier_sender, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id WHERE p.conversation_id IS NOT NULL AND r.conversation_id = p.conversation_id GROUP BY LEAST(p.sender_member_id, r.sender_member_id), GREATEST(p.sender_member_id, r.sender_member_id), p.sender_member_id, r.sender_member_id ) SELECT member_1, member_2 FROM direct_replies GROUP BY member_1, member_2 HAVING SUM(CASE WHEN original_sender = member_1 AND replier_sender = member_2 AND reply_count >= 3 THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN original_sender = member_2 AND replier_sender = member_1 AND reply_count >= 3 THEN 1 ELSE 0 END) > 0 ORDER BY member_1 ASC, member_2 ASC;
```

### ✅ PASS : CHAT_087 - Nested pair summary
```sql
WITH direct_replies AS ( SELECT LEAST(p.sender_member_id, r.sender_member_id) AS member_1, GREATEST(p.sender_member_id, r.sender_member_id) AS member_2, p.sender_member_id AS original_sender, r.sender_member_id AS replier_sender, COUNT(*) AS reply_count FROM messages r JOIN messages p ON r.parent_message_id = p.id WHERE p.conversation_id IS NOT NULL AND r.conversation_id = p.conversation_id GROUP BY LEAST(p.sender_member_id, r.sender_member_id), GREATEST(p.sender_member_id, r.sender_member_id), p.sender_member_id, r.sender_member_id ), pair_summary AS ( SELECT member_1, member_2, COUNT(*) FILTER (WHERE original_sender = member_1 AND replier_sender = member_2 AND reply_count >= 3) AS member_2_replies_to_member_1, COUNT(*) FILTER (WHERE original_sender = member_2 AND replier_sender = member_1 AND reply_count >= 3) AS member_1_replies_to_member_2 FROM direct_replies GROUP BY member_1, member_2 ), qualifying_pairs AS ( SELECT member_1, member_2 FROM pair_summary WHERE member_2_replies_to_member_1 > 0 AND member_1_replies_to_member_2 > 0 ) SELECT member_1, member_2 FROM qualifying_pairs ORDER BY member_1 ASC, member_2 ASC;
```

### ✅ PASS : CHAT_088 - Top sender share
```sql
WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), channel_totals AS ( SELECT channel_id, SUM(message_count) AS total_messages, MAX(message_count) AS top_member_messages FROM channel_member_counts GROUP BY channel_id ) SELECT channel_id, top_member_messages, total_messages FROM channel_totals WHERE top_member_messages::numeric / total_messages > 0.50 ORDER BY top_member_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_088 - Rank share compare
```sql
WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), ranked_members AS ( SELECT channel_id, sender_member_id, message_count, SUM(message_count) OVER (PARTITION BY channel_id) AS total_messages, ROW_NUMBER() OVER (PARTITION BY channel_id ORDER BY message_count DESC, sender_member_id ASC) AS rn FROM channel_member_counts ) SELECT channel_id, message_count AS top_member_messages, total_messages FROM ranked_members WHERE rn = 1 AND message_count::numeric / total_messages > 0.50 ORDER BY top_member_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_088 - Nested share CTE
```sql
WITH channel_member_counts AS ( SELECT channel_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id, sender_member_id ), channel_totals AS ( SELECT channel_id, SUM(message_count) AS total_messages, MAX(message_count) AS top_member_messages FROM channel_member_counts GROUP BY channel_id ), dominant_channels AS ( SELECT channel_id, top_member_messages, total_messages FROM channel_totals WHERE top_member_messages::numeric / total_messages > 0.50 ) SELECT channel_id, top_member_messages, total_messages FROM dominant_channels ORDER BY top_member_messages DESC, channel_id ASC;
```

### ✅ PASS : CHAT_089 - Lag growth streak
```sql
WITH weekly_workspace_messages AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN weekly_count > LAG(weekly_count) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_workspace_messages ), grouped_growth AS ( SELECT workspace_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp HAVING COUNT(*) >= 4 ORDER BY consecutive_growth_weeks DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_089 - Nested workspace streaks
```sql
WITH weekly_workspace_messages AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS weekly_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN weekly_count > LAG(weekly_count) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_workspace_messages ), grouped_growth AS ( SELECT workspace_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ), streaks AS ( SELECT workspace_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp ) SELECT workspace_id, consecutive_growth_weeks FROM streaks WHERE consecutive_growth_weeks >= 4 ORDER BY consecutive_growth_weeks DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_090 - Median vs workspace
```sql
WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ), workspace_reply_times AS ( SELECT workspace_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS workspace_median_reply_minutes FROM member_reply_times GROUP BY workspace_id ) SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm JOIN workspace_reply_times wrt ON mm.workspace_id = wrt.workspace_id WHERE mm.member_median_reply_minutes < wrt.workspace_median_reply_minutes ORDER BY mm.workspace_id ASC, member_median_reply_minutes ASC, mm.workspace_member_id ASC;
```

### ✅ PASS : CHAT_090 - Nested median CTE
```sql
WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ), workspace_reply_times AS ( SELECT workspace_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS workspace_median_reply_minutes FROM member_reply_times GROUP BY workspace_id ), faster_members AS ( SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm JOIN workspace_reply_times wrt ON mm.workspace_id = wrt.workspace_id WHERE mm.member_median_reply_minutes < wrt.workspace_median_reply_minutes ) SELECT workspace_id, workspace_member_id, member_median_reply_minutes FROM faster_members ORDER BY workspace_id ASC, member_median_reply_minutes ASC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_090 - Subquery median compare
```sql
WITH member_reply_times AS ( SELECT r.workspace_id, r.sender_member_id AS workspace_member_id, EXTRACT(EPOCH FROM (r.sent_at - p.sent_at)) / 60.0 AS reply_minutes FROM messages r JOIN messages p ON r.parent_message_id = p.id ), member_medians AS ( SELECT workspace_id, workspace_member_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY reply_minutes) AS member_median_reply_minutes FROM member_reply_times GROUP BY workspace_id, workspace_member_id ) SELECT mm.workspace_id, mm.workspace_member_id, ROUND(mm.member_median_reply_minutes::numeric, 2) AS member_median_reply_minutes FROM member_medians mm WHERE mm.member_median_reply_minutes < ( SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY mrt.reply_minutes) FROM member_reply_times mrt WHERE mrt.workspace_id = mm.workspace_id ) ORDER BY mm.workspace_id ASC, member_median_reply_minutes ASC, mm.workspace_member_id ASC;
```

### ✅ PASS : CHAT_091 - 30 day growth
```sql
WITH current_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), previous_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM current_30d c FULL OUTER JOIN previous_30d p ON c.member_id = p.member_id ORDER BY growth_count DESC, member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_091 - Subquery growth
```sql
SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) c FULL OUTER JOIN ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ) p ON c.member_id = p.member_id ORDER BY growth_count DESC, member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_091 - Nested growth CTE
```sql
WITH current_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS current_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), previous_30d AS ( SELECT sender_member_id AS member_id, COUNT(*) AS previous_count FROM messages WHERE is_deleted = false AND sent_at >= CURRENT_DATE - INTERVAL '60 days' AND sent_at < CURRENT_DATE - INTERVAL '30 days' GROUP BY sender_member_id ), member_growth AS ( SELECT COALESCE(c.member_id, p.member_id) AS member_id, COALESCE(c.current_count, 0) - COALESCE(p.previous_count, 0) AS growth_count FROM current_30d c FULL OUTER JOIN previous_30d p ON c.member_id = p.member_id ) SELECT member_id, growth_count FROM member_growth ORDER BY growth_count DESC, member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_092 - Recursive thread stats
```sql
WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ), thread_stats AS ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ) SELECT DISTINCT channel_id FROM thread_stats WHERE max_depth > 5 AND total_replies > 20 ORDER BY channel_id ASC;
```

### ✅ PASS : CHAT_092 - Nested thread CTE
```sql
WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ), thread_stats AS ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ), qualifying_threads AS ( SELECT channel_id, root_message_id FROM thread_stats WHERE max_depth > 5 AND total_replies > 20 ) SELECT DISTINCT channel_id FROM qualifying_threads ORDER BY channel_id ASC;
```

### ✅ PASS : CHAT_092 - Recursive grouped stats
```sql
WITH RECURSIVE thread_tree AS ( SELECT channel_id, id AS root_message_id, id, parent_message_id, 0 AS depth FROM messages WHERE parent_message_id IS NULL AND channel_id IS NOT NULL UNION ALL SELECT tt.channel_id, tt.root_message_id, m.id, m.parent_message_id, tt.depth + 1 FROM messages m JOIN thread_tree tt ON m.parent_message_id = tt.id ) SELECT DISTINCT channel_id FROM ( SELECT channel_id, root_message_id, MAX(depth) AS max_depth, COUNT(*) - 1 AS total_replies FROM thread_tree GROUP BY channel_id, root_message_id ) ts WHERE max_depth > 5 AND total_replies > 20 ORDER BY channel_id ASC;
```

### ✅ PASS : CHAT_093 - Interaction score
```sql
WITH channel_messages AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ), channel_reactions AS ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ), channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ) SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM channel_messages cm FULL OUTER JOIN channel_reactions cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN channel_replies cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_093 - Nested score CTE
```sql
WITH channel_messages AS ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ), channel_reactions AS ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ), channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ), channel_scores AS ( SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM channel_messages cm FULL OUTER JOIN channel_reactions cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN channel_replies cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ) SELECT channel_id, interaction_score FROM channel_scores ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_093 - Join score subqueries
```sql
SELECT COALESCE(cm.channel_id, cr.channel_id, cp.channel_id) AS channel_id, COALESCE(cm.message_count,0) + COALESCE(cr.reaction_count,0) + COALESCE(cp.reply_count,0) AS interaction_score FROM ( SELECT channel_id, COUNT(*) AS message_count FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY channel_id ) cm FULL OUTER JOIN ( SELECT m.channel_id, COUNT(*) AS reaction_count FROM message_reactions mr JOIN messages m ON mr.message_id = m.id WHERE m.channel_id IS NOT NULL GROUP BY m.channel_id ) cr ON cm.channel_id = cr.channel_id FULL OUTER JOIN ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL GROUP BY channel_id ) cp ON COALESCE(cm.channel_id, cr.channel_id) = cp.channel_id ORDER BY interaction_score DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_094 - Every channel match
```sql
WITH workspace_channels AS ( SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ), member_channel_activity AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(DISTINCT channel_id) AS active_channels FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, sender_member_id ) SELECT mca.workspace_id, mca.member_id FROM member_channel_activity mca JOIN workspace_channels wc ON mca.workspace_id = wc.workspace_id WHERE mca.active_channels = wc.total_channels ORDER BY mca.workspace_id ASC, mca.member_id ASC;
```

### ✅ PASS : CHAT_094 - Not exists missing channel
```sql
SELECT wm.workspace_id, wm.id AS member_id FROM workspace_members wm WHERE NOT EXISTS ( SELECT 1 FROM channels c WHERE c.workspace_id = wm.workspace_id AND NOT EXISTS ( SELECT 1 FROM messages m WHERE m.workspace_id = wm.workspace_id AND m.channel_id = c.id AND m.sender_member_id = wm.id AND m.is_deleted = false ) ) ORDER BY wm.workspace_id ASC, member_id ASC;
```

### ✅ PASS : CHAT_094 - Nested coverage CTE
```sql
WITH workspace_channels AS ( SELECT workspace_id, COUNT(*) AS total_channels FROM channels GROUP BY workspace_id ), member_channel_activity AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(DISTINCT channel_id) AS active_channels FROM messages WHERE channel_id IS NOT NULL AND is_deleted = false GROUP BY workspace_id, sender_member_id ), power_members AS ( SELECT mca.workspace_id, mca.member_id FROM member_channel_activity mca JOIN workspace_channels wc ON mca.workspace_id = wc.workspace_id WHERE mca.active_channels = wc.total_channels ) SELECT workspace_id, member_id FROM power_members ORDER BY workspace_id ASC, member_id ASC;
```

### ✅ PASS : CHAT_095 - Replies per hour
```sql
WITH channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ) SELECT channel_id, ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour FROM channel_replies ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_095 - Direct rate query
```sql
SELECT channel_id, ROUND(COUNT(*)::numeric / (7 * 24), 2) AS replies_per_hour FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_095 - Nested rate CTE
```sql
WITH channel_replies AS ( SELECT channel_id, COUNT(*) AS reply_count FROM messages WHERE channel_id IS NOT NULL AND parent_message_id IS NOT NULL AND sent_at >= CURRENT_DATE - INTERVAL '7 days' GROUP BY channel_id ), channel_velocity AS ( SELECT channel_id, ROUND(reply_count::numeric / (7 * 24), 2) AS replies_per_hour FROM channel_replies ) SELECT channel_id, replies_per_hour FROM channel_velocity ORDER BY replies_per_hour DESC, channel_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_096 - Mention growth streak
```sql
WITH weekly_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, DATE_TRUNC('week', m.sent_at)::date AS week_start, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id, DATE_TRUNC('week', m.sent_at)::date ), growth_flags AS ( SELECT workspace_member_id, week_start, CASE WHEN mention_count > LAG(mention_count) OVER (PARTITION BY workspace_member_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_mentions ), grouped_growth AS ( SELECT workspace_member_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_member_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_member_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_member_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_member_id, grp HAVING COUNT(*) >= 3 ORDER BY consecutive_growth_weeks DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_096 - Nested mention streaks
```sql
WITH weekly_mentions AS ( SELECT mm.mentioned_member_id AS workspace_member_id, DATE_TRUNC('week', m.sent_at)::date AS week_start, COUNT(*) AS mention_count FROM message_mentions mm JOIN messages m ON mm.message_id = m.id GROUP BY mm.mentioned_member_id, DATE_TRUNC('week', m.sent_at)::date ), growth_flags AS ( SELECT workspace_member_id, week_start, CASE WHEN mention_count > LAG(mention_count) OVER (PARTITION BY workspace_member_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_mentions ), grouped_growth AS ( SELECT workspace_member_id, week_start, ROW_NUMBER() OVER (PARTITION BY workspace_member_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_member_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ), streaks AS ( SELECT workspace_member_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_member_id, grp ) SELECT workspace_member_id, consecutive_growth_weeks FROM streaks WHERE consecutive_growth_weeks >= 3 ORDER BY consecutive_growth_weeks DESC, workspace_member_id ASC;
```

### ✅ PASS : CHAT_097 - Sender balance
```sql
WITH sender_counts AS ( SELECT conversation_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id, sender_member_id ), conversation_balance AS ( SELECT conversation_id, MIN(message_count) AS min_sender_messages, MAX(message_count) AS max_sender_messages, SUM(message_count) AS total_messages, COUNT(*) AS sender_count FROM sender_counts GROUP BY conversation_id HAVING COUNT(*) > 1 ) SELECT conversation_id, sender_count, total_messages FROM conversation_balance ORDER BY (max_sender_messages - min_sender_messages) ASC, total_messages DESC, conversation_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_097 - Nested balance
```sql
SELECT conversation_id, sender_count, total_messages FROM ( SELECT conversation_id, MIN(message_count) AS min_sender_messages, MAX(message_count) AS max_sender_messages, SUM(message_count) AS total_messages, COUNT(*) AS sender_count FROM ( SELECT conversation_id, sender_member_id, COUNT(*) AS message_count FROM messages WHERE conversation_id IS NOT NULL AND is_deleted = false GROUP BY conversation_id, sender_member_id ) sender_counts GROUP BY conversation_id HAVING COUNT(*) > 1 ) conversation_balance ORDER BY (max_sender_messages - min_sender_messages) ASC, total_messages DESC, conversation_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_098 - Weekly growth streak
```sql
WITH weekly_scores AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS message_score FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN message_score > LAG(message_score) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_scores ), grouped_growth AS ( SELECT workspace_id, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ) SELECT workspace_id, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp HAVING COUNT(*) >= 4 ORDER BY consecutive_growth_weeks DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_098 - Nested growth CTE
```sql
WITH weekly_scores AS ( SELECT workspace_id, DATE_TRUNC('week', sent_at)::date AS week_start, COUNT(*) AS message_score FROM messages WHERE is_deleted = false GROUP BY workspace_id, DATE_TRUNC('week', sent_at)::date ), growth_flags AS ( SELECT workspace_id, week_start, CASE WHEN message_score > LAG(message_score) OVER (PARTITION BY workspace_id ORDER BY week_start) THEN 1 ELSE 0 END AS is_growth_week FROM weekly_scores ), grouped_growth AS ( SELECT workspace_id, ROW_NUMBER() OVER (PARTITION BY workspace_id ORDER BY week_start) - ROW_NUMBER() OVER (PARTITION BY workspace_id, is_growth_week ORDER BY week_start) AS grp FROM growth_flags WHERE is_growth_week = 1 ), workspace_streaks AS ( SELECT workspace_id, grp, COUNT(*) AS consecutive_growth_weeks FROM grouped_growth GROUP BY workspace_id, grp ) SELECT workspace_id, consecutive_growth_weeks FROM workspace_streaks WHERE consecutive_growth_weeks >= 4 ORDER BY consecutive_growth_weeks DESC, workspace_id ASC;
```

### ✅ PASS : CHAT_099 - P90 compare
```sql
WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), percentile_value AS ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) AS p90 FROM member_counts ) SELECT mc.member_id, mc.message_count FROM member_counts mc CROSS JOIN percentile_value pv WHERE mc.message_count > pv.p90 ORDER BY mc.message_count DESC, mc.member_id ASC;
```

### ✅ PASS : CHAT_099 - Subquery p90
```sql
WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ) SELECT member_id, message_count FROM member_counts WHERE message_count > ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) FROM member_counts ) ORDER BY message_count DESC, member_id ASC;
```

### ✅ PASS : CHAT_099 - Nested percentile CTE
```sql
WITH member_counts AS ( SELECT sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY sender_member_id ), percentile_value AS ( SELECT PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY message_count) AS p90 FROM member_counts ), top_members AS ( SELECT mc.member_id, mc.message_count FROM member_counts mc CROSS JOIN percentile_value pv WHERE mc.message_count > pv.p90 ) SELECT member_id, message_count FROM top_members ORDER BY message_count DESC, member_id ASC;
```

### ✅ PASS : CHAT_100 - 50 plus workspaces
```sql
WITH workspace_user_counts AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ) SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM workspace_user_counts GROUP BY member_id ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_100 - Nested power CTE
```sql
WITH workspace_user_counts AS ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ), power_users AS ( SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM workspace_user_counts GROUP BY member_id ) SELECT member_id, active_workspace_count FROM power_users ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;
```

### ✅ PASS : CHAT_100 - Subquery workspaces
```sql
SELECT member_id, COUNT(DISTINCT workspace_id) AS active_workspace_count FROM ( SELECT workspace_id, sender_member_id AS member_id, COUNT(*) AS message_count FROM messages WHERE is_deleted = false GROUP BY workspace_id, sender_member_id HAVING COUNT(*) >= 50 ) workspace_user_counts GROUP BY member_id ORDER BY active_workspace_count DESC, member_id ASC LIMIT 10;
```

