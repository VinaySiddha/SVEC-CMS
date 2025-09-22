CREATE TABLE IF NOT EXISTS faculty_development_programs (
	id INT AUTO_INCREMENT PRIMARY KEY,
	dept VARCHAR(32) NOT NULL,
	type ENUM('attended','conducted','workshop','gallery') NOT NULL,
	year VARCHAR(16),
	title VARCHAR(255),
	file_url VARCHAR(512),
	image_url VARCHAR(512),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO faculty_development_programs (dept, type, year, title, file_url)
VALUES
('cseai', 'attended', '2024-25', 'FDPs attended by the Faculty 2024-25', 'https://srivasaviengg.ac.in/uploads/cst/CST%20FDP\'s%20A.Y%202024-2025.pdf'),
('cseai', 'attended', '2023-24', 'FDPs attended by the Faculty 2023-24', 'https://srivasaviengg.ac.in/uploads/cst/CST%20FDPs%20in%20A.Y%202023-2024.pdf'),
('cseai', 'attended', '2021-22', 'FDPs attended by the Faculty 2021-22', 'https://srivasaviengg.ac.in/uploads/cst/FDP%20Attended%20by%20the%20faculty%20during%20the%20Academic%20year%202021-2022_CST.pdf'),
('cseai', 'conducted', NULL, 'FDPs conducted by the Department to the Faculty', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20faculty.pdf'),
('cseai', 'workshop', NULL, 'FDPs/Workshops/Training Programmes Conducted', 'https://srivasaviengg.ac.in/uploads/cse_extra_activities/cse_FDPSconducted%20by%20the%20facultys.pdf'),
('cseai', 'gallery', NULL, NULL, NULL, 'https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13-16.jpg'),
('cseai', 'gallery', NULL, NULL, NULL, 'https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-09-13.jpg'),
('cseai', 'gallery', NULL, NULL, NULL, 'https://srivasaviengg.ac.in/images/departments/cst/FDP-2022-10-01-17.jpg'),
('cseai', 'gallery', NULL, NULL, NULL, 'https://srivasaviengg.ac.in/images/departments/cst/FDP-2022100117.jpg');
