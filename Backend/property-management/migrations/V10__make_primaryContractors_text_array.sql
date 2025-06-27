ALTER TABLE building
    ALTER COLUMN primary_contractors TYPE text[];

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN corporate_uuid uuid