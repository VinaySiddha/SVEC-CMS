const fs = require('fs');
const path = require('path');

// Source and destination directories
const cstDir = path.join(__dirname, 'src/pages/api/cst');
const cseDir = path.join(__dirname, 'src/pages/api/cse');

// Ensure CSE directory exists
if (!fs.existsSync(cseDir)) {
  fs.mkdirSync(cseDir, { recursive: true });
}

// Function to convert CST content to CSE
function convertCstToCse(content, filename) {
  // Replace table names from cst_ to cse_
  let updatedContent = content.replace(/cst_([a-z_]+)/g, 'cse_$1');
  
  // Replace API path references
  updatedContent = updatedContent.replace(/CST/g, 'CSE');
  updatedContent = updatedContent.replace(/\/cst\//g, '/cse/');
  
  // Update error messages
  updatedContent = updatedContent.replace(/CST/g, 'CSE');
  
  // Update file references for specific cases
  if (filename.includes('cst-')) {
    updatedContent = updatedContent.replace(/cst-/g, 'cse-');
  }
  
  return updatedContent;
}

// Get all TypeScript files in CST directory
const cstFiles = fs.readdirSync(cstDir).filter(file => file.endsWith('.ts'));

console.log(`🔄 Found ${cstFiles.length} CST API files to copy...`);
console.log();

let successCount = 0;
let errorCount = 0;

cstFiles.forEach(filename => {
  try {
    // Read CST file content
    const cstFilePath = path.join(cstDir, filename);
    const cstContent = fs.readFileSync(cstFilePath, 'utf8');
    
    // Convert filename from cst to cse
    const cseFilename = filename.replace(/^cst-/, 'cse-');
    const cseFilePath = path.join(cseDir, cseFilename);
    
    // Convert content
    const cseContent = convertCstToCse(cstContent, filename);
    
    // Write CSE file
    fs.writeFileSync(cseFilePath, cseContent, 'utf8');
    
    console.log(`✅ ${filename} → ${cseFilename}`);
    successCount++;
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    errorCount++;
  }
});

console.log();
console.log(`🎉 Copy operation completed!`);
console.log(`✅ Successfully copied: ${successCount} files`);
console.log(`❌ Failed: ${errorCount} files`);
console.log();
console.log(`📁 All CSE API files created in: ${cseDir}`);

// List created files
console.log();
console.log('📋 Created CSE API files:');
const cseFiles = fs.readdirSync(cseDir).filter(file => file.endsWith('.ts'));
cseFiles.forEach((file, index) => {
  console.log(`   ${index + 1}. ${file}`);
});