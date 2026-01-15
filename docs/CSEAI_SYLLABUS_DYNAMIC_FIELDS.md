# CSEAI Admin Dashboard - Syllabus Module Dynamic Fields

## 📊 Database Schema Analysis

### Table: `cai_syllabus`
**Current Columns (from API query):**
- `id` (Primary Key)
- `type` (Regulation type - e.g., R20, R23, V20)
- `title` (Syllabus title/name)
- `fileUrl` (Document URL/path)
- `academic_year` (Academic year - e.g., 2023-24, 2024-25)

**API Endpoint:** `GET /api/cai-syllabus`

---

## 🎯 Dynamic Fields Configuration

### Field 1: **Regulation Type**
```
Name:        type
Label:       Regulation Type
Type:        select (dropdown)
Required:    YES
Size:        half
Placeholder: Select regulation (R20, R23, etc.)
Options:
  - { value: 'R18', label: 'R18' }
  - { value: 'R20', label: 'R20' }
  - { value: 'R23', label: 'R23' }
  - { value: 'V20', label: 'V20' }
Description: Select the SVEC regulation/curriculum version for this syllabus
Default:     'R20'
```

**Rationale:** 
- Dropdown ensures data consistency (no typos)
- Predefined regulation options match SVEC standards
- Required because it's important for categorization
- Half-width allows side-by-side layout with academic_year

---

### Field 2: **Syllabus Title**
```
Name:        title
Label:       Syllabus Title
Type:        text
Required:    YES
Size:        full
Placeholder: e.g., B.Tech CSE-AI - II Year Syllabus
Description: Enter the title or name of the syllabus document
Validation:
  - min: 5 characters
  - max: 200 characters
  - pattern: ^[a-zA-Z0-9\s\-.,()]+$
```

**Rationale:**
- Full-width to accommodate longer titles
- Clear naming improves discoverability
- Validation prevents empty or invalid entries
- Examples help users understand expected format

---

### Field 3: **Academic Year**
```
Name:        academic_year
Label:       Academic Year
Type:        select (dropdown)
Required:    YES
Size:        half
Placeholder: Select academic year
Options:
  - { value: '2023-24', label: '2023-24' }
  - { value: '2024-25', label: '2024-25' }
  - { value: '2025-26', label: '2025-26' }
  - { value: '2026-27', label: '2026-27' }
Description: Select the academic year this syllabus applies to
Default:     '2024-25' (current year)
```

**Rationale:**
- Dropdown ensures consistent formatting (YYYY-YY format)
- Dropdown prevents typos in year entries
- Searchable field for filtering by year
- Current year as default saves user time
- Half-width pairs with regulation type

---

### Field 4: **Syllabus Document**
```
Name:        fileUrl
Label:       Syllabus PDF Document
Type:        file
Required:    YES
Size:        full
Accept:      .pdf, .doc, .docx
Description: Upload the syllabus document (PDF recommended)
Max Size:    ~50MB (handled by FileManager)
Features:
  - Automatic file management (old files deleted)
  - File upload tracking
  - PDF preview support
```

**Rationale:**
- File upload essential for document storage
- PDF + DOC formats cover most syllabus documents
- Full-width for better form layout
- FileManager handles cleanup of old files
- Required because syllabus document is core content

---

## 📋 Complete Field Configuration

### TypeScript Configuration Object

