-- Diagnostic query to check mech_mous data

-- 1. Check total record count
SELECT 'Total Records' as check_name, COUNT(*) as count FROM mech_mous;

-- 2. Check records by type
SELECT 'Records by Type' as check_name, type, COUNT(*) as count FROM mech_mous GROUP BY type;

-- 3. Show first 5 records with raw data
SELECT id, type, LENGTH(data) as data_length, SUBSTRING(data, 1, 100) as data_preview, created_at 
FROM mech_mous 
LIMIT 5;

-- 4. Show all industry type records with parsed fields
SELECT 
  id,
  type,
  JSON_EXTRACT(data, '$.organization') as organization,
  JSON_EXTRACT(data, '$.industry_type') as industry_type,
  JSON_EXTRACT(data, '$.date_of_mou') as date_of_mou,
  JSON_EXTRACT(data, '$.validity') as validity
FROM mech_mous 
WHERE type = 'industry';

-- 5. Show all activity type records with parsed fields
SELECT 
  id,
  type,
  JSON_EXTRACT(data, '$.category') as category,
  JSON_LENGTH(JSON_EXTRACT(data, '$.activities')) as activity_count
FROM mech_mous 
WHERE type = 'activity';

-- 6. Show complete raw data for first record (for debugging)
SELECT id, type, data
FROM mech_mous
LIMIT 1;
