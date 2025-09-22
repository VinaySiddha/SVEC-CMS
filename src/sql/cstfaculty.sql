-- DROP TABLE IF EXISTS timetables;
-- DROP TABLE IF EXISTS Physical_Facilities;

-- CREATE TABLE cst_department_overview (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   hod_name VARCHAR(255),
--   hod_image_url VARCHAR(255),
--   hod_email VARCHAR(255),
--   hod_qualification VARCHAR(255),
--   description TEXT
-- );

-- INSERT INTO cst_department_overview (hod_name, hod_image_url, hod_email, hod_qualification, description) VALUES
-- ('Dr. D. Jaya Kumari', '/cse_hod1.jpeg', 'hod_cst@srivasaviengg.ac.in', 'Ph.D in Computer Science, M.Tech CSE', 'CST Department came into inception from 2019 onwards with an intake of 60 seats in B.Tech');

-- CREATE TABLE cst_bos_members (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   designation VARCHAR(255),
--   organization VARCHAR(255),
--   position_in_job VARCHAR(255)
-- );

-- CREATE TABLE cst_bos_minutes (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   meeting_no VARCHAR(20),
--   meeting_date DATE,
--   file_url VARCHAR(255)
-- );


-- -- BOS Members
-- INSERT INTO cst_bos_members (dept, name, designation, organization, position_in_job) VALUES
-- ('cst', 'Dr. D Jaya Kumari', 'Professor & HOD', 'Dept of CSE, SVEC', 'Chairperson'),
-- ('cst', 'Dr. A Krishna Mohan', 'Professor of CSE', 'JNTUK, Kakinada', 'University Nominee'),
-- ('cst', 'Dr. R.B.V Subramaanyam', 'Professor of CSE', 'NITW', 'Academic Expert'),
-- ('cst', 'Dr. S Pallam Setty', 'Professor of CSE', 'Andhra University', 'Academic Expert'),
-- ('cst', 'Mr. SrinivasaRaju Vuppalapati', 'Senior Consultant', 'MSR IT Services LLP', 'Industry Expert'),
-- ('cst', 'Mr. Eedala Rambabu', 'Member of Technical Staff2', 'Amadeus, Bangalore', 'Alumni CSE Dept'),
-- ('cst', 'All the Faculty Members in the CSE Dept.', NULL, NULL, 'Members in BOS');

