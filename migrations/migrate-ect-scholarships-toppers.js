const mysql = require('mysql2/promise');

const scholarshipsData = [
  // Merit Scholarships Year Wise (type: 'merit_scholarship')
  { type: 'merit_scholarship', year: '2019', title: 'Merit Scholarships-2019', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2019.pdf' },
  { type: 'merit_scholarship', year: '2018', title: 'Merit Scholarships-2018', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20181.pdf' },
  { type: 'merit_scholarship', year: '2017', title: 'M.Tech Merit Scholarships-2017', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/M.Tech%20Merit%20Scholarships-20171.pdf' },
  { type: 'merit_scholarship', year: '2017', title: 'Merit Scholarships-2017', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20171.pdf' },
  { type: 'merit_scholarship', year: '2016', title: 'Merit Scholarships-2016', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20161.pdf' },
  { type: 'merit_scholarship', year: '2015', title: 'Merit Scholarships-2015', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-20151.pdf' },
  { type: 'merit_scholarship', year: '2014', title: 'Merit Scholarships-2014', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2014.pdf' },
  { type: 'merit_scholarship', year: '2013', title: 'Merit Scholarships-2013', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Merit%20Scholarships-2013.pdf' },

  // Cash Awards and Scholarships by College Management (type: 'cash_award')
  { type: 'cash_award', year: '2022-23', based_on: 'Academic Toppers', students: 121, amount: '1,32,000' },
  { type: 'cash_award', year: '2021-22', based_on: 'Academic Toppers', students: 18, amount: '13,000' },
  { type: 'cash_award', year: '2020-21', based_on: 'Academic Toppers', students: 36, amount: '32,500' },
  { type: 'cash_award', year: '2019-20', based_on: 'Academic Toppers', students: 52, amount: '48,500' },
  { type: 'cash_award', year: '2019-20', based_on: 'EAMCET Rank', students: 49, amount: '7,95,000' },
  { type: 'cash_award', year: '2018-19', based_on: 'Academic Toppers', students: 34, amount: '68,000' },
  { type: 'cash_award', year: '2018-19', based_on: 'EAMCET Rank', students: 63, amount: '7,15,000' },
  { type: 'cash_award', year: '2017-18', based_on: 'Academic Toppers', students: 50, amount: '36,500' },
  { type: 'cash_award', year: '2017-18', based_on: 'EAMCET Rank', students: 63, amount: '9,25,000' },
  { type: 'cash_award', year: '2016-17', based_on: 'Academic Toppers', students: 65, amount: '48,750' },
  { type: 'cash_award', year: '2016-17', based_on: 'EAMCET Rank', students: 8, amount: '1,45,000' },
  { type: 'cash_award', year: '2015-16', based_on: 'Academic Toppers', students: 62, amount: '46,000' },
  { type: 'cash_award', year: '2015-16', based_on: 'EAMCET Rank', students: 36, amount: '5,30,000' },
  { type: 'cash_award', year: '2014-15', based_on: 'Academic Toppers', students: 37, amount: '27,500' },
  { type: 'cash_award', year: '2014-15', based_on: 'EAMCET Rank', students: 8, amount: '1,40,000' },

  // Gallery (type: 'gallery')
  ...[1, 2, 3, 6, 5, 7, 8, 9, 9, 10, 11, 12, 13, 14].map(num => ({
    type: 'gallery',
    year: null,
    title: `Merit Scholar Image ${num}`,
    url: `https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Merit_Scholars${num}.jpg`
  })),
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTScholarshipsToppers() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_scholarships_toppers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(32) NOT NULL,
        year VARCHAR(16),
        title VARCHAR(256),
        url VARCHAR(512),
        based_on VARCHAR(64),
        students INT,
        amount VARCHAR(32),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_scholarships_toppers table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_scholarships_toppers');
    console.log('🗑️ Cleared existing ECT scholarships/toppers records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of scholarshipsData) {
      try {
        await connection.execute(
          `INSERT INTO ect_scholarships_toppers (type, year, title, url, based_on, students, amount, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            item.type,
            item.year || null,
            item.title || null,
            item.url || null,
            item.based_on || null,
            item.students || null,
            item.amount || null
          ]
        );
        console.log(`✅ Inserted: [${item.type}] ${item.title || item.based_on || ''}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting [${item.type}] ${item.title || item.based_on || ''}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${scholarshipsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_scholarships_toppers');
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
  migrateECTScholarshipsToppers()
    .then(() => {
      console.log('🎉 ECT Scholarships/Toppers migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTScholarshipsToppers, scholarshipsData };
