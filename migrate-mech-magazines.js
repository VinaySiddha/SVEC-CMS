const mysql = require('mysql2/promise');

const magazinesData = [
  {
    year: '2019-2020',
    volume: '6',
    issue: '2',
    title: 'Mechazine Volume 6 Issue 2',
    description: 'End of academic year special edition',
    url: 'https://srivasaviengg.ac.in/uploads/mech/MECHAZINE_2019-20_V-6 _I-2.pdf'
  },
  {
    year: '2019-2020',
    volume: '6',
    issue: '1',
    title: 'Mechazine Volume 6 Issue 1',
    description: 'Beginning of academic year edition',
    url: 'https://srivasaviengg.ac.in/uploads/mech/MECHAZINE_2019-20_V-6 _I-1.pdf'
  },
  {
    year: '2018-2019',
    volume: '5',
    issue: '2',
    title: 'Mechazine Volume 5 Issue 2',
    description: 'Spring semester technical showcase',
    url: 'https://srivasaviengg.ac.in/uploads/mech/MECHAZINE_2018-19_V-5 _I-2.pdf'
  },
  {
    year: '2018-2019',
    volume: '5',
    issue: '1',
    title: 'Mechazine Volume 5 Issue 1',
    description: 'Fall semester edition with student projects',
    url: 'https://srivasaviengg.ac.in/uploads/mech/MECHAZINE 2017 & 18 V5I1.pdf'
  },
  {
    year: '2016-2017',
    volume: '4',
    issue: '2',
    title: 'Mechazine Volume 4 Issue 2',
    description: 'Technical innovations and research highlights',
    url: 'https://srivasaviengg.ac.in/uploads/mech/MECHAZINE 2016-17 V4I2.pdf'
  },
  {
    year: '2016-2017',
    volume: '4',
    issue: '1',
    title: 'Mechazine Volume 4 Issue 1',
    description: 'Fall edition with student activities',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume 4 Issue 1.pdf'
  },
  {
    year: 'Earlier Issues',
    volume: '3',
    issue: '1',
    title: 'Mechazine Volume 3 Issue 1',
    description: 'Earlier issues collection',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume 3 Issue 1.pdf'
  },
  {
    year: 'Earlier Issues',
    volume: '3',
    issue: '2',
    title: 'Mechazine Volume 3 Issue 2',
    description: 'Earlier issues collection',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume3 Issue2.pdf'
  },
  {
    year: 'Earlier Issues',
    volume: '2',
    issue: '1',
    title: 'Mechazine Volume 2 Issue 1',
    description: 'Earlier issues collection',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Mechazine Volume2 Issue1.pdf'
  },
  {
    year: 'Earlier Issues',
    volume: '2',
    issue: '2',
    title: 'Mechazine Volume 2 Issue 2',
    description: 'Earlier issues collection',
    url: 'https://srivasaviengg.ac.in/uploads/mech/mechazine volume2 issue2.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechMagazines() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_magazines (
        id INT AUTO_INCREMENT PRIMARY KEY,
        year VARCHAR(20) NOT NULL,
        volume VARCHAR(10) NOT NULL,
        issue VARCHAR(10) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(500),
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_magazines table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_magazines');
    console.log('🗑️ Cleared existing MECH magazines records');

    // Insert magazines data
    let successCount = 0;
    let errorCount = 0;

    for (const item of magazinesData) {
      try {
        await connection.execute(
          `INSERT INTO mech_magazines (year, volume, issue, title, description, url, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [item.year, item.volume, item.issue, item.title, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} magazine records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${magazinesData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_magazines');
    console.log(`📋 Total magazine records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechMagazines()
    .then(() => {
      console.log('🎉 MECH Magazines migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechMagazines, magazinesData };
