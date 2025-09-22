CREATE TABLE IF NOT EXISTS student_achievements (
id INT AUTO_INCREMENT PRIMARY KEY, 
dept VARCHAR(50) NOT NULL, 
type ENUM('Internship','Certifications','Student Research Projects','Competitions','Sports','Other') NOT NULL,
title VARCHAR(255) NOT NULL,
name VARCHAR(100) NOT NULL, 
roll_number VARCHAR(20) NOT NULL,
program ENUM('btech','mtech','na') DEFAULT 'na',
cgpa DECIMAL(4,2),
score VARCHAR(50),
guide_name VARCHAR(100),
batch VARCHAR(20),
proof_url VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
