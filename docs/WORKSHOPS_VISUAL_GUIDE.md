# Workshops Module - Visual Field Layout Guide

## Admin Dashboard Card

```
┌────────────────────────────────────┐
│  ⚙️ Workshops                      │
│                                    │
│  Educational workshops             │
│                                    │
│  [View] [Create New] [Manage]     │
└────────────────────────────────────┘
```

## Create/Edit Workshop Form

### Mobile View (< 768px)

```
╔════════════════════════════════════╗
║          Add Workshop              ║
║  (or Edit Workshop)                ║
╠════════════════════════════════════╣
║                                    ║
║  Workshop Title *                  ║
║  ┌──────────────────────────────┐  ║
║  │ e.g., Machine Learning Fund. │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Category *                        ║
║  ┌──────────────────────────────┐  ║
║  │ Select category...         ▼│  ║
║  ├──────────────────────────────┤  ║
║  │ Internships                  │  ║
║  │ Conference Publications      │  ║
║  │ Certifications               │  ║
║  │ Skill Development            │  ║
║  │ Industry Training            │  ║
║  │ Academic                     │  ║
║  │ Professional                 │  ║
║  │ Other                        │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Year *                            ║
║  ┌──────────────────────────────┐  ║
║  │ e.g., 2024 or 2024-25       │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║  Workshop Document/Brochure        ║
║  ┌──────────────────────────────┐  ║
║  │ Choose File... (PDF, DOC...) │  ║
║  └──────────────────────────────┘  ║
║                                    ║
║      [Cancel]     [Save]           ║
║                                    ║
╚════════════════════════════════════╝
```

### Desktop View (≥ 768px)

```
╔═══════════════════════════════════════════════════════════════╗
║                    Add Workshop                               ║
║              (or Edit Workshop)                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Workshop Title *                                             ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ e.g., Machine Learning Fundamentals                    │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  Category *                       │  Year *                   ║
║  ┌────────────────────────────┐  │  ┌──────────────────────┐ ║
║  │ Select category...       ▼ │  │  │ e.g., 2024 or 2024-25│ ║
║  ├────────────────────────────┤  │  └──────────────────────┘ ║
║  │ Internships                │  │                             ║
║  │ Conference Publications    │  │                             ║
║  │ Certifications             │  │                             ║
║  │ Skill Development          │  │                             ║
║  │ Industry Training          │  │                             ║
║  │ Academic                   │  │                             ║
║  │ Professional               │  │                             ║
║  │ Other                      │  │                             ║
║  └────────────────────────────┘  │                             ║
║                                                               ║
║  Workshop Document/Brochure                                   ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ Choose File... (PDF, DOC, DOCX, JPG, JPEG, PNG)       │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║  Upload workshop document, brochure, or image (optional)      ║
║                                                               ║
║           [Cancel]              [Save/Update]                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

## Workshops List View

```
╔═══════════════════════════════════════════════════════════════╗
║  Workshops                                  [Search...] [+New] ║
╠═══════════════════════════════════════════════════════════════╣
║  Title                 │ Category                │ Year        ║
├────────────────────────┼───────────────────────┼─────────────┤
║  Machine Learning      │ Skill Development     │ 2024-25    [✎][🗑] ║
║  Fundamentals          │                       │            ║
├────────────────────────┼───────────────────────┼─────────────┤
║  AI Ethics in Practice │ Academic              │ 2024-25    [✎][🗑] ║
├────────────────────────┼───────────────────────┼─────────────┤
║  Industry Internship   │ Internships           │ 2024       [✎][🗑] ║
║  Prep                  │                       │            ║
├────────────────────────┼───────────────────────┼─────────────┤
║  Cloud Computing       │ Industry Training     │ 2024       [✎][🗑] ║
║  Essentials            │                       │            ║
├────────────────────────┼───────────────────────┼─────────────┤
║  Data Science Boot...  │ Professional          │ 2024-25    [✎][🗑] ║
╚═══════════════════════════════════════════════════════════════╝
```

## Field Type Reference

### Text Input (Title, Year)
```
Label:      Workshop Title *
Required:   Yes (indicated by *)
Placeholder: e.g., Machine Learning Fundamentals
Input:      ┌────────────────────────────┐
            │ User types here...          │
            └────────────────────────────┘
Validation: • Minimum 1 character required
            • Auto-trimmed whitespace
