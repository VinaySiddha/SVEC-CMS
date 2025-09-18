const mysql = require('mysql2/promise');

const achievementsData = [
  // Journal Publications
  {
    type: 'journal_publication',
    year: '2022-2023',
    title: 'Faculty Publication Details 2022-2023',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-Journals-2022-2023.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2021-2022',
    title: 'Faculty Publication Details 2021-2022',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_Journals%20%20%202021-22.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2020-2021',
    title: 'Faculty Publication Details 2020-2021',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Journals%20%202020-21.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2019-2020',
    title: 'Faculty Publication Details 2019-2020',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Journals%20%202019-20.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2018-2019',
    title: 'Faculty Publication Details 2018-2019',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2018-2019.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2017-2018',
    title: 'Faculty Publication Details 2017-2018',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2017-2018.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2016-2017',
    title: 'Faculty Publication Details 2016-2017',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2016-2017.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2015-2016',
    title: 'Faculty Publication Details 2015-2016',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2015-2016.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2014-2015',
    title: 'Faculty Publication Details 2014-2015',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2014-2015.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: '2013-2014',
    title: 'Faculty Publication Details 2013-2014',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_FacultyJournals_2013-2014.pdf',
    details: null,
  },
  {
    type: 'journal_publication',
    year: null,
    title: 'Faculty Publication in National / International Journals',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/Faculty%20Publications%20in%20National_%20International%20Journals.pdf',
    details: null,
  },

  // International Conferences
  {
    type: 'conference_publication',
    year: '2022-2023',
    title: 'Faculty Conferences Details 2022-2023',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-%20Conferences%20-2022-2023.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2021-2022',
    title: 'Faculty Conferences Details 2021-2022',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE-%20Conferences%202021-2022.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2020-2021',
    title: 'Faculty Conferences Details 2020-2021',
    url: 'https://srivasaviengg.ac.in/uploads/ece_conference%20index%202020-21.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2019-2020',
    title: 'Faculty Conferences Details 2019-2020',
    url: 'https://srivasaviengg.ac.in/uploads/ece_conference%20index%202019-20.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2018-2019',
    title: 'Faculty Conferences Details 2018-2019',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE_2018.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2017-2018',
    title: 'Faculty Conferences Details 2017-2018',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE_2017.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2016-2017',
    title: 'Faculty Conferences Details 2016-2017',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_internationalconference_latest.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: '2013-2016',
    title: 'Faculty Conferences Details 2013-2016',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/Published%20in%20CONFERENCE.pdf',
    details: null,
  },
  {
    type: 'conference_publication',
    year: null,
    title: 'Faculty Publications in National/International Conferences',
    url: null,
    details: null,
  },

  // Book Publications
  {
    type: 'book_publication',
    year: '2022',
    title: 'Dual Strip Flag Microstrip Patch Antenna For Millimeter Wave Applications.',
    url: null,
    details: 'Purnima K Sharma , E. Kusuma Kumari | SPRINGER DOI:',
  },
  {
    type: 'book_publication',
    year: '2021',
    title: 'Narrow Band Spectrum Sensing of Cognitive Radio for Wireless Services.',
    url: null,
    details: 'T V N L Aswini | SPRINGER DOI: 10.1007/978-981-15-9647-6_80',
  },
  {
    type: 'book_publication',
    year: '2021',
    title: 'Microstrip line feed Rectangular Split Ring Resonator Antenna for Millimeter Wave Applications',
    url: null,
    details: 'S. Murugan,E. Kusuma Kumari | SPRINGER DOI: 10.1007/978-981-16-3246-4_37',
  },
  {
    type: 'book_publication',
    year: '2021',
    title: 'Double-Sided Split Ring Resonator-Based Probe Feed Patch Antenna with Enhanced Bandwidth for 5G and Ku Band Applications',
    url: null,
    details: 'E. Kusuma Kumari, M. Vinod Kumar, Purnima K. Sharma, S. Murugan | SPRINGER Print ISBN: 978-981-16-1088-2 Electronic ISBN: 978-981-16-1089-9',
  },
  {
    type: 'book_publication',
    year: '2021',
    title: 'Compact Multiband CPW Feed Microstrip Fractal Antenna for X, Ku Band satellite Applications',
    url: null,
    details: 'E. Kusuma Kumari, Purnima K. Sharma, S. Murugan, and D. Rama Devi | SPRINGER DOI: 10.1007/978-981-16-3246-4_74',
  },
  {
    type: 'book_publication',
    year: '2021',
    title: 'Book Chapter : Double sided Split Ring Resonator based Probe feed patch Antenna for 5G and Ku band Applications',
    url: null,
    details: 'Dr. E. Kusuma Kumari, Dr. Purnima K. Sharma, Dr. S. Murugan, Mr. M. Vinod Kumar | SPRINGER DOI 978-981-16-1089-9_37, ©2021',
  },
  {
    type: 'book_publication',
    year: '2018',
    title: '"Signal Loss Calculation at 900 MHz & 2.4 GHz in WBAN"',
    url: null,
    details: 'Dr. Purnima K. Sharma (Co-Author) | LAMBERT Academic Publishing',
  },
  {
    type: 'book_publication',
    year: '2017',
    title: '"Development of Field Propagation Model for Urban Area"',
    url: null,
    details: 'Dr. Purnima K. Sharma (Co-Author) | Anchor Academic Publication, Hamburg Germany in 2017, ISBN-13: 978-3-96067-626-3.',
  },
  {
    type: 'book_publication',
    year: '2017',
    title: '"Development of Field Propagation Model for Urban Area"',
    url: null,
    details: 'Dr. Dinesh Sharma | Anchor Academic Publication, Hamburg Germany in 2017, ISBN-13: 978-3-96067-626-3.',
  },
  {
    type: 'book_publication',
    year: '2016',
    title: '"QoS in Fixed Wireless Access Networks"',
    url: null,
    details: 'Dinesh Sharma, Purnima K Sharma & R.K.Singh | LA ISBN-10: 365995490X, ISBN-13: 978-3659954900.P, Germany',
  },

  // Certifications
  {
    type: 'certification',
    year: '2022-23',
    title: 'NPTEL Certified Faculty List 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/Faculty%20Certification%20courses%20in%20%202022-2023.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: '2021-22',
    title: 'NPTEL Certified Faculty List 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_21-22.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: '2020-21',
    title: 'NPTEL Certified Faculty List 2020-21',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_20-21.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: '2019-20',
    title: 'NPTEL Certified Faculty List 2019-20',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ECE_NPTEL_19-20.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: 'Jan-Apr-2020',
    title: 'NPTEL Certified Faculty List Jan-Apr-2020',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_NPTEL_19-20.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: 'Jul-Oct-2019',
    title: 'NPTEL Certified Faculty List Jul-Oct-2019',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jul-Oct-2019.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: 'Jan-Apr-2019',
    title: 'NPTEL Certified Faculty List Jan-Apr-2019',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jan-Apr-2019.pdf',
    details: null,
  },
  {
    type: 'certification',
    year: 'Jun-Oct-2018',
    title: 'NPTEL Certified Faculty List Jun-Oct-2018',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/NPTEL%20Certified%20Faculty%20%20Jun-Oct-2018.pdf',
    details: null,
  },

  // Patents
  {
    type: 'patent',
    year: null,
    title: 'Patents Published by Faculty',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/List%20of%20Patents%20published%20by%20Faculty.pdf',
    details: null,
  },

  // Awards
  {
    type: 'award',
    year: '2023',
    title: 'Dr.Purnima K Sharma, has received the "State Best Teacher Award" on 5th September 2023 from APSCHE, Govt.of Andhra Pradesh.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2021',
    title: 'Dr.E. Kusuma Kumari, Dr. Purnima K Sharma, Dr. S Murugan received the best session award for 3rd International conference on communication and computational technologies ICCCT-2021 during 27th and 28th February,2021 organized by Rajasthan Technical University.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2021',
    title: 'Smt. KNVS Vijaya Lakshmi received best paper award from International conference on Wireless Data Networks 2021 during 26th & 27th February ,2021 entitled " RT – Gate: Concept of Micro level Polarization in QCA',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2019',
    title: 'Dr. E. Kusuma Kumari has received Best Academician Award in Feb 1, 2019 by CSERD.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: null,
    title: 'Dr. M. Thamarai, Professor of ECE Department has received Senior Researcher award by GECL',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: null,
    title: 'Dr. Purnima K. Sharma, Assoc. Prof of ECE Department has received Young Researcher by GECL',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2018',
    title: 'Dr Purnima K. Sharma, Assoc. Prof of ECE Department has received Young women award in March 03, 2018 by Venus International Foundation.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2018',
    title: 'Dr. M. Thamarai, Professor of ECE Department "Best Academician award" received from Combined Society for Educational Research and Development, Dehradun, Dated on 10.03.2018.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2017',
    title: 'Dr. E. Kusuma Kumari has received Best paper award for presenting the paper on " Wideband High Gain Circularly polarized planar Antenna array for L Band Radar" , 2017 IEEE International Conference on Computational Intelligence and Computing Research, Tamilnadu college of engineering, Coimbatore.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2011-2012',
    title: 'Dr. E. Kusuma Kumari has received Best teacher award for 2011-2012 academic Year in Gayatri Institute of Engineering And Technology.',
    url: null,
    details: null,
  },
  {
    type: 'award',
    year: '2001-2002',
    title: 'Dr. E. Kusuma Kumari has received Best teacher award for 2001-2002 academic Year in Sri YVS & BRM Polytechnic college.',
    url: null,
    details: null,
  },

  // Memberships
  {
    type: 'membership',
    year: null,
    title: 'IEEE Institute of Electrical & Electronics Engineers',
    url: null,
    details: '3',
  },
  {
    type: 'membership',
    year: null,
    title: 'ISTE Indian Society For Technical Education',
    url: null,
    details: '20',
  },
  {
    type: 'membership',
    year: null,
    title: 'IETE Institution of Electronics and Telecommunication Engineers',
    url: null,
    details: '7',
  },
  {
    type: 'membership',
    year: null,
    title: 'ISRD International Society for Research and Development.',
    url: null,
    details: '4',
  },
  {
    type: 'membership',
    year: null,
    title: 'IAENG International Association of Engineers',
    url: null,
    details: '5',
  },
  {
    type: 'membership',
    year: null,
    title: 'IRED Institute of Research Engineers and Doctors',
    url: null,
    details: '4',
  },
  {
    type: 'membership',
    year: null,
    title: 'ISC Indian Science Congress',
    url: null,
    details: '1',
  },
  {
    type: 'membership',
    year: null,
    title: 'SEMIC Semantic Interoperability Community',
    url: null,
    details: '1',
  },
  {
    type: 'membership',
    year: null,
    title: 'GRDS Global Research & Development Services',
    url: null,
    details: '2',
  },

  // Faculty Out-Reach
  {
    type: 'outreach',
    year: null,
    title: 'Faculty Out Reach',
    url: 'https://srivasaviengg.ac.in/uploads/facul_achievements/ece_Faculty%20Out%20Reach.pdf',
    details: null,
  },

  // Promotions/Incentives (full data)
  {
    type: 'promotion_incentive',
    year: '2022-2023',
    title: 'Dr. T.V.N.L. Aswini',
    url: null,
    details: JSON.stringify({ promotion: 'Associate Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2022-2023',
    title: 'Sri P. Gopala Reddy',
    url: null,
    details: JSON.stringify({ promotion: 'Sr.Assistant Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2022-2023',
    title: 'Sri B.Murali Krishna',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.15,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2022-2023',
    title: 'Dr.M. Thamarai',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.15,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.M.Satish Kumar',
    url: null,
    details: JSON.stringify({ promotion: 'Associate Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Sri G. V. Subrahmanyam',
    url: null,
    details: JSON.stringify({ promotion: 'Deputy Controller of Exams (DCE)', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.E.Kusuma Kumari',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.5,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.P.Ashok Kumar',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.7,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'DrPurnima K Sharma',
    url: null,
    details: JSON.stringify({ promotion: 'Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.P.Ashok Kumar',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.7,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.S.V.V Satyanarayana',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.4,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.T.V.N.L. Aswini',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.5,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2021-2022',
    title: 'Dr.TDNSS Sarveswara Rao',
    url: null,
    details: JSON.stringify({ promotion: 'Associate Professor', incentive: 'Rs.5,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2020-21',
    title: 'Dr.M.Koteswara Rao',
    url: null,
    details: JSON.stringify({ promotion: 'Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2020-21',
    title: 'Dr.S.V.V.Satyanarayana',
    url: null,
    details: JSON.stringify({ promotion: '-', incentive: 'Rs.7,000/-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2018-19',
    title: 'Dr.S.V.V.Satyanarayana',
    url: null,
    details: JSON.stringify({ promotion: 'Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2018-19',
    title: 'Sri M.Sathish Kumar',
    url: null,
    details: JSON.stringify({ promotion: 'Sr. Assistant Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2018-19',
    title: 'Sri T.Sreenivasu',
    url: null,
    details: JSON.stringify({ promotion: 'Sr. Assistant Professor', incentive: '-' }),
  },
  {
    type: 'promotion_incentive',
    year: '2018-19',
    title: 'Sri D.R.Sandeep',
    url: null,
    details: JSON.stringify({ promotion: 'Sr. Assistant Professor', incentive: '-' }),
  },

  // Gallery images
  ...[1, 2, 3, 4, 5, 6, 7, 10, 14, 12, 13, 15, 16, 20].map(num => ({
    type: 'gallery',
    year: null,
    title: `Gallery Image ${num}`,
    url: `https://srivasaviengg.ac.in/uploads/facul_achievements/${num}.jpg`,
    details: null,
  })),
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEFacultyAchievements() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_faculty_achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        year VARCHAR(32),
        title VARCHAR(512) NOT NULL,
        url VARCHAR(512),
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_faculty_achievements table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_faculty_achievements');
    console.log('🗑️ Cleared existing faculty achievements records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of achievementsData) {
      try {
        await connection.execute(
          `INSERT INTO ece_faculty_achievements (type, year, title, url, details, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
          [item.type, item.year, item.title, item.url, item.details]
        );
        console.log(`✅ Inserted: [${item.type}] ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting [${item.type}] ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${achievementsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_faculty_achievements');
    console.log(`📋 Total records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEFacultyAchievements()
    .then(() => {
      console.log('🎉 ECE Faculty Achievements migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEFacultyAchievements, achievementsData };