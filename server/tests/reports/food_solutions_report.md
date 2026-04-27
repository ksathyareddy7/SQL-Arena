# Solutions Evaluation Report (food)

**Summary:**
- Total Approaches: 210
- Passed: 210
- Failed: 0

## Detailed Results
### ✅ PASS : FOOD_001 - COUNT(*)
```sql
SELECT COUNT(*) AS total_users FROM users;
```

### ✅ PASS : FOOD_001 - COUNT(id)
```sql
SELECT COUNT(id) AS total_users FROM users;
```

### ✅ PASS : FOOD_002 - WHERE true
```sql
SELECT COUNT(*) AS active_users FROM users WHERE is_active = true;
```

### ✅ PASS : FOOD_002 - WHERE col
```sql
SELECT COUNT(*) AS active_users FROM users WHERE is_active;
```

### ✅ PASS : FOOD_002 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_users FROM users;
```

### ✅ PASS : FOOD_003 - COUNT(*)
```sql
SELECT COUNT(*) AS total_restaurants FROM restaurants;
```

### ✅ PASS : FOOD_003 - COUNT(id)
```sql
SELECT COUNT(id) AS total_restaurants FROM restaurants;
```

### ✅ PASS : FOOD_004 - WHERE true
```sql
SELECT COUNT(*) AS active_restaurants FROM restaurants WHERE is_active = true;
```

### ✅ PASS : FOOD_004 - WHERE col
```sql
SELECT COUNT(*) AS active_restaurants FROM restaurants WHERE is_active;
```

### ✅ PASS : FOOD_004 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_restaurants FROM restaurants;
```

### ✅ PASS : FOOD_005 - COUNT(*)
```sql
SELECT COUNT(*) AS total_orders FROM orders;
```

### ✅ PASS : FOOD_005 - COUNT(id)
```sql
SELECT COUNT(id) AS total_orders FROM orders;
```

### ✅ PASS : FOOD_006 - WHERE delivered
```sql
SELECT COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_006 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE order_status = 'delivered') AS delivered_orders FROM orders;
```

### ✅ PASS : FOOD_006 - CASE SUM
```sql
SELECT SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders FROM orders;
```

### ✅ PASS : FOOD_007 - WHERE cancelled
```sql
SELECT COUNT(*) AS cancelled_orders FROM orders WHERE order_status = 'cancelled';
```

