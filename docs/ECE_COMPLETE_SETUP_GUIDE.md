# ECE Department - Complete Tables Setup Guide

## Problem
Console errors when accessing ECE department page:
```
SyntaxError: Unexpected token '<', "<!DOCTYPE"... is not valid JSON
```

This indicates multiple missing database tables in the ECE department API endpoints.

## Missing Tables
The ECE department requires 11 tables. Here's what's missing:

| # | Table Name | API Endpoint | Status |
|---|---|---|---|
| 1 | `ece_newsletters` | `/api/ece/newsletters` | ❌ Missing |
| 2 | `ece_extracurricularactivities` | `/api/ece/extracurricularactivities` | ❌ Missing |
| 3 | `ece_facultyinnovations` | `/api/ece/facultyinnovations` | ❌ Missing |
| 4 | `ece_clubs` | (Referenced in API) | ❌ Missing |
| 5 | `ece_placements` | `/api/ece/placements` | ❌ Missing |
| 6 | `ece_mous` | `/api/ece/mous` | ❌ Missing |
| 7 | `ece_handbooks` | `/api/ece/handbooks` | ❌ Missing |
| 8 | `ece_syllabus` | `/api/ece/syllabus` | ❌ Missing |
| 9 | `ece_scholarships_toppers` | `/api/ece/scholarships-toppers` | ❌ Missing |
| 10 | `ece_physical_facilities` | `/api/ece/physical_facilities` | ❌ Missing |
| 11 | `ece_nonteaching_faculty` | `/api/ece/nonteaching-faculty` | ❌ Missing |

## Solution: Execute the Comprehensive SQL Schema

### Option 1: MySQL Command Line (Recommended)
```bash
mysql -h 62.72.31.209 -u cmsuser -p'V@savi@2001' svec_cms < ECE_ALL_TABLES_SCHEMA.sql
```

### Option 2: MySQL Workbench
1. Open MySQL Workbench
2. Connect to: `62.72.31.209` (svec_cms database)
3. Username: `cmsuser`
4. Password: `V@savi@2001`
5. File → Open SQL Script → Select `ECE_ALL_TABLES_SCHEMA.sql`
6. Execute (Ctrl+Shift+Enter or click Execute)

### Option 3: phpMyAdmin
1. Login to phpMyAdmin for your hosting
2. Select `svec_cms` database
3. Click "SQL" tab
4. Open `ECE_ALL_TABLES_SCHEMA.sql` and copy content
5. Paste into query editor
6. Click "Go"

### Option 4: cPanel File Manager
1. Login to cPanel
2. Go to File Manager
3. Navigate to MySQL directory
4. Upload `ECE_ALL_TABLES_SCHEMA.sql`
5. Use MySQL Import feature

## Verification Steps

### Step 1: Verify Tables Exist
```sql
-- Check all tables
SHOW TABLES LIKE 'ece_%';

-- Should return 11 tables:
-- ece_clubs
-- ece_extracurricularactivities
-- ece_facultyinnovations
-- ece_handbooks
-- ece_mous
-- ece_newsletters
-- ece_nonteaching_faculty
-- ece_physical_facilities
-- ece_placements
-- ece_scholarships_toppers
-- ece_syllabus
```

### Step 2: Verify Table Structure
```sql
-- Example: Check newsletters table
DESC ece_newsletters;

-- Should show: id, title, url, year, created_at, updated_at
```

### Step 3: Verify Sample Data
```sql
-- Check if sample data was inserted
SELECT COUNT(*) FROM ece_newsletters;      -- Should show: 3
SELECT COUNT(*) FROM ece_extracurricularactivities;  -- Should show: 6
SELECT COUNT(*) FROM ece_placements;       -- Should show: 5
```

### Step 4: Test API Endpoints
```bash
# Test each endpoint
curl http://localhost:3000/api/ece/newsletters
curl http://localhost:3000/api/ece/extracurricularactivities
curl http://localhost:3000/api/ece/facultyinnovations
curl http://localhost:3000/api/ece/clubs
curl http://localhost:3000/api/ece/placements
curl http://localhost:3000/api/ece/mous
curl http://localhost:3000/api/ece/handbooks
curl http://localhost:3000/api/ece/syllabus
curl http://localhost:3000/api/ece/scholarships-toppers
curl http://localhost:3000/api/ece/physical_facilities
curl http://localhost:3000/api/ece/nonteaching-faculty
```

## Table Schemas

### 1. ece_newsletters
```sql
Columns: id, title, url, year, created_at, updated_at
Sample Records: 3
```

