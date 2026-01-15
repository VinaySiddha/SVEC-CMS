# BSH Admin Dashboard Configuration

## Overview
The BSH (Basic Sciences & Humanities) admin dashboard has been expanded with comprehensive module management for all BSH department sections.

## Updated Modules (12 total)

### 1. **Faculty** - `bsh_faculty`
- **Table**: `bsh_faculty`
- **Fields**: 
  - name (varchar)
  - department (varchar) - Chemistry, Physics, Mathematics, English, Library, Physical Education
  - qualification (varchar)
  - designation (varchar)
  - profileUrl (varchar) - PDF/document link
- **Description**: Faculty members and profiles

### 2. **Non-Teaching Faculty** - `bsh_non_teaching_faculty`
- **Table**: `bsh_non_teaching_faculty`
- **Fields**:
  - name (varchar)
  - designation (varchar)
- **Description**: Non-teaching staff members

### 3. **Board of Studies** - `bsh_board_of_studies`
- **Table**: `bsh_board_of_studies`
- **Fields**:
  - section (varchar) - Different BOS committees
  - title (varchar) - Meeting title
  - date (varchar) - Meeting date
  - url (varchar) - PDF document link
  - ordering (int) - Display order
- **Description**: Academic board meetings and decisions

### 4. **Results** - `bsh_results`
- **Table**: `bsh_results`
- **Fields**:
  - title (varchar)
  - url (varchar) - Results document PDF
  - year (varchar) - Academic year
- **Description**: Examination results and outcomes

### 5. **Activities** - `bsh_activities`
- **Table**: `bsh_activities`
- **Fields**:
  - section (varchar) - Activity category
  - title (varchar)
  - year (varchar)
  - url (varchar) - Activity document/evidence
- **Description**: Department activities and events

### 6. **Faculty Achievements** - `bsh_faculty_achievements`
- **Table**: `bsh_faculty_achievements`
- **Fields**:
  - section (varchar) - Award category
  - title (varchar) - Achievement description
  - url (varchar) - Certificate/document link
- **Description**: Faculty awards and recognitions

### 7. **Student Achievements** - `bsh_student_achievements`
- **Table**: `bsh_student_achievements`
- **Fields**:
  - section (varchar) - Achievement category
  - title (varchar)
  - url (varchar) - Certificate/document link
  - year (varchar)
- **Description**: Student awards and recognitions

### 8. **Laboratories** - `bsh_laboratories`
- **Table**: `bsh_laboratories`
- **Fields**:
  - lab_name (varchar) - Physics Lab, Chemistry Lab, etc.
  - description (text) - Laboratory description
  - url (varchar) - Document/evidence link
- **Description**: Laboratory facilities and resources

### 9. **Faculty Paper Presentations** - `bsh_faculty_paper_presentations`
- **Table**: `bsh_faculty_paper_presentations`
- **Fields**:
  - title (varchar)
  - year (varchar)
  - url (varchar) - Conference paper/proceedings
- **Description**: Faculty research publications and presentations

### 10. **Department Documents** - `bsh_department_documents`
- **Table**: `bsh_department_documents`
- **Fields**:
  - section (varchar) - fdp_workshops, or other categories
  - title (varchar)
  - url (varchar) - PDF document link
  - ordering (int)
- **Description**: FDPs, workshops, and other department documents

### 11. **Department Profile** - `bsh_department_profile`
- **Table**: `bsh_department_profile`
- **Fields**:
  - hod_name (varchar) - Head of Department
  - hod_image_url (varchar) - HOD photo
  - hod_designation (varchar)
  - hod_mobile (varchar)
  - hod_phone (varchar)
  - hod_email (varchar)
  - hod_message (text)
  - department_overview (text)
- **Description**: Department profile and HOD information

### 12. **Syllabus** - `bsh_syllabus` (NEW)
- **Table**: `bsh_syllabus`
- **Fields**:
  - type (varchar) - Course code or category (e.g., "PHYSICS-101", "CHEMISTRY-201")
  - title (varchar) - Course name
  - fileUrl (varchar) - Syllabus PDF document
  - academic_year (varchar) - e.g., "2024-2025"
- **Description**: Course curriculum and syllabus documents

## Database Changes

### New Table Created: `bsh_syllabus`
```sql
CREATE TABLE `bsh_syllabus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `fileUrl` varchar(255) DEFAULT NULL,
  `academic_year` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Admin Dashboard Integration

All modules are integrated into the super admin dashboard with:
- **Auto-generated forms** based on table structure
- **CRUD operations** (Create, Read, Update, Delete)
- **File upload support** for PDF documents
- **Auto-delete functionality** - Deletes associated files when records are deleted
- **Auto-replace functionality** - Replaces old files when records are updated
- **Pagination** and search capabilities
- **Data validation** and error handling

## Form Fields Configuration

The admin dashboard dynamically generates form fields based on the following rules:

1. **File Fields** - Automatically detected by naming pattern:
   - `*Url`, `*url`, `*URL`
   - `*file`, `*File`, `*FILE`
   - `*path`, `*Path`, `*PATH`
   - Rendered as file upload inputs

2. **Text Fields** - VARCHAR columns displayed as text inputs

3. **Text Areas** - TEXT columns displayed as textarea inputs

4. **Special Fields**:
   - `academic_year`, `year` - Text input for year selection
   - `section`, `type`, `category` - Text input or dropdown
   - `ordering` - Number input for display order

## File Management Features

✅ **Automatic File Deletion**
- When a record is deleted, all associated files are automatically removed from storage
- Safe deletion with error handling for missing files

✅ **Automatic File Replacement**
- When a record is updated with a new file, old files are automatically deleted
- Only supports local file URLs (HTTP/HTTPS links are preserved)

## API Endpoints

All modules use the generic admin API:
- **GET** `/api/admin/tables/[tableName]` - Fetch all records
- **POST** `/api/admin/tables/[tableName]` - Create new record
- **GET** `/api/admin/tables/[tableName]/[id]` - Fetch single record
- **PUT** `/api/admin/tables/[tableName]/[id]` - Update record
- **DELETE** `/api/admin/tables/[tableName]/[id]` - Delete record (with file cleanup)

## Usage in Public Pages

All BSH data is displayed on the public BSH department page with dropdowns for different content sections:

- **Faculty Profiles** - Teaching faculty by department, Non-teaching staff
- **Board of Studies** - BOS meetings grouped by section
- **Results** - Results since 2001
- **Activities** - Activities grouped by section
- **Faculty Achievements** - Achievements grouped by category
- **Student Achievements** - Student awards grouped by category
- **Laboratories** - Lab information grouped by lab name
- **Faculty Paper Presentations** - Research publications
- **FDPs/Workshops** - Professional development documents
- **Department Profile** - HOD information
- **Syllabus** - Course curriculum documents (NEW)

## Next Steps

1. Run database migration to create `bsh_syllabus` table
2. Add syllabus documents via admin dashboard
3. Implement syllabus section display on BSH department page
4. Test file upload/deletion functionality
