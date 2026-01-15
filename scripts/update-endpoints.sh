#!/bin/bash
# This script updates all API endpoints to use connection pooling instead of creating new connections

# Files to update (CAI department endpoints)
endpoints=(
  "cai-technical-faculty.ts"
  "cai-staff.ts"
  "cai-handbooks.ts"
  "cai-workshops.ts"
  "cai-academictoppers.ts"
  "cai-department-overview.ts"
  "cai-bos-members.ts"
  "cai-bos-minutes.ts"
  "cai-hackathons.ts"
  "cai-hackathons-gallery.ts"
  "cai-technical-association-gallery.ts"
  "cai-extra-curricular-gallery.ts"
  "cai-placements.ts"
)

# Replace mysql.createConnection with connection pool
for endpoint in "${endpoints[@]}"; do
  file="src/pages/api/$endpoint"
  if [ -f "$file" ]; then
    echo "Updating $file..."
    # Replace import statement
    sed -i "s/import mysql from 'mysql2\/promise';/import { getConnection, executeQuery } from '..\/..\/lib\/dbPool';/" "$file"
    # Replace createConnection with pool
    sed -i "s/const connection = await mysql.createConnection({[^}]*});/\/\/ Using connection pool from dbPool.ts/" "$file"
    # Remove the final connection.end()
    sed -i "/await connection.end();/d" "$file"
    echo "✓ Updated $file"
  fi
done

echo "All endpoints updated to use connection pooling!"
