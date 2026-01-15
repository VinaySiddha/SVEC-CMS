# AIML Department - Table Implementation Guide

## Overview
This guide explains how to fetch and display tables in the AIML department view using the same table structure as CSEAI.tsx, but referencing AIML-specific API endpoints and data.

## Key Tables to Implement

### 1. Faculty Profiles Section
**File**: `src/pages/departments/OptimizedAIML.tsx`  
**API Endpoints**:
- Teaching Faculty: `/api/aiml-faculty.ts` or `/api/aiml/aiml-faculty-profiles.ts?dept=aiml`
- Technical Staff: `/api/aiml-technical-faculty.ts` or `/api/aiml/aiml-technical-faculty.ts`
- Non-Teaching Staff: `/api/aiml/aiml-non-teaching-staff.ts` or `/api/aiml-staff.ts`

**Table Columns**:
```
Teaching Faculty:
- S.No. (index + 1)
- Name
- Qualification
- Designation
- Profile (View Profile button)

Technical Staff:
- S.No.
- Name
- Designation

Non-Teaching Staff:
- S.No.
- Name
- Designation
```

---

### 2. Board of Studies Section
**API Endpoints**:
- BOS Members: `/api/aiml-bos-members.ts` or `/api/aiml/aiml-board-of-studies.ts`
- BOS Minutes: `/api/aiml-bos-minutes.ts` or `/api/aiml/board-of-meeting-minutes.ts`

**Table Columns**:
```
BOS Members:
- S.No.
- Name of the BOS Member
- Designation
- Organization
- Position in JOB

BOS Meeting Minutes:
- Meeting Number
- Meeting Date
- View (File link)
```

---

### 3. Student Achievements Section
**API Endpoint**: `/api/aiml/student-achievements.ts`

**Table Structure**:
```
Grouped by Category (dropdown for each):
- S.No.
- Title
- View (Link to file if available)
```

---

### 4. e-Resources Section
**API Endpoint**: `/api/aiml-eresources.ts`

**Table Columns** (grouped by Regulation):
```
- S.No
- Regulation
- Semester
- Subject
- PPT (Download link)
```

---

## Implementation Steps

### Step 1: Update API Endpoints
All AIML API endpoints should query from `faculty_profiles` table with `dept = 'aiml'`:

**Pattern for Faculty Endpoints**:
```sql
-- Instead of querying aiml_faculty table (which may be empty):
SELECT FROM aiml_faculty

-- Query the correct table:
SELECT id, name, qualification, designation, profile_url AS profileUrl 
FROM faculty_profiles 
WHERE dept = 'aiml' AND status = 'approved'
ORDER BY id ASC
```

### Step 2: Update OptimizedAIML.tsx - Faculty Profiles Section
Add three tables (Teaching Faculty, Technical Staff, Non-Teaching Staff) like CSEAI has.

**Reference Structure from CSEAI**:
```tsx
<details open className="cst-dropdown">
  <summary>Teaching Faculty</summary>
  <div className="cst-dropdown-content">
    {faculty && faculty.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 border-b border-gray-200">S.No.</th>
              <th scope="col" className="px-6 py-3 border-b border-gray-200">Name</th>
              <th scope="col" className="px-6 py-3 border-b border-gray-200">Qualification</th>
              <th scope="col" className="px-6 py-3 border-b border-gray-200">Designation</th>
              <th scope="col" className="px-6 py-3 border-b border-gray-200">Profile</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((member, index) => (
              <tr key={member.id || index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{member.name || 'N/A'}</td>
                <td className="px-6 py-4">{member.qualification || 'N/A'}</td>
                <td className="px-6 py-4">{member.designation || 'N/A'}</td>
                <td className="px-6 py-4">
                  <a 
                    href={member.profileUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[#B22222] text-white rounded hover:bg-[#A01E1E] transition-colors duration-200 text-sm font-medium inline-block"
                  >
                    View Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-center py-8">
        <div className="text-gray-500">
          {faculty ? 'No teaching faculty data available.' : 'Loading teaching faculty...'}
        </div>
      </div>
    )}
  </div>
</details>
```

### Step 3: Update API Fetch Calls
In OptimizedAIML.tsx, update the `useMemoizedQueries` hook to fetch from correct endpoints:

