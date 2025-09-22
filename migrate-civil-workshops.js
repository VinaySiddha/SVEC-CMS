const mysql = require('mysql2/promise');
require('dotenv').config();

// Civil Workshops Data
const workshops = [
  { department: 'civil', year: '2023-2024', name: 'Workshops organized during the Academic Year 2023-2024', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202023-24.pdf' },
  { department: 'civil', year: '2022-2023', name: 'Workshops organized during the Academic Year 2022-2023', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202022-2023.pdf' },
  { department: 'civil', year: '2021-2022', name: 'Workshops organized during the Academic Year 2021-2022', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202021-2022.pdf' },
  { department: 'civil', year: '2019-2020', name: 'Workshops organized during the Academic Year 2019-2020', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202019-2020.pdf' },
  { department: 'civil', year: '2018-2019', name: 'Workshops organized during the Academic Year 2018-2019', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202018-2019.pdf' },
  { department: 'civil', year: '2017-2018', name: 'Workshops organized during the Academic Year 2017-2018', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202017-2018.pdf' },
  { department: 'civil', year: '2016-2017', name: 'Workshops organized during the Academic Year 2016-2017', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202016-2017.pdf' },
  { department: 'civil', year: '2015-2016', name: 'Workshops organized during the Academic Year 2015-2016', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202015-2016.pdf' },
  { department: 'civil', year: '2014-2015', name: 'Workshops organized during the Academic Year 2014-2015', url: 'https://srivasaviengg.ac.in/uploads/civil/workshops%20organized%20during%20the%20Academic%20Year%202014-2015.pdf' }
];

async function migrateCivilWorkshops() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });
    console.log('Connected to MySQL database');

    // Clear existing Civil workshops data
    await connection.execute('DELETE FROM civil_workshops WHERE department = ?', ['civil']);
    console.log('Cleared existing Civil workshops data');

    // Insert new workshops
    for (const workshop of workshops) {
      await connection.execute(
        'INSERT INTO civil_workshops (department, year, name, url) VALUES (?, ?, ?, ?)',
        [workshop.department, workshop.year, workshop.name, workshop.url]
      );
      console.log(`Inserted: ${workshop.name}`);
    }

    // Get count
    const [result] = await connection.execute('SELECT COUNT(*) as count FROM civil_workshops WHERE department = ?', ['civil']);
    console.log(`Total Civil workshops migrated: ${result[0].count}`);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

migrateCivilWorkshops();
