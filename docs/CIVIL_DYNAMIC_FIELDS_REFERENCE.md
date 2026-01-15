# Civil Department Dynamic Fields Reference
*Based on AIML Admin Dashboard Implementation Pattern*

## Overview
This document provides the dynamic field configuration reference for Civil Engineering department tables, following the AIML admin dashboard implementation pattern. All tables are prefixed with `civil_` and have corresponding API endpoints.

## Table Structure Overview

### Core Civil Department Tables (8 modules)
1. **board_of_studies** (shared table)
2. **civil_consultancy** 
3. **civil_extra_curricular_activities**
4. **civil_newsletters**
5. **civil_physical_facilities**
6. **civil_syllabus**
7. **civil_technical_association**
8. **civil_workshops**

---

## Dynamic Fields Configuration

### 1. Board of Studies (`board_of_studies`)
**Table Structure**: `id`, `dept`, `name`, `designation`, `organization`, `position`
```typescript
'civil': {
  'board-of-studies': {
    tableName: 'board_of_studies',
    displayField: 'name',
    filterField: 'dept',
    filterValue: 'civil',
    fields: [
      {
        name: 'name',
        label: 'Member Name',
        type: 'text',
        required: true,
        size: 'half'
      },
      {
        name: 'designation',
        label: 'Designation',
        type: 'text',
        required: true,
        size: 'half'
      },
      {
        name: 'organization',
        label: 'Organization',
        type: 'text',
        required: false,
        size: 'half'
      },
      {
        name: 'position',
        label: 'Position',
        type: 'text',
        required: false,
        size: 'half'
      }
    ],
    editableFields: ['name', 'designation', 'organization', 'position']
  }
}
```

### 2. Consultancy (`civil_consultancy`)
**Table Structure**: `id`, `department`, `year`, `name`, `url`
```typescript
'civil': {
  'consultancy': {
    tableName: 'civil_consultancy',
    displayField: 'name',
    fields: [
      {
        name: 'year',
        label: 'Academic Year',
        type: 'text',
        required: true,
        placeholder: 'e.g., 2023-2024',
        size: 'half'
      },
      {
        name: 'name',
        label: 'Consultancy Title',
        type: 'text',
        required: true,
        placeholder: 'e.g., Consultancy Details',
        size: 'full'
      },
      {
        name: 'url',
        label: 'Document URL',
        type: 'file',
        required: false,
        accept: '.pdf,.doc,.docx',
        size: 'full'
      }
    ],
    editableFields: ['year', 'name', 'url']
  }
}
```

### 3. Extra-Curricular Activities (`civil_extra_curricular_activities`)
**Table Structure**: `id`, `department`, `year`, `name`, `url`
```typescript
'civil': {
  'extra-curricular-activities': {
    tableName: 'civil_extra_curricular_activities',
    displayField: 'name',
    fields: [
      {
        name: 'year',
        label: 'Academic Year',
        type: 'text',
        required: true,
        placeholder: 'e.g., 2023-2024',
        size: 'half'
      },
      {
        name: 'name',
        label: 'Activity Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., Technical Festival',
        size: 'full'
      },
      {
        name: 'url',
        label: 'Activity Document/Photo',
        type: 'file',
        required: false,
        accept: '.pdf,.doc,.docx,.jpg,.png',
        size: 'full'
      }
    ],
    editableFields: ['year', 'name', 'url']
  }
}
```

### 4. Newsletters (`civil_newsletters`)
**Table Structure**: `id`, `department`, `issue`, `date`, `url`
```typescript
'civil': {
  'newsletters': {
    tableName: 'civil_newsletters',
    displayField: 'issue',
    fields: [
      {
        name: 'issue',
        label: 'Issue',
        type: 'text',
        required: true,
        placeholder: 'e.g., December 2024',
        size: 'half'
      },
      {
        name: 'date',
        label: 'Publication Date',
        type: 'date',
        required: true,
        size: 'half'
      },
      {
        name: 'url',
        label: 'Newsletter PDF',
        type: 'file',
        required: true,
        accept: '.pdf',
        size: 'full',
        description: 'Upload newsletter PDF document'
      }
    ],
    editableFields: ['issue', 'date', 'url']
  }
}
```

### 5. Physical Facilities (`civil_physical_facilities`)
**Table Structure**: `id`, `department`, `category`, `name`, `description`
```typescript
'civil': {
  'physical-facilities': {
    tableName: 'civil_physical_facilities',
    displayField: 'name',
    fields: [
      {
        name: 'category',
        label: 'Facility Category',
        type: 'select',
        required: true,
        options: [
          { value: 'Class Timetable', label: 'Class Timetable' },
          { value: 'Class Room', label: 'Class Room' },
          { value: 'Laboratory', label: 'Laboratory' },
          { value: 'Infrastructure', label: 'Infrastructure' },
          { value: 'Equipment', label: 'Equipment' }
        ],
        size: 'half'
      },
      {
        name: 'name',
        label: 'Facility Name',
        type: 'text',
        required: true,
        placeholder: 'e.g., CAD & GIS Lab',
        size: 'full'
      },
      {
        name: 'description',
        label: 'Description/URL',
        type: 'textarea',
        required: false,
        placeholder: 'Description or URL to facility document/image',
        size: 'full'
      }
    ],
    editableFields: ['category', 'name', 'description']
  }
}
```

