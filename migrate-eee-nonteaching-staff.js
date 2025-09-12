const mysql = require('mysql2/promise');

// EEE Non-Teaching Staff data to migrate
const eeeNonTeachingStaff = [
  { name: "Mr. K. Venkata Rao", designation: "Lab Technician" },
  { name: "Mrs. P. Lakshmi", designation: "Lab Assistant" },
  { name: "Mr. S. Ravi Kumar", designation: "Technical Assistant" },
  { name: "Mrs. B. Padmavathi", designation: "Office Assistant" },
  { name: "Mr. M. Srinivas", designation: "Lab Attender" }
];

async function migrateEEENonTeachingStaff() {
  // Database connection configuration
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔌 Connected to database');
    console.log('🏗️  Starting EEE Non-Teaching Staff Migration...');

    // Clear existing EEE non-teaching staff data (optional)
    const deleteResult = await connection.execute('DELETE FROM non_teaching_staff WHERE dept = ?', ['eee']);
    console.log(`🗑️  Cleared ${deleteResult[0].affectedRows} existing EEE non-teaching staff records`);

    // Insert EEE non-teaching staff data
    let successCount = 0;
    let errorCount = 0;

    for (const staff of eeeNonTeachingStaff) {
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
          'eee',  // Department code
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
    console.log(`📝 Total processed: ${eeeNonTeachingStaff.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM non_teaching_staff WHERE dept = ?', ['eee']);
    console.log(`📋 Total EEE non-teaching staff in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateEEENonTeachingStaff()
    .then(() => {
      console.log('🎉 EEE Non-Teaching Staff migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateEEENonTeachingStaff, eeeNonTeachingStaff };