# Teaching Faculty Setup Guide for CSE-AI Department

## Issue Resolution: "No teaching faculty data available" Message

The teaching faculty section displays this message when the `cai_faculty` table is empty or has no active records. Follow these steps to populate the table:

## Solution Steps

### Step 1: Create the `cai_faculty` Table
If the table hasn't been created yet, run the schema migration. The table structure is already defined in:
- `schemas/svec_cms (1).sql` (contains the full table definition)

### Step 2: Insert Sample Data
You have two options:

#### Option A: Insert Sample Data (Quick Start)
Run the seeding script to insert 10 sample CSE-AI faculty members:
```bash
# Using MySQL CLI
mysql -h 62.72.31.209 -u cmsuser -p"V@savi@2001" svec_cms < schemas/seed_cai_faculty.sql
```

This will insert the following faculty members:
- Dr. D Jaya Kumari (Professor & HOD)
- Dr. A Krishna Mohan (Professor)
- Dr. R.B.V Subramaanyam (Associate Professor)
- Dr. S Pallam Setty (Associate Professor)
- Prof. B Vishnuvardhan (Associate Professor)
- Prof. M Srinivas (Assistant Professor)
- Dr. P Srinivasa Rao (Associate Professor)
- Prof. M Sowjanya (Assistant Professor)
- Prof. K Rajesh (Assistant Professor)
- Prof. G Praveen Kumar (Assistant Professor)

#### Option B: Manual Insert via Admin Panel
Once the admin interface is ready, you can add faculty through the CSE-AI department dashboard.

### Step 3: Verify Data
```sql
-- Check total records
SELECT COUNT(*) as total FROM cai_faculty;

-- View all active faculty
SELECT id, name, designation, qualification, status FROM cai_faculty WHERE status = 'active' ORDER BY id;
```

## Data Structure

The `cai_faculty` table has the following columns:
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY) - Faculty record ID
- `name` (VARCHAR 255) - Faculty member name
- `qualification` (VARCHAR 100) - Educational qualification (Ph.D, M.Tech, etc.)
- `designation` (VARCHAR 100) - Job title/position
- `profileUrl` (VARCHAR 255) - Link to faculty profile
- `profile_url` (VARCHAR 255) - Alternative profile URL field
- `status` (VARCHAR 20, DEFAULT 'active') - Status (active/inactive)
- `created_at` (TIMESTAMP) - Record creation timestamp
- `updated_at` (TIMESTAMP) - Record update timestamp

## Frontend Implementation

The CSEAI component has been updated to:
1. ✅ Fetch faculty data from `/api/cai-faculty` endpoint
2. ✅ Display faculty in a table with columns: S.No, Name, Qualification, Designation, Profile Link
3. ✅ Show "No teaching faculty data available" message if table is empty
4. ✅ Include error handling and debugging logs

## Debugging

If faculty data is still not displaying after adding records:

1. **Check Server Logs** - The API includes console logs:
   ```
   Total records in cai_faculty: [number]
   Fetched active faculty records: [number]
   Final transformed data count: [number]
   ```

2. **Verify Database Connection** - Test with:
   ```sql
   SELECT COUNT(*) FROM cai_faculty;
   ```

3. **Check Status Field** - Ensure records have `status = 'active'` or `status IS NULL`

## Files Modified

- `src/pages/departments/CSEAI.tsx` - Added faculty fetching and display logic
- `src/pages/api/cai-faculty.ts` - API endpoint to fetch faculty data
- `schemas/svec_cms (1).sql` - Added `cai_faculty` table definition
- `schemas/seed_cai_faculty.sql` - Sample data for seeding

## Next Steps

1. Run the seeding script to add initial faculty data
2. Verify the teaching faculty section displays data correctly
3. Consider adding profile pictures/URLs to faculty records if needed
4. Test the admin panel functionality for adding/editing faculty
