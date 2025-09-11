-- Table structure for seminar halls and timetables
CREATE TABLE IF NOT EXISTS classrooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  dept VARCHAR(50) NOT NULL COMMENT 'Department code',
  type ENUM('seminar', 'timetable') NOT NULL COMMENT 'Type of entry: seminar hall or timetable',
  description VARCHAR(255) NOT NULL COMMENT 'Description of the seminar hall or timetable',
  document_url VARCHAR(255) DEFAULT NULL COMMENT 'URL to the uploaded image or document',
  seating_capacity INT DEFAULT NULL COMMENT 'Seating capacity of the seminar hall',
  projector BOOLEAN DEFAULT FALSE COMMENT 'Whether the seminar hall has a projector',
  status ENUM('active', 'inactive', 'maintenance') NOT NULL DEFAULT 'active' COMMENT 'Status of the classroom or timetable',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  created_by INT DEFAULT NULL COMMENT 'User ID who created the entry',
  updated_by INT DEFAULT NULL COMMENT 'User ID who last updated the entry',
  deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT 'Soft delete timestamp',
  deleted_by INT DEFAULT NULL COMMENT 'User ID who deleted the entry'
);

-- Create index for faster searches
CREATE INDEX idx_classrooms_dept ON classrooms(dept);
CREATE INDEX idx_classrooms_type ON classrooms(type);
CREATE INDEX idx_classrooms_status ON classrooms(status);
CREATE INDEX idx_classrooms_deleted_at ON classrooms(deleted_at);
