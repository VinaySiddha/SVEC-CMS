# CSEAI MOUs Dynamic Fields Implementation Guide

## 📋 Table Structure Overview

### Database Table: `cai_mous`

```sql
CREATE TABLE cai_mous (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mou_with VARCHAR(255),
    from_date VARCHAR(50),
    to_date VARCHAR(50),
    status VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Columns Description

| Column | Type | Size | Purpose | Example |
|--------|------|------|---------|---------|
| **id** | INT | - | Auto-increment primary key | 1, 2, 3... |
| **mou_with** | VARCHAR | 255 | Organization/Institute name | "IIT Delhi", "Google India" |
| **from_date** | VARCHAR | 50 | MOU start date | "2024-01-15", "01-01-2024" |
| **to_date** | VARCHAR | 50 | MOU end date | "2026-01-14", "31-12-2026" |
| **status** | VARCHAR | 100 | MOU validity status | "Active", "Expired", "Pending", "Terminated" |
| **created_at** | TIMESTAMP | - | Record creation timestamp | Auto-set |

---

## ✨ Dynamic Fields Configuration

### Configuration Location
**File**: `/src/config/module-fields.ts`  
**Module**: `'mous'`  
**Department**: `'cse-ai'`

### Field Configuration Code

```typescript
// In /src/config/module-fields.ts under 'cse-ai' department

