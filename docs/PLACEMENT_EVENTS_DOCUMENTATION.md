# Placement Events Module - Complete Implementation Guide

## Overview
The Placement Events module allows placement administrators to manage recruitment events with PDF uploads for circulars and guidelines, along with external links to job portals.

## Database Schema

### Table: `placement_events`
```sql
CREATE TABLE IF NOT EXISTS placement_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  circular_url VARCHAR(500) COMMENT 'PDF file URL for circular',
  link VARCHAR(500) COMMENT 'External link (e.g., job portal, registration form)',
  guidelines_url VARCHAR(500) COMMENT 'PDF file URL for guidelines',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Fields Description
| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key, auto-incrementing |
| title | VARCHAR(255) | Event title (e.g., "TCS Recruitment Drive") |
| circular_url | VARCHAR(500) | URL to circular PDF file |
| link | VARCHAR(500) | External link (job portal, registration form) |
| guidelines_url | VARCHAR(500) | URL to guidelines PDF file |
| created_at | TIMESTAMP | Automatic record creation timestamp |
| updated_at | TIMESTAMP | Automatic record update timestamp |

## API Endpoints

### GET /api/placement/events
Fetch all placement events with optional sorting.

**Query Parameters:**
- `sort` (optional): Field to sort by (default: `created_at`)
- `order` (optional): Sort order - `ASC` or `DESC` (default: `DESC`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "TCS Recruitment Drive",
      "circular_url": "/uploads/placement_events/circular/tcs_circular.pdf",
      "link": "https://tcs.com/careers",
      "guidelines_url": "/uploads/placement_events/guidelines/tcs_guidelines.pdf",
      "created_at": "2026-01-12T10:00:00Z",
      "updated_at": "2026-01-12T10:00:00Z"
    }
  ],
  "count": 1
}
```

### POST /api/placement/events
Create a new placement event.

**Request Body:**
```json
{
  "title": "Infosys Hiring",
  "circular_url": "/uploads/placement_events/circular/infosys_circular.pdf",
  "link": "https://infosys.com/jobs",
  "guidelines_url": "/uploads/placement_events/guidelines/infosys_guidelines.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Placement event created successfully",
  "id": 2
}
```

### PUT /api/placement/events
Update an existing placement event.

**Request Body:**
```json
{
  "id": 1,
  "title": "Updated Event Title",
  "circular_url": "/uploads/placement_events/circular/updated_circular.pdf",
  "link": "https://updated-link.com",
  "guidelines_url": "/uploads/placement_events/guidelines/updated_guidelines.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Placement event updated successfully"
}
```

### DELETE /api/placement/events
Delete a placement event.

**Query Parameters:**
- `id` (required): Event ID to delete

**Response:**
```json
{
  "success": true,
  "message": "Placement event deleted successfully"
}
```

## Frontend Components

### Page: `/src/app/placement/dashboard/events/page.tsx`

**Features:**
- View all placement events in a paginated table
- Search events by title
- Add new events with form validation
- Edit existing events
- Delete events with confirmation
- Upload PDF files for circular and guidelines
- Paste external links (URLs)
- Download uploaded PDFs
- Open external links in new tab

**Key Functions:**
1. `fetchEvents()` - Fetches all events from API
2. `handleInputChange()` - Handles text input changes
3. `handleFileChange()` - Handles PDF file uploads
4. `uploadFile()` - Uploads files to `/api/upload`
5. `handleSubmit()` - Submits form for create/update
6. `handleEditClick()` - Loads event for editing
7. `handleDeleteClick()` - Deletes event with confirmation
8. `handleCancel()` - Cancels form and resets state

**UI Components Used:**
- `Card`, `CardHeader`, `CardTitle`, `CardContent` - Layout containers
- `Input` - Text and URL input fields
- `Button` - Action buttons
- Icons from `lucide-react`: FileUp, Edit2, Trash2, Plus, ArrowLeft, Download, ExternalLink

## Dynamic Fields Configuration

### File: `/src/lib/configs/placementEventsConfig.ts`

Defines the structure and validation rules for event fields:

```typescript
{
  name: 'title',
  label: 'Event Title',
  type: 'text',
  required: true,
  validation: { minLength: 3, maxLength: 255 }
}
```