### ✅ PASS : FOOD_007 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE order_status = 'cancelled') AS cancelled_orders FROM orders;
```

### ✅ PASS : FOOD_007 - CASE SUM
```sql
SELECT SUM(CASE WHEN order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders FROM orders;
```

### ✅ PASS : FOOD_008 - AVG
```sql
SELECT AVG(total_amount) AS average_order_value FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_008 - SUM/COUNT
```sql
SELECT SUM(total_amount) / COUNT(*) AS average_order_value FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_009 - COUNT(*)
```sql
SELECT COUNT(*) AS total_drivers FROM drivers;
```

### ✅ PASS : FOOD_009 - COUNT(id)
```sql
SELECT COUNT(id) AS total_drivers FROM drivers;
```

### ✅ PASS : FOOD_010 - WHERE true
```sql
SELECT COUNT(*) AS active_drivers FROM drivers WHERE is_active = true;
```

### ✅ PASS : FOOD_010 - WHERE col
```sql
SELECT COUNT(*) AS active_drivers FROM drivers WHERE is_active;
```

### ✅ PASS : FOOD_010 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_drivers FROM drivers;
```

### ✅ PASS : FOOD_011 - COUNT(*)
```sql
SELECT COUNT(*) AS total_menu_items FROM menu_items;
```

### ✅ PASS : FOOD_011 - COUNT(id)
```sql
SELECT COUNT(id) AS total_menu_items FROM menu_items;
```

### ✅ PASS : FOOD_012 - WHERE true
```sql
SELECT COUNT(*) AS available_menu_items FROM menu_items WHERE is_available = true;
```

### ✅ PASS : FOOD_012 - WHERE col
```sql
SELECT COUNT(*) AS available_menu_items FROM menu_items WHERE is_available;
```

### ✅ PASS : FOOD_012 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE is_available = true) AS available_menu_items FROM menu_items;
```

### ✅ PASS : FOOD_013 - COUNT(*)
```sql
SELECT COUNT(*) AS total_coupons FROM coupons;
```

### ✅ PASS : FOOD_013 - COUNT(id)
```sql
SELECT COUNT(id) AS total_coupons FROM coupons;
```

### ✅ PASS : FOOD_014 - WHERE true
```sql
SELECT COUNT(*) AS active_coupons FROM coupons WHERE is_active = true;
```

### ✅ PASS : FOOD_014 - WHERE col
```sql
SELECT COUNT(*) AS active_coupons FROM coupons WHERE is_active;
```

### ✅ PASS : FOOD_014 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE is_active = true) AS active_coupons FROM coupons;
```

### ✅ PASS : FOOD_015 - IS NOT NULL
```sql
SELECT COUNT(*) AS coupon_orders FROM orders WHERE coupon_id IS NOT NULL;
```

### ✅ PASS : FOOD_015 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE coupon_id IS NOT NULL) AS coupon_orders FROM orders;
```

### ✅ PASS : FOOD_015 - CASE SUM
```sql
SELECT SUM(CASE WHEN coupon_id IS NOT NULL THEN 1 ELSE 0 END) AS coupon_orders FROM orders;
```

### ✅ PASS : FOOD_016 - COUNT(*)
```sql
SELECT COUNT(*) AS total_reviews FROM reviews;
```

### ✅ PASS : FOOD_016 - COUNT(id)
```sql
SELECT COUNT(id) AS total_reviews FROM reviews;
```

### ✅ PASS : FOOD_017 - AVG
```sql
SELECT AVG(rating) AS average_rating FROM reviews;
```

### ✅ PASS : FOOD_017 - SUM/COUNT
```sql
SELECT SUM(rating)::numeric / COUNT(*) AS average_rating FROM reviews;
```

### ✅ PASS : FOOD_018 - DATE = today
```sql
SELECT COUNT(*) AS orders_today FROM orders WHERE DATE(created_at) = CURRENT_DATE;
```

### ✅ PASS : FOOD_018 - Date range
```sql
SELECT COUNT(*) AS orders_today FROM orders WHERE created_at >= CURRENT_DATE AND created_at < CURRENT_DATE + INTERVAL '1 day';
```

### ✅ PASS : FOOD_019 - WHERE city
```sql
SELECT COUNT(*) AS users_in_hyderabad FROM users WHERE default_city = 'Hyderabad';
```

### ✅ PASS : FOOD_019 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE default_city = 'Hyderabad') AS users_in_hyderabad FROM users;
```

### ✅ PASS : FOOD_020 - WHERE city
```sql
SELECT COUNT(*) AS restaurants_in_hyderabad FROM restaurants WHERE city = 'Hyderabad';
```

### ✅ PASS : FOOD_020 - FILTER
```sql
SELECT COUNT(*) FILTER (WHERE city = 'Hyderabad') AS restaurants_in_hyderabad FROM restaurants;
```

### ✅ PASS : FOOD_021 - GROUP BY
```sql
SELECT restaurant_id, COUNT(*) AS total_orders FROM orders GROUP BY restaurant_id ORDER BY total_orders DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_021 - COUNT(id)
```sql
SELECT restaurant_id, COUNT(id) AS total_orders FROM orders GROUP BY restaurant_id ORDER BY total_orders DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_022 - WHERE delivered
```sql
SELECT user_id, COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered' GROUP BY user_id ORDER BY delivered_orders DESC, user_id ASC;
```

### ✅ PASS : FOOD_022 - FILTER + HAVING
```sql
SELECT user_id, COUNT(*) FILTER (WHERE order_status = 'delivered') AS delivered_orders FROM orders GROUP BY user_id HAVING COUNT(*) FILTER (WHERE order_status = 'delivered') > 0 ORDER BY delivered_orders DESC, user_id ASC;
```

### ✅ PASS : FOOD_022 - CASE + HAVING
```sql
SELECT user_id, SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders FROM orders GROUP BY user_id HAVING SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) > 0 ORDER BY delivered_orders DESC, user_id ASC;
```

### ✅ PASS : FOOD_023 - SUM revenue
```sql
SELECT restaurant_id, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_023 - FILTER SUM
```sql
SELECT restaurant_id, SUM(total_amount) FILTER (WHERE order_status = 'delivered') AS total_revenue FROM orders GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_023 - CASE SUM
```sql
SELECT restaurant_id, SUM(CASE WHEN order_status = 'delivered' THEN total_amount ELSE 0 END) AS total_revenue FROM orders GROUP BY restaurant_id ORDER BY total_revenue DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_024 - GROUP BY
```sql
SELECT restaurant_id, COUNT(*) AS menu_item_count FROM menu_items GROUP BY restaurant_id ORDER BY menu_item_count DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_024 - COUNT(id)
```sql
SELECT restaurant_id, COUNT(id) AS menu_item_count FROM menu_items GROUP BY restaurant_id ORDER BY menu_item_count DESC, restaurant_id ASC;
```

### ✅ PASS : FOOD_025 - COUNT DISTINCT
```sql
SELECT COUNT(DISTINCT user_id) AS ordering_users FROM orders;
```

### ✅ PASS : FOOD_025 - Distinct subquery
```sql
SELECT COUNT(*) AS ordering_users FROM (SELECT DISTINCT user_id FROM orders) t;
```

### ✅ PASS : FOOD_026 - AVG
```sql
SELECT AVG(delivery_fee) AS average_delivery_fee FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_026 - SUM/COUNT
```sql
SELECT SUM(delivery_fee) / COUNT(*) AS average_delivery_fee FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_027 - AVG
```sql
SELECT AVG(packaging_fee) AS average_packaging_fee FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_027 - SUM/COUNT
```sql
SELECT SUM(packaging_fee) / COUNT(*) AS average_packaging_fee FROM orders WHERE order_status = 'delivered';
```

### ✅ PASS : FOOD_028 - GROUP BY
```sql
SELECT cuisine, COUNT(*) AS restaurant_count FROM restaurants GROUP BY cuisine ORDER BY restaurant_count DESC, cuisine ASC;
```

### ✅ PASS : FOOD_028 - COUNT(id)
```sql
SELECT cuisine, COUNT(id) AS restaurant_count FROM restaurants GROUP BY cuisine ORDER BY restaurant_count DESC, cuisine ASC;
```

### ✅ PASS : FOOD_029 - ORDER LIMIT
```sql
SELECT id, total_amount FROM orders WHERE order_status = 'delivered' ORDER BY total_amount DESC, id ASC LIMIT 5;
```

### ✅ PASS : FOOD_029 - ROW_NUMBER
```sql
WITH ranked_orders AS (SELECT id, total_amount, ROW_NUMBER() OVER (ORDER BY total_amount DESC, id ASC) AS rn FROM orders WHERE order_status = 'delivered') SELECT id, total_amount FROM ranked_orders WHERE rn <= 5 ORDER BY total_amount DESC, id ASC;
```

### ✅ PASS : FOOD_030 - JOIN
```sql
SELECT o.id, p.payment_status FROM orders o JOIN payments p ON p.order_id = o.id ORDER BY o.id ASC;
```

### ✅ PASS : FOOD_030 - Reverse join
```sql
SELECT o.id, p.payment_status FROM payments p JOIN orders o ON o.id = p.order_id ORDER BY o.id ASC;
```

### ✅ PASS : FOOD_031 - LEFT JOIN
```sql
SELECT r.id, r.name, COUNT(o.id) AS total_orders FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY total_orders DESC, r.id ASC;
```

### ✅ PASS : FOOD_031 - Order counts CTE
```sql
WITH order_counts AS (SELECT restaurant_id, COUNT(*) AS total_orders FROM orders GROUP BY restaurant_id) SELECT r.id, r.name, COALESCE(oc.total_orders, 0) AS total_orders FROM restaurants r LEFT JOIN order_counts oc ON oc.restaurant_id = r.id ORDER BY total_orders DESC, r.id ASC;
```

### ✅ PASS : FOOD_032 - LEFT JOIN
```sql
SELECT u.id, u.full_name, COUNT(o.id) AS delivered_orders FROM users u LEFT JOIN orders o ON o.user_id = u.id AND o.order_status = 'delivered' GROUP BY u.id, u.full_name ORDER BY delivered_orders DESC, u.id ASC;
```

### ✅ PASS : FOOD_032 - Delivered CTE
```sql
WITH delivered_counts AS (SELECT user_id, COUNT(*) AS delivered_orders FROM orders WHERE order_status = 'delivered' GROUP BY user_id) SELECT u.id, u.full_name, COALESCE(dc.delivered_orders, 0) AS delivered_orders FROM users u LEFT JOIN delivered_counts dc ON dc.user_id = u.id ORDER BY delivered_orders DESC, u.id ASC;
```

### ✅ PASS : FOOD_033 - LEFT JOIN
```sql
SELECT r.id, r.name, COUNT(o.id) AS delivered_orders, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.id, r.name ORDER BY total_revenue DESC, r.id ASC;
```

### ✅ PASS : FOOD_033 - Revenue CTE
```sql
WITH delivered_stats AS (SELECT restaurant_id, COUNT(*) AS delivered_orders, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id) SELECT r.id, r.name, COALESCE(ds.delivered_orders, 0) AS delivered_orders, COALESCE(ds.total_revenue, 0) AS total_revenue FROM restaurants r LEFT JOIN delivered_stats ds ON ds.restaurant_id = r.id ORDER BY total_revenue DESC, r.id ASC;
```

### ✅ PASS : FOOD_034 - AVG
```sql
SELECT r.id, r.name, AVG(rv.rating) AS average_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY average_rating DESC, r.id ASC;
```

### ✅ PASS : FOOD_034 - SUM/COUNT
```sql
SELECT r.id, r.name, SUM(rv.rating)::numeric / COUNT(rv.id) AS average_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY average_rating DESC, r.id ASC;
```

### ✅ PASS : FOOD_035 - LEFT JOIN NULL
```sql
SELECT r.id, r.name FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id WHERE o.id IS NULL ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_035 - NOT EXISTS
```sql
SELECT r.id, r.name FROM restaurants r WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.restaurant_id = r.id) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_036 - LEFT JOIN NULL
```sql
SELECT u.id, u.full_name FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_036 - NOT EXISTS
```sql
SELECT u.id, u.full_name FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_037 - Direct join
```sql
SELECT o.id, d.full_name AS driver_name FROM orders o JOIN driver_assignments da ON da.order_id = o.id JOIN drivers d ON d.id = da.driver_id WHERE o.order_status = 'delivered' ORDER BY o.id ASC;
```

### ✅ PASS : FOOD_037 - Delivered CTE
```sql
WITH delivered_orders AS (SELECT id FROM orders WHERE order_status = 'delivered') SELECT dord.id, d.full_name AS driver_name FROM delivered_orders dord JOIN driver_assignments da ON da.order_id = dord.id JOIN drivers d ON d.id = da.driver_id ORDER BY dord.id ASC;
```

### ✅ PASS : FOOD_038 - LEFT JOIN
```sql
SELECT c.code, COUNT(o.id) AS usage_count FROM coupons c LEFT JOIN orders o ON o.coupon_id = c.id GROUP BY c.id, c.code ORDER BY usage_count DESC, c.code ASC;
```

### ✅ PASS : FOOD_038 - Usage CTE
```sql
WITH coupon_usage AS (SELECT coupon_id, COUNT(*) AS usage_count FROM orders WHERE coupon_id IS NOT NULL GROUP BY coupon_id) SELECT c.code, COALESCE(cu.usage_count, 0) AS usage_count FROM coupons c LEFT JOIN coupon_usage cu ON cu.coupon_id = c.id ORDER BY usage_count DESC, c.code ASC;
```

### ✅ PASS : FOOD_039 - LEFT JOIN
```sql
SELECT o.id, COUNT(oi.id) AS item_count FROM orders o LEFT JOIN order_items oi ON oi.order_id = o.id GROUP BY o.id ORDER BY o.id ASC;
```

### ✅ PASS : FOOD_039 - Counts CTE
```sql
WITH item_counts AS (SELECT order_id, COUNT(*) AS item_count FROM order_items GROUP BY order_id) SELECT o.id, COALESCE(ic.item_count, 0) AS item_count FROM orders o LEFT JOIN item_counts ic ON ic.order_id = o.id ORDER BY o.id ASC;
```

### ✅ PASS : FOOD_040 - JOIN SUM
```sql
SELECT r.city, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city ORDER BY total_revenue DESC, r.city ASC;
```

### ✅ PASS : FOOD_040 - Revenue CTE
```sql
WITH city_revenue AS (SELECT r.city, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city) SELECT city, total_revenue FROM city_revenue ORDER BY total_revenue DESC, city ASC;
```

### ✅ PASS : FOOD_041 - HAVING count
```sql
SELECT u.id, u.full_name, COUNT(ua.id) AS address_count FROM users u JOIN user_addresses ua ON ua.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(ua.id) > 1 ORDER BY address_count DESC, u.id ASC;
```

### ✅ PASS : FOOD_041 - Address CTE
```sql
WITH address_counts AS (SELECT user_id, COUNT(*) AS address_count FROM user_addresses GROUP BY user_id) SELECT u.id, u.full_name, ac.address_count FROM users u JOIN address_counts ac ON ac.user_id = u.id WHERE ac.address_count > 1 ORDER BY ac.address_count DESC, u.id ASC;
```

### ✅ PASS : FOOD_042 - WHERE > 30
```sql
SELECT id, name, avg_prep_time_minutes FROM restaurants WHERE avg_prep_time_minutes > 30 ORDER BY avg_prep_time_minutes DESC, id ASC;
```

### ✅ PASS : FOOD_042 - CTE filter
```sql
WITH slow_restaurants AS (SELECT id, name, avg_prep_time_minutes FROM restaurants WHERE avg_prep_time_minutes > 30) SELECT id, name, avg_prep_time_minutes FROM slow_restaurants ORDER BY avg_prep_time_minutes DESC, id ASC;
```

### ✅ PASS : FOOD_043 - GROUP LIMIT
```sql
SELECT r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.id, r.name ORDER BY total_revenue DESC, r.id ASC LIMIT 5;
```

### ✅ PASS : FOOD_043 - ROW_NUMBER
```sql
WITH restaurant_revenue AS (SELECT r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.id, r.name), ranked_restaurants AS (SELECT id, name, total_revenue, ROW_NUMBER() OVER (ORDER BY total_revenue DESC, id ASC) AS rn FROM restaurant_revenue) SELECT id, name, total_revenue FROM ranked_restaurants WHERE rn <= 5 ORDER BY total_revenue DESC, id ASC;
```

### ✅ PASS : FOOD_044 - GROUP LIMIT
```sql
SELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id WHERE o.order_status = 'delivered' GROUP BY u.id, u.full_name ORDER BY total_spent DESC, u.id ASC LIMIT 5;
```

### ✅ PASS : FOOD_044 - ROW_NUMBER
```sql
WITH user_spend AS (SELECT u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id WHERE o.order_status = 'delivered' GROUP BY u.id, u.full_name), ranked_users AS (SELECT id, full_name, total_spent, ROW_NUMBER() OVER (ORDER BY total_spent DESC, id ASC) AS rn FROM user_spend) SELECT id, full_name, total_spent FROM ranked_users WHERE rn <= 5 ORDER BY total_spent DESC, id ASC;
```

### ✅ PASS : FOOD_045 - DISTINCT JOIN
```sql
SELECT DISTINCT r.id, r.name FROM restaurants r JOIN orders o ON o.restaurant_id = r.id JOIN support_tickets st ON st.order_id = o.id ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_045 - EXISTS
```sql
SELECT r.id, r.name FROM restaurants r WHERE EXISTS (SELECT 1 FROM orders o JOIN support_tickets st ON st.order_id = o.id WHERE o.restaurant_id = r.id) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_046 - Delay calc
```sql
SELECT id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ORDER BY id ASC;
```

### ✅ PASS : FOOD_046 - Interval mins
```sql
SELECT id, EXTRACT(EPOCH FROM AGE(delivered_at, estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ORDER BY id ASC;
```

### ✅ PASS : FOOD_047 - LEFT JOIN
```sql
SELECT d.id, d.full_name, COUNT(da.id) AS completed_deliveries FROM drivers d LEFT JOIN driver_assignments da ON da.driver_id = d.id AND da.status = 'delivered' GROUP BY d.id, d.full_name ORDER BY completed_deliveries DESC, d.id ASC;
```

### ✅ PASS : FOOD_047 - Counts CTE
```sql
WITH delivery_counts AS (SELECT driver_id, COUNT(*) AS completed_deliveries FROM driver_assignments WHERE status = 'delivered' GROUP BY driver_id) SELECT d.id, d.full_name, COALESCE(dc.completed_deliveries, 0) AS completed_deliveries FROM drivers d LEFT JOIN delivery_counts dc ON dc.driver_id = d.id ORDER BY completed_deliveries DESC, d.id ASC;
```

### ✅ PASS : FOOD_048 - Direct filter
```sql
SELECT id, restaurant_id, name, inventory_count, reorder_level FROM menu_items WHERE inventory_count IS NOT NULL AND reorder_level IS NOT NULL AND inventory_count <= reorder_level ORDER BY restaurant_id ASC, id ASC;
```

### ✅ PASS : FOOD_048 - CTE filter
```sql
WITH low_stock_items AS (SELECT id, restaurant_id, name, inventory_count, reorder_level FROM menu_items WHERE inventory_count IS NOT NULL AND reorder_level IS NOT NULL AND inventory_count <= reorder_level) SELECT id, restaurant_id, name, inventory_count, reorder_level FROM low_stock_items ORDER BY restaurant_id ASC, id ASC;
```

### ✅ PASS : FOOD_049 - DISTINCT JOIN
```sql
SELECT DISTINCT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id JOIN payments p ON p.order_id = o.id WHERE p.payment_status = 'failed' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_049 - EXISTS
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS (SELECT 1 FROM orders o JOIN payments p ON p.order_id = o.id WHERE o.user_id = u.id AND p.payment_status = 'failed') ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_050 - JOIN AVG
```sql
SELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city ORDER BY average_delivery_fee DESC, r.city ASC;
```

### ✅ PASS : FOOD_050 - City CTE
```sql
WITH city_fees AS (SELECT r.city, AVG(o.delivery_fee) AS average_delivery_fee FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city) SELECT city, average_delivery_fee FROM city_fees ORDER BY average_delivery_fee DESC, city ASC;
```

### ✅ PASS : FOOD_051 - ROW_NUMBER
```sql
WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), ranked_restaurants AS ( SELECT city, id, name, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_revenue DESC, id ASC) AS rn FROM restaurant_revenue ), final_rows AS ( SELECT city, id, name, total_revenue FROM ranked_restaurants WHERE rn <= 3 ) SELECT city, id, name, total_revenue FROM final_rows ORDER BY 1 ASC, 4 DESC, 2 ASC;
```

### ✅ PASS : FOOD_051 - DENSE_RANK
```sql
WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), ranked_restaurants AS ( SELECT city, id, name, total_revenue, DENSE_RANK() OVER (PARTITION BY city ORDER BY total_revenue DESC, id ASC) AS rank_num FROM restaurant_revenue ), final_rows AS ( SELECT city, id, name, total_revenue FROM ranked_restaurants WHERE rank_num <= 3 ) SELECT city, id, name, total_revenue FROM final_rows ORDER BY 1 ASC, 4 DESC, 2 ASC;
```

### ✅ PASS : FOOD_052 - ROW_NUMBER
```sql
WITH ranked_orders AS ( SELECT o.user_id, o.order_status, o.created_at, o.id, ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.created_at DESC, o.id DESC) AS rn FROM orders o ) SELECT u.id, u.full_name FROM users u JOIN ranked_orders ro ON ro.user_id = u.id WHERE ro.rn = 1 AND ro.order_status = 'cancelled' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_052 - Latest time
```sql
WITH latest_orders AS ( SELECT user_id, MAX(created_at) AS latest_created_at FROM orders GROUP BY user_id ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id JOIN latest_orders lo ON lo.user_id = o.user_id AND lo.latest_created_at = o.created_at WHERE o.order_status = 'cancelled' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_053 - City avg
```sql
WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), city_avg AS ( SELECT city, AVG(total_revenue) AS avg_revenue FROM restaurant_revenue GROUP BY city ), final_rows AS ( SELECT rr.id, rr.name, rr.city, rr.total_revenue FROM restaurant_revenue rr JOIN city_avg ca ON ca.city = rr.city WHERE rr.total_revenue > ca.avg_revenue ) SELECT id, name, city, total_revenue FROM final_rows ORDER BY 3 ASC, 4 DESC, 1 ASC;
```

### ✅ PASS : FOOD_053 - Window avg
```sql
WITH restaurant_revenue AS ( SELECT r.city, r.id, r.name, COALESCE(SUM(o.total_amount), 0) AS total_revenue FROM restaurants r LEFT JOIN orders o ON o.restaurant_id = r.id AND o.order_status = 'delivered' GROUP BY r.city, r.id, r.name ), final_rows AS ( SELECT id, name, city, total_revenue FROM ( SELECT id, name, city, total_revenue, AVG(total_revenue) OVER (PARTITION BY city) AS city_avg FROM restaurant_revenue ) t WHERE total_revenue > city_avg ) SELECT id, name, city, total_revenue FROM final_rows ORDER BY 3 ASC, 4 DESC, 1 ASC;
```

### ✅ PASS : FOOD_054 - LAG
```sql
WITH user_order_days AS ( SELECT DISTINCT user_id, DATE(created_at) AS order_day FROM orders ), ranked_days AS ( SELECT user_id, order_day, LAG(order_day) OVER (PARTITION BY user_id ORDER BY order_day) AS previous_day FROM user_order_days ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ranked_days rd ON rd.user_id = u.id WHERE rd.previous_day = rd.order_day - INTERVAL '1 day' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_054 - Self join
```sql
WITH user_order_days AS ( SELECT DISTINCT user_id, DATE(created_at) AS order_day FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN user_order_days d1 ON d1.user_id = u.id JOIN user_order_days d2 ON d2.user_id = d1.user_id AND d2.order_day = d1.order_day + INTERVAL '1 day' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_055 - ROW_NUMBER
```sql
WITH item_totals AS ( SELECT mi.restaurant_id, mi.id AS menu_item_id, mi.name, SUM(oi.quantity) AS total_quantity FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id, mi.id, mi.name ), ranked_items AS ( SELECT restaurant_id, menu_item_id, name, total_quantity, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY total_quantity DESC, menu_item_id ASC) AS rn FROM item_totals ) SELECT restaurant_id, menu_item_id, name, total_quantity FROM ranked_items WHERE rn = 1 ORDER BY restaurant_id ASC;
```

### ✅ PASS : FOOD_055 - Max + min id
```sql
WITH item_totals AS ( SELECT mi.restaurant_id, mi.id AS menu_item_id, mi.name, SUM(oi.quantity) AS total_quantity FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id, mi.id, mi.name ), restaurant_max AS ( SELECT restaurant_id, MAX(total_quantity) AS max_quantity FROM item_totals GROUP BY restaurant_id ), tied_items AS ( SELECT it.restaurant_id, it.menu_item_id, it.name, it.total_quantity FROM item_totals it JOIN restaurant_max rm ON rm.restaurant_id = it.restaurant_id AND rm.max_quantity = it.total_quantity ), chosen_items AS ( SELECT restaurant_id, MIN(menu_item_id) AS menu_item_id FROM tied_items GROUP BY restaurant_id ) SELECT ti.restaurant_id, ti.menu_item_id, ti.name, ti.total_quantity FROM tied_items ti JOIN chosen_items ci ON ci.restaurant_id = ti.restaurant_id AND ci.menu_item_id = ti.menu_item_id ORDER BY ti.restaurant_id ASC;
```

### ✅ PASS : FOOD_056 - Count match
```sql
WITH user_city AS ( SELECT u.id AS user_id, u.full_name, MIN(r.city) AS user_city_name FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT r.city) = 1 ), city_cuisines AS ( SELECT r.city AS city_name, COUNT(DISTINCT r.cuisine) AS total_cuisines FROM restaurants r GROUP BY r.city ), user_cuisines AS ( SELECT uc.user_id, uc.full_name, uc.user_city_name, COUNT(DISTINCT r.cuisine) AS ordered_cuisines FROM user_city uc JOIN orders o ON o.user_id = uc.user_id JOIN restaurants r ON r.id = o.restaurant_id WHERE r.city = uc.user_city_name GROUP BY uc.user_id, uc.full_name, uc.user_city_name ) SELECT uc.user_id AS id, uc.full_name, uc.user_city_name AS city FROM user_cuisines uc JOIN city_cuisines cc ON cc.city_name = uc.user_city_name WHERE uc.ordered_cuisines = cc.total_cuisines ORDER BY id ASC;
```

### ✅ PASS : FOOD_056 - NOT EXISTS
```sql
WITH user_city AS ( SELECT u.id AS user_id, u.full_name, MIN(r.city) AS user_city_name FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT r.city) = 1 ), user_city_cuisines AS ( SELECT DISTINCT uc.user_id, uc.user_city_name, r.cuisine FROM user_city uc JOIN orders o ON o.user_id = uc.user_id JOIN restaurants r ON r.id = o.restaurant_id WHERE r.city = uc.user_city_name ) SELECT uc.user_id AS id, uc.full_name, uc.user_city_name AS city FROM user_city uc WHERE NOT EXISTS ( SELECT 1 FROM restaurants r WHERE r.city = uc.user_city_name AND NOT EXISTS ( SELECT 1 FROM user_city_cuisines ucc WHERE ucc.user_id = uc.user_id AND ucc.user_city_name = uc.user_city_name AND ucc.cuisine = r.cuisine ) ) ORDER BY id ASC;
```

### ✅ PASS : FOOD_057 - Running sum
```sql
SELECT restaurant_id, id, created_at, SUM(total_amount) OVER (PARTITION BY restaurant_id ORDER BY created_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_revenue FROM orders WHERE order_status = 'delivered' ORDER BY restaurant_id ASC, created_at ASC, id ASC;
```

### ✅ PASS : FOOD_057 - Correlated sum
```sql
SELECT o1.restaurant_id, o1.id, o1.created_at, ( SELECT SUM(o2.total_amount) FROM orders o2 WHERE o2.order_status = 'delivered' AND o2.restaurant_id = o1.restaurant_id AND (o2.created_at < o1.created_at OR (o2.created_at = o1.created_at AND o2.id <= o1.id)) ) AS running_revenue FROM orders o1 WHERE o1.order_status = 'delivered' ORDER BY o1.restaurant_id ASC, o1.created_at ASC, o1.id ASC;
```

### ✅ PASS : FOOD_058 - Global avg
```sql
WITH overall_avg AS ( SELECT AVG(delivery_fee) AS avg_delivery_fee FROM orders WHERE order_status = 'delivered' ), restaurant_avg AS ( SELECT restaurant_id, AVG(delivery_fee) AS avg_delivery_fee FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id ) SELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee FROM restaurant_avg ra JOIN restaurants r ON r.id = ra.restaurant_id CROSS JOIN overall_avg oa WHERE ra.avg_delivery_fee > oa.avg_delivery_fee ORDER BY average_delivery_fee DESC, r.id ASC;
```

### ✅ PASS : FOOD_058 - Order window
```sql
WITH delivered_orders AS ( SELECT restaurant_id, delivery_fee, AVG(delivery_fee) OVER () AS platform_avg_fee FROM orders WHERE order_status = 'delivered' ), restaurant_avg AS ( SELECT restaurant_id, AVG(delivery_fee) AS avg_delivery_fee, MAX(platform_avg_fee) AS platform_avg_fee FROM delivered_orders GROUP BY restaurant_id ) SELECT r.id, r.name, ra.avg_delivery_fee AS average_delivery_fee FROM restaurant_avg ra JOIN restaurants r ON r.id = ra.restaurant_id WHERE ra.avg_delivery_fee > ra.platform_avg_fee ORDER BY average_delivery_fee DESC, r.id ASC;
```

### ✅ PASS : FOOD_059 - FILTER HAVING
```sql
SELECT u.id, u.full_name, COUNT(*) FILTER (WHERE o.order_status = 'cancelled') AS cancelled_orders, COUNT(*) FILTER (WHERE o.order_status = 'delivered') AS delivered_orders FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) FILTER (WHERE o.order_status = 'cancelled') > COUNT(*) FILTER (WHERE o.order_status = 'delivered') ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_059 - CASE HAVING
```sql
SELECT u.id, u.full_name, SUM(CASE WHEN o.order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders, SUM(CASE WHEN o.order_status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING SUM(CASE WHEN o.order_status = 'cancelled' THEN 1 ELSE 0 END) > SUM(CASE WHEN o.order_status = 'delivered' THEN 1 ELSE 0 END) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_060 - Distinct count
```sql
SELECT d.id, d.full_name, DATE(da.delivered_at) AS delivery_date, COUNT(DISTINCT o.restaurant_id) AS restaurant_count FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL GROUP BY d.id, d.full_name, DATE(da.delivered_at) HAVING COUNT(DISTINCT o.restaurant_id) > 1 ORDER BY delivery_date ASC, d.id ASC;
```

### ✅ PASS : FOOD_060 - Restaurant-day CTE
```sql
WITH driver_restaurant_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_date, o.restaurant_id FROM driver_assignments da JOIN orders o ON o.id = da.order_id WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ) SELECT d.id, d.full_name, drd.delivery_date, COUNT(*) AS restaurant_count FROM drivers d JOIN driver_restaurant_days drd ON drd.driver_id = d.id GROUP BY d.id, d.full_name, drd.delivery_date HAVING COUNT(*) > 1 ORDER BY drd.delivery_date ASC, d.id ASC;
```

### ✅ PASS : FOOD_061 - ROW_NUMBER
```sql
WITH user_city_spend AS ( SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY r.city, u.id, u.full_name ), ranked_users AS ( SELECT city, id, full_name, total_spent, ROW_NUMBER() OVER (PARTITION BY city ORDER BY total_spent DESC, id ASC) AS rn FROM user_city_spend ) SELECT city, id, full_name, total_spent FROM ranked_users WHERE rn <= 2 ORDER BY city ASC, total_spent DESC, id ASC;
```

### ✅ PASS : FOOD_061 - DENSE_RANK
```sql
WITH user_city_spend AS ( SELECT r.city, u.id, u.full_name, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON o.user_id = u.id JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY r.city, u.id, u.full_name ), ranked_users AS ( SELECT city, id, full_name, total_spent, DENSE_RANK() OVER (PARTITION BY city ORDER BY total_spent DESC, id ASC) AS rank_num FROM user_city_spend ) SELECT city, id, full_name, total_spent FROM ranked_users WHERE rank_num <= 2 ORDER BY city ASC, total_spent DESC, id ASC;
```

### ✅ PASS : FOOD_062 - LEAD
```sql
WITH user_orders AS ( SELECT user_id, created_at, LEAD(created_at) OVER (PARTITION BY user_id ORDER BY created_at, id) AS next_order_at FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN user_orders uo ON uo.user_id = u.id WHERE uo.next_order_at IS NOT NULL AND uo.next_order_at >= uo.created_at + INTERVAL '30 days' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_062 - Row join
```sql
WITH ordered_orders AS ( SELECT user_id, created_at, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at, id) AS rn FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ordered_orders o1 ON o1.user_id = u.id JOIN ordered_orders o2 ON o2.user_id = o1.user_id AND o2.rn = o1.rn + 1 WHERE o2.created_at >= o1.created_at + INTERVAL '30 days' ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_063 - LAG
```sql
WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), revenue_with_prev AS ( SELECT restaurant_id, revenue_month, total_revenue, LAG(total_revenue) OVER (PARTITION BY restaurant_id ORDER BY revenue_month) AS prev_month_revenue FROM monthly_revenue ) SELECT r.id, r.name, revenue_month, total_revenue, prev_month_revenue FROM revenue_with_prev rwp JOIN restaurants r ON r.id = rwp.restaurant_id WHERE prev_month_revenue IS NOT NULL AND total_revenue > prev_month_revenue ORDER BY revenue_month ASC, r.id ASC;
```

### ✅ PASS : FOOD_063 - Row join
```sql
WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), ordered_months AS ( SELECT restaurant_id, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month) AS rn FROM monthly_revenue ) SELECT r.id, r.name, curr.revenue_month, curr.total_revenue, prev.total_revenue AS prev_month_revenue FROM ordered_months curr JOIN ordered_months prev ON prev.restaurant_id = curr.restaurant_id AND prev.rn = curr.rn - 1 JOIN restaurants r ON r.id = curr.restaurant_id WHERE curr.total_revenue > prev.total_revenue ORDER BY curr.revenue_month ASC, r.id ASC;
```

### ✅ PASS : FOOD_064 - FILTER
```sql
SELECT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE o.coupon_id IS NOT NULL) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_064 - NOT EXISTS
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id) AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.coupon_id IS NULL) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_065 - MAX = 5
```sql
SELECT r.id, r.name, MAX(rv.rating) AS highest_rating FROM restaurants r JOIN reviews rv ON rv.restaurant_id = r.id GROUP BY r.id, r.name HAVING MAX(rv.rating) = 5 ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_065 - Exists 5
```sql
SELECT r.id, r.name, 5 AS highest_rating FROM restaurants r WHERE EXISTS (SELECT 1 FROM reviews rv WHERE rv.restaurant_id = r.id AND rv.rating = 5) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_066 - Avg join
```sql
WITH user_avg AS ( SELECT user_id, AVG(total_amount) AS avg_order_value FROM orders WHERE order_status = 'delivered' GROUP BY user_id ) SELECT o.id, o.user_id, o.total_amount FROM orders o JOIN user_avg ua ON ua.user_id = o.user_id WHERE o.order_status = 'delivered' AND o.total_amount > ua.avg_order_value ORDER BY o.user_id ASC, o.id ASC;
```

### ✅ PASS : FOOD_066 - Window avg
```sql
SELECT id, user_id, total_amount FROM ( SELECT o.id, o.user_id, o.total_amount, AVG(o.total_amount) OVER (PARTITION BY o.user_id) AS avg_order_value FROM orders o WHERE o.order_status = 'delivered' ) t WHERE total_amount > avg_order_value ORDER BY user_id ASC, id ASC;
```

### ✅ PASS : FOOD_067 - LEFT JOIN
```sql
SELECT mi.id, mi.name, mi.restaurant_id FROM menu_items mi LEFT JOIN order_items oi ON oi.menu_item_id = mi.id WHERE oi.id IS NULL ORDER BY mi.id ASC;
```

### ✅ PASS : FOOD_067 - NOT EXISTS
```sql
SELECT mi.id, mi.name, mi.restaurant_id FROM menu_items mi WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.menu_item_id = mi.id) ORDER BY mi.id ASC;
```

### ✅ PASS : FOOD_068 - Ratio CTE
```sql
WITH user_restaurant_orders AS ( SELECT restaurant_id, user_id, COUNT(*) AS order_count FROM orders GROUP BY restaurant_id, user_id ), restaurant_customer_stats AS ( SELECT restaurant_id, COUNT(*) AS total_customers, COUNT(*) FILTER (WHERE order_count >= 2) AS repeat_customers FROM user_restaurant_orders GROUP BY restaurant_id ) SELECT r.id, r.name, (repeat_customers::numeric / NULLIF(total_customers, 0)) * 100 AS repeat_customer_percentage FROM restaurant_customer_stats rcs JOIN restaurants r ON r.id = rcs.restaurant_id WHERE (repeat_customers::numeric / NULLIF(total_customers, 0)) > 0.5 ORDER BY repeat_customer_percentage DESC, r.id ASC;
```

### ✅ PASS : FOOD_068 - CASE ratio
```sql
WITH user_restaurant_orders AS ( SELECT restaurant_id, user_id, COUNT(*) AS order_count FROM orders GROUP BY restaurant_id, user_id ) SELECT r.id, r.name, (SUM(CASE WHEN uro.order_count >= 2 THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100 AS repeat_customer_percentage FROM user_restaurant_orders uro JOIN restaurants r ON r.id = uro.restaurant_id GROUP BY r.id, r.name HAVING (SUM(CASE WHEN uro.order_count >= 2 THEN 1 ELSE 0 END)::numeric / COUNT(*)) > 0.5 ORDER BY repeat_customer_percentage DESC, r.id ASC;
```

### ✅ PASS : FOOD_069 - LAG 2
```sql
WITH ranked_orders AS ( SELECT user_id, restaurant_id, id, created_at, LAG(restaurant_id, 1) OVER (PARTITION BY user_id ORDER BY created_at, id) AS prev_restaurant_1, LAG(restaurant_id, 2) OVER (PARTITION BY user_id ORDER BY created_at, id) AS prev_restaurant_2 FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ranked_orders ro ON ro.user_id = u.id WHERE ro.prev_restaurant_1 = ro.restaurant_id AND ro.prev_restaurant_2 = ro.restaurant_id ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_069 - Self join
```sql
WITH ordered_orders AS ( SELECT user_id, restaurant_id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at, id) AS rn FROM orders ) SELECT DISTINCT u.id, u.full_name FROM users u JOIN ordered_orders o1 ON o1.user_id = u.id JOIN ordered_orders o2 ON o2.user_id = o1.user_id AND o2.rn = o1.rn + 1 JOIN ordered_orders o3 ON o3.user_id = o1.user_id AND o3.rn = o1.rn + 2 WHERE o1.restaurant_id = o2.restaurant_id AND o2.restaurant_id = o3.restaurant_id ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_070 - Rolling avg
```sql
WITH daily_revenue AS ( SELECT DATE(created_at) AS order_date, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY DATE(created_at) ) SELECT order_date, total_revenue, AVG(total_revenue) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7_day_avg_revenue FROM daily_revenue ORDER BY order_date ASC;
```

### ✅ PASS : FOOD_070 - Correlated avg
```sql
WITH daily_revenue AS ( SELECT DATE(created_at) AS order_date, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY DATE(created_at) ) SELECT d1.order_date, d1.total_revenue, ( SELECT AVG(d2.total_revenue) FROM daily_revenue d2 WHERE d2.order_date BETWEEN d1.order_date - INTERVAL '6 days' AND d1.order_date ) AS rolling_7_day_avg_revenue FROM daily_revenue d1 ORDER BY d1.order_date ASC;
```

### ✅ PASS : FOOD_071 - ROW_NUMBER
```sql
WITH user_restaurant_spend AS ( SELECT o.restaurant_id, o.user_id, SUM(o.total_amount) AS total_spent FROM orders o WHERE o.order_status = 'delivered' GROUP BY o.restaurant_id, o.user_id ), ranked_spend AS ( SELECT restaurant_id, user_id, total_spent, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY total_spent DESC, user_id ASC) AS rn FROM user_restaurant_spend ) SELECT restaurant_id, user_id, total_spent FROM ranked_spend WHERE rn = 1 ORDER BY restaurant_id ASC;
```

### ✅ PASS : FOOD_071 - DENSE_RANK
```sql
WITH user_restaurant_spend AS ( SELECT o.restaurant_id, o.user_id, SUM(o.total_amount) AS total_spent FROM orders o WHERE o.order_status = 'delivered' GROUP BY o.restaurant_id, o.user_id ), ranked_spend AS ( SELECT restaurant_id, user_id, total_spent, DENSE_RANK() OVER (PARTITION BY restaurant_id ORDER BY total_spent DESC) AS spend_rank FROM user_restaurant_spend ) SELECT restaurant_id, user_id, total_spent FROM ranked_spend WHERE spend_rank = 1 ORDER BY restaurant_id ASC, user_id ASC;
```

### ✅ PASS : FOOD_072 - Month span
```sql
WITH user_months AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), user_bounds AS ( SELECT user_id, MIN(order_month) AS first_month, MAX(order_month) AS last_month, COUNT(*) AS active_months FROM user_months GROUP BY user_id ), expected_months AS ( SELECT user_id, ((EXTRACT(YEAR FROM AGE(last_month, first_month)) * 12) + EXTRACT(MONTH FROM AGE(last_month, first_month)) + 1)::int AS expected_month_count, active_months FROM user_bounds ) SELECT u.id, u.full_name FROM users u JOIN expected_months em ON em.user_id = u.id WHERE em.active_months = em.expected_month_count ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_072 - Month series
```sql
WITH user_bounds AS ( SELECT user_id, DATE_TRUNC('month', MIN(created_at)) AS first_month, DATE_TRUNC('month', MAX(created_at)) AS last_month FROM orders GROUP BY user_id ), user_active_months AS ( SELECT DISTINCT user_id, DATE_TRUNC('month', created_at) AS order_month FROM orders ) SELECT u.id, u.full_name FROM users u JOIN user_bounds ub ON ub.user_id = u.id WHERE NOT EXISTS ( SELECT 1 FROM generate_series(ub.first_month, ub.last_month, INTERVAL '1 month') AS gs(month_start) WHERE NOT EXISTS ( SELECT 1 FROM user_active_months uam WHERE uam.user_id = ub.user_id AND uam.order_month = gs.month_start ) ) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_073 - AVG delay
```sql
SELECT r.id, r.name, AVG(EXTRACT(EPOCH FROM (o.delivered_at - o.estimated_delivery_at)) / 60) AS avg_delay_minutes FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' AND o.delivered_at IS NOT NULL AND o.estimated_delivery_at IS NOT NULL AND o.delivered_at > o.estimated_delivery_at GROUP BY r.id, r.name ORDER BY avg_delay_minutes DESC, r.id ASC LIMIT 10;
```

### ✅ PASS : FOOD_073 - Delay CTE
```sql
WITH delayed_orders AS ( SELECT restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ) SELECT r.id, r.name, AVG(dly.delay_minutes) AS avg_delay_minutes FROM restaurants r JOIN delayed_orders dly ON dly.restaurant_id = r.id GROUP BY r.id, r.name ORDER BY avg_delay_minutes DESC, r.id ASC LIMIT 10;
```

### ✅ PASS : FOOD_074 - ROW_NUMBER
```sql
WITH driver_city_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, ROW_NUMBER() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS rn FROM driver_city_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE rn = 1 ORDER BY city ASC, id ASC;
```

### ✅ PASS : FOOD_074 - DENSE_RANK
```sql
WITH driver_city_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, DENSE_RANK() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS city_rank FROM driver_city_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE city_rank = 1 ORDER BY city ASC, id ASC;
```

### ✅ PASS : FOOD_075 - FILTER
```sql
SELECT u.id, u.full_name FROM users u JOIN support_tickets st ON st.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE st.refund_amount > 0) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_075 - NOT EXISTS
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM support_tickets st WHERE st.user_id = u.id ) AND NOT EXISTS ( SELECT 1 FROM support_tickets st WHERE st.user_id = u.id AND st.refund_amount <= 0 ) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_075 - CASE
```sql
SELECT u.id, u.full_name FROM users u JOIN support_tickets st ON st.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND SUM(CASE WHEN st.refund_amount > 0 THEN 1 ELSE 0 END) = COUNT(*) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_076 - ROW_NUMBER
```sql
WITH user_refunds AS ( SELECT st.user_id, st.order_id, SUM(st.refund_amount) AS total_refund FROM support_tickets st GROUP BY st.user_id, st.order_id ), ranked_refunds AS ( SELECT user_id, order_id, total_refund, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total_refund DESC, order_id ASC) AS rn FROM user_refunds ) SELECT user_id, order_id, total_refund FROM ranked_refunds WHERE rn = 1 ORDER BY user_id ASC;
```

### ✅ PASS : FOOD_076 - Max + min id
```sql
WITH user_refunds AS ( SELECT st.user_id, st.order_id, SUM(st.refund_amount) AS total_refund FROM support_tickets st GROUP BY st.user_id, st.order_id ), max_refunds AS ( SELECT user_id, MAX(total_refund) AS max_refund FROM user_refunds GROUP BY user_id ), tied_orders AS ( SELECT ur.user_id, ur.order_id, ur.total_refund FROM user_refunds ur JOIN max_refunds mr ON mr.user_id = ur.user_id AND mr.max_refund = ur.total_refund ), chosen_orders AS ( SELECT user_id, MIN(order_id) AS order_id FROM tied_orders GROUP BY user_id ) SELECT t.user_id, t.order_id, t.total_refund FROM tied_orders t JOIN chosen_orders c ON c.user_id = t.user_id AND c.order_id = t.order_id ORDER BY t.user_id ASC;
```

### ✅ PASS : FOOD_077 - LAG gap
```sql
WITH ordered_gaps AS ( SELECT o.user_id, o.created_at AS order_created_at, LAG(o.created_at) OVER (PARTITION BY o.user_id ORDER BY o.created_at, o.id) AS previous_order_at FROM orders o ) SELECT u.id, u.full_name, MAX(DATE_PART('day', og.order_created_at - og.previous_order_at)) AS longest_gap_days FROM users u JOIN ordered_gaps og ON og.user_id = u.id WHERE og.previous_order_at IS NOT NULL GROUP BY u.id, u.full_name ORDER BY longest_gap_days DESC, u.id ASC;
```

### ✅ PASS : FOOD_077 - Row join
```sql
WITH ordered_orders AS ( SELECT o.user_id, o.created_at AS order_created_at, ROW_NUMBER() OVER (PARTITION BY o.user_id ORDER BY o.created_at, o.id) AS rn FROM orders o ) SELECT u.id, u.full_name, MAX(DATE_PART('day', o2.order_created_at - o1.order_created_at)) AS longest_gap_days FROM users u JOIN ordered_orders o1 ON o1.user_id = u.id JOIN ordered_orders o2 ON o2.user_id = o1.user_id AND o2.rn = o1.rn + 1 GROUP BY u.id, u.full_name ORDER BY longest_gap_days DESC, u.id ASC;
```

### ✅ PASS : FOOD_078 - Streak key
```sql
WITH driver_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_day FROM driver_assignments da WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ), grouped_days AS ( SELECT driver_id, delivery_day, delivery_day - (ROW_NUMBER() OVER (PARTITION BY driver_id ORDER BY delivery_day))::int AS grp_key FROM driver_days ), streaks AS ( SELECT driver_id, COUNT(*) AS streak_length FROM grouped_days GROUP BY driver_id, grp_key ) SELECT d.id, d.full_name FROM drivers d JOIN streaks s ON s.driver_id = d.id WHERE s.streak_length >= 5 GROUP BY d.id, d.full_name ORDER BY d.id ASC;
```

### ✅ PASS : FOOD_078 - Self join 5
```sql
WITH driver_days AS ( SELECT DISTINCT da.driver_id, DATE(da.delivered_at) AS delivery_day FROM driver_assignments da WHERE da.status = 'delivered' AND da.delivered_at IS NOT NULL ) SELECT DISTINCT d.id, d.full_name FROM drivers d JOIN driver_days d1 ON d1.driver_id = d.id JOIN driver_days d2 ON d2.driver_id = d1.driver_id AND d2.delivery_day = d1.delivery_day + INTERVAL '1 day' JOIN driver_days d3 ON d3.driver_id = d1.driver_id AND d3.delivery_day = d1.delivery_day + INTERVAL '2 day' JOIN driver_days d4 ON d4.driver_id = d1.driver_id AND d4.delivery_day = d1.delivery_day + INTERVAL '3 day' JOIN driver_days d5 ON d5.driver_id = d1.driver_id AND d5.delivery_day = d1.delivery_day + INTERVAL '4 day' ORDER BY d.id ASC;
```

### ✅ PASS : FOOD_079 - LAG month
```sql
WITH monthly_orders AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month, COUNT(*) AS order_count FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), ranked_months AS ( SELECT user_id, order_month, order_count, LAG(order_count) OVER (PARTITION BY user_id ORDER BY order_month) AS previous_month_order_count FROM monthly_orders ) SELECT u.id, u.full_name, rm.order_month, rm.order_count, rm.previous_month_order_count FROM users u JOIN ranked_months rm ON rm.user_id = u.id WHERE rm.previous_month_order_count IS NOT NULL AND rm.order_count < rm.previous_month_order_count ORDER BY rm.order_month ASC, u.id ASC;
```

### ✅ PASS : FOOD_079 - Row join
```sql
WITH monthly_orders AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS order_month, COUNT(*) AS order_count FROM orders GROUP BY user_id, DATE_TRUNC('month', created_at) ), ordered_months AS ( SELECT user_id, order_month, order_count, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_month) AS rn FROM monthly_orders ) SELECT u.id, u.full_name, curr.order_month, curr.order_count, prev.order_count AS previous_month_order_count FROM users u JOIN ordered_months curr ON curr.user_id = u.id JOIN ordered_months prev ON prev.user_id = curr.user_id AND prev.rn = curr.rn - 1 WHERE curr.order_count < prev.order_count ORDER BY curr.order_month ASC, u.id ASC;
```

### ✅ PASS : FOOD_080 - Avg delay
```sql
WITH delayed_orders AS ( SELECT id, restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ), restaurant_avg_delay AS ( SELECT restaurant_id, AVG(delay_minutes) AS avg_delay_minutes FROM delayed_orders GROUP BY restaurant_id ) SELECT dly.id, dly.restaurant_id, dly.delay_minutes FROM delayed_orders dly JOIN restaurant_avg_delay rad ON rad.restaurant_id = dly.restaurant_id WHERE dly.delay_minutes > rad.avg_delay_minutes ORDER BY dly.restaurant_id ASC, dly.id ASC;
```

### ✅ PASS : FOOD_080 - Window avg
```sql
SELECT id, restaurant_id, delay_minutes FROM ( SELECT id, restaurant_id, delay_minutes, AVG(delay_minutes) OVER (PARTITION BY restaurant_id) AS avg_delay_minutes FROM ( SELECT id, restaurant_id, EXTRACT(EPOCH FROM (delivered_at - estimated_delivery_at)) / 60 AS delay_minutes FROM orders WHERE order_status = 'delivered' AND delivered_at IS NOT NULL AND estimated_delivery_at IS NOT NULL AND delivered_at > estimated_delivery_at ) delayed ) t WHERE delay_minutes > avg_delay_minutes ORDER BY restaurant_id ASC, id ASC;
```

### ✅ PASS : FOOD_081 - ROW_NUMBER
```sql
WITH monthly_city_revenue AS ( SELECT DATE_TRUNC('month', o.created_at) AS revenue_month, r.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY DATE_TRUNC('month', o.created_at), r.city ), ranked_cities AS ( SELECT revenue_month, city, total_revenue, ROW_NUMBER() OVER (PARTITION BY revenue_month ORDER BY total_revenue DESC, city ASC) AS rn FROM monthly_city_revenue ) SELECT revenue_month, city, total_revenue FROM ranked_cities WHERE rn <= 3 ORDER BY revenue_month ASC, total_revenue DESC, city ASC;
```

### ✅ PASS : FOOD_081 - DENSE_RANK
```sql
WITH monthly_city_revenue AS ( SELECT DATE_TRUNC('month', o.created_at) AS revenue_month, r.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN restaurants r ON r.id = o.restaurant_id WHERE o.order_status = 'delivered' GROUP BY DATE_TRUNC('month', o.created_at), r.city ), ranked_cities AS ( SELECT revenue_month, city, total_revenue, DENSE_RANK() OVER (PARTITION BY revenue_month ORDER BY total_revenue DESC, city ASC) AS rank_num FROM monthly_city_revenue ) SELECT revenue_month, city, total_revenue FROM ranked_cities WHERE rank_num <= 3 ORDER BY revenue_month ASC, total_revenue DESC, city ASC;
```

### ✅ PASS : FOOD_082 - ROW_NUMBER
```sql
WITH monthly_coupon_usage AS ( SELECT DATE_TRUNC('month', o.created_at) AS usage_month, c.code, COUNT(*) AS usage_count FROM orders o JOIN coupons c ON c.id = o.coupon_id GROUP BY DATE_TRUNC('month', o.created_at), c.code ), ranked_coupon_usage AS ( SELECT usage_month, code, usage_count, ROW_NUMBER() OVER (PARTITION BY usage_month ORDER BY usage_count DESC, code ASC) AS rn FROM monthly_coupon_usage ) SELECT usage_month, code, usage_count FROM ranked_coupon_usage WHERE rn <= 2 ORDER BY usage_month ASC, usage_count DESC, code ASC;
```

### ✅ PASS : FOOD_082 - Rank count
```sql
WITH monthly_coupon_usage AS ( SELECT DATE_TRUNC('month', o.created_at) AS usage_month, c.code, COUNT(*) AS usage_count FROM orders o JOIN coupons c ON c.id = o.coupon_id GROUP BY DATE_TRUNC('month', o.created_at), c.code ) SELECT usage_month, code, usage_count FROM ( SELECT usage_month, code, usage_count, ROW_NUMBER() OVER (PARTITION BY usage_month ORDER BY usage_count DESC, code ASC) AS rn FROM monthly_coupon_usage ) t WHERE rn <= 2 ORDER BY usage_month ASC, usage_count DESC, code ASC;
```

### ✅ PASS : FOOD_083 - FILTER
```sql
WITH delivered_orders AS ( SELECT restaurant_id, total_amount, EXTRACT(ISODOW FROM created_at) AS order_isodow FROM orders WHERE order_status = 'delivered' ) SELECT r.id, r.name, SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)) AS weekend_revenue, SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5) AS weekday_revenue FROM restaurants r JOIN delivered_orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name HAVING COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow IN (6, 7)), 0) > COALESCE(SUM(o.total_amount) FILTER (WHERE o.order_isodow BETWEEN 1 AND 5), 0) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_083 - CASE SUM
```sql
WITH delivered_orders AS ( SELECT restaurant_id, total_amount, EXTRACT(ISODOW FROM created_at) AS order_isodow FROM orders WHERE order_status = 'delivered' ) SELECT r.id, r.name, SUM(CASE WHEN o.order_isodow IN (6, 7) THEN o.total_amount ELSE 0 END) AS weekend_revenue, SUM(CASE WHEN o.order_isodow BETWEEN 1 AND 5 THEN o.total_amount ELSE 0 END) AS weekday_revenue FROM restaurants r JOIN delivered_orders o ON o.restaurant_id = r.id GROUP BY r.id, r.name HAVING SUM(CASE WHEN o.order_isodow IN (6, 7) THEN o.total_amount ELSE 0 END) > SUM(CASE WHEN o.order_isodow BETWEEN 1 AND 5 THEN o.total_amount ELSE 0 END) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_084 - COUNT orders
```sql
WITH refunded_orders AS ( SELECT user_id, order_id, SUM(refund_amount) AS total_refund FROM support_tickets WHERE refund_amount > 0 GROUP BY user_id, order_id ) SELECT u.id, u.full_name, COUNT(*) AS refunded_order_count FROM users u JOIN refunded_orders ro ON ro.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 1 ORDER BY refunded_order_count DESC, u.id ASC;
```

### ✅ PASS : FOOD_084 - COUNT DISTINCT
```sql
SELECT u.id, u.full_name, COUNT(DISTINCT st.order_id) AS refunded_order_count FROM users u JOIN support_tickets st ON st.user_id = u.id WHERE st.refund_amount > 0 GROUP BY u.id, u.full_name HAVING COUNT(DISTINCT st.order_id) > 1 ORDER BY refunded_order_count DESC, u.id ASC;
```

### ✅ PASS : FOOD_085 - Zero failures
```sql
SELECT d.id, d.full_name, COUNT(*) FILTER (WHERE da.status = 'delivered') AS delivered_count FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id GROUP BY d.id, d.full_name HAVING COUNT(*) FILTER (WHERE da.status = 'delivered') >= 10 AND COUNT(*) FILTER (WHERE da.status IN ('failed','cancelled')) = 0 ORDER BY d.id ASC;
```

### ✅ PASS : FOOD_085 - NOT EXISTS
```sql
WITH delivered_counts AS ( SELECT driver_id, COUNT(*) AS delivered_count FROM driver_assignments WHERE status = 'delivered' GROUP BY driver_id ) SELECT d.id, d.full_name, dc.delivered_count FROM drivers d JOIN delivered_counts dc ON dc.driver_id = d.id WHERE dc.delivered_count >= 10 AND NOT EXISTS ( SELECT 1 FROM driver_assignments da WHERE da.driver_id = d.id AND da.status IN ('failed','cancelled') ) ORDER BY d.id ASC;
```

### ✅ PASS : FOOD_086 - 3 month up
```sql
WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), ranked_months AS ( SELECT restaurant_id, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS rn FROM monthly_revenue ), pivoted AS ( SELECT restaurant_id, MAX(total_revenue) FILTER (WHERE rn = 1) AS latest_month_revenue, MAX(total_revenue) FILTER (WHERE rn = 2) AS middle_month_revenue, MAX(total_revenue) FILTER (WHERE rn = 3) AS oldest_month_revenue FROM ranked_months WHERE rn <= 3 GROUP BY restaurant_id ) SELECT r.id, r.name, p.oldest_month_revenue, p.middle_month_revenue, p.latest_month_revenue FROM pivoted p JOIN restaurants r ON r.id = p.restaurant_id WHERE p.latest_month_revenue IS NOT NULL AND p.middle_month_revenue IS NOT NULL AND p.oldest_month_revenue IS NOT NULL AND p.oldest_month_revenue < p.middle_month_revenue AND p.middle_month_revenue < p.latest_month_revenue ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_086 - LEAD compare
```sql
WITH monthly_revenue AS ( SELECT restaurant_id, DATE_TRUNC('month', created_at) AS revenue_month, SUM(total_amount) AS total_revenue FROM orders WHERE order_status = 'delivered' GROUP BY restaurant_id, DATE_TRUNC('month', created_at) ), month_history AS ( SELECT restaurant_id, revenue_month, total_revenue, LEAD(total_revenue, 1) OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS middle_month_revenue, LEAD(total_revenue, 2) OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS oldest_month_revenue, ROW_NUMBER() OVER (PARTITION BY restaurant_id ORDER BY revenue_month DESC) AS rn FROM monthly_revenue ) SELECT r.id, r.name, mh.oldest_month_revenue, mh.middle_month_revenue, mh.total_revenue AS latest_month_revenue FROM month_history mh JOIN restaurants r ON r.id = mh.restaurant_id WHERE mh.rn = 1 AND mh.middle_month_revenue IS NOT NULL AND mh.oldest_month_revenue IS NOT NULL AND mh.oldest_month_revenue < mh.middle_month_revenue AND mh.middle_month_revenue < mh.total_revenue ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_087 - All months
```sql
WITH user_months AS ( SELECT u.id AS user_id, DATE_TRUNC('month', u.created_at) AS signup_month, COUNT(DISTINCT DATE_TRUNC('month', o.created_at)) AS active_months, DATE_TRUNC('month', MAX(o.created_at)) AS last_order_month FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, DATE_TRUNC('month', u.created_at) ), expected_months AS ( SELECT user_id, ((EXTRACT(YEAR FROM AGE(last_order_month, signup_month)) * 12) + EXTRACT(MONTH FROM AGE(last_order_month, signup_month)) + 1)::int AS expected_month_count, active_months FROM user_months ) SELECT u.id, u.full_name FROM users u JOIN expected_months em ON em.user_id = u.id WHERE em.active_months = em.expected_month_count ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_088 - Coupon avg
```sql
WITH coupon_avg_discount AS ( SELECT coupon_id, AVG(discount_amount) AS avg_discount FROM orders WHERE coupon_id IS NOT NULL GROUP BY coupon_id ) SELECT o.id, o.coupon_id, o.discount_amount FROM orders o JOIN coupon_avg_discount cad ON cad.coupon_id = o.coupon_id WHERE o.discount_amount > cad.avg_discount ORDER BY o.coupon_id ASC, o.id ASC;
```

