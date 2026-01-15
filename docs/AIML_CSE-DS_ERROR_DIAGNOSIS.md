# AIML & CSE-DS Admin Dashboard - Error Diagnosis & Resolution

## 🚨 Current Error

```
API Error (404): {"error":"Invalid department or module"}
```

**Error Location:** `/src/utils/api-helpers.ts` (line 43)  
**Call Stack:** `fetchWithErrorHandling` → `async handleDelete`  
**Source:** `/src/app/departments/[dept]/dashboard/page.tsx` (line 644)

---

## 🔍 Analysis

### **API Route Mapping - ✅ WORKING**

**File:** `/src/app/api/admin/departments/[dept]/[module]/route.ts`

Both departments are properly defined in `DEPARTMENT_MODULES`:

#### **AIML Modules (✅ Available):**
```typescript
'aiml': {
  'syllabus': 'aiml_syllabus',
  'student-achievements': 'aiml_student_achievements',
  'faculty-achievements': 'aiml_faculty_achievements',
  'faculty-development': 'aiml_faculty_development',
  'mous': 'aiml_mous',
  'physical-facilities': 'aiml_physical_facilities',
  // Plus 15+ other modules
}
```

#### **CSE-DS Modules (✅ Available):**
```typescript
'cse-ds': {
  'syllabus': 'ds_syllabus',
  'student-achievements': 'ds_student_achievements',
  'faculty-achievements': 'ds_faculty_achievements',
  'faculty-development': 'ds_faculty_development',
  'mous': 'ds_mous',
  'physical-facilities': 'ds_physical_facilities',
  // Plus 15+ other modules
}
```

### **Module Fields Configuration - ✅ WORKING**

**File:** `/src/config/module-fields.ts` (Lines 1625-2312)

Both departments have complete CRUD configurations matching the API mapping.

---

## 🎯 Possible Root Causes

### **1. Module Name Mismatch**
The error occurs during DELETE operation. User might be trying to access a module with a different name than expected.

**Common Issues:**
- Frontend using `faculty_development` vs API expecting `faculty-development` (with dash)
- Frontend using `student_achievements` vs API expecting `student-achievements` (with dash)
- Case sensitivity issues (`AIML` vs `aiml`, `CSE-DS` vs `cse-ds`)

### **2. Invalid Module Access**
User might be trying to delete from a module that:
- Exists in API but not in module-fields config
- Has different naming convention
- Was recently added and not synced

### **3. Authentication/Authorization Issues**
- User token might not have permissions for AIML/CSE-DS
- Department restriction in auth middleware

---

## 🔧 Quick Diagnostics

### **Step 1: Check Department & Module in URL**

When the error occurs, check the browser's Network tab for the failing request URL:
- Should be: `/api/admin/departments/aiml/syllabus?id=123`
- Or: `/api/admin/departments/cse-ds/student-achievements?id=456`

### **Step 2: Verify Module Names**

**Expected Module Names (API format):**
```
aiml/syllabus
aiml/student-achievements
aiml/faculty-achievements
aiml/faculty-development
aiml/mous
aiml/physical-facilities

cse-ds/syllabus
cse-ds/student-achievements
cse-ds/faculty-achievements
cse-ds/faculty-development
cse-ds/mous
cse-ds/physical-facilities
```

**Note:** All module names use **dashes** (`-`), not underscores (`_`).

### **Step 3: Check Authentication**
Verify the user has proper permissions:
- Role: `admin`, `dept`, or `super_admin`
- Valid JWT token in Authorization header
- Department access permissions

---

## 🚀 Resolution Strategies

### **Strategy 1: Ensure Module Name Consistency**

The frontend dashboard needs to request modules with the exact names defined in the API mapping.

**Potential Fix Locations:**
1. **Dashboard Module List:** Check if frontend is using correct module names
2. **API Requests:** Verify DELETE requests use dashed names (`student-achievements` not `student_achievements`)
3. **Route Generation:** Ensure URL construction matches API expectations

### **Strategy 2: Debug Current Request**

Add debug logging to see exactly what's being requested:

```typescript
// In /src/app/departments/[dept]/dashboard/page.tsx
console.log('DELETE Request Details:', {
  dept: dept,
  module: selectedModule,
  id: id,
  fullUrl: `/api/admin/departments/${dept}/${selectedModule}?id=${id}`
});
```

### **Strategy 3: Verify Complete Module List**

Check if the frontend dashboard is showing the correct modules for AIML/CSE-DS:

**Expected Modules for Both Departments:**
- Syllabus
- Student Achievements  
- Faculty Achievements
- Faculty Development
- MOUs
- Physical Facilities

Plus department-specific modules from the API mapping.

---

## 🔄 Immediate Action Steps

### **Step 1: Identify Exact Request**
1. Open Browser Dev Tools (F12)
2. Go to Network tab
3. Reproduce the 404 error
4. Find the failing API request
5. Note the exact URL and method

### **Step 2: Cross-Reference API Mapping**
1. Check if the department name in URL matches API mapping keys
2. Check if the module name in URL matches API mapping values
3. Verify case sensitivity

### **Step 3: Test Alternative Modules**
Try accessing different modules for the same department:
- If `student-achievements` fails, try `syllabus`
- If all modules fail, it's a department issue
- If only specific modules fail, it's a module mapping issue

### **Step 4: Test Different Departments**
- Test the same module in a working department (like `cse-ai`)
- Compare request URLs and parameters

---

## 🎯 Expected Working URLs

### **AIML Department:**
```
GET /api/admin/departments/aiml/syllabus
GET /api/admin/departments/aiml/student-achievements
DELETE /api/admin/departments/aiml/faculty-achievements?id=123
PUT /api/admin/departments/aiml/mous?id=456
```

### **CSE-DS Department:**
```
GET /api/admin/departments/cse-ds/syllabus
GET /api/admin/departments/cse-ds/student-achievements  
DELETE /api/admin/departments/cse-ds/physical-facilities?id=789
PUT /api/admin/departments/cse-ds/faculty-development?id=012
```

---

## ✅ Verification Checklist

After implementing fixes:

- [ ] **Department Names:** Verify `aiml` and `cse-ds` (lowercase, dashes)
- [ ] **Module Names:** Verify dashed format (`student-achievements` not `student_achievements`)
- [ ] **API Mapping:** Confirm module exists in `DEPARTMENT_MODULES`
- [ ] **Config Mapping:** Confirm module exists in `module-fields.ts`
- [ ] **Database Tables:** Verify tables exist (`aiml_syllabus`, `ds_student_achievements`, etc.)
- [ ] **Authentication:** Confirm user has proper permissions
- [ ] **Request Format:** Verify DELETE requests include `?id=` parameter

---

## 🔗 Related Files

1. **API Route:** `/src/app/api/admin/departments/[dept]/[module]/route.ts`
2. **Module Config:** `/src/config/module-fields.ts` (lines 1625-2312)
3. **Dashboard Frontend:** `/src/app/departments/[dept]/dashboard/page.tsx`
4. **Auth Utils:** `/src/utils/api-helpers.ts`
5. **Department Constants:** `/src/lib/deptRules.ts`

---

**Next Step:** Please check the browser's Network tab during the 404 error and share the exact failing request URL. This will help pinpoint whether it's a department name issue, module name issue, or other configuration problem.

---

**Status:** ⚠️ Awaiting Error Details  
**Created:** November 19, 2025  
**Priority:** High - Blocking CRUD Operations