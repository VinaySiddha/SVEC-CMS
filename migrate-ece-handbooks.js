const mysql = require('mysql2/promise');

const handbooksData = [
  // 2020-21
  { year: '2020-21', title: 'III-Sem 2020-21', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20III%20Sem%202020-21.pdf' },
  { year: '2020-21', title: 'IV B.Tech I-sem 2020-21', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20IV%20B.Tech%20I%20Sem%202020-21.pdf' },

  // 2019-20
  { year: '2019-20', title: 'II-B.Tech II-Sem V18(Autonomous) 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%20(%20Autonomous)%20%20Hand%20book%202019-20.pdf' },
  { year: '2019-20', title: 'III-B.Tech II-Sem R16 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%20Hand%20book%202019-20.pdf' },
  { year: '2019-20', title: 'IV-B.Tech II-Sem R16 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%20Hand%20Book%20%202019-20.pdf' },
  { year: '2019-20', title: 'II-B.Tech I-Sem V18(Autonomous) 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20I%20Sem%202019-20.pdf' },
  { year: '2019-20', title: 'III-B.Tech I-Sem R16 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20I%20Sem%202019-20.pdf' },
  { year: '2019-20', title: 'IV-B.Tech I-Sem R16 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20I%20Sem%202019-20.pdf' },

  // 2018-19
  { year: '2018-19', title: 'II-B.Tech II-Sem 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%202018-19.pdf' },
  { year: '2018-19', title: 'III-B.Tech II-Sem 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%202018-19.pdf' },
  { year: '2018-19', title: 'IV-B.Tech II-Sem 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%202018-19.pdf' },
  { year: '2018-19', title: 'II-B.Tech I-Sem 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20Ist%20Sem%202018-19.pdf' },
  { year: '2018-19', title: 'III-B.Tech I-Sem 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20Ist%20Sem%202018-19.pdf' },
  { year: '2018-19', title: 'IV-B.Tech I-Sem 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20Ist%20Sem%202018-19.pdf' },
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEHandbooks() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_handbooks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year VARCHAR(16) NOT NULL,
        title VARCHAR(256) NOT NULL,
        url VARCHAR(512) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_handbooks table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_handbooks');
    console.log('🗑️ Cleared existing handbooks records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of handbooksData) {
      try {
        await connection.execute(
          `INSERT INTO ece_handbooks (year, title, url, created_at) VALUES (?, ?, ?, NOW())`,
          [item.year, item.title, item.url]
        );
        console.log(`✅ Inserted: [${item.year}] ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting [${item.year}] ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${handbooksData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_handbooks');
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
  migrateECEHandbooks()
    .then(() => {
      console.log('🎉 ECE Handbooks migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEHandbooks, handbooksData };