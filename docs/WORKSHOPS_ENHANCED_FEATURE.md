# Enhanced Workshop Section with Category-Based Dropdowns and Gallery

## Overview
The workshop section in the CST department page has been enhanced with:
- **Category Dropdowns**: Filter workshops by category (Workshops, SOC, Guest Lecturers/Seminars)
- **Dynamic Content**: Data fetches based on selected category
- **Image Gallery**: Displays gallery images organized by academic year
- **Responsive Design**: Grid layout for gallery images (1 column on mobile, 3 on desktop)

## Implementation Details

### 1. **State Management** (CST.tsx)

#### New State Variables:
```typescript
const [selectedWorkshopCategory, setSelectedWorkshopCategory] = useState<string>('Workshops');
const [workshopsGallery, setWorkshopsGallery] = useState<any[]>([]);
```

#### State Initialization:
- `selectedWorkshopCategory`: Tracks which category is currently selected (default: 'Workshops')
- `workshopsGallery`: Stores gallery data fetched from `/api/cst/cst-workshops-gallery`

### 2. **API Endpoints**

#### Workshop Data API
**Endpoint**: `/api/cst/cst-workshops`
- **Query**: `SELECT * FROM cst_workshops ORDER BY id DESC`
- **Returns**: All workshops with fields:
  - `id`: Unique identifier
  - `category`: Category (Workshops, SOC, Guest Lecturers/Seminars)
  - `title`: Workshop title
  - `file_url`: Link to workshop details/documents

#### Workshop Gallery API
**Endpoint**: `/api/cst/cst-workshops-gallery`
- **Query**: `SELECT id, category, academic_year, gallery, created_at FROM cst_hackathons_gallery WHERE category IN ('workshops', 'lectures')`
- **Returns**: Gallery items with:
  - `id`: Unique identifier
  - `category`: 'workshops' or 'lectures' (for Guest Lecturers)
  - `academic_year`: Academic year (e.g., 2024-2025)
  - `gallery`: Comma-separated image URLs
  - `created_at`: Creation timestamp

### 3. **Component Logic**

#### Category Mapping:
```typescript
const categoryGalleryMap: { [key: string]: string } = {
  'Workshops': 'workshops',
  'SOC': 'workshops',
  'Guest Lecturers/Seminars': 'lectures'
};
```
This maps workshop categories to gallery categories for matching images.

#### Data Filtering:
1. **Workshop Details**: Filtered by `workshop.category === selectedWorkshopCategory`
2. **Gallery Images**: Filtered by matching the mapped gallery category
3. **Image Parsing**: Gallery field parsed from comma-separated string to array

#### Gallery Parsing Logic:
```typescript
const parsedGalleryImages: { year: string; images: string[] }[] = [];
filteredGallery.forEach((item: any) => {
  const images = item.gallery
    ? item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
    : [];
  if (images.length > 0) {
    parsedGalleryImages.push({
      year: item.academic_year || 'Current',
      images
    });
  }
});
```

### 4. **UI Structure**

#### Dropdown Filter:
```tsx
<select
  value={selectedWorkshopCategory}
  onChange={(e) => setSelectedWorkshopCategory(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent"
>
  <option value="Workshops">Workshops</option>
  <option value="SOC">SOC</option>
  <option value="Guest Lecturers/Seminars">Guest Lecturers/Seminars</option>
</select>
```

#### Workshop Details Section:
- Collapsible dropdown showing details for selected category
- Each item displays:
  - Workshop title (bold)
  - "View Details" link to file_url (styled in red with arrow)
- Fallback message if no data available

#### Gallery Section:
- Collapsible dropdown per academic year
- Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Image sizing: `w-full h-[250px] object-cover`
- Hover effect: Shadow enhancement on hover
- Error handling: Image hidden on load failure

### 5. **Styling Details**

**Colors:**
- Primary: `#B22222` (CST Red)
- Text: Gray-800 (headings), Gray-700 (labels), Gray-500 (empty states)
- Backgrounds: White with gray-50 for content boxes

