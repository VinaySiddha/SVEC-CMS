-- ECE Hackathons Gallery Table Schema

CREATE TABLE IF NOT EXISTS ece_hackathons_gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(300) NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(100),
  description TEXT,
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for ECE Hackathons Gallery with technical association category
INSERT INTO ece_hackathons_gallery (title, image_url, category, description, year) VALUES
-- Technical Association
('VEDA Technical Hackathon 2024', '/uploads/ece/hackathon-2024-01.jpg', 'technical association', 'Annual technical hackathon event organized by VEDA', '2024'),
('VEDA Technical Hackathon 2024 - Team Presentations', '/uploads/ece/hackathon-2024-02.jpg', 'technical association', 'Teams presenting innovative solutions', '2024'),
('VEDA Technical Hackathon 2024 - Prizes Distribution', '/uploads/ece/hackathon-2024-03.jpg', 'technical association', 'Winners receiving awards and recognition', '2024'),
('IETE Student Chapter Workshop 2024', '/uploads/ece/iete-workshop-01.jpg', 'technical association', 'IETE Student Chapter workshop event', '2024'),
('IETE Student Chapter Workshop 2024 - Hands-on Session', '/uploads/ece/iete-workshop-02.jpg', 'technical association', 'Hands-on practical training session', '2024'),
('TECKVEDA 2023 Hackathon', '/uploads/ece/teckveda-2023-01.jpg', 'technical association', 'Technical association event 2023', '2023'),
('TECKVEDA 2023 - Team Work', '/uploads/ece/teckveda-2023-02.jpg', 'technical association', 'Students collaborating on projects', '2023'),
('VEDA Training Session', '/uploads/ece/veda-training-01.jpg', 'technical association', 'Technical training organized by VEDA', '2023'),
('Signal Processing Workshop', '/uploads/ece/signal-processing-01.jpg', 'technical association', 'Workshop on signal processing techniques', '2023'),
('Embedded Systems Demonstration', '/uploads/ece/embedded-systems-01.jpg', 'technical association', 'Live demonstration of embedded systems projects', '2023'),
-- Other categories (optional)
('Hackathon Category Event 1', '/uploads/ece/hack-other-01.jpg', 'hackathon', 'General hackathon event', '2024'),
('Hackathon Category Event 2', '/uploads/ece/hack-other-02.jpg', 'hackathon', 'Coding competition event', '2024');
