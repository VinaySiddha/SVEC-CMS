const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function createAIMLTables() {
  try {
    // Read database config (using same config as the application)
    const dbConfig = {
      host: process.env.MYSQL_HOST || '62.72.31.209',
      user: process.env.MYSQL_USER || 'cmsuser',
      password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
      database: 'svec_cms', // Same database as the application
      port: Number(process.env.MYSQL_PORT) || 3306
    };
    
    console.log('Connecting to database for AIML tables...');
    console.log('Database config:', { ...dbConfig, password: '***' });
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected successfully!');
    
    // Read SQL script
    const sqlScript = fs.readFileSync('./sql/create_aiml_tables.sql', 'utf8');
    console.log('AIML SQL script loaded, size:', sqlScript.length, 'characters');
    
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
    let insertsExecuted = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          
          if (statement.includes('CREATE TABLE')) {
            tablesCreated++;
            const tableName = statement.match(/CREATE TABLE[^`]*`([^`]+)`/i)?.[1] || 'unknown';
            console.log(`✅ Created table: ${tableName}`);
          } else if (statement.includes('INSERT INTO')) {
            insertsExecuted++;
            const tableName = statement.match(/INSERT INTO[^`]*`([^`]+)`/i)?.[1] || 'unknown';
            console.log(`📝 Inserted sample data into: ${tableName}`);
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
    console.log('\nVerifying AIML tables...');
    const [tables] = await connection.execute("SHOW TABLES LIKE 'aiml_%'");
    console.log(`\n🎉 AIML Tables in database: ${tables.length}`);
    
    if (tables.length > 0) {
      console.log('\nCreated AIML tables:');
      tables.forEach((table, index) => {
        const tableName = Object.values(table)[0];
        console.log(`${index + 1}. ${tableName}`);
      });
      
      // Check sample data
      console.log('\nChecking sample data...');
      const [facultyCount] = await connection.execute("SELECT COUNT(*) as count FROM aiml_faculty");
      const [overviewCount] = await connection.execute("SELECT COUNT(*) as count FROM aiml_department_overview");
      const [achievementsCount] = await connection.execute("SELECT COUNT(*) as count FROM aiml_student_achievements");
      
      console.log(`Faculty records: ${facultyCount[0].count}`);
      console.log(`Overview records: ${overviewCount[0].count}`);
      console.log(`Student achievements: ${achievementsCount[0].count}`);
    }
    
    await connection.end();
    console.log('\n✅ AIML tables setup complete!');
    console.log('📊 Summary:');
    console.log(`   - Tables created: ${tablesCreated}`);
    console.log(`   - Sample data inserted: ${insertsExecuted} records`);
    console.log('\nYou can now test the AIML department page at: http://localhost:9002/departments/aiml');
    
  } catch (error) {
    console.error('❌ Error creating AIML tables:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your database credentials in environment variables');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure MySQL server is running');
    }
  }
}

createAIMLTables();