### ✅ PASS : FOOD_088 - Window avg
```sql
SELECT id, coupon_id, discount_amount FROM ( SELECT o.id, o.coupon_id, o.discount_amount, AVG(o.discount_amount) OVER (PARTITION BY o.coupon_id) AS avg_discount FROM orders o WHERE o.coupon_id IS NOT NULL ) t WHERE discount_amount > avg_discount ORDER BY coupon_id ASC, id ASC;
```

### ✅ PASS : FOOD_089 - Direct filter
```sql
SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM driver_assignments WHERE tip_earnings > delivery_earnings ORDER BY driver_id ASC, order_id ASC;
```

### ✅ PASS : FOOD_089 - CTE filter
```sql
WITH higher_tip_assignments AS ( SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM driver_assignments WHERE tip_earnings > delivery_earnings ) SELECT driver_id, order_id, delivery_earnings, tip_earnings FROM higher_tip_assignments ORDER BY driver_id ASC, order_id ASC;
```

### ✅ PASS : FOOD_090 - Review vs rest
```sql
WITH user_restaurants AS ( SELECT user_id, COUNT(DISTINCT restaurant_id) AS restaurant_count FROM orders GROUP BY user_id ), user_reviews AS ( SELECT user_id, COUNT(*) AS review_count FROM reviews GROUP BY user_id ) SELECT u.id, u.full_name, urv.review_count, uro.restaurant_count FROM users u JOIN user_reviews urv ON urv.user_id = u.id JOIN user_restaurants uro ON uro.user_id = u.id WHERE urv.review_count > uro.restaurant_count ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_090 - Inline joins
```sql
SELECT u.id, u.full_name, ur.review_count, uo.restaurant_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS review_count FROM reviews GROUP BY user_id ) ur ON ur.user_id = u.id JOIN ( SELECT user_id, COUNT(DISTINCT restaurant_id) AS restaurant_count FROM orders GROUP BY user_id ) uo ON uo.user_id = u.id WHERE ur.review_count > uo.restaurant_count ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_091 - ROW_NUMBER
```sql
WITH driver_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, ROW_NUMBER() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS rn FROM driver_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE rn <= 3 ORDER BY city ASC, completed_deliveries DESC, id ASC;
```

