-- Super Admin Database Schema for SVEC-CMS
-- Enhanced role-based access control and audit logging
-- Created: September 12, 2025

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Update users table to include super_admin role
ALTER TABLE `users` 
MODIFY `role` ENUM('dept', 'admin', 'super_admin') NOT NULL DEFAULT 'dept';

-- Add super admin specific fields to users table if they don't exist
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `last_login` TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS `login_count` INT UNSIGNED NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS `password_changed_at` TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS `must_change_password` BOOLEAN NOT NULL DEFAULT FALSE;

-- -----------------------------------------------------
-- Table `super_admin_permissions`
-- Fine-grained permission system for super admins
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `super_admin_permissions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `permission` VARCHAR(100) NOT NULL COMMENT 'e.g., manage_users, view_all_departments, create_credentials',
  `resource` VARCHAR(100) NULL COMMENT 'specific resource if applicable, e.g., department_code',
  `granted_by` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` TIMESTAMP NULL COMMENT 'NULL means no expiration',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_user_permission_resource` (`user_id`, `permission`, `resource`),
  INDEX `fk_permissions_user_idx` (`user_id` ASC),
  INDEX `fk_permissions_granted_by_idx` (`granted_by` ASC),
  INDEX `idx_permission` (`permission` ASC),
  CONSTRAINT `fk_permissions_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_permissions_granted_by`
    FOREIGN KEY (`granted_by`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `department_credentials`
-- Managed department user credentials by super admin
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `department_credentials` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `created_by` BIGINT UNSIGNED NOT NULL COMMENT 'Super admin who created this credential',
  `department` VARCHAR(32) NOT NULL,
  `access_level` ENUM('read', 'write', 'admin') NOT NULL DEFAULT 'read',
  `specific_modules` JSON NULL COMMENT 'Array of specific modules this user can access',
  `ip_restrictions` JSON NULL COMMENT 'Array of allowed IP addresses/ranges',
  `session_timeout` INT UNSIGNED NULL DEFAULT 28800 COMMENT 'Session timeout in seconds, default 8 hours',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `notes` TEXT NULL COMMENT 'Admin notes about this credential',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expires_at` TIMESTAMP NULL COMMENT 'Credential expiration date',
  `last_used` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dept_creds_user_idx` (`user_id` ASC),
  INDEX `fk_dept_creds_created_by_idx` (`created_by` ASC),
  INDEX `idx_department` (`department` ASC),
  INDEX `idx_is_active` (`is_active` ASC),
  CONSTRAINT `fk_dept_creds_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_dept_creds_created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `audit_logs`
-- Comprehensive audit logging for super admin actions
-- -----------------------------------------------------
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
  `severity` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
  `status` ENUM('success', 'failed', 'pending') NOT NULL DEFAULT 'success',
  `error_message` TEXT NULL,
  `metadata` JSON NULL COMMENT 'Additional context data',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_audit_user_idx` (`user_id` ASC),
  INDEX `idx_action` (`action` ASC),
  INDEX `idx_resource` (`resource_type`, `resource_id`),
  INDEX `idx_department` (`department` ASC),
  INDEX `idx_created_at` (`created_at` DESC),
  INDEX `idx_severity` (`severity` ASC),
  CONSTRAINT `fk_audit_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `system_settings`
-- Global system configuration managed by super admin
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL,
  `setting_value` TEXT NOT NULL,
  `setting_type` ENUM('string', 'number', 'boolean', 'json') NOT NULL DEFAULT 'string',
  `category` VARCHAR(50) NOT NULL DEFAULT 'general',
  `description` TEXT NULL,
  `is_public` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Whether this setting can be viewed by non-super admins',
  `updated_by` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `setting_key_UNIQUE` (`setting_key` ASC),
  INDEX `fk_settings_updated_by_idx` (`updated_by` ASC),
  INDEX `idx_category` (`category` ASC),
  CONSTRAINT `fk_settings_updated_by`
    FOREIGN KEY (`updated_by`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `department_data_access`
-- Track which super admins can access which department data
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `department_data_access` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `super_admin_id` BIGINT UNSIGNED NOT NULL,
  `department` VARCHAR(32) NOT NULL,
  `access_type` ENUM('read', 'write', 'delete', 'admin') NOT NULL,
  `granted_by` BIGINT UNSIGNED NULL,
  `reason` TEXT NULL COMMENT 'Reason for granting this access',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` TIMESTAMP NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`id`),
  INDEX `fk_dept_access_admin_idx` (`super_admin_id` ASC),
  INDEX `fk_dept_access_granted_by_idx` (`granted_by` ASC),
  INDEX `idx_department` (`department` ASC),
  INDEX `idx_access_type` (`access_type` ASC),
  UNIQUE INDEX `unique_admin_dept_access` (`super_admin_id`, `department`, `access_type`),
  CONSTRAINT `fk_dept_access_admin`
    FOREIGN KEY (`super_admin_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_dept_access_granted_by`
    FOREIGN KEY (`granted_by`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default super admin permissions
INSERT INTO `super_admin_permissions` (`user_id`, `permission`) 
SELECT `id`, 'manage_users' FROM `users` WHERE `role` = 'super_admin'
ON DUPLICATE KEY UPDATE `permission` = VALUES(`permission`);

INSERT INTO `super_admin_permissions` (`user_id`, `permission`) 
SELECT `id`, 'view_all_departments' FROM `users` WHERE `role` = 'super_admin'
ON DUPLICATE KEY UPDATE `permission` = VALUES(`permission`);

INSERT INTO `super_admin_permissions` (`user_id`, `permission`) 
SELECT `id`, 'create_credentials' FROM `users` WHERE `role` = 'super_admin'
ON DUPLICATE KEY UPDATE `permission` = VALUES(`permission`);

INSERT INTO `super_admin_permissions` (`user_id`, `permission`) 
SELECT `id`, 'manage_system_settings' FROM `users` WHERE `role` = 'super_admin'
ON DUPLICATE KEY UPDATE `permission` = VALUES(`permission`);

INSERT INTO `super_admin_permissions` (`user_id`, `permission`) 
SELECT `id`, 'view_audit_logs' FROM `users` WHERE `role` = 'super_admin'
ON DUPLICATE KEY UPDATE `permission` = VALUES(`permission`);

-- Insert default system settings
INSERT IGNORE INTO `system_settings` (`setting_key`, `setting_value`, `setting_type`, `category`, `description`) VALUES
('max_login_attempts', '5', 'number', 'security', 'Maximum failed login attempts before account lockout'),
('session_timeout', '28800', 'number', 'security', 'Default session timeout in seconds (8 hours)'),
('password_min_length', '8', 'number', 'security', 'Minimum password length requirement'),
('enable_audit_logging', 'true', 'boolean', 'security', 'Enable comprehensive audit logging'),
('super_admin_2fa_required', 'true', 'boolean', 'security', 'Require 2FA for super admin accounts'),
('department_data_retention_days', '2555', 'number', 'data', 'Days to retain department data (7 years)'),
('allow_concurrent_sessions', 'false', 'boolean', 'security', 'Allow multiple concurrent sessions per user');

SET FOREIGN_KEY_CHECKS = 1;