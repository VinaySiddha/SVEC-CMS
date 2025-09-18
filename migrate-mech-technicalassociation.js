const mysql = require('mysql2/promise');

const technicalAssociationData = [
  {
    title: 'Fabulous Association of Mechanical Engineers (FAME)',
    description: 'FAME is a student body which is governed by the students with the support from the department. Every student from Department of Mechanical Engineering is beamed to be the member of this Association. The Association is very active in conducting Workshops, Seminars and other Curricular activities.'
  },
  {
    title: 'Guest Lecture by Mr. S.Ravi Kumar from IIT New-Delhi',
    description: 'Mr. S.Ravi Kumar from IIT New-Delhi has delivered a guest lecture on "Metrology And Material Science".'
  },
  {
    title: 'Guest Lecture by Mr. S.V.S.S.Srikanth from Ansys/FLUENT Technologies, Pune',
    description: 'Mr. S.V.S.S.Srikanth from Ansys/FLUENT Technologies, Pune has delivered a guest lecture on "ANSYS"'
  },
  {
    title: 'Guest Lecture by Dr.G.V.N.S.Ratnakara Rao B.E,M.E,Ph.D. from BIET, Bhimavaram',
    description: 'Dr.G.V.N.S.Ratnakara Rao B.E,M.E,Ph.D. from BIET, Bhimavaram has delivered a guest lecture on "An Insight Into Combustion in I.C. engines".'
  },
  {
    title: 'Guest Lecture by Mr. Mallikarjun Rao from Steel Plant, Vizag',
    description: 'Mr. Mallikarjun Rao from Steel Plant, Vizag has delivered a guest lecture on General Management And Skills'
  },
  {
    title: 'Guest Lecture by Mr. Nageswara Rao from IIT Bombay',
    description: 'Mr. Nageswara Rao from IIT Bombay has delivered a guest lecture on "Presentation Skills".'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechTechnicalAssociation() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_technicalassociation (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_technicalassociation table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_technicalassociation');
    console.log('🗑️ Cleared existing MECH technical association records');

    // Insert technical association data
    let successCount = 0;
    let errorCount = 0;

    for (const item of technicalAssociationData) {
      try {
        await connection.execute(
          `INSERT INTO mech_technicalassociation (title, description, created_at) VALUES (?, ?, NOW())`,
          [item.title, item.description]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} technical association records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${technicalAssociationData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_technicalassociation');
    console.log(`📋 Total technical association records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechTechnicalAssociation()
    .then(() => {
      console.log('🎉 MECH Technical Association migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechTechnicalAssociation, technicalAssociationData };
