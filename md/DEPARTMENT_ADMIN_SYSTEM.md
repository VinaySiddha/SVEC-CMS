# Department Admin Login System

This system provides comprehensive department-specific admin logins with full CRUD operations for all departments in the SVEC CMS.

## 🏢 System Overview

### Authentication Levels

1. **Super Admin** (`super_admin`)
   - Full access to all departments and system management
   - Access to admin dashboard
   - Can manage all department data
   - Username: `super_admin`

2. **Admin** (`admin`)
   - Department-specific access with elevated privileges
   - Access to both admin dashboard and department dashboard
   - Full CRUD operations on department data
   - One admin per department

3. **Department User** (`dept`)
   - Access only to specific department dashboard
   - Full CRUD operations on own department data
   - Limited to single department access

## 🚀 Quick Setup

### 1. Initialize Department Admin Users

**Method 1: API Endpoint**
```bash
curl -X POST http://localhost:3000/api/admin/init-users \
  -H "Content-Type: application/json" \
  -d '{"authorization": "INIT_ADMIN_USERS_SECRET_2024"}'
```

**Method 2: Direct Script**
```bash
npm run init-admins
# or
ts-node scripts/init-department-admins.ts
```

### 2. Default Login Credentials

**Super Admin:**
- Username: `super_admin`
- Password: `SuperAdmin@2024`
- Access: All departments + system management

**Department Admins:**
| Department | Username | Password | Department Code |
|------------|----------|----------|-----------------|
| Computer Science & AI | `cseai_admin` | `CSEAIAdmin@2024` | `cse-ai` |
| Electronics & Communication | `ece_admin` | `ECEAdmin@2024` | `ece` |
| Civil Engineering | `civil_admin` | `CivilAdmin@2024` | `civil` |
| Mechanical Engineering | `mech_admin` | `MechAdmin@2024` | `mech` |
| Computer Science | `cse_admin` | `CSEAdmin@2024` | `cse` |
| Computer Science & Technology | `cst_admin` | `CSTAdmin@2024` | `cst` |
| Electrical & Electronics | `eee_admin` | `EEEAdmin@2024` | `eee` |
| Business Administration | `mba_admin` | `MBAAdmin@2024` | `mba` |
| Basic Sciences & Humanities | `bsh_admin` | `BSHAdmin@2024` | `bsh` |
| Electronics & Communication Tech | `ect_admin` | `ECTAdmin@2024` | `ect` |
| AI & Machine Learning | `aiml_admin` | `AIMLAdmin@2024` | `aiml` |
| Computer Science & Data Science | `cseds_admin` | `CSEDSAdmin@2024` | `cse-ds` |

## 📱 Usage Guide

### Login Process

1. **Navigate to Login**: Go to `/auth/login`
2. **Enter Credentials**: Use username and password from table above
3. **Automatic Redirect**:
   - Super Admin → `/admin/dashboard`
   - Admin → `/admin/dashboard` (can also access dept dashboard)
   - Department → `/departments/{dept}/dashboard`

### Department Dashboard Features

Each department admin gets access to their department-specific dashboard with:

#### 📊 **Dashboard Overview**
- Department statistics
- Module count
- Access level information
- Quick navigation

#### 🔧 **Module Management**
Each department has different modules based on their needs:

**CSE-AI Department Modules:**
- Board of Studies
- Contact Information
- Department Info
- Department Library
- E-Resources
- Extra-Curricular Activities
- Faculty Achievements
- Faculty Development Programs
- Faculty Profiles
- Hackathons
- Handbooks
- Merit Scholarships
- Newsletters
- Physical Facilities
- Placement Batches
- Placement Gallery
- Staff
- Student Achievements
- Technical Association
- Training Activities
- Workshops

**ECE Department Modules:**
- Board of Studies
- Clubs
- Extra-Curricular Activities
- Faculty Achievements
- Faculty Data
- Faculty Innovations
- Faculty Development Programs
- Handbooks
- MOUs
- Newsletters
- Non-Teaching Faculty
- Physical Facilities
- Placements
- Scholarships & Toppers
- Syllabus
- Technical Association
- Workshops

**CST Department Modules:**
- Faculty
- Placements
- Workshops

#### ✨ **CRUD Operations**
For each module, admins can:

- **Create**: Add new records with form validation
- **Read**: View all records with pagination and search
- **Update**: Edit existing records
- **Delete**: Remove records with confirmation

#### 🔍 **Advanced Features**
- **Search**: Real-time search across all text fields
- **Pagination**: Handle large datasets efficiently
- **Filtering**: Advanced filtering options
- **Export**: Download data as CSV/Excel
- **Audit Trail**: Track all changes with user attribution

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Department-level data isolation
- Session management
- Password hashing with bcrypt

### Access Control Matrix

| Role | Super Admin Dashboard | Department Dashboard | All Dept Data | Own Dept Data |
|------|---------------------|---------------------|---------------|---------------|
| Super Admin | ✅ | ✅ | ✅ | ✅ |
| Admin | ✅ | ✅ (own dept) | ❌ | ✅ |
| Department | ❌ | ✅ (own dept) | ❌ | ✅ |

