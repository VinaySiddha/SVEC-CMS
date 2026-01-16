# How to Restart Your Development Server

## Current Situation
- Your Next.js dev server is running on **port 9002** with Turbopack
- Process ID: **1204**
- The code changes have been made, but the server needs to restart to pick them up

## Steps to Restart

### Option 1: Kill and Restart (Recommended)

1. **Kill the current process:**
   ```bash
   # On Windows
   taskkill /F /PID 1204
   
   # Or find the terminal where the dev server is running and press Ctrl+C
   ```

2. **Start the server again:**
   ```bash
   cd "c:\Users\vinay\Downloads\svec-cms\SVEC-CMS"
   npm run dev
   ```

### Option 2: Find the Terminal and Restart

1. Look for the terminal/command prompt where you ran `npm run dev`
2. Press **Ctrl+C** to stop the server
3. Wait for it to fully stop
4. Run `npm run dev` again

## After Restarting

1. **Clear your browser cache:**
   - Open DevTools (F12)
   - Go to Application → Storage
   - Click "Clear site data"
   - Or manually:
     - Clear localStorage
     - Clear cookies for localhost:9002

2. **Login again** and the 401 errors should be gone

## What to Look For

After restart, check the server console logs. You should see:
```
[verifyAuth] 🔍 About to verify token...
[verifyAuth] JWT_SECRET available: YES
[verifyAuth] JWT_SECRET value: svec-cms-secret-key-...
[verifyAuth] ✅ Token verified successfully for: [username]
```

If you see:
```
[verifyAuth] JWT_SECRET available: NO (using fallback)
```

Then the .env.local file is not being loaded. Make sure it's in the project root.

## Verification

After restarting, run this to verify the server is running:
```bash
curl http://localhost:9002/api/health
```

You should get a successful response.
