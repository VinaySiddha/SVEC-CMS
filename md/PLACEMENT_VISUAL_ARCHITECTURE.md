# 🎨 PLACEMENT SYSTEM - VISUAL ARCHITECTURE GUIDE

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PLACEMENT PORTAL                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐        ┌──────────────────┐           │
│  │  LOGIN PAGE      │   →    │  DASHBOARD       │           │
│  │                  │        │                  │           │
│  │ • Email input    │        │ • Header         │           │
│  │ • Password input │        │ • Stats Cards    │           │
│  │ • Eye toggle     │        │ • Staff Grid     │           │
│  │ • Demo creds     │        │ • Year Details   │           │
│  │ • Error msg      │        │ • Tables         │           │
│  │ • Loading state  │        │ • Search Box     │           │
│  └──────────────────┘        └──────────────────┘           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (5 Routes)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────┐  ┌──────┐ │
│  │   AUTH      │  │  STAFF   │  │  STATS      │  │DETAIL│ │
│  │   /login    │  │  /staff  │  │ /statistics │  │/deta │ │
│  │   POST      │  │ GET/POST │  │  GET/POST   │  │GET/P │ │
│  └─────────────┘  └──────────┘  └─────────────┘  └──────┘ │
│        ↓               ↓              ↓              ↓      │
│   Validate      Get/Create      Get/Create      Get/Create │
│   Password      Staff Data      Stats Data      Details     │
│                                                               │
│                    ┌──────────────┐                         │
│                    │  COMPANIES   │                         │
│                    │ /companies   │                         │
│                    │  GET/POST    │                         │
│                    │      ↓       │                         │
│                    │  Get/Create  │                         │
│                    │  Companies   │                         │
│                    └──────────────┘                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE LAYER (5 Tables)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐    │
│  │ STAFF        │  │ STATISTICS    │  │ DETAILS      │    │
│  │ • 8 members  │  │ • 6 entries   │  │ • 11 entries │    │
│  │ • Email/Pass │  │ • Year/Category│ │ • Branch     │    │
│  │ • Desig/Dep  │  │ • Packages    │  │ • Placed Cnt │    │
│  │ • Contact    │  │ • Companies   │  │ • Not Placed │    │
│  │ • JSON Data  │  │ • JSON Data   │  │ • Studies    │    │
│  └──────────────┘  └───────────────┘  └──────────────┘    │
│         ↓                   ↓                   ↓            │
│  placement_staff    placement_statistics  placement_details │
│                                                               │
│  ┌──────────────┐  ┌───────────────┐                       │
│  │ COMPANIES    │  │ PROFILE       │                       │
│  │ • 4 entries  │  │ • 1 entry     │                       │
│  │ • Name/Logo  │  │ • College inf │                       │
│  │ • Year       │  │ • Vision/Miss │                       │
│  │ • Industry   │  │ • Contact     │                       │
│  └──────────────┘  └───────────────┘                       │
│         ↓                   ↓                                │
│  placement_companies    placement_profile                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
USER LOGS IN
    ↓
┌─────────────────────┐
│ Login Page Form     │
│ Email + Password    │
└─────────────────────┘
    ↓ POST
┌─────────────────────────────┐
│ /api/placement/auth/login   │
│ Validate email/password     │
│ Hash password with SHA-256  │
│ Query placement_staff table │
└─────────────────────────────┘
    ↓ (Success)
┌─────────────────────┐
│ Generate Token      │
│ Create Response     │
│ Return user data    │
└─────────────────────┘
    ↓
┌──────────────────────────────┐
│ Store in localStorage        │
│ token: "64-char-hex..."     │
│ user: {id, name, etc}       │
└──────────────────────────────┘
    ↓
┌──────────────────────────────┐
│ Redirect to Dashboard        │
│ /placement/dashboard         │
└──────────────────────────────┘
    ↓
┌──────────────────────────────┐
│ Dashboard Mount              │
│ Check localStorage           │
│ Fetch parallel APIs:         │
│ • /api/placement/staff      │
│ • /api/placement/statistics │
│ • /api/placement/details    │
└──────────────────────────────┘
    ↓
┌──────────────────────────────┐
│ Render Components            │
│ Staff Grid                   │
│ Stats Cards                  │
│ Collapsible Sections         │
│ Branch Tables                │
└──────────────────────────────┘
    ↓
