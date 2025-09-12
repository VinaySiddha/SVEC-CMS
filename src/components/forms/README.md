# SVEC-CMS Data Management Forms

This directory contains comprehensive CRUD (Create, Read, Update, Delete) forms for managing all college data based on the database schema. The forms are built with React Hook Form, Zod validation, and integrate with the MySQL database.

## 📋 Available Forms

### 🏢 Department Management
- **DepartmentInfoForm**: Manage department information, HOD details, vision, mission, and contact info
- **Fields**: Department code, full name, HOD name, image, vision, mission, about, contact details

### 🔬 Infrastructure Management
- **LaboratoryForm**: Manage laboratory information, equipment, software, and capacity details
- **Fields**: Lab name, code, capacity, usage, software, equipment, location, incharge

### 👨‍🏫 Faculty Management
- **FacultyProfileForm**: Manage faculty profiles, qualifications, and research interests
- **FacultyAchievementForm**: Track faculty awards, certifications, patents, and recognitions
- **Fields**: Name, designation, qualification, experience, achievements, documents

### 🎓 Student Management
- **StudentAchievementForm**: Track student awards, competitions, and accomplishments
- **PlacementForm**: Manage student placement records and company details
- **Fields**: Student details, achievement/placement info, companies, packages

### 📚 Academic Activities
- **WorkshopForm**: Manage workshop details, schedules, resource persons, and participants
- **Fields**: Title, dates, venue, resource person, coordinator, participant details

### 📖 Library & Resources
- **LibraryResourceForm**: Manage library books, journals, and digital resources
- **HandbookForm**: Manage department handbooks and documentation
- **GalleryImageForm**: Manage department gallery images and events

## 🚀 Quick Start

### 1. Using Individual Forms

```tsx
import { DepartmentInfoForm } from '@/components/forms/DepartmentInfoForm';

function MyComponent() {
  const handleSuccess = () => {
    console.log('Data saved successfully');
    // Refresh data or redirect
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    // Close modal or redirect
  };

  return (
    <DepartmentInfoForm
      dept="cse" // Optional: pre-fill department
      initialData={existingData} // Optional: for editing
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
```

### 2. Using the Complete Dashboard

```tsx
import DataManagementDashboard from '@/app/dashboard/data-management/page';

// This provides a complete interface for all forms
function AdminPanel() {
  return <DataManagementDashboard />;
}
```

### 3. Import All Forms

```tsx
import {
  DepartmentInfoForm,
  LaboratoryForm,
  PlacementForm,
  FacultyAchievementForm,
  WorkshopForm,
  StudentAchievementForm,
  AVAILABLE_FORMS,
  getFormsByCategory
} from '@/components/forms';
```

## 🔧 Form Features

### ✅ Validation
- **Zod Schema Validation**: Each form has comprehensive validation rules
- **Real-time Validation**: Field-level validation with immediate feedback
- **File Upload Validation**: Type and size restrictions for uploaded files

### 📤 File Uploads
- **Image Upload**: Supports JPEG and PNG formats with preview
- **Document Upload**: Supports PDF files for certificates and documents
- **Auto-generated Filenames**: Prevents conflicts with timestamp-based naming

### 🎨 UI Components
- **Modern Design**: Built with shadcn/ui components
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during form submission
- **Toast Notifications**: Success and error messages

### 🔄 CRUD Operations
- **Create**: Add new records with file uploads
- **Read**: View existing data with pagination and filtering
- **Update**: Edit existing records with file replacement
- **Delete**: Soft delete with restoration capability

## 🗃️ Database Integration

### Tables Supported
All forms map to the following database tables from `schema.sql`:

- `department_info` - Department information and HOD details
- `laboratories` - Lab facilities and equipment
- `faculty_profiles` - Faculty personal and professional details
- `faculty_achievements` - Faculty awards and recognitions
- `student_achievements` - Student accomplishments and awards
- `placements` - Student placement records
- `workshops` - Workshop and training programs
- `department_library` - Library resources and books
- `handbooks` - Department handbooks and guides
- `gallery_items` - Photo gallery and events

