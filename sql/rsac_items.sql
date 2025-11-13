CREATE TABLE IF NOT EXISTS `rsac_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `content` TEXT NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `degree` ENUM('UG', 'PG') NOT NULL,
  `type` ENUM('syllabus', 'regulations', 'academic-calendar') NOT NULL,
  `posted_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_degree` (`degree`),
  INDEX `idx_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;