# CSEAI MOUs Dynamic Fields - Quick Reference

## 📊 Table Structure

```
Table: cai_mous
├── id (INT, PK, AI)
├── mou_with (VARCHAR 255) ✓
├── from_date (VARCHAR 50) ✓
├── to_date (VARCHAR 50) ✓
├── status (VARCHAR 100) ✓
└── created_at (TIMESTAMP)
```

---

## 🎯 Dynamic Fields Summary

| Field | Type | Required | Size | Notes |
|-------|------|----------|------|-------|
| **mou_with** | Text | ✓ | Full | Organization name |
| **from_date** | Text | ✓ | Half | Start date (YYYY-MM-DD or DD-MM-YYYY) |
| **to_date** | Text | ✓ | Half | End date (YYYY-MM-DD or DD-MM-YYYY) |
| **status** | Select | ✓ | Half | Active/Expired/Pending/Terminated/Renewed |

---

## ⚙️ Configuration

### File Location
```
/src/config/module-fields.ts
Lines: ~742-785
```

### Table Settings
```typescript
tableName: 'cai_mous'
displayField: 'mou_with'
searchableFields: ['mou_with', 'status']
sortableFields: ['mou_with', 'from_date', 'to_date', 'status', 'created_at']
editableFields: ['mou_with', 'from_date', 'to_date', 'status']
```

---

## 🔄 CRUD Operations

### Create
```
POST /api/admin/departments/cse-ai/mous
{
  "mou_with": "IIT Delhi",
  "from_date": "2024-01-15",
  "to_date": "2026-01-14",
  "status": "Active"
}
```

### Read
```
GET /api/admin/departments/cse-ai/mous?page=1&limit=10
GET /api/admin/departments/cse-ai/mous?search=IIT
GET /api/admin/departments/cse-ai/mous?sortBy=from_date&sortOrder=asc
```

### Update
```
PUT /api/admin/departments/cse-ai/mous?id=1
{
  "status": "Renewed",
  "to_date": "2027-01-14"
}
```

### Delete
```
DELETE /api/admin/departments/cse-ai/mous?id=1
```

---

## 📋 Status Options

| Status | Color | Meaning |
|--------|-------|---------|
| Active | 🟢 Green | MOU is currently valid |
| Expired | 🔴 Red | MOU period has passed |
| Pending | 🟡 Yellow | Awaiting approval/finalization |
| Terminated | ⚫ Gray | MOU ended before scheduled date |
| Renewed | 🔵 Blue | MOU has been renewed |

---

## ✅ Implementation Checklist

- [x] Field configuration added to module-fields.ts
- [x] Display field set to 'mou_with'
- [x] Searchable fields configured (mou_with, status)
- [x] Sortable fields configured (all key fields)
- [x] Editable fields configured (all except system fields)
- [x] Validation rules added for date format
- [x] Help text and descriptions added
- [x] Status dropdown with 5 options configured
- [x] Type definitions verified
- [x] No TypeScript compilation errors

---

## 🧪 Testing URLs

### Dashboard Module
```
http://localhost:3000/admin/cse-ai/mous
```

### API Endpoints
```
GET    /api/admin/departments/cse-ai/mous/structure
GET    /api/admin/departments/cse-ai/mous?page=1
POST   /api/admin/departments/cse-ai/mous
PUT    /api/admin/departments/cse-ai/mous?id=1
DELETE /api/admin/departments/cse-ai/mous?id=1
```

---

## 📝 Form Layout

```
┌────────────────────────────────────────────────┐
│ Add/Edit MOU                                  │
├────────────────────────────────────────────────┤
│                                               │
│ Organization/Institute *                      │
│ [________________________]                     │
│                                               │
│ MOU Start Date *     │ MOU End Date *         │
│ [______________]     │ [______________]       │
│                                               │
│ MOU Status *                                  │
│ [Select ▼]                                    │
│                                               │
│                  [Cancel] [Save]              │
└────────────────────────────────────────────────┘
```

---

## 🔐 Database Queries

### View all MOUs
```sql
SELECT * FROM cai_mous ORDER BY created_at DESC;
```

### Active MOUs only
```sql
SELECT * FROM cai_mous WHERE status = 'Active';
```

### MOUs expiring soon (30 days)
```sql
SELECT * FROM cai_mous 
WHERE status = 'Active' 
AND STR_TO_DATE(to_date, '%Y-%m-%d') 
BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);
```

### Status distribution
```sql
SELECT status, COUNT(*) as count 
FROM cai_mous 
GROUP BY status;
```

---

## 📞 Notes

- Date format can be YYYY-MM-DD or DD-MM-YYYY
- End date should be >= Start date
- All 4 fields are required for form submission
- Search works on organization name and status
- Sorting available on all major fields
- Auto-timestamps for created_at and updated_at (if present)

---

## ✨ Status: READY FOR PRODUCTION

**Configuration File**: `/src/config/module-fields.ts` (Lines 742-785)  
**Table**: `cai_mous`  
**Fields**: 4 dynamic fields configured  
**Documentation**: `CSEAI_MOUS_DYNAMIC_FIELDS.md`  
**Last Updated**: November 19, 2024