```

### Select Dropdown (Category)
```
Label:      Category *
Required:   Yes (indicated by *)
Default:    -- Select category --
Options:    • Internships
            • Conference Publications
            • Certifications
            • Skill Development
            • Industry Training
            • Academic
            • Professional
            • Other
Input:      ┌──────────────────────────┐
            │ Select category...     ▼ │
            └──────────────────────────┘
Behavior:   Click to expand dropdown
            Select option to populate
            Selected value shows in field
```

### File Upload (Document)
```
Label:      Workshop Document/Brochure
Required:   No (optional)
Accept:     .pdf, .doc, .docx, .jpg, .jpeg, .png
Max Size:   50 MB (server-side limit)
Input:      ┌──────────────────────────────┐
            │ Choose File...               │
            └──────────────────────────────┘
Upload:     [Click] → File Browser → Select → [Open]
Display:    After selection shows: "Selected: filename.pdf"
Removal:    [X] button to clear selection
Replace:    Select another file to replace
```

## Data Flow Diagram

```
┌─────────────────────┐
│ Admin Dashboard     │
│ Workshops Card      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Click "Manage" or "Create New"          │
│ Opens Modal with Dynamic Form           │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ GET /api/admin/departments/cse-ai/      │
│     workshops/structure                 │
│ ↓ Returns Field Configuration           │
│ [title, category, year, file_url...]   │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Render Dynamic Form Based on Config     │
│ • Responsive grid layout                │
│ • Validation rules applied              │
│ • Input types matched to field type     │
└──────────┬──────────────────────────────┘
           │
           ▼ (User fills form & submits)
┌─────────────────────────────────────────┐
│ POST/PUT /api/admin/departments/cse-ai/ │
│     workshops                           │
│ FormData: {title, category, year, ...}  │
│ Files: {file_url}                       │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Server Processing                       │
│ • Validate data                         │
│ • Save to cai_workshops table           │
│ • Handle file upload to /public/...     │
│ • Return success/error                  │
└──────────┬──────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Toast Notification                      │
│ "Workshop created successfully"         │
│ Form resets / Modal closes              │
│ List refreshes                          │
└─────────────────────────────────────────┘
```

## Field Grid System

### Full Width Layout
```
┌───────────────────────────────────────────────────┐
│   Field spanning entire form width                │
│   size: 'full' (100%)                             │
└───────────────────────────────────────────────────┘
```

### Half Width Layout (Side-by-Side)
```
┌──────────────────────┬──────────────────────┐
│ Field 1 (50%)        │ Field 2 (50%)        │
│ size: 'half'         │ size: 'half'         │
└──────────────────────┴──────────────────────┘
```

### Third Width Layout (Three Columns)
```
┌─────────────────┬─────────────────┬─────────────────┐
│ Field 1 (33%)   │ Field 2 (33%)   │ Field 3 (33%)   │
│ size: 'third'   │ size: 'third'   │ size: 'third'   │
└─────────────────┴─────────────────┴─────────────────┘
```

## Responsive Breakpoints

### Mobile (< 768px)
- All fields: 100% width (full)
- Dropdown/selects: Full width
- File input: Full width
- Single column layout

### Tablet (768px - 1024px)
- Text fields: 48% width (half) when possible
- Category & Year: Side-by-side (2 columns)
- File input: Full width

### Desktop (> 1024px)
- Optimal 2-column grid
- Comfortable spacing between fields
- File input: Full width
- All fields clearly visible

## Success & Error States

### Success Notification
```
┌─────────────────────────────────────────────────┐
│ ✓ Workshop created successfully                │
│   [X]                                           │
└─────────────────────────────────────────────────┘
```

### Error Notification
```
┌─────────────────────────────────────────────────┐
│ ✗ Failed to create workshop: Invalid file type │
│   [X]                                           │
└─────────────────────────────────────────────────┘
```

### Field Validation Error
```
Title *
┌──────────────────────────────┐
│                              │
└──────────────────────────────┘
⚠ This field is required
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move to next field |
| Shift+Tab | Move to previous field |
| Space | Toggle dropdown / Select option |
| Enter | Submit form |
| Esc | Close dropdown / Cancel form |

## Accessibility Features

- ✓ ARIA labels for all form fields
- ✓ Required fields marked with `*` and in label text
- ✓ Error messages associated with fields
- ✓ Keyboard navigation support
- ✓ High contrast for visibility
- ✓ Color-blind friendly (not relying on color alone)
- ✓ Focus indicators on interactive elements
- ✓ Semantic HTML structure
