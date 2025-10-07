-- Insert statements for CSE department tables
-- You will need to fill these with your actual data from the CSE.tsx file

-- Faculty
INSERT INTO cse_faculty (id, name, qualification, designation, profile_url) VALUES
(1, 'Dr. D. Jaya Kumari', 'Ph.D in Computer Science, M.Tech CSE', 'Professor & Head of Department', '/cse_hod1.jpeg');

-- Staff
INSERT INTO cse_staff (id, name, designation, type) VALUES
(1, 'Mrs. A. Naga Jyothi', 'Asst. Professor', 'technical'),
(2, 'Lab Technician', 'Lab Technician', 'technical'),
(3, 'Office Assistant', 'Office Assistant', 'non-teaching');

-- Achievements (Student)
INSERT INTO cse_achievements (id, title, description, date, category) VALUES
(1, 'Smart India Hackathon Winner', 'Won the national level Smart India Hackathon.', '2024-03-15', 'student'),
(2, 'Codefest Champion', 'Secured 1st place in Codefest.', '2023-11-10', 'student');

-- Achievements (Faculty)
INSERT INTO cse_achievements (id, title, description, date, category) VALUES
(3, 'Best Paper Award', 'Received best paper award at ICSE 2023.', '2023-08-20', 'faculty'),
(4, 'AICTE Research Grant', 'Awarded AICTE research grant for ML project.', '2022-12-01', 'faculty');

-- Placements
INSERT INTO cse_placements (id, student_name, company_name, package, academic_year) VALUES
(1, 'A. Suresh', 'Infosys', 6.5, '2024-25'),
(2, 'B. Priya', 'TCS', 5.0, '2024-25'),
(3, 'C. Rahul', 'Amazon', 12.0, '2023-24');

-- Hackathons
INSERT INTO cse_hackathons (id, title, description, start_date, level, position, participants_count, winners) VALUES
(1, 'CSE Hackathon 2024', 'Annual department hackathon.', '2024-02-10', 'Department', 'Winner', 120, 'Team Alpha'),
(2, 'AI Challenge', 'AI/ML focused hackathon.', '2023-09-05', 'Intercollege', 'Runner Up', 80, 'Team Beta');

-- Handbooks
INSERT INTO cse_handbooks (id, academic_year, semester, title, url) VALUES
(1, '2024-25', 'I', 'CSE Handbook Sem I', 'https://srivasaviengg.ac.in/cse/handbook_sem1.pdf'),
(2, '2024-25', 'II', 'CSE Handbook Sem II', 'https://srivasaviengg.ac.in/cse/handbook_sem2.pdf');

-- eResources
INSERT INTO cse_eresources (id, regulation, title, url) VALUES
(1, 'R20', 'Data Structures PPT', 'https://srivasaviengg.ac.in/cse/ds_ppt.pdf'),
(2, 'R20', 'Algorithms PPT', 'https://srivasaviengg.ac.in/cse/algo_ppt.pdf');

-- MoUs
INSERT INTO cse_mous (id, organization, type, date, validity) VALUES
(1, 'Infosys', 'Industry', '2023-06-01', '3 Years'),
(2, 'TCS', 'Industry', '2022-08-15', '2 Years');

-- Syllabus
INSERT INTO cse_syllabus (id, academic_year, semester, title, url) VALUES
(1, '2024-25', 'I', 'CSE Syllabus Sem I', 'https://srivasaviengg.ac.in/cse/syllabus_sem1.pdf'),
(2, '2024-25', 'II', 'CSE Syllabus Sem II', 'https://srivasaviengg.ac.in/cse/syllabus_sem2.pdf');

-- Physical Facilities
INSERT INTO cse_physical_facilities (id, name, description) VALUES
(1, 'Computer Lab', 'High-end computers with internet connectivity.'),
(2, 'Seminar Hall', 'Equipped with projector and audio system.');

-- Department Library
INSERT INTO cse_department_library (id, title, author, year, url) VALUES
(1, 'Introduction to Algorithms', 'Cormen et al.', 2022, 'https://srivasaviengg.ac.in/cse/library/algorithms.pdf'),
(2, 'Artificial Intelligence', 'Russell & Norvig', 2021, 'https://srivasaviengg.ac.in/cse/library/ai.pdf');

