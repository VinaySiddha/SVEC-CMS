// Migration script for Civil Technical Association
// Table: technical_association (id, department, description, committee, images)

const mysql = require('mysql2/promise');

async function migrateTechnicalAssociation() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  const data = {
    department: 'Civil',
    description: 'INSTITUTION OF ENGINEERING (INDIA) students\' chapter opened in 2017 with 117 student members. Promotes co-operation amongst students and faculty for advancement and dissemination of knowledge in Civil Engineering.',
    committee: [
      'K.J.Ganapathi',
      'N.G.Lokesh',
      'T.Teja',
      'Y.Harika'
    ],
    images: [
      '/images/departments/ce/civil_ie_img2.jpg',
      '/images/departments/ce/civil_ie_img3.jpg'
    ]
  };

  await connection.execute(
    `INSERT INTO civil_technical_association (department, description, committee, images) VALUES (?, ?, ?, ?)`,
    [
      data.department,
      data.description,
      JSON.stringify(data.committee),
      JSON.stringify(data.images)
    ]
  );

  await connection.end();
  console.log('Technical Association data migrated successfully.');
}

migrateTechnicalAssociation();
