# File Upload Size Update - 5MB Implementation Summary

## Overview
Updated the file upload size limit from **1MB to 5MB** for department admin dashboards across all modules (except gallery uploads which remain 350KB).

## Changes Made

### 1. Main Admin Upload Route
**File:** `src/app/api/admin/departments/[dept]/[module]/upload/route.ts`

**Changes:**
- Line 34: Updated `maxSize` for non-gallery uploads from `1024 * 1024` (1MB) to `5 * 1024 * 1024` (5MB)
- Line 41: Updated error message from `'1MB'` to `'5MB'`
- Updated comment to reflect the new limit

**Code Change:**
```typescript
// Before:
const maxSize = isGalleryUpload ? 350 * 1024 : 1024 * 1024; // 350KB for gallery, 1MB for others
const maxSizeDisplay = isGalleryUpload ? '350KB' : '1MB';

// After:
const maxSize = isGalleryUpload ? 350 * 1024 : 5 * 1024 * 1024; // 350KB for gallery, 5MB for others
const maxSizeDisplay = isGalleryUpload ? '350KB' : '5MB';
```

### 2. CST Department Upload Routes
**Status:** Already configured with 5MB limits

**Files:**
- `src/app/api/admin/departments/cst/[module]/upload/route.ts` - ✅ 5MB limit
- `src/app/api/admin/departments/cst/bos-minutes/upload/route.ts` - ✅ 5MB limit

## Impact

### Affected Departments & Modules
- ✅ **CSE-AI**: All modules now support 5MB uploads
- ✅ **MBA**: All modules now support 5MB uploads
- ✅ **AIML**: All modules now support 5MB uploads
- ✅ **CSE-DS**: All modules now support 5MB uploads
- ✅ **CST**: Already had 5MB support
- ✅ **Gallery Uploads**: Still restricted to 350KB (appropriate for image optimization)

### File Size Validation
| Module Type | Max Size | Warning Threshold | Status |
|---|---|---|---|
| Regular Modules (PDF, DOC, DOCX) | 5MB | - | ✅ Updated |
| Gallery Images | 350KB | - | ✅ Maintained |
| CST Uploads | 5MB | - | ✅ Existing |

### User Experience
1. **Upload Acceptance**: Users can now upload files up to 5MB without rejection
2. **Error Messages**: Clear feedback showing "File size exceeds 5MB limit"
3. **File Size Display**: Current file size shown in error messages for transparency

## Validation

### Testing Performed
- TypeScript compilation: ✅ No errors in modified file
- File size validation logic: ✅ Properly enforces 5MB limit
- Error handling: ✅ Correct error messages for oversized files
- Gallery uploads: ✅ Still properly restricted to 350KB

### Related Components
- File validation utility: `src/utils/file-management.ts` (uses configurable limits)
- File upload utilities: `src/utils/file-upload.ts` (supports dynamic limits)
- Admin dashboard: `src/app/departments/[dept]/dashboard/page.tsx` (displays uploaded files)

## Backward Compatibility

### Migration Notes
- **No database changes** required
- **Existing 1MB files** continue to work without modification
- **No frontend breaking changes** - size limit enforced on API layer
- Users can immediately start uploading 1-5MB files

### API Response Format
```json
{
  "success": false,
  "error": "File size exceeds 5MB limit. Current size: 6.25MB"
}
```

## Deployment Checklist

- ✅ Code changes implemented
- ✅ TypeScript compilation verified
- ✅ Error handling tested
- ✅ File size validation confirmed
- ✅ Documentation updated

## Notes

- The 5MB limit applies to all non-gallery uploads (PDFs, DOC, DOCX files in admin modules)
- Gallery uploads remain at 350KB to optimize image storage and loading times
- CST department already had 5MB limits configured
- File size is displayed in both KB and MB formats for user clarity
