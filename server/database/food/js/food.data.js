import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("food");

export const tableDescriptions = {
  coupon_usage_logs: "Coupon usage history for fraud and performance analysis",
  coupons: "Discount coupons that can be applied to orders",
  driver_assignments: "Assignment of an order to a driver",
  driver_shifts: "Working shifts of drivers",
  drivers: "Delivery drivers",
  menu_item_availability_logs: "Availability history of menu items",
  menu_items: "Items sold by restaurants",
  order_items: "Line items of an order",
  order_status_history: "Order status transition history",
  orders: "Orders placed by users",
  payments: "Payments for orders",
  restaurant_operating_hours: "Operating schedule of restaurants by day of week",
  restaurants: "Restaurants that accept orders",
  reviews: "User reviews for delivered orders",
  support_tickets: "Customer support and refund issues related to orders",
  user_addresses: "Saved delivery addresses of users",
  users: "End users who place food orders",
};

export const questions = [
  {"app_id":appId,"code":"FOOD_001","title":"Total Users Count","description":"Find the total number of users registered on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_users FROM users;","solution_columns":["total_users"],"tables":["users"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_002","title":"Active Users Count","description":"Find the total number of users who are currently active.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_users FROM users WHERE is_active = true;","solution_columns":["active_users"],"tables":["users"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_003","title":"Total Restaurants Count","description":"Find the total number of restaurants listed on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_restaurants FROM restaurants;","solution_columns":["total_restaurants"],"tables":["restaurants"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_004","title":"Active Restaurants Count","description":"Find the number of restaurants that are currently active.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_restaurants FROM restaurants WHERE is_active = true;","solution_columns":["active_restaurants"],"tables":["restaurants"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_005","title":"Total Orders Count","description":"Find the total number of orders placed on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_orders FROM orders;","solution_columns":["total_orders"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_006","title":"Delivered Orders Count","description":"Find the total number of orders that were delivered successfully.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered';","solution_columns":["delivered_orders"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_007","title":"Cancelled Orders Count","description":"Find the total number of orders that were cancelled.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS cancelled_orders FROM orders WHERE order_status = 'cancelled';","solution_columns":["cancelled_orders"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_008","title":"Average Order Value","description":"Calculate the average total amount of all delivered orders.","difficulty":"easy","expected_query":"SELECT AVG(total_amount) AS average_order_value FROM orders WHERE order_status = 'delivered';","solution_columns":["average_order_value"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_009","title":"Total Drivers Count","description":"Find the total number of drivers on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_drivers FROM drivers;","solution_columns":["total_drivers"],"tables":["drivers"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_010","title":"Active Drivers Count","description":"Find the number of drivers who are currently active.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_drivers FROM drivers WHERE is_active = true;","solution_columns":["active_drivers"],"tables":["drivers"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_011","title":"Total Menu Items Count","description":"Find the total number of menu items listed across all restaurants.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_menu_items FROM menu_items;","solution_columns":["total_menu_items"],"tables":["menu_items"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_012","title":"Available Menu Items Count","description":"Find the number of menu items currently available for ordering.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS available_menu_items FROM menu_items WHERE is_available = true;","solution_columns":["available_menu_items"],"tables":["menu_items"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_013","title":"Total Coupons Count","description":"Find the total number of coupons created on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_coupons FROM coupons;","solution_columns":["total_coupons"],"tables":["coupons"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_014","title":"Active Coupons Count","description":"Find the number of currently active coupons.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS active_coupons FROM coupons WHERE is_active = true;","solution_columns":["active_coupons"],"tables":["coupons"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_015","title":"Orders With Coupons","description":"Find how many orders were placed using a coupon.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS coupon_orders FROM orders WHERE coupon_id IS NOT NULL;","solution_columns":["coupon_orders"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_016","title":"Total Reviews Count","description":"Find the total number of reviews submitted by users.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_reviews FROM reviews;","solution_columns":["total_reviews"],"tables":["reviews"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_017","title":"Average Restaurant Rating","description":"Find the average overall rating given by users.","difficulty":"easy","expected_query":"SELECT AVG(rating) AS average_rating FROM reviews;","solution_columns":["average_rating"],"tables":["reviews"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_018","title":"Orders Placed Today","description":"Find the number of orders placed today.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS orders_today FROM orders WHERE DATE(created_at) = CURRENT_DATE;","solution_columns":["orders_today"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_019","title":"Users From Hyderabad","description":"Find the number of users whose default city is Hyderabad.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS users_in_hyderabad FROM users WHERE default_city = 'Hyderabad';","solution_columns":["users_in_hyderabad"],"tables":["users"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_020","title":"Restaurants In Hyderabad","description":"Find the number of restaurants located in Hyderabad.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS restaurants_in_hyderabad FROM restaurants WHERE city = 'Hyderabad';","solution_columns":["restaurants_in_hyderabad"],"tables":["restaurants"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_021","title":"Orders Per Restaurant","description":"For each restaurant, find how many orders have been placed.","difficulty":"easy","expected_query":"SELECT restaurant_id, COUNT(*) AS total_orders FROM orders GROUP BY restaurant_id ORDER BY total_orders DESC, restaurant_id ASC;","solution_columns":["restaurant_id","total_orders"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_orders","direction":"desc"},{"column":"restaurant_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_022","title":"Delivered Orders Per User","description":"For each user, count how many delivered orders they have completed.","difficulty":"easy","expected_query":"SELECT user_id, COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered' GROUP BY user_id ORDER BY delivered_orders DESC, user_id ASC;","solution_columns":["user_id","delivered_orders"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"delivered_orders","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_023","title":"Revenue By Restaurant","description":"For each restaurant, calculate the total revenue generated from delivered orders.","difficulty":"easy","expected_query":"SELECT restaurant_id, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;","solution_columns":["restaurant_id","total_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"},{"column":"restaurant_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_024","title":"Menu Items Per Restaurant","description":"Find how many menu items each restaurant currently has listed.","difficulty":"easy","expected_query":"SELECT restaurant_id, COUNT(*) AS menu_item_count FROM menu_items GROUP BY restaurant_id ORDER BY menu_item_count DESC, restaurant_id ASC;","solution_columns":["restaurant_id","menu_item_count"],"tables":["menu_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"menu_item_count","direction":"desc"},{"column":"restaurant_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_025","title":"Users Who Placed At Least One Order","description":"Find the number of unique users who have placed at least one order.","difficulty":"easy","expected_query":"SELECT COUNT(DISTINCT user_id) AS ordering_users FROM orders;","solution_columns":["ordering_users"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_026","title":"Average Delivery Fee","description":"Calculate the average delivery fee charged on delivered orders.","difficulty":"easy","expected_query":"SELECT AVG(delivery_fee) AS average_delivery_fee FROM orders WHERE order_status = 'delivered';","solution_columns":["average_delivery_fee"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_027","title":"Average Packaging Fee","description":"Calculate the average packaging fee charged across delivered orders.","difficulty":"easy","expected_query":"SELECT AVG(packaging_fee) AS average_packaging_fee FROM orders WHERE order_status = 'delivered';","solution_columns":["average_packaging_fee"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"FOOD_028","title":"Restaurants By Cuisine","description":"For each cuisine, count how many restaurants belong to it.","difficulty":"easy","expected_query":"SELECT cuisine, COUNT(*) AS restaurant_count FROM restaurants GROUP BY cuisine ORDER BY restaurant_count DESC, cuisine ASC;","solution_columns":["cuisine","restaurant_count"],"tables":["restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"restaurant_count","direction":"desc"},{"column":"cuisine","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_029","title":"Top 5 Highest Value Orders","description":"Find the top 5 delivered orders with the highest total amount.","difficulty":"easy","expected_query":"SELECT id, total_amount FROM orders WHERE order_status = 'delivered' ORDER BY total_amount DESC, id ASC LIMIT 5;","solution_columns":["id","total_amount"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_amount","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_030","title":"Orders With Payment Status","description":"Show each order id along with its payment status.","difficulty":"easy","expected_query":"SELECT o.id, p.payment_status FROM orders o JOIN payments p ON p.order_id = o.id ORDER BY o.id ASC;","solution_columns":["id","payment_status"],"tables":["orders","payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_031","title":"Restaurant Names With Total Orders","description":"For each restaurant, show its name along with the total number of orders placed.","difficulty":"easy","expected_query":"SELECT r.id, r.name, COUNT(o.id) AS total_orders FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY total_orders DESC, r.id ASC;","solution_columns":["id","name","total_orders"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_orders","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_032","title":"Users With Their Total Delivered Orders","description":"For each user, show the total number of delivered orders they have completed.","difficulty":"easy","expected_query":"SELECT u.id, u.full_name, COUNT(o.id) AS delivered_orders FROM users u LEFT JOIN orders o ON o.user_id = u.id AND o.order_status = 'delivered' GROUP BY u.id, u.full_name ORDER BY delivered_orders DESC, u.id ASC;","solution_columns":["id","full_name","delivered_orders"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"delivered_orders","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_033","title":"Revenue And Delivered Order Count Per Restaurant","description":"For each restaurant, calculate the number of delivered orders and total delivered revenue.","difficulty":"easy","expected_query":"SELECT r.id, r.name, COUNT(o.id) AS delivered_orders, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.id, r.name ORDER BY total_revenue DESC, r.id ASC;","solution_columns":["id","name","delivered_orders","total_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_034","title":"Average Rating Per Restaurant","description":"For each restaurant, find its average review rating.","difficulty":"easy","expected_query":"SELECT r.id, r.name, AVG(rv.rating) AS average_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY average_rating DESC, r.id ASC;","solution_columns":["id","name","average_rating"],"tables":["restaurants","reviews"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"average_rating","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_035","title":"Restaurants With No Orders","description":"Find restaurants that have not received any orders yet.","difficulty":"easy","expected_query":"SELECT r.id, r.name FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id WHERE o.id IS NULL ORDER BY r.id ASC;","solution_columns":["id","name"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_036","title":"Users Who Never Ordered","description":"Find users who signed up on the platform but never placed an order.","difficulty":"easy","expected_query":"SELECT u.id, u.full_name FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_037","title":"Orders With Driver Name","description":"Show each delivered order along with the assigned driver name.","difficulty":"easy","expected_query":"SELECT o.id, d.full_name AS driver_name FROM orders o JOIN driver_assignments da ON da.order_id = o.id JOIN drivers d ON d.id = da.driver_id WHERE o.order_status = 'delivered' ORDER BY o.id ASC;","solution_columns":["id","driver_name"],"tables":["orders","driver_assignments","drivers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_038","title":"Coupon Usage Count By Coupon Code","description":"For each coupon, find how many orders used it.","difficulty":"easy","expected_query":"SELECT c.code, COUNT(o.id) AS usage_count FROM coupons c LEFT JOIN orders o ON o.coupon_id = c.id GROUP BY c.id, c.code ORDER BY usage_count DESC, c.code ASC;","solution_columns":["code","usage_count"],"tables":["coupons","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"usage_count","direction":"desc"},{"column":"code","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_039","title":"Orders With Item Count","description":"For each order, show how many line items were included in it.","difficulty":"easy","expected_query":"SELECT o.id, COUNT(oi.id) AS item_count FROM orders o LEFT JOIN order_items oi ON oi.order_id = o.id GROUP BY o.id ORDER BY o.id ASC;","solution_columns":["id","item_count"],"tables":["orders","order_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_040","title":"Revenue By City","description":"For each city, calculate the total delivered order revenue generated by restaurants in that city.","difficulty":"easy","expected_query":"SELECT r.city, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city ORDER BY total_revenue DESC, r.city ASC;","solution_columns":["city","total_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_041","title":"Users With Multiple Saved Addresses","description":"Find users who have saved more than one delivery address.","difficulty":"medium","expected_query":"SELECT u.id, u.full_name, COUNT(ua.id) AS address_count FROM users u JOIN user_addresses ua ON ua.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(ua.id) > 1 ORDER BY address_count DESC, u.id ASC;","solution_columns":["id","full_name","address_count"],"tables":["users","user_addresses"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"address_count","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_042","title":"Restaurants With Average Prep Time Above 30 Minutes","description":"Find restaurants whose average configured preparation time is greater than 30 minutes.","difficulty":"medium","expected_query":"SELECT id, name, avg_prep_time_minutes FROM restaurants WHERE avg_prep_time_minutes > 30 ORDER BY avg_prep_time_minutes DESC, id ASC;","solution_columns":["id","name","avg_prep_time_minutes"],"tables":["restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_prep_time_minutes","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_043","title":"Top 5 Restaurants By Delivered Revenue","description":"Find the top 5 restaurants with the highest revenue from delivered orders.","difficulty":"medium","expected_query":"SELECT r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.id, r.name ORDER BY total_revenue DESC, r.id ASC LIMIT 5;","solution_columns":["id","name","total_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_044","title":"Top 5 Users By Delivered Spend","description":"Find the top 5 users who spent the most on delivered orders.","difficulty":"medium","expected_query":"SELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id WHERE o.order_status = 'delivered' GROUP BY u.id, u.full_name ORDER BY total_spent DESC, u.id ASC LIMIT 5;","solution_columns":["id","full_name","total_spent"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_spent","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_045","title":"Restaurants With Support Tickets","description":"Find restaurants that have at least one support ticket raised on one of their orders.","difficulty":"medium","expected_query":"SELECT DISTINCT r.id, r.name FROM restaurants r JOIN orders o ON o.restaurant_id = r.id JOIN support_tickets st ON st.order_id = o.id ORDER BY r.id ASC;","solution_columns":["id","name"],"tables":["restaurants","orders","support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_046","title":"Orders With Delay Minutes","description":"For each delivered order, show how many minutes late it was compared to its estimated delivery time.","difficulty":"medium","expected_query":"SELECT id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ORDER BY id ASC;","solution_columns":["id","delay_minutes"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_047","title":"Drivers With Completed Deliveries Count","description":"For each driver, find how many deliveries they completed.","difficulty":"medium","expected_query":"SELECT d.id, d.full_name, COUNT(da.id) AS completed_deliveries FROM drivers d LEFT JOIN driver_assignments da ON da.driver_id = d.id AND da.status = 'delivered' GROUP BY d.id, d.full_name ORDER BY completed_deliveries DESC, d.id ASC;","solution_columns":["id","full_name","completed_deliveries"],"tables":["drivers","driver_assignments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_deliveries","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_048","title":"Restaurants With Low Inventory Items","description":"Find menu items whose inventory count is less than or equal to their reorder level.","difficulty":"medium","expected_query":"SELECT id, restaurant_id, name, inventory_count, reorder_level FROM menu_items WHERE inventory_count IS NOT NULL AND reorder_level IS NOT NULL AND inventory_count <= reorder_level ORDER BY restaurant_id ASC, id ASC;","solution_columns":["id","restaurant_id","name","inventory_count","reorder_level"],"tables":["menu_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"restaurant_id","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_049","title":"Users With Failed Payments","description":"Find users who have at least one order whose payment failed.","difficulty":"medium","expected_query":"SELECT DISTINCT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id JOIN payments p ON p.order_id = o.id WHERE p.payment_status = 'failed' ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders","payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_050","title":"Average Delivery Fee By City","description":"For each city, calculate the average delivery fee of delivered orders.","difficulty":"medium","expected_query":"SELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city ORDER BY average_delivery_fee DESC, r.city ASC;","solution_columns":["city","average_delivery_fee"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"average_delivery_fee","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_051","title":"Top 3 Restaurants Per City By Delivered Revenue","description":"For each city, find the top 3 restaurants with the highest delivered order revenue.","difficulty":"medium","expected_query":"WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), ranked_restaurants AS ( SELECT city, id, name, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_revenue DESC, id ASC) AS rn FROM restaurant_revenue ) SELECT city, id, name, total_revenue FROM ranked_restaurants WHERE rn <= 3 ORDER BY city ASC, total_revenue DESC, id ASC;","solution_columns":["city","id","name","total_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"total_revenue","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_052","title":"Users Whose Last Order Was Cancelled","description":"Find users whose most recent order ended in cancellation.","difficulty":"medium","expected_query":"WITH ranked_orders AS ( SELECT o.user_id, o.order_status, o.created_at, o.id, ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.created_at DESC, o.id DESC) AS rn FROM orders o ) SELECT u.id, u.full_name FROM users u JOIN ranked_orders ro ON ro.user_id = u.id WHERE ro.rn = 1 AND ro.order_status = 'cancelled' ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_053","title":"Restaurants With Revenue Above City Average","description":"Find restaurants whose delivered order revenue is greater than the average delivered revenue of restaurants in the same city.","difficulty":"medium","expected_query":"WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), city_avg AS ( SELECT city, AVG(total_revenue) AS avg_revenue FROM restaurant_revenue GROUP BY city ) SELECT rr.id, rr.name, rr.city, rr.total_revenue FROM restaurant_revenue rr JOIN city_avg ca ON ca.city = rr.city WHERE rr.total_revenue > ca.avg_revenue ORDER BY rr.city ASC, rr.total_revenue DESC, rr.id ASC;","solution_columns":["id","name","city","total_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"total_revenue","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_054","title":"Users With Orders On Consecutive Days","description":"Find users who placed orders on at least two consecutive calendar days.","difficulty":"medium","expected_query":"WITH user_order_days AS ( SELECT DISTINCT user_id, DATE(created_at) AS order_day FROM orders ), ranked_days AS ( SELECT user_id, order_day, LAG(order_day) OVER (PARTITION BY user_id ORDER BY order_day) AS previous_day FROM user_order_days ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ranked_days rd ON rd.user_id = u.id WHERE rd.previous_day = rd.order_day - INTERVAL '1 day' ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_055","title":"Most Frequently Ordered Item Per Restaurant","description":"For each restaurant, find the menu item with the highest total ordered quantity.","difficulty":"medium","expected_query":"WITH item_totals AS ( SELECT mi.restaurant_id, mi.id AS menu_item_id, mi.name, SUM(oi.quantity) AS total_quantity FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id, mi.id, mi.name ), ranked_items AS ( SELECT restaurant_id, menu_item_id, name, total_quantity, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY total_quantity DESC, menu_item_id ASC) AS rn FROM item_totals ) SELECT restaurant_id, menu_item_id, name, total_quantity FROM ranked_items WHERE rn = 1 ORDER BY restaurant_id ASC;","solution_columns":["restaurant_id","menu_item_id","name","total_quantity"],"tables":["menu_items","order_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"restaurant_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_056","title":"Users Who Ordered From Every Cuisine In Their City","description":"Find users whose delivered orders cover every available cuisine in a single derived city they order from.","difficulty":"medium","expected_query":"WITH user_city AS ( SELECT u.id AS user_id, u.full_name, MIN(r.city) AS city FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT r.city) = 1 ), city_cuisines AS ( SELECT city, COUNT(DISTINCT cuisine) AS total_cuisines FROM restaurants GROUP BY city ), user_cuisines AS ( SELECT uc.user_id, uc.full_name, uc.city, COUNT(DISTINCT r.cuisine) AS ordered_cuisines FROM user_city uc JOIN orders o ON o.user_id = uc.user_id JOIN restaurants r ON r.id = o.restaurant_id WHERE r.city = uc.city GROUP BY uc.user_id, uc.full_name, uc.city ) SELECT uc.user_id AS id, uc.full_name, uc.city FROM user_cuisines uc JOIN city_cuisines cc ON cc.city = uc.city WHERE uc.ordered_cuisines = cc.total_cuisines ORDER BY id ASC;","solution_columns":["id","full_name","city"],"tables":["users","orders","restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_057","title":"Running Delivered Revenue By Restaurant","description":"For each delivered order, show the cumulative delivered revenue for its restaurant ordered by creation time.","difficulty":"medium","expected_query":"SELECT restaurant_id, id, created_at, SUM(total_amount) OVER (PARTITION BY restaurant_id ORDER BY created_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_revenue FROM orders WHERE order_status = 'delivered' ORDER BY restaurant_id ASC, created_at ASC, id ASC;","solution_columns":["restaurant_id","id","created_at","running_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"restaurant_id","direction":"asc"},{"column":"created_at","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_058","title":"Restaurants With Above-Average Delivery Fees","description":"Find restaurants whose average delivery fee on delivered orders is higher than the platform-wide average delivery fee for delivered orders.","difficulty":"medium","expected_query":"WITH overall_avg AS ( SELECT AVG(delivery_fee) AS avg_delivery_fee FROM orders WHERE order_status = 'delivered' ), restaurant_avg AS ( SELECT restaurant_id, AVG(delivery_fee) AS avg_delivery_fee FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id ) SELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee FROM restaurant_avg ra JOIN restaurants r ON r.id = ra.restaurant_id CROSS JOIN overall_avg oa WHERE ra.avg_delivery_fee > oa.avg_delivery_fee ORDER BY average_delivery_fee DESC, r.id ASC;","solution_columns":["id","name","average_delivery_fee"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"average_delivery_fee","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_059","title":"Users With More Cancelled Than Delivered Orders","description":"Find users whose total cancelled orders exceed their total delivered orders.","difficulty":"medium","expected_query":"SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE o.order_status = 'cancelled') AS cancelled_orders, COUNT(*) FILTER (WHERE o.order_status = 'delivered') AS delivered_orders FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE o.order_status = 'cancelled') > COUNT(*) FILTER (WHERE o.order_status = 'delivered') ORDER BY u.id ASC;","solution_columns":["id","full_name","cancelled_orders","delivered_orders"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_060","title":"Drivers Who Completed Deliveries For Multiple Restaurants In A Day","description":"Find driver and delivery date combinations where the driver completed deliveries for more than one distinct restaurant on the same day.","difficulty":"medium","expected_query":"SELECT d.id, d.full_name, DATE(da.delivered_at) AS delivery_date, COUNT(DISTINCT o.restaurant_id) AS restaurant_count FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL GROUP BY d.id, d.full_name, DATE(da.delivered_at) HAVING COUNT(DISTINCT o.restaurant_id) > 1 ORDER BY delivery_date ASC, d.id ASC;","solution_columns":["id","full_name","delivery_date","restaurant_count"],"tables":["drivers","driver_assignments","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"delivery_date","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_061","title":"Top 2 Users Per City By Delivered Spend","description":"For each city, find the top 2 users who spent the most on delivered orders.","difficulty":"medium","expected_query":"WITH user_city_spend AS ( SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY r.city, u.id, u.full_name ), ranked_users AS ( SELECT city, id, full_name, total_spent, ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_spent DESC, id ASC) AS rn FROM user_city_spend ) SELECT city, id, full_name, total_spent FROM ranked_users WHERE rn <= 2 ORDER BY city ASC, total_spent DESC, id ASC;","solution_columns":["city","id","full_name","total_spent"],"tables":["users","orders","restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"total_spent","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_062","title":"Users Who Returned After 30 Days","description":"Find users who placed an order and then placed another order at least 30 days later.","difficulty":"medium","expected_query":"WITH user_orders AS ( SELECT user_id, created_at, LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at, id) AS next_order_at FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN user_orders uo ON uo.user_id = u.id WHERE uo.next_order_at IS NOT NULL AND uo.next_order_at >= uo.created_at + INTERVAL '30 days' ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_063","title":"Restaurants With Month Over Month Revenue Growth","description":"Find restaurants whose delivered revenue increased compared to the previous month.","difficulty":"medium","expected_query":"WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), revenue_with_prev AS ( SELECT restaurant_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY restaurant_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ) SELECT r.id, r.name, revenue_month, total_revenue, prev_month_revenue FROM revenue_with_prev rwp JOIN restaurants r ON r.id = rwp.restaurant_id WHERE prev_month_revenue IS NOT NULL AND total_revenue > prev_month_revenue ORDER BY revenue_month ASC, r.id ASC;","solution_columns":["id","name","revenue_month","total_revenue","prev_month_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"revenue_month","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_064","title":"Users Whose Every Order Used A Coupon","description":"Find users for whom every placed order used a coupon.","difficulty":"medium","expected_query":"SELECT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE o.coupon_id IS NOT NULL) ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_065","title":"Restaurants Whose Best Rated Review Is 5","description":"Find restaurants whose highest received review rating is exactly 5.","difficulty":"medium","expected_query":"SELECT r.id, r.name, MAX(rv.rating) AS highest_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name HAVING MAX(rv.rating) = 5 ORDER BY r.id ASC;","solution_columns":["id","name","highest_rating"],"tables":["restaurants","reviews"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_066","title":"Orders Greater Than User Average Spend","description":"Find delivered orders whose total amount is greater than the average delivered order value of that same user.","difficulty":"medium","expected_query":"WITH user_avg AS ( SELECT user_id, AVG(total_amount) AS avg_order_value FROM orders WHERE order_status = 'delivered' GROUP BY user_id ) SELECT o.id, o.user_id, o.total_amount FROM orders o JOIN user_avg ua ON ua.user_id = o.user_id WHERE o.order_status = 'delivered' AND o.total_amount > ua.avg_order_value ORDER BY o.user_id ASC, o.id ASC;","solution_columns":["id","user_id","total_amount"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_067","title":"Menu Items Never Ordered","description":"Find menu items that have never appeared in any order.","difficulty":"medium","expected_query":"SELECT mi.id, mi.name, mi.restaurant_id FROM menu_items mi LEFT JOIN order_items oi ON oi.menu_item_id = mi.id WHERE oi.id IS NULL ORDER BY mi.id ASC;","solution_columns":["id","name","restaurant_id"],"tables":["menu_items","order_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_068","title":"Restaurants With Repeat Customers Ratio Above 50 Percent","description":"Find restaurants where more than 50 percent of ordering users have placed at least 2 orders from that restaurant.","difficulty":"medium","expected_query":"WITH user_restaurant_orders AS ( SELECT restaurant_id, user_id, COUNT(*) AS order_count FROM orders GROUP BY restaurant_id, user_id ), restaurant_customer_stats AS ( SELECT restaurant_id, COUNT(*) AS total_customers, COUNT(*) FILTER (WHERE order_count >= 2) AS repeat_customers FROM user_restaurant_orders GROUP BY restaurant_id ) SELECT r.id, r.name, (repeat_customers::numeric / NULLIF(total_customers, 0)) * 100 AS repeat_customer_percentage FROM restaurant_customer_stats rcs JOIN restaurants r ON r.id = rcs.restaurant_id WHERE (repeat_customers::numeric / NULLIF(total_customers, 0)) > 0.5 ORDER BY repeat_customer_percentage DESC, r.id ASC;","solution_columns":["id","name","repeat_customer_percentage"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"repeat_customer_percentage","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_069","title":"Users Who Ordered From The Same Restaurant On 3 Consecutive Orders","description":"Find users whose three consecutive orders were all placed from the same restaurant.","difficulty":"medium","expected_query":"WITH ranked_orders AS ( SELECT user_id, restaurant_id, id, created_at, LAG(restaurant_id, 1) OVER (PARTITION BY user_id ORDER BY created_at, id) AS prev_restaurant_1, LAG(restaurant_id, 2) OVER (PARTITION BY user_id ORDER BY created_at, id) AS prev_restaurant_2 FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ranked_orders ro ON ro.user_id = u.id WHERE ro.prev_restaurant_1 = ro.restaurant_id AND ro.prev_restaurant_2 = ro.restaurant_id ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_070","title":"Daily Delivered Revenue With 7 Day Rolling Average","description":"For each day, calculate delivered revenue and its 7 day rolling average.","difficulty":"medium","expected_query":"WITH daily_revenue AS ( SELECT DATE(created_at) AS order_date, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY DATE(created_at) ) SELECT order_date, total_revenue, AVG(total_revenue) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7_day_avg_revenue FROM daily_revenue ORDER BY order_date ASC;","solution_columns":["order_date","total_revenue","rolling_7_day_avg_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"order_date","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_071","title":"Top Spending User Per Restaurant","description":"For each restaurant, find the user who has spent the most on delivered orders.","difficulty":"hard","expected_query":"WITH user_restaurant_spend AS ( SELECT o.restaurant_id, o.user_id, SUM(o.total_amount) AS total_spent FROM orders o WHERE o.order_status = 'delivered' GROUP BY o.restaurant_id, o.user_id ), ranked_spend AS ( SELECT restaurant_id, user_id, total_spent, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY total_spent DESC, user_id ASC) AS rn FROM user_restaurant_spend ) SELECT restaurant_id, user_id, total_spent FROM ranked_spend WHERE rn = 1 ORDER BY restaurant_id ASC;","solution_columns":["restaurant_id","user_id","total_spent"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"restaurant_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_072","title":"Users With No Missing Active Month Since First Order","description":"Find users who placed at least one order in every calendar month from their first order month to their latest order month.","difficulty":"hard","expected_query":"WITH user_months AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), user_bounds AS ( SELECT user_id, MIN(order_month) AS first_month, MAX(order_month) AS last_month, COUNT(*) AS active_months FROM user_months GROUP BY user_id ), expected_months AS ( SELECT user_id, ((EXTRACT(YEAR FROM AGE(last_month, first_month)) * 12) + EXTRACT(MONTH FROM AGE(last_month, first_month)) + 1)::int AS expected_month_count, active_months FROM user_bounds ) SELECT u.id, u.full_name FROM users u JOIN expected_months em ON em.user_id = u.id WHERE em.active_months = em.expected_month_count ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_073","title":"Restaurants With Longest Average Delivery Delay","description":"Find the top 10 restaurants with the highest average delivery delay in minutes for delivered orders.","difficulty":"hard","expected_query":"SELECT r.id, r.name, AVG(EXTRACT(EPOCH FROM (o.delivered_at - o.estimated_delivery_at)) / 60) AS avg_delay_minutes FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' AND o.delivered_at IS NOT NULL AND o.estimated_delivery_at IS NOT NULL AND o.delivered_at > o.estimated_delivery_at GROUP BY r.id, r.name ORDER BY avg_delay_minutes DESC, r.id ASC LIMIT 10;","solution_columns":["id","name","avg_delay_minutes"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_delay_minutes","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_074","title":"Top Driver By Completed Deliveries In Each City","description":"For each city, find the driver who completed the highest number of delivered orders.","difficulty":"hard","expected_query":"WITH driver_city_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, ROW_NUMBER() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS rn FROM driver_city_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE rn = 1 ORDER BY city ASC, id ASC;","solution_columns":["city","id","full_name","completed_deliveries"],"tables":["drivers","driver_assignments","orders","restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_075","title":"Users Whose Support Tickets Always Led To Refunds","description":"Find users for whom every support ticket has a refund amount greater than zero.","difficulty":"hard","expected_query":"SELECT u.id, u.full_name FROM users u JOIN support_tickets st ON st.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE st.refund_amount > 0) ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_076","title":"Highest Refund Order Per User","description":"For each user, find the order for which they received the highest refund amount through support tickets.","difficulty":"hard","expected_query":"WITH user_refunds AS ( SELECT st.user_id, st.order_id, SUM(st.refund_amount) AS total_refund FROM support_tickets st GROUP BY st.user_id, st.order_id ), ranked_refunds AS ( SELECT user_id, order_id, total_refund, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total_refund DESC, order_id ASC) AS rn FROM user_refunds ) SELECT user_id, order_id, total_refund FROM ranked_refunds WHERE rn = 1 ORDER BY user_id ASC;","solution_columns":["user_id","order_id","total_refund"],"tables":["support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_077","title":"Longest Gap Between Consecutive Orders Per User","description":"For each user, find the longest time gap in days between two consecutive orders.","difficulty":"hard","expected_query":"WITH ordered_gaps AS ( SELECT user_id, order_created_at, LAG(order_created_at) OVER (PARTITION BY user_id ORDER BY order_created_at, order_id) AS previous_order_at FROM ( SELECT o.user_id, o.id AS order_id, o.created_at AS order_created_at FROM orders o ) base_orders ) SELECT u.id, u.full_name, MAX(DATE_PART('day', og.order_created_at - og.previous_order_at)) AS longest_gap_days FROM users u JOIN ordered_gaps og ON og.user_id = u.id WHERE og.previous_order_at IS NOT NULL GROUP BY u.id, u.full_name ORDER BY longest_gap_days DESC, u.id ASC;","solution_columns":["id","full_name","longest_gap_days"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"longest_gap_days","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_078","title":"Drivers With Consecutive Delivered Days","description":"Find drivers who completed deliveries on at least 5 consecutive calendar days.","difficulty":"hard","expected_query":"WITH driver_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_day FROM driver_assignments da WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ), grouped_days AS ( SELECT driver_id, delivery_day, delivery_day - (ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY delivery_day))::int AS grp_key FROM driver_days ), streaks AS ( SELECT driver_id, COUNT(*) AS streak_length FROM grouped_days GROUP BY driver_id, grp_key ) SELECT d.id, d.full_name FROM drivers d JOIN streaks s ON s.driver_id = d.id WHERE s.streak_length >= 5 GROUP BY d.id, d.full_name ORDER BY d.id ASC;","solution_columns":["id","full_name"],"tables":["drivers","driver_assignments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_079","title":"Users With Declining Monthly Order Counts","description":"Find users whose order count in a month is lower than in their immediately previous recorded month.","difficulty":"hard","expected_query":"WITH monthly_orders AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month, COUNT(*) AS order_count FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), ranked_months AS ( SELECT user_id, order_month, order_count, LAG(order_count) OVER (PARTITION BY user_id ORDER BY order_month) AS previous_month_order_count FROM monthly_orders ) SELECT u.id, u.full_name, rm.order_month, rm.order_count, rm.previous_month_order_count FROM users u JOIN ranked_months rm ON rm.user_id = u.id WHERE rm.previous_month_order_count IS NOT NULL AND rm.order_count < rm.previous_month_order_count ORDER BY rm.order_month ASC, u.id ASC;","solution_columns":["id","full_name","order_month","order_count","previous_month_order_count"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"order_month","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_080","title":"Orders With Delay Greater Than Restaurant Average Delay","description":"Find delivered orders whose delay in minutes is greater than the average delivered delay for that same restaurant.","difficulty":"hard","expected_query":"WITH delayed_orders AS ( SELECT id, restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ), restaurant_avg_delay AS ( SELECT restaurant_id, AVG(delay_minutes) AS avg_delay_minutes FROM delayed_orders GROUP BY restaurant_id ) SELECT dly.id, dly.restaurant_id, dly.delay_minutes FROM delayed_orders dly JOIN restaurant_avg_delay rad ON rad.restaurant_id = dly.restaurant_id WHERE dly.delay_minutes > rad.avg_delay_minutes ORDER BY dly.restaurant_id ASC, dly.id ASC;","solution_columns":["id","restaurant_id","delay_minutes"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"restaurant_id","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_081","title":"Top 3 Cities By Monthly Delivered Revenue","description":"For each month, find the top 3 cities with the highest delivered order revenue.","difficulty":"hard","expected_query":"WITH monthly_city_revenue AS ( SELECT DATE_TRUNC('month', o.created_at) AS revenue_month, r.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY DATE_TRUNC('month', o.created_at), r.city ), ranked_cities AS ( SELECT revenue_month, city, total_revenue, ROW_NUMBER() OVER (PARTITION BY revenue_month ORDER BY total_revenue DESC, city ASC) AS rn FROM monthly_city_revenue ) SELECT revenue_month, city, total_revenue FROM ranked_cities WHERE rn <= 3 ORDER BY revenue_month ASC, total_revenue DESC, city ASC;","solution_columns":["revenue_month","city","total_revenue"],"tables":["orders","restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"revenue_month","direction":"asc"},{"column":"total_revenue","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_082","title":"Top 2 Coupons Per Month By Usage","description":"For each month, find the top 2 coupons used in the highest number of orders.","difficulty":"hard","expected_query":"WITH monthly_coupon_usage AS ( SELECT DATE_TRUNC('month', o.created_at) AS usage_month, c.code, COUNT(*) AS usage_count FROM orders o JOIN coupons c ON c.id = o.coupon_id GROUP BY DATE_TRUNC('month', o.created_at), c.code ), ranked_coupon_usage AS ( SELECT usage_month, code, usage_count, ROW_NUMBER() OVER (PARTITION BY usage_month ORDER BY usage_count DESC, code ASC) AS rn FROM monthly_coupon_usage ) SELECT usage_month, code, usage_count FROM ranked_coupon_usage WHERE rn <= 2 ORDER BY usage_month ASC, usage_count DESC, code ASC;","solution_columns":["usage_month","code","usage_count"],"tables":["orders","coupons"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"usage_month","direction":"asc"},{"column":"usage_count","direction":"desc"},{"column":"code","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_083","title":"Restaurants With Higher Weekend Revenue Than Weekday Revenue","description":"Find restaurants whose delivered revenue from weekend orders is greater than their delivered revenue from weekday orders.","difficulty":"hard","expected_query":"WITH delivered_orders AS ( SELECT restaurant_id, total_amount, EXTRACT(ISODOW FROM created_at) AS order_isodow FROM orders WHERE order_status = 'delivered' ) SELECT r.id, r.name, SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)) AS weekend_revenue, SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5) AS weekday_revenue FROM restaurants r JOIN delivered_orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name HAVING COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)), 0) > COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5), 0) ORDER BY r.id ASC;","solution_columns":["id","name","weekend_revenue","weekday_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_084","title":"Users With Refunds On Multiple Orders","description":"Find users who received refunds on more than one distinct order.","difficulty":"hard","expected_query":"WITH refunded_orders AS ( SELECT user_id, order_id, SUM(refund_amount) AS total_refund FROM support_tickets WHERE refund_amount > 0 GROUP BY user_id, order_id ) SELECT u.id, u.full_name, COUNT(*) AS refunded_order_count FROM users u JOIN refunded_orders ro ON ro.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 1 ORDER BY refunded_order_count DESC, u.id ASC;","solution_columns":["id","full_name","refunded_order_count"],"tables":["users","support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"refunded_order_count","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_085","title":"Drivers With Zero Failed Deliveries","description":"Find drivers who have completed at least 10 deliveries and have never had a failed or cancelled assignment.","difficulty":"hard","expected_query":"SELECT d.id, d.full_name, COUNT(*) FILTER (WHERE da.status = 'delivered') AS delivered_count FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id GROUP BY d.id, d.full_name HAVING COUNT(*) FILTER (WHERE da.status = 'delivered') >= 10 AND COUNT(*) FILTER (WHERE da.status IN ('failed', 'cancelled')) = 0 ORDER BY d.id ASC;","solution_columns":["id","full_name","delivered_count"],"tables":["drivers","driver_assignments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_086","title":"Restaurants With Increasing Revenue In Latest Three Months","description":"Find restaurants whose delivered revenue increased month over month across their latest three recorded months.","difficulty":"hard","expected_query":"WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), ranked_months AS ( SELECT restaurant_id, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS rn FROM monthly_revenue ), last_three AS ( SELECT restaurant_id, revenue_month, total_revenue FROM ranked_months WHERE rn <= 3 ), pivoted AS ( SELECT restaurant_id, MAX(total_revenue) FILTER (WHERE rn = 1) AS month_1_revenue, MAX(total_revenue) FILTER (WHERE rn = 2) AS month_2_revenue, MAX(total_revenue) FILTER (WHERE rn = 3) AS month_3_revenue FROM ( SELECT restaurant_id, total_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS rn FROM last_three ) t GROUP BY restaurant_id ) SELECT r.id, r.name, p.month_3_revenue AS oldest_month_revenue, p.month_2_revenue AS middle_month_revenue, p.month_1_revenue AS latest_month_revenue FROM pivoted p JOIN restaurants r ON r.id = p.restaurant_id WHERE p.month_1_revenue IS NOT NULL AND p.month_2_revenue IS NOT NULL AND p.month_3_revenue IS NOT NULL AND p.month_3_revenue < p.month_2_revenue AND p.month_2_revenue < p.month_1_revenue ORDER BY r.id ASC;","solution_columns":["id","name","oldest_month_revenue","middle_month_revenue","latest_month_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_087","title":"Users Active In Every Month Since Signup","description":"Find users who placed at least one order in every calendar month from their signup month to their latest order month.","difficulty":"hard","expected_query":"WITH user_months AS ( SELECT u.id AS user_id, DATE_TRUNC('month', u.created_at) AS signup_month, COUNT(DISTINCT DATE_TRUNC('month', o.created_at)) AS active_months, DATE_TRUNC('month', MAX(o.created_at)) AS last_order_month FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, DATE_TRUNC('month', u.created_at) ), expected_months AS ( SELECT user_id, ((EXTRACT(YEAR FROM AGE(last_order_month, signup_month)) * 12) + EXTRACT(MONTH FROM AGE(last_order_month, signup_month)) + 1)::int AS expected_month_count, active_months FROM user_months ) SELECT u.id, u.full_name FROM users u JOIN expected_months em ON em.user_id = u.id WHERE em.active_months = em.expected_month_count ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_088","title":"Orders With Discount Above Coupon Average","description":"Find orders whose discount amount is greater than the average discount amount of other orders using the same coupon.","difficulty":"hard","expected_query":"WITH coupon_avg_discount AS ( SELECT coupon_id, AVG(discount_amount) AS avg_discount FROM orders WHERE coupon_id IS NOT NULL GROUP BY coupon_id ) SELECT o.id, o.coupon_id, o.discount_amount FROM orders o JOIN coupon_avg_discount cad ON cad.coupon_id = o.coupon_id WHERE o.discount_amount > cad.avg_discount ORDER BY o.coupon_id ASC, o.id ASC;","solution_columns":["id","coupon_id","discount_amount"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"coupon_id","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_089","title":"Drivers With Higher Tip Earnings Than Delivery Earnings","description":"Find driver assignments where tip earnings were greater than delivery earnings.","difficulty":"hard","expected_query":"SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM driver_assignments WHERE tip_earnings > delivery_earnings ORDER BY driver_id ASC, order_id ASC;","solution_columns":["driver_id","order_id","delivery_earnings","tip_earnings"],"tables":["driver_assignments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"driver_id","direction":"asc"},{"column":"order_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_090","title":"Users With More Reviews Than Distinct Restaurants Ordered","description":"Find users whose total number of reviews is greater than the number of distinct restaurants they have ordered from.","difficulty":"hard","expected_query":"WITH distinct_user_restaurants AS ( SELECT DISTINCT user_id, restaurant_id FROM orders ), user_restaurants AS ( SELECT user_id, COUNT(*) AS restaurant_count FROM distinct_user_restaurants GROUP BY user_id ), user_reviews AS ( SELECT user_id, COUNT(*) AS review_count FROM reviews GROUP BY user_id ) SELECT u.id, u.full_name, urv.review_count, uro.restaurant_count FROM users u JOIN user_reviews urv ON urv.user_id = u.id JOIN user_restaurants uro ON uro.user_id = u.id WHERE urv.review_count > uro.restaurant_count ORDER BY u.id ASC;","solution_columns":["id","full_name","review_count","restaurant_count"],"tables":["users","reviews","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_091","title":"Top 3 Drivers Per City By Completed Deliveries","description":"For each city, find the top 3 drivers with the highest number of completed deliveries.","difficulty":"hard","expected_query":"WITH driver_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, ROW_NUMBER() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS rn FROM driver_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE rn <= 3 ORDER BY city ASC, completed_deliveries DESC, id ASC;","solution_columns":["city","id","full_name","completed_deliveries"],"tables":["drivers","driver_assignments","orders","restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"completed_deliveries","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_092","title":"Users Whose All Orders Were Placed On Weekends","description":"Find users who placed at least one order and every one of their orders was placed on a weekend.","difficulty":"hard","expected_query":"WITH user_orders AS ( SELECT user_id, created_at FROM orders ) SELECT u.id, u.full_name FROM users u JOIN user_orders uo ON uo.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE EXTRACT(ISODOW FROM uo.created_at) IN (6, 7)) ORDER BY u.id ASC;","solution_columns":["id","full_name"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_093","title":"Highest Single Day Revenue Restaurant Per City","description":"For each city, find the restaurant-day combination with the highest delivered revenue in a single day.","difficulty":"hard","expected_query":"WITH daily_restaurant_revenue AS ( SELECT r.city, r.id, r.name, DATE(o.created_at) AS order_date, SUM(o.total_amount) AS daily_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name, DATE(o.created_at) ), ranked_revenue AS ( SELECT city, id, name, order_date, daily_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY daily_revenue DESC, order_date ASC, id ASC) AS rn FROM daily_restaurant_revenue ) SELECT city, id, name, order_date, daily_revenue FROM ranked_revenue WHERE rn = 1 ORDER BY city ASC, id ASC;","solution_columns":["city","id","name","order_date","daily_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_094","title":"Drivers With Average Wait Time Above City Average","description":"Find drivers whose average restaurant wait time is greater than the average wait time of drivers in the same city.","difficulty":"hard","expected_query":"WITH driver_city_wait AS ( SELECT r.city, d.id, d.full_name, AVG(da.wait_time_minutes) AS avg_wait_time FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.wait_time_minutes IS NOT NULL GROUP BY r.city, d.id, d.full_name ), city_wait_avg AS ( SELECT city, AVG(avg_wait_time) AS city_avg_wait_time FROM driver_city_wait GROUP BY city ) SELECT dcw.city, dcw.id, dcw.full_name, dcw.avg_wait_time FROM driver_city_wait dcw JOIN city_wait_avg cwa ON cwa.city = dcw.city WHERE dcw.avg_wait_time > cwa.city_avg_wait_time ORDER BY dcw.city ASC, dcw.id ASC;","solution_columns":["city","id","full_name","avg_wait_time"],"tables":["drivers","driver_assignments","orders","restaurants"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_095","title":"Restaurants With No Stockout In Any Item","description":"Find restaurants where every menu item has never been marked unavailable in the availability logs.","difficulty":"hard","expected_query":"SELECT r.id, r.name FROM restaurants r WHERE EXISTS ( SELECT 1 FROM menu_items mi WHERE mi.restaurant_id = r.id ) AND NOT EXISTS ( SELECT 1 FROM menu_items mi JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id WHERE mi.restaurant_id = r.id AND l.was_available = false ) ORDER BY r.id ASC;","solution_columns":["id","name"],"tables":["restaurants","menu_items","menu_item_availability_logs"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_096","title":"Users Whose Monthly Spend Beat All Previous Months","description":"Find user-months where the delivered spend was greater than every previous recorded month for that user.","difficulty":"hard","expected_query":"WITH monthly_spend AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS spend_month, SUM(total_amount) AS total_spent FROM orders WHERE order_status = 'delivered' GROUP BY user_id, DATE_TRUNC('month', created_at) ), spend_history AS ( SELECT user_id, spend_month, total_spent, MAX(total_spent) OVER (PARTITION BY user_id ORDER BY spend_month ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS previous_best_spend FROM monthly_spend ) SELECT u.id, u.full_name, sh.spend_month, sh.total_spent FROM users u JOIN spend_history sh ON sh.user_id = u.id WHERE sh.previous_best_spend IS NOT NULL AND sh.total_spent > sh.previous_best_spend ORDER BY sh.spend_month ASC, u.id ASC;","solution_columns":["id","full_name","spend_month","total_spent"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"spend_month","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_097","title":"Restaurants Whose Every Menu Category Has Been Ordered","description":"Find restaurants where every menu category has appeared in at least one order.","difficulty":"hard","expected_query":"WITH restaurant_categories AS ( SELECT restaurant_id, COUNT(DISTINCT category) AS total_categories FROM menu_items GROUP BY restaurant_id ), ordered_categories AS ( SELECT mi.restaurant_id, COUNT(DISTINCT mi.category) AS ordered_categories FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id ) SELECT r.id, r.name FROM restaurants r JOIN restaurant_categories rc ON rc.restaurant_id = r.id JOIN ordered_categories oc ON oc.restaurant_id = r.id WHERE rc.total_categories = oc.ordered_categories ORDER BY r.id ASC;","solution_columns":["id","name"],"tables":["restaurants","menu_items","order_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_098","title":"Users With More Support Tickets Than Orders","description":"Find users whose number of support tickets is greater than their total number of orders.","difficulty":"hard","expected_query":"WITH user_order_counts AS ( SELECT user_id, COUNT(*) AS order_count FROM orders GROUP BY user_id ), user_ticket_counts AS ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY user_id ) SELECT u.id, u.full_name, utc.ticket_count, uoc.order_count FROM users u JOIN user_ticket_counts utc ON utc.user_id = u.id JOIN user_order_counts uoc ON uoc.user_id = u.id WHERE utc.ticket_count > uoc.order_count ORDER BY u.id ASC;","solution_columns":["id","full_name","ticket_count","order_count"],"tables":["users","orders","support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_099","title":"Orders Whose Tip Exceeded All Previous Tips For Same User","description":"Find orders where the tip amount is greater than every previous order tip of the same user.","difficulty":"hard","expected_query":"WITH user_tip_history AS ( SELECT user_id, id, created_at, tip_amount, MAX(tip_amount) OVER (PARTITION BY user_id ORDER BY created_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS previous_best_tip FROM orders ) SELECT u.id AS user_id, u.full_name, uth.id AS order_id, uth.tip_amount FROM users u JOIN user_tip_history uth ON uth.user_id = u.id WHERE uth.previous_best_tip IS NOT NULL AND uth.tip_amount > uth.previous_best_tip ORDER BY u.id ASC, uth.id ASC;","solution_columns":["user_id","full_name","order_id","tip_amount"],"tables":["users","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_id","direction":"asc"},{"column":"order_id","direction":"asc"}]}},
  {"app_id":appId,"code":"FOOD_100","title":"Cities Where Delivered Revenue Declined In Latest Month","description":"Find cities whose delivered revenue in the latest recorded month is lower than in the previous recorded month.","difficulty":"hard","expected_query":"WITH monthly_city_revenue AS ( SELECT r.city, DATE_TRUNC('month', o.created_at) AS revenue_month, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, DATE_TRUNC('month', o.created_at) ), ranked_months AS ( SELECT city, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue_month DESC) AS rn, LEAD(total_revenue, 1) OVER (PARTITION BY city ORDER BY revenue_month DESC) AS previous_month_revenue FROM monthly_city_revenue ) SELECT city, revenue_month AS latest_month, total_revenue AS latest_month_revenue, previous_month_revenue FROM ranked_months WHERE rn = 1 AND previous_month_revenue IS NOT NULL AND total_revenue < previous_month_revenue ORDER BY city ASC;","solution_columns":["city","latest_month","latest_month_revenue","previous_month_revenue"],"tables":["restaurants","orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city","direction":"asc"}]}},
];

export const hints = [
  {
    "code": "FOOD_001",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use an aggregate function."
      },
      {
        "hint_order": 2,
        "content": "Count all rows in the users table."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) will give total users."
      }
    ]
  },
  {
    "code": "FOOD_002",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter active users first."
      },
      {
        "hint_order": 2,
        "content": "Check the is_active column."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) with WHERE is_active = true."
      }
    ]
  },
  {
    "code": "FOOD_003",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all restaurants."
      },
      {
        "hint_order": 2,
        "content": "No filtering is needed."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) on restaurants."
      }
    ]
  },
  {
    "code": "FOOD_004",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only active restaurants should be counted."
      },
      {
        "hint_order": 2,
        "content": "Check the is_active flag."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE is_active = true."
      }
    ]
  },
  {
    "code": "FOOD_005",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all orders placed."
      },
      {
        "hint_order": 2,
        "content": "Use orders table only."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) returns total orders."
      }
    ]
  },
  {
    "code": "FOOD_006",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter delivered orders."
      },
      {
        "hint_order": 2,
        "content": "Check order_status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE order_status = 'delivered'."
      }
    ]
  },
  {
    "code": "FOOD_007",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find cancelled orders only."
      },
      {
        "hint_order": 2,
        "content": "Use order_status filter."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where status is cancelled."
      }
    ]
  },
  {
    "code": "FOOD_008",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use an aggregate average function."
      },
      {
        "hint_order": 2,
        "content": "Consider only delivered orders."
      },
      {
        "hint_order": 3,
        "content": "AVG(total_amount) gives average order value."
      }
    ]
  },
  {
    "code": "FOOD_009",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all drivers."
      },
      {
        "hint_order": 2,
        "content": "Use drivers table."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) gives total drivers."
      }
    ]
  },
  {
    "code": "FOOD_010",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter active drivers."
      },
      {
        "hint_order": 2,
        "content": "Check is_active field."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where is_active = true."
      }
    ]
  },
  {
    "code": "FOOD_011",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all menu items."
      },
      {
        "hint_order": 2,
        "content": "Use menu_items table."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) returns total menu items."
      }
    ]
  },
  {
    "code": "FOOD_012",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only available items matter."
      },
      {
        "hint_order": 2,
        "content": "Check is_available flag."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE is_available = true."
      }
    ]
  },
  {
    "code": "FOOD_013",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all coupons created."
      },
      {
        "hint_order": 2,
        "content": "Use coupons table."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) gives total coupons."
      }
    ]
  },
  {
    "code": "FOOD_014",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter active coupons."
      },
      {
        "hint_order": 2,
        "content": "Check is_active column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where is_active = true."
      }
    ]
  },
  {
    "code": "FOOD_015",
    "hints": [
      {
        "hint_order": 1,
        "content": "Orders using coupons have coupon_id filled."
      },
      {
        "hint_order": 2,
        "content": "Check for non-null coupon_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with WHERE coupon_id IS NOT NULL."
      }
    ]
  },
  {
    "code": "FOOD_016",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count all submitted reviews."
      },
      {
        "hint_order": 2,
        "content": "Use reviews table."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) gives total reviews."
      }
    ]
  },
  {
    "code": "FOOD_017",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use AVG on ratings."
      },
      {
        "hint_order": 2,
        "content": "Read values from reviews table."
      },
      {
        "hint_order": 3,
        "content": "AVG(rating) gives average rating."
      }
    ]
  },
  {
    "code": "FOOD_018",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter orders placed today."
      },
      {
        "hint_order": 2,
        "content": "Compare created_at date with CURRENT_DATE."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where DATE(created_at) = CURRENT_DATE."
      }
    ]
  },
  {
    "code": "FOOD_019",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter users by city."
      },
      {
        "hint_order": 2,
        "content": "Check default_city column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where default_city = 'Hyderabad'."
      }
    ]
  },
  {
    "code": "FOOD_020",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter restaurants by city."
      },
      {
        "hint_order": 2,
        "content": "Check city column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where city = 'Hyderabad'."
      }
    ]
  },
  {
    "code": "FOOD_021",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group orders by user."
      },
      {
        "hint_order": 2,
        "content": "Count orders per user."
      },
      {
        "hint_order": 3,
        "content": "Use GROUP BY user_id with COUNT(*)."
      }
    ]
  },
  {
    "code": "FOOD_022",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group restaurants by city."
      },
      {
        "hint_order": 2,
        "content": "Count restaurants in each city."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY city with COUNT(*)."
      }
    ]
  },
  {
    "code": "FOOD_023",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find highest order value."
      },
      {
        "hint_order": 2,
        "content": "Use MAX on total_amount."
      },
      {
        "hint_order": 3,
        "content": "MAX(total_amount) gives highest order."
      }
    ]
  },
  {
    "code": "FOOD_024",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find cheapest menu item."
      },
      {
        "hint_order": 2,
        "content": "Use MIN on price."
      },
      {
        "hint_order": 3,
        "content": "MIN(price) gives cheapest item."
      }
    ]
  },
  {
    "code": "FOOD_025",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group orders by restaurant."
      },
      {
        "hint_order": 2,
        "content": "Sum total_amount for delivered orders."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(total_amount) with GROUP BY restaurant_id."
      }
    ]
  },
  {
    "code": "FOOD_026",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count reviews per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Group by restaurant_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with GROUP BY restaurant_id."
      }
    ]
  },
  {
    "code": "FOOD_027",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users with more than one order."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id and count orders."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "FOOD_028",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants with average rating above threshold."
      },
      {
        "hint_order": 2,
        "content": "Use AVG(rating)."
      },
      {
        "hint_order": 3,
        "content": "HAVING AVG(rating) > 4."
      }
    ]
  },
  {
    "code": "FOOD_029",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count delivered orders per driver."
      },
      {
        "hint_order": 2,
        "content": "Filter by delivered status."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY driver_id with COUNT(*)."
      }
    ]
  },
  {
    "code": "FOOD_030",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total revenue by city."
      },
      {
        "hint_order": 2,
        "content": "Join restaurants with orders."
      },
      {
        "hint_order": 3,
        "content": "SUM(total_amount) grouped by city."
      }
    ]
  },
  {
    "code": "FOOD_031",
    "hints": [
      {
        "hint_order": 1,
        "content": "Join restaurants with orders."
      },
      {
        "hint_order": 2,
        "content": "Group the results by city."
      },
      {
        "hint_order": 3,
        "content": "Count orders per city and sort by total orders descending."
      }
    ]
  },
  {
    "code": "FOOD_032",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users who never placed an order."
      },
      {
        "hint_order": 2,
        "content": "Try LEFT JOIN users with orders."
      },
      {
        "hint_order": 3,
        "content": "Keep rows where order id is NULL."
      }
    ]
  },
  {
    "code": "FOOD_033",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants with no reviews."
      },
      {
        "hint_order": 2,
        "content": "LEFT JOIN restaurants with reviews."
      },
      {
        "hint_order": 3,
        "content": "Filter where review id is NULL."
      }
    ]
  },
  {
    "code": "FOOD_034",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the most expensive menu item per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Group by restaurant_id."
      },
      {
        "hint_order": 3,
        "content": "Use MAX(price) for each restaurant."
      }
    ]
  },
  {
    "code": "FOOD_035",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users who used coupons more than once."
      },
      {
        "hint_order": 2,
        "content": "Filter coupon_id IS NOT NULL."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY user_id HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "FOOD_036",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate revenue for each restaurant."
      },
      {
        "hint_order": 2,
        "content": "Consider only delivered orders."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(total_amount) grouped by restaurant_id."
      }
    ]
  },
  {
    "code": "FOOD_037",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find drivers with highest completed deliveries."
      },
      {
        "hint_order": 2,
        "content": "Filter delivered assignments only."
      },
      {
        "hint_order": 3,
        "content": "Sort by COUNT(*) descending and LIMIT 1."
      }
    ]
  },
  {
    "code": "FOOD_038",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find average review rating per city."
      },
      {
        "hint_order": 2,
        "content": "Join reviews with restaurants."
      },
      {
        "hint_order": 3,
        "content": "Use AVG(rating) grouped by city."
      }
    ]
  },
  {
    "code": "FOOD_039",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total discount amount used per coupon."
      },
      {
        "hint_order": 2,
        "content": "Group by coupon_id."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(discount_amount)."
      }
    ]
  },
  {
    "code": "FOOD_040",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users who ordered from multiple restaurants."
      },
      {
        "hint_order": 2,
        "content": "Count distinct restaurant_id per user."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(DISTINCT restaurant_id) > 1."
      }
    ]
  },
  {
    "code": "FOOD_041",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total menu items per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Group by restaurant_id."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) for each restaurant."
      }
    ]
  },
  {
    "code": "FOOD_042",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total delivered revenue per city."
      },
      {
        "hint_order": 2,
        "content": "Join restaurants and orders."
      },
      {
        "hint_order": 3,
        "content": "SUM(total_amount) grouped by city."
      }
    ]
  },
  {
    "code": "FOOD_043",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants with more than 100 orders."
      },
      {
        "hint_order": 2,
        "content": "Group orders by restaurant_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 100."
      }
    ]
  },
  {
    "code": "FOOD_044",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users whose average order value is above 500."
      },
      {
        "hint_order": 2,
        "content": "Group orders by user_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING AVG(total_amount) > 500."
      }
    ]
  },
  {
    "code": "FOOD_045",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find coupon usage count by month."
      },
      {
        "hint_order": 2,
        "content": "Use DATE_TRUNC on created_at."
      },
      {
        "hint_order": 3,
        "content": "Group by month and coupon code."
      }
    ]
  },
  {
    "code": "FOOD_046",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find most reviewed restaurant."
      },
      {
        "hint_order": 2,
        "content": "Count reviews per restaurant."
      },
      {
        "hint_order": 3,
        "content": "Sort descending and LIMIT 1."
      }
    ]
  },
  {
    "code": "FOOD_047",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users with consecutive orders on same day."
      },
      {
        "hint_order": 2,
        "content": "Use DATE(created_at)."
      },
      {
        "hint_order": 3,
        "content": "Group by user and date, then HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "FOOD_048",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total orders by weekday."
      },
      {
        "hint_order": 2,
        "content": "Extract weekday from created_at."
      },
      {
        "hint_order": 3,
        "content": "Use GROUP BY EXTRACT(DOW ...)."
      }
    ]
  },
  {
    "code": "FOOD_049",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants where average menu price > city average."
      },
      {
        "hint_order": 2,
        "content": "First calculate restaurant average."
      },
      {
        "hint_order": 3,
        "content": "Compare with city-level average using CTE."
      }
    ]
  },
  {
    "code": "FOOD_050",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find top spending user overall."
      },
      {
        "hint_order": 2,
        "content": "Sum delivered spend by user."
      },
      {
        "hint_order": 3,
        "content": "Sort descending and LIMIT 1."
      }
    ]
  },
  {
    "code": "FOOD_051",
    "hints": [
      {
        "hint_order": 1,
        "content": "First calculate delivered revenue per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Rank restaurants within each city."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() and keep top 3."
      }
    ]
  },
  {
    "code": "FOOD_052",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users with orders in every month."
      },
      {
        "hint_order": 2,
        "content": "Count distinct months per user."
      },
      {
        "hint_order": 3,
        "content": "Compare with total months in dataset."
      }
    ]
  },
  {
    "code": "FOOD_053",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate restaurant revenue first."
      },
      {
        "hint_order": 2,
        "content": "Find city average revenue."
      },
      {
        "hint_order": 3,
        "content": "Keep restaurants above that average."
      }
    ]
  },
  {
    "code": "FOOD_054",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants with weekend revenue > weekday revenue."
      },
      {
        "hint_order": 2,
        "content": "Use conditional SUM."
      },
      {
        "hint_order": 3,
        "content": "Compare weekend and weekday totals."
      }
    ]
  },
  {
    "code": "FOOD_055",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count ordered quantity per menu item."
      },
      {
        "hint_order": 2,
        "content": "Partition by restaurant."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() to get top item per restaurant."
      }
    ]
  },
  {
    "code": "FOOD_056",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find all cuisines available in each city."
      },
      {
        "hint_order": 2,
        "content": "Count cuisines ordered by each user in that city."
      },
      {
        "hint_order": 3,
        "content": "Keep users where both counts match."
      }
    ]
  },
  {
    "code": "FOOD_057",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find average delivery time per driver."
      },
      {
        "hint_order": 2,
        "content": "Use delivered_at - assigned_at."
      },
      {
        "hint_order": 3,
        "content": "AVG over completed assignments."
      }
    ]
  },
  {
    "code": "FOOD_058",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users who always order from same restaurant."
      },
      {
        "hint_order": 2,
        "content": "Count distinct restaurant_id per user."
      },
      {
        "hint_order": 3,
        "content": "Keep only users with count = 1."
      }
    ]
  },
  {
    "code": "FOOD_059",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants with highest order growth month-over-month."
      },
      {
        "hint_order": 2,
        "content": "Use monthly grouped revenue."
      },
      {
        "hint_order": 3,
        "content": "Use LAG() to compare previous month."
      }
    ]
  },
  {
    "code": "FOOD_060",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find restaurants with more repeat users than new users."
      },
      {
        "hint_order": 2,
        "content": "Count orders per user per restaurant."
      },
      {
        "hint_order": 3,
        "content": "Compare repeat customer count vs single-order users."
      }
    ]
  },
  {
    "code": "FOOD_061",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate total delivered spend per user within each city."
      },
      {
        "hint_order": 2,
        "content": "Rank users inside each city by spend."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() and keep top 2 per city."
      }
    ]
  },
  {
    "code": "FOOD_062",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare each order with the next order of the same user."
      },
      {
        "hint_order": 2,
        "content": "Use a window function to get next created_at."
      },
      {
        "hint_order": 3,
        "content": "Check if the gap is at least 30 days."
      }
    ]
  },
  {
    "code": "FOOD_063",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group delivered revenue by restaurant and month."
      },
      {
        "hint_order": 2,
        "content": "Compare current month with previous month."
      },
      {
        "hint_order": 3,
        "content": "Use LAG() for month-over-month growth."
      }
    ]
  },
  {
    "code": "FOOD_064",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find users who used a coupon in every order."
      },
      {
        "hint_order": 2,
        "content": "Compare total orders with coupon orders."
      },
      {
        "hint_order": 3,
        "content": "Use conditional COUNT with HAVING."
      }
    ]
  },
  {
    "code": "FOOD_065",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the maximum rating for each restaurant."
      },
      {
        "hint_order": 2,
        "content": "Group by restaurant."
      },
      {
        "hint_order": 3,
        "content": "Keep rows where MAX(rating) = 5."
      }
    ]
  },
  {
    "code": "FOOD_066",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find each user's average delivered order value."
      },
      {
        "hint_order": 2,
        "content": "Compare every delivered order with that average."
      },
      {
        "hint_order": 3,
        "content": "Use AVG() in a CTE or window function."
      }
    ]
  },
  {
    "code": "FOOD_067",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find menu items that were never ordered."
      },
      {
        "hint_order": 2,
        "content": "LEFT JOIN menu_items with order_items."
      },
      {
        "hint_order": 3,
        "content": "Filter rows where order item is NULL."
      }
    ]
  },
  {
    "code": "FOOD_068",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count repeat customers per restaurant."
      },
      {
        "hint_order": 2,
        "content": "A repeat customer ordered more than once."
      },
      {
        "hint_order": 3,
        "content": "Compare repeat count with total customer count."
      }
    ]
  },
  {
    "code": "FOOD_069",
    "hints": [
      {
        "hint_order": 1,
        "content": "Check order sequence per user."
      },
      {
        "hint_order": 2,
        "content": "Compare current restaurant with previous two orders."
      },
      {
        "hint_order": 3,
        "content": "Use LAG() twice to detect 3 consecutive same restaurants."
      }
    ]
  },
  {
    "code": "FOOD_070",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate daily delivered revenue."
      },
      {
        "hint_order": 2,
        "content": "Create a rolling 7-day window."
      },
      {
        "hint_order": 3,
        "content": "Use AVG() OVER with ROWS BETWEEN 6 PRECEDING."
      }
    ]
  },
  {
    "code": "FOOD_071",
    "hints": [
      {
        "hint_order": 1,
        "content": "Sum delivered spend per user per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Rank users within each restaurant."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() and keep rank 1."
      }
    ]
  },
  {
    "code": "FOOD_072",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group orders by month."
      },
      {
        "hint_order": 2,
        "content": "Use DATE_TRUNC on created_at."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) gives monthly order count."
      }
    ]
  },
  {
    "code": "FOOD_073",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count how many times each coupon was used."
      },
      {
        "hint_order": 2,
        "content": "Sort by usage count descending."
      },
      {
        "hint_order": 3,
        "content": "Return the most used coupon."
      }
    ]
  },
  {
    "code": "FOOD_074",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find drivers with zero failed deliveries."
      },
      {
        "hint_order": 2,
        "content": "They should have at least 10 delivered trips."
      },
      {
        "hint_order": 3,
        "content": "Use conditional COUNT in HAVING."
      }
    ]
  },
  {
    "code": "FOOD_075",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate delivery duration in minutes."
      },
      {
        "hint_order": 2,
        "content": "Use delivered_at minus assigned_at."
      },
      {
        "hint_order": 3,
        "content": "Average it per restaurant."
      }
    ]
  },
  {
    "code": "FOOD_076",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find frequent users."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id."
      },
      {
        "hint_order": 3,
        "content": "Keep users with at least 5 orders."
      }
    ]
  },
  {
    "code": "FOOD_077",
    "hints": [
      {
        "hint_order": 1,
        "content": "Sort each user's orders by time."
      },
      {
        "hint_order": 2,
        "content": "Find the previous order date."
      },
      {
        "hint_order": 3,
        "content": "Use LAG() and take MAX date difference."
      }
    ]
  },
  {
    "code": "FOOD_078",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group delivered revenue by day."
      },
      {
        "hint_order": 2,
        "content": "Sort by total revenue descending."
      },
      {
        "hint_order": 3,
        "content": "Return the highest revenue day."
      }
    ]
  },
  {
    "code": "FOOD_079",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count orders per user per month."
      },
      {
        "hint_order": 2,
        "content": "Compare current month with previous month."
      },
      {
        "hint_order": 3,
        "content": "Use LAG() to find declining counts."
      }
    ]
  },
  {
    "code": "FOOD_080",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count total orders for each city."
      },
      {
        "hint_order": 2,
        "content": "Join restaurants with orders."
      },
      {
        "hint_order": 3,
        "content": "Sort by order count descending and keep top city."
      }
    ]
  },
  {
    "code": "FOOD_081",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate average menu item price per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Group by restaurant_id."
      },
      {
        "hint_order": 3,
        "content": "Use AVG(price)."
      }
    ]
  },
  {
    "code": "FOOD_082",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count coupon usage per month."
      },
      {
        "hint_order": 2,
        "content": "Rank coupons within each month."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() and keep top 2."
      }
    ]
  },
  {
    "code": "FOOD_083",
    "hints": [
      {
        "hint_order": 1,
        "content": "Split revenue into weekend and weekday buckets."
      },
      {
        "hint_order": 2,
        "content": "Use EXTRACT(ISODOW FROM created_at)."
      },
      {
        "hint_order": 3,
        "content": "Keep restaurants where weekend > weekday."
      }
    ]
  },
  {
    "code": "FOOD_084",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find average rating per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Sort by average rating descending."
      },
      {
        "hint_order": 3,
        "content": "Return top 5 restaurants."
      }
    ]
  },
  {
    "code": "FOOD_085",
    "hints": [
      {
        "hint_order": 1,
        "content": "Drivers need at least 10 deliveries."
      },
      {
        "hint_order": 2,
        "content": "Ensure failed and cancelled count is zero."
      },
      {
        "hint_order": 3,
        "content": "Use FILTER inside HAVING."
      }
    ]
  },
  {
    "code": "FOOD_086",
    "hints": [
      {
        "hint_order": 1,
        "content": "Calculate monthly revenue per restaurant."
      },
      {
        "hint_order": 2,
        "content": "Focus on latest 3 months."
      },
      {
        "hint_order": 3,
        "content": "Check strictly increasing trend."
      }
    ]
  },
  {
    "code": "FOOD_087",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find all active months for each user."
      },
      {
        "hint_order": 2,
        "content": "Calculate expected months since signup."
      },
      {
        "hint_order": 3,
        "content": "Keep users where both counts match."
      }
    ]
  },
  {
    "code": "FOOD_088",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find average discount per coupon."
      },
      {
        "hint_order": 2,
        "content": "Compare each order's discount against that average."
      },
      {
        "hint_order": 3,
        "content": "Keep only above-average discount orders."
      }
    ]
  },
  {
    "code": "FOOD_089",
    "hints": [
      {
        "hint_order": 1,
        "content": "Sum delivered spending by user."
      },
      {
        "hint_order": 2,
        "content": "Sort descending by spend."
      },
      {
        "hint_order": 3,
        "content": "Return top 10 users."
      }
    ]
  },
  {
    "code": "FOOD_090",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count reviews per user."
      },
      {
        "hint_order": 2,
        "content": "Count distinct restaurants ordered by user."
      },
      {
        "hint_order": 3,
        "content": "Keep users where reviews > distinct restaurants."
      }
    ]
  },
  {
    "code": "FOOD_091",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group deliveries by city and driver."
      },
      {
        "hint_order": 2,
        "content": "Count completed deliveries for each driver in each city."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() partitioned by city ordered by delivery count desc."
      }
    ]
  },
  {
    "code": "FOOD_092",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need users who placed at least one order."
      },
      {
        "hint_order": 2,
        "content": "Check whether every order day is Saturday or Sunday."
      },
      {
        "hint_order": 3,
        "content": "Compare total orders with a conditional weekend count."
      }
    ]
  },
  {
    "code": "FOOD_093",
    "hints": [
      {
        "hint_order": 1,
        "content": "First calculate delivered revenue per restaurant per day."
      },
      {
        "hint_order": 2,
        "content": "Then rank those daily revenues within each city."
      },
      {
        "hint_order": 3,
        "content": "Keep only rank 1 for each city."
      }
    ]
  },
  {
    "code": "FOOD_094",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look for users with no recent orders."
      },
      {
        "hint_order": 2,
        "content": "Recent means within the last 30 days."
      },
      {
        "hint_order": 3,
        "content": "A NOT EXISTS check on recent orders will help."
      }
    ]
  },
  {
    "code": "FOOD_095",
    "hints": [
      {
        "hint_order": 1,
        "content": "Aggregate item quantities by city and menu item."
      },
      {
        "hint_order": 2,
        "content": "You need the top-selling item inside each city."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() partitioned by city ordered by quantity desc."
      }
    ]
  },
  {
    "code": "FOOD_096",
    "hints": [
      {
        "hint_order": 1,
        "content": "Summarize delivered spend by user and month first."
      },
      {
        "hint_order": 2,
        "content": "For each month, compare spend with all earlier months of the same user."
      },
      {
        "hint_order": 3,
        "content": "A running MAX over previous rows is useful here."
      }
    ]
  },
  {
    "code": "FOOD_097",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count how many distinct categories each restaurant has."
      },
      {
        "hint_order": 2,
        "content": "Count how many distinct categories have actually appeared in orders."
      },
      {
        "hint_order": 3,
        "content": "Keep restaurants where those two counts are equal."
      }
    ]
  },
  {
    "code": "FOOD_098",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the average delivery time per driver first."
      },
      {
        "hint_order": 2,
        "content": "Delivery time can be calculated from assigned_at and delivered_at."
      },
      {
        "hint_order": 3,
        "content": "Sort by average time ascending and keep the fastest one."
      }
    ]
  },
  {
    "code": "FOOD_099",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group delivered orders by restaurant."
      },
      {
        "hint_order": 2,
        "content": "Calculate the average total_amount for each restaurant."
      },
      {
        "hint_order": 3,
        "content": "Filter restaurants whose average is greater than 500."
      }
    ]
  },
  {
    "code": "FOOD_100",
    "hints": [
      {
        "hint_order": 1,
        "content": "Sum delivered spending for each user."
      },
      {
        "hint_order": 2,
        "content": "Order users by total spent descending."
      },
      {
        "hint_order": 3,
        "content": "Return only the top 5 users."
      }
    ]
  }
];

