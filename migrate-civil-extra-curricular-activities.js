// Migration script for Civil Extra-Curricular Activities
// Table: extra_curricular_activities (id, department, year, name, url)

const mysql = require('mysql2/promise');

async function migrateExtraCurricularActivities() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  const activities = [
    { year: '2018-19', name: 'Extracurricular activities', url: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/Extra_curricular_activities.pdf' },
    { year: '2017-18', name: 'Engineers Day', url: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/ENGINEERS%20DAY(2017-2018).pdf' }
  ];

  for (const a of activities) {
    await connection.execute(
      `INSERT INTO civil_extra_curricular_activities (department, year, name, url) VALUES (?, ?, ?, ?)`,
      ['Civil', a.year, a.name, a.url]
    );
  }

  await connection.end();
  console.log('Extra-Curricular Activities data migrated successfully.');
}

migrateExtraCurricularActivities();
