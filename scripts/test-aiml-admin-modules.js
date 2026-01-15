#!/usr/bin/env node

/**
 * AIML Admin Dashboard - Module Testing Script (Authenticated)
 * Tests all mapped table modules by adding and deleting dummy data
 * 
 * This script will:
 * 1. Authenticate with admin credentials
 * 2. Test all AIML admin dashboard modules
 * 3. Add dummy data to each table
 * 4. Verify data was added correctly
 * 5. Delete the dummy data
 * 6. Provide a comprehensive test report
 */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  baseUrl: 'http://localhost:9002',
  department: 'aiml',
  timeout: 15000,
  // Test credentials (you can override these)
  adminEmail: process.env.ADMIN_EMAIL || 'admin@svec.edu.in',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  // Cookie storage for authentication
  authCookie: null
};

// All AIML modules from the dashboard configuration
const AIML_MODULES = [
  { key: 'bos-members', name: 'BOS Members', table: 'aiml_bos_members' },
  { key: 'bos-minutes', name: 'BOS Minutes', table: 'aiml_bos_minutes' },
  { key: 'department-overview', name: 'Department Overview', table: 'aiml_department_overview' },
  { key: 'extra-curricular', name: 'Extra-Curricular', table: 'aiml_extra_curricular' },
  { key: 'faculty', name: 'Faculty', table: 'aiml_faculty' },
  { key: 'faculty-achievements', name: 'Faculty Achievements', table: 'aiml_faculty_achievements' },
  { key: 'faculty-development', name: 'Faculty Development', table: 'aiml_faculty_development' },
  { key: 'hackathons', name: 'Hackathons', table: 'aiml_hackathons' },
  { key: 'hackathons-gallery', name: 'Hackathons Gallery', table: 'aiml_hackathons_gallery' },
  { key: 'handbooks', name: 'Handbooks', table: 'aiml_handbooks' },
  { key: 'mous', name: 'MOUs', table: 'aiml_mous' },
  { key: 'physical-facilities', name: 'Physical Facilities', table: 'aiml_physical_facilities' },
  { key: 'placements', name: 'Placements', table: 'aiml_placements' },
  { key: 'student-achievements', name: 'Student Achievements', table: 'aiml_student_achievements' },
  { key: 'syllabus', name: 'Syllabus', table: 'aiml_syllabus' },
  { key: 'technical-faculty', name: 'Technical Faculty', table: 'aiml_technical_faculty' },
  { key: 'workshops', name: 'Workshops', table: 'aiml_workshops' },
  { key: 'technical-association', name: 'Technical Association', table: 'aiml_technical_association' },
  { key: 'staff', name: 'Staff', table: 'aiml_staff' },
  { key: 'academic-toppers', name: 'Academic Toppers', table: 'aiml_academictoppers' }
];

