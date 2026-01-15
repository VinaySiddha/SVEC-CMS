#!/usr/bin/env python3
"""
Copy ECT section to ECE section, replacing ect_ table names with ece_
"""

# Read the file
file_path = r"e:\svec-cms-new\src\config\module-fields.ts"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find ECE and ECT sections
ece_start_marker = "  'ece': {"
civil_start_marker = "  },\n  // ================================================================================================\n  // CIVIL DEPARTMENT"

ect_start_marker = "  'ect': {"
final_marker = "};\n\n// ================================================================================================\n// UTILITY FUNCTIONS"

# Get section positions
ece_start = content.find(ece_start_marker)
ece_end = content.find(civil_start_marker, ece_start)

ect_start = content.find(ect_start_marker)
ect_end = content.rfind("},\n};", ect_start) + 4  # Find the closing }; for ect

print(f"ECE section: {ece_start} to {ece_end}")
print(f"ECT section: {ect_start} to {ect_end}")

# Extract ECT section
ect_section = content[ect_start:ect_end]

# Replace ect_ with ece_ in the ECT section
ece_section = ect_section.replace("'ect':", "'ece':").replace("ect_", "ece_")

# Build the new content
new_content = (
    content[:ece_start] +
    ece_section +
    content[ece_end:]
)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ ECE section successfully replaced with ECT template (with ece_ table names)")
