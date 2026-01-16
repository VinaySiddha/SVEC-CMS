# GitHub Deployment - Quick Reference

## 🎯 Quick Setup Checklist

### GitHub Secrets (Add these in Settings → Secrets → Actions)

```
✅ DOCKER_USERNAME      → Your Docker Hub username
✅ DOCKER_PASSWORD      → Your Docker Hub access token
✅ VPS_HOST            → srivasaviengg.ac.in
✅ VPS_USER            → root (or your SSH user)
✅ VPS_SSH_KEY         → Your private SSH key
✅ VPS_PORT            → 22 (optional, only if different)
```

### VPS Setup Commands

```bash
# 1. Create upload directory
sudo mkdir -p /var/www/srivasaviengg.ac.in/uploads
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads

# 2. Create project directory
sudo mkdir -p /var/www/srivasaviengg.ac.in
sudo chown -R $USER:$USER /var/www/srivasaviengg.ac.in

# 3. Create .env.production file
nano /var/www/srivasaviengg.ac.in/.env.production
# Add your environment variables (see full guide)

# 4. Add SSH key to authorized_keys
echo "YOUR_PUBLIC_SSH_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

## 🚀 How to Deploy

### Auto-Deploy (Recommended)

```bash
# On dev branch
git checkout dev
git add .
git commit -m "Your changes"
git push origin dev
# ✅ Automatic deployment starts!
```

### Manual Deploy (Fallback)

```bash
# SSH into VPS
ssh your-user@srivasaviengg.ac.in

# Pull and run
docker pull vinaysiddha/svec-cms:dev
docker stop svec-cms && docker rm svec-cms
docker run -d \
  --name svec-cms \
  --restart unless-stopped \
  -p 4000:3000 \
  -v /var/www/srivasaviengg.ac.in/uploads:/var/www/uploads \
  --env-file /var/www/srivasaviengg.ac.in/.env.production \
  vinaysiddha/svec-cms:dev
```

## 🔍 Monitoring Commands

```bash
# Check if container is running
docker ps | grep svec-cms

# View container logs
docker logs svec-cms --tail 50 --follow

# Check application health
curl http://localhost:4000

# Check Docker stats
docker stats svec-cms

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check upload directory
ls -la /var/www/srivasaviengg.ac.in/uploads/
```

## 🛠️ Troubleshooting

### Deployment Failed

```bash
# Check GitHub Actions logs
# https://github.com/YOUR_USERNAME/SVEC-CMS/actions

# Check container logs on VPS
docker logs svec-cms --tail 100

# Restart container
docker restart svec-cms

# Check if port is in use
sudo lsof -i :4000
```

### Fix Permissions

```bash
# Upload directory
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads

# SSH authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Container Won't Start

```bash
# View detailed logs
docker logs svec-cms --tail 100

# Check .env.production file
cat /var/www/srivasaviengg.ac.in/.env.production

# Verify volume mount
docker inspect svec-cms | grep -A 10 Mounts

# Run container interactively for debugging
docker run -it --rm \
  -v /var/www/srivasaviengg.ac.in/uploads:/var/www/uploads \
  --env-file /var/www/srivasaviengg.ac.in/.env.production \
  vinaysiddha/svec-cms:dev sh
```

## 📊 Workflow Status

### Check Deployment Status

1. **GitHub Actions**: https://github.com/YOUR_USERNAME/SVEC-CMS/actions
2. **VPS**: `ssh your-user@srivasaviengg.ac.in && docker ps`
3. **Website**: https://srivasaviengg.ac.in

### Deployment Timeline

```
Push to dev → ~1-2 min → Build starts
           → ~5-7 min → Docker build completes
           → ~1-2 min → Push to Docker Hub
           → ~1-2 min → Deploy to VPS
           → ~30 sec  → Health check
Total: ~8-12 minutes
```

## 🔐 Generate SSH Key (First Time)

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions@srivasaviengg.ac.in"

# Copy private key (paste this in VPS_SSH_KEY secret)
cat ~/.ssh/id_ed25519

# Copy public key (add this to VPS authorized_keys)
cat ~/.ssh/id_ed25519.pub

# Add public key to VPS
ssh your-user@srivasaviengg.ac.in
echo "PASTE_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Test connection
ssh -i ~/.ssh/id_ed25519 your-user@srivasaviengg.ac.in
```

## 🌐 Environment Variables (.env.production)

```env
# Required variables for .env.production on VPS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=svec_cms

JWT_SECRET=your-super-secret-jwt-key-change-this

UPLOAD_DIR=/var/www/uploads

NEXT_PUBLIC_APP_URL=https://srivasaviengg.ac.in

COOKIE_NAME=sid
COOKIE_MAX_AGE=86400
```

## 📝 Deployment Branches

- `dev` → Auto-deploy to staging/VPS
- `Final_Blast` → Auto-deploy to production
- `main` or `master` → Auto-deploy to production

## ⚡ Quick Commands

```bash
# Restart deployment
docker restart svec-cms

# View recent logs
docker logs svec-cms --tail 50

# Stop container
docker stop svec-cms

# Remove container
docker rm svec-cms

# Remove old images
docker image prune -f

# Check disk space
df -h

# Check container size
docker ps --size

# Export logs to file
docker logs svec-cms > /tmp/svec-logs.txt
```

## 🎯 Success Indicators

✅ GitHub Actions shows green checkmark
✅ `docker ps` shows `svec-cms` container running
✅ `curl http://localhost:4000` returns HTML
✅ https://srivasaviengg.ac.in loads successfully
✅ Upload directory exists with correct permissions

## 📞 Support Checklist

When asking for help, provide:

1. GitHub Actions workflow run URL
2. Output of `docker logs svec-cms --tail 100`
3. Output of `docker ps -a`
4. Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
5. Screenshot of the error (if UI issue)

## 🔄 Rollback to Previous Version

```bash
# SSH into VPS
ssh your-user@srivasaviengg.ac.in

# Find previous image
docker images | grep svec-cms

# Stop current container
docker stop svec-cms && docker rm svec-cms

# Run previous version (replace IMAGE_ID)
docker run -d \
  --name svec-cms \
  --restart unless-stopped \
  -p 4000:3000 \
  -v /var/www/srivasaviengg.ac.in/uploads:/var/www/uploads \
  --env-file /var/www/srivasaviengg.ac.in/.env.production \
  IMAGE_ID
```

---

**🎉 You're all set! Push to `dev` branch and watch it deploy automatically!**
