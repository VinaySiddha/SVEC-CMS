# CSEAI MOUs Section - Debugging Guide

## 🔍 Issue: MOUs Data Not Showing in Department View

### **Root Cause Analysis**

The MOUs section was not displaying data due to:
1. Multiple redundant API calls to `/api/public/departments/cse-ai`
2. Improper data extraction from public API response
3. Unused gallery APIs causing state synchronization issues

### **Solution Implemented**

#### **1. Optimized API Calls**
**BEFORE:** 4 separate calls to the same public API
```typescript
fetch('/api/public/departments/cse-ai') → studentAchievements
fetch('/api/public/departments/cse-ai') → facultyDevelopment  
fetch('/api/public/departments/cse-ai') → facultyAchievements
fetch('/api/public/departments/cse-ai') → mous
```

**AFTER:** Single call with data extraction
```typescript
fetch('/api/public/departments/cse-ai')
  .then(response => {
    const publicData = response.data;
    return {
      studentAchievements: publicData.studentAchievements,
      facultyDevelopment: publicData.facultyDevelopment,
      facultyAchievements: publicData.facultyAchievements,
      mous: publicData.mous
    };
  })
```

#### **2. Added Gallery API Calls**
```typescript
fetch('/api/cai-extra-curricular-gallery')
fetch('/api/cai-technical-association-gallery')
```

#### **3. Enhanced MOUs Display**
Added debugging and fallback messages:
```typescript
{mous && mous.length > 0 ? (
  // Show MOUs table
) : (
  // Show "No MOUs available" with count info
  <div>Total MOUs in state: {mous ? mous.length : 0}</div>
)}
```

---

## 🧪 Testing & Debugging

### **Step 1: Check MOUs Data in Database**

**Test API Endpoint:**
```
GET http://localhost:9002/api/test-mous
```

**Expected Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "organization_name": "IIT Hyderabad",
      "from_date": "2023-01-15",
      "to_date": "2025-01-14",
      "status": "active"
    },
    // ... more MOUs
  ]
}
```

**If count is 0 or error occurs:** MOUs table might be empty or have database connectivity issues

### **Step 2: Check Public API Response**

**Test API Endpoint:**
```
GET http://localhost:9002/api/public/departments/cse-ai
```

**Look for MOUs data:**
```json
{
  "success": true,
  "department": "cse-ai",
  "data": {
    "mous": [
      {
        "id": 1,
        "organization_name": "IIT Hyderabad",
        "from_date": "2023-01-15",
        "to_date": "2025-01-14",
        "status": "active"
      }
    ]
  }
}
```

**If mous array is empty:** Data exists in table but API query might not be fetching it correctly

### **Step 3: Browser Console Debugging**

**Open Developer Console (F12) and check:**

1. **Network Tab:** Look for API responses
   - Check `/api/test-mous` response
   - Check `/api/public/departments/cse-ai` response
   - Verify `mous` data in response

2. **Console Tab:** Look for debug logs
   ```
   MOUs Data from API: [...] 
   MOUs State Set: 5 records
   MoUs Section - Current State: { mous: [...], length: 5 }
   ```

3. **Check for errors:**
   - 404 errors (API not found)
   - 500 errors (Server error)
   - Network errors

### **Step 4: Verify MOUs Section Display**

**On Page:** `http://localhost:3000/departments/cse-ai`

1. Click "MoUs" in sidebar
2. Look for "A. MOUs with Industries" section
3. Check if table shows:
   - ✅ MOUs data in rows (count > 0)
   - ❌ "No MOUs available" message (count = 0)
   - ❌ Error message or broken table

---

## 🐛 Common Issues & Solutions

### **Issue 1: MOUs Table Shows "No MOUs Available"**

**Diagnostic Steps:**
1. Check database: Run `/api/test-mous`
2. Check if data exists in `cai_mous` table
3. Verify column names match query:
   - `mou_with` → maps to `organization_name`
   - `from_date` → date field
   - `to_date` → date field

**Solutions:**
```bash
# Check if table exists and has data
SELECT COUNT(*) FROM cai_mous;

# Check column names
DESCRIBE cai_mous;

# Verify data format
SELECT id, mou_with, from_date, to_date, status FROM cai_mous LIMIT 5;
```

### **Issue 2: API Returns Success But No MOUs Data**

**Likely Cause:** Public API query filtering out cse-ai data

