CREATE TABLE resources (
  id VARCHAR(36) PRIMARY KEY,
  dept VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  regulation VARCHAR(50) NOT NULL,
  semester VARCHAR(50) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  ppt_url VARCHAR(255),
  qbank_url VARCHAR(255),
  old_paper_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (dept),
  INDEX (regulation),
  INDEX (semester),
  INDEX (subject)
);
