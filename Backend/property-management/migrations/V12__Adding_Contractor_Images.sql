-- Drop column only if it exists
ALTER TABLE IF EXISTS public.contractor
    DROP COLUMN IF EXISTS coporate_uuid;

-- Add column only if it doesn't exist
ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN IF NOT EXISTS profile_image_uuid uuid;
