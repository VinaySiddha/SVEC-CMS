# Upload Directory Setup Guide

## Overview

This application stores uploaded files (images, PDFs, documents) in a configurable upload directory. The upload directory can be configured via the `UPLOAD_DIR` environment variable.

## Local Development

By default (when `UPLOAD_DIR` is not set), files are stored in:
```
project_directory/public/uploads/
```

This works out of the box for local development and requires no additional configuration.

## Production VPS Setup

For production deployment on your VPS server at **srivasaviengg.ac.in**, follow these steps:

### 1. Create the Upload Directory

SSH into your VPS and create the upload directory:

```bash
sudo mkdir -p /var/www/srivasaviengg.ac.in/uploads
```

### 2. Set Proper Permissions

Set ownership to the web server user (www-data for Nginx):

```bash
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
```

Set appropriate permissions:

```bash
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads
```

### 3. Configure Environment Variable

On your VPS, create or edit the `.env.production` file in your project directory:

```bash
cd /path/to/your/project
nano .env.production
```

Add this line:

```env
UPLOAD_DIR=/var/www/srivasaviengg.ac.in/uploads
```

Save and exit (Ctrl+O, Enter, Ctrl+X in nano).

### 4. Nginx Configuration (Already Done ✓)

Your Nginx is already configured correctly! Your current nginx configuration at `/etc/nginx/sites-available/default` (or wherever it's located) has:

```nginx
location /uploads/ {
    alias /var/www/srivasaviengg.ac.in/uploads/;
    autoindex off;

    types {
        application/pdf pdf;
    }

    add_header Content-Disposition inline;
}
```

This configuration:
- ✓ Serves files from the correct directory
- ✓ Ensures PDFs open in browser instead of downloading
- ✓ Prevents directory listing for security

**Note**: If you make any changes to nginx config, test and reload it:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Restart Your Application

After setting the environment variable, restart your Next.js application (running on port 4000):

```bash
# If using PM2
pm2 restart svec-cms

# If you need to reload environment variables
pm2 restart svec-cms --update-env

# Check status
pm2 status
pm2 logs svec-cms
```

## Directory Structure

Files will be organized in the following structure:

```
/var/www/srivasaviengg.ac.in/uploads/
├── cse/
│   ├── faculty/
│   ├── syllabus/
│   ├── hackathons-gallery/
│   └── ...
├── ece/
│   └── ...
├── placement/
│   ├── carousel/
│   ├── officer/
│   ├── team/
│   ├── charts/
│   ├── category/
│   ├── logos/
│   └── pdf/
├── noticeboard/
└── general/
```

## File Access

Files are accessible via the URL pattern:
```
https://srivasaviengg.ac.in/uploads/{department}/{module}/{filename}
```

Examples:
```
https://srivasaviengg.ac.in/uploads/cse/faculty/photo.jpg
https://srivasaviengg.ac.in/uploads/placement/carousel/image1.webp
https://srivasaviengg.ac.in/uploads/noticeboard/circular.pdf
```

## Verification Steps

After setup, verify everything is working:

### 1. Check Directory Exists and Permissions

```bash
ls -la /var/www/srivasaviengg.ac.in/uploads/
```

Expected output should show:
- Owner: www-data
- Permissions: drwxr-xr-x (755)

### 2. Test File Creation

```bash
sudo -u www-data touch /var/www/srivasaviengg.ac.in/uploads/test.txt
ls -la /var/www/srivasaviengg.ac.in/uploads/test.txt
rm /var/www/srivasaviengg.ac.in/uploads/test.txt
```

If this works without errors, permissions are correct.

### 3. Check Environment Variable

```bash
pm2 env svec-cms | grep UPLOAD_DIR
```

Should show: `UPLOAD_DIR=/var/www/srivasaviengg.ac.in/uploads`

### 4. Test Upload via Admin Panel

1. Login to admin panel
2. Try uploading a file (image or PDF)
3. Check if file appears in `/var/www/srivasaviengg.ac.in/uploads/`
4. Try accessing the file via browser using the URL

## Backup Considerations

Make sure to include `/var/www/srivasaviengg.ac.in/uploads/` in your backup strategy:

```bash
# Example backup command
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz /var/www/srivasaviengg.ac.in/uploads/

# Move to backup location
mv uploads-backup-*.tar.gz /path/to/backups/

# Or use rsync
rsync -avz /var/www/srivasaviengg.ac.in/uploads/ /backup/location/uploads/
```

## Troubleshooting

### Files not uploading

1. **Check directory permissions:**
   ```bash
   ls -la /var/www/srivasaviengg.ac.in/uploads/
   ```

2. **Check if the directory is writable:**
   ```bash
   sudo -u www-data touch /var/www/srivasaviengg.ac.in/uploads/test.txt
   ```
   If this fails, fix permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
   sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads
   ```

3. **Check application logs:**
   ```bash
   pm2 logs svec-cms --lines 100
   ```

4. **Verify environment variable is loaded:**
   ```bash
   pm2 env svec-cms | grep UPLOAD_DIR
   ```

### Files not accessible via URL

1. **Verify Nginx configuration:**
   ```bash
   sudo nginx -t
   ```

2. **Check Nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Test file access directly:**
   ```bash
   # Create a test file
   echo "test" | sudo -u www-data tee /var/www/srivasaviengg.ac.in/uploads/test.txt

   # Try to access it
   curl -I https://srivasaviengg.ac.in/uploads/test.txt
   ```
   Should return `200 OK` status.

4. **Check file permissions:**
   ```bash
   ls -la /var/www/srivasaviengg.ac.in/uploads/
   ```
   Files should have at least `644` permissions (rw-r--r--)

### Permission denied errors

Run:
```bash
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads
```

Then restart your app:
```bash
pm2 restart svec-cms
```

### UPLOAD_DIR not being used

If files are still going to `public/uploads/`:

1. **Check .env.production exists:**
   ```bash
   cat .env.production | grep UPLOAD_DIR
   ```

2. **Restart PM2 with updated env:**
   ```bash
   pm2 restart svec-cms --update-env
   ```

3. **Verify environment in PM2:**
   ```bash
   pm2 env svec-cms
   ```

## Security Notes

1. The application validates file types and sizes before upload
2. File names are sanitized to prevent directory traversal attacks
3. Only authenticated users can upload files
4. Nginx serves files with `autoindex off` to prevent directory listing
5. Maximum file sizes:
   - Images (gallery): 2MB
   - Documents: 5MB
   - Placement images: 300KB
   - Placement PDFs: 1MB

## Migration from Public Directory

If you have existing files in `public/uploads/` and want to migrate to `/var/www/srivasaviengg.ac.in/uploads/`:

```bash
# Find your project directory
cd /path/to/your/project

# Copy existing files
sudo cp -r public/uploads/* /var/www/srivasaviengg.ac.in/uploads/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads

# Verify files copied correctly
ls -la /var/www/srivasaviengg.ac.in/uploads/

# Optional: Backup and remove old public uploads
tar -czf public-uploads-backup.tar.gz public/uploads/
rm -rf public/uploads/*
```

## Quick Setup Checklist

- [ ] Create directory: `sudo mkdir -p /var/www/srivasaviengg.ac.in/uploads`
- [ ] Set permissions: `sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads`
- [ ] Set chmod: `sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads`
- [ ] Add to .env.production: `UPLOAD_DIR=/var/www/srivasaviengg.ac.in/uploads`
- [ ] Nginx config already correct (verify with `sudo nginx -t`)
- [ ] Restart app: `pm2 restart svec-cms --update-env`
- [ ] Test upload via admin panel
- [ ] Verify file is accessible via https://srivasaviengg.ac.in/uploads/...

## Support

If you encounter issues:
1. Check the logs: `pm2 logs svec-cms --lines 200`
2. Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify permissions: `ls -la /var/www/srivasaviengg.ac.in/uploads/`
4. Test manually: `sudo -u www-data touch /var/www/srivasaviengg.ac.in/uploads/test.txt`
