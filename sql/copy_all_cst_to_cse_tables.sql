-- Comprehensive CST to CSE Tables Copy Script
-- This script copies ALL CST tables to their CSE equivalents
-- Database: svec_cms

USE svec_cms;

-- Function to show progress
SELECT 'Starting CST to CSE tables copy process...' AS Status;

-- 1. cst_sahaya_events -> cse_sahaya_events
CREATE TABLE IF NOT EXISTS cse_sahaya_events LIKE cst_sahaya_events;
INSERT IGNORE INTO cse_sahaya_events SELECT * FROM cst_sahaya_events;

-- 2. cst_faculty -> cse_faculty  
CREATE TABLE IF NOT EXISTS cse_faculty LIKE cst_faculty;
INSERT IGNORE INTO cse_faculty SELECT * FROM cst_faculty;

-- 3. cst_technical_faculty -> cse_technical_faculty
CREATE TABLE IF NOT EXISTS cse_technical_faculty LIKE cst_technical_faculty;
INSERT IGNORE INTO cse_technical_faculty SELECT * FROM cst_technical_faculty;

-- 4. cst_non_teaching_faculty -> cse_non_teaching_faculty
CREATE TABLE IF NOT EXISTS cse_non_teaching_faculty LIKE cst_non_teaching_faculty;
INSERT IGNORE INTO cse_non_teaching_faculty SELECT * FROM cst_non_teaching_faculty;

-- 5. cst_student_achievements -> cse_student_achievements
CREATE TABLE IF NOT EXISTS cse_student_achievements LIKE cst_student_achievements;
INSERT IGNORE INTO cse_student_achievements SELECT * FROM cst_student_achievements;

-- 6. cst_faculty_achievements -> cse_faculty_achievements
CREATE TABLE IF NOT EXISTS cse_faculty_achievements LIKE cst_faculty_achievements;
INSERT IGNORE INTO cse_faculty_achievements SELECT * FROM cst_faculty_achievements;

-- 7. cst_placements -> cse_placements
CREATE TABLE IF NOT EXISTS cse_placements LIKE cst_placements;
INSERT IGNORE INTO cse_placements SELECT * FROM cst_placements;

-- 8. cst_placements_gallery -> cse_placements_gallery
CREATE TABLE IF NOT EXISTS cse_placements_gallery LIKE cst_placements_gallery;
INSERT IGNORE INTO cse_placements_gallery SELECT * FROM cst_placements_gallery;

-- 9. cst_hackathons -> cse_hackathons
CREATE TABLE IF NOT EXISTS cse_hackathons LIKE cst_hackathons;
INSERT IGNORE INTO cse_hackathons SELECT * FROM cst_hackathons;

-- 10. cst_hackathons_gallery -> cse_hackathons_gallery
CREATE TABLE IF NOT EXISTS cse_hackathons_gallery LIKE cst_hackathons_gallery;
INSERT IGNORE INTO cse_hackathons_gallery SELECT * FROM cst_hackathons_gallery;

-- 11. cst_handbooks -> cse_handbooks
CREATE TABLE IF NOT EXISTS cse_handbooks LIKE cst_handbooks;
INSERT IGNORE INTO cse_handbooks SELECT * FROM cst_handbooks;

-- 12. cst_eresources -> cse_eresources
CREATE TABLE IF NOT EXISTS cse_eresources LIKE cst_eresources;
INSERT IGNORE INTO cse_eresources SELECT * FROM cst_eresources;

-- 13. cst_mous -> cse_mous
CREATE TABLE IF NOT EXISTS cse_mous LIKE cst_mous;
INSERT IGNORE INTO cse_mous SELECT * FROM cst_mous;

-- 14. cst_syllabus -> cse_syllabus
CREATE TABLE IF NOT EXISTS cse_syllabus LIKE cst_syllabus;
INSERT IGNORE INTO cse_syllabus SELECT * FROM cst_syllabus;

