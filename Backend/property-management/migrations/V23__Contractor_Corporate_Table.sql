CREATE TABLE public.contractor_corporate
(
    "contractorUuid" uuid NOT NULL,
    "bodyCorporateUuid" uuid NOT NULL,
    CONSTRAINT contractor FOREIGN KEY ("contractorUuid")
        REFERENCES public.contractor (contractor_uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT corporate FOREIGN KEY ("bodyCorporateUuid")
        REFERENCES public.bodycoporate (coporate_uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.contractor_corporate
    OWNER to postgres;

ALTER TABLE IF EXISTS public.contractor_corporate
    ADD COLUMN id uuid NOT NULL DEFAULT gen_random_uuid();
ALTER TABLE IF EXISTS public.contractor_corporate
    ADD PRIMARY KEY (id);

ALTER TABLE IF EXISTS public.contractor_corporate
    RENAME "contractorUuid" TO contractor_uuid;

ALTER TABLE IF EXISTS public.contractor_corporate
    RENAME "bodyCorporateUuid" TO body_corporate_uuid;