// Dummy data templates for different module types
const dummyDataTemplates = {
  'bos-members': {
    name: 'Dr. Test Member',
    designation: 'Professor',
    organization: 'SVEC',
    position_in_job: 'Chairman',
    qualification: 'PhD in Computer Science'
  },
  'bos-minutes': {
    meeting_no: 'Test Meeting #1',
    meeting_date: '2024-01-15',
    file_url: 'https://example.com/test-minutes.pdf'
  },
  'department-overview': {
    hod_name: 'Dr. Test HOD',
    hod_qualification: 'PhD in AI/ML',
    hod_email: 'test.hod@svec.edu.in',
    hod_image_url: 'https://example.com/test-hod.jpg',
    description: 'Test department overview description'
  },
  'extra-curricular': {
    title: 'Test Extra-Curricular Activity',
    category: 'Cultural',
    year: '2024-25',
    file_url: 'https://example.com/test-activity.pdf',
    description: 'Test activity description'
  },
  'faculty': {
    name: 'Dr. Test Faculty',
    qualification: 'PhD in Computer Science',
    designation: 'Associate Professor',
    profile_url: 'https://example.com/test-profile.pdf',
    faculty_type: 'teaching'
  },
  'faculty-achievements': {
    title: 'Test Faculty Achievement',
    category: 'Research',
    year: '2024',
    file_url: 'https://example.com/test-achievement.pdf',
    description: 'Test achievement description'
  },
  'faculty-development': {
    title: 'Test FDP Program',
    category: 'Workshop',
    year: '2024',
    file_url: 'https://example.com/test-fdp.pdf',
    description: 'Test FDP description'
  },
  'hackathons': {
    title: 'Test Hackathon',
    category: 'Programming',
    year: '2024',
    file_url: 'https://example.com/test-hackathon.pdf'
  },
  'hackathons-gallery': {
    title: 'Test Hackathon Gallery',
    academic_year: '2024-25',
    gallery: 'https://example.com/test-gallery1.jpg,https://example.com/test-gallery2.jpg'
  },
  'handbooks': {
    title: 'Test Handbook',
    academic_year: '2024-25',
    semester: 'I',
    file_url: 'https://example.com/test-handbook.pdf'
  },
  'mous': {
    organization_name: 'Test Organization',
    from_date: '2024-01-01',
    to_date: '2025-01-01'
  },
  'physical-facilities': {
    category: 'Laboratories',
    title: 'Test Lab Facility',
    description: 'Test lab description',
    file_url: 'https://example.com/test-facility.pdf'
  },
  'placements': {
    company: 'Test Company',
    batch: '2024',
    status: 'Placed',
    salary: '600000',
    file_url: 'https://example.com/test-placement.pdf'
  },
  'student-achievements': {
    title: 'Test Student Achievement',
    category: 'Academic',
    file_url: 'https://example.com/test-student-achievement.pdf',
    description: 'Test student achievement description'
  },
  'syllabus': {
    title: 'Test Syllabus',
    type: 'btech',
    academic_year: '2024-25',
    file_url: 'https://example.com/test-syllabus.pdf'
  },
  'technical-faculty': {
    name: 'Test Technical Staff',
    designation: 'Technical Assistant'
  },
  'workshops': {
    title: 'Test Workshop',
    category: 'Technical',
    year: '2024',
    file_url: 'https://example.com/test-workshop.pdf'
  },
  'technical-association': {
    title: 'Test Technical Association',
    category: 'Professional',
    year: '2024',
    file_url: 'https://example.com/test-association.pdf'
  },
  'staff': {
    name: 'Test Staff Member',
    designation: 'Lab Assistant'
  },
  'academic-toppers': {
    academic_year: '2024-25',
    particulars: 'Test Merit Scholarship',
    students_benefited: 5,
    scholarship_amount: 50000
  }
};

