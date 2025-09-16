# CSEAI Dynamic Content Implementation

## Overview
Successfully moved static content from CSEAI.tsx to database-driven dynamic content. The implementation includes database tables, API endpoints, and updated frontend components.

## Database Tables Created

### 1. `department_sidebar_items`
- Stores navigation menu items for departments
- Fields: id, department, item_id, label, icon_name, display_order, is_active
- Supports dynamic sidebar menu management

### 2. `placement_batches`
- Stores placement batch information and documents
- Fields: id, department, batch_name, academic_year, document_url, document_title, display_order
- Enables dynamic placement data management

### 3. `placement_gallery`
- Stores placement gallery images with student details
- Fields: id, department, batch_name, image_url, alt_text, student_roll_no, student_name, company_name, package_amount
- Supports dynamic gallery management

### 4. `department_eresources`
- Stores e-learning resources and materials
- Fields: id, department, category, title, description, file_url, file_type, academic_year, semester
- Enables dynamic resource management

### 5. `department_info_sections`
- Stores department information sections (Vision, Mission, etc.)
- Fields: id, department, section_name, section_title, section_content, display_order
- For future implementation of dynamic department info

## API Endpoints Created

### 1. `/api/cseai/sidebar-items`
- GET: Fetch sidebar navigation items for CSEAI department
- Supports department filtering via query parameter

### 2. `/api/cseai/placement-batches`
- GET: Fetch placement batch information
- Returns batches with document URLs and titles

### 3. `/api/cseai/placement-gallery`
- GET: Fetch placement gallery images
- Groups images by batch name
- Includes student details and company information

### 4. `/api/cseai/eresources`
- GET: Fetch e-learning resources
- Groups resources by category and academic year
- Supports filtering by category and academic year

## Frontend Updates

### CSEAI.tsx Changes
1. **Added Dynamic State Management**
   - `dynamicSidebarItems` - for sidebar navigation
   - `placementBatches` - for placement data
   - `placementGallery` - for gallery images
   - `eresources` - for e-learning resources

2. **Added API Fetching**
   - useEffect hooks to fetch data from new APIs
   - Error handling with fallback to static content

3. **Dynamic Sidebar Implementation**
   - Icon component mapping function
   - Dynamic sidebar items with fallback to static content

4. **Dynamic Placements Section**
   - Dynamic placement batches display
   - Dynamic gallery with student information
   - Fallback to static content if API fails

5. **Dynamic E-Resources Section**
   - Dynamic table generation for V20 subjects
   - Fallback to static content if API fails

## Benefits

1. **Content Management**: Admin can now manage content through database without code changes
2. **Scalability**: Easy to add new departments or content types
3. **Maintainability**: Separation of content from code logic
4. **Flexibility**: Dynamic ordering and activation/deactivation of content
5. **Fallback Support**: Graceful degradation if APIs fail

## Usage

### For Admins
- Use database management tools to insert/update content in the new tables
- Control display order using `display_order` field
- Enable/disable content using `is_active` field

### For Developers
- APIs are RESTful and follow existing patterns
- Frontend automatically fetches and displays dynamic content
- Fallback mechanisms ensure site stability

## Sample Data
Initial sample data has been inserted for:
- Sidebar navigation items (21 items)
- Placement batches (3 batches with documents)
- Placement gallery (3 images with student details)
- E-resources (13 V20 subject materials)

## Future Enhancements
1. Admin interface for content management
2. Image upload functionality for gallery
3. Rich text editor for department info sections
4. Content versioning and approval workflow
5. Multi-language support
