# RSAC Items - Academic Calendars, Syllabus & Regulations

## Overview

This implementation fetches academic calendars, syllabus, and regulations data from the `rsac_items` table in the MySQL database. The system fetches data based on `degree` (UG/PG) and `type` (academic-calendar, syllabus, regulations).

## Features

✅ **Multi-Source Data Fetching**
- Fetches from both `academic_calendars` and `rsac_items` tables
- Prioritizes RSAC items (displayed first)
- Combines and displays data seamlessly
- Supports UG and PG categories

✅ **Flexible Filtering**
- Filter by degree: UG or PG
- Filter by type: academic-calendar, syllabus, regulations
- Soft delete support (excludes deleted_at records)
- Ordered by date (newest first)

✅ **Frontend Integration**
- Unified display for both data sources
- Automatic property mapping
- Responsive design
- Loading and error states

## Database Schema

### `rsac_items` Table

```sql
CREATE TABLE IF NOT EXISTS `rsac_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `content` TEXT NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `degree` ENUM('UG', 'PG') NOT NULL,
  `type` ENUM('syllabus', 'regulations', 'academic-calendar') NOT NULL,
  `posted_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_degree` (`degree`),
  INDEX `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Fields:**
- `id`: Unique identifier
- `date`: Release date (DATE)
- `content`: Title/description (TEXT)
- `link`: URL to document (VARCHAR)
- `degree`: UG or PG (ENUM)
- `type`: syllabus, regulations, or academic-calendar (ENUM)
- `posted_date`: Auto timestamp (DATETIME)
- `deleted_at`: Soft delete flag (NULL for active)

## File Structure

### Frontend Files

**`/src/pages/Academics.tsx`**
- Fetches from both `academic_calendars` and `rsac_items`
- Combines UG and PG data
- Dynamic display logic for both data sources
- Property mapping for unified rendering

### API Endpoints

**`/src/app/api/academics/rsac/route.ts`**

#### GET /api/academics/rsac
Fetch RSAC items with optional filtering

**Query Parameters:**
```
?degree=UG              - Filter by degree (UG or PG)
?type=academic-calendar - Filter by type
?degree=UG&type=syllabus - Combine filters
```

**Response:**
```json
{
  "success": true,
  "ug": [
    {
      "id": 1,
      "date": "2024-07-26",
      "content": "B.Tech II Year - III and IV Semesters Academic Calendar",
      "link": "https://example.com/calendar.pdf",
      "degree": "UG",
      "type": "academic-calendar",
      "posted_date": "2024-11-11T10:00:00.000Z"
    }
  ],
  "pg": [
    {
      "id": 2,
      "date": "2024-08-05",
      "content": "M.Tech 1st Year Academic Calendar",
      "link": "https://example.com/mtech-calendar.pdf",
      "degree": "PG",
      "type": "academic-calendar",
      "posted_date": "2024-11-11T10:00:00.000Z"
    }
  ],
  "total": {
    "ug": 5,
    "pg": 5
  },
  "items": [...all items...]
}
```

#### GET /api/academics/rsac?degree=UG
Fetch only UG items

**Response:**
```json
{
  "success": true,
  "ug": [...5 items...],
  "pg": [],
  "total": { "ug": 5, "pg": 0 },
  "items": [...5 items...]
}
```

#### GET /api/academics/rsac?type=academic-calendar
Fetch only academic calendars

**Response:**
```json
{
  "success": true,
  "ug": [...UG calendars...],
  "pg": [...PG calendars...],
  "total": { "ug": 3, "pg": 3 },
  "items": [...all calendars...]
}
```

#### POST /api/academics/rsac
Create a new RSAC item

**Request Body:**
```json
{
  "date": "2024-09-01",
  "degree": "UG",
  "type": "academic-calendar",
  "content": "I B.Tech Academic Calendar 2024-2025",
  "link": "https://example.com/calendar.pdf"
}
```

**Validation:**
- All fields required: date, degree, type, content, link
- Degree must be: UG or PG
- Type must be: syllabus, regulations, or academic-calendar

**Response:**
```json
{
  "success": true,
  "message": "RSAC item added successfully",
  "id": 11
}
```

## Implementation Steps

### Step 1: Seed Database

Run the seed script to populate RSAC items:

```bash
cd f:\svec-cms\migrations
node seed-rsac-items.js
```

**Sample Output:**
```
✅ Connected to database
📝 Seeding RSAC items...