```typescript
'syllabus': {
  tableName: 'cai_syllabus',
  displayField: 'title',
  fields: [
    {
      name: 'type',
      label: 'Regulation Type',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the SVEC regulation/curriculum version',
      options: [
        { value: 'R18', label: 'R18' },
        { value: 'R20', label: 'R20' },
        { value: 'R23', label: 'R23' },
        { value: 'V20', label: 'V20' }
      ]
    },
    {
      name: 'title',
      label: 'Syllabus Title',
      type: 'text',
      placeholder: 'e.g., B.Tech CSE-AI - II Year Syllabus',
      required: true,
      size: 'full',
      description: 'Enter the title or name of the syllabus document',
      validation: {
        min: 5,
        max: 200,
        pattern: '^[a-zA-Z0-9\\s\\-.,()]+$',
        message: 'Title must be 5-200 characters, alphanumeric with basic punctuation'
      }
    },
    {
      name: 'academic_year',
      label: 'Academic Year',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the academic year this syllabus applies to',
      options: [
        { value: '2023-24', label: '2023-24' },
        { value: '2024-25', label: '2024-25' },
        { value: '2025-26', label: '2025-26' },
        { value: '2026-27', label: '2026-27' }
      ]
    },
    {
      name: 'fileUrl',
      label: 'Syllabus PDF Document',
      type: 'file',
      required: true,
      size: 'full',
      accept: '.pdf,.doc,.docx',
      description: 'Upload the syllabus document (PDF, DOC, or DOCX format). Old files are automatically managed.'
    }
  ],
  searchableFields: ['title', 'type', 'academic_year'],
  sortableFields: ['title', 'type', 'academic_year', 'created_at'],
  editableFields: ['type', 'title', 'academic_year', 'fileUrl']
}
```

---

## 📊 Form Layout & Display

### Admin Add/Edit Form Layout

```
┌─────────────────────────────────────────────┐
│  CSEAI Syllabus Form                        │
├─────────────────────────────────────────────┤
│                                             │
│  Regulation Type    │  Academic Year        │
│  [R20 ▼           │  [2024-25 ▼           │
│                                             │
├─────────────────────────────────────────────┤
│  Syllabus Title                             │
│  [B.Tech CSE-AI - II Year Syllabus........] │
│  (Help: Enter the title or name)            │
│                                             │
├─────────────────────────────────────────────┤
│  Syllabus PDF Document                      │
│  [Choose File] syllabus_v20_2024-25.pdf    │
│  (Help: Upload the syllabus document)       │
│                                             │
├─────────────────────────────────────────────┤
│  [Cancel] [Save]                            │
└─────────────────────────────────────────────┘
```

### Public View (List Display)

```
┌───────────────────────────────────────────────────────┐
│  Syllabi                                              │
├───────────────────────────────────────────────────────┤
│ 📄 B.Tech CSE-AI - II Year Syllabus                   │
│    Regulation: R20 | Academic Year: 2024-25          │
│    [Download PDF]                                     │
│                                                       │
│ 📄 B.Tech CSE-AI - III Year Syllabus                  │
│    Regulation: R20 | Academic Year: 2024-25          │
│    [Download PDF]                                     │
│                                                       │
│ 📄 B.Tech CSE-AI - IV Year Syllabus                   │
│    Regulation: R20 | Academic Year: 2024-25          │
│    [Download PDF]                                     │
└───────────────────────────────────────────────────────┘
```

---

## 🔗 API Integration

### GET Endpoint
**URL:** `GET /api/cai-syllabus`

**Response Format:**
```json
[
  {
    "id": 1,
    "type": "R20",
    "title": "B.Tech CSE-AI - II Year Syllabus",
    "fileUrl": "/uploads/syllabi/cai_r20_2024-25_v2.pdf",
    "academic_year": "2024-25"
  },
  {
    "id": 2,
    "type": "R20",
    "title": "B.Tech CSE-AI - III Year Syllabus",
    "fileUrl": "/uploads/syllabi/cai_r20_2024-25_v3.pdf",
    "academic_year": "2024-25"
  }
]
```

### PUT Endpoint (Update)
**URL:** `PUT /api/cai-syllabus?id=1`

**Request Body:**
```json
{
  "type": "R23",
  "title": "B.Tech CSE-AI - Updated Syllabus",
  "academic_year": "2025-26",
  "fileUrl": "/uploads/syllabi/new_file.pdf"
}
```

