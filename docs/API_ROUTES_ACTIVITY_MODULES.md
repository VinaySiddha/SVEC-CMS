# API Routes - Activity Modules Integration

## Problem Fixed
The API was returning **404 "Invalid department or module"** errors when trying to access the new activity modules (activity-coordinators, activity-events, activity-gallery) because they weren't registered in the API route handlers' DEPARTMENT_MODULES mapping.

## Solution
Added the three new activity modules to the DEPARTMENT_MODULES mappings in all three API route files for CSE-AI, MBA, AIML, and CSE-DS departments.

## Files Updated

### 1. `/src/app/api/admin/departments/[dept]/[module]/route.ts`
**Purpose**: Main CRUD API endpoint for department modules (GET, POST, PUT, DELETE)

**Updated Departments**:
- ✅ **cse-ai**: Added activity-coordinators, activity-events, activity-gallery mappings
- ✅ **mba**: Added activity-coordinators, activity-events, activity-gallery mappings
- ✅ **aiml**: Added activity-coordinators, activity-events, activity-gallery mappings
- ✅ **cse-ds**: Added activity-coordinators, activity-events, activity-gallery mappings

**Module Mappings Added**:
```javascript
'activity-coordinators': '{PREFIX}_activity_coordinators',
'activity-events': '{PREFIX}_activity_events',
'activity-gallery': '{PREFIX}_activity_gallery',
```

Where `{PREFIX}` is:
- `cai_` for CSE-AI
- `mba_` for MBA
- `aiml_` for AIML
- `ds_` for CSE-DS

---

### 2. `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts`
**Purpose**: Fetches table structure and field configuration for dynamic form generation

**Updated Departments**:
- ✅ **cse-ai**: Added activity module mappings (lines ~10-36)
- ✅ **mba**: Added activity module mappings (lines ~145-173)
- ✅ **aiml**: Added activity module mappings (lines ~230-255)
- ✅ **cse-ds**: Added activity module mappings (lines ~207-235)

**Changes**: Same module-to-table mappings as the main route file

---

### 3. `/src/app/api/admin/departments/[dept]/[module]/delete-file/route.ts`
**Purpose**: Handles file deletion from module records

**Updated Departments**:
- ✅ **cse-ai**: Added activity module mappings (lines ~9-35)
- ✅ **mba**: Added activity module mappings (new section after CST)
- ✅ **aiml**: Added activity module mappings (new section after MBA)
- ✅ **cse-ds**: Added activity module mappings (new section after AIML)

**Changes**: Same module-to-table mappings as other route files

---

## Database Table Mappings

### CSE-AI (cai_ prefix)
```
activity-coordinators → cai_activity_coordinators
activity-events       → cai_activity_events
activity-gallery      → cai_activity_gallery
```

### MBA (mba_ prefix)
```
activity-coordinators → mba_activity_coordinators
activity-events       → mba_activity_events
activity-gallery      → mba_activity_gallery
```

### AIML (aiml_ prefix)
```
activity-coordinators → aiml_activity_coordinators
activity-events       → aiml_activity_events
activity-gallery      → aiml_activity_gallery
```

### CSE-DS (ds_ prefix)
```
activity-coordinators → ds_activity_coordinators
activity-events       → ds_activity_events
activity-gallery      → ds_activity_gallery
```

---

## API Endpoint Examples

Now the following endpoints are available:

### Get Activity Coordinators
```
GET /api/admin/departments/cse-ai/activity-coordinators
```

### Get Activity Events
```
GET /api/admin/departments/cse-ai/activity-events
```

### Get Activity Gallery
```
GET /api/admin/departments/cse-ai/activity-gallery
```

### Create New Record
```
POST /api/admin/departments/cse-ai/activity-coordinators
Body: { name: "...", designation: "...", role: "...", ... }
```

### Update Record
```
PUT /api/admin/departments/cse-ai/activity-coordinators/{id}
Body: { name: "...", designation: "...", ... }
```

### Delete Record
```
DELETE /api/admin/departments/cse-ai/activity-coordinators/{id}
```

### Delete File From Record
```
POST /api/admin/departments/cse-ai/activity-events/{id}/delete-file
Body: { field: "image_url", fileUrl: "path/to/file.jpg" }
```

---

## Verification

### Routes Status
✅ All three API route files compiled without errors
✅ All DEPARTMENT_MODULES mappings are consistent
✅ Table prefix conventions followed
✅ Department access verification in place

### Expected Behavior After Fix
1. Admin dashboard can now load activity module forms
2. API calls to `/api/admin/departments/{dept}/{activity-module}` will return 200 OK (instead of 404)
3. Form fields will populate from module-fields.ts configuration
4. CRUD operations work on activity tables
5. File uploads/deletions are properly routed

---

## Related Files

- `/src/config/module-fields.ts` - Field configurations for activity modules (5,620 lines)
- `/src/app/departments/[dept]/dashboard/page.tsx` - Admin dashboard consuming these APIs
- `/EXTRA_CURRICULAR_TABLE_DESIGN.md` - MySQL schema documentation
- `/ACTIVITY_MODULES_COMPLETE.md` - Implementation summary

---

## Status
**RESOLVED** ✅ - All API routes now recognize activity modules and return proper responses instead of 404 errors.
