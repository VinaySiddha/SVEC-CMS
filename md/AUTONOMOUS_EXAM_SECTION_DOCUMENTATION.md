# Autonomous Exam Section - Implementation Guide

## Overview

The Autonomous Exam Section feature provides a dynamic, database-driven system for displaying exam-related information organized by type and degree level. It replaces hardcoded content with flexible, maintainable database entries.

## Table Structure

### `autonomous_exam_section`

```sql
CREATE TABLE autonomous_exam_section (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('examination_rules', 'notifications', 'time_tables', 'results', 'revaluation_results'),
  degree ENUM('UG', 'PG'),
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  link VARCHAR(500),
  posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);
```

### Columns

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT | Primary key, auto-increment |
| `type` | ENUM | Category: `examination_rules`, `notifications`, `time_tables`, `results`, `revaluation_results` |
| `degree` | ENUM | Education level: `UG` (Undergraduate) or `PG` (Postgraduate) |
| `title` | VARCHAR(255) | Display title of the item |
| `content` | LONGTEXT | Full description or content |
| `link` | VARCHAR(500) | Optional URL to PDF or external resource |
| `posted_date` | TIMESTAMP | When the item was posted |
| `created_at` | TIMESTAMP | Database record creation time |
| `updated_at` | TIMESTAMP | Last update timestamp |
| `deleted_at` | TIMESTAMP | Soft delete timestamp (NULL if active) |

## Data Organization

### By Type (Dropdown Name)

The system organizes data into 5 main categories:

1. **Examination Rules** (`examination_rules`)
   - Instructions to candidates
   - Malpractices and punishments
   - Instructions to invigilators
   - Regulations and procedures

2. **Notifications** (`notifications`)
   - Fee notifications
   - Exam schedule changes
   - Important announcements
   - Deadline extensions

3. **Time Tables** (`time_tables`)
   - Semester-wise examination schedules
   - Special exam timetables
   - Revaluation exam schedules

4. **Results** (`results`)
   - Published results
   - Grade cards
   - Merit lists
   - Rank lists

5. **Revaluation Results** (`revaluation_results`)
   - Revaluation status
   - Grade improvements/changes
   - Revaluation notifications

### By Degree Level

- **UG (Undergraduate)**: B.Tech students
- **PG (Postgraduate)**: M.Tech, MBA, and other postgraduate students

## API Endpoint

### Base URL
```
/api/academics/autonomous
```

### GET Request

**Parameters:**
```
?type=examination_rules        // Optional: filter by type
?degree=UG                     // Optional: filter by degree
```

**Example Requests:**
```bash
# Get all autonomous exam data organized by degree and type
GET /api/academics/autonomous

# Get only UG examination rules
GET /api/academics/autonomous?type=examination_rules&degree=UG

# Get all notifications for both UG and PG
GET /api/academics/autonomous?type=notifications
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "UG": {
      "examination_rules": [
        {
          "id": 1,
          "type": "examination_rules",
          "degree": "UG",
          "title": "Instructions to Candidates",
          "content": "Students must follow all examination rules...",
          "link": "https://example.com/inst_to_can.pdf",
          "posted_date": "2024-04-25T10:30:00Z"
        }
      ],
      "notifications": [
        {
          "id": 7,
          "type": "notifications",
          "degree": "UG",
          "title": "2024-04-25: Examination Fee Notification",
          "content": "Examination fee notification for B.Tech II Semester...",
          "link": "https://example.com/fee_notification.pdf",
          "posted_date": "2024-04-25T12:00:00Z"
        }
      ],
      "time_tables": [],
      "results": [],
      "revaluation_results": []
    },
    "PG": {
      "examination_rules": [],
      "notifications": [],
      "time_tables": [],
      "results": [],
      "revaluation_results": []
    }
  },
  "total": 15
}
```

### POST Request

**Create new autonomous exam section entry:**

```bash
POST /api/academics/autonomous
Content-Type: application/json

{
  "type": "notifications",
  "degree": "UG",
  "title": "New Exam Fee Notification",
  "content": "New examination fees are applicable from...",
  "link": "https://example.com/new_fee.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Record created successfully",
  "id": 25
}
```

## Implementation in Frontend

### Component Setup

In `/src/pages/Academics.tsx`:

```typescript
// 1. Define interface
interface AutonomousExamSection {
  id: number;
  type: string;
  degree: 'UG' | 'PG';
  title: string;
  content: string;
  link: string | null;
  posted_date: string;
}

// 2. Add state variables
const [ugAutonomousData, setUgAutonomousData] = useState<{ 
  [key: string]: AutonomousExamSection[] 
}>({});
const [pgAutonomousData, setPgAutonomousData] = useState<{ 
  [key: string]: AutonomousExamSection[] 
}>({});

// 3. Fetch data in useEffect
useEffect(() => {
  const fetchAutonomousData = async () => {
    try {
      const autonomousResponse = await fetch('/api/academics/autonomous');
      const autonomousData = autonomousResponse.ok 
        ? await autonomousResponse.json() 
        : { data: { UG: {}, PG: {} } };
      
      setUgAutonomousData(autonomousData.data?.UG || {});
      setPgAutonomousData(autonomousData.data?.PG || {});
    } catch (error) {
      console.error('Failed to fetch autonomous data:', error);
    }
  };

  fetchAutonomousData();
}, []);
```

### Rendering Pattern

