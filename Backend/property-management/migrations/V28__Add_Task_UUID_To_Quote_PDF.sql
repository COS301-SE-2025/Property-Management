ALTER TABLE IF EXISTS public.pdf_meta
    ADD COLUMN task_uuid uuid;
ALTER TABLE IF EXISTS public.pdf_meta
    ADD CONSTRAINT task_uuid FOREIGN KEY (task_uuid)
    REFERENCES public.maintenancetask (task_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;