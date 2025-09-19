const mysql = require('mysql2/promise');

const workshopsData = [
  {
    academic_year: '2022-23',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2022-23_Department%20activities.pdf'
  },
  {
    academic_year: '2021-22',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-AY-2021-22-ME.pdf'
  },
  {
    academic_year: '2020-21',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2020-21_Department%20activities.pdf'
  },
  {
    academic_year: '2019-20',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop_Guest_Lecture-2019-20-ME.pdf'
  },
  {
    academic_year: '2018-19',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop_Guest_Lecture-2018-19-ME.pdf'
  },
  {
    academic_year: '2017-18',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2017-18',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshop\'s-FDPs-2017-18-ME.pdf'
  },
  {
    academic_year: '2016-17',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2016-17',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20Organized%202016-17.pdf'
  },
  {
    academic_year: '2015-16',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2015-16',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20Organized%202015-16.pdf'
  },
  {
    academic_year: '2014-15',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2014-15',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20%20Organized%202014-15.pdf'
  },
  {
    academic_year: '2013-14',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2013-14',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20%20Organized%202013-14.pdf'
  },
  {
    academic_year: '2012-13',
    description: 'Workshops/Guest Lectures/FDPs Organized during the Academic Year 2012-13',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Workshopsfdpsguest%20Organized%202012%E2%80%9313.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechWorkshops() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_workshops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        academic_year VARCHAR(10) NOT NULL,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_workshops table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_workshops');
    console.log('🗑️ Cleared existing MECH workshops records');

    // Insert workshops data
    let successCount = 0;
    let errorCount = 0;

    for (const item of workshopsData) {
      try {
        await connection.execute(
          `INSERT INTO mech_workshops (academic_year, description, url, created_at) VALUES (?, ?, ?, NOW())`,
          [item.academic_year, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.academic_year} - ${item.description}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.academic_year}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} workshop records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${workshopsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_workshops');
    console.log(`📋 Total workshop records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechWorkshops()
    .then(() => {
      console.log('🎉 MECH Workshops migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechWorkshops, workshopsData };
