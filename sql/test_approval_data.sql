-- Test the approval system by inserting some test data
-- Insert test faculty achievement
INSERT INTO faculty_achievements (title, faculty_name, department, achievement_date, description, status)
VALUES ('Outstanding Research Award', 'Dr. John Smith', 'CSE', '2024-01-15', 'Published 5 research papers in top-tier journals', 'pending');

-- Insert test student achievement
INSERT INTO student_achievements (title, student_name, department, achievement_date, description, status)
VALUES ('First Prize in Coding Competition', 'Alice Johnson', 'CSE', '2024-02-10', 'Won first prize in national level coding competition', 'pending');

-- Insert test lab
INSERT INTO labs (lab_name, department, lab_area, equipment_count, description, status)
VALUES ('AI Lab', 'CSE', 200.5, 25, 'State-of-the-art artificial intelligence laboratory', 'pending');

-- Insert test workshop
INSERT INTO workshops (title, department, duration, start_date, end_date, description, status)
VALUES ('Machine Learning Workshop', 'CSE', '3 days', '2024-03-01', '2024-03-03', 'Comprehensive workshop on ML algorithms', 'pending');

-- Check the data
SELECT 'Faculty Achievements' as table_name, COUNT(*) as pending_count FROM faculty_achievements WHERE status = 'pending'
UNION ALL
SELECT 'Student Achievements' as table_name, COUNT(*) as pending_count FROM student_achievements WHERE status = 'pending'
UNION ALL
SELECT 'Labs' as table_name, COUNT(*) as pending_count FROM labs WHERE status = 'pending'
UNION ALL
SELECT 'Workshops' as table_name, COUNT(*) as pending_count FROM workshops WHERE status = 'pending';