'mous': {
  tableName: 'cai_mous',
  displayField: 'mou_with',
  
  fields: [
    {
      name: 'mou_with',
      label: 'Organization/Institute',
      type: 'text',
      placeholder: 'e.g., IIT Delhi, Google India, Microsoft',
      required: true,
      size: 'full',
      description: 'Name of the organization or institute for the MOU',
      validation: {
        minLength: 3,
        maxLength: 255,
        pattern: '^[a-zA-Z0-9\\s\\-&.,()]*$'
      }
    },
    {
      name: 'from_date',
      label: 'MOU Start Date',
      type: 'text',
      placeholder: 'e.g., 2024-01-15 or 01-01-2024',
      required: true,
      size: 'half',
      description: 'Date when the MOU comes into effect',
      hint: 'Format: YYYY-MM-DD or DD-MM-YYYY',
      validation: {
        pattern: '^(\\d{4}-\\d{2}-\\d{2}|\\d{2}-\\d{2}-\\d{4})$'
      }
    },
    {
      name: 'to_date',
      label: 'MOU End Date',
      type: 'text',
      placeholder: 'e.g., 2026-01-14 or 31-12-2026',
      required: true,
      size: 'half',
      description: 'Date when the MOU expires',
      hint: 'Format: YYYY-MM-DD or DD-MM-YYYY',
      validation: {
        pattern: '^(\\d{4}-\\d{2}-\\d{2}|\\d{2}-\\d{2}-\\d{4})$'
      }
    },
    {
      name: 'status',
      label: 'MOU Status',
      type: 'select',
      placeholder: 'Select status',
      required: true,
      size: 'half',
      description: 'Current status of the MOU',
      options: [
        { value: 'Active', label: 'Active', color: 'green' },
        { value: 'Expired', label: 'Expired', color: 'red' },
        { value: 'Pending', label: 'Pending', color: 'yellow' },
        { value: 'Terminated', label: 'Terminated', color: 'gray' },
        { value: 'Renewed', label: 'Renewed', color: 'blue' }
      ]
    }
  ],
  
  searchableFields: ['mou_with', 'status'],
  sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at'],
  editableFields: ['mou_with', 'from_date', 'to_date', 'status'],
  
  // Timestamps are auto-managed
  systemFields: ['id', 'created_at', 'updated_at']
}
```

---

## 🎯 Field Details & Rendering

### 1. Organization/Institute Field

**Field Name**: `mou_with`

```
┌─────────────────────────────────────────────┐
│ Organization/Institute                      │
│ ┌───────────────────────────────────────────┐ │
│ │ e.g., IIT Delhi, Google India, Microsoft │ │
│ └───────────────────────────────────────────┘ │
│ * Required field                            │
└─────────────────────────────────────────────┘
```

**Features**:
- Type: Text Input
- Size: Full width (100%)
- Required: Yes ✓
- Max Length: 255 characters
- Validation: Alphanumeric with special characters (-, &, ., (),)
- Searchable: Yes ✓
- Sortable: Yes ✓
- Display Priority: Primary field (shown in table header)

---

### 2. MOU Start Date Field

**Field Name**: `from_date`

```
┌─────────────────────────────────┐
│ MOU Start Date                  │
│ ┌─────────────────────────────┐ │
│ │ e.g., 2024-01-15           │ │
│ │ or 01-01-2024              │ │
│ └─────────────────────────────┘ │
│ * Required field                │
│ Hint: Format: YYYY-MM-DD or    │
│ DD-MM-YYYY                      │
└─────────────────────────────────┘
```

**Features**:
- Type: Text Input (date format)
- Size: Half width (50%)
- Required: Yes ✓
- Format Options:
  - YYYY-MM-DD (ISO 8601)
  - DD-MM-YYYY (Indian format)
- Sortable: Yes ✓
- Validation: Date pattern matching

---

### 3. MOU End Date Field

**Field Name**: `to_date`

```
┌─────────────────────────────────┐
│ MOU End Date                    │
│ ┌─────────────────────────────┐ │
│ │ e.g., 2026-01-14           │ │
│ │ or 31-12-2026              │ │
│ └─────────────────────────────┘ │
│ * Required field                │
│ Hint: Format: YYYY-MM-DD or    │
│ DD-MM-YYYY                      │
└─────────────────────────────────┘
```

**Features**:
- Type: Text Input (date format)
- Size: Half width (50%)
- Required: Yes ✓
- Format Options:
  - YYYY-MM-DD (ISO 8601)
  - DD-MM-YYYY (Indian format)
- Sortable: Yes ✓
- Business Logic: End date should be ≥ Start date

---

### 4. MOU Status Field

**Field Name**: `status`

```
┌──────────────────────────────────┐
│ MOU Status                       │
│ ┌──────────────────────────────┐ │
│ │ Select status          ▼      │ │
│ ├──────────────────────────────┤ │
│ │ ✓ Active                     │ │
│ │ Expired                      │ │
│ │ Pending                      │ │
│ │ Terminated                   │ │
│ │ Renewed                      │ │
│ └──────────────────────────────┘ │
│ * Required field                 │
└──────────────────────────────────┘
```

**Features**:
- Type: Dropdown/Select
- Size: Half width (50%)
- Required: Yes ✓
- Status Options with Color Coding:

| Status | Value | Color | Meaning |
|--------|-------|-------|---------|
| Active | `Active` | 🟢 Green | MOU is currently valid |
| Expired | `Expired` | 🔴 Red | MOU period has passed |
| Pending | `Pending` | 🟡 Yellow | Awaiting approval/finalization |
| Terminated | `Terminated` | ⚫ Gray | MOU ended before scheduled date |
| Renewed | `Renewed` | 🔵 Blue | MOU has been renewed |

- Searchable: Yes ✓
- Sortable: Yes ✓
- Filterable: Yes ✓

---

## 📊 Dashboard Form Layout

### Add New MOU Form

```
┌─────────────────────────────────────────────────────────────┐
│ Add New MOU Record                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Organization/Institute *                                   │
│ ┌─────────────────────────────────────────────────────────┐│
│ │                                                         ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ MOU Start Date *              │ MOU End Date *             │
│ ┌──────────────────┐          │ ┌──────────────────┐      │
│ │ e.g., 2024-01-15│          │ │ e.g., 2026-01-14│      │
│ └──────────────────┘          │ └──────────────────┘      │
│                                                             │
│ MOU Status *                  │                            │
│ ┌──────────────────┐          │                            │
│ │ Active        ▼ │          │                            │
│ └──────────────────┘          │                            │
│                                                             │
│                      [Cancel] [Save]                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Table View Display

