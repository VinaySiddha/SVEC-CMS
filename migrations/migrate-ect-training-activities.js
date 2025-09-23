const mysql = require('mysql2/promise');

const trainingActivitiesData = [
  {
    academic_year: '2022-23',
    title: 'List of Training Activities conducted in 2022-23',
    description: 'List of Training Activities conducted in 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/training%20Activities%20in%202022-23.pdf'
  },
  {
    academic_year: '2021-22',
    title: 'List of Training Activities conducted in 2021-22',
    description: 'List of Training Activities conducted in 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Traning%20Activities%20during%20A.Y.2021-2022.pdf'
  },
  {
    academic_year: '2020-21',
    title: 'List of Training Activities conducted in 2020-21',
    description: 'List of Training Activities conducted in 2020-21',
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

async function migrateECTTrainingActivities() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_training_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        academic_year VARCHAR(20) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_training_activities table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_training_activities');
    console.log('🗑️ Cleared existing ECT training activities records');

    // Insert training activities data
    let successCount = 0;
    let errorCount = 0;

    for (const item of trainingActivitiesData) {
      try {
        await connection.execute(
          `INSERT INTO ect_training_activities (academic_year, title, description, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.academic_year, item.title, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} training activity records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${trainingActivitiesData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_training_activities');
    console.log(`📋 Total training activity records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTTrainingActivities()
    .then(() => {
      console.log('🎉 ECT Training Activities migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTTrainingActivities, trainingActivitiesData };
