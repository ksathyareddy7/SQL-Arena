# Solutions Evaluation Report (realestate)

**Summary:**
- Total Approaches: 300
- Passed: 300
- Failed: 0

## Detailed Results
### ✅ PASS : REALESTATE_001 - Count users
```sql
SELECT COUNT(*) AS total_users FROM users;
```

### ✅ PASS : REALESTATE_001 - Count ids
```sql
SELECT COUNT(id) AS total_users FROM users;
```

### ✅ PASS : REALESTATE_001 - CTE count
```sql
WITH user_count AS (
  SELECT COUNT(*) AS total_users
  FROM users
)
SELECT total_users
FROM user_count;
```

### ✅ PASS : REALESTATE_002 - Filter and count
```sql
SELECT COUNT(*) AS verified_owners FROM owner_profiles WHERE verification_status = 'verified';
```

### ✅ PASS : REALESTATE_002 - Filter count
```sql
SELECT COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified_owners FROM owner_profiles;
```

### ✅ PASS : REALESTATE_002 - Case sum
```sql
SELECT SUM(CASE WHEN verification_status = 'verified' THEN 1 ELSE 0 END) AS verified_owners FROM owner_profiles;
```

### ✅ PASS : REALESTATE_003 - Filter live
```sql
SELECT id, property_id, listed_for FROM listings WHERE listing_status = 'live' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_003 - CTE filter
```sql
WITH live_listings AS (
  SELECT id, property_id, listed_for
  FROM listings
  WHERE listing_status = 'live'
)
SELECT id, property_id, listed_for
FROM live_listings
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_003 - Case filter
```sql
SELECT id, property_id, listed_for FROM listings WHERE CASE WHEN listing_status = 'live' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_004 - Filter gated
```sql
SELECT id, property_title, property_type FROM properties WHERE is_gated_community = true ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_004 - Boolean shorthand
```sql
SELECT id, property_title, property_type FROM properties WHERE is_gated_community ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_004 - CTE gated
```sql
WITH gated_properties AS (
  SELECT id, property_title, property_type
  FROM properties
  WHERE is_gated_community = true
)
SELECT id, property_title, property_type
FROM gated_properties
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_005 - Filter pets
```sql
SELECT id, rent_amount, preferred_tenant_type FROM listings WHERE listing_status = 'live' AND pet_allowed = true ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_005 - Boolean pets
```sql
SELECT id, rent_amount, preferred_tenant_type FROM listings WHERE listing_status = 'live' AND pet_allowed ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_005 - CTE pets
```sql
WITH pet_listings AS (
  SELECT id, rent_amount, preferred_tenant_type
  FROM listings
  WHERE listing_status = 'live'
    AND pet_allowed = true
)
SELECT id, rent_amount, preferred_tenant_type
FROM pet_listings
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_006 - Sort and limit
```sql
SELECT id, property_id, rent_amount FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount IS NOT NULL ORDER BY rent_amount DESC, id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_006 - CTE top 5
```sql
WITH ranked_listings AS (
  SELECT id, property_id, rent_amount
  FROM listings
  WHERE listing_status = 'live'
    AND listed_for = 'rent'
    AND rent_amount IS NOT NULL
  ORDER BY rent_amount DESC, id ASC
  LIMIT 5
)
SELECT id, property_id, rent_amount
FROM ranked_listings
ORDER BY rent_amount DESC, id ASC;
```

### ✅ PASS : REALESTATE_006 - Row number
```sql
SELECT id, property_id, rent_amount FROM (SELECT id, property_id, rent_amount, ROW_NUMBER() OVER (ORDER BY rent_amount DESC, id ASC) AS rn FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount IS NOT NULL) x WHERE rn <= 5 ORDER BY rent_amount DESC, id ASC;
```

### ✅ PASS : REALESTATE_007 - Group by source
```sql
SELECT signup_source, COUNT(*) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;
```

### ✅ PASS : REALESTATE_007 - CTE group
```sql
WITH source_counts AS (
  SELECT signup_source, COUNT(*) AS user_count
  FROM users
  WHERE signup_source IS NOT NULL
  GROUP BY signup_source
)
SELECT signup_source, user_count
FROM source_counts
ORDER BY user_count DESC, signup_source ASC;
```

### ✅ PASS : REALESTATE_007 - Count ids
```sql
SELECT signup_source, COUNT(id) AS user_count FROM users WHERE signup_source IS NOT NULL GROUP BY signup_source ORDER BY user_count DESC, signup_source ASC;
```

### ✅ PASS : REALESTATE_008 - Group by type
```sql
SELECT property_type, COUNT(*) AS property_count FROM properties GROUP BY property_type ORDER BY property_count DESC, property_type ASC;
```

### ✅ PASS : REALESTATE_008 - CTE type count
```sql
WITH type_counts AS (
  SELECT property_type, COUNT(*) AS property_count
  FROM properties
  GROUP BY property_type
)
SELECT property_type, property_count
FROM type_counts
ORDER BY property_count DESC, property_type ASC;
```

### ✅ PASS : REALESTATE_008 - Count ids
```sql
SELECT property_type, COUNT(id) AS property_count FROM properties GROUP BY property_type ORDER BY property_count DESC, property_type ASC;
```

### ✅ PASS : REALESTATE_009 - Join and count
```sql
SELECT loc.city, COUNT(*) AS listing_count FROM listings l JOIN properties p ON p.id = l.property_id JOIN locations loc ON loc.id = p.location_id GROUP BY loc.city ORDER BY listing_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_009 - CTE city count
```sql
WITH listing_cities AS (
  SELECT loc.city
  FROM listings l
  JOIN properties p ON p.id = l.property_id
  JOIN locations loc ON loc.id = p.location_id
)
SELECT city, COUNT(*) AS listing_count
FROM listing_cities
GROUP BY city
ORDER BY listing_count DESC, city ASC;
```

### ✅ PASS : REALESTATE_009 - Count ids
```sql
SELECT loc.city, COUNT(l.id) AS listing_count FROM listings l JOIN properties p ON p.id = l.property_id JOIN locations loc ON loc.id = p.location_id GROUP BY loc.city ORDER BY listing_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_010 - Group and having
```sql
SELECT op.id, op.user_id, COUNT(p.id) AS property_count FROM owner_profiles op JOIN properties p ON p.owner_profile_id = op.id GROUP BY op.id, op.user_id HAVING COUNT(p.id) > 3 ORDER BY property_count DESC, op.id ASC;
```

### ✅ PASS : REALESTATE_010 - CTE owners
```sql
WITH owner_property_counts AS (
  SELECT op.id, op.user_id, COUNT(p.id) AS property_count
  FROM owner_profiles op
  JOIN properties p ON p.owner_profile_id = op.id
  GROUP BY op.id, op.user_id
)
SELECT id, user_id, property_count
FROM owner_property_counts
WHERE property_count > 3
ORDER BY property_count DESC, id ASC;
```

### ✅ PASS : REALESTATE_010 - Subquery count
```sql
SELECT id, user_id, property_count FROM (SELECT op.id, op.user_id, COUNT(p.id) AS property_count FROM owner_profiles op JOIN properties p ON p.owner_profile_id = op.id GROUP BY op.id, op.user_id) x WHERE property_count > 3 ORDER BY property_count DESC, id ASC;
```

### ✅ PASS : REALESTATE_011 - Filter pending
```sql
SELECT id, owner_profile_id, assigned_executive_user_id FROM owner_verification_requests WHERE request_status = 'pending' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_011 - CTE pending
```sql
WITH pending_requests AS (
  SELECT id, owner_profile_id, assigned_executive_user_id
  FROM owner_verification_requests
  WHERE request_status = 'pending'
)
SELECT id, owner_profile_id, assigned_executive_user_id
FROM pending_requests
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_011 - Case filter
```sql
SELECT id, owner_profile_id, assigned_executive_user_id FROM owner_verification_requests WHERE CASE WHEN request_status = 'pending' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_012 - Expired docs
```sql
SELECT id, user_id, document_type, expires_at FROM user_documents WHERE expires_at IS NOT NULL AND expires_at < NOW() ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_012 - CTE expired
```sql
WITH expired_docs AS (
  SELECT id, user_id, document_type, expires_at
  FROM user_documents
  WHERE expires_at IS NOT NULL
    AND expires_at < NOW()
)
SELECT id, user_id, document_type, expires_at
FROM expired_docs
ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_012 - Current timestamp
```sql
SELECT id, user_id, document_type, expires_at FROM user_documents WHERE expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_013 - Filter vacant
```sql
SELECT id, property_id, listed_for FROM listings WHERE listing_status = 'live' AND availability_status = 'available' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_013 - CTE vacant
```sql
WITH vacant_listings AS (
  SELECT id, property_id, listed_for
  FROM listings
  WHERE listing_status = 'live'
    AND availability_status = 'available'
)
SELECT id, property_id, listed_for
FROM vacant_listings
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_013 - Case filter
```sql
SELECT id, property_id, listed_for FROM listings WHERE CASE WHEN listing_status = 'live' AND availability_status = 'available' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_014 - Join and group
```sql
SELECT l.city, COUNT(*) AS property_count FROM properties p JOIN locations l ON p.location_id = l.id GROUP BY l.city ORDER BY property_count DESC, l.city ASC;
```

### ✅ PASS : REALESTATE_014 - CTE city count
```sql
WITH property_cities AS (
  SELECT l.city
  FROM properties p
  JOIN locations l ON p.location_id = l.id
)
SELECT city, COUNT(*) AS property_count
FROM property_cities
GROUP BY city
ORDER BY property_count DESC, city ASC;
```

### ✅ PASS : REALESTATE_014 - Count ids
```sql
SELECT l.city, COUNT(p.id) AS property_count FROM properties p JOIN locations l ON p.location_id = l.id GROUP BY l.city ORDER BY property_count DESC, l.city ASC;
```

### ✅ PASS : REALESTATE_015 - Left join null
```sql
SELECT l.id FROM listings l LEFT JOIN listing_media lm ON l.id = lm.listing_id WHERE lm.id IS NULL ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_015 - Not exists
```sql
SELECT l.id FROM listings l WHERE NOT EXISTS (SELECT 1 FROM listing_media lm WHERE lm.listing_id = l.id) ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_015 - Not in
```sql
SELECT id FROM listings WHERE id NOT IN (SELECT listing_id FROM listing_media) ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_016 - Group sort limit
```sql
SELECT listing_id, COUNT(*) AS view_count FROM property_views GROUP BY listing_id ORDER BY view_count DESC, listing_id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_016 - CTE top views
```sql
WITH listing_views AS (
  SELECT listing_id, COUNT(*) AS view_count
  FROM property_views
  GROUP BY listing_id
)
SELECT listing_id, view_count
FROM listing_views
ORDER BY view_count DESC, listing_id ASC
LIMIT 5;
```

### ✅ PASS : REALESTATE_016 - Row number
```sql
SELECT listing_id, view_count FROM (SELECT listing_id, COUNT(*) AS view_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, listing_id ASC) AS rn FROM property_views GROUP BY listing_id) x WHERE rn <= 5 ORDER BY view_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_017 - Group live owners
```sql
SELECT owner_profile_id, COUNT(*) AS live_listing_count FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id ORDER BY live_listing_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_017 - Having positive
```sql
SELECT owner_profile_id, COUNT(*) AS live_listing_count FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) > 0 ORDER BY live_listing_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_017 - CTE owners
```sql
WITH live_owner_counts AS (
  SELECT owner_profile_id, COUNT(*) AS live_listing_count
  FROM listings
  WHERE listing_status = 'live'
  GROUP BY owner_profile_id
)
SELECT owner_profile_id, live_listing_count
FROM live_owner_counts
ORDER BY live_listing_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_018 - Group visits
```sql
SELECT listing_id, COUNT(*) AS visit_count FROM property_visits GROUP BY listing_id ORDER BY visit_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_018 - Count ids
```sql
SELECT listing_id, COUNT(id) AS visit_count FROM property_visits GROUP BY listing_id ORDER BY visit_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_018 - CTE visits
```sql
WITH visit_counts AS (
  SELECT listing_id, COUNT(*) AS visit_count
  FROM property_visits
  GROUP BY listing_id
)
SELECT listing_id, visit_count
FROM visit_counts
ORDER BY visit_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_019 - Left join null
```sql
SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN properties p ON op.id = p.owner_profile_id WHERE p.id IS NULL ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_019 - Not exists
```sql
SELECT op.id, op.user_id FROM owner_profiles op WHERE NOT EXISTS (SELECT 1 FROM properties p WHERE p.owner_profile_id = op.id) ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_019 - Not in
```sql
SELECT id, user_id FROM owner_profiles WHERE id NOT IN (SELECT owner_profile_id FROM properties) ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_020 - Join group limit
```sql
SELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.id, a.amenity_name ORDER BY property_count DESC, a.id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_020 - CTE top amenities
```sql
WITH amenity_counts AS (
  SELECT a.id, a.amenity_name, COUNT(pa.property_id) AS property_count
  FROM amenities a
  JOIN property_amenities pa ON a.id = pa.amenity_id
  GROUP BY a.id, a.amenity_name
)
SELECT id, amenity_name, property_count
FROM amenity_counts
ORDER BY property_count DESC, id ASC
LIMIT 5;
```

