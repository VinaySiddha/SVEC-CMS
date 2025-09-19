const mysql = require('mysql2/promise');

const placementsData = [
  { batch: '2019-23', url: 'https://srivasaviengg.ac.in/uploads/mech/Placements-2019-23-Batch.pdf' },
  { batch: '2018-22', url: 'https://srivasaviengg.ac.in/uploads/mech/Placements-2018-22-Batch.pdf' },
  { batch: '2017-21', url: 'https://srivasaviengg.ac.in/uploads/mech/Placements-2017-21-Batch.pdf' },
  { batch: '2016-20', url: 'https://srivasaviengg.ac.in/uploads/mech/Placements-2016-20-Batch.pdf' },
  { batch: '2015-19', url: 'https://srivasaviengg.ac.in/uploads/mech/Placements-2015-19-Batch.pdf' }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechPlacements() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_placements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        batch VARCHAR(16) NOT NULL,
        url VARCHAR(512) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_placements table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_placements');
    console.log('🗑️ Cleared existing mech placements records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of placementsData) {
      try {
        await connection.execute(
          `INSERT INTO mech_placements (batch, url, created_at) VALUES (?, ?, NOW())`,
          [item.batch, item.url]
        );
        console.log(`✅ Inserted: ${item.batch}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.batch}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${placementsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_placements');
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
  migrateMechPlacements()
    .then(() => {
      console.log('🎉 Mech Placements migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechPlacements, placementsData };
