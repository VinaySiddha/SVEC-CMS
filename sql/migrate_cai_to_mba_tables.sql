-- Migration Script: Copy CAI Tables to MBA Tables
-- This script removes all existing MBA tables and copies all CAI tables to MBA tables
-- Date: 2025-11-21

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ================================================================================================
-- STEP 1: DROP ALL EXISTING MBA TABLES
-- ================================================================================================

DROP TABLE IF EXISTS `mba_workshops`;
DROP TABLE IF EXISTS `mba_faculty`;
DROP TABLE IF EXISTS `mba_technical_faculty`;
DROP TABLE IF EXISTS `mba_technical_association`;
DROP TABLE IF EXISTS `mba_non_teaching_faculty`;
DROP TABLE IF EXISTS `mba_academictoppers`;
DROP TABLE IF EXISTS `mba_faculty_achievements`;
DROP TABLE IF EXISTS `mba_faculty_development_programs`;
DROP TABLE IF EXISTS `mba_placements`;
DROP TABLE IF EXISTS `mba_hackathons_gallery`;
DROP TABLE IF EXISTS `mba_bos_members`;
DROP TABLE IF EXISTS `mba_bos_minutes`;
DROP TABLE IF EXISTS `mba_eresources`;
DROP TABLE IF EXISTS `mba_hackathons`;
DROP TABLE IF EXISTS `mba_newsletters`;
DROP TABLE IF EXISTS `mba_merit_scholarships`;
DROP TABLE IF EXISTS `mba_mous`;
DROP TABLE IF EXISTS `mba_syllabus`;
DROP TABLE IF EXISTS `mba_student_achievements`;
DROP TABLE IF EXISTS `mba_extracurricular_activities`;
DROP TABLE IF EXISTS `mba_department_overview`;
DROP TABLE IF EXISTS `mba_handbooks`;
DROP TABLE IF EXISTS `mba_department_library`;
DROP TABLE IF EXISTS `mba_physical_facilities`;
DROP TABLE IF EXISTS `mba_sahaya_events`;
DROP TABLE IF EXISTS `mba_scud_activities`;
DROP TABLE IF EXISTS `mba_training_activities`;
DROP TABLE IF EXISTS `mba_industry_programs`;

-- ================================================================================================
-- STEP 2: CREATE MBA TABLES AS COPIES OF CAI TABLES
-- ================================================================================================

-- Table: mba_workshops (copy of cai_workshops)
CREATE TABLE IF NOT EXISTS `mba_workshops` LIKE `cai_workshops`;

-- Table: mba_faculty (copy of cai_faculty)
CREATE TABLE IF NOT EXISTS `mba_faculty` LIKE `cai_faculty`;

-- Table: mba_technical_faculty (copy of cai_technical_faculty)
CREATE TABLE IF NOT EXISTS `mba_technical_faculty` LIKE `cai_technical_faculty`;

-- Table: mba_technical_association (copy of cai_technical_association)
CREATE TABLE IF NOT EXISTS `mba_technical_association` LIKE `cai_technical_association`;

-- Table: mba_non_teaching_faculty (copy of cai_non_teaching_faculty)
CREATE TABLE IF NOT EXISTS `mba_non_teaching_faculty` LIKE `cai_non_teaching_faculty`;

-- Table: mba_academictoppers (copy of cai_academictoppers)
CREATE TABLE IF NOT EXISTS `mba_academictoppers` LIKE `cai_academictoppers`;

-- Table: mba_faculty_achievements (copy of cai_faculty_achievements)
CREATE TABLE IF NOT EXISTS `mba_faculty_achievements` LIKE `cai_faculty_achievements`;

-- Table: mba_faculty_development_programs (copy of cai_faculty_development_programs)
CREATE TABLE IF NOT EXISTS `mba_faculty_development_programs` LIKE `cai_faculty_development_programs`;

-- Table: mba_placements (copy of cai_placements)
CREATE TABLE IF NOT EXISTS `mba_placements` LIKE `cai_placements`;

-- Table: mba_hackathons_gallery (copy of cai_hackathons_gallery)
CREATE TABLE IF NOT EXISTS `mba_hackathons_gallery` LIKE `cai_hackathons_gallery`;

-- Table: mba_bos_members (copy of cai_bos_members)
CREATE TABLE IF NOT EXISTS `mba_bos_members` LIKE `cai_bos_members`;

-- Table: mba_bos_minutes (copy of cai_bos_minutes)
CREATE TABLE IF NOT EXISTS `mba_bos_minutes` LIKE `cai_bos_minutes`;

-- Table: mba_eresources (copy of cai_eresources)
CREATE TABLE IF NOT EXISTS `mba_eresources` LIKE `cai_eresources`;

-- Table: mba_hackathons (copy of cai_hackathons)
CREATE TABLE IF NOT EXISTS `mba_hackathons` LIKE `cai_hackathons`;

-- Table: mba_newsletters (copy of cai_newsletters)
CREATE TABLE IF NOT EXISTS `mba_newsletters` LIKE `cai_newsletters`;

-- Table: mba_merit_scholarships (copy of cai_merit_scholarships)
CREATE TABLE IF NOT EXISTS `mba_merit_scholarships` LIKE `cai_merit_scholarships`;

-- Table: mba_mous (copy of cai_mous)
CREATE TABLE IF NOT EXISTS `mba_mous` LIKE `cai_mous`;

-- Table: mba_syllabus (copy of cai_syllabus)
CREATE TABLE IF NOT EXISTS `mba_syllabus` LIKE `cai_syllabus`;

-- Table: mba_student_achievements (copy of cai_student_achievements)
CREATE TABLE IF NOT EXISTS `mba_student_achievements` LIKE `cai_student_achievements`;

-- Table: mba_extracurricular_activities (copy of cai_extracurricular_activities)
CREATE TABLE IF NOT EXISTS `mba_extracurricular_activities` LIKE `cai_extracurricular_activities`;

-- Table: mba_department_overview (copy of cai_department_overview)
CREATE TABLE IF NOT EXISTS `mba_department_overview` LIKE `cai_department_overview`;

-- Table: mba_handbooks (copy of cai_handbooks)
CREATE TABLE IF NOT EXISTS `mba_handbooks` LIKE `cai_handbooks`;

-- Table: mba_department_library (copy of cai_department_library)
CREATE TABLE IF NOT EXISTS `mba_department_library` LIKE `cai_department_library`;

-- ================================================================================================
-- STEP 3: VERIFICATION QUERIES
-- ================================================================================================

-- Show all mba_ tables created
SHOW TABLES LIKE 'mba_%';

-- Count total MBA tables
SELECT COUNT(*) as total_mba_tables FROM information_schema.tables 
WHERE table_schema = DATABASE() AND table_name LIKE 'mba_%';

-- List of created MBA tables
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb,
    table_rows,
    created
FROM information_schema.tables 
WHERE table_schema = DATABASE() AND table_name LIKE 'mba_%'
ORDER BY table_name;

SET FOREIGN_KEY_CHECKS = 1;

COMMIT;