### ✅ PASS : REALESTATE_020 - Count mapping ids
```sql
SELECT a.id, a.amenity_name, COUNT(pa.id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.id, a.amenity_name ORDER BY property_count DESC, a.id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_021 - Filter review
```sql
SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE application_status = 'under_review' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_021 - CTE review
```sql
WITH review_apps AS (
  SELECT id, listing_id, seeker_user_id
  FROM rental_applications
  WHERE application_status = 'under_review'
)
SELECT id, listing_id, seeker_user_id
FROM review_apps
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_021 - Case filter
```sql
SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE CASE WHEN application_status = 'under_review' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_022 - Filter active
```sql
SELECT id, property_id, tenant_user_id, monthly_rent FROM leases WHERE lease_status = 'active' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_022 - CTE active
```sql
WITH active_leases AS (
  SELECT id, property_id, tenant_user_id, monthly_rent
  FROM leases
  WHERE lease_status = 'active'
)
SELECT id, property_id, tenant_user_id, monthly_rent
FROM active_leases
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_022 - Case active
```sql
SELECT id, property_id, tenant_user_id, monthly_rent FROM leases WHERE CASE WHEN lease_status = 'active' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_023 - Overdue filter
```sql
SELECT id, lease_id, tenant_user_id, due_date, payment_status FROM rent_payments WHERE due_date < CURRENT_DATE AND payment_status IN ('pending', 'overdue') ORDER BY due_date ASC, id ASC;
```

### ✅ PASS : REALESTATE_023 - CTE overdue
```sql
WITH overdue_payments AS (
  SELECT id, lease_id, tenant_user_id, due_date, payment_status
  FROM rent_payments
  WHERE due_date < CURRENT_DATE
    AND payment_status IN ('pending', 'overdue')
)
SELECT id, lease_id, tenant_user_id, due_date, payment_status
FROM overdue_payments
ORDER BY due_date ASC, id ASC;
```

### ✅ PASS : REALESTATE_023 - Or status
```sql
SELECT id, lease_id, tenant_user_id, due_date, payment_status FROM rent_payments WHERE due_date < CURRENT_DATE AND (payment_status = 'pending' OR payment_status = 'overdue') ORDER BY due_date ASC, id ASC;
```

### ✅ PASS : REALESTATE_024 - Open tickets
```sql
SELECT id, property_id, issue_type, ticket_status FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_024 - OR statuses
```sql
SELECT id, property_id, issue_type, ticket_status FROM maintenance_tickets WHERE ticket_status = 'open' OR ticket_status = 'assigned' OR ticket_status = 'in_progress' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_024 - CTE open
```sql
WITH open_tickets AS (
  SELECT id, property_id, issue_type, ticket_status
  FROM maintenance_tickets
  WHERE ticket_status IN ('open', 'assigned', 'in_progress')
)
SELECT id, property_id, issue_type, ticket_status
FROM open_tickets
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_025 - Filter high rent
```sql
SELECT id, property_id, rent_amount FROM listings WHERE listing_status = 'live' AND listed_for = 'rent' AND rent_amount > 50000 ORDER BY rent_amount DESC, id ASC;
```

### ✅ PASS : REALESTATE_025 - CTE high rent
```sql
WITH high_rent_listings AS (
  SELECT id, property_id, rent_amount
  FROM listings
  WHERE listing_status = 'live'
    AND listed_for = 'rent'
    AND rent_amount > 50000
)
SELECT id, property_id, rent_amount
FROM high_rent_listings
ORDER BY rent_amount DESC, id ASC;
```

### ✅ PASS : REALESTATE_025 - Case filter
```sql
SELECT id, property_id, rent_amount FROM listings WHERE CASE WHEN listing_status = 'live' AND listed_for = 'rent' AND rent_amount > 50000 THEN true ELSE false END ORDER BY rent_amount DESC, id ASC;
```

### ✅ PASS : REALESTATE_026 - Group applications
```sql
SELECT listing_id, COUNT(*) AS application_count FROM rental_applications GROUP BY listing_id ORDER BY application_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_026 - Count ids
```sql
SELECT listing_id, COUNT(id) AS application_count FROM rental_applications GROUP BY listing_id ORDER BY application_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_026 - CTE apps
```sql
WITH app_counts AS (
  SELECT listing_id, COUNT(*) AS application_count
  FROM rental_applications
  GROUP BY listing_id
)
SELECT listing_id, application_count
FROM app_counts
ORDER BY application_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_027 - Sum active rent
```sql
SELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent FROM leases WHERE lease_status = 'active' GROUP BY owner_profile_id ORDER BY total_monthly_rent DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_027 - CTE revenue
```sql
WITH owner_rent AS (
  SELECT owner_profile_id, SUM(monthly_rent) AS total_monthly_rent
  FROM leases
  WHERE lease_status = 'active'
  GROUP BY owner_profile_id
)
SELECT owner_profile_id, total_monthly_rent
FROM owner_rent
ORDER BY total_monthly_rent DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_027 - Case with having
```sql
SELECT owner_profile_id, SUM(CASE WHEN lease_status = 'active' THEN monthly_rent ELSE 0 END) AS total_monthly_rent FROM leases GROUP BY owner_profile_id HAVING SUM(CASE WHEN lease_status = 'active' THEN 1 ELSE 0 END) > 0 ORDER BY total_monthly_rent DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_028 - Join amenities
```sql
SELECT a.amenity_name, COUNT(pa.property_id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.amenity_name ORDER BY property_count DESC, a.amenity_name ASC;
```

### ✅ PASS : REALESTATE_028 - Count map ids
```sql
SELECT a.amenity_name, COUNT(pa.id) AS property_count FROM amenities a JOIN property_amenities pa ON a.id = pa.amenity_id GROUP BY a.amenity_name ORDER BY property_count DESC, a.amenity_name ASC;
```

### ✅ PASS : REALESTATE_028 - CTE amenities
```sql
WITH amenity_counts AS (
  SELECT a.amenity_name, COUNT(pa.property_id) AS property_count
  FROM amenities a
  JOIN property_amenities pa ON a.id = pa.amenity_id
  GROUP BY a.amenity_name
)
SELECT amenity_name, property_count
FROM amenity_counts
ORDER BY property_count DESC, amenity_name ASC;
```

### ✅ PASS : REALESTATE_029 - Avg by city
```sql
SELECT loc.city, AVG(l.rent_amount) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_029 - CTE city rent
```sql
WITH city_rents AS (
  SELECT loc.city, l.rent_amount
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live'
    AND l.listed_for = 'rent'
    AND l.rent_amount IS NOT NULL
)
SELECT city, AVG(rent_amount) AS avg_rent
FROM city_rents
GROUP BY city
ORDER BY avg_rent DESC, city ASC;
```

### ✅ PASS : REALESTATE_029 - Case avg
```sql
SELECT loc.city, AVG(CASE WHEN l.rent_amount IS NOT NULL THEN l.rent_amount END) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_030 - Top inquiries
```sql
SELECT listing_id, COUNT(*) AS inquiry_count FROM inquiries GROUP BY listing_id ORDER BY inquiry_count DESC, listing_id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_030 - CTE top inquiries
```sql
WITH inquiry_counts AS (
  SELECT listing_id, COUNT(*) AS inquiry_count
  FROM inquiries
  GROUP BY listing_id
)
SELECT listing_id, inquiry_count
FROM inquiry_counts
ORDER BY inquiry_count DESC, listing_id ASC
LIMIT 5;
```

### ✅ PASS : REALESTATE_030 - Row number
```sql
SELECT listing_id, inquiry_count FROM (SELECT listing_id, COUNT(*) AS inquiry_count, ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC, listing_id ASC) AS rn FROM inquiries GROUP BY listing_id) x WHERE rn <= 5 ORDER BY inquiry_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_031 - Filter late fee
```sql
SELECT id, lease_id, tenant_user_id, late_fee FROM rent_payments WHERE late_fee > 0 ORDER BY late_fee DESC, id ASC;
```

### ✅ PASS : REALESTATE_031 - CTE late fee
```sql
WITH late_fee_payments AS (
  SELECT id, lease_id, tenant_user_id, late_fee
  FROM rent_payments
  WHERE late_fee > 0
)
SELECT id, lease_id, tenant_user_id, late_fee
FROM late_fee_payments
ORDER BY late_fee DESC, id ASC;
```

### ✅ PASS : REALESTATE_031 - Case filter
```sql
SELECT id, lease_id, tenant_user_id, late_fee FROM rent_payments WHERE CASE WHEN late_fee > 0 THEN true ELSE false END ORDER BY late_fee DESC, id ASC;
```

### ✅ PASS : REALESTATE_032 - Filter duration
```sql
SELECT id, property_id, lease_duration_months FROM listings WHERE lease_duration_months > 12 ORDER BY lease_duration_months DESC, id ASC;
```

### ✅ PASS : REALESTATE_032 - CTE duration
```sql
WITH long_leases AS (
  SELECT id, property_id, lease_duration_months
  FROM listings
  WHERE lease_duration_months > 12
)
SELECT id, property_id, lease_duration_months
FROM long_leases
ORDER BY lease_duration_months DESC, id ASC;
```

