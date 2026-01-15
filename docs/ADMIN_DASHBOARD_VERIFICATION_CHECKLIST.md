# Admin Dashboard Quick Verification Checklist

## ✅ System Components Already Implemented

### Backend API Routes
- ✅ **Structure Endpoint** - `src/app/api/admin/departments/[dept]/[module]/structure/route.ts`
  - Returns table schema and field configuration
  - Handles authentication via JWT tokens
  - Supports all CST modules

- ✅ **Data Fetch Endpoint** - `src/app/api/admin/departments/[dept]/[module]/route.ts`
  - GET: Fetch data with pagination
  - POST: Create new records
  - PUT: Update records
  - DELETE: Delete records
  - Supports search and filtering

- ✅ **File Upload Endpoint** - `src/app/api/admin/departments/[dept]/[module]/upload`
  - Handles file uploads for MOUs, Industry Programs, etc.
  - Validates file type and size
  - Stores files in `/uploads/cst/[module]/`

- ✅ **File Deletion Endpoint** - `src/app/api/admin/departments/[dept]/[module]/delete-file`
  - Deletes associated files from filesystem
  - Clears file URLs from database

### Field Configurations
- ✅ **Module Fields** - `src/config/module-fields.ts`
  - CST MOUs - with file upload support
  - CST Workshops - with file upload support
  - CST Industry Programs - with file upload support
  - All other CST modules configured

### Frontend Components
- ✅ **Admin Dashboard** - `src/app/departments/[dept]/dashboard/page.tsx`
  - Dynamic table rendering
  - CRUD operations UI
  - File upload forms
  - Pagination and sorting
  - Auto-refresh functionality
  - Data caching

### Mappings Verified
- ✅ **Structure Route** has all CST modules including:
  - mous, workshops, industry-programs, faculty, etc.

- ✅ **Main Data Route** has all CST modules including:
  - mous, workshops, industry-programs, faculty, etc.

- ✅ **Delete File Route** has all CST modules

## 🧪 How to Test the System

### Test 1: Load Admin Dashboard
```
1. Go to: http://localhost:3000/departments/cst/dashboard
2. Log in with CST admin credentials
3. You should see:
   - Department name (CST)
   - Available modules list
   - Stats cards showing active status
```

### Test 2: Load a Module
```
1. Click on "MOUs" module
2. System should:
   - Fetch structure from /api/admin/departments/cst/mous/structure
   - Display table headers dynamically
   - Show "No records found" if table is empty
   - OR show data if table has records
```

### Test 3: Create a Record
```
1. Click "Add First Record" button
2. Fill in form fields:
   - Organization/Institute
   - MOU Start Date
   - MOU End Date
   - MOU Status
   - MOU Document (file upload)
3. Click Save
4. Should see success notification
5. Table should refresh with new record
```

### Test 4: View Data
```
1. Module table shows:
   - First 5 columns (scrollable for more)
   - ID, Organization, From Date, To Date, Status
   - Edit and Delete buttons
2. Pagination controls visible
3. Data properly formatted (dates readable)
```

### Test 5: Edit a Record
```
1. Click Edit button on any row
2. Modal opens with form pre-filled
3. Modify a field (e.g., status)
4. Click Save
5. Table refreshes with updated data
```

### Test 6: Delete a Record
```
1. Click Delete button on any row
2. Confirmation dialog appears
3. Click Confirm
4. File associated (if any) is deleted
5. Table refreshes without record
```

### Test 7: File Upload
```
1. Create or edit MOUs record
2. Should see "MOU Document" file upload field
3. Click to select a PDF/DOC file
4. File is validated:
   - ✅ Size < 5MB
   - ✅ Type is PDF/DOC/DOCX/Images
5. Click Save
6. File is uploaded to /uploads/cst/mous/
7. File URL stored in database
```

### Test 8: Switch Modules
```
1. Click different module (Faculty, Workshops, etc.)
2. Table structure updates
3. Data loads for new module
4. Columns change based on module configuration
```

## 🔍 Check API Responses

### Check Structure Endpoint
Open browser DevTools (F12) → Console and run:
```javascript
fetch('/api/admin/departments/cst/mous/structure', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
})
.then(r => r.json())
.then(console.log)
```

