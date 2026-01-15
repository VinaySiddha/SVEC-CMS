-- Insert sample data into autonomous_exam_section table
INSERT INTO autonomous_exam_section (date, type, degree, content, link, posteddate) VALUES
('2025-11-16', 'Regular', 'UG', 'Regular Examination Schedule for UG students', '/uploads/ug_regular_exam.pdf', '2025-11-16'),
('2025-11-15', 'Supply', 'UG', 'Supplementary Examination notification for UG', '/uploads/ug_supply_exam.pdf', '2025-11-15'),
('2025-11-14', 'Results', 'UG', 'UG Semester Results Published', '/uploads/ug_results.pdf', '2025-11-14'),
('2025-11-16', 'Regular', 'PG', 'Regular Examination Schedule for PG students', '/uploads/pg_regular_exam.pdf', '2025-11-16'),
('2025-11-15', 'Supply', 'PG', 'Supplementary Examination notification for PG', '/uploads/pg_supply_exam.pdf', '2025-11-15'),
('2025-11-13', 'Timetable', 'UG', 'Examination Time Table - UG Batch', '/uploads/ug_timetable.pdf', '2025-11-13'),
('2025-11-12', 'Fee Notification', 'UG', 'Examination Fee Payment Notification', '/uploads/fee_notification.pdf', '2025-11-12'),
('2025-11-11', 'Circular', 'UG', 'Important Circular regarding Examinations', '/uploads/circular.pdf', '2025-11-11');

-- Verify insert
SELECT COUNT(*) as inserted_records FROM autonomous_exam_section 
WHERE deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00';

-- Show all inserted records
SELECT * FROM autonomous_exam_section 
WHERE deleted_at IS NULL OR deleted_at = '0000-00-00 00:00:00'
ORDER BY posteddate DESC;