-- Newsletters
INSERT INTO cse_newsletters (id, title, date, url) VALUES
(1, 'Newsletter Volume 11 Issue 1 2020', '2020-01-01', 'http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue1%202020.pdf'),
(2, 'Newsletter Volume 10 Issue 4 2020', '2020-12-01', 'http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_4_%202020.pdf'),
(3, 'Newsletter Volume 10 Issue 3 2020', '2019-12-01', 'http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_3_%202019.pdf'),
(4, 'Newsletter Volume 10 Issue 2 2019', '2019-09-01', 'http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010_Issue%20_2_%202019.pdf'),
(5, 'Newsletter Volume 10 Issue 1 2019', '2019-06-01', 'http://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20_Issue_1_%202019.pdf'),
(6, 'Newsletter Volume 9 Issue 4 2019', '2019-03-01', 'http://srivasaviengg.ac.in/uploads/vol%209%20issue%204.pdf'),
(7, 'Newsletter Volume 9 Issue 3 2019', '2019-01-01', 'http://srivasaviengg.ac.in/uploads/vol%209%20issue%203.pdf'),
(8, 'Newsletter Volume 9 Issue 2 2018', '2018-09-01', 'http://srivasaviengg.ac.in/uploads/vol%209%20issue%202.pdf'),
(9, 'Newsletter Volume 9 Issue 1 2018', '2018-06-01', 'http://srivasaviengg.ac.in/uploads/vol%209%20issue%201.pdf'),
(10, 'Newsletter Volume 8 Issue 4(b) 2018', '2018-03-01', 'http://srivasaviengg.ac.in/uploads/vol%208%20issue%204(b).pdf'),
(11, 'Newsletter Volume 8 Issue 4(a) 2018', '2018-01-01', 'http://srivasaviengg.ac.in/uploads/vol%208%20issue%204(a).pdf'),
(12, 'Newsletter Volume 8 Issue 3 2017', '2017-10-01', 'http://srivasaviengg.ac.in/uploads/oct-17(1).pdf'),
(13, 'Newsletter Volume 8 Issue 2 2017', '2017-07-01', 'http://srivasaviengg.ac.in/uploads/july-2017.pdf'),
(14, 'Newsletter Volume 8 Issue 1 2017', '2017-04-01', 'http://srivasaviengg.ac.in/uploads/april.pdf'),
(15, 'Newsletter Volume 7 Issue 4 2017', '2017-01-01', 'http://srivasaviengg.ac.in/uploads/Jan-17.pdf'),
(16, 'Newsletter Volume 7 Issue 3 2016', '2016-10-01', 'http://srivasaviengg.ac.in/uploads/oct-16.pdf'),
(17, 'Newsletter Volume 7 Issue 2 2016', '2016-07-01', 'http://srivasaviengg.ac.in/uploads/Jul-16.pdf'),
(18, 'Newsletter Volume 7 Issue 1 2016', '2016-04-01', 'http://srivasaviengg.ac.in/uploads/Apr-16.pdf'),
(19, 'Newsletter Volume 6 Issue 4 2016', '2016-01-01', 'http://srivasaviengg.ac.in/uploads/csenl_Jan-16.pdf'),
(20, 'Newsletter Volume 6 Issue 3 2015', '2015-10-01', 'http://srivasaviengg.ac.in/uploads/csenl_Oct-15.pdf'),
(21, 'Newsletter Volume 6 Issue 2 2015', '2015-07-01', 'http://srivasaviengg.ac.in/uploads/csenl_Jul-15.pdf'),
(22, 'Newsletter Volume 6 Issue 1 2015', '2015-04-01', 'http://srivasaviengg.ac.in/uploads/csenl_Apr-15.pdf'),
(23, 'Newsletter Volume 5 Issue 4 2015', '2015-01-01', 'http://srivasaviengg.ac.in/uploads/acsenl_Jan-15.pdf'),
(24, 'Newsletter Volume 5 Issue 3 2014', '2014-10-01', 'http://srivasaviengg.ac.in/uploads/acsenl_Oct-14.pdf'),
(25, 'Newsletter Volume 5 Issue 2 2014', '2014-07-01', 'http://srivasaviengg.ac.in/uploads/acsenl_Jul-14.pdf'),
(26, 'Newsletter Volume 5 Issue 1 2014', '2014-04-01', 'http://srivasaviengg.ac.in/uploads/acsenl_Apr14.pdf');

