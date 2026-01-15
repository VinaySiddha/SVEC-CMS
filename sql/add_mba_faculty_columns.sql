-- Add missing columns to mba_faculty table
-- This migration ensures mba_faculty has all the columns needed for the faculty form

-- Check if columns exist before adding them
SET FOREIGN_KEY_CHECKS = 0;

-- Add 'title' column if it doesn't exist
ALTER TABLE `mba_faculty`
ADD COLUMN `title` VARCHAR(255) NULL AFTER `id`;

-- Add 'date_of_joining' column if it doesn't exist (in case it was missed)
ALTER TABLE `mba_faculty`
ADD COLUMN `date_of_joining` DATE NULL AFTER `designation`;

-- If 'name' column doesn't have the faculty names yet, and 'title' column is empty,
-- copy name to title for consistency
UPDATE `mba_faculty`
SET `title` = COALESCE(`title`, `name`)
WHERE `title` IS NULL OR `title` = '';

SET FOREIGN_KEY_CHECKS = 1;
