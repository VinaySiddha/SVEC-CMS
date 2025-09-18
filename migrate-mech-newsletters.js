const mysql = require('mysql2/promise');

const newslettersData = [
  // 2017 Newsletters
  {
    year: 2017,
    volume: 4,
    issue: 3,
    month: 'January',
    title: 'Volume 4 Issue 3 - January 2017',
    description: 'First newsletter of the year highlighting winter activities',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%203-%20jan%202017.pdf'
  },
  {
    year: 2017,
    volume: 4,
    issue: 4,
    month: 'April',
    title: 'Volume 4 Issue 4 - April 2017',
    description: 'Spring edition featuring end-of-semester projects',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%204-%20apr%202017.pdf'
  },
  {
    year: 2017,
    volume: 5,
    issue: 1,
    month: 'September',
    title: 'Volume 5 Issue 1 - September 2017',
    description: 'Fall semester kickoff with new student orientation details',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%205%20Issue%20%201-%20sep%202017.pdf'
  },
  {
    year: 2017,
    volume: 5,
    issue: 2,
    month: 'November',
    title: 'Volume 5 Issue 2 - November 2017',
    description: 'Winter preparation and mid-year project updates',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%205%20Issue%20%202-%20nov%202017.pdf'
  },
  // 2016 Newsletters
  {
    year: 2016,
    volume: 3,
    issue: 3,
    month: 'January',
    title: 'Volume 3 Issue 3 - January 2016',
    description: 'New year edition featuring department goals',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%203-%20jan%202016.pdf'
  },
  {
    year: 2016,
    volume: 3,
    issue: 4,
    month: 'April',
    title: 'Volume 3 Issue 4 - April 2016',
    description: 'Spring highlights and research progress',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%204-%20apr%202016.pdf'
  },
  {
    year: 2016,
    volume: 4,
    issue: 1,
    month: 'September',
    title: 'Volume 4 Issue 1 - September 2016',
    description: 'New academic year with faculty updates',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%201-%20sep%202016.pdf'
  },
  {
    year: 2016,
    volume: 4,
    issue: 2,
    month: 'November',
    title: 'Volume 4 Issue 2 - November 2016',
    description: 'Fall semester events and workshop recaps',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%204%20Issue%20%202-%20nov%202016.pdf'
  },
  // 2014-2015 Newsletters
  {
    year: 2014,
    volume: 2,
    issue: 1,
    month: 'September',
    title: 'Volume 2 Issue 1 - September 2014',
    description: 'Department relaunch with new curriculum',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%201-%20sep%202014.pdf'
  },
  {
    year: 2014,
    volume: 2,
    issue: 2,
    month: 'November',
    title: 'Volume 2 Issue 2 - November 2014',
    description: 'Mid-semester achievements and guest lectures',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%202-%20nov%202014.pdf'
  },
  {
    year: 2015,
    volume: 2,
    issue: 3,
    month: 'January',
    title: 'Volume 2 Issue 3 - January 2015',
    description: 'New year edition with student innovations',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%203-%20jan%202015.pdf'
  },
  {
    year: 2015,
    volume: 2,
    issue: 4,
    month: 'April',
    title: 'Volume 2 Issue 4 - April 2015',
    description: 'End of academic year highlights and future plans',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%202%20Issue%20%204-%20apr%202015.pdf'
  },
  {
    year: 2015,
    volume: 3,
    issue: 1,
    month: 'September',
    title: 'Volume 3 Issue 1 - September 2015',
    description: 'New academic year welcome edition',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%201-%20sep%202015.pdf'
  },
  {
    year: 2015,
    volume: 3,
    issue: 2,
    month: 'November',
    title: 'Volume 3 Issue 2 - November 2015',
    description: 'Fall semester activities and technical events',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Volume%20%203%20Issue%20%202-%20nov%202015.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechNewsletters() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_newsletters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year INT NOT NULL,
        volume INT NOT NULL,
        issue INT NOT NULL,
        month VARCHAR(20) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_newsletters table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_newsletters');
    console.log('🗑️ Cleared existing MECH newsletters records');

    // Insert newsletters data
    let successCount = 0;
    let errorCount = 0;

    for (const item of newslettersData) {
      try {
        await connection.execute(
          `INSERT INTO mech_newsletters (year, volume, issue, month, title, description, url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
          [item.year, item.volume, item.issue, item.month, item.title, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} newsletter records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${newslettersData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_newsletters');
    console.log(`📋 Total newsletter records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechNewsletters()
    .then(() => {
      console.log('🎉 MECH Newsletters migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechNewsletters, newslettersData };
