-- Faculty Table
CREATE TABLE cse_faculty (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  qualification VARCHAR(255),
  designation VARCHAR(255),
  profile_url TEXT
);

-- Staff Table
CREATE TABLE cse_staff (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  designation VARCHAR(255),
  type VARCHAR(50) -- 'technical' or 'non-teaching'
);

-- Achievements Table
CREATE TABLE cse_achievements (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  date DATE,
  category VARCHAR(100)
);

-- Placements Table
CREATE TABLE cse_placements (
  id INT PRIMARY KEY,
  student_name VARCHAR(255),
  company_name VARCHAR(255),
  package DECIMAL(10,2),
  academic_year VARCHAR(20)
);

-- Hackathons Table
CREATE TABLE cse_hackathons (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  level VARCHAR(50),
  position VARCHAR(50),
  participants_count INT,
  winners TEXT
);

-- Handbooks Table
CREATE TABLE cse_handbooks (
  id INT PRIMARY KEY,
  academic_year VARCHAR(20),
  semester VARCHAR(10),
  title VARCHAR(255),
  url TEXT
);

-- eResources Table
-- CREATE TABLE cse_eresources (
--   id INT PRIMARY KEY,
--   regulation VARCHAR(20),
--   title VARCHAR(255),
--   url TEXT
-- );

-- MoUs Table
CREATE TABLE cse_mous (
  id INT PRIMARY KEY,
  organization VARCHAR(255),
  type VARCHAR(50),
  date DATE,
  validity VARCHAR(50)
);

-- Syllabus Table
CREATE TABLE cse_syllabus (
  id INT PRIMARY KEY,
  academic_year VARCHAR(20),
  semester VARCHAR(10),
  title VARCHAR(255),
  url TEXT
);

-- Physical Facilities Table
CREATE TABLE cse_physical_facilities (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

-- Department Library Table
CREATE TABLE cse_department_library (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  year INT,
  url TEXT
);

-- Merit Scholarships Table
CREATE TABLE cse_merit_scholarships (
  id INT PRIMARY KEY,
  student_name VARCHAR(255),
  academic_year VARCHAR(20),
  scholarship_type VARCHAR(100),
  amount DECIMAL(10,2)
);

-- Technical Association Table
CREATE TABLE cse_technical_association (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

-- Training Activities Table
CREATE TABLE cse_training_activities (
  id INT PRIMARY KEY,
  title VARCHAR(255), 
  description TEXT,
  date DATE
);

-- Newsletters Table
CREATE TABLE cse_newsletters (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  date DATE,`
  url TEXT
);

-- Extra Curricular Table
CREATE TABLE cse_extra_curricular (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  date DATE
);
