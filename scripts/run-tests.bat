@echo off
echo 🚀 AIML Admin Dashboard Testing - Windows Launcher
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo 💡 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if we're in the correct directory
if not exist "scripts\setup-test.js" (
    echo ❌ Please run this from the svec-cms-new root directory
    echo 💡 Current directory: %CD%
    pause
    exit /b 1
)

echo ✅ Node.js found
echo 📁 Running from: %CD%
echo.

REM Run the setup script
node scripts\setup-test.js

echo.
echo 📊 Test execution completed
pause