const mysql = require('mysql2/promise');

const facultyInnovationsData = [
  {
    section: 'Faculty Innovations in Teaching & Learning',
    subsection: 'Faculty Innovations in Teaching & Learning',
    type: 'main_content',
    title: 'e-Resources',
    content: 'Activities of the department towards improvement in teaching-learning are indicated in the office records as well as on college website. They are open for reproduction or for further improvement or for review or critique.',
    description: 'Some of the methods adopted by the faculty members in Teaching & Learning are:',
    list_items: [
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
    url: null
  },
  {
    section: 'Faculty Innovations in Teaching & Learning',
    subsection: 'e-Learning',
    type: 'links',
    title: null,
    content: null,
    description: null,
    list_items: [
      'E-learning - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'NPTEL videos - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI'
    ],
    url: null
  },
  {
    section: 'Faculty Innovations in Teaching & Learning',
    subsection: 'PPT\'s',
    type: 'course_links',
    title: null,
    content: null,
    description: null,
    list_items: [
      'Antennas and Wave Propagation - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Biomedical Engineering - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Digital Communications - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Digital IC Applications - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Digital Image Processing - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Digital Signal Processing - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Micro Processors & Micro Controllers - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Optical Communications - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Radar Systems - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'Satellite Communications - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI',
      'VLSI - https://www.youtube.com/watch?v=SuTEQgu6z2Y&list=PLtcbU5SnE9UK1zuYYAqvTD9pO3Dw-pjMI'
    ],
    url: null
  },
  {
    section: 'Faculty Innovations in Teaching & Learning',
    subsection: 'Technical Videos',
    type: 'video_links',
    title: null,
    content: null,
    description: null,
    list_items: [
      'Fourier Transform - https://www.youtube.com/watch?v=r18Gi8lSkfM',
      'Circuits and electronics - https://www.youtube.com/watch?v=AfQxyVuLeCs&list=PL9F74AFA03AA06A11',
      'Signals and Systems - https://www.youtube.com/watch?v=KJnAy6hzetw&list=PLLNp7XoiSLQYygYw8Mzt763zZCQdzCZcd',
      'Digital Signal processing - https://www.youtube.com/watch?v=rkvEM5Y3N60&list=PL8157CA8884571BA2',
      'Electronic circuits - https://www.youtube.com/watch?v=yQDfVJzEymI&list=PL7qUW0KPfsIIOPOKL84wK_Qj9N7gvJX6v',
      'Digital communications - https://www.youtube.com/watch?v=KXFF8m4uGDc&list=PL2AD004D035C24F21'
    ],
    url: null
  },
  {
    section: 'Faculty Innovations in Teaching & Learning',
    subsection: 'Question Banks',
    type: 'question_banks',
    title: 'R16',
    content: null,
    description: null,
    list_items: [
      'EDC - https://srivasaviengg.ac.in/uploads/ece/questionbank/EDC.pdf',
      'Signals and Systems - https://srivasaviengg.ac.in/uploads/ece/questionbank/Signals%20and%20Systems.pdf'
    ],
    url: null
  },
  {
    section: 'Faculty Innovations in Teaching & Learning',
    subsection: 'Question Banks',
    type: 'question_banks',
    title: 'R13',
    content: null,
    description: null,
    list_items: [
      'BME - https://srivasaviengg.ac.in/uploads/ece/questionbank/BME.pdf',
      'Digital Communication - https://srivasaviengg.ac.in/uploads/ece/questionbank/Digital%20Communication.pdf',
      'DSD & Digital IC Applications - https://srivasaviengg.ac.in/uploads/ece/questionbank/DSD&DICA.pdf',
      'Linear Ic Applications - https://srivasaviengg.ac.in/uploads/ece/questionbank/LICA%20Unitwise%20QB%20OBE%202016-17%2005-02-2018.pdf',
      'Low Power IC Design - https://srivasaviengg.ac.in/uploads/ece/questionbank/LPICD.pdf',
      'Microprocessor & Microcontrollers - https://srivasaviengg.ac.in/uploads/ece/questionbank/MPMC.pdf',
      'Random Variables & Stochastic Processes - https://srivasaviengg.ac.in/uploads/ece/questionbank/RVSP.pdf',
      'Radar Systems - https://srivasaviengg.ac.in/uploads/ece/questionbank/RS.pdf',
      'STLD - https://srivasaviengg.ac.in/uploads/ece/questionbank/STLD.pdf',
      'VLSI DESIGN - https://srivasaviengg.ac.in/uploads/ece/questionbank/VLSI.pdf'
    ],
    url: null
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTFacultyInnovations() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_facultyinnovations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(255) NOT NULL,
        subsection VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255),
        content TEXT,
        description TEXT,
        list_items JSON,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_facultyinnovations table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_facultyinnovations');
    console.log('🗑️ Cleared existing ECT faculty innovations records');

    // Insert faculty innovations data
    let successCount = 0;
    let errorCount = 0;

    for (const item of facultyInnovationsData) {
      try {
        await connection.execute(
          `INSERT INTO ect_facultyinnovations (section, subsection, type, title, content, description, list_items, url, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            item.section,
            item.subsection,
            item.type,
            item.title,
            item.content,
            item.description,
            JSON.stringify(item.list_items),
            item.url
          ]
        );
        console.log(`✅ Inserted: ${item.subsection} - ${item.type}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.subsection}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} faculty innovation records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${facultyInnovationsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_facultyinnovations');
    console.log(`📋 Total faculty innovation records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTFacultyInnovations()
    .then(() => {
      console.log('🎉 ECT Faculty Innovations migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTFacultyInnovations, facultyInnovationsData };
