const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

const ectSyllabusData = [
  {
    program: 'B.Tech',
    version: 'V23',
    name: 'B.Tech - V23 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/ECE B.Tech- V23 Syllabus.pdf'
  },
  {
    program: 'B.Tech',
    version: 'V20',
    name: 'B.Tech V20 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V%2020%20-%20Reg)%20syllabus.pdf'
  },
  {
    program: 'B.Tech',
    version: 'V18',
    name: 'B.Tech V18 Syllabus',
    url: 'https://srivasaviengg.ac.in/uploads/syllabus/B.%20Tech%20ECE%20-Autonomous%20(V18-%20Reg)%20Syllabus.pdf'
  },
  {
    program: 'SOC',
    version: '2023-24',
    name: 'SOC Syllabus during the Academic Year 2023-24',
    url: 'https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2023-24.pdf'
  },
  {
    program: 'SOC',
    version: '2022-23',
    name: 'SOC Syllabus during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2022-23.pdf'
  },
  {
    program: 'SOC',
    version: '2021-22',
    name: 'SOC Syllabus during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/SOC_ECE_2021-22.pdf'
  }
];

async function migrateEctSyllabus() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    // Create table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ect_syllabus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program VARCHAR(50) NOT NULL,
        version VARCHAR(10) NOT NULL,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    console.log('Table ect_syllabus created or already exists.');

    // Insert data
    const insertQuery = `
      INSERT INTO ect_syllabus (program, version, name, url)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        program = VALUES(program),
        version = VALUES(version),
        name = VALUES(name),
        url = VALUES(url)
    `;

    for (const syllabus of ectSyllabusData) {
      await connection.execute(insertQuery, [
        syllabus.program,
        syllabus.version,
        syllabus.name,
        syllabus.url
      ]);
    }

    console.log('ECT syllabus data migrated successfully.');

  } catch (error) {
    console.error('Error migrating ECT syllabus data:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the migration
migrateEctSyllabus();
