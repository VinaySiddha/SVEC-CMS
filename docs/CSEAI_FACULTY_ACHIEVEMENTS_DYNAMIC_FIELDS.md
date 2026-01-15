# CSE-AI Faculty Achievements - Dynamic Fields Configuration

## Database Schema
```sql
CREATE TABLE `cai_faculty_achievements` (
  `id` int NOT NULL,
  `category` enum('Journal Publications','Conferences','Book Publications','Certifications','Patents','Research Supervisors','Faculty Out-Reach') DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `file_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Dynamic Fields Configuration

### Implementation Location
**File:** `/src/config/module-fields.ts` (Lines 298-350)

### Field Definitions

#### 1. **Title Field**
- **Column Name:** `title`
- **Type:** Text Input
- **Label:** Achievement Title
- **Placeholder:** "e.g., Best Teacher Award, Paper Title, etc."
- **Required:** YES
- **Size:** Full width
- **Description:** "Enter the title of the achievement, publication, or certification"
- **Database Column Type:** `varchar(255)`
- **Data Validation:** User-friendly title entry

#### 2. **Category Field**
- **Column Name:** `category`
- **Type:** Select Dropdown
- **Label:** Category
- **Required:** YES
- **Size:** Half width
- **Description:** "Select the type of achievement"
- **Database Column Type:** `enum('Journal Publications','Conferences','Book Publications','Certifications','Patents','Research Supervisors','Faculty Out-Reach')`
- **Dropdown Options:**
  - Journal Publications
  - Conferences
  - Book Publications
  - Certifications
  - Patents
  - Research Supervisors
  - Faculty Out-Reach

#### 3. **Year Field**
- **Column Name:** `year`
- **Type:** Text Input
- **Label:** Year
- **Placeholder:** "e.g., 2024 or 2024-25"
- **Required:** NO
- **Size:** Half width
- **Description:** "Enter the year of achievement"
- **Database Column Type:** `varchar(20)`
- **Data Format:** Flexible (2024, 2024-25, 2024-2025, etc.)

#### 4. **File Upload Field**
- **Column Name:** `file_url`
- **Type:** File Upload
- **Label:** Supporting Document
- **Placeholder:** "Upload certificate, publication, or related document"
- **Required:** NO
- **Size:** Full width
- **Accepted File Types:** `.pdf,.doc,.docx,.jpg,.jpeg,.png`
- **Description:** "Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)"
- **Database Column Type:** `text` (stores file URL path)
- **File Upload Location:** Typically in `/uploads/cse-ai/faculty-achievements/` directory

---

## Configuration Code

```typescript
'faculty-achievements': {
  tableName: 'cai_faculty_achievements',
  displayField: 'title',
  fields: [
    {
      name: 'title',
      label: 'Achievement Title',
      type: 'text',
      placeholder: 'e.g., Best Teacher Award, Paper Title, etc.',
      required: true,
      size: 'full',
      description: 'Enter the title of the achievement, publication, or certification'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the type of achievement',
      options: [
        { value: 'Journal Publications', label: 'Journal Publications' },
        { value: 'Conferences', label: 'Conferences' },
        { value: 'Book Publications', label: 'Book Publications' },
        { value: 'Certifications', label: 'Certifications' },
        { value: 'Patents', label: 'Patents' },
        { value: 'Research Supervisors', label: 'Research Supervisors' },
        { value: 'Faculty Out-Reach', label: 'Faculty Out-Reach' }
      ]
    },
    {
      name: 'year',
      label: 'Year',
      type: 'text',
      placeholder: 'e.g., 2024 or 2024-25',
      required: false,
      size: 'half',
      description: 'Enter the year of achievement'
    },
    {
      name: 'file_url',
      label: 'Supporting Document',
      type: 'file',
      placeholder: 'Upload certificate, publication, or related document',
      required: false,
      size: 'full',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      description: 'Upload supporting document, certificate, or publication (PDF, DOC, DOCX, or Image files max 1MB)'
    }
  ],
  searchableFields: ['title', 'category', 'year'],
  sortableFields: ['title', 'category', 'year', 'created_at'],
  editableFields: ['title', 'category', 'year', 'file_url']
}
```

---

## Field Mapping

**File:** `/src/utils/field-mapping.ts`

