-- Ensure the cai_hackathons table exists with proper structure
-- This table stores the main hackathon events

-- Create table if not exists
CREATE TABLE IF NOT EXISTS `cai_hackathons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `academic_year` varchar(20) DEFAULT '2024-25',
  `dept` varchar(100) DEFAULT 'cse-ai',
  `brochure_url` varchar(500) DEFAULT NULL,
  `winners_url` varchar(500) DEFAULT NULL,
  `gallery` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing
-- INSERT INTO `cai_hackathons` (`title`, `academic_year`, `dept`, `description`) VALUES 
-- ('AI Innovation Challenge 2024', '2024-25', 'cse-ai', 'Annual AI hackathon for students'),
-- ('Machine Learning Marathon 2023', '2023-24', 'cse-ai', 'ML focused coding competition');