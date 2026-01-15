-- Create DS BOS Members table
CREATE TABLE IF NOT EXISTS `ds_bos_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `dept` VARCHAR(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(255),
  `organization` VARCHAR(255),
  `position_in_job` VARCHAR(255)
);

-- Create DS BOS Minutes table
CREATE TABLE IF NOT EXISTS `ds_bos_minutes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `dept` VARCHAR(20) NOT NULL,
  `meeting_no` VARCHAR(20),
  `meeting_date` DATE,
  `file_url` VARCHAR(500)
);

-- Insert BOS Members data
INSERT INTO `ds_bos_members` (`dept`, `name`, `designation`, `organization`, `position_in_job`) VALUES
('ds', 'Dr. Y. Srinivas', 'Professor & HOD', 'Dept of Data Science, SVEC', 'Chairperson'),
('ds', 'Dr. A Krishna Mohan', 'Professor of Computer Science', 'JNTUK, Kakinada', 'University Nominee'),
('ds', 'Dr. R.B.V Subramaanyam', 'Professor of Data Analytics', 'NITW, Warangal', 'Academic Expert'),
('ds', 'Dr. S Pallam Setty', 'Professor of Statistics', 'Andhra University', 'Academic Expert'),
('ds', 'Mr. Rajesh Kumar', 'Senior Data Scientist', 'Infosys, Bangalore', 'Industry Expert'),
('ds', 'Ms. Priya Sharma', 'Data Analytics Manager', 'TCS, Hyderabad', 'Alumni'),
('ds', 'All Faculty Members in DS Dept', '', '', 'Faculty Members');

-- Insert BOS Meeting Minutes data
INSERT INTO `ds_bos_minutes` (`dept`, `meeting_no`, `meeting_date`, `file_url`) VALUES
('ds', '3rd', '2025-07-19', 'http://srivasaviengg.ac.in/uploads/Minutes_of_3rd_BOS_DS.pdf'),
('ds', '2nd', '2024-07-18', 'http://srivasaviengg.ac.in/uploads/ds/Minutes_of_2nd_BOS_DS.pdf'),
('ds', '1st', '2023-07-25', 'http://srivasaviengg.ac.in/uploads/ds/Minutes_of_1st_BOS_DS.pdf');
