# Solutions Evaluation Report (ecommerce)

**Summary:**
- Total Approaches: 222
- Passed: 222
- Failed: 0

## Detailed Results
### ✅ PASS : ECOMMERCE_001 - COUNT all customers
```sql
SELECT COUNT(*) AS count FROM customers;
```

### ✅ PASS : ECOMMERCE_001 - COUNT primary key
```sql
SELECT COUNT(id) AS count FROM customers;
```

### ✅ PASS : ECOMMERCE_002 - COUNT all products
```sql
SELECT COUNT(*) AS count FROM products;
```

### ✅ PASS : ECOMMERCE_002 - COUNT product IDs
```sql
SELECT COUNT(id) AS count FROM products;
```

### ✅ PASS : ECOMMERCE_003 - COUNT all orders
```sql
SELECT COUNT(*) AS count FROM orders;
```

### ✅ PASS : ECOMMERCE_003 - COUNT order IDs
```sql
SELECT COUNT(id) AS count FROM orders;
```

### ✅ PASS : ECOMMERCE_004 - COUNT all categories
```sql
SELECT COUNT(*) AS count FROM categories;
```

### ✅ PASS : ECOMMERCE_004 - COUNT category IDs
```sql
SELECT COUNT(id) AS count FROM categories;
```

### ✅ PASS : ECOMMERCE_005 - Filter active products + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE is_active = TRUE;
```

### ✅ PASS : ECOMMERCE_005 - Boolean shorthand filter
```sql
SELECT COUNT(*) AS count FROM products WHERE is_active;
```

### ✅ PASS : ECOMMERCE_005 - COUNT active product IDs
```sql
SELECT COUNT(id) AS count FROM products WHERE is_active = TRUE;
```

### ✅ PASS : ECOMMERCE_006 - Filter inactive products + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE is_active = FALSE;
```

### ✅ PASS : ECOMMERCE_006 - Boolean NOT shorthand
```sql
SELECT COUNT(*) AS count FROM products WHERE NOT is_active;
```

### ✅ PASS : ECOMMERCE_006 - COUNT inactive product IDs
```sql
SELECT COUNT(id) AS count FROM products WHERE is_active = FALSE;
```

### ✅ PASS : ECOMMERCE_007 - COUNT all reviews
```sql
SELECT COUNT(*) AS count FROM reviews;
```

### ✅ PASS : ECOMMERCE_007 - COUNT review IDs
```sql
SELECT COUNT(id) AS count FROM reviews;
```

### ✅ PASS : ECOMMERCE_008 - COUNT all payments
```sql
SELECT COUNT(*) AS count FROM payments;
```

### ✅ PASS : ECOMMERCE_008 - COUNT payment IDs
```sql
SELECT COUNT(id) AS count FROM payments;
```

### ✅ PASS : ECOMMERCE_009 - Filter low stock products + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE stock_quantity < 10;
```

### ✅ PASS : ECOMMERCE_009 - COUNT low stock product IDs
```sql
SELECT COUNT(id) AS count FROM products WHERE stock_quantity < 10;
```

### ✅ PASS : ECOMMERCE_010 - Filter delivered orders + COUNT
```sql
SELECT COUNT(*) AS count FROM orders WHERE status = 'delivered';
```

### ✅ PASS : ECOMMERCE_010 - COUNT delivered order IDs
```sql
SELECT COUNT(id) AS count FROM orders WHERE status = 'delivered';
```

### ✅ PASS : ECOMMERCE_011 - Filter cancelled orders + COUNT
```sql
SELECT COUNT(*) AS count FROM orders WHERE status = 'cancelled';
```

### ✅ PASS : ECOMMERCE_011 - COUNT cancelled order IDs
```sql
SELECT COUNT(id) AS count FROM orders WHERE status = 'cancelled';
```

### ✅ PASS : ECOMMERCE_012 - Filter returned orders + COUNT
```sql
SELECT COUNT(*) AS count FROM orders WHERE status = 'returned';
```

### ✅ PASS : ECOMMERCE_012 - COUNT returned order IDs
```sql
SELECT COUNT(id) AS count FROM orders WHERE status = 'returned';
```

### ✅ PASS : ECOMMERCE_013 - Filter expensive products + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE price > 1000;
```

### ✅ PASS : ECOMMERCE_013 - COUNT matching product IDs
```sql
SELECT COUNT(id) AS count FROM products WHERE price > 1000;
```

### ✅ PASS : ECOMMERCE_014 - Check non-null and non-empty phone + COUNT
```sql
SELECT COUNT(*) AS count FROM customers WHERE phone IS NOT NULL AND phone <> '';
```

### ✅ PASS : ECOMMERCE_014 - Use NULLIF to ignore blanks
```sql
SELECT COUNT(*) AS count FROM customers WHERE NULLIF(phone, '') IS NOT NULL;
```

