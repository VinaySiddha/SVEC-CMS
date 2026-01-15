# Admin Dashboard Data Flow Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD FRONTEND                        │
│                (src/app/departments/[dept]/dashboard)               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Module Selection                                             │   │
│  │ • Browse available modules (Faculty, MOUs, Workshops, etc) │   │
│  │ • Click to select module                                   │   │
│  └────────────────┬────────────────────────────────────────────┘   │
│                   │                                                  │
│                   ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ Fetch Structure & Data (in parallel)                        │   │
│  │ ┌─────────────────────────────────────────────────────────┐ │   │
│  │ │ Promise.allSettled([                                    │ │   │
│  │ │   GET /api/.../structure,                              │ │   │
│  │ │   GET /api/.../data?page=1&limit=100                  │ │   │
│  │ │ ])                                                      │ │   │
│  │ └─────────────────────────────────────────────────────────┘ │   │
│  └────────────────┬────────────────────────────────────────────┘   │
│                   │                                                  │
└───────────────────┼──────────────────────────────────────────────────┘
                    │
                    │ FETCH REQUESTS
                    │ (with Bearer token)
                    │
┌───────────────────┼──────────────────────────────────────────────────┐
│                   ▼                                                   │
│         NEXT.js API ROUTES (app router)                              │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ GET /api/admin/departments/cst/[module]/structure           │   │
│  │ File: structure/route.ts                                    │   │
│  │                                                               │   │
│  │ 1. Verify JWT token via verifyAuth()                        │   │
│  │ 2. Get table name from DEPARTMENT_MODULES mapping           │   │
│  │ 3. Try to get config from getModuleFieldConfig()           │   │
│  │    - If found: Return configured field structure            │   │
│  │    - If not: Query SHOW COLUMNS FROM table                  │   │
│  │ 4. Return field definitions with types and metadata         │   │
│  └────────────────┬─────────────────────────────────────────────┘   │
│                   │                                                   │
│                   ▼                                                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ GET /api/admin/departments/cst/[module]                     │   │
│  │ File: route.ts                                              │   │
│  │                                                               │   │
│  │ 1. Verify JWT token via verifyDepartmentAccess()           │   │
│  │ 2. Get table name from DEPARTMENT_MODULES mapping           │   │
│  │ 3. Build SQL query with pagination & search:               │   │
│  │    SELECT * FROM table LIMIT offset, limit                  │   │
│  │ 4. Get total count: SELECT COUNT(*) FROM table              │   │
│  │ 5. Format and return paginated response                     │   │
│  └────────────────┬─────────────────────────────────────────────┘   │
│                   │                                                   │
│                   ▼                                                   │
│         MySQL Database (src/lib/db.ts)                              │
│         ┌─────────────────────────────────────────┐                │
│         │ Connection Pool                          │                │
│         │                                           │                │
│         │ ┌─────────────────────────────────────┐ │                │
│         │ │ SELECT * FROM cst_mous WHERE ...   │ │                │
│         │ └─────────────────────────────────────┘ │                │
│         │                                           │                │
│         │ ┌─────────────────────────────────────┐ │                │
│         │ │ SELECT COUNT(*) FROM cst_mous      │ │                │
│         │ └─────────────────────────────────────┘ │                │
│         │                                           │                │
│         │ ┌─────────────────────────────────────┐ │                │
│         │ │ Tables:                              │ │                │
│         │ │ • cst_mous                           │ │                │
│         │ │ • cst_faculty                        │ │                │
│         │ │ • cst_workshops                      │ │                │
│         │ │ • cst_technical_faculty             │ │                │
│         │ │ • cst_industry_programs             │ │                │
│         │ │ • ... and many more                  │ │                │
│         │ └─────────────────────────────────────┘ │                │
│         └─────────────────────────────────────────┘                │
│                   ▲                                                   │
└───────────────────┼───────────────────────────────────────────────────┘
                    │
                    │ JSON RESPONSE
                    │ {
                    │   "success": true,
                    │   "data": {
                    │     "records": [...],
                    │     "total": 15,
                    │     "totalPages": 1
                    │   }
                    │ }
                    │
