const mysql = require('mysql2/promise');
require('dotenv').config();

// CSE Technical Staff Data
const technicalStaff = [
  { name: "Mr. K.N. Suresh", designation: "System Admin" },
  { name: "Ms. BNG Lakshmi Durga", designation: "Programmer" },
  { name: "Mr. S. Nagaraju", designation: "Programmer" },
  { name: "Mrs. G. Uma Parvathi", designation: "Programmer" },
  { name: "Mr. P.Lokesh Reddy", designation: "Lab Technician" },
  { name: "Ms. M. Naga Harika", designation: "Lab Technician" },
  { name: "Mr. B. Abaddalu", designation: "Lab Technician" },
  { name: "Mr. Md.Arriff", designation: "Computer Lab Assistant" },
  { name: "Mr. P.Manikanta Gupta", designation: "Lab Assistant" },
  { name: "Mr. N Lokesh Babu", designation: "Lab Assistant" },
  { name: "Mr. K.V Srinivasa Rao", designation: "Hardware Technician" },
  { name: "Mr. G.Bhanu Prakash", designation: "Hardware Technician" }
];

// CSE Non-Teaching Staff Data
const nonTeachingStaff = [
  { name: "Ms. U.Devi Lakshmi", designation: "DEO" },
  { name: "Mrs. K. Bhagya Sri", designation: "DEO" },
  { name: "Mr. D.Srinivasa Rao", designation: "Attender" },
  { name: "Mr. M.Siva Krishna", designation: "Attender" },
  { name: "Mrs. A.Sri Karuna Kumari", designation: "Attender" },
  { name: "Mr. V. Venkateswara Rao", designation: "Attender" }
];

async function migrateStaff() {
  let connection;
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    });
    console.log('Connected to MySQL database');

    // Clear existing staff data for CSE department
    await connection.execute('DELETE FROM technical_staff WHERE dept = ?', ['cse']);
    await connection.execute('DELETE FROM non_teaching_staff WHERE dept = ?', ['cse']);
    console.log('Cleared existing staff data for CSE department');

    // Insert Technical Staff
    console.log('Inserting technical staff...');
    for (const staff of technicalStaff) {
      await connection.execute(
        'INSERT INTO technical_staff (dept, name, designation, status) VALUES (?, ?, ?, ?)',
        ['cse', staff.name, staff.designation, 'active']
      );
      console.log(`Inserted technical staff: ${staff.name}`);
    }

    // Insert Non-Teaching Staff
    console.log('Inserting non-teaching staff...');
    for (const staff of nonTeachingStaff) {
      await connection.execute(
        'INSERT INTO non_teaching_staff (dept, name, designation, status) VALUES (?, ?, ?, ?)',
        ['cse', staff.name, staff.designation, 'active']
      );
      console.log(`Inserted non-teaching staff: ${staff.name}`);
    }

    console.log('\\n=== Migration Summary ===');
    
    // Get counts
    const [techCount] = await connection.execute('SELECT COUNT(*) as count FROM technical_staff WHERE dept = ?', ['cse']);
    const [nonTeachCount] = await connection.execute('SELECT COUNT(*) as count FROM non_teaching_staff WHERE dept = ?', ['cse']);
    
    console.log(`Technical Staff migrated: ${techCount[0].count}`);
    console.log(`Non-Teaching Staff migrated: ${nonTeachCount[0].count}`);
    console.log('Staff migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run migration
migrateStaff();
