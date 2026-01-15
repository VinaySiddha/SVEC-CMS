const http = require('http');

async function testRsacApi() {
  console.log('\n=== Testing RSAC API Endpoints ===\n');
  
  // Test GET endpoint
  console.log('Testing GET /api/exam-section/rsac...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/exam-section/rsac',
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Response:');
        try {
          const parsed = JSON.parse(data);
          console.log(JSON.stringify(parsed, null, 2));
        } catch (e) {
          console.log(data);
        }
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.error('Error:', error.message);
      console.log('\n⚠️  Make sure the dev server is running on port 3000');
      resolve();
    });
    
    req.end();
  });
}

testRsacApi();
