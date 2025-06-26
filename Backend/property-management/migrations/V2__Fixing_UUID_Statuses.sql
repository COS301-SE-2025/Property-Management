ALTER TABLE IF EXISTS public.trusteeapproval DROP COLUMN IF EXISTS quote_id;

ALTER TABLE IF EXISTS public.quote DROP COLUMN IF EXISTS quote_id;

ALTER TABLE IF EXISTS public.quote DROP COLUMN IF EXISTS task_id;

ALTER TABLE IF EXISTS public.quote DROP COLUMN IF EXISTS contractor_id;

ALTER TABLE IF EXISTS public.quote DROP COLUMN IF EXISTS type;
ALTER TABLE IF EXISTS public.quote
    ADD PRIMARY KEY (quote_uuid);
ALTER TABLE IF EXISTS public.quote DROP CONSTRAINT IF EXISTS quote_contractor_id_fkey;

ALTER TABLE IF EXISTS public.quote DROP CONSTRAINT IF EXISTS quote_task_id_fkey;

ALTER TABLE IF EXISTS public.budget DROP COLUMN IF EXISTS budget_id;

ALTER TABLE IF EXISTS public.budget DROP COLUMN IF EXISTS building_id;

ALTER TABLE IF EXISTS public.budget DROP COLUMN IF EXISTS approved_by;
ALTER TABLE IF EXISTS public.budget
    ADD PRIMARY KEY (budget_uuid);

ALTER TABLE IF EXISTS public.buildingowner DROP COLUMN IF EXISTS id;

ALTER TABLE IF EXISTS public.buildingowner DROP COLUMN IF EXISTS trustee_id;

ALTER TABLE IF EXISTS public.buildingowner DROP COLUMN IF EXISTS building_id;

ALTER TABLE IF EXISTS public.buildingowner
    ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v4();

ALTER TABLE IF EXISTS public.buildingowner
    ADD COLUMN trustee_uuid uuid;

ALTER TABLE IF EXISTS public.buildingowner
    ADD COLUMN building_uuid uuid;
ALTER TABLE IF EXISTS public.buildingowner
    ADD PRIMARY KEY (uuid);

ALTER TABLE IF EXISTS public.contractorrating DROP COLUMN IF EXISTS rating_id;

ALTER TABLE IF EXISTS public.contractorrating DROP COLUMN IF EXISTS task_id;

ALTER TABLE IF EXISTS public.contractorrating DROP COLUMN IF EXISTS rated_by;

ALTER TABLE IF EXISTS public.contractorrating
    ADD COLUMN contractor_uuid uuid DEFAULT uuid_generate_v4();

ALTER TABLE IF EXISTS public.contractorrating
    ADD COLUMN task_uuid uuid;

ALTER TABLE IF EXISTS public.contractorrating
    ADD COLUMN trustee_uuid uuid;
ALTER TABLE IF EXISTS public.contractorrating
    ADD PRIMARY KEY (rating_uuid);

ALTER TABLE IF EXISTS public.contractorrating DROP COLUMN IF EXISTS contractor_id;
ALTER TABLE IF EXISTS public.contractorrating DROP CONSTRAINT IF EXISTS contractorrating_contractor_id_fkey;

