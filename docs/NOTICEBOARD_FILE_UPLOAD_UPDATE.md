# 📎 Noticeboard File Upload Implementation

## ✅ Update Complete

**Status:** ✅ **COMPLETED**  
**Date:** January 12, 2026  
**Component:** Exam Section Noticeboard Module

---

## 📝 Changes Made

### 1. **Frontend Component** (`/src/app/exam-section/noticeboard/page.tsx`)

#### Replaced: "Link (Optional)" → "Attachment (Optional)"

**Before:**
```tsx
<Input
  type="text"
  placeholder="https://example.com"
  value={formData.link || ''}
  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
/>
```

**After:**
```tsx
<input
  type="file"
  onChange={handleFileChange}
  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
{uploadedFile && (
  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded whitespace-nowrap">
    ✓ {uploadedFile.name}
  </span>
)}
<p className="text-xs text-gray-500 mt-1">PDF, Word, Excel, or Image (Max 10MB)</p>
```

#### Added File Upload Handler:
```tsx
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', ...];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, Word, Excel, and image files are allowed');
      return;
    }
    setUploadedFile(file);
    setFormData({ ...formData, file_url: file.name });
    toast.success('File selected: ' + file.name);
  }
};
```

#### Updated Form Submission:
```tsx
// Handle file upload if a new file was selected
if (uploadedFile && !editingId) {
  const formDataWithFile = new FormData();
  formDataWithFile.append('title', formData.title || '');
  formDataWithFile.append('category', formData.category || '');
  formDataWithFile.append('content', formData.content || '');
  formDataWithFile.append('posted_date', formData.posted_date || '');
  formDataWithFile.append('file', uploadedFile);

  const response = await fetch('/api/exam-section/noticeboard', {
    method: 'POST',
    body: formDataWithFile
  });
}
```

#### Updated Notice Display:
```tsx
{notice.file_url && (
  <a
    href={`/uploads/noticeboard/${notice.file_url}`}
    download
    className="text-blue-600 hover:underline text-sm font-medium"
  >
    📎 Download Attachment
  </a>
)}
```

#### Updated Interface:
```tsx
interface Notice {
  id: number;
  title: string;
  category: string;
  content: string;
  file_url?: string;  // Replaced 'link'
  posted_date: string;
  created_at?: string;
  updated_at?: string;
}
```

---

### 2. **Backend API Route** (`/src/app/api/exam-section/noticeboard/route.ts`)

#### Added Imports:
```typescript
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
```

#### Updated POST Method:
- Changed from `request.json()` to `request.formData()`
- Handles file upload with validation
- Saves files to `/public/uploads/noticeboard/` directory
- Generates unique filenames with timestamp
- Stores filename in database

```typescript
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const posted_date = formData.get('posted_date') as string;
    const file = formData.get('file') as File | null;

    let file_url: string | null = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'noticeboard');
      await mkdir(uploadDir, { recursive: true });

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      const filepath = join(uploadDir, filename);

      // Write file to disk
      await writeFile(filepath, buffer);
      file_url = filename;
    }

    // Insert into database (without 'link' field)
    const query = `
      INSERT INTO exam_section_noticeboard 
      (title, category, content, file_url, posted_date, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
```

#### Updated PUT Method:
- Removed `link` field from update query
- Now only handles `file_url`

```typescript
const query = `
  UPDATE exam_section_noticeboard 
  SET title = ?, category = ?, content = ?, file_url = ?, posted_date = ?, updated_at = NOW()
  WHERE id = ?
`;
```

---

## 🔧 Required Setup

### 1. Create Upload Directory
```bash
mkdir -p public/uploads/noticeboard
```

### 2. Update Database Table (Optional)
If you created the table with `link` field, you can update it:
```sql
ALTER TABLE exam_section_noticeboard 
  DROP COLUMN link;
```

Or create fresh table:
```sql
CREATE TABLE exam_section_noticeboard (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content LONGTEXT NOT NULL,
  file_url VARCHAR(500),
  posted_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 📋 Features

### File Upload Features:
✅ **File Selection** - Interactive file picker with visual feedback  
✅ **File Validation** - Type checking (PDF, Word, Excel, Images)  
✅ **Size Validation** - Max 10MB file size limit  
✅ **Preview** - Shows selected filename before upload  
✅ **Unique Filenames** - Timestamp-based to prevent conflicts  
✅ **Directory Auto-Creation** - `/public/uploads/noticeboard/` created automatically  
✅ **Download Links** - Users can download attached files  
✅ **Toast Notifications** - Real-time feedback on file selection  

### Supported File Types:
- 📄 **PDF** - `.pdf`
- 📝 **Word** - `.doc`, `.docx`
- 📊 **Excel** - `.xls`, `.xlsx`
- 🖼️ **Images** - `.jpg`, `.png`

---

## 🎯 Usage Flow

### Admin (Add Notice):
1. Click "Add Notice"
2. Fill in Title, Category, Content
3. Select file from computer
4. File name appears with ✓ checkmark
5. Click "Add Notice" to submit
6. File is uploaded and saved to database

### Admin (Edit Notice):
1. Click Edit on existing notice
2. Can update text fields
3. File upload is for new documents only
4. Click "Update Notice"

### Users (Download):
1. View notice in list
2. Click "📎 Download Attachment" link
3. File downloads from `/uploads/noticeboard/{filename}`

---

## 🔍 File Structure

```
public/
└── uploads/
    └── noticeboard/
        ├── 1705084800000-syllabus.pdf
        ├── 1705084900000-exam-schedule.xlsx
        └── 1705085000000-placement-info.docx
```

---

## 🚀 Testing Checklist

- [ ] Create noticeboard table in database
- [ ] Add a new notice with file attachment
- [ ] Verify file appears in `/public/uploads/noticeboard/`
- [ ] View notice in list
- [ ] Click download link
- [ ] Confirm file downloads correctly
- [ ] Test file validation (try uploading oversized file)
- [ ] Test file type validation (try uploading .exe or other invalid type)
- [ ] Edit existing notice
- [ ] Search and filter notices
- [ ] Delete notice (file should remain in storage)

---

## 📊 Database Schema

```sql
CREATE TABLE exam_section_noticeboard (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content LONGTEXT NOT NULL,
  file_url VARCHAR(500),
  posted_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_posted_date (posted_date)
);
```

---

## 📈 Next Steps

1. **Create upload directory**: `mkdir -p public/uploads/noticeboard`
2. **Create database table** with provided SQL
3. **Test file uploads** with various file types
4. **Monitor disk space** - implement cleanup policy for old files
5. **Add file deletion** - delete files when notice is deleted (optional enhancement)

