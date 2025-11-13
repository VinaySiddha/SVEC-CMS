-- Drop existing tables if they exist
DROP TABLE IF EXISTS syllabus;
DROP TABLE IF EXISTS regulations;
DROP TABLE IF EXISTS academic_calendars;

-- Create syllabus table
CREATE TABLE syllabus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    type ENUM('UG', 'PG') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    document_url VARCHAR(512) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_syllabus_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create regulations table
CREATE TABLE regulations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    type ENUM('UG', 'PG') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    document_url VARCHAR(512) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_regulations_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create academic_calendars table
CREATE TABLE academic_calendars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    type ENUM('UG', 'PG') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    document_url VARCHAR(512) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_calendars_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Add indexes for better performance
CREATE INDEX idx_syllabus_type ON syllabus(type);
CREATE INDEX idx_syllabus_date ON syllabus(date);
CREATE INDEX idx_syllabus_deleted_at ON syllabus(deleted_at);

CREATE INDEX idx_regulations_type ON regulations(type);
CREATE INDEX idx_regulations_date ON regulations(date);
CREATE INDEX idx_regulations_deleted_at ON regulations(deleted_at);

CREATE INDEX idx_calendars_type ON academic_calendars(type);
CREATE INDEX idx_calendars_date ON academic_calendars(date);
CREATE INDEX idx_calendars_deleted_at ON academic_calendars(deleted_at);