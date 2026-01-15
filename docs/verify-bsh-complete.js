const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying BSH Module Configurations...\n');

try {
  // Read dashboard configuration to get BSH modules
  const dashboardPath = path.join(__dirname, 'src/app/departments/[dept]/dashboard/page.tsx');
  const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
  
  // Extract BSH modules from DEPARTMENT_MODULES
  const bshModulesMatch = dashboardContent.match(/bsh:\s*\[(.*?)\]/s);
  if (!bshModulesMatch) {
    console.log('❌ Could not find BSH modules in dashboard');
    return;
  }
  
  const bshModulesStr = bshModulesMatch[1];
  const bshModules = bshModulesStr.match(/'([^']+)'/g)
    ?.map(m => m.replace(/'/g, ''))
    .filter(m => m.trim().length > 0) || [];
  
  console.log(`📋 BSH Dashboard Modules (${bshModules.length} found):`);
  bshModules.forEach((module, index) => {
    console.log(`  ${index + 1}. ${module}`);
  });
  
  // Read module-fields.ts to check field configurations
  const moduleFieldsPath = path.join(__dirname, 'src/config/module-fields.ts');
  const moduleFieldsContent = fs.readFileSync(moduleFieldsPath, 'utf8');
  
  // Extract BSH section from module-fields.ts
  const bshSectionMatch = moduleFieldsContent.match(/'bsh':\s*{(.*?)},\s*'mba':/s);
  if (!bshSectionMatch) {
    console.log('\n❌ Could not find BSH section in module-fields.ts');
    return;
  }
  
  const bshSection = bshSectionMatch[1];
  const configuredModules = [];
  
  // Find all configured modules in BSH section
  const moduleConfigMatches = bshSection.matchAll(/'([^']+)':\s*{/g);
  for (const match of moduleConfigMatches) {
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
      console.log(`❌ Missing Configurations (${missingConfigs.length}):`);
      missingConfigs.forEach(module => console.log(`  - ${module}`));
    }
    
    if (extraConfigs.length > 0) {
      console.log(`⚠️  Extra Configurations (${extraConfigs.length}):`);
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
  }

} catch (error) {
  console.error('❌ Error during verification:', error.message);
}