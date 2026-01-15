# CSE-AI Non-Teaching Faculty Dynamic Fields - Implementation & Testing Guide

## 📋 Overview

The CSE-AI admin dashboard now has **fully dynamic fields** for managing non-teaching faculty. The system automatically renders forms based on database schema and field configurations.

---

## ✅ Implementation Status

### Components Deployed

1. **Field Configuration** ✅
   - File: `/src/config/module-fields.ts`
   - Module: `cse-ai` → `non-teaching-faculty`
   - Table: `cai_non_teaching_faculty`

2. **Field Mapping System** ✅
   - File: `/src/utils/field-mapping.ts`
   - Handles `title` ↔ `name` translation
   - Applied in: POST, PUT, GET operations

3. **API Routes** ✅
   - File: `/src/app/api/admin/departments/[dept]/[module]/route.ts`
   - Integrated field mapping

4. **Structure Endpoint** ✅
   - File: `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts`
   - Returns configured fields dynamically

5. **Dashboard Component** ✅
   - File: `/src/app/departments/[dept]/dashboard/page.tsx`
   - Uses field configuration for form rendering

---

## 🎯 Dynamic Fields Configuration

### Field Definitions

```typescript
{
  'non-teaching-faculty': {
    tableName: 'cai_non_teaching_faculty',
    displayField: 'title',
    fields: [
      {
        name: 'title',
        label: 'Staff Name',
        type: 'text',
        placeholder: 'e.g., Mr. Rajesh Kumar',
        required: true
      },
      {
        name: 'qualification',
        label: 'Qualification',
        type: 'text',
        placeholder: 'e.g., B.Com, B.A.',
        required: false
      },
      {
        name: 'designation',
        label: 'Designation',
        type: 'text',
        placeholder: 'e.g., Office Assistant',
        required: true
      },
      {
        name: 'profile_url',
        label: 'Profile Photo/Image',
        type: 'file',
        accept: '.jpg,.jpeg,.png,.gif,.webp',
        required: false
      }
    ],
    searchableFields: ['title', 'designation'],
    sortableFields: ['title', 'designation', 'created_at'],
    editableFields: ['title', 'qualification', 'designation', 'profile_url']
  }
}
```

### Field Details

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | text | ✅ Yes | Staff member's full name (mapped to `name` in DB) |
| `qualification` | text | ❌ No | Educational qualification (B.A., B.Com, etc.) |
| `designation` | text | ✅ Yes | Job title/role (Office Assistant, Admin Officer, etc.) |
| `profile_url` | file | ❌ No | Profile photo/image upload (JPG, PNG, GIF, WebP) |

---

## 🔄 Data Flow Architecture

### Request Flow (Create Operation)

```
┌─────────────────────────────────────┐
│  Admin Dashboard                    │
│  Form Input:                        │
│  - title: "Mr. Rajesh Kumar"        │
│  - qualification: "B.Com"           │
│  - designation: "Office Assistant"  │
│  - profile_url: photo.jpg           │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  POST /api/admin/departments/       │
│        cse-ai/non-teaching-faculty  │
│  Body: {title, qualification, ...}  │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  API Route Handler                  │
│  mapFieldsToDatabase()              │
│  Converts: title → name             │
│  Body: {name, qualification, ...}   │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  MySQL Database                     │
│  INSERT INTO cai_non_teaching_      │
│  faculty (name, qualification, ...)  │
│  Values inserted successfully ✅     │
└─────────────────────────────────────┘
```

### Response Flow (Read Operation)

```
┌─────────────────────────────────────┐
│  GET /api/admin/departments/        │
│  cse-ai/non-teaching-faculty        │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Query Database                     │
│  Columns: id, name, qualification,  │
│           designation, profile_url  │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  API Response Mapping               │
│  mapFieldsFromDatabase()            │
│  Converts: name → title             │
│  Response: {id, title, qualification,│
│            designation, profile_url}│
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Admin Dashboard                    │
│  Display: "Mr. Rajesh Kumar" (title)│
│           "B.Com" (qualification)   │
│           "Office Assistant" (desg.)│
│           Photo preview             │
└─────────────────────────────────────┘
```

---

## 🧪 Testing Procedures

### Test 1: View Non-Teaching Faculty Module

**Steps:**
1. Navigate to CSE-AI admin dashboard
2. Find and click on "Non-Teaching Faculty" module

**Expected Results:**
- ✅ Module loads successfully
- ✅ Table displays existing records (if any)
- ✅ "Add New Record" button visible
- ✅ Search and filter options available

