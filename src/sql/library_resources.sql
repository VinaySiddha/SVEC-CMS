CREATE TABLE library_resources (
    id VARCHAR(36) PRIMARY KEY,
    dept VARCHAR(10) NOT NULL,
    resource_type ENUM('Book','Journal','Magazine','QuestionBank','Other') NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    inventory_no VARCHAR(50) NOT NULL,
    file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_dept (dept),
    INDEX idx_resource_type (resource_type),
    INDEX idx_inventory_no (inventory_no),
    UNIQUE KEY unique_inventory_no (inventory_no)
);
