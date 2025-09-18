const mysql = require('mysql2/promise');

async function checkAndPopulateSyllabus() {
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'svec_cms_user',
      password: 'C0ll3g3_U$3r_2024!',
      database: 'svec_cms'
    });

    console.log('Connected to database successfully!');

    // Check if table exists
    console.log('\n=== Checking syllabus_documents table ===');
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'syllabus_documents'"
    );
    
    if (tables.length === 0) {
      console.log('❌ syllabus_documents table does not exist');
    } else {
      console.log('✅ syllabus_documents table exists');
      
      // Check current data for EEE
      const [rows] = await connection.execute(
        'SELECT * FROM syllabus_documents WHERE department = ?', 
        ['EEE']
      );
      
      console.log(`Found ${rows.length} syllabus documents for EEE department:`);
      
      if (rows.length > 0) {
        rows.forEach((row, index) => {
          console.log(`${index + 1}. ${row.title} (${row.academic_year}, ${row.semester || 'N/A'})`);
        });
      } else {
        console.log('No syllabus documents found for EEE department');
        console.log('\n=== Adding sample syllabus documents for EEE ===');
        
        const syllabusData = [
          {
            title: 'B.Tech EEE I Year I Semester Syllabus',
            description: 'First year first semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I-I_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'I',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE I Year II Semester Syllabus',
            description: 'First year second semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I-II_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'II',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE II Year I Semester Syllabus',
            description: 'Second year first semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II-I_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'III',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE II Year II Semester Syllabus',
            description: 'Second year second semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II-II_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'IV',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE III Year I Semester Syllabus',
            description: 'Third year first semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III-I_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'V',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE III Year II Semester Syllabus',
            description: 'Third year second semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III-II_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'VI',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE IV Year I Semester Syllabus',
            description: 'Fourth year first semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV-I_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'VII',
            regulation: 'V20',
            department: 'EEE'
          },
          {
            title: 'B.Tech EEE IV Year II Semester Syllabus',
            description: 'Fourth year second semester syllabus for EEE department',
            file_url: 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV-II_EEE_Syllabus.pdf',
            type: 'btech',
            academic_year: '2024-25',
            semester: 'VIII',
            regulation: 'V20',
            department: 'EEE'
          }
        ];

        for (const syllabus of syllabusData) {
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
          } catch (insertError) {
            console.error(`❌ Error adding ${syllabus.title}:`, insertError.message);
          }
        }
        
        console.log(`\n✅ Successfully added ${syllabusData.length} syllabus documents for EEE department`);
      }
    }

    await connection.end();
    console.log('\n=== Database connection closed ===');

  } catch (error) {
    console.error('❌ Database Error:', error.message);
    process.exit(1);
  }
}

checkAndPopulateSyllabus();