### ✅ PASS : REALESTATE_032 - Case duration
```sql
SELECT id, property_id, lease_duration_months FROM listings WHERE CASE WHEN lease_duration_months > 12 THEN true ELSE false END ORDER BY lease_duration_months DESC, id ASC;
```

### ✅ PASS : REALESTATE_033 - Group active team
```sql
SELECT team_name, COUNT(*) AS executive_count FROM executive_profiles WHERE is_active = true GROUP BY team_name ORDER BY executive_count DESC, team_name ASC;
```

### ✅ PASS : REALESTATE_033 - Boolean team
```sql
SELECT team_name, COUNT(*) AS executive_count FROM executive_profiles WHERE is_active GROUP BY team_name ORDER BY executive_count DESC, team_name ASC;
```

### ✅ PASS : REALESTATE_033 - CTE team count
```sql
WITH active_team_counts AS (
  SELECT team_name, COUNT(*) AS executive_count
  FROM executive_profiles
  WHERE is_active = true
  GROUP BY team_name
)
SELECT team_name, executive_count
FROM active_team_counts
ORDER BY executive_count DESC, team_name ASC;
```

### ✅ PASS : REALESTATE_034 - Filter rejected
```sql
SELECT id, owner_profile_id, rejection_reason FROM owner_verification_requests WHERE request_status = 'rejected' ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_034 - CTE rejected
```sql
WITH rejected_requests AS (
  SELECT id, owner_profile_id, rejection_reason
  FROM owner_verification_requests
  WHERE request_status = 'rejected'
)
SELECT id, owner_profile_id, rejection_reason
FROM rejected_requests
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_034 - Case rejected
```sql
SELECT id, owner_profile_id, rejection_reason FROM owner_verification_requests WHERE CASE WHEN request_status = 'rejected' THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_035 - Filter rent drop
```sql
SELECT id, listing_id, old_rent_amount, new_rent_amount FROM listing_price_history WHERE old_rent_amount IS NOT NULL AND new_rent_amount IS NOT NULL AND new_rent_amount < old_rent_amount ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_035 - CTE rent drop
```sql
WITH rent_drops AS (
  SELECT id, listing_id, old_rent_amount, new_rent_amount
  FROM listing_price_history
  WHERE old_rent_amount IS NOT NULL
    AND new_rent_amount IS NOT NULL
    AND new_rent_amount < old_rent_amount
)
SELECT id, listing_id, old_rent_amount, new_rent_amount
FROM rent_drops
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_035 - Difference check
```sql
SELECT id, listing_id, old_rent_amount, new_rent_amount FROM listing_price_history WHERE old_rent_amount IS NOT NULL AND new_rent_amount IS NOT NULL AND old_rent_amount - new_rent_amount > 0 ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_036 - Group leases
```sql
SELECT property_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id HAVING COUNT(*) > 1 ORDER BY lease_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_036 - CTE renewals
```sql
WITH property_lease_counts AS (
  SELECT property_id, COUNT(*) AS lease_count
  FROM leases
  GROUP BY property_id
)
SELECT property_id, lease_count
FROM property_lease_counts
WHERE lease_count > 1
ORDER BY lease_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_036 - Count ids
```sql
SELECT property_id, COUNT(id) AS lease_count FROM leases GROUP BY property_id HAVING COUNT(id) > 1 ORDER BY lease_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_037 - Sum maintenance
```sql
SELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost FROM maintenance_tickets GROUP BY property_id ORDER BY total_maintenance_cost DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_037 - CTE cost
```sql
WITH property_costs AS (
  SELECT property_id, SUM(COALESCE(resolution_cost, 0)) AS total_maintenance_cost
  FROM maintenance_tickets
  GROUP BY property_id
)
SELECT property_id, total_maintenance_cost
FROM property_costs
ORDER BY total_maintenance_cost DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_037 - Sum with case
```sql
SELECT property_id, SUM(CASE WHEN resolution_cost IS NULL THEN 0 ELSE resolution_cost END) AS total_maintenance_cost FROM maintenance_tickets GROUP BY property_id ORDER BY total_maintenance_cost DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_038 - Avg resolution
```sql
SELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time FROM support_tickets WHERE resolution_time_mins IS NOT NULL GROUP BY user_id ORDER BY avg_resolution_time DESC, user_id ASC;
```

### ✅ PASS : REALESTATE_038 - CTE average
```sql
WITH user_resolution_times AS (
  SELECT user_id, AVG(resolution_time_mins) AS avg_resolution_time
  FROM support_tickets
  WHERE resolution_time_mins IS NOT NULL
  GROUP BY user_id
)
SELECT user_id, avg_resolution_time
FROM user_resolution_times
ORDER BY avg_resolution_time DESC, user_id ASC;
```

### ✅ PASS : REALESTATE_038 - Filtered avg
```sql
SELECT user_id, AVG(resolution_time_mins) FILTER (WHERE resolution_time_mins IS NOT NULL) AS avg_resolution_time FROM support_tickets GROUP BY user_id HAVING AVG(resolution_time_mins) FILTER (WHERE resolution_time_mins IS NOT NULL) IS NOT NULL ORDER BY avg_resolution_time DESC, user_id ASC;
```

### ✅ PASS : REALESTATE_039 - Top converted
```sql
SELECT referrer_user_id, COUNT(*) AS converted_count FROM referrals WHERE referral_status = 'converted' GROUP BY referrer_user_id ORDER BY converted_count DESC, referrer_user_id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_039 - CTE top referrers
```sql
WITH converted_referrals AS (
  SELECT referrer_user_id, COUNT(*) AS converted_count
  FROM referrals
  WHERE referral_status = 'converted'
  GROUP BY referrer_user_id
)
SELECT referrer_user_id, converted_count
FROM converted_referrals
ORDER BY converted_count DESC, referrer_user_id ASC
LIMIT 5;
```

### ✅ PASS : REALESTATE_039 - Count ids
```sql
SELECT referrer_user_id, COUNT(id) AS converted_count FROM referrals WHERE referral_status = 'converted' GROUP BY referrer_user_id ORDER BY converted_count DESC, referrer_user_id ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_040 - Top event cities
```sql
SELECT ae.city, COUNT(*) AS event_count FROM app_events ae WHERE ae.event_name = 'property_view' GROUP BY ae.city ORDER BY event_count DESC, ae.city ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_040 - CTE event cities
```sql
WITH city_event_counts AS (
  SELECT ae.city, COUNT(*) AS event_count
  FROM app_events ae
  WHERE ae.event_name = 'property_view'
  GROUP BY ae.city
)
SELECT city, event_count
FROM city_event_counts
ORDER BY event_count DESC, city ASC
LIMIT 5;
```

### ✅ PASS : REALESTATE_040 - Count ids
```sql
SELECT ae.city, COUNT(ae.id) AS event_count FROM app_events ae WHERE ae.event_name = 'property_view' GROUP BY ae.city ORDER BY event_count DESC, ae.city ASC LIMIT 5;
```

### ✅ PASS : REALESTATE_041 - Avg by city
```sql
SELECT loc.city, AVG(l.rent_amount) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_041 - CTE city rent
```sql
WITH city_rents AS (
  SELECT loc.city, l.rent_amount
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live'
    AND l.listed_for = 'rent'
    AND l.rent_amount IS NOT NULL
)
SELECT city, AVG(rent_amount) AS avg_rent
FROM city_rents
GROUP BY city
ORDER BY avg_rent DESC, city ASC;
```

### ✅ PASS : REALESTATE_041 - Case avg
```sql
SELECT loc.city, AVG(CASE WHEN l.rent_amount IS NOT NULL THEN l.rent_amount END) AS avg_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' GROUP BY loc.city ORDER BY avg_rent DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_042 - Group localities
```sql
SELECT loc.locality, COUNT(*) AS listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' GROUP BY loc.locality ORDER BY listing_count DESC, loc.locality ASC;
```

### ✅ PASS : REALESTATE_042 - CTE locality count
```sql
WITH locality_listings AS (
  SELECT loc.locality
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live'
)
SELECT locality, COUNT(*) AS listing_count
FROM locality_listings
GROUP BY locality
ORDER BY listing_count DESC, locality ASC;
```

### ✅ PASS : REALESTATE_042 - Count ids
```sql
SELECT loc.locality, COUNT(l.id) AS listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' GROUP BY loc.locality ORDER BY listing_count DESC, loc.locality ASC;
```

### ✅ PASS : REALESTATE_043 - Distinct compare
```sql
SELECT l.id, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT pv.id) AS visit_count FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id LEFT JOIN property_visits pv ON l.id = pv.listing_id GROUP BY l.id HAVING COUNT(DISTINCT i.id) > COUNT(DISTINCT pv.id) ORDER BY inquiry_count DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_043 - CTE compare
```sql
WITH listing_counts AS (
  SELECT l.id, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT pv.id) AS visit_count
  FROM listings l
  LEFT JOIN inquiries i ON l.id = i.listing_id
  LEFT JOIN property_visits pv ON l.id = pv.listing_id
  GROUP BY l.id
)
SELECT id, inquiry_count, visit_count
FROM listing_counts
WHERE inquiry_count > visit_count
ORDER BY inquiry_count DESC, id ASC;
```

### ✅ PASS : REALESTATE_043 - Subquery counts
```sql
SELECT l.id, (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) AS inquiry_count, (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id) AS visit_count FROM listings l WHERE (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) > (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id) ORDER BY inquiry_count DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_044 - Sum sale value
```sql
SELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value FROM listings WHERE listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL GROUP BY owner_profile_id ORDER BY total_portfolio_value DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_044 - CTE portfolio
```sql
WITH owner_portfolios AS (
  SELECT owner_profile_id, SUM(sale_price) AS total_portfolio_value
  FROM listings
  WHERE listing_status = 'live'
    AND listed_for = 'sale'
    AND sale_price IS NOT NULL
  GROUP BY owner_profile_id
)
SELECT owner_profile_id, total_portfolio_value
FROM owner_portfolios
ORDER BY total_portfolio_value DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_044 - Case with having
```sql
SELECT owner_profile_id, SUM(CASE WHEN listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL THEN sale_price ELSE 0 END) AS total_portfolio_value FROM listings GROUP BY owner_profile_id HAVING SUM(CASE WHEN listing_status = 'live' AND listed_for = 'sale' AND sale_price IS NOT NULL THEN 1 ELSE 0 END) > 0 ORDER BY total_portfolio_value DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_045 - Group seekers
```sql
SELECT seeker_user_id, COUNT(*) AS application_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(*) > 2 ORDER BY application_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_045 - CTE seekers
```sql
WITH seeker_app_counts AS (
  SELECT seeker_user_id, COUNT(*) AS application_count
  FROM rental_applications
  GROUP BY seeker_user_id
)
SELECT seeker_user_id, application_count
FROM seeker_app_counts
WHERE application_count > 2
ORDER BY application_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_045 - Count ids
```sql
SELECT seeker_user_id, COUNT(id) AS application_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(id) > 2 ORDER BY application_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_046 - Group leases
```sql
SELECT property_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id ORDER BY lease_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_046 - CTE lease count
```sql
WITH property_leases AS (
  SELECT property_id, COUNT(*) AS lease_count
  FROM leases
  GROUP BY property_id
)
SELECT property_id, lease_count
FROM property_leases
ORDER BY lease_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_046 - Count ids
```sql
SELECT property_id, COUNT(id) AS lease_count FROM leases GROUP BY property_id ORDER BY lease_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_047 - Join unpaid sum
```sql
SELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount FROM rent_payments rp JOIN leases l ON rp.lease_id = l.id WHERE l.lease_status = 'active' AND rp.amount_paid < rp.amount_due GROUP BY rp.lease_id ORDER BY unpaid_amount DESC, rp.lease_id ASC;
```

