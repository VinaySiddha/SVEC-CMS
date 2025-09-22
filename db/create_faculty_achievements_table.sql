CREATE TABLE
    IF NOT EXISTS faculty_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dept VARCHAR(50) NOT NULL,
        type ENUM (
            'Research Supervisors',
            'Awards',
            'Patents',
            'Publications',
            'Grants',
            'Other'
        ) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        proof_url VARCHAR(255),
        approved BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )