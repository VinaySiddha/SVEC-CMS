const http = require('http');

async function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/public/departments/eee',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('✅ API Response received');
          console.log(`📰 Newsletters: ${jsonData.data.newsletters ? jsonData.data.newsletters.length : 0} records`);
          console.log(`🎨 Product Development Gallery: ${jsonData.data.productDevelopmentGallery ? jsonData.data.productDevelopmentGallery.length : 0} records`);
          
          if (jsonData.data.newsletters && jsonData.data.newsletters.length > 0) {
            console.log('\n📋 Sample Newsletters:');
            jsonData.data.newsletters.slice(0, 3).forEach((item, i) => {
              console.log(`  ${i + 1}. ${item.title}`);
            });
          }
          
          resolve(jsonData);
        } catch (err) {
          console.error('❌ Failed to parse response:', err.message);
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ API request failed:', err.message);
      reject(err);
    });

    req.end();
  });
}

testAPI().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
