# 🎓 Placement Management System

> A comprehensive placement management system for Sri Vasavi Engineering College with dynamic staff management, placement statistics tracking, and year-wise analysis.

## 📸 System Overview

### Login Page
- Professional dark theme with gradient background
- Email/password authentication
- Show/hide password toggle
- Demo credentials display for quick testing
- Error handling and validation

### Placement Dashboard
- **Staff Management:** Display all placement coordinators with search
- **Statistics Overview:** Quick stats on placements
- **Year-wise Reports:** Collapsible sections with detailed breakdown
- **Branch Details:** Table showing placed/not placed/higher studies by department
- **Company Tracking:** Management of visiting companies

## 🗄️ Database Architecture

### 5 Core Tables

#### 1. placement_staff
```sql
- id, name, designation, branch
- email, phone, office_phone
- password_hash (SHA-256 encrypted)
- photo_url, qualifications, experience
- research_interests, publications
- social_media_links (JSON)
- is_active, timestamps, soft delete
```

#### 2. placement_statistics
```sql
- id, academic_year, category (UG/PG)
- total_placed, average_package
- highest_package, lowest_package
- companies_visited
- timestamps, soft delete
```

#### 3. placement_details
```sql
- id, academic_year, branch, category
- placed, not_placed, higher_studies
- timestamps, soft delete
```

#### 4. placement_companies
```sql
- id, name, logo_url
- category, industry, visit_year
- is_active, timestamps, soft delete
```

#### 5. placement_profile
```sql
- id, college_name, placement_heading
- head_of_placement_id (FK)
- coordinator_id (FK)
- description, vision, mission
- contact info, social media links
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MySQL/MariaDB running
- `.env.local` configured with database credentials

### Installation

#### 1. Create Database Schema
```bash
cd migrations
node migrate-placement-schema.js
```

Output:
```
✓ Created placement_staff table
✓ Created placement_statistics table
✓ Created placement_details table
✓ Created placement_companies table
✓ Created placement_profile table
✓ All placement tables created successfully!
```

#### 2. Seed Sample Data
```bash
node seed-placement-data.js
```

Sample data includes:
- 8 placement staff members (1 head + 7 coordinators)
- Placement statistics for 3 academic years (2024-25, 2023-24, 2022-23)
- Branch-wise details (CSE, ECE, EEE, ME, CE, AIML, AIML)
- 4 sample companies

#### 3. Start Application
```bash
npm run dev
# or
yarn dev
```

#### 4. Access the System
- **Login:** http://localhost:3000/placement/auth/login
- **Dashboard:** http://localhost:3000/placement/dashboard

## 🔐 Authentication

### Login Credentials (Demo)

| Role | Email | Password |
|------|-------|----------|
| Head of Placements | svectpo@srivasaviengg.ac.in | password123 |
| MBA Placement Officer | placements@srivasaviengg.ac.in | password123 |
| CSE Co-ordinator | cseplacements@srivasaviengg.ac.in | password123 |

### Authentication Flow

```
User Input
    ↓
Validate Email Format
    ↓
Query placement_staff Table
    ↓
Compare SHA-256 Hashed Password
    ↓
Generate Token (random 64-char hex)
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
```

## 📊 Dashboard Features

### 1. Header Section
- Back to Home navigation link
- Welcome message with staff name
- Department/branch display
- Logout button with redirect

### 2. Statistics Cards
Three key metrics displayed:
- **Total Staff Members:** Count of active placement staff
- **Statistics Years:** Number of academic years with data
- **Total Placements:** Sum of all placements across all years

### 3. Placement Staff Section
- Grid layout (responsive: 1 col mobile, 2 cols tablet, auto desktop)
- Staff cards with:
  - Name and role
  - Department/branch badge
  - Email (clickable mailto)
  - Phone number
  - Search functionality
- Beautiful gradient styling

### 4. College Profile Section
- Placement heading/mission statement
- Edit button (placeholder for admin functionality)
- Inspirational text about career preparation

### 5. Year-wise Placement Details (Collapsible)
For each academic year:
- **Quick Stats:**
  - Total placed count
  - Number of companies
  - Average package
  - Highest package
  
- **Branch-wise Table:**
  - Shows each department
  - Number placed, not placed, higher studies
  - Color-coded for quick reading

### 6. Companies Section
- Track visiting companies
- Filter by year (future enhancement)
- Company logos and details

## 🎯 API Endpoints

### Authentication
```
POST /api/placement/auth/login
Request: { email, password }
Response: { token, user: { id, name, designation, branch } }
```

### Staff Management
```
GET /api/placement/staff
Response: Array of staff objects

POST /api/placement/staff
Request: { name, designation, branch, email, phone, password_hash }
Response: { success, id, message }
```

### Statistics
```
GET /api/placement/statistics
Response: Array of stats with academic_year, category, totals

POST /api/placement/statistics
Request: { academic_year, category, total_placed, avg_package, ... }
Response: { success, message }
```

### Placement Details
```
GET /api/placement/details
Response: Array of branch-wise details

POST /api/placement/details
Request: { academic_year, branch, category, placed, not_placed, higher_studies }
Response: { success, message }
```

### Companies
```
GET /api/placement/companies
GET /api/placement/companies?year=2024

