@echo off
REM SVEC-CMS Production Deployment Script for Windows
REM This script pulls the latest Docker image from Docker Hub and deploys it

echo 🚀 Deploying SVEC-CMS from Docker Hub...

REM Configuration
set IMAGE_NAME=vinaysiddha/svec-cms:latest
set CONTAINER_NAME=svec-cms-app

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found. Please create it and configure your settings.
    pause
    exit /b 1
)

echo 📥 Pulling latest image from Docker Hub...
docker pull %IMAGE_NAME%
if %errorlevel% equ 0 (
    echo ✅ Successfully pulled latest image
) else (
    echo ❌ Failed to pull image from Docker Hub
    pause
    exit /b 1
)

REM Stop existing container if running
docker ps --format "{{.Names}}" | findstr "^%CONTAINER_NAME%$" >nul 2>&1
if %errorlevel% equ 0 (
    echo 🛑 Stopping existing container...
    docker stop %CONTAINER_NAME%
)

REM Remove existing container if it exists
docker ps -a --format "{{.Names}}" | findstr "^%CONTAINER_NAME%$" >nul 2>&1
if %errorlevel% equ 0 (
    echo 🗑️  Removing existing container...
    docker rm %CONTAINER_NAME%
)

REM Deploy using docker-compose
echo 🚀 Starting deployment...
docker-compose up -d
if %errorlevel% equ 0 (
    echo ✅ Deployment successful!
    echo 🌐 Application URL: http://localhost:3000
    echo 📊 Container name: %CONTAINER_NAME%
    echo 🔍 Check status: docker ps
    echo 📝 View logs: docker logs %CONTAINER_NAME%
    
    echo ⏳ Waiting for application to start...
    timeout /t 15 /nobreak >nul
    
    echo 🎉 Application should be ready! Check http://localhost:3000
    echo ✨ Deployment completed successfully!
) else (
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo 📊 Deployment Summary:
echo   Image: %IMAGE_NAME%
echo   Container: %CONTAINER_NAME%
echo   Status: Running
echo   URL: http://localhost:3000

pause