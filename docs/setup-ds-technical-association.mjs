import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function setupTechnicalAssociation() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✓ Connected to MySQL database');

    // Check if table exists
    const [tables] = await connection.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ds_technical_association' AND TABLE_SCHEMA = 'svec_cms'`
    );

    if (tables.length === 0) {
      console.log('Creating ds_technical_association table...');
      await connection.query(`
        CREATE TABLE ds_technical_association (
          id INT AUTO_INCREMENT PRIMARY KEY,
          dept VARCHAR(20) DEFAULT 'ds',
          title VARCHAR(255),
          description TEXT,
          event_name VARCHAR(255),
          file_url VARCHAR(500),
          fileUrl VARCHAR(500),
          category VARCHAR(100),
          academic_year VARCHAR(20),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('✓ Created ds_technical_association table');
    }

    // Clear existing technical association data for ds department
    await connection.query(
      `DELETE FROM ds_technical_association WHERE dept = 'ds'`
    );
    console.log('✓ Cleared existing Technical Association data');

    // Insert sample technical association events
    const eventData = [
      {
        dept: 'ds',
        title: 'Nexus Event 2024-25 - AI Innovations',
        description: 'Winners of AI Innovations competition in Nexus 2024-25',
        event_name: 'Nexus Event 2024-25',
        file_url: 'https://via.placeholder.com/400x300?text=Nexus+Winners+List',
        category: 'technical association',
        academic_year: '2024-25'
      },
      {
        dept: 'ds',
        title: 'Nexus Event 2024-25 - Data Science Challenge',
        description: 'Winners of Data Science Challenge in Nexus 2024-25',
        event_name: 'Nexus Event 2024-25',
        file_url: 'https://via.placeholder.com/400x300?text=Data+Science+Winners',
        category: 'technical association',
        academic_year: '2024-25'
      },
      {
        dept: 'ds',
        title: 'Nexus Event 2024-25 - Machine Learning Hackathon',
        description: 'Winners of ML Hackathon in Nexus 2024-25',
        event_name: 'Nexus Event 2024-25',
        file_url: 'https://via.placeholder.com/400x300?text=ML+Hackathon+Winners',
        category: 'technical association',
        academic_year: '2024-25'
      },
      {
        dept: 'ds',
        title: 'Nexus Event 2024-25 - Data Analytics Workshop',
        description: 'Participants and winners of Data Analytics Workshop',
        event_name: 'Nexus Event 2024-25',
        file_url: 'https://via.placeholder.com/400x300?text=Analytics+Workshop',
        category: 'technical association',
        academic_year: '2024-25'
      },
      {
        dept: 'ds',
        title: 'Nexus Event 2023-24 - AI Competition Winners',
        description: 'Winners of AI Competition in Nexus 2023-24',
        event_name: 'Nexus Event 2023-24',
        file_url: 'https://via.placeholder.com/400x300?text=Nexus+2023-24+Winners',
        category: 'technical association',
        academic_year: '2023-24'
      },
      {
        dept: 'ds',
        title: 'Nexus Event 2023-24 - Technical Workshop Winners',
        description: 'Participants recognized for excellence',
        event_name: 'Nexus Event 2023-24',
        file_url: 'https://via.placeholder.com/400x300?text=Workshop+2023-24',
        category: 'technical association',
        academic_year: '2023-24'
      }
    ];

    for (const data of eventData) {
      await connection.query(
        `INSERT INTO ds_technical_association (dept, title, description, event_name, file_url, category, academic_year) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [data.dept, data.title, data.description, data.event_name, data.file_url, data.category, data.academic_year]
      );
    }

    console.log(`✓ Inserted ${eventData.length} Technical Association events`);

    // Verify data
    const [results] = await connection.query(
      `SELECT * FROM ds_technical_association WHERE dept = 'ds' ORDER BY id DESC`
    );
    console.log(`✓ Verification: ${results.length} records found`);
    console.log('Sample records:', JSON.stringify(results.slice(0, 2), null, 2));

    console.log('\n✅ Technical Association Setup Complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

setupTechnicalAssociation();
