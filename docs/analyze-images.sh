#!/bin/bash

# Image Optimization Analysis Script for Department Pages
# This script helps identify all <img> tags that need to be optimized

echo "=== Department Images Optimization Analysis ==="
echo ""

# Count total <img> tags
echo "📊 Total <img> tags found in department pages:"
grep -r "<img" src/pages/departments/ | wc -l

echo ""
echo "📁 Breakdown by department:"
echo ""

for file in src/pages/departments/*.tsx; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    count=$(grep -c "<img" "$file" 2>/dev/null || echo 0)
    if [ "$count" -gt 0 ]; then
      echo "  $filename: $count <img> tags"
    fi
  fi
done

echo ""
echo "🎯 Image types detected:"
echo ""

# Check for different image sources
echo "  Gallery images (database URLs):"
grep -r "gallery.*\${" src/pages/departments/ | wc -l

echo "  Static images (srivasaviengg.ac.in):"
grep -r "srivasaviengg.ac.in" src/pages/departments/ | wc -l

echo "  Local images (/images/):"
grep -r "/images/" src/pages/departments/ | wc -l

echo ""
echo "📈 Migration Status:"
echo ""

# Check which files already use Image component
echo "  Files using Next.js Image component:"
grep -r "import Image from 'next/image'" src/pages/departments/ | wc -l

echo "  Files still using <img> tags:"
grep -r "<img" src/pages/departments/ | cut -d: -f1 | sort -u | wc -l

echo ""
echo "✅ Run this script to identify images needing optimization"
echo "📝 Use DEPARTMENT_IMAGES_OPTIMIZATION_GUIDE.md for detailed instructions"
