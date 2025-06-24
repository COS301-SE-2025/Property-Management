-- V8__remove_rest_of_the_uuids.sql

-- Ensure necessary extensions for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. INVENTORYITEM TABLE - Complete migration first
-- =====================================================

-- 1.1 Add building_uuid_fk column and populate it
ALTER TABLE inventoryitem ADD COLUMN IF NOT EXISTS building_uuid_fk UUID;
UPDATE inventoryitem i
  SET building_uuid_fk = b.building_uuid
  FROM building b
  WHERE i.building_id = b.building_id;

-- 1.2 Add item_uuid column if it doesn't exist and populate it
ALTER TABLE inventoryitem ADD COLUMN IF NOT EXISTS item_uuid UUID DEFAULT uuid_generate_v4();
UPDATE inventoryitem SET item_uuid = uuid_generate_v4() WHERE item_uuid IS NULL;
ALTER TABLE inventoryitem ALTER COLUMN item_uuid SET NOT NULL;

-- Ensure unique index on item_uuid
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes WHERE tablename = 'inventoryitem' AND indexname = 'inventoryitem_item_uuid_unique'
    ) THEN
        CREATE UNIQUE INDEX inventoryitem_item_uuid_unique ON public.inventoryitem (item_uuid);
    END IF;
END$$;

-- 1.3 Drop old constraints and columns
ALTER TABLE inventoryitem DROP CONSTRAINT IF EXISTS inventoryitem_building_id_fkey;
ALTER TABLE inventoryitem DROP CONSTRAINT IF EXISTS inventoryitem_pkey;
ALTER TABLE inventoryitem DROP COLUMN IF EXISTS building_id;
ALTER TABLE inventoryitem DROP COLUMN IF EXISTS item_id;
DROP SEQUENCE IF EXISTS inventoryitem_item_id_seq;

-- 1.4 Set up new primary key
ALTER TABLE inventoryitem ADD CONSTRAINT inventoryitem_pkey PRIMARY KEY (item_uuid);

-- 1.5 Add building foreign key constraint
ALTER TABLE inventoryitem DROP CONSTRAINT IF EXISTS inventoryitem_building_uuid_fkey;
ALTER TABLE inventoryitem
  ADD CONSTRAINT inventoryitem_building_uuid_fkey
  FOREIGN KEY (building_uuid_fk) REFERENCES building(building_uuid);

-- =====================================================
-- 2. CONTRACTOR TABLE - Complete migration
-- =====================================================

-- 2.1 Ensure contractor_uuid exists and is populated
ALTER TABLE contractor ADD COLUMN IF NOT EXISTS contractor_uuid UUID DEFAULT gen_random_uuid();
UPDATE contractor SET contractor_uuid = gen_random_uuid() WHERE contractor_uuid IS NULL;
ALTER TABLE contractor ALTER COLUMN contractor_uuid SET NOT NULL;

-- 2.2 Migrate dependent tables first
-- 2.2a. contractorrating
ALTER TABLE contractorrating ADD COLUMN IF NOT EXISTS contractor_uuid UUID;
UPDATE contractorrating cr
  SET contractor_uuid = c.contractor_uuid
  FROM contractor c
  WHERE cr.contractor_id = c.contractor_id;
ALTER TABLE contractorrating DROP CONSTRAINT IF EXISTS contractorrating_contractor_id_fkey;
ALTER TABLE contractorrating DROP COLUMN IF EXISTS contractor_id;

-- 2.2b. quote
ALTER TABLE quote ADD COLUMN IF NOT EXISTS contractor_uuid UUID;
UPDATE quote q
  SET contractor_uuid = c.contractor_uuid
  FROM contractor c
  WHERE q.contractor_id = c.contractor_id;
ALTER TABLE quote DROP CONSTRAINT IF EXISTS quote_contractor_id_fkey;
ALTER TABLE quote DROP COLUMN IF EXISTS contractor_id;

