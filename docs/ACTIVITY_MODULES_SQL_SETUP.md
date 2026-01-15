# Activity Modules - MySQL Table Creation Scripts

## Overview
SQL scripts to create the supporting tables for activity module management across all departments.

## CSE-AI Activity Tables

### Create Activity Coordinators Table
```sql
CREATE TABLE IF NOT EXISTS `cai_activity_coordinators` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(150),
  `role` ENUM('faculty_coordinator', 'student_coordinator', 'co_coordinator') NOT NULL,
  `email` VARCHAR(150),
  `phone` VARCHAR(20),
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_name` (`name`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Create Activity Events Table
```sql
CREATE TABLE IF NOT EXISTS `cai_activity_events` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `event_title` VARCHAR(255) NOT NULL,
  `event_date` DATE,
  `description` LONGTEXT,
  `file_url` VARCHAR(500),
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_academic_year` (`academic_year`),
  INDEX `idx_event_title` (`event_title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Create Activity Gallery Table
```sql
CREATE TABLE IF NOT EXISTS `cai_activity_gallery` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20),
  `image_url` VARCHAR(500) NOT NULL,
  `image_title` VARCHAR(255),
  `description` LONGTEXT,
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_academic_year` (`academic_year`),
  INDEX `idx_order_seq` (`order_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## MBA Activity Tables

Replace `cai_` with `mba_` in all table names and foreign key references:

```sql
CREATE TABLE IF NOT EXISTS `mba_activity_coordinators` (...) -- Same structure as CSE-AI
CREATE TABLE IF NOT EXISTS `mba_activity_events` (...)      -- Same structure as CSE-AI
CREATE TABLE IF NOT EXISTS `mba_activity_gallery` (...)     -- Same structure as CSE-AI
```

## AIML Activity Tables

Replace `cai_` with `aiml_` in all table names and foreign key references:

```sql
CREATE TABLE IF NOT EXISTS `aiml_activity_coordinators` (...) -- Same structure as CSE-AI
CREATE TABLE IF NOT EXISTS `aiml_activity_events` (...)       -- Same structure as CSE-AI
CREATE TABLE IF NOT EXISTS `aiml_activity_gallery` (...)      -- Same structure as CSE-AI
```

## CSE-DS Activity Tables

Replace `cai_` with `ds_` in all table names and foreign key references:

```sql
CREATE TABLE IF NOT EXISTS `ds_activity_coordinators` (...)  -- Same structure as CSE-AI
CREATE TABLE IF NOT EXISTS `ds_activity_events` (...)        -- Same structure as CSE-AI
CREATE TABLE IF NOT EXISTS `ds_activity_gallery` (...)       -- Same structure as CSE-AI
```

## Bulk Creation Script (All Departments)

```sql
-- ==========================================
-- CSE-AI Activity Tables
-- ==========================================

CREATE TABLE IF NOT EXISTS `cai_activity_coordinators` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(150),
  `role` ENUM('faculty_coordinator', 'student_coordinator', 'co_coordinator') NOT NULL,
  `email` VARCHAR(150),
  `phone` VARCHAR(20),
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cai_activity_events` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `event_title` VARCHAR(255) NOT NULL,
  `event_date` DATE,
  `description` LONGTEXT,
  `file_url` VARCHAR(500),
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`),
  INDEX `idx_academic_year` (`academic_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cai_activity_gallery` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20),
  `image_url` VARCHAR(500) NOT NULL,
  `image_title` VARCHAR(255),
  `description` LONGTEXT,
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- MBA Activity Tables
-- ==========================================

CREATE TABLE IF NOT EXISTS `mba_activity_coordinators` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(150),
  `role` ENUM('faculty_coordinator', 'student_coordinator', 'co_coordinator') NOT NULL,
  `email` VARCHAR(150),
  `phone` VARCHAR(20),
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `mba_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `mba_activity_events` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `event_title` VARCHAR(255) NOT NULL,
  `event_date` DATE,
  `description` LONGTEXT,
  `file_url` VARCHAR(500),
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `mba_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `mba_activity_gallery` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20),
  `image_url` VARCHAR(500) NOT NULL,
  `image_title` VARCHAR(255),
  `description` LONGTEXT,
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `mba_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- AIML Activity Tables
-- ==========================================

CREATE TABLE IF NOT EXISTS `aiml_activity_coordinators` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(150),
  `role` ENUM('faculty_coordinator', 'student_coordinator', 'co_coordinator') NOT NULL,
  `email` VARCHAR(150),
  `phone` VARCHAR(20),
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `aiml_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `aiml_activity_events` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `event_title` VARCHAR(255) NOT NULL,
  `event_date` DATE,
  `description` LONGTEXT,
  `file_url` VARCHAR(500),
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `aiml_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `aiml_activity_gallery` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20),
  `image_url` VARCHAR(500) NOT NULL,
  `image_title` VARCHAR(255),
  `description` LONGTEXT,
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `aiml_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- CSE-DS Activity Tables
-- ==========================================

CREATE TABLE IF NOT EXISTS `ds_activity_coordinators` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(150),
  `role` ENUM('faculty_coordinator', 'student_coordinator', 'co_coordinator') NOT NULL,
  `email` VARCHAR(150),
  `phone` VARCHAR(20),
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `ds_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ds_activity_events` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20) NOT NULL,
  `event_title` VARCHAR(255) NOT NULL,
  `event_date` DATE,
  `description` LONGTEXT,
  `file_url` VARCHAR(500),
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `ds_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ds_activity_gallery` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `activity_id` INT NOT NULL,
  `academic_year` VARCHAR(20),
  `image_url` VARCHAR(500) NOT NULL,
  `image_title` VARCHAR(255),
  `description` LONGTEXT,
  `order_seq` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `ds_extracurricular_activities`(`id`) ON DELETE CASCADE,
  INDEX `idx_activity_id` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Schema Notes

### Field Types
- **id**: Primary key (auto-increment)
- **activity_id**: Foreign key to parent activity table
- **Text Fields**: VARCHAR for names, titles, designation (up to 255 chars)
- **Long Content**: LONGTEXT for descriptions
- **Files**: VARCHAR(500) for file paths/URLs
- **Enums**: Predefined role types
- **Timestamps**: Auto-managed created_at and updated_at

### Indexes
- Foreign key indexes for efficient joins
- Name/title indexes for search operations
- Academic year index for filtering

### Constraints
- NOT NULL on required fields (name, title, image_url)
- DEFAULT values for order_seq, timestamps
- CASCADE DELETE for referential integrity

## Verification Queries

```sql
-- Check if tables exist
SHOW TABLES LIKE '%_activity_%';

-- Verify table structure
DESCRIBE cai_activity_coordinators;
DESCRIBE cai_activity_events;
DESCRIBE cai_activity_gallery;

-- Check foreign key relationships
SELECT CONSTRAINT_NAME, TABLE_NAME, REFERENCED_TABLE_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_NAME LIKE '%_activity_%';

-- Count records by activity
SELECT 
  activity_id,
  COUNT(*) as coordinator_count 
FROM cai_activity_coordinators 
GROUP BY activity_id;
```

---
*SQL scripts for creating activity module tables for CSE-AI, MBA, AIML, and CSE-DS departments*
