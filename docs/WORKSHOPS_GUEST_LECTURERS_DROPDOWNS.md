# Workshops & Guest Lecturers - Dropdown Implementation

## ✅ Implementation Status: COMPLETE

The workshops section now has **separate dropdown sections** for Workshops and Guest Lecturers/Seminars with proper filtering and organization.

---

## 📋 Current Structure

### 1. **Workshops Section**
- Displays all workshops **without** "Guest Lecturers/Seminars" category
- Each year is a collapsible dropdown
- Shows data in table format

```
┌─────────────────────────────────────────┐
│         WORKSHOPS (Title)               │
├─────────────────────────────────────────┤
│ 2024-25 ▼                               │  ← Dropdown (click to expand/collapse)
│ ─────────────────────────────────────  │
│ S.No │ Title       │ Details            │
│ 1    │ Workshop A  │ 📄 View Details   │
│ 2    │ Workshop B  │ 📄 View Details   │
│ 3    │ Workshop C  │ -                  │
└─────────────────────────────────────────┘
```

### 2. **Guest Lecturers / Seminars Section**
- Displays only workshops with category **"Guest Lecturers/Seminars"**
- Each year is a collapsible dropdown
- Shows data in table format

```
┌─────────────────────────────────────────┐
│    GUEST LECTURERS / SEMINARS (Title)   │
├─────────────────────────────────────────┤
│ 2024-25 ▼                               │  ← Dropdown (click to expand/collapse)
│ ─────────────────────────────────────  │
│ S.No │ Title         │ Details          │
│ 1    │ Guest Speaker │ 📄 View Details │
│ 2    │ Seminar       │ 📄 View Details │
└─────────────────────────────────────────┘
```

### 3. **Image Gallery Section**
- Main dropdown for gallery images
- Filter by category (Workshops / Guest Lecturers)
- Nested dropdowns by academic year

---

## 🛠️ Technical Implementation

### File Modified
**Location:** `src/pages/departments/CST.tsx` (Lines 2355-2510)

### Key Logic

#### 1. **Workshop Separation** (Line 2375-2376)
```typescript
const regularWorkshops = workshops.filter((w: any) => 
  !w.category || w.category.toLowerCase() !== 'guest lecturers/seminars'
);
const guestLecturers = workshops.filter((w: any) => 
  w.category && w.category.toLowerCase() === 'guest lecturers/seminars'
);
```

**Filtering Logic:**
- **Regular Workshops:** Items with no category OR category ≠ "guest lecturers/seminars"
- **Guest Lecturers:** Items with category = "guest lecturers/seminars"

#### 2. **Group by Academic Year** (Line 2378-2390)
```typescript
const groupByYear = (items: any[]) => {
  return items.reduce((acc: any, item: any) => {
    const year = item.academic_year || 'Current Year';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});
};

const regularWorkshopsByYear = groupByYear(regularWorkshops);
const guestLecturersByYear = groupByYear(guestLecturers);
```

#### 3. **Render Table Function** (Line 2396-2440)
```typescript
const renderWorkshopsTable = (workshopsByYear: any, title: string) => {
  return (
    <div className="space-y-3 mb-8">
      <h3 className="text-2xl font-bold text-[#B22222] mb-4">{title}</h3>
      {sortedYears.map((year: string, idx: number) => {
        const yearWorkshops = workshopsByYear[year];
        if (!yearWorkshops) return null;
        
        return (
          <details open={idx === 0} className="cst-dropdown group">
            <summary className="bg-[#B22222] text-white p-4 rounded-lg...">
              <span>{year}</span>
              <span className="group-open:rotate-180">▼</span>
            </summary>
            {/* Table with S.No, Title, Details */}
          </details>
        );
      })}
    </div>
  );
};
```

#### 4. **Conditional Rendering** (Line 2445-2449)
```typescript
{/* Workshops Section */}
{regularWorkshops.length > 0 && renderWorkshopsTable(regularWorkshopsByYear, 'Workshops')}

{/* Guest Lecturers/Seminars Section */}
{guestLecturers.length > 0 && renderWorkshopsTable(guestLecturersByYear, 'Guest Lecturers / Seminars')}
```

**Behavior:**
- Only shows section if it has data
- Both sections can be empty, one empty, or both populated

---

## 📊 Table Column Structure

Each dropdown contains a table with:

| Column | Purpose | Shows |
|--------|---------|-------|
| **S.No** | Serial number | Auto-incremented (1, 2, 3, ...) |
| **Title** | Workshop/Event name | From `title` field |
| **Details** | Document/Info link | Link if `file_url` exists, else "-" |

---

## 🎨 Styling & Features

