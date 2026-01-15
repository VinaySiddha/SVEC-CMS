-- Migration script to create cai_academictoppers table
-- Run this on the svec_cms database

CREATE TABLE IF NOT EXISTS `cai_academictoppers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch` varchar(20) NOT NULL COMMENT 'Batch year (e.g., 2024-25)',
  `academic_year` varchar(10) NOT NULL COMMENT 'Academic year in YYYY-YY format',
  `particulars` varchar(255) DEFAULT NULL COMMENT 'Details or description of the achievement',
  `no_of_students_benefited` int DEFAULT NULL COMMENT 'Number of students who benefited',
  `scholarship_amount` decimal(10, 2) DEFAULT NULL COMMENT 'Scholarship amount in rupees',
  `gallery` json DEFAULT NULL COMMENT 'JSON array of gallery image URLs',
  `dept` varchar(20) NOT NULL DEFAULT 'cse-ai' COMMENT 'Department code',
  `status` varchar(20) NOT NULL DEFAULT 'active' COMMENT 'Record status (active/inactive)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_batch` (`batch`),
  KEY `idx_academic_year` (`academic_year`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data (optional)
INSERT INTO `cai_academictoppers` (
  `batch`, 
  `academic_year`, 
  `particulars`, 
  `no_of_students_benefited`, 
  `scholarship_amount`, 
  `gallery`, 
  `dept`, 
  `status`
) 
VALUES 
(
  '2024-25', 
  '2024-25', 
  'Academic Toppers', 
  17, 
  99500, 
  '[]', 
  'cse-ai', 
  'active'
),
(
  '2023-24', 
  '2023-24', 
  'Academic Toppers', 
  37, 
  40000, 
  '[]', 
  'cse-ai', 
  'active'
),
(
  '2022-23', 
  '2022-23', 
  'Academic Toppers', 
  37, 
  40000, 
  '[]', 
  'cse-ai', 
  'active'
);
