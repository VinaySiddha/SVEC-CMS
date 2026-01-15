-- Create cai_faculty table for CSE-AI department teaching faculty
CREATE TABLE IF NOT EXISTS `cai_faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data if table is empty (optional)
-- You can uncomment and modify as needed
-- INSERT INTO `cai_faculty` (`name`, `qualification`, `designation`, `profile_url`, `status`) VALUES
-- ('Dr. Sample Faculty', 'Ph.D', 'Professor', 'https://example.com/profile1', 'active'),
-- ('Prof. Another Faculty', 'M.Tech', 'Associate Professor', 'https://example.com/profile2', 'active');
