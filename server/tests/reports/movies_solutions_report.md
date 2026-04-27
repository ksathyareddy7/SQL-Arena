# Solutions Evaluation Report (movies)

**Summary:**
- Total Approaches: 300
- Passed: 300
- Failed: 0

## Detailed Results
### ✅ PASS : MOVIES_001 - COUNT rows
```sql
SELECT COUNT(*) AS total_users FROM users;
```

### ✅ PASS : MOVIES_001 - COUNT ids
```sql
SELECT COUNT(id) AS total_users FROM users;
```

### ✅ PASS : MOVIES_001 - CTE count
```sql
WITH user_count AS (
  SELECT COUNT(*) AS total_users
  FROM users
)
SELECT total_users
FROM user_count;
```

### ✅ PASS : MOVIES_002 - Filter count
```sql
SELECT COUNT(*) AS active_profiles FROM profiles WHERE is_active = true;
```

### ✅ PASS : MOVIES_002 - Boolean short
```sql
SELECT COUNT(*) AS active_profiles FROM profiles WHERE is_active;
```

### ✅ PASS : MOVIES_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_profiles FROM profiles;
```

### ✅ PASS : MOVIES_003 - COUNT titles
```sql
SELECT COUNT(*) AS total_titles FROM titles;
```

### ✅ PASS : MOVIES_003 - COUNT ids
```sql
SELECT COUNT(id) AS total_titles FROM titles;
```

### ✅ PASS : MOVIES_003 - Subquery count
```sql
SELECT COUNT(*) AS total_titles FROM (SELECT id FROM titles) t;
```

### ✅ PASS : MOVIES_004 - Filter publish
```sql
SELECT id, title_name, title_type FROM titles WHERE content_status = 'published' ORDER BY id ASC;
```

### ✅ PASS : MOVIES_004 - IN filter
```sql
SELECT id, title_name, title_type FROM titles WHERE content_status IN ('published') ORDER BY id ASC;
```

### ✅ PASS : MOVIES_004 - CTE publish
```sql
WITH published_titles AS (
  SELECT id, title_name, title_type
  FROM titles
  WHERE content_status = 'published'
)
SELECT id, title_name, title_type
FROM published_titles
ORDER BY id ASC;
```

### ✅ PASS : MOVIES_005 - Filter originals
```sql
SELECT id, title_name, release_year FROM titles WHERE is_original = true ORDER BY release_year DESC, id ASC;
```

### ✅ PASS : MOVIES_005 - Boolean short
```sql
SELECT id, title_name, release_year FROM titles WHERE is_original ORDER BY release_year DESC, id ASC;
```

### ✅ PASS : MOVIES_005 - CASE sort
```sql
SELECT id, title_name, release_year FROM titles WHERE is_original = true ORDER BY COALESCE(release_year, 0) DESC, id ASC;
```

### ✅ PASS : MOVIES_006 - IN qualities
```sql
SELECT id, plan_name, video_quality, price FROM subscription_plans WHERE video_quality IN ('hd', 'full_hd', 'uhd') ORDER BY price ASC, id ASC;
```

### ✅ PASS : MOVIES_006 - OR checks
```sql
SELECT id, plan_name, video_quality, price FROM subscription_plans WHERE video_quality = 'hd' OR video_quality = 'full_hd' OR video_quality = 'uhd' ORDER BY price ASC, id ASC;
```

### ✅ PASS : MOVIES_006 - CTE plans
```sql
WITH eligible_plans AS (
  SELECT id, plan_name, video_quality, price
  FROM subscription_plans
  WHERE video_quality IN ('hd', 'full_hd', 'uhd')
)
SELECT id, plan_name, video_quality, price
FROM eligible_plans
ORDER BY price ASC, id ASC;
```

### ✅ PASS : MOVIES_007 - Type and year
```sql
SELECT id, title_name, release_year FROM titles WHERE title_type = 'movie' AND release_year > 2020 ORDER BY release_year DESC, id ASC;
```

### ✅ PASS : MOVIES_007 - BETWEEN style
```sql
SELECT id, title_name, release_year FROM titles WHERE title_type = 'movie' AND release_year >= 2021 ORDER BY release_year DESC, id ASC;
```

### ✅ PASS : MOVIES_007 - CTE movies
```sql
WITH recent_movies AS (
  SELECT id, title_name, release_year
  FROM titles
  WHERE title_type = 'movie'
    AND release_year > 2020
)
SELECT id, title_name, release_year
FROM recent_movies
ORDER BY release_year DESC, id ASC;
```

### ✅ PASS : MOVIES_008 - Score filter
```sql
SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score > 8 ORDER BY imdb_like_score DESC, id ASC;
```

### ✅ PASS : MOVIES_008 - Exclude NULLs
```sql
SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score IS NOT NULL AND imdb_like_score > 8 ORDER BY imdb_like_score DESC, id ASC;
```

### ✅ PASS : MOVIES_008 - Subquery score
```sql
SELECT id, title_name, imdb_like_score FROM (SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score > 8) t ORDER BY imdb_like_score DESC, id ASC;
```

### ✅ PASS : MOVIES_009 - Status filter
```sql
SELECT id, profile_id, device_id, download_status FROM downloads WHERE download_status = 'completed' ORDER BY id ASC;
```

### ✅ PASS : MOVIES_009 - IN status
```sql
SELECT id, profile_id, device_id, download_status FROM downloads WHERE download_status IN ('completed') ORDER BY id ASC;
```

### ✅ PASS : MOVIES_009 - CTE downloads
```sql
WITH completed_downloads AS (
  SELECT id, profile_id, device_id, download_status
  FROM downloads
  WHERE download_status = 'completed'
)
SELECT id, profile_id, device_id, download_status
FROM completed_downloads
ORDER BY id ASC;
```

### ✅ PASS : MOVIES_010 - Sort and limit
```sql
SELECT id, title_name, critic_score FROM titles WHERE critic_score IS NOT NULL ORDER BY critic_score DESC, id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_010 - Subquery top
```sql
SELECT id, title_name, critic_score FROM (SELECT id, title_name, critic_score FROM titles WHERE critic_score IS NOT NULL ORDER BY critic_score DESC, id ASC LIMIT 5) t ORDER BY critic_score DESC, id ASC;
```

### ✅ PASS : MOVIES_010 - Rank window
```sql
SELECT id, title_name, critic_score FROM (SELECT id, title_name, critic_score, ROW_NUMBER() OVER (ORDER BY critic_score DESC, id ASC) AS rn FROM titles WHERE critic_score IS NOT NULL) ranked WHERE rn <= 5 ORDER BY critic_score DESC, id ASC;
```

### ✅ PASS : MOVIES_011 - GROUP count
```sql
SELECT title_type, COUNT(*) AS total_titles FROM titles GROUP BY title_type ORDER BY total_titles DESC, title_type ASC;
```

### ✅ PASS : MOVIES_011 - COUNT ids
```sql
SELECT title_type, COUNT(id) AS total_titles FROM titles GROUP BY title_type ORDER BY total_titles DESC, title_type ASC;
```

### ✅ PASS : MOVIES_011 - CTE types
```sql
WITH type_counts AS (
  SELECT title_type, COUNT(*) AS total_titles
  FROM titles
  GROUP BY title_type
)
SELECT title_type, total_titles
FROM type_counts
ORDER BY total_titles DESC, title_type ASC;
```

### ✅ PASS : MOVIES_012 - Group profiles
```sql
SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id ORDER BY profile_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_012 - COUNT ids
```sql
SELECT user_id, COUNT(id) AS profile_count FROM profiles GROUP BY user_id ORDER BY profile_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_012 - User join
```sql
SELECT u.id AS user_id, COUNT(p.id) AS profile_count FROM users u JOIN profiles p ON u.id = p.user_id GROUP BY u.id ORDER BY profile_count DESC, u.id ASC;
```

### ✅ PASS : MOVIES_013 - Group language
```sql
SELECT original_language, COUNT(*) AS total_titles FROM titles GROUP BY original_language ORDER BY total_titles DESC, original_language ASC;
```

### ✅ PASS : MOVIES_013 - COUNT ids
```sql
SELECT original_language, COUNT(id) AS total_titles FROM titles GROUP BY original_language ORDER BY total_titles DESC, original_language ASC;
```

### ✅ PASS : MOVIES_013 - CTE lang
```sql
WITH language_counts AS (
  SELECT original_language, COUNT(*) AS total_titles
  FROM titles
  GROUP BY original_language
)
SELECT original_language, total_titles
FROM language_counts
ORDER BY total_titles DESC, original_language ASC;
```

### ✅ PASS : MOVIES_014 - AVG runtime
```sql
SELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes FROM titles WHERE title_type = 'movie' AND runtime_minutes IS NOT NULL;
```

### ✅ PASS : MOVIES_014 - AVG only
```sql
SELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes FROM titles WHERE title_type = 'movie';
```

### ✅ PASS : MOVIES_014 - CTE avg
```sql
WITH movie_runtimes AS (
  SELECT runtime_minutes
  FROM titles
  WHERE title_type = 'movie' AND runtime_minutes IS NOT NULL
)
SELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes
FROM movie_runtimes;
```

### ✅ PASS : MOVIES_015 - Count active
```sql
SELECT COUNT(*) AS active_subscriptions FROM subscriptions WHERE subscription_status = 'active';
```

### ✅ PASS : MOVIES_015 - FILTER agg
```sql
SELECT COUNT(*) FILTER (WHERE subscription_status = 'active') AS active_subscriptions FROM subscriptions;
```

### ✅ PASS : MOVIES_015 - CTE active
```sql
WITH active_subs AS (
  SELECT COUNT(*) AS active_subscriptions
  FROM subscriptions
  WHERE subscription_status = 'active'
)
SELECT active_subscriptions
FROM active_subs;
```

