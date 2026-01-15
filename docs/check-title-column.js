const mysql = require('mysql2/promise');

async function checkDatabaseTables() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Find tables that might be affected by the title column issue
    console.log('🔍 Checking for tables that might need title column...\n');
    
    // Get all tables
    const [tables] = await connection.execute('SHOW TABLES');
    
    for (const table of tables) {
      const tableName = table[`Tables_in_svec_cms`];
      
      // Focus on tables that might have title issues
      if (tableName.includes('non_teaching') || tableName.includes('cai_') || tableName.includes('teaching') || tableName.includes('staff')) {
        console.log(`📋 Checking table: ${tableName}`);
        
        try {
          const [columns] = await connection.execute(`DESCRIBE \`${tableName}\``);
          const hasTitle = columns.some(col => col.Field === 'title');
          const hasName = columns.some(col => col.Field === 'name');
          
          console.log(`   - Has 'title' column: ${hasTitle ? '✅' : '❌'}`);
          console.log(`   - Has 'name' column: ${hasName ? '✅' : '❌'}`);
          
          if (!hasTitle && hasName) {
            console.log(`   ⚠️  Table ${tableName} has 'name' but missing 'title' column`);
          }
          
          // Show first few columns
          const columnNames = columns.slice(0, 5).map(col => col.Field).join(', ');
          console.log(`   - Columns: ${columnNames}...`);
          console.log('');
          
        } catch (err) {
          console.log(`   ❌ Error checking table: ${err.message}\n`);
        }
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkDatabaseTables();