import { getAppIdByName } from "../../base/scripts/base.data.js";

const appId = getAppIdByName("realestate");

export const tableDescriptions = {
  amenities: "Master list of amenities available across properties",
  app_events:
    "Behavioral product analytics events across search, discovery, lead, and conversion funnels",
  executive_profiles:
    "Internal operational staff profiles for verification, support, and assisted workflows",
  inquiries: "Lead generation records when seekers express interest in listings",
  leases: "Executed rental agreements between owners and tenants",
  listing_media:
    "Images, videos, floor plans, and documents attached to property listings",
  listing_price_history:
    "Historical pricing changes used for pricing trend and negotiation analysis",
  listing_status_history:
    "Audit trail of listing status transitions such as draft, live, paused, rented, and archived",
  listings:
    "Market-facing listings with pricing, availability, targeting, and lifecycle states",
  locations:
    "Normalized geography data for property discovery and location-based analytics",
  maintenance_tickets:
    "Property issue tickets raised during tenancy or ownership operations",
  offers: "Negotiation offers and counters raised by seekers against listings",
  owner_profiles:
    "Extended owner account data used for onboarding, verification, and portfolio analysis",
  owner_verification_requests:
    "Manual owner ownership verification cases handled by operations teams",
  properties:
    "Core property master records that can later be listed for rent, sale, or lease",
  property_amenities: "Mapping table linking properties and their amenities",
  property_ownership_history:
    "Historical ownership periods for audit, transfer, and title tracking",
  property_views:
    "Listing view events used for demand, conversion funnel, and engagement analytics",
  property_visits:
    "Property site visits scheduled between seekers, owners, and operations teams",
  referrals: "Referral records for owner, seeker, and tenant growth loops",
  rent_payments: "Recurring rent payment transactions for active leases",
  rental_applications:
    "Formal tenant applications submitted for rental listings",
  seeker_profiles:
    "Seeker preferences and tenant qualification details for demand-side analysis",
  shortlists: "Saved listings shortlisted by users for later comparison",
  support_tickets:
    "Cross-functional support issues related to listings, payments, visits, and leasing",
  user_documents:
    "KYC and supporting documents uploaded by users for verification and trust workflows",
  users:
    "All platform users including seekers, owners, tenants, executives, and admins",
};

export const questions = [
  {"app_id":appId,"code":"REALESTATE_001","title":"Total Users Count","description":"Find the total number of users on the platform.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS total_users FROM users;","solution_columns":["total_users"],"tables":["users"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"REALESTATE_002","title":"Verified Owners Count","description":"Find the total number of owner profiles that are verified.","difficulty":"easy","expected_query":"SELECT COUNT(*) AS verified_owners FROM owner_profiles WHERE verification_status = 'verified';","solution_columns":["verified_owners"],"tables":["owner_profiles"],"comparison_config":{"ignore_order":true}},
  {"app_id":appId,"code":"REALESTATE_003","title":"Live Listings","description":"Find the id, property_id, and listed_for of all listings that are currently live.","difficulty":"easy","expected_query":"SELECT id, property_id, listed_for FROM listings WHERE listing_status = 'live' ORDER BY id ASC;","solution_columns":["id","property_id","listed_for"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_004","title":"Properties In Gated Communities","description":"Find the id, property_title, and property_type of properties that are in gated communities.","difficulty":"easy","expected_query":"SELECT id, property_title, property_type FROM properties WHERE is_gated_community = true ORDER BY id ASC;","solution_columns":["id","property_title","property_type"],"tables":["properties"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_005","title":"Listings With Pets Allowed","description":"Find the id, rent_amount, and preferred_tenant_type of live listings where pets are allowed.","difficulty":"easy","expected_query":"SELECT id, rent_amount, preferred_tenant_type FROM listings WHERE listing_status = 'live' AND pet_allowed = true ORDER BY id ASC;","solution_columns":["id","rent_amount","preferred_tenant_type"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_006","title":"Top 5 Most Expensive Rental Listings","description":"Find the top 5 live rental listings with the highest rent amount.","difficulty":"easy","expected_query":"SELECT id, property_id, rent_amount FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount IS NOT NULL ORDER BY rent_amount DESC, id ASC LIMIT 5;","solution_columns":["id","property_id","rent_amount"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rent_amount","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_007","title":"Users Signed Up By Source","description":"Find each signup source and the number of users who signed up through it.","difficulty":"easy","expected_query":"SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;","solution_columns":["signup_source","user_count"],"tables":["users"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"user_count","direction":"desc"},{"column":"signup_source","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_008","title":"Property Count By Type","description":"Find each property type and the total number of properties of that type.","difficulty":"easy","expected_query":"SELECT property_type, COUNT(*) AS property_count FROM properties GROUP BY property_type ORDER BY property_count DESC, property_type ASC;","solution_columns":["property_type","property_count"],"tables":["properties"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"property_count","direction":"desc"},{"column":"property_type","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_009","title":"Listings Per City","description":"Find each city and the number of listings associated with properties in that city.","difficulty":"medium","expected_query":"SELECT loc.city, COUNT(*) AS listing_count FROM listings l JOIN properties p ON p.id = l.property_id JOIN locations loc ON loc.id = p.location_id GROUP BY loc.city ORDER BY listing_count DESC, loc.city ASC;","solution_columns":["city","listing_count"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"listing_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_010","title":"Owners With More Than 3 Properties","description":"Find owners who have more than 3 properties registered on the platform.","difficulty":"medium","expected_query":"SELECT op.id, op.user_id, COUNT(p.id) AS property_count FROM owner_profiles op JOIN properties p ON p.owner_profile_id = op.id GROUP BY op.id, op.user_id HAVING COUNT(p.id) > 3 ORDER BY property_count DESC, op.id ASC;","solution_columns":["id","user_id","property_count"],"tables":["owner_profiles","properties"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"property_count","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_011","title":"Pending Owner Checks","description":"Find the id, owner_profile_id, and assigned_executive_user_id of owner verification requests that are still pending.","difficulty":"easy","expected_query":"SELECT id, owner_profile_id, assigned_executive_user_id FROM owner_verification_requests WHERE request_status = 'pending' ORDER BY id ASC;","solution_columns":["id","owner_profile_id","assigned_executive_user_id"],"tables":["owner_verification_requests"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_012","title":"Expired User Docs","description":"Find the id, user_id, document_type, and expires_at of user documents that have already expired.","difficulty":"easy","expected_query":"SELECT id, user_id, document_type, expires_at FROM user_documents WHERE expires_at IS NOT NULL AND expires_at < NOW() ORDER BY expires_at ASC, id ASC;","solution_columns":["id","user_id","document_type","expires_at"],"tables":["user_documents"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"expires_at","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_013","title":"Vacant Listings","description":"Find the id, property_id, and listed_for of live listings that are currently available.","difficulty":"easy","expected_query":"SELECT id, property_id, listed_for FROM listings WHERE listing_status = 'live' AND availability_status = 'available' ORDER BY id ASC;","solution_columns":["id","property_id","listed_for"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_014","title":"Properties By City","description":"Find each city and the total number of properties located there.","difficulty":"easy","expected_query":"SELECT l.city, COUNT(*) AS property_count FROM properties p JOIN locations l ON p.location_id = l.id GROUP BY l.city ORDER BY property_count DESC, l.city ASC;","solution_columns":["city","property_count"],"tables":["properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"property_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_015","title":"Listings Without Media","description":"Find the ids of listings that do not have any media attached.","difficulty":"easy","expected_query":"SELECT l.id FROM listings l LEFT JOIN listing_media lm ON l.id = lm.listing_id WHERE lm.id IS NULL ORDER BY l.id ASC;","solution_columns":["id"],"tables":["listings","listing_media"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_016","title":"Top Viewed Listings","description":"Find the top 5 listings with the highest number of property views.","difficulty":"medium","expected_query":"SELECT listing_id, COUNT(*) AS view_count FROM property_views GROUP BY listing_id ORDER BY view_count DESC, listing_id ASC LIMIT 5;","solution_columns":["listing_id","view_count"],"tables":["property_views"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"view_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_017","title":"Owners With Live Listings","description":"Find owner profiles that currently have at least one live listing.","difficulty":"medium","expected_query":"SELECT owner_profile_id, COUNT(*) AS live_listing_count FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id ORDER BY live_listing_count DESC, owner_profile_id ASC;","solution_columns":["owner_profile_id","live_listing_count"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"live_listing_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_018","title":"Visit Requests Per Listing","description":"Find each listing and the number of property visits scheduled for it.","difficulty":"medium","expected_query":"SELECT listing_id, COUNT(*) AS visit_count FROM property_visits GROUP BY listing_id ORDER BY visit_count DESC, listing_id ASC;","solution_columns":["listing_id","visit_count"],"tables":["property_visits"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"visit_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_019","title":"Owners Without Properties","description":"Find owner profiles that do not have any properties registered.","difficulty":"medium","expected_query":"SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN properties p ON op.id = p.owner_profile_id WHERE p.id IS NULL ORDER BY op.id ASC;","solution_columns":["id","user_id"],"tables":["owner_profiles","properties"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_020","title":"Most Common Amenities","description":"Find the top 5 amenities that are linked to the highest number of properties.","difficulty":"medium","expected_query":"SELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.id, a.amenity_name ORDER BY property_count DESC, a.id ASC LIMIT 5;","solution_columns":["id","amenity_name","property_count"],"tables":["amenities","property_amenities"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"property_count","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_021","title":"Applications Pending Review","description":"Find the id, listing_id, and seeker_user_id of rental applications that are currently under review.","difficulty":"easy","expected_query":"SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE application_status = 'under_review' ORDER BY id ASC;","solution_columns":["id","listing_id","seeker_user_id"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_022","title":"Active Leases","description":"Find the id, property_id, tenant_user_id, and monthly_rent of all active leases.","difficulty":"easy","expected_query":"SELECT id, property_id, tenant_user_id, monthly_rent FROM leases WHERE lease_status = 'active' ORDER BY id ASC;","solution_columns":["id","property_id","tenant_user_id","monthly_rent"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_023","title":"Overdue Rent Payments","description":"Find rent payments whose due date has passed and are still pending or overdue.","difficulty":"easy","expected_query":"SELECT id, lease_id, tenant_user_id, due_date, payment_status FROM rent_payments WHERE due_date < CURRENT_DATE AND payment_status IN ('pending', 'overdue') ORDER BY due_date ASC, id ASC;","solution_columns":["id","lease_id","tenant_user_id","due_date","payment_status"],"tables":["rent_payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"due_date","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_024","title":"Open Maintenance Tickets","description":"Find all maintenance tickets that are still open or in progress.","difficulty":"easy","expected_query":"SELECT id, property_id, issue_type, ticket_status FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') ORDER BY id ASC;","solution_columns":["id","property_id","issue_type","ticket_status"],"tables":["maintenance_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_025","title":"High Value Rentals","description":"Find live rental listings where rent is greater than 50000.","difficulty":"easy","expected_query":"SELECT id, property_id, rent_amount FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount > 50000 ORDER BY rent_amount DESC, id ASC;","solution_columns":["id","property_id","rent_amount"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rent_amount","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_026","title":"Applications Per Listing","description":"Find each listing and the total number of rental applications received.","difficulty":"medium","expected_query":"SELECT listing_id, COUNT(*) AS application_count FROM rental_applications GROUP BY listing_id ORDER BY application_count DESC, listing_id ASC;","solution_columns":["listing_id","application_count"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"application_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_027","title":"Revenue By Owner","description":"Find each owner and the total monthly rent from active leases.","difficulty":"medium","expected_query":"SELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent FROM leases WHERE lease_status = 'active' GROUP BY owner_profile_id ORDER BY total_monthly_rent DESC, owner_profile_id ASC;","solution_columns":["owner_profile_id","total_monthly_rent"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_monthly_rent","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_028","title":"Listings By Amenity","description":"Find each amenity and the number of properties that have it.","difficulty":"medium","expected_query":"SELECT a.amenity_name, COUNT(pa.property_id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.amenity_name ORDER BY property_count DESC, a.amenity_name ASC;","solution_columns":["amenity_name","property_count"],"tables":["amenities","property_amenities"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"property_count","direction":"desc"},{"column":"amenity_name","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_029","title":"Avg Rent By City","description":"Find the average live rental price for each city.","difficulty":"medium","expected_query":"SELECT loc.city, AVG(l.rent_amount) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;","solution_columns":["city","avg_rent"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rent","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_030","title":"Top Inquiry Listings","description":"Find the top 5 listings with the highest number of inquiries.","difficulty":"medium","expected_query":"SELECT listing_id, COUNT(*) AS inquiry_count FROM inquiries GROUP BY listing_id ORDER BY inquiry_count DESC, listing_id ASC LIMIT 5;","solution_columns":["listing_id","inquiry_count"],"tables":["inquiries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"inquiry_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_031","title":"Late Fee Payments","description":"Find rent payments where a late fee was charged.","difficulty":"easy","expected_query":"SELECT id, lease_id, tenant_user_id, late_fee FROM rent_payments WHERE late_fee > 0 ORDER BY late_fee DESC, id ASC;","solution_columns":["id","lease_id","tenant_user_id","late_fee"],"tables":["rent_payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"late_fee","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_032","title":"Long Lease Listings","description":"Find listings with lease duration greater than 12 months.","difficulty":"easy","expected_query":"SELECT id, property_id, lease_duration_months FROM listings WHERE lease_duration_months > 12 ORDER BY lease_duration_months DESC, id ASC;","solution_columns":["id","property_id","lease_duration_months"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"lease_duration_months","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_033","title":"Executives By Team","description":"Find each team and the number of active executives in it.","difficulty":"easy","expected_query":"SELECT team_name, COUNT(*) AS executive_count FROM executive_profiles WHERE is_active = true GROUP BY team_name ORDER BY executive_count DESC, team_name ASC;","solution_columns":["team_name","executive_count"],"tables":["executive_profiles"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"executive_count","direction":"desc"},{"column":"team_name","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_034","title":"Rejected Owner Requests","description":"Find owner verification requests that were rejected.","difficulty":"easy","expected_query":"SELECT id, owner_profile_id, rejection_reason FROM owner_verification_requests WHERE request_status = 'rejected' ORDER BY id ASC;","solution_columns":["id","owner_profile_id","rejection_reason"],"tables":["owner_verification_requests"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_035","title":"Price Drop Listings","description":"Find listing price history records where the rent price was reduced.","difficulty":"easy","expected_query":"SELECT id, listing_id, old_rent_amount, new_rent_amount FROM listing_price_history WHERE old_rent_amount IS NOT NULL AND new_rent_amount IS NOT NULL AND new_rent_amount < old_rent_amount ORDER BY id ASC;","solution_columns":["id","listing_id","old_rent_amount","new_rent_amount"],"tables":["listing_price_history"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_036","title":"Lease Renewals","description":"Find properties that have had more than one lease.","difficulty":"medium","expected_query":"SELECT property_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id HAVING COUNT(*) > 1 ORDER BY lease_count DESC, property_id ASC;","solution_columns":["property_id","lease_count"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"lease_count","direction":"desc"},{"column":"property_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_037","title":"Maintenance Cost By Property","description":"Find the total maintenance resolution cost for each property.","difficulty":"medium","expected_query":"SELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost FROM maintenance_tickets GROUP BY property_id ORDER BY total_maintenance_cost DESC, property_id ASC;","solution_columns":["property_id","total_maintenance_cost"],"tables":["maintenance_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_maintenance_cost","direction":"desc"},{"column":"property_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_038","title":"Avg Response Time By Executive","description":"Find the average resolution time for support tickets handled per user.","difficulty":"medium","expected_query":"SELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time FROM support_tickets WHERE resolution_time_mins IS NOT NULL GROUP BY user_id ORDER BY avg_resolution_time DESC, user_id ASC;","solution_columns":["user_id","avg_resolution_time"],"tables":["support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_resolution_time","direction":"desc"},{"column":"user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_039","title":"Top Referrers","description":"Find the top 5 users who referred the most converted users.","difficulty":"medium","expected_query":"SELECT referrer_user_id, COUNT(*) AS converted_count FROM referrals WHERE referral_status = 'converted' GROUP BY referrer_user_id ORDER BY converted_count DESC, referrer_user_id ASC LIMIT 5;","solution_columns":["referrer_user_id","converted_count"],"tables":["referrals"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"converted_count","direction":"desc"},{"column":"referrer_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_040","title":"Most Active Cities","description":"Find the top 5 cities with the highest number of property views.","difficulty":"medium","expected_query":"SELECT ae.city, COUNT(*) AS event_count FROM app_events ae WHERE ae.event_name = 'property_view' GROUP BY ae.city ORDER BY event_count DESC, ae.city ASC LIMIT 5;","solution_columns":["city","event_count"],"tables":["app_events"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"event_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_041","title":"Top Rent Cities","description":"Find the cities with the highest average live rental price.","difficulty":"medium","expected_query":"SELECT loc.city, AVG(l.rent_amount) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;","solution_columns":["city","avg_rent"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rent","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_042","title":"Popular Localities","description":"Find the localities with the highest number of live listings.","difficulty":"medium","expected_query":"SELECT loc.locality, COUNT(*) AS listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' GROUP BY loc.locality ORDER BY listing_count DESC, loc.locality ASC;","solution_columns":["locality","listing_count"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"listing_count","direction":"desc"},{"column":"locality","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_043","title":"High Demand Listings","description":"Find listings that have more inquiries than visits.","difficulty":"medium","expected_query":"SELECT l.id, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT pv.id) AS visit_count FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id LEFT JOIN property_visits pv ON l.id = pv.listing_id GROUP BY l.id HAVING COUNT(DISTINCT i.id) > COUNT(DISTINCT pv.id) ORDER BY inquiry_count DESC, l.id ASC;","solution_columns":["id","inquiry_count","visit_count"],"tables":["listings","inquiries","property_visits"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"inquiry_count","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_044","title":"Owners By Portfolio Value","description":"Find owners ordered by total sale price of their live sale listings.","difficulty":"medium","expected_query":"SELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value FROM listings WHERE listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL GROUP BY owner_profile_id ORDER BY total_portfolio_value DESC, owner_profile_id ASC;","solution_columns":["owner_profile_id","total_portfolio_value"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_portfolio_value","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_045","title":"Frequent Applicants","description":"Find users who have applied for more than 2 listings.","difficulty":"medium","expected_query":"SELECT seeker_user_id, COUNT(*) AS application_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(*) > 2 ORDER BY application_count DESC, seeker_user_id ASC;","solution_columns":["seeker_user_id","application_count"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"application_count","direction":"desc"},{"column":"seeker_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_046","title":"Most Leased Properties","description":"Find properties with the highest number of completed leases.","difficulty":"medium","expected_query":"SELECT property_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id ORDER BY lease_count DESC, property_id ASC;","solution_columns":["property_id","lease_count"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"lease_count","direction":"desc"},{"column":"property_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_047","title":"Unpaid Lease Amount","description":"Find active leases with the total unpaid rent amount.","difficulty":"medium","expected_query":"SELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount FROM rent_payments rp JOIN leases l ON rp.lease_id = l.id WHERE l.lease_status = 'active' AND rp.amount_paid < rp.amount_due GROUP BY rp.lease_id ORDER BY unpaid_amount DESC, rp.lease_id ASC;","solution_columns":["lease_id","unpaid_amount"],"tables":["rent_payments","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"unpaid_amount","direction":"desc"},{"column":"lease_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_048","title":"Busy Executives","description":"Find executives handling the most open maintenance tickets.","difficulty":"medium","expected_query":"SELECT assigned_executive_user_id, COUNT(*) AS ticket_count FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') AND assigned_executive_user_id IS NOT NULL GROUP BY assigned_executive_user_id ORDER BY ticket_count DESC, assigned_executive_user_id ASC;","solution_columns":["assigned_executive_user_id","ticket_count"],"tables":["maintenance_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ticket_count","direction":"desc"},{"column":"assigned_executive_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_049","title":"Amenities Per Property","description":"Find properties with more than 3 amenities.","difficulty":"medium","expected_query":"SELECT property_id, COUNT(*) AS amenity_count FROM property_amenities GROUP BY property_id HAVING COUNT(*) > 3 ORDER BY amenity_count DESC, property_id ASC;","solution_columns":["property_id","amenity_count"],"tables":["property_amenities"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"amenity_count","direction":"desc"},{"column":"property_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_050","title":"Inactive Owners","description":"Find owners who have no live listings.","difficulty":"medium","expected_query":"SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id AND l.listing_status = 'live' WHERE l.id IS NULL ORDER BY op.id ASC;","solution_columns":["id","user_id"],"tables":["owner_profiles","listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_051","title":"Repeated Viewers","description":"Find users who viewed the same listing more than once.","difficulty":"medium","expected_query":"SELECT user_id, listing_id, COUNT(*) AS view_count FROM property_views WHERE user_id IS NOT NULL GROUP BY user_id, listing_id HAVING COUNT(*) > 1 ORDER BY view_count DESC, user_id ASC, listing_id ASC;","solution_columns":["user_id","listing_id","view_count"],"tables":["property_views"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"view_count","direction":"desc"},{"column":"user_id","direction":"asc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_052","title":"Offer Heavy Listings","description":"Find listings that received more than 2 offers.","difficulty":"medium","expected_query":"SELECT listing_id, COUNT(*) AS offer_count FROM offers GROUP BY listing_id HAVING COUNT(*) > 2 ORDER BY offer_count DESC, listing_id ASC;","solution_columns":["listing_id","offer_count"],"tables":["offers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"offer_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_053","title":"Rejected Applications","description":"Find users whose rental applications were rejected more than once.","difficulty":"medium","expected_query":"SELECT seeker_user_id, COUNT(*) AS rejected_count FROM rental_applications WHERE application_status = 'rejected' GROUP BY seeker_user_id HAVING COUNT(*) > 1 ORDER BY rejected_count DESC, seeker_user_id ASC;","solution_columns":["seeker_user_id","rejected_count"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rejected_count","direction":"desc"},{"column":"seeker_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_054","title":"Costly Issue Types","description":"Find each maintenance issue type and its total resolution cost.","difficulty":"medium","expected_query":"SELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost FROM maintenance_tickets GROUP BY issue_type ORDER BY total_cost DESC, issue_type ASC;","solution_columns":["issue_type","total_cost"],"tables":["maintenance_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_cost","direction":"desc"},{"column":"issue_type","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_055","title":"Expired Offers","description":"Find offers that expired without a response.","difficulty":"medium","expected_query":"SELECT id, listing_id, seeker_user_id, expires_at FROM offers WHERE offer_status = 'pending' AND expires_at IS NOT NULL AND expires_at < NOW() ORDER BY expires_at ASC, id ASC;","solution_columns":["id","listing_id","seeker_user_id","expires_at"],"tables":["offers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"expires_at","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_056","title":"Active Leases By City","description":"Find each city and the number of active leases there.","difficulty":"medium","expected_query":"SELECT loc.city, COUNT(*) AS lease_count FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY lease_count DESC, loc.city ASC;","solution_columns":["city","lease_count"],"tables":["leases","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"lease_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_057","title":"Owner Response Load","description":"Find owners by total inquiries received on their listings.","difficulty":"medium","expected_query":"SELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count FROM listings l JOIN inquiries i ON l.id = i.listing_id GROUP BY l.owner_profile_id ORDER BY inquiry_count DESC, l.owner_profile_id ASC;","solution_columns":["owner_profile_id","inquiry_count"],"tables":["listings","inquiries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"inquiry_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_058","title":"Inactive Listings","description":"Find live listings that received no property views.","difficulty":"medium","expected_query":"SELECT l.id, l.property_id FROM listings l LEFT JOIN property_views pv ON l.id = pv.listing_id WHERE l.listing_status = 'live' GROUP BY l.id, l.property_id HAVING COUNT(pv.id) = 0 ORDER BY l.id ASC;","solution_columns":["id","property_id"],"tables":["listings","property_views"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_059","title":"Cities With Luxury Rentals","description":"Find cities that have at least 3 live rental listings with rent above 100000.","difficulty":"medium","expected_query":"SELECT loc.city, COUNT(*) AS luxury_listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount > 100000 GROUP BY loc.city HAVING COUNT(*) >= 3 ORDER BY luxury_listing_count DESC, loc.city ASC;","solution_columns":["city","luxury_listing_count"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"luxury_listing_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_060","title":"Verified Owners Without Live Listings","description":"Find verified owners who do not have any live listings.","difficulty":"medium","expected_query":"SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id AND l.listing_status = 'live' WHERE op.verification_status = 'verified' AND l.id IS NULL ORDER BY op.id ASC;","solution_columns":["id","user_id"],"tables":["owner_profiles","listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_061","title":"Top Lease Revenue Owners","description":"Find owners generating the highest total rent from active leases.","difficulty":"hard","expected_query":"SELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue FROM leases WHERE lease_status = 'active' GROUP BY owner_profile_id ORDER BY total_rent_revenue DESC, owner_profile_id ASC;","solution_columns":["owner_profile_id","total_rent_revenue"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_rent_revenue","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_062","title":"Repeated Tenant Moves","description":"Find tenants who have leased more than one unique property.","difficulty":"hard","expected_query":"SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties FROM leases GROUP BY tenant_user_id HAVING COUNT(DISTINCT property_id) > 1 ORDER BY unique_properties DESC, tenant_user_id ASC;","solution_columns":["tenant_user_id","unique_properties"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"unique_properties","direction":"desc"},{"column":"tenant_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_063","title":"Most Negotiated Listings","description":"Find listings with the highest number of countered offers.","difficulty":"hard","expected_query":"SELECT listing_id, COUNT(*) AS countered_offer_count FROM offers WHERE offer_status = 'countered' GROUP BY listing_id ORDER BY countered_offer_count DESC, listing_id ASC;","solution_columns":["listing_id","countered_offer_count"],"tables":["offers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"countered_offer_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_064","title":"High Churn Localities","description":"Find localities with the highest number of terminated leases.","difficulty":"hard","expected_query":"SELECT loc.locality, COUNT(*) AS terminated_lease_count FROM leases l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.lease_status = 'terminated' GROUP BY loc.locality ORDER BY terminated_lease_count DESC, loc.locality ASC;","solution_columns":["locality","terminated_lease_count"],"tables":["leases","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"terminated_lease_count","direction":"desc"},{"column":"locality","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_065","title":"Delayed Rent Tenants","description":"Find tenants with more than 2 overdue rent payments.","difficulty":"hard","expected_query":"SELECT tenant_user_id, COUNT(*) AS overdue_payment_count FROM rent_payments WHERE payment_status = 'overdue' GROUP BY tenant_user_id HAVING COUNT(*) > 2 ORDER BY overdue_payment_count DESC, tenant_user_id ASC;","solution_columns":["tenant_user_id","overdue_payment_count"],"tables":["rent_payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"overdue_payment_count","direction":"desc"},{"column":"tenant_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_066","title":"Visit To Lease Conversion","description":"Find listings where completed visits resulted in at least one active lease.","difficulty":"hard","expected_query":"SELECT pv.listing_id, COUNT(DISTINCT pv.id) AS completed_visits, COUNT(DISTINCT le.id) AS active_leases FROM property_visits pv LEFT JOIN leases le ON pv.listing_id = le.listing_id AND le.lease_status = 'active' WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING COUNT(DISTINCT le.id) > 0 ORDER BY active_leases DESC, pv.listing_id ASC;","solution_columns":["listing_id","completed_visits","active_leases"],"tables":["property_visits","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"active_leases","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_067","title":"Dormant High Value Listings","description":"Find live sale listings above 1 crore with no inquiries.","difficulty":"hard","expected_query":"SELECT l.id, l.property_id, l.sale_price FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 GROUP BY l.id, l.property_id, l.sale_price HAVING COUNT(i.id) = 0 ORDER BY l.sale_price DESC, l.id ASC;","solution_columns":["id","property_id","sale_price"],"tables":["listings","inquiries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"sale_price","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_068","title":"Owners With Rising Prices","description":"Find owners whose listings had more price increases than price drops.","difficulty":"hard","expected_query":"SELECT l.owner_profile_id, COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases, COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL GROUP BY l.owner_profile_id HAVING COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) > COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) ORDER BY price_increases DESC, l.owner_profile_id ASC;","solution_columns":["owner_profile_id","price_increases","price_drops"],"tables":["listing_price_history","listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"price_increases","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_069","title":"Frequent Maintenance Properties","description":"Find properties with more than 3 maintenance tickets in active leases.","difficulty":"hard","expected_query":"SELECT mt.property_id, COUNT(*) AS ticket_count FROM maintenance_tickets mt JOIN leases l ON mt.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY mt.property_id HAVING COUNT(*) > 3 ORDER BY ticket_count DESC, mt.property_id ASC;","solution_columns":["property_id","ticket_count"],"tables":["maintenance_tickets","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"ticket_count","direction":"desc"},{"column":"property_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_070","title":"Owner Funnel Conversion","description":"Find owners whose live listings have at least one inquiry but no active lease.","difficulty":"hard","expected_query":"SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count FROM listings l JOIN inquiries i ON l.id = i.listing_id LEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT i.id) > 0 AND COUNT(DISTINCT le.id) = 0 ORDER BY listing_count DESC, l.owner_profile_id ASC;","solution_columns":["owner_profile_id","listing_count"],"tables":["listings","inquiries","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"listing_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_071","title":"Top Inquiry To Lease Cities","description":"Find cities with the highest number of inquiries on listings that later became active leases.","difficulty":"hard","expected_query":"SELECT loc.city, COUNT(DISTINCT i.id) AS converted_inquiry_count FROM inquiries i JOIN listings l ON i.listing_id = l.id JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY converted_inquiry_count DESC, loc.city ASC;","solution_columns":["city","converted_inquiry_count"],"tables":["inquiries","listings","leases","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"converted_inquiry_count","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_072","title":"Multi City Owners","description":"Find owners who have properties in more than one city.","difficulty":"hard","expected_query":"SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count FROM properties p JOIN locations loc ON p.location_id = loc.id GROUP BY p.owner_profile_id HAVING COUNT(DISTINCT loc.city) > 1 ORDER BY city_count DESC, p.owner_profile_id ASC;","solution_columns":["owner_profile_id","city_count"],"tables":["properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"city_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_073","title":"Listings With Full Funnel","description":"Find listings that have at least one inquiry, one completed visit, one accepted offer, and one active lease.","difficulty":"hard","expected_query":"SELECT l.id FROM listings l WHERE EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AND EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = l.id AND o.offer_status = 'accepted') AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') ORDER BY l.id ASC;","solution_columns":["id"],"tables":["listings","inquiries","property_visits","offers","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_074","title":"Fastest Closed Tickets","description":"Find support tickets that were resolved faster than the average resolved ticket.","difficulty":"hard","expected_query":"SELECT id, user_id, resolution_time_mins FROM support_tickets WHERE resolution_time_mins IS NOT NULL AND resolution_time_mins < (SELECT AVG(resolution_time_mins) FROM support_tickets WHERE resolution_time_mins IS NOT NULL) ORDER BY resolution_time_mins ASC, id ASC;","solution_columns":["id","user_id","resolution_time_mins"],"tables":["support_tickets"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"resolution_time_mins","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_075","title":"Top Amenity Coverage Owners","description":"Find owners by the total number of amenity mappings across their properties.","difficulty":"hard","expected_query":"SELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.owner_profile_id ORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;","solution_columns":["owner_profile_id","amenity_mapping_count"],"tables":["properties","property_amenities"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"amenity_mapping_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_076","title":"Users More Rejections Than Approvals","description":"Find seekers whose rejected rental applications are more than their approved applications.","difficulty":"hard","expected_query":"SELECT seeker_user_id, COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count, COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(*) FILTER (WHERE application_status = 'rejected') > COUNT(*) FILTER (WHERE application_status = 'approved') ORDER BY rejected_count DESC, seeker_user_id ASC;","solution_columns":["seeker_user_id","rejected_count","approved_count"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rejected_count","direction":"desc"},{"column":"seeker_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_077","title":"Long Vacancy Listings","description":"Find live listings created earlier than their available from date.","difficulty":"hard","expected_query":"SELECT id, property_id, created_at, available_from FROM listings WHERE available_from IS NOT NULL AND created_at::date < available_from ORDER BY available_from DESC, id ASC;","solution_columns":["id","property_id","created_at","available_from"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"available_from","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_078","title":"Owners With Expired Docs","description":"Find verified owners who have at least one expired user document.","difficulty":"hard","expected_query":"SELECT DISTINCT op.id, op.user_id FROM owner_profiles op JOIN user_documents ud ON op.user_id = ud.user_id WHERE op.verification_status = 'verified' AND ud.expires_at IS NOT NULL AND ud.expires_at < NOW() ORDER BY op.id ASC;","solution_columns":["id","user_id"],"tables":["owner_profiles","user_documents"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_079","title":"Listings Above Owner Average","description":"Find listings whose rent amount is greater than the average rent of other listings by the same owner.","difficulty":"hard","expected_query":"SELECT l.id, l.owner_profile_id, l.rent_amount FROM listings l JOIN (SELECT owner_profile_id, AVG(rent_amount) AS avg_rent FROM listings WHERE rent_amount IS NOT NULL GROUP BY owner_profile_id) x ON l.owner_profile_id = x.owner_profile_id WHERE l.rent_amount IS NOT NULL AND l.rent_amount > x.avg_rent ORDER BY l.rent_amount DESC, l.id ASC;","solution_columns":["id","owner_profile_id","rent_amount"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"rent_amount","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_080","title":"Most Reassigned Listings","description":"Find listings with the highest number of status changes.","difficulty":"hard","expected_query":"SELECT listing_id, COUNT(*) AS status_change_count FROM listing_status_history GROUP BY listing_id ORDER BY status_change_count DESC, listing_id ASC;","solution_columns":["listing_id","status_change_count"],"tables":["listing_status_history"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"status_change_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_081","title":"Top Lease Revenue Cities","description":"Find cities generating the highest total monthly rent from active leases.","difficulty":"hard","expected_query":"SELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY total_monthly_rent DESC, loc.city ASC;","solution_columns":["city","total_monthly_rent"],"tables":["leases","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_monthly_rent","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_082","title":"Owners With Mixed Inventory","description":"Find owners who have both live rental listings and live sale listings.","difficulty":"hard","expected_query":"SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0 AND COUNT(*) FILTER (WHERE listed_for = 'sale') > 0 ORDER BY owner_profile_id ASC;","solution_columns":["owner_profile_id"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_083","title":"Visit Heavy No Offer Listings","description":"Find listings that had completed visits but received no offers.","difficulty":"hard","expected_query":"SELECT pv.listing_id, COUNT(*) AS completed_visit_count FROM property_visits pv LEFT JOIN offers o ON pv.listing_id = o.listing_id WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING COUNT(o.id) = 0 ORDER BY completed_visit_count DESC, pv.listing_id ASC;","solution_columns":["listing_id","completed_visit_count"],"tables":["property_visits","offers"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_visit_count","direction":"desc"},{"column":"listing_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_084","title":"Tenants With Late Fee Ratio","description":"Find tenants whose rent payments charged late fees more than once.","difficulty":"hard","expected_query":"SELECT tenant_user_id, COUNT(*) AS late_fee_payment_count FROM rent_payments WHERE late_fee > 0 GROUP BY tenant_user_id HAVING COUNT(*) > 1 ORDER BY late_fee_payment_count DESC, tenant_user_id ASC;","solution_columns":["tenant_user_id","late_fee_payment_count"],"tables":["rent_payments"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"late_fee_payment_count","direction":"desc"},{"column":"tenant_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_085","title":"Expensive Areas By Sqft","description":"Find localities with the highest average rent per built up area for live rental listings.","difficulty":"hard","expected_query":"SELECT loc.locality, AVG(l.rent_amount / NULLIF(p.built_up_area_sqft, 0)) AS avg_rent_per_sqft FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL AND p.built_up_area_sqft IS NOT NULL AND p.built_up_area_sqft > 0 GROUP BY loc.locality ORDER BY avg_rent_per_sqft DESC, loc.locality ASC;","solution_columns":["locality","avg_rent_per_sqft"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_rent_per_sqft","direction":"desc"},{"column":"locality","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_086","title":"Owners With Repeated Price Drops","description":"Find owners whose listings had price drops on more than one record.","difficulty":"hard","expected_query":"SELECT l.owner_profile_id, COUNT(*) AS price_drop_count FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL AND lph.new_rent_amount < lph.old_rent_amount GROUP BY l.owner_profile_id HAVING COUNT(*) > 1 ORDER BY price_drop_count DESC, l.owner_profile_id ASC;","solution_columns":["owner_profile_id","price_drop_count"],"tables":["listing_price_history","listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"price_drop_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_087","title":"Applications Without Offers","description":"Find rental applications that were submitted without any linked offer.","difficulty":"hard","expected_query":"SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE offer_id IS NULL ORDER BY id ASC;","solution_columns":["id","listing_id","seeker_user_id"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_088","title":"Owners With Multi Amenity Properties","description":"Find owners who have at least one property with more than 5 amenities.","difficulty":"hard","expected_query":"SELECT DISTINCT p.owner_profile_id FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.id, p.owner_profile_id HAVING COUNT(pa.id) > 5 ORDER BY p.owner_profile_id ASC;","solution_columns":["owner_profile_id"],"tables":["properties","property_amenities"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_089","title":"Localities Above City Rent","description":"Find localities where the average live rental price is greater than the average live rental price of their city.","difficulty":"hard","expected_query":"SELECT x.city, x.locality, x.avg_locality_rent FROM (SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city, loc.locality) x JOIN (SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city) y ON x.city = y.city WHERE x.avg_locality_rent > y.avg_city_rent ORDER BY x.avg_locality_rent DESC, x.city ASC, x.locality ASC;","solution_columns":["city","locality","avg_locality_rent"],"tables":["listings","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"avg_locality_rent","direction":"desc"},{"column":"city","direction":"asc"},{"column":"locality","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_090","title":"Seeker Funnel Completion","description":"Find seekers who completed the full funnel of inquiry, completed visit, accepted offer, and active lease.","difficulty":"hard","expected_query":"SELECT DISTINCT i.seeker_user_id FROM inquiries i JOIN property_visits pv ON i.listing_id = pv.listing_id AND i.seeker_user_id = pv.seeker_user_id JOIN offers o ON i.listing_id = o.listing_id AND i.seeker_user_id = o.seeker_user_id JOIN leases le ON i.listing_id = le.listing_id AND le.tenant_user_id = i.seeker_user_id WHERE pv.visit_status = 'completed' AND o.offer_status = 'accepted' AND le.lease_status = 'active' ORDER BY i.seeker_user_id ASC;","solution_columns":["seeker_user_id"],"tables":["inquiries","property_visits","offers","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"seeker_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_091","title":"Top Maintenance Spend Cities","description":"Find cities with the highest total maintenance resolution cost.","difficulty":"hard","expected_query":"SELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost FROM maintenance_tickets mt JOIN properties p ON mt.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_maintenance_cost DESC, loc.city ASC;","solution_columns":["city","total_maintenance_cost"],"tables":["maintenance_tickets","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_maintenance_cost","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_092","title":"Owners With Only Rent Listings","description":"Find owners whose live listings are only for rent and none for sale.","difficulty":"hard","expected_query":"SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0 AND COUNT(*) FILTER (WHERE listed_for = 'sale') = 0 ORDER BY owner_profile_id ASC;","solution_columns":["owner_profile_id"],"tables":["listings"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_093","title":"Properties With Repeated Tenants","description":"Find properties that have been leased by the same tenant more than once.","difficulty":"hard","expected_query":"SELECT property_id, tenant_user_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id, tenant_user_id HAVING COUNT(*) > 1 ORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;","solution_columns":["property_id","tenant_user_id","lease_count"],"tables":["leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"lease_count","direction":"desc"},{"column":"property_id","direction":"asc"},{"column":"tenant_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_094","title":"Listings With More Visits Than Inquiries","description":"Find listings where completed visits exceed total inquiries.","difficulty":"hard","expected_query":"SELECT l.id, COUNT(DISTINCT pv.id) AS completed_visit_count, COUNT(DISTINCT i.id) AS inquiry_count FROM listings l LEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed' LEFT JOIN inquiries i ON l.id = i.listing_id GROUP BY l.id HAVING COUNT(DISTINCT pv.id) > COUNT(DISTINCT i.id) ORDER BY completed_visit_count DESC, l.id ASC;","solution_columns":["id","completed_visit_count","inquiry_count"],"tables":["listings","property_visits","inquiries"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"completed_visit_count","direction":"desc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_095","title":"Long Pending Applications","description":"Find rental applications that have remained under review for more than 7 days.","difficulty":"hard","expected_query":"SELECT id, listing_id, seeker_user_id, created_at FROM rental_applications WHERE application_status = 'under_review' AND created_at < NOW() - INTERVAL '7 days' ORDER BY created_at ASC, id ASC;","solution_columns":["id","listing_id","seeker_user_id","created_at"],"tables":["rental_applications"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"created_at","direction":"asc"},{"column":"id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_096","title":"High Conversion Owners","description":"Find owners whose listings have both inquiries and active leases for more than one listing.","difficulty":"hard","expected_query":"SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count FROM listings l JOIN inquiries i ON l.id = i.listing_id JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT l.id) > 1 ORDER BY converted_listing_count DESC, l.owner_profile_id ASC;","solution_columns":["owner_profile_id","converted_listing_count"],"tables":["listings","inquiries","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"converted_listing_count","direction":"desc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_097","title":"Top Referral Users","description":"Find users who have the highest total referral reward amount.","difficulty":"hard","expected_query":"SELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount FROM referrals GROUP BY referrer_user_id ORDER BY total_reward_amount DESC, referrer_user_id ASC;","solution_columns":["referrer_user_id","total_reward_amount"],"tables":["referrals"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_reward_amount","direction":"desc"},{"column":"referrer_user_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_098","title":"Cities With Highest Lease Default","description":"Find cities with the highest total overdue rent amount.","difficulty":"hard","expected_query":"SELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE rp.payment_status = 'overdue' GROUP BY loc.city ORDER BY overdue_amount DESC, loc.city ASC;","solution_columns":["city","overdue_amount"],"tables":["rent_payments","leases","properties","locations"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"overdue_amount","direction":"desc"},{"column":"city","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_099","title":"Most Stable Owners","description":"Find owners whose listings have the fewest status changes among owners with at least one live listing.","difficulty":"hard","expected_query":"SELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count FROM listings l LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id ORDER BY status_change_count ASC, l.owner_profile_id ASC;","solution_columns":["owner_profile_id","status_change_count"],"tables":["listings","listing_status_history"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"status_change_count","direction":"asc"},{"column":"owner_profile_id","direction":"asc"}]}},
  {"app_id":appId,"code":"REALESTATE_100","title":"Top Revenue Properties","description":"Find properties generating the highest total paid rent amount.","difficulty":"hard","expected_query":"SELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id WHERE rp.payment_status IN ('paid', 'partial') GROUP BY le.property_id ORDER BY total_paid_rent DESC, le.property_id ASC;","solution_columns":["property_id","total_paid_rent"],"tables":["rent_payments","leases"],"comparison_config":{"ignore_order":false,"sort_by_columns":[{"column":"total_paid_rent","direction":"desc"},{"column":"property_id","direction":"asc"}]}},
];

export const hints = [
  {
    "code": "REALESTATE_001",
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
    "code": "REALESTATE_002",
    "hints": [
      {
        "hint_order": 1,
        "content": "Filter verified owners first."
      },
      {
        "hint_order": 2,
        "content": "Use verification_status in owner_profiles."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) where status is verified."
      }
    ]
  },
  {
    "code": "REALESTATE_003",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only live listings should be returned."
      },
      {
        "hint_order": 2,
        "content": "Pick id, property_id, and listed_for."
      },
      {
        "hint_order": 3,
        "content": "Use WHERE listing_status = 'live'."
      }
    ]
  },
  {
    "code": "REALESTATE_004",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look in properties only."
      },
      {
        "hint_order": 2,
        "content": "Use the gated community flag."
      },
      {
        "hint_order": 3,
        "content": "Filter is_gated_community = true."
      }
    ]
  },
  {
    "code": "REALESTATE_005",
    "hints": [
      {
        "hint_order": 1,
        "content": "Start from listings."
      },
      {
        "hint_order": 2,
        "content": "Keep live listings where pets are allowed."
      },
      {
        "hint_order": 3,
        "content": "Use both listing_status and pet_allowed."
      }
    ]
  },
  {
    "code": "REALESTATE_006",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only live rental listings matter."
      },
      {
        "hint_order": 2,
        "content": "Sort by highest rent first."
      },
      {
        "hint_order": 3,
        "content": "ORDER BY rent_amount DESC with LIMIT 5."
      }
    ]
  },
  {
    "code": "REALESTATE_007",
    "hints": [
      {
        "hint_order": 1,
        "content": "Group users by signup source."
      },
      {
        "hint_order": 2,
        "content": "Ignore NULL signup_source values."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) with GROUP BY signup_source."
      }
    ]
  },
  {
    "code": "REALESTATE_008",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use properties table."
      },
      {
        "hint_order": 2,
        "content": "Group by property_type."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) for each type."
      }
    ]
  },
  {
    "code": "REALESTATE_009",
    "hints": [
      {
        "hint_order": 1,
        "content": "A listing belongs to a property, and a property belongs to a location."
      },
      {
        "hint_order": 2,
        "content": "Join listings, properties, and locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and count listings."
      }
    ]
  },
  {
    "code": "REALESTATE_010",
    "hints": [
      {
        "hint_order": 1,
        "content": "Each property belongs to an owner profile."
      },
      {
        "hint_order": 2,
        "content": "Join owner_profiles with properties."
      },
      {
        "hint_order": 3,
        "content": "Group by owner and use HAVING COUNT(...) > 3."
      }
    ]
  },
  {
    "code": "REALESTATE_011",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use owner_verification_requests only."
      },
      {
        "hint_order": 2,
        "content": "Keep only pending requests."
      },
      {
        "hint_order": 3,
        "content": "Filter request_status = 'pending'."
      }
    ]
  },
  {
    "code": "REALESTATE_012",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look at document expiry date."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows with NULL expires_at."
      },
      {
        "hint_order": 3,
        "content": "Compare expires_at with NOW()."
      }
    ]
  },
  {
    "code": "REALESTATE_013",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is about live listings that are still available."
      },
      {
        "hint_order": 2,
        "content": "Use both listing_status and availability_status."
      },
      {
        "hint_order": 3,
        "content": "Filter live + available."
      }
    ]
  },
  {
    "code": "REALESTATE_014",
    "hints": [
      {
        "hint_order": 1,
        "content": "Properties store location_id."
      },
      {
        "hint_order": 2,
        "content": "Join properties with locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and count properties."
      }
    ]
  },
  {
    "code": "REALESTATE_015",
    "hints": [
      {
        "hint_order": 1,
        "content": "Some listings may not have rows in listing_media."
      },
      {
        "hint_order": 2,
        "content": "Use a LEFT JOIN from listings to listing_media."
      },
      {
        "hint_order": 3,
        "content": "Keep rows where the media side is NULL."
      }
    ]
  },
  {
    "code": "REALESTATE_016",
    "hints": [
      {
        "hint_order": 1,
        "content": "Views are stored in property_views."
      },
      {
        "hint_order": 2,
        "content": "Count views per listing_id."
      },
      {
        "hint_order": 3,
        "content": "Sort by count descending and limit to 5."
      }
    ]
  },
  {
    "code": "REALESTATE_017",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only live listings matter here."
      },
      {
        "hint_order": 2,
        "content": "Group listings by owner_profile_id."
      },
      {
        "hint_order": 3,
        "content": "Count live listings per owner."
      }
    ]
  },
  {
    "code": "REALESTATE_018",
    "hints": [
      {
        "hint_order": 1,
        "content": "Visits are stored in property_visits."
      },
      {
        "hint_order": 2,
        "content": "Group by listing_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) visits per listing."
      }
    ]
  },
  {
    "code": "REALESTATE_019",
    "hints": [
      {
        "hint_order": 1,
        "content": "Some owners may not have any properties."
      },
      {
        "hint_order": 2,
        "content": "Use a LEFT JOIN from owner_profiles to properties."
      },
      {
        "hint_order": 3,
        "content": "Keep owners where property id is NULL."
      }
    ]
  },
  {
    "code": "REALESTATE_020",
    "hints": [
      {
        "hint_order": 1,
        "content": "Amenities are connected through property_amenities."
      },
      {
        "hint_order": 2,
        "content": "Join amenities with property_amenities."
      },
      {
        "hint_order": 3,
        "content": "Count linked properties per amenity and take top 5."
      }
    ]
  },
  {
    "code": "REALESTATE_021",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use rental_applications only."
      },
      {
        "hint_order": 2,
        "content": "Keep applications under review."
      },
      {
        "hint_order": 3,
        "content": "Filter application_status = 'under_review'."
      }
    ]
  },
  {
    "code": "REALESTATE_022",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use leases table."
      },
      {
        "hint_order": 2,
        "content": "Keep only active leases."
      },
      {
        "hint_order": 3,
        "content": "Filter lease_status = 'active'."
      }
    ]
  },
  {
    "code": "REALESTATE_023",
    "hints": [
      {
        "hint_order": 1,
        "content": "Overdue means due date already passed."
      },
      {
        "hint_order": 2,
        "content": "Only pending or overdue statuses matter."
      },
      {
        "hint_order": 3,
        "content": "Use due_date < CURRENT_DATE with WHERE ... IN (...)."
      }
    ]
  },
  {
    "code": "REALESTATE_024",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is only about maintenance_tickets."
      },
      {
        "hint_order": 2,
        "content": "Open work includes multiple statuses."
      },
      {
        "hint_order": 3,
        "content": "Use ticket_status IN ('open', 'assigned', 'in_progress')."
      }
    ]
  },
  {
    "code": "REALESTATE_025",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look at live rental listings only."
      },
      {
        "hint_order": 2,
        "content": "Apply the rent threshold."
      },
      {
        "hint_order": 3,
        "content": "Use listed_for = 'rent' and rent_amount > 50000."
      }
    ]
  },
  {
    "code": "REALESTATE_026",
    "hints": [
      {
        "hint_order": 1,
        "content": "Applications belong to listings."
      },
      {
        "hint_order": 2,
        "content": "Group rental_applications by listing_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT(*) applications per listing."
      }
    ]
  },
  {
    "code": "REALESTATE_027",
    "hints": [
      {
        "hint_order": 1,
        "content": "Revenue comes from active leases."
      },
      {
        "hint_order": 2,
        "content": "Group leases by owner_profile_id."
      },
      {
        "hint_order": 3,
        "content": "SUM(monthly_rent) for active leases."
      }
    ]
  },
  {
    "code": "REALESTATE_028",
    "hints": [
      {
        "hint_order": 1,
        "content": "Amenities are linked through property_amenities."
      },
      {
        "hint_order": 2,
        "content": "Join amenities to the mapping table."
      },
      {
        "hint_order": 3,
        "content": "Group by amenity_name and count properties."
      }
    ]
  },
  {
    "code": "REALESTATE_029",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need listing rent and city together."
      },
      {
        "hint_order": 2,
        "content": "Join listings -> properties -> locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and use AVG(rent_amount)."
      }
    ]
  },
  {
    "code": "REALESTATE_030",
    "hints": [
      {
        "hint_order": 1,
        "content": "Inquiries belong to listings."
      },
      {
        "hint_order": 2,
        "content": "Count inquiries per listing_id."
      },
      {
        "hint_order": 3,
        "content": "Sort descending and limit to top 5."
      }
    ]
  },
  {
    "code": "REALESTATE_031",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look at rent_payments only."
      },
      {
        "hint_order": 2,
        "content": "A charged late fee means the value is above zero."
      },
      {
        "hint_order": 3,
        "content": "Filter late_fee > 0 and sort by late_fee."
      }
    ]
  },
  {
    "code": "REALESTATE_032",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use listings table."
      },
      {
        "hint_order": 2,
        "content": "Check lease_duration_months."
      },
      {
        "hint_order": 3,
        "content": "Filter durations greater than 12 months."
      }
    ]
  },
  {
    "code": "REALESTATE_033",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count executives by team."
      },
      {
        "hint_order": 2,
        "content": "Only active executives should be included."
      },
      {
        "hint_order": 3,
        "content": "Group by team_name and count rows."
      }
    ]
  },
  {
    "code": "REALESTATE_034",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use owner_verification_requests."
      },
      {
        "hint_order": 2,
        "content": "Keep only rejected requests."
      },
      {
        "hint_order": 3,
        "content": "Filter request_status = 'rejected'."
      }
    ]
  },
  {
    "code": "REALESTATE_035",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare old rent and new rent in listing_price_history."
      },
      {
        "hint_order": 2,
        "content": "A drop means the new value is smaller."
      },
      {
        "hint_order": 3,
        "content": "Filter rows where new_rent_amount < old_rent_amount."
      }
    ]
  },
  {
    "code": "REALESTATE_036",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is about repeated leases on the same property."
      },
      {
        "hint_order": 2,
        "content": "Group leases by property_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "REALESTATE_037",
    "hints": [
      {
        "hint_order": 1,
        "content": "Sum maintenance costs per property."
      },
      {
        "hint_order": 2,
        "content": "Use maintenance_tickets."
      },
      {
        "hint_order": 3,
        "content": "Group by property_id and SUM resolution_cost."
      }
    ]
  },
  {
    "code": "REALESTATE_038",
    "hints": [
      {
        "hint_order": 1,
        "content": "Average resolution time per user."
      },
      {
        "hint_order": 2,
        "content": "Ignore NULL resolution_time_mins."
      },
      {
        "hint_order": 3,
        "content": "Group by user_id and use AVG(resolution_time_mins)."
      }
    ]
  },
  {
    "code": "REALESTATE_039",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only converted referrals matter."
      },
      {
        "hint_order": 2,
        "content": "Group referrals by referrer_user_id."
      },
      {
        "hint_order": 3,
        "content": "Count converted rows and keep the top 5."
      }
    ]
  },
  {
    "code": "REALESTATE_040",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use app_events, not property_views."
      },
      {
        "hint_order": 2,
        "content": "Keep only property_view events."
      },
      {
        "hint_order": 3,
        "content": "Group by city, count events, and limit to 5."
      }
    ]
  },
  {
    "code": "REALESTATE_041",
    "hints": [
      {
        "hint_order": 1,
        "content": "This asks for average rent by city."
      },
      {
        "hint_order": 2,
        "content": "Join listings to properties and locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and use AVG(rent_amount)."
      }
    ]
  },
  {
    "code": "REALESTATE_042",
    "hints": [
      {
        "hint_order": 1,
        "content": "Live listings need to be tied to localities."
      },
      {
        "hint_order": 2,
        "content": "Join listings -> properties -> locations."
      },
      {
        "hint_order": 3,
        "content": "Group by locality and count listings."
      }
    ]
  },
  {
    "code": "REALESTATE_043",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare inquiries and visits per listing."
      },
      {
        "hint_order": 2,
        "content": "Join listings with inquiries and property_visits."
      },
      {
        "hint_order": 3,
        "content": "Use DISTINCT counts to avoid duplicate multiplication."
      }
    ]
  },
  {
    "code": "REALESTATE_044",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use only live sale listings."
      },
      {
        "hint_order": 2,
        "content": "Group by owner_profile_id."
      },
      {
        "hint_order": 3,
        "content": "SUM sale_price for each owner."
      }
    ]
  },
  {
    "code": "REALESTATE_045",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count applications per seeker."
      },
      {
        "hint_order": 2,
        "content": "Use rental_applications."
      },
      {
        "hint_order": 3,
        "content": "Group by seeker_user_id and keep counts above 2."
      }
    ]
  },
  {
    "code": "REALESTATE_046",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find how many leases each property had."
      },
      {
        "hint_order": 2,
        "content": "Use leases only."
      },
      {
        "hint_order": 3,
        "content": "Group by property_id and count rows."
      }
    ]
  },
  {
    "code": "REALESTATE_047",
    "hints": [
      {
        "hint_order": 1,
        "content": "Unpaid amount is due minus paid."
      },
      {
        "hint_order": 2,
        "content": "Only active leases should be included."
      },
      {
        "hint_order": 3,
        "content": "Join rent_payments to leases, then SUM(amount_due - amount_paid)."
      }
    ]
  },
  {
    "code": "REALESTATE_048",
    "hints": [
      {
        "hint_order": 1,
        "content": "Look at maintenance tickets still in progress."
      },
      {
        "hint_order": 2,
        "content": "Group by assigned_executive_user_id."
      },
      {
        "hint_order": 3,
        "content": "Count open or active ticket statuses per executive."
      }
    ]
  },
  {
    "code": "REALESTATE_049",
    "hints": [
      {
        "hint_order": 1,
        "content": "Amenities are stored in property_amenities."
      },
      {
        "hint_order": 2,
        "content": "Count amenities per property."
      },
      {
        "hint_order": 3,
        "content": "Group by property_id and use HAVING COUNT(*) > 3."
      }
    ]
  },
  {
    "code": "REALESTATE_050",
    "hints": [
      {
        "hint_order": 1,
        "content": "Owners with no live listings are needed."
      },
      {
        "hint_order": 2,
        "content": "Use a LEFT JOIN from owner_profiles to listings."
      },
      {
        "hint_order": 3,
        "content": "Join only live listings and keep NULL matches."
      }
    ]
  },
  {
    "code": "REALESTATE_051",
    "hints": [
      {
        "hint_order": 1,
        "content": "Repeated viewing means the same user and listing pair appears multiple times."
      },
      {
        "hint_order": 2,
        "content": "Ignore anonymous rows where user_id is NULL."
      },
      {
        "hint_order": 3,
        "content": "Group by user_id, listing_id and use HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "REALESTATE_052",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is a grouped offer count per listing."
      },
      {
        "hint_order": 2,
        "content": "Use offers table only."
      },
      {
        "hint_order": 3,
        "content": "Group by listing_id and keep counts above 2."
      }
    ]
  },
  {
    "code": "REALESTATE_053",
    "hints": [
      {
        "hint_order": 1,
        "content": "Only rejected applications matter."
      },
      {
        "hint_order": 2,
        "content": "Group by seeker_user_id."
      },
      {
        "hint_order": 3,
        "content": "Filter rejected rows first, then HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "REALESTATE_054",
    "hints": [
      {
        "hint_order": 1,
        "content": "Resolution cost needs to be summed by issue type."
      },
      {
        "hint_order": 2,
        "content": "Use maintenance_tickets."
      },
      {
        "hint_order": 3,
        "content": "Group by issue_type and SUM resolution_cost."
      }
    ]
  },
  {
    "code": "REALESTATE_055",
    "hints": [
      {
        "hint_order": 1,
        "content": "An expired offer is still pending but its expiry time has passed."
      },
      {
        "hint_order": 2,
        "content": "Ignore rows where expires_at is NULL."
      },
      {
        "hint_order": 3,
        "content": "Filter pending offers with expires_at < NOW()."
      }
    ]
  },
  {
    "code": "REALESTATE_056",
    "hints": [
      {
        "hint_order": 1,
        "content": "Active leases need city information."
      },
      {
        "hint_order": 2,
        "content": "Join leases to properties and then locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and count active leases."
      }
    ]
  },
  {
    "code": "REALESTATE_057",
    "hints": [
      {
        "hint_order": 1,
        "content": "Inquiries belong to listings, and listings belong to owners."
      },
      {
        "hint_order": 2,
        "content": "Join listings with inquiries."
      },
      {
        "hint_order": 3,
        "content": "Group by owner_profile_id and count inquiries."
      }
    ]
  },
  {
    "code": "REALESTATE_058",
    "hints": [
      {
        "hint_order": 1,
        "content": "You need live listings with no views."
      },
      {
        "hint_order": 2,
        "content": "Use a LEFT JOIN from listings to property_views."
      },
      {
        "hint_order": 3,
        "content": "Keep live listings where the view count is zero or view id is NULL."
      }
    ]
  },
  {
    "code": "REALESTATE_059",
    "hints": [
      {
        "hint_order": 1,
        "content": "Focus on live rental listings with rent above 100000."
      },
      {
        "hint_order": 2,
        "content": "Bring city using properties and locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and keep cities with at least 3 such listings."
      }
    ]
  },
  {
    "code": "REALESTATE_060",
    "hints": [
      {
        "hint_order": 1,
        "content": "Start with verified owners only."
      },
      {
        "hint_order": 2,
        "content": "Then check whether they have any live listings."
      },
      {
        "hint_order": 3,
        "content": "Use LEFT JOIN or NOT EXISTS to keep only owners without live listings."
      }
    ]
  },
  {
    "code": "REALESTATE_061",
    "hints": [
      {
        "hint_order": 1,
        "content": "Start with active leases only."
      },
      {
        "hint_order": 2,
        "content": "Join leases to properties and then locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and SUM monthly_rent."
      }
    ]
  },
  {
    "code": "REALESTATE_062",
    "hints": [
      {
        "hint_order": 1,
        "content": "A property can have multiple visits."
      },
      {
        "hint_order": 2,
        "content": "Count only completed visits."
      },
      {
        "hint_order": 3,
        "content": "Group by listing_id with WHERE visit_status = 'completed'."
      }
    ]
  },
  {
    "code": "REALESTATE_063",
    "hints": [
      {
        "hint_order": 1,
        "content": "Owners are identified through listings."
      },
      {
        "hint_order": 2,
        "content": "Count live listings per owner."
      },
      {
        "hint_order": 3,
        "content": "Use GROUP BY owner_profile_id and HAVING COUNT(*) > 5."
      }
    ]
  },
  {
    "code": "REALESTATE_064",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use offers table only."
      },
      {
        "hint_order": 2,
        "content": "Keep accepted offers."
      },
      {
        "hint_order": 3,
        "content": "Group by listing_id and count accepted offers."
      }
    ]
  },
  {
    "code": "REALESTATE_065",
    "hints": [
      {
        "hint_order": 1,
        "content": "Check rent payments with overdue status."
      },
      {
        "hint_order": 2,
        "content": "Group by tenant_user_id."
      },
      {
        "hint_order": 3,
        "content": "COUNT overdue rows per tenant."
      }
    ]
  },
  {
    "code": "REALESTATE_066",
    "hints": [
      {
        "hint_order": 1,
        "content": "Maintenance issues belong to properties."
      },
      {
        "hint_order": 2,
        "content": "Join maintenance_tickets to properties."
      },
      {
        "hint_order": 3,
        "content": "Group by property_id and SUM resolution_cost."
      }
    ]
  },
  {
    "code": "REALESTATE_067",
    "hints": [
      {
        "hint_order": 1,
        "content": "A conversion means inquiry led to lease."
      },
      {
        "hint_order": 2,
        "content": "Join inquiries and leases on listing_id and user."
      },
      {
        "hint_order": 3,
        "content": "Count distinct converted seekers."
      }
    ]
  },
  {
    "code": "REALESTATE_068",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use property_views only."
      },
      {
        "hint_order": 2,
        "content": "Group by user_id and listing_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 3 for repeated views."
      }
    ]
  },
  {
    "code": "REALESTATE_069",
    "hints": [
      {
        "hint_order": 1,
        "content": "Join listings with properties and locations."
      },
      {
        "hint_order": 2,
        "content": "Focus on live rent listings only."
      },
      {
        "hint_order": 3,
        "content": "Group by locality and AVG rent_amount."
      }
    ]
  },
  {
    "code": "REALESTATE_070",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use rental_applications."
      },
      {
        "hint_order": 2,
        "content": "Filter approved applications."
      },
      {
        "hint_order": 3,
        "content": "Group by listing_id and count approvals."
      }
    ]
  },
  {
    "code": "REALESTATE_071",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use lease renewal history or repeated leases."
      },
      {
        "hint_order": 2,
        "content": "Group by tenant and property."
      },
      {
        "hint_order": 3,
        "content": "Keep pairs with more than one lease."
      }
    ]
  },
  {
    "code": "REALESTATE_072",
    "hints": [
      {
        "hint_order": 1,
        "content": "Offers are tied to listings and seekers."
      },
      {
        "hint_order": 2,
        "content": "Count offers per seeker_user_id."
      },
      {
        "hint_order": 3,
        "content": "Use HAVING COUNT(*) > 2."
      }
    ]
  },
  {
    "code": "REALESTATE_073",
    "hints": [
      {
        "hint_order": 1,
        "content": "Track status changes in listing_status_history."
      },
      {
        "hint_order": 2,
        "content": "Group by listing_id."
      },
      {
        "hint_order": 3,
        "content": "Count history rows and sort descending."
      }
    ]
  },
  {
    "code": "REALESTATE_074",
    "hints": [
      {
        "hint_order": 1,
        "content": "Join referrals with users if needed."
      },
      {
        "hint_order": 2,
        "content": "Sum rewards by referrer."
      },
      {
        "hint_order": 3,
        "content": "GROUP BY referrer_user_id and SUM reward_amount."
      }
    ]
  },
  {
    "code": "REALESTATE_075",
    "hints": [
      {
        "hint_order": 1,
        "content": "Join leases with rent payments."
      },
      {
        "hint_order": 2,
        "content": "Compare due and paid amounts."
      },
      {
        "hint_order": 3,
        "content": "SUM(amount_due - amount_paid) by lease_id."
      }
    ]
  },
  {
    "code": "REALESTATE_076",
    "hints": [
      {
        "hint_order": 1,
        "content": "Amenities are many-to-many."
      },
      {
        "hint_order": 2,
        "content": "Join property_amenities with amenities."
      },
      {
        "hint_order": 3,
        "content": "Group by amenity_name and count properties."
      }
    ]
  },
  {
    "code": "REALESTATE_077",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use inquiries only."
      },
      {
        "hint_order": 2,
        "content": "Group by seeker_user_id."
      },
      {
        "hint_order": 3,
        "content": "Keep users with inquiries on more than 5 listings."
      }
    ]
  },
  {
    "code": "REALESTATE_078",
    "hints": [
      {
        "hint_order": 1,
        "content": "Properties belong to cities through locations."
      },
      {
        "hint_order": 2,
        "content": "Join properties to locations."
      },
      {
        "hint_order": 3,
        "content": "Count properties per city and sort descending."
      }
    ]
  },
  {
    "code": "REALESTATE_079",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use owner_profiles and listings together."
      },
      {
        "hint_order": 2,
        "content": "Find verified owners with live listings."
      },
      {
        "hint_order": 3,
        "content": "Join and group by owner id."
      }
    ]
  },
  {
    "code": "REALESTATE_080",
    "hints": [
      {
        "hint_order": 1,
        "content": "Applications belong to seekers."
      },
      {
        "hint_order": 2,
        "content": "Count pending applications per seeker."
      },
      {
        "hint_order": 3,
        "content": "Filter pending status then group."
      }
    ]
  },
  {
    "code": "REALESTATE_081",
    "hints": [
      {
        "hint_order": 1,
        "content": "Maintenance cost needs city info."
      },
      {
        "hint_order": 2,
        "content": "Join tickets -> properties -> locations."
      },
      {
        "hint_order": 3,
        "content": "Group by city and SUM resolution_cost."
      }
    ]
  },
  {
    "code": "REALESTATE_082",
    "hints": [
      {
        "hint_order": 1,
        "content": "Check listing mix per owner."
      },
      {
        "hint_order": 2,
        "content": "Count rent and sale separately."
      },
      {
        "hint_order": 3,
        "content": "Use FILTER or CASE in HAVING."
      }
    ]
  },
  {
    "code": "REALESTATE_083",
    "hints": [
      {
        "hint_order": 1,
        "content": "Count completed visits per listing."
      },
      {
        "hint_order": 2,
        "content": "Exclude listings that already have offers."
      },
      {
        "hint_order": 3,
        "content": "Use LEFT JOIN offers and HAVING COUNT(offer_id)=0."
      }
    ]
  },
  {
    "code": "REALESTATE_084",
    "hints": [
      {
        "hint_order": 1,
        "content": "Late fee means a positive value."
      },
      {
        "hint_order": 2,
        "content": "Group by tenant_user_id."
      },
      {
        "hint_order": 3,
        "content": "Keep tenants with count greater than 1."
      }
    ]
  },
  {
    "code": "REALESTATE_085",
    "hints": [
      {
        "hint_order": 1,
        "content": "Rent per sqft needs area and rent."
      },
      {
        "hint_order": 2,
        "content": "Join listings with properties and locations."
      },
      {
        "hint_order": 3,
        "content": "AVG(rent_amount / built_up_area_sqft) by locality."
      }
    ]
  },
  {
    "code": "REALESTATE_086",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use listing_price_history."
      },
      {
        "hint_order": 2,
        "content": "A drop means new rent is lower."
      },
      {
        "hint_order": 3,
        "content": "Join listings and count drops per owner."
      }
    ]
  },
  {
    "code": "REALESTATE_087",
    "hints": [
      {
        "hint_order": 1,
        "content": "Applications without offers have NULL offer_id."
      },
      {
        "hint_order": 2,
        "content": "Return id, listing_id, seeker_user_id."
      },
      {
        "hint_order": 3,
        "content": "Use WHERE offer_id IS NULL."
      }
    ]
  },
  {
    "code": "REALESTATE_088",
    "hints": [
      {
        "hint_order": 1,
        "content": "Amenities are counted per property."
      },
      {
        "hint_order": 2,
        "content": "Then return distinct owners."
      },
      {
        "hint_order": 3,
        "content": "Group by property and HAVING COUNT(*) > 5."
      }
    ]
  },
  {
    "code": "REALESTATE_089",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare locality average with city average."
      },
      {
        "hint_order": 2,
        "content": "Use two aggregation levels."
      },
      {
        "hint_order": 3,
        "content": "CTE or subquery join works best."
      }
    ]
  },
  {
    "code": "REALESTATE_090",
    "hints": [
      {
        "hint_order": 1,
        "content": "This is a funnel: inquiry → visit → offer → lease."
      },
      {
        "hint_order": 2,
        "content": "Join all stages on listing and seeker."
      },
      {
        "hint_order": 3,
        "content": "Return DISTINCT seeker_user_id."
      }
    ]
  },
  {
    "code": "REALESTATE_091",
    "hints": [
      {
        "hint_order": 1,
        "content": "Maintenance cost grouped by city."
      },
      {
        "hint_order": 2,
        "content": "Join tickets to locations through properties."
      },
      {
        "hint_order": 3,
        "content": "SUM resolution_cost per city."
      }
    ]
  },
  {
    "code": "REALESTATE_092",
    "hints": [
      {
        "hint_order": 1,
        "content": "Owner should have rent listings only."
      },
      {
        "hint_order": 2,
        "content": "Count rent and sale separately."
      },
      {
        "hint_order": 3,
        "content": "HAVING rent_count > 0 AND sale_count = 0."
      }
    ]
  },
  {
    "code": "REALESTATE_093",
    "hints": [
      {
        "hint_order": 1,
        "content": "Find repeated tenant-property pairs."
      },
      {
        "hint_order": 2,
        "content": "Group by property_id and tenant_user_id."
      },
      {
        "hint_order": 3,
        "content": "HAVING COUNT(*) > 1."
      }
    ]
  },
  {
    "code": "REALESTATE_094",
    "hints": [
      {
        "hint_order": 1,
        "content": "Compare completed visits vs inquiries."
      },
      {
        "hint_order": 2,
        "content": "Use DISTINCT counts after joins."
      },
      {
        "hint_order": 3,
        "content": "HAVING completed_visit_count > inquiry_count."
      }
    ]
  },
  {
    "code": "REALESTATE_095",
    "hints": [
      {
        "hint_order": 1,
        "content": "Under review applications older than 7 days."
      },
      {
        "hint_order": 2,
        "content": "Use created_at with interval comparison."
      },
      {
        "hint_order": 3,
        "content": "created_at < NOW() - INTERVAL '7 days'."
      }
    ]
  },
  {
    "code": "REALESTATE_096",
    "hints": [
      {
        "hint_order": 1,
        "content": "Converted listing means inquiry plus active lease."
      },
      {
        "hint_order": 2,
        "content": "Count distinct listings per owner."
      },
      {
        "hint_order": 3,
        "content": "HAVING converted count > 1."
      }
    ]
  },
  {
    "code": "REALESTATE_097",
    "hints": [
      {
        "hint_order": 1,
        "content": "Rewards are in referrals."
      },
      {
        "hint_order": 2,
        "content": "Group by referrer_user_id."
      },
      {
        "hint_order": 3,
        "content": "SUM reward_amount."
      }
    ]
  },
  {
    "code": "REALESTATE_098",
    "hints": [
      {
        "hint_order": 1,
        "content": "Overdue amount = amount_due - amount_paid."
      },
      {
        "hint_order": 2,
        "content": "Bring city through leases and properties."
      },
      {
        "hint_order": 3,
        "content": "Group by city for overdue payments."
      }
    ]
  },
  {
    "code": "REALESTATE_099",
    "hints": [
      {
        "hint_order": 1,
        "content": "Start with live listings only."
      },
      {
        "hint_order": 2,
        "content": "Join listing_status_history."
      },
      {
        "hint_order": 3,
        "content": "Count history rows per owner."
      }
    ]
  },
  {
    "code": "REALESTATE_100",
    "hints": [
      {
        "hint_order": 1,
        "content": "Use paid and partial rent payments."
      },
      {
        "hint_order": 2,
        "content": "Join payments with leases."
      },
      {
        "hint_order": 3,
        "content": "SUM amount_paid per property."
      }
    ]
  }
];

export const conceptFilters = [
  {
    "code": "REALESTATE_001",
    "concepts": [
      "aggregation",
      "count"
    ]
  },
  {
    "code": "REALESTATE_002",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_003",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_004",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_005",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_006",
    "concepts": [
      "filtering",
      "null_handling",
      "sorting",
      "limit",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_007",
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
    "code": "REALESTATE_008",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_009",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_010",
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
    "code": "REALESTATE_011",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_012",
    "concepts": [
      "filtering",
      "null_handling",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_013",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_014",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_015",
    "concepts": [
      "left_join",
      "joins",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_016",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "REALESTATE_017",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_018",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_019",
    "concepts": [
      "left_join",
      "joins",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_020",
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
    "code": "REALESTATE_021",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_022",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_023",
    "concepts": [
      "filtering",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_024",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_025",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_026",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_027",
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
    "code": "REALESTATE_028",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_029",
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
    "code": "REALESTATE_030",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting",
      "limit"
    ]
  },
  {
    "code": "REALESTATE_031",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_032",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_033",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_034",
    "concepts": [
      "filtering",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_035",
    "concepts": [
      "filtering",
      "null_handling",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_036",
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
    "code": "REALESTATE_037",
    "concepts": [
      "aggregation",
      "sum",
      "null_handling",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_038",
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
    "code": "REALESTATE_039",
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
    "code": "REALESTATE_040",
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
    "code": "REALESTATE_041",
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
    "code": "REALESTATE_042",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_043",
    "concepts": [
      "left_join",
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_044",
    "concepts": [
      "filtering",
      "null_handling",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_045",
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
    "code": "REALESTATE_046",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_047",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "arithmetic",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_048",
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
    "code": "REALESTATE_049",
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
    "code": "REALESTATE_050",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_051",
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
    "code": "REALESTATE_052",
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
    "code": "REALESTATE_053",
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
    "code": "REALESTATE_054",
    "concepts": [
      "aggregation",
      "sum",
      "null_handling",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_055",
    "concepts": [
      "filtering",
      "null_handling",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_056",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_057",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_058",
    "concepts": [
      "left_join",
      "joins",
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
    "code": "REALESTATE_059",
    "concepts": [
      "joins",
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
    "code": "REALESTATE_060",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_061",
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
    "code": "REALESTATE_062",
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
    "code": "REALESTATE_063",
    "concepts": [
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_064",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_065",
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
    "code": "REALESTATE_066",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_067",
    "concepts": [
      "left_join",
      "joins",
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
    "code": "REALESTATE_068",
    "concepts": [
      "joins",
      "filtering",
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_069",
    "concepts": [
      "joins",
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
    "code": "REALESTATE_070",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_071",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_072",
    "concepts": [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_073",
    "concepts": [
      "exists",
      "subquery",
      "filtering",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_074",
    "concepts": [
      "subquery",
      "filtering",
      "aggregation",
      "average",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_075",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_076",
    "concepts": [
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_077",
    "concepts": [
      "filtering",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_078",
    "concepts": [
      "joins",
      "filtering",
      "distinct",
      "date_functions",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_079",
    "concepts": [
      "subquery",
      "joins",
      "filtering",
      "aggregation",
      "average",
      "sorting",
      "comparison",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_080",
    "concepts": [
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_081",
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
    "code": "REALESTATE_082",
    "concepts": [
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_083",
    "concepts": [
      "left_join",
      "joins",
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
    "code": "REALESTATE_084",
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
    "code": "REALESTATE_085",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "average",
      "group_by",
      "sorting",
      "arithmetic",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_086",
    "concepts": [
      "joins",
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
    "code": "REALESTATE_087",
    "concepts": [
      "filtering",
      "null_handling",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_088",
    "concepts": [
      "joins",
      "aggregation",
      "count",
      "group_by",
      "having",
      "distinct",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_089",
    "concepts": [
      "subquery",
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
    "code": "REALESTATE_090",
    "concepts": [
      "joins",
      "filtering",
      "distinct",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_091",
    "concepts": [
      "joins",
      "aggregation",
      "sum",
      "null_handling",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_092",
    "concepts": [
      "conditional_aggregation",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_093",
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
    "code": "REALESTATE_094",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_095",
    "concepts": [
      "filtering",
      "date_functions",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_096",
    "concepts": [
      "joins",
      "aggregation",
      "count_distinct",
      "group_by",
      "having",
      "sorting",
      "comparison"
    ]
  },
  {
    "code": "REALESTATE_097",
    "concepts": [
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_098",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "arithmetic",
      "calculation"
    ]
  },
  {
    "code": "REALESTATE_099",
    "concepts": [
      "left_join",
      "joins",
      "filtering",
      "aggregation",
      "count",
      "group_by",
      "sorting"
    ]
  },
  {
    "code": "REALESTATE_100",
    "concepts": [
      "joins",
      "filtering",
      "aggregation",
      "sum",
      "group_by",
      "sorting",
      "calculation"
    ]
  }
];

export const solutions = [
  {
    "code": "REALESTATE_001",
    "approaches": [
      {
        "approach_title": "Count users",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS total_users FROM users;",
        "explanation": "## Approach\n\nCount all rows in `users`.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- Each row in `users` represents one platform user.\n- `COUNT(*)` returns the total row count.\n- The alias matches the expected output column.\n\n## Why this is optimal\n\nThis is the shortest and clearest way to count all users."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(id) AS total_users FROM users;",
        "explanation": "## Approach\n\nCount the primary key values.\n\n## Query\n\n```sql\nSELECT COUNT(id) AS total_users\nFROM users;\n```\n\n## Explanation\n\n- `COUNT(id)` counts non-NULL ids.\n- Since `id` is a primary key, it is never NULL.\n- So this returns the same result.\n\n## Difference from the optimal approach\n\nIt works, but `COUNT(*)` is more direct for counting rows."
      },
      {
        "approach_title": "CTE count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;",
        "explanation": "## Approach\n\nCompute the count in a CTE, then return it.\n\n## Query\n\n```sql\nWITH user_count AS (\n  SELECT COUNT(*) AS total_users\n  FROM users\n)\nSELECT total_users\nFROM user_count;\n```\n\n## Explanation\n\n- The CTE calculates the total first.\n- The outer query selects that value.\n- This pattern is useful when the query may grow later.\n\n## Difference from the optimal approach\n\nMore verbose, but easier to extend."
      }
    ]
  },
  {
    "code": "REALESTATE_002",
    "approaches": [
      {
        "approach_title": "Filter and count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT COUNT(*) AS verified_owners FROM owner_profiles WHERE verification_status = 'verified';",
        "explanation": "## Approach\n\nKeep only verified owner profiles, then count them.\n\n## Query\n\n```sql\nSELECT COUNT(*) AS verified_owners\nFROM owner_profiles\nWHERE verification_status = 'verified';\n```\n\n## Explanation\n\n- `WHERE verification_status = 'verified'` filters the rows first.\n- `COUNT(*)` then counts those filtered rows.\n- The alias matches the expected output.\n\n## Why this is optimal\n\nIt is the most direct and readable way to count verified owners."
      },
      {
        "approach_title": "Filter count",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified_owners FROM owner_profiles;",
        "explanation": "## Approach\n\nUse `FILTER` inside the aggregate.\n\n## Query\n\n```sql\nSELECT COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified_owners\nFROM owner_profiles;\n```\n\n## Explanation\n\n- `FILTER` tells `COUNT(*)` which rows to include.\n- This is useful when calculating multiple conditional counts in one query.\n\n## Difference from the optimal approach\n\nFlexible, but less direct for a single metric."
      },
      {
        "approach_title": "Case sum",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT SUM(CASE WHEN verification_status = 'verified' THEN 1 ELSE 0 END) AS verified_owners FROM owner_profiles;",
        "explanation": "## Approach\n\nConvert matching rows into 1 and others into 0, then sum them.\n\n## Query\n\n```sql\nSELECT SUM(CASE WHEN verification_status = 'verified' THEN 1 ELSE 0 END) AS verified_owners\nFROM owner_profiles;\n```\n\n## Explanation\n\n- The `CASE` expression marks verified owners as 1.\n- All other rows become 0.\n- `SUM` adds them to get the count.\n\n## Difference from the optimal approach\n\nIt works well, but is more verbose than a simple `WHERE` filter."
      }
    ]
  },
  {
    "code": "REALESTATE_003",
    "approaches": [
      {
        "approach_title": "Filter live",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, listed_for FROM listings WHERE listing_status = 'live' ORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter to live listings and sort by id.\n\n## Query\n\n```sql\nSELECT id, property_id, listed_for\nFROM listings\nWHERE listing_status = 'live'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE listing_status = 'live'` keeps only live listings.\n- The selected columns match the required output.\n- `ORDER BY id ASC` ensures the expected ordering.\n\n## Why this is optimal\n\nIt is simple, direct, and matches the requirement exactly."
      },
      {
        "approach_title": "CTE filter",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH live_listings AS (\n  SELECT id, property_id, listed_for\n  FROM listings\n  WHERE listing_status = 'live'\n)\nSELECT id, property_id, listed_for\nFROM live_listings\nORDER BY id ASC;",
        "explanation": "## Approach\n\nPut live listings in a CTE, then return them.\n\n## Query\n\n```sql\nWITH live_listings AS (\n  SELECT id, property_id, listed_for\n  FROM listings\n  WHERE listing_status = 'live'\n)\nSELECT id, property_id, listed_for\nFROM live_listings\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the filtered dataset.\n- The outer query applies the final ordering.\n- This is useful when more logic may be added later.\n\n## Difference from the optimal approach\n\nMore verbose for the same result."
      },
      {
        "approach_title": "Case filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, listed_for FROM listings WHERE CASE WHEN listing_status = 'live' THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression inside the filter.\n\n## Query\n\n```sql\nSELECT id, property_id, listed_for\nFROM listings\nWHERE CASE WHEN listing_status = 'live' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for live listings.\n- The output and ordering remain the same.\n\n## Difference from the optimal approach\n\nIt works, but is unnecessarily complex compared with a plain `WHERE` condition."
      }
    ]
  },
  {
    "code": "REALESTATE_004",
    "approaches": [
      {
        "approach_title": "Filter gated",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_title, property_type FROM properties WHERE is_gated_community = true ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep only properties in gated communities.\n\n## Query\n\n```sql\nSELECT id, property_title, property_type\nFROM properties\nWHERE is_gated_community = true\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE is_gated_community = true` filters the rows.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` enforces the required order.\n\n## Why this is optimal\n\nIt is clear and easy for learners to understand."
      },
      {
        "approach_title": "Boolean shorthand",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, property_title, property_type FROM properties WHERE is_gated_community ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand.\n\n## Query\n\n```sql\nSELECT id, property_title, property_type\nFROM properties\nWHERE is_gated_community\nORDER BY id ASC;\n```\n\n## Explanation\n\n- In PostgreSQL, `WHERE is_gated_community` means the same as checking for true.\n- Only gated properties are returned.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is usually clearer in practice sets."
      },
      {
        "approach_title": "CTE gated",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH gated_properties AS (\n  SELECT id, property_title, property_type\n  FROM properties\n  WHERE is_gated_community = true\n)\nSELECT id, property_title, property_type\nFROM gated_properties\nORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter first in a CTE, then return the rows.\n\n## Query\n\n```sql\nWITH gated_properties AS (\n  SELECT id, property_title, property_type\n  FROM properties\n  WHERE is_gated_community = true\n)\nSELECT id, property_title, property_type\nFROM gated_properties\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE contains only gated properties.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nUseful as a building block, but more verbose here."
      }
    ]
  },
  {
    "code": "REALESTATE_005",
    "approaches": [
      {
        "approach_title": "Filter pets",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, rent_amount, preferred_tenant_type FROM listings WHERE listing_status = 'live' AND pet_allowed = true ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep only live listings where pets are allowed.\n\n## Query\n\n```sql\nSELECT id, rent_amount, preferred_tenant_type\nFROM listings\nWHERE listing_status = 'live'\n  AND pet_allowed = true\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The first condition keeps only live listings.\n- The second condition keeps only pet-friendly ones.\n- The query returns exactly the required columns in the correct order.\n\n## Why this is optimal\n\nIt is the simplest form of the required filtering logic."
      },
      {
        "approach_title": "Boolean pets",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, rent_amount, preferred_tenant_type FROM listings WHERE listing_status = 'live' AND pet_allowed ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse boolean shorthand for the pet condition.\n\n## Query\n\n```sql\nSELECT id, rent_amount, preferred_tenant_type\nFROM listings\nWHERE listing_status = 'live'\n  AND pet_allowed\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `pet_allowed` in the `WHERE` clause means it must be true.\n- This returns the same rows as the explicit comparison.\n\n## Difference from the optimal approach\n\nShorter, but a bit less explicit for beginners."
      },
      {
        "approach_title": "CTE pets",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH pet_listings AS (\n  SELECT id, rent_amount, preferred_tenant_type\n  FROM listings\n  WHERE listing_status = 'live'\n    AND pet_allowed = true\n)\nSELECT id, rent_amount, preferred_tenant_type\nFROM pet_listings\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore the filtered result in a CTE, then select from it.\n\n## Query\n\n```sql\nWITH pet_listings AS (\n  SELECT id, rent_amount, preferred_tenant_type\n  FROM listings\n  WHERE listing_status = 'live'\n    AND pet_allowed = true\n)\nSELECT id, rent_amount, preferred_tenant_type\nFROM pet_listings\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the filtered listings.\n- The outer query returns them in the expected order.\n\n## Difference from the optimal approach\n\nUseful for extension, but longer than needed."
      }
    ]
  },
  {
    "code": "REALESTATE_006",
    "approaches": [
      {
        "approach_title": "Sort and limit",
        "approach_type": "sorting",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, rent_amount FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount IS NOT NULL ORDER BY rent_amount DESC, id ASC LIMIT 5;",
        "explanation": "## Approach\n\nFilter to live rental listings, sort by highest rent, then keep the top 5.\n\n## Query\n\n```sql\nSELECT id, property_id, rent_amount\nFROM listings\nWHERE listing_status = 'live'\n  AND listed_for = 'rent'\n  AND rent_amount IS NOT NULL\nORDER BY rent_amount DESC, id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The `WHERE` clause keeps only live rental listings with a rent value.\n- `ORDER BY rent_amount DESC` puts the most expensive listings first.\n- `id ASC` breaks ties consistently.\n- `LIMIT 5` returns only the top 5 rows.\n\n## Why this is optimal\n\nThis is the most direct way to solve a top-N sorting problem."
      },
      {
        "approach_title": "CTE top 5",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH ranked_listings AS (\n  SELECT id, property_id, rent_amount\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'rent'\n    AND rent_amount IS NOT NULL\n  ORDER BY rent_amount DESC, id ASC\n  LIMIT 5\n)\nSELECT id, property_id, rent_amount\nFROM ranked_listings\nORDER BY rent_amount DESC, id ASC;",
        "explanation": "## Approach\n\nGet the top 5 rows in a CTE and then return them.\n\n## Query\n\n```sql\nWITH ranked_listings AS (\n  SELECT id, property_id, rent_amount\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'rent'\n    AND rent_amount IS NOT NULL\n  ORDER BY rent_amount DESC, id ASC\n  LIMIT 5\n)\nSELECT id, property_id, rent_amount\nFROM ranked_listings\nORDER BY rent_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE computes the top 5 rows first.\n- The outer query returns them in the same order.\n\n## Difference from the optimal approach\n\nThis adds an extra layer without changing the result."
      },
      {
        "approach_title": "Row number",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, rent_amount FROM (SELECT id, property_id, rent_amount, ROW_NUMBER() OVER (ORDER BY rent_amount DESC, id ASC) AS rn FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount IS NOT NULL) x WHERE rn <= 5 ORDER BY rent_amount DESC, id ASC;",
        "explanation": "## Approach\n\nAssign row numbers after sorting, then keep the first 5.\n\n## Query\n\n```sql\nSELECT id, property_id, rent_amount\nFROM (\n  SELECT id, property_id, rent_amount,\n         ROW_NUMBER() OVER (ORDER BY rent_amount DESC, id ASC) AS rn\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'rent'\n    AND rent_amount IS NOT NULL\n) x\nWHERE rn <= 5\nORDER BY rent_amount DESC, id ASC;\n```\n\n## Explanation\n\n- `ROW_NUMBER()` assigns a sequence based on the sort order.\n- The outer query keeps only the first 5 rows.\n- This is useful when you want top-N logic with more advanced window patterns.\n\n## Difference from the optimal approach\n\nMore flexible, but more complex than necessary here."
      }
    ]
  },
  {
    "code": "REALESTATE_007",
    "approaches": [
      {
        "approach_title": "Group by source",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;",
        "explanation": "## Approach\n\nGroup users by signup source and count rows in each group.\n\n## Query\n\n```sql\nSELECT signup_source, COUNT(*) AS user_count\nFROM users\nWHERE signup_source IS NOT NULL\nGROUP BY signup_source\nORDER BY user_count DESC, signup_source ASC;\n```\n\n## Explanation\n\n- `WHERE signup_source IS NOT NULL` removes rows without a source.\n- `GROUP BY signup_source` creates one group per source.\n- `COUNT(*)` counts users in each group.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt is the standard and clearest way to produce grouped counts."
      },
      {
        "approach_title": "CTE group",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH source_counts AS (\n  SELECT signup_source, COUNT(*) AS user_count\n  FROM users\n  WHERE signup_source IS NOT NULL\n  GROUP BY signup_source\n)\nSELECT signup_source, user_count\nFROM source_counts\nORDER BY user_count DESC, signup_source ASC;",
        "explanation": "## Approach\n\nCalculate grouped counts in a CTE, then sort in the outer query.\n\n## Query\n\n```sql\nWITH source_counts AS (\n  SELECT signup_source, COUNT(*) AS user_count\n  FROM users\n  WHERE signup_source IS NOT NULL\n  GROUP BY signup_source\n)\nSELECT signup_source, user_count\nFROM source_counts\nORDER BY user_count DESC, signup_source ASC;\n```\n\n## Explanation\n\n- The CTE stores the count for each signup source.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nSlightly longer, but easier to extend."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT signup_source, COUNT(id) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;",
        "explanation": "## Approach\n\nCount the user ids inside each signup source group.\n\n## Query\n\n```sql\nSELECT signup_source, COUNT(id) AS user_count\nFROM users\nWHERE signup_source IS NOT NULL\nGROUP BY signup_source\nORDER BY user_count DESC, signup_source ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` works because `id` is never NULL.\n- Grouping and ordering behave the same as the optimal solution.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is the more natural form for counting rows."
      }
    ]
  },
  {
    "code": "REALESTATE_008",
    "approaches": [
      {
        "approach_title": "Group by type",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT property_type, COUNT(*) AS property_count FROM properties GROUP BY property_type ORDER BY property_count DESC, property_type ASC;",
        "explanation": "## Approach\n\nGroup properties by type and count rows in each group.\n\n## Query\n\n```sql\nSELECT property_type, COUNT(*) AS property_count\nFROM properties\nGROUP BY property_type\nORDER BY property_count DESC, property_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY property_type` creates one group for each property type.\n- `COUNT(*)` counts how many properties belong to each type.\n- The ordering sorts larger groups first.\n\n## Why this is optimal\n\nIt is the standard grouped aggregation solution."
      },
      {
        "approach_title": "CTE type count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH type_counts AS (\n  SELECT property_type, COUNT(*) AS property_count\n  FROM properties\n  GROUP BY property_type\n)\nSELECT property_type, property_count\nFROM type_counts\nORDER BY property_count DESC, property_type ASC;",
        "explanation": "## Approach\n\nFirst calculate counts by type, then return them.\n\n## Query\n\n```sql\nWITH type_counts AS (\n  SELECT property_type, COUNT(*) AS property_count\n  FROM properties\n  GROUP BY property_type\n)\nSELECT property_type, property_count\nFROM type_counts\nORDER BY property_count DESC, property_type ASC;\n```\n\n## Explanation\n\n- The CTE stores the grouped counts.\n- The outer query handles the presentation order.\n\n## Difference from the optimal approach\n\nUseful for layering logic, but longer than necessary."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT property_type, COUNT(id) AS property_count FROM properties GROUP BY property_type ORDER BY property_count DESC, property_type ASC;",
        "explanation": "## Approach\n\nCount primary keys within each property type.\n\n## Query\n\n```sql\nSELECT property_type, COUNT(id) AS property_count\nFROM properties\nGROUP BY property_type\nORDER BY property_count DESC, property_type ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` returns the same result because `id` is never NULL.\n- The grouping logic is unchanged.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is still the cleaner row-counting style."
      }
    ]
  },
  {
    "code": "REALESTATE_009",
    "approaches": [
      {
        "approach_title": "Join and count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, COUNT(*) AS listing_count FROM listings l JOIN properties p ON p.id = l.property_id JOIN locations loc ON loc.id = p.location_id GROUP BY loc.city ORDER BY listing_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin listings to properties and locations, then count listings per city.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(*) AS listing_count\nFROM listings l\nJOIN properties p ON p.id = l.property_id\nJOIN locations loc ON loc.id = p.location_id\nGROUP BY loc.city\nORDER BY listing_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- `listings` links to `properties` through `property_id`.\n- `properties` links to `locations` through `location_id`.\n- After the joins, each listing is associated with a city.\n- `GROUP BY loc.city` counts listings city-wise.\n\n## Why this is optimal\n\nIt directly follows the relationship path in the schema and keeps the query readable."
      },
      {
        "approach_title": "CTE city count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_cities AS (\n  SELECT loc.city\n  FROM listings l\n  JOIN properties p ON p.id = l.property_id\n  JOIN locations loc ON loc.id = p.location_id\n)\nSELECT city, COUNT(*) AS listing_count\nFROM listing_cities\nGROUP BY city\nORDER BY listing_count DESC, city ASC;",
        "explanation": "## Approach\n\nFirst map each listing to a city, then aggregate.\n\n## Query\n\n```sql\nWITH listing_cities AS (\n  SELECT loc.city\n  FROM listings l\n  JOIN properties p ON p.id = l.property_id\n  JOIN locations loc ON loc.id = p.location_id\n)\nSELECT city, COUNT(*) AS listing_count\nFROM listing_cities\nGROUP BY city\nORDER BY listing_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE builds a city-level listing dataset.\n- The outer query counts the number of rows per city.\n\n## Difference from the optimal approach\n\nClear structure, but adds an unnecessary layer for this task."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, COUNT(l.id) AS listing_count FROM listings l JOIN properties p ON p.id = l.property_id JOIN locations loc ON loc.id = p.location_id GROUP BY loc.city ORDER BY listing_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nCount listing ids after joining tables.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(l.id) AS listing_count\nFROM listings l\nJOIN properties p ON p.id = l.property_id\nJOIN locations loc ON loc.id = p.location_id\nGROUP BY loc.city\nORDER BY listing_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- `COUNT(l.id)` counts listings in each city.\n- Since `l.id` is never NULL, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nWorks the same, but `COUNT(*)` is slightly more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_010",
    "approaches": [
      {
        "approach_title": "Group and having",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT op.id, op.user_id, COUNT(p.id) AS property_count FROM owner_profiles op JOIN properties p ON p.owner_profile_id = op.id GROUP BY op.id, op.user_id HAVING COUNT(p.id) > 3 ORDER BY property_count DESC, op.id ASC;",
        "explanation": "## Approach\n\nJoin owners to properties, count properties per owner, then keep only owners with more than 3.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id, COUNT(p.id) AS property_count\nFROM owner_profiles op\nJOIN properties p ON p.owner_profile_id = op.id\nGROUP BY op.id, op.user_id\nHAVING COUNT(p.id) > 3\nORDER BY property_count DESC, op.id ASC;\n```\n\n## Explanation\n\n- The join connects each owner to their properties.\n- `GROUP BY op.id, op.user_id` creates one group per owner.\n- `COUNT(p.id)` counts how many properties each owner has.\n- `HAVING COUNT(p.id) > 3` keeps only owners above the threshold.\n- The final `ORDER BY` matches the expected sort.\n\n## Why this is optimal\n\nIt cleanly combines join, aggregation, filtering on groups, and ordering."
      },
      {
        "approach_title": "CTE owners",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_property_counts AS (\n  SELECT op.id, op.user_id, COUNT(p.id) AS property_count\n  FROM owner_profiles op\n  JOIN properties p ON p.owner_profile_id = op.id\n  GROUP BY op.id, op.user_id\n)\nSELECT id, user_id, property_count\nFROM owner_property_counts\nWHERE property_count > 3\nORDER BY property_count DESC, id ASC;",
        "explanation": "## Approach\n\nCompute each owner's property count first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH owner_property_counts AS (\n  SELECT op.id, op.user_id, COUNT(p.id) AS property_count\n  FROM owner_profiles op\n  JOIN properties p ON p.owner_profile_id = op.id\n  GROUP BY op.id, op.user_id\n)\nSELECT id, user_id, property_count\nFROM owner_property_counts\nWHERE property_count > 3\nORDER BY property_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE calculates the property count per owner.\n- The outer query filters owners with more than 3 properties.\n- This is helpful when you want to reuse `property_count` later.\n\n## Difference from the optimal approach\n\nMore modular, but longer than using `HAVING` directly."
      },
      {
        "approach_title": "Subquery count",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, user_id, property_count FROM (SELECT op.id, op.user_id, COUNT(p.id) AS property_count FROM owner_profiles op JOIN properties p ON p.owner_profile_id = op.id GROUP BY op.id, op.user_id) x WHERE property_count > 3 ORDER BY property_count DESC, id ASC;",
        "explanation": "## Approach\n\nCalculate grouped counts in a subquery, then filter outside.\n\n## Query\n\n```sql\nSELECT id, user_id, property_count\nFROM (\n  SELECT op.id, op.user_id, COUNT(p.id) AS property_count\n  FROM owner_profiles op\n  JOIN properties p ON p.owner_profile_id = op.id\n  GROUP BY op.id, op.user_id\n) x\nWHERE property_count > 3\nORDER BY property_count DESC, id ASC;\n```\n\n## Explanation\n\n- The subquery returns each owner with their property count.\n- The outer query filters the grouped result.\n- The final ordering matches the expected output.\n\n## Difference from the optimal approach\n\nValid, but less clean than using `HAVING` in one query."
      }
    ]
  },
  {
    "code": "REALESTATE_011",
    "approaches": [
      {
        "approach_title": "Filter pending",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, owner_profile_id, assigned_executive_user_id FROM owner_verification_requests WHERE request_status = 'pending' ORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter owner verification requests to only pending ones.\n\n## Query\n\n```sql\nSELECT id, owner_profile_id, assigned_executive_user_id\nFROM owner_verification_requests\nWHERE request_status = 'pending'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE request_status = 'pending'` keeps only pending requests.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` ensures the required ordering.\n\n## Why this is optimal\n\nIt is the most direct and readable way to return pending verification requests."
      },
      {
        "approach_title": "CTE pending",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH pending_requests AS (\n  SELECT id, owner_profile_id, assigned_executive_user_id\n  FROM owner_verification_requests\n  WHERE request_status = 'pending'\n)\nSELECT id, owner_profile_id, assigned_executive_user_id\nFROM pending_requests\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore pending requests in a CTE, then return them.\n\n## Query\n\n```sql\nWITH pending_requests AS (\n  SELECT id, owner_profile_id, assigned_executive_user_id\n  FROM owner_verification_requests\n  WHERE request_status = 'pending'\n)\nSELECT id, owner_profile_id, assigned_executive_user_id\nFROM pending_requests\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the filtered rows.\n- The outer query applies the final sort.\n- This structure is useful when adding more logic later.\n\n## Difference from the optimal approach\n\nIt produces the same result, but with more code."
      },
      {
        "approach_title": "Case filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, owner_profile_id, assigned_executive_user_id FROM owner_verification_requests WHERE CASE WHEN request_status = 'pending' THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression to keep only pending requests.\n\n## Query\n\n```sql\nSELECT id, owner_profile_id, assigned_executive_user_id\nFROM owner_verification_requests\nWHERE CASE WHEN request_status = 'pending' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for pending rows.\n- The final result matches the required output.\n\n## Difference from the optimal approach\n\nThis works, but it is less clear than a normal `WHERE` condition."
      }
    ]
  },
  {
    "code": "REALESTATE_012",
    "approaches": [
      {
        "approach_title": "Expired docs",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, user_id, document_type, expires_at FROM user_documents WHERE expires_at IS NOT NULL AND expires_at < NOW() ORDER BY expires_at ASC, id ASC;",
        "explanation": "## Approach\n\nKeep only documents with a non-null expiry date that is already in the past.\n\n## Query\n\n```sql\nSELECT id, user_id, document_type, expires_at\nFROM user_documents\nWHERE expires_at IS NOT NULL\n  AND expires_at < NOW()\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- `expires_at IS NOT NULL` removes documents without an expiry date.\n- `expires_at < NOW()` keeps only expired documents.\n- Sorting by `expires_at ASC, id ASC` matches the expected output order.\n\n## Why this is optimal\n\nIt directly expresses the expiry logic and ordering."
      },
      {
        "approach_title": "CTE expired",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH expired_docs AS (\n  SELECT id, user_id, document_type, expires_at\n  FROM user_documents\n  WHERE expires_at IS NOT NULL\n    AND expires_at < NOW()\n)\nSELECT id, user_id, document_type, expires_at\nFROM expired_docs\nORDER BY expires_at ASC, id ASC;",
        "explanation": "## Approach\n\nBuild the expired document set in a CTE, then return it.\n\n## Query\n\n```sql\nWITH expired_docs AS (\n  SELECT id, user_id, document_type, expires_at\n  FROM user_documents\n  WHERE expires_at IS NOT NULL\n    AND expires_at < NOW()\n)\nSELECT id, user_id, document_type, expires_at\nFROM expired_docs\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE defines the expired documents first.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nUseful as a reusable building block, but longer."
      },
      {
        "approach_title": "Current timestamp",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, user_id, document_type, expires_at FROM user_documents WHERE expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP ORDER BY expires_at ASC, id ASC;",
        "explanation": "## Approach\n\nCompare the expiry date against `CURRENT_TIMESTAMP`.\n\n## Query\n\n```sql\nSELECT id, user_id, document_type, expires_at\nFROM user_documents\nWHERE expires_at IS NOT NULL\n  AND expires_at < CURRENT_TIMESTAMP\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- `CURRENT_TIMESTAMP` is equivalent in meaning here.\n- The filter still returns already expired documents.\n\n## Difference from the optimal approach\n\nIt works the same, but `NOW()` is slightly shorter."
      }
    ]
  },
  {
    "code": "REALESTATE_013",
    "approaches": [
      {
        "approach_title": "Filter vacant",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, listed_for FROM listings WHERE listing_status = 'live' AND availability_status = 'available' ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep only live listings that are currently available.\n\n## Query\n\n```sql\nSELECT id, property_id, listed_for\nFROM listings\nWHERE listing_status = 'live'\n  AND availability_status = 'available'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `listing_status = 'live'` keeps live listings only.\n- `availability_status = 'available'` keeps currently available ones.\n- The required columns are selected and ordered by id.\n\n## Why this is optimal\n\nIt maps directly to the business rule with a simple filter."
      },
      {
        "approach_title": "CTE vacant",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH vacant_listings AS (\n  SELECT id, property_id, listed_for\n  FROM listings\n  WHERE listing_status = 'live'\n    AND availability_status = 'available'\n)\nSELECT id, property_id, listed_for\nFROM vacant_listings\nORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter the matching listings in a CTE, then return them.\n\n## Query\n\n```sql\nWITH vacant_listings AS (\n  SELECT id, property_id, listed_for\n  FROM listings\n  WHERE listing_status = 'live'\n    AND availability_status = 'available'\n)\nSELECT id, property_id, listed_for\nFROM vacant_listings\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE stores the filtered listing set.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nIt is more verbose for the same result."
      },
      {
        "approach_title": "Case filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, listed_for FROM listings WHERE CASE WHEN listing_status = 'live' AND availability_status = 'available' THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression for the combined filter condition.\n\n## Query\n\n```sql\nSELECT id, property_id, listed_for\nFROM listings\nWHERE CASE WHEN listing_status = 'live' AND availability_status = 'available' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for matching rows.\n- The final result is the same as the direct filter.\n\n## Difference from the optimal approach\n\nIt works, but it is harder to read than a plain `WHERE` clause."
      }
    ]
  },
  {
    "code": "REALESTATE_014",
    "approaches": [
      {
        "approach_title": "Join and group",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.city, COUNT(*) AS property_count FROM properties p JOIN locations l ON p.location_id = l.id GROUP BY l.city ORDER BY property_count DESC, l.city ASC;",
        "explanation": "## Approach\n\nJoin properties to locations, then count properties per city.\n\n## Query\n\n```sql\nSELECT l.city, COUNT(*) AS property_count\nFROM properties p\nJOIN locations l ON p.location_id = l.id\nGROUP BY l.city\nORDER BY property_count DESC, l.city ASC;\n```\n\n## Explanation\n\n- Each property points to a location through `location_id`.\n- After the join, each property is associated with a city.\n- `GROUP BY l.city` creates one group per city.\n- `COUNT(*)` returns the number of properties in each city.\n\n## Why this is optimal\n\nIt follows the schema relationships directly and is easy to understand."
      },
      {
        "approach_title": "CTE city count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH property_cities AS (\n  SELECT l.city\n  FROM properties p\n  JOIN locations l ON p.location_id = l.id\n)\nSELECT city, COUNT(*) AS property_count\nFROM property_cities\nGROUP BY city\nORDER BY property_count DESC, city ASC;",
        "explanation": "## Approach\n\nMap properties to cities in a CTE, then aggregate.\n\n## Query\n\n```sql\nWITH property_cities AS (\n  SELECT l.city\n  FROM properties p\n  JOIN locations l ON p.location_id = l.id\n)\nSELECT city, COUNT(*) AS property_count\nFROM property_cities\nGROUP BY city\nORDER BY property_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE creates a one-column dataset of property cities.\n- The outer query counts how many rows belong to each city.\n\n## Difference from the optimal approach\n\nThis is structured, but less direct."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.city, COUNT(p.id) AS property_count FROM properties p JOIN locations l ON p.location_id = l.id GROUP BY l.city ORDER BY property_count DESC, l.city ASC;",
        "explanation": "## Approach\n\nCount property ids after joining to locations.\n\n## Query\n\n```sql\nSELECT l.city, COUNT(p.id) AS property_count\nFROM properties p\nJOIN locations l ON p.location_id = l.id\nGROUP BY l.city\nORDER BY property_count DESC, l.city ASC;\n```\n\n## Explanation\n\n- `COUNT(p.id)` counts each property in the city group.\n- Since property ids are never NULL, this matches `COUNT(*)`.\n\n## Difference from the optimal approach\n\nCorrect, but slightly less direct than counting rows."
      }
    ]
  },
  {
    "code": "REALESTATE_015",
    "approaches": [
      {
        "approach_title": "Left join null",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id FROM listings l LEFT JOIN listing_media lm ON l.id = lm.listing_id WHERE lm.id IS NULL ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nLeft join listings to media, then keep rows where no media matched.\n\n## Query\n\n```sql\nSELECT l.id\nFROM listings l\nLEFT JOIN listing_media lm ON l.id = lm.listing_id\nWHERE lm.id IS NULL\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- A `LEFT JOIN` keeps all listings.\n- Listings without matching media rows get NULLs from `listing_media`.\n- `WHERE lm.id IS NULL` keeps only those listings.\n\n## Why this is optimal\n\nThis is the standard anti-join pattern for finding rows with no related records."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT l.id FROM listings l WHERE NOT EXISTS (SELECT 1 FROM listing_media lm WHERE lm.listing_id = l.id) ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nReturn listings where no media row exists.\n\n## Query\n\n```sql\nSELECT l.id\nFROM listings l\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM listing_media lm\n  WHERE lm.listing_id = l.id\n)\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- The subquery checks for media rows for each listing.\n- `NOT EXISTS` keeps only listings with no match.\n\n## Difference from the optimal approach\n\nAlso a strong solution, but a little less beginner-friendly than the left join pattern."
      },
      {
        "approach_title": "Not in",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id FROM listings WHERE id NOT IN (SELECT listing_id FROM listing_media) ORDER BY id ASC;",
        "explanation": "## Approach\n\nExclude listing ids that appear in `listing_media`.\n\n## Query\n\n```sql\nSELECT id\nFROM listings\nWHERE id NOT IN (\n  SELECT listing_id\n  FROM listing_media\n)\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The subquery returns listing ids that have media.\n- `NOT IN` keeps ids not present in that set.\n\n## Difference from the optimal approach\n\nIt can work here, but anti-joins with `LEFT JOIN ... IS NULL` or `NOT EXISTS` are usually safer patterns."
      }
    ]
  },
  {
    "code": "REALESTATE_016",
    "approaches": [
      {
        "approach_title": "Group sort limit",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS view_count FROM property_views GROUP BY listing_id ORDER BY view_count DESC, listing_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount views per listing, sort by highest count, then keep the top 5.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS view_count\nFROM property_views\nGROUP BY listing_id\nORDER BY view_count DESC, listing_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` counts the number of views in each group.\n- `ORDER BY view_count DESC` ranks the most viewed listings first.\n- `listing_id ASC` breaks ties consistently.\n- `LIMIT 5` returns exactly 5 rows.\n\n## Why this is optimal\n\nIt is the clearest and safest way to get exactly the top 5 listings."
      },
      {
        "approach_title": "CTE top views",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_views AS (\n  SELECT listing_id, COUNT(*) AS view_count\n  FROM property_views\n  GROUP BY listing_id\n)\nSELECT listing_id, view_count\nFROM listing_views\nORDER BY view_count DESC, listing_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCalculate grouped counts in a CTE, then sort and limit outside.\n\n## Query\n\n```sql\nWITH listing_views AS (\n  SELECT listing_id, COUNT(*) AS view_count\n  FROM property_views\n  GROUP BY listing_id\n)\nSELECT listing_id, view_count\nFROM listing_views\nORDER BY view_count DESC, listing_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per listing with its total view count.\n- The outer query applies the final ranking and keeps the first 5 rows.\n\n## Difference from the optimal approach\n\nIt is slightly longer, but useful if you want to extend the query later."
      },
      {
        "approach_title": "Row number",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT listing_id, view_count FROM (SELECT listing_id, COUNT(*) AS view_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, listing_id ASC) AS rn FROM property_views GROUP BY listing_id) x WHERE rn <= 5 ORDER BY view_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nAssign row numbers after aggregation, then keep the first 5 rows.\n\n## Query\n\n```sql\nSELECT listing_id, view_count\nFROM (\n  SELECT listing_id,\n         COUNT(*) AS view_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, listing_id ASC) AS rn\n  FROM property_views\n  GROUP BY listing_id\n) x\nWHERE rn <= 5\nORDER BY view_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The grouped query computes one view count per listing.\n- `ROW_NUMBER()` assigns a unique ranking based on view count and listing id.\n- `WHERE rn <= 5` guarantees exactly 5 rows.\n- This avoids the problem with `DENSE_RANK()`, which can return more than 5 rows when ties exist.\n\n## Difference from the optimal approach\n\nMore flexible for ranking patterns, but more complex than a simple `LIMIT` query."
      }
    ]
  },
  {
    "code": "REALESTATE_017",
    "approaches": [
      {
        "approach_title": "Group live owners",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT owner_profile_id, COUNT(*) AS live_listing_count FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id ORDER BY live_listing_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nKeep live listings only, then count them per owner.\n\n## Query\n\n```sql\nSELECT owner_profile_id, COUNT(*) AS live_listing_count\nFROM listings\nWHERE listing_status = 'live'\nGROUP BY owner_profile_id\nORDER BY live_listing_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- `WHERE listing_status = 'live'` filters to live listings.\n- `GROUP BY owner_profile_id` creates one group per owner.\n- `COUNT(*)` returns how many live listings each owner has.\n\n## Why this is optimal\n\nIt is the simplest way to answer the question using only the needed table."
      },
      {
        "approach_title": "Having positive",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT owner_profile_id, COUNT(*) AS live_listing_count FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) > 0 ORDER BY live_listing_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nGroup live listings by owner and explicitly keep only positive counts.\n\n## Query\n\n```sql\nSELECT owner_profile_id, COUNT(*) AS live_listing_count\nFROM listings\nWHERE listing_status = 'live'\nGROUP BY owner_profile_id\nHAVING COUNT(*) > 0\nORDER BY live_listing_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- Every grouped row already has at least one live listing.\n- The `HAVING` clause makes that explicit.\n\n## Difference from the optimal approach\n\nIt gives the same result, but the `HAVING` condition is unnecessary."
      },
      {
        "approach_title": "CTE owners",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH live_owner_counts AS (\n  SELECT owner_profile_id, COUNT(*) AS live_listing_count\n  FROM listings\n  WHERE listing_status = 'live'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, live_listing_count\nFROM live_owner_counts\nORDER BY live_listing_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute the counts in a CTE and return them.\n\n## Query\n\n```sql\nWITH live_owner_counts AS (\n  SELECT owner_profile_id, COUNT(*) AS live_listing_count\n  FROM listings\n  WHERE listing_status = 'live'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, live_listing_count\nFROM live_owner_counts\nORDER BY live_listing_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE contains one row per owner with their live listing count.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_018",
    "approaches": [
      {
        "approach_title": "Group visits",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS visit_count FROM property_visits GROUP BY listing_id ORDER BY visit_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount how many visit rows belong to each listing.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS visit_count\nFROM property_visits\nGROUP BY listing_id\nORDER BY visit_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` counts the number of visits in each group.\n- Sorting by `visit_count DESC` ranks the busiest listings first.\n\n## Why this is optimal\n\nIt directly solves the grouped counting requirement."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT listing_id, COUNT(id) AS visit_count FROM property_visits GROUP BY listing_id ORDER BY visit_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount visit ids in each listing group.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(id) AS visit_count\nFROM property_visits\nGROUP BY listing_id\nORDER BY visit_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- Since `id` is never NULL, `COUNT(id)` matches `COUNT(*)` here.\n- The grouping and ordering remain the same.\n\n## Difference from the optimal approach\n\nValid, but counting rows directly is slightly cleaner."
      },
      {
        "approach_title": "CTE visits",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH visit_counts AS (\n  SELECT listing_id, COUNT(*) AS visit_count\n  FROM property_visits\n  GROUP BY listing_id\n)\nSELECT listing_id, visit_count\nFROM visit_counts\nORDER BY visit_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCalculate visit counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH visit_counts AS (\n  SELECT listing_id, COUNT(*) AS visit_count\n  FROM property_visits\n  GROUP BY listing_id\n)\nSELECT listing_id, visit_count\nFROM visit_counts\nORDER BY visit_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE holds one row per listing.\n- The outer query handles display order.\n\n## Difference from the optimal approach\n\nHelpful for extension, but not necessary here."
      }
    ]
  },
  {
    "code": "REALESTATE_019",
    "approaches": [
      {
        "approach_title": "Left join null",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN properties p ON op.id = p.owner_profile_id WHERE p.id IS NULL ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nLeft join owner profiles to properties, then keep owners with no matching property.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nLEFT JOIN properties p ON op.id = p.owner_profile_id\nWHERE p.id IS NULL\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- A `LEFT JOIN` keeps every owner profile.\n- Owners without any property get NULLs from `properties`.\n- `WHERE p.id IS NULL` keeps only those owners.\n\n## Why this is optimal\n\nThis is the standard anti-join pattern and is very readable."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op WHERE NOT EXISTS (SELECT 1 FROM properties p WHERE p.owner_profile_id = op.id) ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nReturn owner profiles for which no property row exists.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM properties p\n  WHERE p.owner_profile_id = op.id\n)\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the owner has any property.\n- `NOT EXISTS` keeps only owners with no property rows.\n\n## Difference from the optimal approach\n\nAlso correct, but slightly less visual for beginners."
      },
      {
        "approach_title": "Not in",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, user_id FROM owner_profiles WHERE id NOT IN (SELECT owner_profile_id FROM properties) ORDER BY id ASC;",
        "explanation": "## Approach\n\nExclude owner ids that appear in the properties table.\n\n## Query\n\n```sql\nSELECT id, user_id\nFROM owner_profiles\nWHERE id NOT IN (\n  SELECT owner_profile_id\n  FROM properties\n)\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The subquery returns owner ids that have properties.\n- `NOT IN` keeps the owner ids that do not appear there.\n\n## Difference from the optimal approach\n\nIt works here, but anti-joins and `NOT EXISTS` are usually safer patterns."
      }
    ]
  },
  {
    "code": "REALESTATE_020",
    "approaches": [
      {
        "approach_title": "Join group limit",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.id, a.amenity_name ORDER BY property_count DESC, a.id ASC LIMIT 5;",
        "explanation": "## Approach\n\nJoin amenities to property mappings, count linked properties, then keep the top 5.\n\n## Query\n\n```sql\nSELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count\nFROM amenities a\nJOIN property_amenities pa ON a.id = pa.amenity_id\nGROUP BY a.id, a.amenity_name\nORDER BY property_count DESC, a.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The join connects each amenity to the properties that have it.\n- `GROUP BY a.id, a.amenity_name` creates one group per amenity.\n- `COUNT(pa.property_id)` counts how many property links each amenity has.\n- Sorting and limiting return the top 5 amenities.\n\n## Why this is optimal\n\nIt is the cleanest way to solve a top-N grouped join problem."
      },
      {
        "approach_title": "CTE top amenities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH amenity_counts AS (\n  SELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count\n  FROM amenities a\n  JOIN property_amenities pa ON a.id = pa.amenity_id\n  GROUP BY a.id, a.amenity_name\n)\nSELECT id, amenity_name, property_count\nFROM amenity_counts\nORDER BY property_count DESC, id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCalculate amenity counts in a CTE, then rank them.\n\n## Query\n\n```sql\nWITH amenity_counts AS (\n  SELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count\n  FROM amenities a\n  JOIN property_amenities pa ON a.id = pa.amenity_id\n  GROUP BY a.id, a.amenity_name\n)\nSELECT id, amenity_name, property_count\nFROM amenity_counts\nORDER BY property_count DESC, id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores the count for each amenity.\n- The outer query sorts and keeps the top 5 rows.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Count mapping ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT a.id, a.amenity_name, COUNT(pa.id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.id, a.amenity_name ORDER BY property_count DESC, a.id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount mapping row ids instead of property ids.\n\n## Query\n\n```sql\nSELECT a.id, a.amenity_name, COUNT(pa.id) AS property_count\nFROM amenities a\nJOIN property_amenities pa ON a.id = pa.amenity_id\nGROUP BY a.id, a.amenity_name\nORDER BY property_count DESC, a.id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Each row in `property_amenities` represents one amenity-property link.\n- Counting `pa.id` gives the same result as counting `pa.property_id`.\n\n## Difference from the optimal approach\n\nThis is still correct, but counting the joined property links is slightly more descriptive."
      }
    ]
  },
  {
    "code": "REALESTATE_021",
    "approaches": [
      {
        "approach_title": "Filter review",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE application_status = 'under_review' ORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter rental applications to only those under review.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id\nFROM rental_applications\nWHERE application_status = 'under_review'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE application_status = 'under_review'` keeps only matching applications.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` ensures the required ordering.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to return applications under review."
      },
      {
        "approach_title": "CTE review",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH review_apps AS (\n  SELECT id, listing_id, seeker_user_id\n  FROM rental_applications\n  WHERE application_status = 'under_review'\n)\nSELECT id, listing_id, seeker_user_id\nFROM review_apps\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore the filtered applications in a CTE, then return them.\n\n## Query\n\n```sql\nWITH review_apps AS (\n  SELECT id, listing_id, seeker_user_id\n  FROM rental_applications\n  WHERE application_status = 'under_review'\n)\nSELECT id, listing_id, seeker_user_id\nFROM review_apps\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the rows that match the status.\n- The outer query applies the final sort.\n- This pattern is useful when more logic may be added later.\n\n## Difference from the optimal approach\n\nIt works the same way, but is more verbose."
      },
      {
        "approach_title": "Case filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE CASE WHEN application_status = 'under_review' THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression inside the filter.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id\nFROM rental_applications\nWHERE CASE WHEN application_status = 'under_review' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for rows under review.\n- The output columns and order remain the same.\n\n## Difference from the optimal approach\n\nIt is valid, but much less readable than a normal `WHERE` condition."
      }
    ]
  },
  {
    "code": "REALESTATE_022",
    "approaches": [
      {
        "approach_title": "Filter active",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, tenant_user_id, monthly_rent FROM leases WHERE lease_status = 'active' ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep only active leases.\n\n## Query\n\n```sql\nSELECT id, property_id, tenant_user_id, monthly_rent\nFROM leases\nWHERE lease_status = 'active'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `WHERE lease_status = 'active'` filters the lease rows.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` matches the required order.\n\n## Why this is optimal\n\nIt directly expresses the condition with minimal SQL."
      },
      {
        "approach_title": "CTE active",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_leases AS (\n  SELECT id, property_id, tenant_user_id, monthly_rent\n  FROM leases\n  WHERE lease_status = 'active'\n)\nSELECT id, property_id, tenant_user_id, monthly_rent\nFROM active_leases\nORDER BY id ASC;",
        "explanation": "## Approach\n\nFilter active leases in a CTE, then return them.\n\n## Query\n\n```sql\nWITH active_leases AS (\n  SELECT id, property_id, tenant_user_id, monthly_rent\n  FROM leases\n  WHERE lease_status = 'active'\n)\nSELECT id, property_id, tenant_user_id, monthly_rent\nFROM active_leases\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE contains only active leases.\n- The outer query returns them in the expected order.\n\n## Difference from the optimal approach\n\nUseful if you want to extend the query later, but longer here."
      },
      {
        "approach_title": "Case active",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, tenant_user_id, monthly_rent FROM leases WHERE CASE WHEN lease_status = 'active' THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression to keep active leases.\n\n## Query\n\n```sql\nSELECT id, property_id, tenant_user_id, monthly_rent\nFROM leases\nWHERE CASE WHEN lease_status = 'active' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` condition returns true only for active leases.\n- The final result is the same as the direct filter.\n\n## Difference from the optimal approach\n\nIt works, but it is unnecessarily complex."
      }
    ]
  },
  {
    "code": "REALESTATE_023",
    "approaches": [
      {
        "approach_title": "Overdue filter",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, lease_id, tenant_user_id, due_date, payment_status FROM rent_payments WHERE due_date < CURRENT_DATE AND payment_status IN ('pending', 'overdue') ORDER BY due_date ASC, id ASC;",
        "explanation": "## Approach\n\nKeep rent payments whose due date has passed and status is still unpaid.\n\n## Query\n\n```sql\nSELECT id, lease_id, tenant_user_id, due_date, payment_status\nFROM rent_payments\nWHERE due_date < CURRENT_DATE\n  AND payment_status IN ('pending', 'overdue')\nORDER BY due_date ASC, id ASC;\n```\n\n## Explanation\n\n- `due_date < CURRENT_DATE` keeps payments whose due date is already past.\n- The status check limits rows to pending or overdue payments.\n- Sorting by `due_date` first brings the oldest unpaid records first.\n\n## Why this is optimal\n\nIt clearly expresses both business conditions in a single filter."
      },
      {
        "approach_title": "CTE overdue",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH overdue_payments AS (\n  SELECT id, lease_id, tenant_user_id, due_date, payment_status\n  FROM rent_payments\n  WHERE due_date < CURRENT_DATE\n    AND payment_status IN ('pending', 'overdue')\n)\nSELECT id, lease_id, tenant_user_id, due_date, payment_status\nFROM overdue_payments\nORDER BY due_date ASC, id ASC;",
        "explanation": "## Approach\n\nFirst isolate overdue unpaid payments in a CTE.\n\n## Query\n\n```sql\nWITH overdue_payments AS (\n  SELECT id, lease_id, tenant_user_id, due_date, payment_status\n  FROM rent_payments\n  WHERE due_date < CURRENT_DATE\n    AND payment_status IN ('pending', 'overdue')\n)\nSELECT id, lease_id, tenant_user_id, due_date, payment_status\nFROM overdue_payments\nORDER BY due_date ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the matching payment rows.\n- The outer query applies the final sort order.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer than needed."
      },
      {
        "approach_title": "Or status",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, lease_id, tenant_user_id, due_date, payment_status FROM rent_payments WHERE due_date < CURRENT_DATE AND (payment_status = 'pending' OR payment_status = 'overdue') ORDER BY due_date ASC, id ASC;",
        "explanation": "## Approach\n\nUse explicit `OR` conditions for the allowed statuses.\n\n## Query\n\n```sql\nSELECT id, lease_id, tenant_user_id, due_date, payment_status\nFROM rent_payments\nWHERE due_date < CURRENT_DATE\n  AND (payment_status = 'pending' OR payment_status = 'overdue')\nORDER BY due_date ASC, id ASC;\n```\n\n## Explanation\n\n- This uses the same logic as `IN`, but writes each status separately.\n- The result and order remain the same.\n\n## Difference from the optimal approach\n\nIt works, but `IN (...)` is cleaner for matching against a small list."
      }
    ]
  },
  {
    "code": "REALESTATE_024",
    "approaches": [
      {
        "approach_title": "Open tickets",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, issue_type, ticket_status FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep maintenance tickets that are still not finished.\n\n## Query\n\n```sql\nSELECT id, property_id, issue_type, ticket_status\nFROM maintenance_tickets\nWHERE ticket_status IN ('open', 'assigned', 'in_progress')\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `IN` list keeps the open workflow states.\n- The selected columns match the required output.\n- `ORDER BY id ASC` gives the expected ordering.\n\n## Why this is optimal\n\nIt is direct and easy to read."
      },
      {
        "approach_title": "OR statuses",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, property_id, issue_type, ticket_status FROM maintenance_tickets WHERE ticket_status = 'open' OR ticket_status = 'assigned' OR ticket_status = 'in_progress' ORDER BY id ASC;",
        "explanation": "## Approach\n\nWrite each allowed status as a separate condition.\n\n## Query\n\n```sql\nSELECT id, property_id, issue_type, ticket_status\nFROM maintenance_tickets\nWHERE ticket_status = 'open'\n   OR ticket_status = 'assigned'\n   OR ticket_status = 'in_progress'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- Each condition allows one open-style state.\n- Together they return the same rows as `IN`.\n\n## Difference from the optimal approach\n\nCorrect, but more repetitive."
      },
      {
        "approach_title": "CTE open",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH open_tickets AS (\n  SELECT id, property_id, issue_type, ticket_status\n  FROM maintenance_tickets\n  WHERE ticket_status IN ('open', 'assigned', 'in_progress')\n)\nSELECT id, property_id, issue_type, ticket_status\nFROM open_tickets\nORDER BY id ASC;",
        "explanation": "## Approach\n\nPut the open tickets in a CTE and return them.\n\n## Query\n\n```sql\nWITH open_tickets AS (\n  SELECT id, property_id, issue_type, ticket_status\n  FROM maintenance_tickets\n  WHERE ticket_status IN ('open', 'assigned', 'in_progress')\n)\nSELECT id, property_id, issue_type, ticket_status\nFROM open_tickets\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the unfinished tickets.\n- The outer query applies the final order.\n\n## Difference from the optimal approach\n\nIt is fine, but adds an extra step."
      }
    ]
  },
  {
    "code": "REALESTATE_025",
    "approaches": [
      {
        "approach_title": "Filter high rent",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, rent_amount FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount > 50000 ORDER BY rent_amount DESC, id ASC;",
        "explanation": "## Approach\n\nKeep only live rental listings above the rent threshold.\n\n## Query\n\n```sql\nSELECT id, property_id, rent_amount\nFROM listings\nWHERE listing_status = 'live'\n  AND listed_for = 'rent'\n  AND rent_amount > 50000\nORDER BY rent_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The first two filters keep live rental listings.\n- The rent condition keeps only higher-value rows.\n- Sorting by rent descending shows the most expensive first.\n\n## Why this is optimal\n\nIt directly applies the three conditions and required sort order."
      },
      {
        "approach_title": "CTE high rent",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH high_rent_listings AS (\n  SELECT id, property_id, rent_amount\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'rent'\n    AND rent_amount > 50000\n)\nSELECT id, property_id, rent_amount\nFROM high_rent_listings\nORDER BY rent_amount DESC, id ASC;",
        "explanation": "## Approach\n\nStore the filtered listings in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH high_rent_listings AS (\n  SELECT id, property_id, rent_amount\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'rent'\n    AND rent_amount > 50000\n)\nSELECT id, property_id, rent_amount\nFROM high_rent_listings\nORDER BY rent_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the relevant rental listings.\n- The outer query handles the final order.\n\n## Difference from the optimal approach\n\nClear, but more verbose."
      },
      {
        "approach_title": "Case filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, rent_amount FROM listings WHERE CASE WHEN listing_status = 'live' AND listed_for = 'rent' AND rent_amount > 50000 THEN true ELSE false END ORDER BY rent_amount DESC, id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression to keep matching listings.\n\n## Query\n\n```sql\nSELECT id, property_id, rent_amount\nFROM listings\nWHERE CASE WHEN listing_status = 'live' AND listed_for = 'rent' AND rent_amount > 50000 THEN true ELSE false END\nORDER BY rent_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression evaluates the same filter rules.\n- The result rows remain unchanged.\n\n## Difference from the optimal approach\n\nThis works, but is harder to read than a standard filter."
      }
    ]
  },
  {
    "code": "REALESTATE_026",
    "approaches": [
      {
        "approach_title": "Group applications",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS application_count FROM rental_applications GROUP BY listing_id ORDER BY application_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nGroup applications by listing and count rows in each group.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS application_count\nFROM rental_applications\nGROUP BY listing_id\nORDER BY application_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` counts applications in each group.\n- The ordering ranks listings with more applications first.\n\n## Why this is optimal\n\nIt is the standard grouped count query."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT listing_id, COUNT(id) AS application_count FROM rental_applications GROUP BY listing_id ORDER BY application_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount application ids in each listing group.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(id) AS application_count\nFROM rental_applications\nGROUP BY listing_id\nORDER BY application_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` works because the primary key is never NULL.\n- It returns the same grouped counts.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is more direct for row counting."
      },
      {
        "approach_title": "CTE apps",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH app_counts AS (\n  SELECT listing_id, COUNT(*) AS application_count\n  FROM rental_applications\n  GROUP BY listing_id\n)\nSELECT listing_id, application_count\nFROM app_counts\nORDER BY application_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCompute application counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH app_counts AS (\n  SELECT listing_id, COUNT(*) AS application_count\n  FROM rental_applications\n  GROUP BY listing_id\n)\nSELECT listing_id, application_count\nFROM app_counts\nORDER BY application_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE contains one row per listing.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nUseful when building longer queries, but unnecessary here."
      }
    ]
  },
  {
    "code": "REALESTATE_027",
    "approaches": [
      {
        "approach_title": "Sum active rent",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent FROM leases WHERE lease_status = 'active' GROUP BY owner_profile_id ORDER BY total_monthly_rent DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nKeep only active leases, then sum monthly rent per owner.\n\n## Query\n\n```sql\nSELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent\nFROM leases\nWHERE lease_status = 'active'\nGROUP BY owner_profile_id\nORDER BY total_monthly_rent DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- `WHERE lease_status = 'active'` filters the table to active leases only.\n- `GROUP BY owner_profile_id` creates one group per owner.\n- `SUM(monthly_rent)` adds rent values within each owner group.\n- The sort order matches the expected output.\n\n## Why this is optimal\n\nIt is the clearest and safest way to return only owners who currently have active lease revenue."
      },
      {
        "approach_title": "CTE revenue",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_rent AS (\n  SELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent\n  FROM leases\n  WHERE lease_status = 'active'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, total_monthly_rent\nFROM owner_rent\nORDER BY total_monthly_rent DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute active lease revenue in a CTE, then return it.\n\n## Query\n\n```sql\nWITH owner_rent AS (\n  SELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent\n  FROM leases\n  WHERE lease_status = 'active'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, total_monthly_rent\nFROM owner_rent\nORDER BY total_monthly_rent DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one revenue row per owner.\n- The outer query applies the final ordering.\n- This format is useful if more owner-level calculations are added later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but with an extra step."
      },
      {
        "approach_title": "Case with having",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT owner_profile_id, SUM(CASE WHEN lease_status = 'active' THEN monthly_rent ELSE 0 END) AS total_monthly_rent FROM leases GROUP BY owner_profile_id HAVING SUM(CASE WHEN lease_status = 'active' THEN 1 ELSE 0 END) > 0 ORDER BY total_monthly_rent DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nAggregate all leases, but add rent only for active ones, then remove owners with no active leases.\n\n## Query\n\n```sql\nSELECT owner_profile_id,\n       SUM(CASE WHEN lease_status = 'active' THEN monthly_rent ELSE 0 END) AS total_monthly_rent\nFROM leases\nGROUP BY owner_profile_id\nHAVING SUM(CASE WHEN lease_status = 'active' THEN 1 ELSE 0 END) > 0\nORDER BY total_monthly_rent DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The first `CASE` adds `monthly_rent` only for active leases.\n- Inactive leases contribute 0 to the revenue total.\n- The `HAVING` clause removes owners who do not have any active lease rows.\n- This fixes the row-count issue from the earlier version, where owners with only inactive leases were still included with a zero total.\n\n## Difference from the optimal approach\n\nIt works correctly, but filtering rows first with `WHERE lease_status = 'active'` is simpler and easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_028",
    "approaches": [
      {
        "approach_title": "Join amenities",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT a.amenity_name, COUNT(pa.property_id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.amenity_name ORDER BY property_count DESC, a.amenity_name ASC;",
        "explanation": "## Approach\n\nJoin amenities to property mappings and count how many properties each amenity appears in.\n\n## Query\n\n```sql\nSELECT a.amenity_name, COUNT(pa.property_id) AS property_count\nFROM amenities a\nJOIN property_amenities pa ON a.id = pa.amenity_id\nGROUP BY a.amenity_name\nORDER BY property_count DESC, a.amenity_name ASC;\n```\n\n## Explanation\n\n- The join connects each amenity to the properties that have it.\n- `GROUP BY a.amenity_name` creates one group per amenity.\n- `COUNT(pa.property_id)` counts the linked properties.\n\n## Why this is optimal\n\nIt directly follows the many-to-many relationship and computes the grouped count clearly."
      },
      {
        "approach_title": "Count map ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT a.amenity_name, COUNT(pa.id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.amenity_name ORDER BY property_count DESC, a.amenity_name ASC;",
        "explanation": "## Approach\n\nCount the mapping row ids instead of property ids.\n\n## Query\n\n```sql\nSELECT a.amenity_name, COUNT(pa.id) AS property_count\nFROM amenities a\nJOIN property_amenities pa ON a.id = pa.amenity_id\nGROUP BY a.amenity_name\nORDER BY property_count DESC, a.amenity_name ASC;\n```\n\n## Explanation\n\n- Each mapping row represents one property-amenity link.\n- Counting `pa.id` returns the same grouped result.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(pa.property_id)` describes the business meaning a bit better."
      },
      {
        "approach_title": "CTE amenities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH amenity_counts AS (\n  SELECT a.amenity_name, COUNT(pa.property_id) AS property_count\n  FROM amenities a\n  JOIN property_amenities pa ON a.id = pa.amenity_id\n  GROUP BY a.amenity_name\n)\nSELECT amenity_name, property_count\nFROM amenity_counts\nORDER BY property_count DESC, amenity_name ASC;",
        "explanation": "## Approach\n\nCompute the counts in a CTE, then sort them.\n\n## Query\n\n```sql\nWITH amenity_counts AS (\n  SELECT a.amenity_name, COUNT(pa.property_id) AS property_count\n  FROM amenities a\n  JOIN property_amenities pa ON a.id = pa.amenity_id\n  GROUP BY a.amenity_name\n)\nSELECT amenity_name, property_count\nFROM amenity_counts\nORDER BY property_count DESC, amenity_name ASC;\n```\n\n## Explanation\n\n- The CTE holds one aggregated row per amenity.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nIt is more structured, but not necessary here."
      }
    ]
  },
  {
    "code": "REALESTATE_029",
    "approaches": [
      {
        "approach_title": "Avg by city",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, AVG(l.rent_amount) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin listings to city information, keep live rental listings, then average rent by city.\n\n## Query\n\n```sql\nSELECT loc.city, AVG(l.rent_amount) AS avg_rent\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\n  AND l.rent_amount IS NOT NULL\nGROUP BY loc.city\nORDER BY avg_rent DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins connect each listing to its city.\n- The filters keep only live rental listings with a rent value.\n- `AVG(l.rent_amount)` computes the average rent for each city.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly combines joining, filtering, grouping, and averaging in one query."
      },
      {
        "approach_title": "CTE city rent",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_rents AS (\n  SELECT loc.city, l.rent_amount\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n)\nSELECT city, AVG(rent_amount) AS avg_rent\nFROM city_rents\nGROUP BY city\nORDER BY avg_rent DESC, city ASC;",
        "explanation": "## Approach\n\nFirst build a city-and-rent dataset, then calculate averages.\n\n## Query\n\n```sql\nWITH city_rents AS (\n  SELECT loc.city, l.rent_amount\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n)\nSELECT city, AVG(rent_amount) AS avg_rent\nFROM city_rents\nGROUP BY city\nORDER BY avg_rent DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores each qualifying rental listing with its city.\n- The outer query averages rent per city.\n- The ordering stays the same as the expected result.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Case avg",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, AVG(CASE WHEN l.rent_amount IS NOT NULL THEN l.rent_amount END) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression so only non-null rents contribute to the average.\n\n## Query\n\n```sql\nSELECT loc.city, AVG(CASE WHEN l.rent_amount IS NOT NULL THEN l.rent_amount END) AS avg_rent\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\nGROUP BY loc.city\nORDER BY avg_rent DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins and rental filters remain the same.\n- The `CASE` passes only non-null rent values into `AVG`.\n- `AVG` ignores NULLs, so the result matches the main solution.\n\n## Difference from the optimal approach\n\nIt works, but filtering null rents earlier is simpler."
      }
    ]
  },
  {
    "code": "REALESTATE_030",
    "approaches": [
      {
        "approach_title": "Top inquiries",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS inquiry_count FROM inquiries GROUP BY listing_id ORDER BY inquiry_count DESC, listing_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount inquiries per listing, sort by highest count, and keep the top 5.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS inquiry_count\nFROM inquiries\nGROUP BY listing_id\nORDER BY inquiry_count DESC, listing_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` counts how many inquiries each listing received.\n- Sorting by `inquiry_count DESC` ranks the most inquired listings first.\n- `LIMIT 5` returns the top 5 rows.\n\n## Why this is optimal\n\nIt is the clearest top-N aggregation query."
      },
      {
        "approach_title": "CTE top inquiries",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH inquiry_counts AS (\n  SELECT listing_id, COUNT(*) AS inquiry_count\n  FROM inquiries\n  GROUP BY listing_id\n)\nSELECT listing_id, inquiry_count\nFROM inquiry_counts\nORDER BY inquiry_count DESC, listing_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute inquiry counts in a CTE and rank them outside.\n\n## Query\n\n```sql\nWITH inquiry_counts AS (\n  SELECT listing_id, COUNT(*) AS inquiry_count\n  FROM inquiries\n  GROUP BY listing_id\n)\nSELECT listing_id, inquiry_count\nFROM inquiry_counts\nORDER BY inquiry_count DESC, listing_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per listing.\n- The outer query performs the final sorting and limiting.\n\n## Difference from the optimal approach\n\nUseful for extension, but more verbose."
      },
      {
        "approach_title": "Row number",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT listing_id, inquiry_count FROM (SELECT listing_id, COUNT(*) AS inquiry_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, listing_id ASC) AS rn FROM inquiries GROUP BY listing_id) x WHERE rn <= 5 ORDER BY inquiry_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nAssign row numbers after counting inquiries, then keep the first 5.\n\n## Query\n\n```sql\nSELECT listing_id, inquiry_count\nFROM (\n  SELECT listing_id,\n         COUNT(*) AS inquiry_count,\n         ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, listing_id ASC) AS rn\n  FROM inquiries\n  GROUP BY listing_id\n) x\nWHERE rn <= 5\nORDER BY inquiry_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The grouped query counts inquiries per listing.\n- `ROW_NUMBER()` ranks rows in the desired order.\n- The outer query keeps only the first 5.\n\n## Difference from the optimal approach\n\nThis is more flexible for advanced ranking tasks, but more complex than needed here."
      }
    ]
  },
  {
    "code": "REALESTATE_031",
    "approaches": [
      {
        "approach_title": "Filter late fee",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, lease_id, tenant_user_id, late_fee FROM rent_payments WHERE late_fee > 0 ORDER BY late_fee DESC, id ASC;",
        "explanation": "## Approach\n\nKeep only rent payments where a late fee exists.\n\n## Query\n\n```sql\nSELECT id, lease_id, tenant_user_id, late_fee\nFROM rent_payments\nWHERE late_fee > 0\nORDER BY late_fee DESC, id ASC;\n```\n\n## Explanation\n\n- `late_fee > 0` keeps only rows where a fee was charged.\n- The selected columns match the expected output.\n- `ORDER BY late_fee DESC, id ASC` matches the required sorting.\n\n## Why this is optimal\n\nIt is the shortest and clearest way to find payments with charged late fees."
      },
      {
        "approach_title": "CTE late fee",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH late_fee_payments AS (\n  SELECT id, lease_id, tenant_user_id, late_fee\n  FROM rent_payments\n  WHERE late_fee > 0\n)\nSELECT id, lease_id, tenant_user_id, late_fee\nFROM late_fee_payments\nORDER BY late_fee DESC, id ASC;",
        "explanation": "## Approach\n\nStore matching rent payments in a CTE, then return them.\n\n## Query\n\n```sql\nWITH late_fee_payments AS (\n  SELECT id, lease_id, tenant_user_id, late_fee\n  FROM rent_payments\n  WHERE late_fee > 0\n)\nSELECT id, lease_id, tenant_user_id, late_fee\nFROM late_fee_payments\nORDER BY late_fee DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates rows with a positive late fee.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nIt gives the same result, but with more code."
      },
      {
        "approach_title": "Case filter",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, lease_id, tenant_user_id, late_fee FROM rent_payments WHERE CASE WHEN late_fee > 0 THEN true ELSE false END ORDER BY late_fee DESC, id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression to keep rows with a late fee.\n\n## Query\n\n```sql\nSELECT id, lease_id, tenant_user_id, late_fee\nFROM rent_payments\nWHERE CASE WHEN late_fee > 0 THEN true ELSE false END\nORDER BY late_fee DESC, id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only when `late_fee` is greater than 0.\n- The output remains the same.\n\n## Difference from the optimal approach\n\nIt works, but is less readable than a normal `WHERE` condition."
      }
    ]
  },
  {
    "code": "REALESTATE_032",
    "approaches": [
      {
        "approach_title": "Filter duration",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, lease_duration_months FROM listings WHERE lease_duration_months > 12 ORDER BY lease_duration_months DESC, id ASC;",
        "explanation": "## Approach\n\nKeep listings with lease duration greater than 12 months.\n\n## Query\n\n```sql\nSELECT id, property_id, lease_duration_months\nFROM listings\nWHERE lease_duration_months > 12\nORDER BY lease_duration_months DESC, id ASC;\n```\n\n## Explanation\n\n- `lease_duration_months > 12` filters longer-duration listings.\n- The query returns the required columns.\n- Sorting places the longest durations first.\n\n## Why this is optimal\n\nIt directly expresses the duration rule with minimal SQL."
      },
      {
        "approach_title": "CTE duration",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH long_leases AS (\n  SELECT id, property_id, lease_duration_months\n  FROM listings\n  WHERE lease_duration_months > 12\n)\nSELECT id, property_id, lease_duration_months\nFROM long_leases\nORDER BY lease_duration_months DESC, id ASC;",
        "explanation": "## Approach\n\nStore long-duration listings in a CTE and return them.\n\n## Query\n\n```sql\nWITH long_leases AS (\n  SELECT id, property_id, lease_duration_months\n  FROM listings\n  WHERE lease_duration_months > 12\n)\nSELECT id, property_id, lease_duration_months\nFROM long_leases\nORDER BY lease_duration_months DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE contains only listings above the duration threshold.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more verbose for the same result."
      },
      {
        "approach_title": "Case duration",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, lease_duration_months FROM listings WHERE CASE WHEN lease_duration_months > 12 THEN true ELSE false END ORDER BY lease_duration_months DESC, id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression for the duration filter.\n\n## Query\n\n```sql\nSELECT id, property_id, lease_duration_months\nFROM listings\nWHERE CASE WHEN lease_duration_months > 12 THEN true ELSE false END\nORDER BY lease_duration_months DESC, id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for long lease durations.\n- The result matches the simpler filter.\n\n## Difference from the optimal approach\n\nIt works, but is unnecessarily complex."
      }
    ]
  },
  {
    "code": "REALESTATE_033",
    "approaches": [
      {
        "approach_title": "Group active team",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT team_name, COUNT(*) AS executive_count FROM executive_profiles WHERE is_active = true GROUP BY team_name ORDER BY executive_count DESC, team_name ASC;",
        "explanation": "## Approach\n\nKeep active executives, then count them by team.\n\n## Query\n\n```sql\nSELECT team_name, COUNT(*) AS executive_count\nFROM executive_profiles\nWHERE is_active = true\nGROUP BY team_name\nORDER BY executive_count DESC, team_name ASC;\n```\n\n## Explanation\n\n- `WHERE is_active = true` filters to active executives.\n- `GROUP BY team_name` creates one group per team.\n- `COUNT(*)` returns the number of active executives in each team.\n\n## Why this is optimal\n\nIt is the standard way to get grouped counts after filtering."
      },
      {
        "approach_title": "Boolean team",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT team_name, COUNT(*) AS executive_count FROM executive_profiles WHERE is_active GROUP BY team_name ORDER BY executive_count DESC, team_name ASC;",
        "explanation": "## Approach\n\nUse PostgreSQL boolean shorthand for the active filter.\n\n## Query\n\n```sql\nSELECT team_name, COUNT(*) AS executive_count\nFROM executive_profiles\nWHERE is_active\nGROUP BY team_name\nORDER BY executive_count DESC, team_name ASC;\n```\n\n## Explanation\n\n- `WHERE is_active` means the same as checking for true.\n- The grouped counts remain the same.\n\n## Difference from the optimal approach\n\nShorter, but the explicit comparison is often clearer for learners."
      },
      {
        "approach_title": "CTE team count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH active_team_counts AS (\n  SELECT team_name, COUNT(*) AS executive_count\n  FROM executive_profiles\n  WHERE is_active = true\n  GROUP BY team_name\n)\nSELECT team_name, executive_count\nFROM active_team_counts\nORDER BY executive_count DESC, team_name ASC;",
        "explanation": "## Approach\n\nCalculate active team counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH active_team_counts AS (\n  SELECT team_name, COUNT(*) AS executive_count\n  FROM executive_profiles\n  WHERE is_active = true\n  GROUP BY team_name\n)\nSELECT team_name, executive_count\nFROM active_team_counts\nORDER BY executive_count DESC, team_name ASC;\n```\n\n## Explanation\n\n- The CTE stores the grouped counts.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer than needed."
      }
    ]
  },
  {
    "code": "REALESTATE_034",
    "approaches": [
      {
        "approach_title": "Filter rejected",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, owner_profile_id, rejection_reason FROM owner_verification_requests WHERE request_status = 'rejected' ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep only rejected owner verification requests.\n\n## Query\n\n```sql\nSELECT id, owner_profile_id, rejection_reason\nFROM owner_verification_requests\nWHERE request_status = 'rejected'\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `WHERE` clause filters to rejected requests.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` ensures the required order.\n\n## Why this is optimal\n\nIt is the simplest and clearest way to get rejected requests."
      },
      {
        "approach_title": "CTE rejected",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rejected_requests AS (\n  SELECT id, owner_profile_id, rejection_reason\n  FROM owner_verification_requests\n  WHERE request_status = 'rejected'\n)\nSELECT id, owner_profile_id, rejection_reason\nFROM rejected_requests\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore rejected requests in a CTE and return them.\n\n## Query\n\n```sql\nWITH rejected_requests AS (\n  SELECT id, owner_profile_id, rejection_reason\n  FROM owner_verification_requests\n  WHERE request_status = 'rejected'\n)\nSELECT id, owner_profile_id, rejection_reason\nFROM rejected_requests\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates rejected rows.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is valid, but longer."
      },
      {
        "approach_title": "Case rejected",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, owner_profile_id, rejection_reason FROM owner_verification_requests WHERE CASE WHEN request_status = 'rejected' THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression to keep rejected requests.\n\n## Query\n\n```sql\nSELECT id, owner_profile_id, rejection_reason\nFROM owner_verification_requests\nWHERE CASE WHEN request_status = 'rejected' THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for rejected rows.\n- The result matches the standard filter.\n\n## Difference from the optimal approach\n\nIt works, but is less readable than a direct condition."
      }
    ]
  },
  {
    "code": "REALESTATE_035",
    "approaches": [
      {
        "approach_title": "Filter rent drop",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, listing_id, old_rent_amount, new_rent_amount FROM listing_price_history WHERE old_rent_amount IS NOT NULL AND new_rent_amount IS NOT NULL AND new_rent_amount < old_rent_amount ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep price history rows where the new rent is lower than the old rent.\n\n## Query\n\n```sql\nSELECT id, listing_id, old_rent_amount, new_rent_amount\nFROM listing_price_history\nWHERE old_rent_amount IS NOT NULL\n  AND new_rent_amount IS NOT NULL\n  AND new_rent_amount < old_rent_amount\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The null checks remove rows without both rent values.\n- `new_rent_amount < old_rent_amount` identifies rent drops.\n- The selected columns match the expected output.\n\n## Why this is optimal\n\nIt captures the exact price-drop condition clearly."
      },
      {
        "approach_title": "CTE rent drop",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rent_drops AS (\n  SELECT id, listing_id, old_rent_amount, new_rent_amount\n  FROM listing_price_history\n  WHERE old_rent_amount IS NOT NULL\n    AND new_rent_amount IS NOT NULL\n    AND new_rent_amount < old_rent_amount\n)\nSELECT id, listing_id, old_rent_amount, new_rent_amount\nFROM rent_drops\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore price drop rows in a CTE, then return them.\n\n## Query\n\n```sql\nWITH rent_drops AS (\n  SELECT id, listing_id, old_rent_amount, new_rent_amount\n  FROM listing_price_history\n  WHERE old_rent_amount IS NOT NULL\n    AND new_rent_amount IS NOT NULL\n    AND new_rent_amount < old_rent_amount\n)\nSELECT id, listing_id, old_rent_amount, new_rent_amount\nFROM rent_drops\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the matching history records.\n- The outer query sorts the result.\n\n## Difference from the optimal approach\n\nThis is more verbose for the same output."
      },
      {
        "approach_title": "Difference check",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, listing_id, old_rent_amount, new_rent_amount FROM listing_price_history WHERE old_rent_amount IS NOT NULL AND new_rent_amount IS NOT NULL AND old_rent_amount - new_rent_amount > 0 ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse the positive difference between old and new rent to detect price drops.\n\n## Query\n\n```sql\nSELECT id, listing_id, old_rent_amount, new_rent_amount\nFROM listing_price_history\nWHERE old_rent_amount IS NOT NULL\n  AND new_rent_amount IS NOT NULL\n  AND old_rent_amount - new_rent_amount > 0\nORDER BY id ASC;\n```\n\n## Explanation\n\n- If the old rent is greater than the new rent, the difference is positive.\n- That means the rent price was reduced.\n\n## Difference from the optimal approach\n\nIt works, but the direct comparison is easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_036",
    "approaches": [
      {
        "approach_title": "Group leases",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT property_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id HAVING COUNT(*) > 1 ORDER BY lease_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCount leases per property and keep properties with more than one lease.\n\n## Query\n\n```sql\nSELECT property_id, COUNT(*) AS lease_count\nFROM leases\nGROUP BY property_id\nHAVING COUNT(*) > 1\nORDER BY lease_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY property_id` creates one group per property.\n- `COUNT(*)` counts lease rows in each group.\n- `HAVING COUNT(*) > 1` keeps properties that had more than one lease.\n\n## Why this is optimal\n\nIt directly uses grouping and `HAVING`, which is the natural solution here."
      },
      {
        "approach_title": "CTE renewals",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH property_lease_counts AS (\n  SELECT property_id, COUNT(*) AS lease_count\n  FROM leases\n  GROUP BY property_id\n)\nSELECT property_id, lease_count\nFROM property_lease_counts\nWHERE lease_count > 1\nORDER BY lease_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCompute lease counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH property_lease_counts AS (\n  SELECT property_id, COUNT(*) AS lease_count\n  FROM leases\n  GROUP BY property_id\n)\nSELECT property_id, lease_count\nFROM property_lease_counts\nWHERE lease_count > 1\nORDER BY lease_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per property with its lease count.\n- The outer query keeps properties with more than one lease.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT property_id, COUNT(id) AS lease_count FROM leases GROUP BY property_id HAVING COUNT(id) > 1 ORDER BY lease_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCount lease ids inside each property group.\n\n## Query\n\n```sql\nSELECT property_id, COUNT(id) AS lease_count\nFROM leases\nGROUP BY property_id\nHAVING COUNT(id) > 1\nORDER BY lease_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` gives the same result because lease ids are never NULL.\n- The grouping and filter logic remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_037",
    "approaches": [
      {
        "approach_title": "Sum maintenance",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost FROM maintenance_tickets GROUP BY property_id ORDER BY total_maintenance_cost DESC, property_id ASC;",
        "explanation": "## Approach\n\nGroup maintenance tickets by property and sum their resolution costs.\n\n## Query\n\n```sql\nSELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost\nFROM maintenance_tickets\nGROUP BY property_id\nORDER BY total_maintenance_cost DESC, property_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY property_id` creates one group per property.\n- `COALESCE(resolution_cost, 0)` treats missing costs as 0.\n- `SUM(...)` adds all maintenance costs for that property.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt safely handles NULL values and computes the total in one step."
      },
      {
        "approach_title": "CTE cost",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH property_costs AS (\n  SELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost\n  FROM maintenance_tickets\n  GROUP BY property_id\n)\nSELECT property_id, total_maintenance_cost\nFROM property_costs\nORDER BY total_maintenance_cost DESC, property_id ASC;",
        "explanation": "## Approach\n\nCalculate property maintenance totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH property_costs AS (\n  SELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost\n  FROM maintenance_tickets\n  GROUP BY property_id\n)\nSELECT property_id, total_maintenance_cost\nFROM property_costs\nORDER BY total_maintenance_cost DESC, property_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per property.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Sum with case",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT property_id, SUM(CASE WHEN resolution_cost IS NULL THEN 0 ELSE resolution_cost END) AS total_maintenance_cost FROM maintenance_tickets GROUP BY property_id ORDER BY total_maintenance_cost DESC, property_id ASC;",
        "explanation": "## Approach\n\nReplace NULL costs with 0 using `CASE`, then sum them.\n\n## Query\n\n```sql\nSELECT property_id,\n       SUM(CASE WHEN resolution_cost IS NULL THEN 0 ELSE resolution_cost END) AS total_maintenance_cost\nFROM maintenance_tickets\nGROUP BY property_id\nORDER BY total_maintenance_cost DESC, property_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression converts missing costs into 0.\n- `SUM` then adds the cleaned values per property.\n- The ordering stays the same.\n\n## Difference from the optimal approach\n\nIt works the same way, but `COALESCE` is shorter and easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_038",
    "approaches": [
      {
        "approach_title": "Avg resolution",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time FROM support_tickets WHERE resolution_time_mins IS NOT NULL GROUP BY user_id ORDER BY avg_resolution_time DESC, user_id ASC;",
        "explanation": "## Approach\n\nKeep support tickets with a resolution time, then average that value per user.\n\n## Query\n\n```sql\nSELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time\nFROM support_tickets\nWHERE resolution_time_mins IS NOT NULL\nGROUP BY user_id\nORDER BY avg_resolution_time DESC, user_id ASC;\n```\n\n## Explanation\n\n- `resolution_time_mins IS NOT NULL` removes missing values.\n- `GROUP BY user_id` creates one group per user.\n- `AVG(resolution_time_mins)` computes the average resolution time.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes the grouped average from valid rows only."
      },
      {
        "approach_title": "CTE average",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_resolution_times AS (\n  SELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time\n  FROM support_tickets\n  WHERE resolution_time_mins IS NOT NULL\n  GROUP BY user_id\n)\nSELECT user_id, avg_resolution_time\nFROM user_resolution_times\nORDER BY avg_resolution_time DESC, user_id ASC;",
        "explanation": "## Approach\n\nCompute the averages in a CTE, then return them.\n\n## Query\n\n```sql\nWITH user_resolution_times AS (\n  SELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time\n  FROM support_tickets\n  WHERE resolution_time_mins IS NOT NULL\n  GROUP BY user_id\n)\nSELECT user_id, avg_resolution_time\nFROM user_resolution_times\nORDER BY avg_resolution_time DESC, user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per user with the average time.\n- The outer query applies the final sorting.\n\n## Difference from the optimal approach\n\nIt is more structured, but longer."
      },
      {
        "approach_title": "Filtered avg",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, AVG(resolution_time_mins) FILTER (WHERE resolution_time_mins IS NOT NULL) AS avg_resolution_time FROM support_tickets GROUP BY user_id HAVING AVG(resolution_time_mins) FILTER (WHERE resolution_time_mins IS NOT NULL) IS NOT NULL ORDER BY avg_resolution_time DESC, user_id ASC;",
        "explanation": "## Approach\n\nUse `FILTER` inside the aggregate and remove users whose filtered average is NULL.\n\n## Query\n\n```sql\nSELECT user_id,\n       AVG(resolution_time_mins) FILTER (WHERE resolution_time_mins IS NOT NULL) AS avg_resolution_time\nFROM support_tickets\nGROUP BY user_id\nHAVING AVG(resolution_time_mins) FILTER (WHERE resolution_time_mins IS NOT NULL) IS NOT NULL\nORDER BY avg_resolution_time DESC, user_id ASC;\n```\n\n## Explanation\n\n- `FILTER` tells `AVG` to use only non-null resolution times.\n- Grouping still happens by user.\n- The `HAVING` clause removes users whose filtered average is NULL.\n- This makes the result match the `WHERE resolution_time_mins IS NOT NULL` version.\n\n## Difference from the optimal approach\n\nUseful when combining multiple filtered aggregates, but less direct for a single average."
      }
    ]
  },
  {
    "code": "REALESTATE_039",
    "approaches": [
      {
        "approach_title": "Top converted",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT referrer_user_id, COUNT(*) AS converted_count FROM referrals WHERE referral_status = 'converted' GROUP BY referrer_user_id ORDER BY converted_count DESC, referrer_user_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep converted referrals, count them by referrer, then return the top 5.\n\n## Query\n\n```sql\nSELECT referrer_user_id, COUNT(*) AS converted_count\nFROM referrals\nWHERE referral_status = 'converted'\nGROUP BY referrer_user_id\nORDER BY converted_count DESC, referrer_user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE referral_status = 'converted'` keeps only successful referral outcomes.\n- `GROUP BY referrer_user_id` creates one group per referrer.\n- `COUNT(*)` counts converted referrals in each group.\n- `LIMIT 5` returns the top 5.\n\n## Why this is optimal\n\nIt is the most direct top-N grouped count solution."
      },
      {
        "approach_title": "CTE top referrers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH converted_referrals AS (\n  SELECT referrer_user_id, COUNT(*) AS converted_count\n  FROM referrals\n  WHERE referral_status = 'converted'\n  GROUP BY referrer_user_id\n)\nSELECT referrer_user_id, converted_count\nFROM converted_referrals\nORDER BY converted_count DESC, referrer_user_id ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute converted referral counts in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH converted_referrals AS (\n  SELECT referrer_user_id, COUNT(*) AS converted_count\n  FROM referrals\n  WHERE referral_status = 'converted'\n  GROUP BY referrer_user_id\n)\nSELECT referrer_user_id, converted_count\nFROM converted_referrals\nORDER BY converted_count DESC, referrer_user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one row per referrer.\n- The outer query applies ranking and top-5 logic.\n\n## Difference from the optimal approach\n\nIt is more modular, but adds an extra step."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT referrer_user_id, COUNT(id) AS converted_count FROM referrals WHERE referral_status = 'converted' GROUP BY referrer_user_id ORDER BY converted_count DESC, referrer_user_id ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount referral ids instead of rows.\n\n## Query\n\n```sql\nSELECT referrer_user_id, COUNT(id) AS converted_count\nFROM referrals\nWHERE referral_status = 'converted'\nGROUP BY referrer_user_id\nORDER BY converted_count DESC, referrer_user_id ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `COUNT(id)` works because the referral id is never NULL.\n- The grouped counts and ranking remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more natural for row counting."
      }
    ]
  },
  {
    "code": "REALESTATE_040",
    "approaches": [
      {
        "approach_title": "Top event cities",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT ae.city, COUNT(*) AS event_count FROM app_events ae WHERE ae.event_name = 'property_view' GROUP BY ae.city ORDER BY event_count DESC, ae.city ASC LIMIT 5;",
        "explanation": "## Approach\n\nKeep property view events, count them by city, then return the top 5 cities.\n\n## Query\n\n```sql\nSELECT ae.city, COUNT(*) AS event_count\nFROM app_events ae\nWHERE ae.event_name = 'property_view'\nGROUP BY ae.city\nORDER BY event_count DESC, ae.city ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- `WHERE ae.event_name = 'property_view'` keeps only property view events.\n- `GROUP BY ae.city` creates one group per city.\n- `COUNT(*)` counts events inside each city group.\n- `LIMIT 5` returns the top 5 cities.\n\n## Why this is optimal\n\nIt is the simplest way to solve a grouped top-N event analysis question."
      },
      {
        "approach_title": "CTE event cities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_event_counts AS (\n  SELECT ae.city, COUNT(*) AS event_count\n  FROM app_events ae\n  WHERE ae.event_name = 'property_view'\n  GROUP BY ae.city\n)\nSELECT city, event_count\nFROM city_event_counts\nORDER BY event_count DESC, city ASC\nLIMIT 5;",
        "explanation": "## Approach\n\nCompute event counts in a CTE, then sort and limit.\n\n## Query\n\n```sql\nWITH city_event_counts AS (\n  SELECT ae.city, COUNT(*) AS event_count\n  FROM app_events ae\n  WHERE ae.event_name = 'property_view'\n  GROUP BY ae.city\n)\nSELECT city, event_count\nFROM city_event_counts\nORDER BY event_count DESC, city ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per city.\n- The outer query handles ranking and top-5 logic.\n\n## Difference from the optimal approach\n\nIt works well, but is longer than needed."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT ae.city, COUNT(ae.id) AS event_count FROM app_events ae WHERE ae.event_name = 'property_view' GROUP BY ae.city ORDER BY event_count DESC, ae.city ASC LIMIT 5;",
        "explanation": "## Approach\n\nCount event ids by city after filtering property view events.\n\n## Query\n\n```sql\nSELECT ae.city, COUNT(ae.id) AS event_count\nFROM app_events ae\nWHERE ae.event_name = 'property_view'\nGROUP BY ae.city\nORDER BY event_count DESC, ae.city ASC\nLIMIT 5;\n```\n\n## Explanation\n\n- Since event ids are never NULL, `COUNT(ae.id)` matches `COUNT(*)`.\n- The grouping and ranking stay the same.\n\n## Difference from the optimal approach\n\nValid, but `COUNT(*)` is more direct for counting rows."
      }
    ]
  },
  {
    "code": "REALESTATE_041",
    "approaches": [
      {
        "approach_title": "Avg by city",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, AVG(l.rent_amount) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin listings to cities, keep live rentals, then calculate average rent per city.\n\n## Query\n\n```sql\nSELECT loc.city, AVG(l.rent_amount) AS avg_rent\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\n  AND l.rent_amount IS NOT NULL\nGROUP BY loc.city\nORDER BY avg_rent DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins connect each listing to its city.\n- The filters keep only live rental listings with a rent value.\n- `AVG(l.rent_amount)` computes the city-level average rent.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly follows the schema path and computes the grouped average in one query."
      },
      {
        "approach_title": "CTE city rent",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_rents AS (\n  SELECT loc.city, l.rent_amount\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n)\nSELECT city, AVG(rent_amount) AS avg_rent\nFROM city_rents\nGROUP BY city\nORDER BY avg_rent DESC, city ASC;",
        "explanation": "## Approach\n\nBuild a city and rent dataset first, then aggregate it.\n\n## Query\n\n```sql\nWITH city_rents AS (\n  SELECT loc.city, l.rent_amount\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n)\nSELECT city, AVG(rent_amount) AS avg_rent\nFROM city_rents\nGROUP BY city\nORDER BY avg_rent DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores each qualifying listing with its city.\n- The outer query averages rent per city.\n- The final sort matches the requirement.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but more verbose."
      },
      {
        "approach_title": "Case avg",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, AVG(CASE WHEN l.rent_amount IS NOT NULL THEN l.rent_amount END) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression so only non-null rents contribute to the average.\n\n## Query\n\n```sql\nSELECT loc.city,\n       AVG(CASE WHEN l.rent_amount IS NOT NULL THEN l.rent_amount END) AS avg_rent\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\nGROUP BY loc.city\nORDER BY avg_rent DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins and rental filters remain the same.\n- The `CASE` passes only rent values into `AVG`.\n- `AVG` ignores NULLs, so the result matches the main solution.\n\n## Difference from the optimal approach\n\nCorrect, but filtering NULL rents earlier is simpler."
      }
    ]
  },
  {
    "code": "REALESTATE_042",
    "approaches": [
      {
        "approach_title": "Group localities",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.locality, COUNT(*) AS listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' GROUP BY loc.locality ORDER BY listing_count DESC, loc.locality ASC;",
        "explanation": "## Approach\n\nJoin live listings to their localities and count listings per locality.\n\n## Query\n\n```sql\nSELECT loc.locality, COUNT(*) AS listing_count\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\nGROUP BY loc.locality\nORDER BY listing_count DESC, loc.locality ASC;\n```\n\n## Explanation\n\n- The joins map each listing to its locality.\n- The filter keeps only live listings.\n- `GROUP BY loc.locality` creates one group per locality.\n- `COUNT(*)` counts live listings in each locality.\n\n## Why this is optimal\n\nIt directly computes the grouped count from the normalized location model."
      },
      {
        "approach_title": "CTE locality count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH locality_listings AS (\n  SELECT loc.locality\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n)\nSELECT locality, COUNT(*) AS listing_count\nFROM locality_listings\nGROUP BY locality\nORDER BY listing_count DESC, locality ASC;",
        "explanation": "## Approach\n\nFirst collect live listing localities, then count them.\n\n## Query\n\n```sql\nWITH locality_listings AS (\n  SELECT loc.locality\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n)\nSELECT locality, COUNT(*) AS listing_count\nFROM locality_listings\nGROUP BY locality\nORDER BY listing_count DESC, locality ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per live listing with its locality.\n- The outer query aggregates those rows.\n\n## Difference from the optimal approach\n\nUseful for extension, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.locality, COUNT(l.id) AS listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' GROUP BY loc.locality ORDER BY listing_count DESC, loc.locality ASC;",
        "explanation": "## Approach\n\nCount listing ids after joining to location data.\n\n## Query\n\n```sql\nSELECT loc.locality, COUNT(l.id) AS listing_count\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\nGROUP BY loc.locality\nORDER BY listing_count DESC, loc.locality ASC;\n```\n\n## Explanation\n\n- `COUNT(l.id)` returns the same result because listing ids are never NULL.\n- The grouping and ordering remain unchanged.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is slightly more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_043",
    "approaches": [
      {
        "approach_title": "Distinct compare",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT pv.id) AS visit_count FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id LEFT JOIN property_visits pv ON l.id = pv.listing_id GROUP BY l.id HAVING COUNT(DISTINCT i.id) > COUNT(DISTINCT pv.id) ORDER BY inquiry_count DESC, l.id ASC;",
        "explanation": "## Approach\n\nJoin listings to inquiries and visits, count each side separately, then compare them.\n\n## Query\n\n```sql\nSELECT l.id,\n       COUNT(DISTINCT i.id) AS inquiry_count,\n       COUNT(DISTINCT pv.id) AS visit_count\nFROM listings l\nLEFT JOIN inquiries i ON l.id = i.listing_id\nLEFT JOIN property_visits pv ON l.id = pv.listing_id\nGROUP BY l.id\nHAVING COUNT(DISTINCT i.id) > COUNT(DISTINCT pv.id)\nORDER BY inquiry_count DESC, l.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all listings, even if one side has no rows.\n- `COUNT(DISTINCT ...)` avoids overcounting caused by joining two child tables together.\n- `HAVING` compares grouped inquiry and visit counts.\n\n## Why this is optimal\n\nIt handles join multiplication correctly and keeps the logic in one query."
      },
      {
        "approach_title": "CTE compare",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_counts AS (\n  SELECT l.id, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT pv.id) AS visit_count\n  FROM listings l\n  LEFT JOIN inquiries i ON l.id = i.listing_id\n  LEFT JOIN property_visits pv ON l.id = pv.listing_id\n  GROUP BY l.id\n)\nSELECT id, inquiry_count, visit_count\nFROM listing_counts\nWHERE inquiry_count > visit_count\nORDER BY inquiry_count DESC, id ASC;",
        "explanation": "## Approach\n\nCompute both counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH listing_counts AS (\n  SELECT l.id,\n         COUNT(DISTINCT i.id) AS inquiry_count,\n         COUNT(DISTINCT pv.id) AS visit_count\n  FROM listings l\n  LEFT JOIN inquiries i ON l.id = i.listing_id\n  LEFT JOIN property_visits pv ON l.id = pv.listing_id\n  GROUP BY l.id\n)\nSELECT id, inquiry_count, visit_count\nFROM listing_counts\nWHERE inquiry_count > visit_count\nORDER BY inquiry_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the two counts for each listing.\n- The outer query compares them and returns only matching rows.\n\n## Difference from the optimal approach\n\nIt is easier to read step by step, but longer."
      },
      {
        "approach_title": "Subquery counts",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.id, (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) AS inquiry_count, (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id) AS visit_count FROM listings l WHERE (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) > (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id) ORDER BY inquiry_count DESC, l.id ASC;",
        "explanation": "## Approach\n\nUse correlated subqueries to count inquiries and visits per listing.\n\n## Query\n\n```sql\nSELECT l.id,\n       (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) AS inquiry_count,\n       (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id) AS visit_count\nFROM listings l\nWHERE (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id)\n    > (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id)\nORDER BY inquiry_count DESC, l.id ASC;\n```\n\n## Explanation\n\n- Each subquery counts related rows for one listing.\n- The `WHERE` clause compares those two counts.\n\n## Difference from the optimal approach\n\nIt works, but repeated correlated subqueries are less efficient and less scalable."
      }
    ]
  },
  {
    "code": "REALESTATE_044",
    "approaches": [
      {
        "approach_title": "Sum sale value",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value FROM listings WHERE listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL GROUP BY owner_profile_id ORDER BY total_portfolio_value DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nKeep live sale listings and sum sale prices per owner.\n\n## Query\n\n```sql\nSELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value\nFROM listings\nWHERE listing_status = 'live'\n  AND listed_for = 'sale'\n  AND sale_price IS NOT NULL\nGROUP BY owner_profile_id\nORDER BY total_portfolio_value DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The filters keep only live sale listings with a non-null sale price.\n- `GROUP BY owner_profile_id` creates one group per owner.\n- `SUM(sale_price)` adds the sale prices across that owner's qualifying listings.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly computes the portfolio value from only the relevant rows."
      },
      {
        "approach_title": "CTE portfolio",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_portfolios AS (\n  SELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'sale'\n    AND sale_price IS NOT NULL\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, total_portfolio_value\nFROM owner_portfolios\nORDER BY total_portfolio_value DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute owner portfolio totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH owner_portfolios AS (\n  SELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value\n  FROM listings\n  WHERE listing_status = 'live'\n    AND listed_for = 'sale'\n    AND sale_price IS NOT NULL\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, total_portfolio_value\nFROM owner_portfolios\nORDER BY total_portfolio_value DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one portfolio total per owner.\n- The outer query applies the final ordering.\n- This pattern is helpful if more owner-level metrics are added later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but with an extra step."
      },
      {
        "approach_title": "Case with having",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT owner_profile_id, SUM(CASE WHEN listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL THEN sale_price ELSE 0 END) AS total_portfolio_value FROM listings GROUP BY owner_profile_id HAVING SUM(CASE WHEN listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL THEN 1 ELSE 0 END) > 0 ORDER BY total_portfolio_value DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nAggregate all listings, but add sale price only for qualifying live sale listings, then remove owners with no qualifying listings.\n\n## Query\n\n```sql\nSELECT owner_profile_id,\n       SUM(CASE WHEN listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL THEN sale_price ELSE 0 END) AS total_portfolio_value\nFROM listings\nGROUP BY owner_profile_id\nHAVING SUM(CASE WHEN listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL THEN 1 ELSE 0 END) > 0\nORDER BY total_portfolio_value DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The first `CASE` adds `sale_price` only for qualifying live sale listings.\n- Non-qualifying listings contribute 0.\n- The `HAVING` clause removes owners who do not have any qualifying listing rows.\n- This fixes the row-count issue from the earlier version, where owners with no live sale listings were still included with a zero total.\n\n## Difference from the optimal approach\n\nIt works correctly, but filtering rows first in `WHERE` is simpler and easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_045",
    "approaches": [
      {
        "approach_title": "Group seekers",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT seeker_user_id, COUNT(*) AS application_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(*) > 2 ORDER BY application_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCount applications per seeker and keep seekers with more than 2.\n\n## Query\n\n```sql\nSELECT seeker_user_id, COUNT(*) AS application_count\nFROM rental_applications\nGROUP BY seeker_user_id\nHAVING COUNT(*) > 2\nORDER BY application_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY seeker_user_id` creates one group per seeker.\n- `COUNT(*)` counts that seeker's applications.\n- `HAVING COUNT(*) > 2` keeps only frequent applicants.\n\n## Why this is optimal\n\nIt uses the standard grouped count plus `HAVING` pattern."
      },
      {
        "approach_title": "CTE seekers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH seeker_app_counts AS (\n  SELECT seeker_user_id, COUNT(*) AS application_count\n  FROM rental_applications\n  GROUP BY seeker_user_id\n)\nSELECT seeker_user_id, application_count\nFROM seeker_app_counts\nWHERE application_count > 2\nORDER BY application_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCompute application counts first, then filter outside.\n\n## Query\n\n```sql\nWITH seeker_app_counts AS (\n  SELECT seeker_user_id, COUNT(*) AS application_count\n  FROM rental_applications\n  GROUP BY seeker_user_id\n)\nSELECT seeker_user_id, application_count\nFROM seeker_app_counts\nWHERE application_count > 2\nORDER BY application_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one count per seeker.\n- The outer query filters to seekers above the threshold.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT seeker_user_id, COUNT(id) AS application_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(id) > 2 ORDER BY application_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCount application ids per seeker.\n\n## Query\n\n```sql\nSELECT seeker_user_id, COUNT(id) AS application_count\nFROM rental_applications\nGROUP BY seeker_user_id\nHAVING COUNT(id) > 2\nORDER BY application_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- Since `id` is never NULL, `COUNT(id)` matches `COUNT(*)`.\n- The group filter and order remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is cleaner."
      }
    ]
  },
  {
    "code": "REALESTATE_046",
    "approaches": [
      {
        "approach_title": "Group leases",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT property_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id ORDER BY lease_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCount lease rows for each property.\n\n## Query\n\n```sql\nSELECT property_id, COUNT(*) AS lease_count\nFROM leases\nGROUP BY property_id\nORDER BY lease_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY property_id` creates one group per property.\n- `COUNT(*)` returns how many leases each property had.\n- Sorting ranks the most leased properties first.\n\n## Why this is optimal\n\nIt is the simplest grouped count solution."
      },
      {
        "approach_title": "CTE lease count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH property_leases AS (\n  SELECT property_id, COUNT(*) AS lease_count\n  FROM leases\n  GROUP BY property_id\n)\nSELECT property_id, lease_count\nFROM property_leases\nORDER BY lease_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCompute lease counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH property_leases AS (\n  SELECT property_id, COUNT(*) AS lease_count\n  FROM leases\n  GROUP BY property_id\n)\nSELECT property_id, lease_count\nFROM property_leases\nORDER BY lease_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per property.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nIt works, but with extra structure."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT property_id, COUNT(id) AS lease_count FROM leases GROUP BY property_id ORDER BY lease_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCount lease ids in each property group.\n\n## Query\n\n```sql\nSELECT property_id, COUNT(id) AS lease_count\nFROM leases\nGROUP BY property_id\nORDER BY lease_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- Lease ids are never NULL, so `COUNT(id)` matches `COUNT(*)`.\n- The grouping result stays the same.\n\n## Difference from the optimal approach\n\nCorrect, but counting rows directly is more natural."
      }
    ]
  },
  {
    "code": "REALESTATE_047",
    "approaches": [
      {
        "approach_title": "Join unpaid sum",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount FROM rent_payments rp JOIN leases l ON rp.lease_id = l.id WHERE l.lease_status = 'active' AND rp.amount_paid < rp.amount_due GROUP BY rp.lease_id ORDER BY unpaid_amount DESC, rp.lease_id ASC;",
        "explanation": "## Approach\n\nJoin rent payments to active leases, then sum the unpaid amount per lease.\n\n## Query\n\n```sql\nSELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount\nFROM rent_payments rp\nJOIN leases l ON rp.lease_id = l.id\nWHERE l.lease_status = 'active'\n  AND rp.amount_paid < rp.amount_due\nGROUP BY rp.lease_id\nORDER BY unpaid_amount DESC, rp.lease_id ASC;\n```\n\n## Explanation\n\n- The join keeps lease status available for filtering.\n- `amount_due - amount_paid` gives the unpaid amount for one payment row.\n- `SUM(...)` adds unpaid balances per lease.\n- The filter removes fully paid rows.\n\n## Why this is optimal\n\nIt directly matches the business logic and aggregates only relevant rows."
      },
      {
        "approach_title": "CTE unpaid",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH unpaid_rows AS (\n  SELECT rp.lease_id, rp.amount_due - rp.amount_paid AS unpaid_part\n  FROM rent_payments rp\n  JOIN leases l ON rp.lease_id = l.id\n  WHERE l.lease_status = 'active'\n    AND rp.amount_paid < rp.amount_due\n)\nSELECT lease_id, SUM(unpaid_part) AS unpaid_amount\nFROM unpaid_rows\nGROUP BY lease_id\nORDER BY unpaid_amount DESC, lease_id ASC;",
        "explanation": "## Approach\n\nCalculate unpaid parts first, then add them per lease.\n\n## Query\n\n```sql\nWITH unpaid_rows AS (\n  SELECT rp.lease_id, rp.amount_due - rp.amount_paid AS unpaid_part\n  FROM rent_payments rp\n  JOIN leases l ON rp.lease_id = l.id\n  WHERE l.lease_status = 'active'\n    AND rp.amount_paid < rp.amount_due\n)\nSELECT lease_id, SUM(unpaid_part) AS unpaid_amount\nFROM unpaid_rows\nGROUP BY lease_id\nORDER BY unpaid_amount DESC, lease_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one unpaid value per payment row.\n- The outer query rolls those up to the lease level.\n\n## Difference from the optimal approach\n\nThis is more step-by-step, but longer."
      },
      {
        "approach_title": "Having unpaid",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount FROM rent_payments rp JOIN leases l ON rp.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY rp.lease_id HAVING SUM(rp.amount_due - rp.amount_paid) > 0 ORDER BY unpaid_amount DESC, rp.lease_id ASC;",
        "explanation": "## Approach\n\nAggregate all active-lease payments, then keep only leases with a positive unpaid total.\n\n## Query\n\n```sql\nSELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount\nFROM rent_payments rp\nJOIN leases l ON rp.lease_id = l.id\nWHERE l.lease_status = 'active'\nGROUP BY rp.lease_id\nHAVING SUM(rp.amount_due - rp.amount_paid) > 0\nORDER BY unpaid_amount DESC, rp.lease_id ASC;\n```\n\n## Explanation\n\n- This includes all payment rows for active leases.\n- `HAVING` removes leases whose total unpaid amount is not positive.\n\n## Difference from the optimal approach\n\nIt is valid, but filters less precisely than removing fully paid rows earlier."
      }
    ]
  },
  {
    "code": "REALESTATE_048",
    "approaches": [
      {
        "approach_title": "Group open tickets",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT assigned_executive_user_id, COUNT(*) AS ticket_count FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') AND assigned_executive_user_id IS NOT NULL GROUP BY assigned_executive_user_id ORDER BY ticket_count DESC, assigned_executive_user_id ASC;",
        "explanation": "## Approach\n\nKeep open maintenance tickets with an assigned executive, then count tickets per executive.\n\n## Query\n\n```sql\nSELECT assigned_executive_user_id, COUNT(*) AS ticket_count\nFROM maintenance_tickets\nWHERE ticket_status IN ('open', 'assigned', 'in_progress')\n  AND assigned_executive_user_id IS NOT NULL\nGROUP BY assigned_executive_user_id\nORDER BY ticket_count DESC, assigned_executive_user_id ASC;\n```\n\n## Explanation\n\n- The status filter keeps unfinished tickets only.\n- `assigned_executive_user_id IS NOT NULL` removes unassigned tickets.\n- `GROUP BY` and `COUNT(*)` calculate the workload per executive.\n\n## Why this is optimal\n\nIt directly answers the workload question with simple grouped counting."
      },
      {
        "approach_title": "CTE workload",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH executive_ticket_counts AS (\n  SELECT assigned_executive_user_id, COUNT(*) AS ticket_count\n  FROM maintenance_tickets\n  WHERE ticket_status IN ('open', 'assigned', 'in_progress')\n    AND assigned_executive_user_id IS NOT NULL\n  GROUP BY assigned_executive_user_id\n)\nSELECT assigned_executive_user_id, ticket_count\nFROM executive_ticket_counts\nORDER BY ticket_count DESC, assigned_executive_user_id ASC;",
        "explanation": "## Approach\n\nCompute each executive's open ticket count in a CTE.\n\n## Query\n\n```sql\nWITH executive_ticket_counts AS (\n  SELECT assigned_executive_user_id, COUNT(*) AS ticket_count\n  FROM maintenance_tickets\n  WHERE ticket_status IN ('open', 'assigned', 'in_progress')\n    AND assigned_executive_user_id IS NOT NULL\n  GROUP BY assigned_executive_user_id\n)\nSELECT assigned_executive_user_id, ticket_count\nFROM executive_ticket_counts\nORDER BY ticket_count DESC, assigned_executive_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per executive.\n- The outer query sorts the workload from highest to lowest.\n\n## Difference from the optimal approach\n\nUseful for extension, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT assigned_executive_user_id, COUNT(id) AS ticket_count FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') AND assigned_executive_user_id IS NOT NULL GROUP BY assigned_executive_user_id ORDER BY ticket_count DESC, assigned_executive_user_id ASC;",
        "explanation": "## Approach\n\nCount ticket ids instead of rows.\n\n## Query\n\n```sql\nSELECT assigned_executive_user_id, COUNT(id) AS ticket_count\nFROM maintenance_tickets\nWHERE ticket_status IN ('open', 'assigned', 'in_progress')\n  AND assigned_executive_user_id IS NOT NULL\nGROUP BY assigned_executive_user_id\nORDER BY ticket_count DESC, assigned_executive_user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` matches `COUNT(*)` because ticket ids are never NULL.\n- The grouping logic stays the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_049",
    "approaches": [
      {
        "approach_title": "Group amenities",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT property_id, COUNT(*) AS amenity_count FROM property_amenities GROUP BY property_id HAVING COUNT(*) > 3 ORDER BY amenity_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCount amenity mappings per property and keep properties with more than 3.\n\n## Query\n\n```sql\nSELECT property_id, COUNT(*) AS amenity_count\nFROM property_amenities\nGROUP BY property_id\nHAVING COUNT(*) > 3\nORDER BY amenity_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY property_id` creates one group per property.\n- `COUNT(*)` counts how many amenity rows each property has.\n- `HAVING COUNT(*) > 3` keeps only properties above the threshold.\n\n## Why this is optimal\n\nIt is the standard grouped count plus `HAVING` solution."
      },
      {
        "approach_title": "CTE amenity count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH property_amenity_counts AS (\n  SELECT property_id, COUNT(*) AS amenity_count\n  FROM property_amenities\n  GROUP BY property_id\n)\nSELECT property_id, amenity_count\nFROM property_amenity_counts\nWHERE amenity_count > 3\nORDER BY amenity_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCompute amenity counts first, then filter outside.\n\n## Query\n\n```sql\nWITH property_amenity_counts AS (\n  SELECT property_id, COUNT(*) AS amenity_count\n  FROM property_amenities\n  GROUP BY property_id\n)\nSELECT property_id, amenity_count\nFROM property_amenity_counts\nWHERE amenity_count > 3\nORDER BY amenity_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per property.\n- The outer query applies the threshold and sort.\n\n## Difference from the optimal approach\n\nClear, but longer than using `HAVING` directly."
      },
      {
        "approach_title": "Count amenity ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT property_id, COUNT(amenity_id) AS amenity_count FROM property_amenities GROUP BY property_id HAVING COUNT(amenity_id) > 3 ORDER BY amenity_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nCount amenity ids inside each property group.\n\n## Query\n\n```sql\nSELECT property_id, COUNT(amenity_id) AS amenity_count\nFROM property_amenities\nGROUP BY property_id\nHAVING COUNT(amenity_id) > 3\nORDER BY amenity_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- Since `amenity_id` is required in the mapping table, counting it works like counting rows.\n- The grouped result is the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is simpler for row counts."
      }
    ]
  },
  {
    "code": "REALESTATE_050",
    "approaches": [
      {
        "approach_title": "Left join live",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id AND l.listing_status = 'live' WHERE l.id IS NULL ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nLeft join owners to only their live listings, then keep owners with no match.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nLEFT JOIN listings l\n  ON op.id = l.owner_profile_id\n AND l.listing_status = 'live'\nWHERE l.id IS NULL\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The join condition includes `listing_status = 'live'`, so only live listings can match.\n- Owners without any live listing get NULL values from `listings`.\n- `WHERE l.id IS NULL` keeps only those owners.\n\n## Why this is optimal\n\nThis is the cleanest anti-join pattern for finding owners without live listings."
      },
      {
        "approach_title": "Not exists live",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op WHERE NOT EXISTS (SELECT 1 FROM listings l WHERE l.owner_profile_id = op.id AND l.listing_status = 'live') ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nReturn owners for whom no live listing exists.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM listings l\n  WHERE l.owner_profile_id = op.id\n    AND l.listing_status = 'live'\n)\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the owner has a live listing.\n- `NOT EXISTS` keeps owners with no live match.\n\n## Difference from the optimal approach\n\nAlso correct, but the left join version is often easier for learners to visualize."
      },
      {
        "approach_title": "Group having zero",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id GROUP BY op.id, op.user_id HAVING COUNT(*) FILTER (WHERE l.listing_status = 'live') = 0 ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nJoin owners to all listings, then keep owners whose live listing count is zero.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nLEFT JOIN listings l ON op.id = l.owner_profile_id\nGROUP BY op.id, op.user_id\nHAVING COUNT(*) FILTER (WHERE l.listing_status = 'live') = 0\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The join brings in all listings per owner.\n- The filtered count only counts live listings.\n- `HAVING ... = 0` keeps owners with no live listings.\n\n## Difference from the optimal approach\n\nFlexible, but more complex than the focused anti-join."
      }
    ]
  },
  {
    "code": "REALESTATE_051",
    "approaches": [
      {
        "approach_title": "Group repeat views",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT user_id, listing_id, COUNT(*) AS view_count FROM property_views WHERE user_id IS NOT NULL GROUP BY user_id, listing_id HAVING COUNT(*) > 1 ORDER BY view_count DESC, user_id ASC, listing_id ASC;",
        "explanation": "## Approach\n\nGroup views by user and listing, then keep combinations viewed more than once.\n\n## Query\n\n```sql\nSELECT user_id, listing_id, COUNT(*) AS view_count\nFROM property_views\nWHERE user_id IS NOT NULL\nGROUP BY user_id, listing_id\nHAVING COUNT(*) > 1\nORDER BY view_count DESC, user_id ASC, listing_id ASC;\n```\n\n## Explanation\n\n- `WHERE user_id IS NOT NULL` removes anonymous views.\n- `GROUP BY user_id, listing_id` creates one group per user-listing pair.\n- `COUNT(*)` counts how many times that user viewed that listing.\n- `HAVING COUNT(*) > 1` keeps only repeated viewers.\n\n## Why this is optimal\n\nIt directly captures repeated viewing behavior with a grouped count."
      },
      {
        "approach_title": "CTE repeat views",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH user_listing_views AS (\n  SELECT user_id, listing_id, COUNT(*) AS view_count\n  FROM property_views\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id, listing_id\n)\nSELECT user_id, listing_id, view_count\nFROM user_listing_views\nWHERE view_count > 1\nORDER BY view_count DESC, user_id ASC, listing_id ASC;",
        "explanation": "## Approach\n\nCompute the grouped counts first, then filter outside.\n\n## Query\n\n```sql\nWITH user_listing_views AS (\n  SELECT user_id, listing_id, COUNT(*) AS view_count\n  FROM property_views\n  WHERE user_id IS NOT NULL\n  GROUP BY user_id, listing_id\n)\nSELECT user_id, listing_id, view_count\nFROM user_listing_views\nWHERE view_count > 1\nORDER BY view_count DESC, user_id ASC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per user-listing pair.\n- The outer query keeps only pairs with more than one view.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer than using `HAVING` directly."
      },
      {
        "approach_title": "Count view ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT user_id, listing_id, COUNT(id) AS view_count FROM property_views WHERE user_id IS NOT NULL GROUP BY user_id, listing_id HAVING COUNT(id) > 1 ORDER BY view_count DESC, user_id ASC, listing_id ASC;",
        "explanation": "## Approach\n\nCount view ids instead of counting rows.\n\n## Query\n\n```sql\nSELECT user_id, listing_id, COUNT(id) AS view_count\nFROM property_views\nWHERE user_id IS NOT NULL\nGROUP BY user_id, listing_id\nHAVING COUNT(id) > 1\nORDER BY view_count DESC, user_id ASC, listing_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` works because the primary key is never NULL.\n- The grouping and filtering logic remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct for row counts."
      }
    ]
  },
  {
    "code": "REALESTATE_052",
    "approaches": [
      {
        "approach_title": "Group offers",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS offer_count FROM offers GROUP BY listing_id HAVING COUNT(*) > 2 ORDER BY offer_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount offers per listing and keep listings with more than 2 offers.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS offer_count\nFROM offers\nGROUP BY listing_id\nHAVING COUNT(*) > 2\nORDER BY offer_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` counts offers in each group.\n- `HAVING COUNT(*) > 2` keeps only heavily negotiated listings.\n\n## Why this is optimal\n\nIt is the standard grouped count with a threshold filter."
      },
      {
        "approach_title": "CTE offers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_offer_counts AS (\n  SELECT listing_id, COUNT(*) AS offer_count\n  FROM offers\n  GROUP BY listing_id\n)\nSELECT listing_id, offer_count\nFROM listing_offer_counts\nWHERE offer_count > 2\nORDER BY offer_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCompute offer counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH listing_offer_counts AS (\n  SELECT listing_id, COUNT(*) AS offer_count\n  FROM offers\n  GROUP BY listing_id\n)\nSELECT listing_id, offer_count\nFROM listing_offer_counts\nWHERE offer_count > 2\nORDER BY offer_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per listing with its offer count.\n- The outer query filters and sorts the grouped result.\n\n## Difference from the optimal approach\n\nIt is clear, but longer than using `HAVING` directly."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT listing_id, COUNT(id) AS offer_count FROM offers GROUP BY listing_id HAVING COUNT(id) > 2 ORDER BY offer_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount offer ids in each listing group.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(id) AS offer_count\nFROM offers\nGROUP BY listing_id\nHAVING COUNT(id) > 2\nORDER BY offer_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` gives the same result because offer ids are never NULL.\n- The grouped result remains unchanged.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is the cleaner style."
      }
    ]
  },
  {
    "code": "REALESTATE_053",
    "approaches": [
      {
        "approach_title": "Rejected count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT seeker_user_id, COUNT(*) AS rejected_count FROM rental_applications WHERE application_status = 'rejected' GROUP BY seeker_user_id HAVING COUNT(*) > 1 ORDER BY rejected_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nKeep rejected applications only, then count them per seeker.\n\n## Query\n\n```sql\nSELECT seeker_user_id, COUNT(*) AS rejected_count\nFROM rental_applications\nWHERE application_status = 'rejected'\nGROUP BY seeker_user_id\nHAVING COUNT(*) > 1\nORDER BY rejected_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only rejected applications.\n- Grouping by `seeker_user_id` creates one group per seeker.\n- `HAVING COUNT(*) > 1` keeps seekers rejected more than once.\n\n## Why this is optimal\n\nIt is the shortest and clearest solution."
      },
      {
        "approach_title": "CTE rejected",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH seeker_rejections AS (\n  SELECT seeker_user_id, COUNT(*) AS rejected_count\n  FROM rental_applications\n  WHERE application_status = 'rejected'\n  GROUP BY seeker_user_id\n)\nSELECT seeker_user_id, rejected_count\nFROM seeker_rejections\nWHERE rejected_count > 1\nORDER BY rejected_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCount rejected applications in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH seeker_rejections AS (\n  SELECT seeker_user_id, COUNT(*) AS rejected_count\n  FROM rental_applications\n  WHERE application_status = 'rejected'\n  GROUP BY seeker_user_id\n)\nSELECT seeker_user_id, rejected_count\nFROM seeker_rejections\nWHERE rejected_count > 1\nORDER BY rejected_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores rejection counts per seeker.\n- The outer query keeps only seekers above the threshold.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT seeker_user_id, COUNT(id) AS rejected_count FROM rental_applications WHERE application_status = 'rejected' GROUP BY seeker_user_id HAVING COUNT(id) > 1 ORDER BY rejected_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCount application ids instead of counting rows.\n\n## Query\n\n```sql\nSELECT seeker_user_id, COUNT(id) AS rejected_count\nFROM rental_applications\nWHERE application_status = 'rejected'\nGROUP BY seeker_user_id\nHAVING COUNT(id) > 1\nORDER BY rejected_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- `COUNT(id)` works because application ids are never NULL.\n- The grouped result stays the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_054",
    "approaches": [
      {
        "approach_title": "Group issue cost",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost FROM maintenance_tickets GROUP BY issue_type ORDER BY total_cost DESC, issue_type ASC;",
        "explanation": "## Approach\n\nGroup maintenance tickets by issue type and sum their costs.\n\n## Query\n\n```sql\nSELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost\nFROM maintenance_tickets\nGROUP BY issue_type\nORDER BY total_cost DESC, issue_type ASC;\n```\n\n## Explanation\n\n- `GROUP BY issue_type` creates one group per issue type.\n- `COALESCE(resolution_cost, 0)` treats missing costs as 0.\n- `SUM(...)` gives the total cost for each issue type.\n\n## Why this is optimal\n\nIt safely handles NULL values and computes the grouped total in one step."
      },
      {
        "approach_title": "CTE issue cost",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH issue_costs AS (\n  SELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost\n  FROM maintenance_tickets\n  GROUP BY issue_type\n)\nSELECT issue_type, total_cost\nFROM issue_costs\nORDER BY total_cost DESC, issue_type ASC;",
        "explanation": "## Approach\n\nCalculate cost totals in a CTE, then sort the result.\n\n## Query\n\n```sql\nWITH issue_costs AS (\n  SELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost\n  FROM maintenance_tickets\n  GROUP BY issue_type\n)\nSELECT issue_type, total_cost\nFROM issue_costs\nORDER BY total_cost DESC, issue_type ASC;\n```\n\n## Explanation\n\n- The CTE stores one total per issue type.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt works well, but is more verbose."
      },
      {
        "approach_title": "Case sum",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT issue_type, SUM(CASE WHEN resolution_cost IS NULL THEN 0 ELSE resolution_cost END) AS total_cost FROM maintenance_tickets GROUP BY issue_type ORDER BY total_cost DESC, issue_type ASC;",
        "explanation": "## Approach\n\nReplace NULL costs with 0 using `CASE`, then sum them.\n\n## Query\n\n```sql\nSELECT issue_type,\n       SUM(CASE WHEN resolution_cost IS NULL THEN 0 ELSE resolution_cost END) AS total_cost\nFROM maintenance_tickets\nGROUP BY issue_type\nORDER BY total_cost DESC, issue_type ASC;\n```\n\n## Explanation\n\n- The `CASE` expression handles missing costs.\n- `SUM` then adds the cleaned values per issue type.\n\n## Difference from the optimal approach\n\nIt works the same way, but `COALESCE` is shorter and cleaner."
      }
    ]
  },
  {
    "code": "REALESTATE_055",
    "approaches": [
      {
        "approach_title": "Filter expired",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, listing_id, seeker_user_id, expires_at FROM offers WHERE offer_status = 'pending' AND expires_at IS NOT NULL AND expires_at < NOW() ORDER BY expires_at ASC, id ASC;",
        "explanation": "## Approach\n\nKeep pending offers whose expiry time has already passed.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id, expires_at\nFROM offers\nWHERE offer_status = 'pending'\n  AND expires_at IS NOT NULL\n  AND expires_at < NOW()\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- `offer_status = 'pending'` keeps offers without a final response.\n- `expires_at < NOW()` keeps only expired ones.\n- The null check avoids comparing missing expiry values.\n\n## Why this is optimal\n\nIt directly matches the business condition of expired pending offers."
      },
      {
        "approach_title": "CTE expired",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH expired_offers AS (\n  SELECT id, listing_id, seeker_user_id, expires_at\n  FROM offers\n  WHERE offer_status = 'pending'\n    AND expires_at IS NOT NULL\n    AND expires_at < NOW()\n)\nSELECT id, listing_id, seeker_user_id, expires_at\nFROM expired_offers\nORDER BY expires_at ASC, id ASC;",
        "explanation": "## Approach\n\nStore expired pending offers in a CTE, then return them.\n\n## Query\n\n```sql\nWITH expired_offers AS (\n  SELECT id, listing_id, seeker_user_id, expires_at\n  FROM offers\n  WHERE offer_status = 'pending'\n    AND expires_at IS NOT NULL\n    AND expires_at < NOW()\n)\nSELECT id, listing_id, seeker_user_id, expires_at\nFROM expired_offers\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the matching offers.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nIt is clear, but longer."
      },
      {
        "approach_title": "Current timestamp",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, listing_id, seeker_user_id, expires_at FROM offers WHERE offer_status = 'pending' AND expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP ORDER BY expires_at ASC, id ASC;",
        "explanation": "## Approach\n\nCompare expiry time against `CURRENT_TIMESTAMP`.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id, expires_at\nFROM offers\nWHERE offer_status = 'pending'\n  AND expires_at IS NOT NULL\n  AND expires_at < CURRENT_TIMESTAMP\nORDER BY expires_at ASC, id ASC;\n```\n\n## Explanation\n\n- `CURRENT_TIMESTAMP` is equivalent in meaning here.\n- The filter logic and output remain the same.\n\n## Difference from the optimal approach\n\nIt works the same, but `NOW()` is shorter."
      }
    ]
  },
  {
    "code": "REALESTATE_056",
    "approaches": [
      {
        "approach_title": "Join city leases",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, COUNT(*) AS lease_count FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY lease_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin active leases to property locations, then count them by city.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(*) AS lease_count\nFROM leases le\nJOIN properties p ON le.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE le.lease_status = 'active'\nGROUP BY loc.city\nORDER BY lease_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins map each lease to a property and then a city.\n- The filter keeps only active leases.\n- `GROUP BY loc.city` creates one group per city.\n- `COUNT(*)` counts active leases inside each group.\n\n## Why this is optimal\n\nIt follows the schema relationships directly and is easy to read."
      },
      {
        "approach_title": "CTE city leases",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_lease_cities AS (\n  SELECT loc.city\n  FROM leases le\n  JOIN properties p ON le.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE le.lease_status = 'active'\n)\nSELECT city, COUNT(*) AS lease_count\nFROM active_lease_cities\nGROUP BY city\nORDER BY lease_count DESC, city ASC;",
        "explanation": "## Approach\n\nBuild a city-level active lease dataset first, then aggregate it.\n\n## Query\n\n```sql\nWITH active_lease_cities AS (\n  SELECT loc.city\n  FROM leases le\n  JOIN properties p ON le.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE le.lease_status = 'active'\n)\nSELECT city, COUNT(*) AS lease_count\nFROM active_lease_cities\nGROUP BY city\nORDER BY lease_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per active lease with its city.\n- The outer query counts rows per city.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Count lease ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, COUNT(le.id) AS lease_count FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY lease_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nCount active lease ids after joining to city information.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(le.id) AS lease_count\nFROM leases le\nJOIN properties p ON le.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE le.lease_status = 'active'\nGROUP BY loc.city\nORDER BY lease_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- `COUNT(le.id)` matches `COUNT(*)` because lease ids are never NULL.\n- The grouping and sorting remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_057",
    "approaches": [
      {
        "approach_title": "Join inquiries",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count FROM listings l JOIN inquiries i ON l.id = i.listing_id GROUP BY l.owner_profile_id ORDER BY inquiry_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin listings to inquiries, then count inquiries per owner.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count\nFROM listings l\nJOIN inquiries i ON l.id = i.listing_id\nGROUP BY l.owner_profile_id\nORDER BY inquiry_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join attaches each inquiry to the owner of its listing.\n- `GROUP BY l.owner_profile_id` creates one group per owner.\n- `COUNT(i.id)` counts inquiries received by that owner's listings.\n\n## Why this is optimal\n\nIt directly traces demand from inquiries back to listing owners."
      },
      {
        "approach_title": "Count rows",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT l.owner_profile_id, COUNT(*) AS inquiry_count FROM listings l JOIN inquiries i ON l.id = i.listing_id GROUP BY l.owner_profile_id ORDER BY inquiry_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nCount joined rows after linking listings and inquiries.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(*) AS inquiry_count\nFROM listings l\nJOIN inquiries i ON l.id = i.listing_id\nGROUP BY l.owner_profile_id\nORDER BY inquiry_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- Each joined row represents one inquiry tied to one owner.\n- Counting rows produces the same result as counting inquiry ids.\n\n## Difference from the optimal approach\n\nAlso correct. Counting `i.id` makes the business meaning a little more explicit."
      },
      {
        "approach_title": "CTE owner demand",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH owner_inquiries AS (\n  SELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count\n  FROM listings l\n  JOIN inquiries i ON l.id = i.listing_id\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, inquiry_count\nFROM owner_inquiries\nORDER BY inquiry_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute inquiry totals per owner in a CTE, then return them.\n\n## Query\n\n```sql\nWITH owner_inquiries AS (\n  SELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count\n  FROM listings l\n  JOIN inquiries i ON l.id = i.listing_id\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, inquiry_count\nFROM owner_inquiries\nORDER BY inquiry_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per owner.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_058",
    "approaches": [
      {
        "approach_title": "Left join zero",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id, l.property_id FROM listings l LEFT JOIN property_views pv ON l.id = pv.listing_id WHERE l.listing_status = 'live' GROUP BY l.id, l.property_id HAVING COUNT(pv.id) = 0 ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nLeft join live listings to views, then keep listings with zero matched views.\n\n## Query\n\n```sql\nSELECT l.id, l.property_id\nFROM listings l\nLEFT JOIN property_views pv ON l.id = pv.listing_id\nWHERE l.listing_status = 'live'\nGROUP BY l.id, l.property_id\nHAVING COUNT(pv.id) = 0\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps all live listings.\n- Listings with no views get NULL values from `property_views`.\n- `COUNT(pv.id) = 0` identifies listings with no matched view rows.\n\n## Why this is optimal\n\nIt is a clear anti-join pattern that still keeps grouping explicit."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT l.id, l.property_id FROM listings l WHERE l.listing_status = 'live' AND NOT EXISTS (SELECT 1 FROM property_views pv WHERE pv.listing_id = l.id) ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nReturn live listings for which no property view row exists.\n\n## Query\n\n```sql\nSELECT l.id, l.property_id\nFROM listings l\nWHERE l.listing_status = 'live'\n  AND NOT EXISTS (\n    SELECT 1\n    FROM property_views pv\n    WHERE pv.listing_id = l.id\n  )\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether the listing has any view.\n- `NOT EXISTS` keeps only listings with no views.\n\n## Difference from the optimal approach\n\nAlso a strong solution, but the grouped left join stays closer to the expected query style."
      },
      {
        "approach_title": "Left join null",
        "approach_type": "anti_join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.id, l.property_id FROM listings l LEFT JOIN property_views pv ON l.id = pv.listing_id WHERE l.listing_status = 'live' AND pv.id IS NULL ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nUse a left join and keep only rows where no view matched.\n\n## Query\n\n```sql\nSELECT l.id, l.property_id\nFROM listings l\nLEFT JOIN property_views pv ON l.id = pv.listing_id\nWHERE l.listing_status = 'live'\n  AND pv.id IS NULL\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps live listings even without views.\n- `pv.id IS NULL` identifies listings with no related view rows.\n\n## Difference from the optimal approach\n\nThis is also correct and shorter, but the grouped version makes the zero-count logic more explicit."
      }
    ]
  },
  {
    "code": "REALESTATE_059",
    "approaches": [
      {
        "approach_title": "Luxury city count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, COUNT(*) AS luxury_listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount > 100000 GROUP BY loc.city HAVING COUNT(*) >= 3 ORDER BY luxury_listing_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin listings to cities, keep luxury rentals, then count them per city.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(*) AS luxury_listing_count\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\n  AND l.rent_amount > 100000\nGROUP BY loc.city\nHAVING COUNT(*) >= 3\nORDER BY luxury_listing_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins map each listing to its city.\n- The filters keep only live rental listings above the luxury threshold.\n- `HAVING COUNT(*) >= 3` keeps cities with at least 3 such listings.\n\n## Why this is optimal\n\nIt directly combines join, filter, group, and threshold logic."
      },
      {
        "approach_title": "CTE luxury cities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH luxury_city_counts AS (\n  SELECT loc.city, COUNT(*) AS luxury_listing_count\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount > 100000\n  GROUP BY loc.city\n)\nSELECT city, luxury_listing_count\nFROM luxury_city_counts\nWHERE luxury_listing_count >= 3\nORDER BY luxury_listing_count DESC, city ASC;",
        "explanation": "## Approach\n\nCompute luxury listing counts in a CTE, then filter outside.\n\n## Query\n\n```sql\nWITH luxury_city_counts AS (\n  SELECT loc.city, COUNT(*) AS luxury_listing_count\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount > 100000\n  GROUP BY loc.city\n)\nSELECT city, luxury_listing_count\nFROM luxury_city_counts\nWHERE luxury_listing_count >= 3\nORDER BY luxury_listing_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores grouped city counts.\n- The outer query applies the threshold and final ordering.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Count listing ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, COUNT(l.id) AS luxury_listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount > 100000 GROUP BY loc.city HAVING COUNT(l.id) >= 3 ORDER BY luxury_listing_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nCount listing ids inside each city group.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(l.id) AS luxury_listing_count\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\n  AND l.rent_amount > 100000\nGROUP BY loc.city\nHAVING COUNT(l.id) >= 3\nORDER BY luxury_listing_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- `COUNT(l.id)` matches `COUNT(*)` because listing ids are never NULL.\n- The grouped threshold logic stays the same.\n\n## Difference from the optimal approach\n\nCorrect, but counting rows directly is slightly cleaner."
      }
    ]
  },
  {
    "code": "REALESTATE_060",
    "approaches": [
      {
        "approach_title": "Verified no live",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id AND l.listing_status = 'live' WHERE op.verification_status = 'verified' AND l.id IS NULL ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nKeep verified owners, left join only their live listings, then return owners with no match.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nLEFT JOIN listings l\n  ON op.id = l.owner_profile_id\n AND l.listing_status = 'live'\nWHERE op.verification_status = 'verified'\n  AND l.id IS NULL\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The owner filter keeps only verified owners.\n- The join condition matches only live listings.\n- If no live listing exists, the listing side is NULL.\n- `l.id IS NULL` identifies verified owners without live listings.\n\n## Why this is optimal\n\nIt is the cleanest anti-join pattern for this business rule."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op WHERE op.verification_status = 'verified' AND NOT EXISTS (SELECT 1 FROM listings l WHERE l.owner_profile_id = op.id AND l.listing_status = 'live') ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nReturn verified owners for whom no live listing exists.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nWHERE op.verification_status = 'verified'\n  AND NOT EXISTS (\n    SELECT 1\n    FROM listings l\n    WHERE l.owner_profile_id = op.id\n      AND l.listing_status = 'live'\n  )\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The subquery checks whether a verified owner has any live listing.\n- `NOT EXISTS` keeps only owners without one.\n\n## Difference from the optimal approach\n\nAlso correct, but the left join version is often easier to follow."
      },
      {
        "approach_title": "Group live zero",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id WHERE op.verification_status = 'verified' GROUP BY op.id, op.user_id HAVING COUNT(*) FILTER (WHERE l.listing_status = 'live') = 0 ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nJoin verified owners to all listings, then keep those whose live listing count is zero.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nLEFT JOIN listings l ON op.id = l.owner_profile_id\nWHERE op.verification_status = 'verified'\nGROUP BY op.id, op.user_id\nHAVING COUNT(*) FILTER (WHERE l.listing_status = 'live') = 0\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The join brings in all listings for verified owners.\n- The filtered count only counts live listings.\n- `HAVING ... = 0` keeps owners with no live listings.\n\n## Difference from the optimal approach\n\nFlexible, but more complex than the focused anti-join."
      }
    ]
  },
  {
    "code": "REALESTATE_061",
    "approaches": [
      {
        "approach_title": "Sum active rent",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue FROM leases WHERE lease_status = 'active' GROUP BY owner_profile_id ORDER BY total_rent_revenue DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nKeep active leases and sum monthly rent per owner.\n\n## Query\n\n```sql\nSELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue\nFROM leases\nWHERE lease_status = 'active'\nGROUP BY owner_profile_id\nORDER BY total_rent_revenue DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- `WHERE lease_status = 'active'` keeps only active leases.\n- `GROUP BY owner_profile_id` creates one group per owner.\n- `SUM(monthly_rent)` adds the rent values inside each owner group.\n- The ordering matches the expected result.\n\n## Why this is optimal\n\nIt directly computes revenue from only the relevant lease rows."
      },
      {
        "approach_title": "CTE owner rent",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_revenue AS (\n  SELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue\n  FROM leases\n  WHERE lease_status = 'active'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, total_rent_revenue\nFROM owner_revenue\nORDER BY total_rent_revenue DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute owner revenue in a CTE, then return it.\n\n## Query\n\n```sql\nWITH owner_revenue AS (\n  SELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue\n  FROM leases\n  WHERE lease_status = 'active'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id, total_rent_revenue\nFROM owner_revenue\nORDER BY total_rent_revenue DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one revenue row per owner.\n- The outer query applies the final ordering.\n- This pattern is useful if more owner-level calculations are added later.\n\n## Difference from the optimal approach\n\nIt returns the same result, but with an extra step."
      },
      {
        "approach_title": "Case with having",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT owner_profile_id, SUM(CASE WHEN lease_status = 'active' THEN monthly_rent ELSE 0 END) AS total_rent_revenue FROM leases GROUP BY owner_profile_id HAVING SUM(CASE WHEN lease_status = 'active' THEN 1 ELSE 0 END) > 0 ORDER BY total_rent_revenue DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nAggregate all leases, but add rent only for active ones, then remove owners with no active leases.\n\n## Query\n\n```sql\nSELECT owner_profile_id,\n       SUM(CASE WHEN lease_status = 'active' THEN monthly_rent ELSE 0 END) AS total_rent_revenue\nFROM leases\nGROUP BY owner_profile_id\nHAVING SUM(CASE WHEN lease_status = 'active' THEN 1 ELSE 0 END) > 0\nORDER BY total_rent_revenue DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The first `CASE` adds `monthly_rent` only for active leases.\n- Inactive leases contribute 0.\n- The `HAVING` clause removes owners who do not have any active lease rows.\n- This fixes the row-count issue from the earlier version, where owners with only inactive leases were still included with a zero total.\n\n## Difference from the optimal approach\n\nIt works correctly, but filtering rows first with `WHERE lease_status = 'active'` is simpler and easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_062",
    "approaches": [
      {
        "approach_title": "Distinct property count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties FROM leases GROUP BY tenant_user_id HAVING COUNT(DISTINCT property_id) > 1 ORDER BY unique_properties DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCount distinct properties leased by each tenant and keep tenants with more than one.\n\n## Query\n\n```sql\nSELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties\nFROM leases\nGROUP BY tenant_user_id\nHAVING COUNT(DISTINCT property_id) > 1\nORDER BY unique_properties DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY tenant_user_id` creates one group per tenant.\n- `COUNT(DISTINCT property_id)` counts unique leased properties.\n- `HAVING ... > 1` keeps tenants who moved across more than one property.\n\n## Why this is optimal\n\nThe question is about unique properties, so `COUNT(DISTINCT ...)` is the most accurate and direct choice."
      },
      {
        "approach_title": "CTE tenant properties",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH tenant_property_counts AS (\n  SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties\n  FROM leases\n  GROUP BY tenant_user_id\n)\nSELECT tenant_user_id, unique_properties\nFROM tenant_property_counts\nWHERE unique_properties > 1\nORDER BY unique_properties DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCompute distinct property counts first, then filter outside.\n\n## Query\n\n```sql\nWITH tenant_property_counts AS (\n  SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties\n  FROM leases\n  GROUP BY tenant_user_id\n)\nSELECT tenant_user_id, unique_properties\nFROM tenant_property_counts\nWHERE unique_properties > 1\nORDER BY unique_properties DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per tenant with the number of unique properties.\n- The outer query keeps only tenants above the threshold.\n\n## Difference from the optimal approach\n\nClear, but longer."
      },
      {
        "approach_title": "Distinct subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT tenant_user_id, unique_properties FROM (SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties FROM leases GROUP BY tenant_user_id) x WHERE unique_properties > 1 ORDER BY unique_properties DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCalculate grouped distinct counts in a subquery, then filter.\n\n## Query\n\n```sql\nSELECT tenant_user_id, unique_properties\nFROM (\n  SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties\n  FROM leases\n  GROUP BY tenant_user_id\n) x\nWHERE unique_properties > 1\nORDER BY unique_properties DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- The subquery creates one aggregated row per tenant.\n- The outer query filters and sorts the grouped result.\n\n## Difference from the optimal approach\n\nIt works, but `HAVING` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_063",
    "approaches": [
      {
        "approach_title": "Filter countered",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS countered_offer_count FROM offers WHERE offer_status = 'countered' GROUP BY listing_id ORDER BY countered_offer_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nKeep only countered offers and count them per listing.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS countered_offer_count\nFROM offers\nWHERE offer_status = 'countered'\nGROUP BY listing_id\nORDER BY countered_offer_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only offers in countered status.\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` counts countered offers in each group.\n\n## Why this is optimal\n\nIt directly counts the exact offer state mentioned in the question."
      },
      {
        "approach_title": "CTE countered",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH countered_counts AS (\n  SELECT listing_id, COUNT(*) AS countered_offer_count\n  FROM offers\n  WHERE offer_status = 'countered'\n  GROUP BY listing_id\n)\nSELECT listing_id, countered_offer_count\nFROM countered_counts\nORDER BY countered_offer_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount countered offers in a CTE, then return them.\n\n## Query\n\n```sql\nWITH countered_counts AS (\n  SELECT listing_id, COUNT(*) AS countered_offer_count\n  FROM offers\n  WHERE offer_status = 'countered'\n  GROUP BY listing_id\n)\nSELECT listing_id, countered_offer_count\nFROM countered_counts\nORDER BY countered_offer_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one count row per listing.\n- The outer query handles ordering.\n\n## Difference from the optimal approach\n\nIt works, but is more verbose."
      },
      {
        "approach_title": "Filtered count",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT listing_id, COUNT(*) FILTER (WHERE offer_status = 'countered') AS countered_offer_count FROM offers GROUP BY listing_id HAVING COUNT(*) FILTER (WHERE offer_status = 'countered') > 0 ORDER BY countered_offer_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nGroup all offers by listing and count only countered ones with `FILTER`.\n\n## Query\n\n```sql\nSELECT listing_id,\n       COUNT(*) FILTER (WHERE offer_status = 'countered') AS countered_offer_count\nFROM offers\nGROUP BY listing_id\nHAVING COUNT(*) FILTER (WHERE offer_status = 'countered') > 0\nORDER BY countered_offer_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- `FILTER` limits the count to countered rows inside each listing group.\n- `HAVING` removes listings with zero countered offers.\n\n## Difference from the optimal approach\n\nUseful when combining multiple status counts, but less direct here."
      }
    ]
  },
  {
    "code": "REALESTATE_064",
    "approaches": [
      {
        "approach_title": "Join locality count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.locality, COUNT(*) AS terminated_lease_count FROM leases l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.lease_status = 'terminated' GROUP BY loc.locality ORDER BY terminated_lease_count DESC, loc.locality ASC;",
        "explanation": "## Approach\n\nJoin terminated leases to property locations, then count them by locality.\n\n## Query\n\n```sql\nSELECT loc.locality, COUNT(*) AS terminated_lease_count\nFROM leases l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.lease_status = 'terminated'\nGROUP BY loc.locality\nORDER BY terminated_lease_count DESC, loc.locality ASC;\n```\n\n## Explanation\n\n- The joins connect each lease to its locality.\n- The filter keeps only terminated leases.\n- `GROUP BY loc.locality` creates one group per locality.\n- `COUNT(*)` counts terminated leases there.\n\n## Why this is optimal\n\nIt directly maps churn to location using the schema relationships."
      },
      {
        "approach_title": "CTE churn localities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH terminated_localities AS (\n  SELECT loc.locality\n  FROM leases l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.lease_status = 'terminated'\n)\nSELECT locality, COUNT(*) AS terminated_lease_count\nFROM terminated_localities\nGROUP BY locality\nORDER BY terminated_lease_count DESC, locality ASC;",
        "explanation": "## Approach\n\nBuild a locality dataset for terminated leases first, then aggregate.\n\n## Query\n\n```sql\nWITH terminated_localities AS (\n  SELECT loc.locality\n  FROM leases l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.lease_status = 'terminated'\n)\nSELECT locality, COUNT(*) AS terminated_lease_count\nFROM terminated_localities\nGROUP BY locality\nORDER BY terminated_lease_count DESC, locality ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per terminated lease with its locality.\n- The outer query counts rows per locality.\n\n## Difference from the optimal approach\n\nClear, but longer."
      },
      {
        "approach_title": "Count lease ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.locality, COUNT(l.id) AS terminated_lease_count FROM leases l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.lease_status = 'terminated' GROUP BY loc.locality ORDER BY terminated_lease_count DESC, loc.locality ASC;",
        "explanation": "## Approach\n\nCount terminated lease ids after joining locality data.\n\n## Query\n\n```sql\nSELECT loc.locality, COUNT(l.id) AS terminated_lease_count\nFROM leases l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.lease_status = 'terminated'\nGROUP BY loc.locality\nORDER BY terminated_lease_count DESC, loc.locality ASC;\n```\n\n## Explanation\n\n- Lease ids are never NULL, so this matches row counting.\n- The grouping and order remain unchanged.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is simpler."
      }
    ]
  },
  {
    "code": "REALESTATE_065",
    "approaches": [
      {
        "approach_title": "Overdue count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT tenant_user_id, COUNT(*) AS overdue_payment_count FROM rent_payments WHERE payment_status = 'overdue' GROUP BY tenant_user_id HAVING COUNT(*) > 2 ORDER BY overdue_payment_count DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nKeep overdue payments only, then count them per tenant.\n\n## Query\n\n```sql\nSELECT tenant_user_id, COUNT(*) AS overdue_payment_count\nFROM rent_payments\nWHERE payment_status = 'overdue'\nGROUP BY tenant_user_id\nHAVING COUNT(*) > 2\nORDER BY overdue_payment_count DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only overdue payment rows.\n- `GROUP BY tenant_user_id` creates one group per tenant.\n- `HAVING COUNT(*) > 2` keeps tenants with more than 2 overdue payments.\n\n## Why this is optimal\n\nIt directly answers the question with the fewest steps."
      },
      {
        "approach_title": "CTE overdue tenants",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH tenant_overdues AS (\n  SELECT tenant_user_id, COUNT(*) AS overdue_payment_count\n  FROM rent_payments\n  WHERE payment_status = 'overdue'\n  GROUP BY tenant_user_id\n)\nSELECT tenant_user_id, overdue_payment_count\nFROM tenant_overdues\nWHERE overdue_payment_count > 2\nORDER BY overdue_payment_count DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCount overdues per tenant in a CTE, then filter.\n\n## Query\n\n```sql\nWITH tenant_overdues AS (\n  SELECT tenant_user_id, COUNT(*) AS overdue_payment_count\n  FROM rent_payments\n  WHERE payment_status = 'overdue'\n  GROUP BY tenant_user_id\n)\nSELECT tenant_user_id, overdue_payment_count\nFROM tenant_overdues\nWHERE overdue_payment_count > 2\nORDER BY overdue_payment_count DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one grouped row per tenant.\n- The outer query applies the threshold and ordering.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT tenant_user_id, COUNT(id) AS overdue_payment_count FROM rent_payments WHERE payment_status = 'overdue' GROUP BY tenant_user_id HAVING COUNT(id) > 2 ORDER BY overdue_payment_count DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCount payment ids instead of rows.\n\n## Query\n\n```sql\nSELECT tenant_user_id, COUNT(id) AS overdue_payment_count\nFROM rent_payments\nWHERE payment_status = 'overdue'\nGROUP BY tenant_user_id\nHAVING COUNT(id) > 2\nORDER BY overdue_payment_count DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- Payment ids are never NULL, so this matches `COUNT(*)`.\n- The grouped logic remains the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_066",
    "approaches": [
      {
        "approach_title": "Distinct join counts",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT pv.listing_id, COUNT(DISTINCT pv.id) AS completed_visits, COUNT(DISTINCT le.id) AS active_leases FROM property_visits pv LEFT JOIN leases le ON pv.listing_id = le.listing_id AND le.lease_status = 'active' WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING COUNT(DISTINCT le.id) > 0 ORDER BY active_leases DESC, pv.listing_id ASC;",
        "explanation": "## Approach\n\nStart from completed visits, join active leases, and count both sides distinctly per listing.\n\n## Query\n\n```sql\nSELECT pv.listing_id,\n       COUNT(DISTINCT pv.id) AS completed_visits,\n       COUNT(DISTINCT le.id) AS active_leases\nFROM property_visits pv\nLEFT JOIN leases le\n  ON pv.listing_id = le.listing_id\n AND le.lease_status = 'active'\nWHERE pv.visit_status = 'completed'\nGROUP BY pv.listing_id\nHAVING COUNT(DISTINCT le.id) > 0\nORDER BY active_leases DESC, pv.listing_id ASC;\n```\n\n## Explanation\n\n- The query starts from completed visits only.\n- The join brings in active leases for the same listing.\n- `COUNT(DISTINCT ...)` prevents overcounting from join multiplication.\n- `HAVING` keeps listings that converted into at least one active lease.\n\n## Why this is optimal\n\nIt keeps both funnel stages in one query and handles duplicate join expansion correctly."
      },
      {
        "approach_title": "CTE visit lease",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_funnel AS (\n  SELECT pv.listing_id, COUNT(DISTINCT pv.id) AS completed_visits, COUNT(DISTINCT le.id) AS active_leases\n  FROM property_visits pv\n  LEFT JOIN leases le ON pv.listing_id = le.listing_id AND le.lease_status = 'active'\n  WHERE pv.visit_status = 'completed'\n  GROUP BY pv.listing_id\n)\nSELECT listing_id, completed_visits, active_leases\nFROM listing_funnel\nWHERE active_leases > 0\nORDER BY active_leases DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCompute completed visit and active lease counts first, then filter outside.\n\n## Query\n\n```sql\nWITH listing_funnel AS (\n  SELECT pv.listing_id,\n         COUNT(DISTINCT pv.id) AS completed_visits,\n         COUNT(DISTINCT le.id) AS active_leases\n  FROM property_visits pv\n  LEFT JOIN leases le ON pv.listing_id = le.listing_id AND le.lease_status = 'active'\n  WHERE pv.visit_status = 'completed'\n  GROUP BY pv.listing_id\n)\nSELECT listing_id, completed_visits, active_leases\nFROM listing_funnel\nWHERE active_leases > 0\nORDER BY active_leases DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE stores funnel counts per listing.\n- The outer query keeps listings that reached the lease stage.\n\n## Difference from the optimal approach\n\nIt is easier to read step by step, but longer."
      },
      {
        "approach_title": "Subquery counts",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT pv.listing_id, COUNT(*) AS completed_visits, (SELECT COUNT(*) FROM leases le WHERE le.listing_id = pv.listing_id AND le.lease_status = 'active') AS active_leases FROM property_visits pv WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING (SELECT COUNT(*) FROM leases le WHERE le.listing_id = pv.listing_id AND le.lease_status = 'active') > 0 ORDER BY active_leases DESC, pv.listing_id ASC;",
        "explanation": "## Approach\n\nCount completed visits directly and use correlated subqueries for active leases.\n\n## Query\n\n```sql\nSELECT pv.listing_id,\n       COUNT(*) AS completed_visits,\n       (SELECT COUNT(*)\n        FROM leases le\n        WHERE le.listing_id = pv.listing_id\n          AND le.lease_status = 'active') AS active_leases\nFROM property_visits pv\nWHERE pv.visit_status = 'completed'\nGROUP BY pv.listing_id\nHAVING (SELECT COUNT(*)\n        FROM leases le\n        WHERE le.listing_id = pv.listing_id\n          AND le.lease_status = 'active') > 0\nORDER BY active_leases DESC, pv.listing_id ASC;\n```\n\n## Explanation\n\n- The main query counts completed visits per listing.\n- The correlated subquery counts active leases for the same listing.\n\n## Difference from the optimal approach\n\nIt works, but repeated subqueries are less efficient and less elegant."
      }
    ]
  },
  {
    "code": "REALESTATE_067",
    "approaches": [
      {
        "approach_title": "Left join no inquiries",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id, l.property_id, l.sale_price FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 GROUP BY l.id, l.property_id, l.sale_price HAVING COUNT(i.id) = 0 ORDER BY l.sale_price DESC, l.id ASC;",
        "explanation": "## Approach\n\nStart from live high-value sale listings, left join inquiries, then keep only those with zero inquiry rows.\n\n## Query\n\n```sql\nSELECT l.id, l.property_id, l.sale_price\nFROM listings l\nLEFT JOIN inquiries i ON l.id = i.listing_id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'sale'\n  AND l.sale_price > 10000000\nGROUP BY l.id, l.property_id, l.sale_price\nHAVING COUNT(i.id) = 0\nORDER BY l.sale_price DESC, l.id ASC;\n```\n\n## Explanation\n\n- The filters keep only live sale listings above the threshold.\n- The left join keeps listings even if they have no inquiries.\n- `COUNT(i.id) = 0` identifies listings with no inquiry rows.\n\n## Why this is optimal\n\nIt cleanly combines filtering with an anti-join pattern."
      },
      {
        "approach_title": "Not exists",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT l.id, l.property_id, l.sale_price FROM listings l WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 AND NOT EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) ORDER BY l.sale_price DESC, l.id ASC;",
        "explanation": "## Approach\n\nReturn high-value sale listings for which no inquiry exists.\n\n## Query\n\n```sql\nSELECT l.id, l.property_id, l.sale_price\nFROM listings l\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'sale'\n  AND l.sale_price > 10000000\n  AND NOT EXISTS (\n    SELECT 1\n    FROM inquiries i\n    WHERE i.listing_id = l.id\n  )\nORDER BY l.sale_price DESC, l.id ASC;\n```\n\n## Explanation\n\n- The subquery checks for inquiries on the listing.\n- `NOT EXISTS` keeps only listings without any inquiry.\n\n## Difference from the optimal approach\n\nAlso correct, but the left join plus zero-count pattern matches the expected logic closely."
      },
      {
        "approach_title": "Left join null",
        "approach_type": "anti_join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.id, l.property_id, l.sale_price FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 AND i.id IS NULL ORDER BY l.sale_price DESC, l.id ASC;",
        "explanation": "## Approach\n\nUse a left join and keep rows where no inquiry matched.\n\n## Query\n\n```sql\nSELECT l.id, l.property_id, l.sale_price\nFROM listings l\nLEFT JOIN inquiries i ON l.id = i.listing_id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'sale'\n  AND l.sale_price > 10000000\n  AND i.id IS NULL\nORDER BY l.sale_price DESC, l.id ASC;\n```\n\n## Explanation\n\n- The left join keeps all qualifying listings.\n- `i.id IS NULL` identifies listings with no related inquiry rows.\n\n## Difference from the optimal approach\n\nThis is also correct and shorter, but the grouped version makes the zero-count logic explicit."
      }
    ]
  },
  {
    "code": "REALESTATE_068",
    "approaches": [
      {
        "approach_title": "Filter count compare",
        "approach_type": "conditional_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.owner_profile_id, COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases, COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL GROUP BY l.owner_profile_id HAVING COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) > COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) ORDER BY price_increases DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin price history to listings, count increases and drops separately per owner, then compare them.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id,\n       COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases,\n       COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops\nFROM listing_price_history lph\nJOIN listings l ON lph.listing_id = l.id\nWHERE lph.old_rent_amount IS NOT NULL\n  AND lph.new_rent_amount IS NOT NULL\nGROUP BY l.owner_profile_id\nHAVING COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount)\n     > COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount)\nORDER BY price_increases DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join maps each price change to the owner of the listing.\n- `FILTER` counts increases and drops separately inside each owner group.\n- `HAVING` compares those two counts.\n\n## Why this is optimal\n\nIt is compact, expressive, and ideal for comparing multiple conditional counts."
      },
      {
        "approach_title": "Case counts",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT l.owner_profile_id, SUM(CASE WHEN lph.new_rent_amount > lph.old_rent_amount THEN 1 ELSE 0 END) AS price_increases, SUM(CASE WHEN lph.new_rent_amount < lph.old_rent_amount THEN 1 ELSE 0 END) AS price_drops FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL GROUP BY l.owner_profile_id HAVING SUM(CASE WHEN lph.new_rent_amount > lph.old_rent_amount THEN 1 ELSE 0 END) > SUM(CASE WHEN lph.new_rent_amount < lph.old_rent_amount THEN 1 ELSE 0 END) ORDER BY price_increases DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nUse `CASE` expressions to count increases and drops separately.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id,\n       SUM(CASE WHEN lph.new_rent_amount > lph.old_rent_amount THEN 1 ELSE 0 END) AS price_increases,\n       SUM(CASE WHEN lph.new_rent_amount < lph.old_rent_amount THEN 1 ELSE 0 END) AS price_drops\nFROM listing_price_history lph\nJOIN listings l ON lph.listing_id = l.id\nWHERE lph.old_rent_amount IS NOT NULL\n  AND lph.new_rent_amount IS NOT NULL\nGROUP BY l.owner_profile_id\nHAVING SUM(CASE WHEN lph.new_rent_amount > lph.old_rent_amount THEN 1 ELSE 0 END)\n     > SUM(CASE WHEN lph.new_rent_amount < lph.old_rent_amount THEN 1 ELSE 0 END)\nORDER BY price_increases DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expressions convert matching rows into 1 and others into 0.\n- Summing those values gives the increase and drop counts.\n\n## Difference from the optimal approach\n\nIt works well, but `FILTER` is cleaner for this pattern."
      },
      {
        "approach_title": "CTE owner moves",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH owner_price_moves AS (\n  SELECT l.owner_profile_id, COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases, COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops\n  FROM listing_price_history lph\n  JOIN listings l ON lph.listing_id = l.id\n  WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, price_increases, price_drops\nFROM owner_price_moves\nWHERE price_increases > price_drops\nORDER BY price_increases DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute owner-level increase and drop counts first, then filter outside.\n\n## Query\n\n```sql\nWITH owner_price_moves AS (\n  SELECT l.owner_profile_id,\n         COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases,\n         COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops\n  FROM listing_price_history lph\n  JOIN listings l ON lph.listing_id = l.id\n  WHERE lph.old_rent_amount IS NOT NULL\n    AND lph.new_rent_amount IS NOT NULL\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, price_increases, price_drops\nFROM owner_price_moves\nWHERE price_increases > price_drops\nORDER BY price_increases DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores the two counts per owner.\n- The outer query filters owners with more increases than drops.\n\n## Difference from the optimal approach\n\nMore structured, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_069",
    "approaches": [
      {
        "approach_title": "Join active leases",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT mt.property_id, COUNT(*) AS ticket_count FROM maintenance_tickets mt JOIN leases l ON mt.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY mt.property_id HAVING COUNT(*) > 3 ORDER BY ticket_count DESC, mt.property_id ASC;",
        "explanation": "## Approach\n\nJoin maintenance tickets to leases, keep active leases, then count tickets per property.\n\n## Query\n\n```sql\nSELECT mt.property_id, COUNT(*) AS ticket_count\nFROM maintenance_tickets mt\nJOIN leases l ON mt.lease_id = l.id\nWHERE l.lease_status = 'active'\nGROUP BY mt.property_id\nHAVING COUNT(*) > 3\nORDER BY ticket_count DESC, mt.property_id ASC;\n```\n\n## Explanation\n\n- The join lets the query filter by lease status.\n- Only tickets tied to active leases are counted.\n- `GROUP BY mt.property_id` creates one group per property.\n- `HAVING COUNT(*) > 3` keeps high-ticket properties.\n\n## Why this is optimal\n\nIt applies the lease-status condition at the right place and groups exactly at property level."
      },
      {
        "approach_title": "CTE active tickets",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH active_lease_tickets AS (\n  SELECT mt.property_id\n  FROM maintenance_tickets mt\n  JOIN leases l ON mt.lease_id = l.id\n  WHERE l.lease_status = 'active'\n)\nSELECT property_id, COUNT(*) AS ticket_count\nFROM active_lease_tickets\nGROUP BY property_id\nHAVING COUNT(*) > 3\nORDER BY ticket_count DESC, property_id ASC;",
        "explanation": "## Approach\n\nBuild a property-level ticket dataset for active leases first, then aggregate.\n\n## Query\n\n```sql\nWITH active_lease_tickets AS (\n  SELECT mt.property_id\n  FROM maintenance_tickets mt\n  JOIN leases l ON mt.lease_id = l.id\n  WHERE l.lease_status = 'active'\n)\nSELECT property_id, COUNT(*) AS ticket_count\nFROM active_lease_tickets\nGROUP BY property_id\nHAVING COUNT(*) > 3\nORDER BY ticket_count DESC, property_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per qualifying maintenance ticket.\n- The outer query counts tickets per property.\n\n## Difference from the optimal approach\n\nIt is easier to break into steps, but longer."
      },
      {
        "approach_title": "Count ticket ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT mt.property_id, COUNT(mt.id) AS ticket_count FROM maintenance_tickets mt JOIN leases l ON mt.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY mt.property_id HAVING COUNT(mt.id) > 3 ORDER BY ticket_count DESC, mt.property_id ASC;",
        "explanation": "## Approach\n\nCount maintenance ticket ids per property after joining active leases.\n\n## Query\n\n```sql\nSELECT mt.property_id, COUNT(mt.id) AS ticket_count\nFROM maintenance_tickets mt\nJOIN leases l ON mt.lease_id = l.id\nWHERE l.lease_status = 'active'\nGROUP BY mt.property_id\nHAVING COUNT(mt.id) > 3\nORDER BY ticket_count DESC, mt.property_id ASC;\n```\n\n## Explanation\n\n- Ticket ids are never NULL, so this matches row counting.\n- The grouping and threshold remain the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_070",
    "approaches": [
      {
        "approach_title": "Join and compare",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count FROM listings l JOIN inquiries i ON l.id = i.listing_id LEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT i.id) > 0 AND COUNT(DISTINCT le.id) = 0 ORDER BY listing_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin live listings to inquiries and active leases, then keep owners whose inquiry-linked live listings never converted to active leases.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count\nFROM listings l\nJOIN inquiries i ON l.id = i.listing_id\nLEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\nWHERE l.listing_status = 'live'\nGROUP BY l.owner_profile_id\nHAVING COUNT(DISTINCT i.id) > 0\n   AND COUNT(DISTINCT le.id) = 0\nORDER BY listing_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join to `inquiries` limits the analysis to live listings that actually received interest.\n- The left join to active leases checks whether those same listings converted.\n- `COUNT(DISTINCT le.id) = 0` means none of those inquiry-linked live listings has an active lease.\n- `COUNT(DISTINCT l.id)` returns how many such listings each owner has.\n\n## Why this is optimal\n\nIt matches the intended owner-level funnel logic exactly."
      },
      {
        "approach_title": "CTE funnel owners",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_funnel AS (\n  SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT le.id) AS active_lease_count\n  FROM listings l\n  JOIN inquiries i ON l.id = i.listing_id\n  LEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\n  WHERE l.listing_status = 'live'\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, listing_count\nFROM owner_funnel\nWHERE inquiry_count > 0 AND active_lease_count = 0\nORDER BY listing_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute inquiry and active-lease counts per owner first, then filter outside.\n\n## Query\n\n```sql\nWITH owner_funnel AS (\n  SELECT l.owner_profile_id,\n         COUNT(DISTINCT l.id) AS listing_count,\n         COUNT(DISTINCT i.id) AS inquiry_count,\n         COUNT(DISTINCT le.id) AS active_lease_count\n  FROM listings l\n  JOIN inquiries i ON l.id = i.listing_id\n  LEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\n  WHERE l.listing_status = 'live'\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, listing_count\nFROM owner_funnel\nWHERE inquiry_count > 0 AND active_lease_count = 0\nORDER BY listing_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores owner-level funnel metrics.\n- The outer query keeps owners with inquiry activity but no active lease conversion on those listings.\n\n## Difference from the optimal approach\n\nIt is easier to inspect step by step, but longer."
      },
      {
        "approach_title": "Owner exists check",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count FROM listings l WHERE l.listing_status = 'live' AND EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND NOT EXISTS (SELECT 1 FROM listings l2 JOIN inquiries i2 ON i2.listing_id = l2.id JOIN leases le ON le.listing_id = l2.id AND le.lease_status = 'active' WHERE l2.owner_profile_id = l.owner_profile_id AND l2.listing_status = 'live') GROUP BY l.owner_profile_id ORDER BY listing_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nCount an owner's live listings that have inquiries, but exclude any owner who has a live listing with both an inquiry and an active lease.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count\nFROM listings l\nWHERE l.listing_status = 'live'\n  AND EXISTS (\n    SELECT 1\n    FROM inquiries i\n    WHERE i.listing_id = l.id\n  )\n  AND NOT EXISTS (\n    SELECT 1\n    FROM listings l2\n    JOIN inquiries i2 ON i2.listing_id = l2.id\n    JOIN leases le ON le.listing_id = l2.id AND le.lease_status = 'active'\n    WHERE l2.owner_profile_id = l.owner_profile_id\n      AND l2.listing_status = 'live'\n  )\nGROUP BY l.owner_profile_id\nORDER BY listing_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The first `EXISTS` keeps only live listings that received inquiries.\n- The `NOT EXISTS` is applied at the owner level, not just the current listing.\n- It rejects any owner who has a live listing with both an inquiry and an active lease.\n- This fixes the earlier version, which incorrectly checked `NOT EXISTS` per listing and allowed owners who had a mix of converted and non-converted listings.\n\n## Difference from the optimal approach\n\nIt works correctly, but the join-and-aggregate version is more direct and easier to reason about."
      }
    ]
  },
  {
    "code": "REALESTATE_071",
    "approaches": [
      {
        "approach_title": "Join converted cities",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, COUNT(DISTINCT i.id) AS converted_inquiry_count FROM inquiries i JOIN listings l ON i.listing_id = l.id JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY converted_inquiry_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin inquiries to listings that later have an active lease, then count converted inquiries per city.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(DISTINCT i.id) AS converted_inquiry_count\nFROM inquiries i\nJOIN listings l ON i.listing_id = l.id\nJOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nGROUP BY loc.city\nORDER BY converted_inquiry_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins connect each inquiry to its listing, lease, property, and city.\n- `le.lease_status = 'active'` keeps only listings that converted to an active lease.\n- `COUNT(DISTINCT i.id)` avoids double counting inquiries if multiple active lease rows could exist.\n- Grouping by city produces one result row per city.\n\n## Why this is optimal\n\nIt keeps the funnel logic in one query and handles join duplication safely."
      },
      {
        "approach_title": "CTE converted cities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH converted_inquiries AS (\n  SELECT DISTINCT i.id, loc.city\n  FROM inquiries i\n  JOIN listings l ON i.listing_id = l.id\n  JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n)\nSELECT city, COUNT(*) AS converted_inquiry_count\nFROM converted_inquiries\nGROUP BY city\nORDER BY converted_inquiry_count DESC, city ASC;",
        "explanation": "## Approach\n\nFirst build the set of converted inquiries with their city, then aggregate.\n\n## Query\n\n```sql\nWITH converted_inquiries AS (\n  SELECT DISTINCT i.id, loc.city\n  FROM inquiries i\n  JOIN listings l ON i.listing_id = l.id\n  JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n)\nSELECT city, COUNT(*) AS converted_inquiry_count\nFROM converted_inquiries\nGROUP BY city\nORDER BY converted_inquiry_count DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per converted inquiry with its city.\n- `DISTINCT` removes duplicate inquiry rows caused by joins.\n- The outer query counts converted inquiries per city.\n\n## Difference from the optimal approach\n\nIt is easier to inspect step by step, but longer."
      },
      {
        "approach_title": "Exists active lease",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, COUNT(*) AS converted_inquiry_count FROM inquiries i JOIN listings l ON i.listing_id = l.id JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') GROUP BY loc.city ORDER BY converted_inquiry_count DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin inquiries to listing location data and use `EXISTS` to keep only listings with an active lease.\n\n## Query\n\n```sql\nSELECT loc.city, COUNT(*) AS converted_inquiry_count\nFROM inquiries i\nJOIN listings l ON i.listing_id = l.id\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE EXISTS (\n  SELECT 1\n  FROM leases le\n  WHERE le.listing_id = l.id\n    AND le.lease_status = 'active'\n)\nGROUP BY loc.city\nORDER BY converted_inquiry_count DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The main query maps inquiries to their city.\n- `EXISTS` keeps only listings that have an active lease.\n- Grouping counts converted inquiries per city.\n\n## Difference from the optimal approach\n\nAlso correct, but the join-based solution keeps all logic more visible in one place."
      }
    ]
  },
  {
    "code": "REALESTATE_072",
    "approaches": [
      {
        "approach_title": "Distinct city count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count FROM properties p JOIN locations loc ON p.location_id = loc.id GROUP BY p.owner_profile_id HAVING COUNT(DISTINCT loc.city) > 1 ORDER BY city_count DESC, p.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin properties to locations, count distinct cities per owner, then keep owners with more than one city.\n\n## Query\n\n```sql\nSELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count\nFROM properties p\nJOIN locations loc ON p.location_id = loc.id\nGROUP BY p.owner_profile_id\nHAVING COUNT(DISTINCT loc.city) > 1\nORDER BY city_count DESC, p.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join brings city information onto each property.\n- `COUNT(DISTINCT loc.city)` counts unique cities per owner.\n- `HAVING ... > 1` keeps owners present in multiple cities.\n\n## Why this is optimal\n\nThe question is about distinct cities, so `COUNT(DISTINCT ...)` is the most direct solution."
      },
      {
        "approach_title": "CTE owner cities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_city_counts AS (\n  SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count\n  FROM properties p\n  JOIN locations loc ON p.location_id = loc.id\n  GROUP BY p.owner_profile_id\n)\nSELECT owner_profile_id, city_count\nFROM owner_city_counts\nWHERE city_count > 1\nORDER BY city_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute distinct city counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH owner_city_counts AS (\n  SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count\n  FROM properties p\n  JOIN locations loc ON p.location_id = loc.id\n  GROUP BY p.owner_profile_id\n)\nSELECT owner_profile_id, city_count\nFROM owner_city_counts\nWHERE city_count > 1\nORDER BY city_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per owner with their number of distinct cities.\n- The outer query keeps owners above the threshold.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Distinct subquery",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT owner_profile_id, city_count FROM (SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count FROM properties p JOIN locations loc ON p.location_id = loc.id GROUP BY p.owner_profile_id) x WHERE city_count > 1 ORDER BY city_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCalculate grouped city counts in a subquery, then filter outside.\n\n## Query\n\n```sql\nSELECT owner_profile_id, city_count\nFROM (\n  SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count\n  FROM properties p\n  JOIN locations loc ON p.location_id = loc.id\n  GROUP BY p.owner_profile_id\n) x\nWHERE city_count > 1\nORDER BY city_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The subquery creates one aggregated row per owner.\n- The outer query filters the grouped result.\n\n## Difference from the optimal approach\n\nIt works, but `HAVING` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_073",
    "approaches": [
      {
        "approach_title": "Exists full funnel",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id FROM listings l WHERE EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AND EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = l.id AND o.offer_status = 'accepted') AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nCheck each listing for all four funnel stages using `EXISTS`.\n\n## Query\n\n```sql\nSELECT l.id\nFROM listings l\nWHERE EXISTS (\n  SELECT 1\n  FROM inquiries i\n  WHERE i.listing_id = l.id\n)\n  AND EXISTS (\n    SELECT 1\n    FROM property_visits pv\n    WHERE pv.listing_id = l.id\n      AND pv.visit_status = 'completed'\n  )\n  AND EXISTS (\n    SELECT 1\n    FROM offers o\n    WHERE o.listing_id = l.id\n      AND o.offer_status = 'accepted'\n  )\n  AND EXISTS (\n    SELECT 1\n    FROM leases le\n    WHERE le.listing_id = l.id\n      AND le.lease_status = 'active'\n  )\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- Each `EXISTS` clause checks for one required funnel stage.\n- The listing is returned only if all four conditions are true.\n- This avoids duplicate rows from joining multiple child tables together.\n\n## Why this is optimal\n\n`EXISTS` is the cleanest way to test presence across multiple related tables."
      },
      {
        "approach_title": "Join distinct ids",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT DISTINCT l.id FROM listings l JOIN inquiries i ON i.listing_id = l.id JOIN property_visits pv ON pv.listing_id = l.id AND pv.visit_status = 'completed' JOIN offers o ON o.listing_id = l.id AND o.offer_status = 'accepted' JOIN leases le ON le.listing_id = l.id AND le.lease_status = 'active' ORDER BY l.id ASC;",
        "explanation": "## Approach\n\nJoin all four funnel tables and return distinct listing ids.\n\n## Query\n\n```sql\nSELECT DISTINCT l.id\nFROM listings l\nJOIN inquiries i ON i.listing_id = l.id\nJOIN property_visits pv ON pv.listing_id = l.id AND pv.visit_status = 'completed'\nJOIN offers o ON o.listing_id = l.id AND o.offer_status = 'accepted'\nJOIN leases le ON le.listing_id = l.id AND le.lease_status = 'active'\nORDER BY l.id ASC;\n```\n\n## Explanation\n\n- Each join enforces the existence of one funnel stage.\n- `DISTINCT` removes duplicates caused by many-to-one joins.\n\n## Difference from the optimal approach\n\nIt works, but can create a large intermediate join result."
      },
      {
        "approach_title": "CTE funnel flags",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH funnel_listings AS (\n  SELECT l.id,\n         EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AS has_inquiry,\n         EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AS has_completed_visit,\n         EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = l.id AND o.offer_status = 'accepted') AS has_accepted_offer,\n         EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') AS has_active_lease\n  FROM listings l\n)\nSELECT id\nFROM funnel_listings\nWHERE has_inquiry AND has_completed_visit AND has_accepted_offer AND has_active_lease\nORDER BY id ASC;",
        "explanation": "## Approach\n\nCompute boolean funnel flags first, then filter to listings where all are true.\n\n## Query\n\n```sql\nWITH funnel_listings AS (\n  SELECT l.id,\n         EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AS has_inquiry,\n         EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AS has_completed_visit,\n         EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = l.id AND o.offer_status = 'accepted') AS has_accepted_offer,\n         EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') AS has_active_lease\n  FROM listings l\n)\nSELECT id\nFROM funnel_listings\nWHERE has_inquiry AND has_completed_visit AND has_accepted_offer AND has_active_lease\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per listing with four boolean flags.\n- The outer query keeps rows where every flag is true.\n\n## Difference from the optimal approach\n\nVery readable, but longer than needed."
      }
    ]
  },
  {
    "code": "REALESTATE_074",
    "approaches": [
      {
        "approach_title": "Below avg subquery",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, user_id, resolution_time_mins FROM support_tickets WHERE resolution_time_mins IS NOT NULL AND resolution_time_mins < (SELECT AVG(resolution_time_mins) FROM support_tickets WHERE resolution_time_mins IS NOT NULL) ORDER BY resolution_time_mins ASC, id ASC;",
        "explanation": "## Approach\n\nCompare each resolved ticket time against the overall average resolved ticket time.\n\n## Query\n\n```sql\nSELECT id, user_id, resolution_time_mins\nFROM support_tickets\nWHERE resolution_time_mins IS NOT NULL\n  AND resolution_time_mins < (\n    SELECT AVG(resolution_time_mins)\n    FROM support_tickets\n    WHERE resolution_time_mins IS NOT NULL\n  )\nORDER BY resolution_time_mins ASC, id ASC;\n```\n\n## Explanation\n\n- The subquery computes the overall average resolution time.\n- The outer query keeps only tickets with a lower value than that average.\n- `resolution_time_mins IS NOT NULL` avoids comparing missing values.\n\n## Why this is optimal\n\nA scalar subquery is the clearest way to compare rows against a global average."
      },
      {
        "approach_title": "CTE avg time",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH avg_time AS (\n  SELECT AVG(resolution_time_mins) AS overall_avg\n  FROM support_tickets\n  WHERE resolution_time_mins IS NOT NULL\n)\nSELECT st.id, st.user_id, st.resolution_time_mins\nFROM support_tickets st\nCROSS JOIN avg_time a\nWHERE st.resolution_time_mins IS NOT NULL\n  AND st.resolution_time_mins < a.overall_avg\nORDER BY st.resolution_time_mins ASC, st.id ASC;",
        "explanation": "## Approach\n\nCalculate the average once in a CTE, then compare every row against it.\n\n## Query\n\n```sql\nWITH avg_time AS (\n  SELECT AVG(resolution_time_mins) AS overall_avg\n  FROM support_tickets\n  WHERE resolution_time_mins IS NOT NULL\n)\nSELECT st.id, st.user_id, st.resolution_time_mins\nFROM support_tickets st\nCROSS JOIN avg_time a\nWHERE st.resolution_time_mins IS NOT NULL\n  AND st.resolution_time_mins < a.overall_avg\nORDER BY st.resolution_time_mins ASC, st.id ASC;\n```\n\n## Explanation\n\n- The CTE stores the overall average in one row.\n- `CROSS JOIN` makes that value available to every support ticket row.\n- The outer query filters to faster-than-average tickets.\n\n## Difference from the optimal approach\n\nIt is easier to reuse the average value, but longer."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, user_id, resolution_time_mins FROM (SELECT id, user_id, resolution_time_mins, AVG(resolution_time_mins) OVER () AS overall_avg FROM support_tickets WHERE resolution_time_mins IS NOT NULL) x WHERE resolution_time_mins < overall_avg ORDER BY resolution_time_mins ASC, id ASC;",
        "explanation": "## Approach\n\nAttach the overall average to each resolved ticket with a window function, then filter.\n\n## Query\n\n```sql\nSELECT id, user_id, resolution_time_mins\nFROM (\n  SELECT id, user_id, resolution_time_mins,\n         AVG(resolution_time_mins) OVER () AS overall_avg\n  FROM support_tickets\n  WHERE resolution_time_mins IS NOT NULL\n) x\nWHERE resolution_time_mins < overall_avg\nORDER BY resolution_time_mins ASC, id ASC;\n```\n\n## Explanation\n\n- The window function repeats the same overall average on every row.\n- The outer query keeps rows below that value.\n\n## Difference from the optimal approach\n\nWorks well, but is more advanced than necessary for a global comparison."
      }
    ]
  },
  {
    "code": "REALESTATE_075",
    "approaches": [
      {
        "approach_title": "Join amenity maps",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.owner_profile_id ORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin properties to amenity mappings, then count mappings per owner.\n\n## Query\n\n```sql\nSELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count\nFROM properties p\nJOIN property_amenities pa ON p.id = pa.property_id\nGROUP BY p.owner_profile_id\nORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join connects each property to its amenity rows.\n- `GROUP BY p.owner_profile_id` creates one group per owner.\n- `COUNT(pa.id)` counts all amenity-property links owned by that owner.\n\n## Why this is optimal\n\nIt directly measures amenity coverage using the mapping table."
      },
      {
        "approach_title": "Count rows",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT p.owner_profile_id, COUNT(*) AS amenity_mapping_count FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.owner_profile_id ORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;",
        "explanation": "## Approach\n\nCount joined rows after linking properties to amenity mappings.\n\n## Query\n\n```sql\nSELECT p.owner_profile_id, COUNT(*) AS amenity_mapping_count\nFROM properties p\nJOIN property_amenities pa ON p.id = pa.property_id\nGROUP BY p.owner_profile_id\nORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;\n```\n\n## Explanation\n\n- Each joined row is one amenity mapping for one property.\n- Counting rows returns the same result as counting `pa.id`.\n\n## Difference from the optimal approach\n\nAlso correct. Counting mapping ids makes the business meaning a little more explicit."
      },
      {
        "approach_title": "CTE owner amenities",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH owner_amenity_counts AS (\n  SELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count\n  FROM properties p\n  JOIN property_amenities pa ON p.id = pa.property_id\n  GROUP BY p.owner_profile_id\n)\nSELECT owner_profile_id, amenity_mapping_count\nFROM owner_amenity_counts\nORDER BY amenity_mapping_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute amenity mapping counts per owner in a CTE, then return them.\n\n## Query\n\n```sql\nWITH owner_amenity_counts AS (\n  SELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count\n  FROM properties p\n  JOIN property_amenities pa ON p.id = pa.property_id\n  GROUP BY p.owner_profile_id\n)\nSELECT owner_profile_id, amenity_mapping_count\nFROM owner_amenity_counts\nORDER BY amenity_mapping_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per owner.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_076",
    "approaches": [
      {
        "approach_title": "Filter counts compare",
        "approach_type": "conditional_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT seeker_user_id, COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count, COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(*) FILTER (WHERE application_status = 'rejected') > COUNT(*) FILTER (WHERE application_status = 'approved') ORDER BY rejected_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCount rejected and approved applications separately per seeker, then compare those counts.\n\n## Query\n\n```sql\nSELECT seeker_user_id,\n       COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count,\n       COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count\nFROM rental_applications\nGROUP BY seeker_user_id\nHAVING COUNT(*) FILTER (WHERE application_status = 'rejected')\n     > COUNT(*) FILTER (WHERE application_status = 'approved')\nORDER BY rejected_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- `FILTER` creates two separate counts inside each seeker group.\n- `HAVING` compares rejected and approved totals.\n- The ordering sorts by higher rejection counts first.\n\n## Why this is optimal\n\n`FILTER` is the cleanest way to compare multiple status-based counts in one grouped query."
      },
      {
        "approach_title": "Case compare",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT seeker_user_id, SUM(CASE WHEN application_status = 'rejected' THEN 1 ELSE 0 END) AS rejected_count, SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) AS approved_count FROM rental_applications GROUP BY seeker_user_id HAVING SUM(CASE WHEN application_status = 'rejected' THEN 1 ELSE 0 END) > SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) ORDER BY rejected_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nUse `CASE` expressions to count rejected and approved rows separately.\n\n## Query\n\n```sql\nSELECT seeker_user_id,\n       SUM(CASE WHEN application_status = 'rejected' THEN 1 ELSE 0 END) AS rejected_count,\n       SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) AS approved_count\nFROM rental_applications\nGROUP BY seeker_user_id\nHAVING SUM(CASE WHEN application_status = 'rejected' THEN 1 ELSE 0 END)\n     > SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END)\nORDER BY rejected_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- Each `CASE` expression converts matching rows into 1 and others into 0.\n- Summing them gives the two counts.\n\n## Difference from the optimal approach\n\nIt works, but `FILTER` is shorter and clearer."
      },
      {
        "approach_title": "CTE seeker outcomes",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH seeker_outcomes AS (\n  SELECT seeker_user_id, COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count, COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count\n  FROM rental_applications\n  GROUP BY seeker_user_id\n)\nSELECT seeker_user_id, rejected_count, approved_count\nFROM seeker_outcomes\nWHERE rejected_count > approved_count\nORDER BY rejected_count DESC, seeker_user_id ASC;",
        "explanation": "## Approach\n\nCompute both counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH seeker_outcomes AS (\n  SELECT seeker_user_id,\n         COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count,\n         COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count\n  FROM rental_applications\n  GROUP BY seeker_user_id\n)\nSELECT seeker_user_id, rejected_count, approved_count\nFROM seeker_outcomes\nWHERE rejected_count > approved_count\nORDER BY rejected_count DESC, seeker_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per seeker with both counts.\n- The outer query compares the two values.\n\n## Difference from the optimal approach\n\nIt is easier to read step by step, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_077",
    "approaches": [
      {
        "approach_title": "Date compare",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, property_id, created_at, available_from FROM listings WHERE available_from IS NOT NULL AND created_at::date < available_from ORDER BY available_from DESC, id ASC;",
        "explanation": "## Approach\n\nCompare the listing creation date to the available-from date.\n\n## Query\n\n```sql\nSELECT id, property_id, created_at, available_from\nFROM listings\nWHERE available_from IS NOT NULL\n  AND created_at::date < available_from\nORDER BY available_from DESC, id ASC;\n```\n\n## Explanation\n\n- `available_from IS NOT NULL` removes rows without an availability date.\n- `created_at::date < available_from` keeps listings created before the available date.\n- Casting `created_at` to `date` aligns both sides for comparison.\n\n## Why this is optimal\n\nIt directly captures the required date relationship with simple filtering."
      },
      {
        "approach_title": "CTE date compare",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH delayed_listings AS (\n  SELECT id, property_id, created_at, available_from\n  FROM listings\n  WHERE available_from IS NOT NULL\n    AND created_at::date < available_from\n)\nSELECT id, property_id, created_at, available_from\nFROM delayed_listings\nORDER BY available_from DESC, id ASC;",
        "explanation": "## Approach\n\nStore matching listings in a CTE, then return them.\n\n## Query\n\n```sql\nWITH delayed_listings AS (\n  SELECT id, property_id, created_at, available_from\n  FROM listings\n  WHERE available_from IS NOT NULL\n    AND created_at::date < available_from\n)\nSELECT id, property_id, created_at, available_from\nFROM delayed_listings\nORDER BY available_from DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates listings where the date condition is true.\n- The outer query applies final ordering.\n\n## Difference from the optimal approach\n\nIt gives the same result, but with more code."
      },
      {
        "approach_title": "Cast available side",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, property_id, created_at, available_from FROM listings WHERE available_from IS NOT NULL AND created_at < available_from::timestamp ORDER BY available_from DESC, id ASC;",
        "explanation": "## Approach\n\nConvert `available_from` to a timestamp and compare it directly with `created_at`.\n\n## Query\n\n```sql\nSELECT id, property_id, created_at, available_from\nFROM listings\nWHERE available_from IS NOT NULL\n  AND created_at < available_from::timestamp\nORDER BY available_from DESC, id ASC;\n```\n\n## Explanation\n\n- `available_from::timestamp` converts the date into a timestamp at midnight.\n- The comparison still keeps listings created earlier than availability.\n\n## Difference from the optimal approach\n\nIt works, but casting `created_at` to `date` is more intuitive for this question."
      }
    ]
  },
  {
    "code": "REALESTATE_078",
    "approaches": [
      {
        "approach_title": "Join expired docs",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT op.id, op.user_id FROM owner_profiles op JOIN user_documents ud ON op.user_id = ud.user_id WHERE op.verification_status = 'verified' AND ud.expires_at IS NOT NULL AND ud.expires_at < NOW() ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nJoin verified owners to their documents, then keep owners with at least one expired document.\n\n## Query\n\n```sql\nSELECT DISTINCT op.id, op.user_id\nFROM owner_profiles op\nJOIN user_documents ud ON op.user_id = ud.user_id\nWHERE op.verification_status = 'verified'\n  AND ud.expires_at IS NOT NULL\n  AND ud.expires_at < NOW()\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- The join links owner profiles to user documents through `user_id`.\n- The owner filter keeps only verified owners.\n- The document filter keeps only expired documents.\n- `DISTINCT` removes duplicate owners if multiple expired documents exist.\n\n## Why this is optimal\n\nIt directly captures the relationship and safely handles multiple expired documents per owner."
      },
      {
        "approach_title": "Exists expired doc",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT op.id, op.user_id FROM owner_profiles op WHERE op.verification_status = 'verified' AND EXISTS (SELECT 1 FROM user_documents ud WHERE ud.user_id = op.user_id AND ud.expires_at IS NOT NULL AND ud.expires_at < NOW()) ORDER BY op.id ASC;",
        "explanation": "## Approach\n\nReturn verified owners for whom at least one expired document exists.\n\n## Query\n\n```sql\nSELECT op.id, op.user_id\nFROM owner_profiles op\nWHERE op.verification_status = 'verified'\n  AND EXISTS (\n    SELECT 1\n    FROM user_documents ud\n    WHERE ud.user_id = op.user_id\n      AND ud.expires_at IS NOT NULL\n      AND ud.expires_at < NOW()\n  )\nORDER BY op.id ASC;\n```\n\n## Explanation\n\n- `EXISTS` checks whether the owner has any expired document.\n- This avoids duplicate rows without needing `DISTINCT`.\n\n## Difference from the optimal approach\n\nAlso a strong solution, but the join version is more aligned with the expected query style."
      },
      {
        "approach_title": "CTE expired owners",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH expired_owner_docs AS (\n  SELECT DISTINCT op.id, op.user_id\n  FROM owner_profiles op\n  JOIN user_documents ud ON op.user_id = ud.user_id\n  WHERE op.verification_status = 'verified'\n    AND ud.expires_at IS NOT NULL\n    AND ud.expires_at < NOW()\n)\nSELECT id, user_id\nFROM expired_owner_docs\nORDER BY id ASC;",
        "explanation": "## Approach\n\nBuild the verified-owner-with-expired-doc set first, then return it.\n\n## Query\n\n```sql\nWITH expired_owner_docs AS (\n  SELECT DISTINCT op.id, op.user_id\n  FROM owner_profiles op\n  JOIN user_documents ud ON op.user_id = ud.user_id\n  WHERE op.verification_status = 'verified'\n    AND ud.expires_at IS NOT NULL\n    AND ud.expires_at < NOW()\n)\nSELECT id, user_id\nFROM expired_owner_docs\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE stores unique verified owners with expired documents.\n- The outer query handles the final ordering.\n\n## Difference from the optimal approach\n\nIt is more structured, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_079",
    "approaches": [
      {
        "approach_title": "Join owner avg",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id, l.owner_profile_id, l.rent_amount FROM listings l JOIN (SELECT owner_profile_id, AVG(rent_amount) AS avg_rent FROM listings WHERE rent_amount IS NOT NULL GROUP BY owner_profile_id) x ON l.owner_profile_id = x.owner_profile_id WHERE l.rent_amount IS NOT NULL AND l.rent_amount > x.avg_rent ORDER BY l.rent_amount DESC, l.id ASC;",
        "explanation": "## Approach\n\nCompute each owner's average rent in a subquery, join it back to listings, then keep listings above that average.\n\n## Query\n\n```sql\nSELECT l.id, l.owner_profile_id, l.rent_amount\nFROM listings l\nJOIN (\n  SELECT owner_profile_id, AVG(rent_amount) AS avg_rent\n  FROM listings\n  WHERE rent_amount IS NOT NULL\n  GROUP BY owner_profile_id\n) x ON l.owner_profile_id = x.owner_profile_id\nWHERE l.rent_amount IS NOT NULL\n  AND l.rent_amount > x.avg_rent\nORDER BY l.rent_amount DESC, l.id ASC;\n```\n\n## Explanation\n\n- The subquery computes average rent per owner.\n- The join brings that average onto each listing row.\n- The final filter keeps listings priced above their owner's average.\n\n## Why this is optimal\n\nIt is the clearest way to compare each row against a grouped average from the same table."
      },
      {
        "approach_title": "Window avg",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT id, owner_profile_id, rent_amount FROM (SELECT id, owner_profile_id, rent_amount, AVG(rent_amount) OVER (PARTITION BY owner_profile_id) AS owner_avg_rent FROM listings WHERE rent_amount IS NOT NULL) x WHERE rent_amount > owner_avg_rent ORDER BY rent_amount DESC, id ASC;",
        "explanation": "## Approach\n\nUse a window function to place each owner's average rent on every listing row.\n\n## Query\n\n```sql\nSELECT id, owner_profile_id, rent_amount\nFROM (\n  SELECT id, owner_profile_id, rent_amount,\n         AVG(rent_amount) OVER (PARTITION BY owner_profile_id) AS owner_avg_rent\n  FROM listings\n  WHERE rent_amount IS NOT NULL\n) x\nWHERE rent_amount > owner_avg_rent\nORDER BY rent_amount DESC, id ASC;\n```\n\n## Explanation\n\n- The window function computes owner average rent without collapsing rows.\n- The outer query compares each listing's rent to that owner-level average.\n\n## Difference from the optimal approach\n\nElegant and powerful, but more advanced for learners."
      },
      {
        "approach_title": "CTE owner avg",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH owner_avg AS (\n  SELECT owner_profile_id, AVG(rent_amount) AS avg_rent\n  FROM listings\n  WHERE rent_amount IS NOT NULL\n  GROUP BY owner_profile_id\n)\nSELECT l.id, l.owner_profile_id, l.rent_amount\nFROM listings l\nJOIN owner_avg oa ON l.owner_profile_id = oa.owner_profile_id\nWHERE l.rent_amount IS NOT NULL\n  AND l.rent_amount > oa.avg_rent\nORDER BY l.rent_amount DESC, l.id ASC;",
        "explanation": "## Approach\n\nCalculate owner averages in a CTE, then join them back to listings.\n\n## Query\n\n```sql\nWITH owner_avg AS (\n  SELECT owner_profile_id, AVG(rent_amount) AS avg_rent\n  FROM listings\n  WHERE rent_amount IS NOT NULL\n  GROUP BY owner_profile_id\n)\nSELECT l.id, l.owner_profile_id, l.rent_amount\nFROM listings l\nJOIN owner_avg oa ON l.owner_profile_id = oa.owner_profile_id\nWHERE l.rent_amount IS NOT NULL\n  AND l.rent_amount > oa.avg_rent\nORDER BY l.rent_amount DESC, l.id ASC;\n```\n\n## Explanation\n\n- The CTE stores owner-level average rent.\n- The outer query compares each listing to that average.\n\n## Difference from the optimal approach\n\nSame logic, but with an extra named step."
      }
    ]
  },
  {
    "code": "REALESTATE_080",
    "approaches": [
      {
        "approach_title": "Group status changes",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT listing_id, COUNT(*) AS status_change_count FROM listing_status_history GROUP BY listing_id ORDER BY status_change_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount status history rows per listing.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(*) AS status_change_count\nFROM listing_status_history\nGROUP BY listing_id\nORDER BY status_change_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- Each row in `listing_status_history` represents one status change.\n- `GROUP BY listing_id` creates one group per listing.\n- `COUNT(*)` returns the number of status changes for that listing.\n\n## Why this is optimal\n\nIt directly counts the history rows that define the metric."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT listing_id, COUNT(id) AS status_change_count FROM listing_status_history GROUP BY listing_id ORDER BY status_change_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCount history row ids inside each listing group.\n\n## Query\n\n```sql\nSELECT listing_id, COUNT(id) AS status_change_count\nFROM listing_status_history\nGROUP BY listing_id\nORDER BY status_change_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- Since `id` is never NULL, this matches `COUNT(*)`.\n- The grouped count stays the same.\n\n## Difference from the optimal approach\n\nCorrect, but counting rows directly is simpler."
      },
      {
        "approach_title": "CTE history count",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH listing_history_counts AS (\n  SELECT listing_id, COUNT(*) AS status_change_count\n  FROM listing_status_history\n  GROUP BY listing_id\n)\nSELECT listing_id, status_change_count\nFROM listing_history_counts\nORDER BY status_change_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nCompute status change counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH listing_history_counts AS (\n  SELECT listing_id, COUNT(*) AS status_change_count\n  FROM listing_status_history\n  GROUP BY listing_id\n)\nSELECT listing_id, status_change_count\nFROM listing_history_counts\nORDER BY status_change_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per listing.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_081",
    "approaches": [
      {
        "approach_title": "Join city rent",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY total_monthly_rent DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin active leases to property locations, then sum rent by city.\n\n## Query\n\n```sql\nSELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent\nFROM leases le\nJOIN properties p ON le.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE le.lease_status = 'active'\nGROUP BY loc.city\nORDER BY total_monthly_rent DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins connect each lease to its city.\n- `WHERE le.lease_status = 'active'` keeps only active leases.\n- `SUM(le.monthly_rent)` adds rent values inside each city group.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly follows the schema path and computes city revenue in one grouped query."
      },
      {
        "approach_title": "CTE city revenue",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_revenue AS (\n  SELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent\n  FROM leases le\n  JOIN properties p ON le.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE le.lease_status = 'active'\n  GROUP BY loc.city\n)\nSELECT city, total_monthly_rent\nFROM city_revenue\nORDER BY total_monthly_rent DESC, city ASC;",
        "explanation": "## Approach\n\nCompute city revenue in a CTE, then return it.\n\n## Query\n\n```sql\nWITH city_revenue AS (\n  SELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent\n  FROM leases le\n  JOIN properties p ON le.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE le.lease_status = 'active'\n  GROUP BY loc.city\n)\nSELECT city, total_monthly_rent\nFROM city_revenue\nORDER BY total_monthly_rent DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per city.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Count via case",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, SUM(CASE WHEN le.lease_status = 'active' THEN le.monthly_rent ELSE 0 END) AS total_monthly_rent FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_monthly_rent DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin all leases to cities, but only add rent for active ones.\n\n## Query\n\n```sql\nSELECT loc.city,\n       SUM(CASE WHEN le.lease_status = 'active' THEN le.monthly_rent ELSE 0 END) AS total_monthly_rent\nFROM leases le\nJOIN properties p ON le.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nGROUP BY loc.city\nORDER BY total_monthly_rent DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The `CASE` expression contributes rent only for active leases.\n- All other lease rows add 0.\n- The grouping remains at city level.\n\n## Difference from the optimal approach\n\nIt works, but filtering first is clearer."
      }
    ]
  },
  {
    "code": "REALESTATE_082",
    "approaches": [
      {
        "approach_title": "Filter both types",
        "approach_type": "conditional_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0 AND COUNT(*) FILTER (WHERE listed_for = 'sale') > 0 ORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nKeep live listings, then count rent and sale listings separately for each owner.\n\n## Query\n\n```sql\nSELECT owner_profile_id\nFROM listings\nWHERE listing_status = 'live'\nGROUP BY owner_profile_id\nHAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0\n   AND COUNT(*) FILTER (WHERE listed_for = 'sale') > 0\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only live listings.\n- `FILTER` counts rent listings and sale listings separately per owner.\n- The `HAVING` clause keeps owners who have both types.\n\n## Why this is optimal\n\nIt is concise and expresses the mixed inventory rule clearly."
      },
      {
        "approach_title": "Case counts",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING SUM(CASE WHEN listed_for = 'rent' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN listed_for = 'sale' THEN 1 ELSE 0 END) > 0 ORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nUse `CASE` expressions to count rent and sale listings separately.\n\n## Query\n\n```sql\nSELECT owner_profile_id\nFROM listings\nWHERE listing_status = 'live'\nGROUP BY owner_profile_id\nHAVING SUM(CASE WHEN listed_for = 'rent' THEN 1 ELSE 0 END) > 0\n   AND SUM(CASE WHEN listed_for = 'sale' THEN 1 ELSE 0 END) > 0\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- Each `CASE` expression counts one listing type.\n- The `HAVING` clause keeps owners with both positive counts.\n\n## Difference from the optimal approach\n\nIt works well, but `FILTER` is shorter."
      },
      {
        "approach_title": "CTE mixed owners",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH owner_inventory AS (\n  SELECT owner_profile_id, COUNT(*) FILTER (WHERE listed_for = 'rent') AS rent_count, COUNT(*) FILTER (WHERE listed_for = 'sale') AS sale_count\n  FROM listings\n  WHERE listing_status = 'live'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id\nFROM owner_inventory\nWHERE rent_count > 0 AND sale_count > 0\nORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute rent and sale counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH owner_inventory AS (\n  SELECT owner_profile_id,\n         COUNT(*) FILTER (WHERE listed_for = 'rent') AS rent_count,\n         COUNT(*) FILTER (WHERE listed_for = 'sale') AS sale_count\n  FROM listings\n  WHERE listing_status = 'live'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id\nFROM owner_inventory\nWHERE rent_count > 0 AND sale_count > 0\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per owner with both counts.\n- The outer query keeps owners with both inventory types.\n\n## Difference from the optimal approach\n\nIt is easier to inspect, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_083",
    "approaches": [
      {
        "approach_title": "Left join offers",
        "approach_type": "anti_join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT pv.listing_id, COUNT(*) AS completed_visit_count FROM property_visits pv LEFT JOIN offers o ON pv.listing_id = o.listing_id WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING COUNT(o.id) = 0 ORDER BY completed_visit_count DESC, pv.listing_id ASC;",
        "explanation": "## Approach\n\nStart from completed visits, left join offers, then keep listings with zero offers.\n\n## Query\n\n```sql\nSELECT pv.listing_id, COUNT(*) AS completed_visit_count\nFROM property_visits pv\nLEFT JOIN offers o ON pv.listing_id = o.listing_id\nWHERE pv.visit_status = 'completed'\nGROUP BY pv.listing_id\nHAVING COUNT(o.id) = 0\nORDER BY completed_visit_count DESC, pv.listing_id ASC;\n```\n\n## Explanation\n\n- `WHERE pv.visit_status = 'completed'` keeps only completed visits.\n- The left join keeps listings even if no offer exists.\n- `COUNT(o.id) = 0` identifies listings with no offer rows.\n- `COUNT(*)` counts completed visits for those listings.\n\n## Why this is optimal\n\nIt combines the visit metric and no-offer condition in one query."
      },
      {
        "approach_title": "Not exists offers",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT pv.listing_id, COUNT(*) AS completed_visit_count FROM property_visits pv WHERE pv.visit_status = 'completed' AND NOT EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = pv.listing_id) GROUP BY pv.listing_id ORDER BY completed_visit_count DESC, pv.listing_id ASC;",
        "explanation": "## Approach\n\nKeep completed visits only for listings where no offer exists.\n\n## Query\n\n```sql\nSELECT pv.listing_id, COUNT(*) AS completed_visit_count\nFROM property_visits pv\nWHERE pv.visit_status = 'completed'\n  AND NOT EXISTS (\n    SELECT 1\n    FROM offers o\n    WHERE o.listing_id = pv.listing_id\n  )\nGROUP BY pv.listing_id\nORDER BY completed_visit_count DESC, pv.listing_id ASC;\n```\n\n## Explanation\n\n- `NOT EXISTS` removes listings that have any offer row.\n- The remaining completed visits are then counted per listing.\n\n## Difference from the optimal approach\n\nAlso correct, but the left join plus zero-count pattern keeps the anti-join more visible."
      },
      {
        "approach_title": "CTE no offer visits",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH completed_no_offer AS (\n  SELECT pv.listing_id\n  FROM property_visits pv\n  WHERE pv.visit_status = 'completed'\n    AND NOT EXISTS (\n      SELECT 1\n      FROM offers o\n      WHERE o.listing_id = pv.listing_id\n    )\n)\nSELECT listing_id, COUNT(*) AS completed_visit_count\nFROM completed_no_offer\nGROUP BY listing_id\nORDER BY completed_visit_count DESC, listing_id ASC;",
        "explanation": "## Approach\n\nFirst isolate completed visits for listings with no offers, then count them.\n\n## Query\n\n```sql\nWITH completed_no_offer AS (\n  SELECT pv.listing_id\n  FROM property_visits pv\n  WHERE pv.visit_status = 'completed'\n    AND NOT EXISTS (\n      SELECT 1\n      FROM offers o\n      WHERE o.listing_id = pv.listing_id\n    )\n)\nSELECT listing_id, COUNT(*) AS completed_visit_count\nFROM completed_no_offer\nGROUP BY listing_id\nORDER BY completed_visit_count DESC, listing_id ASC;\n```\n\n## Explanation\n\n- The CTE stores qualifying visit rows.\n- The outer query counts them per listing.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_084",
    "approaches": [
      {
        "approach_title": "Late fee count",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT tenant_user_id, COUNT(*) AS late_fee_payment_count FROM rent_payments WHERE late_fee > 0 GROUP BY tenant_user_id HAVING COUNT(*) > 1 ORDER BY late_fee_payment_count DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nKeep payments with a late fee, then count them per tenant.\n\n## Query\n\n```sql\nSELECT tenant_user_id, COUNT(*) AS late_fee_payment_count\nFROM rent_payments\nWHERE late_fee > 0\nGROUP BY tenant_user_id\nHAVING COUNT(*) > 1\nORDER BY late_fee_payment_count DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- `late_fee > 0` keeps only payments where a fee was charged.\n- `GROUP BY tenant_user_id` creates one group per tenant.\n- `HAVING COUNT(*) > 1` keeps tenants charged late fees more than once.\n\n## Why this is optimal\n\nIt directly answers the question with a simple grouped filter."
      },
      {
        "approach_title": "CTE late tenants",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH tenant_late_fees AS (\n  SELECT tenant_user_id, COUNT(*) AS late_fee_payment_count\n  FROM rent_payments\n  WHERE late_fee > 0\n  GROUP BY tenant_user_id\n)\nSELECT tenant_user_id, late_fee_payment_count\nFROM tenant_late_fees\nWHERE late_fee_payment_count > 1\nORDER BY late_fee_payment_count DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCount late-fee payments first, then filter outside.\n\n## Query\n\n```sql\nWITH tenant_late_fees AS (\n  SELECT tenant_user_id, COUNT(*) AS late_fee_payment_count\n  FROM rent_payments\n  WHERE late_fee > 0\n  GROUP BY tenant_user_id\n)\nSELECT tenant_user_id, late_fee_payment_count\nFROM tenant_late_fees\nWHERE late_fee_payment_count > 1\nORDER BY late_fee_payment_count DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per tenant.\n- The outer query keeps tenants above the threshold.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT tenant_user_id, COUNT(id) AS late_fee_payment_count FROM rent_payments WHERE late_fee > 0 GROUP BY tenant_user_id HAVING COUNT(id) > 1 ORDER BY late_fee_payment_count DESC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCount payment ids instead of counting rows.\n\n## Query\n\n```sql\nSELECT tenant_user_id, COUNT(id) AS late_fee_payment_count\nFROM rent_payments\nWHERE late_fee > 0\nGROUP BY tenant_user_id\nHAVING COUNT(id) > 1\nORDER BY late_fee_payment_count DESC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- Since `id` is never NULL, `COUNT(id)` matches `COUNT(*)`.\n- The grouped logic stays the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_085",
    "approaches": [
      {
        "approach_title": "Avg rent per sqft",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.locality, AVG(l.rent_amount / NULLIF(p.built_up_area_sqft, 0)) AS avg_rent_per_sqft FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL AND p.built_up_area_sqft IS NOT NULL AND p.built_up_area_sqft > 0 GROUP BY loc.locality ORDER BY avg_rent_per_sqft DESC, loc.locality ASC;",
        "explanation": "## Approach\n\nJoin rental listings to property area and locality, compute rent per sqft for each listing, then average that value by locality.\n\n## Query\n\n```sql\nSELECT loc.locality, AVG(l.rent_amount / NULLIF(p.built_up_area_sqft, 0)) AS avg_rent_per_sqft\nFROM listings l\nJOIN properties p ON l.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE l.listing_status = 'live'\n  AND l.listed_for = 'rent'\n  AND l.rent_amount IS NOT NULL\n  AND p.built_up_area_sqft IS NOT NULL\n  AND p.built_up_area_sqft > 0\nGROUP BY loc.locality\nORDER BY avg_rent_per_sqft DESC, loc.locality ASC;\n```\n\n## Explanation\n\n- The joins bring together rent, area, and locality.\n- The filters remove rows with missing or zero area values.\n- `l.rent_amount / p.built_up_area_sqft` calculates rent per sqft for each listing.\n- `AVG(...)` then averages those listing-level ratios per locality.\n\n## Why this is optimal\n\nIt matches the question exactly because it averages rent-per-sqft at the listing level."
      },
      {
        "approach_title": "CTE per sqft",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_rent_per_sqft AS (\n  SELECT loc.locality, l.rent_amount / NULLIF(p.built_up_area_sqft, 0) AS rent_per_sqft\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n    AND p.built_up_area_sqft IS NOT NULL\n    AND p.built_up_area_sqft > 0\n)\nSELECT locality, AVG(rent_per_sqft) AS avg_rent_per_sqft\nFROM listing_rent_per_sqft\nGROUP BY locality\nORDER BY avg_rent_per_sqft DESC, locality ASC;",
        "explanation": "## Approach\n\nCalculate rent per sqft for each listing first, then average those values by locality.\n\n## Query\n\n```sql\nWITH listing_rent_per_sqft AS (\n  SELECT loc.locality, l.rent_amount / NULLIF(p.built_up_area_sqft, 0) AS rent_per_sqft\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n    AND p.built_up_area_sqft IS NOT NULL\n    AND p.built_up_area_sqft > 0\n)\nSELECT locality, AVG(rent_per_sqft) AS avg_rent_per_sqft\nFROM listing_rent_per_sqft\nGROUP BY locality\nORDER BY avg_rent_per_sqft DESC, locality ASC;\n```\n\n## Explanation\n\n- The CTE stores one normalized rent-per-sqft value per listing.\n- The outer query averages those values per locality.\n- The ordering matches the expected result.\n\n## Difference from the optimal approach\n\nIt is easier to inspect in two steps, but longer."
      },
      {
        "approach_title": "Subquery avg",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT locality, AVG(rent_per_sqft) AS avg_rent_per_sqft FROM (SELECT loc.locality, l.rent_amount / NULLIF(p.built_up_area_sqft, 0) AS rent_per_sqft FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL AND p.built_up_area_sqft IS NOT NULL AND p.built_up_area_sqft > 0) x GROUP BY locality ORDER BY avg_rent_per_sqft DESC, locality ASC;",
        "explanation": "## Approach\n\nCompute rent per sqft in a derived table, then average by locality outside.\n\n## Query\n\n```sql\nSELECT locality, AVG(rent_per_sqft) AS avg_rent_per_sqft\nFROM (\n  SELECT loc.locality,\n         l.rent_amount / NULLIF(p.built_up_area_sqft, 0) AS rent_per_sqft\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n    AND p.built_up_area_sqft IS NOT NULL\n    AND p.built_up_area_sqft > 0\n) x\nGROUP BY locality\nORDER BY avg_rent_per_sqft DESC, locality ASC;\n```\n\n## Explanation\n\n- The subquery calculates one rent-per-sqft value per listing.\n- The outer query averages those values per locality.\n- This preserves the same logic as the optimal solution.\n\n## Difference from the optimal approach\n\nIt is valid and equivalent, but a bit more verbose than doing it directly."
      }
    ]
  },
  {
    "code": "REALESTATE_086",
    "approaches": [
      {
        "approach_title": "Join drop count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.owner_profile_id, COUNT(*) AS price_drop_count FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL AND lph.new_rent_amount < lph.old_rent_amount GROUP BY l.owner_profile_id HAVING COUNT(*) > 1 ORDER BY price_drop_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin price history to listings, keep rent drops only, then count drops per owner.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(*) AS price_drop_count\nFROM listing_price_history lph\nJOIN listings l ON lph.listing_id = l.id\nWHERE lph.old_rent_amount IS NOT NULL\n  AND lph.new_rent_amount IS NOT NULL\n  AND lph.new_rent_amount < lph.old_rent_amount\nGROUP BY l.owner_profile_id\nHAVING COUNT(*) > 1\nORDER BY price_drop_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join maps each price history row to the owner of its listing.\n- The filter keeps only rent drop records.\n- `HAVING COUNT(*) > 1` keeps owners with repeated drops.\n\n## Why this is optimal\n\nIt directly counts the exact event type the question asks about."
      },
      {
        "approach_title": "CTE owner drops",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH owner_drops AS (\n  SELECT l.owner_profile_id, COUNT(*) AS price_drop_count\n  FROM listing_price_history lph\n  JOIN listings l ON lph.listing_id = l.id\n  WHERE lph.old_rent_amount IS NOT NULL\n    AND lph.new_rent_amount IS NOT NULL\n    AND lph.new_rent_amount < lph.old_rent_amount\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, price_drop_count\nFROM owner_drops\nWHERE price_drop_count > 1\nORDER BY price_drop_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute owner drop counts first, then filter outside.\n\n## Query\n\n```sql\nWITH owner_drops AS (\n  SELECT l.owner_profile_id, COUNT(*) AS price_drop_count\n  FROM listing_price_history lph\n  JOIN listings l ON lph.listing_id = l.id\n  WHERE lph.old_rent_amount IS NOT NULL\n    AND lph.new_rent_amount IS NOT NULL\n    AND lph.new_rent_amount < lph.old_rent_amount\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, price_drop_count\nFROM owner_drops\nWHERE price_drop_count > 1\nORDER BY price_drop_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per owner.\n- The outer query applies the threshold and ordering.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Difference filter",
        "approach_type": "join",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.owner_profile_id, COUNT(*) AS price_drop_count FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL AND lph.old_rent_amount - lph.new_rent_amount > 0 GROUP BY l.owner_profile_id HAVING COUNT(*) > 1 ORDER BY price_drop_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nDetect price drops using a positive difference between old and new rent.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(*) AS price_drop_count\nFROM listing_price_history lph\nJOIN listings l ON lph.listing_id = l.id\nWHERE lph.old_rent_amount IS NOT NULL\n  AND lph.new_rent_amount IS NOT NULL\n  AND lph.old_rent_amount - lph.new_rent_amount > 0\nGROUP BY l.owner_profile_id\nHAVING COUNT(*) > 1\nORDER BY price_drop_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- A positive difference means the new rent is lower than the old rent.\n- The owner-level grouped count stays the same.\n\n## Difference from the optimal approach\n\nIt works, but the direct comparison is easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_087",
    "approaches": [
      {
        "approach_title": "Null offer id",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE offer_id IS NULL ORDER BY id ASC;",
        "explanation": "## Approach\n\nKeep rental applications that have no linked offer.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id\nFROM rental_applications\nWHERE offer_id IS NULL\nORDER BY id ASC;\n```\n\n## Explanation\n\n- `offer_id IS NULL` identifies applications created without an associated offer record.\n- The selected columns match the expected output.\n- `ORDER BY id ASC` matches the required ordering.\n\n## Why this is optimal\n\nThis is the most direct way to find rows missing a foreign key reference."
      },
      {
        "approach_title": "CTE null offers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH offerless_apps AS (\n  SELECT id, listing_id, seeker_user_id\n  FROM rental_applications\n  WHERE offer_id IS NULL\n)\nSELECT id, listing_id, seeker_user_id\nFROM offerless_apps\nORDER BY id ASC;",
        "explanation": "## Approach\n\nStore applications without linked offers in a CTE, then return them.\n\n## Query\n\n```sql\nWITH offerless_apps AS (\n  SELECT id, listing_id, seeker_user_id\n  FROM rental_applications\n  WHERE offer_id IS NULL\n)\nSELECT id, listing_id, seeker_user_id\nFROM offerless_apps\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The CTE isolates the matching application rows.\n- The outer query applies the final sort.\n\n## Difference from the optimal approach\n\nIt gives the same result, but with more code."
      },
      {
        "approach_title": "Case null check",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE CASE WHEN offer_id IS NULL THEN true ELSE false END ORDER BY id ASC;",
        "explanation": "## Approach\n\nUse a `CASE` expression to keep rows with no linked offer.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id\nFROM rental_applications\nWHERE CASE WHEN offer_id IS NULL THEN true ELSE false END\nORDER BY id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression returns true only for rows where `offer_id` is NULL.\n- The final result matches the simple filter.\n\n## Difference from the optimal approach\n\nIt works, but is unnecessarily verbose."
      }
    ]
  },
  {
    "code": "REALESTATE_088",
    "approaches": [
      {
        "approach_title": "Distinct owner groups",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT p.owner_profile_id FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.id, p.owner_profile_id HAVING COUNT(pa.id) > 5 ORDER BY p.owner_profile_id ASC;",
        "explanation": "## Approach\n\nGroup amenities at the property level, keep properties with more than 5 amenities, then return distinct owners.\n\n## Query\n\n```sql\nSELECT DISTINCT p.owner_profile_id\nFROM properties p\nJOIN property_amenities pa ON p.id = pa.property_id\nGROUP BY p.id, p.owner_profile_id\nHAVING COUNT(pa.id) > 5\nORDER BY p.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The join connects each property to its amenity mappings.\n- Grouping by property lets the query count amenities per property.\n- `HAVING COUNT(pa.id) > 5` keeps only highly equipped properties.\n- `DISTINCT` removes duplicate owners if they have multiple such properties.\n\n## Why this is optimal\n\nIt matches the question exactly because the threshold applies at the property level, not the owner level."
      },
      {
        "approach_title": "CTE rich properties",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH rich_properties AS (\n  SELECT p.owner_profile_id\n  FROM properties p\n  JOIN property_amenities pa ON p.id = pa.property_id\n  GROUP BY p.id, p.owner_profile_id\n  HAVING COUNT(pa.id) > 5\n)\nSELECT DISTINCT owner_profile_id\nFROM rich_properties\nORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nFind qualifying properties first, then return unique owners.\n\n## Query\n\n```sql\nWITH rich_properties AS (\n  SELECT p.owner_profile_id\n  FROM properties p\n  JOIN property_amenities pa ON p.id = pa.property_id\n  GROUP BY p.id, p.owner_profile_id\n  HAVING COUNT(pa.id) > 5\n)\nSELECT DISTINCT owner_profile_id\nFROM rich_properties\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores owners of properties that exceed the amenity threshold.\n- The outer query removes duplicates.\n\n## Difference from the optimal approach\n\nIt is easier to follow step by step, but longer."
      },
      {
        "approach_title": "Exists amenity property",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT p.owner_profile_id FROM properties p WHERE EXISTS (SELECT 1 FROM property_amenities pa WHERE pa.property_id = p.id GROUP BY pa.property_id HAVING COUNT(*) > 5) ORDER BY p.owner_profile_id ASC;",
        "explanation": "## Approach\n\nCheck whether each property has more than 5 amenity rows using `EXISTS`.\n\n## Query\n\n```sql\nSELECT DISTINCT p.owner_profile_id\nFROM properties p\nWHERE EXISTS (\n  SELECT 1\n  FROM property_amenities pa\n  WHERE pa.property_id = p.id\n  GROUP BY pa.property_id\n  HAVING COUNT(*) > 5\n)\nORDER BY p.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The subquery checks the amenity count for one property.\n- `EXISTS` keeps properties above the threshold.\n- `DISTINCT` returns each owner only once.\n\n## Difference from the optimal approach\n\nCorrect, but the grouped join is more straightforward."
      }
    ]
  },
  {
    "code": "REALESTATE_089",
    "approaches": [
      {
        "approach_title": "Join locality city avgs",
        "approach_type": "subquery",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT x.city, x.locality, x.avg_locality_rent FROM (SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city, loc.locality) x JOIN (SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city) y ON x.city = y.city WHERE x.avg_locality_rent > y.avg_city_rent ORDER BY x.avg_locality_rent DESC, x.city ASC, x.locality ASC;",
        "explanation": "## Approach\n\nCompute locality averages and city averages separately, join them by city, then compare the two values.\n\n## Query\n\n```sql\nSELECT x.city, x.locality, x.avg_locality_rent\nFROM (\n  SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n  GROUP BY loc.city, loc.locality\n) x\nJOIN (\n  SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live'\n    AND l.listed_for = 'rent'\n    AND l.rent_amount IS NOT NULL\n  GROUP BY loc.city\n) y ON x.city = y.city\nWHERE x.avg_locality_rent > y.avg_city_rent\nORDER BY x.avg_locality_rent DESC, x.city ASC, x.locality ASC;\n```\n\n## Explanation\n\n- The first subquery computes average rent per locality within each city.\n- The second subquery computes average rent per city.\n- Joining by city makes both averages available for comparison.\n- The final filter keeps only localities above their city average.\n\n## Why this is optimal\n\nIt cleanly separates the two aggregation levels and compares them correctly."
      },
      {
        "approach_title": "CTE avg compare",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH locality_avg AS (\n  SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL\n  GROUP BY loc.city, loc.locality\n), city_avg AS (\n  SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL\n  GROUP BY loc.city\n)\nSELECT la.city, la.locality, la.avg_locality_rent\nFROM locality_avg la\nJOIN city_avg ca ON la.city = ca.city\nWHERE la.avg_locality_rent > ca.avg_city_rent\nORDER BY la.avg_locality_rent DESC, la.city ASC, la.locality ASC;",
        "explanation": "## Approach\n\nUse one CTE for locality averages and another for city averages, then compare them.\n\n## Query\n\n```sql\nWITH locality_avg AS (\n  SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL\n  GROUP BY loc.city, loc.locality\n), city_avg AS (\n  SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent\n  FROM listings l\n  JOIN properties p ON l.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL\n  GROUP BY loc.city\n)\nSELECT la.city, la.locality, la.avg_locality_rent\nFROM locality_avg la\nJOIN city_avg ca ON la.city = ca.city\nWHERE la.avg_locality_rent > ca.avg_city_rent\nORDER BY la.avg_locality_rent DESC, la.city ASC, la.locality ASC;\n```\n\n## Explanation\n\n- Each CTE computes one aggregation level.\n- The outer query joins them and applies the comparison.\n- This preserves the exact city-average logic required by the question.\n\n## Difference from the optimal approach\n\nVery readable, but slightly longer."
      },
      {
        "approach_title": "Window over city rows",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT city, locality, avg_locality_rent FROM (SELECT city, locality, avg_locality_rent, AVG(rent_amount) OVER (PARTITION BY city) AS avg_city_rent FROM (SELECT loc.city, loc.locality, l.rent_amount, AVG(l.rent_amount) OVER (PARTITION BY loc.city, loc.locality) AS avg_locality_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL) x) y WHERE avg_locality_rent > avg_city_rent GROUP BY city, locality, avg_locality_rent ORDER BY avg_locality_rent DESC, city ASC, locality ASC;",
        "explanation": "## Approach\n\nUse window functions on the underlying city rental rows so the city average is computed from listing rows, not from already-aggregated locality averages.\n\n## Query\n\n```sql\nSELECT city, locality, avg_locality_rent\nFROM (\n  SELECT city,\n         locality,\n         avg_locality_rent,\n         AVG(rent_amount) OVER (PARTITION BY city) AS avg_city_rent\n  FROM (\n    SELECT loc.city,\n           loc.locality,\n           l.rent_amount,\n           AVG(l.rent_amount) OVER (PARTITION BY loc.city, loc.locality) AS avg_locality_rent\n    FROM listings l\n    JOIN properties p ON l.property_id = p.id\n    JOIN locations loc ON p.location_id = loc.id\n    WHERE l.listing_status = 'live'\n      AND l.listed_for = 'rent'\n      AND l.rent_amount IS NOT NULL\n  ) x\n) y\nWHERE avg_locality_rent > avg_city_rent\nGROUP BY city, locality, avg_locality_rent\nORDER BY avg_locality_rent DESC, city ASC, locality ASC;\n```\n\n## Explanation\n\n- The inner window computes `avg_locality_rent` for each listing row within its city and locality.\n- The outer window computes `avg_city_rent` across all listing rows in the same city.\n- This fixes the earlier failed version, which incorrectly averaged locality averages instead of averaging all city listing rents.\n- The final `GROUP BY` removes duplicate locality rows after the window calculations.\n\n## Difference from the optimal approach\n\nIt works correctly, but it is more advanced and harder to read than the subquery or CTE approach."
      }
    ]
  },
  {
    "code": "REALESTATE_090",
    "approaches": [
      {
        "approach_title": "Join full funnel",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT DISTINCT i.seeker_user_id FROM inquiries i JOIN property_visits pv ON i.listing_id = pv.listing_id AND i.seeker_user_id = pv.seeker_user_id JOIN offers o ON i.listing_id = o.listing_id AND i.seeker_user_id = o.seeker_user_id JOIN leases le ON i.listing_id = le.listing_id AND le.tenant_user_id = i.seeker_user_id WHERE pv.visit_status = 'completed' AND o.offer_status = 'accepted' AND le.lease_status = 'active' ORDER BY i.seeker_user_id ASC;",
        "explanation": "## Approach\n\nJoin the seeker through inquiry, completed visit, accepted offer, and active lease on the same listing.\n\n## Query\n\n```sql\nSELECT DISTINCT i.seeker_user_id\nFROM inquiries i\nJOIN property_visits pv\n  ON i.listing_id = pv.listing_id\n AND i.seeker_user_id = pv.seeker_user_id\nJOIN offers o\n  ON i.listing_id = o.listing_id\n AND i.seeker_user_id = o.seeker_user_id\nJOIN leases le\n  ON i.listing_id = le.listing_id\n AND le.tenant_user_id = i.seeker_user_id\nWHERE pv.visit_status = 'completed'\n  AND o.offer_status = 'accepted'\n  AND le.lease_status = 'active'\nORDER BY i.seeker_user_id ASC;\n```\n\n## Explanation\n\n- The joins make sure all four steps belong to the same seeker and listing.\n- The status filters enforce the right funnel stage outcomes.\n- `DISTINCT` removes duplicate seekers caused by multiple qualifying rows.\n\n## Why this is optimal\n\nIt explicitly enforces the full funnel across the correct user-listing relationships."
      },
      {
        "approach_title": "Exists funnel",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT DISTINCT i.seeker_user_id FROM inquiries i WHERE EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = i.listing_id AND pv.seeker_user_id = i.seeker_user_id AND pv.visit_status = 'completed') AND EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = i.listing_id AND o.seeker_user_id = i.seeker_user_id AND o.offer_status = 'accepted') AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = i.listing_id AND le.tenant_user_id = i.seeker_user_id AND le.lease_status = 'active') ORDER BY i.seeker_user_id ASC;",
        "explanation": "## Approach\n\nStart from inquiries and use `EXISTS` to verify the remaining funnel stages for the same seeker and listing.\n\n## Query\n\n```sql\nSELECT DISTINCT i.seeker_user_id\nFROM inquiries i\nWHERE EXISTS (\n  SELECT 1\n  FROM property_visits pv\n  WHERE pv.listing_id = i.listing_id\n    AND pv.seeker_user_id = i.seeker_user_id\n    AND pv.visit_status = 'completed'\n)\n  AND EXISTS (\n    SELECT 1\n    FROM offers o\n    WHERE o.listing_id = i.listing_id\n      AND o.seeker_user_id = i.seeker_user_id\n      AND o.offer_status = 'accepted'\n  )\n  AND EXISTS (\n    SELECT 1\n    FROM leases le\n    WHERE le.listing_id = i.listing_id\n      AND le.tenant_user_id = i.seeker_user_id\n      AND le.lease_status = 'active'\n  )\nORDER BY i.seeker_user_id ASC;\n```\n\n## Explanation\n\n- Each `EXISTS` clause checks for one required funnel stage.\n- The conditions align the same seeker with the same listing throughout the funnel.\n- `DISTINCT` removes duplicate seekers.\n\n## Difference from the optimal approach\n\nAlso correct, but the join-based query makes the row relationships more explicit."
      },
      {
        "approach_title": "CTE qualified seekers",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH qualified_seekers AS (\n  SELECT DISTINCT i.seeker_user_id\n  FROM inquiries i\n  JOIN property_visits pv ON i.listing_id = pv.listing_id AND i.seeker_user_id = pv.seeker_user_id\n  JOIN offers o ON i.listing_id = o.listing_id AND i.seeker_user_id = o.seeker_user_id\n  JOIN leases le ON i.listing_id = le.listing_id AND le.tenant_user_id = i.seeker_user_id\n  WHERE pv.visit_status = 'completed'\n    AND o.offer_status = 'accepted'\n    AND le.lease_status = 'active'\n)\nSELECT seeker_user_id\nFROM qualified_seekers\nORDER BY seeker_user_id ASC;",
        "explanation": "## Approach\n\nBuild the set of qualified seekers in a CTE, then return it.\n\n## Query\n\n```sql\nWITH qualified_seekers AS (\n  SELECT DISTINCT i.seeker_user_id\n  FROM inquiries i\n  JOIN property_visits pv ON i.listing_id = pv.listing_id AND i.seeker_user_id = pv.seeker_user_id\n  JOIN offers o ON i.listing_id = o.listing_id AND i.seeker_user_id = o.seeker_user_id\n  JOIN leases le ON i.listing_id = le.listing_id AND le.tenant_user_id = i.seeker_user_id\n  WHERE pv.visit_status = 'completed'\n    AND o.offer_status = 'accepted'\n    AND le.lease_status = 'active'\n)\nSELECT seeker_user_id\nFROM qualified_seekers\nORDER BY seeker_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores seekers who completed the full funnel.\n- The outer query simply returns them in the expected order.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_091",
    "approaches": [
      {
        "approach_title": "Join city spend",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost FROM maintenance_tickets mt JOIN properties p ON mt.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_maintenance_cost DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin maintenance tickets to property locations, then sum resolution cost by city.\n\n## Query\n\n```sql\nSELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost\nFROM maintenance_tickets mt\nJOIN properties p ON mt.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nGROUP BY loc.city\nORDER BY total_maintenance_cost DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins connect each maintenance ticket to its city.\n- `COALESCE(mt.resolution_cost, 0)` treats missing costs as 0.\n- `SUM(...)` adds maintenance spend inside each city group.\n- The ordering ranks cities from highest spend to lowest.\n\n## Why this is optimal\n\nIt directly maps property-level maintenance cost to city-level totals in one grouped query."
      },
      {
        "approach_title": "CTE city spend",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_spend AS (\n  SELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost\n  FROM maintenance_tickets mt\n  JOIN properties p ON mt.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  GROUP BY loc.city\n)\nSELECT city, total_maintenance_cost\nFROM city_spend\nORDER BY total_maintenance_cost DESC, city ASC;",
        "explanation": "## Approach\n\nCompute city maintenance totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH city_spend AS (\n  SELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost\n  FROM maintenance_tickets mt\n  JOIN properties p ON mt.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  GROUP BY loc.city\n)\nSELECT city, total_maintenance_cost\nFROM city_spend\nORDER BY total_maintenance_cost DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per city.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Case sum",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, SUM(CASE WHEN mt.resolution_cost IS NULL THEN 0 ELSE mt.resolution_cost END) AS total_maintenance_cost FROM maintenance_tickets mt JOIN properties p ON mt.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_maintenance_cost DESC, loc.city ASC;",
        "explanation": "## Approach\n\nReplace NULL costs with 0 using `CASE`, then sum them per city.\n\n## Query\n\n```sql\nSELECT loc.city,\n       SUM(CASE WHEN mt.resolution_cost IS NULL THEN 0 ELSE mt.resolution_cost END) AS total_maintenance_cost\nFROM maintenance_tickets mt\nJOIN properties p ON mt.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nGROUP BY loc.city\nORDER BY total_maintenance_cost DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The `CASE` expression handles missing costs.\n- `SUM` then adds the cleaned values city-wise.\n\n## Difference from the optimal approach\n\nIt works the same way, but `COALESCE` is shorter and cleaner."
      }
    ]
  },
  {
    "code": "REALESTATE_092",
    "approaches": [
      {
        "approach_title": "Rent only filter",
        "approach_type": "conditional_aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0 AND COUNT(*) FILTER (WHERE listed_for = 'sale') = 0 ORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nKeep live listings, then count rent and sale listings separately per owner.\n\n## Query\n\n```sql\nSELECT owner_profile_id\nFROM listings\nWHERE listing_status = 'live'\nGROUP BY owner_profile_id\nHAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0\n   AND COUNT(*) FILTER (WHERE listed_for = 'sale') = 0\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- The filter keeps only live listings.\n- `FILTER` counts live rent listings and live sale listings separately.\n- The `HAVING` clause keeps owners with at least one rent listing and zero sale listings.\n\n## Why this is optimal\n\nIt cleanly expresses the mixed-condition inventory rule in one grouped query."
      },
      {
        "approach_title": "Case counts",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 2,
        "query": "SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING SUM(CASE WHEN listed_for = 'rent' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN listed_for = 'sale' THEN 1 ELSE 0 END) = 0 ORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nUse `CASE` expressions to count rent and sale listings separately.\n\n## Query\n\n```sql\nSELECT owner_profile_id\nFROM listings\nWHERE listing_status = 'live'\nGROUP BY owner_profile_id\nHAVING SUM(CASE WHEN listed_for = 'rent' THEN 1 ELSE 0 END) > 0\n   AND SUM(CASE WHEN listed_for = 'sale' THEN 1 ELSE 0 END) = 0\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- Each `CASE` expression counts one listing type.\n- The `HAVING` clause enforces rent-only live inventory.\n\n## Difference from the optimal approach\n\nIt works well, but `FILTER` is shorter."
      },
      {
        "approach_title": "CTE owner mix",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 3,
        "query": "WITH owner_mix AS (\n  SELECT owner_profile_id, COUNT(*) FILTER (WHERE listed_for = 'rent') AS rent_count, COUNT(*) FILTER (WHERE listed_for = 'sale') AS sale_count\n  FROM listings\n  WHERE listing_status = 'live'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id\nFROM owner_mix\nWHERE rent_count > 0 AND sale_count = 0\nORDER BY owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute rent and sale counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH owner_mix AS (\n  SELECT owner_profile_id,\n         COUNT(*) FILTER (WHERE listed_for = 'rent') AS rent_count,\n         COUNT(*) FILTER (WHERE listed_for = 'sale') AS sale_count\n  FROM listings\n  WHERE listing_status = 'live'\n  GROUP BY owner_profile_id\n)\nSELECT owner_profile_id\nFROM owner_mix\nWHERE rent_count > 0 AND sale_count = 0\nORDER BY owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per owner with both counts.\n- The outer query keeps owners with live rent listings only.\n\n## Difference from the optimal approach\n\nIt is easier to inspect, but longer."
      }
    ]
  },
  {
    "code": "REALESTATE_093",
    "approaches": [
      {
        "approach_title": "Group tenant property",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT property_id, tenant_user_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id, tenant_user_id HAVING COUNT(*) > 1 ORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nGroup leases by property and tenant, then keep pairs with more than one lease.\n\n## Query\n\n```sql\nSELECT property_id, tenant_user_id, COUNT(*) AS lease_count\nFROM leases\nGROUP BY property_id, tenant_user_id\nHAVING COUNT(*) > 1\nORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY property_id, tenant_user_id` creates one group for each tenant-property pair.\n- `COUNT(*)` counts how many leases that tenant had on that property.\n- `HAVING COUNT(*) > 1` keeps repeated tenant-property combinations.\n\n## Why this is optimal\n\nIt directly models the repeated-tenant-on-same-property condition."
      },
      {
        "approach_title": "CTE repeated pairs",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH tenant_property_leases AS (\n  SELECT property_id, tenant_user_id, COUNT(*) AS lease_count\n  FROM leases\n  GROUP BY property_id, tenant_user_id\n)\nSELECT property_id, tenant_user_id, lease_count\nFROM tenant_property_leases\nWHERE lease_count > 1\nORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCompute lease counts for each tenant-property pair first, then filter outside.\n\n## Query\n\n```sql\nWITH tenant_property_leases AS (\n  SELECT property_id, tenant_user_id, COUNT(*) AS lease_count\n  FROM leases\n  GROUP BY property_id, tenant_user_id\n)\nSELECT property_id, tenant_user_id, lease_count\nFROM tenant_property_leases\nWHERE lease_count > 1\nORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per tenant-property pair.\n- The outer query keeps only repeated pairs.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Count ids",
        "approach_type": "aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT property_id, tenant_user_id, COUNT(id) AS lease_count FROM leases GROUP BY property_id, tenant_user_id HAVING COUNT(id) > 1 ORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;",
        "explanation": "## Approach\n\nCount lease ids inside each property-tenant group.\n\n## Query\n\n```sql\nSELECT property_id, tenant_user_id, COUNT(id) AS lease_count\nFROM leases\nGROUP BY property_id, tenant_user_id\nHAVING COUNT(id) > 1\nORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;\n```\n\n## Explanation\n\n- Lease ids are never NULL, so `COUNT(id)` matches `COUNT(*)`.\n- The grouped result remains the same.\n\n## Difference from the optimal approach\n\nCorrect, but `COUNT(*)` is more direct."
      }
    ]
  },
  {
    "code": "REALESTATE_094",
    "approaches": [
      {
        "approach_title": "Distinct compare",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.id, COUNT(DISTINCT pv.id) AS completed_visit_count, COUNT(DISTINCT i.id) AS inquiry_count FROM listings l LEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed' LEFT JOIN inquiries i ON l.id = i.listing_id GROUP BY l.id HAVING COUNT(DISTINCT pv.id) > COUNT(DISTINCT i.id) ORDER BY completed_visit_count DESC, l.id ASC;",
        "explanation": "## Approach\n\nJoin listings to completed visits and inquiries, count both sides distinctly, then compare them.\n\n## Query\n\n```sql\nSELECT l.id,\n       COUNT(DISTINCT pv.id) AS completed_visit_count,\n       COUNT(DISTINCT i.id) AS inquiry_count\nFROM listings l\nLEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed'\nLEFT JOIN inquiries i ON l.id = i.listing_id\nGROUP BY l.id\nHAVING COUNT(DISTINCT pv.id) > COUNT(DISTINCT i.id)\nORDER BY completed_visit_count DESC, l.id ASC;\n```\n\n## Explanation\n\n- `LEFT JOIN` keeps listings even if one side has no rows.\n- The completed-visit condition is placed inside the join so only completed visits are counted.\n- `COUNT(DISTINCT ...)` avoids overcounting from joining two child tables.\n- The `HAVING` clause compares the two grouped counts.\n\n## Why this is optimal\n\nIt handles join multiplication safely and keeps the comparison logic in one query."
      },
      {
        "approach_title": "CTE compare counts",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH listing_counts AS (\n  SELECT l.id, COUNT(DISTINCT pv.id) AS completed_visit_count, COUNT(DISTINCT i.id) AS inquiry_count\n  FROM listings l\n  LEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed'\n  LEFT JOIN inquiries i ON l.id = i.listing_id\n  GROUP BY l.id\n)\nSELECT id, completed_visit_count, inquiry_count\nFROM listing_counts\nWHERE completed_visit_count > inquiry_count\nORDER BY completed_visit_count DESC, id ASC;",
        "explanation": "## Approach\n\nCompute both counts first, then compare them in the outer query.\n\n## Query\n\n```sql\nWITH listing_counts AS (\n  SELECT l.id,\n         COUNT(DISTINCT pv.id) AS completed_visit_count,\n         COUNT(DISTINCT i.id) AS inquiry_count\n  FROM listings l\n  LEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed'\n  LEFT JOIN inquiries i ON l.id = i.listing_id\n  GROUP BY l.id\n)\nSELECT id, completed_visit_count, inquiry_count\nFROM listing_counts\nWHERE completed_visit_count > inquiry_count\nORDER BY completed_visit_count DESC, id ASC;\n```\n\n## Explanation\n\n- The CTE stores the two metrics per listing.\n- The outer query compares them and returns the matches.\n\n## Difference from the optimal approach\n\nIt is easier to inspect step by step, but longer."
      },
      {
        "approach_title": "Subquery compare",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.id, (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AS completed_visit_count, (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) AS inquiry_count FROM listings l WHERE (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') > (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) ORDER BY completed_visit_count DESC, l.id ASC;",
        "explanation": "## Approach\n\nUse correlated subqueries to count completed visits and inquiries per listing.\n\n## Query\n\n```sql\nSELECT l.id,\n       (SELECT COUNT(*)\n        FROM property_visits pv\n        WHERE pv.listing_id = l.id\n          AND pv.visit_status = 'completed') AS completed_visit_count,\n       (SELECT COUNT(*)\n        FROM inquiries i\n        WHERE i.listing_id = l.id) AS inquiry_count\nFROM listings l\nWHERE (SELECT COUNT(*)\n       FROM property_visits pv\n       WHERE pv.listing_id = l.id\n         AND pv.visit_status = 'completed')\n    > (SELECT COUNT(*)\n       FROM inquiries i\n       WHERE i.listing_id = l.id)\nORDER BY completed_visit_count DESC, l.id ASC;\n```\n\n## Explanation\n\n- Each subquery computes one metric for one listing.\n- The outer query compares the two counts.\n\n## Difference from the optimal approach\n\nIt works, but repeated correlated subqueries are less efficient."
      }
    ]
  },
  {
    "code": "REALESTATE_095",
    "approaches": [
      {
        "approach_title": "Review older than 7d",
        "approach_type": "filtering",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT id, listing_id, seeker_user_id, created_at FROM rental_applications WHERE application_status = 'under_review' AND created_at < NOW() - INTERVAL '7 days' ORDER BY created_at ASC, id ASC;",
        "explanation": "## Approach\n\nKeep applications under review whose creation time is older than 7 days.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id, created_at\nFROM rental_applications\nWHERE application_status = 'under_review'\n  AND created_at < NOW() - INTERVAL '7 days'\nORDER BY created_at ASC, id ASC;\n```\n\n## Explanation\n\n- The status filter keeps only applications still under review.\n- The date condition keeps only older records beyond the threshold.\n- Sorting by `created_at ASC` shows the oldest pending reviews first.\n\n## Why this is optimal\n\nIt directly expresses the age-based status filter with minimal SQL."
      },
      {
        "approach_title": "CTE stale reviews",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH stale_reviews AS (\n  SELECT id, listing_id, seeker_user_id, created_at\n  FROM rental_applications\n  WHERE application_status = 'under_review'\n    AND created_at < NOW() - INTERVAL '7 days'\n)\nSELECT id, listing_id, seeker_user_id, created_at\nFROM stale_reviews\nORDER BY created_at ASC, id ASC;",
        "explanation": "## Approach\n\nStore long-pending reviews in a CTE, then return them.\n\n## Query\n\n```sql\nWITH stale_reviews AS (\n  SELECT id, listing_id, seeker_user_id, created_at\n  FROM rental_applications\n  WHERE application_status = 'under_review'\n    AND created_at < NOW() - INTERVAL '7 days'\n)\nSELECT id, listing_id, seeker_user_id, created_at\nFROM stale_reviews\nORDER BY created_at ASC, id ASC;\n```\n\n## Explanation\n\n- The CTE isolates applications that match both conditions.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more modular, but longer."
      },
      {
        "approach_title": "Current timestamp interval",
        "approach_type": "filtering",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT id, listing_id, seeker_user_id, created_at FROM rental_applications WHERE application_status = 'under_review' AND created_at < CURRENT_TIMESTAMP - INTERVAL '7 days' ORDER BY created_at ASC, id ASC;",
        "explanation": "## Approach\n\nCompare the creation time against `CURRENT_TIMESTAMP - INTERVAL '7 days'`.\n\n## Query\n\n```sql\nSELECT id, listing_id, seeker_user_id, created_at\nFROM rental_applications\nWHERE application_status = 'under_review'\n  AND created_at < CURRENT_TIMESTAMP - INTERVAL '7 days'\nORDER BY created_at ASC, id ASC;\n```\n\n## Explanation\n\n- `CURRENT_TIMESTAMP` has the same meaning here as `NOW()`.\n- The final result remains the same.\n\n## Difference from the optimal approach\n\nIt works the same way, but `NOW()` is shorter."
      }
    ]
  },
  {
    "code": "REALESTATE_096",
    "approaches": [
      {
        "approach_title": "Join converted listings",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count FROM listings l JOIN inquiries i ON l.id = i.listing_id JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT l.id) > 1 ORDER BY converted_listing_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nJoin listings to inquiries and active leases, then count distinct converted listings per owner.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count\nFROM listings l\nJOIN inquiries i ON l.id = i.listing_id\nJOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\nGROUP BY l.owner_profile_id\nHAVING COUNT(DISTINCT l.id) > 1\nORDER BY converted_listing_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The inquiry join ensures the listing had demand.\n- The active-lease join ensures the listing converted.\n- `COUNT(DISTINCT l.id)` avoids counting the same listing multiple times due to repeated inquiry rows.\n- `HAVING ... > 1` keeps owners with more than one converted listing.\n\n## Why this is optimal\n\nIt captures the conversion rule exactly and prevents duplicate counting."
      },
      {
        "approach_title": "CTE converted owners",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH converted_owner_listings AS (\n  SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count\n  FROM listings l\n  JOIN inquiries i ON l.id = i.listing_id\n  JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, converted_listing_count\nFROM converted_owner_listings\nWHERE converted_listing_count > 1\nORDER BY converted_listing_count DESC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute converted listing counts first, then filter in the outer query.\n\n## Query\n\n```sql\nWITH converted_owner_listings AS (\n  SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count\n  FROM listings l\n  JOIN inquiries i ON l.id = i.listing_id\n  JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, converted_listing_count\nFROM converted_owner_listings\nWHERE converted_listing_count > 1\nORDER BY converted_listing_count DESC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one row per owner.\n- The outer query applies the threshold and ordering.\n\n## Difference from the optimal approach\n\nIt is easier to extend, but longer."
      },
      {
        "approach_title": "Exists funnel listings",
        "approach_type": "subquery",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count FROM listings l WHERE EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT l.id) > 1 ORDER BY converted_listing_count DESC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nCheck each listing for both inquiries and an active lease, then count qualifying listings per owner.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count\nFROM listings l\nWHERE EXISTS (\n  SELECT 1\n  FROM inquiries i\n  WHERE i.listing_id = l.id\n)\n  AND EXISTS (\n    SELECT 1\n    FROM leases le\n    WHERE le.listing_id = l.id\n      AND le.lease_status = 'active'\n  )\nGROUP BY l.owner_profile_id\nHAVING COUNT(DISTINCT l.id) > 1\nORDER BY converted_listing_count DESC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- `EXISTS` confirms that each listing has both stages of the funnel.\n- The grouped count then measures converted listings per owner.\n\n## Difference from the optimal approach\n\nAlso correct, but the join-based version makes the funnel relationship more explicit."
      }
    ]
  },
  {
    "code": "REALESTATE_097",
    "approaches": [
      {
        "approach_title": "Sum rewards",
        "approach_type": "aggregation",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount FROM referrals GROUP BY referrer_user_id ORDER BY total_reward_amount DESC, referrer_user_id ASC;",
        "explanation": "## Approach\n\nGroup referrals by referrer and sum their reward amounts.\n\n## Query\n\n```sql\nSELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount\nFROM referrals\nGROUP BY referrer_user_id\nORDER BY total_reward_amount DESC, referrer_user_id ASC;\n```\n\n## Explanation\n\n- `GROUP BY referrer_user_id` creates one group per referrer.\n- `SUM(reward_amount)` adds all referral rewards for that user.\n- The ordering ranks higher reward totals first.\n\n## Why this is optimal\n\nIt directly computes the per-user reward total with a simple grouped sum."
      },
      {
        "approach_title": "CTE reward totals",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH reward_totals AS (\n  SELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount\n  FROM referrals\n  GROUP BY referrer_user_id\n)\nSELECT referrer_user_id, total_reward_amount\nFROM reward_totals\nORDER BY total_reward_amount DESC, referrer_user_id ASC;",
        "explanation": "## Approach\n\nCompute reward totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH reward_totals AS (\n  SELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount\n  FROM referrals\n  GROUP BY referrer_user_id\n)\nSELECT referrer_user_id, total_reward_amount\nFROM reward_totals\nORDER BY total_reward_amount DESC, referrer_user_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per referrer.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt is more structured, but longer."
      },
      {
        "approach_title": "Window totals",
        "approach_type": "window",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT DISTINCT referrer_user_id, SUM(reward_amount) OVER (PARTITION BY referrer_user_id) AS total_reward_amount FROM referrals ORDER BY total_reward_amount DESC, referrer_user_id ASC;",
        "explanation": "## Approach\n\nUse a window function to place each referrer's total reward on every referral row, then deduplicate.\n\n## Query\n\n```sql\nSELECT DISTINCT referrer_user_id,\n       SUM(reward_amount) OVER (PARTITION BY referrer_user_id) AS total_reward_amount\nFROM referrals\nORDER BY total_reward_amount DESC, referrer_user_id ASC;\n```\n\n## Explanation\n\n- The window function computes the referrer total without collapsing rows first.\n- `DISTINCT` removes repeated referrer rows.\n\n## Difference from the optimal approach\n\nIt works, but grouped aggregation is simpler."
      }
    ]
  },
  {
    "code": "REALESTATE_098",
    "approaches": [
      {
        "approach_title": "Join overdue sums",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE rp.payment_status = 'overdue' GROUP BY loc.city ORDER BY overdue_amount DESC, loc.city ASC;",
        "explanation": "## Approach\n\nJoin overdue payments through leases and properties to cities, then sum the overdue amount by city.\n\n## Query\n\n```sql\nSELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount\nFROM rent_payments rp\nJOIN leases le ON rp.lease_id = le.id\nJOIN properties p ON le.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nWHERE rp.payment_status = 'overdue'\nGROUP BY loc.city\nORDER BY overdue_amount DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The joins map each overdue payment to a city.\n- `amount_due - amount_paid` gives the unpaid portion for one payment row.\n- The `WHERE` clause keeps only overdue payments.\n- `SUM(...)` adds overdue balances per city.\n\n## Why this is optimal\n\nIt directly calculates the overdue amount from only the relevant rows."
      },
      {
        "approach_title": "CTE city overdue",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH city_overdues AS (\n  SELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount\n  FROM rent_payments rp\n  JOIN leases le ON rp.lease_id = le.id\n  JOIN properties p ON le.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE rp.payment_status = 'overdue'\n  GROUP BY loc.city\n)\nSELECT city, overdue_amount\nFROM city_overdues\nORDER BY overdue_amount DESC, city ASC;",
        "explanation": "## Approach\n\nCompute overdue totals in a CTE, then return them.\n\n## Query\n\n```sql\nWITH city_overdues AS (\n  SELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount\n  FROM rent_payments rp\n  JOIN leases le ON rp.lease_id = le.id\n  JOIN properties p ON le.property_id = p.id\n  JOIN locations loc ON p.location_id = loc.id\n  WHERE rp.payment_status = 'overdue'\n  GROUP BY loc.city\n)\nSELECT city, overdue_amount\nFROM city_overdues\nORDER BY overdue_amount DESC, city ASC;\n```\n\n## Explanation\n\n- The CTE stores one overdue total per city.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt returns the same result, but with an extra step."
      },
      {
        "approach_title": "Case sum overdue",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT loc.city, SUM(CASE WHEN rp.payment_status = 'overdue' THEN rp.amount_due - rp.amount_paid ELSE 0 END) AS overdue_amount FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city HAVING SUM(CASE WHEN rp.payment_status = 'overdue' THEN rp.amount_due - rp.amount_paid ELSE 0 END) > 0 ORDER BY overdue_amount DESC, loc.city ASC;",
        "explanation": "## Approach\n\nAggregate all payment rows by city, but add only overdue balances into the final sum.\n\n## Query\n\n```sql\nSELECT loc.city,\n       SUM(CASE WHEN rp.payment_status = 'overdue' THEN rp.amount_due - rp.amount_paid ELSE 0 END) AS overdue_amount\nFROM rent_payments rp\nJOIN leases le ON rp.lease_id = le.id\nJOIN properties p ON le.property_id = p.id\nJOIN locations loc ON p.location_id = loc.id\nGROUP BY loc.city\nHAVING SUM(CASE WHEN rp.payment_status = 'overdue' THEN rp.amount_due - rp.amount_paid ELSE 0 END) > 0\nORDER BY overdue_amount DESC, loc.city ASC;\n```\n\n## Explanation\n\n- The `CASE` expression contributes overdue balance only when the payment status is `overdue`.\n- All other payment rows add 0.\n- The `HAVING` clause removes cities whose overdue total is 0.\n- This fixes the earlier failed version, where the selected `SUM(rp.amount_due - rp.amount_paid)` included all payments instead of only overdue ones.\n\n## Difference from the optimal approach\n\nIt works correctly, but filtering rows first with `WHERE rp.payment_status = 'overdue'` is simpler and easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_099",
    "approaches": [
      {
        "approach_title": "Left join status count",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count FROM listings l LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id ORDER BY status_change_count ASC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nStart from live listings, left join status history, then count status changes per owner.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count\nFROM listings l\nLEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id\nWHERE l.listing_status = 'live'\nGROUP BY l.owner_profile_id\nORDER BY status_change_count ASC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- `WHERE l.listing_status = 'live'` keeps only owners who currently have at least one live listing.\n- The `LEFT JOIN` preserves live listings even when they have no status history rows.\n- `COUNT(lsh.id)` counts only matched history rows.\n- Owners whose live listings have no history still appear with a count of 0.\n\n## Why this is optimal\n\nIt matches the requirement exactly and keeps owners with zero status changes in the result."
      },
      {
        "approach_title": "CTE live owner history",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH live_owner_history AS (\n  SELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count\n  FROM listings l\n  LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id\n  WHERE l.listing_status = 'live'\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, status_change_count\nFROM live_owner_history\nORDER BY status_change_count ASC, owner_profile_id ASC;",
        "explanation": "## Approach\n\nCompute live-owner status change counts in a CTE, then return them.\n\n## Query\n\n```sql\nWITH live_owner_history AS (\n  SELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count\n  FROM listings l\n  LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id\n  WHERE l.listing_status = 'live'\n  GROUP BY l.owner_profile_id\n)\nSELECT owner_profile_id, status_change_count\nFROM live_owner_history\nORDER BY status_change_count ASC, owner_profile_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated row per owner.\n- The outer query applies the final ordering.\n- It preserves owners whose live listings have no matching history rows.\n\n## Difference from the optimal approach\n\nIt returns the same result, but with an extra step."
      },
      {
        "approach_title": "Case count history",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT l.owner_profile_id, SUM(CASE WHEN lsh.id IS NOT NULL THEN 1 ELSE 0 END) AS status_change_count FROM listings l LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id ORDER BY status_change_count ASC, l.owner_profile_id ASC;",
        "explanation": "## Approach\n\nUse a left join, then count only matched history rows with a `CASE` expression.\n\n## Query\n\n```sql\nSELECT l.owner_profile_id,\n       SUM(CASE WHEN lsh.id IS NOT NULL THEN 1 ELSE 0 END) AS status_change_count\nFROM listings l\nLEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id\nWHERE l.listing_status = 'live'\nGROUP BY l.owner_profile_id\nORDER BY status_change_count ASC, l.owner_profile_id ASC;\n```\n\n## Explanation\n\n- The `LEFT JOIN` keeps all live listings, including those with no history rows.\n- The `CASE` expression adds 1 only when a history row exists.\n- Listings without history contribute 0.\n- This fixes the failed inner-join version, which dropped owners whose live listings had no history.\n\n## Difference from the optimal approach\n\nIt works correctly, but `COUNT(lsh.id)` is shorter and easier to read."
      }
    ]
  },
  {
    "code": "REALESTATE_100",
    "approaches": [
      {
        "approach_title": "Join paid rent",
        "approach_type": "join",
        "is_optimal": true,
        "display_order": 1,
        "query": "SELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id WHERE rp.payment_status IN ('paid', 'partial') GROUP BY le.property_id ORDER BY total_paid_rent DESC, le.property_id ASC;",
        "explanation": "## Approach\n\nJoin rent payments to leases, keep paid-like statuses, then sum amount paid by property.\n\n## Query\n\n```sql\nSELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent\nFROM rent_payments rp\nJOIN leases le ON rp.lease_id = le.id\nWHERE rp.payment_status IN ('paid', 'partial')\nGROUP BY le.property_id\nORDER BY total_paid_rent DESC, le.property_id ASC;\n```\n\n## Explanation\n\n- The join maps each payment to its property through the lease.\n- The status filter keeps only rows that contributed payment.\n- `SUM(rp.amount_paid)` adds those amounts per property.\n- The ordering matches the expected output.\n\n## Why this is optimal\n\nIt directly measures collected rent at property level from only the relevant payment rows."
      },
      {
        "approach_title": "CTE paid totals",
        "approach_type": "cte",
        "is_optimal": false,
        "display_order": 2,
        "query": "WITH property_paid_rent AS (\n  SELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent\n  FROM rent_payments rp\n  JOIN leases le ON rp.lease_id = le.id\n  WHERE rp.payment_status IN ('paid', 'partial')\n  GROUP BY le.property_id\n)\nSELECT property_id, total_paid_rent\nFROM property_paid_rent\nORDER BY total_paid_rent DESC, property_id ASC;",
        "explanation": "## Approach\n\nCompute total paid rent per property in a CTE, then return it.\n\n## Query\n\n```sql\nWITH property_paid_rent AS (\n  SELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent\n  FROM rent_payments rp\n  JOIN leases le ON rp.lease_id = le.id\n  WHERE rp.payment_status IN ('paid', 'partial')\n  GROUP BY le.property_id\n)\nSELECT property_id, total_paid_rent\nFROM property_paid_rent\nORDER BY total_paid_rent DESC, property_id ASC;\n```\n\n## Explanation\n\n- The CTE stores one aggregated total per property.\n- The outer query applies the final ordering.\n\n## Difference from the optimal approach\n\nIt returns the same result, but with an extra step."
      },
      {
        "approach_title": "Case with having",
        "approach_type": "conditional_aggregation",
        "is_optimal": false,
        "display_order": 3,
        "query": "SELECT le.property_id, SUM(CASE WHEN rp.payment_status IN ('paid', 'partial') THEN rp.amount_paid ELSE 0 END) AS total_paid_rent FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id GROUP BY le.property_id HAVING SUM(CASE WHEN rp.payment_status IN ('paid', 'partial') THEN 1 ELSE 0 END) > 0 ORDER BY total_paid_rent DESC, le.property_id ASC;",
        "explanation": "## Approach\n\nAggregate all payment rows, but add amount only for paid-like statuses, then remove properties with no qualifying payments.\n\n## Query\n\n```sql\nSELECT le.property_id,\n       SUM(CASE WHEN rp.payment_status IN ('paid', 'partial') THEN rp.amount_paid ELSE 0 END) AS total_paid_rent\nFROM rent_payments rp\nJOIN leases le ON rp.lease_id = le.id\nGROUP BY le.property_id\nHAVING SUM(CASE WHEN rp.payment_status IN ('paid', 'partial') THEN 1 ELSE 0 END) > 0\nORDER BY total_paid_rent DESC, le.property_id ASC;\n```\n\n## Explanation\n\n- The `CASE` expression adds `amount_paid` only for `paid` and `partial` rows.\n- All other payment rows contribute 0.\n- The `HAVING` clause removes properties that have no qualifying payment rows.\n- This fixes the earlier row-count issue, where properties with only non-qualifying payment statuses were still included with a zero total.\n\n## Difference from the optimal approach\n\nIt works correctly, but filtering first with `WHERE rp.payment_status IN ('paid', 'partial')` is simpler and easier to read."
      }
    ]
  }
];
