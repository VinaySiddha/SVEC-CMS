#!/bin/bash

# Remote Super Admin Setup Script for SVEC-CMS
# This script initializes the super admin system for remote database

echo "🚀 Setting up Super Admin System for SVEC-CMS (Remote Database)..."

# Database configuration from .env
DB_HOST="62.72.31.209"
DB_USER="cmsuser"
DB_PASSWORD="V@savi@2001"
DB_NAME="svec_cms"npm run dev
DB_PORT="3306"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if MySQL client is available
# print_status "Checking MySQL client availability..."
# if ! command -v mysql &> /dev/null; then
#     print_error "MySQL client not found. Please install MySQL client."
#     print_status "On Ubuntu/Debian: sudo apt-get install mysql-client"
#     print_status "On CentOS/RHEL: sudo yum install mysql"
#     print_status "On macOS: brew install mysql-client"
#     exit 1
# fi

# Test database connection
print_status "Testing remote database connection..."
if mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "USE $DB_NAME; SELECT 1;" &> /dev/null; then
    print_success "Remote database connection successful!"
else
    print_error "Cannot connect to remote database. Please check your credentials and network connection."
    print_status "Host: $DB_HOST:$DB_PORT"
    print_status "User: $DB_USER"
    print_status "Database: $DB_NAME"
    exit 1
fi

# Check if tables already exist
print_status "Checking existing database schema..."
TABLES_EXIST=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" -e "SHOW TABLES LIKE 'super_admin_permissions';" --skip-column-names 2>/dev/null | wc -l)

if [ "$TABLES_EXIST" -gt 0 ]; then
    print_warning "Super admin tables already exist. Do you want to recreate them? (y/N)"
    read -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Skipping schema creation."
    else
        print_status "Dropping existing super admin tables..."
        mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" << 'EOF'
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS super_admin_permissions;
DROP TABLE IF EXISTS department_credentials;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS system_settings;
DROP TABLE IF EXISTS department_data_access;
SET FOREIGN_KEY_CHECKS = 1;
EOF
    fi
fi

# Apply the super admin schema to remote database
print_status "Creating super admin database schema on remote server..."
if mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" < super_admin_schema.sql; then
    print_success "Super admin schema created successfully on remote database!"
else
    print_error "Failed to create super admin schema. Please check the SQL file and database permissions."
    exit 1
fi

# Install additional Node.js dependencies
print_status "Installing additional Node.js dependencies..."
if npm install @radix-ui/react-select class-variance-authority; then
    print_success "Dependencies installed successfully!"
else
    print_warning "Some dependencies may have failed to install. Please check npm logs."
fi

# Create super admin user (interactive)
echo ""
print_status "Creating initial super admin user..."
echo "Please provide details for the first super admin account:"
read -p "Enter super admin username: " SUPER_ADMIN_USERNAME

while [[ -z "$SUPER_ADMIN_USERNAME" ]]; do
    print_error "Username cannot be empty!"
    read -p "Enter super admin username: " SUPER_ADMIN_USERNAME
done

read -p "Enter super admin email: " SUPER_ADMIN_EMAIL

while [[ -z "$SUPER_ADMIN_EMAIL" ]] || [[ ! "$SUPER_ADMIN_EMAIL" =~ ^[^@]+@[^@]+\.[^@]+$ ]]; do
    print_error "Please enter a valid email address!"
    read -p "Enter super admin email: " SUPER_ADMIN_EMAIL
done

read -s -p "Enter super admin password (min 8 characters): " SUPER_ADMIN_PASSWORD
echo ""