**Verification:**
```bash
# Check that structure endpoint returns correct fields
curl -H "Authorization: Bearer <token>" \
  http://localhost:9002/api/admin/departments/cse-ai/non-teaching-faculty/structure
```

**Expected Response:**
```json
{
  "success": true,
  "source": "config",
  "fields": [
    {"name": "title", "label": "Staff Name", ...},
    {"name": "qualification", "label": "Qualification", ...},
    {"name": "designation", "label": "Designation", ...},
    {"name": "profile_url", "label": "Profile Photo/Image", ...}
  ]
}
```

---

### Test 2: Create New Non-Teaching Faculty Record

**Steps:**
1. Click "Add New Record" button
2. Fill in form fields:
   - Staff Name: "Mr. Rajesh Kumar"
   - Qualification: "B.Com"
   - Designation: "Office Assistant"
   - Upload profile photo (optional)
3. Click "Save"

**Expected Results:**
- ✅ Form validation passes
- ✅ No "Unknown column" errors
- ✅ Record created successfully
- ✅ Toast notification: "Record created successfully"
- ✅ Table refreshes automatically
- ✅ New record appears in the table
- ✅ Record count increments

**Verification in Console:**
```
[POST] Field mapping for cai_non_teaching_faculty: {
  original: { title: 'Mr. Rajesh Kumar', qualification: 'B.Com', ... },
  mapped: { name: 'Mr. Rajesh Kumar', qualification: 'B.Com', ... }
}
```

---

### Test 3: Retrieve and Display Records

**Steps:**
1. Verify records display in the table
2. Check if all fields are visible

**Expected Results:**
- ✅ Staff names displayed correctly
- ✅ Qualifications shown where provided
- ✅ Designations visible
- ✅ Profile photos displayed (if uploaded)
- ✅ Pagination working (if 10+ records)
- ✅ Sort indicators visible on sortable columns

**Database Verification:**
```sql
SELECT * FROM cai_non_teaching_faculty;
-- Should show records with 'name' column (not 'title')
-- name, qualification, designation, profile_url, created_at
```

---

### Test 4: Update Existing Record

**Steps:**
1. Click "Edit" on any record
2. Modify one or more fields:
   - Change designation to "Senior Office Assistant"
   - Update qualification
3. Click "Update"

**Expected Results:**
- ✅ Form pre-fills with current data
- ✅ Field mapping works for edit operation
- ✅ No errors on update
- ✅ Toast: "Record updated successfully"
- ✅ Table refreshes with updated data

---

### Test 5: Search Functionality

**Steps:**
1. Click search box
2. Search for staff by name: "Rajesh"
3. Clear search and search by designation: "Office"

**Expected Results:**
- ✅ Search returns matching records
- ✅ Searches title (Staff Name) field
- ✅ Searches designation field
- ✅ Case-insensitive search works
- ✅ Clear search restores full list

---

### Test 6: Delete Record

**Steps:**
1. Click "Delete" on a record
2. Confirm deletion in dialog

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Record deleted successfully
- ✅ Associated profile photo deleted
- ✅ Toast: "Record deleted successfully"
- ✅ Table refreshes without deleted record
- ✅ Record count decrements

---

### Test 7: File Upload (Profile Photo)

**Steps:**
1. Add new record
2. Click file input for "Profile Photo/Image"
3. Select image file (JPG, PNG, GIF, WebP)
4. Max size: 1MB
5. Save record

**Expected Results:**
- ✅ Only image formats accepted
- ✅ 1MB size limit enforced
- ✅ File uploaded to server
- ✅ URL stored in profile_url field
- ✅ Image displays in table
- ✅ Image accessible on record view

---

### Test 8: Auto-Refresh Functionality

**Steps:**
1. Add/Edit/Delete a record
2. Observe table auto-refresh
3. Test manual refresh button
4. Test auto-refresh toggle

**Expected Results:**
- ✅ Table refreshes after operation
- ✅ New/updated records appear immediately
- ✅ Manual refresh button works
- ✅ Auto-refresh toggle functional
- ✅ No manual page refresh needed

---

### Test 9: Field Mapping Validation

**Steps:**
1. View raw database record
2. Compare with dashboard display

**Expected Results:**
- ✅ Database has `name` column
- ✅ Dashboard displays as `title` field
- ✅ Form submission converts `title` → `name`
- ✅ Data retrieval converts `name` → `title`
- ✅ Field mapping is transparent to user

