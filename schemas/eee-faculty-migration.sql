-- EEE Faculty Migration SQL Script
-- Direct insert statements for EEE department faculty

USE svec_cms;

-- Clear existing EEE faculty data (optional - comment out if you want to keep existing data)
DELETE FROM faculty_profiles WHERE dept = 'eee';

-- Insert EEE Faculty Data
INSERT INTO faculty_profiles (
    name, 
    qualification, 
    designation, 
    profile_url, 
    dept, 
    status, 
    specialization,
    email,
    bio,
    research_interests,
    experience_years,
    created_at
) VALUES 
('Dr.Ch.Rambabu', 'Ph.D', 'Professor & Dean(Student Affairs)', 'https://srivasaviengg.ac.in/faculty_profile/Dr.Ch.Rambabu206-rambabusir.pdf', 'eee', 'approved', 'Power Systems, Electrical Machines', 'ch.rambabu@svec.edu.in', 'Dr. Ch. Rambabu is a Professor and Dean(Student Affairs) in the Department of Electrical and Electronics Engineering with extensive research experience.', 'Power Systems, Smart Grid Technology, Renewable Energy', 20, NOW()),

('Dr. D. Sudha Rani', 'Ph.D', 'Professor & HOD', 'https://srivasaviengg.ac.in/faculty_profile/eee_Dr.%20Sudha%20Rani%20Donepudi.pdf', 'eee', 'approved', 'Control Systems, Power Electronics', 'd.sudharani@svec.edu.in', 'Dr. D. Sudha Rani is a Professor and Head of Department of Electrical and Electronics Engineering.', 'Control Systems, Power Electronics, VLSI Design', 18, NOW()),

('Dr. Chappa Anil Kumar', 'Ph.D', 'Assoc. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_Ch.Anil%20Kumar.pdf', 'eee', 'approved', 'Power Systems, Renewable Energy', 'ch.anilkumar@svec.edu.in', 'Dr. Chappa Anil Kumar is an Associate Professor specializing in power systems and renewable energy technologies.', 'Power Systems, Renewable Energy, Smart Grids', 15, NOW()),

('Mr. U. Chandra Rao', 'M.Tech.,(Ph.D)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Rao.pdf', 'eee', 'approved', 'Electrical Machines, Power Electronics', 'u.chandrarao@svec.edu.in', 'Mr. U. Chandra Rao is a Senior Assistant Professor with expertise in electrical machines and power electronics.', 'Electrical Machines, Power Electronics, Motor Drives', 12, NOW()),

