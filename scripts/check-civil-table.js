const mysql = require('mysql2/promise');

async function checkPhysicalFacilities() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    console.log('=== Checking civil_hackathons_gallery ===');
    const [hackathonData] = await connection.execute("SELECT * FROM civil_hackathons_gallery WHERE dept = 'civil'");
    console.log('Records:', hackathonData.length);
    console.log(hackathonData);
    
    console.log('\n=== Checking civil_physical_facilities ===');
    // Check if table exists
    const [tables] = await connection.execute("SHOW TABLES LIKE 'civil_physical_facilities'");
    console.log('Table exists:', tables.length > 0);
    
    if (tables.length > 0) {
      // Get table structure
      const [columns] = await connection.execute("DESCRIBE civil_physical_facilities");
      console.log('\nTable structure:');
      console.log(columns);
      
      // Get sample data
      const [data] = await connection.execute("SELECT * FROM civil_physical_facilities");
      console.log('\nData count:', data.length);
      if (data.length > 0) {
        console.log('Sample data:');
        console.log(data.slice(0, 10));
      } else {
        console.log('No data in civil_physical_facilities');
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

checkPhysicalFacilities();