### Middleware Protection
- Route-based access control
- Token validation on every request
- Department access verification
- API endpoint protection

### Audit Logging
All actions are logged with:
- User information
- Action type (CREATE/READ/UPDATE/DELETE)
- Resource details
- Timestamp
- IP address
- Success/failure status

## 🛠 Technical Implementation

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Token verification

#### Department Management
- `GET /api/admin/departments/{dept}/{module}` - Fetch records
- `POST /api/admin/departments/{dept}/{module}` - Create record
- `PUT /api/admin/departments/{dept}/{module}?id={id}` - Update record
- `DELETE /api/admin/departments/{dept}/{module}?id={id}` - Delete record

#### Admin Operations
- `POST /api/admin/init-users` - Initialize admin users
- `GET /api/admin/audit-logs` - View audit trail
- `GET /api/admin/users` - Manage users

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  department VARCHAR(20) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  role ENUM('dept', 'admin', 'super_admin') DEFAULT 'dept',
  is_active BOOLEAN DEFAULT TRUE,
  must_change_password BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP NULL,
  login_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);
```

#### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(50) NULL,
  department VARCHAR(20) NULL,
  old_values JSON NULL,
  new_values JSON NULL,
  severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  status ENUM('success', 'failed', 'pending') DEFAULT 'success',
  error_message TEXT NULL,
  metadata JSON NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  session_id VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/svec_cms"

# JWT Secret
JWT_SECRET="your-jwt-secret-key"

# Admin Initialization Secret
ADMIN_INIT_SECRET="INIT_ADMIN_USERS_SECRET_2024"
```

### Department Configuration
Departments are configured in `/lib/auth/auth.ts`:

```typescript
export const DEPARTMENTS = {
  'cse': 'Computer Science and Engineering',
  'cse-ai': 'CSE (Artificial Intelligence)',
  'cse-ds': 'CSE (Data Science)',
  'ece': 'Electronics and Communication Engineering',
  // ... more departments
} as const;
```

## 📝 Development Guide

### Adding New Departments

1. **Update Department Configuration**
```typescript
// In /lib/auth/auth.ts
export const DEPARTMENTS = {
  // ... existing departments
  'new-dept': 'New Department Name',
};
```

2. **Add Department Modules**
```typescript
// In department dashboard
const DEPARTMENT_MODULES = {
  // ... existing departments
  'new-dept': [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'new_dept_faculty'
    },
    // ... more modules
  ],
};
```

3. **Create Database Tables**
```sql
CREATE TABLE new_dept_faculty (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  designation VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

4. **Add Admin User**
```typescript
// In scripts/init-department-admins.ts
const departmentAdmins = [
  // ... existing admins
  {
    username: 'newdept_admin',
    email: 'newdept.admin@svec.edu',
    password: 'NewDeptAdmin@2024',
    department: 'new-dept',
    role: 'admin' as const,
  },
];
```

### Adding New Modules to Existing Departments

1. **Update Module Configuration**
```typescript
'dept-code': [
  // ... existing modules
  { 
    key: 'new-module', 
    name: 'New Module', 
    icon: IconComponent, 
    description: 'Module description',
    table: 'dept_new_module'
  },
];
```

2. **Create Database Table**
3. **Update API Route Mapping**

## 🐛 Troubleshooting

### Common Issues

**1. Login Fails**
- Check if users are initialized: `GET /api/admin/init-users`
- Verify database connection
- Check JWT_SECRET configuration

**2. Access Denied**
- Verify user role and department
- Check middleware configuration
- Review audit logs for details

**3. Module Not Loading**
- Verify module configuration in DEPARTMENT_MODULES
- Check if database table exists
- Ensure API route mapping is correct

**4. Database Errors**
- Run initialization script
- Check database permissions
- Verify table schemas

### Debug Commands

```bash
# Check database connection
npm run db:test

# View user table
npm run db:users

# Check audit logs
npm run db:logs

# Reset admin users
npm run db:reset-admins
```

## 🔄 Maintenance

### Regular Tasks

1. **Monitor Audit Logs**
   - Review failed login attempts
   - Check unauthorized access attempts
   - Monitor data changes

2. **User Management**
   - Disable inactive users
   - Update passwords regularly
   - Review access permissions

3. **Database Maintenance**
   - Archive old audit logs
   - Backup user data
   - Monitor query performance

### Security Best Practices

1. **Change Default Passwords**: Update all default passwords after setup
2. **Enable HTTPS**: Use SSL/TLS in production
3. **Regular Backups**: Backup database and user data
4. **Monitor Access**: Review audit logs regularly
5. **Update Dependencies**: Keep libraries up to date
6. **Rate Limiting**: Implement API rate limiting
7. **Session Management**: Configure appropriate session timeouts

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review audit logs
3. Check database connectivity
4. Verify configuration files
5. Contact system administrator

## 🔗 Related Documentation

- [Authentication System](./auth-system.md)
- [Database Schema](./database-schema.md)
- [API Documentation](./api-docs.md)
- [Security Guidelines](./security-guidelines.md)