### MOUs Records Table

```
┌──────────────────────────────────────────────────────────────────────┐
│ MOUs Management                                                      │
├──────┬────────────────┬──────────────┬──────────────┬──────────┬────┤
│ ID   │ Organization   │ Start Date   │ End Date     │ Status   │    │
│      │ (Sort ▲▼)      │ (Sort ▲▼)    │ (Sort ▲▼)    │ (Sort)   │    │
├──────┼────────────────┼──────────────┼──────────────┼──────────┼────┤
│  1   │ IIT Delhi      │ 2024-01-15   │ 2026-01-14   │ 🟢 Active │ ⋮  │
│  2   │ Google India   │ 2023-06-01   │ 2024-05-31   │ 🔴 Expired│ ⋮  │
│  3   │ Microsoft      │ 2024-03-20   │ 2025-03-19   │ 🟢 Active │ ⋮  │
│  4   │ Amazon Tech    │ 2024-09-01   │ 2025-08-31   │ 🟡 Pending│ ⋮  │
│  5   │ Oracle Corp    │ 2022-01-01   │ 2024-12-31   │ 🔵 Renewed│ ⋮  │
├──────┴────────────────┴──────────────┴──────────────┴──────────┴────┤
│ Showing 1-5 of 10 records | [Previous] Page 1 [Next]               │
└──────────────────────────────────────────────────────────────────────┘
```

### Sortable Columns
- ✓ Organization/Institute
- ✓ Start Date
- ✓ End Date
- ✓ Status
- ✓ Created Date

### Available Actions
- 🔍 Search by: Organization name or Status
- ✏️ Edit: Modify any editable field
- 🗑️ Delete: Remove MOU record
- ↻ Refresh: Reload table data

---

## 🔄 Data Flow & Operations

### 1. CREATE (Add New MOU)

**User Action**: Click "Add New Record" → Fill Form → Click "Save"

**Request**:
```http
POST /api/admin/departments/cse-ai/mous
Content-Type: application/json

{
  "mou_with": "IIT Delhi",
  "from_date": "2024-01-15",
  "to_date": "2026-01-14",
  "status": "Active"
}
```

**Response**:
```json
{
  "success": true,
  "message": "MOU record created successfully",
  "data": {
    "id": 1,
    "mou_with": "IIT Delhi",
    "from_date": "2024-01-15",
    "to_date": "2026-01-14",
    "status": "Active",
    "created_at": "2024-11-19 10:30:45"
  }
}
```

**Database Insert**:
```sql
INSERT INTO cai_mous (mou_with, from_date, to_date, status, created_at)
VALUES ('IIT Delhi', '2024-01-15', '2026-01-14', 'Active', CURRENT_TIMESTAMP);
```

---

### 2. READ (View MOUs)

**User Action**: Open MOUs module → Table loads automatically

**Request**:
```http
GET /api/admin/departments/cse-ai/mous?page=1&limit=10
```

**Response**:
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
        "status": "Active",
        "created_at": "2024-11-19 10:30:45"
      },
      {
        "id": 2,
        "mou_with": "Google India",
        "from_date": "2023-06-01",
        "to_date": "2024-05-31",
        "status": "Expired",
        "created_at": "2024-06-01 09:15:20"
      }
    ],
    "total": 10,
    "page": 1,
    "limit": 10
  }
}
```

---

### 3. UPDATE (Edit MOU)

**User Action**: Click "Edit" → Modify fields → Click "Update"

**Request**:
```http
PUT /api/admin/departments/cse-ai/mous?id=1
Content-Type: application/json

