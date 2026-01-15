# CST Dashboard Automatic PDF Management System - Complete Implementation

## Overview
Implemented comprehensive automatic PDF management system for CST Dashboard with support for automatic deletion on record delete and automatic override on record edit/update. Maximum file size is now 5MB across all modules.

## Affected Modules
The following **22 CST modules** now have automatic file management enabled:

### Included Modules (22):
1. bos-members
2. department-library
3. department-overview
4. eresources
5. extra-curricular
6. faculty-achievements
7. faculty-development
8. hackathons
9. handbooks
10. industry-programs
11. merit-scholarships
12. mous
13. newsletters
14. physical-facilities
15. placements
16. sahaya-events
17. scud-activities
18. student-achievements
19. syllabus
20. training-activities

### Excluded Modules (2):
- **faculty** - Uses custom file handling logic
- **bos-minutes** - Uses custom file handling logic

## Features Implemented

### 1. **Automatic PDF Deletion on Record Delete**
**Trigger:** When user deletes a record via DELETE endpoint

**Behavior:**
- Record is immediately deleted from database (fast operation)
- Response is sent to user immediately
- Files associated with the record are deleted asynchronously in the background
- Uses `setImmediate()` for non-blocking file cleanup

**Files Deleted:**
- Automatically detects any file URL fields (e.g., `file_url`, `document_url`, `pdf_url`, `report_url`, etc.)
- Extracts file paths from URLs
- Deletes corresponding files from `/public/uploads/cst/[module]/` directory

**Implementation Location:**
- `src/app/api/admin/departments/cst/[module]/route.ts` - DELETE handler (line 315-348)

**Example:**
```
User deletes BOS Members record with profile_document_url="/uploads/cst/bos-members/member.pdf"
↓
Record deleted from database (immediate)
↓
Response: "Record deleted successfully" (immediate)
↓
Background: /public/uploads/cst/bos-members/member.pdf is deleted asynchronously
```

### 2. **Automatic PDF Override on Record Update**
**Trigger:** When user updates a record with changed file URLs via PUT endpoint

**Behavior:**
- Compares old and new file URLs
- If a file URL field has changed, the old file is deleted
- New file is written during upload process
- Works seamlessly with file replacement upload endpoint

**Implementation Location:**
- `src/app/api/admin/departments/cst/[module]/upload/route.ts` - File replacement handling (line 119-130)
- `src/app/api/admin/departments/cst/[module]/route.ts` - PUT handler (line 268-278)

**Example:**
```
User edits BOS Members record and replaces member.pdf with new_member.pdf
↓
PUT receives: old_file_url="/uploads/cst/bos-members/member.pdf", new_file_url="/uploads/cst/bos-members/new_member.pdf"
↓
deleteReplacedFiles() detects the change
↓
Old file deleted: /public/uploads/cst/bos-members/member.pdf
↓
Database updated with new file URL
```

### 3. **Maximum File Size: 5MB**
**Updated Endpoints:**
- Generic CST upload: `src/app/api/admin/departments/cst/[module]/upload/route.ts`
- BOS Minutes upload: `src/app/api/admin/departments/cst/bos-minutes/upload/route.ts`

**Error Message Format:**
```
"File size exceeds 5MB limit. Current size: 2.35MB"
```

**File Size Validation:**
- 1MB = 1,048,576 bytes
- 5MB = 5,242,880 bytes
- User-friendly error messages showing actual file size

## Technical Implementation Details

### File Detection Logic
The system automatically detects file URL fields by checking if field names contain:
- `file_url`
- `document_url`
- `pdf_url`
- `image_url`
- `attachment_url`
- `report_url`
- `certificate_url`
- `photo_url`
- `upload_url`
- `link_url`

**Implementation:** `src/utils/file-management.ts` - `isFileUrlField()` function

### File Path Extraction
Converts URL paths to filesystem paths:
```
Input:  /uploads/cst/bos-members/member.pdf
Output: C:\Users\AtriDatta\svec-cms-new\public\uploads\cst\bos-members\member.pdf
```

**Implementation:** `src/utils/file-management.ts` - `extractFilePathFromUrl()` function

### Asynchronous File Cleanup
Uses `setImmediate()` for non-blocking operations:
```typescript
setImmediate(async () => {
  // File cleanup happens in background
  // User gets response immediately
  // Doesn't block database operations
});
```

**Benefit:** User doesn't wait for file cleanup - improves perceived performance

### Module Exclusion List
Hardcoded exclusion list prevents double-deletion attempts:
```typescript
const excludeFromAutoDelete = ['faculty', 'non-teaching-faculty', 'technical-faculty', 'bos-minutes'];
```

- Faculty modules have custom file handling in separate upload endpoints
- BOS Minutes has dedicated upload endpoint with its own file management

## Database Operations Flow

### Create Record (POST)
```
1. Receive JSON with form data and file URLs
2. Convert ISO dates to MySQL format
3. Insert into database
4. Return created record
5. No file deletion needed (new record)
```

