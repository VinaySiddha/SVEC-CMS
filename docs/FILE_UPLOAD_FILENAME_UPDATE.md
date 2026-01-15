# File Upload Filename Update - Summary

## 🎯 Change Requested
"In department admin dashboard any file uploaded no need to add the timestamp filename only original filename should be stored"

## ✅ Implementation Complete

### Change Made
Updated the generic department file upload endpoint to store **original filenames only** without timestamps.

### File Modified
- **Location**: `src/app/api/admin/departments/[dept]/[module]/upload/route.ts`
- **Lines**: 62-67

### Before
```typescript
// Generate unique filename
const timestamp = Date.now();
const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
const fileName = `${timestamp}_${originalName}`;
const filePath = join(uploadDir, fileName);
```

### After
```typescript
// Use original filename without timestamps
const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
const filePath = join(uploadDir, fileName);
```

## 📊 Impact

### Filename Storage
| Before | After |
|--------|-------|
| `1732278420123_faculty_profile.pdf` | `faculty_profile.pdf` |
| `1732278420456_document.docx` | `document.docx` |
| `1732278420789_image.jpg` | `image.jpg` |

### Features Preserved
✅ Special character sanitization (replaced with underscores)
✅ File type validation (PDF, JPG, PNG, DOC, DOCX)
✅ File size validation (5MB for regular, 350KB for gallery)
✅ Gallery image resizing (350x240px)
✅ Old file deletion on replacement
✅ All error handling

### Database Storage
Files stored in database will now reference:
- **Original**: `/uploads/cse-ai/faculty/1732278420123_john_doe.pdf`
- **New**: `/uploads/cse-ai/faculty/john_doe.pdf`

## 🔄 Consistency

### Aligned Endpoints
All file upload endpoints now use **original filenames only**:

✅ **Generic Department Upload** (Just Updated)
- Location: `src/app/api/admin/departments/[dept]/[module]/upload/route.ts`
- Uses: Original filename only

✅ **CST Module Upload** (Already Aligned)
- Location: `src/app/api/admin/departments/cst/[module]/upload/route.ts`
- Uses: Original filename only

✅ **CST BOS Minutes Upload** (Already Aligned)
- Location: `src/app/api/admin/departments/cst/bos-minutes/upload/route.ts`
- Uses: Original filename only

## 🧪 Testing

### How to Test
1. Open Admin Dashboard for any department (not CST)
2. Select a module (e.g., Faculty)
3. Upload a file with a simple name (e.g., `john_doe.pdf`)
4. Check the network response → `url` field shows filename
5. Verify: URL should be `/uploads/dept/module/john_doe.pdf` (no timestamp)

### Expected Result
✅ File stored with original name
✅ No timestamp prefix
✅ Special characters replaced with underscores
✅ File accessible at generated URL

## 📁 File Path Example

### Faculty Profile Upload
```
Department: cse-ai
Module: faculty
Original Filename: "John Doe.pdf"

Generated Path: /uploads/cse-ai/faculty/John_Doe.pdf
Database Stores: /uploads/cse-ai/faculty/John_Doe.pdf
```

## ✨ Benefits

✅ **Cleaner Filenames** - More readable and user-friendly
✅ **Easier Management** - Easy to identify files in storage
✅ **Consistent** - All upload endpoints now behave the same
✅ **Simpler URLs** - Clean file paths without timestamps
✅ **Better UX** - Files display with meaningful names

## 🔒 Security Notes

### Character Sanitization Still Applied
```typescript
file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
```

Examples:
- `Faculty Profile (v2).pdf` → `Faculty_Profile__v2_.pdf`
- `John Doe's Resume.docx` → `John_Doe_s_Resume.docx`
- `2025-Report@Final!.xlsx` → `2025-Report_Final_.xlsx`

This prevents:
- Path traversal attacks
- Invalid characters in filenames
- Cross-platform compatibility issues

## 📝 Deployment Notes

### No Database Migration Needed
- ✅ Existing files can remain unchanged
- ✅ Old files with timestamps will still work
- ✅ New uploads use original filenames
- ✅ Can coexist during transition

### Breaking Changes
None - this is backward compatible

### Next Steps
1. Deploy the change
2. Test in staging environment
3. Monitor for any issues
4. Deploy to production when ready

## 🎉 Status
**✅ COMPLETE**

Change has been successfully implemented and is ready for deployment.
