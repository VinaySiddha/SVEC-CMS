# Automatic Data Update Feature - Complete Documentation

## Overview
The automatic data update feature enables seamless, real-time synchronization between the **admin dashboard** and **department view pages** without requiring users to manually refresh or clear browser history.

## How It Works

### Architecture
The system uses a **cross-tab communication** mechanism via `localStorage` events combined with **periodic polling**:

```
Admin Dashboard (Update/Delete)
    ↓
Trigger localStorage event
    ↓
Department View Page Listener
    ↓
Automatic Data Refresh
    ↓
User Sees Updated Data
```

### Key Components

#### 1. Admin Dashboard (`src/app/departments/[dept]/dashboard/page.tsx`)
**Responsibilities:**
- Detect when admin creates, updates, or deletes records
- Trigger cross-tab notification via localStorage
- Immediately refresh local cache

**Key Functions:**
- `handleSave()` - Triggered on create/update operations
- `handleDelete()` - Triggered on record deletion

**Update Mechanism:**
```typescript
// When data is saved or deleted, trigger this:
localStorage.setItem('admin_data_updated', JSON.stringify({
  timestamp: Date.now(),
  department: dept,
  module: selectedModule,
  action: 'create' | 'update' | 'delete',
  updatedAt: new Date().toISOString()
}));
```

#### 2. Auto-Refresh Hook (`src/hooks/useAutoRefresh.ts`)
**Responsibilities:**
- Listen for storage events across tabs
- Implement periodic polling
- Handle visibility changes (tab focus)
- Filter updates by department and module

**Features:**
- **Event-Driven Updates**: Responds to `admin_data_updated` localStorage events
- **Periodic Polling**: Falls back to polling every 30 seconds
- **Tab Visibility**: Auto-refresh when user switches back to the page
- **Filtering**: Only refresh when changes are relevant to current department/module
- **Rate Limiting**: Prevents excessive refreshes (minimum 500ms between refreshes)

#### 3. Department View Pages (e.g., `src/pages/departments/CSEAI.tsx`)
**Responsibilities:**
- Call `useAutoRefresh` hook with fetchAllData callback
- Provide department identifier
- Update UI with fresh data

**Usage:**
```typescript
useAutoRefresh(fetchAllData, {
  interval: 30000,
  enabled: true,
  onRefresh: () => console.log('Refreshing CSEAI data'),
  department: 'cse-ai' // Critical for filtering!
});
```

## Implementation Details

### Data Flow

#### Scenario 1: Admin Updates Record in Dashboard
1. Admin clicks "Update" button on a record
2. `handleSave()` is called
3. API request is made to update the database
4. On success:
   - Clear local cache
   - Store update event in localStorage
   - Reload data from API
5. Department view page detects storage event
6. Page automatically refreshes data (if relevant to its department)
7. User sees updated content without manual refresh

#### Scenario 2: Admin Deletes Record in Dashboard
1. Admin clicks "Delete" button
2. Confirmation dialog appears
3. `handleDelete()` is called
4. API request is made to delete record
5. On success:
   - Delete associated files
   - Clear local cache
   - Store delete event in localStorage
   - Reload remaining data
6. Department view page detects storage event
7. Page automatically removes deleted content
8. User sees updated list without manual refresh

#### Scenario 3: Department View Page Auto-Refresh Interval
1. Every 30 seconds (configurable), the view page polls for new data
2. If no updates in admin, data remains unchanged
3. If admin made updates in another tab, data is refreshed
4. User always sees current information

### Cross-Tab Communication

**Storage Event Structure:**
```json
{
  "timestamp": 1732278420123,
  "department": "cse-ai",
  "module": "faculty",
  "action": "update",
  "updatedAt": "2025-11-22T10:30:20.123Z"
}
```

**Storage Event Listener:**
```typescript
window.addEventListener('storage', (e: StorageEvent) => {
  if (e.key === 'admin_data_updated') {
    const update = JSON.parse(e.newValue || '{}');
    
    // Only refresh if relevant to current page
    if (update.department === 'cse-ai') {
      fetchAllData(); // Refresh immediately
    }
  }
});
```

## Features

### ✅ Automatic Updates
- No manual refresh needed
- No cache clearing required
- Seamless user experience

### ✅ Smart Filtering
- Only relevant updates trigger refresh
- Department-specific filtering
- Module-specific filtering (coming soon)

### ✅ Rate Limiting
- Prevents excessive API calls
- Minimum 500ms between refreshes
- Configurable polling interval (5s - 5m)

### ✅ Visibility Aware
- Refreshes when user switches back to tab
- Respects tab focus state
- Efficient background behavior

### ✅ Fallback Mechanisms
- Periodic polling as backup
- Works even if storage events fail
- Graceful error handling

## Configuration

