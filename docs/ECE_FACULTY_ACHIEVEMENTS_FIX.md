# ECE Faculty Achievements API - Error Fix

## Problem
Console Error: `SyntaxError: Unexpected token '<', "<!DOCTYPE"... is not valid JSON`

This error occurs when the ECE department page tries to fetch faculty achievements from `/api/ece/faculty-achievements` but the database table doesn't exist.

## Root Cause
The `ece_faculty_achievements` table is missing from the database. When the API tries to query a non-existent table, the database returns an error, and the API handler returns an HTML error page instead of JSON, causing the JSON parsing error on the frontend.

## Solution

### Step 1: Execute the SQL Schema
Run the SQL script `ECE_FACULTY_ACHIEVEMENTS_SCHEMA.sql` on your database:

**Option A: Using MySQL CLI**
```bash
mysql -h 62.72.31.209 -u cmsuser -p'V@savi@2001' svec_cms < ECE_FACULTY_ACHIEVEMENTS_SCHEMA.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your database: `62.72.31.209` (svec_cms)
3. Username: `cmsuser`
4. Password: `V@savi@2001`
5. Copy the SQL from `ECE_FACULTY_ACHIEVEMENTS_SCHEMA.sql`
6. Paste into the query editor and execute

**Option C: Using phpMyAdmin**
1. Login to phpMyAdmin for your hosting
2. Select `svec_cms` database
3. Click "SQL" tab
4. Paste the SQL code
5. Click "Go"

### Step 2: Verify the Table
After running the SQL, verify the table was created:
```sql
DESC ece_faculty_achievements;
SELECT COUNT(*) FROM ece_faculty_achievements;
```

### Step 3: Test the API
Visit in your browser or use curl:
```
GET http://localhost:3000/api/ece/faculty-achievements
```

Expected response (JSON array):
```json
[
  {
    "id": 1,
    "type": "journal_publication",
    "year": "2024",
    "title": "AI-based Signal Processing in Communication Systems",
    "url": "https://doi.org/10.1234/example",
    "details": "Published in IEEE Transactions on Communications"
  },
  ...
]
```

### Step 4: Verify Frontend
1. Refresh the ECE department page: `/pages/departments/ECE.tsx`
2. Scroll to the Faculty Achievements section
3. Verify all achievement types display:
   - Journal Publications
   - Conference Publications
   - Book Publications
   - Certifications
   - Patents
   - Awards
   - Memberships
   - Faculty Outreach
   - Promotions & Incentives
   - Gallery

## API Details
- **Endpoint**: `GET /api/ece/faculty-achievements`
- **File**: `/src/pages/api/ece/faculty-achievements.js`
- **Database Table**: `ece_faculty_achievements`
- **Fields**:
  - `id` (INT, PRIMARY KEY)
  - `type` (VARCHAR) - Achievement type
  - `year` (VARCHAR) - Year of achievement
  - `title` (VARCHAR) - Achievement title
  - `url` (VARCHAR) - Link to achievement/certificate
  - `details` (TEXT) - Additional details
  - `created_at`, `updated_at` (TIMESTAMPS)

## Achievement Types
The API supports filtering by these achievement types:
- `journal_publication` - Journal Publications
- `conference_publication` - Conference Publications
- `book_publication` - Book Publications
- `certification` - Certifications
- `patent` - Patents
- `award` - Awards
- `membership` - Memberships
- `outreach` - Faculty Outreach
- `promotion_incentive` - Promotions & Incentives
- `gallery` - Gallery items

## Sample Data Included
The SQL script includes 23 sample achievement records to test the functionality.

## Troubleshooting

### Issue: Still seeing "Unexpected token '<'" error
**Solution**: 
1. Check if the table exists: `SHOW TABLES LIKE 'ece_faculty%';`
2. Verify database credentials in the API file
3. Check if MySQL connection is working
4. Refresh the browser page with hard refresh (Ctrl+Shift+R)

### Issue: Table exists but showing empty
**Solution**: 
The sample data should be automatically inserted. If not:
1. Run the INSERT statements manually
2. Verify INSERT permissions for the user

### Issue: Permission Denied on table creation
**Solution**: 
1. Ensure the database user `cmsuser` has CREATE TABLE privileges
2. Ask your database administrator to grant privileges:
   ```sql
   GRANT CREATE, ALTER, SELECT, INSERT, UPDATE, DELETE ON svec_cms.* TO 'cmsuser'@'62.72.31.209';
   FLUSH PRIVILEGES;
   ```

## File Locations
- **Schema File**: `ECE_FACULTY_ACHIEVEMENTS_SCHEMA.sql` (project root)
- **API Handler**: `src/pages/api/ece/faculty-achievements.js`
- **Frontend Page**: `src/pages/departments/ECE.tsx` (lines 624-650)
- **Data Interface**: `FacultyAchievement` (lines 118-124 in ECE.tsx)

## Related Files
- AIML Faculty Achievements: `/src/pages/api/aiml/faculty-achievements.ts` (similar structure)
- Database Utils: `src/utils/database-utils.ts`

## Next Steps
1. Execute the SQL schema
2. Refresh the ECE department page
3. Verify all sections display correctly
4. Test with different browser zoom levels and screen sizes
5. Check console for any remaining errors

---
**Created**: 2026-01-12
**Status**: Schema Created - Ready for Database Execution
