-- EEE Faculty Research Consolidated Table Schema
-- This unified table handles all 8 research types for EEE faculty members

CREATE TABLE IF NOT EXISTS eee_faculty_research (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    research_type ENUM('research_vertical', 'research_supervisor', 'journal_publication', 'conference_publication', 'patent', 'book_publication', 'career_advancement', 'interaction_outside') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Research Verticals
    vertical_area VARCHAR(255),
    
    -- Research Supervisor
    supervisor_name VARCHAR(255),
    
    -- Journal Publications
    journal_name VARCHAR(255),
    volume VARCHAR(50),
    issue VARCHAR(50),
    
    -- Conference Publications
    conference_name VARCHAR(255),
    
    -- Patents
    patent_number VARCHAR(100),
    patent_status ENUM('Applied', 'Granted', 'Published') DEFAULT 'Applied',
    
    -- Book Publications
    book_title VARCHAR(255),
    publisher VARCHAR(255),
    
    -- Career Advancements
    promotion_date DATE,
    new_designation VARCHAR(255),
    
    -- Interaction with Outside World
    interaction_type VARCHAR(255),
    external_organization VARCHAR(255),
    
    -- Common fields
    year INT,
    file_url VARCHAR(500),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_faculty (faculty_id),
    INDEX idx_research_type (research_type),
    INDEX idx_year (year),
    INDEX idx_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