### ✅ PASS : REALESTATE_047 - CTE unpaid
```sql
WITH unpaid_rows AS (
  SELECT rp.lease_id, rp.amount_due - rp.amount_paid AS unpaid_part
  FROM rent_payments rp
  JOIN leases l ON rp.lease_id = l.id
  WHERE l.lease_status = 'active'
    AND rp.amount_paid < rp.amount_due
)
SELECT lease_id, SUM(unpaid_part) AS unpaid_amount
FROM unpaid_rows
GROUP BY lease_id
ORDER BY unpaid_amount DESC, lease_id ASC;
```

### ✅ PASS : REALESTATE_047 - Having unpaid
```sql
SELECT rp.lease_id, SUM(rp.amount_due - rp.amount_paid) AS unpaid_amount FROM rent_payments rp JOIN leases l ON rp.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY rp.lease_id HAVING SUM(rp.amount_due - rp.amount_paid) > 0 ORDER BY unpaid_amount DESC, rp.lease_id ASC;
```

### ✅ PASS : REALESTATE_048 - Group open tickets
```sql
SELECT assigned_executive_user_id, COUNT(*) AS ticket_count FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') AND assigned_executive_user_id IS NOT NULL GROUP BY assigned_executive_user_id ORDER BY ticket_count DESC, assigned_executive_user_id ASC;
```

### ✅ PASS : REALESTATE_048 - CTE workload
```sql
WITH executive_ticket_counts AS (
  SELECT assigned_executive_user_id, COUNT(*) AS ticket_count
  FROM maintenance_tickets
  WHERE ticket_status IN ('open', 'assigned', 'in_progress')
    AND assigned_executive_user_id IS NOT NULL
  GROUP BY assigned_executive_user_id
)
SELECT assigned_executive_user_id, ticket_count
FROM executive_ticket_counts
ORDER BY ticket_count DESC, assigned_executive_user_id ASC;
```

### ✅ PASS : REALESTATE_048 - Count ids
```sql
SELECT assigned_executive_user_id, COUNT(id) AS ticket_count FROM maintenance_tickets WHERE ticket_status IN ('open', 'assigned', 'in_progress') AND assigned_executive_user_id IS NOT NULL GROUP BY assigned_executive_user_id ORDER BY ticket_count DESC, assigned_executive_user_id ASC;
```

### ✅ PASS : REALESTATE_049 - Group amenities
```sql
SELECT property_id, COUNT(*) AS amenity_count FROM property_amenities GROUP BY property_id HAVING COUNT(*) > 3 ORDER BY amenity_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_049 - CTE amenity count
```sql
WITH property_amenity_counts AS (
  SELECT property_id, COUNT(*) AS amenity_count
  FROM property_amenities
  GROUP BY property_id
)
SELECT property_id, amenity_count
FROM property_amenity_counts
WHERE amenity_count > 3
ORDER BY amenity_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_049 - Count amenity ids
```sql
SELECT property_id, COUNT(amenity_id) AS amenity_count FROM property_amenities GROUP BY property_id HAVING COUNT(amenity_id) > 3 ORDER BY amenity_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_050 - Left join live
```sql
SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id AND l.listing_status = 'live' WHERE l.id IS NULL ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_050 - Not exists live
```sql
SELECT op.id, op.user_id FROM owner_profiles op WHERE NOT EXISTS (SELECT 1 FROM listings l WHERE l.owner_profile_id = op.id AND l.listing_status = 'live') ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_050 - Group having zero
```sql
SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id GROUP BY op.id, op.user_id HAVING COUNT(*) FILTER (WHERE l.listing_status = 'live') = 0 ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_051 - Group repeat views
```sql
SELECT user_id, listing_id, COUNT(*) AS view_count FROM property_views WHERE user_id IS NOT NULL GROUP BY user_id, listing_id HAVING COUNT(*) > 1 ORDER BY view_count DESC, user_id ASC, listing_id ASC;
```

### ✅ PASS : REALESTATE_051 - CTE repeat views
```sql
WITH user_listing_views AS (
  SELECT user_id, listing_id, COUNT(*) AS view_count
  FROM property_views
  WHERE user_id IS NOT NULL
  GROUP BY user_id, listing_id
)
SELECT user_id, listing_id, view_count
FROM user_listing_views
WHERE view_count > 1
ORDER BY view_count DESC, user_id ASC, listing_id ASC;
```

### ✅ PASS : REALESTATE_051 - Count view ids
```sql
SELECT user_id, listing_id, COUNT(id) AS view_count FROM property_views WHERE user_id IS NOT NULL GROUP BY user_id, listing_id HAVING COUNT(id) > 1 ORDER BY view_count DESC, user_id ASC, listing_id ASC;
```

### ✅ PASS : REALESTATE_052 - Group offers
```sql
SELECT listing_id, COUNT(*) AS offer_count FROM offers GROUP BY listing_id HAVING COUNT(*) > 2 ORDER BY offer_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_052 - CTE offers
```sql
WITH listing_offer_counts AS (
  SELECT listing_id, COUNT(*) AS offer_count
  FROM offers
  GROUP BY listing_id
)
SELECT listing_id, offer_count
FROM listing_offer_counts
WHERE offer_count > 2
ORDER BY offer_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_052 - Count ids
```sql
SELECT listing_id, COUNT(id) AS offer_count FROM offers GROUP BY listing_id HAVING COUNT(id) > 2 ORDER BY offer_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_053 - Rejected count
```sql
SELECT seeker_user_id, COUNT(*) AS rejected_count FROM rental_applications WHERE application_status = 'rejected' GROUP BY seeker_user_id HAVING COUNT(*) > 1 ORDER BY rejected_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_053 - CTE rejected
```sql
WITH seeker_rejections AS (
  SELECT seeker_user_id, COUNT(*) AS rejected_count
  FROM rental_applications
  WHERE application_status = 'rejected'
  GROUP BY seeker_user_id
)
SELECT seeker_user_id, rejected_count
FROM seeker_rejections
WHERE rejected_count > 1
ORDER BY rejected_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_053 - Count ids
```sql
SELECT seeker_user_id, COUNT(id) AS rejected_count FROM rental_applications WHERE application_status = 'rejected' GROUP BY seeker_user_id HAVING COUNT(id) > 1 ORDER BY rejected_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_054 - Group issue cost
```sql
SELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost FROM maintenance_tickets GROUP BY issue_type ORDER BY total_cost DESC, issue_type ASC;
```

### ✅ PASS : REALESTATE_054 - CTE issue cost
```sql
WITH issue_costs AS (
  SELECT issue_type, SUM(COALESCE(resolution_cost, 0)) AS total_cost
  FROM maintenance_tickets
  GROUP BY issue_type
)
SELECT issue_type, total_cost
FROM issue_costs
ORDER BY total_cost DESC, issue_type ASC;
```

### ✅ PASS : REALESTATE_054 - Case sum
```sql
SELECT issue_type, SUM(CASE WHEN resolution_cost IS NULL THEN 0 ELSE resolution_cost END) AS total_cost FROM maintenance_tickets GROUP BY issue_type ORDER BY total_cost DESC, issue_type ASC;
```

### ✅ PASS : REALESTATE_055 - Filter expired
```sql
SELECT id, listing_id, seeker_user_id, expires_at FROM offers WHERE offer_status = 'pending' AND expires_at IS NOT NULL AND expires_at < NOW() ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_055 - CTE expired
```sql
WITH expired_offers AS (
  SELECT id, listing_id, seeker_user_id, expires_at
  FROM offers
  WHERE offer_status = 'pending'
    AND expires_at IS NOT NULL
    AND expires_at < NOW()
)
SELECT id, listing_id, seeker_user_id, expires_at
FROM expired_offers
ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_055 - Current timestamp
```sql
SELECT id, listing_id, seeker_user_id, expires_at FROM offers WHERE offer_status = 'pending' AND expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP ORDER BY expires_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_056 - Join city leases
```sql
SELECT loc.city, COUNT(*) AS lease_count FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY lease_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_056 - CTE city leases
```sql
WITH active_lease_cities AS (
  SELECT loc.city
  FROM leases le
  JOIN properties p ON le.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE le.lease_status = 'active'
)
SELECT city, COUNT(*) AS lease_count
FROM active_lease_cities
GROUP BY city
ORDER BY lease_count DESC, city ASC;
```

### ✅ PASS : REALESTATE_056 - Count lease ids
```sql
SELECT loc.city, COUNT(le.id) AS lease_count FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY lease_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_057 - Join inquiries
```sql
SELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count FROM listings l JOIN inquiries i ON l.id = i.listing_id GROUP BY l.owner_profile_id ORDER BY inquiry_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_057 - Count rows
```sql
SELECT l.owner_profile_id, COUNT(*) AS inquiry_count FROM listings l JOIN inquiries i ON l.id = i.listing_id GROUP BY l.owner_profile_id ORDER BY inquiry_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_057 - CTE owner demand
```sql
WITH owner_inquiries AS (
  SELECT l.owner_profile_id, COUNT(i.id) AS inquiry_count
  FROM listings l
  JOIN inquiries i ON l.id = i.listing_id
  GROUP BY l.owner_profile_id
)
SELECT owner_profile_id, inquiry_count
FROM owner_inquiries
ORDER BY inquiry_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_058 - Left join zero
```sql
SELECT l.id, l.property_id FROM listings l LEFT JOIN property_views pv ON l.id = pv.listing_id WHERE l.listing_status = 'live' GROUP BY l.id, l.property_id HAVING COUNT(pv.id) = 0 ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_058 - Not exists
```sql
SELECT l.id, l.property_id FROM listings l WHERE l.listing_status = 'live' AND NOT EXISTS (SELECT 1 FROM property_views pv WHERE pv.listing_id = l.id) ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_058 - Left join null
```sql
SELECT l.id, l.property_id FROM listings l LEFT JOIN property_views pv ON l.id = pv.listing_id WHERE l.listing_status = 'live' AND pv.id IS NULL ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_059 - Luxury city count
```sql
SELECT loc.city, COUNT(*) AS luxury_listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount > 100000 GROUP BY loc.city HAVING COUNT(*) >= 3 ORDER BY luxury_listing_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_059 - CTE luxury cities
```sql
WITH luxury_city_counts AS (
  SELECT loc.city, COUNT(*) AS luxury_listing_count
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live'
    AND l.listed_for = 'rent'
    AND l.rent_amount > 100000
  GROUP BY loc.city
)
SELECT city, luxury_listing_count
FROM luxury_city_counts
WHERE luxury_listing_count >= 3
ORDER BY luxury_listing_count DESC, city ASC;
```

