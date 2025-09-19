const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

const mechSyllabusData = [
  {
    program: 'B.Tech',
    version: 'V23',
    name: 'B.Tech - V23 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/V23_B.Tech.III&IV_Syllabus.pdf'
  },
  {
    program: 'B.Tech',
    version: 'V20',
    name: 'B.Tech - V20 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/V20_Course_Structure&Syllabus.pdf'
  },
  {
    program: 'B.Tech',
    version: 'V18',
    name: 'B.Tech - V18 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/V18_Course_Structure&Syllabus.pdf'
  },
  {
    program: 'M.Tech',
    version: 'V21',
    name: 'M.Tech - V21 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/V21_M.Tech._TE_Course_Structure&Syllabus.pdf'
  },
  {
    program: 'M.Tech',
    version: 'V18',
    name: 'M.Tech - V18 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/M.Tech.Machine%20Design_Course%20structure&Syllabi_V18.pdf'
  }
];

async function migrateMechSyllabus() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    // Create table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS mech_syllabus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program VARCHAR(50) NOT NULL,
        version VARCHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    console.log('Table mech_syllabus created or already exists.');

    // Insert data
    const insertQuery = `
      INSERT INTO mech_syllabus (program, version, name, url)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        program = VALUES(program),
        version = VALUES(version),
        name = VALUES(name),
        url = VALUES(url)
    `;

    for (const syllabus of mechSyllabusData) {
      await connection.execute(insertQuery, [
        syllabus.program,
        syllabus.version,
        syllabus.name,
        syllabus.url
      ]);
    }

    console.log('Mech syllabus data migrated successfully.');

  } catch (error) {
    console.error('Error migrating mech syllabus data:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the migration
migrateMechSyllabus();
