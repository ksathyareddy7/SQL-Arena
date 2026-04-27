import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("movies");

export const tableDescriptions = {
  app_events: "General product events for browsing, home page behavior, and funnel analytics",
  billing_invoices:
    "Invoices generated for subscriptions including discounts, taxes, and payment state",
  content_availability: "Region and plan-based content availability windows",
  content_categories: "Catalog dimensions such as genre, mood, audience, and theme",
  content_licenses: "Regional licensing windows for titles",
  continue_watching: "Resume points and progress for unfinished playback",
  devices: "Registered and active playback devices linked to user accounts",
  downloads: "Offline downloads and expiration tracking for devices",
  episodes: "Episodes within each season used for episodic playback and analytics",
  experiment_assignments: "Profile-level experiment assignments used for experimental analysis",
  experiment_variants: "Variants belonging to each experiment with traffic allocations",
  experiments: "Product and algorithm experiments for A/B testing",
  notification_campaigns:
    "Marketing and engagement campaigns sent through push, email, SMS, or in-app",
  notification_deliveries: "Per-user campaign delivery and engagement tracking",
  payments: "Payment transactions for invoices including successes, failures, and refunds",
  people: "Actors, directors, writers, and other talent connected to titles",
  playback_events: "Detailed playback events such as play, pause, seek, buffer, and errors",
  profiles:
    "Profiles under each subscriber account used for personalization and household viewing",
  promotions: "Promotional codes used for subscription discounts and acquisition campaigns",
  ratings: "Profile-level ratings and feedback for titles or episodes",
  recommendation_clicks: "Clicks on recommendation impressions for downstream conversion analysis",
  recommendation_impressions:
    "Recommendation exposures served to profiles for ranking and CTR analysis",
  recommendation_rows:
    "Recommendation shelves and presentation rows shown on home and browse pages",
  search_queries:
    "Search behavior including query terms, result counts, and click-through outcomes",
  seasons: "Seasons belonging to series titles",
  subscription_plans: "Subscription plans such as mobile, standard, premium, and ad-supported",
  subscriptions: "Billing subscriptions for accounts and renewal lifecycle tracking",
  support_tickets: "Support issues related to billing, playback, downloads, and catalog problems",
  title_categories: "Bridge table connecting titles with genres, moods, and themes",
  title_credits: "Credits mapping talent and their roles to titles",
  title_localizations: "Localized catalog metadata for multilingual storefronts",
  titles: "Top-level catalog entities such as movies, series, documentaries, and specials",
  users: "Subscriber accounts on the streaming platform",
  viewing_sessions: "Playback sessions used for engagement, completion, and QoE analysis",
  watchlists: "Titles saved by profiles for later watching",
};

export const questions = [
  {"app_id":appId,"code":"MOVIES_001","title":"Total Users Count","description":"Find the total number of users on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_users FROM users;","solution_columns":["total_users"],"tables":["users"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_002","title":"Active Profiles Count","description":"Find the total number of active profiles.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_profiles FROM profiles WHERE is_active = true;","solution_columns":["active_profiles"],"tables":["profiles"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_003","title":"Total Titles Count","description":"Find the total number of titles available in the catalog.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_titles FROM titles;","solution_columns":["total_titles"],"tables":["titles"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_004","title":"Published Titles","description":"Find all published titles.","difficulty":"easy","expected_query":"SELECT id, title_name, title_type FROM titles WHERE content_status = 'published' ORDER BY id ASC;","solution_columns":["id","title_name","title_type"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_005","title":"Original Content","description":"Find all platform original titles.","difficulty":"easy","expected_query":"SELECT id, title_name, release_year FROM titles WHERE is_original = true ORDER BY release_year DESC, id ASC;","solution_columns":["id","title_name","release_year"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"release_year","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_006","title":"HD Plans","description":"Find all subscription plans with HD or better quality.","difficulty":"easy","expected_query":"SELECT id, plan_name, video_quality, price FROM subscription_plans WHERE video_quality IN ('hd', 'full_hd', 'uhd') ORDER BY price ASC, id ASC;","solution_columns":["id","plan_name","video_quality","price"],"tables":["subscription_plans"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"price","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_007","title":"Movies Released After 2020","description":"Find all movie titles released after 2020.","difficulty":"easy","expected_query":"SELECT id, title_name, release_year FROM titles WHERE title_type = 'movie' AND release_year > 2020 ORDER BY release_year DESC, id ASC;","solution_columns":["id","title_name","release_year"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"release_year","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_008","title":"Titles With Ratings Above 8","description":"Find titles having an IMDb-like score above 8.","difficulty":"easy","expected_query":"SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score > 8 ORDER BY imdb_like_score DESC, id ASC;","solution_columns":["id","title_name","imdb_like_score"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"imdb_like_score","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_009","title":"Downloaded Content","description":"Find all completed downloads.","difficulty":"easy","expected_query":"SELECT id, profile_id, device_id, download_status FROM downloads WHERE download_status = 'completed' ORDER BY id ASC;","solution_columns":["id","profile_id","device_id","download_status"],"tables":["downloads"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_010","title":"Top Rated Titles","description":"Find the top 5 highest rated titles by critic score.","difficulty":"easy","expected_query":"SELECT id, title_name, critic_score FROM titles WHERE critic_score IS NOT NULL ORDER BY critic_score DESC, id ASC LIMIT 5;","solution_columns":["id","title_name","critic_score"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"critic_score","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_011","title":"Titles Per Type","description":"Find the number of titles in each title type.","difficulty":"easy","expected_query":"SELECT title_type, COUNT(*) AS total_titles FROM titles GROUP BY title_type ORDER BY total_titles DESC, title_type ASC;","solution_columns":["title_type","total_titles"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_titles","direction":"desc"},{"column":"title_type","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_012","title":"Profiles Per User","description":"Find the number of profiles created under each user account.","difficulty":"easy","expected_query":"SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id ORDER BY profile_count DESC, user_id ASC;","solution_columns":["user_id","profile_count"],"tables":["profiles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"profile_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_013","title":"Titles Per Language","description":"Find the number of titles for each original language.","difficulty":"easy","expected_query":"SELECT original_language, COUNT(*) AS total_titles FROM titles GROUP BY original_language ORDER BY total_titles DESC, original_language ASC;","solution_columns":["original_language","total_titles"],"tables":["titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_titles","direction":"desc"},{"column":"original_language","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_014","title":"Average Movie Runtime","description":"Find the average runtime of all movie titles.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes FROM titles WHERE title_type = 'movie' AND runtime_minutes IS NOT NULL;","solution_columns":["avg_runtime_minutes"],"tables":["titles"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_015","title":"Active Subscriptions Count","description":"Find the total number of active subscriptions.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_subscriptions FROM subscriptions WHERE subscription_status = 'active';","solution_columns":["active_subscriptions"],"tables":["subscriptions"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_016","title":"Users With Multiple Profiles","description":"Find users who have more than one profile.","difficulty":"easy","expected_query":"SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY profile_count DESC, user_id ASC;","solution_columns":["user_id","profile_count"],"tables":["profiles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"profile_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_017","title":"Ratings Per Title","description":"Find the number of ratings received by each title.","difficulty":"easy","expected_query":"SELECT title_id, COUNT(*) AS ratings_count FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY ratings_count DESC, title_id ASC;","solution_columns":["title_id","ratings_count"],"tables":["ratings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ratings_count","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_018","title":"Completed Downloads Per Device","description":"Find the number of completed downloads on each device.","difficulty":"easy","expected_query":"SELECT device_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY device_id ORDER BY completed_downloads DESC, device_id ASC;","solution_columns":["device_id","completed_downloads"],"tables":["downloads"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_downloads","direction":"desc"},{"column":"device_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_019","title":"Average Rating Per Title","description":"Find the average rating for each title.","difficulty":"easy","expected_query":"SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_rating DESC, title_id ASC;","solution_columns":["title_id","avg_rating"],"tables":["ratings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rating","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_020","title":"Titles Added To Watchlist Most","description":"Find the top 5 titles that were added to watchlists the most.","difficulty":"easy","expected_query":"SELECT title_id, COUNT(*) AS watchlist_adds FROM watchlists GROUP BY title_id ORDER BY watchlist_adds DESC, title_id ASC LIMIT 5;","solution_columns":["title_id","watchlist_adds"],"tables":["watchlists"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"watchlist_adds","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_021","title":"User Emails With Active Plans","description":"Find all users who currently have an active subscription along with their plan names.","difficulty":"easy","expected_query":"SELECT u.id, u.email, sp.plan_name FROM users u JOIN subscriptions s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' ORDER BY u.id ASC;","solution_columns":["id","email","plan_name"],"tables":["users","subscriptions","subscription_plans"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_022","title":"Titles With Genres","description":"Find all titles along with their category names.","difficulty":"easy","expected_query":"SELECT t.id, t.title_name, c.category_name FROM titles t JOIN title_categories tc ON t.id = tc.title_id JOIN content_categories c ON tc.category_id = c.id ORDER BY t.id ASC, c.category_name ASC;","solution_columns":["id","title_name","category_name"],"tables":["titles","title_categories","content_categories"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"},{"column":"category_name","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_023","title":"Episodes Per Season","description":"Find the number of episodes in each season.","difficulty":"easy","expected_query":"SELECT season_id, COUNT(*) AS episode_count FROM episodes GROUP BY season_id ORDER BY episode_count DESC, season_id ASC;","solution_columns":["season_id","episode_count"],"tables":["episodes"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"episode_count","direction":"desc"},{"column":"season_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_024","title":"Viewing Sessions Per Profile","description":"Find the total number of viewing sessions for each profile.","difficulty":"easy","expected_query":"SELECT profile_id, COUNT(*) AS session_count FROM viewing_sessions GROUP BY profile_id ORDER BY session_count DESC, profile_id ASC;","solution_columns":["profile_id","session_count"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"session_count","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_025","title":"Most Watched Titles","description":"Find the top 5 most watched titles based on viewing sessions.","difficulty":"easy","expected_query":"SELECT title_id, COUNT(*) AS total_views FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY total_views DESC, title_id ASC LIMIT 5;","solution_columns":["title_id","total_views"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_views","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_026","title":"People Per Role","description":"Find the number of credited people for each role type.","difficulty":"easy","expected_query":"SELECT role_type, COUNT(*) AS total_people FROM title_credits GROUP BY role_type ORDER BY total_people DESC, role_type ASC;","solution_columns":["role_type","total_people"],"tables":["title_credits"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_people","direction":"desc"},{"column":"role_type","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_027","title":"Successful Payments","description":"Find all successful payments with their invoice amounts.","difficulty":"easy","expected_query":"SELECT p.id, p.invoice_id, p.paid_amount FROM payments p WHERE p.payment_status = 'successful' ORDER BY p.id ASC;","solution_columns":["id","invoice_id","paid_amount"],"tables":["payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_028","title":"Profiles With Watchlist","description":"Find profiles that have at least one title in their watchlist.","difficulty":"easy","expected_query":"SELECT profile_id, COUNT(*) AS watchlist_count FROM watchlists GROUP BY profile_id ORDER BY watchlist_count DESC, profile_id ASC;","solution_columns":["profile_id","watchlist_count"],"tables":["watchlists"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"watchlist_count","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_029","title":"Downloads Expiring Soon","description":"Find downloads that are set to expire in the next 7 days.","difficulty":"easy","expected_query":"SELECT id, profile_id, expires_at FROM downloads WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days' ORDER BY expires_at ASC;","solution_columns":["id","profile_id","expires_at"],"tables":["downloads"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"expires_at","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_030","title":"Average Watch Time Per Profile","description":"Find the average watch time in seconds for each profile.","difficulty":"easy","expected_query":"SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions GROUP BY profile_id ORDER BY avg_watch_time_seconds DESC, profile_id ASC;","solution_columns":["profile_id","avg_watch_time_seconds"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_watch_time_seconds","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_031","title":"Active Devices Per User","description":"Find the number of active devices for each user.","difficulty":"easy","expected_query":"SELECT user_id, COUNT(*) AS active_device_count FROM devices WHERE is_active = true GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;","solution_columns":["user_id","active_device_count"],"tables":["devices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"active_device_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_032","title":"Paid Invoices Count","description":"Find the total number of paid invoices.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS paid_invoices FROM billing_invoices WHERE invoice_status = 'paid';","solution_columns":["paid_invoices"],"tables":["billing_invoices"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_033","title":"Series With Seasons","description":"Find all series titles along with their season numbers.","difficulty":"easy","expected_query":"SELECT t.id, t.title_name, s.season_number FROM titles t JOIN seasons s ON t.id = s.title_id WHERE t.title_type = 'series' ORDER BY t.id ASC, s.season_number ASC;","solution_columns":["id","title_name","season_number"],"tables":["titles","seasons"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"},{"column":"season_number","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_034","title":"Average Invoice Amount By Currency","description":"Find the average total invoice amount for each currency.","difficulty":"easy","expected_query":"SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount FROM billing_invoices GROUP BY currency ORDER BY avg_total_amount DESC, currency ASC;","solution_columns":["currency","avg_total_amount"],"tables":["billing_invoices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_total_amount","direction":"desc"},{"column":"currency","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_035","title":"Top Recommendation Rows","description":"Find the top 5 recommendation rows by number of impressions served.","difficulty":"easy","expected_query":"SELECT row_id, COUNT(*) AS impression_count FROM recommendation_impressions GROUP BY row_id ORDER BY impression_count DESC, row_id ASC LIMIT 5;","solution_columns":["row_id","impression_count"],"tables":["recommendation_impressions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"impression_count","direction":"desc"},{"column":"row_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_036","title":"User Countries Count","description":"Find the number of users in each country.","difficulty":"medium","expected_query":"SELECT country, COUNT(*) AS total_users FROM users GROUP BY country ORDER BY total_users DESC, country ASC;","solution_columns":["country","total_users"],"tables":["users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_users","direction":"desc"},{"column":"country","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_037","title":"Average Profiles Per User","description":"Find the average number of profiles per user account.","difficulty":"medium","expected_query":"SELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user FROM (SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id) p;","solution_columns":["avg_profiles_per_user"],"tables":["profiles"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"MOVIES_038","title":"Titles Available In India","description":"Find all titles currently available in India.","difficulty":"medium","expected_query":"SELECT t.id, t.title_name, ca.available_from, ca.available_to FROM titles t JOIN content_availability ca ON t.id = ca.title_id WHERE ca.country = 'India' AND ca.is_available = true AND ca.available_from <= NOW() AND (ca.available_to IS NULL OR ca.available_to >= NOW()) ORDER BY t.id ASC;","solution_columns":["id","title_name","available_from","available_to"],"tables":["titles","content_availability"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_039","title":"Users On Ad Supported Plans","description":"Find all users subscribed to ad-supported plans.","difficulty":"medium","expected_query":"SELECT DISTINCT u.id, u.email, sp.plan_name FROM users u JOIN subscriptions s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' AND sp.has_ads = true ORDER BY u.id ASC;","solution_columns":["id","email","plan_name"],"tables":["users","subscriptions","subscription_plans"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_040","title":"Average Rating By Title Type","description":"Find the average rating for each title type.","difficulty":"medium","expected_query":"SELECT t.title_type, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM ratings r JOIN titles t ON r.title_id = t.id GROUP BY t.title_type ORDER BY avg_rating DESC, t.title_type ASC;","solution_columns":["title_type","avg_rating"],"tables":["ratings","titles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rating","direction":"desc"},{"column":"title_type","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_041","title":"Top Watched Profiles","description":"Find the top 5 profiles by total watch time.","difficulty":"medium","expected_query":"SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds FROM viewing_sessions GROUP BY profile_id ORDER BY total_watch_time_seconds DESC, profile_id ASC LIMIT 5;","solution_columns":["profile_id","total_watch_time_seconds"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_watch_time_seconds","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_042","title":"Most Used Devices","description":"Find the top 5 most used devices by viewing sessions.","difficulty":"medium","expected_query":"SELECT device_id, COUNT(*) AS session_count FROM viewing_sessions WHERE device_id IS NOT NULL GROUP BY device_id ORDER BY session_count DESC, device_id ASC LIMIT 5;","solution_columns":["device_id","session_count"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"session_count","direction":"desc"},{"column":"device_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_043","title":"Most Clicked Recommended Titles","description":"Find the top 5 titles with the highest recommendation clicks.","difficulty":"medium","expected_query":"SELECT ri.title_id, COUNT(*) AS click_count FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.title_id ORDER BY click_count DESC, ri.title_id ASC LIMIT 5;","solution_columns":["title_id","click_count"],"tables":["recommendation_clicks","recommendation_impressions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"click_count","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_044","title":"Top Categories By Titles","description":"Find the top 5 content categories having the most titles.","difficulty":"medium","expected_query":"SELECT c.category_name, COUNT(*) AS title_count FROM title_categories tc JOIN content_categories c ON tc.category_id = c.id GROUP BY c.category_name ORDER BY title_count DESC, c.category_name ASC LIMIT 5;","solution_columns":["category_name","title_count"],"tables":["title_categories","content_categories"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"title_count","direction":"desc"},{"column":"category_name","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_045","title":"Users With Expired Subscriptions","description":"Find users whose subscriptions have expired.","difficulty":"medium","expected_query":"SELECT u.id, u.email, s.current_period_end FROM users u JOIN subscriptions s ON u.id = s.user_id WHERE s.subscription_status = 'expired' OR s.current_period_end < NOW() ORDER BY s.current_period_end DESC, u.id ASC;","solution_columns":["id","email","current_period_end"],"tables":["users","subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"current_period_end","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_046","title":"Highest Revenue Plans","description":"Find subscription plans generating the highest total invoice revenue.","difficulty":"medium","expected_query":"SELECT sp.plan_name, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE bi.invoice_status = 'paid' GROUP BY sp.plan_name ORDER BY total_revenue DESC, sp.plan_name ASC;","solution_columns":["plan_name","total_revenue"],"tables":["billing_invoices","subscriptions","subscription_plans"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"},{"column":"plan_name","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_047","title":"Average Completion By Title","description":"Find the average completion percentage for each title.","difficulty":"medium","expected_query":"SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_completion_percent DESC, title_id ASC;","solution_columns":["title_id","avg_completion_percent"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_completion_percent","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_048","title":"Profiles With Most Watchlist Titles","description":"Find the top 5 profiles with the largest watchlists.","difficulty":"medium","expected_query":"SELECT profile_id, COUNT(*) AS watchlist_size FROM watchlists GROUP BY profile_id ORDER BY watchlist_size DESC, profile_id ASC LIMIT 5;","solution_columns":["profile_id","watchlist_size"],"tables":["watchlists"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"watchlist_size","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_049","title":"Countries With Most Users","description":"Find the top 5 countries with the most users.","difficulty":"medium","expected_query":"SELECT country, COUNT(*) AS user_count FROM users GROUP BY country ORDER BY user_count DESC, country ASC LIMIT 5;","solution_columns":["country","user_count"],"tables":["users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_count","direction":"desc"},{"column":"country","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_050","title":"Most Common Playback Errors","description":"Find the top 5 most frequent playback error codes.","difficulty":"medium","expected_query":"SELECT error_code, COUNT(*) AS error_count FROM playback_events WHERE error_code IS NOT NULL GROUP BY error_code ORDER BY error_count DESC, error_code ASC LIMIT 5;","solution_columns":["error_code","error_count"],"tables":["playback_events"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"error_count","direction":"desc"},{"column":"error_code","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_051","title":"Most Viewed Titles By Country","description":"Find the top 5 most viewed titles for each country.","difficulty":"medium","expected_query":"SELECT country, title_id, total_views FROM (SELECT ae.country, vs.title_id, COUNT(*) AS total_views, ROW_NUMBER() OVER (PARTITION BY ae.country ORDER BY COUNT(*) DESC, vs.title_id ASC) AS rn FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id) ranked WHERE rn <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;","solution_columns":["country","title_id","total_views"],"tables":["viewing_sessions","app_events"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"country","direction":"asc"},{"column":"total_views","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_052","title":"Profiles With Highest Completion Rate","description":"Find the top 5 profiles with the highest average completion percentage.","difficulty":"medium","expected_query":"SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions GROUP BY profile_id ORDER BY avg_completion_percent DESC, profile_id ASC LIMIT 5;","solution_columns":["profile_id","avg_completion_percent"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_completion_percent","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_053","title":"Titles With Highest Buffer Time","description":"Find the top 5 titles with the highest average buffer duration.","difficulty":"medium","expected_query":"SELECT vs.title_id, ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL GROUP BY vs.title_id ORDER BY avg_buffer_duration_ms DESC, vs.title_id ASC LIMIT 5;","solution_columns":["title_id","avg_buffer_duration_ms"],"tables":["playback_events","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_buffer_duration_ms","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_054","title":"Revenue By Country","description":"Find the total paid invoice revenue by user country.","difficulty":"medium","expected_query":"SELECT u.country, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id WHERE bi.invoice_status = 'paid' GROUP BY u.country ORDER BY total_revenue DESC, u.country ASC;","solution_columns":["country","total_revenue"],"tables":["billing_invoices","subscriptions","users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"},{"column":"country","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_055","title":"Most Active Search Profiles","description":"Find the top 5 profiles with the highest number of searches.","difficulty":"medium","expected_query":"SELECT profile_id, COUNT(*) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id ORDER BY total_searches DESC, profile_id ASC LIMIT 5;","solution_columns":["profile_id","total_searches"],"tables":["search_queries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_searches","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_056","title":"Most Popular Actors","description":"Find the top 5 actors appearing in the most titles.","difficulty":"medium","expected_query":"SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM title_credits WHERE role_type = 'actor' GROUP BY person_id ORDER BY total_titles DESC, person_id ASC LIMIT 5;","solution_columns":["person_id","total_titles"],"tables":["title_credits"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_titles","direction":"desc"},{"column":"person_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_057","title":"Top Downloaded Titles","description":"Find the top 5 most downloaded titles.","difficulty":"medium","expected_query":"SELECT title_id, COUNT(*) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id ORDER BY total_downloads DESC, title_id ASC LIMIT 5;","solution_columns":["title_id","total_downloads"],"tables":["downloads"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_downloads","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_058","title":"Profiles With Multiple Devices","description":"Find users who have used more than one distinct device.","difficulty":"medium","expected_query":"SELECT d.user_id, COUNT(DISTINCT d.id) AS device_count FROM devices d GROUP BY d.user_id HAVING COUNT(DISTINCT d.id) > 1 ORDER BY device_count DESC, d.user_id ASC;","solution_columns":["user_id","device_count"],"tables":["devices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"device_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_059","title":"Most Successful Campaigns","description":"Find the top 5 campaigns with the highest click count.","difficulty":"medium","expected_query":"SELECT campaign_id, COUNT(*) AS click_count FROM notification_deliveries WHERE clicked_at IS NOT NULL GROUP BY campaign_id ORDER BY click_count DESC, campaign_id ASC LIMIT 5;","solution_columns":["campaign_id","click_count"],"tables":["notification_deliveries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"click_count","direction":"desc"},{"column":"campaign_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_060","title":"Average Watch Time By Device Type","description":"Find the average watch time by device type.","difficulty":"medium","expected_query":"SELECT d.device_type, ROUND(AVG(vs.watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id GROUP BY d.device_type ORDER BY avg_watch_time_seconds DESC, d.device_type ASC;","solution_columns":["device_type","avg_watch_time_seconds"],"tables":["viewing_sessions","devices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_watch_time_seconds","direction":"desc"},{"column":"device_type","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_061","title":"Monthly Revenue Trend","description":"Find the total paid invoice revenue for each month.","difficulty":"medium","expected_query":"SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at) ORDER BY revenue_month ASC;","solution_columns":["revenue_month","total_revenue"],"tables":["billing_invoices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"revenue_month","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_062","title":"Monthly New Subscribers","description":"Find the number of new subscriptions started each month.","difficulty":"medium","expected_query":"SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at) ORDER BY signup_month ASC;","solution_columns":["signup_month","new_subscribers"],"tables":["subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"signup_month","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_063","title":"Top Rated Actors","description":"Find the top 5 actors whose titles have the highest average rating.","difficulty":"medium","expected_query":"SELECT tc.person_id, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor' GROUP BY tc.person_id ORDER BY avg_rating DESC, tc.person_id ASC LIMIT 5;","solution_columns":["person_id","avg_rating"],"tables":["title_credits","ratings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rating","direction":"desc"},{"column":"person_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_064","title":"Profiles Watching Multiple Genres","description":"Find profiles that have watched titles from more than 3 distinct categories.","difficulty":"medium","expected_query":"SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id HAVING COUNT(DISTINCT tc.category_id) > 3 ORDER BY category_count DESC, vs.profile_id ASC;","solution_columns":["profile_id","category_count"],"tables":["viewing_sessions","title_categories"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"category_count","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_065","title":"Top Search Terms","description":"Find the top 10 most searched query terms.","difficulty":"medium","expected_query":"SELECT query_text, COUNT(*) AS search_count FROM search_queries GROUP BY query_text ORDER BY search_count DESC, query_text ASC LIMIT 10;","solution_columns":["query_text","search_count"],"tables":["search_queries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"search_count","direction":"desc"},{"column":"query_text","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_066","title":"Best CTR Recommendation Rows","description":"Find recommendation rows with the highest click-through rate.","difficulty":"medium","expected_query":"SELECT rr.id, rr.row_name, ROUND(COUNT(rc.id)::numeric * 100 / COUNT(ri.id), 2) AS ctr_percent FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name ORDER BY ctr_percent DESC, rr.id ASC;","solution_columns":["id","row_name","ctr_percent"],"tables":["recommendation_rows","recommendation_impressions","recommendation_clicks"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ctr_percent","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_067","title":"Titles Near License Expiry","description":"Find titles whose license expires within the next 30 days.","difficulty":"medium","expected_query":"SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days' ORDER BY license_end ASC, title_id ASC;","solution_columns":["title_id","licensed_region","license_end"],"tables":["content_licenses"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"license_end","direction":"asc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_068","title":"High Buffer Sessions","description":"Find sessions where total buffer duration exceeded 10 seconds.","difficulty":"medium","expected_query":"SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id HAVING SUM(buffer_duration_ms) > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;","solution_columns":["session_id","total_buffer_ms"],"tables":["playback_events"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_buffer_ms","direction":"desc"},{"column":"session_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_069","title":"Profiles With Abandoned Sessions","description":"Find profiles having more than 5 abandoned viewing sessions.","difficulty":"medium","expected_query":"SELECT profile_id, COUNT(*) AS abandoned_sessions FROM viewing_sessions WHERE session_status = 'abandoned' GROUP BY profile_id HAVING COUNT(*) > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;","solution_columns":["profile_id","abandoned_sessions"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"abandoned_sessions","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_070","title":"Most Engaging Titles","description":"Find the top 5 titles with the highest average watch time.","difficulty":"medium","expected_query":"SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_watch_time_seconds DESC, title_id ASC LIMIT 5;","solution_columns":["title_id","avg_watch_time_seconds"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_watch_time_seconds","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_071","title":"Countries With Highest Playback Failures","description":"Find the top 5 countries with the highest number of failed viewing sessions.","difficulty":"medium","expected_query":"SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country ORDER BY failed_sessions DESC, d.country ASC LIMIT 5;","solution_columns":["country","failed_sessions"],"tables":["viewing_sessions","devices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"failed_sessions","direction":"desc"},{"column":"country","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_072","title":"Plan Wise Active Users","description":"Find the number of distinct active users for each subscription plan.","difficulty":"medium","expected_query":"SELECT sp.plan_name, COUNT(DISTINCT s.user_id) AS active_users FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' GROUP BY sp.plan_name ORDER BY active_users DESC, sp.plan_name ASC;","solution_columns":["plan_name","active_users"],"tables":["subscriptions","subscription_plans"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"active_users","direction":"desc"},{"column":"plan_name","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_073","title":"Most Rated Genres","description":"Find the top 5 categories whose titles received the most ratings.","difficulty":"medium","expected_query":"SELECT c.category_name, COUNT(*) AS ratings_count FROM ratings r JOIN title_categories tc ON r.title_id = tc.title_id JOIN content_categories c ON tc.category_id = c.id WHERE r.title_id IS NOT NULL GROUP BY c.category_name ORDER BY ratings_count DESC, c.category_name ASC LIMIT 5;","solution_columns":["category_name","ratings_count"],"tables":["ratings","title_categories","content_categories"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ratings_count","direction":"desc"},{"column":"category_name","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_074","title":"Monthly Download Counts","description":"Find the total number of completed downloads for each month.","difficulty":"medium","expected_query":"SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at) ORDER BY download_month ASC;","solution_columns":["download_month","completed_downloads"],"tables":["downloads"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"download_month","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_075","title":"Users With Multiple Active Subscriptions","description":"Find users who have more than one active subscription.","difficulty":"medium","expected_query":"SELECT user_id, COUNT(*) AS active_subscription_count FROM subscriptions WHERE subscription_status = 'active' GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY active_subscription_count DESC, user_id ASC;","solution_columns":["user_id","active_subscription_count"],"tables":["subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"active_subscription_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_076","title":"Top Completion Titles Per Country","description":"For each country, find the title with the highest average completion percentage.","difficulty":"hard","expected_query":"WITH title_completion AS (SELECT d.country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent, ROW_NUMBER() OVER (PARTITION BY d.country ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC) AS rn FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id) SELECT country, title_id, avg_completion_percent FROM title_completion WHERE rn = 1 ORDER BY country ASC, title_id ASC;","solution_columns":["country","title_id","avg_completion_percent"],"tables":["viewing_sessions","devices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"country","direction":"asc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_077","title":"Binge Watch Profiles","description":"Find profiles that watched at least 3 episodes of the same season in a single day.","difficulty":"hard","expected_query":"SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(DISTINCT vs.episode_id) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at) HAVING COUNT(DISTINCT vs.episode_id) >= 3 ORDER BY episodes_watched DESC, vs.profile_id ASC, e.season_id ASC, watch_date ASC;","solution_columns":["profile_id","season_id","watch_date","episodes_watched"],"tables":["viewing_sessions","episodes"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"episodes_watched","direction":"desc"},{"column":"profile_id","direction":"asc"},{"column":"season_id","direction":"asc"},{"column":"watch_date","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_078","title":"Recommendation Conversion Rate By Row","description":"Find the conversion rate of each recommendation row, where conversion means the clicked title was later watched.","difficulty":"hard","expected_query":"WITH clicked_impressions AS (SELECT ri.id AS impression_id, ri.row_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON rc.impression_id = ri.id), converted_clicks AS (SELECT DISTINCT ci.impression_id FROM clicked_impressions ci JOIN viewing_sessions vs ON vs.profile_id = ci.profile_id AND vs.title_id = ci.title_id) SELECT rr.id, rr.row_name, ROUND(COUNT(cc.impression_id)::numeric * 100 / COUNT(ci.impression_id), 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN clicked_impressions ci ON rr.id = ci.row_id LEFT JOIN converted_clicks cc ON ci.impression_id = cc.impression_id GROUP BY rr.id, rr.row_name ORDER BY conversion_rate_percent DESC, rr.id ASC;","solution_columns":["id","row_name","conversion_rate_percent"],"tables":["recommendation_rows","recommendation_impressions","recommendation_clicks","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"conversion_rate_percent","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_079","title":"Profiles Preferring Downloads Over Streaming","description":"Find profiles whose completed download count is greater than their viewing session count.","difficulty":"hard","expected_query":"WITH download_counts AS (SELECT profile_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY profile_id), session_counts AS (SELECT profile_id, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id) SELECT dc.profile_id, dc.completed_downloads, COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count FROM download_counts dc LEFT JOIN session_counts sc ON dc.profile_id = sc.profile_id WHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0) ORDER BY dc.completed_downloads DESC, dc.profile_id ASC;","solution_columns":["profile_id","completed_downloads","viewing_sessions_count"],"tables":["downloads","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_downloads","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_080","title":"Most Valuable Retained Users","description":"Find users whose total paid invoice amount is above the overall average paid amount per user.","difficulty":"hard","expected_query":"WITH user_revenue AS (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id), revenue_avg AS (SELECT AVG(total_paid_amount) AS avg_paid_amount FROM user_revenue) SELECT ur.user_id, ROUND(ur.total_paid_amount, 2) AS total_paid_amount FROM user_revenue ur CROSS JOIN revenue_avg ra WHERE ur.total_paid_amount > ra.avg_paid_amount ORDER BY total_paid_amount DESC, ur.user_id ASC;","solution_columns":["user_id","total_paid_amount"],"tables":["billing_invoices","subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_paid_amount","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_081","title":"Longest Retention Streak","description":"Find users who have maintained uninterrupted active subscriptions for the longest duration.","difficulty":"hard","expected_query":"SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id ORDER BY retention_days DESC, user_id ASC LIMIT 10;","solution_columns":["user_id","first_subscription_start","latest_period_end","retention_days"],"tables":["subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"retention_days","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_082","title":"Top Rewatched Titles","description":"Find the top 10 titles that were watched multiple times by the same profiles.","difficulty":"hard","expected_query":"SELECT title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1 ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;","solution_columns":["title_id","rewatch_sessions"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rewatch_sessions","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_083","title":"Titles Losing Audience","description":"Find titles whose average completion in the last 30 days is lower than their historical average.","difficulty":"hard","expected_query":"WITH historical_avg AS (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id), recent_avg AS (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id) SELECT h.title_id, ROUND(h.hist_avg, 2) AS historical_avg_completion, ROUND(r.recent_avg, 2) AS recent_avg_completion FROM historical_avg h JOIN recent_avg r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg ORDER BY historical_avg_completion DESC, h.title_id ASC;","solution_columns":["title_id","historical_avg_completion","recent_avg_completion"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"historical_avg_completion","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_084","title":"Most Dropped Episodes","description":"Find the top 10 episodes with the highest abandoned session count.","difficulty":"hard","expected_query":"SELECT episode_id, COUNT(*) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;","solution_columns":["episode_id","abandoned_count"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"abandoned_count","direction":"desc"},{"column":"episode_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_085","title":"Top Revenue Per Country","description":"Find the highest revenue generating title in each country.","difficulty":"hard","expected_query":"WITH title_revenue AS (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rn FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id) SELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue FROM title_revenue WHERE rn = 1 ORDER BY country ASC;","solution_columns":["country","title_id","total_revenue"],"tables":["billing_invoices","subscriptions","users","profiles","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"country","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_086","title":"High Churn Risk Users","description":"Find active users whose watch time in the last 30 days dropped below 50 percent of their previous 30-day period.","difficulty":"hard","expected_query":"WITH recent_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id), previous_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id) SELECT r.user_id, r.recent_watch_time, p.previous_watch_time FROM recent_period r JOIN previous_period p ON r.user_id = p.user_id WHERE r.recent_watch_time < (p.previous_watch_time * 0.5) ORDER BY r.recent_watch_time ASC, r.user_id ASC;","solution_columns":["user_id","recent_watch_time","previous_watch_time"],"tables":["viewing_sessions","profiles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"recent_watch_time","direction":"asc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_087","title":"Binge Completion Funnel","description":"Find profiles that completed an entire season within 24 hours.","difficulty":"hard","expected_query":"WITH season_totals AS (SELECT season_id, COUNT(*) AS total_episodes FROM episodes GROUP BY season_id), profile_season_watch AS (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM profile_season_watch psw JOIN season_totals st ON psw.season_id = st.season_id WHERE psw.watched_episodes = st.total_episodes AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;","solution_columns":["profile_id","season_id","watched_episodes"],"tables":["viewing_sessions","episodes"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"profile_id","direction":"asc"},{"column":"season_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_088","title":"Best Performing Experiments","description":"Find experiments whose variant CTR outperformed control CTR.","difficulty":"hard","expected_query":"WITH experiment_ctr AS (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) SELECT v.experiment_id FROM experiment_ctr v JOIN experiment_ctr c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;","solution_columns":["experiment_id"],"tables":["experiment_assignments","experiment_variants","recommendation_impressions","recommendation_clicks"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"experiment_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_089","title":"Profiles Watching Same Title Across Multiple Devices","description":"Find profiles that watched the same title on more than one device.","difficulty":"hard","expected_query":"SELECT profile_id, title_id, COUNT(DISTINCT device_id) AS device_count FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(DISTINCT device_id) > 1 ORDER BY device_count DESC, profile_id ASC, title_id ASC;","solution_columns":["profile_id","title_id","device_count"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"device_count","direction":"desc"},{"column":"profile_id","direction":"asc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_090","title":"Top Cross Genre Viewers","description":"Find profiles that watched titles across the highest number of distinct categories.","difficulty":"hard","expected_query":"SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id ORDER BY distinct_categories DESC, vs.profile_id ASC LIMIT 10;","solution_columns":["profile_id","distinct_categories"],"tables":["viewing_sessions","title_categories"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"distinct_categories","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_091","title":"Top Revenue Titles By Month","description":"For each month, find the title that generated the highest paid invoice revenue.","difficulty":"hard","expected_query":"WITH monthly_title_revenue AS (SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, SUM(bi.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', bi.issued_at) ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rn FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id) SELECT revenue_month, title_id, ROUND(total_revenue, 2) AS total_revenue FROM monthly_title_revenue WHERE rn = 1 ORDER BY revenue_month ASC;","solution_columns":["revenue_month","title_id","total_revenue"],"tables":["billing_invoices","subscriptions","users","profiles","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"revenue_month","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_092","title":"Most Successful Recommendation Titles","description":"Find titles with the highest watch conversion rate after recommendation click.","difficulty":"hard","expected_query":"WITH clicked_titles AS (SELECT ri.id AS impression_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id), watched_titles AS (SELECT DISTINCT ct.impression_id, ct.title_id FROM clicked_titles ct JOIN viewing_sessions vs ON ct.profile_id = vs.profile_id AND ct.title_id = vs.title_id) SELECT ct.title_id, ROUND(COUNT(wt.impression_id)::numeric * 100 / COUNT(ct.impression_id), 2) AS watch_conversion_rate FROM clicked_titles ct LEFT JOIN watched_titles wt ON ct.impression_id = wt.impression_id GROUP BY ct.title_id ORDER BY watch_conversion_rate DESC, ct.title_id ASC;","solution_columns":["title_id","watch_conversion_rate"],"tables":["recommendation_impressions","recommendation_clicks","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"watch_conversion_rate","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_093","title":"Most Retained Profiles","description":"Find profiles active in every month of the last 6 months.","difficulty":"hard","expected_query":"WITH monthly_activity AS (SELECT profile_id, DATE_TRUNC('month', started_at) AS activity_month FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id, DATE_TRUNC('month', started_at)) SELECT profile_id FROM monthly_activity GROUP BY profile_id HAVING COUNT(DISTINCT activity_month) = 6 ORDER BY profile_id ASC;","solution_columns":["profile_id"],"tables":["viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_094","title":"Users With Highest LTV","description":"Find the top 10 users by lifetime total paid invoice amount.","difficulty":"hard","expected_query":"SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id ORDER BY lifetime_value DESC, s.user_id ASC LIMIT 10;","solution_columns":["user_id","lifetime_value"],"tables":["billing_invoices","subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"lifetime_value","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_095","title":"Top Completed Series","description":"Find the top 10 series with the highest average episode completion rate.","difficulty":"hard","expected_query":"SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id ORDER BY avg_completion_percent DESC, s.title_id ASC LIMIT 10;","solution_columns":["title_id","avg_completion_percent"],"tables":["viewing_sessions","episodes","seasons"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_completion_percent","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_096","title":"Most Interrupted Titles","description":"Find titles with the highest average number of pauses per session.","difficulty":"hard","expected_query":"WITH session_pauses AS (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id) SELECT vs.title_id, ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session FROM session_pauses sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY avg_pauses_per_session DESC, vs.title_id ASC;","solution_columns":["title_id","avg_pauses_per_session"],"tables":["playback_events","viewing_sessions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_pauses_per_session","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_097","title":"Users Watching Across Multiple Countries","description":"Find users whose devices were active in more than one country.","difficulty":"hard","expected_query":"SELECT user_id, COUNT(DISTINCT country) AS distinct_countries FROM devices WHERE country IS NOT NULL GROUP BY user_id HAVING COUNT(DISTINCT country) > 1 ORDER BY distinct_countries DESC, user_id ASC;","solution_columns":["user_id","distinct_countries"],"tables":["devices"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"distinct_countries","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_098","title":"Best Performing Notification Campaigns","description":"Find campaigns with the highest click-through rate.","difficulty":"hard","expected_query":"SELECT campaign_id, ROUND(COUNT(clicked_at)::numeric * 100 / COUNT(*), 2) AS ctr_percent FROM notification_deliveries GROUP BY campaign_id ORDER BY ctr_percent DESC, campaign_id ASC;","solution_columns":["campaign_id","ctr_percent"],"tables":["notification_deliveries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ctr_percent","direction":"desc"},{"column":"campaign_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_099","title":"Top Profiles By Recommendation Diversity","description":"Find profiles that clicked titles from the highest number of distinct recommendation rows.","difficulty":"hard","expected_query":"SELECT ri.profile_id, COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.profile_id ORDER BY distinct_rows_clicked DESC, ri.profile_id ASC LIMIT 10;","solution_columns":["profile_id","distinct_rows_clicked"],"tables":["recommendation_clicks","recommendation_impressions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"distinct_rows_clicked","direction":"desc"},{"column":"profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"MOVIES_100","title":"Titles With Highest Subscriber Retention","description":"Find titles most frequently watched by users who renewed subscriptions.","difficulty":"hard","expected_query":"WITH renewed_users AS (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1) SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN renewed_users ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY watch_count DESC, vs.title_id ASC LIMIT 10;","solution_columns":["title_id","watch_count"],"tables":["viewing_sessions","profiles","subscriptions"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"watch_count","direction":"desc"},{"column":"title_id","direction":"asc"}]}},
];

export const hints = [
  {
    "code": "MOVIES_001",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all users in one table."
      },
      {
        "hint_order": 2,
        "content": "Use an aggregate function."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from users."
      }
    ]
  },
  {
    "code": "MOVIES_002",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter only active profiles first."
      },
      {
        "hint_order": 2,
        "content": "Use the is_active column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE is_active = true."
      }
    ]
  },
  {
    "code": "MOVIES_003",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all catalog titles."
      },
      {
        "hint_order": 2,
        "content": "Use the titles table only."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from titles."
      }
    ]
  },
  {
    "code": "MOVIES_004",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter titles by published status."
      },
      {
        "hint_order": 2,
        "content": "Use content_status column."
      },
      {
        "hint_order": 3,
        "content": "Select columns and ORDER BY id."
      }
    ]
  },
  {
    "code": "MOVIES_005",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only original content."
      },
      {
        "hint_order": 2,
        "content": "Use the is_original flag."
      },
      {
        "hint_order": 3,
        "content": "Sort by release_year DESC, then id."
      }
    ]
  },
  {
    "code": "MOVIES_006",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter plans by allowed video quality values."
      },
      {
        "hint_order": 2,
        "content": "Use video_quality with multiple options."
      },
      {
        "hint_order": 3,
        "content": "WHERE video_quality IN (...)."
      }
    ]
  },
  {
    "code": "MOVIES_007",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only movie titles."
      },
      {
        "hint_order": 2,
        "content": "Filter by release year greater than 2020."
      },
      {
        "hint_order": 3,
        "content": "Use title_type and release_year in WHERE."
      }
    ]
  },
  {
    "code": "MOVIES_008",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look at IMDb-like scores only."
      },
      {
        "hint_order": 2,
        "content": "Filter scores above 8."
      },
      {
        "hint_order": 3,
        "content": "Sort by imdb_like_score DESC."
      }
    ]
  },
  {
    "code": "MOVIES_009",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only completed downloads."
      },
      {
        "hint_order": 2,
        "content": "Use the download_status column."
      },
      {
        "hint_order": 3,
        "content": "Select rows with WHERE and sort by id."
      }
    ]
  },
  {
    "code": "MOVIES_010",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only titles with critic scores matter."
      },
      {
        "hint_order": 2,
        "content": "Sort highest scores first."
      },
      {
        "hint_order": 3,
        "content": "ORDER BY critic_score DESC LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_011",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group titles by type."
      },
      {
        "hint_order": 2,
        "content": "Count rows in each group."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY title_type with COUNT(*)."
      }
    ]
  },
  {
    "code": "MOVIES_012",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each profile belongs to one user."
      },
      {
        "hint_order": 2,
        "content": "Group profiles by user_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) per user_id."
      }
    ]
  },
  {
    "code": "MOVIES_013",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group titles by original language."
      },
      {
        "hint_order": 2,
        "content": "Count how many titles each language has."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY original_language."
      }
    ]
  },
  {
    "code": "MOVIES_014",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only movie rows should be included."
      },
      {
        "hint_order": 2,
        "content": "Average the runtime column."
      },
      {
        "hint_order": 3,
        "content": "AVG(runtime_minutes) for title_type = 'movie'."
      }
    ]
  },
  {
    "code": "MOVIES_015",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter to active subscriptions only."
      },
      {
        "hint_order": 2,
        "content": "Use subscription_status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE subscription_status = 'active'."
      }
    ]
  },
  {
    "code": "MOVIES_016",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count profiles per user first."
      },
      {
        "hint_order": 2,
        "content": "Keep only users with more than one profile."
      },
      {
        "hint_order": 3,
        "content": "Use GROUP BY and HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "MOVIES_017",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only title ratings should be counted."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows where title_id is NULL."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY title_id and COUNT(*)."
      }
    ]
  },
  {
    "code": "MOVIES_018",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep completed downloads only."
      },
      {
        "hint_order": 2,
        "content": "Count them for each device."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY device_id after filtering."
      }
    ]
  },
  {
    "code": "MOVIES_019",
    "hints": [
      {
        "hint_order": 1,
        "content": "Average ratings for each title."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows without title_id."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY title_id with AVG(rating_value)."
      }
    ]
  },
  {
    "code": "MOVIES_020",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each watchlist row is one add event."
      },
      {
        "hint_order": 2,
        "content": "Count adds per title."
      },
      {
        "hint_order": 3,
        "content": "ORDER BY count DESC and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_021",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need users, subscriptions, and plans."
      },
      {
        "hint_order": 2,
        "content": "Join user to subscription, then to plan."
      },
      {
        "hint_order": 3,
        "content": "Filter active subscriptions only."
      }
    ]
  },
  {
    "code": "MOVIES_022",
    "hints": [
      {
        "hint_order": 1,
        "content": "Titles and categories are many-to-many."
      },
      {
        "hint_order": 2,
        "content": "Use the bridge table title_categories."
      },
      {
        "hint_order": 3,
        "content": "Join titles -> title_categories -> content_categories."
      }
    ]
  },
  {
    "code": "MOVIES_023",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count episodes inside each season."
      },
      {
        "hint_order": 2,
        "content": "Group rows by season_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with GROUP BY season_id."
      }
    ]
  },
  {
    "code": "MOVIES_024",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each viewing_sessions row is one session."
      },
      {
        "hint_order": 2,
        "content": "Count sessions per profile."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id."
      }
    ]
  },
  {
    "code": "MOVIES_025",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look only at title-level viewing sessions."
      },
      {
        "hint_order": 2,
        "content": "Count views per title_id."
      },
      {
        "hint_order": 3,
        "content": "Sort by count DESC and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_026",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group credits by role type."
      },
      {
        "hint_order": 2,
        "content": "Count rows in each role."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY role_type with COUNT(*)."
      }
    ]
  },
  {
    "code": "MOVIES_027",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only successful payments."
      },
      {
        "hint_order": 2,
        "content": "Use payment_status column."
      },
      {
        "hint_order": 3,
        "content": "Select id, invoice_id, paid_amount after filtering."
      }
    ]
  },
  {
    "code": "MOVIES_028",
    "hints": [
      {
        "hint_order": 1,
        "content": "A profile with watchlist items appears in watchlists table."
      },
      {
        "hint_order": 2,
        "content": "Count watchlist rows per profile."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id."
      }
    ]
  },
  {
    "code": "MOVIES_029",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find downloads expiring soon using expires_at."
      },
      {
        "hint_order": 2,
        "content": "Compare against current time plus 7 days."
      },
      {
        "hint_order": 3,
        "content": "Use BETWEEN NOW() AND NOW() + INTERVAL '7 days'."
      }
    ]
  },
  {
    "code": "MOVIES_030",
    "hints": [
      {
        "hint_order": 1,
        "content": "Average watch time for each profile."
      },
      {
        "hint_order": 2,
        "content": "Use watch_time_seconds column."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id with AVG(watch_time_seconds)."
      }
    ]
  },
  {
    "code": "MOVIES_031",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count only active devices."
      },
      {
        "hint_order": 2,
        "content": "Filter by is_active first."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY user_id with COUNT(*)."
      }
    ]
  },
  {
    "code": "MOVIES_032",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count invoices with paid status."
      },
      {
        "hint_order": 2,
        "content": "Use invoice_status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE invoice_status = 'paid'."
      }
    ]
  },
  {
    "code": "MOVIES_033",
    "hints": [
      {
        "hint_order": 1,
        "content": "Series titles connect to seasons by title_id."
      },
      {
        "hint_order": 2,
        "content": "Join titles with seasons."
      },
      {
        "hint_order": 3,
        "content": "Filter title_type = 'series' and sort."
      }
    ]
  },
  {
    "code": "MOVIES_034",
    "hints": [
      {
        "hint_order": 1,
        "content": "Average invoice totals per currency."
      },
      {
        "hint_order": 2,
        "content": "Group by currency."
      },
      {
        "hint_order": 3,
        "content": "Use AVG(total_amount) with ROUND(..., 2)."
      }
    ]
  },
  {
    "code": "MOVIES_035",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each impression belongs to a recommendation row."
      },
      {
        "hint_order": 2,
        "content": "Count impressions per row_id."
      },
      {
        "hint_order": 3,
        "content": "Sort by count DESC and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_036",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count users in each country."
      },
      {
        "hint_order": 2,
        "content": "Group rows by country."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with GROUP BY country."
      }
    ]
  },
  {
    "code": "MOVIES_037",
    "hints": [
      {
        "hint_order": 1,
        "content": "First count profiles per user."
      },
      {
        "hint_order": 2,
        "content": "Then average those counts."
      },
      {
        "hint_order": 3,
        "content": "Use a subquery or CTE before AVG()."
      }
    ]
  },
  {
    "code": "MOVIES_038",
    "hints": [
      {
        "hint_order": 1,
        "content": "Join titles with content availability."
      },
      {
        "hint_order": 2,
        "content": "Filter for country = 'India' and available rows."
      },
      {
        "hint_order": 3,
        "content": "Check current date is within available_from and available_to."
      }
    ]
  },
  {
    "code": "MOVIES_039",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need users, subscriptions, and plans."
      },
      {
        "hint_order": 2,
        "content": "Filter active subscriptions and ad-supported plans."
      },
      {
        "hint_order": 3,
        "content": "Use DISTINCT to avoid duplicate users."
      }
    ]
  },
  {
    "code": "MOVIES_040",
    "hints": [
      {
        "hint_order": 1,
        "content": "Ratings need to be mapped to title types."
      },
      {
        "hint_order": 2,
        "content": "Join ratings with titles on title_id."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY title_type with AVG(rating_value)."
      }
    ]
  },
  {
    "code": "MOVIES_041",
    "hints": [
      {
        "hint_order": 1,
        "content": "Sum watch time for each profile."
      },
      {
        "hint_order": 2,
        "content": "Use watch_time_seconds column."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id, then ORDER BY sum DESC LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_042",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count sessions for each device."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows where device_id is NULL."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY device_id and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_043",
    "hints": [
      {
        "hint_order": 1,
        "content": "Clicks only know impression_id."
      },
      {
        "hint_order": 2,
        "content": "Join recommendation_clicks with recommendation_impressions."
      },
      {
        "hint_order": 3,
        "content": "Count clicks per title_id."
      }
    ]
  },
  {
    "code": "MOVIES_044",
    "hints": [
      {
        "hint_order": 1,
        "content": "Title-category links are in the bridge table."
      },
      {
        "hint_order": 2,
        "content": "Join title_categories with content_categories."
      },
      {
        "hint_order": 3,
        "content": "Count rows per category_name and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_045",
    "hints": [
      {
        "hint_order": 1,
        "content": "Users connect to subscriptions by user_id."
      },
      {
        "hint_order": 2,
        "content": "A subscription can be expired by status or by end date."
      },
      {
        "hint_order": 3,
        "content": "Use OR with subscription_status and current_period_end."
      }
    ]
  },
  {
    "code": "MOVIES_046",
    "hints": [
      {
        "hint_order": 1,
        "content": "Invoices map to subscriptions, then to plans."
      },
      {
        "hint_order": 2,
        "content": "Use only paid invoices for revenue."
      },
      {
        "hint_order": 3,
        "content": "SUM(total_amount) grouped by plan_name."
      }
    ]
  },
  {
    "code": "MOVIES_047",
    "hints": [
      {
        "hint_order": 1,
        "content": "Average completion for each title."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows where title_id is NULL."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY title_id with AVG(completion_percent)."
      }
    ]
  },
  {
    "code": "MOVIES_048",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each watchlist row is one saved title."
      },
      {
        "hint_order": 2,
        "content": "Count rows per profile."
      },
      {
        "hint_order": 3,
        "content": "Sort by count DESC and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_049",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count users by country."
      },
      {
        "hint_order": 2,
        "content": "Group by country first."
      },
      {
        "hint_order": 3,
        "content": "Sort by user_count DESC and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_050",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only rows with an error_code matter."
      },
      {
        "hint_order": 2,
        "content": "Count frequency of each error_code."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY error_code and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_051",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need top titles within each country."
      },
      {
        "hint_order": 2,
        "content": "Count views per country and title first."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() PARTITION BY country."
      }
    ]
  },
  {
    "code": "MOVIES_052",
    "hints": [
      {
        "hint_order": 1,
        "content": "Average completion percent per profile."
      },
      {
        "hint_order": 2,
        "content": "Sort highest averages first."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_053",
    "hints": [
      {
        "hint_order": 1,
        "content": "Buffer time is in playback_events."
      },
      {
        "hint_order": 2,
        "content": "Join playback_events to viewing_sessions to get title_id."
      },
      {
        "hint_order": 3,
        "content": "AVG(buffer_duration_ms) grouped by title_id."
      }
    ]
  },
  {
    "code": "MOVIES_054",
    "hints": [
      {
        "hint_order": 1,
        "content": "Revenue comes from paid invoices."
      },
      {
        "hint_order": 2,
        "content": "Join invoices to subscriptions, then to users."
      },
      {
        "hint_order": 3,
        "content": "SUM(total_amount) grouped by user country."
      }
    ]
  },
  {
    "code": "MOVIES_055",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each search query row is one search event."
      },
      {
        "hint_order": 2,
        "content": "Count searches per profile."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_056",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only actor credits."
      },
      {
        "hint_order": 2,
        "content": "Count how many distinct titles each actor appears in."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(DISTINCT title_id) with GROUP BY person_id."
      }
    ]
  },
  {
    "code": "MOVIES_057",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep completed downloads only."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows where title_id is NULL."
      },
      {
        "hint_order": 3,
        "content": "Count downloads per title and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_058",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group devices by user."
      },
      {
        "hint_order": 2,
        "content": "Count distinct devices for each user."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(DISTINCT id) > 1."
      }
    ]
  },
  {
    "code": "MOVIES_059",
    "hints": [
      {
        "hint_order": 1,
        "content": "A clicked campaign has clicked_at not NULL."
      },
      {
        "hint_order": 2,
        "content": "Count clicks per campaign_id."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY campaign_id and LIMIT 5."
      }
    ]
  },
  {
    "code": "MOVIES_060",
    "hints": [
      {
        "hint_order": 1,
        "content": "Watch time is in viewing_sessions, device type is in devices."
      },
      {
        "hint_order": 2,
        "content": "Join viewing_sessions with devices on device_id."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY device_type with AVG(watch_time_seconds)."
      }
    ]
  },
  {
    "code": "MOVIES_061",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use total revenue per title within each country."
      },
      {
        "hint_order": 2,
        "content": "Group by country and title_id first."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() OVER (PARTITION BY country ...)."
      }
    ]
  },
  {
    "code": "MOVIES_062",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare recent watch time with previous period."
      },
      {
        "hint_order": 2,
        "content": "Create two time windows."
      },
      {
        "hint_order": 3,
        "content": "Use CTEs for last 30 days vs previous 30 days."
      }
    ]
  },
  {
    "code": "MOVIES_063",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find repeat watches by same profile and title."
      },
      {
        "hint_order": 2,
        "content": "Group by profile_id and title_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "MOVIES_064",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need historical and recent averages."
      },
      {
        "hint_order": 2,
        "content": "Compare last 30 days with all-time average."
      },
      {
        "hint_order": 3,
        "content": "Use two CTEs and join on title_id."
      }
    ]
  },
  {
    "code": "MOVIES_065",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only abandoned sessions."
      },
      {
        "hint_order": 2,
        "content": "Focus on episode-level sessions."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) grouped by episode_id."
      }
    ]
  },
  {
    "code": "MOVIES_066",
    "hints": [
      {
        "hint_order": 1,
        "content": "Revenue should come from paid invoices only."
      },
      {
        "hint_order": 2,
        "content": "Find top title per country."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() partitioned by country."
      }
    ]
  },
  {
    "code": "MOVIES_067",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare watch time across two periods."
      },
      {
        "hint_order": 2,
        "content": "Find users with >50% drop."
      },
      {
        "hint_order": 3,
        "content": "Use recent vs previous CTE windows."
      }
    ]
  },
  {
    "code": "MOVIES_068",
    "hints": [
      {
        "hint_order": 1,
        "content": "Check if full season was watched."
      },
      {
        "hint_order": 2,
        "content": "Compare watched episodes with total season episodes."
      },
      {
        "hint_order": 3,
        "content": "Also ensure watch span <= 24 hours."
      }
    ]
  },
  {
    "code": "MOVIES_069",
    "hints": [
      {
        "hint_order": 1,
        "content": "CTR = clicks / impressions."
      },
      {
        "hint_order": 2,
        "content": "Compare control vs experiment variants."
      },
      {
        "hint_order": 3,
        "content": "Use self-join on experiment_id."
      }
    ]
  },
  {
    "code": "MOVIES_070",
    "hints": [
      {
        "hint_order": 1,
        "content": "Same title watched across multiple devices."
      },
      {
        "hint_order": 2,
        "content": "Count distinct device_id per profile-title."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(DISTINCT device_id) > 1."
      }
    ]
  },
  {
    "code": "MOVIES_071",
    "hints": [
      {
        "hint_order": 1,
        "content": "Measure category diversity per profile."
      },
      {
        "hint_order": 2,
        "content": "Join watched titles with title_categories."
      },
      {
        "hint_order": 3,
        "content": "COUNT(DISTINCT category_id) per profile."
      }
    ]
  },
  {
    "code": "MOVIES_072",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use monthly revenue buckets."
      },
      {
        "hint_order": 2,
        "content": "Find top title in each month."
      },
      {
        "hint_order": 3,
        "content": "Use DATE_TRUNC('month', issued_at) + ROW_NUMBER()."
      }
    ]
  },
  {
    "code": "MOVIES_073",
    "hints": [
      {
        "hint_order": 1,
        "content": "Start from clicked recommendation impressions."
      },
      {
        "hint_order": 2,
        "content": "Check whether clicked title was later watched."
      },
      {
        "hint_order": 3,
        "content": "Conversion = converted clicks / total clicks."
      }
    ]
  },
  {
    "code": "MOVIES_074",
    "hints": [
      {
        "hint_order": 1,
        "content": "Need active profiles in every month."
      },
      {
        "hint_order": 2,
        "content": "Count distinct active months."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(DISTINCT month) = 6."
      }
    ]
  },
  {
    "code": "MOVIES_075",
    "hints": [
      {
        "hint_order": 1,
        "content": "LTV = sum of paid invoices."
      },
      {
        "hint_order": 2,
        "content": "Join invoices with subscriptions."
      },
      {
        "hint_order": 3,
        "content": "SUM(total_amount) grouped by user_id."
      }
    ]
  },
  {
    "code": "MOVIES_076",
    "hints": [
      {
        "hint_order": 1,
        "content": "Roll episode sessions up to series level."
      },
      {
        "hint_order": 2,
        "content": "Join episodes -> seasons -> titles."
      },
      {
        "hint_order": 3,
        "content": "AVG(completion_percent) per series title."
      }
    ]
  },
  {
    "code": "MOVIES_077",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count pause events per session first."
      },
      {
        "hint_order": 2,
        "content": "Then average pause counts per title."
      },
      {
        "hint_order": 3,
        "content": "Use playback_events filtered by pause."
      }
    ]
  },
  {
    "code": "MOVIES_078",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look at devices table only."
      },
      {
        "hint_order": 2,
        "content": "Count distinct countries per user."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(DISTINCT country) > 1."
      }
    ]
  },
  {
    "code": "MOVIES_079",
    "hints": [
      {
        "hint_order": 1,
        "content": "CTR comes from notification deliveries."
      },
      {
        "hint_order": 2,
        "content": "clicked_at indicates click happened."
      },
      {
        "hint_order": 3,
        "content": "COUNT(clicked_at) / COUNT(*)."
      }
    ]
  },
  {
    "code": "MOVIES_080",
    "hints": [
      {
        "hint_order": 1,
        "content": "Recommendation clicks need impression join."
      },
      {
        "hint_order": 2,
        "content": "Count distinct row_id per profile."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY profile_id and LIMIT 10."
      }
    ]
  },
  {
    "code": "MOVIES_081",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find subscription span per user."
      },
      {
        "hint_order": 2,
        "content": "Use MIN(started_at) and MAX(current_period_end)."
      },
      {
        "hint_order": 3,
        "content": "Subtract dates to get retention days."
      }
    ]
  },
  {
    "code": "MOVIES_082",
    "hints": [
      {
        "hint_order": 1,
        "content": "Repeat watches by same profile-title pair."
      },
      {
        "hint_order": 2,
        "content": "Group by profile_id and title_id."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "MOVIES_083",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare recent completion vs historical average."
      },
      {
        "hint_order": 2,
        "content": "Use separate aggregates for both periods."
      },
      {
        "hint_order": 3,
        "content": "Sort by biggest drop."
      }
    ]
  },
  {
    "code": "MOVIES_084",
    "hints": [
      {
        "hint_order": 1,
        "content": "Keep only abandoned episode sessions."
      },
      {
        "hint_order": 2,
        "content": "Count by episode_id."
      },
      {
        "hint_order": 3,
        "content": "ORDER BY count DESC LIMIT 10."
      }
    ]
  },
  {
    "code": "MOVIES_085",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find highest revenue title per country."
      },
      {
        "hint_order": 2,
        "content": "Revenue comes from paid invoices."
      },
      {
        "hint_order": 3,
        "content": "Use window ranking by country."
      }
    ]
  },
  {
    "code": "MOVIES_086",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare recent vs previous watch time windows."
      },
      {
        "hint_order": 2,
        "content": "Drop threshold is below 50%."
      },
      {
        "hint_order": 3,
        "content": "Use two CTEs and join on user_id."
      }
    ]
  },
  {
    "code": "MOVIES_087",
    "hints": [
      {
        "hint_order": 1,
        "content": "Need full season completion within 24 hours."
      },
      {
        "hint_order": 2,
        "content": "Compare watched episodes with season total."
      },
      {
        "hint_order": 3,
        "content": "Check MAX(end) <= MIN(start) + 24h."
      }
    ]
  },
  {
    "code": "MOVIES_088",
    "hints": [
      {
        "hint_order": 1,
        "content": "CTR needs control vs variant comparison."
      },
      {
        "hint_order": 2,
        "content": "Aggregate clicks and impressions first."
      },
      {
        "hint_order": 3,
        "content": "Self-join by experiment_id."
      }
    ]
  },
  {
    "code": "MOVIES_089",
    "hints": [
      {
        "hint_order": 1,
        "content": "Check cross-device viewing per title."
      },
      {
        "hint_order": 2,
        "content": "Count distinct devices per profile-title."
      },
      {
        "hint_order": 3,
        "content": "HAVING device count > 1."
      }
    ]
  },
  {
    "code": "MOVIES_090",
    "hints": [
      {
        "hint_order": 1,
        "content": "Measure watched category diversity."
      },
      {
        "hint_order": 2,
        "content": "Join viewing_sessions with title_categories."
      },
      {
        "hint_order": 3,
        "content": "COUNT(DISTINCT category_id)."
      }
    ]
  },
  {
    "code": "MOVIES_091",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find top revenue title per month."
      },
      {
        "hint_order": 2,
        "content": "Group by month and title first."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() partitioned by month."
      }
    ]
  },
  {
    "code": "MOVIES_092",
    "hints": [
      {
        "hint_order": 1,
        "content": "Track click-to-watch conversion."
      },
      {
        "hint_order": 2,
        "content": "Start from clicked impressions."
      },
      {
        "hint_order": 3,
        "content": "Check later watch by same profile and title."
      }
    ]
  },
  {
    "code": "MOVIES_093",
    "hints": [
      {
        "hint_order": 1,
        "content": "Profiles must be active in all 6 months."
      },
      {
        "hint_order": 2,
        "content": "Count distinct active months."
      },
      {
        "hint_order": 3,
        "content": "HAVING count = 6."
      }
    ]
  },
  {
    "code": "MOVIES_094",
    "hints": [
      {
        "hint_order": 1,
        "content": "LTV = sum of paid invoices per user."
      },
      {
        "hint_order": 2,
        "content": "Join invoices with subscriptions."
      },
      {
        "hint_order": 3,
        "content": "Sort by SUM(total_amount) DESC."
      }
    ]
  },
  {
    "code": "MOVIES_095",
    "hints": [
      {
        "hint_order": 1,
        "content": "Series completion uses episode sessions."
      },
      {
        "hint_order": 2,
        "content": "Roll up through seasons."
      },
      {
        "hint_order": 3,
        "content": "AVG(completion_percent) by series title."
      }
    ]
  },
  {
    "code": "MOVIES_096",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count pause events per session first."
      },
      {
        "hint_order": 2,
        "content": "Map session to title."
      },
      {
        "hint_order": 3,
        "content": "AVG(pause_count) per title."
      }
    ]
  },
  {
    "code": "MOVIES_097",
    "hints": [
      {
        "hint_order": 1,
        "content": "Check multi-country device usage."
      },
      {
        "hint_order": 2,
        "content": "Count distinct countries per user."
      },
      {
        "hint_order": 3,
        "content": "HAVING distinct country count > 1."
      }
    ]
  },
  {
    "code": "MOVIES_098",
    "hints": [
      {
        "hint_order": 1,
        "content": "CTR = clicked deliveries / total deliveries."
      },
      {
        "hint_order": 2,
        "content": "Use clicked_at as click indicator."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY campaign_id."
      }
    ]
  },
  {
    "code": "MOVIES_099",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count unique recommendation rows clicked."
      },
      {
        "hint_order": 2,
        "content": "Join clicks with impressions."
      },
      {
        "hint_order": 3,
        "content": "COUNT(DISTINCT row_id) per profile."
      }
    ]
  },
  {
    "code": "MOVIES_100",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find renewed users first."
      },
      {
        "hint_order": 2,
        "content": "Users with more than one subscription."
      },
      {
        "hint_order": 3,
        "content": "Count watched titles for those users."
      }
    ]
  }
];

export const conceptFilters = [
  {
    "code": "MOVIES_001",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "MOVIES_002",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_003",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "MOVIES_004",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_005",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_006",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_007",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_008",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_009",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_010",
    "concepts": [
      "filtering",
      "null_handling",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_011",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_012",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_013",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_014",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_015",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_016",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_017",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_018",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_019",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_020",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_021",
    "concepts": [
      "joins",
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_022",
    "concepts": [
      "joins",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_023",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_024",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_025",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_026",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_027",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_028",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_029",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_030",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_031",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_032",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_033",
    "concepts": [
      "joins",
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_034",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_035",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_036",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_037",
    "concepts": [
      "aggregation",
      "count",
      "average",
      "group_by",
      "subquery",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_038",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_039",
    "concepts": [
      "joins",
      "filtering",
      "distinct",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_040",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_041",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_042",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_043",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_044",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_045",
    "concepts": [
      "joins",
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_046",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_047",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_048",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_049",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_050",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_051",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_052",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_053",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_054",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_055",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_056",
    "concepts": [
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_057",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_058",
    "concepts": [
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_059",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_060",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_061",
    "concepts": [
      "filtering",
      "date_functions",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "trend_analysis",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_062",
    "concepts": [
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "trend_analysis"
    ]
  },
  {
    "code": "MOVIES_063",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_064",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_065",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_066",
    "concepts": [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "arithmetic",
      "calculation",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_067",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_068",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "sum",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_069",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_070",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_071",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_072",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_073",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_074",
    "concepts": [
      "filtering",
      "null_handling",
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "trend_analysis"
    ]
  },
  {
    "code": "MOVIES_075",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_076",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_077",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "date_functions",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_078",
    "concepts": [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "arithmetic",
      "calculation",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_079",
    "concepts": [
      "cte",
      "left_join",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_080",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_081",
    "concepts": [
      "filtering",
      "aggregation",
      "min",
      "max",
      "group_by",
      "date_difference",
      "date_functions",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_082",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "limit",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_083",
    "concepts": [
      "cte",
      "filtering",
      "null_handling",
      "aggregation",
      "average",
      "group_by",
      "joins",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_084",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_085",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_086",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "arithmetic",
      "calculation",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_087",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "count",
      "min",
      "max",
      "group_by",
      "date_difference",
      "date_functions",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_088",
    "concepts": [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_089",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_090",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_091",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "null_handling",
      "date_functions",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "trend_analysis",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_092",
    "concepts": [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "null_handling",
      "arithmetic",
      "calculation",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_093",
    "concepts": [
      "filtering",
      "date_functions",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_094",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_095",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_096",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "count",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "MOVIES_097",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "MOVIES_098",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "arithmetic",
      "calculation",
      "sorting"
    ]
  },
  {
    "code": "MOVIES_099",
    "concepts": [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "MOVIES_100",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "limit",
      "comparison"
    ]
  }
];

export const solutions = [
  {
    "code": "MOVIES_001",
    "approaches": [
      {
        "approach_title": "COUNT rows",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_users FROM users;",
        "explanation": "## Approach\n\nCount all rows in `users`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one platform user.\n- `COUNT(*)` returns the total number of rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the simplest and clearest way to count all users."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_users FROM users;",
        "explanation": "## Approach\n\nCount the primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So it returns the same result as counting rows.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for total row count."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;",
        "explanation": "## Approach\n\nCalculate the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;\n```\n\n## Explanation\n\n- The CTE computes the total once.\n- The outer query selects that result.\n- This pattern is useful when building larger queries.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend later."
      }
    ]
  },
  {
    "code": "MOVIES_002",
    "approaches": [
      {
        "approach_title": "Filter count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_profiles FROM profiles WHERE is_active = true;",
        "explanation": "## Approach\n\nKeep only active profiles, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_profiles\nFROM profiles\nWHERE is_active = true;\n```\n\n## Explanation\n\n- `WHERE is_active = true` filters to active profiles only.\n- `COUNT(*)` counts the filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is explicit and very easy to read."
      },
      {
        "approach_title": "Boolean short",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS active_profiles FROM profiles WHERE is_active;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_profiles\nFROM profiles\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- Only active profiles are counted.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for beginners."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_profiles FROM profiles;",
        "explanation": "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_profiles\nFROM profiles;\n```\n\n## Explanation\n\n- `FILTER` makes `COUNT(*)` include only active rows.\n- This style is useful when computing multiple conditional counts in one query.\n\n## Difference from the optimal approach\n\nFlexible, but not as direct for a single count."
      }
    ]
  },
  {
    "code": "MOVIES_003",
    "approaches": [
      {
        "approach_title": "COUNT titles",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_titles FROM titles;",
        "explanation": "## Approach\n\nCount every row in `titles`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_titles\nFROM titles;\n```\n\n## Explanation\n\n- Each row in `titles` is one catalog title.\n- `COUNT(*)` returns the total number of titles.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is the cleanest way to get the total catalog size."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_titles FROM titles;",
        "explanation": "## Approach\n\nCount the title ids.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_titles\nFROM titles;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is the primary key, this gives the same total.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is more standard for counting rows."
      },
      {
        "approach_title": "Subquery count",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) AS total_titles FROM (SELECT id FROM titles) t;",
        "explanation": "## Approach\n\nSelect title ids first, then count them outside.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_titles\nFROM (\n  SELECT id\n  FROM titles\n) t;\n```\n\n## Explanation\n\n- The inner query returns one row per title.\n- The outer query counts those rows.\n- This can help when you want to add transformations in the inner query later.\n\n## Difference from the optimal approach\n\nMore verbose without adding value here."
      }
    ]
  },
  {
    "code": "MOVIES_004",
    "approaches": [
      {
        "approach_title": "Filter publish",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, title_name, title_type FROM titles WHERE content_status = 'published' ORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter titles to published ones and sort by id.\n\n## Query\n\n```sql\nSELECT id, title_name, title_type\nFROM titles\nWHERE content_status = 'published'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE content_status = 'published'` keeps only published titles.\n- The selected columns match the required output.\n- `ORDER BY id ASC` ensures a stable result order.\n\n## Why this is optimal\n\nIt directly matches the business rule and expected output."
      },
      {
        "approach_title": "IN filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, title_name, title_type FROM titles WHERE content_status IN ('published') ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse `IN` even though there is only one allowed value.\n\n## Query\n\n```sql\nSELECT id, title_name, title_type\nFROM titles\nWHERE content_status IN ('published')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('published')` behaves the same as equality here.\n- It still filters to published titles.\n\n## Difference from the optimal approach\n\nWorks the same, but equality is cleaner for one value."
      },
      {
        "approach_title": "CTE publish",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH published_titles AS (\n  SELECT id, title_name, title_type\n  FROM titles\n  WHERE content_status = 'published'\n)\nSELECT id, title_name, title_type\nFROM published_titles\nORDER BY id ASC;",
        "explanation": "## Approach\n\nPut the published titles in a CTE, then return them.\n\n## Query\n\n```sql\nWITH published_titles AS (\n  SELECT id, title_name, title_type\n  FROM titles\n  WHERE content_status = 'published'\n)\nSELECT id, title_name, title_type\nFROM published_titles\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the filtered set.\n- The outer query handles the final ordering.\n- This is useful if more logic will be added later.\n\n## Difference from the optimal approach\n\nMore flexible, but longer than needed here."
      }
    ]
  },
  {
    "code": "MOVIES_005",
    "approaches": [
      {
        "approach_title": "Filter originals",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, title_name, release_year FROM titles WHERE is_original = true ORDER BY release_year DESC, id ASC;",
        "explanation": "## Approach\n\nKeep only original titles, then sort newest first.\n\n## Query\n\n```sql\nSELECT id, title_name, release_year\nFROM titles\nWHERE is_original = true\nORDER BY release_year DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE is_original = true` filters to platform originals.\n- `ORDER BY release_year DESC` shows newer originals first.\n- `id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nIt is direct, readable, and matches the expected ordering."
      },
      {
        "approach_title": "Boolean short",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, title_name, release_year FROM titles WHERE is_original ORDER BY release_year DESC, id ASC;",
        "explanation": "## Approach\n\nUse boolean shorthand to filter originals.\n\n## Query\n\n```sql\nSELECT id, title_name, release_year\nFROM titles\nWHERE is_original\nORDER BY release_year DESC, id ASC;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_original` means true values only.\n- The rest of the query stays the same.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for learners."
      },
      {
        "approach_title": "CASE sort",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, title_name, release_year FROM titles WHERE is_original = true ORDER BY COALESCE(release_year, 0) DESC, id ASC;",
        "explanation": "## Approach\n\nHandle possible NULL release years during sorting.\n\n## Query\n\n```sql\nSELECT id, title_name, release_year\nFROM titles\nWHERE is_original = true\nORDER BY COALESCE(release_year, 0) DESC, id ASC;\n```\n\n## Explanation\n\n- `COALESCE(release_year, 0)` ensures NULL years sort last.\n- This can be helpful if some originals do not have a release year yet.\n\n## Difference from the optimal approach\n\nSafer for NULLs, but slightly more complex."
      }
    ]
  },
  {
    "code": "MOVIES_006",
    "approaches": [
      {
        "approach_title": "IN qualities",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, plan_name, video_quality, price FROM subscription_plans WHERE video_quality IN ('hd', 'full_hd', 'uhd') ORDER BY price ASC, id ASC;",
        "explanation": "## Approach\n\nFilter plans to HD or better quality levels.\n\n## Query\n\n```sql\nSELECT id, plan_name, video_quality, price\nFROM subscription_plans\nWHERE video_quality IN ('hd', 'full_hd', 'uhd')\nORDER BY price ASC, id ASC;\n```\n\n## Explanation\n\n- `IN` keeps only the allowed quality levels.\n- The selected columns match the required output.\n- Sorting by price makes cheaper qualifying plans appear first.\n\n## Why this is optimal\n\nThis is the clearest way to express a fixed set of allowed values."
      },
      {
        "approach_title": "OR checks",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, plan_name, video_quality, price FROM subscription_plans WHERE video_quality = 'hd' OR video_quality = 'full_hd' OR video_quality = 'uhd' ORDER BY price ASC, id ASC;",
        "explanation": "## Approach\n\nWrite separate comparisons for each quality.\n\n## Query\n\n```sql\nSELECT id, plan_name, video_quality, price\nFROM subscription_plans\nWHERE video_quality = 'hd'\n   OR video_quality = 'full_hd'\n   OR video_quality = 'uhd'\nORDER BY price ASC, id ASC;\n```\n\n## Explanation\n\n- Each `OR` adds another acceptable quality tier.\n- The result is the same as the `IN` version.\n\n## Difference from the optimal approach\n\nCorrect, but longer and harder to scan."
      },
      {
        "approach_title": "CTE plans",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH eligible_plans AS (\n  SELECT id, plan_name, video_quality, price\n  FROM subscription_plans\n  WHERE video_quality IN ('hd', 'full_hd', 'uhd')\n)\nSELECT id, plan_name, video_quality, price\nFROM eligible_plans\nORDER BY price ASC, id ASC;",
        "explanation": "## Approach\n\nStore eligible plans in a CTE, then return them.\n\n## Query\n\n```sql\nWITH eligible_plans AS (\n  SELECT id, plan_name, video_quality, price\n  FROM subscription_plans\n  WHERE video_quality IN ('hd', 'full_hd', 'uhd')\n)\nSELECT id, plan_name, video_quality, price\nFROM eligible_plans\nORDER BY price ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the qualifying plans.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nUseful when extending logic, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_007",
    "approaches": [
      {
        "approach_title": "Type and year",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, title_name, release_year FROM titles WHERE title_type = 'movie' AND release_year > 2020 ORDER BY release_year DESC, id ASC;",
        "explanation": "## Approach\n\nFilter by movie type and release year, then sort newest first.\n\n## Query\n\n```sql\nSELECT id, title_name, release_year\nFROM titles\nWHERE title_type = 'movie'\n  AND release_year > 2020\nORDER BY release_year DESC, id ASC;\n```\n\n## Explanation\n\n- `title_type = 'movie'` keeps only movies.\n- `release_year > 2020` keeps recent releases.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt uses the exact filters needed with no extra complexity."
      },
      {
        "approach_title": "BETWEEN style",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, title_name, release_year FROM titles WHERE title_type = 'movie' AND release_year >= 2021 ORDER BY release_year DESC, id ASC;",
        "explanation": "## Approach\n\nRewrite the year condition using an equivalent boundary.\n\n## Query\n\n```sql\nSELECT id, title_name, release_year\nFROM titles\nWHERE title_type = 'movie'\n  AND release_year >= 2021\nORDER BY release_year DESC, id ASC;\n```\n\n## Explanation\n\n- `release_year >= 2021` means the same as `release_year > 2020`.\n- The movie filter and ordering stay unchanged.\n\n## Difference from the optimal approach\n\nEquivalent result, just expressed a little differently."
      },
      {
        "approach_title": "CTE movies",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH recent_movies AS (\n  SELECT id, title_name, release_year\n  FROM titles\n  WHERE title_type = 'movie'\n    AND release_year > 2020\n)\nSELECT id, title_name, release_year\nFROM recent_movies\nORDER BY release_year DESC, id ASC;",
        "explanation": "## Approach\n\nBuild the filtered movie set first, then return it.\n\n## Query\n\n```sql\nWITH recent_movies AS (\n  SELECT id, title_name, release_year\n  FROM titles\n  WHERE title_type = 'movie'\n    AND release_year > 2020\n)\nSELECT id, title_name, release_year\nFROM recent_movies\nORDER BY release_year DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE captures qualifying movies.\n- The outer query handles the final sort.\n\n## Difference from the optimal approach\n\nLonger, but helpful when the filtered set will be reused."
      }
    ]
  },
  {
    "code": "MOVIES_008",
    "approaches": [
      {
        "approach_title": "Score filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score > 8 ORDER BY imdb_like_score DESC, id ASC;",
        "explanation": "## Approach\n\nKeep titles with score above 8 and sort highest first.\n\n## Query\n\n```sql\nSELECT id, title_name, imdb_like_score\nFROM titles\nWHERE imdb_like_score > 8\nORDER BY imdb_like_score DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE imdb_like_score > 8` filters to high-scoring titles.\n- `ORDER BY imdb_like_score DESC` puts the best scores first.\n- `id ASC` gives deterministic ordering for ties.\n\n## Why this is optimal\n\nIt directly expresses the condition and required sort order."
      },
      {
        "approach_title": "Exclude NULLs",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score IS NOT NULL AND imdb_like_score > 8 ORDER BY imdb_like_score DESC, id ASC;",
        "explanation": "## Approach\n\nExplicitly remove NULL scores before applying the threshold.\n\n## Query\n\n```sql\nSELECT id, title_name, imdb_like_score\nFROM titles\nWHERE imdb_like_score IS NOT NULL\n  AND imdb_like_score > 8\nORDER BY imdb_like_score DESC, id ASC;\n```\n\n## Explanation\n\n- The `IS NOT NULL` check makes the intent explicit.\n- In practice, `imdb_like_score > 8` already excludes NULL values.\n\n## Difference from the optimal approach\n\nMore explicit, but redundant."
      },
      {
        "approach_title": "Subquery score",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, title_name, imdb_like_score FROM (SELECT id, title_name, imdb_like_score FROM titles WHERE imdb_like_score > 8) t ORDER BY imdb_like_score DESC, id ASC;",
        "explanation": "## Approach\n\nFilter in a subquery and sort outside.\n\n## Query\n\n```sql\nSELECT id, title_name, imdb_like_score\nFROM (\n  SELECT id, title_name, imdb_like_score\n  FROM titles\n  WHERE imdb_like_score > 8\n) t\nORDER BY imdb_like_score DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query builds the qualifying title set.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nValid, but more verbose than necessary."
      }
    ]
  },
  {
    "code": "MOVIES_009",
    "approaches": [
      {
        "approach_title": "Status filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, profile_id, device_id, download_status FROM downloads WHERE download_status = 'completed' ORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter downloads to completed ones and sort by id.\n\n## Query\n\n```sql\nSELECT id, profile_id, device_id, download_status\nFROM downloads\nWHERE download_status = 'completed'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE download_status = 'completed'` keeps only finished downloads.\n- The selected columns match the expected result.\n- `ORDER BY id ASC` ensures stable ordering.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to return completed downloads."
      },
      {
        "approach_title": "IN status",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, profile_id, device_id, download_status FROM downloads WHERE download_status IN ('completed') ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse `IN` with a single allowed status.\n\n## Query\n\n```sql\nSELECT id, profile_id, device_id, download_status\nFROM downloads\nWHERE download_status IN ('completed')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `IN ('completed')` is equivalent to equality here.\n- It still filters to only completed downloads.\n\n## Difference from the optimal approach\n\nWorks fine, but equality is more straightforward."
      },
      {
        "approach_title": "CTE downloads",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_downloads AS (\n  SELECT id, profile_id, device_id, download_status\n  FROM downloads\n  WHERE download_status = 'completed'\n)\nSELECT id, profile_id, device_id, download_status\nFROM completed_downloads\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore completed downloads in a CTE, then select from it.\n\n## Query\n\n```sql\nWITH completed_downloads AS (\n  SELECT id, profile_id, device_id, download_status\n  FROM downloads\n  WHERE download_status = 'completed'\n)\nSELECT id, profile_id, device_id, download_status\nFROM completed_downloads\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE defines the filtered download set.\n- The outer query returns it in the expected order.\n\n## Difference from the optimal approach\n\nGood for extension, but longer than needed."
      }
    ]
  },
  {
    "code": "MOVIES_010",
    "approaches": [
      {
        "approach_title": "Sort and limit",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, title_name, critic_score FROM titles WHERE critic_score IS NOT NULL ORDER BY critic_score DESC, id ASC LIMIT 5;",
        "explanation": "## Approach\n\nRemove NULL scores, sort highest first, and keep the top 5.\n\n## Query\n\n```sql\nSELECT id, title_name, critic_score\nFROM titles\nWHERE critic_score IS NOT NULL\nORDER BY critic_score DESC, id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `critic_score IS NOT NULL` keeps only titles with a score.\n- `ORDER BY critic_score DESC` ranks highest scores first.\n- `LIMIT 5` returns only the top 5 titles.\n- `id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nThis is the cleanest way to answer a top-N ranking question."
      },
      {
        "approach_title": "Subquery top",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, title_name, critic_score FROM (SELECT id, title_name, critic_score FROM titles WHERE critic_score IS NOT NULL ORDER BY critic_score DESC, id ASC LIMIT 5) t ORDER BY critic_score DESC, id ASC;",
        "explanation": "## Approach\n\nGet the top 5 in a subquery, then return them.\n\n## Query\n\n```sql\nSELECT id, title_name, critic_score\nFROM (\n  SELECT id, title_name, critic_score\n  FROM titles\n  WHERE critic_score IS NOT NULL\n  ORDER BY critic_score DESC, id ASC\n  LIMIT 5\n) t\nORDER BY critic_score DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query finds the top 5 scored titles.\n- The outer query returns them in the same order.\n\n## Difference from the optimal approach\n\nCorrect, but adds an unnecessary layer."
      },
      {
        "approach_title": "Rank window",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, title_name, critic_score FROM (SELECT id, title_name, critic_score, ROW_NUMBER() OVER (ORDER BY critic_score DESC, id ASC) AS rn FROM titles WHERE critic_score IS NOT NULL) ranked WHERE rn <= 5 ORDER BY critic_score DESC, id ASC;",
        "explanation": "## Approach\n\nAssign row numbers by score and keep the first 5.\n\n## Query\n\n```sql\nSELECT id, title_name, critic_score\nFROM (\n  SELECT id, title_name, critic_score,\n         ROW_NUMBER() OVER (ORDER BY critic_score DESC, id ASC) AS rn\n  FROM titles\n  WHERE critic_score IS NOT NULL\n) ranked\nWHERE rn <= 5\nORDER BY critic_score DESC, id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` ranks titles by critic score.\n- `WHERE rn <= 5` keeps the first five ranked rows.\n- This pattern is useful when top-N logic becomes more complex.\n\n## Difference from the optimal approach\n\nMore powerful, but unnecessary for a simple top 5."
      }
    ]
  },
  {
    "code": "MOVIES_011",
    "approaches": [
      {
        "approach_title": "GROUP count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_type, COUNT(*) AS total_titles FROM titles GROUP BY title_type ORDER BY total_titles DESC, title_type ASC;",
        "explanation": "## Approach\n\nGroup rows by `title_type`, then count titles in each group.\n\n## Query\n\n```sql\nSELECT title_type, COUNT(*) AS total_titles\nFROM titles\nGROUP BY title_type\nORDER BY total_titles DESC, title_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY title_type` creates one group per title type.\n- `COUNT(*)` counts titles in each group.\n- The result is sorted by count descending, then title type ascending.\n\n## Why this is optimal\n\nIt is the most direct way to calculate counts per type."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT title_type, COUNT(id) AS total_titles FROM titles GROUP BY title_type ORDER BY total_titles DESC, title_type ASC;",
        "explanation": "## Approach\n\nGroup by title type and count the primary key.\n\n## Query\n\n```sql\nSELECT title_type, COUNT(id) AS total_titles\nFROM titles\nGROUP BY title_type\nORDER BY total_titles DESC, title_type ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids within each title type.\n- Since `id` is a primary key, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works the same, but `COUNT(*)` is more standard for row counts."
      },
      {
        "approach_title": "CTE types",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH type_counts AS (\n  SELECT title_type, COUNT(*) AS total_titles\n  FROM titles\n  GROUP BY title_type\n)\nSELECT title_type, total_titles\nFROM type_counts\nORDER BY total_titles DESC, title_type ASC;",
        "explanation": "## Approach\n\nCompute type counts in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH type_counts AS (\n  SELECT title_type, COUNT(*) AS total_titles\n  FROM titles\n  GROUP BY title_type\n)\nSELECT title_type, total_titles\nFROM type_counts\nORDER BY total_titles DESC, title_type ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per title type.\n- The outer query returns those rows in the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if you want to build on the grouped result."
      }
    ]
  },
  {
    "code": "MOVIES_012",
    "approaches": [
      {
        "approach_title": "Group profiles",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id ORDER BY profile_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nGroup profiles by user and count rows in each group.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS profile_count\nFROM profiles\nGROUP BY user_id\nORDER BY profile_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one group per user.\n- `COUNT(*)` counts how many profiles each user has.\n- The output is sorted by profile count descending.\n\n## Why this is optimal\n\nIt directly answers the question with a single grouping step."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id, COUNT(id) AS profile_count FROM profiles GROUP BY user_id ORDER BY profile_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nCount profile ids for each user.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(id) AS profile_count\nFROM profiles\nGROUP BY user_id\nORDER BY profile_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL profile ids in each user group.\n- Since `id` is never NULL, it matches row count.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is simpler."
      },
      {
        "approach_title": "User join",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT u.id AS user_id, COUNT(p.id) AS profile_count FROM users u JOIN profiles p ON u.id = p.user_id GROUP BY u.id ORDER BY profile_count DESC, u.id ASC;",
        "explanation": "## Approach\n\nJoin users to profiles, then count profiles per user.\n\n## Query\n\n```sql\nSELECT u.id AS user_id, COUNT(p.id) AS profile_count\nFROM users u\nJOIN profiles p ON u.id = p.user_id\nGROUP BY u.id\nORDER BY profile_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The join connects each profile to its user.\n- Grouping by user id gives one row per user.\n- `COUNT(p.id)` counts matched profiles.\n\n## Difference from the optimal approach\n\nUseful when you also need user columns, but the join is unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_013",
    "approaches": [
      {
        "approach_title": "Group language",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT original_language, COUNT(*) AS total_titles FROM titles GROUP BY original_language ORDER BY total_titles DESC, original_language ASC;",
        "explanation": "## Approach\n\nGroup titles by original language and count each group.\n\n## Query\n\n```sql\nSELECT original_language, COUNT(*) AS total_titles\nFROM titles\nGROUP BY original_language\nORDER BY total_titles DESC, original_language ASC;\n```\n\n## Explanation\n\n- `GROUP BY original_language` creates one group per language.\n- `COUNT(*)` returns the number of titles in each group.\n- Sorting shows the biggest language groups first.\n\n## Why this is optimal\n\nIt is the cleanest way to calculate counts per language."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT original_language, COUNT(id) AS total_titles FROM titles GROUP BY original_language ORDER BY total_titles DESC, original_language ASC;",
        "explanation": "## Approach\n\nGroup by language and count title ids.\n\n## Query\n\n```sql\nSELECT original_language, COUNT(id) AS total_titles\nFROM titles\nGROUP BY original_language\nORDER BY total_titles DESC, original_language ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL title ids within each language group.\n- Since ids are never NULL, the result matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nSame result, but slightly less direct."
      },
      {
        "approach_title": "CTE lang",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH language_counts AS (\n  SELECT original_language, COUNT(*) AS total_titles\n  FROM titles\n  GROUP BY original_language\n)\nSELECT original_language, total_titles\nFROM language_counts\nORDER BY total_titles DESC, original_language ASC;",
        "explanation": "## Approach\n\nCalculate title counts per language in a CTE.\n\n## Query\n\n```sql\nWITH language_counts AS (\n  SELECT original_language, COUNT(*) AS total_titles\n  FROM titles\n  GROUP BY original_language\n)\nSELECT original_language, total_titles\nFROM language_counts\nORDER BY total_titles DESC, original_language ASC;\n```\n\n## Explanation\n\n- The CTE holds the grouped result.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nLonger, but easier to extend if more logic is needed."
      }
    ]
  },
  {
    "code": "MOVIES_014",
    "approaches": [
      {
        "approach_title": "AVG runtime",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes FROM titles WHERE title_type = 'movie' AND runtime_minutes IS NOT NULL;",
        "explanation": "## Approach\n\nFilter to movies with runtime values, then average the runtime.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes\nFROM titles\nWHERE title_type = 'movie'\n  AND runtime_minutes IS NOT NULL;\n```\n\n## Explanation\n\n- `title_type = 'movie'` keeps only movie titles.\n- `runtime_minutes IS NOT NULL` excludes missing runtimes.\n- `AVG(runtime_minutes)` calculates the average.\n- `ROUND(..., 2)` matches the expected output style.\n\n## Why this is optimal\n\nIt is the most direct way to compute the average movie runtime."
      },
      {
        "approach_title": "AVG only",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes FROM titles WHERE title_type = 'movie';",
        "explanation": "## Approach\n\nAverage runtimes for movies without an explicit NULL check.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes\nFROM titles\nWHERE title_type = 'movie';\n```\n\n## Explanation\n\n- `AVG()` automatically ignores NULL values.\n- So this gives the same result in PostgreSQL.\n\n## Difference from the optimal approach\n\nShorter, but less explicit about ignoring missing runtime values."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH movie_runtimes AS (\n  SELECT runtime_minutes\n  FROM titles\n  WHERE title_type = 'movie' AND runtime_minutes IS NOT NULL\n)\nSELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes\nFROM movie_runtimes;",
        "explanation": "## Approach\n\nCollect movie runtimes in a CTE, then average them.\n\n## Query\n\n```sql\nWITH movie_runtimes AS (\n  SELECT runtime_minutes\n  FROM titles\n  WHERE title_type = 'movie'\n    AND runtime_minutes IS NOT NULL\n)\nSELECT ROUND(AVG(runtime_minutes), 2) AS avg_runtime_minutes\nFROM movie_runtimes;\n```\n\n## Explanation\n\n- The CTE isolates the relevant runtime values.\n- The outer query computes the average of those values.\n\n## Difference from the optimal approach\n\nMore verbose, but reusable in larger queries."
      }
    ]
  },
  {
    "code": "MOVIES_015",
    "approaches": [
      {
        "approach_title": "Count active",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_subscriptions FROM subscriptions WHERE subscription_status = 'active';",
        "explanation": "## Approach\n\nFilter subscriptions to active ones, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_subscriptions\nFROM subscriptions\nWHERE subscription_status = 'active';\n```\n\n## Explanation\n\n- `WHERE subscription_status = 'active'` keeps only active subscriptions.\n- `COUNT(*)` returns how many rows remain.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt directly answers the question in the simplest form."
      },
      {
        "approach_title": "FILTER agg",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE subscription_status = 'active') AS active_subscriptions FROM subscriptions;",
        "explanation": "## Approach\n\nApply the condition inside the aggregate using `FILTER`.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE subscription_status = 'active') AS active_subscriptions\nFROM subscriptions;\n```\n\n## Explanation\n\n- `FILTER` makes the count include only active rows.\n- This style is useful when computing multiple status counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric."
      },
      {
        "approach_title": "CTE active",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH active_subs AS (\n  SELECT COUNT(*) AS active_subscriptions\n  FROM subscriptions\n  WHERE subscription_status = 'active'\n)\nSELECT active_subscriptions\nFROM active_subs;",
        "explanation": "## Approach\n\nCalculate the active subscription count in a CTE.\n\n## Query\n\n```sql\nWITH active_subs AS (\n  SELECT COUNT(*) AS active_subscriptions\n  FROM subscriptions\n  WHERE subscription_status = 'active'\n)\nSELECT active_subscriptions\nFROM active_subs;\n```\n\n## Explanation\n\n- The CTE computes the filtered count once.\n- The outer query returns that result.\n\n## Difference from the optimal approach\n\nLonger, but useful when the count feeds other steps."
      }
    ]
  },
  {
    "code": "MOVIES_016",
    "approaches": [
      {
        "approach_title": "HAVING count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY profile_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nGroup profiles by user, then keep only groups with more than one profile.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS profile_count\nFROM profiles\nGROUP BY user_id\nHAVING COUNT(*) > 1\nORDER BY profile_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one group per user.\n- `COUNT(*)` counts profiles inside each group.\n- `HAVING COUNT(*) > 1` keeps only users with multiple profiles.\n\n## Why this is optimal\n\nThis is the standard and clearest pattern for filtering grouped results."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id, COUNT(id) AS profile_count FROM profiles GROUP BY user_id HAVING COUNT(id) > 1 ORDER BY profile_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nCount profile ids per user and filter grouped results.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(id) AS profile_count\nFROM profiles\nGROUP BY user_id\nHAVING COUNT(id) > 1\nORDER BY profile_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL profile ids.\n- Since `id` is never NULL, it behaves like row count here.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is simpler for counting rows."
      },
      {
        "approach_title": "CTE users",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH profile_counts AS (\n  SELECT user_id, COUNT(*) AS profile_count\n  FROM profiles\n  GROUP BY user_id\n)\nSELECT user_id, profile_count\nFROM profile_counts\nWHERE profile_count > 1\nORDER BY profile_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nFirst compute profile counts, then filter them outside.\n\n## Query\n\n```sql\nWITH profile_counts AS (\n  SELECT user_id, COUNT(*) AS profile_count\n  FROM profiles\n  GROUP BY user_id\n)\nSELECT user_id, profile_count\nFROM profile_counts\nWHERE profile_count > 1\nORDER BY profile_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per user with a count.\n- The outer query filters to counts greater than 1.\n\n## Difference from the optimal approach\n\nEasier to read in steps, but more verbose."
      }
    ]
  },
  {
    "code": "MOVIES_017",
    "approaches": [
      {
        "approach_title": "Group ratings",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, COUNT(*) AS ratings_count FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY ratings_count DESC, title_id ASC;",
        "explanation": "## Approach\n\nKeep only title ratings, then count ratings per title.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(*) AS ratings_count\nFROM ratings\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY ratings_count DESC, title_id ASC;\n```\n\n## Explanation\n\n- `title_id IS NOT NULL` removes episode-level ratings.\n- `GROUP BY title_id` creates one group per title.\n- `COUNT(*)` returns the number of ratings per title.\n\n## Why this is optimal\n\nIt cleanly separates title ratings from episode ratings and counts them."
      },
      {
        "approach_title": "COUNT values",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT title_id, COUNT(rating_value) AS ratings_count FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY ratings_count DESC, title_id ASC;",
        "explanation": "## Approach\n\nCount the rating values instead of rows.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(rating_value) AS ratings_count\nFROM ratings\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY ratings_count DESC, title_id ASC;\n```\n\n## Explanation\n\n- `COUNT(rating_value)` counts non-NULL rating values.\n- Since ratings should have a value, this matches the row count.\n\n## Difference from the optimal approach\n\nIt works, but counting rows is more direct."
      },
      {
        "approach_title": "CTE rated",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH title_ratings AS (\n  SELECT title_id, COUNT(*) AS ratings_count\n  FROM ratings\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, ratings_count\nFROM title_ratings\nORDER BY ratings_count DESC, title_id ASC;",
        "explanation": "## Approach\n\nBuild title rating counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH title_ratings AS (\n  SELECT title_id, COUNT(*) AS ratings_count\n  FROM ratings\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, ratings_count\nFROM title_ratings\nORDER BY ratings_count DESC, title_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one count row per title.\n- The outer query returns them in ranked order.\n\n## Difference from the optimal approach\n\nMore flexible, but longer than needed here."
      }
    ]
  },
  {
    "code": "MOVIES_018",
    "approaches": [
      {
        "approach_title": "Group device",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT device_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY device_id ORDER BY completed_downloads DESC, device_id ASC;",
        "explanation": "## Approach\n\nFilter to completed downloads and count them per device.\n\n## Query\n\n```sql\nSELECT device_id, COUNT(*) AS completed_downloads\nFROM downloads\nWHERE download_status = 'completed'\nGROUP BY device_id\nORDER BY completed_downloads DESC, device_id ASC;\n```\n\n## Explanation\n\n- `WHERE download_status = 'completed'` keeps only finished downloads.\n- `GROUP BY device_id` creates one group per device.\n- `COUNT(*)` counts completed downloads for each device.\n\n## Why this is optimal\n\nIt directly computes the required grouped metric."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT device_id, COUNT(id) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY device_id ORDER BY completed_downloads DESC, device_id ASC;",
        "explanation": "## Approach\n\nCount download ids for each device after filtering.\n\n## Query\n\n```sql\nSELECT device_id, COUNT(id) AS completed_downloads\nFROM downloads\nWHERE download_status = 'completed'\nGROUP BY device_id\nORDER BY completed_downloads DESC, device_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL download ids.\n- Since ids are never NULL, this equals row count.\n\n## Difference from the optimal approach\n\nSame result, but slightly less direct."
      },
      {
        "approach_title": "CTE done",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH device_downloads AS (\n  SELECT device_id, COUNT(*) AS completed_downloads\n  FROM downloads\n  WHERE download_status = 'completed'\n  GROUP BY device_id\n)\nSELECT device_id, completed_downloads\nFROM device_downloads\nORDER BY completed_downloads DESC, device_id ASC;",
        "explanation": "## Approach\n\nFirst compute completed download counts per device.\n\n## Query\n\n```sql\nWITH device_downloads AS (\n  SELECT device_id, COUNT(*) AS completed_downloads\n  FROM downloads\n  WHERE download_status = 'completed'\n  GROUP BY device_id\n)\nSELECT device_id, completed_downloads\nFROM device_downloads\nORDER BY completed_downloads DESC, device_id ASC;\n```\n\n## Explanation\n\n- The CTE stores the grouped download counts.\n- The outer query sorts those results.\n\n## Difference from the optimal approach\n\nMore steps than needed, but easier to extend."
      }
    ]
  },
  {
    "code": "MOVIES_019",
    "approaches": [
      {
        "approach_title": "AVG title",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_rating DESC, title_id ASC;",
        "explanation": "## Approach\n\nKeep title ratings only, then average the rating values per title.\n\n## Query\n\n```sql\nSELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating\nFROM ratings\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY avg_rating DESC, title_id ASC;\n```\n\n## Explanation\n\n- `title_id IS NOT NULL` excludes episode ratings.\n- `AVG(rating_value)` computes the average rating for each title.\n- `ROUND(..., 2)` formats the result to two decimals.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to calculate average rating per title."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_avg AS (\n  SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating\n  FROM ratings\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, avg_rating\nFROM title_avg\nORDER BY avg_rating DESC, title_id ASC;",
        "explanation": "## Approach\n\nCompute title averages in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH title_avg AS (\n  SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating\n  FROM ratings\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, avg_rating\nFROM title_avg\nORDER BY avg_rating DESC, title_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per title with its average rating.\n- The outer query returns them in ranked order.\n\n## Difference from the optimal approach\n\nMore structured, but not necessary for this simple query."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, avg_rating FROM (SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM ratings WHERE title_id IS NOT NULL GROUP BY title_id) t ORDER BY avg_rating DESC, title_id ASC;",
        "explanation": "## Approach\n\nCalculate title averages in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT title_id, avg_rating\nFROM (\n  SELECT title_id, ROUND(AVG(rating_value), 2) AS avg_rating\n  FROM ratings\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n) t\nORDER BY avg_rating DESC, title_id ASC;\n```\n\n## Explanation\n\n- The inner query builds the grouped average.\n- The outer query applies the required ordering.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than the single-query version."
      }
    ]
  },
  {
    "code": "MOVIES_020",
    "approaches": [
      {
        "approach_title": "Group limit",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, COUNT(*) AS watchlist_adds FROM watchlists GROUP BY title_id ORDER BY watchlist_adds DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount watchlist rows per title, sort by count, then keep the top 5.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(*) AS watchlist_adds\nFROM watchlists\nGROUP BY title_id\nORDER BY watchlist_adds DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Each row in `watchlists` means one title was added by one profile.\n- Grouping by `title_id` counts total adds for each title.\n- `ORDER BY ... DESC` ranks most-added titles first.\n- `LIMIT 5` keeps only the top 5.\n\n## Why this is optimal\n\nIt is the simplest way to answer a top-N grouped count question."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT title_id, COUNT(id) AS watchlist_adds FROM watchlists GROUP BY title_id ORDER BY watchlist_adds DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount watchlist ids per title and rank the result.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(id) AS watchlist_adds\nFROM watchlists\nGROUP BY title_id\nORDER BY watchlist_adds DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL watchlist row ids.\n- Because `id` is always present, it matches row count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "Rank top",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, watchlist_adds FROM (SELECT title_id, COUNT(*) AS watchlist_adds, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, title_id ASC) AS rn FROM watchlists GROUP BY title_id) ranked WHERE rn <= 5 ORDER BY watchlist_adds DESC, title_id ASC;",
        "explanation": "## Approach\n\nCount per title, assign row numbers, then keep the first 5.\n\n## Query\n\n```sql\nSELECT title_id, watchlist_adds\nFROM (\n  SELECT title_id,\n         COUNT(*) AS watchlist_adds,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, title_id ASC) AS rn\n  FROM watchlists\n  GROUP BY title_id\n) ranked\nWHERE rn <= 5\nORDER BY watchlist_adds DESC, title_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes add counts per title.\n- `ROW_NUMBER()` ranks titles by that count.\n- The outer query keeps the first 5 rows.\n\n## Difference from the optimal approach\n\nMore powerful for advanced ranking logic, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_021",
    "approaches": [
      {
        "approach_title": "Inner join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.email, sp.plan_name FROM users u JOIN subscriptions s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nJoin users to subscriptions and plans, then keep active subscriptions only.\n\n## Query\n\n```sql\nSELECT u.id, u.email, sp.plan_name\nFROM users u\nJOIN subscriptions s ON u.id = s.user_id\nJOIN subscription_plans sp ON s.plan_id = sp.id\nWHERE s.subscription_status = 'active'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `users` gives the account details.\n- `subscriptions` links each user to their subscription records.\n- `subscription_plans` gives the plan name.\n- `WHERE s.subscription_status = 'active'` keeps only active plans.\n- The selected columns match the expected output.\n\n## Why this is optimal\n\nIt directly connects the three required tables and applies the filter in the clearest way."
      },
      {
        "approach_title": "CTE active",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_subscriptions AS (\n  SELECT user_id, plan_id\n  FROM subscriptions\n  WHERE subscription_status = 'active'\n)\nSELECT u.id, u.email, sp.plan_name\nFROM users u\nJOIN active_subscriptions a ON u.id = a.user_id\nJOIN subscription_plans sp ON a.plan_id = sp.id\nORDER BY u.id ASC;",
        "explanation": "## Approach\n\nFirst isolate active subscriptions, then join to users and plans.\n\n## Query\n\n```sql\nWITH active_subscriptions AS (\n  SELECT user_id, plan_id\n  FROM subscriptions\n  WHERE subscription_status = 'active'\n)\nSELECT u.id, u.email, sp.plan_name\nFROM users u\nJOIN active_subscriptions a ON u.id = a.user_id\nJOIN subscription_plans sp ON a.plan_id = sp.id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only active subscription rows.\n- The outer query joins those rows to users and plan names.\n- This can make the query easier to read in steps.\n\n## Difference from the optimal approach\n\nIt is more structured, but longer than needed for this case."
      },
      {
        "approach_title": "Subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT u.id, u.email, sp.plan_name FROM users u JOIN (SELECT user_id, plan_id FROM subscriptions WHERE subscription_status = 'active') s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUse a filtered subquery for active subscriptions before joining.\n\n## Query\n\n```sql\nSELECT u.id, u.email, sp.plan_name\nFROM users u\nJOIN (\n  SELECT user_id, plan_id\n  FROM subscriptions\n  WHERE subscription_status = 'active'\n) s ON u.id = s.user_id\nJOIN subscription_plans sp ON s.plan_id = sp.id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery returns only active subscriptions.\n- The remaining joins fetch user email and plan name.\n- The final order is by user id.\n\n## Difference from the optimal approach\n\nIt works, but the plain join version is shorter and easier to scan."
      }
    ]
  },
  {
    "code": "MOVIES_022",
    "approaches": [
      {
        "approach_title": "Bridge join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.id, t.title_name, c.category_name FROM titles t JOIN title_categories tc ON t.id = tc.title_id JOIN content_categories c ON tc.category_id = c.id ORDER BY t.id ASC, c.category_name ASC;",
        "explanation": "## Approach\n\nJoin titles to categories through the bridge table.\n\n## Query\n\n```sql\nSELECT t.id, t.title_name, c.category_name\nFROM titles t\nJOIN title_categories tc ON t.id = tc.title_id\nJOIN content_categories c ON tc.category_id = c.id\nORDER BY t.id ASC, c.category_name ASC;\n```\n\n## Explanation\n\n- `title_categories` is the bridge table between titles and categories.\n- Joining through it returns the category names for each title.\n- Sorting by title id and category name gives a stable result.\n\n## Why this is optimal\n\nThis is the standard and clearest many-to-many join pattern."
      },
      {
        "approach_title": "CTE mapped",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_category_map AS (\n  SELECT tc.title_id, c.category_name\n  FROM title_categories tc\n  JOIN content_categories c ON tc.category_id = c.id\n)\nSELECT t.id, t.title_name, m.category_name\nFROM titles t\nJOIN title_category_map m ON t.id = m.title_id\nORDER BY t.id ASC, m.category_name ASC;",
        "explanation": "## Approach\n\nBuild the title-category mapping first, then join it to titles.\n\n## Query\n\n```sql\nWITH title_category_map AS (\n  SELECT tc.title_id, c.category_name\n  FROM title_categories tc\n  JOIN content_categories c ON tc.category_id = c.id\n)\nSELECT t.id, t.title_name, m.category_name\nFROM titles t\nJOIN title_category_map m ON t.id = m.title_id\nORDER BY t.id ASC, m.category_name ASC;\n```\n\n## Explanation\n\n- The CTE resolves category names for each title id.\n- The outer query adds title details.\n- This can help when the mapping is reused later.\n\n## Difference from the optimal approach\n\nClear, but it adds an extra layer for a simple join."
      },
      {
        "approach_title": "From bridge",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT t.id, t.title_name, c.category_name FROM title_categories tc JOIN titles t ON tc.title_id = t.id JOIN content_categories c ON tc.category_id = c.id ORDER BY t.id ASC, c.category_name ASC;",
        "explanation": "## Approach\n\nStart from the bridge table and join out to titles and categories.\n\n## Query\n\n```sql\nSELECT t.id, t.title_name, c.category_name\nFROM title_categories tc\nJOIN titles t ON tc.title_id = t.id\nJOIN content_categories c ON tc.category_id = c.id\nORDER BY t.id ASC, c.category_name ASC;\n```\n\n## Explanation\n\n- The bridge table already holds the relationship pairs.\n- Joining to `titles` and `content_categories` adds readable values.\n- The result is the same as the optimal query.\n\n## Difference from the optimal approach\n\nEqually valid, but starting from titles is a bit more intuitive for learners."
      }
    ]
  },
  {
    "code": "MOVIES_023",
    "approaches": [
      {
        "approach_title": "Group episodes",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT season_id, COUNT(*) AS episode_count FROM episodes GROUP BY season_id ORDER BY episode_count DESC, season_id ASC;",
        "explanation": "## Approach\n\nGroup episodes by season and count them.\n\n## Query\n\n```sql\nSELECT season_id, COUNT(*) AS episode_count\nFROM episodes\nGROUP BY season_id\nORDER BY episode_count DESC, season_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY season_id` creates one group per season.\n- `COUNT(*)` returns the number of episodes in each season.\n- The result is sorted by episode count descending.\n\n## Why this is optimal\n\nIt is the simplest grouped count query for this requirement."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT season_id, COUNT(id) AS episode_count FROM episodes GROUP BY season_id ORDER BY episode_count DESC, season_id ASC;",
        "explanation": "## Approach\n\nGroup by season and count episode ids.\n\n## Query\n\n```sql\nSELECT season_id, COUNT(id) AS episode_count\nFROM episodes\nGROUP BY season_id\nORDER BY episode_count DESC, season_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids in each season group.\n- Since `id` is never NULL, this matches row count.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE seasons",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH season_episode_counts AS (\n  SELECT season_id, COUNT(*) AS episode_count\n  FROM episodes\n  GROUP BY season_id\n)\nSELECT season_id, episode_count\nFROM season_episode_counts\nORDER BY episode_count DESC, season_id ASC;",
        "explanation": "## Approach\n\nCompute episode counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH season_episode_counts AS (\n  SELECT season_id, COUNT(*) AS episode_count\n  FROM episodes\n  GROUP BY season_id\n)\nSELECT season_id, episode_count\nFROM season_episode_counts\nORDER BY episode_count DESC, season_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one count row per season.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nUseful in larger queries, but longer than necessary here."
      }
    ]
  },
  {
    "code": "MOVIES_024",
    "approaches": [
      {
        "approach_title": "Group sessions",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, COUNT(*) AS session_count FROM viewing_sessions GROUP BY profile_id ORDER BY session_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nGroup viewing sessions by profile and count them.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(*) AS session_count\nFROM viewing_sessions\nGROUP BY profile_id\nORDER BY session_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY profile_id` creates one group per profile.\n- `COUNT(*)` counts sessions in each group.\n- Sorting ranks the most active profiles first.\n\n## Why this is optimal\n\nThis directly measures session totals per profile with no extra steps."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT profile_id, COUNT(id) AS session_count FROM viewing_sessions GROUP BY profile_id ORDER BY session_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCount session ids for each profile.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(id) AS session_count\nFROM viewing_sessions\nGROUP BY profile_id\nORDER BY session_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL session ids.\n- Since ids are always present, this matches row count.\n\n## Difference from the optimal approach\n\nSame result, but not as direct as `COUNT(*)`."
      },
      {
        "approach_title": "CTE sessions",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH profile_sessions AS (\n  SELECT profile_id, COUNT(*) AS session_count\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, session_count\nFROM profile_sessions\nORDER BY session_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nBuild profile session counts first, then return them.\n\n## Query\n\n```sql\nWITH profile_sessions AS (\n  SELECT profile_id, COUNT(*) AS session_count\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, session_count\nFROM profile_sessions\nORDER BY session_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per profile with its session total.\n- The outer query handles ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if the grouped result is reused."
      }
    ]
  },
  {
    "code": "MOVIES_025",
    "approaches": [
      {
        "approach_title": "Top views",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, COUNT(*) AS total_views FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY total_views DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount viewing sessions per title, then keep the top 5.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(*) AS total_views\nFROM viewing_sessions\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY total_views DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `title_id IS NOT NULL` keeps only title-level sessions.\n- `GROUP BY title_id` counts sessions for each title.\n- `ORDER BY total_views DESC` ranks the most watched titles first.\n- `LIMIT 5` returns only the top five.\n\n## Why this is optimal\n\nIt is the clearest top-N grouped count query for title views."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT title_id, COUNT(id) AS total_views FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY total_views DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount session ids for each title and rank them.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(id) AS total_views\nFROM viewing_sessions\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY total_views DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL session ids.\n- Because session ids always exist, it gives the same result.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more standard for row counts."
      },
      {
        "approach_title": "Rank views",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, total_views FROM (SELECT title_id, COUNT(*) AS total_views, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, title_id ASC) AS rn FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) ranked WHERE rn <= 5 ORDER BY total_views DESC, title_id ASC;",
        "explanation": "## Approach\n\nCount views per title, rank them, then keep the first five.\n\n## Query\n\n```sql\nSELECT title_id, total_views\nFROM (\n  SELECT title_id,\n         COUNT(*) AS total_views,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, title_id ASC) AS rn\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n) ranked\nWHERE rn <= 5\nORDER BY total_views DESC, title_id ASC;\n```\n\n## Explanation\n\n- The inner query counts sessions for each title.\n- `ROW_NUMBER()` creates a ranking by view count.\n- The outer query keeps the top 5 ranked titles.\n\n## Difference from the optimal approach\n\nMore powerful, but unnecessary for a simple top-5 query."
      }
    ]
  },
  {
    "code": "MOVIES_026",
    "approaches": [
      {
        "approach_title": "Role count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT role_type, COUNT(*) AS total_people FROM title_credits GROUP BY role_type ORDER BY total_people DESC, role_type ASC;",
        "explanation": "## Approach\n\nGroup credits by role type and count rows in each group.\n\n## Query\n\n```sql\nSELECT role_type, COUNT(*) AS total_people\nFROM title_credits\nGROUP BY role_type\nORDER BY total_people DESC, role_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY role_type` creates one group per credited role.\n- `COUNT(*)` counts how many credit rows belong to each role.\n- The result is sorted by count descending.\n\n## Why this is optimal\n\nIt directly answers the question with the shortest grouped query."
      },
      {
        "approach_title": "COUNT person",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT role_type, COUNT(person_id) AS total_people FROM title_credits GROUP BY role_type ORDER BY total_people DESC, role_type ASC;",
        "explanation": "## Approach\n\nCount person ids inside each role group.\n\n## Query\n\n```sql\nSELECT role_type, COUNT(person_id) AS total_people\nFROM title_credits\nGROUP BY role_type\nORDER BY total_people DESC, role_type ASC;\n```\n\n## Explanation\n\n- `COUNT(person_id)` counts non-NULL person ids in each role group.\n- Since `person_id` is not NULL, this matches row count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is cleaner for counting rows."
      },
      {
        "approach_title": "CTE roles",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH role_counts AS (\n  SELECT role_type, COUNT(*) AS total_people\n  FROM title_credits\n  GROUP BY role_type\n)\nSELECT role_type, total_people\nFROM role_counts\nORDER BY total_people DESC, role_type ASC;",
        "explanation": "## Approach\n\nCompute counts per role in a CTE, then return them.\n\n## Query\n\n```sql\nWITH role_counts AS (\n  SELECT role_type, COUNT(*) AS total_people\n  FROM title_credits\n  GROUP BY role_type\n)\nSELECT role_type, total_people\nFROM role_counts\nORDER BY total_people DESC, role_type ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per role type.\n- The outer query handles final sorting.\n\n## Difference from the optimal approach\n\nMore readable in steps, but longer than needed."
      }
    ]
  },
  {
    "code": "MOVIES_027",
    "approaches": [
      {
        "approach_title": "Filter paid",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.id, p.invoice_id, p.paid_amount FROM payments p WHERE p.payment_status = 'successful' ORDER BY p.id ASC;",
        "explanation": "## Approach\n\nKeep only successful payments and return the required columns.\n\n## Query\n\n```sql\nSELECT p.id, p.invoice_id, p.paid_amount\nFROM payments p\nWHERE p.payment_status = 'successful'\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- `payment_status = 'successful'` filters to successful payment rows only.\n- The selected columns match the expected output.\n- `ORDER BY p.id ASC` ensures stable ordering.\n\n## Why this is optimal\n\nIt is the shortest and clearest solution for this filter query."
      },
      {
        "approach_title": "IN paid",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.id, p.invoice_id, p.paid_amount FROM payments p WHERE p.payment_status IN ('successful') ORDER BY p.id ASC;",
        "explanation": "## Approach\n\nUse `IN` with one allowed payment status.\n\n## Query\n\n```sql\nSELECT p.id, p.invoice_id, p.paid_amount\nFROM payments p\nWHERE p.payment_status IN ('successful')\nORDER BY p.id ASC;\n```\n\n## Explanation\n\n- `IN ('successful')` behaves the same as equality here.\n- It still filters to successful payments only.\n\n## Difference from the optimal approach\n\nValid, but equality is more direct for one value."
      },
      {
        "approach_title": "CTE paid",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH successful_payments AS (\n  SELECT id, invoice_id, paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, invoice_id, paid_amount\nFROM successful_payments\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore successful payments in a CTE, then return them.\n\n## Query\n\n```sql\nWITH successful_payments AS (\n  SELECT id, invoice_id, paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n)\nSELECT id, invoice_id, paid_amount\nFROM successful_payments\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE defines the filtered payment set.\n- The outer query returns it in order.\n\n## Difference from the optimal approach\n\nMore structured, but longer for a simple filter."
      }
    ]
  },
  {
    "code": "MOVIES_028",
    "approaches": [
      {
        "approach_title": "Group watchlist",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, COUNT(*) AS watchlist_count FROM watchlists GROUP BY profile_id ORDER BY watchlist_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nGroup watchlist rows by profile and count them.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(*) AS watchlist_count\nFROM watchlists\nGROUP BY profile_id\nORDER BY watchlist_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- Each row in `watchlists` is one saved title for one profile.\n- `GROUP BY profile_id` creates one group per profile.\n- `COUNT(*)` returns how many watchlist items each profile has.\n\n## Why this is optimal\n\nThis directly computes the required count per profile."
      },
      {
        "approach_title": "COUNT titles",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT profile_id, COUNT(title_id) AS watchlist_count FROM watchlists GROUP BY profile_id ORDER BY watchlist_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCount title ids for each profile.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(title_id) AS watchlist_count\nFROM watchlists\nGROUP BY profile_id\nORDER BY watchlist_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- `COUNT(title_id)` counts non-NULL title ids inside each profile group.\n- Since watchlist rows should always have a title id, this matches row count.\n\n## Difference from the optimal approach\n\nIt works, but counting rows is more direct."
      },
      {
        "approach_title": "CTE watch",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH profile_watchlists AS (\n  SELECT profile_id, COUNT(*) AS watchlist_count\n  FROM watchlists\n  GROUP BY profile_id\n)\nSELECT profile_id, watchlist_count\nFROM profile_watchlists\nORDER BY watchlist_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nBuild watchlist counts first, then sort them outside.\n\n## Query\n\n```sql\nWITH profile_watchlists AS (\n  SELECT profile_id, COUNT(*) AS watchlist_count\n  FROM watchlists\n  GROUP BY profile_id\n)\nSELECT profile_id, watchlist_count\nFROM profile_watchlists\nORDER BY watchlist_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per profile with its watchlist size.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nLonger, but helpful when the grouped result will be reused."
      }
    ]
  },
  {
    "code": "MOVIES_029",
    "approaches": [
      {
        "approach_title": "Range filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, profile_id, expires_at FROM downloads WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days' ORDER BY expires_at ASC;",
        "explanation": "## Approach\n\nFilter downloads whose expiry falls within the next 7 days.\n\n## Query\n\n```sql\nSELECT id, profile_id, expires_at\nFROM downloads\nWHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'\nORDER BY expires_at ASC;\n```\n\n## Explanation\n\n- `BETWEEN NOW() AND NOW() + INTERVAL '7 days'` keeps upcoming expiries only.\n- The selected columns match the required output.\n- Sorting by `expires_at ASC` shows the soonest expiries first.\n\n## Why this is optimal\n\nIt is concise and clearly expresses the upcoming date range."
      },
      {
        "approach_title": "Bound checks",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, profile_id, expires_at FROM downloads WHERE expires_at >= NOW() AND expires_at <= NOW() + INTERVAL '7 days' ORDER BY expires_at ASC;",
        "explanation": "## Approach\n\nUse explicit lower and upper date boundaries.\n\n## Query\n\n```sql\nSELECT id, profile_id, expires_at\nFROM downloads\nWHERE expires_at >= NOW()\n  AND expires_at <= NOW() + INTERVAL '7 days'\nORDER BY expires_at ASC;\n```\n\n## Explanation\n\n- The first condition removes already expired downloads.\n- The second condition limits results to the next 7 days.\n- This returns the same result as `BETWEEN`.\n\n## Difference from the optimal approach\n\nSame logic, but slightly more verbose."
      },
      {
        "approach_title": "CTE soon",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH expiring_downloads AS (\n  SELECT id, profile_id, expires_at\n  FROM downloads\n  WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'\n)\nSELECT id, profile_id, expires_at\nFROM expiring_downloads\nORDER BY expires_at ASC;",
        "explanation": "## Approach\n\nStore soon-to-expire downloads in a CTE, then return them.\n\n## Query\n\n```sql\nWITH expiring_downloads AS (\n  SELECT id, profile_id, expires_at\n  FROM downloads\n  WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '7 days'\n)\nSELECT id, profile_id, expires_at\nFROM expiring_downloads\nORDER BY expires_at ASC;\n```\n\n## Explanation\n\n- The CTE isolates the relevant download rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nMore steps than needed for a simple filter."
      }
    ]
  },
  {
    "code": "MOVIES_030",
    "approaches": [
      {
        "approach_title": "AVG watch",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions GROUP BY profile_id ORDER BY avg_watch_time_seconds DESC, profile_id ASC;",
        "explanation": "## Approach\n\nGroup sessions by profile and average the watch time.\n\n## Query\n\n```sql\nSELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\nFROM viewing_sessions\nGROUP BY profile_id\nORDER BY avg_watch_time_seconds DESC, profile_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY profile_id` creates one group per profile.\n- `AVG(watch_time_seconds)` computes the average watch time for each profile.\n- `ROUND(..., 2)` formats the output to two decimals.\n- Sorting ranks higher average watch time first.\n\n## Why this is optimal\n\nIt is the most direct grouped average query for this requirement."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH profile_avg_watch AS (\n  SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, avg_watch_time_seconds\nFROM profile_avg_watch\nORDER BY avg_watch_time_seconds DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCompute average watch time in a CTE, then return it.\n\n## Query\n\n```sql\nWITH profile_avg_watch AS (\n  SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, avg_watch_time_seconds\nFROM profile_avg_watch\nORDER BY avg_watch_time_seconds DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one average row per profile.\n- The outer query applies the sort order.\n\n## Difference from the optimal approach\n\nClear in steps, but longer than needed."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, avg_watch_time_seconds FROM (SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions GROUP BY profile_id) p ORDER BY avg_watch_time_seconds DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCalculate averages in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT profile_id, avg_watch_time_seconds\nFROM (\n  SELECT profile_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\n  FROM viewing_sessions\n  GROUP BY profile_id\n) p\nORDER BY avg_watch_time_seconds DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The inner query creates the grouped averages.\n- The outer query returns them in ranked order.\n\n## Difference from the optimal approach\n\nCorrect, but the single-query version is simpler."
      }
    ]
  },
  {
    "code": "MOVIES_031",
    "approaches": [
      {
        "approach_title": "Filter group",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS active_device_count FROM devices WHERE is_active = true GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nKeep only active devices, then count them per user.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS active_device_count\nFROM devices\nWHERE is_active = true\nGROUP BY user_id\nORDER BY active_device_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = true` removes inactive devices before grouping.\n- `GROUP BY user_id` creates one row per user that has active devices.\n- `COUNT(*)` counts active devices for each user.\n- Sorting ranks users with more active devices first.\n\n## Why this is optimal\n\nIt matches the expected result exactly because users with zero active devices are excluded."
      },
      {
        "approach_title": "Bool short",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id, COUNT(*) AS active_device_count FROM devices WHERE is_active GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS active_device_count\nFROM devices\nWHERE is_active\nGROUP BY user_id\nORDER BY active_device_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- Only active-device rows remain before grouping.\n- The grouped result is the same as the optimal query.\n\n## Difference from the optimal approach\n\nShorter, but less explicit for learners."
      },
      {
        "approach_title": "Active subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, COUNT(*) AS active_device_count FROM (SELECT user_id FROM devices WHERE is_active = true) d GROUP BY user_id ORDER BY active_device_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nFilter active devices in a subquery, then count them outside.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS active_device_count\nFROM (\n  SELECT user_id\n  FROM devices\n  WHERE is_active = true\n) d\nGROUP BY user_id\nORDER BY active_device_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The subquery keeps only active-device rows.\n- The outer query groups those rows by user.\n- This returns only users who actually have active devices.\n\n## Difference from the previous failed FILTER approach\n\nUnlike `COUNT(*) FILTER (...)`, this does not keep users whose active-device count is zero, so the row count matches the expected result."
      }
    ]
  },
  {
    "code": "MOVIES_032",
    "approaches": [
      {
        "approach_title": "Count paid",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS paid_invoices FROM billing_invoices WHERE invoice_status = 'paid';",
        "explanation": "## Approach\n\nFilter invoices to paid ones, then count the rows.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS paid_invoices\nFROM billing_invoices\nWHERE invoice_status = 'paid';\n```\n\n## Explanation\n\n- `WHERE invoice_status = 'paid'` keeps only paid invoices.\n- `COUNT(*)` returns how many such invoices exist.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to count paid invoices."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS paid_invoices FROM billing_invoices WHERE invoice_status = 'paid';",
        "explanation": "## Approach\n\nCount invoice ids after filtering to paid rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS paid_invoices\nFROM billing_invoices\nWHERE invoice_status = 'paid';\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL invoice ids.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counting."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE invoice_status = 'paid') AS paid_invoices FROM billing_invoices;",
        "explanation": "## Approach\n\nPut the condition inside the aggregate using `FILTER`.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE invoice_status = 'paid') AS paid_invoices\nFROM billing_invoices;\n```\n\n## Explanation\n\n- `FILTER` makes the count include only paid invoice rows.\n- This is especially useful when calculating multiple invoice status counts together.\n\n## Difference from the optimal approach\n\nValid, but less direct for a single count."
      }
    ]
  },
  {
    "code": "MOVIES_033",
    "approaches": [
      {
        "approach_title": "Series join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.id, t.title_name, s.season_number FROM titles t JOIN seasons s ON t.id = s.title_id WHERE t.title_type = 'series' ORDER BY t.id ASC, s.season_number ASC;",
        "explanation": "## Approach\n\nJoin titles with seasons and keep only series titles.\n\n## Query\n\n```sql\nSELECT t.id, t.title_name, s.season_number\nFROM titles t\nJOIN seasons s ON t.id = s.title_id\nWHERE t.title_type = 'series'\nORDER BY t.id ASC, s.season_number ASC;\n```\n\n## Explanation\n\n- `seasons` links back to `titles` using `title_id`.\n- `WHERE t.title_type = 'series'` excludes non-series titles.\n- The output returns each series with its season numbers.\n- Sorting by title id and season number keeps the result ordered.\n\n## Why this is optimal\n\nIt uses the natural join path and applies the exact filter needed."
      },
      {
        "approach_title": "Start season",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT t.id, t.title_name, s.season_number FROM seasons s JOIN titles t ON s.title_id = t.id WHERE t.title_type = 'series' ORDER BY t.id ASC, s.season_number ASC;",
        "explanation": "## Approach\n\nStart from `seasons` and join back to `titles`.\n\n## Query\n\n```sql\nSELECT t.id, t.title_name, s.season_number\nFROM seasons s\nJOIN titles t ON s.title_id = t.id\nWHERE t.title_type = 'series'\nORDER BY t.id ASC, s.season_number ASC;\n```\n\n## Explanation\n\n- The join path is the same, just written from the other side.\n- It still returns all series titles and their seasons.\n\n## Difference from the optimal approach\n\nIt is equally valid, but starting from titles is a bit easier to read."
      },
      {
        "approach_title": "CTE series",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH series_titles AS (\n  SELECT id, title_name\n  FROM titles\n  WHERE title_type = 'series'\n)\nSELECT st.id, st.title_name, s.season_number\nFROM series_titles st\nJOIN seasons s ON st.id = s.title_id\nORDER BY st.id ASC, s.season_number ASC;",
        "explanation": "## Approach\n\nIsolate series titles first, then join them to seasons.\n\n## Query\n\n```sql\nWITH series_titles AS (\n  SELECT id, title_name\n  FROM titles\n  WHERE title_type = 'series'\n)\nSELECT st.id, st.title_name, s.season_number\nFROM series_titles st\nJOIN seasons s ON st.id = s.title_id\nORDER BY st.id ASC, s.season_number ASC;\n```\n\n## Explanation\n\n- The CTE keeps only rows for series titles.\n- The outer query joins those rows to their seasons.\n- This can be useful if more series-only logic is added later.\n\n## Difference from the optimal approach\n\nLonger, but easy to extend."
      }
    ]
  },
  {
    "code": "MOVIES_034",
    "approaches": [
      {
        "approach_title": "AVG currency",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount FROM billing_invoices GROUP BY currency ORDER BY avg_total_amount DESC, currency ASC;",
        "explanation": "## Approach\n\nGroup invoices by currency and average their total amounts.\n\n## Query\n\n```sql\nSELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount\nFROM billing_invoices\nGROUP BY currency\nORDER BY avg_total_amount DESC, currency ASC;\n```\n\n## Explanation\n\n- `GROUP BY currency` creates one group per currency.\n- `AVG(total_amount)` computes the mean invoice amount in each group.\n- `ROUND(..., 2)` formats the output to two decimals.\n- Sorting ranks higher averages first.\n\n## Why this is optimal\n\nIt directly computes the grouped average in the simplest way."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH currency_avg AS (\n  SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount\n  FROM billing_invoices\n  GROUP BY currency\n)\nSELECT currency, avg_total_amount\nFROM currency_avg\nORDER BY avg_total_amount DESC, currency ASC;",
        "explanation": "## Approach\n\nCompute the average per currency in a CTE.\n\n## Query\n\n```sql\nWITH currency_avg AS (\n  SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount\n  FROM billing_invoices\n  GROUP BY currency\n)\nSELECT currency, avg_total_amount\nFROM currency_avg\nORDER BY avg_total_amount DESC, currency ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per currency with its average invoice total.\n- The outer query only handles ordering.\n\n## Difference from the optimal approach\n\nClear, but more verbose for a simple grouped average."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT currency, avg_total_amount FROM (SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount FROM billing_invoices GROUP BY currency) a ORDER BY avg_total_amount DESC, currency ASC;",
        "explanation": "## Approach\n\nCalculate averages in a subquery and sort outside.\n\n## Query\n\n```sql\nSELECT currency, avg_total_amount\nFROM (\n  SELECT currency, ROUND(AVG(total_amount), 2) AS avg_total_amount\n  FROM billing_invoices\n  GROUP BY currency\n) a\nORDER BY avg_total_amount DESC, currency ASC;\n```\n\n## Explanation\n\n- The inner query creates the grouped average values.\n- The outer query returns them in ranked order.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than the single-query version."
      }
    ]
  },
  {
    "code": "MOVIES_035",
    "approaches": [
      {
        "approach_title": "Top rows",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT row_id, COUNT(*) AS impression_count FROM recommendation_impressions GROUP BY row_id ORDER BY impression_count DESC, row_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount impressions per recommendation row, then keep the top 5.\n\n## Query\n\n```sql\nSELECT row_id, COUNT(*) AS impression_count\nFROM recommendation_impressions\nGROUP BY row_id\nORDER BY impression_count DESC, row_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Each row in `recommendation_impressions` is one served impression.\n- `GROUP BY row_id` collects impressions by recommendation row.\n- `COUNT(*)` counts total impressions for each row.\n- `LIMIT 5` keeps the top five rows by impression volume.\n\n## Why this is optimal\n\nIt is the cleanest top-N grouped count query for this metric."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT row_id, COUNT(id) AS impression_count FROM recommendation_impressions GROUP BY row_id ORDER BY impression_count DESC, row_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount impression ids for each row.\n\n## Query\n\n```sql\nSELECT row_id, COUNT(id) AS impression_count\nFROM recommendation_impressions\nGROUP BY row_id\nORDER BY impression_count DESC, row_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL impression ids.\n- Since impression ids are never NULL, this matches row count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "Rank rows",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT row_id, impression_count FROM (SELECT row_id, COUNT(*) AS impression_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, row_id ASC) AS rn FROM recommendation_impressions GROUP BY row_id) ranked WHERE rn <= 5 ORDER BY impression_count DESC, row_id ASC;",
        "explanation": "## Approach\n\nCount impressions per row, rank them, then keep the first five.\n\n## Query\n\n```sql\nSELECT row_id, impression_count\nFROM (\n  SELECT row_id,\n         COUNT(*) AS impression_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, row_id ASC) AS rn\n  FROM recommendation_impressions\n  GROUP BY row_id\n) ranked\nWHERE rn <= 5\nORDER BY impression_count DESC, row_id ASC;\n```\n\n## Explanation\n\n- The inner query counts impressions for each row.\n- `ROW_NUMBER()` ranks them by impression count.\n- The outer query keeps the first five ranked rows.\n\n## Difference from the optimal approach\n\nUseful for more complex ranking rules, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_036",
    "approaches": [
      {
        "approach_title": "Group country",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT country, COUNT(*) AS total_users FROM users GROUP BY country ORDER BY total_users DESC, country ASC;",
        "explanation": "## Approach\n\nGroup users by country and count each group.\n\n## Query\n\n```sql\nSELECT country, COUNT(*) AS total_users\nFROM users\nGROUP BY country\nORDER BY total_users DESC, country ASC;\n```\n\n## Explanation\n\n- `GROUP BY country` creates one group per country.\n- `COUNT(*)` returns the number of users in each country.\n- Sorting ranks larger user bases first.\n\n## Why this is optimal\n\nIt is the simplest grouped count query for country distribution."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT country, COUNT(id) AS total_users FROM users GROUP BY country ORDER BY total_users DESC, country ASC;",
        "explanation": "## Approach\n\nCount user ids inside each country group.\n\n## Query\n\n```sql\nSELECT country, COUNT(id) AS total_users\nFROM users\nGROUP BY country\nORDER BY total_users DESC, country ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL user ids.\n- Since ids are never NULL, this matches the row count.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is more natural for row counting."
      },
      {
        "approach_title": "CTE country",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH country_counts AS (\n  SELECT country, COUNT(*) AS total_users\n  FROM users\n  GROUP BY country\n)\nSELECT country, total_users\nFROM country_counts\nORDER BY total_users DESC, country ASC;",
        "explanation": "## Approach\n\nCompute country-level user counts in a CTE.\n\n## Query\n\n```sql\nWITH country_counts AS (\n  SELECT country, COUNT(*) AS total_users\n  FROM users\n  GROUP BY country\n)\nSELECT country, total_users\nFROM country_counts\nORDER BY total_users DESC, country ASC;\n```\n\n## Explanation\n\n- The CTE stores one count row per country.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nEasy to build on, but longer than needed for this query."
      }
    ]
  },
  {
    "code": "MOVIES_037",
    "approaches": [
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user FROM (SELECT user_id, COUNT(*) AS profile_count FROM profiles GROUP BY user_id) p;",
        "explanation": "## Approach\n\nFirst count profiles per user, then average those counts.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user\nFROM (\n  SELECT user_id, COUNT(*) AS profile_count\n  FROM profiles\n  GROUP BY user_id\n) p;\n```\n\n## Explanation\n\n- The inner query returns one row per user with that user's profile count.\n- The outer query averages those counts across users.\n- `ROUND(..., 2)` formats the output to two decimals.\n\n## Why this is optimal\n\nYou need two aggregation steps here, and a subquery expresses that clearly."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH profile_counts AS (\n  SELECT user_id, COUNT(*) AS profile_count\n  FROM profiles\n  GROUP BY user_id\n)\nSELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user\nFROM profile_counts;",
        "explanation": "## Approach\n\nCompute profile counts in a CTE, then average them.\n\n## Query\n\n```sql\nWITH profile_counts AS (\n  SELECT user_id, COUNT(*) AS profile_count\n  FROM profiles\n  GROUP BY user_id\n)\nSELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user\nFROM profile_counts;\n```\n\n## Explanation\n\n- The CTE isolates the first aggregation step.\n- The outer query performs the second aggregation step.\n- This is a clean alternative to the subquery version.\n\n## Difference from the optimal approach\n\nEqually correct, but slightly longer."
      },
      {
        "approach_title": "Join users",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user FROM (SELECT u.id, COUNT(p.id) AS profile_count FROM users u JOIN profiles p ON u.id = p.user_id GROUP BY u.id) x;",
        "explanation": "## Approach\n\nJoin users and profiles, count profiles per user, then average those counts.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(profile_count), 2) AS avg_profiles_per_user\nFROM (\n  SELECT u.id, COUNT(p.id) AS profile_count\n  FROM users u\n  JOIN profiles p ON u.id = p.user_id\n  GROUP BY u.id\n) x;\n```\n\n## Explanation\n\n- The join links each profile to its user.\n- The grouped inner query counts profiles per user.\n- The outer query averages those counts.\n\n## Difference from the optimal approach\n\nWorks well, but the join is unnecessary because `profiles` already contains `user_id`."
      }
    ]
  },
  {
    "code": "MOVIES_038",
    "approaches": [
      {
        "approach_title": "Avail join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.id, t.title_name, ca.available_from, ca.available_to FROM titles t JOIN content_availability ca ON t.id = ca.title_id WHERE ca.country = 'India' AND ca.is_available = true AND ca.available_from <= NOW() AND (ca.available_to IS NULL OR ca.available_to >= NOW()) ORDER BY t.id ASC;",
        "explanation": "## Approach\n\nJoin titles with availability records and keep only titles currently available in India.\n\n## Query\n\n```sql\nSELECT t.id, t.title_name, ca.available_from, ca.available_to\nFROM titles t\nJOIN content_availability ca ON t.id = ca.title_id\nWHERE ca.country = 'India'\n  AND ca.is_available = true\n  AND ca.available_from <= NOW()\n  AND (ca.available_to IS NULL OR ca.available_to >= NOW())\nORDER BY t.id ASC;\n```\n\n## Explanation\n\n- `content_availability` stores regional availability windows.\n- `country = 'India'` narrows the result to India.\n- `is_available = true` keeps only enabled rows.\n- The date conditions make sure the title is available right now.\n\n## Why this is optimal\n\nIt directly joins the required tables and applies all business rules clearly."
      },
      {
        "approach_title": "CTE active",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH india_available AS (\n  SELECT title_id, available_from, available_to\n  FROM content_availability\n  WHERE country = 'India'\n    AND is_available = true\n    AND available_from <= NOW()\n    AND (available_to IS NULL OR available_to >= NOW())\n)\nSELECT t.id, t.title_name, ia.available_from, ia.available_to\nFROM titles t\nJOIN india_available ia ON t.id = ia.title_id\nORDER BY t.id ASC;",
        "explanation": "## Approach\n\nFilter valid India availability rows first, then join to titles.\n\n## Query\n\n```sql\nWITH india_available AS (\n  SELECT title_id, available_from, available_to\n  FROM content_availability\n  WHERE country = 'India'\n    AND is_available = true\n    AND available_from <= NOW()\n    AND (available_to IS NULL OR available_to >= NOW())\n)\nSELECT t.id, t.title_name, ia.available_from, ia.available_to\nFROM titles t\nJOIN india_available ia ON t.id = ia.title_id\nORDER BY t.id ASC;\n```\n\n## Explanation\n\n- The CTE isolates only currently valid India availability rows.\n- The outer query adds title details.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer than needed."
      },
      {
        "approach_title": "Start avail",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT t.id, t.title_name, ca.available_from, ca.available_to FROM content_availability ca JOIN titles t ON ca.title_id = t.id WHERE ca.country = 'India' AND ca.is_available = true AND ca.available_from <= NOW() AND (ca.available_to IS NULL OR ca.available_to >= NOW()) ORDER BY t.id ASC;",
        "explanation": "## Approach\n\nStart from the availability table and join back to titles.\n\n## Query\n\n```sql\nSELECT t.id, t.title_name, ca.available_from, ca.available_to\nFROM content_availability ca\nJOIN titles t ON ca.title_id = t.id\nWHERE ca.country = 'India'\n  AND ca.is_available = true\n  AND ca.available_from <= NOW()\n  AND (ca.available_to IS NULL OR ca.available_to >= NOW())\nORDER BY t.id ASC;\n```\n\n## Explanation\n\n- The logic is the same as the optimal query.\n- It starts from the table that holds the regional availability conditions.\n\n## Difference from the optimal approach\n\nEqually valid, but starting from titles is a bit more intuitive for this question."
      }
    ]
  },
  {
    "code": "MOVIES_039",
    "approaches": [
      {
        "approach_title": "Distinct join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT u.id, u.email, sp.plan_name FROM users u JOIN subscriptions s ON u.id = s.user_id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' AND sp.has_ads = true ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nJoin users to active subscriptions and ad-supported plans, then remove duplicate rows.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.email, sp.plan_name\nFROM users u\nJOIN subscriptions s ON u.id = s.user_id\nJOIN subscription_plans sp ON s.plan_id = sp.id\nWHERE s.subscription_status = 'active'\n  AND sp.has_ads = true\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `subscriptions` links users to plans.\n- `subscription_plans` lets us filter to `has_ads = true`.\n- `subscription_status = 'active'` keeps only current subscriptions.\n- `DISTINCT` avoids duplicate rows if a user has multiple matching subscriptions.\n\n## Why this is optimal\n\nIt directly applies the two required filters and keeps the result clean."
      },
      {
        "approach_title": "CTE ads",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_ad_plans AS (\n  SELECT s.user_id, sp.plan_name\n  FROM subscriptions s\n  JOIN subscription_plans sp ON s.plan_id = sp.id\n  WHERE s.subscription_status = 'active'\n    AND sp.has_ads = true\n)\nSELECT DISTINCT u.id, u.email, a.plan_name\nFROM users u\nJOIN active_ad_plans a ON u.id = a.user_id\nORDER BY u.id ASC;",
        "explanation": "## Approach\n\nBuild active ad-supported subscriptions first, then join them to users.\n\n## Query\n\n```sql\nWITH active_ad_plans AS (\n  SELECT s.user_id, sp.plan_name\n  FROM subscriptions s\n  JOIN subscription_plans sp ON s.plan_id = sp.id\n  WHERE s.subscription_status = 'active'\n    AND sp.has_ads = true\n)\nSELECT DISTINCT u.id, u.email, a.plan_name\nFROM users u\nJOIN active_ad_plans a ON u.id = a.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only rows that meet both subscription conditions.\n- The outer query adds user details.\n- `DISTINCT` prevents duplicate output rows.\n\n## Difference from the optimal approach\n\nGood step-by-step structure, but longer."
      },
      {
        "approach_title": "Subquery ads",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT u.id, u.email, x.plan_name FROM users u JOIN (SELECT s.user_id, sp.plan_name FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' AND sp.has_ads = true) x ON u.id = x.user_id ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUse a subquery for active ad-supported subscriptions, then join it to users.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.email, x.plan_name\nFROM users u\nJOIN (\n  SELECT s.user_id, sp.plan_name\n  FROM subscriptions s\n  JOIN subscription_plans sp ON s.plan_id = sp.id\n  WHERE s.subscription_status = 'active'\n    AND sp.has_ads = true\n) x ON u.id = x.user_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery returns only matching user-plan pairs.\n- The outer query adds the user email.\n- `DISTINCT` removes duplicates.\n\n## Difference from the optimal approach\n\nCorrect, but the straight join version is easier to read."
      }
    ]
  },
  {
    "code": "MOVIES_040",
    "approaches": [
      {
        "approach_title": "Join avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.title_type, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM ratings r JOIN titles t ON r.title_id = t.id GROUP BY t.title_type ORDER BY avg_rating DESC, t.title_type ASC;",
        "explanation": "## Approach\n\nJoin ratings to titles so each rating can be grouped by title type, then average the rating values.\n\n## Query\n\n```sql\nSELECT t.title_type, ROUND(AVG(r.rating_value), 2) AS avg_rating\nFROM ratings r\nJOIN titles t ON r.title_id = t.id\nGROUP BY t.title_type\nORDER BY avg_rating DESC, t.title_type ASC;\n```\n\n## Explanation\n\n- `ratings` contains the rating values.\n- `titles` provides the `title_type` needed for grouping.\n- Joining them lets each rating contribute to its title type group.\n- `AVG(r.rating_value)` computes the mean rating for each type.\n\n## Why this is optimal\n\nIt is the most direct way to connect rating values with title types."
      },
      {
        "approach_title": "CTE rated",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_type_ratings AS (\n  SELECT t.title_type, r.rating_value\n  FROM ratings r\n  JOIN titles t ON r.title_id = t.id\n)\nSELECT title_type, ROUND(AVG(rating_value), 2) AS avg_rating\nFROM title_type_ratings\nGROUP BY title_type\nORDER BY avg_rating DESC, title_type ASC;",
        "explanation": "## Approach\n\nFirst map each rating to its title type, then average by type.\n\n## Query\n\n```sql\nWITH title_type_ratings AS (\n  SELECT t.title_type, r.rating_value\n  FROM ratings r\n  JOIN titles t ON r.title_id = t.id\n)\nSELECT title_type, ROUND(AVG(rating_value), 2) AS avg_rating\nFROM title_type_ratings\nGROUP BY title_type\nORDER BY avg_rating DESC, title_type ASC;\n```\n\n## Explanation\n\n- The CTE creates a simpler two-column set: type and rating.\n- The outer query groups by type and calculates the average.\n\n## Difference from the optimal approach\n\nA nice step-by-step version, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_type, ROUND(AVG(rating_value), 2) AS avg_rating FROM (SELECT t.title_type, r.rating_value FROM ratings r JOIN titles t ON r.title_id = t.id) x GROUP BY title_type ORDER BY avg_rating DESC, title_type ASC;",
        "explanation": "## Approach\n\nCreate a joined subquery of type and rating, then average it outside.\n\n## Query\n\n```sql\nSELECT title_type, ROUND(AVG(rating_value), 2) AS avg_rating\nFROM (\n  SELECT t.title_type, r.rating_value\n  FROM ratings r\n  JOIN titles t ON r.title_id = t.id\n) x\nGROUP BY title_type\nORDER BY avg_rating DESC, title_type ASC;\n```\n\n## Explanation\n\n- The subquery resolves the join first.\n- The outer query groups by type and calculates the average.\n\n## Difference from the optimal approach\n\nCorrect, but the single-query join is cleaner."
      }
    ]
  },
  {
    "code": "MOVIES_041",
    "approaches": [
      {
        "approach_title": "Sum watch",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds FROM viewing_sessions GROUP BY profile_id ORDER BY total_watch_time_seconds DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup sessions by profile, sum watch time, then keep the top 5.\n\n## Query\n\n```sql\nSELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds\nFROM viewing_sessions\nGROUP BY profile_id\nORDER BY total_watch_time_seconds DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY profile_id` creates one group per profile.\n- `SUM(watch_time_seconds)` adds total watch time for each profile.\n- `ORDER BY ... DESC` ranks the profiles by total watch time.\n- `LIMIT 5` keeps only the top 5.\n\n## Why this is optimal\n\nIt is the clearest way to calculate and rank total watch time by profile."
      },
      {
        "approach_title": "CTE top",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH profile_watch_time AS (\n  SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, total_watch_time_seconds\nFROM profile_watch_time\nORDER BY total_watch_time_seconds DESC, profile_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute total watch time per profile in a CTE, then rank it.\n\n## Query\n\n```sql\nWITH profile_watch_time AS (\n  SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, total_watch_time_seconds\nFROM profile_watch_time\nORDER BY total_watch_time_seconds DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per profile with its total watch time.\n- The outer query sorts those totals and keeps the top 5.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed for this query."
      },
      {
        "approach_title": "Rank sum",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, total_watch_time_seconds FROM (SELECT profile_id, SUM(watch_time_seconds) AS total_watch_time_seconds, ROW_NUMBER() OVER (ORDER BY SUM(watch_time_seconds) DESC, profile_id ASC) AS rn FROM viewing_sessions GROUP BY profile_id) ranked WHERE rn <= 5 ORDER BY total_watch_time_seconds DESC, profile_id ASC;",
        "explanation": "## Approach\n\nSum watch time per profile, assign row numbers, then keep the first five.\n\n## Query\n\n```sql\nSELECT profile_id, total_watch_time_seconds\nFROM (\n  SELECT profile_id,\n         SUM(watch_time_seconds) AS total_watch_time_seconds,\n         ROW_NUMBER() OVER (ORDER BY SUM(watch_time_seconds) DESC, profile_id ASC) AS rn\n  FROM viewing_sessions\n  GROUP BY profile_id\n) ranked\nWHERE rn <= 5\nORDER BY total_watch_time_seconds DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes total watch time for each profile.\n- `ROW_NUMBER()` ranks profiles by that total.\n- The outer query keeps the top 5 ranked rows.\n\n## Difference from the optimal approach\n\nMore powerful for advanced ranking logic, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_042",
    "approaches": [
      {
        "approach_title": "Count device",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT device_id, COUNT(*) AS session_count FROM viewing_sessions WHERE device_id IS NOT NULL GROUP BY device_id ORDER BY session_count DESC, device_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep rows with a device id, count sessions per device, then return the top 5.\n\n## Query\n\n```sql\nSELECT device_id, COUNT(*) AS session_count\nFROM viewing_sessions\nWHERE device_id IS NOT NULL\nGROUP BY device_id\nORDER BY session_count DESC, device_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `device_id IS NOT NULL` removes sessions without a device reference.\n- `GROUP BY device_id` creates one group per device.\n- `COUNT(*)` returns how many sessions each device has.\n- `LIMIT 5` keeps the most used devices.\n\n## Why this is optimal\n\nIt directly answers the question with the least complexity."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT device_id, COUNT(id) AS session_count FROM viewing_sessions WHERE device_id IS NOT NULL GROUP BY device_id ORDER BY session_count DESC, device_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount session ids for each device.\n\n## Query\n\n```sql\nSELECT device_id, COUNT(id) AS session_count\nFROM viewing_sessions\nWHERE device_id IS NOT NULL\nGROUP BY device_id\nORDER BY session_count DESC, device_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL session ids.\n- Since `id` is a primary key, it matches row count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE use",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH device_sessions AS (\n  SELECT device_id, COUNT(*) AS session_count\n  FROM viewing_sessions\n  WHERE device_id IS NOT NULL\n  GROUP BY device_id\n)\nSELECT device_id, session_count\nFROM device_sessions\nORDER BY session_count DESC, device_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute session counts per device in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH device_sessions AS (\n  SELECT device_id, COUNT(*) AS session_count\n  FROM viewing_sessions\n  WHERE device_id IS NOT NULL\n  GROUP BY device_id\n)\nSELECT device_id, session_count\nFROM device_sessions\nORDER BY session_count DESC, device_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per device with its session count.\n- The outer query ranks those counts.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend later."
      }
    ]
  },
  {
    "code": "MOVIES_043",
    "approaches": [
      {
        "approach_title": "Join clicks",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ri.title_id, COUNT(*) AS click_count FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.title_id ORDER BY click_count DESC, ri.title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin clicks to impressions so each click can be mapped to a title, then count clicks per title.\n\n## Query\n\n```sql\nSELECT ri.title_id, COUNT(*) AS click_count\nFROM recommendation_clicks rc\nJOIN recommendation_impressions ri ON rc.impression_id = ri.id\nGROUP BY ri.title_id\nORDER BY click_count DESC, ri.title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `recommendation_clicks` tells us which impressions were clicked.\n- `recommendation_impressions` gives the title shown in that impression.\n- `GROUP BY ri.title_id` counts clicks for each title.\n- `LIMIT 5` returns the top 5 clicked recommended titles.\n\n## Why this is optimal\n\nIt uses the natural relationship between clicks and impressions in the simplest way."
      },
      {
        "approach_title": "CTE click",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH clicked_titles AS (\n  SELECT ri.title_id\n  FROM recommendation_clicks rc\n  JOIN recommendation_impressions ri ON rc.impression_id = ri.id\n)\nSELECT title_id, COUNT(*) AS click_count\nFROM clicked_titles\nGROUP BY title_id\nORDER BY click_count DESC, title_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nFirst extract clicked title ids, then count them.\n\n## Query\n\n```sql\nWITH clicked_titles AS (\n  SELECT ri.title_id\n  FROM recommendation_clicks rc\n  JOIN recommendation_impressions ri ON rc.impression_id = ri.id\n)\nSELECT title_id, COUNT(*) AS click_count\nFROM clicked_titles\nGROUP BY title_id\nORDER BY click_count DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE resolves each click to a title.\n- The outer query counts how many clicks each title received.\n\n## Difference from the optimal approach\n\nClear in steps, but longer than needed."
      },
      {
        "approach_title": "Rank click",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, click_count FROM (SELECT ri.title_id, COUNT(*) AS click_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, ri.title_id ASC) AS rn FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.title_id) ranked WHERE rn <= 5 ORDER BY click_count DESC, title_id ASC;",
        "explanation": "## Approach\n\nCount clicks per title, rank them, then keep the first five.\n\n## Query\n\n```sql\nSELECT title_id, click_count\nFROM (\n  SELECT ri.title_id,\n         COUNT(*) AS click_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, ri.title_id ASC) AS rn\n  FROM recommendation_clicks rc\n  JOIN recommendation_impressions ri ON rc.impression_id = ri.id\n  GROUP BY ri.title_id\n) ranked\nWHERE rn <= 5\nORDER BY click_count DESC, title_id ASC;\n```\n\n## Explanation\n\n- The grouped query calculates click totals for each title.\n- `ROW_NUMBER()` creates a ranking from highest to lowest.\n- The outer query keeps only the top 5 ranked rows.\n\n## Difference from the optimal approach\n\nUseful for more advanced ranking logic, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_044",
    "approaches": [
      {
        "approach_title": "Category join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT c.category_name, COUNT(*) AS title_count FROM title_categories tc JOIN content_categories c ON tc.category_id = c.id GROUP BY c.category_name ORDER BY title_count DESC, c.category_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin title-category links to category names, then count titles per category.\n\n## Query\n\n```sql\nSELECT c.category_name, COUNT(*) AS title_count\nFROM title_categories tc\nJOIN content_categories c ON tc.category_id = c.id\nGROUP BY c.category_name\nORDER BY title_count DESC, c.category_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `title_categories` contains one row per title-category mapping.\n- Joining to `content_categories` gives the readable category name.\n- `COUNT(*)` counts how many mapped titles each category has.\n- `LIMIT 5` returns the top 5 categories.\n\n## Why this is optimal\n\nIt uses the bridge table directly and answers the question in one grouped query."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH category_counts AS (\n  SELECT c.category_name, COUNT(*) AS title_count\n  FROM title_categories tc\n  JOIN content_categories c ON tc.category_id = c.id\n  GROUP BY c.category_name\n)\nSELECT category_name, title_count\nFROM category_counts\nORDER BY title_count DESC, category_name ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCalculate counts per category in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH category_counts AS (\n  SELECT c.category_name, COUNT(*) AS title_count\n  FROM title_categories tc\n  JOIN content_categories c ON tc.category_id = c.id\n  GROUP BY c.category_name\n)\nSELECT category_name, title_count\nFROM category_counts\nORDER BY title_count DESC, category_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores the grouped category counts.\n- The outer query handles ordering and limiting.\n\n## Difference from the optimal approach\n\nUseful when reusing the grouped result, but longer."
      },
      {
        "approach_title": "Rank cat",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT category_name, title_count FROM (SELECT c.category_name, COUNT(*) AS title_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, c.category_name ASC) AS rn FROM title_categories tc JOIN content_categories c ON tc.category_id = c.id GROUP BY c.category_name) ranked WHERE rn <= 5 ORDER BY title_count DESC, category_name ASC;",
        "explanation": "## Approach\n\nCount titles per category, rank the results, then keep the first five.\n\n## Query\n\n```sql\nSELECT category_name, title_count\nFROM (\n  SELECT c.category_name,\n         COUNT(*) AS title_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, c.category_name ASC) AS rn\n  FROM title_categories tc\n  JOIN content_categories c ON tc.category_id = c.id\n  GROUP BY c.category_name\n) ranked\nWHERE rn <= 5\nORDER BY title_count DESC, category_name ASC;\n```\n\n## Explanation\n\n- The grouped query computes the title count for each category.\n- `ROW_NUMBER()` ranks categories by title count.\n- The outer query keeps the top 5 ranked categories.\n\n## Difference from the optimal approach\n\nMore flexible for complex ranking, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_045",
    "approaches": [
      {
        "approach_title": "Expire check",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.email, s.current_period_end FROM users u JOIN subscriptions s ON u.id = s.user_id WHERE s.subscription_status = 'expired' OR s.current_period_end < NOW() ORDER BY s.current_period_end DESC, u.id ASC;",
        "explanation": "## Approach\n\nJoin users to subscriptions, then keep subscriptions that are expired by status or by period end date.\n\n## Query\n\n```sql\nSELECT u.id, u.email, s.current_period_end\nFROM users u\nJOIN subscriptions s ON u.id = s.user_id\nWHERE s.subscription_status = 'expired'\n   OR s.current_period_end < NOW()\nORDER BY s.current_period_end DESC, u.id ASC;\n```\n\n## Explanation\n\n- `users` provides the account info.\n- `subscriptions` provides the status and end date.\n- The `OR` condition covers both explicit expired status and time-based expiry.\n- The output is sorted by end date and user id.\n\n## Why this is optimal\n\nIt captures both ways a subscription can qualify and stays very readable."
      },
      {
        "approach_title": "CTE expired",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH expired_subscriptions AS (\n  SELECT user_id, current_period_end\n  FROM subscriptions\n  WHERE subscription_status = 'expired' OR current_period_end < NOW()\n)\nSELECT u.id, u.email, e.current_period_end\nFROM users u\nJOIN expired_subscriptions e ON u.id = e.user_id\nORDER BY e.current_period_end DESC, u.id ASC;",
        "explanation": "## Approach\n\nFilter expired subscription rows first, then join them to users.\n\n## Query\n\n```sql\nWITH expired_subscriptions AS (\n  SELECT user_id, current_period_end\n  FROM subscriptions\n  WHERE subscription_status = 'expired'\n     OR current_period_end < NOW()\n)\nSELECT u.id, u.email, e.current_period_end\nFROM users u\nJOIN expired_subscriptions e ON u.id = e.user_id\nORDER BY e.current_period_end DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE isolates only the expired subscription rows.\n- The outer query adds user details.\n\n## Difference from the optimal approach\n\nClear in steps, but longer."
      },
      {
        "approach_title": "Subquery exp",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT u.id, u.email, s.current_period_end FROM users u JOIN (SELECT user_id, current_period_end FROM subscriptions WHERE subscription_status = 'expired' OR current_period_end < NOW()) s ON u.id = s.user_id ORDER BY s.current_period_end DESC, u.id ASC;",
        "explanation": "## Approach\n\nUse a filtered subquery for expired subscriptions, then join to users.\n\n## Query\n\n```sql\nSELECT u.id, u.email, s.current_period_end\nFROM users u\nJOIN (\n  SELECT user_id, current_period_end\n  FROM subscriptions\n  WHERE subscription_status = 'expired'\n     OR current_period_end < NOW()\n) s ON u.id = s.user_id\nORDER BY s.current_period_end DESC, u.id ASC;\n```\n\n## Explanation\n\n- The subquery returns only expired subscription rows.\n- The join adds user information.\n\n## Difference from the optimal approach\n\nCorrect, but the direct join version is simpler."
      }
    ]
  },
  {
    "code": "MOVIES_046",
    "approaches": [
      {
        "approach_title": "Revenue join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT sp.plan_name, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE bi.invoice_status = 'paid' GROUP BY sp.plan_name ORDER BY total_revenue DESC, sp.plan_name ASC;",
        "explanation": "## Approach\n\nJoin invoices to subscriptions and plans, then sum paid revenue per plan.\n\n## Query\n\n```sql\nSELECT sp.plan_name, ROUND(SUM(bi.total_amount), 2) AS total_revenue\nFROM billing_invoices bi\nJOIN subscriptions s ON bi.subscription_id = s.id\nJOIN subscription_plans sp ON s.plan_id = sp.id\nWHERE bi.invoice_status = 'paid'\nGROUP BY sp.plan_name\nORDER BY total_revenue DESC, sp.plan_name ASC;\n```\n\n## Explanation\n\n- `billing_invoices` contains the billed revenue.\n- `subscriptions` links invoices to subscription records.\n- `subscription_plans` provides the plan name.\n- `WHERE bi.invoice_status = 'paid'` keeps only realized revenue.\n- `SUM(bi.total_amount)` totals revenue per plan.\n\n## Why this is optimal\n\nIt follows the correct join path and computes the grouped revenue directly."
      },
      {
        "approach_title": "CTE paid",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH paid_invoices AS (\n  SELECT subscription_id, total_amount\n  FROM billing_invoices\n  WHERE invoice_status = 'paid'\n)\nSELECT sp.plan_name, ROUND(SUM(pi.total_amount), 2) AS total_revenue\nFROM paid_invoices pi\nJOIN subscriptions s ON pi.subscription_id = s.id\nJOIN subscription_plans sp ON s.plan_id = sp.id\nGROUP BY sp.plan_name\nORDER BY total_revenue DESC, sp.plan_name ASC;",
        "explanation": "## Approach\n\nFilter paid invoices first, then join them to plans.\n\n## Query\n\n```sql\nWITH paid_invoices AS (\n  SELECT subscription_id, total_amount\n  FROM billing_invoices\n  WHERE invoice_status = 'paid'\n)\nSELECT sp.plan_name, ROUND(SUM(pi.total_amount), 2) AS total_revenue\nFROM paid_invoices pi\nJOIN subscriptions s ON pi.subscription_id = s.id\nJOIN subscription_plans sp ON s.plan_id = sp.id\nGROUP BY sp.plan_name\nORDER BY total_revenue DESC, sp.plan_name ASC;\n```\n\n## Explanation\n\n- The CTE isolates revenue rows that actually count.\n- The outer query joins them to plans and sums totals.\n\n## Difference from the optimal approach\n\nGood for readability, but longer."
      },
      {
        "approach_title": "Subquery rev",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT plan_name, ROUND(SUM(total_amount), 2) AS total_revenue FROM (SELECT sp.plan_name, bi.total_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN subscription_plans sp ON s.plan_id = sp.id WHERE bi.invoice_status = 'paid') x GROUP BY plan_name ORDER BY total_revenue DESC, plan_name ASC;",
        "explanation": "## Approach\n\nResolve plan name and invoice amount first, then aggregate outside.\n\n## Query\n\n```sql\nSELECT plan_name, ROUND(SUM(total_amount), 2) AS total_revenue\nFROM (\n  SELECT sp.plan_name, bi.total_amount\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN subscription_plans sp ON s.plan_id = sp.id\n  WHERE bi.invoice_status = 'paid'\n) x\nGROUP BY plan_name\nORDER BY total_revenue DESC, plan_name ASC;\n```\n\n## Explanation\n\n- The subquery creates a simplified plan-name plus amount dataset.\n- The outer query sums the revenue per plan.\n\n## Difference from the optimal approach\n\nCorrect, but the single grouped join is cleaner."
      }
    ]
  },
  {
    "code": "MOVIES_047",
    "approaches": [
      {
        "approach_title": "Avg complete",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_completion_percent DESC, title_id ASC;",
        "explanation": "## Approach\n\nKeep title-level sessions, then average completion percent per title.\n\n## Query\n\n```sql\nSELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent\nFROM viewing_sessions\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY avg_completion_percent DESC, title_id ASC;\n```\n\n## Explanation\n\n- `title_id IS NOT NULL` keeps title rows only.\n- `AVG(completion_percent)` computes average completion for each title.\n- `ROUND(..., 2)` formats the result.\n- The ordering ranks higher completion first.\n\n## Why this is optimal\n\nIt directly calculates the grouped average with the needed filter."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_completion AS (\n  SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, avg_completion_percent\nFROM title_completion\nORDER BY avg_completion_percent DESC, title_id ASC;",
        "explanation": "## Approach\n\nCompute average completion in a CTE, then sort it.\n\n## Query\n\n```sql\nWITH title_completion AS (\n  SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, avg_completion_percent\nFROM title_completion\nORDER BY avg_completion_percent DESC, title_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one completion average per title.\n- The outer query applies the final order.\n\n## Difference from the optimal approach\n\nMore structured, but not necessary here."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, avg_completion_percent FROM (SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) x ORDER BY avg_completion_percent DESC, title_id ASC;",
        "explanation": "## Approach\n\nCalculate averages in a subquery, then order the result outside.\n\n## Query\n\n```sql\nSELECT title_id, avg_completion_percent\nFROM (\n  SELECT title_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n) x\nORDER BY avg_completion_percent DESC, title_id ASC;\n```\n\n## Explanation\n\n- The inner query builds one average row per title.\n- The outer query returns the ranked result.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than the single-query version."
      }
    ]
  },
  {
    "code": "MOVIES_048",
    "approaches": [
      {
        "approach_title": "Top watchlist",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, COUNT(*) AS watchlist_size FROM watchlists GROUP BY profile_id ORDER BY watchlist_size DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount watchlist items per profile, then keep the top 5 profiles.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(*) AS watchlist_size\nFROM watchlists\nGROUP BY profile_id\nORDER BY watchlist_size DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY profile_id` creates one group per profile.\n- `COUNT(*)` measures watchlist size for each profile.\n- `ORDER BY ... DESC` ranks larger watchlists first.\n- `LIMIT 5` returns only the top 5.\n\n## Why this is optimal\n\nIt is the simplest grouped top-N query for watchlist size."
      },
      {
        "approach_title": "Count titles",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT profile_id, COUNT(title_id) AS watchlist_size FROM watchlists GROUP BY profile_id ORDER BY watchlist_size DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount title ids for each profile and rank the result.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(title_id) AS watchlist_size\nFROM watchlists\nGROUP BY profile_id\nORDER BY watchlist_size DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(title_id)` counts non-NULL title ids in each profile group.\n- Since each watchlist row should have a title id, this matches row count.\n\n## Difference from the optimal approach\n\nIt works, but counting rows is more direct."
      },
      {
        "approach_title": "Rank watch",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, watchlist_size FROM (SELECT profile_id, COUNT(*) AS watchlist_size, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, profile_id ASC) AS rn FROM watchlists GROUP BY profile_id) ranked WHERE rn <= 5 ORDER BY watchlist_size DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCount watchlist items per profile, rank them, then keep the first five.\n\n## Query\n\n```sql\nSELECT profile_id, watchlist_size\nFROM (\n  SELECT profile_id,\n         COUNT(*) AS watchlist_size,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, profile_id ASC) AS rn\n  FROM watchlists\n  GROUP BY profile_id\n) ranked\nWHERE rn <= 5\nORDER BY watchlist_size DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes the size of each profile's watchlist.\n- `ROW_NUMBER()` ranks profiles by that size.\n- The outer query keeps the top 5 ranked profiles.\n\n## Difference from the optimal approach\n\nUseful for more advanced ranking cases, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_049",
    "approaches": [
      {
        "approach_title": "Top countries",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT country, COUNT(*) AS user_count FROM users GROUP BY country ORDER BY user_count DESC, country ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup users by country, count them, and keep the top 5.\n\n## Query\n\n```sql\nSELECT country, COUNT(*) AS user_count\nFROM users\nGROUP BY country\nORDER BY user_count DESC, country ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY country` creates one group per country.\n- `COUNT(*)` counts users in each country.\n- `ORDER BY ... DESC` ranks countries by user count.\n- `LIMIT 5` returns only the top 5.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to rank countries by user count."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT country, COUNT(id) AS user_count FROM users GROUP BY country ORDER BY user_count DESC, country ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount user ids per country and rank the result.\n\n## Query\n\n```sql\nSELECT country, COUNT(id) AS user_count\nFROM users\nGROUP BY country\nORDER BY user_count DESC, country ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL user ids.\n- Since ids are never NULL, this equals row count.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE top",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH country_user_counts AS (\n  SELECT country, COUNT(*) AS user_count\n  FROM users\n  GROUP BY country\n)\nSELECT country, user_count\nFROM country_user_counts\nORDER BY user_count DESC, country ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute country counts in a CTE, then return the top 5.\n\n## Query\n\n```sql\nWITH country_user_counts AS (\n  SELECT country, COUNT(*) AS user_count\n  FROM users\n  GROUP BY country\n)\nSELECT country, user_count\nFROM country_user_counts\nORDER BY user_count DESC, country ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one count row per country.\n- The outer query ranks the countries and keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful in larger queries, but longer than needed here."
      }
    ]
  },
  {
    "code": "MOVIES_050",
    "approaches": [
      {
        "approach_title": "Error count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT error_code, COUNT(*) AS error_count FROM playback_events WHERE error_code IS NOT NULL GROUP BY error_code ORDER BY error_count DESC, error_code ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep rows with an error code, count each code, and return the top 5.\n\n## Query\n\n```sql\nSELECT error_code, COUNT(*) AS error_count\nFROM playback_events\nWHERE error_code IS NOT NULL\nGROUP BY error_code\nORDER BY error_count DESC, error_code ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `error_code IS NOT NULL` removes events without an error.\n- `GROUP BY error_code` creates one group per error code.\n- `COUNT(*)` returns how often each error occurred.\n- `LIMIT 5` keeps the five most common codes.\n\n## Why this is optimal\n\nIt directly computes the frequency of each error code with no extra complexity."
      },
      {
        "approach_title": "Count code",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT error_code, COUNT(error_code) AS error_count FROM playback_events WHERE error_code IS NOT NULL GROUP BY error_code ORDER BY error_count DESC, error_code ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount non-NULL error code values inside each error group.\n\n## Query\n\n```sql\nSELECT error_code, COUNT(error_code) AS error_count\nFROM playback_events\nWHERE error_code IS NOT NULL\nGROUP BY error_code\nORDER BY error_count DESC, error_code ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(error_code)` counts non-NULL error codes.\n- Because the query already filters to non-NULL error codes, this matches row count.\n\n## Difference from the optimal approach\n\nWorks the same, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE errors",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH error_counts AS (\n  SELECT error_code, COUNT(*) AS error_count\n  FROM playback_events\n  WHERE error_code IS NOT NULL\n  GROUP BY error_code\n)\nSELECT error_code, error_count\nFROM error_counts\nORDER BY error_count DESC, error_code ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCalculate error counts in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH error_counts AS (\n  SELECT error_code, COUNT(*) AS error_count\n  FROM playback_events\n  WHERE error_code IS NOT NULL\n  GROUP BY error_code\n)\nSELECT error_code, error_count\nFROM error_counts\nORDER BY error_count DESC, error_code ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one count row per error code.\n- The outer query sorts them and returns the top 5.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed for this query."
      }
    ]
  },
  {
    "code": "MOVIES_051",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT country, title_id, total_views FROM (SELECT ae.country, vs.title_id, COUNT(*) AS total_views, ROW_NUMBER() OVER (PARTITION BY ae.country ORDER BY COUNT(*) DESC, vs.title_id ASC) AS rn FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id) ranked WHERE rn <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;",
        "explanation": "## Approach\n\nCount views per `(country, title)` pair, rank titles inside each country, then keep the top 5 per country.\n\n## Query\n\n```sql\nSELECT country, title_id, total_views\nFROM (\n  SELECT ae.country,\n         vs.title_id,\n         COUNT(*) AS total_views,\n         ROW_NUMBER() OVER (\n           PARTITION BY ae.country\n           ORDER BY COUNT(*) DESC, vs.title_id ASC\n         ) AS rn\n  FROM viewing_sessions vs\n  JOIN app_events ae\n    ON vs.profile_id = ae.profile_id\n   AND vs.title_id = ae.title_id\n  WHERE vs.title_id IS NOT NULL\n    AND ae.country IS NOT NULL\n  GROUP BY ae.country, vs.title_id\n) ranked\nWHERE rn <= 5\nORDER BY country ASC, total_views DESC, title_id ASC;\n```\n\n## Explanation\n\n- The join maps watched titles to a country using matching profile and title activity.\n- `GROUP BY ae.country, vs.title_id` counts how many times each title was viewed in each country.\n- `ROW_NUMBER()` ranks titles separately inside each country.\n- `WHERE rn <= 5` keeps only the top 5 titles for every country.\n\n## Why this is optimal\n\nThis is the standard top-N-per-group pattern and directly matches the requirement."
      },
      {
        "approach_title": "CTE rank",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH country_title_views AS (SELECT ae.country, vs.title_id, COUNT(*) AS total_views FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id), ranked AS (SELECT country, title_id, total_views, ROW_NUMBER() OVER (PARTITION BY country ORDER BY total_views DESC, title_id ASC) AS rn FROM country_title_views) SELECT country, title_id, total_views FROM ranked WHERE rn <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;",
        "explanation": "## Approach\n\nFirst compute counts per country-title pair in one CTE, then rank them in another CTE.\n\n## Query\n\n```sql\nWITH country_title_views AS (\n  SELECT ae.country, vs.title_id, COUNT(*) AS total_views\n  FROM viewing_sessions vs\n  JOIN app_events ae\n    ON vs.profile_id = ae.profile_id\n   AND vs.title_id = ae.title_id\n  WHERE vs.title_id IS NOT NULL\n    AND ae.country IS NOT NULL\n  GROUP BY ae.country, vs.title_id\n),\nranked AS (\n  SELECT country,\n         title_id,\n         total_views,\n         ROW_NUMBER() OVER (\n           PARTITION BY country\n           ORDER BY total_views DESC, title_id ASC\n         ) AS rn\n  FROM country_title_views\n)\nSELECT country, title_id, total_views\nFROM ranked\nWHERE rn <= 5\nORDER BY country ASC, total_views DESC, title_id ASC;\n```\n\n## Explanation\n\n- The first CTE builds the grouped counts.\n- The second CTE applies ranking within each country.\n- The final query keeps the first 5 ranked rows per country.\n\n## Difference from the optimal approach\n\nVery readable, but slightly longer."
      },
      {
        "approach_title": "RANK tie",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT country, title_id, total_views FROM (SELECT ae.country, vs.title_id, COUNT(*) AS total_views, RANK() OVER (PARTITION BY ae.country ORDER BY COUNT(*) DESC, vs.title_id ASC) AS rnk FROM viewing_sessions vs JOIN app_events ae ON vs.profile_id = ae.profile_id AND vs.title_id = ae.title_id WHERE vs.title_id IS NOT NULL AND ae.country IS NOT NULL GROUP BY ae.country, vs.title_id) ranked WHERE rnk <= 5 ORDER BY country ASC, total_views DESC, title_id ASC;",
        "explanation": "## Approach\n\nUse `RANK()` instead of `ROW_NUMBER()` after counting views per country and title.\n\n## Query\n\n```sql\nSELECT country, title_id, total_views\nFROM (\n  SELECT ae.country,\n         vs.title_id,\n         COUNT(*) AS total_views,\n         RANK() OVER (\n           PARTITION BY ae.country\n           ORDER BY COUNT(*) DESC, vs.title_id ASC\n         ) AS rnk\n  FROM viewing_sessions vs\n  JOIN app_events ae\n    ON vs.profile_id = ae.profile_id\n   AND vs.title_id = ae.title_id\n  WHERE vs.title_id IS NOT NULL\n    AND ae.country IS NOT NULL\n  GROUP BY ae.country, vs.title_id\n) ranked\nWHERE rnk <= 5\nORDER BY country ASC, total_views DESC, title_id ASC;\n```\n\n## Explanation\n\n- `RANK()` can return tied positions rather than forcing a unique row number.\n- This may return more than 5 rows for a country if ties happen at rank 5.\n\n## Difference from the optimal approach\n\nUseful when ties should share the same rank, but less strict for exactly 5 rows."
      }
    ]
  },
  {
    "code": "MOVIES_052",
    "approaches": [
      {
        "approach_title": "AVG top",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions GROUP BY profile_id ORDER BY avg_completion_percent DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nAverage completion percent per profile, then keep the top 5.\n\n## Query\n\n```sql\nSELECT profile_id,\n       ROUND(AVG(completion_percent), 2) AS avg_completion_percent\nFROM viewing_sessions\nGROUP BY profile_id\nORDER BY avg_completion_percent DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY profile_id` creates one group per profile.\n- `AVG(completion_percent)` computes the average completion for each profile.\n- `ROUND(..., 2)` formats the metric.\n- `LIMIT 5` returns the top 5 profiles.\n\n## Why this is optimal\n\nIt is the shortest way to compute and rank average completion."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH profile_completion AS (SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent FROM viewing_sessions GROUP BY profile_id) SELECT profile_id, avg_completion_percent FROM profile_completion ORDER BY avg_completion_percent DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute average completion per profile in a CTE, then rank the result.\n\n## Query\n\n```sql\nWITH profile_completion AS (\n  SELECT profile_id,\n         ROUND(AVG(completion_percent), 2) AS avg_completion_percent\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT profile_id, avg_completion_percent\nFROM profile_completion\nORDER BY avg_completion_percent DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one average row per profile.\n- The outer query applies ranking and limiting.\n\n## Difference from the optimal approach\n\nMore structured, but longer."
      },
      {
        "approach_title": "Rank avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, avg_completion_percent FROM (SELECT profile_id, ROUND(AVG(completion_percent), 2) AS avg_completion_percent, ROW_NUMBER() OVER (ORDER BY AVG(completion_percent) DESC, profile_id ASC) AS rn FROM viewing_sessions GROUP BY profile_id) ranked WHERE rn <= 5 ORDER BY avg_completion_percent DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCompute averages, assign row numbers, then keep the first five.\n\n## Query\n\n```sql\nSELECT profile_id, avg_completion_percent\nFROM (\n  SELECT profile_id,\n         ROUND(AVG(completion_percent), 2) AS avg_completion_percent,\n         ROW_NUMBER() OVER (\n           ORDER BY AVG(completion_percent) DESC, profile_id ASC\n         ) AS rn\n  FROM viewing_sessions\n  GROUP BY profile_id\n) ranked\nWHERE rn <= 5\nORDER BY avg_completion_percent DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The grouped query calculates average completion per profile.\n- `ROW_NUMBER()` ranks the profiles.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nMore flexible for advanced ranking, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_053",
    "approaches": [
      {
        "approach_title": "Join AVG",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT vs.title_id, ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL GROUP BY vs.title_id ORDER BY avg_buffer_duration_ms DESC, vs.title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin playback events to viewing sessions so buffer time can be grouped by title.\n\n## Query\n\n```sql\nSELECT vs.title_id,\n       ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms\nFROM playback_events pe\nJOIN viewing_sessions vs ON pe.session_id = vs.id\nWHERE vs.title_id IS NOT NULL\n  AND pe.buffer_duration_ms IS NOT NULL\nGROUP BY vs.title_id\nORDER BY avg_buffer_duration_ms DESC, vs.title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `playback_events` contains buffer duration values.\n- `viewing_sessions` maps each event back to a title.\n- `AVG(pe.buffer_duration_ms)` computes the mean buffer duration per title.\n- `LIMIT 5` returns the worst-buffering titles.\n\n## Why this is optimal\n\nIt directly connects the needed event metric to titles and aggregates it in one step."
      },
      {
        "approach_title": "CTE join",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_buffers AS (SELECT vs.title_id, pe.buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL) SELECT title_id, ROUND(AVG(buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM title_buffers GROUP BY title_id ORDER BY avg_buffer_duration_ms DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFirst build a title-buffer dataset, then average it per title.\n\n## Query\n\n```sql\nWITH title_buffers AS (\n  SELECT vs.title_id, pe.buffer_duration_ms\n  FROM playback_events pe\n  JOIN viewing_sessions vs ON pe.session_id = vs.id\n  WHERE vs.title_id IS NOT NULL\n    AND pe.buffer_duration_ms IS NOT NULL\n)\nSELECT title_id,\n       ROUND(AVG(buffer_duration_ms), 2) AS avg_buffer_duration_ms\nFROM title_buffers\nGROUP BY title_id\nORDER BY avg_buffer_duration_ms DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE isolates title-level buffer data.\n- The outer query performs the averaging and ranking.\n\n## Difference from the optimal approach\n\nEasy to read in steps, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, avg_buffer_duration_ms FROM (SELECT vs.title_id, ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms FROM playback_events pe JOIN viewing_sessions vs ON pe.session_id = vs.id WHERE vs.title_id IS NOT NULL AND pe.buffer_duration_ms IS NOT NULL GROUP BY vs.title_id) x ORDER BY avg_buffer_duration_ms DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute average buffer time per title in a subquery, then order outside.\n\n## Query\n\n```sql\nSELECT title_id, avg_buffer_duration_ms\nFROM (\n  SELECT vs.title_id,\n         ROUND(AVG(pe.buffer_duration_ms), 2) AS avg_buffer_duration_ms\n  FROM playback_events pe\n  JOIN viewing_sessions vs ON pe.session_id = vs.id\n  WHERE vs.title_id IS NOT NULL\n    AND pe.buffer_duration_ms IS NOT NULL\n  GROUP BY vs.title_id\n) x\nORDER BY avg_buffer_duration_ms DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query creates one average row per title.\n- The outer query ranks the result.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_054",
    "approaches": [
      {
        "approach_title": "Revenue join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.country, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id WHERE bi.invoice_status = 'paid' GROUP BY u.country ORDER BY total_revenue DESC, u.country ASC;",
        "explanation": "## Approach\n\nJoin paid invoices to subscriptions and users, then sum revenue per country.\n\n## Query\n\n```sql\nSELECT u.country,\n       ROUND(SUM(bi.total_amount), 2) AS total_revenue\nFROM billing_invoices bi\nJOIN subscriptions s ON bi.subscription_id = s.id\nJOIN users u ON s.user_id = u.id\nWHERE bi.invoice_status = 'paid'\nGROUP BY u.country\nORDER BY total_revenue DESC, u.country ASC;\n```\n\n## Explanation\n\n- `billing_invoices` contains invoice amounts.\n- `subscriptions` links each invoice to a user account.\n- `users` provides the country dimension.\n- `SUM(bi.total_amount)` adds paid invoice revenue by country.\n\n## Why this is optimal\n\nIt follows the natural relationship path and computes the grouped revenue directly."
      },
      {
        "approach_title": "CTE paid",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH paid_invoices AS (SELECT subscription_id, total_amount FROM billing_invoices WHERE invoice_status = 'paid') SELECT u.country, ROUND(SUM(pi.total_amount), 2) AS total_revenue FROM paid_invoices pi JOIN subscriptions s ON pi.subscription_id = s.id JOIN users u ON s.user_id = u.id GROUP BY u.country ORDER BY total_revenue DESC, u.country ASC;",
        "explanation": "## Approach\n\nFilter paid invoices first, then join them to users for country aggregation.\n\n## Query\n\n```sql\nWITH paid_invoices AS (\n  SELECT subscription_id, total_amount\n  FROM billing_invoices\n  WHERE invoice_status = 'paid'\n)\nSELECT u.country,\n       ROUND(SUM(pi.total_amount), 2) AS total_revenue\nFROM paid_invoices pi\nJOIN subscriptions s ON pi.subscription_id = s.id\nJOIN users u ON s.user_id = u.id\nGROUP BY u.country\nORDER BY total_revenue DESC, u.country ASC;\n```\n\n## Explanation\n\n- The CTE isolates the revenue rows that count.\n- The outer query maps those rows to user countries and sums them.\n\n## Difference from the optimal approach\n\nReadable, but slightly longer."
      },
      {
        "approach_title": "Subquery rev",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT country, ROUND(SUM(total_amount), 2) AS total_revenue FROM (SELECT u.country, bi.total_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id WHERE bi.invoice_status = 'paid') x GROUP BY country ORDER BY total_revenue DESC, country ASC;",
        "explanation": "## Approach\n\nCreate a country-and-amount dataset first, then aggregate outside.\n\n## Query\n\n```sql\nSELECT country,\n       ROUND(SUM(total_amount), 2) AS total_revenue\nFROM (\n  SELECT u.country, bi.total_amount\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN users u ON s.user_id = u.id\n  WHERE bi.invoice_status = 'paid'\n) x\nGROUP BY country\nORDER BY total_revenue DESC, country ASC;\n```\n\n## Explanation\n\n- The subquery resolves the joins first.\n- The outer query sums revenue per country.\n\n## Difference from the optimal approach\n\nCorrect, but the direct grouped join is cleaner."
      }
    ]
  },
  {
    "code": "MOVIES_055",
    "approaches": [
      {
        "approach_title": "Count search",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, COUNT(*) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id ORDER BY total_searches DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep rows with a profile id, count searches per profile, then return the top 5.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(*) AS total_searches\nFROM search_queries\nWHERE profile_id IS NOT NULL\nGROUP BY profile_id\nORDER BY total_searches DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `profile_id IS NOT NULL` removes anonymous or unmatched searches.\n- `GROUP BY profile_id` creates one search-count row per profile.\n- `COUNT(*)` returns the number of searches each profile made.\n- `LIMIT 5` keeps the most active searchers.\n\n## Why this is optimal\n\nIt directly measures search activity per profile with no extra steps."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT profile_id, COUNT(id) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id ORDER BY total_searches DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount search row ids for each profile.\n\n## Query\n\n```sql\nSELECT profile_id, COUNT(id) AS total_searches\nFROM search_queries\nWHERE profile_id IS NOT NULL\nGROUP BY profile_id\nORDER BY total_searches DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL search ids.\n- Since ids are primary keys, this matches row count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE search",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH profile_searches AS (SELECT profile_id, COUNT(*) AS total_searches FROM search_queries WHERE profile_id IS NOT NULL GROUP BY profile_id) SELECT profile_id, total_searches FROM profile_searches ORDER BY total_searches DESC, profile_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute search counts in a CTE, then rank the result.\n\n## Query\n\n```sql\nWITH profile_searches AS (\n  SELECT profile_id, COUNT(*) AS total_searches\n  FROM search_queries\n  WHERE profile_id IS NOT NULL\n  GROUP BY profile_id\n)\nSELECT profile_id, total_searches\nFROM profile_searches\nORDER BY total_searches DESC, profile_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one search count row per profile.\n- The outer query sorts and limits the output.\n\n## Difference from the optimal approach\n\nMore readable in steps, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_056",
    "approaches": [
      {
        "approach_title": "Distinct act",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM title_credits WHERE role_type = 'actor' GROUP BY person_id ORDER BY total_titles DESC, person_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep actor credits only, then count distinct titles per actor.\n\n## Query\n\n```sql\nSELECT person_id,\n       COUNT(DISTINCT title_id) AS total_titles\nFROM title_credits\nWHERE role_type = 'actor'\nGROUP BY person_id\nORDER BY total_titles DESC, person_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE role_type = 'actor'` filters to acting credits only.\n- `COUNT(DISTINCT title_id)` ensures each title is counted once per actor.\n- `LIMIT 5` returns the actors appearing in the most titles.\n\n## Why this is optimal\n\nUsing `DISTINCT` is important here because the same actor should only count once per title."
      },
      {
        "approach_title": "CTE actor",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH actor_titles AS (SELECT person_id, title_id FROM title_credits WHERE role_type = 'actor') SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM actor_titles GROUP BY person_id ORDER BY total_titles DESC, person_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFirst isolate actor-title pairs, then count distinct titles per actor.\n\n## Query\n\n```sql\nWITH actor_titles AS (\n  SELECT person_id, title_id\n  FROM title_credits\n  WHERE role_type = 'actor'\n)\nSELECT person_id,\n       COUNT(DISTINCT title_id) AS total_titles\nFROM actor_titles\nGROUP BY person_id\nORDER BY total_titles DESC, person_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE captures only actor credits.\n- The outer query counts how many different titles each actor appeared in.\n\n## Difference from the optimal approach\n\nA nice two-step version, but longer."
      },
      {
        "approach_title": "Subquery act",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT person_id, total_titles FROM (SELECT person_id, COUNT(DISTINCT title_id) AS total_titles FROM title_credits WHERE role_type = 'actor' GROUP BY person_id) x ORDER BY total_titles DESC, person_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCalculate title counts in a subquery and rank outside.\n\n## Query\n\n```sql\nSELECT person_id, total_titles\nFROM (\n  SELECT person_id,\n         COUNT(DISTINCT title_id) AS total_titles\n  FROM title_credits\n  WHERE role_type = 'actor'\n  GROUP BY person_id\n) x\nORDER BY total_titles DESC, person_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query creates one count row per actor.\n- The outer query sorts the actors and keeps the top 5.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_057",
    "approaches": [
      {
        "approach_title": "Top down",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, COUNT(*) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id ORDER BY total_downloads DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep completed title downloads, count them per title, then return the top 5.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(*) AS total_downloads\nFROM downloads\nWHERE title_id IS NOT NULL\n  AND download_status = 'completed'\nGROUP BY title_id\nORDER BY total_downloads DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `title_id IS NOT NULL` keeps title-level downloads only.\n- `download_status = 'completed'` keeps finished downloads only.\n- `COUNT(*)` measures how many completed downloads each title has.\n- `LIMIT 5` returns the most downloaded titles.\n\n## Why this is optimal\n\nIt directly answers the question using the relevant filters and grouping."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT title_id, COUNT(id) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id ORDER BY total_downloads DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount completed download ids per title.\n\n## Query\n\n```sql\nSELECT title_id, COUNT(id) AS total_downloads\nFROM downloads\nWHERE title_id IS NOT NULL\n  AND download_status = 'completed'\nGROUP BY title_id\nORDER BY total_downloads DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL download ids.\n- Since `id` is never NULL, this matches row count.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE down",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_title_downloads AS (SELECT title_id, COUNT(*) AS total_downloads FROM downloads WHERE title_id IS NOT NULL AND download_status = 'completed' GROUP BY title_id) SELECT title_id, total_downloads FROM completed_title_downloads ORDER BY total_downloads DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute completed download counts in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH completed_title_downloads AS (\n  SELECT title_id, COUNT(*) AS total_downloads\n  FROM downloads\n  WHERE title_id IS NOT NULL\n    AND download_status = 'completed'\n  GROUP BY title_id\n)\nSELECT title_id, total_downloads\nFROM completed_title_downloads\nORDER BY total_downloads DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one count row per title.\n- The outer query returns the top 5 by download count.\n\n## Difference from the optimal approach\n\nMore readable in steps, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_058",
    "approaches": [
      {
        "approach_title": "HAVING dev",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.user_id, COUNT(DISTINCT d.id) AS device_count FROM devices d GROUP BY d.user_id HAVING COUNT(DISTINCT d.id) > 1 ORDER BY device_count DESC, d.user_id ASC;",
        "explanation": "## Approach\n\nGroup devices by user, count distinct devices, then keep users with more than one.\n\n## Query\n\n```sql\nSELECT d.user_id,\n       COUNT(DISTINCT d.id) AS device_count\nFROM devices d\nGROUP BY d.user_id\nHAVING COUNT(DISTINCT d.id) > 1\nORDER BY device_count DESC, d.user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY d.user_id` creates one group per user.\n- `COUNT(DISTINCT d.id)` measures how many different devices each user has used.\n- `HAVING ... > 1` keeps only multi-device users.\n\n## Why this is optimal\n\nIt is the standard grouped-filter pattern and directly matches the requirement."
      },
      {
        "approach_title": "COUNT only",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT d.user_id, COUNT(d.id) AS device_count FROM devices d GROUP BY d.user_id HAVING COUNT(d.id) > 1 ORDER BY device_count DESC, d.user_id ASC;",
        "explanation": "## Approach\n\nCount device rows per user and keep counts above one.\n\n## Query\n\n```sql\nSELECT d.user_id,\n       COUNT(d.id) AS device_count\nFROM devices d\nGROUP BY d.user_id\nHAVING COUNT(d.id) > 1\nORDER BY device_count DESC, d.user_id ASC;\n```\n\n## Explanation\n\n- This works because `id` uniquely identifies a device row.\n- It produces the same result when each device row is unique.\n\n## Difference from the optimal approach\n\nStill correct here, but `COUNT(DISTINCT d.id)` is more defensive and explicit."
      },
      {
        "approach_title": "CTE dev",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH user_devices AS (SELECT d.user_id, COUNT(DISTINCT d.id) AS device_count FROM devices d GROUP BY d.user_id) SELECT user_id, device_count FROM user_devices WHERE device_count > 1 ORDER BY device_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nCompute device counts per user first, then filter outside.\n\n## Query\n\n```sql\nWITH user_devices AS (\n  SELECT d.user_id,\n         COUNT(DISTINCT d.id) AS device_count\n  FROM devices d\n  GROUP BY d.user_id\n)\nSELECT user_id, device_count\nFROM user_devices\nWHERE device_count > 1\nORDER BY device_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE builds one count row per user.\n- The outer query keeps only users with more than one device.\n\n## Difference from the optimal approach\n\nClear in steps, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_059",
    "approaches": [
      {
        "approach_title": "Click count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT campaign_id, COUNT(*) AS click_count FROM notification_deliveries WHERE clicked_at IS NOT NULL GROUP BY campaign_id ORDER BY click_count DESC, campaign_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep deliveries that were clicked, count them per campaign, then return the top 5.\n\n## Query\n\n```sql\nSELECT campaign_id, COUNT(*) AS click_count\nFROM notification_deliveries\nWHERE clicked_at IS NOT NULL\nGROUP BY campaign_id\nORDER BY click_count DESC, campaign_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `clicked_at IS NOT NULL` identifies successful clicks.\n- `GROUP BY campaign_id` groups those clicks by campaign.\n- `COUNT(*)` returns total clicks for each campaign.\n- `LIMIT 5` keeps the highest-click campaigns.\n\n## Why this is optimal\n\nIt directly measures campaign click success using the clearest filter."
      },
      {
        "approach_title": "FILTER agg",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT campaign_id, COUNT(*) FILTER (WHERE clicked_at IS NOT NULL) AS click_count FROM notification_deliveries GROUP BY campaign_id ORDER BY click_count DESC, campaign_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nUse `FILTER` to count only clicked deliveries within each campaign group.\n\n## Query\n\n```sql\nSELECT campaign_id,\n       COUNT(*) FILTER (WHERE clicked_at IS NOT NULL) AS click_count\nFROM notification_deliveries\nGROUP BY campaign_id\nORDER BY click_count DESC, campaign_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `FILTER` applies the click condition inside the aggregate.\n- This is helpful when combining multiple campaign metrics in one query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric."
      },
      {
        "approach_title": "CTE click",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH campaign_clicks AS (SELECT campaign_id, COUNT(*) AS click_count FROM notification_deliveries WHERE clicked_at IS NOT NULL GROUP BY campaign_id) SELECT campaign_id, click_count FROM campaign_clicks ORDER BY click_count DESC, campaign_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute click counts in a CTE, then rank the result.\n\n## Query\n\n```sql\nWITH campaign_clicks AS (\n  SELECT campaign_id, COUNT(*) AS click_count\n  FROM notification_deliveries\n  WHERE clicked_at IS NOT NULL\n  GROUP BY campaign_id\n)\nSELECT campaign_id, click_count\nFROM campaign_clicks\nORDER BY click_count DESC, campaign_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one click count row per campaign.\n- The outer query sorts and limits it.\n\n## Difference from the optimal approach\n\nMore readable in steps, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_060",
    "approaches": [
      {
        "approach_title": "Join AVG",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.device_type, ROUND(AVG(vs.watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id GROUP BY d.device_type ORDER BY avg_watch_time_seconds DESC, d.device_type ASC;",
        "explanation": "## Approach\n\nJoin viewing sessions to devices, then average watch time by device type.\n\n## Query\n\n```sql\nSELECT d.device_type,\n       ROUND(AVG(vs.watch_time_seconds), 2) AS avg_watch_time_seconds\nFROM viewing_sessions vs\nJOIN devices d ON vs.device_id = d.id\nGROUP BY d.device_type\nORDER BY avg_watch_time_seconds DESC, d.device_type ASC;\n```\n\n## Explanation\n\n- `viewing_sessions` contains watch time values.\n- `devices` provides the `device_type` used for grouping.\n- `AVG(vs.watch_time_seconds)` computes average watch time per device type.\n- `ROUND(..., 2)` formats the output.\n\n## Why this is optimal\n\nIt directly connects the measure to the grouping dimension in one query."
      },
      {
        "approach_title": "CTE map",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH device_watch AS (SELECT d.device_type, vs.watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id) SELECT device_type, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM device_watch GROUP BY device_type ORDER BY avg_watch_time_seconds DESC, device_type ASC;",
        "explanation": "## Approach\n\nBuild a device-type and watch-time dataset first, then average outside.\n\n## Query\n\n```sql\nWITH device_watch AS (\n  SELECT d.device_type, vs.watch_time_seconds\n  FROM viewing_sessions vs\n  JOIN devices d ON vs.device_id = d.id\n)\nSELECT device_type,\n       ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\nFROM device_watch\nGROUP BY device_type\nORDER BY avg_watch_time_seconds DESC, device_type ASC;\n```\n\n## Explanation\n\n- The CTE simplifies the joined data to just the needed columns.\n- The outer query computes the grouped average.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT device_type, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM (SELECT d.device_type, vs.watch_time_seconds FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id) x GROUP BY device_type ORDER BY avg_watch_time_seconds DESC, device_type ASC;",
        "explanation": "## Approach\n\nResolve the join in a subquery, then compute the average by device type.\n\n## Query\n\n```sql\nSELECT device_type,\n       ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\nFROM (\n  SELECT d.device_type, vs.watch_time_seconds\n  FROM viewing_sessions vs\n  JOIN devices d ON vs.device_id = d.id\n) x\nGROUP BY device_type\nORDER BY avg_watch_time_seconds DESC, device_type ASC;\n```\n\n## Explanation\n\n- The inner query produces a simple device-type plus watch-time dataset.\n- The outer query groups and averages it.\n\n## Difference from the optimal approach\n\nCorrect, but the direct join version is cleaner."
      }
    ]
  },
  {
    "code": "MOVIES_061",
    "approaches": [
      {
        "approach_title": "Month sum",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at) ORDER BY revenue_month ASC;",
        "explanation": "## Approach\n\nGroup paid invoices by month and sum their total amounts.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', issued_at) AS revenue_month,\n       ROUND(SUM(total_amount), 2) AS total_revenue\nFROM billing_invoices\nWHERE invoice_status = 'paid'\nGROUP BY DATE_TRUNC('month', issued_at)\nORDER BY revenue_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', issued_at)` converts each invoice date into its month bucket.\n- `WHERE invoice_status = 'paid'` keeps only realized revenue.\n- `SUM(total_amount)` adds invoice totals inside each month.\n- `ROUND(..., 2)` formats the revenue value.\n\n## Why this is optimal\n\nIt is the cleanest way to build a monthly revenue trend from paid invoices."
      },
      {
        "approach_title": "CTE month",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_revenue AS (SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at)) SELECT revenue_month, total_revenue FROM monthly_revenue ORDER BY revenue_month ASC;",
        "explanation": "## Approach\n\nCompute monthly revenue in a CTE, then return it in order.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT DATE_TRUNC('month', issued_at) AS revenue_month,\n         ROUND(SUM(total_amount), 2) AS total_revenue\n  FROM billing_invoices\n  WHERE invoice_status = 'paid'\n  GROUP BY DATE_TRUNC('month', issued_at)\n)\nSELECT revenue_month, total_revenue\nFROM monthly_revenue\nORDER BY revenue_month ASC;\n```\n\n## Explanation\n\n- The CTE stores one revenue row per month.\n- The outer query applies final ordering.\n- This is useful if you want to join the monthly trend with other metrics later.\n\n## Difference from the optimal approach\n\nMore structured, but longer than needed."
      },
      {
        "approach_title": "Subquery sum",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT revenue_month, total_revenue FROM (SELECT DATE_TRUNC('month', issued_at) AS revenue_month, ROUND(SUM(total_amount), 2) AS total_revenue FROM billing_invoices WHERE invoice_status = 'paid' GROUP BY DATE_TRUNC('month', issued_at)) x ORDER BY revenue_month ASC;",
        "explanation": "## Approach\n\nBuild the monthly revenue result in a subquery and sort it outside.\n\n## Query\n\n```sql\nSELECT revenue_month, total_revenue\nFROM (\n  SELECT DATE_TRUNC('month', issued_at) AS revenue_month,\n         ROUND(SUM(total_amount), 2) AS total_revenue\n  FROM billing_invoices\n  WHERE invoice_status = 'paid'\n  GROUP BY DATE_TRUNC('month', issued_at)\n) x\nORDER BY revenue_month ASC;\n```\n\n## Explanation\n\n- The inner query computes revenue per month.\n- The outer query returns those rows in chronological order.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than the single-query version."
      }
    ]
  },
  {
    "code": "MOVIES_062",
    "approaches": [
      {
        "approach_title": "Month count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at) ORDER BY signup_month ASC;",
        "explanation": "## Approach\n\nGroup subscriptions by start month and count how many began in each month.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', started_at) AS signup_month,\n       COUNT(*) AS new_subscribers\nFROM subscriptions\nGROUP BY DATE_TRUNC('month', started_at)\nORDER BY signup_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', started_at)` converts each subscription start time into a month bucket.\n- `COUNT(*)` counts how many subscriptions started in each month.\n- Sorting by month ascending gives a trend over time.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to build a monthly new-subscriber trend."
      },
      {
        "approach_title": "CTE month",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_subscribers AS (SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at)) SELECT signup_month, new_subscribers FROM monthly_subscribers ORDER BY signup_month ASC;",
        "explanation": "## Approach\n\nCompute subscription starts by month in a CTE, then return the result.\n\n## Query\n\n```sql\nWITH monthly_subscribers AS (\n  SELECT DATE_TRUNC('month', started_at) AS signup_month,\n         COUNT(*) AS new_subscribers\n  FROM subscriptions\n  GROUP BY DATE_TRUNC('month', started_at)\n)\nSELECT signup_month, new_subscribers\nFROM monthly_subscribers\nORDER BY signup_month ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per start month.\n- The outer query handles final ordering.\n\n## Difference from the optimal approach\n\nClear in steps, but longer."
      },
      {
        "approach_title": "Subquery count",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT signup_month, new_subscribers FROM (SELECT DATE_TRUNC('month', started_at) AS signup_month, COUNT(*) AS new_subscribers FROM subscriptions GROUP BY DATE_TRUNC('month', started_at)) x ORDER BY signup_month ASC;",
        "explanation": "## Approach\n\nUse a subquery to compute monthly subscription counts, then sort outside.\n\n## Query\n\n```sql\nSELECT signup_month, new_subscribers\nFROM (\n  SELECT DATE_TRUNC('month', started_at) AS signup_month,\n         COUNT(*) AS new_subscribers\n  FROM subscriptions\n  GROUP BY DATE_TRUNC('month', started_at)\n) x\nORDER BY signup_month ASC;\n```\n\n## Explanation\n\n- The inner query creates the monthly grouped counts.\n- The outer query returns them in time order.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_063",
    "approaches": [
      {
        "approach_title": "Join avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT tc.person_id, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor' GROUP BY tc.person_id ORDER BY avg_rating DESC, tc.person_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin actor credits to title ratings, then average ratings for each actor's titles.\n\n## Query\n\n```sql\nSELECT tc.person_id,\n       ROUND(AVG(r.rating_value), 2) AS avg_rating\nFROM title_credits tc\nJOIN ratings r ON tc.title_id = r.title_id\nWHERE tc.role_type = 'actor'\nGROUP BY tc.person_id\nORDER BY avg_rating DESC, tc.person_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `title_credits` tells us which actors are attached to which titles.\n- `ratings` gives the rating values for those titles.\n- `WHERE tc.role_type = 'actor'` keeps only actor credits.\n- `AVG(r.rating_value)` computes the mean rating across titles associated with each actor.\n\n## Why this is optimal\n\nIt directly connects actors to title ratings using the simplest join path."
      },
      {
        "approach_title": "CTE actor",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH actor_title_ratings AS (SELECT tc.person_id, r.rating_value FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor') SELECT person_id, ROUND(AVG(rating_value), 2) AS avg_rating FROM actor_title_ratings GROUP BY person_id ORDER BY avg_rating DESC, person_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFirst build a dataset of actors and rating values, then average by actor.\n\n## Query\n\n```sql\nWITH actor_title_ratings AS (\n  SELECT tc.person_id, r.rating_value\n  FROM title_credits tc\n  JOIN ratings r ON tc.title_id = r.title_id\n  WHERE tc.role_type = 'actor'\n)\nSELECT person_id,\n       ROUND(AVG(rating_value), 2) AS avg_rating\nFROM actor_title_ratings\nGROUP BY person_id\nORDER BY avg_rating DESC, person_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE isolates actor-rating pairs.\n- The outer query calculates the average rating per actor.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT person_id, avg_rating FROM (SELECT tc.person_id, ROUND(AVG(r.rating_value), 2) AS avg_rating FROM title_credits tc JOIN ratings r ON tc.title_id = r.title_id WHERE tc.role_type = 'actor' GROUP BY tc.person_id) x ORDER BY avg_rating DESC, person_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute average actor rating in a subquery and rank outside.\n\n## Query\n\n```sql\nSELECT person_id, avg_rating\nFROM (\n  SELECT tc.person_id,\n         ROUND(AVG(r.rating_value), 2) AS avg_rating\n  FROM title_credits tc\n  JOIN ratings r ON tc.title_id = r.title_id\n  WHERE tc.role_type = 'actor'\n  GROUP BY tc.person_id\n) x\nORDER BY avg_rating DESC, person_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query calculates one average row per actor.\n- The outer query sorts the result and keeps the top 5.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_064",
    "approaches": [
      {
        "approach_title": "Distinct cat",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id HAVING COUNT(DISTINCT tc.category_id) > 3 ORDER BY category_count DESC, vs.profile_id ASC;",
        "explanation": "## Approach\n\nJoin watched titles to their categories, count distinct categories per profile, then keep profiles above the threshold.\n\n## Query\n\n```sql\nSELECT vs.profile_id,\n       COUNT(DISTINCT tc.category_id) AS category_count\nFROM viewing_sessions vs\nJOIN title_categories tc ON vs.title_id = tc.title_id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.profile_id\nHAVING COUNT(DISTINCT tc.category_id) > 3\nORDER BY category_count DESC, vs.profile_id ASC;\n```\n\n## Explanation\n\n- `viewing_sessions` tells us which titles each profile watched.\n- `title_categories` maps those titles to categories.\n- `COUNT(DISTINCT tc.category_id)` measures category variety for each profile.\n- `HAVING ... > 3` keeps only profiles who watched more than 3 distinct categories.\n\n## Why this is optimal\n\nIt directly measures cross-category viewing breadth using the right distinct count."
      },
      {
        "approach_title": "CTE cats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH profile_categories AS (SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id) SELECT profile_id, category_count FROM profile_categories WHERE category_count > 3 ORDER BY category_count DESC, profile_id ASC;",
        "explanation": "## Approach\n\nFirst compute category counts per profile, then filter outside.\n\n## Query\n\n```sql\nWITH profile_categories AS (\n  SELECT vs.profile_id,\n         COUNT(DISTINCT tc.category_id) AS category_count\n  FROM viewing_sessions vs\n  JOIN title_categories tc ON vs.title_id = tc.title_id\n  WHERE vs.title_id IS NOT NULL\n  GROUP BY vs.profile_id\n)\nSELECT profile_id, category_count\nFROM profile_categories\nWHERE category_count > 3\nORDER BY category_count DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The CTE builds one category-count row per profile.\n- The outer query keeps only rows above the threshold.\n\n## Difference from the optimal approach\n\nEasier to read in two steps, but longer."
      },
      {
        "approach_title": "Join having",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS category_count FROM title_categories tc JOIN viewing_sessions vs ON tc.title_id = vs.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id HAVING COUNT(DISTINCT tc.category_id) > 3 ORDER BY category_count DESC, vs.profile_id ASC;",
        "explanation": "## Approach\n\nStart from title categories and join to viewing sessions, then count distinct categories per profile.\n\n## Query\n\n```sql\nSELECT vs.profile_id,\n       COUNT(DISTINCT tc.category_id) AS category_count\nFROM title_categories tc\nJOIN viewing_sessions vs ON tc.title_id = vs.title_id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.profile_id\nHAVING COUNT(DISTINCT tc.category_id) > 3\nORDER BY category_count DESC, vs.profile_id ASC;\n```\n\n## Explanation\n\n- The join path is the same, only the table order is different.\n- It still computes distinct category breadth for each profile.\n\n## Difference from the optimal approach\n\nCorrect, but starting from viewing sessions is slightly more intuitive."
      }
    ]
  },
  {
    "code": "MOVIES_065",
    "approaches": [
      {
        "approach_title": "Top query",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT query_text, COUNT(*) AS search_count FROM search_queries GROUP BY query_text ORDER BY search_count DESC, query_text ASC LIMIT 10;",
        "explanation": "## Approach\n\nGroup rows by query text, count searches, then keep the top 10.\n\n## Query\n\n```sql\nSELECT query_text,\n       COUNT(*) AS search_count\nFROM search_queries\nGROUP BY query_text\nORDER BY search_count DESC, query_text ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `GROUP BY query_text` creates one group per search term.\n- `COUNT(*)` counts how many times each term was searched.\n- `LIMIT 10` returns the top 10 most searched terms.\n\n## Why this is optimal\n\nIt is the simplest and clearest grouped frequency query for search terms."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT query_text, COUNT(id) AS search_count FROM search_queries GROUP BY query_text ORDER BY search_count DESC, query_text ASC LIMIT 10;",
        "explanation": "## Approach\n\nCount search row ids for each query term.\n\n## Query\n\n```sql\nSELECT query_text,\n       COUNT(id) AS search_count\nFROM search_queries\nGROUP BY query_text\nORDER BY search_count DESC, query_text ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL search ids.\n- Since `id` is always present, it matches row count.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct."
      },
      {
        "approach_title": "CTE query",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH query_counts AS (SELECT query_text, COUNT(*) AS search_count FROM search_queries GROUP BY query_text) SELECT query_text, search_count FROM query_counts ORDER BY search_count DESC, query_text ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute search counts in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH query_counts AS (\n  SELECT query_text,\n         COUNT(*) AS search_count\n  FROM search_queries\n  GROUP BY query_text\n)\nSELECT query_text, search_count\nFROM query_counts\nORDER BY search_count DESC, query_text ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one count row per search term.\n- The outer query sorts the result and keeps the top 10.\n\n## Difference from the optimal approach\n\nMore structured, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_066",
    "approaches": [
      {
        "approach_title": "CTR join",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT rr.id, rr.row_name, ROUND(COUNT(rc.id)::numeric * 100 / COUNT(ri.id), 2) AS ctr_percent FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name ORDER BY ctr_percent DESC, rr.id ASC;",
        "explanation": "## Approach\n\nJoin recommendation rows to impressions, then left join clicks so both impressions and clicks can be counted for CTR.\n\n## Query\n\n```sql\nSELECT rr.id,\n       rr.row_name,\n       ROUND(COUNT(rc.id)::numeric * 100 / COUNT(ri.id), 2) AS ctr_percent\nFROM recommendation_rows rr\nJOIN recommendation_impressions ri ON rr.id = ri.row_id\nLEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\nGROUP BY rr.id, rr.row_name\nORDER BY ctr_percent DESC, rr.id ASC;\n```\n\n## Explanation\n\n- `recommendation_impressions` gives total times a row was shown.\n- `recommendation_clicks` gives which impressions turned into clicks.\n- `LEFT JOIN` is important so rows with zero clicks still remain in the result.\n- `COUNT(rc.id) / COUNT(ri.id)` calculates click-through rate.\n\n## Why this is optimal\n\nIt directly models the CTR formula using the correct join pattern."
      },
      {
        "approach_title": "CTE ctr",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH row_metrics AS (SELECT rr.id, rr.row_name, COUNT(ri.id) AS impressions, COUNT(rc.id) AS clicks FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name) SELECT id, row_name, ROUND(clicks::numeric * 100 / impressions, 2) AS ctr_percent FROM row_metrics ORDER BY ctr_percent DESC, id ASC;",
        "explanation": "## Approach\n\nFirst compute impressions and clicks per row, then calculate CTR outside.\n\n## Query\n\n```sql\nWITH row_metrics AS (\n  SELECT rr.id,\n         rr.row_name,\n         COUNT(ri.id) AS impressions,\n         COUNT(rc.id) AS clicks\n  FROM recommendation_rows rr\n  JOIN recommendation_impressions ri ON rr.id = ri.row_id\n  LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n  GROUP BY rr.id, rr.row_name\n)\nSELECT id,\n       row_name,\n       ROUND(clicks::numeric * 100 / impressions, 2) AS ctr_percent\nFROM row_metrics\nORDER BY ctr_percent DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the numerator and denominator separately.\n- The outer query performs the CTR calculation.\n- This is useful if you also want to expose clicks and impressions later.\n\n## Difference from the optimal approach\n\nMore flexible, but longer."
      },
      {
        "approach_title": "Subquery ctr",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, row_name, ROUND(clicks::numeric * 100 / impressions, 2) AS ctr_percent FROM (SELECT rr.id, rr.row_name, COUNT(ri.id) AS impressions, COUNT(rc.id) AS clicks FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY rr.id, rr.row_name) x ORDER BY ctr_percent DESC, id ASC;",
        "explanation": "## Approach\n\nBuild impression and click counts in a subquery, then calculate CTR outside.\n\n## Query\n\n```sql\nSELECT id,\n       row_name,\n       ROUND(clicks::numeric * 100 / impressions, 2) AS ctr_percent\nFROM (\n  SELECT rr.id,\n         rr.row_name,\n         COUNT(ri.id) AS impressions,\n         COUNT(rc.id) AS clicks\n  FROM recommendation_rows rr\n  JOIN recommendation_impressions ri ON rr.id = ri.row_id\n  LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n  GROUP BY rr.id, rr.row_name\n) x\nORDER BY ctr_percent DESC, id ASC;\n```\n\n## Explanation\n\n- The inner query collects impressions and clicks per row.\n- The outer query converts those metrics into CTR.\n\n## Difference from the optimal approach\n\nCorrect, but the direct join version is shorter."
      }
    ]
  },
  {
    "code": "MOVIES_067",
    "approaches": [
      {
        "approach_title": "Date range",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days' ORDER BY license_end ASC, title_id ASC;",
        "explanation": "## Approach\n\nFilter license rows whose end date falls within the next 30 days.\n\n## Query\n\n```sql\nSELECT title_id, licensed_region, license_end\nFROM content_licenses\nWHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days'\nORDER BY license_end ASC, title_id ASC;\n```\n\n## Explanation\n\n- `BETWEEN NOW() AND NOW() + INTERVAL '30 days'` keeps only near-expiry licenses.\n- Sorting by `license_end ASC` shows the most urgent expiries first.\n- `title_id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nIt expresses the date-window condition very clearly and concisely."
      },
      {
        "approach_title": "Bound checks",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end >= NOW() AND license_end <= NOW() + INTERVAL '30 days' ORDER BY license_end ASC, title_id ASC;",
        "explanation": "## Approach\n\nUse explicit lower and upper bounds instead of `BETWEEN`.\n\n## Query\n\n```sql\nSELECT title_id, licensed_region, license_end\nFROM content_licenses\nWHERE license_end >= NOW()\n  AND license_end <= NOW() + INTERVAL '30 days'\nORDER BY license_end ASC, title_id ASC;\n```\n\n## Explanation\n\n- The first condition removes already expired licenses.\n- The second condition caps the window at the next 30 days.\n- The result is the same as the `BETWEEN` version.\n\n## Difference from the optimal approach\n\nSame logic, but a little more verbose."
      },
      {
        "approach_title": "CTE expiry",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH expiring_licenses AS (SELECT title_id, licensed_region, license_end FROM content_licenses WHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days') SELECT title_id, licensed_region, license_end FROM expiring_licenses ORDER BY license_end ASC, title_id ASC;",
        "explanation": "## Approach\n\nStore near-expiry licenses in a CTE, then return them in order.\n\n## Query\n\n```sql\nWITH expiring_licenses AS (\n  SELECT title_id, licensed_region, license_end\n  FROM content_licenses\n  WHERE license_end BETWEEN NOW() AND NOW() + INTERVAL '30 days'\n)\nSELECT title_id, licensed_region, license_end\nFROM expiring_licenses\nORDER BY license_end ASC, title_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the license rows that match the time window.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nMore structured, but not necessary here."
      }
    ]
  },
  {
    "code": "MOVIES_068",
    "approaches": [
      {
        "approach_title": "Group buffer",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id HAVING SUM(buffer_duration_ms) > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;",
        "explanation": "## Approach\n\nSum buffer duration per session, then keep sessions above 10 seconds total buffering.\n\n## Query\n\n```sql\nSELECT session_id,\n       SUM(buffer_duration_ms) AS total_buffer_ms\nFROM playback_events\nWHERE buffer_duration_ms IS NOT NULL\nGROUP BY session_id\nHAVING SUM(buffer_duration_ms) > 10000\nORDER BY total_buffer_ms DESC, session_id ASC;\n```\n\n## Explanation\n\n- `buffer_duration_ms IS NOT NULL` keeps only events that have buffer values.\n- `SUM(buffer_duration_ms)` computes total buffering for each session.\n- `HAVING ... > 10000` filters to sessions above 10,000 ms.\n\n## Why this is optimal\n\nIt is the standard grouped-sum plus grouped-filter pattern."
      },
      {
        "approach_title": "CTE sum",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH session_buffers AS (SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id) SELECT session_id, total_buffer_ms FROM session_buffers WHERE total_buffer_ms > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;",
        "explanation": "## Approach\n\nCompute total buffering per session first, then filter outside.\n\n## Query\n\n```sql\nWITH session_buffers AS (\n  SELECT session_id,\n         SUM(buffer_duration_ms) AS total_buffer_ms\n  FROM playback_events\n  WHERE buffer_duration_ms IS NOT NULL\n  GROUP BY session_id\n)\nSELECT session_id, total_buffer_ms\nFROM session_buffers\nWHERE total_buffer_ms > 10000\nORDER BY total_buffer_ms DESC, session_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one total-buffer row per session.\n- The outer query filters to sessions above the threshold.\n\n## Difference from the optimal approach\n\nEasy to read in steps, but longer."
      },
      {
        "approach_title": "Subquery sum",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT session_id, total_buffer_ms FROM (SELECT session_id, SUM(buffer_duration_ms) AS total_buffer_ms FROM playback_events WHERE buffer_duration_ms IS NOT NULL GROUP BY session_id) x WHERE total_buffer_ms > 10000 ORDER BY total_buffer_ms DESC, session_id ASC;",
        "explanation": "## Approach\n\nCalculate total buffering in a subquery and filter outside.\n\n## Query\n\n```sql\nSELECT session_id, total_buffer_ms\nFROM (\n  SELECT session_id,\n         SUM(buffer_duration_ms) AS total_buffer_ms\n  FROM playback_events\n  WHERE buffer_duration_ms IS NOT NULL\n  GROUP BY session_id\n) x\nWHERE total_buffer_ms > 10000\nORDER BY total_buffer_ms DESC, session_id ASC;\n```\n\n## Explanation\n\n- The inner query builds the grouped totals.\n- The outer query keeps only sessions above the threshold.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_069",
    "approaches": [
      {
        "approach_title": "HAVING drop",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, COUNT(*) AS abandoned_sessions FROM viewing_sessions WHERE session_status = 'abandoned' GROUP BY profile_id HAVING COUNT(*) > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;",
        "explanation": "## Approach\n\nKeep abandoned sessions only, count them per profile, then keep profiles with more than 5.\n\n## Query\n\n```sql\nSELECT profile_id,\n       COUNT(*) AS abandoned_sessions\nFROM viewing_sessions\nWHERE session_status = 'abandoned'\nGROUP BY profile_id\nHAVING COUNT(*) > 5\nORDER BY abandoned_sessions DESC, profile_id ASC;\n```\n\n## Explanation\n\n- `WHERE session_status = 'abandoned'` filters to abandoned sessions only.\n- `GROUP BY profile_id` creates one row per profile.\n- `COUNT(*)` counts abandoned sessions for each profile.\n- `HAVING COUNT(*) > 5` keeps only profiles above the threshold.\n\n## Why this is optimal\n\nIt is the most direct grouped-count and grouped-filter solution."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH abandoned_counts AS (SELECT profile_id, COUNT(*) AS abandoned_sessions FROM viewing_sessions WHERE session_status = 'abandoned' GROUP BY profile_id) SELECT profile_id, abandoned_sessions FROM abandoned_counts WHERE abandoned_sessions > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;",
        "explanation": "## Approach\n\nCompute abandoned session counts first, then filter outside.\n\n## Query\n\n```sql\nWITH abandoned_counts AS (\n  SELECT profile_id,\n         COUNT(*) AS abandoned_sessions\n  FROM viewing_sessions\n  WHERE session_status = 'abandoned'\n  GROUP BY profile_id\n)\nSELECT profile_id, abandoned_sessions\nFROM abandoned_counts\nWHERE abandoned_sessions > 5\nORDER BY abandoned_sessions DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one abandoned-session count per profile.\n- The outer query keeps only profiles above 5.\n\n## Difference from the optimal approach\n\nReadable in two steps, but longer."
      },
      {
        "approach_title": "FILTER agg",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, COUNT(*) FILTER (WHERE session_status = 'abandoned') AS abandoned_sessions FROM viewing_sessions GROUP BY profile_id HAVING COUNT(*) FILTER (WHERE session_status = 'abandoned') > 5 ORDER BY abandoned_sessions DESC, profile_id ASC;",
        "explanation": "## Approach\n\nUse `FILTER` to count abandoned sessions within each profile group.\n\n## Query\n\n```sql\nSELECT profile_id,\n       COUNT(*) FILTER (WHERE session_status = 'abandoned') AS abandoned_sessions\nFROM viewing_sessions\nGROUP BY profile_id\nHAVING COUNT(*) FILTER (WHERE session_status = 'abandoned') > 5\nORDER BY abandoned_sessions DESC, profile_id ASC;\n```\n\n## Explanation\n\n- `FILTER` applies the abandoned-session condition inside the aggregate.\n- This is useful when you want multiple conditional counts in the same grouped query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one metric."
      }
    ]
  },
  {
    "code": "MOVIES_070",
    "approaches": [
      {
        "approach_title": "Top avg",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id ORDER BY avg_watch_time_seconds DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep title-level sessions, average watch time per title, then return the top 5.\n\n## Query\n\n```sql\nSELECT title_id,\n       ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\nFROM viewing_sessions\nWHERE title_id IS NOT NULL\nGROUP BY title_id\nORDER BY avg_watch_time_seconds DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `title_id IS NOT NULL` keeps sessions mapped to titles.\n- `AVG(watch_time_seconds)` computes average watch time for each title.\n- `ROUND(..., 2)` formats the output.\n- `LIMIT 5` returns the top 5 most engaging titles by this metric.\n\n## Why this is optimal\n\nIt is the shortest and clearest grouped-average ranking query for this requirement."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_watch_time AS (SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) SELECT title_id, avg_watch_time_seconds FROM title_watch_time ORDER BY avg_watch_time_seconds DESC, title_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute average watch time per title in a CTE, then rank the result.\n\n## Query\n\n```sql\nWITH title_watch_time AS (\n  SELECT title_id,\n         ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n)\nSELECT title_id, avg_watch_time_seconds\nFROM title_watch_time\nORDER BY avg_watch_time_seconds DESC, title_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one average row per title.\n- The outer query sorts the titles and keeps the top 5.\n\n## Difference from the optimal approach\n\nMore structured, but longer."
      },
      {
        "approach_title": "Rank avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, avg_watch_time_seconds FROM (SELECT title_id, ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds, ROW_NUMBER() OVER (ORDER BY AVG(watch_time_seconds) DESC, title_id ASC) AS rn FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) ranked WHERE rn <= 5 ORDER BY avg_watch_time_seconds DESC, title_id ASC;",
        "explanation": "## Approach\n\nCompute average watch time, rank titles, then keep the first five.\n\n## Query\n\n```sql\nSELECT title_id, avg_watch_time_seconds\nFROM (\n  SELECT title_id,\n         ROUND(AVG(watch_time_seconds), 2) AS avg_watch_time_seconds,\n         ROW_NUMBER() OVER (\n           ORDER BY AVG(watch_time_seconds) DESC, title_id ASC\n         ) AS rn\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n) ranked\nWHERE rn <= 5\nORDER BY avg_watch_time_seconds DESC, title_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes average watch time for each title.\n- `ROW_NUMBER()` ranks titles by that average.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful for advanced ranking patterns, but unnecessary here."
      }
    ]
  },
  {
    "code": "MOVIES_071",
    "approaches": [
      {
        "approach_title": "Join fail",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country ORDER BY failed_sessions DESC, d.country ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin failed viewing sessions to devices, then count failures per country.\n\n## Query\n\n```sql\nSELECT d.country, COUNT(*) AS failed_sessions\nFROM viewing_sessions vs\nJOIN devices d ON vs.device_id = d.id\nWHERE vs.session_status = 'failed'\n  AND d.country IS NOT NULL\nGROUP BY d.country\nORDER BY failed_sessions DESC, d.country ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `viewing_sessions` contains the playback outcome.\n- `devices` provides the country dimension.\n- `WHERE vs.session_status = 'failed'` keeps only failed sessions.\n- `GROUP BY d.country` counts failures for each country.\n- `LIMIT 5` returns the top 5 countries.\n\n## Why this is optimal\n\nIt directly connects failed sessions to country and computes the grouped count in one query."
      },
      {
        "approach_title": "CTE fail",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH failed_country_sessions AS (SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country) SELECT country, failed_sessions FROM failed_country_sessions ORDER BY failed_sessions DESC, country ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute failed session counts per country in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH failed_country_sessions AS (\n  SELECT d.country, COUNT(*) AS failed_sessions\n  FROM viewing_sessions vs\n  JOIN devices d ON vs.device_id = d.id\n  WHERE vs.session_status = 'failed'\n    AND d.country IS NOT NULL\n  GROUP BY d.country\n)\nSELECT country, failed_sessions\nFROM failed_country_sessions\nORDER BY failed_sessions DESC, country ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one failed-session count row per country.\n- The outer query sorts those counts and keeps the top 5.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer."
      },
      {
        "approach_title": "Subquery fail",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT country, failed_sessions FROM (SELECT d.country, COUNT(*) AS failed_sessions FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.session_status = 'failed' AND d.country IS NOT NULL GROUP BY d.country) x ORDER BY failed_sessions DESC, country ASC LIMIT 5;",
        "explanation": "## Approach\n\nCalculate failed session counts in a subquery and rank outside.\n\n## Query\n\n```sql\nSELECT country, failed_sessions\nFROM (\n  SELECT d.country, COUNT(*) AS failed_sessions\n  FROM viewing_sessions vs\n  JOIN devices d ON vs.device_id = d.id\n  WHERE vs.session_status = 'failed'\n    AND d.country IS NOT NULL\n  GROUP BY d.country\n) x\nORDER BY failed_sessions DESC, country ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query builds the grouped counts.\n- The outer query returns the ranked result.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than the single-query version."
      }
    ]
  },
  {
    "code": "MOVIES_072",
    "approaches": [
      {
        "approach_title": "Distinct plan",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT sp.plan_name, COUNT(DISTINCT s.user_id) AS active_users FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' GROUP BY sp.plan_name ORDER BY active_users DESC, sp.plan_name ASC;",
        "explanation": "## Approach\n\nJoin active subscriptions to plans, then count distinct users per plan.\n\n## Query\n\n```sql\nSELECT sp.plan_name,\n       COUNT(DISTINCT s.user_id) AS active_users\nFROM subscriptions s\nJOIN subscription_plans sp ON s.plan_id = sp.id\nWHERE s.subscription_status = 'active'\nGROUP BY sp.plan_name\nORDER BY active_users DESC, sp.plan_name ASC;\n```\n\n## Explanation\n\n- `subscriptions` contains the user-to-plan relationship.\n- `subscription_plans` gives the plan name.\n- `WHERE s.subscription_status = 'active'` keeps only active subscriptions.\n- `COUNT(DISTINCT s.user_id)` avoids double counting the same user inside a plan.\n\n## Why this is optimal\n\nIt uses the correct join and distinct count needed for active user totals per plan."
      },
      {
        "approach_title": "CTE plan",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_plan_users AS (SELECT sp.plan_name, s.user_id FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active') SELECT plan_name, COUNT(DISTINCT user_id) AS active_users FROM active_plan_users GROUP BY plan_name ORDER BY active_users DESC, plan_name ASC;",
        "explanation": "## Approach\n\nFirst build active user-plan pairs, then count users per plan.\n\n## Query\n\n```sql\nWITH active_plan_users AS (\n  SELECT sp.plan_name, s.user_id\n  FROM subscriptions s\n  JOIN subscription_plans sp ON s.plan_id = sp.id\n  WHERE s.subscription_status = 'active'\n)\nSELECT plan_name,\n       COUNT(DISTINCT user_id) AS active_users\nFROM active_plan_users\nGROUP BY plan_name\nORDER BY active_users DESC, plan_name ASC;\n```\n\n## Explanation\n\n- The CTE stores active user-plan rows.\n- The outer query counts distinct users for each plan.\n\n## Difference from the optimal approach\n\nEasy to read, but longer."
      },
      {
        "approach_title": "Count only",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT sp.plan_name, COUNT(*) AS active_users FROM subscriptions s JOIN subscription_plans sp ON s.plan_id = sp.id WHERE s.subscription_status = 'active' GROUP BY sp.plan_name ORDER BY active_users DESC, sp.plan_name ASC;",
        "explanation": "## Approach\n\nCount active subscription rows per plan.\n\n## Query\n\n```sql\nSELECT sp.plan_name,\n       COUNT(*) AS active_users\nFROM subscriptions s\nJOIN subscription_plans sp ON s.plan_id = sp.id\nWHERE s.subscription_status = 'active'\nGROUP BY sp.plan_name\nORDER BY active_users DESC, sp.plan_name ASC;\n```\n\n## Explanation\n\n- This counts active subscription rows instead of distinct users.\n- It can match the optimal result if each user has only one active subscription per plan.\n\n## Difference from the optimal approach\n\nShorter, but `COUNT(DISTINCT s.user_id)` is safer and more accurate for users."
      }
    ]
  },
  {
    "code": "MOVIES_073",
    "approaches": [
      {
        "approach_title": "Join count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT c.category_name, COUNT(*) AS ratings_count FROM ratings r JOIN title_categories tc ON r.title_id = tc.title_id JOIN content_categories c ON tc.category_id = c.id WHERE r.title_id IS NOT NULL GROUP BY c.category_name ORDER BY ratings_count DESC, c.category_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin title ratings to title categories and count how many ratings each category received.\n\n## Query\n\n```sql\nSELECT c.category_name, COUNT(*) AS ratings_count\nFROM ratings r\nJOIN title_categories tc ON r.title_id = tc.title_id\nJOIN content_categories c ON tc.category_id = c.id\nWHERE r.title_id IS NOT NULL\nGROUP BY c.category_name\nORDER BY ratings_count DESC, c.category_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `ratings` gives title-level rating events.\n- `title_categories` maps titles to categories.\n- `content_categories` provides readable category names.\n- `COUNT(*)` counts ratings linked to each category.\n\n## Why this is optimal\n\nIt directly follows the title-to-category join path and computes category rating volume."
      },
      {
        "approach_title": "CTE rate",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH category_ratings AS (SELECT c.category_name, COUNT(*) AS ratings_count FROM ratings r JOIN title_categories tc ON r.title_id = tc.title_id JOIN content_categories c ON tc.category_id = c.id WHERE r.title_id IS NOT NULL GROUP BY c.category_name) SELECT category_name, ratings_count FROM category_ratings ORDER BY ratings_count DESC, category_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute category rating counts in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH category_ratings AS (\n  SELECT c.category_name, COUNT(*) AS ratings_count\n  FROM ratings r\n  JOIN title_categories tc ON r.title_id = tc.title_id\n  JOIN content_categories c ON tc.category_id = c.id\n  WHERE r.title_id IS NOT NULL\n  GROUP BY c.category_name\n)\nSELECT category_name, ratings_count\nFROM category_ratings\nORDER BY ratings_count DESC, category_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one rating-count row per category.\n- The outer query sorts and limits the result.\n\n## Difference from the optimal approach\n\nReadable, but longer."
      },
      {
        "approach_title": "Start cat",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT c.category_name, COUNT(*) AS ratings_count FROM content_categories c JOIN title_categories tc ON c.id = tc.category_id JOIN ratings r ON tc.title_id = r.title_id WHERE r.title_id IS NOT NULL GROUP BY c.category_name ORDER BY ratings_count DESC, c.category_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nStart from categories and join to title mappings and ratings.\n\n## Query\n\n```sql\nSELECT c.category_name, COUNT(*) AS ratings_count\nFROM content_categories c\nJOIN title_categories tc ON c.id = tc.category_id\nJOIN ratings r ON tc.title_id = r.title_id\nWHERE r.title_id IS NOT NULL\nGROUP BY c.category_name\nORDER BY ratings_count DESC, c.category_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- This uses the same relationships but in a different join order.\n- It still counts ratings associated with each category.\n\n## Difference from the optimal approach\n\nEqually valid, but starting from ratings is a bit more intuitive for the metric."
      }
    ]
  },
  {
    "code": "MOVIES_074",
    "approaches": [
      {
        "approach_title": "Month down",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at) ORDER BY download_month ASC;",
        "explanation": "## Approach\n\nGroup completed downloads by download month and count them.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('month', downloaded_at) AS download_month,\n       COUNT(*) AS completed_downloads\nFROM downloads\nWHERE download_status = 'completed'\n  AND downloaded_at IS NOT NULL\nGROUP BY DATE_TRUNC('month', downloaded_at)\nORDER BY download_month ASC;\n```\n\n## Explanation\n\n- `download_status = 'completed'` keeps finished downloads only.\n- `downloaded_at IS NOT NULL` ensures the time bucket exists.\n- `DATE_TRUNC('month', downloaded_at)` groups rows by month.\n- `COUNT(*)` counts completed downloads in each month.\n\n## Why this is optimal\n\nIt is the most direct way to build a monthly completed-download trend."
      },
      {
        "approach_title": "CTE month",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_downloads AS (SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at)) SELECT download_month, completed_downloads FROM monthly_downloads ORDER BY download_month ASC;",
        "explanation": "## Approach\n\nCompute monthly download counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH monthly_downloads AS (\n  SELECT DATE_TRUNC('month', downloaded_at) AS download_month,\n         COUNT(*) AS completed_downloads\n  FROM downloads\n  WHERE download_status = 'completed'\n    AND downloaded_at IS NOT NULL\n  GROUP BY DATE_TRUNC('month', downloaded_at)\n)\nSELECT download_month, completed_downloads\nFROM monthly_downloads\nORDER BY download_month ASC;\n```\n\n## Explanation\n\n- The CTE stores one count row per month.\n- The outer query simply orders the trend.\n\n## Difference from the optimal approach\n\nMore structured, but longer."
      },
      {
        "approach_title": "Subquery cnt",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT download_month, completed_downloads FROM (SELECT DATE_TRUNC('month', downloaded_at) AS download_month, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' AND downloaded_at IS NOT NULL GROUP BY DATE_TRUNC('month', downloaded_at)) x ORDER BY download_month ASC;",
        "explanation": "## Approach\n\nBuild the monthly counts in a subquery and sort outside.\n\n## Query\n\n```sql\nSELECT download_month, completed_downloads\nFROM (\n  SELECT DATE_TRUNC('month', downloaded_at) AS download_month,\n         COUNT(*) AS completed_downloads\n  FROM downloads\n  WHERE download_status = 'completed'\n    AND downloaded_at IS NOT NULL\n  GROUP BY DATE_TRUNC('month', downloaded_at)\n) x\nORDER BY download_month ASC;\n```\n\n## Explanation\n\n- The inner query creates one grouped count per month.\n- The outer query returns those rows in chronological order.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_075",
    "approaches": [
      {
        "approach_title": "HAVING active",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS active_subscription_count FROM subscriptions WHERE subscription_status = 'active' GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY active_subscription_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nKeep active subscriptions only, count them per user, then keep users with more than one.\n\n## Query\n\n```sql\nSELECT user_id,\n       COUNT(*) AS active_subscription_count\nFROM subscriptions\nWHERE subscription_status = 'active'\nGROUP BY user_id\nHAVING COUNT(*) > 1\nORDER BY active_subscription_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `WHERE subscription_status = 'active'` filters to active subscriptions only.\n- `GROUP BY user_id` creates one row per user.\n- `COUNT(*)` counts active subscriptions for each user.\n- `HAVING COUNT(*) > 1` keeps only users with multiple active subscriptions.\n\n## Why this is optimal\n\nIt uses the standard grouped-count plus grouped-filter pattern directly."
      },
      {
        "approach_title": "CTE active",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_counts AS (SELECT user_id, COUNT(*) AS active_subscription_count FROM subscriptions WHERE subscription_status = 'active' GROUP BY user_id) SELECT user_id, active_subscription_count FROM active_counts WHERE active_subscription_count > 1 ORDER BY active_subscription_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nCompute active subscription counts first, then filter outside.\n\n## Query\n\n```sql\nWITH active_counts AS (\n  SELECT user_id,\n         COUNT(*) AS active_subscription_count\n  FROM subscriptions\n  WHERE subscription_status = 'active'\n  GROUP BY user_id\n)\nSELECT user_id, active_subscription_count\nFROM active_counts\nWHERE active_subscription_count > 1\nORDER BY active_subscription_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one active count row per user.\n- The outer query keeps only counts greater than one.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, COUNT(*) FILTER (WHERE subscription_status = 'active') AS active_subscription_count FROM subscriptions GROUP BY user_id HAVING COUNT(*) FILTER (WHERE subscription_status = 'active') > 1 ORDER BY active_subscription_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nUse `FILTER` to count active subscriptions inside each user group.\n\n## Query\n\n```sql\nSELECT user_id,\n       COUNT(*) FILTER (WHERE subscription_status = 'active') AS active_subscription_count\nFROM subscriptions\nGROUP BY user_id\nHAVING COUNT(*) FILTER (WHERE subscription_status = 'active') > 1\nORDER BY active_subscription_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `FILTER` applies the active-status condition inside the aggregate.\n- This is handy when calculating multiple conditional subscription counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric."
      }
    ]
  },
  {
    "code": "MOVIES_076",
    "approaches": [
      {
        "approach_title": "Window top",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH title_completion AS (SELECT d.country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent, ROW_NUMBER() OVER (PARTITION BY d.country ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC) AS rn FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id) SELECT country, title_id, avg_completion_percent FROM title_completion WHERE rn = 1 ORDER BY country ASC, title_id ASC;",
        "explanation": "## Approach\n\nCompute average completion per `(country, title)` pair, rank titles inside each country, then keep the first row.\n\n## Query\n\n```sql\nWITH title_completion AS (\n  SELECT d.country,\n         vs.title_id,\n         ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent,\n         ROW_NUMBER() OVER (\n           PARTITION BY d.country\n           ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC\n         ) AS rn\n  FROM viewing_sessions vs\n  JOIN devices d ON vs.device_id = d.id\n  WHERE vs.title_id IS NOT NULL\n    AND d.country IS NOT NULL\n  GROUP BY d.country, vs.title_id\n)\nSELECT country, title_id, avg_completion_percent\nFROM title_completion\nWHERE rn = 1\nORDER BY country ASC, title_id ASC;\n```\n\n## Explanation\n\n- The grouped query calculates average completion for each title in each country.\n- `ROW_NUMBER()` ranks titles separately inside every country.\n- `ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC` ensures the highest completion comes first, with `title_id` as the tie-breaker.\n- `WHERE rn = 1` returns exactly one row per country.\n\n## Why this is optimal\n\nIt matches the expected result exactly and handles ties deterministically."
      },
      {
        "approach_title": "Rank one",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT country, title_id, avg_completion_percent FROM (SELECT d.country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent, RANK() OVER (PARTITION BY d.country ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC) AS rnk FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id) ranked WHERE rnk = 1 ORDER BY country ASC, title_id ASC;",
        "explanation": "## Approach\n\nUse `RANK()` after computing average completion per country and title, then keep rank 1.\n\n## Query\n\n```sql\nSELECT country, title_id, avg_completion_percent\nFROM (\n  SELECT d.country,\n         vs.title_id,\n         ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent,\n         RANK() OVER (\n           PARTITION BY d.country\n           ORDER BY AVG(vs.completion_percent) DESC, vs.title_id ASC\n         ) AS rnk\n  FROM viewing_sessions vs\n  JOIN devices d ON vs.device_id = d.id\n  WHERE vs.title_id IS NOT NULL\n    AND d.country IS NOT NULL\n  GROUP BY d.country, vs.title_id\n) ranked\nWHERE rnk = 1\nORDER BY country ASC, title_id ASC;\n```\n\n## Explanation\n\n- The grouped query builds one average-completion row per country and title.\n- `RANK()` assigns rank 1 to the best title in each country.\n- Because `title_id` is included in the ordering, ties are broken consistently, so this matches the expected result here.\n\n## Difference from the optimal approach\n\nIt works for this dataset, but `ROW_NUMBER()` is more explicit when the requirement is exactly one row per country."
      },
      {
        "approach_title": "Distinct first",
        "approach_type": "postgresql_specific",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT ON (d.country) d.country AS country, vs.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN devices d ON vs.device_id = d.id WHERE vs.title_id IS NOT NULL AND d.country IS NOT NULL GROUP BY d.country, vs.title_id ORDER BY d.country ASC, AVG(vs.completion_percent) DESC, vs.title_id ASC;",
        "explanation": "## Approach\n\nUse PostgreSQL `DISTINCT ON` to keep the first title per country after sorting by highest average completion.\n\n## Query\n\n```sql\nSELECT DISTINCT ON (d.country)\n       d.country AS country,\n       vs.title_id,\n       ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent\nFROM viewing_sessions vs\nJOIN devices d ON vs.device_id = d.id\nWHERE vs.title_id IS NOT NULL\n  AND d.country IS NOT NULL\nGROUP BY d.country, vs.title_id\nORDER BY d.country ASC,\n         AVG(vs.completion_percent) DESC,\n         vs.title_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes average completion for each title in each country.\n- `ORDER BY d.country, AVG(...) DESC, vs.title_id ASC` puts the best title for each country first.\n- `DISTINCT ON (d.country)` keeps only that first row per country.\n\n## Difference from the failed max-join approach\n\nUnlike joining on `MAX(avg_completion_percent)`, this does not return many tied rows. It keeps exactly one deterministic winner per country."
      }
    ]
  },
  {
    "code": "MOVIES_077",
    "approaches": [
      {
        "approach_title": "Day binge",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(DISTINCT vs.episode_id) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at) HAVING COUNT(DISTINCT vs.episode_id) >= 3 ORDER BY episodes_watched DESC, vs.profile_id ASC, e.season_id ASC, watch_date ASC;",
        "explanation": "## Approach\n\nJoin episode sessions to seasons, group by profile, season, and day, then keep groups with at least 3 distinct episodes.\n\n## Query\n\n```sql\nSELECT vs.profile_id,\n       e.season_id,\n       DATE(vs.started_at) AS watch_date,\n       COUNT(DISTINCT vs.episode_id) AS episodes_watched\nFROM viewing_sessions vs\nJOIN episodes e ON vs.episode_id = e.id\nWHERE vs.episode_id IS NOT NULL\nGROUP BY vs.profile_id, e.season_id, DATE(vs.started_at)\nHAVING COUNT(DISTINCT vs.episode_id) >= 3\nORDER BY episodes_watched DESC,\n         vs.profile_id ASC,\n         e.season_id ASC,\n         watch_date ASC;\n```\n\n## Explanation\n\n- `episodes` maps each watched episode to its season.\n- `DATE(vs.started_at)` converts the timestamp into a calendar day.\n- `COUNT(DISTINCT vs.episode_id)` counts how many different episodes were watched that day.\n- `HAVING ... >= 3` keeps binge-watching cases.\n\n## Why this is optimal\n\nIt directly models the business rule of watching 3 or more distinct episodes of the same season in one day."
      },
      {
        "approach_title": "CTE binge",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH daily_season_watch AS (SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(DISTINCT vs.episode_id) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at)) SELECT profile_id, season_id, watch_date, episodes_watched FROM daily_season_watch WHERE episodes_watched >= 3 ORDER BY episodes_watched DESC, profile_id ASC, season_id ASC, watch_date ASC;",
        "explanation": "## Approach\n\nFirst compute daily episode counts per profile and season, then filter outside.\n\n## Query\n\n```sql\nWITH daily_season_watch AS (\n  SELECT vs.profile_id,\n         e.season_id,\n         DATE(vs.started_at) AS watch_date,\n         COUNT(DISTINCT vs.episode_id) AS episodes_watched\n  FROM viewing_sessions vs\n  JOIN episodes e ON vs.episode_id = e.id\n  WHERE vs.episode_id IS NOT NULL\n  GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at)\n)\nSELECT profile_id, season_id, watch_date, episodes_watched\nFROM daily_season_watch\nWHERE episodes_watched >= 3\nORDER BY episodes_watched DESC, profile_id ASC, season_id ASC, watch_date ASC;\n```\n\n## Explanation\n\n- The CTE stores one daily season summary row per profile.\n- The outer query keeps only binge rows.\n\n## Difference from the optimal approach\n\nClear in steps, but longer."
      },
      {
        "approach_title": "Count all",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT vs.profile_id, e.season_id, DATE(vs.started_at) AS watch_date, COUNT(*) AS episodes_watched FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.episode_id IS NOT NULL GROUP BY vs.profile_id, e.season_id, DATE(vs.started_at) HAVING COUNT(*) >= 3 ORDER BY episodes_watched DESC, vs.profile_id ASC, e.season_id ASC, watch_date ASC;",
        "explanation": "## Approach\n\nCount all matching session rows instead of distinct episode ids.\n\n## Query\n\n```sql\nSELECT vs.profile_id,\n       e.season_id,\n       DATE(vs.started_at) AS watch_date,\n       COUNT(*) AS episodes_watched\nFROM viewing_sessions vs\nJOIN episodes e ON vs.episode_id = e.id\nWHERE vs.episode_id IS NOT NULL\nGROUP BY vs.profile_id, e.season_id, DATE(vs.started_at)\nHAVING COUNT(*) >= 3\nORDER BY episodes_watched DESC,\n         vs.profile_id ASC,\n         e.season_id ASC,\n         watch_date ASC;\n```\n\n## Explanation\n\n- This counts all session rows in the group.\n- If the same episode is watched more than once on the same day, it may overcount binge behavior.\n\n## Difference from the optimal approach\n\nSimpler, but `COUNT(DISTINCT vs.episode_id)` is more accurate for distinct episodes watched."
      }
    ]
  },
  {
    "code": "MOVIES_078",
    "approaches": [
      {
        "approach_title": "CTE conv",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH clicked_impressions AS (SELECT ri.id AS impression_id, ri.row_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON rc.impression_id = ri.id), converted_clicks AS (SELECT DISTINCT ci.impression_id FROM clicked_impressions ci JOIN viewing_sessions vs ON vs.profile_id = ci.profile_id AND vs.title_id = ci.title_id) SELECT rr.id, rr.row_name, ROUND(COUNT(cc.impression_id)::numeric * 100 / COUNT(ci.impression_id), 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN clicked_impressions ci ON rr.id = ci.row_id LEFT JOIN converted_clicks cc ON ci.impression_id = cc.impression_id GROUP BY rr.id, rr.row_name ORDER BY conversion_rate_percent DESC, rr.id ASC;",
        "explanation": "## Approach\n\nFirst capture clicked impressions, then mark which of those clicks later turned into watched titles, and finally compute conversion rate per recommendation row.\n\n## Query\n\n```sql\nWITH clicked_impressions AS (\n  SELECT ri.id AS impression_id,\n         ri.row_id,\n         ri.profile_id,\n         ri.title_id\n  FROM recommendation_impressions ri\n  JOIN recommendation_clicks rc ON rc.impression_id = ri.id\n),\nconverted_clicks AS (\n  SELECT DISTINCT ci.impression_id\n  FROM clicked_impressions ci\n  JOIN viewing_sessions vs\n    ON vs.profile_id = ci.profile_id\n   AND vs.title_id = ci.title_id\n)\nSELECT rr.id,\n       rr.row_name,\n       ROUND(COUNT(cc.impression_id)::numeric * 100 / COUNT(ci.impression_id), 2) AS conversion_rate_percent\nFROM recommendation_rows rr\nJOIN clicked_impressions ci ON rr.id = ci.row_id\nLEFT JOIN converted_clicks cc ON ci.impression_id = cc.impression_id\nGROUP BY rr.id, rr.row_name\nORDER BY conversion_rate_percent DESC, rr.id ASC;\n```\n\n## Explanation\n\n- `clicked_impressions` keeps only recommendation impressions that got clicked.\n- `converted_clicks` identifies clicked impressions where the same profile later watched the same title.\n- `COUNT(cc.impression_id) / COUNT(ci.impression_id)` computes conversion rate per row.\n- `LEFT JOIN` keeps rows with clicks but zero conversions.\n\n## Why this is optimal\n\nBreaking the logic into clicked and converted sets makes the conversion calculation accurate and readable."
      },
      {
        "approach_title": "Direct join",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT rr.id, rr.row_name, ROUND(COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ri.id END)::numeric * 100 / COUNT(DISTINCT ri.id), 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN recommendation_impressions ri ON rr.id = ri.row_id JOIN recommendation_clicks rc ON rc.impression_id = ri.id LEFT JOIN viewing_sessions vs ON vs.profile_id = ri.profile_id AND vs.title_id = ri.title_id GROUP BY rr.id, rr.row_name ORDER BY conversion_rate_percent DESC, rr.id ASC;",
        "explanation": "## Approach\n\nJoin rows, clicked impressions, and later watches in one query, then compute conversion rate with conditional counting.\n\n## Query\n\n```sql\nSELECT rr.id,\n       rr.row_name,\n       ROUND(\n         COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ri.id END)::numeric * 100 /\n         COUNT(DISTINCT ri.id),\n         2\n       ) AS conversion_rate_percent\nFROM recommendation_rows rr\nJOIN recommendation_impressions ri ON rr.id = ri.row_id\nJOIN recommendation_clicks rc ON rc.impression_id = ri.id\nLEFT JOIN viewing_sessions vs\n  ON vs.profile_id = ri.profile_id\n AND vs.title_id = ri.title_id\nGROUP BY rr.id, rr.row_name\nORDER BY conversion_rate_percent DESC, rr.id ASC;\n```\n\n## Explanation\n\n- The join keeps only clicked recommendation impressions.\n- The `LEFT JOIN` checks whether a matching watch happened later for the same profile and title.\n- The conditional distinct count forms the numerator.\n\n## Difference from the optimal approach\n\nWorks, but the CTE version is easier to reason about."
      },
      {
        "approach_title": "CTE metrics",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH clicked_impressions AS (SELECT ri.id AS impression_id, ri.row_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON rc.impression_id = ri.id), row_metrics AS (SELECT ci.row_id, COUNT(*) AS clicked_count, COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ci.impression_id END) AS converted_count FROM clicked_impressions ci LEFT JOIN viewing_sessions vs ON vs.profile_id = ci.profile_id AND vs.title_id = ci.title_id GROUP BY ci.row_id) SELECT rr.id, rr.row_name, ROUND(rm.converted_count::numeric * 100 / rm.clicked_count, 2) AS conversion_rate_percent FROM recommendation_rows rr JOIN row_metrics rm ON rr.id = rm.row_id ORDER BY conversion_rate_percent DESC, rr.id ASC;",
        "explanation": "## Approach\n\nCompute clicked impressions first, then build row-level click and conversion counts before calculating the final rate.\n\n## Query\n\n```sql\nWITH clicked_impressions AS (\n  SELECT ri.id AS impression_id,\n         ri.row_id,\n         ri.profile_id,\n         ri.title_id\n  FROM recommendation_impressions ri\n  JOIN recommendation_clicks rc ON rc.impression_id = ri.id\n),\nrow_metrics AS (\n  SELECT ci.row_id,\n         COUNT(*) AS clicked_count,\n         COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ci.impression_id END) AS converted_count\n  FROM clicked_impressions ci\n  LEFT JOIN viewing_sessions vs\n    ON vs.profile_id = ci.profile_id\n   AND vs.title_id = ci.title_id\n  GROUP BY ci.row_id\n)\nSELECT rr.id,\n       rr.row_name,\n       ROUND(rm.converted_count::numeric * 100 / rm.clicked_count, 2) AS conversion_rate_percent\nFROM recommendation_rows rr\nJOIN row_metrics rm ON rr.id = rm.row_id\nORDER BY conversion_rate_percent DESC, rr.id ASC;\n```\n\n## Explanation\n\n- The first CTE isolates clicked impressions.\n- The second CTE stores numerator and denominator per row.\n- The final query turns those counts into a percentage.\n\n## Difference from the optimal approach\n\nFlexible for exposing intermediate metrics, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_079",
    "approaches": [
      {
        "approach_title": "Two CTEs",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH download_counts AS (SELECT profile_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY profile_id), session_counts AS (SELECT profile_id, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id) SELECT dc.profile_id, dc.completed_downloads, COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count FROM download_counts dc LEFT JOIN session_counts sc ON dc.profile_id = sc.profile_id WHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0) ORDER BY dc.completed_downloads DESC, dc.profile_id ASC;",
        "explanation": "## Approach\n\nCount completed downloads and viewing sessions separately, then compare the two totals for each profile.\n\n## Query\n\n```sql\nWITH download_counts AS (\n  SELECT profile_id, COUNT(*) AS completed_downloads\n  FROM downloads\n  WHERE download_status = 'completed'\n  GROUP BY profile_id\n),\nsession_counts AS (\n  SELECT profile_id, COUNT(*) AS viewing_sessions_count\n  FROM viewing_sessions\n  GROUP BY profile_id\n)\nSELECT dc.profile_id,\n       dc.completed_downloads,\n       COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count\nFROM download_counts dc\nLEFT JOIN session_counts sc ON dc.profile_id = sc.profile_id\nWHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0)\nORDER BY dc.completed_downloads DESC, dc.profile_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes completed download totals per profile.\n- The second CTE computes viewing session totals per profile.\n- `LEFT JOIN` keeps profiles that have downloads even if they have no viewing sessions.\n- `COALESCE(..., 0)` treats missing session counts as zero.\n- The final filter keeps profiles whose completed downloads exceed their session count.\n\n## Why this is optimal\n\nIt avoids join multiplication and compares two independently correct aggregates."
      },
      {
        "approach_title": "Subquery cmp",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT dc.profile_id, dc.completed_downloads, COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count FROM (SELECT profile_id, COUNT(*) AS completed_downloads FROM downloads WHERE download_status = 'completed' GROUP BY profile_id) dc LEFT JOIN (SELECT profile_id, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id) sc ON dc.profile_id = sc.profile_id WHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0) ORDER BY dc.completed_downloads DESC, dc.profile_id ASC;",
        "explanation": "## Approach\n\nBuild the two profile-level counts in separate subqueries, then compare them in the outer query.\n\n## Query\n\n```sql\nSELECT dc.profile_id,\n       dc.completed_downloads,\n       COALESCE(sc.viewing_sessions_count, 0) AS viewing_sessions_count\nFROM (\n  SELECT profile_id, COUNT(*) AS completed_downloads\n  FROM downloads\n  WHERE download_status = 'completed'\n  GROUP BY profile_id\n) dc\nLEFT JOIN (\n  SELECT profile_id, COUNT(*) AS viewing_sessions_count\n  FROM viewing_sessions\n  GROUP BY profile_id\n) sc ON dc.profile_id = sc.profile_id\nWHERE dc.completed_downloads > COALESCE(sc.viewing_sessions_count, 0)\nORDER BY dc.completed_downloads DESC, dc.profile_id ASC;\n```\n\n## Explanation\n\n- The first subquery computes completed downloads per profile.\n- The second subquery computes viewing sessions per profile.\n- The outer query joins those two result sets and compares them.\n\n## Difference from the optimal approach\n\nIt produces the same result, but the CTE version is easier to read and extend."
      },
      {
        "approach_title": "Union counts",
        "approach_type": "set_operations",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH profile_metrics AS (SELECT profile_id, COUNT(*) AS completed_downloads, 0 AS viewing_sessions_count FROM downloads WHERE download_status = 'completed' GROUP BY profile_id UNION ALL SELECT profile_id, 0 AS completed_downloads, COUNT(*) AS viewing_sessions_count FROM viewing_sessions GROUP BY profile_id), merged AS (SELECT profile_id, SUM(completed_downloads) AS completed_downloads, SUM(viewing_sessions_count) AS viewing_sessions_count FROM profile_metrics GROUP BY profile_id) SELECT profile_id, completed_downloads, viewing_sessions_count FROM merged WHERE completed_downloads > viewing_sessions_count ORDER BY completed_downloads DESC, profile_id ASC;",
        "explanation": "## Approach\n\nAggregate downloads and sessions separately, stack them with `UNION ALL`, then sum the metrics back per profile.\n\n## Query\n\n```sql\nWITH profile_metrics AS (\n  SELECT profile_id,\n         COUNT(*) AS completed_downloads,\n         0 AS viewing_sessions_count\n  FROM downloads\n  WHERE download_status = 'completed'\n  GROUP BY profile_id\n\n  UNION ALL\n\n  SELECT profile_id,\n         0 AS completed_downloads,\n         COUNT(*) AS viewing_sessions_count\n  FROM viewing_sessions\n  GROUP BY profile_id\n),\nmerged AS (\n  SELECT profile_id,\n         SUM(completed_downloads) AS completed_downloads,\n         SUM(viewing_sessions_count) AS viewing_sessions_count\n  FROM profile_metrics\n  GROUP BY profile_id\n)\nSELECT profile_id, completed_downloads, viewing_sessions_count\nFROM merged\nWHERE completed_downloads > viewing_sessions_count\nORDER BY completed_downloads DESC, profile_id ASC;\n```\n\n## Explanation\n\n- The first half creates one row per profile for completed downloads.\n- The second half creates one row per profile for viewing sessions.\n- `UNION ALL` stacks both metric sets without creating join multiplication.\n- The second CTE merges them back into one row per profile.\n\n## Difference from the failed FILTER approach\n\nThis avoids joining raw `downloads` and `viewing_sessions` rows together, so counts stay accurate."
      }
    ]
  },
  {
    "code": "MOVIES_080",
    "approaches": [
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_revenue AS (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id), revenue_avg AS (SELECT AVG(total_paid_amount) AS avg_paid_amount FROM user_revenue) SELECT ur.user_id, ROUND(ur.total_paid_amount, 2) AS total_paid_amount FROM user_revenue ur CROSS JOIN revenue_avg ra WHERE ur.total_paid_amount > ra.avg_paid_amount ORDER BY total_paid_amount DESC, ur.user_id ASC;",
        "explanation": "## Approach\n\nFirst compute total paid revenue per user, then compute the average of those user totals, and finally keep users above that average.\n\n## Query\n\n```sql\nWITH user_revenue AS (\n  SELECT s.user_id,\n         SUM(bi.total_amount) AS total_paid_amount\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  WHERE bi.invoice_status = 'paid'\n  GROUP BY s.user_id\n),\nrevenue_avg AS (\n  SELECT AVG(total_paid_amount) AS avg_paid_amount\n  FROM user_revenue\n)\nSELECT ur.user_id,\n       ROUND(ur.total_paid_amount, 2) AS total_paid_amount\nFROM user_revenue ur\nCROSS JOIN revenue_avg ra\nWHERE ur.total_paid_amount > ra.avg_paid_amount\nORDER BY total_paid_amount DESC, ur.user_id ASC;\n```\n\n## Explanation\n\n- `user_revenue` stores total paid invoice value per user.\n- `revenue_avg` calculates the average of those user-level totals.\n- `CROSS JOIN` makes that one average available to every user row.\n- The final filter keeps users above the overall average.\n\n## Why this is optimal\n\nThis is the clearest two-stage aggregation pattern for comparing users against an overall user-level average."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id, ROUND(total_paid_amount, 2) AS total_paid_amount FROM (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) ur WHERE total_paid_amount > (SELECT AVG(total_paid_amount) FROM (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) x) ORDER BY total_paid_amount DESC, user_id ASC;",
        "explanation": "## Approach\n\nUse one subquery for user totals and another nested subquery for the average of those totals.\n\n## Query\n\n```sql\nSELECT user_id,\n       ROUND(total_paid_amount, 2) AS total_paid_amount\nFROM (\n  SELECT s.user_id,\n         SUM(bi.total_amount) AS total_paid_amount\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  WHERE bi.invoice_status = 'paid'\n  GROUP BY s.user_id\n) ur\nWHERE total_paid_amount > (\n  SELECT AVG(total_paid_amount)\n  FROM (\n    SELECT s.user_id,\n           SUM(bi.total_amount) AS total_paid_amount\n    FROM billing_invoices bi\n    JOIN subscriptions s ON bi.subscription_id = s.id\n    WHERE bi.invoice_status = 'paid'\n    GROUP BY s.user_id\n  ) x\n)\nORDER BY total_paid_amount DESC, user_id ASC;\n```\n\n## Explanation\n\n- The outer subquery computes total revenue per user.\n- The nested subquery computes the average of those totals.\n- The outer filter keeps only users above that average.\n\n## Difference from the optimal approach\n\nIt works, but repeats the same aggregation logic and is harder to maintain."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, ROUND(total_paid_amount, 2) AS total_paid_amount FROM (SELECT user_id, total_paid_amount, AVG(total_paid_amount) OVER () AS avg_paid_amount FROM (SELECT s.user_id, SUM(bi.total_amount) AS total_paid_amount FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) ur) x WHERE total_paid_amount > avg_paid_amount ORDER BY total_paid_amount DESC, user_id ASC;",
        "explanation": "## Approach\n\nFirst compute total revenue per user, then use a window average over all user totals.\n\n## Query\n\n```sql\nSELECT user_id,\n       ROUND(total_paid_amount, 2) AS total_paid_amount\nFROM (\n  SELECT user_id,\n         total_paid_amount,\n         AVG(total_paid_amount) OVER () AS avg_paid_amount\n  FROM (\n    SELECT s.user_id,\n           SUM(bi.total_amount) AS total_paid_amount\n    FROM billing_invoices bi\n    JOIN subscriptions s ON bi.subscription_id = s.id\n    WHERE bi.invoice_status = 'paid'\n    GROUP BY s.user_id\n  ) ur\n) x\nWHERE total_paid_amount > avg_paid_amount\nORDER BY total_paid_amount DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner grouped query computes total paid amount per user.\n- `AVG(total_paid_amount) OVER ()` adds the same global average to every row.\n- The outer query keeps users above that average.\n\n## Difference from the optimal approach\n\nCompact and clever, but the CTE version is easier for learners to follow."
      }
    ]
  },
  {
    "code": "MOVIES_081",
    "approaches": [
      {
        "approach_title": "Min max span",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id ORDER BY retention_days DESC, user_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nFor each user, take the earliest subscription start and the latest subscription end, then measure the span.\n\n## Query\n\n```sql\nSELECT user_id,\n       MIN(started_at) AS first_subscription_start,\n       MAX(current_period_end) AS latest_period_end,\n       EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days\nFROM subscriptions\nWHERE subscription_status IN ('active', 'expired', 'cancelled')\nGROUP BY user_id\nORDER BY retention_days DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `MIN(started_at)` finds the user's first subscription start.\n- `MAX(current_period_end)` finds the latest covered period.\n- Subtracting them gives the total span in days.\n- The query ranks users by longest retained span.\n\n## Why this is optimal\n\nIt directly follows the expected query and uses the simplest grouped aggregation pattern."
      },
      {
        "approach_title": "CTE span",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_retention AS (SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id) SELECT user_id, first_subscription_start, latest_period_end, retention_days FROM user_retention ORDER BY retention_days DESC, user_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute each user's retention span in a CTE, then rank it outside.\n\n## Query\n\n```sql\nWITH user_retention AS (\n  SELECT user_id,\n         MIN(started_at) AS first_subscription_start,\n         MAX(current_period_end) AS latest_period_end,\n         EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days\n  FROM subscriptions\n  WHERE subscription_status IN ('active', 'expired', 'cancelled')\n  GROUP BY user_id\n)\nSELECT user_id, first_subscription_start, latest_period_end, retention_days\nFROM user_retention\nORDER BY retention_days DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one retention row per user.\n- The outer query handles ordering and limiting.\n- This is useful if you want to reuse the retention metric later.\n\n## Difference from the optimal approach\n\nMore structured, but longer."
      },
      {
        "approach_title": "Subquery span",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, first_subscription_start, latest_period_end, retention_days FROM (SELECT user_id, MIN(started_at) AS first_subscription_start, MAX(current_period_end) AS latest_period_end, EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days FROM subscriptions WHERE subscription_status IN ('active', 'expired', 'cancelled') GROUP BY user_id) x ORDER BY retention_days DESC, user_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nBuild the retention span per user in a subquery and sort it outside.\n\n## Query\n\n```sql\nSELECT user_id, first_subscription_start, latest_period_end, retention_days\nFROM (\n  SELECT user_id,\n         MIN(started_at) AS first_subscription_start,\n         MAX(current_period_end) AS latest_period_end,\n         EXTRACT(DAY FROM MAX(current_period_end) - MIN(started_at)) AS retention_days\n  FROM subscriptions\n  WHERE subscription_status IN ('active', 'expired', 'cancelled')\n  GROUP BY user_id\n) x\nORDER BY retention_days DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query computes one retention span per user.\n- The outer query ranks those spans.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than the single-query version."
      }
    ]
  },
  {
    "code": "MOVIES_082",
    "approaches": [
      {
        "approach_title": "Group rewatch",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1 ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nGroup viewing sessions by `(profile, title)`, keep groups watched more than once, and rank those rewatch groups.\n\n## Query\n\n```sql\nSELECT title_id,\n       COUNT(*) AS rewatch_sessions\nFROM viewing_sessions\nWHERE title_id IS NOT NULL\nGROUP BY profile_id, title_id\nHAVING COUNT(*) > 1\nORDER BY rewatch_sessions DESC, title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `GROUP BY profile_id, title_id` creates one row per profile-title pair.\n- `COUNT(*)` measures how many times that profile watched that title.\n- `HAVING COUNT(*) > 1` keeps only rewatch cases.\n- The result ranks the biggest rewatch counts.\n\n## Why this is optimal\n\nIt matches the expected query exactly and directly captures repeat watching by the same profile."
      },
      {
        "approach_title": "CTE pairs",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rewatch_pairs AS (SELECT profile_id, title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1) SELECT title_id, rewatch_sessions FROM rewatch_pairs ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute rewatch counts for each profile-title pair first, then rank them outside.\n\n## Query\n\n```sql\nWITH rewatch_pairs AS (\n  SELECT profile_id,\n         title_id,\n         COUNT(*) AS rewatch_sessions\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY profile_id, title_id\n  HAVING COUNT(*) > 1\n)\nSELECT title_id, rewatch_sessions\nFROM rewatch_pairs\nORDER BY rewatch_sessions DESC, title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one row per profile-title rewatch pair.\n- The outer query ranks those pairs by session count.\n\n## Difference from the optimal approach\n\nEasy to read, but longer."
      },
      {
        "approach_title": "Subquery pairs",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, rewatch_sessions FROM (SELECT profile_id, title_id, COUNT(*) AS rewatch_sessions FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(*) > 1) x ORDER BY rewatch_sessions DESC, title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nBuild the rewatch groups in a subquery and sort outside.\n\n## Query\n\n```sql\nSELECT title_id, rewatch_sessions\nFROM (\n  SELECT profile_id,\n         title_id,\n         COUNT(*) AS rewatch_sessions\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY profile_id, title_id\n  HAVING COUNT(*) > 1\n) x\nORDER BY rewatch_sessions DESC, title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query captures repeated watches per profile and title.\n- The outer query ranks those results.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_083",
    "approaches": [
      {
        "approach_title": "Two averages",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH historical_avg AS (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id), recent_avg AS (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id) SELECT h.title_id, ROUND(h.hist_avg, 2) AS historical_avg_completion, ROUND(r.recent_avg, 2) AS recent_avg_completion FROM historical_avg h JOIN recent_avg r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg ORDER BY historical_avg_completion DESC, h.title_id ASC;",
        "explanation": "## Approach\n\nCompute historical and recent completion averages separately, then compare them per title.\n\n## Query\n\n```sql\nWITH historical_avg AS (\n  SELECT title_id, AVG(completion_percent) AS hist_avg\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n),\nrecent_avg AS (\n  SELECT title_id, AVG(completion_percent) AS recent_avg\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n    AND started_at >= NOW() - INTERVAL '30 days'\n  GROUP BY title_id\n)\nSELECT h.title_id,\n       ROUND(h.hist_avg, 2) AS historical_avg_completion,\n       ROUND(r.recent_avg, 2) AS recent_avg_completion\nFROM historical_avg h\nJOIN recent_avg r ON h.title_id = r.title_id\nWHERE r.recent_avg < h.hist_avg\nORDER BY historical_avg_completion DESC, h.title_id ASC;\n```\n\n## Explanation\n\n- `historical_avg` stores long-term average completion per title.\n- `recent_avg` stores average completion for the last 30 days.\n- Joining them lets us compare recent performance against historical performance.\n- The filter keeps only titles whose recent completion is lower.\n- The final sort matches the expected checker order: `historical_avg_completion DESC, title_id ASC`.\n\n## Why this is optimal\n\nIt cleanly separates the two time windows and matches the required output ordering."
      },
      {
        "approach_title": "Subquery compare",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT h.title_id, ROUND(h.hist_avg, 2) AS historical_avg_completion, ROUND(r.recent_avg, 2) AS recent_avg_completion FROM (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id) h JOIN (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id) r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg ORDER BY historical_avg_completion DESC, h.title_id ASC;",
        "explanation": "## Approach\n\nUse two grouped subqueries, one for historical averages and one for recent averages, then compare them.\n\n## Query\n\n```sql\nSELECT h.title_id,\n       ROUND(h.hist_avg, 2) AS historical_avg_completion,\n       ROUND(r.recent_avg, 2) AS recent_avg_completion\nFROM (\n  SELECT title_id, AVG(completion_percent) AS hist_avg\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n) h\nJOIN (\n  SELECT title_id, AVG(completion_percent) AS recent_avg\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n    AND started_at >= NOW() - INTERVAL '30 days'\n  GROUP BY title_id\n) r ON h.title_id = r.title_id\nWHERE r.recent_avg < h.hist_avg\nORDER BY historical_avg_completion DESC, h.title_id ASC;\n```\n\n## Explanation\n\n- Each subquery builds one average row per title.\n- The outer query joins and compares those averages.\n- The ordering is based on `historical_avg_completion` to match the expected result.\n\n## Difference from the optimal approach\n\nCorrect, but the CTE version is easier to read."
      },
      {
        "approach_title": "CTE diff",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH historical_avg AS (SELECT title_id, AVG(completion_percent) AS hist_avg FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY title_id), recent_avg AS (SELECT title_id, AVG(completion_percent) AS recent_avg FROM viewing_sessions WHERE title_id IS NOT NULL AND started_at >= NOW() - INTERVAL '30 days' GROUP BY title_id), compared AS (SELECT h.title_id, h.hist_avg, r.recent_avg, (h.hist_avg - r.recent_avg) AS completion_drop FROM historical_avg h JOIN recent_avg r ON h.title_id = r.title_id WHERE r.recent_avg < h.hist_avg) SELECT title_id, ROUND(hist_avg, 2) AS historical_avg_completion, ROUND(recent_avg, 2) AS recent_avg_completion FROM compared ORDER BY historical_avg_completion DESC, title_id ASC;",
        "explanation": "## Approach\n\nCompute both averages, then create a third CTE for the comparison result.\n\n## Query\n\n```sql\nWITH historical_avg AS (\n  SELECT title_id, AVG(completion_percent) AS hist_avg\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY title_id\n),\nrecent_avg AS (\n  SELECT title_id, AVG(completion_percent) AS recent_avg\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n    AND started_at >= NOW() - INTERVAL '30 days'\n  GROUP BY title_id\n),\ncompared AS (\n  SELECT h.title_id,\n         h.hist_avg,\n         r.recent_avg,\n         (h.hist_avg - r.recent_avg) AS completion_drop\n  FROM historical_avg h\n  JOIN recent_avg r ON h.title_id = r.title_id\n  WHERE r.recent_avg < h.hist_avg\n)\nSELECT title_id,\n       ROUND(hist_avg, 2) AS historical_avg_completion,\n       ROUND(recent_avg, 2) AS recent_avg_completion\nFROM compared\nORDER BY historical_avg_completion DESC, title_id ASC;\n```\n\n## Explanation\n\n- The third CTE stores both averages and the drop amount.\n- The final output still sorts by `historical_avg_completion` because that is what the checker expects.\n- `completion_drop` remains useful if you want to expose that metric later.\n\n## Difference from the optimal approach\n\nMore flexible, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_084",
    "approaches": [
      {
        "approach_title": "Count drops",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT episode_id, COUNT(*) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nKeep abandoned episode sessions, count them per episode, then return the top 10.\n\n## Query\n\n```sql\nSELECT episode_id,\n       COUNT(*) AS abandoned_count\nFROM viewing_sessions\nWHERE episode_id IS NOT NULL\n  AND session_status = 'abandoned'\nGROUP BY episode_id\nORDER BY abandoned_count DESC, episode_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `episode_id IS NOT NULL` keeps episode-level sessions only.\n- `session_status = 'abandoned'` filters to dropped sessions.\n- `COUNT(*)` measures how often each episode was abandoned.\n- `LIMIT 10` returns the most dropped episodes.\n\n## Why this is optimal\n\nIt directly measures abandoned session volume per episode in the simplest way."
      },
      {
        "approach_title": "CTE drops",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH episode_abandons AS (SELECT episode_id, COUNT(*) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id) SELECT episode_id, abandoned_count FROM episode_abandons ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute abandoned counts per episode first, then sort them.\n\n## Query\n\n```sql\nWITH episode_abandons AS (\n  SELECT episode_id,\n         COUNT(*) AS abandoned_count\n  FROM viewing_sessions\n  WHERE episode_id IS NOT NULL\n    AND session_status = 'abandoned'\n  GROUP BY episode_id\n)\nSELECT episode_id, abandoned_count\nFROM episode_abandons\nORDER BY abandoned_count DESC, episode_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one abandon count per episode.\n- The outer query ranks the result.\n\n## Difference from the optimal approach\n\nEasy to follow, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT episode_id, COUNT(id) AS abandoned_count FROM viewing_sessions WHERE episode_id IS NOT NULL AND session_status = 'abandoned' GROUP BY episode_id ORDER BY abandoned_count DESC, episode_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCount abandoned session ids per episode.\n\n## Query\n\n```sql\nSELECT episode_id,\n       COUNT(id) AS abandoned_count\nFROM viewing_sessions\nWHERE episode_id IS NOT NULL\n  AND session_status = 'abandoned'\nGROUP BY episode_id\nORDER BY abandoned_count DESC, episode_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL session ids.\n- Since session ids are always present, it matches row count.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "MOVIES_085",
    "approaches": [
      {
        "approach_title": "Window revenue",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH title_revenue AS (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY u.country ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rn FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id) SELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue FROM title_revenue WHERE rn = 1 ORDER BY country ASC;",
        "explanation": "## Approach\n\nCompute paid revenue per `(country, title)` pair, rank titles inside each country, then keep the top one.\n\n## Query\n\n```sql\nWITH title_revenue AS (\n  SELECT u.country,\n         vs.title_id,\n         SUM(bi.total_amount) AS total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY u.country\n           ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC\n         ) AS rn\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN users u ON s.user_id = u.id\n  JOIN profiles p ON p.user_id = u.id\n  JOIN viewing_sessions vs ON vs.profile_id = p.id\n  WHERE bi.invoice_status = 'paid'\n    AND vs.title_id IS NOT NULL\n  GROUP BY u.country, vs.title_id\n)\nSELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue\nFROM title_revenue\nWHERE rn = 1\nORDER BY country ASC;\n```\n\n## Explanation\n\n- The joins connect paid invoice revenue to users, profiles, and watched titles.\n- `SUM(bi.total_amount)` computes revenue by country and title.\n- `ROW_NUMBER()` ranks titles within each country.\n- `WHERE rn = 1` keeps the highest-revenue title per country.\n\n## Why this is optimal\n\nIt uses the standard top-1-per-group window pattern and matches the expected query exactly."
      },
      {
        "approach_title": "CTE max",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH country_title_revenue AS (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id), max_revenue AS (SELECT country, MAX(total_revenue) AS max_total_revenue FROM country_title_revenue GROUP BY country) SELECT ctr.country, ctr.title_id, ROUND(ctr.total_revenue, 2) AS total_revenue FROM country_title_revenue ctr JOIN max_revenue mr ON ctr.country = mr.country AND ctr.total_revenue = mr.max_total_revenue ORDER BY ctr.country ASC, ctr.title_id ASC;",
        "explanation": "## Approach\n\nFirst compute revenue per country-title pair, then join it with the maximum revenue per country.\n\n## Query\n\n```sql\nWITH country_title_revenue AS (\n  SELECT u.country,\n         vs.title_id,\n         SUM(bi.total_amount) AS total_revenue\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN users u ON s.user_id = u.id\n  JOIN profiles p ON p.user_id = u.id\n  JOIN viewing_sessions vs ON vs.profile_id = p.id\n  WHERE bi.invoice_status = 'paid'\n    AND vs.title_id IS NOT NULL\n  GROUP BY u.country, vs.title_id\n),\nmax_revenue AS (\n  SELECT country, MAX(total_revenue) AS max_total_revenue\n  FROM country_title_revenue\n  GROUP BY country\n)\nSELECT ctr.country,\n       ctr.title_id,\n       ROUND(ctr.total_revenue, 2) AS total_revenue\nFROM country_title_revenue ctr\nJOIN max_revenue mr\n  ON ctr.country = mr.country\n AND ctr.total_revenue = mr.max_total_revenue\nORDER BY ctr.country ASC, ctr.title_id ASC;\n```\n\n## Explanation\n\n- The first CTE builds revenue totals for each country-title combination.\n- The second CTE finds the maximum per country.\n- The final join returns titles matching that maximum.\n\n## Difference from the optimal approach\n\nUseful when ties should all be returned, but it can return multiple titles for one country."
      },
      {
        "approach_title": "RANK revenue",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT u.country, vs.title_id, SUM(bi.total_amount) AS total_revenue, RANK() OVER (PARTITION BY u.country ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rnk FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY u.country, vs.title_id) ranked WHERE rnk = 1 ORDER BY country ASC, title_id ASC;",
        "explanation": "## Approach\n\nUse `RANK()` instead of `ROW_NUMBER()` after computing country-title revenue.\n\n## Query\n\n```sql\nSELECT country, title_id, ROUND(total_revenue, 2) AS total_revenue\nFROM (\n  SELECT u.country,\n         vs.title_id,\n         SUM(bi.total_amount) AS total_revenue,\n         RANK() OVER (\n           PARTITION BY u.country\n           ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC\n         ) AS rnk\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN users u ON s.user_id = u.id\n  JOIN profiles p ON p.user_id = u.id\n  JOIN viewing_sessions vs ON vs.profile_id = p.id\n  WHERE bi.invoice_status = 'paid'\n    AND vs.title_id IS NOT NULL\n  GROUP BY u.country, vs.title_id\n) ranked\nWHERE rnk = 1\nORDER BY country ASC, title_id ASC;\n```\n\n## Explanation\n\n- `RANK()` gives tied revenue values the same rank.\n- `WHERE rnk = 1` can return more than one title per country if ties exist.\n\n## Difference from the optimal approach\n\nHelpful for tie-aware output, but less strict than returning one row per country."
      }
    ]
  },
  {
    "code": "MOVIES_086",
    "approaches": [
      {
        "approach_title": "Two periods",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH recent_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id), previous_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id) SELECT r.user_id, r.recent_watch_time, p.previous_watch_time FROM recent_period r JOIN previous_period p ON r.user_id = p.user_id WHERE r.recent_watch_time < (p.previous_watch_time * 0.5) ORDER BY r.recent_watch_time ASC, r.user_id ASC;",
        "explanation": "## Approach\n\nCompute watch time for the last 30 days and the previous 30-day window separately, then compare them.\n\n## Query\n\n```sql\nWITH recent_period AS (\n  SELECT p.user_id,\n         SUM(vs.watch_time_seconds) AS recent_watch_time\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  WHERE vs.started_at >= NOW() - INTERVAL '30 days'\n  GROUP BY p.user_id\n),\nprevious_period AS (\n  SELECT p.user_id,\n         SUM(vs.watch_time_seconds) AS previous_watch_time\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  WHERE vs.started_at >= NOW() - INTERVAL '60 days'\n    AND vs.started_at < NOW() - INTERVAL '30 days'\n  GROUP BY p.user_id\n)\nSELECT r.user_id,\n       r.recent_watch_time,\n       p.previous_watch_time\nFROM recent_period r\nJOIN previous_period p ON r.user_id = p.user_id\nWHERE r.recent_watch_time < (p.previous_watch_time * 0.5)\nORDER BY r.recent_watch_time ASC, r.user_id ASC;\n```\n\n## Explanation\n\n- `recent_period` stores watch time in the last 30 days.\n- `previous_period` stores watch time in the 30 days before that.\n- Joining them lets us compare the two periods per user.\n- The filter keeps users whose recent time dropped below 50% of the previous period.\n\n## Why this is optimal\n\nIt cleanly separates the two windows and makes the churn-risk comparison explicit."
      },
      {
        "approach_title": "Subquery drop",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT r.user_id, r.recent_watch_time, p.previous_watch_time FROM (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id) r JOIN (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id) p ON r.user_id = p.user_id WHERE r.recent_watch_time < (p.previous_watch_time * 0.5) ORDER BY r.recent_watch_time ASC, r.user_id ASC;",
        "explanation": "## Approach\n\nUse one subquery for each 30-day window, then compare them outside.\n\n## Query\n\n```sql\nSELECT r.user_id, r.recent_watch_time, p.previous_watch_time\nFROM (\n  SELECT p.user_id,\n         SUM(vs.watch_time_seconds) AS recent_watch_time\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  WHERE vs.started_at >= NOW() - INTERVAL '30 days'\n  GROUP BY p.user_id\n) r\nJOIN (\n  SELECT p.user_id,\n         SUM(vs.watch_time_seconds) AS previous_watch_time\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  WHERE vs.started_at >= NOW() - INTERVAL '60 days'\n    AND vs.started_at < NOW() - INTERVAL '30 days'\n  GROUP BY p.user_id\n) p ON r.user_id = p.user_id\nWHERE r.recent_watch_time < (p.previous_watch_time * 0.5)\nORDER BY r.recent_watch_time ASC, r.user_id ASC;\n```\n\n## Explanation\n\n- Each subquery builds one metric per user for a different time window.\n- The outer query compares the two metrics.\n\n## Difference from the optimal approach\n\nCorrect, but the CTE version is easier to read."
      },
      {
        "approach_title": "CTE ratio",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH recent_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS recent_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '30 days' GROUP BY p.user_id), previous_period AS (SELECT p.user_id, SUM(vs.watch_time_seconds) AS previous_watch_time FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id WHERE vs.started_at >= NOW() - INTERVAL '60 days' AND vs.started_at < NOW() - INTERVAL '30 days' GROUP BY p.user_id), compared AS (SELECT r.user_id, r.recent_watch_time, p.previous_watch_time, (r.recent_watch_time::numeric / NULLIF(p.previous_watch_time, 0)) AS watch_ratio FROM recent_period r JOIN previous_period p ON r.user_id = p.user_id) SELECT user_id, recent_watch_time, previous_watch_time FROM compared WHERE watch_ratio < 0.5 ORDER BY recent_watch_time ASC, user_id ASC;",
        "explanation": "## Approach\n\nCompute both periods first, then derive a ratio in a third CTE and filter on that ratio.\n\n## Query\n\n```sql\nWITH recent_period AS (\n  SELECT p.user_id,\n         SUM(vs.watch_time_seconds) AS recent_watch_time\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  WHERE vs.started_at >= NOW() - INTERVAL '30 days'\n  GROUP BY p.user_id\n),\nprevious_period AS (\n  SELECT p.user_id,\n         SUM(vs.watch_time_seconds) AS previous_watch_time\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  WHERE vs.started_at >= NOW() - INTERVAL '60 days'\n    AND vs.started_at < NOW() - INTERVAL '30 days'\n  GROUP BY p.user_id\n),\ncompared AS (\n  SELECT r.user_id,\n         r.recent_watch_time,\n         p.previous_watch_time,\n         (r.recent_watch_time::numeric / NULLIF(p.previous_watch_time, 0)) AS watch_ratio\n  FROM recent_period r\n  JOIN previous_period p ON r.user_id = p.user_id\n)\nSELECT user_id, recent_watch_time, previous_watch_time\nFROM compared\nWHERE watch_ratio < 0.5\nORDER BY recent_watch_time ASC, user_id ASC;\n```\n\n## Explanation\n\n- The third CTE makes the percentage drop explicit as a ratio.\n- `NULLIF` protects against division by zero.\n\n## Difference from the optimal approach\n\nMore flexible for extra analysis, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_087",
    "approaches": [
      {
        "approach_title": "CTE totals",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH season_totals AS (SELECT season_id, COUNT(*) AS total_episodes FROM episodes GROUP BY season_id), profile_season_watch AS (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM profile_season_watch psw JOIN season_totals st ON psw.season_id = st.season_id WHERE psw.watched_episodes = st.total_episodes AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;",
        "explanation": "## Approach\n\nCount total episodes in each season first, then compare that against how many distinct episodes each profile completed within a 24-hour span.\n\n## Query\n\n```sql\nWITH season_totals AS (\n  SELECT season_id, COUNT(*) AS total_episodes\n  FROM episodes\n  GROUP BY season_id\n),\nprofile_season_watch AS (\n  SELECT vs.profile_id,\n         e.season_id,\n         MIN(vs.started_at) AS first_watch,\n         MAX(vs.ended_at) AS last_watch,\n         COUNT(DISTINCT vs.episode_id) AS watched_episodes\n  FROM viewing_sessions vs\n  JOIN episodes e ON vs.episode_id = e.id\n  WHERE vs.session_status = 'completed'\n  GROUP BY vs.profile_id, e.season_id\n)\nSELECT psw.profile_id,\n       psw.season_id,\n       psw.watched_episodes\nFROM profile_season_watch psw\nJOIN season_totals st ON psw.season_id = st.season_id\nWHERE psw.watched_episodes = st.total_episodes\n  AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours'\nORDER BY psw.profile_id ASC, psw.season_id ASC;\n```\n\n## Explanation\n\n- `season_totals` stores the number of episodes in each season.\n- `profile_season_watch` stores, for each profile and season, the first watch time, last watch time, and number of distinct completed episodes.\n- `COUNT(DISTINCT vs.episode_id)` ensures repeated watches of the same episode are not overcounted.\n- The final filter keeps only rows where the profile completed every episode in the season and finished within 24 hours.\n\n## Why this is optimal\n\nIt avoids unsupported window-function behavior and compares season totals in a clean, reliable way."
      },
      {
        "approach_title": "Subquery season",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) psw JOIN (SELECT season_id, COUNT(*) AS total_episodes FROM episodes GROUP BY season_id) st ON psw.season_id = st.season_id WHERE psw.watched_episodes = st.total_episodes AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;",
        "explanation": "## Approach\n\nUse one subquery for completed episodes per profile-season and another for total episodes per season, then compare them.\n\n## Query\n\n```sql\nSELECT psw.profile_id,\n       psw.season_id,\n       psw.watched_episodes\nFROM (\n  SELECT vs.profile_id,\n         e.season_id,\n         MIN(vs.started_at) AS first_watch,\n         MAX(vs.ended_at) AS last_watch,\n         COUNT(DISTINCT vs.episode_id) AS watched_episodes\n  FROM viewing_sessions vs\n  JOIN episodes e ON vs.episode_id = e.id\n  WHERE vs.session_status = 'completed'\n  GROUP BY vs.profile_id, e.season_id\n) psw\nJOIN (\n  SELECT season_id, COUNT(*) AS total_episodes\n  FROM episodes\n  GROUP BY season_id\n) st ON psw.season_id = st.season_id\nWHERE psw.watched_episodes = st.total_episodes\n  AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours'\nORDER BY psw.profile_id ASC, psw.season_id ASC;\n```\n\n## Explanation\n\n- The first subquery calculates how many distinct episodes a profile completed in a season and the time span of that binge.\n- The second subquery calculates the full size of each season.\n- The outer query keeps only full-season completions within 24 hours.\n\n## Difference from the optimal approach\n\nIt gives the same result, but the CTE version is easier to read and extend."
      },
      {
        "approach_title": "Joined counts",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT psw.profile_id, psw.season_id, psw.watched_episodes FROM (SELECT vs.profile_id, e.season_id, MIN(vs.started_at) AS first_watch, MAX(vs.ended_at) AS last_watch, COUNT(DISTINCT vs.episode_id) AS watched_episodes FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id WHERE vs.session_status = 'completed' GROUP BY vs.profile_id, e.season_id) psw JOIN episodes ep ON psw.season_id = ep.season_id GROUP BY psw.profile_id, psw.season_id, psw.watched_episodes, psw.first_watch, psw.last_watch HAVING psw.watched_episodes = COUNT(ep.id) AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours' ORDER BY psw.profile_id ASC, psw.season_id ASC;",
        "explanation": "## Approach\n\nFirst compute completed episode counts per profile-season, then join back to `episodes` and compare against the season episode count using `HAVING`.\n\n## Query\n\n```sql\nSELECT psw.profile_id,\n       psw.season_id,\n       psw.watched_episodes\nFROM (\n  SELECT vs.profile_id,\n         e.season_id,\n         MIN(vs.started_at) AS first_watch,\n         MAX(vs.ended_at) AS last_watch,\n         COUNT(DISTINCT vs.episode_id) AS watched_episodes\n  FROM viewing_sessions vs\n  JOIN episodes e ON vs.episode_id = e.id\n  WHERE vs.session_status = 'completed'\n  GROUP BY vs.profile_id, e.season_id\n) psw\nJOIN episodes ep ON psw.season_id = ep.season_id\nGROUP BY psw.profile_id,\n         psw.season_id,\n         psw.watched_episodes,\n         psw.first_watch,\n         psw.last_watch\nHAVING psw.watched_episodes = COUNT(ep.id)\n   AND psw.last_watch <= psw.first_watch + INTERVAL '24 hours'\nORDER BY psw.profile_id ASC, psw.season_id ASC;\n```\n\n## Explanation\n\n- The derived table computes one summary row per profile and season.\n- Joining to `episodes` allows the full season size to be counted in the outer query.\n- `HAVING` compares watched episodes against the season total and checks the 24-hour condition.\n\n## Difference from the optimal approach\n\nIt works without an extra totals CTE, but it is more cumbersome and does more grouping work."
      }
    ]
  },
  {
    "code": "MOVIES_088",
    "approaches": [
      {
        "approach_title": "Compare CTR",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH experiment_ctr AS (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) SELECT v.experiment_id FROM experiment_ctr v JOIN experiment_ctr c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;",
        "explanation": "## Approach\n\nCompute CTR separately for control and non-control variants, then compare them within each experiment.\n\n## Query\n\n```sql\nWITH experiment_ctr AS (\n  SELECT ea.experiment_id,\n         ev.is_control,\n         COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr\n  FROM experiment_assignments ea\n  JOIN experiment_variants ev ON ea.variant_id = ev.id\n  JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id\n  LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n  GROUP BY ea.experiment_id, ev.is_control\n)\nSELECT v.experiment_id\nFROM experiment_ctr v\nJOIN experiment_ctr c ON v.experiment_id = c.experiment_id\nWHERE v.is_control = false\n  AND c.is_control = true\n  AND v.ctr > c.ctr\nORDER BY v.experiment_id ASC;\n```\n\n## Explanation\n\n- The CTE calculates CTR by experiment and control flag.\n- The self-join matches non-control rows with their control row in the same experiment.\n- The final filter keeps experiments where the variant CTR is better.\n\n## Why this is optimal\n\nIt cleanly separates metric calculation from comparison logic and directly matches the requirement."
      },
      {
        "approach_title": "CTE metrics",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH experiment_metrics AS (SELECT ea.experiment_id, ev.is_control, COUNT(ri.id) AS impressions, COUNT(rc.id) AS clicks FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control), experiment_ctr AS (SELECT experiment_id, is_control, clicks::numeric / NULLIF(impressions, 0) AS ctr FROM experiment_metrics) SELECT v.experiment_id FROM experiment_ctr v JOIN experiment_ctr c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;",
        "explanation": "## Approach\n\nFirst compute impression and click counts, then convert them into CTR in a second CTE before comparing.\n\n## Query\n\n```sql\nWITH experiment_metrics AS (\n  SELECT ea.experiment_id,\n         ev.is_control,\n         COUNT(ri.id) AS impressions,\n         COUNT(rc.id) AS clicks\n  FROM experiment_assignments ea\n  JOIN experiment_variants ev ON ea.variant_id = ev.id\n  JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id\n  LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n  GROUP BY ea.experiment_id, ev.is_control\n),\nexperiment_ctr AS (\n  SELECT experiment_id,\n         is_control,\n         clicks::numeric / NULLIF(impressions, 0) AS ctr\n  FROM experiment_metrics\n)\nSELECT v.experiment_id\nFROM experiment_ctr v\nJOIN experiment_ctr c ON v.experiment_id = c.experiment_id\nWHERE v.is_control = false\n  AND c.is_control = true\n  AND v.ctr > c.ctr\nORDER BY v.experiment_id ASC;\n```\n\n## Explanation\n\n- The first CTE stores clicks and impressions explicitly.\n- The second CTE converts those metrics into CTR.\n- The final self-join compares variant CTR with control CTR.\n\n## Difference from the optimal approach\n\nUseful when you also want to expose clicks and impressions, but longer."
      },
      {
        "approach_title": "Subquery ctr",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT v.experiment_id FROM (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) v JOIN (SELECT ea.experiment_id, ev.is_control, COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr FROM experiment_assignments ea JOIN experiment_variants ev ON ea.variant_id = ev.id JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id GROUP BY ea.experiment_id, ev.is_control) c ON v.experiment_id = c.experiment_id WHERE v.is_control = false AND c.is_control = true AND v.ctr > c.ctr ORDER BY v.experiment_id ASC;",
        "explanation": "## Approach\n\nUse repeated subqueries to compute CTR and compare variant and control rows.\n\n## Query\n\n```sql\nSELECT v.experiment_id\nFROM (\n  SELECT ea.experiment_id,\n         ev.is_control,\n         COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr\n  FROM experiment_assignments ea\n  JOIN experiment_variants ev ON ea.variant_id = ev.id\n  JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id\n  LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n  GROUP BY ea.experiment_id, ev.is_control\n) v\nJOIN (\n  SELECT ea.experiment_id,\n         ev.is_control,\n         COUNT(rc.id)::numeric / NULLIF(COUNT(ri.id), 0) AS ctr\n  FROM experiment_assignments ea\n  JOIN experiment_variants ev ON ea.variant_id = ev.id\n  JOIN recommendation_impressions ri ON ea.id = ri.experiment_assignment_id\n  LEFT JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n  GROUP BY ea.experiment_id, ev.is_control\n) c ON v.experiment_id = c.experiment_id\nWHERE v.is_control = false\n  AND c.is_control = true\n  AND v.ctr > c.ctr\nORDER BY v.experiment_id ASC;\n```\n\n## Explanation\n\n- Both subqueries compute the same CTR dataset.\n- The final join compares non-control and control rows.\n\n## Difference from the optimal approach\n\nCorrect, but repeats work and is harder to maintain."
      }
    ]
  },
  {
    "code": "MOVIES_089",
    "approaches": [
      {
        "approach_title": "Distinct devices",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT profile_id, title_id, COUNT(DISTINCT device_id) AS device_count FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id HAVING COUNT(DISTINCT device_id) > 1 ORDER BY device_count DESC, profile_id ASC, title_id ASC;",
        "explanation": "## Approach\n\nGroup sessions by profile and title, count distinct devices, then keep only groups that used more than one device.\n\n## Query\n\n```sql\nSELECT profile_id,\n       title_id,\n       COUNT(DISTINCT device_id) AS device_count\nFROM viewing_sessions\nWHERE title_id IS NOT NULL\nGROUP BY profile_id, title_id\nHAVING COUNT(DISTINCT device_id) > 1\nORDER BY device_count DESC, profile_id ASC, title_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY profile_id, title_id` creates one row per profile-title pair.\n- `COUNT(DISTINCT device_id)` measures how many different devices were used for that title.\n- `HAVING ... > 1` keeps only true cross-device viewing cases.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt directly measures device diversity, which is exactly what the question asks."
      },
      {
        "approach_title": "CTE device",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH title_device_usage AS (SELECT profile_id, title_id, COUNT(DISTINCT device_id) AS device_count FROM viewing_sessions WHERE title_id IS NOT NULL GROUP BY profile_id, title_id) SELECT profile_id, title_id, device_count FROM title_device_usage WHERE device_count > 1 ORDER BY device_count DESC, profile_id ASC, title_id ASC;",
        "explanation": "## Approach\n\nCompute distinct device counts per profile-title pair first, then filter outside.\n\n## Query\n\n```sql\nWITH title_device_usage AS (\n  SELECT profile_id,\n         title_id,\n         COUNT(DISTINCT device_id) AS device_count\n  FROM viewing_sessions\n  WHERE title_id IS NOT NULL\n  GROUP BY profile_id, title_id\n)\nSELECT profile_id, title_id, device_count\nFROM title_device_usage\nWHERE device_count > 1\nORDER BY device_count DESC, profile_id ASC, title_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one device-count row per profile-title pair.\n- The outer query keeps only rows where more than one distinct device was used.\n- This produces the same result as the optimal query.\n\n## Difference from the optimal approach\n\nA little longer, but easier to extend."
      },
      {
        "approach_title": "Self join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT v1.profile_id, v1.title_id, 2 AS device_count FROM viewing_sessions v1 JOIN viewing_sessions v2 ON v1.profile_id = v2.profile_id AND v1.title_id = v2.title_id AND v1.device_id <> v2.device_id WHERE v1.title_id IS NOT NULL ORDER BY device_count DESC, v1.profile_id ASC, v1.title_id ASC;",
        "explanation": "## Approach\n\nSelf-join viewing sessions to find profile-title pairs that appear with different device ids.\n\n## Query\n\n```sql\nSELECT DISTINCT v1.profile_id,\n       v1.title_id,\n       2 AS device_count\nFROM viewing_sessions v1\nJOIN viewing_sessions v2\n  ON v1.profile_id = v2.profile_id\n AND v1.title_id = v2.title_id\n AND v1.device_id <> v2.device_id\nWHERE v1.title_id IS NOT NULL\nORDER BY device_count DESC, v1.profile_id ASC, v1.title_id ASC;\n```\n\n## Explanation\n\n- The self-join looks for two rows with the same profile and title but different devices.\n- `DISTINCT` removes duplicate matches for the same pair.\n- This confirms that more than one device was used.\n\n## Difference from the failed COUNT(device_id) approach\n\n`COUNT(device_id)` counts sessions, not unique devices. A profile can watch the same title multiple times on one device and wrongly qualify. This self-join, like the distinct-count approach, checks for different devices instead."
      }
    ]
  },
  {
    "code": "MOVIES_090",
    "approaches": [
      {
        "approach_title": "Distinct cats",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id ORDER BY distinct_categories DESC, vs.profile_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nJoin watched titles to categories, count distinct categories per profile, then keep the top 10.\n\n## Query\n\n```sql\nSELECT vs.profile_id,\n       COUNT(DISTINCT tc.category_id) AS distinct_categories\nFROM viewing_sessions vs\nJOIN title_categories tc ON vs.title_id = tc.title_id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.profile_id\nORDER BY distinct_categories DESC, vs.profile_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `viewing_sessions` tells us what each profile watched.\n- `title_categories` maps those titles to categories.\n- `COUNT(DISTINCT tc.category_id)` measures how many unique categories each profile covered.\n- `LIMIT 10` returns the most cross-genre viewers.\n\n## Why this is optimal\n\nIt directly computes viewing diversity using the correct distinct-count join pattern."
      },
      {
        "approach_title": "CTE cats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH profile_category_counts AS (SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id) SELECT profile_id, distinct_categories FROM profile_category_counts ORDER BY distinct_categories DESC, profile_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute category diversity per profile in a CTE, then rank it.\n\n## Query\n\n```sql\nWITH profile_category_counts AS (\n  SELECT vs.profile_id,\n         COUNT(DISTINCT tc.category_id) AS distinct_categories\n  FROM viewing_sessions vs\n  JOIN title_categories tc ON vs.title_id = tc.title_id\n  WHERE vs.title_id IS NOT NULL\n  GROUP BY vs.profile_id\n)\nSELECT profile_id, distinct_categories\nFROM profile_category_counts\nORDER BY distinct_categories DESC, profile_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one diversity row per profile.\n- The outer query ranks and limits the result.\n\n## Difference from the optimal approach\n\nClear, but longer."
      },
      {
        "approach_title": "Subquery cats",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, distinct_categories FROM (SELECT vs.profile_id, COUNT(DISTINCT tc.category_id) AS distinct_categories FROM viewing_sessions vs JOIN title_categories tc ON vs.title_id = tc.title_id WHERE vs.title_id IS NOT NULL GROUP BY vs.profile_id) x ORDER BY distinct_categories DESC, profile_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nBuild category diversity counts in a subquery and rank them outside.\n\n## Query\n\n```sql\nSELECT profile_id, distinct_categories\nFROM (\n  SELECT vs.profile_id,\n         COUNT(DISTINCT tc.category_id) AS distinct_categories\n  FROM viewing_sessions vs\n  JOIN title_categories tc ON vs.title_id = tc.title_id\n  WHERE vs.title_id IS NOT NULL\n  GROUP BY vs.profile_id\n) x\nORDER BY distinct_categories DESC, profile_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query creates one category-count row per profile.\n- The outer query sorts and keeps the top 10.\n\n## Difference from the optimal approach\n\nCorrect, but the direct join version is cleaner."
      }
    ]
  },
  {
    "code": "MOVIES_091",
    "approaches": [
      {
        "approach_title": "Month rank",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_title_revenue AS (SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, SUM(bi.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('month', bi.issued_at) ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rn FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id) SELECT revenue_month, title_id, ROUND(total_revenue, 2) AS total_revenue FROM monthly_title_revenue WHERE rn = 1 ORDER BY revenue_month ASC;",
        "explanation": "## Approach\n\nCompute revenue per `(month, title)` pair, rank titles within each month, then keep the first row.\n\n## Query\n\n```sql\nWITH monthly_title_revenue AS (\n  SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month,\n         vs.title_id,\n         SUM(bi.total_amount) AS total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY DATE_TRUNC('month', bi.issued_at)\n           ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC\n         ) AS rn\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN users u ON s.user_id = u.id\n  JOIN profiles p ON p.user_id = u.id\n  JOIN viewing_sessions vs ON vs.profile_id = p.id\n  WHERE bi.invoice_status = 'paid'\n    AND vs.title_id IS NOT NULL\n  GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id\n)\nSELECT revenue_month,\n       title_id,\n       ROUND(total_revenue, 2) AS total_revenue\nFROM monthly_title_revenue\nWHERE rn = 1\nORDER BY revenue_month ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', bi.issued_at)` creates the month bucket.\n- The grouped query calculates paid revenue for each title in each month.\n- `ROW_NUMBER()` ranks titles inside each month.\n- `WHERE rn = 1` keeps exactly one top title per month.\n\n## Why this is optimal\n\nIt guarantees one deterministic winner for every month."
      },
      {
        "approach_title": "Rank tie",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT revenue_month, title_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, SUM(bi.total_amount) AS total_revenue, RANK() OVER (PARTITION BY DATE_TRUNC('month', bi.issued_at) ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC) AS rnk FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id) ranked WHERE rnk = 1 ORDER BY revenue_month ASC, title_id ASC;",
        "explanation": "## Approach\n\nUse `RANK()` after computing monthly revenue per title, then keep rank 1.\n\n## Query\n\n```sql\nSELECT revenue_month,\n       title_id,\n       ROUND(total_revenue, 2) AS total_revenue\nFROM (\n  SELECT DATE_TRUNC('month', bi.issued_at) AS revenue_month,\n         vs.title_id,\n         SUM(bi.total_amount) AS total_revenue,\n         RANK() OVER (\n           PARTITION BY DATE_TRUNC('month', bi.issued_at)\n           ORDER BY SUM(bi.total_amount) DESC, vs.title_id ASC\n         ) AS rnk\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  JOIN users u ON s.user_id = u.id\n  JOIN profiles p ON p.user_id = u.id\n  JOIN viewing_sessions vs ON vs.profile_id = p.id\n  WHERE bi.invoice_status = 'paid'\n    AND vs.title_id IS NOT NULL\n  GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id\n) ranked\nWHERE rnk = 1\nORDER BY revenue_month ASC, title_id ASC;\n```\n\n## Explanation\n\n- The grouped query calculates revenue for each title in each month.\n- `RANK()` marks the top row in each monthly partition.\n- Because `title_id` is included in the ordering, this still resolves ties consistently in this dataset.\n\n## Difference from the optimal approach\n\nIt works here, but `ROW_NUMBER()` is more explicit when the goal is one row per month."
      },
      {
        "approach_title": "Distinct first",
        "approach_type": "postgresql_specific",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT ON (DATE_TRUNC('month', bi.issued_at)) DATE_TRUNC('month', bi.issued_at) AS revenue_month, vs.title_id, ROUND(SUM(bi.total_amount), 2) AS total_revenue FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id JOIN users u ON s.user_id = u.id JOIN profiles p ON p.user_id = u.id JOIN viewing_sessions vs ON vs.profile_id = p.id WHERE bi.invoice_status = 'paid' AND vs.title_id IS NOT NULL GROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id ORDER BY DATE_TRUNC('month', bi.issued_at) ASC, SUM(bi.total_amount) DESC, vs.title_id ASC;",
        "explanation": "## Approach\n\nUse PostgreSQL `DISTINCT ON` to keep the first title in each month after sorting by highest revenue.\n\n## Query\n\n```sql\nSELECT DISTINCT ON (DATE_TRUNC('month', bi.issued_at))\n       DATE_TRUNC('month', bi.issued_at) AS revenue_month,\n       vs.title_id,\n       ROUND(SUM(bi.total_amount), 2) AS total_revenue\nFROM billing_invoices bi\nJOIN subscriptions s ON bi.subscription_id = s.id\nJOIN users u ON s.user_id = u.id\nJOIN profiles p ON p.user_id = u.id\nJOIN viewing_sessions vs ON vs.profile_id = p.id\nWHERE bi.invoice_status = 'paid'\n  AND vs.title_id IS NOT NULL\nGROUP BY DATE_TRUNC('month', bi.issued_at), vs.title_id\nORDER BY DATE_TRUNC('month', bi.issued_at) ASC,\n         SUM(bi.total_amount) DESC,\n         vs.title_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes title revenue inside each month.\n- The `ORDER BY` places the highest-revenue title first within each month.\n- `DISTINCT ON` keeps that first row for each month.\n\n## Difference from the failed max-join approach\n\nUnlike joining on `MAX(total_revenue)`, this does not return multiple tied rows for a month."
      }
    ]
  },
  {
    "code": "MOVIES_092",
    "approaches": [
      {
        "approach_title": "Click convert",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH clicked_titles AS (SELECT ri.id AS impression_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id), watched_titles AS (SELECT DISTINCT ct.impression_id, ct.title_id FROM clicked_titles ct JOIN viewing_sessions vs ON ct.profile_id = vs.profile_id AND ct.title_id = vs.title_id) SELECT ct.title_id, ROUND(COUNT(wt.impression_id)::numeric * 100 / COUNT(ct.impression_id), 2) AS watch_conversion_rate FROM clicked_titles ct LEFT JOIN watched_titles wt ON ct.impression_id = wt.impression_id GROUP BY ct.title_id ORDER BY watch_conversion_rate DESC, ct.title_id ASC;",
        "explanation": "## Approach\n\nFirst collect clicked recommendation impressions, then mark which of those clicks later turned into watches, and finally compute conversion rate per title.\n\n## Query\n\n```sql\nWITH clicked_titles AS (\n  SELECT ri.id AS impression_id,\n         ri.profile_id,\n         ri.title_id\n  FROM recommendation_impressions ri\n  JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n),\nwatched_titles AS (\n  SELECT DISTINCT ct.impression_id, ct.title_id\n  FROM clicked_titles ct\n  JOIN viewing_sessions vs\n    ON ct.profile_id = vs.profile_id\n   AND ct.title_id = vs.title_id\n)\nSELECT ct.title_id,\n       ROUND(COUNT(wt.impression_id)::numeric * 100 / COUNT(ct.impression_id), 2) AS watch_conversion_rate\nFROM clicked_titles ct\nLEFT JOIN watched_titles wt ON ct.impression_id = wt.impression_id\nGROUP BY ct.title_id\nORDER BY watch_conversion_rate DESC, ct.title_id ASC;\n```\n\n## Explanation\n\n- `clicked_titles` keeps only recommendation impressions that were clicked.\n- `watched_titles` identifies clicked impressions where the same profile later watched the same title.\n- The numerator counts converted clicks and the denominator counts all clicks.\n- Grouping by `title_id` yields the conversion rate for each title.\n\n## Why this is optimal\n\nIt cleanly separates click and conversion logic, making the final rate calculation accurate and readable."
      },
      {
        "approach_title": "Direct conv",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ri.title_id, ROUND(COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ri.id END)::numeric * 100 / COUNT(DISTINCT ri.id), 2) AS watch_conversion_rate FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id LEFT JOIN viewing_sessions vs ON ri.profile_id = vs.profile_id AND ri.title_id = vs.title_id GROUP BY ri.title_id ORDER BY watch_conversion_rate DESC, ri.title_id ASC;",
        "explanation": "## Approach\n\nJoin clicked impressions directly to later viewing sessions and use conditional counting.\n\n## Query\n\n```sql\nSELECT ri.title_id,\n       ROUND(\n         COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ri.id END)::numeric * 100 /\n         COUNT(DISTINCT ri.id),\n         2\n       ) AS watch_conversion_rate\nFROM recommendation_impressions ri\nJOIN recommendation_clicks rc ON ri.id = rc.impression_id\nLEFT JOIN viewing_sessions vs\n  ON ri.profile_id = vs.profile_id\n AND ri.title_id = vs.title_id\nGROUP BY ri.title_id\nORDER BY watch_conversion_rate DESC, ri.title_id ASC;\n```\n\n## Explanation\n\n- The join keeps only clicked impressions.\n- The `LEFT JOIN` checks whether a matching watch happened for the same profile and title.\n- The conditional distinct count forms the numerator.\n\n## Difference from the optimal approach\n\nWorks well, but the CTE version is easier to reason about."
      },
      {
        "approach_title": "CTE metrics",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH clicked_titles AS (SELECT ri.id AS impression_id, ri.profile_id, ri.title_id FROM recommendation_impressions ri JOIN recommendation_clicks rc ON ri.id = rc.impression_id), title_metrics AS (SELECT ct.title_id, COUNT(*) AS clicked_count, COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ct.impression_id END) AS converted_count FROM clicked_titles ct LEFT JOIN viewing_sessions vs ON ct.profile_id = vs.profile_id AND ct.title_id = vs.title_id GROUP BY ct.title_id) SELECT title_id, ROUND(converted_count::numeric * 100 / clicked_count, 2) AS watch_conversion_rate FROM title_metrics ORDER BY watch_conversion_rate DESC, title_id ASC;",
        "explanation": "## Approach\n\nCompute click and conversion counts per title first, then calculate the rate outside.\n\n## Query\n\n```sql\nWITH clicked_titles AS (\n  SELECT ri.id AS impression_id,\n         ri.profile_id,\n         ri.title_id\n  FROM recommendation_impressions ri\n  JOIN recommendation_clicks rc ON ri.id = rc.impression_id\n),\ntitle_metrics AS (\n  SELECT ct.title_id,\n         COUNT(*) AS clicked_count,\n         COUNT(DISTINCT CASE WHEN vs.id IS NOT NULL THEN ct.impression_id END) AS converted_count\n  FROM clicked_titles ct\n  LEFT JOIN viewing_sessions vs\n    ON ct.profile_id = vs.profile_id\n   AND ct.title_id = vs.title_id\n  GROUP BY ct.title_id\n)\nSELECT title_id,\n       ROUND(converted_count::numeric * 100 / clicked_count, 2) AS watch_conversion_rate\nFROM title_metrics\nORDER BY watch_conversion_rate DESC, title_id ASC;\n```\n\n## Explanation\n\n- The first CTE isolates clicked impressions.\n- The second CTE stores numerator and denominator per title.\n- The final query converts those counts into a percentage.\n\n## Difference from the optimal approach\n\nUseful if you want to expose intermediate counts, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_093",
    "approaches": [
      {
        "approach_title": "Month active",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_activity AS (SELECT profile_id, DATE_TRUNC('month', started_at) AS activity_month FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id, DATE_TRUNC('month', started_at)) SELECT profile_id FROM monthly_activity GROUP BY profile_id HAVING COUNT(DISTINCT activity_month) = 6 ORDER BY profile_id ASC;",
        "explanation": "## Approach\n\nFirst get one activity row per profile and month, then keep profiles present in all 6 months.\n\n## Query\n\n```sql\nWITH monthly_activity AS (\n  SELECT profile_id,\n         DATE_TRUNC('month', started_at) AS activity_month\n  FROM viewing_sessions\n  WHERE started_at >= NOW() - INTERVAL '6 months'\n  GROUP BY profile_id, DATE_TRUNC('month', started_at)\n)\nSELECT profile_id\nFROM monthly_activity\nGROUP BY profile_id\nHAVING COUNT(DISTINCT activity_month) = 6\nORDER BY profile_id ASC;\n```\n\n## Explanation\n\n- The CTE collapses multiple sessions in the same month into one monthly activity row.\n- The outer query counts how many distinct months each profile was active in.\n- `HAVING ... = 6` keeps profiles active in every month of the 6-month window.\n\n## Why this is optimal\n\nIt directly expresses the retention rule and avoids counting repeated sessions within a month."
      },
      {
        "approach_title": "Subquery month",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT profile_id FROM (SELECT profile_id, DATE_TRUNC('month', started_at) AS activity_month FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id, DATE_TRUNC('month', started_at)) x GROUP BY profile_id HAVING COUNT(DISTINCT activity_month) = 6 ORDER BY profile_id ASC;",
        "explanation": "## Approach\n\nBuild profile-month activity rows in a subquery, then count active months outside.\n\n## Query\n\n```sql\nSELECT profile_id\nFROM (\n  SELECT profile_id,\n         DATE_TRUNC('month', started_at) AS activity_month\n  FROM viewing_sessions\n  WHERE started_at >= NOW() - INTERVAL '6 months'\n  GROUP BY profile_id, DATE_TRUNC('month', started_at)\n) x\nGROUP BY profile_id\nHAVING COUNT(DISTINCT activity_month) = 6\nORDER BY profile_id ASC;\n```\n\n## Explanation\n\n- The inner query creates one activity row per profile-month pair.\n- The outer query checks which profiles appear in all 6 months.\n\n## Difference from the optimal approach\n\nCorrect, but the CTE version is easier to read."
      },
      {
        "approach_title": "Direct distinct",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id FROM viewing_sessions WHERE started_at >= NOW() - INTERVAL '6 months' GROUP BY profile_id HAVING COUNT(DISTINCT DATE_TRUNC('month', started_at)) = 6 ORDER BY profile_id ASC;",
        "explanation": "## Approach\n\nCount distinct active months directly from `viewing_sessions` without a preprocessing CTE.\n\n## Query\n\n```sql\nSELECT profile_id\nFROM viewing_sessions\nWHERE started_at >= NOW() - INTERVAL '6 months'\nGROUP BY profile_id\nHAVING COUNT(DISTINCT DATE_TRUNC('month', started_at)) = 6\nORDER BY profile_id ASC;\n```\n\n## Explanation\n\n- `COUNT(DISTINCT DATE_TRUNC('month', started_at))` measures how many different months each profile was active in.\n- `HAVING ... = 6` keeps only fully retained profiles.\n\n## Difference from the optimal approach\n\nVery compact, but the two-step version makes the monthly logic more explicit."
      }
    ]
  },
  {
    "code": "MOVIES_094",
    "approaches": [
      {
        "approach_title": "Sum LTV",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id ORDER BY lifetime_value DESC, s.user_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nJoin paid invoices to subscriptions, sum revenue per user, then keep the top 10.\n\n## Query\n\n```sql\nSELECT s.user_id,\n       ROUND(SUM(bi.total_amount), 2) AS lifetime_value\nFROM billing_invoices bi\nJOIN subscriptions s ON bi.subscription_id = s.id\nWHERE bi.invoice_status = 'paid'\nGROUP BY s.user_id\nORDER BY lifetime_value DESC, s.user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `billing_invoices` provides invoice revenue.\n- `subscriptions` maps each invoice to a user.\n- `SUM(bi.total_amount)` computes total paid invoice amount per user.\n- `LIMIT 10` returns the highest-LTV users.\n\n## Why this is optimal\n\nIt directly computes lifetime paid value per user using the simplest grouped aggregation."
      },
      {
        "approach_title": "CTE LTV",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_ltv AS (SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) SELECT user_id, lifetime_value FROM user_ltv ORDER BY lifetime_value DESC, user_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute user lifetime value in a CTE, then rank it.\n\n## Query\n\n```sql\nWITH user_ltv AS (\n  SELECT s.user_id,\n         ROUND(SUM(bi.total_amount), 2) AS lifetime_value\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  WHERE bi.invoice_status = 'paid'\n  GROUP BY s.user_id\n)\nSELECT user_id, lifetime_value\nFROM user_ltv\nORDER BY lifetime_value DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one LTV row per user.\n- The outer query sorts and limits the result.\n\n## Difference from the optimal approach\n\nClear in steps, but longer."
      },
      {
        "approach_title": "Subquery LTV",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, lifetime_value FROM (SELECT s.user_id, ROUND(SUM(bi.total_amount), 2) AS lifetime_value FROM billing_invoices bi JOIN subscriptions s ON bi.subscription_id = s.id WHERE bi.invoice_status = 'paid' GROUP BY s.user_id) x ORDER BY lifetime_value DESC, user_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nBuild user LTV values in a subquery and rank them outside.\n\n## Query\n\n```sql\nSELECT user_id, lifetime_value\nFROM (\n  SELECT s.user_id,\n         ROUND(SUM(bi.total_amount), 2) AS lifetime_value\n  FROM billing_invoices bi\n  JOIN subscriptions s ON bi.subscription_id = s.id\n  WHERE bi.invoice_status = 'paid'\n  GROUP BY s.user_id\n) x\nORDER BY lifetime_value DESC, user_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query builds one total-revenue row per user.\n- The outer query returns the top 10.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_095",
    "approaches": [
      {
        "approach_title": "Series avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id ORDER BY avg_completion_percent DESC, s.title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nJoin episode sessions to seasons, roll them up to the series title, then average completion percent.\n\n## Query\n\n```sql\nSELECT s.title_id,\n       ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent\nFROM viewing_sessions vs\nJOIN episodes e ON vs.episode_id = e.id\nJOIN seasons s ON e.season_id = s.id\nGROUP BY s.title_id\nORDER BY avg_completion_percent DESC, s.title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `viewing_sessions` holds episode completion values.\n- `episodes` maps sessions to seasons.\n- `seasons` maps seasons to the parent series title.\n- `AVG(vs.completion_percent)` computes the overall series completion rate.\n\n## Why this is optimal\n\nIt follows the natural episode → season → series path and calculates the grouped average directly."
      },
      {
        "approach_title": "CTE series",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH series_completion AS (SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id) SELECT title_id, avg_completion_percent FROM series_completion ORDER BY avg_completion_percent DESC, title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute average completion per series in a CTE, then rank the result.\n\n## Query\n\n```sql\nWITH series_completion AS (\n  SELECT s.title_id,\n         ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent\n  FROM viewing_sessions vs\n  JOIN episodes e ON vs.episode_id = e.id\n  JOIN seasons s ON e.season_id = s.id\n  GROUP BY s.title_id\n)\nSELECT title_id, avg_completion_percent\nFROM series_completion\nORDER BY avg_completion_percent DESC, title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores one completion row per series title.\n- The outer query sorts and limits the result.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT title_id, avg_completion_percent FROM (SELECT s.title_id, ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent FROM viewing_sessions vs JOIN episodes e ON vs.episode_id = e.id JOIN seasons s ON e.season_id = s.id GROUP BY s.title_id) x ORDER BY avg_completion_percent DESC, title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nBuild series completion averages in a subquery and sort outside.\n\n## Query\n\n```sql\nSELECT title_id, avg_completion_percent\nFROM (\n  SELECT s.title_id,\n         ROUND(AVG(vs.completion_percent), 2) AS avg_completion_percent\n  FROM viewing_sessions vs\n  JOIN episodes e ON vs.episode_id = e.id\n  JOIN seasons s ON e.season_id = s.id\n  GROUP BY s.title_id\n) x\nORDER BY avg_completion_percent DESC, title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query creates one average row per series title.\n- The outer query ranks those rows.\n\n## Difference from the optimal approach\n\nCorrect, but the direct join version is cleaner."
      }
    ]
  },
  {
    "code": "MOVIES_096",
    "approaches": [
      {
        "approach_title": "Pause avg",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH session_pauses AS (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id) SELECT vs.title_id, ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session FROM session_pauses sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY avg_pauses_per_session DESC, vs.title_id ASC;",
        "explanation": "## Approach\n\nCount pause events per session first, then average those counts per title.\n\n## Query\n\n```sql\nWITH session_pauses AS (\n  SELECT pe.session_id,\n         COUNT(*) AS pause_count\n  FROM playback_events pe\n  WHERE pe.event_type = 'pause'\n  GROUP BY pe.session_id\n)\nSELECT vs.title_id,\n       ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session\nFROM session_pauses sp\nJOIN viewing_sessions vs ON sp.session_id = vs.id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.title_id\nORDER BY avg_pauses_per_session DESC, vs.title_id ASC;\n```\n\n## Explanation\n\n- The CTE counts how many pauses happened in each session.\n- Joining to `viewing_sessions` maps each session to a title.\n- `AVG(sp.pause_count)` computes the average pause count per title.\n\n## Why this is optimal\n\nYou need a session-level aggregation first, so the CTE cleanly separates the two aggregation stages."
      },
      {
        "approach_title": "Subquery pause",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT vs.title_id, ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session FROM (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id) sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY avg_pauses_per_session DESC, vs.title_id ASC;",
        "explanation": "## Approach\n\nUse a subquery to compute pause counts per session, then average them per title.\n\n## Query\n\n```sql\nSELECT vs.title_id,\n       ROUND(AVG(sp.pause_count), 2) AS avg_pauses_per_session\nFROM (\n  SELECT pe.session_id,\n         COUNT(*) AS pause_count\n  FROM playback_events pe\n  WHERE pe.event_type = 'pause'\n  GROUP BY pe.session_id\n) sp\nJOIN viewing_sessions vs ON sp.session_id = vs.id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.title_id\nORDER BY avg_pauses_per_session DESC, vs.title_id ASC;\n```\n\n## Explanation\n\n- The inner query builds one pause-count row per session.\n- The outer query averages those counts by title.\n\n## Difference from the optimal approach\n\nCorrect, but the CTE version is easier to follow."
      },
      {
        "approach_title": "CTE title",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH session_pauses AS (SELECT pe.session_id, COUNT(*) AS pause_count FROM playback_events pe WHERE pe.event_type = 'pause' GROUP BY pe.session_id), title_pause_metrics AS (SELECT vs.title_id, sp.pause_count FROM session_pauses sp JOIN viewing_sessions vs ON sp.session_id = vs.id WHERE vs.title_id IS NOT NULL) SELECT title_id, ROUND(AVG(pause_count), 2) AS avg_pauses_per_session FROM title_pause_metrics GROUP BY title_id ORDER BY avg_pauses_per_session DESC, title_id ASC;",
        "explanation": "## Approach\n\nCount pauses per session first, then create a title-level pause dataset before averaging.\n\n## Query\n\n```sql\nWITH session_pauses AS (\n  SELECT pe.session_id,\n         COUNT(*) AS pause_count\n  FROM playback_events pe\n  WHERE pe.event_type = 'pause'\n  GROUP BY pe.session_id\n),\ntitle_pause_metrics AS (\n  SELECT vs.title_id, sp.pause_count\n  FROM session_pauses sp\n  JOIN viewing_sessions vs ON sp.session_id = vs.id\n  WHERE vs.title_id IS NOT NULL\n)\nSELECT title_id,\n       ROUND(AVG(pause_count), 2) AS avg_pauses_per_session\nFROM title_pause_metrics\nGROUP BY title_id\nORDER BY avg_pauses_per_session DESC, title_id ASC;\n```\n\n## Explanation\n\n- The second CTE makes the title-level dataset explicit.\n- The final query averages pause counts by title.\n\n## Difference from the optimal approach\n\nUseful for inspection of intermediate data, but longer."
      }
    ]
  },
  {
    "code": "MOVIES_097",
    "approaches": [
      {
        "approach_title": "Distinct geo",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(DISTINCT country) AS distinct_countries FROM devices WHERE country IS NOT NULL GROUP BY user_id HAVING COUNT(DISTINCT country) > 1 ORDER BY distinct_countries DESC, user_id ASC;",
        "explanation": "## Approach\n\nGroup devices by user, count distinct countries, then keep only users seen in more than one country.\n\n## Query\n\n```sql\nSELECT user_id,\n       COUNT(DISTINCT country) AS distinct_countries\nFROM devices\nWHERE country IS NOT NULL\nGROUP BY user_id\nHAVING COUNT(DISTINCT country) > 1\nORDER BY distinct_countries DESC, user_id ASC;\n```\n\n## Explanation\n\n- `devices` contains the user and country information.\n- `COUNT(DISTINCT country)` measures how many unique countries each user appears in.\n- `HAVING ... > 1` keeps only users active in multiple countries.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt measures unique countries directly, which is exactly what the question asks."
      },
      {
        "approach_title": "CTE geo",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_countries AS (SELECT user_id, COUNT(DISTINCT country) AS distinct_countries FROM devices WHERE country IS NOT NULL GROUP BY user_id) SELECT user_id, distinct_countries FROM user_countries WHERE distinct_countries > 1 ORDER BY distinct_countries DESC, user_id ASC;",
        "explanation": "## Approach\n\nCompute distinct country counts per user first, then filter outside.\n\n## Query\n\n```sql\nWITH user_countries AS (\n  SELECT user_id,\n         COUNT(DISTINCT country) AS distinct_countries\n  FROM devices\n  WHERE country IS NOT NULL\n  GROUP BY user_id\n)\nSELECT user_id, distinct_countries\nFROM user_countries\nWHERE distinct_countries > 1\nORDER BY distinct_countries DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one country-count row per user.\n- The outer query keeps only users with more than one distinct country.\n- This returns the same result as the optimal query.\n\n## Difference from the optimal approach\n\nA little longer, but easier to extend."
      },
      {
        "approach_title": "Self join geo",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT d1.user_id, 2 AS distinct_countries FROM devices d1 JOIN devices d2 ON d1.user_id = d2.user_id AND d1.country <> d2.country WHERE d1.country IS NOT NULL AND d2.country IS NOT NULL ORDER BY distinct_countries DESC, d1.user_id ASC;",
        "explanation": "## Approach\n\nSelf-join the devices table to find users who have at least two different countries.\n\n## Query\n\n```sql\nSELECT DISTINCT d1.user_id,\n       2 AS distinct_countries\nFROM devices d1\nJOIN devices d2\n  ON d1.user_id = d2.user_id\n AND d1.country <> d2.country\nWHERE d1.country IS NOT NULL\n  AND d2.country IS NOT NULL\nORDER BY distinct_countries DESC, d1.user_id ASC;\n```\n\n## Explanation\n\n- The self-join looks for two rows belonging to the same user with different country values.\n- `DISTINCT` removes duplicate matches for the same user.\n- This confirms that the user has activity in more than one country.\n\n## Difference from the failed COUNT-only approach\n\n`COUNT(country)` counts rows, not unique countries. A user with multiple devices in the same country gets overcounted. The self-join, like `COUNT(DISTINCT country)`, checks for actual country diversity."
      }
    ]
  },
  {
    "code": "MOVIES_098",
    "approaches": [
      {
        "approach_title": "CTR delivery",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT campaign_id, ROUND(COUNT(clicked_at)::numeric * 100 / COUNT(*), 2) AS ctr_percent FROM notification_deliveries GROUP BY campaign_id ORDER BY ctr_percent DESC, campaign_id ASC;",
        "explanation": "## Approach\n\nGroup deliveries by campaign, then calculate click-through rate as clicked deliveries over total deliveries.\n\n## Query\n\n```sql\nSELECT campaign_id,\n       ROUND(COUNT(clicked_at)::numeric * 100 / COUNT(*), 2) AS ctr_percent\nFROM notification_deliveries\nGROUP BY campaign_id\nORDER BY ctr_percent DESC, campaign_id ASC;\n```\n\n## Explanation\n\n- `COUNT(*)` gives total deliveries per campaign.\n- `COUNT(clicked_at)` counts only deliveries that have a click timestamp.\n- Dividing them and multiplying by 100 gives CTR percentage.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to compute CTR from delivery rows."
      },
      {
        "approach_title": "CTE ctr",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH campaign_metrics AS (SELECT campaign_id, COUNT(*) AS total_deliveries, COUNT(clicked_at) AS clicked_deliveries FROM notification_deliveries GROUP BY campaign_id) SELECT campaign_id, ROUND(clicked_deliveries::numeric * 100 / total_deliveries, 2) AS ctr_percent FROM campaign_metrics ORDER BY ctr_percent DESC, campaign_id ASC;",
        "explanation": "## Approach\n\nFirst compute total deliveries and clicked deliveries per campaign, then calculate CTR outside.\n\n## Query\n\n```sql\nWITH campaign_metrics AS (\n  SELECT campaign_id,\n         COUNT(*) AS total_deliveries,\n         COUNT(clicked_at) AS clicked_deliveries\n  FROM notification_deliveries\n  GROUP BY campaign_id\n)\nSELECT campaign_id,\n       ROUND(clicked_deliveries::numeric * 100 / total_deliveries, 2) AS ctr_percent\nFROM campaign_metrics\nORDER BY ctr_percent DESC, campaign_id ASC;\n```\n\n## Explanation\n\n- The CTE stores denominator and numerator separately.\n- The outer query turns those counts into CTR.\n\n## Difference from the optimal approach\n\nUseful if you also want to expose raw counts, but longer."
      },
      {
        "approach_title": "Filter ctr",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT campaign_id, ROUND(COUNT(*) FILTER (WHERE clicked_at IS NOT NULL)::numeric * 100 / COUNT(*), 2) AS ctr_percent FROM notification_deliveries GROUP BY campaign_id ORDER BY ctr_percent DESC, campaign_id ASC;",
        "explanation": "## Approach\n\nUse `FILTER` to count clicked deliveries within each campaign group.\n\n## Query\n\n```sql\nSELECT campaign_id,\n       ROUND(COUNT(*) FILTER (WHERE clicked_at IS NOT NULL)::numeric * 100 / COUNT(*), 2) AS ctr_percent\nFROM notification_deliveries\nGROUP BY campaign_id\nORDER BY ctr_percent DESC, campaign_id ASC;\n```\n\n## Explanation\n\n- `FILTER` applies the click condition inside the aggregate.\n- This is handy when calculating multiple campaign metrics together.\n\n## Difference from the optimal approach\n\nFlexible, but a bit less direct for one metric."
      }
    ]
  },
  {
    "code": "MOVIES_099",
    "approaches": [
      {
        "approach_title": "Distinct rows",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ri.profile_id, COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.profile_id ORDER BY distinct_rows_clicked DESC, ri.profile_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nJoin clicks to impressions, count distinct recommendation rows clicked by each profile, then keep the top 10.\n\n## Query\n\n```sql\nSELECT ri.profile_id,\n       COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked\nFROM recommendation_clicks rc\nJOIN recommendation_impressions ri ON rc.impression_id = ri.id\nGROUP BY ri.profile_id\nORDER BY distinct_rows_clicked DESC, ri.profile_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `recommendation_clicks` tells us which impressions were clicked.\n- `recommendation_impressions` provides the profile and row shown.\n- `COUNT(DISTINCT ri.row_id)` measures row diversity of clicked content per profile.\n- `LIMIT 10` returns the most diverse clickers.\n\n## Why this is optimal\n\nIt directly counts unique clicked recommendation rows per profile with the correct join path."
      },
      {
        "approach_title": "CTE rows",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH clicked_rows AS (SELECT ri.profile_id, ri.row_id FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id) SELECT profile_id, COUNT(DISTINCT row_id) AS distinct_rows_clicked FROM clicked_rows GROUP BY profile_id ORDER BY distinct_rows_clicked DESC, profile_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nFirst isolate clicked profile-row pairs, then count row diversity per profile.\n\n## Query\n\n```sql\nWITH clicked_rows AS (\n  SELECT ri.profile_id, ri.row_id\n  FROM recommendation_clicks rc\n  JOIN recommendation_impressions ri ON rc.impression_id = ri.id\n)\nSELECT profile_id,\n       COUNT(DISTINCT row_id) AS distinct_rows_clicked\nFROM clicked_rows\nGROUP BY profile_id\nORDER BY distinct_rows_clicked DESC, profile_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The CTE stores the profile and row for every clicked impression.\n- The outer query counts how many unique rows each profile clicked from.\n\n## Difference from the optimal approach\n\nReadable in steps, but longer."
      },
      {
        "approach_title": "Subquery rows",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT profile_id, distinct_rows_clicked FROM (SELECT ri.profile_id, COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked FROM recommendation_clicks rc JOIN recommendation_impressions ri ON rc.impression_id = ri.id GROUP BY ri.profile_id) x ORDER BY distinct_rows_clicked DESC, profile_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCompute row diversity in a subquery and rank outside.\n\n## Query\n\n```sql\nSELECT profile_id, distinct_rows_clicked\nFROM (\n  SELECT ri.profile_id,\n         COUNT(DISTINCT ri.row_id) AS distinct_rows_clicked\n  FROM recommendation_clicks rc\n  JOIN recommendation_impressions ri ON rc.impression_id = ri.id\n  GROUP BY ri.profile_id\n) x\nORDER BY distinct_rows_clicked DESC, profile_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The inner query builds one diversity row per profile.\n- The outer query sorts and keeps the top 10.\n\n## Difference from the optimal approach\n\nCorrect, but less direct."
      }
    ]
  },
  {
    "code": "MOVIES_100",
    "approaches": [
      {
        "approach_title": "Renew join",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH renewed_users AS (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1) SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN renewed_users ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY watch_count DESC, vs.title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nFirst identify renewed users as those with more than one subscription record, then count which titles they watched most.\n\n## Query\n\n```sql\nWITH renewed_users AS (\n  SELECT user_id\n  FROM subscriptions\n  GROUP BY user_id\n  HAVING COUNT(*) > 1\n)\nSELECT vs.title_id,\n       COUNT(*) AS watch_count\nFROM viewing_sessions vs\nJOIN profiles p ON vs.profile_id = p.id\nJOIN renewed_users ru ON p.user_id = ru.user_id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.title_id\nORDER BY watch_count DESC, vs.title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `renewed_users` finds users who subscribed more than once.\n- `profiles` maps viewing activity back to the owning user.\n- `COUNT(*)` measures how often renewed users watched each title.\n- `LIMIT 10` returns the most watched titles among retained subscribers.\n\n## Why this is optimal\n\nIt cleanly separates renewal logic from watch counting and directly matches the expected result."
      },
      {
        "approach_title": "Subquery renew",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1) ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id ORDER BY watch_count DESC, vs.title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nUse a subquery for renewed users, then join it to watched titles.\n\n## Query\n\n```sql\nSELECT vs.title_id,\n       COUNT(*) AS watch_count\nFROM viewing_sessions vs\nJOIN profiles p ON vs.profile_id = p.id\nJOIN (\n  SELECT user_id\n  FROM subscriptions\n  GROUP BY user_id\n  HAVING COUNT(*) > 1\n) ru ON p.user_id = ru.user_id\nWHERE vs.title_id IS NOT NULL\nGROUP BY vs.title_id\nORDER BY watch_count DESC, vs.title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The subquery identifies renewed users.\n- The outer query counts watched titles for those users.\n\n## Difference from the optimal approach\n\nCorrect, but the CTE version is easier to follow."
      },
      {
        "approach_title": "CTE counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH renewed_users AS (SELECT user_id FROM subscriptions GROUP BY user_id HAVING COUNT(*) > 1), renewed_title_views AS (SELECT vs.title_id, COUNT(*) AS watch_count FROM viewing_sessions vs JOIN profiles p ON vs.profile_id = p.id JOIN renewed_users ru ON p.user_id = ru.user_id WHERE vs.title_id IS NOT NULL GROUP BY vs.title_id) SELECT title_id, watch_count FROM renewed_title_views ORDER BY watch_count DESC, title_id ASC LIMIT 10;",
        "explanation": "## Approach\n\nFirst identify renewed users, then build title watch counts for them in a second CTE.\n\n## Query\n\n```sql\nWITH renewed_users AS (\n  SELECT user_id\n  FROM subscriptions\n  GROUP BY user_id\n  HAVING COUNT(*) > 1\n),\nrenewed_title_views AS (\n  SELECT vs.title_id,\n         COUNT(*) AS watch_count\n  FROM viewing_sessions vs\n  JOIN profiles p ON vs.profile_id = p.id\n  JOIN renewed_users ru ON p.user_id = ru.user_id\n  WHERE vs.title_id IS NOT NULL\n  GROUP BY vs.title_id\n)\nSELECT title_id, watch_count\nFROM renewed_title_views\nORDER BY watch_count DESC, title_id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The first CTE stores the retained subscriber set.\n- The second CTE stores title watch counts for that set.\n- The final query ranks the titles.\n\n## Difference from the optimal approach\n\nUseful for reusing intermediate results, but longer."
      }
    ]
  }
];