### ✅ PASS : REALESTATE_059 - Count listing ids
```sql
SELECT loc.city, COUNT(l.id) AS luxury_listing_count FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount > 100000 GROUP BY loc.city HAVING COUNT(l.id) >= 3 ORDER BY luxury_listing_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_060 - Verified no live
```sql
SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id AND l.listing_status = 'live' WHERE op.verification_status = 'verified' AND l.id IS NULL ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_060 - Not exists
```sql
SELECT op.id, op.user_id FROM owner_profiles op WHERE op.verification_status = 'verified' AND NOT EXISTS (SELECT 1 FROM listings l WHERE l.owner_profile_id = op.id AND l.listing_status = 'live') ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_060 - Group live zero
```sql
SELECT op.id, op.user_id FROM owner_profiles op LEFT JOIN listings l ON op.id = l.owner_profile_id WHERE op.verification_status = 'verified' GROUP BY op.id, op.user_id HAVING COUNT(*) FILTER (WHERE l.listing_status = 'live') = 0 ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_061 - Sum active rent
```sql
SELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue FROM leases WHERE lease_status = 'active' GROUP BY owner_profile_id ORDER BY total_rent_revenue DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_061 - CTE owner rent
```sql
WITH owner_revenue AS (
  SELECT owner_profile_id, SUM(monthly_rent) AS total_rent_revenue
  FROM leases
  WHERE lease_status = 'active'
  GROUP BY owner_profile_id
)
SELECT owner_profile_id, total_rent_revenue
FROM owner_revenue
ORDER BY total_rent_revenue DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_061 - Case with having
```sql
SELECT owner_profile_id, SUM(CASE WHEN lease_status = 'active' THEN monthly_rent ELSE 0 END) AS total_rent_revenue FROM leases GROUP BY owner_profile_id HAVING SUM(CASE WHEN lease_status = 'active' THEN 1 ELSE 0 END) > 0 ORDER BY total_rent_revenue DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_062 - Distinct property count
```sql
SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties FROM leases GROUP BY tenant_user_id HAVING COUNT(DISTINCT property_id) > 1 ORDER BY unique_properties DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_062 - CTE tenant properties
```sql
WITH tenant_property_counts AS (
  SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties
  FROM leases
  GROUP BY tenant_user_id
)
SELECT tenant_user_id, unique_properties
FROM tenant_property_counts
WHERE unique_properties > 1
ORDER BY unique_properties DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_062 - Distinct subquery
```sql
SELECT tenant_user_id, unique_properties FROM (SELECT tenant_user_id, COUNT(DISTINCT property_id) AS unique_properties FROM leases GROUP BY tenant_user_id) x WHERE unique_properties > 1 ORDER BY unique_properties DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_063 - Filter countered
```sql
SELECT listing_id, COUNT(*) AS countered_offer_count FROM offers WHERE offer_status = 'countered' GROUP BY listing_id ORDER BY countered_offer_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_063 - CTE countered
```sql
WITH countered_counts AS (
  SELECT listing_id, COUNT(*) AS countered_offer_count
  FROM offers
  WHERE offer_status = 'countered'
  GROUP BY listing_id
)
SELECT listing_id, countered_offer_count
FROM countered_counts
ORDER BY countered_offer_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_063 - Filtered count
```sql
SELECT listing_id, COUNT(*) FILTER (WHERE offer_status = 'countered') AS countered_offer_count FROM offers GROUP BY listing_id HAVING COUNT(*) FILTER (WHERE offer_status = 'countered') > 0 ORDER BY countered_offer_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_064 - Join locality count
```sql
SELECT loc.locality, COUNT(*) AS terminated_lease_count FROM leases l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.lease_status = 'terminated' GROUP BY loc.locality ORDER BY terminated_lease_count DESC, loc.locality ASC;
```

### ✅ PASS : REALESTATE_064 - CTE churn localities
```sql
WITH terminated_localities AS (
  SELECT loc.locality
  FROM leases l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.lease_status = 'terminated'
)
SELECT locality, COUNT(*) AS terminated_lease_count
FROM terminated_localities
GROUP BY locality
ORDER BY terminated_lease_count DESC, locality ASC;
```

### ✅ PASS : REALESTATE_064 - Count lease ids
```sql
SELECT loc.locality, COUNT(l.id) AS terminated_lease_count FROM leases l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.lease_status = 'terminated' GROUP BY loc.locality ORDER BY terminated_lease_count DESC, loc.locality ASC;
```

### ✅ PASS : REALESTATE_065 - Overdue count
```sql
SELECT tenant_user_id, COUNT(*) AS overdue_payment_count FROM rent_payments WHERE payment_status = 'overdue' GROUP BY tenant_user_id HAVING COUNT(*) > 2 ORDER BY overdue_payment_count DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_065 - CTE overdue tenants
```sql
WITH tenant_overdues AS (
  SELECT tenant_user_id, COUNT(*) AS overdue_payment_count
  FROM rent_payments
  WHERE payment_status = 'overdue'
  GROUP BY tenant_user_id
)
SELECT tenant_user_id, overdue_payment_count
FROM tenant_overdues
WHERE overdue_payment_count > 2
ORDER BY overdue_payment_count DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_065 - Count ids
```sql
SELECT tenant_user_id, COUNT(id) AS overdue_payment_count FROM rent_payments WHERE payment_status = 'overdue' GROUP BY tenant_user_id HAVING COUNT(id) > 2 ORDER BY overdue_payment_count DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_066 - Distinct join counts
```sql
SELECT pv.listing_id, COUNT(DISTINCT pv.id) AS completed_visits, COUNT(DISTINCT le.id) AS active_leases FROM property_visits pv LEFT JOIN leases le ON pv.listing_id = le.listing_id AND le.lease_status = 'active' WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING COUNT(DISTINCT le.id) > 0 ORDER BY active_leases DESC, pv.listing_id ASC;
```

### ✅ PASS : REALESTATE_066 - CTE visit lease
```sql
WITH listing_funnel AS (
  SELECT pv.listing_id, COUNT(DISTINCT pv.id) AS completed_visits, COUNT(DISTINCT le.id) AS active_leases
  FROM property_visits pv
  LEFT JOIN leases le ON pv.listing_id = le.listing_id AND le.lease_status = 'active'
  WHERE pv.visit_status = 'completed'
  GROUP BY pv.listing_id
)
SELECT listing_id, completed_visits, active_leases
FROM listing_funnel
WHERE active_leases > 0
ORDER BY active_leases DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_066 - Subquery counts
```sql
SELECT pv.listing_id, COUNT(*) AS completed_visits, (SELECT COUNT(*) FROM leases le WHERE le.listing_id = pv.listing_id AND le.lease_status = 'active') AS active_leases FROM property_visits pv WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING (SELECT COUNT(*) FROM leases le WHERE le.listing_id = pv.listing_id AND le.lease_status = 'active') > 0 ORDER BY active_leases DESC, pv.listing_id ASC;
```

### ✅ PASS : REALESTATE_067 - Left join no inquiries
```sql
SELECT l.id, l.property_id, l.sale_price FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 GROUP BY l.id, l.property_id, l.sale_price HAVING COUNT(i.id) = 0 ORDER BY l.sale_price DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_067 - Not exists
```sql
SELECT l.id, l.property_id, l.sale_price FROM listings l WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 AND NOT EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) ORDER BY l.sale_price DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_067 - Left join null
```sql
SELECT l.id, l.property_id, l.sale_price FROM listings l LEFT JOIN inquiries i ON l.id = i.listing_id WHERE l.listing_status = 'live' AND l.listed_for = 'sale' AND l.sale_price > 10000000 AND i.id IS NULL ORDER BY l.sale_price DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_068 - Filter count compare
```sql
SELECT l.owner_profile_id, COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases, COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL GROUP BY l.owner_profile_id HAVING COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) > COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) ORDER BY price_increases DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_068 - Case counts
```sql
SELECT l.owner_profile_id, SUM(CASE WHEN lph.new_rent_amount > lph.old_rent_amount THEN 1 ELSE 0 END) AS price_increases, SUM(CASE WHEN lph.new_rent_amount < lph.old_rent_amount THEN 1 ELSE 0 END) AS price_drops FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL GROUP BY l.owner_profile_id HAVING SUM(CASE WHEN lph.new_rent_amount > lph.old_rent_amount THEN 1 ELSE 0 END) > SUM(CASE WHEN lph.new_rent_amount < lph.old_rent_amount THEN 1 ELSE 0 END) ORDER BY price_increases DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_068 - CTE owner moves
```sql
WITH owner_price_moves AS (
  SELECT l.owner_profile_id, COUNT(*) FILTER (WHERE lph.new_rent_amount > lph.old_rent_amount) AS price_increases, COUNT(*) FILTER (WHERE lph.new_rent_amount < lph.old_rent_amount) AS price_drops
  FROM listing_price_history lph
  JOIN listings l ON lph.listing_id = l.id
  WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL
  GROUP BY l.owner_profile_id
)
SELECT owner_profile_id, price_increases, price_drops
FROM owner_price_moves
WHERE price_increases > price_drops
ORDER BY price_increases DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_069 - Join active leases
```sql
SELECT mt.property_id, COUNT(*) AS ticket_count FROM maintenance_tickets mt JOIN leases l ON mt.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY mt.property_id HAVING COUNT(*) > 3 ORDER BY ticket_count DESC, mt.property_id ASC;
```

### ✅ PASS : REALESTATE_069 - CTE active tickets
```sql
WITH active_lease_tickets AS (
  SELECT mt.property_id
  FROM maintenance_tickets mt
  JOIN leases l ON mt.lease_id = l.id
  WHERE l.lease_status = 'active'
)
SELECT property_id, COUNT(*) AS ticket_count
FROM active_lease_tickets
GROUP BY property_id
HAVING COUNT(*) > 3
ORDER BY ticket_count DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_069 - Count ticket ids
```sql
SELECT mt.property_id, COUNT(mt.id) AS ticket_count FROM maintenance_tickets mt JOIN leases l ON mt.lease_id = l.id WHERE l.lease_status = 'active' GROUP BY mt.property_id HAVING COUNT(mt.id) > 3 ORDER BY ticket_count DESC, mt.property_id ASC;
```

