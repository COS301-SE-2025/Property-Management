-- STEP 0: Ensure UUID extension exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- STEP 1: Add UUID columns to contractor, contractorrating, and inventoryusage
ALTER TABLE contractor ADD COLUMN contractor_uuid UUID;
ALTER TABLE contractorrating ADD COLUMN rating_uuid UUID;
ALTER TABLE inventoryusage ADD COLUMN usage_uuid UUID;

-- STEP 2: Generate UUIDs for all existing rows
UPDATE contractor SET contractor_uuid = uuid_generate_v4() WHERE contractor_uuid IS NULL;
UPDATE contractorrating SET rating_uuid = uuid_generate_v4() WHERE rating_uuid IS NULL;
UPDATE inventoryusage SET usage_uuid = uuid_generate_v4() WHERE usage_uuid IS NULL;

-- STEP 3: Add NOT NULL constraints now that data exists
ALTER TABLE contractor ALTER COLUMN contractor_uuid SET NOT NULL;
ALTER TABLE contractorrating ALTER COLUMN rating_uuid SET NOT NULL;
ALTER TABLE inventoryusage ALTER COLUMN usage_uuid SET NOT NULL;

-- STEP 4: Ensure new inserts get auto-generated UUIDs
ALTER TABLE contractor ALTER COLUMN contractor_uuid SET DEFAULT uuid_generate_v4();
ALTER TABLE contractorrating ALTER COLUMN rating_uuid SET DEFAULT uuid_generate_v4();
ALTER TABLE inventoryusage ALTER COLUMN usage_uuid SET DEFAULT uuid_generate_v4();

--next 2 tables inventoryusage and maintenance task
-- 1. Add the UUID column
ALTER TABLE maintenancetask ADD COLUMN task_uuid UUID;

-- 2. Generate UUIDs for existing rows
UPDATE maintenancetask SET task_uuid = gen_random_uuid();

-- 3. Add NOT NULL constraint and make it unique
ALTER TABLE maintenancetask ALTER COLUMN task_uuid SET NOT NULL;
ALTER TABLE maintenancetask ADD CONSTRAINT task_uuid_unique UNIQUE (task_uuid);

-- 4. Set default value for new inserts
ALTER TABLE maintenancetask ALTER COLUMN task_uuid SET DEFAULT gen_random_uuid();

-- 1. Add the UUID column
-- ALTER TABLE inventoryusage ADD COLUMN usage_uuid UUID;

-- 2. Generate UUIDs for existing rows
UPDATE inventoryusage SET usage_uuid = gen_random_uuid();

-- 3. Add NOT NULL constraint and make it unique
ALTER TABLE inventoryusage ALTER COLUMN usage_uuid SET NOT NULL;
ALTER TABLE inventoryusage ADD CONSTRAINT usage_uuid_unique UNIQUE (usage_uuid);

-- 4. Set default value for new inserts
ALTER TABLE inventoryusage ALTER COLUMN usage_uuid SET DEFAULT gen_random_uuid();

--foreing key updates for inventory to work 
--Drop old foreign key constraint
ALTER TABLE inventoryitem DROP CONSTRAINT IF EXISTS inventoryitem_building_id_fkey;

-- 2. Optional: Drop the old building_id column (only do this after code is updated)
-- ALTER TABLE inventoryitem DROP COLUMN IF EXISTS building_id;

-- 3. Ensure building_uuid_fk column exists and is NOT NULL
ALTER TABLE inventoryitem
    ALTER COLUMN building_uuid_fk SET NOT NULL;

-- 4. Drop the old FK if it exists and recreate FK on UUID
ALTER TABLE inventoryitem DROP CONSTRAINT IF EXISTS inventoryitem_building_uuid_fkey;

-- 5. Add new FK to building.building_uuid
ALTER TABLE inventoryitem
    ADD CONSTRAINT inventoryitem_building_uuid_fkey
    FOREIGN KEY (building_uuid_fk)
    REFERENCES building(building_uuid)
    ON DELETE CASCADE;
