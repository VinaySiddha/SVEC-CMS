# Department Images - Size Audit & Standardization Plan

## Audit Results

### CST.tsx
**File:** `src/pages/departments/CST.tsx`

| Section | Size | Line | Status | Action Needed |
|---------|------|------|--------|---------------|
| Extra-curricular Gallery | 400x300 | 965 | ✓ Correct | None |
| Physical Facilities Gallery | 400x300 | 1034 | ✓ Correct | None |
| Training Activities Gallery | 400x300 | 1755 | ✓ Correct | None |
| **Hackathons-Gallery** | **350x240** | **2102, 2105** | ❌ Inconsistent | **UPDATE TO 400x300** |

**Total Images:** 8 style declarations
**Correct (400x300):** 6
**Incorrect (350x240):** 2

### CSEAI.tsx
**File:** `src/pages/departments/CSEAI.tsx`

| Section | Size | Line | Status |
|---------|------|------|--------|
| Various galleries | 450x340 | Multiple | Different standard |

### AIML.tsx
**File:** `src/pages/departments/AIML.tsx`

| Section | Size | Line | Status |
|---------|------|------|--------|
| Hackathons-Gallery | 350x240 | 1774 | ❌ Inconsistent |

### MBA.tsx
**File:** `src/pages/departments/MBA.tsx`

| Section | Size | Line | Status |
|---------|------|------|--------|
| Various galleries | 350x240 | Multiple | Inconsistent |

### ds.tsx (CSEDS)
**File:** `src/pages/departments/ds.tsx`

| Section | Size | Line | Status |
|---------|------|------|--------|
| Hackathons-Gallery | 350x240 | 1774 | ❌ Inconsistent |

---

## Standardization Action Items

### Priority 1: CST Department
**File:** `src/pages/departments/CST.tsx`

**Action:** Update Hackathons-Gallery from 350x240 to 400x300
```typescript
// BEFORE (Line 2102, 2105)
className="w-[350px] h-[240px] rounded-lg shadow-lg object-cover"

// AFTER
className="w-[400px] h-[300px] rounded-lg shadow-lg object-cover"
```

**Locations to update:**
- Line 2102: Image display
- Line 2105: Error fallback

---

### Priority 2: AIML Department
**File:** `src/pages/departments/AIML.tsx`

**Action:** Verify and standardize Hackathons-Gallery
- Line 1774: Update to 400x300px

---

### Priority 3: CSEDS Department
**File:** `src/pages/departments/ds.tsx`

**Action:** Verify and standardize Hackathons-Gallery
- Line 1774: Update to 400x300px

---

### Priority 4: MBA Department
**File:** `src/pages/departments/MBA.tsx`

**Action:** Audit and standardize all gallery images to 400x300px

---

### Priority 5: CSEAI Department
**File:** `src/pages/departments/CSEAI.tsx`

**Action:** Consider standardizing to 400x300px instead of 450x340
- Multiple locations use 450x340
- Options: Keep as is, or align with 400x300px standard

---

## Standard Image Sizes Summary

### Final Standard (Recommended)
- **Gallery Images:** 400px width × 300px height (4:3 ratio)
- **HOD Images:** Auto width × Auto height (original aspect ratio)
- **CSS Property:** `object-cover` for all images

### Rationale
1. **400x300px:** Most common across departments
2. **4:3 Aspect Ratio:** Professional and balanced
3. **Landscape Orientation:** Ideal for gallery layouts
4. **Mobile Friendly:** Scales well on responsive layouts
5. **Consistency:** Uniform visual appearance across all department pages

---

## Implementation Progress

```
CST       ██████░░ 75% (Need to fix hackathons gallery)
CSEAI     ████░░░░ 50% (Using different size 450x340)
AIML      █░░░░░░░ 10% (Need to check all galleries)
MBA       ░░░░░░░░  0% (Need to audit)
CSEDS     █░░░░░░░ 10% (Need to check)
ECE       ░░░░░░░░  0% (Need to check)
CIVIL     ░░░░░░░░  0% (Need to check)
Mechanical░░░░░░░░  0% (Need to check)
```

---

## Code Examples

### Standardized Gallery Image Pattern
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

### Alternative with Inline Style
```tsx
<img
  src={imageUrl}
  alt="Description"
  className="rounded-lg shadow-lg object-cover"
  style={{ height: '300px', width: '400px' }}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  }}
/>
```

### HOD Image Pattern (Keep Original Aspect)
```tsx
<img
  src={overview.hod_image_url}
  alt={overview.hod_name}
  className="w-full h-auto object-cover rounded-lg shadow-md"
/>
```

---

## Testing Checklist

- [ ] Update CST hackathons-gallery to 400x300
- [ ] Update AIML hackathons-gallery to 400x300
- [ ] Update CSEDS hackathons-gallery to 400x300
- [ ] Review CSEAI galleries (decide on 450x340 vs 400x300)
- [ ] Review MBA galleries
- [ ] Test responsive behavior on mobile
- [ ] Test image loading with placeholder fallback
- [ ] Verify no layout shift when images load
- [ ] Cross-browser testing

---

## Notes

- **Consistency is Key:** All gallery images should use the same dimensions
- **HOD Exception:** Head of Department images should maintain aspect ratio
- **object-cover:** Ensures images fill the space without distortion
- **Placeholder:** Provide fallback for missing images
- **Performance:** Fixed dimensions improve page stability (CLS score)

---
**Last Updated:** November 25, 2025
**Next Action:** Update CST.tsx hackathons-gallery (Priority 1)