{
  "mou_with": "IIT Delhi (Updated)",
  "from_date": "2024-01-15",
  "to_date": "2027-01-14",
  "status": "Active"
}
```

**Response**:
```json
{
  "success": true,
  "message": "MOU record updated successfully",
  "data": {
    "id": 1,
    "mou_with": "IIT Delhi (Updated)",
    "from_date": "2024-01-15",
    "to_date": "2027-01-14",
    "status": "Active",
    "updated_at": "2024-11-19 11:45:30"
  }
}
```

---

### 4. DELETE (Remove MOU)

**User Action**: Click "Delete" → Confirm → Record removed

**Request**:
```http
DELETE /api/admin/departments/cse-ai/mous?id=1
```

**Response**:
```json
{
  "success": true,
  "message": "MOU record deleted successfully",
  "data": {
    "id": 1,
    "deleted": true
  }
}
```

---

### 5. SEARCH

**User Action**: Enter search term in search box

**Request**:
```http
GET /api/admin/departments/cse-ai/mous?search=IIT&page=1
```

**Response**: Filters records where `mou_with` or `status` matches "IIT"

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
        "status": "Active",
        "created_at": "2024-11-19 10:30:45"
      }
    ],
    "total": 1
  }
}
```

---

### 6. SORT

**User Action**: Click on column header to sort

**Request**:
```http
GET /api/admin/departments/cse-ai/mous?sortBy=from_date&sortOrder=asc
```

**Sortable Columns**:
- mou_with (A-Z or Z-A)
- from_date (Oldest to Newest or vice versa)
- to_date (Earliest to Latest)
- status (Active, Expired, etc.)
- created_at (Newest to Oldest)

---

## 🎨 Advanced Field Features

### Field Validation

```typescript
// Frontend validation rules
const fieldValidation = {
  mou_with: {
    required: true,
    minLength: 3,
    maxLength: 255,
    pattern: /^[a-zA-Z0-9\s\-&.,()]*$/,
    customError: 'Organization name must be 3-255 characters'
  },
  from_date: {
    required: true,
    pattern: /^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/,
    customError: 'Date format: YYYY-MM-DD or DD-MM-YYYY'
  },
  to_date: {
    required: true,
    pattern: /^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/,
    customError: 'Date format: YYYY-MM-DD or DD-MM-YYYY',
    compareField: 'from_date',
    compareOperator: '>=',
    customError: 'End date must be after or equal to start date'
  },
  status: {
    required: true,
    enum: ['Active', 'Expired', 'Pending', 'Terminated', 'Renewed'],
    customError: 'Invalid status selected'
  }
};
```

### Field Dependencies

- **to_date must be ≥ from_date**: Form submission blocked if end date is before start date
- **Status auto-update**: Can be manually set or auto-updated based on date comparison

### Custom Display Logic

```typescript
// Status color coding in table
const getStatusColor = (status: string) => {
  const colorMap = {
    'Active': '#22c55e',      // Green
    'Expired': '#ef4444',      // Red
    'Pending': '#eab308',      // Yellow
    'Terminated': '#6b7280',   // Gray
    'Renewed': '#3b82f6'       // Blue
  };
  return colorMap[status] || '#6b7280';
};

// Status badge rendering
const renderStatusBadge = (status: string) => {
  const iconMap = {
    'Active': '🟢',
    'Expired': '🔴',
    'Pending': '🟡',
    'Terminated': '⚫',
    'Renewed': '🔵'
  };
  return `${iconMap[status]} ${status}`;
};
```

---

## 📱 Mobile Responsiveness

### Mobile View

```
┌─────────────────────────────────┐
│ MOUs (5)                        │
├─────────────────────────────────┤
│ IIT Delhi                       │
│ 2024-01-15 → 2026-01-14         │
│ 🟢 Active                       │
│ [Edit] [Delete]                 │
├─────────────────────────────────┤
│ Google India                    │
│ 2023-06-01 → 2024-05-31         │
│ 🔴 Expired                      │
│ [Edit] [Delete]                 │
├─────────────────────────────────┤
│ [+ Add New MOU]                 │
└─────────────────────────────────┘
```