### ✅ PASS : FOOD_091 - DENSE_RANK
```sql
WITH driver_deliveries AS ( SELECT r.city, d.id, d.full_name, COUNT(*) AS completed_deliveries FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.status = 'delivered' GROUP BY r.city, d.id, d.full_name ), ranked_drivers AS ( SELECT city, id, full_name, completed_deliveries, DENSE_RANK() OVER (PARTITION BY city ORDER BY completed_deliveries DESC, id ASC) AS city_rank FROM driver_deliveries ) SELECT city, id, full_name, completed_deliveries FROM ranked_drivers WHERE city_rank <= 3 ORDER BY city ASC, completed_deliveries DESC, id ASC;
```

### ✅ PASS : FOOD_092 - Weekend only
```sql
SELECT u.id, u.full_name FROM users u JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.full_name HAVING COUNT(*) > 0 AND COUNT(*) = COUNT(*) FILTER (WHERE EXTRACT(ISODOW FROM o.created_at) IN (6, 7)) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_092 - Not exists
```sql
SELECT u.id, u.full_name FROM users u WHERE EXISTS ( SELECT 1 FROM orders o WHERE o.user_id = u.id ) AND NOT EXISTS ( SELECT 1 FROM orders o WHERE o.user_id = u.id AND EXTRACT(ISODOW FROM o.created_at) BETWEEN 1 AND 5 ) ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_093 - Best day city
```sql
WITH daily_restaurant_revenue AS ( SELECT r.city, r.id, r.name, DATE(o.created_at) AS order_date, SUM(o.total_amount) AS daily_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name, DATE(o.created_at) ), ranked_revenue AS ( SELECT city, id, name, order_date, daily_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY daily_revenue DESC, order_date ASC, id ASC) AS rn FROM daily_restaurant_revenue ) SELECT city, id, name, order_date, daily_revenue FROM ranked_revenue WHERE rn = 1 ORDER BY city ASC, id ASC;
```

