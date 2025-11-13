const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

async function addPlacementUser() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '62.72.31.209',
      user: process.env.DB_USER || 'cmsuser',
      password: process.env.DB_PASSWORD || 'V@savi@2001',
      database: process.env.DB_NAME || 'svec_cms'
    });

    console.log('Connected to database');

    // Check if users table exists, if not create it
    try {
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          department VARCHAR(100),
          department_name VARCHAR(255),
          role VARCHAR(100) NOT NULL,
          is_active BOOLEAN DEFAULT true,
          last_login TIMESTAMP NULL,
          login_count INT DEFAULT 0,
          must_change_password BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP NULL,
          INDEX idx_username (username),
          INDEX idx_role (role)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✓ Users table ready');
    } catch (e) {
      console.log('✓ Users table already exists');
    }

    // Add placement user
    try {
      const hashedPassword = await hashPassword('placement@2025');
      
      await connection.execute(
        `INSERT INTO users (username, password_hash, email, role, department, department_name, is_active)
         VALUES (?, ?, ?, ?, ?, ?, true)
         ON DUPLICATE KEY UPDATE
         password_hash = VALUES(password_hash),
         is_active = true`,
        [
          'placement',
          hashedPassword,
          'placement@srivasaviengg.ac.in',
          'placement',
          'Placement Cell',
          'Placement Cell'
        ]
      );
      
      console.log('✓ Placement user added/updated');
      console.log('  Username: placement');
      console.log('  Password: placement@2025');
      console.log('  Role: placement');
    } catch (e) {
      if (e.code !== 'ER_DUP_ENTRY') {
        console.error('Error adding user:', e.message);
      }
    }

    console.log('\n✓ Placement user setup completed!');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Setup error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

addPlacementUser();
