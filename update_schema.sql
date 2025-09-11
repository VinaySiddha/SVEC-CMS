ALTER TABLE password_resets 
ADD COLUMN proposed_hash VARCHAR(255) NULL AFTER token,
ADD COLUMN status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending' AFTER proposed_hash;
