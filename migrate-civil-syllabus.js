// Migration script for Civil Syllabus
// Table: syllabus (id, department, program, version, name, url)

const mysql = require('mysql2/promise');

async function migrateSyllabus() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  const syllabus = [
    { program: 'B.Tech', version: 'V20', name: 'B.Tech - V20 Syllabus', url: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V20%20B.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf' },
    { program: 'B.Tech', version: 'V18', name: 'B.Tech - V18 Syllabus', url: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V18%20B.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf' },
    { program: 'M.Tech(CS)', version: 'V21', name: 'M.Tech - V21 Syllabus', url: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V21%20M.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf' },
    { program: 'M.Tech(CS)', version: 'V18', name: 'M.Tech - V18 Syllabus', url: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V18%20M.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf' }
  ];

  for (const s of syllabus) {
    await connection.execute(
      `INSERT INTO civil_syllabus (department, program, version, name, url) VALUES (?, ?, ?, ?, ?)`,
      ['Civil', s.program, s.version, s.name, s.url]
    );
  }

  await connection.end();
  console.log('Syllabus data migrated successfully.');
}

migrateSyllabus();
