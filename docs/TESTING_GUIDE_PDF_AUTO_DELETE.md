# Testing Guide - PDF Auto-Delete & Override Feature

## Quick Start Testing

### Access Points
- **Placement Events Module**: `/placement/dashboard/events`
- **Placement Noticeboard Module**: `/placement/dashboard/noticeboard`

---

## Test Case 1: Delete Event with Both PDFs

### Setup
1. Navigate to `/placement/dashboard/events`
2. Create an event with:
   - Title: "Test Event 1"
   - Circular PDF: `test-circular.pdf`
   - Guidelines PDF: `test-guidelines.pdf`
   - Link: `https://example.com`

### Action
1. Click "Delete" button on the event
2. Confirm deletion

### Expected Results
✅ Toast shows: "Event deleted successfully"  
✅ Event removed from list  
✅ Check storage: Both PDFs should be deleted from `public/uploads/placement_events/`  
✅ No 404 errors in console  

### Verification Commands
```bash
# Should NOT exist after deletion
ls public/uploads/placement_events/circular/test-circular.pdf
ls public/uploads/placement_events/guidelines/test-guidelines.pdf
```

---

## Test Case 2: Delete Event with Only Circular PDF

### Setup
1. Create an event with:
   - Title: "Test Event 2"
   - Circular PDF: `test-circular-2.pdf`
   - Guidelines: (leave empty)

### Action
1. Click "Delete" on the event

### Expected Results
✅ Toast shows: "Event deleted successfully"  
✅ Circular PDF deleted  
✅ No errors for missing guidelines PDF  

---

## Test Case 3: Edit Event - Upload New Circular PDF

### Setup
1. Create an event with:
   - Title: "Test Event 3"
   - Circular PDF: `old-circular.pdf`

### Action
1. Click "Edit" on the event
2. Upload new circular: `new-circular.pdf`
3. Keep guidelines empty
4. Click "Save"

### Expected Results
✅ Toast shows: "Event updated successfully (old files removed if replaced)"  
✅ Event list shows updated event  
✅ Check storage:
   - `public/uploads/placement_events/circular/old-circular.pdf` - DELETED
   - `public/uploads/placement_events/circular/new-circular.pdf` - EXISTS  

---

## Test Case 4: Edit Event - Upload Both New PDFs

### Setup
1. Create an event with:
   - Title: "Test Event 4"
   - Circular PDF: `old-circular.pdf`
   - Guidelines PDF: `old-guidelines.pdf`

### Action
1. Click "Edit"
2. Upload new circular: `new-circular-2.pdf`
3. Upload new guidelines: `new-guidelines-2.pdf`
4. Click "Save"

### Expected Results
✅ Toast shows: "Event updated successfully (old files removed if replaced)"  
✅ Check storage:
   - Old circular: DELETED ✓
   - Old guidelines: DELETED ✓
   - New circular: EXISTS ✓
   - New guidelines: EXISTS ✓

---

## Test Case 5: Edit Event - No File Upload

### Setup
1. Create event with:
   - Title: "Test Event 5"
   - Circular PDF: `keep-circular.pdf`

### Action
1. Click "Edit"
2. Don't select any files
3. Change title to "Updated Title"
4. Click "Save"

### Expected Results
✅ Toast shows: "Event updated successfully"  
✅ Check storage:
   - `keep-circular.pdf` should STILL EXIST ✓
   - No deletion occurred ✓

---

## Test Case 6: Delete Notice with File

### Setup
1. Navigate to `/placement/dashboard/noticeboard`
2. Create a notice with:
   - Title: "Test Notice 1"
   - Category: "General Notice"
   - Content: "Test content"
   - File: `test-notice.pdf`

### Action
1. Click "Delete" button on the notice
2. Confirm deletion

### Expected Results
✅ Toast shows: "Notice deleted successfully"  
✅ Notice removed from list  
✅ Check storage:
   - `public/uploads/placement-noticeboard/test-notice.pdf` - DELETED

