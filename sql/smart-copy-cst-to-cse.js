const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  multipleStatements: true
};

async function smartCopyTables() {
  let connection;
  
  try {
    console.log('🔄 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully!\n');
    
    // First, get all existing CST tables
    console.log('🔍 Finding existing CST tables...');
    const [cstTables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'svec_cms' 
      AND TABLE_NAME LIKE 'cst_%' 
      ORDER BY TABLE_NAME
    `);
    
    console.log(`📋 Found ${cstTables.length} CST tables:`);
    cstTables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.TABLE_NAME}`);
    });
    console.log();
    
    // Now copy each CST table to its CSE equivalent
    let successCount = 0;
    let errorCount = 0;
    let skipCount = 0;
    
    for (const tableInfo of cstTables) {
      const cstTableName = tableInfo.TABLE_NAME;
      const cseTableName = cstTableName.replace('cst_', 'cse_');
      
      try {
        console.log(`🔄 Processing: ${cstTableName} → ${cseTableName}`);
        
        // Check if CSE table already exists
        const [existingTables] = await connection.execute(`
          SELECT TABLE_NAME 
          FROM information_schema.TABLES 
          WHERE TABLE_SCHEMA = 'svec_cms' 
          AND TABLE_NAME = ?
        `, [cseTableName]);
        
        if (existingTables.length > 0) {
          console.log(`   ⏭️  ${cseTableName} already exists, skipping creation`);
          skipCount++;
        } else {
          // Create CSE table with same structure as CST table
          await connection.execute(`CREATE TABLE ${cseTableName} LIKE ${cstTableName}`);
          console.log(`   ✅ Created table: ${cseTableName}`);
        }
        
        // Copy data from CST to CSE table
        const [result] = await connection.execute(`INSERT IGNORE INTO ${cseTableName} SELECT * FROM ${cstTableName}`);
        console.log(`   📝 Copied ${result.affectedRows} rows to ${cseTableName}`);
        
        successCount++;
        
      } catch (error) {
        console.error(`   ❌ Error with ${cstTableName}: ${error.message}`);
        errorCount++;
      }
      
      console.log(); // Empty line for readability
    }
    
    console.log('🎉 Copy operation completed!\n');
    console.log(`✅ Successfully processed: ${successCount} tables`);
    console.log(`⏭️  Skipped (already existed): ${skipCount} tables`);
    console.log(`❌ Failed: ${errorCount} tables\n`);
    
    // Show final verification
    console.log('📊 Final verification - All CSE tables:');
    const [finalTables] = await connection.execute(`
      SELECT 
        TABLE_NAME as 'Table Name', 
        TABLE_ROWS as 'Estimated Rows',
        ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) as 'Size (MB)'
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'svec_cms' 
      AND TABLE_NAME LIKE 'cse_%' 
      ORDER BY TABLE_NAME
    `);
    
    console.table(finalTables);
    
    // Show key tables data summary
    console.log('\n📈 Key tables summary:');
    const keyTables = ['cse_sahaya_events', 'cse_faculty', 'cse_student_achievements', 'cse_placements', 'cse_workshops'];
    
    for (const tableName of keyTables) {
      try {
        const [count] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
        console.log(`   ${tableName}: ${count[0].count} records`);
      } catch (error) {
        console.log(`   ${tableName}: Table not found`);
      }
    }
    
  } catch (error) {
    console.error('❌ Database operation failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed.');
    }
  }
}

// Run the script
smartCopyTables().catch(console.error);