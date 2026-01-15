-- Sample data for cai_faculty table
-- CSE-AI Faculty Migration SQL Script
-- This data can be inserted into the database to populate teaching faculty for CSE-AI department

USE svec_cms;

-- Insert sample CSE-AI Faculty Data
INSERT INTO `cai_faculty` (`name`, `qualification`, `designation`, `profileUrl`, `status`) VALUES
('Dr. D Jaya Kumari', 'Ph.D', 'Professor & HOD', '#', 'active'),
('Dr. A Krishna Mohan', 'Ph.D', 'Professor', '#', 'active'),
('Dr. R.B.V Subramaanyam', 'Ph.D', 'Associate Professor', '#', 'active'),
('Dr. S Pallam Setty', 'Ph.D', 'Associate Professor', '#', 'active'),
('Prof. B Vishnuvardhan', 'M.Tech', 'Associate Professor', '#', 'active'),
('Prof. M Srinivas', 'M.Tech', 'Assistant Professor', '#', 'active'),
('Dr. P Srinivasa Rao', 'Ph.D', 'Associate Professor', '#', 'active'),
('Prof. M Sowjanya', 'M.Tech', 'Assistant Professor', '#', 'active'),
('Prof. K Rajesh', 'M.Tech', 'Assistant Professor', '#', 'active'),
('Prof. G Praveen Kumar', 'M.Tech', 'Assistant Professor', '#', 'active');

-- Verify the insertion
SELECT COUNT(*) as 'Total CSE-AI Faculty Inserted' FROM cai_faculty WHERE status = 'active';

-- Display all inserted CSE-AI faculty
SELECT id, name, designation, qualification, status, created_at 
FROM cai_faculty 
WHERE status = 'active' 
ORDER BY id;

