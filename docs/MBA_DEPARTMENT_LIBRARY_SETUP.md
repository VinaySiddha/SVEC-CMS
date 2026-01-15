# MBA Department Library Setup - Complete Guide

## Step 1: Database Setup

Run these SQL queries in your MySQL database:

```sql
-- Drop the existing table
DROP TABLE IF EXISTS mba_department_library;

-- Create new table with CST schema
CREATE TABLE mba_department_library (
  id INT NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  titles INT DEFAULT NULL,
  volumes INT DEFAULT NULL,
  faculty_incharge VARCHAR(100) DEFAULT NULL,
  phone VARCHAR(30) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Step 2: Files Created/Modified

### ✅ 1. Module Configuration
**File:** `src/config/module-fields.ts`
- Updated MBA `department-library` module with correct schema
- Fields: titles, volumes, faculty_incharge, phone, email, description, image_url
- Display field: `titles`
- All fields are editable via admin dashboard

### ✅ 2. API Route
**File:** `src/pages/api/mba/department-library.ts` (CREATED)
- Fetches data from `mba_department_library` table
- Returns all records ordered by ID DESC
- Proper error handling

### ✅ 3. Frontend State & Fetch
**File:** `src/pages/departments/MBA.tsx`
- Added state: `departmentLibrary`
- Added fetch in useEffect with error handling
- Gets first record from API response

### ✅ 4. Frontend Rendering
**File:** `src/pages/departments/MBA.tsx`
- Added `case 'Department Library':` rendering section
- Displays:
  - Library image (if available)
  - Description
  - Number of Titles (red card)
  - Number of Volumes (green card)
  - Faculty Incharge details (name, phone, email)
- Matches CST.tsx styling

## Step 3: How to Use

### Add Data via Admin Dashboard:
1. Login to admin dashboard
2. Navigate to **MBA Department** → **Department Library**
3. Click "Add New"
4. Fill in the form:
   - **Number of Titles** (required)
   - **Number of Volumes** (required)
   - **Faculty In-charge** (required)
   - Phone (optional)
   - Email (optional)
   - Description (optional)
   - Library Image (optional - upload JPG/PNG)
5. Click "Save"

### View on Frontend:
1. Navigate to MBA Department page
2. Click on "Department Library" in the sidebar
3. Data will be displayed with image, stats, and contact info

## Step 4: Verification Checklist

- [ ] SQL table created successfully
- [ ] Admin dashboard shows Department Library module
- [ ] Can add/edit/delete library data in admin
- [ ] API endpoint `/api/mba/department-library` returns data
- [ ] MBA.tsx page displays library information correctly
- [ ] Image upload works (if provided)
- [ ] All fields display properly on frontend

## Database Schema Details

| Field | Type | Description |
|-------|------|-------------|
| id | INT (PK, AUTO_INCREMENT) | Primary key |
| image_url | VARCHAR(255) | URL to library image |
| description | TEXT | Library description |
| titles | INT | Number of unique titles |
| volumes | INT | Number of total volumes |
| faculty_incharge | VARCHAR(100) | Name of faculty in charge |
| phone | VARCHAR(30) | Contact phone number |
| email | VARCHAR(100) | Contact email address |

## Notes

- Only ONE record should exist in this table (it displays the first record)
- If you need multiple library entries, the schema would need modification
- Image upload handled by the admin dashboard file upload system
- All styling matches CST.tsx for consistency
