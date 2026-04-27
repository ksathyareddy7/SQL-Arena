# Solutions Evaluation Report (ride)

**Summary:**
- Total Approaches: 298
- Passed: 298
- Failed: 0

## Detailed Results
### ✅ PASS : RIDE_001 - COUNT rows
```sql
SELECT COUNT(*) AS total_riders FROM users;
```

### ✅ PASS : RIDE_001 - COUNT ids
```sql
SELECT COUNT(id) AS total_riders FROM users;
```

### ✅ PASS : RIDE_001 - CTE count
```sql
WITH rider_count AS (
  SELECT COUNT(*) AS total_riders
  FROM users
)
SELECT total_riders
FROM rider_count;
```

### ✅ PASS : RIDE_002 - Filter then count
```sql
SELECT COUNT(*) AS verified_drivers FROM drivers WHERE is_verified = true;
```

### ✅ PASS : RIDE_002 - Boolean shorthand
```sql
SELECT COUNT(*) AS verified_drivers FROM drivers WHERE is_verified;
```

### ✅ PASS : RIDE_002 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_verified = true) AS verified_drivers FROM drivers;
```

### ✅ PASS : RIDE_003 - IN list count
```sql
SELECT COUNT(*) AS active_trips FROM trips WHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress');
```

### ✅ PASS : RIDE_003 - OR conditions
```sql
SELECT COUNT(*) AS active_trips FROM trips WHERE trip_status = 'requested' OR trip_status = 'accepted' OR trip_status = 'arriving' OR trip_status = 'in_progress';
```

### ✅ PASS : RIDE_003 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress')) AS active_trips FROM trips;
```

### ✅ PASS : RIDE_004 - Completed count
```sql
SELECT COUNT(*) AS completed_trips FROM trips WHERE trip_status = 'completed';
```

### ✅ PASS : RIDE_004 - COUNT ids
```sql
SELECT COUNT(id) AS completed_trips FROM trips WHERE trip_status = 'completed';
```

### ✅ PASS : RIDE_004 - FILTER aggregate
```sql
SELECT COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips FROM trips;
```

### ✅ PASS : RIDE_005 - Cancelled count
```sql
SELECT COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled';
```

### ✅ PASS : RIDE_005 - Boolean sum
```sql
SELECT SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips FROM trips;
```

### ✅ PASS : RIDE_005 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips;
```

### ✅ PASS : RIDE_006 - GROUP BY type
```sql
SELECT ride_type, COUNT(*) AS trip_count FROM trips GROUP BY ride_type ORDER BY trip_count DESC, ride_type ASC;
```

### ✅ PASS : RIDE_006 - CTE group count
```sql
WITH type_counts AS (
  SELECT ride_type, COUNT(*) AS trip_count
  FROM trips
  GROUP BY ride_type
)
SELECT ride_type, trip_count
FROM type_counts
ORDER BY trip_count DESC, ride_type ASC;
```

### ✅ PASS : RIDE_006 - Window dedupe
```sql
SELECT DISTINCT ride_type, COUNT(*) OVER (PARTITION BY ride_type) AS trip_count FROM trips ORDER BY trip_count DESC, ride_type ASC;
```

### ✅ PASS : RIDE_007 - Count by city
```sql
SELECT city, COUNT(*) AS driver_count FROM drivers GROUP BY city ORDER BY driver_count DESC, city ASC;
```

### ✅ PASS : RIDE_007 - CTE city count
```sql
WITH city_counts AS (
  SELECT city, COUNT(*) AS driver_count
  FROM drivers
  GROUP BY city
)
SELECT city, driver_count
FROM city_counts
ORDER BY driver_count DESC, city ASC;
```

### ✅ PASS : RIDE_007 - Window dedupe
```sql
SELECT DISTINCT city, COUNT(*) OVER (PARTITION BY city) AS driver_count FROM drivers ORDER BY driver_count DESC, city ASC;
```

### ✅ PASS : RIDE_008 - AVG fare
```sql
SELECT ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed';
```

### ✅ PASS : RIDE_008 - Subquery average
```sql
SELECT ROUND(AVG(total_fare), 2) AS avg_fare FROM (SELECT total_fare FROM trips WHERE trip_status = 'completed') x;
```

### ✅ PASS : RIDE_008 - CTE average
```sql
WITH completed_trips AS (
  SELECT total_fare
  FROM trips
  WHERE trip_status = 'completed'
)
SELECT ROUND(AVG(total_fare), 2) AS avg_fare
FROM completed_trips;
```

### ✅ PASS : RIDE_009 - Group and limit
```sql
SELECT driver_id, COUNT(*) AS completed_trips FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY completed_trips DESC, driver_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_009 - CTE top drivers
```sql
WITH driver_counts AS (
  SELECT driver_id, COUNT(*) AS completed_trips
  FROM trips
  WHERE trip_status = 'completed' AND driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, completed_trips
FROM driver_counts
ORDER BY completed_trips DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_009 - Ranked drivers
```sql
SELECT driver_id, completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x WHERE rn <= 5 ORDER BY completed_trips DESC, driver_id ASC;
```

### ✅ PASS : RIDE_010 - Group riders
```sql
SELECT user_id, COUNT(*) AS total_trips FROM trips GROUP BY user_id ORDER BY total_trips DESC, user_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_010 - CTE top riders
```sql
WITH rider_counts AS (
  SELECT user_id, COUNT(*) AS total_trips
  FROM trips
  GROUP BY user_id
)
SELECT user_id, total_trips
FROM rider_counts
ORDER BY total_trips DESC, user_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_010 - Window rank
```sql
SELECT user_id, total_trips FROM (SELECT user_id, COUNT(*) AS total_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn FROM trips GROUP BY user_id) x WHERE rn <= 5 ORDER BY total_trips DESC, user_id ASC;
```

### ✅ PASS : RIDE_011 - Group by type
```sql
SELECT vehicle_type, COUNT(*) AS vehicle_count FROM vehicles GROUP BY vehicle_type ORDER BY vehicle_count DESC, vehicle_type ASC;
```

### ✅ PASS : RIDE_011 - CTE count
```sql
WITH type_counts AS (
  SELECT vehicle_type, COUNT(*) AS vehicle_count
  FROM vehicles
  GROUP BY vehicle_type
)
SELECT vehicle_type, vehicle_count
FROM type_counts
ORDER BY vehicle_count DESC, vehicle_type ASC;
```

### ✅ PASS : RIDE_011 - Window count
```sql
SELECT DISTINCT vehicle_type, COUNT(*) OVER (PARTITION BY vehicle_type) AS vehicle_count FROM vehicles ORDER BY vehicle_count DESC, vehicle_type ASC;
```

### ✅ PASS : RIDE_012 - Filter verified
```sql
SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = true;
```

### ✅ PASS : RIDE_012 - Boolean shorthand
```sql
SELECT COUNT(*) AS verified_users FROM users WHERE is_verified;
```

### ✅ PASS : RIDE_012 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_verified = true) AS verified_users FROM users;
```

### ✅ PASS : RIDE_013 - Group by channel
```sql
SELECT booking_channel, COUNT(*) AS trip_count FROM trips GROUP BY booking_channel ORDER BY trip_count DESC, booking_channel ASC;
```

### ✅ PASS : RIDE_013 - CTE channel count
```sql
WITH channel_counts AS (
  SELECT booking_channel, COUNT(*) AS trip_count
  FROM trips
  GROUP BY booking_channel
)
SELECT booking_channel, trip_count
FROM channel_counts
ORDER BY trip_count DESC, booking_channel ASC;
```

### ✅ PASS : RIDE_013 - Window count
```sql
SELECT DISTINCT booking_channel, COUNT(*) OVER (PARTITION BY booking_channel) AS trip_count FROM trips ORDER BY trip_count DESC, booking_channel ASC;
```

### ✅ PASS : RIDE_014 - AVG rating
```sql
SELECT ROUND(AVG(rating), 2) AS avg_driver_rating FROM ratings;
```

### ✅ PASS : RIDE_014 - Subquery avg
```sql
SELECT ROUND(AVG(rating), 2) AS avg_driver_rating FROM (SELECT rating FROM ratings) x;
```

### ✅ PASS : RIDE_014 - CTE avg
```sql
WITH rating_values AS (
  SELECT rating
  FROM ratings
)
SELECT ROUND(AVG(rating), 2) AS avg_driver_rating
FROM rating_values;
```

### ✅ PASS : RIDE_015 - Count rider cancels
```sql
SELECT COUNT(*) AS rider_cancelled_trips FROM trips WHERE cancelled_by = 'rider';
```

### ✅ PASS : RIDE_015 - CASE sum
```sql
SELECT SUM(CASE WHEN cancelled_by = 'rider' THEN 1 ELSE 0 END) AS rider_cancelled_trips FROM trips;
```

### ✅ PASS : RIDE_015 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE cancelled_by = 'rider') AS rider_cancelled_trips FROM trips;
```

### ✅ PASS : RIDE_016 - Count driver cancels
```sql
SELECT COUNT(*) AS driver_cancelled_trips FROM trips WHERE cancelled_by = 'driver';
```

### ✅ PASS : RIDE_016 - COUNT ids
```sql
SELECT COUNT(id) AS driver_cancelled_trips FROM trips WHERE cancelled_by = 'driver';
```

### ✅ PASS : RIDE_016 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE cancelled_by = 'driver') AS driver_cancelled_trips FROM trips;
```

