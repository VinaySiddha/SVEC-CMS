# Department View Pages - Image Size Standardization

## Requirement
Standardize image sizes across all department view pages to **400x300px**, with the exception of HOD profile pictures which should maintain their original aspect ratio.

## Current Status

### Images That Need to be Set to 400x300px
- Gallery images (various modules)
- Extra-curricular activity images
- Workshop images
- Faculty development images
- Event images
- Student achievement images
- Physical facilities images
- Training activities images

### Images That Should Keep Original Aspect Ratio (Exclude from 400x300px)
- HOD profile pictures (`hod_image_url`)

## Implementation Plan

### 1. CST Department (CST.tsx)
**Current:** Various gallery sections have `height: '300px', width: '400px'`
**Status:** ✓ Already correct (400x300px)
**Verification needed for:**
- Extra-curricular activities gallery
- Physical facilities gallery
- Training activities gallery
- All other gallery sections

### 2. Other Department Pages
Check and standardize:
- CSEAI.tsx
- AIML.tsx
- MBA.tsx
- CSEDS.tsx
- ECE.tsx
- CIVIL.tsx
- Mechanical.tsx
- And others

## File Locations to Check

### Images with Fixed Dimensions:
```
src/pages/departments/
├── CST.tsx
├── CSEAI.tsx
├── AIML.tsx
├── MBA.tsx
├── CSEDS.tsx
├── ds.tsx
├── ECE.tsx
├── CIVIL.tsx
├── Mechanical.tsx
└── [other department files]
```

## CSS Class / Style Reference

### Gallery Images (400x300px)
```tsx
// Using inline style
style={{ height: '300px', width: '400px' }}

// Using Tailwind classes
className="w-[400px] h-[300px]"
```

### HOD Images (Auto/Responsive)
```tsx
// Keep as is
className="w-full h-auto object-cover"
```

## Standardized Pattern

### For Gallery/Gallery-like Images:
```tsx
<img
  src={imageUrl}
  alt="Image description"
  className="rounded-lg shadow-md object-cover"
  style={{ height: '300px', width: '400px' }}
/>
```

### For HOD Images:
```tsx
<img
  src={overview.hod_image_url}
  alt={overview.hod_name}
  className="w-full h-auto object-cover rounded-lg shadow-md"
/>
```

## Implementation Checklist

- [ ] Audit all department files for image dimensions
- [ ] Update all gallery images to 400x300px
- [ ] Verify HOD images use `w-full h-auto`
- [ ] Test responsive behavior on mobile devices
- [ ] Verify object-cover property is used for all images
- [ ] Test in different browsers

## Notes

- **400x300px ratio:** 4:3 aspect ratio (landscape orientation)
- **object-cover:** Ensures images fill the space while maintaining aspect ratio
- **Consistency:** All gallery-type images should follow the same standard
- **Performance:** Fixed dimensions help prevent layout shift (CLS)

---
**Date:** November 25, 2025
**Status:** Planning Phase
