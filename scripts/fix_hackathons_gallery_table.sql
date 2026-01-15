-- Fix cai_hackathons_gallery table AUTO_INCREMENT issue
-- This script ensures the table has proper AUTO_INCREMENT setup

-- Drop and recreate the table to ensure proper structure
DROP TABLE IF EXISTS `cai_hackathons_gallery`;

CREATE TABLE `cai_hackathons_gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dept` varchar(20) NOT NULL DEFAULT 'cse-ai',
  `academic_year` varchar(20) NOT NULL,
  `gallery` varchar(255) DEFAULT NULL COMMENT 'Single image URL per row (max 255 chars)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_dept_year` (`dept`, `academic_year`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Gallery images for hackathon events - one image per row';

-- Insert sample data
INSERT INTO `cai_hackathons_gallery` (`dept`, `academic_year`, `gallery`) VALUES
('cse-ai', '2023-24', '/uploads/hackathons/gallery/hackathon-2023-img1.jpg'),
('cse-ai', '2023-24', '/uploads/hackathons/gallery/hackathon-2023-img2.jpg'),
('cse-ai', '2024-25', '/uploads/hackathons/gallery/hackathon-2024-img1.jpg'),
('cse-ai', '2024-25', '/uploads/hackathons/gallery/hackathon-2024-img2.jpg');

-- Verify the table structure
DESCRIBE `cai_hackathons_gallery`;