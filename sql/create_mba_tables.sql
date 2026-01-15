-- Create MBA department tables based on CAI table structures
-- Run this script to create all necessary MBA tables for dynamic field support
-- Tables follow the pattern: mba_{module_name}

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Table: mba_faculty (based on cai_faculty)
CREATE TABLE IF NOT EXISTS `mba_faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_bos_members (Board of Studies Members)
CREATE TABLE IF NOT EXISTS `mba_bos_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `member_type` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_board_of_studies (Board of Studies)
CREATE TABLE IF NOT EXISTS `mba_board_of_studies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `meeting_date` date DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_bos_minutes (Board of Studies Minutes)
CREATE TABLE IF NOT EXISTS `mba_bos_minutes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `meeting_date` date DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_department_library
CREATE TABLE IF NOT EXISTS `mba_department_library` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `publication_year` varchar(10) DEFAULT NULL,
  `available_copies` int DEFAULT 1,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_department_overview
CREATE TABLE IF NOT EXISTS `mba_department_overview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `section_type` varchar(50) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_eresources (E-Resources)
CREATE TABLE IF NOT EXISTS `mba_eresources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `resource_type` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_extra_curricular (Extra Curricular Activities)
CREATE TABLE IF NOT EXISTS `mba_extra_curricular` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `coordinator` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_faculty_achievements
CREATE TABLE IF NOT EXISTS `mba_faculty_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `faculty_name` varchar(100) NOT NULL,
  `achievement_title` varchar(255) NOT NULL,
  `achievement_type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date_achieved` date DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_faculty_development
CREATE TABLE IF NOT EXISTS `mba_faculty_development` (
  `id` int NOT NULL AUTO_INCREMENT,
  `program_title` varchar(255) NOT NULL,
  `faculty_name` varchar(100) DEFAULT NULL,
  `program_type` varchar(100) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `certificate_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_hackathons (based on cai_hackathons)
CREATE TABLE IF NOT EXISTS `mba_hackathons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `academic_year` varchar(20) DEFAULT '2024-25',
  `dept` varchar(100) DEFAULT 'mba',
  `brochure_url` varchar(500) DEFAULT NULL,
  `winners_url` varchar(500) DEFAULT NULL,
  `gallery` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: mba_handbooks
CREATE TABLE IF NOT EXISTS `mba_handbooks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `handbook_type` varchar(100) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_industry_programs
CREATE TABLE IF NOT EXISTS `mba_industry_programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `program_title` varchar(255) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `program_type` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `participants_count` int DEFAULT NULL,
  `description` text DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_merit_scholarships (based on cai_merit_scholarships pattern)
CREATE TABLE IF NOT EXISTS `mba_merit_scholarships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch` varchar(20) NOT NULL COMMENT 'Batch year (e.g., 2024-25)',
  `academic_year` varchar(10) NOT NULL COMMENT 'Academic year in YYYY-YY format',
  `particulars` varchar(255) DEFAULT NULL COMMENT 'Details or description of the scholarship',
  `students_benefited` int DEFAULT NULL COMMENT 'Number of students who benefited',
  `scholarship_amount` decimal(10, 2) DEFAULT NULL COMMENT 'Scholarship amount in rupees',
  `gallery` json DEFAULT NULL COMMENT 'JSON array of gallery image URLs',
  `dept` varchar(20) NOT NULL DEFAULT 'mba' COMMENT 'Department code',
  `status` varchar(20) NOT NULL DEFAULT 'active' COMMENT 'Record status (active/inactive)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_batch` (`batch`),
  KEY `idx_academic_year` (`academic_year`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_mous (MOUs - based on cai_mous)
CREATE TABLE IF NOT EXISTS `mba_mous` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `dept` VARCHAR(50) NOT NULL DEFAULT 'mba',
  `s_no` INT NOT NULL,
  `organization_name` VARCHAR(255) NOT NULL,
  `from_date` VARCHAR(50) NOT NULL,
  `to_date` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Active',
  `document_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dept (dept),
  UNIQUE KEY unique_mou (dept, organization_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_newsletters
CREATE TABLE IF NOT EXISTS `mba_newsletters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `issue_number` varchar(50) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_non_teaching_faculty
CREATE TABLE IF NOT EXISTS `mba_non_teaching_faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_physical_facilities
CREATE TABLE IF NOT EXISTS `mba_physical_facilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facility_name` varchar(255) NOT NULL,
  `facility_type` varchar(100) DEFAULT NULL,
  `capacity` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `equipment_details` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_placements
CREATE TABLE IF NOT EXISTS `mba_placements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(100) NOT NULL,
  `batch` varchar(20) DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `package_offered` decimal(10, 2) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `placement_date` date DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_placement_reports (for yearly placement reports)
CREATE TABLE IF NOT EXISTS `mba_placement_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `academic_year` varchar(20) NOT NULL,
  `report_title` varchar(255) DEFAULT NULL,
  `report_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_sahaya_events (Community Events)
CREATE TABLE IF NOT EXISTS `mba_sahaya_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `participants_count` int DEFAULT NULL,
  `coordinator` varchar(100) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_scud_activities (SCUD Club Activities)
CREATE TABLE IF NOT EXISTS `mba_scud_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(255) NOT NULL,
  `activity_type` varchar(100) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `coordinator` varchar(100) DEFAULT NULL,
  `participants_count` int DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_student_achievements
CREATE TABLE IF NOT EXISTS `mba_student_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(100) NOT NULL,
  `achievement_title` varchar(255) NOT NULL,
  `achievement_type` varchar(100) DEFAULT NULL,
  `batch` varchar(20) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `date_achieved` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `certificate_url` varchar(500) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_syllabus
CREATE TABLE IF NOT EXISTS `mba_syllabus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(255) NOT NULL,
  `course_code` varchar(50) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `syllabus_type` varchar(50) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_technical_faculty
CREATE TABLE IF NOT EXISTS `mba_technical_faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: mba_training_activities
CREATE TABLE IF NOT EXISTS `mba_training_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `training_title` varchar(255) NOT NULL,
  `training_type` varchar(100) DEFAULT NULL,
  `trainer_name` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `participants_count` int DEFAULT NULL,
  `description` text DEFAULT NULL,
  `certificate_url` varchar(500) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- Verification queries (uncomment to run after table creation)
-- SHOW TABLES LIKE 'mba_%';
-- SELECT COUNT(*) as total_mba_tables FROM information_schema.tables WHERE table_name LIKE 'mba_%';

COMMIT;