# Department Sidebar Implementation with Independent Content Scrolling and Collapsible Sidebar

This document describes the implementation of the fixed, collapsible sidebar and header layout with independent content scrolling for department pages in the SVEC-CMS project.

## Overview

The implementation creates a responsive layout with:
- Fixed header at the top of the page
- Collapsible fixed sidebar on the left side (on desktop) with independent scrolling
- Floating action button to toggle sidebar expansion/collapse from anywhere on the page
- Independently scrollable content area in the center that doesn't affect the sidebar position
- Sticky department banner within the scrollable content area
- Footer appears at the bottom when scrolling the main content area to the end
- Consistent content sizing across different sections
- Mobile-friendly drawer navigation

## Components

### DepartmentSidebar Component

The main component that provides the layout structure is located at `src/components/DepartmentSidebar.tsx`.

This component:
- Creates a fixed header at the top of the page with navigation links and E-CAP button
- Provides a fixed sidebar on the left for desktop view with department navigation
- Creates a mobile drawer navigation that slides in from the left
- Renders the main content area with proper spacing and scrolling

### Key Features

1. **Fixed Positioning with Independent Scrolling**
   - Header is fixed at the top using `fixed top-0 z-50`
   - Sidebar is fixed on the left using `fixed left-0 top-[72px] h-[calc(100vh-72px)]`
   - Content area has independent scrolling with `overflow-y-auto`
   - Content area has appropriate margin that adjusts based on sidebar state (`md:ml-16` or `md:ml-60`) 
   - Department banner is sticky within the scrollable main content area
   - Footer is included within the scrollable main content area

2. **Collapsible Sidebar**
   - Sidebar can be collapsed to save space using a floating action button
   - When collapsed, only icons are visible
   - Floating action button is always available at the bottom left corner
   - Smooth transition animation when expanding or collapsing

2. **Responsive Design**
   - Sidebar is hidden on mobile with `hidden md:block`
   - Mobile navigation button appears at the bottom of the screen on small devices
   - Smooth transitions and animations for better UX

3. **Enhanced Styling and Interactivity**
   - Custom scrollbar styling for the sidebar
   - Active item highlighting with red background
   - Rich hover effects with subtle animations:
     - Items slide slightly right on hover
     - Left-side accent border appears on hover
     - Icon scales and changes color on hover
   - Tooltips for collapsed sidebar items
   - Smooth transitions and animations
   - Shadow effects for depth and elevation
   - Consistent spacing and typography

## Usage

To use the sidebar in a department page:

```tsx
import { DepartmentSidebar } from '@/components/DepartmentSidebar';

// Define your sidebar items
const sidebarItems = [
  { id: 'department', label: 'Department Profile', icon: <Building className="w-4 h-4" /> },
  { id: 'faculty', label: 'Faculty Profiles', icon: <Users className="w-4 h-4" /> },
  // Add more items as needed
];

// In your component return:
return (
  <DepartmentSidebar
    items={sidebarItems}
    activeItem={activeContent}
    onItemClick={setActiveContent}
    title="Department Name"
  >
    {/* Your content here */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-[#B22222] mb-6">
        {activeContentTitle}
      </h2>
      {renderContent()}
    </div>
  </DepartmentSidebar>
);
```

## Mobile Responsiveness

The sidebar is designed to be fully responsive:

1. **Desktop View**:
   - Fixed sidebar on the left
   - Fixed header at the top
   - Content area scrolls independently

2. **Mobile View**:
   - Sidebar is hidden
   - A floating action button appears at the bottom left
   - Tapping it opens a fullscreen drawer with navigation options
   - Header remains fixed at the top

## Customization

The component can be customized by:
1. Modifying the color scheme in the component (currently uses `#B22222` as primary color)
2. Adjusting the width of the sidebar (currently 60 units or 15rem)
3. Changing the header height (currently 72px)
4. Adding or removing navigation items in the header

## Implementation Notes

- The sidebar uses styled-jsx for component-scoped styling
- The component handles its own state for mobile navigation and scroll effects
- z-index values are set to ensure proper stacking of elements
- The component is designed to work with Next.js pages