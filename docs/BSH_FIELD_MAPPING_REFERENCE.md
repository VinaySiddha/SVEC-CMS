# BSH Modules - Field Mapping Reference

## Quick Reference

### Database Schema
All three modules have identical structure:
```
┌─────────────────────────────────────────┐
│ Column      │ Type          │ Nullable  │
├─────────────────────────────────────────┤
│ id          │ int           │ NOT NULL  │
│ title       │ varchar(255)  │ NULL      │
│ url         │ varchar(255)  │ NULL      │
│ year        │ varchar(20)   │ NULL      │
└─────────────────────────────────────────┘
```

---

## Module-to-Table Mapping

### Syllabus Module
```
URL Path: /bsh/syllabus
Database Table: bsh_syllabus
Display Name: Syllabus
Table Name in UI: Syllabus
```

### Photo Gallery Module
```
URL Path: /bsh/photogallery
Database Table: bsh_photogallery
Display Name: Photo Gallery
Table Name in UI: Photo Gallery
```

### FDP Programs Module
```
URL Path: /bsh/fdps
Database Table: bsh_fdps
Display Name: FDPs/Guest Lectures
Table Name in UI: FDP/Programs
```

---

## Field Configuration for All Three Modules

### Field 1: Title
```typescript
{
  name: 'title',
  label: 'Title',
  type: 'text',
  required: true,
  size: 'full',
  placeholder: 'Enter title...'
}
```
- **Database Column**: title
- **Data Type**: varchar(255)
- **Required**: YES
- **Display**: Text input field
- **Validation**: Cannot be empty

### Field 2: URL (File)
```typescript
{
  name: 'url',
  label: 'Document/Image',
  type: 'file',
  required: false,
  size: 'full',
  accept: '[module-specific]'
}
```
- **Database Column**: url
- **Data Type**: varchar(255)
- **Required**: NO
- **Display**: File upload button
- **Storage**: `/public/uploads/bsh/[module]/`

#### File Types by Module:
- **Syllabus**: .pdf, .doc, .docx
- **Photogallery**: .jpg, .jpeg, .png, .gif, .webp
- **FDPs**: .pdf, .doc, .docx, .txt

### Field 3: Year
```typescript
{
  name: 'year',
  label: 'Year',
  type: 'text',
  required: false,
  size: 'full',
  placeholder: 'e.g., 2024-2025 or 2024'
}
```
- **Database Column**: year
- **Data Type**: varchar(20)
- **Required**: NO
- **Display**: Text input field
- **Examples**: "2024", "2024-2025", "2023-24"

---

## API Endpoints

### GET - Fetch Records
```
GET /api/admin/departments/bsh/[module]?page=1&limit=100
```
**Query Parameters**:
- page: Page number (default: 1)
- limit: Records per page (default: 100)
- search: Search text (searches title and year)

**Response**:
```json
{
  "success": true,
  "data": {
    "records": [...],
    "total": 10,
    "page": 1,
    "limit": 100,
    "totalPages": 1
  }
}
```

### POST - Create Record
```
POST /api/admin/departments/bsh/[module]
Content-Type: application/json

{
  "title": "Course Title",
  "url": "/uploads/bsh/syllabus/file.pdf",
  "year": "2024-2025"
}
```

### PUT - Update Record
```
PUT /api/admin/departments/bsh/[module]?id=1
Content-Type: application/json

{
  "title": "Updated Title",
  "url": "/uploads/bsh/syllabus/newfile.pdf",
  "year": "2025-2026"
}
```

### DELETE - Delete Record
```
DELETE /api/admin/departments/bsh/[module]?id=1
```
- Automatically deletes associated file
- Returns 404 if record not found

---

## File Upload Examples

### Syllabus Upload
```
Directory: public/uploads/bsh/syllabus/
Files: *.pdf, *.doc, *.docx
Example: public/uploads/bsh/syllabus/physics-101-syllabus.pdf
```

### Photo Gallery Upload
```
Directory: public/uploads/bsh/photogallery/
Files: *.jpg, *.jpeg, *.png, *.gif, *.webp
Example: public/uploads/bsh/photogallery/science-fair-2024.png
```

### FDP Program Upload
```
Directory: public/uploads/bsh/fdps/
Files: *.pdf, *.doc, *.docx, *.txt
Example: public/uploads/bsh/fdps/teaching-methods-workshop.pdf
```

---

