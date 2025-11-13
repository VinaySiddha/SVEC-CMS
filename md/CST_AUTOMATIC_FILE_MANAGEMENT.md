# 🗑️ Automatic File Management - CST Department Dashboard

## Overview
The CST department admin dashboard now includes **automatic file management** that ensures your server storage stays clean and organized by automatically handling PDF and document files when you edit or delete records.

## 🚀 Key Features

### ✅ **Automatic File Deletion on Record Delete**
When you delete any record from the CST dashboard:
- **All associated files are automatically deleted** from the server
- This includes PDFs, images, documents, and any other uploaded files
- **No manual cleanup required** - the system handles it automatically
- Server storage remains clean and organized

### 🔄 **Automatic File Replacement on Record Edit**
When you edit a record and upload a new file:
- **Previous file is automatically deleted** when you upload a replacement
- **New file is immediately uploaded** to replace the old one
- **No duplicate files** accumulate on the server
- Seamless file replacement with zero downtime

### 📏 **File Size Enforcement (1MB Maximum)**
All file uploads are limited to 1MB maximum:
- **PDF documents**: Max 1MB
- **Images** (JPG, PNG): Max 1MB  
- **Office documents** (DOC, DOCX, XLS, XLSX): Max 1MB
- Upload will fail if file exceeds 1MB with clear error message
- Compressed/optimized files are recommended

## 🔧 How It Works

### Supported File Types
- **PDF**: `.pdf`
- **Images**: `.jpg`, `.jpeg`, `.png`
- **Word Documents**: `.doc`, `.docx`
- **Excel Files**: `.xls`, `.xlsx`

### File URL Fields Detection
The system automatically detects fields containing file URLs:
- `file_url`, `document_url`, `pdf_url`
- `image_url`, `attachment_url`, `report_url`
- `certificate_url`, `photo_url`, `upload_url`
- `link_url`

### File Storage Structure
```
/public/uploads/cst/
├── faculty/
│   ├── cst-faculty-2024-11-13-resume.pdf
│   └── cst-faculty-2024-11-13-photo.jpg
├── student-achievements/
│   ├── cst-student-achievements-2024-11-13-certificate.pdf
│   └── cst-student-achievements-2024-11-13-report.docx
├── handbooks/
│   └── cst-handbooks-2024-11-13-handbook.pdf
└── [other-modules]/
    └── [files...]
```

## 📋 Admin Workflow

### Adding New Records with Files
1. **Create new record** in any CST module
2. **Upload file(s)** - system validates size (≤1MB)
3. **File is stored** in organized directory structure
4. **File URL is saved** in database record

### Editing Records with File Replacement
1. **Edit existing record**
2. **Upload new file** - system automatically:
   - Deletes the previous file from server
   - Uploads new file to replace it
   - Updates database with new file URL
3. **No manual cleanup needed**

### Deleting Records
1. **Delete any record** from CST dashboard
2. **System automatically**:
   - Identifies all files linked to that record
   - Deletes files from server storage
   - Removes database record
3. **Complete cleanup** - no orphaned files left

## ⚠️ Important Notes

### File Size Limits
- **Maximum**: 1MB (1,048,576 bytes)
- **Recommendation**: Compress/optimize files before upload
- **PDFs**: Use PDF compression tools
- **Images**: Resize to appropriate dimensions
- **Office Docs**: Remove unnecessary content/images

### File Naming
Files are automatically renamed for security and organization:
- Format: `cst-{module}-{timestamp}-{original-name}`
- Example: `cst-faculty-2024-11-13T10-30-00-john-doe-resume.pdf`
- **Original filename** is preserved in metadata

### Error Handling
If file operations fail:
- **Database operations continue** (data is not lost)
- **Error is logged** for administrator review
- **User is notified** of any issues
- **Manual cleanup** may be needed in rare cases

## 🔍 Monitoring & Logs

### Console Logging
File operations are logged in the server console:
```
🗑️ Successfully cleaned up files for cst/faculty record ID: 123
🔄 Replaced old file for CST faculty record 456
✅ Deleted file: /uploads/cst/faculty/old-document.pdf
⚠️ Error cleaning up files for cst/handbooks record ID: 789
```

### Success Messages
Users receive confirmation messages:
- `"File uploaded successfully (245KB)"`
- `"File replaced successfully (512KB). Previous file automatically deleted."`
- `"Record and associated files deleted successfully"`

## 🛡️ Security Features

### Access Control
- **Authentication required** for all file operations
- **CST admin access only** - other departments cannot access CST files
- **JWT token validation** for secure API access

### File Validation
- **File type validation** - only allowed formats accepted
- **Size validation** - prevents large files from consuming storage
- **Filename sanitization** - removes potentially dangerous characters

### Storage Security
- **Organized directory structure** prevents file conflicts
- **Unique filenames** prevent overwriting
- **Automatic cleanup** prevents storage bloat

## 📞 Support

If you encounter issues with file management:
1. **Check file size** (must be ≤1MB)
2. **Verify file type** (PDF, JPG, PNG, DOC, DOCX, XLS, XLSX)
3. **Contact technical support** if automatic deletion fails
4. **Check server logs** for detailed error information

---

**This automatic file management system ensures your CST department dashboard maintains clean, organized storage while providing seamless file handling for administrators.**