ALTER TABLE IF EXISTS public.contractorrating
    ADD CONSTRAINT contractor_uuid FOREIGN KEY (contractor_uuid)
    REFERENCES public.contractor (contractor_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.contractorrating
    ADD CONSTRAINT task_uuid FOREIGN KEY (task_uuid)
    REFERENCES public.maintenancetask (task_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.contractorrating
    ADD CONSTRAINT trustee_uuid FOREIGN KEY (trustee_uuid)
    REFERENCES public.trustee (trustee_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_item_id_fkey;

ALTER TABLE IF EXISTS public.inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_task_id_fkey;

ALTER TABLE IF EXISTS public.inventoryusage DROP CONSTRAINT IF EXISTS inventoryusage_used_by_contractor_id_fkey;

ALTER TABLE IF EXISTS public.inventoryusage DROP COLUMN IF EXISTS usage_id;

ALTER TABLE IF EXISTS public.inventoryusage DROP COLUMN IF EXISTS task_id;

ALTER TABLE IF EXISTS public.inventoryusage DROP COLUMN IF EXISTS item_id;


ALTER TABLE IF EXISTS public.inventoryusage
    ADD COLUMN used_by_uuid uuid;

ALTER TABLE IF EXISTS public.inventoryusage
    ADD COLUMN trustee_uuid uuid;

ALTER TABLE IF EXISTS public.inventoryusage
    ADD CONSTRAINT trustee FOREIGN KEY (used_by_uuid)
    REFERENCES public.contractor (contractor_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.inventoryusage
    ADD CONSTRAINT task FOREIGN KEY (task_uuid)
    REFERENCES public.maintenancetask (task_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.inventoryusage
    ADD CONSTRAINT contractor FOREIGN KEY (used_by_uuid)
    REFERENCES public.contractor (contractor_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.contractor DROP COLUMN IF EXISTS contractor_id;

ALTER TABLE IF EXISTS public.contractor
    RENAME banned TO status;

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN address character varying(255);

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN city character varying(255);

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN postal_code character varying(255);

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN reg_number character varying(255);

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN description character varying(255);

ALTER TABLE IF EXISTS public.contractor
    ADD COLUMN services character varying(255);
ALTER TABLE IF EXISTS public.contractor
    ADD PRIMARY KEY (contractor_uuid);

ALTER TABLE IF EXISTS public.projecthistory DROP COLUMN IF EXISTS history_id;

ALTER TABLE IF EXISTS public.projecthistory DROP COLUMN IF EXISTS task_id;

ALTER TABLE IF EXISTS public.projecthistory
    ALTER COLUMN task_uuid SET NOT NULL;
ALTER TABLE IF EXISTS public.projecthistory
    ADD PRIMARY KEY (task_uuid);
ALTER TABLE IF EXISTS public.projecthistory DROP CONSTRAINT IF EXISTS projecthistory_task_id_fkey;

ALTER TABLE IF EXISTS public.maintenancetask DROP COLUMN IF EXISTS task_id;

ALTER TABLE IF EXISTS public.maintenancetask DROP COLUMN IF EXISTS building_id;

ALTER TABLE IF EXISTS public.maintenancetask DROP COLUMN IF EXISTS created_by;

ALTER TABLE IF EXISTS public.maintenancetask DROP COLUMN IF EXISTS proof_images;

ALTER TABLE IF EXISTS public.maintenancetask DROP COLUMN IF EXISTS image_id;


ALTER TABLE IF EXISTS public.maintenancetask
    ADD COLUMN image_uuid uuid;

ALTER TABLE IF EXISTS public.maintenancetask
    ADD COLUMN trustee_uuid uuid;
ALTER TABLE IF EXISTS public.maintenancetask
    ADD PRIMARY KEY (task_uuid);
ALTER TABLE IF EXISTS public.maintenancetask DROP CONSTRAINT IF EXISTS maintenance_images;

ALTER TABLE IF EXISTS public.maintenancetask DROP CONSTRAINT IF EXISTS maintenancetask_building_id_fkey;

ALTER TABLE IF EXISTS public.maintenancetask DROP CONSTRAINT IF EXISTS maintenancetask_created_by_fkey;

ALTER TABLE IF EXISTS public.maintenancetask
    ADD CONSTRAINT trustee FOREIGN KEY (trustee_uuid)
    REFERENCES public.trustee (trustee_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.maintenancetask
    ADD CONSTRAINT building FOREIGN KEY (building_uuid)
    REFERENCES public.building (building_uuid) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.image_meta DROP COLUMN IF EXISTS id;

ALTER TABLE IF EXISTS public.image_meta
    ADD COLUMN uuid uuid NOT NULL;
ALTER TABLE IF EXISTS public.image_meta
    ADD PRIMARY KEY (uuid);

DROP TABLE IF EXISTS trusteeapproval;

ALTER TABLE IF EXISTS public.trustee DROP COLUMN IF EXISTS trustee_id;

ALTER TABLE IF EXISTS public.trustee
    ADD PRIMARY KEY (trustee_uuid);

