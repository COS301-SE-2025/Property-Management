ALTER TABLE IF EXISTS public.maintenancetask
ADD COLUMN IF NOT EXISTS priority TEXT;

DROP TABLE IF EXISTS public.contractorrating;