### ✅ PASS : REALESTATE_070 - Join and compare
```sql
SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count FROM listings l JOIN inquiries i ON l.id = i.listing_id LEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT i.id) > 0 AND COUNT(DISTINCT le.id) = 0 ORDER BY listing_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_070 - CTE funnel owners
```sql
WITH owner_funnel AS (
  SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count, COUNT(DISTINCT i.id) AS inquiry_count, COUNT(DISTINCT le.id) AS active_lease_count
  FROM listings l
  JOIN inquiries i ON l.id = i.listing_id
  LEFT JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'
  WHERE l.listing_status = 'live'
  GROUP BY l.owner_profile_id
)
SELECT owner_profile_id, listing_count
FROM owner_funnel
WHERE inquiry_count > 0 AND active_lease_count = 0
ORDER BY listing_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_070 - Owner exists check
```sql
SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS listing_count FROM listings l WHERE l.listing_status = 'live' AND EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND NOT EXISTS (SELECT 1 FROM listings l2 JOIN inquiries i2 ON i2.listing_id = l2.id JOIN leases le ON le.listing_id = l2.id AND le.lease_status = 'active' WHERE l2.owner_profile_id = l.owner_profile_id AND l2.listing_status = 'live') GROUP BY l.owner_profile_id ORDER BY listing_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_071 - Join converted cities
```sql
SELECT loc.city, COUNT(DISTINCT i.id) AS converted_inquiry_count FROM inquiries i JOIN listings l ON i.listing_id = l.id JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY converted_inquiry_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_071 - CTE converted cities
```sql
WITH converted_inquiries AS (
  SELECT DISTINCT i.id, loc.city
  FROM inquiries i
  JOIN listings l ON i.listing_id = l.id
  JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
)
SELECT city, COUNT(*) AS converted_inquiry_count
FROM converted_inquiries
GROUP BY city
ORDER BY converted_inquiry_count DESC, city ASC;
```

### ✅ PASS : REALESTATE_071 - Exists active lease
```sql
SELECT loc.city, COUNT(*) AS converted_inquiry_count FROM inquiries i JOIN listings l ON i.listing_id = l.id JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') GROUP BY loc.city ORDER BY converted_inquiry_count DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_072 - Distinct city count
```sql
SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count FROM properties p JOIN locations loc ON p.location_id = loc.id GROUP BY p.owner_profile_id HAVING COUNT(DISTINCT loc.city) > 1 ORDER BY city_count DESC, p.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_072 - CTE owner cities
```sql
WITH owner_city_counts AS (
  SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count
  FROM properties p
  JOIN locations loc ON p.location_id = loc.id
  GROUP BY p.owner_profile_id
)
SELECT owner_profile_id, city_count
FROM owner_city_counts
WHERE city_count > 1
ORDER BY city_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_072 - Distinct subquery
```sql
SELECT owner_profile_id, city_count FROM (SELECT p.owner_profile_id, COUNT(DISTINCT loc.city) AS city_count FROM properties p JOIN locations loc ON p.location_id = loc.id GROUP BY p.owner_profile_id) x WHERE city_count > 1 ORDER BY city_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_073 - Exists full funnel
```sql
SELECT l.id FROM listings l WHERE EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AND EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = l.id AND o.offer_status = 'accepted') AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_073 - Join distinct ids
```sql
SELECT DISTINCT l.id FROM listings l JOIN inquiries i ON i.listing_id = l.id JOIN property_visits pv ON pv.listing_id = l.id AND pv.visit_status = 'completed' JOIN offers o ON o.listing_id = l.id AND o.offer_status = 'accepted' JOIN leases le ON le.listing_id = l.id AND le.lease_status = 'active' ORDER BY l.id ASC;
```

### ✅ PASS : REALESTATE_073 - CTE funnel flags
```sql
WITH funnel_listings AS (
  SELECT l.id,
         EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AS has_inquiry,
         EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AS has_completed_visit,
         EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = l.id AND o.offer_status = 'accepted') AS has_accepted_offer,
         EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') AS has_active_lease
  FROM listings l
)
SELECT id
FROM funnel_listings
WHERE has_inquiry AND has_completed_visit AND has_accepted_offer AND has_active_lease
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_074 - Below avg subquery
```sql
SELECT id, user_id, resolution_time_mins FROM support_tickets WHERE resolution_time_mins IS NOT NULL AND resolution_time_mins < (SELECT AVG(resolution_time_mins) FROM support_tickets WHERE resolution_time_mins IS NOT NULL) ORDER BY resolution_time_mins ASC, id ASC;
```

### ✅ PASS : REALESTATE_074 - CTE avg time
```sql
WITH avg_time AS (
  SELECT AVG(resolution_time_mins) AS overall_avg
  FROM support_tickets
  WHERE resolution_time_mins IS NOT NULL
)
SELECT st.id, st.user_id, st.resolution_time_mins
FROM support_tickets st
CROSS JOIN avg_time a
WHERE st.resolution_time_mins IS NOT NULL
  AND st.resolution_time_mins < a.overall_avg
ORDER BY st.resolution_time_mins ASC, st.id ASC;
```

### ✅ PASS : REALESTATE_074 - Window avg
```sql
SELECT id, user_id, resolution_time_mins FROM (SELECT id, user_id, resolution_time_mins, AVG(resolution_time_mins) OVER () AS overall_avg FROM support_tickets WHERE resolution_time_mins IS NOT NULL) x WHERE resolution_time_mins < overall_avg ORDER BY resolution_time_mins ASC, id ASC;
```

### ✅ PASS : REALESTATE_075 - Join amenity maps
```sql
SELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.owner_profile_id ORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_075 - Count rows
```sql
SELECT p.owner_profile_id, COUNT(*) AS amenity_mapping_count FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.owner_profile_id ORDER BY amenity_mapping_count DESC, p.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_075 - CTE owner amenities
```sql
WITH owner_amenity_counts AS (
  SELECT p.owner_profile_id, COUNT(pa.id) AS amenity_mapping_count
  FROM properties p
  JOIN property_amenities pa ON p.id = pa.property_id
  GROUP BY p.owner_profile_id
)
SELECT owner_profile_id, amenity_mapping_count
FROM owner_amenity_counts
ORDER BY amenity_mapping_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_076 - Filter counts compare
```sql
SELECT seeker_user_id, COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count, COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count FROM rental_applications GROUP BY seeker_user_id HAVING COUNT(*) FILTER (WHERE application_status = 'rejected') > COUNT(*) FILTER (WHERE application_status = 'approved') ORDER BY rejected_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_076 - Case compare
```sql
SELECT seeker_user_id, SUM(CASE WHEN application_status = 'rejected' THEN 1 ELSE 0 END) AS rejected_count, SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) AS approved_count FROM rental_applications GROUP BY seeker_user_id HAVING SUM(CASE WHEN application_status = 'rejected' THEN 1 ELSE 0 END) > SUM(CASE WHEN application_status = 'approved' THEN 1 ELSE 0 END) ORDER BY rejected_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_076 - CTE seeker outcomes
```sql
WITH seeker_outcomes AS (
  SELECT seeker_user_id, COUNT(*) FILTER (WHERE application_status = 'rejected') AS rejected_count, COUNT(*) FILTER (WHERE application_status = 'approved') AS approved_count
  FROM rental_applications
  GROUP BY seeker_user_id
)
SELECT seeker_user_id, rejected_count, approved_count
FROM seeker_outcomes
WHERE rejected_count > approved_count
ORDER BY rejected_count DESC, seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_077 - Date compare
```sql
SELECT id, property_id, created_at, available_from FROM listings WHERE available_from IS NOT NULL AND created_at::date < available_from ORDER BY available_from DESC, id ASC;
```

### ✅ PASS : REALESTATE_077 - CTE date compare
```sql
WITH delayed_listings AS (
  SELECT id, property_id, created_at, available_from
  FROM listings
  WHERE available_from IS NOT NULL
    AND created_at::date < available_from
)
SELECT id, property_id, created_at, available_from
FROM delayed_listings
ORDER BY available_from DESC, id ASC;
```

### ✅ PASS : REALESTATE_077 - Cast available side
```sql
SELECT id, property_id, created_at, available_from FROM listings WHERE available_from IS NOT NULL AND created_at < available_from::timestamp ORDER BY available_from DESC, id ASC;
```

### ✅ PASS : REALESTATE_078 - Join expired docs
```sql
SELECT DISTINCT op.id, op.user_id FROM owner_profiles op JOIN user_documents ud ON op.user_id = ud.user_id WHERE op.verification_status = 'verified' AND ud.expires_at IS NOT NULL AND ud.expires_at < NOW() ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_078 - Exists expired doc
```sql
SELECT op.id, op.user_id FROM owner_profiles op WHERE op.verification_status = 'verified' AND EXISTS (SELECT 1 FROM user_documents ud WHERE ud.user_id = op.user_id AND ud.expires_at IS NOT NULL AND ud.expires_at < NOW()) ORDER BY op.id ASC;
```

### ✅ PASS : REALESTATE_078 - CTE expired owners
```sql
WITH expired_owner_docs AS (
  SELECT DISTINCT op.id, op.user_id
  FROM owner_profiles op
  JOIN user_documents ud ON op.user_id = ud.user_id
  WHERE op.verification_status = 'verified'
    AND ud.expires_at IS NOT NULL
    AND ud.expires_at < NOW()
)
SELECT id, user_id
FROM expired_owner_docs
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_079 - Join owner avg
```sql
SELECT l.id, l.owner_profile_id, l.rent_amount FROM listings l JOIN (SELECT owner_profile_id, AVG(rent_amount) AS avg_rent FROM listings WHERE rent_amount IS NOT NULL GROUP BY owner_profile_id) x ON l.owner_profile_id = x.owner_profile_id WHERE l.rent_amount IS NOT NULL AND l.rent_amount > x.avg_rent ORDER BY l.rent_amount DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_079 - Window avg
```sql
SELECT id, owner_profile_id, rent_amount FROM (SELECT id, owner_profile_id, rent_amount, AVG(rent_amount) OVER (PARTITION BY owner_profile_id) AS owner_avg_rent FROM listings WHERE rent_amount IS NOT NULL) x WHERE rent_amount > owner_avg_rent ORDER BY rent_amount DESC, id ASC;
```

### ✅ PASS : REALESTATE_079 - CTE owner avg
```sql
WITH owner_avg AS (
  SELECT owner_profile_id, AVG(rent_amount) AS avg_rent
  FROM listings
  WHERE rent_amount IS NOT NULL
  GROUP BY owner_profile_id
)
SELECT l.id, l.owner_profile_id, l.rent_amount
FROM listings l
JOIN owner_avg oa ON l.owner_profile_id = oa.owner_profile_id
WHERE l.rent_amount IS NOT NULL
  AND l.rent_amount > oa.avg_rent
ORDER BY l.rent_amount DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_080 - Group status changes
```sql
SELECT listing_id, COUNT(*) AS status_change_count FROM listing_status_history GROUP BY listing_id ORDER BY status_change_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_080 - Count ids
```sql
SELECT listing_id, COUNT(id) AS status_change_count FROM listing_status_history GROUP BY listing_id ORDER BY status_change_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_080 - CTE history count
```sql
WITH listing_history_counts AS (
  SELECT listing_id, COUNT(*) AS status_change_count
  FROM listing_status_history
  GROUP BY listing_id
)
SELECT listing_id, status_change_count
FROM listing_history_counts
ORDER BY status_change_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_081 - Join city rent
```sql
SELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE le.lease_status = 'active' GROUP BY loc.city ORDER BY total_monthly_rent DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_081 - CTE city revenue
```sql
WITH city_revenue AS (
  SELECT loc.city, SUM(le.monthly_rent) AS total_monthly_rent
  FROM leases le
  JOIN properties p ON le.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE le.lease_status = 'active'
  GROUP BY loc.city
)
SELECT city, total_monthly_rent
FROM city_revenue
ORDER BY total_monthly_rent DESC, city ASC;
```