---

## Test Case 7: Edit Notice - Upload New File

### Setup
1. Create a notice with:
   - Title: "Test Notice 2"
   - File: `old-notice.pdf`

### Action
1. Click "Edit" on the notice
2. Upload new file: `new-notice.pdf`
3. Click "Save"

### Expected Results
✅ Toast shows: "Notice updated successfully (old file removed if replaced)"  
✅ Check storage:
   - Old file: DELETED ✓
   - New file: EXISTS ✓

---

## Test Case 8: Edit Notice - No File Upload

### Setup
1. Create notice with:
   - Title: "Test Notice 3"
   - File: `keep-notice.pdf`

### Action
1. Click "Edit"
2. Don't select a new file
3. Update title
4. Click "Save"

### Expected Results
✅ Toast shows: "Notice updated successfully"  
✅ Check storage:
   - `keep-notice.pdf` still EXISTS ✓

---

## Edge Case Testing

### Edge Case 1: File Already Deleted Externally

### Setup
1. Create event with circular PDF
2. Manually delete the PDF file from `public/uploads/`

### Action
1. Delete the event from admin panel

### Expected Results
✅ Toast shows success (handles missing file gracefully)  
✅ No 500 errors  
✅ Check console: May see info-level log about missing file  

---

### Edge Case 2: File Permission Denied

### Setup
1. Create event with PDF
2. Change file permissions to read-only (Windows: remove write permission)

### Action
1. Delete the event

### Expected Results
✅ Database deletion succeeds  
✅ Toast shows success (DB deletion not blocked by file permission)  
✅ Check console: Error logged about file deletion failure  
⚠️ File remains (manual cleanup needed)  

---

### Edge Case 3: Very Long Filename

### Setup
1. Create event with PDF named:
   `this-is-a-very-long-filename-that-tests-path-length-handling-in-the-system.pdf`

### Action
1. Edit event with new PDF
2. Delete event

### Expected Results
✅ File deletion succeeds  
✅ No path-length errors  

---

### Edge Case 4: Special Characters in Filename

### Setup
1. Create event with PDF named:
   `test-file (1) [version].pdf`

### Action
1. Edit with new PDF
2. Delete event

### Expected Results
✅ File deletion succeeds  
✅ Special characters handled correctly  

---

## Automated Testing Commands

### Check if File Exists (Windows PowerShell)
```powershell
# Check single file
Test-Path "public/uploads/placement_events/circular/test-file.pdf"
# Result: True or False

# Check all circular PDFs
Get-ChildItem "public/uploads/placement_events/circular/" -Recurse
```

### Check if File Exists (Linux/Mac)
```bash
# Check single file
ls public/uploads/placement_events/circular/test-file.pdf && echo "EXISTS" || echo "DELETED"

# List all files
find public/uploads/placement_events/ -type f
```

### Check Storage Usage
```bash
# Total uploads size
du -sh public/uploads/

# Events storage
du -sh public/uploads/placement_events/

# Noticeboard storage
du -sh public/uploads/placement-noticeboard/
```

---

## Browser Console Testing

### Check for Errors
1. Open Developer Tools (F12)
2. Go to Console tab
3. Filter for errors (Error, Warn)
4. Expected: Only info-level logs for file operations

### Expected Logs
```javascript
// When deleting event with PDFs
"File deleted successfully: placement_events/circular/file.pdf"
"File deleted successfully: placement_events/guidelines/file.pdf"

// When file not found
"File not found (already deleted): placement_events/circular/missing.pdf"
```

---

## Toast Notification Verification

### Success Messages to See
- ✅ "Event created successfully"
- ✅ "Event updated successfully"
- ✅ "Event updated successfully (old files removed if replaced)"
- ✅ "Event deleted successfully"
- ✅ "Notice created successfully"
- ✅ "Notice updated successfully"
- ✅ "Notice updated successfully (old file removed if replaced)"
- ✅ "Notice deleted successfully"