### ✅ PASS : RIDE_017 - AVG distance
```sql
SELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed';
```

### ✅ PASS : RIDE_017 - Subquery avg
```sql
SELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM (SELECT actual_distance_km FROM trips WHERE trip_status = 'completed') x;
```

### ✅ PASS : RIDE_017 - CTE avg
```sql
WITH completed_distances AS (
  SELECT actual_distance_km
  FROM trips
  WHERE trip_status = 'completed'
)
SELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km
FROM completed_distances;
```

### ✅ PASS : RIDE_018 - Open ticket count
```sql
SELECT COUNT(*) AS open_tickets FROM support_tickets WHERE ticket_status = 'open';
```

### ✅ PASS : RIDE_018 - COUNT ids
```sql
SELECT COUNT(id) AS open_tickets FROM support_tickets WHERE ticket_status = 'open';
```

### ✅ PASS : RIDE_018 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE ticket_status = 'open') AS open_tickets FROM support_tickets;
```

### ✅ PASS : RIDE_019 - Date filter
```sql
SELECT COUNT(*) AS trips_today FROM trips WHERE DATE(requested_at) = CURRENT_DATE;
```

### ✅ PASS : RIDE_019 - Date range
```sql
SELECT COUNT(*) AS trips_today FROM trips WHERE requested_at >= CURRENT_DATE AND requested_at < CURRENT_DATE + INTERVAL '1 day';
```

### ✅ PASS : RIDE_019 - DATE_TRUNC match
```sql
SELECT COUNT(*) AS trips_today FROM trips WHERE DATE_TRUNC('day', requested_at) = CURRENT_DATE;
```

### ✅ PASS : RIDE_020 - Group and limit
```sql
SELECT city, COUNT(*) AS rider_count FROM users GROUP BY city ORDER BY rider_count DESC, city ASC LIMIT 5;
```

### ✅ PASS : RIDE_020 - CTE top cities
```sql
WITH city_counts AS (
  SELECT city, COUNT(*) AS rider_count
  FROM users
  GROUP BY city
)
SELECT city, rider_count
FROM city_counts
ORDER BY rider_count DESC, city ASC
LIMIT 5;
```

### ✅ PASS : RIDE_020 - Window rank
```sql
SELECT city, rider_count FROM (SELECT city, COUNT(*) AS rider_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, city ASC) AS rn FROM users GROUP BY city) x WHERE rn <= 5 ORDER BY rider_count DESC, city ASC;
```

### ✅ PASS : RIDE_021 - AVG by type
```sql
SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY avg_fare DESC, ride_type ASC;
```

### ✅ PASS : RIDE_021 - CTE average
```sql
WITH fare_by_type AS (
  SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare
  FROM trips
  WHERE trip_status = 'completed'
  GROUP BY ride_type
)
SELECT ride_type, avg_fare
FROM fare_by_type
ORDER BY avg_fare DESC, ride_type ASC;
```

### ✅ PASS : RIDE_021 - Subquery average
```sql
SELECT ride_type, avg_fare FROM (SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) x ORDER BY avg_fare DESC, ride_type ASC;
```

### ✅ PASS : RIDE_022 - Sort ratings
```sql
SELECT id AS driver_id, rating_avg FROM drivers ORDER BY rating_avg DESC, id ASC LIMIT 5;
```

### ✅ PASS : RIDE_022 - CTE top 5
```sql
WITH ranked_drivers AS (
  SELECT id AS driver_id, rating_avg
  FROM drivers
)
SELECT driver_id, rating_avg
FROM ranked_drivers
ORDER BY rating_avg DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_022 - Row number
```sql
SELECT driver_id, rating_avg FROM (SELECT id AS driver_id, rating_avg, ROW_NUMBER() OVER (ORDER BY rating_avg DESC, id ASC) AS rn FROM drivers) x WHERE rn <= 5 ORDER BY rating_avg DESC, driver_id ASC;
```

### ✅ PASS : RIDE_023 - Count by status
```sql
SELECT trip_status, COUNT(*) AS trip_count FROM trips GROUP BY trip_status ORDER BY trip_count DESC, trip_status ASC;
```

### ✅ PASS : RIDE_023 - CTE counts
```sql
WITH status_counts AS (
  SELECT trip_status, COUNT(*) AS trip_count
  FROM trips
  GROUP BY trip_status
)
SELECT trip_status, trip_count
FROM status_counts
ORDER BY trip_count DESC, trip_status ASC;
```

### ✅ PASS : RIDE_023 - Window dedupe
```sql
SELECT DISTINCT trip_status, COUNT(*) OVER (PARTITION BY trip_status) AS trip_count FROM trips ORDER BY trip_count DESC, trip_status ASC;
```

### ✅ PASS : RIDE_024 - Sort and limit
```sql
SELECT id AS trip_id, total_fare FROM trips WHERE trip_status = 'completed' ORDER BY total_fare DESC, trip_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_024 - CTE top trips
```sql
WITH completed_trips AS (
  SELECT id AS trip_id, total_fare
  FROM trips
  WHERE trip_status = 'completed'
)
SELECT trip_id, total_fare
FROM completed_trips
ORDER BY total_fare DESC, trip_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_024 - Row rank
```sql
SELECT trip_id, total_fare FROM (SELECT id AS trip_id, total_fare, ROW_NUMBER() OVER (ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') x WHERE rn <= 5 ORDER BY total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_025 - Count promo trips
```sql
SELECT COUNT(*) AS promo_trips FROM trips WHERE promo_id IS NOT NULL;
```

### ✅ PASS : RIDE_025 - COUNT promo ids
```sql
SELECT COUNT(promo_id) AS promo_trips FROM trips;
```

### ✅ PASS : RIDE_025 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trips FROM trips;
```

### ✅ PASS : RIDE_026 - Count by tier
```sql
SELECT driver_tier, COUNT(*) AS driver_count FROM drivers GROUP BY driver_tier ORDER BY driver_count DESC, driver_tier ASC;
```

### ✅ PASS : RIDE_026 - CTE tiers
```sql
WITH tier_counts AS (
  SELECT driver_tier, COUNT(*) AS driver_count
  FROM drivers
  GROUP BY driver_tier
)
SELECT driver_tier, driver_count
FROM tier_counts
ORDER BY driver_count DESC, driver_tier ASC;
```

### ✅ PASS : RIDE_026 - Window count
```sql
SELECT DISTINCT driver_tier, COUNT(*) OVER (PARTITION BY driver_tier) AS driver_count FROM drivers ORDER BY driver_count DESC, driver_tier ASC;
```

### ✅ PASS : RIDE_027 - AVG ETA
```sql
SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins FROM trips GROUP BY ride_type ORDER BY avg_eta_mins DESC, ride_type ASC;
```

### ✅ PASS : RIDE_027 - CTE ETA
```sql
WITH eta_by_type AS (
  SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins
  FROM trips
  GROUP BY ride_type
)
SELECT ride_type, avg_eta_mins
FROM eta_by_type
ORDER BY avg_eta_mins DESC, ride_type ASC;
```

### ✅ PASS : RIDE_027 - Subquery ETA
```sql
SELECT ride_type, avg_eta_mins FROM (SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins FROM trips GROUP BY ride_type) x ORDER BY avg_eta_mins DESC, ride_type ASC;
```

### ✅ PASS : RIDE_028 - Join and group
```sql
SELECT u.city, COUNT(*) AS trip_count FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city ORDER BY trip_count DESC, u.city ASC;
```

### ✅ PASS : RIDE_028 - CTE city trips
```sql
WITH city_trips AS (
  SELECT u.city, COUNT(*) AS trip_count
  FROM trips t
  JOIN users u ON u.id = t.user_id
  GROUP BY u.city
)
SELECT city, trip_count
FROM city_trips
ORDER BY trip_count DESC, city ASC;
```

### ✅ PASS : RIDE_028 - Subquery join
```sql
SELECT city, COUNT(*) AS trip_count FROM (SELECT t.id, u.city FROM trips t JOIN users u ON u.id = t.user_id) x GROUP BY city ORDER BY trip_count DESC, city ASC;
```

### ✅ PASS : RIDE_029 - Count success
```sql
SELECT COUNT(*) AS successful_payments FROM payments WHERE payment_status = 'successful';
```

### ✅ PASS : RIDE_029 - COUNT ids
```sql
SELECT COUNT(id) AS successful_payments FROM payments WHERE payment_status = 'successful';
```

### ✅ PASS : RIDE_029 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE payment_status = 'successful') AS successful_payments FROM payments;
```

### ✅ PASS : RIDE_030 - Sum and limit
```sql
SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id ORDER BY total_payout DESC, driver_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_030 - CTE payouts
```sql
WITH payout_totals AS (
  SELECT driver_id, SUM(net_payout) AS total_payout
  FROM driver_payouts
  GROUP BY driver_id
)
SELECT driver_id, total_payout
FROM payout_totals
ORDER BY total_payout DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_030 - Rank payouts
```sql
SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout, ROW_NUMBER() OVER (ORDER BY SUM(net_payout) DESC, driver_id ASC) AS rn FROM driver_payouts GROUP BY driver_id) x WHERE rn <= 5 ORDER BY total_payout DESC, driver_id ASC;
```

### ✅ PASS : RIDE_031 - Group drivers
```sql
SELECT driver_id, COUNT(*) AS trip_count FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id ORDER BY trip_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_031 - CTE count
```sql
WITH driver_trip_counts AS (
  SELECT driver_id, COUNT(*) AS trip_count
  FROM trips
  WHERE driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, trip_count
FROM driver_trip_counts
ORDER BY trip_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_031 - Window count
```sql
SELECT DISTINCT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS trip_count FROM trips WHERE driver_id IS NOT NULL ORDER BY trip_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_032 - Count inactive
```sql
SELECT COUNT(*) AS inactive_drivers FROM drivers WHERE is_active = false;
```

