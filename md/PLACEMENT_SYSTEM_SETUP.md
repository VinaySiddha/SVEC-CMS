# Placement Management System - Setup Guide

## Overview

A complete placement management system for Sri Vasavi Engineering College with dynamic fields, staff management, and year-wise placement statistics.

## Features

✅ **Placement Staff Authentication** - Login system with email/password
✅ **Dynamic Dashboard** - Shows placement staff, statistics, and detailed reports
✅ **Year-wise Statistics** - Collapsible sections for each academic year
✅ **Branch-wise Breakdown** - Detailed placement data by department
✅ **Companies Management** - Track visiting companies
✅ **Responsive Design** - Mobile-first UI with gradient styling

## File Structure

```
src/
├── app/
│   ├── placement/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── page.tsx                 # Login page
│   │   └── dashboard/
│   │       └── page.tsx                    # Main dashboard
│   └── api/
│       └── placement/
│           ├── auth/
│           │   └── login/
│           │       └── route.ts            # Authentication API
│           ├── staff/
│           │   └── route.ts                # Staff management API
│           ├── statistics/
│           │   └── route.ts                # Statistics API
│           ├── details/
│           │   └── route.ts                # Placement details API
│           └── companies/
│               └── route.ts                # Companies API
migrations/
├── migrate-placement-schema.js             # Database schema migration
└── seed-placement-data.js                  # Sample data seeding
```

## Database Schema

### Tables Created

1. **placement_staff** - Staff members and coordinators
   - name, designation, branch, email, phone
   - password_hash, photo_url, qualifications
   - experience, research_interests, publications
   - social_media_links (JSON)

2. **placement_statistics** - Overall statistics
   - academic_year, category (UG/PG)
   - total_placed, average_package, highest_package
   - lowest_package, companies_visited

3. **placement_details** - Branch-wise breakdown
   - academic_year, branch, category
   - placed, not_placed, higher_studies

4. **placement_companies** - Visiting companies
   - name, logo_url, category, industry
   - visit_year

5. **placement_profile** - College placement info
   - college_name, placement_heading
   - head_of_placement_id, coordinator_id
   - vision, mission, contact info

## Setup Instructions

### Step 1: Create Database Schema

```bash
cd c:\Users\AtriDatta\Desktop\SVEC-CMS
node migrations/migrate-placement-schema.js
```

**Expected Output:**
```
Connected to database
✓ Created placement_staff table
✓ Created placement_companies table
✓ Created placement_statistics table
✓ Created placement_details table
✓ Created placement_profile table
✓ All placement tables created successfully!
```

### Step 2: Seed Sample Data

```bash
node migrations/seed-placement-data.js
```

**Expected Output:**
```
✓ Added staff: Dr. P N V GOPALA KRISHNA
✓ Added staff: Mr. T. Dileep
✓ Added statistics: 2024-25 - UG
✓ Added details: 2024-25 - CSE
✓ Placement data seeding completed!
```

### Step 3: Test Login

1. Navigate to: `http://localhost:3000/placement/auth/login`
2. Demo Credentials:
   - **Email:** `svectpo@srivasaviengg.ac.in`
   - **Password:** `password123`

3. Expected redirect to: `http://localhost:3000/placement/dashboard`

## API Endpoints

### Authentication
- **POST** `/api/placement/auth/login` - Login with email/password

### Staff Management
- **GET** `/api/placement/staff` - List all staff
- **POST** `/api/placement/staff` - Add new staff member

### Statistics
- **GET** `/api/placement/statistics` - Get all statistics
- **POST** `/api/placement/statistics` - Add/update statistics

### Placement Details
- **GET** `/api/placement/details` - Get branch-wise details
- **POST** `/api/placement/details` - Add/update details

### Companies
- **GET** `/api/placement/companies` - List companies
- **GET** `/api/placement/companies?year=2024` - Filter by year
- **POST** `/api/placement/companies` - Add company

## Dashboard Features

### Header Section
- Back to Home navigation
- Welcome message with staff name
- Department role display
- Logout button

### Statistics Cards
- Total Staff Members
- Historical Years
- Total Placements across all categories

### Placement Staff Section
- Grid display of all placement coordinators
- Staff photos/initials
- Designation and branch info
- Contact email and phone
- Searchable list

### Year-wise Details (Collapsible)
- Academic year expandable sections
- Quick stats (Total Placed, Companies, Avg Package)
- Branch-wise breakdown table
- Placed/Not Placed/Higher Studies counts

## Dynamic Fields

### Placement Staff
- Custom designation tracking
- Branch-wise assignment
- Phone and office phone numbers
- Professional qualifications and experience
- Research interests and publications
- Social media links (JSON)

### Placement Statistics
- Category-based (UG/PG)
- Comprehensive package information
- Multiple academic years

### Placement Details
- Branch-specific data
- Student outcome tracking
- Higher studies path tracking

## Authentication Flow

1. User enters email and password on login page
2. API validates credentials against `placement_staff` table
3. Password is hashed using SHA-256
4. Token generated and stored in localStorage
5. User data stored in localStorage
6. Redirected to dashboard on success
7. Dashboard checks localStorage on mount
8. If no token, redirects back to login

## Styling & Design

- **Color Scheme:**
  - Orange/Red gradients for main branding
  - Blue for secondary elements
  - Gradient backgrounds (slate, orange, red)
  
- **Components:**
  - shadcn/ui Card, Button, Input components
  - Lucide React icons
  - Tailwind CSS utility classes
  - Responsive grid layouts

## Data Display

### Statistics View
- Pie charts legend with all branches (CE, ME, EEE, ECE, CST, CSE, etc.)
- Year-wise data comparison
- Category breakdown (UG/PG)

### Staff Table (from images)
- S.No, Name, Designation, Branch, Email columns
- 7 staff members listed (Head + 6 coordinators)
- Department-wise assignments

## Next Steps / Enhancements

1. Add placement company showcase section
2. Implement photo uploads for staff profiles
3. Create admin panel for staff management
4. Add editing capabilities for statistics
5. Generate PDF reports
6. Email notifications for placements
7. Student portal for job applications
8. Analytics dashboards

## Troubleshooting

### Login Issues
- Check database connection
- Verify email/password in database
- Check localStorage permissions

### Data Not Loading
- Verify API endpoints are accessible
- Check database has seed data
- Check network tab in DevTools

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check shadcn/ui components are installed
- Verify lucide-react icons are available

## Environment Variables

Required in `.env.local`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=svecedu
```

## Support

For issues or questions, contact placement cell at:
- Email: svectpo@srivasaviengg.ac.in
- Phone: 9849511367
