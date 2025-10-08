/**
 * Script to fix DepartmentSidebar import paths in all department files
 * This script fixes the empty import path issue and standardizes imports to use '@/components/DepartmentSidebar'
 */
const fs = require('fs');
const path = require('path');

// Path to department files
const DEPARTMENTS_DIR = path.join(__dirname, '../src/pages/departments');

// Process all department files
function fixDepartmentImports() {
  console.log('🔍 Starting import path fix process...');
  
  try {
    // Read all files in the departments directory
    const files = fs.readdirSync(DEPARTMENTS_DIR);
    
    // Filter to only include TypeScript files
    const tsFiles = files.filter(file => file.endsWith('.tsx'));
    console.log(`📁 Found ${tsFiles.length} department TypeScript files`);
    
    let fixedCount = 0;
    let errorCount = 0;
    
    // Process each file
    tsFiles.forEach(file => {
      const filePath = path.join(DEPARTMENTS_DIR, file);
      try {
        // Read file content
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check for import issues
        const emptyImportPattern = /import\s+DepartmentSidebar\s+from\s+['"](['"])/g;
        const relativeImportPattern = /import\s+{\s*DepartmentSidebar\s*}\s+from\s+['"]\.\.\/\.\.\/components\/DepartmentSidebar['"];/g;
        
        // Fix empty imports
        if (emptyImportPattern.test(content)) {
          console.log(`🔧 Fixing empty import in ${file}`);
          content = content.replace(
            emptyImportPattern,
            "import { DepartmentSidebar } from '@/components/DepartmentSidebar';"
          );
        }
        
        // Standardize relative imports
        if (relativeImportPattern.test(content)) {
          console.log(`🔧 Standardizing relative import in ${file}`);
          content = content.replace(
            relativeImportPattern,
            "import { DepartmentSidebar } from '@/components/DepartmentSidebar';"
          );
        }
        
        // Write updated content back to file
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
        console.log(`✅ Successfully processed ${file}`);
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
        errorCount++;
      }
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully processed ${fixedCount} files`);
    
    if (errorCount > 0) {
      console.log(`❌ Encountered errors in ${errorCount} files`);
    }
    
  } catch (err) {
    console.error('❌ Error reading departments directory:', err);
  }
}

// Execute the function
fixDepartmentImports();