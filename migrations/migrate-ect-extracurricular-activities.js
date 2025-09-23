const mysql = require('mysql2/promise');

const extracurricularActivitiesData = [
  // Extracurricular Activities List
  {
    category: 'Extracurricular Activities',
    title: '2022-23',
    description: 'Extracurricular activities during the Year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202022-23.pdf',
    year: '2022-23'
  },
  {
    category: 'Extracurricular Activities',
    title: '2021-22',
    description: 'Extracurricular activities during the Year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf',
    year: '2021-22'
  },
  {
    category: 'Extracurricular Activities',
    title: '2019-20',
    description: 'Extracurricular activities during the Year 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities19-20.pdf',
    year: '2019-20'
  },
  {
    category: 'Extracurricular Activities',
    title: '2018-19',
    description: 'Extracurricular activities during the Year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities18-19.pdf',
    year: '2018-19'
  },
  {
    category: 'Extracurricular Activities',
    title: '2017-18',
    description: 'Extracurricular activities during the Year 2017-18',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities17-18.pdf',
    year: '2017-18'
  },
  {
    category: 'Extracurricular Activities',
    title: '2016-17',
    description: 'Extracurricular activities during the Year 2016-17',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities16-17.pdf',
    year: '2016-17'
  },
  {
    category: 'Extracurricular Activities',
    title: '2015-16',
    description: 'Extracurricular activities during the Year 2015-16',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities15-16.pdf',
    year: '2015-16'
  },
  // Departmental Sports Meet
  {
    category: 'Departmental Sports Meet',
    title: 'Prize Distribution to Kabaddi winners and runners',
    description: 'Prize Distribution to Kabaddi winners and runners',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Kabaddi%20winners%20and%20runners.pdf',
    year: '2017'
  },
  {
    category: 'Departmental Sports Meet',
    title: 'Prize Distribution to Cricket winners and runners',
    description: 'Prize Distribution to Cricket winners and runners',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Cricket%20winners%20and%20runners.pdf',
    year: '2017'
  },
  // Departmental Cultural Meet
  {
    category: 'Departmental Cultural Meet',
    title: 'Departmental Cultural Meet-2k17',
    description: 'Departmental Cultural Meet-2k17',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Departmental%20Cultural%20Meet2k17.pdf',
    year: '2017'
  },
  // Industrial Visit
  {
    category: 'Industrial Visit',
    title: 'Industrial Visit On 13th & 14th Dec 18 to RADAR Weather station and PrasaraBharathi Vizag',
    description: 'Industrial Visit On 13th & 14th Dec 18 to RADAR Weather station and PrasaraBharathi Vizag',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit_19.pdf',
    year: '2018'
  },
  {
    category: 'Industrial Visit',
    title: 'Industrial Visit On 18th & 20th Nov 18 to SrihariKota',
    description: 'Industrial Visit On 18th & 20th Nov 18 to SrihariKota',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Industrial%20Visit%20RADAR%20photos.pdf',
    year: '2018'
  },
  {
    category: 'Industrial Visit',
    title: 'Industrial Visit On 6th & 7th Oct 17 to RADAR Weather station and PrasaraBharathi Vizag',
    description: 'Industrial Visit On 6th & 7th Oct 17 to RADAR Weather station and PrasaraBharathi Vizag',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf',
    year: '2017'
  },
  {
    category: 'Industrial Visit',
    title: 'Industrial Visit On 2nd & 3rd Sep 16 to Steel Plant Vizag',
    description: 'Industrial Visit On 2nd & 3rd Sep 16 to Steel Plant Vizag',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit.pdf',
    year: '2016'
  },
  // Blood Donation Camp
  {
    category: 'Blood Donation Camp',
    title: 'Blood Donation Camp',
    description: 'Blood Donation Camp',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Blood%20Donation%20Camp3.pdf',
    year: null
  },
  // YUVA Section
  {
    category: 'YUVA',
    title: 'YUVA Program Overview',
    description: 'There are many people who like to donate things to the poor and needy because they are blessed with every comfort and know that others are struggling. It is everyone\'s courtesy to help poor children who are less fortunate, though. If you are helping someone in their need, then you are doing the right thing by providing them with the essentials. In this world it is a fact that whatever seed you sow, that\'s the sort of fruit you\'ll get. So, if we are ready to help people then we\'ll also get someone to help in our hour of need. Things change with the passage of time, bringing new situations to everyone\'s lives. With this motto the Department of ECE of Sri Vasavi Engineering College has started in "YUVA" Program with the caption of "The Society Needs You" on the occasion of Engineer\'s Day in 2016-17. Under this program students are involving voluntarily and identify the poor and needy people and help them. This program will be carried out once in a semester continuously. In this regard the College Management has encouraged the students by extending their heartful support.',
    url: null,
    year: '2016-17'
  },
  {
    category: 'YUVA',
    title: '2018-2019 2nd Sem',
    description: 'YUVA event for 2018-2019 2nd Sem',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2019.pdf',
    year: '2018-2019'
  },
  {
    category: 'YUVA',
    title: '2017-2018 2nd Sem',
    description: 'YUVA event for 2017-2018 2nd Sem',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2018.pdf',
    year: '2017-2018'
  },
  {
    category: 'YUVA',
    title: '2017-2018 2nd Sem (Additional)',
    description: 'YUVA event for 2017-2018 2nd Sem',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva.pdf',
    year: '2017-2018'
  },
  {
    category: 'YUVA',
    title: '2016-2017 2nd Sem',
    description: 'YUVA event for 2016-2017 2nd Sem',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva%20-2016-17-2nd%20Sem.pdf',
    year: '2016-2017'
  },
  {
    category: 'YUVA',
    title: '2016-2017 2nd Sem (Social Service)',
    description: 'YUVA event for 2016-2017 2nd Sem',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/ece_Social%20Service%20Activities.pdf',
    year: '2016-2017'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTExtracurricularActivities() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_extracurricular_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        year VARCHAR(50),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_extracurricular_activities table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_extracurricular_activities');
    console.log('🗑️ Cleared existing ECT extracurricular activities records');

    // Insert extracurricular activities data
    let successCount = 0;
    let errorCount = 0;

    for (const item of extracurricularActivitiesData) {
      try {
        await connection.execute(
          `INSERT INTO ect_extracurricular_activities (category, title, description, url, year, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
          [item.category, item.title, item.description, item.url, item.year]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} extracurricular activities records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${extracurricularActivitiesData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_extracurricular_activities');
    console.log(`📋 Total extracurricular activities records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTExtracurricularActivities()
    .then(() => {
      console.log('🎉 ECT Extracurricular Activities migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTExtracurricularActivities, extracurricularActivitiesData };
