# SVEC-CMS File Structure

This document provides a comprehensive overview of the SVEC-CMS project file structure.

## Root Level Files

```
├── .env                                    # Environment variables (local)
├── .env.example                           # Environment variables template
├── .env.local                             # Local environment overrides
├── .gitignore                             # Git ignore rules
├── .modified                              # Modified files tracker
├── apphosting.yaml                        # App hosting configuration
├── components.json                        # UI components configuration
├── middleware.ts                          # Next.js middleware
├── next.config.ts                         # Next.js configuration
├── next-env.d.ts                          # Next.js TypeScript declarations
├── package.json                           # NPM package configuration
├── package-lock.json                      # NPM package lock file
├── postcss.config.mjs                     # PostCSS configuration
├── README.md                              # Project documentation
├── schema.sql                             # Database schema
├── setup-package.json                     # Setup package configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
├── tsconfig.json                          # TypeScript configuration
├── update_schema.sql                      # Schema update script
├── update_tables.sql                      # Table update script
├── update-department-sidebars.md          # Department sidebar updates
└── wrangler.toml                          # Cloudflare Workers configuration
```

## SQL Files (Database Setup)

```
├── create_faculty_achievements_table.sql
├── create_fdp_table.sql
├── create_labs_table.sql
├── create_organized_events_table.sql
├── create_placements_tables.sql
├── create_student_achievements_table.sql
├── create_workshops_table.sql
├── fixed_create_fdp_table.sql
├── fixed_create_organized_events_table.sql
└── run_placement_tables_setup.sql
```

## IDX Configuration

```
├── .idx/
│   ├── dev.nix                            # Nix development environment
│   └── icon.png                           # Project icon
```

## Department Templates

```
├── dept/
│   ├── aiml (1).html                      # AIML department template
│   └── ds.html                            # Data Science department template
```

## Documentation

```
├── docs/
│   └── blueprint.md                       # Project blueprint
```

## Public Assets

```
├── public/
│   ├── a_logo/                            # Accreditation logos
│   │   ├── aicte.png
│   │   ├── jntuk.png
│   │   ├── naac.png
│   │   └── nba.png
│   ├── uploads/                           # Upload directories
│   │   ├── placement-gallery/
│   │   └── placements/
│   ├── aihod.jpg                          # HOD photos
│   ├── bshhod.jpg
│   ├── civilhod.png
│   ├── cse_hod1.jpeg
│   ├── ecehod.jpg
│   ├── eeehod.jpg
│   ├── mbaHosd1.jpeg
│   ├── mechhod.jpg
│   ├── coe.jpg                            # Administrative staff photos
│   ├── naresh.jpeg
│   ├── presi.jpg
│   ├── president.png
│   ├── principal.jpg
│   ├── rambabu.jpg
│   ├── tech_director.jpg
│   ├── YNS.jpg
│   ├── CollegeBuilding.jpg                # Building photos
│   ├── scre.jpg
│   ├── scre.png
│   ├── svec_big_logo.png                  # College logos
│   └── vasavi_logo.png
```

## Scripts

```
├── scripts/
│   └── hash-password.js                   # Password hashing utility
```

## Source Code

### Main Application Structure

```
├── src/
│   ├── SVEC-CMS.lnk                       # Windows shortcut
│   ├── vite-env.d.ts                      # Vite environment types
│   ├── app/                               # Next.js App Router
│   ├── components/                        # React components
│   ├── content/                           # Content files
│   ├── contexts/                          # React contexts
│   ├── data/                              # Static data files
│   ├── db/                                # Database related files
│   ├── hooks/                             # Custom React hooks
│   ├── lib/                               # Utility libraries
│   ├── migrations/                        # Database migrations
│   ├── pages/                             # Next.js Pages Router (legacy)
│   ├── services/                          # Service layer
│   ├── sql/                               # SQL files
│   ├── types/                             # TypeScript type definitions
│   └── utils/                             # Utility functions
```

### App Router Structure (src/app/)