('Mr. N. Sri Harish', 'M.Tech', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_N.SriharishHarish.pdf', 'eee', 'approved', 'Control Systems, Automation', 'n.sriharish@svec.edu.in', 'Mr. N. Sri Harish is a Senior Assistant Professor specializing in control systems and automation.', 'Control Systems, Industrial Automation, PLC Programming', 10, NOW()),

('Mr. Ch.V S R Gopala Krishna', 'M.Tech(Ph.D)', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/Ch.V%20S%20R%20G%20Krishna6Ch.V.S.R.%20Gopal%20Krishna.pdf', 'eee', 'approved', 'Power Systems, Protection', 'ch.gopalakrishna@svec.edu.in', 'Mr. Ch.V S R Gopala Krishna is a Senior Assistant Professor with expertise in power systems and protection schemes.', 'Power Systems Protection, Relay Coordination, SCADA', 11, NOW()),

('Mr. K.Ramesh Babu', 'M.Tech', 'Sr. Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_K.Ramesh%20Babu.pdf', 'eee', 'approved', 'Power Electronics, Drives', 'k.rameshbabu@svec.edu.in', 'Mr. K. Ramesh Babu is a Senior Assistant Professor specializing in power electronics and electrical drives.', 'Power Electronics, Motor Drives, Inverters', 9, NOW()),

('Mr. K.Suresh', 'M.Tech.,(Ph.D)', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_K.Suresh.pdf', 'eee', 'approved', 'Electrical Machines, Renewable Energy', 'k.suresh@svec.edu.in', 'Mr. K. Suresh is an Assistant Professor with research interests in electrical machines and renewable energy systems.', 'Electrical Machines, Wind Energy, Solar Power', 8, NOW()),

('Mr. M.T.V.L. Ravi Kumar', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_M.T.V.L.%20Ravi%20Kumar.pdf', 'eee', 'approved', 'Power Systems, High Voltage Engineering', 'mtvl.ravikumar@svec.edu.in', 'Mr. M.T.V.L. Ravi Kumar is an Assistant Professor specializing in power systems and high voltage engineering.', 'High Voltage Engineering, Insulation Coordination, Lightning Protection', 7, NOW()),

('Mr. L. Suresh', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_L.Suresh.pdf', 'eee', 'approved', 'Control Systems, Instrumentation', 'l.suresh@svec.edu.in', 'Mr. L. Suresh is an Assistant Professor with expertise in control systems and instrumentation engineering.', 'Control Systems, Process Control, Instrumentation', 6, NOW()),

('Mrs. B. Swathi', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_B.Swathi.pdf', 'eee', 'approved', 'Power Electronics, Electric Vehicles', 'b.swathi@svec.edu.in', 'Mrs. B. Swathi is an Assistant Professor specializing in power electronics and electric vehicle technology.', 'Power Electronics, Electric Vehicles, Battery Management Systems', 5, NOW()),

('Mr. S. Mahesh', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_S.Mahesh.pdf', 'eee', 'approved', 'Electrical Machines, Power Quality', 's.mahesh@svec.edu.in', 'Mr. S. Mahesh is an Assistant Professor with research interests in electrical machines and power quality.', 'Electrical Machines, Power Quality, Harmonics Analysis', 6, NOW()),

('Mr. V. Hari Krishnan', 'M.Tech.,(Ph.D)', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Hari%20Krishnan.pdf', 'eee', 'approved', 'Power Systems, Smart Grids', 'v.harikrishnan@svec.edu.in', 'Mr. V. Hari Krishnan is an Assistant Professor specializing in power systems and smart grid technologies.', 'Smart Grids, Demand Response, Energy Management', 7, NOW()),

('Mrs. V.Prashanthi', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Prashanthi.pdf', 'eee', 'approved', 'Control Systems, Signal Processing', 'v.prashanthi@svec.edu.in', 'Mrs. V. Prashanthi is an Assistant Professor with expertise in control systems and digital signal processing.', 'Control Systems, Digital Signal Processing, Embedded Systems', 5, NOW()),

('Mr. U. Uday Kumar', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_U.%20Uday%20Kumar.pdf', 'eee', 'approved', 'Power Electronics, Renewable Energy', 'u.udaykumar@svec.edu.in', 'Mr. U. Uday Kumar is an Assistant Professor specializing in power electronics and renewable energy systems.', 'Power Electronics, Solar Energy, Grid Integration', 4, NOW()),

('Mr. Y. Rajesh Kumar', 'M.Tech', 'Asst. Professor', 'https://srivasaviengg.ac.in/faculty_profile/eee_Y.%20Rajesh%20Kumar.pdf', 'eee', 'approved', 'Electrical Machines, Power Systems', 'y.rajeshkumar@svec.edu.in', 'Mr. Y. Rajesh Kumar is an Assistant Professor with research interests in electrical machines and power systems.', 'Electrical Machines, Power System Analysis, Load Flow Studies', 4, NOW());

-- Verify the insertion
SELECT COUNT(*) as 'Total EEE Faculty Inserted' FROM faculty_profiles WHERE dept = 'eee';

-- Display all inserted EEE faculty
SELECT id, name, designation, qualification, status, created_at 
FROM faculty_profiles 
WHERE dept = 'eee' 
ORDER BY 
  CASE designation 
    WHEN 'Professor & HOD' THEN 1
    WHEN 'Professor' THEN 2
    WHEN 'Professor & Dean(Student Affairs)' THEN 3
    WHEN 'Assoc. Professor' THEN 4
    WHEN 'Sr. Asst. Professor' THEN 5
    WHEN 'Asst. Professor' THEN 6
    ELSE 7
  END,
  name;