### 2. ece_extracurricularactivities
```sql
Columns: id, type, label, created_at, updated_at
Sample Records: 6
Types: sports, cultural, technical
```

### 3. ece_facultyinnovations
```sql
Columns: id, title, description, year, innovators, category, created_at, updated_at
Sample Records: 3
Categories: IoT, AI/ML, Networking
```

### 4. ece_clubs
```sql
Columns: id, name, description, coordinator, created_at, updated_at
Sample Records: 3
```

### 5. ece_placements
```sql
Columns: id, company_name, package_offered, no_of_students, year, created_at, updated_at
Sample Records: 5
```

### 6. ece_mous
```sql
Columns: id, organization_name, mou_type, date_signed, details, url, created_at, updated_at
Sample Records: 3
```

### 7. ece_handbooks
```sql
Columns: id, title, description, url, category, created_at, updated_at
Sample Records: 3
Categories: Academic, Laboratory, Projects
```

### 8. ece_syllabus
```sql
Columns: id, subject_name, semester, course_code, url, created_at, updated_at
Sample Records: 4
Semesters: 1-4
```

### 9. ece_scholarships_toppers
```sql
Columns: id, name, category, cgpa, achievements, year, created_at, updated_at
Sample Records: 3
Categories: Topper, Scholar
```

### 10. ece_physical_facilities
```sql
Columns: id, facility_name, description, capacity, equipment, created_at, updated_at
Sample Records: 4
```

### 11. ece_nonteaching_faculty
```sql
Columns: id, name, designation, qualification, experience, created_at, updated_at
Sample Records: 4
```

## Sample Data Included
The SQL script includes realistic sample data for all 11 tables to test the functionality:
- 3 Newsletters
- 6 Extracurricular Activities
- 3 Faculty Innovations
- 3 Clubs
- 5 Placements (companies)
- 3 MOUs
- 3 Handbooks
- 4 Syllabus entries
- 3 Scholarship/Topper records
- 4 Physical Facilities
- 4 Non-Teaching Faculty

## After Execution

### Frontend Testing
1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh ECE department page: `/pages/departments/ECE`
3. Verify all sections display without JSON errors:
   - ✅ Newsletters
   - ✅ Faculty Achievements
   - ✅ Placements
   - ✅ Clubs
   - ✅ Faculty Innovations
   - ✅ Extracurricular Activities
   - ✅ Handbooks
   - ✅ Syllabus
   - ✅ Scholarships & Toppers
   - ✅ Physical Facilities
   - ✅ Non-Teaching Faculty

### Console Check
- No JSON parsing errors
- All API calls should return 200 status
- Data should display properly on page

## Troubleshooting

### Issue: Permission Denied
**Solution**: Grant table creation privileges:
```sql
GRANT CREATE, ALTER, SELECT, INSERT, UPDATE, DELETE ON svec_cms.* TO 'cmsuser'@'62.72.31.209';
FLUSH PRIVILEGES;
```

### Issue: Table Already Exists
**Solution**: The SQL uses `IF NOT EXISTS`, so running it again is safe. Or manually drop and recreate:
```sql
DROP TABLE IF EXISTS ece_newsletters;
DROP TABLE IF EXISTS ece_extracurricularactivities;
-- ... etc
```

### Issue: Still Seeing JSON Error
**Solution**:
1. Verify all 11 tables exist: `SHOW TABLES LIKE 'ece_%';`
2. Hard refresh browser: Ctrl+Shift+R
3. Check browser console for specific table name in error
4. Verify API endpoint URL matches table name

### Issue: Some Tables Missing
**Solution**:
1. Check which tables exist: `SHOW TABLES LIKE 'ece_%';`
2. Manually create missing ones from the SQL file
3. Or delete all and run complete schema again

## File References
- **Schema File**: `ECE_ALL_TABLES_SCHEMA.sql`
- **Frontend Page**: `src/pages/departments/ECE.tsx`
- **API Files**: `src/pages/api/ece/*.ts`

## Database Credentials
- **Host**: 62.72.31.209
- **Database**: svec_cms
- **Username**: cmsuser
- **Password**: V@savi@2001

## Next Steps
1. Execute the SQL schema immediately
2. Refresh ECE department page
3. Verify no JSON errors appear
4. Check all sections display with sample data
5. Update sample data with real information as needed

---
**Created**: 2026-01-12
**Status**: Ready for Immediate Execution
**Complexity**: Low - Simple schema creation with sample data
**Estimated Time**: 2-5 minutes
