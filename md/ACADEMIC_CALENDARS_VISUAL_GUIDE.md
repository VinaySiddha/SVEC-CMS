# Academic Calendars - Visual Guide

## 🎨 User Interface Tour

### 1. Main Page Header
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
← Back to Dashboard

📅 Academic Calendars
Manage academic calendars and important dates
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2. Add Button
```
┌────────────────────────────────┐
│ ➕ Add New Calendar             │
└────────────────────────────────┘
```

### 3. Create Form (When "Add New Calendar" clicked)
```
┌─────────────────────────────────────────────────────────┐
│ ✎ Add New Calendar                                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Title *                          Academic Year *        │
│ [B.Tech Academic Calendar...]    [2024-2025.........]   │
│                                                          │
│ Program Type *                   Department             │
│ [B.Tech ▼]                      [Computer Science..]   │
│                                                          │
│ Start Date *                     End Date *             │
│ [2024-07-01]                    [2025-06-30]           │
│                                                          │
│ Status                                                   │
│ [Draft ▼]                                               │
│                                                          │
│ Description                                              │
│ ┌───────────────────────────────────────────────────┐   │
│ │ Enter calendar description                        │   │
│ │                                                   │   │
│ └───────────────────────────────────────────────────┘   │
│                                                          │
│ Remarks                                                  │
│ ┌───────────────────────────────────────────────────┐   │
│ │ Optional remarks or notes                         │   │
│ └───────────────────────────────────────────────────┘   │
│                                                          │
│                          [Cancel]  [Save Calendar]      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4. Calendar List (Collapsed)
```
┌─────────────────────────────────────────────────────────┐
│ 📅 Academic Calendars                                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ B.Tech Academic Calendar 2024-2025                      │
│ Jul 1, 2024 - Jun 30, 2025 • B.Tech • Computer        │
│ Science • [Published] • 15 event(s)                    │
│                              ✎  🗑️  ▼                 │
│                                                          │
│ M.Tech Academic Calendar 2024-2025                      │
│ Aug 15, 2024 - Jul 31, 2025 • M.Tech                   │
│ [Draft] • 8 event(s)                                   │
│                              ✎  🗑️  ▼                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 5. Calendar Expanded with Events
```
┌─────────────────────────────────────────────────────────┐
│ B.Tech Academic Calendar 2024-2025                      │
│ Jul 1, 2024 - Jun 30, 2025 • B.Tech • Computer        │
│ Science • [Published] • 15 event(s)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Events (15)                                             │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Semester] ★ Important                              │ │
│ │ Semester Begins                                     │ │
│ │ Classes start for the academic year                │ │
│ │ Jul 15, 2024                                       │ │
│ │                                        ✎  🗑️      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Orientation]                                       │ │
│ │ Student Orientation Program                         │ │
│ │ Orientation for new students                        │ │
│ │ Jul 8, 2024                                         │ │
│ │                                        ✎  🗑️      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Exam] ★ Important                                  │ │
│ │ Mid-Term Examinations                               │ │
│ │ Oct 1, 2024                                         │ │
│ │                                        ✎  🗑️      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ... more events ...                                      │
│                                                          │
│ Add Event                                               │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Event name              [Select event type ▼]       │ │
│ │ [Mid-Term Exams..]                                  │ │
│ │                                                     │ │
│ │ Event date              [✓] Mark as Important       │ │
│ │ [2024-10-01]                                        │ │
│ │                                                     │ │
│ │ Event description                                   │ │
│ │ ┌────────────────────────────────────────────────┐  │ │
│ │ │ Mid-term written examination for all courses   │  │ │
│ │ └────────────────────────────────────────────────┘  │ │
│ │                                                     │ │
│ │                  [Add Event]  [Cancel]             │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Color Scheme

### Status Badges
```
[Draft]        → Gray background
[Published]    → Green background
[Archived]     → Blue background
```

### Event Type Badges
```
[Holiday]      → Red background
[Exam]         → Orange background
[Semester]     → Purple background
[Registration] → Blue background
[Orientation]  → Indigo background
[Other]        → Gray background
```

### Important Events
```
★ Important    → Red star indicator
```

## 📱 Responsive Layout

### Desktop (2 columns)
```
┌──────────────────┬──────────────────┐
│  Input Field 1   │  Input Field 2   │
├──────────────────┼──────────────────┤
│  Input Field 3   │  Input Field 4   │
├──────────────────┼──────────────────┤
│  Full Width Textarea               │
└───────────────────────────────────┘
```

### Mobile (1 column)
```
┌────────────────────┐
│  Input Field 1     │
├────────────────────┤
│  Input Field 2     │
├────────────────────┤
│  Full Width Area   │
└────────────────────┘
```

## 🎬 User Interaction Flow

### Create New Calendar
```
1. User clicks "Add New Calendar"
   ↓
