# Super Admin System - SVEC-CMS

A comprehensive super admin system for managing all department data, user credentials, and system administration for Sri Vasavi Engineering College CMS.

## 🚀 Features

### Core Features
- **🔐 Secure Authentication**: Enhanced JWT-based authentication with role-based access control
- **👥 Department Management**: Complete oversight of all departments with statistics and activity tracking
- **🔑 Credential Management**: Create and manage department user credentials with fine-grained permissions
- **📊 System Dashboard**: Real-time statistics and system health monitoring
- **🔍 Audit Logging**: Comprehensive logging of all super admin actions and system changes
- **⚙️ System Settings**: Global configuration management
- **📱 Clean UI**: Professional, responsive interface integrated under the main header

### Security Features
- **Role-based Access Control**: Granular permissions system
- **Session Management**: Secure session handling with automatic expiration
- **Rate Limiting**: Protection against brute force attacks
- **Audit Trail**: Complete logging of all administrative actions
- **IP Restriction**: Optional IP-based access restrictions
- **2FA Ready**: Framework for two-factor authentication

## 📋 Database Schema

The system adds several new tables to the existing SVEC-CMS database:

- **`super_admin_permissions`**: Fine-grained permission system
- **`department_credentials`**: Department user credential management
- **`audit_logs`**: Comprehensive activity logging
- **`system_settings`**: Global system configuration
- **`department_data_access`**: Department-specific access controls

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MySQL/MariaDB
- Existing SVEC-CMS installation

### Setup Steps

1. **Run the setup script**:
   ```bash
   chmod +x setup-super-admin.sh
   ./setup-super-admin.sh
   ```

2. **Manual setup** (if script fails):
   ```bash
   # Apply database schema
   mysql -u root -p < super_admin_schema.sql
   
   # Install dependencies
   npm install @radix-ui/react-select class-variance-authority
   
   # Create super admin user (replace with your details)
   node -e "
   const bcrypt = require('bcrypt');
   bcrypt.hash('your-password', 12).then(hash => {
     console.log('INSERT INTO users (username, email, password_hash, department, department_name, role, is_active) VALUES (\\'admin\\', \\'admin@svec.ac.in\\', \\'', hash, '\\', \\'admin\\', \\'System Administration\\', \\'super_admin\\', 1);');
   });
   " | mysql -u root -p your_database_name
   ```

3. **Configure environment**:
   ```bash
   # Add to .env.local
   JWT_SECRET=your-super-secret-jwt-key-256-bits-minimum
   ```

4. **Build and start**:
   ```bash
   npm run build
   npm run dev
   ```

## 🎯 Usage

### Accessing Super Admin

1. Navigate to: `http://localhost:3000/super-admin/login`
2. Use the credentials you created during setup
3. Access the clean, professional dashboard

### Key Functionality

#### Department Management
- View all departments with real-time statistics
- Monitor faculty, users, and achievements
- Track department activities
- Manage department status and information

#### Credential Management
- Create department-specific user accounts
- Set access levels (read, write, admin)
- Configure module-specific permissions
- Set account expiration dates
- Add administrative notes

#### System Monitoring
- Real-time dashboard with key metrics
- System health monitoring
- Recent activity tracking
- User login statistics

#### Audit Logging
- Complete activity logs with timestamps
- IP address and user agent tracking
- Severity levels for different actions
- Searchable and filterable logs

## 🔧 API Endpoints

### Authentication
- `POST /api/super-admin/auth/login` - Super admin login
- `POST /api/super-admin/auth/verify` - Token verification
- `POST /api/super-admin/auth/logout` - Secure logout

### Department Management
- `GET /api/super-admin/departments` - Get all departments
- `POST /api/super-admin/departments` - Create department

### Credential Management
- `GET /api/super-admin/credentials` - Get all credentials
- `POST /api/super-admin/credentials` - Create credential
- `PUT /api/super-admin/credentials/[id]` - Update credential
- `DELETE /api/super-admin/credentials/[id]` - Delete credential