**SQL Verification:**
```sql
-- Database shows 'name' column:
SELECT id, name, qualification, designation, profile_url 
FROM cai_non_teaching_faculty WHERE id = 1;

-- Response shows 'title' field (after mapping)
```

---

### Test 10: Permission & Access Control

**Steps:**
1. Log in as CSE-AI admin
2. Verify access to non-teaching-faculty module
3. Try accessing as different department admin

**Expected Results:**
- ✅ CSE-AI admin can access module
- ✅ CSE-AI admin can create/edit/delete
- ✅ Other department admins cannot access
- ✅ Permission checks working

---

## 📊 Configuration Checklist

- [x] Field configuration added to module-fields.ts
- [x] Field names: title, qualification, designation, profile_url
- [x] Field types: text, text, text, file
- [x] Required fields: title ✅, designation ✅
- [x] Optional fields: qualification, profile_url
- [x] Searchable fields: title, designation
- [x] Sortable fields: title, designation, created_at
- [x] Editable fields: all except id, created_at, updated_at
- [x] File upload: JPG, PNG, GIF, WebP (1MB max)
- [x] Display field: title (Staff Name)

---

## 🔍 Troubleshooting

### Issue: "Unknown column 'description' in 'field list'"

**Cause:** Form is using default fallback fields instead of configured fields

**Solution:**
1. Verify field configuration exists in module-fields.ts
2. Check structure endpoint returns configured fields
3. Restart dev server to reload configuration

**Verification:**
```bash
# Check if configuration is properly exported
grep -n "non-teaching-faculty" src/config/module-fields.ts
```

---

### Issue: Records showing with 'name' field instead of 'title'

**Cause:** Field mapping not being applied

**Solution:**
1. Verify field-mapping.ts is imported in API route
2. Check mapFieldsToDatabase() is called before insert
3. Check mapFieldsFromDatabase() is called before response

**Verification:**
```bash
# Check import statement
grep "field-mapping" src/app/api/admin/departments/*/route.ts
```

---

### Issue: File uploads not working

**Cause:** Missing file upload configuration or incorrect file type

**Solution:**
1. Check file type is in accept list (jpg, jpeg, png, gif, webp)
2. Verify file size < 1MB
3. Check /public/uploads directory exists

---

### Issue: Search not finding records

**Cause:** Search fields not properly configured

**Solution:**
1. Verify searchableFields includes 'title' and 'designation'
2. Check search parameter is being sent to API
3. Verify database indexes for performance

---

## 🚀 Performance Optimization

### Database Indexes

```sql
-- Add indexes for better search performance
ALTER TABLE cai_non_teaching_faculty 
ADD INDEX idx_name (name),
ADD INDEX idx_designation (designation);
```

### Pagination

- Default: 10 records per page
- Maximum: 100 records per page
- Can be adjusted in dashboard

---

## 📚 Related Documentation

- Field Mapping System: `FIELD_MAPPING_FIX_COMPLETE.md`
- API Error Resolution: `API_ERROR_RESOLUTION_COMPLETE.md`
- Auto-Refresh Implementation: `AUTO_REFRESH_FEATURE_DOCUMENTATION.md`

---

## ✨ Features Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Dynamic Form Fields | ✅ | Auto-generated from configuration |
| Field Mapping | ✅ | Transparent title ↔ name translation |
| CRUD Operations | ✅ | Create, Read, Update, Delete working |
| File Uploads | ✅ | 1MB limit, image formats only |
| Search/Filter | ✅ | By name and designation |
| Sorting | ✅ | Multi-column sorting available |
| Pagination | ✅ | 10 items per page default |
| Auto-Refresh | ✅ | After create/update/delete |
| Permissions | ✅ | Department-based access control |
| Validation | ✅ | Required fields enforced |

---

## 🎓 Usage Example

### For Admin Users

**Adding a new non-teaching staff member:**

1. Log into CSE-AI admin dashboard
2. Click "Non-Teaching Faculty"
3. Click "Add New Record"
4. Fill form:
   - Staff Name: "Ms. Priya Sharma"
   - Qualification: "B.A. English"
   - Designation: "Administrative Officer"
   - Profile Photo: (upload optional)
5. Click "Save"
6. Staff member added successfully! ✅

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify configuration in module-fields.ts
3. Check browser console for errors
4. Review API response in Network tab
5. Check server logs for detailed error messages

---

**Last Updated:** November 19, 2025  
**Status:** ✅ Complete and Ready for Production  
**Tested:** All features verified working