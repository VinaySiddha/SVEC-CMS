# ⚠️ CRITICAL ISSUE - Faculty Development Table Missing

## 🚨 Error Diagnosed

```
API Error (500): Table 'svec_cms.cai_faculty_development_programs' doesn't exist
```

**What This Means**: The code is trying to access a table that doesn't exist in the database.

---

## 🔍 Analysis

### Current Configuration
- **Module Key**: `faculty-development`
- **Mapped Table**: `cai_faculty_development_programs`
- **Status**: ❌ TABLE DOESN'T EXIST IN DATABASE

### Files Using This Mapping
1. `/src/app/api/admin/departments/[dept]/[module]/route.ts` (Line 20)
2. `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts` (Line 19)
3. `/src/config/module-fields.ts` (Line 347)

---

## 🎯 Solution Options

### Option 1: Find the Actual Table Name
The table might exist with a different name. Common alternatives:
- `cai_faculty_development`
- `cai_fdp`
- `cai_faculty_development_program` (singular)
- `faculty_development_programs` (no prefix)

### Option 2: Create the Table
If the table doesn't exist, we need to create it with the schema we designed.

### Option 3: Disable the Module
Remove the module from the dashboard until the table is created.

---

## 📋 Next Steps

**To fix this issue, we need to:**

1. **Identify the actual table name** by checking the database
2. **Update the configuration** with the correct table name
3. **Verify the table schema** matches our field configuration

---

## 🔧 What We Know

From the image you provided earlier, the table should have these columns:
- `id` (INT, AUTO_INCREMENT)
- `dept` (VARCHAR 20)
- `category` (VARCHAR 50)
- `title` (VARCHAR 255)
- `year` (VARCHAR 10, NULL)
- `file_url` (VARCHAR 255, NULL)
- `gallery` (JSON, NULL)

---

## ❓ Question for You

**Can you please provide:**

1. The actual table name for faculty development programs in your database (check database directly)
2. Or, should we create a new table with the correct name?

Once we know the correct table name, I can fix all the mappings and the error will be resolved.

---

## 🚀 Quick Fix Path

Once you provide the table name, I will:
1. Update `/src/app/api/admin/departments/[dept]/[module]/route.ts` (Line 20)
2. Update `/src/app/api/admin/departments/[dept]/[module]/structure/route.ts` (Line 19)
3. Keep `/src/config/module-fields.ts` configuration as is (it's correct)
4. Restart the server
5. Test the module - ✅ Should work!

**Estimated time to fix**: 2 minutes once we have the table name.

