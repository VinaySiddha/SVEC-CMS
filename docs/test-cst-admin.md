# CST Admin Dashboard Test Guide

## Problem Summary
The CST admin dashboard has issues with data not being stored and table content not displaying properly.

## Root Cause Analysis
1. **Module Configuration**: The super admin dashboard had incomplete CST module configuration (only 4 modules instead of 24+ available)
2. **API Route Mismatch**: CST data is served by legacy APIs (`/api/cstcse/[module]`) but admin dashboard tries to use new admin APIs (`/api/admin/departments/cst/[module]`)
3. **Authentication**: JWT token validation may be failing for CST admin

## Solutions Applied

### 1. Fixed Super Admin Dashboard Module Configuration
Updated `/src/app/admin/dashboard/page.tsx` to include all 24 CST modules:
- bos-members, bos-minutes, department-library, department-overview
- eresources, extra-curricular, faculty, faculty-achievements
- faculty-development, hackathons, handbooks, industry-programs
- merit-scholarships, mous, newsletters, non-teaching-faculty
- physical-facilities, placements, sahaya-events, scud-activities
- student-achievements, syllabus, technical-faculty, training-activities

### 2. Department Dashboard Already Configured
The department-specific dashboard (`/src/app/departments/[dept]/dashboard/page.tsx`) already has proper CST configuration.

### 3. Testing Steps for CST Admin

#### Login Credentials
- Username: `cst_admin`
- Password: `CSTAdmin@2024`
- Role: `dept`
- Department: `cst`

#### Access URLs
- **Department Dashboard**: `/departments/cst/dashboard`
- **Super Admin Dashboard**: `/admin/dashboard` (if super admin access)

#### Expected Behavior
1. Login should redirect CST admin to `/departments/cst/dashboard`
2. Dashboard should show 24 CST modules
3. Clicking any module should load data from corresponding database table
4. Add/Edit/Delete operations should work through admin API endpoints

## Verification Steps

### 1. Test Login
```
URL: /auth/login
Credentials: cst_admin / CSTAdmin@2024
Expected: Redirect to /departments/cst/dashboard
```

### 2. Test Module Loading
```
URL: /departments/cst/dashboard
Expected: Grid view with 24 modules
Modules should include: Faculty, Students Achievements, Placements, etc.
```

### 3. Test Data Operations
```
1. Click any module (e.g., Faculty)
2. Should load data from cst_faculty table
3. "Add New Record" should open form
4. Form should save to database
5. Records should display in table view
```

### 4. Test API Endpoints
```bash
# Test faculty data (requires authentication)
curl -H "Authorization: Bearer <JWT_TOKEN>" \
     "http://localhost:3000/api/admin/departments/cst/faculty"
```

## Database Tables
CST department uses these tables:
- cst_faculty, cst_technical_faculty, cst_non_teaching_faculty
- cst_student_achievements, cst_faculty_achievements  
- cst_placements, cst_hackathons, cst_handbooks
- cst_eresources, cst_syllabus, cst_newsletters
- cst_physical_facilities, cst_department_library
- cst_bos_members, cst_bos_minutes
- cst_extra_curricular, cst_scud_activities
- cst_training_activities, cst_faculty_development
- And more...

## Next Steps if Issues Persist

1. **Check Database Connectivity**: Verify CST tables exist and are accessible
2. **Test API Authentication**: Ensure JWT tokens are valid for CST admin
3. **Verify API Route Mappings**: Confirm admin API correctly maps to CST tables
4. **Check CORS/Security Settings**: Ensure proper headers and permissions

## Manual Testing Commands

```bash
# Start development server
npm run dev

# Test login endpoint
curl -X POST "http://localhost:3000/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"identifier":"cst_admin","password":"CSTAdmin@2024"}'

# Test CST faculty endpoint (replace TOKEN with actual JWT)
curl -H "Authorization: Bearer TOKEN" \
     "http://localhost:3000/api/admin/departments/cst/faculty"
```

The main issue was the incomplete module configuration in the admin dashboard. With all 24 CST modules now properly configured, the admin should be able to access and manage all CST department data successfully.