# SVEC-CMS Docker Deployment Guide

This guide provides complete instructions for deploying SVEC-CMS using Docker with remote MySQL database.

## 🚀 Quick Start

### Prerequisites
- Docker installed on your system
- Docker Compose installed
- Remote MySQL database accessible
- Basic knowledge of environment variables

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd SVEC-CMS
```

### 2. Configure Environment

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your actual values
nano .env  # or use your preferred editor
```

### 3. Build and Run

**Option A: Using Docker Compose (Recommended)**
```bash
docker-compose up -d
```

**Option B: Using Build Scripts**

On Linux/Mac:
```bash
chmod +x docker-build.sh docker-run.sh
./docker-build.sh
./docker-run.sh
```

On Windows:
```cmd
docker-build.bat
docker-run.bat
```

**Option C: Manual Docker Commands**
```bash
# Build the image
docker build -t svec-cms:latest .

# Run the container
docker run -d \
  --name svec-cms-app \
  --env-file .env \
  -p 3000:3000 \
  -v "$(pwd)/public/uploads:/app/public/uploads" \
  --restart unless-stopped \
  svec-cms:latest
```

## 📋 Environment Configuration

### Required Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration (Remote MySQL)
MYSQL_HOST=your-remote-mysql-host.com
MYSQL_PORT=3306
MYSQL_USER=your-mysql-username
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=svec_cms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Cookie Configuration
COOKIE_NAME=sid
COOKIE_MAX_AGE=86400
```

### Optional Environment Variables

```env
# AWS S3 Configuration (for file uploads)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name

# Google AI Configuration (for AI features)
GOOGLE_API_KEY=your-google-api-key

# Firebase Configuration (for additional features)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
```

## 🏗️ Docker Architecture

### Multi-Stage Build
The Dockerfile uses a multi-stage build for optimization:

1. **Dependencies Stage**: Installs production dependencies
2. **Builder Stage**: Builds the Next.js application
3. **Runner Stage**: Creates the final optimized image

### Image Specifications
- Base Image: `node:20-alpine`
- Final Image Size: ~200-300MB (optimized)
- Non-root user for security
- Health checks included
- Standalone Next.js output

## 🛠️ Management Commands

### Container Management

```bash
# Check container status
docker ps

# View logs
docker logs svec-cms-app

# Follow logs in real-time
docker logs -f svec-cms-app

# Stop the container
docker stop svec-cms-app

# Start the container
docker start svec-cms-app

# Restart the container
docker restart svec-cms-app

# Remove the container
docker rm svec-cms-app
```

### Image Management

```bash
# List images
docker images

# Remove the image
docker rmi svec-cms:latest

# Rebuild without cache
docker build --no-cache -t svec-cms:latest .
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# Scale services (if needed)
docker-compose up -d --scale svec-cms=2
```

## 🌐 Access Your Application

Once the container is running:

- **Main Application**: http://localhost:3000
- **Health Check**: http://localhost:3000/api/health

## 📊 Monitoring and Health Checks

### Built-in Health Check
The container includes a health check endpoint at `/api/health` that:
- Checks every 30 seconds
- Times out after 10 seconds
- Retries 3 times before marking as unhealthy
- Has a 40-second start period

### Monitoring Commands

```bash
# Check health status
docker inspect svec-cms-app | grep -A 5 -B 5 '"Health"'

# View health check logs
docker inspect svec-cms-app --format='{{range .State.Health.Log}}{{.Start}}: {{.Output}}{{end}}'

# Container resource usage
docker stats svec-cms-app
```

## 🔧 Troubleshooting

### Common Issues

**1. Container won't start**
```bash
# Check logs for errors
docker logs svec-cms-app

# Verify environment variables
docker exec svec-cms-app env | grep MYSQL_
```

**2. Database connection issues**
```bash
# Test database connectivity from container
docker exec svec-cms-app npm run db:test  # if you add this script

# Check if database is accessible from host
nc -zv your-db-host 3306
```

**3. Port already in use**
```bash
# Find what's using port 3000
lsof -i :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Use different port
docker run -p 3001:3000 svec-cms:latest
```

**4. Permission issues with uploads**
```bash
# Fix upload directory permissions
sudo chown -R 1001:1001 public/uploads
```

### Performance Issues

**1. Slow startup**
- Check if remote database is responding quickly
- Verify network connectivity to external services
- Review application logs for bottlenecks

**2. High memory usage**
```bash
# Monitor memory usage
docker stats --no-stream svec-cms-app

# Limit memory if needed
docker update --memory="1g" svec-cms-app
```

## 🔒 Security Considerations

### Production Deployment

1. **Use HTTPS**: Set up a reverse proxy with SSL
2. **Environment Variables**: Use Docker secrets in production
3. **Database Security**: Ensure remote database has proper firewall rules
4. **Regular Updates**: Keep the base image updated
5. **Backup Strategy**: Implement regular backups for your data

### Security Best Practices

```yaml
# Example nginx reverse proxy configuration
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - svec-cms
```

## 🚀 Production Deployment

### Using Docker Compose for Production

```yaml
version: '3.8'
services:
  svec-cms:
    image: svec-cms:latest
    deploy:
      replicas: 2
      restart_policy:
        condition: on-failure
        max_attempts: 3
    environment:
      - NODE_ENV=production
    secrets:
      - db_password
      - jwt_secret
    networks:
      - svec-network

secrets:
  db_password:
    external: true
  jwt_secret:
    external: true

networks:
  svec-network:
    driver: overlay
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Deploy SVEC-CMS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push Docker image
        run: |
          docker build -t svec-cms:${{ github.sha }} .
          docker tag svec-cms:${{ github.sha }} svec-cms:latest
          # Push to your registry
      - name: Deploy to production
        run: |
          docker-compose pull
          docker-compose up -d
```

## 📞 Support

For issues related to:
- **Docker setup**: Check the logs and troubleshooting section
- **Application errors**: Check the main project README
- **Database connectivity**: Verify your remote MySQL configuration

## 🔄 Updates and Maintenance

### Updating the Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Or using scripts
./docker-build.sh
docker stop svec-cms-app && docker rm svec-cms-app
./docker-run.sh
```

### Backup Considerations

Since the database is remote:
1. Ensure your remote MySQL has proper backup procedures
2. Backup the `public/uploads` directory if you store files locally
3. Keep your `.env` file secure and backed up

---

**Note**: This setup assumes you have a remote MySQL database. The Docker container only includes the Next.js application and connects to your external database.