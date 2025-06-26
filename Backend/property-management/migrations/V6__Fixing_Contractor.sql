ALTER TABLE IF EXISTS public.contractor DROP COLUMN IF EXISTS tools_provided;

ALTER TABLE IF EXISTS public.trustee DROP COLUMN IF EXISTS building_uuid;

ALTER TABLE IF EXISTS public.trustee DROP COLUMN IF EXISTS user_uuid;

ALTER TABLE IF EXISTS public.maintenancetask DROP COLUMN IF EXISTS created_by_uuid;