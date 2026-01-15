#!/usr/bin/env node

/**
 * Setup script for academic calendars tables
 * Run with: node setup-academic-calendars-table.js
 */

const mysql = require('mysql2/promise');

async function setupAcademicCalendars() {
  const dbConfig = {
    host: process.env.MYSQL_HOST || '62.72.31.209',
    user: process.env.MYSQL_USER || 'cmsuser',
    password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
    database: 'svec_cms',
    port: Number(process.env.MYSQL_PORT) || 3306,
  };

  console.log('📋 SVEC-CMS Academic Calendars Table Setup');
  console.log('==========================================\n');

  try {
    console.log('🔗 Connecting to database...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected!\n');

    // SQL statements to create the tables
    const statements = [
      `CREATE TABLE IF NOT EXISTS academic_calendars (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        academic_year VARCHAR(9) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        department VARCHAR(100),
        program_type ENUM('B.Tech', 'M.Tech', 'M.B.A', 'M.C.A', 'Diploma') NOT NULL,
        document_url VARCHAR(512),
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        remarks TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )`,
      `CREATE TABLE IF NOT EXISTS academic_calendar_events (
        id INT PRIMARY KEY AUTO_INCREMENT,
        calendar_id INT NOT NULL,
        event_name VARCHAR(255) NOT NULL,
        event_description TEXT,
        event_date DATE NOT NULL,
        event_type ENUM('holiday', 'exam', 'semester', 'registration', 'orientation', 'other') DEFAULT 'other',
        is_important BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )`,
      `CREATE INDEX idx_academic_year ON academic_calendars(academic_year)`,
      `CREATE INDEX idx_program_type ON academic_calendars(program_type)`,
      `CREATE INDEX idx_status ON academic_calendars(status)`,
      `CREATE INDEX idx_department ON academic_calendars(department)`,
      `CREATE INDEX idx_start_date ON academic_calendars(start_date)`,
      `CREATE INDEX idx_calendar_id ON academic_calendar_events(calendar_id)`,
      `CREATE INDEX idx_event_date ON academic_calendar_events(event_date)`,
      `CREATE INDEX idx_event_type ON academic_calendar_events(event_type)`,
    ];

    console.log('📊 Creating academic calendars tables...');
    for (const statement of statements) {
      try {
        await connection.execute(statement);
        console.log('  ✅', statement.substring(0, 50) + '...');
      } catch (err) {
        if (err.message.includes('already exists') || err.message.includes('Duplicate key name')) {
          console.log('  ℹ️  Already exists:', statement.substring(0, 50) + '...');
        } else {
          throw err;
        }
      }
    }

    console.log('\n✅ Academic calendars tables setup completed successfully!');

    // Verify the tables
    const [tables1] = await connection.execute('DESCRIBE academic_calendars');
    console.log('\n📋 Academic Calendars Table Structure:');
    console.table(tables1);

    const [tables2] = await connection.execute('DESCRIBE academic_calendar_events');
    console.log('\n📋 Academic Calendar Events Table Structure:');
    console.table(tables2);

    await connection.end();
    console.log('\n🎉 Setup complete! You can now use the academic calendars module.');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupAcademicCalendars();
