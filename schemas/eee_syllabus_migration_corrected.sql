-- EEE Department Syllabus Migration SQL (Corrected)
-- Run this SQL script directly in the database to populate EEE syllabus documents

-- First, clear any existing EEE syllabus data
DELETE FROM syllabus_documents WHERE dept = 'EEE';

-- Insert EEE Department Syllabus Documents

-- V20 Regulation - Current Academic Year 2024-25
INSERT INTO syllabus_documents (title, description, document_url, type, academic_year, semester, regulation, dept, status) VALUES
('B.Tech EEE I Year I Semester (V20 Regulation)', 'First year first semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_I_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'I', 'V20', 'EEE', 'approved'),
('B.Tech EEE I Year II Semester (V20 Regulation)', 'First year second semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_II_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'II', 'V20', 'EEE', 'approved'),
('B.Tech EEE II Year I Semester (V20 Regulation)', 'Second year first semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_I_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'III', 'V20', 'EEE', 'approved'),
('B.Tech EEE II Year II Semester (V20 Regulation)', 'Second year second semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_II_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'IV', 'V20', 'EEE', 'approved'),
('B.Tech EEE III Year I Semester (V20 Regulation)', 'Third year first semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_I_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'V', 'V20', 'EEE', 'approved'),
('B.Tech EEE III Year II Semester (V20 Regulation)', 'Third year second semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_II_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'VI', 'V20', 'EEE', 'approved'),
('B.Tech EEE IV Year I Semester (V20 Regulation)', 'Fourth year first semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_I_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'VII', 'V20', 'EEE', 'approved'),
('B.Tech EEE IV Year II Semester (V20 Regulation)', 'Fourth year second semester syllabus for EEE department under V20 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_II_EEE_V20_Syllabus.pdf', 'btech', '2024-25', 'VIII', 'V20', 'EEE', 'approved'),

-- V18 Regulation - Previous Academic Year 2023-24
('B.Tech EEE I Year I Semester (V18 Regulation)', 'First year first semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_I_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'I', 'V18', 'EEE', 'approved'),
('B.Tech EEE I Year II Semester (V18 Regulation)', 'First year second semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/I_II_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'II', 'V18', 'EEE', 'approved'),
('B.Tech EEE II Year I Semester (V18 Regulation)', 'Second year first semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_I_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'III', 'V18', 'EEE', 'approved'),
('B.Tech EEE II Year II Semester (V18 Regulation)', 'Second year second semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/II_II_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'IV', 'V18', 'EEE', 'approved'),
('B.Tech EEE III Year I Semester (V18 Regulation)', 'Third year first semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_I_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'V', 'V18', 'EEE', 'approved'),
('B.Tech EEE III Year II Semester (V18 Regulation)', 'Third year second semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/III_II_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'VI', 'V18', 'EEE', 'approved'),
('B.Tech EEE IV Year I Semester (V18 Regulation)', 'Fourth year first semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_I_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'VII', 'V18', 'EEE', 'approved'),
('B.Tech EEE IV Year II Semester (V18 Regulation)', 'Fourth year second semester syllabus for EEE department under V18 regulation', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/IV_II_EEE_V18_Syllabus.pdf', 'btech', '2023-24', 'VIII', 'V18', 'EEE', 'approved'),

-- M.Tech Programs
('M.Tech Power Systems I Semester', 'Master of Technology in Power Systems first semester syllabus', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PS_I_Semester.pdf', 'mtech', '2024-25', 'I', 'V20', 'EEE', 'approved'),
('M.Tech Power Systems II Semester', 'Master of Technology in Power Systems second semester syllabus', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PS_II_Semester.pdf', 'mtech', '2024-25', 'II', 'V20', 'EEE', 'approved'),
('M.Tech Power Electronics I Semester', 'Master of Technology in Power Electronics first semester syllabus', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PE_I_Semester.pdf', 'mtech', '2024-25', 'I', 'V20', 'EEE', 'approved'),
('M.Tech Power Electronics II Semester', 'Master of Technology in Power Electronics second semester syllabus', 'https://srivasaviengg.ac.in/uploads/eee/syllabus/MTech_PE_II_Semester.pdf', 'mtech', '2024-25', 'II', 'V20', 'EEE', 'approved');

-- Verify the insertion
SELECT 
    regulation, 
    type, 
    COUNT(*) as count 
FROM syllabus_documents 
WHERE dept = 'EEE' 
GROUP BY regulation, type 
ORDER BY regulation, type;

-- Show total count
SELECT COUNT(*) as total_syllabus_documents 
FROM syllabus_documents 
WHERE dept = 'EEE';