### ✅ PASS : RIDE_032 - NOT boolean
```sql
SELECT COUNT(*) AS inactive_drivers FROM drivers WHERE NOT is_active;
```

### ✅ PASS : RIDE_032 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE is_active = false) AS inactive_drivers FROM drivers;
```

### ✅ PASS : RIDE_033 - Count suspended
```sql
SELECT COUNT(*) AS suspended_drivers FROM drivers WHERE is_suspended = true;
```

### ✅ PASS : RIDE_033 - Boolean shorthand
```sql
SELECT COUNT(*) AS suspended_drivers FROM drivers WHERE is_suspended;
```

### ✅ PASS : RIDE_033 - FILTER aggregate
```sql
SELECT COUNT(*) FILTER (WHERE is_suspended = true) AS suspended_drivers FROM drivers;
```

### ✅ PASS : RIDE_034 - AVG wait
```sql
SELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins FROM trips WHERE trip_status = 'completed';
```

### ✅ PASS : RIDE_034 - Subquery avg
```sql
SELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins FROM (SELECT rider_wait_time_mins FROM trips WHERE trip_status = 'completed') x;
```

### ✅ PASS : RIDE_034 - CTE avg
```sql
WITH completed_waits AS (
  SELECT rider_wait_time_mins
  FROM trips
  WHERE trip_status = 'completed'
)
SELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins
FROM completed_waits;
```

### ✅ PASS : RIDE_035 - Group methods
```sql
SELECT payment_method, COUNT(*) AS payment_count FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY payment_count DESC, payment_method ASC;
```

### ✅ PASS : RIDE_035 - CTE methods
```sql
WITH method_counts AS (
  SELECT payment_method, COUNT(*) AS payment_count
  FROM payments
  WHERE payment_status = 'successful'
  GROUP BY payment_method
)
SELECT payment_method, payment_count
FROM method_counts
ORDER BY payment_count DESC, payment_method ASC;
```

### ✅ PASS : RIDE_035 - Window count
```sql
SELECT DISTINCT payment_method, COUNT(*) OVER (PARTITION BY payment_method) AS payment_count FROM payments WHERE payment_status = 'successful' ORDER BY payment_count DESC, payment_method ASC;
```

### ✅ PASS : RIDE_036 - Group promos
```sql
SELECT promo_id, COUNT(*) AS usage_count FROM trips WHERE promo_id IS NOT NULL GROUP BY promo_id ORDER BY usage_count DESC, promo_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_036 - CTE promos
```sql
WITH promo_counts AS (
  SELECT promo_id, COUNT(*) AS usage_count
  FROM trips
  WHERE promo_id IS NOT NULL
  GROUP BY promo_id
)
SELECT promo_id, usage_count
FROM promo_counts
ORDER BY usage_count DESC, promo_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_036 - Rank promos
```sql
SELECT promo_id, usage_count FROM (SELECT promo_id, COUNT(*) AS usage_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, promo_id ASC) AS rn FROM trips WHERE promo_id IS NOT NULL GROUP BY promo_id) x WHERE rn <= 5 ORDER BY usage_count DESC, promo_id ASC;
```

### ✅ PASS : RIDE_037 - Month filter
```sql
SELECT COUNT(*) AS joined_this_month FROM drivers WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE);
```

### ✅ PASS : RIDE_037 - Month range
```sql
SELECT COUNT(*) AS joined_this_month FROM drivers WHERE joined_at >= DATE_TRUNC('month', CURRENT_DATE) AND joined_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';
```

### ✅ PASS : RIDE_037 - Extract month-year
```sql
SELECT COUNT(*) AS joined_this_month FROM drivers WHERE EXTRACT(YEAR FROM joined_at) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM joined_at) = EXTRACT(MONTH FROM CURRENT_DATE);
```

### ✅ PASS : RIDE_038 - Count surge trips
```sql
SELECT COUNT(*) AS surge_trips FROM trips WHERE surge_multiplier > 1;
```

### ✅ PASS : RIDE_038 - CASE sum
```sql
SELECT SUM(CASE WHEN surge_multiplier > 1 THEN 1 ELSE 0 END) AS surge_trips FROM trips;
```

### ✅ PASS : RIDE_038 - FILTER count
```sql
SELECT COUNT(*) FILTER (WHERE surge_multiplier > 1) AS surge_trips FROM trips;
```

### ✅ PASS : RIDE_039 - AVG by type
```sql
SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY avg_distance_km DESC, ride_type ASC;
```

### ✅ PASS : RIDE_039 - CTE distance
```sql
WITH distance_by_type AS (
  SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km
  FROM trips
  WHERE trip_status = 'completed'
  GROUP BY ride_type
)
SELECT ride_type, avg_distance_km
FROM distance_by_type
ORDER BY avg_distance_km DESC, ride_type ASC;
```

### ✅ PASS : RIDE_039 - Subquery average
```sql
SELECT ride_type, avg_distance_km FROM (SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) x ORDER BY avg_distance_km DESC, ride_type ASC;
```

### ✅ PASS : RIDE_040 - Sum rider spend
```sql
SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id ORDER BY total_spend DESC, user_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_040 - CTE spend
```sql
WITH rider_spend AS (
  SELECT user_id, SUM(total_fare) AS total_spend
  FROM trips
  WHERE trip_status = 'completed'
  GROUP BY user_id
)
SELECT user_id, total_spend
FROM rider_spend
ORDER BY total_spend DESC, user_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_040 - Rank spenders
```sql
SELECT user_id, total_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend, ROW_NUMBER() OVER (ORDER BY SUM(total_fare) DESC, user_id ASC) AS rn FROM trips WHERE trip_status = 'completed' GROUP BY user_id) x WHERE rn <= 5 ORDER BY total_spend DESC, user_id ASC;
```

### ✅ PASS : RIDE_041 - Above avg rating
```sql
SELECT id AS driver_id, rating_avg FROM drivers WHERE rating_avg > (SELECT AVG(rating_avg) FROM drivers) ORDER BY rating_avg DESC, driver_id ASC;
```

### ✅ PASS : RIDE_041 - CTE average
```sql
WITH avg_rating AS (
  SELECT AVG(rating_avg) AS overall_avg
  FROM drivers
)
SELECT d.id AS driver_id, d.rating_avg
FROM drivers d
CROSS JOIN avg_rating a
WHERE d.rating_avg > a.overall_avg
ORDER BY d.rating_avg DESC, driver_id ASC;
```

### ✅ PASS : RIDE_041 - Window average
```sql
SELECT driver_id, rating_avg FROM (SELECT id AS driver_id, rating_avg, AVG(rating_avg) OVER () AS overall_avg FROM drivers) x WHERE rating_avg > overall_avg ORDER BY rating_avg DESC, driver_id ASC;
```

### ✅ PASS : RIDE_042 - HAVING count
```sql
SELECT user_id, COUNT(*) AS trip_count FROM trips GROUP BY user_id HAVING COUNT(*) > 5 ORDER BY trip_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_042 - CTE count
```sql
WITH rider_trips AS (
  SELECT user_id, COUNT(*) AS trip_count
  FROM trips
  GROUP BY user_id
)
SELECT user_id, trip_count
FROM rider_trips
WHERE trip_count > 5
ORDER BY trip_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_042 - Window dedupe
```sql
SELECT DISTINCT user_id, trip_count FROM (SELECT user_id, COUNT(*) OVER (PARTITION BY user_id) AS trip_count FROM trips) x WHERE trip_count > 5 ORDER BY trip_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_043 - Join and AVG
```sql
SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' GROUP BY u.city ORDER BY avg_fare DESC, u.city ASC;
```

### ✅ PASS : RIDE_043 - CTE city fare
```sql
WITH city_fares AS (
  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare
  FROM trips t
  JOIN users u ON u.id = t.user_id
  WHERE t.trip_status = 'completed'
  GROUP BY u.city
)
SELECT city, avg_fare
FROM city_fares
ORDER BY avg_fare DESC, city ASC;
```

### ✅ PASS : RIDE_043 - Subquery group
```sql
SELECT city, avg_fare FROM (SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' GROUP BY u.city) x ORDER BY avg_fare DESC, city ASC;
```

