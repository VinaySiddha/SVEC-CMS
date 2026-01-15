-- Database schema for all department modules
-- This creates tables for all the CSEAI and other department modules

-- Board of Studies
CREATE TABLE IF NOT EXISTS board_of_studies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    meeting_date DATE,
    agenda TEXT,
    minutes TEXT,
    document_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_status (status)
);

-- Contact Information
CREATE TABLE IF NOT EXISTS contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    contact_person VARCHAR(255),
    designation VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    office_location VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept)
);

-- Department Information
CREATE TABLE IF NOT EXISTS department_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    dept_full_name VARCHAR(255),
    established_year YEAR,
    vision TEXT,
    mission TEXT,
    hod_name VARCHAR(255),
    hod_qualification VARCHAR(255),
    total_faculty INT DEFAULT 0,
    total_students INT DEFAULT 0,
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept)
);

-- Department Library
CREATE TABLE IF NOT EXISTS department_library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    book_title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(50),
    publication VARCHAR(255),
    year_published YEAR,
    category VARCHAR(100),
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_category (category)
);

-- E-Resources
CREATE TABLE IF NOT EXISTS eresources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    resource_type ENUM('video', 'document', 'link', 'software', 'database') DEFAULT 'document',
    resource_url VARCHAR(500),
    access_type ENUM('free', 'subscription', 'institutional') DEFAULT 'free',
    provider VARCHAR(255),
    subject_area VARCHAR(255),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (resource_type)
);

-- Extra-Curricular Activities
CREATE TABLE IF NOT EXISTS extra_curricular (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    activity_type ENUM('sports', 'cultural', 'technical', 'social', 'academic') DEFAULT 'cultural',
    event_date DATE,
    venue VARCHAR(255),
    coordinator VARCHAR(255),
    participants_count INT DEFAULT 0,
    image_url VARCHAR(500),
    document_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (activity_type)
);

-- Faculty Achievements
CREATE TABLE IF NOT EXISTS faculty_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    faculty_name VARCHAR(255) NOT NULL,
    achievement_type ENUM('award', 'publication', 'patent', 'recognition', 'certification') DEFAULT 'award',
    achievement_date DATE,
    organization VARCHAR(255),
    level_type ENUM('international', 'national', 'state', 'institutional') DEFAULT 'institutional',
    document_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (achievement_type)
);

-- Faculty Development Programs
CREATE TABLE IF NOT EXISTS faculty_development_programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    program_type ENUM('workshop', 'conference', 'seminar', 'training', 'webinar') DEFAULT 'workshop',
    start_date DATE,
    end_date DATE,
    venue VARCHAR(255),
    organizer VARCHAR(255),
    coordinator VARCHAR(255),
    participants_count INT DEFAULT 0,
    duration_hours INT DEFAULT 0,
    certificate_provided BOOLEAN DEFAULT FALSE,
    document_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (program_type)
);

-- Hackathons
CREATE TABLE IF NOT EXISTS hackathons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    event_date DATE,
    duration_hours INT DEFAULT 24,
    venue VARCHAR(255),
    theme VARCHAR(255),
    prize_amount DECIMAL(10, 2),
    teams_count INT DEFAULT 0,
    participants_count INT DEFAULT 0,
    organizer VARCHAR(255),
    sponsors TEXT,
    image_url VARCHAR(500),
    document_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_date (event_date)
);

-- Merit Scholarships
CREATE TABLE IF NOT EXISTS merit_scholarships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    scholarship_name VARCHAR(255),
    student_name VARCHAR(255),
    student_roll_number VARCHAR(50),
    academic_year VARCHAR(20),
    semester VARCHAR(10),
    cgpa DECIMAL(4, 2),
    amount DECIMAL(10, 2),
    provider VARCHAR(255),
    criteria TEXT,
    document_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_year (academic_year)
);

-- Newsletters
CREATE TABLE IF NOT EXISTS newsletters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    publication_date DATE,
    volume VARCHAR(20),
    issue VARCHAR(20),
    editor VARCHAR(255),
    content_summary TEXT,
    pdf_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_date (publication_date)
);

-- Physical Facilities
CREATE TABLE IF NOT EXISTS physical_facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    facility_type ENUM('lab', 'classroom', 'equipment', 'infrastructure', 'library') DEFAULT 'lab',
    location VARCHAR(255),
    capacity INT,
    area_sqft DECIMAL(10, 2),
    equipment_list TEXT,
    inauguration_date DATE,
    cost DECIMAL(15, 2),
    funding_source VARCHAR(255),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (facility_type)
);

-- Placement Batches
CREATE TABLE IF NOT EXISTS placement_batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    batch_year YEAR,
    total_students INT DEFAULT 0,
    placed_students INT DEFAULT 0,
    placement_percentage DECIMAL(5, 2),
    highest_package DECIMAL(10, 2),
    average_package DECIMAL(10, 2),
    top_recruiters TEXT,
    document_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_year (batch_year)
);

