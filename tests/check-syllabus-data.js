const mysql = require('mysql2/promise');

async function checkSyllabusTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database');
    
    // Check table structure
    console.log('\n=== syllabus_documents Table Structure ===');
    const [structure] = await connection.execute('DESCRIBE syllabus_documents');
    structure.forEach(column => {
      console.log(`${column.Field}: ${column.Type} ${column.Null === 'YES' ? '(NULL)' : '(NOT NULL)'} ${column.Key ? `[${column.Key}]` : ''}`);
    });
    
    // Check total records
    console.log('\n=== Total Records ===');
    const [total] = await connection.execute('SELECT COUNT(*) as total FROM syllabus_documents');
    console.log(`Total records: ${total[0].total}`);
    
    // Check records by department
    console.log('\n=== Records by Department ===');
    const [byDept] = await connection.execute('SELECT department, COUNT(*) as count FROM syllabus_documents GROUP BY department');
    byDept.forEach(row => {
      console.log(`${row.department}: ${row.count} records`);
    });
    
    // Check specifically for EEE records
    console.log('\n=== EEE Department Records ===');
    const [eeeRecords] = await connection.execute('SELECT * FROM syllabus_documents WHERE department = ? OR department = ?', ['EEE', 'eee']);
    if (eeeRecords.length > 0) {
      console.log(`Found ${eeeRecords.length} EEE records:`);
      eeeRecords.forEach((record, index) => {
        console.log(`${index + 1}. ${record.title} (${record.regulation} - ${record.semester})`);
      });
    } else {
      console.log('❌ No EEE records found');
    }
    
    // Show sample records
    console.log('\n=== Sample Records (First 5) ===');
    const [sample] = await connection.execute('SELECT title, department, regulation, semester FROM syllabus_documents LIMIT 5');
    sample.forEach((record, index) => {
      console.log(`${index + 1}. ${record.title} - ${record.department} (${record.regulation})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkSyllabusTable();