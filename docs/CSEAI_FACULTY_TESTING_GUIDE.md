# Testing Guide: CSEAI Department Teaching Faculty Display

## Issue Resolution Summary
✅ **Fixed**: Teaching faculty data not showing in CSEAI department view

## Root Cause
The API query was selecting the wrong column name (`profileUrl` instead of `profile_url`), and wasn't filtering for active records.

## What Was Changed
**File**: `src/pages/api/cai-faculty.ts` (line 15)

**Before**:
```typescript
SELECT id, name, qualification, designation, profileUrl FROM cai_faculty ORDER BY id ASC
```

**After**:
```typescript
SELECT id, name, qualification, designation, COALESCE(profileUrl, profile_url) AS profileUrl FROM cai_faculty WHERE status = 'active' ORDER BY id ASC
```

## How to Test

### Step 1: Clear Cache
- Open browser DevTools (F12)
- Go to Application > Local Storage
- Find entry with key: `cms_cseai_data`
- Delete it (this ensures fresh data fetch)

### Step 2: Navigate to CSEAI Department
1. Go to your application URL
2. Navigate to `/departments/CSEAI` or click CSEAI department link
3. The page should load completely

### Step 3: Verify Faculty Display
1. Click on **"Faculty Profiles"** section in the sidebar or navigation
2. Look for the **"Teaching Faculty"** dropdown/section
3. Expand it (it should open by default with `open` attribute)

### Step 4: Verify Data Display
You should see a table with these columns:
- S.No. (1, 2, 3, ...)
- Name (Faculty names)
- Qualification (Ph.D, M.Tech, etc.)
- Designation (Professor, Associate Professor, Assistant Professor, etc.)
- Profile (View Profile button)

Expected Faculty Members (from seed data):
1. Dr. D Jaya Kumari - Ph.D - Professor & HOD
2. Dr. A Krishna Mohan - Ph.D - Professor
3. Dr. R.B.V Subramaanyam - Ph.D - Associate Professor
4. Dr. S Pallam Setty - Ph.D - Associate Professor
5. Prof. B Vishnuvardhan - M.Tech - Associate Professor
6. Prof. M Srinivas - M.Tech - Assistant Professor
7. Dr. P Srinivasa Rao - Ph.D - Associate Professor
8. Prof. M Sowjanya - M.Tech - Assistant Professor
9. Prof. K Rajesh - M.Tech - Assistant Professor
10. Prof. G Praveen Kumar - M.Tech - Assistant Professor

### Step 5: Verify Profile Links
- Click on any **"View Profile"** button
- It should navigate to the profile URL (might be '#' for placeholder data)

## Expected Results

### ✅ Success Conditions:
- [ ] Teaching Faculty dropdown opens and shows data
- [ ] All 10 faculty members are displayed in the table
- [ ] All columns (S.No., Name, Qualification, Designation, Profile) are populated
- [ ] No "No teaching faculty data available" message appears
- [ ] Data loads within 2-3 seconds
- [ ] View Profile buttons are clickable

### ❌ Failure Indicators:
- Still showing "No teaching faculty data available"
- Empty table
- Missing column data
- Network errors in browser console

## Verification Using Browser Console

### Check API Response:
```javascript
// In browser console:
fetch('/api/cai-faculty')
  .then(res => res.json())
  .then(data => console.log('Faculty data:', data))
```

Expected output: Array of 10 faculty objects with `id`, `name`, `qualification`, `designation`, `profileUrl`

### Check Network Tab:
1. Open DevTools > Network tab
2. Reload page
3. Filter by XHR requests
4. Look for request to `/api/cai-faculty`
5. Response status should be **200**
6. Response should contain faculty array with 10+ elements

## Database Verification (Optional)

### SQL Query to verify data exists:
```sql
SELECT COUNT(*) as total_active_faculty FROM cai_faculty WHERE status = 'active';
-- Should return 10

SELECT id, name, designation, qualification, status FROM cai_faculty WHERE status = 'active' ORDER BY id;
-- Should show all 10 faculty members
```

## Related Components

### Frontend (What you see):
- Component: `src/pages/departments/CSEAI.tsx`
- Section: "Faculty Profiles" > "Teaching Faculty" dropdown
- Table displays all active faculty members

### Backend (What provides data):
- API Endpoint: `/api/cai-faculty` (GET method)
- Database: `cai_faculty` table
- Status filter: Only returns records with `status = 'active'`

### Data Flow:
```
User Opens CSEAI Page
    ↓
useEffect hook runs
    ↓
Fetch /api/cai-faculty
    ↓
API queries: SELECT ... FROM cai_faculty WHERE status = 'active'
    ↓
Returns array of faculty objects
    ↓
setFaculty() updates React state
    ↓
Component re-renders with faculty data
    ↓
Teaching Faculty table displays data
```

## Troubleshooting

### Issue: Still No Data?
1. **Check Database**: Verify cai_faculty table has data with `status = 'active'`
2. **Clear All Caches**: 
   - Browser cache (Ctrl+Shift+Delete)
   - LocalStorage: DevTools > Application > Local Storage > Clear All
   - Browser history
3. **Hard Reload**: Ctrl+F5 or Cmd+Shift+R
4. **Check Browser Console**: Look for errors (F12 > Console tab)
5. **Check Network Errors**: F12 > Network > Look for failed requests

### Issue: API Returns Empty Array?
1. Run SQL query to verify data exists in database
2. Check if `status` field is set to 'active' for faculty records
3. Verify MySQL connection is working

### Issue: Partial Data Display?
- Check if `profileUrl` column is populated
- Some faculty might have NULL profileUrl (that's OK - shows as '#')

## Performance Notes
- Data is cached for 24 hours in localStorage
- First load may take 2-3 seconds
- Subsequent loads use cached data (instant)
- To refresh: Clear localStorage entry or wait 24 hours

## Success Confirmation
After applying this fix and following the testing steps:
✅ You should see 10 teaching faculty members displayed in the CSEAI department Teaching Faculty section.
