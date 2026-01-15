# CST Workshop Fix - Quick Reference

## Problem
Workshop data not showing in CST department page workshop section

## Root Causes
1. ❌ **API querying wrong table:** `ds_workshops` (Data Science) instead of `cst_workshops`
2. ❌ **Component filtering incorrectly:** Removing valid data with `.filter((w) => w.dept === 'cst')`

## Fixes Applied
✅ **File 1:** `src/pages/api/cst/cst-workshops.ts`
```typescript
// Changed
"SELECT * FROM ds_workshops ORDER BY id DESC"

// To
"SELECT * FROM cst_workshops ORDER BY id DESC"
```

✅ **File 2:** `src/pages/departments/CST.tsx` (Lines 2354-2390)
```typescript
// Changed
const cstWorkshops = workshops.filter((w: any) => w.dept === 'cst');
{cstWorkshops.length > 0 ? (

// To
// Workshops data is already from CST table, no filter needed
{workshops.length > 0 ? (
```

## How to Test
1. `npm run dev` - Restart dev server
2. Go to CST Department
3. Click "Workshops" tab
4. Workshops should now display ✅

## What Changed
- API now returns `cst_workshops` data (correct department)
- Component uses all returned data (no unnecessary filtering)
- Result: Workshop titles and links now display properly

## Status
✅ **FIXED** - Ready to test

---
**Date:** November 25, 2025
**Impact:** High - Critical data display issue resolved
