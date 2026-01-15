const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

async function checkAIMLTables() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    // Check all aiml_ tables
    const [tables] = await connection.execute(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME LIKE 'aiml_%'",
      [dbConfig.database]
    );

    console.log('📋 All AIML tables:');
    tables.forEach(t => {
      console.log(`  - ${t.TABLE_NAME}`);
    });

    console.log('\n');

    // Check for specific tables
    const tableNames = ['aiml_eresources', 'aiml_department_library', 'aiml_newsletters'];
    for (const tableName of tableNames) {
      const [count] = await connection.execute(
        `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
        [dbConfig.database, tableName]
      );
      const exists = count[0].count > 0;
      console.log(`${exists ? '✅' : '❌'} ${tableName}: ${exists ? 'EXISTS' : 'NOT FOUND'}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

checkAIMLTables();
