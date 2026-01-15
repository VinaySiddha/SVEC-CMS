const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function createMBATables() {
  try {
    // Read database config (using same config as the application)
    const dbConfig = {
      host: process.env.MYSQL_HOST || '62.72.31.209',
      user: process.env.MYSQL_USER || 'cmsuser',
      password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
      database: 'svec_cms', // Same database as the application
      port: Number(process.env.MYSQL_PORT) || 3306
    };
    
    console.log('Connecting to database...');
    console.log('Database config:', { ...dbConfig, password: '***' });
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected successfully!');
    
    // Read SQL script
    const sqlScript = fs.readFileSync('./sql/create_mba_tables.sql', 'utf8');
    console.log('SQL script loaded, size:', sqlScript.length, 'characters');
    
    // Split by statements and clean up
    const statements = sqlScript
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => 
        stmt.length > 0 && 
        !stmt.startsWith('--') && 
        !stmt.startsWith('/*') &&
        !stmt.startsWith('SET') &&
        !stmt.startsWith('COMMIT')
      );
    
    console.log('Found', statements.length, 'SQL statements to execute');
    
    // Execute each CREATE TABLE statement
    let tablesCreated = 0;
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          if (statement.includes('CREATE TABLE')) {
            tablesCreated++;
            const tableName = statement.match(/CREATE TABLE[^`]*`([^`]+)`/i)?.[1] || 'unknown';
            console.log(`✅ Created table: ${tableName}`);
          }
        } catch (err) {
          if (err.message.includes('already exists')) {
            console.log(`⚠️  Table already exists (skipping)`);
          } else {
            console.log('❌ Error:', err.message);
            console.log('Statement:', statement.substring(0, 100) + '...');
          }
        }
      }
    }
    
    // Verify tables created
    console.log('\nVerifying MBA tables...');
    const [tables] = await connection.execute("SHOW TABLES LIKE 'mba_%'");
    console.log(`\n🎉 MBA Tables in database: ${tables.length}`);
    
    if (tables.length > 0) {
      console.log('\nCreated tables:');
      tables.forEach((table, index) => {
        const tableName = Object.values(table)[0];
        console.log(`${index + 1}. ${tableName}`);
      });
    }
    
    await connection.end();
    console.log('\n✅ MBA tables setup complete!');
    
  } catch (error) {
    console.error('❌ Error creating MBA tables:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your database credentials in environment variables');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure MySQL server is running');
    }
  }
}

createMBATables();