### ✅ PASS : RIDE_044 - Left join none
```sql
SELECT d.id AS driver_id FROM drivers d LEFT JOIN trips t ON t.driver_id = d.id WHERE t.id IS NULL ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_044 - NOT EXISTS
```sql
SELECT d.id AS driver_id FROM drivers d WHERE NOT EXISTS (SELECT 1 FROM trips t WHERE t.driver_id = d.id) ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_044 - NOT IN ids
```sql
SELECT id AS driver_id FROM drivers WHERE id NOT IN (SELECT driver_id FROM trips WHERE driver_id IS NOT NULL) ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_045 - Top city
```sql
SELECT u.city, COUNT(*) AS trip_count FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city ORDER BY trip_count DESC, u.city ASC LIMIT 1;
```

### ✅ PASS : RIDE_045 - CTE top city
```sql
WITH city_counts AS (
  SELECT u.city, COUNT(*) AS trip_count
  FROM trips t
  JOIN users u ON u.id = t.user_id
  GROUP BY u.city
)
SELECT city, trip_count
FROM city_counts
ORDER BY trip_count DESC, city ASC
LIMIT 1;
```

### ✅ PASS : RIDE_045 - Rank cities
```sql
SELECT city, trip_count FROM (SELECT u.city, COUNT(*) AS trip_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, u.city ASC) AS rn FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city) x WHERE rn = 1 ORDER BY city ASC;
```

### ✅ PASS : RIDE_046 - HAVING vehicles
```sql
SELECT driver_id, COUNT(*) AS vehicle_count FROM vehicles GROUP BY driver_id HAVING COUNT(*) > 1 ORDER BY vehicle_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_046 - CTE count
```sql
WITH driver_vehicles AS (
  SELECT driver_id, COUNT(*) AS vehicle_count
  FROM vehicles
  GROUP BY driver_id
)
SELECT driver_id, vehicle_count
FROM driver_vehicles
WHERE vehicle_count > 1
ORDER BY vehicle_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_046 - Window count
```sql
SELECT DISTINCT driver_id, vehicle_count FROM (SELECT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS vehicle_count FROM vehicles) x WHERE vehicle_count > 1 ORDER BY vehicle_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_047 - AVG of counts
```sql
SELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x;
```

### ✅ PASS : RIDE_047 - CTE average
```sql
WITH driver_completed AS (
  SELECT driver_id, COUNT(*) AS completed_count
  FROM trips
  WHERE trip_status = 'completed' AND driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips
FROM driver_completed;
```

### ✅ PASS : RIDE_047 - Nested derived
```sql
SELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) driver_counts;
```

