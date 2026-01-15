const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function setupCivilDatabase() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, '..', 'sql', 'civil_hackathons_gallery.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log('✓ Executed:', statement.substring(0, 50) + '...');
      }
    }

    console.log('✓ Civil database setup completed successfully!');
  } catch (error) {
    console.error('✗ Error setting up civil database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupCivilDatabase();