### ✅ PASS : MOVIES_016 - HAVING count
```sql
SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY profile_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_016 - COUNT ids
```sql
SELECT user_id, COUNT(id) AS profile_count FROM profiles GROUP BY user_id HAVING COUNT(id) > 1 ORDER BY profile_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_016 - CTE users
```sql
WITH profile_counts AS (
  SELECT user_id, COUNT(*) AS profile_count
  FROM profiles
  GROUP BY user_id
)
SELECT user_id, profile_count
FROM profile_counts
WHERE profile_count > 1
ORDER BY profile_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_017 - Group ratings
```sql
SELECT title_id, COUNT(*) AS ratings_count FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY ratings_count DESC, title_id ASC;
```

### ✅ PASS : MOVIES_017 - COUNT values
```sql
SELECT title_id, COUNT(rating_value) AS ratings_count FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY ratings_count DESC, title_id ASC;
```

### ✅ PASS : MOVIES_017 - CTE rated
```sql
WITH title_ratings AS (
  SELECT title_id, COUNT(*) AS ratings_count
  FROM ratings
  WHERE title_id IS NOT NULL
  GROUP BY title_id
)
SELECT title_id, ratings_count
FROM title_ratings
ORDER BY ratings_count DESC, title_id ASC;
```

### ✅ PASS : MOVIES_018 - Group device
```sql
SELECT device_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY device_id ORDER BY completed_downloads DESC, device_id ASC;
```

### ✅ PASS : MOVIES_018 - COUNT ids
```sql
SELECT device_id, COUNT(id) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY device_id ORDER BY completed_downloads DESC, device_id ASC;
```

### ✅ PASS : MOVIES_018 - CTE done
```sql
WITH device_downloads AS (
  SELECT device_id, COUNT(*) AS completed_downloads
  FROM downloads
  WHERE download_status = 'completed'
  GROUP BY device_id
)
SELECT device_id, completed_downloads
FROM device_downloads
ORDER BY completed_downloads DESC, device_id ASC;
```

### ✅ PASS : MOVIES_019 - AVG title
```sql
SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_rating DESC, title_id ASC;
```

### ✅ PASS : MOVIES_019 - CTE average
```sql
WITH title_avg AS (
  SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating
  FROM ratings
  WHERE title_id IS NOT NULL
  GROUP BY title_id
)
SELECT title_id, avg_rating
FROM title_avg
ORDER BY avg_rating DESC, title_id ASC;
```

### ✅ PASS : MOVIES_019 - Subquery avg
```sql
SELECT title_id, avg_rating FROM (SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id) t ORDER BY avg_rating DESC, title_id ASC;
```

### ✅ PASS : MOVIES_020 - Group limit
```sql
SELECT title_id, COUNT(*) AS watchlist_adds FROM watchlists GROUP BY title_id ORDER BY watchlist_adds DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_020 - COUNT ids
```sql
SELECT title_id, COUNT(id) AS watchlist_adds FROM watchlists GROUP BY title_id ORDER BY watchlist_adds DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_020 - Rank top
```sql
SELECT title_id, watchlist_adds FROM (SELECT title_id, COUNT(*) AS watchlist_adds, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, title_id ASC) AS rn FROM watchlists GROUP BY title_id) ranked WHERE rn <= 5 ORDER BY watchlist_adds DESC, title_id ASC;
```

### ✅ PASS : MOVIES_021 - Inner join
```sql
SELECT u.id, u.email, sp.plan_name FROM users u JOIN subscriptions s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' ORDER BY u.id ASC;
```

### ✅ PASS : MOVIES_021 - CTE active
```sql
WITH active_subscriptions AS (
  SELECT user_id, plan_id
  FROM subscriptions
  WHERE subscription_status = 'active'
)
SELECT u.id, u.email, sp.plan_name
FROM users u
JOIN active_subscriptions a ON u.id = a.user_id
JOIN subscription_plans sp ON a.plan_id = sp.id
ORDER BY u.id ASC;
```

### ✅ PASS : MOVIES_021 - Subquery join
```sql
SELECT u.id, u.email, sp.plan_name FROM users u JOIN (SELECT user_id, plan_id FROM subscriptions WHERE subscription_status = 'active') s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id ORDER BY u.id ASC;
```

### ✅ PASS : MOVIES_022 - Bridge join
```sql
SELECT t.id, t.title_name, c.category_name FROM titles t JOIN title_categories tc ON t.id = tc.title_id JOIN content_categories c ON tc.category_id = c.id ORDER BY t.id ASC, c.category_name ASC;
```

### ✅ PASS : MOVIES_022 - CTE mapped
```sql
WITH title_category_map AS (
  SELECT tc.title_id, c.category_name
  FROM title_categories tc
  JOIN content_categories c ON tc.category_id = c.id
)
SELECT t.id, t.title_name, m.category_name
FROM titles t
JOIN title_category_map m ON t.id = m.title_id
ORDER BY t.id ASC, m.category_name ASC;
```

### ✅ PASS : MOVIES_022 - From bridge
```sql
SELECT t.id, t.title_name, c.category_name FROM title_categories tc JOIN titles t ON tc.title_id = t.id JOIN content_categories c ON tc.category_id = c.id ORDER BY t.id ASC, c.category_name ASC;
```

### ✅ PASS : MOVIES_023 - Group episodes
```sql
SELECT season_id, COUNT(*) AS episode_count FROM episodes GROUP BY season_id ORDER BY episode_count DESC, season_id ASC;
```

### ✅ PASS : MOVIES_023 - COUNT ids
```sql
SELECT season_id, COUNT(id) AS episode_count FROM episodes GROUP BY season_id ORDER BY episode_count DESC, season_id ASC;
```

### ✅ PASS : MOVIES_023 - CTE seasons
```sql
WITH season_episode_counts AS (
  SELECT season_id, COUNT(*) AS episode_count
  FROM episodes
  GROUP BY season_id
)
SELECT season_id, episode_count
FROM season_episode_counts
ORDER BY episode_count DESC, season_id ASC;
```

### ✅ PASS : MOVIES_024 - Group sessions
```sql
SELECT profile_id, COUNT(*) AS session_count FROM viewing_sessions GROUP BY profile_id ORDER BY session_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_024 - COUNT ids
```sql
SELECT profile_id, COUNT(id) AS session_count FROM viewing_sessions GROUP BY profile_id ORDER BY session_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_024 - CTE sessions
```sql
WITH profile_sessions AS (
  SELECT profile_id, COUNT(*) AS session_count
  FROM viewing_sessions
  GROUP BY profile_id
)
SELECT profile_id, session_count
FROM profile_sessions
ORDER BY session_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_025 - Top views
```sql
SELECT title_id, COUNT(*) AS total_views FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY total_views DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_025 - COUNT ids
```sql
SELECT title_id, COUNT(id) AS total_views FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY total_views DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_025 - Rank views
```sql
SELECT title_id, total_views FROM (SELECT title_id, COUNT(*) AS total_views, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, title_id ASC) AS rn FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) ranked WHERE rn <= 5 ORDER BY total_views DESC, title_id ASC;
```

### ✅ PASS : MOVIES_026 - Role count
```sql
SELECT role_type, COUNT(*) AS total_people FROM title_credits GROUP BY role_type ORDER BY total_people DESC, role_type ASC;
```

### ✅ PASS : MOVIES_026 - COUNT person
```sql
SELECT role_type, COUNT(person_id) AS total_people FROM title_credits GROUP BY role_type ORDER BY total_people DESC, role_type ASC;
```

### ✅ PASS : MOVIES_026 - CTE roles
```sql
WITH role_counts AS (
  SELECT role_type, COUNT(*) AS total_people
  FROM title_credits
  GROUP BY role_type
)
SELECT role_type, total_people
FROM role_counts
ORDER BY total_people DESC, role_type ASC;
```

### ✅ PASS : MOVIES_027 - Filter paid
```sql
SELECT p.id, p.invoice_id, p.paid_amount FROM payments p WHERE p.payment_status = 'successful' ORDER BY p.id ASC;
```

### ✅ PASS : MOVIES_027 - IN paid
```sql
SELECT p.id, p.invoice_id, p.paid_amount FROM payments p WHERE p.payment_status IN ('successful') ORDER BY p.id ASC;
```

### ✅ PASS : MOVIES_027 - CTE paid
```sql
WITH successful_payments AS (
  SELECT id, invoice_id, paid_amount
  FROM payments
  WHERE payment_status = 'successful'
)
SELECT id, invoice_id, paid_amount
FROM successful_payments
ORDER BY id ASC;
```

