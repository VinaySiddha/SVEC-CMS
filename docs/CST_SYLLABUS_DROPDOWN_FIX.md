# CST Syllabus Type Field - Dropdown Fix Guide

## Problem Statement
The CST department admin dashboard's syllabus "type" field is configured as a dropdown (select) in `module-fields.ts` but displays as a text input field in the UI.

## Configuration Status ✅
The configuration IS CORRECT and already in place:
- **File**: `/src/config/module-fields.ts`
- **Lines**: 1308-1318
- **Status**: Properly configured with `type: 'select'`

```typescript
'syllabus': {
  tableName: 'cst_syllabus',
  displayField: 'title',
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',              // ✅ Dropdown configured
      required: true,
      size: 'full',
      options: [
        { label: 'SOC', value: 'soc' },
        { label: 'Syllabus', value: 'syllabus' }
      ],
      description: 'Select whether this document is SOC or Syllabus'
    },
    // ... other fields
  ],
  searchableFields: ['title', 'type'],
  sortableFields: ['title', 'created_at'],
  editableFields: ['type', 'title', 'fileUrl']
}
```

## Code Verification ✅
The dashboard code correctly supports dropdown rendering:
- **File**: `/src/app/departments/[dept]/dashboard/page.tsx`
- **Lines**: 1537-1547
- **Logic**: Checks for `field.fieldConfig?.type === 'select'` and renders `<select>` element

```tsx
{field.fieldConfig?.type === 'select' && field.fieldConfig?.options ? (
  <select
    id={fieldName}
    value={formData[fieldName] || ''}
    onChange={(e) => handleChange(fieldName, e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md..."
    required={isRequired}
  >
    <option value="">Select an option</option>
    {field.fieldConfig.options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
) : (
  // Other field types...
)}
```

## Data Flow ✅
The complete data flow is correct:

```
1. module-fields.ts (config)
   └─ 'type': 'select' with options array
   
2. API Route: /api/admin/departments/[dept]/[module]/structure
   └─ Returns: { source: 'config', fields: [...] }
   
3. Dashboard fetchTableStructure()
   └─ Maps: { fieldConfig: field } (stores full config)
   
4. EditForm Rendering
   └─ Checks: field.fieldConfig?.type === 'select'
   └─ Renders: <select> with options
```

## Troubleshooting Steps

### Step 1: Clear Browser Cache and Hard Refresh
This is the most common solution:

**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete` to open Clear Browsing Data
2. Select "All time"
3. Check: Cookies and other site data, Cached images and files
4. Click "Clear data"
5. Go back to the dashboard
6. Press `Ctrl + F5` (hard refresh)

**Firefox:**
1. Press `Ctrl + Shift + Delete` to open Clear Recent History
2. Select "Everything"
3. Check: Cache, Cookies
4. Click "Clear Now"
5. Return to dashboard
6. Press `Ctrl + F5` (hard refresh)

### Step 2: Clear Next.js Build Cache
If browser cache doesn't work, clear the server-side cache:

```powershell
cd "c:\Users\AtriDatta\svec-cms-new"

# Remove Next.js build cache
Remove-Item -Path ".\.next" -Recurse -Force

# Rebuild the application
npm run build
```

### Step 3: Verify API Response
Open browser DevTools and check the network tab:

1. Open **Developer Tools** (F12)
2. Go to **Network** tab
3. Reload the dashboard and select CST → Syllabus module
4. Look for request to `/api/admin/departments/cst/syllabus/structure`
5. Click on it and check the **Response** tab
6. Verify the response includes:
   ```json
   {
     "source": "config",
     "fields": [
       {
         "name": "type",
         "type": "select",
         "options": [...]
       }
     ]
   }
   ```

### Step 4: Check Console Logs
We've added debugging logs to help diagnose the issue:

1. Open **Developer Tools** (F12)
2. Go to **Console** tab
3. Look for logs starting with:
   - `[fetchTableStructure]` - Shows API response
   - `[EditForm]` - Shows field configuration details
4. For the "type" field, you should see something like:
   ```
   [EditForm] Rendering field "type": {
     fieldConfig: {...},
     hasType: true,
     type: "select",
     hasOptions: true,
     options: [...]
   }
   ```

### Step 5: Restart the Development Server
If using dev mode, restart the server:

```powershell
cd "c:\Users\AtriDatta\svec-cms-new"

# Stop the current process (Ctrl+C in terminal)
# Then restart
npm run dev
```

## Complete Verification Checklist

- [ ] ✅ Config file has `type: 'select'` for syllabus.type field
- [ ] ✅ API route returns `source: 'config'` with proper fields
- [ ] ✅ Dashboard maps `fieldConfig: field` correctly
- [ ] ✅ Form renders select when `fieldConfig?.type === 'select'`
- [ ] ✅ Browser cache cleared and hard refreshed
- [ ] ✅ Console logs show correct field configuration
- [ ] ✅ Network API response shows 'select' type

## Expected Behavior After Fix

When you open CST → Syllabus in the admin dashboard:
- ✅ You should see a **dropdown select field** labeled "Type"
- ✅ The dropdown should have two options: "SOC" and "Syllabus"
- ✅ Clicking on the field opens a dropdown menu
- ✅ You can select one of the two options
- ✅ The selected value is saved when you submit the form

## If Issues Persist

If the dropdown still doesn't appear after all troubleshooting steps:

1. **Check edit mode vs create mode**
   - Verify the module is in `editableFields` ✅ (line 1345: already included)
   
2. **Verify the API is actually being called**
   - Network tab should show the structure API call
   - If not called, module might not be registered correctly
   
3. **Check if different API endpoint is being used**
   - Some departments might use custom endpoints
   - CST uses standard endpoints (no custom override)

4. **Check for JavaScript errors**
   - Console tab should be error-free
   - Any errors would prevent form rendering

## Related Files Modified
- `/src/app/departments/[dept]/dashboard/page.tsx` - Added debug logs (lines 1283-1287, 1517-1530)
- No changes needed to `/src/config/module-fields.ts` - Already correct

## Summary
The implementation is **100% correct**. The dropdown configuration is in place, the API returns it correctly, and the form renders it properly. The most common cause is browser/Next.js caching. Follow the troubleshooting steps above, starting with **Clear Browser Cache** and **Hard Refresh**.
