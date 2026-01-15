# CST.tsx Styles Application Guide

## Overview
The **Civil.tsx** page and other department pages use CSS styles that are defined based on the **CST.tsx** department page structure. These styles are applied through **Tailwind CSS classes** and **custom CSS classes** defined in the global stylesheet.

---

## Style Application Architecture

### 1. **CSS Stylesheet Location**
- **File**: [src/app/globals.css](src/app/globals.css)
- **Type**: Global CSS file imported in the Next.js app
- **Framework**: Tailwind CSS + custom layer components

### 2. **Common CSS Classes Used**

Both CST.tsx and Civil.tsx use the following CSS classes:

#### **a) Dropdown Styling** - `.cst-dropdown`
```css
.cst-dropdown {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}
```

**Usage in TSX files:**
```tsx
<details className="cst-dropdown">
  <summary>Dropdown Title</summary>
  <div className="cst-dropdown-content">
    {/* Content */}
  </div>
</details>
```

#### **b) Dropdown Summary Styling** - `.cst-dropdown summary`
```css
.cst-dropdown summary {
  background-color: #B22222 !important;  /* Maroon/Red color */
  color: white !important;
  padding: 16px 20px !important;
  font-weight: 600 !important;
  font-size: 18px !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}
```

**Visual Properties:**
- **Background**: `#B22222` (Maroon Red)
- **Hover State**: `#A01A1A` (Darker Red)
- **Text**: White, Bold, 18px
- **Icon**: White triangle (::after pseudo-element)

#### **c) Dropdown Arrow/Chevron** - `.cst-dropdown summary::after`
```css
.cst-dropdown summary::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid white;
  transition: transform 0.3s ease;
  margin-left: auto;
  flex-shrink: 0;
}

/* Rotate 180deg when dropdown is open */
.cst-dropdown[open] summary::after {
  transform: rotate(180deg);
}
```

#### **d) Content Styling** - `.cst-dropdown-content`
```css
.cst-dropdown .cst-dropdown-content {
  padding: 20px;
  background-color: white;
  border: 2px solid #B22222;
  border-top: none;
  border-radius: 0 0 8px 8px;
}
```

#### **e) Animation** - `slideDown`
```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cst-dropdown[open] .cst-dropdown-content {
  animation: slideDown 0.3s ease-out;
}
```

---

## How Civil.tsx Uses CST Styles

### **Component Structure**
Both files use the same HTML5 `<details>` element with `className="cst-dropdown"`:

**In [Civil.tsx](src/pages/departments/Civil.tsx#L690)**:
```tsx
<details open className="cst-dropdown">
  <summary>Placements</summary>
  <div className="cst-dropdown-content">
    <ul className="list-disc pl-6 my-2 space-y-2">
      {/* Placement items */}
    </ul>
  </div>
</details>
```

**In [CST.tsx](src/pages/departments/CST.tsx#L851)**:
```tsx
<details key={group.category} open={index === 0} className="cst-dropdown">
  <summary>{group.category}</summary>
  <div className="cst-dropdown-content">
    {/* Dynamic content */}
  </div>
</details>
```

---

## Tailwind CSS Classes Used

### **Common Tailwind Classes in Both Files**

| Class | Purpose |
|-------|---------|
| `animate-fade-in` | Smooth fade-in animation |
| `text-2xl font-bold text-gray-800` | Section headings |
| `text-gray-700` | Body text |
| `bg-gray-50 rounded-lg shadow-sm` | Content cards |
| `text-blue-800` / `text-green-800` | Color-coded headings |
| `p-4` | Padding |
| `space-y-4` | Vertical spacing |
| `border border-gray-300` | Borders |
| `hover:bg-gray-100 transition-colors` | Hover effects |

---

## Color Scheme

### **Primary Colors**
| Color | Hex Value | Usage |
|-------|-----------|-------|
| **SVEC Red** | `#B22222` | Dropdown headers, buttons |
| **Dark Red** | `#A01A1A` | Hover states |
| **Gray** | `#e5e7eb` | Borders |
| **Blue** | `#0066cc` | Links |

### **Example in Civil.tsx**
```tsx
<a
  href={item.file_url}
  className="text-[#B22222] hover:underline"  // Using the same maroon color
  target="_blank"
  rel="noopener noreferrer"
>
  View Details
</a>
```

---

## CSS Organization

### **File Structure**
```
src/
├── app/
│   └── globals.css              ← Main stylesheet with CST styles
├── pages/
│   └── departments/
│       ├── CST.tsx              ← Source department (defines style pattern)
│       ├── Civil.tsx            ← Inherits style pattern
│       ├── CSEAI.tsx
│       ├── AIML.tsx
│       └── ... (other departments)
└── styles/
    └── placement-layout.css     ← Additional utility styles
```

---

## Animation Details

### **slideDown Animation**
- **Duration**: 0.3s
- **Timing**: ease-out
- **Effect**: Content slides down from -10px with fade-in

### **Hover Effects**
- Dropdown header background changes from `#B22222` to `#A01A1A`
- Shadow increases: `0 1px 4px` → `0 2px 8px`
- Smooth transition over 0.3s

---

## Key Features

✅ **Consistent Styling Across All Departments**
- All department pages (Civil, CST, CSEAI, AIML, etc.) use the same CSS classes
- Centralized in `globals.css` for easy maintenance

✅ **Responsive Design**
- Uses Tailwind's responsive prefixes (md:, lg:, etc.)
- Mobile-first approach

✅ **Accessibility**
- Focus states: `outline: none` with shadow
- Proper semantic HTML with `<details>/<summary>`
- Keyboard navigable dropdowns

✅ **Performance**
- CSS-in-JS with Tailwind layers
- Minimal repaints with transition properties
- Hardware-accelerated animations

---

## How to Apply These Styles to New Pages

1. **Import the global stylesheet** (auto-imported in `_app.tsx` or `layout.tsx`)
2. **Use the `cst-dropdown` class** for collapsible sections:
   ```tsx
   <details className="cst-dropdown">
     <summary>Title</summary>
     <div className="cst-dropdown-content">Content</div>
   </details>
   ```
3. **Use Tailwind classes** for other elements
4. **Reference the color** `#B22222` for consistency

---

## Customization

To modify the CST dropdown styles globally:

1. Edit [src/app/globals.css](src/app/globals.css#L625)
2. Update the `.cst-dropdown` class properties
3. Changes apply automatically to all department pages

### **Example Customization**
```css
.cst-dropdown summary {
  background-color: #Your-Color !important;
  /* Other properties */
}
```

---

## Related Files

- [CST.tsx](src/pages/departments/CST.tsx) - Source reference implementation
- [Civil.tsx](src/pages/departments/Civil.tsx) - Example usage
- [globals.css](src/app/globals.css) - CSS definitions (lines 625-730)
- DepartmentSidebar component - Wrapper component for layout