### Update Record (PUT)
```
1. Receive JSON with updated data and file URLs
2. Convert ISO dates to MySQL format
3. Check if module is in exclusion list
4. If not excluded: deleteReplacedFiles(oldRecord, newRecord)
   - Compares file URL fields
   - Deletes old files that have changed
5. Update database record
6. Return updated record
```

### Delete Record (DELETE)
```
1. Fetch record from database
2. Delete record from database (immediate)
3. Return success to user (immediate)
4. If not in exclusion list: setImmediate(() => deleteRecordFiles(record))
   - Asynchronously scans all fields for file URLs
   - Extracts file paths
   - Deletes all files from filesystem
```

## Files Modified

### 1. src/app/api/admin/departments/cst/[module]/upload/route.ts
- Changed: `MAX_FILE_SIZE` from 1MB to 5MB (line 8)
- Updated: File size validation error message (line 82-86)
- Already had: File replacement handling with automatic old file deletion (line 119-130)

### 2. src/app/api/admin/departments/cst/bos-minutes/upload/route.ts
- Changed: `MAX_FILE_SIZE` from 1MB to 5MB (line 7)
- Updated: File size validation error message (line 70-74)

### 3. src/app/api/admin/departments/cst/[module]/route.ts
- Updated: DELETE handler to exclude certain modules (line 315-348)
  - Added `excludeFromAutoDelete` list
  - Added conditional check before `setImmediate()`
  - Added logging for excluded modules

- Updated: PUT handler to exclude certain modules (line 268-278)
  - Added `excludeFromAutoDelete` list
  - Added conditional check before `deleteReplacedFiles()`
  - Added logging for excluded modules

## Logging and Debugging

### Debug Logs Included
All operations generate detailed console logs for troubleshooting:

**Date Conversion:**
```
[convertISODateToMySQLFormat] Converted meeting_date: "2025-11-14T18:30:00.000Z" -> "2025-11-14"
```

**File Detection:**
```
[deleteRecordFiles] Checking field: file_url, isFileUrlField: true, value: /uploads/cst/bos-members/member.pdf
[deleteRecordFiles] Found file to delete: C:\...\public\uploads\cst\bos-members\member.pdf
```

**Deletion Operations:**
```
[CST DELETE] Deleting record from cst_bos_members with ID: 5
[CST DELETE] Record data: {id: 5, file_url: "/uploads/cst/bos-members/member.pdf", ...}
[CST DELETE] Starting async file cleanup for bos-members record ID: 5
🗑️ Successfully cleaned up files for CST bos-members record ID: 5
✅ Deleted file: C:\...\public\uploads\cst\bos-members\member.pdf
```

**Replacement Operations:**
```
[CST PUT] Skipping automatic file cleanup for excluded module: faculty
🔄 Successfully cleaned up replaced files for CST bos-members record ID: 3
🔄 Deleted old file during replacement: /uploads/cst/bos-members/old_member.pdf
```

## Testing Checklist

- [ ] **Create Record**: Navigate to CST module, create new record with PDF, verify file uploads
- [ ] **Edit Record**: Edit existing record, replace PDF, verify old PDF deleted and new PDF saved
- [ ] **Delete Record**: Delete record with PDF, verify record deleted AND PDF file deleted from `/public/uploads/cst/[module]/`
- [ ] **File Size Validation**: Try uploading file > 5MB, verify error message
- [ ] **Check Logs**: Monitor console for debug messages during all operations
- [ ] **Faculty Module**: Verify faculty records don't trigger automatic deletion (custom handler)
- [ ] **BOS Minutes**: Verify BOS minutes records don't trigger automatic deletion (custom handler)

## Performance Considerations

1. **Immediate Response**: User sees success message immediately
2. **Async File Cleanup**: File deletion happens in background using `setImmediate()`
3. **No Database Blocking**: File operations don't block subsequent database queries
4. **Error Resilience**: File deletion failure doesn't prevent record deletion
5. **Scalability**: Works efficiently even with multiple file URLs per record

## Future Enhancements

1. Add configurable file size limits per module
2. Implement file recovery/archive system for deleted files
3. Add file access statistics and usage tracking
4. Support for image compression before storage
5. Implement cleanup job for orphaned files (files with no database references)
6. Add webhook notifications for file operations

## Support

### Common Issues and Solutions

**Issue**: "File size exceeds 5MB limit"
- **Solution**: Compress your PDF/document before uploading

**Issue**: Record deleted but PDF still exists
- **Solution**: Check console logs for errors, verify file path format in database

**Issue**: Old file not deleted when updating
- **Solution**: Verify the file_url field changed; if URL is identical, no deletion occurs (by design)

**Issue**: Faculty records showing automatic deletion logs
- **Solution**: Normal behavior - faculty is in exclusion list and skips automatic cleanup

---

**Implementation Date:** November 15, 2025
**Status:** ✅ Complete and ready for testing
**Coverage:** 22 of 24 CST modules (excluded: faculty, bos-minutes)