### Error Messages (if any occur)
- ⚠️ "Failed to delete event"
- ⚠️ "Failed to update event"
- ⚠️ "Title is required"
- etc.

---

## Database Verification

### Verify Events Were Deleted from Database
```sql
-- Should show fewer records after deletion test
SELECT COUNT(*) FROM placement_events;

-- Should show deleted events are gone
SELECT * FROM placement_events WHERE title LIKE 'Test Event%';
```

### Verify Noticeboard Was Deleted from Database
```sql
-- Should show fewer records after deletion test
SELECT COUNT(*) FROM placement_noticeboard;

-- Should show deleted notices are gone
SELECT * FROM placement_noticeboard WHERE title LIKE 'Test Notice%';
```

---

## Performance Testing

### Load Test - Multiple Rapid Deletions
1. Create 10 events each with 2 PDFs
2. Delete all 10 events rapidly (within 5 seconds)

### Expected Results
✅ All deletions succeed  
✅ All files cleaned up  
✅ No database locks or delays  
✅ Check console: All file deletion logs appear  

---

## Cleanup Instructions

### After Testing, Clean Up Test Files

#### Option 1: Keep Test Data (for ongoing testing)
- No action needed
- Test data useful for regression testing

#### Option 2: Clean Up Test Files
```sql
-- Remove test events
DELETE FROM placement_events WHERE title LIKE 'Test Event%';

-- Remove test notices
DELETE FROM placement_noticeboard WHERE title LIKE 'Test Notice%';
```

#### Clean Storage Manually (if test files remain)
```bash
# Windows PowerShell
Remove-Item "public/uploads/placement_events/circular/test-*.pdf"
Remove-Item "public/uploads/placement_events/guidelines/test-*.pdf"
Remove-Item "public/uploads/placement-noticeboard/test-*.pdf"

# Linux/Mac
rm public/uploads/placement_events/circular/test-*.pdf
rm public/uploads/placement_events/guidelines/test-*.pdf
rm public/uploads/placement-noticeboard/test-*.pdf
```

---

## Regression Testing Checklist

### After Each Deployment
- [ ] Test Case 1: Delete event with both PDFs
- [ ] Test Case 3: Edit event - upload new circular
- [ ] Test Case 6: Delete notice with file
- [ ] Test Case 7: Edit notice - upload new file
- [ ] Edge Case 1: File already deleted
- [ ] Verify no console errors
- [ ] Verify storage size decreased

---

## Sign-Off Checklist

```
Feature: PDF Auto-Delete & Override
Version: 1.0
Date: ________
Tester: ________

Core Functionality
☐ Delete event deletes all PDFs
☐ Edit event replaces circular PDF
☐ Edit event replaces guidelines PDF
☐ Delete notice deletes file
☐ Edit notice replaces file

User Experience
☐ Toast messages show correctly
☐ No console errors
☐ UI responsive during operations

Storage Management
☐ No orphaned files after delete
☐ Old files removed on update
☐ Files preserved when not changed

Edge Cases
☐ Missing files handled gracefully
☐ Permission errors logged
☐ Special characters work
☐ Long filenames work

Security
☐ Only files in public/uploads/ deleted
☐ No user input in paths
☐ Path validation working

Sign Off: __________
```

---

## Support & Troubleshooting

**If tests fail:**

1. Check console logs in browser DevTools
2. Check server logs for file operation errors
3. Verify `public/uploads/` directory exists and is writable
4. Check file permissions
5. Review documentation files:
   - `PDF_AUTO_DELETE_UPDATE.md` (troubleshooting section)
   - `QUICK_GUIDE_PDF_AUTO_DELETE.md` (troubleshooting section)

**Questions or issues:**
- Review relevant documentation
- Check console logs for specific error messages
- Verify file system permissions
- Ensure database connection working
