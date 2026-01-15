-- Fix for ece_faculty_achievements table
-- The 'type' field needs a default value to allow INSERT statements with only title field

ALTER TABLE `ece_faculty_achievements` 
MODIFY COLUMN `type` varchar(50) NOT NULL DEFAULT 'general';

-- Ensure id column has AUTO_INCREMENT (if not already set)
-- First check if id is already auto_increment, if not, add it
ALTER TABLE `ece_faculty_achievements` 
MODIFY COLUMN `id` int NOT NULL AUTO_INCREMENT;

-- Verify the changes
-- DESCRIBE ece_faculty_achievements;