### ✅ PASS : FOOD_093 - Dense rank
```sql
WITH daily_restaurant_revenue AS ( SELECT r.city, r.id, r.name, DATE(o.created_at) AS order_date, SUM(o.total_amount) AS daily_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, r.id, r.name, DATE(o.created_at) ), ranked_revenue AS ( SELECT city, id, name, order_date, daily_revenue, DENSE_RANK() OVER (PARTITION BY city ORDER BY daily_revenue DESC) AS revenue_rank FROM daily_restaurant_revenue ) SELECT city, id, name, order_date, daily_revenue FROM ranked_revenue WHERE revenue_rank = 1 ORDER BY city ASC, id ASC;
```

### ✅ PASS : FOOD_094 - City avg
```sql
WITH driver_city_wait AS ( SELECT r.city, d.id, d.full_name, AVG(da.wait_time_minutes) AS avg_wait_time FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.wait_time_minutes IS NOT NULL GROUP BY r.city, d.id, d.full_name ), city_wait_avg AS ( SELECT city, AVG(avg_wait_time) AS city_avg_wait_time FROM driver_city_wait GROUP BY city ) SELECT dcw.city, dcw.id, dcw.full_name, dcw.avg_wait_time FROM driver_city_wait dcw JOIN city_wait_avg cwa ON cwa.city = dcw.city WHERE dcw.avg_wait_time > cwa.city_avg_wait_time ORDER BY dcw.city ASC, dcw.id ASC;
```

