-- Placement Events Table Schema
CREATE TABLE IF NOT EXISTS placement_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  circular_url VARCHAR(500) COMMENT 'PDF file URL for circular',
  link VARCHAR(500) COMMENT 'External link (e.g., job portal, registration form)',
  guidelines_url VARCHAR(500) COMMENT 'PDF file URL for guidelines',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
INSERT INTO placement_events (title, circular_url, link, guidelines_url) VALUES 
('TCS Recruitment Drive', '/uploads/placement_events/tcs_circular.pdf', 'https://tcs.com/careers', '/uploads/placement_events/tcs_guidelines.pdf'),
('Infosys Hiring', '/uploads/placement_events/infosys_circular.pdf', 'https://infosys.com/jobs', '/uploads/placement_events/infosys_guidelines.pdf');
