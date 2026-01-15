# Workshops Module - Field Design Documentation

## Overview

The Workshops module in the CSEAI admin dashboard is now fully configured with dynamic fields based on the `cai_workshops` table schema. This document outlines the field structure, types, validation rules, and implementation details.

## Database Schema

### Table: `cai_workshops`

| Field | Type | Null | Key | Default | Extra |
|-------|------|------|-----|---------|-------|
| id | int | No | PRI | NULL | AUTO_INCREMENT |
| category | enum | Yes | | NULL | |
| year | varchar(20) | Yes | | NULL | |
| title | varchar(255) | Yes | | NULL | |
| file_url | text | Yes | | NULL | |
| created_at | timestamp | Yes | | CURRENT_TIMESTAMP | |

## Field Configuration

### 1. Workshop Title
- **Field Name**: `title`
- **Label**: Workshop Title
- **Type**: Text Input
- **Required**: Yes ✓
- **Grid Size**: Full Width
- **Placeholder**: "e.g., Machine Learning Fundamentals"
- **Description**: "Enter the title of the workshop"
- **Validation**: Minimum 1 character
- **Use Case**: Identifies the workshop name displayed in the dashboard

### 2. Category
- **Field Name**: `category`
- **Label**: Category
- **Type**: Select Dropdown
- **Required**: Yes ✓
- **Grid Size**: Half Width (50%)
- **Options**:
  - Internships
  - Conference Publications
  - Certifications
  - Skill Development
  - Industry Training
  - Academic
  - Professional
  - Other
- **Description**: "Select the workshop category"
- **Use Case**: Organizes workshops by type for better filtering

### 3. Year
- **Field Name**: `year`
- **Label**: Year
- **Type**: Text Input
- **Required**: Yes ✓
- **Grid Size**: Half Width (50%)
- **Placeholder**: "e.g., 2024 or 2024-25"
- **Description**: "Enter the academic year"
- **Validation**: Supports both single year (2024) and academic year format (2024-25)
- **Use Case**: Tracks the academic year when the workshop was conducted

### 4. Workshop Document/Brochure
- **Field Name**: `file_url`
- **Label**: Workshop Document/Brochure
- **Type**: File Upload
- **Required**: No (Optional)
- **Grid Size**: Full Width
- **Accepted Formats**: `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`
- **Description**: "Upload workshop document, brochure, or image (PDF, DOC, or Image files)"
- **Max File Size**: Configured in API (typically 50MB)
- **Use Case**: Stores workshop materials, certificates, or promotional images

## Form Layout

The form uses a responsive grid system:

```
┌─────────────────────────────────────┐
│   Workshop Title (Full Width)       │
├──────────────────┬──────────────────┤
│   Category       │   Year           │
│   (Dropdown)     │   (Text Input)   │
├─────────────────────────────────────┤
│   Document Upload (Full Width)      │
│   (File Input)                      │
├─────────────────────────────────────┤
│   [Cancel]  [Save/Update]           │
└─────────────────────────────────────┘
```

### Responsive Breakpoints:
- **Mobile (< 768px)**: All fields stack vertically (full width)
- **Tablet/Desktop (≥ 768px)**: 2-column grid layout (Category & Year side-by-side)

## API Integration

### Field Structure Endpoint

**GET** `/api/admin/departments/cse-ai/workshops/structure`

Returns the complete field configuration:

```json
{
  "success": true,
  "dept": "cse-ai",
  "module": "workshops",
  "tableName": "cai_workshops",
  "displayField": "title",
  "fields": [
    {
      "name": "title",
      "label": "Workshop Title",
      "type": "text",
      "placeholder": "e.g., Machine Learning Fundamentals",
      "required": true,
      "size": "full",
      "description": "Enter the title of the workshop"
    },
    {
      "name": "category",
      "label": "Category",
      "type": "select",
      "required": true,
      "size": "half",
      "options": [
        { "value": "Internships", "label": "Internships" },
        { "value": "Conference Publications", "label": "Conference Publications" },
        ...
      ]
    },
    ...
  ],
  "searchableFields": ["title", "category", "year"],
  "sortableFields": ["title", "category", "year", "created_at"],
  "editableFields": ["title", "category", "year", "file_url"]
}
```

### Data Endpoints

#### GET Records
**GET** `/api/admin/departments/cse-ai/workshops?page=1&limit=10&search=`

#### Create Record
**POST** `/api/admin/departments/cse-ai/workshops`

FormData:
```
title: "Machine Learning Workshop"
category: "Skill Development"
year: "2024-25"
file_url: [File Object] (optional)
```

