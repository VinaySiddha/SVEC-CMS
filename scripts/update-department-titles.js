const fs = require('fs');
const path = require('path');

// Define the directory containing department files
const departmentsDir = path.join(__dirname, '..', 'src', 'pages', 'departments');

// Define mappings for department abbreviations to full names
const departmentNames = {
  'AIML': 'Artificial Intelligence & Machine Learning',
  'CSE': 'Computer Science Engineering',
  'CSEAI': 'Computer Science Engineering (AI)',
  'CSEDS': 'Computer Science Engineering (Data Science)',
  'CST': 'Computer Science & Technology',
  'DS': 'Data Science',
  'ECE': 'Electronics & Communication Engineering',
  'ECT': 'Electronics & Computer Engineering',
  'EEE': 'Electrical & Electronics Engineering',
  'Civil': 'Civil Engineering',
  'Mechanical': 'Mechanical Engineering',
  'BSH': 'Basic Sciences & Humanities',
  'MBA': 'Master of Business Administration'
};

// Read all files in the departments directory
fs.readdirSync(departmentsDir).forEach(file => {
  // Only process .tsx files
  if (!file.endsWith('.tsx')) return;
  
  const filePath = path.join(departmentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Get the department code from the filename (without the .tsx extension)
  const deptCode = path.basename(file, '.tsx');
  
  // Skip files that don't have a mapping or special files
  if (!departmentNames[deptCode] || deptCode === 'OptimizedAIML' || deptCode === 'Issues') {
    console.log(`Skipping ${file} - no mapping or special file`);
    return;
  }
  
  // The full department name
  const fullName = departmentNames[deptCode];
  
  // Look for the title="X Department" pattern and replace it
  const titleRegex = new RegExp(`title=["']${deptCode} Department["']`, 'g');
  const shortTitleRegex = new RegExp(`title=["']${deptCode}["']`, 'g');
  
  // Handle both patterns that might exist
  if (content.match(titleRegex)) {
    content = content.replace(titleRegex, `title="${fullName} Department"`);
    console.log(`Updated title for ${deptCode} to "${fullName} Department"`);
  } else if (content.match(shortTitleRegex)) {
    content = content.replace(shortTitleRegex, `title="${fullName} Department"`);
    console.log(`Updated title for ${deptCode} to "${fullName} Department"`);
  } else {
    // Try to find any title pattern
    const genericTitleRegex = /title=["']([^"']*)["']/;
    const match = content.match(genericTitleRegex);
    
    if (match) {
      console.log(`Found title "${match[1]}" in ${file}, updating to "${fullName} Department"`);
      content = content.replace(genericTitleRegex, `title="${fullName} Department"`);
    } else {
      console.log(`No title attribute found in ${file}`);
    }
  }
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Department titles updated successfully!');