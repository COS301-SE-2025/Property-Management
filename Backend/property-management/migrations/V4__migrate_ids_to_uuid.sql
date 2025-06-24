-- STEP 1: Enable UUID extension if not already enabled (safe to rerun)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- STEP 2: Add new UUID columns to tables
ALTER TABLE building ADD COLUMN building_uuid UUID;
ALTER TABLE budget ADD COLUMN budget_uuid UUID;
ALTER TABLE inventoryitem ADD COLUMN item_uuid UUID;

-- STEP 3: Generate UUIDs for existing rows
UPDATE building SET building_uuid = uuid_generate_v4() WHERE building_uuid IS NULL;
UPDATE budget SET budget_uuid = uuid_generate_v4() WHERE budget_uuid IS NULL;
UPDATE inventoryitem SET item_uuid = uuid_generate_v4() WHERE item_uuid IS NULL;

-- STEP 4: Set default values for new UUID columns
-- This ensures that any new rows will automatically get a UUID
ALTER TABLE building ALTER COLUMN building_uuid SET DEFAULT uuid_generate_v4();
ALTER TABLE budget ALTER COLUMN budget_uuid SET DEFAULT uuid_generate_v4();
ALTER TABLE inventoryitem ALTER COLUMN item_uuid SET DEFAULT uuid_generate_v4();

-- STEP 4: Add NOT NULL constraint (now that all rows have UUIDs)
ALTER TABLE building ALTER COLUMN building_uuid SET NOT NULL;
ALTER TABLE budget ALTER COLUMN budget_uuid SET NOT NULL;
ALTER TABLE inventoryitem ALTER COLUMN item_uuid SET NOT NULL;


-- STEP 5: Handle foreign keys

-- First, add temporary UUID FK columns
ALTER TABLE budget ADD COLUMN building_uuid_fk UUID;
UPDATE budget SET building_uuid_fk = b.building_uuid
FROM building b
WHERE budget.building_id = b.building_id;

ALTER TABLE inventoryitem ADD COLUMN building_uuid_fk UUID;
UPDATE inventoryitem SET building_uuid_fk = b.building_uuid
FROM building b
WHERE inventoryitem.building_id = b.building_id;

-- STEP 6: Add FK constraints on new UUID columns

ALTER TABLE building ADD CONSTRAINT building_uuid_unique UNIQUE (building_uuid);
ALTER TABLE budget ADD CONSTRAINT budget_building_uuid_fkey FOREIGN KEY (building_uuid_fk) REFERENCES building(building_uuid);
ALTER TABLE inventoryitem ADD CONSTRAINT inventoryitem_building_uuid_fkey FOREIGN KEY (building_uuid_fk) REFERENCES building(building_uuid);




-- STEP 7: OPTIONAL: Once app code fully migrated to UUID, you can drop INT FKs and columns
-- DO NOT RUN YET (only after you're confident everything is working)
-- ALTER TABLE budget DROP COLUMN building_id;
-- ALTER TABLE inventoryitem DROP COLUMN building_id;
-- ALTER TABLE budget RENAME COLUMN building_uuid_fk TO building_id;
-- ALTER TABLE inventoryitem RENAME COLUMN building_uuid_fk TO building_id;

-- STEP 8: Set UUID PKs (next migration stage, after app code update)
-- ALTER TABLE building DROP CONSTRAINT building_pkey;
-- ALTER TABLE building ADD PRIMARY KEY (building_uuid);
-- ALTER TABLE budget DROP CONSTRAINT budget_pkey;
-- ALTER TABLE budget ADD PRIMARY KEY (budget_uuid);
-- ALTER TABLE inventoryitem DROP CONSTRAINT inventoryitem_pkey;
-- ALTER TABLE inventoryitem ADD PRIMARY KEY (item_uuid);

--drop trustees column 
ALTER TABLE building DROP COLUMN IF EXISTS trustees;




