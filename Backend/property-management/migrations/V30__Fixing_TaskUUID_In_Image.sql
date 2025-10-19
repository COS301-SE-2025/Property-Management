-- Migration to add task_uuid column to image_meta table
-- Checks if column exists before adding it

DO $$
BEGIN
    -- Check if the column already exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'image_meta' 
        AND column_name = 'task_uuid'
    ) THEN
        -- Add the column if it doesn't exist
        ALTER TABLE image_meta 
        ADD COLUMN task_uuid UUID;
        
        RAISE NOTICE 'Column task_uuid added to image_meta table';
    ELSE
        RAISE NOTICE 'Column task_uuid already exists in image_meta table';
    END IF;
END $$;

-- Optional: Add index on task_uuid for better query performance
-- Uncomment if you need to query by task_uuid frequently
-- CREATE INDEX IF NOT EXISTS idx_image_meta_task_uuid ON image_meta(task_uuid);

-- Optional: Add foreign key constraint if task_uuid references another table
-- Uncomment and adjust the referenced table name as needed
-- ALTER TABLE image_meta 
-- ADD CONSTRAINT fk_image_meta_task 
-- FOREIGN KEY (task_uuid) REFERENCES tasks(uuid)
-- ON DELETE SET NULL;