## Searchable & Sortable Fields

### Searchable By
- **title**: Partial text match (case-insensitive)
- **year**: Partial text match

### Sortable By
- **title**: A-Z / Z-A
- **year**: Chronological / Reverse chronological

---

## Form Display Layout

All three modules use identical form layout:

```
┌──────────────────────────────────┐
│  Title *                         │  (Required, Full Width)
│  ┌────────────────────────────┐  │
│  │                            │  │
│  └────────────────────────────┘  │
├──────────────────────────────────┤
│  Document/Image                  │  (Optional, Full Width)
│  ┌────────────────┐              │
│  │ Choose File    │ [Browse]     │
│  └────────────────┘              │
├──────────────────────────────────┤
│  Year                            │  (Optional, Full Width)
│  ┌────────────────────────────┐  │
│  │ e.g., 2024-2025            │  │
│  └────────────────────────────┘  │
├──────────────────────────────────┤
│  [Save]  [Cancel]                │  (Action Buttons)
└──────────────────────────────────┘
```

---

## Data Flow

### CREATE Flow
```
User Form → POST /api/admin/departments/bsh/[module]
     ↓
API validates → Inserts into bsh_[module] table
     ↓
If file: Stores to /public/uploads/bsh/[module]/
     ↓
Returns new record with id
     ↓
Dashboard clears cache & reloads
     ↓
New record appears at top of table
```

### UPDATE Flow
```
User Form → PUT /api/admin/departments/bsh/[module]?id=X
     ↓
API validates & fetches current record
     ↓
If new file: Deletes old file → Stores new file
     ↓
Updates record in database
     ↓
Returns updated record
     ↓
Dashboard clears cache & reloads
     ↓
Table shows updated data
```

### DELETE Flow
```
User clicks Delete → Confirmation dialog
     ↓
DELETE /api/admin/departments/bsh/[module]?id=X
     ↓
API fetches record → Deletes from database
     ↓
Async: Deletes associated file
     ↓
Returns success
     ↓
Dashboard clears cache & reloads
     ↓
Record disappears from table
```

### READ Flow
```
User navigates to module
     ↓
GET /api/admin/departments/bsh/[module]?page=1
     ↓
API queries bsh_[module] table
     ↓
Returns records with pagination info
     ↓
Dashboard caches data
     ↓
Table renders all records
```

---

## Error Scenarios & Handling

| Scenario | HTTP Status | Error Message | User Action |
|----------|-------------|---------------|-------------|
| Record ID invalid | 400 | Invalid record ID format | Check URL, try again |
| Record not found | 404 | Record not found | Record may be deleted |
| No file uploaded | 400 | No file provided | Upload required file |
| Invalid file type | 400 | Invalid file type | Check file format |
| File too large | 413 | File too large | Upload smaller file |
| Unauthorized | 401 | Unauthorized | Re-login to dashboard |
| Server error | 500 | Internal server error | Contact administrator |

---

## Testing Checklist

For each module, verify:

- [ ] **Title field** is required and validates
- [ ] **URL field** accepts correct file types
- [ ] **Year field** accepts text input
- [ ] **Create** adds new record immediately
- [ ] **Read** displays all records
- [ ] **Update** modifies existing record
- [ ] **Delete** removes record and file
- [ ] **Search** works on title and year
- [ ] **Sort** works on title and year
- [ ] **Pagination** works for multiple records
- [ ] **Cache** clears after each operation
- [ ] **Files** stored in correct directories
- [ ] **File deletion** works on record delete
- [ ] **File replacement** works on update

---

## Configuration Files Reference

| File | Purpose | Lines |
|------|---------|-------|
| `/src/config/module-fields.ts` | Field definitions | 361-437 |
| `/src/app/api/admin/departments/[dept]/[module]/route.ts` | CRUD endpoints | 8-160 (mappings), 250+ (handlers) |
| `/src/app/departments/[dept]/dashboard/page.tsx` | Dashboard UI | 284-297 (module config), 608+ (CRUD handlers) |
| `/src/utils/file-management.ts` | File operations | 14-37 (patterns), 60+ (functions) |

---

## Summary

✅ Three identical database schemas (bsh_syllabus, bsh_photogallery, bsh_fdps)
✅ Three identical form field configurations (title, url, year)
✅ Three complete CRUD implementations with file management
✅ Immediate table refresh after all operations
✅ Proper error handling and validation

