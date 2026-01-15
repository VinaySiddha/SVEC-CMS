# Mechanical Faculty Profiles - Debug Guide

## Issues Fixed

### 1. **Missing Error Handling**
- **Problem**: First fetch call for `/api/mech/faculty` had no `.catch()` handler
- **Impact**: If API call failed, faculty data would never be loaded
- **Fix**: Added `.catch()` with error logging and empty array fallback

### 2. **Faculty Type Filtering**
- **Problem**: Code was looking for `'non-teaching'` but API might use `'non_teaching'` (with underscore)
- **Fix**: Updated filter to check for BOTH: `'non_teaching'` OR `'non-teaching'`
```tsx
const nonTeaching = data.filter((member: Faculty) => 
  member.faculty_type === 'non_teaching' || member.faculty_type === 'non-teaching'
);
```

### 3. **Array Type Check Missing**
- **Problem**: Code wasn't checking if API response is actually an array before filtering
- **Fix**: Added `Array.isArray(data)` check before processing

### 4. **Missing Console Logging**
- **Problem**: No way to debug if data was being fetched or filtered
- **Fix**: Added comprehensive logging:
  - Raw API response
  - Filtered teaching faculty list
  - Filtered non-teaching faculty list
  - Error messages with stack traces

## Debug Steps

### To Check If Data Is Being Fetched:
1. Open Browser DevTools (F12)
2. Go to Console tab
3. Look for "Faculty API Response:" log
4. Check the data structure

### To Check Filter Results:
1. In Console, look for:
   - "Teaching Faculty:" - should show teaching staff
   - "Non-Teaching Faculty:" - should show non-teaching staff

### To Check API Errors:
1. In Console, look for "Error fetching faculty:" message
2. Check Network tab in DevTools
3. Verify API endpoint exists: `/api/mech/faculty`

## Expected Data Structure

The API should return an array like:
```json
[
  {
    "name": "Dr. John Doe",
    "qualification": "Ph.D",
    "designation": "Professor",
    "faculty_type": "teaching",
    "profile_url": "https://..."
  },
  {
    "name": "Mr. Support Staff",
    "designation": "Lab Technician",
    "faculty_type": "non_teaching"
  }
]
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| No teaching faculty shown | Check if `faculty_type === 'teaching'` in API |
| No non-teaching shown | Verify API uses `'non_teaching'` (underscore) not `'non-teaching'` (dash) |
| Empty tables with no message | Ensure `faculty` array is initialized, not null |
| "Loading..." message stays | Check if fetch is completing without errors |

## Files Modified
- `src/pages/departments/Mechanical.tsx` - Lines 199-240
  - Enhanced error handling
  - Added console logging
  - Fixed faculty type filtering
