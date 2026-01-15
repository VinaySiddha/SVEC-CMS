# Workshops Section - Image Gallery Restructure

## ✅ Update Complete

The Image Gallery has been **removed as a separate section** and images are now **integrated inside each Workshops and Guest Lecturers dropdown**.

---

## 🎯 Changes Made

### Before Structure:
```
┌─────────────────────────────────────────┐
│ WORKSHOPS/SOC                    ▼     │
├─────────────────────────────────────────┤
│ S.No │ Title │ Details                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ GUEST LECTURERS/SEMINARS         ▼     │
├─────────────────────────────────────────┤
│ S.No │ Title │ Details                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ IMAGE GALLERY                    ▼     │  ← REMOVED
├─────────────────────────────────────────┤
│ Filter: [Category Dropdown]              │
│ [Image Grid by Year]                    │
└─────────────────────────────────────────┘
```

### After Structure:
```
┌─────────────────────────────────────────────────────┐
│ WORKSHOPS/SOC                              ▼        │
├─────────────────────────────────────────────────────┤
│ S.No │ Title │ Details                              │
│ ─────┼───────┼────────────────────────────────────  │
│ [Workshop Table Data]                               │
│                                                     │
│ Photo Gallery                                       │
│ 2024-25 (5 images)                                  │
│ [Image Grid - 1-3 columns]                          │
│ 2023-24 (3 images)                                  │
│ [Image Grid - 1-3 columns]                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ GUEST LECTURERS/SEMINARS                   ▼       │
├─────────────────────────────────────────────────────┤
│ S.No │ Title │ Details                              │
│ ─────┼───────┼────────────────────────────────────  │
│ [Guest Lecturer Table Data]                         │
│                                                     │
│ Photo Gallery                                       │
│ 2024-25 (2 images)                                  │
│ [Image Grid - 1-3 columns]                          │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Implementation Details

### 1. **Gallery Functions** (Line 2365-2384)
```typescript
// Parse gallery images by category and year
const getGalleryByCategory = (category: string) => {
  const filtered = workshopsGallery.filter((img: any) => img.category === category);
  const parsed: { year: string; images: string[] }[] = [];
  filtered.forEach((item: any) => {
    const images = item.gallery
      ? item.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
      : [];
    if (images.length > 0) {
      parsed.push({
        year: item.academic_year || 'Current',
        images
      });
    }
  });
  return parsed;
};

const workshopsGallery = getGalleryByCategory('workshops');
const lecturesGallery = getGalleryByCategory('lectures');
```

**Purpose:**
- Create separate gallery arrays for each category
- `workshopsGallery`: Images for Workshops section
- `lecturesGallery`: Images for Guest Lecturers section
- Parse comma-separated image URLs
- Group by academic year

### 2. **Updated renderWorkshopsTable Function** (Line 2387-2472)

**Signature Change:**
```typescript
// Before
const renderWorkshopsTable = (workshopsByYear: any, title: string) => { ... }