┌──────────────────────────────┐
│ Display Dashboard            │
│ Ready for user interaction   │
└──────────────────────────────┘
```

---

## 🎨 UI Component Layout

```
LOGIN PAGE
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                      [Logo]                                 │
│                 PLACEMENT PORTAL                            │
│              Sri Vasavi Engineering College                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                                       │ │
│  │  Staff Login                                         │ │
│  │  Enter your credentials to access the dashboard      │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ Error Alert (if any)                           │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  Email Address                                        │ │
│  │  [________________________]                            │ │
│  │                                                       │ │
│  │  Password                                             │ │
│  │  [_______________________] [👁]                       │ │
│  │                                                       │ │
│  │  [SIGN IN] (Loading state with spinner)              │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ Demo Credentials                               │ │ │
│  │  │ Email: admin@placement.college                 │ │ │
│  │  │ Password: password123                          │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Go back to Home                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘


DASHBOARD
═══════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│  [← Back to Home] [🏢]  Placement Cell  Welcome: Dr. Smith  │
│                                         Dept: ME   [Logout]  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STATISTICS OVERVIEW                                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Total Staff      │  │ Years        │  │ Total Places │  │
│  │ 8                │  │ 3            │  │ 1,933        │  │
│  │ Members          │  │ Historical   │  │ All Years    │  │
│  └──────────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ COLLEGE PLACEMENT PROFILE                                   │
├─────────────────────────────────────────────────────────────┤
│ At our college, we don't just prepare students...          │
│                                                             │
│ [+ Edit Profile]                                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PLACEMENT STAFF & COORDINATORS                              │
│                      [Search_________]                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────┐  ┌──────────────────────────┐  │
│  │ [Avatar]              │  │ [Avatar]                 │  │
│  │ Dr. P N V GOPALA      │  │ Mr. T. Dileep           │  │
│  │ Associate Professor   │  │ Placement Officer       │  │
│  │ [ME]                  │  │ [MBA]                   │  │
│  │ Email: svect...ac.in  │  │ Email: place...ac.in    │  │
│  │ Phone: 9849511367     │  │ Phone: ...              │  │
│  └───────────────────────┘  └──────────────────────────┘  │
│                                                             │
│  ┌───────────────────────┐  ┌──────────────────────────┐  │
│  │ [Avatar]              │  │ [Avatar]                 │  │
│  │ Mr. P. Rajesh        │  │ Mr. M. Vinod Kumar      │  │
│  │ CSE Coordinator       │  │ ECE Coordinator         │  │
│  │ [CSE]                 │  │ [ECE]                   │  │
│  │ Email: csep...ac.in   │  │ Email: ecep...ac.in     │  │
│  └───────────────────────┘  └──────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ YEAR-WISE PLACEMENT STATISTICS                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [+] Placement Details of 2024-25                    [▼]    │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ Total Placed │ Companies    │ Avg Package │ Highest  │  │
│   │ 678          │ 45           │ ₹6.5 LPA    │ ₹15.2    │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Branch-wise Breakdown                                     │
│   ┌─────────────────────────────────────────────────────┐  │
│   │ Branch │ Placed │ Not Placed │ Higher Studies       │  │
│   │ CSE    │  150   │    10      │      5               │  │
│   │ ECE    │  120   │    15      │      8               │  │
│   │ EEE    │   95   │    12      │      6               │  │
│   │ ME     │  110   │    14      │      7               │  │
│   │ CE     │   85   │    10      │      4               │  │
│   │ AIML   │   67   │     8      │      3               │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│ [+] Placement Details of 2023-24                    [▶]    │
│                                                             │
│ [+] Placement Details of 2022-23                    [▶]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Behavior

### Mobile (< 768px)
```
┌──────────────────┐
│ HEADER           │ (Stacked)
├──────────────────┤
│                  │
│ STATS CARD 1     │ (Full width)
│                  │
├──────────────────┤
│ STATS CARD 2     │ (Full width)
├──────────────────┤
│ STATS CARD 3     │ (Full width)
├──────────────────┤
│ PROFILE SECTION  │ (Full width)
├──────────────────┤
│ STAFF GRID       │
│ ┌──────────────┐ │ (Single column)
│ │ Card 1       │ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ Card 2       │ │
│ └──────────────┘ │
└──────────────────┘
```

### Tablet (768px - 1024px)
```
┌────────────────────────────┐
│ HEADER                     │
├────────────────────────────┤
│ STATS 1  │ STATS 2 │ STT 3 │ (3 cols)
├────────────────────────────┤
│ PROFILE SECTION            │
├────────────────────────────┤
│ STAFF GRID                 │
│ ┌────────────┐ ┌─────────┐│ (2 columns)
│ │ Card 1     │ │ Card 2  ││
│ └────────────┘ └─────────┘│
│ ┌────────────┐ ┌─────────┐│
│ │ Card 3     │ │ Card 4  ││
│ └────────────┘ └─────────┘│
└────────────────────────────┘
```

