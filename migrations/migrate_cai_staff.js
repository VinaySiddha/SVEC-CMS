const mysql = require('mysql2/promise');
require('dotenv').config();

// CAI Technical Staff Data
const technicalStaff = [
    { name: "Mr. K. N. Suresh", designation: "System Admin" },
    { name: "Mr. Md. Arriff", designation: "Lab Assistant" },
    { name: "Mrs. D. Bhagya Lakshmi", designation: "Lab Technician" },
    { name: "Mrs. B. Yamini", designation: "Lab Technician" },
    { name: "Mr. K. V Srinivasa Rao", designation: "Hardware Technician" },
    { name: "Mr. G. Bhanu Prakash", designation: "Hardware Technician" }
];
// CAI Non-Teaching Staff Data
const nonTeachingStaff = [
    { name: "Mr. N. RajaseKhar", designation: "Junior Assistant" },
    { name: "Mr. Prasad", designation: "Attender" }
];

async function migrateStaff() {
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

        // Clear existing staff data for CSE department
       /* await connection.execute('DELETE FROM technical_staff WHERE dept = ?', ['cse']);
        await connection.execute('DELETE FROM non_teaching_staff WHERE dept = ?', ['cse']);
        console.log('Cleared existing staff data for CSE department');*/

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
                'INSERT INTO non_teaching_staff (name, designation) VALUES (?, ?, ?, ?)',
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
