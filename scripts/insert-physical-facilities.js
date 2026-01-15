const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
};

(async () => {
  try {
    const conn = await mysql.createConnection(config);
    
    // Insert sample physical facilities data
    const samples = [
      {
        dept: 'cse-ai',
        category: 'Laboratories',
        title: 'Computer Lab 1',
        description: 'Advanced computing lab with 25 systems',
        file_url: '/uploads/physical-facilities/lab1.pdf',
        lab_details: JSON.stringify([
          {
            name: 'Linus Torvalds Lab',
            model: 'Dell OptiPlex 7090',
            processor: 'Intel i7-10700',
            ram: '16GB DDR4',
            storage: '512GB SSD',
            systems: '25'
          }
        ])
      },
      {
        dept: 'cse-ai',
        category: 'Classrooms',
        title: 'Smart Class A1',
        description: 'Air-conditioned classroom with projector and whiteboard',
        file_url: null,
        lab_details: null
      },
      {
        dept: 'cse-ai',
        category: 'Facilities',
        title: 'Library',
        description: 'Department library with 500+ books and journals',
        file_url: null,
        lab_details: null
      },
      {
        dept: 'cse-ai',
        category: 'Facilities',
        title: 'Seminar Hall',
        description: 'Equipped with audio-visual systems for presentations',
        file_url: null,
        lab_details: null
      }
    ];
    
    console.log('📝 Inserting sample physical facilities data...');
    
    for (const sample of samples) {
      await conn.execute(
        'INSERT INTO cai_physical_facilities (dept, category, title, description, file_url, lab_details) VALUES (?, ?, ?, ?, ?, ?)',
        [sample.dept, sample.category, sample.title, sample.description, sample.file_url, sample.lab_details]
      );
      console.log(`✅ Inserted: [${sample.category}] ${sample.title}`);
    }
    
    // Verify
    const [rows] = await conn.query(
      "SELECT COUNT(*) as total FROM cai_physical_facilities WHERE dept = 'cse-ai'"
    );
    
    console.log(`\n✅ Total physical facilities added: ${rows[0].total}`);
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
