-- Create the bodycoporate table
CREATE TABLE IF NOT EXISTS public.bodycoporate (
    coporate_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    copname VARCHAR NOT NULL,
    contribution_per_sqm NUMERIC(12,2) NOT NULL,
    total_budget NUMERIC(14,2) DEFAULT 0
);

-- Alter building table: add coporate_uuid as foreign key and area field
ALTER TABLE IF EXISTS public.building
    ADD COLUMN coporate_uuid UUID,
    ADD COLUMN area NUMERIC(10,2),
    ADD CONSTRAINT fk_building_bodycoporate
        FOREIGN KEY (coporate_uuid) REFERENCES public.bodycoporate(coporate_uuid);

-- Create join table for trustee <-> bodycoporate relationship
CREATE TABLE IF NOT EXISTS public.trustee_bodycoporate (
    trustee_uuid UUID NOT NULL,
    coporate_uuid UUID NOT NULL,
    PRIMARY KEY (trustee_uuid, coporate_uuid),
    FOREIGN KEY (trustee_uuid) REFERENCES public.trustee(trustee_uuid),
    FOREIGN KEY (coporate_uuid) REFERENCES public.bodycoporate(coporate_uuid)
);

-- Alter contractor table to add coporate_uuid as a foreign key
ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN coporate_uuid UUID,
    ADD CONSTRAINT fk_contractor_bodycoporate
        FOREIGN KEY (coporate_uuid) REFERENCES public.bodycoporate(coporate_uuid);

ALTER TABLE public.building DROP COLUMN IF EXISTS complex_name;

ALTER TABLE public.building
    ALTER COLUMN area TYPE double precision USING area::double precision;

-- Add email and user_id columns to bodycoporate table
ALTER TABLE bodycoporate
    ADD COLUMN email VARCHAR(255),
    ADD COLUMN user_id VARCHAR(64);

ALTER TABLE bodycoporate ADD COLUMN username VARCHAR(255);