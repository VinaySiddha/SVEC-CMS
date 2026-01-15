# Admin Dashboard - MySQL Data Fetching & Display Guide

## Overview

Your admin dashboard is **fully configured to fetch and display data from MySQL tables**. The system automatically handles:
- ✅ Data fetching from database
- ✅ Dynamic table rendering
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ File uploads and management
- ✅ Caching for performance
- ✅ Pagination and sorting

## How Data Flows From MySQL to UI

### 1. **Data Fetching Process** (`loadModuleData` function)

```
User selects module
    ↓
Dashboard requests structure: GET /api/admin/departments/[dept]/[module]/structure
    ↓
API returns table schema + field configuration from getModuleFieldConfig()
    ↓
Dashboard requests data: GET /api/admin/departments/[dept]/[module]
    ↓
API executes: SELECT * FROM [table_name] WITH PAGINATION
    ↓
Data is cached (5-minute duration) for performance
    ↓
Table is rendered with fetched data
```

### 2. **Structure Endpoint** (`/api/admin/departments/[dept]/[module]/structure`)

**File**: `src/app/api/admin/departments/[dept]/[module]/structure/route.ts`

Returns table structure and field configuration:
- Table column definitions (Field, Type, Null, Key, Extra)
- Field labels and placeholders from `module-fields.ts`
- File upload configuration
- Field validation rules
- Display and editable field lists

**Example Response**:
```json
{
  "success": true,
  "source": "config",
  "dept": "cst",
  "module": "mous",
  "tableName": "cst_mous",
  "displayField": "mou_with",
  "fields": [
    {
      "name": "mou_with",
      "label": "Organization/Institute",
      "type": "text",
      "required": true,
      "size": "full"
    },
    {
      "name": "file_url",
      "label": "MOU Document",
      "type": "file",
      "required": false,
      "accept": ".pdf,.doc,.docx"
    }
  ]
}
```

### 3. **Data Fetch Endpoint** (`/api/admin/departments/[dept]/[module]`)

**File**: `src/app/api/admin/departments/[dept]/[module]/route.ts`

Handles data retrieval with pagination:
- GET: Fetch paginated data
- POST: Create new record
- PUT/PATCH: Update record
- DELETE: Delete record

**Query Parameters**:
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 100, max: 1000)
- `search` - Search query for searchable fields

**Example Response**:
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "mou_with": "IIT Delhi",
        "from_date": "2024-01-15",
        "to_date": "2026-01-14",
        "status": "Till Date",
        "file_url": "/uploads/cst/mous/document_123.pdf",
        "created_at": "2024-11-25T10:30:00Z"
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 100,
    "totalPages": 1
  }
}
```

### 4. **Table Rendering** (Dashboard UI)

**File**: `src/app/departments/[dept]/dashboard/page.tsx`

Renders data in a dynamic table:
```tsx
<table className="w-full">
  <thead>
    <tr>
      {tableColumns
        .filter(col => !['created_at', 'updated_at'].includes(col.Field))
        .slice(0, 5)  // Show first 5 columns
        .map(col => (
          <th key={col.Field}>{col.Field}</th>
        ))}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {moduleData.map(item => (
      <tr key={item.id}>
        {/* Render columns */}
        <td>{item.field_value}</td>
        {/* Edit/Delete buttons */}
      </tr>
    ))}
  </tbody>
