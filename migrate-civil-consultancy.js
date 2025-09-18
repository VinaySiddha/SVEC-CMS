// Migration script for Civil Consultancy
// Table: consultancy (id, department, year, name, url)

const mysql = require('mysql2/promise');

async function migrateConsultancy() {
  const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  const consultancy = [
    { year: '2022-2023', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202022-2023.pdf' },
    { year: '2021-2022', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202021-2022.pdf' },
    { year: '2020-2021', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202020-2021.pdf' },
    { year: '2019-2020', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202019-2020.pdf' },
    { year: '2018-2019', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202018-2019.pdf' },
    { year: '2017-2018', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202017-2018.pdf' },
    { year: '2016-2017', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202016-2017.pdf' },
    { year: '2015-2016', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202015-2016.pdf' },
    { year: '2014-2015', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202014-2015.pdf' },
    { year: '2013-2014', name: 'Consultancy Details', url: 'https://srivasaviengg.ac.in/uploads/civil/Consultancy%20Details%20for%20the%20Academic%20year%202013-2014.pdf' }
  ];

  for (const c of consultancy) {
    await connection.execute(
      `INSERT INTO civil_consultancy (department, year, name, url) VALUES (?, ?, ?, ?)`,
      ['Civil', c.year, c.name, c.url]
    );
  }

  await connection.end();
  console.log('Consultancy data migrated successfully.');
}

migrateConsultancy();
