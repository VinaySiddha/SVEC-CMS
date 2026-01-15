# Faculty Data Not Showing - Root Cause & Solution

## Problem
Faculty data is not displayed on the `/faculty` page. The application shows an empty state instead of loading faculty members.

## Root Cause
**Database Connection Error: "Too many connections"**

The MySQL database server at `62.72.31.209` is rejecting new connections because it has reached its `max_connections` limit.

### Evidence
From the server logs:
```
Database query error on attempt 1: ER_CON_COUNT_ERROR Too many connections
```

This error has error code `1040` and indicates the MySQL server's connection limit has been exceeded.

## Why This Happens
1. **Too many idle connections** from previous requests are not being closed
2. **Low max_connections setting** on the MySQL server (default is often 150-200)
3. **Connection pool not draining** properly between requests

## Current Code Improvements Made

### 1. Database Connection Pool Optimization (`src/lib/db.ts`)
- Reduced `connectionLimit` from 10 → 3 (minimal required)
- Reduced `idleTimeout` from 5 minutes → 10 seconds (aggressive cleanup)
- Reduced `connectTimeout` from 60s → 5s
- Added `ER_CON_COUNT_ERROR` to retry logic
- Increased retry attempts from 3 → 5 with exponential backoff

### 2. Enhanced Logging (`src/pages/api/faculty.ts` & `src/pages/faculty.tsx`)
- Added detailed console logs to track request flow
- Logs database query attempts and results
- Helps identify connection pool issues

## Solutions (in priority order)

### **IMMEDIATE ACTION NEEDED: Contact Database Administrator**

Ask the MySQL database administrator to:

```sql
-- Check current max connections limit
SHOW VARIABLES LIKE 'max_connections';

-- Check current connected clients
SHOW PROCESSLIST;

-- Check idle connections
SELECT COUNT(*) FROM INFORMATION_SCHEMA.PROCESSLIST WHERE COMMAND = 'Sleep';

-- Kill idle connections older than 30 minutes (careful operation)
SELECT GROUP_CONCAT(CONCAT('KILL ', ID) SEPARATOR ';') 
FROM INFORMATION_SCHEMA.PROCESSLIST 
WHERE COMMAND = 'Sleep' AND TIME > 1800;

-- Permanently increase max_connections
SET GLOBAL max_connections = 500;

-- Or in my.cnf / my.ini:
-- [mysqld]
-- max_connections = 500
```

### **Temporary Workarounds**

1. **Restart MySQL Service** (if admin can do it)
   - Clears all idle connections
   - Temporary fix - issue will return as load increases

2. **Implement Query Caching** (add to code)
   ```typescript
   // Cache faculty data for 5 minutes to reduce DB queries
   const cacheKey = `faculty_${branchName}`;
   const cached = await cache.get(cacheKey);
   if (cached) return res.status(200).json(cached);
   ```

3. **Increase Application-Level Timeouts**
   - Already implemented with exponential backoff (2s, 4s, 8s, 16s, 32s)

## Recommended Long-term Solutions

1. **Database Server Configuration**
   - Increase `max_connections` to 500-1000
   - Set `max_allowed_packet` to 64M+
   - Configure `wait_timeout = 300` (5 minutes)

2. **Application Level**
   - Implement query result caching (Redis/Memcached)
   - Use connection pooling middleware on app server
   - Add request deduplication

3. **Monitoring**
   - Set up alerts when connection pool usage > 80%
   - Monitor slow queries
   - Track idle connection count

## Testing the Fix

### Verify the Issue
Run the diagnostic script:
```bash
node check-db-connections.mjs
```

Current Status (confirmed):
```
❌ Error connecting to database:
   Code: ER_CON_COUNT_ERROR
   Message: Too many connections
```

**This confirms the database server is at maximum connection capacity.**

After database admin increases `max_connections`:

1. Check MySQL setting:
   ```bash
   mysql -h 62.72.31.209 -u cmsuser -p -e "SHOW VARIABLES LIKE 'max_connections';"
   ```

2. Restart the development server:
   ```bash
   npm run dev
   ```

3. Visit http://localhost:9002/faculty

4. Check browser console for logs confirming successful data load

## Files Modified
- `src/lib/db.ts` - Connection pool optimization and retry logic
- `src/pages/api/faculty.ts` - Added detailed logging
- `src/pages/faculty.tsx` - Added request logging to console

## Status
✅ Code optimizations applied  
⏳ Waiting for database admin to increase max_connections limit