-- 15. cst_physical_facilities -> cse_physical_facilities
CREATE TABLE IF NOT EXISTS cse_physical_facilities LIKE cst_physical_facilities;
INSERT IGNORE INTO cse_physical_facilities SELECT * FROM cst_physical_facilities;

-- 16. cst_department_library -> cse_department_library
CREATE TABLE IF NOT EXISTS cse_department_library LIKE cst_department_library;
INSERT IGNORE INTO cse_department_library SELECT * FROM cst_department_library;

-- 17. cst_merit_scholarships -> cse_merit_scholarships
CREATE TABLE IF NOT EXISTS cse_merit_scholarships LIKE cst_merit_scholarships;
INSERT IGNORE INTO cse_merit_scholarships SELECT * FROM cst_merit_scholarships;

-- 18. cst_merit_scholarships_gallery -> cse_merit_scholarships_gallery
CREATE TABLE IF NOT EXISTS cse_merit_scholarships_gallery LIKE cst_merit_scholarships_gallery;
INSERT IGNORE INTO cse_merit_scholarships_gallery SELECT * FROM cst_merit_scholarships_gallery;

-- 19. cst_technical_association_gallery -> cse_technical_association_gallery
CREATE TABLE IF NOT EXISTS cse_technical_association_gallery LIKE cst_technical_association_gallery;
INSERT IGNORE INTO cse_technical_association_gallery SELECT * FROM cst_technical_association_gallery;

-- 20. cst_training_activities -> cse_training_activities
CREATE TABLE IF NOT EXISTS cse_training_activities LIKE cst_training_activities;
INSERT IGNORE INTO cse_training_activities SELECT * FROM cst_training_activities;

-- 21. cst_training_activities_gallery -> cse_training_activities_gallery
CREATE TABLE IF NOT EXISTS cse_training_activities_gallery LIKE cst_training_activities_gallery;
INSERT IGNORE INTO cse_training_activities_gallery SELECT * FROM cst_training_activities_gallery;

-- 22. cst_extra_curricular -> cse_extra_curricular
CREATE TABLE IF NOT EXISTS cse_extra_curricular LIKE cst_extra_curricular;
INSERT IGNORE INTO cse_extra_curricular SELECT * FROM cst_extra_curricular;

-- 23. cst_extra_curricular_gallery -> cse_extra_curricular_gallery
CREATE TABLE IF NOT EXISTS cse_extra_curricular_gallery LIKE cst_extra_curricular_gallery;
INSERT IGNORE INTO cse_extra_curricular_gallery SELECT * FROM cst_extra_curricular_gallery;

-- 24. cst_newsletters -> cse_newsletters
CREATE TABLE IF NOT EXISTS cse_newsletters LIKE cst_newsletters;
INSERT IGNORE INTO cse_newsletters SELECT * FROM cst_newsletters;

-- 25. cst_workshops -> cse_workshops
CREATE TABLE IF NOT EXISTS cse_workshops LIKE cst_workshops;
INSERT IGNORE INTO cse_workshops SELECT * FROM cst_workshops;

-- 26. cst_workshops_gallery -> cse_workshops_gallery
CREATE TABLE IF NOT EXISTS cse_workshops_gallery LIKE cst_workshops_gallery;
INSERT IGNORE INTO cse_workshops_gallery SELECT * FROM cst_workshops_gallery;

-- 27. cst_faculty_development -> cse_faculty_development
CREATE TABLE IF NOT EXISTS cse_faculty_development LIKE cst_faculty_development;
INSERT IGNORE INTO cse_faculty_development SELECT * FROM cst_faculty_development;

-- 28. cst_faculty_development_gallery -> cse_faculty_development_gallery
CREATE TABLE IF NOT EXISTS cse_faculty_development_gallery LIKE cst_faculty_development_gallery;
INSERT IGNORE INTO cse_faculty_development_gallery SELECT * FROM cst_faculty_development_gallery;