### ✅ PASS : MOVIES_028 - Group watchlist
```sql
SELECT profile_id, COUNT(*) AS watchlist_count FROM watchlists GROUP BY profile_id ORDER BY watchlist_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_028 - COUNT titles
```sql
SELECT profile_id, COUNT(title_id) AS watchlist_count FROM watchlists GROUP BY profile_id ORDER BY watchlist_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_028 - CTE watch
```sql
WITH profile_watchlists AS (
  SELECT profile_id, COUNT(*) AS watchlist_count
  FROM watchlists
  GROUP BY profile_id
)
SELECT profile_id, watchlist_count
FROM profile_watchlists
ORDER BY watchlist_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_029 - Range filter
```sql
SELECT id, profile_id, expires_at FROM downloads WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days' ORDER BY expires_at ASC;
```

### ✅ PASS : MOVIES_029 - Bound checks
```sql
SELECT id, profile_id, expires_at FROM downloads WHERE expires_at >= NOW() AND expires_at <= NOW() + INTERVAL '7 days' ORDER BY expires_at ASC;
```

### ✅ PASS : MOVIES_029 - CTE soon
```sql
WITH expiring_downloads AS (
  SELECT id, profile_id, expires_at
  FROM downloads
  WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'
)
SELECT id, profile_id, expires_at
FROM expiring_downloads
ORDER BY expires_at ASC;
```

### ✅ PASS : MOVIES_030 - AVG watch
```sql
SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions GROUP BY profile_id ORDER BY avg_watch_time_seconds DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_030 - CTE average
```sql
WITH profile_avg_watch AS (
  SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds
  FROM viewing_sessions
  GROUP BY profile_id
)
SELECT profile_id, avg_watch_time_seconds
FROM profile_avg_watch
ORDER BY avg_watch_time_seconds DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_030 - Subquery avg
```sql
SELECT profile_id, avg_watch_time_seconds FROM (SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions GROUP BY profile_id) p ORDER BY avg_watch_time_seconds DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_031 - Filter group
```sql
SELECT user_id, COUNT(*) AS active_device_count FROM devices WHERE is_active = true GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_031 - Bool short
```sql
SELECT user_id, COUNT(*) AS active_device_count FROM devices WHERE is_active GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_031 - Active subquery
```sql
SELECT user_id, COUNT(*) AS active_device_count FROM (SELECT user_id FROM devices WHERE is_active = true) d GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_032 - Count paid
```sql
SELECT COUNT(*) AS paid_invoices FROM billing_invoices WHERE invoice_status = 'paid';
```

### ✅ PASS : MOVIES_032 - Count ids
```sql
SELECT COUNT(id) AS paid_invoices FROM billing_invoices WHERE invoice_status = 'paid';
```

### ✅ PASS : MOVIES_032 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE invoice_status = 'paid') AS paid_invoices FROM billing_invoices;
```

### ✅ PASS : MOVIES_033 - Series join
```sql
SELECT t.id, t.title_name, s.season_number FROM titles t JOIN seasons s ON t.id = s.title_id WHERE t.title_type = 'series' ORDER BY t.id ASC, s.season_number ASC;
```

### ✅ PASS : MOVIES_033 - Start season
```sql
SELECT t.id, t.title_name, s.season_number FROM seasons s JOIN titles t ON s.title_id = t.id WHERE t.title_type = 'series' ORDER BY t.id ASC, s.season_number ASC;
```

### ✅ PASS : MOVIES_033 - CTE series
```sql
WITH series_titles AS (
  SELECT id, title_name
  FROM titles
  WHERE title_type = 'series'
)
SELECT st.id, st.title_name, s.season_number
FROM series_titles st
JOIN seasons s ON st.id = s.title_id
ORDER BY st.id ASC, s.season_number ASC;
```

### ✅ PASS : MOVIES_034 - AVG currency
```sql
SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount FROM billing_invoices GROUP BY currency ORDER BY avg_total_amount DESC, currency ASC;
```

### ✅ PASS : MOVIES_034 - CTE avg
```sql
WITH currency_avg AS (
  SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount
  FROM billing_invoices
  GROUP BY currency
)
SELECT currency, avg_total_amount
FROM currency_avg
ORDER BY avg_total_amount DESC, currency ASC;
```

### ✅ PASS : MOVIES_034 - Subquery avg
```sql
SELECT currency, avg_total_amount FROM (SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount FROM billing_invoices GROUP BY currency) a ORDER BY avg_total_amount DESC, currency ASC;
```

### ✅ PASS : MOVIES_035 - Top rows
```sql
SELECT row_id, COUNT(*) AS impression_count FROM recommendation_impressions GROUP BY row_id ORDER BY impression_count DESC, row_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_035 - Count ids
```sql
SELECT row_id, COUNT(id) AS impression_count FROM recommendation_impressions GROUP BY row_id ORDER BY impression_count DESC, row_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_035 - Rank rows
```sql
SELECT row_id, impression_count FROM (SELECT row_id, COUNT(*) AS impression_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, row_id ASC) AS rn FROM recommendation_impressions GROUP BY row_id) ranked WHERE rn <= 5 ORDER BY impression_count DESC, row_id ASC;
```

### ✅ PASS : MOVIES_036 - Group country
```sql
SELECT country, COUNT(*) AS total_users FROM users GROUP BY country ORDER BY total_users DESC, country ASC;
```

### ✅ PASS : MOVIES_036 - Count ids
```sql
SELECT country, COUNT(id) AS total_users FROM users GROUP BY country ORDER BY total_users DESC, country ASC;
```

### ✅ PASS : MOVIES_036 - CTE country
```sql
WITH country_counts AS (
  SELECT country, COUNT(*) AS total_users
  FROM users
  GROUP BY country
)
SELECT country, total_users
FROM country_counts
ORDER BY total_users DESC, country ASC;
```

### ✅ PASS : MOVIES_037 - Subquery avg
```sql
SELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user FROM (SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id) p;
```

### ✅ PASS : MOVIES_037 - CTE avg
```sql
WITH profile_counts AS (
  SELECT user_id, COUNT(*) AS profile_count
  FROM profiles
  GROUP BY user_id
)
SELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user
FROM profile_counts;
```

### ✅ PASS : MOVIES_037 - Join users
```sql
SELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user FROM (SELECT u.id, COUNT(p.id) AS profile_count FROM users u JOIN profiles p ON u.id = p.user_id GROUP BY u.id) x;
```

### ✅ PASS : MOVIES_038 - Avail join
```sql
SELECT t.id, t.title_name, ca.available_from, ca.available_to FROM titles t JOIN content_availability ca ON t.id = ca.title_id WHERE ca.country = 'India' AND ca.is_available = true AND ca.available_from <= NOW() AND (ca.available_to IS NULL OR ca.available_to >= NOW()) ORDER BY t.id ASC;
```

### ✅ PASS : MOVIES_038 - CTE active
```sql
WITH india_available AS (
  SELECT title_id, available_from, available_to
  FROM content_availability
  WHERE country = 'India'
    AND is_available = true
    AND available_from <= NOW()
    AND (available_to IS NULL OR available_to >= NOW())
)
SELECT t.id, t.title_name, ia.available_from, ia.available_to
FROM titles t
JOIN india_available ia ON t.id = ia.title_id
ORDER BY t.id ASC;
```

### ✅ PASS : MOVIES_038 - Start avail
```sql
SELECT t.id, t.title_name, ca.available_from, ca.available_to FROM content_availability ca JOIN titles t ON ca.title_id = t.id WHERE ca.country = 'India' AND ca.is_available = true AND ca.available_from <= NOW() AND (ca.available_to IS NULL OR ca.available_to >= NOW()) ORDER BY t.id ASC;
```

### ✅ PASS : MOVIES_039 - Distinct join
```sql
SELECT DISTINCT u.id, u.email, sp.plan_name FROM users u JOIN subscriptions s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' AND sp.has_ads = true ORDER BY u.id ASC;
```

### ✅ PASS : MOVIES_039 - CTE ads
```sql
WITH active_ad_plans AS (
  SELECT s.user_id, sp.plan_name
  FROM subscriptions s
  JOIN subscription_plans sp ON s.plan_id = sp.id
  WHERE s.subscription_status = 'active'
    AND sp.has_ads = true
)
SELECT DISTINCT u.id, u.email, a.plan_name
FROM users u
JOIN active_ad_plans a ON u.id = a.user_id
ORDER BY u.id ASC;
```

### ✅ PASS : MOVIES_039 - Subquery ads
```sql
SELECT DISTINCT u.id, u.email, x.plan_name FROM users u JOIN (SELECT s.user_id, sp.plan_name FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' AND sp.has_ads = true) x ON u.id = x.user_id ORDER BY u.id ASC;
```

### ✅ PASS : MOVIES_040 - Join avg
```sql
SELECT t.title_type, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM ratings r JOIN titles t ON r.title_id = t.id GROUP BY t.title_type ORDER BY avg_rating DESC, t.title_type ASC;
```

### ✅ PASS : MOVIES_040 - CTE rated
```sql
WITH title_type_ratings AS (
  SELECT t.title_type, r.rating_value
  FROM ratings r
  JOIN titles t ON r.title_id = t.id
)
SELECT title_type, ROUND(AVG(rating_value), 2) AS avg_rating
FROM title_type_ratings
GROUP BY title_type
ORDER BY avg_rating DESC, title_type ASC;
```

### ✅ PASS : MOVIES_040 - Subquery avg
```sql
SELECT title_type, ROUND(AVG(rating_value), 2) AS avg_rating FROM (SELECT t.title_type, r.rating_value FROM ratings r JOIN titles t ON r.title_id = t.id) x GROUP BY title_type ORDER BY avg_rating DESC, title_type ASC;
```

### ✅ PASS : MOVIES_041 - Sum watch
```sql
SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds FROM viewing_sessions GROUP BY profile_id ORDER BY total_watch_time_seconds DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_041 - CTE top
```sql
WITH profile_watch_time AS (
  SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds
  FROM viewing_sessions
  GROUP BY profile_id
)
SELECT profile_id, total_watch_time_seconds
FROM profile_watch_time
ORDER BY total_watch_time_seconds DESC, profile_id ASC
LIMIT 5;
```

### ✅ PASS : MOVIES_041 - Rank sum
```sql
SELECT profile_id, total_watch_time_seconds FROM (SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds, ROW_NUMBER() OVER (ORDER BY SUM(watch_time_seconds) DESC, profile_id ASC) AS rn FROM viewing_sessions GROUP BY profile_id) ranked WHERE rn <= 5 ORDER BY total_watch_time_seconds DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_042 - Count device
```sql
SELECT device_id, COUNT(*) AS session_count FROM viewing_sessions WHERE device_id IS NOT NULL GROUP BY device_id ORDER BY session_count DESC, device_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_042 - Count ids
```sql
SELECT device_id, COUNT(id) AS session_count FROM viewing_sessions WHERE device_id IS NOT NULL GROUP BY device_id ORDER BY session_count DESC, device_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_042 - CTE use
```sql
WITH device_sessions AS (
  SELECT device_id, COUNT(*) AS session_count
  FROM viewing_sessions
  WHERE device_id IS NOT NULL
  GROUP BY device_id
)
SELECT device_id, session_count
FROM device_sessions
ORDER BY session_count DESC, device_id ASC
LIMIT 5;
```

