#!/bin/bash

# Quick Update Script - Pull latest image and restart container

echo "🔄 Quick updating SVEC-CMS..."

# Pull latest image
echo "📥 Pulling latest image..."
docker pull vinaysiddha/svec-cms:latest

# Restart using docker-compose (this will use the latest pulled image)
echo "🔄 Restarting services..."
docker-compose down
docker-compose up -d

echo "✅ Update complete! Application restarted with latest image."
echo "🌐 Check: http://localhost:3000"