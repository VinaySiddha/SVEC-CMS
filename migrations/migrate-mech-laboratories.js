const mysql = require('mysql2/promise');

const laboratoriesData = [
  {
    lab_name: 'Workshop',
    icon: 'HardHat',
    video_title: null,
    video_url: null
  },
  {
    lab_name: 'Production Technology Lab',
    icon: 'Cog',
    video_title: null,
    video_url: null
  },
  {
    lab_name: 'Machine Tools Lab',
    icon: 'Cog',
    video_title: 'Machine Lab',
    video_url: 'https://www.youtube.com/embed/VUr4WV_K7qM'
  },
  {
    lab_name: 'Metrology Lab',
    icon: 'Microscope',
    video_title: 'Metrology Lab',
    video_url: 'https://www.youtube.com/embed/Du1edQHATEY'
  },
  {
    lab_name: 'CAD/CAM Lab',
    icon: 'Cog',
    video_title: 'CAD Lab',
    video_url: 'https://www.youtube.com/embed/LnXTVI7q_QQ'
  },
  {
    lab_name: 'Thermal Engineering Lab',
    icon: 'Cog',
    video_title: 'Thermal Engineering Lab',
    video_url: 'https://www.youtube.com/embed/NoaAk3gNNU0'
  },
  {
    lab_name: 'Mechanics of Solids Lab',
    icon: 'Cog',
    video_title: null,
    video_url: null
  },
  {
    lab_name: 'Metallurgy Lab',
    icon: 'Microscope',
    video_title: null,
    video_url: null
  },
  {
    lab_name: 'Instrumentation Lab',
    icon: 'Cog',
    video_title: 'Instrumentation Lab',
    video_url: 'https://www.youtube.com/embed/hXXZAbU6jHk'
  },
  {
    lab_name: 'Fuels & Lubricants Lab',
    icon: 'Microscope',
    video_title: 'Fuels Lab',
    video_url: 'https://www.youtube.com/embed/-YBCecMTlSc'
  },
  {
    lab_name: 'Mechanics of Fluids Lab',
    icon: 'Cog',
    video_title: 'Fluid Mechanics Lab',
    video_url: 'https://www.youtube.com/embed/Gqx3E5zMyxA'
  },
  {
    lab_name: 'Heat Transfer Lab',
    icon: null,
    video_title: 'Heat Transfer Lab',
    video_url: 'https://www.youtube.com/embed/wikbcmBvEQc'
  },
  {
    lab_name: 'Drawing Hall',
    icon: null,
    video_title: 'Drawing Hall',
    video_url: 'https://www.youtube.com/embed/ktDAGVv0Csg'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateMechLaboratories() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS mech_laboratories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lab_name VARCHAR(255) NOT NULL,
        icon VARCHAR(50),
        video_title VARCHAR(255),
        video_url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ mech_laboratories table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM mech_laboratories');
    console.log('🗑️ Cleared existing MECH laboratories records');

    // Insert laboratories data
    let successCount = 0;
    let errorCount = 0;

    for (const item of laboratoriesData) {
      try {
        await connection.execute(
          `INSERT INTO mech_laboratories (lab_name, icon, video_title, video_url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.lab_name, item.icon, item.video_title, item.video_url]
        );
        console.log(`✅ Inserted: ${item.lab_name}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.lab_name}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} laboratory records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${laboratoriesData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mech_laboratories');
    console.log(`📋 Total laboratory records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateMechLaboratories()
    .then(() => {
      console.log('🎉 MECH Laboratories migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateMechLaboratories, laboratoriesData };
