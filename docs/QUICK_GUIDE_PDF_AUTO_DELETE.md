# Quick Implementation Guide - Auto PDF Deletion

## What's New?

### For Placement Events Module
✅ **Delete Record** → All PDFs (circular & guidelines) automatically deleted  
✅ **Edit & Upload New PDF** → Old PDFs automatically replaced/deleted  
✅ **Edit & Keep PDF** → Existing PDFs preserved  

### For Placement Noticeboard Module
✅ **Delete Record** → Attached file automatically deleted  
✅ **Edit & Upload New File** → Old file automatically replaced/deleted  
✅ **Edit & Keep File** → Existing file preserved  

---

## Files Changed

### New Files
- `src/lib/fileUtils.ts` - File deletion utility functions

### Modified API Routes
- `src/app/api/placement/events/route.ts` - Added file deletion on DELETE & PUT
- `src/app/api/placement/noticeboard/route.ts` - Added file deletion on DELETE & PUT

### Modified Frontend Pages
- `src/app/placement/dashboard/events/page.tsx` - Sends old file URLs on update
- `src/app/placement/dashboard/noticeboard/page.tsx` - Sends old file URLs on update

---

## How It Works

### Placement Events - Delete Event
```
Admin clicks Delete Event
↓
API retrieves event (gets circular_url, guidelines_url)
↓
Database record deleted
↓
circular_url file deleted from storage
↓
guidelines_url file deleted from storage
↓
Success toast: "Event deleted successfully"
```

### Placement Events - Edit Event (Upload New PDF)
```
Admin clicks Edit Event
↓
Admin selects new Circular PDF
↓
Frontend stores old URL in submitData
↓
New PDF uploaded to storage
↓
API receives old URL in request
↓
Database updated with new URL
↓
Old PDF deleted from storage
↓
Success toast: "Event updated successfully (old files removed if replaced)"
```

### Placement Noticeboard - Delete Notice
```
Admin clicks Delete Notice
↓
API retrieves notice (gets file_url)
↓
Database record deleted
↓
file_url deleted from storage
↓
Success toast: "Notice deleted successfully"
```

### Placement Noticeboard - Edit Notice (Upload New File)
```
Admin clicks Edit Notice
↓
Admin selects new File
↓
Frontend stores old file URL in submitData
↓
New file uploaded
↓
API receives old URL in request
↓
Database updated with new URL
↓
Old file deleted from storage
↓
Success toast: "Notice updated successfully (old file removed if replaced)"
```

---

## User Experience Improvements

### Before Implementation
- Delete event → PDFs remain in storage (orphaned)
- Edit event, upload new PDF → Old PDF remains (storage bloat)
- No feedback on file cleanup

### After Implementation
- Delete event → PDFs automatically removed
- Edit event, upload new PDF → Old PDF automatically removed
- Clear toast notifications about file status
- Storage stays clean and organized

---

## Storage Locations

### Placement Events
```
public/uploads/
├── placement_events/
│   ├── circular/
│   │   └── [uploaded PDFs]
│   └── guidelines/
│       └── [uploaded PDFs]
```

### Placement Noticeboard
```
public/uploads/
└── placement-noticeboard/
    └── [uploaded files]
```

---

## Testing Quick Checklist

### Placement Events
- [ ] Delete event with PDFs → Files gone from storage
- [ ] Edit event, upload new circular → Old circular gone
- [ ] Edit event, upload new guidelines → Old guidelines gone
- [ ] Edit event, keep same file → File not deleted

### Placement Noticeboard
- [ ] Delete notice with file → File gone from storage
- [ ] Edit notice, upload new file → Old file gone
- [ ] Edit notice, keep same file → File not deleted

---

## Troubleshooting

### Issue: Files not being deleted
**Solution:**
1. Check `public/uploads/` directory exists and has write permissions
2. Check browser console for errors
3. Check server logs for `deleteUploadedFile` errors
4. Verify file paths in database match filesystem

### Issue: Toast says file removed but file still exists
**Solution:**
1. File deletion might have failed silently (check server logs)
2. Manual cleanup may be needed
3. Check file permissions on `public/uploads/`

### Issue: "ENOENT: no such file or directory" errors
**Solution:**
- These are expected and handled gracefully
- Means file already deleted or doesn't exist
- Won't block the operation

---

## Performance Notes
- File deletion happens asynchronously (fast response)
- Multiple files deleted in parallel
- No database locks or delays
- Minimal server load impact

---

## Security Notes
- Only files in `public/uploads/` can be deleted
- File paths validated for security
- No user input in file deletion paths
- Orphaned files can't be deleted accidentally

---

## Key Improvements
1. **Storage Efficiency**: No orphaned files left behind
2. **Clean Data**: Database and filesystem stay synchronized
3. **Better UX**: Clear feedback on file operations
4. **Safe**: Validation prevents accidental deletions
5. **Maintainable**: Centralized file utility for future use

---

## Next Steps (Optional)
1. Monitor storage usage - should decrease over time
2. Optional: Run manual cleanup for pre-existing orphaned files
3. Optional: Add admin tool to view uploaded files
4. Optional: Implement file retention policies

---

## Support Resources
- See `PDF_AUTO_DELETE_UPDATE.md` for detailed documentation
- Check `src/lib/fileUtils.ts` for implementation details
- API routes have detailed comments for understanding flow
