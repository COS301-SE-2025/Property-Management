ALTER TABLE IF EXISTS public.image_meta
    ADD COLUMN progress_uuid uuid;

ALTER TABLE IF EXISTS public.image_meta
    ADD COLUMN building_uuid uuid;
ALTER TABLE IF EXISTS public.image_meta
    ADD CONSTRAINT "Progress_Id" FOREIGN KEY (progress_uuid)
    REFERENCES public.task_progress (progress_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.image_meta
    ADD CONSTRAINT "Building_uuid" FOREIGN KEY (building_uuid)
    REFERENCES public.building (building_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.image_meta DROP CONSTRAINT IF EXISTS "Building_uuid";