export const conceptFilters = [
  {
    "code": "FOOD_001",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_002",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_003",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_004",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_005",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_006",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_007",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_008",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "FOOD_009",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_010",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_011",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_012",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_013",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_014",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_015",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "null_handling"
    ]
  },
  {
    "code": "FOOD_016",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "FOOD_017",
    "concepts": [
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "FOOD_018",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "date_functions",
      "comparison"
    ]
  },
  {
    "code": "FOOD_019",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_020",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "FOOD_021",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_022",
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
    "code": "FOOD_023",
    "concepts": [
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "FOOD_024",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_025",
    "concepts": [
      "aggregation",
      "count_distinct",
      "distinct"
    ]
  },
  {
    "code": "FOOD_026",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "FOOD_027",
    "concepts": [
      "filtering",
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "FOOD_028",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_029",
    "concepts": [
      "filtering",
      "sorting",
      "limit",
      "comparison"
    ]
  },
  {
    "code": "FOOD_030",
    "concepts": [
      "joins",
      "sorting"
    ]
  },
  {
    "code": "FOOD_031",
    "concepts": [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_032",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_033",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "aggregation",
      "count",
      "sum",
      "group_by",
      "sorting",
      "null_handling"
    ]
  },
  {
    "code": "FOOD_034",
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
    "code": "FOOD_035",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "FOOD_036",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "FOOD_037",
    "concepts": [
      "joins",
      "filtering",
      "sorting"
    ]
  },
  {
    "code": "FOOD_038",
    "concepts": [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_039",
    "concepts": [
      "joins",
      "left_join",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_040",
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
    "code": "FOOD_041",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_042",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_043",
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
    "code": "FOOD_044",
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
    "code": "FOOD_045",
    "concepts": [
      "joins",
      "distinct",
      "sorting"
    ]
  },
  {
    "code": "FOOD_046",
    "concepts": [
      "filtering",
      "arithmetic",
      "date_functions",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "FOOD_047",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_048",
    "concepts": [
      "filtering",
      "null_handling",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_049",
    "concepts": [
      "joins",
      "filtering",
      "distinct",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_050",
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
    "code": "FOOD_051",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "FOOD_052",
    "concepts": [
      "cte",
      "joins",
      "window_functions",
      "row_number",
      "partition_by",
      "filtering",
      "sorting"
    ]
  },
  {
    "code": "FOOD_053",
    "concepts": [
      "cte",
      "joins",
      "left_join",
      "aggregation",
      "sum",
      "average",
      "group_by",
      "filtering",
      "sorting",
      "comparison",
      "null_handling"
    ]
  },
  {
    "code": "FOOD_054",
    "concepts": [
      "cte",
      "joins",
      "distinct",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "date_functions",
      "filtering",
      "sorting"
    ]
  },
  {
    "code": "FOOD_055",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_056",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_057",
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
    "code": "FOOD_058",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_059",
    "concepts": [
      "joins",
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
    "code": "FOOD_060",
    "concepts": [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_061",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "FOOD_062",
    "concepts": [
      "cte",
      "joins",
      "window_functions",
      "lead",
      "lag_lead",
      "partition_by",
      "date_functions",
      "filtering",
      "distinct",
      "sorting"
    ]
  },
  {
    "code": "FOOD_063",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "trend_analysis",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_064",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "FOOD_065",
    "concepts": [
      "joins",
      "aggregation",
      "max",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_066",
    "concepts": [
      "cte",
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_067",
    "concepts": [
      "joins",
      "left_join",
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "FOOD_068",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "arithmetic",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "FOOD_069",
    "concepts": [
      "cte",
      "joins",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "filtering",
      "distinct",
      "sorting"
    ]
  },
  {
    "code": "FOOD_070",
    "concepts": [
      "cte",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "moving_average",
      "average",
      "sorting",
      "trend_analysis"
    ]
  },
  {
    "code": "FOOD_071",
    "concepts": [
      "cte",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_072",
    "concepts": [
      "cte",
      "aggregation",
      "count",
      "group_by",
      "date_functions",
      "arithmetic",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "FOOD_073",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "limit",
      "date_functions",
      "calculation"
    ]
  },
  {
    "code": "FOOD_074",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_075",
    "concepts": [
      "joins",
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
    "code": "FOOD_076",
    "concepts": [
      "cte",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_077",
    "concepts": [
      "cte",
      "joins",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "aggregation",
      "max",
      "group_by",
      "sorting",
      "date_difference"
    ]
  },
  {
    "code": "FOOD_078",
    "concepts": [
      "cte",
      "joins",
      "distinct",
      "window_functions",
      "row_number",
      "partition_by",
      "aggregation",
      "count",
      "group_by",
      "having",
      "sorting",
      "pattern_detection"
    ]
  },
  {
    "code": "FOOD_079",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "trend_analysis",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_080",
    "concepts": [
      "cte",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "joins",
      "comparison",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "FOOD_081",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "limit",
      "trend_analysis"
    ]
  },
  {
    "code": "FOOD_082",
    "concepts": [
      "cte",
      "joins",
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
    "code": "FOOD_083",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "conditional_aggregation",
      "group_by",
      "having",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_084",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "count",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_085",
    "concepts": [
      "joins",
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
    "code": "FOOD_086",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "conditional_aggregation",
      "sorting",
      "trend_analysis",
      "comparison"
    ]
  },
  {
    "code": "FOOD_087",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "date_functions",
      "arithmetic",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_088",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_089",
    "concepts": [
      "filtering",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_090",
    "concepts": [
      "cte",
      "joins",
      "distinct",
      "aggregation",
      "count",
      "group_by",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_091",
    "concepts": [
      "cte",
      "joins",
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
    "code": "FOOD_092",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count",
      "conditional_aggregation",
      "group_by",
      "having",
      "date_functions",
      "sorting"
    ]
  },
  {
    "code": "FOOD_093",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting"
    ]
  },
  {
    "code": "FOOD_094",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_095",
    "concepts": [
      "subquery",
      "exists",
      "joins",
      "filtering",
      "sorting"
    ]
  },
  {
    "code": "FOOD_096",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "running_max",
      "partition_by",
      "trend_analysis",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_097",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_098",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "count",
      "group_by",
      "comparison",
      "sorting"
    ]
  },
  {
    "code": "FOOD_099",
    "concepts": [
      "cte",
      "joins",
      "window_functions",
      "running_max",
      "partition_by",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "FOOD_100",
    "concepts": [
      "cte",
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "lead",
      "lag_lead",
      "partition_by",
      "trend_analysis",
      "sorting",
      "comparison"
    ]
  }
];

export const solutions = [
  {
    "code": "FOOD_001",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_users FROM users;",
        "explanation": "## Approach\n\nCount all rows in the `users` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one registered user.\n- `COUNT(*)` returns the total number of rows.\n- The result is named `total_users`.\n\n## Why this is optimal\n\nIt is the simplest and most direct way to count all users."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_users FROM users;",
        "explanation": "## Approach\n\nCount non-NULL user ids.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- `id` is the primary key, so it is never NULL.\n- That makes `COUNT(id)` equivalent to `COUNT(*)` here.\n\n## Difference from the optimal approach\n\nIt works the same, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "FOOD_002",
    "approaches": [
      {
        "approach_title": "WHERE true",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_users FROM users WHERE is_active = true;",
        "explanation": "## Approach\n\nFilter active users first, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_users\nFROM users\nWHERE is_active = true;\n```\n\n## Explanation\n\n- `WHERE is_active = true` keeps only active users.\n- `COUNT(*)` counts those rows.\n- The result is named `active_users`.\n\n## Why this is optimal\n\nIt directly matches the requirement."
      },
      {
        "approach_title": "WHERE col",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS active_users FROM users WHERE is_active;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_users\nFROM users\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` means the same as `WHERE is_active = true`.\n- The remaining rows are counted.\n\n## Difference from the optimal approach\n\nIt is shorter, but slightly less explicit."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_users FROM users;",
        "explanation": "## Approach\n\nUse a filtered aggregate instead of a `WHERE` clause.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_users\nFROM users;\n```\n\n## Explanation\n\n- The whole table is scanned.\n- `FILTER` counts only rows where `is_active = true`.\n- This produces the same answer.\n\n## Difference from the optimal approach\n\nUseful when calculating multiple conditional counts in one query, but less direct here."
      }
    ]
  },
  {
    "code": "FOOD_003",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_restaurants FROM restaurants;",
        "explanation": "## Approach\n\nCount all rows in the `restaurants` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_restaurants\nFROM restaurants;\n```\n\n## Explanation\n\n- Each row in `restaurants` represents one restaurant.\n- `COUNT(*)` returns the total row count.\n\n## Why this is optimal\n\nIt is the most direct solution."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_restaurants FROM restaurants;",
        "explanation": "## Approach\n\nCount non-NULL restaurant ids.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_restaurants\nFROM restaurants;\n```\n\n## Explanation\n\n- `id` is never NULL.\n- So this returns the same value as `COUNT(*)`.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is cleaner."
      }
    ]
  },
  {
    "code": "FOOD_004",
    "approaches": [
      {
        "approach_title": "WHERE true",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_restaurants FROM restaurants WHERE is_active = true;",
        "explanation": "## Approach\n\nFilter active restaurants and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_restaurants\nFROM restaurants\nWHERE is_active = true;\n```\n\n## Explanation\n\n- Only active restaurants are kept.\n- `COUNT(*)` returns how many remain.\n\n## Why this is optimal\n\nIt exactly matches the question."
      },
      {
        "approach_title": "WHERE col",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS active_restaurants FROM restaurants WHERE is_active;",
        "explanation": "## Approach\n\nUse boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_restaurants\nFROM restaurants\nWHERE is_active;\n```\n\n## Explanation\n\n- PostgreSQL treats `WHERE is_active` as true-only filtering.\n- The matched rows are counted."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_restaurants FROM restaurants;",
        "explanation": "## Approach\n\nCount only active restaurants using a filtered aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_restaurants\nFROM restaurants;\n```\n\n## Explanation\n\n- The table is scanned once.\n- `FILTER` limits the count to active rows.\n- Same final answer as the `WHERE` version."
      }
    ]
  },
  {
    "code": "FOOD_005",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_orders FROM orders;",
        "explanation": "## Approach\n\nCount all rows in the `orders` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_orders\nFROM orders;\n```\n\n## Explanation\n\n- Every row in `orders` is one order.\n- `COUNT(*)` returns the total number of orders.\n\n## Why this is optimal\n\nIt is the simplest possible solution."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_orders FROM orders;",
        "explanation": "## Approach\n\nCount order ids instead of rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_orders\nFROM orders;\n```\n\n## Explanation\n\n- `id` is non-NULL, so the result matches `COUNT(*)`."
      }
    ]
  },
  {
    "code": "FOOD_006",
    "approaches": [
      {
        "approach_title": "WHERE delivered",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nFilter delivered orders first, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS delivered_orders\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- `WHERE order_status = 'delivered'` keeps only delivered orders.\n- `COUNT(*)` counts those rows.\n\n## Why this is optimal\n\nIt is the most direct way to answer the question."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE order_status = 'delivered') AS delivered_orders FROM orders;",
        "explanation": "## Approach\n\nUse a filtered aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE order_status = 'delivered') AS delivered_orders\nFROM orders;\n```\n\n## Explanation\n\n- `FILTER` counts only delivered rows.\n- This returns the same answer as the `WHERE` version."
      },
      {
        "approach_title": "CASE SUM",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders FROM orders;",
        "explanation": "## Approach\n\nTurn delivered rows into 1 and others into 0, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders\nFROM orders;\n```\n\n## Explanation\n\n- Delivered rows contribute `1`.\n- All other rows contribute `0`.\n- The sum gives the delivered order count."
      }
    ]
  },
  {
    "code": "FOOD_007",
    "approaches": [
      {
        "approach_title": "WHERE cancelled",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS cancelled_orders FROM orders WHERE order_status = 'cancelled';",
        "explanation": "## Approach\n\nFilter cancelled orders and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS cancelled_orders\nFROM orders\nWHERE order_status = 'cancelled';\n```\n\n## Explanation\n\n- Only cancelled orders are kept.\n- `COUNT(*)` returns the total number of cancelled orders."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE order_status = 'cancelled') AS cancelled_orders FROM orders;",
        "explanation": "## Approach\n\nCount cancelled rows with a filtered aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE order_status = 'cancelled') AS cancelled_orders\nFROM orders;\n```\n\n## Explanation\n\n- `FILTER` limits the count to cancelled rows."
      },
      {
        "approach_title": "CASE SUM",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT SUM(CASE WHEN order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders FROM orders;",
        "explanation": "## Approach\n\nUse conditional summation.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders\nFROM orders;\n```\n\n## Explanation\n\n- Cancelled rows become `1`.\n- All others become `0`.\n- The sum gives the final count."
      }
    ]
  },
  {
    "code": "FOOD_008",
    "approaches": [
      {
        "approach_title": "AVG",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT AVG(total_amount) AS average_order_value FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nFilter delivered orders and calculate the average of `total_amount`.\n\n## Query\n\n```sql\nSELECT AVG(total_amount) AS average_order_value\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- Only delivered orders are included.\n- `AVG(total_amount)` computes the average order value.\n\n## Why this is optimal\n\nIt directly uses the correct aggregate function."
      },
      {
        "approach_title": "SUM/COUNT",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(total_amount) / COUNT(*) AS average_order_value FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nManually compute the average as sum divided by count.\n\n## Query\n\n```sql\nSELECT SUM(total_amount) / COUNT(*) AS average_order_value\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- `SUM(total_amount)` adds all delivered order values.\n- `COUNT(*)` counts delivered orders.\n- Dividing them gives the average."
      }
    ]
  },
  {
    "code": "FOOD_009",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_drivers FROM drivers;",
        "explanation": "## Approach\n\nCount all rows in the `drivers` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_drivers\nFROM drivers;\n```\n\n## Explanation\n\n- Each row in `drivers` represents one driver.\n- `COUNT(*)` returns the total number of drivers."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_drivers FROM drivers;",
        "explanation": "## Approach\n\nCount non-NULL driver ids.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_drivers\nFROM drivers;\n```\n\n## Explanation\n\n- `id` is non-NULL, so this matches `COUNT(*)`."
      }
    ]
  },
  {
    "code": "FOOD_010",
    "approaches": [
      {
        "approach_title": "WHERE true",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_drivers FROM drivers WHERE is_active = true;",
        "explanation": "## Approach\n\nFilter active drivers and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_drivers\nFROM drivers\nWHERE is_active = true;\n```\n\n## Explanation\n\n- The `WHERE` clause keeps only active drivers.\n- `COUNT(*)` returns how many there are."
      },
      {
        "approach_title": "WHERE col",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS active_drivers FROM drivers WHERE is_active;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_drivers\nFROM drivers\nWHERE is_active;\n```\n\n## Explanation\n\n- `WHERE is_active` is equivalent to `WHERE is_active = true`."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_drivers FROM drivers;",
        "explanation": "## Approach\n\nUse a filtered aggregate to count active drivers.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_drivers\nFROM drivers;\n```\n\n## Explanation\n\n- `FILTER` counts only rows where the driver is active.\n- Same result as the `WHERE` version."
      }
    ]
  },
  {
    "code": "FOOD_011",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_menu_items FROM menu_items;",
        "explanation": "## Approach\n\nCount all rows in the `menu_items` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_menu_items\nFROM menu_items;\n```\n\n## Explanation\n\n- Each row in `menu_items` represents one menu item.\n- `COUNT(*)` returns the total number of rows.\n- The result is named `total_menu_items`.\n\n## Why this is optimal\n\nIt is the simplest and most direct way to count all menu items."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_menu_items FROM menu_items;",
        "explanation": "## Approach\n\nCount non-NULL menu item ids.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_menu_items\nFROM menu_items;\n```\n\n## Explanation\n\n- `id` is the primary key, so it is never NULL.\n- That makes `COUNT(id)` equivalent to `COUNT(*)` here.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "FOOD_012",
    "approaches": [
      {
        "approach_title": "WHERE true",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS available_menu_items FROM menu_items WHERE is_available = true;",
        "explanation": "## Approach\n\nFilter available menu items first, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS available_menu_items\nFROM menu_items\nWHERE is_available = true;\n```\n\n## Explanation\n\n- `WHERE is_available = true` keeps only available menu items.\n- `COUNT(*)` counts those rows.\n- The result is named `available_menu_items`.\n\n## Why this is optimal\n\nIt directly matches the requirement."
      },
      {
        "approach_title": "WHERE col",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS available_menu_items FROM menu_items WHERE is_available;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS available_menu_items\nFROM menu_items\nWHERE is_available;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_available` means the same as `WHERE is_available = true`.\n- The remaining rows are counted.\n\n## Difference from the optimal approach\n\nIt is shorter, but slightly less explicit."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_available = true) AS available_menu_items FROM menu_items;",
        "explanation": "## Approach\n\nUse a filtered aggregate instead of a `WHERE` clause.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_available = true) AS available_menu_items\nFROM menu_items;\n```\n\n## Explanation\n\n- The whole table is scanned.\n- `FILTER` counts only rows where `is_available = true`.\n- This produces the same answer.\n\n## Difference from the optimal approach\n\nUseful when calculating multiple conditional counts in one query, but less direct here."
      }
    ]
  },
  {
    "code": "FOOD_013",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_coupons FROM coupons;",
        "explanation": "## Approach\n\nCount all rows in the `coupons` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_coupons\nFROM coupons;\n```\n\n## Explanation\n\n- Each row in `coupons` represents one coupon.\n- `COUNT(*)` returns the total row count.\n- The result is named `total_coupons`.\n\n## Why this is optimal\n\nIt is the most direct solution."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_coupons FROM coupons;",
        "explanation": "## Approach\n\nCount non-NULL coupon ids.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_coupons\nFROM coupons;\n```\n\n## Explanation\n\n- `id` is never NULL.\n- So this returns the same value as `COUNT(*)`."
      }
    ]
  },
  {
    "code": "FOOD_014",
    "approaches": [
      {
        "approach_title": "WHERE true",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS active_coupons FROM coupons WHERE is_active = true;",
        "explanation": "## Approach\n\nFilter active coupons and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_coupons\nFROM coupons\nWHERE is_active = true;\n```\n\n## Explanation\n\n- Only active coupons are kept.\n- `COUNT(*)` returns how many remain.\n\n## Why this is optimal\n\nIt exactly matches the question."
      },
      {
        "approach_title": "WHERE col",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS active_coupons FROM coupons WHERE is_active;",
        "explanation": "## Approach\n\nUse boolean shorthand.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS active_coupons\nFROM coupons\nWHERE is_active;\n```\n\n## Explanation\n\n- PostgreSQL treats `WHERE is_active` as true-only filtering.\n- The matched rows are counted."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_coupons FROM coupons;",
        "explanation": "## Approach\n\nCount only active coupons using a filtered aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE is_active = true) AS active_coupons\nFROM coupons;\n```\n\n## Explanation\n\n- `FILTER` limits the count to active rows.\n- This produces the same answer as the `WHERE` version."
      }
    ]
  },
  {
    "code": "FOOD_015",
    "approaches": [
      {
        "approach_title": "IS NOT NULL",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS coupon_orders FROM orders WHERE coupon_id IS NOT NULL;",
        "explanation": "## Approach\n\nFilter orders that used a coupon and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS coupon_orders\nFROM orders\nWHERE coupon_id IS NOT NULL;\n```\n\n## Explanation\n\n- `coupon_id IS NOT NULL` keeps only orders where a coupon was applied.\n- `COUNT(*)` counts those rows.\n\n## Why this is optimal\n\nIt is the most direct way to identify coupon orders."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE coupon_id IS NOT NULL) AS coupon_orders FROM orders;",
        "explanation": "## Approach\n\nUse a filtered aggregate to count coupon orders.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE coupon_id IS NOT NULL) AS coupon_orders\nFROM orders;\n```\n\n## Explanation\n\n- The full table is scanned.\n- `FILTER` counts only rows with a non-NULL `coupon_id`.\n- Same final result."
      },
      {
        "approach_title": "CASE SUM",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT SUM(CASE WHEN coupon_id IS NOT NULL THEN 1 ELSE 0 END) AS coupon_orders FROM orders;",
        "explanation": "## Approach\n\nConvert coupon orders into 1 and others into 0, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN coupon_id IS NOT NULL THEN 1 ELSE 0 END) AS coupon_orders\nFROM orders;\n```\n\n## Explanation\n\n- Orders with a coupon contribute `1`.\n- Orders without a coupon contribute `0`.\n- The sum gives the count of coupon orders."
      }
    ]
  },
  {
    "code": "FOOD_016",
    "approaches": [
      {
        "approach_title": "COUNT(*)",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_reviews FROM reviews;",
        "explanation": "## Approach\n\nCount all rows in the `reviews` table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_reviews\nFROM reviews;\n```\n\n## Explanation\n\n- Each row in `reviews` represents one review.\n- `COUNT(*)` returns the total review count.\n\n## Why this is optimal\n\nIt is the simplest possible solution."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_reviews FROM reviews;",
        "explanation": "## Approach\n\nCount review ids instead of rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_reviews\nFROM reviews;\n```\n\n## Explanation\n\n- `id` is non-NULL, so the result matches `COUNT(*)`."
      }
    ]
  },
  {
    "code": "FOOD_017",
    "approaches": [
      {
        "approach_title": "AVG",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT AVG(rating) AS average_rating FROM reviews;",
        "explanation": "## Approach\n\nUse `AVG()` on the `rating` column.\n\n## Query\n\n```sql\nSELECT AVG(rating) AS average_rating\nFROM reviews;\n```\n\n## Explanation\n\n- `rating` stores the overall review rating.\n- `AVG(rating)` calculates the mean value across all reviews.\n- The result is named `average_rating`.\n\n## Why this is optimal\n\nIt directly uses the correct aggregate function for the requirement."
      },
      {
        "approach_title": "SUM/COUNT",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(rating)::numeric / COUNT(*) AS average_rating FROM reviews;",
        "explanation": "## Approach\n\nManually calculate the average using total sum divided by row count.\n\n## Query\n\n```sql\nSELECT SUM(rating)::numeric / COUNT(*) AS average_rating\nFROM reviews;\n```\n\n## Explanation\n\n- `SUM(rating)` adds all ratings.\n- `COUNT(*)` counts all review rows.\n- Dividing them gives the average rating."
      }
    ]
  },
  {
    "code": "FOOD_018",
    "approaches": [
      {
        "approach_title": "DATE = today",
        "approach_type": "date_filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS orders_today FROM orders WHERE DATE(created_at) = CURRENT_DATE;",
        "explanation": "## Approach\n\nConvert `created_at` to a date and compare it with `CURRENT_DATE`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS orders_today\nFROM orders\nWHERE DATE(created_at) = CURRENT_DATE;\n```\n\n## Explanation\n\n- `DATE(created_at)` removes the time part.\n- `CURRENT_DATE` represents today.\n- Matching rows are counted.\n\n## Why this is optimal\n\nIt is simple and easy to understand."
      },
      {
        "approach_title": "Date range",
        "approach_type": "date_filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS orders_today FROM orders WHERE created_at >= CURRENT_DATE AND created_at < CURRENT_DATE + INTERVAL '1 day';",
        "explanation": "## Approach\n\nUse a timestamp range covering the full current day.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS orders_today\nFROM orders\nWHERE created_at >= CURRENT_DATE\n  AND created_at < CURRENT_DATE + INTERVAL '1 day';\n```\n\n## Explanation\n\n- The lower bound starts at midnight today.\n- The upper bound stops before midnight tomorrow.\n- All timestamps from today are included.\n\n## Difference from the optimal approach\n\nThis is more explicit for timestamp logic, but slightly longer."
      }
    ]
  },
  {
    "code": "FOOD_019",
    "approaches": [
      {
        "approach_title": "WHERE city",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS users_in_hyderabad FROM users WHERE default_city = 'Hyderabad';",
        "explanation": "## Approach\n\nFilter users by `default_city` and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS users_in_hyderabad\nFROM users\nWHERE default_city = 'Hyderabad';\n```\n\n## Explanation\n\n- Only users whose `default_city` is Hyderabad are kept.\n- `COUNT(*)` returns how many such users exist.\n\n## Why this is optimal\n\nIt directly matches the requirement."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE default_city = 'Hyderabad') AS users_in_hyderabad FROM users;",
        "explanation": "## Approach\n\nCount Hyderabad users with a filtered aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE default_city = 'Hyderabad') AS users_in_hyderabad\nFROM users;\n```\n\n## Explanation\n\n- The table is scanned once.\n- `FILTER` counts only rows matching Hyderabad."
      }
    ]
  },
  {
    "code": "FOOD_020",
    "approaches": [
      {
        "approach_title": "WHERE city",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS restaurants_in_hyderabad FROM restaurants WHERE city = 'Hyderabad';",
        "explanation": "## Approach\n\nFilter restaurants by city and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS restaurants_in_hyderabad\nFROM restaurants\nWHERE city = 'Hyderabad';\n```\n\n## Explanation\n\n- Only restaurants located in Hyderabad are kept.\n- `COUNT(*)` returns how many there are.\n\n## Why this is optimal\n\nIt is the most direct solution."
      },
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE city = 'Hyderabad') AS restaurants_in_hyderabad FROM restaurants;",
        "explanation": "## Approach\n\nUse a filtered aggregate to count Hyderabad restaurants.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE city = 'Hyderabad') AS restaurants_in_hyderabad\nFROM restaurants;\n```\n\n## Explanation\n\n- `FILTER` counts only rows where `city = 'Hyderabad'`.\n- This gives the same answer as the `WHERE` version."
      }
    ]
  },
  {
    "code": "FOOD_021",
    "approaches": [
      {
        "approach_title": "GROUP BY",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT restaurant_id, COUNT(*) AS total_orders FROM orders GROUP BY restaurant_id ORDER BY total_orders DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nGroup orders by restaurant and count rows in each group.\n\n## Query\n\n```sql\nSELECT restaurant_id, COUNT(*) AS total_orders\nFROM orders\nGROUP BY restaurant_id\nORDER BY total_orders DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY restaurant_id` creates one group per restaurant.\n- `COUNT(*)` counts how many orders each restaurant received.\n- Results are sorted by highest count first.\n\n## Why this is optimal\n\nIt is the most direct grouped-count solution."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT restaurant_id, COUNT(id) AS total_orders FROM orders GROUP BY restaurant_id ORDER BY total_orders DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nCount order ids instead of all rows.\n\n## Query\n\n```sql\nSELECT restaurant_id, COUNT(id) AS total_orders\nFROM orders\nGROUP BY restaurant_id\nORDER BY total_orders DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- `id` is non-NULL, so `COUNT(id)` matches `COUNT(*)` here.\n- Grouping and sorting remain the same.\n\n## Difference from the optimal approach\n\nIt works the same, but `COUNT(*)` is cleaner."
      }
    ]
  },
  {
    "code": "FOOD_022",
    "approaches": [
      {
        "approach_title": "WHERE delivered",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered' GROUP BY user_id ORDER BY delivered_orders DESC, user_id ASC;",
        "explanation": "## Approach\n\nFilter delivered orders first, then group by user and count them.\n\n## Query\n\n```sql\nSELECT user_id, COUNT(*) AS delivered_orders\nFROM orders\nWHERE order_status = 'delivered'\nGROUP BY user_id\nORDER BY delivered_orders DESC, user_id ASC;\n```\n\n## Explanation\n\n- `WHERE order_status = 'delivered'` keeps only delivered orders.\n- `GROUP BY user_id` creates one row per user.\n- `COUNT(*)` gives the delivered order count.\n- Only users with at least one delivered order appear.\n\n## Why this is optimal\n\nIt directly expresses the requirement and naturally excludes zero-delivery users."
      },
      {
        "approach_title": "FILTER + HAVING",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT user_id, COUNT(*) FILTER (WHERE order_status = 'delivered') AS delivered_orders FROM orders GROUP BY user_id HAVING COUNT(*) FILTER (WHERE order_status = 'delivered') > 0 ORDER BY delivered_orders DESC, user_id ASC;",
        "explanation": "## Approach\n\nGroup all orders by user, count only delivered ones with `FILTER`, then remove users whose delivered count is zero.\n\n## Query\n\n```sql\nSELECT user_id,\n       COUNT(*) FILTER (WHERE order_status = 'delivered') AS delivered_orders\nFROM orders\nGROUP BY user_id\nHAVING COUNT(*) FILTER (WHERE order_status = 'delivered') > 0\nORDER BY delivered_orders DESC, user_id ASC;\n```\n\n## Explanation\n\n- All orders are grouped by `user_id`.\n- `FILTER` counts only delivered rows inside each user group.\n- Without `HAVING`, users with zero delivered orders would still appear.\n- `HAVING ... > 0` makes the result match the `WHERE` solution."
      },
      {
        "approach_title": "CASE + HAVING",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders FROM orders GROUP BY user_id HAVING SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) > 0 ORDER BY delivered_orders DESC, user_id ASC;",
        "explanation": "## Approach\n\nUse conditional summation inside each user group, then exclude groups whose delivered total is zero.\n\n## Query\n\n```sql\nSELECT user_id,\n       SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders\nFROM orders\nGROUP BY user_id\nHAVING SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) > 0\nORDER BY delivered_orders DESC, user_id ASC;\n```\n\n## Explanation\n\n- `CASE WHEN` returns `1` for delivered orders and `0` for all others.\n- `SUM(...)` adds those values per user.\n- Without `HAVING`, users with zero delivered orders would still be included.\n- `HAVING ... > 0` removes those extra rows."
      }
    ]
  },
  {
    "code": "FOOD_023",
    "approaches": [
      {
        "approach_title": "SUM revenue",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT restaurant_id, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nFilter delivered orders and sum their `total_amount` by restaurant.\n\n## Query\n\n```sql\nSELECT restaurant_id, SUM(total_amount) AS total_revenue\nFROM orders\nWHERE order_status = 'delivered'\nGROUP BY restaurant_id\nORDER BY total_revenue DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- Only delivered orders are included.\n- `SUM(total_amount)` gives total revenue per restaurant.\n- Results are sorted by highest revenue first.\n\n## Why this is optimal\n\nIt is the cleanest revenue aggregation."
      },
      {
        "approach_title": "FILTER SUM",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT restaurant_id, SUM(total_amount) FILTER (WHERE order_status = 'delivered') AS total_revenue FROM orders GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nGroup all orders by restaurant and sum only delivered totals with `FILTER`.\n\n## Query\n\n```sql\nSELECT restaurant_id,\n       SUM(total_amount) FILTER (WHERE order_status = 'delivered') AS total_revenue\nFROM orders\nGROUP BY restaurant_id\nORDER BY total_revenue DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- `FILTER` limits the sum to delivered orders.\n- This is useful when calculating several metrics at once.\n\n## Difference from the optimal approach\n\nIt is more flexible, but slightly less direct."
      },
      {
        "approach_title": "CASE SUM",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT restaurant_id, SUM(CASE WHEN order_status = 'delivered' THEN total_amount ELSE 0 END) AS total_revenue FROM orders GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nUse conditional summation to add revenue only from delivered orders.\n\n## Query\n\n```sql\nSELECT restaurant_id,\n       SUM(CASE WHEN order_status = 'delivered' THEN total_amount ELSE 0 END) AS total_revenue\nFROM orders\nGROUP BY restaurant_id\nORDER BY total_revenue DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- Delivered orders contribute their `total_amount`.\n- Other statuses contribute `0`.\n- The sum returns restaurant revenue."
      }
    ]
  },
  {
    "code": "FOOD_024",
    "approaches": [
      {
        "approach_title": "GROUP BY",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT restaurant_id, COUNT(*) AS menu_item_count FROM menu_items GROUP BY restaurant_id ORDER BY menu_item_count DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nGroup menu items by restaurant and count them.\n\n## Query\n\n```sql\nSELECT restaurant_id, COUNT(*) AS menu_item_count\nFROM menu_items\nGROUP BY restaurant_id\nORDER BY menu_item_count DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY restaurant_id` creates one group per restaurant.\n- `COUNT(*)` counts how many menu items each restaurant has.\n- Results are sorted by highest count first.\n\n## Why this is optimal\n\nIt is the simplest grouped-count solution."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT restaurant_id, COUNT(id) AS menu_item_count FROM menu_items GROUP BY restaurant_id ORDER BY menu_item_count DESC, restaurant_id ASC;",
        "explanation": "## Approach\n\nCount menu item ids instead of rows.\n\n## Query\n\n```sql\nSELECT restaurant_id, COUNT(id) AS menu_item_count\nFROM menu_items\nGROUP BY restaurant_id\nORDER BY menu_item_count DESC, restaurant_id ASC;\n```\n\n## Explanation\n\n- `id` is non-NULL, so this matches `COUNT(*)`."
      }
    ]
  },
  {
    "code": "FOOD_025",
    "approaches": [
      {
        "approach_title": "COUNT DISTINCT",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(DISTINCT user_id) AS ordering_users FROM orders;",
        "explanation": "## Approach\n\nCount distinct users appearing in the `orders` table.\n\n## Query\n\n```sql\nSELECT COUNT(DISTINCT user_id) AS ordering_users\nFROM orders;\n```\n\n## Explanation\n\n- A user may place multiple orders.\n- `COUNT(DISTINCT user_id)` counts each user only once.\n- The result is the number of users who have placed at least one order.\n\n## Why this is optimal\n\nIt directly captures the uniqueness requirement."
      },
      {
        "approach_title": "Distinct subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS ordering_users FROM (SELECT DISTINCT user_id FROM orders) t;",
        "explanation": "## Approach\n\nFirst select distinct users, then count those rows.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS ordering_users\nFROM (\n  SELECT DISTINCT user_id\n  FROM orders\n) t;\n```\n\n## Explanation\n\n- The inner query creates one row per user.\n- The outer query counts those rows.\n\n## Difference from the optimal approach\n\nIt is valid, but less concise than `COUNT(DISTINCT ...)`."
      }
    ]
  },
  {
    "code": "FOOD_026",
    "approaches": [
      {
        "approach_title": "AVG",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT AVG(delivery_fee) AS average_delivery_fee FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nFilter delivered orders and average their `delivery_fee`.\n\n## Query\n\n```sql\nSELECT AVG(delivery_fee) AS average_delivery_fee\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- Only delivered orders are included.\n- `AVG(delivery_fee)` gives the mean delivery fee.\n\n## Why this is optimal\n\nIt directly uses the correct aggregate."
      },
      {
        "approach_title": "SUM/COUNT",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(delivery_fee) / COUNT(*) AS average_delivery_fee FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nManually compute the average using sum divided by count.\n\n## Query\n\n```sql\nSELECT SUM(delivery_fee) / COUNT(*) AS average_delivery_fee\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- `SUM(delivery_fee)` adds all delivered delivery fees.\n- `COUNT(*)` counts delivered rows.\n- Dividing gives the average."
      }
    ]
  },
  {
    "code": "FOOD_027",
    "approaches": [
      {
        "approach_title": "AVG",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT AVG(packaging_fee) AS average_packaging_fee FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nFilter delivered orders and calculate the average `packaging_fee`.\n\n## Query\n\n```sql\nSELECT AVG(packaging_fee) AS average_packaging_fee\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- Only delivered orders are considered.\n- `AVG(packaging_fee)` computes the mean packaging fee.\n\n## Why this is optimal\n\nIt is the most direct approach."
      },
      {
        "approach_title": "SUM/COUNT",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(packaging_fee) / COUNT(*) AS average_packaging_fee FROM orders WHERE order_status = 'delivered';",
        "explanation": "## Approach\n\nManually calculate the average packaging fee.\n\n## Query\n\n```sql\nSELECT SUM(packaging_fee) / COUNT(*) AS average_packaging_fee\nFROM orders\nWHERE order_status = 'delivered';\n```\n\n## Explanation\n\n- The sum adds all packaging fees.\n- The count gives the number of delivered orders.\n- Dividing them returns the average."
      }
    ]
  },
  {
    "code": "FOOD_028",
    "approaches": [
      {
        "approach_title": "GROUP BY",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT cuisine, COUNT(*) AS restaurant_count FROM restaurants GROUP BY cuisine ORDER BY restaurant_count DESC, cuisine ASC;",
        "explanation": "## Approach\n\nGroup restaurants by cuisine and count how many belong to each cuisine.\n\n## Query\n\n```sql\nSELECT cuisine, COUNT(*) AS restaurant_count\nFROM restaurants\nGROUP BY cuisine\nORDER BY restaurant_count DESC, cuisine ASC;\n```\n\n## Explanation\n\n- `GROUP BY cuisine` creates one row per cuisine.\n- `COUNT(*)` counts restaurants in that cuisine.\n- Results are sorted by count descending, then cuisine name.\n\n## Why this is optimal\n\nIt directly answers the grouped counting question."
      },
      {
        "approach_title": "COUNT(id)",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT cuisine, COUNT(id) AS restaurant_count FROM restaurants GROUP BY cuisine ORDER BY restaurant_count DESC, cuisine ASC;",
        "explanation": "## Approach\n\nCount restaurant ids within each cuisine group.\n\n## Query\n\n```sql\nSELECT cuisine, COUNT(id) AS restaurant_count\nFROM restaurants\nGROUP BY cuisine\nORDER BY restaurant_count DESC, cuisine ASC;\n```\n\n## Explanation\n\n- `id` is non-NULL, so this matches `COUNT(*)`."
      }
    ]
  },
  {
    "code": "FOOD_029",
    "approaches": [
      {
        "approach_title": "ORDER LIMIT",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, total_amount FROM orders WHERE order_status = 'delivered' ORDER BY total_amount DESC, id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter delivered orders, sort by highest `total_amount`, and keep the top 5.\n\n## Query\n\n```sql\nSELECT id, total_amount\nFROM orders\nWHERE order_status = 'delivered'\nORDER BY total_amount DESC, id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE` keeps only delivered orders.\n- `ORDER BY total_amount DESC` puts the highest value orders first.\n- `id ASC` breaks ties consistently.\n- `LIMIT 5` returns the top five rows.\n\n## Why this is optimal\n\nIt is the standard top-N solution."
      },
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ranked_orders AS (SELECT id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC, id ASC) AS rn FROM orders WHERE order_status = 'delivered') SELECT id, total_amount FROM ranked_orders WHERE rn <= 5 ORDER BY total_amount DESC, id ASC;",
        "explanation": "## Approach\n\nRank delivered orders with `ROW_NUMBER()` and keep the first 5.\n\n## Query\n\n```sql\nWITH ranked_orders AS (\n  SELECT id, total_amount,\n         ROW_NUMBER() OVER (ORDER BY total_amount DESC, id ASC) AS rn\n  FROM orders\n  WHERE order_status = 'delivered'\n)\nSELECT id, total_amount\nFROM ranked_orders\nWHERE rn <= 5\nORDER BY total_amount DESC, id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` assigns a rank after sorting.\n- The outer query keeps rows ranked 1 through 5.\n\n## Difference from the optimal approach\n\nIt is more verbose, but useful when you need ranking logic."
      }
    ]
  },
  {
    "code": "FOOD_030",
    "approaches": [
      {
        "approach_title": "JOIN",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT o.id, p.payment_status FROM orders o JOIN payments p ON p.order_id = o.id ORDER BY o.id ASC;",
        "explanation": "## Approach\n\nJoin each order to its payment row using `order_id`.\n\n## Query\n\n```sql\nSELECT o.id, p.payment_status\nFROM orders o\nJOIN payments p ON p.order_id = o.id\nORDER BY o.id ASC;\n```\n\n## Explanation\n\n- `payments.order_id` links each payment to its order.\n- The join returns the order id together with its payment status.\n- Results are sorted by order id.\n\n## Why this is optimal\n\nIt is the most direct relationship join."
      },
      {
        "approach_title": "Reverse join",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT o.id, p.payment_status FROM payments p JOIN orders o ON o.id = p.order_id ORDER BY o.id ASC;",
        "explanation": "## Approach\n\nStart from `payments` and join back to `orders`.\n\n## Query\n\n```sql\nSELECT o.id, p.payment_status\nFROM payments p\nJOIN orders o ON o.id = p.order_id\nORDER BY o.id ASC;\n```\n\n## Explanation\n\n- This uses the same relationship in the reverse direction.\n- The final output remains the same."
      }
    ]
  },
  {
    "code": "FOOD_031",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name, COUNT(o.id) AS total_orders FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY total_orders DESC, r.id ASC;",
        "explanation": "## Approach\n\nJoin restaurants to orders and count matched orders per restaurant.\n\n## Query\n\n```sql\nSELECT r.id, r.name, COUNT(o.id) AS total_orders\nFROM restaurants r\nLEFT JOIN orders o ON o.restaurant_id = r.id\nGROUP BY r.id, r.name\nORDER BY total_orders DESC, r.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps restaurants even if they have zero orders.\n- `COUNT(o.id)` counts only matched order rows.\n- Grouping by restaurant id and name produces one row per restaurant.\n\n## Why this is optimal\n\nIt returns both ordered and never-ordered restaurants in one direct query."
      },
      {
        "approach_title": "Order counts CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH order_counts AS (SELECT restaurant_id, COUNT(*) AS total_orders FROM orders GROUP BY restaurant_id) SELECT r.id, r.name, COALESCE(oc.total_orders, 0) AS total_orders FROM restaurants r LEFT JOIN order_counts oc ON oc.restaurant_id = r.id ORDER BY total_orders DESC, r.id ASC;",
        "explanation": "## Approach\n\nCount orders per restaurant first, then join those counts back to restaurants.\n\n## Query\n\n```sql\nWITH order_counts AS (\n  SELECT restaurant_id, COUNT(*) AS total_orders\n  FROM orders\n  GROUP BY restaurant_id\n)\nSELECT r.id, r.name, COALESCE(oc.total_orders, 0) AS total_orders\nFROM restaurants r\nLEFT JOIN order_counts oc ON oc.restaurant_id = r.id\nORDER BY total_orders DESC, r.id ASC;\n```\n\n## Explanation\n\n- The CTE computes one row per restaurant in `orders`.\n- `LEFT JOIN` keeps restaurants with no matching row.\n- `COALESCE` turns missing counts into `0`."
      }
    ]
  },
  {
    "code": "FOOD_032",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name, COUNT(o.id) AS delivered_orders FROM users u LEFT JOIN orders o ON o.user_id = u.id AND o.order_status = 'delivered' GROUP BY u.id, u.full_name ORDER BY delivered_orders DESC, u.id ASC;",
        "explanation": "## Approach\n\nJoin users to only delivered orders, then count per user.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(o.id) AS delivered_orders\nFROM users u\nLEFT JOIN orders o\n  ON o.user_id = u.id\n AND o.order_status = 'delivered'\nGROUP BY u.id, u.full_name\nORDER BY delivered_orders DESC, u.id ASC;\n```\n\n## Explanation\n\n- The join condition includes `order_status = 'delivered'`.\n- `LEFT JOIN` keeps users with zero delivered orders.\n- `COUNT(o.id)` counts only delivered matches.\n\n## Why this is optimal\n\nIt includes all users while counting only delivered orders."
      },
      {
        "approach_title": "Delivered CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivered_counts AS (SELECT user_id, COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered' GROUP BY user_id) SELECT u.id, u.full_name, COALESCE(dc.delivered_orders, 0) AS delivered_orders FROM users u LEFT JOIN delivered_counts dc ON dc.user_id = u.id ORDER BY delivered_orders DESC, u.id ASC;",
        "explanation": "## Approach\n\nCount delivered orders first, then join those counts to users.\n\n## Query\n\n```sql\nWITH delivered_counts AS (\n  SELECT user_id, COUNT(*) AS delivered_orders\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, COALESCE(dc.delivered_orders, 0) AS delivered_orders\nFROM users u\nLEFT JOIN delivered_counts dc ON dc.user_id = u.id\nORDER BY delivered_orders DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE contains only users who have delivered orders.\n- `LEFT JOIN` keeps all users.\n- `COALESCE` changes missing counts to `0`."
      }
    ]
  },
  {
    "code": "FOOD_033",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name, COUNT(o.id) AS delivered_orders, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.id, r.name ORDER BY total_revenue DESC, r.id ASC;",
        "explanation": "## Approach\n\nJoin restaurants to delivered orders and calculate both count and revenue.\n\n## Query\n\n```sql\nSELECT r.id, r.name,\n       COUNT(o.id) AS delivered_orders,\n       COALESCE(SUM(o.total_amount), 0) AS total_revenue\nFROM restaurants r\nLEFT JOIN orders o\n  ON o.restaurant_id = r.id\n AND o.order_status = 'delivered'\nGROUP BY r.id, r.name\nORDER BY total_revenue DESC, r.id ASC;\n```\n\n## Explanation\n\n- Delivered orders are filtered in the join.\n- `COUNT(o.id)` gives delivered order count.\n- `SUM(o.total_amount)` gives revenue.\n- `COALESCE` changes NULL revenue to `0`.\n\n## Why this is optimal\n\nIt computes both required metrics in a single grouped query."
      },
      {
        "approach_title": "Revenue CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivered_stats AS (SELECT restaurant_id, COUNT(*) AS delivered_orders, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id) SELECT r.id, r.name, COALESCE(ds.delivered_orders, 0) AS delivered_orders, COALESCE(ds.total_revenue, 0) AS total_revenue FROM restaurants r LEFT JOIN delivered_stats ds ON ds.restaurant_id = r.id ORDER BY total_revenue DESC, r.id ASC;",
        "explanation": "## Approach\n\nAggregate delivered order stats first, then join them to restaurants.\n\n## Query\n\n```sql\nWITH delivered_stats AS (\n  SELECT restaurant_id,\n         COUNT(*) AS delivered_orders,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY restaurant_id\n)\nSELECT r.id, r.name,\n       COALESCE(ds.delivered_orders, 0) AS delivered_orders,\n       COALESCE(ds.total_revenue, 0) AS total_revenue\nFROM restaurants r\nLEFT JOIN delivered_stats ds ON ds.restaurant_id = r.id\nORDER BY total_revenue DESC, r.id ASC;\n```\n\n## Explanation\n\n- The CTE precomputes both delivered metrics.\n- The outer query attaches them to all restaurants.\n- Missing values become zero with `COALESCE`."
      }
    ]
  },
  {
    "code": "FOOD_034",
    "approaches": [
      {
        "approach_title": "AVG",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name, AVG(rv.rating) AS average_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY average_rating DESC, r.id ASC;",
        "explanation": "## Approach\n\nJoin restaurants to reviews and average ratings per restaurant.\n\n## Query\n\n```sql\nSELECT r.id, r.name, AVG(rv.rating) AS average_rating\nFROM restaurants r\nJOIN reviews rv ON rv.restaurant_id = r.id\nGROUP BY r.id, r.name\nORDER BY average_rating DESC, r.id ASC;\n```\n\n## Explanation\n\n- Each review contributes one rating value.\n- `AVG(rv.rating)` computes the mean rating per restaurant.\n- Results are sorted from highest average rating to lowest.\n\n## Why this is optimal\n\nIt directly uses the relationship and the correct aggregate."
      },
      {
        "approach_title": "SUM/COUNT",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT r.id, r.name, SUM(rv.rating)::numeric / COUNT(rv.id) AS average_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY average_rating DESC, r.id ASC;",
        "explanation": "## Approach\n\nManually calculate the average using total rating sum divided by review count.\n\n## Query\n\n```sql\nSELECT r.id, r.name,\n       SUM(rv.rating)::numeric / COUNT(rv.id) AS average_rating\nFROM restaurants r\nJOIN reviews rv ON rv.restaurant_id = r.id\nGROUP BY r.id, r.name\nORDER BY average_rating DESC, r.id ASC;\n```\n\n## Explanation\n\n- `SUM(rv.rating)` adds all ratings for a restaurant.\n- `COUNT(rv.id)` counts reviews.\n- Dividing them gives the average rating."
      }
    ]
  },
  {
    "code": "FOOD_035",
    "approaches": [
      {
        "approach_title": "LEFT JOIN NULL",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id WHERE o.id IS NULL ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nLeft join restaurants to orders and keep only unmatched rows.\n\n## Query\n\n```sql\nSELECT r.id, r.name\nFROM restaurants r\nLEFT JOIN orders o ON o.restaurant_id = r.id\nWHERE o.id IS NULL\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps every restaurant.\n- Restaurants with no orders get NULLs from the `orders` side.\n- `WHERE o.id IS NULL` keeps only those never-ordered restaurants.\n\n## Why this is optimal\n\nIt is the standard anti-join pattern."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT r.id, r.name FROM restaurants r WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.restaurant_id = r.id) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nReturn restaurants for which no matching order exists.\n\n## Query\n\n```sql\nSELECT r.id, r.name\nFROM restaurants r\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.restaurant_id = r.id\n)\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- The subquery checks for any order for that restaurant.\n- `NOT EXISTS` keeps only restaurants with none.\n\n## Difference from the optimal approach\n\nAlso a standard solution, but slightly less visual than the join approach."
      }
    ]
  },
  {
    "code": "FOOD_036",
    "approaches": [
      {
        "approach_title": "LEFT JOIN NULL",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nLeft join users to orders and keep users with no match.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE o.id IS NULL\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Users with no orders get NULL values on the order side.\n- `WHERE o.id IS NULL` filters to those users only.\n\n## Why this is optimal\n\nIt is the simplest anti-join pattern."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nReturn users for whom no order row exists.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.user_id = u.id\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the user has any order.\n- `NOT EXISTS` keeps only users with none."
      }
    ]
  },
  {
    "code": "FOOD_037",
    "approaches": [
      {
        "approach_title": "Direct join",
        "approach_type": "multi_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT o.id, d.full_name AS driver_name FROM orders o JOIN driver_assignments da ON da.order_id = o.id JOIN drivers d ON d.id = da.driver_id WHERE o.order_status = 'delivered' ORDER BY o.id ASC;",
        "explanation": "## Approach\n\nJoin delivered orders through driver assignments to drivers.\n\n## Query\n\n```sql\nSELECT o.id, d.full_name AS driver_name\nFROM orders o\nJOIN driver_assignments da ON da.order_id = o.id\nJOIN drivers d ON d.id = da.driver_id\nWHERE o.order_status = 'delivered'\nORDER BY o.id ASC;\n```\n\n## Explanation\n\n- `driver_assignments` links orders to drivers.\n- `drivers` provides the driver name.\n- Filtering to delivered orders keeps the required order set.\n\n## Why this is optimal\n\nIt follows the relationship chain directly."
      },
      {
        "approach_title": "Delivered CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivered_orders AS (SELECT id FROM orders WHERE order_status = 'delivered') SELECT dord.id, d.full_name AS driver_name FROM delivered_orders dord JOIN driver_assignments da ON da.order_id = dord.id JOIN drivers d ON d.id = da.driver_id ORDER BY dord.id ASC;",
        "explanation": "## Approach\n\nFirst isolate delivered orders, then join to assignments and drivers.\n\n## Query\n\n```sql\nWITH delivered_orders AS (\n  SELECT id\n  FROM orders\n  WHERE order_status = 'delivered'\n)\nSELECT dord.id, d.full_name AS driver_name\nFROM delivered_orders dord\nJOIN driver_assignments da ON da.order_id = dord.id\nJOIN drivers d ON d.id = da.driver_id\nORDER BY dord.id ASC;\n```\n\n## Explanation\n\n- The CTE makes the delivered-order filter explicit.\n- The remaining joins attach the driver name."
      }
    ]
  },
  {
    "code": "FOOD_038",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT c.code, COUNT(o.id) AS usage_count FROM coupons c LEFT JOIN orders o ON o.coupon_id = c.id GROUP BY c.id, c.code ORDER BY usage_count DESC, c.code ASC;",
        "explanation": "## Approach\n\nJoin coupons to orders and count how many orders used each coupon.\n\n## Query\n\n```sql\nSELECT c.code, COUNT(o.id) AS usage_count\nFROM coupons c\nLEFT JOIN orders o ON o.coupon_id = c.id\nGROUP BY c.id, c.code\nORDER BY usage_count DESC, c.code ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps coupons even if they were never used.\n- `COUNT(o.id)` counts matching orders.\n- Grouping is done by coupon.\n\n## Why this is optimal\n\nIt includes both used and unused coupons."
      },
      {
        "approach_title": "Usage CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH coupon_usage AS (SELECT coupon_id, COUNT(*) AS usage_count FROM orders WHERE coupon_id IS NOT NULL GROUP BY coupon_id) SELECT c.code, COALESCE(cu.usage_count, 0) AS usage_count FROM coupons c LEFT JOIN coupon_usage cu ON cu.coupon_id = c.id ORDER BY usage_count DESC, c.code ASC;",
        "explanation": "## Approach\n\nCount coupon usage first, then join that result to all coupons.\n\n## Query\n\n```sql\nWITH coupon_usage AS (\n  SELECT coupon_id, COUNT(*) AS usage_count\n  FROM orders\n  WHERE coupon_id IS NOT NULL\n  GROUP BY coupon_id\n)\nSELECT c.code, COALESCE(cu.usage_count, 0) AS usage_count\nFROM coupons c\nLEFT JOIN coupon_usage cu ON cu.coupon_id = c.id\nORDER BY usage_count DESC, c.code ASC;\n```\n\n## Explanation\n\n- The CTE stores counts only for used coupons.\n- `LEFT JOIN` brings back all coupons.\n- `COALESCE` changes missing counts to `0`."
      }
    ]
  },
  {
    "code": "FOOD_039",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT o.id, COUNT(oi.id) AS item_count FROM orders o LEFT JOIN order_items oi ON oi.order_id = o.id GROUP BY o.id ORDER BY o.id ASC;",
        "explanation": "## Approach\n\nJoin orders to their line items and count the matched item rows.\n\n## Query\n\n```sql\nSELECT o.id, COUNT(oi.id) AS item_count\nFROM orders o\nLEFT JOIN order_items oi ON oi.order_id = o.id\nGROUP BY o.id\nORDER BY o.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all orders.\n- `COUNT(oi.id)` counts how many line items each order has.\n- Orders without line items get a count of `0`.\n\n## Why this is optimal\n\nIt directly counts the child rows for each order."
      },
      {
        "approach_title": "Counts CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH item_counts AS (SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id) SELECT o.id, COALESCE(ic.item_count, 0) AS item_count FROM orders o LEFT JOIN item_counts ic ON ic.order_id = o.id ORDER BY o.id ASC;",
        "explanation": "## Approach\n\nCount line items per order first, then join those counts to orders.\n\n## Query\n\n```sql\nWITH item_counts AS (\n  SELECT order_id, COUNT(*) AS item_count\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT o.id, COALESCE(ic.item_count, 0) AS item_count\nFROM orders o\nLEFT JOIN item_counts ic ON ic.order_id = o.id\nORDER BY o.id ASC;\n```\n\n## Explanation\n\n- The CTE stores one count row per order.\n- `LEFT JOIN` keeps all orders.\n- Missing counts become `0`."
      }
    ]
  },
  {
    "code": "FOOD_040",
    "approaches": [
      {
        "approach_title": "JOIN SUM",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.city, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city ORDER BY total_revenue DESC, r.city ASC;",
        "explanation": "## Approach\n\nJoin restaurants to delivered orders and sum revenue by city.\n\n## Query\n\n```sql\nSELECT r.city, SUM(o.total_amount) AS total_revenue\nFROM restaurants r\nJOIN orders o ON o.restaurant_id = r.id\nWHERE o.order_status = 'delivered'\nGROUP BY r.city\nORDER BY total_revenue DESC, r.city ASC;\n```\n\n## Explanation\n\n- `restaurants` provides the city.\n- Delivered orders are filtered with `WHERE`.\n- `SUM(o.total_amount)` gives city revenue.\n- Grouping is done by city.\n\n## Why this is optimal\n\nIt directly aggregates delivered revenue at city level."
      },
      {
        "approach_title": "Revenue CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_revenue AS (SELECT r.city, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city) SELECT city, total_revenue FROM city_revenue ORDER BY total_revenue DESC, city ASC;",
        "explanation": "## Approach\n\nCompute city revenue in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH city_revenue AS (\n  SELECT r.city, SUM(o.total_amount) AS total_revenue\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city\n)\nSELECT city, total_revenue\nFROM city_revenue\nORDER BY total_revenue DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE computes one row per city.\n- The outer query simply returns and sorts it."
      }
    ]
  },
  {
    "code": "FOOD_041",
    "approaches": [
      {
        "approach_title": "HAVING count",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name, COUNT(ua.id) AS address_count FROM users u JOIN user_addresses ua ON ua.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(ua.id) > 1 ORDER BY address_count DESC, u.id ASC;",
        "explanation": "## Approach\n\nJoin users to addresses, count addresses per user, and keep users with more than one.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, COUNT(ua.id) AS address_count\nFROM users u\nJOIN user_addresses ua ON ua.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(ua.id) > 1\nORDER BY address_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- `JOIN` connects each user to their saved addresses.\n- `COUNT(ua.id)` counts addresses per user.\n- `HAVING COUNT(ua.id) > 1` keeps only users with multiple addresses.\n\n## Why this is optimal\n\nIt solves the grouped filtering requirement directly."
      },
      {
        "approach_title": "Address CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH address_counts AS (SELECT user_id, COUNT(*) AS address_count FROM user_addresses GROUP BY user_id) SELECT u.id, u.full_name, ac.address_count FROM users u JOIN address_counts ac ON ac.user_id = u.id WHERE ac.address_count > 1 ORDER BY ac.address_count DESC, u.id ASC;",
        "explanation": "## Approach\n\nCount addresses per user first, then join the counts to users.\n\n## Query\n\n```sql\nWITH address_counts AS (\n  SELECT user_id, COUNT(*) AS address_count\n  FROM user_addresses\n  GROUP BY user_id\n)\nSELECT u.id, u.full_name, ac.address_count\nFROM users u\nJOIN address_counts ac ON ac.user_id = u.id\nWHERE ac.address_count > 1\nORDER BY ac.address_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one count row per user.\n- The outer query joins those counts to user names.\n- Filtering is applied after the join."
      }
    ]
  },
  {
    "code": "FOOD_042",
    "approaches": [
      {
        "approach_title": "WHERE > 30",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, name, avg_prep_time_minutes FROM restaurants WHERE avg_prep_time_minutes > 30 ORDER BY avg_prep_time_minutes DESC, id ASC;",
        "explanation": "## Approach\n\nFilter restaurants whose configured prep time is above 30 minutes.\n\n## Query\n\n```sql\nSELECT id, name, avg_prep_time_minutes\nFROM restaurants\nWHERE avg_prep_time_minutes > 30\nORDER BY avg_prep_time_minutes DESC, id ASC;\n```\n\n## Explanation\n\n- `WHERE avg_prep_time_minutes > 30` keeps only slower-prep restaurants.\n- The result is sorted by highest prep time first.\n\n## Why this is optimal\n\nIt is a direct row-filtering query."
      },
      {
        "approach_title": "CTE filter",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH slow_restaurants AS (SELECT id, name, avg_prep_time_minutes FROM restaurants WHERE avg_prep_time_minutes > 30) SELECT id, name, avg_prep_time_minutes FROM slow_restaurants ORDER BY avg_prep_time_minutes DESC, id ASC;",
        "explanation": "## Approach\n\nIsolate matching restaurants in a CTE, then return them.\n\n## Query\n\n```sql\nWITH slow_restaurants AS (\n  SELECT id, name, avg_prep_time_minutes\n  FROM restaurants\n  WHERE avg_prep_time_minutes > 30\n)\nSELECT id, name, avg_prep_time_minutes\nFROM slow_restaurants\nORDER BY avg_prep_time_minutes DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores restaurants above the threshold.\n- The outer query sorts the result."
      }
    ]
  },
  {
    "code": "FOOD_043",
    "approaches": [
      {
        "approach_title": "GROUP LIMIT",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.id, r.name ORDER BY total_revenue DESC, r.id ASC LIMIT 5;",
        "explanation": "## Approach\n\nAggregate delivered revenue per restaurant, sort it, and keep the top 5.\n\n## Query\n\n```sql\nSELECT r.id, r.name, SUM(o.total_amount) AS total_revenue\nFROM restaurants r\nJOIN orders o ON o.restaurant_id = r.id\nWHERE o.order_status = 'delivered'\nGROUP BY r.id, r.name\nORDER BY total_revenue DESC, r.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Delivered orders are filtered first.\n- `SUM(o.total_amount)` computes restaurant revenue.\n- `LIMIT 5` keeps the top five restaurants.\n\n## Why this is optimal\n\nIt is the standard top-N grouped aggregation."
      },
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH restaurant_revenue AS (SELECT r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.id, r.name), ranked_restaurants AS (SELECT id, name, total_revenue, ROW_NUMBER() OVER (ORDER BY total_revenue DESC, id ASC) AS rn FROM restaurant_revenue) SELECT id, name, total_revenue FROM ranked_restaurants WHERE rn <= 5 ORDER BY total_revenue DESC, id ASC;",
        "explanation": "## Approach\n\nRank restaurants by revenue and keep the first five.\n\n## Query\n\n```sql\nWITH restaurant_revenue AS (\n  SELECT r.id, r.name, SUM(o.total_amount) AS total_revenue\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.id, r.name\n), ranked_restaurants AS (\n  SELECT id, name, total_revenue,\n         ROW_NUMBER() OVER (ORDER BY total_revenue DESC, id ASC) AS rn\n  FROM restaurant_revenue\n)\nSELECT id, name, total_revenue\nFROM ranked_restaurants\nWHERE rn <= 5\nORDER BY total_revenue DESC, id ASC;\n```\n\n## Explanation\n\n- The first CTE computes restaurant revenue.\n- `ROW_NUMBER()` ranks the rows.\n- The outer query keeps ranks 1 to 5."
      }
    ]
  },
  {
    "code": "FOOD_044",
    "approaches": [
      {
        "approach_title": "GROUP LIMIT",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id WHERE o.order_status = 'delivered' GROUP BY u.id, u.full_name ORDER BY total_spent DESC, u.id ASC LIMIT 5;",
        "explanation": "## Approach\n\nAggregate delivered spend per user, sort it, and keep the top 5.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE o.order_status = 'delivered'\nGROUP BY u.id, u.full_name\nORDER BY total_spent DESC, u.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Delivered orders are filtered.\n- `SUM(o.total_amount)` computes user spend.\n- `LIMIT 5` returns the top five spenders.\n\n## Why this is optimal\n\nIt directly computes the required leaderboard."
      },
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_spend AS (SELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id WHERE o.order_status = 'delivered' GROUP BY u.id, u.full_name), ranked_users AS (SELECT id, full_name, total_spent, ROW_NUMBER() OVER (ORDER BY total_spent DESC, id ASC) AS rn FROM user_spend) SELECT id, full_name, total_spent FROM ranked_users WHERE rn <= 5 ORDER BY total_spent DESC, id ASC;",
        "explanation": "## Approach\n\nRank users by delivered spend and keep the first five.\n\n## Query\n\n```sql\nWITH user_spend AS (\n  SELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent\n  FROM users u\n  JOIN orders o ON o.user_id = u.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY u.id, u.full_name\n), ranked_users AS (\n  SELECT id, full_name, total_spent,\n         ROW_NUMBER() OVER (ORDER BY total_spent DESC, id ASC) AS rn\n  FROM user_spend\n)\nSELECT id, full_name, total_spent\nFROM ranked_users\nWHERE rn <= 5\nORDER BY total_spent DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE computes spend per user.\n- Ranking is added with `ROW_NUMBER()`.\n- The outer query keeps the top five ranks."
      }
    ]
  },
  {
    "code": "FOOD_045",
    "approaches": [
      {
        "approach_title": "DISTINCT JOIN",
        "approach_type": "multi_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT r.id, r.name FROM restaurants r JOIN orders o ON o.restaurant_id = r.id JOIN support_tickets st ON st.order_id = o.id ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nJoin restaurants to orders and support tickets, then remove duplicates.\n\n## Query\n\n```sql\nSELECT DISTINCT r.id, r.name\nFROM restaurants r\nJOIN orders o ON o.restaurant_id = r.id\nJOIN support_tickets st ON st.order_id = o.id\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- Each support ticket belongs to an order.\n- Each order belongs to a restaurant.\n- `DISTINCT` ensures each restaurant appears once.\n\n## Why this is optimal\n\nIt follows the real relationships directly."
      },
      {
        "approach_title": "EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT r.id, r.name FROM restaurants r WHERE EXISTS (SELECT 1 FROM orders o JOIN support_tickets st ON st.order_id = o.id WHERE o.restaurant_id = r.id) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nKeep restaurants for which at least one ticketed order exists.\n\n## Query\n\n```sql\nSELECT r.id, r.name\nFROM restaurants r\nWHERE EXISTS (\n  SELECT 1\n  FROM orders o\n  JOIN support_tickets st ON st.order_id = o.id\n  WHERE o.restaurant_id = r.id\n)\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the restaurant has any order with a support ticket.\n- `EXISTS` returns matching restaurants once."
      }
    ]
  },
  {
    "code": "FOOD_046",
    "approaches": [
      {
        "approach_title": "Delay calc",
        "approach_type": "date_functions",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ORDER BY id ASC;",
        "explanation": "## Approach\n\nCalculate how many minutes late each delivered order was.\n\n## Query\n\n```sql\nSELECT id,\n       EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes\nFROM orders\nWHERE order_status = 'delivered'\n  AND delivered_at IS NOT NULL\n  AND estimated_delivery_at IS NOT NULL\n  AND delivered_at > estimated_delivery_at\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `delivered_at - estimated_delivery_at` gives the delay interval.\n- `EXTRACT(EPOCH FROM ...)` converts that interval into seconds.\n- Dividing by `60` converts seconds into minutes.\n- Only delayed delivered orders are included.\n\n## Why optimal\n\nThis is the cleanest and most precise way to calculate delay in minutes."
      },
      {
        "approach_title": "Interval mins",
        "approach_type": "date_functions",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, EXTRACT(EPOCH FROM AGE(delivered_at, estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ORDER BY id ASC;",
        "explanation": "## Approach\n\nAlternative using `AGE()` to build the interval first.\n\n## Query\n\n```sql\nSELECT id,\n       EXTRACT(EPOCH FROM AGE(delivered_at, estimated_delivery_at)) / 60 AS delay_minutes\nFROM orders\nWHERE order_status = 'delivered'\n  AND delivered_at IS NOT NULL\n  AND estimated_delivery_at IS NOT NULL\n  AND delivered_at > estimated_delivery_at\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `AGE()` returns an interval between the two timestamps.\n- `EXTRACT(EPOCH ...)` converts that interval to seconds.\n- Dividing by `60` converts it to minutes.\n- This also matches the expected result."
      }
    ]
  },
  {
    "code": "FOOD_047",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.id, d.full_name, COUNT(da.id) AS completed_deliveries FROM drivers d LEFT JOIN driver_assignments da ON da.driver_id = d.id AND da.status = 'delivered' GROUP BY d.id, d.full_name ORDER BY completed_deliveries DESC, d.id ASC;",
        "explanation": "## Approach\n\nJoin drivers to delivered assignments and count them.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name, COUNT(da.id) AS completed_deliveries\nFROM drivers d\nLEFT JOIN driver_assignments da\n  ON da.driver_id = d.id\n AND da.status = 'delivered'\nGROUP BY d.id, d.full_name\nORDER BY completed_deliveries DESC, d.id ASC;\n```\n\n## Explanation\n\n- The join condition keeps only delivered assignments.\n- `LEFT JOIN` includes drivers with zero completed deliveries.\n- `COUNT(da.id)` counts completed deliveries per driver.\n\n## Why this is optimal\n\nIt counts the required status while keeping all drivers."
      },
      {
        "approach_title": "Counts CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivery_counts AS (SELECT driver_id, COUNT(*) AS completed_deliveries FROM driver_assignments WHERE status = 'delivered' GROUP BY driver_id) SELECT d.id, d.full_name, COALESCE(dc.completed_deliveries, 0) AS completed_deliveries FROM drivers d LEFT JOIN delivery_counts dc ON dc.driver_id = d.id ORDER BY completed_deliveries DESC, d.id ASC;",
        "explanation": "## Approach\n\nCount delivered assignments first, then join to drivers.\n\n## Query\n\n```sql\nWITH delivery_counts AS (\n  SELECT driver_id, COUNT(*) AS completed_deliveries\n  FROM driver_assignments\n  WHERE status = 'delivered'\n  GROUP BY driver_id\n)\nSELECT d.id, d.full_name, COALESCE(dc.completed_deliveries, 0) AS completed_deliveries\nFROM drivers d\nLEFT JOIN delivery_counts dc ON dc.driver_id = d.id\nORDER BY completed_deliveries DESC, d.id ASC;\n```\n\n## Explanation\n\n- The CTE creates one count row per driver.\n- `LEFT JOIN` keeps all drivers.\n- Missing counts become `0`."
      }
    ]
  },
  {
    "code": "FOOD_048",
    "approaches": [
      {
        "approach_title": "Direct filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, restaurant_id, name, inventory_count, reorder_level FROM menu_items WHERE inventory_count IS NOT NULL AND reorder_level IS NOT NULL AND inventory_count <= reorder_level ORDER BY restaurant_id ASC, id ASC;",
        "explanation": "## Approach\n\nFilter menu items whose current stock is at or below the reorder level.\n\n## Query\n\n```sql\nSELECT id, restaurant_id, name, inventory_count, reorder_level\nFROM menu_items\nWHERE inventory_count IS NOT NULL\n  AND reorder_level IS NOT NULL\n  AND inventory_count <= reorder_level\nORDER BY restaurant_id ASC, id ASC;\n```\n\n## Explanation\n\n- NULL values are excluded first.\n- `inventory_count <= reorder_level` finds low-stock items.\n- Results are grouped by restaurant through sorting.\n\n## Why this is optimal\n\nIt is a direct condition check on the item table."
      },
      {
        "approach_title": "CTE filter",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH low_stock_items AS (SELECT id, restaurant_id, name, inventory_count, reorder_level FROM menu_items WHERE inventory_count IS NOT NULL AND reorder_level IS NOT NULL AND inventory_count <= reorder_level) SELECT id, restaurant_id, name, inventory_count, reorder_level FROM low_stock_items ORDER BY restaurant_id ASC, id ASC;",
        "explanation": "## Approach\n\nIsolate low-stock items in a CTE and return them.\n\n## Query\n\n```sql\nWITH low_stock_items AS (\n  SELECT id, restaurant_id, name, inventory_count, reorder_level\n  FROM menu_items\n  WHERE inventory_count IS NOT NULL\n    AND reorder_level IS NOT NULL\n    AND inventory_count <= reorder_level\n)\nSELECT id, restaurant_id, name, inventory_count, reorder_level\nFROM low_stock_items\nORDER BY restaurant_id ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE contains only items that meet the low-stock condition.\n- The outer query just returns and sorts them."
      }
    ]
  },
  {
    "code": "FOOD_049",
    "approaches": [
      {
        "approach_title": "DISTINCT JOIN",
        "approach_type": "multi_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id JOIN payments p ON p.order_id = o.id WHERE p.payment_status = 'failed' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nJoin users to orders and payments, then keep only failed payments.\n\n## Query\n\n```sql\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN orders o ON o.user_id = u.id\nJOIN payments p ON p.order_id = o.id\nWHERE p.payment_status = 'failed'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `payments` links to orders.\n- `orders` links to users.\n- `DISTINCT` ensures each user appears once even if they had multiple failed payments.\n\n## Why this is optimal\n\nIt follows the relationship path directly."
      },
      {
        "approach_title": "EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name FROM users u WHERE EXISTS (SELECT 1 FROM orders o JOIN payments p ON p.order_id = o.id WHERE o.user_id = u.id AND p.payment_status = 'failed') ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nKeep users for whom at least one failed payment exists.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM orders o\n  JOIN payments p ON p.order_id = o.id\n  WHERE o.user_id = u.id\n    AND p.payment_status = 'failed'\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether a user has any failed-payment order.\n- `EXISTS` returns the user once if that condition is met."
      }
    ]
  },
  {
    "code": "FOOD_050",
    "approaches": [
      {
        "approach_title": "JOIN AVG",
        "approach_type": "join_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city ORDER BY average_delivery_fee DESC, r.city ASC;",
        "explanation": "## Approach\n\nJoin restaurants to delivered orders and average delivery fee by city.\n\n## Query\n\n```sql\nSELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee\nFROM restaurants r\nJOIN orders o ON o.restaurant_id = r.id\nWHERE o.order_status = 'delivered'\nGROUP BY r.city\nORDER BY average_delivery_fee DESC, r.city ASC;\n```\n\n## Explanation\n\n- `restaurants` provides the city dimension.\n- Delivered orders are filtered first.\n- `AVG(o.delivery_fee)` computes average fee per city.\n\n## Why this is optimal\n\nIt directly aggregates the requested metric by city."
      },
      {
        "approach_title": "City CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_fees AS (SELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city) SELECT city, average_delivery_fee FROM city_fees ORDER BY average_delivery_fee DESC, city ASC;",
        "explanation": "## Approach\n\nCompute average city delivery fee in a CTE and return it.\n\n## Query\n\n```sql\nWITH city_fees AS (\n  SELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city\n)\nSELECT city, average_delivery_fee\nFROM city_fees\nORDER BY average_delivery_fee DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per city.\n- The outer query simply sorts and returns it."
      }
    ]
  },
  {
    "code": "FOOD_051",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), ranked_restaurants AS ( SELECT city, id, name, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_revenue DESC, id ASC) AS rn FROM restaurant_revenue ), final_rows AS ( SELECT city, id, name, total_revenue FROM ranked_restaurants WHERE rn <= 3 ) SELECT city, id, name, total_revenue FROM final_rows ORDER BY 1 ASC, 4 DESC, 2 ASC;",
        "explanation": "## Approach\n\nCompute delivered revenue per restaurant, rank restaurants within each city, keep the top 3, then sort the final output using ordinal positions.\n\n## Query\n\n```sql\nWITH restaurant_revenue AS (\n  SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city, r.id, r.name\n), ranked_restaurants AS (\n  SELECT city, id, name, total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY city\n           ORDER BY total_revenue DESC, id ASC\n         ) AS rn\n  FROM restaurant_revenue\n), final_rows AS (\n  SELECT city, id, name, total_revenue\n  FROM ranked_restaurants\n  WHERE rn <= 3\n)\nSELECT city, id, name, total_revenue\nFROM final_rows\nORDER BY 1 ASC, 4 DESC, 2 ASC;\n```\n\n## Explanation\n\n- `restaurant_revenue` calculates delivered revenue per restaurant.\n- `ROW_NUMBER()` ranks restaurants inside each city.\n- `rn <= 3` keeps exactly 3 rows per city.\n- `ORDER BY 1, 4, 2` sorts by `city ASC, total_revenue DESC, id ASC` using final output positions."
      },
      {
        "approach_title": "DENSE_RANK",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), ranked_restaurants AS ( SELECT city, id, name, total_revenue, DENSE_RANK() OVER (PARTITION BY city ORDER BY total_revenue DESC, id ASC) AS rank_num FROM restaurant_revenue ), final_rows AS ( SELECT city, id, name, total_revenue FROM ranked_restaurants WHERE rank_num <= 3 ) SELECT city, id, name, total_revenue FROM final_rows ORDER BY 1 ASC, 4 DESC, 2 ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` to rank restaurants by delivered revenue within each city, keep the first 3 ranks, then sort the final output with ordinal ordering.\n\n## Query\n\n```sql\nWITH restaurant_revenue AS (\n  SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city, r.id, r.name\n), ranked_restaurants AS (\n  SELECT city, id, name, total_revenue,\n         DENSE_RANK() OVER (\n           PARTITION BY city\n           ORDER BY total_revenue DESC, id ASC\n         ) AS rank_num\n  FROM restaurant_revenue\n), final_rows AS (\n  SELECT city, id, name, total_revenue\n  FROM ranked_restaurants\n  WHERE rank_num <= 3\n)\nSELECT city, id, name, total_revenue\nFROM final_rows\nORDER BY 1 ASC, 4 DESC, 2 ASC;\n```\n\n## Explanation\n\n- Revenue is aggregated per restaurant first.\n- `DENSE_RANK()` assigns city-level ranks.\n- The final sort uses output column positions to enforce `city ASC, total_revenue DESC, id ASC` exactly."
      }
    ]
  },
  {
    "code": "FOOD_052",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH ranked_orders AS ( SELECT o.user_id, o.order_status, o.created_at, o.id, ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.created_at DESC, o.id DESC) AS rn FROM orders o ) SELECT u.id, u.full_name FROM users u JOIN ranked_orders ro ON ro.user_id = u.id WHERE ro.rn = 1 AND ro.order_status = 'cancelled' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nRank each user's orders from newest to oldest, then check whether the latest one was cancelled.\n\n## Query\n\n```sql\nWITH ranked_orders AS (\n  SELECT o.user_id, o.order_status, o.created_at, o.id,\n         ROW_NUMBER() OVER (\n           PARTITION BY o.user_id\n           ORDER BY o.created_at DESC, o.id DESC\n         ) AS rn\n  FROM orders o\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN ranked_orders ro ON ro.user_id = u.id\nWHERE ro.rn = 1\n  AND ro.order_status = 'cancelled'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` marks the latest order per user as `1`.\n- The outer query keeps only users whose latest order is cancelled.\n\n## Why this is optimal\n\nIt directly models “most recent order.”"
      },
      {
        "approach_title": "Latest time",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH latest_orders AS ( SELECT user_id, MAX(created_at) AS latest_created_at FROM orders GROUP BY user_id ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id JOIN latest_orders lo ON lo.user_id = o.user_id AND lo.latest_created_at = o.created_at WHERE o.order_status = 'cancelled' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nFind the latest order timestamp per user, then match orders at that timestamp and keep cancelled ones.\n\n## Query\n\n```sql\nWITH latest_orders AS (\n  SELECT user_id, MAX(created_at) AS latest_created_at\n  FROM orders\n  GROUP BY user_id\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN orders o ON o.user_id = u.id\nJOIN latest_orders lo\n  ON lo.user_id = o.user_id\n AND lo.latest_created_at = o.created_at\nWHERE o.order_status = 'cancelled'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The CTE finds the most recent order timestamp per user.\n- Matching rows are checked for cancelled status.\n- `DISTINCT` handles ties on the same timestamp."
      }
    ]
  },
  {
    "code": "FOOD_053",
    "approaches": [
      {
        "approach_title": "City avg",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), city_avg AS ( SELECT city, AVG(total_revenue) AS avg_revenue FROM restaurant_revenue GROUP BY city ), final_rows AS ( SELECT rr.id, rr.name, rr.city, rr.total_revenue FROM restaurant_revenue rr JOIN city_avg ca ON ca.city = rr.city WHERE rr.total_revenue > ca.avg_revenue ) SELECT id, name, city, total_revenue FROM final_rows ORDER BY 3 ASC, 4 DESC, 1 ASC;",
        "explanation": "## Approach\n\nCompute delivered revenue per restaurant, compute the average restaurant revenue for each city, keep restaurants above that city average, then sort using the final output column positions.\n\n## Query\n\n```sql\nWITH restaurant_revenue AS (\n  SELECT r.city, r.id, r.name,\n         COALESCE(SUM(o.total_amount), 0) AS total_revenue\n  FROM restaurants r\n  LEFT JOIN orders o\n    ON o.restaurant_id = r.id\n   AND o.order_status = 'delivered'\n  GROUP BY r.city, r.id, r.name\n), city_avg AS (\n  SELECT city, AVG(total_revenue) AS avg_revenue\n  FROM restaurant_revenue\n  GROUP BY city\n), final_rows AS (\n  SELECT rr.id, rr.name, rr.city, rr.total_revenue\n  FROM restaurant_revenue rr\n  JOIN city_avg ca ON ca.city = rr.city\n  WHERE rr.total_revenue > ca.avg_revenue\n)\nSELECT id, name, city, total_revenue\nFROM final_rows\nORDER BY 3 ASC, 4 DESC, 1 ASC;\n```\n\n## Explanation\n\n- `restaurant_revenue` creates one row per restaurant with delivered revenue.\n- `city_avg` computes the average of those restaurant revenues within each city.\n- `final_rows` keeps only restaurants above their city average.\n- `ORDER BY 3, 4, 1` enforces `city ASC, total_revenue DESC, id ASC` exactly on the final output columns.\n\n## Why this is optimal\n\nIt cleanly separates the two aggregation levels and matches the required final ordering."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), final_rows AS ( SELECT id, name, city, total_revenue FROM ( SELECT id, name, city, total_revenue, AVG(total_revenue) OVER (PARTITION BY city) AS city_avg FROM restaurant_revenue ) t WHERE total_revenue > city_avg ) SELECT id, name, city, total_revenue FROM final_rows ORDER BY 3 ASC, 4 DESC, 1 ASC;",
        "explanation": "## Approach\n\nCompute restaurant revenue first, attach the city average with a window function, filter rows above that average, then sort using the final output column positions.\n\n## Query\n\n```sql\nWITH restaurant_revenue AS (\n  SELECT r.city, r.id, r.name,\n         COALESCE(SUM(o.total_amount), 0) AS total_revenue\n  FROM restaurants r\n  LEFT JOIN orders o\n    ON o.restaurant_id = r.id\n   AND o.order_status = 'delivered'\n  GROUP BY r.city, r.id, r.name\n), final_rows AS (\n  SELECT id, name, city, total_revenue\n  FROM (\n    SELECT id, name, city, total_revenue,\n           AVG(total_revenue) OVER (PARTITION BY city) AS city_avg\n    FROM restaurant_revenue\n  ) t\n  WHERE total_revenue > city_avg\n)\nSELECT id, name, city, total_revenue\nFROM final_rows\nORDER BY 3 ASC, 4 DESC, 1 ASC;\n```\n\n## Explanation\n\n- `AVG(total_revenue) OVER (PARTITION BY city)` adds the city average to each restaurant row.\n- The inner filter keeps only restaurants above that average.\n- `ORDER BY 3, 4, 1` applies the exact required output order.\n\n## Difference from the optimal approach\n\nIt is concise, but the CTE + grouped average version is easier to read."
      }
    ]
  },
  {
    "code": "FOOD_054",
    "approaches": [
      {
        "approach_title": "LAG",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_order_days AS ( SELECT DISTINCT user_id, DATE(created_at) AS order_day FROM orders ), ranked_days AS ( SELECT user_id, order_day, LAG(order_day) OVER (PARTITION BY user_id ORDER BY order_day) AS previous_day FROM user_order_days ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ranked_days rd ON rd.user_id = u.id WHERE rd.previous_day = rd.order_day - INTERVAL '1 day' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nReduce orders to distinct user-day pairs, then compare each day with the previous one.\n\n## Query\n\n```sql\nWITH user_order_days AS (\n  SELECT DISTINCT user_id, DATE(created_at) AS order_day\n  FROM orders\n), ranked_days AS (\n  SELECT user_id, order_day,\n         LAG(order_day) OVER (\n           PARTITION BY user_id\n           ORDER BY order_day\n         ) AS previous_day\n  FROM user_order_days\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN ranked_days rd ON rd.user_id = u.id\nWHERE rd.previous_day = rd.order_day - INTERVAL '1 day'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Duplicate same-day orders are removed first.\n- `LAG()` checks the previous order day for the same user.\n- A one-day gap means consecutive days.\n\n## Why this is optimal\n\nIt models the consecutive-day condition directly."
      },
      {
        "approach_title": "Self join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_order_days AS ( SELECT DISTINCT user_id, DATE(created_at) AS order_day FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN user_order_days d1 ON d1.user_id = u.id JOIN user_order_days d2 ON d2.user_id = d1.user_id AND d2.order_day = d1.order_day + INTERVAL '1 day' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nCreate distinct user-day pairs and self-join them on the next calendar day.\n\n## Query\n\n```sql\nWITH user_order_days AS (\n  SELECT DISTINCT user_id, DATE(created_at) AS order_day\n  FROM orders\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN user_order_days d1 ON d1.user_id = u.id\nJOIN user_order_days d2\n  ON d2.user_id = d1.user_id\n AND d2.order_day = d1.order_day + INTERVAL '1 day'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Each pair of consecutive days produces a match.\n- `DISTINCT` returns each user once."
      }
    ]
  },
  {
    "code": "FOOD_055",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH item_totals AS ( SELECT mi.restaurant_id, mi.id AS menu_item_id, mi.name, SUM(oi.quantity) AS total_quantity FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id, mi.id, mi.name ), ranked_items AS ( SELECT restaurant_id, menu_item_id, name, total_quantity, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY total_quantity DESC, menu_item_id ASC) AS rn FROM item_totals ) SELECT restaurant_id, menu_item_id, name, total_quantity FROM ranked_items WHERE rn = 1 ORDER BY restaurant_id ASC;",
        "explanation": "## Approach\n\nSum ordered quantity per menu item, rank items within each restaurant, and keep the top one.\n\n## Query\n\n```sql\nWITH item_totals AS (\n  SELECT mi.restaurant_id,\n         mi.id AS menu_item_id,\n         mi.name,\n         SUM(oi.quantity) AS total_quantity\n  FROM menu_items mi\n  JOIN order_items oi ON oi.menu_item_id = mi.id\n  GROUP BY mi.restaurant_id, mi.id, mi.name\n), ranked_items AS (\n  SELECT restaurant_id,\n         menu_item_id,\n         name,\n         total_quantity,\n         ROW_NUMBER() OVER (\n           PARTITION BY restaurant_id\n           ORDER BY total_quantity DESC, menu_item_id ASC\n         ) AS rn\n  FROM item_totals\n)\nSELECT restaurant_id, menu_item_id, name, total_quantity\nFROM ranked_items\nWHERE rn = 1\nORDER BY restaurant_id ASC;\n```\n\n## Explanation\n\n- `item_totals` calculates total ordered quantity for each menu item.\n- `ROW_NUMBER()` ranks items within each restaurant.\n- `menu_item_id ASC` breaks ties consistently.\n- `rn = 1` guarantees exactly one row per restaurant.\n\n## Why this is optimal\n\nIt produces one deterministic winner per restaurant and matches the expected row count."
      },
      {
        "approach_title": "Max + min id",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH item_totals AS ( SELECT mi.restaurant_id, mi.id AS menu_item_id, mi.name, SUM(oi.quantity) AS total_quantity FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id, mi.id, mi.name ), restaurant_max AS ( SELECT restaurant_id, MAX(total_quantity) AS max_quantity FROM item_totals GROUP BY restaurant_id ), tied_items AS ( SELECT it.restaurant_id, it.menu_item_id, it.name, it.total_quantity FROM item_totals it JOIN restaurant_max rm ON rm.restaurant_id = it.restaurant_id AND rm.max_quantity = it.total_quantity ), chosen_items AS ( SELECT restaurant_id, MIN(menu_item_id) AS menu_item_id FROM tied_items GROUP BY restaurant_id ) SELECT ti.restaurant_id, ti.menu_item_id, ti.name, ti.total_quantity FROM tied_items ti JOIN chosen_items ci ON ci.restaurant_id = ti.restaurant_id AND ci.menu_item_id = ti.menu_item_id ORDER BY ti.restaurant_id ASC;",
        "explanation": "## Approach\n\nFind the maximum quantity per restaurant, keep tied top items, then break ties by choosing the smallest menu item id.\n\n## Query\n\n```sql\nWITH item_totals AS (\n  SELECT mi.restaurant_id,\n         mi.id AS menu_item_id,\n         mi.name,\n         SUM(oi.quantity) AS total_quantity\n  FROM menu_items mi\n  JOIN order_items oi ON oi.menu_item_id = mi.id\n  GROUP BY mi.restaurant_id, mi.id, mi.name\n), restaurant_max AS (\n  SELECT restaurant_id,\n         MAX(total_quantity) AS max_quantity\n  FROM item_totals\n  GROUP BY restaurant_id\n), tied_items AS (\n  SELECT it.restaurant_id,\n         it.menu_item_id,\n         it.name,\n         it.total_quantity\n  FROM item_totals it\n  JOIN restaurant_max rm\n    ON rm.restaurant_id = it.restaurant_id\n   AND rm.max_quantity = it.total_quantity\n), chosen_items AS (\n  SELECT restaurant_id,\n         MIN(menu_item_id) AS menu_item_id\n  FROM tied_items\n  GROUP BY restaurant_id\n)\nSELECT ti.restaurant_id, ti.menu_item_id, ti.name, ti.total_quantity\nFROM tied_items ti\nJOIN chosen_items ci\n  ON ci.restaurant_id = ti.restaurant_id\n AND ci.menu_item_id = ti.menu_item_id\nORDER BY ti.restaurant_id ASC;\n```\n\n## Explanation\n\n- Your failing max-join version returned all tied top items, so some restaurants produced multiple rows.\n- `restaurant_max` finds the highest quantity per restaurant.\n- `tied_items` keeps only items at that highest quantity.\n- `chosen_items` resolves ties by taking the smallest `menu_item_id`.\n- This makes the result deterministic and reduces it to one row per restaurant."
      }
    ]
  },
  {
    "code": "FOOD_056",
    "approaches": [
      {
        "approach_title": "Count match",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_city AS ( SELECT u.id AS user_id, u.full_name, MIN(r.city) AS user_city_name FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT r.city) = 1 ), city_cuisines AS ( SELECT r.city AS city_name, COUNT(DISTINCT r.cuisine) AS total_cuisines FROM restaurants r GROUP BY r.city ), user_cuisines AS ( SELECT uc.user_id, uc.full_name, uc.user_city_name, COUNT(DISTINCT r.cuisine) AS ordered_cuisines FROM user_city uc JOIN orders o ON o.user_id = uc.user_id JOIN restaurants r ON r.id = o.restaurant_id WHERE r.city = uc.user_city_name GROUP BY uc.user_id, uc.full_name, uc.user_city_name ) SELECT uc.user_id AS id, uc.full_name, uc.user_city_name AS city FROM user_cuisines uc JOIN city_cuisines cc ON cc.city_name = uc.user_city_name WHERE uc.ordered_cuisines = cc.total_cuisines ORDER BY id ASC;",
        "explanation": "## Approach\n\nDerive a single city per user, count the cuisines they ordered there, and compare that to the total cuisines in that city.\n\n## Query\n\n```sql\nWITH user_city AS (\n  SELECT u.id AS user_id, u.full_name,\n         MIN(r.city) AS user_city_name\n  FROM users u\n  JOIN orders o ON o.user_id = u.id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  GROUP BY u.id, u.full_name\n  HAVING COUNT(DISTINCT r.city) = 1\n), city_cuisines AS (\n  SELECT r.city AS city_name,\n         COUNT(DISTINCT r.cuisine) AS total_cuisines\n  FROM restaurants r\n  GROUP BY r.city\n), user_cuisines AS (\n  SELECT uc.user_id, uc.full_name, uc.user_city_name,\n         COUNT(DISTINCT r.cuisine) AS ordered_cuisines\n  FROM user_city uc\n  JOIN orders o ON o.user_id = uc.user_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE r.city = uc.user_city_name\n  GROUP BY uc.user_id, uc.full_name, uc.user_city_name\n)\nSELECT uc.user_id AS id, uc.full_name, uc.user_city_name AS city\nFROM user_cuisines uc\nJOIN city_cuisines cc ON cc.city_name = uc.user_city_name\nWHERE uc.ordered_cuisines = cc.total_cuisines\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The schema has no direct user city for this problem, so the city is derived from restaurants ordered from.\n- Users with orders in more than one city are excluded.\n- Matching counts means the user covered every cuisine in that city.\n\n## Why this is optimal\n\nIt is a compact way to express full coverage."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_city AS ( SELECT u.id AS user_id, u.full_name, MIN(r.city) AS user_city_name FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT r.city) = 1 ), user_city_cuisines AS ( SELECT DISTINCT uc.user_id, uc.user_city_name, r.cuisine FROM user_city uc JOIN orders o ON o.user_id = uc.user_id JOIN restaurants r ON r.id = o.restaurant_id WHERE r.city = uc.user_city_name ) SELECT uc.user_id AS id, uc.full_name, uc.user_city_name AS city FROM user_city uc WHERE NOT EXISTS ( SELECT 1 FROM restaurants r WHERE r.city = uc.user_city_name AND NOT EXISTS ( SELECT 1 FROM user_city_cuisines ucc WHERE ucc.user_id = uc.user_id AND ucc.user_city_name = uc.user_city_name AND ucc.cuisine = r.cuisine ) ) ORDER BY id ASC;",
        "explanation": "## Approach\n\nCheck that there is no cuisine in the city that the user failed to order.\n\n## Query\n\n```sql\nWITH user_city AS (\n  SELECT u.id AS user_id, u.full_name,\n         MIN(r.city) AS user_city_name\n  FROM users u\n  JOIN orders o ON o.user_id = u.id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  GROUP BY u.id, u.full_name\n  HAVING COUNT(DISTINCT r.city) = 1\n), user_city_cuisines AS (\n  SELECT DISTINCT uc.user_id, uc.user_city_name, r.cuisine\n  FROM user_city uc\n  JOIN orders o ON o.user_id = uc.user_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE r.city = uc.user_city_name\n)\nSELECT uc.user_id AS id, uc.full_name, uc.user_city_name AS city\nFROM user_city uc\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM restaurants r\n  WHERE r.city = uc.user_city_name\n    AND NOT EXISTS (\n      SELECT 1\n      FROM user_city_cuisines ucc\n      WHERE ucc.user_id = uc.user_id\n        AND ucc.user_city_name = uc.user_city_name\n        AND ucc.cuisine = r.cuisine\n    )\n)\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The double `NOT EXISTS` expresses complete coverage.\n- It means there is no city cuisine missing from the user’s ordered cuisines."
      }
    ]
  },
  {
    "code": "FOOD_057",
    "approaches": [
      {
        "approach_title": "Running sum",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT restaurant_id, id, created_at, SUM(total_amount) OVER (PARTITION BY restaurant_id ORDER BY created_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_revenue FROM orders WHERE order_status = 'delivered' ORDER BY restaurant_id ASC, created_at ASC, id ASC;",
        "explanation": "## Approach\n\nUse a running window sum per restaurant ordered by time.\n\n## Query\n\n```sql\nSELECT restaurant_id, id, created_at,\n       SUM(total_amount) OVER (\n         PARTITION BY restaurant_id\n         ORDER BY created_at, id\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS running_revenue\nFROM orders\nWHERE order_status = 'delivered'\nORDER BY restaurant_id ASC, created_at ASC, id ASC;\n```\n\n## Explanation\n\n- Delivered orders are partitioned by restaurant.\n- The ordered window accumulates revenue row by row.\n- The result is a cumulative total for each restaurant.\n\n## Why this is optimal\n\nIt is the standard running-total pattern."
      },
      {
        "approach_title": "Correlated sum",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT o1.restaurant_id, o1.id, o1.created_at, ( SELECT SUM(o2.total_amount) FROM orders o2 WHERE o2.order_status = 'delivered' AND o2.restaurant_id = o1.restaurant_id AND (o2.created_at < o1.created_at OR (o2.created_at = o1.created_at AND o2.id <= o1.id)) ) AS running_revenue FROM orders o1 WHERE o1.order_status = 'delivered' ORDER BY o1.restaurant_id ASC, o1.created_at ASC, o1.id ASC;",
        "explanation": "## Approach\n\nFor each delivered order, sum all earlier delivered orders from the same restaurant.\n\n## Query\n\n```sql\nSELECT o1.restaurant_id, o1.id, o1.created_at,\n       (\n         SELECT SUM(o2.total_amount)\n         FROM orders o2\n         WHERE o2.order_status = 'delivered'\n           AND o2.restaurant_id = o1.restaurant_id\n           AND (\n                o2.created_at < o1.created_at\n                OR (o2.created_at = o1.created_at AND o2.id <= o1.id)\n               )\n       ) AS running_revenue\nFROM orders o1\nWHERE o1.order_status = 'delivered'\nORDER BY o1.restaurant_id ASC, o1.created_at ASC, o1.id ASC;\n```\n\n## Explanation\n\n- The subquery sums all qualifying earlier rows for each outer row.\n- It gives the same running total, but is much less efficient."
      }
    ]
  },
  {
    "code": "FOOD_058",
    "approaches": [
      {
        "approach_title": "Global avg",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH overall_avg AS ( SELECT AVG(delivery_fee) AS avg_delivery_fee FROM orders WHERE order_status = 'delivered' ), restaurant_avg AS ( SELECT restaurant_id, AVG(delivery_fee) AS avg_delivery_fee FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id ) SELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee FROM restaurant_avg ra JOIN restaurants r ON r.id = ra.restaurant_id CROSS JOIN overall_avg oa WHERE ra.avg_delivery_fee > oa.avg_delivery_fee ORDER BY average_delivery_fee DESC, r.id ASC;",
        "explanation": "## Approach\n\nCompute the platform-wide average delivery fee from delivered orders, compute each restaurant's delivered-order average delivery fee, then keep restaurants above the platform average.\n\n## Query\n\n```sql\nWITH overall_avg AS (\n  SELECT AVG(delivery_fee) AS avg_delivery_fee\n  FROM orders\n  WHERE order_status = 'delivered'\n), restaurant_avg AS (\n  SELECT restaurant_id, AVG(delivery_fee) AS avg_delivery_fee\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY restaurant_id\n)\nSELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee\nFROM restaurant_avg ra\nJOIN restaurants r ON r.id = ra.restaurant_id\nCROSS JOIN overall_avg oa\nWHERE ra.avg_delivery_fee > oa.avg_delivery_fee\nORDER BY average_delivery_fee DESC, r.id ASC;\n```\n\n## Explanation\n\n- `overall_avg` calculates the platform average using **all delivered orders**.\n- `restaurant_avg` calculates one average per restaurant.\n- The final query keeps restaurants whose average is higher than the platform-wide delivered-order average.\n\n## Why this is optimal\n\nIt matches the business rule exactly: compare restaurant average delivery fee against the overall delivered-order average."
      },
      {
        "approach_title": "Order window",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivered_orders AS ( SELECT restaurant_id, delivery_fee, AVG(delivery_fee) OVER () AS platform_avg_fee FROM orders WHERE order_status = 'delivered' ), restaurant_avg AS ( SELECT restaurant_id, AVG(delivery_fee) AS avg_delivery_fee, MAX(platform_avg_fee) AS platform_avg_fee FROM delivered_orders GROUP BY restaurant_id ) SELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee FROM restaurant_avg ra JOIN restaurants r ON r.id = ra.restaurant_id WHERE ra.avg_delivery_fee > ra.platform_avg_fee ORDER BY average_delivery_fee DESC, r.id ASC;",
        "explanation": "## Approach\n\nAttach the true platform-wide average to every delivered order row first, then aggregate to restaurant level and compare against that preserved platform average.\n\n## Query\n\n```sql\nWITH delivered_orders AS (\n  SELECT restaurant_id,\n         delivery_fee,\n         AVG(delivery_fee) OVER () AS platform_avg_fee\n  FROM orders\n  WHERE order_status = 'delivered'\n), restaurant_avg AS (\n  SELECT restaurant_id,\n         AVG(delivery_fee) AS avg_delivery_fee,\n         MAX(platform_avg_fee) AS platform_avg_fee\n  FROM delivered_orders\n  GROUP BY restaurant_id\n)\nSELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee\nFROM restaurant_avg ra\nJOIN restaurants r ON r.id = ra.restaurant_id\nWHERE ra.avg_delivery_fee > ra.platform_avg_fee\nORDER BY average_delivery_fee DESC, r.id ASC;\n```\n\n## Explanation\n\n- Your failing window version averaged the **restaurant averages**, which is a different metric from the overall delivered-order average.\n- This fixed version applies `AVG(delivery_fee) OVER ()` on the delivered-order rows themselves, so the platform average is based on all delivered orders.\n- After that, it aggregates per restaurant and compares each restaurant average to the correct platform average.\n\n## Difference from the optimal approach\n\nIt works correctly, but the CTE version is simpler to read."
      }
    ]
  },
  {
    "code": "FOOD_059",
    "approaches": [
      {
        "approach_title": "FILTER HAVING",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE o.order_status = 'cancelled') AS cancelled_orders, COUNT(*) FILTER (WHERE o.order_status = 'delivered') AS delivered_orders FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE o.order_status = 'cancelled') > COUNT(*) FILTER (WHERE o.order_status = 'delivered') ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nCount cancelled and delivered orders separately in each user group, then compare them.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       COUNT(*) FILTER (WHERE o.order_status = 'cancelled') AS cancelled_orders,\n       COUNT(*) FILTER (WHERE o.order_status = 'delivered') AS delivered_orders\nFROM users u\nJOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) FILTER (WHERE o.order_status = 'cancelled')\n     > COUNT(*) FILTER (WHERE o.order_status = 'delivered')\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `FILTER` creates separate conditional counts in one grouped query.\n- `HAVING` compares those two counts.\n\n## Why this is optimal\n\nIt is the cleanest conditional aggregation pattern."
      },
      {
        "approach_title": "CASE HAVING",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name, SUM(CASE WHEN o.order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders, SUM(CASE WHEN o.order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN o.order_status = 'cancelled' THEN 1 ELSE 0 END) > SUM(CASE WHEN o.order_status = 'delivered' THEN 1 ELSE 0 END) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUse conditional sums instead of filtered counts.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name,\n       SUM(CASE WHEN o.order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,\n       SUM(CASE WHEN o.order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders\nFROM users u\nJOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING SUM(CASE WHEN o.order_status = 'cancelled' THEN 1 ELSE 0 END)\n     > SUM(CASE WHEN o.order_status = 'delivered' THEN 1 ELSE 0 END)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Matching statuses become `1`, others become `0`.\n- Summing them gives the two counts needed for comparison."
      }
    ]
  },
  {
    "code": "FOOD_060",
    "approaches": [
      {
        "approach_title": "Distinct count",
        "approach_type": "multi_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.id, d.full_name, DATE(da.delivered_at) AS delivery_date, COUNT(DISTINCT o.restaurant_id) AS restaurant_count FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL GROUP BY d.id, d.full_name, DATE(da.delivered_at) HAVING COUNT(DISTINCT o.restaurant_id) > 1 ORDER BY delivery_date ASC, d.id ASC;",
        "explanation": "## Approach\n\nGroup deliveries by driver and date, then count distinct restaurants handled that day.\n\n## Query\n\n```sql\nSELECT d.id, d.full_name,\n       DATE(da.delivered_at) AS delivery_date,\n       COUNT(DISTINCT o.restaurant_id) AS restaurant_count\nFROM drivers d\nJOIN driver_assignments da ON da.driver_id = d.id\nJOIN orders o ON o.id = da.order_id\nWHERE da.status = 'delivered'\n  AND da.delivered_at IS NOT NULL\nGROUP BY d.id, d.full_name, DATE(da.delivered_at)\nHAVING COUNT(DISTINCT o.restaurant_id) > 1\nORDER BY delivery_date ASC, d.id ASC;\n```\n\n## Explanation\n\n- Delivered assignments are grouped by driver and calendar day.\n- `COUNT(DISTINCT o.restaurant_id)` counts how many restaurants they served that day.\n- `HAVING > 1` keeps multi-restaurant days only.\n\n## Why this is optimal\n\nIt directly measures the requested day-level activity."
      },
      {
        "approach_title": "Restaurant-day CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_restaurant_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_date, o.restaurant_id FROM driver_assignments da JOIN orders o ON o.id = da.order_id WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ) SELECT d.id, d.full_name, drd.delivery_date, COUNT(*) AS restaurant_count FROM drivers d JOIN driver_restaurant_days drd ON drd.driver_id = d.id GROUP BY d.id, d.full_name, drd.delivery_date HAVING COUNT(*) > 1 ORDER BY drd.delivery_date ASC, d.id ASC;",
        "explanation": "## Approach\n\nFirst create distinct driver-day-restaurant combinations, then count them per driver-day.\n\n## Query\n\n```sql\nWITH driver_restaurant_days AS (\n  SELECT DISTINCT da.driver_id,\n         DATE(da.delivered_at) AS delivery_date,\n         o.restaurant_id\n  FROM driver_assignments da\n  JOIN orders o ON o.id = da.order_id\n  WHERE da.status = 'delivered'\n    AND da.delivered_at IS NOT NULL\n)\nSELECT d.id, d.full_name, drd.delivery_date,\n       COUNT(*) AS restaurant_count\nFROM drivers d\nJOIN driver_restaurant_days drd ON drd.driver_id = d.id\nGROUP BY d.id, d.full_name, drd.delivery_date\nHAVING COUNT(*) > 1\nORDER BY drd.delivery_date ASC, d.id ASC;\n```\n\n## Explanation\n\n- The CTE removes duplicate restaurant visits on the same day.\n- The outer query counts distinct restaurant-day rows per driver."
      }
    ]
  },
  {
    "code": "FOOD_061",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_city_spend AS ( SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY r.city, u.id, u.full_name ), ranked_users AS ( SELECT city, id, full_name, total_spent, ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_spent DESC, id ASC) AS rn FROM user_city_spend ) SELECT city, id, full_name, total_spent FROM ranked_users WHERE rn <= 2 ORDER BY city ASC, total_spent DESC, id ASC;",
        "explanation": "## Approach\n\nCalculate delivered spend per user within each city, rank users inside each city, and keep the top 2.\n\n## Query\n\n```sql\nWITH user_city_spend AS (\n  SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent\n  FROM users u\n  JOIN orders o ON o.user_id = u.id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city, u.id, u.full_name\n), ranked_users AS (\n  SELECT city, id, full_name, total_spent,\n         ROW_NUMBER() OVER (\n           PARTITION BY city\n           ORDER BY total_spent DESC, id ASC\n         ) AS rn\n  FROM user_city_spend\n)\nSELECT city, id, full_name, total_spent\nFROM ranked_users\nWHERE rn <= 2\nORDER BY city ASC, total_spent DESC, id ASC;\n```\n\n## Explanation\n\n- Revenue is aggregated per user per city.\n- `ROW_NUMBER()` ranks users by spend inside each city.\n- `rn <= 2` keeps exactly two rows per city.\n\n## Why this is optimal\n\nIt is the standard exact top-N-per-group pattern."
      },
      {
        "approach_title": "DENSE_RANK",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_city_spend AS ( SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY r.city, u.id, u.full_name ), ranked_users AS ( SELECT city, id, full_name, total_spent, DENSE_RANK() OVER (PARTITION BY city ORDER BY total_spent DESC, id ASC) AS rank_num FROM user_city_spend ) SELECT city, id, full_name, total_spent FROM ranked_users WHERE rank_num <= 2 ORDER BY city ASC, total_spent DESC, id ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` to rank users by delivered spend within each city.\n\n## Query\n\n```sql\nWITH user_city_spend AS (\n  SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent\n  FROM users u\n  JOIN orders o ON o.user_id = u.id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city, u.id, u.full_name\n), ranked_users AS (\n  SELECT city, id, full_name, total_spent,\n         DENSE_RANK() OVER (\n           PARTITION BY city\n           ORDER BY total_spent DESC, id ASC\n         ) AS rank_num\n  FROM user_city_spend\n)\nSELECT city, id, full_name, total_spent\nFROM ranked_users\nWHERE rank_num <= 2\nORDER BY city ASC, total_spent DESC, id ASC;\n```\n\n## Explanation\n\n- Spend is calculated the same way as the first approach.\n- `DENSE_RANK()` assigns the city-level ranking.\n- The first two ranks are returned."
      }
    ]
  },
  {
    "code": "FOOD_062",
    "approaches": [
      {
        "approach_title": "LEAD",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_orders AS ( SELECT user_id, created_at, LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at, id) AS next_order_at FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN user_orders uo ON uo.user_id = u.id WHERE uo.next_order_at IS NOT NULL AND uo.next_order_at >= uo.created_at + INTERVAL '30 days' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUse `LEAD()` to compare each order with the user's immediate next order.\n\n## Query\n\n```sql\nWITH user_orders AS (\n  SELECT user_id,\n         created_at,\n         LEAD(created_at) OVER (\n           PARTITION BY user_id\n           ORDER BY created_at, id\n         ) AS next_order_at\n  FROM orders\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN user_orders uo ON uo.user_id = u.id\nWHERE uo.next_order_at IS NOT NULL\n  AND uo.next_order_at >= uo.created_at + INTERVAL '30 days'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `LEAD()` gets the next order timestamp for the same user.\n- The condition checks whether that immediate next order happened at least 30 days later.\n- `DISTINCT` returns each qualifying user once.\n\n## Why this is optimal\n\nIt matches the intended logic exactly by comparing consecutive orders only."
      },
      {
        "approach_title": "Row join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ordered_orders AS ( SELECT user_id, created_at, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at, id) AS rn FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ordered_orders o1 ON o1.user_id = u.id JOIN ordered_orders o2 ON o2.user_id = o1.user_id AND o2.rn = o1.rn + 1 WHERE o2.created_at >= o1.created_at + INTERVAL '30 days' ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nAssign row numbers to each user's orders, join each order to the immediately next one, and check for a 30-day gap.\n\n## Query\n\n```sql\nWITH ordered_orders AS (\n  SELECT user_id,\n         created_at,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY created_at, id\n         ) AS rn\n  FROM orders\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN ordered_orders o1 ON o1.user_id = u.id\nJOIN ordered_orders o2\n  ON o2.user_id = o1.user_id\n AND o2.rn = o1.rn + 1\nWHERE o2.created_at >= o1.created_at + INTERVAL '30 days'\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The failing self-join matched any later order, which was too broad.\n- `ROW_NUMBER()` puts each user's orders in sequence.\n- Joining `rn` to `rn + 1` ensures we compare only consecutive orders.\n- This makes the self-join version consistent with the `LEAD()` solution."
      }
    ]
  },
  {
    "code": "FOOD_063",
    "approaches": [
      {
        "approach_title": "LAG",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), revenue_with_prev AS ( SELECT restaurant_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY restaurant_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ) SELECT r.id, r.name, revenue_month, total_revenue, prev_month_revenue FROM revenue_with_prev rwp JOIN restaurants r ON r.id = rwp.restaurant_id WHERE prev_month_revenue IS NOT NULL AND total_revenue > prev_month_revenue ORDER BY revenue_month ASC, r.id ASC;",
        "explanation": "## Approach\n\nAggregate delivered revenue by restaurant and month, then compare each month with the previous recorded month using `LAG()`.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT restaurant_id,\n         DATE_TRUNC('month', created_at) AS revenue_month,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY restaurant_id, DATE_TRUNC('month', created_at)\n), revenue_with_prev AS (\n  SELECT restaurant_id,\n         revenue_month,\n         total_revenue,\n         LAG(total_revenue) OVER (\n           PARTITION BY restaurant_id\n           ORDER BY revenue_month\n         ) AS prev_month_revenue\n  FROM monthly_revenue\n)\nSELECT r.id, r.name, revenue_month, total_revenue, prev_month_revenue\nFROM revenue_with_prev rwp\nJOIN restaurants r ON r.id = rwp.restaurant_id\nWHERE prev_month_revenue IS NOT NULL\n  AND total_revenue > prev_month_revenue\nORDER BY revenue_month ASC, r.id ASC;\n```\n\n## Explanation\n\n- `monthly_revenue` computes one revenue row per restaurant per month.\n- `LAG()` fetches the previous recorded month for that restaurant.\n- The final query keeps rows where current revenue is greater than the previous recorded revenue.\n\n## Why this is optimal\n\nIt matches the question’s intended logic exactly."
      },
      {
        "approach_title": "Row join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), ordered_months AS ( SELECT restaurant_id, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month) AS rn FROM monthly_revenue ) SELECT r.id, r.name, curr.revenue_month, curr.total_revenue, prev.total_revenue AS prev_month_revenue FROM ordered_months curr JOIN ordered_months prev ON prev.restaurant_id = curr.restaurant_id AND prev.rn = curr.rn - 1 JOIN restaurants r ON r.id = curr.restaurant_id WHERE curr.total_revenue > prev.total_revenue ORDER BY curr.revenue_month ASC, r.id ASC;",
        "explanation": "## Approach\n\nAssign row numbers to each restaurant’s recorded months, then self join each month to its previous recorded month.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT restaurant_id,\n         DATE_TRUNC('month', created_at) AS revenue_month,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY restaurant_id, DATE_TRUNC('month', created_at)\n), ordered_months AS (\n  SELECT restaurant_id,\n         revenue_month,\n         total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY restaurant_id\n           ORDER BY revenue_month\n         ) AS rn\n  FROM monthly_revenue\n)\nSELECT r.id, r.name,\n       curr.revenue_month,\n       curr.total_revenue,\n       prev.total_revenue AS prev_month_revenue\nFROM ordered_months curr\nJOIN ordered_months prev\n  ON prev.restaurant_id = curr.restaurant_id\n AND prev.rn = curr.rn - 1\nJOIN restaurants r ON r.id = curr.restaurant_id\nWHERE curr.total_revenue > prev.total_revenue\nORDER BY curr.revenue_month ASC, r.id ASC;\n```\n\n## Explanation\n\n- The failing self join used the previous calendar month, which misses gaps in monthly activity.\n- `ROW_NUMBER()` creates a sequence of recorded months per restaurant.\n- Joining `rn` to `rn - 1` compares each month with the previous recorded month, matching the `LAG()` behavior."
      }
    ]
  },
  {
    "code": "FOOD_064",
    "approaches": [
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE o.coupon_id IS NOT NULL) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nGroup each user's orders and compare total orders to coupon-used orders.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nJOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) > 0\n   AND COUNT(*) = COUNT(*) FILTER (WHERE o.coupon_id IS NOT NULL)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `COUNT(*)` gives the total orders per user.\n- The filtered count gives orders with coupons.\n- Equality means every order used a coupon.\n\n## Why this is optimal\n\nIt is a clean all-rows-match condition using conditional aggregation."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id) AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.coupon_id IS NULL) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nKeep users who have orders and have no order without a coupon.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.user_id = u.id\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.user_id = u.id\n    AND o.coupon_id IS NULL\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The first subquery ensures at least one order exists.\n- The second ensures there are no non-coupon orders."
      }
    ]
  },
  {
    "code": "FOOD_065",
    "approaches": [
      {
        "approach_title": "MAX = 5",
        "approach_type": "group_having",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name, MAX(rv.rating) AS highest_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name HAVING MAX(rv.rating) = 5 ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nGroup reviews by restaurant, find the highest rating, and keep restaurants whose maximum is 5.\n\n## Query\n\n```sql\nSELECT r.id, r.name, MAX(rv.rating) AS highest_rating\nFROM restaurants r\nJOIN reviews rv ON rv.restaurant_id = r.id\nGROUP BY r.id, r.name\nHAVING MAX(rv.rating) = 5\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- `MAX(rv.rating)` finds the best review rating per restaurant.\n- `HAVING MAX(rv.rating) = 5` keeps only restaurants that reached 5.\n\n## Why this is optimal\n\nIt directly expresses the condition on the grouped maximum."
      },
      {
        "approach_title": "Exists 5",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT r.id, r.name, 5 AS highest_rating FROM restaurants r WHERE EXISTS (SELECT 1 FROM reviews rv WHERE rv.restaurant_id = r.id AND rv.rating = 5) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nKeep restaurants that have at least one review rated 5.\n\n## Query\n\n```sql\nSELECT r.id, r.name, 5 AS highest_rating\nFROM restaurants r\nWHERE EXISTS (\n  SELECT 1\n  FROM reviews rv\n  WHERE rv.restaurant_id = r.id\n    AND rv.rating = 5\n)\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- Existence of a 5-star review implies the restaurant’s highest rating is 5."
      }
    ]
  },
  {
    "code": "FOOD_066",
    "approaches": [
      {
        "approach_title": "Avg join",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_avg AS ( SELECT user_id, AVG(total_amount) AS avg_order_value FROM orders WHERE order_status = 'delivered' GROUP BY user_id ) SELECT o.id, o.user_id, o.total_amount FROM orders o JOIN user_avg ua ON ua.user_id = o.user_id WHERE o.order_status = 'delivered' AND o.total_amount > ua.avg_order_value ORDER BY o.user_id ASC, o.id ASC;",
        "explanation": "## Approach\n\nCompute each user's average delivered order value, then return orders above that average.\n\n## Query\n\n```sql\nWITH user_avg AS (\n  SELECT user_id, AVG(total_amount) AS avg_order_value\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY user_id\n)\nSELECT o.id, o.user_id, o.total_amount\nFROM orders o\nJOIN user_avg ua ON ua.user_id = o.user_id\nWHERE o.order_status = 'delivered'\n  AND o.total_amount > ua.avg_order_value\nORDER BY o.user_id ASC, o.id ASC;\n```\n\n## Explanation\n\n- The CTE calculates one average per user.\n- The outer query compares each delivered order to that user’s average.\n\n## Why this is optimal\n\nIt cleanly separates average calculation and row-level comparison."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, user_id, total_amount FROM ( SELECT o.id, o.user_id, o.total_amount, AVG(o.total_amount) OVER (PARTITION BY o.user_id) AS avg_order_value FROM orders o WHERE o.order_status = 'delivered' ) t WHERE total_amount > avg_order_value ORDER BY user_id ASC, id ASC;",
        "explanation": "## Approach\n\nAttach each user's average delivered order value to every delivered order row using a window function.\n\n## Query\n\n```sql\nSELECT id, user_id, total_amount\nFROM (\n  SELECT o.id, o.user_id, o.total_amount,\n         AVG(o.total_amount) OVER (PARTITION BY o.user_id) AS avg_order_value\n  FROM orders o\n  WHERE o.order_status = 'delivered'\n) t\nWHERE total_amount > avg_order_value\nORDER BY user_id ASC, id ASC;\n```\n\n## Explanation\n\n- `AVG(...) OVER (PARTITION BY user_id)` adds the user average to each row.\n- The outer query filters rows above that average."
      }
    ]
  },
  {
    "code": "FOOD_067",
    "approaches": [
      {
        "approach_title": "LEFT JOIN",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT mi.id, mi.name, mi.restaurant_id FROM menu_items mi LEFT JOIN order_items oi ON oi.menu_item_id = mi.id WHERE oi.id IS NULL ORDER BY mi.id ASC;",
        "explanation": "## Approach\n\nLeft join menu items to order items and keep unmatched rows.\n\n## Query\n\n```sql\nSELECT mi.id, mi.name, mi.restaurant_id\nFROM menu_items mi\nLEFT JOIN order_items oi ON oi.menu_item_id = mi.id\nWHERE oi.id IS NULL\nORDER BY mi.id ASC;\n```\n\n## Explanation\n\n- Ordered items appear as matches in `order_items`.\n- Unordered menu items have NULL on the joined side.\n- `WHERE oi.id IS NULL` keeps only never-ordered items.\n\n## Why this is optimal\n\nIt is the standard anti-join solution."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT mi.id, mi.name, mi.restaurant_id FROM menu_items mi WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.menu_item_id = mi.id) ORDER BY mi.id ASC;",
        "explanation": "## Approach\n\nKeep menu items for which no order item exists.\n\n## Query\n\n```sql\nSELECT mi.id, mi.name, mi.restaurant_id\nFROM menu_items mi\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM order_items oi\n  WHERE oi.menu_item_id = mi.id\n)\nORDER BY mi.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the menu item has ever appeared in an order.\n- `NOT EXISTS` keeps only items with no matches."
      }
    ]
  },
  {
    "code": "FOOD_068",
    "approaches": [
      {
        "approach_title": "Ratio CTE",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_restaurant_orders AS ( SELECT restaurant_id, user_id, COUNT(*) AS order_count FROM orders GROUP BY restaurant_id, user_id ), restaurant_customer_stats AS ( SELECT restaurant_id, COUNT(*) AS total_customers, COUNT(*) FILTER (WHERE order_count >= 2) AS repeat_customers FROM user_restaurant_orders GROUP BY restaurant_id ) SELECT r.id, r.name, (repeat_customers::numeric / NULLIF(total_customers, 0)) * 100 AS repeat_customer_percentage FROM restaurant_customer_stats rcs JOIN restaurants r ON r.id = rcs.restaurant_id WHERE (repeat_customers::numeric / NULLIF(total_customers, 0)) > 0.5 ORDER BY repeat_customer_percentage DESC, r.id ASC;",
        "explanation": "## Approach\n\nCompute per-user order counts per restaurant, reduce those to repeat-customer stats per restaurant, then calculate the repeat ratio.\n\n## Query\n\n```sql\nWITH user_restaurant_orders AS (\n  SELECT restaurant_id, user_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY restaurant_id, user_id\n), restaurant_customer_stats AS (\n  SELECT restaurant_id,\n         COUNT(*) AS total_customers,\n         COUNT(*) FILTER (WHERE order_count >= 2) AS repeat_customers\n  FROM user_restaurant_orders\n  GROUP BY restaurant_id\n)\nSELECT r.id, r.name,\n       (repeat_customers::numeric / NULLIF(total_customers, 0)) * 100 AS repeat_customer_percentage\nFROM restaurant_customer_stats rcs\nJOIN restaurants r ON r.id = rcs.restaurant_id\nWHERE (repeat_customers::numeric / NULLIF(total_customers, 0)) > 0.5\nORDER BY repeat_customer_percentage DESC, r.id ASC;\n```\n\n## Explanation\n\n- The first CTE counts orders by user within each restaurant.\n- The second computes total and repeat customers.\n- The final query calculates percentage and filters above 50%.\n\n## Why this is optimal\n\nIt breaks the problem into clear aggregation stages."
      },
      {
        "approach_title": "CASE ratio",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_restaurant_orders AS ( SELECT restaurant_id, user_id, COUNT(*) AS order_count FROM orders GROUP BY restaurant_id, user_id ) SELECT r.id, r.name, (SUM(CASE WHEN uro.order_count >= 2 THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100 AS repeat_customer_percentage FROM user_restaurant_orders uro JOIN restaurants r ON r.id = uro.restaurant_id GROUP BY r.id, r.name HAVING (SUM(CASE WHEN uro.order_count >= 2 THEN 1 ELSE 0 END)::numeric / COUNT(*)) > 0.5 ORDER BY repeat_customer_percentage DESC, r.id ASC;",
        "explanation": "## Approach\n\nUse the per-user-per-restaurant counts, then compute the repeat ratio with conditional aggregation.\n\n## Query\n\n```sql\nWITH user_restaurant_orders AS (\n  SELECT restaurant_id, user_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY restaurant_id, user_id\n)\nSELECT r.id, r.name,\n       (SUM(CASE WHEN uro.order_count >= 2 THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100 AS repeat_customer_percentage\nFROM user_restaurant_orders uro\nJOIN restaurants r ON r.id = uro.restaurant_id\nGROUP BY r.id, r.name\nHAVING (SUM(CASE WHEN uro.order_count >= 2 THEN 1 ELSE 0 END)::numeric / COUNT(*)) > 0.5\nORDER BY repeat_customer_percentage DESC, r.id ASC;\n```\n\n## Explanation\n\n- Repeat customers contribute `1`, others `0`.\n- The ratio is computed directly inside the grouped query."
      }
    ]
  },
  {
    "code": "FOOD_069",
    "approaches": [
      {
        "approach_title": "LAG 2",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH ranked_orders AS ( SELECT user_id, restaurant_id, id, created_at, LAG(restaurant_id, 1) OVER (PARTITION BY user_id ORDER BY created_at, id) AS prev_restaurant_1, LAG(restaurant_id, 2) OVER (PARTITION BY user_id ORDER BY created_at, id) AS prev_restaurant_2 FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ranked_orders ro ON ro.user_id = u.id WHERE ro.prev_restaurant_1 = ro.restaurant_id AND ro.prev_restaurant_2 = ro.restaurant_id ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nTrack the previous two restaurants for each order and look for three-in-a-row matches.\n\n## Query\n\n```sql\nWITH ranked_orders AS (\n  SELECT user_id, restaurant_id, id, created_at,\n         LAG(restaurant_id, 1) OVER (\n           PARTITION BY user_id\n           ORDER BY created_at, id\n         ) AS prev_restaurant_1,\n         LAG(restaurant_id, 2) OVER (\n           PARTITION BY user_id\n           ORDER BY created_at, id\n         ) AS prev_restaurant_2\n  FROM orders\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN ranked_orders ro ON ro.user_id = u.id\nWHERE ro.prev_restaurant_1 = ro.restaurant_id\n  AND ro.prev_restaurant_2 = ro.restaurant_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Each row can compare the current restaurant with the previous two.\n- Equality across all three means three consecutive orders from the same restaurant.\n\n## Why this is optimal\n\nIt directly checks the exact consecutive-order condition."
      },
      {
        "approach_title": "Self join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ordered_orders AS ( SELECT user_id, restaurant_id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at, id) AS rn FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ordered_orders o1 ON o1.user_id = u.id JOIN ordered_orders o2 ON o2.user_id = o1.user_id AND o2.rn = o1.rn + 1 JOIN ordered_orders o3 ON o3.user_id = o1.user_id AND o3.rn = o1.rn + 2 WHERE o1.restaurant_id = o2.restaurant_id AND o2.restaurant_id = o3.restaurant_id ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nAssign row numbers to each user's orders and self-join three consecutive rows.\n\n## Query\n\n```sql\nWITH ordered_orders AS (\n  SELECT user_id, restaurant_id,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY created_at, id\n         ) AS rn\n  FROM orders\n)\nSELECT DISTINCT u.id, u.full_name\nFROM users u\nJOIN ordered_orders o1 ON o1.user_id = u.id\nJOIN ordered_orders o2\n  ON o2.user_id = o1.user_id\n AND o2.rn = o1.rn + 1\nJOIN ordered_orders o3\n  ON o3.user_id = o1.user_id\n AND o3.rn = o1.rn + 2\nWHERE o1.restaurant_id = o2.restaurant_id\n  AND o2.restaurant_id = o3.restaurant_id\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- Row numbers identify the 1st, 2nd, and 3rd orders in sequence.\n- Matching restaurant ids across those three rows satisfies the condition."
      }
    ]
  },
  {
    "code": "FOOD_070",
    "approaches": [
      {
        "approach_title": "Rolling avg",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH daily_revenue AS ( SELECT DATE(created_at) AS order_date, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY DATE(created_at) ) SELECT order_date, total_revenue, AVG(total_revenue) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7_day_avg_revenue FROM daily_revenue ORDER BY order_date ASC;",
        "explanation": "## Approach\n\nAggregate delivered revenue by day, then compute a 7-row rolling average over that daily series.\n\n## Query\n\n```sql\nWITH daily_revenue AS (\n  SELECT DATE(created_at) AS order_date,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY DATE(created_at)\n)\nSELECT order_date, total_revenue,\n       AVG(total_revenue) OVER (\n         ORDER BY order_date\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) AS rolling_7_day_avg_revenue\nFROM daily_revenue\nORDER BY order_date ASC;\n```\n\n## Explanation\n\n- The CTE creates one revenue row per day.\n- The window frame includes the current day and six previous rows.\n- `AVG(total_revenue)` gives the 7-day rolling average.\n\n## Why this is optimal\n\nIt is the standard rolling-window aggregation pattern."
      },
      {
        "approach_title": "Correlated avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH daily_revenue AS ( SELECT DATE(created_at) AS order_date, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY DATE(created_at) ) SELECT d1.order_date, d1.total_revenue, ( SELECT AVG(d2.total_revenue) FROM daily_revenue d2 WHERE d2.order_date BETWEEN d1.order_date - INTERVAL '6 days' AND d1.order_date ) AS rolling_7_day_avg_revenue FROM daily_revenue d1 ORDER BY d1.order_date ASC;",
        "explanation": "## Approach\n\nFor each day, calculate the average daily revenue from that day and the six prior days.\n\n## Query\n\n```sql\nWITH daily_revenue AS (\n  SELECT DATE(created_at) AS order_date,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY DATE(created_at)\n)\nSELECT d1.order_date, d1.total_revenue,\n       (\n         SELECT AVG(d2.total_revenue)\n         FROM daily_revenue d2\n         WHERE d2.order_date BETWEEN d1.order_date - INTERVAL '6 days' AND d1.order_date\n       ) AS rolling_7_day_avg_revenue\nFROM daily_revenue d1\nORDER BY d1.order_date ASC;\n```\n\n## Explanation\n\n- The subquery looks back over a 7-day date range for each day.\n- It gives a similar rolling average, but is less efficient than the window version."
      }
    ]
  },
  {
    "code": "FOOD_071",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_restaurant_spend AS ( SELECT o.restaurant_id, o.user_id, SUM(o.total_amount) AS total_spent FROM orders o WHERE o.order_status = 'delivered' GROUP BY o.restaurant_id, o.user_id ), ranked_spend AS ( SELECT restaurant_id, user_id, total_spent, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY total_spent DESC, user_id ASC) AS rn FROM user_restaurant_spend ) SELECT restaurant_id, user_id, total_spent FROM ranked_spend WHERE rn = 1 ORDER BY restaurant_id ASC;",
        "explanation": "## Approach\n\nCompute spend per user per restaurant, rank users inside each restaurant, and keep the top spender.\n\n## Why optimal\n\nReturns exactly one top spender per restaurant."
      },
      {
        "approach_title": "DENSE_RANK",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_restaurant_spend AS ( SELECT o.restaurant_id, o.user_id, SUM(o.total_amount) AS total_spent FROM orders o WHERE o.order_status = 'delivered' GROUP BY o.restaurant_id, o.user_id ), ranked_spend AS ( SELECT restaurant_id, user_id, total_spent, DENSE_RANK() OVER (PARTITION BY restaurant_id ORDER BY total_spent DESC) AS spend_rank FROM user_restaurant_spend ) SELECT restaurant_id, user_id, total_spent FROM ranked_spend WHERE spend_rank = 1 ORDER BY restaurant_id ASC, user_id ASC;",
        "explanation": "## Approach\n\nReturns all tied top spenders per restaurant."
      }
    ]
  },
  {
    "code": "FOOD_072",
    "approaches": [
      {
        "approach_title": "Month span",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_months AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), user_bounds AS ( SELECT user_id, MIN(order_month) AS first_month, MAX(order_month) AS last_month, COUNT(*) AS active_months FROM user_months GROUP BY user_id ), expected_months AS ( SELECT user_id, ((EXTRACT(YEAR FROM AGE(last_month, first_month)) * 12) + EXTRACT(MONTH FROM AGE(last_month, first_month)) + 1)::int AS expected_month_count, active_months FROM user_bounds ) SELECT u.id, u.full_name FROM users u JOIN expected_months em ON em.user_id = u.id WHERE em.active_months = em.expected_month_count ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nFind each user's active order months, calculate the span from first month to last month, and keep users whose number of active months matches the full span.\n\n## Query\n\n```sql\nWITH user_months AS (\n  SELECT user_id,\n         DATE_TRUNC('month', created_at) AS order_month\n  FROM orders\n  GROUP BY user_id, DATE_TRUNC('month', created_at)\n), user_bounds AS (\n  SELECT user_id,\n         MIN(order_month) AS first_month,\n         MAX(order_month) AS last_month,\n         COUNT(*) AS active_months\n  FROM user_months\n  GROUP BY user_id\n), expected_months AS (\n  SELECT user_id,\n         ((EXTRACT(YEAR FROM AGE(last_month, first_month)) * 12)\n          + EXTRACT(MONTH FROM AGE(last_month, first_month)) + 1)::int AS expected_month_count,\n         active_months\n  FROM user_bounds\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN expected_months em ON em.user_id = u.id\nWHERE em.active_months = em.expected_month_count\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `user_months` keeps one row per user per active month.\n- `user_bounds` finds first month, last month, and how many active months the user actually had.\n- `expected_month_count` calculates how many calendar months exist in that span.\n- If actual active months equals expected months, then no month is missing.\n\n## Why this is optimal\n\nIt is compact, efficient, and directly matches the question logic."
      },
      {
        "approach_title": "Month series",
        "approach_type": "generate_series",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_bounds AS ( SELECT user_id, DATE_TRUNC('month', MIN(created_at)) AS first_month, DATE_TRUNC('month', MAX(created_at)) AS last_month FROM orders GROUP BY user_id ), user_active_months AS ( SELECT DISTINCT user_id, DATE_TRUNC('month', created_at) AS order_month FROM orders ) SELECT u.id, u.full_name FROM users u JOIN user_bounds ub ON ub.user_id = u.id WHERE NOT EXISTS ( SELECT 1 FROM generate_series(ub.first_month, ub.last_month, INTERVAL '1 month') AS gs(month_start) WHERE NOT EXISTS ( SELECT 1 FROM user_active_months uam WHERE uam.user_id = ub.user_id AND uam.order_month = gs.month_start ) ) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nGenerate every month from a user's first order month to last order month, then check whether any generated month is missing from the user's active months.\n\n## Query\n\n```sql\nWITH user_bounds AS (\n  SELECT user_id,\n         DATE_TRUNC('month', MIN(created_at)) AS first_month,\n         DATE_TRUNC('month', MAX(created_at)) AS last_month\n  FROM orders\n  GROUP BY user_id\n), user_active_months AS (\n  SELECT DISTINCT user_id,\n         DATE_TRUNC('month', created_at) AS order_month\n  FROM orders\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN user_bounds ub ON ub.user_id = u.id\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM generate_series(ub.first_month, ub.last_month, INTERVAL '1 month') AS gs(month_start)\n  WHERE NOT EXISTS (\n    SELECT 1\n    FROM user_active_months uam\n    WHERE uam.user_id = ub.user_id\n      AND uam.order_month = gs.month_start\n  )\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `user_bounds` finds each user's first and last active month.\n- `generate_series` builds every month in between.\n- The nested `NOT EXISTS` checks whether any month in that range is missing.\n- If none are missing, the user qualifies.\n\n## Difference from the optimal approach\n\nIt is more explicit, but also more complex than the count-comparison method."
      }
    ]
  },
  {
    "code": "FOOD_073",
    "approaches": [
      {
        "approach_title": "AVG delay",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name, AVG(EXTRACT(EPOCH FROM (o.delivered_at - o.estimated_delivery_at)) / 60) AS avg_delay_minutes FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' AND o.delivered_at IS NOT NULL AND o.estimated_delivery_at IS NOT NULL AND o.delivered_at > o.estimated_delivery_at GROUP BY r.id, r.name ORDER BY avg_delay_minutes DESC, r.id ASC LIMIT 10;",
        "explanation": "## Approach\n\nCalculate delay minutes for each delayed delivered order, average them per restaurant, and return the top 10 restaurants with the highest average delay.\n\n## Query\n\n```sql\nSELECT r.id,\n       r.name,\n       AVG(EXTRACT(EPOCH FROM (o.delivered_at - o.estimated_delivery_at)) / 60) AS avg_delay_minutes\nFROM restaurants r\nJOIN orders o ON o.restaurant_id = r.id\nWHERE o.order_status = 'delivered'\n  AND o.delivered_at IS NOT NULL\n  AND o.estimated_delivery_at IS NOT NULL\n  AND o.delivered_at > o.estimated_delivery_at\nGROUP BY r.id, r.name\nORDER BY avg_delay_minutes DESC, r.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- `delivered_at - estimated_delivery_at` gives the delay interval.\n- `EXTRACT(EPOCH FROM ...) / 60` converts delay to minutes.\n- Only late delivered orders are included.\n- `AVG(...)` gives average delay per restaurant.\n- `LIMIT 10` keeps the highest-delay restaurants."
      },
      {
        "approach_title": "Delay CTE",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delayed_orders AS ( SELECT restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ) SELECT r.id, r.name, AVG(dly.delay_minutes) AS avg_delay_minutes FROM restaurants r JOIN delayed_orders dly ON dly.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY avg_delay_minutes DESC, r.id ASC LIMIT 10;",
        "explanation": "## Approach\n\nFirst compute delay minutes for each delayed delivered order in a CTE, then average those delays per restaurant.\n\n## Query\n\n```sql\nWITH delayed_orders AS (\n  SELECT restaurant_id,\n         EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes\n  FROM orders\n  WHERE order_status = 'delivered'\n    AND delivered_at IS NOT NULL\n    AND estimated_delivery_at IS NOT NULL\n    AND delivered_at > estimated_delivery_at\n)\nSELECT r.id,\n       r.name,\n       AVG(dly.delay_minutes) AS avg_delay_minutes\nFROM restaurants r\nJOIN delayed_orders dly ON dly.restaurant_id = r.id\nGROUP BY r.id, r.name\nORDER BY avg_delay_minutes DESC, r.id ASC\nLIMIT 10;\n```\n\n## Explanation\n\n- The original failing version used alias `do`, which caused a syntax error.\n- This version uses `dly` instead.\n- The CTE isolates late delivered orders and computes delay minutes once.\n- The outer query averages those delays by restaurant and returns the top 10."
      }
    ]
  },
  {
    "code": "FOOD_074",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH driver_city_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, ROW_NUMBER() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS rn FROM driver_city_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE rn = 1 ORDER BY city ASC, id ASC;",
        "explanation": "## Approach\n\nCount completed deliveries per driver in each city, rank drivers within each city, and keep the top one.\n\n## Query\n\n```sql\nWITH driver_city_deliveries AS (\n  SELECT r.city,\n         d.id,\n         d.full_name,\n         COUNT(*) AS completed_deliveries\n  FROM drivers d\n  JOIN driver_assignments da ON da.driver_id = d.id\n  JOIN orders o ON o.id = da.order_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE da.status = 'delivered'\n  GROUP BY r.city, d.id, d.full_name\n), ranked_drivers AS (\n  SELECT city,\n         id,\n         full_name,\n         completed_deliveries,\n         ROW_NUMBER() OVER (\n           PARTITION BY city\n           ORDER BY completed_deliveries DESC, id ASC\n         ) AS rn\n  FROM driver_city_deliveries\n)\nSELECT city, id, full_name, completed_deliveries\nFROM ranked_drivers\nWHERE rn = 1\nORDER BY city ASC, id ASC;\n```\n\n## Explanation\n\n- `driver_city_deliveries` counts delivered assignments per driver per city.\n- `ROW_NUMBER()` ranks drivers inside each city by completed deliveries.\n- `rn = 1` keeps the top driver for each city.\n- `id ASC` breaks ties consistently."
      },
      {
        "approach_title": "DENSE_RANK",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_city_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, DENSE_RANK() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS city_rank FROM driver_city_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE city_rank = 1 ORDER BY city ASC, id ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` to rank drivers within each city and return the first ranked driver rows.\n\n## Query\n\n```sql\nWITH driver_city_deliveries AS (\n  SELECT r.city,\n         d.id,\n         d.full_name,\n         COUNT(*) AS completed_deliveries\n  FROM drivers d\n  JOIN driver_assignments da ON da.driver_id = d.id\n  JOIN orders o ON o.id = da.order_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE da.status = 'delivered'\n  GROUP BY r.city, d.id, d.full_name\n), ranked_drivers AS (\n  SELECT city,\n         id,\n         full_name,\n         completed_deliveries,\n         DENSE_RANK() OVER (\n           PARTITION BY city\n           ORDER BY completed_deliveries DESC, id ASC\n         ) AS city_rank\n  FROM driver_city_deliveries\n)\nSELECT city, id, full_name, completed_deliveries\nFROM ranked_drivers\nWHERE city_rank = 1\nORDER BY city ASC, id ASC;\n```\n\n## Explanation\n\n- Revenue is not involved here; only delivered assignment counts matter.\n- `DENSE_RANK()` assigns city-level ranks by completed deliveries.\n- Keeping `city_rank = 1` returns the top-ranked driver rows per city."
      }
    ]
  },
  {
    "code": "FOOD_075",
    "approaches": [
      {
        "approach_title": "FILTER",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name FROM users u JOIN support_tickets st ON st.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE st.refund_amount > 0) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nGroup each user's support tickets and keep only users whose every ticket has a refund amount greater than zero.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nJOIN support_tickets st ON st.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) > 0\n   AND COUNT(*) = COUNT(*) FILTER (WHERE st.refund_amount > 0)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `JOIN support_tickets` keeps only users who actually have support tickets.\n- `COUNT(*)` gives the total number of tickets per user.\n- `COUNT(*) FILTER (WHERE st.refund_amount > 0)` counts only refunded tickets.\n- If both counts are equal, then every support ticket for that user led to a refund.\n\n## Why this is optimal\n\nIt expresses the all-tickets condition directly and compactly."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM support_tickets st WHERE st.user_id = u.id ) AND NOT EXISTS ( SELECT 1 FROM support_tickets st WHERE st.user_id = u.id AND st.refund_amount <= 0 ) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nKeep users who have at least one support ticket and no support ticket with a refund amount less than or equal to zero.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nWHERE EXISTS (\n  SELECT 1\n  FROM support_tickets st\n  WHERE st.user_id = u.id\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM support_tickets st\n  WHERE st.user_id = u.id\n    AND st.refund_amount <= 0\n)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` ensures the user has at least one support ticket.\n- The `NOT EXISTS` ensures there is no ticket without a positive refund.\n- Together, they mean every ticket led to a refund."
      },
      {
        "approach_title": "CASE",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT u.id, u.full_name FROM users u JOIN support_tickets st ON st.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND SUM(CASE WHEN st.refund_amount > 0 THEN 1 ELSE 0 END) = COUNT(*) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUse conditional aggregation to count refunded tickets and compare that count to the total number of tickets.\n\n## Query\n\n```sql\nSELECT u.id, u.full_name\nFROM users u\nJOIN support_tickets st ON st.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) > 0\n   AND SUM(CASE WHEN st.refund_amount > 0 THEN 1 ELSE 0 END) = COUNT(*)\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `CASE WHEN st.refund_amount > 0 THEN 1 ELSE 0 END` marks refunded tickets.\n- `SUM(...)` counts those refunded tickets.\n- Equality with `COUNT(*)` means every ticket had a positive refund."
      }
    ]
  },
  {
    "code": "FOOD_076",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_refunds AS ( SELECT st.user_id, st.order_id, SUM(st.refund_amount) AS total_refund FROM support_tickets st GROUP BY st.user_id, st.order_id ), ranked_refunds AS ( SELECT user_id, order_id, total_refund, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total_refund DESC, order_id ASC) AS rn FROM user_refunds ) SELECT user_id, order_id, total_refund FROM ranked_refunds WHERE rn = 1 ORDER BY user_id ASC;",
        "explanation": "## Approach\n\nSum refund amounts per user and order, rank those orders within each user, and keep the highest-refund order.\n\n## Query\n\n```sql\nWITH user_refunds AS (\n  SELECT st.user_id,\n         st.order_id,\n         SUM(st.refund_amount) AS total_refund\n  FROM support_tickets st\n  GROUP BY st.user_id, st.order_id\n), ranked_refunds AS (\n  SELECT user_id,\n         order_id,\n         total_refund,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY total_refund DESC, order_id ASC\n         ) AS rn\n  FROM user_refunds\n)\nSELECT user_id, order_id, total_refund\nFROM ranked_refunds\nWHERE rn = 1\nORDER BY user_id ASC;\n```\n\n## Explanation\n\n- `user_refunds` calculates total refund amount per user per order.\n- `ROW_NUMBER()` ranks each user's refunded orders from highest to lowest refund.\n- `order_id ASC` breaks ties consistently.\n- `rn = 1` keeps exactly one highest-refund order per user.\n\n## Why this is optimal\n\nIt guarantees one deterministic result row per user."
      },
      {
        "approach_title": "Max + min id",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_refunds AS ( SELECT st.user_id, st.order_id, SUM(st.refund_amount) AS total_refund FROM support_tickets st GROUP BY st.user_id, st.order_id ), max_refunds AS ( SELECT user_id, MAX(total_refund) AS max_refund FROM user_refunds GROUP BY user_id ), tied_orders AS ( SELECT ur.user_id, ur.order_id, ur.total_refund FROM user_refunds ur JOIN max_refunds mr ON mr.user_id = ur.user_id AND mr.max_refund = ur.total_refund ), chosen_orders AS ( SELECT user_id, MIN(order_id) AS order_id FROM tied_orders GROUP BY user_id ) SELECT t.user_id, t.order_id, t.total_refund FROM tied_orders t JOIN chosen_orders c ON c.user_id = t.user_id AND c.order_id = t.order_id ORDER BY t.user_id ASC;",
        "explanation": "## Approach\n\nFind the maximum refund per user, keep tied top orders, then resolve ties by choosing the smallest `order_id`.\n\n## Query\n\n```sql\nWITH user_refunds AS (\n  SELECT st.user_id,\n         st.order_id,\n         SUM(st.refund_amount) AS total_refund\n  FROM support_tickets st\n  GROUP BY st.user_id, st.order_id\n), max_refunds AS (\n  SELECT user_id,\n         MAX(total_refund) AS max_refund\n  FROM user_refunds\n  GROUP BY user_id\n), tied_orders AS (\n  SELECT ur.user_id,\n         ur.order_id,\n         ur.total_refund\n  FROM user_refunds ur\n  JOIN max_refunds mr\n    ON mr.user_id = ur.user_id\n   AND mr.max_refund = ur.total_refund\n), chosen_orders AS (\n  SELECT user_id,\n         MIN(order_id) AS order_id\n  FROM tied_orders\n  GROUP BY user_id\n)\nSELECT t.user_id, t.order_id, t.total_refund\nFROM tied_orders t\nJOIN chosen_orders c\n  ON c.user_id = t.user_id\n AND c.order_id = t.order_id\nORDER BY t.user_id ASC;\n```\n\n## Explanation\n\n- `max_refunds` finds the highest refund total for each user.\n- `tied_orders` keeps all orders tied at that maximum.\n- `chosen_orders` resolves ties using the smallest `order_id`.\n- This makes the output deterministic like the `ROW_NUMBER()` version."
      }
    ]
  },
  {
    "code": "FOOD_077",
    "approaches": [
      {
        "approach_title": "LAG gap",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH ordered_gaps AS ( SELECT o.user_id, o.created_at AS order_created_at, LAG(o.created_at) OVER (PARTITION BY o.user_id ORDER BY o.created_at, o.id) AS previous_order_at FROM orders o ) SELECT u.id, u.full_name, MAX(DATE_PART('day', og.order_created_at - og.previous_order_at)) AS longest_gap_days FROM users u JOIN ordered_gaps og ON og.user_id = u.id WHERE og.previous_order_at IS NOT NULL GROUP BY u.id, u.full_name ORDER BY longest_gap_days DESC, u.id ASC;",
        "explanation": "## Approach\n\nFind longest gap between consecutive orders per user using `LAG()`."
      },
      {
        "approach_title": "Row join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ordered_orders AS ( SELECT o.user_id, o.created_at AS order_created_at, ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.created_at, o.id) AS rn FROM orders o ) SELECT u.id, u.full_name, MAX(DATE_PART('day', o2.order_created_at - o1.order_created_at)) AS longest_gap_days FROM users u JOIN ordered_orders o1 ON o1.user_id = u.id JOIN ordered_orders o2 ON o2.user_id = o1.user_id AND o2.rn = o1.rn + 1 GROUP BY u.id, u.full_name ORDER BY longest_gap_days DESC, u.id ASC;",
        "explanation": "## Approach\n\nJoin consecutive order rows using row numbers."
      }
    ]
  },
  {
    "code": "FOOD_078",
    "approaches": [
      {
        "approach_title": "Streak key",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH driver_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_day FROM driver_assignments da WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ), grouped_days AS ( SELECT driver_id, delivery_day, delivery_day - (ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY delivery_day))::int AS grp_key FROM driver_days ), streaks AS ( SELECT driver_id, COUNT(*) AS streak_length FROM grouped_days GROUP BY driver_id, grp_key ) SELECT d.id, d.full_name FROM drivers d JOIN streaks s ON s.driver_id = d.id WHERE s.streak_length >= 5 GROUP BY d.id, d.full_name ORDER BY d.id ASC;",
        "explanation": "## Approach\n\nReduce deliveries to distinct driver-day pairs, group consecutive days using a streak key, then keep drivers who have a streak of at least 5 days.\n\n## Query\n\n```sql\nWITH driver_days AS (\n  SELECT DISTINCT da.driver_id,\n         DATE(da.delivered_at) AS delivery_day\n  FROM driver_assignments da\n  WHERE da.status = 'delivered'\n    AND da.delivered_at IS NOT NULL\n), grouped_days AS (\n  SELECT driver_id,\n         delivery_day,\n         delivery_day - (ROW_NUMBER() OVER (\n           PARTITION BY driver_id\n           ORDER BY delivery_day\n         ))::int AS grp_key\n  FROM driver_days\n), streaks AS (\n  SELECT driver_id,\n         COUNT(*) AS streak_length\n  FROM grouped_days\n  GROUP BY driver_id, grp_key\n)\nSELECT d.id, d.full_name\nFROM drivers d\nJOIN streaks s ON s.driver_id = d.id\nWHERE s.streak_length >= 5\nGROUP BY d.id, d.full_name\nORDER BY d.id ASC;\n```\n\n## Explanation\n\n- `driver_days` keeps one row per driver per delivered calendar day.\n- `ROW_NUMBER()` assigns a sequence to each driver's days.\n- Subtracting that sequence from the date creates the same key for consecutive-day runs.\n- `streaks` counts the length of each run.\n- Drivers with a streak length of at least 5 are returned.\n\n## Why this is optimal\n\nIt is the standard and efficient way to detect consecutive-date streaks."
      },
      {
        "approach_title": "Self join 5",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_day FROM driver_assignments da WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ) SELECT DISTINCT d.id, d.full_name FROM drivers d JOIN driver_days d1 ON d1.driver_id = d.id JOIN driver_days d2 ON d2.driver_id = d1.driver_id AND d2.delivery_day = d1.delivery_day + INTERVAL '1 day' JOIN driver_days d3 ON d3.driver_id = d1.driver_id AND d3.delivery_day = d1.delivery_day + INTERVAL '2 day' JOIN driver_days d4 ON d4.driver_id = d1.driver_id AND d4.delivery_day = d1.delivery_day + INTERVAL '3 day' JOIN driver_days d5 ON d5.driver_id = d1.driver_id AND d5.delivery_day = d1.delivery_day + INTERVAL '4 day' ORDER BY d.id ASC;",
        "explanation": "## Approach\n\nCreate distinct delivered days per driver, then self join five consecutive days starting from the same first day.\n\n## Query\n\n```sql\nWITH driver_days AS (\n  SELECT DISTINCT da.driver_id,\n         DATE(da.delivered_at) AS delivery_day\n  FROM driver_assignments da\n  WHERE da.status = 'delivered'\n    AND da.delivered_at IS NOT NULL\n)\nSELECT DISTINCT d.id, d.full_name\nFROM drivers d\nJOIN driver_days d1 ON d1.driver_id = d.id\nJOIN driver_days d2\n  ON d2.driver_id = d1.driver_id\n AND d2.delivery_day = d1.delivery_day + INTERVAL '1 day'\nJOIN driver_days d3\n  ON d3.driver_id = d1.driver_id\n AND d3.delivery_day = d1.delivery_day + INTERVAL '2 day'\nJOIN driver_days d4\n  ON d4.driver_id = d1.driver_id\n AND d4.delivery_day = d1.delivery_day + INTERVAL '3 day'\nJOIN driver_days d5\n  ON d5.driver_id = d1.driver_id\n AND d5.delivery_day = d1.delivery_day + INTERVAL '4 day'\nORDER BY d.id ASC;\n```\n\n## Explanation\n\n- `driver_days` removes duplicate deliveries on the same day.\n- The self joins check whether a driver has five exact consecutive calendar days.\n- `DISTINCT` returns each qualifying driver once.\n\n## Difference from the optimal approach\n\nIt works for a fixed streak length of 5, but it is less flexible and less elegant than the streak-key method."
      }
    ]
  },
  {
    "code": "FOOD_079",
    "approaches": [
      {
        "approach_title": "LAG month",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_orders AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month, COUNT(*) AS order_count FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), ranked_months AS ( SELECT user_id, order_month, order_count, LAG(order_count) OVER (PARTITION BY user_id ORDER BY order_month) AS previous_month_order_count FROM monthly_orders ) SELECT u.id, u.full_name, rm.order_month, rm.order_count, rm.previous_month_order_count FROM users u JOIN ranked_months rm ON rm.user_id = u.id WHERE rm.previous_month_order_count IS NOT NULL AND rm.order_count < rm.previous_month_order_count ORDER BY rm.order_month ASC, u.id ASC;",
        "explanation": "## Approach\n\nCount orders per user per month, then compare each month with the user's immediately previous recorded month using `LAG()`.\n\n## Query\n\n```sql\nWITH monthly_orders AS (\n  SELECT user_id,\n         DATE_TRUNC('month', created_at) AS order_month,\n         COUNT(*) AS order_count\n  FROM orders\n  GROUP BY user_id, DATE_TRUNC('month', created_at)\n), ranked_months AS (\n  SELECT user_id,\n         order_month,\n         order_count,\n         LAG(order_count) OVER (\n           PARTITION BY user_id\n           ORDER BY order_month\n         ) AS previous_month_order_count\n  FROM monthly_orders\n)\nSELECT u.id, u.full_name,\n       rm.order_month,\n       rm.order_count,\n       rm.previous_month_order_count\nFROM users u\nJOIN ranked_months rm ON rm.user_id = u.id\nWHERE rm.previous_month_order_count IS NOT NULL\n  AND rm.order_count < rm.previous_month_order_count\nORDER BY rm.order_month ASC, u.id ASC;\n```\n\n## Explanation\n\n- `monthly_orders` creates one row per user per active month.\n- `LAG()` fetches the previous recorded month's order count for that user.\n- The outer query keeps months where the count declined.\n\n## Why this is optimal\n\nIt matches the question exactly because it compares against the previous recorded month, not necessarily the previous calendar month."
      },
      {
        "approach_title": "Row join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_orders AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month, COUNT(*) AS order_count FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), ordered_months AS ( SELECT user_id, order_month, order_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_month) AS rn FROM monthly_orders ) SELECT u.id, u.full_name, curr.order_month, curr.order_count, prev.order_count AS previous_month_order_count FROM users u JOIN ordered_months curr ON curr.user_id = u.id JOIN ordered_months prev ON prev.user_id = curr.user_id AND prev.rn = curr.rn - 1 WHERE curr.order_count < prev.order_count ORDER BY curr.order_month ASC, u.id ASC;",
        "explanation": "## Approach\n\nAssign row numbers to each user's recorded months, then self join each month to the previous recorded month.\n\n## Query\n\n```sql\nWITH monthly_orders AS (\n  SELECT user_id,\n         DATE_TRUNC('month', created_at) AS order_month,\n         COUNT(*) AS order_count\n  FROM orders\n  GROUP BY user_id, DATE_TRUNC('month', created_at)\n), ordered_months AS (\n  SELECT user_id,\n         order_month,\n         order_count,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY order_month\n         ) AS rn\n  FROM monthly_orders\n)\nSELECT u.id, u.full_name,\n       curr.order_month,\n       curr.order_count,\n       prev.order_count AS previous_month_order_count\nFROM users u\nJOIN ordered_months curr ON curr.user_id = u.id\nJOIN ordered_months prev\n  ON prev.user_id = curr.user_id\n AND prev.rn = curr.rn - 1\nWHERE curr.order_count < prev.order_count\nORDER BY curr.order_month ASC, u.id ASC;\n```\n\n## Explanation\n\n- The failing self join used the previous calendar month, which is too strict.\n- `ROW_NUMBER()` creates a sequence of recorded months per user.\n- Joining `rn` to `rn - 1` compares each month with the previous recorded month.\n- That makes this approach consistent with the passing `LAG()` query."
      }
    ]
  },
  {
    "code": "FOOD_080",
    "approaches": [
      {
        "approach_title": "Avg delay",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH delayed_orders AS ( SELECT id, restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ), restaurant_avg_delay AS ( SELECT restaurant_id, AVG(delay_minutes) AS avg_delay_minutes FROM delayed_orders GROUP BY restaurant_id ) SELECT dly.id, dly.restaurant_id, dly.delay_minutes FROM delayed_orders dly JOIN restaurant_avg_delay rad ON rad.restaurant_id = dly.restaurant_id WHERE dly.delay_minutes > rad.avg_delay_minutes ORDER BY dly.restaurant_id ASC, dly.id ASC;",
        "explanation": "## Approach\n\nFirst calculate delay minutes for delayed delivered orders, then compute average delay per restaurant, and keep orders whose delay is above that restaurant average.\n\n## Query\n\n```sql\nWITH delayed_orders AS (\n  SELECT id,\n         restaurant_id,\n         EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes\n  FROM orders\n  WHERE order_status = 'delivered'\n    AND delivered_at IS NOT NULL\n    AND estimated_delivery_at IS NOT NULL\n    AND delivered_at > estimated_delivery_at\n), restaurant_avg_delay AS (\n  SELECT restaurant_id,\n         AVG(delay_minutes) AS avg_delay_minutes\n  FROM delayed_orders\n  GROUP BY restaurant_id\n)\nSELECT dly.id,\n       dly.restaurant_id,\n       dly.delay_minutes\nFROM delayed_orders dly\nJOIN restaurant_avg_delay rad ON rad.restaurant_id = dly.restaurant_id\nWHERE dly.delay_minutes > rad.avg_delay_minutes\nORDER BY dly.restaurant_id ASC, dly.id ASC;\n```\n\n## Explanation\n\n- `delayed_orders` keeps only late delivered orders.\n- `delay_minutes` is computed from actual minus estimated delivery time.\n- `restaurant_avg_delay` calculates average delay per restaurant.\n- The final query returns only orders delayed more than their restaurant average."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, restaurant_id, delay_minutes FROM ( SELECT id, restaurant_id, delay_minutes, AVG(delay_minutes) OVER (PARTITION BY restaurant_id) AS avg_delay_minutes FROM ( SELECT id, restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ) delayed ) t WHERE delay_minutes > avg_delay_minutes ORDER BY restaurant_id ASC, id ASC;",
        "explanation": "## Approach\n\nCalculate delay minutes for delayed delivered orders, attach each restaurant's average delay using a window function, then keep orders above that average.\n\n## Query\n\n```sql\nSELECT id, restaurant_id, delay_minutes\nFROM (\n  SELECT id,\n         restaurant_id,\n         delay_minutes,\n         AVG(delay_minutes) OVER (PARTITION BY restaurant_id) AS avg_delay_minutes\n  FROM (\n    SELECT id,\n           restaurant_id,\n           EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes\n    FROM orders\n    WHERE order_status = 'delivered'\n      AND delivered_at IS NOT NULL\n      AND estimated_delivery_at IS NOT NULL\n      AND delivered_at > estimated_delivery_at\n  ) delayed\n) t\nWHERE delay_minutes > avg_delay_minutes\nORDER BY restaurant_id ASC, id ASC;\n```\n\n## Explanation\n\n- The inner query computes delay minutes per delayed delivered order.\n- The window average adds the restaurant benchmark to each row.\n- The outer query keeps only rows above that benchmark."
      }
    ]
  },
  {
    "code": "FOOD_081",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_city_revenue AS ( SELECT DATE_TRUNC('month', o.created_at) AS revenue_month, r.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY DATE_TRUNC('month', o.created_at), r.city ), ranked_cities AS ( SELECT revenue_month, city, total_revenue, ROW_NUMBER() OVER (PARTITION BY revenue_month ORDER BY total_revenue DESC, city ASC) AS rn FROM monthly_city_revenue ) SELECT revenue_month, city, total_revenue FROM ranked_cities WHERE rn <= 3 ORDER BY revenue_month ASC, total_revenue DESC, city ASC;",
        "explanation": "## Approach\n\nCalculate delivered revenue by month and city, rank cities within each month, and keep the top 3.\n\n## Query\n\n```sql\nWITH monthly_city_revenue AS (\n  SELECT DATE_TRUNC('month', o.created_at) AS revenue_month,\n         r.city,\n         SUM(o.total_amount) AS total_revenue\n  FROM orders o\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE o.order_status = 'delivered'\n  GROUP BY DATE_TRUNC('month', o.created_at), r.city\n), ranked_cities AS (\n  SELECT revenue_month,\n         city,\n         total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY revenue_month\n           ORDER BY total_revenue DESC, city ASC\n         ) AS rn\n  FROM monthly_city_revenue\n)\nSELECT revenue_month, city, total_revenue\nFROM ranked_cities\nWHERE rn <= 3\nORDER BY revenue_month ASC, total_revenue DESC, city ASC;\n```\n\n## Explanation\n\n- `monthly_city_revenue` computes one revenue row per month per city.\n- `ROW_NUMBER()` ranks cities within each month.\n- `rn <= 3` keeps exactly three cities per month.\n- Final sorting matches the expected output order."
      },
      {
        "approach_title": "DENSE_RANK",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_city_revenue AS ( SELECT DATE_TRUNC('month', o.created_at) AS revenue_month, r.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY DATE_TRUNC('month', o.created_at), r.city ), ranked_cities AS ( SELECT revenue_month, city, total_revenue, DENSE_RANK() OVER (PARTITION BY revenue_month ORDER BY total_revenue DESC, city ASC) AS rank_num FROM monthly_city_revenue ) SELECT revenue_month, city, total_revenue FROM ranked_cities WHERE rank_num <= 3 ORDER BY revenue_month ASC, total_revenue DESC, city ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` to rank cities by monthly delivered revenue and keep the first three ranks.\n\n## Query\n\n```sql\nWITH monthly_city_revenue AS (\n  SELECT DATE_TRUNC('month', o.created_at) AS revenue_month,\n         r.city,\n         SUM(o.total_amount) AS total_revenue\n  FROM orders o\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE o.order_status = 'delivered'\n  GROUP BY DATE_TRUNC('month', o.created_at), r.city\n), ranked_cities AS (\n  SELECT revenue_month,\n         city,\n         total_revenue,\n         DENSE_RANK() OVER (\n           PARTITION BY revenue_month\n           ORDER BY total_revenue DESC, city ASC\n         ) AS rank_num\n  FROM monthly_city_revenue\n)\nSELECT revenue_month, city, total_revenue\nFROM ranked_cities\nWHERE rank_num <= 3\nORDER BY revenue_month ASC, total_revenue DESC, city ASC;\n```\n\n## Explanation\n\n- Revenue is aggregated per month and city first.\n- `DENSE_RANK()` assigns month-level ranks.\n- Keeping `rank_num <= 3` returns the top-ranked city rows per month."
      }
    ]
  },
  {
    "code": "FOOD_082",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_coupon_usage AS ( SELECT DATE_TRUNC('month', o.created_at) AS usage_month, c.code, COUNT(*) AS usage_count FROM orders o JOIN coupons c ON c.id = o.coupon_id GROUP BY DATE_TRUNC('month', o.created_at), c.code ), ranked_coupon_usage AS ( SELECT usage_month, code, usage_count, ROW_NUMBER() OVER (PARTITION BY usage_month ORDER BY usage_count DESC, code ASC) AS rn FROM monthly_coupon_usage ) SELECT usage_month, code, usage_count FROM ranked_coupon_usage WHERE rn <= 2 ORDER BY usage_month ASC, usage_count DESC, code ASC;",
        "explanation": "## Approach\n\nFind top 2 most used coupons for each month.\n\n## Why optimal\n\n`ROW_NUMBER()` guarantees exactly 2 rows per month."
      },
      {
        "approach_title": "Rank count",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_coupon_usage AS ( SELECT DATE_TRUNC('month', o.created_at) AS usage_month, c.code, COUNT(*) AS usage_count FROM orders o JOIN coupons c ON c.id = o.coupon_id GROUP BY DATE_TRUNC('month', o.created_at), c.code ) SELECT usage_month, code, usage_count FROM ( SELECT usage_month, code, usage_count, ROW_NUMBER() OVER (PARTITION BY usage_month ORDER BY usage_count DESC, code ASC) AS rn FROM monthly_coupon_usage ) t WHERE rn <= 2 ORDER BY usage_month ASC, usage_count DESC, code ASC;",
        "explanation": "## Approach\n\nSame logic using inline subquery."
      }
    ]
  },
  {
    "code": "FOOD_083",
    "approaches": [
      {
        "approach_title": "FILTER",
        "approach_type": "conditional_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH delivered_orders AS ( SELECT restaurant_id, total_amount, EXTRACT(ISODOW FROM created_at) AS order_isodow FROM orders WHERE order_status = 'delivered' ) SELECT r.id, r.name, SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)) AS weekend_revenue, SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5) AS weekday_revenue FROM restaurants r JOIN delivered_orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name HAVING COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)), 0) > COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5), 0) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nPrecompute the ISO weekday for each delivered order, then split revenue into weekend and weekday buckets with `FILTER`.\n\n## Query\n\n```sql\nWITH delivered_orders AS (\n  SELECT restaurant_id,\n         total_amount,\n         EXTRACT(ISODOW FROM created_at) AS order_isodow\n  FROM orders\n  WHERE order_status = 'delivered'\n)\nSELECT r.id,\n       r.name,\n       SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)) AS weekend_revenue,\n       SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5) AS weekday_revenue\nFROM restaurants r\nJOIN delivered_orders o ON o.restaurant_id = r.id\nGROUP BY r.id, r.name\nHAVING COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)), 0)\n     > COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5), 0)\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- The CTE keeps only delivered orders.\n- `order_isodow` stores the day-of-week once.\n- Weekend revenue uses days 6 and 7.\n- Weekday revenue uses days 1 through 5.\n- The `HAVING` clause keeps only restaurants where weekend revenue is greater."
      },
      {
        "approach_title": "CASE SUM",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivered_orders AS ( SELECT restaurant_id, total_amount, EXTRACT(ISODOW FROM created_at) AS order_isodow FROM orders WHERE order_status = 'delivered' ) SELECT r.id, r.name, SUM(CASE WHEN o.order_isodow IN (6, 7) THEN o.total_amount ELSE 0 END) AS weekend_revenue, SUM(CASE WHEN o.order_isodow BETWEEN 1 AND 5 THEN o.total_amount ELSE 0 END) AS weekday_revenue FROM restaurants r JOIN delivered_orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name HAVING SUM(CASE WHEN o.order_isodow IN (6, 7) THEN o.total_amount ELSE 0 END) > SUM(CASE WHEN o.order_isodow BETWEEN 1 AND 5 THEN o.total_amount ELSE 0 END) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nPrecompute the ISO weekday for each delivered order, then use conditional sums for weekend and weekday revenue.\n\n## Query\n\n```sql\nWITH delivered_orders AS (\n  SELECT restaurant_id,\n         total_amount,\n         EXTRACT(ISODOW FROM created_at) AS order_isodow\n  FROM orders\n  WHERE order_status = 'delivered'\n)\nSELECT r.id,\n       r.name,\n       SUM(CASE WHEN o.order_isodow IN (6, 7) THEN o.total_amount ELSE 0 END) AS weekend_revenue,\n       SUM(CASE WHEN o.order_isodow BETWEEN 1 AND 5 THEN o.total_amount ELSE 0 END) AS weekday_revenue\nFROM restaurants r\nJOIN delivered_orders o ON o.restaurant_id = r.id\nGROUP BY r.id, r.name\nHAVING SUM(CASE WHEN o.order_isodow IN (6, 7) THEN o.total_amount ELSE 0 END)\n     > SUM(CASE WHEN o.order_isodow BETWEEN 1 AND 5 THEN o.total_amount ELSE 0 END)\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- The day-of-week is computed once in the CTE.\n- `CASE` expressions separate weekend and weekday revenue.\n- The result shape matches the question exactly."
      }
    ]
  },
  {
    "code": "FOOD_084",
    "approaches": [
      {
        "approach_title": "COUNT orders",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH refunded_orders AS ( SELECT user_id, order_id, SUM(refund_amount) AS total_refund FROM support_tickets WHERE refund_amount > 0 GROUP BY user_id, order_id ) SELECT u.id, u.full_name, COUNT(*) AS refunded_order_count FROM users u JOIN refunded_orders ro ON ro.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 1 ORDER BY refunded_order_count DESC, u.id ASC;",
        "explanation": "## Approach\n\nFirst collapse refunds to one row per user per refunded order, then count how many distinct refunded orders each user has.\n\n## Query\n\n```sql\nWITH refunded_orders AS (\n  SELECT user_id,\n         order_id,\n         SUM(refund_amount) AS total_refund\n  FROM support_tickets\n  WHERE refund_amount > 0\n  GROUP BY user_id, order_id\n)\nSELECT u.id,\n       u.full_name,\n       COUNT(*) AS refunded_order_count\nFROM users u\nJOIN refunded_orders ro ON ro.user_id = u.id\nGROUP BY u.id, u.full_name\nHAVING COUNT(*) > 1\nORDER BY refunded_order_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- `refund_amount > 0` keeps only refunded tickets.\n- Grouping by `user_id, order_id` ensures each refunded order is counted once.\n- The outer query counts refunded orders per user.\n- `HAVING COUNT(*) > 1` keeps users refunded on multiple orders."
      },
      {
        "approach_title": "COUNT DISTINCT",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name, COUNT(DISTINCT st.order_id) AS refunded_order_count FROM users u JOIN support_tickets st ON st.user_id = u.id WHERE st.refund_amount > 0 GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT st.order_id) > 1 ORDER BY refunded_order_count DESC, u.id ASC;",
        "explanation": "## Approach\n\nCount distinct refunded orders directly from `support_tickets`.\n\n## Query\n\n```sql\nSELECT u.id,\n       u.full_name,\n       COUNT(DISTINCT st.order_id) AS refunded_order_count\nFROM users u\nJOIN support_tickets st ON st.user_id = u.id\nWHERE st.refund_amount > 0\nGROUP BY u.id, u.full_name\nHAVING COUNT(DISTINCT st.order_id) > 1\nORDER BY refunded_order_count DESC, u.id ASC;\n```\n\n## Explanation\n\n- `refund_amount > 0` limits rows to refunded tickets.\n- `COUNT(DISTINCT st.order_id)` counts how many separate refunded orders each user had.\n- Users with more than one refunded order are returned."
      }
    ]
  },
  {
    "code": "FOOD_085",
    "approaches": [
      {
        "approach_title": "Zero failures",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT d.id, d.full_name, COUNT(*) FILTER (WHERE da.status = 'delivered') AS delivered_count FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id GROUP BY d.id, d.full_name HAVING COUNT(*) FILTER (WHERE da.status = 'delivered') >= 10 AND COUNT(*) FILTER (WHERE da.status IN ('failed','cancelled')) = 0 ORDER BY d.id ASC;",
        "explanation": "## Approach\n\nDrivers with at least 10 deliveries and zero failed/cancelled assignments."
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delivered_counts AS ( SELECT driver_id, COUNT(*) AS delivered_count FROM driver_assignments WHERE status = 'delivered' GROUP BY driver_id ) SELECT d.id, d.full_name, dc.delivered_count FROM drivers d JOIN delivered_counts dc ON dc.driver_id = d.id WHERE dc.delivered_count >= 10 AND NOT EXISTS ( SELECT 1 FROM driver_assignments da WHERE da.driver_id = d.id AND da.status IN ('failed','cancelled') ) ORDER BY d.id ASC;",
        "explanation": "## Approach\n\nCount delivered assignments first and exclude failed ones."
      }
    ]
  },
  {
    "code": "FOOD_086",
    "approaches": [
      {
        "approach_title": "3 month up",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), ranked_months AS ( SELECT restaurant_id, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS rn FROM monthly_revenue ), pivoted AS ( SELECT restaurant_id, MAX(total_revenue) FILTER (WHERE rn = 1) AS latest_month_revenue, MAX(total_revenue) FILTER (WHERE rn = 2) AS middle_month_revenue, MAX(total_revenue) FILTER (WHERE rn = 3) AS oldest_month_revenue FROM ranked_months WHERE rn <= 3 GROUP BY restaurant_id ) SELECT r.id, r.name, p.oldest_month_revenue, p.middle_month_revenue, p.latest_month_revenue FROM pivoted p JOIN restaurants r ON r.id = p.restaurant_id WHERE p.latest_month_revenue IS NOT NULL AND p.middle_month_revenue IS NOT NULL AND p.oldest_month_revenue IS NOT NULL AND p.oldest_month_revenue < p.middle_month_revenue AND p.middle_month_revenue < p.latest_month_revenue ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nPivot the latest three recorded revenue months per restaurant into oldest, middle, and latest columns, then keep restaurants with a strictly increasing trend.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT restaurant_id,\n         DATE_TRUNC('month', created_at) AS revenue_month,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY restaurant_id, DATE_TRUNC('month', created_at)\n), ranked_months AS (\n  SELECT restaurant_id,\n         revenue_month,\n         total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY restaurant_id\n           ORDER BY revenue_month DESC\n         ) AS rn\n  FROM monthly_revenue\n), pivoted AS (\n  SELECT restaurant_id,\n         MAX(total_revenue) FILTER (WHERE rn = 1) AS latest_month_revenue,\n         MAX(total_revenue) FILTER (WHERE rn = 2) AS middle_month_revenue,\n         MAX(total_revenue) FILTER (WHERE rn = 3) AS oldest_month_revenue\n  FROM ranked_months\n  WHERE rn <= 3\n  GROUP BY restaurant_id\n)\nSELECT r.id,\n       r.name,\n       p.oldest_month_revenue,\n       p.middle_month_revenue,\n       p.latest_month_revenue\nFROM pivoted p\nJOIN restaurants r ON r.id = p.restaurant_id\nWHERE p.latest_month_revenue IS NOT NULL\n  AND p.middle_month_revenue IS NOT NULL\n  AND p.oldest_month_revenue IS NOT NULL\n  AND p.oldest_month_revenue < p.middle_month_revenue\n  AND p.middle_month_revenue < p.latest_month_revenue\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- `rn = 1` is the latest recorded month.\n- `rn = 2` is the middle recorded month.\n- `rn = 3` is the oldest of the latest three recorded months.\n- The final condition checks strict increase across those three months."
      },
      {
        "approach_title": "LEAD compare",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), month_history AS ( SELECT restaurant_id, revenue_month, total_revenue, LEAD(total_revenue, 1) OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS middle_month_revenue, LEAD(total_revenue, 2) OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS oldest_month_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS rn FROM monthly_revenue ) SELECT r.id, r.name, mh.oldest_month_revenue, mh.middle_month_revenue, mh.total_revenue AS latest_month_revenue FROM month_history mh JOIN restaurants r ON r.id = mh.restaurant_id WHERE mh.rn = 1 AND mh.middle_month_revenue IS NOT NULL AND mh.oldest_month_revenue IS NOT NULL AND mh.oldest_month_revenue < mh.middle_month_revenue AND mh.middle_month_revenue < mh.total_revenue ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nStart from the latest recorded month per restaurant and use `LEAD()` on descending months to fetch the two earlier recorded months.\n\n## Query\n\n```sql\nWITH monthly_revenue AS (\n  SELECT restaurant_id,\n         DATE_TRUNC('month', created_at) AS revenue_month,\n         SUM(total_amount) AS total_revenue\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY restaurant_id, DATE_TRUNC('month', created_at)\n), month_history AS (\n  SELECT restaurant_id,\n         revenue_month,\n         total_revenue,\n         LEAD(total_revenue, 1) OVER (\n           PARTITION BY restaurant_id\n           ORDER BY revenue_month DESC\n         ) AS middle_month_revenue,\n         LEAD(total_revenue, 2) OVER (\n           PARTITION BY restaurant_id\n           ORDER BY revenue_month DESC\n         ) AS oldest_month_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY restaurant_id\n           ORDER BY revenue_month DESC\n         ) AS rn\n  FROM monthly_revenue\n)\nSELECT r.id,\n       r.name,\n       mh.oldest_month_revenue,\n       mh.middle_month_revenue,\n       mh.total_revenue AS latest_month_revenue\nFROM month_history mh\nJOIN restaurants r ON r.id = mh.restaurant_id\nWHERE mh.rn = 1\n  AND mh.middle_month_revenue IS NOT NULL\n  AND mh.oldest_month_revenue IS NOT NULL\n  AND mh.oldest_month_revenue < mh.middle_month_revenue\n  AND mh.middle_month_revenue < mh.total_revenue\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- The failing version used `LAG()` while ordering months descending, which looks in the wrong direction for the latest row.\n- `LEAD()` is correct here because from the latest row, the next rows in descending order are the previous recorded months.\n- This makes the logic line up with the passing pivot solution."
      }
    ]
  },
  {
    "code": "FOOD_087",
    "approaches": [
      {
        "approach_title": "All months",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_months AS ( SELECT u.id AS user_id, DATE_TRUNC('month', u.created_at) AS signup_month, COUNT(DISTINCT DATE_TRUNC('month', o.created_at)) AS active_months, DATE_TRUNC('month', MAX(o.created_at)) AS last_order_month FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, DATE_TRUNC('month', u.created_at) ), expected_months AS ( SELECT user_id, ((EXTRACT(YEAR FROM AGE(last_order_month, signup_month)) * 12) + EXTRACT(MONTH FROM AGE(last_order_month, signup_month)) + 1)::int AS expected_month_count, active_months FROM user_months ) SELECT u.id, u.full_name FROM users u JOIN expected_months em ON em.user_id = u.id WHERE em.active_months = em.expected_month_count ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nCount active months and compare that count to the number of calendar months from signup month through the latest order month.\n\n## Query\n\n```sql\nWITH user_months AS (\n  SELECT u.id AS user_id,\n         DATE_TRUNC('month', u.created_at) AS signup_month,\n         COUNT(DISTINCT DATE_TRUNC('month', o.created_at)) AS active_months,\n         DATE_TRUNC('month', MAX(o.created_at)) AS last_order_month\n  FROM users u\n  JOIN orders o ON o.user_id = u.id\n  GROUP BY u.id, DATE_TRUNC('month', u.created_at)\n), expected_months AS (\n  SELECT user_id,\n         ((EXTRACT(YEAR FROM AGE(last_order_month, signup_month)) * 12)\n          + EXTRACT(MONTH FROM AGE(last_order_month, signup_month)) + 1)::int AS expected_month_count,\n         active_months\n  FROM user_months\n)\nSELECT u.id, u.full_name\nFROM users u\nJOIN expected_months em ON em.user_id = u.id\nWHERE em.active_months = em.expected_month_count\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `active_months` counts the months in which the user placed at least one order.\n- `expected_month_count` is the full month span from signup to latest activity.\n- Equality means no month is missing."
      }
    ]
  },
  {
    "code": "FOOD_088",
    "approaches": [
      {
        "approach_title": "Coupon avg",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH coupon_avg_discount AS ( SELECT coupon_id, AVG(discount_amount) AS avg_discount FROM orders WHERE coupon_id IS NOT NULL GROUP BY coupon_id ) SELECT o.id, o.coupon_id, o.discount_amount FROM orders o JOIN coupon_avg_discount cad ON cad.coupon_id = o.coupon_id WHERE o.discount_amount > cad.avg_discount ORDER BY o.coupon_id ASC, o.id ASC;",
        "explanation": "## Approach\n\nOrders whose discount is above coupon average."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, coupon_id, discount_amount FROM ( SELECT o.id, o.coupon_id, o.discount_amount, AVG(o.discount_amount) OVER (PARTITION BY o.coupon_id) AS avg_discount FROM orders o WHERE o.coupon_id IS NOT NULL ) t WHERE discount_amount > avg_discount ORDER BY coupon_id ASC, id ASC;",
        "explanation": "## Approach\n\nUse window average by coupon."
      }
    ]
  },
  {
    "code": "FOOD_089",
    "approaches": [
      {
        "approach_title": "Direct filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM driver_assignments WHERE tip_earnings > delivery_earnings ORDER BY driver_id ASC, order_id ASC;",
        "explanation": "## Approach\n\nFilter driver assignments where tip earnings are greater than delivery earnings.\n\n## Query\n\n```sql\nSELECT driver_id,\n       order_id,\n       delivery_earnings,\n       tip_earnings\nFROM driver_assignments\nWHERE tip_earnings > delivery_earnings\nORDER BY driver_id ASC, order_id ASC;\n```\n\n## Explanation\n\n- `tip_earnings > delivery_earnings` keeps only assignments where tips were higher.\n- The selected columns match the required output exactly.\n- Results are sorted by `driver_id`, then `order_id`."
      },
      {
        "approach_title": "CTE filter",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH higher_tip_assignments AS ( SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM driver_assignments WHERE tip_earnings > delivery_earnings ) SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM higher_tip_assignments ORDER BY driver_id ASC, order_id ASC;",
        "explanation": "## Approach\n\nFirst isolate assignments where tips exceed delivery earnings in a CTE, then return them.\n\n## Query\n\n```sql\nWITH higher_tip_assignments AS (\n  SELECT driver_id,\n         order_id,\n         delivery_earnings,\n         tip_earnings\n  FROM driver_assignments\n  WHERE tip_earnings > delivery_earnings\n)\nSELECT driver_id,\n       order_id,\n       delivery_earnings,\n       tip_earnings\nFROM higher_tip_assignments\nORDER BY driver_id ASC, order_id ASC;\n```\n\n## Explanation\n\n- The CTE stores only qualifying assignments.\n- The outer query simply returns the required columns in the correct order."
      }
    ]
  },
  {
    "code": "FOOD_090",
    "approaches": [
      {
        "approach_title": "Review vs rest",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_restaurants AS ( SELECT user_id, COUNT(DISTINCT restaurant_id) AS restaurant_count FROM orders GROUP BY user_id ), user_reviews AS ( SELECT user_id, COUNT(*) AS review_count FROM reviews GROUP BY user_id ) SELECT u.id, u.full_name, urv.review_count, uro.restaurant_count FROM users u JOIN user_reviews urv ON urv.user_id = u.id JOIN user_restaurants uro ON uro.user_id = u.id WHERE urv.review_count > uro.restaurant_count ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUsers whose review count exceeds distinct restaurants ordered from."
      },
      {
        "approach_title": "Inline joins",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name, ur.review_count, uo.restaurant_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS review_count FROM reviews GROUP BY user_id ) ur ON ur.user_id = u.id JOIN ( SELECT user_id, COUNT(DISTINCT restaurant_id) AS restaurant_count FROM orders GROUP BY user_id ) uo ON uo.user_id = u.id WHERE ur.review_count > uo.restaurant_count ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nSame logic using inline grouped joins."
      }
    ]
  },
  {
    "code": "FOOD_091",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH driver_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, ROW_NUMBER() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS rn FROM driver_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE rn <= 3 ORDER BY city ASC, completed_deliveries DESC, id ASC;",
        "explanation": "## Approach\n\nCount delivered assignments per driver in each city, rank drivers within each city, and keep the top 3.\n\n## Query\n\n```sql\nWITH driver_deliveries AS (\n  SELECT r.city,\n         d.id,\n         d.full_name,\n         COUNT(*) AS completed_deliveries\n  FROM drivers d\n  JOIN driver_assignments da ON da.driver_id = d.id\n  JOIN orders o ON o.id = da.order_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE da.status = 'delivered'\n  GROUP BY r.city, d.id, d.full_name\n), ranked_drivers AS (\n  SELECT city,\n         id,\n         full_name,\n         completed_deliveries,\n         ROW_NUMBER() OVER (\n           PARTITION BY city\n           ORDER BY completed_deliveries DESC, id ASC\n         ) AS rn\n  FROM driver_deliveries\n)\nSELECT city, id, full_name, completed_deliveries\nFROM ranked_drivers\nWHERE rn <= 3\nORDER BY city ASC, completed_deliveries DESC, id ASC;\n```\n\n## Explanation\n\n- `restaurants` provides the city.\n- `driver_assignments` provides which driver handled which order.\n- Only delivered assignments are counted.\n- `ROW_NUMBER()` ranks drivers inside each city.\n- `rn <= 3` keeps exactly 3 rows per city."
      },
      {
        "approach_title": "DENSE_RANK",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, DENSE_RANK() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS city_rank FROM driver_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE city_rank <= 3 ORDER BY city ASC, completed_deliveries DESC, id ASC;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` to rank drivers by completed deliveries within each city and keep the first 3 ranks.\n\n## Query\n\n```sql\nWITH driver_deliveries AS (\n  SELECT r.city,\n         d.id,\n         d.full_name,\n         COUNT(*) AS completed_deliveries\n  FROM drivers d\n  JOIN driver_assignments da ON da.driver_id = d.id\n  JOIN orders o ON o.id = da.order_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE da.status = 'delivered'\n  GROUP BY r.city, d.id, d.full_name\n), ranked_drivers AS (\n  SELECT city,\n         id,\n         full_name,\n         completed_deliveries,\n         DENSE_RANK() OVER (\n           PARTITION BY city\n           ORDER BY completed_deliveries DESC, id ASC\n         ) AS city_rank\n  FROM driver_deliveries\n)\nSELECT city, id, full_name, completed_deliveries\nFROM ranked_drivers\nWHERE city_rank <= 3\nORDER BY city ASC, completed_deliveries DESC, id ASC;\n```\n\n## Explanation\n\n- This uses the same correct join path to derive city.\n- `DENSE_RANK()` assigns ranks within each city.\n- Keeping `city_rank <= 3` returns the top-ranked rows per city."
      }
    ]
  },
  {
    "code": "FOOD_092",
    "approaches": [
      {
        "approach_title": "Weekend only",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE EXTRACT(ISODOW FROM o.created_at) IN (6, 7)) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nKeep users whose all orders were placed on weekends."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM orders o WHERE o.user_id = u.id ) AND NOT EXISTS ( SELECT 1 FROM orders o WHERE o.user_id = u.id AND EXTRACT(ISODOW FROM o.created_at) BETWEEN 1 AND 5 ) ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nEnsure no weekday order exists."
      }
    ]
  },
  {
    "code": "FOOD_093",
    "approaches": [
      {
        "approach_title": "Best day city",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH daily_restaurant_revenue AS ( SELECT r.city, r.id, r.name, DATE(o.created_at) AS order_date, SUM(o.total_amount) AS daily_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name, DATE(o.created_at) ), ranked_revenue AS ( SELECT city, id, name, order_date, daily_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY daily_revenue DESC, order_date ASC, id ASC) AS rn FROM daily_restaurant_revenue ) SELECT city, id, name, order_date, daily_revenue FROM ranked_revenue WHERE rn = 1 ORDER BY city ASC, id ASC;",
        "explanation": "## Approach\n\nFind highest single-day revenue restaurant per city."
      },
      {
        "approach_title": "Dense rank",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH daily_restaurant_revenue AS ( SELECT r.city, r.id, r.name, DATE(o.created_at) AS order_date, SUM(o.total_amount) AS daily_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name, DATE(o.created_at) ), ranked_revenue AS ( SELECT city, id, name, order_date, daily_revenue, DENSE_RANK() OVER (PARTITION BY city ORDER BY daily_revenue DESC) AS revenue_rank FROM daily_restaurant_revenue ) SELECT city, id, name, order_date, daily_revenue FROM ranked_revenue WHERE revenue_rank = 1 ORDER BY city ASC, id ASC;",
        "explanation": "## Approach\n\nReturns all ties for highest daily revenue."
      }
    ]
  },
  {
    "code": "FOOD_094",
    "approaches": [
      {
        "approach_title": "City avg",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH driver_city_wait AS ( SELECT r.city, d.id, d.full_name, AVG(da.wait_time_minutes) AS avg_wait_time FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.wait_time_minutes IS NOT NULL GROUP BY r.city, d.id, d.full_name ), city_wait_avg AS ( SELECT city, AVG(avg_wait_time) AS city_avg_wait_time FROM driver_city_wait GROUP BY city ) SELECT dcw.city, dcw.id, dcw.full_name, dcw.avg_wait_time FROM driver_city_wait dcw JOIN city_wait_avg cwa ON cwa.city = dcw.city WHERE dcw.avg_wait_time > cwa.city_avg_wait_time ORDER BY dcw.city ASC, dcw.id ASC;",
        "explanation": "## Approach\n\nCompute each driver's average wait time within each city, compute the average of those driver averages for the city, then keep drivers above their city average.\n\n## Query\n\n```sql\nWITH driver_city_wait AS (\n  SELECT r.city,\n         d.id,\n         d.full_name,\n         AVG(da.wait_time_minutes) AS avg_wait_time\n  FROM drivers d\n  JOIN driver_assignments da ON da.driver_id = d.id\n  JOIN orders o ON o.id = da.order_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE da.wait_time_minutes IS NOT NULL\n  GROUP BY r.city, d.id, d.full_name\n), city_wait_avg AS (\n  SELECT city,\n         AVG(avg_wait_time) AS city_avg_wait_time\n  FROM driver_city_wait\n  GROUP BY city\n)\nSELECT dcw.city,\n       dcw.id,\n       dcw.full_name,\n       dcw.avg_wait_time\nFROM driver_city_wait dcw\nJOIN city_wait_avg cwa ON cwa.city = dcw.city\nWHERE dcw.avg_wait_time > cwa.city_avg_wait_time\nORDER BY dcw.city ASC, dcw.id ASC;\n```\n\n## Explanation\n\n- `driver_city_wait` creates one row per driver per city.\n- `city_wait_avg` computes the city-wide average of driver wait times.\n- The final query keeps only drivers above that city average.\n- Output matches the required columns: `city`, `id`, `full_name`, `avg_wait_time`."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH driver_city_wait AS ( SELECT r.city, d.id, d.full_name, AVG(da.wait_time_minutes) AS avg_wait_time FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.wait_time_minutes IS NOT NULL GROUP BY r.city, d.id, d.full_name ) SELECT city, id, full_name, avg_wait_time FROM ( SELECT city, id, full_name, avg_wait_time, AVG(avg_wait_time) OVER (PARTITION BY city) AS city_avg_wait_time FROM driver_city_wait ) t WHERE avg_wait_time > city_avg_wait_time ORDER BY city ASC, id ASC;",
        "explanation": "## Approach\n\nCompute each driver's average wait time per city, attach the city average with a window function, then filter rows above that average.\n\n## Query\n\n```sql\nWITH driver_city_wait AS (\n  SELECT r.city,\n         d.id,\n         d.full_name,\n         AVG(da.wait_time_minutes) AS avg_wait_time\n  FROM drivers d\n  JOIN driver_assignments da ON da.driver_id = d.id\n  JOIN orders o ON o.id = da.order_id\n  JOIN restaurants r ON r.id = o.restaurant_id\n  WHERE da.wait_time_minutes IS NOT NULL\n  GROUP BY r.city, d.id, d.full_name\n)\nSELECT city, id, full_name, avg_wait_time\nFROM (\n  SELECT city,\n         id,\n         full_name,\n         avg_wait_time,\n         AVG(avg_wait_time) OVER (PARTITION BY city) AS city_avg_wait_time\n  FROM driver_city_wait\n) t\nWHERE avg_wait_time > city_avg_wait_time\nORDER BY city ASC, id ASC;\n```\n\n## Explanation\n\n- The inner query adds the city average to every driver row.\n- The outer query keeps only drivers above that benchmark."
      }
    ]
  },
  {
    "code": "FOOD_095",
    "approaches": [
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT r.id, r.name FROM restaurants r WHERE EXISTS ( SELECT 1 FROM menu_items mi WHERE mi.restaurant_id = r.id ) AND NOT EXISTS ( SELECT 1 FROM menu_items mi JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id WHERE mi.restaurant_id = r.id AND l.was_available = false ) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nKeep restaurants that have menu items and for which no menu item availability log ever marked an item unavailable.\n\n## Query\n\n```sql\nSELECT r.id, r.name\nFROM restaurants r\nWHERE EXISTS (\n  SELECT 1\n  FROM menu_items mi\n  WHERE mi.restaurant_id = r.id\n)\nAND NOT EXISTS (\n  SELECT 1\n  FROM menu_items mi\n  JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id\n  WHERE mi.restaurant_id = r.id\n    AND l.was_available = false\n)\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` ensures the restaurant actually has menu items.\n- The `NOT EXISTS` ensures none of those items ever had an unavailable log.\n- That means every menu item has never gone out of stock."
      },
      {
        "approach_title": "Left anti",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH stockout_restaurants AS ( SELECT DISTINCT mi.restaurant_id FROM menu_items mi JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id WHERE l.was_available = false ), restaurants_with_items AS ( SELECT DISTINCT restaurant_id FROM menu_items ) SELECT r.id, r.name FROM restaurants r JOIN restaurants_with_items ri ON ri.restaurant_id = r.id LEFT JOIN stockout_restaurants sr ON sr.restaurant_id = r.id WHERE sr.restaurant_id IS NULL ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nFirst identify restaurants that ever had a stockout, then anti-join them away from the set of restaurants that have menu items.\n\n## Query\n\n```sql\nWITH stockout_restaurants AS (\n  SELECT DISTINCT mi.restaurant_id\n  FROM menu_items mi\n  JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id\n  WHERE l.was_available = false\n), restaurants_with_items AS (\n  SELECT DISTINCT restaurant_id\n  FROM menu_items\n)\nSELECT r.id, r.name\nFROM restaurants r\nJOIN restaurants_with_items ri ON ri.restaurant_id = r.id\nLEFT JOIN stockout_restaurants sr ON sr.restaurant_id = r.id\nWHERE sr.restaurant_id IS NULL\nORDER BY r.id ASC;\n```\n\n## Explanation\n\n- `stockout_restaurants` captures restaurants with at least one unavailable item log.\n- `restaurants_with_items` excludes restaurants with no menu items.\n- The left anti-join keeps only restaurants that never appear in the stockout set."
      }
    ]
  },
  {
    "code": "FOOD_096",
    "approaches": [
      {
        "approach_title": "Prev max",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_spend AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS spend_month, SUM(total_amount) AS total_spent FROM orders WHERE order_status = 'delivered' GROUP BY user_id, DATE_TRUNC('month', created_at) ), spend_history AS ( SELECT user_id, spend_month, total_spent, MAX(total_spent) OVER (PARTITION BY user_id ORDER BY spend_month ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS previous_best_spend FROM monthly_spend ) SELECT u.id, u.full_name, sh.spend_month, sh.total_spent FROM users u JOIN spend_history sh ON sh.user_id = u.id WHERE sh.previous_best_spend IS NOT NULL AND sh.total_spent > sh.previous_best_spend ORDER BY sh.spend_month ASC, u.id ASC;",
        "explanation": "## Approach\n\nSummarize delivered spend by user and month, then compare each month against the best previous month using a running maximum.\n\n## Query\n\n```sql\nWITH monthly_spend AS (\n  SELECT user_id,\n         DATE_TRUNC('month', created_at) AS spend_month,\n         SUM(total_amount) AS total_spent\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY user_id, DATE_TRUNC('month', created_at)\n), spend_history AS (\n  SELECT user_id,\n         spend_month,\n         total_spent,\n         MAX(total_spent) OVER (\n           PARTITION BY user_id\n           ORDER BY spend_month\n           ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING\n         ) AS previous_best_spend\n  FROM monthly_spend\n)\nSELECT u.id,\n       u.full_name,\n       sh.spend_month,\n       sh.total_spent\nFROM users u\nJOIN spend_history sh ON sh.user_id = u.id\nWHERE sh.previous_best_spend IS NOT NULL\n  AND sh.total_spent > sh.previous_best_spend\nORDER BY sh.spend_month ASC, u.id ASC;\n```\n\n## Explanation\n\n- `monthly_spend` creates one row per user per month.\n- The window `MAX` keeps track of the highest earlier monthly spend for that user.\n- The final query keeps months where the current spend beats all previous months.\n\n## Why this is optimal\n\nIt matches the question exactly and avoids repeated correlated lookups."
      },
      {
        "approach_title": "Max join",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_spend AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS spend_month, SUM(total_amount) AS total_spent FROM orders WHERE order_status = 'delivered' GROUP BY user_id, DATE_TRUNC('month', created_at) ), ordered_months AS ( SELECT user_id, spend_month, total_spent, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY spend_month) AS rn FROM monthly_spend ), previous_best AS ( SELECT curr.user_id, curr.spend_month, MAX(prev.total_spent) AS previous_best_spend FROM ordered_months curr JOIN ordered_months prev ON prev.user_id = curr.user_id AND prev.rn < curr.rn GROUP BY curr.user_id, curr.spend_month ) SELECT u.id, u.full_name, om.spend_month, om.total_spent FROM ordered_months om JOIN previous_best pb ON pb.user_id = om.user_id AND pb.spend_month = om.spend_month JOIN users u ON u.id = om.user_id WHERE om.total_spent > pb.previous_best_spend ORDER BY om.spend_month ASC, u.id ASC;",
        "explanation": "## Approach\n\nBuild monthly spend rows, assign month order per user, compute the best spend among earlier months with a self-join, then keep months that beat that earlier maximum.\n\n## Query\n\n```sql\nWITH monthly_spend AS (\n  SELECT user_id,\n         DATE_TRUNC('month', created_at) AS spend_month,\n         SUM(total_amount) AS total_spent\n  FROM orders\n  WHERE order_status = 'delivered'\n  GROUP BY user_id, DATE_TRUNC('month', created_at)\n), ordered_months AS (\n  SELECT user_id,\n         spend_month,\n         total_spent,\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id\n           ORDER BY spend_month\n         ) AS rn\n  FROM monthly_spend\n), previous_best AS (\n  SELECT curr.user_id,\n         curr.spend_month,\n         MAX(prev.total_spent) AS previous_best_spend\n  FROM ordered_months curr\n  JOIN ordered_months prev\n    ON prev.user_id = curr.user_id\n   AND prev.rn < curr.rn\n  GROUP BY curr.user_id, curr.spend_month\n)\nSELECT u.id,\n       u.full_name,\n       om.spend_month,\n       om.total_spent\nFROM ordered_months om\nJOIN previous_best pb\n  ON pb.user_id = om.user_id\n AND pb.spend_month = om.spend_month\nJOIN users u ON u.id = om.user_id\nWHERE om.total_spent > pb.previous_best_spend\nORDER BY om.spend_month ASC, u.id ASC;\n```\n\n## Explanation\n\n- The failing correlated version timed out because it repeatedly rescanned prior months.\n- This version computes earlier-month maximums with joins and grouping instead of a per-row correlated subquery.\n- It returns the same result shape as the optimal solution."
      }
    ]
  },
  {
    "code": "FOOD_097",
    "approaches": [
      {
        "approach_title": "All categories",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH restaurant_categories AS ( SELECT restaurant_id, COUNT(DISTINCT category) AS total_categories FROM menu_items GROUP BY restaurant_id ), ordered_categories AS ( SELECT mi.restaurant_id, COUNT(DISTINCT mi.category) AS ordered_categories FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id ) SELECT r.id, r.name FROM restaurants r JOIN restaurant_categories rc ON rc.restaurant_id = r.id JOIN ordered_categories oc ON oc.restaurant_id = r.id WHERE rc.total_categories = oc.ordered_categories ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nRestaurants where every menu category has at least one order."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT r.id, r.name FROM restaurants r WHERE NOT EXISTS ( SELECT 1 FROM menu_items mi WHERE mi.restaurant_id = r.id AND NOT EXISTS ( SELECT 1 FROM menu_items mi2 JOIN order_items oi ON oi.menu_item_id = mi2.id WHERE mi2.restaurant_id = r.id AND mi2.category = mi.category ) ) ORDER BY r.id ASC;",
        "explanation": "## Approach\n\nAnti-join based category coverage."
      }
    ]
  },
  {
    "code": "FOOD_098",
    "approaches": [
      {
        "approach_title": "Count compare",
        "approach_type": "cte",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_order_counts AS ( SELECT user_id, COUNT(*) AS order_count FROM orders GROUP BY user_id ), user_ticket_counts AS ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY user_id ) SELECT u.id, u.full_name, utc.ticket_count, uoc.order_count FROM users u JOIN user_ticket_counts utc ON utc.user_id = u.id JOIN user_order_counts uoc ON uoc.user_id = u.id WHERE utc.ticket_count > uoc.order_count ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nCount orders per user, count support tickets per user, then keep users whose ticket count is greater than their order count.\n\n## Query\n\n```sql\nWITH user_order_counts AS (\n  SELECT user_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY user_id\n), user_ticket_counts AS (\n  SELECT user_id, COUNT(*) AS ticket_count\n  FROM support_tickets\n  GROUP BY user_id\n)\nSELECT u.id,\n       u.full_name,\n       utc.ticket_count,\n       uoc.order_count\nFROM users u\nJOIN user_ticket_counts utc ON utc.user_id = u.id\nJOIN user_order_counts uoc ON uoc.user_id = u.id\nWHERE utc.ticket_count > uoc.order_count\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- `user_order_counts` gives total orders per user.\n- `user_ticket_counts` gives total support tickets per user.\n- The final query compares the two counts and returns users where tickets are greater.\n\n## Why this is optimal\n\nIt directly models the comparison with one grouped count per table."
      },
      {
        "approach_title": "Inline counts",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id, u.full_name, utc.ticket_count, uoc.order_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY user_id ) utc ON utc.user_id = u.id JOIN ( SELECT user_id, COUNT(*) AS order_count FROM orders GROUP BY user_id ) uoc ON uoc.user_id = u.id WHERE utc.ticket_count > uoc.order_count ORDER BY u.id ASC;",
        "explanation": "## Approach\n\nUse inline grouped subqueries instead of named CTEs.\n\n## Query\n\n```sql\nSELECT u.id,\n       u.full_name,\n       utc.ticket_count,\n       uoc.order_count\nFROM users u\nJOIN (\n  SELECT user_id, COUNT(*) AS ticket_count\n  FROM support_tickets\n  GROUP BY user_id\n) utc ON utc.user_id = u.id\nJOIN (\n  SELECT user_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY user_id\n) uoc ON uoc.user_id = u.id\nWHERE utc.ticket_count > uoc.order_count\nORDER BY u.id ASC;\n```\n\n## Explanation\n\n- The logic is the same as the CTE version.\n- Each inline subquery produces one count row per user.\n- The outer query compares those counts."
      }
    ]
  },
  {
    "code": "FOOD_099",
    "approaches": [
      {
        "approach_title": "Running max",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH user_tip_history AS ( SELECT user_id, id, created_at, tip_amount, MAX(tip_amount) OVER (PARTITION BY user_id ORDER BY created_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS previous_best_tip FROM orders ) SELECT u.id AS user_id, u.full_name, uth.id AS order_id, uth.tip_amount FROM users u JOIN user_tip_history uth ON uth.user_id = u.id WHERE uth.previous_best_tip IS NOT NULL AND uth.tip_amount > uth.previous_best_tip ORDER BY u.id ASC, uth.id ASC;",
        "explanation": "## Approach\n\nTrack the best previous tip for each user's order history, then keep orders whose tip is higher than all earlier tips.\n\n## Query\n\n```sql\nWITH user_tip_history AS (\n  SELECT user_id,\n         id,\n         created_at,\n         tip_amount,\n         MAX(tip_amount) OVER (\n           PARTITION BY user_id\n           ORDER BY created_at, id\n           ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING\n         ) AS previous_best_tip\n  FROM orders\n)\nSELECT u.id AS user_id,\n       u.full_name,\n       uth.id AS order_id,\n       uth.tip_amount\nFROM users u\nJOIN user_tip_history uth ON uth.user_id = u.id\nWHERE uth.previous_best_tip IS NOT NULL\n  AND uth.tip_amount > uth.previous_best_tip\nORDER BY u.id ASC, uth.id ASC;\n```\n\n## Explanation\n\n- The window `MAX` keeps track of the highest earlier tip for each user.\n- The current row is excluded by `1 PRECEDING`.\n- Orders whose tip beats that previous maximum are returned.\n\n## Why this is optimal\n\nIt directly expresses “greater than every previous tip.”"
      },
      {
        "approach_title": "Correlated max",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT u.id AS user_id, u.full_name, o.id AS order_id, o.tip_amount FROM users u JOIN orders o ON o.user_id = u.id WHERE o.tip_amount > ( SELECT MAX(o2.tip_amount) FROM orders o2 WHERE o2.user_id = o.user_id AND (o2.created_at < o.created_at OR (o2.created_at = o.created_at AND o2.id < o.id)) ) ORDER BY u.id ASC, o.id ASC;",
        "explanation": "## Approach\n\nCompare each order's tip to the highest earlier tip for the same user using a correlated subquery.\n\n## Query\n\n```sql\nSELECT u.id AS user_id,\n       u.full_name,\n       o.id AS order_id,\n       o.tip_amount\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE o.tip_amount > (\n  SELECT MAX(o2.tip_amount)\n  FROM orders o2\n  WHERE o2.user_id = o.user_id\n    AND (\n      o2.created_at < o.created_at\n      OR (o2.created_at = o.created_at AND o2.id < o.id)\n    )\n)\nORDER BY u.id ASC, o.id ASC;\n```\n\n## Explanation\n\n- The failing version compared `o2.user_id = o.id`, which matched the wrong column.\n- This corrected version compares `o2.user_id = o.user_id`.\n- The subquery finds the highest earlier tip for the same user.\n- The current order is returned only if its tip is greater than that value."
      }
    ]
  },
  {
    "code": "FOOD_100",
    "approaches": [
      {
        "approach_title": "LEAD latest",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "WITH monthly_city_revenue AS ( SELECT r.city, DATE_TRUNC('month', o.created_at) AS revenue_month, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, DATE_TRUNC('month', o.created_at) ), ranked_months AS ( SELECT city, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue_month DESC) AS rn, LEAD(total_revenue, 1) OVER (PARTITION BY city ORDER BY revenue_month DESC) AS previous_month_revenue FROM monthly_city_revenue ) SELECT city, revenue_month AS latest_month, total_revenue AS latest_month_revenue, previous_month_revenue FROM ranked_months WHERE rn = 1 AND previous_month_revenue IS NOT NULL AND total_revenue < previous_month_revenue ORDER BY city ASC;",
        "explanation": "## Approach\n\nCompute monthly delivered revenue per city, identify the latest recorded month for each city, and compare it with the previous recorded month.\n\n## Query\n\n```sql\nWITH monthly_city_revenue AS (\n  SELECT r.city,\n         DATE_TRUNC('month', o.created_at) AS revenue_month,\n         SUM(o.total_amount) AS total_revenue\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city, DATE_TRUNC('month', o.created_at)\n), ranked_months AS (\n  SELECT city,\n         revenue_month,\n         total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY city\n           ORDER BY revenue_month DESC\n         ) AS rn,\n         LEAD(total_revenue, 1) OVER (\n           PARTITION BY city\n           ORDER BY revenue_month DESC\n         ) AS previous_month_revenue\n  FROM monthly_city_revenue\n)\nSELECT city,\n       revenue_month AS latest_month,\n       total_revenue AS latest_month_revenue,\n       previous_month_revenue\nFROM ranked_months\nWHERE rn = 1\n  AND previous_month_revenue IS NOT NULL\n  AND total_revenue < previous_month_revenue\nORDER BY city ASC;\n```\n\n## Explanation\n\n- `monthly_city_revenue` computes city revenue by month.\n- `ROW_NUMBER()` identifies the latest month row for each city.\n- `LEAD()` on descending months gives the previous recorded month revenue.\n- The final query keeps cities where the latest revenue is lower than the previous month's revenue.\n\n## Why this is optimal\n\nIt cleanly models “latest month declined versus previous recorded month.”"
      },
      {
        "approach_title": "Row join",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_city_revenue AS ( SELECT r.city, DATE_TRUNC('month', o.created_at) AS revenue_month, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, DATE_TRUNC('month', o.created_at) ), ordered_months AS ( SELECT city, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue_month DESC) AS rn FROM monthly_city_revenue ) SELECT curr.city, curr.revenue_month AS latest_month, curr.total_revenue AS latest_month_revenue, prev.total_revenue AS previous_month_revenue FROM ordered_months curr JOIN ordered_months prev ON prev.city = curr.city AND prev.rn = curr.rn + 1 WHERE curr.rn = 1 AND curr.total_revenue < prev.total_revenue ORDER BY curr.city ASC;",
        "explanation": "## Approach\n\nAssign a descending month sequence per city, then join the latest month row to the previous recorded month row.\n\n## Query\n\n```sql\nWITH monthly_city_revenue AS (\n  SELECT r.city,\n         DATE_TRUNC('month', o.created_at) AS revenue_month,\n         SUM(o.total_amount) AS total_revenue\n  FROM restaurants r\n  JOIN orders o ON o.restaurant_id = r.id\n  WHERE o.order_status = 'delivered'\n  GROUP BY r.city, DATE_TRUNC('month', o.created_at)\n), ordered_months AS (\n  SELECT city,\n         revenue_month,\n         total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY city\n           ORDER BY revenue_month DESC\n         ) AS rn\n  FROM monthly_city_revenue\n)\nSELECT curr.city,\n       curr.revenue_month AS latest_month,\n       curr.total_revenue AS latest_month_revenue,\n       prev.total_revenue AS previous_month_revenue\nFROM ordered_months curr\nJOIN ordered_months prev\n  ON prev.city = curr.city\n AND prev.rn = curr.rn + 1\nWHERE curr.rn = 1\n  AND curr.total_revenue < prev.total_revenue\nORDER BY curr.city ASC;\n```\n\n## Explanation\n\n- `ordered_months` numbers the months for each city from latest to oldest.\n- Joining `rn = 1` to `rn = 2` compares the latest month to the previous recorded month.\n- Cities with lower latest-month revenue are returned."
      }
    ]
  }
];
