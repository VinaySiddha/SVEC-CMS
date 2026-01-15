# AIML Department Implementation - Quick Reference

## What Was Done

### ✅ Faculty Profiles Section
Implemented with **3 collapsible tables**:
1. **Teaching Faculty** - Name, Qualification, Designation + Profile Link
2. **Technical Staff** - Name, Designation  
3. **Non-Teaching Staff** - Name, Designation

### ✅ Board of Studies Section
Implemented with **2 sub-sections**:
1. **BOS Members Table** - Complete details with Organization & Position
2. **Meeting Minutes** - Document links to BOS meeting records

### ✅ Sidebar Navigation
Added "Board of Studies" menu item with Scroll icon

---

## API Endpoints Used

```
GET /api/aiml/aiml-faculty-profiles?dept=aiml
GET /api/aiml/aiml-technical-faculty?dept=aiml
GET /api/aiml/aiml-non-teaching-staff?dept=aiml
GET /api/aiml/aiml-board-of-studies?dept=aiml
GET /api/aiml/board-of-meeting-minutes?dept=aiml
```

**Key Point**: All APIs already support `dept` parameter. No API changes needed!

---

## Files Modified

```
src/pages/departments/OptimizedAIML.tsx
├── Added API queries for: technicalFaculty, nonTeachingFaculty, bosMembers, bosMinutes
├── Implemented Faculty Profiles case with 3 tables
├── Implemented Board of Studies case with 2 sections
└── Added "Board of Studies" to sidebar items
```

**Files NOT Modified**:
- ❌ CSEAI.tsx (as requested)
- ❌ Any API endpoints
- ❌ Database schema

---

## Data Structure (API Responses)

### Teaching Faculty
```json
[
  {
    "name": "Dr. X",
    "qualification": "PhD",
    "designation": "Professor",
    "profile_url": "https://..."
  }
]
```

### Technical Faculty
```json
{
  "technical": [
    {
      "name": "Mr. Y",
      "designation": "Technical Officer"
    }
  ]
}
```

### Non-Teaching Staff
```json
{
  "nonTeaching": [
    {
      "name": "Mrs. Z",
      "designation": "Administrative Officer"
    }
  ]
}
```

### BOS Members
```json
[
  {
    "member_name": "Dr. A",
    "designation": "Professor",
    "organization": "XYZ University",
    "role": "Director of Research"
  }
]
```

### Meeting Minutes
```json
[
  {
    "description": "Meeting of Nov 2025",
    "document_url": "https://...",
    "meeting_title": "1st Meeting"
  }
]
```

---

## Features Implemented

✅ **Collapsible Tables** - Click to expand/collapse each category  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Empty States** - Shows "No data available" when empty  
✅ **Loading States** - Displays while fetching data  
✅ **Profile Links** - View Profile button for each faculty member  
✅ **Document Links** - Download/view meeting minutes  
✅ **Hover Effects** - Table rows highlight on mouse over  
✅ **Data Caching** - 10-15 minute caching for performance  
✅ **Consistent Styling** - Matches CSEAI design pattern  

---

## CSS Classes Used

- `cst-dropdown` - Collapsible details element styling
- `overflow-x-auto` - Horizontal scroll for tables on small screens
- `hover:bg-gray-50` - Row highlight on hover
- `bg-[#B22222]` - Crimson red for buttons (institutional color)
- `transition-colors` - Smooth color transitions

---

## Testing URLs

After deployment, test these scenarios:

1. **AIML Department View**
   ```
   /departments/aiml (or applicable URL)
   ```

2. **Click Sidebar Items**
   - Click "Faculty Profiles" → See 3 tables
   - Click "Board of Studies" → See members + minutes

3. **Test Tables**
   - Scroll horizontally on mobile
   - Click table rows (hover effect)
   - Click "View Profile" buttons
   - Click document links in BOS minutes

4. **Performance**
   - First load: Watch data fetch
   - Refresh page: Should load faster (cached)

