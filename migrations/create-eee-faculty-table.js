const mysql = require('mysql2/promise');

async function createEEEFacultyTable() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔌 Connected to database');
    console.log('🏗️  Creating EEE Faculty Table...');

    // Create eee_faculty table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS eee_faculty (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        qualification VARCHAR(255),
        designation VARCHAR(255),
        profile_url VARCHAR(500),
        specialization VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(20),
        bio TEXT,
        research_interests TEXT,
        experience_years INT,
        status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ eee_faculty table created successfully');

    // Migrate existing EEE faculty data from faculty_profiles
    const [existingData] = await connection.execute(`
      SELECT * FROM faculty_profiles WHERE dept = 'eee'
    `);

    if (existingData.length > 0) {
      console.log(`\n📦 Migrating ${existingData.length} existing EEE faculty records...`);

      for (const faculty of existingData) {
        await connection.execute(`
          INSERT INTO eee_faculty (
            name, 
            qualification, 
            designation, 
            profile_url, 
            specialization,
            email,
            phone,
            bio,
            research_interests,
            experience_years,
            status,
            created_at,
            updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          faculty.name,
          faculty.qualification,
          faculty.designation,
          faculty.profile_url,
          faculty.specialization || 'Electrical Engineering',
          faculty.email,
          faculty.phone || null,
          faculty.bio,
          faculty.research_interests,
          faculty.experience_years || 10,
          faculty.status || 'active',
          faculty.created_at,
          faculty.updated_at
        ]);

        console.log(`✅ Migrated: ${faculty.name}`);
      }

      console.log(`\n📊 Successfully migrated ${existingData.length} faculty members to eee_faculty table`);
    } else {
      console.log('ℹ️  No existing EEE faculty data found in faculty_profiles');
    }

    // Verify the migration
    const [count] = await connection.execute(`
      SELECT COUNT(*) as total FROM eee_faculty
    `);

    console.log(`\n📋 Total EEE faculty in new table: ${count[0].total}`);

  } catch (error) {
    console.error('💥 Operation failed:', error.message);
  } finally {
    await connection.end();
    console.log('\n🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  createEEEFacultyTable()
    .then(() => {
      console.log('\n🎉 EEE Faculty table creation and migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { createEEEFacultyTable };
