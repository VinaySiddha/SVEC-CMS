# Placement Events Module - Architecture & Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLACEMENT EVENTS MODULE                       │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────┐     ┌────────────────────┐     ┌──────────────────┐
│   Frontend Page    │────▶│   API Endpoints    │────▶│   MySQL Database │
│                    │     │                    │     │                  │
│ /dashboard/events  │     │ /api/placement/    │     │ placement_events │
│                    │◀────│ events             │◀────│ Table            │
└────────────────────┘     └────────────────────┘     └──────────────────┘
         │                           │
         │                           │
    Forms & UI                  CRUD Operations
    - Add Event                 - SELECT
    - Edit Event                - INSERT
    - Delete Event              - UPDATE
    - Search                     - DELETE
    - Download PDF
    - Open Links
```

## Data Flow Diagram

```
USER INTERACTION
       │
       ├─▶ Add Event Form
       │    └─▶ Validate Input
       │    └─▶ Upload Files
       │    └─▶ Submit to API
       │         └─▶ POST /api/placement/events
       │         └─▶ Database INSERT
       │         └─▶ Return Success
       │    └─▶ Show Toast Notification
       │    └─▶ Refresh Event List
       │
       ├─▶ View Events Table
       │    └─▶ GET /api/placement/events
       │    └─▶ Database SELECT
       │    └─▶ Display in Table
       │
       ├─▶ Edit Event
       │    └─▶ Load Event Data
       │    └─▶ Pre-fill Form
       │    └─▶ Update Fields
       │    └─▶ Upload New Files (optional)
       │    └─▶ Submit to API
       │         └─▶ PUT /api/placement/events
       │         └─▶ Database UPDATE
       │    └─▶ Refresh Table
       │
       ├─▶ Delete Event
       │    └─▶ Confirm Delete
       │    └─▶ Send DELETE request
       │         └─▶ DELETE /api/placement/events?id=X
       │         └─▶ Database DELETE
       │    └─▶ Refresh Table
       │
       ├─▶ Download PDF
       │    └─▶ Click Download Button
       │    └─▶ Browser Downloads File
       │
       └─▶ Open External Link
            └─▶ Click Open Button
            └─▶ New Tab Opens
```

## File Upload Flow

```
USER SELECTS PDF FILE
        │
        ▼
VALIDATION CHECK
    ├─ Is it PDF?
    ├─ Size < 5MB?
    └─ Valid file?
        │
        ├─ NO ──▶ Show Error Toast
        │
        └─ YES
            │
            ▼
    UPLOAD TO /api/upload
        │
        ├─ Endpoint receives file
        ├─ Saves to disk
        └─ Returns URL
            │
            ▼
    STORE URL IN STATE
        │
        ▼
    FORM SHOWS FILE NAME
```

## Component State Management

```
PlacementEventsPage Component

State Variables:
├─ events: PlacementEvent[]          // All events from DB
├─ dataLoading: boolean               // Fetch loading state
├─ isAddingNew: boolean               // Show form state
├─ editingId: number | null           // Currently editing ID
├─ searchTerm: string                 // Search filter
├─ formData: Partial<Event>           // Form field values
│   ├─ title: string
│   ├─ circular_url: string
│   ├─ link: string
│   └─ guidelines_url: string
└─ uploadedFiles: {                   // Uploaded files
    ├─ circular: File | null
    └─ guidelines: File | null
}

Effect Hooks:
├─ useEffect: Auth check on mount
└─ useEffect: Fetch events on mount
```

## Database Schema Diagram

```
placement_events Table
┌────────────────────────────────────────────┐
│ id (INT, PRIMARY KEY, AUTO_INCREMENT)      │
├────────────────────────────────────────────┤
│ title (VARCHAR(255), NOT NULL)             │
├────────────────────────────────────────────┤
│ circular_url (VARCHAR(500), NULLABLE)      │
├────────────────────────────────────────────┤
│ link (VARCHAR(500), NULLABLE)              │
├────────────────────────────────────────────┤
│ guidelines_url (VARCHAR(500), NULLABLE)    │
├────────────────────────────────────────────┤
│ created_at (TIMESTAMP, DEFAULT NOW)        │
├────────────────────────────────────────────┤
│ updated_at (TIMESTAMP, ON UPDATE)          │
└────────────────────────────────────────────┘

