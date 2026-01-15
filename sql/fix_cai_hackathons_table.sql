-- Fix cai_hackathons table AUTO_INCREMENT
-- This script ensures the cai_hackathons table has proper PRIMARY KEY with AUTO_INCREMENT

-- First, check if the table exists and modify it
ALTER TABLE `cai_hackathons` 
MODIFY `id` int NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`id`);

-- Add sample data if table is empty (optional)
-- INSERT INTO `cai_hackathons` (`academic_year`, `title`, `description`, `brochure_url`, `winners_url`, `event_date`, `dept`, `status`) 
-- VALUES 
-- ('2023-24', 'Hackathon 2024', 'Annual student hackathon event', 'https://example.com/brochure.pdf', 'https://example.com/winners.pdf', '2024-03-15', 'cseai', 'approved'),
-- ('2024-25', 'Hackathon 2025', 'Annual student hackathon event', 'https://example.com/brochure2.pdf', 'https://example.com/winners2.pdf', '2025-03-15', 'cseai', 'approved');

-- Verify the table structure
DESCRIBE `cai_hackathons`;