-- 2.2c. inventoryusage (used_by_contractor)
ALTER TABLE inventoryusage ADD COLUMN IF NOT EXISTS used_by_contractor_uuid UUID;
UPDATE inventoryusage u
  SET used_by_contractor_uuid = c.contractor_uuid
  FROM contractor c
  WHERE u.used_by_contractor_id = c.contractor_id;
ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_used_by_contractor_id_fkey;
ALTER TABLE inventoryusage DROP COLUMN IF EXISTS used_by_contractor_id;

-- 2.3 Update contractor primary key
ALTER TABLE contractor DROP CONSTRAINT IF EXISTS contractor_pkey;
ALTER TABLE contractor DROP COLUMN IF EXISTS contractor_id;
DROP SEQUENCE IF EXISTS contractor_contractor_id_seq;
ALTER TABLE contractor ADD CONSTRAINT contractor_pkey PRIMARY KEY (contractor_uuid);

-- 2.4 Add foreign key constraints for dependent tables
ALTER TABLE contractorrating DROP CONSTRAINT IF EXISTS contractorrating_contractor_uuid_fkey;
ALTER TABLE contractorrating
  ADD CONSTRAINT contractorrating_contractor_uuid_fkey
  FOREIGN KEY (contractor_uuid) REFERENCES contractor(contractor_uuid);

ALTER TABLE quote DROP CONSTRAINT IF EXISTS quote_contractor_uuid_fkey;
ALTER TABLE quote
  ADD CONSTRAINT quote_contractor_uuid_fkey
  FOREIGN KEY (contractor_uuid) REFERENCES contractor(contractor_uuid);

ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_used_by_contractor_uuid_fkey;
ALTER TABLE inventoryusage
  ADD CONSTRAINT inventoryusage_used_by_contractor_uuid_fkey
  FOREIGN KEY (used_by_contractor_uuid) REFERENCES contractor(contractor_uuid);

-- =====================================================
-- 3. TRUSTEE TABLE - Complete migration
-- =====================================================

-- 3.1 Ensure trustee_uuid exists and is populated
ALTER TABLE trustee ADD COLUMN IF NOT EXISTS trustee_uuid UUID DEFAULT gen_random_uuid();
UPDATE trustee SET trustee_uuid = gen_random_uuid() WHERE trustee_uuid IS NULL;
ALTER TABLE trustee ALTER COLUMN trustee_uuid SET NOT NULL;

-- 3.2 Add building_uuid column and populate it
ALTER TABLE trustee ADD COLUMN IF NOT EXISTS building_uuid UUID;
UPDATE trustee t
  SET building_uuid = b.building_uuid
  FROM building b
  WHERE t.building_id = b.building_id;

-- 3.3 Update trustee primary key
ALTER TABLE trustee DROP CONSTRAINT IF EXISTS trustee_building_id_fkey;
ALTER TABLE trustee DROP CONSTRAINT IF EXISTS trustee_pkey;
ALTER TABLE trustee DROP COLUMN IF EXISTS building_id;
ALTER TABLE trustee DROP COLUMN IF EXISTS trustee_id;
DROP SEQUENCE IF EXISTS trustee_trustee_id_seq;
ALTER TABLE trustee ADD CONSTRAINT trustee_pkey PRIMARY KEY (trustee_uuid);

-- 3.4 Add building foreign key constraint
ALTER TABLE trustee DROP CONSTRAINT IF EXISTS trustee_building_uuid_fkey;
ALTER TABLE trustee
  ADD CONSTRAINT trustee_building_uuid_fkey
  FOREIGN KEY (building_uuid) REFERENCES building(building_uuid);

-- =====================================================
-- 4. MAINTENANCETASK TABLE - Complete migration
-- =====================================================

