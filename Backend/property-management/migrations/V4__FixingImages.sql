ALTER TABLE IF EXISTS public.image_meta DROP COLUMN IF EXISTS uuid;

ALTER TABLE IF EXISTS public.image_meta
    ADD COLUMN id character varying NOT NULL;
ALTER TABLE IF EXISTS public.image_meta
    ADD PRIMARY KEY (id);