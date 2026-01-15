-- Insert sample hackathon data into cai_hackathons table

-- Clear existing test data (optional)
-- DELETE FROM cai_hackathons WHERE dept = 'cse-ai';

-- Insert sample hackathons
INSERT INTO `cai_hackathons` (`title`, `academic_year`, `dept`, `brochure_url`, `winners_url`, `gallery`, `description`) VALUES
('AI Innovation Challenge 2024', '2024-25', 'cse-ai', 
 'https://srivasaviengg.ac.in/uploads/hackathons/brochure-2024-25.pdf', 
 'https://srivasaviengg.ac.in/uploads/hackathons/winners-2024-25.pdf',
 'https://srivasaviengg.ac.in/uploads/hackathons/gallery/2024-img1.jpg,https://srivasaviengg.ac.in/uploads/hackathons/gallery/2024-img2.jpg',
 'Annual AI hackathon for students to showcase their innovation'),

('Machine Learning Marathon 2023', '2023-24', 'cse-ai',
 'https://srivasaviengg.ac.in/uploads/hackathons/brochure-2023-24.pdf',
 'https://srivasaviengg.ac.in/uploads/hackathons/winners-2023-24.pdf',
 'https://srivasaviengg.ac.in/uploads/hackathons/gallery/2023-img1.jpg,https://srivasaviengg.ac.in/uploads/hackathons/gallery/2023-img2.jpg',
 'Machine learning focused coding competition');

-- Verify the data was inserted
SELECT * FROM cai_hackathons WHERE dept = 'cse-ai' ORDER BY academic_year DESC;
