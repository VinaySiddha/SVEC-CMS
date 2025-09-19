const mysql = require('mysql2/promise');

const projectResearchData = [
  {
    category: 'Undergraduate',
    description: 'Research Projects during academic year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2022-23-Research_Projects.pdf'
  },
  {
    category: 'Undergraduate',
    description: 'Research Projects during academic year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2021-22-Research_Projects.pdf'
  },
  {
    category: 'Undergraduate',
    description: 'Research Projects during academic year 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2020-21-Research_Projects.pdf'
  },
  {
    category: 'Undergraduate',
    description: 'Research Projects during academic year 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2019-20-Research_Projects.pdf'
  },
  {
    category: 'Undergraduate',
    description: 'Research Projects during academic year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2018-19-Research%20Projects.pdf'
  },
  {
    category: 'Postgraduate',
    description: 'Research Projects Details',
    url: 'https://srivasaviengg.ac.in/uploads/mech/M.Tech.Research_Projects.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechProjectResearch() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_project_research (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_project_research table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_project_research');
    console.log('🗑️ Cleared existing mech project research records');

    // Insert project research data
    let successCount = 0;
    let errorCount = 0;

    for (const item of projectResearchData) {
      try {
        await connection.execute(
          `INSERT INTO mech_project_research (category, description, url, created_at) VALUES (?, ?, ?, NOW())`,
          [item.category, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.description}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.description}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} project research records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${projectResearchData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_project_research');
    console.log(`📋 Total project research records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechProjectResearch()
    .then(() => {
      console.log('🎉 Mech Project Research migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechProjectResearch, projectResearchData };
