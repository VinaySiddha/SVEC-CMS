# CST GATE Module - Database & SQL Scripts

## 📊 Database Schema

### Main Table: cst_gate

```sql
CREATE TABLE IF NOT EXISTS cst_gate (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique record ID',
  roll_no VARCHAR(50) NOT NULL UNIQUE COMMENT 'Student roll number - Unique identifier',
  student_name VARCHAR(255) NOT NULL COMMENT 'Full name of the student',
  batch YEAR NOT NULL COMMENT 'Admission batch/year (format: YYYY)',
  specialization VARCHAR(100) COMMENT 'Engineering specialization branch',
  gate_score INT COMMENT 'GATE exam score (0-1000 range)',
  gate_rank INT COMMENT 'All India GATE rank after qualifying',
  gate_percentile DECIMAL(5, 2) COMMENT 'GATE percentile score (0-100)',
  exam_date DATE COMMENT 'Date when GATE exam was conducted',
  stream VARCHAR(100) COMMENT 'GATE paper/stream code (CS, EC, ME, CE, etc.)',
  qualified VARCHAR(10) COMMENT 'Qualification status (yes/no/awaiting)',
  score_card_url VARCHAR(500) COMMENT 'File path/URL to GATE score card',
  document_url VARCHAR(500) COMMENT 'File path/URL to additional supporting documents',
  remarks LONGTEXT COMMENT 'Additional notes and comments about GATE performance',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last record update timestamp',
  
  -- Indexes for better query performance
  INDEX idx_roll_no (roll_no) COMMENT 'Index on roll number for faster lookups',
  INDEX idx_batch (batch) COMMENT 'Index on batch for filtering by year',
  INDEX idx_stream (stream) COMMENT 'Index on GATE stream for filtering',
  INDEX idx_qualified (qualified) COMMENT 'Index on qualification status',
  INDEX idx_gate_score (gate_score) COMMENT 'Index for sorting by score',
  INDEX idx_student_name (student_name) COMMENT 'Index for searching by name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='GATE exam scores and student performance tracking';
```

---

## 🔧 Database Operations

### 1. Create Table

```sql
-- Create the cst_gate table with all indexes and constraints
CREATE TABLE IF NOT EXISTS cst_gate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_no VARCHAR(50) NOT NULL UNIQUE,
  student_name VARCHAR(255) NOT NULL,
  batch YEAR NOT NULL,
  specialization VARCHAR(100),
  gate_score INT,
  gate_rank INT,
  gate_percentile DECIMAL(5, 2),
  exam_date DATE,
  stream VARCHAR(100),
  qualified VARCHAR(10),
  score_card_url VARCHAR(500),
  document_url VARCHAR(500),
  remarks LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_roll_no (roll_no),
  INDEX idx_batch (batch),
  INDEX idx_stream (stream),
  INDEX idx_qualified (qualified),
  INDEX idx_gate_score (gate_score),
  INDEX idx_student_name (student_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Drop Table (if needed)

```sql
-- Drop the table if it exists (WARNING: This deletes all data)
DROP TABLE IF EXISTS cst_gate;
```

### 3. Truncate Table (Clear all data but keep structure)

```sql
-- Clear all records but keep the table
TRUNCATE TABLE cst_gate;
```

### 4. Add New Columns (if needed for future enhancements)

```sql
-- Add admission date column
ALTER TABLE cst_gate 
ADD COLUMN admission_date DATE COMMENT 'Student admission date';

-- Add category column for SC/ST/OBC
ALTER TABLE cst_gate 
ADD COLUMN category VARCHAR(50) COMMENT 'Student category (General/SC/ST/OBC)';

-- Add college name if student transferred
ALTER TABLE cst_gate 
ADD COLUMN admission_college VARCHAR(255) COMMENT 'College name from which student is taking GATE';
```

### 5. Modify Existing Columns

```sql
-- Increase remarks field size
ALTER TABLE cst_gate 
MODIFY COLUMN remarks LONGTEXT COMMENT 'Extended remarks field';

-- Change score data type if needed
ALTER TABLE cst_gate 
MODIFY COLUMN gate_score DECIMAL(5, 2) COMMENT 'GATE score (allows decimal values)';
```

---

## 📊 Sample Data for Testing

### Insert Sample Records

```sql
-- Insert 10 sample GATE records for testing
INSERT INTO cst_gate (
  roll_no, student_name, batch, specialization, gate_score, 
  gate_rank, gate_percentile, exam_date, stream, qualified, remarks
) VALUES
-- High scorer
('20A81CS001', 'Rohit Kumar Verma', 2020, 'computer_science', 820, 234, 98.5, '2024-02-03', 'CS', 'yes', 'Qualified GATE 2024 with excellent score. Pursuing M.Tech at IIT Delhi.'),

-- Good performer
('20A81CS002', 'Priya Sharma', 2020, 'computer_science', 750, 567, 92.3, '2024-02-03', 'CS', 'yes', 'Good score. Accepted at NIT Warangal for M.Tech.'),

