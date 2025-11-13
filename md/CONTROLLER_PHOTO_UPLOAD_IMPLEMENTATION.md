# Controller of Examinations - Photo Upload Implementation

## Overview
Updated the Controller of Examinations profile management system to replace static photo URL input with a dynamic photo file upload feature with a 250KB size limit.

## Changes Made

### 1. Frontend Updates
**File:** `/src/app/exam-section/controller-of-examinations/page.tsx`

#### New State Management
- Added `photoFile` state to store the selected file
- Added `uploading` state (prepared for future use)

```tsx
const [photoFile, setPhotoFile] = useState<File | null>(null);
const [uploading, setUploading] = useState(false);
```

#### Photo Upload Form Field
Replaced the text input for photo URL with a file upload component:

```tsx
<div className="space-y-2">
  <Label htmlFor="photo">Photo (Max 250KB)</Label>
  <div className="flex flex-col gap-2">
    <Input
      id="photo"
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          if (file.size > 250 * 1024) {
            toast.error('Photo size must not exceed 250KB');
            e.target.value = '';
          } else {
            setPhotoFile(file);
          }
        }
      }}
    />
    {(photoFile || formData.photo_url) && (
      <div className="text-sm text-gray-600">
        {photoFile ? `Selected: ${photoFile.name}` : `Current: ${formData.photo_url}`}
      </div>
    )}
    {formData.photo_url && (
      <img 
        src={formData.photo_url} 
        alt="Preview" 
        className="w-20 h-20 object-cover rounded border"
      />
    )}
  </div>
</div>
```

**Features:**
- File type validation (images only)
- Client-side size validation (250KB max)
- File name display
- Image preview thumbnail (20x20px)
- Toast error notifications

