const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function checkAndMigrate() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Check if tables exist
    const [tables] = await connection.execute("SHOW TABLES");
    console.log('Existing tables:', tables.map(t => Object.values(t)[0]));

    // Check if faculty_achievements table has the right columns
    try {
      const [columns] = await connection.execute("DESCRIBE faculty_achievements");
      console.log('faculty_achievements columns:', columns.map(c => c.Field));
    } catch (error) {
      console.log('faculty_achievements table does not exist');
    }

    // Check if laboratories table has the right columns
    try {
      const [columns] = await connection.execute("DESCRIBE laboratories");
      console.log('laboratories columns:', columns.map(c => c.Field));
    } catch (error) {
      console.log('laboratories table does not exist');
    }

    // Try to insert a simple test record into syllabus_documents
    try {
      await connection.execute(
        `INSERT IGNORE INTO syllabus_documents 
         (dept, type, title, description, document_url, academic_year, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['test', 'btech', 'Test Document', 'Test description', 'https://example.com/test.pdf', '2024-25', 'approved']
      );
      console.log('Test insert into syllabus_documents successful');
    } catch (error) {
      console.log('Error inserting into syllabus_documents:', error.message);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkAndMigrate();