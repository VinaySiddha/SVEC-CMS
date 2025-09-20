-- Complete CSEAI Dynamic Content Tables
-- This creates tables for ALL static content in CSEAI.tsx

-- Table for department information sections (Vision, Mission, PEOs, etc.)
CREATE TABLE IF NOT EXISTS `department_info_sections` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `section_name` VARCHAR(100) NOT NULL,
  `section_title` VARCHAR(200) NOT NULL,
  `section_content` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_dept_section` (`department`, `section_name`),
  INDEX `idx_department` (`department`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for student achievements
CREATE TABLE IF NOT EXISTS `student_achievements` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `student_name` VARCHAR(100) NULL,
  `student_roll_no` VARCHAR(20) NULL,
  `academic_year` VARCHAR(20) NULL,
  `achievement_date` DATE NULL,
  `document_url` VARCHAR(500) NULL,
  `image_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_category` (`category`),
  INDEX `idx_academic_year` (`academic_year`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for faculty development programs
CREATE TABLE IF NOT EXISTS `faculty_development_programs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `program_title` VARCHAR(200) NOT NULL,
  `program_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `faculty_name` VARCHAR(100) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `duration` VARCHAR(50) NULL,
  `institution` VARCHAR(200) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_program_type` (`program_type`),
  INDEX `idx_faculty_name` (`faculty_name`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for faculty achievements
CREATE TABLE IF NOT EXISTS `faculty_achievements` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `faculty_name` VARCHAR(100) NOT NULL,
  `achievement_type` VARCHAR(100) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `achievement_date` DATE NULL,
  `awarding_body` VARCHAR(200) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_faculty_name` (`faculty_name`),
  INDEX `idx_achievement_type` (`achievement_type`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for workshops
CREATE TABLE IF NOT EXISTS `workshops` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `workshop_title` VARCHAR(200) NOT NULL,
  `workshop_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `organizer` VARCHAR(200) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `venue` VARCHAR(200) NULL,
  `participants_count` INT NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_workshop_type` (`workshop_type`),
  INDEX `idx_start_date` (`start_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for merit scholarships and academic toppers
CREATE TABLE IF NOT EXISTS `merit_scholarships` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `student_name` VARCHAR(100) NOT NULL,
  `student_roll_no` VARCHAR(20) NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `semester` VARCHAR(20) NULL,
  `achievement_type` VARCHAR(100) NOT NULL,
  `cgpa` DECIMAL(3,2) NULL,
  `rank` INT NULL,
  `scholarship_amount` DECIMAL(10,2) NULL,
  `awarding_body` VARCHAR(200) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_academic_year` (`academic_year`),
  INDEX `idx_achievement_type` (`achievement_type`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for extra-curricular activities
CREATE TABLE IF NOT EXISTS `extra_curricular_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `activity_name` VARCHAR(200) NOT NULL,
  `activity_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `organizer` VARCHAR(200) NULL,
  `participants` TEXT NULL,
  `event_date` DATE NULL,
  `venue` VARCHAR(200) NULL,
  `image_url` VARCHAR(500) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_activity_type` (`activity_type`),
  INDEX `idx_event_date` (`event_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for technical association activities
CREATE TABLE IF NOT EXISTS `technical_association_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `activity_name` VARCHAR(200) NOT NULL,
  `activity_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `organizer` VARCHAR(200) NULL,
  `participants` TEXT NULL,
  `event_date` DATE NULL,
  `venue` VARCHAR(200) NULL,
  `image_url` VARCHAR(500) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_activity_type` (`activity_type`),
  INDEX `idx_event_date` (`event_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for newsletters
CREATE TABLE IF NOT EXISTS `newsletters` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `newsletter_title` VARCHAR(200) NOT NULL,
  `issue_number` VARCHAR(50) NULL,
  `publication_date` DATE NULL,
  `description` TEXT NULL,
  `document_url` VARCHAR(500) NOT NULL,
  `cover_image_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_publication_date` (`publication_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for hackathons
CREATE TABLE IF NOT EXISTS `hackathons` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `hackathon_name` VARCHAR(200) NOT NULL,
  `theme` VARCHAR(200) NULL,
  `description` TEXT NULL,
  `organizer` VARCHAR(200) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `venue` VARCHAR(200) NULL,
  `participants_count` INT NULL,
  `prize_amount` DECIMAL(10,2) NULL,
  `image_url` VARCHAR(500) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_start_date` (`start_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for training activities
CREATE TABLE IF NOT EXISTS `training_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `training_title` VARCHAR(200) NOT NULL,
  `training_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `trainer` VARCHAR(200) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `duration` VARCHAR(50) NULL,
  `venue` VARCHAR(200) NULL,
  `participants_count` INT NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_training_type` (`training_type`),
  INDEX `idx_start_date` (`start_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for physical facilities
CREATE TABLE IF NOT EXISTS `physical_facilities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `facility_name` VARCHAR(200) NOT NULL,
  `facility_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `capacity` INT NULL,
  `area_sqft` DECIMAL(8,2) NULL,
  `equipment_details` TEXT NULL,
  `image_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_facility_type` (`facility_type`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for department library
CREATE TABLE IF NOT EXISTS `department_library` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `library_name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `total_books` INT NULL,
  `journals_count` INT NULL,
  `digital_resources` TEXT NULL,
  `seating_capacity` INT NULL,
  `working_hours` VARCHAR(100) NULL,
  `image_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for board of studies
CREATE TABLE IF NOT EXISTS `board_of_studies` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `meeting_title` VARCHAR(200) NOT NULL,
  `meeting_date` DATE NULL,
  `meeting_number` VARCHAR(50) NULL,
  `description` TEXT NULL,
  `document_url` VARCHAR(500) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_meeting_date` (`meeting_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for contact information
CREATE TABLE IF NOT EXISTS `department_contact` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `contact_type` VARCHAR(100) NOT NULL,
  `contact_name` VARCHAR(100) NULL,
  `designation` VARCHAR(100) NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(100) NULL,
  `office_location` VARCHAR(200) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_contact_type` (`contact_type`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