┌───────────────────┼──────────────────────────────────────────────────┐
│                   ▼                                                   │
│            FRONTEND STATE MANAGEMENT                                 │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ State Updates (React)                                         │   │
│  │                                                               │   │
│  │ setTableColumns(response.fields)                             │   │
│  │ setModuleData(response.data.records)                         │   │
│  │ setTotalRecords(response.data.total)                         │   │
│  │ setTotalPages(response.data.totalPages)                      │   │
│  │                                                               │   │
│  │ Data Caching:                                                │   │
│  │ dataCache[key] = { data, timestamp }                         │   │
│  │ (Reuse within 5 minutes)                                     │   │
│  └────────────────┬─────────────────────────────────────────────┘   │
│                   │                                                   │
│                   ▼                                                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Table Rendering                                              │   │
│  │                                                               │   │
│  │ <table>                                                       │   │
│  │   <thead>                                                     │   │
│  │     <tr>                                                      │   │
│  │       {tableColumns.map(col => <th>{col.Field}</th>)}       │   │
│  │       <th>Actions</th>                                        │   │
│  │     </tr>                                                     │   │
│  │   </thead>                                                    │   │
│  │   <tbody>                                                     │   │
│  │     {moduleData.map(item => (                               │   │
│  │       <tr>                                                    │   │
│  │         {tableColumns.map(col => (                           │   │
│  │           <td>{item[col.Field]}</td>                         │   │
│  │         ))}                                                   │   │
│  │         <td>                                                  │   │
│  │           <Edit /> <Delete />                                │   │
│  │         </td>                                                 │   │
│  │       </tr>                                                   │   │
│  │     ))}                                                       │   │
│  │   </tbody>                                                    │   │
│  │ </table>                                                      │   │
│  │                                                               │   │
│  │ Pagination:                                                  │   │
│  │ <button onClick={() => loadData(page - 1)}>                │   │
│  │   Previous (Page {currentPage} of {totalPages})             │   │
│  │ </button>                                                     │   │
│  │ <button onClick={() => loadData(page + 1)}>Next</button>   │   │
│  └────────────────┬─────────────────────────────────────────────┘   │
│                   │                                                   │
│                   ▼                                                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Display to User                                              │   │
│  │                                                               │   │
│  │ MOUs                                                          │   │
│  │ ┌────┬──────────────────┬─────────┬───────────┬──────────────┤ │
│  │ │ ID │ Organization     │ From    │ To        │ Actions      │ │
│  │ ├────┼──────────────────┼─────────┼───────────┼──────────────┤ │
│  │ │ 1  │ IIT Delhi        │11/25/24 │11/25/26   │ Edit Delete  │ │
│  │ │ 2  │ Google India     │01/15/24 │01/15/26   │ Edit Delete  │ │
│  │ │ 3  │ Microsoft        │03/20/24 │03/20/25   │ Edit Delete  │ │
│  │ └────┴──────────────────┴─────────┴───────────┴──────────────┘ │
│  │                                                               │   │
│  │ [Previous] Page 1 of 1 [Next]                               │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

## Complete Request-Response Cycle

### 1. Load Module (User clicks on "MOUs")

