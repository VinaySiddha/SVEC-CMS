#!/bin/bash

# SVEC-CMS Route Conflict Resolution Script
# This script fixes the conflicting dynamic routes in your Next.js application

echo "🔧 SVEC-CMS Route Conflict Resolution"
echo "======================================"

# Function to check if directory exists
check_directory() {
    if [ -d "$1" ]; then
        echo "✅ Found: $1"
        return 0
    else
        echo "❌ Not found: $1"
        return 1
    fi
}

# Function to safely remove directory
safe_remove() {
    if [ -d "$1" ]; then
        echo "🗑️  Removing conflicting directory: $1"
        rm -rf "$1"
        echo "✅ Removed: $1"
    else
        echo "⚠️  Directory not found: $1"
    fi
}

# Function to create backup
create_backup() {
    local source="$1"
    local backup="$1.backup.$(date +%Y%m%d_%H%M%S)"
    
    if [ -d "$source" ]; then
        echo "💾 Creating backup: $backup"
        cp -r "$source" "$backup"
        echo "✅ Backup created: $backup"
    fi
}

echo ""
echo "Step 1: Analyzing current route structure..."
echo "-------------------------------------------"

# Check for conflicting routes in app directory
echo "🔍 Checking App Router conflicts..."
check_directory "src/app/departments/[dept]"
DEPT_APP_EXISTS=$?

check_directory "src/app/departments/[deptId]"
DEPTID_APP_EXISTS=$?

# Check for conflicting routes in API directory
echo "🔍 Checking API Router conflicts..."
check_directory "src/app/api/departments/[dept]"
DEPT_API_EXISTS=$?

check_directory "src/app/api/departments/[deptId]"
DEPTID_API_EXISTS=$?

echo ""
echo "Step 2: Creating backups before making changes..."
echo "------------------------------------------------"

# Create backups if conflicting directories exist
if [ $DEPT_APP_EXISTS -eq 0 ]; then
    create_backup "src/app/departments/[dept]"
fi

if [ $DEPT_API_EXISTS -eq 0 ]; then
    create_backup "src/app/api/departments/[dept]"
fi

echo ""
echo "Step 3: Resolving route conflicts..."
echo "------------------------------------"

# Remove the conflicting [dept] routes (keeping [deptId] as the main implementation)
if [ $DEPT_APP_EXISTS -eq 0 ] && [ $DEPTID_APP_EXISTS -eq 0 ]; then
    echo "🔄 Resolving App Router conflict..."
    safe_remove "src/app/departments/[dept]"
    echo "✅ App Router conflict resolved - using [deptId] route"
fi

if [ $DEPT_API_EXISTS -eq 0 ] && [ $DEPTID_API_EXISTS -eq 0 ]; then
    echo "🔄 Resolving API Router conflict..."
    safe_remove "src/app/api/departments/[dept]"
    echo "✅ API Router conflict resolved - using [deptId] route"
fi

echo ""
echo "Step 4: Cleaning up build artifacts..."
echo "-------------------------------------"

# Clean Next.js cache and build artifacts
echo "🧹 Clearing .next directory..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "✅ Cleared .next directory"
fi

echo "🧹 Clearing Turbopack cache..."
if [ -d ".next/cache" ]; then
    rm -rf .next/cache
fi

# Clear node_modules/.cache if it exists
if [ -d "node_modules/.cache" ]; then
    echo "🧹 Clearing node_modules cache..."
    rm -rf node_modules/.cache
    echo "✅ Cleared node_modules cache"
fi

echo ""
echo "Step 5: Verification..."
echo "----------------------"

echo "🔍 Verifying route structure..."
if [ -d "src/app/departments/[deptId]" ] && [ ! -d "src/app/departments/[dept]" ]; then
    echo "✅ App Router: Only [deptId] route exists"
else
    echo "❌ App Router: Route conflict may still exist"
fi

if [ -d "src/app/api/departments/[deptId]" ] && [ ! -d "src/app/api/departments/[dept]" ]; then
    echo "✅ API Router: Only [deptId] route exists"
else
    echo "❌ API Router: Route conflict may still exist"
fi

echo ""
echo "🎉 Route Conflict Resolution Complete!"
echo "====================================="

echo ""
echo "📋 Summary of changes:"
echo "• Removed conflicting [dept] routes"
echo "• Kept [deptId] routes as the main implementation"
echo "• Created backups with timestamp"
echo "• Cleared build cache"

echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Test the department routes to ensure they work correctly"
echo "3. If any components reference 'dept' prop, update them to use 'deptId'"

echo ""
echo "⚠️  If you encounter any issues:"
echo "• Check the backup directories created (*.backup.*)"
echo "• Review any components that might be importing from the removed routes"
echo "• Update any hardcoded references from 'dept' to 'deptId'"

echo ""
echo "✨ Script execution completed!"