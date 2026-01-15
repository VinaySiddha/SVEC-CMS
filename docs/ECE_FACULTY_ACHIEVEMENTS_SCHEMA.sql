-- ECE Faculty Achievements Table Schema

CREATE TABLE IF NOT EXISTS ece_faculty_achievements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(50) NOT NULL,
  year VARCHAR(4) NOT NULL,
  title VARCHAR(500) NOT NULL,
  url VARCHAR(500),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_type (type),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for ECE Faculty Achievements
INSERT INTO ece_faculty_achievements (type, year, title, url, details) VALUES
-- Journal Publications
('journal_publication', '2024', 'AI-based Signal Processing in Communication Systems', 'https://doi.org/10.1234/example', 'Published in IEEE Transactions on Communications'),
('journal_publication', '2024', 'Advanced VLSI Design Methodologies', 'https://doi.org/10.1234/example2', 'Published in Journal of Semiconductor Technology'),
('journal_publication', '2023', 'Embedded Systems for IoT Applications', 'https://doi.org/10.1234/example3', 'Published in IoT Journal'),

-- Conference Publications
('conference_publication', '2024', 'Machine Learning in Power Systems', 'https://example.com/conf1', 'Presented at International Conference on Power Electronics'),
('conference_publication', '2024', 'Network Security in 5G Networks', 'https://example.com/conf2', 'Presented at IEEE ComSoc Conference'),
('conference_publication', '2023', 'Antenna Design for Wireless Communications', 'https://example.com/conf3', 'Presented at AP-RASC 2023'),

-- Book Publications
('book_publication', '2023', 'Digital Signal Processing: Theory and Applications', 'https://example.com/book1', 'Published by Springer'),
('book_publication', '2022', 'VLSI Circuit Design and Optimization', 'https://example.com/book2', 'Published by Wiley'),

-- Certifications
('certification', '2024', 'Advanced Embedded Systems Design', 'https://example.com/cert1', 'Certified by IEEE'),
('certification', '2024', 'FPGA Programming and Design', 'https://example.com/cert2', 'Certified by Xilinx'),
('certification', '2023', 'IoT and Cloud Computing', 'https://example.com/cert3', 'Certified by AWS'),

-- Patents
('patent', '2024', 'Novel Signal Processing Algorithm for Communication Systems', 'US Patent 12345678', 'Filed with USPTO'),
('patent', '2023', 'VLSI Circuit Architecture for Low Power Applications', 'IN Patent 98765432', 'Filed with Indian Patent Office'),

-- Awards
('award', '2024', 'Best Faculty Research Award - ECE', 'https://example.com/award1', 'Awarded by SVEC'),
('award', '2023', 'IEEE Outstanding Engineer Award', 'https://example.com/award2', 'Awarded by IEEE'),
('award', '2023', 'Best Paper Award at International Conference', 'https://example.com/award3', 'Presented at ICCAD 2023'),

-- Memberships
('membership', '2024', 'IEEE Senior Member', 'https://example.com/ieee', 'Active membership since 2015'),
('membership', '2024', 'ACM Professional Member', 'https://example.com/acm', 'Active membership since 2018'),
('membership', '2023', 'Institution of Engineers Member', 'https://example.com/ioe', 'Active membership since 2016'),

-- Outreach
('outreach', '2024', 'Industrial Training Program for Students', 'https://example.com/training', 'Conducted 2-week training program with 50 students'),
('outreach', '2024', 'Workshop on Modern Communication Systems', 'https://example.com/workshop', 'Conducted for 100+ participants'),
('outreach', '2023', 'Guest Lecture Series at Partner Institutions', 'https://example.com/lecture', 'Delivered 5 lectures across different colleges'),

-- Promotion & Incentives
('promotion_incentive', '2024', 'Promotion to Professor', '', 'Promoted on merit basis'),
('promotion_incentive', '2023', 'Research Grant Award - 5 Lakhs', '', 'Granted for ongoing research project'),
('promotion_incentive', '2023', 'Academic Excellence Incentive', '', 'Recognized for excellent teaching');
