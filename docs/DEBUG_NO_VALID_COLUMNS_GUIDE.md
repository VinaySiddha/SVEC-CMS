# Quick Debugging Guide: "No valid columns provided" Error

## What This Error Means

The API received a request to save data to a database table, but after processing and mapping the fields, **no valid database columns remained** to save.

## Common Causes (In Order of Likelihood)

### 1. Empty Form Submission ❌ (NOW FIXED)
- **Symptom:** Clicking "Save" button without filling any fields
- **Why:** All field values are empty strings, null, or undefined
- **Fix Applied:** Frontend now filters out empty values AND shows error message

### 2. Field Name Mismatch 🔧
- **Symptom:** Form sends field name that doesn't exist in database
- **Debug:** Check `src/utils/field-mapping.ts` for mappings
- **Example:** Form sends `title` but database has `name`
- **Solution:** Add mapping or fix form field name

### 3. Unknown Column Names 🔍
- **Symptom:** Form sends unexpected field names
- **Debug:** Check API logs for "Dropping unknown column"
- **Solution:** Verify field configuration in `src/config/module-fields.ts`

### 4. All Fields Filtered Out 🚫
- **Symptom:** Valid columns exist but all get filtered
- **Debug:** Check if fields are marked as `displayField` instead of `editableField`
- **Solution:** Add field to `editableFields` array in config

## How to Debug

### Step 1: Check Browser Console
```
API Error (400) while requesting /api/admin/departments/cse-ds/department-overview
{
  "error": "No valid columns provided",
  "details": "The data sent could not be matched to any database columns. Table: ds_department_overview",
  "received": { /* form data sent */ },
  "mapped": [ /* fields after mapping */ ]
}
```

### Step 2: Check Server Logs
Look for these debug messages:
```
[POST] Valid columns for ds_department_overview: ['id', 'hod_name', 'hod_email', ...]
[POST] Data before column validation: { hod_name: "Dr. John Smith" }
[POST] Dropping unknown column 'invalid_field' for table ds_department_overview
```

### Step 3: Verify Configuration
**Check Module Config:**
```bash
# File: src/config/module-fields.ts
# Look for: 'cse-ds' → 'department-overview'
# Verify: editableFields array includes the fields you want to save
'editableFields': ['hod_name', 'hod_email', 'hod_qualification', 'hod_image_url', 'description']
```

### Step 4: Verify Database Table
```sql
-- Check actual table structure
SHOW COLUMNS FROM ds_department_overview;

-- Should return:
-- id, hod_name, hod_email, hod_qualification, hod_image_url, description, created_at, updated_at
```

### Step 5: Verify Field Mapping
**File:** `src/utils/field-mapping.ts`

Check if table needs special mapping:
```typescript
'ds_department_overview': {
  'title': 'name'  // Maps 'title' form field to 'name' database column
}
```

## Prevention Checklist

✅ **Form Level:**
- [ ] Form filters out empty values before submission
- [ ] Form shows error if no fields are filled
- [ ] Form field names match config `editableFields`

✅ **Config Level:**
- [ ] Module defined in `src/config/module-fields.ts`
- [ ] Table name is correct
- [ ] Field names match database columns
- [ ] Fields are in `editableFields` array (not just `fields`)

✅ **Mapping Level:**
- [ ] Check `src/utils/field-mapping.ts` for required translations
- [ ] Add mapping if form field names differ from database columns

✅ **Database Level:**
- [ ] Table exists: `SHOW TABLES LIKE 'ds_department_overview'`
- [ ] Columns exist: `SHOW COLUMNS FROM ds_department_overview`
- [ ] Correct prefix (ds_, cai_, aiml_, etc.)

## Quick Test Steps

### Test 1: Fill and Submit a Form
1. Go to Department Dashboard
2. Select a module (e.g., "Department Overview")
3. Click "Add New Record"
4. Fill in one required field (e.g., "HOD Name")
5. Click "Save"
6. Expected: Record created successfully ✅
7. If error: Check config and field mappings

### Test 2: Try Empty Submission
1. Click "Add New Record"
2. Don't fill any fields
3. Click "Save"
4. Expected: "Please fill in at least one field before saving" ❌

### Test 3: Check API Response Details
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Perform save action
4. Click on API request
5. Look at Response tab
6. Should see detailed error info

## Related Files Quick Reference

| File | Purpose | What to Check |
|------|---------|---------------|
| `src/config/module-fields.ts` | Field configurations | editableFields, tableName, field types |
| `src/utils/field-mapping.ts` | Field name translations | Field name mappings for database |
| `src/app/api/admin/departments/[dept]/[module]/route.ts` | API endpoint | Column validation, field filtering |
| `src/app/departments/[dept]/dashboard/page.tsx` | Form component | Form field definitions, data filtering |

## For Developers

### Adding a New Module Field

1. **Update Config** (`src/config/module-fields.ts`):
   ```typescript
   'new-field': {
     name: 'new_field',
     label: 'New Field Label',
     type: 'text',
     required: true  // or false
   }
   // Add to editableFields!
   editableFields: ['field1', 'field2', 'new_field']
   ```

2. **Add Field Mapping if Needed** (`src/utils/field-mapping.ts`):
   ```typescript
   'table_name': {
     'form_field_name': 'database_column_name'
   }
   ```

3. **Verify Database Column Exists**:
   ```sql
   ALTER TABLE table_name ADD COLUMN new_field VARCHAR(255);
   ```

4. **Test the Form**:
   - Fill in the new field
   - Submit the form
   - Check if data is saved correctly

## Emergency: If Error Persists

1. **Check Browser Console:**
   - Copy the full error response
   - Note the table name
   - Note the received vs mapped fields

2. **Check Server Logs:**
   - Look for SQL errors
   - Look for field filtering messages
   - Verify table name is correct

3. **Database Verification:**
   ```sql
   -- Check table exists
   SELECT * FROM information_schema.TABLES WHERE TABLE_NAME='ds_department_overview';
   
   -- Check columns
   SELECT COLUMN_NAME, COLUMN_TYPE FROM information_schema.COLUMNS 
   WHERE TABLE_NAME='ds_department_overview';
   ```

4. **Configuration Check:**
   - Verify table name in DEPARTMENT_MODULES
   - Verify fields in MODULES_FIELD_CONFIG
   - Verify mappings in field-mapping.ts

5. **Contact Support:**
   - Provide:
     - Error message with table name
     - The "received" and "mapped" data from error
     - Server logs showing what happened
     - Database schema for the table
