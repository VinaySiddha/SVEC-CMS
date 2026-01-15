-- Check if autonomous_exam_section table exists and has data
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'autonomous_exam_section';

-- Count records in the table
SELECT COUNT(*) as total_records FROM autonomous_exam_section;

-- Show all records (limit to first 10)
SELECT * FROM autonomous_exam_section 
WHERE deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00'
LIMIT 10;

-- Show table structure
DESCRIBE autonomous_exam_section;

-- Show all records including soft-deleted ones
SELECT *, IF(deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00', 'ACTIVE', 'DELETED') as status 
FROM autonomous_exam_section;
