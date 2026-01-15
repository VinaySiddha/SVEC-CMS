# ECE Technical Association Gallery - Setup Guide

## Overview
The Technical Association section now displays a dynamic image gallery fetched from the `ece_hackathons_gallery` table with the category filter set to `technical association`.

## What Changed

### 1. New API Endpoint
- **File**: `src/pages/api/ece/hackathons-gallery.ts`
- **Endpoint**: `GET /api/ece/hackathons-gallery`
- **Query Parameters**: `?category=technical%20association`
- **Response**: JSON array of gallery images with metadata

### 2. Updated ECE Department Page
- **File**: `src/pages/departments/ECE.tsx`
- **Changes**:
  - Added `hackathonsGallery` state to store gallery images
  - Added API fetch call to retrieve images filtered by category `technical association`
  - Replaced static gallery section with dynamic image grid
  - Images grouped by year (newest first)
  - Added hover effects and placeholder fallback images

### 3. New Database Table
- **Table**: `ece_hackathons_gallery`
- **Supports**: Images for multiple categories (technical association, hackathon, etc.)
- **Fields**: id, title, image_url, category, description, year

## Setup Instructions

### Step 1: Create Database Table
Execute the SQL schema to create the table with sample data:

```bash
mysql -h 62.72.31.209 -u cmsuser -p'V@savi@2001' svec_cms < ECE_HACKATHONS_GALLERY_SCHEMA.sql
```

**Or manually in MySQL Workbench/phpMyAdmin**:
1. Open `ECE_HACKATHONS_GALLERY_SCHEMA.sql`
2. Copy the SQL
3. Execute in your MySQL client

### Step 2: Verify Table Creation
```sql
-- Check if table exists
SHOW TABLES LIKE 'ece_hackathons_gallery';

-- Check structure
DESC ece_hackathons_gallery;

-- Verify sample data
SELECT COUNT(*) FROM ece_hackathons_gallery WHERE category = 'technical association';
-- Should return: 10 records
```

### Step 3: Test API Endpoint
```bash
# Test the API endpoint
curl "http://localhost:3000/api/ece/hackathons-gallery?category=technical%20association"
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "VEDA Technical Hackathon 2024",
      "image_url": "/uploads/ece/hackathon-2024-01.jpg",
      "category": "technical association",
      "description": "Annual technical hackathon event organized by VEDA",
      "year": "2024"
    },
    ...
  ],
  "count": 10
}
```

### Step 4: Test in Browser
1. Navigate to ECE department page: `/pages/departments/ECE`
2. Scroll to "Technical Association" section
3. Click on "Image Gallery" dropdown
4. Verify images display in a grid grouped by year

## Database Schema

### ece_hackathons_gallery Table
```sql
CREATE TABLE IF NOT EXISTS ece_hackathons_gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(300) NOT NULL,           -- Image title
  image_url VARCHAR(500),                -- Path to image file
  category VARCHAR(100),                 -- Category (technical association, hackathon, etc.)
  description TEXT,                      -- Image description
  year VARCHAR(4),                       -- Year of event
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Sample Data Included
The SQL script includes 10 sample images for "technical association" category:
- VEDA Technical Hackathon 2024 (3 images)
- IETE Student Chapter Workshop 2024 (2 images)
- TECKVEDA 2023 Hackathon (2 images)
- VEDA Training Session (1 image)
- Signal Processing Workshop (1 image)
- Embedded Systems Demonstration (1 image)

Plus 2 images in "hackathon" category for testing multi-category support.

## File Structure

### Images Stored At
- **Path**: `/public/uploads/ece/`
- **Files**: `hackathon-2024-*.jpg`, `iete-workshop-*.jpg`, `teckveda-2023-*.jpg`, `veda-training-*.jpg`, etc.

### API Implementation
```typescript
// File: src/pages/api/ece/hackathons-gallery.ts
GET /api/ece/hackathons-gallery?category=technical%20association

