#!/bin/bash

# SVEC-CMS Docker Run Script
# This script runs the SVEC-CMS Docker container

echo "🚀 Starting SVEC-CMS Docker Container..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="svec-cms-app"
IMAGE_NAME="svec-cms:latest"
HOST_PORT="3000"
CONTAINER_PORT="3000"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found. Please create it from .env.example and configure your settings.${NC}"
    exit 1
fi

# Load and validate environment variables
echo -e "${YELLOW}📋 Loading environment variables...${NC}"
source .env

if [ -z "$MYSQL_HOST" ] || [ -z "$MYSQL_USER" ] || [ -z "$MYSQL_PASSWORD" ] || [ -z "$MYSQL_DATABASE" ]; then
    echo -e "${RED}❌ Missing required database configuration in .env file${NC}"
    exit 1
fi

# Check if the image exists
if ! docker image inspect $IMAGE_NAME > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker image not found. Building it first...${NC}"
    ./docker-build.sh
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to build Docker image${NC}"
        exit 1
    fi
fi

# Stop and remove existing container if it exists
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
    echo -e "${YELLOW}🛑 Stopping existing container...${NC}"
    docker stop $CONTAINER_NAME > /dev/null 2>&1
    echo -e "${YELLOW}🗑️  Removing existing container...${NC}"
    docker rm $CONTAINER_NAME > /dev/null 2>&1
fi

# Run the container
echo -e "${YELLOW}🏃 Starting new container...${NC}"
echo -e "${BLUE}🔗 Connecting to MySQL: ${MYSQL_USER}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}${NC}"

docker run -d \
    --name $CONTAINER_NAME \
    --env-file .env \
    -p $HOST_PORT:$CONTAINER_PORT \
    -v "$(pwd)/public/uploads:/app/public/uploads" \
    --restart unless-stopped \
    $IMAGE_NAME

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Container started successfully!${NC}"
    echo -e "${GREEN}🌐 Application URL: http://localhost:${HOST_PORT}${NC}"
    echo -e "${GREEN}🏥 Health Check: http://localhost:${HOST_PORT}/api/health${NC}"
    echo -e "${BLUE}📊 Container name: ${CONTAINER_NAME}${NC}"
    echo -e "${BLUE}🔍 Check status: docker ps${NC}"
    echo -e "${BLUE}📝 View logs: docker logs ${CONTAINER_NAME}${NC}"
    echo -e "${BLUE}⏹️  Stop container: docker stop ${CONTAINER_NAME}${NC}"
    
    echo -e "${YELLOW}⏳ Waiting for application to start...${NC}"
    sleep 10
    
    # Check if the application is responding
    if curl -s http://localhost:${HOST_PORT}/api/health > /dev/null; then
        echo -e "${GREEN}🎉 Application is ready and responding!${NC}"
        echo -e "${GREEN}🌐 Access your SVEC-CMS at: http://localhost:${HOST_PORT}${NC}"
        echo -e "${GREEN}📊 Database: Connected to ${MYSQL_HOST}${NC}"
    else
        echo -e "${YELLOW}⚠️  Application might still be starting. Check logs if needed:${NC}"
        echo -e "${YELLOW}   docker logs ${CONTAINER_NAME}${NC}"
    fi
else
    echo -e "${RED}❌ Failed to start container!${NC}"
    exit 1
fi