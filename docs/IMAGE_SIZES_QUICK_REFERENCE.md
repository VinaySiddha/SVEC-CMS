# Quick Reference - Department Image Sizes

## Standard Image Sizes

### Gallery Images (All Departments)
```
Size:        400px × 300px
Ratio:       4:3 (Landscape)
CSS Class:   w-[400px] h-[300px] rounded-lg shadow-lg object-cover
```

### HOD Profile Images (All Departments)  
```
Size:        Responsive (Original Aspect Ratio)
Width:       100% of container
Height:      Auto (maintains aspect ratio)
CSS Class:   w-full h-auto object-cover rounded-lg shadow-md
```

---

## When to Use Each Size

### Use 400x300px for:
- ✅ Gallery images
- ✅ Event photos
- ✅ Workshop images
- ✅ Activity images
- ✅ Physical facilities photos
- ✅ Student achievement images
- ✅ Training activity images
- ✅ Any "collection" or "grid" display

### Use Original Aspect Ratio (w-full h-auto) for:
- ✅ HOD profile pictures
- ✅ Department head images
- ✅ Faculty profile photos (when solo, not in gallery)
- ✅ Important single photos

---

## Code Template

### Gallery Image (Correct)
```tsx
<img
  src={imageUrl}
  alt="Description"
  className="w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
  onError={(e) => {
    (e.target as HTMLImageElement).src = '/placeholder-image.svg';
    (e.target as HTMLImageElement).className = 'w-[400px] h-[300px] rounded-lg shadow-lg bg-gray-200';
  }}
/>
```

### HOD Image (Correct)
```tsx
<img
  src={overview.hod_image_url}
  alt={overview.hod_name}
  className="w-full h-auto object-cover rounded-lg shadow-md"
/>
```

---

## Recent Updates (Nov 25, 2025)

| Department | Gallery Type | Status |
|------------|--------------|--------|
| CST | Hackathons-Gallery | ✅ 400x300px |
| AIML | Technical Association | ✅ 400x300px |
| CSEDS (ds) | Technical Association | ✅ 400x300px |

---

## Why 400x300px?

1. **Professional Aspect Ratio** - 4:3 is balanced and classic
2. **Landscape Orientation** - Best for photo galleries
3. **Mobile Friendly** - Scales well on responsive designs
4. **Standard Size** - Used across most gallery implementations
5. **Performance** - Fixed dimensions prevent layout shift

---

## Common Mistakes to Avoid

❌ **Wrong:** Using different sizes in same gallery
```tsx
<img className="w-[350px] h-[240px]" /> {/* ❌ Inconsistent */}
```

❌ **Wrong:** Not including object-cover
```tsx
<img className="w-[400px] h-[300px]" /> {/* ❌ May distort image */}
```

❌ **Wrong:** Using 400x300 for HOD images
```tsx
<img src={hod_image} className="w-[400px] h-[300px]" /> {/* ❌ Bad aspect ratio */}
```

✅ **Correct:** Consistent, with object-cover, proper aspect ratio
```tsx
<img 
  src={imageUrl}
  className="w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
/>
```

---

## Files Using 400x300px

✅ CST.tsx
- Extra-curricular Gallery (Line 965)
- Physical Facilities Gallery (Line 1034)
- Training Activities Gallery (Line 1755)
- Hackathons-Gallery (Line 2102) - Recently updated

✅ AIML.tsx
- Technical Association Gallery (Line 1774) - Recently updated

✅ ds.tsx (CSEDS)
- Technical Association Gallery (Line 1774) - Recently updated

---

## How to Verify Changes

1. **Dev Server:** `npm run dev`
2. **Navigate to:** Department → Gallery Section
3. **Check:** Images appear as 400x300px boxes
4. **Test:**
   - Image loads correctly
   - Placeholder shows on error
   - Responsive on mobile (scales down proportionally)
   - No visual distortion with object-cover

---

## Need Help?

**To find image size issues:**
```bash
grep -r "w-\[350px\].*h-\[240px\]" src/pages/departments/
grep -r "w-\[450px\].*h-\[340px\]" src/pages/departments/
```

**To standardize a gallery:**
1. Find the `<img>` tag
2. Replace className with: `w-[400px] h-[300px] rounded-lg shadow-lg object-cover`
3. Update error handler fallback
4. Test in browser

---

**Last Updated:** November 25, 2025
**Standard Status:** ✅ Active
**Exception:** HOD images (maintain original aspect ratio)