#### Update Record
**PUT** `/api/admin/departments/cse-ai/workshops/{id}`

#### Delete Record
**DELETE** `/api/admin/departments/cse-ai/workshops/{id}`

## Form Behavior

### Create Mode
- All required fields (title, category, year) must be filled
- File upload is optional
- Form fields are cleared after successful submission
- Success toast notification displays: "Workshop created successfully"

### Edit Mode
- All required fields must remain valid
- File can be replaced (old file deleted, new file saved)
- Form pre-fills with existing record data
- Success toast notification displays: "Workshop updated successfully"

### Validation Rules

| Field | Validation | Error Message |
|-------|-----------|---------------|
| title | Min 1 char | Required |
| category | Must select value | Required |
| year | Min 1 char | Required |
| file_url | Accepted formats only | Must be PDF, DOC, DOCX, JPG, JPEG, or PNG |

## File Upload Management

### Upload Process
1. User selects a file from file input
2. File is validated (format, size)
3. File is uploaded via FormData with other fields
4. Server stores in `/public/uploads/departments/cse-ai/workshops/` directory
5. Database stores relative file path in `file_url` field

### File Cleanup
- Old files are automatically deleted when records are updated with new files
- Files are deleted when workshop records are deleted

### Supported Formats
- **Documents**: PDF, DOC, DOCX
- **Images**: JPG, JPEG, PNG

## Searchable Fields

When searching workshops, the following fields are queried:
- `title` - Workshop name
- `category` - Workshop category/type
- `year` - Academic year

## Sortable Fields

Workshops can be sorted by:
- `title` - Alphabetically by workshop name
- `category` - By workshop type
- `year` - By academic year
- `created_at` - By creation date (newest/oldest)

## Configuration Location

The field configuration is defined in:

**File**: `src/config/module-fields.ts`

```typescript
export const workshopsFieldConfig: ModuleFieldConfig = {
  tableName: 'cai_workshops',
  displayField: 'title',
  fields: [
    // Field definitions here
  ],
  searchableFields: ['title', 'category', 'year'],
  sortableFields: ['title', 'category', 'year', 'created_at'],
  editableFields: ['title', 'category', 'year', 'file_url']
};
```

## Component Integration

### Admin Dashboard
- File: `src/app/departments/[dept]/dashboard/page.tsx`
- Workshops card shows module with Settings icon
- Click to open modal/form for CRUD operations

### API Route
- File: `src/app/api/admin/departments/[dept]/[module]/route.ts`
- Handles GET, POST, PUT, DELETE operations
- Routes requests to `cai_workshops` table

### Structure Endpoint
- File: `src/app/api/admin/departments/[dept]/[module]/structure/route.ts`
- Returns field configuration from `src/config/module-fields.ts`
- Falls back to database schema if config not available

## Example Usage

### Display Workshop in Admin Dashboard

```typescript
// Automatically displayed as a card in the dashboard
// User clicks "Workshops" card → Opens modal with dynamic form
```

### Fetch Field Structure

```typescript
const response = await fetch(
  '/api/admin/departments/cse-ai/workshops/structure',
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);
const config = await response.json();
```

### Submit Workshop Form

```typescript
const formData = new FormData();
formData.append('title', 'Machine Learning Workshop');
formData.append('category', 'Skill Development');
formData.append('year', '2024-25');
formData.append('file_url', fileInputElement.files[0]);

const response = await fetch(
  '/api/admin/departments/cse-ai/workshops',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  }
);
```

## Future Enhancements

1. **Additional Fields**:
   - `start_date` / `end_date` - Date range for workshop
   - `venue` - Location of workshop
   - `resource_person` - Name of facilitator
   - `participants_count` - Number of attendees
   - `participants_type` - Type of participants (students, faculty, etc.)

2. **Gallery Support**:
   - Multiple image uploads for workshop gallery
   - Before/after workshop photos

3. **Advanced Filtering**:
   - Date range filters
   - Participant count range filters
   - Category multi-select filters

4. **Export Functionality**:
   - Export workshops to CSV/Excel
   - Generate workshop reports

## Testing Checklist

- [ ] Create a new workshop with all required fields
- [ ] Create a workshop with optional file upload
- [ ] Edit an existing workshop (change title, category)
- [ ] Replace workshop document/file
- [ ] Delete a workshop
- [ ] Search workshops by title
- [ ] Search workshops by category
- [ ] Sort workshops by title
- [ ] Sort workshops by year
- [ ] Verify responsive layout on mobile/tablet
- [ ] Verify file upload accepts only allowed formats
- [ ] Verify validation messages appear for required fields
- [ ] Verify success/error notifications display correctly