### ✅ PASS : MOVIES_043 - Join clicks
```sql
SELECT ri.title_id, COUNT(*) AS click_count FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.title_id ORDER BY click_count DESC, ri.title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_043 - CTE click
```sql
WITH clicked_titles AS (
  SELECT ri.title_id
  FROM recommendation_clicks rc
  JOIN recommendation_impressions ri ON rc.impression_id = ri.id
)
SELECT title_id, COUNT(*) AS click_count
FROM clicked_titles
GROUP BY title_id
ORDER BY click_count DESC, title_id ASC
LIMIT 5;
```

### ✅ PASS : MOVIES_043 - Rank click
```sql
SELECT title_id, click_count FROM (SELECT ri.title_id, COUNT(*) AS click_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, ri.title_id ASC) AS rn FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.title_id) ranked WHERE rn <= 5 ORDER BY click_count DESC, title_id ASC;
```

### ✅ PASS : MOVIES_044 - Category join
```sql
SELECT c.category_name, COUNT(*) AS title_count FROM title_categories tc JOIN content_categories c ON tc.category_id = c.id GROUP BY c.category_name ORDER BY title_count DESC, c.category_name ASC LIMIT 5;
```

### ✅ PASS : MOVIES_044 - CTE count
```sql
WITH category_counts AS (
  SELECT c.category_name, COUNT(*) AS title_count
  FROM title_categories tc
  JOIN content_categories c ON tc.category_id = c.id
  GROUP BY c.category_name
)
SELECT category_name, title_count
FROM category_counts
ORDER BY title_count DESC, category_name ASC
LIMIT 5;
```

### ✅ PASS : MOVIES_044 - Rank cat
```sql
SELECT category_name, title_count FROM (SELECT c.category_name, COUNT(*) AS title_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, c.category_name ASC) AS rn FROM title_categories tc JOIN content_categories c ON tc.category_id = c.id GROUP BY c.category_name) ranked WHERE rn <= 5 ORDER BY title_count DESC, category_name ASC;
```

### ✅ PASS : MOVIES_045 - Expire check
```sql
SELECT u.id, u.email, s.current_period_end FROM users u JOIN subscriptions s ON u.id = s.user_id WHERE s.subscription_status = 'expired' OR s.current_period_end < NOW() ORDER BY s.current_period_end DESC, u.id ASC;
```

### ✅ PASS : MOVIES_045 - CTE expired
```sql
WITH expired_subscriptions AS (
  SELECT user_id, current_period_end
  FROM subscriptions
  WHERE subscription_status = 'expired' OR current_period_end < NOW()
)
SELECT u.id, u.email, e.current_period_end
FROM users u
JOIN expired_subscriptions e ON u.id = e.user_id
ORDER BY e.current_period_end DESC, u.id ASC;
```

### ✅ PASS : MOVIES_045 - Subquery exp
```sql
SELECT u.id, u.email, s.current_period_end FROM users u JOIN (SELECT user_id, current_period_end FROM subscriptions WHERE subscription_status = 'expired' OR current_period_end < NOW()) s ON u.id = s.user_id ORDER BY s.current_period_end DESC, u.id ASC;
```

### ✅ PASS : MOVIES_046 - Revenue join
```sql
SELECT sp.plan_name, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE bi.invoice_status = 'paid' GROUP BY sp.plan_name ORDER BY total_revenue DESC, sp.plan_name ASC;
```

### ✅ PASS : MOVIES_046 - CTE paid
```sql
WITH paid_invoices AS (
  SELECT subscription_id, total_amount
  FROM billing_invoices
  WHERE invoice_status = 'paid'
)
SELECT sp.plan_name, ROUND(SUM(pi.total_amount), 2) AS total_revenue
FROM paid_invoices pi
JOIN subscriptions s ON pi.subscription_id = s.id
JOIN subscription_plans sp ON s.plan_id = sp.id
GROUP BY sp.plan_name
ORDER BY total_revenue DESC, sp.plan_name ASC;
```

### ✅ PASS : MOVIES_046 - Subquery rev
```sql
SELECT plan_name, ROUND(SUM(total_amount), 2) AS total_revenue FROM (SELECT sp.plan_name, bi.total_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE bi.invoice_status = 'paid') x GROUP BY plan_name ORDER BY total_revenue DESC, plan_name ASC;
```

### ✅ PASS : MOVIES_047 - Avg complete
```sql
SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_completion_percent DESC, title_id ASC;
```

### ✅ PASS : MOVIES_047 - CTE avg
```sql
WITH title_completion AS (
  SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent
  FROM viewing_sessions
  WHERE title_id IS NOT NULL
  GROUP BY title_id
)
SELECT title_id, avg_completion_percent
FROM title_completion
ORDER BY avg_completion_percent DESC, title_id ASC;
```

### ✅ PASS : MOVIES_047 - Subquery avg
```sql
SELECT title_id, avg_completion_percent FROM (SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) x ORDER BY avg_completion_percent DESC, title_id ASC;
```

### ✅ PASS : MOVIES_048 - Top watchlist
```sql
SELECT profile_id, COUNT(*) AS watchlist_size FROM watchlists GROUP BY profile_id ORDER BY watchlist_size DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_048 - Count titles
```sql
SELECT profile_id, COUNT(title_id) AS watchlist_size FROM watchlists GROUP BY profile_id ORDER BY watchlist_size DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_048 - Rank watch
```sql
SELECT profile_id, watchlist_size FROM (SELECT profile_id, COUNT(*) AS watchlist_size, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, profile_id ASC) AS rn FROM watchlists GROUP BY profile_id) ranked WHERE rn <= 5 ORDER BY watchlist_size DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_049 - Top countries
```sql
SELECT country, COUNT(*) AS user_count FROM users GROUP BY country ORDER BY user_count DESC, country ASC LIMIT 5;
```

### ✅ PASS : MOVIES_049 - Count ids
```sql
SELECT country, COUNT(id) AS user_count FROM users GROUP BY country ORDER BY user_count DESC, country ASC LIMIT 5;
```

### ✅ PASS : MOVIES_049 - CTE top
```sql
WITH country_user_counts AS (
  SELECT country, COUNT(*) AS user_count
  FROM users
  GROUP BY country
)
SELECT country, user_count
FROM country_user_counts
ORDER BY user_count DESC, country ASC
LIMIT 5;
```

### ✅ PASS : MOVIES_050 - Error count
```sql
SELECT error_code, COUNT(*) AS error_count FROM playback_events WHERE error_code IS NOT NULL GROUP BY error_code ORDER BY error_count DESC, error_code ASC LIMIT 5;
```

### ✅ PASS : MOVIES_050 - Count code
```sql
SELECT error_code, COUNT(error_code) AS error_count FROM playback_events WHERE error_code IS NOT NULL GROUP BY error_code ORDER BY error_count DESC, error_code ASC LIMIT 5;
```

### ✅ PASS : MOVIES_050 - CTE errors
```sql
WITH error_counts AS (
  SELECT error_code, COUNT(*) AS error_count
  FROM playback_events
  WHERE error_code IS NOT NULL
  GROUP BY error_code
)
SELECT error_code, error_count
FROM error_counts
ORDER BY error_count DESC, error_code ASC
LIMIT 5;
```

### ✅ PASS : MOVIES_051 - ROW_NUMBER
```sql
SELECT country, title_id, total_views FROM (SELECT ae.country, vs.title_id, COUNT(*) AS total_views, ROW_NUMBER() OVER (PARTITION BY ae.country ORDER BY COUNT(*) DESC, vs.title_id ASC) AS rn FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id) ranked WHERE rn <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;
```

### ✅ PASS : MOVIES_051 - CTE rank
```sql
WITH country_title_views AS (SELECT ae.country, vs.title_id, COUNT(*) AS total_views FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id), ranked AS (SELECT country, title_id, total_views, ROW_NUMBER() OVER (PARTITION BY country ORDER BY total_views DESC, title_id ASC) AS rn FROM country_title_views) SELECT country, title_id, total_views FROM ranked WHERE rn <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;
```

### ✅ PASS : MOVIES_051 - RANK tie
```sql
SELECT country, title_id, total_views FROM (SELECT ae.country, vs.title_id, COUNT(*) AS total_views, RANK() OVER (PARTITION BY ae.country ORDER BY COUNT(*) DESC, vs.title_id ASC) AS rnk FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id) ranked WHERE rnk <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;
```

### ✅ PASS : MOVIES_052 - AVG top
```sql
SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions GROUP BY profile_id ORDER BY avg_completion_percent DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_052 - CTE avg
```sql
WITH profile_completion AS (SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions GROUP BY profile_id) SELECT profile_id, avg_completion_percent FROM profile_completion ORDER BY avg_completion_percent DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_052 - Rank avg
```sql
SELECT profile_id, avg_completion_percent FROM (SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent, ROW_NUMBER() OVER (ORDER BY AVG(completion_percent) DESC, profile_id ASC) AS rn FROM viewing_sessions GROUP BY profile_id) ranked WHERE rn <= 5 ORDER BY avg_completion_percent DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_053 - Join AVG
```sql
SELECT vs.title_id, ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL GROUP BY vs.title_id ORDER BY avg_buffer_duration_ms DESC, vs.title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_053 - CTE join
```sql
WITH title_buffers AS (SELECT vs.title_id, pe.buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL) SELECT title_id, ROUND(AVG(buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM title_buffers GROUP BY title_id ORDER BY avg_buffer_duration_ms DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_053 - Subquery avg
```sql
SELECT title_id, avg_buffer_duration_ms FROM (SELECT vs.title_id, ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL GROUP BY vs.title_id) x ORDER BY avg_buffer_duration_ms DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_054 - Revenue join
```sql
SELECT u.country, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id WHERE bi.invoice_status = 'paid' GROUP BY u.country ORDER BY total_revenue DESC, u.country ASC;
```