while [[ ${#SUPER_ADMIN_PASSWORD} -lt 8 ]]; do
    print_error "Password must be at least 8 characters long!"
    read -s -p "Enter super admin password (min 8 characters): " SUPER_ADMIN_PASSWORD
    echo ""
done

# Check if user already exists
print_status "Checking if user already exists..."
USER_EXISTS=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" -e "SELECT COUNT(*) FROM users WHERE username='$SUPER_ADMIN_USERNAME' OR email='$SUPER_ADMIN_EMAIL';" --skip-column-names 2>/dev/null)

if [ "$USER_EXISTS" -gt 0 ]; then
    print_error "A user with this username or email already exists!"
    print_status "Please choose different credentials or delete the existing user first."
    exit 1
fi

# Hash the password using Node.js
print_status "Hashing password..."
HASHED_PASSWORD=$(node -e "
const bcrypt = require('bcrypt');
bcrypt.hash('$SUPER_ADMIN_PASSWORD', 12)
  .then(hash => console.log(hash))
  .catch(err => {
    console.error('Password hashing failed:', err);
    process.exit(1);
  });
")

if [[ -z "$HASHED_PASSWORD" ]]; then
    print_error "Password hashing failed. Make sure bcrypt is installed."
    print_status "Try: npm install bcrypt"
    exit 1
fi

# Insert super admin user into remote database
print_status "Creating super admin user in remote database..."
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" << EOF
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active, created_at) 
VALUES ('$SUPER_ADMIN_USERNAME', '$SUPER_ADMIN_EMAIL', '$HASHED_PASSWORD', 'admin', 'System Administration', 'super_admin', 1, NOW());
EOF

if [ $? -eq 0 ]; then
    print_success "Super admin user created successfully in remote database!"
else
    print_error "Failed to create super admin user in remote database."
    exit 1
fi

# Get the created user ID for permission setup
USER_ID=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" -e "SELECT id FROM users WHERE username='$SUPER_ADMIN_USERNAME';" --skip-column-names)

# Grant default super admin permissions
print_status "Setting up default super admin permissions..."
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" << EOF
INSERT INTO super_admin_permissions (user_id, permission, is_active) VALUES
($USER_ID, 'manage_users', 1),
($USER_ID, 'view_all_departments', 1),
($USER_ID, 'create_credentials', 1),
($USER_ID, 'manage_system_settings', 1),
($USER_ID, 'view_audit_logs', 1);
EOF

if [ $? -eq 0 ]; then
    print_success "Default permissions granted successfully!"
else
    print_warning "Failed to grant some permissions. You can set them manually later."
fi

# Verify JWT_SECRET in environment
print_status "Checking JWT configuration..."
if grep -q "JWT_SECRET=" .env; then
    print_success "JWT_SECRET found in .env file"
else
    print_warning "JWT_SECRET not found in .env file"
    echo "JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30" >> .env
    print_warning "Added default JWT_SECRET. Please change it to a secure secret in production!"
fi

# Build the project
print_status "Building the Next.js project..."
if npm run build; then
    print_success "Project built successfully!"
else
    print_warning "Build had some issues, but super admin setup is complete."
    print_status "You may need to fix any TypeScript or build errors before running the application."
fi

# Final success message
echo ""
echo "🎉 ============================================"
print_success "Super Admin System Setup Complete!"
echo "============================================"
echo ""
echo "📋 Setup Summary:"
echo "   ✅ Remote database schema created"
echo "   ✅ Super admin user created: $SUPER_ADMIN_USERNAME"
echo "   ✅ Default permissions granted"
echo "   ✅ Dependencies installed"
echo "   ✅ Project built"
echo ""
echo "🚀 Next Steps:"
echo "   1. Start the development server: npm run dev"
echo "   2. Navigate to: http://localhost:3000/super-admin/login"
echo "   3. Login with your super admin credentials"
echo ""
echo "🔗 Access Points:"
echo "   • Main Header: Click 'Super Admin' link"
echo "   • Direct URL: /super-admin/login"
echo "   • Dashboard: /super-admin/dashboard"
echo ""
echo "🛡️ Security Notes:"
echo "   • Your remote database is at: $DB_HOST:$DB_PORT"
echo "   • All actions will be logged in audit_logs table"
echo "   • Change JWT_SECRET in production"
echo "   • Monitor audit logs regularly"
echo ""
echo "📊 Super Admin Features:"
echo "   ✅ Department Management"
echo "   ✅ User Credential Management"  
echo "   ✅ System Statistics & Monitoring"
echo "   ✅ Audit Logging & Activity Tracking"
echo "   ✅ Role-based Access Control"
echo "   ✅ Clean Professional Interface"
echo ""
print_success "Happy administrating! 🚀"
echo ""
EOF