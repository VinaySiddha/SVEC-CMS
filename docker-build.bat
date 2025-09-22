@echo off
REM SVEC-CMS Docker Build Script for Windows
REM This script builds the Docker image for the SVEC-CMS application

echo 🚀 Building SVEC-CMS Docker Image...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found. Creating from .env.example...
    if exist .env.example (
        copy .env.example .env >nul
        echo 📝 Please edit .env file with your actual configuration values
        echo 🔗 Make sure to set your remote MySQL connection details:
        echo    - MYSQL_HOST
        echo    - MYSQL_USER  
        echo    - MYSQL_PASSWORD
        echo    - MYSQL_DATABASE
    ) else (
        echo ❌ .env.example not found. Cannot create .env file.
        pause
        exit /b 1
    )
)

REM Load environment variables for validation
call .env.bat 2>nul

echo 🔍 Validating environment configuration...

REM Build the Docker image
echo 🔨 Building Docker image...
docker build -t svec-cms:latest .
if %errorlevel% equ 0 (
    echo ✅ Docker image built successfully!
    echo 📦 Image name: svec-cms:latest
    
    REM Show image size
    for /f "tokens=*" %%i in ('docker images svec-cms:latest --format "{{.Size}}"') do set SIZE=%%i
    echo 📏 Image size: %SIZE%
    
    echo 🎯 Ready to run SVEC-CMS with your remote MySQL database
    echo 🏃 To run the container, use: docker-run.bat
    echo 🐳 Or use docker-compose: docker-compose up -d
) else (
    echo ❌ Docker build failed!
    pause
    exit /b 1
)

pause