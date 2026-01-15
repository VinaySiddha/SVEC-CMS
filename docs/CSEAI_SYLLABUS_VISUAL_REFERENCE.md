# CSEAI Syllabus Module - Visual Reference Guide

## 🎯 Database to Form Mapping

```
DATABASE COLUMNS          FORM FIELDS          FIELD TYPE
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  id (auto)          →  (Hidden/Auto)        Internal Key    │
│  type               →  Regulation Type      Dropdown        │
│  title              →  Syllabus Title       Text Input      │
│  fileUrl            →  Upload Document      File Upload     │
│  academic_year      →  Academic Year        Dropdown        │
│  created_at (auto)  →  (Hidden/Auto)        Timestamp       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Add Form - Visual Layout

```
╔═══════════════════════════════════════════════════════════════╗
║  ADD SYLLABUS                                            [X]   ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Regulation Type *              Academic Year *               ║
║  ┌─────────────────────┐        ┌─────────────────────┐       ║
║  │ R20 (2020)     ▼    │        │ 2024-25        ▼    │       ║
║  │ - R18 (2018)        │        │ - 2023-24          │       ║
║  │ - R20 (2020)   [✓]  │        │ - 2024-25      [✓]  │       ║
║  │ - R23 (2023)        │        │ - 2025-26          │       ║
║  │ - V20 (2020)        │        │ - 2026-27          │       ║
║  └─────────────────────┘        └─────────────────────┘       ║
║  Help: Select SVEC regulation   Help: Select academic year    ║
║                                                                 ║
║  ───────────────────────────────────────────────────────────  ║
║                                                                 ║
║  Syllabus Title *                                              ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ B.Tech CSE-AI - II Year Syllabus                        │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║  Help: Enter the title or name of the syllabus document       ║
║                                                                 ║
║  ───────────────────────────────────────────────────────────  ║
║                                                                 ║
║  Syllabus PDF Document *                                       ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ [📁 Choose File]    syllabus_2024-25.pdf          [X]  │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║  Help: Upload the syllabus document (PDF, DOC, or DOCX)      ║
║  Allowed: .pdf, .doc, .docx | Max: 50MB                       ║
║                                                                 ║
║  ───────────────────────────────────────────────────────────  ║
║                                                                 ║
║                            [Cancel]  [Save]                    ║
║                                                                 ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📊 List View - Visual Layout

```
╔════════════════════════════════════════════════════════════════════════════╗
║ SYLLABI                                              [+ Add Syllabus]      ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Search: [Search by title, regulation, year...]                            ║
║  Filter: Type: [All ▼] Year: [All ▼]  [Clear Filters]                     ║
║                                                                              ║
║  ┌─────────────────────────────────────────────────────────────────────┐   ║
║  │ Type │ Syllabus Title                      │ Year │ Actions        │   ║
║  ├──────┼─────────────────────────────────────┼──────┼────────────────┤   ║
║  │ R20  │ B.Tech CSE-AI - I Year              │ 24-25│ 📥 ✏️  🗑️     │   ║
║  ├──────┼─────────────────────────────────────┼──────┼────────────────┤   ║
║  │ R20  │ B.Tech CSE-AI - II Year Syllabus    │ 24-25│ 📥 ✏️  🗑️     │   ║
║  ├──────┼─────────────────────────────────────┼──────┼────────────────┤   ║
║  │ R20  │ B.Tech CSE-AI - III Year            │ 24-25│ 📥 ✏️  🗑️     │   ║
║  ├──────┼─────────────────────────────────────┼──────┼────────────────┤   ║
║  │ R20  │ B.Tech CSE-AI - IV Year             │ 24-25│ 📥 ✏️  🗑️     │   ║
║  ├──────┼─────────────────────────────────────┼──────┼────────────────┤   ║
║  │ R23  │ B.Tech CSE-AI Updated Curriculum    │ 25-26│ 📥 ✏️  🗑️     │   ║
║  └──────┴─────────────────────────────────────┴──────┴────────────────┘   ║
║                                                                              ║
║  Icons: 📥 Download | ✏️ Edit | 🗑️ Delete | ... More options              ║
║                                                                              ║
║  Showing 1-5 of 5 records                                                   ║
║                                                                              ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## ✏️ Edit Form - Visual Layout

```
╔═══════════════════════════════════════════════════════════════╗
║  EDIT SYLLABUS (ID: 2)                                  [X]   ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Regulation Type *              Academic Year *               ║
║  ┌─────────────────────┐        ┌─────────────────────┐       ║
║  │ R20 (2020)     ▼    │        │ 2024-25        ▼    │       ║
║  └─────────────────────┘        └─────────────────────┘       ║
║                                                                 ║
║  Syllabus Title *                                              ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ B.Tech CSE-AI - II Year Syllabus (Updated)              │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                 ║
║  Syllabus PDF Document *                                       ║
║  Current: syllabus_2024-25.pdf                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ [📁 Choose File]    [No file selected]              [X]  │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║  ✓ Leave empty to keep current file                           ║
║  ✓ Select new file to replace (old file auto-deleted)         ║
║                                                                 ║
║  ───────────────────────────────────────────────────────────  ║
║                                                                 ║
║                            [Cancel]  [Save]                    ║
║                                                                 ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🔄 Data Flow Diagram