#### Updated Submit Handler
Modified `handleSubmit` function to handle photo upload:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.name || !formData.designation) {
    toast.error('Name and designation are required');
    return;
  }

  try {
    setLoading(true);
    let photoUrl = formData.photo_url;

    // Upload photo if a new file is selected
    if (photoFile) {
      const photoFormData = new FormData();
      photoFormData.append('file', photoFile);

      const uploadResponse = await fetch('/api/exam-section/controller-of-examinations/upload', {
        method: 'POST',
        body: photoFormData
      });

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json();
        photoUrl = uploadData.url;
      } else {
        const error = await uploadResponse.json();
        toast.error(error.error || 'Failed to upload photo');
        return;
      }
    }

    const response = await fetch('/api/exam-section/controller-of-examinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, photo_url: photoUrl })
    });

    if (response.ok) {
      toast.success(profile ? 'Profile updated successfully' : 'Profile created successfully');
      setIsEditing(false);
      setPhotoFile(null);
      fetchProfile();
    } else {
      const error = await response.json();
      toast.error(error.error || 'Failed to save profile');
    }
  } catch (error) {
    toast.error('Failed to save profile');
  } finally {
    setLoading(false);
  }
};
```

**Process:**
1. Validate name and designation
2. If photoFile exists, upload it first
3. Receive public URL from upload API
4. Submit profile data with the new photo URL
5. Show success message and reset form
6. Reload profile data

#### Delete Handler Update
Added reset for photoFile state when deleting profile

### 2. Backend - Photo Upload API
**File:** `/src/app/api/exam-section/controller-of-examinations/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const MAX_FILE_SIZE = 250 * 1024; // 250KB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size must not exceed 250KB' },
        { status: 400 }
      );
    }

    // Validate file type (only images)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Create directory if it doesn't exist
    const baseDir = join(process.cwd(), 'public', 'controller-of-examinations');
    if (!existsSync(baseDir)) {
      await mkdir(baseDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const ext = file.name.split('.').pop();
    const fileName = `controller_${timestamp}_${randomString}.${ext}`;
    const filePath = join(baseDir, fileName);

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/controller-of-examinations/${fileName}`;
    
    return NextResponse.json({
      success: true,
      message: 'Photo uploaded successfully',
      url: publicUrl
    });

  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Error uploading photo' },
      { status: 500 }
    );
  }
}
```

**Features:**
- **File Size Validation:** 250KB max enforced on server-side
- **File Type Validation:** Only image files accepted
- **Directory Management:** Auto-creates `public/controller-of-examinations` folder
- **Unique Naming:** Generates names like `controller_1731206400000_abc123.jpg`
- **Public URL:** Returns accessible public path for stored images

### 3. Public Folder Structure
**Created:** `/public/controller-of-examinations/`

This directory stores all uploaded controller photos with unique timestamped filenames.

## File Storage Details

### Storage Location
- **Path:** `public/controller-of-examinations/`
- **Accessible via:** `/controller-of-examinations/{filename}`

### Filename Format
`controller_{timestamp}_{randomString}.{extension}`

**Example:** `controller_1731206400000_abc123.jpg`

### Size Constraints
- **Maximum File Size:** 250KB
- **Validation Layers:**
  - Client-side (before upload)
  - Server-side (on API route)
  - File type check (image/* only)

## API Endpoint

### Photo Upload
- **Route:** `/api/exam-section/controller-of-examinations/upload`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`

**Request:**
```
POST /api/exam-section/controller-of-examinations/upload
Content-Type: multipart/form-data

file: [image file, max 250KB]
```

**Success Response:**
```json
{
  "success": true,
  "message": "Photo uploaded successfully",
  "url": "/controller-of-examinations/controller_1731206400000_abc123.jpg"
}
```

**Error Responses:**
```json
{
  "error": "No file provided"
}
```

```json
{
  "error": "File size must not exceed 250KB"
}
```

```json
{
  "error": "Only image files are allowed"
}
```

## Data Flow

1. **User Action:** User selects image file in form
2. **Client Validation:** 
   - File size checked (250KB max)
   - Error toast shown if validation fails
3. **Form Submit:** User clicks save
4. **Photo Upload:** If new file selected, uploads to API
5. **Server Processing:**
   - Validates file size and type
   - Creates directory if needed
   - Saves file with unique name
   - Returns public URL
6. **Profile Save:** Profile data saved with photo URL
7. **Profile Reload:** Fresh profile data fetched and displayed

## User Experience

### Selecting Photo
1. Click file input field
2. Choose image file (any format: jpg, png, gif, webp, etc.)
3. File name appears below input
4. If selected, preview thumbnail shown (20x20px)

### Size Validation
- If file > 250KB, toast error shown
- File input cleared
- User can try different file or edit image

### Photo Display
- Current photo shown as thumbnail in form
- Previous filename displayed as reference
- New selection replaces old photo on save

## Error Handling

**Client-Side:**
- Toast notifications for all errors
- File input validation
- Clear error messages

**Server-Side:**
- File validation
- Error logging
- HTTP status codes
- JSON error responses

## Rollback Information

If reverting to photo URL input:
1. Remove file upload input from form
2. Delete `handlePhotoChange` logic
3. Restore text input for `photo_url`
4. Remove upload API call from `handleSubmit`
5. Can optionally delete `/public/controller-of-examinations/` folder

## Security Considerations

✅ **Implemented:**
- File type validation (MIME type check)
- File size limit (250KB)
- Unique filename generation (prevents overwrites)
- Server-side validation (not just client-side)

⚠️ **Consider for Production:**
- CORS configuration if needed
- Rate limiting on upload endpoint
- Virus scanning for production
- Access control policies
- Backup strategy for uploaded files

## Testing Recommendations

1. **Upload Valid Image:** Verify file saves and URL returns
2. **Size Validation:** Test with >250KB file
3. **Type Validation:** Test with non-image file
4. **Concurrent Uploads:** Test multiple file uploads
5. **Profile Persistence:** Verify photo URL saved in database
6. **Image Display:** Verify thumbnail preview shows correctly
7. **Delete Profile:** Verify photoFile state resets

## Database Note

- Photo URL stored in `photo_url` field of `controller_of_examinations` table
- Stores public path: `/controller-of-examinations/{filename}`
- Photos can be accessed directly via URL in browser

## Compatibility

- **Browser Support:** All modern browsers with HTML5 File API
- **File Types Supported:** JPG, PNG, GIF, WebP, SVG, and all image formats
- **Responsive:** Works on desktop and mobile devices
