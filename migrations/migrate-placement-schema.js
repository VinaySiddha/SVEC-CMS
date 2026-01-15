const mysql = require('mysql2/promise');

async function migrateDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || '62.72.31.209',
      user: process.env.MYSQL_USER || 'cmsuser',
      password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
      database: 'svec_cms',
      port: Number(process.env.MYSQL_PORT) || 3306
    });

    console.log('Connected to database');

    // Create placement_staff table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS placement_staff (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        branch VARCHAR(100),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        office_phone VARCHAR(20),
        password_hash VARCHAR(255) NOT NULL,
        photo_url VARCHAR(255),
        qualifications TEXT,
        experience INT,
        research_interests TEXT,
        publications TEXT,
        profile_url VARCHAR(255),
        social_media_links JSON,
        bio TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        INDEX idx_email (email),
        INDEX idx_branch (branch),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created placement_staff table');

    // Create placement_companies table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS placement_companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo_url VARCHAR(255),
        category VARCHAR(100),
        industry VARCHAR(100),
        visit_year INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        INDEX idx_year (visit_year),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created placement_companies table');

    // Create placement_statistics table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS placement_statistics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        academic_year VARCHAR(50) NOT NULL,
        category ENUM('UG', 'PG') DEFAULT 'UG',
        total_placed INT DEFAULT 0,
        average_package DECIMAL(10, 2),
        highest_package DECIMAL(10, 2),
        lowest_package DECIMAL(10, 2),
        companies_visited INT DEFAULT 0,
        statistics_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        UNIQUE KEY unique_year_category (academic_year, category),
        INDEX idx_year (academic_year),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created placement_statistics table');

    // Create placement_details table (year-wise breakdown by branch)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS placement_details (
        id INT AUTO_INCREMENT PRIMARY KEY,
        academic_year VARCHAR(50) NOT NULL,
        branch VARCHAR(100) NOT NULL,
        category ENUM('UG', 'PG') DEFAULT 'UG',
        placed INT DEFAULT 0,
        not_placed INT DEFAULT 0,
        higher_studies INT DEFAULT 0,
        placement_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        UNIQUE KEY unique_year_branch_cat (academic_year, branch, category),
        INDEX idx_year (academic_year),
        INDEX idx_branch (branch),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created placement_details table');

    // Create placement_profile table (overall college placement info)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS placement_profile (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college_name VARCHAR(255),
        placement_heading TEXT,
        head_of_placement_id INT,
        coordinator_id INT,
        description TEXT,
        vision TEXT,
        mission TEXT,
        contact_email VARCHAR(255),
        contact_phone VARCHAR(20),
        office_address TEXT,
        social_media_links JSON,
        website VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        INDEX idx_deleted (deleted_at),
        FOREIGN KEY (head_of_placement_id) REFERENCES placement_staff(id) ON DELETE SET NULL,
        FOREIGN KEY (coordinator_id) REFERENCES placement_staff(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created placement_profile table');

    console.log('\n✓ All placement tables created successfully!');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Migration error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

migrateDatabase();