### ✅ PASS : RIDE_048 - Distinct failed riders
```sql
SELECT DISTINCT t.user_id FROM payments p JOIN trips t ON t.id = p.trip_id WHERE p.payment_status = 'failed' ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_048 - CTE failed
```sql
WITH failed_riders AS (
  SELECT DISTINCT t.user_id
  FROM payments p
  JOIN trips t ON t.id = p.trip_id
  WHERE p.payment_status = 'failed'
)
SELECT user_id
FROM failed_riders
ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_048 - IN subquery
```sql
SELECT DISTINCT user_id FROM trips WHERE id IN (SELECT trip_id FROM payments WHERE payment_status = 'failed') ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_049 - AVG delay
```sql
SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY avg_delay_mins DESC, driver_id ASC;
```

### ✅ PASS : RIDE_049 - CTE delay
```sql
WITH driver_delays AS (
  SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins
  FROM trips
  WHERE trip_status = 'completed' AND driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, avg_delay_mins
FROM driver_delays
ORDER BY avg_delay_mins DESC, driver_id ASC;
```

### ✅ PASS : RIDE_049 - Subquery avg
```sql
SELECT driver_id, avg_delay_mins FROM (SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x ORDER BY avg_delay_mins DESC, driver_id ASC;
```

### ✅ PASS : RIDE_050 - FILTER percent
```sql
SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE promo_id IS NOT NULL) / COUNT(*), 2) AS promo_usage_percentage FROM trips;
```

### ✅ PASS : RIDE_050 - CASE percent
```sql
SELECT ROUND(100.0 * SUM(CASE WHEN promo_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS promo_usage_percentage FROM trips;
```

### ✅ PASS : RIDE_050 - CTE ratio
```sql
WITH trip_counts AS (
  SELECT COUNT(*) AS total_trips, COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trips
  FROM trips
)
SELECT ROUND(100.0 * promo_trips / total_trips, 2) AS promo_usage_percentage
FROM trip_counts;
```

### ✅ PASS : RIDE_051 - Top cancelled
```sql
SELECT driver_id, COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY cancelled_trips DESC, driver_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_051 - CTE top 5
```sql
WITH driver_cancellations AS (
  SELECT driver_id, COUNT(*) AS cancelled_trips
  FROM trips
  WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, cancelled_trips
FROM driver_cancellations
ORDER BY cancelled_trips DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_051 - Rank drivers
```sql
SELECT driver_id, cancelled_trips FROM (SELECT driver_id, COUNT(*) AS cancelled_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn FROM trips WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL GROUP BY driver_id) x WHERE rn <= 5 ORDER BY cancelled_trips DESC, driver_id ASC;
```

### ✅ PASS : RIDE_052 - HAVING no completed
```sql
SELECT t.user_id FROM trips t GROUP BY t.user_id HAVING COUNT(*) > 0 AND COUNT(*) FILTER (WHERE t.trip_status = 'completed') = 0 ORDER BY t.user_id ASC;
```

### ✅ PASS : RIDE_052 - CTE counts
```sql
WITH rider_trip_stats AS (
  SELECT user_id, COUNT(*) AS total_trips, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips
  FROM trips
  GROUP BY user_id
)
SELECT user_id
FROM rider_trip_stats
WHERE total_trips > 0 AND completed_trips = 0
ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_052 - Except completed
```sql
SELECT DISTINCT user_id FROM trips EXCEPT SELECT DISTINCT user_id FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_053 - AVG by channel
```sql
SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY booking_channel ORDER BY avg_fare DESC, booking_channel ASC;
```

### ✅ PASS : RIDE_053 - CTE channel avg
```sql
WITH channel_fares AS (
  SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare
  FROM trips
  WHERE trip_status = 'completed'
  GROUP BY booking_channel
)
SELECT booking_channel, avg_fare
FROM channel_fares
ORDER BY avg_fare DESC, booking_channel ASC;
```

### ✅ PASS : RIDE_053 - Subquery avg
```sql
SELECT booking_channel, avg_fare FROM (SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY booking_channel) x ORDER BY avg_fare DESC, booking_channel ASC;
```

### ✅ PASS : RIDE_054 - Distinct expired
```sql
SELECT DISTINCT driver_id FROM driver_documents WHERE verification_status = 'expired' ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_054 - Group drivers
```sql
SELECT driver_id FROM driver_documents WHERE verification_status = 'expired' GROUP BY driver_id ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_054 - CTE distinct
```sql
WITH expired_drivers AS (
  SELECT DISTINCT driver_id
  FROM driver_documents
  WHERE verification_status = 'expired'
)
SELECT driver_id
FROM expired_drivers
ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_055 - Top pickups
```sql
SELECT pickup_location_id, COUNT(*) AS trip_count FROM trips GROUP BY pickup_location_id ORDER BY trip_count DESC, pickup_location_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_055 - CTE pickups
```sql
WITH pickup_counts AS (
  SELECT pickup_location_id, COUNT(*) AS trip_count
  FROM trips
  GROUP BY pickup_location_id
)
SELECT pickup_location_id, trip_count
FROM pickup_counts
ORDER BY trip_count DESC, pickup_location_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_055 - Rank pickups
```sql
SELECT pickup_location_id, trip_count FROM (SELECT pickup_location_id, COUNT(*) AS trip_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, pickup_location_id ASC) AS rn FROM trips GROUP BY pickup_location_id) x WHERE rn <= 5 ORDER BY trip_count DESC, pickup_location_id ASC;
```

### ✅ PASS : RIDE_056 - Avg rider counts
```sql
SELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider FROM (SELECT u.city, t.user_id, COUNT(*) AS trip_count FROM users u JOIN trips t ON t.user_id = u.id GROUP BY u.city, t.user_id) x GROUP BY city ORDER BY avg_trips_per_rider DESC, city ASC;
```

### ✅ PASS : RIDE_056 - CTE two-step
```sql
WITH rider_city_trips AS (
  SELECT u.city, t.user_id, COUNT(*) AS trip_count
  FROM users u
  JOIN trips t ON t.user_id = u.id
  GROUP BY u.city, t.user_id
)
SELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider
FROM rider_city_trips
GROUP BY city
ORDER BY avg_trips_per_rider DESC, city ASC;
```

### ✅ PASS : RIDE_056 - Join grouped view
```sql
SELECT rc.city, ROUND(AVG(rc.trip_count), 2) AS avg_trips_per_rider FROM (SELECT u.city, t.user_id, COUNT(*) AS trip_count FROM users u JOIN trips t ON t.user_id = u.id GROUP BY u.city, t.user_id) rc GROUP BY rc.city ORDER BY avg_trips_per_rider DESC, rc.city ASC;
```

### ✅ PASS : RIDE_057 - Low ratings
```sql
SELECT id AS driver_id, rating_avg FROM drivers WHERE rating_avg < 3.50 ORDER BY rating_avg ASC, driver_id ASC;
```

### ✅ PASS : RIDE_057 - CTE filter
```sql
WITH low_rated AS (
  SELECT id AS driver_id, rating_avg
  FROM drivers
  WHERE rating_avg < 3.50
)
SELECT driver_id, rating_avg
FROM low_rated
ORDER BY rating_avg ASC, driver_id ASC;
```

### ✅ PASS : RIDE_057 - CASE flag
```sql
SELECT driver_id, rating_avg FROM (SELECT id AS driver_id, rating_avg, CASE WHEN rating_avg < 3.50 THEN 1 ELSE 0 END AS is_low FROM drivers) x WHERE is_low = 1 ORDER BY rating_avg ASC, driver_id ASC;
```

### ✅ PASS : RIDE_058 - AVG resolved
```sql
SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins FROM support_tickets WHERE ticket_status IN ('resolved', 'closed') AND resolution_time_mins IS NOT NULL GROUP BY ticket_type ORDER BY avg_resolution_mins DESC, ticket_type ASC;
```

### ✅ PASS : RIDE_058 - CTE resolved
```sql
WITH resolved_tickets AS (
  SELECT ticket_type, resolution_time_mins
  FROM support_tickets
  WHERE ticket_status IN ('resolved', 'closed')
    AND resolution_time_mins IS NOT NULL
)
SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins
FROM resolved_tickets
GROUP BY ticket_type
ORDER BY avg_resolution_mins DESC, ticket_type ASC;
```

### ✅ PASS : RIDE_058 - Subquery avg
```sql
SELECT ticket_type, avg_resolution_mins FROM (SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins FROM support_tickets WHERE ticket_status IN ('resolved', 'closed') AND resolution_time_mins IS NOT NULL GROUP BY ticket_type) x ORDER BY avg_resolution_mins DESC, ticket_type ASC;
```

### ✅ PASS : RIDE_059 - Above avg distance
```sql
SELECT id AS trip_id, actual_distance_km FROM trips WHERE trip_status = 'completed' AND actual_distance_km > (SELECT AVG(actual_distance_km) FROM trips WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL) ORDER BY actual_distance_km DESC, trip_id ASC;
```

### ✅ PASS : RIDE_059 - CTE average
```sql
WITH avg_distance AS (
  SELECT AVG(actual_distance_km) AS overall_avg
  FROM trips
  WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL
)
SELECT t.id AS trip_id, t.actual_distance_km
FROM trips t
CROSS JOIN avg_distance a
WHERE t.trip_status = 'completed'
  AND t.actual_distance_km > a.overall_avg
ORDER BY t.actual_distance_km DESC, trip_id ASC;
```

### ✅ PASS : RIDE_059 - Window average
```sql
SELECT trip_id, actual_distance_km FROM (SELECT id AS trip_id, actual_distance_km, AVG(actual_distance_km) OVER () AS overall_avg FROM trips WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL) x WHERE actual_distance_km > overall_avg ORDER BY actual_distance_km DESC, trip_id ASC;
```

### ✅ PASS : RIDE_060 - Compare counts
```sql
SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > COUNT(*) FILTER (WHERE trip_status = 'cancelled') ORDER BY completed_trips DESC, driver_id ASC;
```

### ✅ PASS : RIDE_060 - CTE trip stats
```sql
WITH driver_trip_stats AS (
  SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips
  FROM trips
  WHERE driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, completed_trips, cancelled_trips
FROM driver_trip_stats
WHERE completed_trips > cancelled_trips
ORDER BY completed_trips DESC, driver_id ASC;
```

### ✅ PASS : RIDE_060 - CASE counts
```sql
SELECT driver_id, SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) AS completed_trips, SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) > SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) ORDER BY completed_trips DESC, driver_id ASC;
```

### ✅ PASS : RIDE_061 - Top rider cancels
```sql
SELECT user_id, COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled' GROUP BY user_id ORDER BY cancelled_trips DESC, user_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_061 - CTE cancels
```sql
WITH rider_cancellations AS (
  SELECT user_id, COUNT(*) AS cancelled_trips
  FROM trips
  WHERE trip_status = 'cancelled'
  GROUP BY user_id
)
SELECT user_id, cancelled_trips
FROM rider_cancellations
ORDER BY cancelled_trips DESC, user_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_061 - Rank riders
```sql
SELECT user_id, cancelled_trips FROM (SELECT user_id, COUNT(*) AS cancelled_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn FROM trips WHERE trip_status = 'cancelled' GROUP BY user_id) x WHERE rn <= 5 ORDER BY cancelled_trips DESC, user_id ASC;
```

### ✅ PASS : RIDE_062 - AVG by type
```sql
SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins FROM trips WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL GROUP BY ride_type ORDER BY avg_duration_mins DESC, ride_type ASC;
```

### ✅ PASS : RIDE_062 - CTE durations
```sql
WITH type_durations AS (
  SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins
  FROM trips
  WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL
  GROUP BY ride_type
)
SELECT ride_type, avg_duration_mins
FROM type_durations
ORDER BY avg_duration_mins DESC, ride_type ASC;
```

### ✅ PASS : RIDE_062 - Subquery avg
```sql
SELECT ride_type, avg_duration_mins FROM (SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins FROM trips WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL GROUP BY ride_type) x ORDER BY avg_duration_mins DESC, ride_type ASC;
```

### ✅ PASS : RIDE_063 - HAVING no cancels
```sql
SELECT driver_id FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) > 0 AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') = 0 ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_063 - CTE stats
```sql
WITH driver_trip_stats AS (
  SELECT driver_id, COUNT(*) AS total_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips
  FROM trips
  WHERE driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id
FROM driver_trip_stats
WHERE total_trips > 0 AND cancelled_trips = 0
ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_063 - Except cancels
```sql
SELECT DISTINCT driver_id FROM trips WHERE driver_id IS NOT NULL EXCEPT SELECT DISTINCT driver_id FROM trips WHERE driver_id IS NOT NULL AND trip_status = 'cancelled' ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_064 - Top avg fare
```sql
SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY avg_fare DESC, driver_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_064 - CTE avg fare
```sql
WITH driver_avg_fares AS (
  SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare
  FROM trips
  WHERE trip_status = 'completed' AND driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, avg_fare
FROM driver_avg_fares
ORDER BY avg_fare DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_064 - Rank averages
```sql
SELECT driver_id, avg_fare FROM (SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare, ROW_NUMBER() OVER (ORDER BY AVG(total_fare) DESC, driver_id ASC) AS rn FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x WHERE rn <= 5 ORDER BY avg_fare DESC, driver_id ASC;
```

### ✅ PASS : RIDE_065 - Promo by type
```sql
SELECT ride_type, COUNT(*) AS promo_trip_count FROM trips WHERE promo_id IS NOT NULL GROUP BY ride_type ORDER BY promo_trip_count DESC, ride_type ASC;
```

### ✅ PASS : RIDE_065 - CTE promo counts
```sql
WITH promo_counts AS (
  SELECT ride_type, COUNT(*) AS promo_trip_count
  FROM trips
  WHERE promo_id IS NOT NULL
  GROUP BY ride_type
)
SELECT ride_type, promo_trip_count
FROM promo_counts
ORDER BY promo_trip_count DESC, ride_type ASC;
```

### ✅ PASS : RIDE_065 - Filter aggregate
```sql
SELECT ride_type, COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trip_count FROM trips GROUP BY ride_type ORDER BY promo_trip_count DESC, ride_type ASC;
```

### ✅ PASS : RIDE_066 - Above avg spend
```sql
SELECT user_id, total_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) s WHERE total_spend > (SELECT AVG(total_spend) FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) a) ORDER BY total_spend DESC, user_id ASC;
```

### ✅ PASS : RIDE_066 - CTE spend stats
```sql
WITH rider_spend AS (
  SELECT user_id, SUM(total_fare) AS total_spend
  FROM trips
  WHERE trip_status = 'completed'
  GROUP BY user_id
), avg_spend AS (
  SELECT AVG(total_spend) AS overall_avg_spend
  FROM rider_spend
)
SELECT r.user_id, r.total_spend
FROM rider_spend r
CROSS JOIN avg_spend a
WHERE r.total_spend > a.overall_avg_spend
ORDER BY r.total_spend DESC, r.user_id ASC;
```

### ✅ PASS : RIDE_066 - Window average
```sql
SELECT user_id, total_spend FROM (SELECT user_id, total_spend, AVG(total_spend) OVER () AS avg_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) s) x WHERE total_spend > avg_spend ORDER BY total_spend DESC, user_id ASC;
```

### ✅ PASS : RIDE_067 - All verified docs
```sql
SELECT driver_id FROM driver_documents GROUP BY driver_id HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE verification_status = 'verified') ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_067 - CTE doc stats
```sql
WITH doc_stats AS (
  SELECT driver_id, COUNT(*) AS total_docs, COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified_docs
  FROM driver_documents
  GROUP BY driver_id
)
SELECT driver_id
FROM doc_stats
WHERE total_docs > 0 AND total_docs = verified_docs
ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_067 - No non-verified
```sql
SELECT DISTINCT d1.driver_id FROM driver_documents d1 WHERE NOT EXISTS (SELECT 1 FROM driver_documents d2 WHERE d2.driver_id = d1.driver_id AND d2.verification_status <> 'verified') ORDER BY d1.driver_id ASC;
```

### ✅ PASS : RIDE_068 - AVG by method
```sql
SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY avg_paid_amount DESC, payment_method ASC;
```

### ✅ PASS : RIDE_068 - CTE averages
```sql
WITH method_amounts AS (
  SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount
  FROM payments
  WHERE payment_status = 'successful'
  GROUP BY payment_method
)
SELECT payment_method, avg_paid_amount
FROM method_amounts
ORDER BY avg_paid_amount DESC, payment_method ASC;
```

### ✅ PASS : RIDE_068 - Subquery avg
```sql
SELECT payment_method, avg_paid_amount FROM (SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method) x ORDER BY avg_paid_amount DESC, payment_method ASC;
```

### ✅ PASS : RIDE_069 - Above type avg
```sql
SELECT t.id AS trip_id, t.ride_type, t.total_fare FROM trips t JOIN (SELECT ride_type, AVG(total_fare) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) r ON r.ride_type = t.ride_type WHERE t.trip_status = 'completed' AND t.total_fare > r.avg_fare ORDER BY t.total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_069 - CTE type avg
```sql
WITH ride_type_avg AS (
  SELECT ride_type, AVG(total_fare) AS avg_fare
  FROM trips
  WHERE trip_status = 'completed'
  GROUP BY ride_type
)
SELECT t.id AS trip_id, t.ride_type, t.total_fare
FROM trips t
JOIN ride_type_avg r ON r.ride_type = t.ride_type
WHERE t.trip_status = 'completed'
  AND t.total_fare > r.avg_fare
ORDER BY t.total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_069 - Window avg
```sql
SELECT trip_id, ride_type, total_fare FROM (SELECT id AS trip_id, ride_type, total_fare, AVG(total_fare) OVER (PARTITION BY ride_type) AS avg_fare FROM trips WHERE trip_status = 'completed') x WHERE total_fare > avg_fare ORDER BY total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_070 - Top safety tickets
```sql
SELECT driver_id, COUNT(*) AS resolved_safety_tickets FROM support_tickets WHERE driver_id IS NOT NULL AND ticket_type = 'safety' AND ticket_status IN ('resolved', 'closed') GROUP BY driver_id ORDER BY resolved_safety_tickets DESC, driver_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_070 - CTE ticket counts
```sql
WITH safety_ticket_counts AS (
  SELECT driver_id, COUNT(*) AS resolved_safety_tickets
  FROM support_tickets
  WHERE driver_id IS NOT NULL
    AND ticket_type = 'safety'
    AND ticket_status IN ('resolved', 'closed')
  GROUP BY driver_id
)
SELECT driver_id, resolved_safety_tickets
FROM safety_ticket_counts
ORDER BY resolved_safety_tickets DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_070 - Rank ticket counts
```sql
SELECT driver_id, resolved_safety_tickets FROM (SELECT driver_id, COUNT(*) AS resolved_safety_tickets, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn FROM support_tickets WHERE driver_id IS NOT NULL AND ticket_type = 'safety' AND ticket_status IN ('resolved', 'closed') GROUP BY driver_id) x WHERE rn <= 5 ORDER BY resolved_safety_tickets DESC, driver_id ASC;
```

