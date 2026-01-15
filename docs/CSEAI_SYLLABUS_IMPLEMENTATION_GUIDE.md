# CSEAI Syllabus Module - Implementation Guide

## 🎯 Quick Overview

The CSEAI Syllabus module manages academic syllabus documents for different regulations and academic years.

**Database Schema:**
- Table: `cai_syllabus`
- Columns: `id`, `type`, `title`, `fileUrl`, `academic_year`
- API: `GET /api/cai-syllabus`

**Dynamic Fields:** 4 fields for admin form
- Regulation Type (select dropdown)
- Syllabus Title (text input)
- Academic Year (select dropdown)
- Syllabus PDF Document (file upload)

---

## 📋 Implementation Steps

### Step 1: Update module-fields.ts

**File Location:** `/src/config/module-fields.ts`

**Action:** Replace lines 801-856 with the new configuration

**Old Configuration (to replace):**
```typescript
'syllabus': {
  tableName: 'cai_syllabus',
  displayField: 'subject_name',
  fields: [
    {
      name: 'subject_name',
      label: 'Subject Name',
      // ... (6 fields for old schema)
    }
  ],
  // ...
}
```

**New Configuration:**
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
        { value: 'R18', label: 'R18 (2018)' },
        { value: 'R20', label: 'R20 (2020)' },
        { value: 'R23', label: 'R23 (2023)' },
        { value: 'V20', label: 'V20 (2020)' }
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
        message: 'Title must be 5-200 characters with alphanumeric characters and basic punctuation'
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

**Why This Change?**
- Old config used `subject_name` field which doesn't exist in actual database
- New config matches actual database columns: `type`, `title`, `fileUrl`, `academic_year`
- Dropdown fields (type, academic_year) ensure data consistency
- Better matches SVEC syllabus management needs

---

### Step 2: Verify API Endpoint

**File Location:** `/src/pages/api/cai-syllabus.ts`

**Current Status:** ✅ Already correct!

**Verification Checklist:**
```
✅ GET endpoint returns: id, type, title, fileUrl, academic_year
✅ PUT endpoint supports updating all 4 fields
✅ DELETE endpoint removes database record and files
✅ FileManager automatically cleans up old files on update
```

**No Changes Needed** - API is already optimized

---

### Step 3: Admin Dashboard Integration

**Location:** Admin dashboard sidebar for CSEAI department

**Expected Features:**
1. **Add Syllabus Button**
   - Opens form with 4 dynamic fields
   - All fields required (marked with *)
   - File upload with type validation

2. **List View**
   - Columns: Type | Title | Academic Year | Actions
   - Search by title
   - Filter by type and academic year
   - Sort by any column
   - Download link to file

3. **Edit Syllabus**
   - Pre-populated form with current values
   - Can change regulation, title, year
   - Can replace file (old file auto-deleted)

4. **Delete Syllabus**
   - Confirmation dialog
   - Auto-deletes associated files
   - Shows success message

---

### Step 4: Testing

**Test Scenario 1: Add New Syllabus**
```
1. Click "Add Syllabus"
2. Fill form:
   - Regulation Type: R20
   - Title: B.Tech CSE-AI - II Year Syllabus
   - Academic Year: 2024-25
   - Upload file: syllabus_2024-25.pdf
3. Click "Save"
4. Verify record appears in list
5. Verify file was uploaded
```

**Test Scenario 2: Edit Syllabus**
```
1. Click "Edit" on existing syllabus
2. Change Title: "B.Tech CSE-AI - II Year Syllabus (Updated)"
3. Upload new file: syllabus_updated.pdf
4. Click "Save"
5. Verify title updated in list
6. Verify old file deleted (check file system)
7. Verify new file uploaded
```

**Test Scenario 3: Delete Syllabus**
```
1. Click "Delete" on syllabus
2. Confirm deletion
3. Verify record removed from list
4. Verify file deleted (check file system)
```

**Test Scenario 4: Search & Filter**
```
1. Search by title: "II Year" → shows only II Year syllabi
2. Filter by type: "R20" → shows only R20 regulation syllabi
3. Filter by year: "2024-25" → shows syllabi for that year
4. Sort by title (A-Z)
5. Sort by academic_year (newest first)
```

---

## 🔍 Troubleshooting

### Problem: Configuration not appearing in admin form

**Solution:**
1. Check `/src/config/module-fields.ts` line 801
2. Verify 'syllabus' key exists under 'cse-ai' department
3. Restart dev server: `npm run dev`
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem: File upload not working

**Solution:**
1. Check FileManager class exists at `/src/lib/fileManager.ts`
2. Verify file upload directory has write permissions
3. Check browser console for error messages
4. Check network tab to see file upload request status

### Problem: Dropdown options not showing

**Solution:**
1. Verify options array format: `{ value: '', label: '' }`
2. Check for syntax errors in module-fields.ts
3. Restart dev server
4. Check browser console for validation errors

### Problem: Search/filter not working

**Solution:**
1. Verify searchableFields array includes desired fields
2. Verify sortableFields array includes desired fields
3. Check admin dashboard component implements search/sort
4. Test API endpoint directly with query parameters

---

## 📊 Data Flow

