const mysql = require('mysql2/promise');

async function checkRsacTable() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
    port: 3306
  });

  try {
    console.log('\n=== Checking RSAC Table ===\n');
    
    // Check if table exists
    const [tables] = await connection.execute(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'rsac_items'`
    );
    
    if (tables.length === 0) {
      console.log('❌ rsac_items table does NOT exist');
      console.log('\n📝 Creating rsac_items table...');
      
      await connection.execute(`
        CREATE TABLE rsac_items (
          id INT AUTO_INCREMENT PRIMARY KEY,
          date DATE NOT NULL,
          content VARCHAR(500) NOT NULL,
          link VARCHAR(500),
          degree VARCHAR(10) NOT NULL CHECK (degree IN ('UG', 'PG')),
          type VARCHAR(50) NOT NULL CHECK (type IN ('syllabus', 'regulations', 'academic-calendar')),
          posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          deleted_at TIMESTAMP NULL,
          INDEX idx_degree (degree),
          INDEX idx_type (type),
          INDEX idx_deleted (deleted_at)
        )
      `);
      
      console.log('✅ rsac_items table created successfully');
    } else {
      console.log('✅ rsac_items table exists');
      
      // Show schema
      const [schema] = await connection.execute('DESCRIBE rsac_items');
      console.log('\nTable Schema:');
      console.table(schema);
      
      // Count records
      const [count] = await connection.execute('SELECT COUNT(*) as total FROM rsac_items WHERE deleted_at IS NULL');
      console.log(`\nTotal Records: ${count[0].total}`);
      
      // Show sample records
      if (count[0].total > 0) {
        const [records] = await connection.execute(
          'SELECT id, date, content, degree, type, posted_date FROM rsac_items WHERE deleted_at IS NULL LIMIT 5'
        );
        console.log('\nSample Records:');
        console.table(records);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

checkRsacTable();