-- Average performer
('20A81CS003', 'Arjun Singh', 2020, 'computer_science', 620, 1234, 78.5, '2024-02-03', 'CS', 'yes', 'Qualified but needs improvement for top colleges.'),

-- Below cutoff
('20A81CS004', 'Neha Patel', 2020, 'computer_science', 420, NULL, 32.1, '2024-02-03', 'CS', 'no', 'Did not qualify. Planning to appear in GATE 2025.'),

-- Awaiting results
('22A81CS001', 'Vikram Reddy', 2022, 'computer_science', NULL, NULL, NULL, '2025-02-02', 'CS', 'awaiting', 'Appeared in GATE 2025. Awaiting results.'),

-- Another high scorer
('20A81CS005', 'Aditya Kumar', 2020, 'computer_science', 880, 112, 99.2, '2024-02-03', 'CS', 'yes', 'Top performer in batch. Pursuing M.Tech at IIT Bombay.'),

-- Electronics specialization
('20A81EC001', 'Sarah Johnson', 2020, 'electronics', 710, 456, 88.5, '2024-02-04', 'EC', 'yes', 'Good score in EC branch.'),

-- Mechanical specialization
('20A81ME001', 'Rajesh Kumar', 2020, 'mechanical', 650, 890, 75.2, '2024-02-04', 'ME', 'yes', 'Qualified in Mechanical Engineering.'),

-- Civil specialization
('20A81CE001', 'Deepika Singh', 2020, 'civil', 580, 1567, 65.8, '2024-02-04', 'CE', 'yes', 'Qualified Civil Engineering paper.'),

-- Borderline
('21A81CS005', 'Manish Gupta', 2021, 'computer_science', 470, NULL, 42.5, '2024-02-03', 'CS', 'no', 'Close to cutoff. Encouraged to prepare better for next attempt.');
```

### Query Sample Data

```sql
-- Get all GATE records
SELECT * FROM cst_gate ORDER BY batch DESC, gate_score DESC;

-- Get qualified students
SELECT student_name, roll_no, batch, gate_score, gate_rank 
FROM cst_gate 
WHERE qualified = 'yes' 
ORDER BY gate_rank ASC;

-- Get non-qualified students
SELECT student_name, roll_no, batch, gate_score 
FROM cst_gate 
WHERE qualified = 'no' 
ORDER BY gate_score DESC;

-- Get students awaiting results
SELECT student_name, roll_no, batch, exam_date, stream 
FROM cst_gate 
WHERE qualified = 'awaiting' 
ORDER BY exam_date DESC;

-- Get students by batch
SELECT batch, COUNT(*) as total_students, 
       SUM(CASE WHEN qualified = 'yes' THEN 1 ELSE 0 END) as qualified_count,
       AVG(gate_score) as avg_score
FROM cst_gate 
GROUP BY batch 
ORDER BY batch DESC;

-- Get students by stream
SELECT stream, COUNT(*) as total, 
       SUM(CASE WHEN qualified = 'yes' THEN 1 ELSE 0 END) as qualified,
       AVG(gate_score) as avg_score,
       MIN(gate_score) as min_score,
       MAX(gate_score) as max_score
FROM cst_gate 
GROUP BY stream 
ORDER BY avg_score DESC;

-- Top 10 performers
SELECT student_name, roll_no, batch, gate_score, gate_rank, gate_percentile 
FROM cst_gate 
WHERE qualified = 'yes' 
ORDER BY gate_rank ASC 
LIMIT 10;

-- Average score by batch
SELECT batch, 
       COUNT(*) as total_students,
       AVG(gate_score) as avg_score,
       MAX(gate_score) as highest_score,
       MIN(gate_score) as lowest_score
FROM cst_gate 
GROUP BY batch 
ORDER BY batch DESC;

-- Qualification rate by batch
SELECT batch,
       COUNT(*) as total_students,
       SUM(CASE WHEN qualified = 'yes' THEN 1 ELSE 0 END) as qualified_count,
       ROUND(100 * SUM(CASE WHEN qualified = 'yes' THEN 1 ELSE 0 END) / COUNT(*), 2) as qualification_rate
FROM cst_gate 
GROUP BY batch 
ORDER BY batch DESC;
```

---

## 🔍 Useful Queries for Analysis

### 1. Performance Statistics

```sql
-- Overall statistics
SELECT 
  COUNT(*) as total_records,
  COUNT(DISTINCT batch) as num_batches,
  COUNT(DISTINCT stream) as num_streams,
  AVG(gate_score) as avg_score,
  MIN(gate_score) as min_score,
  MAX(gate_score) as max_score,
  STDDEV(gate_score) as std_dev,
  ROUND(100 * SUM(CASE WHEN qualified = 'yes' THEN 1 ELSE 0 END) / COUNT(*), 2) as qualification_rate
FROM cst_gate;
```

### 2. Find Duplicates

```sql
-- Check for duplicate roll numbers
SELECT roll_no, COUNT(*) as count 
FROM cst_gate 
GROUP BY roll_no 
HAVING count > 1;
```

### 3. Find Missing Data

```sql
-- Records with missing GATE score
SELECT student_name, roll_no, batch, qualified 
FROM cst_gate 
WHERE gate_score IS NULL;