### ✅ PASS : MOVIES_054 - CTE paid
```sql
WITH paid_invoices AS (SELECT subscription_id, total_amount FROM billing_invoices WHERE invoice_status = 'paid') SELECT u.country, ROUND(SUM(pi.total_amount), 2) AS total_revenue FROM paid_invoices pi JOIN subscriptions s ON pi.subscription_id = s.id JOIN users u ON s.user_id = u.id GROUP BY u.country ORDER BY total_revenue DESC, u.country ASC;
```

### ✅ PASS : MOVIES_054 - Subquery rev
```sql
SELECT country, ROUND(SUM(total_amount), 2) AS total_revenue FROM (SELECT u.country, bi.total_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id WHERE bi.invoice_status = 'paid') x GROUP BY country ORDER BY total_revenue DESC, country ASC;
```

### ✅ PASS : MOVIES_055 - Count search
```sql
SELECT profile_id, COUNT(*) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id ORDER BY total_searches DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_055 - COUNT ids
```sql
SELECT profile_id, COUNT(id) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id ORDER BY total_searches DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_055 - CTE search
```sql
WITH profile_searches AS (SELECT profile_id, COUNT(*) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id) SELECT profile_id, total_searches FROM profile_searches ORDER BY total_searches DESC, profile_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_056 - Distinct act
```sql
SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM title_credits WHERE role_type = 'actor' GROUP BY person_id ORDER BY total_titles DESC, person_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_056 - CTE actor
```sql
WITH actor_titles AS (SELECT person_id, title_id FROM title_credits WHERE role_type = 'actor') SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM actor_titles GROUP BY person_id ORDER BY total_titles DESC, person_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_056 - Subquery act
```sql
SELECT person_id, total_titles FROM (SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM title_credits WHERE role_type = 'actor' GROUP BY person_id) x ORDER BY total_titles DESC, person_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_057 - Top down
```sql
SELECT title_id, COUNT(*) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id ORDER BY total_downloads DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_057 - Count ids
```sql
SELECT title_id, COUNT(id) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id ORDER BY total_downloads DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_057 - CTE down
```sql
WITH completed_title_downloads AS (SELECT title_id, COUNT(*) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id) SELECT title_id, total_downloads FROM completed_title_downloads ORDER BY total_downloads DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_058 - HAVING dev
```sql
SELECT d.user_id, COUNT(DISTINCT d.id) AS device_count FROM devices d GROUP BY d.user_id HAVING COUNT(DISTINCT d.id) > 1 ORDER BY device_count DESC, d.user_id ASC;
```

### ✅ PASS : MOVIES_058 - COUNT only
```sql
SELECT d.user_id, COUNT(d.id) AS device_count FROM devices d GROUP BY d.user_id HAVING COUNT(d.id) > 1 ORDER BY device_count DESC, d.user_id ASC;
```

### ✅ PASS : MOVIES_058 - CTE dev
```sql
WITH user_devices AS (SELECT d.user_id, COUNT(DISTINCT d.id) AS device_count FROM devices d GROUP BY d.user_id) SELECT user_id, device_count FROM user_devices WHERE device_count > 1 ORDER BY device_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_059 - Click count
```sql
SELECT campaign_id, COUNT(*) AS click_count FROM notification_deliveries WHERE clicked_at IS NOT NULL GROUP BY campaign_id ORDER BY click_count DESC, campaign_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_059 - FILTER agg
```sql
SELECT campaign_id, COUNT(*) FILTER (WHERE clicked_at IS NOT NULL) AS click_count FROM notification_deliveries GROUP BY campaign_id ORDER BY click_count DESC, campaign_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_059 - CTE click
```sql
WITH campaign_clicks AS (SELECT campaign_id, COUNT(*) AS click_count FROM notification_deliveries WHERE clicked_at IS NOT NULL GROUP BY campaign_id) SELECT campaign_id, click_count FROM campaign_clicks ORDER BY click_count DESC, campaign_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_060 - Join AVG
```sql
SELECT d.device_type, ROUND(AVG(vs.watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id GROUP BY d.device_type ORDER BY avg_watch_time_seconds DESC, d.device_type ASC;
```

### ✅ PASS : MOVIES_060 - CTE map
```sql
WITH device_watch AS (SELECT d.device_type, vs.watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id) SELECT device_type, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM device_watch GROUP BY device_type ORDER BY avg_watch_time_seconds DESC, device_type ASC;
```

### ✅ PASS : MOVIES_060 - Subquery avg
```sql
SELECT device_type, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM (SELECT d.device_type, vs.watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id) x GROUP BY device_type ORDER BY avg_watch_time_seconds DESC, device_type ASC;
```

### ✅ PASS : MOVIES_061 - Month sum
```sql
SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at) ORDER BY revenue_month ASC;
```

### ✅ PASS : MOVIES_061 - CTE month
```sql
WITH monthly_revenue AS (SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at)) SELECT revenue_month, total_revenue FROM monthly_revenue ORDER BY revenue_month ASC;
```

### ✅ PASS : MOVIES_061 - Subquery sum
```sql
SELECT revenue_month, total_revenue FROM (SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at)) x ORDER BY revenue_month ASC;
```

### ✅ PASS : MOVIES_062 - Month count
```sql
SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at) ORDER BY signup_month ASC;
```

### ✅ PASS : MOVIES_062 - CTE month
```sql
WITH monthly_subscribers AS (SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at)) SELECT signup_month, new_subscribers FROM monthly_subscribers ORDER BY signup_month ASC;
```

### ✅ PASS : MOVIES_062 - Subquery count
```sql
SELECT signup_month, new_subscribers FROM (SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at)) x ORDER BY signup_month ASC;
```

### ✅ PASS : MOVIES_063 - Join avg
```sql
SELECT tc.person_id, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor' GROUP BY tc.person_id ORDER BY avg_rating DESC, tc.person_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_063 - CTE actor
```sql
WITH actor_title_ratings AS (SELECT tc.person_id, r.rating_value FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor') SELECT person_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM actor_title_ratings GROUP BY person_id ORDER BY avg_rating DESC, person_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_063 - Subquery avg
```sql
SELECT person_id, avg_rating FROM (SELECT tc.person_id, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor' GROUP BY tc.person_id) x ORDER BY avg_rating DESC, person_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_064 - Distinct cat
```sql
SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id HAVING COUNT(DISTINCT tc.category_id) > 3 ORDER BY category_count DESC, vs.profile_id ASC;
```

### ✅ PASS : MOVIES_064 - CTE cats
```sql
WITH profile_categories AS (SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id) SELECT profile_id, category_count FROM profile_categories WHERE category_count > 3 ORDER BY category_count DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_064 - Join having
```sql
SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM title_categories tc JOIN viewing_sessions vs ON tc.title_id = vs.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id HAVING COUNT(DISTINCT tc.category_id) > 3 ORDER BY category_count DESC, vs.profile_id ASC;
```

### ✅ PASS : MOVIES_065 - Top query
```sql
SELECT query_text, COUNT(*) AS search_count FROM search_queries GROUP BY query_text ORDER BY search_count DESC, query_text ASC LIMIT 10;
```

### ✅ PASS : MOVIES_065 - Count ids
```sql
SELECT query_text, COUNT(id) AS search_count FROM search_queries GROUP BY query_text ORDER BY search_count DESC, query_text ASC LIMIT 10;
```

### ✅ PASS : MOVIES_065 - CTE query
```sql
WITH query_counts AS (SELECT query_text, COUNT(*) AS search_count FROM search_queries GROUP BY query_text) SELECT query_text, search_count FROM query_counts ORDER BY search_count DESC, query_text ASC LIMIT 10;
```

### ✅ PASS : MOVIES_066 - CTR join
```sql
SELECT rr.id, rr.row_name, ROUND(COUNT(rc.id)::numeric * 100 / COUNT(ri.id), 2) AS ctr_percent FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name ORDER BY ctr_percent DESC, rr.id ASC;
```

### ✅ PASS : MOVIES_066 - CTE ctr
```sql
WITH row_metrics AS (SELECT rr.id, rr.row_name, COUNT(ri.id) AS impressions, COUNT(rc.id) AS clicks FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name) SELECT id, row_name, ROUND(clicks::numeric * 100 / impressions, 2) AS ctr_percent FROM row_metrics ORDER BY ctr_percent DESC, id ASC;
```

### ✅ PASS : MOVIES_066 - Subquery ctr
```sql
SELECT id, row_name, ROUND(clicks::numeric * 100 / impressions, 2) AS ctr_percent FROM (SELECT rr.id, rr.row_name, COUNT(ri.id) AS impressions, COUNT(rc.id) AS clicks FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name) x ORDER BY ctr_percent DESC, id ASC;
```

### ✅ PASS : MOVIES_067 - Date range
```sql
SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days' ORDER BY license_end ASC, title_id ASC;
```

### ✅ PASS : MOVIES_067 - Bound checks
```sql
SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end >= NOW() AND license_end <= NOW() + INTERVAL '30 days' ORDER BY license_end ASC, title_id ASC;
```

### ✅ PASS : MOVIES_067 - CTE expiry
```sql
WITH expiring_licenses AS (SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days') SELECT title_id, licensed_region, license_end FROM expiring_licenses ORDER BY license_end ASC, title_id ASC;
```

### ✅ PASS : MOVIES_068 - Group buffer
```sql
SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id HAVING SUM(buffer_duration_ms) > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;
```

### ✅ PASS : MOVIES_068 - CTE sum
```sql
WITH session_buffers AS (SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id) SELECT session_id, total_buffer_ms FROM session_buffers WHERE total_buffer_ms > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;
```

### ✅ PASS : MOVIES_068 - Subquery sum
```sql
SELECT session_id, total_buffer_ms FROM (SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id) x WHERE total_buffer_ms > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;
```

### ✅ PASS : MOVIES_069 - HAVING drop
```sql
SELECT profile_id, COUNT(*) AS abandoned_sessions FROM viewing_sessions WHERE session_status = 'abandoned' GROUP BY profile_id HAVING COUNT(*) > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_069 - CTE count
```sql
WITH abandoned_counts AS (SELECT profile_id, COUNT(*) AS abandoned_sessions FROM viewing_sessions WHERE session_status = 'abandoned' GROUP BY profile_id) SELECT profile_id, abandoned_sessions FROM abandoned_counts WHERE abandoned_sessions > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_069 - FILTER agg
```sql
SELECT profile_id, COUNT(*) FILTER (WHERE session_status = 'abandoned') AS abandoned_sessions FROM viewing_sessions GROUP BY profile_id HAVING COUNT(*) FILTER (WHERE session_status = 'abandoned') > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_070 - Top avg
```sql
SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_watch_time_seconds DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_070 - CTE avg
```sql
WITH title_watch_time AS (SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) SELECT title_id, avg_watch_time_seconds FROM title_watch_time ORDER BY avg_watch_time_seconds DESC, title_id ASC LIMIT 5;
```

### ✅ PASS : MOVIES_070 - Rank avg
```sql
SELECT title_id, avg_watch_time_seconds FROM (SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds, ROW_NUMBER() OVER (ORDER BY AVG(watch_time_seconds) DESC, title_id ASC) AS rn FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) ranked WHERE rn <= 5 ORDER BY avg_watch_time_seconds DESC, title_id ASC;
```

### ✅ PASS : MOVIES_071 - Join fail
```sql
SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country ORDER BY failed_sessions DESC, d.country ASC LIMIT 5;
```

### ✅ PASS : MOVIES_071 - CTE fail
```sql
WITH failed_country_sessions AS (SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country) SELECT country, failed_sessions FROM failed_country_sessions ORDER BY failed_sessions DESC, country ASC LIMIT 5;
```

### ✅ PASS : MOVIES_071 - Subquery fail
```sql
SELECT country, failed_sessions FROM (SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country) x ORDER BY failed_sessions DESC, country ASC LIMIT 5;
```

### ✅ PASS : MOVIES_072 - Distinct plan
```sql
SELECT sp.plan_name, COUNT(DISTINCT s.user_id) AS active_users FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' GROUP BY sp.plan_name ORDER BY active_users DESC, sp.plan_name ASC;
```

### ✅ PASS : MOVIES_072 - CTE plan
```sql
WITH active_plan_users AS (SELECT sp.plan_name, s.user_id FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active') SELECT plan_name, COUNT(DISTINCT user_id) AS active_users FROM active_plan_users GROUP BY plan_name ORDER BY active_users DESC, plan_name ASC;
```

### ✅ PASS : MOVIES_072 - Count only
```sql
SELECT sp.plan_name, COUNT(*) AS active_users FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' GROUP BY sp.plan_name ORDER BY active_users DESC, sp.plan_name ASC;
```

### ✅ PASS : MOVIES_073 - Join count
```sql
SELECT c.category_name, COUNT(*) AS ratings_count FROM ratings r JOIN title_categories tc ON r.title_id = tc.title_id JOIN content_categories c ON tc.category_id = c.id WHERE r.title_id IS NOT NULL GROUP BY c.category_name ORDER BY ratings_count DESC, c.category_name ASC LIMIT 5;
```

### ✅ PASS : MOVIES_073 - CTE rate
```sql
WITH category_ratings AS (SELECT c.category_name, COUNT(*) AS ratings_count FROM ratings r JOIN title_categories tc ON r.title_id = tc.title_id JOIN content_categories c ON tc.category_id = c.id WHERE r.title_id IS NOT NULL GROUP BY c.category_name) SELECT category_name, ratings_count FROM category_ratings ORDER BY ratings_count DESC, category_name ASC LIMIT 5;
```

### ✅ PASS : MOVIES_073 - Start cat
```sql
SELECT c.category_name, COUNT(*) AS ratings_count FROM content_categories c JOIN title_categories tc ON c.id = tc.category_id JOIN ratings r ON tc.title_id = r.title_id WHERE r.title_id IS NOT NULL GROUP BY c.category_name ORDER BY ratings_count DESC, c.category_name ASC LIMIT 5;
```

### ✅ PASS : MOVIES_074 - Month down
```sql
SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at) ORDER BY download_month ASC;
```

### ✅ PASS : MOVIES_074 - CTE month
```sql
WITH monthly_downloads AS (SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at)) SELECT download_month, completed_downloads FROM monthly_downloads ORDER BY download_month ASC;
```

### ✅ PASS : MOVIES_074 - Subquery cnt
```sql
SELECT download_month, completed_downloads FROM (SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at)) x ORDER BY download_month ASC;
```

### ✅ PASS : MOVIES_075 - HAVING active
```sql
SELECT user_id, COUNT(*) AS active_subscription_count FROM subscriptions WHERE subscription_status = 'active' GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY active_subscription_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_075 - CTE active
```sql
WITH active_counts AS (SELECT user_id, COUNT(*) AS active_subscription_count FROM subscriptions WHERE subscription_status = 'active' GROUP BY user_id) SELECT user_id, active_subscription_count FROM active_counts WHERE active_subscription_count > 1 ORDER BY active_subscription_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_075 - FILTER count
```sql
SELECT user_id, COUNT(*) FILTER (WHERE subscription_status = 'active') AS active_subscription_count FROM subscriptions GROUP BY user_id HAVING COUNT(*) FILTER (WHERE subscription_status = 'active') > 1 ORDER BY active_subscription_count DESC, user_id ASC;
```

### ✅ PASS : MOVIES_076 - Window top
```sql
WITH title_completion AS (SELECT d.country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent, ROW_NUMBER() OVER (PARTITION BY d.country ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC) AS rn FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id) SELECT country, title_id, avg_completion_percent FROM title_completion WHERE rn = 1 ORDER BY country ASC, title_id ASC;
```

### ✅ PASS : MOVIES_076 - Rank one
```sql
SELECT country, title_id, avg_completion_percent FROM (SELECT d.country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent, RANK() OVER (PARTITION BY d.country ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC) AS rnk FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id) ranked WHERE rnk = 1 ORDER BY country ASC, title_id ASC;
```

### ✅ PASS : MOVIES_076 - Distinct first
```sql
SELECT DISTINCT ON (d.country) d.country AS country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id ORDER BY d.country ASC, AVG(vs.completion_percent) DESC, vs.title_id ASC;
```

### ✅ PASS : MOVIES_077 - Day binge
```sql
SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(DISTINCT vs.episode_id) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at) HAVING COUNT(DISTINCT vs.episode_id) >= 3 ORDER BY episodes_watched DESC, vs.profile_id ASC, e.season_id ASC, watch_date ASC;
```

### ✅ PASS : MOVIES_077 - CTE binge
```sql
WITH daily_season_watch AS (SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(DISTINCT vs.episode_id) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at)) SELECT profile_id, season_id, watch_date, episodes_watched FROM daily_season_watch WHERE episodes_watched >= 3 ORDER BY episodes_watched DESC, profile_id ASC, season_id ASC, watch_date ASC;
```

### ✅ PASS : MOVIES_077 - Count all
```sql
SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(*) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at) HAVING COUNT(*) >= 3 ORDER BY episodes_watched DESC, vs.profile_id ASC, e.season_id ASC, watch_date ASC;
```

### ✅ PASS : MOVIES_078 - CTE conv
```sql
WITH clicked_impressions AS (SELECT ri.id AS impression_id, ri.row_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON rc.impression_id = ri.id), converted_clicks AS (SELECT DISTINCT ci.impression_id FROM clicked_impressions ci JOIN viewing_sessions vs ON vs.profile_id = ci.profile_id AND vs.title_id = ci.title_id) SELECT rr.id, rr.row_name, ROUND(COUNT(cc.impression_id)::numeric * 100 / COUNT(ci.impression_id), 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN clicked_impressions ci ON rr.id = ci.row_id LEFT JOIN converted_clicks cc ON ci.impression_id = cc.impression_id GROUP BY rr.id, rr.row_name ORDER BY conversion_rate_percent DESC, rr.id ASC;
```

### ✅ PASS : MOVIES_078 - Direct join
```sql
SELECT rr.id, rr.row_name, ROUND(COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ri.id END)::numeric * 100 / COUNT(DISTINCT ri.id), 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id JOIN recommendation_clicks rc ON rc.impression_id = ri.id LEFT JOIN viewing_sessions vs ON vs.profile_id = ri.profile_id AND vs.title_id = ri.title_id GROUP BY rr.id, rr.row_name ORDER BY conversion_rate_percent DESC, rr.id ASC;
```

### ✅ PASS : MOVIES_078 - CTE metrics
```sql
WITH clicked_impressions AS (SELECT ri.id AS impression_id, ri.row_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON rc.impression_id = ri.id), row_metrics AS (SELECT ci.row_id, COUNT(*) AS clicked_count, COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ci.impression_id END) AS converted_count FROM clicked_impressions ci LEFT JOIN viewing_sessions vs ON vs.profile_id = ci.profile_id AND vs.title_id = ci.title_id GROUP BY ci.row_id) SELECT rr.id, rr.row_name, ROUND(rm.converted_count::numeric * 100 / rm.clicked_count, 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN row_metrics rm ON rr.id = rm.row_id ORDER BY conversion_rate_percent DESC, rr.id ASC;
```

### ✅ PASS : MOVIES_079 - Two CTEs
```sql
WITH download_counts AS (SELECT profile_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY profile_id), session_counts AS (SELECT profile_id, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id) SELECT dc.profile_id, dc.completed_downloads, COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count FROM download_counts dc LEFT JOIN session_counts sc ON dc.profile_id = sc.profile_id WHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0) ORDER BY dc.completed_downloads DESC, dc.profile_id ASC;
```

### ✅ PASS : MOVIES_079 - Subquery cmp
```sql
SELECT dc.profile_id, dc.completed_downloads, COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count FROM (SELECT profile_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY profile_id) dc LEFT JOIN (SELECT profile_id, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id) sc ON dc.profile_id = sc.profile_id WHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0) ORDER BY dc.completed_downloads DESC, dc.profile_id ASC;
```

### ✅ PASS : MOVIES_079 - Union counts
```sql
WITH profile_metrics AS (SELECT profile_id, COUNT(*) AS completed_downloads, 0 AS viewing_sessions_count FROM downloads WHERE download_status = 'completed' GROUP BY profile_id UNION ALL SELECT profile_id, 0 AS completed_downloads, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id), merged AS (SELECT profile_id, SUM(completed_downloads) AS completed_downloads, SUM(viewing_sessions_count) AS viewing_sessions_count FROM profile_metrics GROUP BY profile_id) SELECT profile_id, completed_downloads, viewing_sessions_count FROM merged WHERE completed_downloads > viewing_sessions_count ORDER BY completed_downloads DESC, profile_id ASC;
```

### ✅ PASS : MOVIES_080 - CTE avg
```sql
WITH user_revenue AS (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id), revenue_avg AS (SELECT AVG(total_paid_amount) AS avg_paid_amount FROM user_revenue) SELECT ur.user_id, ROUND(ur.total_paid_amount, 2) AS total_paid_amount FROM user_revenue ur CROSS JOIN revenue_avg ra WHERE ur.total_paid_amount > ra.avg_paid_amount ORDER BY total_paid_amount DESC, ur.user_id ASC;
```

### ✅ PASS : MOVIES_080 - Subquery avg
```sql
SELECT user_id, ROUND(total_paid_amount, 2) AS total_paid_amount FROM (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) ur WHERE total_paid_amount > (SELECT AVG(total_paid_amount) FROM (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) x) ORDER BY total_paid_amount DESC, user_id ASC;
```

### ✅ PASS : MOVIES_080 - Window avg
```sql
SELECT user_id, ROUND(total_paid_amount, 2) AS total_paid_amount FROM (SELECT user_id, total_paid_amount, AVG(total_paid_amount) OVER () AS avg_paid_amount FROM (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) ur) x WHERE total_paid_amount > avg_paid_amount ORDER BY total_paid_amount DESC, user_id ASC;
```

### ✅ PASS : MOVIES_081 - Min max span
```sql
SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id ORDER BY retention_days DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_081 - CTE span
```sql
WITH user_retention AS (SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id) SELECT user_id, first_subscription_start, latest_period_end, retention_days FROM user_retention ORDER BY retention_days DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_081 - Subquery span
```sql
SELECT user_id, first_subscription_start, latest_period_end, retention_days FROM (SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id) x ORDER BY retention_days DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_082 - Group rewatch
```sql
SELECT title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1 ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_082 - CTE pairs
```sql
WITH rewatch_pairs AS (SELECT profile_id, title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1) SELECT title_id, rewatch_sessions FROM rewatch_pairs ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_082 - Subquery pairs
```sql
SELECT title_id, rewatch_sessions FROM (SELECT profile_id, title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1) x ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_083 - Two averages
```sql
WITH historical_avg AS (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id), recent_avg AS (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id) SELECT h.title_id, ROUND(h.hist_avg, 2) AS historical_avg_completion, ROUND(r.recent_avg, 2) AS recent_avg_completion FROM historical_avg h JOIN recent_avg r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg ORDER BY historical_avg_completion DESC, h.title_id ASC;
```

### ✅ PASS : MOVIES_083 - Subquery compare
```sql
SELECT h.title_id, ROUND(h.hist_avg, 2) AS historical_avg_completion, ROUND(r.recent_avg, 2) AS recent_avg_completion FROM (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) h JOIN (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id) r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg ORDER BY historical_avg_completion DESC, h.title_id ASC;
```

### ✅ PASS : MOVIES_083 - CTE diff
```sql
WITH historical_avg AS (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id), recent_avg AS (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id), compared AS (SELECT h.title_id, h.hist_avg, r.recent_avg, (h.hist_avg - r.recent_avg) AS completion_drop FROM historical_avg h JOIN recent_avg r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg) SELECT title_id, ROUND(hist_avg, 2) AS historical_avg_completion, ROUND(recent_avg, 2) AS recent_avg_completion FROM compared ORDER BY historical_avg_completion DESC, title_id ASC;
```

### ✅ PASS : MOVIES_084 - Count drops
```sql
SELECT episode_id, COUNT(*) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_084 - CTE drops
```sql
WITH episode_abandons AS (SELECT episode_id, COUNT(*) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id) SELECT episode_id, abandoned_count FROM episode_abandons ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_084 - Count ids
```sql
SELECT episode_id, COUNT(id) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_085 - Window revenue
```sql
WITH title_revenue AS (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rn FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id) SELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue FROM title_revenue WHERE rn = 1 ORDER BY country ASC;
```

