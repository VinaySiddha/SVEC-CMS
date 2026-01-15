# AIML Admin Dashboard Testing Suite

This testing suite provides comprehensive testing for all AIML admin dashboard modules, including authentication, CRUD operations, and data integrity validation.

## 📋 Overview

The testing suite validates:
- ✅ **Authentication**: Admin login with proper credentials
- ✅ **Module Structure**: Database table schema validation
- ✅ **CRUD Operations**: Create, Read, Update, Delete operations
- ✅ **Data Integrity**: Verify data persistence and cleanup
- ✅ **Error Handling**: Proper error responses and edge cases

## 🧪 AIML Modules Tested

The suite tests all 20 AIML admin dashboard modules:

1. **BOS Members** (`aiml_bos_members`)
2. **BOS Minutes** (`aiml_bos_minutes`) 
3. **Department Overview** (`aiml_department_overview`)
4. **Extra-Curricular** (`aiml_extra_curricular`)
5. **Faculty** (`aiml_faculty`)
6. **Faculty Achievements** (`aiml_faculty_achievements`)
7. **Faculty Development** (`aiml_faculty_development`)
8. **Hackathons** (`aiml_hackathons`)
9. **Hackathons Gallery** (`aiml_hackathons_gallery`)
10. **Handbooks** (`aiml_handbooks`)
11. **MOUs** (`aiml_mous`)
12. **Physical Facilities** (`aiml_physical_facilities`)
13. **Placements** (`aiml_placements`)
14. **Student Achievements** (`aiml_student_achievements`)
15. **Syllabus** (`aiml_syllabus`)
16. **Technical Faculty** (`aiml_technical_faculty`)
17. **Workshops** (`aiml_workshops`)
18. **Technical Association** (`aiml_technical_association`)
19. **Staff** (`aiml_staff`)
20. **Academic Toppers** (`aiml_academictoppers`)

## 🚀 Quick Start

### Method 1: Interactive Setup (Recommended)

```bash
# Navigate to project root
cd svec-cms-new

# Run interactive setup
node scripts/setup-test.js
```

The script will prompt for:
- 📧 Admin email address
- 🔑 Admin password

### Method 2: Environment Variables

```bash
# Set credentials
export ADMIN_EMAIL="your-admin@svec.edu.in"
export ADMIN_PASSWORD="your-password"

# Run tests
node scripts/test-aiml-admin-modules.js
```

### Method 3: Windows Batch File

```batch
# Double-click or run from command prompt
scripts\run-tests.bat
```

## 📊 Test Flow

Each module undergoes a 4-step testing process:

### 1. 🔐 Authentication
```
POST /api/admin/auth/login
- Validates admin credentials
- Obtains authentication token
- Sets session cookie
```

### 2. 📋 Structure Validation
```
GET /api/admin/departments/aiml/{module}/structure
- Checks table schema
- Validates field definitions
- Ensures proper data types
```

### 3. ➕ CRUD Operations
```
POST   /api/admin/departments/aiml/{module}      # Create dummy data
GET    /api/admin/departments/aiml/{module}      # Read data
DELETE /api/admin/departments/aiml/{module}/{id} # Delete dummy data
```

### 4. 🧹 Cleanup
```
POST /api/admin/auth/logout
- Clears authentication session
- Removes test data
- Clean exit
```

## 📈 Understanding Results

### ✅ Success Output
```
📋 FINAL TEST SUMMARY
====================
⏱️  Total Duration: 45.2s
📊 Total Modules: 20
✅ Passed: 20
❌ Failed: 0
⏭️  Skipped: 0
🎯 Success Rate: 100.0%
```

### ❌ Failure Analysis

**HTTP 401 Unauthorized**
- ❌ Authentication failed
- 💡 Check credentials
- 💡 Verify user has admin privileges

**HTTP 500 Internal Server Error**
- ❌ Server or database issue
- 💡 Check server logs
- 💡 Verify database connection

**HTTP 404 Not Found**
- ❌ API endpoint missing
- 💡 Check API route configuration
- 💡 Verify server is running

## 🔧 Prerequisites

### Server Requirements
- ✅ Next.js server running on `http://localhost:9002`
- ✅ MySQL database accessible
- ✅ Admin authentication system configured

### Node.js Requirements
```json
{
  "node": ">=14.0.0",
  "dependencies": {
    "http": "built-in",
    "https": "built-in"
  }
}
```

### Database Requirements
- ✅ MySQL server running
- ✅ All AIML tables exist with proper schema
- ✅ Admin user account with proper permissions

## 🔨 Configuration Options

