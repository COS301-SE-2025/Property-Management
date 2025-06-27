ALTER TABLE IF EXISTS public.building DROP COLUMN IF EXISTS primary_contractors;

ALTER TABLE IF EXISTS public.building
    ADD COLUMN primary_contractors uuid;