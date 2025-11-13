# Photo Upload Feature - Quick Reference

## What Changed

### ✅ Photo URL → Photo File Upload
Changed from text input for "Photo URL" to interactive file upload with preview.

## Files Modified

1. **Frontend Page**
   - File: `src/app/exam-section/controller-of-examinations/page.tsx`
   - Changes: Added file upload input, photo preview, file validation

2. **Upload API** (NEW)
   - File: `src/app/api/exam-section/controller-of-examinations/upload/route.ts`
   - Purpose: Handles photo upload and storage in `public` folder

3. **Directory Created**
   - Path: `public/controller-of-examinations/`
   - Purpose: Stores uploaded controller photos

## Features

✨ **Client-Side:**
- File type filter (images only)
- Size validation (250KB max)
- Real-time error notifications (toast)
- File name display
- Photo preview thumbnail (20x20px)
- Clear UX with labeled field

✨ **Server-Side:**
- Double file validation (type + size)
- Unique filename generation (timestamp + random)
- Auto-create storage directory
- Safe file writing with buffer conversion
- Public URL generation

✨ **User Flow:**
1. User clicks photo input field
2. Selects image from computer
3. File size validated automatically
4. Selected filename appears below input
5. Photo preview shown if exists
6. User fills other form fields
7. Clicks save button
8. Photo uploads first, then profile saves
9. Toast shows success/error

## Size Limits

- **Max File Size:** 250KB
- **Validation Points:** 
  - Client (HTML5 validation)
  - Client (JavaScript check)
  - Server (Node.js check)

## Storage Details

- **Location:** `public/controller-of-examinations/`
- **Naming:** `controller_{timestamp}_{random}.{ext}`
- **Access:** Direct public URL like `/controller-of-examinations/controller_1731206400000_abc123.jpg`

## API Endpoint

```
POST /api/exam-section/controller-of-examinations/upload
Content-Type: multipart/form-data

Response:
{
  "success": true,
  "message": "Photo uploaded successfully",
  "url": "/controller-of-examinations/controller_1731206400000_abc123.jpg"
}
```

## Testing Checklist

- [ ] Select valid image (< 250KB)
- [ ] See file name appear below input
- [ ] See preview thumbnail appear
- [ ] Submit form
- [ ] Verify success toast message
- [ ] Check photo displays in profile display section
- [ ] Test with file > 250KB (should error)
- [ ] Test with non-image file (should error)
- [ ] Edit profile with existing photo
- [ ] Delete profile clears photo state

## Error Messages

- "Photo size must not exceed 250KB" - File too large
- "Only image files are allowed" - Wrong file type
- "Failed to upload photo" - Server error
- "Failed to save profile" - Database error

## Notes for Developers

1. Photos are stored in `public` folder, not database
2. Database stores only the public URL path
3. URLs are always accessible for display
4. Files use unique names to prevent conflicts
5. Older photos are not automatically deleted if replaced
6. Consider cleanup strategy for old images in production

## Deployment Considerations

✅ **Ready:**
- File upload logic
- Directory creation
- Public folder access
- API endpoint

⚠️ **Consider:**
- Backup strategy for uploaded files
- Disk space monitoring
- Cleanup policy for old files
- CDN for image serving (optional)
- S3/Cloud storage (optional, for scaling)
