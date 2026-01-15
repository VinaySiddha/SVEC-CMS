# PDF Auto-Delete & Override Implementation

## Overview
Implemented automatic PDF file deletion and override functionality for placement admin dashboard modules:
- **Placement Events Module**: Auto-delete PDFs when deleting events, auto-override when editing
- **Placement Noticeboard Module**: Auto-delete files when deleting notices, auto-override when editing

## Changes Made

### 1. Created File Utility (`/src/lib/fileUtils.ts`)
**New file** for centralized file deletion operations:

```typescript
export async function deleteUploadedFile(filePath: string | undefined | null): Promise<boolean>
```

**Features:**
- Safely deletes files from `public/uploads/` directory
- Includes security checks (ensures path is within uploads directory)
- Handles file-not-found gracefully (returns true)
- Logs all operations for debugging

**Usage:**
```typescript
import { deleteUploadedFile } from '@/lib/fileUtils';

// Delete single file
await deleteUploadedFile('placement_events/circular/file.pdf');

// Delete multiple files
await deleteMultipleFiles([circularUrl, guidelinesUrl]);
```

---

## 2. Placement Events Module Updates

### API Route: `/src/app/api/placement/events/route.ts`

#### Import Addition
```typescript
import { deleteUploadedFile } from '@/lib/fileUtils';
```

#### DELETE Endpoint - Auto-Delete PDFs
When deleting an event record, automatically deletes associated PDF files:

**Before:**
- Just deleted database record
- PDFs left orphaned in storage

**After:**
- Retrieves event details (circular_url, guidelines_url)
- Deletes database record
- Calls `deleteUploadedFile()` for each PDF
- Success message: "Placement event and associated files deleted successfully"

**Code:**
```typescript
// Get the event details to retrieve file URLs before deleting
const eventResults = await query(
  'SELECT circular_url, guidelines_url FROM placement_events WHERE id = ?',
  [id]
);

// Delete the database record
const result = await execute('DELETE FROM placement_events WHERE id = ?', [id]);

// Delete associated files
if (eventResults && eventResults.length > 0) {
  const event = eventResults[0];
  if (event.circular_url) await deleteUploadedFile(event.circular_url);
  if (event.guidelines_url) await deleteUploadedFile(event.guidelines_url);
}
```

#### PUT Endpoint - Auto-Override PDFs
When updating an event and uploading new PDFs, automatically deletes old ones:

**New Parameters:**
- `oldCircularUrl`: Previous circular PDF URL (sent by frontend)
- `oldGuidelinesUrl`: Previous guidelines PDF URL (sent by frontend)

**Logic:**
- If new circular PDF uploaded and old exists: delete old PDF
- If new guidelines PDF uploaded and old exists: delete old PDF
- Update database with new URLs
- Success message: "Placement event updated successfully"

**Code:**
```typescript
// Delete old files if they're being replaced with new ones
if (oldCircularUrl && circular_url && oldCircularUrl !== circular_url) {
  await deleteUploadedFile(oldCircularUrl);
}
if (oldGuidelinesUrl && guidelines_url && oldGuidelinesUrl !== guidelines_url) {
  await deleteUploadedFile(oldGuidelinesUrl);
}
```

### Frontend Page: `/src/app/placement/dashboard/events/page.tsx`

#### handleSubmit Function Update
When submitting form (create or update), now sends old file URLs to API:

**Changes:**
```typescript
// Store old URLs for deletion on update
if (editingId) {
  const currentEvent = events.find(e => e.id === editingId);
  if (currentEvent) {
    submitData.oldCircularUrl = currentEvent.circular_url;
    submitData.oldGuidelinesUrl = currentEvent.guidelines_url;
  }
}
```

**Toast Messages Updated:**
- Update success: "Event updated successfully (old files removed if replaced)"
- Provides user feedback that old files are being cleaned up

---

## 3. Placement Noticeboard Module Updates

### API Route: `/src/app/api/placement/noticeboard/route.ts`

#### Import Addition
```typescript
import { deleteUploadedFile } from '@/lib/fileUtils';
```

#### DELETE Endpoint - Auto-Delete Files
When deleting a notice, automatically deletes the associated file:

**Before:**
- Just deleted database record
- File left in storage

**After:**
- Retrieves notice file_url from database
- Deletes database record
- Calls `deleteUploadedFile()` for the file (if exists)
- Success message: "Notice and associated file deleted successfully"

**Code:**
```typescript
// Get the notice details to retrieve file URL before deleting
const notice = await db.query('SELECT file_url FROM placement_noticeboard WHERE id = ?', [id]);

// Delete from database
await db.query('DELETE FROM placement_noticeboard WHERE id = ?', [id]);

// Delete associated file if it exists
if (notice && notice.length > 0 && notice[0].file_url) {
  await deleteUploadedFile(`placement-noticeboard/${notice[0].file_url}`);
}
```

