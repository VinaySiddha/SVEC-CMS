const axios = require('axios');
const fs = require('fs');

console.log('🔍 BSH Data Loading Diagnostic');
console.log('===============================\n');

// Test authentication and data loading for BSH modules
const BASE_URL = 'http://localhost:3000';

async function testBSHDataLoading() {
  console.log('📋 Testing BSH Data Loading Issues...\n');
  
  // Common BSH modules that should have data
  const testModules = [
    { key: 'activities', name: 'Activities' },
    { key: 'faculty', name: 'Faculty' },
    { key: 'syllabus', name: 'Syllabus' },
    { key: 'fdps', name: 'FDPs/Guest Lectures' },
    { key: 'photogallery', name: 'Photo Gallery' },
    { key: 'student-achievements', name: 'Student Achievements' }
  ];

  for (const module of testModules) {
    console.log(`🔍 Testing ${module.name} (${module.key})`);
    
    try {
      // Test without authentication first
      console.log('   📡 Testing without authentication...');
      const noAuthUrl = `${BASE_URL}/api/admin/departments/bsh/${module.key}`;
      
      try {
        const response = await axios.get(noAuthUrl, { timeout: 5000 });
        
        if (response.status === 200 && response.data) {
          console.log('   ✅ API accessible without auth');
          console.log(`   📊 Response structure: ${JSON.stringify(Object.keys(response.data))}`);
          
          if (response.data.success && response.data.data && response.data.data.records) {
            const records = response.data.data.records;
            console.log(`   📈 Records found: ${records.length}`);
            
            if (records.length > 0) {
              const firstRecord = records[0];
              console.log(`   🔍 First record keys: ${Object.keys(firstRecord).join(', ')}`);
              console.log(`   📋 Sample data: ${JSON.stringify(firstRecord).substring(0, 100)}...`);
            } else {
              console.log('   ⚠️  No records in database table');
            }
          } else {
            console.log('   ❌ Invalid response structure');
            console.log(`   🔍 Actual response: ${JSON.stringify(response.data).substring(0, 200)}...`);
          }
        } else {
          console.log(`   ⚠️  Unexpected status: ${response.status}`);
        }
        
      } catch (error) {
        if (error.code === 'ECONNREFUSED') {
          console.log('   ❌ Server not running');
          return false;
        } else if (error.response) {
          console.log(`   ❌ API Error: ${error.response.status}`);
          console.log(`   📋 Error message: ${error.response.data?.error || 'Unknown error'}`);
          
          if (error.response.status === 401) {
            console.log('   🔐 Authentication required - this is expected for admin endpoints');
          } else if (error.response.status === 404) {
            console.log('   📍 Endpoint not found - check module configuration');
          }
        } else {
          console.log(`   ❌ Request failed: ${error.message}`);
        }
      }
      
      console.log(''); // Empty line for readability
      
    } catch (error) {
      console.log(`   ❌ Module test failed: ${error.message}\n`);
    }
  }
  
  return true;
}

async function testDashboardStructure() {
  console.log('🏗️  Testing Dashboard Structure...\n');
  
  // Read dashboard file to check BSH configuration
  const dashboardPath = 'src/app/departments/[dept]/dashboard/page.tsx';
  
  if (fs.existsSync(dashboardPath)) {
    const content = fs.readFileSync(dashboardPath, 'utf8');
    
    console.log('📄 Dashboard Configuration Analysis:');
    
    if (content.includes("'bsh': [")) {
      console.log('✅ BSH section found in DEPARTMENT_MODULES');
      
      // Count modules
      const bshSection = content.split("'bsh': [")[1]?.split('],')[0];
      if (bshSection) {
        const moduleCount = (bshSection.match(/{ key:/g) || []).length;
        console.log(`📊 BSH modules configured: ${moduleCount}`);
        
        // Check for specific modules
        const requiredModules = ['activities', 'faculty', 'syllabus', 'fdps', 'photogallery'];
        requiredModules.forEach(module => {
          if (content.includes(`key: '${module}'`)) {
            console.log(`   ✅ ${module} module configured`);
          } else {
            console.log(`   ❌ ${module} module missing`);
          }
        });
      }
    } else {
      console.log('❌ BSH section not found in DEPARTMENT_MODULES');
    }
    
    console.log('');
  } else {
    console.log('❌ Dashboard file not found');
  }
}

async function testModuleFieldsConfig() {
  console.log('⚙️  Testing Module Fields Configuration...\n');
  
  const moduleFieldsPath = 'src/config/module-fields.ts';
  
  if (fs.existsSync(moduleFieldsPath)) {
    const content = fs.readFileSync(moduleFieldsPath, 'utf8');
    
    console.log('📋 Module Fields Configuration Analysis:');
    
    if (content.includes("'bsh': {")) {
      console.log('✅ BSH configuration found in module-fields.ts');
      
      // Check for specific module configurations
      const bshModules = ['syllabus', 'fdps', 'photogallery', 'activities', 'faculty'];
      bshModules.forEach(module => {
        if (content.includes(`'${module}': {`) && content.includes(`tableName: 'bsh_${module}'`)) {
          console.log(`   ✅ ${module} configuration found`);
        } else if (content.includes(`'${module}': {`)) {
          console.log(`   ⚠️  ${module} found but check table name`);
        } else {
          console.log(`   ❌ ${module} configuration missing`);
        }
      });
    } else {
      console.log('❌ BSH configuration not found in module-fields.ts');
    }
    
    console.log('');
  } else {
    console.log('❌ Module fields file not found');
  }
}

async function runDiagnostics() {
  console.log('🚀 Starting BSH Data Loading Diagnostics...\n');
  
  await testDashboardStructure();
  await testModuleFieldsConfig();
  const serverRunning = await testBSHDataLoading();
  
  console.log('🏁 Diagnostic Summary');
  console.log('=====================');
  
  if (!serverRunning) {
    console.log('⚠️  Server not running - start with: npm run dev');
    console.log('📝 After starting server, test these URLs manually:');
    console.log('   🌐 Dashboard: http://localhost:3000/departments/bsh/dashboard');
    console.log('   📡 API: http://localhost:3000/api/admin/departments/bsh/syllabus');
    console.log('   📡 API: http://localhost:3000/api/admin/departments/bsh/faculty');
  } else {
    console.log('✅ Server accessible');
  }
  
  console.log('\n🔍 Common Issues & Solutions:');
  console.log('1. 📋 Empty tables: Check if data exists in MySQL bsh_* tables');
  console.log('2. 🔐 Auth errors: Login as admin and check localStorage for authToken');
  console.log('3. 🔗 404 errors: Verify module key matches API route configuration');
  console.log('4. 📡 No data display: Check browser Network/Console for API errors');
  console.log('5. ⚡ Cache issues: Clear browser cache or use incognito mode');
}

// Run the diagnostics
runDiagnostics().catch(console.error);