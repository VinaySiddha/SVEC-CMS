-- ============================================================================
-- FIX: cai_technical_association - Category Column & Year Column
-- ============================================================================
-- Issue: "Data truncated for column 'category' at row 1"
-- Cause: The category column may be too small for the data being inserted
-- Solution: Increase column size and ensure academic_year column exists

USE svec_cms;

-- ============================================================================
-- STEP 1: Check current column definitions
-- ============================================================================
DESCRIBE cai_technical_association;

-- Check column types
SELECT COLUMN_NAME, COLUMN_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cai_technical_association' AND TABLE_SCHEMA = 'svec_cms'
ORDER BY ORDINAL_POSITION;

-- ============================================================================
-- STEP 2: Fix category column size (increase to VARCHAR(100) if needed)
-- ============================================================================
ALTER TABLE cai_technical_association 
MODIFY COLUMN category VARCHAR(100);

-- ============================================================================
-- STEP 3: Ensure academic_year column exists (add if missing)
-- ============================================================================
-- Check if academic_year column exists
SELECT COUNT(*) as column_exists
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cai_technical_association' 
AND COLUMN_NAME = 'academic_year'
AND TABLE_SCHEMA = 'svec_cms';

-- If the above returns 0, run this to add the column:
-- ALTER TABLE cai_technical_association 
-- ADD COLUMN academic_year VARCHAR(20) DEFAULT NULL 
-- AFTER title;

-- Or run this to ensure it exists (works whether it exists or not):
ALTER TABLE cai_technical_association 
ADD COLUMN IF NOT EXISTS academic_year VARCHAR(20) DEFAULT NULL AFTER title;

-- ============================================================================
-- STEP 4: Verify all changes
-- ============================================================================
DESCRIBE cai_technical_association;

-- Verify columns and their sizes
SELECT COLUMN_NAME, COLUMN_TYPE, CHARACTER_MAXIMUM_LENGTH 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cai_technical_association' AND TABLE_SCHEMA = 'svec_cms';

-- Check existing data (if any)
SELECT COUNT(*) as total_records FROM cai_technical_association;
SELECT DISTINCT category FROM cai_technical_association LIMIT 10;

-- ============================================================================
-- SUCCESS: Now the API should work without truncation errors
-- ============================================================================