-- 4.1 Ensure task_uuid exists and is populated
ALTER TABLE maintenancetask ADD COLUMN IF NOT EXISTS task_uuid UUID DEFAULT gen_random_uuid();
UPDATE maintenancetask SET task_uuid = gen_random_uuid() WHERE task_uuid IS NULL;
ALTER TABLE maintenancetask ALTER COLUMN task_uuid SET NOT NULL;

-- 4.2 Add UUID foreign key columns and populate them
ALTER TABLE maintenancetask ADD COLUMN IF NOT EXISTS building_uuid UUID;
ALTER TABLE maintenancetask ADD COLUMN IF NOT EXISTS created_by_uuid UUID;

UPDATE maintenancetask mt
  SET building_uuid = b.building_uuid
  FROM building b
  WHERE mt.building_id = b.building_id;

UPDATE maintenancetask mt
  SET created_by_uuid = t.trustee_uuid
  FROM trustee t
  WHERE mt.created_by = t.trustee_id;

-- 4.3 Update maintenancetask primary key
ALTER TABLE maintenancetask DROP CONSTRAINT IF EXISTS maintenancetask_pkey;
ALTER TABLE maintenancetask DROP COLUMN IF EXISTS building_id;
ALTER TABLE maintenancetask DROP COLUMN IF EXISTS created_by;
ALTER TABLE maintenancetask DROP COLUMN IF EXISTS task_id;
DROP SEQUENCE IF EXISTS maintenancetask_task_id_seq;
ALTER TABLE maintenancetask ADD CONSTRAINT maintenancetask_pkey PRIMARY KEY (task_uuid);

-- 4.4 Add foreign key constraints
ALTER TABLE maintenancetask DROP CONSTRAINT IF EXISTS maintenancetask_building_uuid_fkey;
ALTER TABLE maintenancetask
  ADD CONSTRAINT maintenancetask_building_uuid_fkey
  FOREIGN KEY (building_uuid) REFERENCES building(building_uuid);

ALTER TABLE maintenancetask DROP CONSTRAINT IF EXISTS maintenancetask_created_by_uuid_fkey;
ALTER TABLE maintenancetask
  ADD CONSTRAINT maintenancetask_created_by_uuid_fkey
  FOREIGN KEY (created_by_uuid) REFERENCES trustee(trustee_uuid);

-- =====================================================
-- 5. INVENTORYUSAGE TABLE - Now safe to migrate
-- =====================================================

-- 5.1 Add item_uuid column and populate it (inventoryitem PK now exists)
ALTER TABLE inventoryusage ADD COLUMN IF NOT EXISTS item_uuid UUID;
UPDATE inventoryusage u
  SET item_uuid = i.item_uuid
  FROM inventoryitem i
  WHERE u.item_id = i.item_id;

-- 5.2 Add task_uuid column and populate it (maintenancetask PK now exists)
ALTER TABLE inventoryusage ADD COLUMN IF NOT EXISTS task_uuid UUID;
UPDATE inventoryusage u
  SET task_uuid = mt.task_uuid
  FROM maintenancetask mt
  WHERE u.task_id = mt.task_id;

-- 5.3 Drop old constraints and columns
ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_item_id_fkey;
ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_task_id_fkey;
ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_pkey;
ALTER TABLE inventoryusage DROP COLUMN IF EXISTS item_id;
ALTER TABLE inventoryusage DROP COLUMN IF EXISTS task_id;
ALTER TABLE inventoryusage DROP COLUMN IF EXISTS usage_id;
DROP SEQUENCE IF EXISTS inventoryusage_usage_id_seq;

-- 5.4 Set up new primary key
ALTER TABLE inventoryusage ADD CONSTRAINT inventoryusage_pkey PRIMARY KEY (usage_uuid);

-- 5.5 Add foreign key constraints (now safe because referenced tables have proper PKs)
ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_item_uuid_fkey;
ALTER TABLE inventoryusage
  ADD CONSTRAINT inventoryusage_item_uuid_fkey
  FOREIGN KEY (item_uuid) REFERENCES inventoryitem(item_uuid);