---

## 🔐 Security & Permissions

### Access Control
- **View**: All authenticated users
- **Create**: Admin users only
- **Edit**: Admin users and record creator
- **Delete**: Admin users only

### Data Validation (Server-side)
```typescript
// Validate all inputs before database insert
const validateMOUData = (data) => {
  if (!data.mou_with || data.mou_with.length < 3) {
    throw new Error('Organization name required (min 3 chars)');
  }
  if (!isValidDate(data.from_date)) {
    throw new Error('Invalid start date format');
  }
  if (!isValidDate(data.to_date)) {
    throw new Error('Invalid end date format');
  }
  if (!['Active', 'Expired', 'Pending', 'Terminated', 'Renewed'].includes(data.status)) {
    throw new Error('Invalid status value');
  }
};
```

---

## 💾 Auto-Save & Caching

### Cache Management
- Table data cached for 5 minutes
- Cache invalidated on: CREATE, UPDATE, DELETE
- Manual refresh button available
- Auto-refresh every 5-30 seconds (configurable)

### Auto-Save
```typescript
// Debounced auto-save
const debouncedAutoSave = debounce((formData) => {
  if (formData.id) {
    // Update existing record
    updateMOU(formData);
  }
}, 1000);

// Save on interval
setInterval(() => {
  if (hasUnsavedChanges) {
    autoSave();
  }
}, 30000); // 30 seconds
```

---

## 📊 Statistics & Dashboard Widgets

### MOU Summary Widget

```
┌─────────────────────────────────┐
│ MOUs At a Glance                │
├─────────────────────────────────┤
│ Total MOUs: 10                  │
│ 🟢 Active: 6                    │
│ 🔴 Expired: 2                   │
│ 🟡 Pending: 1                   │
│ 🔵 Renewed: 1                   │
│ ⚫ Terminated: 0                 │
├─────────────────────────────────┤
│ Expiring Soon (30 days):        │
│ • Google India (2024-12-10)    │
│ • Amazon Tech (2024-12-25)     │
└─────────────────────────────────┘
```

### Statistics Queries

```sql
-- Total active MOUs
SELECT COUNT(*) FROM cai_mous WHERE status = 'Active';

-- MOUs expiring within 30 days
SELECT * FROM cai_mous 
WHERE status = 'Active' 
AND STR_TO_DATE(to_date, '%Y-%m-%d') BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);

-- Status distribution
SELECT status, COUNT(*) as count 
FROM cai_mous 
GROUP BY status;
```

---

## 🎯 Implementation Checklist

```
✅ Field Configuration
   - Added to /src/config/module-fields.ts
   - Fields: mou_with, from_date, to_date, status
   - Searchable: mou_with, status
   - Sortable: All fields
   - Editable: All non-system fields

✅ Form Rendering
   - Organization name text input
   - Start date text input (date format)
   - End date text input (date format)
   - Status dropdown with 5 options

✅ Table Display
   - Column headers with sort indicators
   - Status color coding (green/red/yellow/gray/blue)
   - Search functionality
   - Pagination (10 per page default)
   - Edit/Delete action buttons

✅ CRUD Operations
   - Create: POST endpoint functional
   - Read: GET endpoint with pagination/search/sort
   - Update: PUT endpoint functional
   - Delete: DELETE endpoint functional

✅ Data Validation
   - Frontend validation (format, required fields)
   - Server-side validation
   - Date comparison logic
   - Status enum validation

✅ User Experience
   - Auto-refresh after changes
   - Toast notifications (success/error)
   - Confirmation dialogs for delete
   - Loading indicators
   - Error handling

✅ Mobile Responsive
   - Form fields stack on mobile
   - Table responsive design
   - Touch-friendly buttons
   - Mobile-optimized layout
```