### CREATE (Add New Syllabus)
```
┌──────────────────┐
│  Admin fills     │
│  form (4 fields) │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Client-side     │
│  validation      │
└────────┬─────────┘
         │ (Valid)
         ▼
┌──────────────────┐
│  POST to         │
│  /api/cai-       │
│  syllabus        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  FileManager     │
│  uploads file    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  DB: INSERT      │
│  new record      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  List refreshed  │
│  Success msg     │
└──────────────────┘
```

### UPDATE (Edit Syllabus)
```
┌──────────────────┐
│  Admin clicks    │
│  Edit button     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Form loads &    │
│  pre-populates   │
│  with data       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Admin modifies  │
│  one or more     │
│  fields          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Client-side     │
│  validation      │
└────────┬─────────┘
         │ (Valid)
         ▼
┌──────────────────┐
│  PUT to          │
│  /api/cai-       │
│  syllabus?id=X   │
└────────┬─────────┘
         │
         ▼ (If new file uploaded)
    ┌────────────────┐
    │ OLD FILE:      │
    │ Deleted by     │
    │ FileManager    │
    └────────┬───────┘
             │
             ▼
┌──────────────────┐
│  NEW FILE:       │
│  Uploaded &      │
│  stored          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  DB: UPDATE      │
│  record          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  List refreshed  │
│  Success msg     │
└──────────────────┘
```

### DELETE (Remove Syllabus)
```
┌──────────────────┐
│  Admin clicks    │
│  Delete button   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Confirmation    │
│  dialog shows    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Admin confirms  │
│  deletion        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  DELETE to       │
│  /api/cai-       │
│  syllabus?id=X   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  FileManager     │
│  deletes file    │
│  from storage    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  DB: DELETE      │
│  record          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  List refreshed  │
│  Success msg     │
└──────────────────┘
```

---

## 📋 Field Specifications Visual

### Field 1: Regulation Type
```
┌─────────────────────────────────────┐
│ Regulation Type (Required)          │
├─────────────────────────────────────┤
│ Type:       SELECT (dropdown)       │
│ Size:       HALF (50% width)        │
│ Options:    R18, R20, R23, V20     │
│ Default:    R20                     │
│ Validation: Must be from list       │
│ Database:   VARCHAR(10)             │
└─────────────────────────────────────┘
```

### Field 2: Syllabus Title
```
┌─────────────────────────────────────┐
│ Syllabus Title (Required)           │
├─────────────────────────────────────┤
│ Type:       TEXT (input)            │
│ Size:       FULL (100% width)       │
│ Placeholder: B.Tech CSE-AI - II...  │
│ Min Length: 5 characters            │
│ Max Length: 200 characters          │
│ Pattern:    Alphanumeric + basic    │
│ Database:   VARCHAR(200)            │
└─────────────────────────────────────┘
```

### Field 3: Academic Year
```
┌─────────────────────────────────────┐
│ Academic Year (Required)            │
├─────────────────────────────────────┤
│ Type:       SELECT (dropdown)       │
│ Size:       HALF (50% width)        │
│ Options:    2023-24 to 2026-27     │
│ Default:    2024-25                 │
│ Validation: Must be from list       │
│ Database:   VARCHAR(10)             │
└─────────────────────────────────────┘
```

