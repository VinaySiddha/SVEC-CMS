const http = require('http');

// Test admin authentication and CRUD operations
async function testAIMLDashboardAuth() {
    const baseURL = 'localhost:9002';
    
    console.log('🔍 Testing AIML Dashboard Authentication & CRUD');
    console.log('================================================');
    
    // Step 1: Admin Login
    console.log('\n1. Testing Admin Login...');
    
    const loginData = JSON.stringify({
        email: 'admin@svec.education',
        password: 'admin123'
    });
    
    const loginOptions = {
        hostname: 'localhost',
        port: 9002,
        path: '/api/admin/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(loginData)
        }
    };
    
    try {
        const loginResult = await makeRequest(loginOptions, loginData);
        console.log('✅ Login Response Status:', loginResult.status);
        
        if (loginResult.status === 200) {
            const loginResponse = JSON.parse(loginResult.body);
            console.log('✅ Login successful for user:', loginResponse.user?.email);
            
            // Check if token is in response body
            if (loginResponse.token) {
                console.log('✅ Token found in response body:', loginResponse.token.substring(0, 20) + '...');
                
                // Step 2: Test CRUD with Authorization header
                console.log('\n2. Testing CRUD Operations with Authorization Bearer Token...');
                
                const testModule = 'faculty';
                const testURL = `/api/admin/departments/aiml/${testModule}`;
                
                // Test GET request
                const getOptions = {
                    hostname: 'localhost',
                    port: 9002,
                    path: testURL,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${loginResponse.token}`,
                        'Content-Type': 'application/json'
                    }
                };
                
                const getResult = await makeRequest(getOptions);
                console.log('GET Request Status:', getResult.status);
                
                if (getResult.status === 200) {
                    const data = JSON.parse(getResult.body);
                    console.log('✅ GET Success - Records found:', Array.isArray(data) ? data.length : 'Unknown structure');
                    console.log('Sample response keys:', Object.keys(data).slice(0, 5));
                } else {
                    console.log('❌ GET Failed - Response:', getResult.body.substring(0, 500));
                }
                
                // Step 3: Test structure endpoint
                console.log('\n3. Testing Structure Endpoint...');
                
                const structureOptions = {
                    hostname: 'localhost',
                    port: 9002,
                    path: `${testURL}/structure`,
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${loginResponse.token}`,
                        'Content-Type': 'application/json'
                    }
                };
                
                const structureResult = await makeRequest(structureOptions);
                console.log('Structure Request Status:', structureResult.status);
                
                if (structureResult.status === 200) {
                    const structureData = JSON.parse(structureResult.body);
                    console.log('✅ Structure Success - Fields found:', structureData?.fields?.length || 'Unknown');
                    if (structureData?.fields?.length > 0) {
                        console.log('Sample fields:', structureData.fields.slice(0, 3).map(f => f.name || f));
                    }
                } else {
                    console.log('❌ Structure Failed - Response:', structureResult.body.substring(0, 500));
                }
                
            } else {
                console.log('❌ No token found in response body');
                console.log('Response keys:', Object.keys(loginResponse));
            }
        } else {
            console.log('❌ Login failed - Status:', loginResult.status);
            console.log('Error response:', loginResult.body.substring(0, 500));
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (data) {
            req.write(data);
        }
        
        req.end();
    });
}

// Run the test
testAIMLDashboardAuth().catch(console.error);