POST /api/placement/companies
Request: { name, logo_url, category, industry, visit_year }
Response: { success, id, message }
```

## 🎨 Design System

### Color Palette
- **Primary:** Orange/Red gradients (for placements)
- **Secondary:** Blue/Indigo (for accents)
- **Neutral:** Gray/Slate (for backgrounds and text)

### Components Used
- **shadcn/ui:** Card, Button, Input, Label
- **lucide-react:** Icons for visual hierarchy
- **Tailwind CSS:** Utility-first responsive styling

### Typography
- **Headings:** Bold, large sizes (3xl-4xl)
- **Body:** Regular weight, clear hierarchy
- **Labels:** Medium weight, gray tone

### Spacing & Layout
- Grid-based layout system
- Responsive breakpoints (mobile, tablet, desktop)
- Consistent padding and margins
- Card-based UI components

## 📋 File Structure

```
placement-system/
├── src/
│   ├── app/
│   │   ├── placement/
│   │   │   ├── auth/
│   │   │   │   └── login/
│   │   │   │       └── page.tsx          (880 lines)
│   │   │   └── dashboard/
│   │   │       └── page.tsx              (580 lines)
│   │   └── api/
│   │       └── placement/
│   │           ├── auth/
│   │           │   └── login/
│   │           │       └── route.ts      (55 lines)
│   │           ├── staff/
│   │           │   └── route.ts          (45 lines)
│   │           ├── statistics/
│   │           │   └── route.ts          (50 lines)
│   │           ├── details/
│   │           │   └── route.ts          (50 lines)
│   │           └── companies/
│   │               └── route.ts          (50 lines)
│   └── lib/
│       └── db.ts                         (existing database module)
├── migrations/
│   ├── migrate-placement-schema.js       (150 lines)
│   └── seed-placement-data.js            (200 lines)
├── md/
│   ├── PLACEMENT_SYSTEM_SETUP.md         (Complete setup guide)
│   └── PLACEMENT_QUICK_START.md          (Quick reference)
└── docs/
    └── (Referenced in README)

Total: 10 files created/configured
```

## 🔄 Data Flow

### Login Flow
```
Login Page Form
    ↓
POST /api/placement/auth/login
    ↓
Database Query & Password Validation
    ↓
Generate & Return Token
    ↓
Store in localStorage
    ↓
Redirect to Dashboard
```

### Dashboard Data Flow
```
Dashboard Mount
    ↓
Check localStorage for token
    ↓
Fetch /api/placement/staff
Fetch /api/placement/statistics
Fetch /api/placement/details
(Parallel API calls)
    ↓
Store in Component State
    ↓
Render Dynamic Components
```

## 📱 Responsive Behavior

### Mobile (< 768px)
- Single column layouts
- Full-width cards
- Stacked navigation
- Touch-friendly buttons

### Tablet (768px - 1024px)
- 2-column grids
- Optimized spacing
- Adjusted padding

### Desktop (> 1024px)
- 3-column layouts
- Full spacing
- Enhanced hover effects

## 🔒 Security Features

### Password Security
- SHA-256 hashing
- No plain text storage
- Secure comparison

### Session Management
- Token-based authentication
- localStorage persistence
- Logout clears tokens

### Data Protection
- Soft deletes (deleted_at field)
- Active status tracking
- Timestamp auditing

## 🚀 Performance Optimizations

### Database
- Indexed columns (email, branch, deleted_at)
- Efficient queries
- Foreign key relationships

### Frontend
- Lazy loading components
- Search filtering
- Responsive images

### API
- Fast response times
- Efficient data fetching
- Error handling

## 📈 Future Enhancements

1. **Admin Panel**
   - Edit staff information
   - Update placement statistics
   - Manage companies

2. **Advanced Analytics**
   - Dashboard charts
   - Trend analysis
   - Year-over-year comparison

3. **Notifications**
   - Email alerts
   - SMS notifications
   - Dashboard notifications

4. **Student Portal**
   - Job applications
   - Profile management
   - Placement tracking

5. **Reporting**
   - PDF reports
   - Export functionality
   - Custom date ranges

6. **Integration**
   - LinkedIn sync
   - Email automation
   - Calendar integration

## 🛠️ Troubleshooting

### Database Connection Issues
```
Error: Cannot find module 'mysql2/promise'
Solution: npm install mysql2
```

### Login Not Working
- Check `.env.local` database credentials
- Verify seed data was executed
- Clear browser localStorage

### API Errors
- Check network tab in DevTools
- Verify API endpoints are correct
- Review console for error messages

### Styling Issues
- Ensure Tailwind CSS is configured
- Check shadcn/ui components installed
- Verify lucide-react is installed

## 📞 Support & Contact

**Placement Cell - Sri Vasavi Engineering College**
- Email: svectpo@srivasaviengg.ac.in
- Phone: 9849511367
- Office: 08818-284355 (Ext: 319)

## 📄 License

This system is proprietary to Sri Vasavi Engineering College.

---

**Last Updated:** November 2025
**Version:** 1.0
**Status:** Production Ready ✅
