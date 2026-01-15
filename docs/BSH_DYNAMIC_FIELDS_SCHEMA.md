# BSH Dynamic Fields Schema Design

## ✅ **COMPLETE**: Dynamic Form Fields Based on Database Schemas

The BSH admin dashboard now has **comprehensive dynamic form field configurations** for all three modules, designed based on their exact database schemas and optimized for user experience.

---

## 📋 **Module Field Configurations**

### **1. 📚 Syllabus Module** - `bsh_syllabus`

**Database Schema:**
```sql
-- Fields: id, type, title, fileUrl, academic_year
```

**Dynamic Form Configuration:**
```typescript
'syllabus': {
  tableName: 'bsh_syllabus',
  displayField: 'title',
  fields: [
    {
      name: 'title',
      label: 'Course Title',
      type: 'text',
      placeholder: 'e.g., Engineering Physics I',
      required: true,
      size: 'full',
      description: 'Enter the course or subject title'
    },
    {
      name: 'type',
      label: 'Course Code/Type',
      type: 'text',
      placeholder: 'e.g., PHY-101, CHEM-201',
      required: true,
      size: 'half',
      description: 'Enter the course code or type'
    },
    {
      name: 'academic_year',
      label: 'Academic Year',
      type: 'text',
      placeholder: 'e.g., 2024-2025',
      required: true,
      size: 'half',
      description: 'Enter the academic year in YYYY-YYYY format'
    },
    {
      name: 'fileUrl',
      label: 'Syllabus PDF',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.doc,.docx',
      description: 'Upload syllabus document (PDF, DOC, or DOCX format, max 1MB)'
    }
  ],
  searchableFields: ['title', 'type', 'academic_year'],
  sortableFields: ['title', 'type', 'academic_year', 'created_at'],
  editableFields: ['title', 'type', 'academic_year', 'fileUrl']
}
```

---

### **2. 📸 Photo Gallery Module** - `bsh_photogallery`

**Database Schema:**
```sql
-- Fields: id, title, event_type, imageUrl, date, description, ordering
```

**Dynamic Form Configuration:**
```typescript
'photogallery': {
  tableName: 'bsh_photogallery',
  displayField: 'title',
  fields: [
    {
      name: 'title',
      label: 'Photo/Event Title',
      type: 'text',
      placeholder: 'e.g., Annual Science Exhibition',
      required: true,
      size: 'full',
      description: 'Enter the title of the photo or event'
    },
    {
      name: 'event_type',
      label: 'Event Type',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the type of event',
      options: [
        { value: 'Academic Event', label: 'Academic Event' },
        { value: 'Cultural Event', label: 'Cultural Event' },
        { value: 'Sports Event', label: 'Sports Event' },
        { value: 'Workshop', label: 'Workshop' },
        { value: 'Seminar', label: 'Seminar' },
        { value: 'Conference', label: 'Conference' },
        { value: 'Lab Activity', label: 'Lab Activity' },
        { value: 'Faculty Achievement', label: 'Faculty Achievement' },
        { value: 'Student Achievement', label: 'Student Achievement' },
        { value: 'Department Activity', label: 'Department Activity' }
      ]
    },
    {
      name: 'date',
      label: 'Event Date',
      type: 'date',
      required: true,
      size: 'half',
      description: 'Select the date when the event took place'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter a brief description of the event or photo...',
      required: false,
      size: 'full',
      rows: 3,
      description: 'Provide a brief description of the event or photo'
    },
    {
      name: 'ordering',
      label: 'Display Order',
      type: 'number',
      placeholder: '1',
      required: false,
      size: 'half',
      description: 'Enter display order (lower numbers appear first)'
    },
    {
      name: 'imageUrl',
      label: 'Photo/Image',
      type: 'file',
      required: true,
      size: 'half',
      accept: '.jpg,.jpeg,.png,.gif,.webp',
      description: 'Upload photo/image (JPG, PNG, GIF, WebP format, max 1MB)'
    }
  ],
  searchableFields: ['title', 'event_type', 'description'],
  sortableFields: ['title', 'event_type', 'date', 'ordering', 'created_at'],
  editableFields: ['title', 'event_type', 'date', 'description', 'ordering', 'imageUrl']
}
```

