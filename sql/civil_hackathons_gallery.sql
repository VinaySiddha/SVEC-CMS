-- Create table for Civil Hackathons Gallery
-- This table stores gallery items for different facility types and hackathons

CREATE TABLE IF NOT EXISTS `civil_hackathons_gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dept` varchar(20) NOT NULL DEFAULT 'civil',
  `category` varchar(50) NOT NULL COMMENT 'labs, hackathon, etc.',
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `gallery` varchar(255) DEFAULT NULL COMMENT 'Single image URL or gallery reference',
  `academic_year` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_dept_category` (`dept`, `category`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Gallery items for civil department - laboratories, hackathons, etc.';

-- Insert sample data for laboratories
INSERT INTO `civil_hackathons_gallery` (`dept`, `category`, `name`, `description`, `gallery`) VALUES
('civil', 'labs', 'Structural Laboratory', 'Advanced structural testing facilities', '/uploads/civil/labs/structural-lab.jpg'),
('civil', 'labs', 'Geotechnical Laboratory', 'Soil mechanics and foundation testing', '/uploads/civil/labs/geotechnical-lab.jpg'),
('civil', 'labs', 'Materials Laboratory', 'Civil engineering materials testing', '/uploads/civil/labs/materials-lab.jpg');