### ✅ PASS : MOVIES_085 - CTE max
```sql
WITH country_title_revenue AS (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id), max_revenue AS (SELECT country, MAX(total_revenue) AS max_total_revenue FROM country_title_revenue GROUP BY country) SELECT ctr.country, ctr.title_id, ROUND(ctr.total_revenue, 2) AS total_revenue FROM country_title_revenue ctr JOIN max_revenue mr ON ctr.country = mr.country AND ctr.total_revenue = mr.max_total_revenue ORDER BY ctr.country ASC, ctr.title_id ASC;
```

### ✅ PASS : MOVIES_085 - RANK revenue
```sql
SELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue, RANK() OVER (PARTITION BY u.country ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rnk FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id) ranked WHERE rnk = 1 ORDER BY country ASC, title_id ASC;
```

### ✅ PASS : MOVIES_086 - Two periods
```sql
WITH recent_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id), previous_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id) SELECT r.user_id, r.recent_watch_time, p.previous_watch_time FROM recent_period r JOIN previous_period p ON r.user_id = p.user_id WHERE r.recent_watch_time < (p.previous_watch_time * 0.5) ORDER BY r.recent_watch_time ASC, r.user_id ASC;
```

### ✅ PASS : MOVIES_086 - Subquery drop
```sql
SELECT r.user_id, r.recent_watch_time, p.previous_watch_time FROM (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id) r JOIN (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id) p ON r.user_id = p.user_id WHERE r.recent_watch_time < (p.previous_watch_time * 0.5) ORDER BY r.recent_watch_time ASC, r.user_id ASC;
```