ALTER TABLE inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_task_uuid_fkey;
ALTER TABLE inventoryusage
  ADD CONSTRAINT inventoryusage_task_uuid_fkey
  FOREIGN KEY (task_uuid) REFERENCES maintenancetask(task_uuid);

-- Ensure unique index on usage_uuid
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes WHERE tablename = 'inventoryusage' AND indexname = 'usage_uuid_unique'
    ) THEN
        CREATE UNIQUE INDEX usage_uuid_unique ON public.inventoryusage (usage_uuid);
    END IF;
END$$;
-- =====================================================
-- 6. OTHER TABLES - Final migrations
-- =====================================================

-- 6.1 BUILDING - Update primary key
ALTER TABLE building DROP CONSTRAINT IF EXISTS building_pkey;
ALTER TABLE building DROP COLUMN IF EXISTS building_id;
DROP SEQUENCE IF EXISTS building_building_id_seq;
ALTER TABLE building ADD CONSTRAINT building_pkey PRIMARY KEY (building_uuid);

-- 6.2 BUILDING - Add trustee foreign key
ALTER TABLE building DROP CONSTRAINT IF EXISTS building_trustee_uuid_fkey;
ALTER TABLE building
  ADD CONSTRAINT building_trustee_uuid_fkey
  FOREIGN KEY (trustee_uuid) REFERENCES trustee(trustee_uuid);

-- 6.3 TENYEARPLAN - Complete migration
ALTER TABLE tenyearplan ADD COLUMN IF NOT EXISTS plan_uuid UUID DEFAULT gen_random_uuid();
UPDATE tenyearplan SET plan_uuid = gen_random_uuid() WHERE plan_uuid IS NULL;
ALTER TABLE tenyearplan ALTER COLUMN plan_uuid SET NOT NULL;

ALTER TABLE tenyearplan ADD COLUMN IF NOT EXISTS building_uuid UUID;
UPDATE tenyearplan t
  SET building_uuid = b.building_uuid
  FROM building b
  WHERE t.building_id = b.building_id;

ALTER TABLE tenyearplan DROP CONSTRAINT IF EXISTS tenyearplan_building_id_fkey;
ALTER TABLE tenyearplan DROP CONSTRAINT IF EXISTS tenyearplan_pkey;
ALTER TABLE tenyearplan DROP COLUMN IF EXISTS building_id;
ALTER TABLE tenyearplan DROP COLUMN IF EXISTS plan_id;
DROP SEQUENCE IF EXISTS tenyearplan_plan_id_seq;
ALTER TABLE tenyearplan ADD CONSTRAINT tenyearplan_pkey PRIMARY KEY (plan_uuid);

ALTER TABLE tenyearplan DROP CONSTRAINT IF EXISTS tenyearplan_building_uuid_fkey;
ALTER TABLE tenyearplan
  ADD CONSTRAINT tenyearplan_building_uuid_fkey
  FOREIGN KEY (building_uuid) REFERENCES building(building_uuid);

-- 6.4 BUDGET - Complete migration
ALTER TABLE budget ADD COLUMN IF NOT EXISTS building_uuid_fk UUID;
UPDATE budget b
  SET building_uuid_fk = bl.building_uuid
  FROM building bl
  WHERE b.building_id = bl.building_id;

ALTER TABLE budget DROP CONSTRAINT IF EXISTS budget_building_id_fkey;
ALTER TABLE budget DROP COLUMN IF EXISTS building_id;

ALTER TABLE budget DROP CONSTRAINT IF EXISTS budget_building_uuid_fkey;
ALTER TABLE budget
  ADD CONSTRAINT budget_building_uuid_fkey
  FOREIGN KEY (building_uuid_fk) REFERENCES building(building_uuid) ON DELETE CASCADE;