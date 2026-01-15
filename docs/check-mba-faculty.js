const mysql = require('mysql2/promise');

async function checkTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'svec_cms',
  });

  try {
    // Check table structure
    console.log('\n=== MBA Faculty Table Structure ===');
    const [columns] = await connection.execute('DESCRIBE mba_faculty');
    console.table(columns);

    // Check if data exists
    console.log('\n=== First 3 records in mba_faculty ===');
    const [rows] = await connection.execute('SELECT * FROM mba_faculty LIMIT 3');
    console.table(rows);

    // Check column names
    console.log('\n=== Column names ===');
    const [structureInfo] = await connection.execute(`
      SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'mba_faculty' AND TABLE_SCHEMA = DATABASE()
    `);
    console.table(structureInfo);
  } finally {
    await connection.end();
  }
}

checkTable().catch(console.error);
