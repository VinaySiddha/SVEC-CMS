const mysql = require('mysql2/promise');

const libraryData = {
  title: 'Department Library',
  description: [
    "The Department of Mechanical Engineering maintains a comprehensive library that serves as an essential resource for students and faculty. Our collection includes textbooks, reference materials, journals, and digital resources covering all aspects of mechanical engineering disciplines.",
    "The library provides a quiet environment for study and research, with ample seating and workspaces. Students can access technical manuals, design handbooks, engineering standards, and the latest research publications in the field.",
    "Digital resources include subscriptions to leading engineering journals, e-books, and access to engineering databases, enabling students to stay updated with the latest advancements in mechanical engineering."
  ],
  image_url: 'https://img.freepik.com/free-photo/friends-learning-study-group_23-2149257209.jpg',
  resources: [
    { icon: 'Book', text: 'Total Books: 1,500+' },
    { icon: 'BookOpen', text: 'Journals & Periodicals: 25+' },
    { icon: 'Library', text: 'Digital Resources: 500+' },
    { icon: 'FileText', text: 'Project Reports Archive' },
    { icon: 'Database', text: 'Technical Standards Collection' }
  ],
  services: [
    { icon: 'Search', text: 'Reference & Research Support' },
    { icon: 'Download', text: 'Digital Resource Access' },
    { icon: 'Wifi', text: 'Free Wi-Fi Access' },
    { icon: 'TrendingUp', text: 'New Acquisitions Updates' },
    { icon: 'Presentation', text: 'Presentation & Seminar Resources' }
  ],
  faculty_incharge: {
    name: 'Mr. K. Sri Rama Murthy',
    designation: 'Sr. Assistant Professor',
    department: 'Department of Mechanical Engineering'
  }
};

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechLibrary() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_library (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description JSON,
        image_url VARCHAR(500),
        resources JSON,
        services JSON,
        faculty_incharge JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_library table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_library');
    console.log('🗑️ Cleared existing MECH library records');

    // Insert library data
    try {
      await connection.execute(
        `INSERT INTO mech_library (title, description, image_url, resources, services, faculty_incharge, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [libraryData.title, JSON.stringify(libraryData.description), libraryData.image_url, JSON.stringify(libraryData.resources), JSON.stringify(libraryData.services), JSON.stringify(libraryData.faculty_incharge)]
      );
      console.log(`✅ Inserted: ${libraryData.title}`);
    } catch (error) {
      console.log(`❌ Error inserting library data: ${error.message}`);
      throw error;
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: 1 library record`);
    console.log(`❌ Errors: 0`);
    console.log(`📝 Total processed: 1`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_library');
    console.log(`📋 Total library records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechLibrary()
    .then(() => {
      console.log('🎉 MECH Library migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechLibrary, libraryData };