### Environment Variables
```bash
# Required for authentication
ADMIN_EMAIL=your-admin@svec.edu.in
ADMIN_PASSWORD=your-secure-password

# Optional configuration
BASE_URL=http://localhost:9002  # Default server URL
TIMEOUT=15000                   # Request timeout in ms
DEPARTMENT=aiml                 # Target department
```

### Script Parameters
```bash
# Custom base URL
node scripts/test-aiml-admin-modules.js

# With debug output
DEBUG=1 node scripts/test-aiml-admin-modules.js

# Test specific modules only (future feature)
MODULES=faculty,syllabus node scripts/test-aiml-admin-modules.js
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Authentication Failed**
```bash
❌ Authentication failed: Invalid credentials
```
**Solutions:**
- Verify email and password are correct
- Check if user exists in database
- Ensure user has admin/super_admin role
- Check if account is active

#### 2. **Server Connection Failed**
```bash
❌ Request failed: ECONNREFUSED
```
**Solutions:**
- Start the Next.js development server
- Check if port 9002 is available
- Verify firewall settings
- Test server manually: `curl http://localhost:9002/api/health`

#### 3. **Database Connection Issues**
```bash
❌ Structure check failed: HTTP 500
```
**Solutions:**
- Check MySQL server status
- Verify database credentials
- Test database connection manually
- Check database logs for errors

#### 4. **Missing Tables**
```bash
❌ HTTP 404 - Table not found
```
**Solutions:**
- Run database migrations
- Create missing AIML tables
- Check table naming conventions
- Verify table permissions

### Debug Mode

Enable detailed logging:
```bash
DEBUG=1 node scripts/test-aiml-admin-modules.js
```

This will show:
- 🔍 Detailed HTTP requests/responses
- 📊 Database query results
- ⏱️ Performance metrics
- 🎯 Step-by-step execution flow

## 📚 API Endpoints Tested

### Authentication Endpoints
```
POST /api/admin/auth/login      # Admin login
POST /api/admin/auth/logout     # Admin logout
GET  /api/admin/auth/verify     # Token verification
```

### Module Structure Endpoints
```
GET /api/admin/departments/aiml/{module}/structure
```

### CRUD Endpoints (per module)
```
GET    /api/admin/departments/aiml/{module}      # List records
POST   /api/admin/departments/aiml/{module}      # Create record
GET    /api/admin/departments/aiml/{module}/{id} # Get record
PUT    /api/admin/departments/aiml/{module}/{id} # Update record
DELETE /api/admin/departments/aiml/{module}/{id} # Delete record
```

## 🚀 Integration with CI/CD

### GitHub Actions Example
```yaml
name: AIML Dashboard Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-aiml-dashboard:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: svec_cms
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Start server
      run: npm run dev &
      
    - name: Wait for server
      run: npx wait-on http://localhost:9002
      
    - name: Run AIML tests
      env:
        ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
        ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
      run: node scripts/test-aiml-admin-modules.js
```

## 🎯 Performance Benchmarks

### Expected Performance
- ⏱️ **Authentication**: < 2s
- 📋 **Structure Check**: < 500ms per module
- ➕ **Create Operation**: < 1s per module
- 👁️ **Read Operation**: < 500ms per module
- 🗑️ **Delete Operation**: < 500ms per module
- 🏁 **Total Test Time**: 45-60s for all modules

### Performance Tips
- Use local database for faster tests
- Run tests during off-peak hours
- Consider parallel testing for large datasets
- Monitor server resource usage

## 📝 Contributing

### Adding New Tests
1. Edit `AIML_MODULES` array in `test-aiml-admin-modules.js`
2. Add dummy data template in `dummyDataTemplates`
3. Update module count in documentation
4. Test new module thoroughly

### Reporting Issues
Include:
- 📊 Test output (copy/paste)
- 🖥️ Environment details (OS, Node version)
- 🔧 Configuration used
- 📋 Steps to reproduce

## 🔒 Security Considerations

- ❌ Never commit real passwords to version control
- ✅ Use environment variables for credentials
- ✅ Test with dedicated test accounts
- ✅ Clean up test data after execution
- ✅ Use HTTPS in production environments
- ✅ Rotate test credentials regularly

## 📞 Support

For issues or questions:
- 📧 Email: support@svec.edu.in
- 📱 GitHub Issues: [Create Issue](https://github.com/your-repo/issues)
- 📚 Documentation: [Wiki](https://github.com/your-repo/wiki)

---

**Last Updated**: November 2024  
**Version**: 2.0.0  
**Compatibility**: Next.js 14+, Node.js 18+, MySQL 8.0+