-- Create academic calendars table
CREATE TABLE IF NOT EXISTS academic_calendars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    academic_year VARCHAR(9) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    department VARCHAR(100),
    program_type ENUM('B.Tech', 'M.Tech', 'M.B.A', 'M.C.A', 'Diploma') NOT NULL,
    document_url VARCHAR(512),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    remarks TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_academic_year (academic_year),
    INDEX idx_program_type (program_type),
    INDEX idx_status (status),
    INDEX idx_department (department),
    INDEX idx_start_date (start_date)
);

-- Create academic calendar events table (for events within a calendar)
CREATE TABLE IF NOT EXISTS academic_calendar_events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    calendar_id INT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_date DATE NOT NULL,
    event_type ENUM('holiday', 'exam', 'semester', 'registration', 'orientation', 'other') DEFAULT 'other',
    is_important BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_calendar_id (calendar_id),
    INDEX idx_event_date (event_date),
    INDEX idx_event_type (event_type)
);