### ✅ PASS : ECOMMERCE_014 - COUNT valid phone values
```sql
SELECT COUNT(NULLIF(phone, '')) AS count FROM customers;
```

### ✅ PASS : ECOMMERCE_015 - Filter high-rated products + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE rating >= 4;
```

### ✅ PASS : ECOMMERCE_015 - COUNT matching product IDs
```sql
SELECT COUNT(id) AS count FROM products WHERE rating >= 4;
```

### ✅ PASS : ECOMMERCE_016 - Check null or empty phone + COUNT
```sql
SELECT COUNT(*) AS count FROM customers WHERE phone IS NULL OR phone = '';
```

### ✅ PASS : ECOMMERCE_016 - Use NULLIF with IS NULL
```sql
SELECT COUNT(*) AS count FROM customers WHERE NULLIF(phone, '') IS NULL;
```

### ✅ PASS : ECOMMERCE_016 - Subtract filled phone count
```sql
SELECT COUNT(*) - COUNT(NULLIF(phone, '')) AS count FROM customers;
```

### ✅ PASS : ECOMMERCE_017 - Filter pending orders + COUNT
```sql
SELECT COUNT(*) AS count FROM orders WHERE status = 'pending';
```

### ✅ PASS : ECOMMERCE_017 - COUNT pending order IDs
```sql
SELECT COUNT(id) AS count FROM orders WHERE status = 'pending';
```

### ✅ PASS : ECOMMERCE_018 - Filter completed payments + COUNT
```sql
SELECT COUNT(*) AS count FROM payments WHERE payment_status = 'completed';
```

### ✅ PASS : ECOMMERCE_018 - COUNT completed payment IDs
```sql
SELECT COUNT(id) AS count FROM payments WHERE payment_status = 'completed';
```

### ✅ PASS : ECOMMERCE_019 - Filter zero stock products + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE stock_quantity = 0;
```

### ✅ PASS : ECOMMERCE_019 - COUNT zero stock product IDs
```sql
SELECT COUNT(id) AS count FROM products WHERE stock_quantity = 0;
```

### ✅ PASS : ECOMMERCE_020 - Filter by registration date + COUNT
```sql
SELECT COUNT(*) AS count FROM customers WHERE created_at > '2025-01-01';
```

### ✅ PASS : ECOMMERCE_020 - COUNT customer IDs after date filter
```sql
SELECT COUNT(id) AS count FROM customers WHERE created_at > '2025-01-01';
```

### ✅ PASS : ECOMMERCE_020 - Explicit TIMESTAMP literal
```sql
SELECT COUNT(*) AS count FROM customers WHERE created_at > TIMESTAMP '2025-01-01';
```

### ✅ PASS : ECOMMERCE_021 - AVG product price
```sql
SELECT AVG(price) AS avg_price FROM products;
```

### ✅ PASS : ECOMMERCE_021 - Average from subquery
```sql
SELECT AVG(price) AS avg_price FROM (SELECT price FROM products) p;
```

### ✅ PASS : ECOMMERCE_022 - MAX product price
```sql
SELECT MAX(price) AS max_price FROM products;
```

### ✅ PASS : ECOMMERCE_022 - Top price using ORDER BY
```sql
SELECT price AS max_price FROM products ORDER BY price DESC LIMIT 1;
```

### ✅ PASS : ECOMMERCE_023 - MIN product price
```sql
SELECT MIN(price) AS min_price FROM products;
```

### ✅ PASS : ECOMMERCE_023 - Lowest price using ORDER BY
```sql
SELECT price AS min_price FROM products ORDER BY price ASC LIMIT 1;
```

### ✅ PASS : ECOMMERCE_024 - AVG product rating
```sql
SELECT ROUND(AVG(rating), 2) AS avg_rating FROM products;
```

### ✅ PASS : ECOMMERCE_024 - Average from rating subquery
```sql
SELECT ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT rating FROM products) p;
```

### ✅ PASS : ECOMMERCE_025 - SUM all stock quantities
```sql
SELECT SUM(stock_quantity) AS total_stock FROM products;
```

### ✅ PASS : ECOMMERCE_025 - Sum stock from subquery
```sql
SELECT SUM(stock_quantity) AS total_stock FROM (SELECT stock_quantity FROM products) p;
```

### ✅ PASS : ECOMMERCE_026 - AVG order total
```sql
SELECT ROUND(AVG(total_amount), 2) AS avg_order_total FROM orders;
```

### ✅ PASS : ECOMMERCE_026 - Average from subquery
```sql
SELECT ROUND(AVG(total_amount), 2) AS avg_order_total FROM (SELECT total_amount FROM orders) o;
```

### ✅ PASS : ECOMMERCE_027 - MAX order total
```sql
SELECT MAX(total_amount) AS max_order_total FROM orders;
```

### ✅ PASS : ECOMMERCE_027 - Top order total using ORDER BY
```sql
SELECT total_amount AS max_order_total FROM orders ORDER BY total_amount DESC LIMIT 1;
```

