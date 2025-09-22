-- SVEC-CMS Database Schema
-- UTF8MB4, InnoDB
-- Created: August 29, 2025

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `department` VARCHAR(32) NOT NULL,
  `department_name` VARCHAR(100) NOT NULL,
  `role` ENUM('dept', 'admin') NOT NULL DEFAULT 'dept',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idx_department` (`department` ASC),
  INDEX `idx_role` (`role` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `password_resets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `proposed_hash` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `expires_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_password_resets_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_password_resets_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `admin_approvals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_approvals` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `module` VARCHAR(50) NOT NULL,
  `record_id` BIGINT UNSIGNED NOT NULL,
  `approver_id` BIGINT UNSIGNED NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `comments` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_approvals_users_idx` (`approver_id` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_module_record` (`module` ASC, `record_id` ASC),
  CONSTRAINT `fk_admin_approvals_users`
    FOREIGN KEY (`approver_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `department_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `department_info` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `dept_full_name` VARCHAR(100) NOT NULL,
  `hod_name` VARCHAR(100) NOT NULL,
  `hod_image` VARCHAR(255) NULL,
  `vision` TEXT NULL,
  `mission` TEXT NULL,
  `about` TEXT NULL,
  `contact_email` VARCHAR(255) NULL,
  `contact_phone` VARCHAR(20) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dept_UNIQUE` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `faculty_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faculty_profiles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `qualification` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(100) NOT NULL,
  `specialization` VARCHAR(255) NULL,
  `experience_years` INT NULL,
  `email` VARCHAR(255) NULL,
  `profile_url` VARCHAR(255) NULL,
  `bio` TEXT NULL,
  `research_interests` TEXT NULL,
  `publications` TEXT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `board_of_studies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `board_of_studies` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `member_name` VARCHAR(100) NOT NULL,
  `designation` VARCHAR(100) NOT NULL,
  `organization` VARCHAR(255) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `year` VARCHAR(10) NOT NULL,
  `contact_email` VARCHAR(255) NULL,
  `image_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `syllabus_documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `syllabus_documents` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `type` ENUM('btech', 'mtech', 'soc', 'mba', 'syllabus') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `document_url` VARCHAR(255) NOT NULL,
  `academic_year` VARCHAR(16) NOT NULL,
  `semester` VARCHAR(20) NULL,
  `regulation` VARCHAR(20) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_type` (`type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `classrooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classrooms` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `room_number` VARCHAR(20) NOT NULL,
  `capacity` INT NOT NULL,
  `facilities` JSON NULL,
  `is_ict_enabled` BOOLEAN NOT NULL DEFAULT FALSE,
  `image_url` VARCHAR(255) NULL,
  `floor` VARCHAR(20) NULL,
  `building` VARCHAR(100) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `seminar_halls`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `seminar_halls` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `capacity` INT NOT NULL,
  `facilities` JSON NULL,
  `is_ict_enabled` BOOLEAN NOT NULL DEFAULT FALSE,
  `image_url` VARCHAR(255) NULL,
  `location` VARCHAR(255) NULL,
  `area_sqft` FLOAT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `laboratories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `laboratories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `lab_name` VARCHAR(255) NOT NULL,
  `lab_code` VARCHAR(50) NULL,
  `configurations` JSON NULL,
  `usage` TEXT NULL,
  `capacity` INT NULL,
  `softwares` TEXT NULL,
  `equipments` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `location` VARCHAR(255) NULL,
  `incharge` VARCHAR(100) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `mous`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mous` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `organization_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `document_url` VARCHAR(255) NULL,
  `logo_url` VARCHAR(255) NULL,
  `focal_person` VARCHAR(100) NULL,
  `contact_email` VARCHAR(255) NULL,
  `benefits` TEXT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `industry_interactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `industry_interactions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `company_name` VARCHAR(255) NOT NULL,
  `interaction_type` VARCHAR(100) NOT NULL,
  `event_date` DATE NOT NULL,
  `description` TEXT NULL,
  `participants_count` INT NULL,
  `resource_person` VARCHAR(100) NULL,
  `designation` VARCHAR(100) NULL,
  `outcomes` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `fdp_attended`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fdp_attended` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `faculty_name` VARCHAR(100) NOT NULL,
  `program_title` VARCHAR(255) NOT NULL,
  `organized_by` VARCHAR(255) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `program_type` VARCHAR(50) NOT NULL,
  `certificate_url` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `fdp_conducted`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fdp_conducted` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `program_title` VARCHAR(255) NOT NULL,
  `coordinator` VARCHAR(100) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `program_type` VARCHAR(50) NOT NULL,
  `resource_persons` TEXT NULL,
  `participants_count` INT NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `faculty_achievements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faculty_achievements` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `faculty_name` VARCHAR(100) NOT NULL,
  `achievement_type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `achievement_date` DATE NULL,
  `issuing_authority` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_achievement_type` (`achievement_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `workshops`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshops` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `venue` VARCHAR(255) NULL,
  `resource_person` VARCHAR(255) NULL,
  `coordinator` VARCHAR(100) NULL,
  `participants_count` INT NULL,
  `participants_type` VARCHAR(50) NULL,
  `image_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `student_achievements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `student_achievements` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `student_name` VARCHAR(100) NOT NULL,
  `roll_number` VARCHAR(20) NOT NULL,
  `achievement_type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `achievement_date` DATE NULL,
  `issuing_authority` VARCHAR(255) NULL,
  `academic_year` VARCHAR(20) NULL,
  `image_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_achievement_type` (`achievement_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `placements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `placements` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `student_name` VARCHAR(100) NOT NULL,
  `roll_number` VARCHAR(20) NOT NULL,
  `company_name` VARCHAR(255) NOT NULL,
  `position` VARCHAR(100) NOT NULL,
  `package` DECIMAL(10,2) NULL,
  `placement_date` DATE NULL,
  `placement_type` ENUM('on-campus', 'off-campus', 'internship') NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `batch` VARCHAR(20) NOT NULL,
  `image_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_company` (`company_name` ASC),
  INDEX `idx_academic_year` (`academic_year` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `placement_gallery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `placement_gallery` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `caption` TEXT NULL,
  `event_date` DATE NULL,
  `company_name` VARCHAR(255) NULL,
  `academic_year` VARCHAR(20) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `scholarships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scholarships` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `eligibility` TEXT NULL,
  `amount` VARCHAR(100) NULL,
  `deadline` DATE NULL,
  `academic_year` VARCHAR(20) NULL,
  `application_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `technical_associations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `technical_associations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `coordinator` VARCHAR(100) NULL,
  `established_year` INT NULL,
  `logo_url` VARCHAR(255) NULL,
  `website_url` VARCHAR(255) NULL,
  `social_media` JSON NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `training_activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `training_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `training_type` VARCHAR(50) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `resource_person` VARCHAR(255) NULL,
  `company` VARCHAR(255) NULL,
  `coordinator` VARCHAR(100) NULL,
  `participants_count` INT NULL,
  `batch` VARCHAR(20) NULL,
  `academic_year` VARCHAR(20) NULL,
  `image_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_training_type` (`training_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `newsletters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newsletters` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `publish_date` DATE NOT NULL,
  `volume` VARCHAR(20) NULL,
  `issue` VARCHAR(20) NULL,
  `academic_year` VARCHAR(20) NULL,
  `document_url` VARCHAR(255) NOT NULL,
  `cover_image_url` VARCHAR(255) NULL,
  `editors` TEXT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `extracurriculars`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `extracurriculars` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `event_type` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL,
  `venue` VARCHAR(255) NULL,
  `coordinator` VARCHAR(100) NULL,
  `participants_count` INT NULL,
  `winners` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `document_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_event_type` (`event_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `hackathons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hackathons` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `venue` VARCHAR(255) NULL,
  `organizer` VARCHAR(255) NULL,
  `coordinator` VARCHAR(100) NULL,
  `sponsors` TEXT NULL,
  `prizes` TEXT NULL,
  `participants_count` INT NULL,
  `winners` TEXT NULL,
  `image_url` VARCHAR(255) NULL,
  `website_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `e_resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `e_resources` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `resource_type` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `url` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NULL,
  `publisher` VARCHAR(255) NULL,
  `publish_date` DATE NULL,
  `subject` VARCHAR(100) NULL,
  `tags` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_resource_type` (`resource_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `handbooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `handbooks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `document_url` VARCHAR(255) NOT NULL,
  `cover_image_url` VARCHAR(255) NULL,
  `editor` VARCHAR(100) NULL,
  `publish_date` DATE NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `department_library`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `department_library` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `resource_type` ENUM('Book', 'Journal', 'Magazine', 'QuestionBank', 'Other') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NULL,
  `publisher` VARCHAR(255) NULL,
  `year` INT NULL,
  `isbn` VARCHAR(20) NULL,
  `edition` VARCHAR(20) NULL,
  `inventory_no` VARCHAR(64) NULL,
  `copies` INT NULL DEFAULT 1,
  `description` TEXT NULL,
  `file_url` VARCHAR(255) NULL,
  `cover_image_url` VARCHAR(255) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_resource_type` (`resource_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `gallery_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gallery_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `caption` TEXT NULL,
  `event_name` VARCHAR(255) NULL,
  `event_date` DATE NULL,
  `category` VARCHAR(50) NULL,
  `academic_year` VARCHAR(20) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_category` (`category` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Insert department_info seed data
-- -----------------------------------------------------
INSERT INTO `department_info` 
(`dept`, `dept_full_name`, `hod_name`, `status`) VALUES 
('cse', 'Computer Science and Engineering', 'Dr. R. Praveen Sam', 'approved'),
('cse-ai', 'Computer Science and Engineering (Artificial Intelligence)', 'Dr. P. Suresh Varma', 'approved'),
('cse-ds', 'Computer Science and Engineering (Data Science)', 'Dr. S. Narayana', 'approved'),
('ece', 'Electronics and Communication Engineering', 'Dr. B. Rajendra Naik', 'approved'),
('eee', 'Electrical and Electronics Engineering', 'Dr. K. Ramesh Reddy', 'approved'),
('civil', 'Civil Engineering', 'Dr. T. Suresh Kumar', 'approved'),
('mech', 'Mechanical Engineering', 'Dr. G. Venkata Rao', 'approved'),
('mba', 'Master of Business Administration', 'Dr. P. Srinivasa Reddy', 'approved'),
('bsh', 'Basic Sciences and Humanities', 'Dr. T. Raghava Rao', 'approved'),
('cst', 'Computer Science and Technology', 'Dr. K. Srinivas', 'approved'),
('ect', 'Electronics and Computer Technology', 'Dr. J. Ravindra', 'approved'),
('aiml', 'Artificial Intelligence and Machine Learning', 'Dr. P. Venkata Krishna', 'approved');

SET FOREIGN_KEY_CHECKS = 1;
