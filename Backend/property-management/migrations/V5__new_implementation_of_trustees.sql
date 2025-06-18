
ALTER TABLE trustee
ADD COLUMN trustee_uuid UUID DEFAULT gen_random_uuid();

UPDATE trustee SET trustee_uuid = gen_random_uuid()
WHERE trustee_uuid IS NULL;

ALTER TABLE trustee
ALTER COLUMN trustee_uuid SET NOT NULL,
ADD CONSTRAINT trustee_trustee_uuid_unique UNIQUE (trustee_uuid);

CREATE TABLE buildingtrustee (
    building_uuid UUID NOT NULL,
    trustee_uuid UUID NOT NULL,
    PRIMARY KEY (building_uuid, trustee_uuid),
    FOREIGN KEY (building_uuid) REFERENCES building(building_uuid),
    FOREIGN KEY (trustee_uuid) REFERENCES trustee(trustee_uuid)
);