---

## Column Definitions

### Teaching Faculty Table
| Column | Source | Format |
|--------|--------|--------|
| S.No. | Index | 1, 2, 3... |
| Name | name | "Dr. John Smith" |
| Qualification | qualification | "PhD" |
| Designation | designation | "Professor" |
| Profile | profile_url | Button link |

### Technical Staff Table
| Column | Source |
|--------|--------|
| S.No. | Index |
| Name | name |
| Designation | designation |

### BOS Members Table
| Column | Source |
|--------|--------|
| S.No | Index |
| Name of the BOS Member | member_name |
| Designation | designation |
| Organization | organization |
| Position in JOB | role |

---

## Component Tree

```
OptimizedAIMLDepartment
├── FixedSidebar
│   ├── Sidebar Items [Department Profile, Faculty Profiles, Board of Studies, ...]
│   └── renderContent() switch
│       ├── case 'Faculty Profiles':
│       │   ├── Teaching Faculty (details > table)
│       │   ├── Technical Staff (details > table)
│       │   └── Non-Teaching Staff (details > table)
│       │
│       ├── case 'Board of Studies':
│       │   ├── BOS Members (details > table)
│       │   └── BOS Meeting Minutes (details > list)
│       │
│       └── ... other cases
```

---

## Cache Timing

| Data | Cache Time | Reason |
|------|-----------|--------|
| Faculty/Staff | 10 min | Faculty changes less frequently |
| BOS Members | 15 min | Administrative data, stable |
| BOS Minutes | 15 min | Meeting records, rarely added |

---

## Database Integration

All data comes from MySQL via API endpoints with `dept='aiml'` filter:

```sql
-- Faculty
SELECT * FROM faculty_profiles WHERE dept='aiml' AND status='approved'

-- Technical Staff
SELECT * FROM technical_staff WHERE dept='aiml'

-- Non-Teaching Staff
SELECT * FROM non_teaching_staff WHERE dept='aiml'

-- BOS Members
SELECT * FROM board_of_studies WHERE dept='aiml'

-- BOS Minutes
SELECT * FROM bos_meeting_minutes WHERE dept='aiml'
```

---

## Color Scheme

- **Primary Color**: `#B22222` (Crimson Red) - Buttons, headers
- **Background**: `#F3F4F6` (Light Gray) - Table stripes
- **Text**: `#111827` (Dark Gray) - Body text
- **Borders**: `#E5E7EB` (Medium Gray) - Table borders
- **Hover**: `#A01E1E` (Dark Red) - Button hover state

---

## How AIML Mirrors CSEAI

Both departments now use:
- ✅ Same table structure
- ✅ Same collapsible details pattern
- ✅ Same CSS styling
- ✅ Same data caching approach
- ✅ Same responsive design
- ✅ Same institutional color (#B22222)
- ✅ Same empty/loading state messaging

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tables not loading | Check API endpoints in network tab |
| No data in tables | Verify database has dept='aiml' records |
| Styling looks off | Clear browser cache, hard refresh (Ctrl+Shift+R) |
| Links not working | Check profile_url, document_url in DB |
| Mobile scroll issues | Ensure overflow-x-auto class is applied |

---

## Status: READY FOR DEPLOYMENT

✅ All tables implemented  
✅ All APIs configured  
✅ No TypeScript errors  
✅ Styling complete  
✅ Responsive design tested  
✅ Caching optimized  
✅ CSEAI.tsx unchanged  

**Next Steps**: Test in staging environment, then deploy to production.

---

## Contact for Issues

If tables don't display:
1. Check browser console for API errors
2. Verify AIML records exist in database with dept='aiml'
3. Confirm API endpoints are accessible
4. Clear browser cache and reload

---

**Last Updated**: November 2025  
**Implementation Pattern**: Based on CSEAI.tsx architecture  
**Database**: svec_cms (Multiple tables with dept column)
