const mysql = require('mysql2/promise');

async function createCollegeTable() {
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

    // Create colleges table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS colleges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        short_name VARCHAR(50),
        code VARCHAR(20) UNIQUE,
        type ENUM('Engineering', 'Arts', 'Science', 'Commerce', 'Medical', 'Law', 'Management', 'Other') DEFAULT 'Engineering',
        affiliation VARCHAR(255),
        university VARCHAR(255),
        accreditation VARCHAR(100),
        naac_grade ENUM('A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Accredited') DEFAULT 'Not Accredited',
        nirf_ranking INT NULL,
        
        -- Contact Information
        email VARCHAR(255),
        phone VARCHAR(20),
        fax VARCHAR(20),
        website VARCHAR(255),
        
        -- Address Information
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100) DEFAULT 'India',
        pincode VARCHAR(10),
        
        -- Administrative Information
        principal_name VARCHAR(255),
        principal_email VARCHAR(255),
        principal_phone VARCHAR(20),
        
        -- Establishment Information
        established_year INT,
        autonomous BOOLEAN DEFAULT FALSE,
        coed ENUM('Co-Educational', 'Men Only', 'Women Only') DEFAULT 'Co-Educational',
        
        -- Academic Information
        total_students INT DEFAULT 0,
        total_faculty INT DEFAULT 0,
        total_departments INT DEFAULT 0,
        
        -- Infrastructure
        campus_area DECIMAL(10,2), -- in acres
        hostel_capacity INT DEFAULT 0,
        library_books INT DEFAULT 0,
        
        -- Status and Metadata
        status ENUM('Active', 'Inactive', 'Affiliated', 'Autonomous') DEFAULT 'Active',
        logo_url VARCHAR(500),
        description TEXT,
        vision TEXT,
        mission TEXT,
        
        -- Timestamps
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        
        -- Indexes
        INDEX idx_name (name),
        INDEX idx_code (code),
        INDEX idx_type (type),
        INDEX idx_state (state),
        INDEX idx_city (city),
        INDEX idx_status (status),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created colleges table');

    // Create college_departments table for relationship
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS college_departments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college_id INT NOT NULL,
        department_name VARCHAR(100) NOT NULL,
        department_code VARCHAR(20),
        head_of_department VARCHAR(255),
        total_students INT DEFAULT 0,
        total_faculty INT DEFAULT 0,
        established_year INT,
        accreditation VARCHAR(100),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        
        FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
        INDEX idx_college_id (college_id),
        INDEX idx_department_code (department_code),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created college_departments table');

    // Create college_facilities table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS college_facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college_id INT NOT NULL,
        facility_name VARCHAR(255) NOT NULL,
        facility_type ENUM('Academic', 'Sports', 'Hostel', 'Transport', 'Medical', 'Other') DEFAULT 'Academic',
        description TEXT,
        capacity INT,
        is_available BOOLEAN DEFAULT TRUE,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        
        FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
        INDEX idx_college_id (college_id),
        INDEX idx_facility_type (facility_type),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created college_facilities table');

    console.log('\n✓ All college tables created successfully!');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Migration error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

createCollegeTable();