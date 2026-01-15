-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 07, 2025 at 06:17 AM
-- Server version: 8.0.43-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `svec_cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_toppers_batches`
--

CREATE TABLE `academic_toppers_batches` (
  `id` int NOT NULL,
  `dept` varchar(100) NOT NULL,
  `batch` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `pdf_url` varchar(500) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `academic_toppers_galleries`
--

CREATE TABLE `academic_toppers_galleries` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `academic_toppers_gallery_images`
--

CREATE TABLE `academic_toppers_gallery_images` (
  `id` int NOT NULL,
  `gallery_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `academic_toppers_stats`
--

CREATE TABLE `academic_toppers_stats` (
  `id` int NOT NULL,
  `dept` varchar(100) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `particulars` varchar(255) NOT NULL,
  `students_benefited` int NOT NULL,
  `scholarship_amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin_approvals`
--

CREATE TABLE `admin_approvals` (
  `id` bigint UNSIGNED NOT NULL,
  `module` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `record_id` bigint UNSIGNED NOT NULL,
  `approver_id` bigint UNSIGNED DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `comments` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiml_classrooms`
--

CREATE TABLE `aiml_classrooms` (
  `id` int NOT NULL,
  `dept` varchar(32) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiml_class_time_tables`
--

CREATE TABLE `aiml_class_time_tables` (
  `id` int NOT NULL,
  `dept` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiml_laboratories`
--

CREATE TABLE `aiml_laboratories` (
  `id` int NOT NULL,
  `dept` varchar(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `configuration` text,
  `usage_info` varchar(255) DEFAULT NULL,
  `num_systems` int DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiml_other_laboratories`
--

CREATE TABLE `aiml_other_laboratories` (
  `id` int NOT NULL,
  `dept` varchar(32) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiml_seminar_halls`
--

CREATE TABLE `aiml_seminar_halls` (
  `id` int NOT NULL,
  `dept` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aiml_student_achievements`
--

CREATE TABLE `aiml_student_achievements` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `year` varchar(20) NOT NULL,
  `proof_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'e.g., login, create_user, delete_department',
  `resource_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'e.g., user, department, credential',
  `resource_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ID of the affected resource',
  `old_values` json DEFAULT NULL COMMENT 'Previous values before change',
  `new_values` json DEFAULT NULL COMMENT 'New values after change',
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `success` tinyint(1) NOT NULL DEFAULT '1',
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `severity` enum('info','warning','error','critical') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'info',
  `status` enum('pending','success','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'success',
  `metadata` json DEFAULT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `board_of_studies`
--

CREATE TABLE `board_of_studies` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `member_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bos_civil_meeting_minutes`
--

CREATE TABLE `bos_civil_meeting_minutes` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meeting_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meeting_number` int NOT NULL,
  `meeting_date` date NOT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bos_meeting_minutes`
--

CREATE TABLE `bos_meeting_minutes` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meeting_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meeting_number` int NOT NULL,
  `meeting_date` date NOT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_activities`
--

CREATE TABLE `bsh_activities` (
  `id` int NOT NULL,
  `section` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_board_of_studies`
--

CREATE TABLE `bsh_board_of_studies` (
  `id` int NOT NULL,
  `section` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `ordering` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_department_documents`
--

CREATE TABLE `bsh_department_documents` (
  `id` int NOT NULL,
  `section` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `ordering` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_department_profile`
--

CREATE TABLE `bsh_department_profile` (
  `id` int NOT NULL,
  `hod_name` varchar(255) DEFAULT NULL,
  `hod_image_url` varchar(255) DEFAULT NULL,
  `hod_designation` varchar(255) DEFAULT NULL,
  `hod_mobile` varchar(50) DEFAULT NULL,
  `hod_phone` varchar(50) DEFAULT NULL,
  `hod_email` varchar(255) DEFAULT NULL,
  `hod_message` text,
  `department_overview` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_faculty`
--

CREATE TABLE `bsh_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `department` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_faculty_achievements`
--

CREATE TABLE `bsh_faculty_achievements` (
  `id` int NOT NULL,
  `section` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_faculty_paper_presentations`
--

CREATE TABLE `bsh_faculty_paper_presentations` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_laboratories`
--

CREATE TABLE `bsh_laboratories` (
  `id` int NOT NULL,
  `lab_name` varchar(255) DEFAULT NULL,
  `description` text,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_results`
--

CREATE TABLE `bsh_results` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_student_achievements`
--

CREATE TABLE `bsh_student_achievements` (
  `id` int NOT NULL,
  `section` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_syllabus`
--

CREATE TABLE `bsh_syllabus` (
  `id` int NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `fileUrl` varchar(255) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_fdps`
--

CREATE TABLE `bsh_fdps` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `description` text,
  `date` varchar(50) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bsh_photogallery`
--

CREATE TABLE `bsh_photogallery` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `event_type` varchar(100) DEFAULT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `description` text,
  `ordering` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_faculty`
--

CREATE TABLE `cai_faculty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_bos_members`
--

CREATE TABLE `cai_bos_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai',
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `position_in_job` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_eresources`
--

CREATE TABLE `cai_eresources` (
  `id` int NOT NULL,
  `regulation` varchar(10) NOT NULL,
  `semester` varchar(10) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `file_url` text NOT NULL,
  `file_type` varchar(20) DEFAULT 'PPT',
  `academic_year` varchar(10) DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai',
  `status` varchar(20) NOT NULL DEFAULT 'approved',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_extracurricular_activities`
--

CREATE TABLE `cai_extracurricular_activities` (
  `id` int NOT NULL,
  `title` text NOT NULL,
  `volume` int NOT NULL,
  `issue` varchar(10) NOT NULL,
  `academic_year` varchar(10) NOT NULL,
  `publish_date` date NOT NULL,
  `pdf_url` text NOT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai',
  `status` varchar(20) NOT NULL DEFAULT 'approved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_faculty_achievements`
--

CREATE TABLE `cai_faculty_achievements` (
  `id` int NOT NULL,
  `category` enum('Journal Publications','Conferences','Book Publications','Certifications','Patents','Research Supervisors','Faculty Out-Reach') DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_faculty_development_programs`
--

CREATE TABLE `cai_faculty_development_programs` (
  `id` int NOT NULL,
  `type` enum('Attended','Conducted','Workshops/Training','Gallery') DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` text,
  `image_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_hackathons`
--

CREATE TABLE `cai_hackathons` (
  `id` int NOT NULL,
  `academic_year` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `brochure_url` text,
  `winners_url` text,
  `event_date` date DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai',
  `status` varchar(20) NOT NULL DEFAULT 'approved',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_hackathon_gallery`
--

CREATE TABLE `cai_hackathon_gallery` (
  `id` int NOT NULL,
  `hackathon_id` int DEFAULT NULL,
  `academic_year` varchar(10) NOT NULL,
  `image_url` text NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `caption` text,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_merit_scholarships`
--

CREATE TABLE `cai_merit_scholarships` (
  `id` int NOT NULL,
  `academic_year` varchar(10) DEFAULT NULL,
  `particulars` varchar(100) DEFAULT NULL,
  `students_benefited` int DEFAULT NULL,
  `scholarship_amount` int DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_newsletters`
--

CREATE TABLE `cai_newsletters` (
  `id` int NOT NULL,
  `title` text NOT NULL,
  `volume` int NOT NULL,
  `issue` int NOT NULL,
  `year` varchar(10) NOT NULL,
  `publish_date` date NOT NULL,
  `pdf_url` text NOT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_scud_activities`
--

CREATE TABLE `cai_scud_activities` (
  `id` int NOT NULL,
  `academic_year` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pdf_url` text,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_scud_gallery`
--

CREATE TABLE `cai_scud_gallery` (
  `id` int NOT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `image_url` text,
  `alt_text` varchar(255) DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_training_activities`
--

CREATE TABLE `cai_training_activities` (
  `id` int NOT NULL,
  `academic_year` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pdf_url` text,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_training_gallery`
--

CREATE TABLE `cai_training_gallery` (
  `id` int NOT NULL,
  `image_url` text,
  `alt_text` varchar(255) DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cai_placements`
--

CREATE TABLE `cai_placements` (
  `id` int NOT NULL,
  `batch` varchar(20) NOT NULL,
  `academic_year` varchar(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_url` varchar(500) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cse-ai',
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_consultancy`
--

CREATE TABLE `civil_consultancy` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_extra_curricular_activities`
--

CREATE TABLE `civil_extra_curricular_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_newsletters`
--

CREATE TABLE `civil_newsletters` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_physical_facilities`
--

CREATE TABLE `civil_physical_facilities` (
  `id` int NOT NULL,
  `department` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_student_achievements`
--

CREATE TABLE `civil_student_achievements` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `year` varchar(20) DEFAULT NULL,
  `title` text NOT NULL,
  `file_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_syllabus`
--

CREATE TABLE `civil_syllabus` (
  `id` int NOT NULL,
  `department` varchar(50) NOT NULL,
  `program` varchar(50) NOT NULL,
  `version` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_technical_association`
--

CREATE TABLE `civil_technical_association` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `committee` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `civil_workshops`
--

CREATE TABLE `civil_workshops` (
  `id` int NOT NULL,
  `department` varchar(100) NOT NULL,
  `year` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

CREATE TABLE `classrooms` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `facilities` json DEFAULT NULL,
  `is_ict_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `floor` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `building` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `consultancy_activities`
--

CREATE TABLE `consultancy_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `faculty_involved` text COLLATE utf8mb4_unicode_ci,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `project_value` decimal(12,2) DEFAULT NULL,
  `project_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cse_department_library`
--

CREATE TABLE `cse_department_library` (
  `id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text,
  `titles` int DEFAULT NULL,
  `volumes` int DEFAULT NULL,
  `faculty_incharge` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cse_eresources`
--

CREATE TABLE `cse_eresources` (
  `id` int NOT NULL,
  `regulation` varchar(10) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `ppt_url` varchar(255) DEFAULT NULL,
  `display_order` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cse_faculty_achievements`
--

CREATE TABLE `cse_faculty_achievements` (
  `id` int NOT NULL,
  `department` varchar(16) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `date` date DEFAULT NULL,
  `category` varchar(64) DEFAULT NULL,
  `link` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cse_student_achievements`
--

CREATE TABLE `cse_student_achievements` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `fileUrl` varchar(255) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `display_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cse_syllabus`
--

CREATE TABLE `cse_syllabus` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `program` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_bos_members`
--

CREATE TABLE `cst_bos_members` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `position_in_job` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_bos_minutes`
--

CREATE TABLE `cst_bos_minutes` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `meeting_no` varchar(20) DEFAULT NULL,
  `meeting_date` date DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_department_library`
--

CREATE TABLE `cst_department_library` (
  `id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text,
  `titles` int DEFAULT NULL,
  `volumes` int DEFAULT NULL,
  `faculty_incharge` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_department_overview`
--

CREATE TABLE `cst_department_overview` (
  `id` int NOT NULL,
  `hod_name` varchar(255) DEFAULT NULL,
  `hod_image_url` varchar(255) DEFAULT NULL,
  `hod_email` varchar(255) DEFAULT NULL,
  `hod_qualification` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_eresources`
--

CREATE TABLE `cst_eresources` (
  `id` int NOT NULL,
  `regulation` varchar(10) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `ppt_url` varchar(255) DEFAULT NULL,
  `display_order` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_extra_curricular`
--

CREATE TABLE `cst_extra_curricular` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `sahaya_desc` text,
  `sahaya_faculty` varchar(255) DEFAULT NULL,
  `sahaya_events` json DEFAULT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_faculty`
--

CREATE TABLE `cst_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `profileUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_faculty_achievements`
--

CREATE TABLE `cst_faculty_achievements` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `category` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_faculty_development`
--

CREATE TABLE `cst_faculty_development` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `category` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `year` varchar(10) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_hackathons`
--

CREATE TABLE `cst_hackathons` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `brochure_url` varchar(255) DEFAULT NULL,
  `winners_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_handbooks`
--

CREATE TABLE `cst_handbooks` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_industry_programs`
--

CREATE TABLE `cst_industry_programs` (
  `id` int NOT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_merit_scholarships`
--

CREATE TABLE `cst_merit_scholarships` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `particulars` varchar(255) NOT NULL,
  `students_benefited` int NOT NULL,
  `scholarship_amount` int NOT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_mous`
--

CREATE TABLE `cst_mous` (
  `id` int NOT NULL,
  `organization_name` varchar(255) DEFAULT NULL,
  `from_date` varchar(30) DEFAULT NULL,
  `to_date` varchar(30) DEFAULT NULL,
  `document_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_newsletters`
--

CREATE TABLE `cst_newsletters` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `volume` varchar(50) NOT NULL,
  `issue` varchar(50) NOT NULL,
  `year` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_non_teaching_faculty`
--

CREATE TABLE `cst_non_teaching_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_physical_facilities`
--

CREATE TABLE `cst_physical_facilities` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `category` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `lab_details` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_placements`
--

CREATE TABLE `cst_placements` (
  `id` int NOT NULL,
  `batch` varchar(20) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_sahaya_events`
--

CREATE TABLE `cst_sahaya_events` (
  `id` int NOT NULL,
  `year` varchar(20) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_scud_activities`
--

CREATE TABLE `cst_scud_activities` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_student_achievements`
--

CREATE TABLE `cst_student_achievements` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `fileUrl` varchar(255) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `display_order` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_syllabus`
--

CREATE TABLE `cst_syllabus` (
  `id` int NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `fileUrl` varchar(255) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_technical_faculty`
--

CREATE TABLE `cst_technical_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cst_training_activities`
--

CREATE TABLE `cst_training_activities` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `departmental_activities`
--

CREATE TABLE `departmental_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `activity_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `activity_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Seminar, Conference, Workshop, Competition, etc.',
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `venue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organizer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coordinator` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participants_count` int DEFAULT NULL,
  `target_audience` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Students, Faculty, Industry, etc.',
  `outcomes` text COLLATE utf8mb4_unicode_ci,
  `feedback_summary` text COLLATE utf8mb4_unicode_ci,
  `budget` decimal(15,2) DEFAULT NULL,
  `sponsors` text COLLATE utf8mb4_unicode_ci,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery_urls` json DEFAULT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('planned','ongoing','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'planned',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_contact`
--

CREATE TABLE `department_contact` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `office_location` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_courses`
--

CREATE TABLE `department_courses` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_type` varchar(50) DEFAULT NULL,
  `eligibility` varchar(255) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `intake` int DEFAULT NULL,
  `fees` decimal(10,2) DEFAULT NULL,
  `description` text,
  `syllabus_url` varchar(255) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_credentials`
--

CREATE TABLE `department_credentials` (
  `id` bigint UNSIGNED NOT NULL,
  `department_code` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_level` enum('read','write','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'read',
  `allowed_modules` json DEFAULT NULL COMMENT 'JSON array of allowed modules/features',
  `created_by` bigint UNSIGNED NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `login_count` int UNSIGNED NOT NULL DEFAULT '0',
  `max_sessions` int UNSIGNED NOT NULL DEFAULT '1',
  `session_timeout` int UNSIGNED NOT NULL DEFAULT '3600' COMMENT 'seconds',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_data_access`
--

CREATE TABLE `department_data_access` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `department_code` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `table_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `can_read` tinyint(1) NOT NULL DEFAULT '1',
  `can_write` tinyint(1) NOT NULL DEFAULT '0',
  `can_delete` tinyint(1) NOT NULL DEFAULT '0',
  `conditions` json DEFAULT NULL COMMENT 'Additional WHERE conditions for data access',
  `granted_by` bigint UNSIGNED NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_eresources`
--

CREATE TABLE `department_eresources` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `file_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `semester` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_facilities`
--

CREATE TABLE `department_facilities` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `facility_type` varchar(50) NOT NULL,
  `facility_name` varchar(255) NOT NULL,
  `description` text,
  `capacity` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `specifications` text,
  `images` json DEFAULT NULL,
  `documents` json DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_info`
--

CREATE TABLE `department_info` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dept_full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hod_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hod_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vision` text COLLATE utf8mb4_unicode_ci,
  `mission` text COLLATE utf8mb4_unicode_ci,
  `about` text COLLATE utf8mb4_unicode_ci,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_info_sections`
--

CREATE TABLE `department_info_sections` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_library`
--

CREATE TABLE `department_library` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_type` enum('Book','Journal','Magazine','QuestionBank','Other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int DEFAULT NULL,
  `isbn` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edition` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventory_no` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `copies` int DEFAULT '1',
  `description` text COLLATE utf8mb4_unicode_ci,
  `file_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_placements`
--

CREATE TABLE `department_placements` (
  `id` int NOT NULL,
  `department` varchar(100) NOT NULL,
  `placementRate` varchar(20) NOT NULL,
  `averagePackage` varchar(20) NOT NULL,
  `highestPackage` varchar(20) NOT NULL,
  `year` varchar(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_profile_sections`
--

CREATE TABLE `department_profile_sections` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `section_name` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_sidebar_items`
--

CREATE TABLE `department_sidebar_items` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department_yearly_placements`
--

CREATE TABLE `department_yearly_placements` (
  `id` int NOT NULL,
  `year` varchar(4) NOT NULL,
  `department` varchar(10) NOT NULL,
  `count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_board_of_studies`
--

CREATE TABLE `ds_board_of_studies` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_bos_meeting_minutes`
--

CREATE TABLE `ds_bos_meeting_minutes` (
  `id` int NOT NULL,
  `meeting_number` varchar(50) NOT NULL,
  `meeting_date` date DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_contact`
--

CREATE TABLE `ds_contact` (
  `id` int NOT NULL,
  `contact_type` varchar(50) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_department_library`
--

CREATE TABLE `ds_department_library` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `library_type` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_department_profile`
--

CREATE TABLE `ds_department_profile` (
  `id` int NOT NULL,
  `section_name` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `is_list` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_eresources`
--

CREATE TABLE `ds_eresources` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `resource_url` text,
  `resource_type` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_extracurricular`
--

CREATE TABLE `ds_extracurricular` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `event_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_faculty`
--

CREATE TABLE `ds_faculty` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `profile_url` text,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_hod` tinyint(1) DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_faculty_achievements`
--

CREATE TABLE `ds_faculty_achievements` (
  `id` int NOT NULL,
  `faculty_name` varchar(255) NOT NULL,
  `achievement_type` varchar(100) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `achievement_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_faculty_development`
--

CREATE TABLE `ds_faculty_development` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `event_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_hackathons`
--

CREATE TABLE `ds_hackathons` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `event_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_handbooks`
--

CREATE TABLE `ds_handbooks` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `file_url` text,
  `handbook_type` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_merit_scholarships`
--

CREATE TABLE `ds_merit_scholarships` (
  `id` int NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `scholarship_type` varchar(100) DEFAULT NULL,
  `amount` varchar(50) DEFAULT NULL,
  `academic_year` varchar(10) DEFAULT NULL,
  `document_url` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_mous`
--

CREATE TABLE `ds_mous` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `description` text,
  `document_url` text,
  `signed_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_newsletters`
--

CREATE TABLE `ds_newsletters` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `file_url` text,
  `published_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_non_teaching_staff`
--

CREATE TABLE `ds_non_teaching_staff` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_physical_facilities`
--

CREATE TABLE `ds_physical_facilities` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_placements`
--

CREATE TABLE `ds_placements` (
  `id` int NOT NULL,
  `batch_year` varchar(10) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `package_offered` varchar(50) DEFAULT NULL,
  `document_url` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_student_achievements`
--

CREATE TABLE `ds_student_achievements` (
  `id` int NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `achievement_type` varchar(100) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `achievement_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_syllabus`
--

CREATE TABLE `ds_syllabus` (
  `id` int NOT NULL,
  `year` varchar(10) DEFAULT NULL,
  `semester` varchar(10) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_technical_association`
--

CREATE TABLE `ds_technical_association` (
  `id` int NOT NULL,
  `dept` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `event_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_training_activities`
--

CREATE TABLE `ds_training_activities` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `event_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ds_workshops`
--

CREATE TABLE `ds_workshops` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `document_url` text,
  `event_date` date DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_clubs`
--

CREATE TABLE `ece_clubs` (
  `id` int NOT NULL,
  `club` varchar(100) NOT NULL,
  `event` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_extracurricular_activities`
--

CREATE TABLE `ece_extracurricular_activities` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `label` varchar(256) NOT NULL,
  `year` varchar(16) DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_faculty_achievements`
--

CREATE TABLE `ece_faculty_achievements` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `year` varchar(32) DEFAULT NULL,
  `title` varchar(512) NOT NULL,
  `url` varchar(512) DEFAULT NULL,
  `details` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_faculty_innovations`
--

CREATE TABLE `ece_faculty_innovations` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `items` json DEFAULT NULL,
  `links` json DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_fdp`
--

CREATE TABLE `ece_fdp` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `year` varchar(32) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_handbooks`
--

CREATE TABLE `ece_handbooks` (
  `id` int NOT NULL,
  `year` varchar(16) NOT NULL,
  `title` varchar(256) NOT NULL,
  `url` varchar(512) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_mous`
--

CREATE TABLE `ece_mous` (
  `id` int NOT NULL,
  `organization` varchar(255) NOT NULL,
  `date` varchar(32) DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL,
  `purpose` text,
  `document_url` varchar(500) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_newletters`
--

CREATE TABLE `ece_newletters` (
  `id` int NOT NULL,
  `title` varchar(256) NOT NULL,
  `url` varchar(512) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_nonteaching_faculty`
--

CREATE TABLE `ece_nonteaching_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_physical_facilities`
--

CREATE TABLE `ece_physical_facilities` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `titles` int DEFAULT NULL,
  `volumes` int DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_placements`
--

CREATE TABLE `ece_placements` (
  `id` int NOT NULL,
  `year` varchar(16) NOT NULL,
  `url` varchar(512) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_scholarships_toppers`
--

CREATE TABLE `ece_scholarships_toppers` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `year` varchar(16) DEFAULT NULL,
  `title` varchar(256) DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL,
  `based_on` varchar(64) DEFAULT NULL,
  `students` int DEFAULT NULL,
  `amount` varchar(32) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_syllabus`
--

CREATE TABLE `ece_syllabus` (
  `id` int NOT NULL,
  `program` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `url` varchar(500) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_teaching_faculty`
--

CREATE TABLE `ece_teaching_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `bio` text,
  `research_interests` varchar(255) DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_technicalAssociation_trainingActivities`
--

CREATE TABLE `ece_technicalAssociation_trainingActivities` (
  `id` int NOT NULL,
  `type` varchar(48) NOT NULL,
  `year` varchar(16) DEFAULT NULL,
  `title` varchar(256) NOT NULL,
  `url` varchar(512) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ece_worshops_gl`
--

CREATE TABLE `ece_worshops_gl` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `year` varchar(32) DEFAULT NULL,
  `title` varchar(512) NOT NULL,
  `url` varchar(512) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_clubs`
--

CREATE TABLE `ect_clubs` (
  `id` int NOT NULL,
  `club` varchar(100) NOT NULL,
  `event` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_extracurricular_activities`
--

CREATE TABLE `ect_extracurricular_activities` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `year` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_faculty`
--

CREATE TABLE `ect_faculty` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(500) DEFAULT NULL,
  `is_teaching` varchar(20) NOT NULL DEFAULT 'teaching',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_facultyinnovations`
--

CREATE TABLE `ect_facultyinnovations` (
  `id` int NOT NULL,
  `section` varchar(255) NOT NULL,
  `subsection` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `description` text,
  `list_items` json DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_faculty_achievements`
--

CREATE TABLE `ect_faculty_achievements` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `year` varchar(32) DEFAULT NULL,
  `title` varchar(512) NOT NULL,
  `url` varchar(512) DEFAULT NULL,
  `details` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_fdp`
--

CREATE TABLE `ect_fdp` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `year` varchar(32) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_handbooks`
--

CREATE TABLE `ect_handbooks` (
  `id` int NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `regulation` varchar(50) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_mous`
--

CREATE TABLE `ect_mous` (
  `id` int NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `purpose` text,
  `document_url` varchar(500) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_newsletters`
--

CREATE TABLE `ect_newsletters` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_physical_facilities`
--

CREATE TABLE `ect_physical_facilities` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `subcategory` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `additional_data` json DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_placements`
--

CREATE TABLE `ect_placements` (
  `id` int NOT NULL,
  `year` varchar(20) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_scholarships_toppers`
--

CREATE TABLE `ect_scholarships_toppers` (
  `id` int NOT NULL,
  `type` varchar(32) NOT NULL,
  `year` varchar(16) DEFAULT NULL,
  `title` varchar(256) DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL,
  `based_on` varchar(64) DEFAULT NULL,
  `students` int DEFAULT NULL,
  `amount` varchar(32) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_syllabus`
--

CREATE TABLE `ect_syllabus` (
  `id` int NOT NULL,
  `program` varchar(50) NOT NULL,
  `version` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_technical_association`
--

CREATE TABLE `ect_technical_association` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `event_name` varchar(255) DEFAULT NULL,
  `event_url` varchar(500) DEFAULT NULL,
  `images` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_training_activities`
--

CREATE TABLE `ect_training_activities` (
  `id` int NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ect_workshop_gl`
--

CREATE TABLE `ect_workshop_gl` (
  `id` int NOT NULL,
  `category` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(500) NOT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  `description` text,
  `url` varchar(1000) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `EEE_Syllabus`
--

CREATE TABLE `EEE_Syllabus` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('btech','mtech','diploma') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'btech',
  `academic_year` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `regulation` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `program` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extracurriculars`
--

CREATE TABLE `extracurriculars` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `venue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coordinator` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participants_count` int DEFAULT NULL,
  `winners` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extra_curricular_activities`
--

CREATE TABLE `extra_curricular_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `organizer` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participants` text COLLATE utf8mb4_unicode_ci,
  `event_date` date DEFAULT NULL,
  `venue` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extra_curricular_clubs`
--

CREATE TABLE `extra_curricular_clubs` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `subtitle` varchar(150) DEFAULT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `extra_curricular_docs`
--

CREATE TABLE `extra_curricular_docs` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `pdf_url` varchar(500) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `e_resources`
--

CREATE TABLE `e_resources` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_achievements`
--

CREATE TABLE `faculty_achievements` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `type` enum('Research Supervisors','Awards','Patents','Publications','Grants','Other','outreach','journal','conference','certification','patent') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `year` varchar(32) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `proof_url` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_development_programs`
--

CREATE TABLE `faculty_development_programs` (
  `id` int NOT NULL,
  `dept` varchar(32) NOT NULL,
  `type` enum('attended','conducted','workshop','gallery') NOT NULL,
  `year` varchar(16) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(512) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_innovations`
--

CREATE TABLE `faculty_innovations` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `faculty_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `innovation_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Teaching, Learning, Research, etc.',
  `implementation_date` date DEFAULT NULL,
  `impact_description` text COLLATE utf8mb4_unicode_ci,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculty_profiles`
--

CREATE TABLE `faculty_profiles` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qualification` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specialization` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `research_interests` text COLLATE utf8mb4_unicode_ci,
  `publications` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fdp_attended`
--

CREATE TABLE `fdp_attended` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organized_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `program_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `certificate_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fdp_conducted`
--

CREATE TABLE `fdp_conducted` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coordinator` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `program_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_persons` text COLLATE utf8mb4_unicode_ci,
  `participants_count` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_items`
--

CREATE TABLE `gallery_items` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` text COLLATE utf8mb4_unicode_ci,
  `event_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `green_initiatives`
--

CREATE TABLE `green_initiatives` (
  `id` bigint UNSIGNED NOT NULL,
  `initiative_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `initiative_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Energy Conservation, Waste Management, Tree Plantation, etc.',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `coordinator` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participants` text COLLATE utf8mb4_unicode_ci,
  `impact_metrics` text COLLATE utf8mb4_unicode_ci COMMENT 'Energy saved, waste reduced, trees planted, etc.',
  `environmental_benefit` text COLLATE utf8mb4_unicode_ci,
  `cost_savings` decimal(15,2) DEFAULT NULL,
  `recognition_received` text COLLATE utf8mb4_unicode_ci,
  `future_plans` text COLLATE utf8mb4_unicode_ci,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery_urls` json DEFAULT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','completed','planned') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hackathons`
--

CREATE TABLE `hackathons` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `venue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organizer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coordinator` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sponsors` text COLLATE utf8mb4_unicode_ci,
  `prizes` text COLLATE utf8mb4_unicode_ci,
  `participants_count` int DEFAULT NULL,
  `winners` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hackathon_documents`
--

CREATE TABLE `hackathon_documents` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hackathon_galleries`
--

CREATE TABLE `hackathon_galleries` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hackathon_gallery_images`
--

CREATE TABLE `hackathon_gallery_images` (
  `id` int NOT NULL,
  `gallery_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `handbooks`
--

CREATE TABLE `handbooks` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sem_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `status` enum('pending','approved','rejected','published') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hod_info`
--

CREATE TABLE `hod_info` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `message` text,
  `research_interests` text,
  `achievements` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `industry_interactions`
--

CREATE TABLE `industry_interactions` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `interaction_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_date` date NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `participants_count` int DEFAULT NULL,
  `resource_person` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `outcomes` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laboratories`
--

CREATE TABLE `laboratories` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lab_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lab_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `configurations` json DEFAULT NULL,
  `usage` text COLLATE utf8mb4_unicode_ci,
  `capacity` int DEFAULT NULL,
  `softwares` text COLLATE utf8mb4_unicode_ci,
  `equipments` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `incharge` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `labs`
--

CREATE TABLE `labs` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `lab_name` varchar(255) NOT NULL,
  `configurations` text,
  `labs_usage` text,
  `image_url` text,
  `status` enum('active','inactive','maintenance') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_faculty`
--

CREATE TABLE `mech_faculty` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qualification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_url` text COLLATE utf8mb4_unicode_ci,
  `faculty_type` enum('teaching','non-teaching') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_facultyachievements`
--

CREATE TABLE `mech_facultyachievements` (
  `id` int NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_facultyTLmethods`
--

CREATE TABLE `mech_facultyTLmethods` (
  `id` int NOT NULL,
  `method` varchar(500) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_laboratories`
--

CREATE TABLE `mech_laboratories` (
  `id` int NOT NULL,
  `lab_name` varchar(255) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `video_title` varchar(255) DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_library`
--

CREATE TABLE `mech_library` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` json DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `resources` json DEFAULT NULL,
  `services` json DEFAULT NULL,
  `faculty_incharge` json DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_magazines`
--

CREATE TABLE `mech_magazines` (
  `id` int NOT NULL,
  `year` varchar(20) NOT NULL,
  `volume` varchar(10) NOT NULL,
  `issue` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_mous`
--

CREATE TABLE `mech_mous` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `data` json NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_newsletters`
--

CREATE TABLE `mech_newsletters` (
  `id` int NOT NULL,
  `year` int NOT NULL,
  `volume` int NOT NULL,
  `issue` int NOT NULL,
  `month` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_placements`
--

CREATE TABLE `mech_placements` (
  `id` int NOT NULL,
  `batch` varchar(16) NOT NULL,
  `url` varchar(512) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_project_research`
--

CREATE TABLE `mech_project_research` (
  `id` int NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_studentachievements`
--

CREATE TABLE `mech_studentachievements` (
  `id` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_syllabus`
--

CREATE TABLE `mech_syllabus` (
  `id` int NOT NULL,
  `program` varchar(50) NOT NULL,
  `version` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_technicalassociation`
--

CREATE TABLE `mech_technicalassociation` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mech_workshops`
--

CREATE TABLE `mech_workshops` (
  `id` int NOT NULL,
  `academic_year` varchar(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merit_images`
--

CREATE TABLE `merit_images` (
  `id` int NOT NULL,
  `image_url` text,
  `alt_text` varchar(255) DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merit_scholars`
--

CREATE TABLE `merit_scholars` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `batch` varchar(20) DEFAULT NULL,
  `roll_number` varchar(50) DEFAULT NULL,
  `student_name` varchar(100) NOT NULL,
  `award_type` varchar(100) DEFAULT NULL,
  `award_description` text,
  `cgpa_aggregate` varchar(20) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merit_scholarships`
--

CREATE TABLE `merit_scholarships` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_roll_no` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `achievement_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cgpa` decimal(3,2) DEFAULT NULL,
  `rank` int DEFAULT NULL,
  `scholarship_amount` decimal(10,2) DEFAULT NULL,
  `awarding_body` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dept` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cseai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mous`
--

CREATE TABLE `mous` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organization_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `focal_person` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `benefits` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `publish_date` date NOT NULL,
  `volume` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issue` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editors` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `non_teaching_bsh_faculty`
--

CREATE TABLE `non_teaching_bsh_faculty` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `non_teaching_civil_staff`
--

CREATE TABLE `non_teaching_civil_staff` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `status` varchar(20) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `non_teaching_staff`
--

CREATE TABLE `non_teaching_staff` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organized_events`
--

CREATE TABLE `organized_events` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizer` varchar(255) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `report_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `proposed_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `physical_facilities`
--

CREATE TABLE `physical_facilities` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facility_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facility_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `capacity` int DEFAULT NULL,
  `area_sqft` decimal(8,2) DEFAULT NULL,
  `equipment_details` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placements`
--

CREATE TABLE `placements` (
  `id` int NOT NULL,
  `dept` varchar(20) NOT NULL,
  `batch` varchar(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placements_table`
--

CREATE TABLE `placements_table` (
  `id` int NOT NULL,
  `dept` varchar(100) NOT NULL,
  `batch` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `view_url` varchar(500) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_batches`
--

CREATE TABLE `placement_batches` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_companies`
--

CREATE TABLE `placement_companies` (
  `id` int NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_logo` varchar(500) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_content`
--

CREATE TABLE `placement_content` (
  `id` int NOT NULL,
  `content_key` varchar(100) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_gallery`
--

CREATE TABLE `placement_gallery` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_officers`
--

CREATE TABLE `placement_officers` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `image` text,
  `bio` text,
  `department` varchar(50) DEFAULT 'General',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_process`
--

CREATE TABLE `placement_process` (
  `id` int NOT NULL,
  `step` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_reports`
--

CREATE TABLE `placement_reports` (
  `id` int NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `batch_year` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `report_url` varchar(500) DEFAULT NULL,
  `report_type` enum('detailed_report','summary','statistics') DEFAULT 'detailed_report',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_services`
--

CREATE TABLE `placement_services` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_statistics`
--

CREATE TABLE `placement_statistics` (
  `id` int NOT NULL,
  `department` varchar(100) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `batch_year` int NOT NULL,
  `total_students` int NOT NULL,
  `placed_students` int NOT NULL,
  `highest_package` decimal(10,2) DEFAULT NULL,
  `average_package` decimal(10,2) DEFAULT NULL,
  `median_package` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `placement_stats`
--

CREATE TABLE `placement_stats` (
  `id` int NOT NULL,
  `year` varchar(4) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `label` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_development`
--

CREATE TABLE `product_development` (
  `id` bigint UNSIGNED NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `development_team` text COLLATE utf8mb4_unicode_ci COMMENT 'Faculty and student names involved',
  `development_period` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technology_used` text COLLATE utf8mb4_unicode_ci,
  `application_area` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Prototype, Testing, Production, etc.',
  `funding_source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `funding_amount` decimal(15,2) DEFAULT NULL,
  `patent_status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publication_details` text COLLATE utf8mb4_unicode_ci,
  `awards_recognition` text COLLATE utf8mb4_unicode_ci,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive','completed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_objectives`
--

CREATE TABLE `program_objectives` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `objective_type` varchar(20) NOT NULL,
  `objective_number` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `display_order` int DEFAULT '0',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recruiters`
--

CREATE TABLE `recruiters` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` text NOT NULL,
  `packages` varchar(50) NOT NULL,
  `hired` varchar(50) NOT NULL,
  `year` varchar(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `research_centers`
--

CREATE TABLE `research_centers` (
  `id` bigint UNSIGNED NOT NULL,
  `center_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `established_year` year DEFAULT NULL,
  `recognition_body` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'JNTUK, AICTE, UGC, etc.',
  `head_of_center` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `research_areas` text COLLATE utf8mb4_unicode_ci,
  `facilities` text COLLATE utf8mb4_unicode_ci,
  `achievements` text COLLATE utf8mb4_unicode_ci,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `research_development_activities`
--

CREATE TABLE `research_development_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `faculty_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `funding_agency` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `funding_amount` decimal(12,2) DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `research_projects`
--

CREATE TABLE `research_projects` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `principal_investigator` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `co_investigators` text COLLATE utf8mb4_unicode_ci,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `funding_agency` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `funding_amount` decimal(12,2) DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `eligibility` text COLLATE utf8mb4_unicode_ci,
  `amount` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `academic_year` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `application_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seminar_halls`
--

CREATE TABLE `seminar_halls` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `facilities` json DEFAULT NULL,
  `is_ict_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area_sqft` float DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_achievements`
--

CREATE TABLE `student_achievements` (
  `id` int NOT NULL,
  `department` varchar(10) NOT NULL DEFAULT 'CSE',
  `category` enum('Internships','Conference Publications','Journal Publications','Roll of Honour','Awards','GATE','GRE','UIF','NPTEL/Other Certifications','Community Service Project','Student Research Projects','General Achievement') NOT NULL,
  `roll_number` varchar(20) DEFAULT NULL,
  `student_name` varchar(255) NOT NULL,
  `batch` varchar(10) DEFAULT NULL,
  `program` enum('B.Tech','M.Tech','Other') DEFAULT 'B.Tech',
  `title` varchar(500) NOT NULL,
  `description` text,
  `company_organization` varchar(255) DEFAULT NULL,
  `cgpa` decimal(4,2) DEFAULT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `aggregate` decimal(5,2) DEFAULT NULL,
  `gate_score` int DEFAULT NULL,
  `gre_score` int DEFAULT NULL,
  `toefl_score` int DEFAULT NULL,
  `ielts_score` decimal(3,1) DEFAULT NULL,
  `other_score` varchar(100) DEFAULT NULL,
  `achievement_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `academic_year` varchar(10) DEFAULT NULL,
  `position_rank` varchar(50) DEFAULT NULL,
  `level_type` varchar(100) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `guide_supervisor` varchar(255) DEFAULT NULL,
  `project_title` varchar(500) DEFAULT NULL,
  `certificate_url` varchar(500) DEFAULT NULL,
  `proof_document_url` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `additional_links` text,
  `medal_award` varchar(255) DEFAULT NULL,
  `special_recognition` text,
  `status` enum('Active','Archived','Draft') DEFAULT 'Active',
  `is_featured` tinyint(1) DEFAULT '0',
  `sort_order` int DEFAULT '0',
  `created_by` varchar(100) DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_research`
--

CREATE TABLE `student_research` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `students` json NOT NULL,
  `supervisor` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `research_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publication_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ongoing','completed','published') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ongoing',
  `department` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `super_admin_permissions`
--

CREATE TABLE `super_admin_permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `permission` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'e.g., manage_users, view_all_departments, create_credentials',
  `resource` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'specific resource if applicable, e.g., department_code',
  `granted_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NULL DEFAULT NULL COMMENT 'NULL means no expiration',
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `syllabus`
--

CREATE TABLE `syllabus` (
  `id` int NOT NULL,
  `dept` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pdf_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `syllabus_documents`
--

CREATE TABLE `syllabus_documents` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('btech','mtech','soc','mba','syllabus') COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `document_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `regulation` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_settings`
--

CREATE TABLE `system_settings` (
  `id` bigint UNSIGNED NOT NULL,
  `key_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_encrypted` tinyint(1) NOT NULL DEFAULT '0',
  `updated_by` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technical_associations`
--

CREATE TABLE `technical_associations` (
  `id` bigint UNSIGNED NOT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `coordinator` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `established_year` int DEFAULT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `social_media` json DEFAULT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technical_association_activities`
--

CREATE TABLE `technical_association_activities` (
  `id` bigint UNSIGNED NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `organizer` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `participants` text COLLATE utf8mb4_unicode_ci,
  `event_date` date DEFAULT NULL,
  `venue` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technical_magazines`
--

CREATE TABLE `technical_magazines` (
  `id` bigint UNSIGNED NOT NULL,
  `magazine_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `magazine_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Magazine, Handbook, Course Material, Newsletter',
  `volume_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issue_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `editor_in_chief` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editorial_team` text COLLATE utf8mb4_unicode_ci,
  `contributors` text COLLATE utf8mb4_unicode_ci,
  `topics_covered` text COLLATE utf8mb4_unicode_ci,
  `target_audience` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pages_count` int DEFAULT NULL,
  `print_copies` int DEFAULT NULL,
  `digital_copies` int DEFAULT NULL,
  `issn_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `download_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dept` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technical_staff`
--

CREATE TABLE `technical_staff` (
  `id` int NOT NULL,
  `dept` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` text NOT NULL,
  `company` varchar(100) NOT NULL,
  `package` varchar(50) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `quote` text NOT NULL,
  `year` varchar(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('dept','admin','super_admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'dept',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `login_count` int UNSIGNED NOT NULL DEFAULT '0',
  `password_changed_at` timestamp NULL DEFAULT NULL,
  `must_change_password` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_student_achievements_by_category`
-- (See below for the actual view)
--
CREATE TABLE `v_student_achievements_by_category` (
`academic_year` varchar(10)
,`category` enum('Internships','Conference Publications','Journal Publications','Roll of Honour','Awards','GATE','GRE','UIF','NPTEL/Other Certifications','Community Service Project','Student Research Projects','General Achievement')
,`department` varchar(10)
,`total_count` bigint
);

-- --------------------------------------------------------

--
-- Table structure for table `workshops`
--

CREATE TABLE `workshops` (
  `id` int NOT NULL,
  `dept` varchar(50) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `description` text,
  `report_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category` enum('Workshops','SOC','Guest Lecturers/Seminars','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `yearly_placement_reports`
--

CREATE TABLE `yearly_placement_reports` (
  `id` int NOT NULL,
  `year` varchar(9) NOT NULL,
  `pdfUrl` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure for view `v_student_achievements_by_category`
--
DROP TABLE IF EXISTS `v_student_achievements_by_category`;

CREATE ALGORITHM=UNDEFINED DEFINER=`cmsuser`@`%` SQL SECURITY DEFINER VIEW `v_student_achievements_by_category`  AS SELECT `student_achievements`.`category` AS `category`, count(0) AS `total_count`, `student_achievements`.`department` AS `department`, `student_achievements`.`academic_year` AS `academic_year` FROM `student_achievements` WHERE (`student_achievements`.`status` = 'Active') GROUP BY `student_achievements`.`department`, `student_achievements`.`category`, `student_achievements`.`academic_year` ORDER BY `student_achievements`.`academic_year` DESC, `student_achievements`.`category` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_toppers_batches`
--
ALTER TABLE `academic_toppers_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `academic_toppers_galleries`
--
ALTER TABLE `academic_toppers_galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `academic_toppers_gallery_images`
--
ALTER TABLE `academic_toppers_gallery_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_id` (`gallery_id`);

--
-- Indexes for table `academic_toppers_stats`
--
ALTER TABLE `academic_toppers_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_approvals`
--
ALTER TABLE `admin_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_approvals_users_idx` (`approver_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_module_record` (`module`,`record_id`);

--
-- Indexes for table `aiml_classrooms`
--
ALTER TABLE `aiml_classrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiml_class_time_tables`
--
ALTER TABLE `aiml_class_time_tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiml_laboratories`
--
ALTER TABLE `aiml_laboratories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiml_other_laboratories`
--
ALTER TABLE `aiml_other_laboratories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiml_seminar_halls`
--
ALTER TABLE `aiml_seminar_halls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiml_student_achievements`
--
ALTER TABLE `aiml_student_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_action` (`action`),
  ADD KEY `idx_resource` (`resource_type`,`resource_id`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `board_of_studies`
--
ALTER TABLE `board_of_studies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `bos_civil_meeting_minutes`
--
ALTER TABLE `bos_civil_meeting_minutes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_academic_year` (`academic_year`);

--
-- Indexes for table `bos_meeting_minutes`
--
ALTER TABLE `bos_meeting_minutes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_academic_year` (`academic_year`);

--
-- Indexes for table `bsh_activities`
--
ALTER TABLE `bsh_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_board_of_studies`
--
ALTER TABLE `bsh_board_of_studies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_department_documents`
--
ALTER TABLE `bsh_department_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_department_profile`
--
ALTER TABLE `bsh_department_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_faculty`
--
ALTER TABLE `bsh_faculty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_faculty` (`name`,`department`,`designation`);

--
-- Indexes for table `bsh_faculty_achievements`
--
ALTER TABLE `bsh_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_faculty_paper_presentations`
--
ALTER TABLE `bsh_faculty_paper_presentations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_laboratories`
--
ALTER TABLE `bsh_laboratories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_results`
--
ALTER TABLE `bsh_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_student_achievements`
--
ALTER TABLE `bsh_student_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_syllabus`
--
ALTER TABLE `bsh_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_fdps`
--
ALTER TABLE `bsh_fdps`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bsh_photogallery`
--
ALTER TABLE `bsh_photogallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_eresources`
--
ALTER TABLE `cai_eresources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_extracurricular_activities`
--
ALTER TABLE `cai_extracurricular_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_faculty_achievements`
--
ALTER TABLE `cai_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_faculty_development_programs`
--
ALTER TABLE `cai_faculty_development_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_hackathons`
--
ALTER TABLE `cai_hackathons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_hackathon_gallery`
--
ALTER TABLE `cai_hackathon_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hackathon_id` (`hackathon_id`);

--
-- Indexes for table `cai_merit_scholarships`
--
ALTER TABLE `cai_merit_scholarships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_newsletters`
--
ALTER TABLE `cai_newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_scud_activities`
--
ALTER TABLE `cai_scud_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_scud_gallery`
--
ALTER TABLE `cai_scud_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_training_activities`
--
ALTER TABLE `cai_training_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_training_gallery`
--
ALTER TABLE `cai_training_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cai_placements`
--
ALTER TABLE `cai_placements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_batch` (`batch`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `civil_consultancy`
--
ALTER TABLE `civil_consultancy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `civil_extra_curricular_activities`
--
ALTER TABLE `civil_extra_curricular_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `civil_newsletters`
--
ALTER TABLE `civil_newsletters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `civil_physical_facilities`
--
ALTER TABLE `civil_physical_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `civil_student_achievements`
--
ALTER TABLE `civil_student_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `civil_syllabus`
--
ALTER TABLE `civil_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `civil_technical_association`
--
ALTER TABLE `civil_technical_association`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `civil_workshops`
--
ALTER TABLE `civil_workshops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `consultancy_activities`
--
ALTER TABLE `consultancy_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_project_type` (`project_type`),
  ADD KEY `idx_start_date` (`start_date`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `cse_department_library`
--
ALTER TABLE `cse_department_library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cse_eresources`
--
ALTER TABLE `cse_eresources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cse_faculty_achievements`
--
ALTER TABLE `cse_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cse_student_achievements`
--
ALTER TABLE `cse_student_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cse_syllabus`
--
ALTER TABLE `cse_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_bos_members`
--
ALTER TABLE `cst_bos_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_bos_minutes`
--
ALTER TABLE `cst_bos_minutes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_department_library`
--
ALTER TABLE `cst_department_library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_department_overview`
--
ALTER TABLE `cst_department_overview`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_eresources`
--
ALTER TABLE `cst_eresources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_extra_curricular`
--
ALTER TABLE `cst_extra_curricular`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_faculty`
--
ALTER TABLE `cst_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_faculty_achievements`
--
ALTER TABLE `cst_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_faculty_development`
--
ALTER TABLE `cst_faculty_development`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_hackathons`
--
ALTER TABLE `cst_hackathons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_handbooks`
--
ALTER TABLE `cst_handbooks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_industry_programs`
--
ALTER TABLE `cst_industry_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_merit_scholarships`
--
ALTER TABLE `cst_merit_scholarships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_mous`
--
ALTER TABLE `cst_mous`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_newsletters`
--
ALTER TABLE `cst_newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_non_teaching_faculty`
--
ALTER TABLE `cst_non_teaching_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_physical_facilities`
--
ALTER TABLE `cst_physical_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_placements`
--
ALTER TABLE `cst_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_sahaya_events`
--
ALTER TABLE `cst_sahaya_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_scud_activities`
--
ALTER TABLE `cst_scud_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_student_achievements`
--
ALTER TABLE `cst_student_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_syllabus`
--
ALTER TABLE `cst_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_technical_faculty`
--
ALTER TABLE `cst_technical_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cst_training_activities`
--
ALTER TABLE `cst_training_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departmental_activities`
--
ALTER TABLE `departmental_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_activity_type` (`activity_type`),
  ADD KEY `idx_date_from` (`date_from`);

--
-- Indexes for table `department_contact`
--
ALTER TABLE `department_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_contact_type` (`contact_type`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `department_courses`
--
ALTER TABLE `department_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_course_type` (`course_type`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `department_credentials`
--
ALTER TABLE `department_credentials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_dept_username` (`department_code`,`username`),
  ADD UNIQUE KEY `unique_dept_email` (`department_code`,`email`),
  ADD KEY `idx_department` (`department_code`),
  ADD KEY `fk_dept_cred_created_by_idx` (`created_by`);

--
-- Indexes for table `department_data_access`
--
ALTER TABLE `department_data_access`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_dept_table` (`user_id`,`department_code`,`table_name`),
  ADD KEY `idx_department` (`department_code`),
  ADD KEY `idx_table` (`table_name`),
  ADD KEY `fk_data_access_user_idx` (`user_id`),
  ADD KEY `fk_data_access_granted_by_idx` (`granted_by`);

--
-- Indexes for table `department_eresources`
--
ALTER TABLE `department_eresources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `department_facilities`
--
ALTER TABLE `department_facilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_facility_type` (`facility_type`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `department_info`
--
ALTER TABLE `department_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dept_UNIQUE` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `department_info_sections`
--
ALTER TABLE `department_info_sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_dept_section` (`department`,`section_name`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `department_library`
--
ALTER TABLE `department_library`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_resource_type` (`resource_type`);

--
-- Indexes for table `department_placements`
--
ALTER TABLE `department_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department_profile_sections`
--
ALTER TABLE `department_profile_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department_sidebar_items`
--
ALTER TABLE `department_sidebar_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_dept_item` (`department`,`item_id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `department_yearly_placements`
--
ALTER TABLE `department_yearly_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_board_of_studies`
--
ALTER TABLE `ds_board_of_studies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_bos_meeting_minutes`
--
ALTER TABLE `ds_bos_meeting_minutes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_contact`
--
ALTER TABLE `ds_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_department_library`
--
ALTER TABLE `ds_department_library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_department_profile`
--
ALTER TABLE `ds_department_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_section` (`section_name`);

--
-- Indexes for table `ds_eresources`
--
ALTER TABLE `ds_eresources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_extracurricular`
--
ALTER TABLE `ds_extracurricular`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_faculty`
--
ALTER TABLE `ds_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_faculty_achievements`
--
ALTER TABLE `ds_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_faculty_development`
--
ALTER TABLE `ds_faculty_development`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_hackathons`
--
ALTER TABLE `ds_hackathons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_handbooks`
--
ALTER TABLE `ds_handbooks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_merit_scholarships`
--
ALTER TABLE `ds_merit_scholarships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_mous`
--
ALTER TABLE `ds_mous`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_newsletters`
--
ALTER TABLE `ds_newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_non_teaching_staff`
--
ALTER TABLE `ds_non_teaching_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_physical_facilities`
--
ALTER TABLE `ds_physical_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_placements`
--
ALTER TABLE `ds_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_student_achievements`
--
ALTER TABLE `ds_student_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_syllabus`
--
ALTER TABLE `ds_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_technical_association`
--
ALTER TABLE `ds_technical_association`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_training_activities`
--
ALTER TABLE `ds_training_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ds_workshops`
--
ALTER TABLE `ds_workshops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_clubs`
--
ALTER TABLE `ece_clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_extracurricular_activities`
--
ALTER TABLE `ece_extracurricular_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_faculty_achievements`
--
ALTER TABLE `ece_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_faculty_innovations`
--
ALTER TABLE `ece_faculty_innovations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_fdp`
--
ALTER TABLE `ece_fdp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_handbooks`
--
ALTER TABLE `ece_handbooks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_mous`
--
ALTER TABLE `ece_mous`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_newletters`
--
ALTER TABLE `ece_newletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_nonteaching_faculty`
--
ALTER TABLE `ece_nonteaching_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_physical_facilities`
--
ALTER TABLE `ece_physical_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_placements`
--
ALTER TABLE `ece_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_scholarships_toppers`
--
ALTER TABLE `ece_scholarships_toppers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_syllabus`
--
ALTER TABLE `ece_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_teaching_faculty`
--
ALTER TABLE `ece_teaching_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_technicalAssociation_trainingActivities`
--
ALTER TABLE `ece_technicalAssociation_trainingActivities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ece_worshops_gl`
--
ALTER TABLE `ece_worshops_gl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_clubs`
--
ALTER TABLE `ect_clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_extracurricular_activities`
--
ALTER TABLE `ect_extracurricular_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_faculty`
--
ALTER TABLE `ect_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_facultyinnovations`
--
ALTER TABLE `ect_facultyinnovations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_faculty_achievements`
--
ALTER TABLE `ect_faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_fdp`
--
ALTER TABLE `ect_fdp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_handbooks`
--
ALTER TABLE `ect_handbooks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_mous`
--
ALTER TABLE `ect_mous`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_newsletters`
--
ALTER TABLE `ect_newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_physical_facilities`
--
ALTER TABLE `ect_physical_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_placements`
--
ALTER TABLE `ect_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_scholarships_toppers`
--
ALTER TABLE `ect_scholarships_toppers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_syllabus`
--
ALTER TABLE `ect_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_technical_association`
--
ALTER TABLE `ect_technical_association`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_training_activities`
--
ALTER TABLE `ect_training_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ect_workshop_gl`
--
ALTER TABLE `ect_workshop_gl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `EEE_Syllabus`
--
ALTER TABLE `EEE_Syllabus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_regulation` (`regulation`),
  ADD KEY `idx_semester` (`semester`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `extracurriculars`
--
ALTER TABLE `extracurriculars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_event_type` (`event_type`);

--
-- Indexes for table `extra_curricular_activities`
--
ALTER TABLE `extra_curricular_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_activity_type` (`activity_type`),
  ADD KEY `idx_event_date` (`event_date`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `extra_curricular_clubs`
--
ALTER TABLE `extra_curricular_clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_curricular_docs`
--
ALTER TABLE `extra_curricular_docs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `e_resources`
--
ALTER TABLE `e_resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_resource_type` (`resource_type`);

--
-- Indexes for table `faculty_achievements`
--
ALTER TABLE `faculty_achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty_development_programs`
--
ALTER TABLE `faculty_development_programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty_innovations`
--
ALTER TABLE `faculty_innovations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_innovation_type` (`innovation_type`);

--
-- Indexes for table `faculty_profiles`
--
ALTER TABLE `faculty_profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `fdp_attended`
--
ALTER TABLE `fdp_attended`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `fdp_conducted`
--
ALTER TABLE `fdp_conducted`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `gallery_items`
--
ALTER TABLE `gallery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_category` (`category`);

--
-- Indexes for table `green_initiatives`
--
ALTER TABLE `green_initiatives`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_initiative_type` (`initiative_type`);

--
-- Indexes for table `hackathons`
--
ALTER TABLE `hackathons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `hackathon_documents`
--
ALTER TABLE `hackathon_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hackathon_galleries`
--
ALTER TABLE `hackathon_galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hackathon_gallery_images`
--
ALTER TABLE `hackathon_gallery_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_id` (`gallery_id`);

--
-- Indexes for table `handbooks`
--
ALTER TABLE `handbooks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `hod_info`
--
ALTER TABLE `hod_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dept` (`dept`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `industry_interactions`
--
ALTER TABLE `industry_interactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `laboratories`
--
ALTER TABLE `laboratories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `labs`
--
ALTER TABLE `labs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_faculty`
--
ALTER TABLE `mech_faculty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_faculty_type` (`faculty_type`),
  ADD KEY `idx_designation` (`designation`);

--
-- Indexes for table `mech_facultyachievements`
--
ALTER TABLE `mech_facultyachievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_academic_year` (`academic_year`);

--
-- Indexes for table `mech_facultyTLmethods`
--
ALTER TABLE `mech_facultyTLmethods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_laboratories`
--
ALTER TABLE `mech_laboratories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_library`
--
ALTER TABLE `mech_library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_magazines`
--
ALTER TABLE `mech_magazines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_mous`
--
ALTER TABLE `mech_mous`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_newsletters`
--
ALTER TABLE `mech_newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_placements`
--
ALTER TABLE `mech_placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_project_research`
--
ALTER TABLE `mech_project_research`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_studentachievements`
--
ALTER TABLE `mech_studentachievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_syllabus`
--
ALTER TABLE `mech_syllabus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_technicalassociation`
--
ALTER TABLE `mech_technicalassociation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mech_workshops`
--
ALTER TABLE `mech_workshops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merit_images`
--
ALTER TABLE `merit_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merit_scholars`
--
ALTER TABLE `merit_scholars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `merit_scholarships`
--
ALTER TABLE `merit_scholarships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_achievement_type` (`achievement_type`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `mous`
--
ALTER TABLE `mous`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `non_teaching_bsh_faculty`
--
ALTER TABLE `non_teaching_bsh_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `non_teaching_civil_staff`
--
ALTER TABLE `non_teaching_civil_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `non_teaching_staff`
--
ALTER TABLE `non_teaching_staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `organized_events`
--
ALTER TABLE `organized_events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_password_resets_users_idx` (`user_id`);

--
-- Indexes for table `physical_facilities`
--
ALTER TABLE `physical_facilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_facility_type` (`facility_type`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `placements`
--
ALTER TABLE `placements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placements_table`
--
ALTER TABLE `placements_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_batches`
--
ALTER TABLE `placement_batches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `placement_companies`
--
ALTER TABLE `placement_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_content`
--
ALTER TABLE `placement_content`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `content_key` (`content_key`);

--
-- Indexes for table `placement_gallery`
--
ALTER TABLE `placement_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_officers`
--
ALTER TABLE `placement_officers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_process`
--
ALTER TABLE `placement_process`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_reports`
--
ALTER TABLE `placement_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_services`
--
ALTER TABLE `placement_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `placement_statistics`
--
ALTER TABLE `placement_statistics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_dept_year` (`department`,`academic_year`);

--
-- Indexes for table `placement_stats`
--
ALTER TABLE `placement_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_development`
--
ALTER TABLE `product_development`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_current_status` (`current_status`);

--
-- Indexes for table `program_objectives`
--
ALTER TABLE `program_objectives`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_dept_type_number` (`dept`,`objective_type`,`objective_number`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_objective_type` (`objective_type`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `recruiters`
--
ALTER TABLE `recruiters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `research_centers`
--
ALTER TABLE `research_centers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `research_development_activities`
--
ALTER TABLE `research_development_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_activity_type` (`activity_type`),
  ADD KEY `idx_faculty_name` (`faculty_name`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `research_projects`
--
ALTER TABLE `research_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_project_type` (`project_type`),
  ADD KEY `idx_principal_investigator` (`principal_investigator`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `seminar_halls`
--
ALTER TABLE `seminar_halls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `student_achievements`
--
ALTER TABLE `student_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department_category` (`department`,`category`),
  ADD KEY `idx_batch` (`batch`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_student` (`roll_number`,`student_name`),
  ADD KEY `idx_achievement_date` (`achievement_date`),
  ADD KEY `idx_status_featured` (`status`,`is_featured`);

--
-- Indexes for table `student_research`
--
ALTER TABLE `student_research`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_research_type` (`research_type`),
  ADD KEY `idx_academic_year` (`academic_year`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `fk_research_created_by_idx` (`created_by`);

--
-- Indexes for table `super_admin_permissions`
--
ALTER TABLE `super_admin_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_permission_resource` (`user_id`,`permission`,`resource`),
  ADD KEY `fk_permissions_user_idx` (`user_id`),
  ADD KEY `fk_permissions_granted_by_idx` (`granted_by`),
  ADD KEY `idx_permission` (`permission`);

--
-- Indexes for table `syllabus`
--
ALTER TABLE `syllabus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dept` (`dept`);

--
-- Indexes for table `syllabus_documents`
--
ALTER TABLE `syllabus_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_type` (`type`);

--
-- Indexes for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_key` (`key_name`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `fk_settings_updated_by_idx` (`updated_by`);

--
-- Indexes for table `technical_associations`
--
ALTER TABLE `technical_associations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `technical_association_activities`
--
ALTER TABLE `technical_association_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_activity_type` (`activity_type`),
  ADD KEY `idx_event_date` (`event_date`),
  ADD KEY `idx_display_order` (`display_order`);

--
-- Indexes for table `technical_magazines`
--
ALTER TABLE `technical_magazines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_magazine_type` (`magazine_type`),
  ADD KEY `idx_publication_date` (`publication_date`);

--
-- Indexes for table `technical_staff`
--
ALTER TABLE `technical_staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_dept` (`dept`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `idx_department` (`department`),
  ADD KEY `idx_role` (`role`);

--
-- Indexes for table `workshops`
--
ALTER TABLE `workshops`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yearly_placement_reports`
--
ALTER TABLE `yearly_placement_reports`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_toppers_batches`
--
ALTER TABLE `academic_toppers_batches`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `academic_toppers_galleries`
--
ALTER TABLE `academic_toppers_galleries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `academic_toppers_gallery_images`
--
ALTER TABLE `academic_toppers_gallery_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `academic_toppers_stats`
--
ALTER TABLE `academic_toppers_stats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin_approvals`
--
ALTER TABLE `admin_approvals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aiml_classrooms`
--
ALTER TABLE `aiml_classrooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aiml_class_time_tables`
--
ALTER TABLE `aiml_class_time_tables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aiml_laboratories`
--
ALTER TABLE `aiml_laboratories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aiml_other_laboratories`
--
ALTER TABLE `aiml_other_laboratories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aiml_seminar_halls`
--
ALTER TABLE `aiml_seminar_halls`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aiml_student_achievements`
--
ALTER TABLE `aiml_student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `board_of_studies`
--
ALTER TABLE `board_of_studies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bos_civil_meeting_minutes`
--
ALTER TABLE `bos_civil_meeting_minutes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bos_meeting_minutes`
--
ALTER TABLE `bos_meeting_minutes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_activities`
--
ALTER TABLE `bsh_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_board_of_studies`
--
ALTER TABLE `bsh_board_of_studies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_department_documents`
--
ALTER TABLE `bsh_department_documents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_department_profile`
--
ALTER TABLE `bsh_department_profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_faculty`
--
ALTER TABLE `bsh_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_faculty_achievements`
--
ALTER TABLE `bsh_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_faculty_paper_presentations`
--
ALTER TABLE `bsh_faculty_paper_presentations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_laboratories`
--
ALTER TABLE `bsh_laboratories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_results`
--
ALTER TABLE `bsh_results`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_student_achievements`
--
ALTER TABLE `bsh_student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_syllabus`
--
ALTER TABLE `bsh_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_fdps`
--
ALTER TABLE `bsh_fdps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bsh_photogallery`
--
ALTER TABLE `bsh_photogallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_faculty`
--
ALTER TABLE `cai_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_bos_members`
--
ALTER TABLE `cai_bos_members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_eresources`
--
ALTER TABLE `cai_eresources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_extracurricular_activities`
--
ALTER TABLE `cai_extracurricular_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_faculty_achievements`
--
ALTER TABLE `cai_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_faculty_development_programs`
--
ALTER TABLE `cai_faculty_development_programs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_hackathons`
--
ALTER TABLE `cai_hackathons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_hackathon_gallery`
--
ALTER TABLE `cai_hackathon_gallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_merit_scholarships`
--
ALTER TABLE `cai_merit_scholarships`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_newsletters`
--
ALTER TABLE `cai_newsletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_scud_activities`
--
ALTER TABLE `cai_scud_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_scud_gallery`
--
ALTER TABLE `cai_scud_gallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_training_activities`
--
ALTER TABLE `cai_training_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_training_gallery`
--
ALTER TABLE `cai_training_gallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cai_placements`
--
ALTER TABLE `cai_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_consultancy`
--
ALTER TABLE `civil_consultancy`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_extra_curricular_activities`
--
ALTER TABLE `civil_extra_curricular_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_newsletters`
--
ALTER TABLE `civil_newsletters`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_physical_facilities`
--
ALTER TABLE `civil_physical_facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_student_achievements`
--
ALTER TABLE `civil_student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_syllabus`
--
ALTER TABLE `civil_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_technical_association`
--
ALTER TABLE `civil_technical_association`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `civil_workshops`
--
ALTER TABLE `civil_workshops`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consultancy_activities`
--
ALTER TABLE `consultancy_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cse_department_library`
--
ALTER TABLE `cse_department_library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cse_eresources`
--
ALTER TABLE `cse_eresources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cse_faculty_achievements`
--
ALTER TABLE `cse_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cse_student_achievements`
--
ALTER TABLE `cse_student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cse_syllabus`
--
ALTER TABLE `cse_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_bos_members`
--
ALTER TABLE `cst_bos_members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_bos_minutes`
--
ALTER TABLE `cst_bos_minutes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_department_library`
--
ALTER TABLE `cst_department_library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_department_overview`
--
ALTER TABLE `cst_department_overview`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_eresources`
--
ALTER TABLE `cst_eresources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_extra_curricular`
--
ALTER TABLE `cst_extra_curricular`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_faculty`
--
ALTER TABLE `cst_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_faculty_achievements`
--
ALTER TABLE `cst_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_faculty_development`
--
ALTER TABLE `cst_faculty_development`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_hackathons`
--
ALTER TABLE `cst_hackathons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_handbooks`
--
ALTER TABLE `cst_handbooks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_industry_programs`
--
ALTER TABLE `cst_industry_programs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_merit_scholarships`
--
ALTER TABLE `cst_merit_scholarships`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_mous`
--
ALTER TABLE `cst_mous`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_newsletters`
--
ALTER TABLE `cst_newsletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_non_teaching_faculty`
--
ALTER TABLE `cst_non_teaching_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_physical_facilities`
--
ALTER TABLE `cst_physical_facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_placements`
--
ALTER TABLE `cst_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_sahaya_events`
--
ALTER TABLE `cst_sahaya_events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_scud_activities`
--
ALTER TABLE `cst_scud_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_student_achievements`
--
ALTER TABLE `cst_student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_syllabus`
--
ALTER TABLE `cst_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_technical_faculty`
--
ALTER TABLE `cst_technical_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cst_training_activities`
--
ALTER TABLE `cst_training_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departmental_activities`
--
ALTER TABLE `departmental_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_contact`
--
ALTER TABLE `department_contact`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_courses`
--
ALTER TABLE `department_courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_credentials`
--
ALTER TABLE `department_credentials`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_data_access`
--
ALTER TABLE `department_data_access`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_eresources`
--
ALTER TABLE `department_eresources`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_facilities`
--
ALTER TABLE `department_facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_info`
--
ALTER TABLE `department_info`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_info_sections`
--
ALTER TABLE `department_info_sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_library`
--
ALTER TABLE `department_library`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_placements`
--
ALTER TABLE `department_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_profile_sections`
--
ALTER TABLE `department_profile_sections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_sidebar_items`
--
ALTER TABLE `department_sidebar_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department_yearly_placements`
--
ALTER TABLE `department_yearly_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_board_of_studies`
--
ALTER TABLE `ds_board_of_studies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_bos_meeting_minutes`
--
ALTER TABLE `ds_bos_meeting_minutes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_contact`
--
ALTER TABLE `ds_contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_department_library`
--
ALTER TABLE `ds_department_library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_department_profile`
--
ALTER TABLE `ds_department_profile`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_eresources`
--
ALTER TABLE `ds_eresources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_extracurricular`
--
ALTER TABLE `ds_extracurricular`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_faculty`
--
ALTER TABLE `ds_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_faculty_achievements`
--
ALTER TABLE `ds_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_faculty_development`
--
ALTER TABLE `ds_faculty_development`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_hackathons`
--
ALTER TABLE `ds_hackathons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_handbooks`
--
ALTER TABLE `ds_handbooks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_merit_scholarships`
--
ALTER TABLE `ds_merit_scholarships`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_mous`
--
ALTER TABLE `ds_mous`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_newsletters`
--
ALTER TABLE `ds_newsletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_non_teaching_staff`
--
ALTER TABLE `ds_non_teaching_staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_physical_facilities`
--
ALTER TABLE `ds_physical_facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_placements`
--
ALTER TABLE `ds_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_student_achievements`
--
ALTER TABLE `ds_student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_syllabus`
--
ALTER TABLE `ds_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_technical_association`
--
ALTER TABLE `ds_technical_association`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_training_activities`
--
ALTER TABLE `ds_training_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ds_workshops`
--
ALTER TABLE `ds_workshops`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_clubs`
--
ALTER TABLE `ece_clubs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_extracurricular_activities`
--
ALTER TABLE `ece_extracurricular_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_faculty_achievements`
--
ALTER TABLE `ece_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_faculty_innovations`
--
ALTER TABLE `ece_faculty_innovations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_fdp`
--
ALTER TABLE `ece_fdp`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_handbooks`
--
ALTER TABLE `ece_handbooks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_mous`
--
ALTER TABLE `ece_mous`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_newletters`
--
ALTER TABLE `ece_newletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_nonteaching_faculty`
--
ALTER TABLE `ece_nonteaching_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_physical_facilities`
--
ALTER TABLE `ece_physical_facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_placements`
--
ALTER TABLE `ece_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_scholarships_toppers`
--
ALTER TABLE `ece_scholarships_toppers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_syllabus`
--
ALTER TABLE `ece_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_teaching_faculty`
--
ALTER TABLE `ece_teaching_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_technicalAssociation_trainingActivities`
--
ALTER TABLE `ece_technicalAssociation_trainingActivities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ece_worshops_gl`
--
ALTER TABLE `ece_worshops_gl`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_clubs`
--
ALTER TABLE `ect_clubs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_extracurricular_activities`
--
ALTER TABLE `ect_extracurricular_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_faculty`
--
ALTER TABLE `ect_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_facultyinnovations`
--
ALTER TABLE `ect_facultyinnovations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_faculty_achievements`
--
ALTER TABLE `ect_faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_fdp`
--
ALTER TABLE `ect_fdp`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_handbooks`
--
ALTER TABLE `ect_handbooks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_mous`
--
ALTER TABLE `ect_mous`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_newsletters`
--
ALTER TABLE `ect_newsletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_physical_facilities`
--
ALTER TABLE `ect_physical_facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_placements`
--
ALTER TABLE `ect_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_scholarships_toppers`
--
ALTER TABLE `ect_scholarships_toppers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_syllabus`
--
ALTER TABLE `ect_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_technical_association`
--
ALTER TABLE `ect_technical_association`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_training_activities`
--
ALTER TABLE `ect_training_activities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ect_workshop_gl`
--
ALTER TABLE `ect_workshop_gl`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `EEE_Syllabus`
--
ALTER TABLE `EEE_Syllabus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extracurriculars`
--
ALTER TABLE `extracurriculars`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extra_curricular_activities`
--
ALTER TABLE `extra_curricular_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extra_curricular_clubs`
--
ALTER TABLE `extra_curricular_clubs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extra_curricular_docs`
--
ALTER TABLE `extra_curricular_docs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `e_resources`
--
ALTER TABLE `e_resources`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty_achievements`
--
ALTER TABLE `faculty_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty_development_programs`
--
ALTER TABLE `faculty_development_programs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty_innovations`
--
ALTER TABLE `faculty_innovations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty_profiles`
--
ALTER TABLE `faculty_profiles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fdp_attended`
--
ALTER TABLE `fdp_attended`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fdp_conducted`
--
ALTER TABLE `fdp_conducted`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_items`
--
ALTER TABLE `gallery_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `green_initiatives`
--
ALTER TABLE `green_initiatives`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hackathons`
--
ALTER TABLE `hackathons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hackathon_documents`
--
ALTER TABLE `hackathon_documents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hackathon_galleries`
--
ALTER TABLE `hackathon_galleries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hackathon_gallery_images`
--
ALTER TABLE `hackathon_gallery_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `handbooks`
--
ALTER TABLE `handbooks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hod_info`
--
ALTER TABLE `hod_info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `industry_interactions`
--
ALTER TABLE `industry_interactions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laboratories`
--
ALTER TABLE `laboratories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `labs`
--
ALTER TABLE `labs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_faculty`
--
ALTER TABLE `mech_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_facultyachievements`
--
ALTER TABLE `mech_facultyachievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_facultyTLmethods`
--
ALTER TABLE `mech_facultyTLmethods`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_laboratories`
--
ALTER TABLE `mech_laboratories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_library`
--
ALTER TABLE `mech_library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_magazines`
--
ALTER TABLE `mech_magazines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_mous`
--
ALTER TABLE `mech_mous`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_newsletters`
--
ALTER TABLE `mech_newsletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_placements`
--
ALTER TABLE `mech_placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_project_research`
--
ALTER TABLE `mech_project_research`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_studentachievements`
--
ALTER TABLE `mech_studentachievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_syllabus`
--
ALTER TABLE `mech_syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_technicalassociation`
--
ALTER TABLE `mech_technicalassociation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mech_workshops`
--
ALTER TABLE `mech_workshops`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merit_images`
--
ALTER TABLE `merit_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merit_scholars`
--
ALTER TABLE `merit_scholars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merit_scholarships`
--
ALTER TABLE `merit_scholarships`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mous`
--
ALTER TABLE `mous`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `non_teaching_bsh_faculty`
--
ALTER TABLE `non_teaching_bsh_faculty`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `non_teaching_civil_staff`
--
ALTER TABLE `non_teaching_civil_staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `non_teaching_staff`
--
ALTER TABLE `non_teaching_staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organized_events`
--
ALTER TABLE `organized_events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `physical_facilities`
--
ALTER TABLE `physical_facilities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placements`
--
ALTER TABLE `placements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placements_table`
--
ALTER TABLE `placements_table`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_batches`
--
ALTER TABLE `placement_batches`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_companies`
--
ALTER TABLE `placement_companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_content`
--
ALTER TABLE `placement_content`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_gallery`
--
ALTER TABLE `placement_gallery`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_officers`
--
ALTER TABLE `placement_officers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_process`
--
ALTER TABLE `placement_process`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_reports`
--
ALTER TABLE `placement_reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_services`
--
ALTER TABLE `placement_services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_statistics`
--
ALTER TABLE `placement_statistics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placement_stats`
--
ALTER TABLE `placement_stats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_development`
--
ALTER TABLE `product_development`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_objectives`
--
ALTER TABLE `program_objectives`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recruiters`
--
ALTER TABLE `recruiters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `research_centers`
--
ALTER TABLE `research_centers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `research_development_activities`
--
ALTER TABLE `research_development_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `research_projects`
--
ALTER TABLE `research_projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seminar_halls`
--
ALTER TABLE `seminar_halls`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_achievements`
--
ALTER TABLE `student_achievements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_research`
--
ALTER TABLE `student_research`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super_admin_permissions`
--
ALTER TABLE `super_admin_permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `syllabus`
--
ALTER TABLE `syllabus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `syllabus_documents`
--
ALTER TABLE `syllabus_documents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_settings`
--
ALTER TABLE `system_settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `technical_associations`
--
ALTER TABLE `technical_associations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `technical_association_activities`
--
ALTER TABLE `technical_association_activities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `technical_magazines`
--
ALTER TABLE `technical_magazines`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `technical_staff`
--
ALTER TABLE `technical_staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workshops`
--
ALTER TABLE `workshops`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `yearly_placement_reports`
--
ALTER TABLE `yearly_placement_reports`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `academic_toppers_gallery_images`
--
ALTER TABLE `academic_toppers_gallery_images`
  ADD CONSTRAINT `academic_toppers_gallery_images_ibfk_1` FOREIGN KEY (`gallery_id`) REFERENCES `hackathon_galleries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `admin_approvals`
--
ALTER TABLE `admin_approvals`
  ADD CONSTRAINT `fk_admin_approvals_users` FOREIGN KEY (`approver_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `cai_hackathon_gallery`
--
ALTER TABLE `cai_hackathon_gallery`
  ADD CONSTRAINT `cai_hackathon_gallery_ibfk_1` FOREIGN KEY (`hackathon_id`) REFERENCES `cai_hackathons` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `department_credentials`
--
ALTER TABLE `department_credentials`
  ADD CONSTRAINT `fk_dept_cred_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `department_data_access`
--
ALTER TABLE `department_data_access`
  ADD CONSTRAINT `fk_data_access_granted_by` FOREIGN KEY (`granted_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_data_access_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hackathon_gallery_images`
--
ALTER TABLE `hackathon_gallery_images`
  ADD CONSTRAINT `hackathon_gallery_images_ibfk_1` FOREIGN KEY (`gallery_id`) REFERENCES `hackathon_galleries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `fk_password_resets_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_research`
--
ALTER TABLE `student_research`
  ADD CONSTRAINT `fk_research_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `super_admin_permissions`
--
ALTER TABLE `super_admin_permissions`
  ADD CONSTRAINT `fk_permissions_granted_by` FOREIGN KEY (`granted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_permissions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `system_settings`
--
ALTER TABLE `system_settings`
  ADD CONSTRAINT `fk_settings_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
