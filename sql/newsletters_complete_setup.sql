-- Complete Newsletter Setup for CSEAI Department
-- This file contains table creation and all newsletter data

-- 1. Create newsletters table (if not exists)
CREATE TABLE IF NOT EXISTS newsletters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    publish_date DATE,
    volume VARCHAR(10),
    issue VARCHAR(10),
    academic_year VARCHAR(20),
    document_url TEXT,
    cover_image_url TEXT,
    editors TEXT,
    status ENUM('draft', 'approved', 'rejected') DEFAULT 'approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_dept (dept),
    INDEX idx_status (status),
    INDEX idx_publish_date (publish_date)
);

-- 2. Insert all newsletter data for CSEAI department
INSERT INTO newsletters (dept, title, description, publish_date, volume, issue, academic_year, document_url, status) VALUES

-- Volume 12 Newsletters
('cseai', 'Newsletter Volume 12 Issue 4 2022', 'Computer Science and Engineering (AI) Newsletter Volume 12 Issue 4', '2022-12-01', '12', '4', '2022-23', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue%204%202022.pdf', 'approved'),

('cseai', 'Newsletter Volume 12 Issue 3 2022', 'Computer Science and Engineering (AI) Newsletter Volume 12 Issue 3', '2022-09-01', '12', '3', '2022-23', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue3%202022.pdf', 'approved'),

('cseai', 'Newsletter Volume 12 Issue 2 2021', 'Computer Science and Engineering (AI) Newsletter Volume 12 Issue 2', '2021-12-01', '12', '2', '2021-22', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue2%202021.pdf', 'approved'),

('cseai', 'Newsletter Volume 12 Issue 1 2021', 'Computer Science and Engineering (AI) Newsletter Volume 12 Issue 1', '2021-09-01', '12', '1', '2021-22', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2012%20Issue1%202021.pdf', 'approved'),

-- Volume 11 Newsletters
('cseai', 'Newsletter Volume 11 Issue 4 2021', 'Computer Science and Engineering (AI) Newsletter Volume 11 Issue 4', '2021-06-01', '11', '4', '2020-21', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue%204%202021.pdf', 'approved'),

('cseai', 'Newsletter Volume 11 Issue 3 2021', 'Computer Science and Engineering (AI) Newsletter Volume 11 Issue 3', '2021-03-01', '11', '3', '2020-21', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue%203%202021.pdf', 'approved'),

('cseai', 'Newsletter Volume 11 Issue 2 2020', 'Computer Science and Engineering (AI) Newsletter Volume 11 Issue 2', '2020-12-01', '11', '2', '2020-21', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue%202%202020.pdf', 'approved'),

('cseai', 'Newsletter Volume 11 Issue 1 2020', 'Computer Science and Engineering (AI) Newsletter Volume 11 Issue 1', '2020-09-01', '11', '1', '2020-21', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2011%20Issue%201%202020.pdf', 'approved'),

-- Volume 10 Newsletters
('cseai', 'Newsletter Volume 10 Issue 4 2020', 'Computer Science and Engineering (AI) Newsletter Volume 10 Issue 4', '2020-06-01', '10', '4', '2019-20', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20Issue%204%202020.pdf', 'approved'),

('cseai', 'Newsletter Volume 10 Issue 3 2020', 'Computer Science and Engineering (AI) Newsletter Volume 10 Issue 3', '2020-03-01', '10', '3', '2019-20', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20Issue%203%202020.pdf', 'approved'),

('cseai', 'Newsletter Volume 10 Issue 2 2019', 'Computer Science and Engineering (AI) Newsletter Volume 10 Issue 2', '2019-12-01', '10', '2', '2019-20', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20Issue%202%202019.pdf', 'approved'),

('cseai', 'Newsletter Volume 10 Issue 1 2019', 'Computer Science and Engineering (AI) Newsletter Volume 10 Issue 1', '2019-09-01', '10', '1', '2019-20', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%2010%20Issue%201%202019.pdf', 'approved'),

-- Volume 9 Newsletters
('cseai', 'Newsletter Volume 9 Issue 4 2019', 'Computer Science and Engineering (AI) Newsletter Volume 9 Issue 4', '2019-06-01', '9', '4', '2018-19', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%209%20Issue%204%202019.pdf', 'approved'),

('cseai', 'Newsletter Volume 9 Issue 3 2019', 'Computer Science and Engineering (AI) Newsletter Volume 9 Issue 3', '2019-03-01', '9', '3', '2018-19', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%209%20Issue%203%202019.pdf', 'approved'),

('cseai', 'Newsletter Volume 9 Issue 2 2018', 'Computer Science and Engineering (AI) Newsletter Volume 9 Issue 2', '2018-12-01', '9', '2', '2018-19', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%209%20Issue%202%202018.pdf', 'approved'),

('cseai', 'Newsletter Volume 9 Issue 1 2018', 'Computer Science and Engineering (AI) Newsletter Volume 9 Issue 1', '2018-09-01', '9', '1', '2018-19', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%209%20Issue%201%202018.pdf', 'approved'),

-- Volume 8 Newsletters
('cseai', 'Newsletter Volume 8 Issue 4 2018', 'Computer Science and Engineering (AI) Newsletter Volume 8 Issue 4', '2018-06-01', '8', '4', '2017-18', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%208%20Issue%204%202018.pdf', 'approved'),

('cseai', 'Newsletter Volume 8 Issue 3 2018', 'Computer Science and Engineering (AI) Newsletter Volume 8 Issue 3', '2018-03-01', '8', '3', '2017-18', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%208%20Issue%203%202018.pdf', 'approved'),

('cseai', 'Newsletter Volume 8 Issue 2 2017', 'Computer Science and Engineering (AI) Newsletter Volume 8 Issue 2', '2017-12-01', '8', '2', '2017-18', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%208%20Issue%202%202017.pdf', 'approved'),

('cseai', 'Newsletter Volume 8 Issue 1 2017', 'Computer Science and Engineering (AI) Newsletter Volume 8 Issue 1', '2017-09-01', '8', '1', '2017-18', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%208%20Issue%201%202017.pdf', 'approved'),

-- Volume 7 Newsletters
('cseai', 'Newsletter Volume 7 Issue 4 2017', 'Computer Science and Engineering (AI) Newsletter Volume 7 Issue 4', '2017-06-01', '7', '4', '2016-17', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%207%20Issue%204%202017.pdf', 'approved'),

('cseai', 'Newsletter Volume 7 Issue 3 2017', 'Computer Science and Engineering (AI) Newsletter Volume 7 Issue 3', '2017-03-01', '7', '3', '2016-17', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%207%20Issue%203%202017.pdf', 'approved'),

('cseai', 'Newsletter Volume 7 Issue 2 2016', 'Computer Science and Engineering (AI) Newsletter Volume 7 Issue 2', '2016-12-01', '7', '2', '2016-17', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%207%20Issue%202%202016.pdf', 'approved'),

('cseai', 'Newsletter Volume 7 Issue 1 2016', 'Computer Science and Engineering (AI) Newsletter Volume 7 Issue 1', '2016-09-01', '7', '1', '2016-17', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%207%20Issue%201%202016.pdf', 'approved'),

-- Volume 6 Newsletters
('cseai', 'Newsletter Volume 6 Issue 4 2016', 'Computer Science and Engineering (AI) Newsletter Volume 6 Issue 4', '2016-06-01', '6', '4', '2015-16', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%206%20Issue%204%202016.pdf', 'approved'),

('cseai', 'Newsletter Volume 6 Issue 3 2016', 'Computer Science and Engineering (AI) Newsletter Volume 6 Issue 3', '2016-03-01', '6', '3', '2015-16', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%206%20Issue%203%202016.pdf', 'approved'),

('cseai', 'Newsletter Volume 6 Issue 2 2015', 'Computer Science and Engineering (AI) Newsletter Volume 6 Issue 2', '2015-12-01', '6', '2', '2015-16', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%206%20Issue%202%202015.pdf', 'approved'),

('cseai', 'Newsletter Volume 6 Issue 1 2015', 'Computer Science and Engineering (AI) Newsletter Volume 6 Issue 1', '2015-09-01', '6', '1', '2015-16', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%206%20Issue%201%202015.pdf', 'approved'),

-- Volume 5 Newsletters
('cseai', 'Newsletter Volume 5 Issue 4 2015', 'Computer Science and Engineering (AI) Newsletter Volume 5 Issue 4', '2015-06-01', '5', '4', '2014-15', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%205%20Issue%204%202015.pdf', 'approved'),

('cseai', 'Newsletter Volume 5 Issue 3 2015', 'Computer Science and Engineering (AI) Newsletter Volume 5 Issue 3', '2015-03-01', '5', '3', '2014-15', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%205%20Issue%203%202015.pdf', 'approved'),

('cseai', 'Newsletter Volume 5 Issue 2 2014', 'Computer Science and Engineering (AI) Newsletter Volume 5 Issue 2', '2014-12-01', '5', '2', '2014-15', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%205%20Issue%202%202014.pdf', 'approved'),

('cseai', 'Newsletter Volume 5 Issue 1 2014', 'Computer Science and Engineering (AI) Newsletter Volume 5 Issue 1', '2014-09-01', '5', '1', '2014-15', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%205%20Issue%201%202014.pdf', 'approved'),

-- Volume 4 Newsletters
('cseai', 'Newsletter Volume 4 Issue 4 2014', 'Computer Science and Engineering (AI) Newsletter Volume 4 Issue 4', '2014-06-01', '4', '4', '2013-14', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%204%20Issue%204%202014.pdf', 'approved'),

('cseai', 'Newsletter Volume 4 Issue 3 2014', 'Computer Science and Engineering (AI) Newsletter Volume 4 Issue 3', '2014-03-01', '4', '3', '2013-14', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%204%20Issue%203%202014.pdf', 'approved'),

('cseai', 'Newsletter Volume 4 Issue 2 2013', 'Computer Science and Engineering (AI) Newsletter Volume 4 Issue 2', '2013-12-01', '4', '2', '2013-14', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%204%20Issue%202%202013.pdf', 'approved'),

('cseai', 'Newsletter Volume 4 Issue 1 2013', 'Computer Science and Engineering (AI) Newsletter Volume 4 Issue 1', '2013-09-01', '4', '1', '2013-14', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%204%20Issue%201%202013.pdf', 'approved'),

-- Volume 3 Newsletters
('cseai', 'Newsletter Volume 3 Issue 4 2013', 'Computer Science and Engineering (AI) Newsletter Volume 3 Issue 4', '2013-06-01', '3', '4', '2012-13', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%203%20Issue%204%202013.pdf', 'approved'),

('cseai', 'Newsletter Volume 3 Issue 3 2013', 'Computer Science and Engineering (AI) Newsletter Volume 3 Issue 3', '2013-03-01', '3', '3', '2012-13', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%203%20Issue%203%202013.pdf', 'approved'),

('cseai', 'Newsletter Volume 3 Issue 2 2012', 'Computer Science and Engineering (AI) Newsletter Volume 3 Issue 2', '2012-12-01', '3', '2', '2012-13', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%203%20Issue%202%202012.pdf', 'approved'),

('cseai', 'Newsletter Volume 3 Issue 1 2012', 'Computer Science and Engineering (AI) Newsletter Volume 3 Issue 1', '2012-09-01', '3', '1', '2012-13', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%203%20Issue%201%202012.pdf', 'approved'),

-- Volume 2 Newsletters
('cseai', 'Newsletter Volume 2 Issue 4 2012', 'Computer Science and Engineering (AI) Newsletter Volume 2 Issue 4', '2012-06-01', '2', '4', '2011-12', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%202%20Issue%204%202012.pdf', 'approved'),

('cseai', 'Newsletter Volume 2 Issue 3 2012', 'Computer Science and Engineering (AI) Newsletter Volume 2 Issue 3', '2012-03-01', '2', '3', '2011-12', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%202%20Issue%203%202012.pdf', 'approved'),

('cseai', 'Newsletter Volume 2 Issue 2 2011', 'Computer Science and Engineering (AI) Newsletter Volume 2 Issue 2', '2011-12-01', '2', '2', '2011-12', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%202%20Issue%202%202011.pdf', 'approved'),

('cseai', 'Newsletter Volume 2 Issue 1 2011', 'Computer Science and Engineering (AI) Newsletter Volume 2 Issue 1', '2011-09-01', '2', '1', '2011-12', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%202%20Issue%201%202011.pdf', 'approved'),

-- Volume 1 Newsletters
('cseai', 'Newsletter Volume 1 Issue 4 2011', 'Computer Science and Engineering (AI) Newsletter Volume 1 Issue 4', '2011-06-01', '1', '4', '2010-11', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%201%20Issue%204%202011.pdf', 'approved'),

('cseai', 'Newsletter Volume 1 Issue 3 2011', 'Computer Science and Engineering (AI) Newsletter Volume 1 Issue 3', '2011-03-01', '1', '3', '2010-11', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%201%20Issue%203%202011.pdf', 'approved'),

('cseai', 'Newsletter Volume 1 Issue 2 2010', 'Computer Science and Engineering (AI) Newsletter Volume 1 Issue 2', '2010-12-01', '1', '2', '2010-11', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%201%20Issue%202%202010.pdf', 'approved'),

('cseai', 'Newsletter Volume 1 Issue 1 2010', 'Computer Science and Engineering (AI) Newsletter Volume 1 Issue 1', '2010-09-01', '1', '1', '2010-11', 'https://srivasaviengg.ac.in/uploads/Newsletter%20Volume%201%20Issue%201%202010.pdf', 'approved');

-- 3. Verify the data
SELECT COUNT(*) as total_newsletters FROM newsletters WHERE dept = 'cseai';

-- 4. Show sample data
SELECT id, title, volume, issue, academic_year, publish_date, status 
FROM newsletters 
WHERE dept = 'cseai' 
ORDER BY publish_date DESC 
LIMIT 10;