### ✅ PASS : ECOMMERCE_028 - MIN order total
```sql
SELECT MIN(total_amount) AS min_order_total FROM orders;
```

### ✅ PASS : ECOMMERCE_028 - Lowest order total using ORDER BY
```sql
SELECT total_amount AS min_order_total FROM orders ORDER BY total_amount ASC LIMIT 1;
```

### ✅ PASS : ECOMMERCE_029 - SUM all order totals
```sql
SELECT SUM(total_amount) AS total_revenue FROM orders;
```

### ✅ PASS : ECOMMERCE_029 - Sum revenue from subquery
```sql
SELECT SUM(total_amount) AS total_revenue FROM (SELECT total_amount FROM orders) o;
```

### ✅ PASS : ECOMMERCE_030 - AVG quantity per order item
```sql
SELECT ROUND(AVG(quantity), 2) AS avg_quantity FROM order_items;
```

### ✅ PASS : ECOMMERCE_030 - Average from quantity subquery
```sql
SELECT ROUND(AVG(quantity), 2) AS avg_quantity FROM (SELECT quantity FROM order_items) oi;
```

### ✅ PASS : ECOMMERCE_031 - AVG paid amount
```sql
SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments;
```

### ✅ PASS : ECOMMERCE_031 - Average from subquery
```sql
SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM (SELECT paid_amount FROM payments) p;
```

### ✅ PASS : ECOMMERCE_032 - MAX paid amount
```sql
SELECT MAX(paid_amount) AS max_paid_amount FROM payments;
```

### ✅ PASS : ECOMMERCE_032 - Top payment using ORDER BY
```sql
SELECT paid_amount AS max_paid_amount FROM payments ORDER BY paid_amount DESC LIMIT 1;
```

### ✅ PASS : ECOMMERCE_033 - MIN paid amount
```sql
SELECT MIN(paid_amount) AS min_paid_amount FROM payments;
```

### ✅ PASS : ECOMMERCE_033 - Lowest payment using ORDER BY
```sql
SELECT paid_amount AS min_paid_amount FROM payments ORDER BY paid_amount ASC LIMIT 1;
```

### ✅ PASS : ECOMMERCE_034 - SUM all order discounts
```sql
SELECT SUM(discount_amount) AS total_discount FROM orders;
```

### ✅ PASS : ECOMMERCE_034 - Sum discounts from subquery
```sql
SELECT SUM(discount_amount) AS total_discount FROM (SELECT discount_amount FROM orders) o;
```

### ✅ PASS : ECOMMERCE_035 - SUM all shipping fees
```sql
SELECT SUM(shipping_fee) AS total_shipping_fee FROM orders;
```

### ✅ PASS : ECOMMERCE_035 - Sum shipping fees from subquery
```sql
SELECT SUM(shipping_fee) AS total_shipping_fee FROM (SELECT shipping_fee FROM orders) o;
```

### ✅ PASS : ECOMMERCE_036 - SUM all tax amounts
```sql
SELECT SUM(tax_amount) AS total_tax FROM orders;
```

### ✅ PASS : ECOMMERCE_036 - Sum tax from subquery
```sql
SELECT SUM(tax_amount) AS total_tax FROM (SELECT tax_amount FROM orders) o;
```

### ✅ PASS : ECOMMERCE_037 - AVG age using EXTRACT and AGE
```sql
SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;
```

### ✅ PASS : ECOMMERCE_037 - AVG age using DATE_PART and AGE
```sql
SELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;
```

### ✅ PASS : ECOMMERCE_038 - Filter by created_at + COUNT
```sql
SELECT COUNT(*) AS count FROM products WHERE created_at > '2025-01-01';
```

### ✅ PASS : ECOMMERCE_038 - COUNT product IDs after date filter
```sql
SELECT COUNT(id) AS count FROM products WHERE created_at > '2025-01-01';
```

### ✅ PASS : ECOMMERCE_038 - Explicit TIMESTAMP literal
```sql
SELECT COUNT(*) AS count FROM products WHERE created_at > TIMESTAMP '2025-01-01';
```

### ✅ PASS : ECOMMERCE_039 - AVG age using DATE_PART and AGE
```sql
SELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;
```

### ✅ PASS : ECOMMERCE_039 - AVG age using EXTRACT and AGE
```sql
SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;
```

### ✅ PASS : ECOMMERCE_040 - SUM all paid amounts
```sql
SELECT SUM(paid_amount) AS total_paid_amount FROM payments;
```

### ✅ PASS : ECOMMERCE_040 - Sum paid amounts from subquery
```sql
SELECT SUM(paid_amount) AS total_paid_amount FROM (SELECT paid_amount FROM payments) p;
```