📚 Inserting UG RSAC Items:
   ✅ [ACADEMIC-CALENDAR] B.Tech II Year - III and IV Semesters Academic Calendar
   ✅ [ACADEMIC-CALENDAR] III B.Tech Academic Calendar 2024-2025
   ✅ [ACADEMIC-CALENDAR] IV B.Tech Academic Calendar 2024-2025
   ✅ [SYLLABUS] B.Tech V23 Syllabus - All Programs
   ✅ [REGULATIONS] B.Tech V23 Regulations

🎓 Inserting PG RSAC Items:
   ✅ [ACADEMIC-CALENDAR] M.Tech 1st Year Academic Calendar
   ✅ [ACADEMIC-CALENDAR] MBA Academic Calendar 2024-2025
   ✅ [SYLLABUS] M.Tech V21 Syllabus - All Specializations
   ✅ [REGULATIONS] M.Tech V21 Regulations
   ✅ [REGULATIONS] MBA V21 Regulations

📊 Verification:
   UG Items: 5
   PG Items: 5

📋 Items by Type:
   [UG] academic-calendar: 3 items
   [UG] regulations: 1 items
   [UG] syllabus: 1 items
   [PG] academic-calendar: 2 items
   [PG] regulations: 2 items
   [PG] syllabus: 1 items

✅ RSAC items seeded successfully!
```

### Step 2: Start Dev Server

```bash
npm run dev
```

### Step 3: View Data

Navigate to `/academics` and click "Academic Calendars" tab to see combined data from both sources.

## Data Structure Mapping

The frontend maps properties from both data sources:

```javascript
// RsacItem
const isRsacItem = 'content' in calendar;
if (isRsacItem) {
  const title = calendar.content;      // Title from rsac_items
  const url = calendar.link;           // URL from rsac_items
}

// AcademicCalendar
else {
  const title = calendar.title;        // Title from academic_calendars
  const url = calendar.document_url;   // URL from academic_calendars
}
```

## Database Queries

### Get All UG Academic Calendars from RSAC

```sql
SELECT * FROM rsac_items 
WHERE degree = 'UG' 
AND type = 'academic-calendar' 
AND deleted_at IS NULL 
ORDER BY date DESC;
```

### Get All PG Syllabus from RSAC

```sql
SELECT * FROM rsac_items 
WHERE degree = 'PG' 
AND type = 'syllabus' 
AND deleted_at IS NULL 
ORDER BY date DESC;
```

### Get All Regulations

```sql
SELECT * FROM rsac_items 
WHERE type = 'regulations' 
AND deleted_at IS NULL 
ORDER BY degree, date DESC;
```

### Count Items by Type and Degree

```sql
SELECT degree, type, COUNT(*) as count 
FROM rsac_items 
WHERE deleted_at IS NULL 
GROUP BY degree, type 
ORDER BY degree, type;
```

### Get Recent 5 Items

```sql
SELECT * FROM rsac_items 
WHERE deleted_at IS NULL 
ORDER BY date DESC 
LIMIT 5;
```

## Adding New Items

### Via API (Programmatic)

```javascript
const newItem = {
  date: '2025-01-15',
  degree: 'UG',
  type: 'academic-calendar',
  content: 'B.Tech Supplementary Academic Calendar',
  link: 'https://example.com/supp-calendar.pdf'
};

const response = await fetch('/api/academics/rsac', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newItem)
});

