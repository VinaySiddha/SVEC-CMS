CREATE TABLE events (
  id VARCHAR(36) PRIMARY KEY,
  dept VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category ENUM('cultural', 'sports', 'community') NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  proof_url VARCHAR(255),
  gallery JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dept (dept),
  INDEX idx_category (category),
  INDEX idx_date (date)
);
