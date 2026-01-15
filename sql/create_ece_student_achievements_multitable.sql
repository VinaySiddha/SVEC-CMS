-- ECE Student Achievements Multi-Table Structure
-- Created to support multi-table student achievements pattern matching EEE implementation

-- 1. ECE Roll of Honour Table
CREATE TABLE IF NOT EXISTS `ece_roll_of_honour` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `batch` VARCHAR(20),
  `regd_no` VARCHAR(20),
  `student_name` VARCHAR(255),
  `percentage` DECIMAL(5,2),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_batch` (`batch`),
  INDEX `idx_regd_no` (`regd_no`),
  INDEX `idx_student_name` (`student_name`),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 2. ECE Placements Table
CREATE TABLE IF NOT EXISTS `ece_placements` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_year` VARCHAR(20),
  `total_final_year_students` INT,
  `students_placed` INT,
  `students_higher_studies` INT,
  `students_entrepreneur` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_academic_year` (`academic_year`),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 3. ECE Higher Studies Table
CREATE TABLE IF NOT EXISTS `ece_higher_studies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_year` VARCHAR(20),
  `total_final_year_students` INT,
  `students_higher_studies` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_academic_year` (`academic_year`),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 4. ECE Competitive Examinations Table
CREATE TABLE IF NOT EXISTS `ece_competitive_examinations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `year` VARCHAR(20),
  `net` INT DEFAULT 0,
  `slet` INT DEFAULT 0,
  `gmat` INT DEFAULT 0,
  `cat` INT DEFAULT 0,
  `gre` INT DEFAULT 0,
  `jam` INT DEFAULT 0,
  `ielts` INT DEFAULT 0,
  `toefl` INT DEFAULT 0,
  `civil_services` INT DEFAULT 0,
  `state_govt_exams` INT DEFAULT 0,
  `other_exams` INT DEFAULT 0,
  `total` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_year` (`year`),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 5. ECE Course Certifications Table
CREATE TABLE IF NOT EXISTS `ece_course_certifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_year` VARCHAR(20),
  `nptel` INT DEFAULT 0,
  `coursera` INT DEFAULT 0,
  `udemy` INT DEFAULT 0,
  `edx` INT DEFAULT 0,
  `swayam` INT DEFAULT 0,
  `microsoft_certifications` INT DEFAULT 0,
  `aws_certifications` INT DEFAULT 0,
  `other_certifications` INT DEFAULT 0,
  `total` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_academic_year` (`academic_year`),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;

-- 6. ECE Internship Table
CREATE TABLE IF NOT EXISTS `ece_internship` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `academic_year` VARCHAR(20),
  `name_of_the_company` VARCHAR(255),
  `no_of_students_completed_internship` INT,
  `duration` VARCHAR(50),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_academic_year` (`academic_year`),
  INDEX `idx_company` (`name_of_the_company`),
  CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
) ENGINE=InnoDB;
