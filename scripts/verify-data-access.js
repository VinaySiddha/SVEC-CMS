const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function testDirectAccess() {
  const connection = await mysql.createConnection(config);
  
  try {
    // Test that both tables exist and have data
    const [newsletters] = await connection.query('SELECT COUNT(*) as count FROM eee_newsletters');
    console.log(`✅ eee_newsletters: ${newsletters[0].count} records`);

    const [pdGallery] = await connection.query('SELECT COUNT(*) as count FROM eee_hackathons_gallery WHERE category = "pd"');
    console.log(`✅ eee_hackathons_gallery (pd category): ${pdGallery[0].count} records`);

    // Test the exact queries used in the API
    console.log('\nTesting exact API queries:\n');

    const [rows1] = await connection.query('SELECT * FROM eee_newsletters ORDER BY year DESC, id DESC LIMIT 3');
    console.log('Query 1 - SELECT * FROM eee_newsletters ORDER BY year DESC, id DESC');
    console.log(`Result: ${rows1.length} rows`);
    if (rows1.length > 0) {
      console.log('Sample:', rows1[0]);
    }

    console.log('\n');

    const [rows2] = await connection.query('SELECT * FROM eee_hackathons_gallery WHERE category = "pd" ORDER BY id DESC LIMIT 3');
    console.log('Query 2 - SELECT * FROM eee_hackathons_gallery WHERE category = "pd" ORDER BY id DESC');
    console.log(`Result: ${rows2.length} rows`);
    if (rows2.length > 0) {
      console.log('Sample:', rows2[0]);
    }

  } finally {
    await connection.end();
  }
}

testDirectAccess();