### Field 4: File Upload
```
┌─────────────────────────────────────┐
│ Syllabus PDF Document (Required)    │
├─────────────────────────────────────┤
│ Type:       FILE (upload)           │
│ Size:       FULL (100% width)       │
│ Accept:     .pdf, .doc, .docx      │
│ Max Size:   50MB                    │
│ Features:   Auto cleanup on replace │
│ Database:   VARCHAR(500)            │
└─────────────────────────────────────┘
```

---

## 🎨 Responsive Breakpoints

### Desktop (1024px+)
```
Regulation Type (50%) | Academic Year (50%)
Syllabus Title (100%)
File Upload (100%)
```

### Tablet (768px-1023px)
```
Regulation Type (100%)
Academic Year (100%)
Syllabus Title (100%)
File Upload (100%)
```

### Mobile (< 768px)
```
Regulation Type (100%)
Academic Year (100%)
Syllabus Title (100%)
File Upload (100%)
```

---

## 🔍 Search & Filter Example

### Before Filter
```
Showing 5 syllabi:
1. R18 - B.Tech CSE-AI - I Year - 2023-24
2. R20 - B.Tech CSE-AI - II Year - 2024-25
3. R20 - B.Tech CSE-AI - III Year - 2024-25
4. R23 - B.Tech CSE-AI Updated - 2025-26
5. R20 - B.Tech CSE-AI - IV Year - 2024-25
```

### After Filter (Type: R20, Year: 2024-25)
```
Showing 3 syllabi:
2. R20 - B.Tech CSE-AI - II Year - 2024-25
3. R20 - B.Tech CSE-AI - III Year - 2024-25
5. R20 - B.Tech CSE-AI - IV Year - 2024-25
```

### After Search ("II Year")
```
Showing 1 syllabus:
2. R20 - B.Tech CSE-AI - II Year - 2024-25
```

---

## ✅ Validation States

### Valid Input
```
Regulation Type: R20 ✓
Title: B.Tech CSE-AI - II Year Syllabus ✓
Year: 2024-25 ✓
File: syllabus_2024-25.pdf ✓
Status: READY TO SAVE ✓
```

### Invalid Input
```
Regulation Type: R20 ✓
Title: "AI" ✗ (too short, min 5)
Year: 2024-25 ✓
File: (no file) ✗ (required)
Status: CANNOT SAVE ✗
Error: Title must be 5-200 chars | File is required
```

---

## 📊 Sorting Examples

### Sort by Title (A-Z)
```
1. B.Tech CSE-AI - I Year
2. B.Tech CSE-AI - II Year
3. B.Tech CSE-AI - III Year
4. B.Tech CSE-AI - IV Year
```

### Sort by Year (Newest)
```
1. B.Tech CSE-AI Updated (2025-26)
2. B.Tech CSE-AI - II Year (2024-25)
3. B.Tech CSE-AI - III Year (2024-25)
4. B.Tech CSE-AI - I Year (2023-24)
```

### Sort by Type (R18 → R23)
```
1. B.Tech CSE-AI - I Year (R18)
2. B.Tech CSE-AI - II Year (R20)
3. B.Tech CSE-AI - III Year (R20)
4. B.Tech CSE-AI Updated (R23)
```

---

## 🎯 User Journey

### New Syllabus Upload
```
Admin Dashboard
    ↓
[Click + Add Syllabus]
    ↓
Add Form Opens (4 fields)
    ↓
Fill: R20, Title, 2024-25, Upload PDF
    ↓
[Click Save]
    ↓
Validation passes
    ↓
File uploaded, DB record created
    ↓
Success message shown
    ↓
List refreshes with new syllabus
```

### Edit Existing Syllabus
```
List View
    ↓
[Click ✏️ Edit on syllabus]
    ↓
Form opens with pre-filled data
    ↓
Modify: Change title or year
    ↓
[Click Save]
    ↓
Validation passes
    ↓
DB updated, list refreshes
    ↓
Success message
```

### Download Syllabus
```
List View
    ↓
[Click 📥 Download icon]
    ↓
PDF/DOC file starts downloading
    ↓
Saved to user's computer
```

---

## 📞 Quick Lookup

| Need | Look Here |
|------|-----------|
| Field Types | Field Specifications Visual (above) |
| Form Layout | Add Form Visual Layout |
| List Display | List View Visual Layout |
| Data Flow | Data Flow Diagrams |
| Validation | Validation States |
| Sorting | Sorting Examples |
| Search | Search & Filter Example |
| Mobile Layout | Responsive Breakpoints |

This visual reference covers all aspects of the CSEAI Syllabus module design!