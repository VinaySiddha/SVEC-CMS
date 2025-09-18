// migrate-ece-faculty-innovations.js

const mysql = require('mysql2/promise');

const facultyInnovationsData = [
  {
    category: 'Faculty Innovations in Teaching & Learning',
    title: 'e-Resources',
    description: `Activities of the department towards improvement in teaching-learning are indicated in the office records as well as on college website. They are open for reproduction or for further improvement or for review or critique. Some of the methods adopted by the faculty members in Teaching & Learning are:`,
    items: [
      'Making use of Power Point Presentation, wherever necessary',
      'Technical Videos for demonstration of certain concepts or functioning of the devices.',
      'Usage of Tools like MATLAB, Mentor Graphics etc, to demonstrate concepts, through simulation.',
      'Use of E-Learning Resources like NPTEL lectures, on-line journals and on-line lectures like QEEE & MOOCS for effective learning.',
      'Providing Question bank with short answer questions and quiz questions.',
      'Hands-on practice in the laboratories for better understanding of the concepts taught in the theory classes.',
      'Visits to nearby industries for exposure.',
      'Project exhibitions and poster presentations.',
      'Student seminars.',
      'Z to A Teaching Learning Method'
    ],
    links: []
  },
  {
    category: 'Faculty Innovations in Teaching & Learning',
    title: 'e-Learning',
    description: '',
    items: [
      'E-learning',
      'NPTEL videos'
    ],
    links: [
      {
        label: 'E-learning',
        url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI'
      },
      {
        label: 'NPTEL videos',
        url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI'
      }
    ]
  },
  {
    category: 'Faculty Innovations in Teaching & Learning',
    title: "PPT's",
    description: '',
    items: [
      'Antennas and Wave Propagation',
      'Biomedical Engineering',
      'Antennas and Wave Propagation',
      'Digital Communications',
      'Digital IC Applications',
      'Digital Image Processing',
      'Digital Signal Processing',
      'Micro Processors & Micro Controllers',
      'Optical Communications',
      'Radar Systems',
      'Radar Systems',
      'Satellite Communications',
      'VLSI'
    ],
    links: [
      { label: 'Antennas and Wave Propagation', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Biomedical Engineering', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Antennas and Wave Propagation', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Digital Communications', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Digital IC Applications', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Digital Image Processing', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Digital Signal Processing', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Micro Processors & Micro Controllers', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Optical Communications', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Radar Systems', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Radar Systems', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'Satellite Communications', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' },
      { label: 'VLSI', url: 'https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI' }
    ]
  },
  {
    category: 'Faculty Innovations in Teaching & Learning',
    title: 'Technical Videos',
    description: '',
    items: [
      'Fourier Transform',
      'Circuits and electronics',
      'Signals and Systems',
      'DigitalSignal processing',
      'Electronic circuits',
      'Digital communications'
    ],
    links: [
      { label: 'Fourier Transform', url: 'https://www.youtube.com/watch?v=r18Gi8lSkfM' },
      { label: 'Circuits and electronics', url: 'https://www.youtube.com/watch?v=AfQxyVuLeCs&list=PL9F74AFA03AA06A11' },
      { label: 'Signals and Systems', url: 'https://www.youtube.com/watch?v=KJnAy6hzetw&list=PLLNp7XoiSLQYygYw8Mzt763zZCQdzCZcd' },
      { label: 'DigitalSignal processing', url: 'https://www.youtube.com/watch?v=rkvEM5Y3N60&list=PL8157CA8884571BA2' },
      { label: 'Electronic circuits', url: 'https://www.youtube.com/watch?v=yQDfVJzEymI&list=PL7qUW0KPfsIIOPOKL84wK_Qj9N7gvJX6v' },
      { label: 'Digital communications', url: 'https://www.youtube.com/watch?v=KXFF8m4uGDc&list=PL2AD004D035C24F21' }
    ]
  },
  {
    category: 'Faculty Innovations in Teaching & Learning',
    title: 'Question Banks',
    description: 'R16',
    items: [
      'EDC',
      'Signals and Systems'
    ],
    links: [
      { label: 'EDC', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/EDC.pdf' },
      { label: 'Signals and Systems', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/Signals%20and%20Systems.pdf' }
    ]
  },
  {
    category: 'Faculty Innovations in Teaching & Learning',
    title: 'Question Banks',
    description: 'R13',
    items: [
      'BME',
      'Digital Communication',
      'DSD & Digital IC Applications',
      'Linear Ic Applications',
      'Low Power IC Design',
      'Microprocessor & Microcontrollers',
      'Random Variables & Stochastic Processes',
      'Randar Systems',
      'STLD',
      'VLSI DESIGN'
    ],
    links: [
      { label: 'BME', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/BME.pdf' },
      { label: 'Digital Communication', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/Digital%20Communication.pdf' },
      { label: 'DSD & Digital IC Applications', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/DSD&DICA.pdf' },
      { label: 'Linear Ic Applications', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/LICA%20Unitwise%20QB%20OBE%202016-17%2005-02-2018.pdf' },
      { label: 'Low Power IC Design', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/LPICD.pdf' },
      { label: 'Microprocessor & Microcontrollers', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/MPMC.pdf' },
      { label: 'Random Variables & Stochastic Processes', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/RVSP.pdf' },
      { label: 'Randar Systems', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/RS.pdf' },
      { label: 'STLD', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/STLD.pdf' },
      { label: 'VLSI DESIGN', url: 'https://srivasaviengg.ac.in/uploads/ece/questionbank/VLSI.pdf' }
    ]
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEFacultyInnovations() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_faculty_innovations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        items JSON,
        links JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_faculty_innovations table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_faculty_innovations');
    console.log('🗑️ Cleared existing faculty innovations records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of facultyInnovationsData) {
      try {
        await connection.execute(
          `INSERT INTO ece_faculty_innovations (category, title, description, items, links, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
          [
            item.category,
            item.title,
            item.description,
            JSON.stringify(item.items),
            JSON.stringify(item.links)
          ]
        );
        console.log(`✅ Inserted: ${item.title} (${item.description || ''})`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${facultyInnovationsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_faculty_innovations');
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
  migrateECEFacultyInnovations()
    .then(() => {
      console.log('🎉 ECE Faculty Innovations migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEFacultyInnovations, facultyInnovationsData };