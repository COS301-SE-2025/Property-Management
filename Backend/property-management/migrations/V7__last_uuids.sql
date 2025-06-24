-- 0. Enable pgcrypto extension (for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -- 1. USER TABLE: Add user_uuid
-- ALTER TABLE "user"
-- ADD COLUMN user_uuid UUID DEFAULT gen_random_uuid();

-- UPDATE "user" SET user_uuid = gen_random_uuid()
-- WHERE user_uuid IS NULL;

-- ALTER TABLE "user"
-- ALTER COLUMN user_uuid SET NOT NULL,
-- ADD CONSTRAINT user_user_uuid_unique UNIQUE (user_uuid);

-- 5. PROJECTHISTORY TABLE: Add UUID & switch FK to task_uuid
ALTER TABLE projecthistory
ADD COLUMN history_uuid UUID DEFAULT gen_random_uuid();

UPDATE projecthistory SET history_uuid = gen_random_uuid()
WHERE history_uuid IS NULL;

ALTER TABLE projecthistory
ALTER COLUMN history_uuid SET NOT NULL,
ADD CONSTRAINT projecthistory_history_uuid_unique UNIQUE (history_uuid);

-- Add new UUID-based FK column
ALTER TABLE projecthistory
ADD COLUMN task_uuid UUID;

UPDATE projecthistory ph
SET task_uuid = mt.task_uuid
FROM maintenancetask mt
WHERE ph.task_id = mt.task_id;

ALTER TABLE projecthistory
ADD CONSTRAINT projecthistory_task_uuid_fkey FOREIGN KEY (task_uuid) REFERENCES maintenancetask(task_uuid);

-- 6. QUOTE TABLE: Add UUID & switch FK to task_uuid and contractor_uuid
ALTER TABLE quote
ADD COLUMN quote_uuid UUID DEFAULT gen_random_uuid();

UPDATE quote SET quote_uuid = gen_random_uuid()
WHERE quote_uuid IS NULL;

ALTER TABLE quote
ALTER COLUMN quote_uuid SET NOT NULL,
ADD CONSTRAINT quote_quote_uuid_unique UNIQUE (quote_uuid);

ALTER TABLE quote
ADD COLUMN task_uuid UUID,
ADD COLUMN contractor_uuid UUID;

UPDATE quote q
SET task_uuid = mt.task_uuid
FROM maintenancetask mt
WHERE q.task_id = mt.task_id;

UPDATE quote q
SET contractor_uuid = c.contractor_uuid
FROM contractor c
WHERE q.contractor_id = c.contractor_id;

ALTER TABLE contractor
ADD CONSTRAINT contractor_contractor_uuid_unique UNIQUE (contractor_uuid);

ALTER TABLE quote
ADD CONSTRAINT quote_task_uuid_fkey FOREIGN KEY (task_uuid) REFERENCES maintenancetask(task_uuid),
ADD CONSTRAINT quote_contractor_uuid_fkey FOREIGN KEY (contractor_uuid) REFERENCES contractor(contractor_uuid);

-- 7. TENYEARPLAN TABLE: Add UUID & switch FK to building_uuid
ALTER TABLE tenyearplan
ADD COLUMN plan_uuid UUID DEFAULT gen_random_uuid();

UPDATE tenyearplan SET plan_uuid = gen_random_uuid()
WHERE plan_uuid IS NULL;

ALTER TABLE tenyearplan
ALTER COLUMN plan_uuid SET NOT NULL,
ADD CONSTRAINT tenyearplan_plan_uuid_unique UNIQUE (plan_uuid);

ALTER TABLE tenyearplan
ADD COLUMN building_uuid UUID;

UPDATE tenyearplan t
SET building_uuid = b.building_uuid
FROM building b
WHERE t.building_id = b.building_id;

ALTER TABLE tenyearplan
ADD CONSTRAINT tenyearplan_building_uuid_fkey FOREIGN KEY (building_uuid) REFERENCES building(building_uuid);

-- -- 8. TRUSTEE TABLE: Add UUID & switch FKs to building_uuid and user_uuid
-- ALTER TABLE trustee
-- ADD COLUMN trustee_uuid UUID DEFAULT gen_random_uuid();

-- UPDATE trustee SET trustee_uuid = gen_random_uuid()
-- WHERE trustee_uuid IS NULL;

-- ALTER TABLE trustee
-- ALTER COLUMN trustee_uuid SET NOT NULL,
-- ADD CONSTRAINT trustee_trustee_uuid_unique UNIQUE (trustee_uuid);

ALTER TABLE trustee
ADD COLUMN building_uuid UUID;
-- ADD COLUMN user_uuid UUID;

-- UPDATE trustee t
-- SET building_uuid = b.building_uuid
-- FROM building b
-- WHERE t.building_id = b.building_id;

-- UPDATE trustee t
-- SET user_uuid = u.user_uuid
-- FROM "user" u
-- WHERE t.user_id = u.user_id;

ALTER TABLE trustee
ADD CONSTRAINT trustee_building_uuid_fkey FOREIGN KEY (building_uuid) REFERENCES building(building_uuid);
-- ADD CONSTRAINT trustee_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES "user"(user_uuid);
