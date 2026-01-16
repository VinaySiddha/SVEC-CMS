# GitHub Auto-Deployment Setup Guide

## Overview

This guide will help you set up automatic deployment to your VPS server when you push code to the `dev` branch (or `main`, `master`, `Final_Blast` branches).

## How It Works

When you push code to the `dev` branch:

1. **GitHub Actions** triggers automatically
2. **Builds** a Docker image with your latest code
3. **Pushes** the image to Docker Hub
4. **Deploys** to your VPS at `srivasaviengg.ac.in`
5. **Verifies** the deployment was successful

## Prerequisites

Before setting up auto-deployment, you need:

- ✅ A VPS server running Linux (you have this)
- ✅ Docker installed on your VPS
- ✅ SSH access to your VPS
- ✅ Docker Hub account

## Step 1: Set Up GitHub Secrets

GitHub Secrets are encrypted environment variables that store sensitive information like SSH keys and passwords.

### Go to Your GitHub Repository

1. Navigate to: `https://github.com/YOUR_USERNAME/SVEC-CMS`
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret** (green button)

### Add These Secrets

Add the following secrets one by one:

#### 1. `DOCKER_USERNAME`
- **Value**: Your Docker Hub username
- Example: `vinaysiddha`

#### 2. `DOCKER_PASSWORD`
- **Value**: Your Docker Hub password or Access Token
- **Recommended**: Use Access Token instead of password
  - Go to https://hub.docker.com/settings/security
  - Click "New Access Token"
  - Give it a name (e.g., "GitHub Actions")
  - Copy the token and use it here

#### 3. `VPS_HOST`
- **Value**: Your VPS server IP address or domain
- Example: `srivasaviengg.ac.in` or `123.456.78.90`

#### 4. `VPS_USER`
- **Value**: Your VPS SSH username
- Example: `root` or `ubuntu` or `vinay`

#### 5. `VPS_SSH_KEY`
- **Value**: Your VPS private SSH key
- **How to get this:**

```bash
# On your local machine (Windows), generate SSH key if you don't have one:
ssh-keygen -t ed25519 -C "github-actions@srivasaviengg.ac.in"

# Press Enter to save in default location
# Press Enter twice to skip passphrase (no passphrase needed for automation)

# Copy the PRIVATE key content:
cat ~/.ssh/id_ed25519

# Copy everything from -----BEGIN OPENSSH PRIVATE KEY----- to -----END OPENSSH PRIVATE KEY-----
```

Then add the **PUBLIC key** to your VPS:

```bash
# SSH into your VPS
ssh your-user@srivasaviengg.ac.in

# Add the public key to authorized_keys
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

To get your public key:
```bash
cat ~/.ssh/id_ed25519.pub
```

#### 6. `VPS_PORT` (Optional)
- **Value**: SSH port (default is 22)
- Only add this if you use a custom SSH port
- Example: `2222`

## Step 2: Verify Secrets Are Set

After adding all secrets, your **Secrets** page should show:

- ✅ DOCKER_USERNAME
- ✅ DOCKER_PASSWORD
- ✅ VPS_HOST
- ✅ VPS_USER
- ✅ VPS_SSH_KEY
- ✅ VPS_PORT (optional)

## Step 3: Prepare Your VPS Server

SSH into your VPS and run these commands:

### 1. Install Docker (if not already installed)

```bash
# Update packages
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (replace 'your-user' with your username)
sudo usermod -aG docker your-user

# Verify Docker is installed
docker --version
```

### 2. Create Project Directory

```bash
# Create directory
sudo mkdir -p /var/www/srivasaviengg.ac.in

# Set ownership
sudo chown -R $USER:$USER /var/www/srivasaviengg.ac.in

# Navigate to directory
cd /var/www/srivasaviengg.ac.in
```

### 3. Create Upload Directory

```bash
# Create upload directory
sudo mkdir -p /var/www/srivasaviengg.ac.in/uploads

# Set permissions
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads
```

### 4. Create Environment File

```bash
# Create .env.production file
nano /var/www/srivasaviengg.ac.in/.env.production
```

Add your production environment variables:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=svec_cms

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Upload Directory
UPLOAD_DIR=/var/www/uploads

# Application URL
NEXT_PUBLIC_APP_URL=https://srivasaviengg.ac.in

# Cookie Configuration
COOKIE_NAME=sid
COOKIE_MAX_AGE=86400
```

Save and exit (Ctrl+O, Enter, Ctrl+X).

### 5. Test SSH Connection from Local Machine

```bash
ssh -i ~/.ssh/id_ed25519 your-user@srivasaviengg.ac.in
```

If this works without asking for a password, your SSH key is set up correctly! ✅

## Step 4: Test the Deployment

### Push to Dev Branch

```bash
# Make sure you're on the dev branch
git checkout dev

# Make a small change (e.g., update README)
echo "# Test deployment" >> README.md

# Commit and push
git add .
git commit -m "Test: Trigger deployment"
git push origin dev
```

### Watch the Deployment

1. Go to your GitHub repository
2. Click **Actions** tab (top menu)
3. You should see a workflow running: "Build and Push Docker Image"
4. Click on it to see the progress

The workflow will:
- ✅ Build Docker image
- ✅ Push to Docker Hub
- ✅ Deploy to VPS
- ✅ Verify deployment

### Check Your VPS

SSH into your VPS and check:

