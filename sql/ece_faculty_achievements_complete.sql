-- ECE Faculty Achievements Tables - Complete Setup
-- This creates all the faculty achievements tables mirroring the student achievements structure

-- 1. Roll of Honour (Faculty Recognitions)
CREATE TABLE IF NOT EXISTS ece_faculty_roll_of_honour (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty_name VARCHAR(255) NOT NULL,
  designation VARCHAR(100),
  department VARCHAR(100),
  achievement_details TEXT,
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faculty_name (faculty_name),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Internships/Training Programs Conducted
CREATE TABLE IF NOT EXISTS ece_faculty_workshops_internships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  program VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  year VARCHAR(4),
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_program (program),
  INDEX idx_title (title),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Publications
CREATE TABLE IF NOT EXISTS ece_faculty_publications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  year VARCHAR(4),
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ICET Qualifications
CREATE TABLE IF NOT EXISTS ece_faculty_icet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty_name VARCHAR(255) NOT NULL,
  exam VARCHAR(50),
  education VARCHAR(100),
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faculty_name (faculty_name),
  INDEX idx_exam (exam),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. GRE/Higher Studies
CREATE TABLE IF NOT EXISTS ece_faculty_gre (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty_name VARCHAR(255) NOT NULL,
  course VARCHAR(100),
  toefl INT,
  gre INT,
  ielts DECIMAL(3,1),
  duolingo INT,
  pte INT,
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faculty_name (faculty_name),
  INDEX idx_course (course),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. GATE Qualifications
CREATE TABLE IF NOT EXISTS ece_faculty_gate (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty_name VARCHAR(255) NOT NULL,
  score DECIMAL(5,2),
  year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faculty_name (faculty_name),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Awards & Recognition
CREATE TABLE IF NOT EXISTS ece_faculty_awards_achievements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  faculty_name VARCHAR(255) NOT NULL,
  name_of_the_award VARCHAR(255) NOT NULL,
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faculty_name (faculty_name),
  INDEX idx_award (name_of_the_award),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Placement Metrics (Faculty Projects/Research)
CREATE TABLE IF NOT EXISTS ece_faculty_placement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  total_projects INT,
  completed_projects INT,
  ongoing_projects INT,
  student_collaborators INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Higher Studies - Supervision
CREATE TABLE IF NOT EXISTS ece_faculty_higher_studies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  phd_students_supervised INT,
  mtech_students_supervised INT,
  research_scholars INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Competitive Examinations Qualifications
CREATE TABLE IF NOT EXISTS ece_faculty_competitive_examinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  year VARCHAR(10),
  net INT DEFAULT 0,
  slet INT DEFAULT 0,
  gmat INT DEFAULT 0,
  cat INT DEFAULT 0,
  gre INT DEFAULT 0,
  jam INT DEFAULT 0,
  ielts INT DEFAULT 0,
  toefl INT DEFAULT 0,
  civil_services INT DEFAULT 0,
  state_govt_exams INT DEFAULT 0,
  other_exams INT DEFAULT 0,
  total INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Course Certifications
CREATE TABLE IF NOT EXISTS ece_faculty_course_certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  nptel INT DEFAULT 0,
  coursera INT DEFAULT 0,
  others INT DEFAULT 0,
  total INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Internships/Mentorship
CREATE TABLE IF NOT EXISTS ece_faculty_internship (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  internshala INT DEFAULT 0,
  apssdc INT DEFAULT 0,
  others INT DEFAULT 0,
  total INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Workshops/Seminars Conducted
CREATE TABLE IF NOT EXISTS ece_faculty_workshops_soc (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  workshop_name VARCHAR(255) NOT NULL,
  association_college VARCHAR(255),
  start_date DATE,
  end_date DATE,
  no_of_students INT,
  duration VARCHAR(50),
  year_sem VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  INDEX idx_workshop_name (workshop_name),
  INDEX idx_start_date (start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. CRT (Continuing Research & Training)
CREATE TABLE IF NOT EXISTS ece_faculty_crt (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  training_activity VARCHAR(255) NOT NULL,
  no_of_students INT,
  duration VARCHAR(100),
  resource_person VARCHAR(255),
  target_audience VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year),
  INDEX idx_training_activity (training_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Projects
CREATE TABLE IF NOT EXISTS ece_faculty_projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. CSP (Collaborative Study Programs)
CREATE TABLE IF NOT EXISTS ece_faculty_csp (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. Research Projects
CREATE TABLE IF NOT EXISTS ece_faculty_research_projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(50),
  year VARCHAR(10),
  title VARCHAR(500),
  fileUrl VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_year (year),
  INDEX idx_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. NPTEL Certifications
CREATE TABLE IF NOT EXISTS ece_faculty_nptel (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. Faculty Achievements PDF
CREATE TABLE IF NOT EXISTS ece_faculty_achievements_pdf (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pdf_title VARCHAR(255),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pdf_title (pdf_title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 20. Faculty Achievements - Placement/Research Impact
CREATE TABLE IF NOT EXISTS ece_faculty_achievements_placement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  total_final_year_students INT,
  students_placed INT,
  students_higher_studies INT,
  students_entrepreneur INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 21. Faculty Achievements - Internships/Mentoring
CREATE TABLE IF NOT EXISTS ece_faculty_achievements_internships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  academic_year VARCHAR(10),
  certificates_nptel INT DEFAULT 0,
  certificates_coursera INT DEFAULT 0,
  certificates_others INT DEFAULT 0,
  internships_internshala INT DEFAULT 0,
  internships_apssdc INT DEFAULT 0,
  internships_others INT DEFAULT 0,
  workshops INT DEFAULT 0,
  cocurricular_activities INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_academic_year (academic_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
