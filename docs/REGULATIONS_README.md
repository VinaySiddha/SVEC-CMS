# Regulations Module - Complete Implementation

## Overview

The Regulations module is a complete system for managing academic regulations PDFs across different degree programs. It includes:
- Database storage with soft deletes
- PDF file management
- RESTful API endpoints
- React-based admin interface
- Automatic file uploads and organization

## Quick Setup

### Step 1: Create Database Table

**Using Node.js script:**
```bash
node scripts/setup-regulations-table.js
```

**Or using MySQL directly:**
```bash
mysql -h 62.72.31.209 -u cmsuser -p svec_cms < sql/create_regulations_table.sql
```

### Step 2: Verify Installation

Run the verification script to ensure everything is set up correctly.

### Step 3: Start Application

```bash
npm run dev
```

Then visit: http://localhost:3000/exam-section/regulations

## Project Structure

The regulations module consists of:

**Frontend**
- `src/app/exam-section/regulations/page.tsx` - Admin UI

**Backend - API**
- `src/app/api/exam-section/regulations/route.ts` - CRUD operations
- `src/app/api/exam-section/regulations/upload/route.ts` - PDF uploads
- `src/app/api/admin/setup/regulations/route.ts` - DB migration endpoint

**Database**
- `sql/create_regulations_table.sql` - Schema file
- `scripts/setup-regulations-table.js` - Setup script

**Libraries & Utilities**
- `src/lib/schemas/regulations.ts` - TypeScript schema
- `src/lib/migrations/regulations.ts` - Migration helper
- `src/lib/modules/regulations.ts` - Module configuration
- `src/lib/regulation-file-manager.ts` - File utilities
- `tests/verify-regulations-table.ts` - Verification script

## Database Schema

The regulations table stores academic regulations with the following fields:

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment primary key |
| title | VARCHAR(255) | Regulation title |
| description | TEXT | Detailed description |
| year | VARCHAR(4) | Year (e.g., 2024) |
| type | ENUM | B.Tech, M.Tech, M.B.A, M.C.A, Diploma |
| document_url | VARCHAR(512) | Path to PDF file |
| academic_year | VARCHAR(9) | Format: YYYY-YYYY |
| effective_from | DATE | When regulation takes effect |
| is_current | BOOLEAN | Is this the current regulation? |
| status | ENUM | pending, approved, rejected |
| remarks | TEXT | Additional notes |
| created_by | INT (FK) | User ID who created it |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |
| deleted_at | TIMESTAMP | Soft delete flag |

## API Endpoints

### GET /api/exam-section/regulations
Retrieve all active regulations

### POST /api/exam-section/regulations
Create a new regulation with fields: title, description, year, type, academic_year, effective_from, is_current, status

### POST /api/exam-section/regulations/upload
Upload a PDF file (max 2MB)

### PUT /api/exam-section/regulations
Update an existing regulation

### DELETE /api/exam-section/regulations
Soft delete a regulation

## File Storage

PDFs are stored in organized directories:
```
public/regulations/Academic/
├── B.Tech/
├── M.Tech/
├── M.B.A/
├── M.C.A/
└── Diploma/
```

Files are named with format: `regulation_{type}_{degree}_{timestamp}.pdf`

## Frontend Features

The admin interface at `/exam-section/regulations` includes:
- Add new regulation form
- PDF upload (max 2MB)
- View all regulations in table
- Edit existing regulations
- Delete regulations (soft delete)
- Direct links to PDF documents
- Toast notifications for user feedback

## Form Fields

- Title (required, text)
- Description (required, textarea)
- Year (required, YYYY format)
- Type (required, dropdown: B.Tech, M.Tech, M.B.A, M.C.A, Diploma)
- Academic Year (required, YYYY-YYYY format)
- Effective From (required, date picker)
- PDF Document (optional, file upload - 2MB max)
- URL Link (optional, for external links)

## Validation

**File Upload:**
- File type: PDF only
- File size: Maximum 2MB
- Automatic directory creation
- Unique filename with timestamp

**Form:**
- Required field checks
- Year format validation (YYYY)
- Academic year format validation (YYYY-YYYY)
- Date format validation (YYYY-MM-DD)

## Features Implemented

- Full CRUD Operations - Create, Read, Update, Delete regulations
- PDF File Uploads - Upload and store regulation documents
- Soft Deletes - Data is archived, not permanently deleted
- Database Persistence - All data stored in MySQL
- File Management - Automatic directory creation and unique filenames
- Validation - File size (2MB max), file type (PDF only)
- Error Handling - Comprehensive error messages and logging
- Responsive UI - Mobile-friendly interface with Tailwind CSS

## Database Indexing

Performance indexes created on:
- type - For filtering by regulation type
- year - For year-based queries
- status - For filtering by status
- is_current - For finding current regulations

## Security Features

- Validate file types (PDF only)
- Validate file sizes (2MB limit)
- Use parameterized queries (prevents SQL injection)
- Implement authentication for admin endpoints
- Sanitize file names

## Troubleshooting

### Table doesn't exist
Run the setup script to create the table

### File upload fails
Ensure public directories are created and file is under 2MB

### Cannot connect to database
Verify connection credentials in .env file

### PDF not accessible
Check that file exists in public directory and path is correct

### Data not persisting
Verify database connection and table exists

## Setup Checklist

- [ ] Database table created
- [ ] Verification script passes
- [ ] Frontend loads at `/exam-section/regulations`
- [ ] Can add regulation
- [ ] Can upload PDF
- [ ] Can view in table
- [ ] Can edit regulation
- [ ] Can delete regulation
- [ ] Data persists after refresh

## Documentation Files

- `md/REGULATIONS_SETUP_GUIDE.md` - Detailed setup instructions
- `md/REGULATIONS_IMPLEMENTATION_SUMMARY.md` - Complete implementation details

## Next Steps

1. Create regulations table (see Setup section)
2. Test API endpoints
3. Add regulations via frontend
4. Optional: Add user authentication
5. Optional: Add approval workflow
6. Optional: Add search/filter functionality
7. Optional: Add bulk operations

---

**Status:** ✅ Implementation Complete - Ready for Database Setup