**Features:**
- Automatic file replacement (old files deleted)
- Only specified fields updated
- FileManager cleanup handled automatically

### DELETE Endpoint
**URL:** `DELETE /api/cai-syllabus?id=1`

**Features:**
- Removes database record
- Automatically deletes associated files
- FileManager cleanup performed

---

## 📌 Form Validation Rules

### Field: `type` (Regulation Type)
- **Validation Type:** Enum/Whitelist
- **Valid Values:** R18, R20, R23, V20
- **Error Message:** "Please select a valid regulation type"
- **Database Constraint:** NOT NULL

### Field: `title` (Syllabus Title)
- **Validation Type:** Text with pattern
- **Rules:**
  - Minimum length: 5 characters
  - Maximum length: 200 characters
  - Allowed characters: A-Z, a-z, 0-9, spaces, hyphens, periods, commas, parentheses
- **Example Valid:** "B.Tech CSE-AI - II Year Syllabus (R20)"
- **Example Invalid:** "" (empty), "123" (too short), "Syllabus@Special#Char"
- **Error Message:** "Title must be 5-200 characters with alphanumeric and basic punctuation"

### Field: `academic_year` (Academic Year)
- **Validation Type:** Enum/Whitelist
- **Valid Values:** 2023-24, 2024-25, 2025-26, 2026-27
- **Format:** YYYY-YY (4-digit year, hyphen, 2-digit year)
- **Error Message:** "Please select a valid academic year"
- **Database Constraint:** NOT NULL

### Field: `fileUrl` (File Upload)
- **Validation Type:** File type & size
- **Accepted Types:** .pdf, .doc, .docx
- **Max Size:** 50MB (system limit)
- **File Name Format:** Auto-sanitized by FileManager
- **Error Messages:**
  - "File type not supported. Please upload PDF, DOC, or DOCX"
  - "File size exceeds 50MB limit"
  - "File upload failed. Please try again"
- **Database Constraint:** NOT NULL

---

## 🔍 Search & Filter Capabilities

### Searchable Fields
1. **title** - Search by syllabus name
   - Example: User searches "II Year" → finds "B.Tech CSE-AI - II Year Syllabus"

2. **type** - Filter by regulation
   - Example: Filter "R20" → shows all R20 regulation syllabi

3. **academic_year** - Filter by year
   - Example: Filter "2024-25" → shows syllabi for that year

### Sortable Fields
1. **title** (A-Z)
2. **type** (R18 → R23)
3. **academic_year** (oldest → newest)
4. **created_at** (newest → oldest)

---

## 📝 Admin Operations

### CREATE (Add New Syllabus)
1. Admin clicks "Add Syllabus" button
2. Form displays with fields:
   - Regulation Type: [R20 dropdown]
   - Syllabus Title: [text input]
   - Academic Year: [2024-25 dropdown]
   - Syllabus PDF Document: [file upload]
3. Admin fills all required fields (marked with *)
4. Admin clicks "Save"
5. FileManager stores file, database record created
6. Success message: "Syllabus added successfully"

### READ (View Syllabi)
1. Admin opens Syllabus module
2. Table displays all syllabi with columns:
   - Regulation | Title | Year | Actions
3. Admin can sort by any column
4. Admin can search by title or type
5. Admin can filter by year

### UPDATE (Edit Syllabus)
1. Admin clicks "Edit" on syllabus row
2. Form pre-populates with current data:
   - Type: R20 (pre-selected)
   - Title: [current title]
   - Year: 2024-25 (pre-selected)
   - File: [current file with option to replace]
3. Admin modifies fields
4. Admin clicks "Save"
5. If new file uploaded:
   - Old file automatically deleted by FileManager
   - New file stored
6. Success message: "Syllabus updated successfully"

### DELETE (Remove Syllabus)
1. Admin clicks "Delete" on syllabus row
2. Confirmation dialog appears: "Delete this syllabus?"
3. Admin confirms
4. FileManager deletes associated files
5. Database record deleted
6. Success message: "Syllabus deleted successfully"

