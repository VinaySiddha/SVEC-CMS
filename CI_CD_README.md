# SVEC-CMS Automated CI/CD with Docker Hub

This documentation explains the automated CI/CD pipeline that builds and pushes Docker images to Docker Hub whenever you commit code.

## 🚀 How It Works

### Automatic Triggers
The GitHub Actions workflow automatically triggers on:
- **Push to main branches**: `main`, `master`, `celigo@abhi`
- **Pull requests** to main branches
- **Manual trigger** from GitHub Actions tab

### What Happens When You Commit

1. **Code Push** → GitHub detects the push
2. **GitHub Actions** → Workflow starts automatically
3. **Docker Build** → Creates optimized Docker image
4. **Docker Push** → Pushes to `vinaysiddha/svec-cms:latest`
5. **Multi-platform** → Builds for both AMD64 and ARM64
6. **Security Scan** → Scans image for vulnerabilities
7. **Notification** → Confirms successful deployment

## 📋 Setup Instructions

### 1. Configure GitHub Secrets

You need to add Docker Hub credentials to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `DOCKER_USERNAME`: `vinaysiddha`
   - `DOCKER_PASSWORD`: Your Docker Hub access token

[Detailed setup guide](.github/DOCKER_HUB_SETUP.md)

### 2. Workflow Files

The automation is configured in:
- `.github/workflows/docker-build-push.yml` - Main workflow
- `.github/DOCKER_HUB_SETUP.md` - Setup guide

## 🛠️ Usage

### For Development (Local Build)
```bash
# Use development compose file (builds locally)
docker-compose -f docker-compose.dev.yml up -d
```

### For Production (Docker Hub Image)
```bash
# Use production compose file (pulls from Docker Hub)
docker-compose up -d

# Or use deployment scripts
./deploy.sh        # Linux/Mac
deploy.bat         # Windows
```

### Quick Updates
When you want to pull the latest image without full deployment:
```bash
./update.sh        # Linux/Mac
update.bat         # Windows
```

## 📦 Docker Images

### Image Naming Convention
- **Latest stable**: `vinaysiddha/svec-cms:latest`
- **Branch specific**: `vinaysiddha/svec-cms:celigo@abhi`
- **Commit specific**: `vinaysiddha/svec-cms:celigo@abhi-sha256abc`

### Image Features
- **Multi-platform**: Supports AMD64 and ARM64
- **Optimized size**: ~200-300MB using multi-stage build
- **Security**: Runs as non-root user
- **Health checks**: Built-in application health monitoring
- **Caching**: Uses GitHub Actions cache for faster builds

## 🔄 Deployment Workflow

### Automatic Deployment
1. **Commit & Push** your changes
2. **Wait 2-3 minutes** for image to build and push
3. **Run deployment script** to get latest image:
   ```bash
   ./deploy.sh  # Pulls latest and deploys
   ```

### Manual Deployment
```bash
# Pull latest image
docker pull vinaysiddha/svec-cms:latest

# Start with docker-compose
docker-compose up -d
```

## 📊 Monitoring

### Check Build Status
- Go to **GitHub Actions** tab in your repository
- View build logs and status
- Monitor security scan results

### Application Health
```bash
# Check container status
docker ps

# View application logs
docker logs svec-cms-app

# Check health endpoint
curl http://localhost:3000/api/health
```

## 🔧 Available Scripts

### Production Deployment
- `deploy.sh` / `deploy.bat` - Full deployment with latest image
- `update.sh` / `update.bat` - Quick update without full setup

### Development
- `docker-build.sh` / `docker-build.bat` - Build locally
- `docker-run.sh` / `docker-run.bat` - Run local build

### Docker Compose Files
- `docker-compose.yml` - Production (uses Docker Hub image)
- `docker-compose.dev.yml` - Development (builds locally)

## 🚨 Troubleshooting

### Build Failures
1. **Check GitHub Actions logs** for detailed error messages
2. **Verify secrets** are correctly configured
3. **Test local build** to ensure Dockerfile is valid

### Deployment Issues
```bash
# Check if latest image is available
docker pull vinaysiddha/svec-cms:latest

# View container logs
docker logs svec-cms-app

# Restart container
docker-compose restart
```

### Common Issues
- **Image not found**: Wait for build to complete (2-3 minutes)
- **Permission errors**: Check Docker Hub credentials
- **Build timeout**: Large changes might take longer to build

## 🔒 Security Features

### Automated Security Scanning
- **Trivy scanner** checks for vulnerabilities
- **Results uploaded** to GitHub Security tab
- **Automatic notifications** for security issues

### Best Practices
- Uses **access tokens** instead of passwords
- **Multi-stage builds** minimize attack surface
- **Non-root user** in container
- **Regular base image updates**

## 📈 Performance

### Build Optimization
- **Layer caching** reduces build time
- **Multi-platform builds** for compatibility
- **Parallel builds** for faster CI/CD

### Runtime Optimization
- **Standalone Next.js** output for smaller images
- **Alpine Linux** base for minimal footprint
- **Health checks** for reliability

## 🌍 Production Considerations

### Scaling
```yaml
# Scale multiple instances
docker-compose up -d --scale svec-cms=3
```

### Load Balancing
Consider adding Nginx reverse proxy:
```bash
# Add nginx service to docker-compose.yml
# Configure load balancing between instances
```

### Monitoring
- Set up application monitoring
- Configure log aggregation
- Implement backup strategies

## 📞 Support

### GitHub Actions Issues
- Check the **Actions** tab for build logs
- Verify repository secrets configuration
- Ensure Docker Hub account has proper permissions

### Docker Hub Issues
- Verify image exists: `docker pull vinaysiddha/svec-cms:latest`
- Check Docker Hub repository permissions
- Ensure access token is valid

### Application Issues
- Check container logs: `docker logs svec-cms-app`
- Verify environment variables in `.env`
- Test database connectivity

---

## 🎉 Benefits of This Setup

✅ **Automatic builds** on every commit  
✅ **Multi-platform support** (AMD64/ARM64)  
✅ **Security scanning** with vulnerability reports  
✅ **Fast deployments** with cached builds  
✅ **Zero-downtime updates** with proper scripting  
✅ **Production-ready** with health checks  
✅ **Easy rollbacks** with tagged versions  
✅ **Cross-platform deployment** scripts  

Now whenever you push code, your Docker image will be automatically built and available on Docker Hub within 2-3 minutes!