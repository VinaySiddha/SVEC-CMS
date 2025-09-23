@echo off
REM Quick Update Script for Windows - Pull latest image and restart container

echo 🔄 Quick updating SVEC-CMS...

REM Pull latest image
echo 📥 Pulling latest image...
docker pull vinaysiddha/svec-cms:latest

REM Restart using docker-compose (this will use the latest pulled image)
echo 🔄 Restarting services...
docker-compose down
docker-compose up -d

echo ✅ Update complete! Application restarted with latest image.
echo 🌐 Check: http://localhost:3000

pause