---

### **3. 🎓 FDPs/Guest Lectures Module** - `bsh_fdps`

**Database Schema:**
```sql
-- Fields: id, title, type, description, date, url, year
```

**Dynamic Form Configuration:**
```typescript
'fdps': {
  tableName: 'bsh_fdps',
  displayField: 'title',
  fields: [
    {
      name: 'title',
      label: 'FDP/Program Title',
      type: 'text',
      placeholder: 'e.g., Advanced Teaching Methodologies Workshop',
      required: true,
      size: 'full',
      description: 'Enter the title of the FDP, workshop, or guest lecture'
    },
    {
      name: 'type',
      label: 'Program Type',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Select the type of program',
      options: [
        { value: 'FDP', label: 'Faculty Development Program' },
        { value: 'Workshop', label: 'Workshop' },
        { value: 'Guest Lecture', label: 'Guest Lecture' },
        { value: 'Seminar', label: 'Seminar' },
        { value: 'Conference', label: 'Conference' },
        { value: 'Training Program', label: 'Training Program' },
        { value: 'Webinar', label: 'Webinar' },
        { value: 'Orientation Program', label: 'Orientation Program' }
      ]
    },
    {
      name: 'year',
      label: 'Academic Year',
      type: 'text',
      placeholder: 'e.g., 2024-2025',
      required: true,
      size: 'half',
      description: 'Enter the academic year'
    },
    {
      name: 'date',
      label: 'Program Date',
      type: 'date',
      required: true,
      size: 'half',
      description: 'Select the date of the program'
    },
    {
      name: 'description',
      label: 'Program Description',
      type: 'textarea',
      placeholder: 'Enter detailed description of the program, objectives, outcomes...',
      required: false,
      size: 'full',
      rows: 4,
      description: 'Provide detailed information about the program'
    },
    {
      name: 'url',
      label: 'Certificate/Document',
      type: 'file',
      required: false,
      size: 'half',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      description: 'Upload certificate, report, or documentation (PDF, DOC, Image format, max 1MB)'
    }
  ],
  searchableFields: ['title', 'type', 'year', 'description'],
  sortableFields: ['title', 'type', 'year', 'date', 'created_at'],
  editableFields: ['title', 'type', 'year', 'date', 'description', 'url']
}
```

---

## 🎨 **Dynamic Form Features**

### **Field Types & Rendering**

1. **Text Fields** (`type: 'text'`)
   - Single-line text inputs
   - Placeholders for guidance
   - Required field validation

2. **Select Dropdowns** (`type: 'select'`)
   - Pre-configured options
   - Categorical data selection
   - Event types, program types

3. **Date Fields** (`type: 'date'`)
   - Date picker interface
   - ISO date format handling
   - Date validation

4. **Textarea Fields** (`type: 'textarea'`)
   - Multi-line text input
   - Configurable row height
   - Rich descriptions

5. **Number Fields** (`type: 'number'`)
   - Numeric input validation
   - Display ordering controls

6. **File Upload Fields** (`type: 'file'`)
   - File type validation
   - Size limit enforcement (1MB)
   - Automatic replacement on edit
   - Automatic deletion on record delete

### **Form Layout & UX**

**Grid-Based Layout:**
- `size: 'full'` - Full width (12 columns)
- `size: 'half'` - Half width (6 columns)
- `size: 'third'` - One-third width (4 columns)

**Field Validation:**
- `required: true/false` - Required field marking
- File size validation (max 1MB)
- File type validation (.pdf, .doc, .jpg, etc.)
- Form submission validation

**User Guidance:**
- `placeholder` - Input guidance text
- `description` - Help text below field
- Field labels with required indicators

---

## 🔧 **Dynamic Form Generation Process**

