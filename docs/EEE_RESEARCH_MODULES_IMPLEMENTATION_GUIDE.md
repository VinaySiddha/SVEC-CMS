# EEE Faculty Research Modules - Implementation Guide

## Overview
This document provides complete implementation details for integrating 8 research modules into the EEE admin dashboard and faculty profile display system.

## Modules Overview

### 1. Research Verticals
- **Purpose**: Categorize faculty research into different areas (Power Systems, Power Electronics, Electrical Vehicles, etc.)
- **Table**: `eee_research_verticals`
- **Key Fields**: vertical_name, description, faculty_members
- **Usage**: Display research focus areas

### 2. Research Supervisor
- **Purpose**: Track faculty supervision of research scholars
- **Table**: `eee_research_supervisors`
- **Key Fields**: scholar_name, status (On Going/Completed), proof_document
- **Usage**: Document research mentorship activities

### 3. Journal Publications
- **Purpose**: Record academic publications in peer-reviewed journals
- **Table**: `eee_journal_publications`
- **Key Fields**: journal_name, paper_title, publication_year, volume, issue, DOI, impact_factor
- **Usage**: Display scholarly publications

### 4. Conference Publications
- **Purpose**: Track papers presented at academic conferences
- **Table**: `eee_conference_publications`
- **Key Fields**: faculty_names, paper_title, conference_name, conference_location, publication_year
- **Usage**: Showcase conference presentations

### 5. Patents
- **Purpose**: Document patent applications and grants
- **Table**: `eee_patents`
- **Key Fields**: inventor_names, patent_title, patent_number, status (Applied/Published/Granted), filing_date
- **Usage**: Highlight inventions and intellectual property

### 6. Book Publications
- **Purpose**: Record authored or co-authored books
- **Table**: `eee_book_publications`
- **Key Fields**: book_title, authors, publisher_name, ISBN, publication_year
- **Usage**: Display published books

### 7. Career Advancements
- **Purpose**: Track faculty higher education pursuits
- **Table**: `eee_career_advancements`
- **Key Fields**: institute_name, degree_pursuing, joining_date, completion_date, degree_status
- **Usage**: Document ongoing or completed degrees

### 8. Interaction with Outside World
- **Purpose**: Record external engagement and collaborations
- **Table**: `eee_interaction_outside_world`
- **Key Fields**: interaction_type, title, organization_name, interaction_date, location, participants_count
- **Types**: Seminar, Workshop, Industrial Visit, Guest Lecture, Collaboration, Conference, Other
- **Usage**: Showcase faculty outreach and engagement

## Database Setup

### 1. Create Tables
Execute the SQL schema:
```bash
mysql -u root -p svec_cms < src/db/schema/faculty_research_modules.sql
```

### 2. Verify Tables
```sql
SHOW TABLES LIKE 'eee_%';
SELECT * FROM eee_research_verticals;
SELECT * FROM eee_research_supervisors;
-- etc.
```

## Frontend Implementation

### 1. Module Selection Component
**File**: `src/components/ResearchModuleSelection.tsx`

```tsx
import ResearchModuleSelection from '@/components/ResearchModuleSelection';

// In your admin page:
<ResearchModuleSelection
  facultyId={currentFacultyId}
  onSelectionChange={(modules) => console.log('Selected:', modules)}
  onSave={async (modules) => {
    // Save to database
  }}
/>
```

**Features**:
- Checkbox selection for all 8 modules
- Select All / Clear All buttons
- Module count display
- Save functionality

### 2. Data Display Components
**File**: `src/components/ResearchDataDisplay.tsx`

Available components:
- `ResearchVerticalsDisplay` - Grid view of research areas
- `ResearchSupervisorsDisplay` - Table with scholar status
- `JournalPublicationsDisplay` - Detailed publication cards
- `ConferencePublicationsDisplay` - Conference paper details
- `PatentsDisplay` - Patent information table
- `BookPublicationsDisplay` - Books table
- `CareerAdvancementsDisplay` - Education tracking table
- `InteractionOutsideWorldDisplay` - Engagement cards

