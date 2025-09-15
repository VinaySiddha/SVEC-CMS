#!/bin/bash

# Super Admin Setup Script for SVEC-CMS
# This script initializes the super admin system

echo "🚀 Setting up Super Admin System for SVEC-CMS..."

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

# Check if MySQL/MariaDB is running
print_status "Checking database connection..."
if ! command -v mysql &> /dev/null; then
    print_error "MySQL client not found. Please install MySQL/MariaDB."
    exit 1
fi

# Run the super admin schema
print_status "Creating super admin database schema..."
if mysql -u root -p < super_admin_schema.sql; then
    print_success "Super admin schema created successfully!"
else
    print_error "Failed to create super admin schema. Please check your database connection."
    exit 1
fi

# Install additional dependencies if needed
print_status "Installing additional dependencies..."
npm install @radix-ui/react-select class-variance-authority

# Create super admin user (interactive)
echo ""
print_status "Creating initial super admin user..."
read -p "Enter super admin username: " SUPER_ADMIN_USERNAME
read -p "Enter super admin email: " SUPER_ADMIN_EMAIL
read -s -p "Enter super admin password: " SUPER_ADMIN_PASSWORD
echo ""

# Hash the password using Node.js
HASHED_PASSWORD=$(node -e "
const bcrypt = require('bcrypt');
bcrypt.hash('$SUPER_ADMIN_PASSWORD', 12).then(hash => console.log(hash));
")

# Insert super admin user
print_status "Inserting super admin user into database..."
mysql -u root -p << EOF
INSERT INTO users (username, email, password_hash, department, department_name, role, is_active) 
VALUES ('$SUPER_ADMIN_USERNAME', '$SUPER_ADMIN_EMAIL', '$HASHED_PASSWORD', 'admin', 'System Administration', 'super_admin', 1);
EOF

if [ $? -eq 0 ]; then
    print_success "Super admin user created successfully!"
else
    print_error "Failed to create super admin user."
    exit 1
fi

# Set up environment variables
print_status "Setting up environment variables..."
if [ ! -f .env.local ]; then
    echo "JWT_SECRET=your-super-secret-jwt-key-here-please-change-this" >> .env.local
    print_warning "Please update JWT_SECRET in .env.local with a secure secret!"
else
    if ! grep -q "JWT_SECRET" .env.local; then
        echo "JWT_SECRET=your-super-secret-jwt-key-here-please-change-this" >> .env.local
        print_warning "JWT_SECRET added to .env.local. Please change it to a secure secret!"
    fi
fi

# Build the project
print_status "Building the project..."
if npm run build; then
    print_success "Project built successfully!"
else
    print_warning "Build failed, but super admin setup is complete. Please fix any build errors."
fi

echo ""
print_success "🎉 Super Admin system setup complete!"
echo ""
echo "Next steps:"
echo "1. Update JWT_SECRET in .env.local with a secure random key"
echo "2. Start the development server: npm run dev"
echo "3. Navigate to: http://localhost:3000/super-admin/login"
echo "4. Login with your super admin credentials"
echo ""
echo "Super Admin Features:"
echo "✅ Department Management"
echo "✅ User Credential Management"
echo "✅ Audit Logging"
echo "✅ System Statistics"
echo "✅ Role-based Access Control"
echo "✅ Clean Professional UI"
echo ""
print_status "Happy administrating! 🚀"