-- Extra Curricular
INSERT INTO cse_extra_curricular (id, title, description, date) VALUES
(1, 'Extracurricular activities during the Year 2023-24', 'See PDF for details', '2024-03-01'),
(2, 'Extracurricular activities during the Year 2022-23', 'See PDF for details', '2023-03-01'),
(3, 'Extracurricular activities during the Year 2021-22', 'See PDF for details', '2022-03-01'),
(4, 'Extracurricular activities during the Year 2019-20', 'See PDF for details', '2020-03-01'),
(5, 'Extracurricular activities during the Year 2018-19', 'See PDF for details', '2019-03-01'),
(6, 'Extracurricular activities during the Year 2017-18', 'See PDF for details', '2018-03-01');

-- Sahaya Events (as extra curricular)
INSERT INTO cse_extra_curricular (id, title, description, date) VALUES
(7, 'Sahaya 2023-24', 'Social Services - Sahaya event for 2023-24', '2024-03-01'),
(8, 'Sahaya 2022-23', 'Social Services - Sahaya event for 2022-23', '2023-03-01'),
(9, 'Sahaya 2021-22', 'Social Services - Sahaya event for 2021-22', '2022-03-01'),
(10, 'Sahaya 2020-21', 'Social Services - Sahaya event for 2020-21', '2021-03-01'),
(11, 'Sahaya 2019-20', 'Social Services - Sahaya event for 2019-20', '2020-03-01'),
(12, 'Sahaya 2018-19', 'Social Services - Sahaya event for 2018-19', '2019-03-01'),
(13, 'Sahaya 2017-18', 'Social Services - Sahaya event for 2017-18', '2018-03-01'),
(14, 'Sahaya 2016-17', 'Social Services - Sahaya event for 2016-17', '2017-03-01'),
(15, 'Sahaya 2015-16', 'Social Services - Sahaya event for 2015-16', '2016-03-01'),
(16, 'Sahaya 2014-15', 'Social Services - Sahaya event for 2014-15', '2015-03-01'),
(17, 'Sahaya 2013-14', 'Social Services - Sahaya event for 2013-14', '2014-03-01'),
(18, 'Sahaya 2012-13', 'Social Services - Sahaya event for 2012-13', '2013-03-01');

-- Merit Scholarships (by year, as per PDFs)
INSERT INTO cse_merit_scholarships (id, student_name, academic_year, scholarship_type, amount) VALUES
(1, '', '2018-19', 'Merit Scholarship', 0),
(2, '', '2017-18', 'Merit Scholarship', 0),
(3, '', '2016-17', 'Merit Scholarship', 0),
(4, '', '2015-16', 'Merit Scholarship', 0),
(5, '', '2014-15', 'Merit Scholarship', 0),
(6, '', '2013-14', 'Merit Scholarship', 0);

-- Academic Toppers (by year, as per PDFs)
INSERT INTO cse_merit_scholarships (id, student_name, academic_year, scholarship_type, amount) VALUES
(7, '', '2024-25', 'Academic Topper', 0),
(8, '', '2023-24', 'Academic Topper', 0),
(9, '', '2022-23', 'Academic Topper', 0),
(10, '', '2021-22', 'Academic Topper', 0),
(11, '', '2020-21', 'Academic Topper', 0),
(12, '', '2019-20', 'Academic Topper', 0),
(13, '', '2018-19', 'Academic Topper', 0),
(14, '', '2017-18', 'Academic Topper', 0);

-- Training Activities
INSERT INTO cse_training_activities (id, title, description, date) VALUES
(1, 'Python Bootcamp', 'Intensive Python training for 2nd years.', '2024-01-20'),
(2, 'Placement Training', 'Aptitude and soft skills training.', '2023-12-10'),
(3, 'FDPs Attended by Faculty 2024-25', 'Faculty attended FDPs in 2024-25. See PDF for details.', '2024-07-01'),
(4, 'FDPs Attended by Faculty 2023-24', 'Faculty attended FDPs in 2023-24. See PDF for details.', '2023-07-01'),
(5, 'FDPs Attended by Faculty 2022-23', 'Faculty attended FDPs in 2022-23. See PDF for details.', '2022-07-01'),
(6, 'FDPs Attended by Faculty 2021-22', 'Faculty attended FDPs in 2021-22. See PDF for details.', '2021-07-01'),
(7, 'FDPs Attended by Faculty 2020-21', 'Faculty attended FDPs in 2020-21. See PDF for details.', '2020-07-01'),
(8, 'FDPs Attended by Faculty 2019-20', 'Faculty attended FDPs in 2019-20. See PDF for details.', '2019-07-01'),
(9, 'FDPs Attended by Faculty 2018-19', 'Faculty attended FDPs in 2018-19. See PDF for details.', '2018-07-01'),
(10, 'FDPs Attended by Faculty 2017-18', 'Faculty attended FDPs in 2017-18. See PDF for details.', '2017-07-01'),
(11, 'FDPs Attended by Faculty 2016-17', 'Faculty attended FDPs in 2016-17. See PDF for details.', '2016-07-01'),
(12, 'FDPs Attended by Faculty 2015-16', 'Faculty attended FDPs in 2015-16. See PDF for details.', '2015-07-01'),
(13, 'FDPs Attended by Faculty 2014-15', 'Faculty attended FDPs in 2014-15. See PDF for details.', '2014-07-01'),
(14, 'FDPs Conducted by Department', 'FDPs conducted by the department. See PDF for details.', '2024-07-01');

