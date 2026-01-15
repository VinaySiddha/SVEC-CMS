import mysql from 'mysql2/promise';

async function checkData() {
  const conn = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('📊 DS Physical Facilities Data Check:\n');
    
    // Check total count
    const [count] = await conn.execute('SELECT COUNT(*) as total, COUNT(DISTINCT category) as categories FROM ds_physical_facilities WHERE dept = ?', ['cse-ds']);
    console.log('Summary:');
    console.table(count);
    
    // Get all records
    const [data] = await conn.execute('SELECT id, category, title FROM ds_physical_facilities WHERE dept = ? ORDER BY category, id', ['cse-ds']);
    console.log('\nAll Records:');
    console.table(data);
    
    // Group by category
    const grouped = {};
    data.forEach(row => {
      if (!grouped[row.category]) grouped[row.category] = 0;
      grouped[row.category]++;
    });
    console.log('\nGrouped by Category:');
    console.table(grouped);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await conn.end();
  }
}

checkData();
