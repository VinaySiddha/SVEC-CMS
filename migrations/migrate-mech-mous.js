const mysql = require('mysql2/promise');

const mousData = [
  // Industry MoUs
  {
    type: 'industry',
    data: {
      organization: 'National Institute of Technology, Andhra Pradesh (NITAP)',
      industry_type: 'Educational Institution',
      date_of_mou: '15 Jun 2022',
      validity: '3 Years'
    }
  },
  {
    type: 'industry',
    data: {
      organization: 'EduSkills Foundation',
      industry_type: 'Training & Skill Development',
      date_of_mou: '10 Aug 2022',
      validity: '2 Years'
    }
  },
  {
    type: 'industry',
    data: {
      organization: 'Andhra Pradesh State Skill Development Corporation (APSSDC)',
      industry_type: 'Government Skill Development',
      date_of_mou: '05 Jan 2022',
      validity: '3 Years'
    }
  },
  {
    type: 'industry',
    data: {
      organization: 'SVR Technologies',
      industry_type: 'Technology Solutions',
      date_of_mou: '20 Nov 2021',
      validity: '2 Years'
    }
  },
  {
    type: 'industry',
    data: {
      organization: 'Siemens Centre of Excellence',
      industry_type: 'Industrial Automation',
      date_of_mou: '12 Feb 2021',
      validity: '5 Years'
    }
  },
  // Activities Under MoUs
  {
    type: 'activity',
    data: {
      category: 'NITAP Collaboration',
      activities: [
        {
          description: 'Various activities organized / conducted under MoU of NITAP AY: 2022-23',
          link: '#'
        },
        {
          description: 'Joint Research Projects: 2 ongoing faculty research collaborations'
        },
        {
          description: 'Faculty Development Programs: 3 FDPs conducted'
        },
        {
          description: 'Student Exchange Programs: 15 students participated in technical workshops'
        }
      ]
    }
  },
  {
    type: 'activity',
    data: {
      category: 'EduSkills Foundation Programs',
      activities: [
        {
          description: 'Various activities organized / conducted under MoU of Eduskills AY: 2022-23',
          link: '#'
        },
        {
          description: 'Skill Development Programs: 120+ students trained in advanced CAD/CAM tools'
        },
        {
          description: 'Certification Courses: 85 students received industry-recognized certifications'
        },
        {
          description: 'Industry Connect Programs: 4 industry experts conducted specialized training sessions'
        }
      ]
    }
  },
  {
    type: 'activity',
    data: {
      category: 'APSSDC Initiatives',
      activities: [
        {
          description: 'Various activities organized / conducted under MoU of APSSDC AY: 2022-23',
          link: '#'
        },
        {
          description: 'Various activities organized / conducted under MoU of APSSDC AY: 2020-21',
          link: '#'
        },
        {
          description: 'Technical Workshops: 6 workshops on emerging technologies'
        },
        {
          description: 'Entrepreneurship Development Programs: 2 EDPs conducted'
        }
      ]
    }
  },
  {
    type: 'activity',
    data: {
      category: 'Industry Internships & Training',
      activities: [
        {
          description: 'SVR Technologies: 18 students completed industry internships'
        },
        {
          description: 'Siemens Centre of Excellence: 45 students received specialized training'
        },
        {
          description: 'Guest Lectures: 8 industry experts delivered specialized talks'
        },
        {
          description: 'Industry Visits: 3 industrial visits organized for practical exposure'
        }
      ]
    }
  },
  // Benefits of MoUs
  {
    type: 'benefit',
    data: {
      title: 'Enhanced Employability',
      description: 'Increases job prospects through industry-relevant training',
      icon: 'Briefcase'
    }
  },
  {
    type: 'benefit',
    data: {
      title: 'Certifications',
      description: 'Industry-recognized certifications for career advancement',
      icon: 'Scroll'
    }
  },
  {
    type: 'benefit',
    data: {
      title: 'Industry Exposure',
      description: 'Practical knowledge through industry interactions',
      icon: 'Building'
    }
  },
  {
    type: 'benefit',
    data: {
      title: 'Networking',
      description: 'Connections with industry professionals',
      icon: 'Users'
    }
  },
  {
    type: 'benefit',
    data: {
      title: 'Quality Assurance',
      description: 'Ensures education meets industry standards',
      icon: 'Shield'
    }
  },
  {
    type: 'benefit',
    data: {
      title: 'Research Opportunities',
      description: 'Collaborative research projects with industry',
      icon: 'Rss'
    }
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechMoUs() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_mous (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        data JSON NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_mous table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_mous');
    console.log('🗑️ Cleared existing mech_mous records');

    // Insert MoUs data
    let successCount = 0;
    let errorCount = 0;

    for (const item of mousData) {
      try {
        await connection.execute(
          `INSERT INTO mech_mous (type, data, created_at) VALUES (?, ?, NOW())`,
          [item.type, JSON.stringify(item.data)]
        );
        console.log(`✅ Inserted: ${item.type} - ${item.data.category || item.data.organization || item.data.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.type}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} MoU records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${mousData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_mous');
    console.log(`📋 Total MoU records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechMoUs()
    .then(() => {
      console.log('🎉 Mech MoUs migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechMoUs, mousData };