### ✅ PASS : MOVIES_086 - CTE ratio
```sql
WITH recent_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id), previous_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id), compared AS (SELECT r.user_id, r.recent_watch_time, p.previous_watch_time, (r.recent_watch_time::numeric / NULLIF(p.previous_watch_time, 0)) AS watch_ratio FROM recent_period r JOIN previous_period p ON r.user_id = p.user_id) SELECT user_id, recent_watch_time, previous_watch_time FROM compared WHERE watch_ratio < 0.5 ORDER BY recent_watch_time ASC, user_id ASC;
```

### ✅ PASS : MOVIES_087 - CTE totals
```sql
WITH season_totals AS (SELECT season_id, COUNT(*) AS total_episodes FROM episodes GROUP BY season_id), profile_season_watch AS (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM profile_season_watch psw JOIN season_totals st ON psw.season_id = st.season_id WHERE psw.watched_episodes = st.total_episodes AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;
```

### ✅ PASS : MOVIES_087 - Subquery season
```sql
SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) psw JOIN (SELECT season_id, COUNT(*) AS total_episodes FROM episodes GROUP BY season_id) st ON psw.season_id = st.season_id WHERE psw.watched_episodes = st.total_episodes AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;
```

### ✅ PASS : MOVIES_087 - Joined counts
```sql
SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) psw JOIN episodes ep ON psw.season_id = ep.season_id GROUP BY psw.profile_id, psw.season_id, psw.watched_episodes, psw.first_watch, psw.last_watch HAVING psw.watched_episodes = COUNT(ep.id) AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;
```

### ✅ PASS : MOVIES_088 - Compare CTR
```sql
WITH experiment_ctr AS (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) SELECT v.experiment_id FROM experiment_ctr v JOIN experiment_ctr c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;
```

### ✅ PASS : MOVIES_088 - CTE metrics
```sql
WITH experiment_metrics AS (SELECT ea.experiment_id, ev.is_control, COUNT(ri.id) AS impressions, COUNT(rc.id) AS clicks FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control), experiment_ctr AS (SELECT experiment_id, is_control, clicks::numeric / NULLIF(impressions, 0) AS ctr FROM experiment_metrics) SELECT v.experiment_id FROM experiment_ctr v JOIN experiment_ctr c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;
```

### ✅ PASS : MOVIES_088 - Subquery ctr
```sql
SELECT v.experiment_id FROM (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) v JOIN (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;
```

### ✅ PASS : MOVIES_089 - Distinct devices
```sql
SELECT profile_id, title_id, COUNT(DISTINCT device_id) AS device_count FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(DISTINCT device_id) > 1 ORDER BY device_count DESC, profile_id ASC, title_id ASC;
```

### ✅ PASS : MOVIES_089 - CTE device
```sql
WITH title_device_usage AS (SELECT profile_id, title_id, COUNT(DISTINCT device_id) AS device_count FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id) SELECT profile_id, title_id, device_count FROM title_device_usage WHERE device_count > 1 ORDER BY device_count DESC, profile_id ASC, title_id ASC;
```

