-- Insert Mechanical Engineering MOUs Data

-- Clear existing data
DELETE FROM mech_mous;

-- Insert Industry MOUs
INSERT INTO mech_mous (type, data, created_at) VALUES 
('industry', JSON_OBJECT('organization', 'National Institute of Technology, Andhra Pradesh (NITAP)', 'industry_type', 'Educational Institution', 'date_of_mou', '15 Jun 2022', 'validity', '3 Years'), NOW()),
('industry', JSON_OBJECT('organization', 'EduSkills Foundation', 'industry_type', 'Training & Skill Development', 'date_of_mou', '10 Aug 2022', 'validity', '2 Years'), NOW()),
('industry', JSON_OBJECT('organization', 'Andhra Pradesh State Skill Development Corporation (APSSDC)', 'industry_type', 'Government Skill Development', 'date_of_mou', '05 Jan 2022', 'validity', '3 Years'), NOW()),
('industry', JSON_OBJECT('organization', 'SVR Technologies', 'industry_type', 'Technology Solutions', 'date_of_mou', '20 Nov 2021', 'validity', '2 Years'), NOW()),
('industry', JSON_OBJECT('organization', 'Siemens Centre of Excellence', 'industry_type', 'Industrial Automation', 'date_of_mou', '12 Feb 2021', 'validity', '5 Years'), NOW());

-- Insert Activities Under MOUs
INSERT INTO mech_mous (type, data, created_at) VALUES 
('activity', JSON_OBJECT(
  'category', 'NITAP Collaboration',
  'activities', JSON_ARRAY(
    JSON_OBJECT('description', 'Various activities organized / conducted under MoU of NITAP AY: 2022-23', 'link', '#'),
    JSON_OBJECT('description', 'Joint Research Projects: 2 ongoing faculty research collaborations'),
    JSON_OBJECT('description', 'Faculty Development Programs: 3 FDPs conducted'),
    JSON_OBJECT('description', 'Student Exchange Programs: 15 students participated in technical workshops')
  )
), NOW()),
('activity', JSON_OBJECT(
  'category', 'EduSkills Foundation Programs',
  'activities', JSON_ARRAY(
    JSON_OBJECT('description', 'Various activities organized / conducted under MoU of Eduskills AY: 2022-23', 'link', '#'),
    JSON_OBJECT('description', 'Skill Development Programs: 120+ students trained in advanced CAD/CAM tools'),
    JSON_OBJECT('description', 'Certification Courses: 85 students received industry-recognized certifications'),
    JSON_OBJECT('description', 'Industry Connect Programs: 4 industry experts conducted specialized training sessions')
  )
), NOW()),
('activity', JSON_OBJECT(
  'category', 'APSSDC Initiatives',
  'activities', JSON_ARRAY(
    JSON_OBJECT('description', 'Various activities organized / conducted under MoU of APSSDC AY: 2022-23', 'link', '#'),
    JSON_OBJECT('description', 'Various activities organized / conducted under MoU of APSSDC AY: 2020-21', 'link', '#'),
    JSON_OBJECT('description', 'Technical Workshops: 6 workshops on emerging technologies'),
    JSON_OBJECT('description', 'Entrepreneurship Development Programs: 2 EDPs conducted')
  )
), NOW()),
('activity', JSON_OBJECT(
  'category', 'Industry Internships & Training',
  'activities', JSON_ARRAY(
    JSON_OBJECT('description', 'SVR Technologies: 18 students completed industry internships'),
    JSON_OBJECT('description', 'Siemens Centre of Excellence: 45 students received specialized training'),
    JSON_OBJECT('description', 'Guest Lectures: 8 industry experts delivered specialized talks'),
    JSON_OBJECT('description', 'Industry Visits: 3 industrial visits organized for practical exposure')
  )
), NOW());

-- Verify data was inserted
SELECT COUNT(*) as total_mous, 
       SUM(CASE WHEN type = 'industry' THEN 1 ELSE 0 END) as industry_count,
       SUM(CASE WHEN type = 'activity' THEN 1 ELSE 0 END) as activity_count
FROM mech_mous;