### Hook Options
```typescript
interface UseAutoRefreshOptions {
  interval?: number;        // Polling interval (default: 30000ms)
  enabled?: boolean;        // Enable/disable refresh (default: true)
  onRefresh?: () => void;   // Callback when refresh occurs
  department?: string;      // Filter by department code
  module?: string;          // Filter by module key (optional)
}
```

### Example Configurations

**Default (30-second polling):**
```typescript
useAutoRefresh(fetchData, {
  department: 'cse-ai'
});
```

**Fast refresh (10 seconds):**
```typescript
useAutoRefresh(fetchData, {
  interval: 10000,
  department: 'cse-ai'
});
```

**Module-specific:**
```typescript
useAutoRefresh(fetchData, {
  interval: 30000,
  department: 'cse-ai',
  module: 'faculty'
});
```

## Implementation Checklist

### For Admin Dashboard
- ✅ Import needed utilities
- ✅ Update `handleSave()` to trigger localStorage event
- ✅ Update `handleDelete()` to trigger localStorage event
- ✅ Clear cache on update/delete
- ✅ Reload data from API

### For Department View Pages
- ✅ Import `useAutoRefresh` hook
- ✅ Call hook with `fetchAllData` callback
- ✅ Provide `department` parameter
- ✅ Ensure `fetchAllData` refetches all data

### Testing
- ✅ Open admin and view page in separate tabs
- ✅ Update record in admin dashboard
- ✅ Verify view page updates automatically
- ✅ Delete record in admin
- ✅ Verify removed from view page
- ✅ Switch tabs and verify refresh works
- ✅ Check browser console for refresh logs

## Troubleshooting

### Updates Not Appearing
1. Verify `department` parameter matches in both dashboard and view page
2. Check browser console for errors
3. Ensure localStorage events are enabled
4. Try manual refresh (should still work)
5. Check network tab for API requests

### Too Frequent Refreshing
1. Adjust `interval` option (increase to 60000 for 1 minute)
2. Check for storage event spam
3. Verify rate limiting logic (500ms minimum)

### Missing Updates on Focus
1. Verify `visibilitychange` event listener is attached
2. Check that page actually becomes hidden/visible
3. Test in incognito/private mode

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Storage Events | ✅ | ✅ | ✅ | ✅ |
| visibilitychange | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| JSON | ✅ | ✅ | ✅ | ✅ |

## Performance Considerations

### Optimizations Implemented
1. **Cache Management**: 5-minute cache with force refresh option
2. **Rate Limiting**: 500ms minimum between refreshes
3. **Debouncing**: Storage events debounced automatically
4. **Filtering**: Only relevant updates trigger refresh
5. **Parallel API Calls**: Multiple data sources fetched simultaneously

### API Call Reduction
- **Without Auto-Refresh**: 1 call per manual refresh
- **With Auto-Refresh**: ~2 calls per minute (polling interval)
- **Result**: Minimal overhead for real-time updates

## Future Enhancements

### Potential Improvements
1. **WebSocket Support**: For real-time updates (not just polling)
2. **Server-Sent Events (SSE)**: For push notifications
3. **Service Worker**: For background sync
4. **Optimistic Updates**: Show changes before API confirmation
5. **Module-Level Filtering**: Refresh only specific modules
6. **Update Notifications**: Toast notifications for changes
7. **Conflict Resolution**: Handle simultaneous edits

## Code Examples

### Basic Setup (Department View Page)
```typescript
import { useAutoRefresh } from '@/hooks/useAutoRefresh';

const DepartmentPage = () => {
  const [data, setData] = useState([]);

  const fetchAllData = useCallback(async () => {
    const result = await fetch('/api/department/data');
    const json = await result.json();
    setData(json.data);
  }, []);

  // Enable auto-refresh with department filtering
  useAutoRefresh(fetchAllData, {
    interval: 30000,
    enabled: true,
    department: 'cse-ai'
  });

  return <div>{/* Render data */}</div>;
};
```

### Admin Dashboard Integration
```typescript
const handleSave = async (data: any) => {
  try {
    const result = await api.save(data);
    
    if (result.success) {
      // Trigger auto-update for view pages
      localStorage.setItem('admin_data_updated', JSON.stringify({
        timestamp: Date.now(),
        department: dept,
        module: selectedModule,
        action: editingItem ? 'update' : 'create',
        updatedAt: new Date().toISOString()
      }));
      
      // Refresh dashboard data
      loadModuleData(selectedModule, 1, true);
    }
  } catch (error) {
    console.error('Error saving:', error);
  }
};
```

## Support

For issues or questions about the auto-update feature:
1. Check console logs for errors
2. Verify department and module parameters
3. Test in different browsers
4. Review this documentation
5. Contact development team

## Summary

The auto-update feature ensures that:
- ✨ Admin updates immediately visible in view pages
- 🔄 No manual refresh or cache clearing needed
- ⚡ Efficient polling with event-driven updates
- 🎯 Smart filtering by department
- 📱 Works across browser tabs
- 🛡️ Graceful fallbacks and error handling