```typescript
// For UG examination rules dropdown
{ugAutonomousData['examination_rules']?.map((item) => (
  <li key={item.id} className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2 flex-1">
      <div className="w-2 h-2 rounded-full bg-[#B22222]"></div>
      <span className="text-gray-700">{item.title}</span>
    </div>
    {item.link && (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-[#B22222] hover:underline text-sm font-medium"
      >
        View
      </a>
    )}
  </li>
))}

// Handle empty state
{!ugAutonomousData['examination_rules'] || 
 ugAutonomousData['examination_rules'].length === 0 ? (
  <li className="text-gray-500 text-sm py-2">No examination rules available</li>
) : null}
```

## Database Seeding

### Run Seed Script

```bash
node migrations/seed-autonomous-exam-section.js
```

**Expected Output:**
```
Creating autonomous_exam_section table...
✅ Table created successfully
Seeding sample data...
✅ 16 sample records seeded successfully
✅ Seed script completed successfully
```

### Environment Variables

Ensure these are set in `.env.local`:
```
MYSQL_HOST=62.72.31.209
MYSQL_USER=cmsuser
MYSQL_PASSWORD=V@savi@2001
MYSQL_PORT=3306
MYSQL_DATABASE=svec_cms
```

## Mapping Autonomous Data to Dropdowns

### Autonomous Tab Sections → Data Types

| Dropdown Section | Data Type | State Variable | Rendering Key |
|------------------|-----------|----------------|----------------|
| Examination Rules | `examination_rules` | `ugAutonomousData` / `pgAutonomousData` | `type === 'examination_rules'` |
| Notifications | `notifications` | `ugAutonomousData` / `pgAutonomousData` | `type === 'notifications'` |
| Time Tables | `time_tables` | `ugAutonomousData` / `pgAutonomousData` | `type === 'time_tables'` |
| Results | `results` | `ugAutonomousData` / `pgAutonomousData` | `type === 'results'` |
| Revaluation Results | `revaluation_results` | `ugAutonomousData` / `pgAutonomousData` | `type === 'revaluation_results'` |

## Important Features

### 1. Soft Delete Pattern
Records are soft-deleted (marked with `deleted_at` timestamp) rather than permanently removed:
```typescript
// Soft delete
UPDATE autonomous_exam_section SET deleted_at = NOW() WHERE id = 1;

// API automatically excludes soft-deleted records
const [rows] = await db.query(
  'SELECT * FROM autonomous_exam_section WHERE deleted_at IS NULL'
);
```

### 2. Responsive Dropdown Styling
All dropdowns use consistent professional styling:
```css
/* Dropdown header */
background: #B22222;
color: white;
padding: 12px 16px;
border-radius: 6px;
font-weight: 600;

/* Hover effect */
background: #9a1a1a;

/* Arrow animation */
transform: rotate(0deg) → rotate(180deg);
transition: transform 0.3s ease;
```

### 3. Link Management
Each item can have an optional link to PDF or external resource:
```typescript
// Display link if available
{item.link && (
  <a href={item.link} target="_blank" rel="noopener noreferrer">
    View Document
  </a>
)}
```

### 4. Timestamp Tracking
Track when items were posted and last modified:
```typescript
const date = new Date(item.posted_date);
const formattedDate = date.toLocaleDateString();  // "4/25/2024"
```

## Best Practices

### 1. Data Entry Guidelines
- **Title**: Keep concise and descriptive (max 255 chars)
- **Content**: Provide comprehensive description
- **Link**: Always provide PDF/document link for easy access
- **Type**: Select correct category for proper organization
- **Degree**: Specify UG/PG to show relevant content

### 2. Performance Optimization
- Fetch is called once on component mount
- Data is organized by degree and type to minimize processing
- Dropdowns use object keys for O(1) lookup
- Soft delete pattern avoids expensive database migrations

### 3. Error Handling
- API returns empty objects if errors occur
- Component displays "No data available" for empty categories
- Failed fetches don't crash the application
- Graceful fallback to empty state

## Migration Path

### From Hardcoded to Database-Driven

**Before:**
```typescript
const examinationRules = [
  { title: "Rule 1", content: "..." },
  { title: "Rule 2", content: "..." }
];
```

**After:**
```typescript
// Data comes from database via API
const ugAutonomousData = {
  examination_rules: [
    { id: 1, title: "Rule 1", content: "...", link: "..." },
    { id: 2, title: "Rule 2", content: "...", link: "..." }
  ]
};

// Same rendering pattern
ugAutonomousData['examination_rules']?.map(item => (...))
```

## Troubleshooting

### Issue: No data appearing in dropdowns

**Check:**
1. Run seed script: `node migrations/seed-autonomous-exam-section.js`
2. Verify database connection
3. Check browser console for fetch errors
4. Ensure API endpoint is returning data

### Issue: Links not working

**Check:**
1. Verify link URLs in database
2. Confirm PDF files are accessible
3. Check target="_blank" and rel="noopener noreferrer" attributes

### Issue: Wrong degree data showing

**Check:**
1. Confirm `degree` field in database (should be 'UG' or 'PG')
2. Verify correct state variables are used (ugAutonomousData vs pgAutonomousData)
3. Check filtering logic in API endpoint

## Future Enhancements

1. **Admin Panel Integration** - Add form to create/edit autonomous exam items
2. **Search Functionality** - Search within autonomous exam section items
3. **Filtering Options** - Filter by date range, department, etc.
4. **Notifications** - Alert users when new items are added
5. **Caching** - Implement caching for better performance
6. **Export** - Export autonomous exam data to PDF or Excel

## Related Files

- **API Endpoint**: `/src/app/api/academics/autonomous/route.ts`
- **Component**: `/src/pages/Academics.tsx`
- **Seed Script**: `/migrations/seed-autonomous-exam-section.js`
- **Database**: `svec_cms` → `autonomous_exam_section` table
