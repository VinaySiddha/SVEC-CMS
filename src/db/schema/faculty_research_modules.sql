-- Faculty Research Modules Schema
-- This schema contains all research-related modules for faculty members

-- 1. RESEARCH VERTICALS TABLE
CREATE TABLE IF NOT EXISTS research_verticals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    vertical_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_vertical_name (vertical_name)
);

-- RESEARCH VERTICLES - Research Areas
CREATE TABLE IF NOT EXISTS research_vertical_areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vertical_id INT NOT NULL,
    area_name VARCHAR(150) NOT NULL,
    faculty_members JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vertical_id) REFERENCES research_verticals(id) ON DELETE CASCADE,
    INDEX idx_vertical (vertical_id)
);

-- 2. RESEARCH SUPERVISORS TABLE
CREATE TABLE IF NOT EXISTS research_supervisors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supervisor_id INT NOT NULL,
    scholar_id INT,
    scholar_name VARCHAR(150) NOT NULL,
    status ENUM('On Going', 'Completed') DEFAULT 'On Going',
    proof_document VARCHAR(255),
    start_date DATE,
    completion_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supervisor_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_supervisor (supervisor_id),
    INDEX idx_status (status)
);

-- 3. JOURNAL PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS journal_publications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    journal_name VARCHAR(255) NOT NULL,
    paper_title VARCHAR(255) NOT NULL,
    publication_year INT,
    volume_number VARCHAR(50),
    issue_number VARCHAR(50),
    page_numbers VARCHAR(50),
    doi VARCHAR(100),
    impact_factor DECIMAL(5,2),
    proof_document VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_year (publication_year)
);

-- 4. CONFERENCE PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS conference_publications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    faculty_names JSON NOT NULL,
    paper_title VARCHAR(255) NOT NULL,
    conference_name VARCHAR(255) NOT NULL,
    conference_location VARCHAR(255),
    publication_year INT,
    isbn_issn VARCHAR(50),
    proof_document VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_year (publication_year)
);

-- 5. PATENTS TABLE
CREATE TABLE IF NOT EXISTS patents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    inventor_names JSON NOT NULL,
    patent_title VARCHAR(255) NOT NULL,
    patent_number VARCHAR(100) UNIQUE,
    application_number VARCHAR(100),
    filing_date DATE,
    publication_date DATE,
    status ENUM('Applied', 'Published', 'Granted') DEFAULT 'Applied',
    proof_document VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_status (status),
    INDEX idx_patent_number (patent_number)
);

-- 6. BOOK PUBLICATIONS TABLE
CREATE TABLE IF NOT EXISTS book_publications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    authors JSON NOT NULL,
    publication_year INT,
    publisher_name VARCHAR(255),
    isbn_number VARCHAR(20),
    proof_document VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_year (publication_year)
);

-- 7. CAREER ADVANCEMENTS TABLE
CREATE TABLE IF NOT EXISTS career_advancements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    institute_name VARCHAR(255) NOT NULL,
    degree_pursuing VARCHAR(100),
    joining_date DATE,
    completion_date DATE,
    degree_status ENUM('Pursuing', 'Completed') DEFAULT 'Pursuing',
    proof_document VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_status (degree_status)
);

-- 8. INTERACTION WITH OUTSIDE WORLD TABLE
CREATE TABLE IF NOT EXISTS interaction_outside_world (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    interaction_type ENUM('Seminar', 'Workshop', 'Industrial Visit', 'Guest Lecture', 'Collaboration', 'Conference', 'Other') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    organization_name VARCHAR(255),
    interaction_date DATE,
    location VARCHAR(255),
    participants_count INT,
    proof_document VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    INDEX idx_faculty (faculty_id),
    INDEX idx_type (interaction_type),
    INDEX idx_date (interaction_date)
);

-- MODULE SELECTION TRACKING TABLE
CREATE TABLE IF NOT EXISTS faculty_module_selection (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL UNIQUE,
    selected_modules JSON,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE
);
