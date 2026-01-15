# BSH Dynamic Fields Configuration - Updated

## Overview
Updated the dynamic field configurations for the three BSH modules to match the actual database schemas. The tables are simpler than initially configured and only contain: `id`, `title`, `url`, and `year` columns.

## Database Schemas

### bsh_syllabus
```sql
CREATE TABLE `bsh_syllabus` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### bsh_photogallery
```sql
CREATE TABLE `bsh_photogallery` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### bsh_fdps
```sql
CREATE TABLE `bsh_fdps` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Updated Field Configurations

### 1. Syllabus Module
**File**: `/src/config/module-fields.ts` (Lines 361-385)

**Fields**:
- **title** (required)
  - Type: Text input
  - Label: "Syllabus Title"
  - Placeholder: "e.g., Engineering Physics I"
  - Description: "Enter the course or syllabus title"
  - Size: Full width

- **url** (optional)
  - Type: File upload
  - Label: "Syllabus Document"
  - Accepted formats: PDF, DOC, DOCX
  - Description: "Upload syllabus document"
  - Size: Full width

- **year** (optional)
  - Type: Text input
  - Label: "Year"
  - Placeholder: "e.g., 2024-2025 or 2024"
  - Description: "Enter the year or academic year"
  - Size: Full width

**Searchable Fields**: title, year
**Sortable Fields**: title, year
**Editable Fields**: title, url, year

---

### 2. Photo Gallery Module
**File**: `/src/config/module-fields.ts` (Lines 387-411)

**Fields**:
- **title** (required)
  - Type: Text input
  - Label: "Photo/Event Title"
  - Placeholder: "e.g., Annual Science Exhibition 2024"
  - Description: "Enter the title of the photo or event"
  - Size: Full width

- **url** (optional)
  - Type: File upload
  - Label: "Photo/Image"
  - Accepted formats: JPG, JPEG, PNG, GIF, WebP
  - Description: "Upload photo/image"
  - Size: Full width

- **year** (optional)
  - Type: Text input
  - Label: "Year"
  - Placeholder: "e.g., 2024-2025 or 2024"
  - Description: "Enter the year of the photo/event"
  - Size: Full width

**Searchable Fields**: title, year
**Sortable Fields**: title, year
**Editable Fields**: title, url, year

---

### 3. FDP/Programs Module
**File**: `/src/config/module-fields.ts` (Lines 413-437)

**Fields**:
- **title** (required)
  - Type: Text input
  - Label: "FDP/Program Title"
  - Placeholder: "e.g., Advanced Teaching Methodologies Workshop"
  - Description: "Enter the title of the FDP, workshop, or guest lecture"
  - Size: Full width

- **url** (optional)
  - Type: File upload
  - Label: "Program Document/Link"
  - Accepted formats: PDF, DOC, DOCX, TXT
  - Description: "Upload program document or details"
  - Size: Full width

- **year** (optional)
  - Type: Text input
  - Label: "Year"
  - Placeholder: "e.g., 2024-2025 or 2024"
  - Description: "Enter the year or academic year"
  - Size: Full width

**Searchable Fields**: title, year
**Sortable Fields**: title, year
**Editable Fields**: title, url, year

---

## Configuration Structure

Each module configuration includes:

```typescript
'moduleName': {
  tableName: 'bsh_modulename',           // Database table name
  displayField: 'title',                 // Field to display in lists
  fields: [                              // Form field definitions
    {
      name: 'fieldname',                 // Database column name
      label: 'Field Label',              // Display label
      type: 'text|file|textarea|etc',    // Input type
      required: true|false,              // Mandatory field
      size: 'full|half|third',           // Form width
      placeholder: 'Example...',         // Input placeholder
      accept: '.ext',                    // File type restrictions
      description: 'Help text'           // Field description
    }
  ],
  searchableFields: ['field1', 'field2'],   // Fields for search
  sortableFields: ['field1', 'field2'],     // Fields for sorting
  editableFields: ['field1', 'field2']      // Fields user can edit
}
```

## File Management

### File Upload & Storage
- Files uploaded to `url` field are stored in: `/public/uploads/bsh/[module]/`
- Supported file types are defined in the `accept` property
- Files are automatically managed:
  - On CREATE: New file stored
  - On UPDATE: Old file deleted, new file stored
  - On DELETE: Associated file deleted

### File Field Detection
The system detects and manages files using these field name patterns:
- Snake case: `file_url`, `document_url`, `pdf_url`, `image_url`, etc.
- Camel case: `fileUrl`, `imageUrl`, `url`, `documentUrl`, etc.

The `url` field in BSH tables is detected as a file field and managed automatically.

## CRUD Operations

### Create
1. User fills form with required fields (title)
2. Optionally uploads file to `url` field
3. Optionally enters `year`
4. Record inserted with auto-increment `id`
5. File stored if provided

### Read
1. System displays records in table format
2. Table columns: id, title, url (as download link), year
3. Searchable by: title, year
4. Sortable by: title, year

### Update
1. User modifies any editable field
2. Can replace uploaded file
3. Old file deleted before update
4. New file stored if provided

### Delete
1. Record deleted from database
2. Associated file in `url` field automatically deleted
3. Total record count decremented

## Form Layout

All three modules use **full-width single column layout**:
```
┌─────────────────────────────┐
│  Title                      │ (Full width)
├─────────────────────────────┤
│  File Upload                │ (Full width)
├─────────────────────────────┤
│  Year                       │ (Full width)
├─────────────────────────────┤
│  [Save] [Cancel]            │
└─────────────────────────────┘
```

## Implementation Complete

✅ All field configurations updated to match database schemas
✅ No unnecessary fields added
✅ File management integrated for all three modules
✅ Search and sort functionality enabled
✅ Simplified form layout
✅ Type-safe field definitions

## Testing Checklist

For each module (syllabus, photogallery, fdps):

- [ ] **Title field** displays correctly as text input
- [ ] **URL field** displays as file upload with correct file type filters
- [ ] **Year field** displays as text input with placeholder
- [ ] **Required validation** works on title field
- [ ] **File upload** works and stores files correctly
- [ ] **File deletion** happens when record is deleted
- [ ] **File replacement** works on update
- [ ] **Search** works on title and year fields
- [ ] **Sort** works on title and year fields
- [ ] **Table display** shows all columns: id, title, url link, year