Returns: {
  success: true,
  data: Array<{
    id: number,
    title: string,
    image_url: string,
    category: string,
    description: string,
    year: string
  }>,
  count: number
}
```

### Frontend Implementation
```typescript
// In src/pages/departments/ECE.tsx
- State: hackathonsGallery
- Fetch: GET /api/ece/hackathons-gallery?category=technical%20association
- Filter: Only images with category = "technical association"
- Display: Grid layout, grouped by year, with hover effects
```

## Features

### 1. Dynamic Gallery Grid
- Responsive 2-3 column layout
- Auto-grouping by year
- Newest years appear first

### 2. Hover Effects
- Image zoom on hover
- Dark overlay with title display
- Smooth transitions

### 3. Image Fallback
- Placeholder image if original fails to load
- Error handling for missing images

### 4. Category Filtering
- API filters by category parameter
- Supports multiple categories (technical association, hackathon, etc.)
- Easy to extend for other departments

## Adding New Images

### Option 1: Direct Database Insert
```sql
INSERT INTO ece_hackathons_gallery (title, image_url, category, description, year) 
VALUES (
  'Event Name',
  '/uploads/ece/filename.jpg',
  'technical association',
  'Event description',
  '2024'
);
```

### Option 2: Create Admin Interface (Optional)
Can create a form in admin dashboard to upload images directly.

### File Upload Workflow
1. Upload image to `/public/uploads/ece/`
2. Note the filename (e.g., `event-2024-01.jpg`)
3. Insert record with full path: `/uploads/ece/event-2024-01.jpg`

## Troubleshooting

### Issue: Images not displaying
**Solution**:
1. Verify images exist in `/public/uploads/ece/`
2. Check image_url paths in database
3. Verify permissions on upload directory
4. Check browser console for image 404 errors

### Issue: Gallery dropdown empty
**Solution**:
1. Verify table has data: `SELECT COUNT(*) FROM ece_hackathons_gallery;`
2. Check API endpoint returns data
3. Verify category filter matches exactly (case-sensitive)
4. Clear browser cache and refresh

### Issue: API returns 500 error
**Solution**:
1. Verify table exists: `SHOW TABLES LIKE 'ece_hackathons_gallery';`
2. Check database connection credentials
3. Verify MySQL user has SELECT permission
4. Check server error logs for details

### Issue: Some images missing from certain years
**Solution**:
1. Verify all images have a `year` value
2. Check for NULL values: `SELECT * FROM ece_hackathons_gallery WHERE year IS NULL;`
3. Update missing years: `UPDATE ece_hackathons_gallery SET year = '2024' WHERE year IS NULL;`

## Performance Considerations

### Query Optimization
- Indexed on `category` and `year` columns
- Efficient ORDER BY clause
- Minimal data transfer (only needed fields selected)

### Caching (Optional)
- Images cached in browser
- API results could be cached with 1-hour TTL
- Implement if large image set becomes slow

### Image Optimization
- Consider compressing images before upload
- Use WebP format for better performance
- Lazy load images if gallery becomes very large

## Extension Points

### Add More Categories
Simply insert records with different category values:
```sql
INSERT INTO ece_hackathons_gallery (..., category, ...) 
VALUES (..., 'research_symposium', ...);
```

### Filter by Multiple Categories
Update API to accept multiple categories:
```
GET /api/ece/hackathons-gallery?category=technical%20association&category=hackathon
```

### Add Lightbox/Modal Viewing
Implement modal to view full-resolution images on click.

### Add Image Descriptions
Display on hover or in a sidebar with full metadata.

## Testing Checklist

- [ ] Database table created successfully
- [ ] Sample data inserted (10 technical association images)
- [ ] API endpoint returns JSON correctly
- [ ] Gallery images display in browser
- [ ] Images grouped correctly by year
- [ ] Hover effects work smoothly
- [ ] Placeholder shows for missing images
- [ ] Responsive layout on mobile
- [ ] No console errors
- [ ] Images load from correct path

## Files Modified/Created

1. **Created**: `src/pages/api/ece/hackathons-gallery.ts` - New API endpoint
2. **Modified**: `src/pages/departments/ECE.tsx` - Added state and gallery logic
3. **Created**: `ECE_HACKATHONS_GALLERY_SCHEMA.sql` - Database schema
4. **Created**: `ECE_TECHNICAL_ASSOCIATION_GALLERY_SETUP.md` - This guide

## Next Steps

1. ✅ Execute the SQL schema
2. ✅ Refresh the ECE department page
3. ✅ Verify gallery displays with sample images
4. Upload your actual event photos to `/public/uploads/ece/`
5. Add database records for your images
6. Update year values to match your actual events

---

**Created**: 2026-01-12
**Status**: Ready for Deployment
**Complexity**: Low - Standard gallery implementation
**Estimated Setup Time**: 5-10 minutes
