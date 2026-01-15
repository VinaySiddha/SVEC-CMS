# Workshops Module - Quick Reference

## What Was Done

The Workshops module has been fully implemented in the CSEAI admin dashboard with dynamic form rendering based on database schema.

## Key Components

### 1. Configuration File
📄 **`src/config/module-fields.ts`**
- Defines field metadata for all admin modules
- Workshops fields: title, category, year, file_url
- Provides structure for dynamic form generation

### 2. API Endpoints
📡 **Structure Endpoint**: `/api/admin/departments/cse-ai/workshops/structure`
- Returns field configuration with metadata
- Includes validation rules, options, help text

📡 **CRUD Endpoints**:
- GET: Fetch all workshops
- POST: Create new workshop
- PUT: Update workshop
- DELETE: Delete workshop

### 3. Dashboard Integration
🎨 **Admin Dashboard**: `src/app/departments/[dept]/dashboard/page.tsx`
- Workshops card in module grid
- Modal for create/edit operations
- Dynamic table display based on field config
- File upload support

## Field Details

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **title** | Text | ✓ | Workshop name |
| **category** | Select | ✓ | Type of workshop |
| **year** | Text | ✓ | Academic year (2024 or 2024-25) |
| **file_url** | File | | Workshop document or brochure |

## How to Use

### Create a Workshop
1. Go to Admin Dashboard
2. Click "Workshops" card
3. Click "Add First Record" or "+" button
4. Fill in required fields (title, category, year)
5. Optionally upload a file
6. Click "Save"

### Edit a Workshop
1. Find workshop in the list
2. Click edit (pencil) icon
3. Update any fields
4. Upload new file if needed
5. Click "Save"

### Delete a Workshop
1. Find workshop in the list
2. Click delete (trash) icon
3. Confirm deletion

### Search Workshops
1. Use search box (if visible in list)
2. Search by: title, category, or year

### Sort Workshops
1. Click column header to sort
2. Supported columns: title, category, year, created_at

## Database

**Table**: `cai_workshops`
**Location**: `svec_cms` database on `62.72.31.209`

```sql
CREATE TABLE cai_workshops (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category ENUM(...) NULL,
  year VARCHAR(20) NULL,
  title VARCHAR(255) NULL,
  file_url TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Extensibility

### Add Another Module to Dashboard

**Step 1**: Add to field configuration
```typescript
// src/config/module-fields.ts
export const newModuleFieldConfig: ModuleFieldConfig = {
  tableName: 'new_table',
  displayField: 'title',
  fields: [/* field definitions */],
  searchableFields: ['title'],
  sortableFields: ['title', 'created_at'],
  editableFields: ['title']
};

MODULES_FIELD_CONFIG['dept']['module-key'] = newModuleFieldConfig;
```

**Step 2**: Add table mapping
```typescript
// src/app/api/admin/departments/[dept]/[module]/route.ts
'module-key': 'new_table'
```

**Step 3**: Add to dashboard
```typescript
// src/app/departments/[dept]/dashboard/page.tsx
{ key: 'module-key', name: 'Module Name', icon: IconComponent, description: 'Description', table: 'new_table' }
```

## Error Handling

### Fixed Issues
✅ Dashboard now handles both database schema and configuration-based field formats
✅ Safe string operations for field names
✅ Null/undefined field checks

### What to Check If Something Doesn't Work
1. Module exists in DEPARTMENT_MODULES mapping
2. Field configuration defined in src/config/module-fields.ts
3. Table exists in database
4. User has proper authentication token
5. File format/size validation passes

## Documentation

📚 **WORKSHOPS_FIELD_DESIGN.md** - Complete field design specifications
📚 **WORKSHOPS_VISUAL_GUIDE.md** - Layout and visual design guide
📚 **WORKSHOPS_IMPLEMENTATION_SUMMARY.md** - Full implementation details

## File Locations

```
Core Files:
- src/config/module-fields.ts (Field configuration)
- src/app/api/admin/departments/[dept]/[module]/route.ts (CRUD API)
- src/app/api/admin/departments/[dept]/[module]/structure/route.ts (Field metadata)
- src/app/departments/[dept]/dashboard/page.tsx (Admin UI)

Documentation:
- WORKSHOPS_FIELD_DESIGN.md
- WORKSHOPS_VISUAL_GUIDE.md
- WORKSHOPS_IMPLEMENTATION_SUMMARY.md
```

## Common Tasks

### View All Workshops
```bash
GET /api/admin/departments/cse-ai/workshops?page=1&limit=10
```

### Search for "Machine Learning"
```bash
GET /api/admin/departments/cse-ai/workshops?page=1&limit=10&search=Machine%20Learning
```

### Create Workshop via API
```bash
POST /api/admin/departments/cse-ai/workshops
Content-Type: application/json

{
  "title": "AI Workshop",
  "category": "Skill Development",
  "year": "2024-25",
  "file_url": "https://example.com/brochure.pdf"
}
```

### Update Workshop via API
```bash
PUT /api/admin/departments/cse-ai/workshops/123
Content-Type: application/json

{
  "title": "Updated Title",
  "category": "Professional",
  "year": "2024-25"
}
```

## Support

For issues or questions:
1. Check error messages in browser console
2. Review field configuration in module-fields.ts
3. Verify API response in Network tab (F12)
4. Check database table exists
5. Confirm user authentication token is valid

---

**Last Updated**: November 2025
**Version**: 1.0
**Status**: Production Ready ✅