### ✅ PASS : ECOMMERCE_041 - GROUP BY customer
```sql
SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_041 - COUNT order IDs per customer
```sql
SELECT customer_id, COUNT(id) AS order_count FROM orders GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_042 - GROUP BY category
```sql
SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_042 - COUNT product IDs per category
```sql
SELECT category_id, COUNT(id) AS product_count FROM products GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_043 - GROUP BY product
```sql
SELECT product_id, COUNT(*) AS review_count FROM reviews GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_043 - COUNT review IDs per product
```sql
SELECT product_id, COUNT(id) AS review_count FROM reviews GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_044 - SUM revenue by customer
```sql
SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_044 - Sum revenue from subquery
```sql
SELECT customer_id, SUM(total_amount) AS total_revenue FROM (SELECT customer_id, total_amount FROM orders) o GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_045 - AVG order value by customer
```sql
SELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_045 - Average from subquery
```sql
SELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value FROM (SELECT customer_id, total_amount FROM orders) o GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_046 - SUM quantity by product
```sql
SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_046 - Sum quantity from subquery
```sql
SELECT product_id, SUM(quantity) AS total_quantity_sold FROM (SELECT product_id, quantity FROM order_items) oi GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_047 - SUM revenue by product
```sql
SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_047 - Calculate revenue using quantity and unit price
```sql
SELECT product_id, SUM((quantity * unit_price) - discount_amount) AS total_revenue FROM order_items GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_047 - Sum revenue from subquery
```sql
SELECT product_id, SUM(total_price) AS total_revenue FROM (SELECT product_id, total_price FROM order_items) oi GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_048 - AVG rating by product
```sql
SELECT product_id, ROUND(AVG(rating), 2) AS avg_rating FROM reviews GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_048 - Average from subquery
```sql
SELECT product_id, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT product_id, rating FROM reviews) r GROUP BY product_id;
```

### ✅ PASS : ECOMMERCE_049 - COUNT orders by status
```sql
SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status;
```

### ✅ PASS : ECOMMERCE_049 - COUNT order IDs by status
```sql
SELECT status, COUNT(id) AS order_count FROM orders GROUP BY status;
```

### ✅ PASS : ECOMMERCE_050 - COUNT payments by method
```sql
SELECT payment_method, COUNT(*) AS payment_count FROM payments GROUP BY payment_method;
```

### ✅ PASS : ECOMMERCE_050 - COUNT payment IDs by method
```sql
SELECT payment_method, COUNT(id) AS payment_count FROM payments GROUP BY payment_method;
```

### ✅ PASS : ECOMMERCE_051 - COUNT payments by status
```sql
SELECT payment_status, COUNT(*) AS payment_count FROM payments GROUP BY payment_status;
```

### ✅ PASS : ECOMMERCE_051 - COUNT payment IDs by status
```sql
SELECT payment_status, COUNT(id) AS payment_count FROM payments GROUP BY payment_status;
```

### ✅ PASS : ECOMMERCE_052 - AVG price by category
```sql
SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_052 - Average from subquery
```sql
SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM (SELECT category_id, price FROM products) p GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_053 - AVG stock quantity by category
```sql
SELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity FROM products GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_053 - Average stock from subquery
```sql
SELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity FROM (SELECT category_id, stock_quantity FROM products) p GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_054 - SUM paid amount by payment method
```sql
SELECT payment_method, SUM(paid_amount) AS total_paid_amount FROM payments GROUP BY payment_method;
```

### ✅ PASS : ECOMMERCE_054 - Sum paid amount from subquery
```sql
SELECT payment_method, SUM(paid_amount) AS total_paid_amount FROM (SELECT payment_method, paid_amount FROM payments) p GROUP BY payment_method;
```

### ✅ PASS : ECOMMERCE_055 - AVG paid amount by payment status
```sql
SELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments GROUP BY payment_status;
```

### ✅ PASS : ECOMMERCE_055 - Average from subquery
```sql
SELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM (SELECT payment_status, paid_amount FROM payments) p GROUP BY payment_status;
```

### ✅ PASS : ECOMMERCE_056 - Group by order date
```sql
SELECT DATE(order_date) AS order_day, COUNT(*) AS order_count FROM orders GROUP BY DATE(order_date);
```

### ✅ PASS : ECOMMERCE_056 - Group by casted date
```sql
SELECT order_date::date AS order_day, COUNT(*) AS order_count FROM orders GROUP BY order_date::date;
```

### ✅ PASS : ECOMMERCE_057 - Sum revenue by order date
```sql
SELECT DATE(order_date) AS order_day, SUM(total_amount) AS total_revenue FROM orders GROUP BY DATE(order_date);
```

### ✅ PASS : ECOMMERCE_057 - Sum revenue by casted date
```sql
SELECT order_date::date AS order_day, SUM(total_amount) AS total_revenue FROM orders GROUP BY order_date::date;
```

