-- ECE Department - All Missing Tables Schema

-- 1. ECE Newsletters Table
CREATE TABLE IF NOT EXISTS ece_newsletters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(300) NOT NULL,
  url VARCHAR(500),
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ECE Extracurricular Activities Table
CREATE TABLE IF NOT EXISTS ece_extracurricularactivities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(100) NOT NULL,
  label VARCHAR(300) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ECE Faculty Innovations Table
CREATE TABLE IF NOT EXISTS ece_facultyinnovations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  year VARCHAR(4),
  innovators VARCHAR(300),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_year (year),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ECE Clubs Table
CREATE TABLE IF NOT EXISTS ece_clubs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  coordinator VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ECE Placements Table
CREATE TABLE IF NOT EXISTS ece_placements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(300) NOT NULL,
  package_offered DECIMAL(10, 2),
  no_of_students INT,
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ECE MOUs Table
CREATE TABLE IF NOT EXISTS ece_mous (
  id INT PRIMARY KEY AUTO_INCREMENT,
  organization_name VARCHAR(300) NOT NULL,
  mou_type VARCHAR(200),
  date_signed DATE,
  details TEXT,
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ECE Handbooks Table
CREATE TABLE IF NOT EXISTS ece_handbooks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ECE Syllabus Table
CREATE TABLE IF NOT EXISTS ece_syllabus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  subject_name VARCHAR(300) NOT NULL,
  semester INT,
  course_code VARCHAR(50),
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_semester (semester)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. ECE Scholarships & Toppers Table
CREATE TABLE IF NOT EXISTS ece_scholarships_toppers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100),
  cgpa DECIMAL(4, 2),
  achievements TEXT,
  year VARCHAR(4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_year (year),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. ECE Physical Facilities Table
CREATE TABLE IF NOT EXISTS ece_physical_facilities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  facility_name VARCHAR(300) NOT NULL,
  description TEXT,
  capacity INT,
  equipment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. ECE Non-Teaching Faculty Table
CREATE TABLE IF NOT EXISTS ece_nonteaching_faculty (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  designation VARCHAR(200),
  qualification VARCHAR(300),
  experience INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Sample Newsletters
INSERT INTO ece_newsletters (title, url, year) VALUES
('ECE Newsletter - Jan 2024', 'https://example.com/newsletter/ece-jan-2024.pdf', '2024'),
('ECE Newsletter - Feb 2024', 'https://example.com/newsletter/ece-feb-2024.pdf', '2024'),
('ECE Newsletter - Mar 2024', 'https://example.com/newsletter/ece-mar-2024.pdf', '2024');

-- Sample Extracurricular Activities
INSERT INTO ece_extracurricularactivities (type, label) VALUES
('sports', 'Cricket'),
('sports', 'Badminton'),
('cultural', 'Dance'),
('cultural', 'Music'),
('technical', 'Robotics'),
('technical', 'Coding Competition');

-- Sample Faculty Innovations
INSERT INTO ece_facultyinnovations (title, description, year, innovators, category) VALUES
('IoT Based Smart Home System', 'Development of smart home automation using IoT', '2024', 'Dr. Rajesh Kumar', 'IoT'),
('AI Signal Processing Module', 'Advanced signal processing using machine learning', '2024', 'Prof. Priya Sharma', 'AI/ML'),
('5G Network Simulator', 'Educational simulator for 5G networks', '2023', 'Dr. Amit Patel', 'Networking');

-- Sample Clubs
INSERT INTO ece_clubs (name, description, coordinator) VALUES
('IEEE Student Branch', 'Student chapter of IEEE professional organization', 'Dr. Suresh'),
('Robotics Club', 'Design and development of robots', 'Prof. Anita'),
('Electronics Club', 'Practical electronics projects and workshops', 'Mr. Vikram');

-- Sample Placements
INSERT INTO ece_placements (company_name, package_offered, no_of_students, year) VALUES
('Infosys', 5.50, 25, '2024'),
('TCS', 5.25, 18, '2024'),
('Wipro', 5.00, 15, '2024'),
('Google', 15.00, 2, '2024'),
('Microsoft', 16.00, 3, '2024');

-- Sample MOUs
INSERT INTO ece_mous (organization_name, mou_type, date_signed, details) VALUES
('Siemens India', 'Industry Collaboration', '2024-01-15', 'Training and research collaboration'),
('Intel Corporation', 'Research Partnership', '2023-08-20', 'VLSI and chip design research'),
('ABB Ltd', 'Internship Program', '2023-10-05', 'Student internship placements');

-- Sample Handbooks
INSERT INTO ece_handbooks (title, description, url, category) VALUES
('Student Handbook', 'Rules and regulations for students', 'https://example.com/handbooks/student.pdf', 'Academic'),
('Lab Manual', 'Electronics Lab procedures and experiments', 'https://example.com/handbooks/lab-manual.pdf', 'Laboratory'),
('Project Guidelines', 'Final year project guidelines', 'https://example.com/handbooks/projects.pdf', 'Projects');

-- Sample Syllabus
INSERT INTO ece_syllabus (subject_name, semester, course_code, url) VALUES
('Circuit Theory', 1, 'ECE101', 'https://example.com/syllabus/ece101.pdf'),
('Digital Electronics', 2, 'ECE102', 'https://example.com/syllabus/ece102.pdf'),
('Signals and Systems', 3, 'ECE201', 'https://example.com/syllabus/ece201.pdf'),
('Communication Systems', 4, 'ECE202', 'https://example.com/syllabus/ece202.pdf');

-- Sample Scholarships & Toppers
INSERT INTO ece_scholarships_toppers (name, category, cgpa, achievements, year) VALUES
('Rahul Sharma', 'Topper', 9.8, 'Winner of National Coding Championship', '2024'),
('Priya Patel', 'Scholar', 9.5, 'Gate Qualified, AIR 125', '2024'),
('Aditya Singh', 'Topper', 9.6, 'Best Project Award', '2023');

-- Sample Physical Facilities
INSERT INTO ece_physical_facilities (facility_name, description, capacity, equipment) VALUES
('Electronics Lab', 'Laboratory for basic electronics practicals', 50, 'Breadboards, Multimeters, Oscilloscopes, Power Supplies'),
('Microprocessor Lab', 'Microprocessor and embedded systems lab', 40, 'Microcontroller boards, Logic Analyzers, Development tools'),
('Communication Lab', 'Communication systems and signal processing lab', 45, 'Signal generators, Network analyzers, Spectrum analyzers'),
('VLSI Design Lab', 'IC design and simulation lab', 30, 'EDA tools, Design Workstations, Simulation software');

-- Sample Non-Teaching Faculty
INSERT INTO ece_nonteaching_faculty (name, designation, qualification, experience) VALUES
('Mr. Ramesh Kumar', 'Lab Technician', 'Diploma in Electronics', 12),
('Ms. Anjali Singh', 'Office Assistant', 'Intermediate', 8),
('Mr. Suresh Reddy', 'Lab Technician', 'Diploma in Electrical', 15),
('Mrs. Divya Sharma', 'Administrative Officer', 'Bachelor of Commerce', 10);
