# Quick Reference: Sahaya Events Category Field

## ✅ What Was Done

Added a **category dropdown field** to the Sahaya Events admin UI module with two options:
- `ecactivities` → EC Activities
- `sahaya` → Sahaya

## 🎯 Where to Use It

### 1. Admin Dashboard
- Navigate to: **Admin → CST Department → Sahaya Events**
- When creating or editing a Sahaya event, you'll see a "Category" dropdown
- Select either "EC Activities" or "Sahaya"
- Save the record

### 2. In Code (Frontend - Optional)

To filter Sahaya events by category in `CST.tsx`:

```typescript
// Filter only Sahaya category events
const sahayaOnlyEvents = sahayaEventsData?.filter(e => e.category === 'sahaya');

// Filter only EC Activities category events
const ecActivityEvents = sahayaEventsData?.filter(e => e.category === 'ecactivities');

// Display with category label
sahayaEventsData?.map(event => (
  <div key={event.id}>
    {event.event_name} ({event.category === 'ecactivities' ? 'EC Activities' : 'Sahaya'})
  </div>
))
```

## 📊 Database Structure

The `cst_sahaya_events` table now has:

| Column | Type | Notes |
|--------|------|-------|
| id | int | Primary key |
| year | varchar | Event year (e.g., "2024") |
| event_name | varchar | Event name/title - NEW |
| category | varchar | "ecactivities" or "sahaya" - NEW |
| file_url | varchar | PDF/document URL |
| created_at | timestamp | Auto-created |

## 🚀 Before Using

You must **run the SQL migration**:

```bash
# In your database management tool (PhpMyAdmin, MySQL Workbench, etc.)
# Or via command line:
# mysql -u root -p your_database < sql/update_cst_sahaya_events_table.sql
```

This adds the new columns to the database table.

## 📁 Modified Files

1. **`src/config/module-fields.ts`**
   - Added `sahaya-events` field configuration
   - Defines all form fields and their properties
   - Specifies category dropdown options

2. **`sql/update_cst_sahaya_events_table.sql`**
   - Database migration SQL
   - Adds `event_name` and `category` columns
   - Creates indexes for performance

## 🔄 How It Works

```
Admin fills form in Dashboard
         ↓
Form shows fields from module-fields.ts config
         ↓
Includes Category dropdown with 2 options
         ↓
Admin selects category and submits
         ↓
API validates and saves to cst_sahaya_events
         ↓
Frontend can filter/display by category
```

## ✨ Features

- ✅ Dropdown with predefined options (no free text)
- ✅ Required field (must select a category)
- ✅ Database indexed for performance
- ✅ Searchable and sortable in admin
- ✅ Backward compatible (default is "sahaya")

## 🎓 Example Usage

### Adding a Sahaya Event
1. Go to Admin Dashboard
2. Select CST Department
3. Click "Sahaya Events"
4. Click "Add New" or "Create New Record"
5. Fill in:
   - Year: `2024`
   - Event Name: `Cheyutha 2024`
   - Category: Select `Sahaya` from dropdown
   - Document: Upload PDF file
6. Click Save

### Adding an EC Activity Event
Same steps but select `EC Activities` in the category dropdown.

## 🔧 Troubleshooting

**Problem**: Category dropdown not showing in admin form
- **Solution**: Make sure to run the SQL migration first
- **Solution**: Verify `src/config/module-fields.ts` has the sahaya-events config
- **Solution**: Restart the Next.js development server

**Problem**: Can't save events with category
- **Solution**: Run the SQL migration: `sql/update_cst_sahaya_events_table.sql`
- **Solution**: Check that the `cst_sahaya_events` table has `category` column

**Problem**: Category field not appearing in form
- **Solution**: Clear browser cache
- **Solution**: Check that you're in the correct department (CST)
- **Solution**: Check that you're in the correct module (Sahaya Events)

## 📝 Notes

- Default category value is **'sahaya'** for new records
- You can update existing records to set their category
- The category value is case-sensitive in the database
- UI labels are "EC Activities" and "Sahaya" but database stores "ecactivities" and "sahaya"

## 🎉 You're All Set!

The category field is now ready to use in the Sahaya Events admin module. Just run the SQL migration and start managing Sahaya events with categories!