```
FRONTEND                          BACKEND                    DATABASE
────────────────────────────────────────────────────────────────────

User clicks "MOUs"
        │
        ▼
Handle Module Select
        │
        ├─► Fetch Structure
        │   GET /api/admin/departments/cst/mous/structure
        │   ┌─ Headers: Authorization: Bearer token
        │   │
        │   └──────────────────────────────────┐
        │                                      │
        │                            verifyAuth()
        │                            │
        │                            ├─ Parse token
        │                            │
        │                            ├─ verifyToken(token)
        │                            │
        │                            └─ Return user
        │                                      │
        │                            Get from DEPARTMENT_MODULES
        │                            'mous' → 'cst_mous'
        │                                      │
        │                            getModuleFieldConfig(...)
        │                            │
        │                            ├─ Load from module-fields.ts
        │                            │
        │                            └─ Return field config
        │                                      │
        │                            Response: {
        │                              fields: [...],
        │                              tableName: 'cst_mous',
        │                              displayField: 'mou_with'
        │                            }
        │                                      │
        │◄─────────────────────────────────────┘
        │
        ├─ Save to State
        │  setTableColumns(response.fields)
        │
        └─► Fetch Data (parallel)
            GET /api/admin/departments/cst/mous?page=1&limit=100
            ┌─ Headers: Authorization: Bearer token
            │
            └──────────────────────────────────┐
                                              │
                                   verifyDepartmentAccess()
                                   │
                                   ├─ Parse token
                                   │
                                   ├─ Check role
                                   │
                                   └─ Return user
                                                  │
                                   Get from DEPARTMENT_MODULES
                                   'mous' → 'cst_mous'
                                                  │
                                   Build SQL Query
                                   │
                                   ├─ SELECT * FROM cst_mous
                                   │   LIMIT 0, 100
                                   │
                                   └─────────────────────────────────┐
                                                                    │
                                                      Run on MySQL DB
                                                      │
                                                      ├─ Query cst_mous
                                                      │
                                                      ├─ Check each row
                                                      │   (no soft deletes)
                                                      │
                                                      └─ Return 100 rows
                                                                    │
                                   SELECT COUNT(*) FROM cst_mous    │
                                                      │──────────────┘
                                                      │
                                                      └─ Return 15 rows
                                                      (total count)
                                                                    │
                                   Format response:
                                   {
                                     success: true,
                                     data: {
                                       records: [...15 items],
                                       total: 15,
                                       page: 1,
                                       limit: 100,
                                       totalPages: 1
                                     }
                                   }
                                                                    │
            ◄──────────────────────────────────────────────────────┘
            │
    Save to State
    setModuleData(response.data.records)
    setTotalRecords(response.data.total)
    setTotalPages(response.data.totalPages)
            │
    Cache Data
    dataCache[key] = { data, timestamp }
            │
            ▼
    Render Table
    <Table columns={tableColumns} data={moduleData} />
```

### 2. Create New Record (User clicks "Add" and submits form)

```
FRONTEND                          BACKEND                    DATABASE
────────────────────────────────────────────────────────────────────

User fills form
│ • Organization: "IIT Delhi"
│ • From Date: "2024-01-15"
│ • To Date: "2026-01-14"
│ • Status: "Till Date"
│ • File: (upload MOU.pdf)
│
▼
Click "Save"
│
├─► Upload File (if selected)
│   POST /api/admin/departments/cst/mous/upload
│   ┌─ FormData: { file, recordId }
│   │
│   └──────────────────────────────────┐
│                                      │
│                            Validate file
│                            │
│                            ├─ Check size (< 5MB) ✓
│                            │
│                            ├─ Check type (.pdf) ✓
│                            │
│                            └─ Return OK
│                                      │
│                            Save file
│                            │
│                            ├─ Generate filename
│                            │
│                            ├─ Save to /uploads/cst/mous/
│                            │
│                            └─ Return URL
│                                      │
│   ◄─────────────────────────────────┘
│   Save returned file URL to form state
│   file_url = "/uploads/cst/mous/mou_12345.pdf"
│
├─► Create Record
│   POST /api/admin/departments/cst/mous
│   ┌─ Body: {
│   │   mou_with: "IIT Delhi",
│   │   from_date: "2024-01-15",
│   │   to_date: "2026-01-14",
│   │   status: "Till Date",
│   │   file_url: "/uploads/cst/mous/mou_12345.pdf"
│   │ }
│   │
│   └──────────────────────────────────┐
│                                      │
│                            Verify auth & dept
│                            │
│                            Get table name
│                            'mous' → 'cst_mous'
│                                      │
│                            Validate fields
│                            │
│                            ├─ Check required fields
│                            │
│                            └─ All OK ✓
│                                      │
│                            INSERT INTO cst_mous
│                            (mou_with, from_date, to_date,
│                             status, file_url,
│                             created_at, updated_at)
│                            VALUES (...)
│                                      │
│                                      └─────────────────────────────────┐
│                                                                        │
│                                                      Run INSERT query
│                                                      │
│                                                      ├─ Generate ID
│                                                      │
│                                                      ├─ Set created_at
│                                                      │
│                                                      ├─ Set updated_at
│                                                      │
│                                                      └─ Return new ID (16)
│                                                                        │
│                            Return:
│                            {
│                              success: true,
│                              data: { id: 16, ... }
│                            }
│                                      │
│   ◄──────────────────────────────────┘
│
├─ Show success toast notification
│  "✓ Record created successfully"
│
└─► Refresh Table
    Clear cache
    dataCache = {}
    │
    └─ Reload module data
       (triggers steps from "Load Module" above)
       │
       └─ New record #16 now appears in table
```