Indexes:
├─ PRIMARY KEY: id
├─ INDEX: idx_title (title)
└─ INDEX: idx_created_at (created_at)
```

## API Endpoint Flow

```
GET /api/placement/events
    │
    ▼
Query Parameters (optional):
├─ sort: field name (default: created_at)
└─ order: ASC or DESC (default: DESC)
    │
    ▼
Database Query:
SELECT * FROM placement_events ORDER BY {sort} {order}
    │
    ▼
Response:
{
  "success": true,
  "data": [Event, Event, ...],
  "count": number
}

─────────────────────────────────────

POST /api/placement/events
    │
    ▼
Request Body:
{
  "title": "Event Name",
  "circular_url": "URL",
  "link": "URL",
  "guidelines_url": "URL"
}
    │
    ▼
Validation:
├─ Title not empty?
└─ All data valid?
    │
    ▼
Database Insert:
INSERT INTO placement_events (...)
    │
    ▼
Response:
{
  "success": true,
  "message": "Event created",
  "id": newEventId
}

─────────────────────────────────────

PUT /api/placement/events
    │
    ▼
Request Body:
{
  "id": eventId,
  "title": "Updated Name",
  ...
}
    │
    ▼
Validation & Update:
UPDATE placement_events SET ... WHERE id = ?
    │
    ▼
Response:
{
  "success": true,
  "message": "Event updated"
}

─────────────────────────────────────

DELETE /api/placement/events?id=X
    │
    ▼
Validation:
└─ ID provided?
    │
    ▼
Database Delete:
DELETE FROM placement_events WHERE id = ?
    │
    ▼
Response:
{
  "success": true,
  "message": "Event deleted"
}
```

## UI Component Layout

```
┌──────────────────────────────────────────────┐
│         PLACEMENT EVENTS PAGE                │
├──────────────────────────────────────────────┤
│                                              │
│  [◀ Back] Placement Events        [Title]   │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  [Search box - Search events by title]      │
│                                              │
├──────────────────────────────────────────────┤
│          [+ Add New Event] Button            │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ EVENT FORM (if adding/editing)         │ │
│  ├────────────────────────────────────────┤ │
│  │ Title: [_____________________]         │ │
│  │ Circular: [Choose File] PDF           │ │
│  │ Link: [_____________________]         │ │
│  │ Guidelines: [Choose File] PDF         │ │
│  │ [Update] [Cancel]                     │ │
│  └────────────────────────────────────────┘ │
│                                              │
├──────────────────────────────────────────────┤
│ EVENTS TABLE (5 items shown)                 │
│ ┌──────────────────────────────────────────┐│
│ │ Title │ Files │ Link │ Actions          ││
│ ├──────────────────────────────────────────┤│
│ │ TCS   │[↓][↓] │[→]   │ [✎][🗑]         ││
│ │ IFS   │[↓]    │[→]   │ [✎][🗑]         ││
│ │ ACC   │[↓][↓] │ -    │ [✎][🗑]         ││
│ │ WPR   │ -     │[→]   │ [✎][🗑]         ││
│ │ HCL   │[↓][↓] │[→]   │ [✎][🗑]         ││
│ └──────────────────────────────────────────┘│
└──────────────────────────────────────────────┘

Legend:
[↓] = Download button
[→] = Open link button
[✎] = Edit button
[🗑] = Delete button
```

## Form Validation Rules

```
Title Field
├─ Required: YES
├─ Type: Text
├─ Min Length: 3
├─ Max Length: 255
├─ On Submit: Check not empty
└─ Error: "Title is required"

Link Field (URL)
├─ Required: NO
├─ Type: URL
├─ Pattern: Valid URL format
├─ On Submit: Check if filled, validate format
└─ Error: "Invalid URL format"

Circular PDF
├─ Required: NO
├─ Type: File (PDF only)
├─ Max Size: 5MB
├─ On Select: Check type & size
├─ On Submit: Upload if selected
└─ Error: "File must be PDF and < 5MB"

