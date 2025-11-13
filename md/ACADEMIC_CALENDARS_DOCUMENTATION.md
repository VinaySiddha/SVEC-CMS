# Academic Calendars Module Documentation

## Overview

The Academic Calendars module is a comprehensive system for managing academic calendars across different programs and departments. It allows administrators to:

- Create and manage academic calendars for different programs (B.Tech, M.Tech, M.B.A, M.C.A, Diploma)
- Track important academic dates (exams, holidays, registrations, etc.)
- Mark events as important for visibility
- Publish calendars to different departments
- Archive old calendars for record-keeping

## Database Schema

### `academic_calendars` Table

Stores the main academic calendar information:

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT PRIMARY KEY | Unique identifier |
| `title` | VARCHAR(255) NOT NULL | Calendar title |
| `description` | TEXT | Detailed description |
| `academic_year` | VARCHAR(9) NOT NULL | Academic year (e.g., 2024-2025) |
| `start_date` | DATE NOT NULL | Calendar start date |
| `end_date` | DATE NOT NULL | Calendar end date |
| `department` | VARCHAR(100) | Department name |
| `program_type` | ENUM | Program type (B.Tech, M.Tech, M.B.A, M.C.A, Diploma) |
| `document_url` | VARCHAR(512) | URL to calendar PDF/document |
| `status` | ENUM | Status (draft, published, archived) - default: draft |
| `remarks` | TEXT | Additional remarks |
| `created_by` | INT | User ID of creator |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |
| `deleted_at` | TIMESTAMP NULL | Soft delete timestamp |

**Indexes**: academic_year, program_type, status, department, start_date

### `academic_calendar_events` Table

Stores individual events within a calendar:

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT PRIMARY KEY | Unique identifier |
| `calendar_id` | INT NOT NULL | Reference to academic_calendar |
| `event_name` | VARCHAR(255) NOT NULL | Event name (e.g., "Final Exams Start") |
| `event_description` | TEXT | Event details |
| `event_date` | DATE NOT NULL | Event date |
| `event_type` | ENUM | Type (holiday, exam, semester, registration, orientation, other) |
| `is_important` | BOOLEAN | Mark as important (shows star icon) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |
| `deleted_at` | TIMESTAMP NULL | Soft delete timestamp |

**Indexes**: calendar_id, event_date, event_type

## API Endpoints

### Academic Calendars

#### GET `/api/exam-section/academic-calendars`
Fetch all active academic calendars with event count.

**Response**:
```json
[
  {
    "id": 1,
    "title": "B.Tech Academic Calendar 2024-2025",
    "academic_year": "2024-2025",
    "start_date": "2024-07-01",
    "end_date": "2025-06-30",
    "program_type": "B.Tech",
    "department": "Computer Science",
    "status": "published",
    "event_count": 15,
    "first_event_date": "2024-07-15"
  }
]
```

#### POST `/api/exam-section/academic-calendars`
Create a new academic calendar.

**Request**:
```json
{
  "title": "B.Tech Academic Calendar 2024-2025",
  "description": "Main academic calendar for B.Tech students",
  "academic_year": "2024-2025",
  "start_date": "2024-07-01",
  "end_date": "2025-06-30",
  "program_type": "B.Tech",
  "department": "Computer Science",
  "status": "draft",
  "remarks": "Initial draft"
}
```

**Required Fields**: title, academic_year, start_date, end_date, program_type

**Validation**:
- start_date must be before end_date
- All date fields must be valid dates

#### PUT `/api/exam-section/academic-calendars`
Update an existing academic calendar.

**Request**:
```json
{
  "id": 1,
  "title": "Updated Title",
  "status": "published"
}
```

#### DELETE `/api/exam-section/academic-calendars`
Soft delete an academic calendar.

**Request**:
```json
{
  "id": 1
}
```

### Calendar Events

#### GET `/api/exam-section/academic-calendars/[calendarId]/events`
Fetch all events for a specific calendar.

**Response**:
```json
[
  {
    "id": 1,
    "calendar_id": 1,
    "event_name": "Semester Begins",
    "event_description": "First day of classes",
    "event_date": "2024-07-15",
    "event_type": "semester",
    "is_important": true
  }
]
```

#### POST `/api/exam-section/academic-calendars/[calendarId]/events`
Create a new event for a calendar.

**Request**:
```json
{
  "event_name": "Mid-Term Exams",
  "event_description": "Mid-term examinations",
  "event_date": "2024-10-01",
  "event_type": "exam",
  "is_important": true
}
```

**Required Fields**: event_name, event_date

#### PUT `/api/exam-section/academic-calendars/[calendarId]/events`
Update an event.