Expected response:
```json
{
  "success": true,
  "source": "config",
  "fields": [
    { "name": "mou_with", "label": "Organization/Institute", ... },
    { "name": "file_url", "label": "MOU Document", "type": "file", ... }
  ]
}
```

### Check Data Endpoint
```javascript
fetch('/api/admin/departments/cst/mous?page=1&limit=100', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
})
.then(r => r.json())
.then(console.log)
```

Expected response:
```json
{
  "success": true,
  "data": {
    "records": [
      { "id": 1, "mou_with": "IIT Delhi", "status": "Till Date", ... }
    ],
    "total": 5,
    "totalPages": 1
  }
}
```

## 📋 Verification Checklist

### Backend
- [ ] Structure endpoint returns field configuration
- [ ] Data endpoint returns paginated records
- [ ] Upload endpoint accepts and stores files
- [ ] Delete endpoint removes files and clears URLs
- [ ] Authentication working (401 on missing/invalid token)

### Frontend
- [ ] Module list displays all available modules
- [ ] Clicking module loads table structure
- [ ] Table displays data from database
- [ ] Create button opens form modal
- [ ] Edit button populates form with record data
- [ ] Delete button shows confirmation
- [ ] File upload field appears for MOUs
- [ ] Pagination works (next/previous pages)
- [ ] Auto-refresh toggle works
- [ ] Search functionality works

### Data Flow
- [ ] MySQL tables have data
- [ ] API returns data correctly formatted
- [ ] UI renders table without errors
- [ ] Newly created records appear in table
- [ ] Updates reflect immediately in table
- [ ] Deletions remove records from table
- [ ] File uploads create records with file URLs

## 📊 Current Status

| Component | Status | Module | Details |
|-----------|--------|--------|---------|
| Structure API | ✅ Complete | All CST | Returns field config |
| Data API | ✅ Complete | All CST | GET/POST/PUT/DELETE |
| File Upload | ✅ Complete | MOUs, Industry Programs | Stores in /uploads/ |
| Dashboard UI | ✅ Complete | All CST | Dynamic tables |
| CRUD Forms | ✅ Complete | All CST | Full edit interface |
| Authentication | ✅ Complete | Admin routes | JWT token based |
| Caching | ✅ Complete | All modules | 5-minute duration |
| Pagination | ✅ Complete | Data endpoints | 100 records/page |

## 🚀 Next Steps After Verification

1. **Restart Dev Server** (if not done recently)
   ```bash
   Ctrl+C (stop current server)
   npm run dev
   ```

2. **Test Each Module**
   - MOUs ✅ Ready (with file upload)
   - Workshops ✅ Ready
   - Faculty ✅ Ready
   - All others ✅ Ready

3. **Monitor Console for Errors**
   - Open DevTools (F12)
   - Look for failed API requests
   - Check authentication errors

4. **Verify Database Tables Exist**
   - MOUs → `cst_mous`
   - Faculty → `cst_faculty`
   - Workshops → `cst_workshops`
   - All others should have corresponding tables

## 💡 Performance Tips

1. **Caching**: Data cached for 5 minutes for performance
2. **Pagination**: Only load 100 records at a time
3. **Search**: Use search to filter instead of loading all records
4. **Auto-refresh**: Disable auto-refresh to reduce API calls
5. **Images**: Lazy load gallery images in background

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 Invalid module | Module missing in DEPARTMENT_MODULES mapping |
| 401 Unauthorized | Token expired or missing, need to log in again |
| No data in table | Table is empty in database, add records |
| File upload fails | File > 5MB or invalid type |
| Slow loading | Clear cache, check network tab for API times |
| Form not appearing | Module configuration missing in module-fields.ts |

## Summary

✅ **Everything is already implemented and ready to use!**

Your admin dashboard:
- Fetches data from MySQL tables ✅
- Displays data in dynamic tables ✅
- Handles file uploads ✅
- Performs CRUD operations ✅
- Manages authentication ✅
- Caches for performance ✅
- Handles pagination ✅

**Just restart your dev server and start testing!**