### 3. Edit Record (User clicks "Edit" and updates)

```
FRONTEND                          BACKEND                    DATABASE
────────────────────────────────────────────────────────────────────

User clicks "Edit" on row
│
▼
Open form modal with pre-filled data
│ • Organization: "IIT Delhi" → "Indian Institute of Technology Delhi"
│ • Status: "Till Date" → "Expired"
│ • File: (new MOU.pdf selected)
│
▼
Click "Save"
│
├─► Upload New File (if selected)
│   (same as Create flow above)
│   ✓ File saved and URL returned
│
├─► Update Record
│   PUT /api/admin/departments/cst/mous?id=16
│   ┌─ Body: {
│   │   mou_with: "Indian Institute of Technology Delhi",
│   │   from_date: "2024-01-15",
│   │   to_date: "2026-01-14",
│   │   status: "Expired",
│   │   file_url: "/uploads/cst/mous/mou_12345_new.pdf"
│   │ }
│   │
│   └──────────────────────────────────┐
│                                      │
│                            Verify auth & dept
│                            │
│                            Get table name
│                            'mous' → 'cst_mous'
│                                      │
│                            Check record exists
│                                      │
│                            UPDATE cst_mous
│                            SET mou_with = "Indian...",
│                                status = "Expired",
│                                file_url = "...",
│                                updated_at = NOW()
│                            WHERE id = 16
│                                      │
│                                      └─────────────────────────────────┐
│                                                                        │
│                                                      Run UPDATE query
│                                                      │
│                                                      ├─ Update fields
│                                                      │
│                                                      ├─ Set updated_at
│                                                      │
│                                                      └─ Return success
│                                                                        │
│                            Return:
│                            {
│                              success: true,
│                              data: { ... }
│                            }
│                                      │
│   ◄──────────────────────────────────┘
│
├─ Show success toast
│  "✓ Record updated successfully"
│
└─► Refresh Table
    (Clear cache and reload)
    │
    └─ Updated record appears in table
       Organization: "Indian Institute of Technology Delhi"
       Status: "Expired"
```

### 4. Delete Record (User clicks "Delete")

```
FRONTEND                          BACKEND                    DATABASE
────────────────────────────────────────────────────────────────────

User clicks "Delete"
│
▼
Confirmation dialog appears
│
▼
User clicks "Confirm"
│
├─► Delete File (if exists)
│   POST /api/admin/departments/cst/mous/delete-file
│   ┌─ Body: { fileUrl: "/uploads/cst/mous/mou_12345_new.pdf" }
│   │
│   └──────────────────────────────────┐
│                                      │
│                            Verify auth
│                            │
│                            Extract file path
│                            "/uploads/..." → "D:/uploads/..."
│                                      │
│                            Check file exists
│                                      │
│                            Delete file (fs.unlink)
│                                      │
│                            Return success
│                                      │
│   ◄──────────────────────────────────┘
│
├─► Delete Record
│   DELETE /api/admin/departments/cst/mous?id=16
│   ┌─ Headers: Authorization: Bearer token
│   │
│   └──────────────────────────────────┐
│                                      │
│                            Verify auth & dept
│                            │
│                            Get table name
│                            'mous' → 'cst_mous'
│                                      │
│                            DELETE FROM cst_mous
│                            WHERE id = 16
│                                      │
│                                      └─────────────────────────────────┐
│                                                                        │
│                                                      Run DELETE query
│                                                      │
│                                                      ├─ Find row id=16
│                                                      │
│                                                      ├─ Delete row
│                                                      │
│                                                      └─ Return success
│                                                                        │
│                            Return:
│                            {
│                              success: true,
│                              message: "Record deleted"
│                            }
│                                      │
│   ◄──────────────────────────────────┘
│
├─ Show success toast
│  "✓ Record deleted successfully"
│
└─► Refresh Table
    Clear cache and reload
    │
    └─ Record #16 disappears from table
       Total records: 15 → 14
```

