import fetch from 'node-fetch';

async function testAPI() {
  try {
    console.log('Testing DS Physical Facilities API...\n');
    
    const response = await fetch('http://localhost:3000/api/ds/ds-physical-facilities');
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers));
    
    const data = await response.json();
    console.log('\nAPI Response Data:');
    console.log('Type:', Array.isArray(data) ? 'Array' : typeof data);
    console.log('Length/Keys:', Array.isArray(data) ? data.length : Object.keys(data).length);
    console.log('Data:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testAPI();
