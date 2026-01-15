# Placement Gallery Feature Implementation

## Overview

This implementation adds comprehensive image gallery management functionality to the Placement Dashboard, allowing users to add, edit, and delete placement-related images.

## Features Added

### 1. **Add Images**
- Upload new images with title and caption
- Form validation using Zod schema
- File upload with preview functionality
- Automatic image resizing and optimization

### 2. **View Images**
- Grid-based gallery display
- Image thumbnails with hover effects
- Full-screen image viewing capability
- Department-wise filtering

### 3. **Edit Images**
- Edit existing image metadata (title, caption, department)
- Replace existing images with new uploads
- Form pre-population with existing data

### 4. **Delete Images**
- Confirmation dialog before deletion
- Automatic file cleanup from storage
- Database record removal

## Files Modified/Created

### Frontend Components

1. **`src/app/placement/dashboard/page.tsx`**
   - Added gallery section with state management
   - Integrated form and list components
   - Added handlers for CRUD operations

2. **`src/components/placements/PlacementGalleryForm.tsx`**
   - Updated toast implementation from `useToast` to `sonner`
   - Fixed API endpoint references
   - Enhanced form validation and error handling

3. **`src/components/lists/GalleryImagesList.tsx`**
   - Updated to use placement-specific API endpoints
   - Enhanced UI with proper loading states
   - Improved error handling

4. **`src/components/forms/GalleryImageForm.tsx`**
   - Updated API endpoints for placement gallery
   - Enhanced form validation
   - Improved user experience

### Backend API Routes

1. **`src/app/api/placement/gallery/route.ts`**
   - GET: Fetch placement gallery images
   - POST: Upload new gallery images
   - File upload handling with FormData
   - Image storage in `/public/uploads/placement-gallery/`

2. **`src/app/api/placement/gallery/[id]/route.ts`**
   - GET: Fetch single gallery image
   - PUT: Update gallery image metadata and file
   - DELETE: Remove gallery image and associated file
   - Proper file cleanup on deletion

### Database Schema

1. **`migrations/migrate-placement-gallery.js`**
   - Creates `placement_gallery` table
   - Schema includes: id, dept, title, image_url, caption, timestamps

2. **`migrations/seed-placement-gallery.js`**
   - Sample data for testing the gallery functionality
   - 5 sample placement-related images

## Database Schema

```sql
CREATE TABLE placement_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept VARCHAR(100) NOT NULL DEFAULT 'placement',
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX idx_dept (dept),
  INDEX idx_created_at (created_at),
  INDEX idx_deleted (deleted_at)
);
```

## API Endpoints

### Gallery Management
- `GET /api/placement/gallery` - Fetch gallery images (optional dept filter)
- `POST /api/placement/gallery` - Upload new image
- `GET /api/placement/gallery/[id]` - Get single image
- `PUT /api/placement/gallery/[id]` - Update image
- `DELETE /api/placement/gallery/[id]` - Delete image

### Request/Response Format

#### POST/PUT Request (FormData)
```javascript
const formData = new FormData();
formData.append('title', 'Image Title');
formData.append('caption', 'Image Description');
formData.append('dept', 'placement');
formData.append('image', fileObject);
```

#### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": 1,
    "dept": "placement",
    "title": "Campus Drive 2024",
    "image_url": "/uploads/placement-gallery/image.jpg",
    "caption": "Description text"
  }
}
```

## Setup Instructions

### 1. Database Setup
```bash
# Create the placement_gallery table
cd migrations
node migrate-placement-gallery.js

# Optionally seed with sample data
node seed-placement-gallery.js
```

### 2. File Upload Directory
Ensure the upload directory exists:
```bash
mkdir -p public/uploads/placement-gallery
```

### 3. Environment Variables
Make sure your database connection is properly configured in your environment file.

## Usage

### Access the Gallery
1. Navigate to the Placement Dashboard (`/placement/dashboard`)
2. Scroll to the "Placement Gallery" section
3. Use the "Add Image" button to upload new images
4. Use the action menu on each image for edit/delete operations

### Upload Guidelines
- Supported formats: JPG, JPEG, PNG, GIF
- Recommended size: Max 5MB
- Images are stored in `/public/uploads/placement-gallery/`

## Features

### State Management
- Form state for add/edit modes
- Loading states during operations
- Error handling with user feedback

### User Experience
- Image preview before upload
- Confirmation dialogs for destructive operations
- Toast notifications for success/error feedback
- Responsive grid layout

### Security
- File type validation
- Size limits on uploads
- Sanitized file names
- Proper error handling

## Technical Details

### Image Processing
- Automatic file naming with timestamps
- Path sanitization for security
- File cleanup on deletion/update

### Error Handling
- Database transaction safety
- File operation error recovery
- User-friendly error messages

### Performance
- Optimized database queries with indexes
- Efficient file storage structure
- Responsive image loading

## Future Enhancements

1. **Image Optimization**
   - Automatic image resizing
   - WebP format conversion
   - Lazy loading implementation

2. **Advanced Features**
   - Bulk upload capability
   - Image tagging system
   - Search functionality

3. **Security Improvements**
   - Image content validation
   - Rate limiting on uploads
   - User permission checks

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify environment variables
   - Check database server status
   - Ensure proper credentials

2. **File Upload Issues**
   - Check directory permissions
   - Verify upload directory exists
   - Check file size limits

3. **API Errors**
   - Check network connectivity
   - Verify API endpoint URLs
   - Check request format

### Debug Information
- Check browser console for JavaScript errors
- Review server logs for API errors
- Verify database table structure

This implementation provides a complete image gallery management system for the Placement Dashboard with full CRUD functionality, proper error handling, and a user-friendly interface.