**Usage Example**:
```tsx
import {
  ResearchVerticalsDisplay,
  JournalPublicationsDisplay,
  PatentsDisplay,
} from '@/components/ResearchDataDisplay';

// Display selected modules
{selectedModules.includes('research_verticals') && (
  <ResearchVerticalsDisplay data={verticalData} />
)}
{selectedModules.includes('journal_publications') && (
  <JournalPublicationsDisplay data={journalData} />
)}
```

## API Routes

### 1. Research Verticals API
**File**: `src/app/api/admin/eee/research-verticals/route.ts`

```typescript
// GET - Fetch all verticals
GET /api/admin/eee/research-verticals

// POST - Create vertical
POST /api/admin/eee/research-verticals
{
  "faculty_id": 1,
  "vertical_name": "Power Systems",
  "description": "Research in high voltage..."
}

// PUT - Update vertical
PUT /api/admin/eee/research-verticals
{
  "id": 1,
  "vertical_name": "Updated Name",
  "description": "Updated description"
}

// DELETE - Remove vertical
DELETE /api/admin/eee/research-verticals
{
  "id": 1
}
```

### 2. Create Similar Routes for Other Modules

Create the following route files:
- `src/app/api/admin/eee/research-supervisors/route.ts`
- `src/app/api/admin/eee/journal-publications/route.ts`
- `src/app/api/admin/eee/conference-publications/route.ts`
- `src/app/api/admin/eee/patents/route.ts`
- `src/app/api/admin/eee/book-publications/route.ts`
- `src/app/api/admin/eee/career-advancements/route.ts`
- `src/app/api/admin/eee/interaction-outside-world/route.ts`
- `src/app/api/admin/eee/faculty-module-selection/route.ts`

## Form Field Configuration

All field configurations are in `src/config/module-fields.ts` under the `eee` department:

```typescript
'research-verticals': {
  tableName: 'eee_research_verticals',
  displayField: 'vertical_name',
  fields: [ /* ... */ ]
}

'research-supervisors': {
  tableName: 'eee_research_supervisors',
  displayField: 'scholar_name',
  fields: [ /* ... */ ]
}

// ... other modules
```

## Integration Steps

### Step 1: Database Setup
1. Run the SQL schema file
2. Verify all tables are created

### Step 2: Configuration
1. Field mappings are already in `module-fields.ts`
2. Module types are defined in `types/facultyModules.ts`

### Step 3: API Routes
1. Create route handlers for each module
2. Implement CRUD operations
3. Add proper error handling

### Step 4: Admin Dashboard Integration
1. Add module selection to faculty admin page
2. Use `ResearchModuleSelection` component
3. Display modules based on selection using data display components

### Step 5: Faculty Profile Display
1. Fetch faculty's selected modules
2. Query data for each module
3. Display using corresponding components

## Module Selection System

### Database Table: `faculty_module_selection`
```sql
CREATE TABLE faculty_module_selection (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL UNIQUE,
    selected_modules JSON,
    last_updated TIMESTAMP
);

-- Example data:
{
    "id": 1,
    "faculty_id": 5,
    "selected_modules": [
        "research_verticals",
        "journal_publications",
        "patents",
        "conference_publications"
    ],
    "last_updated": "2024-01-02T10:30:00"
}
```

### API Endpoint: Faculty Module Selection
```typescript
GET /api/admin/eee/faculty-module-selection?faculty_id=5
// Response:
{
    "success": true,
    "data": {
        "faculty_id": 5,
        "selected_modules": ["research_verticals", "journal_publications", ...]
    }
}

POST /api/admin/eee/faculty-module-selection
{
    "faculty_id": 5,
    "selected_modules": ["research_verticals", "journal_publications"]
}
```

## Display Logic

### Admin Dashboard
```typescript
// 1. Load faculty's selected modules
const modules = await fetch(`/api/admin/eee/faculty-module-selection?faculty_id=${id}`);

// 2. Show only selected modules in admin form
// Use field configs to render appropriate fields for each module

// 3. Save data to respective tables
```

### Faculty Profile Page
```typescript
// 1. Get faculty's selected modules
const selection = await fetch(`/api/admin/eee/faculty-module-selection?faculty_id=${id}`);

// 2. Fetch data for each selected module
// 3. Render using data display components
```