### Desktop (> 1024px)
```
┌──────────────────────────────────────┐
│ HEADER (Full width with spacing)     │
├──────────────────────────────────────┤
│ ST.1  │ ST.2  │ ST.3  │ ST.4  │ ST.5 │ (Auto grid)
├──────────────────────────────────────┤
│ PROFILE SECTION (Max width 1200px)   │
├──────────────────────────────────────┤
│ STAFF GRID (Auto-fit columns)        │
│ ┌──────────┐ ┌──────────┐ ┌────────┐│
│ │Card 1    │ │Card 2    │ │Card 3  ││
│ └──────────┘ └──────────┘ └────────┘│
│ ┌──────────┐ ┌──────────┐ ┌────────┐│
│ │Card 4    │ │Card 5    │ │Card 6  ││
│ └──────────┘ └──────────┘ └────────┘│
└──────────────────────────────────────┘
```

---

## 🎯 Authentication Flow

```
                          LOGIN PROCESS
                          ═════════════

    User Input Form
         ↓
    ┌─────────────────────┐
    │ Email + Password    │
    └─────────────────────┘
         ↓
    ┌─────────────────────┐
    │ Form Validation     │
    │ • Email format      │
    │ • Password length   │
    └─────────────────────┘
         ↓
    POST /api/placement/auth/login
         ↓
    ┌─────────────────────┐
    │ Database Query      │
    │ SELECT from         │
    │ placement_staff     │
    └─────────────────────┘
         ↓
    ┌─────────────────────┐
    │ Password Validation │
    │ SHA-256 Hashing     │
    │ Compare Hashes      │
    └─────────────────────┘
         ↓ (Success)
    ┌─────────────────────┐
    │ Generate Token      │
    │ 64-char Random Hex  │
    └─────────────────────┘
         ↓
    ┌─────────────────────────────────┐
    │ Return Response                 │
    │ { token, user: {...} }         │
    └─────────────────────────────────┘
         ↓
    ┌──────────────────────────┐
    │ Frontend Stores:         │
    │ • localStorage.token     │
    │ • localStorage.user      │
    └──────────────────────────┘
         ↓
    Redirect to Dashboard
         ↓
    ✅ LOGGED IN
```

---

## 📊 Database Relationships

```
placement_staff
    │
    ├─── (FK) ──→ placement_profile.head_of_placement_id
    │
    └─── (FK) ──→ placement_profile.coordinator_id


placement_statistics
    │
    └─── (Referenced by) ──→ placement_details
                              (academic_year, category)

placement_companies
    │
    └─── (Referenced by) ──→ Dashboard display


placement_profile
    │
    └─── (References) ──→ placement_staff (head, coordinator)
```

---

## 🔐 Security Implementation

```
PASSWORD SECURITY
═════════════════

Plain Text Password
        ↓
    ┌──────────────────┐
    │ SHA-256 Hashing  │
    │ + Random Salt    │
    └──────────────────┘
        ↓
    Hash String
        ↓
    ┌──────────────────┐
    │ Store in DB      │
    │ placement_staff  │
    │ password_hash    │
    └──────────────────┘


LOGIN VALIDATION
════════════════

User enters password
        ↓
    ┌──────────────────┐
    │ SHA-256 Hash it  │
    └──────────────────┘
        ↓
    Get stored hash from DB
        ↓
    ┌──────────────────┐
    │ Compare Hashes   │
    │ (Secure Comparison)
    └──────────────────┘
        ↓
    Match? ✅ YES → Generate Token
           ❌ NO  → Deny Access
```

---

## ✨ Color Scheme

```
Primary Colors:
┌──────────────────────────────────────┐
│  ■ Orange (#FF6B35)  - Main CTA      │
│  ■ Red (#D32F2F)     - Accent        │
└──────────────────────────────────────┘

Secondary Colors:
┌──────────────────────────────────────┐
│  ■ Blue (#1E88E5)    - Links, Info   │
│  ■ Indigo (#3F51B5)  - Depth         │
└──────────────────────────────────────┘

Neutral Colors:
┌──────────────────────────────────────┐
│  ■ Slate (#1E293B)   - Dark BG       │
│  ■ Gray (#6B7280)    - Text          │
│  ■ White (#FFFFFF)   - Cards         │
└──────────────────────────────────────┘

Status Colors:
┌──────────────────────────────────────┐
│  ■ Green (#10B981)   - Success       │
│  ■ Red (#EF4444)     - Errors        │
│  ■ Amber (#F59E0B)   - Warnings      │
└──────────────────────────────────────┘
```

---

**Visual Architecture Complete!** 🎨