## Key Features Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD CAPABILITIES                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📊 DATA DISPLAY                                           │
│  ├─ Dynamic table rendering based on DB schema             │
│  ├─ First 5 columns (scrollable for more)                  │
│  ├─ Automatic date formatting                              │
│  ├─ Long text truncation (100 chars)                       │
│  └─ Column headers from field labels                        │
│                                                              │
│  ➕ CREATE RECORDS                                          │
│  ├─ Dynamic form generation from config                    │
│  ├─ Field validation (required, type)                      │
│  ├─ File upload support (5MB max)                          │
│  ├─ Success notifications                                  │
│  └─ Table auto-refresh after creation                      │
│                                                              │
│  ✏️  EDIT RECORDS                                          │
│  ├─ Form pre-populated with record data                    │
│  ├─ All fields editable (except timestamp)                 │
│  ├─ File replacement support                               │
│  ├─ Success notifications                                  │
│  └─ Table auto-refresh after update                        │
│                                                              │
│  🗑️  DELETE RECORDS                                        │
│  ├─ Confirmation dialog before deletion                    │
│  ├─ Associated files deleted                               │
│  ├─ Success notifications                                  │
│  └─ Table auto-refresh after deletion                      │
│                                                              │
│  📄 FILE MANAGEMENT                                        │
│  ├─ Upload during create/edit                              │
│  ├─ File type validation                                   │
│  ├─ File size validation (max 5MB)                         │
│  ├─ Secure storage in /uploads/[dept]/[module]/            │
│  ├─ File preview/download links                            │
│  └─ Automatic cleanup on record delete                     │
│                                                              │
│  🔍 SEARCH & FILTER                                        │
│  ├─ Search by configured searchable fields                 │
│  ├─ Real-time filtering                                    │
│  ├─ Works with pagination                                  │
│  └─ Highlights matching results                            │
│                                                              │
│  📖 PAGINATION                                             │
│  ├─ 100 records per page default                           │
│  ├─ Next/Previous navigation                               │
│  ├─ Page indicator (Page 1 of N)                           │
│  ├─ Total records display                                  │
│  └─ Configurable items per page                            │
│                                                              │
│  ⚡ PERFORMANCE                                            │
│  ├─ 5-minute data caching                                  │
│  ├─ Parallel API requests                                  │
│  ├─ Auto-refresh toggle (5s-5m intervals)                  │
│  ├─ Manual refresh button                                  │
│  └─ Lazy loading images                                    │
│                                                              │
│  🔐 SECURITY                                               │
│  ├─ JWT token-based authentication                         │
│  ├─ Department-level access control                        │
│  ├─ Role-based permissions                                 │
│  ├─ Request validation                                     │
│  └─ Secure file storage                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Summary

```
User Action → Frontend Function → API Request → Database Query → Response → UI Update

1. Load Module
   Click "MOUs" → loadModuleData() → GET /structure + /data → MySQL SELECT → Display table

2. Create Record
   Form submit → handleSave() → (upload file) + POST → INSERT → Refresh table

3. Edit Record
   Click Edit → Modal opens → Form submit → (upload file) + PUT → UPDATE → Refresh table

4. Delete Record
   Click Delete → Confirm → (delete file) + DELETE → DELETE → Refresh table

5. Pagination
   Click Next → loadModuleData(page+1) → GET /data?page=2 → MySQL SELECT → Display new page
```

This is the complete data flow architecture of your admin dashboard system!