## Type Definitions

All types are in `src/types/facultyModules.ts`:

```typescript
enum ModuleType {
  RESEARCH_VERTICALS = 'research_verticals',
  RESEARCH_SUPERVISORS = 'research_supervisors',
  JOURNAL_PUBLICATIONS = 'journal_publications',
  CONFERENCE_PUBLICATIONS = 'conference_publications',
  PATENTS = 'patents',
  BOOK_PUBLICATIONS = 'book_publications',
  CAREER_ADVANCEMENTS = 'career_advancements',
  INTERACTION_OUTSIDE_WORLD = 'interaction_outside_world',
}

interface ModuleSelection {
  facultyId: number;
  selectedModules: ModuleType[];
}
```

## File Uploads

All modules support file uploads for proof documents:
- Supported formats: PDF, DOC, DOCX, JPG, PNG
- Max file size: 1MB
- Storage path: `/uploads/eee/{module_name}/`

## Search and Filters

Each module includes searchable and sortable fields:

```typescript
// Example: Journal Publications
searchableFields: ['paper_title', 'journal_name', 'publication_year']
sortableFields: ['paper_title', 'journal_name', 'publication_year', 'impact_factor', 'created_at']
```

## Validation Rules

### Journal Publications
- Paper title: required, 5-500 characters
- Journal name: required
- Publication year: optional, 4-digit number
- Impact factor: optional, decimal number

### Conference Publications
- Paper title: required
- Conference name: required
- Faculty names: required

### Patents
- Patent title: required
- Inventor names: required
- Status: required (Applied/Published/Granted)

## Common Tasks

### Enable Research Verticals for Faculty
```typescript
// 1. Update module selection
POST /api/admin/eee/faculty-module-selection
{
    "faculty_id": 5,
    "selected_modules": ["research_verticals", "journal_publications"]
}

// 2. Add research vertical
POST /api/admin/eee/research-verticals
{
    "faculty_id": 5,
    "vertical_name": "Power Systems",
    "description": "Research in power generation..."
}
```

### Display Faculty Profile
```typescript
// 1. Get selected modules
const selection = await getModuleSelection(facultyId);

// 2. Fetch data
const verticals = await getResearchVerticals(facultyId);
const journals = await getJournalPublications(facultyId);
const patents = await getPatents(facultyId);

// 3. Render
return (
    <>
        {selection.includes('research_verticals') && 
            <ResearchVerticalsDisplay data={verticals} />}
        {selection.includes('journal_publications') && 
            <JournalPublicationsDisplay data={journals} />}
        {selection.includes('patents') && 
            <PatentsDisplay data={patents} />}
    </>
);
```

## Testing Checklist

- [ ] Database tables created successfully
- [ ] API routes return correct data
- [ ] Module selection saves properly
- [ ] Admin form displays fields correctly
- [ ] File uploads work for all modules
- [ ] Display components render data properly
- [ ] Search and sort functionality works
- [ ] Mobile responsive design
- [ ] Error handling for missing data
- [ ] Proper validation of inputs

## Troubleshooting

### Issue: Table not found
**Solution**: Verify table names match in config and database

### Issue: API returns 500 error
**Solution**: Check database connection and query syntax

### Issue: File upload fails
**Solution**: Verify file size, format, and upload directory permissions

### Issue: Modules not displaying
**Solution**: Confirm module selection is saved in `faculty_module_selection` table

## Performance Considerations

- Implement pagination for large datasets (100+ records)
- Add caching for frequently accessed module lists
- Use database indexes on searchable fields
- Limit JSON file size in `faculty_module_selection`

## Future Enhancements

- Bulk import from CSV
- Advanced filtering and reporting
- Achievement badge system
- Integration with external publication databases
- Mobile app support
- Analytics and statistics dashboard

## Support and Maintenance

For issues or feature requests:
1. Check the troubleshooting section
2. Review database integrity
3. Verify API route implementations
4. Test with sample data
5. Check browser console for errors

---

**Created**: January 2, 2026
**Department**: EEE (Electrical & Electronics Engineering)
**Version**: 1.0
