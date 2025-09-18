const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

// Board of Studies Members data for EEE
const bosMembers = [
  {
    member_name: 'Dr.Sudha Rani Donepudi',
    designation: 'Professor & HOD',
    organization: 'Dept of EEE,SVEC',
    role: 'Chairperson',
    year: '2024'
  },
  {
    member_name: 'Dr. R. SrinivasaRao',
    designation: 'Professor of EEE',
    organization: 'Dept. of EEE, UCEK, JNTUK, Kakinada',
    role: 'Subject Expert Nominated By V.C.',
    year: '2024'
  },
  {
    member_name: 'Dr. M. Sydulu',
    designation: 'Professor of EEE',
    organization: 'Dept. of EE, NITW, Warangal',
    role: 'Subject Expert Nominated By A.C.',
    year: '2024'
  },
  {
    member_name: 'Dr. Y.P. Obulesu',
    designation: 'Professor of EEE',
    organization: 'School of EE, VIT, Vellore',
    role: 'Subject Expert Nominated By A.C.',
    year: '2024'
  },
  {
    member_name: 'Er. B.N.V.R.C. Suresh Kumar',
    designation: 'Retired AGM',
    organization: 'PGCI, Hyderabad',
    role: 'Industry Expert Nominated By A.C',
    year: '2024'
  },
  {
    member_name: 'Er. Narayana Murty Vella',
    designation: 'Engineer',
    organization: 'PGCI, Vijayawada',
    role: 'Alumni',
    year: '2024'
  }
];

// Meeting Minutes data for EEE
const meetingMinutes = [
  {
    meeting_title: 'Minutes of 7th meeting of the Board of Studies',
    meeting_number: 7,
    meeting_date: '2024-01-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/eee/7th Meeting of BOS, Dept. of EEE, SVEC_Minutes.pdf',
    academic_year: '2023-24'
  },
  {
    meeting_title: 'Minutes of 6th meeting of the Board of Studies',
    meeting_number: 6,
    meeting_date: '2023-08-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20sixth%20BOS%20Meeting.pdf',
    academic_year: '2023-24'
  },
  {
    meeting_title: 'Minutes of 5th meeting of the Board of Studies',
    meeting_number: 5,
    meeting_date: '2023-02-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Fifth%20BOS%20Meeting.pdf',
    academic_year: '2022-23'
  },
  {
    meeting_title: 'Minutes of 4th meeting of the Board of Studies',
    meeting_number: 4,
    meeting_date: '2022-08-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Fourth%20BOS%20Meeting.pdf',
    academic_year: '2022-23'
  },
  {
    meeting_title: 'Minutes of 3rd meeting of the Board of Studies',
    meeting_number: 3,
    meeting_date: '2022-02-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Third%20BOS%20Meeting.pdf',
    academic_year: '2021-22'
  },
  {
    meeting_title: 'Minutes of 2nd meeting of the Board of Studies',
    meeting_number: 2,
    meeting_date: '2021-08-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20Second%20BOS%20Meeting.pdf',
    academic_year: '2021-22'
  },
  {
    meeting_title: 'Minutes of 1st meeting of the Board of Studies',
    meeting_number: 1,
    meeting_date: '2021-02-15',
    document_url: 'https://srivasaviengg.ac.in/uploads/EEE_Minutes%20of%20First%20BOS%20Meeting.pdf',
    academic_year: '2020-21'
  }
];

async function createMeetingMinutesTable(connection) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bos_meeting_minutes (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      dept VARCHAR(32) NOT NULL,
      meeting_title VARCHAR(255) NOT NULL,
      meeting_number INT NOT NULL,
      meeting_date DATE NOT NULL,
      document_url VARCHAR(500) NOT NULL,
      academic_year VARCHAR(10) NOT NULL,
      description TEXT NULL,
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at DATETIME NULL,
      PRIMARY KEY (id),
      INDEX idx_dept (dept ASC),
      INDEX idx_status (status ASC),
      INDEX idx_academic_year (academic_year ASC)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  
  await connection.execute(createTableQuery);
  console.log('✅ BOS Meeting Minutes table created/verified successfully');
}

async function migrateBoardOfStudies() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');
    
    // Create meeting minutes table if it doesn't exist
    await createMeetingMinutesTable(connection);
    
    // Clear existing EEE board of studies data
    await connection.execute('DELETE FROM board_of_studies WHERE dept = ?', ['eee']);
    await connection.execute('DELETE FROM bos_meeting_minutes WHERE dept = ?', ['eee']);
    console.log('🗑️ Cleared existing EEE Board of Studies data');
    
    // Insert Board of Studies members
    console.log('📝 Inserting Board of Studies members...');
    for (const member of bosMembers) {
      const insertQuery = `
        INSERT INTO board_of_studies 
        (dept, member_name, designation, organization, role, year, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'approved')
      `;
      
      await connection.execute(insertQuery, [
        'eee',
        member.member_name,
        member.designation,
        member.organization,
        member.role,
        member.year
      ]);
      
      console.log(`  ✅ Added member: ${member.member_name}`);
    }
    
    // Insert Meeting Minutes
    console.log('📝 Inserting Meeting Minutes...');
    for (const minute of meetingMinutes) {
      const insertQuery = `
        INSERT INTO bos_meeting_minutes 
        (dept, meeting_title, meeting_number, meeting_date, document_url, academic_year, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'active')
      `;
      
      await connection.execute(insertQuery, [
        'eee',
        minute.meeting_title,
        minute.meeting_number,
        minute.meeting_date,
        minute.document_url,
        minute.academic_year
      ]);
      
      console.log(`  ✅ Added meeting minute: ${minute.meeting_title}`);
    }
    
    // Verify the data
    const [membersResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM board_of_studies WHERE dept = ?', 
      ['eee']
    );
    
    const [minutesResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM bos_meeting_minutes WHERE dept = ?', 
      ['eee']
    );
    
    console.log('🎉 Migration completed successfully!');
    console.log(`📊 Total Board of Studies members migrated: ${membersResult[0].count}`);
    console.log(`📊 Total Meeting Minutes migrated: ${minutesResult[0].count}`);
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the migration
migrateBoardOfStudies()
  .then(() => {
    console.log('✅ EEE Board of Studies migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });