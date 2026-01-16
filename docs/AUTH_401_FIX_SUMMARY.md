# 401 Authentication Error - Fix Summary

## Problem
Multiple 401 "Invalid token" errors when accessing the admin dashboard endpoints:
- `/api/admin/departments/aiml/bos-members/structure`
- `/api/admin/departments/aiml/bos-members`

## Root Causes Identified

### 1. Cookie Name Mismatch
- **Issue**: Login route was setting cookie as `admin_token`, but middleware was only checking for `token`
- **Impact**: Middleware couldn't find the authentication token

### 2. Token Not Returned in Response
- **Issue**: `/api/admin/auth/login` wasn't returning the token in the response body
- **Impact**: Frontend couldn't store the token in localStorage for Authorization headers

### 3. Missing Username in JWT Payload
- **Issue**: JWT token didn't include `username` field
- **Impact**: Token verification failed because expected fields were missing

## Fixes Applied

### ✅ 1. Updated Login Route (`src/app/api/admin/auth/login/route.ts`)
**Changes:**
- Added `username` field to JWT payload
- Return token in response body for localStorage storage
- Set both `token` and `admin_token` cookies for compatibility

```typescript
// JWT now includes username
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    username: user.username || user.email.split('@')[0],
    role: user.role,
    name: user.name,
    department: user.department
  },
  JWT_SECRET,
  { expiresIn: '24h' }
);

// Response includes token
response = NextResponse.json({
  success: true,
  token, // ← Now included
  user: { ... }
});

// Both cookies set
response.cookies.set('token', token, { ... });
response.cookies.set('admin_token', token, { ... });
```

### ✅ 2. Updated Middleware (`src/middleware.ts`)
**Changes:**
- Check for both `token` and `admin_token` cookies

```typescript
const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
              request.cookies.get('token')?.value ||
              request.cookies.get('admin_token')?.value; // ← Added
```

### ✅ 3. Verified JWT Configuration
- JWT_SECRET is properly loaded from `.env.local`
- Token signing and verification working correctly
- See `verify-jwt-token.js` for verification script

## Required Action: RESTART THE SERVER

**CRITICAL**: You must restart the Next.js development server for changes to take effect.

### How to Restart:

1. **Stop the current server:**
   - In the terminal running the dev server, press `Ctrl+C`

2. **Start the server again:**
   ```bash
   cd "c:\Users\vinay\Downloads\svec-cms\SVEC-CMS"
   npm run dev
   # or
   yarn dev
   ```

3. **Clear browser storage (optional but recommended):**
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Clear localStorage
   - Clear cookies for localhost:3000

## How the Authentication Flow Works Now

1. **User logs in** → `/api/auth/login` or `/api/admin/auth/login`
2. **Server response includes:**
   - `token` in JSON response body
   - `token` cookie (HTTP-only)
   - `admin_token` cookie (HTTP-only)
3. **Frontend (AuthContext) stores:**
   - Token in localStorage as `authToken`
4. **API requests include:**
   - `Authorization: Bearer <token>` header (from localStorage)
5. **Middleware validates:**
   - Checks Authorization header first
   - Falls back to `token` or `admin_token` cookies
6. **API routes verify:**
   - Extract token from Authorization header
   - Verify with JWT_SECRET
   - Check user permissions

## Testing After Restart

1. **Logout completely** (if logged in)
2. **Login again** with valid credentials
3. **Navigate to department dashboard**
4. **Verify no 401 errors** in browser console
5. **Check that data loads** correctly

## Verification Checklist

- [ ] Server restarted with latest code
- [ ] Browser storage cleared
- [ ] Can login successfully
- [ ] No 401 errors in console
- [ ] Dashboard data loads correctly
- [ ] Token appears in localStorage as `authToken`
- [ ] Cookies include `token` and/or `admin_token`

## Additional Files Modified

1. `src/app/api/admin/auth/login/route.ts` - Updated login endpoint
2. `src/middleware.ts` - Updated token checking logic
3. `verify-jwt-token.js` - Created verification script (NEW)

## If Issues Persist

If you still see 401 errors after restarting:

1. **Check browser console** for detailed error messages
2. **Verify token in localStorage:**
   ```javascript
   // In browser console
   localStorage.getItem('authToken')
   ```
3. **Check cookies:**
   - DevTools → Application → Cookies → localhost:3000
   - Look for `token` or `admin_token`
4. **Verify JWT_SECRET:**
   ```bash
   node verify-jwt-token.js
   ```
5. **Check server logs** for JWT verification errors

## Environment Variables

Ensure `.env.local` contains:
```env
JWT_SECRET=svec-cms-secret-key-2026-secure-random-string
```

**Never commit this file to version control!**

---

## Summary

The authentication system is now properly configured to:
- ✅ Generate valid JWT tokens with all required fields
- ✅ Store tokens in both localStorage and HTTP-only cookies
- ✅ Verify tokens consistently across all endpoints
- ✅ Support multiple cookie names for compatibility

**Next step: Restart the development server and test!**