### ✅ PASS : REALESTATE_081 - Count via case
```sql
SELECT loc.city, SUM(CASE WHEN le.lease_status = 'active' THEN le.monthly_rent ELSE 0 END) AS total_monthly_rent FROM leases le JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_monthly_rent DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_082 - Filter both types
```sql
SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0 AND COUNT(*) FILTER (WHERE listed_for = 'sale') > 0 ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_082 - Case counts
```sql
SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING SUM(CASE WHEN listed_for = 'rent' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN listed_for = 'sale' THEN 1 ELSE 0 END) > 0 ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_082 - CTE mixed owners
```sql
WITH owner_inventory AS (
  SELECT owner_profile_id, COUNT(*) FILTER (WHERE listed_for = 'rent') AS rent_count, COUNT(*) FILTER (WHERE listed_for = 'sale') AS sale_count
  FROM listings
  WHERE listing_status = 'live'
  GROUP BY owner_profile_id
)
SELECT owner_profile_id
FROM owner_inventory
WHERE rent_count > 0 AND sale_count > 0
ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_083 - Left join offers
```sql
SELECT pv.listing_id, COUNT(*) AS completed_visit_count FROM property_visits pv LEFT JOIN offers o ON pv.listing_id = o.listing_id WHERE pv.visit_status = 'completed' GROUP BY pv.listing_id HAVING COUNT(o.id) = 0 ORDER BY completed_visit_count DESC, pv.listing_id ASC;
```

### ✅ PASS : REALESTATE_083 - Not exists offers
```sql
SELECT pv.listing_id, COUNT(*) AS completed_visit_count FROM property_visits pv WHERE pv.visit_status = 'completed' AND NOT EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = pv.listing_id) GROUP BY pv.listing_id ORDER BY completed_visit_count DESC, pv.listing_id ASC;
```

### ✅ PASS : REALESTATE_083 - CTE no offer visits
```sql
WITH completed_no_offer AS (
  SELECT pv.listing_id
  FROM property_visits pv
  WHERE pv.visit_status = 'completed'
    AND NOT EXISTS (
      SELECT 1
      FROM offers o
      WHERE o.listing_id = pv.listing_id
    )
)
SELECT listing_id, COUNT(*) AS completed_visit_count
FROM completed_no_offer
GROUP BY listing_id
ORDER BY completed_visit_count DESC, listing_id ASC;
```

### ✅ PASS : REALESTATE_084 - Late fee count
```sql
SELECT tenant_user_id, COUNT(*) AS late_fee_payment_count FROM rent_payments WHERE late_fee > 0 GROUP BY tenant_user_id HAVING COUNT(*) > 1 ORDER BY late_fee_payment_count DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_084 - CTE late tenants
```sql
WITH tenant_late_fees AS (
  SELECT tenant_user_id, COUNT(*) AS late_fee_payment_count
  FROM rent_payments
  WHERE late_fee > 0
  GROUP BY tenant_user_id
)
SELECT tenant_user_id, late_fee_payment_count
FROM tenant_late_fees
WHERE late_fee_payment_count > 1
ORDER BY late_fee_payment_count DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_084 - Count ids
```sql
SELECT tenant_user_id, COUNT(id) AS late_fee_payment_count FROM rent_payments WHERE late_fee > 0 GROUP BY tenant_user_id HAVING COUNT(id) > 1 ORDER BY late_fee_payment_count DESC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_085 - Avg rent per sqft
```sql
SELECT loc.locality, AVG(l.rent_amount / NULLIF(p.built_up_area_sqft, 0)) AS avg_rent_per_sqft FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL AND p.built_up_area_sqft IS NOT NULL AND p.built_up_area_sqft > 0 GROUP BY loc.locality ORDER BY avg_rent_per_sqft DESC, loc.locality ASC;
```

### ✅ PASS : REALESTATE_085 - CTE per sqft
```sql
WITH listing_rent_per_sqft AS (
  SELECT loc.locality, l.rent_amount / NULLIF(p.built_up_area_sqft, 0) AS rent_per_sqft
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live'
    AND l.listed_for = 'rent'
    AND l.rent_amount IS NOT NULL
    AND p.built_up_area_sqft IS NOT NULL
    AND p.built_up_area_sqft > 0
)
SELECT locality, AVG(rent_per_sqft) AS avg_rent_per_sqft
FROM listing_rent_per_sqft
GROUP BY locality
ORDER BY avg_rent_per_sqft DESC, locality ASC;
```

### ✅ PASS : REALESTATE_085 - Subquery avg
```sql
SELECT locality, AVG(rent_per_sqft) AS avg_rent_per_sqft FROM (SELECT loc.locality, l.rent_amount / NULLIF(p.built_up_area_sqft, 0) AS rent_per_sqft FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL AND p.built_up_area_sqft IS NOT NULL AND p.built_up_area_sqft > 0) x GROUP BY locality ORDER BY avg_rent_per_sqft DESC, locality ASC;
```

### ✅ PASS : REALESTATE_086 - Join drop count
```sql
SELECT l.owner_profile_id, COUNT(*) AS price_drop_count FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL AND lph.new_rent_amount < lph.old_rent_amount GROUP BY l.owner_profile_id HAVING COUNT(*) > 1 ORDER BY price_drop_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_086 - CTE owner drops
```sql
WITH owner_drops AS (
  SELECT l.owner_profile_id, COUNT(*) AS price_drop_count
  FROM listing_price_history lph
  JOIN listings l ON lph.listing_id = l.id
  WHERE lph.old_rent_amount IS NOT NULL
    AND lph.new_rent_amount IS NOT NULL
    AND lph.new_rent_amount < lph.old_rent_amount
  GROUP BY l.owner_profile_id
)
SELECT owner_profile_id, price_drop_count
FROM owner_drops
WHERE price_drop_count > 1
ORDER BY price_drop_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_086 - Difference filter
```sql
SELECT l.owner_profile_id, COUNT(*) AS price_drop_count FROM listing_price_history lph JOIN listings l ON lph.listing_id = l.id WHERE lph.old_rent_amount IS NOT NULL AND lph.new_rent_amount IS NOT NULL AND lph.old_rent_amount - lph.new_rent_amount > 0 GROUP BY l.owner_profile_id HAVING COUNT(*) > 1 ORDER BY price_drop_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_087 - Null offer id
```sql
SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE offer_id IS NULL ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_087 - CTE null offers
```sql
WITH offerless_apps AS (
  SELECT id, listing_id, seeker_user_id
  FROM rental_applications
  WHERE offer_id IS NULL
)
SELECT id, listing_id, seeker_user_id
FROM offerless_apps
ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_087 - Case null check
```sql
SELECT id, listing_id, seeker_user_id FROM rental_applications WHERE CASE WHEN offer_id IS NULL THEN true ELSE false END ORDER BY id ASC;
```

### ✅ PASS : REALESTATE_088 - Distinct owner groups
```sql
SELECT DISTINCT p.owner_profile_id FROM properties p JOIN property_amenities pa ON p.id = pa.property_id GROUP BY p.id, p.owner_profile_id HAVING COUNT(pa.id) > 5 ORDER BY p.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_088 - CTE rich properties
```sql
WITH rich_properties AS (
  SELECT p.owner_profile_id
  FROM properties p
  JOIN property_amenities pa ON p.id = pa.property_id
  GROUP BY p.id, p.owner_profile_id
  HAVING COUNT(pa.id) > 5
)
SELECT DISTINCT owner_profile_id
FROM rich_properties
ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_088 - Exists amenity property
```sql
SELECT DISTINCT p.owner_profile_id FROM properties p WHERE EXISTS (SELECT 1 FROM property_amenities pa WHERE pa.property_id = p.id GROUP BY pa.property_id HAVING COUNT(*) > 5) ORDER BY p.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_089 - Join locality city avgs
```sql
SELECT x.city, x.locality, x.avg_locality_rent FROM (SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city, loc.locality) x JOIN (SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL GROUP BY loc.city) y ON x.city = y.city WHERE x.avg_locality_rent > y.avg_city_rent ORDER BY x.avg_locality_rent DESC, x.city ASC, x.locality ASC;
```

### ✅ PASS : REALESTATE_089 - CTE avg compare
```sql
WITH locality_avg AS (
  SELECT loc.city, loc.locality, AVG(l.rent_amount) AS avg_locality_rent
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL
  GROUP BY loc.city, loc.locality
), city_avg AS (
  SELECT loc.city, AVG(l.rent_amount) AS avg_city_rent
  FROM listings l
  JOIN properties p ON l.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL
  GROUP BY loc.city
)
SELECT la.city, la.locality, la.avg_locality_rent
FROM locality_avg la
JOIN city_avg ca ON la.city = ca.city
WHERE la.avg_locality_rent > ca.avg_city_rent
ORDER BY la.avg_locality_rent DESC, la.city ASC, la.locality ASC;
```

### ✅ PASS : REALESTATE_089 - Window over city rows
```sql
SELECT city, locality, avg_locality_rent FROM (SELECT city, locality, avg_locality_rent, AVG(rent_amount) OVER (PARTITION BY city) AS avg_city_rent FROM (SELECT loc.city, loc.locality, l.rent_amount, AVG(l.rent_amount) OVER (PARTITION BY loc.city, loc.locality) AS avg_locality_rent FROM listings l JOIN properties p ON l.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE l.listing_status = 'live' AND l.listed_for = 'rent' AND l.rent_amount IS NOT NULL) x) y WHERE avg_locality_rent > avg_city_rent GROUP BY city, locality, avg_locality_rent ORDER BY avg_locality_rent DESC, city ASC, locality ASC;
```

### ✅ PASS : REALESTATE_090 - Join full funnel
```sql
SELECT DISTINCT i.seeker_user_id FROM inquiries i JOIN property_visits pv ON i.listing_id = pv.listing_id AND i.seeker_user_id = pv.seeker_user_id JOIN offers o ON i.listing_id = o.listing_id AND i.seeker_user_id = o.seeker_user_id JOIN leases le ON i.listing_id = le.listing_id AND le.tenant_user_id = i.seeker_user_id WHERE pv.visit_status = 'completed' AND o.offer_status = 'accepted' AND le.lease_status = 'active' ORDER BY i.seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_090 - Exists funnel
```sql
SELECT DISTINCT i.seeker_user_id FROM inquiries i WHERE EXISTS (SELECT 1 FROM property_visits pv WHERE pv.listing_id = i.listing_id AND pv.seeker_user_id = i.seeker_user_id AND pv.visit_status = 'completed') AND EXISTS (SELECT 1 FROM offers o WHERE o.listing_id = i.listing_id AND o.seeker_user_id = i.seeker_user_id AND o.offer_status = 'accepted') AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = i.listing_id AND le.tenant_user_id = i.seeker_user_id AND le.lease_status = 'active') ORDER BY i.seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_090 - CTE qualified seekers
```sql
WITH qualified_seekers AS (
  SELECT DISTINCT i.seeker_user_id
  FROM inquiries i
  JOIN property_visits pv ON i.listing_id = pv.listing_id AND i.seeker_user_id = pv.seeker_user_id
  JOIN offers o ON i.listing_id = o.listing_id AND i.seeker_user_id = o.seeker_user_id
  JOIN leases le ON i.listing_id = le.listing_id AND le.tenant_user_id = i.seeker_user_id
  WHERE pv.visit_status = 'completed'
    AND o.offer_status = 'accepted'
    AND le.lease_status = 'active'
)
SELECT seeker_user_id
FROM qualified_seekers
ORDER BY seeker_user_id ASC;
```

### ✅ PASS : REALESTATE_091 - Join city spend
```sql
SELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost FROM maintenance_tickets mt JOIN properties p ON mt.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_maintenance_cost DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_091 - CTE city spend
```sql
WITH city_spend AS (
  SELECT loc.city, SUM(COALESCE(mt.resolution_cost, 0)) AS total_maintenance_cost
  FROM maintenance_tickets mt
  JOIN properties p ON mt.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  GROUP BY loc.city
)
SELECT city, total_maintenance_cost
FROM city_spend
ORDER BY total_maintenance_cost DESC, city ASC;
```