### ✅ PASS : MOVIES_089 - Self join
```sql
SELECT DISTINCT v1.profile_id, v1.title_id, 2 AS device_count FROM viewing_sessions v1 JOIN viewing_sessions v2 ON v1.profile_id = v2.profile_id AND v1.title_id = v2.title_id AND v1.device_id <> v2.device_id WHERE v1.title_id IS NOT NULL ORDER BY device_count DESC, v1.profile_id ASC, v1.title_id ASC;
```

### ✅ PASS : MOVIES_090 - Distinct cats
```sql
SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id ORDER BY distinct_categories DESC, vs.profile_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_090 - CTE cats
```sql
WITH profile_category_counts AS (SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id) SELECT profile_id, distinct_categories FROM profile_category_counts ORDER BY distinct_categories DESC, profile_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_090 - Subquery cats
```sql
SELECT profile_id, distinct_categories FROM (SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id) x ORDER BY distinct_categories DESC, profile_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_091 - Month rank
```sql
WITH monthly_title_revenue AS (SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, SUM(bi.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', bi.issued_at) ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rn FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id) SELECT revenue_month, title_id, ROUND(total_revenue, 2) AS total_revenue FROM monthly_title_revenue WHERE rn = 1 ORDER BY revenue_month ASC;
```

### ✅ PASS : MOVIES_091 - Rank tie
```sql
SELECT revenue_month, title_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, SUM(bi.total_amount) AS total_revenue, RANK() OVER (PARTITION BY DATE_TRUNC('month', bi.issued_at) ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rnk FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id) ranked WHERE rnk = 1 ORDER BY revenue_month ASC, title_id ASC;
```

### ✅ PASS : MOVIES_091 - Distinct first
```sql
SELECT DISTINCT ON (DATE_TRUNC('month', bi.issued_at)) DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id ORDER BY DATE_TRUNC('month', bi.issued_at) ASC, SUM(bi.total_amount) DESC, vs.title_id ASC;
```

### ✅ PASS : MOVIES_092 - Click convert
```sql
WITH clicked_titles AS (SELECT ri.id AS impression_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id), watched_titles AS (SELECT DISTINCT ct.impression_id, ct.title_id FROM clicked_titles ct JOIN viewing_sessions vs ON ct.profile_id = vs.profile_id AND ct.title_id = vs.title_id) SELECT ct.title_id, ROUND(COUNT(wt.impression_id)::numeric * 100 / COUNT(ct.impression_id), 2) AS watch_conversion_rate FROM clicked_titles ct LEFT JOIN watched_titles wt ON ct.impression_id = wt.impression_id GROUP BY ct.title_id ORDER BY watch_conversion_rate DESC, ct.title_id ASC;
```

### ✅ PASS : MOVIES_092 - Direct conv
```sql
SELECT ri.title_id, ROUND(COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ri.id END)::numeric * 100 / COUNT(DISTINCT ri.id), 2) AS watch_conversion_rate FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id LEFT JOIN viewing_sessions vs ON ri.profile_id = vs.profile_id AND ri.title_id = vs.title_id GROUP BY ri.title_id ORDER BY watch_conversion_rate DESC, ri.title_id ASC;
```

### ✅ PASS : MOVIES_092 - CTE metrics
```sql
WITH clicked_titles AS (SELECT ri.id AS impression_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id), title_metrics AS (SELECT ct.title_id, COUNT(*) AS clicked_count, COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ct.impression_id END) AS converted_count FROM clicked_titles ct LEFT JOIN viewing_sessions vs ON ct.profile_id = vs.profile_id AND ct.title_id = vs.title_id GROUP BY ct.title_id) SELECT title_id, ROUND(converted_count::numeric * 100 / clicked_count, 2) AS watch_conversion_rate FROM title_metrics ORDER BY watch_conversion_rate DESC, title_id ASC;
```

### ✅ PASS : MOVIES_093 - Month active
```sql
WITH monthly_activity AS (SELECT profile_id, DATE_TRUNC('month', started_at) AS activity_month FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id, DATE_TRUNC('month', started_at)) SELECT profile_id FROM monthly_activity GROUP BY profile_id HAVING COUNT(DISTINCT activity_month) = 6 ORDER BY profile_id ASC;
```

### ✅ PASS : MOVIES_093 - Subquery month
```sql
SELECT profile_id FROM (SELECT profile_id, DATE_TRUNC('month', started_at) AS activity_month FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id, DATE_TRUNC('month', started_at)) x GROUP BY profile_id HAVING COUNT(DISTINCT activity_month) = 6 ORDER BY profile_id ASC;
```

### ✅ PASS : MOVIES_093 - Direct distinct
```sql
SELECT profile_id FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id HAVING COUNT(DISTINCT DATE_TRUNC('month', started_at)) = 6 ORDER BY profile_id ASC;
```

### ✅ PASS : MOVIES_094 - Sum LTV
```sql
SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id ORDER BY lifetime_value DESC, s.user_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_094 - CTE LTV
```sql
WITH user_ltv AS (SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) SELECT user_id, lifetime_value FROM user_ltv ORDER BY lifetime_value DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_094 - Subquery LTV
```sql
SELECT user_id, lifetime_value FROM (SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) x ORDER BY lifetime_value DESC, user_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_095 - Series avg
```sql
SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id ORDER BY avg_completion_percent DESC, s.title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_095 - CTE series
```sql
WITH series_completion AS (SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id) SELECT title_id, avg_completion_percent FROM series_completion ORDER BY avg_completion_percent DESC, title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_095 - Subquery avg
```sql
SELECT title_id, avg_completion_percent FROM (SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id) x ORDER BY avg_completion_percent DESC, title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_096 - Pause avg
```sql
WITH session_pauses AS (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id) SELECT vs.title_id, ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session FROM session_pauses sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY avg_pauses_per_session DESC, vs.title_id ASC;
```

### ✅ PASS : MOVIES_096 - Subquery pause
```sql
SELECT vs.title_id, ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session FROM (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id) sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY avg_pauses_per_session DESC, vs.title_id ASC;
```

### ✅ PASS : MOVIES_096 - CTE title
```sql
WITH session_pauses AS (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id), title_pause_metrics AS (SELECT vs.title_id, sp.pause_count FROM session_pauses sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL) SELECT title_id, ROUND(AVG(pause_count), 2) AS avg_pauses_per_session FROM title_pause_metrics GROUP BY title_id ORDER BY avg_pauses_per_session DESC, title_id ASC;
```

### ✅ PASS : MOVIES_097 - Distinct geo
```sql
SELECT user_id, COUNT(DISTINCT country) AS distinct_countries FROM devices WHERE country IS NOT NULL GROUP BY user_id HAVING COUNT(DISTINCT country) > 1 ORDER BY distinct_countries DESC, user_id ASC;
```

### ✅ PASS : MOVIES_097 - CTE geo
```sql
WITH user_countries AS (SELECT user_id, COUNT(DISTINCT country) AS distinct_countries FROM devices WHERE country IS NOT NULL GROUP BY user_id) SELECT user_id, distinct_countries FROM user_countries WHERE distinct_countries > 1 ORDER BY distinct_countries DESC, user_id ASC;
```

### ✅ PASS : MOVIES_097 - Self join geo
```sql
SELECT DISTINCT d1.user_id, 2 AS distinct_countries FROM devices d1 JOIN devices d2 ON d1.user_id = d2.user_id AND d1.country <> d2.country WHERE d1.country IS NOT NULL AND d2.country IS NOT NULL ORDER BY distinct_countries DESC, d1.user_id ASC;
```

### ✅ PASS : MOVIES_098 - CTR delivery
```sql
SELECT campaign_id, ROUND(COUNT(clicked_at)::numeric * 100 / COUNT(*), 2) AS ctr_percent FROM notification_deliveries GROUP BY campaign_id ORDER BY ctr_percent DESC, campaign_id ASC;
```

### ✅ PASS : MOVIES_098 - CTE ctr
```sql
WITH campaign_metrics AS (SELECT campaign_id, COUNT(*) AS total_deliveries, COUNT(clicked_at) AS clicked_deliveries FROM notification_deliveries GROUP BY campaign_id) SELECT campaign_id, ROUND(clicked_deliveries::numeric * 100 / total_deliveries, 2) AS ctr_percent FROM campaign_metrics ORDER BY ctr_percent DESC, campaign_id ASC;
```

### ✅ PASS : MOVIES_098 - Filter ctr
```sql
SELECT campaign_id, ROUND(COUNT(*) FILTER (WHERE clicked_at IS NOT NULL)::numeric * 100 / COUNT(*), 2) AS ctr_percent FROM notification_deliveries GROUP BY campaign_id ORDER BY ctr_percent DESC, campaign_id ASC;
```

### ✅ PASS : MOVIES_099 - Distinct rows
```sql
SELECT ri.profile_id, COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.profile_id ORDER BY distinct_rows_clicked DESC, ri.profile_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_099 - CTE rows
```sql
WITH clicked_rows AS (SELECT ri.profile_id, ri.row_id FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id) SELECT profile_id, COUNT(DISTINCT row_id) AS distinct_rows_clicked FROM clicked_rows GROUP BY profile_id ORDER BY distinct_rows_clicked DESC, profile_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_099 - Subquery rows
```sql
SELECT profile_id, distinct_rows_clicked FROM (SELECT ri.profile_id, COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.profile_id) x ORDER BY distinct_rows_clicked DESC, profile_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_100 - Renew join
```sql
WITH renewed_users AS (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1) SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN renewed_users ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY watch_count DESC, vs.title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_100 - Subquery renew
```sql
SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1) ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY watch_count DESC, vs.title_id ASC LIMIT 10;
```

### ✅ PASS : MOVIES_100 - CTE counts
```sql
WITH renewed_users AS (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1), renewed_title_views AS (SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN renewed_users ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id) SELECT title_id, watch_count FROM renewed_title_views ORDER BY watch_count DESC, title_id ASC LIMIT 10;
```

