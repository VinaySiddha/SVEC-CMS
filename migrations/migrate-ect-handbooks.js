const mysql = require('mysql2/promise');

const handbooksData = [
  // Academic year 2020-21
  {
    academic_year: '2020-21',
    semester: 'III-Sem',
    regulation: null,
    title: 'III-Sem 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20III%20Sem%202020-21.pdf'
  },
  {
    academic_year: '2020-21',
    semester: 'IV B.Tech I-sem',
    regulation: null,
    title: 'IV B.Tech I-sem 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/ece_Academic%20Handbook%20IV%20B.Tech%20I%20Sem%202020-21.pdf'
  },

  // Academic year 2019-20
  {
    academic_year: '2019-20',
    semester: 'II-B.Tech II-Sem',
    regulation: 'V18(Autonomous)',
    title: 'II-B.Tech II-Sem V18(Autonomous) 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%20(%20Autonomous)%20%20Hand%20book%202019-20.pdf'
  },
  {
    academic_year: '2019-20',
    semester: 'III-B.Tech II-Sem',
    regulation: 'R16',
    title: 'III-B.Tech II-Sem R16 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%20Hand%20book%202019-20.pdf'
  },
  {
    academic_year: '2019-20',
    semester: 'IV-B.Tech II-Sem',
    regulation: 'R16',
    title: 'IV-B.Tech II-Sem R16 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%20Hand%20Book%20%202019-20.pdf'
  },
  {
    academic_year: '2019-20',
    semester: 'II-B.Tech I-Sem',
    regulation: 'V18(Autonomous)',
    title: 'II-B.Tech I-Sem V18(Autonomous) 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20I%20Sem%202019-20.pdf'
  },
  {
    academic_year: '2019-20',
    semester: 'III-B.Tech I-Sem',
    regulation: 'R16',
    title: 'III-B.Tech I-Sem R16 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20I%20Sem%202019-20.pdf'
  },
  {
    academic_year: '2019-20',
    semester: 'IV-B.Tech I-Sem',
    regulation: 'R16',
    title: 'IV-B.Tech I-Sem R16 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20I%20Sem%202019-20.pdf'
  },

  // Academic year 2018-19
  {
    academic_year: '2018-19',
    semester: 'II-B.Tech II-Sem',
    regulation: null,
    title: 'II-B.Tech II-Sem 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20II%20Sem%202018-19.pdf'
  },
  {
    academic_year: '2018-19',
    semester: 'III-B.Tech II-Sem',
    regulation: null,
    title: 'III-B.Tech II-Sem 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20II%20Sem%202018-19.pdf'
  },
  {
    academic_year: '2018-19',
    semester: 'IV-B.Tech II-Sem',
    regulation: null,
    title: 'IV-B.Tech II-Sem 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20II%20Sem%202018-19.pdf'
  },
  {
    academic_year: '2018-19',
    semester: 'II-B.Tech I-Sem',
    regulation: null,
    title: 'II-B.Tech I-Sem 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/II%20B.%20Tech%20Ist%20Sem%202018-19.pdf'
  },
  {
    academic_year: '2018-19',
    semester: 'III-B.Tech I-Sem',
    regulation: null,
    title: 'III-B.Tech I-Sem 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/III%20B.%20Tech%20Ist%20Sem%202018-19.pdf'
  },
  {
    academic_year: '2018-19',
    semester: 'IV-B.Tech I-Sem',
    regulation: null,
    title: 'IV-B.Tech I-Sem 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/handbooks/IV%20B.%20Tech%20Ist%20Sem%202018-19.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTHandbooks() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_handbooks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        academic_year VARCHAR(20) NOT NULL,
        semester VARCHAR(50) NOT NULL,
        regulation VARCHAR(50),
        title VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_handbooks table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_handbooks');
    console.log('🗑️ Cleared existing ECT handbooks records');

    // Insert handbooks data
    let successCount = 0;
    let errorCount = 0;

    for (const item of handbooksData) {
      try {
        await connection.execute(
          `INSERT INTO ect_handbooks (academic_year, semester, regulation, title, url, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
          [item.academic_year, item.semester, item.regulation, item.title, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} handbook records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${handbooksData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_handbooks');
    console.log(`📋 Total handbook records in database: ${rows[0].count}`);

    // Show breakdown by academic year
    const [yearBreakdown] = await connection.execute(`
      SELECT academic_year, COUNT(*) as count
      FROM ect_handbooks
      GROUP BY academic_year
      ORDER BY academic_year DESC
    `);

    console.log('\n📈 Records by Academic Year:');
    yearBreakdown.forEach(row => {
      console.log(`   ${row.academic_year}: ${row.count} records`);
    });

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTHandbooks()
    .then(() => {
      console.log('🎉 ECT Handbooks migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTHandbooks, handbooksData };
