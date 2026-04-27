import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("ecommerce");

export const tableDescriptions = {
  addresses: "Stores customer billing and shipping addresses",
  categories: "Stores product categories",
  customers: "Stores customer information",
  order_items: "Stores items for each order",
  orders: "Stores orders placed by customers",
  payments: "Stores payment transactions",
  products: "Stores product catalog",
  reviews: "Stores product reviews",
};

export const questions = [
  {"app_id":appId,"code":"ECOMMERCE_001","title":"Total Number of Customers","description":"Find the total number of customers registered on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM customers;","solution_columns":["count"],"tables":["customers"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_002","title":"Total Number of Products","description":"Find the total number of products available in the catalog.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_003","title":"Total Number of Orders","description":"Find the total number of orders placed on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM orders;","solution_columns":["count"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_004","title":"Total Number of Categories","description":"Find the total number of product categories.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM categories;","solution_columns":["count"],"tables":["categories"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_005","title":"Active Products Count","description":"Find the number of active products currently available.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE is_active = TRUE;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_006","title":"Inactive Products Count","description":"Find the number of inactive products in the catalog.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE is_active = FALSE;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_007","title":"Total Number of Reviews","description":"Find the total number of reviews submitted by customers.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM reviews;","solution_columns":["count"],"tables":["reviews"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_008","title":"Total Number of Payments","description":"Find the total number of payment records.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM payments;","solution_columns":["count"],"tables":["payments"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_009","title":"Products With Stock Less Than 10","description":"Find the number of products whose stock quantity is less than 10.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE stock_quantity < 10;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_010","title":"Delivered Orders Count","description":"Find the number of orders that were delivered.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM orders WHERE status = 'delivered';","solution_columns":["count"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_011","title":"Cancelled Orders Count","description":"Find the number of orders that were cancelled.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM orders WHERE status = 'cancelled';","solution_columns":["count"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_012","title":"Returned Orders Count","description":"Find the number of orders that were returned.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM orders WHERE status = 'returned';","solution_columns":["count"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_013","title":"Products Priced Above 1000","description":"Find the number of products whose price is greater than 1000.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE price > 1000;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_014","title":"Customers With Phone Number","description":"Find the number of customers who have a phone number.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM customers WHERE phone IS NOT NULL AND phone <> '';","solution_columns":["count"],"tables":["customers"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_015","title":"Products With Rating 4 or Above","description":"Find the number of products whose rating is 4 or higher.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE rating >= 4;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_016","title":"Customers Without Phone Number","description":"Find the number of customers who do not have a phone number.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM customers WHERE phone IS NULL OR phone = '';","solution_columns":["count"],"tables":["customers"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_017","title":"Pending Orders Count","description":"Find the number of orders that are currently pending.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM orders WHERE status = 'pending';","solution_columns":["count"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_018","title":"Completed Payments Count","description":"Find the number of payments with completed status.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM payments WHERE payment_status = 'completed';","solution_columns":["count"],"tables":["payments"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_019","title":"Products With Zero Stock","description":"Find the number of products whose stock quantity is exactly zero.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE stock_quantity = 0;","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_020","title":"Customers Registered After 2025-01-01","description":"Find the number of customers who registered after January 1, 2025.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM customers WHERE created_at > '2025-01-01';","solution_columns":["count"],"tables":["customers"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_021","title":"Average Product Price","description":"Find the average price of all products in the catalog.","difficulty":"easy","expected_query":"SELECT AVG(price) AS avg_price FROM products;","solution_columns":["avg_price"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_022","title":"Maximum Product Price","description":"Find the highest product price in the catalog.","difficulty":"easy","expected_query":"SELECT MAX(price) AS max_price FROM products;","solution_columns":["max_price"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_023","title":"Minimum Product Price","description":"Find the lowest product price in the catalog.","difficulty":"easy","expected_query":"SELECT MIN(price) AS min_price FROM products;","solution_columns":["min_price"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_024","title":"Average Product Rating","description":"Find the average rating of all products.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(rating), 2) AS avg_rating FROM products;","solution_columns":["avg_rating"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_025","title":"Total Stock Quantity","description":"Find the total stock quantity across all products.","difficulty":"easy","expected_query":"SELECT SUM(stock_quantity) AS total_stock FROM products;","solution_columns":["total_stock"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_026","title":"Average Order Total","description":"Find the average total amount of all orders.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(total_amount), 2) AS avg_order_total FROM orders;","solution_columns":["avg_order_total"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_027","title":"Highest Order Total","description":"Find the highest total amount among all orders.","difficulty":"easy","expected_query":"SELECT MAX(total_amount) AS max_order_total FROM orders;","solution_columns":["max_order_total"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_028","title":"Lowest Order Total","description":"Find the lowest total amount among all orders.","difficulty":"easy","expected_query":"SELECT MIN(total_amount) AS min_order_total FROM orders;","solution_columns":["min_order_total"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_029","title":"Total Revenue From Orders","description":"Find the total revenue generated from all orders.","difficulty":"easy","expected_query":"SELECT SUM(total_amount) AS total_revenue FROM orders;","solution_columns":["total_revenue"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_030","title":"Average Quantity Per Order Item","description":"Find the average quantity ordered per order item.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(quantity), 2) AS avg_quantity FROM order_items;","solution_columns":["avg_quantity"],"tables":["order_items"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_031","title":"Average Payment Amount","description":"Find the average paid amount across all payment records.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments;","solution_columns":["avg_paid_amount"],"tables":["payments"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_032","title":"Highest Payment Amount","description":"Find the highest paid amount among all payment records.","difficulty":"easy","expected_query":"SELECT MAX(paid_amount) AS max_paid_amount FROM payments;","solution_columns":["max_paid_amount"],"tables":["payments"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_033","title":"Lowest Payment Amount","description":"Find the lowest paid amount among all payment records.","difficulty":"easy","expected_query":"SELECT MIN(paid_amount) AS min_paid_amount FROM payments;","solution_columns":["min_paid_amount"],"tables":["payments"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_034","title":"Total Discount Given on Orders","description":"Find the total discount amount given across all orders.","difficulty":"easy","expected_query":"SELECT SUM(discount_amount) AS total_discount FROM orders;","solution_columns":["total_discount"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_035","title":"Total Shipping Fee Collected","description":"Find the total shipping fee collected from all orders.","difficulty":"easy","expected_query":"SELECT SUM(shipping_fee) AS total_shipping_fee FROM orders;","solution_columns":["total_shipping_fee"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_036","title":"Total Tax Collected","description":"Find the total tax amount collected across all orders.","difficulty":"easy","expected_query":"SELECT SUM(tax_amount) AS total_tax FROM orders;","solution_columns":["total_tax"],"tables":["orders"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_037","title":"Average Customer Age","description":"Find the average age of customers in years.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;","solution_columns":["avg_age"],"tables":["customers"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_038","title":"Products Created After 2025-01-01","description":"Find the number of products created after January 1, 2025.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS count FROM products WHERE created_at > '2025-01-01';","solution_columns":["count"],"tables":["products"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_039","title":"Average Customer Age By Birth Date","description":"Find the average customer age in years using the date of birth column.","difficulty":"easy","expected_query":"SELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;","solution_columns":["avg_age"],"tables":["customers"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_040","title":"Total Paid Amount","description":"Find the total paid amount across all payment records.","difficulty":"easy","expected_query":"SELECT SUM(paid_amount) AS total_paid_amount FROM payments;","solution_columns":["total_paid_amount"],"tables":["payments"],"comparison_config":{}},
  {"app_id":appId,"code":"ECOMMERCE_041","title":"Orders Per Customer","description":"Find each customer and the total number of orders they have placed.","difficulty":"medium","expected_query":"SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id;","solution_columns":["customer_id","order_count"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_042","title":"Products Per Category","description":"Find each category and the total number of products in it.","difficulty":"medium","expected_query":"SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;","solution_columns":["category_id","product_count"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_043","title":"Reviews Per Product","description":"Find each product and the total number of reviews it has received.","difficulty":"medium","expected_query":"SELECT product_id, COUNT(*) AS review_count FROM reviews GROUP BY product_id;","solution_columns":["product_id","review_count"],"tables":["reviews"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_044","title":"Total Revenue Per Customer","description":"Find each customer and the total revenue generated from their orders.","difficulty":"medium","expected_query":"SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id;","solution_columns":["customer_id","total_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_045","title":"Average Order Value Per Customer","description":"Find each customer and their average order value.","difficulty":"medium","expected_query":"SELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders GROUP BY customer_id;","solution_columns":["customer_id","avg_order_value"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_046","title":"Total Quantity Sold Per Product","description":"Find each product and the total quantity sold across all order items.","difficulty":"medium","expected_query":"SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id;","solution_columns":["product_id","total_quantity_sold"],"tables":["order_items"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_047","title":"Total Revenue Per Product","description":"Find each product and the total revenue generated from it based on order items.","difficulty":"medium","expected_query":"SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id;","solution_columns":["product_id","total_revenue"],"tables":["order_items"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_048","title":"Average Rating Per Product","description":"Find each product and its average review rating.","difficulty":"medium","expected_query":"SELECT product_id, ROUND(AVG(rating), 2) AS avg_rating FROM reviews GROUP BY product_id;","solution_columns":["product_id","avg_rating"],"tables":["reviews"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_049","title":"Orders Count By Status","description":"Find each order status and the total number of orders in that status.","difficulty":"medium","expected_query":"SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status;","solution_columns":["status","order_count"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_050","title":"Payments Count By Method","description":"Find each payment method and the total number of payments made using it.","difficulty":"medium","expected_query":"SELECT payment_method, COUNT(*) AS payment_count FROM payments GROUP BY payment_method;","solution_columns":["payment_method","payment_count"],"tables":["payments"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_051","title":"Payments Count By Status","description":"Find each payment status and the total number of payments in that status.","difficulty":"medium","expected_query":"SELECT payment_status, COUNT(*) AS payment_count FROM payments GROUP BY payment_status;","solution_columns":["payment_status","payment_count"],"tables":["payments"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_052","title":"Average Product Price By Category","description":"Find each category and the average price of products in that category.","difficulty":"medium","expected_query":"SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id;","solution_columns":["category_id","avg_price"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_053","title":"Average Stock Quantity By Category","description":"Find each category and the average stock quantity of products in that category.","difficulty":"medium","expected_query":"SELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity FROM products GROUP BY category_id;","solution_columns":["category_id","avg_stock_quantity"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_054","title":"Total Revenue By Payment Method","description":"Find each payment method and the total paid amount collected through it.","difficulty":"medium","expected_query":"SELECT payment_method, SUM(paid_amount) AS total_paid_amount FROM payments GROUP BY payment_method;","solution_columns":["payment_method","total_paid_amount"],"tables":["payments"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_055","title":"Average Paid Amount By Payment Status","description":"Find each payment status and the average paid amount for that status.","difficulty":"medium","expected_query":"SELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments GROUP BY payment_status;","solution_columns":["payment_status","avg_paid_amount"],"tables":["payments"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_056","title":"Total Orders By Day","description":"Find each order date and the total number of orders placed on that day.","difficulty":"medium","expected_query":"SELECT DATE(order_date) AS order_day, COUNT(*) AS order_count FROM orders GROUP BY DATE(order_date);","solution_columns":["order_day","order_count"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_057","title":"Total Revenue By Day","description":"Find each order date and the total revenue generated on that day.","difficulty":"medium","expected_query":"SELECT DATE(order_date) AS order_day, SUM(total_amount) AS total_revenue FROM orders GROUP BY DATE(order_date);","solution_columns":["order_day","total_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_058","title":"Average Order Value By Status","description":"Find each order status and the average total amount of orders in that status.","difficulty":"medium","expected_query":"SELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders GROUP BY status;","solution_columns":["status","avg_order_value"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_059","title":"Total Products Reviewed By Customer","description":"Find each customer and the total number of reviews they have submitted.","difficulty":"medium","expected_query":"SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id;","solution_columns":["customer_id","review_count"],"tables":["reviews"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_060","title":"Average Review Rating By Customer","description":"Find each customer and their average review rating.","difficulty":"medium","expected_query":"SELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating FROM reviews GROUP BY customer_id;","solution_columns":["customer_id","avg_rating"],"tables":["reviews"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_061","title":"Total Quantity Sold By Category","description":"Find each category and the total quantity of products sold in that category.","difficulty":"medium","expected_query":"SELECT p.category_id, SUM(oi.quantity) AS total_quantity_sold FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;","solution_columns":["category_id","total_quantity_sold"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_062","title":"Total Revenue By Category","description":"Find each category and the total revenue generated from products in that category.","difficulty":"medium","expected_query":"SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;","solution_columns":["category_id","total_revenue"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_063","title":"Average Product Rating By Category","description":"Find each category and the average rating of products in that category based on reviews.","difficulty":"medium","expected_query":"SELECT p.category_id, ROUND(AVG(r.rating), 2) AS avg_rating FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;","solution_columns":["category_id","avg_rating"],"tables":["reviews","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_064","title":"Total Orders By Customer City","description":"Find each city and the total number of orders placed by customers whose shipping address is in that city.","difficulty":"medium","expected_query":"SELECT a.city, COUNT(*) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;","solution_columns":["city","order_count"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_065","title":"Total Revenue By Customer City","description":"Find each city and the total revenue generated from orders shipped to that city.","difficulty":"medium","expected_query":"SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;","solution_columns":["city","total_revenue"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_066","title":"Orders Count By Customer State","description":"Find each state and the total number of orders shipped to that state.","difficulty":"medium","expected_query":"SELECT a.state, COUNT(*) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;","solution_columns":["state","order_count"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_067","title":"Revenue By Customer State","description":"Find each state and the total revenue generated from orders shipped to that state.","difficulty":"medium","expected_query":"SELECT a.state, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;","solution_columns":["state","total_revenue"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_068","title":"Orders Count By Product Brand","description":"Find each product brand and the total number of order item rows associated with it.","difficulty":"medium","expected_query":"SELECT p.brand, COUNT(*) AS order_item_count FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;","solution_columns":["brand","order_item_count"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_069","title":"Revenue By Product Brand","description":"Find each product brand and the total revenue generated from order items of that brand.","difficulty":"medium","expected_query":"SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;","solution_columns":["brand","total_revenue"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_070","title":"Average Product Price By Brand","description":"Find each product brand and the average price of products under that brand.","difficulty":"medium","expected_query":"SELECT brand, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY brand;","solution_columns":["brand","avg_price"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_071","title":"Products Count By Active Status","description":"Find each product active status and the total number of products in that status.","difficulty":"medium","expected_query":"SELECT is_active, COUNT(*) AS product_count FROM products GROUP BY is_active;","solution_columns":["is_active","product_count"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_072","title":"Customers Count By Active Status","description":"Find each customer active status and the total number of customers in that status.","difficulty":"medium","expected_query":"SELECT is_active, COUNT(*) AS customer_count FROM customers GROUP BY is_active;","solution_columns":["is_active","customer_count"],"tables":["customers"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_073","title":"Average Product Rating By Brand","description":"Find each product brand and the average rating of products under that brand.","difficulty":"medium","expected_query":"SELECT brand, ROUND(AVG(rating), 2) AS avg_rating FROM products GROUP BY brand;","solution_columns":["brand","avg_rating"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_074","title":"Total Review Count By Category","description":"Find each category and the total number of reviews received by products in that category.","difficulty":"medium","expected_query":"SELECT p.category_id, COUNT(*) AS review_count FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;","solution_columns":["category_id","review_count"],"tables":["reviews","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_075","title":"Average Order Total By Shipping City","description":"Find each shipping city and the average total amount of orders shipped there.","difficulty":"medium","expected_query":"SELECT a.city, ROUND(AVG(o.total_amount), 2) AS avg_order_total FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;","solution_columns":["city","avg_order_total"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_076","title":"Top 5 Customers By Revenue","description":"Retrieve the top 5 customers who generated the highest total revenue from their orders.","difficulty":"hard","expected_query":"SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id ORDER BY total_revenue DESC LIMIT 5;","solution_columns":["customer_id","total_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"}]}},
  {"app_id":appId,"code":"ECOMMERCE_077","title":"Top 5 Products By Quantity Sold","description":"Retrieve the top 5 products with the highest total quantity sold across all order items.","difficulty":"hard","expected_query":"SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id ORDER BY total_quantity_sold DESC LIMIT 5;","solution_columns":["product_id","total_quantity_sold"],"tables":["order_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_quantity_sold","direction":"desc"}]}},
  {"app_id":appId,"code":"ECOMMERCE_078","title":"Top 5 Categories By Revenue","description":"Retrieve the top 5 categories that generated the highest total revenue.","difficulty":"hard","expected_query":"SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id ORDER BY total_revenue DESC LIMIT 5;","solution_columns":["category_id","total_revenue"],"tables":["order_items","products"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"}]}},
  {"app_id":appId,"code":"ECOMMERCE_079","title":"Highest Rated Product In Each Category","description":"Find the highest rated product in each category.","difficulty":"hard","expected_query":"SELECT category_id, id AS product_id, rating FROM (SELECT category_id, id, rating, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY rating DESC, id ASC) AS rn FROM products) ranked WHERE rn = 1;","solution_columns":["category_id","product_id","rating"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_080","title":"Customers With More Than 10 Orders","description":"Find customers who have placed more than 10 orders along with their order count.","difficulty":"hard","expected_query":"SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 10;","solution_columns":["customer_id","order_count"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_081","title":"Products With No Reviews","description":"Find all products that have not received any reviews.","difficulty":"hard","expected_query":"SELECT p.id AS product_id FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE r.product_id IS NULL;","solution_columns":["product_id"],"tables":["products","reviews"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_082","title":"Customers With No Orders","description":"Find all customers who have never placed an order.","difficulty":"hard","expected_query":"SELECT c.id AS customer_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.customer_id IS NULL;","solution_columns":["customer_id"],"tables":["customers","orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_083","title":"Products Priced Above Category Average","description":"Find products whose price is greater than the average price of their category.","difficulty":"hard","expected_query":"SELECT p.id AS product_id, p.category_id, p.price FROM products p JOIN (SELECT category_id, AVG(price) AS avg_price FROM products GROUP BY category_id) c ON p.category_id = c.category_id WHERE p.price > c.avg_price;","solution_columns":["product_id","category_id","price"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_084","title":"Customers With More Than One Address","description":"Find customers who have more than one address along with their address count.","difficulty":"hard","expected_query":"SELECT customer_id, COUNT(*) AS address_count FROM addresses GROUP BY customer_id HAVING COUNT(*) > 1;","solution_columns":["customer_id","address_count"],"tables":["addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_085","title":"Most Recent Order Per Customer","description":"Find the most recent order date for each customer.","difficulty":"hard","expected_query":"SELECT customer_id, MAX(order_date) AS latest_order_date FROM orders GROUP BY customer_id;","solution_columns":["customer_id","latest_order_date"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_086","title":"Top 5 Brands By Revenue","description":"Retrieve the top 5 brands that generated the highest total revenue.","difficulty":"hard","expected_query":"SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand ORDER BY total_revenue DESC LIMIT 5;","solution_columns":["brand","total_revenue"],"tables":["order_items","products"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"}]}},
  {"app_id":appId,"code":"ECOMMERCE_087","title":"Top 5 Cities By Revenue","description":"Retrieve the top 5 shipping cities that generated the highest total revenue.","difficulty":"hard","expected_query":"SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city ORDER BY total_revenue DESC LIMIT 5;","solution_columns":["city","total_revenue"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"}]}},
  {"app_id":appId,"code":"ECOMMERCE_088","title":"Products Ordered In More Than 100 Orders","description":"Find products that appear in more than 100 distinct orders along with the order count.","difficulty":"hard","expected_query":"SELECT product_id, COUNT(DISTINCT order_id) AS order_count FROM order_items GROUP BY product_id HAVING COUNT(DISTINCT order_id) > 100;","solution_columns":["product_id","order_count"],"tables":["order_items"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_089","title":"Customers Who Reviewed More Than 5 Products","description":"Find customers who have submitted reviews for more than 5 products.","difficulty":"hard","expected_query":"SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id HAVING COUNT(*) > 5;","solution_columns":["customer_id","review_count"],"tables":["reviews"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_090","title":"Average Revenue Per Order By Category","description":"Find each category and the average revenue per order item for products in that category.","difficulty":"hard","expected_query":"SELECT p.category_id, ROUND(AVG(oi.total_price), 2) AS avg_revenue_per_item FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;","solution_columns":["category_id","avg_revenue_per_item"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_091","title":"Top 5 Products By Revenue","description":"Retrieve the top 5 products that generated the highest total revenue.","difficulty":"hard","expected_query":"SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id ORDER BY total_revenue DESC LIMIT 5;","solution_columns":["product_id","total_revenue"],"tables":["order_items"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_revenue","direction":"desc"}]}},
  {"app_id":appId,"code":"ECOMMERCE_092","title":"Customers Whose Total Revenue Is Above Average Customer Revenue","description":"Find customers whose total revenue is greater than the average revenue generated per customer.","difficulty":"hard","expected_query":"SELECT customer_id, total_revenue FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) customer_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) avg_customer_revenue);","solution_columns":["customer_id","total_revenue"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_093","title":"Products With Price Greater Than Brand Average","description":"Find products whose price is greater than the average price of products under the same brand.","difficulty":"hard","expected_query":"SELECT p.id AS product_id, p.brand, p.price FROM products p JOIN (SELECT brand, AVG(price) AS avg_price FROM products GROUP BY brand) b ON p.brand = b.brand WHERE p.price > b.avg_price;","solution_columns":["product_id","brand","price"],"tables":["products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_094","title":"Customers Who Ordered From More Than 3 Categories","description":"Find customers who have purchased products from more than 3 distinct categories.","difficulty":"hard","expected_query":"SELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id GROUP BY o.customer_id HAVING COUNT(DISTINCT p.category_id) > 3;","solution_columns":["customer_id","category_count"],"tables":["orders","order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_095","title":"Top 3 Customers Per City By Revenue","description":"For each shipping city, retrieve the top 3 customers by total revenue.","difficulty":"hard","expected_query":"SELECT city, customer_id, total_revenue FROM (SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY a.city ORDER BY SUM(o.total_amount) DESC, o.customer_id ASC) AS rn FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city, o.customer_id) ranked WHERE rn <= 3;","solution_columns":["city","customer_id","total_revenue"],"tables":["orders","addresses"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_096","title":"Monthly Revenue Running Total","description":"For each month, calculate the total revenue and the running total revenue ordered by month.","difficulty":"hard","expected_query":"SELECT revenue_month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total FROM (SELECT DATE_TRUNC('month', order_date)::date AS revenue_month, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY DATE_TRUNC('month', order_date)::date) monthly_data;","solution_columns":["revenue_month","monthly_revenue","running_total"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_097","title":"Customers Who Have Only Completed Payments","description":"Find customers for whom every payment associated with their orders has completed status.","difficulty":"hard","expected_query":"SELECT o.customer_id FROM orders o JOIN payments p ON o.id = p.order_id GROUP BY o.customer_id HAVING COUNT(*) = COUNT(CASE WHEN p.payment_status = 'completed' THEN 1 END);","solution_columns":["customer_id"],"tables":["orders","payments"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_098","title":"Most Ordered Product In Each Brand","description":"Find the product with the highest total quantity sold within each brand.","difficulty":"hard","expected_query":"SELECT brand, product_id, total_quantity_sold FROM (SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold, ROW_NUMBER() OVER (PARTITION BY p.brand ORDER BY SUM(oi.quantity) DESC, oi.product_id ASC) AS rn FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand, oi.product_id) ranked WHERE rn = 1;","solution_columns":["brand","product_id","total_quantity_sold"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_099","title":"Categories With Above Average Revenue","description":"Find categories whose total revenue is greater than the average category revenue.","difficulty":"hard","expected_query":"SELECT category_id, total_revenue FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) category_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) avg_category_revenue);","solution_columns":["category_id","total_revenue"],"tables":["order_items","products"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"ECOMMERCE_100","title":"Customers With Consecutive Month Orders","description":"Find customers who placed orders in at least two consecutive months.","difficulty":"hard","expected_query":"SELECT DISTINCT customer_id FROM (SELECT customer_id, order_month, LAG(order_month) OVER (PARTITION BY customer_id ORDER BY order_month) AS prev_month FROM (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) monthly_orders) x WHERE prev_month = (order_month - INTERVAL '1 month')::date;","solution_columns":["customer_id"],"tables":["orders"],"comparison_config":{"ignore_order":true}},
];

export const hints = [
  {
    "code": "ECOMMERCE_001",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the total number of rows in the customers table."
      },
      {
        "hint_order": 2,
        "content": "Use an aggregate function that counts rows."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) from customers."
      }
    ]
  },
  {
    "code": "ECOMMERCE_002",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the total number of products in the catalog."
      },
      {
        "hint_order": 2,
        "content": "Count all rows from the products table."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) from products."
      }
    ]
  },
  {
    "code": "ECOMMERCE_003",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find how many orders exist in total."
      },
      {
        "hint_order": 2,
        "content": "Count every row in the orders table."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_004",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the number of categories."
      },
      {
        "hint_order": 2,
        "content": "Count rows in the categories table."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) from categories."
      }
    ]
  },
  {
    "code": "ECOMMERCE_005",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only include active products."
      },
      {
        "hint_order": 2,
        "content": "Filter using is_active = TRUE."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products with a WHERE clause."
      }
    ]
  },
  {
    "code": "ECOMMERCE_006",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only include inactive products."
      },
      {
        "hint_order": 2,
        "content": "Filter using is_active = FALSE."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products with a WHERE clause."
      }
    ]
  },
  {
    "code": "ECOMMERCE_007",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the total number of reviews."
      },
      {
        "hint_order": 2,
        "content": "Count all rows in the reviews table."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) from reviews."
      }
    ]
  },
  {
    "code": "ECOMMERCE_008",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the total number of payment records."
      },
      {
        "hint_order": 2,
        "content": "Count all rows in payments."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) from payments."
      }
    ]
  },
  {
    "code": "ECOMMERCE_009",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look for products with very low stock."
      },
      {
        "hint_order": 2,
        "content": "Filter rows where stock_quantity < 10."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products with that filter."
      }
    ]
  },
  {
    "code": "ECOMMERCE_010",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only delivered orders should be counted."
      },
      {
        "hint_order": 2,
        "content": "Use the status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from orders WHERE status = 'delivered'."
      }
    ]
  },
  {
    "code": "ECOMMERCE_011",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only cancelled orders should be counted."
      },
      {
        "hint_order": 2,
        "content": "Filter on status = cancelled."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from orders WHERE status = 'cancelled'."
      }
    ]
  },
  {
    "code": "ECOMMERCE_012",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only returned orders should be counted."
      },
      {
        "hint_order": 2,
        "content": "Use the status column."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from orders WHERE status = 'returned'."
      }
    ]
  },
  {
    "code": "ECOMMERCE_013",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need products whose price is above a threshold."
      },
      {
        "hint_order": 2,
        "content": "Filter rows where price > 1000."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products with that filter."
      }
    ]
  },
  {
    "code": "ECOMMERCE_014",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only include customers who actually have a phone value."
      },
      {
        "hint_order": 2,
        "content": "Check for NOT NULL and also avoid empty strings."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from customers WHERE phone IS NOT NULL AND phone <> ''."
      }
    ]
  },
  {
    "code": "ECOMMERCE_015",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need highly rated products only."
      },
      {
        "hint_order": 2,
        "content": "Filter rows where rating >= 4."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products with that filter."
      }
    ]
  },
  {
    "code": "ECOMMERCE_016",
    "hints": [
      {
        "hint_order": 1,
        "content": "Include customers with missing phone numbers."
      },
      {
        "hint_order": 2,
        "content": "A phone can be NULL or an empty string."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from customers WHERE phone IS NULL OR phone = ''."
      }
    ]
  },
  {
    "code": "ECOMMERCE_017",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only pending orders are needed."
      },
      {
        "hint_order": 2,
        "content": "Use the status column to filter."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from orders WHERE status = 'pending'."
      }
    ]
  },
  {
    "code": "ECOMMERCE_018",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look only at completed payments."
      },
      {
        "hint_order": 2,
        "content": "Filter using payment_status."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from payments WHERE payment_status = 'completed'."
      }
    ]
  },
  {
    "code": "ECOMMERCE_019",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need products that are out of stock."
      },
      {
        "hint_order": 2,
        "content": "Check stock_quantity = 0."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products with that condition."
      }
    ]
  },
  {
    "code": "ECOMMERCE_020",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter customers by registration date."
      },
      {
        "hint_order": 2,
        "content": "Use created_at > '2025-01-01'."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from customers after that date."
      }
    ]
  },
  {
    "code": "ECOMMERCE_021",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the mean product price."
      },
      {
        "hint_order": 2,
        "content": "Use AVG(price)."
      },
      {
        "hint_order": 3,
        "content": "Round the result to 2 decimal places."
      }
    ]
  },
  {
    "code": "ECOMMERCE_022",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the single highest price value."
      },
      {
        "hint_order": 2,
        "content": "Use an aggregate that returns the maximum."
      },
      {
        "hint_order": 3,
        "content": "Use MAX(price) from products."
      }
    ]
  },
  {
    "code": "ECOMMERCE_023",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the lowest product price."
      },
      {
        "hint_order": 2,
        "content": "Use an aggregate that returns the minimum."
      },
      {
        "hint_order": 3,
        "content": "Use MIN(price) from products."
      }
    ]
  },
  {
    "code": "ECOMMERCE_024",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the mean rating across all products."
      },
      {
        "hint_order": 2,
        "content": "Use AVG(rating)."
      },
      {
        "hint_order": 3,
        "content": "Round to 2 decimal places."
      }
    ]
  },
  {
    "code": "ECOMMERCE_025",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need total inventory across products."
      },
      {
        "hint_order": 2,
        "content": "Add all stock_quantity values together."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(stock_quantity) from products."
      }
    ]
  },
  {
    "code": "ECOMMERCE_026",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the average order value."
      },
      {
        "hint_order": 2,
        "content": "Use AVG(total_amount)."
      },
      {
        "hint_order": 3,
        "content": "Round the result to 2 decimals."
      }
    ]
  },
  {
    "code": "ECOMMERCE_027",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the single largest order total."
      },
      {
        "hint_order": 2,
        "content": "Use MAX on total_amount."
      },
      {
        "hint_order": 3,
        "content": "Select MAX(total_amount) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_028",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the smallest order total."
      },
      {
        "hint_order": 2,
        "content": "Use MIN on total_amount."
      },
      {
        "hint_order": 3,
        "content": "Select MIN(total_amount) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_029",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need total revenue across all orders."
      },
      {
        "hint_order": 2,
        "content": "Add all total_amount values."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(total_amount) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_030",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the mean quantity per order item row."
      },
      {
        "hint_order": 2,
        "content": "Use AVG(quantity)."
      },
      {
        "hint_order": 3,
        "content": "Round the result to 2 decimal places."
      }
    ]
  },
  {
    "code": "ECOMMERCE_031",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find the average paid amount across payments."
      },
      {
        "hint_order": 2,
        "content": "Use AVG(paid_amount)."
      },
      {
        "hint_order": 3,
        "content": "Round to 2 decimal places."
      }
    ]
  },
  {
    "code": "ECOMMERCE_032",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the highest paid amount."
      },
      {
        "hint_order": 2,
        "content": "Use MAX on paid_amount."
      },
      {
        "hint_order": 3,
        "content": "Select MAX(paid_amount) from payments."
      }
    ]
  },
  {
    "code": "ECOMMERCE_033",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the smallest paid amount."
      },
      {
        "hint_order": 2,
        "content": "Use MIN on paid_amount."
      },
      {
        "hint_order": 3,
        "content": "Select MIN(paid_amount) from payments."
      }
    ]
  },
  {
    "code": "ECOMMERCE_034",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total discount given across orders."
      },
      {
        "hint_order": 2,
        "content": "Sum the discount_amount column."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(discount_amount) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_035",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total shipping fees collected."
      },
      {
        "hint_order": 2,
        "content": "Sum the shipping_fee column."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(shipping_fee) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_036",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find total tax collected across orders."
      },
      {
        "hint_order": 2,
        "content": "Sum the tax_amount column."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(tax_amount) from orders."
      }
    ]
  },
  {
    "code": "ECOMMERCE_037",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customer age based on date_of_birth."
      },
      {
        "hint_order": 2,
        "content": "Use AGE with CURRENT_DATE and extract the year part."
      },
      {
        "hint_order": 3,
        "content": "Average those ages and round to 2 decimals."
      }
    ]
  },
  {
    "code": "ECOMMERCE_038",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter products by creation date."
      },
      {
        "hint_order": 2,
        "content": "Use created_at > '2025-01-01'."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) from products after that date."
      }
    ]
  },
  {
    "code": "ECOMMERCE_039",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is another average age question."
      },
      {
        "hint_order": 2,
        "content": "Use DATE_PART('year', AGE(...))."
      },
      {
        "hint_order": 3,
        "content": "Average those values and round to 2 decimals."
      }
    ]
  },
  {
    "code": "ECOMMERCE_040",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need total paid amount across payments."
      },
      {
        "hint_order": 2,
        "content": "Add all values in paid_amount."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(paid_amount) from payments."
      }
    ]
  },
  {
    "code": "ECOMMERCE_041",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need one row per customer."
      },
      {
        "hint_order": 2,
        "content": "Group orders by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) after GROUP BY customer_id."
      }
    ]
  },
  {
    "code": "ECOMMERCE_042",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need one row per category."
      },
      {
        "hint_order": 2,
        "content": "Group products by category_id."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) after GROUP BY category_id."
      }
    ]
  },
  {
    "code": "ECOMMERCE_043",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need one row per product."
      },
      {
        "hint_order": 2,
        "content": "Group reviews by product_id."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) after GROUP BY product_id."
      }
    ]
  },
  {
    "code": "ECOMMERCE_044",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need revenue totals for each customer."
      },
      {
        "hint_order": 2,
        "content": "Group orders by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(total_amount) for each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_045",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average order value per customer."
      },
      {
        "hint_order": 2,
        "content": "Group orders by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(total_amount), 2) for each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_046",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need total quantity sold per product."
      },
      {
        "hint_order": 2,
        "content": "Group order items by product_id."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(quantity) for each product."
      }
    ]
  },
  {
    "code": "ECOMMERCE_047",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need revenue per product from order items."
      },
      {
        "hint_order": 2,
        "content": "Group by product_id."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(total_price) for each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_048",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average review rating for each product."
      },
      {
        "hint_order": 2,
        "content": "Group reviews by product_id."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(rating), 2) per group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_049",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need one row per order status."
      },
      {
        "hint_order": 2,
        "content": "Group orders by status."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) for each status."
      }
    ]
  },
  {
    "code": "ECOMMERCE_050",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need one row per payment method."
      },
      {
        "hint_order": 2,
        "content": "Group payments by payment_method."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) for each method."
      }
    ]
  },
  {
    "code": "ECOMMERCE_051",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need one row per payment status."
      },
      {
        "hint_order": 2,
        "content": "Group payments by payment_status."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) for each status."
      }
    ]
  },
  {
    "code": "ECOMMERCE_052",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need category-wise average product price."
      },
      {
        "hint_order": 2,
        "content": "Group products by category_id."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(price), 2) per category."
      }
    ]
  },
  {
    "code": "ECOMMERCE_053",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need category-wise average stock."
      },
      {
        "hint_order": 2,
        "content": "Group products by category_id."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(stock_quantity), 2) per category."
      }
    ]
  },
  {
    "code": "ECOMMERCE_054",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need revenue totals by payment method."
      },
      {
        "hint_order": 2,
        "content": "Group payments by payment_method."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(paid_amount) for each method."
      }
    ]
  },
  {
    "code": "ECOMMERCE_055",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average paid amount by payment status."
      },
      {
        "hint_order": 2,
        "content": "Group payments by payment_status."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(paid_amount), 2) per status."
      }
    ]
  },
  {
    "code": "ECOMMERCE_056",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need daily order counts."
      },
      {
        "hint_order": 2,
        "content": "Remove the time part from order_date."
      },
      {
        "hint_order": 3,
        "content": "Group by DATE(order_date) and COUNT(*)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_057",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need daily revenue totals."
      },
      {
        "hint_order": 2,
        "content": "Convert order_date to just the date part."
      },
      {
        "hint_order": 3,
        "content": "Group by DATE(order_date) and SUM(total_amount)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_058",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average order total for each status."
      },
      {
        "hint_order": 2,
        "content": "Group orders by status."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(total_amount), 2) for each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_059",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need review counts per customer."
      },
      {
        "hint_order": 2,
        "content": "Group reviews by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) after GROUP BY customer_id."
      }
    ]
  },
  {
    "code": "ECOMMERCE_060",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average review rating per customer."
      },
      {
        "hint_order": 2,
        "content": "Group reviews by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(rating), 2) per group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_061",
    "hints": [
      {
        "hint_order": 1,
        "content": "Category is not in order items directly."
      },
      {
        "hint_order": 2,
        "content": "Join order_items with products."
      },
      {
        "hint_order": 3,
        "content": "Group by p.category_id and SUM(oi.quantity)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_062",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need revenue by category, not by product."
      },
      {
        "hint_order": 2,
        "content": "Join order items to products using product_id."
      },
      {
        "hint_order": 3,
        "content": "Group by p.category_id and SUM(oi.total_price)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_063",
    "hints": [
      {
        "hint_order": 1,
        "content": "Reviews know the product, and products know the category."
      },
      {
        "hint_order": 2,
        "content": "Join reviews with products."
      },
      {
        "hint_order": 3,
        "content": "Group by p.category_id and average r.rating."
      }
    ]
  },
  {
    "code": "ECOMMERCE_064",
    "hints": [
      {
        "hint_order": 1,
        "content": "Shipping city comes from the addresses table."
      },
      {
        "hint_order": 2,
        "content": "Join orders with addresses using shipping_address_id."
      },
      {
        "hint_order": 3,
        "content": "Group by a.city and COUNT(*)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_065",
    "hints": [
      {
        "hint_order": 1,
        "content": "Shipping city comes from the address row."
      },
      {
        "hint_order": 2,
        "content": "Join orders to addresses using shipping_address_id."
      },
      {
        "hint_order": 3,
        "content": "Group by a.city and SUM(o.total_amount)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_066",
    "hints": [
      {
        "hint_order": 1,
        "content": "The state is stored in addresses."
      },
      {
        "hint_order": 2,
        "content": "Join orders with addresses using shipping_address_id."
      },
      {
        "hint_order": 3,
        "content": "Group by a.state and COUNT(*)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_067",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need revenue totals by shipping state."
      },
      {
        "hint_order": 2,
        "content": "Join orders with addresses."
      },
      {
        "hint_order": 3,
        "content": "Group by a.state and SUM(o.total_amount)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_068",
    "hints": [
      {
        "hint_order": 1,
        "content": "Brand is stored in products, not order_items."
      },
      {
        "hint_order": 2,
        "content": "Join order items to products on product_id."
      },
      {
        "hint_order": 3,
        "content": "Group by p.brand and COUNT(*)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_069",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need revenue totals by brand."
      },
      {
        "hint_order": 2,
        "content": "Join order_items to products."
      },
      {
        "hint_order": 3,
        "content": "Group by p.brand and SUM(oi.total_price)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_070",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average product price per brand."
      },
      {
        "hint_order": 2,
        "content": "Group products by brand."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(price), 2) for each brand."
      }
    ]
  },
  {
    "code": "ECOMMERCE_071",
    "hints": [
      {
        "hint_order": 1,
        "content": "There are only two possible active states."
      },
      {
        "hint_order": 2,
        "content": "Group products by is_active."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) for each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_072",
    "hints": [
      {
        "hint_order": 1,
        "content": "There are only two possible customer active states."
      },
      {
        "hint_order": 2,
        "content": "Group customers by is_active."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(*) for each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_073",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need average product rating per brand."
      },
      {
        "hint_order": 2,
        "content": "Group products by brand."
      },
      {
        "hint_order": 3,
        "content": "Use ROUND(AVG(rating), 2) for each brand."
      }
    ]
  },
  {
    "code": "ECOMMERCE_074",
    "hints": [
      {
        "hint_order": 1,
        "content": "Reviews connect to products, and products connect to categories."
      },
      {
        "hint_order": 2,
        "content": "Join reviews with products."
      },
      {
        "hint_order": 3,
        "content": "Group by p.category_id and COUNT(*)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_075",
    "hints": [
      {
        "hint_order": 1,
        "content": "Shipping city comes from addresses."
      },
      {
        "hint_order": 2,
        "content": "Join orders to addresses using shipping_address_id."
      },
      {
        "hint_order": 3,
        "content": "Group by a.city and use ROUND(AVG(o.total_amount), 2)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_076",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customer revenue totals first."
      },
      {
        "hint_order": 2,
        "content": "Group orders by customer_id and sum total_amount."
      },
      {
        "hint_order": 3,
        "content": "Sort descending by revenue and LIMIT 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_077",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the best-selling products by quantity."
      },
      {
        "hint_order": 2,
        "content": "Group order items by product_id and sum quantity."
      },
      {
        "hint_order": 3,
        "content": "Order by total quantity sold DESC and LIMIT 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_078",
    "hints": [
      {
        "hint_order": 1,
        "content": "Category is available through the products table."
      },
      {
        "hint_order": 2,
        "content": "Join order items to products, then group by category."
      },
      {
        "hint_order": 3,
        "content": "Sum total_price, order descending, and LIMIT 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_079",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the top-rated product inside each category."
      },
      {
        "hint_order": 2,
        "content": "Use a window function partitioned by category_id."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() ordered by rating DESC, then keep rn = 1."
      }
    ]
  },
  {
    "code": "ECOMMERCE_080",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customers with many orders."
      },
      {
        "hint_order": 2,
        "content": "Group orders by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 10."
      }
    ]
  },
  {
    "code": "ECOMMERCE_081",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need products that do not have matching reviews."
      },
      {
        "hint_order": 2,
        "content": "Use a LEFT JOIN from products to reviews."
      },
      {
        "hint_order": 3,
        "content": "Keep rows where the review side is NULL."
      }
    ]
  },
  {
    "code": "ECOMMERCE_082",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customers with no matching orders."
      },
      {
        "hint_order": 2,
        "content": "Use a LEFT JOIN from customers to orders."
      },
      {
        "hint_order": 3,
        "content": "Filter rows where the order side is NULL."
      }
    ]
  },
  {
    "code": "ECOMMERCE_083",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need each product compared against its category average price."
      },
      {
        "hint_order": 2,
        "content": "Build average price per category in a subquery."
      },
      {
        "hint_order": 3,
        "content": "Join back to products and keep rows where p.price > avg_price."
      }
    ]
  },
  {
    "code": "ECOMMERCE_084",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count addresses per customer."
      },
      {
        "hint_order": 2,
        "content": "Group addresses by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "ECOMMERCE_085",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the latest order date for each customer."
      },
      {
        "hint_order": 2,
        "content": "Group orders by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use MAX(order_date) in each group."
      }
    ]
  },
  {
    "code": "ECOMMERCE_086",
    "hints": [
      {
        "hint_order": 1,
        "content": "Brand comes from products, revenue comes from order items."
      },
      {
        "hint_order": 2,
        "content": "Join order_items with products."
      },
      {
        "hint_order": 3,
        "content": "Group by brand, sum total_price, sort DESC, LIMIT 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_087",
    "hints": [
      {
        "hint_order": 1,
        "content": "Shipping city comes from the address table."
      },
      {
        "hint_order": 2,
        "content": "Join orders to addresses using shipping_address_id."
      },
      {
        "hint_order": 3,
        "content": "Group by city, sum total_amount, sort DESC, LIMIT 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_088",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need how many distinct orders included each product."
      },
      {
        "hint_order": 2,
        "content": "Group order items by product_id."
      },
      {
        "hint_order": 3,
        "content": "Use COUNT(DISTINCT order_id) and HAVING it greater than 100."
      }
    ]
  },
  {
    "code": "ECOMMERCE_089",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customers who wrote many reviews."
      },
      {
        "hint_order": 2,
        "content": "Group reviews by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_090",
    "hints": [
      {
        "hint_order": 1,
        "content": "Category comes from products, revenue per item comes from order items."
      },
      {
        "hint_order": 2,
        "content": "Join order_items with products."
      },
      {
        "hint_order": 3,
        "content": "Group by category_id and use ROUND(AVG(total_price), 2)."
      }
    ]
  },
  {
    "code": "ECOMMERCE_091",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need top products by revenue."
      },
      {
        "hint_order": 2,
        "content": "Group order items by product_id and sum total_price."
      },
      {
        "hint_order": 3,
        "content": "Order descending by revenue and LIMIT 5."
      }
    ]
  },
  {
    "code": "ECOMMERCE_092",
    "hints": [
      {
        "hint_order": 1,
        "content": "First calculate total revenue for each customer."
      },
      {
        "hint_order": 2,
        "content": "Then calculate the average of those customer totals."
      },
      {
        "hint_order": 3,
        "content": "Keep customers whose total_revenue is above that average."
      }
    ]
  },
  {
    "code": "ECOMMERCE_093",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare each product price against the average price of its brand."
      },
      {
        "hint_order": 2,
        "content": "Build average price per brand in a subquery."
      },
      {
        "hint_order": 3,
        "content": "Join back to products and keep p.price > avg_price."
      }
    ]
  },
  {
    "code": "ECOMMERCE_094",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need distinct categories purchased by each customer."
      },
      {
        "hint_order": 2,
        "content": "Join orders -> order_items -> products."
      },
      {
        "hint_order": 3,
        "content": "Group by customer_id and HAVING COUNT(DISTINCT category_id) > 3."
      }
    ]
  },
  {
    "code": "ECOMMERCE_095",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customer revenue inside each city."
      },
      {
        "hint_order": 2,
        "content": "Group by city and customer_id first."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() partitioned by city, then keep the top 3."
      }
    ]
  },
  {
    "code": "ECOMMERCE_096",
    "hints": [
      {
        "hint_order": 1,
        "content": "First aggregate revenue at the month level."
      },
      {
        "hint_order": 2,
        "content": "Use DATE_TRUNC('month', order_date) for month buckets."
      },
      {
        "hint_order": 3,
        "content": "Use SUM(monthly_revenue) OVER (ORDER BY revenue_month) for the running total."
      }
    ]
  },
  {
    "code": "ECOMMERCE_097",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need customers whose every payment is completed."
      },
      {
        "hint_order": 2,
        "content": "Join orders with payments and group by customer_id."
      },
      {
        "hint_order": 3,
        "content": "Compare total payment count with count of completed payments in HAVING."
      }
    ]
  },
  {
    "code": "ECOMMERCE_098",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need the most ordered product inside each brand."
      },
      {
        "hint_order": 2,
        "content": "Compute total quantity sold per brand and product."
      },
      {
        "hint_order": 3,
        "content": "Use ROW_NUMBER() partitioned by brand and keep rn = 1."
      }
    ]
  },
  {
    "code": "ECOMMERCE_099",
    "hints": [
      {
        "hint_order": 1,
        "content": "First compute total revenue for each category."
      },
      {
        "hint_order": 2,
        "content": "Then compute the average of those category revenues."
      },
      {
        "hint_order": 3,
        "content": "Keep categories whose total_revenue is above that average."
      }
    ]
  },
  {
    "code": "ECOMMERCE_100",
    "hints": [
      {
        "hint_order": 1,
        "content": "Think in terms of customer-month pairs, not raw orders."
      },
      {
        "hint_order": 2,
        "content": "Use DATE_TRUNC('month', order_date) and remove duplicate months per customer."
      },
      {
        "hint_order": 3,
        "content": "Use LAG() to compare each month with the previous month and check for a 1-month gap."
      }
    ]
  }
];