**Check Public API Query:**
```typescript
// In /src/app/api/public/departments/[dept]/route.ts
// Line ~130: MOUs query for cse-ai
dept.toLowerCase() === 'cse-ai'
  ? query('SELECT id, mou_with as organization_name, from_date, to_date, status FROM cai_mous WHERE 1=1 ORDER BY created_at DESC', [])
  : query('SELECT ...')
```

**Verify:**
- Query is correctly formatted
- Column alias is correct: `mou_with as organization_name`
- No WHERE clause filtering out data

### **Issue 3: Data Loads But Not Displayed**

**Diagnostic:**
1. Check browser console for the debug logs:
   ```
   MOUs Data from API: [...]
   MOUs State Set: X records
   MoUs Section - Current State: { ... }
   ```

2. If logs show data but page doesn't display:
   - Component might not be re-rendering
   - State update might be failing
   - DOM rendering might have error

**Solution:**
- Check React DevTools
- Verify `mous` state is properly set
- Check for TypeScript errors in console

---

## 📊 Expected Data Flow

```
Browser
  ↓
  └─→ [1] GET /api/cai-faculty
  ├─→ [2] GET /api/cai-technical-faculty
  ├─→ [3] GET /api/cai-staff
  ├─→ [4] GET /api/cai-physical-facilities
  ├─→ [5] GET /api/cai-handbooks
  ├─→ [6] GET /api/cai-workshops
  ├─→ [7] GET /api/cai-academictoppers
  ├─→ [8] GET /api/cai-department-overview
  ├─→ [9] GET /api/cai-bos-members
  ├─→ [10] GET /api/cai-bos-minutes
  ├─→ [11] GET /api/cai-hackathons
  ├─→ [12] GET /api/cai-hackathons-gallery
  ├─→ [13] GET /api/cai-extra-curricular
  ├─→ [14] GET /api/cai-placements
  ├─→ [15] GET /api/cai-extra-curricular-gallery
  ├─→ [16] GET /api/cai-technical-association-gallery
  └─→ [17] GET /api/public/departments/cse-ai ← MOUs data comes here
              ├─ studentAchievements
              ├─ facultyDevelopment
              ├─ facultyAchievements
              └─ mous ← THIS DATA
                    ↓
                  Database (cai_mous)
                    ↓
                  setMous(data)
                    ↓
                  Display in MOUs Section
```

---

## ✅ Verification Checklist

- [ ] `/api/test-mous` returns data with count > 0
- [ ] `/api/public/departments/cse-ai` includes `mous` array
- [ ] Browser console shows MOUs debug logs
- [ ] MOUs state shows correct count
- [ ] CSEAI.tsx MOUs case renders table correctly
- [ ] Table displays all MOUs with organization names
- [ ] No JavaScript errors in console
- [ ] Network tab shows all API requests succeeded (200 status)

---

## 🚀 Quick Test Commands

### **Test 1: Direct Database Query**
```bash
curl http://localhost:9002/api/test-mous
```

### **Test 2: Public API**
```bash
curl http://localhost:9002/api/public/departments/cse-ai | jq '.data.mous'
```

### **Test 3: Page Load**
```
1. Open http://localhost:3000/departments/cse-ai
2. Open Browser Console (F12)
3. Look for "MOUs Data from API:" log
4. Click MoUs sidebar item
5. Look for "MoUs Section - Current State:" log
```

---

## 📝 File Modifications

### **Modified Files:**
1. `/src/pages/departments/CSEAI.tsx`
   - Optimized Promise.all() to single public API call
   - Added debug console.log statements
   - Enhanced MOUs display with fallback count
   - Added error handling for state updates

2. `/src/pages/api/test-mous.ts` (NEW)
   - Direct MOUs data test endpoint
   - Bypasses public API for direct table check
   - Helps diagnose database connectivity

### **No Database Changes Required**
- Uses existing `cai_mous` table
- Uses existing column mappings
- All data should already be in database

---

## 🎯 Next Steps

1. **Test MOUs API:** `http://localhost:9002/api/test-mous`
2. **Check Response:** Should return MOUs data count and records
3. **If 0 records:** Need to add MOUs data to database
4. **If records found:** Check browser console for state update logs
5. **If still not showing:** Check React DevTools for component state

**Issue Status:** ✅ Code changes complete - awaiting data verification