### 6. Syllabus (`civil_syllabus`)
**Table Structure**: `id`, `department`, `program`, `version`, `name`, `url`
```typescript
'civil': {
  'syllabus': {
    tableName: 'civil_syllabus',
    displayField: 'name',
    fields: [
      {
        name: 'program',
        label: 'Program',
        type: 'select',
        required: true,
        options: [
          { value: 'B.Tech', label: 'B.Tech' },
          { value: 'M.Tech(CS)', label: 'M.Tech (Construction)' },
          { value: 'M.Tech(SE)', label: 'M.Tech (Structural)' }
        ],
        size: 'half'
      },
      {
        name: 'version',
        label: 'Regulation Version',
        type: 'text',
        required: true,
        placeholder: 'e.g., V20, V18',
        size: 'half'
      },
      {
        name: 'name',
        label: 'Syllabus Title',
        type: 'text',
        required: true,
        placeholder: 'e.g., B.Tech - V20 Syllabus',
        size: 'full'
      },
      {
        name: 'url',
        label: 'Syllabus Document',
        type: 'file',
        required: true,
        accept: '.pdf',
        size: 'full',
        description: 'Upload syllabus PDF document'
      }
    ],
    editableFields: ['program', 'version', 'name', 'url']
  }
}
```

### 7. Technical Association (`civil_technical_association`)
**Table Structure**: `id`, `department`, `description`, `committee`, `images`
```typescript
'civil': {
  'technical-association': {
    tableName: 'civil_technical_association',
    displayField: 'committee',
    fields: [
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Description of technical association activities',
        size: 'full'
      },
      {
        name: 'committee',
        label: 'Committee Details',
        type: 'textarea',
        required: false,
        placeholder: 'Committee member details',
        size: 'full'
      },
      {
        name: 'images',
        label: 'Association Images',
        type: 'file',
        required: false,
        accept: '.jpg,.png,.jpeg',
        multiple: true,
        size: 'full',
        description: 'Upload association photos (multiple allowed)'
      }
    ],
    editableFields: ['description', 'committee', 'images']
  }
}
```

### 8. Workshops (`civil_workshops`)
**Table Structure**: `id`, `department`, `year`, `name`, `url`
```typescript
'civil': {
  'workshops': {
    tableName: 'civil_workshops',
    displayField: 'name',
    fields: [
      {
        name: 'year',
        label: 'Academic Year',
        type: 'text',
        required: true,
        placeholder: 'e.g., 2023-2024',
        size: 'half'
      },
      {
        name: 'name',
        label: 'Workshop Title',
        type: 'text',
        required: true,
        placeholder: 'e.g., Workshops organized during Academic Year',
        size: 'full'
      },
      {
        name: 'url',
        label: 'Workshop Document',
        type: 'file',
        required: false,
        accept: '.pdf,.doc,.docx',
        size: 'full',
        description: 'Upload workshop details document'
      }
    ],
    editableFields: ['year', 'name', 'url']
  }
}
```

---

## API Endpoints Pattern

### Required API Endpoints (Following AIML Pattern)
```
GET /api/civil/civil-board-of-studies?dept=civil
GET /api/civil/civil-consultancy?dept=civil  ✅ (exists)
GET /api/civil/civil-extra-curricular?dept=civil  ✅ (exists)
GET /api/civil/civil-newsletters?dept=civil  ✅ (exists)
GET /api/civil/civil-physical-facilities?dept=civil
GET /api/civil/civil-syllabus?dept=civil  ✅ (exists)
GET /api/civil/civil-technical-association?dept=civil
GET /api/civil/civil-workshops?dept=civil  ✅ (exists)
```

**Note**: ✅ = API endpoint already exists in `src/pages/api/`

---

## Implementation Example (Following AIML Pattern)

### Admin Dashboard Integration
```typescript
// In src/app/admin/dashboard/page.tsx
case 'civil':
  switch(selectedModule) {
    case 'consultancy':
      await loadModuleData('civil_consultancy');
      break;
    case 'workshops':
      await loadModuleData('civil_workshops');
      break;
    // ... other cases
  }
```

### Module Field Configuration (module-fields.ts)
```typescript
// In src/config/module-fields.ts
'civil': {
  'consultancy': {
    tableName: 'civil_consultancy',
    displayField: 'name',
    fields: [/* field definitions from above */],
    editableFields: ['year', 'name', 'url']
  },
  'workshops': {
    tableName: 'civil_workshops',
    displayField: 'name', 
    fields: [/* field definitions from above */],
    editableFields: ['year', 'name', 'url']
  }
  // ... other modules
}
```

---

## Field Types Reference

| Type | Usage | Properties |
|------|-------|------------|
| `text` | Single-line text input | `placeholder`, `required`, `size` |
| `textarea` | Multi-line text input | `placeholder`, `required`, `size` |
| `date` | Date picker | `required`, `size` |
| `file` | File upload | `accept`, `multiple`, `required`, `size` |
| `select` | Dropdown selection | `options[]`, `required`, `size` |

## Size Options
- `'full'` - Full width (100%)
- `'half'` - Half width (50%)

---

## Next Steps

1. **Add missing API endpoints** for modules that don't have them
2. **Update module-fields.ts** with Civil configuration
3. **Test admin dashboard** with Civil department
4. **Implement frontend views** following AIML pattern
5. **Add proper validation** and error handling

---

*This reference follows the same architectural pattern as AIML department for consistency and maintainability.*