</table>
```

## Currently Supported CST Modules

All of these modules fetch data from their respective MySQL tables:

### Faculty & Staff
- ✅ **Faculty** → `cst_faculty`
- ✅ **Technical Faculty** → `cst_technical_faculty`
- ✅ **Non-Teaching Faculty** → `cst_non_teaching_faculty`

### Academic Documents
- ✅ **Handbooks** → `cst_handbooks`
- ✅ **Syllabus** → `cst_syllabus`
- ✅ **E-Resources** → `cst_eresources`

### Achievements & Activities
- ✅ **Student Achievements** → `cst_student_achievements`
- ✅ **Faculty Achievements** → `cst_faculty_achievements`
- ✅ **Placements** → `cst_placements`
- ✅ **Hackathons** → `cst_hackathons`
- ✅ **Workshops** → `cst_workshops`
- ✅ **Training Activities** → `cst_training_activities`
- ✅ **Extra-Curricular** → `cst_extra_curricular`

### Organizational
- ✅ **MOUs** → `cst_mous` (with file upload support)
- ✅ **Industry Programs** → `cst_industry_programs` (with file upload support)
- ✅ **Merit Scholarships** → `cst_merit_scholarships`
- ✅ **BOS Members** → `cst_bos_members`
- ✅ **BOS Minutes** → `cst_bos_minutes`

### Facilities & Resources
- ✅ **Department Library** → `cst_department_library`
- ✅ **Physical Facilities** → `cst_physical_facilities`
- ✅ **Gate Data** → `cst_gate`

## Data Display Features

### 1. **Smart Column Display**
- Shows first 5 columns in table (scrollable)
- Skips system columns (id, created_at, updated_at, deleted_at)
- Uses field configuration labels from `module-fields.ts`

### 2. **Data Formatting**
- Dates: Converted to readable format (e.g., "11/25/2024")
- IDs: Prefixed with # (e.g., "#123")
- Long text: Truncated to 100 chars with "..."
- Bold for title/name fields
- Gray text for other data

### 3. **Caching**
- 5-minute cache duration for performance
- Auto-refresh every 30 seconds (optional)
- Manual refresh button available
- Cache clears on create/update/delete operations

### 4. **Pagination**
- Default: 100 records per page
- Maximum: 1000 records per page
- Navigation buttons for previous/next pages
- Shows total records and page information

## File Upload Support

### Modules with File Upload
1. **MOUs** - Upload MOU documents
   - Field: `file_url`
   - Accepted: PDF, DOC, DOCX, Images
   - Storage: `/uploads/cst/mous/`

2. **Industry Programs** - Upload program documents
   - Field: `file_url`
   - Accepted: PDF, DOC, DOCX, Images
   - Storage: `/uploads/cst/industry-programs/`

3. **Workshops** - Can add file fields for workshop materials

### File Upload Process
```
User uploads file in form
    ↓
File validated (type, size max 5MB)
    ↓
File sent to: POST /api/admin/departments/cst/[module]/upload
    ↓
Server stores file in /uploads/cst/[module]/
    ↓
File URL returned and stored in database field
    ↓
File appears as link in table and form
```

## CRUD Operations Flow

### Create (POST)
```
User fills form → Click "Save"
    ↓
Data validated against field configuration
    ↓
POST /api/admin/departments/cst/[module]
    ↓
INSERT INTO [table_name] VALUES (...)
    ↓
Cache cleared, table refreshes
    ↓
Success notification shown
```

### Read (GET)
```
User selects module
    ↓
GET /api/admin/departments/cst/[module]?page=1
    ↓
SELECT * FROM [table_name] LIMIT 100
    ↓
Results rendered in table
    ↓
Cached for 5 minutes
```

### Update (PUT)
```
User clicks Edit → Modifies fields → Click "Save"
    ↓
Data validated
    ↓
PUT /api/admin/departments/cst/[module]?id=123
    ↓
UPDATE [table_name] SET ... WHERE id=123
    ↓
Cache cleared, table refreshes
    ↓
Success notification shown
```

### Delete (DELETE)
```
User clicks Delete → Confirms
    ↓
DELETE /api/admin/departments/cst/[module]?id=123
    ↓
DELETE FROM [table_name] WHERE id=123
    ↓
Associated files deleted (if any)
    ↓
Cache cleared, table refreshes
    ↓
