#!/bin/bash

# SVEC-CMS Docker Build Script
# This script builds the Docker image for the SVEC-CMS application

echo "🚀 Building SVEC-CMS Docker Image..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}📝 Please edit .env file with your actual configuration values${NC}"
        echo -e "${YELLOW}🔗 Make sure to set your remote MySQL connection details:${NC}"
        echo -e "${YELLOW}   - MYSQL_HOST=${NC}"
        echo -e "${YELLOW}   - MYSQL_USER=${NC}"
        echo -e "${YELLOW}   - MYSQL_PASSWORD=${NC}"
        echo -e "${YELLOW}   - MYSQL_DATABASE=${NC}"
    else
        echo -e "${RED}❌ .env.example not found. Cannot create .env file.${NC}"
        exit 1
    fi
fi

# Validate required environment variables
echo -e "${YELLOW}🔍 Validating environment configuration...${NC}"
source .env

if [ -z "$MYSQL_HOST" ] || [ -z "$MYSQL_USER" ] || [ -z "$MYSQL_PASSWORD" ] || [ -z "$MYSQL_DATABASE" ]; then
    echo -e "${RED}❌ Missing required database configuration in .env file${NC}"
    echo -e "${RED}   Please set: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE${NC}"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo -e "${RED}❌ Missing JWT_SECRET in .env file${NC}"
    exit 1
fi

# Build the Docker image
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
if docker build -t svec-cms:latest .; then
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo -e "${GREEN}📦 Image name: svec-cms:latest${NC}"
    
    # Show image size
    SIZE=$(docker images svec-cms:latest --format "{{.Size}}")
    echo -e "${GREEN}📏 Image size: ${SIZE}${NC}"
    
    echo -e "${GREEN}🎯 Configuration Summary:${NC}"
    echo -e "${GREEN}   Database Host: ${MYSQL_HOST}${NC}"
    echo -e "${GREEN}   Database Name: ${MYSQL_DATABASE}${NC}"
    echo -e "${GREEN}   Database User: ${MYSQL_USER}${NC}"
    
    echo -e "${YELLOW}🏃 To run the container, use: ./docker-run.sh${NC}"
    echo -e "${YELLOW}🐳 Or use docker-compose: docker-compose up -d${NC}"
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi