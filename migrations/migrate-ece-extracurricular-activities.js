const mysql = require('mysql2/promise');

const extracurricularData = [
  // Extracurricular Activities Year Wise
  ...[
    { year: '2022-23', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202022-23.pdf' },
    { year: '2021-22', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf' },
    { year: '2019-20', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities19-20.pdf' },
    { year: '2018-19', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities18-19.pdf' },
    { year: '2017-18', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities17-18.pdf' },
    { year: '2016-17', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities16-17.pdf' },
    { year: '2015-16', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/extra_curricular_activities15-16.pdf' },
  ].map(item => ({
    type: 'yearly_activity',
    label: `Extracurricular activities during the Year ${item.year}`,
    year: item.year,
    url: item.url
  })),

  // Departmental Sports Meet
  ...[
    { label: 'Prize Distribution to Kabaddi winners and runners', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Kabaddi%20winners%20and%20runners.pdf' },
    { label: 'Prize Distribution to Cricket winners and runners', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Prize%20Distribution%20to%20Cricket%20winners%20and%20runners.pdf' },
  ].map(item => ({
    type: 'sports_meet',
    label: item.label,
    year: '2017-18',
    url: item.url
  })),

  // Departmental Cultural Meet
  {
    type: 'cultural_meet',
    label: 'Departmental Cultural Meet-2k17',
    year: '2017-18',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Departmental%20Cultural%20Meet2k17.pdf'
  },

  // Industrial Visits
  ...[
    { label: 'Industrial Visit On 13th & 14th Dec 18 to RADAR Weather station and PrasaraBharathi Vizag', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit_19.pdf', year: '2018-19' },
    { label: 'Industrial Visit On 18th & 20th Nov 18 to SrihariKota', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Industrial%20Visit%20RADAR%20photos.pdf', year: '2018-19' },
    { label: 'Industrial Visit On 6th & 7th Oct 17 to RADAR Weather station and PrasaraBharathi Vizag', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Extracurricular%20activities%20-%202021-22.pdf', year: '2017-18' },
    { label: 'Industrial Visit On 2nd & 3rd Sep 16 to Steel Plant Vizag', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/industrial%20visit.pdf', year: '2016-17' },
  ].map(item => ({
    type: 'industrial_visit',
    label: item.label,
    year: item.year,
    url: item.url
  })),

  // Blood Donation Camp
  {
    type: 'blood_donation_camp',
    label: 'Blood Donation Camp',
    year: null,
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Blood%20Donation%20Camp3.pdf'
  },

  // YUVA Events
  ...[
    { label: '2018-2019 2nd Sem', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2019.pdf', year: '2018-19' },
    { label: '2017-2018 2nd Sem', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva_2018.pdf', year: '2017-18' },
    { label: '2017-2018 2nd Sem', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva.pdf', year: '2017-18' },
    { label: '2016-2017 2nd Sem', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/yuva%20-2016-17-2nd%20Sem.pdf', year: '2016-17' },
    { label: '2016-2017 2nd Sem', url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/ece_Social%20Service%20Activities.pdf', year: '2016-17' },
  ].map(item => ({
    type: 'yuva_event',
    label: item.label,
    year: item.year,
    url: item.url
  })),
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEExtracurricularActivities() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_extracurricular_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(32) NOT NULL,
        label VARCHAR(256) NOT NULL,
        year VARCHAR(16),
        url VARCHAR(512),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_extracurricular_activities table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_extracurricular_activities');
    console.log('🗑️ Cleared existing extracurricular activities records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of extracurricularData) {
      try {
        await connection.execute(
          `INSERT INTO ece_extracurricular_activities (type, label, year, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.type, item.label, item.year || null, item.url]
        );
        console.log(`✅ Inserted: [${item.type}] ${item.label}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting [${item.type}] ${item.label}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${extracurricularData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_extracurricular_activities');
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
  migrateECEExtracurricularActivities()
    .then(() => {
      console.log('🎉 ECE Extracurricular Activities migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEExtracurricularActivities, extracurricularData };