const mysql = require('mysql2/promise');

const newslettersData = [
  { title: 'News Letter Volume10 Issue1 2023-24', url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_Sep-Nov_2023.pdf' },
  { title: 'News Letter Volume10 Issue2 2023-24', url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_June-Aug_2023(original).pdf' },
  { title: 'News Letter Volume9 Issue2 2022-23', url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%209%20ISSUE2%20f.pdf' },
  { title: 'News Letter Volume9 Issue1 2022-23', url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20_June-Aug_2023(original).pdf' },
  { title: 'Newsletter Volume 8 Issue 2 2021-22', url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%208%20ISSUE2%20.pdf' },
  { title: 'Newsletter Volume 8 Issue 1 2021-22', url: 'https://srivasaviengg.ac.in/uploads/NEWS%20LETTER%20VOLLUME%208%20ISSUE%201.pdf' },
  { title: 'Newsletter Volume 7 Issue 2 2020-21', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%207%20Issue%202.pdf' },
  { title: 'Newsletter Volume 7 Issue 1 2020-21', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%207%20Issue%201.pdf' },
  { title: 'Newsletter Volume 6 Issue 3 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%203.pdf' },
  { title: 'Newsletter Volume 6 Issue 2 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%202.pdf' },
  { title: 'Newsletter Volume 6 Issue 1 2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%206%20Issue%201.pdf' },
  { title: 'Newsletter Volume 5 Issue 3 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%203.pdf' },
  { title: 'Newsletter Volume 5 Issue 2 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%202.pdf' },
  { title: 'Newsletter Volume 5 Issue 1 2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%205%20Issue%201.pdf' },
  { title: 'Newsletter Volume 4 Issue 4 2017-18', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%204.pdf' },
  { title: 'Newsletter Volume 4 Issue 3 2017-18', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%203.pdf' },
  { title: 'Newsletter Volume 4 Issue 2 2017-18', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%202.pdf' },
  { title: 'Newsletter Volume 4 Issue 1 2017-18', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%204%20Issue%201.pdf' },
  { title: 'Newsletter Volume 3 Issue 1 2016-17', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%201.pdf' },
  { title: 'Newsletter Volume 3 Issue 2 2016-17', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%202.pdf' },
  { title: 'Newsletter Volume 3 Issue 3 2016-17', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%203.pdf' },
  { title: 'Newsletter Volume 3 Issue 4 2016-17', url: 'https://srivasaviengg.ac.in/uploads/ece_Volume%203%20Issue%204.pdf' },
  { title: 'Newsletter Volume 2 Issue 1 2015-16', url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20Letter%202015-16%20Vol%202%20Issue%201.pdf' },
  { title: 'Newsletter Volume 2 Issue 2 2015-16', url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20letter%202015-16%20Vol%202%20Issue%202.pdf' },
  { title: 'Newsletter Volume 2 Issue 3 2015-16', url: 'https://srivasaviengg.ac.in/uploads/ece/ece_News%20letter%202015-16%20Vol%202%20Issue%203.pdf' },
  { title: 'Newsletter Volume 2 Issue 4 2015-16', url: 'https://srivasaviengg.ac.in/uploads/ece/ece_Newsletter%202015-16%20Vol%202%20Issue%204.pdf' },
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECENewsletters() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_newletters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(256) NOT NULL,
        url VARCHAR(512) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_newletters table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_newletters');
    console.log('🗑️ Cleared existing newsletters records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of newslettersData) {
      try {
        await connection.execute(
          `INSERT INTO ece_newletters (title, url, created_at) VALUES (?, ?, NOW())`,
          [item.title, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${newslettersData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_newletters');
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
  migrateECENewsletters()
    .then(() => {
      console.log('🎉 ECE Newsletters migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECENewsletters, newslettersData };