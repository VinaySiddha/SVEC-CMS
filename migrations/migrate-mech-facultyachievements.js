const mysql = require('mysql2/promise');

const facultyAchievementsData = [
  // Faculty Publications
  {
    category: 'Faculty Publications',
    academic_year: '2022-23',
    description: 'Faculty Publication during the Academic Year 2022-2023',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Faculty_Publications_AY-2022-23.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2021-22',
    description: 'Faculty Publication during the Academic Year 2021-2022',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Faculty_Publications_AY-2021-22.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2020-21',
    description: 'Faculty Publication during the Academic Year 2020-2021',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Publications_2020-21-ME.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2019-20',
    description: 'Faculty Publication during the Academic Year 2019-2020',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Publications_2019-20-ME.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2018-19',
    description: 'Faculty Publication during the Academic Year 2018-2019',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Publications_2018-19-ME.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2017-18',
    description: 'Faculty Publication during the Academic Year 2017-2018',
    url: 'https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202017-18.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2016-17',
    description: 'Faculty Publication during the Academic Year 2016-2017',
    url: 'https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202016-17.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2015-16',
    description: 'Faculty Publication during the Academic Year 2015-2016',
    url: 'https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202015-16.pdf'
  },
  {
    category: 'Faculty Publications',
    academic_year: '2014-15',
    description: 'Faculty Publication during the Academic Year 2014-2015',
    url: 'https://srivasaviengg.ac.in/uploads/mech/FACULTY%20PUBLICATIONS%20AC%202014-2015.pdf'
  },
  // Conferences & Workshops
  {
    category: 'Conferences & Workshops',
    academic_year: '2022-23',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2022-23",
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-AY-2022-23-ME.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2021-22',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2021-22",
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-AY-2021-22-ME.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2020-21',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2020-21",
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-2020-21-ME.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2019-20',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2019-20",
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-2019-20-ME.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2018-19',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2018-19",
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-2018-19-ME.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2017-18',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2017-18",
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-2017-18-ME.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2016-17',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2016-17",
    url: 'https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2016-17.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2015-16',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2015-16",
    url: 'https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2015-16.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2014-15',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2014-15",
    url: 'https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2014-15.pdf'
  },
  {
    category: 'Conferences & Workshops',
    academic_year: '2013-14',
    description: "Workshops/Conferencec/FDP's Conducted by the Faculty during the Academic Year 2013-14",
    url: 'https://srivasaviengg.ac.in/uploads/mech/fdps_wrkshps_2013-14.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechFacultyAchievements() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_facultyachievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        academic_year VARCHAR(20) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_academic_year (academic_year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ mech_facultyachievements table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_facultyachievements');
    console.log('🗑️ Cleared existing mech faculty achievements records');

    // Insert faculty achievements data
    let successCount = 0;
    let errorCount = 0;

    for (const item of facultyAchievementsData) {
      try {
        await connection.execute(
          `INSERT INTO mech_facultyachievements (category, academic_year, description, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.category, item.academic_year, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.category} - ${item.academic_year}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.category} - ${item.academic_year}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} faculty achievement records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${facultyAchievementsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_facultyachievements');
    console.log(`📋 Total faculty achievement records in database: ${rows[0].count}`);

    // Show category breakdown
    const [categoryRows] = await connection.execute(
      'SELECT category, COUNT(*) as count FROM mech_facultyachievements GROUP BY category'
    );
    console.log('\n📊 Category Breakdown:');
    categoryRows.forEach(row => {
      console.log(`   ${row.category}: ${row.count} records`);
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
  migrateMechFacultyAchievements()
    .then(() => {
      console.log('🎉 Mechanical Faculty Achievements migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechFacultyAchievements, facultyAchievementsData };
