# Color Scheme Update Documentation

## Overview

This document outlines the color scheme updates made to the SVEC-CMS website to ensure consistency across all pages.

## Color Standards

The website now uses a consistent color scheme with the following primary colors:

- **Primary Red**: `#B22222` - Used for all text emphasis, headings, links, and accent elements
- **White**: `#FFFFFF` - Used for backgrounds and containers
- **Black**: `#000000` - Used for primary text content

## Changes Made

1. **Global CSS Variables**
   - Updated color variables in `globals.css` to ensure consistent theming across the site

2. **Department Pages**
   - Updated all department pages to use consistent styling
   - Changed all colored text elements to use the standard red color `#B22222`
   - Replaced various inconsistent red shades (`#850209`, `#7f1d1d`, `#8B0000`, etc.) with `#B22222`

3. **Sidebar Components**
   - Updated `DepartmentSidebar.tsx` to use white backgrounds with red accents
   - Updated `FixedSidebar.tsx` to use the standard red color

4. **UI Components**
   - Updated color usage in various UI components like buttons, links, and headings
   - Ensured consistency in hover effects and interactive elements

## Implementation Details

The color standardization was implemented through the following steps:

1. First, all department files were updated with a color standardization script
2. Next, a scanning script identified remaining inconsistencies
3. Finally, a targeted fix script updated the remaining files

## Maintenance Guidelines

When adding new components or pages:

1. Always use the CSS variables defined in `globals.css` for colors when possible
2. For direct color references, use `#B22222` for red elements
3. Use white backgrounds with red accents for UI components
4. Maintain the white background with red text pattern for headings and important text

## Scripts

Two utility scripts were created to help maintain color consistency:

1. `scripts/scan-for-colors.js` - Scans the codebase for non-standard colors
2. `scripts/fix-remaining-colors.js` - Updates remaining inconsistent colors

Run these scripts when making significant UI changes to ensure color consistency is maintained.