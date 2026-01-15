# CSEAI Faculty Data Display - Troubleshooting

## 🔍 **Issue**
Teaching Faculty and Non-Teaching Staff data are not being displayed in CSEAI department view page.

## ✅ **Fixes Applied**

### 1. Non-Teaching Staff API Response Format
- **File**: `/api/cai/cai-non-teaching-staff.ts`
- **Issue**: Was returning `{ nonTeaching: [...] }` instead of direct array
- **Fix**: Changed to return direct array format matching what CSEAI expects
- **Status**: ✅ FIXED

### 2. Import Paths
- **Files**: All CAI API files in `/api/cai/`
- **Issue**: Import paths were `../../lib/dbPool` (wrong for subdirectory)
- **Fix**: Changed to `../../../lib/dbPool` (correct for subdirectory)
- **Status**: ✅ FIXED

## 🔗 **API Mapping in CSEAI.tsx**

### Current API Fetch Order:
1. `/api/cai/cai-student-achievements` → studentAchievementsDirectData
2. `/api/cai/cai-faculty` → facultyData → **setFaculty()** ✓ Teaching Faculty
3. `/api/cai/cai-technical-faculty` → technicalFacultyData → **setTechnicalFaculty()** ✓ Technical Staff
4. `/api/cai/cai-staff` → staffData → **setNonTeachingFaculty()** ✓ Non-Teaching Staff
5. ... (other APIs)

## 📊 **Expected Database Tables**

The APIs are querying from these tables:
- `cai_faculty` - Teaching Faculty (SELECT id, name, qualification, designation, profile_url)
- `cai_technical_faculty` - Technical Staff (SELECT id, name, designation)
- `cai_staff` - Non-Teaching Staff (SELECT id, name, designation)

## 🔧 **If Data Still Not Showing - Check:**

### Option 1: Verify Table Data Exists
Run these queries in database:
```sql
SELECT COUNT(*) FROM cai_faculty;
SELECT COUNT(*) FROM cai_technical_faculty;
SELECT COUNT(*) FROM cai_staff;
```

### Option 2: Check API Response
Visit these URLs in browser:
- `http://localhost:3000/api/cai/cai-faculty`
- `http://localhost:3000/api/cai/cai-technical-faculty`
- `http://localhost:3000/api/cai/cai-staff`

Should return arrays of objects with id, name, designation, etc.

### Option 3: Enable Console Debugging
Check browser console for:
- API fetch errors
- Response data from APIs
- State updates (setFaculty, setTechnicalFaculty, setNonTeachingFaculty)

## 📝 **Files Modified**
- `/api/cai/cai-non-teaching-staff.ts` - Fixed response format and import paths
- All CAI API files - Fixed import paths from `../../lib/dbPool` to `../../../lib/dbPool`
- `/src/pages/departments/CSEAI.tsx` - Verified data handling logic

## ✨ **Next Steps**
1. Rebuild project: `npm run dev`
2. Navigate to CSEAI department view
3. Click "Faculty Profiles" dropdown
4. Check if data appears in all three sections
5. If still empty, check database tables for actual data
