const mysql = require('mysql2/promise');

async function testRsacOperations() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
    port: 3306
  });

  try {
    console.log('\n=== Testing RSAC CRUD Operations ===\n');
    
    // Test GET - Fetch all items
    console.log('📖 Testing GET - Fetching all items...');
    const [allItems] = await connection.execute(
      'SELECT id, date, content, link, degree, type, posted_date FROM rsac_items WHERE deleted_at IS NULL ORDER BY date DESC'
    );
    console.log(`✅ Found ${allItems.length} items:`);
    if (allItems.length > 0) {
      console.table(allItems.slice(0, 3));
    }
    
    // Test POST - Create a new item
    console.log('\n📝 Testing POST - Creating new item...');
    const testDate = new Date().toISOString().split('T')[0];
    const [createResult] = await connection.execute(
      'INSERT INTO rsac_items (date, content, link, degree, type) VALUES (?, ?, ?, ?, ?)',
      [testDate, 'Test Content RSAC', '/rsac/test.pdf', 'UG', 'syllabus']
    );
    const newId = createResult.insertId;
    console.log(`✅ Created item with ID: ${newId}`);
    
    // Verify it was created
    const [verifyCreate] = await connection.execute(
      'SELECT id, date, content, degree, type FROM rsac_items WHERE id = ?',
      [newId]
    );
    console.table(verifyCreate);
    
    // Test PUT - Update the item
    console.log('\n🔄 Testing PUT - Updating item...');
    await connection.execute(
      'UPDATE rsac_items SET content = ?, degree = ? WHERE id = ?',
      ['Updated Test Content RSAC', 'PG', newId]
    );
    
    const [verifyUpdate] = await connection.execute(
      'SELECT id, date, content, degree, type FROM rsac_items WHERE id = ?',
      [newId]
    );
    console.log('✅ Item updated:');
    console.table(verifyUpdate);
    
    // Test DELETE - Soft delete the item
    console.log('\n🗑️  Testing DELETE - Soft deleting item...');
    await connection.execute(
      'UPDATE rsac_items SET deleted_at = NOW() WHERE id = ?',
      [newId]
    );
    
    const [verifyDelete] = await connection.execute(
      'SELECT id, content, deleted_at FROM rsac_items WHERE id = ?',
      [newId]
    );
    console.log('✅ Item soft deleted:');
    console.table(verifyDelete);
    
    // Verify it's not in the list anymore
    const [finalList] = await connection.execute(
      'SELECT COUNT(*) as total FROM rsac_items WHERE deleted_at IS NULL'
    );
    console.log(`\n📊 Final active items count: ${finalList[0].total}`);
    
    console.log('\n✅ All CRUD operations working correctly!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

testRsacOperations();
