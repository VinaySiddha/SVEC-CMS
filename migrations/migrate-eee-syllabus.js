const mysql = require('mysql2/promise');

async function migrateEEESyllabus() {
  let connection;
  
  try {
    // Database connection
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Check if syllabus_documents table exists
    console.log('\n=== Checking syllabus_documents table ===');
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'syllabus_documents'"
    );

    if (tables.length === 0) {
      console.log('❌ syllabus_documents table does not exist. Creating table...');
      
      // Create the table
      await connection.execute(`
        CREATE TABLE syllabus_documents (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          description TEXT NULL,
          file_url VARCHAR(255) NOT NULL,
          type VARCHAR(50) NOT NULL DEFAULT 'btech',
          academic_year VARCHAR(10) NOT NULL,
          semester VARCHAR(10) NULL,
          regulation VARCHAR(10) NULL,
          department VARCHAR(50) NOT NULL,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          created_by BIGINT UNSIGNED NOT NULL DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted_at DATETIME NULL,
          PRIMARY KEY (id),
          INDEX idx_department (department),
          INDEX idx_type (type),
          INDEX idx_academic_year (academic_year)
        )
      `);
      console.log('✅ syllabus_documents table created successfully');
    } else {
      console.log('✅ syllabus_documents table exists');
    }

    // Check existing EEE syllabus data
    console.log('\n=== Checking existing EEE syllabus data ===');
    const [existingRows] = await connection.execute(
      'SELECT COUNT(*) as count FROM syllabus_documents WHERE dept = ?',
      ['EEE']
    );

    const existingCount = existingRows[0].count;
    console.log(`Found ${existingCount} existing syllabus documents for EEE department`);

    if (existingCount > 0) {
      console.log('⚠️  EEE syllabus documents already exist. Clearing old data...');
      await connection.execute(
        'DELETE FROM syllabus_documents WHERE department = ?',
        ['EEE']
      );
      console.log('✅ Cleared existing EEE syllabus data');
    }

    // EEE Department Syllabus Data
    console.log('\n=== Adding EEE Department Syllabus Documents ===');
    
    const eeeSyllabusData = [
      // V20 Regulation - Current
      {
        title: 'B.Tech EEE I Year I Semester (V20 Regulation)',
        description: 'First year first semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'I',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE I Year II Semester (V20 Regulation)',
        description: 'First year second semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'II',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE II Year I Semester (V20 Regulation)',
        description: 'Second year first semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'III',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE II Year II Semester (V20 Regulation)',
        description: 'Second year second semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'IV',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE III Year I Semester (V20 Regulation)',
        description: 'Third year first semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'V',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE III Year II Semester (V20 Regulation)',
        description: 'Third year second semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'VI',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE IV Year I Semester (V20 Regulation)',
        description: 'Fourth year first semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_I_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'VII',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE IV Year II Semester (V20 Regulation)',
        description: 'Fourth year second semester syllabus for EEE department under V20 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_II_EEE_V20_Syllabus.pdf',
        type: 'btech',
        academic_year: '2024-25',
        semester: 'VIII',
        regulation: 'V20',
        department: 'EEE'
      },
      
      // V18 Regulation - Previous
      {
        title: 'B.Tech EEE I Year I Semester (V18 Regulation)',
        description: 'First year first semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'I',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE I Year II Semester (V18 Regulation)',
        description: 'First year second semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'II',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE II Year I Semester (V18 Regulation)',
        description: 'Second year first semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'III',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE II Year II Semester (V18 Regulation)',
        description: 'Second year second semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'IV',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE III Year I Semester (V18 Regulation)',
        description: 'Third year first semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'V',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE III Year II Semester (V18 Regulation)',
        description: 'Third year second semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'VI',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE IV Year I Semester (V18 Regulation)',
        description: 'Fourth year first semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_I_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'VII',
        regulation: 'V18',
        department: 'EEE'
      },
      {
        title: 'B.Tech EEE IV Year II Semester (V18 Regulation)',
        description: 'Fourth year second semester syllabus for EEE department under V18 regulation',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_II_EEE_V18_Syllabus.pdf',
        type: 'btech',
        academic_year: '2023-24',
        semester: 'VIII',
        regulation: 'V18',
        department: 'EEE'
      },

      // M.Tech Programs
      {
        title: 'M.Tech Power Systems I Semester',
        description: 'Master of Technology in Power Systems first semester syllabus',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PS_I_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'I',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'M.Tech Power Systems II Semester',
        description: 'Master of Technology in Power Systems second semester syllabus',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PS_II_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'II',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'M.Tech Power Electronics I Semester',
        description: 'Master of Technology in Power Electronics first semester syllabus',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PE_I_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'I',
        regulation: 'V20',
        department: 'EEE'
      },
      {
        title: 'M.Tech Power Electronics II Semester',
        description: 'Master of Technology in Power Electronics second semester syllabus',
        file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PE_II_Semester.pdf',
        type: 'mtech',
        academic_year: '2024-25',
        semester: 'II',
        regulation: 'V20',
        department: 'EEE'
      }
    ];

    // Insert syllabus documents
    let successCount = 0;
    let errorCount = 0;

    for (const syllabus of eeeSyllabusData) {
      try {
        await connection.execute(
          `INSERT INTO syllabus_documents 
           (title, description, file_url, type, academic_year, semester, regulation, department, is_active, created_by) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            syllabus.title,
            syllabus.description,
            syllabus.file_url,
            syllabus.type,
            syllabus.academic_year,
            syllabus.semester,
            syllabus.regulation,
            syllabus.department,
            true,
            1 // Default user ID
          ]
        );
        console.log(`✅ Added: ${syllabus.title}`);
        successCount++;
      } catch (insertError) {
        console.error(`❌ Error adding ${syllabus.title}:`, insertError.message);
        errorCount++;
      }
    }

    console.log(`\n=== Migration Summary ===`);
    console.log(`✅ Successfully added: ${successCount} syllabus documents`);
    console.log(`❌ Failed to add: ${errorCount} syllabus documents`);
    console.log(`📚 Total documents for EEE department: ${successCount}`);

    // Verify the data
    console.log('\n=== Verification ===');
    const [finalRows] = await connection.execute(
      'SELECT COUNT(*) as total FROM syllabus_documents WHERE department = ?',
      ['EEE']
    );
    console.log(`✅ Final count of EEE syllabus documents: ${finalRows[0].total}`);

    // Show breakdown by regulation
    const [regulationBreakdown] = await connection.execute(
      'SELECT regulation, type, COUNT(*) as count FROM syllabus_documents WHERE department = ? GROUP BY regulation, type ORDER BY regulation, type',
      ['EEE']
    );
    
    console.log('\n📋 Breakdown by regulation and type:');
    regulationBreakdown.forEach(row => {
      console.log(`   ${row.regulation} ${row.type.toUpperCase()}: ${row.count} documents`);
    });

  } catch (error) {
    console.error('❌ Migration Error:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔒 Database connection closed');
    }
  }
}

console.log('🚀 Starting EEE Syllabus Migration...');
migrateEEESyllabus();