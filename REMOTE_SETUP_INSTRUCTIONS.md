# Super Admin Setup Instructions for Remote Database

## 🏁 Quick Setup

Since you have a remote MySQL database, follow these steps to set up the Super Admin system:

### Option 1: Using Node.js Setup Script (Recommended for Windows)

```bash
# Install required dependencies first
npm install mysql2 bcrypt

# Run the Node.js setup script
node setup-remote-super-admin.js
```

### Option 2: Using Bash Script (Linux/macOS/WSL)

```bash
# Make the script executable
chmod +x setup-remote-super-admin.sh

# Run the setup script
./setup-remote-super-admin.sh
```

### Option 3: Manual Setup

If the scripts don't work, you can set up manually:

1. **Apply Database Schema**:
   ```bash
   # Connect to your remote database
   mysql -h 62.72.31.209 -P 3306 -u cmsuser -p'V@savi@2001' svec_cms < super_admin_schema.sql
   ```

2. **Install Dependencies**:
   ```bash
   npm install @radix-ui/react-select class-variance-authority mysql2 bcrypt
   ```

3. **Create Super Admin User**:
   ```javascript
   // Run this Node.js script
   const mysql = require('mysql2/promise');
   const bcrypt = require('bcrypt');

   async function createSuperAdmin() {
     const connection = await mysql.createConnection({
       host: '62.72.31.209',
       user: 'cmsuser', 
       password: 'V@savi@2001',
       database: 'svec_cms',
       port: 3306
     });

     const hashedPassword = await bcrypt.hash('your-password-here', 12);
     
     await connection.execute(`
       INSERT INTO users (username, email, password_hash, department, department_name, role, is_active) 
       VALUES ('admin', 'admin@svec.ac.in', ?, 'admin', 'System Administration', 'super_admin', 1)
     `, [hashedPassword]);

     const [user] = await connection.execute('SELECT id FROM users WHERE username = "admin"');
     const userId = user[0].id;

     const permissions = ['manage_users', 'view_all_departments', 'create_credentials', 'manage_system_settings', 'view_audit_logs'];
     for (const perm of permissions) {
       await connection.execute('INSERT INTO super_admin_permissions (user_id, permission, is_active) VALUES (?, ?, 1)', [userId, perm]);
     }

     await connection.end();
     console.log('Super admin created successfully!');
   }

   createSuperAdmin().catch(console.error);
   ```

4. **Build and Start**:
   ```bash
   npm run build
   npm run dev
   ```

## 🔐 Access Your Super Admin System

1. **Start the application**: `npm run dev`
2. **Navigate to**: `http://localhost:3000/super-admin/login`
3. **Login with your credentials**
4. **Access via header**: Click "Super Admin" in the main navigation

## 📊 What You Get

### Dashboard Features:
- **Real-time Statistics**: Total departments, users, credentials
- **System Health Monitoring**: Overall system status
- **Recent Activities**: Latest administrative actions
- **Quick Actions**: Direct links to management functions

### Department Management:
- **Complete Overview**: All departments with statistics
- **Faculty Information**: HOD details and contact info
- **Activity Tracking**: Recent department activities
- **Status Management**: Approve/manage department status

### Credential Management:
- **Create Users**: Department-specific user accounts
- **Access Levels**: Read, write, or admin access
- **Module Permissions**: Granular access control
- **Expiration Dates**: Time-limited access
- **Session Management**: Control session timeouts

### Security & Monitoring:
- **Audit Logging**: Complete activity tracking
- **Permission System**: Role-based access control
- **IP Tracking**: Monitor access locations
- **Session Security**: Secure JWT-based authentication

## 🔧 Remote Database Benefits

Your setup with the remote database at `62.72.31.209` provides:
- ✅ **Centralized Data**: All data in one secure location
- ✅ **Multi-user Access**: Team members can access from different locations
- ✅ **Backup & Recovery**: Professional database hosting
- ✅ **Scalability**: Can handle multiple concurrent users
- ✅ **Security**: Network-level access control

## 🛡️ Security Notes

Since you're using a remote database:
1. **Change Default Passwords**: Update super admin password after first login
2. **Monitor Access**: Check audit logs regularly
3. **Network Security**: Ensure your database server is properly secured
4. **JWT Secret**: Change the JWT_SECRET to a unique value
5. **HTTPS**: Use HTTPS in production

## 🚨 Troubleshooting

### Database Connection Issues:
```bash
# Test connection manually
mysql -h 62.72.31.209 -P 3306 -u cmsuser -p'V@savi@2001' -e "USE svec_cms; SELECT 1;"
```

### Build Errors:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Permission Issues:
Check that your database user `cmsuser` has:
- CREATE, ALTER privileges (for schema setup)
- INSERT, UPDATE, DELETE, SELECT privileges
- INDEX privileges (for performance)

## ✅ Success Indicators

After successful setup, you should see:
1. ✅ Super Admin tables created in `svec_cms` database
2. ✅ Super admin user in `users` table with role `super_admin`  
3. ✅ Default permissions in `super_admin_permissions` table
4. ✅ "Super Admin" link appears in main header
5. ✅ Login page accessible at `/super-admin/login`
6. ✅ Dashboard shows system statistics

Your remote database setup provides enterprise-level capabilities for managing the entire SVEC-CMS system! 🚀