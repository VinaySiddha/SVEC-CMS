-- ============================================================================
-- ECE (Electronics & Communication Engineering) Tables - Complete Schema
-- Create all 29 ECE tables based on ECT table structures
-- Database: svec_cms
-- ============================================================================

-- 1. ECE Faculty Table
CREATE TABLE IF NOT EXISTS ece_faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  qualification VARCHAR(255),
  designation VARCHAR(255),
  profileUrl VARCHAR(500),
  date_of_joining DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_designation (designation),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 2. ECE BOS Members Table
CREATE TABLE IF NOT EXISTS ece_bos_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  designation VARCHAR(100),
  organization VARCHAR(255),
  position_in_job VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 3. ECE BOS Minutes Table
CREATE TABLE IF NOT EXISTS ece_bos_minutes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meeting_no VARCHAR(50),
  meeting_date DATE,
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_meeting_date (meeting_date),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 4. ECE Workshops Table
CREATE TABLE IF NOT EXISTS ece_workshops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 5. ECE Department Library Table
CREATE TABLE IF NOT EXISTS ece_department_library (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titles INT,
  volumes INT,
  description TEXT,
  faculty_incharge VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  image_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 6. ECE Industry Programs Table
CREATE TABLE IF NOT EXISTS ece_industry_programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  academic_year VARCHAR(20),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 7. ECE Department Overview Table
CREATE TABLE IF NOT EXISTS ece_department_overview (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hod_name VARCHAR(255),
  hod_email VARCHAR(255),
  hod_qualification VARCHAR(255),
  hod_image_url VARCHAR(500),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 8. ECE E-Resources Table
CREATE TABLE IF NOT EXISTS ece_eresources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  regulation VARCHAR(20),
  semester VARCHAR(20),
  subject_name VARCHAR(255),
  display_order INT,
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_subject (subject_name),
  INDEX idx_regulation (regulation),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 9. ECE Extra-Curricular Table
CREATE TABLE IF NOT EXISTS ece_extra_curricular (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  year VARCHAR(20),
  url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_year (year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 10. ECE Faculty Achievements Table
CREATE TABLE IF NOT EXISTS ece_faculty_achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  title VARCHAR(255),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 11. ECE Faculty Development Table
CREATE TABLE IF NOT EXISTS ece_faculty_development (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(100),
  year VARCHAR(20),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_year (year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 12. ECE Hackathons Table
CREATE TABLE IF NOT EXISTS ece_hackathons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  academic_year VARCHAR(20),
  brochure_url VARCHAR(500),
  winners_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 13. ECE Hackathons Gallery Table
CREATE TABLE IF NOT EXISTS ece_hackathons_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  academic_year VARCHAR(20),
  gallery VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_academic_year (academic_year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 14. ECE Handbooks Table
CREATE TABLE IF NOT EXISTS ece_handbooks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  academic_year VARCHAR(20),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 15. ECE Technical Association Table
CREATE TABLE IF NOT EXISTS ece_technical_association (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  content TEXT,
  image_url VARCHAR(500),
  file_url VARCHAR(500),
  link VARCHAR(500),
  date_created DATE,
  status VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 16. ECE Merit Scholarships Table
CREATE TABLE IF NOT EXISTS ece_merit_scholarships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch VARCHAR(20),
  academic_year VARCHAR(20),
  particulars VARCHAR(255),
  no_of_students_benefited INT,
  scholarship_amount DECIMAL(12,2),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 17. ECE MOUs Table
CREATE TABLE IF NOT EXISTS ece_mous (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mou_with VARCHAR(255),
  from_date VARCHAR(50),
  to_date VARCHAR(50),
  status VARCHAR(50),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 18. ECE Newsletters Table
CREATE TABLE IF NOT EXISTS ece_newsletters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  volume INT,
  issue INT,
  year VARCHAR(10),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_year (year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 19. ECE Non-Teaching Faculty Table
CREATE TABLE IF NOT EXISTS ece_non_teaching_faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  designation VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_designation (designation),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 20. ECE Physical Facilities Table
CREATE TABLE IF NOT EXISTS ece_physical_facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  file_url VARCHAR(500),
  gallery JSON,
  lab_details JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 21. ECE Placements Table
CREATE TABLE IF NOT EXISTS ece_placements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  batch VARCHAR(20),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_batch (batch),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 22. ECE Sahaya Events Table
CREATE TABLE IF NOT EXISTS ece_sahaya_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  year VARCHAR(20),
  category VARCHAR(100),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_year (year),
  INDEX idx_category (category),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 23. ECE SCUD Activities Table
CREATE TABLE IF NOT EXISTS ece_scud_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  academic_year VARCHAR(20),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 24. ECE Student Achievements Table
CREATE TABLE IF NOT EXISTS ece_student_achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  year VARCHAR(20),
  title VARCHAR(255),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_year (year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 25. ECE GATE Table
CREATE TABLE IF NOT EXISTS ece_gate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rollno VARCHAR(20),
  name VARCHAR(255),
  score INT,
  year VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_year (year),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 26. ECE Roll of Honour Table
CREATE TABLE IF NOT EXISTS ece_roll_of_honour (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rollno VARCHAR(20),
  name VARCHAR(255),
  batch VARCHAR(20),
  cgpa DECIMAL(4,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_batch (batch),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 27. ECE Syllabus Table
CREATE TABLE IF NOT EXISTS ece_syllabus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50),
  title VARCHAR(255),
  fileUrl VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 28. ECE Technical Faculty Table
CREATE TABLE IF NOT EXISTS ece_technical_faculty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  designation VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_designation (designation),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 29. ECE Training Activities Table
CREATE TABLE IF NOT EXISTS ece_training_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  trainer VARCHAR(255),
  file_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_trainer (trainer),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Display all created ECE tables
SELECT TABLE_NAME FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME LIKE 'ece_%' 
ORDER BY TABLE_NAME;

-- Count total ECE tables
SELECT COUNT(*) as total_ece_tables FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME LIKE 'ece_%';