-- Placement Gallery
CREATE TABLE IF NOT EXISTS placement_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    student_name VARCHAR(255),
    company_name VARCHAR(255),
    package_amount DECIMAL(10, 2),
    placement_date DATE,
    job_role VARCHAR(255),
    batch_year YEAR,
    student_image VARCHAR(500),
    company_logo VARCHAR(500),
    testimonial TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_company (company_name)
);

-- Student Achievements
CREATE TABLE IF NOT EXISTS student_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50),
    achievement_type ENUM('academic', 'technical', 'sports', 'cultural', 'research') DEFAULT 'academic',
    achievement_date DATE,
    organization VARCHAR(255),
    level_type ENUM('international', 'national', 'state', 'institutional') DEFAULT 'institutional',
    position VARCHAR(50),
    prize_amount DECIMAL(10, 2),
    certificate_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (achievement_type)
);

-- Technical Association
CREATE TABLE IF NOT EXISTS technical_association (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    association_name VARCHAR(255),
    membership_type ENUM('institutional', 'individual', 'student') DEFAULT 'institutional',
    membership_date DATE,
    renewal_date DATE,
    benefits TEXT,
    activities TEXT,
    coordinator VARCHAR(255),
    document_url VARCHAR(500),
    logo_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_association (association_name)
);

-- Training Activities
CREATE TABLE IF NOT EXISTS training_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    training_type ENUM('technical', 'soft_skills', 'placement', 'certification', 'industry') DEFAULT 'technical',
    start_date DATE,
    end_date DATE,
    duration_hours INT DEFAULT 0,
    venue VARCHAR(255),
    trainer_name VARCHAR(255),
    trainer_organization VARCHAR(255),
    participants_count INT DEFAULT 0,
    fee_amount DECIMAL(10, 2) DEFAULT 0,
    certificate_provided BOOLEAN DEFAULT FALSE,
    document_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (training_type)
);

-- Workshops
CREATE TABLE IF NOT EXISTS workshops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    workshop_type ENUM('technical', 'research', 'innovation', 'entrepreneurship', 'industry') DEFAULT 'technical',
    event_date DATE,
    duration_hours INT DEFAULT 8,
    venue VARCHAR(255),
    speaker_name VARCHAR(255),
    speaker_designation VARCHAR(255),
    speaker_organization VARCHAR(255),
    participants_count INT DEFAULT 0,
    registration_fee DECIMAL(10, 2) DEFAULT 0,
    topics_covered TEXT,
    learning_outcomes TEXT,
    certificate_provided BOOLEAN DEFAULT FALSE,
    document_url VARCHAR(500),
    image_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    INDEX idx_dept (dept),
    INDEX idx_type (workshop_type),
    INDEX idx_date (event_date)
);

-- Sidebar Items (for navigation structure)
CREATE TABLE IF NOT EXISTS sidebar_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dept VARCHAR(50) NOT NULL,
    parent_id INT NULL,
    sort_order INT DEFAULT 0,
    icon VARCHAR(50),
    route VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    created_by INT,
    FOREIGN KEY (parent_id) REFERENCES sidebar_items(id) ON DELETE SET NULL,
    INDEX idx_dept (dept),
    INDEX idx_parent (parent_id)
);

-- Insert sample data for sidebar items (CSEAI department)
INSERT IGNORE INTO sidebar_items (title, dept, sort_order, icon, route, status) VALUES
('Board of Studies', 'cseai', 1, 'BookOpen', '/departments/cseai/board-of-studies', 'approved'),
('Contact', 'cseai', 2, 'Globe', '/departments/cseai/contact', 'approved'),
('Department Info', 'cseai', 3, 'Building2', '/departments/cseai/department-info', 'approved'),
('Department Library', 'cseai', 4, 'BookOpen', '/departments/cseai/department-library', 'approved'),
('E-Resources', 'cseai', 5, 'Globe', '/departments/cseai/eresources', 'approved'),
('Extra-Curricular', 'cseai', 6, 'Activity', '/departments/cseai/extra-curricular', 'approved'),
('Faculty Achievements', 'cseai', 7, 'Award', '/departments/cseai/faculty-achievements', 'approved'),
('Faculty Development Programs', 'cseai', 8, 'GraduationCap', '/departments/cseai/faculty-development-programs', 'approved'),
('Hackathons', 'cseai', 9, 'Briefcase', '/departments/cseai/hackathons', 'approved'),
('Merit Scholarships', 'cseai', 10, 'Award', '/departments/cseai/merit-scholarships', 'approved'),
('Newsletters', 'cseai', 11, 'FileText', '/departments/cseai/newsletters', 'approved'),
('Physical Facilities', 'cseai', 12, 'Building2', '/departments/cseai/physical-facilities', 'approved'),
('Placement Batches', 'cseai', 13, 'Users', '/departments/cseai/placement-batches', 'approved'),
('Placement Gallery', 'cseai', 14, 'Users', '/departments/cseai/placement-gallery', 'approved'),
('Student Achievements', 'cseai', 15, 'Award', '/departments/cseai/student-achievements', 'approved'),
('Technical Association', 'cseai', 16, 'Settings', '/departments/cseai/technical-association', 'approved'),
('Workshops', 'cseai', 17, 'Settings', '/departments/cseai/workshops', 'approved');