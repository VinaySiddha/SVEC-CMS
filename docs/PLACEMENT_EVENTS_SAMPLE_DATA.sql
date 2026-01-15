-- Sample Data for Placement Events Module (for testing)

-- Insert sample events
INSERT INTO placement_events (title, circular_url, link, guidelines_url) VALUES 
(
  'TCS Recruitment Drive 2026',
  '/uploads/placement_events/circular/tcs_recruitment_2026.pdf',
  'https://www.tcs.com/careers',
  '/uploads/placement_events/guidelines/tcs_guidelines_2026.pdf'
),
(
  'Infosys Campus Hiring',
  '/uploads/placement_events/circular/infosys_campus_2026.pdf',
  'https://www.infosys.com/careers/job-search.html',
  '/uploads/placement_events/guidelines/infosys_guidelines_2026.pdf'
),
(
  'Accenture Recruitment Program',
  '/uploads/placement_events/circular/accenture_recruitment.pdf',
  'https://www.accenture.com/us-en/careers',
  '/uploads/placement_events/guidelines/accenture_guidelines.pdf'
),
(
  'Wipro Campus Drive',
  '/uploads/placement_events/circular/wipro_campus_drive.pdf',
  'https://careers.wipro.com/',
  '/uploads/placement_events/guidelines/wipro_guidelines.pdf'
),
(
  'HCL Technologies Hiring',
  '/uploads/placement_events/circular/hcl_hiring_2026.pdf',
  'https://www.hcltech.com/careers',
  '/uploads/placement_events/guidelines/hcl_guidelines_2026.pdf'
),
(
  'IBM Campus Recruitment',
  '/uploads/placement_events/circular/ibm_campus_recruitment.pdf',
  'https://www.ibm.com/careers',
  '/uploads/placement_events/guidelines/ibm_guidelines.pdf'
),
(
  'Cognizant Campus Connect',
  '/uploads/placement_events/circular/cognizant_campus_connect.pdf',
  'https://www.cognizant.com/careers',
  '/uploads/placement_events/guidelines/cognizant_guidelines.pdf'
),
(
  'Tech Mahindra Campus Program',
  '/uploads/placement_events/circular/tech_mahindra_campus.pdf',
  'https://careers.techmahindra.com/',
  '/uploads/placement_events/guidelines/tech_mahindra_guidelines.pdf'
),
(
  'Capgemini Graduate Programme',
  '/uploads/placement_events/circular/capgemini_graduate.pdf',
  'https://www.capgemini.com/careers/',
  '/uploads/placement_events/guidelines/capgemini_guidelines.pdf'
),
(
  'Deloitte Campus Recruitment',
  '/uploads/placement_events/circular/deloitte_campus.pdf',
  'https://www2.deloitte.com/in/en/pages/careers/articles/careers-landing.html',
  '/uploads/placement_events/guidelines/deloitte_guidelines.pdf'
);

-- Verify inserted data
SELECT * FROM placement_events ORDER BY created_at DESC;

-- Count total events
SELECT COUNT(*) as total_events FROM placement_events;

-- Check events with all fields populated
SELECT COUNT(*) as complete_events 
FROM placement_events 
WHERE circular_url IS NOT NULL 
AND link IS NOT NULL 
AND guidelines_url IS NOT NULL;

-- Get events created in last 30 days
SELECT * FROM placement_events 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY created_at DESC;

-- Search for TCS events
SELECT * FROM placement_events 
WHERE title LIKE '%TCS%'
ORDER BY created_at DESC;

-- Get latest 5 events
SELECT * FROM placement_events 
ORDER BY created_at DESC 
LIMIT 5;

-- Count events by partial title match
SELECT 
  CASE 
    WHEN title LIKE '%TCS%' THEN 'TCS'
    WHEN title LIKE '%Infosys%' THEN 'Infosys'
    WHEN title LIKE '%Accenture%' THEN 'Accenture'
    WHEN title LIKE '%Wipro%' THEN 'Wipro'
    ELSE 'Others'
  END as Company,
  COUNT(*) as Count
FROM placement_events
GROUP BY Company;
