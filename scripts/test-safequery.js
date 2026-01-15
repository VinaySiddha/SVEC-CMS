const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

const safeQuery = async (sql, params = []) => {
  const connection = await mysql.createConnection(config);
  try {
    const [result] = await connection.execute(sql, params);
    await connection.end();
    console.log(`✅ Query succeeded: ${sql.substring(0, 60)}... -> ${result.length} rows`);
    return result;
  } catch (error) {
    await connection.end();
    console.warn(`⚠️ Query failed: ${sql.substring(0, 60)}... -> ${error.message}`);
    return [];
  }
};

async function testQueries() {
  const dept = 'eee';
  const deptPrefix = dept.toLowerCase().replace(/-/g, '_');
  const newslettersTable = `${deptPrefix}_newsletters`;
  const hackathonsGalleryTable = `${deptPrefix}_hackathons_gallery`;

  console.log('Testing the exact queries from the API:\n');

  // Test Newsletter Query
  console.log('1️⃣ Newsletter Query:');
  const q1 = `SELECT * FROM ${newslettersTable} ORDER BY year DESC, id DESC`;
  console.log(`   SQL: ${q1}`);
  const result1 = await safeQuery(q1, []);
  console.log(`   Result length: ${Array.isArray(result1) ? result1.length : 'not an array'}\n`);

  // Test Product Development Gallery Query
  console.log('2️⃣ Product Development Gallery Query:');
  const q2 = `SELECT * FROM ${hackathonsGalleryTable} WHERE category = 'pd' ORDER BY id DESC`;
  console.log(`   SQL: ${q2}`);
  const result2 = await safeQuery(q2, []);
  console.log(`   Result length: ${Array.isArray(result2) ? result2.length : 'not an array'}\n`);
}

testQueries();
