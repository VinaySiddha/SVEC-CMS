#!/bin/bash
# Video Compression Script for DroneView.mp4
# This script optimizes video for web using FFmpeg

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed!"
    echo "Install it from: https://ffmpeg.org/download.html"
    echo ""
    echo "Quick installation:"
    echo "  Windows: Download from ffmpeg.org or use: choco install ffmpeg"
    echo "  Mac: brew install ffmpeg"
    echo "  Linux: sudo apt install ffmpeg"
    exit 1
fi

# Check if source video exists
if [ ! -f "public/DroneView.mp4" ]; then
    echo "❌ Error: public/DroneView.mp4 not found!"
    exit 1
fi

echo "🎬 Video Optimization Script"
echo "============================"
echo ""

# Get original file size
ORIGINAL_SIZE=$(du -h "public/DroneView.mp4" | cut -f1)
echo "Original video: public/DroneView.mp4"
echo "File size: $ORIGINAL_SIZE"
echo ""

# Create backup
echo "📦 Creating backup..."
cp "public/DroneView.mp4" "public/DroneView_original.mp4"
echo "✅ Backup saved to: public/DroneView_original.mp4"
echo ""

# Optimize video (Medium quality - recommended)
echo "🔧 Compressing video (CRF 28 - Medium quality)..."
echo "This will take 10-30 minutes depending on video length..."
echo ""

ffmpeg -i "public/DroneView_original.mp4" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -s 1920x1080 \
  -b:v 3000k \
  -maxrate 3500k \
  -bufsize 7000k \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -progress pipe:1 \
  "public/DroneView_optimized.mp4"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Compression successful!"
    echo ""
    
    # Get optimized file size
    OPTIMIZED_SIZE=$(du -h "public/DroneView_optimized.mp4" | cut -f1)
    OPTIMIZED_SIZE_BYTES=$(stat -f%z "public/DroneView_optimized.mp4" 2>/dev/null || stat -c%s "public/DroneView_optimized.mp4" 2>/dev/null)
    ORIGINAL_SIZE_BYTES=$(stat -f%z "public/DroneView_original.mp4" 2>/dev/null || stat -c%s "public/DroneView_original.mp4" 2>/dev/null)
    REDUCTION=$((100 - (OPTIMIZED_SIZE_BYTES * 100 / ORIGINAL_SIZE_BYTES)))
    
    echo "Original size: $ORIGINAL_SIZE"
    echo "Optimized size: $OPTIMIZED_SIZE"
    echo "Reduction: ~${REDUCTION}%"
    echo ""
    
    # Replace original with optimized
    echo "📥 Replacing original with optimized version..."
    rm "public/DroneView.mp4"
    mv "public/DroneView_optimized.mp4" "public/DroneView.mp4"
    echo "✅ Replacement complete!"
    echo ""
    
    echo "Next steps:"
    echo "1. Test the video in your application"
    echo "2. Check DevTools Network tab for load time"
    echo "3. Verify quality is acceptable"
    echo "4. Delete the backup if satisfied: rm public/DroneView_original.mp4"
    echo ""
    
else
    echo ""
    echo "❌ Compression failed!"
    echo "Restoring original file..."
    rm "public/DroneView_optimized.mp4" 2>/dev/null
    exit 1
fi