### ✅ PASS : REALESTATE_091 - Case sum
```sql
SELECT loc.city, SUM(CASE WHEN mt.resolution_cost IS NULL THEN 0 ELSE mt.resolution_cost END) AS total_maintenance_cost FROM maintenance_tickets mt JOIN properties p ON mt.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city ORDER BY total_maintenance_cost DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_092 - Rent only filter
```sql
SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING COUNT(*) FILTER (WHERE listed_for = 'rent') > 0 AND COUNT(*) FILTER (WHERE listed_for = 'sale') = 0 ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_092 - Case counts
```sql
SELECT owner_profile_id FROM listings WHERE listing_status = 'live' GROUP BY owner_profile_id HAVING SUM(CASE WHEN listed_for = 'rent' THEN 1 ELSE 0 END) > 0 AND SUM(CASE WHEN listed_for = 'sale' THEN 1 ELSE 0 END) = 0 ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_092 - CTE owner mix
```sql
WITH owner_mix AS (
  SELECT owner_profile_id, COUNT(*) FILTER (WHERE listed_for = 'rent') AS rent_count, COUNT(*) FILTER (WHERE listed_for = 'sale') AS sale_count
  FROM listings
  WHERE listing_status = 'live'
  GROUP BY owner_profile_id
)
SELECT owner_profile_id
FROM owner_mix
WHERE rent_count > 0 AND sale_count = 0
ORDER BY owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_093 - Group tenant property
```sql
SELECT property_id, tenant_user_id, COUNT(*) AS lease_count FROM leases GROUP BY property_id, tenant_user_id HAVING COUNT(*) > 1 ORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_093 - CTE repeated pairs
```sql
WITH tenant_property_leases AS (
  SELECT property_id, tenant_user_id, COUNT(*) AS lease_count
  FROM leases
  GROUP BY property_id, tenant_user_id
)
SELECT property_id, tenant_user_id, lease_count
FROM tenant_property_leases
WHERE lease_count > 1
ORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_093 - Count ids
```sql
SELECT property_id, tenant_user_id, COUNT(id) AS lease_count FROM leases GROUP BY property_id, tenant_user_id HAVING COUNT(id) > 1 ORDER BY lease_count DESC, property_id ASC, tenant_user_id ASC;
```

### ✅ PASS : REALESTATE_094 - Distinct compare
```sql
SELECT l.id, COUNT(DISTINCT pv.id) AS completed_visit_count, COUNT(DISTINCT i.id) AS inquiry_count FROM listings l LEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed' LEFT JOIN inquiries i ON l.id = i.listing_id GROUP BY l.id HAVING COUNT(DISTINCT pv.id) > COUNT(DISTINCT i.id) ORDER BY completed_visit_count DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_094 - CTE compare counts
```sql
WITH listing_counts AS (
  SELECT l.id, COUNT(DISTINCT pv.id) AS completed_visit_count, COUNT(DISTINCT i.id) AS inquiry_count
  FROM listings l
  LEFT JOIN property_visits pv ON l.id = pv.listing_id AND pv.visit_status = 'completed'
  LEFT JOIN inquiries i ON l.id = i.listing_id
  GROUP BY l.id
)
SELECT id, completed_visit_count, inquiry_count
FROM listing_counts
WHERE completed_visit_count > inquiry_count
ORDER BY completed_visit_count DESC, id ASC;
```

### ✅ PASS : REALESTATE_094 - Subquery compare
```sql
SELECT l.id, (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') AS completed_visit_count, (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) AS inquiry_count FROM listings l WHERE (SELECT COUNT(*) FROM property_visits pv WHERE pv.listing_id = l.id AND pv.visit_status = 'completed') > (SELECT COUNT(*) FROM inquiries i WHERE i.listing_id = l.id) ORDER BY completed_visit_count DESC, l.id ASC;
```

### ✅ PASS : REALESTATE_095 - Review older than 7d
```sql
SELECT id, listing_id, seeker_user_id, created_at FROM rental_applications WHERE application_status = 'under_review' AND created_at < NOW() - INTERVAL '7 days' ORDER BY created_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_095 - CTE stale reviews
```sql
WITH stale_reviews AS (
  SELECT id, listing_id, seeker_user_id, created_at
  FROM rental_applications
  WHERE application_status = 'under_review'
    AND created_at < NOW() - INTERVAL '7 days'
)
SELECT id, listing_id, seeker_user_id, created_at
FROM stale_reviews
ORDER BY created_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_095 - Current timestamp interval
```sql
SELECT id, listing_id, seeker_user_id, created_at FROM rental_applications WHERE application_status = 'under_review' AND created_at < CURRENT_TIMESTAMP - INTERVAL '7 days' ORDER BY created_at ASC, id ASC;
```

### ✅ PASS : REALESTATE_096 - Join converted listings
```sql
SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count FROM listings l JOIN inquiries i ON l.id = i.listing_id JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active' GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT l.id) > 1 ORDER BY converted_listing_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_096 - CTE converted owners
```sql
WITH converted_owner_listings AS (
  SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count
  FROM listings l
  JOIN inquiries i ON l.id = i.listing_id
  JOIN leases le ON l.id = le.listing_id AND le.lease_status = 'active'
  GROUP BY l.owner_profile_id
)
SELECT owner_profile_id, converted_listing_count
FROM converted_owner_listings
WHERE converted_listing_count > 1
ORDER BY converted_listing_count DESC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_096 - Exists funnel listings
```sql
SELECT l.owner_profile_id, COUNT(DISTINCT l.id) AS converted_listing_count FROM listings l WHERE EXISTS (SELECT 1 FROM inquiries i WHERE i.listing_id = l.id) AND EXISTS (SELECT 1 FROM leases le WHERE le.listing_id = l.id AND le.lease_status = 'active') GROUP BY l.owner_profile_id HAVING COUNT(DISTINCT l.id) > 1 ORDER BY converted_listing_count DESC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_097 - Sum rewards
```sql
SELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount FROM referrals GROUP BY referrer_user_id ORDER BY total_reward_amount DESC, referrer_user_id ASC;
```

### ✅ PASS : REALESTATE_097 - CTE reward totals
```sql
WITH reward_totals AS (
  SELECT referrer_user_id, SUM(reward_amount) AS total_reward_amount
  FROM referrals
  GROUP BY referrer_user_id
)
SELECT referrer_user_id, total_reward_amount
FROM reward_totals
ORDER BY total_reward_amount DESC, referrer_user_id ASC;
```

### ✅ PASS : REALESTATE_097 - Window totals
```sql
SELECT DISTINCT referrer_user_id, SUM(reward_amount) OVER (PARTITION BY referrer_user_id) AS total_reward_amount FROM referrals ORDER BY total_reward_amount DESC, referrer_user_id ASC;
```

### ✅ PASS : REALESTATE_098 - Join overdue sums
```sql
SELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id WHERE rp.payment_status = 'overdue' GROUP BY loc.city ORDER BY overdue_amount DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_098 - CTE city overdue
```sql
WITH city_overdues AS (
  SELECT loc.city, SUM(rp.amount_due - rp.amount_paid) AS overdue_amount
  FROM rent_payments rp
  JOIN leases le ON rp.lease_id = le.id
  JOIN properties p ON le.property_id = p.id
  JOIN locations loc ON p.location_id = loc.id
  WHERE rp.payment_status = 'overdue'
  GROUP BY loc.city
)
SELECT city, overdue_amount
FROM city_overdues
ORDER BY overdue_amount DESC, city ASC;
```

### ✅ PASS : REALESTATE_098 - Case sum overdue
```sql
SELECT loc.city, SUM(CASE WHEN rp.payment_status = 'overdue' THEN rp.amount_due - rp.amount_paid ELSE 0 END) AS overdue_amount FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id JOIN properties p ON le.property_id = p.id JOIN locations loc ON p.location_id = loc.id GROUP BY loc.city HAVING SUM(CASE WHEN rp.payment_status = 'overdue' THEN rp.amount_due - rp.amount_paid ELSE 0 END) > 0 ORDER BY overdue_amount DESC, loc.city ASC;
```

### ✅ PASS : REALESTATE_099 - Left join status count
```sql
SELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count FROM listings l LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id ORDER BY status_change_count ASC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_099 - CTE live owner history
```sql
WITH live_owner_history AS (
  SELECT l.owner_profile_id, COUNT(lsh.id) AS status_change_count
  FROM listings l
  LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id
  WHERE l.listing_status = 'live'
  GROUP BY l.owner_profile_id
)
SELECT owner_profile_id, status_change_count
FROM live_owner_history
ORDER BY status_change_count ASC, owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_099 - Case count history
```sql
SELECT l.owner_profile_id, SUM(CASE WHEN lsh.id IS NOT NULL THEN 1 ELSE 0 END) AS status_change_count FROM listings l LEFT JOIN listing_status_history lsh ON l.id = lsh.listing_id WHERE l.listing_status = 'live' GROUP BY l.owner_profile_id ORDER BY status_change_count ASC, l.owner_profile_id ASC;
```

### ✅ PASS : REALESTATE_100 - Join paid rent
```sql
SELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id WHERE rp.payment_status IN ('paid', 'partial') GROUP BY le.property_id ORDER BY total_paid_rent DESC, le.property_id ASC;
```

### ✅ PASS : REALESTATE_100 - CTE paid totals
```sql
WITH property_paid_rent AS (
  SELECT le.property_id, SUM(rp.amount_paid) AS total_paid_rent
  FROM rent_payments rp
  JOIN leases le ON rp.lease_id = le.id
  WHERE rp.payment_status IN ('paid', 'partial')
  GROUP BY le.property_id
)
SELECT property_id, total_paid_rent
FROM property_paid_rent
ORDER BY total_paid_rent DESC, property_id ASC;
```

### ✅ PASS : REALESTATE_100 - Case with having
```sql
SELECT le.property_id, SUM(CASE WHEN rp.payment_status IN ('paid', 'partial') THEN rp.amount_paid ELSE 0 END) AS total_paid_rent FROM rent_payments rp JOIN leases le ON rp.lease_id = le.id GROUP BY le.property_id HAVING SUM(CASE WHEN rp.payment_status IN ('paid', 'partial') THEN 1 ELSE 0 END) > 0 ORDER BY total_paid_rent DESC, le.property_id ASC;
```

