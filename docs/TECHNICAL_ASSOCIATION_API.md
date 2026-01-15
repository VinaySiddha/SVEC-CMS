# Technical Association API - CSE-AI

## Endpoint
```
/api/cseai/technical-association
```

## Overview
Comprehensive API for managing technical association activities and related data (coordinators, events, gallery) for CSE-AI department.

## Database Tables Used
- `cai_extracurricular_activities` - Main technical association activities
- `cai_activity_coordinators` - Activity coordinators/organizers
- `cai_activity_events` - Year-wise events and meetings
- `cai_activity_gallery` - Photo gallery for activities

---

## GET Requests

### 1. Fetch All Activities
Returns all active technical association activities.

**URL:**
```
GET /api/cseai/technical-association
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | No | Data type: `activities` (default), `coordinators`, `events`, `gallery` |
| activity_type | string | No | Filter by category (e.g., 'technical', 'workshop') |

**Response:**
```json
{
  "success": true,
  "type": "activities",
  "department": "cseai",
  "data": [
    {
      "id": 1,
      "activity_name": "Technical Talk Series",
      "category": "technical",
      "academic_year": "2024-25",
      "description": "Monthly technical talks by industry experts",
      "faculty_coordinator_name": "Dr. John Smith",
      "faculty_coordinator_designation": "Associate Professor",
      "image_url": "path/to/image.jpg",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-20T15:45:00Z"
    }
  ]
}
```

---

### 2. Fetch Coordinators
Get all coordinators or coordinators for a specific activity.

**URL:**
```
GET /api/cseai/technical-association?type=coordinators
GET /api/cseai/technical-association?type=coordinators&activity_id=1
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Must be `coordinators` |
| activity_id | number | No | Get coordinators for specific activity |

**Response:**
```json
{
  "success": true,
  "type": "coordinators",
  "department": "cseai",
  "data": [
    {
      "id": 1,
      "activity_id": 1,
      "name": "Mr. M Yesu Sekharam",
      "designation": "Assistant Professor",
      "role": "faculty_coordinator",
      "email": "yesu@example.com",
      "phone": "+91 9876543210",
      "order_seq": 1,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 3. Fetch Events
Get all events or events for a specific activity/year.

**URL:**
```
GET /api/cseai/technical-association?type=events
GET /api/cseai/technical-association?type=events&activity_id=1
GET /api/cseai/technical-association?type=events&academic_year=2024-25
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Must be `events` |
| activity_id | number | No | Get events for specific activity |
| academic_year | string | No | Filter by academic year (e.g., '2024-25') |

**Response:**
```json
{
  "success": true,
  "type": "events",
  "department": "cseai",
  "data": [
    {
      "id": 1,
      "activity_id": 1,
      "academic_year": "2024-25",
      "event_title": "Tech Talk: AI in Industry",
      "event_date": "2024-02-15",
      "description": "Expert discussion on AI applications",
      "file_url": "path/to/report.pdf",
      "image_url": "path/to/event.jpg",
      "created_at": "2024-01-20T10:30:00Z"
    }
  ]
}
```

---

### 4. Fetch Gallery
Get photo gallery images for activities.

