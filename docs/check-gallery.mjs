import mysql from 'mysql2/promise';

async function checkGalleryData() {
  const conn = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('📊 DS Hackathons Gallery Data Check:\n');

    // Check all distinct categories
    const [categories] = await conn.execute('SELECT DISTINCT category FROM ds_hackathons_gallery ORDER BY category');
    console.log('All Categories in ds_hackathons_gallery:');
    if (categories.length === 0) {
      console.log('  (No categories found)');
    } else {
      categories.forEach((c) => console.log('  -', c.category));
    }

    // Check laboratory records
    const [labRecords] = await conn.execute('SELECT id, title, category FROM ds_hackathons_gallery WHERE category LIKE "%laboratory%" OR category LIKE "%laboratories%" ORDER BY id');
    console.log('\nLaboratory Records (case-insensitive):');
    if (labRecords.length === 0) {
      console.log('  (No laboratory records found)');
    } else {
      console.table(labRecords);
    }

    // Get total count
    const [count] = await conn.execute('SELECT COUNT(*) as total FROM ds_hackathons_gallery');
    console.log('\nTotal records:', count[0].total);

    // Check data structure
    const [sample] = await conn.execute('SELECT * FROM ds_hackathons_gallery LIMIT 1');
    if (sample.length > 0) {
      console.log('\nSample Record Keys:');
      console.log(Object.keys(sample[0]));
      console.log('\nSample Record (first one):');
      console.log(JSON.stringify(sample[0], null, 2));
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await conn.end();
  }
}

checkGalleryData();
