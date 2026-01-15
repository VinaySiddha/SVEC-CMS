# ECE Faculty Achievements - 'type' Field Not Null Error Fix

## Problem
```
code: 'ER_NO_DEFAULT_FOR_FIELD',
errno: 1364,
sql: 'INSERT INTO ece_faculty_achievements (title) VALUES (?)',
sqlState: 'HY000',
sqlMessage: "Field 'type' doesn't have a default value"
```

The `type` field in the `ece_faculty_achievements` table is defined as `NOT NULL` without a default value. When trying to insert a record with only the `title` field, the database rejects the INSERT because `type` is required.

## Root Cause
The table schema definition doesn't provide a default value for the `type` field:
```sql
CREATE TABLE `ece_faculty_achievements` (
  `id` int NOT NULL,
  `type` varchar(50) NOT NULL,  -- ❌ No default value
  `year` varchar(32) DEFAULT NULL,
  `title` varchar(512) NOT NULL,
  `url` varchar(512) DEFAULT NULL,
  `details` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
)
```

## Solutions Applied

### 1. Database Schema Fix
A migration SQL script has been created: `fix-ece-faculty-achievements-type-field.sql`

**What it does:**
- Adds a default value of `'general'` to the `type` field
- Ensures the `id` field has AUTO_INCREMENT enabled

**Run the migration:**
```bash
mysql -h 62.72.31.209 -u cmsuser -p'V@savi@2001' svec_cms < fix-ece-faculty-achievements-type-field.sql
```

### 2. Code-Level Fix
Updated the POST API at `src/app/api/admin/departments/[dept]/[module]/route.ts`

**Added logic:**
- When a record is being inserted into any `*_faculty_achievements` table and the `type` field is not provided, it automatically sets `type` to `'general'`
- This ensures the INSERT statement always has a valid value for the `type` field

**Code change location:**
Lines 762-766 in `src/app/api/admin/departments/[dept]/[module]/route.ts`

```typescript
// Auto-populate 'type' field if missing and the table has a 'type' column
if (!mappedBody.type && tableName.includes('_faculty_achievements')) {
  // For faculty achievements tables, default type to 'general' or 'publication'
  mappedBody.type = 'general';
  console.log(`[POST] Auto-added type field: ${mappedBody.type}`);
}
```

## Testing

### Before Fix
```javascript
// This would fail with ER_NO_DEFAULT_FOR_FIELD error
POST /api/admin/departments/ece/faculty-achievements
{
  "title": "Research Paper on AI"
  // No 'type' field
}
```

### After Fix
```javascript
// This now works
POST /api/admin/departments/ece/faculty-achievements
{
  "title": "Research Paper on AI"
  // 'type' is auto-populated as 'general'
}
```

## Changes Made

| File | Change Type | Details |
|------|------------|---------|
| `fix-ece-faculty-achievements-type-field.sql` | Created | Database migration to add default value |
| `src/app/api/admin/departments/[dept]/[module]/route.ts` | Updated | Added auto-population logic for `type` field |

## Related Tables
This fix pattern can be applied to other department faculty achievements tables:
- `cai_faculty_achievements`
- `cse_faculty_achievements`
- `civil_faculty_achievements`
- `cst_faculty_achievements`
- `mech_faculty_achievements`
- `aiml_faculty_achievements`
- `bsh_faculty_achievements`
- `ect_faculty_achievements`
- `ds_faculty_achievements`

## Verification
After applying the fix:
1. Run the SQL migration script
2. Test the API endpoint with only `title` field
3. Verify the record is created with `type = 'general'`

```sql
SELECT id, type, title FROM ece_faculty_achievements ORDER BY id DESC LIMIT 5;
```
