const mysql = require('mysql2/promise');

const placementsData = [
  {
    year: '2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECT_Placements_2022-23.pdf'
  },
  {
    year: '2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2021-22.pdf'
  },
  {
    year: '2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2020-21.pdf'
  },
  {
    year: '2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2019-20.pdf'
  },
  {
    year: '2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2018-19.pdf'
  },
  {
    year: '2017-18',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2017-18.pdf'
  },
  {
    year: '2016-17',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2016-17.pdf'
  },
  {
    year: '2015-16',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2015-16.pdf'
  },
  {
    year: '2014-15',
    url: 'https://srivasaviengg.ac.in/uploads/ece/ECE_Placements_2014-15.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTPlacements() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_placements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year VARCHAR(20) NOT NULL,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_placements table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_placements');
    console.log('🗑️ Cleared existing ECT placements records');

    // Insert placements data
    let successCount = 0;
    let errorCount = 0;

    for (const item of placementsData) {
      try {
        await connection.execute(
          `INSERT INTO ect_placements (year, url, created_at) VALUES (?, ?, NOW())`,
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
    console.log(`✅ Successfully inserted: ${successCount} placement records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${placementsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_placements');
    console.log(`📋 Total placement records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTPlacements()
    .then(() => {
      console.log('🎉 ECT Placements migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTPlacements, placementsData };
