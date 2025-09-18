const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function checkColumnDetails() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // Get detailed column information
    const [columns] = await connection.execute("SHOW COLUMNS FROM faculty_achievements");
    console.log('faculty_achievements detailed columns:');
    columns.forEach(col => {
      console.log(`${col.Field}: ${col.Type} - ${col.Null} - ${col.Key} - ${col.Default} - ${col.Extra}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkColumnDetails();