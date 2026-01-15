-- Drop existing table if exists
DROP TABLE IF EXISTS regulations;

-- Create regulations table with updated schema
CREATE TABLE regulations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    year VARCHAR(4) NOT NULL,
    type ENUM('B.Tech', 'M.Tech', 'M.B.A', 'M.C.A', 'Diploma') NOT NULL,
    document_url VARCHAR(512) NOT NULL,  -- Made NOT NULL since we require a document
    academic_year VARCHAR(9) NOT NULL,
    effective_from DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    remarks TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    CONSTRAINT fk_regulations_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY uk_regulations_type_year (type, year, deleted_at),  -- Ensure no duplicate regulations for same type and year (considering soft deletes)
    CHECK (academic_year REGEXP '^[0-9]{4}-[0-9]{4}$')  -- Ensure academic_year format YYYY-YYYY
);

-- Add indexes for better performance
CREATE INDEX idx_regulations_type ON regulations(type);
CREATE INDEX idx_regulations_year ON regulations(year);
CREATE INDEX idx_regulations_status ON regulations(status);
CREATE INDEX idx_regulations_is_current ON regulations(is_current);
CREATE INDEX idx_regulations_deleted_at ON regulations(deleted_at);  -- Index for soft deletes

-- Create trigger to prevent multiple current regulations of same type
DELIMITER //
CREATE TRIGGER check_current_regulations
BEFORE UPDATE ON regulations
FOR EACH ROW
BEGIN
    IF NEW.is_current = TRUE AND OLD.is_current = FALSE THEN
        -- Set all other regulations of same type to not current
        UPDATE regulations 
        SET is_current = FALSE 
        WHERE type = NEW.type 
        AND id != NEW.id
        AND deleted_at IS NULL;
    END IF;
END//
DELIMITER ;