ALTER TABLE IF EXISTS public.image_meta
    ADD COLUMN task_uuid uuid;
ALTER TABLE IF EXISTS public.image_meta
    ADD CONSTRAINT "Task_Image" FOREIGN KEY (task_uuid)
    REFERENCES public.maintenancetask (task_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.image_meta
    ADD COLUMN user_uuid uuid;