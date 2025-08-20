CREATE TABLE task_progress (
    progress_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
    submission_date timestamptz NOT NULL DEFAULT NOW(),
    
    contractor_uuid uuid NOT NULL,
    task_uuid uuid NOT NULL,
    image_id varchar(255),
    
    progress_percentage numeric(5,2) DEFAULT 0,
    work_description text,
    
    inventory_usage_uuid uuid,
    quantity_used integer,
    
    remarks text,
    last_updated timestamptz DEFAULT NOW(),
    
    PRIMARY KEY (progress_uuid),
    
    CONSTRAINT task_progress_contractor_fk 
        FOREIGN KEY (contractor_uuid) REFERENCES contractor(contractor_uuid),
    CONSTRAINT task_progress_task_fk 
        FOREIGN KEY (task_uuid) REFERENCES maintenancetask(task_uuid),
    CONSTRAINT task_progress_image_fk 
        FOREIGN KEY (image_id) REFERENCES image_meta(id),
    CONSTRAINT task_progress_inventory_fk 
        FOREIGN KEY (inventory_usage_uuid) REFERENCES inventoryusage(usage_uuid)
);

CREATE UNIQUE INDEX task_progress_uuid_unique 
    ON public.task_progress(progress_uuid);
