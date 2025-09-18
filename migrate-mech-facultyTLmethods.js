const mysql = require('mysql2/promise');

const facultyTLData = [
  {
    method: 'Presentations using PPT, wherever necessary',
    url: 'https://srivasaviengg.ac.in/uploads/mech/student_participations.pdf'
  },
  {
    method: 'Technical videos for Demonstration',
    url: 'https://srivasaviengg.ac.in/uploads/mech/mech_t&l/technical%20videos.pdf'
  },
  {
    method: 'Power point Presentations for various subjects',
    url: 'https://srivasaviengg.ac.in/uploads/mech/mech_t&l/ppts.pdf'
  },
  {
    method: 'Usage of Tools like AUTOCAD, SOLIDWORKS, FEMAP',
    url: 'https://srivasaviengg.ac.in/uploads/mech/mech_t&l/tools.pdf'
  },
  {
    method: 'Use of e-learning resources like NPTEL lectures, QEEE, & MOOCS',
    url: 'https://srivasaviengg.ac.in/uploads/mech/mech_t&l/e-learning_resources.pdf'
  },
  {
    method: 'Student Seminars',
    url: 'https://srivasaviengg.ac.in/uploads/ME_Minutes%20of%20First%20BOS%20Meeting.pdf'
  },
  {
    method: 'Providing Question bank with short answer questions and quiz questions',
    url: null
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechFacultyTL() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_facultyTLmethods (
        id INT AUTO_INCREMENT PRIMARY KEY,
        method VARCHAR(500) NOT NULL,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_facultyTLmethods table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_facultyTLmethods');
    console.log('🗑️ Cleared existing mech faculty TL methods records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of facultyTLData) {
      try {
        await connection.execute(
          `INSERT INTO mech_facultyTLmethods (method, url, created_at) VALUES (?, ?, NOW())`,
          [item.method, item.url]
        );
        console.log(`✅ Inserted: ${item.method}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.method}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${facultyTLData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_facultyTLmethods');
    console.log(`📋 Total records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechFacultyTL()
    .then(() => {
      console.log('🎉 Mech Faculty TL Methods migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechFacultyTL, facultyTLData };
