-- Create technical_staff table for technical personnel
CREATE TABLE technical_staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dept VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  designation VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  employee_id VARCHAR(50),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  INDEX idx_dept (dept),
  INDEX idx_status (status)
);

-- Create non_teaching_staff table for non-teaching personnel
CREATE TABLE non_teaching_staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dept VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  designation VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  employee_id VARCHAR(50),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT,
  updated_by INT,
  INDEX idx_dept (dept),
  INDEX idx_status (status)
);