**Request**:
```json
{
  "id": 1,
  "event_name": "Updated Event Name"
}
```

#### DELETE `/api/exam-section/academic-calendars/[calendarId]/events`
Delete an event.

**Request**:
```json
{
  "id": 1
}
```

## Frontend Features

### Main Page: `/exam-section/academic-calendars`

#### Calendar Management Section
- **Add Calendar Button**: Create new academic calendars
- **Form Fields**:
  - Title (required)
  - Academic Year (required)
  - Program Type (required) - Dropdown with B.Tech, M.Tech, M.B.A, M.C.A, Diploma
  - Department (optional)
  - Start Date (required) - Date picker
  - End Date (required) - Date picker
  - Status (optional) - Draft, Published, or Archived
  - Description (optional) - Textarea
  - Remarks (optional) - Textarea

#### Calendar List Section
Each calendar displays:
- Calendar title
- Date range (e.g., "Jul 1, 2024 - Jun 30, 2025")
- Program type badge
- Department (if set)
- Status badge with color coding:
  - **Draft**: Gray
  - **Published**: Green
  - **Archived**: Blue
- Event count
- Expandable event section with:
  - **List of all events** with:
    - Event type badge (color-coded)
    - Important star indicator
    - Event name and description
    - Event date
    - Edit/Delete buttons
  - **Add Event form** with:
    - Event name field
    - Event date picker
    - Event type dropdown
    - Important checkbox
    - Event description textarea

#### Expand/Collapse Feature
Click on any calendar to expand and view/manage events. Only one calendar can be expanded at a time.

## Event Types & Colors

| Type | Color | Use Case |
|------|-------|----------|
| Holiday | Red | University holidays, festivals |
| Exam | Orange | Examination periods |
| Semester | Purple | Semester start/end |
| Registration | Blue | Course registration windows |
| Orientation | Indigo | Student orientation programs |
| Other | Gray | Miscellaneous events |

## Status Options

| Status | Color | Use Case |
|--------|-------|----------|
| Draft | Gray | Work in progress |
| Published | Green | Active and visible |
| Archived | Blue | Past calendars for reference |

## Workflow Example

### 1. Create a New Calendar
1. Click "Add New Calendar" button
2. Fill in required fields:
   - Title: "B.Tech Academic Calendar 2024-2025"
   - Academic Year: "2024-2025"
   - Program Type: "B.Tech"
   - Start Date: "2024-07-01"
   - End Date: "2025-06-30"
3. Select status: "Draft"
4. Click "Save Calendar"

### 2. Add Events to Calendar
1. Click on the calendar to expand it
2. Scroll to "Add Event" section
3. Fill in event details:
   - Event Name: "Semester Begins"
   - Event Date: "2024-07-15"
   - Event Type: "Semester"
   - Mark as Important: Yes/No
4. Click "Add Event"
5. Event appears in the list above

### 3. Publish Calendar
1. Click edit (pencil icon) on calendar
2. Change status from "Draft" to "Published"
3. Click "Update Calendar"

### 4. Manage Events
- **Edit Event**: Click pencil icon next to event
- **Delete Event**: Click trash icon next to event
- **Important Events**: Show with ★ star icon

## Setup Instructions

### 1. Create Database Tables
```bash
node scripts/setup-academic-calendars-table.js
```

This creates:
- `academic_calendars` table with indexes
- `academic_calendar_events` table with indexes

### 2. Access the Module
Navigate to `/exam-section/academic-calendars` in your browser.

### 3. Start Creating Calendars
Follow the workflow example above to create and manage calendars.

## Features

✅ **Multi-Program Support**: Supports B.Tech, M.Tech, M.B.A, M.C.A, Diploma
✅ **Event Management**: Add multiple events to each calendar
✅ **Status Tracking**: Draft, Published, Archived
✅ **Event Categorization**: 6 event types with color coding
✅ **Important Events**: Mark events as important
✅ **Department Tracking**: Organize calendars by department
✅ **Soft Deletes**: Preserve data history
✅ **Expandable Design**: Clean, collapsible calendar interface
✅ **Real-time Updates**: Immediate UI updates on create/edit/delete
✅ **Error Handling**: Comprehensive error messages
✅ **Date Validation**: Ensures start_date < end_date

## Data Persistence

- All data is stored in MySQL database
- Calendars can be filtered by academic year, program type, department, or status
- Events are queried with efficient indexes on calendar_id, event_date, and event_type
- Soft delete implementation preserves data history

## Future Enhancements

Potential improvements:
- Export calendar as PDF
- Calendar sharing with other departments
- Email notifications for important events
- Calendar synchronization with external systems
- Recurring events support
- Holiday templates by state/country
- Calendar templates for quick setup
