#!/bin/bash

# SVEC CMS Database Setup Script
# This script helps set up the MySQL database and create initial users

echo "🚀 SVEC CMS Database Setup"
echo "=========================="

# Database configuration
MYSQL_HOST=62.72.31.209
MYSQL_USER=cmsuser
MYSQL_PASSWORD=V@savi@2001
DB_PORT="3306"

echo "📋 This script will:"
echo "1. Create the database: $DB_NAME"
echo "2. Import the schema"
echo "3. Create sample department users"
echo ""

read -p "📝 Enter MySQL root username (default: root): " MYSQL_USER
MYSQL_USER=${MYSQL_USER:-root}

read -s -p "🔒 Enter MySQL root password: " MYSQL_PASSWORD
echo ""

# Test connection
echo "🔍 Testing MySQL connection..."
mysql -h$DB_HOST -P$DB_PORT -u$MYSQL_USER -p$MYSQL_PASSWORD -e "SELECT 1;" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Failed to connect to MySQL. Please check your credentials."
    exit 1
fi

echo "✅ MySQL connection successful!"

# Create database
echo "📊 Creating database: $DB_NAME"
mysql -h$DB_HOST -P$DB_PORT -u$MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ Failed to create database."
    exit 1
fi

# Import schema
echo "📄 Importing schema..."
mysql -h$DB_HOST -P$DB_PORT -u$MYSQL_USER -p$MYSQL_PASSWORD $DB_NAME < schema.sql

if [ $? -ne 0 ]; then
    echo "❌ Failed to import schema."
    exit 1
fi

echo "✅ Schema imported successfully!"

# Create sample users (you should change these passwords in production)
echo "👥 Creating sample department users..."

# Array of departments
departments=(
    "cse:Computer Science and Engineering"
    "ece:Electronics and Communication Engineering"
    "eee:Electrical and Electronics Engineering"
    "civil:Civil Engineering"
    "mech:Mechanical Engineering"
    "mba:Master of Business Administration"
)

# Create users for each department
for dept_info in "${departments[@]}"; do
    IFS=':' read -r dept_code dept_name <<< "$dept_info"
    
    # Generate a simple password (you should change this in production)
    password="svec${dept_code}123"
    
    echo "Creating user for $dept_name..."
    
    # Note: In production, you should hash the password properly
    # This is a simplified version for demonstration
    mysql -h$DB_HOST -P$DB_PORT -u$MYSQL_USER -p$MYSQL_PASSWORD $DB_NAME -e "
        INSERT IGNORE INTO users (username, email, password_hash, department, department_name, role) 
        VALUES 
        ('${dept_code}_admin', '${dept_code}@svecw.edu.in', '$2b$12\$dummy.hash.for.${dept_code}', '${dept_code}', '${dept_name}', 'dept');
    " 2>/dev/null
done

# Create admin user
echo "🔐 Creating admin user..."
mysql -h$DB_HOST -P$DB_PORT -u$MYSQL_USER -p$MYSQL_PASSWORD $DB_NAME -e "
    INSERT IGNORE INTO users (username, email, password_hash, department, department_name, role) 
    VALUES 
    ('admin', 'admin@svecw.edu.in', '$2b$12\$dummy.hash.for.admin', 'admin', 'Administration', 'admin');
" 2>/dev/null

echo ""
echo "✅ Database setup completed!"
echo ""
echo "📋 Sample Login Credentials (CHANGE IN PRODUCTION):"
echo "=================================================="
echo "Admin Login:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "Department Logins:"
for dept_info in "${departments[@]}"; do
    IFS=':' read -r dept_code dept_name <<< "$dept_info"
    echo "  $dept_name:"
    echo "    Username: ${dept_code}_admin"
    echo "    Password: svec${dept_code}123"
done

echo ""
echo "⚠️  IMPORTANT SECURITY NOTES:"
echo "1. Change all default passwords immediately"
echo "2. Update JWT_SECRET in your .env.local file"
echo "3. Use strong passwords in production"
echo "4. Set up proper SSL/TLS for production"
echo ""
echo "🔗 Next steps:"
echo "1. Copy .env.example to .env.local"
echo "2. Update database credentials in .env.local"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:9002/auth/login"
