const mysql = require('mysql2/promise');
require('dotenv').config();

// Civil Technical Staff Data
const technicalStaff = [
  
];

// Civil Non-Teaching Staff Data
const nonTeachingStaff = [
  { name: "Mr. A.N.V.Ravi Kumar", designation: "Lab Technician" },
  { name: "Mr. P.V.S.Krishna Prasad", designation: "Lab Technician" },
  { name: "Mr. M.Abraham Lincoln", designation: "Lab Technician" },
  { name: "Mr. M.Sasi Kumar", designation: "Lab Technician" },
  { name: "Mr. T.V.V.Satyanarayana", designation: "DEO" },
  { name: "Ms. B.M.G.A.Bhargav", designation: "Attender" }
  // Add more Civil non-teaching staff here if needed
];

async function migrateCivilStaff() {
  let connection;
  try {
    // Connect to database
   
    connection = await mysql.createConnection({
                  host: '62.72.31.209',
                  user: 'cmsuser',
                  password: 'V@savi@2001',
                  database: 'svec_cms'
    });
    console.log('Connected to MySQL database');

  // Clear existing staff data for Civil department
  await connection.execute('DELETE FROM technical_staff WHERE dept = ?', ['civil']);
  await connection.execute('DELETE FROM non_teaching_staff WHERE dept = ?', ['civil']);
  console.log('Cleared existing staff data for Civil department');

    // Insert Technical Staff
    console.log('Inserting technical staff...');
    for (const staff of technicalStaff) {
      await connection.execute(
        'INSERT INTO technical_staff_civil (dept, name, designation, status) VALUES (?, ?, ?, ?)',
        ['civil', staff.name, staff.designation, 'active']
      );
      console.log(`Inserted technical staff: ${staff.name}`);
    }

    // Insert Non-Teaching Staff
    console.log('Inserting non-teaching staff...');
    for (const staff of nonTeachingStaff) {
      await connection.execute(
        'INSERT INTO non_teaching_civil_staff (dept, name, designation, status) VALUES (?, ?, ?, ?)',
        ['civil', staff.name, staff.designation, 'active']
      );
      console.log(`Inserted non-teaching staff: ${staff.name}`);
    }

    console.log('\\n=== Migration Summary ===');
    
  // Get counts
  const [techCount] = await connection.execute('SELECT COUNT(*) as count FROM technical_staff WHERE dept = ?', ['civil']);
  const [nonTeachCount] = await connection.execute('SELECT COUNT(*) as count FROM non_teaching_staff WHERE dept = ?', ['civil']);
    
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
migrateCivilStaff();