**Available Field Types:**
- `text` - Simple text input
- `url` - URL input with validation
- `file` - File upload
- `email` - Email input
- `number` - Numeric input
- `date` - Date input
- `textarea` - Multi-line text

**Configuration Functions:**
- `validateField()` - Validates field value
- `getFields()` - Gets all fields
- `getField()` - Gets specific field by name
- `getRequiredFields()` - Gets required fields
- `getFileFields()` - Gets file upload fields

## File Upload Handling

### Upload Process
1. User selects PDF file through file input
2. Validation checks:
   - File type is `application/pdf`
   - File size ≤ 5MB
3. File is uploaded to `/api/upload` endpoint
4. API returns file URL (e.g., `/uploads/placement_events/circular/filename.pdf`)
5. URL is stored in database

### Folder Structure
```
/uploads/
  /placement_events/
    /circular/
      tcs_circular.pdf
      infosys_circular.pdf
    /guidelines/
      tcs_guidelines.pdf
      infosys_guidelines.pdf
```

## Form Fields

### Event Title (Required)
- **Type:** Text input
- **Min Length:** 3 characters
- **Max Length:** 255 characters
- **Placeholder:** "Enter event title (e.g., TCS Recruitment Drive)"

### Circular PDF (Optional)
- **Type:** File upload (PDF only)
- **Max Size:** 5MB
- **Folder:** `placement_events/circular`
- **Action:** Click to upload circular PDF

### External Link (Optional)
- **Type:** URL input
- **Placeholder:** "https://company.com/careers"
- **Validation:** Must be a valid URL
- **Action:** Opens in new tab when clicked

### Guidelines PDF (Optional)
- **Type:** File upload (PDF only)
- **Max Size:** 5MB
- **Folder:** `placement_events/guidelines`
- **Action:** Click to upload guidelines PDF

## Table Display

### Columns
1. **Title** - Event title
2. **Files** - Download buttons for circular and guidelines
3. **Link** - External link with "Open" button
4. **Actions** - Edit and delete buttons

### Features
- Search by title
- Download PDFs
- Open external links in new tab
- Edit any event
- Delete with confirmation

## Usage Instructions

### Creating an Event
1. Click "Add New Event" button
2. Fill in event title (required)
3. Optionally upload circular PDF
4. Optionally paste external link
5. Optionally upload guidelines PDF
6. Click "Create Event"

### Editing an Event
1. Click edit icon next to event
2. Update fields as needed
3. Upload new files if needed (optional)
4. Click "Update Event"

### Deleting an Event
1. Click delete icon next to event
2. Confirm deletion
3. Event is removed

### Searching Events
1. Type in search bar
2. Results filter by title in real-time

## Error Handling

### Validation Errors
- Title cannot be empty
- URL must be valid format
- PDF files only (no other formats)
- File size cannot exceed 5MB

### API Errors
- Network errors show toast notification
- Invalid data returns error message
- Database errors are logged to console

## Authentication
- Requires placement role (`user?.role === 'placement'`)
- Non-authenticated users are redirected to dashboard
- Uses `useAuth` hook from `@/lib/auth/AuthContext`

## Database Setup

Run the following SQL command to create the table:

```sql
CREATE TABLE IF NOT EXISTS placement_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  circular_url VARCHAR(500),
  link VARCHAR(500),
  guidelines_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_title (title),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Styling
- Primary color: Indigo (#4f46e5)
- Gradient headers: `from-indigo-500 to-indigo-600`
- Hover effects on interactive elements
- Responsive design for mobile and desktop
- Toast notifications for user feedback

## State Management
- React `useState` for local component state
- React `useEffect` for data fetching
- No external state management required

## Dependencies
- `next` - Framework
- `react` - UI library
- `lucide-react` - Icons
- `react-hot-toast` - Notifications
- Custom `Card`, `Input`, `Button` components
- Custom `useAuth` hook

## Notes
- All PDF file uploads are stored in `/uploads` directory
- URLs are stored in database for easy retrieval
- External links open in new tabs (`target="_blank"`)
- Timestamps are automatically managed by database
- Search is case-insensitive

## Future Enhancements
- Add event date/time fields
- Add event status (active/inactive)
- Add email notifications for new events
- Add event categories
- Add bulk upload functionality
- Add event preview/details page
- Add event analytics dashboard