### Add New Syllabus
```
Admin Form
   ↓
Field Validation (client)
   ↓
POST /api/cai-syllabus with FormData
   ↓
File uploaded & stored
   ↓
Database record created
   ↓
List view updated
   ↓
Success message
```

### Update Syllabus
```
Admin Form (pre-populated)
   ↓
Field Validation
   ↓
PUT /api/cai-syllabus?id=X with updated data
   ↓
If file changed:
  - Old file deleted by FileManager
  - New file uploaded & stored
   ↓
Database record updated
   ↓
List view updated
   ↓
Success message
```

### Delete Syllabus
```
Confirmation Dialog
   ↓
Admin confirms
   ↓
DELETE /api/cai-syllabus?id=X
   ↓
FileManager cleanup (deletes files)
   ↓
Database record deleted
   ↓
List view updated
   ↓
Success message
```

---

## 📝 Field Reference

| Field | Type | Required | Size | Options | Validation |
|-------|------|----------|------|---------|-----------|
| type | select | ✅ | half | R18, R20, R23, V20 | Dropdown only |
| title | text | ✅ | full | - | 5-200 chars, alphanumeric |
| academic_year | select | ✅ | half | 2023-24, 2024-25, etc | Dropdown only |
| fileUrl | file | ✅ | full | .pdf, .doc, .docx | File type & size |

---

## 🎨 Form Layout

### Desktop View
```
┌─────────────────────────────────────────┐
│ Regulation Type    │ Academic Year       │
│ [R20 ▼            │ [2024-25 ▼         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Syllabus Title                           │
│ [B.Tech CSE-AI - II Year Syllabus......] │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Syllabus PDF Document                   │
│ [Choose File] syllabus_2024-25.pdf      │
└─────────────────────────────────────────┘
```

### Mobile View
```
┌────────────────────────────┐
│ Regulation Type             │
│ [R20 ▼                     │
└────────────────────────────┘
┌────────────────────────────┐
│ Academic Year              │
│ [2024-25 ▼                │
└────────────────────────────┘
┌────────────────────────────┐
│ Syllabus Title             │
│ [B.Tech CSE-AI - II Year..] │
└────────────────────────────┘
┌────────────────────────────┐
│ Syllabus PDF Document      │
│ [Choose File] syllabus.pdf │
└────────────────────────────┘
```

---

## 💾 Database Schema

### Table: cai_syllabus

```sql
CREATE TABLE cai_syllabus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(10) NOT NULL,           -- R18, R20, R23, V20
  title VARCHAR(200) NOT NULL,         -- Syllabus title
  fileUrl VARCHAR(500) NOT NULL,       -- File path/URL
  academic_year VARCHAR(10) NOT NULL,  -- 2024-25
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Indexes
```sql
CREATE INDEX idx_type ON cai_syllabus(type);
CREATE INDEX idx_academic_year ON cai_syllabus(academic_year);
CREATE INDEX idx_created_at ON cai_syllabus(created_at DESC);
```

---

## 🔄 Migration from Old Schema

If you have existing data in the old schema structure, follow these steps:

**Step 1: Backup Current Data**
```sql
CREATE TABLE cai_syllabus_backup AS SELECT * FROM cai_syllabus;
```

**Step 2: Migrate Data**
```sql
-- Map old fields to new format
UPDATE cai_syllabus
SET type = regulation, title = subject_name
WHERE type IS NULL;

-- Remove old columns (if applicable)
-- ALTER TABLE cai_syllabus DROP COLUMN subject_name, semester, course_code, credits;
```

**Step 3: Verify Data**
```sql
SELECT * FROM cai_syllabus LIMIT 10;
-- Verify all records have type, title, academic_year, fileUrl
```

---

## ✅ Verification Checklist

Before going live:

- [ ] Module-fields.ts updated with new configuration
- [ ] npm run build compiles without errors
- [ ] Admin sidebar shows "Syllabus" link for CSEAI
- [ ] Add form renders with 4 correct fields
- [ ] Add form validates required fields
- [ ] File upload works
- [ ] Database record created on save
- [ ] List view displays all syllabi
- [ ] Edit form pre-populates correctly
- [ ] File replacement works (old file deleted)
- [ ] Delete removes record and file
- [ ] Search by title works
- [ ] Filter by type works
- [ ] Filter by year works
- [ ] Sort by any column works
- [ ] No console errors or warnings
- [ ] No TypeScript lint errors

---

## 📞 Support

**Documentation Files:**
1. `CSEAI_SYLLABUS_DYNAMIC_FIELDS.md` - Detailed field specifications
2. `CSEAI_SYLLABUS_CONFIG_SNIPPET.ts` - TypeScript configuration code
3. `CSEAI_SYLLABUS_IMPLEMENTATION_GUIDE.md` - This file

**Questions:**
1. Check the detailed specifications in CSEAI_SYLLABUS_DYNAMIC_FIELDS.md
2. Review the config snippet in CSEAI_SYLLABUS_CONFIG_SNIPPET.ts
3. Test using the troubleshooting guide above

**API Endpoint:** `/api/cai-syllabus`
**Configuration File:** `/src/config/module-fields.ts` (lines 801-856)