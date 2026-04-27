import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("ride");

export const tableDescriptions = {
  driver_documents: "Verification and compliance documents uploaded by drivers",
  driver_incentives:
    "Driver bonus and incentive programs for campaign, target, and payout analysis",
  driver_location_logs:
    "Periodic GPS and availability snapshots for drivers used in location, idle, and hotspot analysis",
  driver_payouts: "Driver payout records derived from trip earnings and adjustments",
  driver_sessions:
    "Driver application sessions used for login activity, online duration, and retention analysis",
  driver_shifts: "Driver online shift sessions used for utilization and idle-time analysis",
  drivers: "Drivers who accept and complete trips",
  fare_components: "Exploded fare line items for each trip",
  locations: "Normalized pickup, dropoff, hotspot, airport, and zone locations",
  payments: "Trip payment transactions including refunds and failures",
  promos: "Promo codes that can be applied to eligible trips",
  ratings: "Rider ratings and feedback submitted after trips",
  rider_app_events:
    "Product and behavioral events from the rider app used for funnel, engagement, and conversion analytics",
  rider_saved_places: "Saved rider places such as home, work, and favorites",
  rider_subscriptions:
    "Subscription or pass plans purchased by riders for membership and loyalty analysis",
  safety_incidents:
    "Safety and trust incidents reported against trips, riders, or drivers for operational risk analysis",
  support_tickets:
    "Operational and customer support issues related to trips, riders, and drivers",
  surge_pricing: "Zone and time based surge pricing configurations",
  trip_driver_matches:
    "Dispatch matching attempts between trips and drivers including acceptance, rejection, and timeout behavior",
  trip_events: "Lifecycle and operational events recorded against trips",
  trip_status_history: "Audit trail of trip status changes over time",
  trips: "Trip lifecycle records including timing, pricing, ETA, and cancellation details",
  users: "Riders who book trips on the platform",
  vehicles: "Vehicles owned or operated by drivers",
};

export const questions = [
  {"app_id":appId,"code":"RIDE_001","title":"Total Riders Count","description":"Find the total number of riders registered on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_riders FROM users;","solution_columns":["total_riders"],"tables":["users"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_002","title":"Verified Drivers Count","description":"Find the total number of verified drivers.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS verified_drivers FROM drivers WHERE is_verified = true;","solution_columns":["verified_drivers"],"tables":["drivers"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_003","title":"Active Trips Count","description":"Find the total number of trips that are currently active (requested, accepted, arriving, or in progress).","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_trips FROM trips WHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress');","solution_columns":["active_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_004","title":"Completed Trips Count","description":"Find the total number of completed trips.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS completed_trips FROM trips WHERE trip_status = 'completed';","solution_columns":["completed_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_005","title":"Cancelled Trips Count","description":"Find the total number of cancelled trips.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled';","solution_columns":["cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_006","title":"Trips By Ride Type","description":"For each ride type, count the total number of trips.","difficulty":"easy","expected_query":"SELECT ride_type, COUNT(*) AS trip_count FROM trips GROUP BY ride_type ORDER BY trip_count DESC, ride_type ASC;","solution_columns":["ride_type","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_007","title":"Drivers By City","description":"For each city, count the total number of drivers.","difficulty":"easy","expected_query":"SELECT city, COUNT(*) AS driver_count FROM drivers GROUP BY city ORDER BY driver_count DESC, city ASC;","solution_columns":["city","driver_count"],"tables":["drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_008","title":"Average Trip Fare","description":"Find the average total fare across all completed trips.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed';","solution_columns":["avg_fare"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_009","title":"Top 5 Drivers By Completed Trips","description":"Find the top 5 drivers who completed the highest number of trips.","difficulty":"easy","expected_query":"SELECT driver_id, COUNT(*) AS completed_trips FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY completed_trips DESC, driver_id ASC LIMIT 5;","solution_columns":["driver_id","completed_trips"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_trips","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_010","title":"Top 5 Riders By Trip Count","description":"Find the top 5 riders who have requested the highest number of trips.","difficulty":"easy","expected_query":"SELECT user_id, COUNT(*) AS total_trips FROM trips GROUP BY user_id ORDER BY total_trips DESC, user_id ASC LIMIT 5;","solution_columns":["user_id","total_trips"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_trips","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_011","title":"Vehicle Count By Type","description":"For each vehicle type, count how many vehicles are registered.","difficulty":"easy","expected_query":"SELECT vehicle_type, COUNT(*) AS vehicle_count FROM vehicles GROUP BY vehicle_type ORDER BY vehicle_count DESC, vehicle_type ASC;","solution_columns":["vehicle_type","vehicle_count"],"tables":["vehicles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"vehicle_count","direction":"desc"},{"column":"vehicle_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_012","title":"Verified Users Count","description":"Find the total number of verified riders.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = true;","solution_columns":["verified_users"],"tables":["users"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_013","title":"Trips By Booking Channel","description":"For each booking channel, count the number of trips.","difficulty":"easy","expected_query":"SELECT booking_channel, COUNT(*) AS trip_count FROM trips GROUP BY booking_channel ORDER BY trip_count DESC, booking_channel ASC;","solution_columns":["booking_channel","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"booking_channel","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_014","title":"Average Driver Rating","description":"Find the average rating given to drivers.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(rating), 2) AS avg_driver_rating FROM ratings;","solution_columns":["avg_driver_rating"],"tables":["ratings"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_015","title":"Trips Cancelled By Rider","description":"Find the total number of trips cancelled by riders.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS rider_cancelled_trips FROM trips WHERE cancelled_by = 'rider';","solution_columns":["rider_cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_016","title":"Trips Cancelled By Driver","description":"Find the total number of trips cancelled by drivers.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS driver_cancelled_trips FROM trips WHERE cancelled_by = 'driver';","solution_columns":["driver_cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_017","title":"Average Trip Distance","description":"Find the average actual distance travelled for completed trips.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed';","solution_columns":["avg_distance_km"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_018","title":"Open Support Tickets","description":"Find the total number of support tickets that are currently open.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS open_tickets FROM support_tickets WHERE ticket_status = 'open';","solution_columns":["open_tickets"],"tables":["support_tickets"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_019","title":"Trips Requested Today","description":"Find the total number of trips requested today.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS trips_today FROM trips WHERE DATE(requested_at) = CURRENT_DATE;","solution_columns":["trips_today"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_020","title":"Top 5 Cities By Rider Count","description":"Find the top 5 cities with the highest number of riders.","difficulty":"easy","expected_query":"SELECT city, COUNT(*) AS rider_count FROM users GROUP BY city ORDER BY rider_count DESC, city ASC LIMIT 5;","solution_columns":["city","rider_count"],"tables":["users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rider_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_021","title":"Average Fare By Ride Type","description":"For each ride type, find the average total fare of completed trips.","difficulty":"easy","expected_query":"SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY avg_fare DESC, ride_type ASC;","solution_columns":["ride_type","avg_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_fare","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_022","title":"Top Drivers By Rating","description":"Find the top 5 drivers with the highest average rating.","difficulty":"easy","expected_query":"SELECT id AS driver_id, rating_avg FROM drivers ORDER BY rating_avg DESC, id ASC LIMIT 5;","solution_columns":["driver_id","rating_avg"],"tables":["drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rating_avg","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_023","title":"Trips By Status","description":"For each trip status, count the number of trips.","difficulty":"easy","expected_query":"SELECT trip_status, COUNT(*) AS trip_count FROM trips GROUP BY trip_status ORDER BY trip_count DESC, trip_status ASC;","solution_columns":["trip_status","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"trip_status","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_024","title":"Top 5 Highest Fare Trips","description":"Find the top 5 completed trips with the highest total fare.","difficulty":"easy","expected_query":"SELECT id AS trip_id, total_fare FROM trips WHERE trip_status = 'completed' ORDER BY total_fare DESC, trip_id ASC LIMIT 5;","solution_columns":["trip_id","total_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_fare","direction":"desc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_025","title":"Trips With Promo Applied","description":"Find the total number of trips where a promo code was applied.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS promo_trips FROM trips WHERE promo_id IS NOT NULL;","solution_columns":["promo_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_026","title":"Drivers By Tier","description":"For each driver tier, count the total number of drivers.","difficulty":"easy","expected_query":"SELECT driver_tier, COUNT(*) AS driver_count FROM drivers GROUP BY driver_tier ORDER BY driver_count DESC, driver_tier ASC;","solution_columns":["driver_tier","driver_count"],"tables":["drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_count","direction":"desc"},{"column":"driver_tier","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_027","title":"Average ETA By Ride Type","description":"For each ride type, find the average pickup ETA for trips.","difficulty":"easy","expected_query":"SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins FROM trips GROUP BY ride_type ORDER BY avg_eta_mins DESC, ride_type ASC;","solution_columns":["ride_type","avg_eta_mins"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_eta_mins","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_028","title":"Trips Per City","description":"For each rider city, count the number of trips requested.","difficulty":"easy","expected_query":"SELECT u.city, COUNT(*) AS trip_count FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city ORDER BY trip_count DESC, u.city ASC;","solution_columns":["city","trip_count"],"tables":["trips","users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_029","title":"Successful Payments Count","description":"Find the total number of successful payments.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS successful_payments FROM payments WHERE payment_status = 'successful';","solution_columns":["successful_payments"],"tables":["payments"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_030","title":"Top 5 Drivers By Payout","description":"Find the top 5 drivers with the highest total net payout.","difficulty":"easy","expected_query":"SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id ORDER BY total_payout DESC, driver_id ASC LIMIT 5;","solution_columns":["driver_id","total_payout"],"tables":["driver_payouts"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_payout","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_031","title":"Trips Per Driver","description":"For each driver, count the total number of trips assigned.","difficulty":"easy","expected_query":"SELECT driver_id, COUNT(*) AS trip_count FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id ORDER BY trip_count DESC, driver_id ASC;","solution_columns":["driver_id","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_032","title":"Inactive Drivers Count","description":"Find the total number of drivers who are currently inactive.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS inactive_drivers FROM drivers WHERE is_active = false;","solution_columns":["inactive_drivers"],"tables":["drivers"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_033","title":"Suspended Drivers Count","description":"Find the total number of suspended drivers.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS suspended_drivers FROM drivers WHERE is_suspended = true;","solution_columns":["suspended_drivers"],"tables":["drivers"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_034","title":"Average Wait Time","description":"Find the average rider wait time across completed trips.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins FROM trips WHERE trip_status = 'completed';","solution_columns":["avg_wait_time_mins"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_035","title":"Trips By Payment Method","description":"For each payment method, count the number of successful payments.","difficulty":"easy","expected_query":"SELECT payment_method, COUNT(*) AS payment_count FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY payment_count DESC, payment_method ASC;","solution_columns":["payment_method","payment_count"],"tables":["payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"payment_count","direction":"desc"},{"column":"payment_method","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_036","title":"Top 5 Most Used Promos","description":"Find the top 5 promo codes used in the highest number of trips.","difficulty":"easy","expected_query":"SELECT promo_id, COUNT(*) AS usage_count FROM trips WHERE promo_id IS NOT NULL GROUP BY promo_id ORDER BY usage_count DESC, promo_id ASC LIMIT 5;","solution_columns":["promo_id","usage_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"usage_count","direction":"desc"},{"column":"promo_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_037","title":"Drivers Joined This Month","description":"Find the total number of drivers who joined in the current month.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS joined_this_month FROM drivers WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE);","solution_columns":["joined_this_month"],"tables":["drivers"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_038","title":"Trips With Surge Applied","description":"Find the total number of trips where surge pricing was applied.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS surge_trips FROM trips WHERE surge_multiplier > 1;","solution_columns":["surge_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_039","title":"Average Distance By Ride Type","description":"For each ride type, find the average actual trip distance.","difficulty":"easy","expected_query":"SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY avg_distance_km DESC, ride_type ASC;","solution_columns":["ride_type","avg_distance_km"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_distance_km","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_040","title":"Top 5 Riders By Spend","description":"Find the top 5 riders who spent the most on completed trips.","difficulty":"easy","expected_query":"SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id ORDER BY total_spend DESC, user_id ASC LIMIT 5;","solution_columns":["user_id","total_spend"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_spend","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_041","title":"Drivers With Above Average Rating","description":"Find all drivers whose average rating is above the overall average driver rating.","difficulty":"medium","expected_query":"SELECT id AS driver_id, rating_avg FROM drivers WHERE rating_avg > (SELECT AVG(rating_avg) FROM drivers) ORDER BY rating_avg DESC, driver_id ASC;","solution_columns":["driver_id","rating_avg"],"tables":["drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rating_avg","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_042","title":"Riders With More Than 5 Trips","description":"Find riders who have requested more than 5 trips.","difficulty":"medium","expected_query":"SELECT user_id, COUNT(*) AS trip_count FROM trips GROUP BY user_id HAVING COUNT(*) > 5 ORDER BY trip_count DESC, user_id ASC;","solution_columns":["user_id","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_043","title":"Average Fare By City","description":"Find the average completed trip fare for each rider city.","difficulty":"medium","expected_query":"SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' GROUP BY u.city ORDER BY avg_fare DESC, u.city ASC;","solution_columns":["city","avg_fare"],"tables":["trips","users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_fare","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_044","title":"Drivers With No Trips","description":"Find all drivers who have never been assigned any trip.","difficulty":"medium","expected_query":"SELECT d.id AS driver_id FROM drivers d LEFT JOIN trips t ON t.driver_id = d.id WHERE t.id IS NULL ORDER BY driver_id ASC;","solution_columns":["driver_id"],"tables":["drivers","trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_045","title":"Top City By Trip Volume","description":"Find the city with the highest number of trips.","difficulty":"medium","expected_query":"SELECT u.city, COUNT(*) AS trip_count FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city ORDER BY trip_count DESC, u.city ASC LIMIT 1;","solution_columns":["city","trip_count"],"tables":["trips","users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_046","title":"Drivers With Multiple Vehicles","description":"Find drivers who have more than one registered vehicle.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) AS vehicle_count FROM vehicles GROUP BY driver_id HAVING COUNT(*) > 1 ORDER BY vehicle_count DESC, driver_id ASC;","solution_columns":["driver_id","vehicle_count"],"tables":["vehicles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"vehicle_count","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_047","title":"Average Completed Trips Per Driver","description":"Find the average number of completed trips per driver.","difficulty":"medium","expected_query":"SELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x;","solution_columns":["avg_completed_trips"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_048","title":"Riders With Failed Payments","description":"Find riders who have at least one failed payment.","difficulty":"medium","expected_query":"SELECT DISTINCT t.user_id FROM payments p JOIN trips t ON t.id = p.trip_id WHERE p.payment_status = 'failed' ORDER BY user_id ASC;","solution_columns":["user_id"],"tables":["payments","trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_049","title":"Average Delay By Driver","description":"For each driver, find the average arrival delay in completed trips.","difficulty":"medium","expected_query":"SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY avg_delay_mins DESC, driver_id ASC;","solution_columns":["driver_id","avg_delay_mins"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_delay_mins","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_050","title":"Promo Success Rate","description":"Find the percentage of trips that used a promo code.","difficulty":"medium","expected_query":"SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE promo_id IS NOT NULL) / COUNT(*), 2) AS promo_usage_percentage FROM trips;","solution_columns":["promo_usage_percentage"],"tables":["trips"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_051","title":"Top 5 Drivers By Cancellation Count","description":"Find the top 5 drivers who had the highest number of cancelled trips.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY cancelled_trips DESC, driver_id ASC LIMIT 5;","solution_columns":["driver_id","cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"cancelled_trips","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_052","title":"Riders With No Completed Trips","description":"Find riders who have requested trips but never completed any trip.","difficulty":"medium","expected_query":"SELECT t.user_id FROM trips t GROUP BY t.user_id HAVING COUNT(*) > 0 AND COUNT(*) FILTER (WHERE t.trip_status = 'completed') = 0 ORDER BY t.user_id ASC;","solution_columns":["user_id"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_053","title":"Average Fare By Booking Channel","description":"For each booking channel, find the average fare of completed trips.","difficulty":"medium","expected_query":"SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY booking_channel ORDER BY avg_fare DESC, booking_channel ASC;","solution_columns":["booking_channel","avg_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_fare","direction":"desc"},{"column":"booking_channel","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_054","title":"Drivers With Expired Documents","description":"Find drivers who have at least one document marked as expired.","difficulty":"medium","expected_query":"SELECT DISTINCT driver_id FROM driver_documents WHERE verification_status = 'expired' ORDER BY driver_id ASC;","solution_columns":["driver_id"],"tables":["driver_documents"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_055","title":"Top 5 Most Frequent Pickup Locations","description":"Find the top 5 pickup locations used in the highest number of trips.","difficulty":"medium","expected_query":"SELECT pickup_location_id, COUNT(*) AS trip_count FROM trips GROUP BY pickup_location_id ORDER BY trip_count DESC, pickup_location_id ASC LIMIT 5;","solution_columns":["pickup_location_id","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_count","direction":"desc"},{"column":"pickup_location_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_056","title":"Average Trips Per Rider By City","description":"For each rider city, find the average number of trips requested per rider.","difficulty":"medium","expected_query":"SELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider FROM (SELECT u.city, t.user_id, COUNT(*) AS trip_count FROM users u JOIN trips t ON t.user_id = u.id GROUP BY u.city, t.user_id) x GROUP BY city ORDER BY avg_trips_per_rider DESC, city ASC;","solution_columns":["city","avg_trips_per_rider"],"tables":["users","trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_trips_per_rider","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_057","title":"Drivers With Low Ratings","description":"Find drivers whose stored average rating is below 3.50.","difficulty":"medium","expected_query":"SELECT id AS driver_id, rating_avg FROM drivers WHERE rating_avg < 3.50 ORDER BY rating_avg ASC, driver_id ASC;","solution_columns":["driver_id","rating_avg"],"tables":["drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rating_avg","direction":"asc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_058","title":"Average Resolution Time By Ticket Type","description":"For each support ticket type, find the average resolution time in minutes for resolved tickets.","difficulty":"medium","expected_query":"SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins FROM support_tickets WHERE ticket_status IN ('resolved', 'closed') AND resolution_time_mins IS NOT NULL GROUP BY ticket_type ORDER BY avg_resolution_mins DESC, ticket_type ASC;","solution_columns":["ticket_type","avg_resolution_mins"],"tables":["support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_resolution_mins","direction":"desc"},{"column":"ticket_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_059","title":"Trips Longer Than Average Distance","description":"Find completed trips whose actual distance is greater than the average completed trip distance.","difficulty":"medium","expected_query":"SELECT id AS trip_id, actual_distance_km FROM trips WHERE trip_status = 'completed' AND actual_distance_km > (SELECT AVG(actual_distance_km) FROM trips WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL) ORDER BY actual_distance_km DESC, trip_id ASC;","solution_columns":["trip_id","actual_distance_km"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"actual_distance_km","direction":"desc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_060","title":"Drivers With More Completed Than Cancelled Trips","description":"Find drivers whose number of completed trips is greater than their number of cancelled trips.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > COUNT(*) FILTER (WHERE trip_status = 'cancelled') ORDER BY completed_trips DESC, driver_id ASC;","solution_columns":["driver_id","completed_trips","cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_trips","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_061","title":"Top 5 Riders By Cancelled Trips","description":"Find the top 5 riders who have the highest number of cancelled trips.","difficulty":"medium","expected_query":"SELECT user_id, COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled' GROUP BY user_id ORDER BY cancelled_trips DESC, user_id ASC LIMIT 5;","solution_columns":["user_id","cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"cancelled_trips","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_062","title":"Average Completed Trip Duration By Ride Type","description":"For each ride type, find the average actual duration in minutes for completed trips.","difficulty":"medium","expected_query":"SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins FROM trips WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL GROUP BY ride_type ORDER BY avg_duration_mins DESC, ride_type ASC;","solution_columns":["ride_type","avg_duration_mins"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_duration_mins","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_063","title":"Drivers With Only Completed Trips","description":"Find drivers who were assigned trips and never had a cancelled trip.","difficulty":"medium","expected_query":"SELECT driver_id FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) > 0 AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') = 0 ORDER BY driver_id ASC;","solution_columns":["driver_id"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_064","title":"Top 5 Drivers By Average Fare","description":"Find the top 5 drivers with the highest average fare on completed trips.","difficulty":"medium","expected_query":"SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY avg_fare DESC, driver_id ASC LIMIT 5;","solution_columns":["driver_id","avg_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_fare","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_065","title":"Promo Usage By Ride Type","description":"For each ride type, count how many trips used a promo code.","difficulty":"medium","expected_query":"SELECT ride_type, COUNT(*) AS promo_trip_count FROM trips WHERE promo_id IS NOT NULL GROUP BY ride_type ORDER BY promo_trip_count DESC, ride_type ASC;","solution_columns":["ride_type","promo_trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"promo_trip_count","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_066","title":"Riders With More Spend Than Average","description":"Find riders whose total spend on completed trips is greater than the average rider spend.","difficulty":"medium","expected_query":"SELECT user_id, total_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) s WHERE total_spend > (SELECT AVG(total_spend) FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) a) ORDER BY total_spend DESC, user_id ASC;","solution_columns":["user_id","total_spend"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_spend","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_067","title":"Drivers With Verified Documents Only","description":"Find drivers whose all uploaded documents are verified.","difficulty":"medium","expected_query":"SELECT driver_id FROM driver_documents GROUP BY driver_id HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE verification_status = 'verified') ORDER BY driver_id ASC;","solution_columns":["driver_id"],"tables":["driver_documents"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_068","title":"Average Successful Payment Amount By Method","description":"For each payment method, find the average amount paid for successful payments.","difficulty":"medium","expected_query":"SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY avg_paid_amount DESC, payment_method ASC;","solution_columns":["payment_method","avg_paid_amount"],"tables":["payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_paid_amount","direction":"desc"},{"column":"payment_method","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_069","title":"Trips With Fare Above Ride Type Average","description":"Find completed trips whose total fare is greater than the average fare of their own ride type.","difficulty":"medium","expected_query":"SELECT t.id AS trip_id, t.ride_type, t.total_fare FROM trips t JOIN (SELECT ride_type, AVG(total_fare) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) r ON r.ride_type = t.ride_type WHERE t.trip_status = 'completed' AND t.total_fare > r.avg_fare ORDER BY t.total_fare DESC, trip_id ASC;","solution_columns":["trip_id","ride_type","total_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_fare","direction":"desc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_070","title":"Top 5 Drivers By Resolved Safety Tickets","description":"Find the top 5 drivers associated with the highest number of resolved or closed safety support tickets.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) AS resolved_safety_tickets FROM support_tickets WHERE driver_id IS NOT NULL AND ticket_type = 'safety' AND ticket_status IN ('resolved', 'closed') GROUP BY driver_id ORDER BY resolved_safety_tickets DESC, driver_id ASC LIMIT 5;","solution_columns":["driver_id","resolved_safety_tickets"],"tables":["support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"resolved_safety_tickets","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_071","title":"Average Driver Payout By Ride Type","description":"For each ride type, find the average net payout earned by drivers for completed trips.","difficulty":"medium","expected_query":"SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout FROM driver_payouts dp JOIN trips t ON t.id = dp.trip_id WHERE t.trip_status = 'completed' GROUP BY t.ride_type ORDER BY avg_net_payout DESC, t.ride_type ASC;","solution_columns":["ride_type","avg_net_payout"],"tables":["driver_payouts","trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_net_payout","direction":"desc"},{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_072","title":"Riders With Trips In Multiple Ride Types","description":"Find riders who have booked trips across more than one distinct ride type.","difficulty":"medium","expected_query":"SELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count FROM trips GROUP BY user_id HAVING COUNT(DISTINCT ride_type) > 1 ORDER BY ride_type_count DESC, user_id ASC;","solution_columns":["user_id","ride_type_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ride_type_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_073","title":"Drivers With Trips In Multiple Ride Types","description":"Find drivers who have completed trips in more than one distinct ride type.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(DISTINCT ride_type) > 1 ORDER BY ride_type_count DESC, driver_id ASC;","solution_columns":["driver_id","ride_type_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ride_type_count","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_074","title":"Top 5 Pickup Areas By Completed Trips","description":"Find the top 5 pickup areas with the highest number of completed trips.","difficulty":"medium","expected_query":"SELECT l.area_name, COUNT(*) AS completed_trip_count FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' GROUP BY l.area_name ORDER BY completed_trip_count DESC, l.area_name ASC LIMIT 5;","solution_columns":["area_name","completed_trip_count"],"tables":["trips","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_trip_count","direction":"desc"},{"column":"area_name","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_075","title":"Users With Saved Home Or Work","description":"Find riders who have saved at least one place labeled home or work.","difficulty":"medium","expected_query":"SELECT DISTINCT user_id FROM rider_saved_places WHERE LOWER(label) IN ('home', 'work') ORDER BY user_id ASC;","solution_columns":["user_id"],"tables":["rider_saved_places"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_076","title":"Average Fare Of Promo Trips By City","description":"For each rider city, find the average total fare of completed trips where a promo code was applied.","difficulty":"medium","expected_query":"SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL GROUP BY u.city ORDER BY avg_promo_fare DESC, u.city ASC;","solution_columns":["city","avg_promo_fare"],"tables":["trips","users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_promo_fare","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_077","title":"Drivers With High Support Ticket Volume","description":"Find drivers who are associated with more than 3 support tickets.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) AS ticket_count FROM support_tickets WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) > 3 ORDER BY ticket_count DESC, driver_id ASC;","solution_columns":["driver_id","ticket_count"],"tables":["support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ticket_count","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_078","title":"Average Discount By Promo Code","description":"For each promo code, find the average discount amount applied on trips.","difficulty":"medium","expected_query":"SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code ORDER BY avg_discount_amount DESC, p.code ASC;","solution_columns":["code","avg_discount_amount"],"tables":["trips","promos"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_discount_amount","direction":"desc"},{"column":"code","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_079","title":"Trips With Above Average ETA","description":"Find trips whose estimated pickup ETA is greater than the overall average estimated pickup ETA.","difficulty":"medium","expected_query":"SELECT id AS trip_id, estimated_pickup_eta_mins FROM trips WHERE estimated_pickup_eta_mins > (SELECT AVG(estimated_pickup_eta_mins) FROM trips WHERE estimated_pickup_eta_mins IS NOT NULL) ORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;","solution_columns":["trip_id","estimated_pickup_eta_mins"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"estimated_pickup_eta_mins","direction":"desc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_080","title":"Drivers With Higher Than Average Payout","description":"Find drivers whose average net payout per trip is greater than the overall average driver payout per trip.","difficulty":"medium","expected_query":"SELECT driver_id, ROUND(AVG(net_payout), 2) AS avg_net_payout FROM driver_payouts GROUP BY driver_id HAVING AVG(net_payout) > (SELECT AVG(net_payout) FROM driver_payouts) ORDER BY avg_net_payout DESC, driver_id ASC;","solution_columns":["driver_id","avg_net_payout"],"tables":["driver_payouts"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_net_payout","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_081","title":"Daily Trip Count","description":"For each trip request date, count how many trips were requested.","difficulty":"medium","expected_query":"SELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count FROM trips GROUP BY DATE(requested_at) ORDER BY trip_date ASC;","solution_columns":["trip_date","trip_count"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"trip_date","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_082","title":"Drivers With Both Completed And Cancelled Trips","description":"Find drivers who have at least one completed trip and at least one cancelled trip.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > 0 AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') > 0 ORDER BY driver_id ASC;","solution_columns":["driver_id","completed_trips","cancelled_trips"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_083","title":"Average Fare By Promo Usage","description":"Compare average completed trip fare between promo and non-promo trips.","difficulty":"medium","expected_query":"SELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END ORDER BY promo_usage ASC;","solution_columns":["promo_usage","avg_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"promo_usage","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_084","title":"Top 5 Drivers By Average Rating From Reviews","description":"Find the top 5 drivers with the highest average rating calculated from ratings table.","difficulty":"medium","expected_query":"SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating FROM ratings GROUP BY driver_id ORDER BY avg_rating DESC, driver_id ASC LIMIT 5;","solution_columns":["driver_id","avg_rating"],"tables":["ratings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rating","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_085","title":"Top 5 Users By Saved Places","description":"Find the top 5 riders who have saved the most places.","difficulty":"medium","expected_query":"SELECT user_id, COUNT(*) AS saved_place_count FROM rider_saved_places GROUP BY user_id ORDER BY saved_place_count DESC, user_id ASC LIMIT 5;","solution_columns":["user_id","saved_place_count"],"tables":["rider_saved_places"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"saved_place_count","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_086","title":"Vehicles Registered By City","description":"For each registration city, count the number of vehicles.","difficulty":"medium","expected_query":"SELECT registration_city, COUNT(*) AS vehicle_count FROM vehicles GROUP BY registration_city ORDER BY vehicle_count DESC, registration_city ASC;","solution_columns":["registration_city","vehicle_count"],"tables":["vehicles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"vehicle_count","direction":"desc"},{"column":"registration_city","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_087","title":"Trips Ending In Surge Zones","description":"Find the total number of trips whose dropoff location is marked as a surge zone.","difficulty":"medium","expected_query":"SELECT COUNT(*) AS surge_zone_dropoff_trips FROM trips t JOIN locations l ON l.id = t.dropoff_location_id WHERE l.is_surge_zone = true;","solution_columns":["surge_zone_dropoff_trips"],"tables":["trips","locations"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"RIDE_088","title":"Average Online Minutes By Driver Tier","description":"For each driver tier, find the average total online minutes across driver shifts.","difficulty":"medium","expected_query":"SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes FROM driver_shifts ds JOIN drivers d ON d.id = ds.driver_id WHERE ds.total_online_minutes IS NOT NULL GROUP BY d.driver_tier ORDER BY avg_online_minutes DESC, d.driver_tier ASC;","solution_columns":["driver_tier","avg_online_minutes"],"tables":["driver_shifts","drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_online_minutes","direction":"desc"},{"column":"driver_tier","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_089","title":"Drivers With More Than 2 Verified Documents","description":"Find drivers who have more than 2 verified documents.","difficulty":"medium","expected_query":"SELECT driver_id, COUNT(*) AS verified_document_count FROM driver_documents WHERE verification_status = 'verified' GROUP BY driver_id HAVING COUNT(*) > 2 ORDER BY verified_document_count DESC, driver_id ASC;","solution_columns":["driver_id","verified_document_count"],"tables":["driver_documents"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"verified_document_count","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_090","title":"Top 5 Promo Codes By Discount Given","description":"Find the top 5 promo codes that resulted in the highest total discount amount across trips.","difficulty":"medium","expected_query":"SELECT p.code, SUM(t.discount_amount) AS total_discount_given FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code ORDER BY total_discount_given DESC, p.code ASC LIMIT 5;","solution_columns":["code","total_discount_given"],"tables":["trips","promos"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_discount_given","direction":"desc"},{"column":"code","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_091","title":"Driver Trip Rank By Fare","description":"For each driver, rank completed trips by total fare from highest to lowest.","difficulty":"hard","expected_query":"SELECT driver_id, id AS trip_id, total_fare, RANK() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;","solution_columns":["driver_id","trip_id","total_fare","fare_rank"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"},{"column":"fare_rank","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_092","title":"Running Total Rider Spend","description":"For each rider, calculate the running total spend across completed trips ordered by request time.","difficulty":"hard","expected_query":"SELECT user_id, id AS trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_spend FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC, requested_at ASC, trip_id ASC;","solution_columns":["user_id","trip_id","requested_at","total_fare","running_total_spend"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"},{"column":"requested_at","direction":"asc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_093","title":"Second Highest Paid Driver","description":"Find the driver with the second highest total net payout.","difficulty":"hard","expected_query":"SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout, DENSE_RANK() OVER (ORDER BY SUM(net_payout) DESC) AS payout_rank FROM driver_payouts GROUP BY driver_id) x WHERE payout_rank = 2 ORDER BY driver_id ASC;","solution_columns":["driver_id","total_payout"],"tables":["driver_payouts"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_094","title":"Longest Gap Between Trips Per Rider","description":"For each rider, find the longest time gap in minutes between consecutive trip requests.","difficulty":"hard","expected_query":"SELECT user_id, MAX(gap_minutes) AS max_gap_minutes FROM (SELECT user_id, EXTRACT(EPOCH FROM (requested_at - LAG(requested_at) OVER (PARTITION BY user_id ORDER BY requested_at))) / 60 AS gap_minutes FROM trips) x GROUP BY user_id ORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;","solution_columns":["user_id","max_gap_minutes"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"max_gap_minutes","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_095","title":"Driver Daily Earnings Rank","description":"For each day, rank drivers by total daily payout.","difficulty":"hard","expected_query":"SELECT payout_date, driver_id, daily_earnings, RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) x ORDER BY payout_date ASC, earnings_rank ASC;","solution_columns":["payout_date","driver_id","daily_earnings","earnings_rank"],"tables":["driver_payouts"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"payout_date","direction":"asc"},{"column":"earnings_rank","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_096","title":"Top 3 Trips Per Ride Type","description":"For each ride type, find the top 3 highest fare completed trips.","difficulty":"hard","expected_query":"SELECT ride_type, trip_id, total_fare FROM (SELECT ride_type, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') x WHERE rn <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;","solution_columns":["ride_type","trip_id","total_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ride_type","direction":"asc"},{"column":"total_fare","direction":"desc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_097","title":"Moving Average Trip Fare","description":"For each completed trip, calculate the 3-trip moving average fare per rider.","difficulty":"hard","expected_query":"SELECT user_id, id AS trip_id, total_fare, ROUND(AVG(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_fare FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC, requested_at ASC, trip_id ASC;","solution_columns":["user_id","trip_id","total_fare","moving_avg_fare"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"},{"column":"trip_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_098","title":"Driver Consecutive Cancel Streak","description":"Find the maximum consecutive cancelled trip streak for each driver based on request time.","difficulty":"hard","expected_query":"WITH trip_flags AS ( SELECT driver_id, requested_at, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS rn1, ROW_NUMBER() OVER (PARTITION BY driver_id, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END ORDER BY requested_at) AS rn2 FROM trips WHERE driver_id IS NOT NULL ), cancel_groups AS ( SELECT driver_id, (rn1 - rn2) AS grp FROM trip_flags WHERE is_cancelled = 1 ) SELECT driver_id, MAX(cancel_streak) AS max_cancel_streak FROM (SELECT driver_id, grp, COUNT(*) AS cancel_streak FROM cancel_groups GROUP BY driver_id, grp) x GROUP BY driver_id ORDER BY max_cancel_streak DESC, driver_id ASC;","solution_columns":["driver_id","max_cancel_streak"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"max_cancel_streak","direction":"desc"},{"column":"driver_id","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_099","title":"Percentile Fare By Ride Type","description":"For each ride type, find the 90th percentile of completed trip fare.","difficulty":"hard","expected_query":"SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY ride_type ASC;","solution_columns":["ride_type","fare_p90"],"tables":["trips"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ride_type","direction":"asc"}]}},
  {"app_id":appId,"code":"RIDE_100","title":"Top Surge Revenue Zones","description":"Find the top 5 pickup zones generating the highest surge revenue.","difficulty":"hard","expected_query":"SELECT l.zone_name, ROUND(SUM((t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare)), 2) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1 GROUP BY l.zone_name ORDER BY surge_revenue DESC, l.zone_name ASC LIMIT 5;","solution_columns":["zone_name","surge_revenue"],"tables":["trips","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"surge_revenue","direction":"desc"},{"column":"zone_name","direction":"asc"}]}},
];

export const hints = [
  {
    "code": "RIDE_001",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all riders in one table."
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
    "code": "RIDE_002",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter verified drivers first."
      },
      {
        "hint_order": 2,
        "content": "Use the is_verified column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE."
      }
    ]
  },
  {
    "code": "RIDE_003",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only active trip statuses should be counted."
      },
      {
        "hint_order": 2,
        "content": "Use trip_status with multiple values."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE ... IN (...)."
      }
    ]
  },
  {
    "code": "RIDE_004",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Use the trip_status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where trip_status = completed."
      }
    ]
  },
  {
    "code": "RIDE_005",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter only cancelled trips."
      },
      {
        "hint_order": 2,
        "content": "Use the trip_status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where trip_status = cancelled."
      }
    ]
  },
  {
    "code": "RIDE_006",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by ride type."
      },
      {
        "hint_order": 2,
        "content": "Count rows in each group."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY ride_type."
      }
    ]
  },
  {
    "code": "RIDE_007",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group drivers by city."
      },
      {
        "hint_order": 2,
        "content": "Count rows per city."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY city from drivers."
      }
    ]
  },
  {
    "code": "RIDE_008",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Average the total fare."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_fare) with WHERE."
      }
    ]
  },
  {
    "code": "RIDE_009",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips with a driver."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "Count, sort desc, limit 5."
      }
    ]
  },
  {
    "code": "RIDE_010",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by rider."
      },
      {
        "hint_order": 2,
        "content": "Count total trips per user."
      },
      {
        "hint_order": 3,
        "content": "Sort desc and LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_011",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group vehicles by type."
      },
      {
        "hint_order": 2,
        "content": "Count vehicles in each type."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY vehicle_type."
      }
    ]
  },
  {
    "code": "RIDE_012",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter verified riders first."
      },
      {
        "hint_order": 2,
        "content": "Use the is_verified column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from users with WHERE."
      }
    ]
  },
  {
    "code": "RIDE_013",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by booking channel."
      },
      {
        "hint_order": 2,
        "content": "Count trips in each channel."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY booking_channel."
      }
    ]
  },
  {
    "code": "RIDE_014",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the ratings table directly."
      },
      {
        "hint_order": 2,
        "content": "Average the rating column."
      },
      {
        "hint_order": 3,
        "content": "AVG(rating)."
      }
    ]
  },
  {
    "code": "RIDE_015",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter trips cancelled by riders."
      },
      {
        "hint_order": 2,
        "content": "Use the cancelled_by column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where cancelled_by = rider."
      }
    ]
  },
  {
    "code": "RIDE_016",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter trips cancelled by drivers."
      },
      {
        "hint_order": 2,
        "content": "Use the cancelled_by column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where cancelled_by = driver."
      }
    ]
  },
  {
    "code": "RIDE_017",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Average the actual distance column."
      },
      {
        "hint_order": 3,
        "content": "AVG(actual_distance_km)."
      }
    ]
  },
  {
    "code": "RIDE_018",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter support tickets first."
      },
      {
        "hint_order": 2,
        "content": "Keep only open tickets."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where ticket_status = open."
      }
    ]
  },
  {
    "code": "RIDE_019",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare request date with today."
      },
      {
        "hint_order": 2,
        "content": "Use requested_at."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where DATE(requested_at) = CURRENT_DATE."
      }
    ]
  },
  {
    "code": "RIDE_020",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group riders by city."
      },
      {
        "hint_order": 2,
        "content": "Count riders in each city."
      },
      {
        "hint_order": 3,
        "content": "Sort desc and LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_021",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Group by ride_type."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_fare) per type."
      }
    ]
  },
  {
    "code": "RIDE_022",
    "hints": [
      {
        "hint_order": 1,
        "content": "The average rating is already stored."
      },
      {
        "hint_order": 2,
        "content": "Use drivers table only."
      },
      {
        "hint_order": 3,
        "content": "ORDER BY rating_avg DESC LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_023",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by status."
      },
      {
        "hint_order": 2,
        "content": "Count rows in each status."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY trip_status."
      }
    ]
  },
  {
    "code": "RIDE_024",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Sort by total fare descending."
      },
      {
        "hint_order": 3,
        "content": "LIMIT 5 highest fares."
      }
    ]
  },
  {
    "code": "RIDE_025",
    "hints": [
      {
        "hint_order": 1,
        "content": "A promo trip has a promo id."
      },
      {
        "hint_order": 2,
        "content": "Filter non-NULL promo values."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where promo_id IS NOT NULL."
      }
    ]
  },
  {
    "code": "RIDE_026",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group drivers by tier."
      },
      {
        "hint_order": 2,
        "content": "Count drivers in each tier."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY driver_tier."
      }
    ]
  },
  {
    "code": "RIDE_027",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the estimated pickup ETA column."
      },
      {
        "hint_order": 2,
        "content": "Group by ride type."
      },
      {
        "hint_order": 3,
        "content": "AVG(estimated_pickup_eta_mins)."
      }
    ]
  },
  {
    "code": "RIDE_028",
    "hints": [
      {
        "hint_order": 1,
        "content": "Trips do not store rider city directly."
      },
      {
        "hint_order": 2,
        "content": "Join trips with users using user_id."
      },
      {
        "hint_order": 3,
        "content": "Group by users.city."
      }
    ]
  },
  {
    "code": "RIDE_029",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the payments table."
      },
      {
        "hint_order": 2,
        "content": "Filter only successful payments."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE payment_status = successful."
      }
    ]
  },
  {
    "code": "RIDE_030",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the driver_payouts table."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id and sum payout."
      },
      {
        "hint_order": 3,
        "content": "SUM(net_payout), sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_031",
    "hints": [
      {
        "hint_order": 1,
        "content": "Ignore trips without a driver."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) per driver."
      }
    ]
  },
  {
    "code": "RIDE_032",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter inactive drivers first."
      },
      {
        "hint_order": 2,
        "content": "Use the is_active column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where is_active = false."
      }
    ]
  },
  {
    "code": "RIDE_033",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter suspended drivers first."
      },
      {
        "hint_order": 2,
        "content": "Use the is_suspended column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where is_suspended = true."
      }
    ]
  },
  {
    "code": "RIDE_034",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Average the rider wait time column."
      },
      {
        "hint_order": 3,
        "content": "AVG(rider_wait_time_mins)."
      }
    ]
  },
  {
    "code": "RIDE_035",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the payments table."
      },
      {
        "hint_order": 2,
        "content": "Filter only successful payments first."
      },
      {
        "hint_order": 3,
        "content": "Group by payment_method and count."
      }
    ]
  },
  {
    "code": "RIDE_036",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only trips with a promo should be counted."
      },
      {
        "hint_order": 2,
        "content": "Group by promo_id."
      },
      {
        "hint_order": 3,
        "content": "Count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_037",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare join date with the current month."
      },
      {
        "hint_order": 2,
        "content": "Use the joined_at column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where month matches CURRENT_DATE."
      }
    ]
  },
  {
    "code": "RIDE_038",
    "hints": [
      {
        "hint_order": 1,
        "content": "Surge applies when multiplier is above 1."
      },
      {
        "hint_order": 2,
        "content": "Use the surge_multiplier column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where surge_multiplier > 1."
      }
    ]
  },
  {
    "code": "RIDE_039",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Group by ride_type."
      },
      {
        "hint_order": 3,
        "content": "AVG(actual_distance_km) per type."
      }
    ]
  },
  {
    "code": "RIDE_040",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id and sum fare."
      },
      {
        "hint_order": 3,
        "content": "SUM(total_fare), sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_041",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the overall average driver rating first."
      },
      {
        "hint_order": 2,
        "content": "Compare each driver rating to that average."
      },
      {
        "hint_order": 3,
        "content": "Use a subquery with AVG(rating_avg)."
      }
    ]
  },
  {
    "code": "RIDE_042",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by rider."
      },
      {
        "hint_order": 2,
        "content": "Count trips per rider."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 5."
      }
    ]
  },
  {
    "code": "RIDE_043",
    "hints": [
      {
        "hint_order": 1,
        "content": "Trips do not store rider city directly."
      },
      {
        "hint_order": 2,
        "content": "Join trips with users."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_fare) grouped by users.city."
      }
    ]
  },
  {
    "code": "RIDE_044",
    "hints": [
      {
        "hint_order": 1,
        "content": "Start from the drivers table."
      },
      {
        "hint_order": 2,
        "content": "Find drivers with no matching trip row."
      },
      {
        "hint_order": 3,
        "content": "LEFT JOIN trips and keep NULL matches."
      }
    ]
  },
  {
    "code": "RIDE_045",
    "hints": [
      {
        "hint_order": 1,
        "content": "Trips need to be connected to rider city."
      },
      {
        "hint_order": 2,
        "content": "Join trips with users and group by city."
      },
      {
        "hint_order": 3,
        "content": "Sort desc and LIMIT 1."
      }
    ]
  },
  {
    "code": "RIDE_046",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the vehicles table."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "RIDE_047",
    "hints": [
      {
        "hint_order": 1,
        "content": "First count completed trips per driver."
      },
      {
        "hint_order": 2,
        "content": "Then average those counts."
      },
      {
        "hint_order": 3,
        "content": "Use a subquery or CTE."
      }
    ]
  },
  {
    "code": "RIDE_048",
    "hints": [
      {
        "hint_order": 1,
        "content": "Failed payments live in payments."
      },
      {
        "hint_order": 2,
        "content": "Join payments to trips to get the rider."
      },
      {
        "hint_order": 3,
        "content": "Use DISTINCT user_id."
      }
    ]
  },
  {
    "code": "RIDE_049",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips with a driver."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "AVG(driver_arrival_delay_mins)."
      }
    ]
  },
  {
    "code": "RIDE_050",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count promo trips and total trips."
      },
      {
        "hint_order": 2,
        "content": "Turn the ratio into a percentage."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) FILTER (WHERE promo_id IS NOT NULL)."
      }
    ]
  },
  {
    "code": "RIDE_051",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only cancelled trips with a driver."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "Count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_052",
    "hints": [
      {
        "hint_order": 1,
        "content": "Riders must have trips but zero completed trips."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING with a filtered count."
      }
    ]
  },
  {
    "code": "RIDE_053",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Group by booking_channel."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_fare) per channel."
      }
    ]
  },
  {
    "code": "RIDE_054",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the driver_documents table."
      },
      {
        "hint_order": 2,
        "content": "Filter expired documents only."
      },
      {
        "hint_order": 3,
        "content": "Return DISTINCT driver_id."
      }
    ]
  },
  {
    "code": "RIDE_055",
    "hints": [
      {
        "hint_order": 1,
        "content": "Trips already store pickup_location_id."
      },
      {
        "hint_order": 2,
        "content": "Group by pickup_location_id."
      },
      {
        "hint_order": 3,
        "content": "Count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_056",
    "hints": [
      {
        "hint_order": 1,
        "content": "This needs two levels of aggregation."
      },
      {
        "hint_order": 2,
        "content": "First count trips per rider within each city."
      },
      {
        "hint_order": 3,
        "content": "Then average those counts by city."
      }
    ]
  },
  {
    "code": "RIDE_057",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the stored average rating in drivers."
      },
      {
        "hint_order": 2,
        "content": "Filter ratings below 3.50."
      },
      {
        "hint_order": 3,
        "content": "ORDER BY rating_avg ASC."
      }
    ]
  },
  {
    "code": "RIDE_058",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only resolved or closed tickets."
      },
      {
        "hint_order": 2,
        "content": "Group by ticket_type."
      },
      {
        "hint_order": 3,
        "content": "AVG(resolution_time_mins)."
      }
    ]
  },
  {
    "code": "RIDE_059",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Find the average completed actual distance first."
      },
      {
        "hint_order": 3,
        "content": "Compare each trip distance to that average."
      }
    ]
  },
  {
    "code": "RIDE_060",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by driver."
      },
      {
        "hint_order": 2,
        "content": "Count completed and cancelled trips separately."
      },
      {
        "hint_order": 3,
        "content": "Keep rows where completed count is greater."
      }
    ]
  },
  {
    "code": "RIDE_061",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only cancelled trips."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id."
      },
      {
        "hint_order": 3,
        "content": "Count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_062",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use completed trips with known duration."
      },
      {
        "hint_order": 2,
        "content": "Group by ride_type."
      },
      {
        "hint_order": 3,
        "content": "AVG(actual_duration_mins)."
      }
    ]
  },
  {
    "code": "RIDE_063",
    "hints": [
      {
        "hint_order": 1,
        "content": "Drivers must have assigned trips."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id and count cancelled trips."
      },
      {
        "hint_order": 3,
        "content": "Keep rows where cancelled count is 0."
      }
    ]
  },
  {
    "code": "RIDE_064",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use completed trips with a driver."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_fare), sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_065",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only promo trips should be counted."
      },
      {
        "hint_order": 2,
        "content": "Group by ride_type."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where promo_id IS NOT NULL."
      }
    ]
  },
  {
    "code": "RIDE_066",
    "hints": [
      {
        "hint_order": 1,
        "content": "First find total spend per rider."
      },
      {
        "hint_order": 2,
        "content": "Then compute the average of those rider totals."
      },
      {
        "hint_order": 3,
        "content": "Keep riders above that average."
      }
    ]
  },
  {
    "code": "RIDE_067",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the driver_documents table."
      },
      {
        "hint_order": 2,
        "content": "Compare total docs vs verified docs per driver."
      },
      {
        "hint_order": 3,
        "content": "Keep drivers where both counts are equal."
      }
    ]
  },
  {
    "code": "RIDE_068",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only successful payments."
      },
      {
        "hint_order": 2,
        "content": "Group by payment_method."
      },
      {
        "hint_order": 3,
        "content": "AVG(paid_amount)."
      }
    ]
  },
  {
    "code": "RIDE_069",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Find average fare for each ride type first."
      },
      {
        "hint_order": 3,
        "content": "Compare each trip to its ride type average."
      }
    ]
  },
  {
    "code": "RIDE_070",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use support_tickets only."
      },
      {
        "hint_order": 2,
        "content": "Filter safety tickets that are resolved or closed."
      },
      {
        "hint_order": 3,
        "content": "Group by driver_id, count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_071",
    "hints": [
      {
        "hint_order": 1,
        "content": "Payout amount is in driver_payouts, ride type is in trips."
      },
      {
        "hint_order": 2,
        "content": "Join driver_payouts with trips on trip_id."
      },
      {
        "hint_order": 3,
        "content": "Group by ride_type and AVG(net_payout)."
      }
    ]
  },
  {
    "code": "RIDE_072",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by user_id."
      },
      {
        "hint_order": 2,
        "content": "Count DISTINCT ride_type values."
      },
      {
        "hint_order": 3,
        "content": "Keep riders with more than 1 type."
      }
    ]
  },
  {
    "code": "RIDE_073",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips with a driver."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "Count DISTINCT ride_type and keep more than 1."
      }
    ]
  },
  {
    "code": "RIDE_074",
    "hints": [
      {
        "hint_order": 1,
        "content": "Pickup area name is in locations."
      },
      {
        "hint_order": 2,
        "content": "Join trips with locations using pickup_location_id."
      },
      {
        "hint_order": 3,
        "content": "Group by area_name, count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_075",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use rider_saved_places."
      },
      {
        "hint_order": 2,
        "content": "Check the label column for home or work."
      },
      {
        "hint_order": 3,
        "content": "Return DISTINCT user_id."
      }
    ]
  },
  {
    "code": "RIDE_076",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use completed trips that have a promo."
      },
      {
        "hint_order": 2,
        "content": "Join trips with users to get city."
      },
      {
        "hint_order": 3,
        "content": "Group by users.city and AVG(total_fare)."
      }
    ]
  },
  {
    "code": "RIDE_077",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use support_tickets with a driver_id."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(*) > 3."
      }
    ]
  },
  {
    "code": "RIDE_078",
    "hints": [
      {
        "hint_order": 1,
        "content": "Discount amount is in trips, code is in promos."
      },
      {
        "hint_order": 2,
        "content": "Join trips with promos on promo_id."
      },
      {
        "hint_order": 3,
        "content": "Group by promo code and AVG(discount_amount)."
      }
    ]
  },
  {
    "code": "RIDE_079",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the estimated_pickup_eta_mins column."
      },
      {
        "hint_order": 2,
        "content": "Find the overall average ETA first."
      },
      {
        "hint_order": 3,
        "content": "Keep trips above that average."
      }
    ]
  },
  {
    "code": "RIDE_080",
    "hints": [
      {
        "hint_order": 1,
        "content": "First compute average payout per driver."
      },
      {
        "hint_order": 2,
        "content": "Then compare it with the overall average payout."
      },
      {
        "hint_order": 3,
        "content": "Use GROUP BY driver_id with HAVING."
      }
    ]
  },
  {
    "code": "RIDE_081",
    "hints": [
      {
        "hint_order": 1,
        "content": "Extract the date from requested_at."
      },
      {
        "hint_order": 2,
        "content": "Group by that date."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) per day."
      }
    ]
  },
  {
    "code": "RIDE_082",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group trips by driver_id."
      },
      {
        "hint_order": 2,
        "content": "Count completed and cancelled trips separately."
      },
      {
        "hint_order": 3,
        "content": "Keep drivers where both counts are greater than 0."
      }
    ]
  },
  {
    "code": "RIDE_083",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Create two groups: promo and no_promo."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_fare) for each group."
      }
    ]
  },
  {
    "code": "RIDE_084",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the ratings table, not drivers.rating_avg."
      },
      {
        "hint_order": 2,
        "content": "Group by driver_id and average rating."
      },
      {
        "hint_order": 3,
        "content": "Sort desc and LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_085",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use rider_saved_places."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id."
      },
      {
        "hint_order": 3,
        "content": "Count, sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_086",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the vehicles table only."
      },
      {
        "hint_order": 2,
        "content": "Group by registration_city."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) per city."
      }
    ]
  },
  {
    "code": "RIDE_087",
    "hints": [
      {
        "hint_order": 1,
        "content": "Dropoff location is stored in trips."
      },
      {
        "hint_order": 2,
        "content": "Join trips with locations using dropoff_location_id."
      },
      {
        "hint_order": 3,
        "content": "Count rows where is_surge_zone = true."
      }
    ]
  },
  {
    "code": "RIDE_088",
    "hints": [
      {
        "hint_order": 1,
        "content": "Online minutes are in driver_shifts, tier is in drivers."
      },
      {
        "hint_order": 2,
        "content": "Join driver_shifts with drivers on driver_id."
      },
      {
        "hint_order": 3,
        "content": "Group by driver_tier and AVG(total_online_minutes)."
      }
    ]
  },
  {
    "code": "RIDE_089",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use the driver_documents table."
      },
      {
        "hint_order": 2,
        "content": "Filter only verified documents."
      },
      {
        "hint_order": 3,
        "content": "Group by driver_id and HAVING COUNT(*) > 2."
      }
    ]
  },
  {
    "code": "RIDE_090",
    "hints": [
      {
        "hint_order": 1,
        "content": "Discount amount is in trips, code is in promos."
      },
      {
        "hint_order": 2,
        "content": "Join trips with promos on promo_id."
      },
      {
        "hint_order": 3,
        "content": "SUM(discount_amount), sort desc, LIMIT 5."
      }
    ]
  },
  {
    "code": "RIDE_091",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is a ranking problem per driver."
      },
      {
        "hint_order": 2,
        "content": "Partition rows by driver_id."
      },
      {
        "hint_order": 3,
        "content": "Use RANK() over total_fare descending."
      }
    ]
  },
  {
    "code": "RIDE_092",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is a running total per rider."
      },
      {
        "hint_order": 2,
        "content": "Partition by user_id and order by requested_at."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(total_fare) as a window function."
      }
    ]
  },
  {
    "code": "RIDE_093",
    "hints": [
      {
        "hint_order": 1,
        "content": "First total payout per driver."
      },
      {
        "hint_order": 2,
        "content": "Then rank those totals from highest to lowest."
      },
      {
        "hint_order": 3,
        "content": "Return rows with rank = 2."
      }
    ]
  },
  {
    "code": "RIDE_094",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare each trip time with the previous trip time for the same rider."
      },
      {
        "hint_order": 2,
        "content": "Use LAG(requested_at) partitioned by user_id."
      },
      {
        "hint_order": 3,
        "content": "Convert the interval to minutes and take MAX()."
      }
    ]
  },
  {
    "code": "RIDE_095",
    "hints": [
      {
        "hint_order": 1,
        "content": "First total payout per driver per day."
      },
      {
        "hint_order": 2,
        "content": "Then rank drivers within each day."
      },
      {
        "hint_order": 3,
        "content": "Use RANK() partitioned by payout_date."
      }
    ]
  },
  {
    "code": "RIDE_096",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is top N per group."
      },
      {
        "hint_order": 2,
        "content": "Partition by ride_type and sort by total_fare desc."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() and keep rn <= 3."
      }
    ]
  },
  {
    "code": "RIDE_097",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is a moving average per rider."
      },
      {
        "hint_order": 2,
        "content": "Partition by user_id and order by requested_at."
      },
      {
        "hint_order": 3,
        "content": "Use AVG(...) with ROWS BETWEEN 2 PRECEDING AND CURRENT ROW."
      }
    ]
  },
  {
    "code": "RIDE_098",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is a consecutive streak problem."
      },
      {
        "hint_order": 2,
        "content": "Identify cancelled trips and group consecutive rows together."
      },
      {
        "hint_order": 3,
        "content": "Use row numbers to build streak groups, then take MAX()."
      }
    ]
  },
  {
    "code": "RIDE_099",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only completed trips."
      },
      {
        "hint_order": 2,
        "content": "Compute the 90th percentile of total_fare for each ride type."
      },
      {
        "hint_order": 3,
        "content": "Use PERCENTILE_CONT(0.9) WITHIN GROUP."
      }
    ]
  },
  {
    "code": "RIDE_100",
    "hints": [
      {
        "hint_order": 1,
        "content": "Pickup zone name is in locations."
      },
      {
        "hint_order": 2,
        "content": "Join trips with locations using pickup_location_id."
      },
      {
        "hint_order": 3,
        "content": "Compute surge revenue per trip, then sum by zone and rank top 5."
      }
    ]
  }
];

