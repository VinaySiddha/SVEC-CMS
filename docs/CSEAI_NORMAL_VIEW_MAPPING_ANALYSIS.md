# CSE-AI Normal View Page - Sidebar Section Mapping

## Current Issue
The CSE-AI normal view page (`/src/pages/departments/CSEAI.tsx`) sidebar sections are not properly mapped to their corresponding database tables. The page is using direct API endpoints that may not align with the admin dashboard configuration.

## Current Sidebar Sections vs Table Mappings

### ✅ **Correctly Mapped Sections**

| Sidebar Section | API Endpoint | Admin Route Module | Database Table |
|----------------|--------------|-------------------|----------------|
| Faculty Profiles | `/api/cai-faculty` | `faculty` | `cai_faculty` |
| Workshops | `/api/cai-workshops` | `workshops` | `cai_workshops` |
| Academic Toppers | `/api/cai-academictoppers` | `academic-toppers` | `cai_academictoppers` |
| Hackathons | `/api/cai-hackathons` | `hackathons` | `cai_hackathons` |
| Placements | `/api/cai-placements` | `placements` | `cai_placements` |

### ❌ **Sections with Mapping Issues**

| Sidebar Section | Current API | Should Use Admin API | Admin Module | Database Table |
|----------------|-------------|---------------------|--------------|----------------|
| Board of Studies | `/api/cai-bos-members` | `/api/admin/departments/cse-ai/bos-members` | `bos-members` | `cai_bos_members` |
| Board of Studies | `/api/cai-bos-minutes` | `/api/admin/departments/cse-ai/bos-minutes` | `bos-minutes` | `cai_bos_minutes` |
| Physical Facilities | `/api/cai-physical-facilities` | `/api/admin/departments/cse-ai/physical-facilities` | `physical-facilities` | `cai_physical_facilities` |
| Faculty Development | Dynamic from `/api/public/departments/cse-ai` | `/api/admin/departments/cse-ai/faculty-development` | `faculty-development` | `cai_faculty_development` |
| Faculty Achievements | Dynamic from `/api/public/departments/cse-ai` | `/api/admin/departments/cse-ai/faculty-achievements` | `faculty-achievements` | `cai_faculty_achievements` |
| Student Achievements | Dynamic from `/api/public/departments/cse-ai` | `/api/admin/departments/cse-ai/student-achievements` | `student-achievements` | `cai_student_achievements` |
| Extra-Curricular | `/api/cai-extra-curricular` | `/api/admin/departments/cse-ai/extra-curricular` | `extra-curricular` | `cai_extra_curricular` |
| Hackathons Gallery | `/api/cai-hackathons-gallery` | `/api/admin/departments/cse-ai/hackathons-gallery` | `hackathons-gallery` | `cai_hackathons_gallery` |
| Handbooks | `/api/cai-handbooks` | `/api/admin/departments/cse-ai/handbooks` | `handbooks` | `cai_handbooks` |
| MoUs | Dynamic from `/api/public/departments/cse-ai` | `/api/admin/departments/cse-ai/mous` | `mous` | `cai_mous` |
| Syllabus | `/api/cai-syllabus` | `/api/admin/departments/cse-ai/syllabus` | `syllabus` | `cai_syllabus` |

### 📝 **Missing Sections in Admin Configuration**

These sections exist in the normal view but are NOT configured in the admin dashboard:

| Sidebar Section | Current API | Missing Admin Module | Suggested Table |
|----------------|-------------|---------------------|-----------------|
| Technical Faculty | `/api/cai-technical-faculty` | `technical-faculty` | `cai_technical_faculty` |
| Non-Teaching Faculty | `/api/cai-staff` | `non-teaching-faculty` | `cai_non_teaching_faculty` |
| Department Overview | `/api/cai-department-overview` | `department-overview` | `cai_department_overview` |
| Merit Scholarships | Dynamic from public API | `merit-scholarships` | `cai_merit_scholarships` |
| Technical Association Gallery | `/api/cai-technical-association-gallery` | `technical-association` | `cai_technical_association` |
| Extra-Curricular Gallery | `/api/cai-extra-curricular-gallery` | `extra-curricular-gallery` | `cai_extra_curricular_gallery` |

---

## Admin Dashboard Current Configuration

From `/src/config/module-fields.ts` and `/src/app/api/admin/departments/[dept]/[module]/route.ts`:

### ✅ **Configured Modules:**
1. `workshops` → `cai_workshops`
2. `faculty` → `cai_faculty`
3. `technical-faculty` → `cai_technical_faculty`
4. `non-teaching-faculty` → `cai_non_teaching_faculty`
5. `academic-toppers` → `cai_academictoppers`
6. `faculty-achievements` → `cai_faculty_achievements`
7. `faculty-development` → `cai_faculty_development`
8. `placements` → `cai_placements`
9. `hackathons-gallery` → `cai_hackathons_gallery`
10. `bos-members` → `cai_bos_members`
11. `eresources` → `cai_eresources`
12. `extra-curricular` → `cai_extra_curricular`
13. `handbooks` → `cai_handbooks`
14. `merit-scholarships` → `cai_merit_scholarships`
15. `mous` → `cai_mous`
16. `newsletters` → `cai_newsletters`
17. `physical-facilities` → `cai_physical_facilities`
18. `student-achievements` → `cai_student_achievements`
19. `syllabus` → `cai_syllabus`
20. `hackathons` → `cai_hackathons`
21. `department-overview` → `cai_department_overview`

### ❌ **Missing from Admin Configuration:**
- `bos-minutes` (exists in view page but not in admin)
- Technical association galleries
- Extra-curricular galleries

---

## Recommended Action Plan

### 1. **Update Normal View Page APIs**
Replace direct API calls with standardized admin department APIs:

```typescript
// BEFORE (inconsistent)
fetch('/api/cai-faculty')
fetch('/api/cai-bos-members') 
fetch('/api/public/departments/cse-ai') // for multiple data

// AFTER (consistent)
fetch('/api/admin/departments/cse-ai/faculty')
fetch('/api/admin/departments/cse-ai/bos-members')
fetch('/api/admin/departments/cse-ai/faculty-achievements')
```

### 2. **Add Missing Admin Configurations**
Add configurations for:
- `bos-minutes` (missing from admin but exists in view)
- Gallery modules if needed

### 3. **Standardize Data Flow**
- Normal view page → Admin department APIs → Configured modules → Database tables
- This ensures consistent field mapping and data structure

### 4. **Test All Sections**
Verify each sidebar section loads data correctly after mapping update:

| Section | Test Action | Expected Result |
|---------|------------|----------------|
| Faculty Profiles | Click sidebar → view table | Shows faculty with correct columns |
| Board of Studies | Click sidebar → view members/minutes | Shows BOS data |
| Workshops | Click sidebar → view workshops | Shows workshop categories |
| Physical Facilities | Click sidebar → view facilities | Shows categorized facilities |
| All others | Click each section | Data loads without errors |

---

## Current Status

**Normal View Page:** Using mixed API endpoints (some direct, some admin)  
**Admin Dashboard:** Fully configured with 20+ modules  
**Alignment:** Needs standardization to use admin APIs consistently  

**Next Step:** Update CSEAI.tsx to use admin department APIs for all data fetching instead of direct table APIs.