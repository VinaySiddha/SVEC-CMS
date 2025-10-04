-- Placement Management Database Schema
-- This script creates all necessary tables for placement data management

-- 1. Companies Table
CREATE TABLE IF NOT EXISTS companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    logo_url VARCHAR(500),
    website VARCHAR(255),
    industry VARCHAR(100),
    company_type ENUM('Product', 'Service', 'Startup', 'MNC', 'Government') DEFAULT 'Service',
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 2. Placement Statistics Table (Year-wise, Department-wise)
CREATE TABLE IF NOT EXISTS placement_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    academic_year VARCHAR(10) NOT NULL, -- e.g., '2024-25'
    department_code VARCHAR(10) NOT NULL, -- CE, ME, EEE, ECE, CSE, etc.
    department_name VARCHAR(100) NOT NULL,
    total_students INT NOT NULL DEFAULT 0,
    students_placed INT NOT NULL DEFAULT 0,
    placement_percentage DECIMAL(5,2) DEFAULT 0.00,
    highest_package DECIMAL(10,2) DEFAULT 0.00,
    lowest_package DECIMAL(10,2) DEFAULT 0.00,
    average_package DECIMAL(10,2) DEFAULT 0.00,
    median_package DECIMAL(10,2) DEFAULT 0.00,
    companies_visited INT DEFAULT 0,
    offers_received INT DEFAULT 0,
    multiple_offers INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_year_dept (academic_year, department_code)
);

-- 3. Enhanced Placements Table
CREATE TABLE IF NOT EXISTS placements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    batch VARCHAR(10) NOT NULL,
    company_id INT,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    job_type ENUM('Full-time', 'Internship', 'Part-time', 'Contract') DEFAULT 'Full-time',
    package DECIMAL(10,2),
    package_type ENUM('CTC', 'In-hand', 'Stipend') DEFAULT 'CTC',
    placement_date DATE,
    joining_date DATE,
    location VARCHAR(255),
    offer_letter_url VARCHAR(500),
    student_image_url VARCHAR(500),
    placement_type ENUM('Campus', 'Off-campus', 'Pool Campus') DEFAULT 'Campus',
    selection_process TEXT, -- JSON format storing process details
    cgpa DECIMAL(4,2),
    backlogs INT DEFAULT 0,
    status ENUM('pending', 'approved', 'rejected', 'joined', 'not_joined') DEFAULT 'pending',
    remarks TEXT,
    created_by INT, -- Admin user ID
    approved_by INT, -- Admin user ID
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL,
    INDEX idx_department (department_code),
    INDEX idx_academic_year (academic_year),
    INDEX idx_company (company_id),
    INDEX idx_status (status),
    INDEX idx_placement_date (placement_date)
);

-- 4. Placement Drive Details
CREATE TABLE IF NOT EXISTS placement_drives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    drive_name VARCHAR(255) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    drive_date DATE NOT NULL,
    registration_deadline DATE,
    eligible_departments JSON, -- Array of department codes
    minimum_cgpa DECIMAL(4,2) DEFAULT 0.00,
    maximum_backlogs INT DEFAULT 0,
    job_description TEXT,
    salary_range VARCHAR(100),
    bond_details TEXT,
    selection_process TEXT,
    venue VARCHAR(255),
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    total_registered INT DEFAULT 0,
    total_appeared INT DEFAULT 0,
    total_selected INT DEFAULT 0,
    drive_type ENUM('Pool Campus', 'Regular Campus', 'Off Campus') DEFAULT 'Regular Campus',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_drive_date (drive_date),
    INDEX idx_company_drive (company_id),
    INDEX idx_academic_year_drive (academic_year)
);

-- 5. Student Registrations for Placement Drives
CREATE TABLE IF NOT EXISTS placement_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drive_id INT NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    cgpa DECIMAL(4,2),
    backlogs INT DEFAULT 0,
    resume_url VARCHAR(500),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    appeared BOOLEAN DEFAULT FALSE,
    selected BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    status ENUM('registered', 'shortlisted', 'appeared', 'selected', 'rejected') DEFAULT 'registered',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (drive_id) REFERENCES placement_drives(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_drive (drive_id, roll_number),
    INDEX idx_drive_reg (drive_id),
    INDEX idx_student_reg (roll_number)
);

