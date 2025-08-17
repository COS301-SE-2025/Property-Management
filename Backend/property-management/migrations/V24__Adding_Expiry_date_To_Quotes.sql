ALTER TABLE IF EXISTS public.quote
    ADD COLUMN expiry_date timestamp without time zone;

ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN contractor_uuid uuid;
ALTER TABLE IF EXISTS public.pdf_meta
    ADD CONSTRAINT contractor_uuid FOREIGN KEY (contractor_uuid)
    REFERENCES public.contractor (contractor_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;