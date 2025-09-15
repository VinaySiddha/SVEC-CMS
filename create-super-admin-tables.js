const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000
};

async function createSuperAdminTables() {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    
    console.log('Creating super_admin_permissions table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS super_admin_permissions (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NOT NULL,
        permission VARCHAR(100) NOT NULL COMMENT 'e.g., manage_users, view_all_departments, create_credentials',
        resource VARCHAR(100) NULL COMMENT 'specific resource if applicable, e.g., department_code',
        granted_by BIGINT UNSIGNED NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NULL COMMENT 'NULL means no expiration',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        PRIMARY KEY (id),
        UNIQUE INDEX unique_user_permission_resource (user_id, permission, resource),
        INDEX fk_permissions_user_idx (user_id ASC),
        INDEX fk_permissions_granted_by_idx (granted_by ASC),
        INDEX idx_permission (permission ASC),
        CONSTRAINT fk_permissions_user
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT fk_permissions_granted_by
          FOREIGN KEY (granted_by)
          REFERENCES users (id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Creating department_credentials table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS department_credentials (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        department_code VARCHAR(32) NOT NULL,
        username VARCHAR(64) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        access_level ENUM('read', 'write', 'admin') NOT NULL DEFAULT 'read',
        allowed_modules JSON NULL COMMENT 'JSON array of allowed modules/features',
        created_by BIGINT UNSIGNED NOT NULL,
        expires_at TIMESTAMP NULL,
        last_login TIMESTAMP NULL,
        login_count INT UNSIGNED NOT NULL DEFAULT 0,
        max_sessions INT UNSIGNED NOT NULL DEFAULT 1,
        session_timeout INT UNSIGNED NOT NULL DEFAULT 3600 COMMENT 'seconds',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX unique_dept_username (department_code, username),
        UNIQUE INDEX unique_dept_email (department_code, email),
        INDEX idx_department (department_code ASC),
        INDEX fk_dept_cred_created_by_idx (created_by ASC),
        CONSTRAINT fk_dept_cred_created_by
          FOREIGN KEY (created_by)
          REFERENCES users (id)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Creating audit_logs table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NULL,
        action VARCHAR(100) NOT NULL COMMENT 'e.g., login, create_user, delete_department',
        resource_type VARCHAR(50) NULL COMMENT 'e.g., user, department, credential',
        resource_id VARCHAR(100) NULL COMMENT 'ID of the affected resource',
        old_values JSON NULL COMMENT 'Previous values before change',
        new_values JSON NULL COMMENT 'New values after change',
        ip_address VARCHAR(45) NULL,
        user_agent TEXT NULL,
        success BOOLEAN NOT NULL DEFAULT TRUE,
        error_message TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_user_id (user_id ASC),
        INDEX idx_action (action ASC),
        INDEX idx_resource (resource_type ASC, resource_id ASC),
        INDEX idx_created_at (created_at ASC),
        CONSTRAINT fk_audit_user
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Creating system_settings table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS system_settings (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        key_name VARCHAR(100) NOT NULL,
        value TEXT NULL,
        category VARCHAR(50) NOT NULL DEFAULT 'general',
        description TEXT NULL,
        is_encrypted BOOLEAN NOT NULL DEFAULT FALSE,
        updated_by BIGINT UNSIGNED NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX unique_key (key_name),
        INDEX idx_category (category ASC),
        INDEX fk_settings_updated_by_idx (updated_by ASC),
        CONSTRAINT fk_settings_updated_by
          FOREIGN KEY (updated_by)
          REFERENCES users (id)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Creating department_data_access table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS department_data_access (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        user_id BIGINT UNSIGNED NOT NULL,
        department_code VARCHAR(32) NOT NULL,
        table_name VARCHAR(100) NOT NULL,
        can_read BOOLEAN NOT NULL DEFAULT TRUE,
        can_write BOOLEAN NOT NULL DEFAULT FALSE,
        can_delete BOOLEAN NOT NULL DEFAULT FALSE,
        conditions JSON NULL COMMENT 'Additional WHERE conditions for data access',
        granted_by BIGINT UNSIGNED NOT NULL,
        expires_at TIMESTAMP NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE INDEX unique_user_dept_table (user_id, department_code, table_name),
        INDEX idx_department (department_code ASC),
        INDEX idx_table (table_name ASC),
        INDEX fk_data_access_user_idx (user_id ASC),
        INDEX fk_data_access_granted_by_idx (granted_by ASC),
        CONSTRAINT fk_data_access_user
          FOREIGN KEY (user_id)
          REFERENCES users (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT fk_data_access_granted_by
          FOREIGN KEY (granted_by)
          REFERENCES users (id)
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    await connection.end();
    console.log('All super admin tables created successfully!');
    
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  }
}

createSuperAdminTables();