-- 6. Placement Team Members
CREATE TABLE IF NOT EXISTS placement_team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    role ENUM('Head', 'Coordinator', 'Assistant', 'Student Representative') NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    office_phone VARCHAR(20),
    office_extension VARCHAR(10),
    profile_image_url VARCHAR(500),
    bio TEXT,
    experience_years INT,
    specialization VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_role (role),
    INDEX idx_department_team (department),
    INDEX idx_display_order (display_order)
);

-- 7. Company Visit History
CREATE TABLE IF NOT EXISTS company_visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    visit_date DATE,
    visit_type ENUM('Placement Drive', 'Pre-placement Talk', 'Industry Interaction', 'Internship Drive') NOT NULL,
    departments_involved JSON, -- Array of department codes
    students_registered INT DEFAULT 0,
    students_selected INT DEFAULT 0,
    positions_offered JSON, -- Array of position details
    packages_offered JSON, -- Array of package details
    feedback TEXT,
    poc_name VARCHAR(255),
    poc_email VARCHAR(255),
    poc_phone VARCHAR(20),
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_company_visit (company_id),
    INDEX idx_visit_date (visit_date),
    INDEX idx_academic_year_visit (academic_year)
);

-- 8. Placement Reports/Documents
CREATE TABLE IF NOT EXISTS placement_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    report_type ENUM('Annual Report', 'Department Wise', 'Company Wise', 'Monthly Report', 'Brochure') NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INT, -- in bytes
    file_type VARCHAR(50),
    description TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    download_count INT DEFAULT 0,
    created_by INT, -- Admin user ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_academic_year_report (academic_year),
    INDEX idx_report_type (report_type),
    INDEX idx_public_reports (is_public)
);

-- Insert sample data for placement team
INSERT INTO placement_team (name, designation, department, role, email, phone, office_phone, office_extension, bio, is_active, display_order) VALUES
('Dr. P N V GOPALA KRISHNA', 'Associate Professor (Mechanical) & Head - Placements', 'Mechanical Engineering', 'Head', 'gopalakrishna.pnv@srivasaviengg.ac.in', '9849511367', '08818-284355', '319', 'Head of Placement Cell with extensive industry connections and student guidance experience.', TRUE, 1);

-- Insert sample departments data for statistics
INSERT INTO placement_statistics (academic_year, department_code, department_name, total_students, students_placed, placement_percentage, highest_package, average_package) VALUES
('2024-25', 'CSE', 'Computer Science & Engineering', 120, 114, 95.00, 25.00, 6.50),
('2024-25', 'ECE', 'Electronics & Communication Engineering', 100, 92, 92.00, 18.00, 5.80),
('2024-25', 'ME', 'Mechanical Engineering', 80, 70, 87.50, 15.00, 5.20),
('2024-25', 'EEE', 'Electrical & Electronics Engineering', 90, 81, 90.00, 16.00, 5.50),
('2024-25', 'CE', 'Civil Engineering', 70, 60, 85.71, 12.00, 4.80),
('2024-25', 'MBA', 'Master of Business Administration', 60, 52, 86.67, 14.00, 5.00);

-- Insert sample companies
INSERT INTO companies (name, logo_url, website, industry, company_type, is_active) VALUES
('Infosys', '/company_icons/infosys.png', 'https://www.infosys.com', 'Information Technology', 'MNC', TRUE),
('TCS', '/company_icons/tcs.png', 'https://www.tcs.com', 'Information Technology', 'MNC', TRUE),
('Wipro', '/company_icons/wipro.png', 'https://www.wipro.com', 'Information Technology', 'MNC', TRUE),
('Microsoft', '/company_icons/microsoft.png', 'https://www.microsoft.com', 'Information Technology', 'MNC', TRUE),
('Amazon', '/company_icons/amazon.png', 'https://www.amazon.com', 'E-commerce', 'MNC', TRUE),
('Google', '/company_icons/google.png', 'https://www.google.com', 'Information Technology', 'MNC', TRUE);