### ✅ PASS : RIDE_071 - Join and avg
```sql
SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout FROM driver_payouts dp JOIN trips t ON t.id = dp.trip_id WHERE t.trip_status = 'completed' GROUP BY t.ride_type ORDER BY avg_net_payout DESC, t.ride_type ASC;
```

### ✅ PASS : RIDE_071 - CTE payout avg
```sql
WITH payout_by_type AS (
  SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout
  FROM driver_payouts dp
  JOIN trips t ON t.id = dp.trip_id
  WHERE t.trip_status = 'completed'
  GROUP BY t.ride_type
)
SELECT ride_type, avg_net_payout
FROM payout_by_type
ORDER BY avg_net_payout DESC, ride_type ASC;
```

### ✅ PASS : RIDE_071 - Subquery avg
```sql
SELECT ride_type, avg_net_payout FROM (SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout FROM driver_payouts dp JOIN trips t ON t.id = dp.trip_id WHERE t.trip_status = 'completed' GROUP BY t.ride_type) x ORDER BY avg_net_payout DESC, ride_type ASC;
```

### ✅ PASS : RIDE_072 - Count types
```sql
SELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count FROM trips GROUP BY user_id HAVING COUNT(DISTINCT ride_type) > 1 ORDER BY ride_type_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_072 - CTE rider types
```sql
WITH rider_types AS (
  SELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count
  FROM trips
  GROUP BY user_id
)
SELECT user_id, ride_type_count
FROM rider_types
WHERE ride_type_count > 1
ORDER BY ride_type_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_072 - Distinct pairs
```sql
SELECT user_id, COUNT(*) AS ride_type_count FROM (SELECT DISTINCT user_id, ride_type FROM trips) x GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY ride_type_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_073 - Count driver types
```sql
SELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(DISTINCT ride_type) > 1 ORDER BY ride_type_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_073 - CTE type count
```sql
WITH driver_types AS (
  SELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count
  FROM trips
  WHERE trip_status = 'completed' AND driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, ride_type_count
FROM driver_types
WHERE ride_type_count > 1
ORDER BY ride_type_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_073 - Distinct driver pairs
```sql
SELECT driver_id, COUNT(*) AS ride_type_count FROM (SELECT DISTINCT driver_id, ride_type FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL) x GROUP BY driver_id HAVING COUNT(*) > 1 ORDER BY ride_type_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_074 - Join pickup areas
```sql
SELECT l.area_name, COUNT(*) AS completed_trip_count FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' GROUP BY l.area_name ORDER BY completed_trip_count DESC, l.area_name ASC LIMIT 5;
```

### ✅ PASS : RIDE_074 - CTE area counts
```sql
WITH area_counts AS (
  SELECT l.area_name, COUNT(*) AS completed_trip_count
  FROM trips t
  JOIN locations l ON l.id = t.pickup_location_id
  WHERE t.trip_status = 'completed'
  GROUP BY l.area_name
)
SELECT area_name, completed_trip_count
FROM area_counts
ORDER BY completed_trip_count DESC, area_name ASC
LIMIT 5;
```

### ✅ PASS : RIDE_074 - Rank areas
```sql
SELECT area_name, completed_trip_count FROM (SELECT l.area_name, COUNT(*) AS completed_trip_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, l.area_name ASC) AS rn FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' GROUP BY l.area_name) x WHERE rn <= 5 ORDER BY completed_trip_count DESC, area_name ASC;
```

### ✅ PASS : RIDE_075 - Distinct labels
```sql
SELECT DISTINCT user_id FROM rider_saved_places WHERE LOWER(label) IN ('home', 'work') ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_075 - Group users
```sql
SELECT user_id FROM rider_saved_places WHERE LOWER(label) IN ('home', 'work') GROUP BY user_id ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_075 - CTE distinct
```sql
WITH matching_users AS (
  SELECT DISTINCT user_id
  FROM rider_saved_places
  WHERE LOWER(label) IN ('home', 'work')
)
SELECT user_id
FROM matching_users
ORDER BY user_id ASC;
```

### ✅ PASS : RIDE_076 - Join promo fare
```sql
SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL GROUP BY u.city ORDER BY avg_promo_fare DESC, u.city ASC;
```

### ✅ PASS : RIDE_076 - CTE promo city
```sql
WITH promo_city_fares AS (
  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare
  FROM trips t
  JOIN users u ON u.id = t.user_id
  WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL
  GROUP BY u.city
)
SELECT city, avg_promo_fare
FROM promo_city_fares
ORDER BY avg_promo_fare DESC, city ASC;
```

### ✅ PASS : RIDE_076 - Subquery avg
```sql
SELECT city, avg_promo_fare FROM (SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL GROUP BY u.city) x ORDER BY avg_promo_fare DESC, city ASC;
```

### ✅ PASS : RIDE_077 - HAVING tickets
```sql
SELECT driver_id, COUNT(*) AS ticket_count FROM support_tickets WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) > 3 ORDER BY ticket_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_077 - CTE ticket stats
```sql
WITH driver_tickets AS (
  SELECT driver_id, COUNT(*) AS ticket_count
  FROM support_tickets
  WHERE driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, ticket_count
FROM driver_tickets
WHERE ticket_count > 3
ORDER BY ticket_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_077 - Window count
```sql
SELECT DISTINCT driver_id, ticket_count FROM (SELECT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS ticket_count FROM support_tickets WHERE driver_id IS NOT NULL) x WHERE ticket_count > 3 ORDER BY ticket_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_078 - Join promo avg
```sql
SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code ORDER BY avg_discount_amount DESC, p.code ASC;
```

### ✅ PASS : RIDE_078 - CTE promo avg
```sql
WITH promo_discounts AS (
  SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount
  FROM trips t
  JOIN promos p ON p.id = t.promo_id
  WHERE t.promo_id IS NOT NULL
  GROUP BY p.code
)
SELECT code, avg_discount_amount
FROM promo_discounts
ORDER BY avg_discount_amount DESC, code ASC;
```

### ✅ PASS : RIDE_078 - Subquery avg
```sql
SELECT code, avg_discount_amount FROM (SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code) x ORDER BY avg_discount_amount DESC, code ASC;
```

### ✅ PASS : RIDE_079 - Above avg ETA
```sql
SELECT id AS trip_id, estimated_pickup_eta_mins FROM trips WHERE estimated_pickup_eta_mins > (SELECT AVG(estimated_pickup_eta_mins) FROM trips WHERE estimated_pickup_eta_mins IS NOT NULL) ORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;
```

### ✅ PASS : RIDE_079 - CTE avg ETA
```sql
WITH avg_eta AS (
  SELECT AVG(estimated_pickup_eta_mins) AS overall_avg
  FROM trips
  WHERE estimated_pickup_eta_mins IS NOT NULL
)
SELECT t.id AS trip_id, t.estimated_pickup_eta_mins
FROM trips t
CROSS JOIN avg_eta a
WHERE t.estimated_pickup_eta_mins > a.overall_avg
ORDER BY t.estimated_pickup_eta_mins DESC, trip_id ASC;
```

### ✅ PASS : RIDE_079 - Window avg
```sql
SELECT trip_id, estimated_pickup_eta_mins FROM (SELECT id AS trip_id, estimated_pickup_eta_mins, AVG(estimated_pickup_eta_mins) OVER () AS overall_avg FROM trips WHERE estimated_pickup_eta_mins IS NOT NULL) x WHERE estimated_pickup_eta_mins > overall_avg ORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;
```

### ✅ PASS : RIDE_080 - Above avg payout
```sql
SELECT driver_id, ROUND(AVG(net_payout), 2) AS avg_net_payout FROM driver_payouts GROUP BY driver_id HAVING AVG(net_payout) > (SELECT AVG(net_payout) FROM driver_payouts) ORDER BY avg_net_payout DESC, driver_id ASC;
```

### ✅ PASS : RIDE_080 - CTE payout stats
```sql
WITH driver_avg AS ( SELECT driver_id, ROUND(AVG(net_payout), 2) AS avg_net_payout, AVG(net_payout) AS raw_avg_net_payout FROM driver_payouts GROUP BY driver_id ), overall_avg AS ( SELECT AVG(net_payout) AS avg_payout FROM driver_payouts ) SELECT d.driver_id, d.avg_net_payout FROM driver_avg d CROSS JOIN overall_avg o WHERE d.raw_avg_net_payout > o.avg_payout ORDER BY d.avg_net_payout DESC, d.driver_id ASC;
```

### ✅ PASS : RIDE_081 - Group by date
```sql
SELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count FROM trips GROUP BY DATE(requested_at) ORDER BY trip_date ASC;
```

### ✅ PASS : RIDE_081 - CTE daily count
```sql
WITH daily_trips AS (
  SELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count
  FROM trips
  GROUP BY DATE(requested_at)
)
SELECT trip_date, trip_count
FROM daily_trips
ORDER BY trip_date ASC;
```

### ✅ PASS : RIDE_081 - Date trunc day
```sql
SELECT DATE_TRUNC('day', requested_at)::date AS trip_date, COUNT(*) AS trip_count FROM trips GROUP BY DATE_TRUNC('day', requested_at)::date ORDER BY trip_date ASC;
```

### ✅ PASS : RIDE_082 - FILTER counts
```sql
SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > 0 AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') > 0 ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_082 - CTE trip stats
```sql
WITH driver_trip_stats AS (
  SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips
  FROM trips
  WHERE driver_id IS NOT NULL
  GROUP BY driver_id
)
SELECT driver_id, completed_trips, cancelled_trips
FROM driver_trip_stats
WHERE completed_trips > 0 AND cancelled_trips > 0
ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_082 - CASE counts
```sql
SELECT driver_id, SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) AS completed_trips, SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) > 0 ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_083 - CASE group
```sql
SELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END ORDER BY promo_usage ASC;
```

