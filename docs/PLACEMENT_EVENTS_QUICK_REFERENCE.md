# Placement Events Module - Quick Reference

## Module Structure

```
Placement Events Module
├── Frontend
│   └── /src/app/placement/dashboard/events/page.tsx
├── API
│   └── /src/app/api/placement/events/route.ts
├── Configuration
│   └── /src/lib/configs/placementEventsConfig.ts
└── Documentation
    ├── PLACEMENT_EVENTS_DOCUMENTATION.md
    ├── PLACEMENT_EVENTS_SCHEMA.sql
    └── PLACEMENT_EVENTS_QUICK_REFERENCE.md
```

## Quick Setup

### 1. Create Database Table
```sql
-- Run this SQL command in your MySQL database
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

### 2. Access the Module
- URL: `/placement/dashboard/events`
- Requires: `placement` role
- Features: CRUD operations, PDF uploads, link management

## Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Title | Text | ✓ Yes | Event name (3-255 chars) |
| Circular | PDF Upload | ✗ No | Max 5MB PDF file |
| Link | URL | ✗ No | External URL (job portal, etc) |
| Guidelines | PDF Upload | ✗ No | Max 5MB PDF file |

## API Endpoints

### Create Event
```bash
POST /api/placement/events
Content-Type: application/json

{
  "title": "TCS Recruitment",
  "circular_url": "/uploads/placement_events/circular/tcs.pdf",
  "link": "https://tcs.com/careers",
  "guidelines_url": "/uploads/placement_events/guidelines/tcs.pdf"
}
```

### Get All Events
```bash
GET /api/placement/events
GET /api/placement/events?sort=created_at&order=DESC
```

### Update Event
```bash
PUT /api/placement/events
Content-Type: application/json

{
  "id": 1,
  "title": "Updated Title",
  "circular_url": "...",
  "link": "...",
  "guidelines_url": "..."
}
```

### Delete Event
```bash
DELETE /api/placement/events?id=1
```

## Features

✓ Add new events with form validation
✓ Upload PDF circular and guidelines (5MB max each)
✓ Paste external links (job portals, registration forms)
✓ Edit existing events
✓ Delete events with confirmation
✓ Download uploaded PDFs
✓ Open external links in new tab
✓ Search events by title
✓ Responsive table layout
✓ Real-time form validation
✓ Toast notifications for feedback

## File Upload

**Supported Format:** PDF only
**Maximum Size:** 5MB per file
**Upload Folders:**
- Circular: `/uploads/placement_events/circular/`
- Guidelines: `/uploads/placement_events/guidelines/`

**Upload Process:**
1. User selects PDF file
2. Validation: type check + size check
3. Upload to `/api/upload` endpoint
4. API returns URL
5. URL stored in database

## UI Components

**Page Layout:**
- Header with navigation back to dashboard
- Search bar for filtering events
- Form section (shown when adding/editing)
- Events table with columns: Title, Files, Link, Actions

**Form:**
- Text input for title
- File upload inputs for PDFs
- URL input for external link
- Submit and cancel buttons

**Table:**
- Title column
- Files column (download buttons for PDFs)
- Link column (open external link)
- Actions column (edit/delete buttons)

## State Management

**Component State:**
- `events[]` - List of all events
- `formData{}` - Current form values
- `uploadedFiles{}` - Uploaded PDF files
- `editingId` - Currently editing event ID
- `isAddingNew` - Show form flag
- `searchTerm` - Search filter text
- `dataLoading` - Data fetch loading state

## Validation Rules

**Title:**
- Required: Yes
- Min length: 3 characters
- Max length: 255 characters

**Link (URL):**
- Required: No
- Pattern: Valid URL format

**PDF Files:**
- Required: No
- Type: application/pdf only
- Max size: 5MB

## Error Handling

| Error | Message | Action |
|-------|---------|--------|
| Title empty | "Title is required" | Prevent submission |
| Invalid URL | "Invalid URL format" | Show validation error |
| Large file | "File must be < 5MB" | Reject file |
| Wrong format | "Only PDF files allowed" | Reject file |
| Network error | Toast notification | Log error |

## Database Query Examples

### Get all events
```sql
SELECT * FROM placement_events ORDER BY created_at DESC;
```

### Get event by title
```sql
SELECT * FROM placement_events WHERE title LIKE '%TCS%';
```

### Get recent events
```sql
SELECT * FROM placement_events ORDER BY created_at DESC LIMIT 10;
```

### Count events
```sql
SELECT COUNT(*) as total FROM placement_events;
```

## Styling Details

**Colors:**
- Primary: Indigo (#4f46e5)
- Background: Gradient blue-indigo
- Text: Gray (#1f2937)
- Borders: Light gray (#d1d5db)

**Responsive:**
- Mobile: Single column layout
- Tablet: 2 columns
- Desktop: Full width table

**Hover Effects:**
- Table rows highlight on hover
- Buttons change shade on hover
- Icons change color on hover
- Links show underline on hover

## Common Tasks

### Add a new event with all fields
1. Click "Add New Event"
2. Enter title
3. Select circular PDF
4. Enter job portal URL
5. Select guidelines PDF
6. Click "Create Event"

### Update event title and guidelines
1. Click edit icon
2. Change title text
3. Select new guidelines PDF
4. Click "Update Event"

### Delete event
1. Click delete (trash) icon
2. Confirm deletion
3. Event is removed

### Download circular PDF
1. Find event in table
2. Click download icon under "Circular"
3. PDF opens/downloads

### Open job portal
1. Find event in table
2. Click "Open" link
3. Portal opens in new tab

## Performance

- Lazy loading not implemented (consider for large datasets)
- Search filters on client-side (frontend)
- Pagination not implemented (consider for 100+ records)
- Optimizations: Use React.memo, useMemo, useCallback for large lists

## Security

- File uploads validated on server
- Only PDF files accepted
- File size limited to 5MB
- Authentication required (placement role)
- CORS headers respected

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Files not uploading | Check file size < 5MB and is PDF |
| Events not showing | Clear browser cache, refresh page |
| Links not opening | Check URL format (https://...) |
| Search not working | Page refresh, check search term |
| Delete not working | Check browser console for errors |

## Configuration File

**Path:** `/src/lib/configs/placementEventsConfig.ts`

Exports:
- `PLACEMENT_EVENTS_CONFIG` - Full configuration object
- `validateField()` - Field validation function
- `getFields()` - Get all fields
- `getField()` - Get single field
- `getRequiredFields()` - Get required fields only
- `getFileFields()` - Get file upload fields only

## Integration Points

**Dependencies:**
- Next.js 13+ (App Router)
- React 18+
- TypeScript
- Lucide React icons
- React Hot Toast
- Custom UI components

**Integration with:**
- Authentication system (`useAuth`)
- File upload service (`/api/upload`)
- Database (`/lib/db`)
- Routing (`useRouter`, `useNavigation`)

## Next Steps

1. ✓ Create database table
2. ✓ Deploy API route
3. ✓ Deploy frontend page
4. Access at `/placement/dashboard/events`
5. Start adding events!

## Support

For issues or questions:
- Check PLACEMENT_EVENTS_DOCUMENTATION.md for detailed info
- Review SQL schema in PLACEMENT_EVENTS_SCHEMA.sql
- Check API endpoints in `/src/app/api/placement/events/route.ts`
- Review form logic in `/src/app/placement/dashboard/events/page.tsx`
