ALTER TABLE IF EXISTS public.trustee DROP COLUMN IF EXISTS user_id;

ALTER TABLE IF EXISTS public.trustee DROP CONSTRAINT IF EXISTS trustee_pkey;

ALTER TABLE IF EXISTS public.trustee
    ADD PRIMARY KEY (trustee_uuid);