ALTER TABLE maintenancetask
ADD COLUMN max_budget DECIMAL(10,2) DEFAULT NULL;

CREATE TABLE contractor_services (
    contractor_uuid uuid NOT NULL,
    service varchar(255) NOT NULL,
    CONSTRAINT fk_contractor_services_contractor FOREIGN KEY (contractor_uuid) REFERENCES contractor(contractor_uuid) ON DELETE CASCADE
);
CREATE INDEX idx_contractor_services_service ON contractor_services (service);