```
├── app/
│   ├── globals.css                        # Global styles
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── academics/
│   │   └── page.tsx
│   ├── admin/                             # Admin panel
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── classrooms/
│   │   ├── content/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── fdp/
│   │   ├── gallery/
│   │   ├── hackathons/
│   │   ├── industry-news/
│   │   ├── labs/
│   │   ├── login/
│   │   ├── mous/
│   │   ├── organized-events/
│   │   ├── resources/
│   │   ├── setup/
│   │   ├── student-achievements/
│   │   ├── users/
│   │   └── workshops/
│   ├── administration/                    # College administration
│   │   ├── add-faculty-achievement/
│   │   ├── deans/
│   │   ├── director-technical/
│   │   ├── edit-faculty-achievement/
│   │   ├── hod/
│   │   ├── manage-faculty-achievements/
│   │   └── principal/
│   ├── admissions/
│   │   └── page.tsx
│   ├── api/                               # API routes
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── board_of_studies/
│   │   ├── classrooms/
│   │   ├── departments/
│   │   ├── env-check/
│   │   ├── events/
│   │   ├── faculty_profiles/
│   │   ├── faculty-achievements/
│   │   ├── fdp/
│   │   ├── hackathons/
│   │   ├── hash-generator/
│   │   ├── industry-news/
│   │   ├── init/
│   │   ├── labs/
│   │   ├── mous/
│   │   ├── organized-events/
│   │   ├── protected/
│   │   ├── resources/
│   │   ├── setup/
│   │   ├── sql/
│   │   ├── student_research/
│   │   ├── student-achievements/
│   │   ├── syllabus_documents/
│   │   ├── test-board-of-studies/
│   │   ├── test-db/
│   │   ├── test-migrate/
│   │   └── workshops/
│   ├── campus-life/
│   │   └── page.tsx
│   ├── category-b/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── dashboard/                         # User dashboard
│   │   └── departments/
│   ├── departments/                       # Department pages
│   │   ├── page.tsx
│   │   ├── [dept]/                        # ⚠️ CONFLICTING ROUTE
│   │   │   ├── dashboard/
│   │   │   ├── issues/
│   │   │   └── page.tsx
│   │   ├── [deptId]/                      # Main department route
│   │   │   ├── admin/
│   │   │   ├── associations/
│   │   │   ├── dashboard/
│   │   │   ├── events/
│   │   │   ├── fdp/
│   │   │   ├── gallery/
│   │   │   ├── hackathons/
│   │   │   ├── industry-news/
│   │   │   ├── issues/
│   │   │   ├── labs/
│   │   │   ├── mous/
│   │   │   ├── organized-events/
│   │   │   ├── page.tsx
│   │   │   ├── placements/
│   │   │   ├── resources/
│   │   │   ├── scholarships/
│   │   │   ├── student-achievements/
│   │   │   ├── student-associations/
│   │   │   ├── trainings/
│   │   │   └── workshops/
│   │   ├── aiml/
│   │   ├── bsh/
│   │   ├── civil/
│   │   ├── cse/
│   │   ├── cse-ai/
│   │   ├── cse-ds/
│   │   ├── cst/
│   │   ├── ece/
│   │   ├── ect/
│   │   ├── eee/
│   │   ├── faculty-achievements/
│   │   ├── mba/
│   │   └── mech/
│   ├── examinations/
│   ├── grievance/
│   ├── hash-generator/
│   ├── industry-news/
│   ├── infrastructure/
│   ├── labs/
│   ├── library/
│   ├── login/
│   ├── mandates/
│   ├── mous/
│   ├── naac/
│   ├── placements/
│   ├── protected/
│   ├── rd-innovation/
│   ├── test-auth/
│   ├── test-board-of-studies/
│   ├── test-crud/
│   ├── test-faculty/
│   ├── test-module-rules/
│   ├── test-password-reset/
│   └── unauthorized/
```

### API Routes Detailed Structure

```
├── api/
│   ├── departments/
│   │   ├── [dept]/                        # ⚠️ CONFLICTING ROUTE
│   │   │   └── stats/
│   │   ├── [deptId]/                      # Main department API routes
│   │   │   ├── associations/
│   │   │   ├── events/
│   │   │   ├── issues/
│   │   │   ├── placement-gallery/
│   │   │   ├── placements/
│   │   │   ├── scholarships/
│   │   │   ├── stats/
│   │   │   └── trainings/
│   │   ├── industry-news/
│   │   ├── labs/
│   │   └── mous/
```

### Components Structure

```
├── components/
│   ├── achievement/
│   ├── associations/
│   ├── classrooms/
│   ├── department/
│   ├── events/
│   ├── fdp/
│   ├── forms/
│   ├── hackathons/
│   ├── industry-news/
│   ├── labs/
│   ├── lists/
│   ├── mou/
│   ├── organized-events/
│   ├── placements/
│   ├── providers/
│   ├── resources/
│   ├── scholarships/
│   ├── student-achievements/
│   ├── syllabus/
│   ├── trainings/
│   ├── ui/                                # UI components
│   ├── widgets/
│   ├── workshop/
│   ├── workshops/
│   ├── AnimatedSection.tsx
│   ├── AnimatedStat.tsx
│   ├── Carousel.css
│   ├── ChatbotWidget.tsx
│   ├── FixedSidebar.tsx
│   ├── FloatingChatWidgets.tsx
│   ├── Footer.tsx
│   ├── GlobalLoader.tsx
│   ├── Header.tsx
│   ├── Loader.tsx
│   ├── LoadingOverlay.tsx
│   ├── LoadingSpinner.tsx
│   ├── MDVLogo.tsx
│   ├── MDVStudios.tsx
│   ├── MessageBubble.tsx
│   ├── PageTransition.tsx
│   ├── SmoothLink.tsx
│   ├── TypingIndicator.tsx
│   ├── VisitorCounter.tsx
│   └── WhatsAppChatButton.tsx
```

