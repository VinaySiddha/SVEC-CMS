-- Additional tables for EEE Department fields
-- These tables are for storing data that was previously hardcoded

-- -----------------------------------------------------
-- Table `faculty_innovations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `faculty_innovations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `faculty_name` VARCHAR(255) NOT NULL,
  `innovation_type` VARCHAR(100) NULL COMMENT 'Teaching, Learning, Research, etc.',
  `implementation_date` DATE NULL,
  `impact_description` TEXT NULL,
  `document_url` VARCHAR(500) NULL,
  `image_url` VARCHAR(500) NULL,
  `dept` VARCHAR(32) NOT NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_innovation_type` (`innovation_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `research_centers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `research_centers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `center_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `established_year` YEAR NULL,
  `recognition_body` VARCHAR(255) NULL COMMENT 'JNTUK, AICTE, UGC, etc.',
  `head_of_center` VARCHAR(255) NULL,
  `research_areas` TEXT NULL,
  `facilities` TEXT NULL,
  `achievements` TEXT NULL,
  `contact_email` VARCHAR(255) NULL,
  `contact_phone` VARCHAR(20) NULL,
  `website_url` VARCHAR(500) NULL,
  `image_url` VARCHAR(500) NULL,
  `dept` VARCHAR(32) NOT NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `product_development`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_development` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `development_team` TEXT NULL COMMENT 'Faculty and student names involved',
  `development_period` VARCHAR(100) NULL,
  `technology_used` TEXT NULL,
  `application_area` VARCHAR(255) NULL,
  `current_status` VARCHAR(100) NULL COMMENT 'Prototype, Testing, Production, etc.',
  `funding_source` VARCHAR(255) NULL,
  `funding_amount` DECIMAL(15,2) NULL,
  `patent_status` VARCHAR(100) NULL,
  `publication_details` TEXT NULL,
  `awards_recognition` TEXT NULL,
  `document_url` VARCHAR(500) NULL,
  `image_url` VARCHAR(500) NULL,
  `dept` VARCHAR(32) NOT NULL,
  `status` ENUM('active', 'inactive', 'completed') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_current_status` (`current_status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `departmental_activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `departmental_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `activity_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `activity_type` VARCHAR(100) NULL COMMENT 'Seminar, Conference, Workshop, Competition, etc.',
  `date_from` DATE NULL,
  `date_to` DATE NULL,
  `venue` VARCHAR(255) NULL,
  `organizer` VARCHAR(255) NULL,
  `coordinator` VARCHAR(255) NULL,
  `participants_count` INT NULL,
  `target_audience` VARCHAR(255) NULL COMMENT 'Students, Faculty, Industry, etc.',
  `outcomes` TEXT NULL,
  `feedback_summary` TEXT NULL,
  `budget` DECIMAL(15,2) NULL,
  `sponsors` TEXT NULL,
  `document_url` VARCHAR(500) NULL,
  `image_url` VARCHAR(500) NULL,
  `gallery_urls` JSON NULL,
  `dept` VARCHAR(32) NOT NULL,
  `status` ENUM('planned', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'planned',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_activity_type` (`activity_type` ASC),
  INDEX `idx_date_from` (`date_from` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `green_initiatives`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `green_initiatives` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `initiative_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `initiative_type` VARCHAR(100) NULL COMMENT 'Energy Conservation, Waste Management, Tree Plantation, etc.',
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `coordinator` VARCHAR(255) NULL,
  `participants` TEXT NULL,
  `impact_metrics` TEXT NULL COMMENT 'Energy saved, waste reduced, trees planted, etc.',
  `environmental_benefit` TEXT NULL,
  `cost_savings` DECIMAL(15,2) NULL,
  `recognition_received` TEXT NULL,
  `future_plans` TEXT NULL,
  `document_url` VARCHAR(500) NULL,
  `image_url` VARCHAR(500) NULL,
  `gallery_urls` JSON NULL,
  `dept` VARCHAR(32) NOT NULL,
  `status` ENUM('active', 'completed', 'planned') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_initiative_type` (`initiative_type` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `technical_magazines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `technical_magazines` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `magazine_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `magazine_type` VARCHAR(100) NULL COMMENT 'Magazine, Handbook, Course Material, Newsletter',
  `volume_number` VARCHAR(50) NULL,
  `issue_number` VARCHAR(50) NULL,
  `publication_date` DATE NULL,
  `editor_in_chief` VARCHAR(255) NULL,
  `editorial_team` TEXT NULL,
  `contributors` TEXT NULL,
  `topics_covered` TEXT NULL,
  `target_audience` VARCHAR(255) NULL,
  `pages_count` INT NULL,
  `print_copies` INT NULL,
  `digital_copies` INT NULL,
  `issn_number` VARCHAR(50) NULL,
  `download_url` VARCHAR(500) NULL,
  `cover_image_url` VARCHAR(500) NULL,
  `dept` VARCHAR(32) NOT NULL,
  `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_magazine_type` (`magazine_type` ASC),
  INDEX `idx_publication_date` (`publication_date` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;