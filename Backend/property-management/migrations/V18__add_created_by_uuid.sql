ALTER TABLE IF EXISTS public.maintenancetask
    ADD COLUMN IF NOT EXISTS created_by_uuid UUID;