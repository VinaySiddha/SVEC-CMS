# EEE Faculty Research Modules - Quick Reference Guide

## 🎯 What Are These Modules?

These 8 modules allow EEE faculty to showcase their research and professional achievements in their admin dashboard and faculty profile:

### Module List

| # | Module Name | Purpose | Table |
|---|---|---|---|
| 1 | **Research Verticals** | Categorize research areas (Power Systems, Power Electronics, Electrical Vehicles) | `eee_research_verticals` |
| 2 | **Research Supervisor** | Track scholars under supervision | `eee_research_supervisors` |
| 3 | **Journal Publications** | Academic publications in journals | `eee_journal_publications` |
| 4 | **Conference Publications** | Papers presented at conferences | `eee_conference_publications` |
| 5 | **Patents** | Patent applications and grants | `eee_patents` |
| 6 | **Book Publications** | Authored or co-authored books | `eee_book_publications` |
| 7 | **Career Advancements** | Higher education pursuits (Ph.D., M.Tech) | `eee_career_advancements` |
| 8 | **Interaction with Outside World** | External engagement (seminars, workshops, visits) | `eee_interaction_outside_world` |

## 📋 How It Works

### For Faculty (Admin Dashboard)

1. **Select Modules**
   ```
   Admin Dashboard → Faculty Research → Select Modules
   Choose which modules to display in your profile
   ```

2. **Add Data**
   ```
   For each selected module, add entries:
   - Fill in required fields
   - Upload supporting documents
   - Save data
   ```

3. **Display on Profile**
   ```
   Faculty Profile Page shows only selected modules
   Visitors see your research achievements
   ```

### For Administrators

1. **Configuration** - Already done in `src/config/module-fields.ts`
2. **Database** - Run SQL schema from `src/db/schema/faculty_research_modules.sql`
3. **API Routes** - Create route handlers in `src/app/api/admin/eee/{module-name}/`
4. **Components** - Use provided components for display

## 🗂️ Database Tables

### Core Module Tables

```sql
-- 1. Research Verticals
eee_research_verticals
├── id
├── faculty_id
├── vertical_name
├── description
├── is_active
└── timestamps

-- 2. Research Supervisors
eee_research_supervisors
├── id
├── supervisor_id (faculty_id)
├── scholar_name
├── status (On Going/Completed)
├── proof_document
└── timestamps

-- 3. Journal Publications
eee_journal_publications
├── id
├── faculty_id
├── journal_name
├── paper_title
├── publication_year
├── volume_number
├── issue_number
├── page_numbers
├── doi
├── impact_factor
├── proof_document
└── timestamps

-- (Similar structure for other modules)
```

### Module Selection Table

```sql
eee_faculty_module_selection
├── id
├── faculty_id (UNIQUE)
├── selected_modules (JSON array)
└── last_updated
```

## 💾 File Locations

### Configuration
```
src/config/module-fields.ts          (Field definitions)
src/types/facultyModules.ts          (Type definitions)
src/db/schema/                        (Database schemas)
```

### Components
```
src/components/ResearchModuleSelection.tsx       (Module selection UI)
src/components/ResearchDataDisplay.tsx           (Data display components)
```

### API Routes (To be created)
```
src/app/api/admin/eee/research-verticals/
src/app/api/admin/eee/research-supervisors/
src/app/api/admin/eee/journal-publications/
src/app/api/admin/eee/conference-publications/
src/app/api/admin/eee/patents/
src/app/api/admin/eee/book-publications/
src/app/api/admin/eee/career-advancements/
src/app/api/admin/eee/interaction-outside-world/
src/app/api/admin/eee/faculty-module-selection/  (✅ Created)
```

## 🚀 Implementation Checklist

### Database Setup
- [ ] Run SQL schema to create tables
- [ ] Verify all 9 tables are created
- [ ] Test database connection

### API Routes
- [ ] Create research-verticals route
- [ ] Create research-supervisors route
- [ ] Create journal-publications route
- [ ] Create conference-publications route
- [ ] Create patents route
- [ ] Create book-publications route
- [ ] Create career-advancements route
- [ ] Create interaction-outside-world route
- [ ] ✅ Faculty module-selection route (created)

### Admin Dashboard Integration
- [ ] Add module selection component to faculty page
- [ ] Connect module selection to save/load functionality
- [ ] Display form fields based on selected modules
- [ ] Implement CRUD operations

### Faculty Profile Display
- [ ] Fetch faculty's selected modules
- [ ] Query data for each module
- [ ] Display using data display components
- [ ] Ensure mobile responsive design

## 📌 Key Features

### Module Selection Component
```tsx
<ResearchModuleSelection
  facultyId={5}
  onSelectionChange={(modules) => console.log(modules)}
  onSave={async (modules) => { /* save */ }}
/>
```

**Features:**
- ✅ Checkbox selection
- ✅ Select All / Clear All
- ✅ Module count
- ✅ Save functionality
- ✅ Visual feedback

