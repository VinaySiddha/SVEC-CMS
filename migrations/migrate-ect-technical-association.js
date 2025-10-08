const mysql = require('mysql2/promise');

const technicalAssociationData = [
  {
    title: 'Technical Association',
    description: 'Victorious Electronics with Dynamic Aspirants is the departmental student association. The main intention of VEDA is to provide effective communication among the students of ECE department and share their ideas and improve their technical skills. The Department also conducts various Activities under the banner of IETE Student Chapter.',
    event_name: null,
    event_url: null,
    images: null
  },
  {
    title: null,
    description: null,
    event_name: "Engineer's Day Celebrations 2K22",
    event_url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'Tech Veda 2K22',
    event_url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Techveda2k22.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'Tech Veda 2K19',
    event_url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Tech%20Veda_2k19.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'Engineers Day celebrations 2K18',
    event_url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Engineers%20Day%20celebrations.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'Tech Veda 2K17',
    event_url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/b.Tech%20Veda%202K17.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'TechEuphoria 2K19',
    event_url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K19.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'TechEuphoria 2K18',
    event_url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/TECHEUPHORIA%202K18.pdf',
    images: null
  },
  {
    title: null,
    description: null,
    event_name: 'TECKVEDA-2K19 Gallery',
    event_url: null,
    images: JSON.stringify([
      { src: "tech_veda%20poster.jpg", alt: "Image 1" },
      { src: "tech_veda1.jpg", alt: "Image 2" },
      { src: "tech_veda2.jpg", alt: "Image 2" },
      { src: "tech_veda3.jpg", alt: "Image 2" },
      { src: "tech_veda4.jpg", alt: "Image 2" },
      { src: "tech_veda%20pick&speak1.jpg", alt: "Image 2" },
      { src: "tech_veda%20pick&speak2.jpg", alt: "Image 2" },
      { src: "tech_veda%20tech1.jpg", alt: "Image 2" },
      { src: "tech_veda%20tech2.jpg", alt: "Image 2" },
      { src: "tech_veda%20proexpo1.jpg", alt: "Image 2" },
      { src: "tech_veda%20proexpo2.jpg", alt: "Image 2" },
      { src: "tech_veda%20proexpo3.jpg", alt: "Image 2" },
      { src: "tech_veda%20proexpo4.jpg", alt: "Image 2" },
      { src: "tech_veda%20paperpren1.jpg", alt: "Image 2" },
      { src: "tech_veda%20paperpren2.jpg", alt: "Image 2" }
    ])
  },
  {
    title: null,
    description: null,
    event_name: 'TECKVEDA-2K18 Gallery',
    event_url: null,
    images: JSON.stringify([
      { src: "techf%20(1).jpg", alt: "Image 1" },
      { src: "techf%20(2).jpg", alt: "Image 2" },
      { src: "techf%20(3).jpg", alt: "Image 2" },
      { src: "techf%20(4).jpg", alt: "Image 2" },
      { src: "techf_1.jpg", alt: "Image 2" },
      { src: "techf_4.jpg", alt: "Image 2" },
      { src: "tecassoc%20(17).jpg", alt: "Image 2" },
      { src: "tecassoc%20(18).jpg", alt: "Image 2" },
      { src: "tecassoc%20(19).jpg", alt: "Image 2" },
      { src: "tecassoc%20(20).jpg", alt: "Image 2" },
      { src: "tecassoc%20(21).jpg", alt: "Image 2" },
      { src: "tecassoc%20(22).jpg", alt: "Image 2" },
      { src: "tecassoc%20(23).jpg", alt: "Image 2" },
      { src: "tecassoc%20(4).jpg", alt: "Image 2" },
      { src: "tecassoc%20(5).jpg", alt: "Image 2" },
      { src: "tecassoc%20(6).jpg", alt: "Image 2" },
      { src: "tecassoc%20(7).jpg", alt: "Image 2" },
      { src: "tecassoc%20(8).jpg", alt: "Image 2" },
      { src: "tecassoc%20(9).jpg", alt: "Image 2" },
      { src: "tecassoc%20(10).jpg", alt: "Image 2" },
      { src: "tecassoc%20(11).jpg", alt: "Image 2" },
      { src: "tecassoc%20(14).jpg", alt: "Image 2" },
      { src: "tecassoc%20(15).jpg", alt: "Image 2" },
      { src: "tecassoc%20(16).jpg", alt: "Image 2" }
    ])
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTTechnicalAssociation() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_technical_association (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        event_name VARCHAR(255),
        event_url VARCHAR(500),
        images TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_technical_association table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_technical_association');
    console.log('🗑️ Cleared existing ECT technical association records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of technicalAssociationData) {
      try {
        await connection.execute(
          `INSERT INTO ect_technical_association (title, description, event_name, event_url, images, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
          [item.title, item.description, item.event_name, item.event_url, item.images]
        );
        console.log(`✅ Inserted: ${item.event_name || item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.event_name || item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${technicalAssociationData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_technical_association');
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
  migrateECTTechnicalAssociation()
    .then(() => {
      console.log('🎉 ECT Technical Association migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTTechnicalAssociation, technicalAssociationData };
