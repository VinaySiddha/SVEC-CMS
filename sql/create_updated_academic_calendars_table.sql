-- Create updated academic calendars table
CREATE TABLE IF NOT EXISTS academic_calendars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    content TEXT NOT NULL,
    document_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Add index for date
CREATE INDEX idx_academic_calendars_date ON academic_calendars(date);