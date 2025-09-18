const mysql = require('mysql2/promise');

// EEE Faculty data with email addresses for better contact functionality
const eeeFacultyWithEmails = [
  { 
    name: "Dr.Ch.Rambabu", 
    qualification: "Ph.D", 
    designation: "Professor & Dean(Student Affairs)", 
    email: "rambabu.ch@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Dr.Ch.Rambabu206-rambabusir.pdf" 
  },
  { 
    name: "Dr. D. Sudha Rani", 
    qualification: "Ph.D", 
    designation: "Professor & HOD", 
    email: "sudharani.d@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Dr.%20Sudha%20Rani%20Donepudi.pdf" 
  },
  { 
    name: "Dr. Chappa Anil Kumar", 
    qualification: "Ph.D", 
    designation: "Assoc. Professor", 
    email: "anilkumar.ch@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Ch.Anil%20Kumar.pdf" 
  },
  { 
    name: "Mr. U. Chandra Rao", 
    qualification: "M.Tech.,(Ph.D)", 
    designation: "Sr. Asst. Professor", 
    email: "chandrarao.u@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Rao.pdf" 
  },
  { 
    name: "Mr. N. Sri Harish", 
    qualification: "M.Tech", 
    designation: "Sr. Asst. Professor", 
    email: "sriharish.n@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N.SriharishHarish.pdf" 
  },
  { 
    name: "Mr. Ch.V S R Gopala Krishna", 
    qualification: "M.Tech(Ph.D)", 
    designation: "Sr. Asst. Professor", 
    email: "gopalakrishna.chvsr@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Ch.V%20S%20R%20G%20Krishna6Ch.V.S.R.%20Gopal%20Krishna.pdf" 
  },
  { 
    name: "Mr. K.Ramesh Babu", 
    qualification: "M.Tech", 
    designation: "Sr. Asst. Professor", 
    email: "rameshbabu.k@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Ramesh%20Babu.pdf" 
  },
  { 
    name: "Mr. K.Suresh", 
    qualification: "M.Tech.,(Ph.D)", 
    designation: "Asst. Professor", 
    email: "suresh.k@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Suresh.pdf" 
  },
  { 
    name: "Mr. M.T.V.L. Ravi Kumar", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "ravi.mada@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_M.T.V.L.%20Ravi%20Kumar.pdf" 
  },
  { 
    name: "Mr. L. Suresh", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "suresh.l@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_L.Suresh.pdf" 
  },
  { 
    name: "Mrs. B. Swathi", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "swathi.b@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_B.Swathi.pdf" 
  },
  { 
    name: "Mr. S. Mahesh", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "mahesh.s@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_S.Mahesh.pdf" 
  },
  { 
    name: "Mr. V. Hari Krishnan", 
    qualification: "M.Tech.,(Ph.D)", 
    designation: "Asst. Professor", 
    email: "harikrishnan.v@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Hari%20Krishnan.pdf" 
  },
  { 
    name: "Mrs. V.Prashanthi", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "prashanthi.v@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Prashanthi.pdf" 
  },
  { 
    name: "Mr. U. Uday Kumar", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "udaykumar.u@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_U.%20Uday%20Kumar.pdf" 
  },
  { 
    name: "Mr. Y. Rajesh Kumar", 
    qualification: "M.Tech", 
    designation: "Asst. Professor", 
    email: "rajeshkumar.y@srivasaviengg.ac.in",
    profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Y.%20Rajesh%20Kumar.pdf" 
  }
];

async function updateEEEFacultyWithEmails() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔌 Connected to database');
    console.log('📧 Starting EEE Faculty Email Update...');

    let successCount = 0;
    let errorCount = 0;

    for (const faculty of eeeFacultyWithEmails) {
      try {
        const [result] = await connection.execute(`
          UPDATE faculty_profiles 
          SET email = ? 
          WHERE name = ? AND dept = 'eee'
        `, [faculty.email, faculty.name]);

        if (result.affectedRows > 0) {
          console.log(`✅ Updated email for: ${faculty.name} -> ${faculty.email}`);
          successCount++;
        } else {
          console.log(`⚠️  No record found for: ${faculty.name}`);
        }
      } catch (e) {
        console.log(`❌ Error updating ${faculty.name}:`, e.message);
        errorCount++;
      }
    }

    console.log('\n📊 Email Update Summary:');
    console.log(`✅ Successfully updated: ${successCount} faculty emails`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${eeeFacultyWithEmails.length}`);

    // Verify the update
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM faculty_profiles WHERE dept = ? AND email IS NOT NULL', 
      ['eee']
    );
    console.log(`📧 Total EEE faculty with emails: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Error during migration:', error);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  updateEEEFacultyWithEmails()
    .then(() => {
      console.log('🎉 EEE Faculty email update completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { updateEEEFacultyWithEmails, eeeFacultyWithEmails };