### Display Components

```tsx
// All components available from ResearchDataDisplay.tsx

<ResearchVerticalsDisplay data={verticals} />
<ResearchSupervisorsDisplay data={supervisors} />
<JournalPublicationsDisplay data={journals} />
<ConferencePublicationsDisplay data={conferences} />
<PatentsDisplay data={patents} />
<BookPublicationsDisplay data={books} />
<CareerAdvancementsDisplay data={careers} />
<InteractionOutsideWorldDisplay data={interactions} />
```

## 🔌 API Examples

### Get Faculty Modules
```bash
GET /api/admin/eee/faculty-module-selection?faculty_id=5

Response:
{
  "success": true,
  "data": {
    "faculty_id": 5,
    "selected_modules": [
      "research_verticals",
      "journal_publications",
      "patents"
    ]
  }
}
```

### Save Module Selection
```bash
POST /api/admin/eee/faculty-module-selection

Body:
{
  "faculty_id": 5,
  "selected_modules": [
    "research_verticals",
    "journal_publications",
    "patents",
    "conference_publications"
  ]
}
```

### Create Research Vertical
```bash
POST /api/admin/eee/research-verticals

Body:
{
  "faculty_id": 5,
  "vertical_name": "Power Systems",
  "description": "Research in power generation and distribution"
}
```

## 🎨 UI/UX Guidelines

### Module Selection Screen
- Show all 8 modules with checkboxes
- Display current selection count
- Quick action buttons (Select All, Clear All)
- Save button at bottom

### Admin Form
- Show only fields for selected modules
- Use field configurations from module-fields.ts
- Support file uploads with preview
- Validation before save

### Display/Profile Page
- Show sections only for selected modules
- Use responsive grid layouts
- Color-coded status badges
- Expandable/collapsible sections

## 🔐 Security Considerations

- ✅ Validate all inputs before database insert
- ✅ Sanitize file uploads
- ✅ Check faculty_id ownership before update
- ✅ Implement proper authentication
- ✅ Use parameterized queries (SQL injection prevention)
- ✅ Rate limit API endpoints
- ✅ Validate file MIME types

## 📊 Data Validation Rules

| Module | Key Validation |
|--------|---|
| Research Verticals | Name required, max 100 chars |
| Research Supervisors | Scholar name required, status required |
| Journal Publications | Title required, journal required |
| Conference Publications | Title required, conference required |
| Patents | Title required, inventor names required |
| Book Publications | Title required, authors required |
| Career Advancements | Institute required, degree required |
| Interaction Outside World | Title required, type required |

## 🐛 Troubleshooting

### Issue: "Table not found" error
```
Solution: Run SQL schema to create tables
mysql -u root -p svec_cms < src/db/schema/faculty_research_modules.sql
```

### Issue: Module selection not saving
```
Solution: Check faculty_module_selection API endpoint
- Verify endpoint is created
- Check database connection
- Verify table exists
```

### Issue: Modules not displaying
```
Solution: Verify selection is saved
1. Check faculty_module_selection table
2. Verify module data exists in respective table
3. Check display component logic
```

### Issue: File upload fails
```
Solution: Check upload configuration
- File size < 1MB
- Format: PDF, DOC, DOCX, JPG, PNG
- Upload directory permissions
```

## 📱 Module-Specific Notes

### Research Verticals
- Can have multiple areas per vertical
- Use for organizing research portfolio
- Example: "Power Systems" → High Voltage, Transmission, etc.

### Journal Publications
- Track impact factor for ranking
- Support DOI for linking
- Searchable by title, journal, year

### Patents
- Track application → published → granted status
- Document filing and publication dates
- Show patent number when available

### Career Advancements
- Track ongoing and completed degrees
- Useful for Ph.D. pursuits
- Display enrollment and completion dates

### Interaction Outside World
- Diverse types of engagement
- Track participant count for events
- Location-based filtering

## 🎯 Next Steps

1. **Run Database Schema**
   ```bash
   mysql -u root -p svec_cms < src/db/schema/faculty_research_modules.sql
   ```

2. **Create API Routes**
   - Copy template from research-verticals/route.ts
   - Adapt for each module
   - Test with Postman/curl

3. **Integrate Components**
   - Add ResearchModuleSelection to admin page
   - Use data display components for profiles

4. **Test Thoroughly**
   - Test module selection save/load
   - Test CRUD operations for each module
   - Test file uploads
   - Test responsive design

5. **Deploy**
   - Backup database
   - Run migrations
   - Test in production
   - Monitor logs

## 📞 Support Resources

- **Documentation**: EEE_RESEARCH_MODULES_IMPLEMENTATION_GUIDE.md
- **Types**: src/types/facultyModules.ts
- **Config**: src/config/module-fields.ts
- **Sample Route**: src/app/api/admin/eee/research-verticals/route.ts

---

**Version**: 1.0  
**Last Updated**: January 2, 2026  
**Department**: EEE (Electrical & Electronics Engineering)
