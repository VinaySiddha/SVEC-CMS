-- Create updated syllabus table
CREATE TABLE IF NOT EXISTS syllabus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    content TEXT NOT NULL,
    document_url VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Add index for date
CREATE INDEX idx_syllabus_date ON syllabus(date);