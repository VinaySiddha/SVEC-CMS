-- MBA Department - Industrial Visits Table
-- Schema for storing details of industrial visits organized by MBA department

CREATE TABLE IF NOT EXISTS `mba_industrial_visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sno` int DEFAULT NULL,
  `date_of_visit` date NOT NULL,
  `batch` varchar(20) DEFAULT NULL COMMENT 'Academic batch format: YYYY-YY',
  `companies_visited` text NOT NULL COMMENT 'Names of companies visited, comma or semicolon separated',
  `place_of_company` text NOT NULL COMMENT 'Location and coordinating faculty names, line separated',
  `coordinating_faculty` text DEFAULT NULL COMMENT 'Faculty members coordinating the visit',
  `total_students` int DEFAULT NULL,
  `visit_details` text DEFAULT NULL COMMENT 'Additional details about the visit',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `batch` (`batch`),
  KEY `date_of_visit` (`date_of_visit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sample data insertion
INSERT INTO `mba_industrial_visits` (`sno`, `date_of_visit`, `batch`, `companies_visited`, `place_of_company`, `coordinating_faculty`) VALUES
(1, '2011-08-11', '2010-12', 'Sarvaraya Bottling Unit AP Paper Mills Limited', 'Rajahmundry', NULL),
(2, '2011-06-03', '2009-11', 'Delta Paper Mills Limited, Meena Biscuits Limited', 'Bhimavaram', NULL),
(3, '2017-10-27', '2016-18', 'M/s DELTA PAPER MILLS LTD., M/s MEENA BISCUITS', 'Bhimavaram', 'Dr. S. KRISHNA MURTHY NAIDU, Mr. R. V. RAJA SEKHAR, Ms. V. SARANYA, Mr. U. BHARGAVA, Ms. K. V. MALLESWARI'),
(4, '2017-02-20', '2015-2017', 'HINDUSTAN COCACOLA BEVERAGES PVT. LTD.', 'Atmakur, Vijayawada', 'V. KIRAN KUMAR, R. V. RAJA SEKHAR, Ms. V. SARANYA, Ms. K. V. MALLESWARI'),
(5, '2016-01-09', '2014-2016', 'MEENA BISCUITS', 'Bhimavaram', 'Dr. S. KRISHNA MURTHY NAIDU, Ms. G. NEELIMA'),
(6, '2015-03-12', '2013-2015', 'HINDUSTAN COCA COLA BEVERAGES PVT., LTD.', 'Atmakur, Vijayawada', 'Dr. S. KRISHNA MURTHY NAIDU, Ms. V. SARANYA'),
(7, '2013-10-26', '2012-2014', 'HINDUSTAN COCA COLA BEVERAGES PVT., LTD.', 'Atmakur, Vijayawada', 'Dr. S. KRISHNA MURTHY NAIDU, Mr. D. NAVEEN KUMAR');