-- -- BOS Meeting Minutes
-- INSERT INTO cst_bos_minutes (dept, meeting_no, meeting_date, file_url) VALUES
-- ('cst', '8th', '2025-07-19', 'http://srivasaviengg.ac.in/uploads/Minutes of 8th meeting of the Board of Studies, dates 19.07.2025.pdf'),
-- ('cst', '7th', '2024-07-18', 'http://srivasaviengg.ac.in/uploads/cst/Minutes of 7th BOS Meeting_18.07.2024.pdf'),
-- ('cst', '6th', '2022-07-25', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%206th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2025.07.2022.pdf'),
-- ('cst', '5th', '2021-09-02', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%205th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2002.09.2021.pdf'),
-- ('cst', '4th', '2020-12-29', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%204th%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2029.12.2020.pdf'),
-- ('cst', '3rd', '2020-05-31', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%203rd%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2031.05.2020.pdf'),
-- ('cst', '2nd', '2019-04-20', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%202nd%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%2020.04.2019.pdf'),
-- ('cst', '1st', '2018-06-02', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Minutes%20of%201st%20%20meeting%20of%20the%20Board%20of%20Studies,%20dated%20%2002.06.2018.pdf');

-- CREATE TABLE cst_physical_facilities (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   category VARCHAR(50) NOT NULL, -- e.g. 'Class Rooms', 'Seminar Halls', 'Laboratories'
--   title VARCHAR(255),
--   description TEXT,
--   file_url VARCHAR(255),
--   gallery JSON,
--   lab_details JSON -- for labs: array of {name, configuration, usage, location, systems}
-- );


-- INSERT INTO cst_physical_facilities (dept, category, title, description, file_url, gallery, lab_details) VALUES
-- -- Class Rooms
-- ('cst', 'Class Rooms', 'Class Rooms with ICT Enabled Facilities', NULL, 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Classrooms.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-I 2025-26', NULL, 'https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2025-26_ III, V, VII SEM _CST.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-II 2024-25', NULL, 'https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Time%20Table_2024-25_%20II%20SEM%20_CST%20(1).pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-I 2024-25', NULL, 'https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Timetable_A.Y%20for%20Sem-I%202024-25.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-II 2023-24', NULL, 'https://srivasaviengg.ac.in/uploads/cst/CST_Master%20Time%20Table_2023-24_%20II%20SEM%20_CST.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-I 2023-24', NULL, 'https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2022-23_ III, V, VII SEM _CST.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-I 2022-23', NULL, 'https://srivasaviengg.ac.in/uploads/cst/Master Time Table_2022-23_ III, V, VII SEM _CST.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-II 2023-24', NULL, 'https://srivasaviengg.ac.in/uploads/uploads/cst/CST_Master Time Table_2022-23_ II SEM _CST.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-I 2022-23', NULL, 'https://srivasaviengg.ac.in/uploads/cst/CST_Master Time Table_A.Y. 2022-23_ I SEM.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-II 2021-22', NULL, 'https://srivasaviengg.ac.in/uploads/cst/Master Time Table _CST_II SEM_A.Y 2021-22.pdf', '[]', NULL),
-- ('cst', 'Class Rooms', 'Master Timetable A.Y for Sem-I 2021-22', NULL, 'https://srivasaviengg.ac.in/uploads/cst/Master Time Table _CST_I SEM_A.Y 2021-22.pdf', '[]', NULL),

-- -- Seminar Halls
-- ('cst', 'Seminar Halls', 'Seminar halls with ICT Enabled Facilities', NULL, 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/CSE_Seminar%20Halls.pdf', '[]', NULL),


-- ('cst', 'Laboratories', 'Laboratories', 
-- 'The Department has well equipped labs with the latest Configuration. Total 9 Computer Labs for UG, PG and one research lab consisting a total of 674 systems. The various servers in the server room include Oracle 11g Database Server, Intranet Server (TOMCAT), NPTEL Video/Web Server, MAT Lab Server 2012 R2, Red Hat Linux 5.0 Server, Library Automation Server, A-Mail Server, ECAP Server, LMS Server. The college has high speed internet connectivity throughout the campus through a leased line from BSNL with 1Gbps, 500Mbps from Blueifi.',
-- NULL, '[]',
-- '[
--   {
--     "name": "James Gosling Lab",
--     "configuration": "Model: HP Pro Tower 280 G9, Intel Core i5-13500 CPU @ 2.50 GHz, 16GB RAM, 500GB SSD, 21.5 LED Monitor, Multimedia Keyboard, Optical Scroll Mouse",
--     "systems": 72
--   },
--   {
--     "name": "James Gosling Lab",
--     "configuration": "Model: ASUS VIVO AIO V222 GAR_V333GA, Intel Pentium Silver J5040, 8GB RAM, 256GB SSD, 21.5 TFT Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 2
--   },
--   {
--     "name": "EF Codd Lab",
--     "configuration": "Model: HP Pro Tower 280 G9, Intel Core i5-12400 CPU @ 2.50 GHz, 16GB RAM, 500GB SSD, 19.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 68
--   },
--   {
--     "name": "EF Codd Lab",
--     "configuration": "Model: Dell Optiplex 3020, Intel Core i3-9100 CPU @ 3.60 GHz, 8GB RAM, 1TB HDD, 20.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 6
--   },
--   {
--     "name": "Linus Torvalds Lab",
--     "configuration": "Model: HP Pro Tower 280 G9, Intel core i3-10100 CPU @ 3.64 GHz, 8GB RAM, 500GB SSD, 19.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 72
--   },
--   {
--     "name": "PGCP Lab",
--     "configuration": "Model: Acer Vertion Desktop System, Intel Core i3-8100 CPU @ 2.65 GHz, 8GB RAM, 1TB HDD, 21.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 71
--   },
--   {
--     "name": "PGCP Lab",
--     "configuration": "Model: Acer Vertion Desktop System, Intel Core i5-7400 CPU @ 3.00 GHz, 4GB RAM, 1TB HDD, 19.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 2
--   },
--   {
--     "name": "R&D Lab",
--     "configuration": "Model: Acer Vertion Desktop System, Intel Core i5-7400 CPU @ 3.00 GHz, 4GB RAM, 1TB HDD, 17.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "systems": 3
--   },
--   {
--     "name": "R&D Lab",
--     "configuration": "Model: Dell 7D49KQR, Intel Core i5-7400 CPU @ 3.00 GHz, 4GB RAM, 1TB HDD, 21.5 LED Monitor, Multimedia keyboard, Optical Mouse",
--     "systems": 7
--   },
--   {
--     "name": "Yellow Lab",
--     "configuration": "Model: DELL OPTI PLEX 3070, Intel Core i3, 9th Gen, 8GB RAM, 1TB HDD, 20.5 TFT Monitor, Multimedia Keyboard, Optical Scroll Mouse",
--     "usage": "Placements and Training",
--     "systems": 72
--   },
--   {
--     "name": "Pink Lab",
--     "configuration": "Model: DELL OPTI PLEX 3070, Intel Core i3, 9th Gen, 8GB RAM, 1TB HDD, 20.5 TFT Monitor, Multimedia Keyboard, Optical Scroll Mouse",
--     "usage": "Placements and Training",
--     "systems": 72
--   },
--   {
--     "name": "Orange Lab",
--     "configuration": "Model: DELL OPTI PLEX 3070, Intel Core i3, 9th Gen, 8GB RAM, 1TB HDD, 20.5 TFT Monitor, Multimedia Keyboard, Optical Scroll Mouse",
--     "usage": "Placements and Training",
--     "systems": 72
--   },
--   {
--     "name": "Green Lab",
--     "configuration": "Model: DELL OPTI PLEX 3070, Intel Core i3, 9th Gen, 8GB RAM, 1TB HDD, 20.5 TFT Monitor, Multimedia Keyboard, Optical Scroll Mouse",
--     "usage": "Placements and Training",
--     "systems": 72
--   },
--   {
--     "name": "Brown Lab",
--     "configuration": "Model: DELL OPTI PLEX 3070, Intel Core i3, 9th Gen, 8GB RAM, 1TB HDD, 20.5 TFT Monitor, Multimedia Keyboard, Optical Scroll Mouse",
--     "usage": "Placements and Training",
--     "systems": 72
--   },
--   {
--     "name": "PG CP Lab",
--     "configuration": "Model: Acer Vertion I3 Desktop System, Intel Core i3 -8100, 8th Gen, 8GB DDR4 RAM, 1TB HDD, 21.5 LED Monitor, USB Keyboard, USB Optical Mouse",
--     "usage": "AJWT, OOPS through C++ Lab",
--     "systems": 70
--   },
--   {
--     "name": "R&D Lab",
--     "configuration": "Model: Acer Vertion Desktop System, Intel Core i5-7400 CPU @ 3.00 GHz, 4GB RAM, 1TB HDD, 17.5 LED Monitor, Multimedia Keyboard, Optical Mouse",
--     "location": "B-Block, First Floor",
--     "usage": "To Carryout Research Activities by Students and Faculty Members",
--     "systems": 30
--   }
-- ]'
-- );
-- Laboratories (all labs in one row, lab_details as JSON array)

-- Add all labs similarly
-- CREATE TABLE cst_faculty_development (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   category VARCHAR(50) NOT NULL, -- 'FDP Attended', 'FDP Conducted', etc.
--   title VARCHAR(255) NOT NULL,
--   year VARCHAR(10),
--   file_url VARCHAR(255),
--   gallery JSON
-- );


-- INSERT INTO cst_faculty_development (dept, category, title, year, file_url, gallery) VALUES
-- ('cst', 'FDP Attended', 'FDPs attended by the Faculty', '2024-25', 'https://srivasaviengg.ac.in/uploads/cst/CST%20FDP\'s%20A.Y%202024-2025.pdf', '[]'),
-- ('cst', 'FDP Attended', 'FDPs attended by the Faculty', '2023-24', 'https://srivasaviengg.ac.in/uploads/cst/CST%20FDPs%20in%20A.Y%202023-2024.pdf', '[]'),
-- ('cst', 'FDP Attended', 'FDPs attended by the Faculty', '2021-22', 'https://srivasaviengg.ac.in/uploads/cst/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202021-2022_CST.pdf', '[]'),
-- ('cst', 'FDP Conducted', 'FDPs conducted by the Department to the Faculty', NULL, 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20faculty.pdf', '[]'),
-- ('cst', 'FDPs/ Workshops/ Training Programmes Conducted', 'FDPs conducted by the Department to the Faculty', NULL, 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20facultys.pdf', '[]'),
-- ('cst', 'Gallery', 'FDP Gallery', NULL, NULL, '["https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13-16.jpg","https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13.jpg","https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-10-01-17.jpg","https://srivasaviengg.ac.in/images/departments/cst/FDP-2022100117.jpg"]');

-- CREATE TABLE cst_faculty_achievements (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   category VARCHAR(50) NOT NULL, -- e.g. 'Journal Publications', 'Conferences', etc.
--   title VARCHAR(255) NOT NULL,
--   author VARCHAR(255),
--   year VARCHAR(10),
--   file_url VARCHAR(255)
-- );

-- INSERT INTO cst_faculty_achievements (dept, category, title, author, year, file_url) VALUES
-- ('cst', 'Journal Publications', 'AI in Healthcare', 'Dr. A. Kumar', '2024', 'https://srivasaviengg.ac.in/uploads/cst/ai_healthcare.pdf'),
-- ('cst', 'Conferences', 'Blockchain Trends', 'Dr. B. Rao', '2023', 'https://srivasaviengg.ac.in/uploads/cst/blockchain_trends.pdf'),
-- ('cst', 'Book Publications', 'Data Science Essentials', 'Dr. C. Reddy', '2022', 'https://srivasaviengg.ac.in/uploads/cst/data_science_book.pdf'),
-- ('cst', 'Certifications', 'AWS Certified Solutions Architect', 'Dr. D. Jaya Kumari', '2024', 'https://srivasaviengg.ac.in/uploads/cst/aws_certification.pdf'),
-- ('cst', 'Patents', 'Smart IoT Device', 'Dr. E. Sharma', '2023', 'https://srivasaviengg.ac.in/uploads/cst/smart_iot_patent.pdf'),
-- ('cst', 'Research Supervisors', 'PhD Supervisor', 'Dr. F. Gupta', '2024', NULL),
-- ('cst', 'Faculty Out-Reach', 'Community Coding Camp', 'Dr. G. Singh', '2023', 'https://srivasaviengg.ac.in/uploads/cst/coding_camp.pdf');

-- CREATE TABLE cst_merit_scholarships (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   academic_year VARCHAR(20) NOT NULL,
--   particulars VARCHAR(255) NOT NULL,
--   students_benefited INT NOT NULL,
--   scholarship_amount INT NOT NULL,
--   gallery JSON
-- );
-- INSERT INTO cst_merit_scholarships (dept, academic_year, particulars, students_benefited, scholarship_amount, gallery) VALUES
-- ('cst', '2023-24', 'Academic Toppers', 21, 30750, '["https://srivasaviengg.ac.in/uploads/cst/20231014_123258PM_ByGPSMapCamera.jpg","https://srivasaviengg.ac.in/uploads/cst/20231014_123634pm_ByGPSMapCamera.jpg","https://srivasaviengg.ac.in/images/departments/cst/cstat1.jpeg","https://srivasaviengg.ac.in/images/departments/cst/cstat2.jpeg","https://srivasaviengg.ac.in/images/departments/cst/cstat3.jpeg","https://srivasaviengg.ac.in/images/departments/cst/cstat4.jpeg","https://srivasaviengg.ac.in/images/departments/cst/cstat5.jpeg","https://srivasaviengg.ac.in/images/departments/cst/cstat6.jpeg"]'),
-- ('cst', '2022-23', 'Academic Toppers', 7, 7500, '[]'),
-- ('cst', '2021-22', 'Academic Toppers', 15, 16250, '[]');

-- CREATE TABLE cst_scud_activities (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   year VARCHAR(20) NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   file_url VARCHAR(255),
--   gallery JSON
-- );

-- INSERT INTO cst_scud_activities (dept, year, title, file_url, gallery) VALUES
-- ('cst', '2022-23', 'SCUD Activities during the year 2022-23', 'https://srivasaviengg.ac.in/uploads/cst/SCUD%20summary_22-23.pdf', '[]'),
-- ('cst', '2021-22', 'SCUD Activities during the year 2021-22', 'https://srivasaviengg.ac.in/uploads/SCUD%20summary_%2021-22.pdf', '[]'),
-- ('cst', '2023', 'TECHFEST 2K23', NULL, '["https://srivasaviengg.ac.in/images/departments/cst/t.jpeg","https://srivasaviengg.ac.in/images/departments/cst/t1.jpeg"]'),
-- ('cst', '2023', 'HACKOVERFLOW 2K23', NULL, '["https://srivasaviengg.ac.in/images/departments/cst/t.jpeg","https://srivasaviengg.ac.in/images/departments/cst/t1.jpeg"]'),
-- ('cst', '2022', "FRESHER'S 2K22", NULL, '["https://srivasaviengg.ac.in/images/departments/cst/f.jpeg","https://srivasaviengg.ac.in/images/departments/cst/f1.jpeg","https://srivasaviengg.ac.in/images/departments/cst/f2.jpeg","https://srivasaviengg.ac.in/images/departments/cst/f3.jpeg"]'),
-- ('cst', '2022', "ENGINEER'S DAY 2K22", NULL, '["https://srivasaviengg.ac.in/images/departments/cst/ed.jpeg","https://srivasaviengg.ac.in/images/departments/cst/ed1.jpeg"]'),
-- ('cst', '2022', "FAREWELL 2K22", NULL, '["https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_1.jpeg","https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_2.jpeg","https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_3.jpeg","https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_4.jpeg","https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_5.jpeg","https://srivasaviengg.ac.in/images/departments/cst/farewell_2k22_6.jpeg"]'),
-- ('cst', '2022', "HACKOVERFLOW 2K22", NULL, '["https://srivasaviengg.ac.in/images/departments/cst/h.jpeg","https://srivasaviengg.ac.in/images/departments/cst/h1.jpeg"]'),
-- ('cst', '2022', "SCUD VERVE 2K22", NULL, '["https://srivasaviengg.ac.in/images/departments/cst/scud1.jpeg","https://srivasaviengg.ac.in/images/departments/cst/scud2.jpeg","https://srivasaviengg.ac.in/images/departments/cst/scud3.jpeg","https://srivasaviengg.ac.in/images/departments/cst/scud4.jpeg"]');

-- CREATE TABLE cst_newsletters (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   volume VARCHAR(50) NOT NULL,
--   issue VARCHAR(50) NOT NULL,
--   year VARCHAR(10) NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   file_url VARCHAR(255) NOT NULL
-- );


-- INSERT INTO cst_newsletters (dept, volume, issue, year, title, file_url) VALUES
-- ('cst', '12', '4', '2022', 'Newsletter Volume 12 Issue 4 2022', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue%204%202022.pdf'),
-- ('cst', '12', '3', '2022', 'Newsletter Volume 12 Issue 3 2022', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue3%202022.pdf'),
-- ('cst', '12', '2', '2021', 'Newsletter Volume 12 Issue 2 2021', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue2%202021.pdf'),
-- ('cst', '12', '1', '2021', 'Newsletter Volume 12 Issue 1 2021', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue1%202021.pdf'),
-- ('cst', '11', '4', '2021', 'Newsletter Volume 11 Issue 4 2021', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue4%202021.pdf');
-- -- Add all other newsletters similarly



-- CREATE TABLE cst_extra_curricular (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   year VARCHAR(20) NOT NULL,
--   title VARCHAR(255),
--   file_url VARCHAR(255),
--   type VARCHAR(50), -- 'activity' or 'sahaya'
--   sahaya_desc TEXT,
--   sahaya_faculty VARCHAR(255),
--   sahaya_events JSON,
--   gallery JSON
-- );

-- -- Activities
-- INSERT INTO cst_extra_curricular (dept, year, title, file_url, type, gallery)
-- VALUES
-- ('cst', '2022-23', 'Extracurricular activities during the Year 2022-23', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf', 'activity', '[]'),
-- ('cst', '2021-22', 'Extracurricular activities during the Year 2021-22', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf', 'activity', '[]'),
-- ('cst', '2019-20', 'Extracurricular activities during the Year 2019-20', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf', 'activity', '[]'),
-- ('cst', '2018-19', 'Extracurricular activities during the Year 2018-19', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf', 'activity', '[]'),
-- ('cst', '2017-18', 'Extracurricular activities during the Year 2017-18', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf', 'activity', '[]');

-- -- Sahaya
-- INSERT INTO cst_extra_curricular (dept, year, type, sahaya_desc, sahaya_faculty, sahaya_events, gallery)
-- VALUES
-- ('cst', '', 'sahaya',
--   'We come across many heart-rending incidents ... [full description here]',
--   'Mr. P. Ramamohan Rao<br />Assistant Professor',
--   '[
--     {"year":"2022-2023","url":"https://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf"},
--     {"year":"2021-2022","url":"https://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf"},
--     {"year":"2020-2021","url":"https://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf"},
--     {"year":"2019-2020","url":"https://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf"},
--     {"year":"2018-2019","url":"https://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf"},
--     {"year":"2017-2018","url":"https://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf"},
--     {"year":"2016-2017","url":"https://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf"},
--     {"year":"2015-2016","url":"https://srivasaviengg.ac.in/uploads/sahaya2015-16.pdf"},
--     {"year":"2014-2015","url":"https://srivasaviengg.ac.in/uploads/sahaya2014-15.pdf"},
--     {"year":"2013-2014","url":"https://srivasaviengg.ac.in/uploads/sahaya2013-14.pdf"},
--     {"year":"2012-2013","url":"https://srivasaviengg.ac.in/uploads/sahaya2012-13.pdf"}
--   ]',
--   '[
--     "https://srivasaviengg.ac.in/images/departments/cst/ec.jpeg",
--     "https://srivasaviengg.ac.in/images/departments/cst/ec1.jpg",
--     "https://srivasaviengg.ac.in/images/departments/cst/ec2.jpeg",
--     "https://srivasaviengg.ac.in/images/departments/cst/e3.jpeg",
--     "https://srivasaviengg.ac.in/images/departments/cst/e4.jpg",
--     "https://srivasaviengg.ac.in/images/departments/cst/e5.jpg"
--   ]'
-- );





-- CREATE TABLE cst_hackathons (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   academic_year VARCHAR(20) NOT NULL,
--   brochure_url VARCHAR(255),
--   winners_url VARCHAR(255),
--   gallery JSON
-- );

-- INSERT INTO cst_hackathons (dept, academic_year, brochure_url, winners_url, gallery) VALUES
-- ('cst', '2022-23',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackoverflow%20banner_2022_23.png',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2022-23.pdf',
--  '["https://srivasaviengg.ac.in/images/departments/cst/Hackthon_2022_23%20(1).jpg","https://srivasaviengg.ac.in/images/departments/cst/Hackthon_2022_23%20(2)%20(1).jpg"]'),

-- ('cst', '2021-22',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/broacher_2021_22.pdf',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2021-22.pdf',
--  '["https://srivasaviengg.ac.in/images/departments/cst/Hackthon%202021_22%20(1).jpeg"]'),

-- ('cst', '2019-20',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Brouchure.pdf',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20Winners_2019-20.pdf',
--  '[]'),

-- ('cst', '2018-19',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/City%20Digi%20@Hack%202K18.jpg',
--  'https://srivasaviengg.ac.in/uploads/cse_extra_activities/Hackathon%20winners_2018-19.pdf',
--  '[]');
-- Training Activities Table
-- CREATE TABLE cst_training_activities (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   academic_year VARCHAR(20) NOT NULL,
--   title VARCHAR(255),
--   file_url VARCHAR(255),
--   gallery JSON
-- );

-- -- Handbooks Table
-- CREATE TABLE cst_handbooks (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   academic_year VARCHAR(20) NOT NULL,
--   semester VARCHAR(20),
--   title VARCHAR(255),
--   file_url VARCHAR(255)
-- );

-- -- Training Activities Inserts (all years + gallery)
-- INSERT INTO cst_training_activities (dept, academic_year, title, file_url, gallery) VALUES
-- ('cst', '2022-2023', 'Training Activities during the Academic Year 2022-2023', 'https://srivasaviengg.ac.in/uploads/cst/tt_2022-23.pdf',
--   '["https://srivasaviengg.ac.in/images/departments/cst/g.jpg","https://srivasaviengg.ac.in/images/departments/cst/g1.jpg","https://srivasaviengg.ac.in/images/departments/cst/g2.jpg","https://srivasaviengg.ac.in/images/departments/cst/g3.jpg"]'),
-- ('cst', '2021-2022', 'Training Activities during the Academic Year 2021-2022', 'https://srivasaviengg.ac.in/uploads/cst/tt_2021-22.pdf',
--   '[]');

-- -- Handbooks Inserts (all years/semesters/links)
-- INSERT INTO cst_handbooks (dept, academic_year, semester, title, file_url) VALUES
-- ('cst', '2025-26', 'I-Sem', 'III Sem V23 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/CST_III SEM Handbook (1).pdf'),
-- ('cst', '2025-26', 'I-Sem', 'V Sem V23 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/CST_V SEM Handbook.pdf'),
-- ('cst', '2025-26', 'I-Sem', 'VII Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/CST_VII SEM Handbook.pdf'),

-- ('cst', '2024-25', 'II-Sem', 'IV Sem V23 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/2024-25_IV SEM Hand Book_CST.pdf'),
-- ('cst', '2024-25', 'II-Sem', 'VI Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/CST_VI Semester Handbook.pdf'),

-- ('cst', '2024-25', 'I-Sem', 'III Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/III  SEM (Autonomous) Handbook - CSTs.pdf'),
-- ('cst', '2024-25', 'I-Sem', 'V Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/V SEM  Handbook_2024-25-CST.pdf'),
-- ('cst', '2024-25', 'I-Sem', 'VII Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VII SEM  Handbook_2024-25-CST.pdf'),

-- ('cst', '2023-24', 'II-Sem', 'IV Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/2023-24_IV SEM Hand Book_CST.pdf'),
-- ('cst', '2023-24', 'II-Sem', 'VI Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VI Semester Handbook - CST.pdf'),

-- ('cst', '2023-24', 'I-Sem', 'III Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/III  SEM (Autonomous) Handbook - CST.pdf'),
-- ('cst', '2023-24', 'I-Sem', 'V Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/V SEM Handbook_V20 Regulation_2023-24.pdf'),
-- ('cst', '2023-24', 'I-Sem', 'VII Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VII SEM V20 Regulation HandBook_2023-24.pdf'),

-- ('cst', '2022-23', 'II-Sem', 'IV Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/IV Sem V20 Regulation Handbook_CST.pdf'),
-- ('cst', '2022-23', 'II-Sem', 'VI Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VI Sem V20 Regulation Handbook_CST.pdf'),
-- ('cst', '2022-23', 'II-Sem', 'VIII Sem V18 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VIII Sem V20 Regulation Handbook_CST.pdf'),

-- ('cst', '2022-23', 'I-Sem', 'III Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/III SEM V20 Regulation Handbook (CST).pdf'),
-- ('cst', '2022-23', 'I-Sem', 'V Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/V SEM CST V20(Autonomous) Handbook.pdf'),
-- ('cst', '2022-23', 'I-Sem', 'VII Sem V18 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VII SEM CST V18(Autonomous) Handbook.pdf'),

-- ('cst', '2021-22', 'II-Sem', 'IV Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/IV Semester.pdf'),
-- ('cst', '2021-22', 'II-Sem', 'VI Sem V18 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/VI Semester Handbook 13-04-2022.pdf'),

-- ('cst', '2021-22', 'I-Sem', 'III Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/III SEM CST V20 Regulation Handbook_2021-22.pdf'),
-- ('cst', '2021-22', 'I-Sem', 'V Sem V18 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/V Sem Handbook.pdf'),

-- ('cst', '2020-21', 'II-Sem', 'IV Sem V20 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst/IV SEM V18 Regulation HandBook_2020-21.pdf'),

-- ('cst', '2020-21', 'I-Sem', 'III Sem V18 Regulation Handbook', 'https://srivasaviengg.ac.in/uploads/cst//III SEM V18 Regulation HandBook_2020-21.pdf');

-- -- Teaching Faculty
-- CREATE TABLE cst_faculty (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   qualification VARCHAR(100),
--   designation VARCHAR(100),
--   profileUrl VARCHAR(255)
-- );

-- -- Technical Faculty
-- CREATE TABLE cst_technical_faculty (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   designation VARCHAR(100)
-- );

-- -- Non-Teaching Faculty
-- CREATE TABLE cst_non_teaching_faculty (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   designation VARCHAR(100)
-- );

-- INSERT INTO cst_faculty (name, qualification, designation, profileUrl) VALUES
-- ('Mr. T. Sai Mahesh', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Sai%20Mahesh.pdf'),
-- ('Mr. D. Yatesh Ramkumar', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Yatish%20Ramkumar.pdf'),
-- ('Mrs. S. Shanthi Rupa', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_SANTHI%20RUPA.pdf'),
-- ('Ms.Ch N.S.Sireesha Lakshmi', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Ms.N.S.Sireesha%20Lakshmi.pdf'),
-- ('Mr. G. Sankar', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Mr.G.Sankar.pdf'),
-- ('Mr. B. Jayachandran', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Mr.B%20Jayachandran.pdf'),
-- ('Mr. P. Prabhakaran', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Mr.P%20Prabhakaran.pdf'),
-- ('Mr. M. Raju', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Mr.M.Raju.pdf'),
-- ('Mr. U. U. Veerendra', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Mr.U.U.Veerendra.pdf'),
-- ('Ms. M. Suneetha', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Ms.%20M.%20Sunnetha.pdf'),
-- ('Ms. V. VenkataLakshmi', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Ms.%20V.%20VenkataLakshmi.pdf'),
-- ('Mr. A. Niranjana Rao', 'M.Tech', 'Asst.Professor', 'http://srivasaviengg.ac.in/faculty_profile/CST_Mr.%20A.%20Niranjana%20Rao.pdf'),
-- ('Mrs. Ch. Naga Padma Latha', 'M.Tech', 'Asst.Professor', 'https://srivasaviengg.ac.in/faculty_profile/CST_Mrs.%20Ch.%20N.%20P.%20Latha.pdf'),
-- ('Mr. B. Murali krishna', 'M.Tech', 'Asst.Professor', 'https://srivasaviengg.ac.in/faculty_profile/CST_Mr. B. Murali Krishna.pdf'),
-- ('Mr. K. Sai Ektha Kumar Naidu', 'M.Tech', 'Asst.Professor', 'https://srivasaviengg.ac.in/faculty_profile/CST_Mr. Kottagulli Sai Ektha Kumar Naidu_Faculty Web Profile.pdf');

-- INSERT INTO cst_technical_faculty (name, designation) VALUES
-- ('Mr. K.N. Suresh', 'System Admin'),
-- ('Ms. BNG Lakshmi Durga', 'Programmer'),
-- ('Mr. K.V Srinivasa Rao', 'Hardware Technician'),
-- ('Mr. G.Bhanu Prakash', 'Hardware Technician'),
-- ('Mr. P.Manikanta Gupta', 'Lab Assistant'),
-- ('Mr. Md.Arriff', 'Computer Lab Assistant'),
-- ('Mr. P.Lokesh Reddy', 'Lab Technician'),
-- ('Ms. M. Naga Harika', 'Lab Technician'),
-- ('Mr. B. Abaddalu', 'Lab Technician'),
-- ('Mr. S. Nagaraju', 'Programmer'),
-- ('Mr. N Lokesh Babu', 'Lab Technician');

-- INSERT INTO cst_non_teaching_faculty (name, designation) VALUES
-- ('Ms. U.Devi Lakshmi', 'DEO'),
-- ('Mrs. K. Bhagya Sri', 'DEO'),
-- ('Mr. D.Srinivasa Rao', 'Attender'),
-- ('Mr. M.Siva Krishna', 'Attender'),
-- ('Mrs. A.Sri Karuna Kumari', 'Attender'),
-- ('Mr. V. Venkateswara Rao', 'Attender');



-- Student Achievements Table
-- CREATE TABLE cst_student_achievements (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   category VARCHAR(100) NOT NULL,
--   title VARCHAR(200) NOT NULL,
--   description TEXT,
--   fileUrl VARCHAR(255),
--   academic_year VARCHAR(20),
--   display_order INT DEFAULT 0
-- );

-- -- Insert Data: Internships
-- INSERT INTO cst_student_achievements (category, title, fileUrl, academic_year, display_order) VALUES
-- ('Internships', 'Internships during the Academic Year 2024-25', 'https://srivasaviengg.ac.in/uploads/cst/CST_Internships during the 2024-25(prints).pdf', '2024-25', 1),
-- ('Internships', 'Internships during the Academic Year 2023-24', 'https://srivasaviengg.ac.in/uploads/cst/Internships during the 2023-24.pdf', '2023-24', 2),
-- ('Internships', 'Internships during the Academic Year 2022-23', 'https://srivasaviengg.ac.in/uploads/cst/Internships during the 2022-23.pdf', '2022-23', 3),
-- ('Internships', 'Internships during the Academic Year 2021-22', 'https://srivasaviengg.ac.in/uploads/cst/Internships during the 2021-22.pdf', '2021-22', 4);

-- -- Insert Data: Conference Publications
-- INSERT INTO cst_student_achievements (category, title, fileUrl, academic_year, display_order) VALUES
-- ('Conference Publications', 'Student Journal Publications during the Academic Year 2023-24', 'https://srivasaviengg.ac.in/uploads/cst/CST_Student_Journal publications 2023-24.docx.pdf', '2023-24', 1),
-- ('Conference Publications', 'Conferences during the Academic Year 2022-23', 'https://srivasaviengg.ac.in/uploads/cst/CST -conferences (22-23).pdf', '2022-23', 2);

-- -- Insert Data: NPTEL/Other Certifications
-- INSERT INTO cst_student_achievements (category, title, fileUrl, academic_year, display_order) VALUES
-- ('NPTEL/Other Certifications', 'NPTEL & Other Certifications during the Academic Year 2024-25', 'https://srivasaviengg.ac.in/uploads/cst/NPTEL & other certifications_CST_2024-25.pdf', '2024-25', 1),
-- ('NPTEL/Other Certifications', 'NPTEL & Other Certifications during the Academic Year 2023-24', 'https://srivasaviengg.ac.in/uploads/cst/cst  nptel 2023-24.pdf', '2023-24', 2),
-- ('NPTEL/Other Certifications', 'NPTEL & Other Certifications during the Academic Year 2022-23', 'https://srivasaviengg.ac.in/uploads/cst/CST_Nptel during & other certifications2022-23.pdf', '2022-23', 3),
-- ('NPTEL/Other Certifications', 'NPTEL Certified Student List Jan–Apr 2019', 'https://srivasaviengg.ac.in/uploads/NPTEL Certified Student List Jan_Apr_2019.pdf', '2019', 4);




-- CREATE TABLE cst_syllabus (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   type VARCHAR(100), -- e.g. 'B.Tech (CSE & CST)', 'SOC Syllabus'
--   title VARCHAR(200),
--   fileUrl VARCHAR(255),
--   academic_year VARCHAR(20)
-- );

-- INSERT INTO cst_syllabus (type, title, fileUrl, academic_year) VALUES
-- ('B.Tech (CSE & CST)', 'B.Tech V23 Syllabus', 'https://srivasaviengg.ac.in/uploads/cst/V23%20Syllabus%20Book_CSE%20&%20CST.pdf', '2023-24'),
-- ('B.Tech (CSE & CST)', 'B.Tech V20 Syllabus', 'https://srivasaviengg.ac.in/uploads/cst/B.Tech%20CST%20V20.pdf', '2020-21'),
-- ('B.Tech (CSE & CST)', 'B.Tech V18 Syllabus', 'https://srivasaviengg.ac.in/uploads/cst/B.Tech%20CST%20V18.pdf', '2018-19'),

-- ('SOC Syllabus', 'SOC Syllabus during the Academic Year 2024-25', 'https://srivasaviengg.ac.in/uploads/cst/uploads/cst/SOC_CST_2024-25.pdf', '2024-25'),
-- ('SOC Syllabus', 'SOC Syllabus during the Academic Year 2023-24', 'https://srivasaviengg.ac.in/uploads/cst/SOC_CST_2023-24.pdf', '2023-24'),
-- ('SOC Syllabus', 'SOC Syllabus during the Academic Year 2022-23', 'https://srivasaviengg.ac.in/uploads/cst/SOC_CST_2022-23.pdf', '2022-23'),
-- ('SOC Syllabus', 'SOC Syllabus during the Academic Year 2021-22', 'https://srivasaviengg.ac.in/uploads/cst/SOC_CST_2021-22.pdf', '2021-22');



-- CREATE TABLE cst_eresources (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   regulation VARCHAR(10),
--   semester VARCHAR(10),
--   subject VARCHAR(200),
--   ppt_url VARCHAR(255),
--   display_order INT
-- );

-- INSERT INTO cst_eresources (regulation, semester, subject, ppt_url, display_order) VALUES
-- ('V20', 'I', 'Problem Solving through C-Programming', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/PCPS-V20.rar', 1),
-- ('V20', 'III', 'Data Structures', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DS_V20.zip', 2),
-- ('V20', 'III', 'Computer Organization and Architecture', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/COA_notes_V20.rar', 3),
-- ('V20', 'III', 'OOP\'s through C++', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/OOPS.rar', 4),
-- ('V20', 'III', 'Managerial Economics and Financial Analysis', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/MEFA.zip', 5),
-- ('V20', 'III', 'Mathematical Foundation Of Computer Science', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/MFCS V20 material.rar', 6),
-- ('V20', 'IV', 'Design Analysis of Algorithms', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DAA Material.zip', 7),
-- ('V20', 'IV', 'Java Programming', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/Java V20 all units content.pdf', 8),
-- ('V20', 'IV', 'Software Engineering', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/SE NOTES.rar', 9),
-- ('V20', 'IV', 'Statistical Visualization using R Lab', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/SVR LAB.pdf', 10),
-- ('V20', 'V', 'Artificial Intelligence', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/AI.rar', 11),
-- ('V20', 'V', 'Data Mining', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/DATA MINING.rar', 12),
-- ('V20', 'V', 'Web Technologies', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/Web_Technologies.pdf', 13),
-- ('V20', 'VI', 'Unified Modeling Language Lab', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V20/UML LAB.pdf', 14),

-- ('V18', 'I/II', 'Programming in C for Problem Solving', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/cprogrammingppts.zip', 1),
-- ('V18', 'III', 'Object Oriented Programming for Problem Solving', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/ADSPPTS.rar', 2),
-- ('V18', 'III', 'Digital Electronics', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/DE_Cse_II_Sem.rar', 3),
-- ('V18', 'III', 'Data Mining', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/III_Sem_DM MATERIAL.rar', 4),
-- ('V18', 'IV', 'Computer Organization', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/Computer Organization.zip', 5),
-- ('V18', 'IV', 'Software Engineering', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/SEPPTs.rar', 6),
-- ('V18', 'IV', 'Python Programming', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/.rar', 7),
-- ('V18', 'IV', 'Java Programming', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/Java Materials.zip', 8),
-- ('V18', 'IV', 'Formal Languages and Automata Theory', 'https://srivasaviengg.ac.in/uploads/materials/PPT/V18/FLATPPTS.rar', 9);

-- CREATE TABLE cst_department_library (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   image_url VARCHAR(255),
--   description TEXT,
--   titles INT,
--   volumes INT,
--   faculty_incharge VARCHAR(100),
--   phone VARCHAR(30),
--   email VARCHAR(100)
-- );


-- INSERT INTO cst_department_library (image_url, description, titles, volumes, faculty_incharge, phone, email) VALUES
-- ('https://srivasaviengg.ac.in/images/departments/cse/cse-lib.jpg',
-- 'Department Library offers a variety of books related to Computer Science and Basic Science subjects. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.',
-- -- 455, 684, 'Mrs. A. Naga Jyothi, Asst. Professor', '08818-284355', 'nagajyothi.cse@srivasaviengg.ac.in');







-- CREATE TABLE cst_mous (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   organization_name VARCHAR(255),
--   from_date VARCHAR(30),
--   to_date VARCHAR(30),
--   document_url VARCHAR(255)
-- );

-- CREATE TABLE cst_industry_programs (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   academic_year VARCHAR(20),
--   title VARCHAR(255),
--   file_url VARCHAR(255)
-- );

-- INSERT INTO cst_mous (organization_name, from_date, to_date, document_url) VALUES
-- ('Roland Institute of Technology,Berhampur', '10-05-2025', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Mou Roland Principal sir sign.pdf'),
-- ('Pennant Technologies Pvt Ltd', '06-11-2024', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/MOU with Pennant Technologies Pvt Ltd.pdf'),
-- ('Blumin Software & Training Consultancy LLP', '18-06-2024', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Blumin MOU.pdf'),
-- ('Zscaler Academic Alliance Program', '08-12-2023', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/ZScalar_MOU.pdf'),
-- ('New Leaf Learning Solutions', '01-10-2023', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/SVEC- New Leaf 1-10-2023.pdf'),
-- ('NIT AP', '31-12-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/1 NITAP_MOU with activities.pdf'),
-- ('Alteryx SparkED Partner', '30-12-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/578_Alteryx SparkEd Partner_Sri Vasavi Engineering College.pdf'),
-- ('Juniper Networks', '30-11-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Juniper MOU.pdf'),
-- ('Celonis Academic Alliance', '11-11-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Celonis.pdf'),
-- ('Palo Alto Networks Cyber Security Academy', '08-11-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Paaloalto.pdf'),
-- ('Blue Prism Academia Program', '01-11-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Sri Vasavi Engineering College.pdf'),
-- ('Eduskills', '31-10-2022', 'Till Date', 'https://srivasaviengg.ac.in/uploads/csemous/Eduskills MOU with PICS.pdf');

-- INSERT INTO cst_industry_programs (academic_year, title, file_url) VALUES
-- ('2024-25', 'Various Programs organized during Academic Year 2024-25', 'https://www.srivasaviengg.ac.in/uploads/csemous/Industry data ( 2024-2025).pdf'),
-- ('2023-24', 'Various Programs organized during Academic Year 2023-24', 'https://www.srivasaviengg.ac.in/uploads/csemous/Industry%20data%20%202023-24.pdf'),
-- ('2022-23', 'Various Programs organized during Academic Year 2022-23', 'https://www.srivasaviengg.ac.in/uploads/csemous/Industry%20data%20%202022-23.pdf'),
-- ('2021-22', 'Various Programs organized during Academic Year 2021-22', 'https://srivasaviengg.ac.in/uploads/csemous/csemous_2021-2022.pdf'),
-- ('2020-21', 'Various Programs organized during Academic Year 2020-21', 'https://srivasaviengg.ac.in/uploads/csemous/csemous_2020-2021.pdf');


-- DROP TABLE IF EXISTS placements;

-- CREATE TABLE placements (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   dept VARCHAR(20) NOT NULL,
--   batch VARCHAR(20) NOT NULL,
--   title VARCHAR(255),
--   file_url VARCHAR(255),
--   gallery JSON -- Array of image objects: [{ "url": "...", "caption": "...", ... }]
-- );

-- INSERT INTO placements (dept, batch, title, file_url, gallery) VALUES
-- ('cst', '2021-25', 'Placements for Batch 2021-25', 'https://srivasaviengg.ac.in/uploads/cst/2024-25 CST PLACEMENTSS.pdf',
--   '[{"url":"https://srivasaviengg.ac.in/images/placement/WhatsApp%20Image%202025-07-16%20at%2011.02.08%20AM.jpeg","caption":"Placements 2021-24"}]'),
-- ('cst', '2020-24', 'Placements for Batch 2020-24', 'https://srivasaviengg.ac.in/uploads/cst/2020-24 CST PLACEMENTS DATA -23.7.2023.pdf', '[]'),
-- ('cst', '2019-23', 'Placements for Batch 2019-23', 'https://srivasaviengg.ac.in/uploads/cst/2019-23 CST PLACEMENTS DATA.pdf',
--   '[{"url":"https://srivasaviengg.ac.in/uploads/cst/pilla.jpeg","caption":"IBM 12 LPA - P. Jahnavi Sri Naidu","roll_no":"19A81A0650","name":"P. Jahnavi Sri Naidu","company":"IBM","package":"12 LPA"},
--     {"url":"https://srivasaviengg.ac.in/images/departments/cst/cst placement.jpg","caption":"CST Placement - IBM","roll_no":"19A81A0650","name":"P. Jahnavi Sri Naidu","company":"IBM","package":"12 LPA"},
--     {"url":"https://srivasaviengg.ac.in/images/departments/cst/cst placement.jpg","caption":"CST Placement - TCS CodeVita","roll_no":"19A81A0650","name":"P. Jahnavi Sri Naidu","company":"TCS CODEVITA","package":"7 LPA"}
--   ]');