### ✅ PASS : ECOMMERCE_057 - Revenue from subquery
```sql
SELECT order_day, SUM(total_amount) AS total_revenue FROM (SELECT DATE(order_date) AS order_day, total_amount FROM orders) o GROUP BY order_day;
```

### ✅ PASS : ECOMMERCE_058 - Average order value by status
```sql
SELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders GROUP BY status;
```

### ✅ PASS : ECOMMERCE_058 - Average from subquery
```sql
SELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value FROM (SELECT status, total_amount FROM orders) o GROUP BY status;
```

### ✅ PASS : ECOMMERCE_059 - Count reviews by customer
```sql
SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_059 - Count review IDs by customer
```sql
SELECT customer_id, COUNT(id) AS review_count FROM reviews GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_060 - Average rating by customer
```sql
SELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating FROM reviews GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_060 - Average from subquery
```sql
SELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT customer_id, rating FROM reviews) r GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_061 - Join products and sum quantity by category
```sql
SELECT p.category_id, SUM(oi.quantity) AS total_quantity_sold FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_061 - Aggregate after subquery join
```sql
SELECT category_id, SUM(quantity) AS total_quantity_sold FROM (SELECT p.category_id, oi.quantity FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_062 - Join products and sum revenue by category
```sql
SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_062 - Calculate revenue using quantity and unit price
```sql
SELECT p.category_id, SUM((oi.quantity * oi.unit_price) - oi.discount_amount) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_062 - Aggregate after subquery join
```sql
SELECT category_id, SUM(total_price) AS total_revenue FROM (SELECT p.category_id, oi.total_price FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_063 - Join products and average review rating by category
```sql
SELECT p.category_id, ROUND(AVG(r.rating), 2) AS avg_rating FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_063 - Average ratings after subquery join
```sql
SELECT category_id, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT p.category_id, r.rating FROM reviews r JOIN products p ON r.product_id = p.id) x GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_064 - Join shipping address and count orders by city
```sql
SELECT a.city, COUNT(*) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;
```

### ✅ PASS : ECOMMERCE_064 - Count order IDs by city
```sql
SELECT a.city, COUNT(o.id) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;
```

### ✅ PASS : ECOMMERCE_064 - Aggregate after subquery join
```sql
SELECT city, COUNT(*) AS order_count FROM (SELECT a.city FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY city;
```

### ✅ PASS : ECOMMERCE_065 - Join shipping address and sum revenue by city
```sql
SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;
```

### ✅ PASS : ECOMMERCE_065 - Revenue by city from subquery
```sql
SELECT city, SUM(total_amount) AS total_revenue FROM (SELECT a.city, o.total_amount FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY city;
```

### ✅ PASS : ECOMMERCE_066 - Join shipping address and count orders by state
```sql
SELECT a.state, COUNT(*) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;
```

### ✅ PASS : ECOMMERCE_066 - Count order IDs by state
```sql
SELECT a.state, COUNT(o.id) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;
```

### ✅ PASS : ECOMMERCE_066 - Aggregate after subquery join
```sql
SELECT state, COUNT(*) AS order_count FROM (SELECT a.state FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY state;
```

### ✅ PASS : ECOMMERCE_067 - Join shipping address and sum revenue by state
```sql
SELECT a.state, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;
```

### ✅ PASS : ECOMMERCE_067 - Revenue by state from subquery
```sql
SELECT state, SUM(total_amount) AS total_revenue FROM (SELECT a.state, o.total_amount FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY state;
```

### ✅ PASS : ECOMMERCE_068 - Join products and count order items by brand
```sql
SELECT p.brand, COUNT(*) AS order_item_count FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;
```

### ✅ PASS : ECOMMERCE_068 - Count order item IDs by brand
```sql
SELECT p.brand, COUNT(oi.id) AS order_item_count FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;
```

### ✅ PASS : ECOMMERCE_068 - Aggregate after subquery join
```sql
SELECT brand, COUNT(*) AS order_item_count FROM (SELECT p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY brand;
```

### ✅ PASS : ECOMMERCE_069 - Join products and sum revenue by brand
```sql
SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;
```

### ✅ PASS : ECOMMERCE_069 - Calculate revenue using quantity and unit price
```sql
SELECT p.brand, SUM((oi.quantity * oi.unit_price) - oi.discount_amount) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;
```

### ✅ PASS : ECOMMERCE_069 - Revenue by brand from subquery
```sql
SELECT brand, SUM(total_price) AS total_revenue FROM (SELECT p.brand, oi.total_price FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY brand;
```

### ✅ PASS : ECOMMERCE_070 - AVG price by brand
```sql
SELECT brand, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY brand;
```

### ✅ PASS : ECOMMERCE_070 - Average from subquery
```sql
SELECT brand, ROUND(AVG(price), 2) AS avg_price FROM (SELECT brand, price FROM products) p GROUP BY brand;
```

### ✅ PASS : ECOMMERCE_071 - COUNT products by active status
```sql
SELECT is_active, COUNT(*) AS product_count FROM products GROUP BY is_active;
```

### ✅ PASS : ECOMMERCE_071 - COUNT product IDs by active status
```sql
SELECT is_active, COUNT(id) AS product_count FROM products GROUP BY is_active;
```

### ✅ PASS : ECOMMERCE_072 - COUNT customers by active status
```sql
SELECT is_active, COUNT(*) AS customer_count FROM customers GROUP BY is_active;
```

### ✅ PASS : ECOMMERCE_072 - COUNT customer IDs by active status
```sql
SELECT is_active, COUNT(id) AS customer_count FROM customers GROUP BY is_active;
```

### ✅ PASS : ECOMMERCE_073 - AVG rating by brand
```sql
SELECT brand, ROUND(AVG(rating), 2) AS avg_rating FROM products GROUP BY brand;
```

### ✅ PASS : ECOMMERCE_073 - Average from subquery
```sql
SELECT brand, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT brand, rating FROM products) p GROUP BY brand;
```

### ✅ PASS : ECOMMERCE_074 - Join products and count reviews by category
```sql
SELECT p.category_id, COUNT(*) AS review_count FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_074 - Count review IDs by category
```sql
SELECT p.category_id, COUNT(r.id) AS review_count FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_074 - Aggregate after subquery join
```sql
SELECT category_id, COUNT(*) AS review_count FROM (SELECT p.category_id FROM reviews r JOIN products p ON r.product_id = p.id) x GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_075 - Join shipping address and average order total by city
```sql
SELECT a.city, ROUND(AVG(o.total_amount), 2) AS avg_order_total FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;
```

### ✅ PASS : ECOMMERCE_075 - Average from subquery join
```sql
SELECT city, ROUND(AVG(total_amount), 2) AS avg_order_total FROM (SELECT a.city, o.total_amount FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY city;
```

### ✅ PASS : ECOMMERCE_076 - GROUP BY + ORDER BY + LIMIT
```sql
SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_076 - Subquery + ORDER BY + LIMIT
```sql
SELECT customer_id, total_revenue FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) x ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_077 - GROUP BY + ORDER BY + LIMIT
```sql
SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id ORDER BY total_quantity_sold DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_077 - Subquery + ORDER BY + LIMIT
```sql
SELECT product_id, total_quantity_sold FROM (SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id) x ORDER BY total_quantity_sold DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_078 - Join + GROUP BY + ORDER BY + LIMIT
```sql
SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_078 - Subquery + ORDER BY + LIMIT
```sql
SELECT category_id, total_revenue FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) x ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_079 - ROW_NUMBER window function
```sql
SELECT category_id, id AS product_id, rating FROM (SELECT category_id, id, rating, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY rating DESC, id ASC) AS rn FROM products) ranked WHERE rn = 1;
```

### ✅ PASS : ECOMMERCE_079 - Correlated subquery with MAX
```sql
SELECT p.category_id, p.id AS product_id, p.rating FROM products p WHERE p.id = (SELECT p2.id FROM products p2 WHERE p2.category_id = p.category_id ORDER BY p2.rating DESC, p2.id ASC LIMIT 1);
```

### ✅ PASS : ECOMMERCE_080 - GROUP BY + HAVING
```sql
SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 10;
```

### ✅ PASS : ECOMMERCE_080 - Subquery + WHERE filter
```sql
SELECT customer_id, order_count FROM (SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id) x WHERE order_count > 10;
```

### ✅ PASS : ECOMMERCE_081 - LEFT JOIN + IS NULL
```sql
SELECT p.id AS product_id FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE r.product_id IS NULL;
```

### ✅ PASS : ECOMMERCE_081 - NOT EXISTS
```sql
SELECT p.id AS product_id FROM products p WHERE NOT EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id);
```

### ✅ PASS : ECOMMERCE_081 - NOT IN
```sql
SELECT id AS product_id FROM products WHERE id NOT IN (SELECT product_id FROM reviews);
```

### ✅ PASS : ECOMMERCE_082 - LEFT JOIN + IS NULL
```sql
SELECT c.id AS customer_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.customer_id IS NULL;
```

### ✅ PASS : ECOMMERCE_082 - NOT EXISTS
```sql
SELECT c.id AS customer_id FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
```

### ✅ PASS : ECOMMERCE_082 - NOT IN
```sql
SELECT c.id AS customer_id FROM customers c WHERE c.id NOT IN (SELECT DISTINCT o.customer_id FROM orders o WHERE o.customer_id IS NOT NULL);
```

### ✅ PASS : ECOMMERCE_083 - Join with category average subquery
```sql
SELECT p.id AS product_id, p.category_id, p.price FROM products p JOIN (SELECT category_id, AVG(price) AS avg_price FROM products GROUP BY category_id) c ON p.category_id = c.category_id WHERE p.price > c.avg_price;
```

### ✅ PASS : ECOMMERCE_083 - Correlated subquery
```sql
SELECT p.id AS product_id, p.category_id, p.price FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id);
```

### ✅ PASS : ECOMMERCE_083 - Window function average
```sql
SELECT product_id, category_id, price FROM (SELECT id AS product_id, category_id, price, AVG(price) OVER (PARTITION BY category_id) AS avg_price FROM products) x WHERE price > avg_price;
```

### ✅ PASS : ECOMMERCE_084 - GROUP BY + HAVING
```sql
SELECT customer_id, COUNT(*) AS address_count FROM addresses GROUP BY customer_id HAVING COUNT(*) > 1;
```

### ✅ PASS : ECOMMERCE_084 - Count address IDs + HAVING
```sql
SELECT customer_id, COUNT(id) AS address_count FROM addresses GROUP BY customer_id HAVING COUNT(id) > 1;
```

### ✅ PASS : ECOMMERCE_084 - Subquery + WHERE
```sql
SELECT customer_id, address_count FROM (SELECT customer_id, COUNT(*) AS address_count FROM addresses GROUP BY customer_id) x WHERE address_count > 1;
```

### ✅ PASS : ECOMMERCE_085 - MAX order date by customer
```sql
SELECT customer_id, MAX(order_date) AS latest_order_date FROM orders GROUP BY customer_id;
```

### ✅ PASS : ECOMMERCE_085 - Subquery with MAX
```sql
SELECT customer_id, latest_order_date FROM (SELECT customer_id, MAX(order_date) AS latest_order_date FROM orders GROUP BY customer_id) x;
```

### ✅ PASS : ECOMMERCE_085 - ROW_NUMBER window function
```sql
SELECT customer_id, order_date AS latest_order_date FROM (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) x WHERE rn = 1;
```

### ✅ PASS : ECOMMERCE_086 - Join + GROUP BY + ORDER BY + LIMIT
```sql
SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_086 - Subquery + ORDER BY + LIMIT
```sql
SELECT brand, total_revenue FROM (SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand) x ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_087 - Join + GROUP BY + ORDER BY + LIMIT
```sql
SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_087 - Subquery + ORDER BY + LIMIT
```sql
SELECT city, total_revenue FROM (SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city) x ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_088 - COUNT DISTINCT orders + HAVING
```sql
SELECT product_id, COUNT(DISTINCT order_id) AS order_count FROM order_items GROUP BY product_id HAVING COUNT(DISTINCT order_id) > 100;
```

### ✅ PASS : ECOMMERCE_088 - Subquery + WHERE filter
```sql
SELECT product_id, order_count FROM (SELECT product_id, COUNT(DISTINCT order_id) AS order_count FROM order_items GROUP BY product_id) x WHERE order_count > 100;
```

### ✅ PASS : ECOMMERCE_089 - GROUP BY + HAVING
```sql
SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id HAVING COUNT(*) > 5;
```

### ✅ PASS : ECOMMERCE_089 - Subquery + WHERE filter
```sql
SELECT customer_id, review_count FROM (SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id) x WHERE review_count > 5;
```

### ✅ PASS : ECOMMERCE_089 - Count review IDs + HAVING
```sql
SELECT customer_id, COUNT(id) AS review_count FROM reviews GROUP BY customer_id HAVING COUNT(id) > 5;
```

### ✅ PASS : ECOMMERCE_090 - Join + AVG by category
```sql
SELECT p.category_id, ROUND(AVG(oi.total_price), 2) AS avg_revenue_per_item FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_090 - Average revenue from subquery join
```sql
SELECT category_id, ROUND(AVG(total_price), 2) AS avg_revenue_per_item FROM (SELECT p.category_id, oi.total_price FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY category_id;
```

### ✅ PASS : ECOMMERCE_090 - Calculate from quantity and unit price
```sql
SELECT p.category_id, ROUND(AVG((oi.quantity * oi.unit_price) - oi.discount_amount), 2) AS avg_revenue_per_item FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;
```

### ✅ PASS : ECOMMERCE_091 - GROUP BY + ORDER BY + LIMIT
```sql
SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_091 - Subquery + ORDER BY + LIMIT
```sql
SELECT product_id, total_revenue FROM (SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id) x ORDER BY total_revenue DESC LIMIT 5;
```

### ✅ PASS : ECOMMERCE_092 - Aggregate customer revenue and compare to average
```sql
SELECT customer_id, total_revenue FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) customer_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) avg_customer_revenue);
```

### ✅ PASS : ECOMMERCE_092 - CTE based comparison
```sql
WITH customer_revenue AS (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) SELECT customer_id, total_revenue FROM customer_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM customer_revenue);
```

### ✅ PASS : ECOMMERCE_093 - Join with brand average subquery
```sql
SELECT p.id AS product_id, p.brand, p.price FROM products p JOIN (SELECT brand, AVG(price) AS avg_price FROM products GROUP BY brand) b ON p.brand = b.brand WHERE p.price > b.avg_price;
```

### ✅ PASS : ECOMMERCE_093 - Correlated subquery
```sql
SELECT p.id AS product_id, p.brand, p.price FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.brand = p.brand);
```

### ✅ PASS : ECOMMERCE_093 - Window function average
```sql
SELECT product_id, brand, price FROM (SELECT id AS product_id, brand, price, AVG(price) OVER (PARTITION BY brand) AS avg_price FROM products) x WHERE price > avg_price;
```

### ✅ PASS : ECOMMERCE_094 - Join orders, items, and products with COUNT DISTINCT
```sql
SELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id GROUP BY o.customer_id HAVING COUNT(DISTINCT p.category_id) > 3;
```

### ✅ PASS : ECOMMERCE_094 - Subquery + WHERE filter
```sql
SELECT customer_id, category_count FROM (SELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id GROUP BY o.customer_id) x WHERE category_count > 3;
```

### ✅ PASS : ECOMMERCE_095 - ROW_NUMBER by city and customer revenue
```sql
SELECT city, customer_id, total_revenue FROM (SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY a.city ORDER BY SUM(o.total_amount) DESC, o.customer_id ASC) AS rn FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city, o.customer_id) ranked WHERE rn <= 3;
```

### ✅ PASS : ECOMMERCE_095 - DENSE_RANK by city
```sql
SELECT city, customer_id, total_revenue FROM (SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue, DENSE_RANK() OVER (PARTITION BY a.city ORDER BY SUM(o.total_amount) DESC) AS rnk FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city, o.customer_id) ranked WHERE rnk <= 3;
```

### ✅ PASS : ECOMMERCE_096 - Monthly aggregate + running total window
```sql
SELECT revenue_month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total FROM (SELECT DATE_TRUNC('month', order_date)::date AS revenue_month, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY DATE_TRUNC('month', order_date)::date) monthly_data;
```

### ✅ PASS : ECOMMERCE_096 - CTE + running total window
```sql
WITH monthly_data AS (SELECT DATE_TRUNC('month', order_date)::date AS revenue_month, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY DATE_TRUNC('month', order_date)::date) SELECT revenue_month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total FROM monthly_data;
```

### ✅ PASS : ECOMMERCE_097 - GROUP BY + conditional count comparison
```sql
SELECT o.customer_id FROM orders o JOIN payments p ON o.id = p.order_id GROUP BY o.customer_id HAVING COUNT(*) = COUNT(CASE WHEN p.payment_status = 'completed' THEN 1 END);
```

### ✅ PASS : ECOMMERCE_097 - HAVING with MIN status check
```sql
SELECT o.customer_id FROM orders o JOIN payments p ON o.id = p.order_id GROUP BY o.customer_id HAVING MIN(CASE WHEN p.payment_status = 'completed' THEN 1 ELSE 0 END) = 1;
```

### ✅ PASS : ECOMMERCE_098 - ROW_NUMBER by brand and quantity sold
```sql
SELECT brand, product_id, total_quantity_sold FROM (SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold, ROW_NUMBER() OVER (PARTITION BY p.brand ORDER BY SUM(oi.quantity) DESC, oi.product_id ASC) AS rn FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand, oi.product_id) ranked WHERE rn = 1;
```

### ✅ PASS : ECOMMERCE_098 - Correlated subquery with MAX quantity
```sql
WITH brand_product_qty AS (SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand, oi.product_id) SELECT x.brand, x.product_id, x.total_quantity_sold FROM brand_product_qty x WHERE x.product_id = (SELECT y.product_id FROM brand_product_qty y WHERE y.brand = x.brand ORDER BY y.total_quantity_sold DESC, y.product_id ASC LIMIT 1);
```

### ✅ PASS : ECOMMERCE_099 - Category revenue compared to average category revenue
```sql
SELECT category_id, total_revenue FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) category_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) avg_category_revenue);
```

### ✅ PASS : ECOMMERCE_099 - CTE based comparison
```sql
WITH category_revenue AS (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) SELECT category_id, total_revenue FROM category_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM category_revenue);
```

### ✅ PASS : ECOMMERCE_100 - Distinct months + LAG
```sql
SELECT DISTINCT customer_id FROM (SELECT customer_id, order_month, LAG(order_month) OVER (PARTITION BY customer_id ORDER BY order_month) AS prev_month FROM (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) monthly_orders) x WHERE prev_month = (order_month - INTERVAL '1 month')::date;
```

### ✅ PASS : ECOMMERCE_100 - Self join on distinct customer months
```sql
SELECT DISTINCT m1.customer_id FROM (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) m1 JOIN (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) m2 ON m1.customer_id = m2.customer_id AND m2.order_month = (m1.order_month + INTERVAL '1 month')::date;
```