### ✅ PASS : RIDE_083 - CTE promo flag
```sql
WITH fare_groups AS (
  SELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage, total_fare
  FROM trips
  WHERE trip_status = 'completed'
)
SELECT promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare
FROM fare_groups
GROUP BY promo_usage
ORDER BY promo_usage ASC;
```

### ✅ PASS : RIDE_083 - Union compare
```sql
SELECT 'promo' AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND promo_id IS NOT NULL UNION ALL SELECT 'no_promo' AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND promo_id IS NULL ORDER BY promo_usage ASC;
```

### ✅ PASS : RIDE_084 - Avg from ratings
```sql
SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating FROM ratings GROUP BY driver_id ORDER BY avg_rating DESC, driver_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_084 - CTE top ratings
```sql
WITH driver_ratings AS (
  SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating
  FROM ratings
  GROUP BY driver_id
)
SELECT driver_id, avg_rating
FROM driver_ratings
ORDER BY avg_rating DESC, driver_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_084 - Rank averages
```sql
SELECT driver_id, avg_rating FROM (SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating, ROW_NUMBER() OVER (ORDER BY AVG(rating) DESC, driver_id ASC) AS rn FROM ratings GROUP BY driver_id) x WHERE rn <= 5 ORDER BY avg_rating DESC, driver_id ASC;
```

### ✅ PASS : RIDE_085 - Top saved places
```sql
SELECT user_id, COUNT(*) AS saved_place_count FROM rider_saved_places GROUP BY user_id ORDER BY saved_place_count DESC, user_id ASC LIMIT 5;
```

### ✅ PASS : RIDE_085 - CTE top users
```sql
WITH saved_place_counts AS (
  SELECT user_id, COUNT(*) AS saved_place_count
  FROM rider_saved_places
  GROUP BY user_id
)
SELECT user_id, saved_place_count
FROM saved_place_counts
ORDER BY saved_place_count DESC, user_id ASC
LIMIT 5;
```

### ✅ PASS : RIDE_085 - Rank riders
```sql
SELECT user_id, saved_place_count FROM (SELECT user_id, COUNT(*) AS saved_place_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn FROM rider_saved_places GROUP BY user_id) x WHERE rn <= 5 ORDER BY saved_place_count DESC, user_id ASC;
```

### ✅ PASS : RIDE_086 - Group by city
```sql
SELECT registration_city, COUNT(*) AS vehicle_count FROM vehicles GROUP BY registration_city ORDER BY vehicle_count DESC, registration_city ASC;
```

### ✅ PASS : RIDE_086 - CTE city count
```sql
WITH city_counts AS (
  SELECT registration_city, COUNT(*) AS vehicle_count
  FROM vehicles
  GROUP BY registration_city
)
SELECT registration_city, vehicle_count
FROM city_counts
ORDER BY vehicle_count DESC, registration_city ASC;
```

### ✅ PASS : RIDE_086 - Window count
```sql
SELECT DISTINCT registration_city, COUNT(*) OVER (PARTITION BY registration_city) AS vehicle_count FROM vehicles ORDER BY vehicle_count DESC, registration_city ASC;
```

### ✅ PASS : RIDE_087 - Join drop zones
```sql
SELECT COUNT(*) AS surge_zone_dropoff_trips FROM trips t JOIN locations l ON l.id = t.dropoff_location_id WHERE l.is_surge_zone = true;
```

### ✅ PASS : RIDE_087 - CTE surge dropoffs
```sql
WITH surge_dropoffs AS (
  SELECT t.id
  FROM trips t
  JOIN locations l ON l.id = t.dropoff_location_id
  WHERE l.is_surge_zone = true
)
SELECT COUNT(*) AS surge_zone_dropoff_trips
FROM surge_dropoffs;
```

### ✅ PASS : RIDE_087 - IN subquery
```sql
SELECT COUNT(*) AS surge_zone_dropoff_trips FROM trips WHERE dropoff_location_id IN (SELECT id FROM locations WHERE is_surge_zone = true);
```

### ✅ PASS : RIDE_088 - Join and avg
```sql
SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes FROM driver_shifts ds JOIN drivers d ON d.id = ds.driver_id WHERE ds.total_online_minutes IS NOT NULL GROUP BY d.driver_tier ORDER BY avg_online_minutes DESC, d.driver_tier ASC;
```

### ✅ PASS : RIDE_088 - CTE tier avg
```sql
WITH tier_online AS (
  SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes
  FROM driver_shifts ds
  JOIN drivers d ON d.id = ds.driver_id
  WHERE ds.total_online_minutes IS NOT NULL
  GROUP BY d.driver_tier
)
SELECT driver_tier, avg_online_minutes
FROM tier_online
ORDER BY avg_online_minutes DESC, driver_tier ASC;
```

### ✅ PASS : RIDE_088 - Subquery avg
```sql
SELECT driver_tier, avg_online_minutes FROM (SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes FROM driver_shifts ds JOIN drivers d ON d.id = ds.driver_id WHERE ds.total_online_minutes IS NOT NULL GROUP BY d.driver_tier) x ORDER BY avg_online_minutes DESC, driver_tier ASC;
```

### ✅ PASS : RIDE_089 - Verified doc count
```sql
SELECT driver_id, COUNT(*) AS verified_document_count FROM driver_documents WHERE verification_status = 'verified' GROUP BY driver_id HAVING COUNT(*) > 2 ORDER BY verified_document_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_089 - CTE doc counts
```sql
WITH verified_docs AS (
  SELECT driver_id, COUNT(*) AS verified_document_count
  FROM driver_documents
  WHERE verification_status = 'verified'
  GROUP BY driver_id
)
SELECT driver_id, verified_document_count
FROM verified_docs
WHERE verified_document_count > 2
ORDER BY verified_document_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_089 - Window count
```sql
SELECT DISTINCT driver_id, verified_document_count FROM (SELECT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS verified_document_count FROM driver_documents WHERE verification_status = 'verified') x WHERE verified_document_count > 2 ORDER BY verified_document_count DESC, driver_id ASC;
```

### ✅ PASS : RIDE_090 - Top discount codes
```sql
SELECT p.code, SUM(t.discount_amount) AS total_discount_given FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code ORDER BY total_discount_given DESC, p.code ASC LIMIT 5;
```

### ✅ PASS : RIDE_090 - CTE top codes
```sql
WITH promo_totals AS (
  SELECT p.code, SUM(t.discount_amount) AS total_discount_given
  FROM trips t
  JOIN promos p ON p.id = t.promo_id
  WHERE t.promo_id IS NOT NULL
  GROUP BY p.code
)
SELECT code, total_discount_given
FROM promo_totals
ORDER BY total_discount_given DESC, code ASC
LIMIT 5;
```

### ✅ PASS : RIDE_090 - Rank codes
```sql
SELECT code, total_discount_given FROM (SELECT p.code, SUM(t.discount_amount) AS total_discount_given, ROW_NUMBER() OVER (ORDER BY SUM(t.discount_amount) DESC, p.code ASC) AS rn FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code) x WHERE rn <= 5 ORDER BY total_discount_given DESC, code ASC;
```