### ✅ PASS : FOOD_094 - Window avg
```sql
WITH driver_city_wait AS ( SELECT r.city, d.id, d.full_name, AVG(da.wait_time_minutes) AS avg_wait_time FROM drivers d JOIN driver_assignments da ON da.driver_id = d.id JOIN orders o ON o.id = da.order_id JOIN restaurants r ON r.id = o.restaurant_id WHERE da.wait_time_minutes IS NOT NULL GROUP BY r.city, d.id, d.full_name ) SELECT city, id, full_name, avg_wait_time FROM ( SELECT city, id, full_name, avg_wait_time, AVG(avg_wait_time) OVER (PARTITION BY city) AS city_avg_wait_time FROM driver_city_wait ) t WHERE avg_wait_time > city_avg_wait_time ORDER BY city ASC, id ASC;
```

### ✅ PASS : FOOD_095 - NOT EXISTS
```sql
SELECT r.id, r.name FROM restaurants r WHERE EXISTS ( SELECT 1 FROM menu_items mi WHERE mi.restaurant_id = r.id ) AND NOT EXISTS ( SELECT 1 FROM menu_items mi JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id WHERE mi.restaurant_id = r.id AND l.was_available = false ) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_095 - Left anti
```sql
WITH stockout_restaurants AS ( SELECT DISTINCT mi.restaurant_id FROM menu_items mi JOIN menu_item_availability_logs l ON l.menu_item_id = mi.id WHERE l.was_available = false ), restaurants_with_items AS ( SELECT DISTINCT restaurant_id FROM menu_items ) SELECT r.id, r.name FROM restaurants r JOIN restaurants_with_items ri ON ri.restaurant_id = r.id LEFT JOIN stockout_restaurants sr ON sr.restaurant_id = r.id WHERE sr.restaurant_id IS NULL ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_096 - Prev max
```sql
WITH monthly_spend AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS spend_month, SUM(total_amount) AS total_spent FROM orders WHERE order_status = 'delivered' GROUP BY user_id, DATE_TRUNC('month', created_at) ), spend_history AS ( SELECT user_id, spend_month, total_spent, MAX(total_spent) OVER (PARTITION BY user_id ORDER BY spend_month ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS previous_best_spend FROM monthly_spend ) SELECT u.id, u.full_name, sh.spend_month, sh.total_spent FROM users u JOIN spend_history sh ON sh.user_id = u.id WHERE sh.previous_best_spend IS NOT NULL AND sh.total_spent > sh.previous_best_spend ORDER BY sh.spend_month ASC, u.id ASC;
```

