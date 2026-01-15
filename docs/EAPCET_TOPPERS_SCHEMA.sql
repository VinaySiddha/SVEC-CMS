-- MySQL Schema for EAPCET Toppers Table

CREATE TABLE cst_eapcet_toppers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL,
    particulars VARCHAR(100) NOT NULL DEFAULT 'EAPCET Toppers',
    name_of_student VARCHAR(255) NOT NULL,
    student_rank INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample Insert Statements
INSERT INTO cst_eapcet_toppers (year, particulars, name_of_student, student_rank) VALUES
(2025, 'EAPCET Toppers', 'Y. Lohitha', 24402),
(2025, 'EAPCET Toppers', 'Y. Chinmaye Lakshmi Priya', 24872),
(2024, 'EAPCET Toppers', 'M. Pujitha', 15844),
(2024, 'EAPCET Toppers', 'G. Sri Durga Sireesha', 19924);

-- Index for faster queries
CREATE INDEX idx_year ON cst_eapcet_toppers(year);
CREATE INDEX idx_particulars ON cst_eapcet_toppers(particulars);
