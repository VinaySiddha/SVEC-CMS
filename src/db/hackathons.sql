CREATE TABLE hackathons (
  id VARCHAR(36) PRIMARY KEY,
  dept VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  level ENUM('Internal', 'State', 'National', 'International') NOT NULL,
  position VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  proof_url VARCHAR(255),
  winners JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (dept),
  INDEX (level),
  INDEX (date)
);
