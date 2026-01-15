# CSEAI Automatic File Management System

## Overview
The CSEAI department dashboard now includes a comprehensive automatic file management system that handles PDF and image files across all department sections. This system prevents file accumulation, automatically deletes orphaned files when records are removed, and seamlessly replaces files when updates occur.

## FileManager Utility Class

### Location
`src/lib/fileManager.ts`

### Features
- **Automatic file deletion** when database records are deleted
- **File replacement without duplicates** when records are updated
- **Multi-file cleanup** support for records containing multiple file URLs
- **Safe file operations** with error handling and validation

### Key Methods

#### `extractFileUrls(record: any): string[]`
- Automatically detects and extracts file URLs from any database record
- Supports common file URL fields: `fileUrl`, `profileUrl`, `imageUrl`, `gallery`, `file_url`
- Filters out invalid URLs and default placeholders

#### `cleanupRecordFiles(record: any): boolean`
- Deletes all files associated with a database record
- Used during DELETE operations to prevent orphaned files
- Returns boolean indicating cleanup success

#### `deleteFile(fileUrl: string): boolean`
- Safely deletes a single file from the server
- Validates file paths to prevent unauthorized deletions
- Handles missing files gracefully

#### `replaceFile(oldFileUrl: string, newFileUrl: string): boolean`
- Atomically replaces an old file with a new one
- Ensures no file duplication during updates
- Maintains file integrity during replacement

## Enhanced API Endpoints

All CAI-specific APIs now support full CRUD operations with automatic file management:

### 1. CAI Faculty (`/api/cai-faculty`)
- **GET**: Fetch all faculty members
- **DELETE**: Remove faculty record + associated profile images
- **PUT**: Update faculty data with automatic file replacement

### 2. CAI Technical Faculty (`/api/cai-technical-faculty`)
- **GET**: Fetch technical staff members
- **DELETE**: Remove record + associated files
- **PUT**: Update with automatic file management

### 3. CAI Non-Teaching Staff (`/api/cai-staff`)
- **GET**: Fetch staff members
- **DELETE**: Remove record + associated files  
- **PUT**: Update with automatic file replacement

### 4. CAI BOS Members (`/api/cai-bos-members`)
- **GET**: Fetch Board of Studies members
- **DELETE**: Remove record + associated files
- **PUT**: Update with file management

### 5. CAI BOS Minutes (`/api/cai-bos-minutes`)
- **GET**: Fetch meeting minutes and PDFs
- **DELETE**: Remove record + associated PDF files
- **PUT**: Update with automatic PDF replacement

### 6. CAI Syllabus (`/api/cai-syllabus`)
- **GET**: Fetch syllabus documents (B.Tech/SOC separation)
- **DELETE**: Remove record + associated PDF files
- **PUT**: Update with automatic PDF replacement

### 7. CAI Physical Facilities (`/api/cai-physical-facilities`)
- **GET**: Fetch facility information and images
- **DELETE**: Remove record + associated images/gallery files
- **PUT**: Update with automatic image replacement

## Implementation Details

### DELETE Operation Flow
1. API receives DELETE request with record ID
2. Query database to retrieve full record data
3. Extract all file URLs from the record using `FileManager.extractFileUrls()`
4. Delete all associated files using `FileManager.cleanupRecordFiles()`
5. Delete the database record
6. Return success confirmation

### PUT Operation Flow
1. API receives PUT request with record ID and update data
2. Query database to retrieve existing record
3. Compare old and new file URL fields
4. For each changed file field, delete the old file using `FileManager.deleteFile()`
5. Update the database record with new data
6. Return success confirmation

### File URL Detection
The system automatically detects file URLs in these common fields:
- `fileUrl` - Primary file/document URL
- `profileUrl` - Profile image URL
- `imageUrl` - General image URL
- `gallery` - Gallery image URL
- `file_url` - Alternative file URL format

### Error Handling
- **File not found**: Gracefully handled, continues operation
- **Permission errors**: Logged and reported
- **Database errors**: Full transaction rollback
- **Partial failures**: Detailed logging for debugging

## Usage Examples

### Deleting a Faculty Member
```javascript
// Frontend request
const response = await fetch('/api/cai-faculty?id=5', {
  method: 'DELETE'
});

// Automatic backend process:
// 1. Fetches record with profileUrl: '/uploads/dr-smith.jpg'
// 2. Deletes '/uploads/dr-smith.jpg' from server
// 3. Deletes database record
// 4. Returns success message
```

### Updating Syllabus Document
```javascript
// Frontend request
const response = await fetch('/api/cai-syllabus?id=3', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Updated Syllabus',
    fileUrl: '/uploads/new-syllabus-2024.pdf'  // New file
  })
});

// Automatic backend process:
// 1. Fetches existing record with fileUrl: '/uploads/old-syllabus.pdf'
// 2. Detects file URL change
// 3. Deletes '/uploads/old-syllabus.pdf' from server
// 4. Updates database with new file URL
// 5. Returns success message
```

## Benefits

1. **Storage Efficiency**: Prevents server storage bloat from orphaned files
2. **Data Integrity**: Ensures file-database consistency
3. **Automatic Operations**: No manual file cleanup required
4. **Seamless Updates**: File replacement without duplication
5. **Error Prevention**: Robust error handling prevents corruption
6. **Performance**: Minimal overhead with efficient file operations

## Security Features

- **Path Validation**: Prevents deletion outside upload directories
- **URL Sanitization**: Validates file URLs before processing
- **Transaction Safety**: Database operations with proper rollback
- **Access Control**: Only authorized API endpoints can trigger deletions

## Monitoring & Logging

All file operations are logged with:
- **Timestamp**: When the operation occurred
- **Operation Type**: DELETE, UPDATE, REPLACE
- **File Paths**: Old and new file locations
- **Success/Failure**: Operation outcome
- **Error Details**: Specific error messages when failures occur

## Future Enhancements

1. **File Archiving**: Move deleted files to archive before permanent deletion
2. **Usage Analytics**: Track file access patterns and cleanup statistics
3. **Batch Operations**: Support for bulk file operations
4. **Cloud Storage**: Extension to support AWS S3/Azure Blob storage
5. **File Versioning**: Maintain file history for audit trails

This automatic file management system ensures the CSEAI dashboard maintains clean, efficient file storage while providing seamless user experience for all CRUD operations.