const data = await response.json();
console.log(data); // { success: true, id: 11, message: "..." }
```

### Via Database (Direct SQL)

```sql
INSERT INTO rsac_items (date, degree, type, content, link) 
VALUES (
  '2025-01-15',
  'PG',
  'academic-calendar',
  'M.Tech Supplementary Academic Calendar',
  'https://example.com/mtech-supp-calendar.pdf'
);
```

## Updating Items

```sql
UPDATE rsac_items 
SET 
  content = 'Updated Title',
  link = 'https://new-url.pdf',
  date = CURDATE()
WHERE id = 1;
```

## Soft Deleting Items

```sql
UPDATE rsac_items 
SET deleted_at = CURRENT_TIMESTAMP 
WHERE id = 1;
```

## Restoring Soft-Deleted Items

```sql
UPDATE rsac_items 
SET deleted_at = NULL 
WHERE id = 1;
```

## Sample Data

### UG Items (5 items)
1. **Academic Calendar**: B.Tech II Year (III & IV Semesters)
2. **Academic Calendar**: III B.Tech (V & VI Semesters)
3. **Academic Calendar**: IV B.Tech (VII & VIII Semesters)
4. **Syllabus**: B.Tech V23 - All Programs
5. **Regulations**: B.Tech V23

### PG Items (5 items)
1. **Academic Calendar**: M.Tech 1st Year
2. **Academic Calendar**: MBA 2024-2025
3. **Syllabus**: M.Tech V21 - All Specializations
4. **Regulations**: M.Tech V21
5. **Regulations**: MBA V21

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Failed to fetch RSAC items" | Database connection issue | Check DB connection in .env |
| "No items showing" | Empty table | Run seed: `node seed-rsac-items.js` |
| "Type must be one of: ..." | Invalid type in POST | Use: syllabus, regulations, or academic-calendar |
| "Degree must be either UG or PG" | Invalid degree | Use only: UG or PG |

## Performance Optimization

### Database Indexes

```sql
-- Indexed on type for filtering
CREATE INDEX idx_type ON rsac_items(type);

-- Indexed on degree for filtering
CREATE INDEX idx_degree ON rsac_items(degree);

-- Indexed on deleted_at for soft delete queries
CREATE INDEX idx_deleted_at ON rsac_items(deleted_at);
```

### Caching Strategy

Consider implementing API response caching:

```typescript
// Cache RSAC items for 1 hour
response.headers.set('Cache-Control', 'public, max-age=3600');
```

## Future Enhancements

1. **Search**: Full-text search across content
2. **Filtering UI**: Advanced filters on frontend
3. **Sorting**: Sort by date, type, degree
4. **Pagination**: Handle large result sets
5. **Export**: Download filtered items as CSV/PDF
6. **Version History**: Track changes to items
7. **Bulk Upload**: Import items from CSV
8. **Notifications**: Alert users of new items

## Troubleshooting

### No data appearing

1. Check seed script ran successfully:
   ```bash
   node migrations/seed-rsac-items.js
   ```

2. Verify database has data:
   ```sql
   SELECT COUNT(*) FROM rsac_items WHERE deleted_at IS NULL;
   ```

3. Test API directly:
   ```bash
   curl http://localhost:3000/api/academics/rsac
   ```

### Wrong data showing

1. Check filters in API request:
   ```bash
   curl http://localhost:3000/api/academics/rsac?degree=UG&type=academic-calendar
   ```

2. Verify database values:
   ```sql
   SELECT DISTINCT degree, type FROM rsac_items;
   ```

### Data mixed from both sources

1. RSAC items are prioritized first (displayed before academic_calendars)
2. Both sources display if they have matching degree/type
3. Check combined data:
   ```bash
   curl http://localhost:3000/api/academics/calendars
   curl http://localhost:3000/api/academics/rsac
   ```

---

**Created**: November 11, 2025
**Version**: 1.0
**Status**: Production Ready