-- 29. cst_scud_activities -> cse_scud_activities
CREATE TABLE IF NOT EXISTS cse_scud_activities LIKE cst_scud_activities;
INSERT IGNORE INTO cse_scud_activities SELECT * FROM cst_scud_activities;

-- 30. cst_bos_members -> cse_bos_members
CREATE TABLE IF NOT EXISTS cse_bos_members LIKE cst_bos_members;
INSERT IGNORE INTO cse_bos_members SELECT * FROM cst_bos_members;

-- 31. cst_bos_minutes -> cse_bos_minutes
CREATE TABLE IF NOT EXISTS cse_bos_minutes LIKE cst_bos_minutes;
INSERT IGNORE INTO cse_bos_minutes SELECT * FROM cst_bos_minutes;

-- 32. cst_laboratories -> cse_laboratories
CREATE TABLE IF NOT EXISTS cse_laboratories LIKE cst_laboratories;
INSERT IGNORE INTO cse_laboratories SELECT * FROM cst_laboratories;

-- 33. cst_gate -> cse_gate
CREATE TABLE IF NOT EXISTS cse_gate LIKE cst_gate;
INSERT IGNORE INTO cse_gate SELECT * FROM cst_gate;

-- 34. cst_gate_gallery -> cse_gate_gallery
CREATE TABLE IF NOT EXISTS cse_gate_gallery LIKE cst_gate_gallery;
INSERT IGNORE INTO cse_gate_gallery SELECT * FROM cst_gate_gallery;

-- 35. cst_roll_of_honour -> cse_roll_of_honour
CREATE TABLE IF NOT EXISTS cse_roll_of_honour LIKE cst_roll_of_honour;
INSERT IGNORE INTO cse_roll_of_honour SELECT * FROM cst_roll_of_honour;

-- 36. cst_roll_of_honour_gallery -> cse_roll_of_honour_gallery
CREATE TABLE IF NOT EXISTS cse_roll_of_honour_gallery LIKE cst_roll_of_honour_gallery;
INSERT IGNORE INTO cse_roll_of_honour_gallery SELECT * FROM cst_roll_of_honour_gallery;

-- 37. cst_lecturers_gallery -> cse_lecturers_gallery
CREATE TABLE IF NOT EXISTS cse_lecturers_gallery LIKE cst_lecturers_gallery;
INSERT IGNORE INTO cse_lecturers_gallery SELECT * FROM cst_lecturers_gallery;

-- 38. cst_industry_programs -> cse_industry_programs
CREATE TABLE IF NOT EXISTS cse_industry_programs LIKE cst_industry_programs;
INSERT IGNORE INTO cse_industry_programs SELECT * FROM cst_industry_programs;

-- 39. cst_department_overview -> cse_department_overview
CREATE TABLE IF NOT EXISTS cse_department_overview LIKE cst_department_overview;
INSERT IGNORE INTO cse_department_overview SELECT * FROM cst_department_overview;

-- Show completion status
SELECT 'CST to CSE tables copy completed successfully!' AS Status;

-- Show summary of copied tables
SELECT 
    TABLE_NAME as 'CSE Tables Created',
    TABLE_ROWS as 'Estimated Rows'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'svec_cms' 
AND TABLE_NAME LIKE 'cse_%' 
ORDER BY TABLE_NAME;

-- Show specific important tables data
SELECT 'CSE Sahaya Events:' as Info, COUNT(*) as Count FROM cse_sahaya_events;
SELECT 'CSE Faculty:' as Info, COUNT(*) as Count FROM cse_faculty;
SELECT 'CSE Student Achievements:' as Info, COUNT(*) as Count FROM cse_student_achievements;
SELECT 'CSE Placements:' as Info, COUNT(*) as Count FROM cse_placements;
SELECT 'CSE Workshops:' as Info, COUNT(*) as Count FROM cse_workshops;