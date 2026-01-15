const mysql = require('mysql2/promise');

async function checkExamSectionTables() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
    port: 3306
  });

  try {
    console.log('\n=== Exam Section Database Check ===\n');
    
    // Check exam_section table
    console.log('📋 Checking exam_section table...');
    const [examTables] = await connection.execute(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'exam_section'`
    );
    
    if (examTables.length === 0) {
      console.log('❌ exam_section table does NOT exist');
    } else {
      console.log('✅ exam_section table exists');
      const [schema] = await connection.execute('DESCRIBE exam_section');
      console.log('\nSchema:');
      console.table(schema);
      
      const [count] = await connection.execute('SELECT COUNT(*) as total FROM exam_section');
      console.log(`\nTotal Records: ${count[0].total}`);
    }
    
    // Check autonomous_exam_section table
    console.log('\n📋 Checking autonomous_exam_section table...');
    const [autoTables] = await connection.execute(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'autonomous_exam_section'`
    );
    
    if (autoTables.length === 0) {
      console.log('❌ autonomous_exam_section table does NOT exist');
    } else {
      console.log('✅ autonomous_exam_section table exists');
      const [schema] = await connection.execute('DESCRIBE autonomous_exam_section');
      console.log('\nSchema:');
      console.table(schema);
      
      const [count] = await connection.execute('SELECT COUNT(*) as total FROM autonomous_exam_section');
      console.log(`\nTotal Records: ${count[0].total}`);
    }
    
    // Check rsac_items table
    console.log('\n📋 Checking rsac_items table...');
    const [rsacTables] = await connection.execute(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'rsac_items'`
    );
    
    if (rsacTables.length === 0) {
      console.log('❌ rsac_items table does NOT exist');
    } else {
      console.log('✅ rsac_items table exists');
      const [count] = await connection.execute('SELECT COUNT(*) as total FROM rsac_items WHERE deleted_at IS NULL');
      console.log(`Total Active Records: ${count[0].total}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

checkExamSectionTables();
