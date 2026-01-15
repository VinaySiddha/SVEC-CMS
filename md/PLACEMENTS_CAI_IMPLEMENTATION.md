# Placements Module - Fetch from cai_placements Table

## Overview

The Placements section in the CSE-AI department now fetches data directly from the `cai_placements` table instead of relying on generic placement data.

## Changes Made

### 1. Database Schema (`schemas/svec_cms (1).sql`)

Added a new table `cai_placements` with the following structure:

```sql
CREATE TABLE `cai_placements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch` varchar(20) NOT NULL,
  `academic_year` varchar(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_url` varchar(500) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `dept` varchar(20) NOT NULL DEFAULT 'cse-ai',
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_batch` (`batch`),
  KEY `idx_academic_year` (`academic_year`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

**Table Fields:**
- `id`: Unique identifier (auto-increment)
- `batch`: Batch year (e.g., "2024", "2023")
- `academic_year`: Academic year in format YYYY-YY (e.g., "2024-25")
- `title`: Placement title/heading
- `description`: Detailed description of placements
- `file_url`: Path to placement document/PDF
- `gallery`: JSON array of gallery images with metadata
- `dept`: Department code (default: "cse-ai")
- `status`: Record status (active/inactive)
- `created_at`: Record creation timestamp
- `updated_at`: Record update timestamp

### 2. API Endpoint (`src/pages/api/cai-placements.ts`)

Created a new API endpoint to fetch placement data:

```typescript
GET /api/cai-placements
```

**Features:**
- Fetches all placements from `cai_placements` table
- Orders by batch and id in descending order (newest first)
- Returns JSON array of placement records
- Includes error handling and logging

### 3. Frontend Component (`src/pages/departments/CSEAI.tsx`)

**Updated:**

1. **State Management:** Added state hook for placements:
   ```typescript
   const [placements, setPlacements] = useState<any[]>([]);
   ```

2. **Data Fetching:** Added fetch call in useEffect:
   ```typescript
   fetch('/api/cai-placements')
     .then(res => res.json())
     .then(data => {
       console.log('CAI Placements data:', data);
       setPlacements(Array.isArray(data) ? data : []);
     })
     .catch(error => {
       console.error('Error fetching CAI placements data:', error);
       setPlacements([]);
     });
   ```

3. **Removed:** Placements fetch from generic CST API (line ~234)

4. **Display Logic:** Placements case in `renderContent()` switch statement:
   - Filters placements by department (cse-ai)
   - Displays each placement in expandable accordion
   - Shows placement title with link to document
   - Displays gallery images with metadata (roll_no, name, company, package)

## Data Format

### Placement Record Example

```json
{
  "id": 1,
  "batch": "2024",
  "academic_year": "2024-25",
  "title": "Placements Summary 2024",
  "description": "Final placement details for the 2024 batch",
  "file_url": "/uploads/placements/2024-summary.pdf",
  "gallery": [
    {
      "url": "/uploads/placements/gallery/1.jpg",
      "roll_no": "21A91A0501",
      "name": "John Doe",
      "company": "Google",
      "package": "15 LPA",
      "caption": "Google Placement"
    }
  ],
  "dept": "cse-ai",
  "status": "active",
  "created_at": "2025-11-16T12:00:00Z",
  "updated_at": "2025-11-16T12:00:00Z"
}
```

## Setup Instructions

### Step 1: Create the Table

Run the migration script:

```bash
# Using MySQL CLI
mysql -h 62.72.31.209 -u cmsuser -p"V@savi@2001" svec_cms < sql/create_cai_placements_table.sql
```

Or manually execute the SQL in `/sql/create_cai_placements_table.sql`

### Step 2: Verify Table Creation

```sql
SELECT COUNT(*) FROM cai_placements;
```

### Step 3: Add Sample Data (Optional)

Insert placement records:

```sql
INSERT INTO `cai_placements` 
(`batch`, `academic_year`, `title`, `description`, `file_url`, `gallery`, `dept`, `status`) 
VALUES 
('2024', '2024-25', 'Placements 2024', 'Final placement details', '/uploads/placements/2024.pdf', '[]', 'cse-ai', 'active');
```

### Step 4: Test the API

```bash
curl http://localhost:3000/api/cai-placements
```

## Integration with Admin Dashboard

The placements module is also available in the admin dashboard:

- **Module:** `placements`
- **Table:** `cai_placements`
- **Route:** `/admin/departments/cse-ai/placements`

Admins can:
- Create new placement records
- Edit existing placements
- Delete placements
- Manage gallery images
- Upload documents

## Display Features

### Public Display

The Placements section in `/pages/departments/CSEAI.tsx` displays:

1. **Grouped by Batch:** Each batch year in expandable accordion
2. **Document Link:** Link to placement summary document
3. **Gallery Gallery:** Images with student placement details
   - Roll number
   - Name
   - Placed company
   - Package offered

### Mobile Responsive

- Accordion layout for easy navigation
- Responsive grid for gallery images
- Touch-friendly expandable details

## Gallery Object Structure

```json
[
  {
    "url": "string (image URL)",
    "roll_no": "string (student roll number)",
    "name": "string (student name)",
    "company": "string (company name)",
    "package": "string (package offered)",
    "caption": "string (optional caption)"
  }
]
```

## Files Modified

1. `schemas/svec_cms (1).sql` - Added table schema and indexes
2. `src/pages/api/cai-placements.ts` - Created new API endpoint
3. `src/pages/departments/CSEAI.tsx` - Updated fetch and display logic

## Files Created

1. `sql/create_cai_placements_table.sql` - Migration script

## Backward Compatibility

The changes maintain backward compatibility:
- Existing placement data in generic `placements` table is not affected
- Other departments continue to use their existing placement systems
- Only CSE-AI department uses the new `cai_placements` table

## Next Steps

1. **Add Placements Data:** Use the admin dashboard to add placement records
2. **Upload Documents:** Add PDF files for placement summaries
3. **Gallery Management:** Upload and organize placement gallery images
4. **Testing:** Verify display on different devices

## Troubleshooting

### Placements Not Showing

1. Check if `cai_placements` table exists:
   ```sql
   SHOW TABLES LIKE 'cai_placements';
   ```

2. Verify table has data:
   ```sql
   SELECT COUNT(*) FROM cai_placements;
   ```

3. Check browser console for API errors
4. Verify file URLs are accessible

### API Returning Empty Array

1. Check network tab in browser DevTools
2. Verify MySQL connection credentials
3. Check error logs in server console
4. Ensure records have `status = 'active'`

## Performance Considerations

- Table uses indexes on `batch`, `academic_year`, and `status` for fast queries
- Gallery is stored as JSON for flexibility
- Recommend caching API responses for public pages

## Security Notes

- File URLs should point to secure upload directories
- Validate all file uploads before storing
- Sanitize user input before saving to database
- Use prepared statements in queries (already implemented)

---

**Last Updated:** November 16, 2025
**Status:** ✅ Complete
