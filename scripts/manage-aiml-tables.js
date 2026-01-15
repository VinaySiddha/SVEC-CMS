const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function manageAIMLTables() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    // Get all tables
    const [allTables] = await connection.query("SHOW TABLES");
    console.log('📋 All tables in database:');
    const tableNames = allTables.map(t => Object.values(t)[0]);
    console.log(tableNames);
    console.log();

    // Filter cai_ and aiml_ tables
    const caiTables = tableNames.filter(t => t.startsWith('cai_'));
    const aimlTables = tableNames.filter(t => t.startsWith('aiml_'));

    console.log('🔵 CAI_ tables found:');
    console.log(caiTables);
    console.log();

    console.log('🔴 AIML_ tables found:');
    console.log(aimlTables);
    console.log();

    // Drop all aiml_ tables
    if (aimlTables.length > 0) {
      console.log('🗑️  Dropping AIML_ tables...');
      for (const table of aimlTables) {
        await connection.query(`DROP TABLE IF EXISTS ${table}`);
        console.log(`  ✅ Dropped ${table}`);
      }
      console.log();
    }

    // Create aiml_ tables by copying cai_ tables
    if (caiTables.length > 0) {
      console.log('📋 Creating AIML_ tables from CAI_ tables...');
      for (const caiTable of caiTables) {
        const aimlTable = caiTable.replace('cai_', 'aiml_');
        
        // Create new table structure
        await connection.query(`CREATE TABLE ${aimlTable} LIKE ${caiTable}`);
        
        // Copy data
        await connection.query(`INSERT INTO ${aimlTable} SELECT * FROM ${caiTable}`);
        
        console.log(`  ✅ Created ${aimlTable} and copied data from ${caiTable}`);
      }
      console.log();
    }

    // Verify the new tables
    const [newTables] = await connection.query("SHOW TABLES LIKE 'aiml_%'");
    console.log(`✅ Total AIML_ tables created: ${newTables.length}`);
    console.log('📋 Created AIML_ tables:');
    newTables.forEach(t => {
      const tableName = Object.values(t)[0];
      console.log(`  - ${tableName}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

manageAIMLTables();
