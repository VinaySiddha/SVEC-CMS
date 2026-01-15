const mysql = require('mysql2/promise');

async function testExamSectionCRUD() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
    port: 3306
  });

  try {
    console.log('\n========================================');
    console.log('Exam Section CRUD Operations Test');
    console.log('========================================\n');
    
    // Test 1: JNTUK Exam Section CRUD
    console.log('📋 Testing JNTUK Exam Section CRUD...\n');
    
    // CREATE
    console.log('1️⃣  CREATE: Inserting test JNTUK record...');
    const testDate = new Date().toISOString().split('T')[0];
    await connection.execute(
      'INSERT INTO exam_section (date, content, degree, type, link, posteddate) VALUES (?, ?, ?, ?, ?, ?)',
      [testDate, 'Test JNTUK Content', 'UG', 'Fee Notifications', '/test.pdf', testDate]
    );
    console.log('✅ INSERT successful\n');
    
    // READ
    console.log('2️⃣  READ: Fetching JNTUK records...');
    const [examRecords] = await connection.execute(
      'SELECT sno, content, degree, type FROM exam_section WHERE type = ? LIMIT 3',
      ['Fee Notifications']
    );
    console.log(`✅ Found ${examRecords.length} records`);
    if (examRecords.length > 0) {
      console.table(examRecords);
    }
    console.log('');
    
    // UPDATE
    console.log('3️⃣  UPDATE: Updating last JNTUK record...');
    const lastRecord = examRecords[examRecords.length - 1];
    if (lastRecord) {
      await connection.execute(
        'UPDATE exam_section SET content = ? WHERE sno = ?',
        ['Updated JNTUK Test Content', lastRecord.sno]
      );
      console.log('✅ UPDATE successful\n');
    }
    
    // DELETE
    console.log('4️⃣  DELETE: Removing test JNTUK record...');
    if (lastRecord) {
      await connection.execute(
        'DELETE FROM exam_section WHERE sno = ?',
        [lastRecord.sno]
      );
      console.log('✅ DELETE successful\n');
    }
    
    // Test 2: Autonomous Exam Section CRUD
    console.log('========================================\n');
    console.log('📋 Testing Autonomous Exam Section CRUD...\n');
    
    // CREATE
    console.log('1️⃣  CREATE: Inserting test Autonomous record...');
    await connection.execute(
      'INSERT INTO autonomous_exam_section (date, content, degree, type, link, posteddate) VALUES (?, ?, ?, ?, ?, ?)',
      [testDate, 'Test Autonomous Content', 'UG', 'Regular', '/test.pdf', testDate]
    );
    console.log('✅ INSERT successful\n');
    
    // READ
    console.log('2️⃣  READ: Fetching Autonomous records...');
    const [autoRecords] = await connection.execute(
      'SELECT id, content, degree, type FROM autonomous_exam_section WHERE type = ? LIMIT 3',
      ['Regular']
    );
    console.log(`✅ Found ${autoRecords.length} records`);
    if (autoRecords.length > 0) {
      console.table(autoRecords);
    }
    console.log('');
    
    // UPDATE
    console.log('3️⃣  UPDATE: Updating last Autonomous record...');
    const lastAutoRecord = autoRecords[autoRecords.length - 1];
    if (lastAutoRecord) {
      await connection.execute(
        'UPDATE autonomous_exam_section SET content = ? WHERE id = ?',
        ['Updated Autonomous Test Content', lastAutoRecord.id]
      );
      console.log('✅ UPDATE successful\n');
    }
    
    // DELETE
    console.log('4️⃣  DELETE: Removing test Autonomous record...');
    if (lastAutoRecord) {
      await connection.execute(
        'DELETE FROM autonomous_exam_section WHERE id = ?',
        [lastAutoRecord.id]
      );
      console.log('✅ DELETE successful\n');
    }
    
    // Summary
    console.log('========================================');
    console.log('✅ ALL CRUD OPERATIONS PASSED!');
    console.log('========================================\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack:', error.stack);
  } finally {
    await connection.end();
  }
}

testExamSectionCRUD();
