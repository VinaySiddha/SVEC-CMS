/**
 * Script to create department admin users for all departments
 * Run this script to initialize department admin accounts
 */

import { createUser, hashPassword, DEPARTMENTS } from '@/lib/auth/auth';
import { query } from '@/lib/db';

// Default admin users for each department
const departmentAdmins = [
  {
    username: 'cseai_admin',
    email: 'cseai.admin@svec.edu',
    password: 'CSEAIAdmin@2024',
    department: 'cse-ai',
    role: 'admin' as const,
  },
  {
    username: 'ece_admin',
    email: 'ece.admin@svec.edu',
    password: 'ECEAdmin@2024',
    department: 'ece',
    role: 'admin' as const,
  },
  {
    username: 'civil_admin',
    email: 'civil.admin@svec.edu',
    password: 'CivilAdmin@2024',
    department: 'civil',
    role: 'admin' as const,
  },
  {
    username: 'mech_admin',
    email: 'mech.admin@svec.edu',
    password: 'MechAdmin@2024',
    department: 'mech',
    role: 'admin' as const,
  },
  {
    username: 'cse_admin',
    email: 'cse.admin@svec.edu',
    password: 'CSEAdmin@2024',
    department: 'cse',
    role: 'admin' as const,
  },
  {
    username: 'cst_admin',
    email: 'cst.admin@svec.edu',
    password: 'CSTAdmin@2024',
    department: 'cst',
    role: 'admin' as const,
  },
  {
    username: 'eee_admin',
    email: 'eee.admin@svec.edu',
    password: 'EEEAdmin@2024',
    department: 'eee',
    role: 'admin' as const,
  },
  {
    username: 'mba_admin',
    email: 'mba.admin@svec.edu',
    password: 'MBAAdmin@2024',
    department: 'mba',
    role: 'admin' as const,
  },
  {
    username: 'bsh_admin',
    email: 'bsh.admin@svec.edu',
    password: 'BSHAdmin@2024',
    department: 'bsh',
    role: 'admin' as const,
  },
  {
    username: 'ect_admin',
    email: 'ect.admin@svec.edu',
    password: 'ECTAdmin@2024',
    department: 'ect',
    role: 'admin' as const,
  },
  {
    username: 'aiml_admin',
    email: 'aiml.admin@svec.edu',
    password: 'AIMLAdmin@2024',
    department: 'aiml',
    role: 'admin' as const,
  },
  {
    username: 'cseds_admin',
    email: 'cseds.admin@svec.edu',
    password: 'CSEDSAdmin@2024',
    department: 'cse-ds',
    role: 'admin' as const,
  }
];

// Super admin user
const superAdmin = {
  username: 'super_admin',
  email: 'admin@svec.edu',
  password: 'SuperAdmin@2024',
  department: 'all',
  role: 'super_admin' as const,
};

async function initializeAdminUsers() {
  console.log('🚀 Starting department admin users initialization...');

  try {
    // Create users table if it doesn't exist
    await query(`
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
      )
    `);

    // Create audit logs table
    await query(`
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
      )
    `);

    // Create super admin permissions table
    await query(`
      CREATE TABLE IF NOT EXISTS super_admin_permissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        permission VARCHAR(50) NOT NULL,
        resource VARCHAR(50) NULL,
        granted_by INT NULL,
        expires_at TIMESTAMP NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_permission (user_id, permission, resource),
        INDEX idx_user_id (user_id),
        INDEX idx_permission (permission),
        INDEX idx_expires_at (expires_at),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log('✅ Database tables created/verified');

    // Create super admin user first
    console.log('👑 Creating super admin user...');
    const hashedPassword = await hashPassword(superAdmin.password);
    
    await query(`
      INSERT INTO users (username, email, password_hash, department, department_name, role)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        password_hash = VALUES(password_hash),
        department = VALUES(department),
        department_name = VALUES(department_name),
        role = VALUES(role),
        is_active = TRUE
    `, [
      superAdmin.username,
      superAdmin.email,
      hashedPassword,
      superAdmin.department,
      'System Administration',
      superAdmin.role
    ]);

    console.log(`✅ Super admin created: ${superAdmin.username} / ${superAdmin.password}`);

    // Create department admin users
    console.log('🏢 Creating department admin users...');
    
    for (const admin of departmentAdmins) {
      try {
        const hashedPassword = await hashPassword(admin.password);
        const departmentName = DEPARTMENTS[admin.department as keyof typeof DEPARTMENTS];
        
        await query(`
          INSERT INTO users (username, email, password_hash, department, department_name, role)
          VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            password_hash = VALUES(password_hash),
            department = VALUES(department),
            department_name = VALUES(department_name),
            role = VALUES(role),
            is_active = TRUE
        `, [
          admin.username,
          admin.email,
          hashedPassword,
          admin.department,
          departmentName,
          admin.role
        ]);

        console.log(`✅ Admin created for ${admin.department}: ${admin.username} / ${admin.password}`);
      } catch (error) {
        console.error(`❌ Failed to create admin for ${admin.department}:`, error);
      }
    }

    console.log('\n🎉 Department admin initialization completed!');
    console.log('\n📋 Login Credentials Summary:');
    console.log('=====================================');
    console.log(`Super Admin: ${superAdmin.username} / ${superAdmin.password}`);
    console.log('-------------------------------------');
    
    departmentAdmins.forEach(admin => {
      console.log(`${admin.department.toUpperCase()}: ${admin.username} / ${admin.password}`);
    });
    
    console.log('=====================================');
    console.log('\n🔐 Security Notes:');
    console.log('- Change default passwords after first login');
    console.log('- Store credentials securely');
    console.log('- Enable two-factor authentication if available');
    console.log('- Monitor audit logs for security events');

  } catch (error) {
    console.error('❌ Failed to initialize admin users:', error);
    throw error;
  }
}

// Export for use in Next.js API or standalone script
export { initializeAdminUsers, departmentAdmins, superAdmin };

// For direct execution (if running as standalone script)
if (require.main === module) {
  initializeAdminUsers()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
}