### Dashboard
- `GET /api/super-admin/dashboard/stats` - System statistics
- `GET /api/super-admin/dashboard/activities` - Recent activities

## 🛡️ Security

### Built-in Security Features
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: bcrypt with salt rounds
- **CSRF Protection**: Built-in Next.js protection
- **Rate Limiting**: Configurable request limits
- **Session Management**: Automatic token expiration
- **Audit Logging**: All actions are logged
- **Role Verification**: Middleware-based access control

### Security Best Practices
1. Use strong JWT secrets (256+ bits)
2. Enable HTTPS in production
3. Regularly rotate JWT secrets
4. Monitor audit logs for suspicious activity
5. Use IP restrictions when possible
6. Enable two-factor authentication

## 📊 Permissions System

The system uses a granular permissions model:

### Available Permissions
- `manage_users` - Create/edit/delete users
- `view_all_departments` - Access all department data
- `create_credentials` - Create new department credentials
- `manage_system_settings` - Modify global settings
- `view_audit_logs` - Access system audit logs

### Permission Inheritance
- Super admins have all permissions by default
- Permissions can be granted/revoked individually
- Time-based permissions with expiration dates

## 🎨 UI Components

### Key Components
- **SuperAdminLayout**: Main layout with sidebar navigation
- **SuperAdminProvider**: Authentication context provider
- **Dashboard Cards**: Real-time statistics display
- **Credential Management**: Complete CRUD interface
- **Department Overview**: Comprehensive department management
- **Audit Viewer**: Searchable activity logs

### Design Features
- **Responsive Design**: Works on all device sizes
- **Clean Interface**: Professional, intuitive design
- **Real-time Updates**: Live data refresh
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🔄 Integration

The super admin system integrates seamlessly with the existing SVEC-CMS:

- **Header Integration**: Clean super admin link in main navigation
- **Database Integration**: Extends existing database schema
- **Authentication Flow**: Independent but compatible auth system
- **Audit Integration**: Logs administrative actions across the system

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check MySQL/MariaDB is running
   sudo systemctl status mysql
   
   # Verify database credentials
   mysql -u root -p
   ```

2. **JWT Token Issues**
   ```bash
   # Ensure JWT_SECRET is set in .env.local
   echo "JWT_SECRET=$(node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))')" >> .env.local
   ```

3. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules
   npm install
   npm run build
   ```

4. **Permission Denied**
   ```bash
   # Check file permissions
   chmod +x setup-super-admin.sh
   
   # Check database permissions
   # Ensure user has CREATE, INSERT, UPDATE, DELETE privileges
   ```

## 📈 Monitoring

### Key Metrics to Monitor
- Failed login attempts
- Permission changes
- User account modifications
- System setting changes
- Department data modifications

### Log Analysis
```sql
-- Check recent super admin activities
SELECT * FROM audit_logs 
WHERE severity IN ('high', 'critical') 
ORDER BY created_at DESC 
LIMIT 50;

-- Monitor failed login attempts
SELECT * FROM audit_logs 
WHERE action = 'login_failed' 
AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR);
```

## 🚀 Future Enhancements

### Planned Features
- [ ] Two-Factor Authentication (2FA)
- [ ] Advanced reporting and analytics
- [ ] Bulk user management
- [ ] Department data import/export
- [ ] Email notifications for critical actions
- [ ] Advanced role management
- [ ] API key management for external integrations

### Integration Opportunities
- [ ] Single Sign-On (SSO) integration
- [ ] LDAP/Active Directory integration
- [ ] Third-party audit log services
- [ ] External monitoring systems

## 📞 Support

For support or questions about the super admin system:

1. Check the troubleshooting section above
2. Review the audit logs for error details
3. Ensure all dependencies are properly installed
4. Verify database schema is correctly applied

## 📝 License

This super admin system is part of the SVEC-CMS project and follows the same licensing terms.

---

**Security Note**: This system provides powerful administrative capabilities. Always follow security best practices and regularly monitor audit logs for any unauthorized access attempts.