// HTTP request helper with cookie support
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestModule = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      timeout: config.timeout
    };

    // Add authentication cookie if available
    if (config.authCookie) {
      requestOptions.headers['Cookie'] = config.authCookie;
    }

    const req = requestModule.request(requestOptions, (res) => {
      let data = '';
      
      // Capture Set-Cookie headers for authentication
      if (res.headers['set-cookie']) {
        const cookies = res.headers['set-cookie'];
        const authCookie = cookies.find(cookie => cookie.includes('admin_token='));
        if (authCookie) {
          config.authCookie = authCookie.split(';')[0]; // Just get the token part
        }
      }
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            data: parsedData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Authentication function
async function authenticateAdmin() {
  console.log('\n🔐 Authenticating admin user...');
  console.log(`📧 Email: ${config.adminEmail}`);
  
  try {
    const loginUrl = `${config.baseUrl}/api/admin/auth/login`;
    const loginData = {
      email: config.adminEmail,
      password: config.adminPassword
    };
    
    const response = await makeRequest(loginUrl, {
      method: 'POST',
      body: loginData
    });
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Authentication successful!');
      console.log(`👤 User: ${response.data.user?.name || 'Unknown'}`);
      console.log(`🎭 Role: ${response.data.user?.role || 'Unknown'}`);
      console.log(`🏢 Department: ${response.data.user?.department || 'Unknown'}`);
      return true;
    } else {
      console.log('❌ Authentication failed:', response.data?.error || 'Unknown error');
      console.log('📊 Status Code:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Authentication error:', error.message);
    return false;
  }
}

// Test results tracking
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  details: []
};

// Test a single module
async function testModule(module) {
  const moduleTest = {
    module: module.name,
    key: module.key,
    table: module.table,
    tests: {
      structure: { status: 'pending', message: '', duration: 0 },
      create: { status: 'pending', message: '', duration: 0 },
      read: { status: 'pending', message: '', duration: 0 },
      delete: { status: 'pending', message: '', duration: 0 }
    },
    createdId: null
  };

  console.log(`\n🧪 Testing module: ${module.name} (${module.key})`);
  console.log(`📊 Table: ${module.table}`);

  // Test 1: Check table structure
  try {
    const startTime = Date.now();
    const structureUrl = `${config.baseUrl}/api/admin/departments/${config.department}/${module.key}/structure`;
    console.log(`   📋 Checking structure: GET ${structureUrl}`);
    
    const structureResponse = await makeRequest(structureUrl);
    const duration = Date.now() - startTime;
    
    if (structureResponse.status === 200) {
      moduleTest.tests.structure.status = 'passed';
      moduleTest.tests.structure.message = `Structure retrieved (${Object.keys(structureResponse.data?.fields || {}).length} fields)`;
      moduleTest.tests.structure.duration = duration;
      console.log(`   ✅ Structure check passed (${duration}ms)`);
    } else {
      moduleTest.tests.structure.status = 'failed';
      moduleTest.tests.structure.message = `HTTP ${structureResponse.status}`;
      moduleTest.tests.structure.duration = duration;
      console.log(`   ❌ Structure check failed: HTTP ${structureResponse.status}`);
    }
  } catch (error) {
    moduleTest.tests.structure.status = 'failed';
    moduleTest.tests.structure.message = error.message;
    console.log(`   ❌ Structure check error: ${error.message}`);
  }

  // Test 2: Create dummy data
  const dummyData = dummyDataTemplates[module.key] || {
    title: `Test ${module.name}`,
    name: `Test ${module.name}`,
    description: `Test data for ${module.name} module`,
    created_at: new Date().toISOString()
  };

  try {
    const startTime = Date.now();
    const createUrl = `${config.baseUrl}/api/admin/departments/${config.department}/${module.key}`;
    console.log(`   ➕ Creating record: POST ${createUrl}`);
    
    const createResponse = await makeRequest(createUrl, {
      method: 'POST',
      body: dummyData
    });
    const duration = Date.now() - startTime;
    
    if (createResponse.status === 200 || createResponse.status === 201) {
      moduleTest.createdId = createResponse.data?.id || createResponse.data?.insertId;
      moduleTest.tests.create.status = 'passed';
      moduleTest.tests.create.message = `Record created (ID: ${moduleTest.createdId})`;
      moduleTest.tests.create.duration = duration;
      console.log(`   ✅ Create test passed (${duration}ms) - ID: ${moduleTest.createdId}`);
    } else {
      moduleTest.tests.create.status = 'failed';
      moduleTest.tests.create.message = `HTTP ${createResponse.status} - ${createResponse.data?.message || 'Unknown error'}`;
      moduleTest.tests.create.duration = duration;
      console.log(`   ❌ Create test failed: HTTP ${createResponse.status}`);
    }
  } catch (error) {
    moduleTest.tests.create.status = 'failed';
    moduleTest.tests.create.message = error.message;
    console.log(`   ❌ Create test error: ${error.message}`);
  }

  // Test 3: Read data back
  try {
    const startTime = Date.now();
    const readUrl = `${config.baseUrl}/api/admin/departments/${config.department}/${module.key}`;
    console.log(`   👁️  Reading records: GET ${readUrl}`);
    
    const readResponse = await makeRequest(readUrl);
    const duration = Date.now() - startTime;
    
    if (readResponse.status === 200) {
      const records = Array.isArray(readResponse.data) ? readResponse.data : readResponse.data?.data || [];
      moduleTest.tests.read.status = 'passed';
      moduleTest.tests.read.message = `Retrieved ${records.length} records`;
      moduleTest.tests.read.duration = duration;
      console.log(`   ✅ Read test passed (${duration}ms) - ${records.length} records`);
    } else {
      moduleTest.tests.read.status = 'failed';
      moduleTest.tests.read.message = `HTTP ${readResponse.status}`;
      moduleTest.tests.read.duration = duration;
      console.log(`   ❌ Read test failed: HTTP ${readResponse.status}`);
    }
  } catch (error) {
    moduleTest.tests.read.status = 'failed';
    moduleTest.tests.read.message = error.message;
    console.log(`   ❌ Read test error: ${error.message}`);
  }

  // Test 4: Delete dummy data (if created successfully)
  if (moduleTest.createdId) {
    try {
      const startTime = Date.now();
      const deleteUrl = `${config.baseUrl}/api/admin/departments/${config.department}/${module.key}/${moduleTest.createdId}`;
      console.log(`   🗑️  Deleting record: DELETE ${deleteUrl}`);
      
      const deleteResponse = await makeRequest(deleteUrl, {
        method: 'DELETE'
      });
      const duration = Date.now() - startTime;
      
      if (deleteResponse.status === 200 || deleteResponse.status === 204) {
        moduleTest.tests.delete.status = 'passed';
        moduleTest.tests.delete.message = `Record deleted successfully`;
        moduleTest.tests.delete.duration = duration;
        console.log(`   ✅ Delete test passed (${duration}ms)`);
      } else {
        moduleTest.tests.delete.status = 'failed';
        moduleTest.tests.delete.message = `HTTP ${deleteResponse.status}`;
        moduleTest.tests.delete.duration = duration;
        console.log(`   ❌ Delete test failed: HTTP ${deleteResponse.status}`);
      }
    } catch (error) {
      moduleTest.tests.delete.status = 'failed';
      moduleTest.tests.delete.message = error.message;
      console.log(`   ❌ Delete test error: ${error.message}`);
    }
  } else {
    moduleTest.tests.delete.status = 'skipped';
    moduleTest.tests.delete.message = 'No record to delete (create failed)';
    console.log(`   ⏭️  Delete test skipped (no record created)`);
  }

  // Calculate module test results
  const testCount = Object.keys(moduleTest.tests).length;
  const passedTests = Object.values(moduleTest.tests).filter(t => t.status === 'passed').length;
  const failedTests = Object.values(moduleTest.tests).filter(t => t.status === 'failed').length;
  const skippedTests = Object.values(moduleTest.tests).filter(t => t.status === 'skipped').length;

  moduleTest.summary = {
    total: testCount,
    passed: passedTests,
    failed: failedTests,
    skipped: skippedTests,
    success: failedTests === 0
  };

  console.log(`   📊 Module Summary: ${passedTests}/${testCount} tests passed`);
  
  return moduleTest;
}

// Main test runner
async function runTests() {
  console.log('🚀 AIML Admin Dashboard - Authenticated Module Testing Script');
  console.log('==============================================================');
  console.log(`📍 Base URL: ${config.baseUrl}`);
  console.log(`🎯 Department: ${config.department}`);
  console.log(`📊 Total Modules: ${AIML_MODULES.length}`);
  console.log('==============================================================');

  // Step 1: Authenticate
  const authSuccess = await authenticateAdmin();
  if (!authSuccess) {
    console.log('\n❌ Cannot proceed without authentication.');
    console.log('💡 Please check your credentials or ensure the server is running.');
    console.log('🔧 You can set credentials using environment variables:');
    console.log('   ADMIN_EMAIL=your-email@svec.edu.in');
    console.log('   ADMIN_PASSWORD=your-password');
    process.exit(1);
  }

  console.log('\n⏳ Starting module tests in 2 seconds...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  const startTime = Date.now();
  testResults.total = AIML_MODULES.length;

  for (let i = 0; i < AIML_MODULES.length; i++) {
    const module = AIML_MODULES[i];
    console.log(`\n[${i + 1}/${AIML_MODULES.length}] Testing ${module.name}...`);
    
    try {
      const moduleResult = await testModule(module);
      testResults.details.push(moduleResult);
      
      if (moduleResult.summary.success) {
        testResults.passed++;
      } else {
        testResults.failed++;
      }
    } catch (error) {
      console.log(`   ❌ Module test failed with error: ${error.message}`);
      testResults.failed++;
      testResults.details.push({
        module: module.name,
        key: module.key,
        table: module.table,
        error: error.message,
        summary: { success: false }
      });
    }

    // Small delay between tests to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const totalDuration = Date.now() - startTime;

  // Print final summary
  console.log('\n' + '='.repeat(80));
  console.log('📋 FINAL TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`⏱️  Total Duration: ${(totalDuration / 1000).toFixed(2)}s`);
  console.log(`📊 Total Modules: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⏭️  Skipped: ${testResults.skipped}`);
  console.log(`🎯 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);

  // Print detailed results
  console.log('\n📝 DETAILED RESULTS:');
  console.log('-'.repeat(80));

  testResults.details.forEach((result, index) => {
    const status = result.summary?.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${index + 1}. ${result.module} (${result.key}) - ${status}`);
    
    if (result.tests) {
      Object.entries(result.tests).forEach(([testName, testResult]) => {
        const statusIcon = testResult.status === 'passed' ? '✅' : 
                          testResult.status === 'failed' ? '❌' : '⏭️';
        const duration = testResult.duration ? ` (${testResult.duration}ms)` : '';
        console.log(`   ${statusIcon} ${testName}: ${testResult.message}${duration}`);
      });
    }
    
    if (result.error) {
      console.log(`   ❌ Error: ${result.error}`);
    }
    console.log('');
  });

  // Print failed modules summary
  const failedModules = testResults.details.filter(r => !r.summary?.success);
  if (failedModules.length > 0) {
    console.log('❌ FAILED MODULES:');
    console.log('-'.repeat(40));
    failedModules.forEach(module => {
      console.log(`• ${module.module} (${module.key})`);
      if (module.table) {
        console.log(`  Table: ${module.table}`);
      }
    });
    console.log('');
  }

  // Print recommendations
  console.log('💡 RECOMMENDATIONS:');
  console.log('-'.repeat(40));
  if (testResults.failed > 0) {
    console.log('• Check API endpoints are running on', config.baseUrl);
    console.log('• Verify database tables exist and have proper schema');
    console.log('• Check network connectivity and firewall settings');
    console.log('• Review server logs for detailed error information');
  } else {
    console.log('• All tests passed! AIML admin dashboard is working correctly.');
    console.log('• Consider adding this script to your CI/CD pipeline.');
    console.log('• Regular testing helps ensure dashboard reliability.');
  }

  // Logout (cleanup)
  try {
    await makeRequest(`${config.baseUrl}/api/admin/auth/logout`, { method: 'POST' });
    console.log('🔓 Logged out successfully');
  } catch (error) {
    console.log('⚠️  Logout failed:', error.message);
  }

  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run the tests
if (require.main === module) {
  runTests().catch((error) => {
    console.error('❌ Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = { runTests, testModule, AIML_MODULES };