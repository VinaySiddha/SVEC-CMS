const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

// Board of Studies Members data for ME
const bosMembers = [
  {
    member_name: 'Dr.M.V.Ramesh',
    designation: 'Professor & HOD',
    organization: 'Dept.of ME, SVEC',
    role: 'Chairperson',
    year: '2025'
  },
  {
    member_name: 'Dr.N.MohanaRao',
    designation: 'Professor & Director (IIIPT & SDC)',
    organization: 'Dept.of ME,JNTUK, Kakinada',
    role: 'University Nominee',
    year: '2025'
  },
  {
    member_name: 'Dr.R.V.Chalam',
    designation: 'Professor',
    organization: 'Dept.of ME,NIT,Warangal',
    role: 'Academic Expert',
    year: '2025'
  },
  {
    member_name: 'Dr.A.Krishnaiahh',
    designation: 'Professor',
    organization: '',
    role: 'Academic Expert',
    year: '2025'
  },
  {
    member_name: 'Sri S.S.Subrahmanya Sastry',
    designation: 'Head of Parctice QMS',
    organization: 'Veave Technologies Bangalore,India',
    role: 'Industry Expert',
    year: '2025'
  },
  {
    member_name: 'Mr.A.Sai Krishna',
    designation: 'CAE Engineer',
    organization: '',
    role: 'Alumni',
    year: '2025'
  }
];

// Meeting Minutes data for ME
const meetingMinutes = [
  {
    meeting_title: 'Minutes of 7th meeting of the Board of Studies',
    meeting_number: 7,
    meeting_date: '2025-07-19',
    document_url: 'https://srivasaviengg.ac.in/uploads/mech/7th BOS MOM of ME Dept.pdf',
    academic_year: '2024-25'
  },
  {
    meeting_title: 'Minutes of 6th meeting of the Board of Studies',
    meeting_number: 6,
    meeting_date: '2024-07-16',
    document_url: '#',
    academic_year: '2023-24'
  },
  {
    meeting_title: 'Minutes of 5th meeting of the Board of Studies',
    meeting_number: 5,
    meeting_date: '2023-10-05',
    document_url: '#',
    academic_year: '2023-24'
  },
  {
    meeting_title: 'Minutes of 4th meeting of the Board of Studies',
    meeting_number: 4,
    meeting_date: '2022-07-25',
    document_url: '#',
    academic_year: '2022-23'
  },
  {
    meeting_title: 'Minutes of 3rd meeting of the Board of Studies',
    meeting_number: 3,
    meeting_date: '2021-09-03',
    document_url: '#',
    academic_year: '2021-22'
  },
  {
    meeting_title: 'Minutes of 2nd meeting of the Board of Studies',
    meeting_number: 2,
    meeting_date: '2020-12-28',
    document_url: '#',
    academic_year: '2020-21'
  },
  {
    meeting_title: 'Minutes of 1st meeting of the Board of Studies',
    meeting_number: 1,
    meeting_date: '2020-06-10',
    document_url: '#',
    academic_year: '2019-20'
  }
];

async function createBoardOfStudiesTable(connection) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS board_of_studies (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      dept VARCHAR(32) NOT NULL,
      member_name VARCHAR(255) NOT NULL,
      designation VARCHAR(100),
      organization VARCHAR(255),
      role VARCHAR(100),
      year VARCHAR(10),
      status ENUM('approved', 'inactive') NOT NULL DEFAULT 'approved',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleted_at DATETIME NULL,
      PRIMARY KEY (id),
      INDEX idx_dept (dept ASC),
      INDEX idx_status (status ASC),
      INDEX idx_year (year ASC)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  await connection.execute(createTableQuery);
  console.log('✅ Board of Studies table created/verified successfully');
}

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

async function migrateMEBoardOfStudies() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');

    await createBoardOfStudiesTable(connection);
    await createMeetingMinutesTable(connection);

    // Clear existing ME board of studies data
    await connection.execute('DELETE FROM board_of_studies WHERE dept = ?', ['mech']);
    await connection.execute('DELETE FROM bos_meeting_minutes WHERE dept = ?', ['mech']);
    console.log('🗑️ Cleared existing ME Board of Studies data');

    // Insert Board of Studies members
    console.log('📝 Inserting Board of Studies members...');
    for (const member of bosMembers) {
      const insertQuery = `
        INSERT INTO board_of_studies 
        (dept, member_name, designation, organization, role, year, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'approved')
      `;
      await connection.execute(insertQuery, [
        'mech',
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
        'mech',
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
      ['mech']
    );
    const [minutesResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM bos_meeting_minutes WHERE dept = ?', 
      ['mech']
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
migrateMEBoardOfStudies()
  .then(() => {
    console.log('✅ ME Board of Studies migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
