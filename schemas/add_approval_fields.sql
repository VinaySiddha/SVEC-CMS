-- Add approval fields to faculty_profiles table
ALTER TABLE faculty_profiles 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;

-- Add approval fields to faculty_achievements table
ALTER TABLE faculty_achievements 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;

-- Add approval fields to student_achievements table
ALTER TABLE student_achievements 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;

-- Add approval fields to labs table
ALTER TABLE labs 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;

-- Add approval fields to workshops table
ALTER TABLE workshops 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;

-- Add approval fields to fdp table if not exists
ALTER TABLE fdp 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;

-- Add approval fields to organized_events table if not exists
ALTER TABLE organized_events 
ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
ADD COLUMN reviewed_by VARCHAR(255) NULL,
ADD COLUMN reviewed_at TIMESTAMP NULL,
ADD COLUMN review_comments TEXT NULL;
