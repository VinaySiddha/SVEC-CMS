const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function checkTableStructure() {
  const connection = await mysql.createConnection(config);
  
  try {
    // Get the structure of eee_newsletters
    const [columns] = await connection.query('DESCRIBE eee_newsletters');
    console.log('📋 eee_newsletters table structure:');
    columns.forEach(col => {
      console.log(`  ${col.Field} (${col.Type})`);
    });

    console.log('\n');

    // Get all data from eee_newsletters
    const [allData] = await connection.query('SELECT * FROM eee_newsletters');
    console.log(`📊 Total records in eee_newsletters: ${allData.length}`);
    
    // Group by department
    const byDept = {};
    allData.forEach(row => {
      const dept = row.dept || 'unknown';
      if (!byDept[dept]) byDept[dept] = 0;
      byDept[dept]++;
    });
    
    console.log('\n📍 Records by department:');
    Object.entries(byDept).forEach(([dept, count]) => {
      console.log(`  ${dept}: ${count}`);
    });

    // Get EEE specific records
    const [eeeOnly] = await connection.query('SELECT * FROM eee_newsletters WHERE dept = "eee"');
    console.log(`\n🎯 Records for EEE department: ${eeeOnly.length}`);
    if (eeeOnly.length > 0) {
      console.log('Sample:');
      eeeOnly.forEach((row, i) => {
        console.log(`  ${i + 1}. ${row.title} (${row.year})`);
      });
    }

  } finally {
    await connection.end();
  }
}

checkTableStructure();
