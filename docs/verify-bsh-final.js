const fs = require('fs');
const path = require('path');

console.log('🔍 Final BSH Module Configurations Check...\n');

try {
  // Read dashboard configuration to get BSH modules
  const dashboardPath = path.join(__dirname, 'src/app/departments/[dept]/dashboard/page.tsx');
  const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
  
  // Extract BSH modules array - more precise regex
  const bshSectionMatch = dashboardContent.match(/'bsh':\s*\[([\s\S]*?)\]/);
  if (!bshSectionMatch) {
    console.log('❌ Could not find BSH modules array in dashboard');
    return;
  }
  
  const bshSection = bshSectionMatch[1];
  
  // Extract module keys using more precise regex
  const moduleMatches = bshSection.matchAll(/{\s*key:\s*'([^']+)'/g);
  const bshModules = [];
  for (const match of moduleMatches) {
    bshModules.push(match[1]);
  }
  
  console.log(`📋 BSH Dashboard Modules (${bshModules.length} found):`);
  bshModules.forEach((module, index) => {
    console.log(`  ${index + 1}. ${module}`);
  });
  
  // Read module-fields.ts to check field configurations
  const moduleFieldsPath = path.join(__dirname, 'src/config/module-fields.ts');
  const moduleFieldsContent = fs.readFileSync(moduleFieldsPath, 'utf8');
  
  // Extract BSH section from module-fields.ts
  const bshFieldsMatch = moduleFieldsContent.match(/'bsh':\s*{([\s\S]*?)},\s*'mba':/);
  if (!bshFieldsMatch) {
    console.log('\n❌ Could not find BSH section in module-fields.ts');
    return;
  }
  
  const bshFieldsSection = bshFieldsMatch[1];
  const configuredModules = [];
  
  // Find all configured modules in BSH section
  const fieldConfigMatches = bshFieldsSection.matchAll(/'([^']+)':\s*{/g);
  for (const match of fieldConfigMatches) {
    configuredModules.push(match[1]);
  }
  
  console.log(`\n⚙️  BSH Field Configurations (${configuredModules.length} found):`);
  configuredModules.forEach((module, index) => {
    console.log(`  ${index + 1}. ${module}`);
  });
  
  // Check for missing configurations
  const missingConfigs = bshModules.filter(module => !configuredModules.includes(module));
  const extraConfigs = configuredModules.filter(module => !bshModules.includes(module));
  
  console.log('\n📊 Analysis Results:');
  
  if (missingConfigs.length === 0 && extraConfigs.length === 0) {
    console.log('✅ Perfect Match! All BSH modules have field configurations');
    console.log(`✅ Total: ${bshModules.length} modules configured`);
  } else {
    if (missingConfigs.length > 0) {
      console.log(`❌ Missing Field Configurations (${missingConfigs.length}):`);
      missingConfigs.forEach(module => console.log(`  - ${module}`));
    }
    
    if (extraConfigs.length > 0) {
      console.log(`⚠️  Extra Field Configurations (${extraConfigs.length}):`);
      extraConfigs.forEach(module => console.log(`  + ${module}`));
    }
  }
  
  console.log('\n🎯 Status Summary:');
  console.log(`Dashboard Modules: ${bshModules.length}`);
  console.log(`Field Configurations: ${configuredModules.length}`);
  console.log(`Missing: ${missingConfigs.length}`);
  console.log(`Extra: ${extraConfigs.length}`);
  
  if (missingConfigs.length === 0) {
    console.log('\n🎉 BSH data loading should now work properly!');
    console.log('📝 All UI tables should display MySQL data correctly.');
    console.log('🔗 Try accessing: http://localhost:3000/departments/bsh/dashboard');
  } else {
    console.log('\n⚠️  Some modules still missing field configurations.');
    console.log('🔧 Data won\'t load for modules without field configurations.');
  }

} catch (error) {
  console.error('❌ Error during verification:', error.message);
}