-- Enhanced Admin Panel Schema Updates
-- Run this script to add the necessary fields and constraints for the admin panel system

-- Add created_by field to users table if it doesn't exist
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `created_by` BIGINT UNSIGNED NULL COMMENT 'ID of the user who created this user',
ADD INDEX IF NOT EXISTS `fk_users_created_by_idx` (`created_by` ASC);

-- Add foreign key constraint for created_by if it doesn't exist
SET @constraint_exists = (
    SELECT COUNT(*)
    FROM information_schema.TABLE_CONSTRAINTS 
    WHERE CONSTRAINT_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'users' 
    AND CONSTRAINT_NAME = 'fk_users_created_by'
);

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE `users` ADD CONSTRAINT `fk_users_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE',
    'SELECT "Foreign key constraint already exists" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ensure audit_logs table exists (it should be created by super_admin_schema.sql)
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NULL,
  `action` VARCHAR(100) NOT NULL COMMENT 'Action performed, e.g., user_created, data_modified',
  `resource_type` VARCHAR(50) NOT NULL COMMENT 'Type of resource, e.g., users, department_data',
  `resource_id` VARCHAR(100) NULL COMMENT 'ID of the affected resource',
  `department` VARCHAR(32) NULL COMMENT 'Department context if applicable',
  `old_values` JSON NULL COMMENT 'Previous values before change',
  `new_values` JSON NULL COMMENT 'New values after change',
  `ip_address` VARCHAR(45) NULL,
  `user_agent` VARCHAR(500) NULL,
  `session_id` VARCHAR(128) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metadata` JSON NULL COMMENT 'Additional context data',
  PRIMARY KEY (`id`),
  INDEX `fk_audit_logs_user_idx` (`user_id` ASC),
  INDEX `idx_audit_action` (`action` ASC),
  INDEX `idx_audit_resource` (`resource_type` ASC),
  INDEX `idx_audit_department` (`department` ASC),
  INDEX `idx_audit_created_at` (`created_at` ASC),
  CONSTRAINT `fk_audit_logs_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add review fields to all main data tables if they don't exist

-- Faculty profiles
ALTER TABLE `faculty_profiles` 
ADD COLUMN IF NOT EXISTS `reviewed_by` VARCHAR(64) NULL COMMENT 'Username who reviewed this record',
ADD COLUMN IF NOT EXISTS `reviewed_at` TIMESTAMP NULL COMMENT 'When this record was reviewed',
ADD COLUMN IF NOT EXISTS `review_comments` TEXT NULL COMMENT 'Comments from the reviewer';

-- Faculty achievements
ALTER TABLE `faculty_achievements` 
ADD COLUMN IF NOT EXISTS `reviewed_by` VARCHAR(64) NULL COMMENT 'Username who reviewed this record',
ADD COLUMN IF NOT EXISTS `reviewed_at` TIMESTAMP NULL COMMENT 'When this record was reviewed',
ADD COLUMN IF NOT EXISTS `review_comments` TEXT NULL COMMENT 'Comments from the reviewer';

-- Student achievements
ALTER TABLE `student_achievements` 
ADD COLUMN IF NOT EXISTS `reviewed_by` VARCHAR(64) NULL COMMENT 'Username who reviewed this record',
ADD COLUMN IF NOT EXISTS `reviewed_at` TIMESTAMP NULL COMMENT 'When this record was reviewed',
ADD COLUMN IF NOT EXISTS `review_comments` TEXT NULL COMMENT 'Comments from the reviewer';

-- Workshops
ALTER TABLE `workshops` 
ADD COLUMN IF NOT EXISTS `reviewed_by` VARCHAR(64) NULL COMMENT 'Username who reviewed this record',
ADD COLUMN IF NOT EXISTS `reviewed_at` TIMESTAMP NULL COMMENT 'When this record was reviewed',
ADD COLUMN IF NOT EXISTS `review_comments` TEXT NULL COMMENT 'Comments from the reviewer';

-- Labs (check if table exists first)
SET @table_exists = (
    SELECT COUNT(*)
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'labs'
);

SET @sql = IF(@table_exists > 0, 
    'ALTER TABLE `labs` 
     ADD COLUMN IF NOT EXISTS `reviewed_by` VARCHAR(64) NULL COMMENT "Username who reviewed this record",
     ADD COLUMN IF NOT EXISTS `reviewed_at` TIMESTAMP NULL COMMENT "When this record was reviewed",
     ADD COLUMN IF NOT EXISTS `review_comments` TEXT NULL COMMENT "Comments from the reviewer"',
    'SELECT "Labs table does not exist" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Placements (check if table exists first)
SET @table_exists = (
    SELECT COUNT(*)
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'placements'
);

SET @sql = IF(@table_exists > 0, 
    'ALTER TABLE `placements` 
     ADD COLUMN IF NOT EXISTS `reviewed_by` VARCHAR(64) NULL COMMENT "Username who reviewed this record",
     ADD COLUMN IF NOT EXISTS `reviewed_at` TIMESTAMP NULL COMMENT "When this record was reviewed",
     ADD COLUMN IF NOT EXISTS `review_comments` TEXT NULL COMMENT "Comments from the reviewer"',
    'SELECT "Placements table does not exist" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Create a comprehensive view for pending approvals
CREATE OR REPLACE VIEW `pending_approvals_view` AS
SELECT 
  'faculty_profiles' as table_name,
  id,
  name as title,
  dept as department,
  'faculty' as type,
  status,
  created_at,
  reviewed_by,
  reviewed_at,
  review_comments
FROM faculty_profiles 
WHERE status = 'pending' AND deleted_at IS NULL

UNION ALL

SELECT 
  'faculty_achievements' as table_name,
  id,
  title,
  dept as department,
  'achievement' as type,
  status,
  created_at,
  reviewed_by,
  reviewed_at,
  review_comments
FROM faculty_achievements 
WHERE status = 'pending' AND deleted_at IS NULL

UNION ALL

SELECT 
  'student_achievements' as table_name,
  id,
  title,
  dept as department,
  'achievement' as type,
  status,
  created_at,
  reviewed_by,
  reviewed_at,
  review_comments
FROM student_achievements 
WHERE status = 'pending' AND deleted_at IS NULL

UNION ALL

SELECT 
  'workshops' as table_name,
  id,
  title,
  department,
  'workshop' as type,
  status,
  created_at,
  reviewed_by,
  reviewed_at,
  review_comments
FROM workshops 
WHERE status = 'pending' AND deleted_at IS NULL;

-- Insert sample audit log for schema update
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, department, new_values, ip_address)
VALUES (
  1, 
  'schema_update', 
  'database', 
  'admin_panel_enhancement', 
  'system',
  JSON_OBJECT(
    'description', 'Enhanced admin panel schema with review fields and audit logging',
    'tables_updated', JSON_ARRAY('users', 'faculty_profiles', 'faculty_achievements', 'student_achievements', 'workshops'),
    'features_added', JSON_ARRAY('created_by tracking', 'review workflow', 'audit logging', 'pending approvals view')
  ),
  '127.0.0.1'
);

-- Show completion message
SELECT 'Admin Panel Schema Enhancement Completed Successfully!' as status;