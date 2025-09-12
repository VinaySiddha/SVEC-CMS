const mysql = require('mysql2/promise');
require('dotenv').config();

async function createStaffTables() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  });

  try {
    console.log('Creating technical_staff table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS technical_staff (
        id INT PRIMARY KEY AUTO_INCREMENT,
        dept VARCHAR(10) NOT NULL,
        name VARCHAR(100) NOT NULL,
        designation VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        employee_id VARCHAR(50),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        INDEX idx_dept (dept),
        INDEX idx_status (status)
      )
    `);

    console.log('Creating non_teaching_staff table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS non_teaching_staff (
        id INT PRIMARY KEY AUTO_INCREMENT,
        dept VARCHAR(10) NOT NULL,
        name VARCHAR(100) NOT NULL,
        designation VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        employee_id VARCHAR(50),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        INDEX idx_dept (dept),
        INDEX idx_status (status)
      )
    `);

    console.log('Tables created successfully!');

  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await connection.end();
  }
}

createStaffTables();