export const conceptFilters = [
  {
    "code": "ECOMMERCE_001",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "ECOMMERCE_002",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "ECOMMERCE_003",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "ECOMMERCE_004",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "ECOMMERCE_005",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_006",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_007",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "ECOMMERCE_008",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "ECOMMERCE_009",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_010",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_011",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_012",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_013",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_014",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "null_handling",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_015",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_016",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "null_handling",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_017",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_018",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_019",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_020",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_021",
    "concepts": [
      "aggregation",
      "average"
    ]
  },
  {
    "code": "ECOMMERCE_022",
    "concepts": [
      "aggregation",
      "max"
    ]
  },
  {
    "code": "ECOMMERCE_023",
    "concepts": [
      "aggregation",
      "min"
    ]
  },
  {
    "code": "ECOMMERCE_024",
    "concepts": [
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_025",
    "concepts": [
      "aggregation",
      "sum"
    ]
  },
  {
    "code": "ECOMMERCE_026",
    "concepts": [
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_027",
    "concepts": [
      "aggregation",
      "max"
    ]
  },
  {
    "code": "ECOMMERCE_028",
    "concepts": [
      "aggregation",
      "min"
    ]
  },
  {
    "code": "ECOMMERCE_029",
    "concepts": [
      "aggregation",
      "sum"
    ]
  },
  {
    "code": "ECOMMERCE_030",
    "concepts": [
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_031",
    "concepts": [
      "aggregation",
      "average",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_032",
    "concepts": [
      "aggregation",
      "max"
    ]
  },
  {
    "code": "ECOMMERCE_033",
    "concepts": [
      "aggregation",
      "min"
    ]
  },
  {
    "code": "ECOMMERCE_034",
    "concepts": [
      "aggregation",
      "sum"
    ]
  },
  {
    "code": "ECOMMERCE_035",
    "concepts": [
      "aggregation",
      "sum"
    ]
  },
  {
    "code": "ECOMMERCE_036",
    "concepts": [
      "aggregation",
      "sum"
    ]
  },
  {
    "code": "ECOMMERCE_037",
    "concepts": [
      "aggregation",
      "average",
      "date_functions",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_038",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_039",
    "concepts": [
      "aggregation",
      "average",
      "date_functions",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_040",
    "concepts": [
      "aggregation",
      "sum"
    ]
  },
  {
    "code": "ECOMMERCE_041",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_042",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_043",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_044",
    "concepts": [
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_045",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_046",
    "concepts": [
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_047",
    "concepts": [
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_048",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_049",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_050",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_051",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_052",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_053",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_054",
    "concepts": [
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_055",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_056",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "date_functions"
    ]
  },
  {
    "code": "ECOMMERCE_057",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "date_functions"
    ]
  },
  {
    "code": "ECOMMERCE_058",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_059",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_060",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_061",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_062",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_063",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_064",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_065",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_066",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_067",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_068",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_069",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_070",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_071",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_072",
    "concepts": [
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_073",
    "concepts": [
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_074",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_075",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_076",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "ECOMMERCE_077",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "ECOMMERCE_078",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "ECOMMERCE_079",
    "concepts": [
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_080",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "having",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_081",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "null_handling"
    ]
  },
  {
    "code": "ECOMMERCE_082",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "null_handling"
    ]
  },
  {
    "code": "ECOMMERCE_083",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_084",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "having",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_085",
    "concepts": [
      "aggregation",
      "max",
      "group_by"
    ]
  },
  {
    "code": "ECOMMERCE_086",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "ECOMMERCE_087",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "ECOMMERCE_088",
    "concepts": [
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_089",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "having",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_090",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "calculation"
    ]
  },
  {
    "code": "ECOMMERCE_091",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "ECOMMERCE_092",
    "concepts": [
      "aggregation",
      "sum",
      "average",
      "group_by",
      "subquery",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_093",
    "concepts": [
      "joins",
      "aggregation",
      "average",
      "group_by",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_094",
    "concepts": [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_095",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_096",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "date_functions",
      "window_functions",
      "running_total"
    ]
  },
  {
    "code": "ECOMMERCE_097",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "having",
      "case_when",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_098",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "group_by",
      "window_functions",
      "row_number",
      "partition_by",
      "sorting",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_099",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "average",
      "group_by",
      "subquery",
      "filtering",
      "comparison"
    ]
  },
  {
    "code": "ECOMMERCE_100",
    "concepts": [
      "distinct",
      "date_functions",
      "window_functions",
      "lag",
      "lag_lead",
      "partition_by",
      "filtering",
      "comparison"
    ]
  }
];

export const solutions = [
  {
    "code": "ECOMMERCE_001",
    "approaches": [
      {
        "approach_title": "COUNT all customers",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM customers;",
        "explanation": "## Approach\n\nUse `COUNT(*)` to count every row in `customers`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers;\n```\n\n## Explanation\n\n- Each row represents one customer\n- `COUNT(*)` counts all rows\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "COUNT primary key",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM customers;",
        "explanation": "## Approach\n\nCount the non-null primary key column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM customers;\n```\n\n## Explanation\n\n- `id` is a primary key, so it is never `NULL`\n- This returns the same result as `COUNT(*)`\n- Slightly less preferred than `COUNT(*)` for counting rows"
      }
    ]
  },
  {
    "code": "ECOMMERCE_002",
    "approaches": [
      {
        "approach_title": "COUNT all products",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products;",
        "explanation": "## Approach\n\nCount all rows in the products table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products;\n```\n\n## Explanation\n\n- Each row represents one product\n- `COUNT(*)` returns the total number of products\n- This is the simplest and best approach"
      },
      {
        "approach_title": "COUNT product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM products;",
        "explanation": "## Approach\n\nCount the `id` column instead of all rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products;\n```\n\n## Explanation\n\n- Since `id` is non-null, this also counts all products\n- It works correctly, but `COUNT(*)` is usually cleaner for row counts"
      }
    ]
  },
  {
    "code": "ECOMMERCE_003",
    "approaches": [
      {
        "approach_title": "COUNT all orders",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM orders;",
        "explanation": "## Approach\n\nCount every row in `orders`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM orders;\n```\n\n## Explanation\n\n- Each row is one order\n- `COUNT(*)` gives the total number of orders\n- This is the optimal solution"
      },
      {
        "approach_title": "COUNT order IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM orders;",
        "explanation": "## Approach\n\nCount the non-null primary key column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM orders;\n```\n\n## Explanation\n\n- `id` is unique and non-null\n- This gives the same answer as `COUNT(*)`\n- Valid, but not the most preferred style"
      }
    ]
  },
  {
    "code": "ECOMMERCE_004",
    "approaches": [
      {
        "approach_title": "COUNT all categories",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM categories;",
        "explanation": "## Approach\n\nCount all category rows.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM categories;\n```\n\n## Explanation\n\n- Each row is one category\n- `COUNT(*)` returns the total number of categories\n- This is the most direct solution"
      },
      {
        "approach_title": "COUNT category IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM categories;",
        "explanation": "## Approach\n\nCount the category ID column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM categories;\n```\n\n## Explanation\n\n- `id` is non-null for every category\n- So this gives the same total as `COUNT(*)`\n- Still valid, but `COUNT(*)` is cleaner"
      }
    ]
  },
  {
    "code": "ECOMMERCE_005",
    "approaches": [
      {
        "approach_title": "Filter active products + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE is_active = TRUE;",
        "explanation": "## Approach\n\nFilter only active products, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE is_active = TRUE;\n```\n\n## Explanation\n\n- `WHERE` keeps only active products\n- `COUNT(*)` counts the filtered rows\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Boolean shorthand filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS count FROM products WHERE is_active;",
        "explanation": "## Approach\n\nUse boolean shorthand in the `WHERE` clause.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE is_active;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_active` is equivalent to `WHERE is_active = TRUE`\n- This is shorter and valid\n- Slightly less explicit than the optimal approach"
      },
      {
        "approach_title": "COUNT active product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(id) AS count FROM products WHERE is_active = TRUE;",
        "explanation": "## Approach\n\nFilter active rows first, then count the non-null primary key.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE is_active = TRUE;\n```\n\n## Explanation\n\n- Since `id` is never `NULL`, this returns the active product count\n- Works fine, but `COUNT(*)` is still the cleaner row-counting pattern"
      }
    ]
  },
  {
    "code": "ECOMMERCE_006",
    "approaches": [
      {
        "approach_title": "Filter inactive products + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE is_active = FALSE;",
        "explanation": "## Approach\n\nFilter only inactive products and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE is_active = FALSE;\n```\n\n## Explanation\n\n- `WHERE` filters inactive products only\n- `COUNT(*)` counts the filtered rows\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Boolean NOT shorthand",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS count FROM products WHERE NOT is_active;",
        "explanation": "## Approach\n\nUse boolean shorthand with `NOT` in the filter.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE NOT is_active;\n```\n\n## Explanation\n\n- `NOT is_active` is equivalent to `is_active = FALSE`\n- This is valid in PostgreSQL\n- Slightly less explicit than the optimal approach"
      },
      {
        "approach_title": "COUNT inactive product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(id) AS count FROM products WHERE is_active = FALSE;",
        "explanation": "## Approach\n\nFilter inactive products first, then count the primary key.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE is_active = FALSE;\n```\n\n## Explanation\n\n- `id` is non-null for every product\n- So `COUNT(id)` gives the same answer as `COUNT(*)`\n- Valid, but `COUNT(*)` is cleaner for row counts"
      }
    ]
  },
  {
    "code": "ECOMMERCE_007",
    "approaches": [
      {
        "approach_title": "COUNT all reviews",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM reviews;",
        "explanation": "## Approach\n\nCount every row in the reviews table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM reviews;\n```\n\n## Explanation\n\n- Each row represents one review\n- `COUNT(*)` returns total reviews\n- This is the simplest and best approach"
      },
      {
        "approach_title": "COUNT review IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM reviews;",
        "explanation": "## Approach\n\nCount the non-null review ID column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM reviews;\n```\n\n## Explanation\n\n- `id` is a primary key and never `NULL`\n- This produces the same result as `COUNT(*)`\n- Valid, but less preferred than counting rows directly"
      }
    ]
  },
  {
    "code": "ECOMMERCE_008",
    "approaches": [
      {
        "approach_title": "COUNT all payments",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM payments;",
        "explanation": "## Approach\n\nCount all payment records in the table.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM payments;\n```\n\n## Explanation\n\n- Each row represents one payment record\n- `COUNT(*)` gives the total number of payments\n- This is the most direct solution"
      },
      {
        "approach_title": "COUNT payment IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM payments;",
        "explanation": "## Approach\n\nCount the primary key column instead of all rows.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM payments;\n```\n\n## Explanation\n\n- `id` is non-null for every payment row\n- So it returns the same total as `COUNT(*)`\n- Valid, but not the cleanest style"
      }
    ]
  },
  {
    "code": "ECOMMERCE_009",
    "approaches": [
      {
        "approach_title": "Filter low stock products + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE stock_quantity < 10;",
        "explanation": "## Approach\n\nFilter products with stock below 10 and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE stock_quantity < 10;\n```\n\n## Explanation\n\n- `WHERE stock_quantity < 10` keeps only low-stock products\n- `COUNT(*)` counts those filtered rows\n- This is the most direct approach"
      },
      {
        "approach_title": "COUNT low stock product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM products WHERE stock_quantity < 10;",
        "explanation": "## Approach\n\nFilter low-stock rows first, then count the product IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE stock_quantity < 10;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this returns the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is more idiomatic for counting rows"
      }
    ]
  },
  {
    "code": "ECOMMERCE_010",
    "approaches": [
      {
        "approach_title": "Filter delivered orders + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM orders WHERE status = 'delivered';",
        "explanation": "## Approach\n\nFilter only delivered orders and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM orders\nWHERE status = 'delivered';\n```\n\n## Explanation\n\n- `WHERE status = 'delivered'` keeps only delivered orders\n- `COUNT(*)` counts the matching rows\n- This is the optimal approach"
      },
      {
        "approach_title": "COUNT delivered order IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM orders WHERE status = 'delivered';",
        "explanation": "## Approach\n\nFilter delivered orders first, then count the primary key column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM orders\nWHERE status = 'delivered';\n```\n\n## Explanation\n\n- `id` is non-null for every order\n- So this gives the same total as `COUNT(*)`\n- Valid, but slightly less direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_011",
    "approaches": [
      {
        "approach_title": "Filter cancelled orders + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM orders WHERE status = 'cancelled';",
        "explanation": "## Approach\n\nFilter only cancelled orders and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM orders\nWHERE status = 'cancelled';\n```\n\n## Explanation\n\n- `WHERE` keeps only cancelled orders\n- `COUNT(*)` counts the filtered rows\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "COUNT cancelled order IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM orders WHERE status = 'cancelled';",
        "explanation": "## Approach\n\nFilter cancelled orders first, then count the primary key column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM orders\nWHERE status = 'cancelled';\n```\n\n## Explanation\n\n- `id` is non-null for every order\n- This returns the same answer as `COUNT(*)`\n- Valid, but less preferred than counting rows directly"
      }
    ]
  },
  {
    "code": "ECOMMERCE_012",
    "approaches": [
      {
        "approach_title": "Filter returned orders + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM orders WHERE status = 'returned';",
        "explanation": "## Approach\n\nFilter returned orders and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM orders\nWHERE status = 'returned';\n```\n\n## Explanation\n\n- `WHERE status = 'returned'` keeps only returned orders\n- `COUNT(*)` counts matching rows\n- This is the cleanest approach"
      },
      {
        "approach_title": "COUNT returned order IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM orders WHERE status = 'returned';",
        "explanation": "## Approach\n\nFilter returned orders first, then count the `id` column.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM orders\nWHERE status = 'returned';\n```\n\n## Explanation\n\n- Since `id` is never `NULL`, this gives the same result\n- Works correctly, but `COUNT(*)` is more idiomatic"
      }
    ]
  },
  {
    "code": "ECOMMERCE_013",
    "approaches": [
      {
        "approach_title": "Filter expensive products + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE price > 1000;",
        "explanation": "## Approach\n\nFilter products priced above 1000 and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE price > 1000;\n```\n\n## Explanation\n\n- `WHERE price > 1000` keeps only products above the threshold\n- `COUNT(*)` returns how many such products exist\n- This is the most direct approach"
      },
      {
        "approach_title": "COUNT matching product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM products WHERE price > 1000;",
        "explanation": "## Approach\n\nApply the price filter, then count the product IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE price > 1000;\n```\n\n## Explanation\n\n- `id` is non-null, so this equals `COUNT(*)`\n- Valid approach, but not as clean as counting rows directly"
      }
    ]
  },
  {
    "code": "ECOMMERCE_014",
    "approaches": [
      {
        "approach_title": "Check non-null and non-empty phone + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM customers WHERE phone IS NOT NULL AND phone <> '';",
        "explanation": "## Approach\n\nCount customers whose phone number is present and not an empty string.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers\nWHERE phone IS NOT NULL\n  AND phone <> '';\n```\n\n## Explanation\n\n- `IS NOT NULL` removes missing phone values\n- `phone <> ''` also removes blank strings\n- This is the safest and most explicit approach"
      },
      {
        "approach_title": "Use NULLIF to ignore blanks",
        "approach_type": "conditional",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS count FROM customers WHERE NULLIF(phone, '') IS NOT NULL;",
        "explanation": "## Approach\n\nConvert blank strings to `NULL`, then count valid phone numbers.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers\nWHERE NULLIF(phone, '') IS NOT NULL;\n```\n\n## Explanation\n\n- `NULLIF(phone, '')` turns empty strings into `NULL`\n- Then `IS NOT NULL` keeps only real phone values\n- This is concise and valid, though less immediately readable"
      },
      {
        "approach_title": "COUNT valid phone values",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(NULLIF(phone, '')) AS count FROM customers;",
        "explanation": "## Approach\n\nCount only non-empty phone values directly.\n\n## Query\n\n```sql\nSELECT COUNT(NULLIF(phone, '')) AS count\nFROM customers;\n```\n\n## Explanation\n\n- `NULLIF(phone, '')` converts blank strings to `NULL`\n- `COUNT(expression)` ignores `NULL`s\n- So this counts only filled phone numbers\n- Good alternative, but slightly less beginner-friendly"
      }
    ]
  },
  {
    "code": "ECOMMERCE_015",
    "approaches": [
      {
        "approach_title": "Filter high-rated products + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE rating >= 4;",
        "explanation": "## Approach\n\nFilter products with rating 4 or higher, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE rating >= 4;\n```\n\n## Explanation\n\n- `WHERE rating >= 4` keeps only highly rated products\n- `COUNT(*)` counts those rows\n- This is the simplest and best approach"
      },
      {
        "approach_title": "COUNT matching product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM products WHERE rating >= 4;",
        "explanation": "## Approach\n\nFilter the rows first, then count product IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE rating >= 4;\n```\n\n## Explanation\n\n- `id` is non-null, so the result matches `COUNT(*)`\n- Valid, but `COUNT(*)` is more standard for row counts"
      }
    ]
  },
  {
    "code": "ECOMMERCE_016",
    "approaches": [
      {
        "approach_title": "Check null or empty phone + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM customers WHERE phone IS NULL OR phone = '';",
        "explanation": "## Approach\n\nCount customers whose phone number is either missing or stored as an empty string.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers\nWHERE phone IS NULL OR phone = '';\n```\n\n## Explanation\n\n- `phone IS NULL` catches missing values\n- `phone = ''` catches blank strings\n- `COUNT(*)` returns the total matching customers\n- This is the safest and most explicit solution"
      },
      {
        "approach_title": "Use NULLIF with IS NULL",
        "approach_type": "conditional",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) AS count FROM customers WHERE NULLIF(phone, '') IS NULL;",
        "explanation": "## Approach\n\nTreat blank strings as `NULL`, then count missing phone values.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers\nWHERE NULLIF(phone, '') IS NULL;\n```\n\n## Explanation\n\n- `NULLIF(phone, '')` converts blank strings to `NULL`\n- `IS NULL` then catches both actual nulls and blanks\n- Valid and concise, though slightly less obvious for beginners"
      },
      {
        "approach_title": "Subtract filled phone count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) - COUNT(NULLIF(phone, '')) AS count FROM customers;",
        "explanation": "## Approach\n\nCompute missing phone numbers indirectly by subtracting filled phone values from total rows.\n\n## Query\n\n```sql\nSELECT COUNT(*) - COUNT(NULLIF(phone, '')) AS count\nFROM customers;\n```\n\n## Explanation\n\n- `COUNT(*)` gives total customers\n- `COUNT(NULLIF(phone, ''))` counts only non-empty phone values\n- The difference gives customers without a phone number\n- Correct, but less direct than filtering"
      }
    ]
  },
  {
    "code": "ECOMMERCE_017",
    "approaches": [
      {
        "approach_title": "Filter pending orders + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM orders WHERE status = 'pending';",
        "explanation": "## Approach\n\nFilter orders with pending status and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM orders\nWHERE status = 'pending';\n```\n\n## Explanation\n\n- `WHERE status = 'pending'` keeps only pending orders\n- `COUNT(*)` counts those rows\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "COUNT pending order IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM orders WHERE status = 'pending';",
        "explanation": "## Approach\n\nFilter pending orders first, then count the primary key.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM orders\nWHERE status = 'pending';\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- This produces the same result as `COUNT(*)`\n- Valid, but not as clean as counting rows directly"
      }
    ]
  },
  {
    "code": "ECOMMERCE_018",
    "approaches": [
      {
        "approach_title": "Filter completed payments + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM payments WHERE payment_status = 'completed';",
        "explanation": "## Approach\n\nFilter completed payments and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM payments\nWHERE payment_status = 'completed';\n```\n\n## Explanation\n\n- `WHERE payment_status = 'completed'` keeps only completed payments\n- `COUNT(*)` counts the matching rows\n- This is the simplest and best approach"
      },
      {
        "approach_title": "COUNT completed payment IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM payments WHERE payment_status = 'completed';",
        "explanation": "## Approach\n\nFilter completed payments first, then count the payment IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM payments\nWHERE payment_status = 'completed';\n```\n\n## Explanation\n\n- `id` is non-null for all payment rows\n- So this returns the same result as `COUNT(*)`\n- Valid, but slightly less direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_019",
    "approaches": [
      {
        "approach_title": "Filter zero stock products + COUNT",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE stock_quantity = 0;",
        "explanation": "## Approach\n\nFilter products whose stock quantity is exactly zero and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE stock_quantity = 0;\n```\n\n## Explanation\n\n- `WHERE stock_quantity = 0` keeps only out-of-stock products\n- `COUNT(*)` returns the total number of such products\n- This is the most direct approach"
      },
      {
        "approach_title": "COUNT zero stock product IDs",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM products WHERE stock_quantity = 0;",
        "explanation": "## Approach\n\nApply the stock filter first, then count product IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE stock_quantity = 0;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this gives the same answer as `COUNT(*)`\n- Valid alternative, though `COUNT(*)` is more idiomatic"
      }
    ]
  },
  {
    "code": "ECOMMERCE_020",
    "approaches": [
      {
        "approach_title": "Filter by registration date + COUNT",
        "approach_type": "date_filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM customers WHERE created_at > '2025-01-01';",
        "explanation": "## Approach\n\nFilter customers registered after the given date and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers\nWHERE created_at > '2025-01-01';\n```\n\n## Explanation\n\n- `created_at > '2025-01-01'` keeps customers registered after January 1, 2025\n- `COUNT(*)` counts the filtered rows\n- This is the simplest and most direct solution"
      },
      {
        "approach_title": "COUNT customer IDs after date filter",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM customers WHERE created_at > '2025-01-01';",
        "explanation": "## Approach\n\nApply the date filter first, then count the customer IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM customers\nWHERE created_at > '2025-01-01';\n```\n\n## Explanation\n\n- `id` is non-null for each customer\n- This returns the same result as `COUNT(*)`\n- Valid, but not as clean as counting rows directly"
      },
      {
        "approach_title": "Explicit TIMESTAMP literal",
        "approach_type": "date_functions",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) AS count FROM customers WHERE created_at > TIMESTAMP '2025-01-01';",
        "explanation": "## Approach\n\nUse an explicit `TIMESTAMP` literal for the cutoff date.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM customers\nWHERE created_at > TIMESTAMP '2025-01-01';\n```\n\n## Explanation\n\n- `TIMESTAMP '2025-01-01'` makes the comparison type explicit\n- This keeps the same semantics as comparing to `'2025-01-01'` while being clearer about the intended type\n- Helpful when teaching timestamp literals and explicit typing"
      }
    ]
  },
  {
    "code": "ECOMMERCE_021",
    "approaches": [
      {
        "approach_title": "AVG product price",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT AVG(price) AS avg_price FROM products;",
        "explanation": "## Approach\n\nUse `AVG()` to calculate the mean product price.\n\n## Query\n\n```sql\nSELECT AVG(price) AS avg_price\nFROM products;\n```\n\n## Explanation\n\n- `AVG(price)` computes the average of all product prices\n- Alias the result as `avg_price` to match the expected output column\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT AVG(price) AS avg_price FROM (SELECT price FROM products) p;",
        "explanation": "## Approach\n\nFirst select the `price` column in a subquery, then calculate the average.\n\n## Query\n\n```sql\nSELECT AVG(price) AS avg_price\nFROM (\n  SELECT price\n  FROM products\n) p;\n```\n\n## Explanation\n\n- The subquery extracts product prices first\n- The outer query applies `AVG()` on that result\n- This works, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_022",
    "approaches": [
      {
        "approach_title": "MAX product price",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT MAX(price) AS max_price FROM products;",
        "explanation": "## Approach\n\nUse `MAX()` to find the highest price.\n\n## Query\n\n```sql\nSELECT MAX(price) AS max_price\nFROM products;\n```\n\n## Explanation\n\n- `MAX(price)` returns the largest value in the `price` column\n- This is the simplest and best solution"
      },
      {
        "approach_title": "Top price using ORDER BY",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT price AS max_price FROM products ORDER BY price DESC LIMIT 1;",
        "explanation": "## Approach\n\nSort products by price in descending order and take the first row.\n\n## Query\n\n```sql\nSELECT price AS max_price\nFROM products\nORDER BY price DESC\nLIMIT 1;\n```\n\n## Explanation\n\n- `ORDER BY price DESC` puts the most expensive product first\n- `LIMIT 1` returns only the top row\n- This works, but `MAX()` is more direct for a single value"
      }
    ]
  },
  {
    "code": "ECOMMERCE_023",
    "approaches": [
      {
        "approach_title": "MIN product price",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT MIN(price) AS min_price FROM products;",
        "explanation": "## Approach\n\nUse `MIN()` to find the lowest price.\n\n## Query\n\n```sql\nSELECT MIN(price) AS min_price\nFROM products;\n```\n\n## Explanation\n\n- `MIN(price)` returns the smallest value in the `price` column\n- This is the cleanest and optimal solution"
      },
      {
        "approach_title": "Lowest price using ORDER BY",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT price AS min_price FROM products ORDER BY price ASC LIMIT 1;",
        "explanation": "## Approach\n\nSort products by price in ascending order and return the first row.\n\n## Query\n\n```sql\nSELECT price AS min_price\nFROM products\nORDER BY price ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- `ORDER BY price ASC` puts the cheapest product first\n- `LIMIT 1` returns only that row\n- Valid, but `MIN()` is more appropriate here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_024",
    "approaches": [
      {
        "approach_title": "AVG product rating",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(rating), 2) AS avg_rating FROM products;",
        "explanation": "## Approach\n\nUse `AVG()` to calculate the average product rating and round it to 2 decimal places.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(rating), 2) AS avg_rating\nFROM products;\n```\n\n## Explanation\n\n- `AVG(rating)` computes the mean rating value\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct approach"
      },
      {
        "approach_title": "Average from rating subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT rating FROM products) p;",
        "explanation": "## Approach\n\nSelect the rating column first in a subquery, then compute the average.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(rating), 2) AS avg_rating\nFROM (\n  SELECT rating\n  FROM products\n) p;\n```\n\n## Explanation\n\n- The subquery isolates the `rating` column\n- The outer query calculates the average\n- Works correctly, but adds unnecessary complexity"
      }
    ]
  },
  {
    "code": "ECOMMERCE_025",
    "approaches": [
      {
        "approach_title": "SUM all stock quantities",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT SUM(stock_quantity) AS total_stock FROM products;",
        "explanation": "## Approach\n\nUse `SUM()` to add up stock quantities across all products.\n\n## Query\n\n```sql\nSELECT SUM(stock_quantity) AS total_stock\nFROM products;\n```\n\n## Explanation\n\n- `SUM(stock_quantity)` adds the stock of every product\n- The result is the total inventory count\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Sum stock from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(stock_quantity) AS total_stock FROM (SELECT stock_quantity FROM products) p;",
        "explanation": "## Approach\n\nSelect stock quantities first in a subquery, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(stock_quantity) AS total_stock\nFROM (\n  SELECT stock_quantity\n  FROM products\n) p;\n```\n\n## Explanation\n\n- The subquery extracts stock values first\n- The outer query totals them using `SUM()`\n- Valid, but the subquery is not needed here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_026",
    "approaches": [
      {
        "approach_title": "AVG order total",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(total_amount), 2) AS avg_order_total FROM orders;",
        "explanation": "## Approach\n\nUse `AVG()` to calculate the average order total and round it to 2 decimal places.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(total_amount), 2) AS avg_order_total\nFROM orders;\n```\n\n## Explanation\n\n- `AVG(total_amount)` computes the mean order total\n- `ROUND(..., 2)` formats the result to 2 decimal places\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(total_amount), 2) AS avg_order_total FROM (SELECT total_amount FROM orders) o;",
        "explanation": "## Approach\n\nFirst select the `total_amount` column in a subquery, then calculate the average.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(total_amount), 2) AS avg_order_total\nFROM (\n  SELECT total_amount\n  FROM orders\n) o;\n```\n\n## Explanation\n\n- The subquery extracts order totals first\n- The outer query applies `AVG()` on that result\n- This works, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_027",
    "approaches": [
      {
        "approach_title": "MAX order total",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT MAX(total_amount) AS max_order_total FROM orders;",
        "explanation": "## Approach\n\nUse `MAX()` to find the highest order total.\n\n## Query\n\n```sql\nSELECT MAX(total_amount) AS max_order_total\nFROM orders;\n```\n\n## Explanation\n\n- `MAX(total_amount)` returns the largest order total\n- This is the simplest and best solution"
      },
      {
        "approach_title": "Top order total using ORDER BY",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT total_amount AS max_order_total FROM orders ORDER BY total_amount DESC LIMIT 1;",
        "explanation": "## Approach\n\nSort orders by total amount in descending order and take the first row.\n\n## Query\n\n```sql\nSELECT total_amount AS max_order_total\nFROM orders\nORDER BY total_amount DESC\nLIMIT 1;\n```\n\n## Explanation\n\n- `ORDER BY total_amount DESC` puts the highest order first\n- `LIMIT 1` returns only that row\n- This works, but `MAX()` is more direct for a single value"
      }
    ]
  },
  {
    "code": "ECOMMERCE_028",
    "approaches": [
      {
        "approach_title": "MIN order total",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT MIN(total_amount) AS min_order_total FROM orders;",
        "explanation": "## Approach\n\nUse `MIN()` to find the lowest order total.\n\n## Query\n\n```sql\nSELECT MIN(total_amount) AS min_order_total\nFROM orders;\n```\n\n## Explanation\n\n- `MIN(total_amount)` returns the smallest order total\n- This is the cleanest and optimal solution"
      },
      {
        "approach_title": "Lowest order total using ORDER BY",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT total_amount AS min_order_total FROM orders ORDER BY total_amount ASC LIMIT 1;",
        "explanation": "## Approach\n\nSort orders by total amount in ascending order and return the first row.\n\n## Query\n\n```sql\nSELECT total_amount AS min_order_total\nFROM orders\nORDER BY total_amount ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- `ORDER BY total_amount ASC` puts the smallest order first\n- `LIMIT 1` returns that row\n- Valid, but `MIN()` is more appropriate here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_029",
    "approaches": [
      {
        "approach_title": "SUM all order totals",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT SUM(total_amount) AS total_revenue FROM orders;",
        "explanation": "## Approach\n\nUse `SUM()` to add up all order totals.\n\n## Query\n\n```sql\nSELECT SUM(total_amount) AS total_revenue\nFROM orders;\n```\n\n## Explanation\n\n- `SUM(total_amount)` adds the total amount of every order\n- The result is the total revenue from orders\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Sum revenue from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(total_amount) AS total_revenue FROM (SELECT total_amount FROM orders) o;",
        "explanation": "## Approach\n\nSelect order totals first in a subquery, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(total_amount) AS total_revenue\nFROM (\n  SELECT total_amount\n  FROM orders\n) o;\n```\n\n## Explanation\n\n- The subquery extracts the totals first\n- The outer query totals them using `SUM()`\n- Valid, but the subquery is not needed here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_030",
    "approaches": [
      {
        "approach_title": "AVG quantity per order item",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(quantity), 2) AS avg_quantity FROM order_items;",
        "explanation": "## Approach\n\nUse `AVG()` to calculate the average quantity across all order items and round it to 2 decimal places.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(quantity), 2) AS avg_quantity\nFROM order_items;\n```\n\n## Explanation\n\n- `AVG(quantity)` computes the mean ordered quantity per row\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct approach"
      },
      {
        "approach_title": "Average from quantity subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(quantity), 2) AS avg_quantity FROM (SELECT quantity FROM order_items) oi;",
        "explanation": "## Approach\n\nSelect quantities first in a subquery, then compute the average.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(quantity), 2) AS avg_quantity\nFROM (\n  SELECT quantity\n  FROM order_items\n) oi;\n```\n\n## Explanation\n\n- The subquery isolates the `quantity` column\n- The outer query calculates the average\n- Works correctly, but adds unnecessary complexity"
      }
    ]
  },
  {
    "code": "ECOMMERCE_031",
    "approaches": [
      {
        "approach_title": "AVG paid amount",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments;",
        "explanation": "## Approach\n\nUse `AVG()` to calculate the average paid amount and round it to 2 decimal places.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount\nFROM payments;\n```\n\n## Explanation\n\n- `AVG(paid_amount)` computes the mean payment amount\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM (SELECT paid_amount FROM payments) p;",
        "explanation": "## Approach\n\nSelect the payment amounts first in a subquery, then calculate the average.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(paid_amount), 2) AS avg_paid_amount\nFROM (\n  SELECT paid_amount\n  FROM payments\n) p;\n```\n\n## Explanation\n\n- The subquery isolates the `paid_amount` column\n- The outer query calculates the average\n- This works, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_032",
    "approaches": [
      {
        "approach_title": "MAX paid amount",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT MAX(paid_amount) AS max_paid_amount FROM payments;",
        "explanation": "## Approach\n\nUse `MAX()` to find the highest paid amount.\n\n## Query\n\n```sql\nSELECT MAX(paid_amount) AS max_paid_amount\nFROM payments;\n```\n\n## Explanation\n\n- `MAX(paid_amount)` returns the largest payment amount\n- This is the simplest and best solution"
      },
      {
        "approach_title": "Top payment using ORDER BY",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT paid_amount AS max_paid_amount FROM payments ORDER BY paid_amount DESC LIMIT 1;",
        "explanation": "## Approach\n\nSort payment amounts in descending order and return the top row.\n\n## Query\n\n```sql\nSELECT paid_amount AS max_paid_amount\nFROM payments\nORDER BY paid_amount DESC\nLIMIT 1;\n```\n\n## Explanation\n\n- `ORDER BY paid_amount DESC` places the largest value first\n- `LIMIT 1` returns only that row\n- This works, but `MAX()` is more direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_033",
    "approaches": [
      {
        "approach_title": "MIN paid amount",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT MIN(paid_amount) AS min_paid_amount FROM payments;",
        "explanation": "## Approach\n\nUse `MIN()` to find the lowest paid amount.\n\n## Query\n\n```sql\nSELECT MIN(paid_amount) AS min_paid_amount\nFROM payments;\n```\n\n## Explanation\n\n- `MIN(paid_amount)` returns the smallest payment amount\n- This is the cleanest and optimal solution"
      },
      {
        "approach_title": "Lowest payment using ORDER BY",
        "approach_type": "sorting",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT paid_amount AS min_paid_amount FROM payments ORDER BY paid_amount ASC LIMIT 1;",
        "explanation": "## Approach\n\nSort payment amounts in ascending order and return the first row.\n\n## Query\n\n```sql\nSELECT paid_amount AS min_paid_amount\nFROM payments\nORDER BY paid_amount ASC\nLIMIT 1;\n```\n\n## Explanation\n\n- `ORDER BY paid_amount ASC` places the smallest value first\n- `LIMIT 1` returns that row\n- Valid, but `MIN()` is more appropriate here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_034",
    "approaches": [
      {
        "approach_title": "SUM all order discounts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT SUM(discount_amount) AS total_discount FROM orders;",
        "explanation": "## Approach\n\nUse `SUM()` to add up all order-level discount amounts.\n\n## Query\n\n```sql\nSELECT SUM(discount_amount) AS total_discount\nFROM orders;\n```\n\n## Explanation\n\n- `SUM(discount_amount)` adds the discount from every order\n- The result is the total discount given across all orders\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Sum discounts from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(discount_amount) AS total_discount FROM (SELECT discount_amount FROM orders) o;",
        "explanation": "## Approach\n\nSelect discount amounts first in a subquery, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(discount_amount) AS total_discount\nFROM (\n  SELECT discount_amount\n  FROM orders\n) o;\n```\n\n## Explanation\n\n- The subquery isolates the discount values\n- The outer query adds them together\n- This works, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_035",
    "approaches": [
      {
        "approach_title": "SUM all shipping fees",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT SUM(shipping_fee) AS total_shipping_fee FROM orders;",
        "explanation": "## Approach\n\nUse `SUM()` to add up shipping fees from all orders.\n\n## Query\n\n```sql\nSELECT SUM(shipping_fee) AS total_shipping_fee\nFROM orders;\n```\n\n## Explanation\n\n- `SUM(shipping_fee)` adds the shipping fee of every order\n- The result is the total shipping fee collected\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Sum shipping fees from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(shipping_fee) AS total_shipping_fee FROM (SELECT shipping_fee FROM orders) o;",
        "explanation": "## Approach\n\nSelect shipping fees first in a subquery, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(shipping_fee) AS total_shipping_fee\nFROM (\n  SELECT shipping_fee\n  FROM orders\n) o;\n```\n\n## Explanation\n\n- The subquery isolates the shipping fee values\n- The outer query totals them using `SUM()`\n- Valid, but unnecessary for this question"
      }
    ]
  },
  {
    "code": "ECOMMERCE_036",
    "approaches": [
      {
        "approach_title": "SUM all tax amounts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT SUM(tax_amount) AS total_tax FROM orders;",
        "explanation": "## Approach\n\nUse `SUM()` to add up tax amounts from all orders.\n\n## Query\n\n```sql\nSELECT SUM(tax_amount) AS total_tax\nFROM orders;\n```\n\n## Explanation\n\n- `SUM(tax_amount)` adds the tax value from every order\n- The result is the total tax collected\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Sum tax from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(tax_amount) AS total_tax FROM (SELECT tax_amount FROM orders) o;",
        "explanation": "## Approach\n\nSelect tax amounts first in a subquery, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(tax_amount) AS total_tax\nFROM (\n  SELECT tax_amount\n  FROM orders\n) o;\n```\n\n## Explanation\n\n- The subquery isolates the `tax_amount` column\n- The outer query totals those values\n- This works, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_037",
    "approaches": [
      {
        "approach_title": "AVG age using EXTRACT and AGE",
        "approach_type": "date_functions",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;",
        "explanation": "## Approach\n\nUse `AGE()` to calculate each customer's age and `EXTRACT(YEAR ...)` to get the year portion, then average it.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth))), 2) AS avg_age\nFROM customers;\n```\n\n## Explanation\n\n- `AGE(CURRENT_DATE, date_of_birth)` computes the interval from birth date to today\n- `EXTRACT(YEAR FROM ...)` gets the age in years\n- `AVG(...)` calculates the average across all customers\n- `ROUND(..., 2)` formats the result to 2 decimal places"
      },
      {
        "approach_title": "AVG age using DATE_PART and AGE",
        "approach_type": "date_functions",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;",
        "explanation": "## Approach\n\nUse `DATE_PART('year', AGE(...))` instead of `EXTRACT` to calculate ages, then average them.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth))), 2) AS avg_age\nFROM customers;\n```\n\n## Explanation\n\n- `DATE_PART('year', AGE(...))` is functionally similar to `EXTRACT(YEAR FROM AGE(...))`\n- It returns the age in years for each customer\n- Then `AVG()` computes the average age\n- Valid alternative, but `EXTRACT` is slightly cleaner"
      }
    ]
  },
  {
    "code": "ECOMMERCE_038",
    "approaches": [
      {
        "approach_title": "Filter by created_at + COUNT",
        "approach_type": "date_filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS count FROM products WHERE created_at > '2025-01-01';",
        "explanation": "## Approach\n\nFilter products created after the given date and count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE created_at > '2025-01-01';\n```\n\n## Explanation\n\n- `created_at > '2025-01-01'` keeps only products created after January 1, 2025\n- `COUNT(*)` counts the filtered rows\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "COUNT product IDs after date filter",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS count FROM products WHERE created_at > '2025-01-01';",
        "explanation": "## Approach\n\nApply the date filter first, then count the product IDs.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS count\nFROM products\nWHERE created_at > '2025-01-01';\n```\n\n## Explanation\n\n- `id` is non-null for each product\n- So this returns the same result as `COUNT(*)`\n- Valid, but less direct than counting rows"
      },
      {
        "approach_title": "Explicit TIMESTAMP literal",
        "approach_type": "date_functions",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT COUNT(*) AS count FROM products WHERE created_at > TIMESTAMP '2025-01-01';",
        "explanation": "## Approach\n\nUse an explicit `TIMESTAMP` literal for the cutoff date.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS count\nFROM products\nWHERE created_at > TIMESTAMP '2025-01-01';\n```\n\n## Explanation\n\n- `TIMESTAMP '2025-01-01'` makes the type explicit\n- This keeps the same semantics as comparing to `'2025-01-01'` while being clearer for learners\n- Avoids changing the logic by truncating `created_at` to a date"
      }
    ]
  },
  {
    "code": "ECOMMERCE_039",
    "approaches": [
      {
        "approach_title": "AVG age using DATE_PART and AGE",
        "approach_type": "date_functions",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;",
        "explanation": "## Approach\n\nUse `AGE()` to calculate each customer's age and `DATE_PART('year', ...)` to get the year portion, then average it.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(DATE_PART('year', AGE(CURRENT_DATE, date_of_birth))), 2) AS avg_age\nFROM customers;\n```\n\n## Explanation\n\n- `AGE(CURRENT_DATE, date_of_birth)` calculates age as an interval\n- `DATE_PART('year', ...)` extracts the age in years\n- `AVG(...)` computes the average customer age\n- `ROUND(..., 2)` formats the result neatly"
      },
      {
        "approach_title": "AVG age using EXTRACT and AGE",
        "approach_type": "date_functions",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)))::numeric, 2) AS avg_age FROM customers;",
        "explanation": "## Approach\n\nUse `EXTRACT(YEAR FROM AGE(...))` as an alternative way to get age in years, then average it.\n\n## Query\n\n```sql\nSELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth))), 2) AS avg_age\nFROM customers;\n```\n\n## Explanation\n\n- `EXTRACT(YEAR FROM AGE(...))` gives the same age-in-years value\n- Then `AVG()` computes the average across all rows\n- Valid and equivalent, but this question's primary approach uses `DATE_PART`"
      }
    ]
  },
  {
    "code": "ECOMMERCE_040",
    "approaches": [
      {
        "approach_title": "SUM all paid amounts",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT SUM(paid_amount) AS total_paid_amount FROM payments;",
        "explanation": "## Approach\n\nUse `SUM()` to add up paid amounts from all payment records.\n\n## Query\n\n```sql\nSELECT SUM(paid_amount) AS total_paid_amount\nFROM payments;\n```\n\n## Explanation\n\n- `SUM(paid_amount)` adds the amount from every payment row\n- The result is the total paid amount across all records\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Sum paid amounts from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT SUM(paid_amount) AS total_paid_amount FROM (SELECT paid_amount FROM payments) p;",
        "explanation": "## Approach\n\nSelect payment amounts first in a subquery, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(paid_amount) AS total_paid_amount\nFROM (\n  SELECT paid_amount\n  FROM payments\n) p;\n```\n\n## Explanation\n\n- The subquery isolates the `paid_amount` values\n- The outer query totals them using `SUM()`\n- Valid, but unnecessary for this question"
      }
    ]
  },
  {
    "code": "ECOMMERCE_041",
    "approaches": [
      {
        "approach_title": "GROUP BY customer",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup orders by `customer_id` and count rows in each group.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `COUNT(*)` counts orders in each group\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "COUNT order IDs per customer",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, COUNT(id) AS order_count FROM orders GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup by customer and count the non-null order ID.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(id) AS order_count\nFROM orders\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this returns the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is cleaner for row counts"
      }
    ]
  },
  {
    "code": "ECOMMERCE_042",
    "approaches": [
      {
        "approach_title": "GROUP BY category",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;",
        "explanation": "## Approach\n\nGroup products by `category_id` and count rows in each category.\n\n## Query\n\n```sql\nSELECT category_id, COUNT(*) AS product_count\nFROM products\nGROUP BY category_id;\n```\n\n## Explanation\n\n- `GROUP BY category_id` creates one group per category\n- `COUNT(*)` counts products in each group\n- This is the simplest and best approach"
      },
      {
        "approach_title": "COUNT product IDs per category",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, COUNT(id) AS product_count FROM products GROUP BY category_id;",
        "explanation": "## Approach\n\nGroup by category and count the product IDs.\n\n## Query\n\n```sql\nSELECT category_id, COUNT(id) AS product_count\nFROM products\nGROUP BY category_id;\n```\n\n## Explanation\n\n- `id` is non-null for each product\n- So this matches `COUNT(*)`\n- Valid alternative, but less direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_043",
    "approaches": [
      {
        "approach_title": "GROUP BY product",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, COUNT(*) AS review_count FROM reviews GROUP BY product_id;",
        "explanation": "## Approach\n\nGroup reviews by `product_id` and count them.\n\n## Query\n\n```sql\nSELECT product_id, COUNT(*) AS review_count\nFROM reviews\nGROUP BY product_id;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `COUNT(*)` counts reviews in each group\n- This is the optimal approach"
      },
      {
        "approach_title": "COUNT review IDs per product",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, COUNT(id) AS review_count FROM reviews GROUP BY product_id;",
        "explanation": "## Approach\n\nGroup by product and count the review IDs.\n\n## Query\n\n```sql\nSELECT product_id, COUNT(id) AS review_count\nFROM reviews\nGROUP BY product_id;\n```\n\n## Explanation\n\n- `id` is non-null for each review\n- So this produces the same result as `COUNT(*)`\n- Valid, but slightly less clean"
      }
    ]
  },
  {
    "code": "ECOMMERCE_044",
    "approaches": [
      {
        "approach_title": "SUM revenue by customer",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup orders by customer and sum their `total_amount` values.\n\n## Query\n\n```sql\nSELECT customer_id, SUM(total_amount) AS total_revenue\nFROM orders\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `SUM(total_amount)` adds revenue for each customer\n- This is the most direct solution"
      },
      {
        "approach_title": "Sum revenue from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, SUM(total_amount) AS total_revenue FROM (SELECT customer_id, total_amount FROM orders) o GROUP BY customer_id;",
        "explanation": "## Approach\n\nSelect the required columns first, then aggregate in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, SUM(total_amount) AS total_revenue\nFROM (\n  SELECT customer_id, total_amount\n  FROM orders\n) o\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- The subquery isolates relevant columns first\n- The outer query groups and sums them\n- Works correctly, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_045",
    "approaches": [
      {
        "approach_title": "AVG order value by customer",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup orders by customer and compute the average `total_amount` for each one.\n\n## Query\n\n```sql\nSELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM orders\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `AVG(total_amount)` computes average order value per customer\n- `ROUND(..., 2)` formats the result neatly\n- This is the optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value FROM (SELECT customer_id, total_amount FROM orders) o GROUP BY customer_id;",
        "explanation": "## Approach\n\nSelect customer and order totals first, then calculate averages in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM (\n  SELECT customer_id, total_amount\n  FROM orders\n) o\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- The subquery extracts only the needed columns\n- The outer query groups customers and averages totals\n- Valid, but adds unnecessary complexity"
      }
    ]
  },
  {
    "code": "ECOMMERCE_046",
    "approaches": [
      {
        "approach_title": "SUM quantity by product",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id;",
        "explanation": "## Approach\n\nGroup order items by `product_id` and sum the `quantity` for each product.\n\n## Query\n\n```sql\nSELECT product_id, SUM(quantity) AS total_quantity_sold\nFROM order_items\nGROUP BY product_id;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `SUM(quantity)` adds all quantities sold for that product\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Sum quantity from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, SUM(quantity) AS total_quantity_sold FROM (SELECT product_id, quantity FROM order_items) oi GROUP BY product_id;",
        "explanation": "## Approach\n\nSelect the required columns first, then aggregate in the outer query.\n\n## Query\n\n```sql\nSELECT product_id, SUM(quantity) AS total_quantity_sold\nFROM (\n  SELECT product_id, quantity\n  FROM order_items\n) oi\nGROUP BY product_id;\n```\n\n## Explanation\n\n- The subquery isolates only the needed columns\n- The outer query groups by product and sums quantities\n- Valid, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_047",
    "approaches": [
      {
        "approach_title": "SUM revenue by product",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id;",
        "explanation": "## Approach\n\nGroup order items by `product_id` and sum `total_price` to get revenue per product.\n\n## Query\n\n```sql\nSELECT product_id, SUM(total_price) AS total_revenue\nFROM order_items\nGROUP BY product_id;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `SUM(total_price)` adds revenue from all order item rows of that product\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Calculate revenue using quantity and unit price",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, SUM((quantity * unit_price) - discount_amount) AS total_revenue FROM order_items GROUP BY product_id;",
        "explanation": "## Approach\n\nCompute each line's net revenue using quantity, unit price, and discount, then sum it per product.\n\n## Query\n\n```sql\nSELECT product_id, SUM((quantity * unit_price) - discount_amount) AS total_revenue\nFROM order_items\nGROUP BY product_id;\n```\n\n## Explanation\n\n- `quantity * unit_price` gives gross line value\n- Subtracting `discount_amount` gives net line revenue\n- Summing per product returns total revenue\n- Valid, but since `total_price` already stores the net amount, the optimal approach is simpler"
      },
      {
        "approach_title": "Sum revenue from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT product_id, SUM(total_price) AS total_revenue FROM (SELECT product_id, total_price FROM order_items) oi GROUP BY product_id;",
        "explanation": "## Approach\n\nSelect the relevant columns first, then sum revenues in the outer query.\n\n## Query\n\n```sql\nSELECT product_id, SUM(total_price) AS total_revenue\nFROM (\n  SELECT product_id, total_price\n  FROM order_items\n) oi\nGROUP BY product_id;\n```\n\n## Explanation\n\n- The subquery isolates product and revenue columns\n- The outer query groups and sums them\n- Works correctly, but the subquery adds no benefit here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_048",
    "approaches": [
      {
        "approach_title": "AVG rating by product",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, ROUND(AVG(rating), 2) AS avg_rating FROM reviews GROUP BY product_id;",
        "explanation": "## Approach\n\nGroup reviews by `product_id` and calculate the average rating for each product.\n\n## Query\n\n```sql\nSELECT product_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM reviews\nGROUP BY product_id;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `AVG(rating)` computes the mean rating for that product\n- `ROUND(..., 2)` formats the result neatly\n- This is the optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT product_id, rating FROM reviews) r GROUP BY product_id;",
        "explanation": "## Approach\n\nSelect product and rating first, then compute averages in the outer query.\n\n## Query\n\n```sql\nSELECT product_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM (\n  SELECT product_id, rating\n  FROM reviews\n) r\nGROUP BY product_id;\n```\n\n## Explanation\n\n- The subquery isolates the required columns\n- The outer query groups by product and averages ratings\n- Valid, but more verbose than needed"
      }
    ]
  },
  {
    "code": "ECOMMERCE_049",
    "approaches": [
      {
        "approach_title": "COUNT orders by status",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT status, COUNT(*) AS order_count FROM orders GROUP BY status;",
        "explanation": "## Approach\n\nGroup orders by `status` and count the number of rows in each group.\n\n## Query\n\n```sql\nSELECT status, COUNT(*) AS order_count\nFROM orders\nGROUP BY status;\n```\n\n## Explanation\n\n- `GROUP BY status` creates one group per order status\n- `COUNT(*)` counts orders in each status\n- This is the simplest and best solution"
      },
      {
        "approach_title": "COUNT order IDs by status",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT status, COUNT(id) AS order_count FROM orders GROUP BY status;",
        "explanation": "## Approach\n\nGroup by status and count the non-null order ID.\n\n## Query\n\n```sql\nSELECT status, COUNT(id) AS order_count\nFROM orders\nGROUP BY status;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this gives the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is more idiomatic for row counts"
      }
    ]
  },
  {
    "code": "ECOMMERCE_050",
    "approaches": [
      {
        "approach_title": "COUNT payments by method",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payment_method, COUNT(*) AS payment_count FROM payments GROUP BY payment_method;",
        "explanation": "## Approach\n\nGroup payments by `payment_method` and count rows in each group.\n\n## Query\n\n```sql\nSELECT payment_method, COUNT(*) AS payment_count\nFROM payments\nGROUP BY payment_method;\n```\n\n## Explanation\n\n- `GROUP BY payment_method` creates one group per payment method\n- `COUNT(*)` counts payments in each group\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "COUNT payment IDs by method",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT payment_method, COUNT(id) AS payment_count FROM payments GROUP BY payment_method;",
        "explanation": "## Approach\n\nGroup by payment method and count the payment IDs.\n\n## Query\n\n```sql\nSELECT payment_method, COUNT(id) AS payment_count\nFROM payments\nGROUP BY payment_method;\n```\n\n## Explanation\n\n- `id` is non-null for all payment rows\n- So this returns the same result as `COUNT(*)`\n- Valid, but less direct than counting rows"
      }
    ]
  },
  {
    "code": "ECOMMERCE_051",
    "approaches": [
      {
        "approach_title": "COUNT payments by status",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payment_status, COUNT(*) AS payment_count FROM payments GROUP BY payment_status;",
        "explanation": "## Approach\n\nGroup payments by `payment_status` and count rows in each group.\n\n## Query\n\n```sql\nSELECT payment_status, COUNT(*) AS payment_count\nFROM payments\nGROUP BY payment_status;\n```\n\n## Explanation\n\n- `GROUP BY payment_status` creates one group per payment status\n- `COUNT(*)` counts payments in each group\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "COUNT payment IDs by status",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT payment_status, COUNT(id) AS payment_count FROM payments GROUP BY payment_status;",
        "explanation": "## Approach\n\nGroup by payment status and count the non-null payment ID.\n\n## Query\n\n```sql\nSELECT payment_status, COUNT(id) AS payment_count\nFROM payments\nGROUP BY payment_status;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this gives the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is more idiomatic for counting rows"
      }
    ]
  },
  {
    "code": "ECOMMERCE_052",
    "approaches": [
      {
        "approach_title": "AVG price by category",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id;",
        "explanation": "## Approach\n\nGroup products by `category_id` and calculate the average `price` for each category.\n\n## Query\n\n```sql\nSELECT category_id, ROUND(AVG(price), 2) AS avg_price\nFROM products\nGROUP BY category_id;\n```\n\n## Explanation\n\n- `GROUP BY category_id` creates one group per category\n- `AVG(price)` computes the mean product price within each category\n- `ROUND(..., 2)` formats the result neatly\n- This is the optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM (SELECT category_id, price FROM products) p GROUP BY category_id;",
        "explanation": "## Approach\n\nSelect the required columns first, then calculate the average in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, ROUND(AVG(price), 2) AS avg_price\nFROM (\n  SELECT category_id, price\n  FROM products\n) p\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery isolates category and price columns\n- The outer query groups by category and averages prices\n- Valid, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_053",
    "approaches": [
      {
        "approach_title": "AVG stock quantity by category",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity FROM products GROUP BY category_id;",
        "explanation": "## Approach\n\nGroup products by `category_id` and calculate the average `stock_quantity` for each category.\n\n## Query\n\n```sql\nSELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity\nFROM products\nGROUP BY category_id;\n```\n\n## Explanation\n\n- `GROUP BY category_id` creates one group per category\n- `AVG(stock_quantity)` computes mean stock for products in that category\n- `ROUND(..., 2)` formats the result\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Average stock from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity FROM (SELECT category_id, stock_quantity FROM products) p GROUP BY category_id;",
        "explanation": "## Approach\n\nSelect category and stock columns first, then aggregate in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, ROUND(AVG(stock_quantity), 2) AS avg_stock_quantity\nFROM (\n  SELECT category_id, stock_quantity\n  FROM products\n) p\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery isolates the needed columns\n- The outer query groups by category and averages stock\n- Correct, but unnecessarily verbose"
      }
    ]
  },
  {
    "code": "ECOMMERCE_054",
    "approaches": [
      {
        "approach_title": "SUM paid amount by payment method",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payment_method, SUM(paid_amount) AS total_paid_amount FROM payments GROUP BY payment_method;",
        "explanation": "## Approach\n\nGroup payments by `payment_method` and sum `paid_amount` for each method.\n\n## Query\n\n```sql\nSELECT payment_method, SUM(paid_amount) AS total_paid_amount\nFROM payments\nGROUP BY payment_method;\n```\n\n## Explanation\n\n- `GROUP BY payment_method` creates one group per method\n- `SUM(paid_amount)` adds the amounts collected through each method\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Sum paid amount from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT payment_method, SUM(paid_amount) AS total_paid_amount FROM (SELECT payment_method, paid_amount FROM payments) p GROUP BY payment_method;",
        "explanation": "## Approach\n\nSelect payment method and amount first, then sum in the outer query.\n\n## Query\n\n```sql\nSELECT payment_method, SUM(paid_amount) AS total_paid_amount\nFROM (\n  SELECT payment_method, paid_amount\n  FROM payments\n) p\nGROUP BY payment_method;\n```\n\n## Explanation\n\n- The subquery isolates only the needed columns\n- The outer query groups by method and sums amounts\n- Valid, but the subquery adds no benefit here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_055",
    "approaches": [
      {
        "approach_title": "AVG paid amount by payment status",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM payments GROUP BY payment_status;",
        "explanation": "## Approach\n\nGroup payments by `payment_status` and calculate the average `paid_amount` for each status.\n\n## Query\n\n```sql\nSELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount\nFROM payments\nGROUP BY payment_status;\n```\n\n## Explanation\n\n- `GROUP BY payment_status` creates one group per status\n- `AVG(paid_amount)` computes the mean paid amount within each group\n- `ROUND(..., 2)` formats the result neatly\n- This is the optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount FROM (SELECT payment_status, paid_amount FROM payments) p GROUP BY payment_status;",
        "explanation": "## Approach\n\nSelect payment status and amount first, then compute averages in the outer query.\n\n## Query\n\n```sql\nSELECT payment_status, ROUND(AVG(paid_amount), 2) AS avg_paid_amount\nFROM (\n  SELECT payment_status, paid_amount\n  FROM payments\n) p\nGROUP BY payment_status;\n```\n\n## Explanation\n\n- The subquery isolates the required columns\n- The outer query groups by status and averages amounts\n- Correct, but more verbose than needed"
      }
    ]
  },
  {
    "code": "ECOMMERCE_056",
    "approaches": [
      {
        "approach_title": "Group by order date",
        "approach_type": "date_grouping",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DATE(order_date) AS order_day, COUNT(*) AS order_count FROM orders GROUP BY DATE(order_date);",
        "explanation": "## Approach\n\nExtract the date part from `order_date`, then group orders by that day and count them.\n\n## Query\n\n```sql\nSELECT DATE(order_date) AS order_day, COUNT(*) AS order_count\nFROM orders\nGROUP BY DATE(order_date);\n```\n\n## Explanation\n\n- `DATE(order_date)` removes the time part\n- `GROUP BY DATE(order_date)` creates one group per day\n- `COUNT(*)` counts orders for each day\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Group by casted date",
        "approach_type": "date_grouping",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT order_date::date AS order_day, COUNT(*) AS order_count FROM orders GROUP BY order_date::date;",
        "explanation": "## Approach\n\nCast the timestamp to `date`, then group and count rows.\n\n## Query\n\n```sql\nSELECT order_date::date AS order_day, COUNT(*) AS order_count\nFROM orders\nGROUP BY order_date::date;\n```\n\n## Explanation\n\n- `order_date::date` is another way to remove the time portion\n- The rest of the logic stays the same\n- Valid and equivalent, but the `DATE()` form is slightly more beginner-friendly"
      }
    ]
  },
  {
    "code": "ECOMMERCE_057",
    "approaches": [
      {
        "approach_title": "Sum revenue by order date",
        "approach_type": "date_grouping",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DATE(order_date) AS order_day, SUM(total_amount) AS total_revenue FROM orders GROUP BY DATE(order_date);",
        "explanation": "## Approach\n\nExtract the date from `order_date`, then group orders by day and sum their revenue.\n\n## Query\n\n```sql\nSELECT DATE(order_date) AS order_day, SUM(total_amount) AS total_revenue\nFROM orders\nGROUP BY DATE(order_date);\n```\n\n## Explanation\n\n- `DATE(order_date)` keeps only the date portion\n- `GROUP BY` creates one group per day\n- `SUM(total_amount)` adds revenue for that day\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Sum revenue by casted date",
        "approach_type": "date_grouping",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT order_date::date AS order_day, SUM(total_amount) AS total_revenue FROM orders GROUP BY order_date::date;",
        "explanation": "## Approach\n\nCast `order_date` to `date`, then group and sum revenue.\n\n## Query\n\n```sql\nSELECT order_date::date AS order_day, SUM(total_amount) AS total_revenue\nFROM orders\nGROUP BY order_date::date;\n```\n\n## Explanation\n\n- `order_date::date` removes the time component\n- `SUM(total_amount)` returns daily revenue totals\n- Correct and equivalent, but slightly less explicit for beginners"
      },
      {
        "approach_title": "Revenue from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT order_day, SUM(total_amount) AS total_revenue FROM (SELECT DATE(order_date) AS order_day, total_amount FROM orders) o GROUP BY order_day;",
        "explanation": "## Approach\n\nExtract the date in a subquery first, then group and sum in the outer query.\n\n## Query\n\n```sql\nSELECT order_day, SUM(total_amount) AS total_revenue\nFROM (\n  SELECT DATE(order_date) AS order_day, total_amount\n  FROM orders\n) o\nGROUP BY order_day;\n```\n\n## Explanation\n\n- The subquery prepares daily order rows first\n- The outer query aggregates revenue per day\n- Works correctly, but the extra layer is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_058",
    "approaches": [
      {
        "approach_title": "Average order value by status",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value FROM orders GROUP BY status;",
        "explanation": "## Approach\n\nGroup orders by `status` and calculate the average `total_amount` for each group.\n\n## Query\n\n```sql\nSELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM orders\nGROUP BY status;\n```\n\n## Explanation\n\n- `GROUP BY status` creates one group per order status\n- `AVG(total_amount)` computes the mean order total per group\n- `ROUND(..., 2)` formats the result neatly\n- This is the optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value FROM (SELECT status, total_amount FROM orders) o GROUP BY status;",
        "explanation": "## Approach\n\nSelect status and total amount first, then compute averages in the outer query.\n\n## Query\n\n```sql\nSELECT status, ROUND(AVG(total_amount), 2) AS avg_order_value\nFROM (\n  SELECT status, total_amount\n  FROM orders\n) o\nGROUP BY status;\n```\n\n## Explanation\n\n- The subquery isolates the needed columns\n- The outer query groups and averages them\n- Valid, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_059",
    "approaches": [
      {
        "approach_title": "Count reviews by customer",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup reviews by `customer_id` and count rows in each group.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(*) AS review_count\nFROM reviews\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `COUNT(*)` counts reviews submitted by each customer\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Count review IDs by customer",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, COUNT(id) AS review_count FROM reviews GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup by customer and count the non-null review ID.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(id) AS review_count\nFROM reviews\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this gives the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is more idiomatic"
      }
    ]
  },
  {
    "code": "ECOMMERCE_060",
    "approaches": [
      {
        "approach_title": "Average rating by customer",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating FROM reviews GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup reviews by `customer_id` and calculate the average rating given by each customer.\n\n## Query\n\n```sql\nSELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM reviews\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `AVG(rating)` computes the mean rating given by each customer\n- `ROUND(..., 2)` formats the result neatly\n- This is the optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT customer_id, rating FROM reviews) r GROUP BY customer_id;",
        "explanation": "## Approach\n\nSelect customer and rating first, then compute the average in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM (\n  SELECT customer_id, rating\n  FROM reviews\n) r\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- The subquery isolates the required columns\n- The outer query groups customers and averages ratings\n- Correct, but unnecessarily verbose for this task"
      }
    ]
  },
  {
    "code": "ECOMMERCE_061",
    "approaches": [
      {
        "approach_title": "Join products and sum quantity by category",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.category_id, SUM(oi.quantity) AS total_quantity_sold FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin `order_items` with `products` to get each product's category, then group by category and sum the sold quantity.\n\n## Query\n\n```sql\nSELECT p.category_id, SUM(oi.quantity) AS total_quantity_sold\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `order_items` contains sold quantities\n- `products` provides the `category_id`\n- `JOIN` connects each sold item to its category\n- `SUM(oi.quantity)` adds all sold quantities per category\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Aggregate after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, SUM(quantity) AS total_quantity_sold FROM (SELECT p.category_id, oi.quantity FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY category_id;",
        "explanation": "## Approach\n\nFirst join order items with products in a subquery, then group by category in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, SUM(quantity) AS total_quantity_sold\nFROM (\n  SELECT p.category_id, oi.quantity\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n) x\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery prepares category and quantity pairs\n- The outer query groups them by category\n- This works correctly, but the extra layer is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_062",
    "approaches": [
      {
        "approach_title": "Join products and sum revenue by category",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin order items with products to get the category, then sum `total_price` for each category.\n\n## Query\n\n```sql\nSELECT p.category_id, SUM(oi.total_price) AS total_revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `total_price` stores the revenue for each order item row\n- `JOIN` maps each product to its category\n- `SUM(oi.total_price)` gives total revenue per category\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Calculate revenue using quantity and unit price",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.category_id, SUM((oi.quantity * oi.unit_price) - oi.discount_amount) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin the tables and compute revenue from quantity, unit price, and discount instead of using `total_price` directly.\n\n## Query\n\n```sql\nSELECT p.category_id, SUM((oi.quantity * oi.unit_price) - oi.discount_amount) AS total_revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `quantity * unit_price` gives gross line value\n- Subtracting `discount_amount` gives net revenue\n- Summing by category returns category revenue\n- Valid, but using `total_price` is simpler because it already stores the final line amount"
      },
      {
        "approach_title": "Aggregate after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT category_id, SUM(total_price) AS total_revenue FROM (SELECT p.category_id, oi.total_price FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY category_id;",
        "explanation": "## Approach\n\nJoin first in a subquery, then group and sum in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, SUM(total_price) AS total_revenue\nFROM (\n  SELECT p.category_id, oi.total_price\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n) x\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery prepares category and revenue pairs\n- The outer query aggregates them per category\n- Correct, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_063",
    "approaches": [
      {
        "approach_title": "Join products and average review rating by category",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.category_id, ROUND(AVG(r.rating), 2) AS avg_rating FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin reviews with products to get the category for each reviewed product, then group by category and average the ratings.\n\n## Query\n\n```sql\nSELECT p.category_id, ROUND(AVG(r.rating), 2) AS avg_rating\nFROM reviews r\nJOIN products p ON r.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `reviews` contains product ratings\n- `products` provides the category of each product\n- `AVG(r.rating)` computes the mean rating for each category\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Average ratings after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT p.category_id, r.rating FROM reviews r JOIN products p ON r.product_id = p.id) x GROUP BY category_id;",
        "explanation": "## Approach\n\nFirst join reviews and products in a subquery, then average ratings by category in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, ROUND(AVG(rating), 2) AS avg_rating\nFROM (\n  SELECT p.category_id, r.rating\n  FROM reviews r\n  JOIN products p ON r.product_id = p.id\n) x\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery builds category-rating rows first\n- The outer query groups by category and averages them\n- Valid, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_064",
    "approaches": [
      {
        "approach_title": "Join shipping address and count orders by city",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.city, COUNT(*) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;",
        "explanation": "## Approach\n\nJoin orders with their shipping addresses, then group by city and count orders.\n\n## Query\n\n```sql\nSELECT a.city, COUNT(*) AS order_count\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.city;\n```\n\n## Explanation\n\n- `orders` stores `shipping_address_id`\n- `addresses` provides the `city`\n- `GROUP BY a.city` creates one group per city\n- `COUNT(*)` counts orders shipped to each city\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Count order IDs by city",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT a.city, COUNT(o.id) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;",
        "explanation": "## Approach\n\nJoin orders and addresses, then count non-null order IDs per city.\n\n## Query\n\n```sql\nSELECT a.city, COUNT(o.id) AS order_count\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.city;\n```\n\n## Explanation\n\n- `o.id` is never `NULL`\n- So this gives the same result as `COUNT(*)`\n- Valid, but less direct than counting rows"
      },
      {
        "approach_title": "Aggregate after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, COUNT(*) AS order_count FROM (SELECT a.city FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY city;",
        "explanation": "## Approach\n\nJoin first in a subquery, then group the resulting city values in the outer query.\n\n## Query\n\n```sql\nSELECT city, COUNT(*) AS order_count\nFROM (\n  SELECT a.city\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n) x\nGROUP BY city;\n```\n\n## Explanation\n\n- The subquery prepares one city value per order\n- The outer query counts rows per city\n- Correct, but the extra layer is unnecessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_065",
    "approaches": [
      {
        "approach_title": "Join shipping address and sum revenue by city",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;",
        "explanation": "## Approach\n\nJoin orders with their shipping addresses, then group by city and sum `total_amount`.\n\n## Query\n\n```sql\nSELECT a.city, SUM(o.total_amount) AS total_revenue\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.city;\n```\n\n## Explanation\n\n- `orders` contains order totals\n- `addresses` provides the shipping city\n- `SUM(o.total_amount)` adds revenue for each city\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Revenue by city from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT city, SUM(total_amount) AS total_revenue FROM (SELECT a.city, o.total_amount FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY city;",
        "explanation": "## Approach\n\nFirst join orders with addresses in a subquery, then sum revenue by city in the outer query.\n\n## Query\n\n```sql\nSELECT city, SUM(total_amount) AS total_revenue\nFROM (\n  SELECT a.city, o.total_amount\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n) x\nGROUP BY city;\n```\n\n## Explanation\n\n- The subquery prepares city and revenue pairs first\n- The outer query groups by city and sums the totals\n- Works correctly, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_066",
    "approaches": [
      {
        "approach_title": "Join shipping address and count orders by state",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.state, COUNT(*) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;",
        "explanation": "## Approach\n\nJoin orders with their shipping addresses, then group by state and count orders.\n\n## Query\n\n```sql\nSELECT a.state, COUNT(*) AS order_count\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.state;\n```\n\n## Explanation\n\n- `shipping_address_id` links each order to an address\n- `state` comes from `addresses`\n- `GROUP BY a.state` creates one group per state\n- `COUNT(*)` counts orders shipped to each state\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Count order IDs by state",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT a.state, COUNT(o.id) AS order_count FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;",
        "explanation": "## Approach\n\nJoin orders and addresses, then count order IDs per state.\n\n## Query\n\n```sql\nSELECT a.state, COUNT(o.id) AS order_count\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.state;\n```\n\n## Explanation\n\n- `o.id` is never `NULL`\n- So `COUNT(o.id)` returns the same result as `COUNT(*)`\n- Valid, but slightly less direct"
      },
      {
        "approach_title": "Aggregate after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT state, COUNT(*) AS order_count FROM (SELECT a.state FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY state;",
        "explanation": "## Approach\n\nFirst join orders to addresses in a subquery, then count rows per state in the outer query.\n\n## Query\n\n```sql\nSELECT state, COUNT(*) AS order_count\nFROM (\n  SELECT a.state\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n) x\nGROUP BY state;\n```\n\n## Explanation\n\n- The subquery prepares one state value per order\n- The outer query counts rows for each state\n- Correct, but the extra layer is unnecessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_067",
    "approaches": [
      {
        "approach_title": "Join shipping address and sum revenue by state",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.state, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.state;",
        "explanation": "## Approach\n\nJoin orders with shipping addresses, then group by state and sum order revenue.\n\n## Query\n\n```sql\nSELECT a.state, SUM(o.total_amount) AS total_revenue\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.state;\n```\n\n## Explanation\n\n- `orders` stores the order revenue in `total_amount`\n- `addresses` provides the shipping state\n- `SUM(o.total_amount)` adds revenue per state\n- This is the most direct and optimal approach"
      },
      {
        "approach_title": "Revenue by state from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT state, SUM(total_amount) AS total_revenue FROM (SELECT a.state, o.total_amount FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY state;",
        "explanation": "## Approach\n\nPrepare state and revenue values in a subquery, then aggregate them in the outer query.\n\n## Query\n\n```sql\nSELECT state, SUM(total_amount) AS total_revenue\nFROM (\n  SELECT a.state, o.total_amount\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n) x\nGROUP BY state;\n```\n\n## Explanation\n\n- The subquery creates state-revenue pairs first\n- The outer query groups by state and sums revenue\n- Valid, but the subquery adds no real benefit here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_068",
    "approaches": [
      {
        "approach_title": "Join products and count order items by brand",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.brand, COUNT(*) AS order_item_count FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;",
        "explanation": "## Approach\n\nJoin order items with products to get the brand, then group by brand and count order item rows.\n\n## Query\n\n```sql\nSELECT p.brand, COUNT(*) AS order_item_count\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.brand;\n```\n\n## Explanation\n\n- `order_items` stores purchased product rows\n- `products` provides the brand for each product\n- `COUNT(*)` counts how many order item rows belong to each brand\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Count order item IDs by brand",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.brand, COUNT(oi.id) AS order_item_count FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;",
        "explanation": "## Approach\n\nJoin the tables and count non-null order item IDs per brand.\n\n## Query\n\n```sql\nSELECT p.brand, COUNT(oi.id) AS order_item_count\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.brand;\n```\n\n## Explanation\n\n- `oi.id` is never `NULL`\n- So this returns the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is cleaner for row counts"
      },
      {
        "approach_title": "Aggregate after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT brand, COUNT(*) AS order_item_count FROM (SELECT p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY brand;",
        "explanation": "## Approach\n\nJoin first in a subquery, then count rows by brand in the outer query.\n\n## Query\n\n```sql\nSELECT brand, COUNT(*) AS order_item_count\nFROM (\n  SELECT p.brand\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n) x\nGROUP BY brand;\n```\n\n## Explanation\n\n- The subquery prepares one brand value per order item row\n- The outer query counts them by brand\n- Correct, but unnecessarily verbose"
      }
    ]
  },
  {
    "code": "ECOMMERCE_069",
    "approaches": [
      {
        "approach_title": "Join products and sum revenue by brand",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;",
        "explanation": "## Approach\n\nJoin order items with products to get the brand, then group by brand and sum `total_price`.\n\n## Query\n\n```sql\nSELECT p.brand, SUM(oi.total_price) AS total_revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.brand;\n```\n\n## Explanation\n\n- `total_price` stores line-level revenue\n- `JOIN` maps each order item to a product brand\n- `SUM(oi.total_price)` adds revenue for each brand\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Calculate revenue using quantity and unit price",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.brand, SUM((oi.quantity * oi.unit_price) - oi.discount_amount) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand;",
        "explanation": "## Approach\n\nCompute net revenue manually from quantity, unit price, and discount, then sum it by brand.\n\n## Query\n\n```sql\nSELECT p.brand, SUM((oi.quantity * oi.unit_price) - oi.discount_amount) AS total_revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.brand;\n```\n\n## Explanation\n\n- `quantity * unit_price` gives gross line value\n- Subtracting `discount_amount` gives net revenue\n- Summing by brand returns total brand revenue\n- Valid, but using `total_price` is simpler because it already stores the final line amount"
      },
      {
        "approach_title": "Revenue by brand from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT brand, SUM(total_price) AS total_revenue FROM (SELECT p.brand, oi.total_price FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY brand;",
        "explanation": "## Approach\n\nBuild brand-revenue pairs in a subquery, then aggregate in the outer query.\n\n## Query\n\n```sql\nSELECT brand, SUM(total_price) AS total_revenue\nFROM (\n  SELECT p.brand, oi.total_price\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n) x\nGROUP BY brand;\n```\n\n## Explanation\n\n- The subquery prepares brand and revenue values first\n- The outer query groups by brand and sums revenue\n- Correct, but the extra layer is unnecessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_070",
    "approaches": [
      {
        "approach_title": "AVG price by brand",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT brand, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY brand;",
        "explanation": "## Approach\n\nGroup products by `brand` and calculate the average `price` for each brand.\n\n## Query\n\n```sql\nSELECT brand, ROUND(AVG(price), 2) AS avg_price\nFROM products\nGROUP BY brand;\n```\n\n## Explanation\n\n- `GROUP BY brand` creates one group per brand\n- `AVG(price)` computes the mean product price within each brand\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT brand, ROUND(AVG(price), 2) AS avg_price FROM (SELECT brand, price FROM products) p GROUP BY brand;",
        "explanation": "## Approach\n\nSelect brand and price first, then compute brand-wise averages in the outer query.\n\n## Query\n\n```sql\nSELECT brand, ROUND(AVG(price), 2) AS avg_price\nFROM (\n  SELECT brand, price\n  FROM products\n) p\nGROUP BY brand;\n```\n\n## Explanation\n\n- The subquery isolates the required columns\n- The outer query groups by brand and averages prices\n- Valid, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_071",
    "approaches": [
      {
        "approach_title": "COUNT products by active status",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT is_active, COUNT(*) AS product_count FROM products GROUP BY is_active;",
        "explanation": "## Approach\n\nGroup products by `is_active` and count rows in each group.\n\n## Query\n\n```sql\nSELECT is_active, COUNT(*) AS product_count\nFROM products\nGROUP BY is_active;\n```\n\n## Explanation\n\n- `GROUP BY is_active` creates one group for `TRUE` and one for `FALSE`\n- `COUNT(*)` counts products in each group\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "COUNT product IDs by active status",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT is_active, COUNT(id) AS product_count FROM products GROUP BY is_active;",
        "explanation": "## Approach\n\nGroup by active status and count the non-null product ID.\n\n## Query\n\n```sql\nSELECT is_active, COUNT(id) AS product_count\nFROM products\nGROUP BY is_active;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this gives the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is more idiomatic"
      }
    ]
  },
  {
    "code": "ECOMMERCE_072",
    "approaches": [
      {
        "approach_title": "COUNT customers by active status",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT is_active, COUNT(*) AS customer_count FROM customers GROUP BY is_active;",
        "explanation": "## Approach\n\nGroup customers by `is_active` and count rows in each group.\n\n## Query\n\n```sql\nSELECT is_active, COUNT(*) AS customer_count\nFROM customers\nGROUP BY is_active;\n```\n\n## Explanation\n\n- `GROUP BY is_active` creates one group per active status\n- `COUNT(*)` counts customers in each group\n- This is the simplest and best approach"
      },
      {
        "approach_title": "COUNT customer IDs by active status",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT is_active, COUNT(id) AS customer_count FROM customers GROUP BY is_active;",
        "explanation": "## Approach\n\nGroup by customer status and count the primary key.\n\n## Query\n\n```sql\nSELECT is_active, COUNT(id) AS customer_count\nFROM customers\nGROUP BY is_active;\n```\n\n## Explanation\n\n- `id` is non-null for every customer\n- So this returns the same result as `COUNT(*)`\n- Valid, but slightly less direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_073",
    "approaches": [
      {
        "approach_title": "AVG rating by brand",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT brand, ROUND(AVG(rating), 2) AS avg_rating FROM products GROUP BY brand;",
        "explanation": "## Approach\n\nGroup products by `brand` and calculate the average product rating for each brand.\n\n## Query\n\n```sql\nSELECT brand, ROUND(AVG(rating), 2) AS avg_rating\nFROM products\nGROUP BY brand;\n```\n\n## Explanation\n\n- `GROUP BY brand` creates one group per brand\n- `AVG(rating)` computes the mean product rating per brand\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Average from subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT brand, ROUND(AVG(rating), 2) AS avg_rating FROM (SELECT brand, rating FROM products) p GROUP BY brand;",
        "explanation": "## Approach\n\nSelect brand and rating first, then compute averages in the outer query.\n\n## Query\n\n```sql\nSELECT brand, ROUND(AVG(rating), 2) AS avg_rating\nFROM (\n  SELECT brand, rating\n  FROM products\n) p\nGROUP BY brand;\n```\n\n## Explanation\n\n- The subquery isolates the needed columns\n- The outer query groups by brand and averages ratings\n- Correct, but unnecessarily verbose"
      }
    ]
  },
  {
    "code": "ECOMMERCE_074",
    "approaches": [
      {
        "approach_title": "Join products and count reviews by category",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.category_id, COUNT(*) AS review_count FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin reviews with products to get each reviewed product's category, then group by category and count reviews.\n\n## Query\n\n```sql\nSELECT p.category_id, COUNT(*) AS review_count\nFROM reviews r\nJOIN products p ON r.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `reviews` contains one row per review\n- `products` provides the category of the reviewed product\n- `COUNT(*)` counts reviews per category\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Count review IDs by category",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.category_id, COUNT(r.id) AS review_count FROM reviews r JOIN products p ON r.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin the tables and count non-null review IDs per category.\n\n## Query\n\n```sql\nSELECT p.category_id, COUNT(r.id) AS review_count\nFROM reviews r\nJOIN products p ON r.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `r.id` is never `NULL`\n- So this gives the same answer as `COUNT(*)`\n- Valid, but slightly less direct"
      },
      {
        "approach_title": "Aggregate after subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT category_id, COUNT(*) AS review_count FROM (SELECT p.category_id FROM reviews r JOIN products p ON r.product_id = p.id) x GROUP BY category_id;",
        "explanation": "## Approach\n\nJoin reviews and products in a subquery first, then count rows by category in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, COUNT(*) AS review_count\nFROM (\n  SELECT p.category_id\n  FROM reviews r\n  JOIN products p ON r.product_id = p.id\n) x\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery prepares one category value per review\n- The outer query counts rows per category\n- Correct, but the subquery is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_075",
    "approaches": [
      {
        "approach_title": "Join shipping address and average order total by city",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.city, ROUND(AVG(o.total_amount), 2) AS avg_order_total FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city;",
        "explanation": "## Approach\n\nJoin orders with their shipping addresses, then group by city and calculate the average order total.\n\n## Query\n\n```sql\nSELECT a.city, ROUND(AVG(o.total_amount), 2) AS avg_order_total\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.city;\n```\n\n## Explanation\n\n- `shipping_address_id` links each order to an address\n- `city` comes from `addresses`\n- `AVG(o.total_amount)` computes the mean order value per city\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Average from subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT city, ROUND(AVG(total_amount), 2) AS avg_order_total FROM (SELECT a.city, o.total_amount FROM orders o JOIN addresses a ON o.shipping_address_id = a.id) x GROUP BY city;",
        "explanation": "## Approach\n\nPrepare city and order total values in a subquery, then average them by city in the outer query.\n\n## Query\n\n```sql\nSELECT city, ROUND(AVG(total_amount), 2) AS avg_order_total\nFROM (\n  SELECT a.city, o.total_amount\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n) x\nGROUP BY city;\n```\n\n## Explanation\n\n- The subquery builds city-total pairs first\n- The outer query groups by city and averages totals\n- Valid, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_076",
    "approaches": [
      {
        "approach_title": "GROUP BY + ORDER BY + LIMIT",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nGroup orders by customer, calculate total revenue for each customer, then sort by revenue in descending order and keep the top 5.\n\n## Query\n\n```sql\nSELECT customer_id, SUM(total_amount) AS total_revenue\nFROM orders\nGROUP BY customer_id\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `SUM(total_amount)` calculates each customer's total revenue\n- `ORDER BY total_revenue DESC` sorts customers from highest to lowest revenue\n- `LIMIT 5` returns only the top 5 customers\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + ORDER BY + LIMIT",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, total_revenue FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) x ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nFirst calculate total revenue per customer in a subquery, then sort and limit in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, total_revenue\nFROM (\n  SELECT customer_id, SUM(total_amount) AS total_revenue\n  FROM orders\n  GROUP BY customer_id\n) x\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- The subquery builds customer revenue totals first\n- The outer query sorts them and returns the top 5\n- Correct, but the extra layer is unnecessary here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_077",
    "approaches": [
      {
        "approach_title": "GROUP BY + ORDER BY + LIMIT",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id ORDER BY total_quantity_sold DESC LIMIT 5;",
        "explanation": "## Approach\n\nGroup order items by product, sum sold quantities, then sort descending and return the top 5.\n\n## Query\n\n```sql\nSELECT product_id, SUM(quantity) AS total_quantity_sold\nFROM order_items\nGROUP BY product_id\nORDER BY total_quantity_sold DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `SUM(quantity)` gives total units sold per product\n- `ORDER BY total_quantity_sold DESC` ranks the best-selling products first\n- `LIMIT 5` returns only the top 5\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + ORDER BY + LIMIT",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, total_quantity_sold FROM (SELECT product_id, SUM(quantity) AS total_quantity_sold FROM order_items GROUP BY product_id) x ORDER BY total_quantity_sold DESC LIMIT 5;",
        "explanation": "## Approach\n\nCompute total quantity sold per product in a subquery, then sort and limit in the outer query.\n\n## Query\n\n```sql\nSELECT product_id, total_quantity_sold\nFROM (\n  SELECT product_id, SUM(quantity) AS total_quantity_sold\n  FROM order_items\n  GROUP BY product_id\n) x\nORDER BY total_quantity_sold DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- The subquery builds product sales totals first\n- The outer query orders them and returns the top 5\n- Valid, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_078",
    "approaches": [
      {
        "approach_title": "Join + GROUP BY + ORDER BY + LIMIT",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nJoin order items with products to get categories, then sum revenue per category, sort descending, and return the top 5.\n\n## Query\n\n```sql\nSELECT p.category_id, SUM(oi.total_price) AS total_revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.category_id\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `JOIN` maps each order item to its product category\n- `SUM(oi.total_price)` calculates revenue for each category\n- `ORDER BY total_revenue DESC` ranks categories by revenue\n- `LIMIT 5` returns the top 5 categories\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + ORDER BY + LIMIT",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, total_revenue FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) x ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nCompute revenue per category in a subquery, then sort and limit in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, total_revenue\nFROM (\n  SELECT p.category_id, SUM(oi.total_price) AS total_revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY p.category_id\n) x\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- The subquery builds category revenue totals first\n- The outer query ranks them and returns the top 5\n- Correct, but the extra layer is unnecessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_079",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER window function",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT category_id, id AS product_id, rating FROM (SELECT category_id, id, rating, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY rating DESC, id ASC) AS rn FROM products) ranked WHERE rn = 1;",
        "explanation": "## Approach\n\nUse `ROW_NUMBER()` to rank products within each category by rating, then keep only rank 1.\n\n## Query\n\n```sql\nSELECT category_id, id AS product_id, rating\nFROM (\n  SELECT category_id, id, rating,\n         ROW_NUMBER() OVER (\n           PARTITION BY category_id\n           ORDER BY rating DESC, id ASC\n         ) AS rn\n  FROM products\n) ranked\nWHERE rn = 1;\n```\n\n## Explanation\n\n- `PARTITION BY category_id` creates a separate ranking inside each category\n- `ORDER BY rating DESC` puts the highest rated product first\n- `id ASC` provides a deterministic tie-breaker\n- `WHERE rn = 1` keeps only the top product per category\n- This is the most robust and optimal solution"
      },
      {
        "approach_title": "Correlated subquery with MAX",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.category_id, p.id AS product_id, p.rating FROM products p WHERE p.id = (SELECT p2.id FROM products p2 WHERE p2.category_id = p.category_id ORDER BY p2.rating DESC, p2.id ASC LIMIT 1);",
        "explanation": "## Approach\n\nFor each product, compare its rating to the maximum rating in its category.\n\n## Query\n\n```sql\nSELECT p.category_id, p.id AS product_id, p.rating\nFROM products p\nWHERE p.rating = (\n  SELECT MAX(p2.rating)\n  FROM products p2\n  WHERE p2.category_id = p.category_id\n);\n```\n\n## Explanation\n\n- The subquery finds the highest rating in the current product's category\n- The outer query keeps products whose rating matches that maximum\n- This can return multiple rows for a category when there are ties\n- Valid alternative, but less deterministic than the window-function approach"
      }
    ]
  },
  {
    "code": "ECOMMERCE_080",
    "approaches": [
      {
        "approach_title": "GROUP BY + HAVING",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 10;",
        "explanation": "## Approach\n\nGroup orders by customer, count them, and keep only customers with more than 10 orders.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 10;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `COUNT(*)` counts how many orders each customer placed\n- `HAVING COUNT(*) > 10` filters the grouped result\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + WHERE filter",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, order_count FROM (SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id) x WHERE order_count > 10;",
        "explanation": "## Approach\n\nFirst compute order counts per customer in a subquery, then filter the result in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, order_count\nFROM (\n  SELECT customer_id, COUNT(*) AS order_count\n  FROM orders\n  GROUP BY customer_id\n) x\nWHERE order_count > 10;\n```\n\n## Explanation\n\n- The subquery calculates order counts first\n- The outer query filters customers with counts greater than 10\n- Correct, but `HAVING` is more direct for grouped filtering"
      }
    ]
  },
  {
    "code": "ECOMMERCE_081",
    "approaches": [
      {
        "approach_title": "LEFT JOIN + IS NULL",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.id AS product_id FROM products p LEFT JOIN reviews r ON p.id = r.product_id WHERE r.product_id IS NULL;",
        "explanation": "## Approach\n\nJoin products to reviews using a `LEFT JOIN`, then keep only rows where no matching review exists.\n\n## Query\n\n```sql\nSELECT p.id AS product_id\nFROM products p\nLEFT JOIN reviews r ON p.id = r.product_id\nWHERE r.product_id IS NULL;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all products\n- Products with no reviews get `NULL` on review columns\n- `WHERE r.product_id IS NULL` filters only products without reviews\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "exists",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.id AS product_id FROM products p WHERE NOT EXISTS (SELECT 1 FROM reviews r WHERE r.product_id = p.id);",
        "explanation": "## Approach\n\nReturn products for which no matching review row exists.\n\n## Query\n\n```sql\nSELECT p.id AS product_id\nFROM products p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM reviews r\n  WHERE r.product_id = p.id\n);\n```\n\n## Explanation\n\n- `NOT EXISTS` checks absence of related rows\n- It returns products with no reviews\n- This is a strong alternative and often very readable"
      },
      {
        "approach_title": "NOT IN",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id AS product_id FROM products WHERE id NOT IN (SELECT product_id FROM reviews);",
        "explanation": "## Approach\n\nExclude product IDs that appear in the reviews table.\n\n## Query\n\n```sql\nSELECT id AS product_id\nFROM products\nWHERE id NOT IN (\n  SELECT product_id\n  FROM reviews\n);\n```\n\n## Explanation\n\n- The subquery returns reviewed product IDs\n- `NOT IN` keeps only products not present there\n- Valid here, though `LEFT JOIN` or `NOT EXISTS` is usually preferred"
      }
    ]
  },
  {
    "code": "ECOMMERCE_082",
    "approaches": [
      {
        "approach_title": "LEFT JOIN + IS NULL",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT c.id AS customer_id FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.customer_id IS NULL;",
        "explanation": "## Approach\n\nJoin customers to orders with a `LEFT JOIN`, then keep only customers with no matching orders.\n\n## Query\n\n```sql\nSELECT c.id AS customer_id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.customer_id IS NULL;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all customers\n- Customers without orders get `NULL` on order columns\n- `WHERE o.customer_id IS NULL` filters only those customers\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "NOT EXISTS",
        "approach_type": "exists",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT c.id AS customer_id FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);",
        "explanation": "## Approach\n\nReturn customers for whom no related order row exists.\n\n## Query\n\n```sql\nSELECT c.id AS customer_id\nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM orders o\n  WHERE o.customer_id = c.id\n);\n```\n\n## Explanation\n\n- `NOT EXISTS` checks for absence of matching orders\n- It is a clean alternative to `LEFT JOIN ... IS NULL`\n- Valid and commonly used"
      },
      {
        "approach_title": "NOT IN",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT c.id AS customer_id FROM customers c WHERE c.id NOT IN (SELECT DISTINCT o.customer_id FROM orders o WHERE o.customer_id IS NOT NULL);",
        "explanation": "## Approach\n\nExclude customer IDs that appear in the orders table.\n\n## Query\n\n```sql\nSELECT id AS customer_id\nFROM customers\nWHERE id NOT IN (\n  SELECT customer_id\n  FROM orders\n);\n```\n\n## Explanation\n\n- The subquery returns customers who placed orders\n- `NOT IN` keeps only customers outside that set\n- Valid, though `NOT EXISTS` or `LEFT JOIN` is often preferred"
      }
    ]
  },
  {
    "code": "ECOMMERCE_083",
    "approaches": [
      {
        "approach_title": "Join with category average subquery",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.id AS product_id, p.category_id, p.price FROM products p JOIN (SELECT category_id, AVG(price) AS avg_price FROM products GROUP BY category_id) c ON p.category_id = c.category_id WHERE p.price > c.avg_price;",
        "explanation": "## Approach\n\nCompute average price per category in a subquery, join it back to products, and keep products priced above their category average.\n\n## Query\n\n```sql\nSELECT p.id AS product_id, p.category_id, p.price\nFROM products p\nJOIN (\n  SELECT category_id, AVG(price) AS avg_price\n  FROM products\n  GROUP BY category_id\n) c ON p.category_id = c.category_id\nWHERE p.price > c.avg_price;\n```\n\n## Explanation\n\n- The subquery calculates category-level average prices\n- Joining brings each product together with its category average\n- `WHERE p.price > c.avg_price` keeps only above-average products\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Correlated subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.id AS product_id, p.category_id, p.price FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id);",
        "explanation": "## Approach\n\nFor each product, compare its price against the average price of products in the same category.\n\n## Query\n\n```sql\nSELECT p.id AS product_id, p.category_id, p.price\nFROM products p\nWHERE p.price > (\n  SELECT AVG(p2.price)\n  FROM products p2\n  WHERE p2.category_id = p.category_id\n);\n```\n\n## Explanation\n\n- The inner query computes the category average for the current product\n- The outer query keeps only products above that average\n- Correct, but often less efficient than joining a grouped subquery"
      },
      {
        "approach_title": "Window function average",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT product_id, category_id, price FROM (SELECT id AS product_id, category_id, price, AVG(price) OVER (PARTITION BY category_id) AS avg_price FROM products) x WHERE price > avg_price;",
        "explanation": "## Approach\n\nUse a window function to compute the average category price on each product row, then filter above-average products.\n\n## Query\n\n```sql\nSELECT product_id, category_id, price\nFROM (\n  SELECT id AS product_id, category_id, price,\n         AVG(price) OVER (PARTITION BY category_id) AS avg_price\n  FROM products\n) x\nWHERE price > avg_price;\n```\n\n## Explanation\n\n- `AVG(price) OVER (PARTITION BY category_id)` computes the category average for every row\n- The outer query filters products above that value\n- Very good alternative, especially for analytic SQL practice"
      }
    ]
  },
  {
    "code": "ECOMMERCE_084",
    "approaches": [
      {
        "approach_title": "GROUP BY + HAVING",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, COUNT(*) AS address_count FROM addresses GROUP BY customer_id HAVING COUNT(*) > 1;",
        "explanation": "## Approach\n\nGroup addresses by customer, count them, and keep only customers with more than one address.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(*) AS address_count\nFROM addresses\nGROUP BY customer_id\nHAVING COUNT(*) > 1;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `COUNT(*)` counts addresses in each group\n- `HAVING COUNT(*) > 1` filters to customers with multiple addresses\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Count address IDs + HAVING",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, COUNT(id) AS address_count FROM addresses GROUP BY customer_id HAVING COUNT(id) > 1;",
        "explanation": "## Approach\n\nGroup by customer and count non-null address IDs.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(id) AS address_count\nFROM addresses\nGROUP BY customer_id\nHAVING COUNT(id) > 1;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this produces the same result as `COUNT(*)`\n- Valid, but `COUNT(*)` is more idiomatic for row counts"
      },
      {
        "approach_title": "Subquery + WHERE",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT customer_id, address_count FROM (SELECT customer_id, COUNT(*) AS address_count FROM addresses GROUP BY customer_id) x WHERE address_count > 1;",
        "explanation": "## Approach\n\nFirst compute address counts per customer, then filter in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, address_count\nFROM (\n  SELECT customer_id, COUNT(*) AS address_count\n  FROM addresses\n  GROUP BY customer_id\n) x\nWHERE address_count > 1;\n```\n\n## Explanation\n\n- The subquery calculates address counts first\n- The outer query filters customers with counts greater than 1\n- Correct, but `HAVING` is more direct here"
      }
    ]
  },
  {
    "code": "ECOMMERCE_085",
    "approaches": [
      {
        "approach_title": "MAX order date by customer",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, MAX(order_date) AS latest_order_date FROM orders GROUP BY customer_id;",
        "explanation": "## Approach\n\nGroup orders by customer and take the maximum order date in each group.\n\n## Query\n\n```sql\nSELECT customer_id, MAX(order_date) AS latest_order_date\nFROM orders\nGROUP BY customer_id;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `MAX(order_date)` returns the most recent order date in each group\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery with MAX",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, latest_order_date FROM (SELECT customer_id, MAX(order_date) AS latest_order_date FROM orders GROUP BY customer_id) x;",
        "explanation": "## Approach\n\nCalculate latest order dates in a subquery and return them from the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, latest_order_date\nFROM (\n  SELECT customer_id, MAX(order_date) AS latest_order_date\n  FROM orders\n  GROUP BY customer_id\n) x;\n```\n\n## Explanation\n\n- The subquery builds the grouped result first\n- The outer query simply selects from it\n- Valid, but unnecessary here"
      },
      {
        "approach_title": "ROW_NUMBER window function",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT customer_id, order_date AS latest_order_date FROM (SELECT customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) x WHERE rn = 1;",
        "explanation": "## Approach\n\nRank orders within each customer by date descending, then keep the top row.\n\n## Query\n\n```sql\nSELECT customer_id, order_date AS latest_order_date\nFROM (\n  SELECT customer_id, order_date,\n         ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY order_date DESC\n         ) AS rn\n  FROM orders\n) x\nWHERE rn = 1;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` ranks each customer's orders from latest to oldest\n- `WHERE rn = 1` keeps the most recent order row\n- Great alternative, especially when you later need more columns from that latest order"
      }
    ]
  },
  {
    "code": "ECOMMERCE_086",
    "approaches": [
      {
        "approach_title": "Join + GROUP BY + ORDER BY + LIMIT",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nJoin order items with products to get the brand, sum revenue per brand, then rank and return the top 5.\n\n## Query\n\n```sql\nSELECT p.brand, SUM(oi.total_price) AS total_revenue\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.brand\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `JOIN` maps each order item to a brand\n- `SUM(oi.total_price)` calculates brand revenue\n- `ORDER BY total_revenue DESC` ranks brands from highest to lowest revenue\n- `LIMIT 5` returns the top 5 brands\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + ORDER BY + LIMIT",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT brand, total_revenue FROM (SELECT p.brand, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand) x ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nCompute revenue per brand in a subquery, then sort and limit in the outer query.\n\n## Query\n\n```sql\nSELECT brand, total_revenue\nFROM (\n  SELECT p.brand, SUM(oi.total_price) AS total_revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY p.brand\n) x\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- The subquery builds brand revenue totals first\n- The outer query ranks them and returns the top 5\n- Correct, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_087",
    "approaches": [
      {
        "approach_title": "Join + GROUP BY + ORDER BY + LIMIT",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nJoin orders with shipping addresses, sum revenue per city, then sort descending and return the top 5 cities.\n\n## Query\n\n```sql\nSELECT a.city, SUM(o.total_amount) AS total_revenue\nFROM orders o\nJOIN addresses a ON o.shipping_address_id = a.id\nGROUP BY a.city\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `JOIN` connects each order to its shipping city\n- `SUM(o.total_amount)` calculates city-level revenue\n- `ORDER BY total_revenue DESC` ranks cities from highest to lowest revenue\n- `LIMIT 5` returns the top 5 cities\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + ORDER BY + LIMIT",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT city, total_revenue FROM (SELECT a.city, SUM(o.total_amount) AS total_revenue FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city) x ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nCompute revenue per city in a subquery, then rank and limit in the outer query.\n\n## Query\n\n```sql\nSELECT city, total_revenue\nFROM (\n  SELECT a.city, SUM(o.total_amount) AS total_revenue\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n  GROUP BY a.city\n) x\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- The subquery builds city revenue totals first\n- The outer query sorts and returns the top 5\n- Correct, but the extra layer is unnecessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_088",
    "approaches": [
      {
        "approach_title": "COUNT DISTINCT orders + HAVING",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, COUNT(DISTINCT order_id) AS order_count FROM order_items GROUP BY product_id HAVING COUNT(DISTINCT order_id) > 100;",
        "explanation": "## Approach\n\nGroup order items by product, count distinct orders for each product, and keep only products appearing in more than 100 orders.\n\n## Query\n\n```sql\nSELECT product_id, COUNT(DISTINCT order_id) AS order_count\nFROM order_items\nGROUP BY product_id\nHAVING COUNT(DISTINCT order_id) > 100;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `COUNT(DISTINCT order_id)` counts how many unique orders included that product\n- `HAVING ... > 100` filters to frequently ordered products\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + WHERE filter",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, order_count FROM (SELECT product_id, COUNT(DISTINCT order_id) AS order_count FROM order_items GROUP BY product_id) x WHERE order_count > 100;",
        "explanation": "## Approach\n\nFirst compute distinct order counts per product, then filter in the outer query.\n\n## Query\n\n```sql\nSELECT product_id, order_count\nFROM (\n  SELECT product_id, COUNT(DISTINCT order_id) AS order_count\n  FROM order_items\n  GROUP BY product_id\n) x\nWHERE order_count > 100;\n```\n\n## Explanation\n\n- The subquery calculates order counts first\n- The outer query keeps only rows above 100\n- Correct, but `HAVING` is more direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_089",
    "approaches": [
      {
        "approach_title": "GROUP BY + HAVING",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id HAVING COUNT(*) > 5;",
        "explanation": "## Approach\n\nGroup reviews by customer, count them, and keep customers with more than 5 reviews.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(*) AS review_count\nFROM reviews\nGROUP BY customer_id\nHAVING COUNT(*) > 5;\n```\n\n## Explanation\n\n- `GROUP BY customer_id` creates one group per customer\n- `COUNT(*)` counts reviews submitted by each customer\n- `HAVING COUNT(*) > 5` filters to active reviewers\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + WHERE filter",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, review_count FROM (SELECT customer_id, COUNT(*) AS review_count FROM reviews GROUP BY customer_id) x WHERE review_count > 5;",
        "explanation": "## Approach\n\nFirst compute review counts per customer, then filter in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, review_count\nFROM (\n  SELECT customer_id, COUNT(*) AS review_count\n  FROM reviews\n  GROUP BY customer_id\n) x\nWHERE review_count > 5;\n```\n\n## Explanation\n\n- The subquery builds customer review counts first\n- The outer query keeps only customers above 5\n- Correct, but `HAVING` is simpler here"
      },
      {
        "approach_title": "Count review IDs + HAVING",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT customer_id, COUNT(id) AS review_count FROM reviews GROUP BY customer_id HAVING COUNT(id) > 5;",
        "explanation": "## Approach\n\nGroup by customer and count non-null review IDs.\n\n## Query\n\n```sql\nSELECT customer_id, COUNT(id) AS review_count\nFROM reviews\nGROUP BY customer_id\nHAVING COUNT(id) > 5;\n```\n\n## Explanation\n\n- `id` is never `NULL`\n- So this returns the same result as `COUNT(*)`\n- Valid, but slightly less direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_090",
    "approaches": [
      {
        "approach_title": "Join + AVG by category",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.category_id, ROUND(AVG(oi.total_price), 2) AS avg_revenue_per_item FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nJoin order items with products to get the category, then average item-level revenue per category.\n\n## Query\n\n```sql\nSELECT p.category_id, ROUND(AVG(oi.total_price), 2) AS avg_revenue_per_item\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `JOIN` maps each order item to a category\n- `AVG(oi.total_price)` computes average line-item revenue within that category\n- `ROUND(..., 2)` formats the result neatly\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Average revenue from subquery join",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT category_id, ROUND(AVG(total_price), 2) AS avg_revenue_per_item FROM (SELECT p.category_id, oi.total_price FROM order_items oi JOIN products p ON oi.product_id = p.id) x GROUP BY category_id;",
        "explanation": "## Approach\n\nPrepare category and item revenue in a subquery, then average them by category in the outer query.\n\n## Query\n\n```sql\nSELECT category_id, ROUND(AVG(total_price), 2) AS avg_revenue_per_item\nFROM (\n  SELECT p.category_id, oi.total_price\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n) x\nGROUP BY category_id;\n```\n\n## Explanation\n\n- The subquery builds category-revenue pairs first\n- The outer query groups by category and averages revenue\n- Correct, but more verbose than necessary"
      },
      {
        "approach_title": "Calculate from quantity and unit price",
        "approach_type": "joins",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT p.category_id, ROUND(AVG((oi.quantity * oi.unit_price) - oi.discount_amount), 2) AS avg_revenue_per_item FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id;",
        "explanation": "## Approach\n\nCompute line-item revenue manually and then average it by category.\n\n## Query\n\n```sql\nSELECT p.category_id,\n       ROUND(AVG((oi.quantity * oi.unit_price) - oi.discount_amount), 2) AS avg_revenue_per_item\nFROM order_items oi\nJOIN products p ON oi.product_id = p.id\nGROUP BY p.category_id;\n```\n\n## Explanation\n\n- `quantity * unit_price` gives gross line value\n- Subtracting `discount_amount` gives net revenue\n- Averaging by category returns mean revenue per order item\n- Valid, but using `total_price` is simpler because it already stores the final line amount"
      }
    ]
  },
  {
    "code": "ECOMMERCE_091",
    "approaches": [
      {
        "approach_title": "GROUP BY + ORDER BY + LIMIT",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nGroup order items by product, sum revenue for each product, then sort descending and keep the top 5.\n\n## Query\n\n```sql\nSELECT product_id, SUM(total_price) AS total_revenue\nFROM order_items\nGROUP BY product_id\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY product_id` creates one group per product\n- `SUM(total_price)` gives total revenue per product\n- `ORDER BY total_revenue DESC` ranks highest revenue products first\n- `LIMIT 5` returns only the top 5\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + ORDER BY + LIMIT",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT product_id, total_revenue FROM (SELECT product_id, SUM(total_price) AS total_revenue FROM order_items GROUP BY product_id) x ORDER BY total_revenue DESC LIMIT 5;",
        "explanation": "## Approach\n\nFirst compute revenue per product in a subquery, then sort and limit in the outer query.\n\n## Query\n\n```sql\nSELECT product_id, total_revenue\nFROM (\n  SELECT product_id, SUM(total_price) AS total_revenue\n  FROM order_items\n  GROUP BY product_id\n) x\nORDER BY total_revenue DESC\nLIMIT 5;\n```\n\n## Explanation\n\n- The subquery builds product revenue totals first\n- The outer query ranks them and returns the top 5\n- Correct, but more verbose than necessary"
      }
    ]
  },
  {
    "code": "ECOMMERCE_092",
    "approaches": [
      {
        "approach_title": "Aggregate customer revenue and compare to average",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT customer_id, total_revenue FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) customer_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) avg_customer_revenue);",
        "explanation": "## Approach\n\nFirst calculate total revenue for each customer, then compare each customer's revenue to the average of those totals.\n\n## Query\n\n```sql\nSELECT customer_id, total_revenue\nFROM (\n  SELECT customer_id, SUM(total_amount) AS total_revenue\n  FROM orders\n  GROUP BY customer_id\n) customer_revenue\nWHERE total_revenue > (\n  SELECT AVG(total_revenue)\n  FROM (\n    SELECT customer_id, SUM(total_amount) AS total_revenue\n    FROM orders\n    GROUP BY customer_id\n  ) avg_customer_revenue\n);\n```\n\n## Explanation\n\n- Inner grouped queries calculate customer-level revenue totals\n- The scalar subquery computes the average customer revenue\n- The outer query keeps only customers above that average\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "CTE based comparison",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH customer_revenue AS (SELECT customer_id, SUM(total_amount) AS total_revenue FROM orders GROUP BY customer_id) SELECT customer_id, total_revenue FROM customer_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM customer_revenue);",
        "explanation": "## Approach\n\nUse a CTE to compute customer revenue once, then reuse it to filter above-average customers.\n\n## Query\n\n```sql\nWITH customer_revenue AS (\n  SELECT customer_id, SUM(total_amount) AS total_revenue\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT customer_id, total_revenue\nFROM customer_revenue\nWHERE total_revenue > (\n  SELECT AVG(total_revenue)\n  FROM customer_revenue\n);\n```\n\n## Explanation\n\n- The CTE stores customer revenue totals in one reusable result\n- The outer query filters using the average of those totals\n- Very readable, but your expected query format is using subqueries instead of a CTE"
      }
    ]
  },
  {
    "code": "ECOMMERCE_093",
    "approaches": [
      {
        "approach_title": "Join with brand average subquery",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.id AS product_id, p.brand, p.price FROM products p JOIN (SELECT brand, AVG(price) AS avg_price FROM products GROUP BY brand) b ON p.brand = b.brand WHERE p.price > b.avg_price;",
        "explanation": "## Approach\n\nCompute average price per brand in a subquery, join it back to products, and keep products priced above their brand average.\n\n## Query\n\n```sql\nSELECT p.id AS product_id, p.brand, p.price\nFROM products p\nJOIN (\n  SELECT brand, AVG(price) AS avg_price\n  FROM products\n  GROUP BY brand\n) b ON p.brand = b.brand\nWHERE p.price > b.avg_price;\n```\n\n## Explanation\n\n- The subquery calculates average price per brand\n- Joining brings each product together with its brand average\n- The `WHERE` clause keeps only above-average products\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Correlated subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.id AS product_id, p.brand, p.price FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.brand = p.brand);",
        "explanation": "## Approach\n\nFor each product, compare its price against the average price of products in the same brand.\n\n## Query\n\n```sql\nSELECT p.id AS product_id, p.brand, p.price\nFROM products p\nWHERE p.price > (\n  SELECT AVG(p2.price)\n  FROM products p2\n  WHERE p2.brand = p.brand\n);\n```\n\n## Explanation\n\n- The inner query computes the average brand price for the current product\n- The outer query keeps products priced above that average\n- Correct, but often less efficient than joining a grouped subquery"
      },
      {
        "approach_title": "Window function average",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT product_id, brand, price FROM (SELECT id AS product_id, brand, price, AVG(price) OVER (PARTITION BY brand) AS avg_price FROM products) x WHERE price > avg_price;",
        "explanation": "## Approach\n\nUse a window function to compute average brand price on each product row, then filter above-average products.\n\n## Query\n\n```sql\nSELECT product_id, brand, price\nFROM (\n  SELECT id AS product_id, brand, price,\n         AVG(price) OVER (PARTITION BY brand) AS avg_price\n  FROM products\n) x\nWHERE price > avg_price;\n```\n\n## Explanation\n\n- `AVG(price) OVER (PARTITION BY brand)` computes brand average for each row\n- The outer query filters products above that value\n- Excellent alternative for analytic SQL practice"
      }
    ]
  },
  {
    "code": "ECOMMERCE_094",
    "approaches": [
      {
        "approach_title": "Join orders, items, and products with COUNT DISTINCT",
        "approach_type": "joins",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id GROUP BY o.customer_id HAVING COUNT(DISTINCT p.category_id) > 3;",
        "explanation": "## Approach\n\nJoin orders to order items and products, count distinct categories per customer, and keep customers with more than 3 categories.\n\n## Query\n\n```sql\nSELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count\nFROM orders o\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nGROUP BY o.customer_id\nHAVING COUNT(DISTINCT p.category_id) > 3;\n```\n\n## Explanation\n\n- `JOIN`s connect customers to purchased products and their categories\n- `COUNT(DISTINCT p.category_id)` counts unique categories per customer\n- `HAVING ... > 3` filters customers who bought from more than 3 categories\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Subquery + WHERE filter",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT customer_id, category_count FROM (SELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id GROUP BY o.customer_id) x WHERE category_count > 3;",
        "explanation": "## Approach\n\nFirst compute distinct category counts per customer, then filter in the outer query.\n\n## Query\n\n```sql\nSELECT customer_id, category_count\nFROM (\n  SELECT o.customer_id, COUNT(DISTINCT p.category_id) AS category_count\n  FROM orders o\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY o.customer_id\n) x\nWHERE category_count > 3;\n```\n\n## Explanation\n\n- The subquery calculates distinct category counts first\n- The outer query filters customers above 3\n- Correct, but `HAVING` is more direct"
      }
    ]
  },
  {
    "code": "ECOMMERCE_095",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER by city and customer revenue",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT city, customer_id, total_revenue FROM (SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue, ROW_NUMBER() OVER (PARTITION BY a.city ORDER BY SUM(o.total_amount) DESC, o.customer_id ASC) AS rn FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city, o.customer_id) ranked WHERE rn <= 3;",
        "explanation": "## Approach\n\nCompute revenue per customer within each city, rank customers by revenue inside each city, then keep the top 3.\n\n## Query\n\n```sql\nSELECT city, customer_id, total_revenue\nFROM (\n  SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue,\n         ROW_NUMBER() OVER (\n           PARTITION BY a.city\n           ORDER BY SUM(o.total_amount) DESC, o.customer_id ASC\n         ) AS rn\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n  GROUP BY a.city, o.customer_id\n) ranked\nWHERE rn <= 3;\n```\n\n## Explanation\n\n- Orders are grouped by city and customer to compute customer revenue per city\n- `ROW_NUMBER()` ranks customers within each city\n- `WHERE rn <= 3` keeps the top 3 customers in each city\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "DENSE_RANK by city",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT city, customer_id, total_revenue FROM (SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue, DENSE_RANK() OVER (PARTITION BY a.city ORDER BY SUM(o.total_amount) DESC) AS rnk FROM orders o JOIN addresses a ON o.shipping_address_id = a.id GROUP BY a.city, o.customer_id) ranked WHERE rnk <= 3;",
        "explanation": "## Approach\n\nUse `DENSE_RANK()` instead of `ROW_NUMBER()` to rank customers by city revenue.\n\n## Query\n\n```sql\nSELECT city, customer_id, total_revenue\nFROM (\n  SELECT a.city, o.customer_id, SUM(o.total_amount) AS total_revenue,\n         DENSE_RANK() OVER (\n           PARTITION BY a.city\n           ORDER BY SUM(o.total_amount) DESC\n         ) AS rnk\n  FROM orders o\n  JOIN addresses a ON o.shipping_address_id = a.id\n  GROUP BY a.city, o.customer_id\n) ranked\nWHERE rnk <= 3;\n```\n\n## Explanation\n\n- `DENSE_RANK()` gives the same rank to tied revenues\n- This can return more than 3 rows per city when there are ties\n- Valid alternative, but different from strict top-3 behavior"
      }
    ]
  },
  {
    "code": "ECOMMERCE_096",
    "approaches": [
      {
        "approach_title": "Monthly aggregate + running total window",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT revenue_month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total FROM (SELECT DATE_TRUNC('month', order_date)::date AS revenue_month, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY DATE_TRUNC('month', order_date)::date) monthly_data;",
        "explanation": "## Approach\n\nFirst calculate revenue per month, then use a window function to compute the running total ordered by month.\n\n## Query\n\n```sql\nSELECT revenue_month, monthly_revenue,\n       SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total\nFROM (\n  SELECT DATE_TRUNC('month', order_date)::date AS revenue_month,\n         SUM(total_amount) AS monthly_revenue\n  FROM orders\n  GROUP BY DATE_TRUNC('month', order_date)::date\n) monthly_data;\n```\n\n## Explanation\n\n- The subquery computes one revenue row per month\n- `SUM(monthly_revenue) OVER (ORDER BY revenue_month)` accumulates those values month by month\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "CTE + running total window",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH monthly_data AS (SELECT DATE_TRUNC('month', order_date)::date AS revenue_month, SUM(total_amount) AS monthly_revenue FROM orders GROUP BY DATE_TRUNC('month', order_date)::date) SELECT revenue_month, monthly_revenue, SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total FROM monthly_data;",
        "explanation": "## Approach\n\nUse a CTE to compute monthly revenue first, then calculate the running total in the final query.\n\n## Query\n\n```sql\nWITH monthly_data AS (\n  SELECT DATE_TRUNC('month', order_date)::date AS revenue_month,\n         SUM(total_amount) AS monthly_revenue\n  FROM orders\n  GROUP BY DATE_TRUNC('month', order_date)::date\n)\nSELECT revenue_month, monthly_revenue,\n       SUM(monthly_revenue) OVER (ORDER BY revenue_month) AS running_total\nFROM monthly_data;\n```\n\n## Explanation\n\n- The CTE separates the monthly aggregation step cleanly\n- The final query computes the cumulative revenue\n- Very readable, but your expected answer is subquery-based"
      }
    ]
  },
  {
    "code": "ECOMMERCE_097",
    "approaches": [
      {
        "approach_title": "GROUP BY + conditional count comparison",
        "approach_type": "group_by",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT o.customer_id FROM orders o JOIN payments p ON o.id = p.order_id GROUP BY o.customer_id HAVING COUNT(*) = COUNT(CASE WHEN p.payment_status = 'completed' THEN 1 END);",
        "explanation": "## Approach\n\nJoin orders to payments, then keep only customers where every joined payment row has completed status.\n\n## Query\n\n```sql\nSELECT o.customer_id\nFROM orders o\nJOIN payments p ON o.id = p.order_id\nGROUP BY o.customer_id\nHAVING COUNT(*) = COUNT(CASE WHEN p.payment_status = 'completed' THEN 1 END);\n```\n\n## Explanation\n\n- `COUNT(*)` counts all payment rows for each customer\n- `COUNT(CASE WHEN ... THEN 1 END)` counts only completed payments\n- If both counts are equal, every payment for that customer is completed\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "HAVING with MIN status check",
        "approach_type": "group_by",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT o.customer_id FROM orders o JOIN payments p ON o.id = p.order_id GROUP BY o.customer_id HAVING MIN(CASE WHEN p.payment_status = 'completed' THEN 1 ELSE 0 END) = 1;",
        "explanation": "## Approach\n\nConvert payment status into 1/0 flags and ensure the minimum flag per customer is 1.\n\n## Query\n\n```sql\nSELECT o.customer_id\nFROM orders o\nJOIN payments p ON o.id = p.order_id\nGROUP BY o.customer_id\nHAVING MIN(CASE WHEN p.payment_status = 'completed' THEN 1 ELSE 0 END) = 1;\n```\n\n## Explanation\n\n- Completed payments map to 1, others to 0\n- If the minimum value in the group is 1, then all payments are completed\n- Valid alternative, though slightly less obvious than the count comparison"
      }
    ]
  },
  {
    "code": "ECOMMERCE_098",
    "approaches": [
      {
        "approach_title": "ROW_NUMBER by brand and quantity sold",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT brand, product_id, total_quantity_sold FROM (SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold, ROW_NUMBER() OVER (PARTITION BY p.brand ORDER BY SUM(oi.quantity) DESC, oi.product_id ASC) AS rn FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand, oi.product_id) ranked WHERE rn = 1;",
        "explanation": "## Approach\n\nCompute total quantity sold per product within each brand, rank products by quantity, and keep rank 1.\n\n## Query\n\n```sql\nSELECT brand, product_id, total_quantity_sold\nFROM (\n  SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold,\n         ROW_NUMBER() OVER (\n           PARTITION BY p.brand\n           ORDER BY SUM(oi.quantity) DESC, oi.product_id ASC\n         ) AS rn\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY p.brand, oi.product_id\n) ranked\nWHERE rn = 1;\n```\n\n## Explanation\n\n- Revenue is not needed here; we rank by total quantity sold\n- `ROW_NUMBER()` creates a strict top product per brand\n- `WHERE rn = 1` keeps only the most ordered product in each brand\n- This is the most robust and optimal solution"
      },
      {
        "approach_title": "Correlated subquery with MAX quantity",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH brand_product_qty AS (SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.brand, oi.product_id) SELECT x.brand, x.product_id, x.total_quantity_sold FROM brand_product_qty x WHERE x.product_id = (SELECT y.product_id FROM brand_product_qty y WHERE y.brand = x.brand ORDER BY y.total_quantity_sold DESC, y.product_id ASC LIMIT 1);",
        "explanation": "## Approach\n\nCompute quantity sold per product and keep rows whose quantity matches the maximum for that brand.\n\n## Query\n\n```sql\nSELECT brand, product_id, total_quantity_sold\nFROM (\n  SELECT p.brand, oi.product_id, SUM(oi.quantity) AS total_quantity_sold\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY p.brand, oi.product_id\n) x\nWHERE total_quantity_sold = (\n  SELECT MAX(y.total_quantity_sold)\n  FROM (\n    SELECT p2.brand, oi2.product_id, SUM(oi2.quantity) AS total_quantity_sold\n    FROM order_items oi2\n    JOIN products p2 ON oi2.product_id = p2.id\n    GROUP BY p2.brand, oi2.product_id\n  ) y\n  WHERE y.brand = x.brand\n);\n```\n\n## Explanation\n\n- This approach keeps products that match the top quantity within each brand\n- It can return multiple rows per brand if there are ties\n- Valid, but less deterministic and more complex than the window-function solution"
      }
    ]
  },
  {
    "code": "ECOMMERCE_099",
    "approaches": [
      {
        "approach_title": "Category revenue compared to average category revenue",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT category_id, total_revenue FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) category_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) avg_category_revenue);",
        "explanation": "## Approach\n\nCompute total revenue per category, then keep categories whose revenue is above the average category revenue.\n\n## Query\n\n```sql\nSELECT category_id, total_revenue\nFROM (\n  SELECT p.category_id, SUM(oi.total_price) AS total_revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY p.category_id\n) category_revenue\nWHERE total_revenue > (\n  SELECT AVG(total_revenue)\n  FROM (\n    SELECT p.category_id, SUM(oi.total_price) AS total_revenue\n    FROM order_items oi\n    JOIN products p ON oi.product_id = p.id\n    GROUP BY p.category_id\n  ) avg_category_revenue\n);\n```\n\n## Explanation\n\n- Inner grouped queries calculate revenue totals per category\n- The scalar subquery computes the average of those category totals\n- The outer query keeps only above-average categories\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "CTE based comparison",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH category_revenue AS (SELECT p.category_id, SUM(oi.total_price) AS total_revenue FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category_id) SELECT category_id, total_revenue FROM category_revenue WHERE total_revenue > (SELECT AVG(total_revenue) FROM category_revenue);",
        "explanation": "## Approach\n\nUse a CTE to compute category revenue once, then reuse it to filter above-average categories.\n\n## Query\n\n```sql\nWITH category_revenue AS (\n  SELECT p.category_id, SUM(oi.total_price) AS total_revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY p.category_id\n)\nSELECT category_id, total_revenue\nFROM category_revenue\nWHERE total_revenue > (\n  SELECT AVG(total_revenue)\n  FROM category_revenue\n);\n```\n\n## Explanation\n\n- The CTE makes the logic easier to read and reuse\n- The outer query filters categories above the average revenue\n- Very clean alternative, though your expected query format is subquery-based"
      }
    ]
  },
  {
    "code": "ECOMMERCE_100",
    "approaches": [
      {
        "approach_title": "Distinct months + LAG",
        "approach_type": "window",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT customer_id FROM (SELECT customer_id, order_month, LAG(order_month) OVER (PARTITION BY customer_id ORDER BY order_month) AS prev_month FROM (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) monthly_orders) x WHERE prev_month = (order_month - INTERVAL '1 month')::date;",
        "explanation": "## Approach\n\nFirst reduce each customer to distinct order months, then use `LAG()` to compare each month to the previous month and keep customers with consecutive months.\n\n## Query\n\n```sql\nSELECT DISTINCT customer_id\nFROM (\n  SELECT customer_id, order_month,\n         LAG(order_month) OVER (\n           PARTITION BY customer_id\n           ORDER BY order_month\n         ) AS prev_month\n  FROM (\n    SELECT DISTINCT customer_id,\n           DATE_TRUNC('month', order_date)::date AS order_month\n    FROM orders\n  ) monthly_orders\n) x\nWHERE prev_month = (order_month - INTERVAL '1 month')::date;\n```\n\n## Explanation\n\n- The inner query collapses multiple same-month orders into one month per customer\n- `LAG()` brings the previous month beside the current month\n- The `WHERE` clause checks whether the previous month is exactly one month earlier\n- `DISTINCT customer_id` returns each qualifying customer once\n- This is the most direct and optimal solution"
      },
      {
        "approach_title": "Self join on distinct customer months",
        "approach_type": "self_join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT DISTINCT m1.customer_id FROM (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) m1 JOIN (SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date)::date AS order_month FROM orders) m2 ON m1.customer_id = m2.customer_id AND m2.order_month = (m1.order_month + INTERVAL '1 month')::date;",
        "explanation": "## Approach\n\nCreate distinct customer-month pairs and self join them to find month pairs that are exactly one month apart.\n\n## Query\n\n```sql\nSELECT DISTINCT m1.customer_id\nFROM (\n  SELECT DISTINCT customer_id,\n         DATE_TRUNC('month', order_date)::date AS order_month\n  FROM orders\n) m1\nJOIN (\n  SELECT DISTINCT customer_id,\n         DATE_TRUNC('month', order_date)::date AS order_month\n  FROM orders\n) m2\n  ON m1.customer_id = m2.customer_id\n AND m2.order_month = (m1.order_month + INTERVAL '1 month')::date;\n```\n\n## Explanation\n\n- Each subquery produces unique customer-month rows\n- The self join matches one month with the next month for the same customer\n- `DISTINCT` ensures each customer is returned once\n- Valid alternative, but the window-function solution is usually cleaner"
      }
    ]
  }
];
