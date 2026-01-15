# CSE-AI Missing Modules - Quick Reference Guide

## Module Overview

Three new field configurations have been added to the CSE-AI department configuration in `/src/config/module-fields.ts`:

### 1. Physical Facilities
- **Route**: `/api/admin/departments/cse-ai/physical-facilities`
- **Table**: `cai_physical_facilities`
- **Key Field**: `title` (Facility Name)

**Fields**:
- `category` (select): Laboratory, Classroom, Infrastructure, Equipment, Library, Computer Lab, Other
- `title` (text): Facility name
- `description` (textarea): Detailed description
- `file_url` (file): Document or image (PDF, JPG, PNG, DOC formats)

**Example Use Case**:
```json
{
  "category": "Computer Lab",
  "title": "Advanced Computer Lab - Block A",
  "description": "High-end computers with latest software and internet connectivity",
  "file_url": "lab_specifications.pdf"
}
```

---

### 2. Handbooks
- **Route**: `/api/admin/departments/cse-ai/handbooks`
- **Table**: `cai_handbooks`
- **Key Field**: `title` (Handbook Title)

**Fields**:
- `title` (text): Handbook title
- `year` (text): Academic year (format: YYYY-YY)
- `semester` (text): Semester information (optional)
- `description` (textarea): Content description
- `file_url` (file): PDF file (PDF format required)

**Example Use Case**:
```json
{
  "title": "CSE-AI Academic Handbook",
  "year": "2024-25",
  "semester": "I",
  "description": "Complete handbook containing course information, academic policies, and student guidelines",
  "file_url": "handbook_2024_25.pdf"
}
```

---

### 3. Department Library
- **Route**: `/api/admin/departments/cse-ai/department-library`
- **Table**: `cai_department_library`
- **Key Field**: `titles` (Number of Titles)

**Fields**:
- `titles` (text): Total number of unique titles
- `volumes` (text): Total number of volumes
- `faculty_incharge` (text): Faculty member's name
- `phone` (text): Contact phone number
- `email` (email): Contact email
- `description` (textarea): Library information
- `image_url` (file): Library photo/image

**Example Use Case**:
```json
{
  "titles": "1500",
  "volumes": "2000",
  "faculty_incharge": "Dr. Ramesh Kumar",
  "phone": "+91 8500 123456",
  "email": "library@cseai.edu.in",
  "description": "Well-equipped library with extensive collection of technical books, journals, and digital resources",
  "image_url": "library_main_view.jpg"
}
```

---

## API Endpoints

### Get Module Structure (Form Fields)
```bash
GET /api/admin/departments/cse-ai/{module}/structure
Authorization: Bearer {token}

# Examples:
GET /api/admin/departments/cse-ai/physical-facilities/structure
GET /api/admin/departments/cse-ai/handbooks/structure
GET /api/admin/departments/cse-ai/department-library/structure
```

### Get All Records
```bash
GET /api/admin/departments/cse-ai/{module}
Authorization: Bearer {token}

# Examples:
GET /api/admin/departments/cse-ai/physical-facilities
GET /api/admin/departments/cse-ai/handbooks
GET /api/admin/departments/cse-ai/department-library
```

### Get Single Record
```bash
GET /api/admin/departments/cse-ai/{module}/{id}
Authorization: Bearer {token}
```

### Create New Record
```bash
POST /api/admin/departments/cse-ai/{module}
Authorization: Bearer {token}
Content-Type: application/json

{
  "field1": "value1",
  "field2": "value2",
  ...
}
```

### Update Record
```bash
PUT /api/admin/departments/cse-ai/{module}/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "field1": "updated_value",
  "field2": "updated_value",
  ...
}
```

### Delete Record
```bash
DELETE /api/admin/departments/cse-ai/{module}/{id}
Authorization: Bearer {token}
```

---

## Search & Sort Features

### Searchable Fields by Module

**Physical Facilities**:
- `title` - Search by facility name
- `category` - Search by facility type
- `description` - Search in description text

**Handbooks**:
- `title` - Search by handbook name
- `year` - Search by academic year

**Department Library**:
- `faculty_incharge` - Search by faculty name
- `titles` - Search by number of titles

### Sortable Fields by Module

**Physical Facilities**:
- `title` - Facility name
- `category` - Facility type
- `created_at` - Creation date

**Handbooks**:
- `title` - Handbook name
- `year` - Academic year
- `created_at` - Creation date

**Department Library**:
- `titles` - Number of titles
- `volumes` - Number of volumes
- `created_at` - Creation date

---

## Editable Fields

**Physical Facilities**:
- category, title, description, file_url

**Handbooks**:
- title, year, semester, description, file_url

**Department Library**:
- titles, volumes, faculty_incharge, phone, email, description, image_url

---

## File Upload Details

### Physical Facilities
- Accepted formats: `.pdf`, `.jpg`, `.jpeg`, `.png`, `.doc`, `.docx`
- Max size: Typically 1MB (configurable)
- Directory: `/uploads/cseai/physical-facilities/`

### Handbooks
- Accepted formats: `.pdf` (PDF only)
- Max size: Typically 1MB (configurable)
- Directory: `/uploads/cseai/handbooks/`

### Department Library
- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Max size: Typically 1MB (configurable)
- Directory: `/uploads/cseai/department-library/`

---

## Integration in Frontend

### Admin Dashboard Usage

```typescript
// Get module structure for form generation
const response = await fetch('/api/admin/departments/cse-ai/physical-facilities/structure', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const fieldConfig = await response.json();

// The fieldConfig will contain all form fields
// Your form generation utility will use this to create the form

// Add new record
await fetch('/api/admin/departments/cse-ai/physical-facilities', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    category: 'Computer Lab',
    title: 'New Lab',
    description: 'Description here',
    file_url: 'upload_file.pdf'
  })
});
```

---

## Configuration Reference

All configurations are defined in: `/src/config/module-fields.ts`

- **Physical Facilities Config**: Lines 1013-1063
- **Handbooks Config**: Lines 1064-1112
- **Department Library Config**: Lines 1113-1193

---

## Verification

To verify the modules are properly configured:

1. **Check API Response**:
   ```bash
   curl -H "Authorization: Bearer TOKEN" \
     http://localhost:9002/api/admin/departments/cse-ai/physical-facilities/structure
   ```

2. **Check Form Fields**:
   The response should contain complete field configurations with labels, types, placeholders, etc.

3. **Test CRUD Operations**:
   - Create a test record
   - Retrieve it
   - Update it
   - Delete it

4. **Check Admin Dashboard**:
   - Navigate to CSE-AI admin dashboard
   - Select the module from sidebar
   - Verify form loads correctly

---

## Troubleshooting

### Module Not Found
- Check that the API route matches: `/api/admin/departments/cse-ai/{module}`
- Verify the module name in URL matches the configuration key

### Form Fields Not Loading
- Check that `/api/admin/departments/cse-ai/{module}/structure` endpoint is called
- Verify authentication token is valid
- Check browser console for errors

### File Upload Failing
- Verify file format is in the accepted list
- Check file size doesn't exceed limit
- Ensure `/uploads/` directory has write permissions

### Database Errors
- Verify table exists in database
- Check field names match configuration
- Ensure MySQL user has proper permissions

---

## Summary

✅ **Physical Facilities**: Fully configured and ready for facility management
✅ **Handbooks**: Fully configured and ready for handbook management
✅ **Department Library**: Fully configured and ready for library information management

All three modules are now fully integrated into the CSE-AI admin system and ready for production use.
