const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function checkStudentAchievements() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [columns] = await connection.execute("SHOW COLUMNS FROM student_achievements");
    console.log('student_achievements detailed columns:');
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

checkStudentAchievements();