-- Records with missing rank despite being qualified
SELECT student_name, roll_no, batch, gate_score, qualified 
FROM cst_gate 
WHERE qualified = 'yes' AND gate_rank IS NULL;
```

### 4. Score Distribution

```sql
-- Score distribution by ranges
SELECT 
  CASE 
    WHEN gate_score >= 900 THEN '900+'
    WHEN gate_score >= 800 THEN '800-899'
    WHEN gate_score >= 700 THEN '700-799'
    WHEN gate_score >= 600 THEN '600-699'
    WHEN gate_score >= 500 THEN '500-599'
    WHEN gate_score < 500 THEN 'Below 500'
    ELSE 'No Score'
  END as score_range,
  COUNT(*) as num_students,
  ROUND(100 * COUNT(*) / (SELECT COUNT(*) FROM cst_gate), 2) as percentage
FROM cst_gate 
GROUP BY score_range 
ORDER BY score_range DESC;
```

### 5. Recent Updates

```sql
-- Records modified in last 7 days
SELECT student_name, roll_no, batch, updated_at 
FROM cst_gate 
WHERE updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
ORDER BY updated_at DESC;
```

### 6. Percentile Analysis

```sql
-- Percentile brackets
SELECT 
  CASE 
    WHEN gate_percentile >= 95 THEN '95-100 (Excellent)'
    WHEN gate_percentile >= 85 THEN '85-95 (Very Good)'
    WHEN gate_percentile >= 70 THEN '70-85 (Good)'
    WHEN gate_percentile >= 50 THEN '50-70 (Average)'
    WHEN gate_percentile >= 0 THEN 'Below 50 (Below Average)'
    ELSE 'No Percentile'
  END as percentile_bracket,
  COUNT(*) as count,
  ROUND(AVG(gate_score), 2) as avg_score
FROM cst_gate 
GROUP BY percentile_bracket 
ORDER BY percentile_bracket DESC;
```

---

## 📋 Backup & Restore

### 1. Backup Table Data

```bash
# Using mysqldump
mysqldump -u root -p database_name cst_gate > cst_gate_backup.sql

# Or from MySQL prompt
SELECT * FROM cst_gate 
INTO OUTFILE '/var/lib/mysql-files/cst_gate_backup.csv' 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n';
```

### 2. Restore from Backup

```sql
-- Restore from SQL backup file
SOURCE /path/to/cst_gate_backup.sql;

-- Or load from CSV
LOAD DATA INFILE '/var/lib/mysql-files/cst_gate_backup.csv' 
INTO TABLE cst_gate 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n';
```

---

## 🔐 Data Integrity

### Add Constraints

```sql
-- Add check constraint for valid scores
ALTER TABLE cst_gate 
ADD CONSTRAINT check_gate_score 
CHECK (gate_score >= 0 AND gate_score <= 1000);

-- Add check constraint for valid percentile
ALTER TABLE cst_gate 
ADD CONSTRAINT check_gate_percentile 
CHECK (gate_percentile >= 0 AND gate_percentile <= 100);

-- Add check constraint for valid rank
ALTER TABLE cst_gate 
ADD CONSTRAINT check_gate_rank 
CHECK (gate_rank IS NULL OR gate_rank > 0);
```

### Foreign Key (if student table exists)

```sql
-- Add foreign key to students table (if it exists)
ALTER TABLE cst_gate 
ADD CONSTRAINT fk_student_roll 
FOREIGN KEY (roll_no) REFERENCES students(roll_no) 
ON DELETE RESTRICT ON UPDATE CASCADE;
```

---

## 📊 Database Maintenance

### 1. Analyze Table Performance

```sql
-- Analyze table for optimization
ANALYZE TABLE cst_gate;

-- Check table for errors
CHECK TABLE cst_gate;

-- Repair table (if needed)
REPAIR TABLE cst_gate;

-- Optimize table
OPTIMIZE TABLE cst_gate;
```

### 2. Show Table Status

```sql
-- Get table information
SHOW TABLE STATUS WHERE Name = 'cst_gate';

-- Get column information
SHOW COLUMNS FROM cst_gate;

-- Get indexes
SHOW INDEX FROM cst_gate;

-- Get storage size
SELECT 
  table_name,
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size in MB'
FROM information_schema.TABLES 
WHERE table_name = 'cst_gate';
```

---

## 🎯 Implementation Checklist

- [ ] Create database table using provided SQL
- [ ] Verify table structure: `DESCRIBE cst_gate;`
- [ ] Create indexes for performance
- [ ] Insert sample data for testing
- [ ] Verify data integrity constraints
- [ ] Test backup/restore procedures
- [ ] Optimize table performance
- [ ] Create API endpoints for CRUD
- [ ] Test form validation
- [ ] Deploy to production

---

**Database Version**: 1.0  
**MySQL Version**: 5.7+ / 8.0+  
**Charset**: UTF-8 (utf8mb4_unicode_ci)  
**Engine**: InnoDB (for ACID compliance)  
**Date**: November 23, 2025