### ✅ PASS : FOOD_096 - Max join
```sql
WITH monthly_spend AS ( SELECT user_id, DATE_TRUNC('month', created_at) AS spend_month, SUM(total_amount) AS total_spent FROM orders WHERE order_status = 'delivered' GROUP BY user_id, DATE_TRUNC('month', created_at) ), ordered_months AS ( SELECT user_id, spend_month, total_spent, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY spend_month) AS rn FROM monthly_spend ), previous_best AS ( SELECT curr.user_id, curr.spend_month, MAX(prev.total_spent) AS previous_best_spend FROM ordered_months curr JOIN ordered_months prev ON prev.user_id = curr.user_id AND prev.rn < curr.rn GROUP BY curr.user_id, curr.spend_month ) SELECT u.id, u.full_name, om.spend_month, om.total_spent FROM ordered_months om JOIN previous_best pb ON pb.user_id = om.user_id AND pb.spend_month = om.spend_month JOIN users u ON u.id = om.user_id WHERE om.total_spent > pb.previous_best_spend ORDER BY om.spend_month ASC, u.id ASC;
```

### ✅ PASS : FOOD_097 - All categories
```sql
WITH restaurant_categories AS ( SELECT restaurant_id, COUNT(DISTINCT category) AS total_categories FROM menu_items GROUP BY restaurant_id ), ordered_categories AS ( SELECT mi.restaurant_id, COUNT(DISTINCT mi.category) AS ordered_categories FROM menu_items mi JOIN order_items oi ON oi.menu_item_id = mi.id GROUP BY mi.restaurant_id ) SELECT r.id, r.name FROM restaurants r JOIN restaurant_categories rc ON rc.restaurant_id = r.id JOIN ordered_categories oc ON oc.restaurant_id = r.id WHERE rc.total_categories = oc.ordered_categories ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_097 - Not exists
```sql
SELECT r.id, r.name FROM restaurants r WHERE NOT EXISTS ( SELECT 1 FROM menu_items mi WHERE mi.restaurant_id = r.id AND NOT EXISTS ( SELECT 1 FROM menu_items mi2 JOIN order_items oi ON oi.menu_item_id = mi2.id WHERE mi2.restaurant_id = r.id AND mi2.category = mi.category ) ) ORDER BY r.id ASC;
```

### ✅ PASS : FOOD_098 - Count compare
```sql
WITH user_order_counts AS ( SELECT user_id, COUNT(*) AS order_count FROM orders GROUP BY user_id ), user_ticket_counts AS ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY user_id ) SELECT u.id, u.full_name, utc.ticket_count, uoc.order_count FROM users u JOIN user_ticket_counts utc ON utc.user_id = u.id JOIN user_order_counts uoc ON uoc.user_id = u.id WHERE utc.ticket_count > uoc.order_count ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_098 - Inline counts
```sql
SELECT u.id, u.full_name, utc.ticket_count, uoc.order_count FROM users u JOIN ( SELECT user_id, COUNT(*) AS ticket_count FROM support_tickets GROUP BY user_id ) utc ON utc.user_id = u.id JOIN ( SELECT user_id, COUNT(*) AS order_count FROM orders GROUP BY user_id ) uoc ON uoc.user_id = u.id WHERE utc.ticket_count > uoc.order_count ORDER BY u.id ASC;
```