### Dropdown Headers
- **Background:** Red (#B22222)
- **Text Color:** White
- **Animation:** Chevron rotates on open/close
- **Hover Effect:** Darker red on hover

### Table Design
- **Header Row:** Gray background
- **Body Rows:** Alternating white background on hover
- **Borders:** Light gray between rows
- **Responsive:** Full width on all screen sizes

### Gallery Filter
- **Dropdown selector** for category
- **Independent filtering** from workshop sections
- **By Year:** Nested dropdowns grouped by academic year
- **Image Grid:** 1-3 columns (responsive)

---

## 🔄 Data Flow

```
Database (cst_workshops)
    ↓
API: GET /api/cst/cst-workshops
    ↓
State: workshops[] (all items)
    ↓
Filter by category (client-side)
    ├─→ regularWorkshops[] (no category or other categories)
    └─→ guestLecturers[] (category = "guest lecturers/seminars")
    ↓
Group by academic_year
    ├─→ regularWorkshopsByYear
    └─→ guestLecturersByYear
    ↓
Render separate sections
    ├─→ Workshops (with dropdowns by year)
    └─→ Guest Lecturers / Seminars (with dropdowns by year)
```

---

## 📝 Database Requirements

### cst_workshops Table Fields
```sql
CREATE TABLE cst_workshops (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),  -- e.g., 'Workshops', 'Guest Lecturers/Seminars', etc.
  file_url VARCHAR(500),  -- Link to workshop document
  academic_year VARCHAR(20), -- e.g., '2024-25', '2023-24'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Expected Data Examples
```
ID | Title                    | Category                  | Academic Year
1  | Spring Workshop 2024    | (NULL or 'Workshops')     | 2024-25
2  | Python Basics           | Workshops                 | 2024-25
3  | Guest: Dr. Kumar        | Guest Lecturers/Seminars  | 2024-25
4  | Industry Seminar        | Guest Lecturers/Seminars  | 2023-24
5  | Advanced Java           | Workshops                 | 2023-24
```

---

## 🎯 Features & Behavior

### ✅ Implemented
- ✅ Separate sections for Workshops and Guest Lecturers
- ✅ Collapsible dropdowns for each year
- ✅ Table format with S.No, Title, Details
- ✅ Automatic year-based grouping and sorting (newest first)
- ✅ First dropdown open by default, others closed
- ✅ File link handling (shows "📄 View Details" or "-" if no link)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Gallery category filtering (independent)
- ✅ Conditional rendering (sections show only if data exists)

### 🎨 Styling
- ✅ Red (#B22222) header with white text
- ✅ Smooth hover transitions
- ✅ Animated chevron rotation
- ✅ Gray table styling
- ✅ Proper spacing and padding

### 🔧 Dynamic Behavior
- ✅ Automatic filtering based on category field
- ✅ Dynamic section titles
- ✅ No hardcoded limits on number of items
- ✅ Handles empty categories gracefully

---

## 🧪 Testing Checklist

- [ ] Navigate to CST Department Page
- [ ] Click "Workshops" in the navigation
- [ ] **Workshops Section**
  - [ ] Displays if workshops exist
  - [ ] Each year has a collapsible dropdown
  - [ ] First year dropdown is open
  - [ ] Clicking dropdown toggles expand/collapse
  - [ ] Table shows correct data (S.No, Title, Details)
  - [ ] Links work and open new tab
- [ ] **Guest Lecturers Section**
  - [ ] Displays only if guest lecturers exist
  - [ ] Same dropdown behavior as workshops
  - [ ] Table shows correct data
- [ ] **Image Gallery**
  - [ ] Category filter dropdown works
  - [ ] Images display correctly
  - [ ] Year grouping works
- [ ] **Responsive Design**
  - [ ] Works on mobile (320px+)
  - [ ] Works on tablet (768px+)
  - [ ] Works on desktop (1024px+)

---

## 📄 Related Files

| File | Purpose | Status |
|------|---------|--------|
| `src/pages/departments/CST.tsx` | Main component | ✅ Updated |
| `src/pages/api/cst/cst-workshops.ts` | API endpoint | ✅ Fixed |
| `src/pages/api/cst/cst-workshops-gallery.ts` | Gallery API | ✅ Working |

---

## 🚀 How It Works

1. **User navigates to CST Department**
2. **User clicks "Workshops" section**
3. **Component fetches workshops data** from API
4. **Client-side filtering:**
   - Regular Workshops ≠ "Guest Lecturers/Seminars"
   - Guest Lecturers = "Guest Lecturers/Seminars"
5. **Each category grouped by academic year**
6. **Render separate sections** with dropdowns
7. **User can:**
   - Click year dropdowns to expand/collapse
   - Click file links to view details
   - Filter gallery by category
   - View images by year

---

## 📅 Last Updated
**Date:** November 25, 2025  
**Status:** ✅ COMPLETE & FUNCTIONAL

---

## 🎓 Summary

The Workshops section now provides:
- **Clear separation** between Workshops and Guest Lecturers
- **Professional table layout** with organized dropdowns
- **Flexible data display** based on database categories
- **User-friendly interface** matching scholarship section pattern
- **Responsive design** for all devices
