-- Civil Department Dynamic Content Tables
-- This creates tables for ALL static content in Civil.tsx

-- Insert Civil department sidebar items
INSERT INTO `department_sidebar_items` (`department`, `item_id`, `label`, `icon_name`, `display_order`) VALUES
('civil', 'Department Profile', 'Department Profile', 'Building', 1),
('civil', 'Faculty Profiles', 'Faculty Profiles', 'Users', 2),
('civil', 'Board of Studies', 'Board of Studies', 'Award', 3),
('civil', 'Physical Facilities', 'Physical Facilities', 'HardHat', 4),
('civil', 'Department Library', 'Department Library', 'Library', 5),
('civil', 'Workshops', 'Workshops', 'Presentation', 6),
('civil', 'R&D', 'R&D', 'Search', 7),
('civil', 'Faculty Achievements', 'Faculty Achievements', 'Trophy', 8),
('civil', 'Student Achievements', 'Student Achievements', 'Award', 9),
('civil', 'Placements', 'Placements', 'Briefcase', 10),
('civil', 'Technical Association', 'Technical Association', 'Activity', 11),
('civil', 'Newsletters', 'Newsletters', 'Rss', 12),
('civil', 'Extra-Curricular Activities', 'Extra-Curricular Activities', 'Activity', 13),
('civil', 'Research Projects', 'Research Projects', 'Search', 14),
('civil', 'Syllabus', 'Syllabus', 'BookOpen', 15),
('civil', 'Consultancy', 'Consultancy', 'Handshake', 16),
('civil', 'Contact', 'Contact', 'Phone', 17)
ON DUPLICATE KEY UPDATE 
`label` = VALUES(`label`),
`icon_name` = VALUES(`icon_name`),
`display_order` = VALUES(`display_order`);

-- Table for Civil department information sections (Vision, Mission, PEOs, etc.)
INSERT INTO `department_info_sections` (`department`, `section_name`, `section_title`, `section_content`, `display_order`) VALUES
('civil', 'Vision', 'Vision', 'To emerge as a centre of excellence in Civil Engineering education, research and consultancy with focus on sustainable development and innovation.', 1),
('civil', 'Mission', 'Mission', 'M1: To provide quality education in Civil Engineering with emphasis on practical skills and modern technology.<br>M2: To promote research and development activities for solving real-world problems.<br>M3: To foster industry-academia collaboration for enhanced learning and career opportunities.<br>M4: To develop ethical professionals with leadership qualities and social responsibility.', 2),
('civil', 'PEOs', 'Program Educational Objectives (PEOs)', 'PEO1: Graduates will have successful careers in Civil Engineering or related fields.<br>PEO2: Graduates will demonstrate professional growth through continuous learning and professional development.<br>PEO3: Graduates will contribute to society through ethical practice and sustainable engineering solutions.', 3),
('civil', 'POs', 'Program Outcomes (POs)', 'PO1: Engineering knowledge: Apply knowledge of mathematics, science, engineering fundamentals.<br>PO2: Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems.<br>PO3: Design/development of solutions: Design solutions for complex engineering problems and design system components or processes.<br>PO4: Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.', 4),
('civil', 'PSOs', 'Program Specific Outcomes (PSOs)', 'PSO1: Apply fundamental knowledge of Civil Engineering to analyze and design infrastructure systems.<br>PSO2: Use modern tools and software for Civil Engineering applications and project management.<br>PSO3: Demonstrate professional and ethical responsibilities in Civil Engineering practice.', 5),
('civil', 'COs', 'Course Outcomes (COs)', 'Students will be able to:<br>CO1: Understand fundamental concepts of Civil Engineering.<br>CO2: Apply engineering principles to solve real-world problems.<br>CO3: Use modern tools and techniques in Civil Engineering practice.<br>CO4: Demonstrate professional and ethical behavior in engineering practice.', 6),
('civil', 'SalientFeatures', 'Salient Features', '• Well-equipped laboratories with modern instruments<br>• Experienced and qualified faculty members<br>• Industry-oriented curriculum<br>• Strong industry-academia collaboration<br>• Research and development activities<br>• Professional development programs', 7)
ON DUPLICATE KEY UPDATE 
`section_title` = VALUES(`section_title`),
`section_content` = VALUES(`section_content`),
`display_order` = VALUES(`display_order`);

