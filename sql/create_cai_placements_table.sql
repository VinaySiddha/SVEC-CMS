-- Migration script to create cai_placements table
-- Run this on the svec_cms database

CREATE TABLE IF NOT EXISTS `cai_placements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch` varchar(20) NOT NULL,
  `academic_year` varchar(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_url` varchar(500) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cse-ai',
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_batch` (`batch`),
  KEY `idx_academic_year` (`academic_year`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data (optional)
INSERT INTO `cai_placements` (`batch`, `academic_year`, `title`, `description`, `file_url`, `gallery`, `dept`, `status`) 
VALUES 
('2024', '2024-25', 'Placements Summary 2024', 'Final placement details for the 2024 batch', '/uploads/placements/2024-summary.pdf', '[]', 'cse-ai', 'active'),
('2023', '2023-24', 'Placements Summary 2023', 'Final placement details for the 2023 batch', '/uploads/placements/2023-summary.pdf', '[]', 'cse-ai', 'active');
