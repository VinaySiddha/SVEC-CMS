const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

async function createECEStudentAchievementsTables() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log('🔌 Connected to database');
    console.log('🏗️  Creating ECE Student Achievements Multi-Table Structure...\n');

    const tables = [
      {
        name: 'ece_roll_of_honour',
        sql: `CREATE TABLE IF NOT EXISTS ece_roll_of_honour (
          id INT AUTO_INCREMENT PRIMARY KEY,
          batch VARCHAR(20),
          regd_no VARCHAR(20),
          student_name VARCHAR(255),
          percentage DECIMAL(5,2),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_batch (batch),
          INDEX idx_regd_no (regd_no),
          INDEX idx_student_name (student_name),
          CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ) ENGINE=InnoDB;`
      },
      {
        name: 'ece_placements',
        sql: `CREATE TABLE IF NOT EXISTS ece_placements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          academic_year VARCHAR(20),
          total_final_year_students INT,
          students_placed INT,
          students_higher_studies INT,
          students_entrepreneur INT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_academic_year (academic_year),
          CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ) ENGINE=InnoDB;`
      },
      {
        name: 'ece_higher_studies',
        sql: `CREATE TABLE IF NOT EXISTS ece_higher_studies (
          id INT AUTO_INCREMENT PRIMARY KEY,
          academic_year VARCHAR(20),
          total_final_year_students INT,
          students_higher_studies INT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_academic_year (academic_year),
          CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ) ENGINE=InnoDB;`
      },
      {
        name: 'ece_competitive_examinations',
        sql: `CREATE TABLE IF NOT EXISTS ece_competitive_examinations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          year VARCHAR(20),
          net INT DEFAULT 0,
          slet INT DEFAULT 0,
          gmat INT DEFAULT 0,
          cat INT DEFAULT 0,
          gre INT DEFAULT 0,
          jam INT DEFAULT 0,
          ielts INT DEFAULT 0,
          toefl INT DEFAULT 0,
          civil_services INT DEFAULT 0,
          state_govt_exams INT DEFAULT 0,
          other_exams INT DEFAULT 0,
          total INT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_year (year),
          CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ) ENGINE=InnoDB;`
      },
      {
        name: 'ece_course_certifications',
        sql: `CREATE TABLE IF NOT EXISTS ece_course_certifications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          academic_year VARCHAR(20),
          nptel INT DEFAULT 0,
          coursera INT DEFAULT 0,
          udemy INT DEFAULT 0,
          edx INT DEFAULT 0,
          swayam INT DEFAULT 0,
          microsoft_certifications INT DEFAULT 0,
          aws_certifications INT DEFAULT 0,
          other_certifications INT DEFAULT 0,
          total INT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_academic_year (academic_year),
          CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ) ENGINE=InnoDB;`
      },
      {
        name: 'ece_internship',
        sql: `CREATE TABLE IF NOT EXISTS ece_internship (
          id INT AUTO_INCREMENT PRIMARY KEY,
          academic_year VARCHAR(20),
          name_of_the_company VARCHAR(255),
          no_of_students_completed_internship INT,
          duration VARCHAR(50),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          INDEX idx_academic_year (academic_year),
          INDEX idx_company (name_of_the_company),
          CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ) ENGINE=InnoDB;`
      }
    ];

    for (const table of tables) {
      try {
        await connection.execute(table.sql);
        console.log(`✅ ${table.name} - Created/Verified successfully`);
      } catch (error) {
        console.error(`❌ Error creating ${table.name}:`, error.message);
      }
    }

    console.log('\n✨ ECE Student Achievements Multi-Table Structure Creation Complete!');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    await connection.end();
  }
}

createECEStudentAchievementsTables();
