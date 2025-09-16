-- CSEAI Content Management Tables
-- Created for dynamic content management

-- Table for department sidebar navigation items
CREATE TABLE IF NOT EXISTS `department_sidebar_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `item_id` VARCHAR(100) NOT NULL,
  `label` VARCHAR(200) NOT NULL,
  `icon_name` VARCHAR(50) NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_dept_item` (`department`, `item_id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for placement batch information
CREATE TABLE IF NOT EXISTS `placement_batches` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `batch_name` VARCHAR(100) NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `document_url` VARCHAR(500) NULL,
  `document_title` VARCHAR(200) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_academic_year` (`academic_year`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for placement gallery images
CREATE TABLE IF NOT EXISTS `placement_gallery` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `batch_name` VARCHAR(100) NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(200) NULL,
  `student_roll_no` VARCHAR(20) NULL,
  `student_name` VARCHAR(100) NULL,
  `company_name` VARCHAR(100) NULL,
  `package_amount` DECIMAL(10,2) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_batch_name` (`batch_name`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for e-resources (study materials, PPTs, etc.)
CREATE TABLE IF NOT EXISTS `department_eresources` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `file_type` VARCHAR(50) NULL,
  `academic_year` VARCHAR(20) NULL,
  `semester` VARCHAR(20) NULL,
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

-- Insert default sidebar items for CSEAI department
INSERT INTO `department_sidebar_items` (`department`, `item_id`, `label`, `icon_name`, `display_order`) VALUES
('cseai', 'Department Profile', 'Department Profile', 'Building', 1),
('cseai', 'Faculty Profiles', 'Faculty Profiles', 'Users', 2),
('cseai', 'Board of Studies', 'Board of Studies', 'Award', 3),
('cseai', 'Syllabus', 'Syllabus', 'BookOpen', 4),
('cseai', 'Physical Facilities', 'Physical Facilities', 'HardHat', 5),
('cseai', 'Department Library', 'Department Library', 'Library', 6),
('cseai', 'MoUs', 'MoUs', 'Handshake', 7),
('cseai', 'Faculty Development Programs', 'Faculty Development Programs', 'TrendingUp', 8),
('cseai', 'Faculty Achievements', 'Faculty Achievements', 'Trophy', 9),
('cseai', 'Workshops', 'Workshops', 'Presentation', 10),
('cseai', 'Student Achievements', 'Student Achievements', 'Award', 11),
('cseai', 'Placements', 'Placements', 'Briefcase', 12),
('cseai', 'Merit Scholarship/Academic Toppers', 'Merit Scholarship/Academic Toppers', 'Trophy', 13),
('cseai', 'Technical Association', 'Technical Association', 'Cpu', 14),
('cseai', 'Training Activities', 'Training Activities', 'Activity', 15),
('cseai', 'Newsletters', 'Newsletters', 'Rss', 16),
('cseai', 'Extra-Curricular Activities', 'Extra-Curricular Activities', 'Activity', 17),
('cseai', 'Hackathons', 'Hackathons', 'Cpu', 18),
('cseai', 'e-Resources', 'e-Resources', 'Wifi', 19),
('cseai', 'Handbooks', 'Handbooks', 'FileText', 20),
('cseai', 'Contact', 'Contact', 'Phone', 21)
ON DUPLICATE KEY UPDATE 
`label` = VALUES(`label`),
`icon_name` = VALUES(`icon_name`),
`display_order` = VALUES(`display_order`);

-- Insert default placement batch data for CSEAI
INSERT INTO `placement_batches` (`department`, `batch_name`, `academic_year`, `document_url`, `document_title`, `display_order`) VALUES
('cseai', 'Placements for Batch 2021-25', '2021-25', 'https://srivasaviengg.ac.in/uploads/cst/2024-25 CST PLACEMENTSS.pdf', '2024-25 CST Placements', 1),
('cseai', 'Placements for Batch 2020-24', '2020-24', 'https://srivasaviengg.ac.in/uploads/cst/2020-24 CST PLACEMENTS DATA -23.7.2023.pdf', '2020-24 CST Placements Data', 2),
('cseai', 'Placements for Batch 2019-23', '2019-23', 'https://srivasaviengg.ac.in/uploads/cst/2019-23 CST PLACEMENTS DATA.pdf', '2019-23 CST Placements Data', 3)
ON DUPLICATE KEY UPDATE 
`document_url` = VALUES(`document_url`),
`document_title` = VALUES(`document_title`),
`display_order` = VALUES(`display_order`);

-- Insert placement gallery data
INSERT INTO `placement_gallery` (`department`, `batch_name`, `image_url`, `alt_text`, `student_roll_no`, `student_name`, `company_name`, `package_amount`, `display_order`) VALUES
('cseai', '2021-24', 'https://srivasaviengg.ac.in/images/placement/WhatsApp%20Image%202025-07-16%20at%2011.02.08%20AM.jpeg', 'Placements 2021-24', NULL, NULL, NULL, NULL, 1),
('cseai', '2019-23', 'https://srivasaviengg.ac.in/uploads/cst/pilla.jpeg', 'IBM 12 LPA - P. Jahnavi Sri Naidu', '19A81A0650', 'P. Jahnavi Sri Naidu', 'IBM', 12.00, 2),
('cseai', '2019-23', 'https://srivasaviengg.ac.in/images/departments/cst/cst placement.jpg', 'CST Placement - IBM', '19A81A0650', 'P. Jahnavi Sri Naidu', 'IBM', 12.00, 3)
ON DUPLICATE KEY UPDATE 
`image_url` = VALUES(`image_url`),
`alt_text` = VALUES(`alt_text`),
`student_roll_no` = VALUES(`student_roll_no`),
`student_name` = VALUES(`student_name`),
`company_name` = VALUES(`company_name`),
`package_amount` = VALUES(`package_amount`),
`display_order` = VALUES(`display_order`);
