const mysql = require('mysql2/promise');

async function removeTrainingActivities() {
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('Connected to database...\n');

    // Delete Training Activities module for cseai
    const deleteQuery = "DELETE FROM department_modules WHERE name = 'Training Activities' AND dept = 'cseai'";
    const [result] = await connection.execute(deleteQuery);
    
    console.log(`✅ Successfully deleted ${result.affectedRows} Training Activities module(s) for CSE-AI\n`);

    // Verify the deletion
    const [remainingModules] = await connection.execute("SELECT * FROM department_modules WHERE dept = 'cseai' ORDER BY position");
    console.log('📊 Remaining CSE-AI modules:');
    console.table(remainingModules);

    await connection.end();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

removeTrainingActivities();