---

## 🎨 UI/UX Considerations

### Field Grouping
- **Row 1 (Half-width fields):** Regulation Type + Academic Year
  - Both dropdowns, easier scanning
  - Same visual weight
  
- **Row 2 (Full-width field):** Syllabus Title
  - Title is most important
  - Full width emphasizes importance
  
- **Row 3 (Full-width field):** File Upload
  - Separate from text fields
  - Full width for better drag-and-drop experience

### Visual Hierarchy
- **Required Fields:** Marked with red asterisk (*)
- **Help Text:** Smaller gray text below each field
- **Error Messages:** Red text, appears when validation fails
- **Success Messages:** Green banner at top

### Mobile Responsiveness
- On mobile: All fields stack vertically (full-width)
- On tablet: Maintain half-width grouping
- On desktop: Optimized layout as shown above

---

## 📦 Implementation Checklist

### Phase 1: Configuration
- [ ] Add syllabus field config to `/src/config/module-fields.ts`
- [ ] Update MODULES_FIELD_CONFIG for 'cse-ai' department
- [ ] Verify TypeScript types compile correctly

### Phase 2: Frontend Components
- [ ] Create/Update form component to render dynamic fields
- [ ] Implement field validation on client-side
- [ ] Add file upload preview
- [ ] Test add/edit/delete operations

### Phase 3: Backend Integration
- [ ] Verify `/api/cai-syllabus` GET endpoint works
- [ ] Verify PUT endpoint updates all fields
- [ ] Verify DELETE endpoint removes files
- [ ] Test error handling

### Phase 4: Admin Dashboard
- [ ] Add "Syllabus" link to CSEAI admin sidebar
- [ ] Implement list view with search/filter/sort
- [ ] Implement add form
- [ ] Implement edit form
- [ ] Implement delete confirmation

### Phase 5: Testing
- [ ] Add new syllabus with all fields
- [ ] Edit syllabus (change file, title, year)
- [ ] Delete syllabus (verify file deletion)
- [ ] Search by title/type/year
- [ ] Sort by each field
- [ ] Verify file downloads work

---

## 🔗 Related Configuration

### Module-Fields.ts Path
- **Location:** `/src/config/module-fields.ts`
- **Lines:** 801-856 (current old config, will be replaced)
- **Department:** 'cse-ai'
- **Module Key:** 'syllabus'

### API Endpoint Path
- **File:** `/src/pages/api/cai-syllabus.ts`
- **Methods:** GET, PUT, DELETE
- **Database:** `cai_syllabus`

### Table Columns
- **id** - Primary key (auto-increment)
- **type** - Regulation type (VARCHAR)
- **title** - Syllabus title (VARCHAR)
- **fileUrl** - File path/URL (VARCHAR)
- **academic_year** - Academic year (VARCHAR)

---

## 💡 Notes for Implementation

1. **Default Academic Year:** Consider setting "2024-25" as default in dropdown
2. **File Management:** FileManager class handles all cleanup automatically
3. **Regulations:** Can be extended with new regulations (R24, etc.) without code changes
4. **Display Field:** 'title' is the display field in list views
5. **Sorting:** API already returns ordered by ID ASC, but client should allow sort
6. **Limit:** API limits to 50 records (can be removed if more needed)

---

## ✅ Summary

**Module:** CSEAI Syllabus  
**Table:** `cai_syllabus`  
**Dynamic Fields:** 4 (Type, Title, Academic Year, File)  
**Configuration Type:** Simple admin CRUD  
**Primary Display:** Syllabus Title  
**Key Features:**
- ✅ Dropdown for consistent data entry
- ✅ File upload with automatic cleanup
- ✅ Search and filter capabilities
- ✅ Full CRUD operations
- ✅ Responsive form layout

This configuration is ready for implementation in the admin dashboard!