### ✅ PASS : FOOD_099 - Running max
```sql
WITH user_tip_history AS ( SELECT user_id, id, created_at, tip_amount, MAX(tip_amount) OVER (PARTITION BY user_id ORDER BY created_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING) AS previous_best_tip FROM orders ) SELECT u.id AS user_id, u.full_name, uth.id AS order_id, uth.tip_amount FROM users u JOIN user_tip_history uth ON uth.user_id = u.id WHERE uth.previous_best_tip IS NOT NULL AND uth.tip_amount > uth.previous_best_tip ORDER BY u.id ASC, uth.id ASC;
```

### ✅ PASS : FOOD_099 - Correlated max
```sql
SELECT u.id AS user_id, u.full_name, o.id AS order_id, o.tip_amount FROM users u JOIN orders o ON o.user_id = u.id WHERE o.tip_amount > ( SELECT MAX(o2.tip_amount) FROM orders o2 WHERE o2.user_id = o.user_id AND (o2.created_at < o.created_at OR (o2.created_at = o.created_at AND o2.id < o.id)) ) ORDER BY u.id ASC, o.id ASC;
```

### ✅ PASS : FOOD_100 - LEAD latest
```sql
WITH monthly_city_revenue AS ( SELECT r.city, DATE_TRUNC('month', o.created_at) AS revenue_month, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, DATE_TRUNC('month', o.created_at) ), ranked_months AS ( SELECT city, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue_month DESC) AS rn, LEAD(total_revenue, 1) OVER (PARTITION BY city ORDER BY revenue_month DESC) AS previous_month_revenue FROM monthly_city_revenue ) SELECT city, revenue_month AS latest_month, total_revenue AS latest_month_revenue, previous_month_revenue FROM ranked_months WHERE rn = 1 AND previous_month_revenue IS NOT NULL AND total_revenue < previous_month_revenue ORDER BY city ASC;
```

### ✅ PASS : FOOD_100 - Row join
```sql
WITH monthly_city_revenue AS ( SELECT r.city, DATE_TRUNC('month', o.created_at) AS revenue_month, SUM(o.total_amount) AS total_revenue FROM restaurants r JOIN orders o ON o.restaurant_id = r.id WHERE o.order_status = 'delivered' GROUP BY r.city, DATE_TRUNC('month', o.created_at) ), ordered_months AS ( SELECT city, revenue_month, total_revenue, ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue_month DESC) AS rn FROM monthly_city_revenue ) SELECT curr.city, curr.revenue_month AS latest_month, curr.total_revenue AS latest_month_revenue, prev.total_revenue AS previous_month_revenue FROM ordered_months curr JOIN ordered_months prev ON prev.city = curr.city AND prev.rn = curr.rn + 1 WHERE curr.rn = 1 AND curr.total_revenue < prev.total_revenue ORDER BY curr.city ASC;
```

