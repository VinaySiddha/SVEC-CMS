const mysql = require('mysql2/promise');

const syllabusData = [
  {
    program: 'B.Tech (ECE & ECT)',
    title: 'B.Tech - V23 Syllabus',
    academic_year: '2023-24',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/ECE B.Tech- V23 Syllabus.pdf'
  },
  {
    program: 'B.Tech (ECE & ECT)',
    title: 'B.Tech - V20 Syllabus',
    academic_year: '2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V%2020%20-%20Reg)%20syllabus.pdf'
  },
  {
    program: 'B.Tech (ECE & ECT)',
    title: 'B.Tech - V18 Syllabus',
    academic_year: '2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V18-%20Reg)%20Syllabus.pdf'
  },
  {
    program: 'M.TECH',
    title: 'M.Tech - V21 Syllabus',
    academic_year: '2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/M.%20Tech%20(ES%20&%20VLSI)-V21%20Reg.pdf'
  },
  {
    program: 'M.TECH',
    title: 'M.Tech - V18 Syllabus',
    academic_year: '2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/Electronics%20&%20Communication%20Engineeringv18.pdf'
  },
  {
    program: 'SOC',
    title: 'SOC Syllabus during the Academic Year 2023-24',
    academic_year: '2023-24',
    url: 'https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2023-24.pdf'
  },
  {
    program: 'SOC',
    title: 'SOC Syllabus during the Academic Year 2022-23',
    academic_year: '2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2022-23.pdf'
  },
  {
    program: 'SOC',
    title: 'SOC Syllabus during the Academic Year 2021-22',
    academic_year: '2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2021-22.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECESyllabus() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_syllabus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        academic_year VARCHAR(20),
        url VARCHAR(500) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_syllabus table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_syllabus');
    console.log('🗑️ Cleared existing ECE syllabus records');

    // Insert syllabus data
    let successCount = 0;
    let errorCount = 0;

    for (const item of syllabusData) {
      try {
        await connection.execute(
          `INSERT INTO ece_syllabus (program, title, academic_year, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.program, item.title, item.academic_year, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} syllabus records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${syllabusData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_syllabus');
    console.log(`📋 Total syllabus records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECESyllabus()
    .then(() => {
      console.log('🎉 ECE Syllabus migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECESyllabus, syllabusData };