-- Technical Association
INSERT INTO cse_technical_association (id, name, description) VALUES
(1, 'CSI Student Chapter', 'Active student chapter organizing technical events.'),
(2, 'Code Club', 'Coding club for competitive programming.'),
(3, 'Technical Association', 'Organizes workshops, seminars, and technical fests for CSE students.');

-- Workshops
-- Add workshops conducted (from frontend)
INSERT INTO cse_training_activities (id, title, description, date) VALUES
(15, 'Workshop on AI & ML', 'Hands-on workshop on Artificial Intelligence and Machine Learning.', '2024-02-15'),
(16, 'Web Development Workshop', 'Workshop on modern web development technologies.', '2023-09-10');

-- Board of Studies Members
-- If you want to create a BOS table, here is the data:
-- CREATE TABLE cse_bos_members (id INT PRIMARY KEY, name VARCHAR(255), designation VARCHAR(255), organization VARCHAR(255), position VARCHAR(255));
-- INSERT INTO cse_bos_members (id, name, designation, organization, position) VALUES
-- (1, 'Dr. D Jaya Kumari', 'Professor & HOD', 'Dept of CSE, SVEC', 'Chairperson'),
-- (2, 'Dr. A Krishna Mohan', 'Professor of CSE', 'JNTUK, Kakinada', 'University Nominee'),
-- (3, 'Dr. R.B.V Subramaanyam', 'Professor of CSE', 'NITW', 'Academic Expert'),
-- (4, 'Dr. S Pallam Setty', 'Professor of CSE', 'Andhra University', 'Academic Expert'),
-- (5, 'Mr. SrinivasaRaju Vuppalapati', 'Senior Consultant', 'MSR IT Services LLP', 'Industry Expert'),
-- (6, 'Mr. Eedala Rambabu', 'Member of Technical Staff2', 'Amadeus, Bangalore', 'Alumni CSE Dept'),
-- (7, 'All the Faculty Members in the CSE Dept.', '', '', 'Members in BOS');

-- Board of Studies Meeting Minutes
-- If you want to create a BOS_minutes table, here is the data:
-- CREATE TABLE cse_bos_minutes (id INT PRIMARY KEY, title VARCHAR(255), date DATE, url TEXT);
-- INSERT INTO cse_bos_minutes (id, title, date, url) VALUES
-- (1, 'Minutes of 8th meeting of the Board of Studies, dated 19.07.2025', '2025-07-19', 'http://srivasaviengg.ac.in/uploads/Minutes of 8th meeting of the Board of Studies, dates 19.07.2025.pdf'),
-- (2, 'Minutes of 7th meeting of the Board of Studies, dated 18.07.2024', '2024-07-18', 'http://srivasaviengg.ac.in/uploads/cst/Minutes of 7th BOS Meeting_18.07.2024.pdf'),
-- (3, 'Minutes of 6th meeting of the Board of Studies, dated 25.07.2022', '2022-07-25', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%206th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2025.07.2022.pdf'),
-- (4, 'Minutes of 5th meeting of the Board of Studies, dated 02.09.2021', '2021-09-02', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%205th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2002.09.2021.pdf'),
-- (5, 'Minutes of 4th meeting of the Board of Studies, dated 29.12.2020', '2020-12-29', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%204th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2029.12.2020.pdf'),
-- (6, 'Minutes of 3rd meeting of the Board of Studies, dated 31.05.2020', '2020-05-31', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%203rd%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2031.05.2020.pdf'),
-- (7, 'Minutes of 2nd meeting of the Board of Studies, dated 20.04.2019', '2019-04-20', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%202nd%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2020.04.2019.pdf'),
-- (8, 'Minutes of 1st meeting of the Board of Studies, dated 02.06.2018', '2018-06-02', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%201st%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%20%2002.06.2018.pdf');
