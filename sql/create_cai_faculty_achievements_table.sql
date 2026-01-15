-- Create cai_faculty_achievements table for CSE-AI department faculty achievements
CREATE TABLE IF NOT EXISTS `cai_faculty_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  `achievement_date` date DEFAULT NULL,
  `faculty_name` varchar(100) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data for testing
INSERT INTO `cai_faculty_achievements` (`title`, `description`, `category`, `achievement_date`, `faculty_name`, `status`) VALUES
('Best Paper Award at International Conference', 'Research paper on AI algorithms won best paper award', 'Research', '2024-01-15', 'Dr. John Smith', 'active'),
('Outstanding Faculty Award', 'Recognition for excellence in teaching and research', 'Teaching', '2024-02-20', 'Dr. Jane Doe', 'active'),
('Research Grant Received', 'Secured government funding for AI research project', 'Research', '2024-03-10', 'Prof. Mike Johnson', 'active'),
('Industry Collaboration Success', 'Led successful industry partnership project', 'Industry', '2024-04-05', 'Dr. Sarah Wilson', 'active');