**URL:**
```
GET /api/cseai/technical-association?type=gallery
GET /api/cseai/technical-association?type=gallery&activity_id=1
GET /api/cseai/technical-association?type=gallery&academic_year=2024-25
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Must be `gallery` |
| activity_id | number | No | Get gallery for specific activity |
| academic_year | string | No | Filter by academic year |

**Response:**
```json
{
  "success": true,
  "type": "gallery",
  "department": "cseai",
  "data": [
    {
      "id": 1,
      "activity_id": 1,
      "academic_year": "2024-25",
      "image_url": "path/to/gallery/image1.jpg",
      "image_title": "Tech Talk Group Photo",
      "description": "All participants in front of the auditorium",
      "order_seq": 1,
      "created_at": "2024-02-15T15:30:00Z"
    }
  ]
}
```

---

## POST Requests

### 1. Create Coordinator
Add a new coordinator to an activity.

**URL:**
```
POST /api/cseai/technical-association?type=coordinators
```

**Request Body:**
```json
{
  "activity_id": 1,
  "name": "Mr. M Yesu Sekharam",
  "designation": "Assistant Professor",
  "role": "faculty_coordinator",
  "email": "yesu@example.com",
  "phone": "+91 9876543210",
  "order_seq": 1
}
```

**Required Fields:**
- `activity_id` - Reference to parent activity
- `name` - Coordinator's full name
- `role` - One of: `faculty_coordinator`, `student_coordinator`, `co_coordinator`

**Optional Fields:**
- `designation` - Job title
- `email` - Contact email
- `phone` - Contact phone
- `order_seq` - Display order (default: 0)

**Response:**
```json
{
  "success": true,
  "type": "coordinators",
  "message": "Record created successfully",
  "id": 1
}
```

---

### 2. Create Event
Add a new event for an activity.

**URL:**
```
POST /api/cseai/technical-association?type=events
```

**Request Body:**
```json
{
  "activity_id": 1,
  "academic_year": "2024-25",
  "event_title": "Tech Talk: AI in Industry",
  "event_date": "2024-02-15",
  "description": "Expert discussion on AI applications",
  "file_url": "path/to/report.pdf",
  "image_url": "path/to/event.jpg"
}
```

**Required Fields:**
- `activity_id` - Reference to parent activity
- `academic_year` - Year (e.g., '2024-25')
- `event_title` - Event name/title

**Optional Fields:**
- `event_date` - Event date (YYYY-MM-DD)
- `description` - Event details
- `file_url` - Document/report URL
- `image_url` - Event photo URL

**Response:**
```json
{
  "success": true,
  "type": "events",
  "message": "Record created successfully",
  "id": 1
}
```

---

### 3. Create Gallery Image
Add a photo to activity gallery.

**URL:**
```
POST /api/cseai/technical-association?type=gallery
```

**Request Body:**
```json
{
  "activity_id": 1,
  "academic_year": "2024-25",
  "image_url": "path/to/gallery/image1.jpg",
  "image_title": "Tech Talk Group Photo",
  "description": "All participants in front of the auditorium",
  "order_seq": 1
}
```

**Required Fields:**
- `activity_id` - Reference to parent activity
- `image_url` - Image file URL/path

**Optional Fields:**
- `academic_year` - Year
- `image_title` - Photo caption
- `description` - Detailed description
- `order_seq` - Display order (default: 0)

**Response:**
```json
{
  "success": true,
  "type": "gallery",
  "message": "Record created successfully",
  "id": 1
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid data type"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to fetch technical association data",
  "error": "Database connection error"
}
```

---

## Usage Examples

### Fetch all technical association activities
```bash
curl "http://localhost:3000/api/cseai/technical-association"
```

### Fetch coordinators for activity ID 1
```bash
curl "http://localhost:3000/api/cseai/technical-association?type=coordinators&activity_id=1"
```

### Fetch events for 2024-25 academic year
```bash
curl "http://localhost:3000/api/cseai/technical-association?type=events&academic_year=2024-25"
```

### Create new coordinator
```bash
curl -X POST "http://localhost:3000/api/cseai/technical-association?type=coordinators" \
  -H "Content-Type: application/json" \
  -d '{
    "activity_id": 1,
    "name": "Mr. M Yesu Sekharam",
    "designation": "Assistant Professor",
    "role": "faculty_coordinator",
    "email": "yesu@example.com",
    "phone": "+91 9876543210"
  }'
```

### Fetch gallery images for activity 1
```bash
curl "http://localhost:3000/api/cseai/technical-association?type=gallery&activity_id=1"
```

---

## Integration with Admin Dashboard

The API integrates with the module-fields configuration:

**Configuration Location:** `/src/config/module-fields.ts`

**Modules Configured:**
- `extra-curricular` - Main activities
- `activity-coordinators` - Coordinators module
- `activity-events` - Events module
- `activity-gallery` - Gallery module

**Admin Dashboard Usage:**
```typescript
// Fetch activity modules
const activityData = await fetch('/api/admin/departments/cse-ai/activity-coordinators', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Create/update records through admin dashboard
const newCoordinator = await fetch('/api/admin/departments/cse-ai/activity-coordinators', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ /* coordinator data */ })
});
```

---

## Notes

- All timestamps are in UTC (ISO 8601 format)
- Database prefix for CSE-AI is `cai_`
- Activity status is filtered to 'active' records only for GET requests
- Coordinators are ordered by `order_seq` and `name` for consistent display
- Events are sorted by date (newest first)
- Gallery images are sorted by `order_seq` (display order)

---

**Status**: ✅ Complete - API ready for integration
**Last Updated**: 2024
**Department**: CSE-AI (cai_ prefix)
