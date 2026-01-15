const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Database configuration (same as dbPool.ts)
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  multipleStatements: true
};

async function copyTables() {
  let connection;
  
  try {
    console.log('🔄 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to database successfully!');
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'copy_all_cst_to_cse_tables.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('🔄 Executing SQL script to copy CST tables to CSE...');
    
    // Split SQL into individual statements and execute them
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim() === '') continue;
      
      try {
        const [rows] = await connection.execute(statement);
        
        // Log progress for SELECT statements
        if (statement.toUpperCase().includes('SELECT')) {
          if (Array.isArray(rows) && rows.length > 0) {
            console.log('📊', rows[0]);
          }
        }
        
        // Log table creation
        if (statement.toUpperCase().includes('CREATE TABLE')) {
          const tableName = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/i);
          if (tableName) {
            console.log(`✅ Created table: ${tableName[1]}`);
          }
        }
        
        // Log data insertion
        if (statement.toUpperCase().includes('INSERT IGNORE INTO')) {
          const tableName = statement.match(/INSERT IGNORE INTO (\w+)/i);
          if (tableName) {
            console.log(`📝 Copied data to: ${tableName[1]}`);
          }
        }
        
        successCount++;
      } catch (error) {
        console.error(`❌ Error executing statement: ${statement.substring(0, 50)}...`);
        console.error(`   Error: ${error.message}`);
        errorCount++;
      }
    }
    
    console.log('\n🎉 Copy operation completed!');
    console.log(`✅ Successful operations: ${successCount}`);
    console.log(`❌ Failed operations: ${errorCount}`);
    
    // Final verification - show all CSE tables
    console.log('\n📋 Verifying CSE tables created:');
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME, TABLE_ROWS 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'svec_cms' 
      AND TABLE_NAME LIKE 'cse_%' 
      ORDER BY TABLE_NAME
    `);
    
    console.table(tables);
    
  } catch (error) {
    console.error('❌ Database operation failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed.');
    }
  }
}

// Run the script
copyTables().catch(console.error);