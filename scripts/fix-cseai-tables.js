const mysql = require('mysql2/promise');

async function fixCSEAIDatabaseTables() {
  console.log('🔧 Fixing CSE-AI Database Tables');
  console.log('=================================\n');

  const dbConfig = {
    host: '62.72.31.209',
    port: 3306,
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'cmsuser'
  };

  let connection;

  try {
    console.log('🔍 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection successful!\n');

    // Helper function to check if column exists
    async function columnExists(tableName, columnName) {
      try {
        const [rows] = await connection.execute(
          `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
          [dbConfig.database, tableName, columnName]
        );
        return rows.length > 0;
      } catch (error) {
        return false;
      }
    }

    // SQL commands to fix each table issue
    const fixes = [
      {
        name: 'placement_gallery table - add batch_name column',
        table: 'placement_gallery',
        column: 'batch_name',
        sql: `ALTER TABLE placement_gallery ADD COLUMN batch_name VARCHAR(100) DEFAULT NULL`
      },
      {
        name: 'faculty_development_programs table - add program_title column', 
        table: 'faculty_development_programs',
        column: 'program_title',
        sql: `ALTER TABLE faculty_development_programs ADD COLUMN program_title VARCHAR(255) NOT NULL DEFAULT ''`
      },
      {
        name: 'student_achievements table - add student_roll_no column',
        table: 'student_achievements',
        column: 'student_roll_no',
        sql: `ALTER TABLE student_achievements ADD COLUMN student_roll_no VARCHAR(50) DEFAULT NULL`
      },
      {
        name: 'faculty_achievements table - add faculty_name column',
        table: 'faculty_achievements',
        column: 'faculty_name',
        sql: `ALTER TABLE faculty_achievements ADD COLUMN faculty_name VARCHAR(255) NOT NULL DEFAULT ''`
      },
      {
        name: 'workshops table - add workshop_title column',
        table: 'workshops',
        column: 'workshop_title',
        sql: `ALTER TABLE workshops ADD COLUMN workshop_title VARCHAR(255) NOT NULL DEFAULT ''`
      },
      {
        name: 'newsletters table - add newsletter_title column',
        table: 'newsletters',
        column: 'newsletter_title',
        sql: `ALTER TABLE newsletters ADD COLUMN newsletter_title VARCHAR(255) NOT NULL DEFAULT ''`
      },
      {
        name: 'hackathons table - add hackathon_name column',
        table: 'hackathons',
        column: 'hackathon_name',
        sql: `ALTER TABLE hackathons ADD COLUMN hackathon_name VARCHAR(255) NOT NULL DEFAULT ''`
      },
      {
        name: 'board_of_studies table - add meeting_title column',
        table: 'board_of_studies',
        column: 'meeting_title',
        sql: `ALTER TABLE board_of_studies ADD COLUMN meeting_title VARCHAR(255) NOT NULL DEFAULT ''`
      },
      {
        name: 'department_library table - add library_name column',
        table: 'department_library',
        column: 'library_name',
        sql: `ALTER TABLE department_library ADD COLUMN library_name VARCHAR(255) NOT NULL DEFAULT ''`
      }
    ];

    // Create training_activities table if it doesn't exist
    const createTrainingActivitiesTable = {
      name: 'training_activities table - create if not exists',
      sql: `CREATE TABLE IF NOT EXISTS training_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        department VARCHAR(50) NOT NULL,
        activity_title VARCHAR(255) NOT NULL,
        activity_description TEXT,
        activity_date DATE,
        organizer VARCHAR(255),
        participants_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    };

    // Execute all fixes
    for (const fix of fixes) {
      try {
        console.log(`🔧 ${fix.name}...`);
        
        const exists = await columnExists(fix.table, fix.column);
        if (exists) {
          console.log(`✅ Column ${fix.column} already exists in ${fix.table} table\n`);
          continue;
        }
        
        await connection.execute(fix.sql);
        console.log(`✅ Success: ${fix.name}\n`);
      } catch (error) {
        console.log(`⚠️  Warning for ${fix.name}: ${error.message}\n`);
        // Continue with other fixes even if one fails
      }
    }

    // Create training_activities table if it doesn't exist
    try {
      console.log(`🔧 training_activities table - create if not exists...`);
      await connection.execute(createTrainingActivitiesTable.sql);
      console.log(`✅ Success: training_activities table created\n`);
    } catch (error) {
      console.log(`⚠️  Warning for training_activities table: ${error.message}\n`);
    }

    console.log('🎉 All database fixes completed!');
    console.log('📍 You can now test the CSE-AI department functionality.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Make sure the database is accessible and credentials are correct.');
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed.');
    }
  }
}

// Run the fixes
fixCSEAIDatabaseTables();