Success notification shown
```

## Configuration Files

### 1. **Module Field Configuration**
**File**: `src/config/module-fields.ts`

Defines for each module:
- Table name
- Display field (used to show in lists)
- Field definitions (name, label, type, required, placeholder, etc.)
- Searchable fields
- Sortable fields
- Editable fields

**Example for CST MOUs**:
```typescript
'mous': {
  tableName: 'cst_mous',
  displayField: 'mou_with',
  fields: [
    {
      name: 'mou_with',
      label: 'Organization/Institute',
      type: 'text',
      required: true,
      size: 'full'
    },
    {
      name: 'file_url',
      label: 'MOU Document',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.doc,.docx'
    }
  ],
  searchableFields: ['mou_with', 'status'],
  sortableFields: ['mou_with', 'from_date', 'to_date'],
  editableFields: ['mou_with', 'from_date', 'to_date', 'status', 'file_url']
}
```

### 2. **API Routes Mapping**
**File**: `src/app/api/admin/departments/[dept]/[module]/route.ts`

Maps module names to table names:
```typescript
'cst': {
  'mous': 'cst_mous',
  'faculty': 'cst_faculty',
  'workshops': 'cst_workshops',
  // ... more mappings
}
```

### 3. **Dashboard Module Configuration**
**File**: `src/app/departments/[dept]/dashboard/page.tsx`

Defines available modules for each department:
```typescript
'cst': [
  { key: 'mous', name: 'MOUs', icon: FileText, description: '...' },
  { key: 'faculty', name: 'Faculty', icon: Users, description: '...' },
  { key: 'workshops', name: 'Workshops', icon: Settings, description: '...' },
  // ... more modules
]
```

## Database Table Requirements

Each module requires a MySQL table with:
- `id` - PRIMARY KEY AUTO_INCREMENT
- `created_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP (auto-created)
- `updated_at` - TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE (auto-updated)
- Module-specific fields defined in `module-fields.ts`

Example for MOUs:
```sql
CREATE TABLE cst_mous (
  id INT PRIMARY KEY AUTO_INCREMENT,
  mou_with VARCHAR(255) NOT NULL,
  from_date VARCHAR(20) NOT NULL,
  to_date VARCHAR(20) NOT NULL,
  status VARCHAR(50),
  file_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Problem: "Invalid department or module" Error
**Solution**: Check that the module key exists in:
1. `DEPARTMENT_MODULES` in structure route
2. `DEPARTMENT_MODULES` in main data route
3. `DEPARTMENT_MODULES` in delete-file route
4. Module configuration in dashboard module list

### Problem: No data displays in table
**Solution**: 
1. Ensure authentication token is valid
2. Check that MySQL table exists and has data
3. Check browser console for API errors
4. Verify module mapping is correct

### Problem: File upload fails
**Solution**:
1. Check file size (max 5MB)
2. Verify file type is accepted
3. Ensure `/uploads/cst/[module]/` directory exists
4. Check server logs for upload errors

### Problem: Pagination not working
**Solution**:
1. Ensure query returns `total` field
2. Check `totalPages` calculation: `Math.ceil(total / limit)`
3. Verify page number is not exceeding totalPages

## Performance Optimization

### 1. **Caching**
- Data cached for 5 minutes
- Structure cached for 5 minutes
- Auto-refresh can be toggled
- Cache clears on CRUD operations

### 2. **Pagination**
- Limited to 100 records per page by default
- Maximum 1000 records per page
- Reduces database load and UI lag

### 3. **Column Limiting**
- Only first 5 columns displayed
- User can scroll to see more
- Prevents table from becoming too wide

### 4. **Lazy Loading**
- Module data only loaded when selected
- Images/files not pre-loaded
- Reduces initial page load time

## Next Steps

1. **Test Each Module**:
   - Select a module in the admin dashboard
   - Verify data loads from the database
   - Test Create, Read, Update, Delete operations

2. **Add More Modules**:
   - Add module to DEPARTMENT_MODULES mapping
   - Add configuration to module-fields.ts
   - Add to dashboard module list

3. **Customize Fields**:
   - Edit field configuration in module-fields.ts
   - Add validation rules
   - Change field types and display settings

4. **Monitor Performance**:
   - Check cache hit rates in console
   - Monitor API response times
   - Optimize database queries if needed

## Summary

Your admin dashboard is fully functional and automatically:
- ✅ Fetches data from MySQL tables
- ✅ Displays data in dynamic tables
- ✅ Handles file uploads
- ✅ Performs CRUD operations
- ✅ Caches data for performance
- ✅ Manages pagination
- ✅ Validates data according to configuration

**All you need to do is restart your dev server and start using it!**
