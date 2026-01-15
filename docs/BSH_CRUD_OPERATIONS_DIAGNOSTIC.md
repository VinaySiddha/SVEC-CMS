# BSH CRUD Operations Diagnostic & Fixes

## Issue Summary
The three new BSH modules (syllabus, photogallery, fdps) are not working properly with CRUD operations.

## Fixes Applied

### 1. ✅ ID Type Conversion Fix (CRITICAL)
**File**: `/src/app/api/admin/departments/[dept]/[module]/route.ts`
**Lines**: 538-548 (DELETE), 435-452 (PUT)

**Problem**: The `id` parameter comes from URL searchParams as a string, but database queries expect an integer.

**Solution**:
```typescript
// Before
const id = searchParams.get('id');

// After (for both DELETE and PUT)
const idParam = searchParams.get('id');
const id = parseInt(idParam, 10);
if (isNaN(id)) {
  return NextResponse.json({ error: 'Invalid record ID format' }, { status: 400 });
}
```

**Impact**: Fixes the "Record not found" 404 errors when trying to DELETE or UPDATE records.

### 2. ✅ File URL Pattern Enhancement (CRITICAL)
**File**: `/src/utils/file-management.ts`
**Lines**: 14-37

**Problem**: File field detection only looked for snake_case patterns (`file_url`, `document_url`), but BSH modules use camelCase (`fileUrl`, `imageUrl`, `url`).

**Solution**: Added camelCase patterns to `FILE_URL_PATTERNS`:
```typescript
const FILE_URL_PATTERNS = [
  // ... existing snake_case patterns ...
  // CamelCase patterns (for BSH modules and modern schemas)
  'fileUrl',
  'documentUrl',
  'pdfUrl',
  'imageUrl',
  'attachmentUrl',
  'reportUrl',
  'certificateUrl',
  'photoUrl',
  'uploadUrl',
  'linkUrl',
  // Generic camelCase
  'url'
];
```

**Impact**: Fixes automatic file deletion when records are deleted, and file replacement when records are updated.

### 3. ✅ API Module Mappings (VERIFIED)
**Files**: 
- `/src/app/api/admin/departments/[dept]/[module]/route.ts` (Lines 135-160)
- `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts` (Lines 145-162)

**Status**: BSH module mappings are correctly defined:
```typescript
'bsh': {
  'fdps': 'bsh_fdps',
  'photogallery': 'bsh_photogallery',
  'syllabus': 'bsh_syllabus',
  // ... other modules ...
}
```

### 4. ✅ Dynamic Field Configuration (VERIFIED)
**File**: `/src/config/module-fields.ts` (Lines 355-530)

**Status**: Field configurations are defined for all three BSH modules:
- **syllabus**: title, type, academic_year, fileUrl
- **photogallery**: title, event_type, date, description, ordering, imageUrl
- **fdps**: title, type, year, date, description, url

### 5. ✅ Dashboard Module Configuration (VERIFIED)
**File**: `/src/app/departments/[dept]/dashboard/page.tsx` (Lines 284-297)

**Status**: All three modules are properly configured in the dashboard with correct icons and descriptions.

## Potential Remaining Issues

### Issue 1: Database Table Schema Mismatch
**Symptoms**: "Record not found" even after ID type conversion, or fields appearing empty in forms.

**Diagnosis**: Check if the database tables (`bsh_syllabus`, `bsh_photogallery`, `bsh_fdps`) have all the columns defined in the field configurations.

**Affected Fields**:
- `bsh_syllabus`: Should have columns: `id`, `title`, `type`, `academic_year`, `fileUrl`, `created_at`, `updated_at`
- `bsh_photogallery`: Should have: `id`, `title`, `event_type`, `date`, `description`, `ordering`, `imageUrl`, `created_at`, `updated_at`
- `bsh_fdps`: Should have: `id`, `title`, `type`, `year`, `date`, `description`, `url`, `created_at`, `updated_at`

