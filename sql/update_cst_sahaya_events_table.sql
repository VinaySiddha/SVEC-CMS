-- Update cst_sahaya_events table to add missing columns
-- Adds: title, category, url columns
-- NOTE: This migration updates the table structure to support the Sahaya Events UI module

-- Step 1: Add title column if it doesn't exist (using TEXT for larger content)
ALTER TABLE `cst_sahaya_events` ADD COLUMN `title` TEXT DEFAULT NULL FIRST;

-- Step 2: Add category column if it doesn't exist
ALTER TABLE `cst_sahaya_events` ADD COLUMN `category` varchar(50) DEFAULT 'sahaya' AFTER `year`;

-- Step 3: Rename file_url to url (if needed, can also keep file_url as is)
-- Option A: If you want to rename file_url to url, use CHANGE (MySQL specific)
-- ALTER TABLE `cst_sahaya_events` CHANGE COLUMN `file_url` `url` varchar(255) DEFAULT NULL;

-- Option B: Or keep file_url and have url as alias in queries (current approach)
-- The API and form will use 'url' field name mapping

-- Step 4: Populate title for existing records (if empty)
UPDATE `cst_sahaya_events` 
SET `title` = CONCAT('Sahaya ', `year`) 
WHERE `title` IS NULL OR `title` = '';

-- Step 5: Ensure id column is primary key (if not already)
-- ALTER TABLE `cst_sahaya_events` ADD PRIMARY KEY (`id`);

-- Step 6: Add indexes for better query performance
ALTER TABLE `cst_sahaya_events` ADD INDEX `idx_title` (`title`);
ALTER TABLE `cst_sahaya_events` ADD INDEX `idx_year` (`year`);
ALTER TABLE `cst_sahaya_events` ADD INDEX `idx_category` (`category`);

-- Display the table structure to verify
DESCRIBE `cst_sahaya_events`;

-- If the title column already exists as varchar(255), modify it to TEXT
-- ALTER TABLE `cst_sahaya_events` MODIFY COLUMN `title` TEXT DEFAULT NULL;
