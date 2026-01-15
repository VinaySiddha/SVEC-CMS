const mysql = require('mysql2/promise');

async function insertSampleData() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    // Sample gallery data
    const galleryData = [
      {
        dept: 'cseai',
        academic_year: '2022-2023',
        gallery: 'https://via.placeholder.com/350x240?text=Hackathon+2022-23+Image1,https://via.placeholder.com/350x240?text=Hackathon+2022-23+Image2,https://via.placeholder.com/350x240?text=Hackathon+2022-23+Image3,https://via.placeholder.com/350x240?text=Hackathon+2022-23+Image4'
      },
      {
        dept: 'cseai',
        academic_year: '2023-2024',
        gallery: 'https://via.placeholder.com/350x240?text=Hackathon+2023-24+Image1,https://via.placeholder.com/350x240?text=Hackathon+2023-24+Image2,https://via.placeholder.com/350x240?text=Hackathon+2023-24+Image3'
      },
      {
        dept: 'cseai',
        academic_year: '2024-2025',
        gallery: 'https://via.placeholder.com/350x240?text=Hackathon+2024-25+Image1,https://via.placeholder.com/350x240?text=Hackathon+2024-25+Image2'
      }
    ];

    // First check if data exists
    const [existingRows] = await connection.execute(
      "SELECT COUNT(*) as count FROM cai_hackathons_gallery WHERE dept = 'cseai'"
    );

    if (existingRows[0].count === 0) {
      // Insert sample data
      for (const data of galleryData) {
        await connection.execute(
          "INSERT INTO cai_hackathons_gallery (dept, academic_year, gallery) VALUES (?, ?, ?)",
          [data.dept, data.academic_year, data.gallery]
        );
        console.log(`Inserted gallery for ${data.academic_year}`);
      }
      console.log('✓ Sample hackathons gallery data inserted successfully!');
    } else {
      console.log('Gallery data already exists, skipping insertion');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

insertSampleData();