**Quick Check Commands**:
```sql
-- Check if tables exist
SHOW TABLES LIKE 'bsh_%';

-- Check column structure
DESC bsh_syllabus;
DESC bsh_photogallery;
DESC bsh_fdps;
```

### Issue 2: File Upload Directory Permissions
**Symptoms**: File uploads fail silently, or files aren't created.

**Diagnosis**: Check if the following directories exist and have write permissions:
```
public/uploads/bsh/
public/uploads/bsh/syllabus/
public/uploads/bsh/photogallery/
public/uploads/bsh/fdps/
```

**Solution**: Create directories with proper permissions:
```bash
mkdir -p public/uploads/bsh/{syllabus,photogallery,fdps}
chmod 755 public/uploads/bsh
```

### Issue 3: Authentication Token Issues
**Symptoms**: "Unauthorized" 401 errors when trying to perform CRUD operations.

**Diagnosis**: Ensure the authToken is being sent correctly in requests.

**Quick Check**:
1. Open browser DevTools → Network tab
2. Look for API requests to `/api/admin/departments/bsh/...`
3. Check the request headers for `Authorization: Bearer <token>`
4. Verify the token is valid (not expired)

### Issue 4: Missing 'dept' Column in Tables (Conditional)
**Symptoms**: Creates fail with column count mismatch errors.

**Diagnosis**: Some tables might not have a 'dept' column but the form is trying to add it.

**Solution**: The dashboard code already handles this:
```typescript
const hasDeptColumn = tableColumns.some(field => field.Field === 'dept');
const saveData = hasDeptColumn 
  ? { ...data, dept: dept }
  : { ...data };
```

## Testing Checklist

After applying the fixes above, test each module with this checklist:

### For Each Module (syllabus, photogallery, fdps):

- [ ] **CREATE**: Add new record
  - [ ] Fill in all required fields
  - [ ] Upload file (if applicable)
  - [ ] Verify record appears in list
  - [ ] Check file was created in `public/uploads/bsh/[module]/`

- [ ] **READ**: Fetch and display records
  - [ ] Initial load shows all records
  - [ ] Pagination works
  - [ ] Search functionality works
  - [ ] File URLs are accessible

- [ ] **UPDATE**: Edit existing record
  - [ ] Edit form loads correctly
  - [ ] Update fields
  - [ ] Upload new file (file replacement should work)
  - [ ] Verify changes are saved
  - [ ] Check old file was deleted, new file created

- [ ] **DELETE**: Remove record
  - [ ] Delete button works
  - [ ] Record disappears from list
  - [ ] Associated files are deleted from `public/uploads/`
  - [ ] No console errors

## Error Codes to Watch For

| Error | Cause | Solution |
|-------|-------|----------|
| 404 Record not found | ID type mismatch or record doesn't exist | Applied ID type conversion fix |
| 401 Unauthorized | Invalid/expired token | Clear localStorage and re-login |
| 400 Invalid department or module | Module key doesn't match API mapping | Check DEPARTMENT_MODULES in route.ts |
| 500 Internal server error | Database table doesn't exist or schema mismatch | Verify table structure matches field config |
| ENOENT when deleting files | File doesn't exist | Check file permissions and path |

## Next Steps

1. **Test CRUD operations** on all three BSH modules
2. **Check browser console** for specific error messages
3. **Monitor server logs** for detailed error information
4. **Verify database tables** exist with correct schema
5. **Check file upload directories** have write permissions
6. **Provide specific error messages** from console if issues persist

## Related Files to Review

- `/src/app/api/admin/departments/[dept]/[module]/route.ts` - Main CRUD endpoints
- `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts` - Field configuration delivery
- `/src/config/module-fields.ts` - Field definitions for all modules
- `/src/utils/file-management.ts` - File upload/deletion logic
- `/src/app/departments/[dept]/dashboard/page.tsx` - Dashboard UI and form handling
- `/src/utils/api-helpers.ts` - Error handling and fetch utilities

