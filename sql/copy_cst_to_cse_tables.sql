-- Copy CST tables to CSE tables
-- This script creates CSE versions of CST tables with the same structure and data

USE cms_college;

-- 1. Copy cst_sahaya_events to cse_sahaya_events
-- First, create the CSE table with the same structure as CST
CREATE TABLE IF NOT EXISTS cse_sahaya_events LIKE cst_sahaya_events;

-- Copy all data from CST to CSE table
INSERT INTO cse_sahaya_events (title, year, category, file_url, pdf_url, url, created_at, updated_at)
SELECT title, year, category, file_url, pdf_url, url, created_at, updated_at 
FROM cst_sahaya_events;

-- Show the copied data
SELECT 'CSE Sahaya Events - Total Records:' as Info, COUNT(*) as Count FROM cse_sahaya_events;
SELECT 'CSE Sahaya Events by Category:' as Info, category, COUNT(*) as Count 
FROM cse_sahaya_events 
GROUP BY category;

-- Display sample records
SELECT 'Sample CSE Sahaya Events:' as Info;
SELECT id, title, year, category, 
       CASE 
         WHEN file_url IS NOT NULL THEN 'file_url'
         WHEN pdf_url IS NOT NULL THEN 'pdf_url' 
         WHEN url IS NOT NULL THEN 'url'
         ELSE 'no_url'
       END as url_type
FROM cse_sahaya_events 
ORDER BY year DESC, category 
LIMIT 10;

-- Verify table structure
DESCRIBE cse_sahaya_events;