-- Create cai_mous table for CSE-AI Department MOUs
CREATE TABLE IF NOT EXISTS cai_mous (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept VARCHAR(50) NOT NULL DEFAULT 'cse-ai',
  s_no INT NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  from_date VARCHAR(50) NOT NULL,
  to_date VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Active',
  document_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dept (dept),
  UNIQUE KEY unique_mou (dept, organization_name)
);

-- Insert sample data
INSERT INTO cai_mous (s_no, organization_name, from_date, to_date, status, document_url) VALUES
(1, 'NIT ANP', 'Till Date', '31-12-2022', 'Till Date', '#'),
(2, 'IIIT Hyderabad', 'Active', '31-12-2025', 'Active', '#'),
(3, 'Tech Park', 'Till Date', '30-06-2024', 'Inactive', '#');
