-- Department Admin Users SQL Script
-- This script creates the users table and inserts all department admin users
-- Based on the DEPARTMENT_ADMIN_SYSTEM.md documentation

-- Create users table if not exists
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    department VARCHAR(20) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    role ENUM('dept', 'admin', 'super_admin') DEFAULT 'dept',
    is_active BOOLEAN DEFAULT TRUE,
    must_change_password BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    login_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_department (department),
    INDEX idx_role (role)
);

-- Create audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(50) NULL,
    department VARCHAR(20) NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('success', 'failed', 'pending') DEFAULT 'success',
    error_message TEXT NULL,
    metadata JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    session_id VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource_type (resource_type),
    INDEX idx_department (department),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert Super Admin User
-- Password: SuperAdmin@2024 (hashed with bcrypt)
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'super_admin',
    'admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- SuperAdmin@2024
    'all',
    'System Administration',
    'super_admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department = VALUES(department),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Insert Department Admin Users
-- Computer Science & AI Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'cseai_admin',
    'cseai.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- CSEAIAdmin@2024
    'cse-ai',
    'Computer Science & AI',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Electronics & Communication Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'ece_admin',
    'ece.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- ECEAdmin@2024
    'ece',
    'Electronics & Communication Engineering',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Civil Engineering Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'civil_admin',
    'civil.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- CivilAdmin@2024
    'civil',
    'Civil Engineering',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Mechanical Engineering Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'mech_admin',
    'mech.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- MechAdmin@2024
    'mech',
    'Mechanical Engineering',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Computer Science Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'cse_admin',
    'cse.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- CSEAdmin@2024
    'cse',
    'Computer Science Engineering',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Computer Science & Technology Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'cst_admin',
    'cst.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- CSTAdmin@2024
    'cst',
    'Computer Science & Technology',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Electrical & Electronics Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'eee_admin',
    'eee.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- EEEAdmin@2024
    'eee',
    'Electrical & Electronics Engineering',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Business Administration Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'mba_admin',
    'mba.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- MBAAdmin@2024
    'mba',
    'Business Administration',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Basic Sciences & Humanities Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'bsh_admin',
    'bsh.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- BSHAdmin@2024
    'bsh',
    'Basic Sciences & Humanities',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Electronics & Communication Technology Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'ect_admin',
    'ect.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- ECTAdmin@2024
    'ect',
    'Electronics & Communication Technology',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- AI & Machine Learning Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'aiml_admin',
    'aiml.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- AIMLAdmin@2024
    'aiml',
    'AI & Machine Learning',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Computer Science & Data Science Admin
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active)
VALUES (
    'cseds_admin',
    'cseds.admin@svec.edu',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- CSEDSAdmin@2024
    'cse-ds',
    'Computer Science & Data Science',
    'admin',
    TRUE
) ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    department_name = VALUES(department_name),
    role = VALUES(role),
    is_active = TRUE;

-- Verify the insertions
SELECT 
    id,
    username,
    email,
    department,
    department_name,
    role,
    is_active,
    created_at
FROM users
ORDER BY 
    CASE role
        WHEN 'super_admin' THEN 1
        WHEN 'admin' THEN 2
        WHEN 'dept' THEN 3
    END,
    department;

-- Show summary
SELECT 
    role,
    COUNT(*) as user_count
FROM users
GROUP BY role
ORDER BY 
    CASE role
        WHEN 'super_admin' THEN 1
        WHEN 'admin' THEN 2
        WHEN 'dept' THEN 3
    END;