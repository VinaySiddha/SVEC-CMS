import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

// The plaintext password to hash
const PASSWORD_TO_HASH = 'password123';

async function hashPassword() {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(PASSWORD_TO_HASH, salt);
    
    console.log('Generated hash for password:', hashedPassword);
    
    // Read the current users.json file
    const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    
    // Update all user passwords with the new hash
    for (const user of usersData.users) {
      user.password = hashedPassword;
    }
    
    // Write the updated data back to the file
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
    
    console.log('Users file updated successfully!');
    
    // Test the hash verification
    const verification = await bcrypt.compare(PASSWORD_TO_HASH, hashedPassword);
    console.log('Verification test result:', verification);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
hashPassword();
