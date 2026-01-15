# CSEAI Department - Teaching Faculty Data Fix

## Issue
Teaching faculty data was not displaying in the CSEAI department view.

## Root Cause
The API endpoint `/api/cai-faculty.ts` had two issues:

1. **Column Name Mismatch**: The SQL query was selecting `profileUrl` (camelCase) but the database schema has both `profile_url` (snake_case) and `profileUrl` columns. The actual data is stored in `profile_url`.

2. **Missing Status Filter**: The query wasn't filtering for active faculty, which could have returned empty results if inactive records existed.

## Solution Applied

### File Modified: `src/pages/api/cai-faculty.ts`

**Before:**
```sql
SELECT id, name, qualification, designation, profileUrl FROM cai_faculty ORDER BY id ASC
```

**After:**
```sql
SELECT id, name, qualification, designation, COALESCE(profileUrl, profile_url) AS profileUrl FROM cai_faculty WHERE status = 'active' ORDER BY id ASC
```

### Changes Made:
1. Used `COALESCE(profileUrl, profile_url)` to handle both column variants and return whichever has data
2. Added `WHERE status = 'active'` filter to only return active faculty members
3. Renamed the result column to `profileUrl` to match the frontend interface expectations

## Database Schema
The `cai_faculty` table has:
- Primary columns: `id`, `name`, `qualification`, `designation`
- URL columns: `profile_url` (snake_case) and `profileUrl` (camelCase - duplicated)
- Status: `status` (default 'active')

## Seed Data
Sample faculty data is seeded in `schemas/seed_cai_faculty.sql` with 10 teaching faculty members:
- Dr. D Jaya Kumari (Professor & HOD)
- Dr. A Krishna Mohan (Professor)
- Dr. R.B.V Subramaanyam (Associate Professor)
- And 7 more faculty members

## Frontend Integration
The CSEAI component (`src/pages/departments/CSEAI.tsx`) expects:
- Faculty array with shape: `{ id, name, qualification, designation, profileUrl }`
- Display in "Faculty Profiles" > "Teaching Faculty" table section
- Includes "View Profile" button linking to profileUrl

## Testing Recommendation
1. Clear browser cache/localStorage to bypass cached data
2. Visit `/departments/CSEAI` 
3. Navigate to "Faculty Profiles" section
4. Open "Teaching Faculty" dropdown
5. Verify all active faculty members are displayed in the table

## Related Files
- API: `src/pages/api/cai-faculty.ts`
- Component: `src/pages/departments/CSEAI.tsx`
- Database: `schemas/svec_cms (1).sql` (table definition at line 425)
- Seed Data: `schemas/seed_cai_faculty.sql`

## Notes
- Data is cached for 24 hours in localStorage (key: `cms_cseai_data`)
- The fix uses `COALESCE` for backward compatibility with both column names
- Status-based filtering ensures only active faculty are shown
