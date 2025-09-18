const mysql = require('mysql2/promise');

async function migrateEEESyllabus() {
  let connection;
  
  try {
    // Database connection with correct credentials
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Check existing EEE syllabus data
    console.log('\n=== Checking existing EEE syllabus data ===');
    const [existingRows] = await connection.execute(
      'SELECT COUNT(*) as count FROM syllabus_documents WHERE dept = ?',
      ['EEE']
    );
    
    const existingCount = existingRows[0].count;
    console.log(`Found ${existingCount} existing syllabus documents for EEE department`);

    if (existingCount > 0) {
      console.log('Clearing existing EEE syllabus data...');
      await connection.execute(
        'DELETE FROM syllabus_documents WHERE dept = ?',
        ['EEE']
      );
      console.log('✅ Cleared existing data');
    }

    // EEE Department Syllabus Data
    console.log('\n=== Adding EEE Department Syllabus Documents ===');
    
    const syllabusData = [
      // V20 Regulation - Current Academic Year 2024-25
      {
        title: 'B.Tech EEE I Year I Semester (V20 Regulation)',
        description: 'First year first semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'I',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE I Year II Semester (V20 Regulation)',
        description: 'First year second semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'II',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE II Year I Semester (V20 Regulation)',
        description: 'Second year first semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'III',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE II Year II Semester (V20 Regulation)',
        description: 'Second year second semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'IV',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE III Year I Semester (V20 Regulation)',
        description: 'Third year first semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'V',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE III Year II Semester (V20 Regulation)',
        description: 'Third year second semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'VI',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE IV Year I Semester (V20 Regulation)',
        description: 'Fourth year first semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'VII',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE IV Year II Semester (V20 Regulation)',
        description: 'Fourth year second semester syllabus for EEE department under V20 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'VIII',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      // V18 Regulation - Previous Academic Year 2023-24
      {
        title: 'B.Tech EEE I Year I Semester (V18 Regulation)',
        description: 'First year first semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'I',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE I Year II Semester (V18 Regulation)',
        description: 'First year second semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'II',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE II Year I Semester (V18 Regulation)',
        description: 'Second year first semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'III',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE II Year II Semester (V18 Regulation)',
        description: 'Second year second semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'IV',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE III Year I Semester (V18 Regulation)',
        description: 'Third year first semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'V',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE III Year II Semester (V18 Regulation)',
        description: 'Third year second semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'VI',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE IV Year I Semester (V18 Regulation)',
        description: 'Fourth year first semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'VII',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'B.Tech EEE IV Year II Semester (V18 Regulation)',
        description: 'Fourth year second semester syllabus for EEE department under V18 regulation',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'VIII',
        regulation: 'V18',
        dept: 'EEE',
        status: 'approved'
      },
      // M.Tech Programs
      {
        title: 'M.Tech Power Systems I Semester',
        description: 'Master of Technology in Power Systems first semester syllabus',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PS_I_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'I',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'M.Tech Power Systems II Semester',
        description: 'Master of Technology in Power Systems second semester syllabus',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PS_II_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'II',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'M.Tech Power Electronics I Semester',
        description: 'Master of Technology in Power Electronics first semester syllabus',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PE_I_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'I',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      },
      {
        title: 'M.Tech Power Electronics II Semester',
        description: 'Master of Technology in Power Electronics second semester syllabus',
        document_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PE_II_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'II',
        regulation: 'V20',
        dept: 'EEE',
        status: 'approved'
      }
    ];

    // Insert all syllabus documents
    let insertedCount = 0;
    for (const syllabus of syllabusData) {
      try {
        await connection.execute(
          `INSERT INTO syllabus_documents 
           (title, description, document_url, type, academic_year, semester, regulation, dept, status) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            syllabus.title,
            syllabus.description,
            syllabus.document_url,
            syllabus.type,
            syllabus.academic_year,
            syllabus.semester,
            syllabus.regulation,
            syllabus.dept,
            syllabus.status
          ]
        );
        insertedCount++;
        console.log(`✅ Inserted: ${syllabus.title}`);
      } catch (error) {
        console.log(`❌ Failed to insert: ${syllabus.title}`);
        console.log(`Error: ${error.message}`);
      }
    }

    // Verify insertion
    console.log('\n=== Verification ===');
    const [finalRows] = await connection.execute(
      'SELECT COUNT(*) as count FROM syllabus_documents WHERE dept = ?',
      ['EEE']
    );
    
    const finalCount = finalRows[0].count;
    console.log(`✅ Total EEE syllabus documents in database: ${finalCount}`);
    
    if (finalCount === syllabusData.length) {
      console.log('🎉 Migration completed successfully!');
      console.log('\n=== Summary ===');
      console.log(`- Total documents inserted: ${insertedCount}`);
      console.log('- V20 B.Tech documents: 8');
      console.log('- V18 B.Tech documents: 8');
      console.log('- M.Tech documents: 4');
      console.log('\nYour EEE department page will now display the syllabus section with all documents.');
    } else {
      console.log(`⚠️ Warning: Expected ${syllabusData.length} documents but found ${finalCount}`);
    }

  } catch (error) {
    console.error('❌ Migration Error:', error.message);
    console.error('Stack trace:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔐 Database connection closed');
    }
  }
}

// Run the migration
console.log('🚀 Starting EEE Syllabus Migration...');
migrateEEESyllabus();