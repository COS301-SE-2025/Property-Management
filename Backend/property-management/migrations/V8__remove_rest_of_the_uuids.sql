-- ============ TRUSTEE TABLE CHANGES (FK Dependencies First) ============
ALTER TABLE IF EXISTS building DROP CONSTRAINT IF EXISTS building_trustee_uuid_fkey;
ALTER TABLE IF EXISTS trustee DROP CONSTRAINT IF EXISTS trustee_user_id_fkey;
ALTER TABLE IF EXISTS trustee DROP CONSTRAINT IF EXISTS trustee_user_uuid_fkey;
ALTER TABLE IF EXISTS trustee DROP COLUMN IF EXISTS user_id;
ALTER TABLE IF EXISTS trustee DROP COLUMN IF EXISTS user_uuid;
ALTER TABLE IF EXISTS trustee ADD COLUMN IF NOT EXISTS is_owner BOOLEAN;
ALTER TABLE IF EXISTS trustee ADD COLUMN IF NOT EXISTS role VARCHAR(100);

-- ============ USER TABLE REMOVAL ============
DROP TABLE IF EXISTS "user" CASCADE;

-- ============ BUILDING TABLE CHANGES ============
ALTER TABLE IF EXISTS building DROP CONSTRAINT IF EXISTS building_pkey;
ALTER TABLE IF EXISTS building DROP COLUMN IF EXISTS building_id;
ALTER TABLE IF EXISTS building ADD COLUMN IF NOT EXISTS trustee_uuid UUID;
ALTER TABLE IF EXISTS building ADD CONSTRAINT IF NOT EXISTS building_trustee_uuid_fkey FOREIGN KEY (trustee_uuid) REFERENCES trustee(trustee_uuid);

-- ============ BUDGET TABLE CHANGES ============
ALTER TABLE IF EXISTS budget ADD COLUMN IF NOT EXISTS budget_id SERIAL;
ALTER TABLE IF EXISTS budget ADD CONSTRAINT IF NOT EXISTS budget_pkey PRIMARY KEY (budget_id);
ALTER TABLE IF EXISTS budget ADD CONSTRAINT IF NOT EXISTS budget_approved_by_fkey FOREIGN KEY (approved_by) REFERENCES trustee(trustee_id);

-- ============ CONTRACTOR TABLE CHANGES ============
ALTER TABLE IF EXISTS contractor ADD COLUMN IF NOT EXISTS contractor_id SERIAL;
ALTER TABLE IF EXISTS contractor ADD COLUMN IF NOT EXISTS contact_info TEXT;
ALTER TABLE IF EXISTS contractor ADD COLUMN IF NOT EXISTS tools_provided JSONB;
ALTER TABLE IF EXISTS contractor ALTER COLUMN phone TYPE VARCHAR(255);
ALTER TABLE IF EXISTS contractor ADD CONSTRAINT IF NOT EXISTS contractor_pkey PRIMARY KEY (contractor_id);

-- ============ CONTRACTORRATING TABLE CHANGES ============
ALTER TABLE IF EXISTS contractorrating DROP CONSTRAINT IF EXISTS contractorrating_contractor_uuid_fkey;
ALTER TABLE IF EXISTS contractorrating ADD COLUMN IF NOT EXISTS contractor_id INTEGER;
ALTER TABLE IF EXISTS contractorrating ADD CONSTRAINT IF NOT EXISTS contractorrating_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES contractor(contractor_id);

-- ============ INVENTORYITEM TABLE CHANGES ============
ALTER TABLE IF EXISTS inventoryitem ADD COLUMN IF NOT EXISTS building_id INTEGER;

-- ============ MAINTENANCETASK TABLE CHANGES ============
ALTER TABLE IF EXISTS maintenancetask ADD COLUMN IF NOT EXISTS image_id VARCHAR(255);
ALTER TABLE IF EXISTS maintenancetask ADD CONSTRAINT IF NOT EXISTS maintenance_images FOREIGN KEY (image_id) REFERENCES image_meta(id);

-- ============ QUOTE TABLE CHANGES ============
ALTER TABLE IF EXISTS quote ADD COLUMN IF NOT EXISTS contractor_id INTEGER;
ALTER TABLE IF EXISTS quote ADD COLUMN IF NOT EXISTS document_url TEXT;
ALTER TABLE IF EXISTS quote ADD COLUMN IF NOT EXISTS status VARCHAR(100);
ALTER TABLE IF EXISTS quote ADD CONSTRAINT IF NOT EXISTS quote_contractor_id_fkey FOREIGN KEY (contractor_id) REFERENCES contractor(contractor_id);

-- ============ TENYEARPLAN TABLE CHANGES ============
ALTER TABLE IF EXISTS tenyearplan ADD COLUMN IF NOT EXISTS plan_id SERIAL;
ALTER TABLE IF EXISTS tenyearplan ADD CONSTRAINT IF NOT EXISTS tenyearplan_pkey PRIMARY KEY (plan_id);

-- ============ TRUSTEEAPPROVAL TABLE CHANGES ============
ALTER TABLE IF EXISTS trusteeapproval DROP COLUMN IF EXISTS vote;
ALTER TABLE IF EXISTS trusteeapproval ADD COLUMN IF NOT EXISTS vote VARCHAR(10);
ALTER TABLE IF EXISTS trusteeapproval ADD COLUMN IF NOT EXISTS vote_date DATE;