### ✅ PASS : RIDE_091 - RANK fares
```sql
SELECT driver_id, id AS trip_id, total_fare, RANK() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;
```

### ✅ PASS : RIDE_091 - DENSE_RANK fares
```sql
SELECT driver_id, id AS trip_id, total_fare, DENSE_RANK() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;
```

### ✅ PASS : RIDE_091 - ROW_NUMBER fares
```sql
SELECT driver_id, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;
```

### ✅ PASS : RIDE_092 - Running SUM
```sql
SELECT user_id, id AS trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_spend FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC, requested_at ASC, trip_id ASC;
```

### ✅ PASS : RIDE_092 - Default frame sum
```sql
SELECT user_id, id AS trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id) AS running_total_spend FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC, requested_at ASC, trip_id ASC;
```

### ✅ PASS : RIDE_092 - CTE ordered sum
```sql
WITH completed_trips AS (SELECT user_id, id AS trip_id, requested_at, total_fare FROM trips WHERE trip_status = 'completed') SELECT user_id, trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, trip_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_spend FROM completed_trips ORDER BY user_id ASC, requested_at ASC, trip_id ASC;
```

### ✅ PASS : RIDE_093 - DENSE_RANK payout
```sql
SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout, DENSE_RANK() OVER (ORDER BY SUM(net_payout) DESC) AS payout_rank FROM driver_payouts GROUP BY driver_id) x WHERE payout_rank = 2 ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_093 - CTE ranked payout
```sql
WITH payout_totals AS (SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id), ranked_payouts AS (SELECT driver_id, total_payout, DENSE_RANK() OVER (ORDER BY total_payout DESC) AS payout_rank FROM payout_totals) SELECT driver_id, total_payout FROM ranked_payouts WHERE payout_rank = 2 ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_093 - Distinct max below top
```sql
SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id) x WHERE total_payout = (SELECT MAX(total_payout) FROM (SELECT SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id) y WHERE total_payout < (SELECT MAX(total_payout) FROM (SELECT SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id) z)) ORDER BY driver_id ASC;
```

### ✅ PASS : RIDE_094 - LAG gap
```sql
SELECT user_id, MAX(gap_minutes) AS max_gap_minutes FROM (SELECT user_id, EXTRACT(EPOCH FROM (requested_at - LAG(requested_at) OVER (PARTITION BY user_id ORDER BY requested_at))) / 60 AS gap_minutes FROM trips) x GROUP BY user_id ORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;
```

### ✅ PASS : RIDE_094 - CTE with lag
```sql
WITH trip_gaps AS (SELECT user_id, EXTRACT(EPOCH FROM (requested_at - LAG(requested_at) OVER (PARTITION BY user_id ORDER BY requested_at))) / 60 AS gap_minutes FROM trips) SELECT user_id, MAX(gap_minutes) AS max_gap_minutes FROM trip_gaps GROUP BY user_id ORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;
```

### ✅ PASS : RIDE_094 - Fixed lateral join
```sql
SELECT t1.user_id, MAX(EXTRACT(EPOCH FROM (t1.requested_at - t2.prev_requested_at)) / 60) AS max_gap_minutes FROM trips t1 LEFT JOIN LATERAL (SELECT t.requested_at AS prev_requested_at FROM trips t WHERE t.user_id = t1.user_id AND t.requested_at < t1.requested_at ORDER BY t.requested_at DESC LIMIT 1) t2 ON true GROUP BY t1.user_id ORDER BY max_gap_minutes DESC NULLS LAST, t1.user_id ASC;
```

### ✅ PASS : RIDE_095 - Rank daily earnings
```sql
SELECT payout_date, driver_id, daily_earnings, RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) x ORDER BY payout_date ASC, earnings_rank ASC;
```

### ✅ PASS : RIDE_095 - CTE daily rank
```sql
WITH daily_totals AS (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) SELECT payout_date, driver_id, daily_earnings, RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM daily_totals ORDER BY payout_date ASC, earnings_rank ASC;
```

### ✅ PASS : RIDE_095 - DENSE_RANK daily
```sql
SELECT payout_date, driver_id, daily_earnings, DENSE_RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) x ORDER BY payout_date ASC, earnings_rank ASC;
```

### ✅ PASS : RIDE_096 - Top 3 row number
```sql
SELECT ride_type, trip_id, total_fare FROM (SELECT ride_type, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') x WHERE rn <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_096 - CTE top 3
```sql
WITH ranked_trips AS (SELECT ride_type, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') SELECT ride_type, trip_id, total_fare FROM ranked_trips WHERE rn <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_096 - RANK top 3
```sql
SELECT ride_type, trip_id, total_fare FROM (SELECT ride_type, id AS trip_id, total_fare, RANK() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed') x WHERE fare_rank <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;
```

### ✅ PASS : RIDE_097 - 3-row moving avg
```sql
SELECT user_id, trip_id, total_fare, moving_avg_fare FROM (SELECT user_id, id AS trip_id, total_fare, requested_at, ROUND(AVG(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_fare FROM trips WHERE trip_status = 'completed') x ORDER BY user_id ASC, trip_id ASC;
```

### ✅ PASS : RIDE_097 - CTE moving avg
```sql
WITH completed_trips AS (SELECT user_id, id AS trip_id, total_fare, requested_at FROM trips WHERE trip_status = 'completed'), moving_avg AS (SELECT user_id, trip_id, total_fare, ROUND(AVG(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, trip_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_fare FROM completed_trips) SELECT user_id, trip_id, total_fare, moving_avg_fare FROM moving_avg ORDER BY user_id ASC, trip_id ASC;
```

### ✅ PASS : RIDE_097 - Correlated avg
```sql
SELECT t.user_id, t.id AS trip_id, t.total_fare, ROUND((SELECT AVG(t2.total_fare) FROM (SELECT id, requested_at, total_fare FROM trips WHERE trip_status = 'completed' AND user_id = t.user_id AND (requested_at < t.requested_at OR (requested_at = t.requested_at AND id <= t.id)) ORDER BY requested_at DESC, id DESC LIMIT 3) t2), 2) AS moving_avg_fare FROM trips t WHERE t.trip_status = 'completed' ORDER BY t.user_id ASC, trip_id ASC;
```

### ✅ PASS : RIDE_098 - Row-number streaks
```sql
WITH trip_flags AS ( SELECT driver_id, requested_at, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS rn1, ROW_NUMBER() OVER (PARTITION BY driver_id, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END ORDER BY requested_at) AS rn2 FROM trips WHERE driver_id IS NOT NULL ), cancel_groups AS ( SELECT driver_id, (rn1 - rn2) AS grp FROM trip_flags WHERE is_cancelled = 1 ) SELECT driver_id, MAX(cancel_streak) AS max_cancel_streak FROM (SELECT driver_id, grp, COUNT(*) AS cancel_streak FROM cancel_groups GROUP BY driver_id, grp) x GROUP BY driver_id ORDER BY max_cancel_streak DESC, driver_id ASC;
```

### ✅ PASS : RIDE_098 - CTE streak steps
```sql
WITH ordered_trips AS (SELECT driver_id, requested_at, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS seq_all, ROW_NUMBER() OVER (PARTITION BY driver_id, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END ORDER BY requested_at) AS seq_status FROM trips WHERE driver_id IS NOT NULL), grouped_cancels AS (SELECT driver_id, seq_all - seq_status AS grp FROM ordered_trips WHERE is_cancelled = 1), streaks AS (SELECT driver_id, grp, COUNT(*) AS cancel_streak FROM grouped_cancels GROUP BY driver_id, grp) SELECT driver_id, MAX(cancel_streak) AS max_cancel_streak FROM streaks GROUP BY driver_id ORDER BY max_cancel_streak DESC, driver_id ASC;
```

### ✅ PASS : RIDE_099 - Grouped percentile
```sql
SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY ride_type ASC;
```

### ✅ PASS : RIDE_099 - CTE percentile
```sql
WITH type_percentiles AS (SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) SELECT ride_type, fare_p90 FROM type_percentiles ORDER BY ride_type ASC;
```

### ✅ PASS : RIDE_099 - Join grouped p90
```sql
SELECT DISTINCT p.ride_type, p.fare_p90 FROM trips t JOIN (SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) p ON p.ride_type = t.ride_type WHERE t.trip_status = 'completed' ORDER BY p.ride_type ASC;
```

### ✅ PASS : RIDE_100 - Sum surge revenue
```sql
SELECT l.zone_name, ROUND(SUM((t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare)), 2) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1 GROUP BY l.zone_name ORDER BY surge_revenue DESC, l.zone_name ASC LIMIT 5;
```

### ✅ PASS : RIDE_100 - CTE surge calc
```sql
WITH trip_surge_revenue AS (SELECT l.zone_name, (t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1) SELECT zone_name, ROUND(SUM(surge_revenue), 2) AS surge_revenue FROM trip_surge_revenue GROUP BY zone_name ORDER BY surge_revenue DESC, zone_name ASC LIMIT 5;
```

### ✅ PASS : RIDE_100 - Subquery zone sum
```sql
SELECT zone_name, ROUND(SUM(surge_revenue), 2) AS surge_revenue FROM (SELECT l.zone_name, (t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1) x GROUP BY zone_name ORDER BY surge_revenue DESC, zone_name ASC LIMIT 5;
```

