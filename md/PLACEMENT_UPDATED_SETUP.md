# 🎓 PLACEMENT SYSTEM - UPDATED SETUP (Using Shared Auth)

## 🔄 What Changed

✅ **Placement now uses the same authentication system as Exam Section**
✅ **Simple username/password login (no separate auth page)**
✅ **Shared user database with exam section**
✅ **Role-based access control**

---

## 🔐 Login Credentials

### Placement User
```
Username: placement
Password: placement@2025
Role: placement
```

---

## 🚀 Setup Instructions

### Step 1: Create Database Tables (if not already done)
```bash
cd migrations

# If you haven't run the exam section setup:
node migrate-placement-schema.js
node seed-placement-data.js
```

### Step 2: Add Placement User to Auth System
```bash
# This creates the users table and adds placement user
node setup-placement-user.js
```

**Expected Output:**
```
✓ Users table ready
✓ Placement user added/updated
  Username: placement
  Password: placement@2025
  Role: placement
```

### Step 3: Start Application
```bash
npm run dev
```

### Step 4: Login to Placement System
```
URL: http://localhost:3000/auth/login
Username: placement
Password: placement@2025
```

After login, you'll be redirected to:
```
http://localhost:3000/placement/dashboard
```

---

## 📋 Access Points

| Page | URL |
|------|-----|
| **Shared Login** | `http://localhost:3000/auth/login` |
| **Placement Dashboard** | `http://localhost:3000/placement/dashboard` |
| **Exam Section Dashboard** | `http://localhost:3000/exam-section/dashboard` |

---

## 👥 User Roles

### Current Users
- **placement** (Placement Cell Admin)
- **admin** (if exam section users exist)
- **exam** (if exam section users exist)

---

## 🔄 Authentication Flow

```
User enters credentials
    ↓
/auth/login page
    ↓
POST /api/auth/login
    ↓
Query users table
    ↓
Verify password (SHA-256)
    ↓
Generate token
    ↓
Check user role
    ↓
Redirect to appropriate dashboard:
  - role='placement' → /placement/dashboard
  - role='exam' → /exam-section/dashboard
  - role='admin' → /admin/dashboard (or as configured)
```

---

## 📊 Features Available

Once logged in as placement user, you can:
✅ View 8 placement staff members
✅ Search staff by name or email
✅ View placement statistics (3 years)
✅ Expand year-wise details
✅ See branch-wise breakdown tables
✅ View sample companies
✅ Logout (returns to login page)

---

## 🔒 Security

- ✅ SHA-256 password hashing
- ✅ Token-based authentication
- ✅ Role-based access control
- ✅ Session management
- ✅ Secure logout

---

## 📁 Files Updated/Created

### Created:
- `migrations/setup-placement-user.js` - User setup script

### Modified:
- `src/app/placement/dashboard/page.tsx` - Updated to use shared auth

### No Changes Needed:
- Placement staff/statistics/details/companies APIs
- Database schema (uses existing)

---

## ✅ Verification

To verify the setup is working:

1. ✅ Run migration script
2. ✅ Start dev server
3. ✅ Go to `http://localhost:3000/auth/login`
4. ✅ Enter: `placement` / `placement@2025`
5. ✅ Should redirect to `/placement/dashboard`
6. ✅ Dashboard should load with all data

---

## 🆘 Troubleshooting

### "Invalid credentials" error
- Verify user was created: Check if setup script ran successfully
- Verify password: Should be `placement@2025`
- Check database: `SELECT * FROM users WHERE username='placement';`

### Dashboard not loading
- Check localStorage: Should have `auth_token` and `auth_user`
- Check role: User role must be `'placement'`
- Open DevTools → Network tab to see API calls

### "Role not recognized"
- Verify users table has role set to `'placement'`
- Clear browser cache and re-login

---

## 🎯 Next Steps

1. Test login with credentials
2. Verify all dashboard features work
3. Test logout functionality
4. Share credentials with placement staff
5. Ready for production!

---

## 📞 Support

For setup issues, refer to:
- `PLACEMENT_SYSTEM_SETUP.md` - Original setup guide
- `PLACEMENT_QUICK_START.md` - Quick reference
- Auth system documentation (shared with exam section)

---

**Status:** ✅ Updated to use shared authentication system
**Date:** November 2025
**Version:** 2.0 (Simplified Auth)
