# MOUs Data Setup Guide

## Problem
The MOUs (Memorandums of Understanding) section in the CSEAI department page shows "No MOUs available" even though the API and database structure are correctly set up.

## Root Cause
The `cai_mous` table exists but is **empty** - no MOU records have been inserted into it yet.

## Database Structure
**Table**: `cai_mous`
**Location**: `sql/create_cai_mous_table.sql`

**Columns**:
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `dept` (VARCHAR, DEFAULT='cse-ai')
- `s_no` (INT)
- `organization_name` (VARCHAR)
- `from_date` (VARCHAR)
- `to_date` (VARCHAR)
- `status` (VARCHAR, DEFAULT='Active')
- `document_url` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Solution

### Step 1: Create the Table (if not exists)
```sql
-- Create cai_mous table for CSE-AI Department MOUs
CREATE TABLE IF NOT EXISTS cai_mous (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept VARCHAR(50) NOT NULL DEFAULT 'cse-ai',
  s_no INT NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  from_date VARCHAR(50) NOT NULL,
  to_date VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Active',
  document_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dept (dept),
  UNIQUE KEY unique_mou (dept, organization_name)
);
```

### Step 2: Insert Sample MOUs Data
Run the SQL file: `sql/insert_cai_mous_test_data.sql`

Or execute this SQL directly:
```sql
INSERT INTO cai_mous (dept, s_no, organization_name, from_date, to_date, status, document_url) VALUES
('cse-ai', 1, 'NIT Warangal', '2023-01-01', '2025-12-31', 'Active', '/uploads/mous/nit-warangal.pdf'),
('cse-ai', 2, 'IIIT Hyderabad', '2022-06-01', '2026-06-30', 'Active', '/uploads/mous/iiit-hyd.pdf'),
('cse-ai', 3, 'Tech Mahindra', '2021-09-01', '2024-08-31', 'Inactive', '/uploads/mous/tech-mahindra.pdf'),
('cse-ai', 4, 'Google India', '2023-03-15', '2025-03-14', 'Active', '/uploads/mous/google.pdf'),
('cse-ai', 5, 'Microsoft India', '2022-11-01', '2027-10-31', 'Active', '/uploads/mous/microsoft.pdf'),
('cse-ai', 6, 'Amazon Web Services', '2023-07-01', '2024-06-30', 'Expired', '/uploads/mous/aws.pdf');
```

### Step 3: Verify Data
```sql
SELECT * FROM cai_mous WHERE dept = 'cse-ai';
```

Expected output: 6 rows with MOU data

## API Endpoints

### Fetch MOUs
- **Endpoint**: `/api/public/departments/cse-ai`
- **Method**: GET
- **Response**: Includes `data.mous` array with MOU records

### Direct MOUs Endpoint
- **Endpoint**: `/api/cai/cai-mous`
- **Method**: GET/POST/PUT/DELETE
- **Location**: `src/pages/api/cai/cai-mou.ts`
- **Features**: CRUD operations for MOUs

## Frontend Display
- **Component**: `src/pages/departments/CSEAI.tsx`
- **Section**: "MoUs" menu item
- **Displays**: Table with columns: S.No, Organization Name, From Date, To Date, Action

## Testing
1. Navigate to CSEAI department page
2. Click "MoUs" in the sidebar menu
3. Verify the MOU table displays the data

## Troubleshooting

### "No MOUs available" message
1. Check if `cai_mous` table exists:
   ```sql
   SHOW TABLES LIKE 'cai_mous';
   ```
2. Check if data exists:
   ```sql
   SELECT COUNT(*) FROM cai_mous WHERE dept = 'cse-ai';
   ```
3. Insert test data using Step 2 above

### API returns empty array
1. Check database query logs for errors
2. Verify `dept = 'cse-ai'` parameter is being passed
3. Check console logs for API response

### MOUs don't load after inserting data
1. Clear browser cache
2. Clear localStorage cache key: `cms_cseai_data`
3. Refresh the page

## Files Modified
- ✅ `src/app/api/public/departments/[dept]/route.ts` - Fixed MOU query
- ✅ `src/pages/api/cai/cai-mou.ts` - Fixed table name from `cai_mou` to `cai_mous`
- ✅ `src/pages/departments/CSEAI.tsx` - Fixed API endpoints and removed redundant MOU fetch
- ✅ `sql/insert_cai_mous_test_data.sql` - Created test data insert script

## Next Steps
1. Execute the SQL insert script to populate test data
2. Test the MOUs section in the UI
3. Add more MOUs as needed through the admin panel (if implemented)
