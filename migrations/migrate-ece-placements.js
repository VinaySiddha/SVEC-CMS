const mysql = require('mysql2/promise');

const placementsData = [
  { year: '2022-23', url: 'https://srivasaviengg.ac.in/uploads/ece/ECT_Placements_2022-23.pdf' },
  { year: '2021-22', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2021-22.pdf' },
  { year: '2020-21', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2020-21.pdf' },
  { year: '2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2019-20.pdf' },
  { year: '2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2018-19.pdf' },
  { year: '2017-18', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2017-18.pdf' },
  { year: '2016-17', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2016-17.pdf' },
  { year: '2015-16', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2015-16.pdf' },
  { year: '2014-15', url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2014-15.pdf' },
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEPlacements() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_placements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year VARCHAR(16) NOT NULL,
        url VARCHAR(512) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_placements table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_placements');
    console.log('🗑️ Cleared existing placements records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of placementsData) {
      try {
        await connection.execute(
          `INSERT INTO ece_placements (year, url, created_at) VALUES (?, ?, NOW())`,
          [item.year, item.url]
        );
        console.log(`✅ Inserted: ${item.year}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.year}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${placementsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_placements');
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
  migrateECEPlacements()
    .then(() => {
      console.log('🎉 ECE Placements migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEPlacements, placementsData };