-- Table for R&D activities (specific to Civil)
CREATE TABLE IF NOT EXISTS `research_development_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `activity_title` VARCHAR(200) NOT NULL,
  `activity_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `faculty_name` VARCHAR(100) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `funding_agency` VARCHAR(200) NULL,
  `funding_amount` DECIMAL(12,2) NULL,
  `status` VARCHAR(50) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_activity_type` (`activity_type`),
  INDEX `idx_faculty_name` (`faculty_name`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for research projects (specific to Civil)
CREATE TABLE IF NOT EXISTS `research_projects` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `project_title` VARCHAR(200) NOT NULL,
  `project_type` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `principal_investigator` VARCHAR(100) NULL,
  `co_investigators` TEXT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `funding_agency` VARCHAR(200) NULL,
  `funding_amount` DECIMAL(12,2) NULL,
  `status` VARCHAR(50) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_project_type` (`project_type`),
  INDEX `idx_principal_investigator` (`principal_investigator`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table for consultancy activities (specific to Civil)
CREATE TABLE IF NOT EXISTS `consultancy_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `department` VARCHAR(32) NOT NULL,
  `project_title` VARCHAR(200) NOT NULL,
  `client_name` VARCHAR(200) NULL,
  `description` TEXT NULL,
  `faculty_involved` TEXT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `project_value` DECIMAL(12,2) NULL,
  `project_type` VARCHAR(100) NULL,
  `document_url` VARCHAR(500) NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_department` (`department`),
  INDEX `idx_project_type` (`project_type`),
  INDEX `idx_start_date` (`start_date`),
  INDEX `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample Civil department data
INSERT INTO `research_development_activities` (`department`, `activity_title`, `activity_type`, `description`, `faculty_name`, `start_date`, `end_date`, `funding_agency`, `funding_amount`, `status`, `display_order`) VALUES
('civil', 'Sustainable Construction Materials Research', 'Research Project', 'Investigation of eco-friendly construction materials for sustainable development', 'Dr. G. Radhakrishnan', '2024-01-01', '2024-12-31', 'DST', 500000.00, 'Ongoing', 1),
('civil', 'Structural Health Monitoring', 'Research Project', 'Development of IoT-based structural health monitoring system', 'Mr. V.L.D Prasad Reddy', '2024-06-01', '2025-05-31', 'AICTE', 300000.00, 'Ongoing', 2),
('civil', 'Waste Management in Construction', 'Research Project', 'Study on effective waste management techniques in construction industry', 'Mr. J.Vijaya Chandra', '2023-01-01', '2024-12-31', 'UGC', 200000.00, 'Completed', 3)
ON DUPLICATE KEY UPDATE 
`activity_title` = VALUES(`activity_title`),
`description` = VALUES(`description`),
`faculty_name` = VALUES(`faculty_name`),
`funding_agency` = VALUES(`funding_agency`),
`funding_amount` = VALUES(`funding_amount`),
`status` = VALUES(`status`),
`display_order` = VALUES(`display_order`);

INSERT INTO `research_projects` (`department`, `project_title`, `project_type`, `description`, `principal_investigator`, `co_investigators`, `start_date`, `end_date`, `funding_agency`, `funding_amount`, `status`, `display_order`) VALUES
('civil', 'Smart Infrastructure Development', 'Sponsored Research', 'Development of smart infrastructure solutions for urban areas', 'Dr. G. Radhakrishnan', 'Mr. V.L.D Prasad Reddy, Mr. J.Vijaya Chandra', '2024-01-01', '2026-12-31', 'Ministry of Urban Development', 1000000.00, 'Ongoing', 1),
('civil', 'Green Building Technologies', 'Sponsored Research', 'Research on energy-efficient building materials and technologies', 'Mr. B.HemaSundar', 'Ms. B.Rohitha', '2024-03-01', '2025-02-28', 'Department of Science and Technology', 750000.00, 'Ongoing', 2),
('civil', 'Water Resource Management', 'Sponsored Research', 'Sustainable water resource management in rural areas', 'Mr. M.Prem Kumar Raju', 'Mr. K.Gowtham Kumar', '2023-06-01', '2024-05-31', 'Central Water Commission', 600000.00, 'Completed', 3)
ON DUPLICATE KEY UPDATE 
`project_title` = VALUES(`project_title`),
`description` = VALUES(`description`),
`principal_investigator` = VALUES(`principal_investigator`),
`co_investigators` = VALUES(`co_investigators`),
`funding_agency` = VALUES(`funding_agency`),
`funding_amount` = VALUES(`funding_amount`),
`status` = VALUES(`status`),
`display_order` = VALUES(`display_order`);

INSERT INTO `consultancy_activities` (`department`, `project_title`, `client_name`, `description`, `faculty_involved`, `start_date`, `end_date`, `project_value`, `project_type`, `display_order`) VALUES
('civil', 'Structural Design Consultancy', 'ABC Construction Ltd.', 'Structural design and analysis for commercial complex', 'Dr. G. Radhakrishnan, Mr. V.L.D Prasad Reddy', '2024-01-15', '2024-06-15', 250000.00, 'Structural Design', 1),
('civil', 'Quality Control Testing', 'XYZ Infrastructure Pvt Ltd', 'Material testing and quality control for highway project', 'Mr. J.Vijaya Chandra, Mr. B.HemaSundar', '2024-03-01', '2024-08-31', 180000.00, 'Material Testing', 2),
('civil', 'Environmental Impact Assessment', 'Green Energy Corp', 'EIA for renewable energy project', 'Mr. M.Prem Kumar Raju, Ms. Ch.Sumaja', '2024-02-01', '2024-07-31', 320000.00, 'Environmental Assessment', 3)
ON DUPLICATE KEY UPDATE 
`project_title` = VALUES(`project_title`),
`client_name` = VALUES(`client_name`),
`description` = VALUES(`description`),
`faculty_involved` = VALUES(`faculty_involved`),
`project_value` = VALUES(`project_value`),
`project_type` = VALUES(`project_type`),
`display_order` = VALUES(`display_order`);
