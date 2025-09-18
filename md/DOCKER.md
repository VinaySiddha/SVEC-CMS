# Docker Setup for SVEC-CMS

This project includes complete Docker configuration for both development and production environments.

## Files Created

- `Dockerfile` - Production-ready multi-stage Docker image
- `Dockerfile.dev` - Development Docker image with hot reload
- `docker-compose.yml` - Production Docker Compose setup
- `docker-compose.dev.yml` - Development Docker Compose setup
- `.dockerignore` - Files to exclude from Docker build context
- `.env.docker` - Environment variables for Docker
- `.env.docker.example` - Example environment file

## Quick Start

### Development Environment

1. **Copy and configure environment variables:**
   ```bash
   cp .env.docker.example .env.docker
   # Edit .env.docker with your actual values
   ```

2. **Start development environment:**
   ```bash
   npm run docker:up-dev
   ```

3. **Access the application:**
   - App: http://localhost:9002
   - phpMyAdmin: http://localhost:8081
   - MySQL: localhost:3307

### Production Environment

1. **Build and start production environment:**
   ```bash
   npm run docker:up
   ```

2. **Access the application:**
   - App: http://localhost:3000
   - phpMyAdmin: http://localhost:8080 (run with `docker-compose --profile tools up`)
   - MySQL: localhost:3306

## Available Docker Commands

### Building Images
```bash
npm run docker:build          # Build production image
npm run docker:build-dev      # Build development image
```

### Running with Docker Compose
```bash
npm run docker:up             # Start production environment
npm run docker:up-dev         # Start development environment
npm run docker:down           # Stop production environment  
npm run docker:down-dev       # Stop development environment
```

### Logs and Management
```bash
npm run docker:logs           # View production logs
npm run docker:logs-dev       # View development logs
npm run docker:restart        # Restart production services
npm run docker:clean          # Stop and clean up everything
```

### Manual Docker Commands
```bash
npm run docker:run            # Run production container manually
npm run docker:run-dev        # Run development container manually
```

## Services

### Application (Next.js)
- **Production**: Runs optimized build on port 3000
- **Development**: Runs with hot reload on port 9002
- Automatic restart on crashes
- Health checks and dependency management

### MySQL Database
- **Production**: Port 3306
- **Development**: Port 3307 (to avoid conflicts)
- Persistent data storage
- Health checks for reliable startup
- Pre-configured with database and user

### phpMyAdmin (Optional)
- **Production**: Port 8080 (requires `--profile tools`)
- **Development**: Port 8081
- Web interface for database management

## Environment Variables

Key variables to configure in `.env.docker`:

```env
# Database
DATABASE_URL=mysql://svec_user:svec_password@mysql:3306/svec_cms

# Security (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret

# External Services (if used)
AWS_ACCESS_KEY_ID=your-aws-key
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_API_KEY=your-google-key
```

## Volumes and Data Persistence

- **mysql_data**: Persistent MySQL data storage
- **mysql_dev_data**: Development MySQL data storage
- Development mode mounts source code for hot reload

## Network

All services run on a custom bridge network `svec-network` for secure inter-service communication.

## Troubleshooting

### Port Conflicts
If ports are already in use, modify the port mappings in the docker-compose files.

### Database Connection Issues
1. Ensure MySQL service is healthy: `docker-compose ps`
2. Check logs: `npm run docker:logs`
3. Verify environment variables in `.env.docker`

### Build Issues
1. Clear Docker cache: `docker system prune -f`
2. Rebuild images: `npm run docker:build`

### Development Hot Reload Not Working
Ensure volume mounts are correct and the development image is being used.

## Production Deployment

For production deployment:

1. **Update environment variables** in `.env.docker`
2. **Use proper secrets** (never use default passwords)
3. **Configure external database** if needed
4. **Set up reverse proxy** (nginx/traefik) for HTTPS
5. **Configure backup strategy** for database

## Docker Image Optimization

The production Dockerfile uses:
- Multi-stage builds for smaller images
- Alpine Linux for security and size
- Non-root user for security
- Output file tracing for minimal runtime
- Proper layer caching for faster builds

## Security Considerations

- Non-root user execution
- Minimal attack surface with Alpine
- Environment variable management
- Network isolation
- No sensitive data in images