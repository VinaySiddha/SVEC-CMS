# Department Sidebar Update Guide

This guide shows how to update all department pages to use the new FixedSidebar component.

## Files Updated So Far:

- ✅ CSE.tsx - Complete
- ✅ ECE.tsx - Complete
- ✅ EEE.tsx - Complete
- ✅ AIML.tsx - Complete
- ✅ Civil.tsx - Complete
- ✅ Mechanical.tsx - Complete
- ✅ MBA.tsx - Complete
- ✅ CSEAI.tsx - Complete
- ✅ ECT.tsx - Complete
- ✅ CST.tsx - Complete
- ✅ BSH.tsx - Complete
- ✅ CSEDS.tsx - Complete

## Remaining Department Files to Update:

- [ ] ds.tsx (if it exists and is different from CSEDS)

## Steps to Update Each Department:

### 1. Add Import Statement

Add this import at the top of the file:

```typescript
import FixedSidebar from "../../components/FixedSidebar";
```

### 2. Update Sidebar Items Array

Replace the simple string array with an object array:

```typescript
// OLD FORMAT:
const sidebarItems = [
  'Department Profile', 'Faculty Profiles', 'Board of Studies', ...
];

// NEW FORMAT:
const sidebarItems = [
  { id: 'Department Profile', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
  { id: 'Faculty Profiles', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
  { id: 'Board of Studies', label: 'Board of Studies', icon: <Award className="w-4 h-4" /> },
  // ... continue for all items
];
```

### 3. Replace Return Statement

Replace the old sidebar implementation with the new FixedSidebar component:

```typescript
// OLD RETURN:
return (
  <div className="pt-24 bg-gray-100">
    <section className="bg-[#8B1919] text-white py-12">
      {/* Header content */}
    </section>

    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 lg:flex-shrink-0">
          {/* Old sidebar implementation */}
        </aside>
        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>
    </div>
  </div>
);

// NEW RETURN:
return (
  <div className="pt-24 bg-gray-100">
    <section className="bg-[#8B1919] text-white py-12">
      {/* Header content */}
    </section>

    {/* Fixed Sidebar Component */}
    <FixedSidebar
      isOpen={sidebarOpen}
      onToggle={() => setSidebarOpen(!sidebarOpen)}
      onClose={() => setSidebarOpen(false)}
      items={sidebarItems}
      activeItem={activeContent}
      onItemClick={setActiveContent}
      title="[DEPARTMENT] Department"
      buttonLabel="Department Menu"
    />

    {/* Main Content */}
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        {renderContent()}
      </div>
    </div>
  </div>
);
```

### 4. Icon Mapping for Common Department Sections:

```typescript
// Common icons for department sections:
Building - Department Profile
Users - Faculty Profiles
Award - Board of Studies, Student Achievements
BookOpen - Syllabus, Handbooks
HardHat - Physical Facilities
Library - Department Library
Handshake - MoUs
TrendingUp - Faculty Development Programs, Innovations
Trophy - Faculty Achievements, Merit Scholarship
Presentation - Workshops, Guest Lecturers
Briefcase - Placements
Activity - Technical Association, Training Activities, Extra-Curricular
FileText - Newsletters, Handbooks
Phone - Contact
Settings - Technical Association
Wifi - e-Resources
```

## Benefits of the New Fixed Sidebar:

- ✅ Fixed positioning like a header
- ✅ Always accessible via floating menu button
- ✅ Professional animations and transitions
- ✅ Contextual icons for better UX
- ✅ Responsive design for all screen sizes
- ✅ Consistent styling across all departments
- ✅ Better accessibility and navigation

## Testing:

After updating each department:

1. Check that the sidebar opens/closes properly
2. Verify all menu items work correctly
3. Test on mobile and desktop
4. Ensure icons display correctly
5. Confirm smooth animations
