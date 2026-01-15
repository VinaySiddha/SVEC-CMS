@echo off
REM Video Compression Script for DroneView.mp4 (Windows)
REM This script optimizes video for web using FFmpeg

echo 🎬 Video Optimization Script (Windows)
echo =====================================
echo.

REM Check if FFmpeg is installed
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ FFmpeg is not installed!
    echo.
    echo Install FFmpeg:
    echo 1. Download from: https://ffmpeg.org/download.html
    echo 2. Or use: choco install ffmpeg (if you have Chocolatey)
    echo 3. Add ffmpeg to PATH environment variable
    echo.
    pause
    exit /b 1
)

REM Check if source video exists
if not exist "public\DroneView.mp4" (
    echo ❌ Error: public\DroneView.mp4 not found!
    pause
    exit /b 1
)

echo Original video: public\DroneView.mp4
for /f "tokens=*" %%A in ('dir /b public\DroneView.mp4 ^| find /v /c ""') do set filecount=%%A
for %%A in (public\DroneView.mp4) do set "filesize=%%~zA"
set /A filesizeMB=%filesize% / 1048576
echo File size: %filesizeMB% MB
echo.

REM Create backup
echo 📦 Creating backup...
copy "public\DroneView.mp4" "public\DroneView_original.mp4" >nul
echo ✅ Backup saved to: public\DroneView_original.mp4
echo.

REM Optimize video
echo 🔧 Compressing video (CRF 28 - Medium quality)...
echo This will take 10-30 minutes depending on video length...
echo.

ffmpeg -i "public\DroneView_original.mp4" ^
  -c:v libx264 ^
  -preset slow ^
  -crf 28 ^
  -s 1920x1080 ^
  -b:v 3000k ^
  -maxrate 3500k ^
  -bufsize 7000k ^
  -c:a aac ^
  -b:a 128k ^
  -movflags +faststart ^
  "public\DroneView_optimized.mp4"

if %errorlevel% equ 0 (
    echo.
    echo ✅ Compression successful!
    echo.
    
    REM Get optimized file size
    for %%A in (public\DroneView_optimized.mp4) do set "optimizedsize=%%~zA"
    set /A optimizedMB=%optimizedsize% / 1048576
    
    echo Original size: %filesizeMB% MB
    echo Optimized size: %optimizedMB% MB
    set /A reduction=100 - (%optimizedsize% * 100 / %filesize%)
    echo Reduction: ~%reduction%% ✅
    echo.
    
    REM Replace original
    echo 📥 Replacing original with optimized version...
    del "public\DroneView.mp4"
    move "public\DroneView_optimized.mp4" "public\DroneView.mp4" >nul
    echo ✅ Replacement complete!
    echo.
    
    echo Next steps:
    echo 1. Test the video in your application
    echo 2. Check DevTools Network tab for load time
    echo 3. Verify quality is acceptable
    echo 4. Delete the backup if satisfied: del public\DroneView_original.mp4
    echo.
    
) else (
    echo.
    echo ❌ Compression failed!
    echo Restoring original file...
    if exist "public\DroneView_optimized.mp4" del "public\DroneView_optimized.mp4"
    pause
    exit /b 1
)

pause
