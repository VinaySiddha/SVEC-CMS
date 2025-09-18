const mysql = require('mysql2/promise');

// CSE Faculty data to insert
const cseFaculty = [
    { name: "Dr. D. Jaya Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr%20D.Jaya%20Kumari-Web%20Profile.pdf" },
    { name: "Dr. V. Venkateswara Rao", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20Venkateswara%20Rao%20Web%20Profile.pdf" },
    { name: "Dr. V. S Naresh", qualification: "M.Tech.,Ph.D", designation: "Professor & Dean(R&D)", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.V.S.Naresh.pdf" },
    { name: "Dr. K. Shirin Bhanu", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.Shirin%20Bhanu%20Koduri.pdf" },
    { name: "Dr. A. Daveedu Raju", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20A.%20Daveedu%20Raju.pdf" },
    { name: "Dr. K. Venkata Ramana", qualification: "M.Tech.,Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20K%20Venkata%20Ramana.pdf" },
    { name: "Dr. G. Sivaraman", qualification: "M.Tech.,Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Dr.%20G%20Sivaraman.pdf" },
    { name: "Mr. G. Nataraj", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Nataraj%20G.pdf" },
    { name: "Mrs. B. Sri Ramya", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_B.Sriramya-%20Web%20profile.pdf" },
    { name: "Mr. G. Sriram Ganesh", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_GSRIRAMGANESH.pdf" },
    { name: "Mr. N. V. Murali Krishna Raja", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_%20N%20V%20MURALIKRISHNA%20RAJA.pdf" },
    { name: "Mrs. N. Hiranmayee", qualification: "M.Tech,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Hiranmayee.pdf" },
    { name: "Mr. M. Nageswara Rao", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_MNRAO.pdf" },
    { name: "Mrs. Y. Divya Vani", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Y%20Divya%20Vani.pdf" },
    { name: "Mr. K. Lakshminarayana", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_K.%20Lakshmi%20Narayana-%20Web%20profile.pdf" },
    { name: "Ms. A. Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_A.kiranmai-%20Web%20profile.pdf" },
    { name: "Ms. G. SiriVenkata Bhanu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_G.s.v.%20Bhanu%20-%20Web%20profile.pdf" },
    { name: "Mrs. D. S. L Manikanteswari", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_D%20S%20L%20Manikanteswrai.pdf" },
    { name: "Mr. M. S KumarReddy", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/S.KumarReddy%20MallidiMS%20Kumar%20Reddy%20Web%20Profile.pdf" },
    { name: "Mr. P. Rajesh", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_P.%20Rajesh.pdf" },
    { name: "Ms. M. Santhi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_MSANTHI_WEB_PROFILE.pdf" },
    { name: "Mrs. A. Nagajyothi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_A.Nagajyothi-%20Web%20profile.pdf" },
    { name: "Mr. K. Praveen Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Praveen_Webprofile.pdf" },
    { name: "Mrs. M. N. V Surekha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_surekha_profile_WEB.pdf" },
    { name: "Mr. P. Ramamohan Rao", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_P.RamamohanRao.pdf" },
    { name: "Mr. M V V G Krishna Murthy", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.MVVGKrishnaMurthy.pdf" },
    { name: "Mr. G. Mahesh", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.G.Mahesh.pdf" },
    { name: "Mr. V. Gajendra Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20V.%20Gajendra%20Kumar.pdf" },
    { name: "Mrs. J. Kanimozhi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20J.%20Kanimozhi.pdf" },
    { name: "Mr. U. Jagadeesan", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20U.%20Jagadeesan.pdf" },
    { name: "Mrs. V. Nandini", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20V.%20Nandini.pdf" },
    { name: "Mr. Krishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20Krishna.pdf" },
    { name: "Mr. J. Dhandapani", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20J.Dhandapani.pdf" },
    { name: "Mrs. T. Anu", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20T.%20Anu.pdf" },
    { name: "Mr. T. Anil Kumar Reddy", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20T.Anil%20Kumar%20Reddy.pdf" },
    { name: "Mrs. Shaik Apsaruneesa", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20Shaik%20Apsaruneesa.pdf" },
    { name: "Mrs. K. Sri Durga Achuta", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20K.%20Sri%20Durga%20Achuta.pdf" },
    { name: "Mr. V Venugopal", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20V.%20Venugopal.pdf" },
    { name: "Mr. L. Atri Datta Ravi Tez", qualification: "M.Tech", designation: "Asst. Professor & Web Developer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_L.A.D%20RAVITEZ.pdf" },
    { name: "Mr. Md. Sadik", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Sadik.pdf" },
    { name: "Ms. R. Nava Lavanya", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20R.%20Nava%20Lavanya.pdf" },
    { name: "Mr. T. Nava Krishna", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.T.%20Nava%20Krishna.pdf" },
    { name: "Mr. G. Deepak Pavan Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.G.%20Deepak%20Pavan%20Kumar.pdf" },
    { name: "Mrs. Y. Suneetha", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20Y.%20Sunitha.pdf" },
    { name: "Mr. Syed Akheel Hassan Gori", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20Syed%20Akheel%20Hassan%20Gori.pdf" },
    { name: "Mr. Sd. Arief", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20Sayed%20Arief.pdf" },
    { name: "Mr. E. Hanuman Sai Gupta", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20E.%20Hanuman%20Sai%20Gupta.pdf" },
    { name: "Mr. P. Naga Bhushanam", qualification: "M.Tech,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20P.%20Naga%20Bhushanam.pdf" },
    { name: "Mrs. Y. Revathi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20Y.%20Revathi.pdf" },
    { name: "Mrs. M. Sai Durga Lakshmi", qualification: "M.C.A", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20M.%20Sai%20Durga%20Lakshmi.pdf" },
    { name: "Ms. T. Pranusha", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_MS.T.Pranusha.pdf" },
    { name: "Mr.P. Gopinath", qualification: "M.C.A", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.P.Gopinath.pdf" },
    { name: "Ms. Y. Sabitha Yali", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20Y.%20Sabitha%20Yali.pdf" },
    { name: "Ms. M. Vineela", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20M.%20Vineela.pdf" },
    { name: "Ms. K. Ramya", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Ms.%20K.%20Ramya.pdf" },
    { name: "Mr. K. Phanindra Brahmaji", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20K.%20Phanindra%20Brahmaji.pdf" },
    { name: "Mr. S. P. Ramesh Varma", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mr.%20S.%20P.%20Ramesh%20Varma.pdf" },
    { name: "Mrs. K. Surya Bhavani", qualification: "B.Tech", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20K.%20Surya%20Bhavani.pdf" },
    { name: "Mrs. A. Neelima", qualification: "M.Sc", designation: "Lecturer", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CSE_Mrs.%20A.%20Neelima.pdf" }

  ];


async function migrateCivilFacultyProfiles() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('Connected to database');

    // Clear existing Civil faculty data
    await connection.execute('DELETE FROM faculty_profiles WHERE dept = ?', ['civil']);
    console.log('Cleared existing Civil faculty data');

    // Insert faculty data
    for (const faculty of civilFaculty) {
      try {
        await connection.execute(`
          INSERT INTO faculty_profiles (
            name, qualification, designation, profile_url, dept, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, [
          faculty.name,
          faculty.qualification,
          faculty.designation,
          faculty.profileUrl,
          'civil',
          'approved'
        ]);
        console.log(`Inserted: ${faculty.name}`);
      } catch (e) {
        console.log(`Error inserting ${faculty.name}:`, e.message);
      }
    }

    console.log('✅ Civil faculty profiles migration completed successfully!');

  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await connection.end();
  }
}

migrateCivilFacultyProfiles();
