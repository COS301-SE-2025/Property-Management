CREATE TABLE public.pdf_meta
(

    PRIMARY KEY (id)
)
    INHERITS (public.image_meta);

ALTER TABLE IF EXISTS public.pdf_meta
    OWNER to postgres;

ALTER TABLE IF EXISTS public.pdf_meta
    NO INHERIT public.image_meta;

ALTER TABLE IF EXISTS public.pdf_meta DROP COLUMN IF EXISTS filename;

ALTER TABLE IF EXISTS public.pdf_meta DROP COLUMN IF EXISTS url;

ALTER TABLE IF EXISTS public.pdf_meta DROP COLUMN IF EXISTS id;

ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN filename character varying(255);

ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN url character varying(255);

ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN id uuid NOT NULL;
ALTER TABLE IF EXISTS public.pdf_meta
    ADD PRIMARY KEY (id);

ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN key character varying(255);

ALTER TABLE IF EXISTS public.pdf_meta DROP COLUMN IF EXISTS id;

ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN id character varying(255) NOT NULL;
ALTER TABLE IF EXISTS public.pdf_meta
    ADD PRIMARY KEY (id);