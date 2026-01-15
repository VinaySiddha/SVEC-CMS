#!/usr/bin/env node

/**
 * AIML Admin Dashboard Testing - Quick Setup Script
 * Sets up credentials and runs the authenticated test suite
 */

const readline = require('readline');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function hiddenQuestion(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let input = '';
    
    const onData = (char) => {
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener('data', onData);
          console.log('');
          resolve(input);
          break;
        case '\u0003': // Ctrl+C
          console.log('\n\n❌ Cancelled by user');
          process.exit(1);
          break;
        case '\u007f': // Backspace
          if (input.length > 0) {
            input = input.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          if (char >= ' ' && char <= '~') { // Printable characters
            input += char;
            process.stdout.write('*');
          }
          break;
      }
    };
    
    process.stdin.on('data', onData);
  });
}

async function main() {
  console.log('🚀 AIML Admin Dashboard Testing - Quick Setup');
  console.log('='.repeat(50));
  console.log('');
  
  // Check if credentials are already in environment
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    console.log('✅ Found credentials in environment variables');
    console.log('📧 Email:', process.env.ADMIN_EMAIL);
    console.log('🔑 Password: ****');
    console.log('');
    
    const useEnv = await question('Use these credentials? (y/n): ');
    if (useEnv.toLowerCase() === 'y' || useEnv.toLowerCase() === 'yes' || useEnv === '') {
      console.log('');
      runTests();
      return;
    }
  }
  
  console.log('🔐 Please enter your admin credentials:');
  console.log('');
  
  const email = await question('📧 Admin Email: ');
  if (!email || !email.includes('@')) {
    console.log('❌ Invalid email address');
    process.exit(1);
  }
  
  const password = await hiddenQuestion('🔑 Admin Password: ');
  if (!password || password.length < 3) {
    console.log('❌ Password too short');
    process.exit(1);
  }
  
  console.log('');
  console.log('🧪 Starting AIML module tests...');
  console.log('');
  
  // Set environment variables and run tests
  process.env.ADMIN_EMAIL = email;
  process.env.ADMIN_PASSWORD = password;
  
  runTests();
}

function runTests() {
  const scriptPath = path.join(__dirname, 'test-aiml-admin-modules.js');
  
  console.log('⚡ Running authenticated test suite...');
  console.log('');
  
  const child = spawn('node', [scriptPath], {
    stdio: 'inherit',
    env: {
      ...process.env,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
    }
  });
  
  child.on('close', (code) => {
    rl.close();
    
    console.log('');
    if (code === 0) {
      console.log('🎉 All tests completed successfully!');
      console.log('✅ AIML admin dashboard is working correctly.');
    } else {
      console.log('⚠️  Some tests failed. Please check the results above.');
      console.log('💡 Common issues:');
      console.log('   • Server not running on http://localhost:9002');
      console.log('   • Incorrect admin credentials');
      console.log('   • Database connection issues');
      console.log('   • Missing database tables');
    }
    
    process.exit(code);
  });
  
  child.on('error', (error) => {
    console.log('❌ Failed to run test script:', error.message);
    rl.close();
    process.exit(1);
  });
}

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n❌ Cancelled by user');
  rl.close();
  process.exit(1);
});

// Show help if requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('🚀 AIML Admin Dashboard Testing - Quick Setup');
  console.log('');
  console.log('Usage:');
  console.log('  node setup-test.js');
  console.log('');
  console.log('Environment Variables:');
  console.log('  ADMIN_EMAIL     - Admin email address');
  console.log('  ADMIN_PASSWORD  - Admin password');
  console.log('');
  console.log('Options:');
  console.log('  --help, -h      - Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  ADMIN_EMAIL=admin@svec.edu.in ADMIN_PASSWORD=secret node setup-test.js');
  console.log('  node setup-test.js  # Interactive mode');
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  rl.close();
  process.exit(1);
});