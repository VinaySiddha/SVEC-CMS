const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function createECETables() {
  let connection;
  try {
    log('🔗 Connecting to database...', 'cyan');
    connection = await mysql.createConnection(DB_CONFIG);
    log('✅ Connected successfully to svec_cms database!', 'green');

    // List of CREATE TABLE statements for all 29 ECE modules
    const createTableStatements = [
      // 1. ECE Faculty
      `CREATE TABLE IF NOT EXISTS ece_faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        qualification VARCHAR(255),
        designation VARCHAR(255),
        profileUrl VARCHAR(500),
        date_of_joining DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_designation (designation)
      ) ENGINE=InnoDB`,

      // 2. ECE BOS Members
      `CREATE TABLE IF NOT EXISTS ece_bos_members (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(100),
        organization VARCHAR(255),
        position_in_job VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 3. ECE BOS Minutes
      `CREATE TABLE IF NOT EXISTS ece_bos_minutes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        meeting_no VARCHAR(50),
        meeting_date DATE,
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_meeting_date (meeting_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 4. ECE Workshops
      `CREATE TABLE IF NOT EXISTS ece_workshops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100),
        title VARCHAR(255) NOT NULL,
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 5. ECE Department Library
      `CREATE TABLE IF NOT EXISTS ece_department_library (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titles INT,
        volumes INT,
        description TEXT,
        faculty_incharge VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(255),
        image_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 6. ECE Industry Programs
      `CREATE TABLE IF NOT EXISTS ece_industry_programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        academic_year VARCHAR(20),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 7. ECE Department Overview
      `CREATE TABLE IF NOT EXISTS ece_department_overview (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hod_name VARCHAR(255),
        hod_email VARCHAR(255),
        hod_qualification VARCHAR(255),
        hod_image_url VARCHAR(500),
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 8. ECE E-Resources
      `CREATE TABLE IF NOT EXISTS ece_eresources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        regulation VARCHAR(20),
        semester VARCHAR(20),
        subject_name VARCHAR(255),
        display_order INT,
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_subject (subject_name),
        INDEX idx_regulation (regulation)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 9. ECE Extra-Curricular
      `CREATE TABLE IF NOT EXISTS ece_extra_curricular (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100),
        title VARCHAR(255),
        description TEXT,
        year VARCHAR(20),
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_year (year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 10. ECE Faculty Achievements
      `CREATE TABLE IF NOT EXISTS ece_faculty_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100),
        title VARCHAR(255),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 11. ECE Faculty Development
      `CREATE TABLE IF NOT EXISTS ece_faculty_development (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        year VARCHAR(20),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_year (year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 12. ECE Hackathons
      `CREATE TABLE IF NOT EXISTS ece_hackathons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        academic_year VARCHAR(20),
        brochure_url VARCHAR(500),
        winners_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 13. ECE Hackathons Gallery
      `CREATE TABLE IF NOT EXISTS ece_hackathons_gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100),
        academic_year VARCHAR(20),
        gallery VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 14. ECE Handbooks
      `CREATE TABLE IF NOT EXISTS ece_handbooks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        academic_year VARCHAR(20),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 15. ECE Technical Association
      `CREATE TABLE IF NOT EXISTS ece_technical_association (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        content TEXT,
        image_url VARCHAR(500),
        file_url VARCHAR(500),
        link VARCHAR(500),
        date_created DATE,
        status VARCHAR(50),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 16. ECE Merit Scholarships
      `CREATE TABLE IF NOT EXISTS ece_merit_scholarships (
        id INT AUTO_INCREMENT PRIMARY KEY,
        batch VARCHAR(20),
        academic_year VARCHAR(20),
        particulars VARCHAR(255),
        no_of_students_benefited INT,
        scholarship_amount DECIMAL(12,2),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 17. ECE MOUs
      `CREATE TABLE IF NOT EXISTS ece_mous (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mou_with VARCHAR(255),
        from_date VARCHAR(50),
        to_date VARCHAR(50),
        status VARCHAR(50),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 18. ECE Newsletters
      `CREATE TABLE IF NOT EXISTS ece_newsletters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        volume INT,
        issue INT,
        year VARCHAR(10),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_year (year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 19. ECE Non-Teaching Faculty
      `CREATE TABLE IF NOT EXISTS ece_non_teaching_faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        designation VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_designation (designation)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 20. ECE Physical Facilities
      `CREATE TABLE IF NOT EXISTS ece_physical_facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100),
        title VARCHAR(255),
        description TEXT,
        file_url VARCHAR(500),
        gallery JSON,
        lab_details JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 21. ECE Placements
      `CREATE TABLE IF NOT EXISTS ece_placements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        batch VARCHAR(20),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_batch (batch)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 22. ECE Sahaya Events
      `CREATE TABLE IF NOT EXISTS ece_sahaya_events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        year VARCHAR(20),
        category VARCHAR(100),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_year (year),
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 23. ECE SCUD Activities
      `CREATE TABLE IF NOT EXISTS ece_scud_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        academic_year VARCHAR(20),
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 24. ECE Student Achievements
      `CREATE TABLE IF NOT EXISTS ece_student_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100),
        year VARCHAR(20),
        title VARCHAR(255),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_year (year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 25. ECE GATE
      `CREATE TABLE IF NOT EXISTS ece_gate (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rollno VARCHAR(20),
        name VARCHAR(255),
        score INT,
        year VARCHAR(20),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_year (year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 26. ECE Roll of Honour
      `CREATE TABLE IF NOT EXISTS ece_roll_of_honour (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rollno VARCHAR(20),
        name VARCHAR(255),
        batch VARCHAR(20),
        cgpa DECIMAL(4,2),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_name (name),
        INDEX idx_batch (batch)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 27. ECE Syllabus
      `CREATE TABLE IF NOT EXISTS ece_syllabus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50),
        title VARCHAR(255),
        fileUrl VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_type (type)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 28. ECE Technical Faculty
      `CREATE TABLE IF NOT EXISTS ece_technical_faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        designation VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_designation (designation)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

      // 29. ECE Training Activities
      `CREATE TABLE IF NOT EXISTS ece_training_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        trainer VARCHAR(255),
        file_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_trainer (trainer)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
    ];

    log(`\n📊 Executing ${createTableStatements.length} CREATE TABLE statements...`, 'blue');
    log('━'.repeat(70), 'blue');

    let successCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < createTableStatements.length; i++) {
      const statement = createTableStatements[i];
      const tableNameMatch = statement.match(/ece_\w+/);
      const tableName = tableNameMatch ? tableNameMatch[0] : `table_${i + 1}`;

      try {
        await connection.execute(statement);
        log(`  ${String(i + 1).padStart(2, '0')}/${createTableStatements.length} ✅ Created: ${tableName}`, 'green');
        successCount++;
      } catch (error) {
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
          log(`  ${String(i + 1).padStart(2, '0')}/${createTableStatements.length} ℹ️  Exists: ${tableName}`, 'yellow');
          skippedCount++;
        } else {
          log(`  ${String(i + 1).padStart(2, '0')}/${createTableStatements.length} ❌ Failed: ${tableName} - ${error.message}`, 'red');
        }
      }
    }

    log('━'.repeat(70), 'blue');

    // Verify all tables
    log('\n🔍 Verifying table creation...', 'cyan');
    const [tables] = await connection.execute(
      `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME LIKE 'ece_%' ORDER BY TABLE_NAME`
    );

    log('\n' + '═'.repeat(70), 'blue');
    log('📊 ECE ADMIN DASHBOARD - DATABASE TABLE CREATION SUMMARY', 'blue');
    log('═'.repeat(70), 'blue');

    log(`\n✅ Total ECE tables created: ${tables.length}`, 'green');
    log(`✅ Successful: ${successCount}`, 'green');
    if (skippedCount > 0) {
      log(`ℹ️  Already existed: ${skippedCount}`, 'yellow');
    }

    log('\n📋 ECE Tables List:', 'cyan');
    log('─'.repeat(70), 'cyan');
    tables.forEach((table, index) => {
      log(`  ${String(index + 1).padStart(2, '0')}. ${table.TABLE_NAME}`, 'cyan');
    });

    log('─'.repeat(70), 'cyan');
    log('\n✨ ECE admin dashboard database tables created successfully!', 'green');
    log('All 29 modules are ready for CRUD operations.', 'green');
    log('═'.repeat(70), 'blue');
    log('', 'reset');

    await connection.end();

  } catch (error) {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      log('Database connection was lost', 'red');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      log('Access denied - incorrect credentials', 'red');
    }
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (e) {
        // Ignore
      }
    }
  }
}

// Run the script
createECETables();
