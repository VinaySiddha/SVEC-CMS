# Extra-Curricular Activities Table Design

## Overview
Based on the Social Services/Maitri Association content, this design covers various extra-curricular activities with coordinator information, events, and year-wise details.

## Table Structure

### Main Table: `cai_extracurricular_activities`

```sql
CREATE TABLE `cai_extracurricular_activities` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `activity_name` varchar(255) NOT NULL COMMENT 'Name of the activity (e.g., Maitri Association)',
  `category` varchar(100) NOT NULL COMMENT 'Category: social_service, cultural, sports, technical, etc.',
  `description` longtext COMMENT 'Detailed description of the activity/association',
  `academic_year` varchar(20) COMMENT 'Academic year (e.g., 2024-25)',
  `faculty_coordinator_id` int COMMENT 'FK to faculty table - Primary coordinator',
  `faculty_coordinator_name` varchar(255) COMMENT 'Name of faculty coordinator (denormalized)',
  `faculty_coordinator_designation` varchar(100) COMMENT 'Designation of coordinator',
  `status` enum('active', 'inactive', 'archived') DEFAULT 'active',
  `image_url` varchar(255) COMMENT 'Cover image for the activity',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_category` (`category`),
  KEY `idx_academic_year` (`academic_year`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Coordinators Table: `cai_activity_coordinators`

```sql
CREATE TABLE `cai_activity_coordinators` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `activity_id` int NOT NULL COMMENT 'FK to extracurricular_activities',
  `name` varchar(255) NOT NULL COMMENT 'Coordinator name',
  `designation` varchar(100) COMMENT 'Designation (e.g., Assistant Professor)',
  `role` varchar(100) COMMENT 'Role type: faculty_coordinator, student_coordinator, co_coordinator',
  `email` varchar(255) COMMENT 'Contact email',
  `phone` varchar(20) COMMENT 'Contact phone',
  `order_seq` int DEFAULT 1 COMMENT 'Display order',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  KEY `idx_activity` (`activity_id`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Events/Meetings Table: `cai_activity_events`

```sql
CREATE TABLE `cai_activity_events` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `activity_id` int NOT NULL COMMENT 'FK to extracurricular_activities',
  `academic_year` varchar(20) NOT NULL COMMENT 'Year the event was conducted',
  `event_title` varchar(255) COMMENT 'Event title or description',
  `event_date` date COMMENT 'Date the event was conducted',
  `description` longtext COMMENT 'Event details and outcomes',
  `file_url` varchar(255) COMMENT 'Report, document, or certificate link',
  `image_url` varchar(255) COMMENT 'Event photo/image',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  KEY `idx_activity` (`activity_id`),
  KEY `idx_academic_year` (`academic_year`),
  KEY `idx_event_date` (`event_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Gallery Table: `cai_activity_gallery`

```sql
CREATE TABLE `cai_activity_gallery` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `activity_id` int NOT NULL COMMENT 'FK to extracurricular_activities',
  `academic_year` varchar(20) COMMENT 'Year of the activity',
  `image_url` varchar(255) NOT NULL COMMENT 'Image URL',
  `image_title` varchar(255) COMMENT 'Image caption/title',
  `description` text COMMENT 'Image description',
  `order_seq` int DEFAULT 1 COMMENT 'Display order in gallery',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`activity_id`) REFERENCES `cai_extracurricular_activities`(`id`) ON DELETE CASCADE,
  KEY `idx_activity` (`activity_id`),
  KEY `idx_academic_year` (`academic_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

---

## Maitri Association Specific Fields

### Example Data for Maitri Association:

**Main Activity Record:**
```
activity_name: "Maitri Association"
category: "social_service"
description: "Maitri Association is a compassionate community where members, united by the spirit of 'Maitri' come together to contribute funds for those in need..."
academic_year: "2024-25"
faculty_coordinator_name: "Mr. M Yesu Sekharam"
faculty_coordinator_designation: "Assistant Professor"
status: "active"
```

**Coordinators:**
```
- Role: faculty_coordinator
  Name: "Mr. M Yesu Sekharam"
  Designation: "Assistant Professor"
  
- Role: student_coordinator
  Name: [Student Coordinator Name]
  Type: student_coordinators_list
```

**Events:**
```
academic_year: "2023-2024"
event_title: "List of Maitri Events Conducted"
description: "Events and activities conducted in 2023-2024"
file_url: "link_to_events_list"
```

---

## Field Mapping for Different Departments

All departments follow similar structure with table prefix changes:
- **CSE-AI**: `cai_extracurricular_activities`
- **CST**: `cst_extracurricular_activities`
- **MBA**: `mba_extracurricular_activities`
- **AIML**: `aiml_extracurricular_activities`
- **CSE-DS**: `ds_extracurricular_activities`
- **BSH**: `bsh_extracurricular_activities`

---

## Module Field Configuration

### For Admin Dashboard (module-fields.ts):

```typescript
'extra-curricular': {
  tableName: 'cai_extracurricular_activities',
  displayField: 'activity_name',
  fields: [
    {
      name: 'activity_name',
      label: 'Activity Name',
      type: 'text',
      placeholder: 'e.g., Maitri Association, Tech Club',
      required: true,
      size: 'full',
      description: 'Name of the extra-curricular activity/association'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Type of activity',
      options: [
        { value: 'social_service', label: 'Social Service' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'sports', label: 'Sports' },
        { value: 'technical', label: 'Technical' },
        { value: 'professional', label: 'Professional Society' },
        { value: 'community', label: 'Community Service' }
      ]
    },
    {
      name: 'academic_year',
      label: 'Academic Year',
      type: 'text',
      placeholder: 'e.g., 2024-25',
      required: false,
      size: 'half',
      description: 'Academic year of the activity'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter detailed description of the activity',
      required: true,
      size: 'full',
      rows: 6,
      description: 'Detailed information about the activity'
    },
    {
      name: 'faculty_coordinator_name',
      label: 'Faculty Coordinator Name',
      type: 'text',
      placeholder: 'e.g., Mr. M Yesu Sekharam',
      required: false,
      size: 'full',
      description: 'Name of the primary faculty coordinator'
    },
    {
      name: 'faculty_coordinator_designation',
      label: 'Coordinator Designation',
      type: 'text',
      placeholder: 'e.g., Assistant Professor',
      required: false,
      size: 'half',
      description: 'Designation of the coordinator'
    },
    {
      name: 'image_url',
      label: 'Activity Cover Image',
      type: 'file',
      required: false,
      size: 'half',
      accept: '.jpg,.jpeg,.png,.gif,.webp',
      description: 'Cover image for the activity'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      size: 'half',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' }
      ],
      description: 'Activity status'
    }
  ],
  searchableFields: ['activity_name', 'category', 'faculty_coordinator_name'],
  sortableFields: ['activity_name', 'category', 'academic_year', 'created_at'],
  editableFields: [
    'activity_name',
    'category',
    'academic_year',
    'description',
    'faculty_coordinator_name',
    'faculty_coordinator_designation',
    'image_url',
    'status'
  ]
}
```

---

## Key Features

✅ **Main Activity Management** - Track different extra-curricular activities  
✅ **Coordinator Management** - Multiple coordinators per activity with roles  
✅ **Event Tracking** - Year-wise events and activities conducted  
✅ **Gallery Support** - Store multiple photos per activity  
✅ **Flexible Structure** - Supports various activity types  
✅ **Department-wise Tables** - Separate tables for each department  
✅ **Sortable & Searchable** - Easy navigation in admin dashboard  
✅ **Status Tracking** - Mark activities as active/inactive/archived  

---

## Usage Example

For the Maitri Association:
1. Create main activity record with description and faculty coordinator
2. Add student coordinators as separate records
3. Track events conducted year-wise (2023-2024, etc.)
4. Maintain gallery of activity photos
5. Link documents/reports to events

---

## Notes

- All tables use `utf8mb4` charset for Unicode support
- Foreign keys maintain referential integrity
- Indexes on frequently queried columns for performance
- Timestamps track creation and modification
- Structure supports multiple departments via prefix convention