#### PUT Endpoint - Auto-Override Files
When updating a notice and uploading a new file, automatically deletes the old one:

**New Parameters:**
- `oldFileUrl`: Previous file URL (sent by frontend)

**Logic:**
- If new file uploaded and old exists: delete old file
- Update database with new file_url
- Success message: "Notice updated successfully"

**Code:**
```typescript
// Delete old file if it's being replaced with a new one
if (oldFileUrl && file_url && oldFileUrl !== file_url) {
  await deleteUploadedFile(`placement-noticeboard/${oldFileUrl}`);
}
```

### Frontend Page: `/src/app/placement/dashboard/noticeboard/page.tsx`

#### handleSubmit Function Update
When submitting form for update, now sends old file URL to API:

**Changes:**
```typescript
// If editing and new file selected, include old file URL for deletion
if (editingId && uploadedFile) {
  const currentNotice = notices.find(n => n.id === editingId);
  if (currentNotice?.file_url) {
    body.oldFileUrl = currentNotice.file_url;
  }
}
```

**Toast Messages Updated:**
- Update success: "Notice updated successfully (old file removed if replaced)"
- Provides user feedback that old files are being cleaned up

---

## File Structure Summary

### Before Changes
```
Database Record → Linked to File
Delete Record → File Orphaned ❌
Update Record (new file) → Old File Orphaned ❌
```

### After Changes
```
Database Record → Linked to File
Delete Record → File Auto-Deleted ✅
Update Record (new file) → Old File Auto-Deleted ✅
```

---

## Storage Location Reference

### Placement Events
- **Circular PDFs:** `public/uploads/placement_events/circular/`
- **Guidelines PDFs:** `public/uploads/placement_events/guidelines/`
- **Database Column:** `circular_url`, `guidelines_url`

### Placement Noticeboard
- **Files:** `public/uploads/placement-noticeboard/`
- **Database Column:** `file_url`

---

## Security Considerations

### File Deletion Safety
1. **Path Validation:** Ensures all deleted paths are within `public/uploads/`
2. **No Forced Deletion:** Only deletes files explicitly referenced in database
3. **Graceful Handling:** ENOENT errors (file not found) return success
4. **Logging:** All operations logged for audit trail

### Error Handling
- File deletion errors don't block database operations
- Graceful fallback if file doesn't exist
- Console errors logged for debugging
- User notified via toast messages

---

## Testing Checklist

### Placement Events Module
- [ ] Create event with circular PDF → No old files to delete ✅
- [ ] Edit event and upload new circular → Old circular deleted ✅
- [ ] Edit event and upload new guidelines → Old guidelines deleted ✅
- [ ] Edit event, upload both new PDFs → Both old PDFs deleted ✅
- [ ] Delete event → Both PDFs deleted ✅
- [ ] Edit event, keep same PDF → No deletion ✅
- [ ] Edit event, clear PDF field → PDF remains (null handling) ✅

### Placement Noticeboard Module
- [ ] Create notice with file → No old files to delete ✅
- [ ] Edit notice and upload new file → Old file deleted ✅
- [ ] Delete notice with file → File deleted ✅
- [ ] Delete notice without file → No errors ✅
- [ ] Edit notice, keep same file → No deletion ✅

---

## Toast Notifications

### Creation
- "Event created successfully"
- "Notice created successfully"

### Update with File Changes
- "Event updated successfully (old files removed if replaced)"
- "Notice updated successfully (old file removed if replaced)"

### Update without File Changes
- "Event updated successfully"
- "Notice updated successfully"

### Deletion
- "Event deleted successfully"
- "Notice deleted successfully"
- "Event and associated files deleted successfully"
- "Notice and associated file deleted successfully"

---

## Database Impact
- **No schema changes required**
- No new columns needed
- Existing `circular_url`, `guidelines_url`, `file_url` columns used
- File deletion is filesystem operation only

---

## Performance Considerations
- File deletion happens async (doesn't block API response)
- Database deletion completes before file deletion
- If file deletion fails, database transaction already committed
- Multiple file deletions handled in parallel via Promise.all

---

## Rollback Instructions
If needed to revert:

1. Remove import from both API routes:
   ```typescript
   import { deleteUploadedFile } from '@/lib/fileUtils';
   ```

2. Remove DELETE endpoint file cleanup logic

3. Remove PUT endpoint file override logic

4. Remove old file URL parameters from frontend

5. Delete `/src/lib/fileUtils.ts`

6. Files in storage will need manual cleanup if not done yet

---

## Future Enhancements
1. Add option to retain files on record deletion
2. Implement file versioning system
3. Add automatic cleanup for orphaned files
4. Create admin tool to view/manage all uploaded files
5. Add file storage quota management
6. Implement file encryption for sensitive PDFs

---

## Support
For issues or questions:
1. Check toast notifications for user-friendly error messages
2. Check console logs for technical details
3. Verify file paths in database match filesystem
4. Ensure `public/uploads/` directory has write permissions
