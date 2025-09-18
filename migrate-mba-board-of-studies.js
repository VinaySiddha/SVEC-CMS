const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
    port: 3306
};

const bosMembers = [
    { member_name: "Dr. G.V.Subba Raju", designation: "Professor", organization: "Dept of MBA, SVEC", role: "Chairperson", year: 2024 },
    { member_name: "Dr. B.Amarnath", designation: "Former Professor,Department of Management Studies", organization: "SV University", role: "Council Nominee", year: 2024 },
    { member_name: "Dr. Suryachandra Rao", designation: "Professor,Department of Management Studies", organization: "Krishna University", role: "University Nominee", year: 2024 },
    { member_name: "Sri. P.S. Varma", designation: "Former D G M,Coromandel International Limited", organization: "Kakinada", role: "Industry Expert", year: 2024 },
    { member_name: "Sri Satyanarayana Ruttala", designation: "Senior Manager", organization: "Ericsson India Global Services Pvt., Ltd.", role: "Alumni", year: 2024 },
    { member_name: "All Faculty Members in the MBA Dept.", designation: "are Members in BOS", organization: "", role: "", year: 2024 }
];
// Board of Studies Members data for mba


// Meeting Minutes data for MBA
const meetingMinutes = [
    {
        meeting_title: "Minutes of 8th meeting of the Board of Studies",
        meeting_number: 8,
        meeting_date: "2025-07-02",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/Minutes of the Meeting - 8th BOS.pdf",
        academic_year: "2024-25",
    },
    {
        meeting_title: "Minutes of 7th meeting of the Board of Studies",
        meeting_number: 7,
        meeting_date: "2024-09-02",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/Minutes of the Meeting - 7th BOS.pdf",
        academic_year: "2024-25",
    },
    {
        meeting_title: "Minutes of 5th meeting of the Board of Studies",
        meeting_number: 5,
        meeting_date: "2022-07-29",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/5th%20BOS%20-%20Minutes%20of%20the%20Meeting.pdf",
        academic_year: "2021-22",
    },
    {
        meeting_title: "Minutes of 4th meeting of the Board of Studies",
        meeting_number: 4,
        meeting_date: "2021-09-01",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/4th%20BOS%20minutes%20of%20meeting.pdf",
        academic_year: "2020-21",
    },
    {
        meeting_title: "Minutes of 3rd meeting of the Board of Studies",
        meeting_number: 3,
        meeting_date: "2020-06-06",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/3rd%20BOS%20Minutes%20of%20meeting-1.pdf",
        academic_year: "2019-20",
    },
    {
        meeting_title: "Minutes of 2nd meeting of the Board of Studies",
        meeting_number: 2,
        meeting_date: "2019-04-16",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/2nd%20BOS%20minutes%20of%20meeting%2016-4-2019.pdf",
        academic_year: "2018-19",
    },
    {
        meeting_title: "Minutes of 1st meeting of the Board of Studies",
        meeting_number: 1,
        meeting_date: "2018-06-02",
        document_url: "https://srivasaviengg.ac.in/uploads/mba/1ST%20BOS%20minutes%20of%20meeting%20final.pdf",
        academic_year: "2017-18",
    },
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

        // Clear existing mba board of studies data
        await connection.execute('DELETE FROM board_of_studies WHERE dept = ?', ['mba']);
        await connection.execute('DELETE FROM bos_meeting_minutes WHERE dept = ?', ['mba']);
        console.log('🗑️ Cleared existing mba Board of Studies data');

        // Insert Board of Studies members
        console.log('📝 Inserting Board of Studies members...');
        for (const member of bosMembers) {
            const insertQuery = `
        INSERT INTO board_of_studies 
        (dept, member_name, designation, organization, role, year, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'approved')
      `;

            await connection.execute(insertQuery, [
                'mba',
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
                'mba',
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
            ['mba']
        );

        const [minutesResult] = await connection.execute(
            'SELECT COUNT(*) as count FROM bos_meeting_minutes WHERE dept = ?',
            ['mba']
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
        console.log('✅ mba Board of Studies migration completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    });