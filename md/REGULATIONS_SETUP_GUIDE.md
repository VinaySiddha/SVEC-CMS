# Regulations Module Setup Guide

## Overview
The regulations module has been fully implemented with database integration, file uploads, and a complete API. However, the database table needs to be created before it can store data.

## What's Been Created

### 1. Database Schema (`sql/create_regulations_table.sql`)
- Regulations table with all necessary fields
- Indexes for performance optimization
- Soft delete support (deleted_at column)
- Unique constraints to prevent duplicates

### 2. API Routes
- **GET** `/api/exam-section/regulations` - Retrieve all regulations
- **POST** `/api/exam-section/regulations` - Create new regulation
- **PUT** `/api/exam-section/regulations` - Update regulation
- **DELETE** `/api/exam-section/regulations` - Soft delete regulation
- **POST** `/api/exam-section/regulations/upload` - Upload PDF files

### 3. File Storage
- PDFs are stored in: `public/regulations/Academic/{Type}/`
- Automatic directory creation
- 2MB file size limit
- Unique filenames with timestamps

### 4. Frontend
- Full CRUD interface at `/exam-section/regulations`
- Form with validation
- PDF upload capability
- Data table with actions

## Setup Instructions

### Step 1: Run the Database Migration

#### Option A: Using the Setup API (Development Only)
```bash
curl -X POST http://localhost:3000/api/admin/setup/regulations
```

#### Option B: Manual SQL Execution
Run the SQL commands in your MySQL client:
```sql
-- Execute the contents of sql/create_regulations_table.sql
-- You can use MySQL Workbench or command line:
mysql -h 62.72.31.209 -u cmsuser -p svec_cms < sql/create_regulations_table.sql
```

### Step 2: Verify Table Creation
```sql
DESCRIBE regulations;
```

You should see columns like: id, title, description, year, type, document_url, academic_year, effective_from, is_current, status, remarks, created_by, created_at, updated_at, deleted_at

### Step 3: Test the API
1. Start your Next.js application: `npm run dev`
2. Navigate to `/exam-section/regulations`
3. Try adding a new regulation

## API Request Examples

### Create Regulation
```bash
curl -X POST http://localhost:3000/api/exam-section/regulations \
  -H "Content-Type: application/json" \
  -d '{
    "title": "B.Tech Academic Regulations 2024",
    "description": "Academic regulations for B.Tech programs",
    "year": "2024",
    "type": "B.Tech",
    "academic_year": "2024-2025",
    "effective_from": "2024-07-01",
    "is_current": true,
    "status": "approved"
  }'
```

### Upload PDF
```bash
curl -X POST http://localhost:3000/api/exam-section/regulations/upload \
  -F "file=@regulation.pdf" \
  -F "type=B.Tech" \
  -F "degree=B.Tech"
```

### Get All Regulations
```bash
curl http://localhost:3000/api/exam-section/regulations
```

### Update Regulation
```bash
curl -X PUT http://localhost:3000/api/exam-section/regulations \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "is_current": false
  }'
```

### Delete Regulation
```bash
curl -X DELETE http://localhost:3000/api/exam-section/regulations \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

## File Structure
```
src/
├── app/
│   ├── api/exam-section/regulations/
│   │   ├── route.ts              (Main CRUD handler)
│   │   └── upload/
│   │       └── route.ts          (PDF upload handler)
│   ├── exam-section/regulations/
│   │   └── page.tsx              (Frontend UI)
│   └── api/admin/setup/regulations/
│       └── route.ts              (Migration setup endpoint)
├── lib/
│   ├── schemas/regulations.ts    (TypeScript schema)
│   ├── modules/regulations.ts    (Module configuration)
│   ├── migrations/regulations.ts (Migration helper)
│   └── regulation-file-manager.ts (File utilities)
sql/
└── create_regulations_table.sql

public/
└── regulations/Academic/
    ├── B.Tech/
    ├── M.Tech/
    ├── M.B.A/
    ├── M.C.A/
    └── Diploma/
```

## Database Schema Fields

| Field | Type | Description |
|-------|------|-------------|
| id | INT (PK) | Primary key |
| title | VARCHAR(255) | Regulation title |
| description | TEXT | Detailed description |
| year | VARCHAR(4) | Academic year |
| type | ENUM | B.Tech, M.Tech, M.B.A, M.C.A, Diploma |
| document_url | VARCHAR(512) | URL to PDF file |
| academic_year | VARCHAR(9) | Format: YYYY-YYYY |
| effective_from | DATE | When the regulation becomes effective |
| is_current | BOOLEAN | Whether this is the current regulation |
| status | ENUM | pending, approved, rejected |
| remarks | TEXT | Additional notes |
| created_by | INT (FK) | User ID who created it |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| deleted_at | TIMESTAMP | Soft delete timestamp |

## Troubleshooting

### Issue: "Table regulations doesn't exist"
**Solution:** Run the database migration:
```sql
mysql -h 62.72.31.209 -u cmsuser -p svec_cms < sql/create_regulations_table.sql
```

### Issue: "File upload fails - 413 Body exceeded limit"
**Solution:** This has been fixed by updating `next.config.ts` with `serverActions: { bodySizeLimit: '5MB' }`

### Issue: "PDF files not accessible"
**Solution:** Ensure public directories are created:
```bash
mkdir -p public/regulations/Academic/{B.Tech,M.Tech,M.B.A,M.C.A,Diploma}
```

### Issue: "Data not persisting"
**Solution:** Verify:
1. Database connection is working
2. Table exists: `SHOW TABLES LIKE 'regulations';`
3. API is using `execute()` for INSERT/UPDATE/DELETE operations

## Next Steps

1. ✅ Create regulations table (see Setup Instructions)
2. ✅ Verify database connection
3. ✅ Test API endpoints
4. ✅ Test file uploads
5. Add authentication/authorization if needed
6. Add approval workflow if needed
7. Add search/filter functionality
8. Add bulk operations

## Support

For issues or questions:
- Check database connectivity
- Verify file permissions in public directory
- Review browser console for API errors
- Check server logs for detailed error messages