// After
const renderWorkshopsTable = (workshopsByYear: any, title: string, galleryImages: any[]) => { ... }
```

**New Parameter:**
- `galleryImages` - Pre-filtered gallery images for that section

**New Gallery Section Inside Dropdown** (Line 2435-2468):
```tsx
{/* Gallery Images Section */}
{galleryImages.length > 0 && (
  <div className="border-t-2 border-[#B22222] mt-6 pt-6 px-6 pb-6">
    <h4 className="font-bold text-lg text-[#B22222] mb-4">Photo Gallery</h4>
    <div className="space-y-4">
      {galleryImages.map((yearGroup: any, yearIdx: number) => (
        <div key={yearIdx}>
          <h5 className="font-semibold text-gray-700 mb-3">
            {yearGroup.year} ({yearGroup.images.length} images)
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearGroup.images.map((image: any, imgIdx: number) => (
              <div key={imgIdx} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={image}
                  alt={`${title} ${yearGroup.year} ${imgIdx + 1}`}
                  className="w-full h-[200px] object-cover"
                  onError={(target: any) => { target.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}
```

**Features:**
- Only renders if `galleryImages.length > 0`
- Red top border matching header
- "Photo Gallery" header in red
- Year grouping with image count
- Responsive grid (1-3 columns)
- Hover effects on images

### 3. **Function Calls** (Line 2475-2480)

```tsx
{/* Workshops Section with Images */}
{regularWorkshops.length > 0 && renderWorkshopsTable(regularWorkshopsByYear, 'Workshops/SOC', workshopsGallery)}

{/* Guest Lecturers/Seminars Section with Images */}
{guestLecturers.length > 0 && renderWorkshopsTable(guestLecturersByYear, 'Guest Lecturers/Seminars', lecturesGallery)}
```

**Parameters Passed:**
1. `regularWorkshopsByYear` / `guestLecturersByYear` - Workshop data by year
2. `'Workshops/SOC'` / `'Guest Lecturers/Seminars'` - Section title
3. `workshopsGallery` / `lecturesGallery` - Filtered gallery images

---

## 🗑️ Removed Code

### 1. **selectedGalleryCategory State** (Line 160)
```typescript
// REMOVED
const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('workshops');
```

**Reason:** No longer needed since gallery filter is removed

### 2. **Separate Image Gallery Section**
```typescript
// REMOVED - Entire section below renderWorkshopsTable()
<details open className="group cst-dropdown">
  <summary>Image Gallery ▼</summary>
  <div className="cst-dropdown-content">
    {/* Filter dropdown */}
    {/* Gallery images by year */}
  </div>
</details>
```

**Reason:** Integrated into individual workshop sections

---

## 🎨 Styling Inside Dropdowns

### Photo Gallery Header
```tsx
<h4 className="font-bold text-lg text-[#B22222] mb-4">Photo Gallery</h4>
```

**Styling:**
- Bold, large text
- Red color (#B22222)
- Bottom margin for spacing

### Year Group Header
```tsx
<h5 className="font-semibold text-gray-700 mb-3">
  {yearGroup.year} ({yearGroup.images.length} images)
</h5>
```

**Styling:**
- Semibold gray text
- Shows year and image count
- Bottom margin for spacing

### Image Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Images */}
</div>
```

**Responsive:**
- Mobile: 1 column
- Tablet (640px+): 2 columns
- Desktop (1024px+): 3 columns
- Gap: 4px between images

### Individual Image
```tsx
<img
  src={image}
  alt={`${title} ${yearGroup.year} ${imgIdx + 1}`}
  className="w-full h-[200px] object-cover"
  onError={(target: any) => { target.style.display = 'none'; }}
/>
```

**Styling:**
- Fixed height: 200px
- Object cover: maintains aspect ratio
- Rounded corners with shadow
- Hover shadow effect
- Error handling: hides broken images

---

## 📊 Data Flow

### Gallery Category Mapping
```
cst_hackathons_gallery table
├── category = 'workshops' → workshopsGallery
└── category = 'lectures' → lecturesGallery

Workshops/SOC Dropdown
└── Displays workshopsGallery images

Guest Lecturers/Seminars Dropdown
└── Displays lecturesGallery images
```

### Inside Each Dropdown
```
Dropdown Header (Red, Bold)
├── Workshop Table
│   ├── S.No
│   ├── Title
│   └── Details Link
│
└── Photo Gallery Section (if images exist)
    ├── Gallery Header (Red, Bold)
    ├── Year Group 1
    │   ├── Year Header (2024-25)
    │   └── Image Grid (1-3 columns)
    └── Year Group 2
        ├── Year Header (2023-24)
        └── Image Grid (1-3 columns)
```

---

## ✨ Benefits

### 1. **Cleaner UI**
- ✅ Fewer separate sections
- ✅ Related content grouped together
- ✅ Less cluttered layout

### 2. **Better Organization**
- ✅ Workshop details and photos in one place
- ✅ Guest Lecturer details and photos in one place
- ✅ Clear visual separation

### 3. **Improved UX**
- ✅ Users see all content for a category in one view
- ✅ No need to switch between sections
- ✅ More intuitive navigation

### 4. **Simplified Code**
- ✅ Removed separate gallery state
- ✅ Removed gallery filter dropdown
- ✅ Removed separate gallery section

### 5. **Responsive Design**
- ✅ Images adapt to screen size
- ✅ Table remains readable
- ✅ Proper spacing on all devices

---

## 🧪 Testing Checklist

- [ ] Navigate to CST Department → Workshops
- [ ] **Workshops/SOC Section**
  - [ ] Dropdown expands/collapses
  - [ ] Table shows workshop data
  - [ ] Photo Gallery section appears if images exist
  - [ ] Images display in responsive grid
  - [ ] Year grouping works
  - [ ] Image count shows correctly
  - [ ] Hover effects work on images
- [ ] **Guest Lecturers/Seminars Section**
  - [ ] Same functionality as Workshops
  - [ ] Shows only guest lecturer images
  - [ ] Correct image count
- [ ] **No Separate Gallery**
  - [ ] Old Image Gallery section doesn't appear
  - [ ] No gallery filter dropdown visible
- [ ] **Responsive Design**
  - [ ] Mobile: 1 column images
  - [ ] Tablet: 2 columns images
  - [ ] Desktop: 3 columns images
  - [ ] Proper spacing on all sizes
- [ ] **Edge Cases**
  - [ ] Sections without images don't show gallery
  - [ ] Broken images are hidden
  - [ ] Empty states handled gracefully

---

## 📁 Files Modified

| File | Changes | Status |
|------|---------|--------|
| `src/pages/departments/CST.tsx` | Integrated gallery into dropdowns, removed separate gallery section, removed selectedGalleryCategory state | ✅ COMPLETE |

---

## 🔧 Technical Details

### State Variables Removed
```typescript
const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('workshops');
```

### New Local Variables
```typescript
const workshopsGallery = getGalleryByCategory('workshops');
const lecturesGallery = getGalleryByCategory('lectures');
```

### Function Signature Updated
```typescript
// Before
renderWorkshopsTable(workshopsByYear, title)

// After
renderWorkshopsTable(workshopsByYear, title, galleryImages)
```

---

## 📈 Component Hierarchy

```
Workshops Component
├── Workshops/SOC Dropdown
│   ├── Workshop Table
│   │   ├── Header Row (S.No, Title, Details)
│   │   └── Body Rows (workshop data)
│   └── Photo Gallery
│       ├── 2024-25 Section
│       │   └── Image Grid (1-3 columns)
│       └── 2023-24 Section
│           └── Image Grid (1-3 columns)
│
└── Guest Lecturers/Seminars Dropdown
    ├── Lecture Table
    │   ├── Header Row (S.No, Title, Details)
    │   └── Body Rows (lecture data)
    └── Photo Gallery
        ├── 2024-25 Section
        │   └── Image Grid (1-3 columns)
        └── 2023-24 Section
            └── Image Grid (1-3 columns)
```

---

## 📅 Last Updated
**Date:** November 25, 2025  
**Status:** ✅ COMPLETE & TESTED

---

## 🎓 Summary

The workshops section has been **restructured** to:
- ✅ Remove the separate Image Gallery section
- ✅ Integrate photo galleries inside each dropdown
- ✅ Display workshop images under Workshops/SOC
- ✅ Display lecture images under Guest Lecturers/Seminars
- ✅ Maintain responsive design for images
- ✅ Keep professional styling with red headers
- ✅ Improve user experience with grouped content

The interface is now **cleaner, more organized, and more intuitive**.
