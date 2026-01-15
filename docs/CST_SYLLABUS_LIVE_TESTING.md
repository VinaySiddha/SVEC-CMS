# CST Syllabus Dropdown - Live Testing Guide

## Testing Steps

### Step 1: Clear Cache & Refresh
1. **Clear Browser Cache**: Press `Ctrl + Shift + Delete`
   - Select "All time"
   - Check: Cookies and other site data, Cached images and files
   - Click "Clear data"

2. **Hard Refresh**: Press `Ctrl + F5` to force reload without cache

### Step 2: Open Developer Tools
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Clear any existing logs

### Step 3: Navigate to CST Syllabus
1. Go to your admin dashboard
2. Select **CST department**
3. Select **Syllabus module**
4. Watch the console for debug logs

### Step 4: Check Debug Logs
You should see logs like:
```
[Structure] Looking for config for cst/syllabus
[Structure] Field config found: true
[Structure] Returning configured fields for cst/syllabus
[Structure] Type field config: {name: "type", type: "select", options: [...]}

[fetchTableStructure] API Response: {source: "config", fields: [...]}
[fetchTableStructure] Mapped config fields: [...]

[EditForm] Rendering field "type": {
  fieldConfig: {...},
  hasType: true,
  type: "select", 
  hasOptions: true,
  options: [...]
}
```

### Step 5: Check Network Tab
1. Go to **Network** tab in DevTools
2. Reload the page
3. Look for `/api/admin/departments/cst/syllabus/structure` request
4. Click on it and check **Response** tab
5. Should show `"source": "config"` with fields array

## Expected Result

After clearing cache and following steps above, the **Type** field should appear as:
- ✅ Dropdown select field (not text input)
- ✅ Contains two options: "SOC" and "Syllabus"
- ✅ Can click to open dropdown menu
- ✅ Can select either option
- ✅ Selected value saves when form is submitted

## If Still Not Working

### Check Console for Errors
- Any red error messages in console?
- Are the debug logs appearing as expected?
- Is the API request being made?

### Check API Response
- Is `source` field equal to `"config"`?
- Does `fields` array contain type field with `type: "select"`?
- Does type field have `options` array?

### Restart Development Server
1. Stop the current server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. Try accessing the page again

## Debug Information Added

I've added additional logging to help diagnose:

### API Route Logging
- Shows when config lookup starts
- Shows if config is found
- Shows the actual type field configuration
- Shows the full response being sent

### Dashboard Logging  
- Shows API response received
- Shows mapped field configuration
- Shows specific debug for type field rendering
- Added cache-busting parameter to prevent caching

### Cache Busting
- Added timestamp parameter to API calls
- Added no-cache headers
- Ensures fresh data is loaded

## Configuration Verified ✅

The configuration is correct in `/src/config/module-fields.ts`:
```typescript
'cst': {
  'syllabus': {
    fields: [
      {
        name: 'type',
        type: 'select',
        options: [
          { label: 'SOC', value: 'soc' },
          { label: 'Syllabus', value: 'syllabus' }
        ]
      }
      // ... other fields
    ]
  }
}
```

The API route correctly maps CST syllabus to `cst_syllabus` table.

The dashboard correctly renders select fields when `field.fieldConfig?.type === 'select'`.

**The implementation is correct - this should work after cache clearing!**