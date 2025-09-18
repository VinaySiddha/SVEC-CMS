const mysql = require('mysql2/promise');

const studentAchievementsData = [
  // Internships
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2022-23',
    description: 'Internships during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2022-23.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2021-22',
    description: 'Internships during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2021-22.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2020-21',
    description: 'Internships during the Academic Year 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2020-21.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2019-20',
    description: 'Internships during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2019-20.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2018-19',
    description: 'Internships during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2018-19.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2017-18',
    description: 'Internships during the Academic Year 2017-18',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2017-18.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2016-17',
    description: 'Internships during the Academic Year 2016-17',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2016-17.pdf'
  },
  {
    category: 'Internships',
    title: 'Internships during the Academic Year 2015-16',
    description: 'Internships during the Academic Year 2015-16',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Internship_Details-2015-16.pdf'
  },

  // NPTEL/Other Certifications
  {
    category: 'NPTEL/Other Certifications',
    title: 'Certifications during the A.Y 2020-21',
    description: 'Certifications during the A.Y 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/mech/nptel%2020-21%20mech.pdf'
  },
  {
    category: 'NPTEL/Other Certifications',
    title: 'Certifications during the A.Y 2018-19',
    description: 'Certifications during the A.Y 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/nptel%202018-19%20mech.pdf'
  },

  // Achievements/Participations in Co-curricular/Extra-Curricular Activities
  {
    category: 'Co-curricular/Extra-Curricular Activities',
    title: 'Extracurricular activities during the Year 2023-24',
    description: 'Extracurricular activities during the Year 2023-24',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY23-24_ME_Student activities.pdf'
  },
  {
    category: 'Co-curricular/Extra-Curricular Activities',
    title: 'Extracurricular activities during the Year 2022-23',
    description: 'Extracurricular activities during the Year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY22-23_ME_Student activities.pdf'
  },
  {
    category: 'Co-curricular/Extra-Curricular Activities',
    title: 'Extracurricular activities during the Year 2021-22',
    description: 'Extracurricular activities during the Year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY21-22_ME_Student activities.pdf'
  },
  {
    category: 'Co-curricular/Extra-Curricular Activities',
    title: 'Extracurricular activities during the Year 2020-21',
    description: 'Extracurricular activities during the Year 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY20-21_ME_Student activities.pdf'
  },
  {
    category: 'Co-curricular/Extra-Curricular Activities',
    title: 'Extracurricular activities during the Year 2019-20',
    description: 'Extracurricular activities during the Year 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY19-20_ME_Student activities.pdf'
  },
  {
    category: 'Co-curricular/Extra-Curricular Activities',
    title: 'Extracurricular activities during the Year 2018-19',
    description: 'Extracurricular activities during the Year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Stu_Ach-AY_2018-19.pdf'
  },

  // Notable Individual Achievements (as description only, no url)
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. A. Saikumar (10a81a0302) has Presented Paper on "W.E", conducted by Jntuk.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. S.Suresh (10a81a0352) has Presented Paper on "W.E", conducted by Jntuk.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. S.Suresh (10a81a0352) has Presented Paper On "Nano Robots" conducted by Koneru Lakshmayya University, Vijayawada.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. Y Sri Ganesh Babu (10a81a0359) has Presented Paper on "Nano Robots" conducted by Koneru Lakshmayya University, Vijayawada.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. V.Venkatesh (10a81a0357) has Presented Paper on "Nano Robots" conducted by Koneru Lakshmayya University, Vijayawada.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. N. Raviteja (10a81a0341) has Presented Paper on "I Robot Arm" conducted by Anits, Vizag.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. K. Durga Prasad (10a81a0324) has Presented Paper on "I Robot Arm" conducted by Anits, Vizag.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Ms. N. Monica (10a81a0340) has Presented Paper on "I Robot Arm" conducted by Anits, Vizag.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. M.Ramakrishna (10a81a0337) has Participated in the Paper Presentation held on 8-3-2013 conducted by Githam Engineering College Vishakapatnam.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. Shaik Sultan Salamuddin(10a81a0351) has Participated in the Poster Presentation, conducted by Koneru Lakshmayya University, Vijayawada.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. T.Chalapathi (12a85a0307) bagged First Prize in the Technical Quiz Competition held at V.R Siddartha Engineering College, Vijayawada.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. T.Chalapathi (12a85a0307) bagged First Prize in the General Quiz Competition held at Jntu, Vijayanagarm.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. M.Mahesh (12a85a0304) bagged First Prize in the General Quiz Competition held at Jntu, Vijayanagarm.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. P.V.V Ranjith Kumar and his team has bagged First Place in Intramural Cricket competition held At Sri Vasavi Engineering College, Tadepalligudem on 7-7-13.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. N.Surendra and his team has bagged First Place in Intramural Volleyball competition held At Sri Vasavi Engineering College, Tadepalligudem On 7-7-13.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr. Ch.Kiran Kumar and his team has bagged Second Place in Intramural Basketball Competition held At Sri Vasavi Engineering College, Tadepalligudem on 7-7-13.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'Mr.M.Mahesh (12a85a0304) bagged First Prize in the Technical Quiz competition held at V.R Siddartha Engineering College, Vijayawada.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'M. Srinivas (11a81a0332) has Presented a Paper on "Polutionless Vehicle" bagged Second Place on 8-2-13 At B.V.C.E Odalarevu.',
    description: '',
    url: ''
  },
  {
    category: 'Notable Individual Achievements',
    title: 'M.Rakesh (11a81a0335) has Presented a Paper on "Continuous Variable Transmission" bagged Second Place on 8-2-13 At B.V.C.E Odalarevu.',
    description: '',
    url: ''
  },

  // Students Participations
  {
    category: 'Students Participations',
    title: 'Students Participations in various events',
    description: 'Students Participations in various events',
    url: 'https://srivasaviengg.ac.in/uploads/mech/student_participations.pdf'
  },

  // UIF
  {
    category: 'UIF',
    title: 'Student Achievements during the Academic Year 2018-19',
    description: 'Student Achievements during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/Stu_Ach-AY_2018-19.pdf'
  },

  // Community Service Project
  {
    category: 'Community Service Project',
    title: 'List of CSP Projects done by 2020-24 Batch Students',
    description: 'List of CSP Projects done by 2020-24 Batch Students',
    url: 'https://srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202020-24%20Batch%20Students.pdf'
  },
  {
    category: 'Community Service Project',
    title: 'List of CSP Projects done by 2021-25 Batch Students',
    description: 'List of CSP Projects done by 2021-25 Batch Students',
    url: 'https://srivasaviengg.ac.in/uploads/cse-csp/List%20of%20CSP%20Projects%20done%20by%202021-25%20Batch%20Students.pdf'
  },

  // Projects
  {
    category: 'Projects',
    title: 'Project Batches during the Academic Year 2022-23',
    description: 'Project Batches during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2022-23-Project-Batches-A&B.pdf'
  },
  {
    category: 'Projects',
    title: 'Project Batches during the Academic Year 2021-22',
    description: 'Project Batches during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2021-22-Project-Batches-A&B.pdf'
  },
  {
    category: 'Projects',
    title: 'Project Batches during the Academic Year 2020-21',
    description: 'Project Batches during the Academic Year 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2020-21-Project-Batches-A&B.pdf'
  },
  {
    category: 'Projects',
    title: 'Project Batches during the Academic Year 2019-20',
    description: 'Project Batches during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2019-20-Project-Batches-A&B.pdf'
  },
  {
    category: 'Projects',
    title: 'Project Batches during the Academic Year 2018-19',
    description: 'Project Batches during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/uploads/mech/AY_2018-19-Project-Batches-A&B.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechStudentAchievements() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_studentachievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_studentachievements table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_studentachievements');
    console.log('🗑️ Cleared existing mech_studentachievements records');

    // Insert student achievements data
    let successCount = 0;
    let errorCount = 0;

    for (const item of studentAchievementsData) {
      try {
        await connection.execute(
          `INSERT INTO mech_studentachievements (category, title, description, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.category, item.title, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} student achievement records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${studentAchievementsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_studentachievements');
    console.log(`📋 Total student achievement records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechStudentAchievements()
    .then(() => {
      console.log('🎉 Mech Student Achievements migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechStudentAchievements, studentAchievementsData };
