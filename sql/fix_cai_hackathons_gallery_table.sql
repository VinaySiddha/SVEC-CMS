-- Fix the cai_hackathons_gallery table structure
-- This script ensures the table exists with proper AUTO_INCREMENT

-- Drop table if exists to recreate with proper structure
DROP TABLE IF EXISTS `cai_hackathons_gallery`;

-- Create the table with proper AUTO_INCREMENT
CREATE TABLE `cai_hackathons_gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept` varchar(100) DEFAULT 'cse-ai',
  `academic_year` varchar(20) DEFAULT '2024-25',
  `gallery` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data if needed
-- INSERT INTO `cai_hackathons_gallery` (`dept`, `academic_year`, `gallery`) VALUES 
-- ('cse-ai', '2024-25', 'sample-image.jpg'),
-- ('cse-ai', '2023-24', 'another-image.jpg');