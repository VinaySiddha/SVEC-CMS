-- Faculty Profiles Table
CREATE TABLE IF NOT EXISTS faculty_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    qualification VARCHAR(255),
    designation VARCHAR(255),
    profile_url VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(20),
    experience_years INT DEFAULT 0,
    specialization TEXT,
    bio TEXT,
    research_interests TEXT,
    publications TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_status (status),
    INDEX idx_deleted (deleted_at)
);

-- Add foreign key constraint if users table exists
-- ALTER TABLE faculty_profiles 
-- ADD CONSTRAINT fk_faculty_created_by 
-- FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;

-- Sample data
INSERT IGNORE INTO faculty_profiles (
    id, dept, name, qualification, designation, profile_url, status
) VALUES 
(1, 'cse', 'Dr. John Smith', 'Ph.D. Computer Science', 'Professor', '/uploads/cse/faculty_profiles/sample1.jpg', 'approved'),
(2, 'cse', 'Dr. Jane Doe', 'Ph.D. Artificial Intelligence', 'Associate Professor', '/uploads/cse/faculty_profiles/sample2.jpg', 'approved'),
(3, 'ece', 'Dr. Robert Johnson', 'Ph.D. Electronics', 'Professor', '/uploads/ece/faculty_profiles/sample3.jpg', 'approved'),
(4, 'eee', 'Dr. Sarah Williams', 'Ph.D. Electrical Engineering', 'Assistant Professor', '/uploads/eee/faculty_profiles/sample4.jpg', 'pending');