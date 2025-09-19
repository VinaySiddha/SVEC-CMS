const mysql = require('mysql2/promise');

const techAssocTrainingData = [
  // Technical Association - Celebrations Under Veda (type: 'technical_association_event')
  {
    type: 'technical_association_event',
    title: "Engineer's Day Celebrations 2K22",
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf'
  },
  {
    type: 'technical_association_event',
    title: 'Tech Veda 2K22',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Techveda2k22.pdf'
  },
  {
    type: 'technical_association_event',
    title: 'Tech Veda 2K19',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Tech%20Veda_2k19.pdf'
  },
  {
    type: 'technical_association_event',
    title: 'Engineers Day celebrations 2K18',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Engineers%20Day%20celebrations.pdf'
  },
  {
    type: 'technical_association_event',
    title: 'Tech Veda 2K17',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/b.Tech%20Veda%202K17.pdf'
  },
  {
    type: 'technical_association_event',
    title: 'TechEuphoria 2K19',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K19.pdf'
  },
  {
    type: 'technical_association_event',
    title: 'TechEuphoria 2K18',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K18.pdf'
  },

  // Technical Association - Gallery (type: 'gallery')
  // TECKVEDA-2K19
  ...[
    "tech_veda%20poster.jpg",
    "tech_veda1.jpg",
    "tech_veda2.jpg",
    "tech_veda3.jpg",
    "tech_veda4.jpg",
    "tech_veda%20pick&speak1.jpg",
    "tech_veda%20pick&speak2.jpg",
    "tech_veda%20tech1.jpg",
    "tech_veda%20tech2.jpg",
    "tech_veda%20proexpo1.jpg",
    "tech_veda%20proexpo2.jpg",
    "tech_veda%20proexpo3.jpg",
    "tech_veda%20proexpo4.jpg",
    "tech_veda%20paperpren1.jpg",
    "tech_veda%20paperpren2.jpg"
  ].map((src, idx) => ({
    type: 'gallery_2k19',
    title: `TECKVEDA-2K19 Image ${idx + 1}`,
    url: `https://srivasaviengg.ac.in/uploads/ece_meritscholarships/${src}`
  })),
  // TECKVEDA-2K18
  ...[
    "techf%20(1).jpg",
    "techf%20(2).jpg",
    "techf%20(3).jpg",
    "techf%20(4).jpg",
    "techf_1.jpg",
    "techf_4.jpg",
    "tecassoc%20(17).jpg",
    "tecassoc%20(18).jpg",
    "tecassoc%20(19).jpg",
    "tecassoc%20(20).jpg",
    "tecassoc%20(21).jpg",
    "tecassoc%20(22).jpg",
    "tecassoc%20(23).jpg",
    "tecassoc%20(4).jpg",
    "tecassoc%20(5).jpg",
    "tecassoc%20(6).jpg",
    "tecassoc%20(7).jpg",
    "tecassoc%20(8).jpg",
    "tecassoc%20(9).jpg",
    "tecassoc%20(10).jpg",
    "tecassoc%20(11).jpg",
    "tecassoc%20(14).jpg",
    "tecassoc%20(15).jpg",
    "tecassoc%20(16).jpg"
  ].map((src, idx) => ({
    type: 'gallery_2k18',
    title: `TECKVEDA-2K18 Image ${idx + 1}`,
    url: `https://srivasaviengg.ac.in/uploads/ece_meritscholarships/${src}`
  })),

  // Training Activities (type: 'training_activity')
  {
    type: 'training_activity',
    year: '2022-23',
    title: 'List of Training Activities conducted in 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/training%20Activities%20in%202022-23.pdf'
  },
  {
    type: 'training_activity',
    year: '2021-22',
    title: 'List of Training Activities conducted in 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.2021-2022.pdf'
  },
  {
    type: 'training_activity',
    year: '2020-21',
    title: 'List of Training Activities conducted in 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.%202020-2021%20update.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECETechAssocTraining() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_technicalAssociation_trainingActivities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(48) NOT NULL,
        year VARCHAR(16),
        title VARCHAR(256) NOT NULL,
        url VARCHAR(512),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_technicalAssociation_trainingActivities table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_technicalAssociation_trainingActivities');
    console.log('🗑️ Cleared existing technical association/training activities records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of techAssocTrainingData) {
      try {
        await connection.execute(
          `INSERT INTO ece_technicalAssociation_trainingActivities (type, year, title, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.type, item.year || null, item.title, item.url]
        );
        console.log(`✅ Inserted: [${item.type}] ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting [${item.type}] ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${techAssocTrainingData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_technicalAssociation_trainingActivities');
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
  migrateECETechAssocTraining()
    .then(() => {
      console.log('🎉 ECE Technical Association & Training Activities migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECETechAssocTraining, techAssocTrainingData };