---

## 📝 API Endpoint Reference

### Structure Endpoint

```http
GET /api/admin/departments/cse-ai/mous/structure
```

**Response**:
```json
{
  "success": true,
  "dept": "cse-ai",
  "module": "mous",
  "tableName": "cai_mous",
  "displayField": "mou_with",
  "fields": [
    {
      "name": "mou_with",
      "label": "Organization/Institute",
      "type": "text",
      "placeholder": "e.g., IIT Delhi, Google India, Microsoft",
      "required": true,
      "size": "full"
    },
    {
      "name": "from_date",
      "label": "MOU Start Date",
      "type": "text",
      "placeholder": "e.g., 2024-01-15 or 01-01-2024",
      "required": true,
      "size": "half",
      "hint": "Format: YYYY-MM-DD or DD-MM-YYYY"
    },
    {
      "name": "to_date",
      "label": "MOU End Date",
      "type": "text",
      "placeholder": "e.g., 2026-01-14 or 31-12-2026",
      "required": true,
      "size": "half",
      "hint": "Format: YYYY-MM-DD or DD-MM-YYYY"
    },
    {
      "name": "status",
      "label": "MOU Status",
      "type": "select",
      "placeholder": "Select status",
      "required": true,
      "size": "half",
      "options": [
        { "value": "Active", "label": "Active" },
        { "value": "Expired", "label": "Expired" },
        { "value": "Pending", "label": "Pending" },
        { "value": "Terminated", "label": "Terminated" },
        { "value": "Renewed", "label": "Renewed" }
      ]
    }
  ],
  "searchableFields": ["mou_with", "status"],
  "sortableFields": ["mou_with", "from_date", "to_date", "status", "created_at"],
  "editableFields": ["mou_with", "from_date", "to_date", "status"]
}
```

---

## 🚀 Usage Examples

### Example 1: Adding a New MOU

1. User clicks "Add New Record" button
2. Form opens with 4 fields
3. Fills in:
   - **Organization**: "IIT Bombay"
   - **Start Date**: "2024-06-01"
   - **End Date**: "2026-05-31"
   - **Status**: "Active"
4. Clicks "Save"
5. Record created and table refreshes

### Example 2: Searching MOUs

1. User types "Google" in search box
2. Results filtered to show only MOUs with "Google" in organization name
3. Can further sort by date or status
4. Results appear instantly with pagination

### Example 3: Updating Status

1. User clicks "Edit" on an expired MOU
2. Changes status from "Expired" to "Renewed"
3. Updates end date to "2025-12-31"
4. Clicks "Update"
5. Record updated and status badge changes color (red → blue)

---

## 🔗 Related Documentation

- **Field Mapping**: See `CSEAI_FIELD_MAPPING_REFERENCE.md`
- **Admin Dashboard**: See `CSEAI_ADMIN_CONFIGURATION.md`
- **API Routes**: See `/src/app/api/admin/departments/[dept]/[module]/` folder
- **Database Schema**: See `cai_mous` table documentation

---

## 📞 Support & Troubleshooting

### Common Issues

**Q: Date validation failing?**
- A: Ensure date format is either YYYY-MM-DD or DD-MM-YYYY
- Check that start date is before or equal to end date

**Q: MOU not appearing in table?**
- A: Check if status is set correctly
- Verify organization name is not empty
- Clear browser cache and refresh

**Q: Can't delete MOU record?**
- A: Verify you have admin permissions
- Check if record is not referenced by other modules

---

## ✨ Status: COMPLETE

**Last Updated**: November 19, 2024  
**Configuration File**: `/src/config/module-fields.ts`  
**Table**: `cai_mous`  
**Fields**: 4 dynamic fields configured  
**API Endpoints**: All CRUD operations functional  
**Status**: ✅ Ready for production use