```bash
# Check if container is running
docker ps

# Check container logs
docker logs svec-cms

# Check if app is responding
curl http://localhost:4000

# Check upload directory
ls -la /var/www/srivasaviengg.ac.in/uploads/
```

## How to Use

### For Regular Development

```bash
# 1. Work on the dev branch
git checkout dev

# 2. Make your changes
# ... edit files ...

# 3. Commit your changes
git add .
git commit -m "Your commit message"

# 4. Push to dev branch (this triggers auto-deployment)
git push origin dev

# 5. Wait ~5-10 minutes for deployment to complete
# 6. Visit https://srivasaviengg.ac.in to see your changes
```

### For Production Deployment

When you're ready to deploy to production:

```bash
# 1. Merge dev into Final_Blast (or main/master)
git checkout Final_Blast
git merge dev
git push origin Final_Blast

# This will trigger deployment to production
```

## Troubleshooting

### Deployment Failed in GitHub Actions

1. **Check the error message** in GitHub Actions logs
2. Common issues:
   - SSH connection failed → Check VPS_HOST, VPS_USER, VPS_SSH_KEY secrets
   - Docker login failed → Check DOCKER_USERNAME and DOCKER_PASSWORD
   - Permission denied → Check SSH key is added to VPS authorized_keys

### Container Not Starting

```bash
# SSH into VPS
ssh your-user@srivasaviengg.ac.in

# Check container logs
docker logs svec-cms --tail 100

# Check if port 4000 is in use
sudo lsof -i :4000

# Restart container manually
docker restart svec-cms
```

### Application Not Accessible

```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test local connection
curl http://localhost:4000

# Restart Nginx
sudo systemctl restart nginx
```

### Upload Directory Issues

```bash
# Check directory exists
ls -la /var/www/srivasaviengg.ac.in/uploads/

# Fix permissions
sudo chown -R www-data:www-data /var/www/srivasaviengg.ac.in/uploads
sudo chmod -R 755 /var/www/srivasaviengg.ac.in/uploads

# Verify Docker volume mount
docker inspect svec-cms | grep -A 10 Mounts
```

## Workflow Features

### What Happens Automatically

- ✅ **Code Build**: Compiles your Next.js application
- ✅ **Docker Image**: Creates optimized Docker image
- ✅ **Push to Registry**: Uploads to Docker Hub
- ✅ **Security Scan**: Scans for vulnerabilities (non-blocking)
- ✅ **Deploy to VPS**: Pulls and runs new container
- ✅ **Health Check**: Verifies deployment success
- ✅ **Auto Rollback**: Keeps old container if new one fails

### Deployment Process

1. **Stop old container** (if exists)
2. **Pull latest image** from Docker Hub
3. **Start new container**
4. **Mount upload directory** at `/var/www/uploads`
5. **Load environment variables** from `.env.production`
6. **Expose on port 4000**
7. **Verify** container is healthy
8. **Clean up** old images

## Manual Deployment (Fallback)

If GitHub Actions fails, you can deploy manually:

```bash
# SSH into your VPS
ssh your-user@srivasaviengg.ac.in

# Navigate to project directory
cd /var/www/srivasaviengg.ac.in

# Pull latest image
docker pull vinaysiddha/svec-cms:dev

# Stop old container
docker stop svec-cms
docker rm svec-cms

# Run new container
docker run -d \
  --name svec-cms \
  --restart unless-stopped \
  -p 4000:3000 \
  -v /var/www/srivasaviengg.ac.in/uploads:/var/www/uploads \
  --env-file .env.production \
  vinaysiddha/svec-cms:dev

# Check status
docker ps
docker logs svec-cms
```

## Security Best Practices

1. ✅ **Use SSH keys** instead of passwords
2. ✅ **Use Docker Hub Access Token** instead of password
3. ✅ **Set proper file permissions** (755 for directories, 644 for files)
4. ✅ **Keep secrets in GitHub Secrets** (never commit them)
5. ✅ **Regularly update** Docker images and packages
6. ✅ **Monitor logs** for suspicious activity
7. ✅ **Use strong JWT secret** in production

## Monitoring Deployment

### Check Deployment Status

```bash
# Via GitHub Actions UI
# Go to: https://github.com/YOUR_USERNAME/SVEC-CMS/actions

# Via SSH
ssh your-user@srivasaviengg.ac.in
docker ps
docker logs svec-cms --tail 50 --follow
```

### Check Application Health

```bash
# Check if app is responding
curl -I https://srivasaviengg.ac.in

# Check specific endpoint
curl https://srivasaviengg.ac.in/api/health

# Check Docker container stats
docker stats svec-cms
```

## Support

If you encounter issues:

1. **Check GitHub Actions logs** for build/deployment errors
2. **Check Docker logs** on VPS: `docker logs svec-cms`
3. **Check Nginx logs**: `sudo tail -f /var/log/nginx/error.log`
4. **Verify all secrets** are set correctly in GitHub
5. **Test SSH connection** from local machine to VPS

## Summary

✅ **Automatic Deployment**: Push to `dev` branch → Auto-deploy to VPS
✅ **Docker-based**: Consistent builds and deployments
✅ **Secure**: SSH keys and encrypted secrets
✅ **Monitored**: Automated health checks and verification
✅ **Rollback-friendly**: Old container preserved until new one is verified
✅ **Upload Support**: Persistent storage at `/var/www/srivasaviengg.ac.in/uploads/`

Your deployment is now fully automated! 🚀
