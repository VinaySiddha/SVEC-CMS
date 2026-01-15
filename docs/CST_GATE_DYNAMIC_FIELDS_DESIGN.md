# CST GATE Dynamic Fields Design

## 📋 Overview

This document defines the dynamic field configuration for the **CST GATE** module - tracking GATE (Graduate Aptitude Test for Engineering) exam performance and student achievements.

**Module Name**: `gate`  
**Table Name**: `cst_gate`  
**Department Prefix**: `cst_`  
**Purpose**: Manage GATE exam data, student performance, scores, and achievements

---

## 🗄️ Database Schema

```sql
CREATE TABLE cst_gate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_no VARCHAR(50) NOT NULL UNIQUE,
  student_name VARCHAR(255) NOT NULL,
  batch YEAR NOT NULL,
  specialization VARCHAR(100),
  gate_score INT,
  gate_rank INT,
  gate_percentile DECIMAL(5, 2),
  exam_date DATE,
  stream VARCHAR(100),
  qualified VARCHAR(10),
  score_card_url VARCHAR(500),
  document_url VARCHAR(500),
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🎨 Dynamic Fields Configuration

### Module Configuration Structure

```typescript
'gate': {
  tableName: 'cst_gate',
  displayField: 'student_name',
  fields: [
    // Field definitions listed below
  ],
  searchableFields: ['student_name', 'roll_no', 'batch', 'specialization'],
  sortableFields: ['student_name', 'gate_score', 'gate_rank', 'batch', 'created_at'],
  editableFields: ['gate_score', 'gate_rank', 'gate_percentile', 'qualified', 'remarks', 'score_card_url', 'document_url']
}
```

---

## 🔧 Field Definitions

### 1. **Roll Number** (roll_no)
```typescript
{
  name: 'roll_no',
  label: 'Roll Number',
  type: 'text',
  placeholder: 'e.g., 20A81CS001',
  required: true,
  size: 'half',
  description: 'Student roll number (unique identifier)',
  validation: {
    pattern: '^[0-9A-Za-z]+$',
    message: 'Roll number should contain only alphanumeric characters'
  }
}
```

**Purpose**: Unique identifier for each student  
**Type**: Text (alphanumeric)  
**Constraints**: Unique, Required  
**Example**: 20A81CS001, 22A81CS045

---

### 2. **Student Name** (student_name)
```typescript
{
  name: 'student_name',
  label: 'Student Name',
  type: 'text',
  placeholder: 'e.g., John Smith',
  required: true,
  size: 'full',
  description: 'Full name of the student',
  validation: {
    pattern: '^[a-zA-Z\\s]+$',
    message: 'Name should contain only letters and spaces'
  }
}
```

**Purpose**: Student's full name  
**Type**: Text  
**Constraints**: Required  
**Example**: Rohit Kumar Verma, Priya Sharma

---

### 3. **Batch** (batch)
```typescript
{
  name: 'batch',
  label: 'Batch Year',
  type: 'select',
  required: true,
  size: 'half',
  description: 'Admission batch/year',
  options: [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' }
  ]
}
```

**Purpose**: Student batch year  
**Type**: Select  
**Constraints**: Required  
**Values**: Dropdown from last 5 years

---

### 4. **Specialization** (specialization)
```typescript
{
  name: 'specialization',
  label: 'Specialization',
  type: 'select',
  required: false,
  size: 'half',
  description: 'Engineering specialization',
  options: [
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'electronics', label: 'Electronics & Communication' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'other', label: 'Other' }
  ]
}
```

**Purpose**: Student's specialization branch  
**Type**: Select  
**Constraints**: Optional  
**Values**: Dropdown with common engineering branches

---

### 5. **GATE Score** (gate_score)
```typescript
{
  name: 'gate_score',
  label: 'GATE Score',
  type: 'number',
  placeholder: 'e.g., 680',
  required: true,
  size: 'half',
  description: 'GATE exam score out of 1000',
  validation: {
    min: 0,
    max: 1000,
    message: 'Score must be between 0 and 1000'
  }
}
```

**Purpose**: GATE exam score  
**Type**: Number  
**Constraints**: Required, Range 0-1000  
**Example**: 680, 750, 820

---

### 6. **GATE Rank** (gate_rank)
```typescript
{
  name: 'gate_rank',
  label: 'GATE Rank',
  type: 'number',
  placeholder: 'e.g., 1234',
  required: false,
  size: 'half',
  description: 'All India GATE rank',
  validation: {
    min: 1,
    message: 'Rank must be a positive number'
  }
}
```

**Purpose**: GATE all-India rank  
**Type**: Number  
**Constraints**: Optional, Positive  
**Example**: 1234, 5678, 12345

---

### 7. **GATE Percentile** (gate_percentile)
```typescript
{
  name: 'gate_percentile',
  label: 'GATE Percentile',
  type: 'number',
  placeholder: 'e.g., 95.5',
  required: false,
  size: 'half',
  description: 'GATE percentile score',
  validation: {
    min: 0,
    max: 100,
    message: 'Percentile must be between 0 and 100'
  }
}
```

**Purpose**: GATE exam percentile  
**Type**: Number (Decimal)  
**Constraints**: Optional, Range 0-100  
**Example**: 95.5, 87.3, 99.2

---

### 8. **Exam Date** (exam_date)
```typescript
{
  name: 'exam_date',
  label: 'Exam Date',
  type: 'date',
  required: false,
  size: 'half',
  description: 'Date when GATE exam was conducted'
}
```

**Purpose**: Date of GATE exam  
**Type**: Date  
**Constraints**: Optional  
**Example**: 2024-02-03

---

### 9. **Stream** (stream)
```typescript
{
  name: 'stream',
  label: 'GATE Stream',
  type: 'select',
  required: false,
  size: 'half',
  description: 'GATE paper selected',
  options: [
    { value: 'CS', label: 'Computer Science & IT' },
    { value: 'EC', label: 'Electronics & Communication' },
    { value: 'EE', label: 'Electrical Engineering' },
    { value: 'ME', label: 'Mechanical Engineering' },
    { value: 'CE', label: 'Civil Engineering' },
    { value: 'IN', label: 'Instrumentation Engineering' },
    { value: 'BT', label: 'Biotechnology' },
    { value: 'CH', label: 'Chemical Engineering' },
    { value: 'PH', label: 'Physics' },
    { value: 'MA', label: 'Mathematics' },
    { value: 'XE', label: 'Engineering Sciences' },
    { value: 'XH', label: 'Humanities & Social Sciences' }
  ]
}
```

**Purpose**: GATE paper/stream taken  
**Type**: Select  
**Constraints**: Optional  
**Values**: All GATE paper codes

---

### 10. **Qualified** (qualified)
```typescript
{
  name: 'qualified',
  label: 'Qualified',
  type: 'select',
  required: false,
  size: 'half',
  description: 'GATE qualification status',
  options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'awaiting', label: 'Awaiting Results' }
  ]
}
```

**Purpose**: Whether student qualified GATE exam  
**Type**: Select  
**Constraints**: Optional  
**Values**: Yes/No/Awaiting

---

### 11. **Score Card URL** (score_card_url)
```typescript
{
  name: 'score_card_url',
  label: 'GATE Score Card',
  type: 'file',
  required: false,
  size: 'full',
  accept: '.pdf,.jpg,.jpeg,.png',
  description: 'Upload GATE score card (PDF or image file)',
  validation: {
    max: 5242880,
    message: 'File size must be less than 5MB'
  }
}
```

**Purpose**: GATE score card document  
**Type**: File (PDF/Image)  
**Constraints**: Optional, Max 5MB  
**Accepted Formats**: PDF, JPG, PNG, JPEG

---

### 12. **Document URL** (document_url)
```typescript
{
  name: 'document_url',
  label: 'Additional Documents',
  type: 'file',
  required: false,
  size: 'full',
  accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  description: 'Upload any additional supporting documents (certificates, letters, etc.)'
}
```

**Purpose**: Supporting documents  
**Type**: File  
**Constraints**: Optional  
**Accepted Formats**: PDF, DOC, DOCX, JPG, PNG, JPEG

---

### 13. **Remarks** (remarks)
```typescript
{
  name: 'remarks',
  label: 'Remarks/Comments',
  type: 'textarea',
  required: false,
  size: 'full',
  rows: 4,
  placeholder: 'e.g., Qualified GATE 2024 with rank 1234. Currently pursuing Masters...',
  description: 'Any additional notes or remarks about the GATE performance'
}
```

**Purpose**: Additional notes/remarks  
**Type**: Textarea  
**Constraints**: Optional  
**Rows**: 4 (multiline text)

---

## 📊 Complete Module Configuration

```typescript
'gate': {
  tableName: 'cst_gate',
  displayField: 'student_name',
  fields: [
    {
      name: 'roll_no',
      label: 'Roll Number',
      type: 'text',
      placeholder: 'e.g., 20A81CS001',
      required: true,
      size: 'half',
      description: 'Student roll number (unique identifier)',
      validation: {
        pattern: '^[0-9A-Za-z]+$',
        message: 'Roll number should contain only alphanumeric characters'
      }
    },
    {
      name: 'student_name',
      label: 'Student Name',
      type: 'text',
      placeholder: 'e.g., John Smith',
      required: true,
      size: 'full',
      description: 'Full name of the student'
    },
    {
      name: 'batch',
      label: 'Batch Year',
      type: 'select',
      required: true,
      size: 'half',
      description: 'Admission batch/year',
      options: [
        { value: '2024', label: '2024' },
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' },
        { value: '2020', label: '2020' }
      ]
    },
    {
      name: 'specialization',
      label: 'Specialization',
      type: 'select',
      required: false,
      size: 'half',
      description: 'Engineering specialization',
      options: [
        { value: 'computer_science', label: 'Computer Science' },
        { value: 'electronics', label: 'Electronics & Communication' },
        { value: 'mechanical', label: 'Mechanical Engineering' },
        { value: 'civil', label: 'Civil Engineering' },
        { value: 'electrical', label: 'Electrical Engineering' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'gate_score',
      label: 'GATE Score',
      type: 'number',
      placeholder: 'e.g., 680',
      required: true,
      size: 'half',
      description: 'GATE exam score out of 1000',
      validation: {
        min: 0,
        max: 1000,
        message: 'Score must be between 0 and 1000'
      }
    },
    {
      name: 'gate_rank',
      label: 'GATE Rank',
      type: 'number',
      placeholder: 'e.g., 1234',
      required: false,
      size: 'half',
      description: 'All India GATE rank',
      validation: {
        min: 1,
        message: 'Rank must be a positive number'
      }
    },
    {
      name: 'gate_percentile',
      label: 'GATE Percentile',
      type: 'number',
      placeholder: 'e.g., 95.5',
      required: false,
      size: 'half',
      description: 'GATE percentile score',
      validation: {
        min: 0,
        max: 100,
        message: 'Percentile must be between 0 and 100'
      }
    },
    {
      name: 'exam_date',
      label: 'Exam Date',
      type: 'date',
      required: false,
      size: 'half',
      description: 'Date when GATE exam was conducted'
    },
    {
      name: 'stream',
      label: 'GATE Stream',
      type: 'select',
      required: false,
      size: 'half',
      description: 'GATE paper selected',
      options: [
        { value: 'CS', label: 'Computer Science & IT' },
        { value: 'EC', label: 'Electronics & Communication' },
        { value: 'EE', label: 'Electrical Engineering' },
        { value: 'ME', label: 'Mechanical Engineering' },
        { value: 'CE', label: 'Civil Engineering' },
        { value: 'IN', label: 'Instrumentation Engineering' },
        { value: 'BT', label: 'Biotechnology' },
        { value: 'CH', label: 'Chemical Engineering' },
        { value: 'PH', label: 'Physics' },
        { value: 'MA', label: 'Mathematics' },
        { value: 'XE', label: 'Engineering Sciences' },
        { value: 'XH', label: 'Humanities & Social Sciences' }
      ]
    },
    {
      name: 'qualified',
      label: 'Qualified',
      type: 'select',
      required: false,
      size: 'half',
      description: 'GATE qualification status',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        { value: 'awaiting', label: 'Awaiting Results' }
      ]
    },
    {
      name: 'score_card_url',
      label: 'GATE Score Card',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.jpg,.jpeg,.png',
      description: 'Upload GATE score card (PDF or image file)'
    },
    {
      name: 'document_url',
      label: 'Additional Documents',
      type: 'file',
      required: false,
      size: 'full',
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      description: 'Upload any additional supporting documents'
    },
    {
      name: 'remarks',
      label: 'Remarks/Comments',
      type: 'textarea',
      required: false,
      size: 'full',
      rows: 4,
      placeholder: 'e.g., Qualified GATE 2024 with rank 1234...',
      description: 'Any additional notes or remarks about the GATE performance'
    }
  ],
  searchableFields: ['student_name', 'roll_no', 'batch', 'specialization', 'stream'],
  sortableFields: ['student_name', 'gate_score', 'gate_rank', 'gate_percentile', 'batch', 'exam_date', 'created_at'],
  editableFields: ['batch', 'specialization', 'gate_score', 'gate_rank', 'gate_percentile', 'exam_date', 'stream', 'qualified', 'score_card_url', 'document_url', 'remarks']
}
```

---

## 🎯 Form Layout

### Form Sections

**Section 1: Student Information** (Read-only for existing records)
- Roll Number (half width)
- Student Name (full width)
- Batch Year (half width)
- Specialization (half width)

**Section 2: GATE Exam Details** (Editable)
- GATE Score (half width, required)
- GATE Rank (half width, optional)
- GATE Percentile (half width, optional)
- Exam Date (half width, optional)

**Section 3: Stream & Status** (Editable)
- GATE Stream (half width, optional)
- Qualified (half width, optional)

**Section 4: Documents** (Editable)
- GATE Score Card (full width, file upload)
- Additional Documents (full width, file upload)

**Section 5: Additional Information** (Editable)
- Remarks/Comments (full width, textarea)

---

## 📈 Field Statistics & Usage

| Field Name | Type | Required | Searchable | Sortable | Editable | Usage |
|------------|------|----------|-----------|----------|----------|-------|
| roll_no | text | ✅ | ✅ | ❌ | ❌ | Unique ID |
| student_name | text | ✅ | ✅ | ✅ | ❌ | Display field |
| batch | select | ✅ | ✅ | ✅ | ✅ | Filter by year |
| specialization | select | ❌ | ✅ | ❌ | ✅ | Branch info |
| gate_score | number | ✅ | ❌ | ✅ | ✅ | Main metric |
| gate_rank | number | ❌ | ❌ | ✅ | ✅ | Ranking |
| gate_percentile | number | ❌ | ❌ | ✅ | ✅ | Performance |
| exam_date | date | ❌ | ❌ | ✅ | ✅ | Timeline |
| stream | select | ❌ | ✅ | ❌ | ✅ | Subject area |
| qualified | select | ❌ | ❌ | ❌ | ✅ | Status |
| score_card_url | file | ❌ | ❌ | ❌ | ✅ | Document |
| document_url | file | ❌ | ❌ | ❌ | ✅ | Document |
| remarks | textarea | ❌ | ❌ | ❌ | ✅ | Notes |

---

## 🔍 Search & Filter Examples

**Search by student name**: "Rohit Kumar"  
**Filter by batch**: 2023  
**Filter by stream**: CS (Computer Science)  
**Filter by qualification**: Yes  
**Sort by score**: Descending (highest to lowest)  
**Sort by rank**: Ascending (best to worst)

---

## ✅ Validation Rules

| Field | Validation | Error Message |
|-------|-----------|----------------|
| roll_no | Alphanumeric pattern | Roll number should contain only alphanumeric characters |
| student_name | Letters & spaces | Name should contain only letters and spaces |
| gate_score | 0-1000 range | Score must be between 0 and 1000 |
| gate_rank | Positive number | Rank must be a positive number |
| gate_percentile | 0-100 range | Percentile must be between 0 and 100 |
| score_card_url | File size < 5MB | File size must be less than 5MB |
| score_card_url | PDF/Image only | Only PDF, JPG, PNG, JPEG files allowed |

---

## 🚀 Implementation Steps

### Step 1: Add Database Table
```sql
CREATE TABLE cst_gate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_no VARCHAR(50) NOT NULL UNIQUE,
  student_name VARCHAR(255) NOT NULL,
  batch YEAR NOT NULL,
  specialization VARCHAR(100),
  gate_score INT,
  gate_rank INT,
  gate_percentile DECIMAL(5, 2),
  exam_date DATE,
  stream VARCHAR(100),
  qualified VARCHAR(10),
  score_card_url VARCHAR(500),
  document_url VARCHAR(500),
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Step 2: Add Configuration to module-fields.ts
Add the `gate` module configuration to the `cst` section in `/src/config/module-fields.ts`

### Step 3: Add API Route Mapping
Update `/src/app/api/admin/departments/[dept]/[module]/route.ts` to map `gate` to `cst_gate` table

### Step 4: Add Dashboard Module Definition
Add GATE module to the CST department dashboard module list in `/src/app/departments/cst/dashboard/page.tsx`

### Step 5: Test Dynamic Form
1. Navigate to CST department admin dashboard
2. Click on "GATE" module
3. Verify form renders correctly
4. Test CRUD operations

---

## 📊 Sample Data

### Example 1: High Scorer
```json
{
  "roll_no": "20A81CS001",
  "student_name": "Rohit Kumar Verma",
  "batch": 2020,
  "specialization": "computer_science",
  "gate_score": 820,
  "gate_rank": 234,
  "gate_percentile": 98.5,
  "exam_date": "2024-02-03",
  "stream": "CS",
  "qualified": "yes",
  "remarks": "Qualified GATE 2024 with excellent score. Pursuing M.Tech at IIT Delhi."
}
```

### Example 2: Non-Qualifier
```json
{
  "roll_no": "20A81CS045",
  "student_name": "Priya Sharma",
  "batch": 2020,
  "specialization": "computer_science",
  "gate_score": 420,
  "gate_rank": null,
  "gate_percentile": 32.1,
  "exam_date": "2024-02-03",
  "stream": "CS",
  "qualified": "no",
  "remarks": "Needs improvement. Planning to appear in GATE 2025."
}
```

### Example 3: Awaiting Results
```json
{
  "roll_no": "22A81CS078",
  "student_name": "Arjun Singh",
  "batch": 2022,
  "specialization": "computer_science",
  "gate_score": null,
  "gate_rank": null,
  "gate_percentile": null,
  "exam_date": "2025-02-02",
  "stream": "CS",
  "qualified": "awaiting",
  "remarks": "Appeared in GATE 2025. Awaiting results."
}
```

---

## 📝 Notes

1. **Roll Number**: Must be unique for each student
2. **Score Validation**: GATE scores range from 0-1000
3. **Percentile**: IIT normalizes scores to percentile (0-100)
4. **Stream**: Different GATE papers have different code names (CS, EC, ME, etc.)
5. **Documents**: Store original score cards for verification
6. **Remarks**: Use for additional context like admission status, scholarship info, etc.

---

## 🎉 Status: Ready for Implementation

This dynamic field design is complete and ready to be implemented in the CST admin dashboard. The configuration follows the established patterns used for other CST modules (Faculty, Achievements, etc.) and provides a comprehensive solution for managing GATE exam data.

**Date**: November 23, 2025  
**Version**: 1.0  
**Status**: Design Complete ✅