Guidelines PDF
├─ Required: NO
├─ Type: File (PDF only)
├─ Max Size: 5MB
├─ On Select: Check type & size
├─ On Submit: Upload if selected
└─ Error: "File must be PDF and < 5MB"
```

## Error Handling Flow

```
Error Occurs in Component
        │
        ├─▶ Validation Error
        │   └─ Show inline message or toast
        │
        ├─▶ File Upload Error
        │   └─ "Only PDF files allowed"
        │   └─ "File must be < 5MB"
        │
        ├─▶ Network Error
        │   └─ Try-catch in async functions
        │   └─ Show error toast
        │   └─ Log to console
        │
        ├─▶ API Error Response
        │   └─ Check response.json().success
        │   └─ Display result.error message
        │   └─ Show toast notification
        │
        └─▶ Database Error
            └─ API catches and returns 500
            └─ Frontend shows generic error
            └─ Console logs actual error
```

## Authentication & Authorization

```
Page Load
    │
    ▼
Check Auth Status
├─ isLoading?
│  └─ Show loading state
│
└─ isAuthenticated?
   ├─ NO ──▶ user.role !== 'placement'
   │        └─ Redirect to /placement/dashboard
   │
   └─ YES ──▶ user.role === 'placement'
             └─ Show events page
             └─ Allow CRUD operations
```

## File System Structure

```
Project Root
├─ src/
│  ├─ app/
│  │  ├─ placement/
│  │  │  └─ dashboard/
│  │  │     └─ events/
│  │  │        └─ page.tsx          ✓ Created
│  │  │
│  │  └─ api/
│  │     └─ placement/
│  │        └─ events/
│  │           └─ route.ts          ✓ Created
│  │
│  └─ lib/
│     └─ configs/
│        └─ placementEventsConfig.ts ✓ Created
│
├─ uploads/
│  └─ placement_events/
│     ├─ circular/                   ✓ Create this
│     └─ guidelines/                 ✓ Create this
│
├─ PLACEMENT_EVENTS_SCHEMA.sql       ✓ Created
├─ PLACEMENT_EVENTS_SAMPLE_DATA.sql  ✓ Created
├─ PLACEMENT_EVENTS_DOCUMENTATION.md ✓ Created
├─ PLACEMENT_EVENTS_QUICK_REFERENCE.md ✓ Created
└─ PLACEMENT_EVENTS_IMPLEMENTATION_CHECKLIST.md ✓ Created
```

## Request/Response Examples

### Create Event Request
```http
POST /api/placement/events HTTP/1.1
Content-Type: application/json

{
  "title": "TCS Recruitment Drive",
  "circular_url": "/uploads/placement_events/circular/tcs.pdf",
  "link": "https://tcs.com/careers",
  "guidelines_url": "/uploads/placement_events/guidelines/tcs_guide.pdf"
}
```

### Create Event Response
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Placement event created successfully",
  "id": 42
}
```

### Get Events Request
```http
GET /api/placement/events?sort=created_at&order=DESC HTTP/1.1
```

### Get Events Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    {
      "id": 42,
      "title": "TCS Recruitment Drive",
      "circular_url": "/uploads/placement_events/circular/tcs.pdf",
      "link": "https://tcs.com/careers",
      "guidelines_url": "/uploads/placement_events/guidelines/tcs_guide.pdf",
      "created_at": "2026-01-12T10:00:00Z",
      "updated_at": "2026-01-12T10:00:00Z"
    }
  ],
  "count": 1
}
```

## Performance Characteristics

```
Operation Timing (Expected)
─────────────────────────────
Fetch Events:        50-100ms
Create Event:        100-300ms (with file upload)
Update Event:        100-300ms (with file upload)
Delete Event:        50-100ms
Search/Filter:       < 10ms (client-side)
File Upload:         1-5s (depends on file size)

Scalability Limits
─────────────────────────────
< 100 events:     No pagination needed
100-1000 events:  Consider pagination
> 1000 events:    Implement pagination & lazy loading
```

---

**Created:** January 12, 2026
**Module:** Placement Events Management v1.0.0
**Status:** ✓ Complete & Ready for Deployment