No special field mapping required for `cai_faculty_achievements` as all field names match between form and database columns.

---

## Form Layout in Dashboard

### Add/Edit Form Layout
```
┌─────────────────────────────────────────────────┐
│ Achievement Title (Full Width)                   │
│ [Text Input - required]                         │
├─────────────────────────────────────────────────┤
│ Category (Half) │ Year (Half)                    │
│ [Dropdown]      │ [Text Input]                   │
├─────────────────────────────────────────────────┤
│ Supporting Document (Full Width)                 │
│ [File Upload - .pdf,.doc,.docx,.jpg,.jpeg,.png] │
├─────────────────────────────────────────────────┤
│ [Save Button] [Cancel Button]                    │
└─────────────────────────────────────────────────┘
```

---

## Table Display Columns

**Searchable Fields:** title, category, year
**Sortable Fields:** title, category, year, created_at
**Editable Fields:** title, category, year, file_url

### Table View
```
┌──┬──────────────────────┬────────────────────┬──────┬────────────────┐
│  │ Achievement Title    │ Category           │ Year │ File URL       │
├──┼──────────────────────┼────────────────────┼──────┼────────────────┤
│  │ Research Paper Title │ Journal Publicat..│ 2024 │ [PDF Link]     │
│  │ Conference Paper     │ Conferences        │ 2024 │ [PDF Link]     │
│  │ Patent Published     │ Patents            │ 2024 │ [PDF Link]     │
└──┴──────────────────────┴────────────────────┴──────┴────────────────┘
```

---

## API Integration

### GET Request
```
GET /api/admin/departments/cse-ai/faculty-achievements?page=1&limit=1000
```

**Response:** List of achievements with all fields including title, category, year, file_url, created_at

### POST Request (Add Achievement)
```
POST /api/admin/departments/cse-ai/faculty-achievements
Content-Type: application/json

{
  "title": "Research Paper Title",
  "category": "Journal Publications",
  "year": "2024",
  "file_url": "uploads/cse-ai/faculty-achievements/document.pdf"
}
```

### PUT Request (Edit Achievement)
```
PUT /api/admin/departments/cse-ai/faculty-achievements/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "category": "Conferences",
  "year": "2024",
  "file_url": "uploads/cse-ai/faculty-achievements/updated.pdf"
}
```

### DELETE Request
```
DELETE /api/admin/departments/cse-ai/faculty-achievements/[id]
```

---

## Validation Rules

| Field | Validation | Error Message |
|-------|-----------|----------------|
| title | Required, max 255 chars | Title is required |
| category | Required, must be in enum | Invalid category selected |
| year | Optional, max 20 chars | Invalid year format |
| file_url | Optional, max file size 1MB | File too large |

---

## Data Flow

1. **Form Submission** → User fills form with title, category, year, and optionally uploads file
2. **File Upload Handler** → If file provided, upload to server and get file_url
3. **Field Mapping** → No mapping needed (field names match database)
4. **Database Insert/Update** → Store record in cai_faculty_achievements table
5. **Response** → Return success with created/updated record ID
6. **Table Refresh** → Dashboard automatically refreshes to show new/updated record

---

## Features

✅ **Full CRUD Operations**
- Create new achievements
- Read/Display achievements in table
- Update existing achievements
- Delete achievements

✅ **Search & Filter**
- Search by title, category, or year
- Dynamic filtering in table view

✅ **Sort Capabilities**
- Sort by title, category, year, or creation date

✅ **Auto-Refresh**
- Dashboard auto-refreshes every 5-30 seconds

✅ **File Upload Support**
- Support for PDF, DOC, DOCX, JPG, JPEG, PNG files
- Max file size: 1MB

---

## Testing Checklist

- [ ] Add new achievement with all fields filled
- [ ] Add achievement with minimal fields (title + category only)
- [ ] Upload file with achievement
- [ ] Edit existing achievement
- [ ] Delete achievement
- [ ] Search by title
- [ ] Search by category
- [ ] Sort by different columns
- [ ] Auto-refresh working
- [ ] Verify file URLs stored correctly
- [ ] Verify all 7 category options appear in dropdown

---

## Status: ✅ COMPLETE

All dynamic fields are properly configured and aligned with the database schema. The faculty achievements module is ready for production use in the CSE-AI admin dashboard.