2. Form appears with all fields
   ↓
3. User fills required fields (*)
   ↓
4. User clicks "Save Calendar"
   ↓
5. API validates data
   ↓
6. If valid: Data stored in database
   If invalid: Error message shown
   ↓
7. Toast notification: "Calendar added successfully"
   ↓
8. Form closes
   ↓
9. New calendar appears in list
```

### Add Event to Calendar
```
1. User clicks calendar to expand
   ↓
2. Events list and "Add Event" form appear
   ↓
3. User fills event details
   ↓
4. User clicks "Add Event"
   ↓
5. API validates event data
   ↓
6. If valid: Event stored in database
   If invalid: Error message shown
   ↓
7. Toast notification: "Event added successfully"
   ↓
8. Event appears immediately in list
```

### Edit Calendar or Event
```
1. User clicks pencil icon (✎)
   ↓
2. Form opens with current data pre-filled
   ↓
3. User modifies fields
   ↓
4. User clicks "Update" button
   ↓
5. API validates changes
   ↓
6. If valid: Changes stored in database
   ↓
7. Toast notification: "Updated successfully"
   ↓
8. List refreshes with updated data
```

### Delete Calendar or Event
```
1. User clicks trash icon (🗑️)
   ↓
2. Confirmation dialog appears
   ↓
3. User confirms deletion
   ↓
4. API performs soft delete (sets deleted_at)
   ↓
5. Toast notification: "Deleted successfully"
   ↓
6. Item removed from UI
   ↓
7. Data still preserved in database
```

## 📊 State Management

### Component States
```
isAddingNew (boolean)
├── false → Show "Add New Calendar" button
└── true  → Show form

expandedCalendarId (number | null)
├── null    → All calendars collapsed
└── id      → Calendar with this ID is expanded

eventsData (object)
├── key: calendar ID
└── value: array of events

isLoading (boolean)
├── false → Show buttons normally
└── true  → Show "Saving..." loading state
```

## 🔍 Error Handling

### Validation Errors
```
User action → Validation check → Error message
   ↓
Invalid form submission
→ "Please fill in all required fields"
→ Toast notification (error style)
```

### API Errors
```
API request → Server processes → Error response
   ↓
Database error / Server error
→ "Failed to [action]: [error details]"
→ Toast notification (error style)
→ Logged to browser console
```

## 🌟 Key Features Visual Indicators

### Loading State
```
Button: [Saving...]    (disabled, loading icon)
```

### Success State
```
Toast: ✓ Calendar added successfully  (green)
```

### Error State
```
Toast: ✗ Failed to add calendar  (red)
```

### Empty State
```
┌─────────────────────────────────┐
│      📅 (large icon)            │
│   No calendars found.           │
│  Create one to get started.     │
└─────────────────────────────────┘
```

## 🎨 Theme Colors

```
Primary Blue:     #2563EB (buttons, links)
Success Green:    #16A34A (published status)
Warning Orange:   #EA580C (exam type)
Danger Red:       #DC2626 (delete, important)
Info Blue:        #0284C7 (info badges)
Neutral Gray:     #6B7280 (draft status, text)
Light Gray:       #F3F4F6 (backgrounds)
```

## 📋 Form Field Types

```
Text Input      → [Input box]
Date Picker     → [Calendar icon + date field]
Textarea        → [Multi-line text box]
Dropdown/Select → [Option ▼]
Checkbox        → [✓] Label
```

## 🎯 Call-to-Action Buttons

```
Primary:   "Save Calendar", "Add Event"      (Blue)
Secondary: "Cancel"                          (Outline)
Danger:    "Delete"                          (Red)
Edit:      "Update"                          (Blue)
Icon:      ✎ (Pencil), 🗑️ (Trash)          (Inline)
```