### Pages Router Structure (Legacy - src/pages/)

```
├── pages/
│   ├── _app.tsx                           # App wrapper
│   ├── About.tsx
│   ├── Academics.tsx
│   ├── Admissions.tsx
│   ├── CampusLife.tsx
│   ├── Contact.tsx
│   ├── Departments.tsx
│   ├── Examinations.tsx
│   ├── Grievance.tsx
│   ├── Infrastructure.tsx
│   ├── Library.tsx
│   ├── Mandates.tsx
│   ├── NAAC.tsx
│   ├── Placements.tsx
│   ├── RDInnovation.tsx
│   ├── category.tsx
│   ├── admin/
│   ├── administration/
│   ├── api/                               # API routes (legacy)
│   └── departments/
│       ├── #TODO.txt
│       ├── [deptId]/                      # Department dynamic routes
│       │   ├── handbooks.tsx
│       │   └── library.tsx
│       ├── AIML.tsx
│       ├── BSH.tsx
│       ├── Civil.tsx
│       ├── CSE.tsx
│       ├── CSEAI.tsx
│       ├── CSEDS.tsx
│       ├── CST.tsx
│       ├── ds.tsx
│       ├── ECE.tsx
│       ├── ECT.tsx
│       ├── EEE.tsx
│       ├── Issues.tsx
│       ├── MBA.tsx
│       └── Mechanical.tsx
```

### Library Structure

```
├── lib/
│   ├── auth/
│   ├── db/
│   ├── validation/
│   ├── admin-approvals.ts
│   ├── auth.ts
│   ├── crudFactory.ts
│   ├── db.ts
│   ├── deptRules.ts
│   ├── entityConfig.ts
│   ├── file-storage.ts
│   ├── file-upload.ts
│   ├── firebase.ts
│   ├── module-handler.ts
│   ├── module-schemas.ts
│   ├── s3.ts
│   └── utils.ts
```

### Types Structure

```
├── types/
│   ├── associations.ts
│   ├── events.ts
│   ├── gallery-images.ts
│   ├── hackathons.ts
│   ├── handbooks.ts
│   ├── issues.ts
│   ├── library-resources.ts
│   ├── resources.ts
│   └── trainings.ts
```

### Utils Structure

```
├── utils/
│   ├── association-utils.ts
│   ├── classroom-utils.ts
│   ├── faculty-achievements-utils.ts
│   ├── fdp-utils.ts
│   ├── file-upload.ts
│   ├── industry-news-utils.ts
│   ├── issue-utils.ts
│   ├── lab-utils.ts
│   ├── mou-utils.ts
│   ├── organized-events-utils.ts
│   ├── scholarship-utils.ts
│   ├── student-achievements-utils.ts
│   ├── syllabus-utils.ts
│   ├── training-utils.ts
│   └── workshops-utils.ts
```

## ⚠️ Known Issues

### Route Conflicts
The project currently has conflicting dynamic routes that are causing build errors:

1. **App Router Conflict:**
   - `src/app/departments/[dept]/` (empty/conflicting)
   - `src/app/departments/[deptId]/` (main implementation)

2. **API Route Conflict:**
   - `src/app/api/departments/[dept]/`
   - `src/app/api/departments/[deptId]/`

### Resolution Required
- Remove or rename the `[dept]` routes to use consistent `[deptId]` naming
- Update any component props that reference `dept` to use `deptId`
- Clear build cache and restart development server

## Project Statistics

- **Total Files:** ~400+ files
- **Languages:** TypeScript, JavaScript, SQL, CSS, HTML
- **Framework:** Next.js 15.3.3 with App Router
- **UI Library:** Custom UI components with Tailwind CSS
- **Database:** SQL-based (schema files included)
- **Authentication:** JWT-based with middleware
- **File Upload:** Multiple upload directories and utilities

## Architecture Notes

This is a College Management System (CMS) for SVEC with:
- Modern Next.js App Router architecture
- Legacy Pages Router support (migration in progress)
- Department-wise content management
- Admin panel for content administration
- Authentication and authorization
- File upload and gallery management
- Database-driven content
- Responsive UI with Tailwind CSS