export const conceptFilters = [
  {
    "code": "RIDE_001",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "RIDE_002",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_003",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_004",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_005",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_006",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_007",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_008",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "RIDE_009",
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
    "code": "RIDE_010",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_011",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_012",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_013",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_014",
    "concepts": [
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "RIDE_015",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_016",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_017",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "RIDE_018",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_019",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "date_functions",
      "comparison"
    ]
  },
  {
    "code": "RIDE_020",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_021",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_022",
    "concepts": [
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_023",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_024",
    "concepts": [
      "filtering",
      "sorting",
      "limit",
      "comparison"
    ]
  },
  {
    "code": "RIDE_025",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "null_handling"
    ]
  },
  {
    "code": "RIDE_026",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_027",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_028",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_029",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_030",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "RIDE_031",
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
    "code": "RIDE_032",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_033",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_034",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "RIDE_035",
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
    "code": "RIDE_036",
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
    "code": "RIDE_037",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "date_functions",
      "comparison"
    ]
  },
  {
    "code": "RIDE_038",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_039",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_040",
    "concepts": [
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
    "code": "RIDE_041",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "subquery",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_042",
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
    "code": "RIDE_043",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_044",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "RIDE_045",
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
    "code": "RIDE_046",
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
    "code": "RIDE_047",
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
    "code": "RIDE_048",
    "concepts": [
      "joins",
      "filtering",
      "distinct",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_049",
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
    "code": "RIDE_050",
    "concepts": [
      "aggregation",
      "count",
      "conditional_aggregation",
      "arithmetic",
      "calculation"
    ]
  },
  {
    "code": "RIDE_051",
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
    "code": "RIDE_052",
    "concepts": [
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_053",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_054",
    "concepts": [
      "filtering",
      "distinct",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_055",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_056",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "average",
      "group_by",
      "subquery",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_057",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_058",
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
    "code": "RIDE_059",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "subquery",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_060",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_061",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_062",
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
    "code": "RIDE_063",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_064",
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
    "code": "RIDE_065",
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
    "code": "RIDE_066",
    "concepts": [
      "aggregation",
      "sum",
      "average",
      "group_by",
      "subquery",
      "filtering",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "RIDE_067",
    "concepts": [
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_068",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_069",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "RIDE_070",
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
    "code": "RIDE_071",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_072",
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
    "code": "RIDE_073",
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
    "code": "RIDE_074",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_075",
    "concepts": [
      "filtering",
      "distinct",
      "string_functions",
      "sorting"
    ]
  },
  {
    "code": "RIDE_076",
    "concepts": [
      "joins",
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
    "code": "RIDE_077",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_078",
    "concepts": [
      "joins",
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
    "code": "RIDE_079",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "subquery",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_080",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "having",
      "subquery",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "RIDE_081",
    "concepts": [
      "date_functions",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_082",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "RIDE_083",
    "concepts": [
      "filtering",
      "case_when",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_084",
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
    "code": "RIDE_085",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "RIDE_086",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_087",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "RIDE_088",
    "concepts": [
      "joins",
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
    "code": "RIDE_089",
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
    "code": "RIDE_090",
    "concepts": [
      "joins",
      "filtering",
      "null_handling",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "calculation"
    ]
  },
  {
    "code": "RIDE_091",
    "concepts": [
      "filtering",
      "null_handling",
      "window_functions",
      "ranking",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_092",
    "concepts": [
      "filtering",
      "window_functions",
      "sum",
      "running_total",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_093",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "ranking",
      "filtering",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_094",
    "concepts": [
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "aggregation",
      "max",
      "date_difference",
      "date_functions",
      "arithmetic",
      "calculation",
      "group_by",
      "sorting",
      "null_handling"
    ]
  },
  {
    "code": "RIDE_095",
    "concepts": [
      "date_functions",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "ranking",
      "partition_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_096",
    "concepts": [
      "filtering",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_097",
    "concepts": [
      "filtering",
      "window_functions",
      "moving_average",
      "average",
      "partition_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "RIDE_098",
    "concepts": [
      "cte",
      "filtering",
      "case_when",
      "window_functions",
      "row_number",
      "partition_by",
      "pattern_detection",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_099",
    "concepts": [
      "filtering",
      "ordered_set_aggregate",
      "percentile",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "RIDE_100",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit",
      "arithmetic",
      "calculation"
    ]
  }
];

export const solutions = [
  {
    "code": "RIDE_001",
    "approaches": [
      {
        "approach_title": "COUNT rows",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_riders FROM users;",
        "explanation": "## Approach\n\nCount all rows in `users`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_riders\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one rider.\n- `COUNT(*)` returns the total row count.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the shortest and clearest way to count all riders."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_riders FROM users;",
        "explanation": "## Approach\n\nCount the primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_riders\nFROM users;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for row counting."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH rider_count AS (\n  SELECT COUNT(*) AS total_riders\n  FROM users\n)\nSELECT total_riders\nFROM rider_count;",
        "explanation": "## Approach\n\nCompute the count in a CTE, then select it.\n\n## Query\n\n```sql\nWITH rider_count AS (\n  SELECT COUNT(*) AS total_riders\n  FROM users\n)\nSELECT total_riders\nFROM rider_count;\n```\n\n## Explanation\n\n- The CTE calculates the total once.\n- The outer query returns that value.\n- This is useful when you want to extend the query later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on."
      }
    ]
  },
  {
    "code": "RIDE_002",
    "approaches": [
      {
        "approach_title": "Filter then count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS verified_drivers FROM drivers WHERE is_verified = true;",
        "explanation": "## Approach\n\nKeep only verified drivers, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_drivers\nFROM drivers\nWHERE is_verified = true;\n```\n\n## Explanation\n\n- `WHERE is_verified = true` filters to verified drivers only.\n- `COUNT(*)` counts those filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is explicit and easy for learners to read."
      },
      {
        "approach_title": "Boolean shorthand",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS verified_drivers FROM drivers WHERE is_verified;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_drivers\nFROM drivers\nWHERE is_verified;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_verified` means the same as `WHERE is_verified = true`.\n- Only verified drivers are counted.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for practice questions."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_verified = true) AS verified_drivers FROM drivers;",
        "explanation": "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_verified = true) AS verified_drivers\nFROM drivers;\n```\n\n## Explanation\n\n- `FILTER` makes `COUNT(*)` include only verified rows.\n- This is useful when calculating multiple conditional counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric."
      }
    ]
  },
  {
    "code": "RIDE_003",
    "approaches": [
      {
        "approach_title": "IN list count",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_trips FROM trips WHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress');",
        "explanation": "## Approach\n\nFilter trips to active statuses, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_trips\nFROM trips\nWHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress');\n```\n\n## Explanation\n\n- Only active lifecycle statuses are included.\n- `COUNT(*)` returns how many such trips exist.\n- The result is a single value.\n\n## Why this is optimal\n\n`IN` is compact and readable when matching several known values."
      },
      {
        "approach_title": "OR conditions",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS active_trips FROM trips WHERE trip_status = 'requested' OR trip_status = 'accepted' OR trip_status = 'arriving' OR trip_status = 'in_progress';",
        "explanation": "## Approach\n\nWrite each active status as a separate condition.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_trips\nFROM trips\nWHERE trip_status = 'requested'\n   OR trip_status = 'accepted'\n   OR trip_status = 'arriving'\n   OR trip_status = 'in_progress';\n```\n\n## Explanation\n\n- Each `OR` condition matches one active status.\n- Together they produce the same result as `IN`.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress')) AS active_trips FROM trips;",
        "explanation": "## Approach\n\nApply the active-status condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (\n  WHERE trip_status IN ('requested', 'accepted', 'arriving', 'in_progress')\n) AS active_trips\nFROM trips;\n```\n\n## Explanation\n\n- `FILTER` counts only active trips.\n- This pattern is handy when several metrics are needed in one row.\n\n## Difference from the optimal approach\n\nUseful for reporting queries, but less straightforward here."
      }
    ]
  },
  {
    "code": "RIDE_004",
    "approaches": [
      {
        "approach_title": "Completed count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS completed_trips FROM trips WHERE trip_status = 'completed';",
        "explanation": "## Approach\n\nFilter completed trips, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS completed_trips\nFROM trips\nWHERE trip_status = 'completed';\n```\n\n## Explanation\n\n- The `WHERE` clause keeps only completed trips.\n- `COUNT(*)` returns the number of those rows.\n\n## Why this is optimal\n\nSimple, direct, and matches the question exactly."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS completed_trips FROM trips WHERE trip_status = 'completed';",
        "explanation": "## Approach\n\nCount trip ids after filtering completed trips.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS completed_trips\nFROM trips\nWHERE trip_status = 'completed';\n```\n\n## Explanation\n\n- `id` is not NULL, so counting ids matches counting rows.\n- The filter still limits the result to completed trips.\n\n## Difference from the optimal approach\n\nWorks the same, but row counting is clearer with `COUNT(*)`."
      },
      {
        "approach_title": "FILTER aggregate",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips FROM trips;",
        "explanation": "## Approach\n\nPut the completed condition inside `FILTER`.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips\nFROM trips;\n```\n\n## Explanation\n\n- This counts only rows whose status is `completed`.\n- It is especially useful when computing multiple status counts at once.\n\n## Difference from the optimal approach\n\nMore flexible, but slightly less beginner-friendly."
      }
    ]
  },
  {
    "code": "RIDE_005",
    "approaches": [
      {
        "approach_title": "Cancelled count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled';",
        "explanation": "## Approach\n\nFilter cancelled trips, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS cancelled_trips\nFROM trips\nWHERE trip_status = 'cancelled';\n```\n\n## Explanation\n\n- Only trips with status `cancelled` are kept.\n- `COUNT(*)` returns how many there are.\n\n## Why this is optimal\n\nThis is the cleanest possible solution."
      },
      {
        "approach_title": "Boolean sum",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips FROM trips;",
        "explanation": "## Approach\n\nTurn cancelled rows into 1 and everything else into 0, then sum.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips\nFROM trips;\n```\n\n## Explanation\n\n- Cancelled trips contribute `1`.\n- All other trips contribute `0`.\n- Summing these values gives the cancelled count.\n\n## Difference from the optimal approach\n\nHelpful for conditional counting patterns, but more verbose."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips;",
        "explanation": "## Approach\n\nUse a filtered aggregate instead of a `WHERE` clause.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\nFROM trips;\n```\n\n## Explanation\n\n- `FILTER` limits the count to cancelled trips.\n- The query still returns one row.\n\n## Difference from the optimal approach\n\nGreat for multi-metric queries, but less direct here."
      }
    ]
  },
  {
    "code": "RIDE_006",
    "approaches": [
      {
        "approach_title": "GROUP BY type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, COUNT(*) AS trip_count FROM trips GROUP BY ride_type ORDER BY trip_count DESC, ride_type ASC;",
        "explanation": "## Approach\n\nGroup trips by `ride_type`, count each group, then sort.\n\n## Query\n\n```sql\nSELECT ride_type, COUNT(*) AS trip_count\nFROM trips\nGROUP BY ride_type\nORDER BY trip_count DESC, ride_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY ride_type` creates one group per ride type.\n- `COUNT(*)` returns the number of trips in each group.\n- Sorting matches the expected output order.\n\n## Why this is optimal\n\nThis is the standard and most readable aggregation pattern."
      },
      {
        "approach_title": "CTE group count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH type_counts AS (\n  SELECT ride_type, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY ride_type\n)\nSELECT ride_type, trip_count\nFROM type_counts\nORDER BY trip_count DESC, ride_type ASC;",
        "explanation": "## Approach\n\nAggregate first in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH type_counts AS (\n  SELECT ride_type, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY ride_type\n)\nSELECT ride_type, trip_count\nFROM type_counts\nORDER BY trip_count DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE computes counts by ride type.\n- The outer query handles the final presentation.\n\n## Difference from the optimal approach\n\nUseful when later logic needs the grouped result, but unnecessary here."
      },
      {
        "approach_title": "Window dedupe",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT ride_type, COUNT(*) OVER (PARTITION BY ride_type) AS trip_count FROM trips ORDER BY trip_count DESC, ride_type ASC;",
        "explanation": "## Approach\n\nUse a window count per ride type, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT ride_type,\n       COUNT(*) OVER (PARTITION BY ride_type) AS trip_count\nFROM trips\nORDER BY trip_count DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The window function computes the trip count on every row of the same ride type.\n- `DISTINCT` collapses repeated rows to one per ride type.\n\n## Difference from the optimal approach\n\nIt works, but is more complex than a normal `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_007",
    "approaches": [
      {
        "approach_title": "Count by city",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT city, COUNT(*) AS driver_count FROM drivers GROUP BY city ORDER BY driver_count DESC, city ASC;",
        "explanation": "## Approach\n\nGroup drivers by city, count them, then sort.\n\n## Query\n\n```sql\nSELECT city, COUNT(*) AS driver_count\nFROM drivers\nGROUP BY city\nORDER BY driver_count DESC, city ASC;\n```\n\n## Explanation\n\n- `GROUP BY city` creates one group per city.\n- `COUNT(*)` gives the number of drivers in each city.\n- Sorting follows the expected order.\n\n## Why this is optimal\n\nIt is the clearest way to produce grouped counts."
      },
      {
        "approach_title": "CTE city count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_counts AS (\n  SELECT city, COUNT(*) AS driver_count\n  FROM drivers\n  GROUP BY city\n)\nSELECT city, driver_count\nFROM city_counts\nORDER BY driver_count DESC, city ASC;",
        "explanation": "## Approach\n\nBuild the grouped result in a CTE, then sort it.\n\n## Query\n\n```sql\nWITH city_counts AS (\n  SELECT city, COUNT(*) AS driver_count\n  FROM drivers\n  GROUP BY city\n)\nSELECT city, driver_count\nFROM city_counts\nORDER BY driver_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE computes one row per city.\n- The outer query returns the result in the required order.\n\n## Difference from the optimal approach\n\nMore extensible, but longer."
      },
      {
        "approach_title": "Window dedupe",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT city, COUNT(*) OVER (PARTITION BY city) AS driver_count FROM drivers ORDER BY driver_count DESC, city ASC;",
        "explanation": "## Approach\n\nCompute city counts with a window function.\n\n## Query\n\n```sql\nSELECT DISTINCT city,\n       COUNT(*) OVER (PARTITION BY city) AS driver_count\nFROM drivers\nORDER BY driver_count DESC, city ASC;\n```\n\n## Explanation\n\n- The window count repeats the city total on each row.\n- `DISTINCT` keeps one row per city.\n\n## Difference from the optimal approach\n\nCorrect, but not as simple as `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_008",
    "approaches": [
      {
        "approach_title": "AVG fare",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed';",
        "explanation": "## Approach\n\nFilter completed trips, then average `total_fare`.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed';\n```\n\n## Explanation\n\n- Only completed trips are included.\n- `AVG(total_fare)` finds the mean fare.\n- `ROUND(..., 2)` formats the answer to two decimal places.\n\n## Why this is optimal\n\nIt directly expresses the business question with minimal SQL."
      },
      {
        "approach_title": "Subquery average",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(total_fare), 2) AS avg_fare FROM (SELECT total_fare FROM trips WHERE trip_status = 'completed') x;",
        "explanation": "## Approach\n\nSelect completed trip fares in a subquery, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(total_fare), 2) AS avg_fare\nFROM (\n  SELECT total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n) x;\n```\n\n## Explanation\n\n- The inner query isolates the relevant fares.\n- The outer query averages them.\n\n## Difference from the optimal approach\n\nWorks the same, but adds an unnecessary wrapper."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_trips AS (\n  SELECT total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ROUND(AVG(total_fare), 2) AS avg_fare\nFROM completed_trips;",
        "explanation": "## Approach\n\nPut completed trip fares in a CTE, then average them.\n\n## Query\n\n```sql\nWITH completed_trips AS (\n  SELECT total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ROUND(AVG(total_fare), 2) AS avg_fare\nFROM completed_trips;\n```\n\n## Explanation\n\n- The CTE isolates the input rows.\n- The final query computes the average.\n\n## Difference from the optimal approach\n\nLonger, but nice when more logic may be added later."
      }
    ]
  },
  {
    "code": "RIDE_009",
    "approaches": [
      {
        "approach_title": "Group and limit",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS completed_trips FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY completed_trips DESC, driver_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter completed assigned trips, group by driver, count, then keep top 5.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS completed_trips\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nGROUP BY driver_id\nORDER BY completed_trips DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The filter keeps only completed trips with a driver assigned.\n- Grouping by `driver_id` gives one row per driver.\n- `COUNT(*)` returns the completed trip count.\n- `ORDER BY` and `LIMIT 5` produce the top 5.\n\n## Why this is optimal\n\nThis is the standard top-N aggregation pattern."
      },
      {
        "approach_title": "CTE top drivers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_counts AS (\n  SELECT driver_id, COUNT(*) AS completed_trips\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, completed_trips\nFROM driver_counts\nORDER BY completed_trips DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCalculate per-driver counts first, then rank them outside.\n\n## Query\n\n```sql\nWITH driver_counts AS (\n  SELECT driver_id, COUNT(*) AS completed_trips\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, completed_trips\nFROM driver_counts\nORDER BY completed_trips DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per driver.\n- The outer query sorts and returns the top 5.\n\n## Difference from the optimal approach\n\nMore modular, but not needed here."
      },
      {
        "approach_title": "Ranked drivers",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x WHERE rn <= 5 ORDER BY completed_trips DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate drivers, assign row numbers, then keep the first 5.\n\n## Query\n\n```sql\nSELECT driver_id, completed_trips\nFROM (\n  SELECT driver_id,\n         COUNT(*) AS completed_trips,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n) x\nWHERE rn <= 5\nORDER BY completed_trips DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes counts.\n- `ROW_NUMBER()` ranks drivers by completed trip count.\n- The outer query keeps the first 5.\n\n## Difference from the optimal approach\n\nUseful when later pagination or rank output is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_010",
    "approaches": [
      {
        "approach_title": "Group riders",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS total_trips FROM trips GROUP BY user_id ORDER BY total_trips DESC, user_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup trips by rider, count them, then return the top 5.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS total_trips\nFROM trips\nGROUP BY user_id\nORDER BY total_trips DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per rider.\n- `COUNT(*)` gives each rider's trip count.\n- Sorting by trip count descending finds the heaviest users.\n- `LIMIT 5` keeps only the top 5 riders.\n\n## Why this is optimal\n\nThis is the most direct top-N grouped query."
      },
      {
        "approach_title": "CTE top riders",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_counts AS (\n  SELECT user_id, COUNT(*) AS total_trips\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id, total_trips\nFROM rider_counts\nORDER BY total_trips DESC, user_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute rider counts in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH rider_counts AS (\n  SELECT user_id, COUNT(*) AS total_trips\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id, total_trips\nFROM rider_counts\nORDER BY total_trips DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE produces the grouped counts.\n- The outer query returns the top 5 in the required order.\n\n## Difference from the optimal approach\n\nSlightly longer, but easier to extend."
      },
      {
        "approach_title": "Window rank",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, total_trips FROM (SELECT user_id, COUNT(*) AS total_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn FROM trips GROUP BY user_id) x WHERE rn <= 5 ORDER BY total_trips DESC, user_id ASC;",
        "explanation": "## Approach\n\nAggregate by rider, rank the rows, then keep the first 5.\n\n## Query\n\n```sql\nSELECT user_id, total_trips\nFROM (\n  SELECT user_id,\n         COUNT(*) AS total_trips,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn\n  FROM trips\n  GROUP BY user_id\n) x\nWHERE rn <= 5\nORDER BY total_trips DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner query computes trip counts per rider.\n- `ROW_NUMBER()` ranks riders from highest to lowest count.\n- The outer query returns the top 5.\n\n## Difference from the optimal approach\n\nMore complex than needed, but helpful when explicit ranking is useful."
      }
    ]
  },
  {
    "code": "RIDE_011",
    "approaches": [
      {
        "approach_title": "Group by type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT vehicle_type, COUNT(*) AS vehicle_count FROM vehicles GROUP BY vehicle_type ORDER BY vehicle_count DESC, vehicle_type ASC;",
        "explanation": "## Approach\n\nGroup vehicles by `vehicle_type`, then count each group.\n\n## Query\n\n```sql\nSELECT vehicle_type, COUNT(*) AS vehicle_count\nFROM vehicles\nGROUP BY vehicle_type\nORDER BY vehicle_count DESC, vehicle_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY vehicle_type` creates one row per type.\n- `COUNT(*)` counts vehicles in each type.\n- Sorting matches the expected output order.\n\n## Why this is optimal\n\nThis is the standard and clearest grouped count query."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH type_counts AS (\n  SELECT vehicle_type, COUNT(*) AS vehicle_count\n  FROM vehicles\n  GROUP BY vehicle_type\n)\nSELECT vehicle_type, vehicle_count\nFROM type_counts\nORDER BY vehicle_count DESC, vehicle_type ASC;",
        "explanation": "## Approach\n\nCalculate counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH type_counts AS (\n  SELECT vehicle_type, COUNT(*) AS vehicle_count\n  FROM vehicles\n  GROUP BY vehicle_type\n)\nSELECT vehicle_type, vehicle_count\nFROM type_counts\nORDER BY vehicle_count DESC, vehicle_type ASC;\n```\n\n## Explanation\n\n- The CTE computes the grouped counts.\n- The outer query returns them in the required order.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend later."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT vehicle_type, COUNT(*) OVER (PARTITION BY vehicle_type) AS vehicle_count FROM vehicles ORDER BY vehicle_count DESC, vehicle_type ASC;",
        "explanation": "## Approach\n\nUse a window count per vehicle type, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT vehicle_type,\n       COUNT(*) OVER (PARTITION BY vehicle_type) AS vehicle_count\nFROM vehicles\nORDER BY vehicle_count DESC, vehicle_type ASC;\n```\n\n## Explanation\n\n- The window function repeats each type's count on every row of that type.\n- `DISTINCT` leaves one row per type.\n\n## Difference from the optimal approach\n\nIt works, but `GROUP BY` is simpler and easier to teach."
      }
    ]
  },
  {
    "code": "RIDE_012",
    "approaches": [
      {
        "approach_title": "Filter verified",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS verified_users FROM users WHERE is_verified = true;",
        "explanation": "## Approach\n\nKeep only verified riders, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_users\nFROM users\nWHERE is_verified = true;\n```\n\n## Explanation\n\n- `WHERE is_verified = true` filters to verified riders only.\n- `COUNT(*)` counts those rows.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nIt is direct and very easy to understand."
      },
      {
        "approach_title": "Boolean shorthand",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS verified_users FROM users WHERE is_verified;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_users\nFROM users\nWHERE is_verified;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_verified` means `WHERE is_verified = true`.\n- The result is the same.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is clearer for learners."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_verified = true) AS verified_users FROM users;",
        "explanation": "## Approach\n\nApply the condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_verified = true) AS verified_users\nFROM users;\n```\n\n## Explanation\n\n- `FILTER` counts only rows where the rider is verified.\n- This pattern is useful when multiple conditional counts are needed in one query.\n\n## Difference from the optimal approach\n\nMore flexible, but less direct for one metric."
      }
    ]
  },
  {
    "code": "RIDE_013",
    "approaches": [
      {
        "approach_title": "Group by channel",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT booking_channel, COUNT(*) AS trip_count FROM trips GROUP BY booking_channel ORDER BY trip_count DESC, booking_channel ASC;",
        "explanation": "## Approach\n\nGroup trips by booking channel and count them.\n\n## Query\n\n```sql\nSELECT booking_channel, COUNT(*) AS trip_count\nFROM trips\nGROUP BY booking_channel\nORDER BY trip_count DESC, booking_channel ASC;\n```\n\n## Explanation\n\n- `GROUP BY booking_channel` builds one group per channel.\n- `COUNT(*)` returns the number of trips in each group.\n- Sorting matches the required result order.\n\n## Why this is optimal\n\nIt is the cleanest grouped count solution."
      },
      {
        "approach_title": "CTE channel count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH channel_counts AS (\n  SELECT booking_channel, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY booking_channel\n)\nSELECT booking_channel, trip_count\nFROM channel_counts\nORDER BY trip_count DESC, booking_channel ASC;",
        "explanation": "## Approach\n\nCompute counts in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH channel_counts AS (\n  SELECT booking_channel, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY booking_channel\n)\nSELECT booking_channel, trip_count\nFROM channel_counts\nORDER BY trip_count DESC, booking_channel ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per booking channel.\n- The outer query presents the final result.\n\n## Difference from the optimal approach\n\nLonger, but useful if more steps are added later."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT booking_channel, COUNT(*) OVER (PARTITION BY booking_channel) AS trip_count FROM trips ORDER BY trip_count DESC, booking_channel ASC;",
        "explanation": "## Approach\n\nCount rows per booking channel with a window function.\n\n## Query\n\n```sql\nSELECT DISTINCT booking_channel,\n       COUNT(*) OVER (PARTITION BY booking_channel) AS trip_count\nFROM trips\nORDER BY trip_count DESC, booking_channel ASC;\n```\n\n## Explanation\n\n- The window function repeats the channel count on each row.\n- `DISTINCT` collapses that to one row per channel.\n\n## Difference from the optimal approach\n\nCorrect, but more complicated than a normal `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_014",
    "approaches": [
      {
        "approach_title": "AVG rating",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(rating), 2) AS avg_driver_rating FROM ratings;",
        "explanation": "## Approach\n\nAverage the `rating` values from the ratings table.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(rating), 2) AS avg_driver_rating\nFROM ratings;\n```\n\n## Explanation\n\n- Each row in `ratings` stores a rider's rating for a trip.\n- `AVG(rating)` computes the mean rating.\n- `ROUND(..., 2)` keeps two decimal places.\n\n## Why this is optimal\n\nThis directly answers the question with minimal SQL."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(rating), 2) AS avg_driver_rating FROM (SELECT rating FROM ratings) x;",
        "explanation": "## Approach\n\nSelect ratings in a subquery, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(rating), 2) AS avg_driver_rating\nFROM (\n  SELECT rating\n  FROM ratings\n) x;\n```\n\n## Explanation\n\n- The inner query returns all rating values.\n- The outer query averages them.\n\n## Difference from the optimal approach\n\nIt works, but the subquery adds no extra value here."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH rating_values AS (\n  SELECT rating\n  FROM ratings\n)\nSELECT ROUND(AVG(rating), 2) AS avg_driver_rating\nFROM rating_values;",
        "explanation": "## Approach\n\nPut the ratings in a CTE, then average them.\n\n## Query\n\n```sql\nWITH rating_values AS (\n  SELECT rating\n  FROM ratings\n)\nSELECT ROUND(AVG(rating), 2) AS avg_driver_rating\nFROM rating_values;\n```\n\n## Explanation\n\n- The CTE isolates the input values.\n- The final query computes the average.\n\n## Difference from the optimal approach\n\nMore verbose, but can help when the query grows."
      }
    ]
  },
  {
    "code": "RIDE_015",
    "approaches": [
      {
        "approach_title": "Count rider cancels",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS rider_cancelled_trips FROM trips WHERE cancelled_by = 'rider';",
        "explanation": "## Approach\n\nFilter trips cancelled by riders, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS rider_cancelled_trips\nFROM trips\nWHERE cancelled_by = 'rider';\n```\n\n## Explanation\n\n- `cancelled_by = 'rider'` keeps only rider-cancelled trips.\n- `COUNT(*)` returns how many such trips exist.\n\n## Why this is optimal\n\nIt is simple and matches the question exactly."
      },
      {
        "approach_title": "CASE sum",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(CASE WHEN cancelled_by = 'rider' THEN 1 ELSE 0 END) AS rider_cancelled_trips FROM trips;",
        "explanation": "## Approach\n\nTurn rider-cancelled trips into 1 and sum them.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN cancelled_by = 'rider' THEN 1 ELSE 0 END) AS rider_cancelled_trips\nFROM trips;\n```\n\n## Explanation\n\n- Rider-cancelled rows contribute `1`.\n- All other rows contribute `0`.\n- Summing gives the total rider-cancelled trips.\n\n## Difference from the optimal approach\n\nUseful as a general conditional counting pattern, but longer."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE cancelled_by = 'rider') AS rider_cancelled_trips FROM trips;",
        "explanation": "## Approach\n\nUse a filtered aggregate instead of a `WHERE` clause.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE cancelled_by = 'rider') AS rider_cancelled_trips\nFROM trips;\n```\n\n## Explanation\n\n- `FILTER` counts only rows cancelled by riders.\n- This is helpful when several cancel counts are needed together.\n\n## Difference from the optimal approach\n\nMore flexible, but less direct for a single result."
      }
    ]
  },
  {
    "code": "RIDE_016",
    "approaches": [
      {
        "approach_title": "Count driver cancels",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS driver_cancelled_trips FROM trips WHERE cancelled_by = 'driver';",
        "explanation": "## Approach\n\nFilter trips cancelled by drivers, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS driver_cancelled_trips\nFROM trips\nWHERE cancelled_by = 'driver';\n```\n\n## Explanation\n\n- `cancelled_by = 'driver'` keeps only driver-cancelled trips.\n- `COUNT(*)` returns the total count.\n\n## Why this is optimal\n\nIt is the most straightforward solution."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS driver_cancelled_trips FROM trips WHERE cancelled_by = 'driver';",
        "explanation": "## Approach\n\nCount trip ids after filtering driver cancellations.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS driver_cancelled_trips\nFROM trips\nWHERE cancelled_by = 'driver';\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL trip ids.\n- Since `id` is never NULL, it matches the row count.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` expresses row counting more clearly."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE cancelled_by = 'driver') AS driver_cancelled_trips FROM trips;",
        "explanation": "## Approach\n\nApply the condition inside `COUNT(*)`.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE cancelled_by = 'driver') AS driver_cancelled_trips\nFROM trips;\n```\n\n## Explanation\n\n- `FILTER` keeps only rows where the driver caused the cancellation.\n- The query still returns one row.\n\n## Difference from the optimal approach\n\nUseful in reporting queries, but less direct here."
      }
    ]
  },
  {
    "code": "RIDE_017",
    "approaches": [
      {
        "approach_title": "AVG distance",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed';",
        "explanation": "## Approach\n\nFilter completed trips, then average `actual_distance_km`.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\nFROM trips\nWHERE trip_status = 'completed';\n```\n\n## Explanation\n\n- Only completed trips are relevant here.\n- `AVG(actual_distance_km)` computes the mean actual distance.\n- `ROUND(..., 2)` keeps the result tidy.\n\n## Why this is optimal\n\nIt directly answers the question with no extra steps."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM (SELECT actual_distance_km FROM trips WHERE trip_status = 'completed') x;",
        "explanation": "## Approach\n\nFirst select completed trip distances, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\nFROM (\n  SELECT actual_distance_km\n  FROM trips\n  WHERE trip_status = 'completed'\n) x;\n```\n\n## Explanation\n\n- The inner query isolates the distances from completed trips.\n- The outer query averages them.\n\n## Difference from the optimal approach\n\nWorks fine, but the wrapper is unnecessary."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_distances AS (\n  SELECT actual_distance_km\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\nFROM completed_distances;",
        "explanation": "## Approach\n\nStore completed trip distances in a CTE, then average them.\n\n## Query\n\n```sql\nWITH completed_distances AS (\n  SELECT actual_distance_km\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\nFROM completed_distances;\n```\n\n## Explanation\n\n- The CTE prepares the relevant input rows.\n- The final query calculates the average.\n\n## Difference from the optimal approach\n\nLonger, but helpful when building a more complex query."
      }
    ]
  },
  {
    "code": "RIDE_018",
    "approaches": [
      {
        "approach_title": "Open ticket count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS open_tickets FROM support_tickets WHERE ticket_status = 'open';",
        "explanation": "## Approach\n\nFilter open support tickets, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS open_tickets\nFROM support_tickets\nWHERE ticket_status = 'open';\n```\n\n## Explanation\n\n- `ticket_status = 'open'` keeps only open tickets.\n- `COUNT(*)` returns their total number.\n\n## Why this is optimal\n\nIt is short, clear, and directly matches the requirement."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS open_tickets FROM support_tickets WHERE ticket_status = 'open';",
        "explanation": "## Approach\n\nCount ticket ids after filtering open tickets.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS open_tickets\nFROM support_tickets\nWHERE ticket_status = 'open';\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, this equals row count.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than `COUNT(*)`."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE ticket_status = 'open') AS open_tickets FROM support_tickets;",
        "explanation": "## Approach\n\nUse a filtered aggregate to count open tickets.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE ticket_status = 'open') AS open_tickets\nFROM support_tickets;\n```\n\n## Explanation\n\n- `FILTER` limits the count to open tickets.\n- This is useful when calculating several ticket-status counts together.\n\n## Difference from the optimal approach\n\nMore flexible, but not the simplest here."
      }
    ]
  },
  {
    "code": "RIDE_019",
    "approaches": [
      {
        "approach_title": "Date filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS trips_today FROM trips WHERE DATE(requested_at) = CURRENT_DATE;",
        "explanation": "## Approach\n\nConvert `requested_at` to a date and compare it with today's date.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS trips_today\nFROM trips\nWHERE DATE(requested_at) = CURRENT_DATE;\n```\n\n## Explanation\n\n- `DATE(requested_at)` removes the time part.\n- `CURRENT_DATE` represents today.\n- Matching those dates keeps only trips requested today.\n\n## Why this is optimal\n\nIt is easy to read and beginner-friendly."
      },
      {
        "approach_title": "Date range",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS trips_today FROM trips WHERE requested_at >= CURRENT_DATE AND requested_at < CURRENT_DATE + INTERVAL '1 day';",
        "explanation": "## Approach\n\nUse a start-of-day to next-day range.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS trips_today\nFROM trips\nWHERE requested_at >= CURRENT_DATE\n  AND requested_at < CURRENT_DATE + INTERVAL '1 day';\n```\n\n## Explanation\n\n- The lower bound starts at midnight today.\n- The upper bound stops before midnight tomorrow.\n- This captures all trips requested today.\n\n## Difference from the optimal approach\n\nSlightly longer, but often better for index-friendly range filtering."
      },
      {
        "approach_title": "DATE_TRUNC match",
        "approach_type": "date_time",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) AS trips_today FROM trips WHERE DATE_TRUNC('day', requested_at) = CURRENT_DATE;",
        "explanation": "## Approach\n\nTruncate the timestamp to day level before comparison.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS trips_today\nFROM trips\nWHERE DATE_TRUNC('day', requested_at) = CURRENT_DATE;\n```\n\n## Explanation\n\n- `DATE_TRUNC('day', requested_at)` resets the time to midnight.\n- That value is compared with today's date.\n\n## Difference from the optimal approach\n\nIt works, but `DATE(requested_at)` is simpler for learners."
      }
    ]
  },
  {
    "code": "RIDE_020",
    "approaches": [
      {
        "approach_title": "Group and limit",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT city, COUNT(*) AS rider_count FROM users GROUP BY city ORDER BY rider_count DESC, city ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup riders by city, count them, then return the top 5 cities.\n\n## Query\n\n```sql\nSELECT city, COUNT(*) AS rider_count\nFROM users\nGROUP BY city\nORDER BY rider_count DESC, city ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY city` creates one row per city.\n- `COUNT(*)` gives the number of riders in each city.\n- `ORDER BY` sorts from highest count to lowest.\n- `LIMIT 5` returns only the top 5 cities.\n\n## Why this is optimal\n\nThis is the standard top-N grouped query."
      },
      {
        "approach_title": "CTE top cities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_counts AS (\n  SELECT city, COUNT(*) AS rider_count\n  FROM users\n  GROUP BY city\n)\nSELECT city, rider_count\nFROM city_counts\nORDER BY rider_count DESC, city ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute city counts first, then sort and limit outside.\n\n## Query\n\n```sql\nWITH city_counts AS (\n  SELECT city, COUNT(*) AS rider_count\n  FROM users\n  GROUP BY city\n)\nSELECT city, rider_count\nFROM city_counts\nORDER BY rider_count DESC, city ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one aggregated row per city.\n- The outer query returns the top 5.\n\n## Difference from the optimal approach\n\nMore modular, but longer than needed."
      },
      {
        "approach_title": "Window rank",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, rider_count FROM (SELECT city, COUNT(*) AS rider_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, city ASC) AS rn FROM users GROUP BY city) x WHERE rn <= 5 ORDER BY rider_count DESC, city ASC;",
        "explanation": "## Approach\n\nAggregate by city, assign ranks, then keep the first 5.\n\n## Query\n\n```sql\nSELECT city, rider_count\nFROM (\n  SELECT city,\n         COUNT(*) AS rider_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, city ASC) AS rn\n  FROM users\n  GROUP BY city\n) x\nWHERE rn <= 5\nORDER BY rider_count DESC, city ASC;\n```\n\n## Explanation\n\n- The grouped query computes rider counts by city.\n- `ROW_NUMBER()` ranks cities from highest to lowest count.\n- The outer query returns the top 5 ranked cities.\n\n## Difference from the optimal approach\n\nUseful when explicit ranking is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_021",
    "approaches": [
      {
        "approach_title": "AVG by type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY avg_fare DESC, ride_type ASC;",
        "explanation": "## Approach\n\nFilter completed trips, group by `ride_type`, then average the fare.\n\n## Query\n\n```sql\nSELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed'\nGROUP BY ride_type\nORDER BY avg_fare DESC, ride_type ASC;\n```\n\n## Explanation\n\n- `WHERE trip_status = 'completed'` keeps only completed trips.\n- `GROUP BY ride_type` creates one row per ride type.\n- `AVG(total_fare)` computes the mean fare for each type.\n- `ROUND(..., 2)` keeps two decimal places.\n\n## Why this is optimal\n\nIt is the cleanest grouped-average solution."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH fare_by_type AS (\n  SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_fare\nFROM fare_by_type\nORDER BY avg_fare DESC, ride_type ASC;",
        "explanation": "## Approach\n\nCompute the grouped averages in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH fare_by_type AS (\n  SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_fare\nFROM fare_by_type\nORDER BY avg_fare DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per ride type.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nLonger, but easier to extend."
      },
      {
        "approach_title": "Subquery average",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, avg_fare FROM (SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) x ORDER BY avg_fare DESC, ride_type ASC;",
        "explanation": "## Approach\n\nAggregate in a subquery, then sort in the outer query.\n\n## Query\n\n```sql\nSELECT ride_type, avg_fare\nFROM (\n  SELECT ride_type, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n) x\nORDER BY avg_fare DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The inner query computes the average fare per ride type.\n- The outer query returns the final ordered result.\n\n## Difference from the optimal approach\n\nWorks well, but the extra wrapper is unnecessary here."
      }
    ]
  },
  {
    "code": "RIDE_022",
    "approaches": [
      {
        "approach_title": "Sort ratings",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id AS driver_id, rating_avg FROM drivers ORDER BY rating_avg DESC, id ASC LIMIT 5;",
        "explanation": "## Approach\n\nSort drivers by stored average rating, then keep the top 5.\n\n## Query\n\n```sql\nSELECT id AS driver_id, rating_avg\nFROM drivers\nORDER BY rating_avg DESC, id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `rating_avg` is already stored in `drivers`.\n- Sorting descending puts the highest rated drivers first.\n- `id ASC` breaks ties consistently.\n- `LIMIT 5` returns only the top 5 rows.\n\n## Why this is optimal\n\nThe needed metric already exists, so direct sorting is the simplest solution."
      },
      {
        "approach_title": "CTE top 5",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ranked_drivers AS (\n  SELECT id AS driver_id, rating_avg\n  FROM drivers\n)\nSELECT driver_id, rating_avg\nFROM ranked_drivers\nORDER BY rating_avg DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nRead the drivers in a CTE, then sort them outside.\n\n## Query\n\n```sql\nWITH ranked_drivers AS (\n  SELECT id AS driver_id, rating_avg\n  FROM drivers\n)\nSELECT driver_id, rating_avg\nFROM ranked_drivers\nORDER BY rating_avg DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE prepares the columns needed.\n- The outer query applies the ordering and limit.\n\n## Difference from the optimal approach\n\nReadable, but adds an unnecessary step."
      },
      {
        "approach_title": "Row number",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, rating_avg FROM (SELECT id AS driver_id, rating_avg, ROW_NUMBER() OVER (ORDER BY rating_avg DESC, id ASC) AS rn FROM drivers) x WHERE rn <= 5 ORDER BY rating_avg DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAssign row numbers based on rating order, then keep the first 5.\n\n## Query\n\n```sql\nSELECT driver_id, rating_avg\nFROM (\n  SELECT id AS driver_id,\n         rating_avg,\n         ROW_NUMBER() OVER (ORDER BY rating_avg DESC, id ASC) AS rn\n  FROM drivers\n) x\nWHERE rn <= 5\nORDER BY rating_avg DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` ranks drivers by rating.\n- The outer query filters to the first 5 rows.\n\n## Difference from the optimal approach\n\nUseful when ranks are needed, but more complex here."
      }
    ]
  },
  {
    "code": "RIDE_023",
    "approaches": [
      {
        "approach_title": "Count by status",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT trip_status, COUNT(*) AS trip_count FROM trips GROUP BY trip_status ORDER BY trip_count DESC, trip_status ASC;",
        "explanation": "## Approach\n\nGroup trips by status and count each group.\n\n## Query\n\n```sql\nSELECT trip_status, COUNT(*) AS trip_count\nFROM trips\nGROUP BY trip_status\nORDER BY trip_count DESC, trip_status ASC;\n```\n\n## Explanation\n\n- `GROUP BY trip_status` creates one group for each status.\n- `COUNT(*)` counts rows in each group.\n- Sorting matches the expected output.\n\n## Why this is optimal\n\nThis is the standard grouped count pattern."
      },
      {
        "approach_title": "CTE counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH status_counts AS (\n  SELECT trip_status, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY trip_status\n)\nSELECT trip_status, trip_count\nFROM status_counts\nORDER BY trip_count DESC, trip_status ASC;",
        "explanation": "## Approach\n\nCompute the counts in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH status_counts AS (\n  SELECT trip_status, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY trip_status\n)\nSELECT trip_status, trip_count\nFROM status_counts\nORDER BY trip_count DESC, trip_status ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per trip status.\n- The outer query presents the sorted result.\n\n## Difference from the optimal approach\n\nLonger, but fine when the grouped result is reused."
      },
      {
        "approach_title": "Window dedupe",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT trip_status, COUNT(*) OVER (PARTITION BY trip_status) AS trip_count FROM trips ORDER BY trip_count DESC, trip_status ASC;",
        "explanation": "## Approach\n\nUse a window count for each status, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT trip_status,\n       COUNT(*) OVER (PARTITION BY trip_status) AS trip_count\nFROM trips\nORDER BY trip_count DESC, trip_status ASC;\n```\n\n## Explanation\n\n- The window function repeats the group count on every row in the same status.\n- `DISTINCT` leaves one row per status.\n\n## Difference from the optimal approach\n\nCorrect, but less straightforward than `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_024",
    "approaches": [
      {
        "approach_title": "Sort and limit",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id AS trip_id, total_fare FROM trips WHERE trip_status = 'completed' ORDER BY total_fare DESC, trip_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter completed trips, sort by fare descending, then return the top 5.\n\n## Query\n\n```sql\nSELECT id AS trip_id, total_fare\nFROM trips\nWHERE trip_status = 'completed'\nORDER BY total_fare DESC, trip_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Only completed trips are relevant.\n- Sorting by `total_fare DESC` brings the highest fare trips to the top.\n- `trip_id ASC` breaks ties consistently.\n- `LIMIT 5` keeps only five rows.\n\n## Why this is optimal\n\nThis is the most direct top-N sorting query."
      },
      {
        "approach_title": "CTE top trips",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH completed_trips AS (\n  SELECT id AS trip_id, total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT trip_id, total_fare\nFROM completed_trips\nORDER BY total_fare DESC, trip_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nPrepare completed trips in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH completed_trips AS (\n  SELECT id AS trip_id, total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT trip_id, total_fare\nFROM completed_trips\nORDER BY total_fare DESC, trip_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE isolates completed trip rows.\n- The outer query returns the highest fare trips.\n\n## Difference from the optimal approach\n\nWorks well, but adds an extra layer."
      },
      {
        "approach_title": "Row rank",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT trip_id, total_fare FROM (SELECT id AS trip_id, total_fare, ROW_NUMBER() OVER (ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') x WHERE rn <= 5 ORDER BY total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nRank completed trips by fare, then keep the top 5.\n\n## Query\n\n```sql\nSELECT trip_id, total_fare\nFROM (\n  SELECT id AS trip_id,\n         total_fare,\n         ROW_NUMBER() OVER (ORDER BY total_fare DESC, id ASC) AS rn\n  FROM trips\n  WHERE trip_status = 'completed'\n) x\nWHERE rn <= 5\nORDER BY total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` ranks trips by fare.\n- The outer query filters to the first 5 ranked rows.\n\n## Difference from the optimal approach\n\nUseful when rank values are needed, but more verbose."
      }
    ]
  },
  {
    "code": "RIDE_025",
    "approaches": [
      {
        "approach_title": "Count promo trips",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS promo_trips FROM trips WHERE promo_id IS NOT NULL;",
        "explanation": "## Approach\n\nKeep only trips where `promo_id` exists, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS promo_trips\nFROM trips\nWHERE promo_id IS NOT NULL;\n```\n\n## Explanation\n\n- `promo_id IS NOT NULL` means a promo was applied.\n- `COUNT(*)` counts those trips.\n\n## Why this is optimal\n\nIt directly checks whether a promo was attached to the trip."
      },
      {
        "approach_title": "COUNT promo ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(promo_id) AS promo_trips FROM trips;",
        "explanation": "## Approach\n\nCount non-NULL promo ids.\n\n## Query\n\n```sql\nSELECT COUNT(promo_id) AS promo_trips\nFROM trips;\n```\n\n## Explanation\n\n- `COUNT(promo_id)` ignores NULL values.\n- So it counts only trips where a promo id exists.\n\n## Difference from the optimal approach\n\nCompact, but less explicit about the filtering condition."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trips FROM trips;",
        "explanation": "## Approach\n\nApply the promo condition inside `COUNT(*)`.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trips\nFROM trips;\n```\n\n## Explanation\n\n- `FILTER` counts only trips with a promo id.\n- This pattern is useful when mixing several conditional counts.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric."
      }
    ]
  },
  {
    "code": "RIDE_026",
    "approaches": [
      {
        "approach_title": "Count by tier",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_tier, COUNT(*) AS driver_count FROM drivers GROUP BY driver_tier ORDER BY driver_count DESC, driver_tier ASC;",
        "explanation": "## Approach\n\nGroup drivers by `driver_tier`, then count each tier.\n\n## Query\n\n```sql\nSELECT driver_tier, COUNT(*) AS driver_count\nFROM drivers\nGROUP BY driver_tier\nORDER BY driver_count DESC, driver_tier ASC;\n```\n\n## Explanation\n\n- `GROUP BY driver_tier` creates one row per tier.\n- `COUNT(*)` counts the drivers in each tier.\n- Sorting matches the expected output.\n\n## Why this is optimal\n\nThis is the simplest grouped count solution."
      },
      {
        "approach_title": "CTE tiers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH tier_counts AS (\n  SELECT driver_tier, COUNT(*) AS driver_count\n  FROM drivers\n  GROUP BY driver_tier\n)\nSELECT driver_tier, driver_count\nFROM tier_counts\nORDER BY driver_count DESC, driver_tier ASC;",
        "explanation": "## Approach\n\nCompute per-tier counts in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH tier_counts AS (\n  SELECT driver_tier, COUNT(*) AS driver_count\n  FROM drivers\n  GROUP BY driver_tier\n)\nSELECT driver_tier, driver_count\nFROM tier_counts\nORDER BY driver_count DESC, driver_tier ASC;\n```\n\n## Explanation\n\n- The CTE produces one grouped row per tier.\n- The outer query returns the final ordered output.\n\n## Difference from the optimal approach\n\nLonger, but easier to expand."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT driver_tier, COUNT(*) OVER (PARTITION BY driver_tier) AS driver_count FROM drivers ORDER BY driver_count DESC, driver_tier ASC;",
        "explanation": "## Approach\n\nUse a window function to count rows per driver tier.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_tier,\n       COUNT(*) OVER (PARTITION BY driver_tier) AS driver_count\nFROM drivers\nORDER BY driver_count DESC, driver_tier ASC;\n```\n\n## Explanation\n\n- The window count repeats each tier count on every row in that tier.\n- `DISTINCT` collapses that to one row per tier.\n\n## Difference from the optimal approach\n\nCorrect, but more complex than `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_027",
    "approaches": [
      {
        "approach_title": "AVG ETA",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins FROM trips GROUP BY ride_type ORDER BY avg_eta_mins DESC, ride_type ASC;",
        "explanation": "## Approach\n\nGroup trips by ride type, then average the pickup ETA.\n\n## Query\n\n```sql\nSELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins\nFROM trips\nGROUP BY ride_type\nORDER BY avg_eta_mins DESC, ride_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY ride_type` creates one row per ride type.\n- `AVG(estimated_pickup_eta_mins)` calculates the mean ETA.\n- `ROUND(..., 2)` keeps the result tidy.\n\n## Why this is optimal\n\nIt is the standard grouped-average query."
      },
      {
        "approach_title": "CTE ETA",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH eta_by_type AS (\n  SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins\n  FROM trips\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_eta_mins\nFROM eta_by_type\nORDER BY avg_eta_mins DESC, ride_type ASC;",
        "explanation": "## Approach\n\nBuild the grouped ETA result in a CTE first.\n\n## Query\n\n```sql\nWITH eta_by_type AS (\n  SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins\n  FROM trips\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_eta_mins\nFROM eta_by_type\nORDER BY avg_eta_mins DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE computes the average ETA per ride type.\n- The outer query handles ordering.\n\n## Difference from the optimal approach\n\nLonger, but can be useful if more steps are added later."
      },
      {
        "approach_title": "Subquery ETA",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, avg_eta_mins FROM (SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins FROM trips GROUP BY ride_type) x ORDER BY avg_eta_mins DESC, ride_type ASC;",
        "explanation": "## Approach\n\nAggregate in a subquery, then order outside.\n\n## Query\n\n```sql\nSELECT ride_type, avg_eta_mins\nFROM (\n  SELECT ride_type, ROUND(AVG(estimated_pickup_eta_mins), 2) AS avg_eta_mins\n  FROM trips\n  GROUP BY ride_type\n) x\nORDER BY avg_eta_mins DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The inner query calculates the average ETA per ride type.\n- The outer query returns the sorted result.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper adds little value here."
      }
    ]
  },
  {
    "code": "RIDE_028",
    "approaches": [
      {
        "approach_title": "Join and group",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.city, COUNT(*) AS trip_count FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city ORDER BY trip_count DESC, u.city ASC;",
        "explanation": "## Approach\n\nJoin trips to users, group by rider city, then count trips.\n\n## Query\n\n```sql\nSELECT u.city, COUNT(*) AS trip_count\nFROM trips t\nJOIN users u ON u.id = t.user_id\nGROUP BY u.city\nORDER BY trip_count DESC, u.city ASC;\n```\n\n## Explanation\n\n- `trips` contains the rider id.\n- Joining to `users` gives access to each rider's city.\n- Grouping by city lets us count trips per city.\n\n## Why this is optimal\n\nThis is the most direct way to bring city from `users` into the trip analysis."
      },
      {
        "approach_title": "CTE city trips",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_trips AS (\n  SELECT u.city, COUNT(*) AS trip_count\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  GROUP BY u.city\n)\nSELECT city, trip_count\nFROM city_trips\nORDER BY trip_count DESC, city ASC;",
        "explanation": "## Approach\n\nCompute the joined grouped result in a CTE, then sort it.\n\n## Query\n\n```sql\nWITH city_trips AS (\n  SELECT u.city, COUNT(*) AS trip_count\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  GROUP BY u.city\n)\nSELECT city, trip_count\nFROM city_trips\nORDER BY trip_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per city.\n- The outer query returns the sorted result.\n\n## Difference from the optimal approach\n\nReadable, but more verbose."
      },
      {
        "approach_title": "Subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, COUNT(*) AS trip_count FROM (SELECT t.id, u.city FROM trips t JOIN users u ON u.id = t.user_id) x GROUP BY city ORDER BY trip_count DESC, city ASC;",
        "explanation": "## Approach\n\nBuild trip-city rows first, then aggregate them.\n\n## Query\n\n```sql\nSELECT city, COUNT(*) AS trip_count\nFROM (\n  SELECT t.id, u.city\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n) x\nGROUP BY city\nORDER BY trip_count DESC, city ASC;\n```\n\n## Explanation\n\n- The inner query creates one row per trip with its rider city.\n- The outer query groups those rows by city.\n\n## Difference from the optimal approach\n\nWorks correctly, but the extra subquery is not required."
      }
    ]
  },
  {
    "code": "RIDE_029",
    "approaches": [
      {
        "approach_title": "Count success",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS successful_payments FROM payments WHERE payment_status = 'successful';",
        "explanation": "## Approach\n\nFilter successful payments, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS successful_payments\nFROM payments\nWHERE payment_status = 'successful';\n```\n\n## Explanation\n\n- `payment_status = 'successful'` keeps only successful payments.\n- `COUNT(*)` returns the number of those rows.\n\n## Why this is optimal\n\nIt is short, direct, and exactly matches the question."
      },
      {
        "approach_title": "COUNT ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS successful_payments FROM payments WHERE payment_status = 'successful';",
        "explanation": "## Approach\n\nCount payment ids after filtering successful rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS successful_payments\nFROM payments\nWHERE payment_status = 'successful';\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is never NULL, this equals the row count.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is clearer for row counting."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE payment_status = 'successful') AS successful_payments FROM payments;",
        "explanation": "## Approach\n\nUse a filtered aggregate instead of a `WHERE` clause.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE payment_status = 'successful') AS successful_payments\nFROM payments;\n```\n\n## Explanation\n\n- `FILTER` counts only successful payments.\n- This is useful when counting multiple payment statuses in one query.\n\n## Difference from the optimal approach\n\nMore flexible, but less direct for one value."
      }
    ]
  },
  {
    "code": "RIDE_030",
    "approaches": [
      {
        "approach_title": "Sum and limit",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id ORDER BY total_payout DESC, driver_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup payouts by driver, sum the net payout, then keep the top 5.\n\n## Query\n\n```sql\nSELECT driver_id, SUM(net_payout) AS total_payout\nFROM driver_payouts\nGROUP BY driver_id\nORDER BY total_payout DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- `SUM(net_payout)` calculates total payout for each driver.\n- Sorting descending finds the highest earning drivers.\n- `LIMIT 5` keeps the top 5.\n\n## Why this is optimal\n\nThis is the standard top-N aggregation query."
      },
      {
        "approach_title": "CTE payouts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH payout_totals AS (\n  SELECT driver_id, SUM(net_payout) AS total_payout\n  FROM driver_payouts\n  GROUP BY driver_id\n)\nSELECT driver_id, total_payout\nFROM payout_totals\nORDER BY total_payout DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute total payout per driver in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH payout_totals AS (\n  SELECT driver_id, SUM(net_payout) AS total_payout\n  FROM driver_payouts\n  GROUP BY driver_id\n)\nSELECT driver_id, total_payout\nFROM payout_totals\nORDER BY total_payout DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE builds one row per driver.\n- The outer query returns the top 5 drivers by payout.\n\n## Difference from the optimal approach\n\nMore modular, but not necessary here."
      },
      {
        "approach_title": "Rank payouts",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout, ROW_NUMBER() OVER (ORDER BY SUM(net_payout) DESC, driver_id ASC) AS rn FROM driver_payouts GROUP BY driver_id) x WHERE rn <= 5 ORDER BY total_payout DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate payouts, rank the drivers, then keep the first 5.\n\n## Query\n\n```sql\nSELECT driver_id, total_payout\nFROM (\n  SELECT driver_id,\n         SUM(net_payout) AS total_payout,\n         ROW_NUMBER() OVER (ORDER BY SUM(net_payout) DESC, driver_id ASC) AS rn\n  FROM driver_payouts\n  GROUP BY driver_id\n) x\nWHERE rn <= 5\nORDER BY total_payout DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The grouped query calculates total payout per driver.\n- `ROW_NUMBER()` ranks drivers by payout.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful if rank output is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_031",
    "approaches": [
      {
        "approach_title": "Group drivers",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS trip_count FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id ORDER BY trip_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nKeep assigned trips, group by driver, then count them.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS trip_count\nFROM trips\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nORDER BY trip_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `driver_id IS NOT NULL` removes unassigned trips.\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` counts how many trips each driver handled.\n- The result is sorted by trip count, then driver id.\n\n## Why this is optimal\n\nThis is the most direct grouped count solution."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_trip_counts AS (\n  SELECT driver_id, COUNT(*) AS trip_count\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, trip_count\nFROM driver_trip_counts\nORDER BY trip_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute trip counts per driver in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH driver_trip_counts AS (\n  SELECT driver_id, COUNT(*) AS trip_count\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, trip_count\nFROM driver_trip_counts\nORDER BY trip_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE builds one grouped row per driver.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nSlightly longer, but easier to extend."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS trip_count FROM trips WHERE driver_id IS NOT NULL ORDER BY trip_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nUse a window count for each driver, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_id,\n       COUNT(*) OVER (PARTITION BY driver_id) AS trip_count\nFROM trips\nWHERE driver_id IS NOT NULL\nORDER BY trip_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The window function repeats each driver's count on every trip row.\n- `DISTINCT` collapses it to one row per driver.\n\n## Difference from the optimal approach\n\nCorrect, but more complicated than `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_032",
    "approaches": [
      {
        "approach_title": "Count inactive",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS inactive_drivers FROM drivers WHERE is_active = false;",
        "explanation": "## Approach\n\nFilter inactive drivers, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS inactive_drivers\nFROM drivers\nWHERE is_active = false;\n```\n\n## Explanation\n\n- `WHERE is_active = false` keeps only inactive drivers.\n- `COUNT(*)` returns their total number.\n\n## Why this is optimal\n\nIt is clear and directly matches the requirement."
      },
      {
        "approach_title": "NOT boolean",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS inactive_drivers FROM drivers WHERE NOT is_active;",
        "explanation": "## Approach\n\nUse boolean negation in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS inactive_drivers\nFROM drivers\nWHERE NOT is_active;\n```\n\n## Explanation\n\n- `NOT is_active` is equivalent to `is_active = false`.\n- The query counts only inactive drivers.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is easier for learners."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_active = false) AS inactive_drivers FROM drivers;",
        "explanation": "## Approach\n\nApply the inactive condition inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = false) AS inactive_drivers\nFROM drivers;\n```\n\n## Explanation\n\n- `FILTER` counts only inactive rows.\n- This pattern is useful when you need multiple status counts together.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for one number."
      }
    ]
  },
  {
    "code": "RIDE_033",
    "approaches": [
      {
        "approach_title": "Count suspended",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS suspended_drivers FROM drivers WHERE is_suspended = true;",
        "explanation": "## Approach\n\nFilter suspended drivers, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS suspended_drivers\nFROM drivers\nWHERE is_suspended = true;\n```\n\n## Explanation\n\n- `is_suspended = true` keeps only suspended drivers.\n- `COUNT(*)` counts those rows.\n\n## Why this is optimal\n\nIt is simple, explicit, and easy to read."
      },
      {
        "approach_title": "Boolean shorthand",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS suspended_drivers FROM drivers WHERE is_suspended;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS suspended_drivers\nFROM drivers\nWHERE is_suspended;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_suspended` means `WHERE is_suspended = true`.\n- The result is the same.\n\n## Difference from the optimal approach\n\nShorter, but less explicit."
      },
      {
        "approach_title": "FILTER aggregate",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_suspended = true) AS suspended_drivers FROM drivers;",
        "explanation": "## Approach\n\nCount suspended drivers using `FILTER`.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_suspended = true) AS suspended_drivers\nFROM drivers;\n```\n\n## Explanation\n\n- `FILTER` limits the count to suspended rows.\n- This is especially useful in broader summary queries.\n\n## Difference from the optimal approach\n\nHelpful in reporting, but unnecessary here."
      }
    ]
  },
  {
    "code": "RIDE_034",
    "approaches": [
      {
        "approach_title": "AVG wait",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins FROM trips WHERE trip_status = 'completed';",
        "explanation": "## Approach\n\nFilter completed trips, then average rider wait time.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins\nFROM trips\nWHERE trip_status = 'completed';\n```\n\n## Explanation\n\n- Only completed trips are included.\n- `AVG(rider_wait_time_mins)` computes the mean wait time.\n- `ROUND(..., 2)` keeps two decimal places.\n\n## Why this is optimal\n\nIt directly answers the question with minimal SQL."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins FROM (SELECT rider_wait_time_mins FROM trips WHERE trip_status = 'completed') x;",
        "explanation": "## Approach\n\nSelect wait times in a subquery, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins\nFROM (\n  SELECT rider_wait_time_mins\n  FROM trips\n  WHERE trip_status = 'completed'\n) x;\n```\n\n## Explanation\n\n- The inner query isolates wait time values from completed trips.\n- The outer query averages them.\n\n## Difference from the optimal approach\n\nCorrect, but the wrapper adds no real benefit."
      },
      {
        "approach_title": "CTE avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_waits AS (\n  SELECT rider_wait_time_mins\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins\nFROM completed_waits;",
        "explanation": "## Approach\n\nStore completed trip wait times in a CTE, then average them.\n\n## Query\n\n```sql\nWITH completed_waits AS (\n  SELECT rider_wait_time_mins\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ROUND(AVG(rider_wait_time_mins), 2) AS avg_wait_time_mins\nFROM completed_waits;\n```\n\n## Explanation\n\n- The CTE prepares the relevant values.\n- The final query computes the average.\n\n## Difference from the optimal approach\n\nLonger, but can be helpful when extending the query."
      }
    ]
  },
  {
    "code": "RIDE_035",
    "approaches": [
      {
        "approach_title": "Group methods",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payment_method, COUNT(*) AS payment_count FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY payment_count DESC, payment_method ASC;",
        "explanation": "## Approach\n\nFilter successful payments, group by method, then count them.\n\n## Query\n\n```sql\nSELECT payment_method, COUNT(*) AS payment_count\nFROM payments\nWHERE payment_status = 'successful'\nGROUP BY payment_method\nORDER BY payment_count DESC, payment_method ASC;\n```\n\n## Explanation\n\n- `WHERE payment_status = 'successful'` keeps only successful payments.\n- `GROUP BY payment_method` creates one row per method.\n- `COUNT(*)` returns the number of payments in each group.\n\n## Why this is optimal\n\nThis is the standard grouped count pattern."
      },
      {
        "approach_title": "CTE methods",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH method_counts AS (\n  SELECT payment_method, COUNT(*) AS payment_count\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, payment_count\nFROM method_counts\nORDER BY payment_count DESC, payment_method ASC;",
        "explanation": "## Approach\n\nCompute grouped counts in a CTE, then sort them outside.\n\n## Query\n\n```sql\nWITH method_counts AS (\n  SELECT payment_method, COUNT(*) AS payment_count\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, payment_count\nFROM method_counts\nORDER BY payment_count DESC, payment_method ASC;\n```\n\n## Explanation\n\n- The CTE calculates one row per payment method.\n- The outer query returns the final ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to build on."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT payment_method, COUNT(*) OVER (PARTITION BY payment_method) AS payment_count FROM payments WHERE payment_status = 'successful' ORDER BY payment_count DESC, payment_method ASC;",
        "explanation": "## Approach\n\nUse a window count per payment method, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT payment_method,\n       COUNT(*) OVER (PARTITION BY payment_method) AS payment_count\nFROM payments\nWHERE payment_status = 'successful'\nORDER BY payment_count DESC, payment_method ASC;\n```\n\n## Explanation\n\n- The window function repeats each method count across its rows.\n- `DISTINCT` keeps one row per payment method.\n\n## Difference from the optimal approach\n\nWorks, but is more complex than `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_036",
    "approaches": [
      {
        "approach_title": "Group promos",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT promo_id, COUNT(*) AS usage_count FROM trips WHERE promo_id IS NOT NULL GROUP BY promo_id ORDER BY usage_count DESC, promo_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep trips with a promo, group by promo id, then count usage.\n\n## Query\n\n```sql\nSELECT promo_id, COUNT(*) AS usage_count\nFROM trips\nWHERE promo_id IS NOT NULL\nGROUP BY promo_id\nORDER BY usage_count DESC, promo_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `promo_id IS NOT NULL` keeps only promo-applied trips.\n- `GROUP BY promo_id` creates one row per promo.\n- `COUNT(*)` counts how many trips used each promo.\n- `LIMIT 5` returns the top 5.\n\n## Why this is optimal\n\nThis is the cleanest top-N grouped count query."
      },
      {
        "approach_title": "CTE promos",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH promo_counts AS (\n  SELECT promo_id, COUNT(*) AS usage_count\n  FROM trips\n  WHERE promo_id IS NOT NULL\n  GROUP BY promo_id\n)\nSELECT promo_id, usage_count\nFROM promo_counts\nORDER BY usage_count DESC, promo_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute promo usage counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH promo_counts AS (\n  SELECT promo_id, COUNT(*) AS usage_count\n  FROM trips\n  WHERE promo_id IS NOT NULL\n  GROUP BY promo_id\n)\nSELECT promo_id, usage_count\nFROM promo_counts\nORDER BY usage_count DESC, promo_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE builds one row per promo id.\n- The outer query returns the top 5 rows.\n\n## Difference from the optimal approach\n\nLonger, but more modular."
      },
      {
        "approach_title": "Rank promos",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT promo_id, usage_count FROM (SELECT promo_id, COUNT(*) AS usage_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, promo_id ASC) AS rn FROM trips WHERE promo_id IS NOT NULL GROUP BY promo_id) x WHERE rn <= 5 ORDER BY usage_count DESC, promo_id ASC;",
        "explanation": "## Approach\n\nAggregate promo counts, rank them, then keep the first 5.\n\n## Query\n\n```sql\nSELECT promo_id, usage_count\nFROM (\n  SELECT promo_id,\n         COUNT(*) AS usage_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, promo_id ASC) AS rn\n  FROM trips\n  WHERE promo_id IS NOT NULL\n  GROUP BY promo_id\n) x\nWHERE rn <= 5\nORDER BY usage_count DESC, promo_id ASC;\n```\n\n## Explanation\n\n- The inner query counts trips per promo.\n- `ROW_NUMBER()` ranks promos by usage.\n- The outer query returns the top 5.\n\n## Difference from the optimal approach\n\nUseful when rank logic is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_037",
    "approaches": [
      {
        "approach_title": "Month filter",
        "approach_type": "date_time",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS joined_this_month FROM drivers WHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE);",
        "explanation": "## Approach\n\nTruncate both dates to the month and compare them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS joined_this_month\nFROM drivers\nWHERE DATE_TRUNC('month', joined_at) = DATE_TRUNC('month', CURRENT_DATE);\n```\n\n## Explanation\n\n- `DATE_TRUNC('month', joined_at)` reduces each join date to its month.\n- `DATE_TRUNC('month', CURRENT_DATE)` represents the current month.\n- Matching them keeps only drivers who joined this month.\n\n## Why this is optimal\n\nIt is easy to read and clearly expresses month-level comparison."
      },
      {
        "approach_title": "Month range",
        "approach_type": "date_time",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS joined_this_month FROM drivers WHERE joined_at >= DATE_TRUNC('month', CURRENT_DATE) AND joined_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';",
        "explanation": "## Approach\n\nUse the first day of this month and the first day of next month as bounds.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS joined_this_month\nFROM drivers\nWHERE joined_at >= DATE_TRUNC('month', CURRENT_DATE)\n  AND joined_at < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';\n```\n\n## Explanation\n\n- The lower bound starts at the first moment of the current month.\n- The upper bound stops before the next month begins.\n- This captures all drivers who joined this month.\n\n## Difference from the optimal approach\n\nSlightly longer, but often more index-friendly."
      },
      {
        "approach_title": "Extract month-year",
        "approach_type": "date_time",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) AS joined_this_month FROM drivers WHERE EXTRACT(YEAR FROM joined_at) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM joined_at) = EXTRACT(MONTH FROM CURRENT_DATE);",
        "explanation": "## Approach\n\nCompare the year and month parts separately.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS joined_this_month\nFROM drivers\nWHERE EXTRACT(YEAR FROM joined_at) = EXTRACT(YEAR FROM CURRENT_DATE)\n  AND EXTRACT(MONTH FROM joined_at) = EXTRACT(MONTH FROM CURRENT_DATE);\n```\n\n## Explanation\n\n- `EXTRACT(YEAR ...)` matches the year.\n- `EXTRACT(MONTH ...)` matches the month.\n- Together they identify rows from the current month.\n\n## Difference from the optimal approach\n\nCorrect, but more verbose."
      }
    ]
  },
  {
    "code": "RIDE_038",
    "approaches": [
      {
        "approach_title": "Count surge trips",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS surge_trips FROM trips WHERE surge_multiplier > 1;",
        "explanation": "## Approach\n\nKeep only trips where surge multiplier is above 1, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS surge_trips\nFROM trips\nWHERE surge_multiplier > 1;\n```\n\n## Explanation\n\n- A multiplier greater than `1` means surge pricing was applied.\n- `COUNT(*)` returns how many such trips exist.\n\n## Why this is optimal\n\nIt directly checks the surge condition and counts matching trips."
      },
      {
        "approach_title": "CASE sum",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(CASE WHEN surge_multiplier > 1 THEN 1 ELSE 0 END) AS surge_trips FROM trips;",
        "explanation": "## Approach\n\nConvert surge trips to 1 and non-surge trips to 0, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN surge_multiplier > 1 THEN 1 ELSE 0 END) AS surge_trips\nFROM trips;\n```\n\n## Explanation\n\n- Trips with surge contribute `1`.\n- Other trips contribute `0`.\n- Summing gives the surge trip count.\n\n## Difference from the optimal approach\n\nFlexible, but longer than a simple filter."
      },
      {
        "approach_title": "FILTER count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE surge_multiplier > 1) AS surge_trips FROM trips;",
        "explanation": "## Approach\n\nUse a filtered aggregate to count surge trips.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE surge_multiplier > 1) AS surge_trips\nFROM trips;\n```\n\n## Explanation\n\n- `FILTER` limits the count to trips with surge applied.\n- This is convenient when calculating several conditional counts together.\n\n## Difference from the optimal approach\n\nWorks well, but is less direct for a single value."
      }
    ]
  },
  {
    "code": "RIDE_039",
    "approaches": [
      {
        "approach_title": "AVG by type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY avg_distance_km DESC, ride_type ASC;",
        "explanation": "## Approach\n\nFilter completed trips, group by ride type, then average actual distance.\n\n## Query\n\n```sql\nSELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\nFROM trips\nWHERE trip_status = 'completed'\nGROUP BY ride_type\nORDER BY avg_distance_km DESC, ride_type ASC;\n```\n\n## Explanation\n\n- Only completed trips are included.\n- `GROUP BY ride_type` creates one row per type.\n- `AVG(actual_distance_km)` calculates the mean trip distance.\n- `ROUND(..., 2)` formats the output.\n\n## Why this is optimal\n\nThis is the standard grouped-average solution."
      },
      {
        "approach_title": "CTE distance",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH distance_by_type AS (\n  SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_distance_km\nFROM distance_by_type\nORDER BY avg_distance_km DESC, ride_type ASC;",
        "explanation": "## Approach\n\nCalculate average distance per ride type in a CTE.\n\n## Query\n\n```sql\nWITH distance_by_type AS (\n  SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_distance_km\nFROM distance_by_type\nORDER BY avg_distance_km DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE builds the grouped averages.\n- The outer query presents the sorted output.\n\n## Difference from the optimal approach\n\nMore verbose, but extensible."
      },
      {
        "approach_title": "Subquery average",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, avg_distance_km FROM (SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) x ORDER BY avg_distance_km DESC, ride_type ASC;",
        "explanation": "## Approach\n\nAggregate in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT ride_type, avg_distance_km\nFROM (\n  SELECT ride_type, ROUND(AVG(actual_distance_km), 2) AS avg_distance_km\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n) x\nORDER BY avg_distance_km DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The inner query computes average distance by ride type.\n- The outer query returns the final ordered result.\n\n## Difference from the optimal approach\n\nCorrect, but the extra wrapper is not needed."
      }
    ]
  },
  {
    "code": "RIDE_040",
    "approaches": [
      {
        "approach_title": "Sum rider spend",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id ORDER BY total_spend DESC, user_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter completed trips, group by rider, sum total fare, then keep the top 5.\n\n## Query\n\n```sql\nSELECT user_id, SUM(total_fare) AS total_spend\nFROM trips\nWHERE trip_status = 'completed'\nGROUP BY user_id\nORDER BY total_spend DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Only completed trips count toward rider spend.\n- `GROUP BY user_id` creates one row per rider.\n- `SUM(total_fare)` calculates total spend.\n- Sorting descending finds the biggest spenders.\n- `LIMIT 5` returns the top 5 riders.\n\n## Why this is optimal\n\nIt is the most direct top-N aggregation solution."
      },
      {
        "approach_title": "CTE spend",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_spend AS (\n  SELECT user_id, SUM(total_fare) AS total_spend\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY user_id\n)\nSELECT user_id, total_spend\nFROM rider_spend\nORDER BY total_spend DESC, user_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute spend per rider in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH rider_spend AS (\n  SELECT user_id, SUM(total_fare) AS total_spend\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY user_id\n)\nSELECT user_id, total_spend\nFROM rider_spend\nORDER BY total_spend DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE builds one row per rider with total spend.\n- The outer query returns the top 5.\n\n## Difference from the optimal approach\n\nLonger, but can help when extra logic is added."
      },
      {
        "approach_title": "Rank spenders",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, total_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend, ROW_NUMBER() OVER (ORDER BY SUM(total_fare) DESC, user_id ASC) AS rn FROM trips WHERE trip_status = 'completed' GROUP BY user_id) x WHERE rn <= 5 ORDER BY total_spend DESC, user_id ASC;",
        "explanation": "## Approach\n\nAggregate rider spend, rank riders, then keep the first 5.\n\n## Query\n\n```sql\nSELECT user_id, total_spend\nFROM (\n  SELECT user_id,\n         SUM(total_fare) AS total_spend,\n         ROW_NUMBER() OVER (ORDER BY SUM(total_fare) DESC, user_id ASC) AS rn\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY user_id\n) x\nWHERE rn <= 5\nORDER BY total_spend DESC, user_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes spend per rider.\n- `ROW_NUMBER()` ranks riders from highest spend to lowest.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful when explicit rank logic is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_041",
    "approaches": [
      {
        "approach_title": "Above avg rating",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id AS driver_id, rating_avg FROM drivers WHERE rating_avg > (SELECT AVG(rating_avg) FROM drivers) ORDER BY rating_avg DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompare each driver's stored average rating with the overall average rating.\n\n## Query\n\n```sql\nSELECT id AS driver_id, rating_avg\nFROM drivers\nWHERE rating_avg > (\n  SELECT AVG(rating_avg)\n  FROM drivers\n)\nORDER BY rating_avg DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The subquery computes the overall average `rating_avg` across all drivers.\n- The outer query keeps only drivers whose `rating_avg` is greater than that value.\n- Sorting shows the highest-rated matching drivers first.\n\n## Why this is optimal\n\nIt is direct, readable, and matches the requirement exactly."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH avg_rating AS (\n  SELECT AVG(rating_avg) AS overall_avg\n  FROM drivers\n)\nSELECT d.id AS driver_id, d.rating_avg\nFROM drivers d\nCROSS JOIN avg_rating a\nWHERE d.rating_avg > a.overall_avg\nORDER BY d.rating_avg DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute the overall average in a CTE, then compare each driver against it.\n\n## Query\n\n```sql\nWITH avg_rating AS (\n  SELECT AVG(rating_avg) AS overall_avg\n  FROM drivers\n)\nSELECT d.id AS driver_id, d.rating_avg\nFROM drivers d\nCROSS JOIN avg_rating a\nWHERE d.rating_avg > a.overall_avg\nORDER BY d.rating_avg DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE returns one row with the overall average rating.\n- `CROSS JOIN` makes that value available to every driver row.\n- The `WHERE` clause keeps only above-average drivers.\n\n## Difference from the optimal approach\n\nMore expandable, but longer than necessary."
      },
      {
        "approach_title": "Window average",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, rating_avg FROM (SELECT id AS driver_id, rating_avg, AVG(rating_avg) OVER () AS overall_avg FROM drivers) x WHERE rating_avg > overall_avg ORDER BY rating_avg DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAttach the overall average to every row using a window function, then filter.\n\n## Query\n\n```sql\nSELECT driver_id, rating_avg\nFROM (\n  SELECT id AS driver_id,\n         rating_avg,\n         AVG(rating_avg) OVER () AS overall_avg\n  FROM drivers\n) x\nWHERE rating_avg > overall_avg\nORDER BY rating_avg DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `AVG(rating_avg) OVER ()` computes the overall average once and repeats it on each row.\n- The outer query keeps rows where the driver's rating is above that repeated value.\n\n## Difference from the optimal approach\n\nUseful for learning window functions, but more complex than needed."
      }
    ]
  },
  {
    "code": "RIDE_042",
    "approaches": [
      {
        "approach_title": "HAVING count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS trip_count FROM trips GROUP BY user_id HAVING COUNT(*) > 5 ORDER BY trip_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nGroup trips by rider, count them, then keep riders with more than 5 trips.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS trip_count\nFROM trips\nGROUP BY user_id\nHAVING COUNT(*) > 5\nORDER BY trip_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per rider.\n- `COUNT(*)` calculates how many trips each rider requested.\n- `HAVING COUNT(*) > 5` keeps only riders above the threshold.\n\n## Why this is optimal\n\nThis is the standard pattern for filtering grouped results."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_trips AS (\n  SELECT user_id, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id, trip_count\nFROM rider_trips\nWHERE trip_count > 5\nORDER BY trip_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nCount trips per rider in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH rider_trips AS (\n  SELECT user_id, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id, trip_count\nFROM rider_trips\nWHERE trip_count > 5\nORDER BY trip_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one aggregated row per rider.\n- The outer query filters riders with more than 5 trips.\n\n## Difference from the optimal approach\n\nLonger, but nice when more post-aggregation logic is needed."
      },
      {
        "approach_title": "Window dedupe",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT user_id, trip_count FROM (SELECT user_id, COUNT(*) OVER (PARTITION BY user_id) AS trip_count FROM trips) x WHERE trip_count > 5 ORDER BY trip_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nUse a window count per rider, then keep distinct rider rows.\n\n## Query\n\n```sql\nSELECT DISTINCT user_id, trip_count\nFROM (\n  SELECT user_id,\n         COUNT(*) OVER (PARTITION BY user_id) AS trip_count\n  FROM trips\n) x\nWHERE trip_count > 5\nORDER BY trip_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The window function repeats each rider's trip count on every trip row.\n- `DISTINCT` collapses repeated rows to one per rider.\n- The filter keeps only riders above 5 trips.\n\n## Difference from the optimal approach\n\nCorrect, but more complicated than `GROUP BY` plus `HAVING`."
      }
    ]
  },
  {
    "code": "RIDE_043",
    "approaches": [
      {
        "approach_title": "Join and AVG",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' GROUP BY u.city ORDER BY avg_fare DESC, u.city ASC;",
        "explanation": "## Approach\n\nJoin trips to users, filter completed trips, then average fare by rider city.\n\n## Query\n\n```sql\nSELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare\nFROM trips t\nJOIN users u ON u.id = t.user_id\nWHERE t.trip_status = 'completed'\nGROUP BY u.city\nORDER BY avg_fare DESC, u.city ASC;\n```\n\n## Explanation\n\n- `trips` contains fares, while `users` contains rider city.\n- The join connects each trip to the rider who requested it.\n- Only completed trips are included in the average.\n- Grouping by city gives one average per city.\n\n## Why this is optimal\n\nIt directly uses the two needed tables and the correct grouping."
      },
      {
        "approach_title": "CTE city fare",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_fares AS (\n  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY u.city\n)\nSELECT city, avg_fare\nFROM city_fares\nORDER BY avg_fare DESC, city ASC;",
        "explanation": "## Approach\n\nCompute the grouped city averages in a CTE, then sort.\n\n## Query\n\n```sql\nWITH city_fares AS (\n  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY u.city\n)\nSELECT city, avg_fare\nFROM city_fares\nORDER BY avg_fare DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per city with its average fare.\n- The outer query handles only the final presentation.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery group",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, avg_fare FROM (SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' GROUP BY u.city) x ORDER BY avg_fare DESC, city ASC;",
        "explanation": "## Approach\n\nAggregate inside a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT city, avg_fare\nFROM (\n  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_fare\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY u.city\n) x\nORDER BY avg_fare DESC, city ASC;\n```\n\n## Explanation\n\n- The inner query computes one row per city.\n- The outer query returns the same rows in sorted order.\n\n## Difference from the optimal approach\n\nIt works, but the extra wrapper is not needed."
      }
    ]
  },
  {
    "code": "RIDE_044",
    "approaches": [
      {
        "approach_title": "Left join none",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.id AS driver_id FROM drivers d LEFT JOIN trips t ON t.driver_id = d.id WHERE t.id IS NULL ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nLeft join drivers to trips, then keep only drivers with no matching trip row.\n\n## Query\n\n```sql\nSELECT d.id AS driver_id\nFROM drivers d\nLEFT JOIN trips t ON t.driver_id = d.id\nWHERE t.id IS NULL\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- A `LEFT JOIN` keeps all drivers, even if they have no trips.\n- For drivers with no assigned trips, trip columns become `NULL`.\n- `WHERE t.id IS NULL` isolates those drivers.\n\n## Why this is optimal\n\nThis is the classic and very readable anti-join pattern."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT d.id AS driver_id FROM drivers d WHERE NOT EXISTS (SELECT 1 FROM trips t WHERE t.driver_id = d.id) ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nReturn drivers for whom no trip row exists.\n\n## Query\n\n```sql\nSELECT d.id AS driver_id\nFROM drivers d\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM trips t\n  WHERE t.driver_id = d.id\n)\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The correlated subquery checks whether at least one trip exists for the driver.\n- `NOT EXISTS` keeps only drivers with zero matching trips.\n\n## Difference from the optimal approach\n\nEqually valid, but slightly less beginner-friendly than the `LEFT JOIN` pattern."
      },
      {
        "approach_title": "NOT IN ids",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id AS driver_id FROM drivers WHERE id NOT IN (SELECT driver_id FROM trips WHERE driver_id IS NOT NULL) ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nExclude every driver id that appears in the trips table.\n\n## Query\n\n```sql\nSELECT id AS driver_id\nFROM drivers\nWHERE id NOT IN (\n  SELECT driver_id\n  FROM trips\n  WHERE driver_id IS NOT NULL\n)\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The subquery collects all assigned driver ids from trips.\n- The outer query returns drivers not present in that set.\n- `driver_id IS NOT NULL` prevents NULL-related issues.\n\n## Difference from the optimal approach\n\nIt works, but anti-joins with `LEFT JOIN` or `NOT EXISTS` are usually clearer."
      }
    ]
  },
  {
    "code": "RIDE_045",
    "approaches": [
      {
        "approach_title": "Top city",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.city, COUNT(*) AS trip_count FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city ORDER BY trip_count DESC, u.city ASC LIMIT 1;",
        "explanation": "## Approach\n\nJoin trips to users, count trips per rider city, then keep the highest one.\n\n## Query\n\n```sql\nSELECT u.city, COUNT(*) AS trip_count\nFROM trips t\nJOIN users u ON u.id = t.user_id\nGROUP BY u.city\nORDER BY trip_count DESC, u.city ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- `users` provides city and `trips` provides trip rows.\n- Grouping by city gives trip volume per city.\n- Sorting descending by trip count puts the busiest city first.\n- `LIMIT 1` returns only the top city.\n\n## Why this is optimal\n\nIt is the most direct grouped top-1 query."
      },
      {
        "approach_title": "CTE top city",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_counts AS (\n  SELECT u.city, COUNT(*) AS trip_count\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  GROUP BY u.city\n)\nSELECT city, trip_count\nFROM city_counts\nORDER BY trip_count DESC, city ASC\nLIMIT 1;",
        "explanation": "## Approach\n\nCompute city trip counts in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH city_counts AS (\n  SELECT u.city, COUNT(*) AS trip_count\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  GROUP BY u.city\n)\nSELECT city, trip_count\nFROM city_counts\nORDER BY trip_count DESC, city ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- The CTE creates one row per city.\n- The outer query returns the city with the highest count.\n\n## Difference from the optimal approach\n\nMore modular, but unnecessarily long here."
      },
      {
        "approach_title": "Rank cities",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, trip_count FROM (SELECT u.city, COUNT(*) AS trip_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, u.city ASC) AS rn FROM trips t JOIN users u ON u.id = t.user_id GROUP BY u.city) x WHERE rn = 1 ORDER BY city ASC;",
        "explanation": "## Approach\n\nAggregate city counts, assign ranks, then keep the first one.\n\n## Query\n\n```sql\nSELECT city, trip_count\nFROM (\n  SELECT u.city,\n         COUNT(*) AS trip_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, u.city ASC) AS rn\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  GROUP BY u.city\n) x\nWHERE rn = 1\nORDER BY city ASC;\n```\n\n## Explanation\n\n- The grouped query computes city trip counts.\n- `ROW_NUMBER()` ranks cities from highest volume to lowest.\n- The outer query keeps rank 1.\n\n## Difference from the optimal approach\n\nUseful for ranking practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_046",
    "approaches": [
      {
        "approach_title": "HAVING vehicles",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS vehicle_count FROM vehicles GROUP BY driver_id HAVING COUNT(*) > 1 ORDER BY vehicle_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nGroup vehicles by driver, count them, then keep drivers with more than one vehicle.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS vehicle_count\nFROM vehicles\nGROUP BY driver_id\nHAVING COUNT(*) > 1\nORDER BY vehicle_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` gives the number of vehicles owned or registered under that driver.\n- `HAVING COUNT(*) > 1` keeps only drivers with multiple vehicles.\n\n## Why this is optimal\n\nThis is the standard grouped filter pattern."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_vehicles AS (\n  SELECT driver_id, COUNT(*) AS vehicle_count\n  FROM vehicles\n  GROUP BY driver_id\n)\nSELECT driver_id, vehicle_count\nFROM driver_vehicles\nWHERE vehicle_count > 1\nORDER BY vehicle_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCount vehicles per driver in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH driver_vehicles AS (\n  SELECT driver_id, COUNT(*) AS vehicle_count\n  FROM vehicles\n  GROUP BY driver_id\n)\nSELECT driver_id, vehicle_count\nFROM driver_vehicles\nWHERE vehicle_count > 1\nORDER BY vehicle_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per driver.\n- The outer query keeps only rows where the count is greater than 1.\n\n## Difference from the optimal approach\n\nLonger, but can help when adding more post-aggregation logic."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT driver_id, vehicle_count FROM (SELECT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS vehicle_count FROM vehicles) x WHERE vehicle_count > 1 ORDER BY vehicle_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nUse a window count per driver, then keep distinct drivers above the threshold.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_id, vehicle_count\nFROM (\n  SELECT driver_id,\n         COUNT(*) OVER (PARTITION BY driver_id) AS vehicle_count\n  FROM vehicles\n) x\nWHERE vehicle_count > 1\nORDER BY vehicle_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The window function repeats the vehicle count on every vehicle row for that driver.\n- `DISTINCT` leaves one row per driver.\n- The filter keeps only counts above 1.\n\n## Difference from the optimal approach\n\nCorrect, but more complicated than `GROUP BY` and `HAVING`."
      }
    ]
  },
  {
    "code": "RIDE_047",
    "approaches": [
      {
        "approach_title": "AVG of counts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x;",
        "explanation": "## Approach\n\nFirst count completed trips per driver, then average those counts.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips\nFROM (\n  SELECT driver_id, COUNT(*) AS completed_count\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n) x;\n```\n\n## Explanation\n\n- The inner query creates one row per driver with their completed trip count.\n- The outer query averages those per-driver counts.\n- `ROUND(..., 2)` formats the final result.\n\n## Why this is optimal\n\nThis problem needs two aggregation levels, and this is the clearest way to express them."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_completed AS (\n  SELECT driver_id, COUNT(*) AS completed_count\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips\nFROM driver_completed;",
        "explanation": "## Approach\n\nStore completed trip counts per driver in a CTE, then average them.\n\n## Query\n\n```sql\nWITH driver_completed AS (\n  SELECT driver_id, COUNT(*) AS completed_count\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips\nFROM driver_completed;\n```\n\n## Explanation\n\n- The CTE computes one row per driver.\n- The final query averages those counts.\n\n## Difference from the optimal approach\n\nVery readable, but slightly longer."
      },
      {
        "approach_title": "Nested derived",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips FROM (SELECT driver_id, COUNT(*) AS completed_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) driver_counts;",
        "explanation": "## Approach\n\nUse a derived table to hold per-driver counts, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(completed_count), 2) AS avg_completed_trips\nFROM (\n  SELECT driver_id, COUNT(*) AS completed_count\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n) driver_counts;\n```\n\n## Explanation\n\n- The derived table contains each driver's completed trip count.\n- The outer query computes the average of those values.\n\n## Difference from the optimal approach\n\nFunctionally the same, just a slightly different structure."
      }
    ]
  },
  {
    "code": "RIDE_048",
    "approaches": [
      {
        "approach_title": "Distinct failed riders",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT t.user_id FROM payments p JOIN trips t ON t.id = p.trip_id WHERE p.payment_status = 'failed' ORDER BY user_id ASC;",
        "explanation": "## Approach\n\nJoin failed payments to trips, then return distinct rider ids.\n\n## Query\n\n```sql\nSELECT DISTINCT t.user_id\nFROM payments p\nJOIN trips t ON t.id = p.trip_id\nWHERE p.payment_status = 'failed'\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `payments` tells us which trips had failed payment attempts.\n- `trips` gives the rider who requested each trip.\n- `DISTINCT` ensures each rider appears only once.\n\n## Why this is optimal\n\nIt directly connects failed payments to the riders who experienced them."
      },
      {
        "approach_title": "CTE failed",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH failed_riders AS (\n  SELECT DISTINCT t.user_id\n  FROM payments p\n  JOIN trips t ON t.id = p.trip_id\n  WHERE p.payment_status = 'failed'\n)\nSELECT user_id\nFROM failed_riders\nORDER BY user_id ASC;",
        "explanation": "## Approach\n\nCollect riders with failed payments in a CTE, then sort.\n\n## Query\n\n```sql\nWITH failed_riders AS (\n  SELECT DISTINCT t.user_id\n  FROM payments p\n  JOIN trips t ON t.id = p.trip_id\n  WHERE p.payment_status = 'failed'\n)\nSELECT user_id\nFROM failed_riders\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates riders tied to failed payments.\n- The outer query simply returns the final ordered list.\n\n## Difference from the optimal approach\n\nClear, but adds an unnecessary layer."
      },
      {
        "approach_title": "IN subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT user_id FROM trips WHERE id IN (SELECT trip_id FROM payments WHERE payment_status = 'failed') ORDER BY user_id ASC;",
        "explanation": "## Approach\n\nFind failed-payment trip ids first, then return the riders from those trips.\n\n## Query\n\n```sql\nSELECT DISTINCT user_id\nFROM trips\nWHERE id IN (\n  SELECT trip_id\n  FROM payments\n  WHERE payment_status = 'failed'\n)\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The subquery returns trip ids with failed payments.\n- The outer query maps those trips to users.\n- `DISTINCT` avoids duplicate rider ids.\n\n## Difference from the optimal approach\n\nWorks well, but the join version is a bit more direct."
      }
    ]
  },
  {
    "code": "RIDE_049",
    "approaches": [
      {
        "approach_title": "AVG delay",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY avg_delay_mins DESC, driver_id ASC;",
        "explanation": "## Approach\n\nFilter completed assigned trips, group by driver, then average arrival delay.\n\n## Query\n\n```sql\nSELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nGROUP BY driver_id\nORDER BY avg_delay_mins DESC, driver_id ASC;\n```\n\n## Explanation\n\n- Only completed trips with a driver assigned are relevant.\n- `GROUP BY driver_id` creates one row per driver.\n- `AVG(driver_arrival_delay_mins)` calculates the mean delay.\n- The result is sorted from highest delay to lowest.\n\n## Why this is optimal\n\nIt directly matches the grouping and metric requested."
      },
      {
        "approach_title": "CTE delay",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_delays AS (\n  SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, avg_delay_mins\nFROM driver_delays\nORDER BY avg_delay_mins DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute average delay per driver in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH driver_delays AS (\n  SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, avg_delay_mins\nFROM driver_delays\nORDER BY avg_delay_mins DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per driver.\n- The outer query only presents the ordered result.\n\n## Difference from the optimal approach\n\nMore verbose, but extendable."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, avg_delay_mins FROM (SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x ORDER BY avg_delay_mins DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate average delay in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT driver_id, avg_delay_mins\nFROM (\n  SELECT driver_id, ROUND(AVG(driver_arrival_delay_mins), 2) AS avg_delay_mins\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n) x\nORDER BY avg_delay_mins DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The inner query computes average delay for each driver.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nCorrect, but the wrapper is not necessary."
      }
    ]
  },
  {
    "code": "RIDE_050",
    "approaches": [
      {
        "approach_title": "FILTER percent",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE promo_id IS NOT NULL) / COUNT(*), 2) AS promo_usage_percentage FROM trips;",
        "explanation": "## Approach\n\nCount promo trips and divide by total trips, then convert to a percentage.\n\n## Query\n\n```sql\nSELECT ROUND(\n  100.0 * COUNT(*) FILTER (WHERE promo_id IS NOT NULL) / COUNT(*),\n  2\n) AS promo_usage_percentage\nFROM trips;\n```\n\n## Explanation\n\n- `COUNT(*)` gives the total number of trips.\n- `COUNT(*) FILTER (WHERE promo_id IS NOT NULL)` gives the number of trips that used a promo.\n- Multiplying by `100.0` converts the ratio into a percentage.\n- `ROUND(..., 2)` keeps two decimal places.\n\n## Why this is optimal\n\nIt is compact and clearly shows both the numerator and denominator in one query."
      },
      {
        "approach_title": "CASE percent",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(100.0 * SUM(CASE WHEN promo_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*), 2) AS promo_usage_percentage FROM trips;",
        "explanation": "## Approach\n\nSum promo-used trips with `CASE`, then divide by all trips.\n\n## Query\n\n```sql\nSELECT ROUND(\n  100.0 * SUM(CASE WHEN promo_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*),\n  2\n) AS promo_usage_percentage\nFROM trips;\n```\n\n## Explanation\n\n- The `CASE` expression turns promo trips into `1` and others into `0`.\n- Summing those values gives the promo-trip count.\n- Dividing by `COUNT(*)` gives the ratio.\n\n## Difference from the optimal approach\n\nAlso correct, but slightly more verbose than `FILTER`."
      },
      {
        "approach_title": "CTE ratio",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH trip_counts AS (\n  SELECT COUNT(*) AS total_trips, COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trips\n  FROM trips\n)\nSELECT ROUND(100.0 * promo_trips / total_trips, 2) AS promo_usage_percentage\nFROM trip_counts;",
        "explanation": "## Approach\n\nCompute total trips and promo trips in a CTE, then calculate the percentage.\n\n## Query\n\n```sql\nWITH trip_counts AS (\n  SELECT COUNT(*) AS total_trips,\n         COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trips\n  FROM trips\n)\nSELECT ROUND(100.0 * promo_trips / total_trips, 2) AS promo_usage_percentage\nFROM trip_counts;\n```\n\n## Explanation\n\n- The CTE stores both counts in one row.\n- The outer query uses those counts to calculate the percentage.\n\n## Difference from the optimal approach\n\nVery readable, but longer than needed."
      }
    ]
  },
  {
    "code": "RIDE_051",
    "approaches": [
      {
        "approach_title": "Top cancelled",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY cancelled_trips DESC, driver_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter cancelled trips with assigned drivers, group by driver, then keep the top 5.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS cancelled_trips\nFROM trips\nWHERE trip_status = 'cancelled'\n  AND driver_id IS NOT NULL\nGROUP BY driver_id\nORDER BY cancelled_trips DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `trip_status = 'cancelled'` keeps only cancelled trips.\n- `driver_id IS NOT NULL` excludes unassigned trips.\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` counts cancelled trips for each driver.\n- `LIMIT 5` returns the top 5 drivers.\n\n## Why this is optimal\n\nThis is the standard top-N grouped count pattern."
      },
      {
        "approach_title": "CTE top 5",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_cancellations AS (\n  SELECT driver_id, COUNT(*) AS cancelled_trips\n  FROM trips\n  WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, cancelled_trips\nFROM driver_cancellations\nORDER BY cancelled_trips DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute cancellation counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH driver_cancellations AS (\n  SELECT driver_id, COUNT(*) AS cancelled_trips\n  FROM trips\n  WHERE trip_status = 'cancelled'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, cancelled_trips\nFROM driver_cancellations\nORDER BY cancelled_trips DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE builds one row per driver.\n- The outer query handles ranking and output.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank drivers",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, cancelled_trips FROM (SELECT driver_id, COUNT(*) AS cancelled_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn FROM trips WHERE trip_status = 'cancelled' AND driver_id IS NOT NULL GROUP BY driver_id) x WHERE rn <= 5 ORDER BY cancelled_trips DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate by driver, rank the results, then keep the first 5.\n\n## Query\n\n```sql\nSELECT driver_id, cancelled_trips\nFROM (\n  SELECT driver_id,\n         COUNT(*) AS cancelled_trips,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn\n  FROM trips\n  WHERE trip_status = 'cancelled'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n) x\nWHERE rn <= 5\nORDER BY cancelled_trips DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes each driver's cancelled trip count.\n- `ROW_NUMBER()` ranks them from highest to lowest.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful when explicit ranking is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_052",
    "approaches": [
      {
        "approach_title": "HAVING no completed",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.user_id FROM trips t GROUP BY t.user_id HAVING COUNT(*) > 0 AND COUNT(*) FILTER (WHERE t.trip_status = 'completed') = 0 ORDER BY t.user_id ASC;",
        "explanation": "## Approach\n\nGroup trips by rider and keep only riders with zero completed trips.\n\n## Query\n\n```sql\nSELECT t.user_id\nFROM trips t\nGROUP BY t.user_id\nHAVING COUNT(*) > 0\n   AND COUNT(*) FILTER (WHERE t.trip_status = 'completed') = 0\nORDER BY t.user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY t.user_id` creates one row per rider who requested trips.\n- `COUNT(*) > 0` confirms the rider has requested at least one trip.\n- The filtered count checks how many of those trips were completed.\n- Keeping only rows where that filtered count is `0` gives riders with no completed trips.\n\n## Why this is optimal\n\nIt solves the problem in one grouped query and clearly expresses the condition."
      },
      {
        "approach_title": "CTE counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_trip_stats AS (\n  SELECT user_id, COUNT(*) AS total_trips, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id\nFROM rider_trip_stats\nWHERE total_trips > 0 AND completed_trips = 0\nORDER BY user_id ASC;",
        "explanation": "## Approach\n\nCompute total and completed trips per rider in a CTE, then filter.\n\n## Query\n\n```sql\nWITH rider_trip_stats AS (\n  SELECT user_id,\n         COUNT(*) AS total_trips,\n         COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id\nFROM rider_trip_stats\nWHERE total_trips > 0\n  AND completed_trips = 0\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The CTE produces one row per rider.\n- It stores both total trips and completed trips.\n- The outer query keeps riders who have trips but zero completions.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to expand."
      },
      {
        "approach_title": "Except completed",
        "approach_type": "set_operation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT user_id FROM trips EXCEPT SELECT DISTINCT user_id FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC;",
        "explanation": "## Approach\n\nTake all riders who requested trips, then remove riders who completed at least one trip.\n\n## Query\n\n```sql\nSELECT DISTINCT user_id\nFROM trips\nEXCEPT\nSELECT DISTINCT user_id\nFROM trips\nWHERE trip_status = 'completed'\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The first query returns all riders who requested trips.\n- The second query returns riders with at least one completed trip.\n- `EXCEPT` removes completed-trip riders from the first set.\n\n## Difference from the optimal approach\n\nElegant, but less explicit about the grouped logic."
      }
    ]
  },
  {
    "code": "RIDE_053",
    "approaches": [
      {
        "approach_title": "AVG by channel",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY booking_channel ORDER BY avg_fare DESC, booking_channel ASC;",
        "explanation": "## Approach\n\nFilter completed trips, group by booking channel, then average fare.\n\n## Query\n\n```sql\nSELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed'\nGROUP BY booking_channel\nORDER BY avg_fare DESC, booking_channel ASC;\n```\n\n## Explanation\n\n- Only completed trips are included.\n- `GROUP BY booking_channel` creates one row per channel.\n- `AVG(total_fare)` calculates the mean fare for each channel.\n- `ROUND(..., 2)` formats the result.\n\n## Why this is optimal\n\nIt directly matches the requested grouping and metric."
      },
      {
        "approach_title": "CTE channel avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH channel_fares AS (\n  SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY booking_channel\n)\nSELECT booking_channel, avg_fare\nFROM channel_fares\nORDER BY avg_fare DESC, booking_channel ASC;",
        "explanation": "## Approach\n\nCompute average fare per channel in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH channel_fares AS (\n  SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY booking_channel\n)\nSELECT booking_channel, avg_fare\nFROM channel_fares\nORDER BY avg_fare DESC, booking_channel ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per booking channel.\n- The outer query returns the final ordered output.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT booking_channel, avg_fare FROM (SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY booking_channel) x ORDER BY avg_fare DESC, booking_channel ASC;",
        "explanation": "## Approach\n\nAggregate inside a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT booking_channel, avg_fare\nFROM (\n  SELECT booking_channel, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY booking_channel\n) x\nORDER BY avg_fare DESC, booking_channel ASC;\n```\n\n## Explanation\n\n- The inner query computes average fare per booking channel.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper is not necessary."
      }
    ]
  },
  {
    "code": "RIDE_054",
    "approaches": [
      {
        "approach_title": "Distinct expired",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT driver_id FROM driver_documents WHERE verification_status = 'expired' ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nFilter expired documents, then return unique driver ids.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_id\nFROM driver_documents\nWHERE verification_status = 'expired'\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- `verification_status = 'expired'` keeps only expired documents.\n- A driver may have multiple expired documents, so `DISTINCT` removes duplicates.\n- The result is the list of affected drivers.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to answer the question."
      },
      {
        "approach_title": "Group drivers",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT driver_id FROM driver_documents WHERE verification_status = 'expired' GROUP BY driver_id ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nFilter expired documents, then group by driver.\n\n## Query\n\n```sql\nSELECT driver_id\nFROM driver_documents\nWHERE verification_status = 'expired'\nGROUP BY driver_id\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- Filtering keeps only expired rows.\n- `GROUP BY driver_id` collapses multiple rows for the same driver into one row.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is more direct for deduplication."
      },
      {
        "approach_title": "CTE distinct",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH expired_drivers AS (\n  SELECT DISTINCT driver_id\n  FROM driver_documents\n  WHERE verification_status = 'expired'\n)\nSELECT driver_id\nFROM expired_drivers\nORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nCollect unique driver ids in a CTE, then return them.\n\n## Query\n\n```sql\nWITH expired_drivers AS (\n  SELECT DISTINCT driver_id\n  FROM driver_documents\n  WHERE verification_status = 'expired'\n)\nSELECT driver_id\nFROM expired_drivers\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates drivers with at least one expired document.\n- The outer query simply presents the result.\n\n## Difference from the optimal approach\n\nMore verbose, but expandable."
      }
    ]
  },
  {
    "code": "RIDE_055",
    "approaches": [
      {
        "approach_title": "Top pickups",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT pickup_location_id, COUNT(*) AS trip_count FROM trips GROUP BY pickup_location_id ORDER BY trip_count DESC, pickup_location_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup trips by pickup location and count them, then keep the top 5.\n\n## Query\n\n```sql\nSELECT pickup_location_id, COUNT(*) AS trip_count\nFROM trips\nGROUP BY pickup_location_id\nORDER BY trip_count DESC, pickup_location_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY pickup_location_id` creates one row per pickup location.\n- `COUNT(*)` gives the number of trips from each location.\n- Sorting descending finds the busiest pickup locations.\n- `LIMIT 5` returns the top 5.\n\n## Why this is optimal\n\nThis is the standard top-N grouped count solution."
      },
      {
        "approach_title": "CTE pickups",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH pickup_counts AS (\n  SELECT pickup_location_id, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY pickup_location_id\n)\nSELECT pickup_location_id, trip_count\nFROM pickup_counts\nORDER BY trip_count DESC, pickup_location_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute pickup counts in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH pickup_counts AS (\n  SELECT pickup_location_id, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY pickup_location_id\n)\nSELECT pickup_location_id, trip_count\nFROM pickup_counts\nORDER BY trip_count DESC, pickup_location_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE builds one row per pickup location.\n- The outer query returns the highest counts.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank pickups",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT pickup_location_id, trip_count FROM (SELECT pickup_location_id, COUNT(*) AS trip_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, pickup_location_id ASC) AS rn FROM trips GROUP BY pickup_location_id) x WHERE rn <= 5 ORDER BY trip_count DESC, pickup_location_id ASC;",
        "explanation": "## Approach\n\nAggregate pickup counts, rank them, then keep the first 5.\n\n## Query\n\n```sql\nSELECT pickup_location_id, trip_count\nFROM (\n  SELECT pickup_location_id,\n         COUNT(*) AS trip_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, pickup_location_id ASC) AS rn\n  FROM trips\n  GROUP BY pickup_location_id\n) x\nWHERE rn <= 5\nORDER BY trip_count DESC, pickup_location_id ASC;\n```\n\n## Explanation\n\n- The inner query counts trips per pickup location.\n- `ROW_NUMBER()` ranks the grouped rows.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful for ranking practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_056",
    "approaches": [
      {
        "approach_title": "Avg rider counts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider FROM (SELECT u.city, t.user_id, COUNT(*) AS trip_count FROM users u JOIN trips t ON t.user_id = u.id GROUP BY u.city, t.user_id) x GROUP BY city ORDER BY avg_trips_per_rider DESC, city ASC;",
        "explanation": "## Approach\n\nFirst count trips per rider within each city, then average those rider-level counts by city.\n\n## Query\n\n```sql\nSELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider\nFROM (\n  SELECT u.city, t.user_id, COUNT(*) AS trip_count\n  FROM users u\n  JOIN trips t ON t.user_id = u.id\n  GROUP BY u.city, t.user_id\n) x\nGROUP BY city\nORDER BY avg_trips_per_rider DESC, city ASC;\n```\n\n## Explanation\n\n- The inner query creates one row per rider within a city.\n- `COUNT(*)` gives that rider's trip count.\n- The outer query averages those rider-level counts for each city.\n- This matches the wording: average trips per rider, by city.\n\n## Why this is optimal\n\nThe question needs two aggregation levels, and this is the clearest way to express them."
      },
      {
        "approach_title": "CTE two-step",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_city_trips AS (\n  SELECT u.city, t.user_id, COUNT(*) AS trip_count\n  FROM users u\n  JOIN trips t ON t.user_id = u.id\n  GROUP BY u.city, t.user_id\n)\nSELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider\nFROM rider_city_trips\nGROUP BY city\nORDER BY avg_trips_per_rider DESC, city ASC;",
        "explanation": "## Approach\n\nStore rider-level trip counts in a CTE, then average them by city.\n\n## Query\n\n```sql\nWITH rider_city_trips AS (\n  SELECT u.city, t.user_id, COUNT(*) AS trip_count\n  FROM users u\n  JOIN trips t ON t.user_id = u.id\n  GROUP BY u.city, t.user_id\n)\nSELECT city, ROUND(AVG(trip_count), 2) AS avg_trips_per_rider\nFROM rider_city_trips\nGROUP BY city\nORDER BY avg_trips_per_rider DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE computes trip counts per rider within each city.\n- The final query averages those counts city by city.\n\n## Difference from the optimal approach\n\nVery readable, but slightly longer."
      },
      {
        "approach_title": "Join grouped view",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT rc.city, ROUND(AVG(rc.trip_count), 2) AS avg_trips_per_rider FROM (SELECT u.city, t.user_id, COUNT(*) AS trip_count FROM users u JOIN trips t ON t.user_id = u.id GROUP BY u.city, t.user_id) rc GROUP BY rc.city ORDER BY avg_trips_per_rider DESC, rc.city ASC;",
        "explanation": "## Approach\n\nUse a derived table for rider-level grouped counts, then average them.\n\n## Query\n\n```sql\nSELECT rc.city, ROUND(AVG(rc.trip_count), 2) AS avg_trips_per_rider\nFROM (\n  SELECT u.city, t.user_id, COUNT(*) AS trip_count\n  FROM users u\n  JOIN trips t ON t.user_id = u.id\n  GROUP BY u.city, t.user_id\n) rc\nGROUP BY rc.city\nORDER BY avg_trips_per_rider DESC, rc.city ASC;\n```\n\n## Explanation\n\n- The derived table computes rider-level trip counts.\n- The outer query averages those values by city.\n\n## Difference from the optimal approach\n\nFunctionally the same, just a stylistic variation."
      }
    ]
  },
  {
    "code": "RIDE_057",
    "approaches": [
      {
        "approach_title": "Low ratings",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id AS driver_id, rating_avg FROM drivers WHERE rating_avg < 3.50 ORDER BY rating_avg ASC, driver_id ASC;",
        "explanation": "## Approach\n\nFilter drivers below the threshold and sort from lowest rating upward.\n\n## Query\n\n```sql\nSELECT id AS driver_id, rating_avg\nFROM drivers\nWHERE rating_avg < 3.50\nORDER BY rating_avg ASC, driver_id ASC;\n```\n\n## Explanation\n\n- `rating_avg < 3.50` keeps only low-rated drivers.\n- Sorting ascending shows the lowest ratings first.\n- `driver_id ASC` breaks ties consistently.\n\n## Why this is optimal\n\nIt directly applies the threshold and desired ordering."
      },
      {
        "approach_title": "CTE filter",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH low_rated AS (\n  SELECT id AS driver_id, rating_avg\n  FROM drivers\n  WHERE rating_avg < 3.50\n)\nSELECT driver_id, rating_avg\nFROM low_rated\nORDER BY rating_avg ASC, driver_id ASC;",
        "explanation": "## Approach\n\nFilter low-rated drivers in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH low_rated AS (\n  SELECT id AS driver_id, rating_avg\n  FROM drivers\n  WHERE rating_avg < 3.50\n)\nSELECT driver_id, rating_avg\nFROM low_rated\nORDER BY rating_avg ASC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates matching drivers.\n- The outer query applies the ordering.\n\n## Difference from the optimal approach\n\nMore verbose, but useful if more logic is added later."
      },
      {
        "approach_title": "CASE flag",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, rating_avg FROM (SELECT id AS driver_id, rating_avg, CASE WHEN rating_avg < 3.50 THEN 1 ELSE 0 END AS is_low FROM drivers) x WHERE is_low = 1 ORDER BY rating_avg ASC, driver_id ASC;",
        "explanation": "## Approach\n\nCreate a low-rating flag, then filter flagged rows.\n\n## Query\n\n```sql\nSELECT driver_id, rating_avg\nFROM (\n  SELECT id AS driver_id,\n         rating_avg,\n         CASE WHEN rating_avg < 3.50 THEN 1 ELSE 0 END AS is_low\n  FROM drivers\n) x\nWHERE is_low = 1\nORDER BY rating_avg ASC, driver_id ASC;\n```\n\n## Explanation\n\n- The inner query marks low-rated drivers with `1`.\n- The outer query keeps only flagged rows.\n\n## Difference from the optimal approach\n\nCorrect, but more complicated than needed."
      }
    ]
  },
  {
    "code": "RIDE_058",
    "approaches": [
      {
        "approach_title": "AVG resolved",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins FROM support_tickets WHERE ticket_status IN ('resolved', 'closed') AND resolution_time_mins IS NOT NULL GROUP BY ticket_type ORDER BY avg_resolution_mins DESC, ticket_type ASC;",
        "explanation": "## Approach\n\nKeep resolved or closed tickets with a known resolution time, then average by ticket type.\n\n## Query\n\n```sql\nSELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins\nFROM support_tickets\nWHERE ticket_status IN ('resolved', 'closed')\n  AND resolution_time_mins IS NOT NULL\nGROUP BY ticket_type\nORDER BY avg_resolution_mins DESC, ticket_type ASC;\n```\n\n## Explanation\n\n- Only resolved or closed tickets are relevant.\n- `resolution_time_mins IS NOT NULL` removes missing values from the calculation.\n- `GROUP BY ticket_type` creates one row per ticket type.\n- `AVG(resolution_time_mins)` computes the mean resolution time.\n\n## Why this is optimal\n\nIt directly applies the right filters and grouping."
      },
      {
        "approach_title": "CTE resolved",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH resolved_tickets AS (\n  SELECT ticket_type, resolution_time_mins\n  FROM support_tickets\n  WHERE ticket_status IN ('resolved', 'closed')\n    AND resolution_time_mins IS NOT NULL\n)\nSELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins\nFROM resolved_tickets\nGROUP BY ticket_type\nORDER BY avg_resolution_mins DESC, ticket_type ASC;",
        "explanation": "## Approach\n\nCollect resolved tickets in a CTE, then average by type.\n\n## Query\n\n```sql\nWITH resolved_tickets AS (\n  SELECT ticket_type, resolution_time_mins\n  FROM support_tickets\n  WHERE ticket_status IN ('resolved', 'closed')\n    AND resolution_time_mins IS NOT NULL\n)\nSELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins\nFROM resolved_tickets\nGROUP BY ticket_type\nORDER BY avg_resolution_mins DESC, ticket_type ASC;\n```\n\n## Explanation\n\n- The CTE isolates tickets that should be included.\n- The final query computes average resolution time by ticket type.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ticket_type, avg_resolution_mins FROM (SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins FROM support_tickets WHERE ticket_status IN ('resolved', 'closed') AND resolution_time_mins IS NOT NULL GROUP BY ticket_type) x ORDER BY avg_resolution_mins DESC, ticket_type ASC;",
        "explanation": "## Approach\n\nAggregate in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT ticket_type, avg_resolution_mins\nFROM (\n  SELECT ticket_type, ROUND(AVG(resolution_time_mins), 2) AS avg_resolution_mins\n  FROM support_tickets\n  WHERE ticket_status IN ('resolved', 'closed')\n    AND resolution_time_mins IS NOT NULL\n  GROUP BY ticket_type\n) x\nORDER BY avg_resolution_mins DESC, ticket_type ASC;\n```\n\n## Explanation\n\n- The inner query calculates the average resolution time per type.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nIt works, but the extra wrapper is not needed."
      }
    ]
  },
  {
    "code": "RIDE_059",
    "approaches": [
      {
        "approach_title": "Above avg distance",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id AS trip_id, actual_distance_km FROM trips WHERE trip_status = 'completed' AND actual_distance_km > (SELECT AVG(actual_distance_km) FROM trips WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL) ORDER BY actual_distance_km DESC, trip_id ASC;",
        "explanation": "## Approach\n\nCompare each completed trip's distance to the overall average completed-trip distance.\n\n## Query\n\n```sql\nSELECT id AS trip_id, actual_distance_km\nFROM trips\nWHERE trip_status = 'completed'\n  AND actual_distance_km > (\n    SELECT AVG(actual_distance_km)\n    FROM trips\n    WHERE trip_status = 'completed'\n      AND actual_distance_km IS NOT NULL\n  )\nORDER BY actual_distance_km DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The subquery computes the average actual distance across completed trips.\n- The outer query keeps completed trips whose distance is greater than that average.\n- Sorting descending shows the longest matching trips first.\n\n## Why this is optimal\n\nIt clearly expresses the comparison against a single overall average."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH avg_distance AS (\n  SELECT AVG(actual_distance_km) AS overall_avg\n  FROM trips\n  WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL\n)\nSELECT t.id AS trip_id, t.actual_distance_km\nFROM trips t\nCROSS JOIN avg_distance a\nWHERE t.trip_status = 'completed'\n  AND t.actual_distance_km > a.overall_avg\nORDER BY t.actual_distance_km DESC, trip_id ASC;",
        "explanation": "## Approach\n\nCompute the average distance in a CTE, then compare each trip to it.\n\n## Query\n\n```sql\nWITH avg_distance AS (\n  SELECT AVG(actual_distance_km) AS overall_avg\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND actual_distance_km IS NOT NULL\n)\nSELECT t.id AS trip_id, t.actual_distance_km\nFROM trips t\nCROSS JOIN avg_distance a\nWHERE t.trip_status = 'completed'\n  AND t.actual_distance_km > a.overall_avg\nORDER BY t.actual_distance_km DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The CTE returns one row containing the overall average.\n- `CROSS JOIN` makes that average available to every trip row.\n- The outer query filters above-average trips.\n\n## Difference from the optimal approach\n\nMore explicit, but longer."
      },
      {
        "approach_title": "Window average",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT trip_id, actual_distance_km FROM (SELECT id AS trip_id, actual_distance_km, AVG(actual_distance_km) OVER () AS overall_avg FROM trips WHERE trip_status = 'completed' AND actual_distance_km IS NOT NULL) x WHERE actual_distance_km > overall_avg ORDER BY actual_distance_km DESC, trip_id ASC;",
        "explanation": "## Approach\n\nAttach the overall average distance to every completed trip row with a window function.\n\n## Query\n\n```sql\nSELECT trip_id, actual_distance_km\nFROM (\n  SELECT id AS trip_id,\n         actual_distance_km,\n         AVG(actual_distance_km) OVER () AS overall_avg\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND actual_distance_km IS NOT NULL\n) x\nWHERE actual_distance_km > overall_avg\nORDER BY actual_distance_km DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The window function computes the overall average across the filtered rows.\n- The outer query keeps rows above that repeated value.\n\n## Difference from the optimal approach\n\nGood for window-function practice, but more complex than needed."
      }
    ]
  },
  {
    "code": "RIDE_060",
    "approaches": [
      {
        "approach_title": "Compare counts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > COUNT(*) FILTER (WHERE trip_status = 'cancelled') ORDER BY completed_trips DESC, driver_id ASC;",
        "explanation": "## Approach\n\nGroup trips by driver, count completed and cancelled trips separately, then compare the two counts.\n\n## Query\n\n```sql\nSELECT driver_id,\n       COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips,\n       COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\nFROM trips\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING COUNT(*) FILTER (WHERE trip_status = 'completed')\n     > COUNT(*) FILTER (WHERE trip_status = 'cancelled')\nORDER BY completed_trips DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- Filtered counts separately measure completed and cancelled trips.\n- The `HAVING` clause keeps only drivers whose completed count is greater than cancelled count.\n- Sorting is based on completed trips first.\n\n## Why this is optimal\n\nIt solves the full comparison in one grouped query and is very readable."
      },
      {
        "approach_title": "CTE trip stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_trip_stats AS (\n  SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, completed_trips, cancelled_trips\nFROM driver_trip_stats\nWHERE completed_trips > cancelled_trips\nORDER BY completed_trips DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute both counts in a CTE, then filter drivers outside.\n\n## Query\n\n```sql\nWITH driver_trip_stats AS (\n  SELECT driver_id,\n         COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips,\n         COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, completed_trips, cancelled_trips\nFROM driver_trip_stats\nWHERE completed_trips > cancelled_trips\nORDER BY completed_trips DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE stores both metrics per driver.\n- The outer query applies the comparison and ordering.\n\n## Difference from the optimal approach\n\nSlightly longer, but easy to extend."
      },
      {
        "approach_title": "CASE counts",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) AS completed_trips, SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) > SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) ORDER BY completed_trips DESC, driver_id ASC;",
        "explanation": "## Approach\n\nUse `CASE` expressions to count completed and cancelled trips for each driver.\n\n## Query\n\n```sql\nSELECT driver_id,\n       SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) AS completed_trips,\n       SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips\nFROM trips\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END)\n     > SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END)\nORDER BY completed_trips DESC, driver_id ASC;\n```\n\n## Explanation\n\n- Each `CASE` turns a matching status into `1` and everything else into `0`.\n- Summing those values gives per-driver counts.\n- The `HAVING` clause compares the two totals.\n\n## Difference from the optimal approach\n\nFully correct, but `FILTER` is cleaner and more readable in PostgreSQL."
      }
    ]
  },
  {
    "code": "RIDE_061",
    "approaches": [
      {
        "approach_title": "Top rider cancels",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS cancelled_trips FROM trips WHERE trip_status = 'cancelled' GROUP BY user_id ORDER BY cancelled_trips DESC, user_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter cancelled trips, group by rider, then keep the top 5.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS cancelled_trips\nFROM trips\nWHERE trip_status = 'cancelled'\nGROUP BY user_id\nORDER BY cancelled_trips DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE trip_status = 'cancelled'` keeps only cancelled trips.\n- `GROUP BY user_id` creates one row per rider.\n- `COUNT(*)` counts cancelled trips for each rider.\n- `ORDER BY` sorts riders by highest cancel count.\n- `LIMIT 5` returns only the top 5.\n\n## Why this is optimal\n\nIt is the standard top-N grouped count solution."
      },
      {
        "approach_title": "CTE cancels",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_cancellations AS (\n  SELECT user_id, COUNT(*) AS cancelled_trips\n  FROM trips\n  WHERE trip_status = 'cancelled'\n  GROUP BY user_id\n)\nSELECT user_id, cancelled_trips\nFROM rider_cancellations\nORDER BY cancelled_trips DESC, user_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute rider cancellation counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH rider_cancellations AS (\n  SELECT user_id, COUNT(*) AS cancelled_trips\n  FROM trips\n  WHERE trip_status = 'cancelled'\n  GROUP BY user_id\n)\nSELECT user_id, cancelled_trips\nFROM rider_cancellations\nORDER BY cancelled_trips DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one grouped row per rider.\n- The outer query handles final ranking and limiting.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank riders",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, cancelled_trips FROM (SELECT user_id, COUNT(*) AS cancelled_trips, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn FROM trips WHERE trip_status = 'cancelled' GROUP BY user_id) x WHERE rn <= 5 ORDER BY cancelled_trips DESC, user_id ASC;",
        "explanation": "## Approach\n\nAggregate cancellation counts, rank riders, then keep the first 5.\n\n## Query\n\n```sql\nSELECT user_id, cancelled_trips\nFROM (\n  SELECT user_id,\n         COUNT(*) AS cancelled_trips,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn\n  FROM trips\n  WHERE trip_status = 'cancelled'\n  GROUP BY user_id\n) x\nWHERE rn <= 5\nORDER BY cancelled_trips DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner query counts cancelled trips per rider.\n- `ROW_NUMBER()` ranks riders by that count.\n- The outer query keeps the first 5 ranked rows.\n\n## Difference from the optimal approach\n\nUseful when rank logic is needed, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_062",
    "approaches": [
      {
        "approach_title": "AVG by type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins FROM trips WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL GROUP BY ride_type ORDER BY avg_duration_mins DESC, ride_type ASC;",
        "explanation": "## Approach\n\nFilter completed trips with known duration, group by ride type, then average duration.\n\n## Query\n\n```sql\nSELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins\nFROM trips\nWHERE trip_status = 'completed'\n  AND actual_duration_mins IS NOT NULL\nGROUP BY ride_type\nORDER BY avg_duration_mins DESC, ride_type ASC;\n```\n\n## Explanation\n\n- Only completed trips should contribute to actual duration analysis.\n- `actual_duration_mins IS NOT NULL` avoids averaging missing values.\n- `GROUP BY ride_type` creates one row per ride type.\n- `AVG(actual_duration_mins)` computes the mean duration.\n\n## Why this is optimal\n\nIt directly matches the grouping and metric required."
      },
      {
        "approach_title": "CTE durations",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH type_durations AS (\n  SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins\n  FROM trips\n  WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_duration_mins\nFROM type_durations\nORDER BY avg_duration_mins DESC, ride_type ASC;",
        "explanation": "## Approach\n\nCalculate average duration per ride type in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH type_durations AS (\n  SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND actual_duration_mins IS NOT NULL\n  GROUP BY ride_type\n)\nSELECT ride_type, avg_duration_mins\nFROM type_durations\nORDER BY avg_duration_mins DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per ride type.\n- The outer query presents the final ordered result.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, avg_duration_mins FROM (SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins FROM trips WHERE trip_status = 'completed' AND actual_duration_mins IS NOT NULL GROUP BY ride_type) x ORDER BY avg_duration_mins DESC, ride_type ASC;",
        "explanation": "## Approach\n\nAggregate inside a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT ride_type, avg_duration_mins\nFROM (\n  SELECT ride_type, ROUND(AVG(actual_duration_mins), 2) AS avg_duration_mins\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND actual_duration_mins IS NOT NULL\n  GROUP BY ride_type\n) x\nORDER BY avg_duration_mins DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The inner query computes one average per ride type.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper is unnecessary."
      }
    ]
  },
  {
    "code": "RIDE_063",
    "approaches": [
      {
        "approach_title": "HAVING no cancels",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) > 0 AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') = 0 ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nGroup trips by driver and keep only drivers with zero cancelled trips.\n\n## Query\n\n```sql\nSELECT driver_id\nFROM trips\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING COUNT(*) > 0\n   AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') = 0\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- `driver_id IS NOT NULL` removes unassigned trips.\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*) > 0` ensures the driver has assigned trips.\n- The filtered count checks cancelled trips only.\n- Keeping only rows where that count is `0` returns drivers with no cancellations.\n\n## Why this is optimal\n\nIt solves the condition cleanly in one grouped query."
      },
      {
        "approach_title": "CTE stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_trip_stats AS (\n  SELECT driver_id, COUNT(*) AS total_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id\nFROM driver_trip_stats\nWHERE total_trips > 0 AND cancelled_trips = 0\nORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nCompute total and cancelled trips per driver in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH driver_trip_stats AS (\n  SELECT driver_id,\n         COUNT(*) AS total_trips,\n         COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id\nFROM driver_trip_stats\nWHERE total_trips > 0\n  AND cancelled_trips = 0\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per driver.\n- The outer query keeps drivers who have trips and zero cancelled trips.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend."
      },
      {
        "approach_title": "Except cancels",
        "approach_type": "set_operation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT driver_id FROM trips WHERE driver_id IS NOT NULL EXCEPT SELECT DISTINCT driver_id FROM trips WHERE driver_id IS NOT NULL AND trip_status = 'cancelled' ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nTake all assigned drivers, then remove drivers who ever had a cancelled trip.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_id\nFROM trips\nWHERE driver_id IS NOT NULL\nEXCEPT\nSELECT DISTINCT driver_id\nFROM trips\nWHERE driver_id IS NOT NULL\n  AND trip_status = 'cancelled'\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The first set contains all drivers with assigned trips.\n- The second set contains drivers with at least one cancelled trip.\n- `EXCEPT` removes the second set from the first.\n\n## Difference from the optimal approach\n\nElegant, but less explicit than grouped filtering."
      }
    ]
  },
  {
    "code": "RIDE_064",
    "approaches": [
      {
        "approach_title": "Top avg fare",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id ORDER BY avg_fare DESC, driver_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter completed assigned trips, group by driver, average the fare, then keep the top 5.\n\n## Query\n\n```sql\nSELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nGROUP BY driver_id\nORDER BY avg_fare DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Only completed trips with an assigned driver are relevant.\n- `GROUP BY driver_id` creates one row per driver.\n- `AVG(total_fare)` computes average fare per driver.\n- `LIMIT 5` returns the top 5 drivers by that metric.\n\n## Why this is optimal\n\nIt directly computes the requested metric and ranking."
      },
      {
        "approach_title": "CTE avg fare",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_avg_fares AS (\n  SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, avg_fare\nFROM driver_avg_fares\nORDER BY avg_fare DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute average fare per driver in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH driver_avg_fares AS (\n  SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, avg_fare\nFROM driver_avg_fares\nORDER BY avg_fare DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per driver.\n- The outer query returns the top 5 rows.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank averages",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, avg_fare FROM (SELECT driver_id, ROUND(AVG(total_fare), 2) AS avg_fare, ROW_NUMBER() OVER (ORDER BY AVG(total_fare) DESC, driver_id ASC) AS rn FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id) x WHERE rn <= 5 ORDER BY avg_fare DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate average fares, rank drivers, then keep the top 5.\n\n## Query\n\n```sql\nSELECT driver_id, avg_fare\nFROM (\n  SELECT driver_id,\n         ROUND(AVG(total_fare), 2) AS avg_fare,\n         ROW_NUMBER() OVER (ORDER BY AVG(total_fare) DESC, driver_id ASC) AS rn\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n) x\nWHERE rn <= 5\nORDER BY avg_fare DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes average fare per driver.\n- `ROW_NUMBER()` ranks drivers by that average.\n- The outer query keeps the first 5.\n\n## Difference from the optimal approach\n\nUseful for ranking practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_065",
    "approaches": [
      {
        "approach_title": "Promo by type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, COUNT(*) AS promo_trip_count FROM trips WHERE promo_id IS NOT NULL GROUP BY ride_type ORDER BY promo_trip_count DESC, ride_type ASC;",
        "explanation": "## Approach\n\nKeep promo trips, group by ride type, then count them.\n\n## Query\n\n```sql\nSELECT ride_type, COUNT(*) AS promo_trip_count\nFROM trips\nWHERE promo_id IS NOT NULL\nGROUP BY ride_type\nORDER BY promo_trip_count DESC, ride_type ASC;\n```\n\n## Explanation\n\n- `promo_id IS NOT NULL` keeps only trips where a promo was applied.\n- `GROUP BY ride_type` creates one row per ride type.\n- `COUNT(*)` counts promo trips in each type.\n\n## Why this is optimal\n\nIt is the clearest grouped count solution for this condition."
      },
      {
        "approach_title": "CTE promo counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH promo_counts AS (\n  SELECT ride_type, COUNT(*) AS promo_trip_count\n  FROM trips\n  WHERE promo_id IS NOT NULL\n  GROUP BY ride_type\n)\nSELECT ride_type, promo_trip_count\nFROM promo_counts\nORDER BY promo_trip_count DESC, ride_type ASC;",
        "explanation": "## Approach\n\nCompute grouped promo counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH promo_counts AS (\n  SELECT ride_type, COUNT(*) AS promo_trip_count\n  FROM trips\n  WHERE promo_id IS NOT NULL\n  GROUP BY ride_type\n)\nSELECT ride_type, promo_trip_count\nFROM promo_counts\nORDER BY promo_trip_count DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per ride type.\n- The outer query returns the ordered result.\n\n## Difference from the optimal approach\n\nMore verbose, but expandable."
      },
      {
        "approach_title": "Filter aggregate",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trip_count FROM trips GROUP BY ride_type ORDER BY promo_trip_count DESC, ride_type ASC;",
        "explanation": "## Approach\n\nGroup all trips by ride type, then count only promo trips inside the aggregate.\n\n## Query\n\n```sql\nSELECT ride_type,\n       COUNT(*) FILTER (WHERE promo_id IS NOT NULL) AS promo_trip_count\nFROM trips\nGROUP BY ride_type\nORDER BY promo_trip_count DESC, ride_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY ride_type` creates one row per ride type.\n- `FILTER` makes `COUNT(*)` include only promo trips.\n- This is handy when multiple conditional counts are needed together.\n\n## Difference from the optimal approach\n\nFlexible, but slightly less direct here."
      }
    ]
  },
  {
    "code": "RIDE_066",
    "approaches": [
      {
        "approach_title": "Above avg spend",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, total_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) s WHERE total_spend > (SELECT AVG(total_spend) FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) a) ORDER BY total_spend DESC, user_id ASC;",
        "explanation": "## Approach\n\nFirst compute each rider's total spend, then compare each total against the average rider spend.\n\n## Query\n\n```sql\nSELECT user_id, total_spend\nFROM (\n  SELECT user_id, SUM(total_fare) AS total_spend\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY user_id\n) s\nWHERE total_spend > (\n  SELECT AVG(total_spend)\n  FROM (\n    SELECT user_id, SUM(total_fare) AS total_spend\n    FROM trips\n    WHERE trip_status = 'completed'\n    GROUP BY user_id\n  ) a\n)\nORDER BY total_spend DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner grouped query calculates total spend per rider.\n- The nested subquery computes the average of those rider totals.\n- The outer query keeps riders whose spend is above that average.\n\n## Why this is optimal\n\nThis question needs two aggregation levels, and this structure expresses them clearly."
      },
      {
        "approach_title": "CTE spend stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_spend AS (\n  SELECT user_id, SUM(total_fare) AS total_spend\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY user_id\n), avg_spend AS (\n  SELECT AVG(total_spend) AS overall_avg_spend\n  FROM rider_spend\n)\nSELECT r.user_id, r.total_spend\nFROM rider_spend r\nCROSS JOIN avg_spend a\nWHERE r.total_spend > a.overall_avg_spend\nORDER BY r.total_spend DESC, r.user_id ASC;",
        "explanation": "## Approach\n\nCompute rider spend in one CTE, average spend in another, then compare.\n\n## Query\n\n```sql\nWITH rider_spend AS (\n  SELECT user_id, SUM(total_fare) AS total_spend\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY user_id\n), avg_spend AS (\n  SELECT AVG(total_spend) AS overall_avg_spend\n  FROM rider_spend\n)\nSELECT r.user_id, r.total_spend\nFROM rider_spend r\nCROSS JOIN avg_spend a\nWHERE r.total_spend > a.overall_avg_spend\nORDER BY r.total_spend DESC, r.user_id ASC;\n```\n\n## Explanation\n\n- The first CTE creates one total-spend row per rider.\n- The second CTE calculates the average of those totals.\n- The final query compares each rider against that average.\n\n## Difference from the optimal approach\n\nVery readable, but longer."
      },
      {
        "approach_title": "Window average",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, total_spend FROM (SELECT user_id, total_spend, AVG(total_spend) OVER () AS avg_spend FROM (SELECT user_id, SUM(total_fare) AS total_spend FROM trips WHERE trip_status = 'completed' GROUP BY user_id) s) x WHERE total_spend > avg_spend ORDER BY total_spend DESC, user_id ASC;",
        "explanation": "## Approach\n\nCompute rider spend first, then attach the overall average to every row with a window function.\n\n## Query\n\n```sql\nSELECT user_id, total_spend\nFROM (\n  SELECT user_id,\n         total_spend,\n         AVG(total_spend) OVER () AS avg_spend\n  FROM (\n    SELECT user_id, SUM(total_fare) AS total_spend\n    FROM trips\n    WHERE trip_status = 'completed'\n    GROUP BY user_id\n  ) s\n) x\nWHERE total_spend > avg_spend\nORDER BY total_spend DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner grouped query computes rider totals.\n- The window function repeats the overall average on each rider row.\n- The outer query keeps rows above that value.\n\n## Difference from the optimal approach\n\nUseful for window-function practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_067",
    "approaches": [
      {
        "approach_title": "All verified docs",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id FROM driver_documents GROUP BY driver_id HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE verification_status = 'verified') ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nGroup documents by driver and keep only drivers whose verified-document count equals total document count.\n\n## Query\n\n```sql\nSELECT driver_id\nFROM driver_documents\nGROUP BY driver_id\nHAVING COUNT(*) > 0\n   AND COUNT(*) = COUNT(*) FILTER (WHERE verification_status = 'verified')\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` gives total uploaded documents.\n- The filtered count gives only verified documents.\n- If both counts are equal, every uploaded document is verified.\n\n## Why this is optimal\n\nIt expresses the all-rows-must-match condition clearly in one grouped query."
      },
      {
        "approach_title": "CTE doc stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH doc_stats AS (\n  SELECT driver_id, COUNT(*) AS total_docs, COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified_docs\n  FROM driver_documents\n  GROUP BY driver_id\n)\nSELECT driver_id\nFROM doc_stats\nWHERE total_docs > 0 AND total_docs = verified_docs\nORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nCompute total and verified document counts in a CTE, then compare them.\n\n## Query\n\n```sql\nWITH doc_stats AS (\n  SELECT driver_id,\n         COUNT(*) AS total_docs,\n         COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified_docs\n  FROM driver_documents\n  GROUP BY driver_id\n)\nSELECT driver_id\nFROM doc_stats\nWHERE total_docs > 0\n  AND total_docs = verified_docs\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per driver with both counts.\n- The outer query keeps only drivers where all documents are verified.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend."
      },
      {
        "approach_title": "No non-verified",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT d1.driver_id FROM driver_documents d1 WHERE NOT EXISTS (SELECT 1 FROM driver_documents d2 WHERE d2.driver_id = d1.driver_id AND d2.verification_status <> 'verified') ORDER BY d1.driver_id ASC;",
        "explanation": "## Approach\n\nReturn drivers for whom no non-verified document exists.\n\n## Query\n\n```sql\nSELECT DISTINCT d1.driver_id\nFROM driver_documents d1\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM driver_documents d2\n  WHERE d2.driver_id = d1.driver_id\n    AND d2.verification_status <> 'verified'\n)\nORDER BY d1.driver_id ASC;\n```\n\n## Explanation\n\n- The outer query starts from drivers who have uploaded at least one document.\n- The correlated subquery checks whether any document for that driver is not verified.\n- `NOT EXISTS` keeps only drivers with no non-verified documents.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than grouped counting."
      }
    ]
  },
  {
    "code": "RIDE_068",
    "approaches": [
      {
        "approach_title": "AVG by method",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method ORDER BY avg_paid_amount DESC, payment_method ASC;",
        "explanation": "## Approach\n\nFilter successful payments, group by payment method, then average the paid amount.\n\n## Query\n\n```sql\nSELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount\nFROM payments\nWHERE payment_status = 'successful'\nGROUP BY payment_method\nORDER BY avg_paid_amount DESC, payment_method ASC;\n```\n\n## Explanation\n\n- Only successful payments should count here.\n- `GROUP BY payment_method` creates one row per method.\n- `AVG(paid_amount)` computes the average successful payment amount.\n- Sorting descending shows the highest average first.\n\n## Why this is optimal\n\nIt is the most direct grouped-average solution."
      },
      {
        "approach_title": "CTE averages",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH method_amounts AS (\n  SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, avg_paid_amount\nFROM method_amounts\nORDER BY avg_paid_amount DESC, payment_method ASC;",
        "explanation": "## Approach\n\nCompute average paid amount per method in a CTE, then sort.\n\n## Query\n\n```sql\nWITH method_amounts AS (\n  SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n)\nSELECT payment_method, avg_paid_amount\nFROM method_amounts\nORDER BY avg_paid_amount DESC, payment_method ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per payment method.\n- The outer query returns the final ordered result.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT payment_method, avg_paid_amount FROM (SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments WHERE payment_status = 'successful' GROUP BY payment_method) x ORDER BY avg_paid_amount DESC, payment_method ASC;",
        "explanation": "## Approach\n\nAggregate average paid amount in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT payment_method, avg_paid_amount\nFROM (\n  SELECT payment_method, ROUND(AVG(paid_amount), 2) AS avg_paid_amount\n  FROM payments\n  WHERE payment_status = 'successful'\n  GROUP BY payment_method\n) x\nORDER BY avg_paid_amount DESC, payment_method ASC;\n```\n\n## Explanation\n\n- The inner query computes one average per method.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt works, but the outer wrapper adds no real value."
      }
    ]
  },
  {
    "code": "RIDE_069",
    "approaches": [
      {
        "approach_title": "Above type avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.id AS trip_id, t.ride_type, t.total_fare FROM trips t JOIN (SELECT ride_type, AVG(total_fare) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) r ON r.ride_type = t.ride_type WHERE t.trip_status = 'completed' AND t.total_fare > r.avg_fare ORDER BY t.total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nCompute the average completed-trip fare for each ride type, join it back to trips, then keep trips above their own ride-type average.\n\n## Query\n\n```sql\nSELECT t.id AS trip_id, t.ride_type, t.total_fare\nFROM trips t\nJOIN (\n  SELECT ride_type, AVG(total_fare) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n) r ON r.ride_type = t.ride_type\nWHERE t.trip_status = 'completed'\n  AND t.total_fare > r.avg_fare\nORDER BY t.total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The derived table creates one average fare per ride type.\n- Joining by `ride_type` attaches that average to each completed trip.\n- The filter keeps only trips whose fare is above their ride type's average.\n\n## Why this is optimal\n\nThis is the clearest way to compare each row against its group average."
      },
      {
        "approach_title": "CTE type avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ride_type_avg AS (\n  SELECT ride_type, AVG(total_fare) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT t.id AS trip_id, t.ride_type, t.total_fare\nFROM trips t\nJOIN ride_type_avg r ON r.ride_type = t.ride_type\nWHERE t.trip_status = 'completed'\n  AND t.total_fare > r.avg_fare\nORDER BY t.total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nStore average fare by ride type in a CTE, then join it to completed trips.\n\n## Query\n\n```sql\nWITH ride_type_avg AS (\n  SELECT ride_type, AVG(total_fare) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT t.id AS trip_id, t.ride_type, t.total_fare\nFROM trips t\nJOIN ride_type_avg r ON r.ride_type = t.ride_type\nWHERE t.trip_status = 'completed'\n  AND t.total_fare > r.avg_fare\nORDER BY t.total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The CTE computes one row per ride type.\n- The join attaches that group average to matching trips.\n- The filter keeps trips above the attached average.\n\n## Difference from the optimal approach\n\nVery readable, but a bit longer."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT trip_id, ride_type, total_fare FROM (SELECT id AS trip_id, ride_type, total_fare, AVG(total_fare) OVER (PARTITION BY ride_type) AS avg_fare FROM trips WHERE trip_status = 'completed') x WHERE total_fare > avg_fare ORDER BY total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nUse a window function to attach the average fare for each ride type to every completed trip row.\n\n## Query\n\n```sql\nSELECT trip_id, ride_type, total_fare\nFROM (\n  SELECT id AS trip_id,\n         ride_type,\n         total_fare,\n         AVG(total_fare) OVER (PARTITION BY ride_type) AS avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n) x\nWHERE total_fare > avg_fare\nORDER BY total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- `AVG(total_fare) OVER (PARTITION BY ride_type)` repeats each ride type's average on its rows.\n- The outer query keeps trips above that repeated group average.\n\n## Difference from the optimal approach\n\nExcellent for window-function practice, but a join is simpler to teach here."
      }
    ]
  },
  {
    "code": "RIDE_070",
    "approaches": [
      {
        "approach_title": "Top safety tickets",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS resolved_safety_tickets FROM support_tickets WHERE driver_id IS NOT NULL AND ticket_type = 'safety' AND ticket_status IN ('resolved', 'closed') GROUP BY driver_id ORDER BY resolved_safety_tickets DESC, driver_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter safety tickets that are resolved or closed, group by driver, then keep the top 5.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS resolved_safety_tickets\nFROM support_tickets\nWHERE driver_id IS NOT NULL\n  AND ticket_type = 'safety'\n  AND ticket_status IN ('resolved', 'closed')\nGROUP BY driver_id\nORDER BY resolved_safety_tickets DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `driver_id IS NOT NULL` keeps only tickets tied to a driver.\n- The filters keep only safety tickets that have reached a resolved state.\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` counts qualifying tickets.\n- `LIMIT 5` returns the top 5 drivers.\n\n## Why this is optimal\n\nIt directly applies the needed conditions and ranking."
      },
      {
        "approach_title": "CTE ticket counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH safety_ticket_counts AS (\n  SELECT driver_id, COUNT(*) AS resolved_safety_tickets\n  FROM support_tickets\n  WHERE driver_id IS NOT NULL\n    AND ticket_type = 'safety'\n    AND ticket_status IN ('resolved', 'closed')\n  GROUP BY driver_id\n)\nSELECT driver_id, resolved_safety_tickets\nFROM safety_ticket_counts\nORDER BY resolved_safety_tickets DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute qualifying ticket counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH safety_ticket_counts AS (\n  SELECT driver_id, COUNT(*) AS resolved_safety_tickets\n  FROM support_tickets\n  WHERE driver_id IS NOT NULL\n    AND ticket_type = 'safety'\n    AND ticket_status IN ('resolved', 'closed')\n  GROUP BY driver_id\n)\nSELECT driver_id, resolved_safety_tickets\nFROM safety_ticket_counts\nORDER BY resolved_safety_tickets DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one grouped row per driver.\n- The outer query returns the top 5 results.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank ticket counts",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, resolved_safety_tickets FROM (SELECT driver_id, COUNT(*) AS resolved_safety_tickets, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn FROM support_tickets WHERE driver_id IS NOT NULL AND ticket_type = 'safety' AND ticket_status IN ('resolved', 'closed') GROUP BY driver_id) x WHERE rn <= 5 ORDER BY resolved_safety_tickets DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate ticket counts, rank drivers, then keep the first 5.\n\n## Query\n\n```sql\nSELECT driver_id, resolved_safety_tickets\nFROM (\n  SELECT driver_id,\n         COUNT(*) AS resolved_safety_tickets,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, driver_id ASC) AS rn\n  FROM support_tickets\n  WHERE driver_id IS NOT NULL\n    AND ticket_type = 'safety'\n    AND ticket_status IN ('resolved', 'closed')\n  GROUP BY driver_id\n) x\nWHERE rn <= 5\nORDER BY resolved_safety_tickets DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes qualifying ticket counts per driver.\n- `ROW_NUMBER()` ranks drivers by that count.\n- The outer query keeps the top 5 ranked rows.\n\n## Difference from the optimal approach\n\nUseful for ranking practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_071",
    "approaches": [
      {
        "approach_title": "Join and avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout FROM driver_payouts dp JOIN trips t ON t.id = dp.trip_id WHERE t.trip_status = 'completed' GROUP BY t.ride_type ORDER BY avg_net_payout DESC, t.ride_type ASC;",
        "explanation": "## Approach\n\nJoin payouts to trips, keep completed trips, then average payout by ride type.\n\n## Query\n\n```sql\nSELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout\nFROM driver_payouts dp\nJOIN trips t ON t.id = dp.trip_id\nWHERE t.trip_status = 'completed'\nGROUP BY t.ride_type\nORDER BY avg_net_payout DESC, t.ride_type ASC;\n```\n\n## Explanation\n\n- `driver_payouts` contains the driver payout amount.\n- `trips` contains the `ride_type`.\n- The join links each payout to its trip.\n- `WHERE t.trip_status = 'completed'` keeps only completed trips.\n- `AVG(dp.net_payout)` calculates the mean payout for each ride type.\n\n## Why this is optimal\n\nIt directly combines the two required tables and computes the grouped average in one step."
      },
      {
        "approach_title": "CTE payout avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH payout_by_type AS (\n  SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout\n  FROM driver_payouts dp\n  JOIN trips t ON t.id = dp.trip_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY t.ride_type\n)\nSELECT ride_type, avg_net_payout\nFROM payout_by_type\nORDER BY avg_net_payout DESC, ride_type ASC;",
        "explanation": "## Approach\n\nCompute average payout by ride type in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH payout_by_type AS (\n  SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout\n  FROM driver_payouts dp\n  JOIN trips t ON t.id = dp.trip_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY t.ride_type\n)\nSELECT ride_type, avg_net_payout\nFROM payout_by_type\nORDER BY avg_net_payout DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per ride type.\n- The outer query only handles presentation.\n\n## Difference from the optimal approach\n\nMore modular, but longer than needed."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, avg_net_payout FROM (SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout FROM driver_payouts dp JOIN trips t ON t.id = dp.trip_id WHERE t.trip_status = 'completed' GROUP BY t.ride_type) x ORDER BY avg_net_payout DESC, ride_type ASC;",
        "explanation": "## Approach\n\nAggregate in a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT ride_type, avg_net_payout\nFROM (\n  SELECT t.ride_type, ROUND(AVG(dp.net_payout), 2) AS avg_net_payout\n  FROM driver_payouts dp\n  JOIN trips t ON t.id = dp.trip_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY t.ride_type\n) x\nORDER BY avg_net_payout DESC, ride_type ASC;\n```\n\n## Explanation\n\n- The inner query computes the grouped averages.\n- The outer query returns the sorted result.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper is unnecessary."
      }
    ]
  },
  {
    "code": "RIDE_072",
    "approaches": [
      {
        "approach_title": "Count types",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count FROM trips GROUP BY user_id HAVING COUNT(DISTINCT ride_type) > 1 ORDER BY ride_type_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nGroup trips by rider, count distinct ride types, then keep riders with more than one type.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count\nFROM trips\nGROUP BY user_id\nHAVING COUNT(DISTINCT ride_type) > 1\nORDER BY ride_type_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per rider.\n- `COUNT(DISTINCT ride_type)` counts unique ride types booked by that rider.\n- `HAVING ... > 1` keeps riders who used multiple ride types.\n\n## Why this is optimal\n\nIt is the most direct grouped-distinct count solution."
      },
      {
        "approach_title": "CTE rider types",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rider_types AS (\n  SELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id, ride_type_count\nFROM rider_types\nWHERE ride_type_count > 1\nORDER BY ride_type_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nCompute distinct ride-type counts in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH rider_types AS (\n  SELECT user_id, COUNT(DISTINCT ride_type) AS ride_type_count\n  FROM trips\n  GROUP BY user_id\n)\nSELECT user_id, ride_type_count\nFROM rider_types\nWHERE ride_type_count > 1\nORDER BY ride_type_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per rider.\n- The outer query keeps only riders with more than one ride type.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend."
      },
      {
        "approach_title": "Distinct pairs",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, COUNT(*) AS ride_type_count FROM (SELECT DISTINCT user_id, ride_type FROM trips) x GROUP BY user_id HAVING COUNT(*) > 1 ORDER BY ride_type_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nFirst reduce to distinct rider-type pairs, then count those pairs per rider.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS ride_type_count\nFROM (\n  SELECT DISTINCT user_id, ride_type\n  FROM trips\n) x\nGROUP BY user_id\nHAVING COUNT(*) > 1\nORDER BY ride_type_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The inner query removes duplicate rider and ride-type combinations.\n- The outer query counts remaining unique ride types per rider.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(DISTINCT ...)` is simpler."
      }
    ]
  },
  {
    "code": "RIDE_073",
    "approaches": [
      {
        "approach_title": "Count driver types",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(DISTINCT ride_type) > 1 ORDER BY ride_type_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nFilter completed assigned trips, count distinct ride types per driver, then keep drivers with more than one type.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING COUNT(DISTINCT ride_type) > 1\nORDER BY ride_type_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- Only completed trips with assigned drivers are relevant.\n- `COUNT(DISTINCT ride_type)` counts unique completed ride types per driver.\n- `HAVING ... > 1` keeps multi-type drivers.\n\n## Why this is optimal\n\nIt directly matches the business rule in one grouped query."
      },
      {
        "approach_title": "CTE type count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_types AS (\n  SELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count\n  FROM trips\n  WHERE trip_status = 'completed' AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, ride_type_count\nFROM driver_types\nWHERE ride_type_count > 1\nORDER BY ride_type_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute completed ride-type counts per driver in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH driver_types AS (\n  SELECT driver_id, COUNT(DISTINCT ride_type) AS ride_type_count\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, ride_type_count\nFROM driver_types\nWHERE ride_type_count > 1\nORDER BY ride_type_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per driver.\n- The outer query keeps only drivers with more than one completed ride type.\n\n## Difference from the optimal approach\n\nLonger, but easy to read."
      },
      {
        "approach_title": "Distinct driver pairs",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, COUNT(*) AS ride_type_count FROM (SELECT DISTINCT driver_id, ride_type FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL) x GROUP BY driver_id HAVING COUNT(*) > 1 ORDER BY ride_type_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nFirst reduce to distinct driver-type pairs, then count those pairs per driver.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS ride_type_count\nFROM (\n  SELECT DISTINCT driver_id, ride_type\n  FROM trips\n  WHERE trip_status = 'completed'\n    AND driver_id IS NOT NULL\n) x\nGROUP BY driver_id\nHAVING COUNT(*) > 1\nORDER BY ride_type_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The inner query removes duplicate driver and ride-type combinations.\n- The outer query counts unique ride types handled by each driver.\n\n## Difference from the optimal approach\n\nCorrect, but less direct than `COUNT(DISTINCT ...)`."
      }
    ]
  },
  {
    "code": "RIDE_074",
    "approaches": [
      {
        "approach_title": "Join pickup areas",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.area_name, COUNT(*) AS completed_trip_count FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' GROUP BY l.area_name ORDER BY completed_trip_count DESC, l.area_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin completed trips to pickup locations, group by area name, then keep the top 5.\n\n## Query\n\n```sql\nSELECT l.area_name, COUNT(*) AS completed_trip_count\nFROM trips t\nJOIN locations l ON l.id = t.pickup_location_id\nWHERE t.trip_status = 'completed'\nGROUP BY l.area_name\nORDER BY completed_trip_count DESC, l.area_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `pickup_location_id` links each trip to a location row.\n- The join brings in `area_name`.\n- Grouping by `l.area_name` counts completed trips per pickup area.\n- `LIMIT 5` returns only the busiest 5 areas.\n\n## Why this is optimal\n\nIt directly joins the needed lookup table and aggregates the result."
      },
      {
        "approach_title": "CTE area counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH area_counts AS (\n  SELECT l.area_name, COUNT(*) AS completed_trip_count\n  FROM trips t\n  JOIN locations l ON l.id = t.pickup_location_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY l.area_name\n)\nSELECT area_name, completed_trip_count\nFROM area_counts\nORDER BY completed_trip_count DESC, area_name ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute completed trip counts per pickup area in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH area_counts AS (\n  SELECT l.area_name, COUNT(*) AS completed_trip_count\n  FROM trips t\n  JOIN locations l ON l.id = t.pickup_location_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY l.area_name\n)\nSELECT area_name, completed_trip_count\nFROM area_counts\nORDER BY completed_trip_count DESC, area_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one row per area.\n- The outer query returns the top 5 areas.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank areas",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT area_name, completed_trip_count FROM (SELECT l.area_name, COUNT(*) AS completed_trip_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, l.area_name ASC) AS rn FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' GROUP BY l.area_name) x WHERE rn <= 5 ORDER BY completed_trip_count DESC, area_name ASC;",
        "explanation": "## Approach\n\nAggregate completed trip counts, rank areas, then keep the first 5.\n\n## Query\n\n```sql\nSELECT area_name, completed_trip_count\nFROM (\n  SELECT l.area_name,\n         COUNT(*) AS completed_trip_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, l.area_name ASC) AS rn\n  FROM trips t\n  JOIN locations l ON l.id = t.pickup_location_id\n  WHERE t.trip_status = 'completed'\n  GROUP BY l.area_name\n) x\nWHERE rn <= 5\nORDER BY completed_trip_count DESC, area_name ASC;\n```\n\n## Explanation\n\n- The grouped query computes one trip count per area.\n- `ROW_NUMBER()` ranks the grouped rows.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful for ranking practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_075",
    "approaches": [
      {
        "approach_title": "Distinct labels",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT user_id FROM rider_saved_places WHERE LOWER(label) IN ('home', 'work') ORDER BY user_id ASC;",
        "explanation": "## Approach\n\nFilter saved places to home or work labels, then return unique riders.\n\n## Query\n\n```sql\nSELECT DISTINCT user_id\nFROM rider_saved_places\nWHERE LOWER(label) IN ('home', 'work')\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `LOWER(label)` makes the comparison case-insensitive.\n- `IN ('home', 'work')` keeps only those two labels.\n- `DISTINCT` removes duplicate rider ids if a rider has both labels.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to solve the problem."
      },
      {
        "approach_title": "Group users",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id FROM rider_saved_places WHERE LOWER(label) IN ('home', 'work') GROUP BY user_id ORDER BY user_id ASC;",
        "explanation": "## Approach\n\nFilter matching labels, then group by rider id.\n\n## Query\n\n```sql\nSELECT user_id\nFROM rider_saved_places\nWHERE LOWER(label) IN ('home', 'work')\nGROUP BY user_id\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only home and work labels.\n- `GROUP BY user_id` collapses multiple matching rows per rider into one.\n\n## Difference from the optimal approach\n\nIt works, but `DISTINCT` is more direct for deduplication."
      },
      {
        "approach_title": "CTE distinct",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH matching_users AS (\n  SELECT DISTINCT user_id\n  FROM rider_saved_places\n  WHERE LOWER(label) IN ('home', 'work')\n)\nSELECT user_id\nFROM matching_users\nORDER BY user_id ASC;",
        "explanation": "## Approach\n\nCollect matching rider ids in a CTE, then return them.\n\n## Query\n\n```sql\nWITH matching_users AS (\n  SELECT DISTINCT user_id\n  FROM rider_saved_places\n  WHERE LOWER(label) IN ('home', 'work')\n)\nSELECT user_id\nFROM matching_users\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates riders with at least one qualifying saved place.\n- The outer query presents the final list.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend."
      }
    ]
  },
  {
    "code": "RIDE_076",
    "approaches": [
      {
        "approach_title": "Join promo fare",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL GROUP BY u.city ORDER BY avg_promo_fare DESC, u.city ASC;",
        "explanation": "## Approach\n\nJoin completed promo trips to users, then average fare by rider city.\n\n## Query\n\n```sql\nSELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare\nFROM trips t\nJOIN users u ON u.id = t.user_id\nWHERE t.trip_status = 'completed'\n  AND t.promo_id IS NOT NULL\nGROUP BY u.city\nORDER BY avg_promo_fare DESC, u.city ASC;\n```\n\n## Explanation\n\n- `users` provides the rider city.\n- `trips` provides fare and promo usage.\n- The filters keep only completed trips that used a promo code.\n- Grouping by city creates one average per city.\n\n## Why this is optimal\n\nIt directly joins the needed tables and applies the exact filters."
      },
      {
        "approach_title": "CTE promo city",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH promo_city_fares AS (\n  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL\n  GROUP BY u.city\n)\nSELECT city, avg_promo_fare\nFROM promo_city_fares\nORDER BY avg_promo_fare DESC, city ASC;",
        "explanation": "## Approach\n\nCompute average promo-trip fare by city in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH promo_city_fares AS (\n  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  WHERE t.trip_status = 'completed'\n    AND t.promo_id IS NOT NULL\n  GROUP BY u.city\n)\nSELECT city, avg_promo_fare\nFROM promo_city_fares\nORDER BY avg_promo_fare DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per city.\n- The outer query handles output order.\n\n## Difference from the optimal approach\n\nLonger, but easier to extend."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, avg_promo_fare FROM (SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare FROM trips t JOIN users u ON u.id = t.user_id WHERE t.trip_status = 'completed' AND t.promo_id IS NOT NULL GROUP BY u.city) x ORDER BY avg_promo_fare DESC, city ASC;",
        "explanation": "## Approach\n\nAggregate inside a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT city, avg_promo_fare\nFROM (\n  SELECT u.city, ROUND(AVG(t.total_fare), 2) AS avg_promo_fare\n  FROM trips t\n  JOIN users u ON u.id = t.user_id\n  WHERE t.trip_status = 'completed'\n    AND t.promo_id IS NOT NULL\n  GROUP BY u.city\n) x\nORDER BY avg_promo_fare DESC, city ASC;\n```\n\n## Explanation\n\n- The inner query computes one average per city.\n- The outer query applies the final sorting.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper is unnecessary."
      }
    ]
  },
  {
    "code": "RIDE_077",
    "approaches": [
      {
        "approach_title": "HAVING tickets",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS ticket_count FROM support_tickets WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) > 3 ORDER BY ticket_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nGroup support tickets by driver and keep only drivers with more than 3 tickets.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS ticket_count\nFROM support_tickets\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING COUNT(*) > 3\nORDER BY ticket_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `driver_id IS NOT NULL` excludes tickets not linked to a driver.\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` gives the ticket volume for each driver.\n- `HAVING COUNT(*) > 3` keeps only high-ticket drivers.\n\n## Why this is optimal\n\nIt is the standard grouped filter pattern."
      },
      {
        "approach_title": "CTE ticket stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_tickets AS (\n  SELECT driver_id, COUNT(*) AS ticket_count\n  FROM support_tickets\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, ticket_count\nFROM driver_tickets\nWHERE ticket_count > 3\nORDER BY ticket_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute ticket counts per driver in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH driver_tickets AS (\n  SELECT driver_id, COUNT(*) AS ticket_count\n  FROM support_tickets\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, ticket_count\nFROM driver_tickets\nWHERE ticket_count > 3\nORDER BY ticket_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per driver.\n- The outer query keeps only drivers above the threshold.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT driver_id, ticket_count FROM (SELECT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS ticket_count FROM support_tickets WHERE driver_id IS NOT NULL) x WHERE ticket_count > 3 ORDER BY ticket_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nUse a window count per driver, then keep distinct drivers above the threshold.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_id, ticket_count\nFROM (\n  SELECT driver_id,\n         COUNT(*) OVER (PARTITION BY driver_id) AS ticket_count\n  FROM support_tickets\n  WHERE driver_id IS NOT NULL\n) x\nWHERE ticket_count > 3\nORDER BY ticket_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The window function repeats each driver's ticket count on all their rows.\n- `DISTINCT` collapses duplicate driver rows.\n- The outer filter keeps only counts above 3.\n\n## Difference from the optimal approach\n\nCorrect, but more complex than `GROUP BY` plus `HAVING`."
      }
    ]
  },
  {
    "code": "RIDE_078",
    "approaches": [
      {
        "approach_title": "Join promo avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code ORDER BY avg_discount_amount DESC, p.code ASC;",
        "explanation": "## Approach\n\nJoin promo trips to promo codes, then average discount amount by code.\n\n## Query\n\n```sql\nSELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount\nFROM trips t\nJOIN promos p ON p.id = t.promo_id\nWHERE t.promo_id IS NOT NULL\nGROUP BY p.code\nORDER BY avg_discount_amount DESC, p.code ASC;\n```\n\n## Explanation\n\n- `trips` contains the discount amount.\n- `promos` contains the promo code string.\n- The join links each trip to its promo code.\n- Grouping by `p.code` calculates one average per code.\n\n## Why this is optimal\n\nIt directly brings the needed promo label into the grouped result."
      },
      {
        "approach_title": "CTE promo avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH promo_discounts AS (\n  SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount\n  FROM trips t\n  JOIN promos p ON p.id = t.promo_id\n  WHERE t.promo_id IS NOT NULL\n  GROUP BY p.code\n)\nSELECT code, avg_discount_amount\nFROM promo_discounts\nORDER BY avg_discount_amount DESC, code ASC;",
        "explanation": "## Approach\n\nCompute average discount per promo code in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH promo_discounts AS (\n  SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount\n  FROM trips t\n  JOIN promos p ON p.id = t.promo_id\n  WHERE t.promo_id IS NOT NULL\n  GROUP BY p.code\n)\nSELECT code, avg_discount_amount\nFROM promo_discounts\nORDER BY avg_discount_amount DESC, code ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per promo code.\n- The outer query returns the ordered output.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT code, avg_discount_amount FROM (SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code) x ORDER BY avg_discount_amount DESC, code ASC;",
        "explanation": "## Approach\n\nAggregate inside a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT code, avg_discount_amount\nFROM (\n  SELECT p.code, ROUND(AVG(t.discount_amount), 2) AS avg_discount_amount\n  FROM trips t\n  JOIN promos p ON p.id = t.promo_id\n  WHERE t.promo_id IS NOT NULL\n  GROUP BY p.code\n) x\nORDER BY avg_discount_amount DESC, code ASC;\n```\n\n## Explanation\n\n- The inner query computes average discount by promo code.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper is unnecessary."
      }
    ]
  },
  {
    "code": "RIDE_079",
    "approaches": [
      {
        "approach_title": "Above avg ETA",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id AS trip_id, estimated_pickup_eta_mins FROM trips WHERE estimated_pickup_eta_mins > (SELECT AVG(estimated_pickup_eta_mins) FROM trips WHERE estimated_pickup_eta_mins IS NOT NULL) ORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;",
        "explanation": "## Approach\n\nCompare each trip's estimated pickup ETA to the overall average ETA.\n\n## Query\n\n```sql\nSELECT id AS trip_id, estimated_pickup_eta_mins\nFROM trips\nWHERE estimated_pickup_eta_mins > (\n  SELECT AVG(estimated_pickup_eta_mins)\n  FROM trips\n  WHERE estimated_pickup_eta_mins IS NOT NULL\n)\nORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The subquery computes the overall average ETA from non-NULL values.\n- The outer query keeps trips whose ETA is above that average.\n- Sorting descending shows the largest ETAs first.\n\n## Why this is optimal\n\nIt directly compares each row to a single benchmark value."
      },
      {
        "approach_title": "CTE avg ETA",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH avg_eta AS (\n  SELECT AVG(estimated_pickup_eta_mins) AS overall_avg\n  FROM trips\n  WHERE estimated_pickup_eta_mins IS NOT NULL\n)\nSELECT t.id AS trip_id, t.estimated_pickup_eta_mins\nFROM trips t\nCROSS JOIN avg_eta a\nWHERE t.estimated_pickup_eta_mins > a.overall_avg\nORDER BY t.estimated_pickup_eta_mins DESC, trip_id ASC;",
        "explanation": "## Approach\n\nCompute the average ETA in a CTE, then compare each trip against it.\n\n## Query\n\n```sql\nWITH avg_eta AS (\n  SELECT AVG(estimated_pickup_eta_mins) AS overall_avg\n  FROM trips\n  WHERE estimated_pickup_eta_mins IS NOT NULL\n)\nSELECT t.id AS trip_id, t.estimated_pickup_eta_mins\nFROM trips t\nCROSS JOIN avg_eta a\nWHERE t.estimated_pickup_eta_mins > a.overall_avg\nORDER BY t.estimated_pickup_eta_mins DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The CTE returns one row with the overall average ETA.\n- `CROSS JOIN` attaches that single value to each trip row.\n- The outer query filters above-average ETAs.\n\n## Difference from the optimal approach\n\nMore explicit, but longer."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT trip_id, estimated_pickup_eta_mins FROM (SELECT id AS trip_id, estimated_pickup_eta_mins, AVG(estimated_pickup_eta_mins) OVER () AS overall_avg FROM trips WHERE estimated_pickup_eta_mins IS NOT NULL) x WHERE estimated_pickup_eta_mins > overall_avg ORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;",
        "explanation": "## Approach\n\nUse a window function to attach the overall average ETA to every trip row.\n\n## Query\n\n```sql\nSELECT trip_id, estimated_pickup_eta_mins\nFROM (\n  SELECT id AS trip_id,\n         estimated_pickup_eta_mins,\n         AVG(estimated_pickup_eta_mins) OVER () AS overall_avg\n  FROM trips\n  WHERE estimated_pickup_eta_mins IS NOT NULL\n) x\nWHERE estimated_pickup_eta_mins > overall_avg\nORDER BY estimated_pickup_eta_mins DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The window function repeats the same overall average on every row.\n- The outer query keeps trips above that value.\n\n## Difference from the optimal approach\n\nUseful for window-function practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_080",
    "approaches": [
      {
        "approach_title": "Above avg payout",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, ROUND(AVG(net_payout), 2) AS avg_net_payout FROM driver_payouts GROUP BY driver_id HAVING AVG(net_payout) > (SELECT AVG(net_payout) FROM driver_payouts) ORDER BY avg_net_payout DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute average payout per driver, then keep drivers whose average is above the overall payout average.\n\n## Query\n\n```sql\nSELECT driver_id, ROUND(AVG(net_payout), 2) AS avg_net_payout\nFROM driver_payouts\nGROUP BY driver_id\nHAVING AVG(net_payout) > (\n  SELECT AVG(net_payout)\n  FROM driver_payouts\n)\nORDER BY avg_net_payout DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- `AVG(net_payout)` calculates that driver's average payout.\n- The subquery computes the overall average payout across all payout rows.\n- `HAVING` keeps only drivers above that benchmark.\n\n## Why this is optimal\n\nIt expresses the grouped metric and comparison clearly in one query."
      },
      {
        "approach_title": "CTE payout stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_avg AS ( SELECT driver_id, ROUND(AVG(net_payout), 2) AS avg_net_payout, AVG(net_payout) AS raw_avg_net_payout FROM driver_payouts GROUP BY driver_id ), overall_avg AS ( SELECT AVG(net_payout) AS avg_payout FROM driver_payouts ) SELECT d.driver_id, d.avg_net_payout FROM driver_avg d CROSS JOIN overall_avg o WHERE d.raw_avg_net_payout > o.avg_payout ORDER BY d.avg_net_payout DESC, d.driver_id ASC;",
        "explanation": "## Approach\n\nCompute per-driver averages and the overall average in separate CTEs, then compare them.\n\n## Query\n\n```sql\nWITH driver_avg AS (\n  SELECT driver_id,\n         ROUND(AVG(net_payout), 2) AS avg_net_payout,\n         AVG(net_payout) AS raw_avg_net_payout\n  FROM driver_payouts\n  GROUP BY driver_id\n), overall_avg AS (\n  SELECT AVG(net_payout) AS avg_payout\n  FROM driver_payouts\n)\nSELECT d.driver_id, d.avg_net_payout\nFROM driver_avg d\nCROSS JOIN overall_avg o\nWHERE d.raw_avg_net_payout > o.avg_payout\nORDER BY d.avg_net_payout DESC, d.driver_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes one average per driver.\n- The second CTE computes the overall benchmark.\n- The final query compares raw averages, while returning the rounded display value.\n\n## Difference from the optimal approach\n\nMore verbose, but very explicit."
      }
    ]
  },
  {
    "code": "RIDE_081",
    "approaches": [
      {
        "approach_title": "Group by date",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count FROM trips GROUP BY DATE(requested_at) ORDER BY trip_date ASC;",
        "explanation": "## Approach\n\nExtract the date from `requested_at`, group by that date, then count trips.\n\n## Query\n\n```sql\nSELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count\nFROM trips\nGROUP BY DATE(requested_at)\nORDER BY trip_date ASC;\n```\n\n## Explanation\n\n- `DATE(requested_at)` removes the time portion and keeps only the calendar date.\n- `GROUP BY DATE(requested_at)` creates one row per request date.\n- `COUNT(*)` counts how many trips were requested on each date.\n- `ORDER BY trip_date ASC` shows the timeline from oldest to newest.\n\n## Why this is optimal\n\nIt is the most direct and readable way to build daily counts."
      },
      {
        "approach_title": "CTE daily count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH daily_trips AS (\n  SELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY DATE(requested_at)\n)\nSELECT trip_date, trip_count\nFROM daily_trips\nORDER BY trip_date ASC;",
        "explanation": "## Approach\n\nCompute daily trip counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH daily_trips AS (\n  SELECT DATE(requested_at) AS trip_date, COUNT(*) AS trip_count\n  FROM trips\n  GROUP BY DATE(requested_at)\n)\nSELECT trip_date, trip_count\nFROM daily_trips\nORDER BY trip_date ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per trip date.\n- The outer query handles presentation only.\n\n## Difference from the optimal approach\n\nMore modular, but longer than necessary."
      },
      {
        "approach_title": "Date trunc day",
        "approach_type": "date_time",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DATE_TRUNC('day', requested_at)::date AS trip_date, COUNT(*) AS trip_count FROM trips GROUP BY DATE_TRUNC('day', requested_at)::date ORDER BY trip_date ASC;",
        "explanation": "## Approach\n\nTruncate timestamps to day level before grouping.\n\n## Query\n\n```sql\nSELECT DATE_TRUNC('day', requested_at)::date AS trip_date, COUNT(*) AS trip_count\nFROM trips\nGROUP BY DATE_TRUNC('day', requested_at)::date\nORDER BY trip_date ASC;\n```\n\n## Explanation\n\n- `DATE_TRUNC('day', requested_at)` resets the time to midnight.\n- Casting to `date` gives a clean date value for output.\n- Grouping and counting then works the same way as the direct date extraction approach.\n\n## Difference from the optimal approach\n\nCorrect, but slightly more verbose."
      }
    ]
  },
  {
    "code": "RIDE_082",
    "approaches": [
      {
        "approach_title": "FILTER counts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > 0 AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') > 0 ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nGroup trips by driver, count completed and cancelled trips separately, then keep drivers who have both.\n\n## Query\n\n```sql\nSELECT driver_id,\n       COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips,\n       COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\nFROM trips\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING COUNT(*) FILTER (WHERE trip_status = 'completed') > 0\n   AND COUNT(*) FILTER (WHERE trip_status = 'cancelled') > 0\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- The filtered counts separately count completed and cancelled trips.\n- The `HAVING` clause keeps only drivers with at least one of each.\n\n## Why this is optimal\n\nIt solves the full requirement in one grouped query and is easy to read."
      },
      {
        "approach_title": "CTE trip stats",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_trip_stats AS (\n  SELECT driver_id, COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips, COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, completed_trips, cancelled_trips\nFROM driver_trip_stats\nWHERE completed_trips > 0 AND cancelled_trips > 0\nORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nCompute both trip counts in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH driver_trip_stats AS (\n  SELECT driver_id,\n         COUNT(*) FILTER (WHERE trip_status = 'completed') AS completed_trips,\n         COUNT(*) FILTER (WHERE trip_status = 'cancelled') AS cancelled_trips\n  FROM trips\n  WHERE driver_id IS NOT NULL\n  GROUP BY driver_id\n)\nSELECT driver_id, completed_trips, cancelled_trips\nFROM driver_trip_stats\nWHERE completed_trips > 0 AND cancelled_trips > 0\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per driver with both counts.\n- The outer query keeps only the drivers who satisfy both conditions.\n\n## Difference from the optimal approach\n\nMore verbose, but easy to extend."
      },
      {
        "approach_title": "CASE counts",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) AS completed_trips, SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips FROM trips WHERE driver_id IS NOT NULL GROUP BY driver_id HAVING SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) > 0 ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nUse `CASE` expressions to count completed and cancelled trips per driver.\n\n## Query\n\n```sql\nSELECT driver_id,\n       SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) AS completed_trips,\n       SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_trips\nFROM trips\nWHERE driver_id IS NOT NULL\nGROUP BY driver_id\nHAVING SUM(CASE WHEN trip_status = 'completed' THEN 1 ELSE 0 END) > 0\n   AND SUM(CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END) > 0\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- Each `CASE` turns matching rows into `1` and all others into `0`.\n- Summing those values gives the per-driver counts.\n- The `HAVING` clause checks that both counts are positive.\n\n## Difference from the optimal approach\n\nCorrect, but `FILTER` is cleaner in PostgreSQL."
      }
    ]
  },
  {
    "code": "RIDE_083",
    "approaches": [
      {
        "approach_title": "CASE group",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' GROUP BY CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END ORDER BY promo_usage ASC;",
        "explanation": "## Approach\n\nLabel completed trips as promo or no-promo, group by that label, then average fare.\n\n## Query\n\n```sql\nSELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage,\n       ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed'\nGROUP BY CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END\nORDER BY promo_usage ASC;\n```\n\n## Explanation\n\n- The `CASE` expression creates two buckets: `promo` and `no_promo`.\n- Only completed trips are included.\n- `AVG(total_fare)` calculates the average fare for each bucket.\n\n## Why this is optimal\n\nIt directly expresses the comparison the question asks for."
      },
      {
        "approach_title": "CTE promo flag",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH fare_groups AS (\n  SELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage, total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM fare_groups\nGROUP BY promo_usage\nORDER BY promo_usage ASC;",
        "explanation": "## Approach\n\nCreate promo buckets in a CTE first, then average fares by bucket.\n\n## Query\n\n```sql\nWITH fare_groups AS (\n  SELECT CASE WHEN promo_id IS NOT NULL THEN 'promo' ELSE 'no_promo' END AS promo_usage,\n         total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM fare_groups\nGROUP BY promo_usage\nORDER BY promo_usage ASC;\n```\n\n## Explanation\n\n- The CTE prepares the labeled rows.\n- The outer query calculates one average per label.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Union compare",
        "approach_type": "set_operation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT 'promo' AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND promo_id IS NOT NULL UNION ALL SELECT 'no_promo' AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare FROM trips WHERE trip_status = 'completed' AND promo_id IS NULL ORDER BY promo_usage ASC;",
        "explanation": "## Approach\n\nCompute the two averages separately, then combine them.\n\n## Query\n\n```sql\nSELECT 'promo' AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed' AND promo_id IS NOT NULL\nUNION ALL\nSELECT 'no_promo' AS promo_usage, ROUND(AVG(total_fare), 2) AS avg_fare\nFROM trips\nWHERE trip_status = 'completed' AND promo_id IS NULL\nORDER BY promo_usage ASC;\n```\n\n## Explanation\n\n- The first query computes the promo average.\n- The second query computes the no-promo average.\n- `UNION ALL` stacks the two result rows together.\n\n## Difference from the optimal approach\n\nWorks fine, but repeats the same table scan logic twice."
      }
    ]
  },
  {
    "code": "RIDE_084",
    "approaches": [
      {
        "approach_title": "Avg from ratings",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating FROM ratings GROUP BY driver_id ORDER BY avg_rating DESC, driver_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup ratings by driver, average them, then keep the top 5.\n\n## Query\n\n```sql\nSELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM ratings\nGROUP BY driver_id\nORDER BY avg_rating DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY driver_id` creates one row per driver.\n- `AVG(rating)` computes the driver's review-based average.\n- `ROUND(..., 2)` formats the result.\n- `LIMIT 5` returns only the top 5 drivers.\n\n## Why this is optimal\n\nIt directly uses the ratings table as required by the question."
      },
      {
        "approach_title": "CTE top ratings",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_ratings AS (\n  SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating\n  FROM ratings\n  GROUP BY driver_id\n)\nSELECT driver_id, avg_rating\nFROM driver_ratings\nORDER BY avg_rating DESC, driver_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute average ratings in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH driver_ratings AS (\n  SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating\n  FROM ratings\n  GROUP BY driver_id\n)\nSELECT driver_id, avg_rating\nFROM driver_ratings\nORDER BY avg_rating DESC, driver_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one average row per driver.\n- The outer query handles ranking and output.\n\n## Difference from the optimal approach\n\nLonger, but easy to extend."
      },
      {
        "approach_title": "Rank averages",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, avg_rating FROM (SELECT driver_id, ROUND(AVG(rating), 2) AS avg_rating, ROW_NUMBER() OVER (ORDER BY AVG(rating) DESC, driver_id ASC) AS rn FROM ratings GROUP BY driver_id) x WHERE rn <= 5 ORDER BY avg_rating DESC, driver_id ASC;",
        "explanation": "## Approach\n\nAggregate driver averages, rank them, then keep the first 5.\n\n## Query\n\n```sql\nSELECT driver_id, avg_rating\nFROM (\n  SELECT driver_id,\n         ROUND(AVG(rating), 2) AS avg_rating,\n         ROW_NUMBER() OVER (ORDER BY AVG(rating) DESC, driver_id ASC) AS rn\n  FROM ratings\n  GROUP BY driver_id\n) x\nWHERE rn <= 5\nORDER BY avg_rating DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes one average rating per driver.\n- `ROW_NUMBER()` ranks the grouped rows.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful for ranking practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_085",
    "approaches": [
      {
        "approach_title": "Top saved places",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS saved_place_count FROM rider_saved_places GROUP BY user_id ORDER BY saved_place_count DESC, user_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nGroup saved places by rider, count them, then keep the top 5.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS saved_place_count\nFROM rider_saved_places\nGROUP BY user_id\nORDER BY saved_place_count DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY user_id` creates one row per rider.\n- `COUNT(*)` gives the number of saved places for each rider.\n- Sorting descending finds the riders with the most saved places.\n- `LIMIT 5` returns the top 5.\n\n## Why this is optimal\n\nThis is the most direct top-N grouped count query."
      },
      {
        "approach_title": "CTE top users",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH saved_place_counts AS (\n  SELECT user_id, COUNT(*) AS saved_place_count\n  FROM rider_saved_places\n  GROUP BY user_id\n)\nSELECT user_id, saved_place_count\nFROM saved_place_counts\nORDER BY saved_place_count DESC, user_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute saved-place counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH saved_place_counts AS (\n  SELECT user_id, COUNT(*) AS saved_place_count\n  FROM rider_saved_places\n  GROUP BY user_id\n)\nSELECT user_id, saved_place_count\nFROM saved_place_counts\nORDER BY saved_place_count DESC, user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE builds one row per rider.\n- The outer query handles the final ranking.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank riders",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, saved_place_count FROM (SELECT user_id, COUNT(*) AS saved_place_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn FROM rider_saved_places GROUP BY user_id) x WHERE rn <= 5 ORDER BY saved_place_count DESC, user_id ASC;",
        "explanation": "## Approach\n\nAggregate rider counts, rank them, then keep the first 5.\n\n## Query\n\n```sql\nSELECT user_id, saved_place_count\nFROM (\n  SELECT user_id,\n         COUNT(*) AS saved_place_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, user_id ASC) AS rn\n  FROM rider_saved_places\n  GROUP BY user_id\n) x\nWHERE rn <= 5\nORDER BY saved_place_count DESC, user_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes saved-place totals per rider.\n- `ROW_NUMBER()` ranks those grouped rows.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nCorrect, but more complex than needed."
      }
    ]
  },
  {
    "code": "RIDE_086",
    "approaches": [
      {
        "approach_title": "Group by city",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT registration_city, COUNT(*) AS vehicle_count FROM vehicles GROUP BY registration_city ORDER BY vehicle_count DESC, registration_city ASC;",
        "explanation": "## Approach\n\nGroup vehicles by registration city and count them.\n\n## Query\n\n```sql\nSELECT registration_city, COUNT(*) AS vehicle_count\nFROM vehicles\nGROUP BY registration_city\nORDER BY vehicle_count DESC, registration_city ASC;\n```\n\n## Explanation\n\n- `GROUP BY registration_city` creates one row per city.\n- `COUNT(*)` counts vehicles registered in each city.\n- Sorting matches the expected output order.\n\n## Why this is optimal\n\nIt is the standard grouped count solution."
      },
      {
        "approach_title": "CTE city count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_counts AS (\n  SELECT registration_city, COUNT(*) AS vehicle_count\n  FROM vehicles\n  GROUP BY registration_city\n)\nSELECT registration_city, vehicle_count\nFROM city_counts\nORDER BY vehicle_count DESC, registration_city ASC;",
        "explanation": "## Approach\n\nCompute grouped vehicle counts in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH city_counts AS (\n  SELECT registration_city, COUNT(*) AS vehicle_count\n  FROM vehicles\n  GROUP BY registration_city\n)\nSELECT registration_city, vehicle_count\nFROM city_counts\nORDER BY vehicle_count DESC, registration_city ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per registration city.\n- The outer query presents the result.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT registration_city, COUNT(*) OVER (PARTITION BY registration_city) AS vehicle_count FROM vehicles ORDER BY vehicle_count DESC, registration_city ASC;",
        "explanation": "## Approach\n\nUse a window count per registration city, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT registration_city,\n       COUNT(*) OVER (PARTITION BY registration_city) AS vehicle_count\nFROM vehicles\nORDER BY vehicle_count DESC, registration_city ASC;\n```\n\n## Explanation\n\n- The window function repeats each city count on every row in that city.\n- `DISTINCT` collapses duplicate rows.\n\n## Difference from the optimal approach\n\nCorrect, but more complex than `GROUP BY`."
      }
    ]
  },
  {
    "code": "RIDE_087",
    "approaches": [
      {
        "approach_title": "Join drop zones",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS surge_zone_dropoff_trips FROM trips t JOIN locations l ON l.id = t.dropoff_location_id WHERE l.is_surge_zone = true;",
        "explanation": "## Approach\n\nJoin trips to dropoff locations, then count trips whose dropoff location is marked as a surge zone.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS surge_zone_dropoff_trips\nFROM trips t\nJOIN locations l ON l.id = t.dropoff_location_id\nWHERE l.is_surge_zone = true;\n```\n\n## Explanation\n\n- `dropoff_location_id` links each trip to its dropoff location.\n- `locations.is_surge_zone` tells whether that location is a surge zone.\n- The filter keeps only surge-zone dropoffs.\n- `COUNT(*)` returns how many such trips exist.\n\n## Why this is optimal\n\nIt directly joins the needed lookup table and counts matching trips."
      },
      {
        "approach_title": "CTE surge dropoffs",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH surge_dropoffs AS (\n  SELECT t.id\n  FROM trips t\n  JOIN locations l ON l.id = t.dropoff_location_id\n  WHERE l.is_surge_zone = true\n)\nSELECT COUNT(*) AS surge_zone_dropoff_trips\nFROM surge_dropoffs;",
        "explanation": "## Approach\n\nCollect matching trips in a CTE, then count them.\n\n## Query\n\n```sql\nWITH surge_dropoffs AS (\n  SELECT t.id\n  FROM trips t\n  JOIN locations l ON l.id = t.dropoff_location_id\n  WHERE l.is_surge_zone = true\n)\nSELECT COUNT(*) AS surge_zone_dropoff_trips\nFROM surge_dropoffs;\n```\n\n## Explanation\n\n- The CTE isolates trips ending in surge zones.\n- The outer query counts those rows.\n\n## Difference from the optimal approach\n\nMore verbose, but clear."
      },
      {
        "approach_title": "IN subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) AS surge_zone_dropoff_trips FROM trips WHERE dropoff_location_id IN (SELECT id FROM locations WHERE is_surge_zone = true);",
        "explanation": "## Approach\n\nFind surge-zone location ids first, then count trips whose dropoff is in that set.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS surge_zone_dropoff_trips\nFROM trips\nWHERE dropoff_location_id IN (\n  SELECT id\n  FROM locations\n  WHERE is_surge_zone = true\n);\n```\n\n## Explanation\n\n- The subquery returns ids of surge-zone locations.\n- The outer query counts trips whose dropoff matches one of those ids.\n\n## Difference from the optimal approach\n\nCorrect, but the join version is more explicit about the relationship."
      }
    ]
  },
  {
    "code": "RIDE_088",
    "approaches": [
      {
        "approach_title": "Join and avg",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes FROM driver_shifts ds JOIN drivers d ON d.id = ds.driver_id WHERE ds.total_online_minutes IS NOT NULL GROUP BY d.driver_tier ORDER BY avg_online_minutes DESC, d.driver_tier ASC;",
        "explanation": "## Approach\n\nJoin shifts to drivers, then average online minutes by driver tier.\n\n## Query\n\n```sql\nSELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes\nFROM driver_shifts ds\nJOIN drivers d ON d.id = ds.driver_id\nWHERE ds.total_online_minutes IS NOT NULL\nGROUP BY d.driver_tier\nORDER BY avg_online_minutes DESC, d.driver_tier ASC;\n```\n\n## Explanation\n\n- `driver_shifts` contains `total_online_minutes`.\n- `drivers` contains the `driver_tier`.\n- The join attaches each shift to the driver's tier.\n- Grouping by tier creates one average per tier.\n\n## Why this is optimal\n\nIt directly combines the needed tables and calculates the grouped average."
      },
      {
        "approach_title": "CTE tier avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH tier_online AS (\n  SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes\n  FROM driver_shifts ds\n  JOIN drivers d ON d.id = ds.driver_id\n  WHERE ds.total_online_minutes IS NOT NULL\n  GROUP BY d.driver_tier\n)\nSELECT driver_tier, avg_online_minutes\nFROM tier_online\nORDER BY avg_online_minutes DESC, driver_tier ASC;",
        "explanation": "## Approach\n\nCompute average online minutes by tier in a CTE, then sort outside.\n\n## Query\n\n```sql\nWITH tier_online AS (\n  SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes\n  FROM driver_shifts ds\n  JOIN drivers d ON d.id = ds.driver_id\n  WHERE ds.total_online_minutes IS NOT NULL\n  GROUP BY d.driver_tier\n)\nSELECT driver_tier, avg_online_minutes\nFROM tier_online\nORDER BY avg_online_minutes DESC, driver_tier ASC;\n```\n\n## Explanation\n\n- The CTE builds one row per driver tier.\n- The outer query presents the result.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_tier, avg_online_minutes FROM (SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes FROM driver_shifts ds JOIN drivers d ON d.id = ds.driver_id WHERE ds.total_online_minutes IS NOT NULL GROUP BY d.driver_tier) x ORDER BY avg_online_minutes DESC, driver_tier ASC;",
        "explanation": "## Approach\n\nAggregate inside a subquery, then sort outside.\n\n## Query\n\n```sql\nSELECT driver_tier, avg_online_minutes\nFROM (\n  SELECT d.driver_tier, ROUND(AVG(ds.total_online_minutes), 2) AS avg_online_minutes\n  FROM driver_shifts ds\n  JOIN drivers d ON d.id = ds.driver_id\n  WHERE ds.total_online_minutes IS NOT NULL\n  GROUP BY d.driver_tier\n) x\nORDER BY avg_online_minutes DESC, driver_tier ASC;\n```\n\n## Explanation\n\n- The inner query computes the grouped averages.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nIt works, but the wrapper is not needed."
      }
    ]
  },
  {
    "code": "RIDE_089",
    "approaches": [
      {
        "approach_title": "Verified doc count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, COUNT(*) AS verified_document_count FROM driver_documents WHERE verification_status = 'verified' GROUP BY driver_id HAVING COUNT(*) > 2 ORDER BY verified_document_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nFilter verified documents, group by driver, then keep drivers with more than 2 verified documents.\n\n## Query\n\n```sql\nSELECT driver_id, COUNT(*) AS verified_document_count\nFROM driver_documents\nWHERE verification_status = 'verified'\nGROUP BY driver_id\nHAVING COUNT(*) > 2\nORDER BY verified_document_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `verification_status = 'verified'` keeps only verified documents.\n- `GROUP BY driver_id` creates one row per driver.\n- `COUNT(*)` counts verified documents for that driver.\n- `HAVING COUNT(*) > 2` keeps only drivers above the threshold.\n\n## Why this is optimal\n\nIt is the most direct grouped filter solution."
      },
      {
        "approach_title": "CTE doc counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH verified_docs AS (\n  SELECT driver_id, COUNT(*) AS verified_document_count\n  FROM driver_documents\n  WHERE verification_status = 'verified'\n  GROUP BY driver_id\n)\nSELECT driver_id, verified_document_count\nFROM verified_docs\nWHERE verified_document_count > 2\nORDER BY verified_document_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCompute verified-document counts in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH verified_docs AS (\n  SELECT driver_id, COUNT(*) AS verified_document_count\n  FROM driver_documents\n  WHERE verification_status = 'verified'\n  GROUP BY driver_id\n)\nSELECT driver_id, verified_document_count\nFROM verified_docs\nWHERE verified_document_count > 2\nORDER BY verified_document_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The CTE creates one row per driver.\n- The outer query keeps only drivers with more than 2 verified docs.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Window count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT driver_id, verified_document_count FROM (SELECT driver_id, COUNT(*) OVER (PARTITION BY driver_id) AS verified_document_count FROM driver_documents WHERE verification_status = 'verified') x WHERE verified_document_count > 2 ORDER BY verified_document_count DESC, driver_id ASC;",
        "explanation": "## Approach\n\nUse a window count per driver on verified documents, then keep distinct drivers above the threshold.\n\n## Query\n\n```sql\nSELECT DISTINCT driver_id, verified_document_count\nFROM (\n  SELECT driver_id,\n         COUNT(*) OVER (PARTITION BY driver_id) AS verified_document_count\n  FROM driver_documents\n  WHERE verification_status = 'verified'\n) x\nWHERE verified_document_count > 2\nORDER BY verified_document_count DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The window function repeats each driver's verified-doc count on every matching row.\n- `DISTINCT` collapses duplicates.\n- The outer filter keeps counts above 2.\n\n## Difference from the optimal approach\n\nCorrect, but more complex than `GROUP BY` and `HAVING`."
      }
    ]
  },
  {
    "code": "RIDE_090",
    "approaches": [
      {
        "approach_title": "Top discount codes",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.code, SUM(t.discount_amount) AS total_discount_given FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code ORDER BY total_discount_given DESC, p.code ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin promo trips to promo codes, sum discount amounts by code, then keep the top 5.\n\n## Query\n\n```sql\nSELECT p.code, SUM(t.discount_amount) AS total_discount_given\nFROM trips t\nJOIN promos p ON p.id = t.promo_id\nWHERE t.promo_id IS NOT NULL\nGROUP BY p.code\nORDER BY total_discount_given DESC, p.code ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `trips` contains the discount amount applied.\n- `promos` contains the promo code text.\n- The join links each trip to its promo.\n- `SUM(t.discount_amount)` calculates total discount given per code.\n- `LIMIT 5` returns the top 5 promo codes.\n\n## Why this is optimal\n\nIt directly combines the required tables and computes the requested ranking."
      },
      {
        "approach_title": "CTE top codes",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH promo_totals AS (\n  SELECT p.code, SUM(t.discount_amount) AS total_discount_given\n  FROM trips t\n  JOIN promos p ON p.id = t.promo_id\n  WHERE t.promo_id IS NOT NULL\n  GROUP BY p.code\n)\nSELECT code, total_discount_given\nFROM promo_totals\nORDER BY total_discount_given DESC, code ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute total discount by code in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH promo_totals AS (\n  SELECT p.code, SUM(t.discount_amount) AS total_discount_given\n  FROM trips t\n  JOIN promos p ON p.id = t.promo_id\n  WHERE t.promo_id IS NOT NULL\n  GROUP BY p.code\n)\nSELECT code, total_discount_given\nFROM promo_totals\nORDER BY total_discount_given DESC, code ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE creates one row per promo code.\n- The outer query returns the top 5 rows.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Rank codes",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT code, total_discount_given FROM (SELECT p.code, SUM(t.discount_amount) AS total_discount_given, ROW_NUMBER() OVER (ORDER BY SUM(t.discount_amount) DESC, p.code ASC) AS rn FROM trips t JOIN promos p ON p.id = t.promo_id WHERE t.promo_id IS NOT NULL GROUP BY p.code) x WHERE rn <= 5 ORDER BY total_discount_given DESC, code ASC;",
        "explanation": "## Approach\n\nAggregate discount totals, rank promo codes, then keep the first 5.\n\n## Query\n\n```sql\nSELECT code, total_discount_given\nFROM (\n  SELECT p.code,\n         SUM(t.discount_amount) AS total_discount_given,\n         ROW_NUMBER() OVER (ORDER BY SUM(t.discount_amount) DESC, p.code ASC) AS rn\n  FROM trips t\n  JOIN promos p ON p.id = t.promo_id\n  WHERE t.promo_id IS NOT NULL\n  GROUP BY p.code\n) x\nWHERE rn <= 5\nORDER BY total_discount_given DESC, code ASC;\n```\n\n## Explanation\n\n- The grouped query computes total discount per promo code.\n- `ROW_NUMBER()` ranks those grouped rows.\n- The outer query keeps the top 5.\n\n## Difference from the optimal approach\n\nUseful for rank practice, but more complex."
      }
    ]
  },
  {
    "code": "RIDE_091",
    "approaches": [
      {
        "approach_title": "RANK fares",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, id AS trip_id, total_fare, RANK() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;",
        "explanation": "## Approach\n\nFor each driver, rank completed trips by fare using a window function.\n\n## Query\n\n```sql\nSELECT driver_id,\n       id AS trip_id,\n       total_fare,\n       RANK() OVER (\n         PARTITION BY driver_id\n         ORDER BY total_fare DESC, id ASC\n       ) AS fare_rank\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nORDER BY driver_id ASC, fare_rank ASC;\n```\n\n## Explanation\n\n- `PARTITION BY driver_id` restarts the ranking for each driver.\n- `ORDER BY total_fare DESC` ranks higher fares first.\n- `id ASC` gives stable tie ordering.\n- `RANK()` gives the same rank to ties and skips the next rank.\n\n## Why this is optimal\n\nThis is exactly what window functions are built for: ranking rows within each group."
      },
      {
        "approach_title": "DENSE_RANK fares",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT driver_id, id AS trip_id, total_fare, DENSE_RANK() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` instead of `RANK()` to rank fares within each driver.\n\n## Query\n\n```sql\nSELECT driver_id,\n       id AS trip_id,\n       total_fare,\n       DENSE_RANK() OVER (\n         PARTITION BY driver_id\n         ORDER BY total_fare DESC, id ASC\n       ) AS fare_rank\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nORDER BY driver_id ASC, fare_rank ASC;\n```\n\n## Explanation\n\n- `DENSE_RANK()` behaves like `RANK()` for ties.\n- The difference is that it does not leave gaps after ties.\n- It is close, but not identical to the requested ranking behavior if gaps matter.\n\n## Difference from the optimal approach\n\nGood alternative for dense ranking, but `RANK()` matches the original question more directly."
      },
      {
        "approach_title": "ROW_NUMBER fares",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed' AND driver_id IS NOT NULL ORDER BY driver_id ASC, fare_rank ASC;",
        "explanation": "## Approach\n\nAssign a unique sequence number to each trip inside each driver's partition.\n\n## Query\n\n```sql\nSELECT driver_id,\n       id AS trip_id,\n       total_fare,\n       ROW_NUMBER() OVER (\n         PARTITION BY driver_id\n         ORDER BY total_fare DESC, id ASC\n       ) AS fare_rank\nFROM trips\nWHERE trip_status = 'completed'\n  AND driver_id IS NOT NULL\nORDER BY driver_id ASC, fare_rank ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` always gives unique numbers.\n- Even equal fares will get different ranks.\n- This is useful when you want strict ordering without ties.\n\n## Difference from the optimal approach\n\nIt does not preserve tie ranks like `RANK()`."
      }
    ]
  },
  {
    "code": "RIDE_092",
    "approaches": [
      {
        "approach_title": "Running SUM",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, id AS trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_spend FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC, requested_at ASC, trip_id ASC;",
        "explanation": "## Approach\n\nUse a running window sum over each rider's completed trips ordered by request time.\n\n## Query\n\n```sql\nSELECT user_id,\n       id AS trip_id,\n       requested_at,\n       total_fare,\n       SUM(total_fare) OVER (\n         PARTITION BY user_id\n         ORDER BY requested_at, id\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_total_spend\nFROM trips\nWHERE trip_status = 'completed'\nORDER BY user_id ASC, requested_at ASC, trip_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY user_id` restarts the running total for each rider.\n- `ORDER BY requested_at, id` defines trip sequence.\n- The frame from the first row to the current row creates a cumulative total.\n\n## Why this is optimal\n\nA running total is a textbook window-sum problem."
      },
      {
        "approach_title": "Default frame sum",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id, id AS trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id) AS running_total_spend FROM trips WHERE trip_status = 'completed' ORDER BY user_id ASC, requested_at ASC, trip_id ASC;",
        "explanation": "## Approach\n\nUse a cumulative window sum without writing the frame explicitly.\n\n## Query\n\n```sql\nSELECT user_id,\n       id AS trip_id,\n       requested_at,\n       total_fare,\n       SUM(total_fare) OVER (\n         PARTITION BY user_id\n         ORDER BY requested_at, id\n       ) AS running_total_spend\nFROM trips\nWHERE trip_status = 'completed'\nORDER BY user_id ASC, requested_at ASC, trip_id ASC;\n```\n\n## Explanation\n\n- PostgreSQL usually treats this as a running total when an order is present.\n- It is shorter and often returns the same result.\n\n## Difference from the optimal approach\n\nThe explicit frame is clearer for learners and removes ambiguity."
      },
      {
        "approach_title": "CTE ordered sum",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_trips AS (SELECT user_id, id AS trip_id, requested_at, total_fare FROM trips WHERE trip_status = 'completed') SELECT user_id, trip_id, requested_at, total_fare, SUM(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, trip_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_spend FROM completed_trips ORDER BY user_id ASC, requested_at ASC, trip_id ASC;",
        "explanation": "## Approach\n\nPut completed trips in a CTE first, then compute the running total.\n\n## Query\n\n```sql\nWITH completed_trips AS (\n  SELECT user_id, id AS trip_id, requested_at, total_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT user_id,\n       trip_id,\n       requested_at,\n       total_fare,\n       SUM(total_fare) OVER (\n         PARTITION BY user_id\n         ORDER BY requested_at, trip_id\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_total_spend\nFROM completed_trips\nORDER BY user_id ASC, requested_at ASC, trip_id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the relevant rows.\n- The window function then computes the cumulative spend.\n\n## Difference from the optimal approach\n\nSame idea, but more verbose."
      }
    ]
  },
  {
    "code": "RIDE_093",
    "approaches": [
      {
        "approach_title": "DENSE_RANK payout",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout, DENSE_RANK() OVER (ORDER BY SUM(net_payout) DESC) AS payout_rank FROM driver_payouts GROUP BY driver_id) x WHERE payout_rank = 2 ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nCompute total payout per driver, rank those totals, then return rank 2.\n\n## Query\n\n```sql\nSELECT driver_id, total_payout\nFROM (\n  SELECT driver_id,\n         SUM(net_payout) AS total_payout,\n         DENSE_RANK() OVER (ORDER BY SUM(net_payout) DESC) AS payout_rank\n  FROM driver_payouts\n  GROUP BY driver_id\n) x\nWHERE payout_rank = 2\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- First, each driver's total payout is calculated.\n- `DENSE_RANK()` ranks unique payout totals from highest to lowest.\n- Rank `2` means second highest distinct payout.\n\n## Why this is optimal\n\nIt correctly handles ties in the top payout values."
      },
      {
        "approach_title": "CTE ranked payout",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH payout_totals AS (SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id), ranked_payouts AS (SELECT driver_id, total_payout, DENSE_RANK() OVER (ORDER BY total_payout DESC) AS payout_rank FROM payout_totals) SELECT driver_id, total_payout FROM ranked_payouts WHERE payout_rank = 2 ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nSplit the problem into two steps: total payout first, then ranking.\n\n## Query\n\n```sql\nWITH payout_totals AS (\n  SELECT driver_id, SUM(net_payout) AS total_payout\n  FROM driver_payouts\n  GROUP BY driver_id\n), ranked_payouts AS (\n  SELECT driver_id,\n         total_payout,\n         DENSE_RANK() OVER (ORDER BY total_payout DESC) AS payout_rank\n  FROM payout_totals\n)\nSELECT driver_id, total_payout\nFROM ranked_payouts\nWHERE payout_rank = 2\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes total payout per driver.\n- The second CTE ranks those totals.\n- The final query filters to rank 2.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "Distinct max below top",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT driver_id, total_payout FROM (SELECT driver_id, SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id) x WHERE total_payout = (SELECT MAX(total_payout) FROM (SELECT SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id) y WHERE total_payout < (SELECT MAX(total_payout) FROM (SELECT SUM(net_payout) AS total_payout FROM driver_payouts GROUP BY driver_id) z)) ORDER BY driver_id ASC;",
        "explanation": "## Approach\n\nFind the largest payout that is smaller than the top payout, then return matching drivers.\n\n## Query\n\n```sql\nSELECT driver_id, total_payout\nFROM (\n  SELECT driver_id, SUM(net_payout) AS total_payout\n  FROM driver_payouts\n  GROUP BY driver_id\n) x\nWHERE total_payout = (\n  SELECT MAX(total_payout)\n  FROM (\n    SELECT SUM(net_payout) AS total_payout\n    FROM driver_payouts\n    GROUP BY driver_id\n  ) y\n  WHERE total_payout < (\n    SELECT MAX(total_payout)\n    FROM (\n      SELECT SUM(net_payout) AS total_payout\n      FROM driver_payouts\n      GROUP BY driver_id\n    ) z\n  )\n)\nORDER BY driver_id ASC;\n```\n\n## Explanation\n\n- The innermost query finds the highest payout.\n- The next layer finds the maximum payout below that.\n- The outer query returns drivers with that value.\n\n## Difference from the optimal approach\n\nCorrect, but much harder to read than ranking."
      }
    ]
  },
  {
    "code": "RIDE_094",
    "approaches": [
      {
        "approach_title": "LAG gap",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, MAX(gap_minutes) AS max_gap_minutes FROM (SELECT user_id, EXTRACT(EPOCH FROM (requested_at - LAG(requested_at) OVER (PARTITION BY user_id ORDER BY requested_at))) / 60 AS gap_minutes FROM trips) x GROUP BY user_id ORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;",
        "explanation": "## Approach\n\nUse `LAG()` to compare each trip request with the previous request from the same rider, then take the maximum gap.\n\n## Query\n\n```sql\nSELECT user_id, MAX(gap_minutes) AS max_gap_minutes\nFROM (\n  SELECT user_id,\n         EXTRACT(EPOCH FROM (\n           requested_at - LAG(requested_at) OVER (\n             PARTITION BY user_id\n             ORDER BY requested_at\n           )\n         )) / 60 AS gap_minutes\n  FROM trips\n) x\nGROUP BY user_id\nORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;\n```\n\n## Explanation\n\n- `LAG(requested_at)` returns the previous trip time for the same rider.\n- Subtracting timestamps gives the gap between consecutive trips.\n- `EXTRACT(EPOCH ...) / 60` converts that interval to minutes.\n- `MAX(gap_minutes)` keeps the longest gap per rider.\n\n## Why this is optimal\n\nThis is the cleanest and most reliable way to solve consecutive-gap problems."
      },
      {
        "approach_title": "CTE with lag",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH trip_gaps AS (SELECT user_id, EXTRACT(EPOCH FROM (requested_at - LAG(requested_at) OVER (PARTITION BY user_id ORDER BY requested_at))) / 60 AS gap_minutes FROM trips) SELECT user_id, MAX(gap_minutes) AS max_gap_minutes FROM trip_gaps GROUP BY user_id ORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;",
        "explanation": "## Approach\n\nCompute row-level gaps in a CTE, then aggregate outside.\n\n## Query\n\n```sql\nWITH trip_gaps AS (\n  SELECT user_id,\n         EXTRACT(EPOCH FROM (\n           requested_at - LAG(requested_at) OVER (\n             PARTITION BY user_id\n             ORDER BY requested_at\n           )\n         )) / 60 AS gap_minutes\n  FROM trips\n)\nSELECT user_id, MAX(gap_minutes) AS max_gap_minutes\nFROM trip_gaps\nGROUP BY user_id\nORDER BY max_gap_minutes DESC NULLS LAST, user_id ASC;\n```\n\n## Explanation\n\n- The CTE computes each rider's gap from the previous trip.\n- The outer query keeps the largest gap for each rider.\n\n## Difference from the optimal approach\n\nSame logic, but split into named steps."
      },
      {
        "approach_title": "Fixed lateral join",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT t1.user_id, MAX(EXTRACT(EPOCH FROM (t1.requested_at - t2.prev_requested_at)) / 60) AS max_gap_minutes FROM trips t1 LEFT JOIN LATERAL (SELECT t.requested_at AS prev_requested_at FROM trips t WHERE t.user_id = t1.user_id AND t.requested_at < t1.requested_at ORDER BY t.requested_at DESC LIMIT 1) t2 ON true GROUP BY t1.user_id ORDER BY max_gap_minutes DESC NULLS LAST, t1.user_id ASC;",
        "explanation": "## Approach\n\nFor each trip, find the immediately previous trip for the same rider using a lateral join, then take the maximum gap.\n\n## Query\n\n```sql\nSELECT t1.user_id,\n       MAX(EXTRACT(EPOCH FROM (t1.requested_at - t2.prev_requested_at)) / 60) AS max_gap_minutes\nFROM trips t1\nLEFT JOIN LATERAL (\n  SELECT t.requested_at AS prev_requested_at\n  FROM trips t\n  WHERE t.user_id = t1.user_id\n    AND t.requested_at < t1.requested_at\n  ORDER BY t.requested_at DESC\n  LIMIT 1\n) t2 ON true\nGROUP BY t1.user_id\nORDER BY max_gap_minutes DESC NULLS LAST, t1.user_id ASC;\n```\n\n## Explanation\n\n- The earlier failure happened because `JOIN LATERAL` removed the first trip for each rider, so riders with only one trip disappeared.\n- `LEFT JOIN LATERAL` keeps every trip row, even when no previous trip exists.\n- For a rider's first trip, `prev_requested_at` is `NULL`, so the gap is `NULL`.\n- `MAX(...)` then returns the longest real gap if one exists, or `NULL` if the rider has only one trip.\n\n## Difference from the optimal approach\n\nIt now returns the correct row count, but `LAG()` is still much simpler and more idiomatic."
      }
    ]
  },
  {
    "code": "RIDE_095",
    "approaches": [
      {
        "approach_title": "Rank daily earnings",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payout_date, driver_id, daily_earnings, RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) x ORDER BY payout_date ASC, earnings_rank ASC;",
        "explanation": "## Approach\n\nFirst compute each driver's total payout per day, then rank drivers within each day.\n\n## Query\n\n```sql\nSELECT payout_date,\n       driver_id,\n       daily_earnings,\n       RANK() OVER (\n         PARTITION BY payout_date\n         ORDER BY daily_earnings DESC, driver_id ASC\n       ) AS earnings_rank\nFROM (\n  SELECT DATE(created_at) AS payout_date,\n         driver_id,\n         SUM(net_payout) AS daily_earnings\n  FROM driver_payouts\n  GROUP BY DATE(created_at), driver_id\n) x\nORDER BY payout_date ASC, earnings_rank ASC;\n```\n\n## Explanation\n\n- The inner query builds daily payout totals per driver.\n- `PARTITION BY payout_date` restarts ranking each day.\n- `ORDER BY daily_earnings DESC` ranks highest earners first.\n- `RANK()` preserves ties.\n\n## Why this is optimal\n\nThis is the clearest two-step solution: aggregate first, then rank."
      },
      {
        "approach_title": "CTE daily rank",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH daily_totals AS (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) SELECT payout_date, driver_id, daily_earnings, RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM daily_totals ORDER BY payout_date ASC, earnings_rank ASC;",
        "explanation": "## Approach\n\nCompute daily totals in a CTE, then apply the ranking in the final query.\n\n## Query\n\n```sql\nWITH daily_totals AS (\n  SELECT DATE(created_at) AS payout_date,\n         driver_id,\n         SUM(net_payout) AS daily_earnings\n  FROM driver_payouts\n  GROUP BY DATE(created_at), driver_id\n)\nSELECT payout_date,\n       driver_id,\n       daily_earnings,\n       RANK() OVER (\n         PARTITION BY payout_date\n         ORDER BY daily_earnings DESC, driver_id ASC\n       ) AS earnings_rank\nFROM daily_totals\nORDER BY payout_date ASC, earnings_rank ASC;\n```\n\n## Explanation\n\n- The CTE isolates daily totals.\n- The final query ranks drivers within each day.\n\n## Difference from the optimal approach\n\nVery readable, but slightly longer."
      },
      {
        "approach_title": "DENSE_RANK daily",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT payout_date, driver_id, daily_earnings, DENSE_RANK() OVER (PARTITION BY payout_date ORDER BY daily_earnings DESC, driver_id ASC) AS earnings_rank FROM (SELECT DATE(created_at) AS payout_date, driver_id, SUM(net_payout) AS daily_earnings FROM driver_payouts GROUP BY DATE(created_at), driver_id) x ORDER BY payout_date ASC, earnings_rank ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` instead of `RANK()` after computing daily totals.\n\n## Query\n\n```sql\nSELECT payout_date,\n       driver_id,\n       daily_earnings,\n       DENSE_RANK() OVER (\n         PARTITION BY payout_date\n         ORDER BY daily_earnings DESC, driver_id ASC\n       ) AS earnings_rank\nFROM (\n  SELECT DATE(created_at) AS payout_date,\n         driver_id,\n         SUM(net_payout) AS daily_earnings\n  FROM driver_payouts\n  GROUP BY DATE(created_at), driver_id\n) x\nORDER BY payout_date ASC, earnings_rank ASC;\n```\n\n## Explanation\n\n- This produces dense ranks without gaps after ties.\n- It is very similar to the optimal solution.\n\n## Difference from the optimal approach\n\nGood alternative, but `RANK()` matches the original question more directly."
      }
    ]
  },
  {
    "code": "RIDE_096",
    "approaches": [
      {
        "approach_title": "Top 3 row number",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, trip_id, total_fare FROM (SELECT ride_type, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') x WHERE rn <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nRank completed trips within each ride type, then keep the first 3 rows per type.\n\n## Query\n\n```sql\nSELECT ride_type, trip_id, total_fare\nFROM (\n  SELECT ride_type,\n         id AS trip_id,\n         total_fare,\n         ROW_NUMBER() OVER (\n           PARTITION BY ride_type\n           ORDER BY total_fare DESC, id ASC\n         ) AS rn\n  FROM trips\n  WHERE trip_status = 'completed'\n) x\nWHERE rn <= 3\nORDER BY ride_type ASC, total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- `PARTITION BY ride_type` restarts numbering for each ride type.\n- `ORDER BY total_fare DESC` puts the highest fares first.\n- `ROW_NUMBER()` gives each row a unique position.\n- Filtering to `rn <= 3` keeps the top 3 trips per type.\n\n## Why this is optimal\n\n`ROW_NUMBER()` is the standard way to do top-N per group."
      },
      {
        "approach_title": "CTE top 3",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ranked_trips AS (SELECT ride_type, id AS trip_id, total_fare, ROW_NUMBER() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS rn FROM trips WHERE trip_status = 'completed') SELECT ride_type, trip_id, total_fare FROM ranked_trips WHERE rn <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nRank trips in a CTE, then filter to the top 3 outside.\n\n## Query\n\n```sql\nWITH ranked_trips AS (\n  SELECT ride_type,\n         id AS trip_id,\n         total_fare,\n         ROW_NUMBER() OVER (\n           PARTITION BY ride_type\n           ORDER BY total_fare DESC, id ASC\n         ) AS rn\n  FROM trips\n  WHERE trip_status = 'completed'\n)\nSELECT ride_type, trip_id, total_fare\nFROM ranked_trips\nWHERE rn <= 3\nORDER BY ride_type ASC, total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- The CTE stores rank information for each trip.\n- The outer query keeps the first three per ride type.\n\n## Difference from the optimal approach\n\nMore modular, but longer."
      },
      {
        "approach_title": "RANK top 3",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ride_type, trip_id, total_fare FROM (SELECT ride_type, id AS trip_id, total_fare, RANK() OVER (PARTITION BY ride_type ORDER BY total_fare DESC, id ASC) AS fare_rank FROM trips WHERE trip_status = 'completed') x WHERE fare_rank <= 3 ORDER BY ride_type ASC, total_fare DESC, trip_id ASC;",
        "explanation": "## Approach\n\nUse `RANK()` instead of `ROW_NUMBER()` to keep trips in the top 3 ranks per ride type.\n\n## Query\n\n```sql\nSELECT ride_type, trip_id, total_fare\nFROM (\n  SELECT ride_type,\n         id AS trip_id,\n         total_fare,\n         RANK() OVER (\n           PARTITION BY ride_type\n           ORDER BY total_fare DESC, id ASC\n         ) AS fare_rank\n  FROM trips\n  WHERE trip_status = 'completed'\n) x\nWHERE fare_rank <= 3\nORDER BY ride_type ASC, total_fare DESC, trip_id ASC;\n```\n\n## Explanation\n\n- `RANK()` can return more than 3 rows for a ride type when ties occur.\n- This is good when you want top ranks instead of exactly top rows.\n\n## Difference from the optimal approach\n\nUseful for tie-aware logic, but `ROW_NUMBER()` is better when you want exactly 3 rows per group."
      }
    ]
  },
  {
    "code": "RIDE_097",
    "approaches": [
      {
        "approach_title": "3-row moving avg",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, trip_id, total_fare, moving_avg_fare FROM (SELECT user_id, id AS trip_id, total_fare, requested_at, ROUND(AVG(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_fare FROM trips WHERE trip_status = 'completed') x ORDER BY user_id ASC, trip_id ASC;",
        "explanation": "## Approach\n\nUse a 3-row moving window for each rider ordered by trip sequence, then return results in the required final order.\n\n## Query\n\n```sql\nSELECT user_id, trip_id, total_fare, moving_avg_fare\nFROM (\n  SELECT user_id,\n         id AS trip_id,\n         total_fare,\n         requested_at,\n         ROUND(\n           AVG(total_fare) OVER (\n             PARTITION BY user_id\n             ORDER BY requested_at, id\n             ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n           ),\n           2\n         ) AS moving_avg_fare\n  FROM trips\n  WHERE trip_status = 'completed'\n) x\nORDER BY user_id ASC, trip_id ASC;\n```\n\n## Explanation\n\n- The inner query calculates the moving average using the correct chronological trip order.\n- `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` creates a 3-trip rolling window.\n- The outer query reorders the final result to match the validator requirement: `user_id ASC, trip_id ASC`.\n\n## Why this is optimal\n\nThis preserves the correct rolling calculation logic while satisfying the required output sort order."
      },
      {
        "approach_title": "CTE moving avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH completed_trips AS (SELECT user_id, id AS trip_id, total_fare, requested_at FROM trips WHERE trip_status = 'completed'), moving_avg AS (SELECT user_id, trip_id, total_fare, ROUND(AVG(total_fare) OVER (PARTITION BY user_id ORDER BY requested_at, trip_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_fare FROM completed_trips) SELECT user_id, trip_id, total_fare, moving_avg_fare FROM moving_avg ORDER BY user_id ASC, trip_id ASC;",
        "explanation": "## Approach\n\nUse a CTE to isolate completed trips, then compute the moving average in a second step.\n\n## Query\n\n```sql\nWITH completed_trips AS (\n  SELECT user_id,\n         id AS trip_id,\n         total_fare,\n         requested_at\n  FROM trips\n  WHERE trip_status = 'completed'\n), moving_avg AS (\n  SELECT user_id,\n         trip_id,\n         total_fare,\n         ROUND(\n           AVG(total_fare) OVER (\n             PARTITION BY user_id\n             ORDER BY requested_at, trip_id\n             ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n           ),\n           2\n         ) AS moving_avg_fare\n  FROM completed_trips\n)\nSELECT user_id, trip_id, total_fare, moving_avg_fare\nFROM moving_avg\nORDER BY user_id ASC, trip_id ASC;\n```\n\n## Explanation\n\n- First CTE keeps only completed trips.\n- Second CTE calculates the 3-trip moving average.\n- Final query ensures output matches the required sort order.\n\n## Difference from the optimal approach\n\nSame logic, but slightly more modular and easier to debug."
      },
      {
        "approach_title": "Correlated avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT t.user_id, t.id AS trip_id, t.total_fare, ROUND((SELECT AVG(t2.total_fare) FROM (SELECT id, requested_at, total_fare FROM trips WHERE trip_status = 'completed' AND user_id = t.user_id AND (requested_at < t.requested_at OR (requested_at = t.requested_at AND id <= t.id)) ORDER BY requested_at DESC, id DESC LIMIT 3) t2), 2) AS moving_avg_fare FROM trips t WHERE t.trip_status = 'completed' ORDER BY t.user_id ASC, trip_id ASC;",
        "explanation": "## Approach\n\nFor each completed trip, use a correlated subquery to look back at the current and previous two trips.\n\n## Query\n\n```sql\nSELECT t.user_id,\n       t.id AS trip_id,\n       t.total_fare,\n       ROUND(\n         (\n           SELECT AVG(t2.total_fare)\n           FROM (\n             SELECT id, requested_at, total_fare\n             FROM trips\n             WHERE trip_status = 'completed'\n               AND user_id = t.user_id\n               AND (\n                 requested_at < t.requested_at\n                 OR (requested_at = t.requested_at AND id <= t.id)\n               )\n             ORDER BY requested_at DESC, id DESC\n             LIMIT 3\n           ) t2\n         ),\n         2\n       ) AS moving_avg_fare\nFROM trips t\nWHERE t.trip_status = 'completed'\nORDER BY t.user_id ASC, trip_id ASC;\n```\n\n## Explanation\n\n- Inner subquery gets the current trip and up to two previous trips for the same rider.\n- `LIMIT 3` defines the moving window.\n- Outer query ensures the required output sort order.\n\n## Difference from the optimal approach\n\nWorks correctly, but window functions are much more efficient and easier to read."
      }
    ]
  },
  {
    "code": "RIDE_098",
    "approaches": [
      {
        "approach_title": "Row-number streaks",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH trip_flags AS ( SELECT driver_id, requested_at, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS rn1, ROW_NUMBER() OVER (PARTITION BY driver_id, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END ORDER BY requested_at) AS rn2 FROM trips WHERE driver_id IS NOT NULL ), cancel_groups AS ( SELECT driver_id, (rn1 - rn2) AS grp FROM trip_flags WHERE is_cancelled = 1 ) SELECT driver_id, MAX(cancel_streak) AS max_cancel_streak FROM (SELECT driver_id, grp, COUNT(*) AS cancel_streak FROM cancel_groups GROUP BY driver_id, grp) x GROUP BY driver_id ORDER BY max_cancel_streak DESC, driver_id ASC;",
        "explanation": "## Approach\n\nCreate groups of consecutive cancelled trips using row-number differences, then find the longest streak per driver.\n\n## Query\n\n```sql\nWITH trip_flags AS (\n  SELECT driver_id,\n         requested_at,\n         CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled,\n         ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS rn1,\n         ROW_NUMBER() OVER (\n           PARTITION BY driver_id,\n                        CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END\n           ORDER BY requested_at\n         ) AS rn2\n  FROM trips\n  WHERE driver_id IS NOT NULL\n),\ncancel_groups AS (\n  SELECT driver_id, (rn1 - rn2) AS grp\n  FROM trip_flags\n  WHERE is_cancelled = 1\n)\nSELECT driver_id, MAX(cancel_streak) AS max_cancel_streak\nFROM (\n  SELECT driver_id, grp, COUNT(*) AS cancel_streak\n  FROM cancel_groups\n  GROUP BY driver_id, grp\n) x\nGROUP BY driver_id\nORDER BY max_cancel_streak DESC, driver_id ASC;\n```\n\n## Explanation\n\n- `rn1` numbers all trips per driver.\n- `rn2` numbers trips within cancelled and non-cancelled buckets.\n- For consecutive cancelled rows, `rn1 - rn2` stays constant.\n- That constant becomes the streak group id.\n- Counting rows inside each group gives streak length.\n- `MAX(...)` keeps the longest cancelled streak per driver.\n\n## Why this is optimal\n\nThis is a clean and reliable SQL pattern for consecutive streak problems."
      },
      {
        "approach_title": "CTE streak steps",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ordered_trips AS (SELECT driver_id, requested_at, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled, ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS seq_all, ROW_NUMBER() OVER (PARTITION BY driver_id, CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END ORDER BY requested_at) AS seq_status FROM trips WHERE driver_id IS NOT NULL), grouped_cancels AS (SELECT driver_id, seq_all - seq_status AS grp FROM ordered_trips WHERE is_cancelled = 1), streaks AS (SELECT driver_id, grp, COUNT(*) AS cancel_streak FROM grouped_cancels GROUP BY driver_id, grp) SELECT driver_id, MAX(cancel_streak) AS max_cancel_streak FROM streaks GROUP BY driver_id ORDER BY max_cancel_streak DESC, driver_id ASC;",
        "explanation": "## Approach\n\nBreak the streak logic into separate CTE steps for readability.\n\n## Query\n\n```sql\nWITH ordered_trips AS (\n  SELECT driver_id,\n         requested_at,\n         CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END AS is_cancelled,\n         ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY requested_at) AS seq_all,\n         ROW_NUMBER() OVER (\n           PARTITION BY driver_id,\n                        CASE WHEN trip_status = 'cancelled' THEN 1 ELSE 0 END\n           ORDER BY requested_at\n         ) AS seq_status\n  FROM trips\n  WHERE driver_id IS NOT NULL\n), grouped_cancels AS (\n  SELECT driver_id, seq_all - seq_status AS grp\n  FROM ordered_trips\n  WHERE is_cancelled = 1\n), streaks AS (\n  SELECT driver_id, grp, COUNT(*) AS cancel_streak\n  FROM grouped_cancels\n  GROUP BY driver_id, grp\n)\nSELECT driver_id, MAX(cancel_streak) AS max_cancel_streak\nFROM streaks\nGROUP BY driver_id\nORDER BY max_cancel_streak DESC, driver_id ASC;\n```\n\n## Explanation\n\n- The first CTE computes row numbers.\n- The second identifies consecutive-cancel groups.\n- The third counts streak length inside each group.\n- The final query keeps the maximum streak per driver.\n\n## Difference from the optimal approach\n\nSame logic as the best approach, but spread across more named steps."
      }
    ]
  },
  {
    "code": "RIDE_099",
    "approaches": [
      {
        "approach_title": "Grouped percentile",
        "approach_type": "ordered_set_aggregate",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type ORDER BY ride_type ASC;",
        "explanation": "## Approach\n\nUse `PERCENTILE_CONT` as a grouped aggregate, one group per `ride_type`.\n\n## Query\n\n```sql\nSELECT ride_type,\n       PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90\nFROM trips\nWHERE trip_status = 'completed'\nGROUP BY ride_type\nORDER BY ride_type ASC;\n```\n\n## Explanation\n\n- `WHERE trip_status = 'completed'` keeps only completed trips.\n- `GROUP BY ride_type` creates one group per ride type.\n- `PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare)` computes the 90th percentile fare inside each ride type.\n- The result is sorted by `ride_type` as required.\n\n## Why this is optimal\n\nThis is the cleanest and most correct way to calculate percentile per group when `PERCENTILE_CONT` is supported only as a normal aggregate."
      },
      {
        "approach_title": "CTE percentile",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH type_percentiles AS (SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) SELECT ride_type, fare_p90 FROM type_percentiles ORDER BY ride_type ASC;",
        "explanation": "## Approach\n\nCompute the percentile per ride type in a CTE, then select from it.\n\n## Query\n\n```sql\nWITH type_percentiles AS (\n  SELECT ride_type,\n         PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n)\nSELECT ride_type, fare_p90\nFROM type_percentiles\nORDER BY ride_type ASC;\n```\n\n## Explanation\n\n- The CTE calculates one percentile row per ride type.\n- The outer query returns the result in the required order.\n\n## Difference from the optimal approach\n\nIt produces the same result, but adds an extra layer."
      },
      {
        "approach_title": "Join grouped p90",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT p.ride_type, p.fare_p90 FROM trips t JOIN (SELECT ride_type, PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90 FROM trips WHERE trip_status = 'completed' GROUP BY ride_type) p ON p.ride_type = t.ride_type WHERE t.trip_status = 'completed' ORDER BY p.ride_type ASC;",
        "explanation": "## Approach\n\nCompute percentile per ride type in a grouped subquery, then join it back.\n\n## Query\n\n```sql\nSELECT DISTINCT p.ride_type, p.fare_p90\nFROM trips t\nJOIN (\n  SELECT ride_type,\n         PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_fare) AS fare_p90\n  FROM trips\n  WHERE trip_status = 'completed'\n  GROUP BY ride_type\n) p ON p.ride_type = t.ride_type\nWHERE t.trip_status = 'completed'\nORDER BY p.ride_type ASC;\n```\n\n## Explanation\n\n- The subquery computes one p90 value per ride type.\n- The join attaches that value back to completed trips of the same type.\n- `DISTINCT` removes repeated rows after the join.\n\n## Difference from the optimal approach\n\nThis follows the grouped-subquery pattern, but the join is unnecessary when you only need one row per ride type."
      }
    ]
  },
  {
    "code": "RIDE_100",
    "approaches": [
      {
        "approach_title": "Sum surge revenue",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.zone_name, ROUND(SUM((t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare)), 2) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1 GROUP BY l.zone_name ORDER BY surge_revenue DESC, l.zone_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin completed surge trips to pickup zones, compute surge revenue per trip, then sum by zone.\n\n## Query\n\n```sql\nSELECT l.zone_name,\n       ROUND(\n         SUM((t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare)),\n         2\n       ) AS surge_revenue\nFROM trips t\nJOIN locations l ON l.id = t.pickup_location_id\nWHERE t.trip_status = 'completed'\n  AND t.surge_multiplier > 1\nGROUP BY l.zone_name\nORDER BY surge_revenue DESC, l.zone_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `pickup_location_id` links a trip to its zone.\n- `surge_multiplier - 1` isolates the extra surge portion.\n- `(base_fare + distance_fare + time_fare)` is the fare base used here.\n- Multiplying them estimates surge revenue for each trip.\n- Summing by `zone_name` gives total surge revenue per zone.\n\n## Why this is optimal\n\nIt directly computes the requested derived metric and aggregates it by zone."
      },
      {
        "approach_title": "CTE surge calc",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH trip_surge_revenue AS (SELECT l.zone_name, (t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1) SELECT zone_name, ROUND(SUM(surge_revenue), 2) AS surge_revenue FROM trip_surge_revenue GROUP BY zone_name ORDER BY surge_revenue DESC, zone_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nCompute per-trip surge revenue in a CTE, then sum it by zone.\n\n## Query\n\n```sql\nWITH trip_surge_revenue AS (\n  SELECT l.zone_name,\n         (t.surge_multiplier - 1) *\n         (t.base_fare + t.distance_fare + t.time_fare) AS surge_revenue\n  FROM trips t\n  JOIN locations l ON l.id = t.pickup_location_id\n  WHERE t.trip_status = 'completed'\n    AND t.surge_multiplier > 1\n)\nSELECT zone_name, ROUND(SUM(surge_revenue), 2) AS surge_revenue\nFROM trip_surge_revenue\nGROUP BY zone_name\nORDER BY surge_revenue DESC, zone_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE calculates surge revenue at the trip level.\n- The final query aggregates those trip-level values by zone.\n\n## Difference from the optimal approach\n\nVery readable, but a bit longer."
      },
      {
        "approach_title": "Subquery zone sum",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT zone_name, ROUND(SUM(surge_revenue), 2) AS surge_revenue FROM (SELECT l.zone_name, (t.surge_multiplier - 1) * (t.base_fare + t.distance_fare + t.time_fare) AS surge_revenue FROM trips t JOIN locations l ON l.id = t.pickup_location_id WHERE t.trip_status = 'completed' AND t.surge_multiplier > 1) x GROUP BY zone_name ORDER BY surge_revenue DESC, zone_name ASC LIMIT 5;",
        "explanation": "## Approach\n\nBuild trip-level surge revenue rows in a subquery, then aggregate by zone.\n\n## Query\n\n```sql\nSELECT zone_name, ROUND(SUM(surge_revenue), 2) AS surge_revenue\nFROM (\n  SELECT l.zone_name,\n         (t.surge_multiplier - 1) *\n         (t.base_fare + t.distance_fare + t.time_fare) AS surge_revenue\n  FROM trips t\n  JOIN locations l ON l.id = t.pickup_location_id\n  WHERE t.trip_status = 'completed'\n    AND t.surge_multiplier > 1\n) x\nGROUP BY zone_name\nORDER BY surge_revenue DESC, zone_name ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The inner query computes surge revenue per trip.\n- The outer query sums those values per zone and ranks them.\n\n## Difference from the optimal approach\n\nIt works well, but the extra wrapper is not necessary."
      }
    ]
  }
];