### **1. Field Configuration Loading**
```typescript
// Dashboard calls structure API
GET /api/admin/departments/bsh/syllabus/structure

// API returns configured fields
{
  "source": "config",
  "fields": [...configuredFields],
  "searchableFields": [...],
  "sortableFields": [...],
  "editableFields": [...]
}
```

### **2. Form Rendering**
```typescript
// Dashboard dynamically generates form based on field config
configFields.map(field => {
  switch(field.type) {
    case 'text': return <Input {...field.props} />
    case 'select': return <Select options={field.options} />
    case 'date': return <DatePicker {...field.props} />
    case 'textarea': return <Textarea rows={field.rows} />
    case 'file': return <FileUpload accept={field.accept} />
    case 'number': return <NumberInput {...field.props} />
  }
})
```

### **3. Form Submission & Validation**
```typescript
// Automatic field validation based on config
const validation = {
  required: field.required ? 'This field is required' : undefined,
  fileSize: field.type === 'file' ? 'Max 1MB' : undefined,
  fileType: field.accept ? `Accepted: ${field.accept}` : undefined
}
```

---

## 📊 **Data Processing**

### **Search Functionality**
```typescript
searchableFields: ['title', 'type', 'academic_year']
// Enables search across title, type, and academic year fields
```

### **Sorting Options**
```typescript
sortableFields: ['title', 'type', 'academic_year', 'created_at']
// Allows sorting by any of these fields in list view
```

### **Editable Fields Control**
```typescript
editableFields: ['title', 'type', 'academic_year', 'fileUrl']
// Controls which fields appear in edit forms (excludes id, timestamps)
```

---

## 🚀 **Integration & Configuration**

### **Files Updated:**
✅ `/src/config/module-fields.ts` - BSH field configurations added
✅ `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts` - BSH module mappings updated
✅ `/src/app/api/admin/departments/[dept]/[module]/route.ts` - BSH module mappings updated
✅ `/src/app/api/admin/departments/[dept]/[module]/delete-file/route.ts` - BSH module mappings updated

### **Dynamic Form Benefits:**
- ✅ **Schema-Driven**: Form fields match exact database schemas
- ✅ **User-Friendly**: Intuitive field types and layouts
- ✅ **Validated**: Built-in validation for required fields and file constraints
- ✅ **Flexible**: Easy to modify field configurations without code changes
- ✅ **Consistent**: Same form generation logic across all modules
- ✅ **Professional**: Clean, organized forms with proper spacing and grouping

---

## 🎯 **User Experience**

### **Creating Records:**
1. **Guided Input**: Clear labels, placeholders, and help text
2. **Smart Validation**: Real-time validation with helpful error messages
3. **File Handling**: Drag-and-drop file uploads with progress indicators
4. **Layout Optimization**: Fields arranged in logical groups and sizes

### **Editing Records:**
1. **Pre-filled Forms**: Current values loaded automatically
2. **File Replacement**: Easy PDF/image replacement with old file auto-deletion
3. **Selective Editing**: Only editable fields shown (excludes system fields)
4. **Change Tracking**: Visual indicators for modified fields

### **Data Management:**
1. **Smart Search**: Search across relevant fields automatically
2. **Flexible Sorting**: Sort by any configured field
3. **List Optimization**: Display field automatically selected for best UX
4. **Bulk Operations**: Consistent actions across all record types

---

## ✅ **Implementation Status**

**Status**: ✅ **FULLY IMPLEMENTED**

All BSH modules now have:
- ✅ Dynamic form field configurations based on exact database schemas
- ✅ Professional form layouts with proper field types and validation
- ✅ Automatic file management with upload/replacement/deletion
- ✅ Search and sorting capabilities optimized for each module
- ✅ User-friendly interface with guidance text and validation

The BSH admin dashboard provides a **professional, schema-driven form experience** that's both powerful and easy to use! 🎉

---
*Dynamic field configuration completed on: ${new Date().toISOString().split('T')[0]}*
*Modules: syllabus, photogallery, fdps*
*Department: BSH (Basic Sciences & Humanities)*