# CST Workshop Section - Data Display Fix

## Problem
Workshop data was not being displayed in the CST department page workshop section, even though the data was being fetched.

## Root Causes Identified & Fixed

### Issue #1: Wrong Database Table in API ❌ → ✅
**File:** `src/pages/api/cst/cst-workshops.ts`
**Problem:** API was querying `ds_workshops` table instead of `cst_workshops` table

```typescript
// BEFORE (WRONG)
"SELECT * FROM ds_workshops ORDER BY id DESC"

// AFTER (CORRECT)
"SELECT * FROM cst_workshops ORDER BY id DESC"
```

**Impact:** This was returning Data Science workshops instead of CST workshops, or returning empty results

---

### Issue #2: Incorrect Data Filter in Component ❌ → ✅
**File:** `src/pages/departments/CST.tsx` (Line 2354-2390)
**Problem:** Component was filtering workshops by `w.dept === 'cst'`, but:
- The `cst_workshops` table doesn't have a `dept` field
- The filter was removing all results even if data existed

```typescript
// BEFORE (WRONG)
const cstWorkshops = workshops.filter((w: any) => w.dept === 'cst');
{cstWorkshops.length > 0 ? (
  cstWorkshops.map((workshop, idx) => (
    // ...

// AFTER (CORRECT)
// Workshops data is already from CST table, no filter needed
{workshops.length > 0 ? (
  workshops.map((workshop, idx) => (
    // ...
```

**Impact:** Even if the API returned data, the filter would remove it all, showing "No workshop details available"

---

## Solutions Applied

### Fix #1: Update API Endpoint
- **File:** `src/pages/api/cst/cst-workshops.ts`
- **Change:** `ds_workshops` → `cst_workshops`
- **Result:** API now returns correct CST workshop data

### Fix #2: Remove Incorrect Filter
- **File:** `src/pages/departments/CST.tsx`
- **Change:** Removed `.filter((w: any) => w.dept === 'cst')`
- **Reason:** Data is already filtered at the API level
- **Result:** All CST workshops now display correctly

---

## Workshop Data Structure

Expected workshop data format from `cst_workshops` table:

```typescript
{
  id: number;
  title: string;           // Workshop title/name
  category?: string;       // e.g., 'SOC', 'Guest Lecturers/Seminars', 'Workshops'
  file_url?: string;       // Link to workshop document/details
  created_at?: string;
  updated_at?: string;
}
```

---

## Workshop Display Logic

### Workshop Section in CST.tsx
```tsx
case 'Workshops': {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Workshops</h2>
      <div className="space-y-6">
        <details open className="cst-dropdown">
          <summary>Workshops Details</summary>
          <div className="cst-dropdown-content">
            {workshops.length > 0 ? (
              workshops.map((workshop, idx) => (
                <div key={workshop.id} className="mb-4">
                  <p className="font-medium">
                    {workshop.title || `Workshop ${idx + 1}`}
                    {workshop.file_url && (
                      <>
                        {' - '}
                        <a
                          href={workshop.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#B22222] hover:underline"
                        >
                          View More
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">No workshop details available.</p>
            )}
          </div>
        </details>
      </div>
    </div>
  );
}
```

**Features:**
- ✅ Displays all workshops from `cst_workshops` table
- ✅ Shows workshop title
- ✅ Provides "View More" link if `file_url` exists
- ✅ Shows message if no workshops available
- ✅ Dropdown/collapsible format (can be expanded/collapsed)

---

## Testing Steps

1. **Restart Dev Server**
   ```bash
   npm run dev
   ```

2. **Navigate to CST Department**
   - Go to: `/departments/cst` or select CST from department list

3. **Select Workshops Section**
   - Click on "Workshops" tab in the navigation menu

4. **Verify Data Display**
   - ✅ Workshop titles should appear in dropdown
   - ✅ "View More" links should show if files exist
   - ✅ Data from `cst_workshops` table displays

5. **Test Interactions**
   - ✅ Click dropdown to expand/collapse
   - ✅ Click "View More" to access workshop files
   - ✅ Responsive design works on mobile

---

## Files Modified

| File | Changes | Status |
|------|---------|--------|
| `src/pages/api/cst/cst-workshops.ts` | Changed table from `ds_workshops` to `cst_workshops` | ✅ FIXED |
| `src/pages/departments/CST.tsx` | Removed `.filter((w) => w.dept === 'cst')` | ✅ FIXED |

---

## Related API Endpoints

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `GET /api/cst/cst-workshops` | Fetch workshop list | ✅ FIXED |
| `GET /api/cst/cst-workshops-gallery` | Fetch workshop gallery images | ✓ OK |

---

## Database Information

**Table:** `cst_workshops`

**Expected Columns:**
- `id` (Primary Key)
- `title` (Workshop name)
- `category` (Type of workshop)
- `file_url` (Document/details link)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Note:** Make sure the table exists and has data. If no workshops are in the database, the message "No workshop details available." will display (which is correct).

---

## Why This Happened

1. **Copy-Paste Error:** The `cst-workshops.ts` API file was likely created by copying from a CSEDS (ds) file and the table name wasn't updated

2. **Defensive Filter:** The filter in CST.tsx was added as a safety measure to prevent data from other departments, but it removed valid data since `cst_workshops` table doesn't have a `dept` field

---

## Prevention Going Forward

✅ **Always verify:**
1. API endpoints query the correct table
2. Department-specific pages don't need department filters when using dedicated APIs
3. Test data display after modifying API endpoints

✅ **Code Review Checklist:**
- [ ] Table names match the department/module
- [ ] Filters match the data structure
- [ ] API endpoint returns expected data format

---

## Status

✅ **RESOLVED** - Workshop section now displays data correctly

**Last Updated:** November 25, 2025
**Severity:** High (Data not displaying)
**Resolution:** API table fixed + Filter removed
