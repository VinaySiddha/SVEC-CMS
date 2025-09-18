// Migration script for Civil Newsletters
// Table: newsletters (id, department, issue, date, url)

const mysql = require('mysql2/promise');

async function migrateNewsletters() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  const newsletters = [
    { issue: 'December 2022', date: '2022-12-01', url: 'https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202022.pdf' },
    { issue: 'June 2022', date: '2022-06-01', url: 'https://srivasaviengg.ac.in/uploads/civil/JUNE%202022.pdf' },
    { issue: 'December 2021', date: '2021-12-01', url: 'https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202021.pdf' },
    { issue: 'June 2021', date: '2021-06-01', url: 'https://srivasaviengg.ac.in/uploads/civil/JUNE%202021.pdf' },
    { issue: 'December 2020', date: '2020-12-01', url: 'https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202020.pdf' },
    { issue: 'June 2020', date: '2020-06-01', url: 'https://srivasaviengg.ac.in/uploads/civil/JUNE%202020.pdf' },
    { issue: 'December 2019', date: '2019-12-01', url: 'https://srivasaviengg.ac.in/uploads/civil/DECEMBER%202019.pdf' },
    { issue: 'June 2019', date: '2019-06-01', url: 'https://srivasaviengg.ac.in/uploads/civil/JUNE%202019.pdf' }
  ];

  for (const n of newsletters) {
    await connection.execute(
      `INSERT INTO civil_newsletters (department, issue, date, url) VALUES (?, ?, ?, ?)`,
      ['Civil', n.issue, n.date, n.url]
    );
  }

  await connection.end();
  console.log('Newsletters data migrated successfully.');
}

migrateNewsletters();
