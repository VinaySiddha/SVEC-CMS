# Dev Server Restart Required

## Issue
You're getting a 404 error when trying to access the admin dashboard's industry-programs module structure:
```
API Error (404) while requesting /api/admin/departments/cst/industry-programs/structure
```

The API is returning an HTML 404 page instead of JSON, which means **the route is not being recognized by Next.js**.

## Root Cause
The changes made to the API route files require the Next.js dev server to rebuild and recognize the new/modified route handlers:

1. **Modified file**: `src/app/api/admin/departments/[dept]/[module]/structure/route.ts`
   - Fixed authentication verification function (`verifyAuth`)
   - Changed from awaiting `verifyToken()` (which is synchronous)
   - Added enhanced logging for debugging

2. **Modified file**: `src/pages/departments/CST.tsx`
   - Added dropdown interaction for industry programs
   - Added `expandedIndustryProgram` state for managing which program is expanded

3. **API endpoint**: `src/pages/api/cst/cst-industry-programs.ts`
   - Already fetching data correctly from `cst_industry_programs` table

## Solution

### Step 1: Stop the Dev Server
Press `Ctrl+C` in your terminal running the Next.js dev server.

### Step 2: Clear Next.js Cache
Run:
```bash
rm -rf .next
```

### Step 3: Restart the Dev Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Step 4: Wait for Compilation
Wait for Next.js to complete its build and show:
```
▲ Next.js 15.x.x
- Ready in XXms
```

### Step 5: Test the Fix
1. Log in to the admin dashboard
2. Navigate to CST department
3. Select the "Industry Programs" module
4. You should now see:
   - ✅ No 401 Unauthorized error
   - ✅ No 404 error
   - ✅ The module structure loads correctly
   - ✅ Data from `cst_industry_programs` table displays
   - ✅ Dropdown interaction works (click to expand/collapse each program)

## What Was Fixed

### Authentication (401 Error - FIXED)
- **Problem**: The `verifyAuth()` function was trying to `await` the `verifyToken()` function, but it's synchronous
- **Solution**: Removed the `await` and `try/catch` to call `verifyToken()` directly
- **File**: `src/app/api/admin/departments/[dept]/[module]/structure/route.ts`

### Interactive Dropdown (NEW FEATURE)
- **Added**: State management for expanding/collapsing industry program dropdowns
- **Added**: Chevron icon rotation animation when expanded
- **Added**: Download icon for better UX
- **Added**: Empty state message when no programs exist
- **File**: `src/pages/departments/CST.tsx`

## Expected Behavior After Restart

When you access the admin dashboard for CST > Industry Programs:
1. Page loads without errors
2. Table structure is fetched from the API
3. Data is loaded from the `cst_industry_programs` table
4. Each program appears as a collapsible item
5. Click the program title to expand and see the "View Document" link
6. Click again to collapse

## Troubleshooting

If you still see the 404 after restarting:

1. **Clear browser cache**: Press `Ctrl+Shift+Delete` or use incognito mode
2. **Check dev server logs**: Look for any error messages during compilation
3. **Verify file exists**: Ensure `src/app/api/admin/departments/[dept]/[module]/structure/route.ts` exists
4. **Check permissions**: Make sure auth token is valid and user is authenticated as CST admin

## Related Files Changed

- ✅ `src/app/api/admin/departments/[dept]/[module]/structure/route.ts` - Fixed auth verification
- ✅ `src/pages/departments/CST.tsx` - Added industry programs dropdown UI
- ✅ `src/pages/api/cst/cst-industry-programs.ts` - Already correct (no changes needed)

## Next Steps After Server Restart

Once the server is running and the industry-programs module works:
1. Test all three faculty dropdowns (Teaching, Technical, Non-Teaching)
2. Verify MOUs display with `mou_with` and `status` fields
3. Check that placements display correctly with `dept` field
4. Test the admin dashboard's CRUD operations for industry programs
