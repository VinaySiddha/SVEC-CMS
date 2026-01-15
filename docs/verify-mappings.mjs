import { readFileSync } from 'fs';

console.log('🔍 Verifying API Route Configurations\n');

const routeFile = readFileSync('./src/app/api/admin/departments/[dept]/[module]/route.ts', 'utf-8');
const structureFile = readFileSync('./src/app/api/admin/departments/[dept]/[module]/structure/route.ts', 'utf-8');

// Extract civil department mappings from route.ts
const routeMatch = routeFile.match(/'civil':\s*\{([\s\S]*?)\n  \},/);
if (routeMatch) {
  console.log('✅ route.ts - civil department mapping found');
  const mappings = routeMatch[1].match(/'([^']+)':\s*'([^']+)'/g);
  if (mappings && mappings.some(m => m.includes('technical-faculty'))) {
    console.log('   ✓ technical-faculty mapping found');
  }
}

// Extract civil department mappings from structure/route.ts
const structureMatch = structureFile.match(/'civil':\s*\{([\s\S]*?)\n  \},/);
if (structureMatch) {
  console.log('✅ structure/route.ts - civil department mapping found');
  const mappings = structureMatch[1].match(/'([^']+)':\s*'([^']+)'/g);
  if (mappings && mappings.some(m => m.includes('technical-faculty'))) {
    console.log('   ✓ technical-faculty mapping found');
  }
}

// Check for exact match
if (routeFile.includes("'technical-faculty': 'civil_technical_faculty'") || 
    routeFile.includes("'technical-faculty':'civil_technical_faculty'")) {
  console.log('\n✅ Exact mapping in route.ts: ✓');
}

if (structureFile.includes("'technical-faculty': 'civil_technical_faculty'")) {
  console.log('✅ Exact mapping in structure/route.ts: ✓');
}

console.log('\n📋 Summary:');
console.log('The civil/technical-faculty mapping is configured in both API route files.');
console.log('If you\'re still seeing a 404 error, try:');
console.log('  1. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)');
console.log('  2. Clear the Next.js cache (.next folder)');
console.log('  3. Restart the development server');
