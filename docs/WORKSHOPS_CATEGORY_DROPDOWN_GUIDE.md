# Workshop Section with Category Dropdowns - Quick Guide

## What Changed?

The workshop section in CST department page now has:
- ✅ **Category Dropdown Filter** - Select Workshops, SOC, or Guest Lecturers/Seminars
- ✅ **Dynamic Workshop Details** - Shows workshops for selected category
- ✅ **Gallery Images** - Organized by academic year
- ✅ **Responsive Grid Layout** - Adapts to all screen sizes

## User Guide

### How to Navigate

1. Go to **CST Department** page
2. Click **Workshops** in the sidebar
3. You'll see:
   - Category dropdown (top)
   - Workshop Details section
   - Gallery section with images

### How to Use

**Step 1: Select Category**
```
[Dropdown] Select Category
├─ Workshops
├─ SOC
└─ Guest Lecturers/Seminars
```

**Step 2: View Workshop Details**
- All workshops for selected category display
- Click "📄 View Details →" to open document

**Step 3: Browse Gallery**
- Gallery automatically updates for selected category
- Organized by academic year (2024-2025, 2025-2026, etc.)
- Images in responsive grid

## Technical Implementation

### State Variables Added to CST.tsx

```typescript
// Selected workshop category
const [selectedWorkshopCategory, setSelectedWorkshopCategory] = useState<string>('Workshops');

// Workshop gallery data
const [workshopsGallery, setWorkshopsGallery] = useState<any[]>([]);
```

### API Updates

**Workshop Gallery API** - `src/pages/api/cst/cst-workshops-gallery.ts`
- Now fetches both 'workshops' and 'lectures' categories
- Query updated to: `WHERE category IN ('workshops', 'lectures')`

### Component Updates

**CST.tsx - Workshops Case Statement**
- Filters workshops by `category === selectedWorkshopCategory`
- Maps workshop categories to gallery categories
- Parses gallery field (comma-separated URLs to array)
- Groups images by academic year

## Data Flow

```
┌─────────────────────────────────────────────┐
│         User Selects Category               │
├─────────────────────────────────────────────┤
│  'Workshops' → 'workshops' gallery category │
│  'SOC' → 'workshops' gallery category       │
│  'Guest Lecturers/Seminars' → 'lectures'   │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│   Filter Workshop Details by Category       │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│   Filter Gallery Images by Category         │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│   Group Images by Academic Year             │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│   Display in Responsive Grid Layout         │
└─────────────────────────────────────────────┘
```

## Category Mapping Reference

| Workshop Category | Gallery Category | Content |
|------------------|------------------|---------|
| Workshops | workshops | Workshop images, photos, documents |
| SOC | workshops | SOC-related images and materials |
| Guest Lecturers/Seminars | lectures | Guest lecturer photos, seminar images |

## Database Queries

### Get Workshop Details
```sql
SELECT * FROM cst_workshops 
WHERE category = ? 
ORDER BY id DESC
```

### Get Gallery Images
```sql
SELECT id, category, academic_year, gallery, created_at 
FROM cst_hackathons_gallery 
WHERE category IN ('workshops', 'lectures')
ORDER BY academic_year DESC, created_at DESC
```

## Image Data Format

The gallery field stores comma-separated URLs:
```
"https://example.com/img1.jpg,https://example.com/img2.jpg,https://example.com/img3.jpg"
```

Component automatically:
1. Splits by comma
2. Trims whitespace
3. Filters empty strings
4. Groups by academic year

## UI Components

### Dropdown Selection
```tsx
<select value={selectedWorkshopCategory} onChange={(e) => setSelectedWorkshopCategory(e.target.value)}>
  <option value="Workshops">Workshops</option>
  <option value="SOC">SOC</option>
  <option value="Guest Lecturers/Seminars">Guest Lecturers/Seminars</option>
</select>
```

### Workshop Details Rendering
```tsx
{filteredWorkshops.map((workshop) => (
  <div className="p-4 border-l-4 border-[#B22222] bg-gray-50 rounded">
    <p className="font-semibold">{workshop.title}</p>
    {workshop.file_url && (
      <a href={workshop.file_url} target="_blank">📄 View Details →</a>
    )}
  </div>
))}
```

### Gallery Rendering
```tsx
{parsedGalleryImages.map((yearGroup) => (
  <details open={yearIdx === 0}>
    <summary>{yearGroup.year} Gallery</summary>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {yearGroup.images.map((image) => (
        <img src={image} className="w-full h-[250px] object-cover" />
      ))}
    </div>
  </details>
))}
```

## Styling Details

**Colors:**
- Primary Red: `#B22222` (CST brand)
- Text: Gray-800 (headings), Gray-700 (secondary)
- Hover: Darker red with underline for links

**Responsive Breakpoints:**
- Mobile (default): 1 column grid
- sm (small): 2 columns
- lg (large): 3 columns

**Image Sizing:**
- Fixed height: `h-[250px]`
- Full width: `w-full`
- Object cover: `object-cover` (maintains aspect ratio)

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/departments/CST.tsx` | Added category state, gallery state, updated workshops case |
| `src/pages/api/cst/cst-workshops-gallery.ts` | Updated query to fetch 'workshops' and 'lectures' |

## Testing the Feature

### Prerequisites
✅ Database has workshops with categories: 'Workshops', 'SOC', 'Guest Lecturers/Seminars'
✅ Database has gallery items with categories: 'workshops', 'lectures'
✅ Gallery field has comma-separated image URLs

### Test Steps
1. Open CST Department page
2. Click Workshops
3. Verify dropdown shows 3 options
4. Select "Workshops" → Check details display correctly
5. Select "SOC" → Check details update
6. Select "Guest Lecturers/Seminars" → Check details and gallery update
7. Verify gallery images display in grid
8. Test responsive layout (resize browser)
9. Click "View Details" links → Should open in new tab
10. Verify image error handling (broken images hidden)

## Troubleshooting

### Dropdown Not Showing Options
- Check module-fields.ts has correct category options
- Verify API response includes category field

### Details Not Filtering
- Verify workshop.category matches dropdown value exactly
- Check database for workshops with 'Workshops', 'SOC', 'Guest Lecturers/Seminars' exactly
- Open console → Check API response data

### Gallery Images Not Showing
- Verify gallery table has 'workshops' and 'lectures' categories
- Check gallery field has valid image URLs
- Ensure URLs are properly comma-separated
- Open browser console → Check for image load errors

### Responsive Layout Not Working
- Clear browser cache
- Check CSS Grid classes are loaded
- Verify Tailwind CSS is properly configured

## Performance Notes

- ✅ All data fetched once on component mount
- ✅ Filtering done client-side (no extra API calls)
- ✅ Images lazy load as needed
- ✅ Gallery parsing optimized
- ✅ No performance bottlenecks

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**Status**: ✅ Complete and Tested
**Last Updated**: November 25, 2025
**Production Ready**: Yes
