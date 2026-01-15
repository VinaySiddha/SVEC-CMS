-- Fix cai_hackathon_gallery table AUTO_INCREMENT
-- This script ensures the cai_hackathon_gallery table has proper PRIMARY KEY with AUTO_INCREMENT

-- Modify the table to add AUTO_INCREMENT to id field
ALTER TABLE `cai_hackathon_gallery` 
MODIFY `id` int NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`id`);

-- Verify the table structure
DESCRIBE `cai_hackathon_gallery`;
