const mysql = require('mysql2/promise');


// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

// Mechanical Department Faculty Data
const mechTeachingFaculty = [
  { name: "Dr.G.V.N.S.R.Ratnakara Rao", qualification: "M.E.,Ph.D", designation: "Professor & Principal", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Dr.%20G.V.N.S.R.%20Ratnakara%20RaoDr.Ratnakar_Ph.D%20profile.pdf" },
  { name: "Dr.M.V.Ramesh", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.Dr.M.V.RameshResume%20OCT%202017.pdf" },
  { name: "Mr.K.S.B.S.V.S.Sastry", qualification: "M.Tech.,(Ph.D)", designation: "Associate Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20K.S.B.S.V.S.%20SastryMr.%20K.S.B.S.V.S.Sastry_Profile.pdf" },
  { name: "Mr.P.N.V.Gopala Krishna", qualification: "M.E,M.B.A,M.Tech,(Ph.D)", designation: "Associate Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MECH_Dr.Shirin%20Bhanu%20Koduri.pdf" },
  { name: "Dr.K.Dorathi", qualification: "M.Tech,Ph.D", designation: "Associate Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mrs.%20K.%20DorathiMrs.%20K.Dorathi_Profile.pdf" },
  { name: "Mr.K.Sri Rama Murthy", qualification: "M.Tech,(Ph.D)", designation: "Sr. Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20K.%20Sri%20Rama%20MurthyMr.%20K.%20Sri%20Rama%20Murthy_Profile.pdf" },
  { name: "Mr. G.Rama Prasad", qualification: "M.Tech,(Ph.D)", designation: "Sr. Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20G.%20Rama%20PrasadMr.%20G.%20Rama%20Prasad_Profile.pdf" },
  { name: "Mr.B.N.V.Srinivas", qualification: "M.Tech,(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/B.N.V%20Srinivas%20BNV%20SRINIVAS%20(1).pdf" },
  { name: "Mr.T.S.S.R.Krishna", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20T.S.S.R.%20KrishnaMr.%20T.S.S.R.%20Krishna_Profile.pdf" },
  { name: "Mr. S.Chandrasekhar", qualification: "M.Tech,(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20S.%20ChandrasekharMr.%20S.%20Chandraskehar_Profile.pdf" },
  { name: "Mr. K.C.S.Vyasa Krishnaji", qualification: "M.Tech,(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20K.C.S.%20Vyasa%20KrishnajiFaculty_profile%20Format%20KCS%20VYASA%20KRISHNAJI.docx.pdf" },
  { name: "Mr.G.Prasanth", qualification: "M.E,(Ph.D)(Study Leave)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr.%20G.%20Prasanth%20prasanth%20faculty%20profile%20format.pdf" },
  { name: "Mr.D.V.N.Prabhakar", qualification: "M.E(Ph.D)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/Mr%20D%20V%20N%20Prabhakar25-%20dvn%20prabhakar.pdf" },
  { name: "Mr. T.Atama Ramadu", qualification: "M.Tech(Ph.D)(Study Leave)", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/MECH_MNRAO.pdf" },
  { name: "Mr. D.Ayyappa", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_Ayyappa%20Resume.pdf" },
  { name: "Mr. M.D.Nagedra Prasad", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_M.D.Nagendra_Prasad_CV.pdf" },
  { name: "Mr. M.Venkatesh", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/me_Venkatesh.M.pdf" },
  { name: "Mr. M.Chaitanya", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/me_Chaitanya.M.pdf" },
  { name: "Mr. Sk.Arief", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/me_Sk.Arief-Resume.pdf" },
  { name: "Mr. V.Ravi Kumar", qualification: "M.Tech(Ph.D)", designation: "Assistant Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/ME_%20Resume_%20Ravi.pdf" },
  { name: "Dr.S.Subbarama Kousik", qualification: "M.Tech,(Ph.D)(Study Leave)", designation: "Assistant Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Dr.%20SSR%20Kousik.pdf" },
  { name: "Mr. M. V. S. S. D. S Surya Pavan", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Mr.%20Mallampalli%20V%20S%20S%20%20D%20S%20Surya%20Pavan.pdf" },
  { name: "Mr. M.S.N.Murthy", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_MSN%20Murthy%20Resume.pdf" },
  { name: "Mr. P.Mohankrishna", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/mech_Mohan.pdf" },
  { name: "Mr .K. Suchendra Kumar", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Mr.%20K.%20Suchendra%20Kumar.pdf" },
  { name: "Ms.Y.Sampurna", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/mech_Ms.%20Y.%20Sampurna.pdf" }
];

const mechNonTeachingFaculty = [
  { name: "Mr.A.Bala Balaji", designation: "Lab Technician" },
  { name: "Mr.K.V.V.Durga Rao", designation: "Lab Technician" },
  { name: "Mr. P.Rama Krishna", designation: "Lab Technician" },
  { name: "Mr. Y. Narasimha Rao", designation: "Lab Technician" },
  { name: "Mr. Ch. Naga Babu", designation: "Lab Technician" },
  { name: "Mr. K Ravi Kiran", designation: "Lab Technician" },
  { name: "Mr. G.Kiran", designation: "Attender" },
  { name: "Mr. K. Srinivasa Rao", designation: "Attender" }
];

async function migrateMechFaculty() {
  let connection;

  try {
    console.log('🔄 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully');

    // Create mech_faculty table if it doesn't exist
    console.log('🔄 Creating mech_faculty table...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS mech_faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        qualification VARCHAR(255),
        designation VARCHAR(255) NOT NULL,
        profile_url TEXT,
        faculty_type ENUM('teaching', 'non-teaching') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_faculty_type (faculty_type),
        INDEX idx_designation (designation)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.execute(createTableQuery);
    console.log('✅ mech_faculty table created successfully');

    // Clear existing data
    console.log('🔄 Clearing existing data...');
    await connection.execute('DELETE FROM mech_faculty');
    console.log('✅ Existing data cleared');

    // Insert teaching faculty
    console.log('🔄 Inserting teaching faculty data...');
    const teachingInsertQuery = `
      INSERT INTO mech_faculty (name, qualification, designation, profile_url, faculty_type)
      VALUES (?, ?, ?, ?, 'teaching')
    `;

    let teachingInserted = 0;
    for (const faculty of mechTeachingFaculty) {
      try {
        await connection.execute(teachingInsertQuery, [
          faculty.name,
          faculty.qualification,
          faculty.designation,
          faculty.profileUrl
        ]);
        teachingInserted++;
      } catch (error) {
        console.error(`❌ Error inserting teaching faculty ${faculty.name}:`, error.message);
      }
    }
    console.log(`✅ Inserted ${teachingInserted} teaching faculty records`);

    // Insert non-teaching faculty
    console.log('🔄 Inserting non-teaching faculty data...');
    const nonTeachingInsertQuery = `
      INSERT INTO mech_faculty (name, qualification, designation, profile_url, faculty_type)
      VALUES (?, NULL, ?, NULL, 'non-teaching')
    `;

    let nonTeachingInserted = 0;
    for (const faculty of mechNonTeachingFaculty) {
      try {
        await connection.execute(nonTeachingInsertQuery, [
          faculty.name,
          faculty.designation
        ]);
        nonTeachingInserted++;
      } catch (error) {
        console.error(`❌ Error inserting non-teaching faculty ${faculty.name}:`, error.message);
      }
    }
    console.log(`✅ Inserted ${nonTeachingInserted} non-teaching faculty records`);

    // Verify data insertion
    console.log('🔄 Verifying data insertion...');
    const [rows] = await connection.execute(
      'SELECT faculty_type, COUNT(*) as count FROM mech_faculty GROUP BY faculty_type'
    );

    console.log('📊 Migration Summary:');
    rows.forEach(row => {
      console.log(`   ${row.faculty_type}: ${row.count} records`);
    });

    const [totalRows] = await connection.execute('SELECT COUNT(*) as total FROM mech_faculty');
    console.log(`   Total: ${totalRows[0].total} records`);

    console.log('🎉 Mechanical faculty migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateMechFaculty()
    .then(() => {
      console.log('✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { migrateMechFaculty };
