# Updated Database Schema Documentation

## Overview

The database schemas for regulations, syllabus, and academic calendars have been simplified to include only the following fields:
- Date
- Content (text description/details)
- Document URL (PDF file path)
- Timestamps (created_at, updated_at, deleted_at)

## Tables

### 1. regulations
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| date | DATE | Date of the regulation |
| content | TEXT | Regulation content/description |
| document_url | VARCHAR(512) | Path to PDF file |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| deleted_at | TIMESTAMP | Soft delete timestamp |

### 2. syllabus
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| date | DATE | Date of the syllabus |
| content | TEXT | Syllabus content/description |
| document_url | VARCHAR(512) | Path to PDF file |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| deleted_at | TIMESTAMP | Soft delete timestamp |

### 3. academic_calendars
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| date | DATE | Date of the calendar |
| content | TEXT | Calendar content/description |
| document_url | VARCHAR(512) | Path to PDF file |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| deleted_at | TIMESTAMP | Soft delete timestamp |

## Setup Instructions

1. Navigate to the project root directory:
   ```bash
   cd c:\Users\AtriDatta\Desktop\SVEC-CMS
   ```

2. Run the setup script:
   ```bash
   node scripts/setup-updated-tables.js
   ```

3. Verify that all tables are created with proper structure:
   ```sql
   DESCRIBE regulations;
   DESCRIBE syllabus;
   DESCRIBE academic_calendars;
   ```

## Forms

The forms for all three sections should now only include:
1. Date picker
2. Content text area
3. PDF file upload

All other fields have been removed as per requirements.

## File Storage

PDF files will be stored in:
- `/public/uploads/regulations/`
- `/public/uploads/syllabus/`
- `/public/uploads/academic-calendars/`