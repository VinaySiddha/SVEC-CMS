# Activity Modules Quick Reference

## Overview
Three supporting modules for the extra-curricular activities system:
1. **activity-coordinators** - Manage activity coordinators
2. **activity-events** - Track activity events by year
3. **activity-gallery** - Photo gallery management

## Database Tables (by Department)

| Department | Coordinators Table | Events Table | Gallery Table |
|------------|-------------------|--------------|---------------|
| CSE-AI | cai_activity_coordinators | cai_activity_events | cai_activity_gallery |
| MBA | mba_activity_coordinators | mba_activity_events | mba_activity_gallery |
| AIML | aiml_activity_coordinators | aiml_activity_events | aiml_activity_gallery |
| CSE-DS | ds_activity_coordinators | ds_activity_events | ds_activity_gallery |

## Module Configuration Keys

```javascript
// Available in moduleFields config
'activity-coordinators'  // Coordinator management
'activity-events'        // Event tracking
'activity-gallery'       // Photo gallery
```

## Field Reference

### activity-coordinators Fields
```
├── activity_id (number, hidden)     - Reference to parent activity
├── name (text)                      - Coordinator's full name
├── designation (text)               - Job title/designation
├── role (select)                    - Role type dropdown
│   ├── faculty_coordinator
│   ├── student_coordinator
│   └── co_coordinator
├── email (email)                    - Contact email
├── phone (text)                     - Phone number
└── order_seq (number)               - Display order
```

**Searchable**: name, designation, role
**Sortable**: name, role, order_seq, created_at
**Editable**: All except activity_id

### activity-events Fields
```
├── activity_id (number, hidden)     - Reference to parent activity
├── academic_year (text)             - e.g., 2023-24
├── event_title (text)               - Event name
├── event_date (date)                - Event date picker
├── description (textarea)           - Event details (6 rows)
├── file_url (file)                  - Document upload
│   └── Accept: .pdf, .doc, .docx, .jpg, .jpeg, .png
└── image_url (file)                 - Event photo
    └── Accept: .jpg, .jpeg, .png, .gif, .webp
```

**Searchable**: event_title, academic_year
**Sortable**: event_title, event_date, academic_year, created_at
**Editable**: All except activity_id

### activity-gallery Fields
```
├── activity_id (number, hidden)     - Reference to parent activity
├── academic_year (text)             - Year of activity
├── image_url (file)                 - Gallery image (required)
│   └── Accept: .jpg, .jpeg, .png, .gif, .webp
├── image_title (text)               - Image caption/title
├── description (textarea)           - Image description (3 rows)
└── order_seq (number)               - Display sequence
```

**Searchable**: image_title, academic_year
**Sortable**: image_title, academic_year, order_seq, created_at
**Editable**: All except activity_id

## Usage in Dashboard

### In Admin Dashboard Forms
```typescript
// These modules are accessible via:
moduleFields[department]['activity-coordinators']
moduleFields[department]['activity-events']
moduleFields[department]['activity-gallery']

// Example: CSE-AI
moduleFields['cse-ai']['activity-coordinators']  // Load coordinators form
moduleFields['cse-ai']['activity-events']        // Load events form
moduleFields['cse-ai']['activity-gallery']       // Load gallery form
```

### Field Access Pattern
```typescript
// Access field metadata
const coordinatorFields = moduleFields[dept]['activity-coordinators'].fields
const eventFields = moduleFields[dept]['activity-events'].fields
const galleryFields = moduleFields[dept]['activity-gallery'].fields

// Get display field
const displayField = moduleFields[dept]['activity-coordinators'].displayField
// Returns: 'name'

// Get searchable fields
const searchable = moduleFields[dept]['activity-coordinators'].searchableFields
// Returns: ['name', 'designation', 'role']
```

## File Size Limitations

- **Event Document/Report**: All file types (PDF, DOC, images)
- **Event Photo**: Image formats only (JPG, PNG, GIF, WebP)
- **Gallery Image**: Image formats only (JPG, PNG, GIF, WebP)
- **Max Upload Size**: 5MB (configured in admin dashboard)

## Relationships

```
extra-curricular (parent)
├── activity-coordinators (multiple)
├── activity-events (multiple)
└── activity-gallery (multiple)
```

Each coordinator, event, or gallery image has a foreign key (activity_id) linking to the parent activity.

## Display Configuration

### Searchable Fields
Enable full-text search in data tables:
- **Coordinators**: Search by name, designation, role type
- **Events**: Search by event title or academic year
- **Gallery**: Search by image caption or year

### Sortable Fields
Enable column sorting in data tables:
- **Coordinators**: Sort by name, role, order, or creation date
- **Events**: Sort by title, date, year, or creation date
- **Gallery**: Sort by caption, year, order, or creation date

## Form Field Sizes

| Field Type | Default Size | Notes |
|-----------|--------------|-------|
| activity_id | half | Hidden from UI |
| Single select/text | full or half | Full width for names, half for short fields |
| Textarea | full | Multi-line input |
| Date picker | half | Only one date per record |
| File upload | full | Image/document uploads |
| Number fields | half | order_seq, academic_year |

## Implementation Status

| Component | Status | Location |
|-----------|--------|----------|
| Coordinator Module Config | ✅ Complete | module-fields.ts lines 1029+, 2869+, 4178+, 5410+ |
| Events Module Config | ✅ Complete | module-fields.ts lines 1106+, 2946+, 4255+, 5487+ |
| Gallery Module Config | ✅ Complete | module-fields.ts lines 1179+, 3019+, 4328+, 5560+ |
| Schema Design | ✅ Complete | EXTRA_CURRICULAR_TABLE_DESIGN.md |
| MySQL Tables | ❌ Pending | Need to create in database |
| API Routes | ❌ Pending | Need CRUD endpoints |
| UI Components | ❌ Pending | Need form/table/gallery components |

---
*Quick reference for activity-coordinators, activity-events, and activity-gallery modules*
