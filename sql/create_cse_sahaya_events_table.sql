-- Create cse_sahaya_events table based on cst_sahaya_events structure
CREATE TABLE IF NOT EXISTS cse_sahaya_events (
  id int(11) NOT NULL AUTO_INCREMENT,
  title TEXT,
  year varchar(50) DEFAULT NULL,
  category varchar(50) DEFAULT 'sahaya',
  file_url text,
  pdf_url text,
  url text,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_year (year),
  KEY idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data for CSE department (you can customize this based on CSE requirements)
INSERT INTO cse_sahaya_events (title, year, category, file_url) VALUES
('Sahaya Activities 2023-24', '2023-24', 'sahaya', 'https://www.srivasaviengg.ac.in/uploads/Sahaya_2023-24.pdf'),
('Sahaya Activities 2022-23', '2022-23', 'sahaya', 'http://srivasaviengg.ac.in/uploads/Sahaya_2022-23.pdf'),
('Sahaya Activities 2021-22', '2021-22', 'sahaya', 'http://srivasaviengg.ac.in/uploads/Sahaya_2021-22.pdf'),
('Sahaya Activities 2020-21', '2020-21', 'sahaya', 'http://srivasaviengg.ac.in/uploads/Sahaya_2020-21.pdf'),
('Sahaya Activities 2019-20', '2019-20', 'sahaya', 'http://srivasaviengg.ac.in/uploads/Sahaya_2019-20.pdf'),
('Sahaya Activities 2018-19', '2018-19', 'sahaya', 'http://srivasaviengg.ac.in/uploads/Sahaya_2018-19.pdf'),
('Sahaya Activities 2017-18', '2017-18', 'sahaya', 'http://srivasaviengg.ac.in/uploads/sahaya2017-18.pdf'),
('Sahaya Activities 2016-17', '2016-17', 'sahaya', 'http://srivasaviengg.ac.in/uploads/sahaya2016-17.pdf'),
('EC Activities 2023-24', '2023-24', 'ecactivities', 'https://www.srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202023-24%20-%20CSE.pdf'),
('EC Activities 2022-23', '2022-23', 'ecactivities', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202022-23.pdf'),
('EC Activities 2021-22', '2021-22', 'ecactivities', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202021-2022.pdf'),
('EC Activities 2019-20', '2019-20', 'ecactivities', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202019-2020.pdf'),
('EC Activities 2018-19', '2018-19', 'ecactivities', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202018-2019.pdf'),
('EC Activities 2017-18', '2017-18', 'ecactivities', 'http://srivasaviengg.ac.in/uploads/cse_extra_activities/Extracurricular%20activities%20-%202017-2018.pdf');