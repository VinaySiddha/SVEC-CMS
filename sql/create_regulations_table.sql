-- Create regulations table
CREATE TABLE IF NOT EXISTS regulations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    year VARCHAR(4) NOT NULL,
    type ENUM('UG', 'PG') NOT NULL,
    document_url VARCHAR(512),
    academic_year VARCHAR(9) NOT NULL,
    effective_from DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    remarks TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Add indexes for better performance
CREATE INDEX idx_regulations_type ON regulations(type);
CREATE INDEX idx_regulations_year ON regulations(year);
CREATE INDEX idx_regulations_status ON regulations(status);
CREATE INDEX idx_regulations_is_current ON regulations(is_current);