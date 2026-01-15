import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms',
    });

    console.log('Connected to database');

    // Read and execute the SQL file
    const sqlFile = path.join(__dirname, 'sql', 'mba_industrial_visits.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 80) + '...');
        await connection.execute(statement);
      }
    }

    console.log('✅ Migration completed successfully!');

    // Verify the table was created
    const [tables] = await connection.execute(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'mba_industrial_visits'`
    );

    if (tables && tables.length > 0) {
      console.log('✅ Table mba_industrial_visits created successfully');

      // Check data
      const [rows] = await connection.execute('SELECT COUNT(*) as count FROM mba_industrial_visits');
      console.log(`✅ Table contains ${rows[0].count} records`);
    } else {
      console.log('❌ Table creation failed');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
