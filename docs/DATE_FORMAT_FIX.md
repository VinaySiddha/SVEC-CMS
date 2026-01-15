# Date Format Fix for CST API - ISO 8601 to MySQL Format Conversion

## Problem
When creating or updating CST records with date fields, the API was receiving ISO 8601 formatted dates (e.g., `2025-11-14T18:30:00.000Z`) and attempting to insert them directly into MySQL DATE columns, resulting in error:
```
Incorrect date value: '2025-11-14T18:30:00.000Z' for column 'meeting_date' at row 1
```

## Solution
Implemented automatic ISO 8601 to MySQL date format conversion in the CST API routes.

### Changes Made

#### 1. **src/utils/file-management.ts**
Added `convertISODateToMySQLFormat()` function that:
- Detects date fields by name patterns (contains: `date`, `time`, `_at`, `created`, `updated`, `start`, `end`, `meeting`, `event`)
- Converts ISO 8601 format strings to MySQL DATE format (`YYYY-MM-DD`)
- Preserves time information for `_time` suffixed fields in `YYYY-MM-DD HH:MM:SS` format
- Includes comprehensive logging for debugging

```typescript
export function convertISODateToMySQLFormat(record: Record<string, any>): Record<string, any> {
  // ... implementation details
  // Example: '2025-11-14T18:30:00.000Z' -> '2025-11-14'
}
```

#### 2. **src/app/api/admin/departments/cst/[module]/route.ts**
Updated both POST and PUT endpoints to use the conversion function:

**POST (line ~189)**
```typescript
// Convert ISO dates to MySQL format
body = convertISODateToMySQLFormat(body);
```

**PUT (line ~267)**
```typescript
// Convert ISO dates to MySQL format
body = convertISODateToMySQLFormat(body);
```

Also imported the new function:
```typescript
import { deleteRecordFiles, deleteReplacedFiles, isFileUrlField, convertISODateToMySQLFormat } from '@/utils/file-management';
```

## Impact

### Supported Date Formats
The solution automatically converts ISO 8601 dates to MySQL format for fields containing:
- `date` (meeting_date, start_date, event_date, etc.)
- `time` (created_time, meeting_time, etc.)
- `_at` (created_at, updated_at, etc.)
- `created` (created_at, created_on, etc.)
- `updated` (updated_at, updated_on, etc.)
- `start` (start_date, start_time, etc.)
- `end` (end_date, end_time, etc.)
- `meeting` (meeting_date, meeting_time, etc.)
- `event` (event_date, event_time, etc.)

### Affected Endpoints
All CST module CRUD operations now properly handle date conversions:
- **POST** `/api/admin/departments/cst/[module]` - Create new records
- **PUT** `/api/admin/departments/cst/[module]?id=[id]` - Update existing records

### Test Results
✅ Function tested with sample data:
```
Input:  { meeting_date: '2025-11-14T18:30:00.000Z', created_at: '2025-11-14T18:30:00.000Z' }
Output: { meeting_date: '2025-11-14', created_at: '2025-11-14' }
```

## How It Works

1. When a POST or PUT request is received at `/api/admin/departments/cst/[module]`
2. The request body is parsed as JSON
3. Before building the SQL query, `convertISODateToMySQLFormat()` is called
4. The function iterates through all fields in the record
5. If a field name contains date-related keywords and the value is an ISO 8601 string:
   - The ISO string is parsed and converted to MySQL DATE format
   - Debug log shows the conversion (e.g., `[convertISODateToMySQLFormat] Converted meeting_date: "2025-11-14T18:30:00.000Z" -> "2025-11-14"`)
6. The converted data is then used in the INSERT/UPDATE query
7. MySQL happily accepts the properly formatted date

## Benefits
- ✅ Eliminates "Incorrect date value" errors from the frontend
- ✅ Works transparently - no changes needed in frontend date picker components
- ✅ Handles various date field naming conventions automatically
- ✅ Includes detailed logging for troubleshooting
- ✅ Works for all 24 CST modules through the generic API
- ✅ Supports both date-only and datetime formats

## Testing Instructions
1. Navigate to CST Dashboard
2. Go to any CST module (e.g., Board of Studies → Board of Studies Meeting Minutes)
3. Create or edit a record with a date field
4. Select a date from the date picker (will be in ISO 8601 format)
5. Submit the form - should now work without "Incorrect date value" error
6. Check console logs for: `[convertISODateToMySQLFormat] Converted ...`

## Future Enhancements
- Could add custom date format mapping if specific tables need special handling
- Could support time-only fields separately
- Could add timezone conversion if needed for different departments