### Status Management
All records support approval workflow:
- **pending** - Newly created, waiting for approval
- **approved** - Reviewed and approved by admin
- **rejected** - Reviewed but not approved

### Soft Delete
Records are soft-deleted (marked with `deleted_at` timestamp) rather than permanently removed.

## 🛠️ API Endpoints

Each form corresponds to REST API endpoints:

```
GET    /api/department-info          # List all departments
POST   /api/department-info          # Create new department
GET    /api/department-info/[dept]   # Get specific department
PUT    /api/department-info/[dept]   # Update department
DELETE /api/department-info/[dept]   # Delete department

GET    /api/laboratories             # List all labs
POST   /api/laboratories             # Create new lab
PUT    /api/laboratories/[id]        # Update lab
DELETE /api/laboratories/[id]        # Delete lab

# Similar patterns for all other resources...
```

## 📊 Usage Examples

### Creating a New Department

```tsx
const newDeptData = {
  dept: 'ai',
  dept_full_name: 'Artificial Intelligence',
  hod_name: 'Dr. Jane Smith',
  vision: 'To be a leading center for AI education...',
  mission: 'Provide quality education in AI...',
  contact_email: 'ai@college.edu'
};

<DepartmentInfoForm
  initialData={newDeptData}
  onSuccess={() => router.push('/departments')}
  onCancel={() => router.back()}
/>
```

### Editing an Existing Lab

```tsx
const existingLab = {
  id: 1,
  dept: 'cse',
  lab_name: 'Programming Lab',
  capacity: 60,
  softwares: 'Visual Studio, IntelliJ IDEA',
  // ... other fields
};

<LaboratoryForm
  initialData={existingLab}
  onSuccess={handleUpdateSuccess}
  onCancel={handleCancel}
/>
```

### Filtering and Pagination

```tsx
import { getDepartmentInfo } from '@/utils/database-utils';

// Get approved departments with pagination
const departments = await getDepartmentInfo(
  { status: 'approved' },
  { page: 1, limit: 10, sortBy: 'dept_full_name' }
);

// Get labs for specific department
const cselabs = await getLaboratories(
  { dept: 'cse', status: 'approved' },
  { page: 1, limit: 20 }
);
```

## 🔐 Security Features

- **Input Sanitization**: All inputs are validated and sanitized
- **File Type Validation**: Only allowed file types can be uploaded
- **Size Limitations**: File size restrictions prevent abuse
- **SQL Injection Protection**: Parameterized queries used throughout
- **CSRF Protection**: Forms include CSRF tokens where needed

## 🎯 Best Practices

### Form Handling
1. Always provide `onSuccess` and `onCancel` callbacks
2. Use `initialData` for editing existing records
3. Handle loading states in parent components
4. Show appropriate error messages

### File Uploads
1. Validate file types on both client and server
2. Provide image previews where applicable
3. Handle upload progress for large files
4. Clean up old files when updating

### Data Management
1. Use soft deletes for data integrity
2. Implement approval workflows for sensitive data
3. Maintain audit trails with timestamps
4. Regular backups of file uploads

## 🐛 Troubleshooting

### Common Issues

**Forms not submitting:**
- Check network connectivity
- Verify API endpoints are accessible
- Check browser console for JavaScript errors

**File uploads failing:**
- Verify file size is within limits
- Check file type is supported
- Ensure upload directory has write permissions

**Validation errors:**
- Review Zod schema requirements
- Check required fields are filled
- Verify date formats are correct

### Debug Mode
Set `NODE_ENV=development` to enable detailed error logging and validation messages.

## 📈 Future Enhancements

- [ ] Bulk import/export functionality
- [ ] Advanced search and filtering
- [ ] Real-time collaboration features
- [ ] Mobile app integration
- [ ] Automated approval workflows
- [ ] Integration with external systems

## 🤝 Contributing

When adding new forms:

1. Follow the existing form structure and naming conventions
2. Add comprehensive Zod validation schemas
3. Include proper TypeScript interfaces
4. Create corresponding API endpoints
5. Add database utility functions
6. Update this documentation

## 📞 Support

For technical support or questions about the forms:
- Check the troubleshooting section above
- Review the database schema in `schema.sql`
- Contact the development team for custom requirements
