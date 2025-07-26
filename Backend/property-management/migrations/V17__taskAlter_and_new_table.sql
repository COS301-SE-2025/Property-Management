ALTER TABLE maintenancetask
ADD COLUMN approval_status VARCHAR(50) NOT NULL DEFAULT 'PENDING';

CREATE TABLE maintenancetask_contractor (
    task_uuid UUID NOT NULL,
    contractor_uuid UUID NOT NULL,
    quote_submitted BOOLEAN NOT NULL DEFAULT FALSE,
    quote_uuid UUID,
    PRIMARY KEY (task_uuid, contractor_uuid),
    CONSTRAINT fk_task FOREIGN KEY (task_uuid) REFERENCES maintenancetask(task_uuid) ON DELETE CASCADE,
    CONSTRAINT fk_contractor FOREIGN KEY (contractor_uuid) REFERENCES contractor(contractor_uuid) ON DELETE CASCADE,
    CONSTRAINT fk_quote FOREIGN KEY (quote_uuid) REFERENCES quote(quote_uuid) ON DELETE SET NULL
);
CREATE UNIQUE INDEX maintenancetask_contractor_unique ON maintenancetask_contractor USING btree (task_uuid, contractor_uuid);