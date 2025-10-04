-- Add created_by field to users table if it doesn't exist
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `created_by` BIGINT UNSIGNED NULL,
ADD INDEX IF NOT EXISTS `fk_users_created_by_idx` (`created_by` ASC);

-- Add foreign key constraint if it doesn't exist
ALTER TABLE `users` 
ADD CONSTRAINT `fk_users_created_by`
  FOREIGN KEY (`created_by`)
  REFERENCES `users` (`id`)
  ON DELETE SET NULL
  ON UPDATE CASCADE;