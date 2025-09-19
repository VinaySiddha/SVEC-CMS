const mysql = require('mysql2/promise');

// MBA Non-Teaching Staff data to migrate
const MBANonTeachingStaff = [
    { name: "Mr. K. Venkata Rao", designation: "Lab Technician" },
    { name: "Mrs. P. Lakshmi", designation: "Lab Assistant" },
    { name: "Mr. S. Ravi Kumar", designation: "Technical Assistant" },
    { name: "Mrs. B. Padmavathi", designation: "Office Assistant" },
    { name: "Mr. M. Srinivas", designation: "Lab Attender" }
];

async function migratMBAENonTeachingStaff() {
    // Database connection configuration
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('🔌 Connected to database');
        console.log('🏗️  Starting MBA Non-Teaching Staff Migration...');

        // Clear existing MBA non-teaching staff data (optional)
        const deleteResult = await connection.execute('DELETE FROM non_teaching_staff WHERE dept = ?', ['MBA']);
        console.log(`🗑️  Cleared ${deleteResult[0].affectedRows} existing MBA non-teaching staff records`);

        // Insert MBA non-teaching staff data
        let successCount = 0;
        let errorCount = 0;

        for (const staff of MBANonTeachingStaff) {
            try {
                await connection.execute(`
          INSERT INTO non_teaching_staff (
            name, 
            designation, 
            dept, 
            email,
            status, 
            created_at
          ) VALUES (?, ?, ?, ?, ?, NOW())
        `, [
                    staff.name,
                    staff.designation,
                    'MBA',  // Department code
                    `${staff.name.toLowerCase().replace(/[^a-z]/g, '')}@svec.edu.in`,  // Auto-generate email
                    'active'  // Status
                ]);

                console.log(`✅ Inserted: ${staff.name} - ${staff.designation}`);
                successCount++;

            } catch (error) {
                console.log(`❌ Error inserting ${staff.name}: ${error.message}`);
                errorCount++;
            }
        }

        console.log('\n📊 Migration Summary:');
        console.log(`✅ Successfully inserted: ${successCount} non-teaching staff members`);
        console.log(`❌ Errors: ${errorCount}`);
        console.log(`📝 Total processed: ${MBANonTeachingStaff.length}`);

        // Verify the data
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM non_teaching_staff WHERE dept = ?', ['MBA']);
        console.log(`📋 Total MBA non-teaching staff in database: ${rows[0].count}`);

    } catch (error) {
        console.error('💥 Migration failed:', error.message);
    } finally {
        await connection.end();
        console.log('🔐 Database connection closed');
    }
}

// Run the migration
if (require.main === module) {
    migratMBAENonTeachingStaff()
        .then(() => {
            console.log('🎉 MBA Non-Teaching Staff migration completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Migration script failed:', error);
            process.exit(1);
        });
}

module.exports = { migratMBAENonTeachingStaff, MBANonTeachingStaff };