**Spacing:**
- Category selector: `mb-8` (margin bottom)
- Details sections: `space-y-8` (8px between sections)
- Workshop items: `space-y-4` (4px between items)
- Gallery grid: `gap-6` (6px gaps between items)

**Typography:**
- Main heading: `text-3xl font-bold`
- Section headings: `text-xl font-bold`
- Item titles: `font-semibold`
- Labels: `text-sm font-semibold`

### 6. **Data Flow Diagram**

```
[API: cst-workshops] ─→ Filter by category ─→ Display in Details Dropdown
                                ↓
                        [Selected Category]
                                ↓
[API: cst-workshops-gallery] ─→ Filter by gallery category ─→ Parse gallery field ─→ Display by year
```

### 7. **Database Schema References**

#### cst_workshops Table:
```
id (INT) - Primary key
category (VARCHAR) - 'Workshops', 'SOC', 'Guest Lecturers/Seminars'
title (VARCHAR) - Workshop title
file_url (VARCHAR) - Link to document
created_at (TIMESTAMP)
```

#### cst_hackathons_gallery Table:
```
id (INT) - Primary key
category (VARCHAR) - 'workshops' or 'lectures'
academic_year (VARCHAR) - e.g., '2024-2025'
gallery (LONGTEXT) - Comma-separated image URLs
created_at (TIMESTAMP)
```

### 8. **User Interactions**

1. **Select Category**:
   - User clicks dropdown and selects a category
   - Component re-renders with filtered data
   - Workshop details update immediately
   - Gallery section updates to show relevant images

2. **View Workshop Details**:
   - User clicks "View Details →" link
   - Opens document/file in new tab (target="_blank")

3. **Expand Gallery**:
   - User can expand/collapse gallery sections
   - First year is expanded by default (`open={yearIdx === 0}`)

4. **View Images**:
   - Images load automatically
   - Failed images are hidden gracefully
   - Grid layout adapts to screen size

### 9. **Browser Compatibility**

- Modern browsers supporting ES6+
- CSS Grid and Flexbox
- localStorage for session state (if needed future enhancement)
- Responsive design works on all screen sizes

### 10. **Performance Considerations**

- All data fetched once on component mount
- Filtering happens client-side (no additional API calls)
- Images lazy load as needed
- Gallery parsing done once per load
- No infinite loops or performance bottlenecks

### 11. **Testing Checklist**

- [ ] Category dropdown filters correctly
- [ ] Workshop details display for selected category
- [ ] Gallery images display for selected category
- [ ] Images organized by academic year
- [ ] View Details links work correctly
- [ ] Empty state messages show when no data
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Images fail gracefully if URL invalid
- [ ] Dropdown persistence works across navigation
- [ ] No console errors during filtering

### 12. **Files Modified**

1. **src/pages/departments/CST.tsx**
   - Added state variables for category selection and gallery data
   - Updated useEffect to fetch gallery data
   - Replaced workshop case in renderContent() with enhanced version
   - Added state setter for workshopsGallery

2. **src/pages/api/cst/cst-workshops-gallery.ts**
   - Updated query to fetch both 'workshops' and 'lectures' categories
   - Changed from `WHERE category = 'workshop'` to `WHERE category IN ('workshops', 'lectures')`

### 13. **Future Enhancements**

- Add search functionality to filter by title
- Add filtering by academic year
- Add image lightbox/modal view
- Add download functionality for galleries
- Add sorting options (date, name, etc.)
- Add pagination for large datasets
- Add analytics tracking for user interactions
- Add image preview on hover

### 14. **Dependencies**

- React hooks (useState, useEffect)
- TypeScript (any type used for flexibility)
- Tailwind CSS classes for styling
- Existing CST database structure

---

**Last Updated**: November 25, 2025
**Status**: ✅ Complete and Ready for Testing
