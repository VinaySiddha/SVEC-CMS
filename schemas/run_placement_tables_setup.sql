-- Execute these SQL queries to create the placement tables

-- Create placements table
CREATE TABLE IF NOT EXISTS placements (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    dept VARCHAR(50) NOT NULL, 
    academic_year VARCHAR(20) NOT NULL,
    total_offers INT NOT NULL,
    highest_package DECIMAL(10,2) NOT NULL,
    average_package DECIMAL(10,2) NOT NULL,
    report_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create placement_gallery table
CREATE TABLE IF NOT EXISTS placement_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    dept VARCHAR(50) NOT NULL, 
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data for placements (optional)
INSERT INTO placements (dept, academic_year, total_offers, highest_package, average_package, report_url)
VALUES 
('cse', '2023-2024', 120, 25.5, 8.75, NULL),
('cse', '2022-2023', 105, 22.0, 7.8, NULL),
('ece', '2023-2024', 85, 18.5, 6.9, NULL);

-- Sample data for placement_gallery (optional)
INSERT INTO placement_gallery (dept, title, image_url, caption)
VALUES 
('cse', 'Campus Recruitment Drive 2024', '/uploads/placement-gallery/sample1.jpg', 'Students during placement interviews'),
('cse', 'TCS Recruitment', '/uploads/placement-gallery/sample2.jpg', 'Technical assessment session'),
('ece', 'Placement Orientation', '/uploads/placement-gallery/sample3.jpg', 'Orientation session for final year students');
