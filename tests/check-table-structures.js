const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function checkTables() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    // Check student_achievements table structure
    try {
      const [columns] = await connection.execute("DESCRIBE student_achievements");
      console.log('student_achievements columns:', columns.map(c => c.Field));
    } catch (error) {
      console.log('student_achievements table does not exist');
    }

    // Check workshops table structure
    try {
      const [columns] = await connection.execute("DESCRIBE workshops");
      console.log('workshops columns:', columns.map(c => c.Field));
    } catch (error) {
      console.log('workshops table does not exist');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkTables();