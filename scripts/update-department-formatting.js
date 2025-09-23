/**
 * Script to update department titles with proper full names and standardize naming conventions
 * This script updates both the department titles and fixes the import paths
 */
const fs = require('fs');
const path = require('path');

// Path to department files
const DEPARTMENTS_DIR = path.join(__dirname, '../src/pages/departments');
const SIDEBAR_PATH = path.join(__dirname, '../src/components/DepartmentSidebar.tsx');

// Department name mappings - using more descriptive names with "and" instead of "&"
const departmentMappings = {
  'AIML': 'Artificial Intelligence and Machine Learning',
  'AI & ML': 'Artificial Intelligence and Machine Learning',
  'AI&ML': 'Artificial Intelligence and Machine Learning',
  'CSE': 'Computer Science Engineering',
  'CSEAI': 'Computer Science Engineering with AI',
  'CSEDS': 'Computer Science Engineering with Data Science',
  'CST': 'Computer Science and Technology',
  'DS': 'Data Science',
  'ECE': 'Electronics and Communication Engineering',
  'ECT': 'Electronics and Computer Engineering',
  'EEE': 'Electrical and Electronics Engineering',
  'Civil': 'Civil Engineering',
  'Mechanical': 'Mechanical Engineering',
  'BSH': 'Basic Sciences and Humanities',
  'MBA': 'Master of Business Administration'
};

// Fix import paths in all department files
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
        let originalContent = content;
        
        // Fix empty imports
        if (content.includes("import DepartmentSidebar from '';")) {
          console.log(`🔧 Fixing empty import in ${file}`);
          content = content.replace(
            "import DepartmentSidebar from '';",
            "import { DepartmentSidebar } from '@/components/DepartmentSidebar';"
          );
        }
        
        // Standardize relative imports
        if (content.includes("import { DepartmentSidebar } from '../../components/DepartmentSidebar';") || 
            content.includes("import {DepartmentSidebar} from '../../components/DepartmentSidebar';")) {
          console.log(`🔧 Standardizing relative import in ${file}`);
          content = content.replace(
            /import\s+[{]?\s*DepartmentSidebar\s*[}]?\s+from\s+['"]\.\.\/\.\.\/components\/DepartmentSidebar['"];/g,
            "import { DepartmentSidebar } from '@/components/DepartmentSidebar';"
          );
        }
        
        // Check if changes were made
        if (content !== originalContent) {
          // Write updated content back to file
          fs.writeFileSync(filePath, content, 'utf8');
          fixedCount++;
          console.log(`✅ Successfully fixed imports in ${file}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
        errorCount++;
      }
    });
    
    console.log(`\n📊 Import Fix Summary:`);
    console.log(`✅ Successfully processed ${fixedCount} files`);
    
    if (errorCount > 0) {
      console.log(`❌ Encountered errors in ${errorCount} files`);
    }
    
  } catch (err) {
    console.error('❌ Error reading departments directory:', err);
  }
}

// Update department titles in all files
function updateDepartmentTitles() {
  console.log('\n🔍 Starting department title update process...');
  
  try {
    // Read all files in the departments directory
    const files = fs.readdirSync(DEPARTMENTS_DIR);
    
    // Filter to only include TypeScript files
    const tsFiles = files.filter(file => file.endsWith('.tsx'));
    
    let updatedCount = 0;
    let errorCount = 0;
    
    // Process each file
    tsFiles.forEach(file => {
      const filePath = path.join(DEPARTMENTS_DIR, file);
      try {
        // Read file content
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        let hasChanges = false;
        
        // Get the department code from the filename (without .tsx extension)
        const deptCode = path.basename(file, '.tsx');
        
        // Skip files that don't have a mapping or special files
        if (!departmentMappings[deptCode] || deptCode === 'OptimizedAIML' || deptCode === 'Issues') {
          console.log(`ℹ️ Skipping ${file} - no mapping or special file`);
          return;
        }
        
        // The full department name
        const fullName = departmentMappings[deptCode];
        
        // Update title attribute in department component
        const titleRegex = new RegExp(`title=["']${deptCode} Department["']`, 'g');
        const shortTitleRegex = new RegExp(`title=["']${deptCode}["']`, 'g');
        
        // Handle both patterns that might exist
        if (content.match(titleRegex)) {
          content = content.replace(titleRegex, `title="${fullName} Department"`);
          console.log(`🔄 Updated title for ${deptCode} to "${fullName} Department"`);
          hasChanges = true;
        } else if (content.match(shortTitleRegex)) {
          content = content.replace(shortTitleRegex, `title="${fullName} Department"`);
          console.log(`🔄 Updated title for ${deptCode} to "${fullName} Department"`);
          hasChanges = true;
        }
        
        // Look for h1, h2, h3 tags with department name
        Object.entries(departmentMappings).forEach(([abbr, full]) => {
          // Create regex patterns for different header patterns
          const h1Regex = new RegExp(`<h1[^>]*>\\s*${abbr}\\s+Department\\s*</h1>`, 'gi');
          const h2Regex = new RegExp(`<h2[^>]*>\\s*${abbr}\\s+Department\\s*</h2>`, 'gi');
          const h3Regex = new RegExp(`<h3[^>]*>\\s*${abbr}\\s+Department\\s*</h3>`, 'gi');
          
          if (content.match(h1Regex)) {
            content = content.replace(h1Regex, `<h1>${full} Department</h1>`);
            hasChanges = true;
          }
          if (content.match(h2Regex)) {
            content = content.replace(h2Regex, `<h2>${full} Department</h2>`);
            hasChanges = true;
          }
          if (content.match(h3Regex)) {
            content = content.replace(h3Regex, `<h3>${full} Department</h3>`);
            hasChanges = true;
          }
        });
        
        // Write updated content back to file if changes were made
        if (hasChanges) {
          fs.writeFileSync(filePath, content, 'utf8');
          updatedCount++;
          console.log(`✅ Successfully updated ${file}`);
        } else {
          console.log(`ℹ️ No title changes needed for ${file}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err);
        errorCount++;
      }
    });
    
    console.log(`\n📊 Title Update Summary:`);
    console.log(`✅ Successfully updated ${updatedCount} files`);
    
    if (errorCount > 0) {
      console.log(`❌ Encountered errors in ${errorCount} files`);
    }
    
  } catch (err) {
    console.error('❌ Error reading departments directory:', err);
  }
}

// Function to update sidebar component to increase banner height
function updateSidebarComponent() {
  console.log('\n🔍 Updating DepartmentSidebar component...');
  
  try {
    let content = fs.readFileSync(SIDEBAR_PATH, 'utf8');
    const originalContent = content;
    
    // Update the banner height from 12px to 16px
    content = content.replace(
      /h-12/g, 
      'h-16'
    );
    
    // Replace truncate with whitespace-normal and overflow-visible
    content = content.replace(
      /truncate/g, 
      'whitespace-normal overflow-visible'
    );
    
    // Write the updated content back to file if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(SIDEBAR_PATH, content, 'utf8');
      console.log('✅ Successfully updated DepartmentSidebar component');
    } else {
      console.log('ℹ️ No changes needed for DepartmentSidebar component');
    }
  } catch (err) {
    console.error('❌ Error updating DepartmentSidebar component:', err);
  }
}

// Execute the functions
fixDepartmentImports();
updateDepartmentTitles();
updateSidebarComponent();

console.log('\n🎉 All updates completed successfully!');