```typescript
const {
  faculty,
  technicalFaculty,
  nonTeachingFaculty,
  bosMembers,
  bosMinutes,
  studentAchievements,
  workshops,
  placements,
  handbooks,
  isLoading
} = useMemoizedQueries({
  faculty: {
    key: 'aiml-faculty',
    fetcher: () => fetch('/api/aiml-faculty?dept=aiml').then(res => res.json()),
    options: { cacheTime: 10 * 60 * 1000 }
  },
  technicalFaculty: {
    key: 'aiml-technical-faculty',
    fetcher: () => fetch('/api/aiml-technical-faculty?dept=aiml').then(res => res.json()),
    options: { cacheTime: 10 * 60 * 1000 }
  },
  nonTeachingFaculty: {
    key: 'aiml-non-teaching-faculty',
    fetcher: () => fetch('/api/aiml-staff?dept=aiml').then(res => res.json()),
    options: { cacheTime: 10 * 60 * 1000 }
  },
  bosMembers: {
    key: 'aiml-bos-members',
    fetcher: () => fetch('/api/aiml-bos-members?dept=aiml').then(res => res.json()),
    options: { cacheTime: 15 * 60 * 1000 }
  },
  bosMinutes: {
    key: 'aiml-bos-minutes',
    fetcher: () => fetch('/api/aiml-bos-minutes?dept=aiml').then(res => res.json()),
    options: { cacheTime: 15 * 60 * 1000 }
  },
  studentAchievements: {
    key: 'aiml-student-achievements',
    fetcher: () => fetch('/api/aiml/student-achievements?dept=aiml').then(res => res.json()),
    options: { cacheTime: 5 * 60 * 1000 }
  }
  // ... other queries
});
```

---

## Database Tables Reference

### faculty_profiles (Main table for all departments)
```sql
CREATE TABLE `faculty_profiles` (
  `id` bigint UNSIGNED,
  `dept` varchar(32),              -- 'aiml', 'cseai', 'cst', etc.
  `name` varchar(100),
  `qualification` varchar(255),
  `designation` varchar(100),
  `profile_url` varchar(255),
  `status` enum('pending','approved','rejected'),
  ...
)
-- Query: SELECT * FROM faculty_profiles WHERE dept = 'aiml' AND status = 'approved'
```

### aiml_bos_members (Board of Studies)
```sql
CREATE TABLE `aiml_bos_members` (
  `id` int,
  `name` varchar(255),
  `designation` varchar(255),
  `organization` varchar(255),
  `position_in_job` varchar(255),
  ...
)
```

### aiml_bos_minutes (BOS Meeting Minutes)
```sql
CREATE TABLE `aiml_bos_minutes` (
  `id` int,
  `meeting_no` varchar(255),
  `meeting_date` datetime,
  `file_url` text,
  ...
)
```

---

## Section-by-Section Implementation Checklist

- [ ] Faculty Profiles
  - [ ] Teaching Faculty table
  - [ ] Technical Staff table
  - [ ] Non-Teaching Staff table
  
- [ ] Board of Studies
  - [ ] BOS Members table
  - [ ] BOS Meeting Minutes table
  
- [ ] Student Achievements
  - [ ] Student Achievements table (grouped by category)
  
- [ ] e-Resources
  - [ ] e-Resources table (grouped by regulation)
  
- [ ] Placements
  - [ ] Placements table
  
- [ ] Workshops
  - [ ] Workshops table

---

## API Endpoints Summary

| Section | API Endpoint | Table | Columns |
|---------|--------------|-------|---------|
| Teaching Faculty | `/api/aiml-faculty` | faculty_profiles | id, name, qualification, designation, profile_url |
| Technical Staff | `/api/aiml-technical-faculty` | aiml_technical_faculty | id, name, designation |
| Non-Teaching Staff | `/api/aiml-staff` | aiml_non_teaching_staff | id, name, designation |
| BOS Members | `/api/aiml-bos-members` | aiml_bos_members | id, name, designation, organization, position_in_job |
| BOS Minutes | `/api/aiml-bos-minutes` | aiml_bos_minutes | id, meeting_no, meeting_date, file_url |
| Student Achievements | `/api/aiml/student-achievements` | aiml_student_achievements | id, title, category, file_url |
| e-Resources | `/api/aiml-eresources` | aiml_eresources | id, regulation, semester, subject, file_url |
| Workshops | `/api/aiml-workshops` | aiml_workshops | id, title, category, year, file_url |
| Placements | `/api/aiml-placements` | aiml_placements | id, company, status, salary, file_url |

---

## Notes

1. **No changes to CSEAI.tsx**: As per requirement, we don't modify CSEAI.tsx
2. **Reference structure only**: Use CSEAI.tsx table layouts as reference but apply them to AIML
3. **Data source**: All data comes from AIML-specific tables (aiml_* prefix)
4. **Department filter**: Use `dept = 'aiml'` in all queries to faculty_profiles table
5. **Caching**: Implement appropriate caching for performance

---

## Status: Ready for Implementation

This guide provides all the information needed to add proper table displays to the AIML department view.
